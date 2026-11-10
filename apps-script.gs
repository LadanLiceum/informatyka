// Збір результатів «Інформатика». Вставте в Apps Script (Розширення → Apps Script), замініть увесь код,
// потім: Розгорнути → Керувати розгортаннями → олівець → Версія: Нова версія → Розгорнути (посилання не зміниться).
var KEY = "inf-x7k29";

var SHEETS = {
  K1: {name: "5 кл: Тема 1", head: ["Клас", "Учень", "Тест", "Ігри", "Читалка", "Гра 2", "Гра 3", "Оновлено"]},
  K2: {name: "5 кл: Тема 2", head: ["Клас", "Учень", "Тест", "Гра 1", "Гра 2", "Гра 3", "Читалка", "Оновлено"]},
  K9: {name: "9 кл: Теми", head: ["Клас", "Учень", "Тест", "Гра 1", "Гра 2", "Читалка", "Гра 3", "Оновлено"]},
  L9: {name: "9 кл: Уроки (бали)", head: null}, // Клас, Учень, 1..52, Оновлено
  K10: {name: "10-ІТ: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L10: {name: "10-ІТ: Тема 3 (бали)", head: ["Клас", "Учень", "У1", "У2", "У3", "У4", "У5", "У6", "У7", "У8", "У9", "У10", "У11", "У12", "У13", "У14", "У15", "У16", "У17", "У18", "У19", "У20", "У21", "У22", "У23", "У24", "У25", "У26", "У27", "У28", "У29", "У30", "Оновлено"]},
  K5: {name: "5 кл: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L5: {name: "5 кл: Уроки (бали)", head: null}, // Клас, Учень, 1..52, Оновлено
  K6: {name: "6 кл: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L6: {name: "6 кл: Уроки (бали)", head: null},
  K11: {name: "11 кл: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L11: {name: "11 кл: Уроки (бали)", head: null},
  K10B: {name: "10 кл (осн.): Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L10B: {name: "10 кл (осн.): Уроки (бали)", head: null},
};

function doPost(e) {
  var body = (e && e.postData && e.postData.contents) || "";
  var lines = body.split("\n");
  if (lines[0].trim() !== KEY) return ContentService.createTextOutput("key");
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var det = [], tms = [];
    for (var i = 1; i < lines.length; i++) {
      var l = lines[i].trim();
      if (l.indexOf("INF5|") !== 0) continue;
      var p = l.split("|");
      if (p[1] === "D") { if (p.length >= 16) det.push(p); continue; }
      if (p[1] === "T") { if (p.length >= 11) tms.push(p); continue; }
      var cfg = SHEETS[p[1]];
      if (!cfg || p.length < 5) continue;
      save(ss, cfg, p[1], p[2], p[3], p.slice(4));
    }
    if (det.length) saveDetail(ss, det);
    if (tms.length) saveTimes(ss, tms);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}

function doGet() { return ContentService.createTextOutput("ok"); }

function save(ss, cfg, kind, cls, name, vals) {
  var sh = ss.getSheetByName(cfg.name);
  var n = vals.length;
  if (!sh) {
    sh = ss.insertSheet(cfg.name);
    var head = cfg.head;
    if (!head) { head = ["Клас", "Учень"]; for (var k = 1; k <= n; k++) head.push(String(k)); head.push("Оновлено"); }
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  var last = sh.getLastRow();
  var row = -1;
  if (last > 1) {
    var keys = sh.getRange(2, 1, last - 1, 2).getValues();
    for (var i = 0; i < keys.length; i++) {
      if (String(keys[i][0]) === cls && String(keys[i][1]) === name) { row = i + 2; break; }
    }
  }
  var newv = vals.map(function (v) { var x = parseFloat(v); return isNaN(x) ? 0 : x; });
  if (row < 0) {
    row = last + 1;
    sh.getRange(row, 1, 1, 2).setValues([[cls, name]]);
  } else {
    var old = sh.getRange(row, 3, 1, n).getValues()[0];
    for (var j = 0; j < n; j++) { var o = parseFloat(old[j]); if (!isNaN(o) && o > newv[j]) newv[j] = o; } // найкращий результат
  }
  sh.getRange(row, 3, 1, n).setValues([newv]);
  sh.getRange(row, 3 + n).setValue(new Date());
}

// Детальний лист: один рядок = учень + урок. Бали за 12-бальною шкалою — найкращий результат. «-» означає, що такого завдання в уроці немає.
var DET_NAME = "Деталі (12 балів)";
var DET_HEAD = ["Клас", "Учень", "Урок", "Читалка", "Гра 1", "Гра 2", "Гра 3", "Гра 4", "Гра 5", "Гра 6", "Тест", "Великий тест", "Загалом (бал)", "Оновлено", "Назви ігор"];
function saveDetail(ss, list) {
  var sh = ss.getSheetByName(DET_NAME);
  if (!sh) {
    sh = ss.insertSheet(DET_NAME);
    sh.getRange(1, 1, 1, DET_HEAD.length).setValues([DET_HEAD]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  var last = sh.getLastRow(), W = DET_HEAD.length;
  var data = last > 1 ? sh.getRange(2, 1, last - 1, W).getValues() : [];
  var idx = {};
  for (var i = 0; i < data.length; i++) idx[data[i][0] + "|" + data[i][1] + "|" + data[i][2]] = i;
  var now = new Date();
  list.forEach(function (p) {
    var cls = p[2], name = p[3], les = parseInt(p[4], 10), key = cls + "|" + name + "|" + les;
    var vals = [];
    for (var k = 5; k <= 14; k++) vals.push(p[k] === "-" ? "-" : (isNaN(parseFloat(p[k])) ? 0 : parseFloat(p[k])));
    var titles = p.slice(15).join("|");
    var r;
    if (idx[key] === undefined) { r = [cls, name, les]; for (var j = 0; j < W - 3; j++) r.push(""); data.push(r); idx[key] = data.length - 1; }
    r = data[idx[key]];
    for (var j = 0; j < 10; j++) {
      var nv = vals[j], ov = r[3 + j];
      if (nv === "-") { if (ov === "") r[3 + j] = "-"; continue; }
      r[3 + j] = (typeof ov === "number" && ov > nv) ? ov : nv;
    }
    r[13] = now; r[14] = titles;
  });
  sh.getRange(2, 1, data.length, W).setValues(data);
}

// Час відповідей у тестах: допомагає побачити підозріло швидкі правильні відповіді
// та виходи зі сторінки під час тесту (це сигнал, а не доказ).
var TM_NAME = "Час відповідей";
var TM_HEAD = ["Клас", "Учень", "Урок", "Тест", "Сер. час на питання (с)", "Мін. час (с)", "Виходів зі сторінки", "Правильних швидше ніж за 3 с", "Питань", "Оновлено"];
function saveTimes(ss, list) {
  var sh = ss.getSheetByName(TM_NAME);
  if (!sh) {
    sh = ss.insertSheet(TM_NAME);
    sh.getRange(1, 1, 1, TM_HEAD.length).setValues([TM_HEAD]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  var W = TM_HEAD.length, last = sh.getLastRow();
  var data = last > 1 ? sh.getRange(2, 1, last - 1, W).getValues() : [];
  var idx = {};
  for (var i = 0; i < data.length; i++) idx[data[i][0] + "|" + data[i][1] + "|" + data[i][2] + "|" + data[i][3]] = i;
  var now = new Date();
  list.forEach(function (p) {
    var key = p[2] + "|" + p[3] + "|" + p[4] + "|" + p[5];
    var row = [p[2], p[3], parseInt(p[4], 10) || 0, p[5], parseFloat(p[6]) || 0, parseFloat(p[7]) || 0, parseInt(p[8], 10) || 0, parseInt(p[9], 10) || 0, parseInt(p[10], 10) || 0, now];
    if (idx[key] === undefined) { data.push(row); idx[key] = data.length - 1; } else { data[idx[key]] = row; }
  });
  sh.getRange(2, 1, data.length, W).setValues(data);
}
