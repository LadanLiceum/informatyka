/* ===== 7 клас · складна гра «Картинг-гран-прі» =====
   Траса згори, 4 карти, 3 кола. Поки читаєш питання — усі їдуть повільно (суперники не чекають!).
   Відповів — 2,6 с гонки: правильно = НІТРО, хибно = ЗАНОС. Місце 1–4 на фініші. Звук мотора (WebAudio). */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var LAPS=3,MAXQ=12,TRK,TV;
var TRACKS=[{d:"M90 34 H270 A72 86 0 0 1 270 206 H90 A72 86 0 0 1 90 34Z",st:[122,92],g:["#3fae4a","#46b852"],n:"Овал «Сезон»"},
 {d:"M64 36 H296 Q326 36 326 66 V176 Q326 206 296 206 H64 Q34 206 34 176 V66 Q34 36 64 36Z",st:[122,92],g:["#e8c27a","#dcb46a"],n:"Пустельний ринг"},
 {d:"M70 40 C140 24 220 70 290 40 C342 22 350 200 290 206 C220 212 205 160 180 160 C155 160 140 212 70 206 C14 200 14 52 70 40Z",st:[122,74],g:["#eef6ff","#dde9f5"],n:"Сніжна квасоля"}];
var RIV=[["Флеш","#3fd2ff",50],["Турбо","#ffd23f",45],["Глюк","#7ee787",40]];

/* ---------- звук ---------- */
var A=null,M=null,ENG=null,EG=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"square";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
function engOn(){if(!ac()||ENG)return;ENG=A.createOscillator();var f=A.createBiquadFilter();EG=A.createGain();ENG.type="sawtooth";ENG.frequency.value=60;f.type="lowpass";f.frequency.value=500;EG.gain.value=.035;ENG.connect(f);f.connect(EG);EG.connect(M);ENG.start()}
function engSet(v){if(ENG)ENG.frequency.setTargetAtTime(48+v*1.5,A.currentTime,.15)}
function engOff(){try{if(ENG){ENG.stop();ENG.disconnect()}}catch(e){}ENG=null}
var SND={beep:function(h){if(ac())bp(h?880:440,A.currentTime,.18,"square",.09)},nitro:function(){if(ac()){bp(200,A.currentTime,.7,"sawtooth",.07,1200);bp(880,A.currentTime,.12,"triangle",.12)}},
 skid:function(){if(!ac())return;var t=A.currentTime;bp(900,t,.5,"sawtooth",.04,300);bp(120,t+.1,.3,"triangle",.15,60)},
 lap:function(){if(ac()){var t=A.currentTime;bp(659,t,.1,"square",.08);bp(988,t+.1,.16,"square",.08)}},
 win:function(){if(!ac())return;var t=A.currentTime;[523,659,784,1046,1318].forEach(function(f,i){bp(f,t+i*.11,.3,"triangle",.15)})}};

/* ---------- стилі ---------- */
var CSS="\
.krSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.krSt>svg{display:block;width:100%;height:auto}\
.krMu{position:absolute;right:8px;top:8px;z-index:3;width:36px!important;height:36px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:11px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:17px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.krLb{position:absolute;left:6px;top:6px;display:flex;flex-direction:column;gap:2px;pointer-events:none}\
.krLb div{display:flex;align-items:center;gap:5px;background:rgba(10,5,40,.82);border-radius:8px;padding:1px 7px 1px 3px;font:900 11px system-ui;color:#fff;transition:transform .3s}\
.krLb div i{display:grid;place-items:center;width:16px;height:16px;border-radius:5px;font-style:normal;color:#1a0e3a;font-size:10px}\
.krLb div.me{background:#ff3f8e}\
.krLap{position:absolute;right:52px;top:8px;background:rgba(10,5,40,.85);border:2px solid #fff;border-radius:11px;padding:4px 9px;font:900 12px system-ui;color:#fff;pointer-events:none}\
.krBig{position:absolute;inset:0;display:grid;place-items:center;font:900 italic 54px system-ui;color:#ffd23f;text-shadow:0 5px 0 #1a0e3a;pointer-events:none}\
.krO{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .krO button{position:relative;width:auto!important;margin:0!important;min-height:58px;border:3px solid "+O+"!important;border-radius:14px!important;padding:16px 9px 9px!important;background:#fff!important;color:#1a0e3a!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 5px 0 "+O+"!important;cursor:pointer;text-align:center;text-transform:none!important;overflow:hidden}\
.zb .krO button:before{content:'';position:absolute;left:0;right:0;top:0;height:8px;background:repeating-conic-gradient(#1a0e3a 0 25%,#fff 0 50%) 0 0/8px 8px}\
.zb .krO button:active{transform:translateY(4px);box-shadow:0 1px 0 "+O+"!important}\
.zb .krO button.kOk{background:#a8ffb8!important}.zb .krO button.kBad{background:#ffb3c4!important}.zb .krO button.kDim{opacity:.35}\
.krSpin{animation:krSp .8s ease-out}@keyframes krSp{to{transform:rotate(720deg)}}\
.krPop{animation:krPp 1s ease-out forwards}@keyframes krPp{0%{opacity:0;transform:scale(.5)}20%{opacity:1;transform:scale(1.1)}100%{opacity:0;transform:translateY(-18px)}}\
.krFl{animation:krFl .12s steps(2) infinite}@keyframes krFl{50%{opacity:.4}}\
.krCr{animation:krCr 1.6s ease-in-out infinite}@keyframes krCr{50%{transform:translateY(-2px)}}\
body.lite .krFl,body.lite .krCr{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

function track(){var s="<defs><pattern id='krGr' width='40' height='40' patternUnits='userSpaceOnUse'><rect width='40' height='40' fill='"+TV.g[0]+"'/><rect width='20' height='40' fill='"+TV.g[1]+"'/></pattern><pattern id='krCk' width='8' height='8' patternUnits='userSpaceOnUse'><rect width='8' height='8' fill='#fff'/><rect width='4' height='4' fill='#1a0e3a'/><rect x='4' y='4' width='4' height='4' fill='#1a0e3a'/></pattern></defs>";
 s+="<rect width='360' height='240' fill='url(#krGr)'/>";
 var sx=TV.st[0]-122,sy=TV.st[1]-92;s+="<g transform='translate("+sx+","+sy+")'><rect x='122' y='92' width='116' height='56' rx='10' fill='#2a1d78' stroke='"+O+"' stroke-width='3'/><g class='krCr'>";for(var i=0;i<16;i++)s+="<circle cx='"+(130+(i%8)*14)+"' cy='"+(104+Math.floor(i/8)*16)+"' r='5' fill='"+["#ff3f8e","#ffd23f","#3fd2ff","#fff","#7ee787"][i%5]+"'/>";s+="</g><text x='180' y='143' text-anchor='middle' font-size='9' font-weight='900' fill='#ffd23f'>"+TV.n.toUpperCase()+"</text></g>";
 s+="<path d='"+TRK+"' fill='none' stroke='#fff' stroke-width='38'/><path d='"+TRK+"' fill='none' stroke='#e0314f' stroke-width='38' stroke-dasharray='10 10'/><path id='krP' d='"+TRK+"' fill='none' stroke='#4a4f5c' stroke-width='32'/><path d='"+TRK+"' fill='none' stroke='#fff' stroke-width='1.5' stroke-dasharray='8 10' opacity='.5'/>";
 s+="<g id='krFin'></g>";
 [[20,14],[34,14],[326,226],[340,226],[20,226]].forEach(function(q){s+="<circle cx='"+q[0]+"' cy='"+q[1]+"' r='6' fill='#222' stroke='#555' stroke-width='3'/>"});
 s+="<g id='krSk'></g><g id='krK'></g><g id='krFx'></g>";return s}
function kart(c,me){return "<g><rect x='-11' y='-7' width='22' height='14' rx='5' fill='"+c+"' stroke='"+O+"' stroke-width='2.5'/><rect x='-9' y='-10' width='6' height='3' rx='1' fill='#222'/><rect x='3' y='-10' width='6' height='3' rx='1' fill='#222'/><rect x='-9' y='7' width='6' height='3' rx='1' fill='#222'/><rect x='3' y='7' width='6' height='3' rx='1' fill='#222'/><circle cx='-1' cy='0' r='4.5' fill='"+(me?"#fff":"#1a0e3a")+"' stroke='"+O+"' stroke-width='1.5'/>"+(me?"<g class='krNi' opacity='0'><path class='krFl' d='M-11 -4 L-22 0 L-11 4z' fill='#ffd23f'/><path class='krFl' d='M-11 -2 L-17 0 L-11 2z' fill='#ff5a1f'/></g>":"")+"</g>"}

GM.kart7=function(g){inj();TV=TRACKS[(g.v||0)%TRACKS.length];TRK=TV.d;var D0=0,POOL,qi,ok,tot,log,stg,P,L,K,raf=0,last=0,phase,dt0,fin=[],placeShown;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);qi=0;ok=0;tot=0;log=[];fin=[];
  K=[{n:"Ти",c:"#ff3f8e",me:1,s:-36,v:0,off:6,boost:0,skid:0,lap:0}].concat(RIV.map(function(r,i){return {n:r[0],c:r[1],dv:r[2],s:-12*i,v:0,off:[-6,6,-6][i],lap:0}}))}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("krMu");if(b)b.textContent=MUTE?"🔇":"🔊"}

 function intro(){stop();reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'><path d='M20 120 Q180 10 340 120' fill='none' stroke='#4a4f5c' stroke-width='34'/><path d='M20 120 Q180 10 340 120' fill='none' stroke='#fff' stroke-width='2' stroke-dasharray='10 10'/>";
  [[110,64,"#3fd2ff",-28],[170,52,"#ff3f8e",-4],[232,60,"#ffd23f",22]].forEach(function(k){art+="<g transform='translate("+k[0]+","+k[1]+") rotate("+k[3]+") scale(1.8)'>"+kart(k[2],k[2]=="#ff3f8e")+"</g>"});
  art+="<text x='300' y='40' font-size='30'>🏆</text><text x='30' y='40' font-size='26'>🏁</text></svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#ff3f8e,#ffd23f)'><small>СКЛАДНА ГРА · 3 КОЛА · 4 ПІЛОТИ</small>"+art+"</div>"
   +"<div class='zbIn'><h3>Гран-прі: "+TV.n+"</h3><p>Ти стартуєш <b style='color:#ffd23f'>останнім</b>. Попереду Флеш, Турбо і Глюк. Пробийся на подіум — пальне тут одне: знання.</p>"
   +"<div class='zbRu'><i>⏳</i><span><b>Поки читаєш питання — гонка йде повільно.</b> Суперники не чекають, тож не зволікай.</span></div>"
   +"<div class='zbRu'><i>🔥</i><span><b>Правильно — НІТРО:</b> карт летить і обганяє. <b>Хибно — ЗАНОС:</b> крутиться і втрачає швидкість.</span></div>"
   +"<div class='zbRu'><i>🏁</i><span><b>3 кола.</b> Місце на фініші — твоя нагорода: 🥇 🥈 🥉. Оцінка — за правильні відповіді.</span></div>"
   +"<button class='zbGo' id='zbGo'>На старт ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();gs9("Старт!");
  $i("zbR").innerHTML="<div class='krSt'><svg id='krS' viewBox='0 0 360 240' xmlns='http://www.w3.org/2000/svg'>"+track()+"</svg><div class='krLb' id='krLb'></div><div class='krLap' id='krLap'></div><button class='krMu' id='krMu'>"+(MUTE?"🔇":"🔊")+"</button><div class='krBig' id='krBig'></div></div>"
   +"<div id='krW'></div><div class='zbMsg' id='zbM'></div><div id='krN'></div>";
  stg=$i("krS");$i("krMu").onclick=mute;P=$i("krP");L=P.getTotalLength();D0=0;var bd=1e9;for(var d=0;d<L;d+=2){var q=P.getPointAtLength(d),dd=Math.abs(q.x-181)+Math.abs(q.y-206);if(dd<bd){bd=dd;D0=d}}var fp=P.getPointAtLength(D0),fq=P.getPointAtLength((D0+2)%L),fa=Math.atan2(fq.y-fp.y,fq.x-fp.x)*180/Math.PI;$i("krFin").innerHTML="<rect x='-5' y='-16' width='10' height='32' fill='url(#krCk)' stroke='"+O+"' stroke-width='1.5' transform='translate("+fp.x.toFixed(1)+","+fp.y.toFixed(1)+") rotate("+fa.toFixed(1)+")'/>";
  $i("krK").innerHTML=K.map(function(k,i){return "<g id='krK"+i+"'>"+kart(k.c,k.me)+"</g>"}).join("");draw();board();
  var n=3,big=$i("krBig");big.textContent=n;SND.beep();var iv=setInterval(function(){if(!alive(stg)){clearInterval(iv);return}n--;if(n>0){big.textContent=n;SND.beep()}else{clearInterval(iv);big.textContent="GO!";SND.beep(1);engOn();setTimeout(function(){if(alive(big))big.textContent=""},700);phase="q";last=0;raf=requestAnimationFrame(loop);ask()}},700)}
 function stop(){cancelAnimationFrame(raf);raf=0;engOff()}
 function pos(k){var d=(((k.s+D0)%L)+L)%L,p=P.getPointAtLength(d),q=P.getPointAtLength((d+2)%L),a=Math.atan2(q.y-p.y,q.x-p.x),nx=-Math.sin(a),ny=Math.cos(a);return {x:p.x+nx*k.off,y:p.y+ny*k.off,a:a*180/Math.PI}}
 function draw(){K.forEach(function(k,i){var e=$i("krK"+i);if(!e)return;var p=pos(k);e.setAttribute("transform","translate("+p.x.toFixed(1)+","+p.y.toFixed(1)+") rotate("+(p.a+(k.spin||0)).toFixed(1)+")")})}
 function order(){return K.slice().sort(function(a,b){var fa=fin.indexOf(a),fb=fin.indexOf(b);if(fa>=0||fb>=0)return (fa<0?99:fa)-(fb<0?99:fb);return b.s-a.s})}
 function place(){return order().indexOf(K[0])+1}
 function board(){var o=order();$i("krLb").innerHTML=o.map(function(k,i){return "<div class='"+(k.me?"me":"")+"'><i style='background:"+k.c+"'>"+(i+1)+"</i>"+k.n+"</div>"}).join("");$i("krLap").textContent="Коло "+Math.min(LAPS,Math.max(1,Math.floor(Math.max(0,K[0].s)/L)+1))+"/"+LAPS}
 function pop(t,c){var p=pos(K[0]),e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("x",p.x);e.setAttribute("y",p.y-14);e.setAttribute("text-anchor","middle");e.setAttribute("class","krPop");e.setAttribute("style","transform-box:fill-box;transform-origin:center");e.setAttribute("font-size","15");e.setAttribute("font-weight","900");e.setAttribute("font-style","italic");e.setAttribute("fill",c);e.setAttribute("stroke",O);e.setAttribute("stroke-width","3");e.setAttribute("paint-order","stroke");e.textContent=t;$i("krFx").appendChild(e);setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},1000)}
 function loop(ts){if(!alive(stg)){stop();return}if(!last)last=ts;var dt=Math.min(.05,(ts-last)/1000);last=ts;if(phase=="p"){engSet(0);raf=requestAnimationFrame(loop);return}var before=place();
  K.forEach(function(k){if(fin.indexOf(k)>=0){k.s+=dt*20;return}var v;
   if(k.me){v=phase=="d"?(k.boost?72:k.skid?10:40):14;if(k.skid)k.spin=(k.spin||0)+dt*900;}
   else v=phase=="d"?k.dv+Math.sin(ts/700+k.dv)*6:13+(k.dv-40)/10;
   k.v=v;var lp=Math.floor(k.s/L);k.s+=v*dt;var np=Math.floor(k.s/L);
   if(np>lp&&np>=1){if(k.me&&np<LAPS){SND.lap();pop("КОЛО "+(np+1)+"!","#fff")}if(np>=LAPS&&fin.indexOf(k)<0)fin.push(k)}});
  if(K[0].me)engSet(K[0].v);draw();var after=place();if(after<before&&phase=="d")pop("ОБГІН!","#ffd23f");if(after!=before||Math.random()<.05)board();
  if(fin.indexOf(K[0])>=0)return end();raf=requestAnimationFrame(loop)}
 function ask(){if(!alive(stg))return;if(qi>=MAXQ)return end();phase="q";var Q=POOL[qi%POOL.length];K[0].boost=0;K[0].skid=0;K[0].spin=0;$i("zbM").innerHTML="";$i("krN").innerHTML="";gs9("Питання "+(qi+1)+" · місце "+place());
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("krW").innerHTML="<div class='zbQ'><small>🏎 Відповідай — і тисни газ! Суперники вже їдуть…</small><b>"+esc(Q.q)+"</b></div><div class='krO' id='krO'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("krO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled||phase!="q")return;ans(Q,+b.getAttribute("data-i"))}}
 function ans(Q,j){var c=Q._o[j].c;tot++;qi++;[].forEach.call($i("krO").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"kOk":(i==j?"kBad":"kDim")});
  var ni=stg.querySelector(".krNi");phase="d";
  if(c){ok++;K[0].boost=1;if(ni)ni.setAttribute("opacity","1");SND.nitro();vib(25);pop("НІТРО!","#ffd23f");$i("zbM").innerHTML="🔥 Нітро! Правильно."}
  else{log.push(Q);K[0].skid=1;SND.skid();vib([40,30,40]);pop("ЗАНОС!","#ff5a7a");$i("zbM").innerHTML="💨 Занос! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"")}
  setTimeout(function(){if(!alive(stg))return;if(ni)ni.setAttribute("opacity","0");K[0].boost=0;K[0].skid=0;K[0].spin=0;phase="q";board();
   if(fin.indexOf(K[0])>=0)return;if(c)ask();else{phase="p";$i("krN").innerHTML="<button class='zbGo' id='krNx'>Газ! ▶</button>";$i("krNx").onclick=ask}},2600)}
 function end(){if(!alive(stg))return;stop();var pl=place();if(fin.indexOf(K[0])<0){}gs9("Фініш! Місце "+pl);SND.win();board();
  $i("krBig").innerHTML="<span style='font-size:26px;background:rgba(10,5,40,.85);border:3px solid #ffd23f;border-radius:16px;padding:6px 16px;white-space:nowrap'>"+["🥇","🥈","🥉","4️⃣"][pl-1]+" "+pl+" МІСЦЕ</span>";
  var t=Math.max(tot,1),rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("krW").innerHTML="<div class='zbRes "+(pl<=3?"w":"l")+"'><h3>"+["🏆 Перемога в Гран-прі!","🥈 Срібло!","🥉 Бронза — подіум!","Без подіуму цього разу"][pl-1]+"</h3><p>Правильних: <b style='color:#fff'>"+ok+" з "+t+"</b> · нітро: "+ok+" · заносів: "+(tot-ok)+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("krN").innerHTML="";$i("zbAg").onclick=intro;var sc=ok;$i("zbEnd").onclick=function(){fin9(sc,t)}}
 document.addEventListener("visibilitychange",function(){if(!A)return;try{document.hidden?A.suspend():A.resume()}catch(e){}});
 intro()};
try{if(window.GI7)GI7.kart7=["🏎","Картинг-гран-прі"];if(window.GI)GI.kart7=["🏎","Картинг-гран-прі"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Стрім-модератор» =====
   Ти модеруєш стрім Бота-чемпіона. Раунд = хвиля чату (бань шкідливе 🚫, не чіпай нормальне) + питання від глядача.
   Оцінка — за правильні відповіді на питання. Модерація впливає на глядачів і рейтинг стріму. Звук — WebAudio. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var NR=8;
var NICK=["kit","ola_07","max.exe","ліна","dan4ik","sofi","tima","yarik","nastya","bohdan_pro","iryna","zhenya","marta","vlad"];
var NC=["#ff8ab0","#7ee787","#58c4ff","#ffd23f","#c58bff","#ff9a2a"];
var GOOD=["Привіт усім! 👋","🔥🔥🔥","Круто виходить!","GG 😎","А коли наступний стрім?","лол 😂","Бот, ти топ!","Я з 7-Б, всім привіт","Дякую за пояснення!","👍👍","Хто тут з уроку?","Можна ще раз?"];
var BAD=[["БЕЗКОШТОВНИЙ АЙФОН ➜ bit.ly/fr33-ph0ne","спам-посилання"],["Скиньте код із SMS, я перевірю 😉","шахрайство"],["ти нуб, вимикай стрім","образа"],["моя адреса вул. Шкільна 5, кв 12","особисті дані"],["перешли пароль від акаунта, бро","фішинг"],["ВСІ СЮДИ ➜ free-skins.xyz","спам-посилання"],["всі, хто тут сидить, — невдахи 😝","образа"],["мій телефон 097 123 45 67 пишіть","особисті дані"],["Безкоштовні гроші! Введи дані картки","шахрайство"]];

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={msg:function(){if(ac())bp(1200,A.currentTime,.05,"sine",.05)},ban:function(){if(ac()){bp(180,A.currentTime,.15,"square",.12,90);bp(660,A.currentTime+.05,.1,"triangle",.1)}},
 oops:function(){if(ac())bp(300,A.currentTime,.3,"sawtooth",.08,120)},leak:function(){if(!ac())return;var t=A.currentTime;bp(520,t,.12,"square",.07);bp(390,t+.12,.2,"square",.07)},
 like:function(){if(!ac())return;var t=A.currentTime;[784,988,1318].forEach(function(f,i){bp(f,t+i*.07,.16,"triangle",.12)})},
 live:function(){if(!ac())return;var t=A.currentTime;[523,659,784].forEach(function(f,i){bp(f,t+i*.12,.2,"square",.07)})}};

/* ---------- стилі ---------- */
var CSS="\
.smV{position:relative;border-radius:20px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.smV>svg{display:block;width:100%;height:auto}\
.smBot{position:absolute;left:36%;bottom:4%;width:28%;pointer-events:none}.smBot svg{width:100%;height:auto}\
.smLive{position:absolute;left:8px;top:8px;display:flex;gap:6px;pointer-events:none}.smLive span{border-radius:8px;padding:3px 8px;font:900 12px system-ui;color:#fff;background:rgba(10,5,40,.82)}.smLive span.r{background:#e0314f}.smLive span.r:before{content:'● ';animation:smBk 1s steps(2) infinite}@keyframes smBk{50%{opacity:0}}\
.smMu{position:absolute;right:8px;top:8px;z-index:3;width:34px!important;height:34px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:10px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:16px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.smAl{position:absolute;left:50%;top:22%;transform:translateX(-50%);white-space:nowrap;background:#ffd23f;color:#1a0e3a;border:3px solid "+O+";border-radius:14px;padding:5px 12px;font:900 italic 15px system-ui;box-shadow:0 4px 0 rgba(0,0,0,.3);animation:smAl 1.4s ease-out forwards;pointer-events:none}.smAl.bad{background:#ff5a7a;color:#fff}@keyframes smAl{0%{opacity:0;transform:translate(-50%,10px) scale(.7)}15%{opacity:1;transform:translate(-50%,0) scale(1.05)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-14px)}}\
.smLk{position:absolute;bottom:8%;font-size:22px;animation:smLk 1.4s ease-out forwards;pointer-events:none}@keyframes smLk{to{transform:translateY(-120px) scale(1.4);opacity:0}}\
.smC{margin-top:10px;background:#120838;border:2px solid #3a2a9c;border-radius:16px;padding:24px 8px 8px;height:224px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:5px;position:relative}\
.smC:before{content:'💬 ЧАТ СТРІМУ';position:absolute;left:10px;top:6px;font:900 10px system-ui;color:#6b5fc7;letter-spacing:.06em}\
.smM{display:flex;align-items:center;gap:8px;background:#22165e;border-radius:10px;padding:6px 6px 6px 10px;font:600 13px/1.3 system-ui;color:#e6e1ff;animation:smIn .25s ease-out}@keyframes smIn{from{opacity:0;transform:translateY(12px)}}\
.smM span{flex:1;min-width:0}.smM b{font-weight:900;margin-right:4px}\
.zb .smM button{flex:none;width:40px!important;height:34px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:9px!important;border:2px solid "+O+"!important;background:#ff5a7a!important;font-size:16px!important;line-height:1!important;cursor:pointer;box-shadow:0 3px 0 "+O+"!important}\
.zb .smM button:active{transform:translateY(2px);box-shadow:0 1px 0 "+O+"!important}\
.smM.ban{background:#1f6f3a;text-decoration:line-through;opacity:.7}.smM.ban button,.smM.leak button,.smM.oops button,.smM.ok button{visibility:hidden}\
.smM.leak{background:#7a1f2e;animation:smSh .4s}@keyframes smSh{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}\
.smM.oops{background:#5a4a1f}.smM.ok{opacity:.55}\
.smM i{display:block;font-style:normal;font:800 10px system-ui;color:#ffd23f;margin-top:2px}\
.smPin{border:3px solid #ffd23f;background:#2a1d78;border-radius:16px;padding:10px 12px;color:#fff;margin-top:10px}\
.smPin small{font:900 11px system-ui;color:#ffd23f;letter-spacing:.04em;text-transform:uppercase}.smPin b{display:block;font:800 15px/1.35 system-ui;margin-top:3px}\
.smO{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}\
.zb .smO button{position:relative;width:auto!important;margin:0!important;min-height:54px;border:3px solid "+O+"!important;border-radius:16px 16px 16px 4px!important;padding:9px 10px!important;background:#fff!important;color:#1a0e3a!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 4px 0 "+O+"!important;cursor:pointer;text-align:left;text-transform:none!important}\
.zb .smO button:active{transform:translateY(3px);box-shadow:0 1px 0 "+O+"!important}\
.zb .smO button.sOk{background:#a8ffb8!important}.zb .smO button.sBad{background:#ffb3c4!important}.zb .smO button.sDim{opacity:.35}\
.smTip{margin-top:6px;text-align:center;font:800 12px system-ui;color:#a99fe8}\
body.lite .smLive span.r:before{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

var SV=0,SHOW=["КІБЕРСЕЗОН LIVE","ІГРОВИЙ ЧЕТВЕР","НІЧНИЙ ЕФІР"];
function studio(){var s="<defs><linearGradient id='smBg' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2a1478'/><stop offset='1' stop-color='#7a2cff'/></linearGradient><radialGradient id='smRg' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#ff3f8e' stop-opacity='.7'/><stop offset='1' stop-color='#ff3f8e' stop-opacity='0'/></radialGradient></defs><rect width='360' height='200' fill='url(#smBg)'/>";
 s+="<circle cx='180' cy='92' r='78' fill='url(#smRg)'/>";
 for(var i=0;i<6;i++)s+="<rect x='"+(14+i*58)+"' y='14' width='44' height='30' rx='6' fill='#140a46' opacity='.5'/>";
 s+="<rect x='24' y='60' width='70' height='46' rx='8' fill='#140a46' stroke='#58c4ff' stroke-width='3'/><text x='59' y='90' text-anchor='middle' font-size='20'>🎮</text>";
 s+="<rect x='262' y='56' width='80' height='54' rx='8' fill='#140a46' stroke='#ffd23f' stroke-width='3'/><text x='302' y='78' text-anchor='middle' font-size='8' font-weight='900' fill='#ffd23f'>ПІДПИСНИКИ</text><text id='smSub' x='302' y='100' text-anchor='middle' font-size='16' font-weight='900' fill='#fff'>0</text>";
 s+="<path d='M0 170 Q180 150 360 170 V200 H0z' fill='#140a46'/><rect x='70' y='160' width='220' height='14' rx='6' fill='#3a2a9c' stroke='"+O+"' stroke-width='3'/>";
 s+="<g transform='translate(250,128)'><rect x='-3' y='0' width='6' height='34' fill='#222'/><rect x='-8' y='-16' width='16' height='22' rx='8' fill='#555' stroke='"+O+"' stroke-width='2.5'/></g>";
 s+="<text x='180' y='192' text-anchor='middle' font-size='10' font-weight='900' fill='#a99fe8'>"+SHOW[SV]+" · СТРІМ БОТА-ЧЕМПІОНА</text>";
 return s}

GM.stream7=function(g){SV=(g.v||0)%3;inj();var POOL,ri,ok,tot,log,view,subs,bans,leaks,oops,stg,tmrs=[],active=0,phase;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);ri=0;ok=0;tot=0;log=[];view=120;subs=0;bans=0;leaks=0;oops=0;clear()}
 function clear(){tmrs.forEach(clearTimeout);tmrs=[]}
 function later(f,ms){tmrs.push(setTimeout(function(){if(alive(stg))f()},ms))}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("smMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function bot(e){var b=$i("smBot");if(b)b.innerHTML=B7(e)}
 function hud(){$i("smVw").textContent="👁 "+Math.max(0,view);$i("smRd").textContent="Раунд "+Math.min(ri+1,NR)+"/"+NR;var s=$i("smSub");if(s)s.textContent=subs}
 function alert(t,bad){var v=$i("smVv");if(!v)return;var e=document.createElement("div");e.className="smAl"+(bad?" bad":"");e.textContent=t;v.appendChild(e);later(function(){if(e.parentNode)e.parentNode.removeChild(e)},1400)}
 function likes(n,ch){var v=$i("smVv");for(var i=0;i<n;i++)(function(i){later(function(){var e=document.createElement("div");e.className="smLk";e.style.left=(55+Math.random()*35)+"%";e.textContent=ch||["❤️","⭐","👍","🔥"][i%4];v.appendChild(e);later(function(){if(e.parentNode)e.parentNode.removeChild(e)},1400)},i*120)})(i)}

 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='14' width='190' height='120' rx='12' fill='#140a46' stroke='#fff' stroke-width='3'/><rect x='30' y='24' width='44' height='16' rx='4' fill='#e0314f'/><text x='52' y='36' text-anchor='middle' font-size='10' font-weight='900' fill='#fff'>● LIVE</text><text x='115' y='92' text-anchor='middle' font-size='44'>🤖</text>";
  [["@kit: Привіт! 👋","#7ee787"],["@xx: ФРІ СКІНИ ➜","#ff8ab0"],["@ola: 🔥🔥🔥","#58c4ff"]].forEach(function(m,i){art+="<rect x='220' y='"+(18+i*40)+"' width='126' height='32' rx='8' fill='#22165e'/><text x='228' y='"+(38+i*40)+"' font-size='10' font-weight='800' fill='"+m[1]+"'>"+m[0]+"</text>"+(i==1?"<text x='328' y='"+(39+i*40)+"' font-size='14'>🚫</text>":"")});
  art+="</svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#e0314f,#7a2cff)'><small>СКЛАДНА ГРА · КІБЕРСЕЗОН LIVE</small>"+art+"</div>"
   +"<div class='zbIn'><h3>Ти — модератор стріму</h3><p>Бот-чемпіон веде прямий ефір, а в чат налітають і друзі, і тролі, і шахраї. Захисти глядачів — і відповідай на їхні питання. Від тебе залежить, чи виросте стрім!</p>"
   +"<div class='zbRu'><i>🚫</i><span><b>Хвиля чату:</b> бань спам, шахраїв, образи й чужі особисті дані — поки повідомлення не проскочило. <b>Нормальних глядачів не чіпай!</b></span></div>"
   +"<div class='zbRu'><i>❓</i><span><b>Питання від глядача:</b> обери правильну відповідь — глядачі в захваті, підписки ростуть.</span></div>"
   +"<div class='zbRu'><i>📈</i><span><b>8 раундів.</b> Оцінка — за відповіді на питання. А модерація вирішує рейтинг стріму: ⭐⭐⭐.</span></div>"
   +"<button class='zbGo' id='zbGo'>Вийти в ефір ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();gs9("В ефірі");
  $i("zbR").innerHTML="<div class='smV' id='smVv'><svg id='smS' viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'>"+studio()+"</svg><div class='smBot' id='smBot'>"+B7("hype")+"</div><div class='smLive'><span class='r'>LIVE</span><span id='smVw'></span><span id='smRd'></span></div><button class='smMu' id='smMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div class='smC' id='smC'></div><div id='smW'></div><div class='zbMsg' id='zbM'></div><div id='smN'></div>";
  stg=$i("smS");$i("smMu").onclick=mute;hud();SND.live();alert("🔴 ЕФІР ПОЧАВСЯ!");
  $i("smC").onclick=function(e){var b=e.target.closest("button");if(!b)return;var m=b.closest(".smM");if(m&&m._ban)m._ban()};
  later(round,1200)}
 function round(){if(ri>=NR)return end();phase="chat";hud();gs9("Модеруй чат!");bot("idle");$i("smW").innerHTML="<div class='smTip'>👀 Слідкуй за чатом: 🚫 — лише для шкідливого!</div>";$i("zbM").innerHTML="";$i("smN").innerHTML="";
  var n=5,bad=1+(ri>2?1:0)+(ri>5?1:0),seq=shf([0,0,0,0,0].map(function(_,i){return i<bad}));active=n;
  seq.forEach(function(isBad,i){later(function(){msg(isBad)},400+i*(1300-ri*40))})}
 function msg(isBad){var c=$i("smC");if(!c)return;var nick=NICK[Math.floor(Math.random()*NICK.length)],col=NC[Math.floor(Math.random()*NC.length)],B=isBad?BAD[Math.floor(Math.random()*BAD.length)]:null,txt=isBad?B[0]:GOOD[Math.floor(Math.random()*GOOD.length)];
  var e=document.createElement("div");e.className="smM";e.innerHTML="<span><b style='color:"+col+"'>@"+esc(nick)+":</b>"+esc(txt)+"<i></i></span><button title='Забанити'>🚫</button>";c.appendChild(e);SND.msg();
  while(c.children.length>5)c.removeChild(c.firstChild);
  var done=false,life=4800-ri*150;
  function fin(){if(done)return;done=true;active--;hud();if(active<=0)later(ask,700)}
  e._ban=function(){if(done)return;if(isBad){bans++;view+=6;e.className="smM ban";e.querySelector("i").textContent="🛡 забанено: "+B[1];SND.ban();vib(15);alert("🛡 +6 глядачів")}else{oops++;view-=8;e.className="smM oops";e.querySelector("i").textContent="😬 це був нормальний глядач!";SND.oops();vib([30,30]);alert("😬 −8 глядачів",1);bot("sad")}fin()};
  later(function(){if(done)return;if(isBad){leaks++;view-=10;e.className="smM leak";e.querySelector("i").textContent="⚠️ проскочило: "+B[1];SND.leak();vib([40,30,40]);alert("⚠️ −10 глядачів",1);bot("sad")}else e.className="smM ok";fin()},life)}
 function ask(){if(!alive(stg)||phase=="q")return;phase="q";var Q=POOL[ri%POOL.length],nick=NICK[Math.floor(Math.random()*NICK.length)];gs9("Питання глядача");bot("think");
  var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("smW").innerHTML="<div class='smPin'><small>📌 @"+esc(nick)+" питає в чаті</small><b>"+esc(Q.q)+"</b></div><div class='smO' id='smO'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("smO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ans(Q,+b.getAttribute("data-i"))}}
 function ans(Q,j){var c=Q._o[j].c;tot++;ri++;[].forEach.call($i("smO").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"sOk":(i==j?"sBad":"sDim")});
  if(c){ok++;view+=15;subs+=3;SND.like();vib(20);bot("hype");likes(8);alert("❤️ +15 глядачів · +3 підписки");$i("zbM").innerHTML="✅ Чат у захваті!";hud();$i("smN").innerHTML="<button class='zbGo' id='smNx'>Далі ▶</button>";$i("smNx").onclick=round;return}
  log.push(Q);view-=8;SND.oops();bot("sad");likes(4,"👎");alert("👎 −8 глядачів",1);hud();
  $i("zbM").innerHTML="Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");
  $i("smN").innerHTML="<button class='zbGo' id='smNx'>Далі ▶</button>";$i("smNx").onclick=round}
 function end(){clear();phase="end";var st=view>=230?3:view>=170?2:view>=110?1:0;gs9("Ефір завершено");bot(st>=2?"hype":"happy");likes(st*4);SND.like();
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("smW").innerHTML="<div class='zbRes "+(st>=2?"w":"l")+"'><h3>"+["Стрім провалився","📺 Нормальний ефір","🔥 Крутий стрім!","🏆 Стрім року!"][st]+"</h3><p>"+"⭐".repeat(st)+"☆".repeat(3-st)+"<br>Відповіді: <b style='color:#fff'>"+ok+" з "+tot+"</b> · глядачів: "+Math.max(0,view)+" · підписок: "+subs+"<br>🛡 забанено: "+bans+" · ⚠️ проскочило: "+leaks+" · 😬 помилкових банів: "+oops+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("smN").innerHTML="";$i("zbAg").onclick=intro;var sc=ok,t=Math.max(tot,1);$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.stream7=["🎥","Стрім-модератор"];if(window.GI)GI.stream7=["🎥","Стрім-модератор"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Мислимо як ШІ» =====
   ШІ-помічник "+NM+" пише конспект уроку: 3 статті по 4 факти. Частина фактів — галюцинації.
   Познач 🚩 вигадки й опублікуй. Оцінка — за кожен правильно оцінений факт (12). Звук — WebAudio. */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
var NA=3,PER=4,DL=60;
var TOP=["Конспект уроку","Шпаргалка до тесту","Пост для шкільного блогу"];

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={key:function(){if(ac())bp(1800+Math.random()*600,A.currentTime,.02,"square",.025)},flag:function(){if(ac())bp(520,A.currentTime,.1,"triangle",.12,780)},unflag:function(){if(ac())bp(600,A.currentTime,.08,"triangle",.08,400)},
 pub:function(){if(!ac())return;var t=A.currentTime;[523,659,784].forEach(function(f,i){bp(f,t+i*.08,.18,"triangle",.12)})},
 good:function(){if(ac())bp(1046,A.currentTime,.12,"sine",.12)},bad:function(){if(ac())bp(220,A.currentTime,.3,"sawtooth",.08,110)},
 think:function(){if(!ac())return;var t=A.currentTime;for(var i=0;i<4;i++)bp(300+i*120,t+i*.09,.08,"sine",.05)}};

/* ---------- стилі ---------- */
var CSS="\
.aiSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.aiSt>svg{display:block;width:100%;height:auto}\
.aiMu{position:absolute;right:8px;top:8px;z-index:3;width:34px!important;height:34px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:10px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:16px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.aiHud{position:absolute;left:8px;top:8px;display:flex;gap:6px;pointer-events:none}.aiHud span{background:rgba(10,5,40,.82);border:2px solid #fff;border-radius:11px;padding:3px 9px;font:900 12px system-ui;color:#fff}\
.aiSay{position:absolute;left:61%;top:24%;right:3%;background:#fff;color:#1a0e3a;border:3px solid "+O+";border-radius:14px;padding:6px 10px;font:800 12px/1.3 system-ui;box-shadow:0 4px 0 rgba(0,0,0,.3)}\
.aiSay:before{content:'';position:absolute;left:-12px;top:14px;border:8px solid transparent;border-right-color:"+O+"}\
.aiPap{margin-top:10px;background:#fffdf5;border-radius:6px 6px 18px 18px;box-shadow:0 6px 0 rgba(0,0,0,.3);padding:12px 12px 6px;color:#1a0e3a;position:relative;background-image:repeating-linear-gradient(transparent 0 27px,#e8e2ff 27px 28px)}\
.aiPap h4{margin:0 0 8px;font:900 italic 16px system-ui;color:#7a2cff;display:flex;justify-content:space-between;align-items:center}.aiPap h4 small{font:800 11px system-ui;color:#a99fe8;font-style:normal}\
.aiF{display:flex;gap:9px;align-items:flex-start;padding:9px 8px;border-radius:12px;margin-bottom:7px;cursor:pointer;border:2px dashed transparent;transition:background .15s;-webkit-tap-highlight-color:transparent;position:relative}\
.aiF:active{background:#f0ebff}\
.aiF .fl{flex:none;width:34px;height:34px;border-radius:10px;border:2px solid #c9c0ff;display:grid;place-items:center;font-size:17px;background:#fff}\
.zb .aiF p{margin:0;font:600 13.5px/1.35 system-ui;flex:1;min-width:0;color:#1a0e3a!important}.zb .aiF p span{color:#1a0e3a!important;font-weight:700}.zb .aiF p b{display:block;font:800 12px system-ui;color:#6b5fc7!important;margin-bottom:2px}\
.aiF.on{background:#ffe4ea;border-color:#ff5a7a}.aiF.on .fl{border-color:#ff5a7a;background:#ff5a7a}\
.aiF.typing p:after{content:'▍';animation:aiCur .6s steps(2) infinite;color:#7a2cff}@keyframes aiCur{50%{opacity:0}}\
.aiF.rv{cursor:default}.aiF.vT{background:#e3ffe8}.aiF.vF{background:#ffe4ea}.aiF.vT .fl{background:#3fd27a;border-color:#3fd27a}.aiF.vF .fl{background:#ff5a7a;border-color:#ff5a7a}\
.aiF i{display:block;font-style:normal;font:800 12px/1.35 system-ui;margin-top:4px}.zb .aiF.vT i{color:#1f8a4a!important}.zb .aiF.vF i{color:#c8264a!important}.zb .aiPap h4{color:#7a2cff!important}\
.aiSt2{position:absolute;right:8px;top:6px;transform:rotate(-12deg);border:3px solid;border-radius:8px;padding:1px 7px;font:900 13px system-ui;animation:aiSp .35s cubic-bezier(.3,1.8,.5,1) both}@keyframes aiSp{0%{transform:rotate(-12deg) scale(2.4);opacity:0}}\
.aiT{height:8px;border-radius:4px;background:#e8e2ff;margin:2px 0 8px;overflow:hidden}.aiT i{display:block;height:100%;background:linear-gradient(90deg,#7a2cff,#ff3f8e);transform-origin:left;transition:transform 1s linear}\
.aiOrb{animation:aiOb 3s ease-in-out infinite}@keyframes aiOb{50%{transform:translateY(-5px)}}\
.aiNet{animation:aiNt 2.4s ease-in-out infinite}@keyframes aiNt{50%{opacity:.25}}\
.aiPls{animation:aiPl 1.6s linear infinite}@keyframes aiPl{to{stroke-dashoffset:-30}}\
body.lite .aiOrb,body.lite .aiNet,body.lite .aiPls,body.lite .aiF.typing p:after{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

var OV=0,OPAL=[["#9b7bff","#3a1d9c"],["#5fe0d0","#0f7a8a"],["#ffb36b","#c8501f"]];
function orb(m){var eyes=m=="sad"?"<path d='M-14 -2 q6 -6 12 0 M2 -2 q6 -6 12 0' stroke='#fff' stroke-width='3.5' fill='none' stroke-linecap='round'/>":m=="happy"?"<path d='M-14 0 q6 -8 12 0 M2 0 q6 -8 12 0' stroke='#fff' stroke-width='3.5' fill='none' stroke-linecap='round'/>":m=="glitch"?"<text x='-8' y='5' text-anchor='middle' font-size='14' font-weight='900' fill='#ff5a7a'>?</text><text x='8' y='5' text-anchor='middle' font-size='14' font-weight='900' fill='#ff5a7a'>!</text>":"<ellipse cx='-8' cy='-1' rx='4.5' ry='6' fill='#fff'/><ellipse cx='8' cy='-1' rx='4.5' ry='6' fill='#fff'/>";
 return "<g class='aiOrb'><circle r='40' fill='#7a2cff' opacity='.25'/><circle r='30' fill='url(#aiOg)' stroke='"+O+"' stroke-width='3.5'/><path d='M-20 -12 q10 -14 22 -6 q12 -8 18 6' stroke='#c9c0ff' stroke-width='2.5' fill='none' opacity='.8'/><path d='M-18 14 q8 6 16 0 q8 6 16 0' stroke='#c9c0ff' stroke-width='2.5' fill='none' opacity='.6'/>"+eyes+"<path d='M0 -30 V-40' stroke='"+O+"' stroke-width='3'/><circle cx='0' cy='-43' r='5' fill='#ffd23f' stroke='"+O+"' stroke-width='2.5'/></g>"}
function lab(){var s="<defs><radialGradient id='aiOg' cx='.35' cy='.3' r='.8'><stop offset='0' stop-color='"+OPAL[OV][0]+"'/><stop offset='1' stop-color='"+OPAL[OV][1]+"'/></radialGradient><linearGradient id='aiBg' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#0b0530'/><stop offset='1' stop-color='#2a1478'/></linearGradient></defs><rect width='360' height='160' fill='url(#aiBg)'/>";
 var N=[[24,40],[24,80],[24,120],[70,30],[70,70],[70,110],[70,140],[116,55],[116,100]];
 N.forEach(function(a,i){N.forEach(function(b,j){if(b[0]-a[0]==46&&(i+j)%2==0)s+="<path class='aiPls' d='M"+a[0]+" "+a[1]+" L"+b[0]+" "+b[1]+"' stroke='#58c4ff' stroke-width='1.5' stroke-dasharray='4 6' opacity='.55'/>"})});
 N.forEach(function(a,i){s+="<circle class='aiNet' style='animation-delay:"+(i*.27).toFixed(2)+"s' cx='"+a[0]+"' cy='"+a[1]+"' r='6' fill='#58c4ff' stroke='"+O+"' stroke-width='2'/>"});
 s+="<path d='M122 78 H140' stroke='#58c4ff' stroke-width='2'/>";
 s+="<g transform='translate(170,88)' id='aiOrb'>"+orb()+"</g>";
 return s}

GM.ai7=function(g){OV=(g.v||0)%3;var NM=["Нейрончик", "Бітик", "Кодик"][(g.v||0)%3];inj();var POOL,ai,okN,totN,log,art,stg,tm=0,left,flags,miss,falseAcc,pubOk;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);ai=0;okN=0;totN=0;log=[];miss=0;falseAcc=0;pubOk=0;clearInterval(tm)}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("aiMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function face(m){var o=$i("aiOrb");if(o)o.innerHTML=orb(m)}
 function say(t){var e=$i("aiSay");if(e)e.innerHTML=t}

 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'><defs><radialGradient id='aiOg' cx='.35' cy='.3' r='.8'><stop offset='0' stop-color='"+OPAL[OV][0]+"'/><stop offset='1' stop-color='"+OPAL[OV][1]+"'/></radialGradient></defs><g transform='translate(76,84)'>"+orb("happy")+"</g><rect x='150' y='22' width='190' height='112' rx='8' fill='#fffdf5' stroke='"+O+"' stroke-width='3'/>";
  ["Хмара зберігає файли ✓","Gmail створили в 1812 🚩","Пароль не повторюють ✓"].forEach(function(l,i){var bad=i==1;art+=(bad?"<rect x='158' y='"+(36+i*30)+"' width='174' height='22' rx='5' fill='#ffe4ea'/>":"")+"<text x='166' y='"+(52+i*30)+"' font-size='11' font-weight='700' fill='"+O+"'>"+l+"</text>"});
  art+="</svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#7a2cff,#3fd2ff)'><small>СКЛАДНА ГРА · ПЕРЕВІР ШТУЧНИЙ ІНТЕЛЕКТ</small>"+art+"</div>"
   +"<div class='zbIn'><h3>"+NM+" іноді вигадує</h3><p>ШІ-помічник "+NM+" дуже швидко пише тексти. Але, як і справжні нейромережі, він часом <b style='color:#ff8aa0'>галюцинує</b> — впевнено пише неправду. Ти — редактор: перевір усе, перш ніж публікувати!</p>"
   +"<div class='zbRu'><i>📝</i><span><b>3 статті по 4 факти</b> на тему уроку. У кожній щонайменше одна вигадка.</span></div>"
   +"<div class='zbRu'><i>🚩</i><span><b>Тицьни на факт, щоб позначити його як вигадку.</b> Тицьни ще раз — зняти позначку. Правду не чіпай!</span></div>"
   +"<div class='zbRu'><i>⏱</i><span><b>Дедлайн "+DL+" секунд</b> на статтю — потім вона публікується сама. Оцінка — за кожен правильно перевірений факт.</span></div>"
   +"<button class='zbGo' id='zbGo'>Відкрити редакцію ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();
  $i("zbR").innerHTML="<div class='aiSt'><svg id='aiS' viewBox='0 0 360 160' xmlns='http://www.w3.org/2000/svg'>"+lab()+"</svg><div class='aiHud'><span id='aiH'></span></div><div class='aiSay' id='aiSay'></div><button class='aiMu' id='aiMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='aiW'></div><div class='zbMsg' id='zbM'></div><div id='aiN'></div>";
  stg=$i("aiS");$i("aiMu").onclick=mute;write()}
 function hud(){$i("aiH").textContent="📝 "+Math.min(ai+1,NA)+"/"+NA+" · ✅ "+okN+"/"+totN}
 function write(){if(!alive(stg))return;if(ai>=NA)return end();hud();gs9("Стаття "+(ai+1)+"/"+NA);face();say("🤖 Думаю… генерую текст…");SND.think();$i("zbM").innerHTML="";$i("aiN").innerHTML="";
  var items=POOL.slice(ai*PER,ai*PER+PER);if(items.length<PER)items=items.concat(shf(POOL).slice(0,PER-items.length));
  var nf=1+(Math.random()<.5?1:0),fk=shf([0,1,2,3]).slice(0,nf);
  art=items.map(function(Q,i){var f=fk.indexOf(i)>=0,wr=Q.o.filter(function(_,k){return k!=Q.a});return {Q:Q,fake:f,txt:f?wr[Math.floor(Math.random()*wr.length)]:Q.o[Q.a],on:false}});
  flags=0;
  $i("aiW").innerHTML="<div class='aiPap'><h4>✍️ "+TOP[ai%TOP.length]+"<small id='aiDl'></small></h4><div class='aiT'><i id='aiTi'></i></div>"+art.map(function(a,i){return "<div class='aiF' id='aiF"+i+"' data-i='"+i+"'><div class='fl'>"+(i+1)+"</div><p><b>❓ "+esc(a.Q.q)+"</b><span></span></p></div>"}).join("")+"</div>";
  var k=0;function typeN(){if(!alive(stg))return;if(k>=art.length){ready();return}var el=$i("aiF"+k),sp=el.querySelector("span"),txt="🤖 "+art[k].txt,c=0;el.classList.add("typing");
   var iv=setInterval(function(){if(!alive(stg)){clearInterval(iv);return}c+=2;sp.textContent=txt.slice(0,c);if(c%4==0)SND.key();if(c>=txt.length){clearInterval(iv);el.classList.remove("typing");k++;setTimeout(typeN,180)}},28)}
  setTimeout(typeN,600)}
 function ready(){say("Готово! Публікуємо? 😇");left=DL;
  $i("aiN").innerHTML="<button class='zbGo' id='aiPub'>📢 Опублікувати</button>";$i("aiPub").onclick=publish;
  [].forEach.call(document.querySelectorAll(".aiF"),function(el){el.onclick=function(){if(el.classList.contains("rv"))return;var a=art[+el.getAttribute("data-i")];a.on=!a.on;el.classList.toggle("on",a.on);el.querySelector(".fl").textContent=a.on?"🚩":(+el.getAttribute("data-i")+1);a.on?SND.flag():SND.unflag();vib(10)}});
  tick();clearInterval(tm);tm=setInterval(tick,1000)}
 function tick(){if(!alive(stg)){clearInterval(tm);return}var d=$i("aiDl"),ti=$i("aiTi");if(d)d.textContent="⏱ "+left+" с";if(ti)ti.style.transform="scaleX("+(left/DL)+")";if(left<=0){clearInterval(tm);publish();return}left--}
 function publish(){clearInterval(tm);if(!$i("aiPub"))return;$i("aiN").innerHTML="";SND.pub();var good=0,lost=0;
  art.forEach(function(a,i){var el=$i("aiF"+i),right=a.on==a.fake;totN++;if(right)okN++;el.classList.add("rv");el.classList.remove("on");el.classList.add(a.fake?"vF":"vT");
   el.querySelector(".fl").textContent=a.fake?"❌":"✓";
   var note=a.fake?(a.on?"🚩 Спіймав галюцинацію! Правильно: «"+esc(a.Q.o[a.Q.a])+"»":"⚠️ Вигадка пішла в публікацію! Правильно: «"+esc(a.Q.o[a.Q.a])+"»")+(a.Q.w?"<br><span style='font-weight:600;color:#6b5fc7'>"+esc(a.Q.w)+"</span>":""):(a.on?"😬 Це правда, а ти позначив як вигадку":"✓ Правда");
   var i2=document.createElement("i");i2.innerHTML=note;el.querySelector("p").appendChild(i2);
   if(!right){log.push(a.Q);if(a.fake)miss++;else falseAcc++}else if(a.fake)good++});
  var allOk=art.every(function(a){return a.on==a.fake});if(allOk)pubOk++;
  var pap=document.querySelector(".aiPap");var st=document.createElement("div");st.className="aiSt2";st.style.color=allOk?"#1f8a4a":"#c8264a";st.style.borderColor=allOk?"#1f8a4a":"#c8264a";st.textContent=allOk?"ПЕРЕВІРЕНО ✓":"Є ПОМИЛКИ";pap.appendChild(st);
  if(allOk){face("happy");say("Дякую, редакторе! Без тебе я б наплутав 🙏");SND.good();vib(20)}else{face("glitch");say("Ой… я впевнено написав дурницю 😳");SND.bad();vib([30,40,30])}
  ai++;hud();$i("aiN").innerHTML="<button class='zbGo' id='aiNx'>"+(ai>=NA?"Підсумок ▶":"Наступна стаття ▶")+"</button>";$i("aiNx").onclick=write}
 function end(){clearInterval(tm);var win=okN>=Math.ceil(totN*.75);gs9("Редакцію закрито");face(win?"happy":"sad");say(win?"Ти найкращий фактчекер! 🏆":"Наступного разу перевіряй уважніше 🤓");
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("aiW").innerHTML="<div class='zbRes "+(win?"w":"l")+"'><h3>"+(win?"🕵️ Фактчекер року!":"Галюцинації прорвалися")+"</h3><p>Правильно перевірено: <b style='color:#fff'>"+okN+" з "+totN+"</b> фактів<br>Чисті публікації: "+pubOk+"/"+NA+" · пропущено вигадок: "+miss+" · правду названо фейком: "+falseAcc+"</p></div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("aiN").innerHTML="";$i("zbAg").onclick=intro;var sc=okN,t=Math.max(totN,1);$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.ai7=["🤖","Мислимо як ШІ"];if(window.GI)GI.ai7=["🤖","Мислимо як ШІ"]}catch(e){}
})();

/* ===== 7 клас · складна гра «Цифровий сад» =====
   6 грядок. Правильна відповідь = 2 краплі: тицяй грядки — рослина росте (насіння → паросток → бутон → квітка).
   Хибна — на грядці виростає бур'ян-вірус, він блокує ріст (прибрати = 1 крапля).
   Квіти, що розцвіли, переносяться в «Сезонну клумбу» — вона росте від уроку до уроку (на пристрої). */
(function(){if(!window.GM||!window.X7)return;
var X=X7,O=X.O,esc=X.esc,shf=X.shf,alive=X.alive,vib=X.vib;
function $i(x){return document.getElementById(x)}
function B7(e){try{return window.BOT7?BOT7(e):""}catch(x){return ""}}
var NQ=8,DROPS=2;
var BEDS=[[58,156],[162,156],[266,156],[58,226],[162,226],[266,226]];
var FT=[["tulip","🌷","Тюльпан"],["sun","🌻","Соняшник"],["daisy","🌼","Ромашка"],["rose","🌹","Троянда"],["cact","🌵","Кактус"],["cyber","💠","Кібер-квітка"]];

/* ---------- звук ---------- */
var A=null,M=null,MUTE=false;try{MUTE=localStorage.getItem("inf7mus")=="0"}catch(e){}
function ac(){if(A)return A;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;A=new C();M=A.createGain();M.gain.value=MUTE?0:.45;M.connect(A.destination);return A}
function bp(f,t,len,type,v,f2){if(!A)return;var o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(M);o.start(t);o.stop(t+len+.02)}
var SND={drop:function(st){if(!ac())return;var t=A.currentTime;bp(900,t,.08,"sine",.12,400);bp(400+st*180,t+.1,.2,"triangle",.12)},
 bloom:function(){if(!ac())return;var t=A.currentTime;[784,988,1175,1568].forEach(function(f,i){bp(f,t+i*.07,.25,"triangle",.1)})},
 weed:function(){if(!ac())return;var t=A.currentTime;bp(160,t,.4,"sawtooth",.08,90);bp(200,t+.1,.3,"square",.04,100)},
 pull:function(){if(ac())bp(500,A.currentTime,.15,"square",.08,150)},ok:function(){if(ac()){var t=A.currentTime;bp(660,t,.1,"triangle",.12);bp(880,t+.1,.14,"triangle",.12)}}};

/* ---------- стилі ---------- */
var CSS="\
.gdSt{position:relative;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,.3)}.gdSt>svg{display:block;width:100%;height:auto}\
.gdMu{position:absolute;right:8px;top:8px;z-index:3;width:34px!important;height:34px!important;min-height:0!important;margin:0!important;padding:0!important;border-radius:10px!important;border:2px solid #fff!important;background:rgba(10,5,40,.85)!important;font-size:16px!important;line-height:1!important;cursor:pointer;box-shadow:none!important}\
.gdHud{position:absolute;left:8px;top:8px;display:flex;gap:5px;pointer-events:none}.gdHud span{background:rgba(10,5,40,.82);border:2px solid #fff;border-radius:11px;padding:3px 9px;font:900 12px system-ui;color:#fff}.gdHud span.w{background:#1f9fff}\
.gdBot{position:absolute;right:0;bottom:22%;width:14%;pointer-events:none}.gdBot svg{width:100%;height:auto}\
.gdBed{cursor:pointer}.gdBed.can .gdSoil{stroke:#ffd23f;stroke-width:4;stroke-dasharray:6 5;animation:gdAnt 1s linear infinite}@keyframes gdAnt{to{stroke-dashoffset:-22}}\
.gdGrow{animation:gdGr .5s cubic-bezier(.3,1.7,.5,1);transform-box:fill-box;transform-origin:bottom}@keyframes gdGr{0%{transform:scale(.4)}}\
.gdDrop{animation:gdDp .5s ease-in forwards}@keyframes gdDp{from{transform:translateY(-60px);opacity:1}to{transform:translateY(0);opacity:.2}}\
.gdBf{animation:gdBf 6s ease-in-out infinite}@keyframes gdBf{25%{transform:translate(40px,-20px)}50%{transform:translate(80px,10px)}75%{transform:translate(30px,25px)}}\
.gdWd{animation:gdWd .8s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}@keyframes gdWd{to{transform:rotate(6deg)}}\
.gdO{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}\
.zb .gdO button{width:auto!important;margin:0!important;min-height:56px;border:3px solid "+O+"!important;border-radius:20px 20px 20px 6px!important;padding:9px 10px!important;background:#f2ffe8!important;color:#1a0e3a!important;font:800 13.5px/1.25 system-ui!important;box-shadow:0 5px 0 #2f8f2f!important;cursor:pointer;text-align:center;text-transform:none!important}\
.zb .gdO button:active{transform:translateY(4px);box-shadow:0 1px 0 #2f8f2f!important}\
.zb .gdO button.gOk{background:#a8ffb8!important}.zb .gdO button.gBad{background:#ffb3c4!important}.zb .gdO button.gDim{opacity:.35}\
.gdTip{margin-top:10px;background:#1f9fff;color:#fff;border-radius:16px;padding:10px 12px;font:800 14px/1.35 system-ui;text-align:center;box-shadow:0 4px 0 rgba(0,0,0,.25)}\
.gdCol{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;background:rgba(0,0,0,.22);border-radius:14px;padding:8px;margin:10px 0 2px;font-size:20px;min-height:36px}.gdCol small{font:800 12px system-ui;color:#cfc8ff;align-self:center}\
body.lite .gdBf,body.lite .gdWd,body.lite .gdBed.can .gdSoil{animation:none!important}\
";
var injd=0;function inj(){X.inj();if(injd)return;injd=1;var s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s)}

function plant(t,st){var S="stroke='"+O+"' stroke-width='2.5' stroke-linejoin='round'";
 if(st==0)return "<ellipse cx='0' cy='-2' rx='8' ry='4' fill='#8b5a2b' "+S+"/><circle cx='0' cy='-5' r='3' fill='#c9a36b'/>";
 if(st==1)return "<path d='M0 0 V-16' stroke='#2f8f2f' stroke-width='3.5'/><path d='M0 -12 q-12 -2 -14 -12 q10 0 14 10z M0 -14 q10 -4 14 -14 q-10 -2 -14 12z' fill='#46c25a' "+S+"/>";
 var stem="<path d='M0 0 V-38' stroke='#2f8f2f' stroke-width='4'/><path d='M0 -14 q-14 -2 -18 -14 q12 0 18 12z M0 -22 q14 -4 18 -16 q-12 -2 -18 14z' fill='#46c25a' "+S+"/>";
 if(t=="cact"){var c="<path d='M-8 0 V-36 q8 -12 16 0 V0z' fill='#3fae5a' "+S+"/><path d='M-8 -18 h-8 v-12' fill='none' stroke='#3fae5a' stroke-width='6' stroke-linecap='round'/><path d='M8 -14 h8 v-14' fill='none' stroke='#3fae5a' stroke-width='6' stroke-linecap='round'/>";return st==2?c:c+"<circle cx='0' cy='-42' r='7' fill='#ff3f8e' "+S+"/><circle cx='0' cy='-42' r='2.5' fill='#ffd23f'/>"}
 if(st==2)return stem+"<ellipse cx='0' cy='-42' rx='6' ry='9' fill='#46c25a' "+S+"/><path d='M-3 -48 q3 -6 6 0' fill='"+({tulip:"#ff3f5a",sun:"#ffd23f",daisy:"#fff",rose:"#ff3f8e",cyber:"#3fe0ff"}[t])+"'/>";
 if(t=="tulip")return stem+"<path d='M-11 -44 q0 -16 6 -18 l5 8 l5 -8 q6 2 6 18 q-11 10 -22 0z' fill='#ff3f5a' "+S+"/>";
 if(t=="sun"){var p="";for(var i=0;i<10;i++){var a=i*36*Math.PI/180;p+="<ellipse cx='"+(Math.cos(a)*12).toFixed(1)+"' cy='"+(-48+Math.sin(a)*12).toFixed(1)+"' rx='6' ry='3.5' transform='rotate("+(i*36)+" "+(Math.cos(a)*12).toFixed(1)+" "+(-48+Math.sin(a)*12).toFixed(1)+")' fill='#ffd23f' stroke='"+O+"' stroke-width='1.5'/>"}return stem+p+"<circle cx='0' cy='-48' r='8' fill='#8b5a2b' "+S+"/>"}
 if(t=="daisy"){var d="";for(var j=0;j<8;j++){var b=j*45*Math.PI/180;d+="<ellipse cx='"+(Math.cos(b)*9).toFixed(1)+"' cy='"+(-46+Math.sin(b)*9).toFixed(1)+"' rx='6' ry='3.5' transform='rotate("+(j*45)+" "+(Math.cos(b)*9).toFixed(1)+" "+(-46+Math.sin(b)*9).toFixed(1)+")' fill='#fff' stroke='"+O+"' stroke-width='1.5'/>"}return stem+d+"<circle cx='0' cy='-46' r='5' fill='#ffd23f' stroke='"+O+"' stroke-width='1.5'/>"}
 if(t=="rose")return stem+"<circle cx='0' cy='-46' r='11' fill='#ff3f8e' "+S+"/><path d='M-6 -46 q6 -8 12 0 q-6 6 -12 0 M-3 -44 q3 -4 6 0' fill='none' stroke='#b01f5a' stroke-width='2'/>";
 return stem+"<g filter='url(#gdGl)'><polygon points='0,-60 6,-48 0,-36 -6,-48' fill='#3fe0ff' "+S+"/><polygon points='-12,-48 0,-54 12,-48 0,-42' fill='#b06bff' opacity='.85' "+S+"/><circle cx='0' cy='-48' r='3.5' fill='#fff'/></g>"}
function weed(){return "<g class='gdWd'><path d='M-10 0 q-4 -18 4 -26 M0 0 q2 -22 -2 -32 M10 0 q4 -16 -4 -24' stroke='#5a1f6a' stroke-width='4' fill='none' stroke-linecap='round'/><path d='M-6 -26 l-6 -4 M-2 -32 l6 -6 M6 -24 l8 -2' stroke='#5a1f6a' stroke-width='3'/><circle cx='0' cy='-34' r='9' fill='#8a2be2' stroke='"+O+"' stroke-width='2.5'/><circle cx='-3' cy='-35' r='2' fill='#fff'/><circle cx='3' cy='-35' r='2' fill='#fff'/><path d='M-3 -30 l2 -1 l2 1 l2 -1' stroke='#fff' stroke-width='1.5' fill='none'/></g>"}
var GV=0,SEA=[["#7fd3ff","#d8f3ff","#6fd36f","#4fbf4f"],["#ffb36b","#ffe0b0","#c9b04f","#b39a3a"],["#b06bff","#ffb3e0","#5fc2a0","#3fa882"]];
function garden(){var s="<defs><linearGradient id='gdSky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='"+SEA[GV][0]+"'/><stop offset='1' stop-color='"+SEA[GV][1]+"'/></linearGradient><filter id='gdGl' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='2.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs>";
 s+="<rect width='360' height='260' fill='url(#gdSky)'/><circle cx='308' cy='40' r='20' fill='#ffd23f'/><g opacity='.95'><ellipse cx='80' cy='38' rx='28' ry='10' fill='#fff'/><ellipse cx='100' cy='32' rx='18' ry='9' fill='#fff'/><ellipse cx='210' cy='56' rx='22' ry='7' fill='#fff'/></g>";
 s+="<path d='M0 100 Q90 84 180 98 T360 94 V260 H0z' fill='"+SEA[GV][2]+"'/><path d='M0 112 Q120 100 240 110 T360 108 V260 H0z' fill='"+SEA[GV][3]+"'/>";
 for(var i=0;i<16;i++)s+="<rect x='"+(i*24)+"' y='92' width='8' height='30' rx='2' fill='#fff' stroke='#c9a36b' stroke-width='1.5'/>";s+="<rect y='100' width='360' height='5' fill='#fff' stroke='#c9a36b' stroke-width='1'/>";
 s+="<g class='gdBf'><text x='30' y='80' font-size='14'>🦋</text></g>";
 BEDS.forEach(function(b,i){s+="<g class='gdBed' id='gdB"+i+"' data-i='"+i+"'><ellipse class='gdSoil' cx='"+b[0]+"' cy='"+b[1]+"' rx='46' ry='15' fill='#8b5a2b' stroke='"+O+"' stroke-width='3'/><ellipse cx='"+b[0]+"' cy='"+(b[1]-2)+"' rx='38' ry='9' fill='#a0714a'/><g id='gdP"+i+"' transform='translate("+b[0]+","+b[1]+")'></g><rect x='"+(b[0]-50)+"' y='"+(b[1]-70)+"' width='100' height='90' fill='transparent'/></g>"});
 s+="<g id='gdFx'></g>";return s}
function colGet(){try{return JSON.parse(localStorage.getItem("inf7garden"))||{}}catch(e){return {}}}
function colAdd(list){var c=colGet();list.forEach(function(k){c[k]=(c[k]||0)+1});try{localStorage.setItem("inf7garden",JSON.stringify(c))}catch(e){}}
function colHtml(){var c=colGet(),h="",n=0;FT.forEach(function(f){for(var i=0;i<Math.min(c[f[0]]||0,30);i++){h+=f[1];n++}});return "<div class='gdCol'>"+(n?h:"<small>Клумба поки порожня — виростимо перші квіти!</small>")+"</div>"}

GM.garden7=function(g){GV=(g.v||0)%3;inj();var POOL,qi,ok,tot,log,beds,drops,stg;
 function shell(){fr9(g.title,"","<div class='zb' id='zbR'></div>");try{[].forEach.call($i("zbR").parentNode.parentNode.querySelectorAll(":scope>h2,:scope>.gbn"),function(h){if(h.tagName=="H2")h.style.display="none";else h.classList.add("x7cmp")})}catch(e){}}
 function reset(){POOL=shf(g.rounds||[]);qi=0;ok=0;tot=0;log=[];drops=0;var t=shf(FT.map(function(f){return f[0]}));beds=BEDS.map(function(_,i){return {t:t[i],st:0,weed:false}})}
 function mute(){MUTE=!MUTE;try{localStorage.setItem("inf7mus",MUTE?"0":"1")}catch(e){}if(M)M.gain.value=MUTE?0:.45;var b=$i("gdMu");if(b)b.textContent=MUTE?"🔇":"🔊"}
 function bot(e){var b=$i("gdBot");if(b)b.innerHTML=B7(e)}
 function bloomed(){return beds.filter(function(b){return b.st>=3}).length}
 function hud(){$i("gdH").innerHTML="<span>🌱 "+Math.min(qi+1,NQ)+"/"+NQ+"</span><span>🌸 "+bloomed()+"/6</span>"+(drops?"<span class='w'>💧 ×"+drops+"</span>":"")}
 function drawBed(i,anim){var b=beds[i],e=$i("gdP"+i);e.innerHTML="<g transform='scale(1.4)'>"+(b.weed?"<g transform='translate(20,0)'>"+weed()+"</g>":"")+"<g"+(anim?" class='gdGrow'":"")+">"+plant(b.t,b.st)+"</g></g>"}
 function drawAll(){beds.forEach(function(_,i){drawBed(i)})}
 function canMark(){beds.forEach(function(b,i){var e=$i("gdB"+i);if(e)e.setAttribute("class","gdBed"+(drops&&(b.weed||b.st<3)?" can":""))})}

 function intro(){reset();shell();gs9("Складна гра");
  var art="<svg viewBox='0 0 360 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='gdGl' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='2.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs>";
  [[50,0],[110,1],[170,2],[230,3],[290,3]].forEach(function(p,i){art+="<ellipse cx='"+p[0]+"' cy='130' rx='26' ry='9' fill='#8b5a2b' stroke='"+O+"' stroke-width='2.5'/><g transform='translate("+p[0]+",128)'>"+plant(["tulip","sun","daisy","rose","cyber"][i],p[1])+"</g>"});
  art+="<text x='22' y='40' font-size='22'>💧</text><text x='318' y='40' font-size='22'>🦋</text></svg>";
  $i("zbR").innerHTML="<div class='zbHd' style='background:linear-gradient(120deg,#3fd27a,#1f9fff)'><small>СКЛАДНА ГРА · САД, ЩО РОСТЕ ВЕСЬ СЕЗОН</small>"+art+"</div>"
   +"<div class='zbIn'><h3>Виростити кібер-сад</h3><p>У тебе 6 грядок із насінням — тюльпан, соняшник, ромашка, троянда, кактус і рідкісна кібер-квітка. Поливати їх можна лише <b style='color:#7fd3ff'>знаннями</b>.</p>"
   +"<div class='zbRu'><i>💧</i><span><b>Правильна відповідь — 2 краплі.</b> Тицяй грядки: насіння → паросток → бутон → квітка. Сам вирішуй, що поливати!</span></div>"
   +"<div class='zbRu'><i>🦠</i><span><b>Помилка — бур'ян-вірус</b> на грядці. Поки він там, рослина не росте. Прибрати його коштує 1 краплю.</span></div>"
   +"<div class='zbRu'><i>🌸</i><span><b>Квіти, що розцвіли, йдуть у Сезонну клумбу</b> — вона росте від уроку до уроку. Ось твоя:</span></div>"
   +colHtml()+"<button class='zbGo' id='zbGo'>До саду ▶</button></div>";
  $i("zbGo").onclick=function(){ac();try{A.resume()}catch(e){}start()}}

 function start(){shell();gs9("Цифровий сад");
  $i("zbR").innerHTML="<div class='gdSt'><svg id='gdS' viewBox='0 0 360 262' xmlns='http://www.w3.org/2000/svg'>"+garden()+"</svg><div class='gdHud' id='gdH'></div><div class='gdBot' id='gdBot'>"+B7("happy")+"</div><button class='gdMu' id='gdMu'>"+(MUTE?"🔇":"🔊")+"</button></div>"
   +"<div id='gdW'></div><div class='zbMsg' id='zbM'></div><div id='gdN'></div>";
  stg=$i("gdS");$i("gdMu").onclick=mute;drawAll();hud();
  stg.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".gdBed");if(b)tend(+b.getAttribute("data-i"))});ask()}
 function ask(){if(!alive(stg))return;if(qi>=NQ)return end();drops=0;canMark();hud();bot("think");gs9("Питання "+(qi+1)+"/"+NQ);$i("zbM").innerHTML="";$i("gdN").innerHTML="";
  var Q=POOL[qi%POOL.length];var o=shf(Q.o.map(function(t,i){return {t:t,c:i===Q.a}}));Q._o=o;
  $i("gdW").innerHTML="<div class='zbQ'><small>🌱 Відповідай — і отримаєш 💧💧</small><b>"+esc(Q.q)+"</b></div><div class='gdO' id='gdO'>"+o.map(function(x,i){return "<button data-i='"+i+"'>"+esc(x.t)+"</button>"}).join("")+"</div>";
  $i("gdO").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;ans(Q,+b.getAttribute("data-i"))}}
 function ans(Q,j){var c=Q._o[j].c;tot++;qi++;[].forEach.call($i("gdO").querySelectorAll("button"),function(b,i){b.disabled=true;b.className=Q._o[i].c?"gOk":(i==j?"gBad":"gDim")});
  if(c){ok++;drops=DROPS;SND.ok();vib(15);bot("happy");hud();canMark();$i("zbM").innerHTML="";
   if(!beds.some(function(b){return b.weed||b.st<3})){drops=0;$i("gdW").innerHTML="<div class='gdTip'>🌸 Усе вже цвіте! Краплі зберегти нікуди 😄</div>";later(ask,1200);return}
   $i("gdW").innerHTML="<div class='gdTip'>✅ Правильно! Тицяй грядки: 💧 ×"+drops+"</div>";return}
  log.push(Q);bot("sad");SND.weed();vib([30,40,30]);
  var free=beds.map(function(b,i){return b.weed?-1:i}).filter(function(i){return i>=0});if(free.length){var w=free[Math.floor(Math.random()*free.length)];beds[w].weed=true;drawBed(w,true)}
  $i("zbM").innerHTML="🦠 Виріс бур'ян-вірус! Правильно: <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.85;font-weight:600'>"+esc(Q.w)+"</span>":"");hud();
  $i("gdN").innerHTML="<button class='zbGo' id='gdNx'>Далі ▶</button>";$i("gdNx").onclick=ask}
 var tmr=[];function later(f,ms){tmr.push(setTimeout(function(){if(alive(stg))f()},ms))}
 function tend(i){if(!drops)return;var b=beds[i];if(!b.weed&&b.st>=3)return;drops--;var p=BEDS[i];
  var fx=document.createElementNS("http://www.w3.org/2000/svg","g");fx.innerHTML="<g class='gdDrop'><text x='"+p[0]+"' y='"+(p[1]-30)+"' text-anchor='middle' font-size='20'>💧</text></g>";$i("gdFx").appendChild(fx);setTimeout(function(){if(fx.parentNode)fx.parentNode.removeChild(fx)},520);
  if(b.weed){b.weed=false;SND.pull();setTimeout(function(){if(alive(stg))drawBed(i,true)},300);$i("zbM").innerHTML="🧹 Бур'ян прибрано!"}
  else{b.st++;SND.drop(b.st);setTimeout(function(){if(!alive(stg))return;drawBed(i,true);if(b.st==3){SND.bloom();vib(25);bot("hype");$i("zbM").innerHTML="🌸 Розцвів "+FT.filter(function(f){return f[0]==b.t})[0][1]+" "+FT.filter(function(f){return f[0]==b.t})[0][2]+"!"}},300)}
  hud();canMark();if($i("gdW").firstChild&&drops)$i("gdW").firstChild.innerHTML="Тицяй грядки: 💧 ×"+drops;
  if(!drops){$i("gdW").innerHTML="";$i("gdN").innerHTML="<button class='zbGo' id='x7Nx'>"+(qi>=NQ?"Фініш ▶":"Далі ▶")+"</button>";$i("x7Nx").onclick=ask;}}
 function end(){tmr.forEach(clearTimeout);drops=0;canMark();var bl=beds.filter(function(b){return b.st>=3}).map(function(b){return b.t});colAdd(bl);gs9("Сад виріс!");bot(bl.length>=3?"hype":"happy");if(bl.length)SND.bloom();
  var rv=log.length?"<div class='zbRv'><h4>Розбір помилок</h4>"+log.map(function(Q){return "<div>"+esc(Q.q)+"<br>✔ <b>"+esc(Q.o[Q.a])+"</b>"+(Q.w?"<br><span style='opacity:.8'>"+esc(Q.w)+"</span>":"")+"</div>"}).join("")+"</div>":"";
  $i("gdW").innerHTML="<div class='zbRes "+(bl.length>=3?"w":"l")+"'><h3>"+(bl.length>=5?"🌸 Райський сад!":bl.length>=3?"🌼 Квітучий сад":bl.length?"🌱 Сад тільки починає":"🦠 Бур'яни перемогли")+"</h3><p>Правильних: <b style='color:#fff'>"+ok+" з "+tot+"</b> · розцвіло: "+bl.length+"/6</p></div><div class='zbRv'><h4>🌸 Сезонна клумба</h4>"+colHtml()+"</div>"+rv
   +"<div class='zbBtns'><button class='zbGo alt' id='zbAg'>↻ Ще раз</button><button class='zbGo' id='zbEnd'>Результат</button></div>";
  $i("zbM").innerHTML="";$i("gdN").innerHTML="";$i("zbAg").onclick=intro;var sc=ok,t=Math.max(tot,1);$i("zbEnd").onclick=function(){fin9(sc,t)}}
 intro()};
try{if(window.GI7)GI7.garden7=["🌱","Цифровий сад"];if(window.GI)GI.garden7=["🌱","Цифровий сад"]}catch(e){}
})();

/* 7 клас «Сезон»: маскот Бот-чемпіон – хаб, брифінг уроку, реакції на відповіді в іграх і тестах, фінальний екран. ES5. */
(function(){
var K="#140c30",C="#3ff5d2",N=0;
function glow(id){return ' filter="url(#gl'+id+')"'}
function face(e,id){var g=glow(id);
 if(e=="happy")return '<path d="M76 84 Q89 62 102 84" stroke="'+C+'" stroke-width="8" fill="none" stroke-linecap="round"'+g+'/><path d="M138 84 Q151 62 164 84" stroke="'+C+'" stroke-width="8" fill="none" stroke-linecap="round"'+g+'/><path d="M100 94 Q120 116 140 94 Z" fill="'+C+'"'+g+'/>';
 if(e=="sad")return '<rect x="80" y="74" width="20" height="18" rx="8" fill="'+C+'"'+g+'/><rect x="140" y="74" width="20" height="18" rx="8" fill="'+C+'"'+g+'/><path d="M76 70 L100 64" stroke="'+C+'" stroke-width="6" stroke-linecap="round"/><path d="M164 70 L140 64" stroke="'+C+'" stroke-width="6" stroke-linecap="round"/><path d="M104 106 Q120 96 136 106" stroke="'+C+'" stroke-width="7" fill="none" stroke-linecap="round"'+g+'/><path d="M162 94 q4 9 0 13 q-4-4 0-13" fill="#7fd4ff"/>';
 if(e=="think")return '<rect class="b7e" x="80" y="66" width="20" height="26" rx="9" fill="'+C+'"'+g+'/><path d="M140 80 L162 80" stroke="'+C+'" stroke-width="8" stroke-linecap="round"'+g+'/><circle cx="108" cy="104" r="4" fill="'+C+'"/><circle cx="120" cy="104" r="4" fill="'+C+'"/><circle cx="132" cy="104" r="4" fill="'+C+'"/>';
 if(e=="hype"){var s="";[89,151].forEach(function(x){s+='<path d="M'+x+' 62 l5 11 l12 1 l-9 8 l3 12 l-11 -6 l-11 6 l3 -12 l-9 -8 l12 -1z" fill="#ffd23f"'+g+'/>'});return s+'<path d="M100 96 Q120 120 140 96 Z" fill="'+C+'"'+g+'/>'}
 if(e=="wink")return '<rect class="b7e" x="78" y="64" width="22" height="30" rx="10" fill="'+C+'"'+g+'/><path d="M140 82 Q151 72 162 82" stroke="'+C+'" stroke-width="8" fill="none" stroke-linecap="round"'+g+'/><path d="M102 98 Q120 112 140 96" stroke="'+C+'" stroke-width="7" fill="none" stroke-linecap="round"'+g+'/>';
 return '<g class="b7e"><rect x="78" y="64" width="22" height="30" rx="10" fill="'+C+'"'+g+'/><rect x="140" y="64" width="22" height="30" rx="10" fill="'+C+'"'+g+'/></g><path d="M104 100 Q120 110 136 100" stroke="'+C+'" stroke-width="7" fill="none" stroke-linecap="round"'+g+'/>'}
function arm(x,y,ang,id){return '<g transform="rotate('+ang+' '+x+' '+y+')"><rect x="'+(x-11)+'" y="'+(y-6)+'" width="22" height="50" rx="11" fill="url(#ar'+id+')" stroke="'+K+'" stroke-width="5"/><circle cx="'+x+'" cy="'+(y+50)+'" r="15" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/></g>'}
var POSE={idle:{la:20,ra:-150},happy:{la:40,ra:-40},sad:{la:8,ra:-8,ht:6},think:{la:15,ra:-120,ht:-5},hype:{la:160,ra:-160,jump:1},wink:{la:20,ra:-110}};
window.BOT7=function(e,w,cls){e=e||"idle";var o=POSE[e]||POSE.idle,id=++N,j=o.jump?-14:0,conf="";
 if(e=="hype")[[30,40,"#ffd23f"],[200,30,"#3ff5d2"],[20,140,"#ff4f9a"],[214,120,"#ffd23f"],[50,20,"#3ff5d2"],[190,70,"#ff4f9a"]].forEach(function(c,i){conf+='<rect x="'+c[0]+'" y="'+(c[1]+20)+'" width="12" height="7" rx="2" fill="'+c[2]+'" transform="rotate('+(i*37)+' '+c[0]+' '+(c[1]+20)+')"/>'});
 return '<svg class="b7 b7-'+e+(cls?" "+cls:"")+'" viewBox="0 -10 240 280" width="'+(w||120)+'" aria-hidden="true"><defs><linearGradient id="hd'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4f9a"/><stop offset="1" stop-color="#ff9a2a"/></linearGradient><linearGradient id="bd'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5cff"/><stop offset="1" stop-color="#4a33c8"/></linearGradient><linearGradient id="ar'+id+'" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4cf0"/><stop offset="1" stop-color="#4a33c8"/></linearGradient><filter id="gl'+id+'" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
 +'<ellipse cx="120" cy="258" rx="'+(o.jump?48:62)+'" ry="9" fill="#000" opacity=".25"/><g class="b7b" transform="translate(0 '+j+')">'
 +'<rect x="86" y="206" width="26" height="40" rx="10" fill="#3a2a9c" stroke="'+K+'" stroke-width="5"/><rect x="128" y="206" width="26" height="40" rx="10" fill="#3a2a9c" stroke="'+K+'" stroke-width="5"/><rect x="80" y="236" width="38" height="16" rx="8" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/><rect x="122" y="236" width="38" height="16" rx="8" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/>'
 +arm(66,146,o.la,id)+arm(174,146,o.ra,id)
 +'<rect x="64" y="128" width="112" height="90" rx="30" fill="url(#bd'+id+')" stroke="'+K+'" stroke-width="6"/><path d="M76 150 Q120 140 164 150" stroke="#fff" stroke-opacity=".25" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M120 156 l20 11 v22 l-20 11 l-20 -11 v-22z" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/><path d="M124 162 l-10 16 h8 l-4 14 l12 -18 h-8z" fill="'+K+'"/>'
 +'<g transform="rotate('+(o.ht||0)+' 120 128)"><line x1="120" y1="30" x2="120" y2="10" stroke="'+K+'" stroke-width="6" stroke-linecap="round"/><circle class="b7a" cx="120" cy="10" r="10" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/><circle cx="36" cy="82" r="16" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/><circle cx="204" cy="82" r="16" fill="#ffd23f" stroke="'+K+'" stroke-width="5"/><rect x="38" y="28" width="164" height="112" rx="40" fill="url(#hd'+id+')" stroke="'+K+'" stroke-width="6"/><path d="M58 52 Q70 38 92 36" stroke="#fff" stroke-opacity=".6" stroke-width="8" fill="none" stroke-linecap="round"/><rect x="58" y="50" width="124" height="72" rx="26" fill="#1a0f40" stroke="'+K+'" stroke-width="5"/>'+face(e,id)+'</g></g>'+conf+'</svg>'};
function on(){return document.body&&document.body.classList.contains("s7n")}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
var css=".b7{display:block;overflow:visible}.b7 .b7b{animation:b7bob 3s ease-in-out infinite;transform-box:fill-box}.b7 .b7a{animation:b7ant 1.6s ease-in-out infinite}.b7 .b7e{animation:b7blink 4.5s infinite;transform-origin:center;transform-box:fill-box}\
@keyframes b7bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes b7ant{0%,100%{fill:#ffd23f}50%{fill:#fff6b0}}@keyframes b7blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}\
.b7-hype .b7b{animation:b7jump .8s ease-in-out infinite}@keyframes b7jump{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}\
.s7say{position:relative;z-index:3;display:flex;align-items:flex-end;justify-content:flex-end;gap:2px;margin:-34px 4px 2px 0}.s7peek{flex:none;filter:drop-shadow(0 6px 0 rgba(0,0,0,.25))}\
.s7bub{position:relative;margin-bottom:34px;max-width:70%;background:#fff;color:#1b1046;font:800 14px/1.35 system-ui;padding:10px 14px;border-radius:16px;box-shadow:0 5px 0 rgba(0,0,0,.3)}.s7bub::after{content:'';position:absolute;right:-9px;bottom:14px;border:9px solid transparent;border-left-color:#fff;border-right:0}\
.s7brief{display:flex;align-items:flex-end;gap:8px;margin:4px 0 12px}.s7brief .say{position:relative;flex:1;background:#fff;color:#1b1046;border-radius:16px;padding:10px 12px;font:700 14px/1.35 system-ui;box-shadow:0 5px 0 rgba(0,0,0,.3)}.s7brief .say::before{content:'';position:absolute;left:-9px;bottom:16px;border:9px solid transparent;border-right-color:#fff;border-left:0}.s7brief .say b{color:#ff3f8e;font-style:italic;display:block;font-size:12px}\
body.s7n .fb{display:flex!important;align-items:center;gap:8px}body.s7n .fb .b7{flex:none}body.s7n #fb .fm .b7{margin:-6px 0}\
body.s7n .endx~.big .b7,body.s7n .card>.big .b7{margin:0 auto}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
/* хаб */
var HI=["Новий день – нові XP! Погнали? 🔥","Місія чекає. Я в тебе вірю!","Ще трохи – і новий рівень!","Квести дня самі себе не виконають 😉","Біп-буп! Радий тебе бачити!"];
function hubBot(){if(!on())return;var c=document.querySelector(".s7seas");if(!c||document.querySelector(".s7say"))return;
 var r=document.createElement("div");r.className="s7say";r.innerHTML="<div class='s7bub'>"+pick(HI).replace(/</g,"&lt;")+"</div><div class='s7peek'>"+BOT7("wink",86)+"</div>";c.parentNode.insertBefore(r,c.nextSibling)}
/* брифінг уроку */
function briefBot(n){if(!on())return;var a=document.getElementById("app");if(!a||a.querySelector(".s7brief"))return;var top=a.querySelector(".top");var t="";try{t=(window.T7&&T7[n-1]&&(T7[n-1].t||T7[n-1][0]||T7[n-1]))||""}catch(e){}if(typeof t!=="string")t="";
 var d=document.createElement("div");d.className="s7brief";var L=window.LES&&LES[700+n],g=L&&L.g?L.g.length:0;
 d.innerHTML=BOT7("think",72)+"<div class='say'><b>БРИФІНГ · МІСІЯ "+n+"</b>"+(g?"Спершу читанка, потім "+g+" "+(g==1?"гра":g<5?"ігри":"ігор")+" і тест. Збирай XP!":"Сьогодні підсумковий тест на 24 питання. Ти готовий!")+"</div>";
 if(top&&top.nextSibling)a.insertBefore(d,top.nextSibling);else a.insertBefore(d,a.firstChild)}
/* реакції на відповіді (ігри: .fb ✔/✖; тест: #fb.ok/.bad) і фінал */
function react(n){if(!on()||!n||n.nodeType!==1)return;
 var list=n.classList&&n.classList.contains("fb")?[n]:[].slice.call(n.querySelectorAll?n.querySelectorAll(".fb"):[]);
 list.forEach(function(f){if(f.querySelector(".b7"))return;var fm=f.querySelector(".fm");
  var ok=f.id=="fb"?f.classList.contains("ok")||(!f.classList.contains("bad")&&/^✔/.test(f.textContent)):/^\s*✔/.test(f.textContent);
  var h=BOT7(ok?"happy":"sad",fm?64:48);if(fm)fm.innerHTML=h;else f.insertAdjacentHTML("afterbegin",h)});
 var big=n.classList&&n.classList.contains("card")?n.querySelector(":scope>.big"):(n.querySelector?n.querySelector(".card>.big"):null);
 if(big&&!big.querySelector(".b7")&&document.querySelector(".endx")){var st2=document.querySelector(".stars"),r=0;try{var m=/(\d+)\s*з\s*(\d+)/i.exec(document.querySelector(".card").textContent);if(m)r=+m[1]/+m[2]}catch(e){}
  big.innerHTML=BOT7(r>=.85?"hype":r>=.5?"happy":"wink",150);[].forEach.call(document.querySelectorAll(".exm"),function(p){p.innerHTML=p.innerHTML.replace(/Мяу\s*🐾?/,"Біп-буп 🤖")})}}
var mo=new MutationObserver(function(ms){if(!on())return;ms.forEach(function(m){[].forEach.call(m.addedNodes,react)})});
function start(){var a=document.getElementById("app");if(a)mo.observe(a,{childList:true,subtree:true})}
if(document.readyState=="loading")document.addEventListener("DOMContentLoaded",start);else start();
if(typeof topics=="function"){var _tp=topics;topics=window.topics=function(){var r=_tp.apply(this,arguments);try{hubBot()}catch(e){}return r}}
if(typeof lesson7=="function"){var _l7=lesson7;lesson7=window.lesson7=function(n){var r=_l7.apply(this,arguments);try{briefBot(+n)}catch(e){}return r}}
})();
/* Бот-чемпіон – герой складних ігор 7 класу (M8: Зона, Бос, Лабіринт – замість героя; Вежа, Дроп, Захист, Ритм, Квест-кімната – поруч зі сценою) */
(function(){
function on(){return document.body&&document.body.classList.contains("s7n")}
var POS={tower:"left:4%;bottom:16%;width:19%",drop:"left:4%;bottom:12%;width:17%",def:"right:2%;bottom:34%;width:16%",rhythm:"left:3%;bottom:4%;width:20%"};
var css=".s7hero{position:absolute;z-index:8;max-width:90px;pointer-events:none;filter:drop-shadow(0 4px 0 rgba(0,0,0,.25))}.s7hero .b7,.m8hero .b7,.m8pl .b7{width:100%;height:auto}\
.qrSc{position:relative}.qrSc .s7hero{left:0;bottom:15%;width:11%}.m8s.m8-zone .b7{width:46px!important;height:auto}.s7pop{animation:s7pop .35s ease-out}@keyframes s7pop{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:scale(1)}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function addHero(){if(!on())return;
 [].forEach.call(document.querySelectorAll(".m8s"),function(s){if(s.querySelector(".b7"))return;var k=null;for(var c in POS)if(s.classList.contains("m8-"+c))k=c;if(!k)return;
  var d=document.createElement("div");d.className="s7hero";d.style.cssText=POS[k];d.innerHTML=BOT7("idle");s.appendChild(d)});
 [].forEach.call(document.querySelectorAll(".qrSc"),function(s){if(s.querySelector(".s7hero"))return;var d=document.createElement("div");d.className="s7hero";d.innerHTML=BOT7("think");s.appendChild(d)})}
/* реакція героя на відповідь */
var tm=0;function feel(ok){[].forEach.call(document.querySelectorAll(".s7hero,.m8hero,.m8pl"),function(h){if(!h.querySelector(".b7"))return;var base=h.closest&&h.closest(".qrSc")?"think":"idle";
 h.innerHTML=BOT7(ok?"happy":"sad",null,"s7hb");h.classList.remove("s7pop");void h.offsetWidth;h.classList.add("s7pop");clearTimeout(tm);
 tm=setTimeout(function(){[].forEach.call(document.querySelectorAll(".s7hero,.m8hero,.m8pl"),function(x){if(x.querySelector(".b7"))x.innerHTML=BOT7(x.closest&&x.closest(".qrSc")?"think":"idle",null,"s7hb")})},1400)})}
document.addEventListener("click",function(e){if(!on())return;var b=e.target.closest&&e.target.closest(".m8b,.qrRow,.qrCd,.qrDg,.sbBtn");if(!b)return;
 setTimeout(function(){var ok=b.classList.contains("ok"),bad=b.classList.contains("bad");if(!ok&&!bad){var f=document.querySelector(".m8f:last-of-type");}if(ok||bad)feel(ok)},60)},true);
var mo=new MutationObserver(function(){if(on())addHero()});
function start(){var a=document.getElementById("app");if(a)mo.observe(a,{childList:true,subtree:true})}
if(document.readyState=="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

;(window.__GPL=window.__GPL||[]).push("g7_11");
