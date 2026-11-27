// Збір результатів «Інформатика». Вставте в Apps Script (Розширення → Apps Script), замініть увесь код,
// потім: Розгорнути → Керувати розгортаннями → олівець → Версія: Нова версія → Розгорнути (посилання не зміниться).
var KEY = "inf-x7k29";
// Ключ вчителя для екрана «Мій клас» в застосунку. Вигадайте довгий пароль (лише латиниця/цифри). Порожньо = екран вимкнено, дані нікому не віддаються.
var TEACHER_KEY = "7410923";

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
  K7: {name: "7 кл: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L7: {name: "7 кл: Уроки (бали)", head: null},
  K8: {name: "8 кл: Підсумок (бали)", head: ["Клас", "Учень", "Уроків пройдено", "Середній бал", "Оновлено"]},
  L8: {name: "8 кл: Уроки (бали)", head: null},
};

function doPost(e) {
  var body = (e && e.postData && e.postData.contents) || "";
  var lines = body.split("\n");
  if (lines[0].trim() !== KEY) return ContentService.createTextOutput("key");
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var det = [], tms = [], WP = allWipes(ss), sts = {};
    for (var i = 1; i < lines.length; i++) { var q0 = lines[i].trim().split("|"); if (q0[0] === "INF5" && q0[1] === "S") sts[q0[2] + "|" + nn(q0[3])] = +q0[5] || 0; }
    for (var i = 1; i < lines.length; i++) {
      var l = lines[i].trim();
      if (l.indexOf("INF5|") !== 0) continue;
      var p = l.split("|");
      var wk = p[2] + "|" + nn(p[3]), wl = WP[wk];
      if (wl && (wk in sts)) { // учень має видалення: старі дані (надіслані до видалення) не повертаємо
        var bts = sts[wk] || 0, all = false, les = {};
        wl.forEach(function (w) { if (w[1] > bts) { if (w[0] === "*") all = true; else les[w[0]] = 1; } });
        if (all) continue;
        if (Object.keys(les).length) {
          if (/^K/.test(p[1])) continue;
          if ((p[1] === "D" || p[1] === "T") && les[String(parseInt(p[4], 10))]) continue;
          if (/^L/.test(p[1])) Object.keys(les).forEach(function (x) { var j = 4 + (+x) - 1; if (p[j] !== undefined) p[j] = "0"; });
        }
      }
      if (p[1] === "S") { if (p.length >= 7) saveState(ss, p[2], p[3], p[4], p[6], +p[5] || 0); continue; }
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

// Відповідь як JSON або (якщо є параметр cb) як JSONP — так застосунок читає її без обмежень CORS.
function reply(e, obj) {
  var cb = e && e.parameter && e.parameter.cb;
  if (cb && /^[A-Za-z0-9_]{1,40}$/.test(cb)) {
    return ContentService.createTextOutput(cb + "(" + JSON.stringify(obj) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  if (typeof obj === "string") return ContentService.createTextOutput(obj);
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try { return doGet_(e); } catch (err) {
    return reply(e, { s: "err", m: String(err && err.message || err) + " @" + String(err && err.stack || "").split("\n")[0] });
  }
}

function doGet_(e) {
  var q = e && e.parameter && e.parameter.q; // формат: cb|st|клас|ім'я|pin  або  cb|tk|ключ
  if (q) {
    var qp = String(q).split("|");
    e.parameter.cb = qp[0];
    if (qp[1] === "st") { e.parameter.st = "1"; e.parameter.c = qp[2] || ""; e.parameter.n = qp[3] || ""; e.parameter.h = qp[4] || ""; }
    else if (qp[1] === "tk") { e.parameter.tk = qp[2] || ""; }
    else if (qp[1] === "del") { e.parameter.del = "1"; e.parameter.tk = qp[2] || ""; e.parameter.c = qp[3] || ""; e.parameter.n = qp[4] || ""; e.parameter.l = qp[5] || ""; }
  }
  var dbg = e && e.parameter && e.parameter.dbg;
  if (dbg === "1") return ContentService.createTextOutput("V3-plain");
  if (dbg === "2") return ContentService.createTextOutput(JSON.stringify({ x: 1 })).setMimeType(ContentService.MimeType.JSON);
  if (dbg === "3") return ContentService.createTextOutput("sheet:" + SpreadsheetApp.getActiveSpreadsheet().getName());
  if (dbg === "4") return ContentService.createTextOutput(JSON.stringify(lookupState("x", "test", "1")));
  if (e && e.parameter && e.parameter.st) {
    return reply(e, lookupState(String(e.parameter.c || ""), String(e.parameter.n || ""), String(e.parameter.h || "")));
  }
  var tk = e && e.parameter && e.parameter.tk;
  if (!TEACHER_KEY || tk !== TEACHER_KEY) return reply(e, "ok");
  if (e.parameter.del) {
    var lk = LockService.getScriptLock(); lk.waitLock(20000);
    try { return reply(e, delGrade(String(e.parameter.c || ""), String(e.parameter.n || ""), String(e.parameter.l || ""))); } finally { lk.releaseLock(); }
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet(), rows = [], det = [];
  ["K5", "K6", "K7", "K8", "K10", "K10B", "K11"].forEach(function (k) {
    var sh = ss.getSheetByName(SHEETS[k].name);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues().forEach(function (r) {
      rows.push({ k: k, c: r[0], n: r[1], d: r[2], a: r[3], u: r[4] });
    });
  });
  var ds = ss.getSheetByName(DET_NAME);
  if (ds && ds.getLastRow() > 1) {
    det = ds.getRange(2, 1, ds.getLastRow() - 1, DET_HEAD.length).getValues();
  }
  var tm = [], ts = ss.getSheetByName(TM_NAME);
  if (ts && ts.getLastRow() > 1) {
    tm = ts.getRange(2, 1, ts.getLastRow() - 1, 9).getValues();
  }
  return reply(e, { rows: rows, det: det, tm: tm });
}

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
      if (j === 9) { r[3 + j] = nv; continue; } // «Загалом» — похідне, перераховується з нуля
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

// ---- Знімок прогресу учня (для відновлення на іншому пристрої) ----
var STATE_NAME = "Стан учнів 2"; // Клас, Ім'я, PIN (хеш), Дані, Оновлено. Забув PIN? Очистіть клітинку PIN — учень задасть новий.
function nn(s) {
  var w = String(s).toLowerCase().replace(/[’'`ʼ‘]/g, "").replace(/[^a-zа-яіїєґ0-9 ]/g, " ").split(/\s+/).filter(function (x) { return x; });
  return w.sort().join(" ");
}
function lev(a, b) {
  var m = a.length, n = b.length, d = [], i, j;
  for (i = 0; i <= m; i++) { d[i] = [i]; }
  for (j = 1; j <= n; j++) d[0][j] = j;
  for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
  return d[m][n];
}
function stateRows() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(STATE_NAME);
  if (!sh || sh.getLastRow() < 2) return { sh: sh, rows: [] };
  return { sh: sh, rows: sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues() };
}
function findSimilar(rows, cls, key, h, skip) {
  for (var i = 0; i < rows.length; i++) {
    if (i === skip || String(rows[i][0]) !== cls || String(rows[i][2]) !== h) continue;
    var k2 = nn(rows[i][1]);
    if (lev(k2, key) <= Math.max(3, Math.floor(key.length / 5))) return i;
  }
  return -1;
}
function lookupState(cls, name, h) {
  var R = stateRows(), rows = R.rows, key = nn(name), ex = -1, i;
  for (i = 0; i < rows.length; i++) if (String(rows[i][0]) === cls && nn(rows[i][1]) === key) { ex = i; break; }
  if (ex >= 0) {
    var pin = String(rows[ex][2]);
    if (pin === "" ) { R.sh.getRange(ex + 2, 3).setValue(h); return { s: "ok", p: String(rows[ex][3]), w: wipesFor(cls, name) }; }
    if (pin === h) return { s: "ok", p: String(rows[ex][3]), w: wipesFor(cls, name) };
    var sg = findSimilar(rows, cls, key, h, ex);
    if (sg >= 0) return { s: "sug", n: String(rows[sg][1]) };
    return { s: "bad" };
  }
  var sm = findSimilar(rows, cls, key, h, -1);
  if (sm >= 0) return { s: "sug", n: String(rows[sm][1]) };
  return { s: "new" };
}
function dmerge(a, b) {
  if (a == null) return b;
  if (b == null) return a;
  if (typeof a === "number" && typeof b === "number") return Math.max(a, b);
  if (Array.isArray(a) && Array.isArray(b)) {
    var seen = {}, r = [];
    a.concat(b).forEach(function (x) { var s = JSON.stringify(x); if (!seen[s]) { seen[s] = 1; r.push(x); } });
    return r.slice(-200);
  }
  if (typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
    var o = {};
    Object.keys(a).concat(Object.keys(b)).forEach(function (k) { if (!(k in o)) o[k] = dmerge(a[k], b[k]); });
    return o;
  }
  return b;
}
function saveState(ss, cls, name, h, enc, ts) {
  var sh = ss.getSheetByName(STATE_NAME);
  if (!sh) { sh = ss.insertSheet(STATE_NAME); sh.getRange(1, 1, 1, 5).setValues([["Клас", "Ім'я", "PIN", "Дані", "Оновлено"]]).setFontWeight("bold"); }
  var inc; try { inc = JSON.parse(decodeURIComponent(enc)); } catch (e) { return; }
  var key = nn(name), row = -1, pin = "";
  if (sh.getLastRow() > 1) {
    var vs = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();
    for (var i = 0; i < vs.length; i++) if (String(vs[i][0]) === cls && nn(vs[i][1]) === key) { row = i + 2; pin = String(vs[i][2]); break; }
  }
  var merged = inc;
  if (row > 0) {
    if (pin !== "" && pin !== h) return;
    try { merged = dmerge(JSON.parse(decodeURIComponent(String(sh.getRange(row, 4).getValue()))), inc); } catch (e) { merged = inc; }
  } else { row = sh.getLastRow() + 1; name = String(name).trim(); }
  (wipesFor(cls, name) || []).forEach(function (w) { if (w[1] > (ts || 0) && w[0] !== "*") stripLesson(merged, skey(cls, +w[0])); });
  var out = encodeURIComponent(JSON.stringify(merged));
  if (out.length > 49000) out = encodeURIComponent(JSON.stringify(inc));
  if (out.length > 49000) return;
  if (pin === "" && sh.getRange(row, 2).getValue() !== "") sh.getRange(row, 3, 1, 3).setValues([[h, out, new Date()]]);
  else if (pin === "" ) sh.getRange(row, 1, 1, 5).setValues([[cls, name, h, out, new Date()]]);
  else sh.getRange(row, 4, 1, 2).setValues([[out, new Date()]]);
}


// ---- Видалення оцінок з екрана «Мій клас» ----
// Лист «Видалення»: що й коли вчитель видалив. Застосунок учня побачить запис і зітре це й у себе на телефоні.
var WIPE_NAME = "Видалення";
var STORES = ["inf5l", "inf6l", "inf7l", "inf8", "inf9", "inf10", "inf10g", "inf11l"];
function skey(cls, x) {
  cls = String(cls);
  if (/^10-ІТ/.test(cls)) return 1000 + x;
  if (/^10-/.test(cls)) return 1200 + x;
  if (/^11/.test(cls)) return 1100 + x;
  var d = parseInt(cls, 10);
  return d === 9 ? x : d * 100 + x;
}
function lsheet(cls) {
  cls = String(cls);
  if (/^10-ІТ/.test(cls)) return "L10";
  if (/^10-/.test(cls)) return "L10B";
  if (/^11/.test(cls)) return "L11";
  return "L" + parseInt(cls, 10);
}
function ksheet(cls) { var l = lsheet(cls); return l === "L9" ? null : "K" + l.slice(1); }
function stripLesson(st, key) {
  if (!st) return;
  STORES.forEach(function (s) { var b = st[s]; if (b && typeof b === "object") ["l", "rd", "sc"].forEach(function (f) { if (b[f]) delete b[f][key]; }); });
}
function wipeSheet(ss) {
  var sh = ss.getSheetByName(WIPE_NAME);
  if (!sh) { sh = ss.insertSheet(WIPE_NAME); sh.getRange(1, 1, 1, 5).setValues([["Клас", "Учень", "Урок (* = усе)", "Мітка", "Коли"]]).setFontWeight("bold"); sh.setFrozenRows(1); }
  return sh;
}
function allWipes(ss) {
  var sh = ss.getSheetByName(WIPE_NAME), o = {};
  if (!sh || sh.getLastRow() < 2) return o;
  sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues().forEach(function (r) { var k = r[0] + "|" + nn(r[1]); (o[k] = o[k] || []).push([String(r[2]), +r[3] || 0]); });
  return o;
}
function wipesFor(cls, name) { return allWipes(SpreadsheetApp.getActiveSpreadsheet())[cls + "|" + nn(name)] || []; }
function delRows(sh, test) {
  if (!sh || sh.getLastRow() < 2) return 0;
  var v = sh.getRange(2, 1, sh.getLastRow() - 1, Math.max(3, sh.getLastColumn())).getValues(), n = 0;
  for (var i = v.length - 1; i >= 0; i--) if (test(v[i])) { sh.deleteRow(i + 2); n++; }
  return n;
}
function delGrade(cls, name, les) {
  if (!cls || !name || !les) return { s: "err", m: "мало даних" };
  var ss = SpreadsheetApp.getActiveSpreadsheet(), all = les === "*", x = parseInt(les, 10), now = Date.now();
  if (!all && !(x > 0)) return { s: "err", m: "невірний урок" };
  var me = function (r) { return String(r[0]) === cls && String(r[1]) === name; };
  delRows(ss.getSheetByName(DET_NAME), function (r) { return me(r) && (all || +r[2] === x); });
  delRows(ss.getSheetByName(TM_NAME), function (r) { return me(r) && (all || +r[2] === x); });
  if (all) {
    Object.keys(SHEETS).forEach(function (k) { delRows(ss.getSheetByName(SHEETS[k].name), me); });
  } else {
    var L = SHEETS[lsheet(cls)], ls = L && ss.getSheetByName(L.name);
    if (ls && ls.getLastRow() > 1) {
      var v = ls.getRange(2, 1, ls.getLastRow() - 1, 2).getValues();
      for (var i = 0; i < v.length; i++) if (me(v[i]) && 2 + x < ls.getLastColumn()) ls.getRange(i + 2, 2 + x).setValue(0);
    }
    var kk = ksheet(cls), K = kk && SHEETS[kk], ks = K && ss.getSheetByName(K.name);
    if (ks && ks.getLastRow() > 1) { // підсумок перерахує застосунок учня
      var w = ks.getRange(2, 1, ks.getLastRow() - 1, 2).getValues();
      for (var j = 0; j < w.length; j++) if (me(w[j])) ks.getRange(j + 2, 3, 1, 2).setValues([[0, 0]]);
    }
  }
  var R = stateRows(), key = nn(name);
  for (var r = 0; r < R.rows.length; r++) {
    if (String(R.rows[r][0]) !== cls || nn(R.rows[r][1]) !== key) continue;
    var st = {};
    if (!all) { try { st = JSON.parse(decodeURIComponent(String(R.rows[r][3]))); } catch (e) { st = {}; } stripLesson(st, skey(cls, x)); }
    R.sh.getRange(r + 2, 4, 1, 2).setValues([[encodeURIComponent(JSON.stringify(st)), new Date()]]);
  }
  wipeSheet(ss).appendRow([cls, name, all ? "*" : String(x), now, new Date()]);
  return { s: "ok" };
}
