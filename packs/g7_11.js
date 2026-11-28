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

;(window.__GPL=window.__GPL||[]).push("g7_11");
