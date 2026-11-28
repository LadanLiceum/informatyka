/* ===== 7 клас · складна гра №18 «Карткова дуель» =====
   "+NM+" заздалегідь показує свій хід. Ти граєш карту-відповідь: правильна → обираєш Удар / Блок / Лікування.
   Серія правильних підсилює карти. Стартовий екран — логіка 9 класу. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}

/* ---------- "+NM+" ---------- */
function ace(mood){var S="stroke='"+O+"' stroke-width='3.5' stroke-linejoin='round'",ang=mood=="hit";
 return "<g class='kdAce'>"
  +"<g transform='rotate(-18 -40 20)'><rect x='-62' y='-4' width='30' height='42' rx='5' fill='#fff' "+S+"/><text x='-47' y='24' text-anchor='middle' font-size='16' font-weight='900' fill='#ff3f8e'>⚡</text></g>"
  +"<g transform='rotate(14 40 20)'><rect x='32' y='-4' width='30' height='42' rx='5' fill='#fff' "+S+"/><text x='47' y='24' text-anchor='middle' font-size='16' font-weight='900' fill='#58c4ff'>🛡</text></g>"
  +"<path d='M-34 70 Q-40 10 0 6 Q40 10 34 70z' fill='#2a1d78' "+S+"/><path d='M-14 10 L0 40 L14 10' fill='#ffd23f' "+S+"/><circle cx='0' cy='52' r='6' fill='#ff3f8e' "+S+"/>"
  +"<path d='M-46 30 Q-50 14 -34 14' fill='none' "+S+"/><path d='M46 30 Q50 14 34 14' fill='none' "+S+"/>"
  +"<g transform='rotate(-6)'><rect x='-30' y='-74' width='60' height='80' rx='10' fill='#fff' "+S+"/><path d='M-18 -64 l4 -6 l4 6z M14 -6 l4 6 l4 -6z' fill='#58c4ff'/><path d='M-2 -8 l-4 6 h4 l-2 6 l7 -8 h-4 l2 -4z' fill='#ffd23f' stroke='"+O+"' stroke-width='1.5'/>"
  +"<rect x='-22' y='-46' width='44' height='22' rx='9' fill='"+O+"'/>"+(ang?"<path d='M-14 -38 l8 6 m14 -6 l-8 6' stroke='#ff5a7a' stroke-width='4' stroke-linecap='round'/>":"<rect class='kdEye' x='-13' y='-41' width='8' height='12' rx='4' fill='#ff5a7a'/><rect class='kdEye' x='5' y='-41' width='8' height='12' rx='4' fill='#ff5a7a'/>")
  +"<path d='M-8 -14 q8 6 16 0' stroke='#ff3f8e' stroke-width='3' fill='none' stroke-linecap='round'/></g>"
  +"<path d='M-26 -74 L-30 -92 L-16 -82 L-6 -98 L6 -82 L18 -96 L22 -76z' fill='#ffd23f' "+S+" transform='rotate(-6)'/>"
  +"</g>"}

/* ---------- сцена ---------- */
var FV=0,FELT=[["#4a34c8","#22166a"],["#1f8a8a","#0a3a4a"],["#c8264a","#4a0a2a"]];
function DEFS_(){return "<defs><radialGradient id='kdFelt' cx='.5' cy='.45' r='.7'><stop offset='0' stop-color='"+FELT[FV][0]+"'/><stop offset='1' stop-color='"+FELT[FV][1]+"'/></radialGradient><linearGradient id='kdBg' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#120838'/><stop offset='1' stop-color='#2a1478'/></linearGradient><radialGradient id='kdSp' cx='.5' cy='0' r='1'><stop offset='0' stop-color='#ffe9a8' stop-opacity='.5'/><stop offset='1' stop-color='#ffe9a8' stop-opacity='0'/></radialGradient></defs>"}
function table(){var s="<rect width='360' height='240' fill='url(#kdBg)'/>";
 for(var i=0;i<14;i++)s+="<path d='M"+(12+i*26)+" "+(16+(i%3)*14)+" l6 -10 l6 10 l-6 10z' fill='#fff' opacity='.06'/>";
 s+="<polygon points='130,0 230,0 300,240 60,240' fill='url(#kdSp)'/>";
 s+="<ellipse cx='180' cy='188' rx='176' ry='70' fill='#0d0630'/><ellipse cx='180' cy='182' rx='170' ry='64' fill='url(#kdFelt)' stroke='#ff3f8e' stroke-width='4'/><ellipse class='kdNeon' cx='180' cy='182' rx='158' ry='55' fill='none' stroke='#ffd23f' stroke-width='2' stroke-dasharray='3 9' opacity='.7'/>";
 s+="<rect x='150' y='140' width='60' height='80' rx='9' fill='none' stroke='rgba(255,255,255,.3)' stroke-width='2.5' stroke-dasharray='6 6'/>";
 s+="<g opacity='.5'><rect x='272' y='150' width='40' height='56' rx='6' fill='#5a46d6' stroke='"+O+"' stroke-width='2.5' transform='rotate(8 292 178)'/><rect x='268' y='146' width='40' height='56' rx='6' fill='#5a46d6' stroke='"+O+"' stroke-width='2.5'/><text x='288' y='181' text-anchor='middle' font-size='18' fill='#ffd23f'>★</text></g>";
 return s}
function playedCard(ok,big,c){return "<g class='kdPlay'><rect x='150' y='140' width='60' height='80' rx='9' fill='"+(ok?c:"#6b717c")+"' stroke='#fff' stroke-width='4'/><rect x='150' y='140' width='60' height='80' rx='9' fill='none' stroke='"+O+"' stroke-width='2'/><ellipse cx='180' cy='180' rx='22' ry='31' transform='rotate(25 180 180)' fill='#fff'/>"+(ok?"<text x='180' y='192' text-anchor='middle' font-size='30' font-weight='900' fill='"+c+"' stroke='"+O+"' stroke-width='1.5'>✓</text><text x='155' y='156' font-size='12' font-weight='900' fill='#fff' stroke='"+O+"' stroke-width='.8'>⚡"+big+"</text>":"<text x='180' y='190' text-anchor='middle' font-size='30' font-weight='900' fill='#2a2a2a'>✗</text><path d='M156 146 l48 68' stroke='#ff5a1f' stroke-width='3' opacity='.7'/>")+"</g>"}

/* ---------- стилі ---------- */
var CSS="\
.kdSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.kdSt>svg{display:block;width:100%;height:auto}\
.kdMe{position:absolute;left:3%;bottom:4%;width:23%;pointer-events:none;filter:drop-shadow(0 4px 0 rgba(0,0,0,.3))}.kdMe svg{width:100%;height:auto}\
.kdHp{position:absolute;display:flex;align-items:center;gap:5px;background:rgba(10,5,40,.85);border:2px solid #fff;border-radius:12px;padding:3px 8px;font:900 12px system-ui;color:#fff;pointer-events:none}\
.kdHp em{display:block;width:62px;height:8px;border-radius:4px;background:rgba(255,255,255,.18);overflow:hidden}.kdHp em i{display:block;height:100%;border-radius:4px;transition:width .45s}\
.kdHp u{text-decoration:none;color:#7ef0ff}\
.kdInt{position:absolute;right:3%;top:9%;max-width:42%;background:#fff;color:#1a0e3a;border:3px solid #1a0e3a;border-radius:14px;padding:5px 9px;font:900 12.5px/1.25 system-ui;box-shadow:0 4px 0 rgba(0,0,0,.3)}\
.kdInt:before{content:'';position:absolute;left:-11px;top:14px;border:8px solid transparent;border-right-color:#1a0e3a}\
.kdInt:after{content:'';position:absolute;left:-6px;top:16px;border:6px solid transparent;border-right-color:#fff}\
.kdInt small{display:block;font:800 10px system-ui;color:#6b5fc7;text-transform:uppercase;letter-spacing:.04em}\
.kdInt.hv{background:#ff5a7a;color:#fff}.kdInt.hv:after{border-right-color:#ff5a7a}.kdInt.hv small{color:#ffe0e6}\
.kdCmb{position:absolute;left:3%;top:17%;font:900 italic 16px system-ui;color:#ffd23f;text-shadow:0 2px 0 #000;pointer-events:none}\
.kdH{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .kdH button{position:relative;display:flex!important;align-items:center;justify-content:center;width:auto!important;margin:0!important;min-height:112px;border:5px solid #fff!important;outline:3px solid "+O+";border-radius:14px!important;padding:12px 10px!important;background:var(--uc)!important;color:#1a0e3a!important;font:800 13px/1.25 system-ui!important;box-shadow:0 6px 0 "+O+"!important;cursor:pointer;text-align:center;text-transform:none!important;transition:transform .15s;overflow:hidden}\
.zb .kdH button:nth-child(1){--uc:#e8333a;transform:rotate(-2.5deg)}.zb .kdH button:nth-child(2){--uc:#ffc21a;transform:rotate(2deg)}.zb .kdH button:nth-child(3){--uc:#2bb24c;transform:rotate(1.5deg)}.zb .kdH button:nth-child(4){--uc:#1f6fd6;transform:rotate(-2deg)}\
.zb .kdH button:active{transform:translateY(4px) rotate(0)!important}\
.zb .kdH button span{position:relative;z-index:1;display:block;background:#fff;border-radius:50%/45%;padding:12px 10px;width:100%;box-shadow:inset 0 0 0 2px rgba(0,0,0,.08);transform:rotate(-8deg)}.zb .kdH button span i{display:block;font-style:normal;transform:rotate(8deg)}\
.zb .kdH button b,.zb .kdH button s{position:absolute;z-index:2;font:900 italic 17px system-ui;color:#fff;text-decoration:none;-webkit-text-stroke:1px "+O+";text-shadow:0 2px 0 "+O+"}.zb .kdH button b{left:7px;top:3px}.zb .kdH button s{right:7px;bottom:3px;transform:rotate(180deg)}\
.zb .kdH button.kOk{transform:translateY(-6px) scale(1.05)!important;z-index:2;outline:4px solid #ffd23f;box-shadow:0 0 0 7px rgba(255,210,63,.4),0 6px 0 "+O+"!important}.zb .kdH button.kBad{filter:grayscale(1) brightness(.7)}.zb .kdH button.kDim{opacity:.3}\
.kdDeal{animation:kdDl .45s cubic-bezier(.3,1.4,.5,1) both}@keyframes kdDl{0%{opacity:0;transform:translateY(60px) rotate(12deg) scale(.7)}}\
.kdA{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.kdA.k4{grid-template-columns:repeat(4,1fr)}\
.zb .kdA button{position:relative;display:block!important;text-align:center!important;width:auto!important;margin:0!important;border:4px solid #fff!important;outline:2.5px solid "+O+";border-radius:14px!important;padding:8px 2px 10px!important;color:#fff!important;font:900 12.5px/1.15 system-ui!important;box-shadow:0 5px 0 "+O+"!important;cursor:pointer;text-transform:none!important;min-height:0!important;text-shadow:0 2px 0 rgba(0,0,0,.35)}\
.zb .kdA button i{display:grid!important;place-items:center;width:46px;height:46px;margin:0 auto 4px;border-radius:50%;background:#fff;font-style:normal;font-size:24px;text-shadow:none}.zb .kdA button em{display:block!important;font-style:normal;font-size:20px}\
.zb .kdA .a1{background:#e8333a!important}.zb .kdA .a2{background:#1f6fd6!important}.zb .kdA .a3{background:#2bb24c!important}.zb .kdA .a4{background:#ffc21a!important;color:#1a0e3a!important;text-shadow:none}\
.zb .kdA button.hint{box-shadow:0 0 0 6px rgba(255,210,63,.55),0 5px 0 "+O+"!important}\
.kdTip{margin-top:8px;text-align:center;font:800 12.5px/1.35 system-ui;color:#cfc8ff}.kdTip b{color:#ffd23f}\
.kdPlay{animation:kdPl .4s cubic-bezier(.3,1.5,.5,1) both;transform-box:fill-box;transform-origin:center}@keyframes kdPl{0%{transform:translateY(90px) scale(.6) rotate(-20deg);opacity:0}}\
.kdHit{animation:kdHi .4s}@keyframes kdHi{25%{transform:translateX(-7px);filter:brightness(2.4)}50%{transform:translateX(6px)}75%{transform:translateX(-3px)}}\
.kdEye{animation:kdBl 3.6s infinite;transform-box:fill-box;transform-origin:center}@keyframes kdBl{0%,93%,100%{transform:none}96%{transform:scaleY(.15)}}\
.kdNeon{animation:kdNe 8s linear infinite}@keyframes kdNe{to{stroke-dashoffset:-240}}\
.kdAceB{animation:kdBo 3s ease-in-out infinite}@keyframes kdBo{50%{transform:translateY(-4px)}}\
.kdFly{animation:kdFy .5s ease-in forwards}@keyframes kdFy{to{transform:translate(var(--tx),var(--ty)) rotate(540deg);opacity:.2}}\
.kdShield{animation:kdSh .9s ease-out forwards;transform-box:fill-box;transform-origin:center}@keyframes kdSh{0%{transform:scale(.3);opacity:0}30%{transform:scale(1.1);opacity:1}100%{transform:scale(1);opacity:0}}\
.kdUp{animation:kdUp 1s ease-out forwards}@keyframes kdUp{to{transform:translateY(-40px);opacity:0}}\
body.lite .kdEye,body.lite .kdNeon,body.lite .kdAceB{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

/* ---------- гра ---------- */
var MEHP=32,ACEHP=40;
var INT=[["atk",7],["atk",8],["sh",6],["atk",9],["heal",6],["big",13],["atk",8],["sh",7],["atk",10],["big",14],["atk",9],["heal",7]];
function intText(x){return x[0]=="atk"?["Наступний хід","⚔️ Удар "+x[1]]:x[0]=="big"?["Заряджає!","💥 Суперудар "+x[1]]:x[0]=="sh"?["Наступний хід","🛡 Щит "+x[1]]:["Наступний хід","💚 Лікування "+x[1]]}
GM.card7=function(g){FV=(g.v||0)%3;var NM=["Декс", "Флекс", "Кекс"][(g.v||0)%3];inj();var POOL,me,ac,turn,ok,tot,cmb,best,log,stg;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);me={hp:MEHP,max:MEHP,sh:0};ac={hp:ACEHP,max:ACEHP,sh:0};turn=0;ok=0;tot=0;cmb=0;best=0;log=[]}
 function pw(){return 6+Math.min(3,cmb)*2}

 /* --- старт --- */
 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 160' xmlns='http://www.w3.org/2000/svg'>"+[[-24,40,"#e8333a","⚔️"],[-8,62,"#ffc21a","⏭"],[8,84,"#2bb24c","💚"],[24,106,"#1f6fd6","🛡"]].map(function(c){return "<g transform='translate("+c[1]+",150) rotate("+c[0]+")'><rect x='-25' y='-98' width='50' height='72' rx='8' fill='"+c[2]+"' stroke='#fff' stroke-width='4'/><rect x='-25' y='-98' width='50' height='72' rx='8' fill='none' stroke='"+O+"' stroke-width='2'/><ellipse cx='0' cy='-62' rx='17' ry='27' transform='rotate(25 0 -62)' fill='#fff'/><text x='0' y='-54' text-anchor='middle' font-size='20'>"+c[3]+"</text></g>"}).join("")
   +"<text x='178' y='92' text-anchor='middle' font-size='34' font-weight='900' font-style='italic' fill='#fff' stroke='"+O+"' stroke-width='6' paint-order='stroke'>VS</text><g transform='translate(276,98) scale(.72)'>"+ace()+"</g></svg>";
  $i("zbR").innerHTML="<div class='zbHd'><small>СКЛАДНА ГРА · ДУЕЛЬ ЗНАНЬ</small><b>Карткова дуель</b>"+art+"</div>"
   +"<div class='zbIn'><h3>"+NM+" не програє ніколи. Поки що.</h3><p>"+NM+" — бот-колекціонер, у нього найбільша колекція карт-навичок на арені. Він хизується, що завжди наперед показує свій хід — і все одно виграє. Покажи, що знання сильніші за будь-яку колекцію!</p>"
   +"<div class='zbRu'><i>🃏</i><span><b>Кожен хід — питання і 4 карти.</b> Зіграй карту з правильною відповіддю. Хибна карта згорає, а "+NM+" б'є без перешкод.</span></div>"
   +"<div class='zbRu'><i>🧠</i><span><b>Правильна карта — твій вибір:</b> ⚔️ удар, 🛡 блок або 💚 лікування. Дивись у бульбашку над "+NM+"ом: якщо він заряджає <b>суперудар</b>, саме час ставити блок.</span></div>"
   +"<div class='zbRu'><i>🔥</i><span><b>Серія правильних підсилює карти:</b> ⚡6 → 8 → 10 → 12. Від серії 3 з'являється жовта карта <b>⏭ Пропуск</b> — "+NM+" пропускає хід, але серія згорає. Помилка теж обнуляє серію. Перемога — коли в "+NM+"а 0 ❤️.</span></div>"
   +"<button class='zbGo' id='zbGo'>На арену ▶</button></div>";
  $i("zbGo").onclick=start}

 /* --- стіл --- */
 function start(){shell();gs9("Дуель з "+NM+"ом");
  $i("zbR").innerHTML="<div class='kdSt'><svg id='kdS' viewBox='0 0 360 240' xmlns='http://www.w3.org/2000/svg'>"+DEFS_()+table()+"<g transform='translate(180,96) scale(.78)'><g class='kdAceB'><g id='kdAce'>"+ace()+"</g></g></g><g id='kdC'></g><g id='kdFx'></g></svg>"
   +"<div class='kdMe' id='kdMe'>"+B7("idle")+"</div><div class='kdHp' style='left:2%;top:4%' id='kdHa'></div><div class='kdHp' style='left:28%;bottom:4%' id='kdHm'></div><div class='kdInt' id='kdI'></div><div class='kdCmb' id='kdCb'></div></div>"
   +"<div id='kdW'></div><div class='zbMsg' id='zbM'></div><div id='kdN'></div>";
  stg=$i("kdS");hud();next()}
 function bar(x,c){return "<em><i style='width:"+Math.max(0,x.hp/x.max*100).toFixed(0)+"%;background:"+c+"'></i></em>"}
 function hud(){$i("kdHa").innerHTML="👾 "+NM+" "+bar(ac,"#ff5a7a")+Math.max(0,ac.hp)+(ac.sh?" <u>🛡"+ac.sh+"</u>":"");$i("kdHm").innerHTML="🤖 Ти "+bar(me,"#7ee787")+Math.max(0,me.hp)+(me.sh?" <u>🛡"+me.sh+"</u>":"");
  $i("kdCb").textContent=cmb>=2?"🔥 Серія x"+cmb+" · ⚡"+pw():""}
 function curInt(){return INT[turn%INT.length]}
 function showInt(){var x=curInt(),t=intText(x),e=$i("kdI");e.className="kdInt"+(x[0]=="big"?" hv":"");e.innerHTML="<small>"+t[0]+"</small>"+t[1]}
 function me7(e){var m=$i("kdMe");if(m)m.innerHTML=B7(e)}
 function num(x,y,t,c){var e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("x",x);e.setAttribute("y",y);e.setAttribute("text-anchor","middle");e.setAttribute("class","zbNum");e.setAttribute("fill",c);e.textContent=t;$i("kdFx").appendChild(e);setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},1000)}
 function fx(h,ms){var e=document.createElementNS("http://www.w3.org/2000/svg","g");e.innerHTML=h;$i("kdFx").appendChild(e);setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},ms||900)}
 function hitAce(){var a=$i("kdAce");a.innerHTML=ace("hit");a.setAttribute("class","");void a.getBoundingClientRect();a.setAttribute("class","kdHit");setTimeout(function(){if(alive(a)){a.innerHTML=ace();a.setAttribute("class","")}},700)}
 function hitMe(){var m=$i("kdMe");if(!m)return;m.classList.remove("kdHit");void m.offsetWidth;m.classList.add("kdHit");me7("sad")}
 function next(){if(!alive(stg))return;if(ac.hp<=0||me.hp<=0||turn>=12)return end();
  showInt();me7("think");var Q=POOL[turn%POOL.length];$i("zbM").innerHTML="";$i("kdN").innerHTML="";$i("kdC").innerHTML="";
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("kdW").innerHTML="<div class='zbQ'><small>Хід "+(turn+1)+" · зіграй правильну карту</small><b>"+esc(Q.q)+"</b></div><div class='kdH' id='kdH'>"+o.map(function(x,i){return "<button class='kdDeal' style='animation-delay:"+(i*.07)+"s' data-i='"+i+"'><b>"+"АБВГ"[i]+"</b><span><i>"+esc(x.t)+"</i></span><s>"+"АБВГ"[i]+"</s></button>"}).join("")+"</div>";
  setTimeout(function(){[].forEach.call(document.querySelectorAll("#kdH button"),function(b){b.classList.remove("kdDeal")})},700);
  gs9("Хід "+(turn+1)+" · ✅ "+ok);
  $i("kdH").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;play(Q,+b.getAttribute("data-i"))}}
 function play(Q,j){var c=Q._o[j].c;tot++;[].forEach.call($i("kdH").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"kOk":(i==j?"kBad":"kDim")});
  if(c){ok++;cmb++;best=Math.max(best,cmb);$i("kdC").innerHTML=playedCard(1,pw(),["#e8333a","#ffc21a","#2bb24c","#1f6fd6"][j]);me7("happy");vib(20);hud();
   var x=curInt(),p=pw(),hint=x[0]=="big"?2:(x[0]=="sh"&&me.hp<me.max*.6?3:1);
   setTimeout(function(){if(!alive(stg))return;
    $i("kdW").innerHTML="<div class='zbQ'><small>✅ Правильно! Що робить твоя карта ⚡"+p+"?</small><b>"+esc(Q.o[Q.a])+"</b></div><div class='kdA"+(cmb>=3?" k4":"")+"' id='kdA'><button class='a1"+(hint==1?" hint":"")+"' data-a='1'><i>⚔️</i>Удар<em>"+p+"</em></button><button class='a2"+(hint==2?" hint":"")+"' data-a='2'><i>🛡️</i>Блок<em>"+p+"</em></button><button class='a3"+(hint==3?" hint":"")+"' data-a='3'><i>💚</i>Лікув.<em>"+Math.round(p*.75)+"</em></button>"+(cmb>=3?"<button class='a4' data-a='4'><i>⏭</i>Пропуск<em>ходу</em></button>":"")+"</div><div class='kdTip'>"+(x[0]=="big"?""+NM+" заряджає <b>суперудар "+x[1]+"</b> — блок зараз дуже доречний!":x[0]=="sh"?""+NM+" ставить щит — удар зараз частково згорить.":x[0]=="heal"?""+NM+" лікуватиметься — бий сильніше!":""+NM+" б'є на <b>"+x[1]+"</b>.")+"</div>";
    $i("kdA").onclick=function(e){var b=e.target.closest("button");if(!b)return;$i("kdA").onclick=null;act(+b.getAttribute("data-a"),p,Q)}},650)}
  else{cmb=0;log.push(Q);$i("kdC").innerHTML=playedCard(0);vib([30,40,30]);hud();
   $i("zbM").innerHTML="🔥 Карта згоріла. Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
   setTimeout(function(){if(alive(stg))aceTurn(Q)},900)}}
 function act(a,p,Q){var m="";
  if(a==1){var d=Math.max(0,p-ac.sh);var abs=p-d;ac.sh=Math.max(0,ac.sh-p);ac.hp-=d;
   fx("<g class='kdFly' style='--tx:90px;--ty:-90px'><rect x='170' y='170' width='20' height='28' rx='4' fill='#ffd23f' stroke='"+O+"' stroke-width='2.5'/></g>",500);
   setTimeout(function(){if(!alive(stg))return;hitAce();num(180,40,"-"+d,"#ffd23f");fx("<path d='M150 50 L210 110 M210 50 L150 110' stroke='#fff' stroke-width='6' stroke-linecap='round' class='zbBeam'/>",600);hud()},420);
   m="⚔️ Удар на <b>"+d+"</b>"+(abs?" (щит "+NM+"а з'їв "+abs+")":"")}
  if(a==2){me.sh+=p;fx("<ellipse class='kdShield' cx='46' cy='196' rx='46' ry='46' fill='rgba(88,196,255,.25)' stroke='#7ef0ff' stroke-width='4'/>",900);m="🛡 Блок <b>"+p+"</b> на наступний удар"}
  if(a==3){var h=Math.min(me.max-me.hp,Math.round(p*.75));me.hp+=h;fx("<g class='kdUp'><text x='50' y='170' text-anchor='middle' font-size='22' font-weight='900' fill='#7ee787' stroke='"+O+"' stroke-width='3' paint-order='stroke'>+"+h+" 💚</text></g>",1000);m="💚 Лікування <b>+"+h+"</b>"}
  if(a==4){cmb=0;m="⏭ <b>Пропуск!</b> "+NM+" пропускає хід (серія витрачена)";fx("<g class='kdUp'><text x='180' y='70' text-anchor='middle' font-size='26' font-weight='900' fill='#ffc21a' stroke='"+O+"' stroke-width='3' paint-order='stroke'>⏭ ПРОПУСК</text></g>",1000)}
  hud();me7(a==1?"hype":"happy");$i("kdW").innerHTML="";$i("zbM").innerHTML=m;
  setTimeout(function(){if(!alive(stg))return;if(a==4){turn++;$i("kdN").innerHTML="<button class='zbGo' id='kdNx'>Наступний хід ▶</button>";$i("kdNx").onclick=next;return}aceTurn(Q)},1000)}
 function aceTurn(Q){if(ac.hp<=0)return end();var x=curInt(),m="";
  if(x[0]=="atk"||x[0]=="big"){var d=Math.max(0,x[1]-me.sh),bl=x[1]-d;me.sh=Math.max(0,me.sh-x[1]);me.hp-=d;
   fx("<g class='kdFly' style='--tx:-120px;--ty:90px'><rect x='170' y='86' width='20' height='28' rx='4' fill='#ff5a7a' stroke='"+O+"' stroke-width='2.5'/></g><g class='kdFly' style='--tx:-110px;--ty:96px;animation-delay:.08s'><rect x='176' y='90' width='20' height='28' rx='4' fill='#fff' stroke='"+O+"' stroke-width='2.5'/></g>",600);
   setTimeout(function(){if(!alive(stg))return;if(d){hitMe();num(50,150,"-"+d,"#ff8aa0");if(x[0]=="big")vib([40,30,40])}else{num(50,150,"БЛОК!","#7ef0ff");me7("hype")}hud()},480);
   m=(x[0]=="big"?"💥 Суперудар "+NM+"а ":"👾 "+NM+" б'є ")+(d?"<b style='color:#ff8aa0'>−"+d+"</b>":"")+(bl?" · блок забрав "+bl:"")}
  else if(x[0]=="sh"){ac.sh+=x[1];m="🛡 "+NM+" ставить щит "+x[1];fx("<ellipse class='kdShield' cx='180' cy='70' rx='52' ry='60' fill='rgba(255,90,122,.2)' stroke='#ff5a7a' stroke-width='4'/>",900)}
  else{var h=Math.min(ac.max-ac.hp,x[1]);ac.hp+=h;m="💚 "+NM+" лікується +"+h;fx("<g class='kdUp'><text x='180' y='60' text-anchor='middle' font-size='20' font-weight='900' fill='#7ee787' stroke='"+O+"' stroke-width='3' paint-order='stroke'>+"+h+"</text></g>",1000)}
  setTimeout(function(){if(!alive(stg))return;hud();var prev=$i("zbM").innerHTML;$i("zbM").innerHTML=(prev?prev+"<br>":"")+m;turn++;
   if(ac.hp<=0||me.hp<=0||turn>=12){setTimeout(end,900);return}
   $i("kdN").innerHTML="<button class='zbGo' id='kdNx'>Наступний хід ▶</button>";$i("kdNx").onclick=next},520)}
 function end(){if(!alive(stg))return;var win=ac.hp<=0||(turn>=12&&me.hp>0&&ac.hp/ac.max<me.hp/me.max);gs9(win?"Перемога!":"Поразка");
  $i("kdI").className="kdInt"+(win?"":" hv");$i("kdI").innerHTML=win?"<small>"+NM+"</small>Неможливо… 😵":"<small>"+NM+"</small>Як завжди 😎";me7(win?"hype":"sad");$i("kdC").innerHTML="";
  if(win)$i("kdAce").setAttribute("opacity",".45");
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("kdW").innerHTML="<div class='zbRes "+(win?"w":"l")+"'><h3>"+(win?"🏆 "+NM+"а переможено!":""+NM+" цього разу сильніший")+"</h3><p>Правильних карт: <b style='color:#fff'>"+ok+" з "+tot+"</b> · найдовша серія: "+best+(win?"":"<br>Слідкуй за бульбашкою "+NM+"а: блок проти суперудару рятує.")+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("kdN").innerHTML="";
  $i("zbAg").onclick=intro;var sc=ok,t=tot;$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.card7=["🃏","Карткова дуель"];if(window.GI)GI.card7=["🃏","Карткова дуель"]}catch(e){}

/* складні ігри 7 класу (нові) — по черзі в уроках, крім кінців тем */
var CX=[["bot7","Збери бота"],["card7","Карткова дуель"],["beat7","Біт-майстер"],["alien7","Прибулець в інтернеті"],["spy7","Шифровка агента"],["tet7","Тетріс знань"],["run7","Ранер-втеча"],["tama7","Тамагочі-бот"],["kart7","Картинг-гран-прі"],["stream7","Стрім-модератор"],["ai7","Мислимо як ШІ"],["garden7","Цифровий сад"]],k=0;
if(window.LES)for(var n=1;n<=52;n++){var L=LES[700+n];if(!L||!L.g||!L.g.length||!L.q||!L.q.length)continue;
 var R=[];L.q.forEach(function(x){if(x&&x.a&&x.a.length>=2)R.push({q:x.q,o:x.a.slice(),a:0,w:x.e||""})});
 if(R.length>=8){var ci=k++%CX.length,c=CX[ci];L.g.push({type:c[0],title:c[1],rounds:R,v:Math.floor((k-1)/CX.length)})}}
})();

/* ===== 7 клас · складна гра «Біт-майстер» =====
   8 питань → 4 доріжки (бочка, хай-хет, бас, мелодія) × 2 рівні. Трек грає наживо і росте з кожною правильною відповіддю.
   Хибна відповідь — доріжка «фальшить», поки її не виправиш. Звук: WebAudio-синтез, без файлів. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var TR=[["dr","🥁","Бочка","#ff3f8e"],["ht","🎩","Хай-хет","#ffd23f"],["bs","🎸","Бас","#58c4ff"],["ml","🎹","Мелодія","#7ee787"]];
var ORDER=[0,1,2,3,0,1,2,3];
var STY={dr:[["hip","🧢 Хіп-хоп"],["dsc","🪩 Диско"]],ht:[["off","🎯 Рівний"],["swg","🌀 Свінг"]],bs:[["low","🔊 Глибокий"],["fun","🕺 Фанк"]],ml:[["arp","✨ Арпеджіо"],["chr","🎶 Хвилі"]]};

/* ---------- звук ---------- */
var A=null,MASTER=null,NOISE=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();MASTER=A.createGain();MASTER.gain.value=MUTE?0:.55;
 var comp=A.createDynamicsCompressor();MASTER.connect(comp);comp.connect(A.destination);
 var n=A.createBuffer(1,A.sampleRate*.5,A.sampleRate),d=n.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1;NOISE=n;return A}
function env(g,t,a,v,r){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+r)}
function kick(t,v){var o=A.createOscillator(),g=A.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);env(g,t,.005,v,.32);o.connect(g);g.connect(MASTER);o.start(t);o.stop(t+.4)}
function noise(t,v,f,len,type){var s=A.createBufferSource(),fl=A.createBiquadFilter(),g=A.createGain();s.buffer=NOISE;fl.type=type||"highpass";fl.frequency.value=f;env(g,t,.002,v,len);s.connect(fl);fl.connect(g);g.connect(MASTER);s.start(t);s.stop(t+len+.05)}
function snare(t,v){noise(t,v*.8,1400,.18,"bandpass");var o=A.createOscillator(),g=A.createGain();o.type="triangle";o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(120,t+.1);env(g,t,.003,v*.5,.12);o.connect(g);g.connect(MASTER);o.start(t);o.stop(t+.2)}
function tone(t,f,v,len,type,cut){var o=A.createOscillator(),g=A.createGain(),fl=A.createBiquadFilter();o.type=type;o.frequency.value=f;fl.type="lowpass";fl.frequency.setValueAtTime(cut,t);fl.frequency.exponentialRampToValueAtTime(Math.max(200,cut/4),t+len);env(g,t,.008,v,len);o.connect(fl);fl.connect(g);g.connect(MASTER);o.start(t);o.stop(t+len+.05)}
function hz(m){return 440*Math.pow(2,(m-69)/12)}
/* прогресія Am – F – C – G, 4 такти по 16 кроків */
var SONGS=[{n:"Неонова ніч",b:100,r:[45,41,48,43],c:[[57,60,64],[53,57,60],[55,60,64],[55,59,62]]},
 {n:"Сонячний поп",b:112,r:[48,43,45,41],c:[[60,64,67],[55,59,62],[57,60,64],[53,57,60]]},
 {n:"Космо-чіл",b:92,r:[50,46,41,48],c:[[62,65,69],[58,62,65],[57,60,65],[55,60,64]]},
 {n:"Турбо-рейв",b:124,r:[40,48,43,50],c:[[59,64,67],[60,64,67],[59,62,67],[57,62,66]]}];
var SONG=SONGS[0],ROOT=SONG.r,CH=SONG.c;
var PAT={
 dr:{hip:[[0,10],[4,12]],dsc:[[0,4,8,12],[4,12]]},
 ht:{off:[2,6,10,14],swg:[0,3,6,8,11,14]},
 bs:{low:[0,8],fun:[0,3,6,10,12]},
 ml:{arp:[0,4,8,12],chr:[0,6,10]}};
function play(S,step,t){var bar=Math.floor(step/16)%4,s=step%16;
 TR.forEach(function(tr){var k=tr[0],L=S.lv[k],sty=S.st[k]||STY[k][0][0],bad=S.bad[k];if(!L&&!bad)return;
  var v=bad?.5:1,ss=bad?(s+3)%16:s;
  if(k=="dr"){var p=PAT.dr[sty];if(p[0].indexOf(ss)>=0)kick(t,.9*v);if(p[1].indexOf(ss)>=0)snare(t,.5*v);if(L>=2&&(ss==7||ss==15&&bar==3))kick(t,.6*v);if(L>=2&&ss==14&&bar%2)snare(t,.25*v)}
  if(k=="ht"){var h=PAT.ht[sty];if(h.indexOf(ss)>=0)noise(t,.22*v,7000,.05);if(L>=2&&ss%2==1&&h.indexOf(ss)<0)noise(t,.09*v,9000,.03);if(L>=2&&ss==15&&bar==3){noise(t,.12,8000,.03);noise(t+.07,.12,8000,.03)}}
  if(k=="bs"){var b=PAT.bs[sty],r=ROOT[bar]+(bad?1:0);if(b.indexOf(ss)>=0)tone(t,hz(r+(sty=="fun"&&ss==6?12:0)),.32*v,.22,"sawtooth",900);if(L>=2&&(ss==14))tone(t,hz(r+7),.22*v,.12,"sawtooth",1200)}
  if(k=="ml"){var m=PAT.ml[sty],c=CH[bar];if(m.indexOf(ss)>=0){var n=c[(m.indexOf(ss))%3]+12+(bad?1:0);tone(t,hz(n),.16*v,sty=="chr"?.5:.22,sty=="chr"?"triangle":"square",sty=="chr"?2400:3200)}
   if(L>=2&&(ss==2||ss==14||ss==10&&bar%2))tone(t,hz(c[2]+24),.08*v,.15,"triangle",4000)}})}

/* ---------- стилі ---------- */
var CSS="\
.btSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.btSt>svg{display:block;width:100%;height:auto}\
.btDj{position:absolute;left:39%;top:14%;width:22%;pointer-events:none}.btDj svg{width:100%;height:auto}\
.btDj.beat{animation:btBp .3s ease-out}@keyframes btBp{30%{transform:translateY(-5px) scale(1.04)}}\
.btMu{position:absolute;right:8px;top:8px;z-index:3;width:38px!important;height:38px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:12px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:18px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.btHud{position:absolute;left:8px;top:8px;display:flex;gap:6px;pointer-events:none}.btHud span{background:rgba(10,5,40,.82);border:2px solid #fff;border-radius:11px;padding:3px 9px;font:900 12px system-ui;color:#fff}\
.btP{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .btP button{position:relative;width:auto!important;margin:0!important;min-height:66px;border:3px solid "+O+"!important;border-radius:16px!important;padding:10px 8px!important;background:radial-gradient(circle at 50% 35%,var(--pc),#2a1d78 120%)!important;color:#fff!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 5px 0 "+O+",inset 0 0 0 3px rgba(255,255,255,.18)!important;cursor:pointer;text-align:center;text-transform:none!important;text-shadow:0 2px 0 rgba(0,0,0,.4)}\
.zb .btP button:nth-child(1){--pc:#ff3f8e}.zb .btP button:nth-child(2){--pc:#ff9a2a}.zb .btP button:nth-child(3){--pc:#1f9fff}.zb .btP button:nth-child(4){--pc:#2bb24c}\
.zb .btP button:active{transform:translateY(4px);box-shadow:0 1px 0 "+O+"!important}\
.zb .btP button.bOk{filter:brightness(1.25);box-shadow:0 0 0 5px #7ee787,0 5px 0 "+O+"!important}.zb .btP button.bBad{filter:grayscale(1) brightness(.6)}.zb .btP button.bDim{opacity:.3}\
.btS{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .btS button{width:auto!important;margin:0!important;border:3px solid "+O+"!important;border-radius:16px!important;padding:14px 6px!important;background:#fff!important;color:#1a0e3a!important;font:900 15px system-ui!important;box-shadow:0 5px 0 "+O+"!important;cursor:pointer;text-transform:none!important;min-height:0!important}\
.zb .btS button small{display:block;font:700 11px system-ui;color:#6b5fc7;margin-top:2px}\
.btEq{transform-box:fill-box;transform-origin:bottom}\
.btSpk{transform-box:fill-box;transform-origin:center}.btSpk.on{animation:btSk .25s ease-out}@keyframes btSk{40%{transform:scale(1.12)}}\
.btCr{transform-box:fill-box;transform-origin:bottom}.btCr.on{animation:btCj .3s ease-out}@keyframes btCj{40%{transform:translateY(-6px)}}\
.btLz{animation:btLz 4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:top}@keyframes btLz{from{transform:rotate(-18deg)}to{transform:rotate(18deg)}}\
body.lite .btLz{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

/* ---------- сцена ---------- */
function stage(){var s="<defs><linearGradient id='btBg' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#0c0530'/><stop offset='1' stop-color='#2a1478'/></linearGradient><radialGradient id='btGl' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#ff3f8e' stop-opacity='.55'/><stop offset='1' stop-color='#ff3f8e' stop-opacity='0'/></radialGradient></defs><rect width='360' height='270' fill='url(#btBg)'/>";
 s+="<g opacity='.55'><path class='btLz' d='M60 0 L40 150 L80 150z' fill='#ff3f8e' opacity='.25'/><path class='btLz' style='animation-delay:-2s' d='M300 0 L280 150 L320 150z' fill='#58c4ff' opacity='.25'/></g>";
 s+="<circle cx='180' cy='62' r='70' fill='url(#btGl)'/>";
 function spk(x,id){return "<g transform='translate("+x+",58)'><rect x='-28' y='-40' width='56' height='92' rx='10' fill='#1a0e3a' stroke='#4a3ab8' stroke-width='3'/><g id='"+id+"' class='btSpk'><circle cx='0' cy='-14' r='12' fill='#2a1d78' stroke='#58c4ff' stroke-width='3'/><circle cx='0' cy='24' r='19' fill='#2a1d78' stroke='#ff3f8e' stroke-width='3'/><circle cx='0' cy='24' r='7' fill='#4a3ab8'/></g></g>"}
 s+=spk(46,"btK1")+spk(314,"btK2");
 s+="<rect x='112' y='92' width='136' height='22' rx='6' fill='#2a1d78' stroke='"+O+"' stroke-width='3'/><circle cx='138' cy='103' r='7' fill='#1a0e3a' stroke='#ffd23f' stroke-width='2'/><circle cx='222' cy='103' r='7' fill='#1a0e3a' stroke='#ffd23f' stroke-width='2'/><rect x='160' y='99' width='40' height='8' rx='3' fill='#58c4ff' opacity='.6'/>";
 /* сітка 4×16 */
 TR.forEach(function(tr,r){s+="<text x='12' y='"+(140+r*20)+"' font-size='13'>"+tr[1]+"</text>";for(var c=0;c<16;c++)s+="<rect id='btC"+r+"_"+c+"' x='"+(32+c*20)+"' y='"+(127+r*20)+"' width='17' height='16' rx='4' fill='rgba(255,255,255,.08)'/>"});
 s+="<rect id='btPh' x='31' y='124' width='19' height='80' rx='5' fill='none' stroke='#fff' stroke-width='2'/>";
 /* натовп */
 var cr="";for(var i=0;i<14;i++){var x=14+i*25.5,h=24+(i*7)%12;cr+="<g class='btCr' id='btP"+i+"'><circle cx='"+x+"' cy='"+(256-h)+"' r='8' fill='#0a0420'/><rect x='"+(x-10)+"' y='"+(262-h)+"' width='20' height='"+(h+4)+"' rx='8' fill='#0a0420'/>"+(i%3==0?"<path d='M"+(x+8)+" "+(258-h)+" l8 -16' stroke='#0a0420' stroke-width='5' stroke-linecap='round'/>":"")+"</g>"}
 s+="<rect y='212' width='360' height='58' fill='#140a46'/>"+cr;
 return s}

/* ---------- гра ---------- */
GM.beat7=function(g){inj();SONG=SONGS[(g.v||0)%SONGS.length];ROOT=SONG.r;CH=SONG.c;var POOL,S,qi,ok,tot,log,stg,step=0,nextT=0,timer=0,t0=0,hype=0,run=false;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);S={lv:{},st:{},bad:{}};qi=0;ok=0;tot=0;log=[];hype=0}
 function stop(){run=false;clearInterval(timer);timer=0}
 function sched(){if(!alive(stg)){stop();return}if(!A)return;while(nextT<A.currentTime+.12){var st=step,tt=nextT;play(S,st,tt);(function(st,tt){setTimeout(function(){vis(st)},Math.max(0,(tt-A.currentTime)*1000))})(st,tt);nextT+=60/SONG.b/4;step++}}
 function startAudio(){if(!ac())return;try{A.resume()}catch(e){}if(run)return;run=true;nextT=A.currentTime+.08;step=0;timer=setInterval(sched,25)}
 function vis(st){if(!alive(stg))return;var s=st%16,ph=$i("btPh");if(ph)ph.setAttribute("x",31+s*20);
  var any=false;TR.forEach(function(tr,r){var k=tr[0],c=$i("btC"+r+"_"+s);if(!c)return;var on=hit(k,st);if(on)any=true;
   for(var q=0;q<16;q++){var e=$i("btC"+r+"_"+q);if(e)e.setAttribute("fill",cellOn(k,q)?(S.bad[k]?"#8f96a3":tr[3]):"rgba(255,255,255,.08)")}
   if(on)c.setAttribute("fill","#fff")});
  if(s%4==0&&(S.lv.dr||S.bad.dr)){["btK1","btK2"].forEach(function(id){var e=$i(id);if(e){e.setAttribute("class","btSpk");void e.getBoundingClientRect();e.setAttribute("class","btSpk on")}});
   var dj=$i("btDj");if(dj){dj.classList.remove("beat");void dj.offsetWidth;dj.classList.add("beat")}
   var n=Math.min(14,Math.round(hype));for(var i=0;i<14;i++){var p=$i("btP"+i);if(!p)continue;if(i<n&&(i+s/4)%2<1.5){p.setAttribute("class","btCr");void p.getBoundingClientRect();p.setAttribute("class","btCr on")}}}}
 function cellOn(k,q){var L=S.lv[k],b=S.bad[k];if(!L&&!b)return false;var sty=S.st[k]||STY[k][0][0],ss=b?(q+3)%16:q,P=PAT[k][sty];
  if(k=="dr")return P[0].indexOf(ss)>=0||P[1].indexOf(ss)>=0||(L>=2&&ss==7);if(k=="ht")return P.indexOf(ss)>=0||(L>=2&&ss%2==1);return P.indexOf(ss)>=0||(L>=2&&(ss==14||ss==2))}
 function hit(k,st){return cellOn(k,st%16)}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(MASTER)MASTER.gain.value=MUTE?0:.55;var b=$i("btMu");if(b)b.textContent=MUTE?"🔇":"🔊"}

 /* --- старт --- */
 function intro(){stop();reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'>";
  for(var b=0;b<16;b++){var h=18+((b*37)%60);art+="<rect x='"+(20+b*20.5)+"' y='"+(140-h)+"' width='14' height='"+h+"' rx='4' fill='"+["#fff","#ffd23f","#58c4ff","#1a0e3a"][b%4]+"' opacity='"+(b%4==3?.5:.85)+"'/>"}
  art+="<text x='300' y='40' font-size='30'>🎧</text><text x='40' y='44' font-size='26'>🎵</text></svg>";
  $i("zbR").innerHTML="<div class='zbHd'><small>СКЛАДНА ГРА · ТРЕК «"+SONG.n+"» · "+SONG.b+" BPM</small><b>Біт-майстер</b>"+art+"</div>"
   +"<div class='zbIn'><h3>Тиша перед фіналом</h3><p>Діджей-бот готує трек для фіналу сезону, але пульт заблоковано. Кожна правильна відповідь вмикає звук — і трек росте просто в тебе у вухах. <b style='color:#ffd23f'>Увімкни звук! 🔊</b></p>"
   +"<div class='zbRu'><i>🎧</i><span><b>8 питань — 4 доріжки по 2 рівні:</b> 🥁 бочка, 🎩 хай-хет, 🎸 бас, 🎹 мелодія. Перша правильна відповідь вмикає доріжку — і ти обираєш її стиль.</span></div>"
   +"<div class='zbRu'><i>📈</i><span><b>Друга правильна — прокачує доріжку</b>: більше нот, складніший ритм. Відповів <b>за 30 секунд</b> — натовп заводиться сильніше.</span></div>"
   +"<div class='zbRu'><i>🙉</i><span><b>Помилка — доріжка фальшить</b>: зсунутий ритм і криві ноти. Виправиш наступною правильною відповіддю на цю доріжку.</span></div>"
   +"<button class='zbGo' id='zbGo'>До пульта ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}build()}}

 /* --- студія --- */
 function build(){shell();gs9("Біт-майстер");
  $i("zbR").innerHTML="<div class='btSt'><svg id='btS' viewBox='0 0 360 270' xmlns='http://www.w3.org/2000/svg'>"+stage()+"</svg><div class='btDj' id='btDj'>"+B7("happy")+"</div><div class='btHud'><span id='btH'></span></div><button class='btMu' id='btMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='btW'></div><div class='zbMsg' id='zbM'></div><div id='btN'></div>";
  stg=$i("btS");$i("btMu").onclick=mute;startAudio();hud();ask()}
 function hud(){var n=0;TR.forEach(function(t){n+=S.lv[t[0]]||0});$i("btH").textContent="🎵 "+n+"/8 · 🔥 "+Math.round(hype)}
 function ask(){if(!alive(stg))return;if(qi>=8)return finale();var tr=TR[ORDER[qi]],Q=POOL[qi%POOL.length];$i("zbM").innerHTML="";$i("btN").innerHTML="";
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("btW").innerHTML="<div class='zbQ'><small>"+tr[1]+" "+tr[2]+" · "+((S.lv[tr[0]]||0)?"прокачка":"увімкнення")+"</small><b>"+esc(Q.q)+"</b><div class='zbT' id='zbT'><i></i></div></div><div class='btP' id='btPd'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>";
  var T=$i("zbT");T.className="zbT";void T.offsetWidth;T.firstChild.style.animation="zbTm 30s linear forwards";t0=Date.now();
  gs9("Пульт · "+(qi+1)+"/8");
  $i("btPd").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ans(Q,+b.getAttribute("data-i"),tr)}}
 function ans(Q,j,tr){var c=Q._o[j].c,k=tr[0],fast=Date.now()-t0<=30000;tot++;var Tb=$i("zbT");Tb.className="zbT off";Tb.firstChild.style.animation="none";
  [].forEach.call($i("btPd").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"bOk":(i==j?"bBad":"bDim")});
  if(c){ok++;hype+=fast?2.2:1.2;vib(20);var first=!S.lv[k];S.lv[k]=(S.lv[k]||0)+1;S.bad[k]=false;
   var dj=$i("btDj");if(dj)dj.innerHTML=B7("hype");
   if(first){$i("zbM").innerHTML="✅ "+tr[1]+" <b>"+tr[2]+"</b> увімкнено! Обери стиль:";
    $i("btN").innerHTML="<div class='btS'>"+STY[k].map(function(s,i){return "<button data-s='"+s[0]+"'>"+s[1]+"<small>"+(i?"варіант Б":"варіант А")+"</small></button>"}).join("")+"</div>";
    S.st[k]=STY[k][0][0];
    $i("btN").firstChild.onclick=function(e){var b=e.target.closest("button");if(!b)return;S.st[k]=b.getAttribute("data-s");$i("btN").innerHTML="";$i("zbM").innerHTML="🎧 Стиль «"+b.textContent.replace(/варіант.*/,"")+"» — слухай!";hud();$i("btN").innerHTML="<button class='zbGo' id='btNx'>"+(qi>=8?"До прем'єри ▶":"Далі ▶")+"</button>";$i("btNx").onclick=ask};
    qi++;hud();return}
   $i("zbM").innerHTML="🔥 "+tr[1]+" <b>"+tr[2]+"</b> прокачано — більше нот!"+(fast?" Натовп реве!":"");qi++;hud();$i("btN").innerHTML="<button class='zbGo' id='btNx'>"+(qi>=8?"До прем'єри ▶":"Далі ▶")+"</button>";$i("btNx").onclick=ask;return}
  log.push(Q);S.bad[k]=true;hype=Math.max(0,hype-1);vib([30,40,30]);var dj2=$i("btDj");if(dj2)dj2.innerHTML=B7("sad");
  $i("zbM").innerHTML="🙉 "+tr[2]+" фальшить! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
  qi++;hud();$i("btN").innerHTML="<button class='zbGo' id='btNx'>"+(qi>=8?"До прем'єри ▶":"Далі ▶")+"</button>";$i("btNx").onclick=ask}
 function finale(){var lv=0;TR.forEach(function(t){lv+=S.lv[t[0]]||0});var stars=ok>=7?3:ok>=5?2:ok>=3?1:0;hype=Math.max(hype,stars*4);
  var dj=$i("btDj");if(dj)dj.innerHTML=B7(stars>=2?"hype":"happy");gs9("Прем'єра!");hud();
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("btW").innerHTML="<div class='zbRes "+(stars>=2?"w":"l")+"'><h3>"+["Трек ще сирий","🎵 Непоганий трек","🔥 Хіт сезону","🏆 Легендарний біт"][stars]+"</h3><p>"+"⭐".repeat(stars)+"☆".repeat(3-stars)+"<br>Правильних: <b style='color:#fff'>"+ok+" з "+tot+"</b> · доріжок прокачано: "+lv+"/8</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="Трек грає — послухай, що вийшло 🎧";$i("btN").innerHTML="";
  $i("zbAg").onclick=function(){stop();intro()};var sc=ok,t=tot;$i("zbEnd").onclick=function(){stop();fin9(sc,t)}}
 document.addEventListener("visibilitychange",function(){if(!A)return;try{document.hidden?A.suspend():(run&&A.resume())}catch(e){}});
 intro()};
try{if(window.GI7)GI7.beat7=["🎵","Біт-майстер"];if(window.GI)GI.beat7=["🎵","Біт-майстер"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Прибулець в інтернеті» =====
   1) Навчання: "+NM+" питає — ти пояснюєш. Правильно → кристал знань. Хибно → вірус-глюк і питання йде «в борг».
   2) Іспит на кораблі: "+NM+" сам відповідає на вивчене, а там, де ти помилився, шепоче «підкажи!» — друга спроба.
   Бали: перша спроба 2, друга 1 (з 12). Звук — WebAudio, кнопка 🔊. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.5;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.2,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={talk:function(){if(!ac())return;var t=A.currentTime;for(var i=0;i<6;i++)bp(500+Math.random()*700,t+i*.07,.06,"square",.06)},
 ok:function(){if(!ac())return;var t=A.currentTime;[660,880,1320].forEach(function(f,i){bp(f,t+i*.08,.18,"triangle",.18)})},
 bad:function(){if(!ac())return;var t=A.currentTime;bp(220,t,.35,"sawtooth",.12,70);for(var i=0;i<5;i++)bp(100+Math.random()*900,t+.05+i*.05,.04,"square",.05)},
 beam:function(){if(!ac())return;bp(300,A.currentTime,.6,"sine",.12,1200)},
 yes:function(){if(!ac())return;bp(1046,A.currentTime,.12,"sine",.15)},
 win:function(){if(!ac())return;var t=A.currentTime;[523,659,784,1046,1318].forEach(function(f,i){bp(f,t+i*.11,.3,"triangle",.16)})}};

/* ---------- "+NM+" ---------- */
var AV=0,SKIN=[["#7ee787","#3fbf6a"],["#7ec8ff","#3f8fdf"],["#ff9ad5","#e05aa8"]];
function blup(mood){var S="stroke='"+O+"' stroke-width='3.5' stroke-linejoin='round'",gl=mood=="glitch",c=gl?"#a8ff3e":SKIN[AV][0],c2=gl?"#5fbf1f":SKIN[AV][1];
 var eyes=mood=="happy"?"<path d='M-16 -30 q6 -8 12 0 M4 -30 q6 -8 12 0' stroke='"+O+"' stroke-width='4' fill='none' stroke-linecap='round'/>":mood=="sad"?"<ellipse cx='-10' cy='-28' rx='7' ry='9' fill='"+O+"'/><ellipse cx='10' cy='-28' rx='7' ry='9' fill='"+O+"'/><path d='M-18 -37 l10 -5 M18 -37 l-10 -5' stroke='"+O+"' stroke-width='3' stroke-linecap='round'/>":gl?"<text x='-10' y='-22' text-anchor='middle' font-size='16' font-weight='900' fill='#ff2e63'>×</text><text x='10' y='-22' text-anchor='middle' font-size='16' font-weight='900' fill='#ff2e63'>×</text>":"<ellipse class='alEye' cx='-10' cy='-28' rx='8' ry='11' fill='"+O+"'/><ellipse class='alEye' cx='10' cy='-28' rx='8' ry='11' fill='"+O+"'/><circle cx='-7' cy='-32' r='3' fill='#fff'/><circle cx='13' cy='-32' r='3' fill='#fff'/>";
 var mouth=mood=="happy"?"<path d='M-8 -10 q8 10 16 0' fill='#ff6b9a' "+S+"/>":mood=="sad"||gl?"<path d='M-7 -8 q7 -6 14 0' fill='none' "+S+"/>":"<ellipse cx='0' cy='-10' rx='4' ry='3' fill='"+O+"'/>";
 return "<g class='alB"+(gl?" alGl":"")+"'><path d='M-8 -58 Q-14 -76 -22 -80' fill='none' "+S+"/><path d='M8 -58 Q14 -76 22 -80' fill='none' "+S+"/><circle class='alAnt' cx='-22' cy='-82' r='6' fill='#ffd23f' "+S+"/><circle class='alAnt' cx='22' cy='-82' r='6' fill='#ffd23f' "+S+"/>"
  +"<path d='M-20 6 Q-24 40 -14 44 H14 Q24 40 20 6z' fill='"+c2+"' "+S+"/><path d='M-20 14 Q-34 20 -36 30' fill='none' "+S+" stroke-linecap='round'/><path d='M20 14 Q34 18 38 6' fill='none' "+S+" stroke-linecap='round'/>"
  +"<ellipse cx='0' cy='-26' rx='34' ry='32' fill='"+c+"' "+S+"/>"+eyes+mouth+"<ellipse cx='-22' cy='-14' rx='5' ry='3' fill='#ff8ab0' opacity='.6'/><ellipse cx='22' cy='-14' rx='5' ry='3' fill='#ff8ab0' opacity='.6'/>"
  +"<rect x='26' y='-6' width='20' height='30' rx='5' fill='#1a0e3a' "+S+" transform='rotate(18 36 9)'/><rect x='29' y='-2' width='14' height='20' rx='3' fill='#58c4ff' transform='rotate(18 36 9)'/></g>"}
function saucer(inner){return "<g><ellipse cx='0' cy='30' rx='92' ry='26' fill='#8f96c8' stroke='"+O+"' stroke-width='3.5'/><ellipse cx='0' cy='24' rx='92' ry='18' fill='#b9bfe8' stroke='"+O+"' stroke-width='3'/>"
 +"<path d='M-52 22 A52 56 0 0 1 52 22z' fill='rgba(160,230,255,.35)' stroke='"+O+"' stroke-width='3.5'/>"+inner
 +[-60,-30,0,30,60].map(function(x,i){return "<circle class='alLt' style='animation-delay:"+(i*.2)+"s' cx='"+x+"' cy='"+(38-Math.abs(x)/6)+"' r='5' fill='#ffd23f' stroke='"+O+"' stroke-width='2'/>"}).join("")
 +"<path d='M-36 8 A40 30 0 0 1 -6 -24' stroke='#fff' stroke-width='5' fill='none' opacity='.5' stroke-linecap='round'/></g>"}

/* ---------- сцени ---------- */
function city(){var s="<defs><linearGradient id='alSky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#0b0530'/><stop offset='1' stop-color='#3a1d8f'/></linearGradient><linearGradient id='alBm' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#a8ff3e' stop-opacity='.5'/><stop offset='1' stop-color='#a8ff3e' stop-opacity='0'/></linearGradient></defs><rect width='360' height='260' fill='url(#alSky)'/>";
 for(var i=0;i<26;i++)s+="<circle cx='"+((i*61)%360)+"' cy='"+((i*37)%120)+"' r='"+(i%4?1:1.8)+"' fill='#fff' opacity='.7'/>";
 s+="<circle cx='310' cy='40' r='18' fill='#fff6c9' opacity='.9'/><circle cx='303' cy='35' r='4' fill='#e8dca0'/>";
 s+="<polygon id='alBeam' points='150,120 210,120 270,260 90,260' fill='url(#alBm)' opacity='0'/>";
 var B=[[0,70,46],[50,110,40],[96,60,34],[136,130,30],[172,80,44],[222,120,36],[264,70,42],[312,100,48]];
 B.forEach(function(b,i){var x=b[0],h=b[1],w=b[2];s+="<rect x='"+x+"' y='"+(260-h)+"' width='"+w+"' height='"+h+"' fill='#1a0e4a' stroke='#2e1f78' stroke-width='2'/>";
  for(var y=260-h+10;y<250;y+=14)for(var k=x+7;k<x+w-8;k+=12)s+="<rect x='"+k+"' y='"+y+"' width='6' height='7' fill='"+(((k+y+i)%5)?"#2e1f78":"#ffd23f")+"' opacity='.85'/>"});
 [[40,170,"#58c4ff"],[300,150,"#ff3f8e"],[120,190,"#ffd23f"]].forEach(function(w,i){s+="<g class='alWf' style='animation-delay:"+(i*.6)+"s' transform='translate("+w[0]+","+w[1]+")' stroke='"+w[2]+"' stroke-width='3' fill='none' stroke-linecap='round'><path d='M-12 0 A17 17 0 0 1 12 0'/><path d='M-7 5 A10 10 0 0 1 7 5'/><circle cx='0' cy='10' r='2' fill='"+w[2]+"'/></g>"});
 return s}
function ship(){var s="<defs><radialGradient id='alIn' cx='.5' cy='.4' r='.8'><stop offset='0' stop-color='#4a2bb8'/><stop offset='1' stop-color='#120838'/></radialGradient></defs><rect width='360' height='260' fill='url(#alIn)'/>";
 s+="<circle cx='180' cy='70' r='52' fill='#05021a' stroke='#8f96c8' stroke-width='6'/><circle cx='196' cy='86' r='26' fill='#1f6fff'/><path d='M180 76 q10 -8 20 2 q6 10 -4 16 q-10 2 -16 -8z' fill='#2bb24c'/>";
 for(var i=0;i<10;i++)s+="<circle cx='"+(140+(i*17)%80)+"' cy='"+(30+(i*23)%70)+"' r='1.2' fill='#fff'/>";
 s+="<path d='M0 200 H360 V260 H0z' fill='#1a0e4a'/><path d='M0 200 H360' stroke='#a8ff3e' stroke-width='3' opacity='.6'/>";
 [[60,"#ff9ad5"],[300,"#9ad5ff"],[180,"#ffd23f"]].forEach(function(j,i){var x=j[0],big=i==2;if(big)return;s+="<rect x='"+(x-34)+"' y='150' width='68' height='50' rx='8' fill='#2a1d78' stroke='"+O+"' stroke-width='3'/><g transform='translate("+x+",132) scale(.7)'><ellipse cx='0' cy='-20' rx='30' ry='28' fill='"+j[1]+"' stroke='"+O+"' stroke-width='3.5'/><ellipse cx='-9' cy='-22' rx='6' ry='8' fill='"+O+"'/><ellipse cx='9' cy='-22' rx='6' ry='8' fill='"+O+"'/><path d='M-8 -4 h16' stroke='"+O+"' stroke-width='3'/></g><circle id='alJ"+i+"' cx='"+x+"' cy='176' r='13' fill='#2a1d78' stroke='#fff' stroke-width='2.5'/>"});
 return s}

/* ---------- стилі ---------- */
var CSS="\
.alSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.alSt>svg{display:block;width:100%;height:auto}\
.alSay{position:absolute;left:4%;top:5%;max-width:52%;background:#fff;color:#1a0e3a;border:3px solid "+O+";border-radius:16px;padding:7px 10px;font:800 12.5px/1.3 system-ui;box-shadow:0 4px 0 rgba(0,0,0,.3)}\
.alSay:after{content:'';position:absolute;right:-12px;top:18px;border:9px solid transparent;border-left-color:"+O+"}\
.alSay i{display:block;font-style:normal;font:900 10px system-ui;color:#3fbf6a;letter-spacing:.06em;text-transform:uppercase;margin-bottom:2px}\
.alSay.pop{animation:alPop .3s cubic-bezier(.3,1.6,.5,1)}@keyframes alPop{0%{transform:scale(.6);opacity:0}}\
.alHud{position:absolute;left:8px;right:52px;bottom:8px;display:flex;gap:4px;pointer-events:none}\
.alHud b{flex:1;height:22px;border-radius:7px;border:2px solid rgba(255,255,255,.35);background:rgba(10,5,40,.7);display:grid;place-items:center;font-size:12px}\
.alHud b.k{background:#3fbf6a;border-color:#a8ff3e}.alHud b.v{background:#5a1f3a;border-color:#ff2e63}.alHud b.r{background:#3fbf6a;border-color:#ffd23f}\
.alMu{position:absolute;right:8px;bottom:6px;z-index:3;width:38px!important;height:38px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:12px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:18px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.alO{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .alO button{position:relative;width:auto!important;margin:0!important;min-height:60px;border:3px solid "+O+"!important;border-radius:18px 18px 18px 6px!important;padding:10px 10px!important;background:#fff!important;color:#1a0e3a!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 5px 0 "+O+"!important;cursor:pointer;text-align:left;text-transform:none!important}\
.zb .alO button:before{content:'🧑‍🚀';position:absolute;right:6px;top:-12px;font-size:16px}\
.zb .alO button:active{transform:translateY(4px);box-shadow:0 1px 0 "+O+"!important}\
.zb .alO button.aOk{background:#a8ff3e!important}.zb .alO button.aBad{background:#ffb3c4!important}.zb .alO button.aDim{opacity:.35}\
.alB{transform-box:fill-box}.alFl{animation:alFl 3s ease-in-out infinite}@keyframes alFl{50%{transform:translateY(-6px)}}\
.alGl{animation:alGl .25s steps(2) infinite}@keyframes alGl{0%{transform:translate(-3px,1px)}50%{transform:translate(3px,-1px)}}\
.alHap{animation:alHp .5s ease-out 2}@keyframes alHp{40%{transform:translateY(-14px) rotate(-6deg)}}\
.alEye{animation:alBl 3.2s infinite;transform-box:fill-box;transform-origin:center}@keyframes alBl{0%,92%,100%{transform:none}95%{transform:scaleY(.1)}}\
.alLt{animation:alLt 1.2s infinite}@keyframes alLt{50%{fill:#ff3f8e}}\
.alAnt{animation:alAn 1.6s infinite}@keyframes alAn{50%{fill:#fff}}\
.alWf{animation:alWf 2.4s ease-in-out infinite}@keyframes alWf{50%{opacity:.25}}\
.alBeamOn{animation:alBm 1s ease-out}@keyframes alBm{0%,100%{opacity:0}30%{opacity:1}}\
.alSpam{position:absolute;z-index:4;background:#fff;border:3px solid #ff2e63;border-radius:10px;padding:5px 8px;font:900 11px system-ui;color:#ff2e63;box-shadow:0 4px 0 rgba(0,0,0,.35);animation:alSp .25s cubic-bezier(.3,1.6,.5,1) both;pointer-events:none}@keyframes alSp{0%{transform:scale(.3)}}\
body.lite .alFl,body.lite .alEye,body.lite .alLt,body.lite .alAnt,body.lite .alWf{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

var ASK=["@N! Земляни, поясніть:","Мої сенсори плутаються…","На моїй планеті такого нема:","@N-блюп, допоможи:","Інтернет дивний. Питання:","Мамка-корабель питає:"];
var SPAM=["🦠 Вірус.exe","🔔 Підпишись на 500 каналів!","📩 Перешли 10 друзям!","⚠️ Твій пароль: 1234?","🤖 Скачай «Безкоштовний антивірус»"];
GM.alien7=function(g){AV=(g.v||0)%3;var NM=["Блюп", "Зіп", "Хрум"][(g.v||0)%3];inj();var POOL,qi,first,retry,log,debt,known,stg,t0;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]).slice(0,6);qi=0;first=0;retry=0;log=[];debt=[];known=[]}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.5;var b=$i("alMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function say(t,tag){var e=$i("alSay");if(!e)return;e.innerHTML=(tag?"<i>"+tag+"</i>":"")+t;e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop");SND.talk()}
 function setB(m,cls){var b=$i("alBp");if(b)b.innerHTML=blup(m);var w=$i("alBw");if(w){w.setAttribute("class","");void w.getBoundingClientRect();w.setAttribute("class",cls||"alFl")}}
 function hud(){var h="";for(var i=0;i<6;i++){var st=i<qi?(debt.indexOf(i)>=0?"v":"k"):"";h+="<b class='"+st+"'>"+(st=="k"?"💎":st=="v"?"🦠":"")+"</b>"}$i("alHd").innerHTML=h}

 /* --- старт --- */
 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 170' xmlns='http://www.w3.org/2000/svg'><g transform='translate(180,86) scale(.95)'>"+saucer("<g transform='translate(0,8) scale(.7)'>"+blup("happy")+"</g>")+"</g><polygon points='140,118 220,118 250,170 110,170' fill='#a8ff3e' opacity='.25'/><text x='38' y='60' font-size='26'>📶</text><text x='300' y='140' font-size='24'>🌍</text></svg>";
  $i("zbR").innerHTML="<div class='zbHd'><small>СКЛАДНА ГРА · КОСМІЧНИЙ СТУДЕНТ</small><b>Прибулець в інтернеті</b>"+art+"</div>"
   +"<div class='zbIn'><h3>"+NM+" уперше в мережі</h3><p>Прибулець "+NM+" прилетів вивчати земний інтернет. Він вірить <b style='color:#a8ff3e'>кожному твоєму слову</b> — і завтра складає іспит перед екіпажем материнського корабля. Чого навчиш, те й скаже!</p>"
   +"<div class='zbRu'><i>💎</i><span><b>6 питань від "+NM+"а.</b> Правильне пояснення — кристал знань у його колекцію.</span></div>"
   +"<div class='zbRu'><i>🦠</i><span><b>Помилка — "+NM+" ловить вірус</b> і творить дичину. Це питання він запам'ятає неправильно.</span></div>"
   +"<div class='zbRu'><i>🛸</i><span><b>Іспит на кораблі.</b> Вивчене "+NM+" відповість сам. А там, де ти помилився, він шепне <b>«підкажи!»</b> — це твій другий шанс виправитись.</span></div>"
   +"<button class='zbGo' id='zbGo'>Зустріти "+NM+"а ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}learn()}}

 /* --- навчання над містом --- */
 function learn(){shell();gs9("Навчання · 1/6");
  $i("zbR").innerHTML="<div class='alSt'><svg id='alS' viewBox='0 0 360 260' xmlns='http://www.w3.org/2000/svg'>"+city()+"<g transform='translate(250,92)'><g id='alBw' class='alFl'>"+saucer("<g transform='translate(0,8) scale(.7)'><g id='alBp'>"+blup()+"</g></g>")+"</g></g></svg>"
   +"<div class='alSay' id='alSay'></div><div class='alHud' id='alHd'></div><button class='alMu' id='alMu'>"+(MUTE?"🔇":"🔊")+"</button><div id='alSpm'></div></div>"
   +"<div id='alW'></div><div class='zbMsg' id='zbM'></div><div id='alN'></div>";
  stg=$i("alS");$i("alMu").onclick=mute;hud();askL()}
 function opts(Q,id){var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;return "<div class='alO' id='"+id+"'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>"}
 function mark(id,Q,j){[].forEach.call($i(id).querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"aOk":(i==j?"aBad":"aDim")})}
 function askL(){if(!alive(stg))return;if(qi>=6)return toShip();var Q=POOL[qi];setB();$i("alSpm").innerHTML="";$i("zbM").innerHTML="";$i("alN").innerHTML="";
  say(esc(Q.q),ASK[qi%ASK.length].replace(/@N/g,NM));gs9("Навчання · "+(qi+1)+"/6");
  $i("alW").innerHTML="<div class='zbQ'><small>Що ти скажеш "+NM+"у?</small><b>"+esc(Q.q)+"</b></div>"+opts(Q,"alO");
  $i("alO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ansL(Q,+b.getAttribute("data-i"))}}
 function ansL(Q,j){var c=Q._o[j].c;mark("alO",Q,j);
  if(c){first++;known.push(qi);setB("happy","alHap");SND.ok();vib(20);var bm=$i("alBeam");bm.setAttribute("class","");void bm.getBoundingClientRect();bm.setAttribute("class","alBeamOn");setTimeout(SND.beam,120);
   say([""+NM+"! Записав у мозок 🧠","Ого, земляни розумні!","Кристал знань отримано 💎","Тепер я майже землянин!"][qi%4],""+NM+"");qi++;hud();
   $i("alN").innerHTML="<button class='zbGo' id='x7Nx'>"+(qi>=6?"Летимо на іспит 🛸":"Далі ▶")+"</button>";$i("x7Nx").onclick=askL;return}
  log.push(Q);debt.push(qi);setB("glitch","alGl");SND.bad();vib([30,40,30]);
  var sp="";for(var k=0;k<3;k++)sp+="<div class='alSpam' style='left:"+(8+k*28)+"%;top:"+(40+k*12)+"%;animation-delay:"+(k*.15)+"s'>"+SPAM[(qi+k)%SPAM.length]+"</div>";$i("alSpm").innerHTML=sp;
  say("Б-б-блюп… "+esc(Q._o[j].t)+"?! Щось мене глючить 🦠","Вірус!");qi++;hud();
  $i("zbM").innerHTML="Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"")+"<br><span style='color:#ff8aa0'>"+NM+" запам'ятав неправильно — на іспиті доведеться підказати.</span>";
  $i("alN").innerHTML="<button class='zbGo' id='alNx'>"+(qi>=6?"Летимо на іспит 🛸":"Далі ▶")+"</button>";$i("alNx").onclick=askL}

 /* --- іспит на кораблі --- */
 var ex,jx;
 function toShip(){shell();gs9("Іспит на кораблі");ex=0;jx=0;
  $i("zbR").innerHTML="<div class='alSt'><svg id='alS' viewBox='0 0 360 260' xmlns='http://www.w3.org/2000/svg'>"+ship()+"<g transform='translate(180,206) scale(.95)'><g id='alBw' class='alFl'><g id='alBp'>"+blup()+"</g></g></g></svg>"
   +"<div class='alSay' id='alSay' style='left:3%;top:4%;max-width:38%'></div><div class='alHud' id='alHd'></div><button class='alMu' id='alMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='alW'></div><div class='zbMsg' id='zbM'></div><div id='alN'></div>";
  stg=$i("alS");$i("alMu").onclick=mute;exHud();
  say("Шановна комісіє! Я вивчив земний інтернет. Питайте!",""+NM+"");
  $i("alN").innerHTML="<button class='zbGo' id='alNx'>Почати іспит ▶</button>";$i("alNx").onclick=exStep}
 function exHud(){var h="";for(var i=0;i<6;i++){var st=i<ex?(debt.indexOf(i)>=0?(EXR[i]?"r":"v"):"k"):"";h+="<b class='"+st+"'>"+(st=="k"||st=="r"?"✅":st=="v"?"❌":"")+"</b>"}$i("alHd").innerHTML=h}
 var EXR={};
 function judge(ok){var j=$i("alJ"+(jx++%2));if(j){j.setAttribute("fill",ok?"#3fbf6a":"#ff2e63");setTimeout(function(){if(alive(j))j.setAttribute("fill","#2a1d78")},900)}ok?SND.yes():SND.bad()}
 function exStep(){if(!alive(stg))return;$i("alN").innerHTML="";$i("zbM").innerHTML="";if(ex>=6)return verdict();var Q=POOL[ex],i=ex;
  if(debt.indexOf(i)<0){setB("happy","alHap");say("«"+esc(Q.q)+"» — це <b>"+esc(Q.o[Q.a])+"</b>! 😎",""+NM+" відповідає");judge(true);ex++;exHud();
   $i("alW").innerHTML="";$i("alN").innerHTML="<button class='zbGo' id='x7Nx'>"+(ex>=6?"Вердикт комісії ▶":"Далі ▶")+"</button>";$i("x7Nx").onclick=exStep;return}
  setB("sad");say("Пс-с… це я вивчив криво. <b>Підкажи!</b> 🙏",""+NM+" шепоче");
  $i("alW").innerHTML="<div class='zbQ'><small>Друга спроба · підкажи "+NM+"у</small><b>"+esc(Q.q)+"</b></div>"+opts(Q,"alO2");
  $i("alO2").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;var j=+b.getAttribute("data-i"),c=Q._o[j].c;mark("alO2",Q,j);
   if(c){retry++;EXR[i]=1;setB("happy","alHap");say("Ой, точно! Це <b>"+esc(Q.o[Q.a])+"</b>!",""+NM+"");judge(true)}else{setB("glitch","alGl");say("Б-блюп… комісія незадоволена 😵",""+NM+"");judge(false)}
   ex++;exHud();$i("alN").innerHTML="<button class='zbGo' id='alNx'>"+(ex>=6?"Вердикт комісії ▶":"Далі ▶")+"</button>";$i("alNx").onclick=exStep}}
 function verdict(){var pts=first*2+retry,win=pts>=8;gs9(win?"Іспит складено!":"Іспит не складено");setB(win?"happy":"sad",win?"alHap":"alFl");win?SND.win():SND.bad();
  say(win?"Зараховано до Кібершколи! 🎓":"Ще семестр на Землі 😅","Вердикт комісії");
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("alW").innerHTML="<div class='zbRes "+(win?"w":"l")+"'><h3>"+(win?"🎓 "+NM+" склав іспит!":""+NM+" на дорешку")+"</h3><p>З першого разу: <b style='color:#fff'>"+first+" з 6</b> · виправлено на іспиті: "+retry+"<br>Бали: "+pts+" з 12</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("alN").innerHTML="";$i("zbAg").onclick=function(){EXR={};intro()};$i("zbEnd").onclick=function(){fin9(pts,12)}}
 intro()};
try{if(window.GI7)GI7.alien7=["👽","Прибулець в інтернеті"];if(window.GI)GI.alien7=["👽","Прибулець в інтернеті"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Шифровка агента» =====
   Повідомлення зашифроване шифром Цезаря (+3). Кожна правильна відповідь — ключ: відкриває всі такі літери.
   Помилка — ворожий радар підбирається ближче. Фінал: обери, що в повідомленні. Звук — морзе (WebAudio). */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var AB="АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
function enc(ch){var i=AB.indexOf(ch);return i<0?ch:AB.charAt((i+3)%AB.length)}
var PH=["ЗУСТРІЧ БІЛЯ СЕРВЕРА","ПАРОЛЬ ЛЕЖИТЬ У СЕЙФІ","ФЛЕШКА ПІД ПАРТОЮ","ХМАРА ЧЕКАЄ О ДЕВ'ЯТІЙ","КОД ЗМІНЕНО ВНОЧІ","ШТАБ ПЕРЕЇХАВ НА ДАХ","ДРОН ЛЕТИТЬ НА СХІД","КЛЮЧ У СТАРОМУ НОУТБУЦІ","ЗУСТРІЧ БІЛЯ ФОНТАНУ","ПАРОЛЬ ЛЕЖИТЬ У ШАФІ","ФЛЕШКА ПІД ПОДУШКОЮ","ДРОН ЛЕТИТЬ НА ЗАХІД"];

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v){var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.2,t+.005);g.gain.setValueAtTime(v||.2,t+len-.01);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={morse:function(n){if(!ac())return;var t=A.currentTime;for(var i=0;i<(n||5);i++){var d=Math.random()<.5?.06:.18;bp(760,t,d,"sine",.16);t+=d+.06}},
 alarm:function(){if(!ac())return;var t=A.currentTime;for(var i=0;i<3;i++){bp(880,t+i*.22,.11,"square",.08);bp(620,t+i*.22+.11,.11,"square",.08)}},
 win:function(){if(!ac())return;var t=A.currentTime;[523,659,784,1046].forEach(function(f,i){bp(f,t+i*.1,.22,"triangle",.16)})},
 stamp:function(){if(!ac())return;bp(90,A.currentTime,.25,"sine",.3)}};

/* ---------- стилі ---------- */
var CSS="\
.spSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.spSt>svg{display:block;width:100%;height:auto}\
.spAg{position:absolute;left:39%;bottom:2%;width:21%;pointer-events:none}.spAg svg{width:100%;height:auto}\
.spMu{position:absolute;right:8px;top:8px;z-index:3;width:36px!important;height:36px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:11px!important;border:2px solid #7ee787!important;background:rgba(5,20,10,.9)!important;font-size:17px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.spCell{transition:fill .3s}.spFlip{animation:spFl .5s ease-out;transform-box:fill-box;transform-origin:center}@keyframes spFl{0%{transform:scaleY(0)}60%{transform:scaleY(1.15)}}\
.spSweep{animation:spSw 2.4s linear infinite;transform-origin:62px 196px}@keyframes spSw{to{transform:rotate(360deg)}}\
.spBlink{animation:spBk 1s steps(2) infinite}@keyframes spBk{50%{opacity:0}}\
.spWheel{transition:transform .8s cubic-bezier(.3,1.4,.5,1);transform-origin:298px 196px}\
.spStamp{animation:spSt .45s cubic-bezier(.3,1.8,.5,1) both;transform-box:fill-box;transform-origin:center}@keyframes spSt{0%{transform:scale(2.5) rotate(-20deg);opacity:0}}\
.spO{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .spO button{position:relative;width:auto!important;margin:0!important;min-height:58px;border:3px solid #7ee787!important;border-radius:12px!important;padding:10px 10px!important;background:#0d2416!important;color:#c9ffd0!important;font:700 13.5px/1.25 ui-monospace,Menlo,Consolas,monospace!important;box-shadow:0 5px 0 #05140a!important;cursor:pointer;text-align:left;text-transform:none!important}\
.zb .spO button:before{content:'> ';color:#7ee787}\
.zb .spO button:active{transform:translateY(4px);box-shadow:0 1px 0 #05140a!important}\
.zb .spO button.sOk{background:#1f6f3a!important;color:#fff!important}.zb .spO button.sBad{background:#5a1f2a!important;border-color:#ff5a7a!important;color:#ffc0cc!important}.zb .spO button.sDim{opacity:.3}\
.zb .spF button{text-align:center;font-weight:900!important;letter-spacing:.04em}\
.spQ{background:#0a1d10;border:2px solid #1f6f3a;border-radius:16px;padding:11px 13px;color:#c9ffd0;box-shadow:0 5px 0 rgba(0,0,0,.35)}\
.spQ small{font:800 11px ui-monospace,Menlo,monospace;color:#7ee787;letter-spacing:.04em}.spQ b{display:block;font:800 15px/1.35 system-ui;color:#fff;margin-top:3px}\
body.lite .spSweep,body.lite .spBlink{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

/* ---------- сцена ---------- */
function lines(p){var w=p.split(" "),L=[],cur="";w.forEach(function(x){if((cur?cur+" "+x:x).length>12&&cur){L.push(cur);cur=x}else cur=cur?cur+" "+x:x});if(cur)L.push(cur);return L}
function room(P){var s="<defs><radialGradient id='spR' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#1f6f3a' stop-opacity='.6'/><stop offset='1' stop-color='#05140a'/></radialGradient><linearGradient id='spBg' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#06140b'/><stop offset='1' stop-color='#0d2a18'/></linearGradient></defs><rect width='360' height='260' fill='url(#spBg)'/>";
 for(var i=0;i<14;i++)s+="<text x='"+(i*27)+"' y='"+(12+(i*53)%250)+"' font-family='monospace' font-size='9' fill='#1f6f3a' opacity='.5'>"+(i%2?"0110":"1001")+"</text>";
 s+="<rect x='12' y='10' width='336' height='124' rx='12' fill='#04100a' stroke='#1f6f3a' stroke-width='3'/><text x='24' y='28' font-family='monospace' font-size='10' font-weight='700' fill='#7ee787'>📡 ВХІДНЕ · ЗАШИФРОВАНО</text><circle class='spBlink' cx='330' cy='24' r='4' fill='#ff5a7a'/>";
 var L=lines(P),n3=L.length>2,ch_=n3?29:34,st_=n3?33:42,y0=n3?36:L.length>1?42:58;L.forEach(function(l,r){var x0=180-l.length*13;for(var c=0;c<l.length;c++){var ch=l.charAt(c),x=x0+c*26,y=y0+r*st_;if(ch==" ")continue;
   s+="<g id='spL_"+r+"_"+c+"' data-ch='"+ch+"'><rect class='spCell' x='"+(x+1)+"' y='"+y+"' width='24' height='"+ch_+"' rx='5' fill='#0f2e1a' stroke='#1f6f3a' stroke-width='2'/><text x='"+(x+13)+"' y='"+(y+ch_-10)+"' text-anchor='middle' font-family='ui-monospace,Menlo,monospace' font-size='18' font-weight='800' fill='#3fa75a'>"+(ch=="'"?"'":enc(ch))+"</text></g>"}});
 /* радар */
 s+="<g><circle cx='62' cy='196' r='48' fill='url(#spR)' stroke='#1f6f3a' stroke-width='3'/><circle cx='62' cy='196' r='32' fill='none' stroke='#1f6f3a' stroke-width='1.5'/><circle cx='62' cy='196' r='16' fill='none' stroke='#1f6f3a' stroke-width='1.5'/><path d='M14 196 H110 M62 148 V244' stroke='#1f6f3a' stroke-width='1'/><path class='spSweep' d='M62 196 L62 148 A48 48 0 0 1 96 162z' fill='#7ee787' opacity='.35'/><circle cx='62' cy='196' r='4' fill='#7ee787'/><circle id='spEn' cx='104' cy='170' r='6' fill='#ff5a7a' stroke='#fff' stroke-width='2'/><text x='62' y='142' text-anchor='middle' font-family='monospace' font-size='9' font-weight='700' fill='#ff8aa0' id='spTr'>ПЕЛЕНГ 0%</text></g>";
 /* шифрувальне колесо */
 var ring="";for(var k=0;k<AB.length;k++){var a=k/AB.length*Math.PI*2-Math.PI/2;ring+="<text x='"+(298+Math.cos(a)*38).toFixed(1)+"' y='"+(199+Math.sin(a)*38).toFixed(1)+"' text-anchor='middle' font-size='7.5' font-weight='800' fill='#c9ffd0'>"+AB.charAt(k)+"</text>"}
 s+="<circle cx='298' cy='196' r='48' fill='#0f2e1a' stroke='#1f6f3a' stroke-width='3'/><g class='spWheel' id='spWh'>"+ring+"</g><circle cx='298' cy='196' r='26' fill='#04100a' stroke='#7ee787' stroke-width='2'/><text id='spKey' x='298' y='201' text-anchor='middle' font-family='monospace' font-size='13' font-weight='900' fill='#ffd23f'>+3</text><path d='M298 144 l-6 -8 h12z' fill='#ffd23f'/>";
 s+="<g id='spSt'></g>";
 return s}

/* ---------- гра ---------- */
GM.spy7=function(g){inj();var POOL,P,qi,ok,tot,log,miss,stg,open;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]).slice(0,8);P=PH[Math.floor(Math.random()*PH.length)];qi=0;ok=0;tot=0;log=[];miss=0;open={}}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("spMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function ag(e){var a=$i("spAg");if(a)a.innerHTML=B7(e)}

 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'>";var demo="АГЕНТ";for(var i=0;i<5;i++){var x=70+i*46;art+="<rect x='"+x+"' y='14' width='36' height='42' rx='7' fill='#0f2e1a' stroke='#04100a' stroke-width='3'/><text x='"+(x+18)+"' y='44' text-anchor='middle' font-family='monospace' font-size='24' font-weight='900' fill='#7ee787'>"+enc(demo.charAt(i))+"</text><path d='M"+(x+18)+" 60 v10' stroke='#fff' stroke-width='3'/><path d='M"+(x+12)+" 66 l6 7 l6 -7' fill='none' stroke='#fff' stroke-width='3'/><rect x='"+x+"' y='76' width='36' height='42' rx='7' fill='#1f6f3a' stroke='#04100a' stroke-width='3'/><text x='"+(x+18)+"' y='106' text-anchor='middle' font-family='monospace' font-size='24' font-weight='900' fill='#fff'>"+demo.charAt(i)+"</text>"}
  art+="<text x='180' y='140' text-anchor='middle' font-family='monospace' font-size='13' font-weight='800' fill='#fff' opacity='.85'>шифр Цезаря: кожна літера зсунута на +3</text></svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#1f6f3a,#0d2a18)'><small>СКЛАДНА ГРА · ЦІЛКОМ ТАЄМНО</small><b>Шифровка агента</b>"+art+"</div>"
   +"<div class='zbIn'><h3>Сигнал від агента</h3><p>Наш агент надіслав зашифроване повідомлення. Ворожий радар уже шукає джерело сигналу. Розшифруй, що там — поки нас не запеленгували!</p>"
   +"<div class='zbRu'><i>🔑</i><span><b>8 питань — 8 ключів.</b> Кожна правильна відповідь розкриває дві літери шифру — скрізь, де вони трапляються.</span></div>"
   +"<div class='zbRu'><i>📡</i><span><b>Помилка — радар ближче.</b> 4 помилки — і сигнал запеленгують, місію провалено.</span></div>"
   +"<div class='zbRu'><i>🕵️</i><span><b>Фінал — розшифруй сам.</b> Обери, що насправді в повідомленні. Що більше літер відкрив — то легше. А хто розбереться з шифром Цезаря, вгадає навіть закриті!</span></div>"
   +"<button class='zbGo' id='zbGo'>Прийняти сигнал ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();gs9("Ключ 1/8");
  $i("zbR").innerHTML="<div class='spSt'><svg id='spS' viewBox='0 0 360 260' xmlns='http://www.w3.org/2000/svg'>"+room(P)+"</svg><div class='spAg' id='spAg'>"+B7("think")+"</div><button class='spMu' id='spMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='spW'></div><div class='zbMsg' id='zbM'></div><div id='spN'></div>";
  stg=$i("spS");$i("spMu").onclick=mute;SND.morse(8);ask()}
 function radar(){var d=[[104,170],[92,178],[80,186],[70,192],[62,196]][Math.min(4,miss)],e=$i("spEn");e.setAttribute("cx",d[0]);e.setAttribute("cy",d[1]);$i("spTr").textContent="ПЕЛЕНГ "+Math.min(100,miss*25)+"%"}
 function nextLetter(){var u={},k=0;P.split("").forEach(function(c){if(AB.indexOf(c)>=0)u[c]=1});var U=Object.keys(u).length;Object.keys(open).forEach(function(c){if(u[c])k++});if(k>=U-3)return null;var cnt={};P.split("").forEach(function(c){if(AB.indexOf(c)>=0&&!open[c])cnt[c]=(cnt[c]||0)+1});var best=null;Object.keys(cnt).forEach(function(c){if(!best||cnt[c]>cnt[best])best=c});return best}
 function reveal(ch){open[ch]=1;var n=0;[].forEach.call(stg.querySelectorAll("[data-ch]"),function(gr){if(gr.getAttribute("data-ch")!=ch)return;n++;var r=gr.querySelector("rect"),t=gr.querySelector("text");r.setAttribute("fill","#1f6f3a");r.setAttribute("stroke","#7ee787");t.textContent=ch;t.setAttribute("fill","#fff");gr.setAttribute("class","");void gr.getBoundingClientRect();gr.setAttribute("class","spFlip")});
  var k=AB.indexOf(ch);$i("spWh").style.transform="rotate("+(-k/AB.length*360)+"deg)";$i("spKey").textContent=enc(ch)+"→"+ch;return n}
 function ask(){if(!alive(stg))return;$i("zbM").innerHTML="";$i("spN").innerHTML="";if(qi>=8)return final();var Q=POOL[qi%POOL.length];ag("think");gs9("Ключ "+(qi+1)+"/8");
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("spW").innerHTML="<div class='spQ'><small>// ключ "+(qi+1)+" з 8 · відповідай, щоб отримати ключ</small><b>"+esc(Q.q)+"</b></div><div class='spO' id='spO'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("spO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ans(Q,+b.getAttribute("data-i"))}}
 function ans(Q,j){var c=Q._o[j].c;tot++;[].forEach.call($i("spO").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"sOk":(i==j?"sBad":"sDim")});qi++;
  if(c){ok++;var ch=nextLetter(),n=ch?reveal(ch):0,ch2=nextLetter();if(ch2)n+=reveal(ch2);SND.morse(4);vib(20);ag("happy");$i("zbM").innerHTML=ch?"🔑 Ключі <b>"+enc(ch)+"→"+ch+(ch2?", "+enc(ch2)+"→"+ch2:"")+"</b> · відкрито літер: "+n:"🔑 Ключ отримано! Решту літер шифровки розгадаєш сам у фіналі 😉";
   $i("spN").innerHTML="<button class='zbGo' id='x7Nx'>"+(qi>=8?"До розшифровки ▶":"Далі ▶")+"</button>";$i("x7Nx").onclick=ask;return}
  miss++;log.push(Q);radar();SND.alarm();vib([40,30,40]);ag("sad");
  $i("zbM").innerHTML="📡 Радар наближається! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
  if(miss>=4){$i("spN").innerHTML="<button class='zbGo' id='spNx'>Що з агентом? ▶</button>";$i("spNx").onclick=function(){end(false,true)};return}
  $i("spN").innerHTML="<button class='zbGo' id='spNx'>"+(qi>=8?"До розшифровки ▶":"Далі ▶")+"</button>";$i("spNx").onclick=ask}
 function final(){gs9("Розшифровка");ag("think");var pool=PH.filter(function(x){return x!=P}),near=pool.filter(function(x){return x.split(" ")[0]==P.split(" ")[0]});var dec=shf(near).slice(0,2);shf(pool).forEach(function(x){if(dec.length<3&&dec.indexOf(x)<0)dec.push(x)});var o=shf(dec.concat([P]));
  $i("spW").innerHTML="<div class='spQ'><small>// фінал · подивись на шифровку</small><b>Що насправді передав агент?</b></div><div class='spO spF' id='spO'>"+o.map(function(x){return "<button data-p=\""+esc(x)+"\">"+esc(x)+"</button>"}).join("")+"</div>";
  $i("zbM").innerHTML="Підказка: закриті літери — це шифр +3. Наприклад, <b>Г</b> у шифровці = <b>А</b>.";
  $i("spO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;var good=b.getAttribute("data-p")==P;[].forEach.call($i("spO").querySelectorAll("button"),function(x){x.disabled=true;x.className=x.getAttribute("data-p")==P?"sOk":(x==b?"sBad":"sDim")});
   AB.split("").forEach(function(ch){if(!open[ch]&&P.indexOf(ch)>=0)reveal(ch)});end(good,false)}}
 function end(good,caught){var win=good&&!caught;gs9(win?"Місія виконана":"Місію провалено");ag(win?"hype":"sad");win?SND.win():SND.alarm();
  setTimeout(SND.stamp,300);$i("spSt").innerHTML="<g class='spStamp'><rect x='92' y='54' width='176' height='48' rx='8' fill='none' stroke='"+(win?"#7ee787":"#ff5a7a")+"' stroke-width='5' transform='rotate(-8 180 78)'/><text x='180' y='88' text-anchor='middle' font-size='22' font-weight='900' fill='"+(win?"#7ee787":"#ff5a7a")+"' transform='rotate(-8 180 78)'>"+(win?"РОЗШИФРОВАНО":caught?"ЗАПЕЛЕНГОВАНО":"ДЕЗІНФОРМАЦІЯ")+"</text></g>";
  if(caught){AB.split("").forEach(function(ch){if(!open[ch]&&P.indexOf(ch)>=0)reveal(ch)})}
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("spW").innerHTML="<div class='zbRes "+(win?"w":"l")+"'><h3>"+(win?"🕵️ Місію виконано!":caught?"📡 Сигнал запеленгували":"Агента обдурили")+"</h3><p>Повідомлення: <b style='color:#fff'>«"+esc(P)+"»</b><br>Ключів: "+ok+" з "+tot+" · помилок: "+miss+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("spN").innerHTML="";$i("zbAg").onclick=intro;var sc=ok,t=caught?8:Math.max(tot,1);$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.spy7=["🕵️","Шифровка агента"];if(window.GI)GI.spy7=["🕵️","Шифровка агента"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Тетріс знань» =====
   Правильна відповідь — отримуєш фігуру і сам ставиш її в склянку (◀ ⟳ ▶ ⬇). Повний ряд згорає.
   Хибна — знизу піднімається ряд-сміття. Стос до стелі — гра закінчена. 10 питань. Звук — WebAudio. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var W=8,H=14,CS=30,BX=10,BY=12,GRB="#6b717c";
var SH={I:[[1,1,1,1]],O:[[1,1],[1,1]],T:[[1,1,1],[0,1,0]],S:[[0,1,1],[1,1,0]],Z:[[1,1,0],[0,1,1]],L:[[1,0],[1,0],[1,1]],J:[[0,1],[0,1],[1,1]]};
var SC={I:"#3fe0ff",O:"#ffd23f",T:"#b06bff",S:"#3fd27a",Z:"#ff4f6a",L:"#ff9a2a",J:"#4f8cff"};
var NQ=10;

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"square";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={mv:function(){if(ac())bp(420,A.currentTime,.04,"square",.04)},rot:function(){if(ac())bp(660,A.currentTime,.05,"square",.05,900)},
 land:function(){if(ac())bp(140,A.currentTime,.12,"triangle",.2,70)},
 line:function(n){if(!ac())return;var t=A.currentTime;[523,659,784,1046,1318].slice(0,2+n).forEach(function(f,i){bp(f,t+i*.07,.14,"square",.08)})},
 junk:function(){if(!ac())return;var t=A.currentTime;bp(110,t,.35,"sawtooth",.12,55)},
 ok:function(){if(ac()){var t=A.currentTime;bp(880,t,.08,"triangle",.14);bp(1320,t+.08,.12,"triangle",.14)}},
 over:function(){if(!ac())return;var t=A.currentTime;[392,330,262,196].forEach(function(f,i){bp(f,t+i*.16,.2,"square",.08)})}};

/* ---------- стилі ---------- */
var CSS="\
.ttSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.ttSt>svg{display:block;width:100%;height:auto;touch-action:manipulation}\
.ttBot{position:absolute;right:1%;bottom:2%;width:20%;pointer-events:none}.ttBot svg{width:100%;height:auto}\
.ttMu{position:absolute;right:8px;top:8px;z-index:3;width:36px!important;height:36px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:11px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:17px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.ttC{display:grid;grid-template-columns:1fr 1fr 1fr 1.3fr;gap:8px;margin-top:10px}\
.zb .ttC button{width:auto!important;margin:0!important;min-height:58px!important;border:3px solid "+O+"!important;border-radius:16px!important;padding:0!important;background:linear-gradient(#5a46d6,#3a2a9c)!important;color:#fff!important;font:900 24px system-ui!important;box-shadow:0 5px 0 "+O+"!important;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none}\
.zb .ttC button.dr{background:linear-gradient(#ffd23f,#ff9a2a)!important;color:#1a0e3a!important;font-size:15px!important}\
.zb .ttC button:active{transform:translateY(4px);box-shadow:0 1px 0 "+O+"!important}\
.ttO{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .ttO button{position:relative;width:auto!important;margin:0!important;min-height:58px;border:3px solid "+O+"!important;border-radius:6px!important;padding:10px 8px 10px 30px!important;background:#fff!important;color:#1a0e3a!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 5px 0 "+O+",inset 0 -5px 0 rgba(0,0,0,.12)!important;cursor:pointer;text-align:left;text-transform:none!important}\
.zb .ttO button i{position:absolute;left:7px;top:50%;width:15px;height:15px;margin-top:-8px;border-radius:3px;border:2px solid "+O+";background:var(--tc)}\
.zb .ttO button:nth-child(1){--tc:#3fe0ff}.zb .ttO button:nth-child(2){--tc:#b06bff}.zb .ttO button:nth-child(3){--tc:#ff9a2a}.zb .ttO button:nth-child(4){--tc:#3fd27a}\
.zb .ttO button:active{transform:translateY(4px);box-shadow:0 1px 0 "+O+"!important}\
.zb .ttO button.tOk{background:#a8ffb8!important}.zb .ttO button.tBad{background:#ffb3c4!important}.zb .ttO button.tDim{opacity:.35}\
.ttFl{animation:ttFl .35s ease-out}@keyframes ttFl{0%{fill:#fff}}\
.ttPop{animation:ttPp .9s ease-out forwards}@keyframes ttPp{0%{transform:scale(.5);opacity:0}25%{transform:scale(1.15);opacity:1}100%{transform:translateY(-24px);opacity:0}}\
.ttShk{animation:ttSk .3s}@keyframes ttSk{25%{transform:translateY(4px)}50%{transform:translateY(-3px)}}\
.ttGrid{animation:ttGr 3s linear infinite}@keyframes ttGr{50%{opacity:.5}}\
body.lite .ttGrid{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

var TTV=0;
function cell(x,y,c,cls){if(c==GRB)return "<rect"+(cls?" class='"+cls+"'":"")+" x='"+x+"' y='"+y+"' width='"+(CS-1)+"' height='"+(CS-1)+"' rx='3' fill='"+c+"' stroke='"+O+"' stroke-width='1.5'/><path d='M"+(x+5)+" "+(y+4)+" l4 6 l-2 5' stroke='#4a4f58' stroke-width='1.5' fill='none'/>";
 return "<rect"+(cls?" class='"+cls+"'":"")+" x='"+x+"' y='"+y+"' width='"+(CS-1)+"' height='"+(CS-1)+"' rx='3' fill='"+c+"' stroke='"+O+"' stroke-width='1.5'/><rect x='"+(x+3)+"' y='"+(y+3)+"' width='"+(CS-9)+"' height='4' rx='2' fill='#fff' opacity='.55'/>"}
function rot(m){var r=[];for(var c=0;c<m[0].length;c++){r.push([]);for(var k=m.length-1;k>=0;k--)r[c].push(m[k][c])}return r}

GM.tet7=function(g){TTV=(g.v||0)%3;inj();var POOL,B,cur,nxt,qi,ok,tot,lines,log,stg,tm=0,phase,combo,over;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function bag(){var k=Object.keys(SH);return k[Math.floor(Math.random()*k.length)]}
 function reset(){POOL=shf(g.rounds||[]);B=[];for(var r=0;r<H;r++){B.push([]);for(var c=0;c<W;c++)B[r].push(0)}
  for(var r2=H-3;r2<H;r2++){var hole=(r2*3+1)%W;for(var c2=0;c2<W;c2++)B[r2][c2]=(c2==hole||c2==hole+1&&r2==H-1)?0:GRB}
  cur=null;nxt=bag();qi=0;ok=0;tot=0;lines=0;log=[];combo=0;over=false;phase="q"}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("ttMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function bot(e){var b=$i("ttBot");if(b)b.innerHTML=B7(e)}

 /* --- старт --- */
 function intro(){clearInterval(tm);reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'>";var bl=[["I",30,20,0],["T",140,46,0],["L",250,30,1],["S",80,96,0],["O",210,100,0],["Z",290,104,0]];
  bl.forEach(function(b){var m=SH[b[0]];if(b[3])m=rot(m);m.forEach(function(row,r){row.forEach(function(v,c){if(v)art+=cell(b[1]+c*CS,b[2]+r*CS,SC[b[0]])})})});art+="</svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#7a2cff,#ff3f8e)'><small>СКЛАДНА ГРА · АРКАДНА КЛАСИКА</small><b>Тетріс знань</b>"+art+"</div>"
   +"<div class='zbIn'><h3>Склянка вже наповнюється</h3><p>У склянці лежить сміття з багів і помилок. Розчищай її фігурами — але кожну фігуру треба <b style='color:#ffd23f'>заробити знаннями</b>.</p>"
   +"<div class='zbRu'><i>🧱</i><span><b>Правильна відповідь — фігура.</b> Ставиш її кнопками ◀ ⟳ ▶ і кидаєш ⬇. Повний ряд згорає.</span></div>"
   +"<div class='zbRu'><i>⬆️</i><span><b>Помилка — знизу підіймається ряд-сміття</b> з однією діркою. Його можна спалити, якщо влучиш фігурою в дірку.</span></div>"
   +"<div class='zbRu'><i>🏁</i><span><b>10 питань.</b> Стос дістав стелі — гра закінчена. Спалив кілька рядів одною фігурою — комбо!</span></div>"
   +"<button class='zbGo' id='zbGo'>Грати ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 /* --- гра --- */
 function start(){shell();
  $i("zbR").innerHTML="<div class='ttSt'><svg id='ttS' viewBox='0 0 330 444' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='ttBg' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#140a46'/><stop offset='1' stop-color='#2a1478'/></linearGradient></defs><rect width='330' height='444' fill='url(#ttBg)'/>"
   +"<rect x='"+(BX-6)+"' y='"+(BY-6)+"' width='"+(W*CS+12)+"' height='"+(H*CS+12)+"' rx='10' fill='#0a0428' stroke='"+["#ff3f8e","#3fe0ff","#7ee787"][TTV]+"' stroke-width='3'/><g class='ttGrid' opacity='.8'>"+(function(){var s="";for(var c=1;c<W;c++)s+="<path d='M"+(BX+c*CS)+" "+BY+" V"+(BY+H*CS)+"' stroke='#2a1d78' stroke-width='1'/>";for(var r=1;r<H;r++)s+="<path d='M"+BX+" "+(BY+r*CS)+" H"+(BX+W*CS)+"' stroke='#2a1d78' stroke-width='1'/>";return s})()+"</g>"
   +"<path d='M"+BX+" "+(BY+2*CS)+" H"+(BX+W*CS)+"' stroke='#ff4f6a' stroke-width='2' stroke-dasharray='5 5' opacity='.7'/><g id='ttB'></g><g id='ttP'></g><g id='ttFx'></g>"
   +"<text x='290' y='60' text-anchor='middle' font-size='10' font-weight='900' fill='#a99fe8'>ДАЛІ</text><rect x='258' y='66' width='64' height='64' rx='10' fill='#0a0428' stroke='#4a3ab8' stroke-width='2'/><g id='ttN'></g>"
   +"<text x='290' y='162' text-anchor='middle' font-size='10' font-weight='900' fill='#a99fe8'>РЯДІВ</text><text id='ttL' text-anchor='middle' x='290' y='192' font-size='26' font-weight='900' font-style='italic' fill='#ffd23f'>0</text>"
   +"<text x='290' y='228' text-anchor='middle' font-size='10' font-weight='900' fill='#a99fe8'>ПИТАННЯ</text><text id='ttQ' text-anchor='middle' x='290' y='258' font-size='26' font-weight='900' font-style='italic' fill='#fff'>1</text>"
   +"</svg><div class='ttBot' id='ttBot'>"+B7("idle")+"</div><button class='ttMu' id='ttMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='ttW'></div><div class='zbMsg' id='zbM'></div><div id='ttNb'></div>";
  stg=$i("ttS");$i("ttMu").onclick=mute;draw();ask()}
 function draw(){var s="";for(var r=0;r<H;r++)for(var c=0;c<W;c++)if(B[r][c])s+=cell(BX+c*CS,BY+r*CS,B[r][c]);$i("ttB").innerHTML=s;drawP();
  var n="",m=SH[nxt],ox=290-m[0].length*6.5,oy=98-m.length*6.5;m.forEach(function(row,r){row.forEach(function(v,c){if(v)n+="<rect x='"+(ox+c*13)+"' y='"+(oy+r*13)+"' width='12' height='12' rx='3' fill='"+SC[nxt]+"' stroke='"+O+"' stroke-width='1.5'/>"})});$i("ttN").innerHTML=n;
  $i("ttL").textContent=lines;$i("ttQ").textContent=Math.min(qi+1,NQ)}
 function drawP(){var s="";if(cur){var gy=cur.y;while(fits(cur.m,cur.x,gy+1))gy++;
   cur.m.forEach(function(row,r){row.forEach(function(v,c){if(v){s+="<rect x='"+(BX+(cur.x+c)*CS+1)+"' y='"+(BY+(gy+r)*CS+1)+"' width='"+(CS-3)+"' height='"+(CS-3)+"' rx='3' fill='none' stroke='"+SC[cur.k]+"' stroke-width='1.5' opacity='.6'/>";if(cur.y+r>=0)s+=cell(BX+(cur.x+c)*CS,BY+(cur.y+r)*CS,SC[cur.k])}})})}
  $i("ttP").innerHTML=s}
 function fits(m,x,y){for(var r=0;r<m.length;r++)for(var c=0;c<m[r].length;c++){if(!m[r][c])continue;var xx=x+c,yy=y+r;if(xx<0||xx>=W||yy>=H)return false;if(yy>=0&&B[yy][xx])return false}return true}
 function pop(t,c,y){var e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("x",BX+W*CS/2);e.setAttribute("y",y||150);e.setAttribute("text-anchor","middle");e.setAttribute("class","ttPop");e.setAttribute("style","transform-box:fill-box;transform-origin:center");e.setAttribute("font-size","22");e.setAttribute("font-weight","900");e.setAttribute("font-style","italic");e.setAttribute("fill",c);e.setAttribute("stroke",O);e.setAttribute("stroke-width","4");e.setAttribute("paint-order","stroke");e.textContent=t;$i("ttFx").appendChild(e);setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},950)}

 /* питання */
 function ask(){if(!alive(stg))return;if(over)return;if(qi>=NQ)return end();phase="q";var Q=POOL[qi%POOL.length];$i("zbM").innerHTML="";$i("ttNb").innerHTML="";bot("think");gs9("Питання "+(qi+1)+"/"+NQ);
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("ttW").innerHTML="<div class='zbQ'><small>Відповідай — і отримаєш фігуру "+"<span style='color:"+SC[nxt]+"'>■</span></small><b>"+esc(Q.q)+"</b></div><div class='ttO' id='ttO'>"+o.map(function(x,i){return "<button data-i='"+i+"'><i></i>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("ttO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ans(Q,+b.getAttribute("data-i"))}}
 function ans(Q,j){var c=Q._o[j].c;tot++;qi++;[].forEach.call($i("ttO").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"tOk":(i==j?"tBad":"tDim")});
  if(c){ok++;SND.ok();vib(15);bot("happy");setTimeout(function(){if(alive(stg))spawn()},500);return}
  log.push(Q);bot("sad");$i("zbM").innerHTML="⬆️ Ряд-сміття! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
  setTimeout(function(){if(!alive(stg))return;junk();if(over)return;$i("ttNb").innerHTML=("<button class='zbGo' id='ttNx'>"+(qi>=NQ?"Фініш ▶":"Далі ▶")+"</button>");$i("ttNx").onclick=ask},450)}
 function junk(){SND.junk();vib([40,30,40]);if(B[0].some(function(v){return v})){over=true;draw();return end()}B.shift();var hole=Math.floor(Math.random()*W),row=[];for(var c=0;c<W;c++)row.push(c==hole?0:GRB);B.push(row);
  var t=$i("ttB");t.setAttribute("class","");void t.getBoundingClientRect();t.setAttribute("class","ttShk");draw();if(B[1].some(function(v){return v})&&B[0].some(function(v){return v})){}}

 /* фігура */
 function spawn(){var k=nxt;nxt=bag();var m=SH[k];cur={k:k,m:m,x:Math.floor((W-m[0].length)/2),y:-m.length+1};if(!fits(m,cur.x,cur.y)){over=true;return end()}
  phase="p";draw();gs9("Постав фігуру");$i("zbM").innerHTML="";
  $i("ttW").innerHTML="<div class='ttC' id='ttC'><button data-a='l'>◀</button><button data-a='r2'>⟳</button><button data-a='r'>▶</button><button class='dr' data-a='d'>⬇ Кинути</button></div>";
  $i("ttC").onclick=function(e){var b=e.target.closest("button");if(b)act(b.getAttribute("data-a"))};
  clearInterval(tm);tm=setInterval(function(){if(!alive(stg)){clearInterval(tm);return}if(phase!="p")return;if(fits(cur.m,cur.x,cur.y+1)){cur.y++;drawP()}else lock()},1000)}
 function act(a){if(phase!="p"||!cur)return;
  if(a=="l"&&fits(cur.m,cur.x-1,cur.y)){cur.x--;SND.mv()}
  if(a=="r"&&fits(cur.m,cur.x+1,cur.y)){cur.x++;SND.mv()}
  if(a=="r2"){var m=rot(cur.m),kicks=[0,-1,1,-2,2];for(var i=0;i<kicks.length;i++)if(fits(m,cur.x+kicks[i],cur.y)){cur.m=m;cur.x+=kicks[i];SND.rot();break}}
  if(a=="d"){while(fits(cur.m,cur.x,cur.y+1))cur.y++;return lock()}
  drawP()}
 function lock(){if(phase!="p")return;phase="l";clearInterval(tm);var top=false;
  cur.m.forEach(function(row,r){row.forEach(function(v,c){if(v){if(cur.y+r<0)top=true;else B[cur.y+r][cur.x+c]=SC[cur.k]}})});cur=null;SND.land();
  if(top){over=true;draw();return end()}
  var full=[];for(var r=0;r<H;r++)if(B[r].every(function(v){return v}))full.push(r);
  draw();
  if(full.length){combo++;lines+=full.length;SND.line(full.length);vib(30);bot("hype");
   full.forEach(function(r){var e=document.createElementNS("http://www.w3.org/2000/svg","rect");e.setAttribute("x",BX);e.setAttribute("y",BY+r*CS);e.setAttribute("width",W*CS);e.setAttribute("height",CS);e.setAttribute("fill","#fff");e.setAttribute("class","ttFl");$i("ttFx").appendChild(e)});
   pop(full.length>1?"КОМБО x"+full.length+"!":"+1 РЯД",full.length>1?"#ffd23f":"#7ee787",BY+full[0]*CS);
   setTimeout(function(){if(!alive(stg))return;$i("ttFx").innerHTML="";full.forEach(function(r){B.splice(r,1);var row=[];for(var c=0;c<W;c++)row.push(0);B.unshift(row)});draw();setTimeout(ask,350)},380)}
  else{combo=0;bot("idle");$i("ttW").innerHTML="";setTimeout(ask,300)}}
 function end(){clearInterval(tm);phase="e";var lost=over;if(lost)SND.over();bot(lost?"sad":"hype");gs9(lost?"Стос до стелі!":"Фініш!");
  var t=lost?NQ:Math.max(tot,1);
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("ttW").innerHTML="<div class='zbRes "+(lost?"l":"w")+"'><h3>"+(lost?"🧱 Склянка переповнена":lines>=4?"🏆 Майстер тетрісу":"✅ Склянку втримано")+"</h3><p>Правильних: <b style='color:#fff'>"+ok+" з "+(lost?NQ:tot)+"</b> · спалено рядів: "+lines+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("zbAg").onclick=intro;var sc=ok;$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.tet7=["🧱","Тетріс знань"];if(window.GI)GI.tet7=["🧱","Тетріс знань"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Ранер-втеча» =====
   Шосе даних, 3 доріжки. Назустріч летять ворота А/Б/В — питання і варіанти під сценою.
   Перебіжи у доріжку з правильною відповіддю (тап по варіанту, ◀ ▶, свайп або стрілки).
   Правильно — ривок і вірус-хвиля відстає. Хибно — спотикання, хвиля ближче. 3 спотикання — наздогнали. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var NQ=10,LC=["#ff3f8e","#ffd23f","#3fd2ff"],LL=["А","Б","В"],HZ=78,BT=262;
function zy(z){return HZ+(BT-HZ)*z}function zw(z){return 18+152*z}function lx(l,z){return 180+(l-1)*zw(z)*.68}

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.12,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={sw:function(){if(ac())bp(300,A.currentTime,.12,"sine",.08,700)},coin:function(){if(ac()){var t=A.currentTime;bp(988,t,.07,"square",.06);bp(1318,t+.07,.12,"square",.06)}},
 boost:function(){if(!ac())return;var t=A.currentTime;[523,784,1046].forEach(function(f,i){bp(f,t+i*.06,.2,"triangle",.14)});bp(200,t,.5,"sawtooth",.05,900)},
 trip:function(){if(!ac())return;var t=A.currentTime;bp(160,t,.25,"triangle",.25,60);bp(90,t+.05,.3,"sawtooth",.08,40)},
 go:function(){if(ac())bp(880,A.currentTime,.25,"square",.08)},tick:function(){if(ac())bp(440,A.currentTime,.12,"square",.07)},
 win:function(){if(!ac())return;var t=A.currentTime;[523,659,784,1046,1318].forEach(function(f,i){bp(f,t+i*.1,.28,"triangle",.15)})}};

/* ---------- стилі ---------- */
var CSS="\
.rnSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3);touch-action:pan-y}.rnSt>svg{display:block;width:100%;height:auto}\
.rnBot{position:absolute;bottom:3%;width:19%;margin-left:-9.5%;transition:left .18s ease-out;pointer-events:none}.rnBot svg{width:100%;height:auto}\
.rnBot.run{animation:rnRn .32s ease-in-out infinite}@keyframes rnRn{50%{transform:translateY(-6px) rotate(2deg)}}\
.rnBot.trip{animation:rnTr .5s ease-out}@keyframes rnTr{30%{transform:rotate(-24deg) translateY(6px)}}\
.rnBot.boost{animation:rnBo .5s ease-out}@keyframes rnBo{40%{transform:translateY(-22px) scale(1.08)}}\
.rnMu{position:absolute;right:8px;top:8px;z-index:3;width:36px!important;height:36px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:11px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:17px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.rnHud{position:absolute;left:8px;top:8px;display:flex;gap:6px;pointer-events:none}.rnHud span{background:rgba(10,5,40,.82);border:2px solid #fff;border-radius:11px;padding:3px 9px;font:900 12px system-ui;color:#fff}\
.rnCd{position:absolute;inset:0;display:grid;place-items:center;font:900 italic 72px system-ui;color:#ffd23f;text-shadow:0 5px 0 #1a0e3a;pointer-events:none}\
.rnO{display:grid;gap:8px;margin-top:10px}\
.zb .rnO button{position:relative;display:flex!important;align-items:center;gap:10px;width:100%!important;margin:0!important;min-height:50px;height:auto!important;max-height:none!important;white-space:normal!important;overflow:visible!important;border:3px solid "+O+"!important;border-radius:14px!important;padding:8px 12px 8px 8px!important;background:#2a1d78!important;color:#fff!important;font:800 14px/1.25 system-ui!important;box-shadow:0 4px 0 "+O+"!important;cursor:pointer;text-align:left;text-transform:none!important}\
.zb .rnO button b{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--lc);color:#1a0e3a;font:900 italic 18px system-ui;border:2px solid "+O+"}\
.zb .rnO button.on{background:#4a3ab8!important;box-shadow:0 0 0 3px var(--lc),0 4px 0 "+O+"!important}\
.zb .rnO button.rOk{background:#1f9a52!important}.zb .rnO button.rBad{background:#c8264a!important}\
.rnStr{animation:rnSt .5s linear infinite}@keyframes rnSt{to{stroke-dashoffset:-40}}\
.rnWave{transition:transform .6s cubic-bezier(.3,1.4,.5,1)}\
.rnSky{animation:rnSk 2s ease-in-out infinite alternate}@keyframes rnSk{to{opacity:.6}}\
body.lite .rnStr,body.lite .rnSky,body.lite .rnBot.run{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

var RV=0,SKY=[["#0b0530","#5a1fa8","#ff9a2a"],["#020a24","#0b4a8a","#3fe0ff"],["#2a0a3a","#ff6a3a","#ffd23f"]];
function scene(){var s="<defs><linearGradient id='rnSk' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='"+SKY[RV][0]+"'/><stop offset='1' stop-color='"+SKY[RV][1]+"'/></linearGradient><linearGradient id='rnRd' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#1a0e4a'/><stop offset='1' stop-color='#3a2a9c'/></linearGradient><linearGradient id='rnWv' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ff2e63' stop-opacity='0'/><stop offset='.4' stop-color='#ff2e63' stop-opacity='.75'/><stop offset='1' stop-color='#7a0a2a'/></linearGradient></defs>";
 s+="<rect width='360' height='270' fill='url(#rnSk)'/><circle class='rnSky' cx='180' cy='"+HZ+"' r='46' fill='"+SKY[RV][2]+"' opacity='.85'/><g fill='#ff3f8e' opacity='.9'>";for(var i=0;i<5;i++)s+="<rect x='134' y='"+(HZ-30+i*7)+"' width='92' height='3'/>";s+="</g>";
 for(var k=0;k<13;k++){var h=10+((k*37)%34),x=k*28-4;s+="<rect x='"+x+"' y='"+(HZ-h)+"' width='24' height='"+h+"' fill='#140a46'/>";if(k%3==0)s+="<rect x='"+(x+8)+"' y='"+(HZ-h+5)+"' width='4' height='4' fill='#3fd2ff'/>"}
 s+="<polygon points='162,"+HZ+" 198,"+HZ+" 360,"+BT+" 360,270 0,270 0,"+BT+"' fill='url(#rnRd)'/>";
 s+="<polygon points='0,"+HZ+" 162,"+HZ+" 0,"+BT+"' fill='#0d0632'/><polygon points='360,"+HZ+" 198,"+HZ+" 360,"+BT+"' fill='#0d0632'/>";
 for(var r=1;r<7;r++){var z=r/7,y=zy(z*z);s+="<path d='M0 "+y.toFixed(1)+" H360' stroke='#ff3f8e' stroke-width='1' opacity='"+(0.15+z*.35)+"'/>"}
 [-1.5,1.5].forEach(function(o){s+="<path d='M"+(180+o*12)+" "+HZ+" L"+(180+o*165)+" 270' stroke='#ff3f8e' stroke-width='3'/>"});
 [-.5,.5].forEach(function(o){s+="<path class='rnStr' d='M"+(180+o*12)+" "+HZ+" L"+(180+o*190)+" 290' stroke='#fff' stroke-width='3' stroke-dasharray='14 26' opacity='.55'/>"});
 s+="<g id='rnObj'></g><g class='rnWave' id='rnWave' transform='translate(0,30)'><path d='M0 236 l18 -10 l18 8 l18 -12 l18 10 l18 -8 l18 12 l18 -10 l18 8 l18 -12 l18 10 l18 -8 l18 12 l18 -10 l18 8 l18 -12 l18 10 l18 -8 l18 12 l18 -10 L360 270 H0z' fill='url(#rnWv)'/><text x='180' y='262' text-anchor='middle' font-size='11' font-weight='900' fill='#fff' opacity='.85'>🦠 ВІРУС-ХВИЛЯ</text></g><g id='rnFx'></g>";
 return s}
function gate(l,txt){var c=LC[l];return "<g><rect x='-34' y='-70' width='9' height='70' rx='3' fill='"+c+"' stroke='"+O+"' stroke-width='3'/><rect x='25' y='-70' width='9' height='70' rx='3' fill='"+c+"' stroke='"+O+"' stroke-width='3'/><rect x='-40' y='-92' width='80' height='28' rx='8' fill='"+c+"' stroke='"+O+"' stroke-width='3'/><text x='0' y='-71' text-anchor='middle' font-size='20' font-weight='900' font-style='italic' fill='"+O+"'>"+txt+"</text><rect x='-25' y='-64' width='50' height='64' fill='"+c+"' opacity='.18'/></g>"}
function coin(){return "<g><circle r='11' fill='#ffd23f' stroke='"+O+"' stroke-width='3'/><text y='4' text-anchor='middle' font-size='11' font-weight='900' fill='"+O+"'>1</text></g>"}

GM.run7=function(g){RV=(g.v||0)%3;inj();var POOL,qi,ok,tot,log,trips,coins,stg,lane,objs,raf=0,last=0,state,curQ,T,wave;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);qi=0;ok=0;tot=0;log=[];trips=0;coins=0;lane=1;objs=[];state="idle";wave=0}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("rnMu");if(b)b.textContent=MUTE?"🔇":"🔊"}

 function intro(){stop();reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'><polygon points='160,20 200,20 340,150 20,150' fill='#3a2a9c'/><path d='M174 20 L110 150 M186 20 L250 150' stroke='#fff' stroke-width='3' stroke-dasharray='10 12' opacity='.6'/>";
  [[0,.55],[1,.4],[2,.55]].forEach(function(p){var z=p[1];art+="<g transform='translate("+(180+(p[0]-1)*(18+120*z)*.7)+","+(20+130*z)+") scale("+(0.35+z*.5)+")'>"+gate(p[0],LL[p[0]])+"</g>"});
  art+="<path d='M0 150 l20 -12 l20 10 l20 -14 l20 12 l20 -10 l20 14 l20 -12 l20 10 l20 -14 l20 12 l20 -10 l20 14 l20 -12 l20 10 l20 -14 l20 12 l20 -10 L360 150z' fill='#ff2e63' opacity='.8'/></svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#ff2e63,#7a2cff)'><small>СКЛАДНА ГРА · ВТЕЧА ПО ШОСЕ ДАНИХ</small><b>Ранер-втеча</b>"+art+"</div>"
   +"<div class='zbIn'><h3>Тікай від вірус-хвилі!</h3><p>По шосе даних котиться вірус-хвиля і з'їдає все на шляху. Бот-чемпіон тікає — а прохід відкривають лише ворота з <b style='color:#ffd23f'>правильною відповіддю</b>.</p>"
   +"<div class='zbRu'><i>🚪</i><span><b>Назустріч летять ворота А, Б, В.</b> Питання і варіанти — під сценою. Тицьни варіант — і бот перебіжить у його доріжку. Ще можна ◀ ▶, свайп чи стрілки.</span></div>"
   +"<div class='zbRu'><i>⚡</i><span><b>Правильні ворота — ривок,</b> хвиля відстає. Перед воротами котяться монетки — встигни зібрати й перебігти в правильну доріжку!</span></div>"
   +"<div class='zbRu'><i>🦠</i><span><b>Хибні ворота — спотикання</b>, хвиля ближче. Три спотикання — наздогнала. Добіжи до фінішу: 10 воріт.</span></div>"
   +"<button class='zbGo' id='zbGo'>Бігти! ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();gs9("Ворота 1/"+NQ);
  $i("zbR").innerHTML="<div class='rnSt' id='rnSt'><svg id='rnS' viewBox='0 0 360 270' xmlns='http://www.w3.org/2000/svg'>"+scene()+"</svg><div class='rnBot run' id='rnBot' style='left:50%'>"+B7("hype")+"</div><div class='rnHud'><span id='rnH'></span></div><button class='rnMu' id='rnMu'>"+(MUTE?"🔇":"🔊")+"</button><div class='rnCd' id='rnCd'></div></div>"
   +"<div id='rnW'></div><div class='zbMsg' id='zbM'></div><div id='rnN'></div>";
  stg=$i("rnS");$i("rnMu").onclick=mute;hud();setLane(1,true);
  var sx=null,st=$i("rnSt");st.addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});st.addEventListener("touchend",function(e){if(sx==null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>30)setLane(lane+(d>0?1:-1));sx=null},{passive:true});
  document.addEventListener("keydown",key);
  var n=3,cd=$i("rnCd");cd.textContent=n;SND.tick();var iv=setInterval(function(){if(!alive(stg)){clearInterval(iv);return}n--;if(n>0){cd.textContent=n;SND.tick()}else{clearInterval(iv);cd.textContent="";SND.go();state="run";last=0;raf=requestAnimationFrame(loop);ask()}},650)}
 function key(e){if(!alive(stg)){document.removeEventListener("keydown",key);return}if(e.key=="ArrowLeft")setLane(lane-1);if(e.key=="ArrowRight")setLane(lane+1)}
 function stop(){cancelAnimationFrame(raf);raf=0;state="idle"}
 function hud(){var h=$i("rnH");if(h)h.textContent="🚪 "+Math.min(qi+1,NQ)+"/"+NQ+" · 🪙 "+coins+" · "+"❤️".repeat(Math.max(0,3-trips))}
 function setLane(l,silent){l=Math.max(0,Math.min(2,l));if(l==lane&&!silent)return;lane=l;var b=$i("rnBot");if(b)b.style.left=(lx(l,1)/360*100).toFixed(1)+"%";if(!silent)SND.sw();
  [].forEach.call(document.querySelectorAll("#rnO button"),function(x,i){x.classList.toggle("on",i==l)})}
 function setWave(){var w=$i("rnWave");if(w)w.setAttribute("transform","translate(0,"+[30,14,0,-16][Math.min(3,trips)]+")")}

 function ask(){if(!alive(stg))return;if(qi>=NQ)return finish(true);var Q=POOL[qi%POOL.length],ci=Q.a,wr=shf(Q.o.map(function(_,i){return i}).filter(function(i){return i!=ci})).slice(0,2),ord=shf([ci].concat(wr));
  curQ={Q:Q,o:ord.map(function(i){return {t:Q.o[i],c:i==ci}})};while(curQ.o.length<3){var R2=POOL[Math.floor(Math.random()*POOL.length)],x=R2.o[R2.o.length-1];if(R2!==Q&&Q.o.indexOf(x)<0)curQ.o.splice(Math.floor(Math.random()*(curQ.o.length+1)),0,{t:x,c:false})}T=Math.max(14000,20000-qi*600);
  gs9("Ворота "+(qi+1)+"/"+NQ);hud();$i("zbM").innerHTML="";$i("rnN").innerHTML="";
  $i("rnW").innerHTML="<div class='zbQ'><small>Ворота "+(qi+1)+" · біжи в доріжку з правильною відповіддю</small><b>"+esc(Q.q)+"</b><div class='zbT'><i id='rnTi' style='transform:scaleX(1)'></i></div></div><div class='rnO' id='rnO'>"+curQ.o.map(function(x,i){return "<button style='--lc:"+LC[i]+"' data-l='"+i+"'><b>"+LL[i]+"</b>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("rnO").onclick=function(e){var b=e.target.closest("button");if(b&&state=="run")setLane(+b.getAttribute("data-l"))};setLane(lane,true);
  var gs=[];for(var l=0;l<3;l++)gs.push({k:"g",l:l,p:0});objs=gs;
  var cl=Math.floor(Math.random()*3);for(var c=0;c<3;c++)objs.push({k:"c",l:(cl+c)%3,p:.3-c*.11,got:false});
  draw(true)}
 function draw(rebuild){var o=$i("rnObj");if(!o)return;
  if(rebuild){o.innerHTML=objs.map(function(ob,i){return "<g id='rnO"+i+"'>"+(ob.k=="g"?gate(ob.l,LL[ob.l]):coin())+"</g>"}).join("")}
  objs.forEach(function(ob,i){var e=$i("rnO"+i);if(!e)return;var p=Math.max(0,Math.min(1,ob.p)),z=p*p;if(ob.p<0||ob.got||ob.p>1.1){e.setAttribute("opacity","0");return}e.setAttribute("opacity",z<.02?"0":"1");
   var sc=.18+z*.82;e.setAttribute("transform","translate("+lx(ob.l,z).toFixed(1)+","+(zy(z)-(ob.k=="c"?12*sc:0)).toFixed(1)+") scale("+sc.toFixed(3)+")")})}
 function loop(ts){if(!alive(stg)){stop();return}if(state!="run"){raf=0;return}if(!last)last=ts;var dt=Math.min(50,ts-last);last=ts;
  var hit=false;objs.forEach(function(ob){ob.p+=dt/T;if(ob.k=="c"&&!ob.got&&ob.p>=.94&&ob.p<1.1&&ob.l==lane){ob.got=true;coins++;SND.coin();hud();var fx=$i("rnFx");if(fx){fx.innerHTML="<text x='"+lx(lane,1)+"' y='200' text-anchor='middle' font-size='18' font-weight='900' fill='#ffd23f' stroke='"+O+"' stroke-width='3' paint-order='stroke'>+1 🪙</text>";setTimeout(function(){if(fx)fx.innerHTML=""},500)}}});
  var ti=$i("rnTi");if(ti)ti.style.transform="scaleX("+Math.max(0,1-objs[0].p).toFixed(3)+")";
  draw(false);if(objs[0].p>=1)return judge();raf=requestAnimationFrame(loop)}
 function judge(){state="judge";var c=curQ.o[lane].c,Q=curQ.Q;tot++;qi++;
  [].forEach.call(document.querySelectorAll("#rnO button"),function(b,i){b.disabled=true;if(curQ.o[i].c)b.classList.add("rOk");else if(i==lane)b.classList.add("rBad")});
  var bt=$i("rnBot");
  if(c){ok++;SND.boost();vib(20);bt.className="rnBot boost";bt.innerHTML=B7("hype");if(trips>0&&ok%3==0){trips--;$i("zbM").innerHTML="⚡ Ривок! Хвиля відкотилася — +❤️"}else $i("zbM").innerHTML="⚡ Правильно! Ривок уперед!";
   setWave();hud();setTimeout(function(){if(!alive(stg))return;bt.className="rnBot run";state="run";last=0;raf=requestAnimationFrame(loop);ask()},900);return}
  trips++;log.push(Q);SND.trip();vib([40,30,40]);bt.className="rnBot trip";bt.innerHTML=B7("sad");setWave();hud();
  $i("zbM").innerHTML="💥 Спіткнувся! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
  if(trips>=3){setTimeout(function(){finish(false)},700);return}
  $i("rnN").innerHTML="<button class='zbGo' id='rnNx'>Бігти далі ▶</button>";$i("rnNx").onclick=function(){bt.className="rnBot run";bt.innerHTML=B7("hype");state="run";last=0;raf=requestAnimationFrame(loop);ask()}}
 function finish(win){stop();document.removeEventListener("keydown",key);var bt=$i("rnBot");if(bt){bt.className="rnBot";bt.innerHTML=B7(win?"hype":"sad")}gs9(win?"Втік!":"Наздогнали!");win?SND.win():SND.trip();
  $i("rnObj").innerHTML=win?"<g transform='translate(180,180)'><rect x='-150' y='-6' width='300' height='14' fill='#fff' stroke='"+O+"' stroke-width='3'/><path d='M-150 -6 h300' stroke='"+O+"' stroke-width='3' stroke-dasharray='14 14'/><text y='-20' text-anchor='middle' font-size='26' font-weight='900' font-style='italic' fill='#ffd23f' stroke='"+O+"' stroke-width='5' paint-order='stroke'>ФІНІШ!</text></g>":"";
  if(!win){var w=$i("rnWave");if(w)w.setAttribute("transform","translate(0,-40)")}
  var t=win?Math.max(tot,1):NQ;
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("rnW").innerHTML="<div class='zbRes "+(win?"w":"l")+"'><h3>"+(win?"🏁 Утік від хвилі!":"🦠 Хвиля наздогнала")+"</h3><p>Правильних воріт: <b style='color:#fff'>"+ok+" з "+t+"</b> · монеток: "+coins+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("rnN").innerHTML="";$i("zbAg").onclick=intro;var sc=ok;$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.run7=["🏃","Ранер-втеча"];if(window.GI)GI.run7=["🏃","Ранер-втеча"]}catch(e){}
})();

;(window.__GPL=window.__GPL||[]).push("g7_10");
