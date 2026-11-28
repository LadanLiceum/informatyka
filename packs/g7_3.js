/* ===== 7 клас · уроки 14–15 · «Склад-скриньки» (змінні) і «Гармата-калькулятор» (вирази, input, print) ===== */
(function(){
var A=window.A7,O=A.O,DEFS=A.DEFS,esc=A.esc,heroS=A.heroS,cloud=A.cloud,spark=A.spark,bub=A.bub,bar=A.bar;
/* ---------- мінімальний «Python»: числа int/float, + - * / // %, дужки ---------- */
function mk(v,f){return{v:v,f:!!f}}
function val(s){s=String(s);return mk(parseFloat(s),s.indexOf(".")>=0)}
function fmt(x){if(x.f)return Number.isInteger(x.v)?x.v.toFixed(1):""+parseFloat(x.v.toPrecision(12));return ""+x.v}
function ev(src,env){var t=src.match(/\d+\.\d+|\d+|[A-Za-z_][A-Za-z_0-9]*|\/\/|[-+*\/%()]|\S/g)||[],p=0;
 function er(m){throw{syn:1,msg:m}}
 function peek(){return t[p]}
 function ex(){var a=tm();while(peek()=="+"||peek()=="-"){var o=t[p++],b=tm();a=mk(o=="+"?a.v+b.v:a.v-b.v,a.f||b.f)}return a}
 function tm(){var a=un();while(["*","/","//","%"].indexOf(peek())>=0){var o=t[p++],b=un();if((o!="*")&&b.v==0)throw{zd:1,msg:"ZeroDivisionError: ділення на нуль"};
  if(o=="*")a=mk(a.v*b.v,a.f||b.f);else if(o=="/")a=mk(a.v/b.v,true);else if(o=="//")a=mk(Math.floor(a.v/b.v),a.f||b.f);else a=mk(a.v-b.v*Math.floor(a.v/b.v),a.f||b.f)}return a}
 function un(){if(peek()=="-"){p++;var a=un();return mk(-a.v,a.f)}return at()}
 function at(){var s=t[p++];if(s===undefined)er("вираз обірвався");if(s=="("){var a=ex();if(t[p++]!=")")er("не вистачає закривної дужки");return a}
  if(/^\d/.test(s))return val(s);if(/^[A-Za-z_]/.test(s)){if(!(s in env))throw{nm:1,msg:"NameError: змінної "+s+" немає"};return env[s]}er("зайвий знак «"+s+"»")}
 var r=ex();if(p<t.length)er("зайвий знак «"+t[p]+"»");return r}
window.E7={ev:ev,val:val,fmt:fmt};
var HEART="❤️";
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function hero(x,y,g,s){return "<g transform='translate("+x+","+y+") scale("+s+")'>"+heroS().replace(/url\(#hO\)/g,"url(#"+g+")")+"</g>"}
var botS=window.A7.botS;function slime(x,y,g,s,sad){return botS(x,y,g,s,sad?"sad":"ok")}
function slimeOld(x,y,g,s,sad){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#sh)'><ellipse cx='0' cy='15' rx='17' ry='4' fill='#0004'/><path d='M-18 13 Q-20 -16 0 -16 Q20 -16 18 13 Q9 17 0 15 Q-9 17 -18 13Z' fill='url(#"+g+")' stroke='"+O+"' stroke-width='3'/><ellipse cx='-7' cy='-8' rx='6' ry='3' fill='#fff' opacity='.5'/><circle cx='-6' cy='-1' r='4' fill='#fff'/><circle cx='6' cy='-1' r='4' fill='#fff'/><circle cx='-5' cy='0' r='2' fill='"+O+"'/><circle cx='7' cy='0' r='2' fill='"+O+"'/>"+(sad?"<path d='M-5 9 Q0 5 5 9' stroke='"+O+"' stroke-width='2' fill='none'/>":"<path d='M-5 7 Q0 10 5 7' stroke='"+O+"' stroke-width='2' fill='none'/>")+"</g>"}
function burst(x,y,s){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#gl)'><circle r='20' fill='url(#glowY)'/><path d='M0 -22 L5 -8 L20 -12 L10 0 L22 10 L6 8 L0 22 L-6 8 L-22 10 L-10 0 L-20 -12 L-5 -8Z' fill='#ff9d1f' stroke='#fff' stroke-width='2'/><path d='M0 -13 L3 -5 L12 -7 L6 0 L13 6 L4 5 L0 13 L-4 5 L-13 6 L-6 0 L-12 -7 L-3 -5Z' fill='#fff35c'/></g>"}
function ground(g,y){var s="<rect y='"+y+"' width='360' height='"+(200-y)+"' fill='url(#"+g+")'/><path d='M0 "+y+" Q30 "+(y-6)+" 60 "+y+" T120 "+y+" T180 "+y+" T240 "+y+" T300 "+y+" T360 "+y+"' stroke='#fff' stroke-opacity='.5' stroke-width='2' fill='none'/>";for(var x=20;x<360;x+=48)s+="<path d='M"+x+" "+(y+10)+" l-3 -8 M"+x+" "+(y+10)+" l3 -9' stroke='#fff' stroke-opacity='.35' stroke-width='2'/>";return s}
function pill(x,y,w,t,col){return "<g filter='url(#sh)'><rect x='"+x+"' y='"+y+"' width='"+w+"' height='26' rx='9' fill='#0d1117' stroke='"+O+"' stroke-width='2.5'/><text x='"+(x+w/2)+"' y='"+(y+18)+"' text-anchor='middle' font-size='12.5' fill='"+(col||"#7ee787")+"' font-family='monospace' font-weight='700'>"+esc(t)+"</text></g>"}
function crateS(x,y,t,v,hi,col){return "<g transform='translate("+x+","+y+")'>"+(hi?"<circle cx='32' cy='27' r='44' fill='url(#glowY)' filter='url(#bl)'/>":"")+"<g filter='url(#sh)'><rect width='64' height='54' rx='8' fill='url(#wood)' stroke='"+O+"' stroke-width='3'/><path d='M0 18 H64 M0 36 H64' stroke='"+O+"' stroke-opacity='.35' stroke-width='2'/><rect x='8' y='9' width='48' height='36' rx='7' fill='#fff' stroke='"+O+"' stroke-width='2.5'/><text x='32' y='25' text-anchor='middle' font-size='11' font-weight='900' fill='"+O+"' font-family='monospace'>"+esc(t)+"</text><text x='32' y='40' text-anchor='middle' font-size='"+(String(v).length>4?12:15)+"' font-weight='900' fill='"+(col||"#d81b84")+"' font-family='monospace'>"+esc(v)+"</text></g></g>"}
function coin(x,y,o){return "<g transform='translate("+x+","+y+")' opacity='"+o+"'><circle r='9' fill='url(#gold)' stroke='"+O+"' stroke-width='2.5'/><circle r='5' fill='none' stroke='#fff' stroke-opacity='.6' stroke-width='1.5'/></g>"}
function ftext(x,y,t,c,s,o){return "<text x='"+x+"' y='"+y+"' text-anchor='middle' font-size='"+(s||16)+"' font-weight='900' fill='#fff' stroke='"+c+"' stroke-width='4' paint-order='stroke' opacity='"+(o==null?1:o)+"'>"+esc(t)+"</text>"}
function tween(ms,alive,fn){return new Promise(function(res){var t0=performance.now();(function f(t){var p=Math.min(1,Math.max(0,(t-t0)/ms));if(!alive()){res();return}fn(p);if(p<1)requestAnimationFrame(f);else res()})(t0)})}
function arc(a,b,h,p){var cx=(a[0]+b[0])/2,cy=Math.min(a[1],b[1])-h,q=1-p;return[q*q*a[0]+2*q*p*cx+p*p*b[0],q*q*a[1]+2*q*p*cy+p*p*b[1]]}
function shot(x,y){return "<circle cx='"+x+"' cy='"+y+"' r='9' fill='url(#glowY)'/><circle cx='"+x+"' cy='"+y+"' r='5' fill='#ffe94a' stroke='"+O+"' stroke-width='2'/>"}
function dust(x,y,p){var s="";[[-10,0],[0,-6],[10,0],[-4,4],[6,4]].forEach(function(d,i){s+="<circle cx='"+(x+d[0]*(1+p*1.2))+"' cy='"+(y+d[1]-p*10)+"' r='"+(6+p*5)+"' fill='#e6e9f2' stroke='#8a96b4' stroke-width='1.5' opacity='"+(1-p)+"'/>"});return s}
function scn(id,bg,extra){return "<div class='e7s'><svg id='"+id+"' viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'>"+DEFS+bg+extra+"</svg></div>"}
/* ================= УРОК 14 · Склад-скриньки ================= */
GM.crates=function(g){var R=g.rounds,i=0,sc=0,n=R.length,lives=3;
 function hud(){gs9((i+1)+" / "+n+" · "+new Array(lives+1).join("❤")+(lives?"":"–")+" · ✅ "+sc)}
 function show(){var rd=R[i],busy=false,over=false,prog=[],killed=0,vals={},heroG="hO";
  var names=rd.vars.map(function(v){return v[0]});
  function reset(){vals={};rd.vars.forEach(function(v){vals[v[0]]=val(v[1])});killed=0;heroG="hO"}reset();
  function alive(){var e=document.getElementById("crS");return e&&e===svg}
  var goalTxt=Object.keys(rd.goal).map(function(k){return "<span id='crg_"+k+"' class='e7gc'>"+k+" = "+rd.goal[k]+"</span>"}).join("");
  fr9(g.title,g.hint||"",
   "<div class='e7q'>"+rd.q+"</div><div class='e7g'>🎯 Мета: "+goalTxt+"</div>"+
   scn("crS","<g id='crB'></g>","<g id='crH'></g><g id='crK'></g><g id='crM'></g><g id='crQ'></g><g id='crF'></g><g id='crL'></g>")+
   "<div class='e7t' id='crT'></div><div class='e7code' id='crP'></div><div class='e7pal' id='crA'></div><div class='e7bt'><div class='e7b go' id='crR' role='button' tabindex='0'>▶ Запустити</div><div class='e7b' id='crC' role='button' tabindex='0'>↺ Очистити</div></div><div class='e7m' id='crX' style='display:none'></div>");
  var svg=document.getElementById("crS"),gB=document.getElementById("crB"),gH=document.getElementById("crH"),gK=document.getElementById("crK"),gM=document.getElementById("crM"),gQ=document.getElementById("crQ"),gF=document.getElementById("crF"),gL=document.getElementById("crL"),tbl=document.getElementById("crT"),pg=document.getElementById("crP"),pa=document.getElementById("crA"),bx=document.getElementById("crX");
  var nv=names.length,cw=nv>3?58:64,gap=nv>3?4:8,x0=96+8;
  function cx(k){return x0+k*(cw+gap+(nv>3?0:0))}
  gB.innerHTML="<rect width='360' height='200' fill='url(#sky)'/>"+cloud(60,28,.8,.9)+"<circle cx='320' cy='30' r='34' fill='url(#sun)'/>"+ground("grass",150)+"<rect x='96' y='122' width='"+(nv*(cw+gap)+16)+"' height='9' rx='4' fill='url(#wood)' stroke='"+O+"' stroke-width='3'/>";
  function drawH(dx,hurt){gH.innerHTML="<g transform='translate("+(dx||0)+",0)'>"+hero(46,138,heroG,1.1)+(hurt?"<circle cx='46' cy='138' r='22' fill='#ff2d55' opacity='.28'/>":"")+"</g>"}
  function drawK(hi){gK.innerHTML=names.map(function(nm,k){return crateS(cx(k),68,nm,fmt(vals[nm]),hi===nm)}).join("")}
  function slX(j){return 318-44*j}
  function drawM(){var s="";for(var j=0;j<rd.foes;j++)if(j>=killed)s+=slime(slX(j-killed),148,"sR",.95);gM.innerHTML=s;
   gL.innerHTML=(rd.foes?bar(204,12,126,1-killed/rd.foes,"bar"):"")+(rd.say?bub(14,10,Math.max(110,rd.say.length*6.6+22),26,rd.say,"#fff8cc",O,false):"")}
  function drawT(ch){tbl.innerHTML=names.map(function(nm){var c=ch===nm;return "<div class='"+(c?"hi":"")+"'><small>"+nm+" · "+(vals[nm].f?"float":"int")+"</small><b>"+fmt(vals[nm])+"</b></div>"}).join("")}
  function drawP(now,done){pg.innerHTML=prog.length?prog.map(function(c,k){return "<div class='"+(now===k?"now":(done>k?"ok":""))+"' data-k='"+k+"'>"+(k+1)+" <i>"+esc(c)+"</i>"+(done>k?" <em>✓</em>":(now===k?" <em>▶</em>":(busy?"":" <em class='x'>✕</em>")))+"</div>"}).join(""):"<div class='gh'>Торкай команди нижче…</div>";
   pg.querySelectorAll("[data-k]").forEach(function(d){d.onclick=function(){if(busy||over)return;prog.splice(+d.getAttribute("data-k"),1);drawP();lim()}})}
  function lim(){pa.querySelectorAll(".e7c").forEach(function(c){c.classList.toggle("dis",prog.length>=rd.max)})}
  function msg(t,k){bx.style.display="";bx.className="e7m "+(k||"");bx.innerHTML=t}
  rd.pal.forEach(function(c){var d=document.createElement("div");d.className="e7c";d.setAttribute("role","button");d.setAttribute("tabindex","0");d.textContent=c;d.onclick=function(){if(busy||over||prog.length>=rd.max)return;prog.push(c);drawP();lim();bx.style.display="none"};pa.appendChild(d)});
  function full(){drawH(0,false);drawK();drawM();drawT();gQ.innerHTML="";gF.innerHTML=""}
  full();drawP();
  document.getElementById("crC").onclick=function(){if(busy||over)return;prog=[];drawP();lim();bx.style.display="none"};
  document.getElementById("crR").onclick=async function(){if(busy||over)return;if(!prog.length){msg("Додай хоча б одну команду.","");return}
   busy=true;reset();full();bx.style.display="none";
   var rb=document.getElementById("crR");rb.classList.add("dis");
   for(var k=0;k<prog.length&&alive();k++){var cmd=prog[k],m=cmd.split("="),nm=m[0].trim(),old=vals[nm];drawP(k,k);
    gL.innerHTML=gL.innerHTML.replace(/<g filter='url\(#sh\)'><rect x='98'[\s\S]*$/,"");drawM();gL.innerHTML+=pill(98,168,164,cmd);
    var nw=ev(m.slice(1).join("="),vals);vals[nm]=nw;var up=nw.v>old.v,dn=nw.v<old.v,fx=(rd.fx||{})[nm];
    gQ.innerHTML="<g filter='url(#sh)'><rect x='"+(cx(names.indexOf(nm))+2)+"' y='40' width='60' height='22' rx='8' fill='#fff' stroke='"+O+"' stroke-width='2.5'/><text x='"+(cx(names.indexOf(nm))+32)+"' y='56' text-anchor='middle' font-size='13' font-weight='900' fill='"+(dn?"#d81b84":"#2fb52a")+"' font-family='monospace'>"+esc(fmt(old))+" → "+esc(fmt(nw))+"</text></g>";
    if(fx=="shot"&&dn&&killed<rd.foes){var tx=slX(0),pa0=[70,120],pb=[tx-6,140];
     await tween(520,alive,function(p){var q=arc(pa0,pb,34,p);gF.innerHTML=shot(q[0],q[1])});
     await tween(380,alive,function(p){gF.innerHTML=burst(tx,130,.6+p*.6)+spark(tx+22,112,.6);gM.style.opacity=1-p*.6});
     killed++;gM.style.opacity=1;gF.innerHTML="";drawM()}
    else if(fx=="coin"&&up){var cxm=slX(0)+(rd.foes>killed?0:-40);await tween(560,alive,function(p){gF.innerHTML=coin(cxm,128-p*46,1-p*.4)+ftext(cxm+24,126-p*46,"+"+fmt(mk(nw.v-old.v,nw.f)),"#b07800",15,1-p*.5)})}
    else if(fx=="hurt"&&dn){await tween(520,alive,function(p){drawH(Math.sin(p*30)*4*(1-p),true);gF.innerHTML=ftext(46,104-p*26,"-"+fmt(mk(old.v-nw.v,nw.f)),"#e01f48",16,1-p*.4)});drawH(0,false)}
    else await sleep(380);
    gF.innerHTML="";drawK(nm);drawT(nm);
    msg("🔎 Змінна <b>"+nm+"</b> була <b>"+fmt(old)+"</b>, стала <b>"+fmt(nw)+"</b>. Нове значення стерло старе.","blue");
    await sleep(520)}
   if(!alive())return;
   gQ.innerHTML="";var bad=[],okc=0;Object.keys(rd.goal).forEach(function(kk){var ok=fmt(vals[kk])==rd.goal[kk],e=document.getElementById("crg_"+kk);if(ok)okc++;else bad.push(kk);if(e){e.classList.add(ok?"ok":"no");e.textContent=kk+" = "+rd.goal[kk]+(ok?" ✓":" ✗ (є "+fmt(vals[kk])+")")}});
   drawP(-1,prog.length);busy=false;rb.classList.remove("dis");
   if(!bad.length){over=true;sc++;heroG="hY";drawH(0,false);gF.innerHTML=spark(130,50,.9)+spark(322,70,.8,"#fff")+spark(210,26,.7);hud();
    msg("🎉 <b>Скриньки збігаються з метою!</b> "+rd.why,"green");nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})}
   else{lives--;hud();var b0=bad[0];msg("😕 Не збігається: у скриньці <b>"+b0+"</b> має бути <b>"+rd.goal[b0]+"</b>, а там <b>"+fmt(vals[b0])+"</b>."+(lives?" Виправ програму й запусти ще раз: торкни рядок, щоб прибрати його.":" Життя скінчились."),"red");
    if(!lives){over=true;nxt9("Результат",function(){fin9(sc,n)})}
    else Object.keys(rd.goal).forEach(function(kk){var e=document.getElementById("crg_"+kk);if(e)setTimeout(function(){if(e.classList.contains("no")||e.classList.contains("ok")){e.classList.remove("ok","no");e.textContent=kk+" = "+rd.goal[kk]}},2600)})}
  };
  hud()}
 show()};
/* ================= УРОК 15 · Гармата-калькулятор ================= */
GM.cannon=function(g){var R=g.rounds,i=0,sc=0,n=R.length,lives=3;
 function hud(){gs9((i+1)+" / "+n+" · "+new Array(lives+1).join("❤")+(lives?"":"–")+" · ✅ "+sc)}
 function show(){var rd=R[i],busy=false,over=false,toks=[],gi=0,conv=!!rd.conv,xv=rd.conv?null:val(rd.x[1]),env={},done=[];
  var vn=rd.x[0],cnt={};rd.pal.forEach(function(p){cnt[p[0]]=p[1]==null?99:p[1]});
  function G(){return rd.goals[gi]}
  fr9(g.title,g.hint||"",
   "<div class='e7q'>"+rd.q+"</div><div class='e7g' id='cng'></div>"+
   scn("cnS","<g id='cnB'></g>","<g id='cnH'></g><g id='cnE'></g><g id='cnF'></g><g id='cnL'></g>")+
   "<div class='e7code cn' id='cnP'></div><div class='e7pal' id='cnA'></div><div class='e7bt'><div class='e7b go' id='cnR' role='button' tabindex='0'>🔥 Вогонь!</div><div class='e7b' id='cnD' role='button' tabindex='0'>⌫ Стерти</div></div><div class='e7m' id='cnX' style='display:none'></div>");
  var svg=document.getElementById("cnS"),gB=document.getElementById("cnB"),gH=document.getElementById("cnH"),gE=document.getElementById("cnE"),gF=document.getElementById("cnF"),gL=document.getElementById("cnL"),pg=document.getElementById("cnP"),pa=document.getElementById("cnA"),bx=document.getElementById("cnX"),gg=document.getElementById("cng");
  function alive(){var e=document.getElementById("cnS");return e&&e===svg}
  function msg(t,k){bx.style.display="";bx.className="e7m "+(k||"");bx.innerHTML=t}
  gB.innerHTML="<defs><linearGradient id='cnSk' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#2a1470'/><stop offset='.6' stop-color='#d8548f'/><stop offset='1' stop-color='#ffb36b'/></linearGradient><linearGradient id='cnBr' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#e8eeff'/><stop offset='.5' stop-color='#9aa8d8'/><stop offset='1' stop-color='#4a5588'/></linearGradient></defs><rect width='360' height='200' fill='url(#cnSk)'/><circle cx='296' cy='62' r='26' fill='#fff2b0' opacity='.9'/><path d='M0 120L50 84L96 112L150 70L210 116L270 88L330 118L360 100V150H0Z' fill='#1f1060' opacity='.9'/><rect y='150' width='360' height='50' fill='#2b2f55'/><rect y='150' width='360' height='5' fill='#ff4d6d'/><g fill='#ffffff' opacity='.12'><rect x='20' y='170' width='60' height='4' rx='2'/><rect x='140' y='180' width='80' height='4' rx='2'/><rect x='260' y='168' width='60' height='4' rx='2'/></g>";
  var CAN="<g stroke='#150a33' stroke-width='3.5' stroke-linejoin='round'><ellipse cx='64' cy='152' rx='46' ry='7' fill='#0006' stroke='none'/><rect x='24' y='132' width='80' height='18' rx='6' fill='#4a5588'/><rect x='30' y='136' width='68' height='4' rx='2' fill='#7a86bd' stroke='none'/><g transform='rotate(-20 62 126)'><rect x='36' y='108' width='92' height='30' rx='13' fill='url(#cnBr)'/><rect x='116' y='104' width='16' height='38' rx='6' fill='#ffd23f'/><rect x='46' y='114' width='56' height='5' rx='2.5' fill='#fff' opacity='.55' stroke='none'/></g><circle cx='62' cy='132' r='20' fill='#ff6a3d'/><circle cx='62' cy='132' r='8' fill='#150a33'/><circle cx='62' cy='132' r='3' fill='#ffd23f' stroke='none'/></g>";
  var heroG="hO",hit=0,slX=300,slS=1.4,sad=false,live=1;
  function drawH(rec){gH.innerHTML=CAN+hero(26,150,heroG,.62)}
  function drawE(){var nd=G()?G().need:"";gE.innerHTML=live?"<g transform='translate("+slX+",138) scale("+slS+")'><ellipse cx='0' cy='14' rx='20' ry='4.5' fill='#0006'/><g stroke='#150a33' stroke-width='3' stroke-linejoin='round'><rect x='-12' y='-18' width='26' height='28' rx='9' fill='#7a5cff'/><rect x='-8' y='-14' width='18' height='9' rx='4' fill='#150a33'/>"+(sad?"<path d='M-5 -13l5 5m0 -5l-5 5M3 -13l5 5m0 -5l-5 5' stroke='#ff8a99' stroke-width='2' fill='none'/>":"<circle cx='-3' cy='-9' r='2.4' fill='#ff4d6d' stroke='none'/><circle cx='6' cy='-9' r='2.4' fill='#ff4d6d' stroke='none'/>")+"<rect x='-4' y='-26' width='2' height='8' fill='#150a33'/><circle cx='-3' cy='-28' r='3' fill='#ffd23f'/><rect x='-20' y='-2' width='5' height='14' rx='2' fill='#9aa8d8'/><rect x='-9' y='10' width='6' height='6' rx='2' fill='#150a33'/><rect x='4' y='10' width='6' height='6' rx='2' fill='#150a33'/><path d='M-34 -22H-14V-2Q-14 8 -24 12Q-34 8 -34 -2Z' fill='#37f2ff'/><path d='M-34 -22H-14V-8H-34Z' fill='#9ff7ff' stroke='none'/><text x='-24' y='0' text-anchor='middle' font-family='monospace' font-weight='900' font-size='"+(nd.length>3?9:12)+"' fill='#150a33' stroke='none'>"+esc(nd)+"</text></g></g>":""}
  function top(){var t=(G()?"Потрібна сила: "+G().need:"Усе влучило!"),r2=rd.say||(vn+" = "+(xv?fmt(xv):"?")),w1=Math.max(120,t.length*7.4+24),w2=Math.max(80,r2.length*8+22);gL.innerHTML="<g filter='url(#sh)'><rect x='10' y='10' width='"+w1+"' height='26' rx='9' fill='#150a33dd' stroke='#fff' stroke-width='2'/><text x='"+(10+w1/2)+"' y='28' text-anchor='middle' font-family='sans-serif' font-weight='800' font-size='12.5' fill='#ffd23f'>"+esc(t)+"</text><rect x='"+(350-w2)+"' y='10' width='"+w2+"' height='26' rx='9' fill='#150a33dd' stroke='#37f2ff' stroke-width='2'/><text x='"+(350-w2/2)+"' y='28' text-anchor='middle' font-family='monospace' font-weight='900' font-size='14' fill='#37f2ff'>"+esc(r2)+"</text></g>"+pill(30,166,300,codeLine(true),"#7ee787")}
  function codeLine(){var o=G()?G().out:rd.goals[rd.goals.length-1].out;return o+" = "+(toks.join(" ")||"…")}
  function goals(){gg.innerHTML="🎯 "+rd.goals.map(function(q,k){return "<span class='e7gc"+(k<gi?" ok":"")+"'>"+(k<gi?"✓ ":"")+q.out+" = "+q.need+"</span>"}).join("")}
  function drawP(res){var gl=G();
   var l=[];if(conv)l.push("<div class='gh'>"+vn+" = ???  <span class='cm'># ворог називає "+rd.conv.say+"</span></div>");
   else l.push("<div>"+vn+" = "+(xv.f?"float":"int")+"(input())  <span class='cm'># "+vn+" = "+fmt(xv)+"</span></div>");
   if(!conv){l.push("<div class='cur'><i>"+(gl?gl.out:rd.goals[rd.goals.length-1].out)+" = "+esc(toks.join(" "))+"</i><b class='cr'></b></div>");
    l.push("<div class='dm'>print("+(gl?gl.out:rd.goals[rd.goals.length-1].out)+")"+(res!=null?"  <span class='out'>→ "+esc(res)+"</span>":"")+"</div>")}
   pg.innerHTML=l.join("")}
  function palette(){pa.innerHTML="";
   if(conv){var h=document.createElement("div");h.className="e7ask";h.textContent=rd.conv.ask;pa.appendChild(h);
    rd.conv.opts.forEach(function(o,k){var d=document.createElement("div");d.className="e7c wide";d.setAttribute("role","button");d.setAttribute("tabindex","0");d.textContent=vn+" = "+o;d.onclick=function(){if(busy||over)return;pick(k)};pa.appendChild(d)});return}
   rd.pal.forEach(function(p){var d=document.createElement("div");d.className="e7c"+(p[1]!=null?" lim":"");d.setAttribute("role","button");d.setAttribute("tabindex","0");d.setAttribute("data-t",p[0]);d.innerHTML=esc(p[0])+(p[1]!=null?"<sup>×"+p[1]+"</sup>":"");d.onclick=function(){if(busy||over||toks.length>=rd.max||cnt[p[0]]<=0)return;toks.push(p[0]);cnt[p[0]]--;refresh();bx.style.display="none"};pa.appendChild(d)});refresh()}
  function refresh(){pa.querySelectorAll(".e7c[data-t]").forEach(function(d){d.classList.toggle("dis",cnt[d.getAttribute("data-t")]<=0||toks.length>=rd.max)});drawP();top()}
  function pick(k){if(k==rd.conv.ok){conv=false;xv=val(rd.x[1]);heroG="hO";msg("✅ Правильно: <b>"+rd.conv.opts[k]+"</b>. "+rd.conv.good,"green");goals();palette();drawH();top()}
   else{lives--;hud();msg("💥 "+rd.conv.bad[k>rd.conv.ok?k-1:k]+(lives?" Спробуй інший спосіб.":" Життя скінчились."),"red");if(!lives){over=true;nxt9("Результат",function(){fin9(sc,n)})}}}
  document.getElementById("cnD").onclick=function(){if(busy||over||conv||!toks.length)return;var t=toks.pop();cnt[t]++;refresh();bx.style.display="none"};
  document.getElementById("cnR").onclick=async function(){if(busy||over||conv)return;var gl=G(),res;env={};env[vn]=xv;
   try{if(!toks.length)throw{syn:1,msg:"формула порожня"};res=ev(toks.join(" "),env)}catch(e){if(e.zd||e.syn||e.nm){msg("⚠️ <b>"+(e.zd?"":"SyntaxError: ")+esc(e.msg)+"</b>. Гармата не вистрілила – виправ формулу.","red");return}throw e}
   busy=true;var rs=fmt(res),ok=rs==gl.need,pw=res.v,nd=val(gl.need).v;document.getElementById("cnR").classList.add("dis");
   var a=[124,96],lx=ok?slX-14:(pw>nd?420:slX-14-Math.max(40,Math.min(130,Math.abs(nd-pw)/Math.max(1,Math.abs(nd))*150))),b=[lx,ok?118:150],ht=ok?60:(pw>nd?80:40);
   await tween(780,alive,function(p){var q=arc(a,b,ht,p);gF.innerHTML="<path d='M"+a[0]+" "+a[1]+" Q"+((a[0]+b[0])/2)+" "+(Math.min(a[1],b[1])-ht*2)+" "+b[0]+" "+b[1]+"' stroke='#ffe94a' stroke-width='4' stroke-dasharray='1 9' stroke-linecap='round' fill='none' opacity='.7'/>"+shot(q[0],q[1])});
   if(!alive())return;
   if(ok){sad=true;await tween(520,alive,function(p){gF.innerHTML=burst(slX-14,118,.7+p*.7)+spark(slX-40,96,.6)+ftext(slX-6,100-p*26,"-"+rs,"#e01f48",18,1-p*.3);slS=1.4-p*.12;drawE()});slS=1.4;
    done.push(rs);gi++;
    if(gi<rd.goals.length){sad=false;gF.innerHTML="";toks=[];rd.pal.forEach(function(p){cnt[p[0]]=p[1]==null?99:p[1]});drawE();goals();msg("🎯 <b>Влучно!</b> "+vn+" ... "+gl.out+" = "+rs+". Тепер наступна ціль.","green");palette();busy=false;document.getElementById("cnR").classList.remove("dis");return}
    drawP(rs);goals();heroG="hY";live=0;drawE();drawH();top();gF.innerHTML=spark(150,60,.9)+spark(320,70,.8,"#fff")+spark(200,30,.7);sc++;hud();over=true;
    msg("🎉 <b>Влучно!</b> "+(rd.why||""),"green");nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})}
   else{await tween(520,alive,function(p){gF.innerHTML=dust(lx,152,p)+(pw>nd?"":"")});gF.innerHTML=ftext(Math.min(lx,330),132,rs,"#2b2f55",16,1);
    lives--;hud();drawP(rs);busy=false;document.getElementById("cnR").classList.remove("dis");
    msg("😕 Формула дала <b>"+rs+"</b>"+(pw>nd?" – перелет!":" – недолет!")+" Потрібно <b>"+gl.need+"</b>."+(rd.miss&&rd.miss(toks.join(" "))?" "+rd.miss(toks.join(" ")):"")+(lives?" Виправ формулу й стріляй ще раз.":" Життя скінчились."),"red");
    if(!lives){over=true;nxt9("Результат",function(){fin9(sc,n)})}}
  };
  goals();drawH();drawE();palette();top();hud();if(conv)drawP()}
 show()};
/* ---------- стилі (префікс e7, не залежать від body.g5.g7) ---------- */
var st=document.createElement("style");st.textContent="body .e7s{margin:8px 0}body .e7s svg{display:block;width:100%;border:4px solid "+O+";border-radius:20px;box-shadow:0 5px 0 "+O+"}"+
"body .e7q{color:#fff;text-align:center;font-weight:800;margin:8px 4px 4px;line-height:1.3}body .e7g{margin:6px 0;text-align:center;font-weight:800;font-size:13px;color:#fff}"+
"body .e7gc{display:inline-block;margin:2px 3px;padding:3px 9px;border-radius:10px;background:#fff;color:"+O+";border:3px solid "+O+";font:800 12px ui-monospace,Consolas,monospace}body .e7gc.ok{background:#e4ffe0;border-color:#2fb52a;color:#1b7a22}body .e7gc.no{background:#ffe3e8;border-color:#e0314f;color:#c0183a}"+
"body .e7t{display:flex;gap:8px;margin:8px 0}body .e7t div{flex:1;min-width:0;text-align:center;border:3px solid "+O+";border-radius:12px;padding:4px;background:#fff;color:"+O+"}body .e7t small{display:block;font:700 11px ui-monospace,Consolas,monospace}body .e7t b{font-size:18px;font-family:ui-monospace,Consolas,monospace}body .e7t .hi{background:#e4ffe0;border-color:#2fb52a}"+
"body .e7code{margin:8px 0;background:#0d1117;border-radius:12px;padding:8px 10px;color:#8b949e;font:13px/1.7 ui-monospace,Consolas,monospace;box-shadow:inset 0 0 0 2px "+O+";min-height:52px;text-align:left}body .e7code i{color:#e6edf3;font-style:normal}body .e7code .ok{color:#7ee787}body .e7code .now{background:#1f3a5f;margin:0 -10px;padding:0 10px;border-left:4px solid #58a6ff}body .e7code em{font-style:normal;float:right}body .e7code em.x{color:#8b949e}body .e7code .gh{opacity:.65}body .e7code>div[data-k]{cursor:pointer}"+
"body .e7code .cm{color:#6e7681}body .e7code .dm{color:#8b949e}body .e7code .out{color:#7ee787;font-weight:800}body .e7code .cur i{color:#ffe94a}body .e7code .cr{display:inline-block;width:8px;height:15px;background:#ffe94a;vertical-align:-2px;margin-left:2px;animation:e7bl 1s steps(2) infinite}@keyframes e7bl{50%{opacity:0}}"+
"body .e7pal{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0;justify-content:center}body .e7c{background:#fff;color:"+O+";border:3px solid "+O+";border-radius:12px;padding:8px 11px;font:800 14px ui-monospace,Consolas,monospace;box-shadow:0 3px 0 "+O+";cursor:pointer;user-select:none;-webkit-user-select:none;min-width:40px;text-align:center}body .e7c.wide{flex:1 1 100%;text-align:left}body .e7c sup{font-size:9px;color:#6a6f99;margin-left:2px}body .e7c:active{transform:translateY(3px);box-shadow:none}body .e7c.dis{opacity:.35;pointer-events:none}body .e7ask{flex:1 1 100%;text-align:center;color:#fff;font-weight:800;line-height:1.3}"+
"body .e7bt{display:flex;gap:8px;margin:8px 0}body .e7b{flex:1;text-align:center;padding:11px 6px;border-radius:14px;background:#fff;border:3px solid "+O+";box-shadow:0 4px 0 "+O+";color:"+O+";font-size:15px;font-weight:900;cursor:pointer;user-select:none;-webkit-user-select:none}body .e7b.go{background:linear-gradient(#8dff5a,#1fb524);color:#fff;text-shadow:0 2px 0 #0003}body .e7b.dis{opacity:.5;pointer-events:none}body .e7b:active{transform:translateY(3px);box-shadow:none}"+
"body .e7m{margin:8px 0;padding:9px 11px;border-radius:12px;border:3px solid "+O+";font-size:13px;line-height:1.35;color:"+O+";background:#fff;font-weight:700}body .e7m.red{background:#ffe3e8;border-color:#e0314f}body .e7m.green{background:#e4ffe0;border-color:#2fb52a}body .e7m.blue{background:#e3f1ff;border-color:#2d7be0}body .e7m b{color:inherit}";
document.head.appendChild(st);
if(typeof GI7!="undefined"){GI7.crates=["📦","Склад-скриньки"];GI7.cannon=["💥","Гармата-калькулятор"]}
/* ---------- дані ---------- */
if(typeof LES!="undefined"&&LES[714])LES[714].g.push({type:"crates",title:"Склад-скриньки: змінні",hint:"Скриньки hp, ammo, coins – це змінні. Склади програму з команд присвоювання, запусти її й дивись, як змінюються значення. Торкни рядок програми, щоб прибрати його.",rounds:[
 {q:"Відбий хвилю: 3 слайми, 3 постріли. Кожен постріл витрачає 1 патрон, а за слайма дають 3 монети.",say:"Хвиля: 3 слайми!",vars:[["hp","100"],["ammo","3"],["coins","0"]],pal:["hp = hp - 10","ammo = ammo - 1","coins = coins + 3","ammo = 3"],goal:{hp:"100",ammo:"0",coins:"9"},max:6,foes:3,fx:{ammo:"shot",coins:"coin",hp:"hurt"},why:"Витрачено 3 патрони, зібрано 9 монет – значення змінних змінюються командами."},
 {q:"Поміняй місцями вміст скриньок a і b. Скринька c – порожня запасна. Нове значення стирає старе, тому спершу щось треба зберегти.",say:"Обмін скриньок",vars:[["a","5"],["b","8"],["c","0"]],pal:["c = a","a = b","b = c","b = a","c = b"],goal:{a:"8",b:"5",c:"5"},max:4,foes:0,why:"Спершу c = a зберегло старе значення, тому воно не пропало."},
 {q:"Крамар продає зілля: ціна 2.5 (дробове, float), потрібно 4 штуки. Порахуй суму й заплати.",say:"Крамниця зілля",vars:[["coins","20"],["price","2.5"],["total","0"]],pal:["total = price * 4","total = price + 4","coins = coins - total","coins = coins - price","coins = coins + total"],goal:{total:"10.0",coins:"10.0"},max:3,foes:0,fx:{coins:"coin"},why:"Дробове число робить результат float: 10.0. Порядок команд важливий: спершу сума, потім оплата."},
 {q:"Остання хвиля: 2 слайми. Ти витрачаєш патрони, слайми «кусають» (hp), а монети збираєш. Витрать 2 патрони з 4, прийми 2 «укуси» (hp −10) і збери рівно 11 монет.",say:"Остання хвиля!",vars:[["hp","100"],["ammo","4"],["coins","5"]],pal:["ammo = ammo - 1","ammo = ammo - 2","hp = hp - 10","coins = coins + 3","coins = coins * 2"],goal:{hp:"80",ammo:"2",coins:"11"},max:6,foes:2,fx:{ammo:"shot",coins:"coin",hp:"hurt"},why:"Кілька змінних змінюються незалежно. Змінюється лише та, що стоїть ліворуч від знака =."}
]});
if(typeof LES!="undefined"&&LES[715])LES[715].g.push({type:"cannon",title:"Гармата-калькулятор: вирази",hint:"Ворог називає число x. Збери формулу сили пострілу з готових частин: гармата вистрілить лише з точною силою. Знаки: * – множення, // – ціла частка, % – остача.",rounds:[
 {q:"Щит ворога витримає лише постріл силою 19. Збери формулу з x, щоб вийшло рівно 19.",x:["x","7"],pal:[["x"],["2"],["3"],["5"],["+"],["-"],["*"]],goals:[{out:"power",need:"19"}],max:5,why:"Наприклад, x * 2 + 5 = 7 · 2 + 5 = 19: множення виконується раніше за додавання."},
 {q:"Тепер кожен знак можна взяти лише один раз. Потрібна сила 22. Порядок дій тут вирішує все: x + 7 * 2 дало б зовсім інше.",x:["x","4"],pal:[["x",1],["7",1],["2",1],["+",1],["*",1],["(",1],[")",1]],goals:[{out:"power",need:"22"}],max:7,miss:function(f){return /\(/.test(f)?"":"Підказка: множення виконується раніше за додавання, а дужки змінюють порядок дій."},why:"(x + 7) * 2 = 22: дужки змусили спершу виконати додавання."},
 {q:"На скарб претендують 5 слаймів, у скарбі loot монет. Спершу влуч у число монет, що дістанеться кожному (цілих), потім у залишок.",x:["loot","47"],pal:[["loot"],["5"],["//"],["%"],["/"],["*"],["-"]],goals:[{out:"share",need:"9"},{out:"rest",need:"2"}],max:3,miss:function(f){return /\//.test(f)&&!/\/\//.test(f)?"Операція / дає дробове число, а потрібна ціла частка – це //.":""},why:"47 // 5 = 9 – ціла частка, 47 % 5 = 2 – остача."},
 {q:"Ворог вводить дробове число. Прочитай його правильно й вистрілі силою, що дорівнює половині x (потрібно 1.75).",x:["x","3.5"],conv:{say:"3.5",ask:"Як прочитати число 3.5 з клавіатури?",opts:["int(input())","float(input())","input()"],ok:1,good:"float() перетворює введений текст на дробове число.",bad:["ValueError: int() не вміє перетворити «3.5» – програма впала.","input() повертає текст, а не число: з ним не порахуєш."]},pal:[["x"],["2"],["/"],["//"],["%"],["*"]],goals:[{out:"power",need:"1.75"}],max:3,miss:function(f){return /\/\//.test(f)?"Операція // відкидає дробову частину.":""},why:"x / 2 = 1.75: звичайне ділення завжди дає дробове число (float)."}
]});
})();
window.addEventListener("unhandledrejection",function(e){var m=(e.reason&&e.reason.message)||"";if(/null/.test(m)&&!document.getElementById("crS")&&!document.getElementById("cnS"))e.preventDefault()});

/* ===== 7 клас · урок 14 · «Гонка з пітстопом» (змінні) — замінює «Склад-скриньки» ===== */
(function(){
var E=window.E7;if(!E||typeof GM=="undefined"||typeof LES=="undefined"||!LES[714])return;
var N="#150a33",val=E.val,fmt=E.fmt,ev=E.ev;
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function tween(ms,alive,fn){return new Promise(function(res){var t0=performance.now();(function f(t){var p=Math.min(1,Math.max(0,(t-t0)/ms));if(!alive()){res();return}fn(p);if(p<1)requestAnimationFrame(f);else res()})(t0)})}
function car(x,y,sc,col,boost,smoke){return "<g transform='translate("+x+","+y+") scale("+sc+")'><ellipse cx='28' cy='30' rx='34' ry='6' fill='#0007'/>"+(boost?"<path d='M-6 6Q-34 0 -30 14Q-12 12 -4 12Z' fill='#ffd23f' stroke='"+N+"' stroke-width='2'/><path d='M-6 8Q-24 8 -22 12Q-12 12 -6 12Z' fill='#ff8a2a'/>":"")+(smoke?"<circle cx='4' cy='-4' r='7' fill='#cfd6e8' opacity='.8'/><circle cx='-6' cy='-14' r='9' fill='#aab3cc' opacity='.6'/>":"")+"<g stroke='"+N+"' stroke-width='3' stroke-linejoin='round'><path d='M0 10Q2 0 16 -2L30 -14Q36 -18 46 -14L58 -2Q70 0 70 12V20H0Z' fill='"+col+"'/><path d='M30 -12L44 -12L54 -2H24Z' fill='#bfefff'/><rect x='-2' y='4' width='6' height='6' rx='2' fill='#ffd23f'/><circle cx='16' cy='22' r='9' fill='#2b2f55'/><circle cx='56' cy='22' r='9' fill='#2b2f55'/><circle cx='16' cy='22' r='3.5' fill='#c9d4ff' stroke='none'/><circle cx='56' cy='22' r='3.5' fill='#c9d4ff' stroke='none'/></g><path d='M6 8H64' stroke='#fff' stroke-width='3' opacity='.55'/></g>"}
var BG="<defs><linearGradient id='rcS' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#3a1d8f'/><stop offset='.55' stop-color='#ff6f91'/><stop offset='1' stop-color='#ffc46b'/></linearGradient></defs><rect width='360' height='210' fill='url(#rcS)'/><circle cx='280' cy='84' r='34' fill='#fff2b0' opacity='.9'/><path d='M0 110L40 70L80 104L130 56L190 108L250 74L310 110L360 90V120H0Z' fill='#2a1a6e' opacity='.85'/><path d='M0 120L60 98L120 118L200 92L280 118L360 100V130H0Z' fill='#1b0f4a'/><rect y='128' width='360' height='82' fill='#2b2f55'/><rect y='128' width='360' height='6' fill='#ff4d6d'/><rect y='134' width='360' height='4' fill='#fff'/>";
function dashes(off){var s="<g fill='#fff' opacity='.85'>";for(var x=-70;x<400;x+=60)s+="<rect x='"+(x+off%60)+"' y='164' width='34' height='4' rx='2'/>";return s+"</g>"}
function edge(){var s="<rect y='200' width='360' height='10' fill='#ff4d6d'/><g fill='#fff'>";for(var x=0;x<360;x+=30)s+="<rect x='"+x+"' y='200' width='15' height='10'/>";return s+"</g>"}
function ftxt(x,y,t,c,sz,o){return "<text x='"+x+"' y='"+y+"' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='"+(sz||22)+"' fill='"+c+"' stroke='"+N+"' stroke-width='5' paint-order='stroke' opacity='"+(o==null?1:o)+"'>"+esc(t)+"</text>"}
function GOK(vals,g){var m=g.match(/^(\w+)\s*(>=|<=|==|>|<)\s*(-?[\d.]+)$/),a=vals[m[1]].v,b=parseFloat(m[3]);return m[2]==">="?a>=b:m[2]=="<="?a<=b:m[2]=="=="?a==b:m[2]==">"?a>b:a<b}
function gtxt(g){return g.replace(/>=/g,"≥").replace(/<=/g,"≤").replace(/==/g,"=")}
var _race9=GM.race;GM.race=function(g){if(!g.rounds&&_race9)return _race9(g);var R=g.rounds,i=0,sc=0,n=R.length,lives=3;
 function hud(){gs9((i+1)+" / "+n+" · "+new Array(lives+1).join("❤")+(lives?"":"–")+" · ✅ "+sc)}
 function show(){var rd=R[i],busy=false,over=false,prog=[],vals={},names=rd.vars.map(function(v){return v[0]});
  function reset(){vals={};rd.vars.forEach(function(v){vals[v[0]]=val(v[1])})}reset();
  var fm=rd.fmax||100;
  function alive(){var e=document.getElementById("rcS");return e&&e===svg}
  fr9(g.title,g.hint||"","<div class='e7q'>"+rd.q+"</div><div class='rcg' id='rcG'></div><div class='rcs'><svg id='rcS' viewBox='0 0 360 210' xmlns='http://www.w3.org/2000/svg'></svg></div><div class='rch' id='rcH'></div><div class='rcb'><i id='rcB'></i></div><div class='rcl' id='rcL'></div><div class='e7code' id='rcP'></div><div class='e7pal' id='rcA'></div><div class='e7bt'><div class='e7b go' id='rcR' role='button' tabindex='0'>▶ Запустити</div><div class='e7b' id='rcC' role='button' tabindex='0'>↺ Очистити</div></div><div class='e7m' id='rcX' style='display:none'></div>");
  var svg=document.getElementById("rcS"),pg=document.getElementById("rcP"),pa=document.getElementById("rcA"),bx=document.getElementById("rcX");
  function draw(o){o=o||{};var cx=o.cx==null?52:o.cx,s=BG+dashes(o.off||0)+edge()+car(215,138,.78,"#3a9bff",false)+car(cx,146,1,"#ff3d5a",!!o.boost,!!o.smoke);
   if(o.pit)s+="<g transform='translate(14,90)'><rect width='64' height='30' rx='6' fill='#ffd23f' stroke='"+N+"' stroke-width='3'/><text x='32' y='21' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='"+N+"'>ПІТ</text></g><text x='20' y='160' font-size='24'>🔧</text><text x='98' y='160' font-size='22'>⛽</text>";
   if(o.t)s+=ftxt(o.tx||150,o.ty==null?118:o.ty,o.t,o.tc||"#ffd23f",o.ts,o.to);
   if(o.flag)s+="<g transform='translate(180,52)'><rect x='-82' y='-24' width='164' height='46' rx='12' fill='#150a33ee' stroke='#ffd23f' stroke-width='3'/><text y='6' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='20' fill='#ffd23f'>"+esc(o.flag)+"</text></g>";
   svg.innerHTML=s}
  function drawH(ch,d){var h="";names.forEach(function(nm){var c=ch===nm,dl=(d&&d[nm])||"";h+="<div class='rcp"+(c?" hi":"")+"'><span>"+nm+" · "+(vals[nm].f?"float":"int")+"</span><b>"+fmt(vals[nm])+"</b>"+(dl?"<em class='"+(dl.charAt(0)=="−"?"r":"")+"'>"+dl+"</em>":"")+"</div>"});document.getElementById("rcH").innerHTML=h;
   var f=vals.fuel?Math.max(0,Math.min(100,vals.fuel.v/fm*100)):0,b=document.getElementById("rcB");b.style.width=f+"%";b.className=f<25?"low":""}
  function goals(done){var h="🎯 ";rd.goals.forEach(function(gl,k){var st=done?(GOK(vals,gl)?"ok":"no"):"";h+="<span class='"+st+"'>"+gtxt(gl)+(st=="ok"?" ✔":st=="no"?" ✖":"")+"</span>"});document.getElementById("rcG").innerHTML=h}
  function drawP(now,dn){pg.innerHTML=prog.length?prog.map(function(c,k){return "<div class='"+(now===k?"now":(dn>k?"ok":""))+"' data-k='"+k+"'>"+(k+1)+" <i>"+esc(c)+"</i>"+(dn>k?" <em>✓</em>":(now===k?" <em>▶</em>":(busy?"":" <em class='x'>✕</em>")))+"</div>"}).join(""):"<div class='gh'>Торкай команди нижче…</div>";
   pg.querySelectorAll("[data-k]").forEach(function(d){d.onclick=function(){if(busy||over)return;prog.splice(+d.getAttribute("data-k"),1);drawP();lim()}})}
  function lim(){pa.querySelectorAll(".e7c").forEach(function(c){c.classList.toggle("dis",prog.length>=rd.max)})}
  function msg(t,k){bx.style.display="";bx.className="e7m "+(k||"");bx.innerHTML=t}
  function log(t){document.getElementById("rcL").innerHTML=t}
  rd.pal.forEach(function(c){var d=document.createElement("div");d.className="e7c";d.setAttribute("role","button");d.setAttribute("tabindex","0");d.textContent=c;d.onclick=function(){if(busy||over||prog.length>=rd.max)return;prog.push(c);drawP();lim();bx.style.display="none"};pa.appendChild(d)});
  draw();drawH();goals();log("Склади програму з команд і запусти її");drawP();
  document.getElementById("rcC").onclick=function(){if(busy||over)return;prog=[];drawP();lim();bx.style.display="none"};
  document.getElementById("rcR").onclick=async function(){if(busy||over)return;if(!prog.length){msg("Додай хоча б одну команду.","");return}
   busy=true;reset();draw();drawH();goals();bx.style.display="none";var rb=document.getElementById("rcR");rb.classList.add("dis");var crash=null,off=0;
   for(var k=0;k<prog.length&&alive();k++){var cmd=prog[k],m=cmd.split("="),nm=m[0].trim(),old=vals[nm];drawP(k,k);
    var nw=ev(m.slice(1).join("="),vals);vals[nm]=nw;var dv=nw.v-old.v,sg=dv>0?"+":"−",ds=dv?sg+fmt({v:Math.abs(dv),f:nw.f}):"";
    log(esc(cmd)+" &nbsp; <s>"+fmt(old)+"</s> → <b>"+fmt(nw)+"</b>");
    if(nm=="fuel"&&nw.v<0){crash=1;drawH(nm,{fuel:ds});await tween(700,alive,function(p){draw({cx:52+p*30,smoke:1,t:"0 ⛽ !",tc:"#ff8a99",tx:90,ty:118-p*10,off:off+=3})});await sleep(250);break}
    if(nm=="fuel"&&dv>0){drawH(nm,{fuel:ds});await tween(720,alive,function(p){draw({pit:1,cx:52,t:ds+" ⛽",tc:"#7ee787",tx:100,ty:118-p*14,to:1-p*.3})})}
    else if(nm=="fuel"){drawH(nm,{fuel:ds});await tween(620,alive,function(p){draw({cx:52+p*18,boost:1,off:off+=6,t:ds+" ⛽",tc:"#ff8a99",tx:100,ty:118-p*14,to:1-p*.3})})}
    else if(nm=="speed"&&dv>0){drawH(nm,{speed:ds});await tween(700,alive,function(p){draw({cx:52+Math.sin(p*3.14)*46,boost:1,off:off+=14,t:ds,tc:"#ffd23f",tx:150,ty:118-p*14,to:1-p*.3})})}
    else if(nm=="speed"){drawH(nm,{speed:ds});await tween(620,alive,function(p){draw({cx:52,off:off+=3,t:ds,tc:"#ff8a99",tx:150,ty:118-p*14,to:1-p*.3})})}
    else if(nm=="lap"&&dv>0){drawH(nm,{lap:ds});await tween(900,alive,function(p){draw({cx:52+p*220*(p<1?1:0),boost:1,off:off+=18,flag:p>.5?"КОЛО "+fmt(nw)+"!":null})});draw({flag:"КОЛО "+fmt(nw)+"!"});await sleep(250)}
    else{drawH(nm,{[nm]:ds});await tween(560,alive,function(p){draw({cx:52,off:off+=4,t:(ds||"="),tc:"#ffd23f",tx:150,ty:118-p*14,to:1-p*.3})})}
    draw();drawH(nm);msg("🔎 Змінна <b>"+nm+"</b> була <b>"+fmt(old)+"</b>, стала <b>"+fmt(nw)+"</b>. Нове значення стерло старе.","blue");await sleep(420)}
   if(!alive())return;
   goals(true);drawP(-1,prog.length);busy=false;rb.classList.remove("dis");
   var bad=rd.goals.filter(function(gl){return !GOK(vals,gl)});
   if(!crash&&!bad.length){over=true;sc++;draw({flag:"🏁 ФІНІШ!"});hud();msg("🎉 <b>Усі цілі виконано!</b> "+rd.why,"green");nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})}
   else{lives--;hud();var t=crash?"⛽ Пальне закінчилось (fuel став від’ємним) — авто зупинилось. Додай пітстоп: fuel = 100.":"😕 Ціль не виконана: <b>"+gtxt(bad[0])+"</b>, а зараз "+bad[0].match(/^\w+/)[0]+" = "+fmt(vals[bad[0].match(/^\w+/)[0]])+".";
    msg(t+(lives?" Виправ програму й запусти ще раз: торкни рядок, щоб прибрати його.":" Життя скінчились."),"red");
    if(!lives){over=true;nxt9("Результат",function(){fin9(sc,n)})}}
  };
  hud()}
 show()};
var st=document.createElement("style");st.textContent="body .rcs{margin:8px 0}body .rcs svg{display:block;width:100%;border:4px solid "+N+";border-radius:20px;box-shadow:0 5px 0 "+N+"}body .rch{display:flex;gap:6px;margin:8px 0 5px}body .rcp{flex:1;background:"+N+";border:2px solid #fff;border-radius:10px;padding:3px 7px;font:800 11px ui-monospace,Consolas,monospace;position:relative;color:#fff}body .rcp b{display:block;font:900 20px ui-monospace,Consolas,monospace;color:#ffd23f}body .rcp.hi{box-shadow:0 0 0 3px #37f2ff}body .rcp em{position:absolute;right:6px;top:3px;font-style:normal;font-size:12px;color:#7ee787}body .rcp em.r{color:#ff8a99}body .rcb{height:14px;border-radius:8px;background:"+N+";overflow:hidden;margin-bottom:6px}body .rcb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#37f2ff,#3a7bff);transition:width .5s}body .rcb i.low{background:linear-gradient(90deg,#ff4d6d,#ff8a2a)}body .rcl{background:#0b0f1a;border-radius:8px;padding:6px 9px;font:800 12px ui-monospace,Consolas,monospace;color:#7ee787;min-height:30px}body .rcl s{color:#ff8a99}body .rcg{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;font:800 12px ui-monospace,Consolas,monospace;color:#fff}body .rcg span{background:#ffffff18;border:2px dashed #ffffff66;border-radius:8px;padding:1px 8px}body .rcg span.ok{background:#2d9b4a66;border:2px solid #5be37a}body .rcg span.no{background:#e0314f55;border:2px solid #ff8a99}";document.head.appendChild(st);
if(typeof GI7!="undefined")GI7.race=["🏎️","Гонка з пітстопом"];
LES[714].g=LES[714].g.filter(function(x){return x.type!="crates"});
LES[714].g.push({type:"race",title:"Гонка з пітстопом: змінні",hint:"fuel, speed, lap – це змінні гонки. Склади програму з команд, запусти її й дивись, як значення змінюються. Нове значення стирає старе. Торкни рядок програми, щоб прибрати його.",rounds:[
 {q:"Фініш: 3-тє коло, швидкість 140 і рівно 60 пального. Вистачить усього кількох команд.",vars:[["fuel","80"],["speed","120"],["lap","1"]],pal:["speed = speed + 10","fuel = fuel - 20","lap = lap + 1","fuel = 100","speed = speed * 2"],goals:["speed==140","lap==3","fuel==60"],max:5,why:"Дві команди speed + 10 дали 140, дві lap + 1 – третє коло, одна fuel - 20 – рівно 60."},
 {q:"Пального лише 30, а кожне коло забирає 20. Якщо fuel стане меншим за 0 – авто зупиниться. Встигни на 3-тє коло зі швидкістю 140.",vars:[["fuel","30"],["speed","100"],["lap","1"]],pal:["fuel = fuel - 20","lap = lap + 1","fuel = 100","speed = speed + 20","speed = speed - 20"],goals:["lap==3","speed==140","fuel>=1"],max:8,why:"Між колами потрібен пітстоп fuel = 100: порядок команд вирішує, чи вистачить пального."},
 {q:"Турбо-режим: швидкість подвоюється, а пальне ділиться на 4 (дробове число – float). Підготуй авто до фінішного ривка.",vars:[["fuel","100"],["speed","60"],["lap","2"]],pal:["speed = speed * 2","fuel = fuel / 4","speed = speed / 2","fuel = fuel * 4","lap = lap + 1"],goals:["speed==120","fuel==25","lap==3"],max:4,why:"Ділення / завжди дає float: fuel став 25.0. Множення int на int лишає int."},
 {q:"Фінал! Призові: coins = coins + speed додає поточну швидкість. Отримай рівно 230 монет, швидкість 130, 3-тє коло й 35 пального.",vars:[["fuel","50"],["speed","100"],["lap","1"],["coins","0"]],pal:["speed = speed + 15","fuel = fuel - 15","lap = lap + 1","coins = coins + speed","fuel = fuel + 40"],goals:["coins==230","speed==130","lap==3","fuel==35"],max:8,why:"coins + speed спрацював двічі: спершу зі швидкістю 100, потім 130. Значення, яке береться з виразу, – те, що в змінної зараз."}
]});
})();

/* ===== 7 клас · уроки 16–18: «Автотурель» (if/else), «Лабораторія слаймів» (гіпотези, експерименти), «Нагородний конвеєр» (elif) ===== */
(function(){
var A=window.A7,O=A.O,DEFS=A.DEFS,esc=A.esc,heroS=A.heroS,cloud=A.cloud,spark=A.spark,bar=A.bar,bub=A.bub;
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function hearts(n){return n>0?new Array(n+1).join("❤️"):"💔"}
function $i(id){return document.getElementById(id)}
/* ---------- міні-інтерпретатор Python: if / elif / else, and / or / not, print() ---------- */
function val(t,env){t=t.trim();if(/^-?\d+(\.\d+)?$/.test(t))return +t;var m=t.match(/^(['"])(.*)\1$/);if(m)return m[2];if(/^[A-Za-z_]\w*$/.test(t)){if(t in env)return env[t];throw{err:"NameError: змінної «"+t+"» немає"}}throw{err:"SyntaxError: незрозумілий запис «"+t+"»"}}
function atom(s,env){s=s.trim();var neg=false;if(/^not\s+/.test(s)){neg=true;s=s.replace(/^not\s+/,"")}
 var m=s.match(/^(.+?)\s*(==|!=|<=|>=|<|>|=)\s*(.+)$/);if(!m)throw{err:"SyntaxError: в умові немає порівняння"};
 if(m[2]=="=")throw{err:"SyntaxError: у цій умові «=» – присвоєння. Для порівняння потрібно «==»"};
 var a=val(m[1],env),b=val(m[3],env),r;switch(m[2]){case"==":r=a===b;break;case"!=":r=a!==b;break;case"<":r=a<b;break;case">":r=a>b;break;case"<=":r=a<=b;break;default:r=a>=b}
 return neg?!r:r}
function cond(s,env){return s.split(/\s+or\s+/).map(function(o){return o.split(/\s+and\s+/).map(function(a){return atom(a,env)}).every(Boolean)}).some(Boolean)}
function body(b){var t=b.trim(),m=t.match(/^print\((['"])(.*)\1\)$/);return m?m[2]:t}
function runProg(L,env){var outs=[],steps=[],inCh=false,done=false,i=0,n=L.length,m,t,b;
 try{while(i<n){var l=L[i];
  if(/^else\s+if\b/.test(l))throw{err:"Python: замість «else if» пишуть одне слово elif",ln:i};
  m=l.match(/^(if|elif)\s+(.*)$/);
  if(m){var c=m[2];if(!/:\s*$/.test(c))throw{err:"SyntaxError: після умови потрібна двокрапка «:»",ln:i};c=c.replace(/\s*:\s*$/,"");
   if(m[1]=="elif"&&!inCh)throw{err:"SyntaxError: elif без if",ln:i};
   if(m[1]=="if"){inCh=true;done=false}
   b=L[i+1];if(b===undefined||!/^ {4}\S/.test(b))throw{err:"IndentationError: після двокрапки потрібен відступ",ln:i+1};
   try{t=cond(c,env)}catch(e){e.ln=i;throw e}
   if(!done)steps.push(i);
   if(!done&&t){outs.push(body(b));steps.push(i+1);done=true}
   i+=2;continue}
  if(/^else\b/.test(l)){if(!/^else\s*:\s*$/.test(l))throw{err:"SyntaxError: після else потрібна двокрапка «:»",ln:i};if(!inCh)throw{err:"SyntaxError: else без if",ln:i};
   b=L[i+1];if(b===undefined||!/^ {4}\S/.test(b))throw{err:"IndentationError: після двокрапки потрібен відступ",ln:i+1};
   if(!done){steps.push(i);outs.push(body(b));steps.push(i+1);done=true}inCh=false;i+=2;continue}
  if(/^[A-Za-z_]\w*\s*=\s*\S/.test(l)&&!/^\s/.test(l)){i++;continue}
  if(/^\s+\S/.test(l))throw{err:"IndentationError: зайвий відступ",ln:i};
  throw{err:"SyntaxError: незрозумілий рядок «"+l.trim()+"»",ln:i}}
 }catch(e){if(e&&e.err)return{err:e.err,ln:e.ln==null?0:e.ln,steps:steps};throw e}
 return{out:outs,steps:steps}}
/* ---------- спільні SVG ---------- */
var botS=window.A7.botS;function slime(x,y,g,s,m,ex){return botS(x,y,g,s,m)}
function slimeOld(x,y,g,s,m,ex){var mo=m=="sad"?"<path d='M-5 9 Q0 5 5 9' stroke='"+O+"' stroke-width='2' fill='none' stroke-linecap='round'/>":m=="zz"?"<path d='M-4 8 H4' stroke='"+O+"' stroke-width='2.2' stroke-linecap='round'/>":"<path d='M-5 7 Q0 10 5 7' stroke='"+O+"' stroke-width='2' fill='none' stroke-linecap='round'/>";
 var eyes=m=="zz"?"<path d='M-9 0 Q-6 3 -3 0 M3 0 Q6 3 9 0' stroke='"+O+"' stroke-width='2.2' fill='none' stroke-linecap='round'/>":"<circle cx='-6' cy='-1' r='4' fill='#fff'/><circle cx='6' cy='-1' r='4' fill='#fff'/><circle cx='-5' cy='0' r='2' fill='"+O+"'/><circle cx='7' cy='0' r='2' fill='"+O+"'/>";
 return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#sh)'><ellipse cx='0' cy='15' rx='17' ry='4' fill='#0004'/><path d='M-18 13 Q-20 -16 0 -16 Q20 -16 18 13 Q9 17 0 15 Q-9 17 -18 13Z' fill='url(#"+g+")' stroke='"+O+"' stroke-width='3'/><ellipse cx='-7' cy='-8' rx='6' ry='3' fill='#fff' opacity='.5'/>"+eyes+mo+(ex||"")+"</g>"}
function burst(x,y,s){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#gl)'><circle r='20' fill='url(#glowY)'/><path d='M0 -22 L5 -8 L20 -12 L10 0 L22 10 L6 8 L0 22 L-6 8 L-22 10 L-10 0 L-20 -12 L-5 -8Z' fill='#ff9d1f' stroke='#fff' stroke-width='1.5'/></g>"}
function ground(y,g){var s="<rect y='"+y+"' width='360' height='"+(200-y)+"' fill='url(#"+(g||"grass")+")'/><path d='M0 "+y+" Q30 "+(y-6)+" 60 "+y+" T120 "+y+" T180 "+y+" T240 "+y+" T300 "+y+" T360 "+y+"' stroke='#fff' stroke-opacity='.5' stroke-width='2' fill='none'/>";for(var x=20;x<360;x+=44)s+="<path d='M"+x+" "+(y+12)+" l-3 -8 M"+x+" "+(y+12)+" l3 -8' stroke='#2a8f2a' stroke-width='2' stroke-linecap='round' opacity='.5'/>";return s}
function stars(n,seed){var s="",k=seed||3;for(var i=0;i<n;i++){k=(k*9301+49297)%233280;var a=k/233280;k=(k*9301+49297)%233280;var b=k/233280;s+="<circle cx='"+Math.round(8+a*344)+"' cy='"+Math.round(6+b*104)+"' r='"+(1+(i%3)*.5)+"' fill='#fff' opacity='"+(.5+(i%3)*.25)+"'/>"}return s}
function pill(x,y,w,t,col){return "<g filter='url(#sh)'><rect x='"+x+"' y='"+y+"' width='"+w+"' height='26' rx='9' fill='#0d1117' stroke='"+O+"' stroke-width='2.5'/><text x='"+(x+w/2)+"' y='"+(y+18)+"' text-anchor='middle' font-size='12.5' fill='"+(col||"#7ee787")+"' font-family='monospace' font-weight='700'>"+esc(t)+"</text></g>"}
function otx(x,y,t,sz,fill,anch){return "<text x='"+x+"' y='"+y+"' text-anchor='"+(anch||"middle")+"' font-size='"+(sz||11)+"' font-weight='900' fill='"+(fill||"#fff")+"' stroke='"+O+"' stroke-width='3' paint-order='stroke' stroke-linejoin='round'>"+esc(t)+"</text>"}
/* ---------- компонент «код зі слотами» ---------- */
function SC(o){var s={sel:{},act:null,hl:[],bad:-1,lock:false,keys:Object.keys(o.slots),cb:o.onchange};s.act=s.keys[0];
 s.lines=function(){return o.tpl.map(function(l){return l.replace(/\{(\w+)\}/g,function(_,k){var v=s.sel[k];return v==null?"…":o.slots[k][v]})})};
 s.full=function(){return s.keys.every(function(k){return s.sel[k]!=null})};
 s.draw=function(){o.code.innerHTML=o.tpl.map(function(l,ln){var h=l.split(/(\{\w+\})/).map(function(p){var m=p.match(/^\{(\w+)\}$/);if(!m)return esc(p);var k=m[1],v=s.sel[k];return "<u class='sl"+(s.act==k&&!s.lock?" on":"")+(v==null?" em":"")+"' data-k='"+k+"'>"+(v==null?"&nbsp;…&nbsp;":esc(o.slots[k][v]))+"</u>"}).join("");
  return "<div class='"+(s.hl.indexOf(ln)>=0?"now":"")+(s.bad==ln?" er":"")+"'><s>"+(ln+1)+"</s>"+h+"</div>"}).join("");
  var k=s.act;o.tray.innerHTML=(k!=null&&!s.lock)?o.slots[k].map(function(t,v){return "<button class='f7b"+(s.sel[k]===v?" on":"")+"' data-k='"+k+"' data-v='"+v+"'>"+esc(t)+"</button>"}).join(""):""};
 o.code.onclick=function(e){var u=e.target.closest&&e.target.closest(".sl");if(!u||s.lock)return;s.act=u.getAttribute("data-k");s.draw()};
 o.tray.onclick=function(e){var b=e.target.closest&&e.target.closest(".f7b");if(!b||s.lock)return;var k=b.getAttribute("data-k");s.sel[k]=+b.getAttribute("data-v");s.bad=-1;s.hl=[];var nx=s.keys.filter(function(q){return s.sel[q]==null})[0];s.act=nx!=null?nx:k;s.draw();if(s.cb)s.cb()};
 s.solve=function(chk){var res=[],ks=s.keys;function rec(i,cur){if(i==ks.length){var sv=JSON.stringify(cur);var L=o.tpl.map(function(l){return l.replace(/\{(\w+)\}/g,function(_,k){return o.slots[k][cur[k]]})});if(chk(L))res.push(JSON.parse(sv));return}for(var v=0;v<o.slots[ks[i]].length;v++){cur[ks[i]]=v;rec(i+1,cur)}}rec(0,{});return res};
 return s}
/* ---------- УРОК 16 · Автотурель ---------- */
function turretS(){return "<g stroke='#150a33' stroke-width='3.5' stroke-linejoin='round'><ellipse cx='40' cy='156' rx='34' ry='6' fill='#0006' stroke='none'/><path d='M12 154L20 104H60L68 154Z' fill='#4a5588'/><path d='M20 104H60L58 114H22Z' fill='#7a86bd' stroke='none'/><g transform='rotate(14 44 88)'><rect x='42' y='80' width='64' height='16' rx='7' fill='#c9d4ff'/><rect x='98' y='77' width='12' height='22' rx='4' fill='#ffd23f'/></g><circle cx='40' cy='92' r='20' fill='#ff6a3d'/><circle cx='40' cy='92' r='9' fill='#150a33'/><circle cx='40' cy='92' r='3.5' fill='#37f2ff' stroke='none'/></g>"}
function botT(x,y,fr,sc,m){var c=fr?"#3fd36a":"#7a5cff",e=fr?"#fff":"#ff4d6d";return "<g transform='translate("+x+","+y+") scale("+sc+")'><ellipse cx='0' cy='16' rx='16' ry='4' fill='#0006'/><g stroke='#150a33' stroke-width='3' stroke-linejoin='round'><rect x='-12' y='-18' width='24' height='28' rx='9' fill='"+c+"'/><rect x='-9' y='-14' width='18' height='9' rx='4' fill='#150a33'/>"+(m=="sad"?"<path d='M-6 -13l5 5m0 -5l-5 5M2 -13l5 5m0 -5l-5 5' stroke='#ff8a99' stroke-width='2' fill='none'/>":"<circle cx='-3.5' cy='-9' r='2.3' fill='"+e+"' stroke='none'/><circle cx='3.5' cy='-9' r='2.3' fill='"+e+"' stroke='none'/>")+"<rect x='-1' y='-26' width='2' height='8' fill='#150a33'/><circle cx='0' cy='-28' r='3' fill='"+(fr?"#37f2ff":"#ffd23f")+"'/><rect x='-8' y='10' width='6' height='6' rx='2' fill='#150a33'/><rect x='2' y='10' width='6' height='6' rx='2' fill='#150a33'/></g></g>"}
GM.turret=function(g){var R=g.rounds,i=0,sc=0,n=R.length;
 function show(){var rd=R[i],lives=3,busy=false,fin=false,hp=1;
  function hd(){gs9((i+1)+" / "+n+" · "+hearts(lives)+" · ✅ "+sc)}
  fr9(g.title,g.hint||"Склади програму для турелі: умова вирішує, стріляти чи чекати. Обери фрагменти коду й запусти.","<div class='f7s'><svg id='tus' viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'>"+DEFS+"<g id='tub'></g><g id='tue'></g><g id='tux'></g></svg></div><div class='f7q'>"+rd.task+"</div><div class='f7c' id='tuc'></div><div class='f7t' id='tut'></div><div id='tum'></div><div id='tur'></div>");
  var svg=$i("tus"),tb=$i("tub"),te=$i("tue"),tx=$i("tux"),tm=$i("tum"),tr=$i("tur");
  function pos(e,k){return rd.tag=="dist"?60+e.env.dist*30:112+k*52}
  function tagT(e){return rd.tag=="dist"?"d="+e.env.dist:rd.tag=="hp"?"hp="+e.env.hp:e.env.kind=="friend"?"друг":"ворог"}
  function bg(){var s="<defs><linearGradient id='tuSk' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#2a1470'/><stop offset='.6' stop-color='#d8548f'/><stop offset='1' stop-color='#ffb36b'/></linearGradient></defs><rect width='360' height='200' fill='url(#tuSk)'/><circle cx='300' cy='56' r='24' fill='#fff2b0' opacity='.9'/><path d='M0 120L50 84L96 112L150 70L210 116L270 88L330 118L360 100V152H0Z' fill='#1f1060' opacity='.9'/><rect y='152' width='360' height='48' fill='#2b2f55'/><rect y='152' width='360' height='5' fill='#ff4d6d'/>"+turretS();
   if(rd.tag=="dist"){for(var d=0;d<=9;d++)s+="<path d='M"+(60+d*30)+" 158 v6' stroke='#fff' stroke-width='2'/><text x='"+(60+d*30)+"' y='176' text-anchor='middle' font-size='9' font-weight='800' fill='#fff' stroke='"+O+"' stroke-width='2' paint-order='stroke'>"+d+"</text>"}
   tb.innerHTML=s}
  function ents(st,cur){var s="";rd.foes.forEach(function(e,k){if(st[k]=="gone")return;var x=pos(e,k),fr=e.env.kind=="friend"?"hG":"sV",ty=k==cur?100:104,tw=tagT(e).length*6.5+10;
   s+=(k==cur?"<ellipse cx='"+x+"' cy='153' rx='22' ry='6' fill='none' stroke='#ffe94a' stroke-width='3' stroke-dasharray='5 4'/>":"")+botT(x,136,e.env.kind=="friend",1.05,st[k]=="bite"?"sad":"ok")+"<g filter='url(#sh)'><rect x='"+(x-tw/2)+"' y='"+ty+"' width='"+tw+"' height='16' rx='6' fill='"+(k==cur?"#ffe94a":"#fff")+"' stroke='"+O+"' stroke-width='2'/><text x='"+x+"' y='"+(ty+12)+"' text-anchor='middle' font-size='10' font-weight='800' fill='"+O+"' font-family='monospace'>"+tagT(e)+"</text></g>"});
   te.innerHTML=s}
  function top(msg){tx.innerHTML=bar(232,12,114,Math.max(0,hp),hp>.4?"bar":"barR")+(msg||"")}
  function sl(ms){return sleep(ms).then(function(){if(!document.body.contains(svg))throw 0})}
  var st0=rd.foes.map(function(){return"on"});bg();ents(st0,-1);top();
  var sc_=SC({tpl:rd.tpl,slots:rd.slots,code:$i("tuc"),tray:$i("tut"),onchange:upd});
  function upd(){tr.innerHTML=!fin&&!busy&&sc_.full()?"<div class='f7go' id='tugo'>▶ ЗАПУСТИТИ</div>":"";var b=$i("tugo");if(b)b.onclick=run}
  function chk(L){return rd.foes.every(function(e){var r=runProg(L,e.env);return !r.err&&(r.out[0]||null)==e.want})}
  function msg(t,k){tm.innerHTML="<div class='f7m "+k+"'>"+t+"</div>"}
  sc_.draw();upd();hd();
  async function run(){if(busy||fin)return;busy=true;sc_.lock=true;sc_.bad=-1;sc_.draw();upd();tm.innerHTML="";var L=sc_.lines(),st=st0.slice(),bad=[],err=null,reveal=lives<=0;hp=1;bg();ents(st,-1);top();
   try{
   for(var k=0;k<rd.foes.length;k++){var e=rd.foes[k],r=runProg(L,e.env);
    if(r.err){err=r;sc_.bad=r.ln;sc_.hl=[];sc_.draw();top(otx(180,86,"Помилка в коді!",13,"#ff9aa8"));ents(st,-1);break}
    ents(st,k);top(otx(Math.min(300,Math.max(90,pos(e,k))),86,tagT(e).replace("d=","dist = ").replace("hp=","hp = ")+" →",11));
    for(var q=0;q<r.steps.length;q++){sc_.hl=[r.steps[q]];sc_.draw();await sl(300)}
    var got=r.out[0]||null,x=pos(e,k),ok=got==e.want;
    top(otx(Math.min(300,Math.max(90,x)),86,tagT(e).replace("d=","dist = ").replace("hp=","hp = ")+" → "+(got?got.replace("()",""):"нічого"),11));
    if(got=="fire()"){tx.innerHTML+="<path d='M98 80 L"+x+" 130' stroke='#ff7a1f' stroke-width='5' stroke-dasharray='1 10' stroke-linecap='round' filter='url(#gl)'/>"+burst(x,128,.8);await sl(380);st[k]="gone";if(!ok){bad.push([e,"fire"]);hp-=.34}}
    else{if(!ok){st[k]="bite";bad.push([e,"miss"]);hp-=.34;tx.innerHTML+=otx(60,50,"💢 прорвався!",12,"#ff9aa8")}else tx.innerHTML+=otx(60,50,got?"чекаю":"спокійно",11);await sl(380)}
    ents(st,-1);top();await sl(120)}
   sc_.hl=[];sc_.draw();
   }catch(x){if(x===0)return;throw x}
   busy=false;
   if(err){lives--;msg("⛔ "+esc(err.err)+(lives>0?"<br>Виправ вибір і запусти ще раз.":""),"red");return afterFail()}
   if(!bad.length){fin=true;if(!reveal)sc++;hd();tx.innerHTML+=spark(300,90,.8);msg((reveal?"👀 Ось правильна програма. ":"🎉 Усе влучно! ")+"<br><b>"+rd.why+"</b>","green");upd();return nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})}
   lives--;msg("❌ "+bad.map(function(b){return b[1]=="miss"?"ціль «"+tagT(b[0])+"»: треба було "+(b[0].want?b[0].want.replace("()",""):"нічого")+", а програма пропустила":"ціль «"+tagT(b[0])+"»: стріляти було зайве"}).join("; ")+"."+(lives>0?"<br>Подумай, яка умова це виправить.":""),"red");afterFail()}
  function afterFail(){hd();if(lives<=0){sc_.sel=sc_.solve(chk)[0];sc_.bad=-1;sc_.lock=true;sc_.draw();tm.firstChild.innerHTML+="<br>Життя закінчились. Дивись, як правильно:";setTimeout(run,1000);return}sc_.lock=false;sc_.draw();upd()}
 }
 show()};
/* ---------- УРОК 17 · Лабораторія слаймів ---------- */
function look(kd,x,y){var s;
 if(kd=="melt")s="<g filter='url(#sh)'><ellipse cx='"+x+"' cy='"+(y+14)+"' rx='36' ry='9' fill='url(#sR)' stroke='"+O+"' stroke-width='3'/><ellipse cx='"+(x-10)+"' cy='"+(y+11)+"' rx='9' ry='2.5' fill='#fff' opacity='.5'/><circle cx='"+(x+2)+"' cy='"+(y+13)+"' r='2.4' fill='"+O+"'/><circle cx='"+(x+12)+"' cy='"+(y+13)+"' r='2.4' fill='"+O+"'/></g>"+otx(x,y-8,"💧 розтанув",11,"#fff");
 else if(kd=="glow")s="<circle cx='"+x+"' cy='"+(y-2)+"' r='42' fill='url(#glowY)'/>"+slime(x,y,"sV",1.25)+spark(x-32,y-30,.7)+spark(x+34,y-24,.6,"#fff");
 else if(kd=="split")s=slime(x-22,y+6,"sV",.85)+slime(x+22,y+6,"sV",.85)+spark(x,y-22,.7);
 else if(kd=="sleep")s=slime(x,y,"sV",1.2,"zz")+otx(x+22,y-24,"z z",13,"#fff");
 else if(kd=="jump")s="<path d='M"+(x-26)+" "+(y+12)+" l-8 6 M"+(x+26)+" "+(y+12)+" l8 6' stroke='#fff' stroke-width='3' stroke-linecap='round'/>"+slime(x,y-14,"sV",1.2);
 else if(kd=="unk")s=slime(x,y,"sV",1.2)+otx(x,y-30,"?",18);
 else s=slime(x,y,"sV",1.2);
 return s}
function inst(rd,env,f){var s="";rd.vars.forEach(function(v,vi){var X=198+vi*42,val=env?env[v.k]:0;
 if(v.kind=="lamp"){var on=env&&val=="так";s+=(on?"<circle cx='"+(X+6)+"' cy='88' r='30' fill='url(#glowY)'/>":"")+"<g filter='url(#sh)'><rect x='"+(X-4)+"' y='108' width='20' height='24' rx='5' fill='url(#silv)' stroke='"+O+"' stroke-width='3'/><circle cx='"+(X+6)+"' cy='92' r='15' fill='"+(on?"#ffe94a":"#d9deea")+"' stroke='"+O+"' stroke-width='3'/><path d='M"+(X-1)+" 94 q7 -10 14 0' stroke='"+O+"' stroke-width='2' fill='none' opacity='.5'/></g>"+otx(X+6,48,env?"світло: "+val:"світло",10)}
 else{var p=env?Math.min(1,(val/v.max)*f):0,hh=Math.round(64*p),col=v.kind=="drop"?"url(#water)":"#e01f48";
  s+="<g filter='url(#sh)'><rect x='"+X+"' y='62' width='12' height='72' rx='6' fill='#fff' stroke='"+O+"' stroke-width='3'/><rect x='"+(X+3.5)+"' y='"+(130-hh)+"' width='5' height='"+(hh+3)+"' rx='2.5' fill='"+col+"'/><circle cx='"+(X+6)+"' cy='138' r='9' fill='"+(v.kind=="drop"?"#2a95e6":"#e01f48")+"' stroke='"+O+"' stroke-width='3'/></g>"+otx(X+6,54,env?v.k+" = "+val+v.u:v.k+"?",11)}});
 return s}
function lbLbl(rd,env){return rd.vars.map(function(v){return v.kind=="lamp"?"світло: "+env[v.k]:v.k+" = "+env[v.k]+(v.u||"")}).join(", ")}
GM.lab7=function(g){var R=g.rounds,i=0,sc=0,n=R.length;
 function show(){var rd=R[i],lives=3,used=[],log=[],busy=false,fin=false,phase="test";
  function hd(){gs9((i+1)+" / "+n+" · "+hearts(lives)+" · ✅ "+sc)}
  function out(L,env){var r=runProg(L,env);return r.err?"помилка":(r.out.join(" + ")||"–")}
  function same(L,M){return rd.cases.every(function(c){return out(L,c)==out(M,c)})}
  var refut=!same(rd.hyp,rd.nat);
  fr9(g.title,g.hint||"Перевір гіпотезу дослідами. Один контрприклад її спростовує, а вдалі приклади ще нічого не доводять.","<div class='f7s'><svg id='lbs' viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'>"+DEFS+"<g id='lbb'></g><g id='lbi'></g><g id='lbx'></g></svg></div><div class='f7q' id='lbq'></div><div class='f7t' id='lbt'></div><div id='lbl'></div><div class='f7t' id='lbv'></div><div id='lbm'></div>");
  var svg=$i("lbs"),bb=$i("lbb"),bi=$i("lbi"),bx=$i("lbx"),q=$i("lbq"),tt=$i("lbt"),lg=$i("lbl"),vv=$i("lbv"),tm=$i("lbm");
  bb.innerHTML="<rect width='360' height='200' fill='url(#mint)'/>"+cloud(40,100,.6,.6)+cloud(330,20,.5,.7)+"<rect y='144' width='360' height='56' fill='url(#wood)'/><rect y='144' width='360' height='8' fill='#fff' opacity='.3'/><g filter='url(#sh)'><rect x='12' y='10' width='158' height='62' rx='10' fill='#fff' stroke='"+O+"' stroke-width='3'/><text x='91' y='29' text-anchor='middle' font-size='11' font-weight='900' fill='#9b6cf5'>ГІПОТЕЗА</text><text x='91' y='47' text-anchor='middle' font-size='12.5' font-weight='800' fill='"+O+"'>"+esc(rd.hypT[0])+"</text><text x='91' y='63' text-anchor='middle' font-size='12.5' font-weight='800' fill='"+O+"'>"+esc(rd.hypT[1])+"</text></g>"+pill(12,156,Math.min(336,rd.pill.length*7.6+22),rd.pill);
  function sl(ms){return sleep(ms).then(function(){if(!document.body.contains(svg))throw 0})}
  function scene(env,f,kd,badge,bt,bc){bi.innerHTML=inst(rd,env,f);bx.innerHTML=look(kd,300,114)+(bt?bub(190,10,152,30,bt,bc||"#fff3b8",O,false):"")+(badge?"<g filter='url(#sh)'><circle cx='338' cy='92' r='15' fill='"+(badge=="ok"?"url(#btn)":"#ffcf1f")+"' stroke='"+O+"' stroke-width='3'/><text x='338' y='99' text-anchor='middle' font-size='19' font-weight='900' fill='#fff'>"+(badge=="ok"?"✓":"!")+"</text></g>":"")}
  scene(null,0,"unk");
  function msg(t,k){tm.innerHTML="<div class='f7m "+k+"'>"+t+"</div>"}
  function logH(){lg.innerHTML=log.length?"<div class='f7log'>"+log.map(function(r){return "<div class='"+(r.ok?"":"bd")+"'>"+(r.ok?"✓":"⚠")+" <b>"+esc(lbLbl(rd,r.env))+"</b><br><small>програма: "+esc(r.pred)+" · дослід: "+esc(r.real)+"</small></div>"}).join("")+"</div>":""}
  function chips(){q.innerHTML=phase=="fix"?"Гіпотеза спростована! Обери виправлену програму, яка збігається з дослідами в усіх випадках.":fin?"":"Запусти досліди ("+(rd.runs-used.length)+" із "+rd.runs+" пробірок). Потім обери: гіпотеза підтверджується чи спростована?";
   tt.innerHTML=phase=="test"&&!fin?rd.cases.map(function(c,k){return "<button class='f7b"+(used.indexOf(k)>=0?" on":"")+"' data-k='"+k+"'"+(used.indexOf(k)>=0||used.length>=rd.runs?" disabled":"")+">"+esc(lbLbl(rd,c))+"</button>"}).join(""):"";
   var can=phase=="test"&&!fin&&!busy&&log.length&&(log.some(function(r){return !r.ok})||used.length>=rd.runs);
   vv.innerHTML=can?"<button class='f7b v1' data-v='ok'>✅ Підтверджується</button><button class='f7b v2' data-v='ref'>❌ Спростована</button>":"";
   if(phase=="fix"&&!fin)vv.innerHTML=rd.fix.map(function(o,k){return "<button class='f7b fx' data-f='"+k+"'><pre>"+o.map(esc).join("\n")+"</pre></button>"}).join("")}
  tt.onclick=async function(e){var b=e.target.closest(".f7b");if(!b||busy||b.disabled)return;var k=+b.getAttribute("data-k"),c=rd.cases[k];busy=true;used.push(k);chips();
   try{var rl=out(rd.nat,c),pr=out(rd.hyp,c);for(var f=0;f<=6;f++){scene(c,f/6,"unk");await sl(70)}
   await sl(250);var ok=rl==pr;scene(c,1,rd.look[rl]||"ok",ok?"ok":"bad","дослід: "+rl,ok?"#e4ffe0":"#ffe3e8");log.push({env:c,pred:pr,real:rl,ok:ok});logH();}catch(x){if(x===0)return;throw x}
   busy=false;chips();if(!ok)msg("⚠ Не збіглося! Програма (гіпотеза) передбачила «"+esc(pr)+"», а слайм зробив «"+esc(rl)+"». Це контрприклад.","red");else tm.innerHTML=""};
  function reset(){used=[];log=[];logH();scene(null,0,"unk");chips()}
  function won(note){fin=true;phase="done";var rv=lives<=0;if(!rv)sc++;hd();chips();msg((rv?"👀 ":"🎉 ")+note+"<br><b>"+rd.why+"</b>","green");nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})}
  function lose(t){lives--;hd();if(lives<=0){var ex=refut?"Гіпотеза спростована: "+rd.why:"Гіпотеза не спростована дослідами: "+rd.why;if(rd.fix&&refut){phase="fix";chips();vv.querySelectorAll(".fx").forEach(function(b,k){b.disabled=true;if(same(rd.fix[k],rd.nat))b.className+=" ok"});fin=true;msg("❌ "+t+"<br>Життя закінчились. "+ex,"red")}else{fin=true;chips();msg("❌ "+t+"<br>Життя закінчились. "+ex,"red")}nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)});return}msg("❌ "+t,"red");if(phase=="test")setTimeout(function(){if(document.body.contains(svg))reset()},600)}
  vv.onclick=function(e){var b=e.target.closest(".f7b");if(!b||busy||fin)return;
   if(b.hasAttribute("data-f")){var k=+b.getAttribute("data-f"),o=rd.fix[k];if(same(o,rd.nat)){b.className+=" ok";return won("Виправлена програма збігається з дослідами в усіх випадках.")}b.className+=" bad";b.disabled=true;var c=rd.cases.filter(function(c){return out(o,c)!=out(rd.nat,c)})[0];return lose("Ця програма все ще помиляється: для «"+esc(lbLbl(rd,c))+"» вона дає «"+esc(out(o,c))+"», а слайм – «"+esc(out(rd.nat,c))+"».")}
   var v=b.getAttribute("data-v"),found=log.some(function(r){return !r.ok});
   if(v=="ref"){if(found){if(rd.fix){phase="fix";hd();msg("✅ Є контрприклад – гіпотезу спростовано. Тепер виправ її.","green");chips();return}return won("Контрприклад знайдено – гіпотезу спростовано.")}
    return lose(refut?"Спростовувати можна лише контрприкладом, а всі твої досліди збіглися. Перевір інші значення – особливо на межі умови.":"Жодного контрприкладу немає: усі досліди збігаються з гіпотезою.")}
   if(!refut)return won("Усі досліди збіглися – гіпотеза підтверджується.");
   lose(found?"У журналі є ⚠ – один контрприклад спростовує гіпотезу, хоч скільки вдалих прикладів поруч.":"Вдалі приклади ще нічого не доводять. Є значення, де гіпотеза помиляється – перевір межу умови.")};
  hd();chips()}
 show()};
/* ---------- УРОК 18 · Нагородний конвеєр (elif у реальному часі) ---------- */
var LT={"золото":["#ffd84a","#ff9a1f","gold"],"срібло":["#e3e8ef","#8f9bab","silv"],"бронза":["#f0a860","#b0602a","gold"],"учасник":["#58c4ff","#1f6fff","sky"]};
var LTI={"біг":"🏃","стрибки":"🤸","плавання":"🏊"};
function lootSvg(p,ty,y,col){var c=LT[col]||LT["учасник"];
 return "<g transform='translate(180,"+y+")'><circle r='34' fill='"+c[0]+"' opacity='.25' filter='url(#bl)'/><circle r='27' fill='#3a2a9c' stroke='"+O+"' stroke-width='3.5'/><text y='10' text-anchor='middle' font-size='30'>"+(LTI[ty]||'🏃')+"</text>"
  
  +"<rect x='-26' y='28' width='52' height='22' rx='11' fill='#fff' stroke='"+O+"' stroke-width='3'/><text y='44' text-anchor='middle' font-size='15' font-weight='900' fill='"+O+"' font-family='system-ui'>p="+p+"</text></g>"}
GM.loot7=function(g){var R=g.rounds,ri=0,sc=0,tot=0;R.forEach(function(r){tot+=r.items.length});
 function show(){var rd=R[ri],k=0,combo=0,best=0,raf=0,t0=0,busy=true,y=-40,cur=null;
  var bins=rd.bins;
  fr9(g.title,rd.hint,"<div class='f7q'>"+rd.task+"</div><div class='f7c lt7c' id='ltc' style='font-size:12px!important;line-height:1.5!important;padding:5px 8px!important'></div><div class='f7s lt7s'><svg id='lts' viewBox='0 0 360 140' xmlns='http://www.w3.org/2000/svg'>"+DEFS+"<rect width='360' height='140' fill='url(#night)'/>"+stars(30,7)
   +"<rect x='0' y='126' width='360' height='14' fill='#2a1d78'/><path d='M0 126h360' stroke='"+O+"' stroke-width='4'/><g id='ltg'></g><g id='ltfx'></g></svg><div class='lt7cb' id='ltcb'></div></div>"
   +"<div class='lt7b' id='ltb' style='display:grid!important;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0'>"+bins.map(function(b,j){var c=LT[b];return "<button data-j='"+j+"' style='background:linear-gradient("+c[0]+","+c[1]+")!important;width:auto!important;margin:0!important;padding:9px 4px!important;color:#fff!important;font:900 14px system-ui!important;border:3px solid "+O+"!important;border-radius:14px!important;min-height:0!important'><i style='font-style:normal;margin-right:5px'>"+["🥇","🥈","🥉","🎗"][["золото","срібло","бронза","учасник"].indexOf(b)]+"</i>"+b+"</button>"}).join("")+"</div><div id='ltm'></div><div class='f7go' id='ltgo'>▶ Запустити конвеєр</div>");
  var svg=$i("lts"),gg=$i("ltg"),fx=$i("ltfx"),cd=$i("ltc"),bt=$i("ltb"),tm=$i("ltm"),cb=$i("ltcb"),go=$i("ltgo");
  function hd(){gs9("Раунд "+(ri+1)+"/"+R.length+" · 🏅 "+Math.min(k+1,rd.items.length)+"/"+rd.items.length+" · ✅ "+sc)}
  function code(now,hit){cd.innerHTML=rd.code.map(function(l,j){var cl=now&&now.indexOf(j)>=0?(j==hit||j==hit+1?"ok":"now"):"";return "<div class='"+cl+"'><s>"+(j+1)+"</s>"+esc(l)+"</div>"}).join("")}
  function msg(t,c){tm.innerHTML=t?"<div class='f7m "+c+"'>"+t+"</div>":""}
  function alive(){return document.body.contains(svg)}
  function trace(env){var r=F7.runProg(rd.code,env);return r}
  function next(){if(!alive())return;if(k>=rd.items.length)return endR();
   cur=rd.items[k];var env={p:cur.p};if(cur.t)env.type=cur.t;cur.r=trace(env);hd();code();msg("");y=-40;busy=false;t0=0;
   var T=rd.speed*(1-Math.min(.35,k*.04));
   function fr(ts){if(!alive())return;if(busy)return;if(!t0)t0=ts;y=-40+(ts-t0)/T*130;
    gg.innerHTML=lootSvg(cur.p,cur.t,y,null);if(y>=92){pick(-1);return}raf=requestAnimationFrame(fr)}
   raf=requestAnimationFrame(fr)}
  function pick(j){if(busy||!cur)return;busy=true;cancelAnimationFrame(raf);var want=cur.r.out[0],ok=j>=0&&bins[j]==want;
   var st=cur.r.steps,hit=st[st.length-2];code(st,hit);
   var path=[];for(var q=0;q<st.length;q+=1){var l=rd.code[st[q]];if(/^\s/.test(l))continue;var m=l.match(/^(?:if|elif)\s+(.*):\s*$/);if(m)path.push(m[1]+(st.indexOf(st[q]+1)>=0?" → <b>так</b>":" → ні"));else if(/^else/.test(l))path.push("else")}
   gg.innerHTML=lootSvg(cur.p,cur.t,Math.max(y,40),want);
   if(ok){sc++;combo++;best=Math.max(best,combo);cb.innerHTML=combo>1?"<b>x"+combo+" КОМБО!</b>":"";cb.className="lt7cb on";setTimeout(function(){if(alive())cb.className="lt7cb"},500);
    fx.innerHTML="<text x='300' y='40' text-anchor='middle' font-size='22' font-weight='900' fill='#7ee787' stroke='"+O+"' stroke-width='2'>+1</text>";
    msg("✅ «"+want+"» · "+path.join(" · "),"green");try{if(window.navigator.vibrate)navigator.vibrate(15)}catch(e){}}
   else{combo=0;cb.innerHTML="";fx.innerHTML="<text x='300' y='40' text-anchor='middle' font-size='22' font-weight='900' fill='#ff5a7a' stroke='"+O+"' stroke-width='2'>"+(j<0?"ПРОҐАВ!":"НЕ ТУДИ!")+"</text>";
    msg("❌ Код відправить у «<b>"+want+"</b>»: "+path.join(" · "),"red")}
   bt.querySelectorAll("button").forEach(function(b,q){var o=bins[q]==want?"#7ee787":(q==j?"#ff5a7a":"");b.style.setProperty("outline",o?"4px solid "+o:"none","important");b.style.setProperty("outline-offset","2px");b.style.setProperty("opacity",o||q==j?"1":".45","important")});
   k++;setTimeout(function(){if(!alive())return;fx.innerHTML="";bt.querySelectorAll("button").forEach(function(b){b.style.setProperty("outline","none","important");b.style.setProperty("opacity","1","important")});next()},ok?1300:2600)}
  function endR(){busy=true;gg.innerHTML="";code();msg("🏁 Раунд пройдено! Найкраще комбо: x"+best+"<br><b>"+rd.why+"</b>","green");
   nxt9(ri<R.length-1?"Наступний раунд →":"Результат",function(){ri++;ri<R.length?show():fin9(sc,tot)})}
  bt.onclick=function(e){var b=e.target.closest("button");if(b)pick(+b.getAttribute("data-j"))};
  go.onclick=function(){go.style.display="none";try{cd.scrollIntoView({behavior:"smooth",block:"start"})}catch(e){}next()};
  code();hd()}
 show()};
var st=document.createElement("style");st.textContent=".f7s{margin:8px 0}.f7s svg{display:block;width:100%;border:4px solid "+O+";border-radius:20px;box-shadow:0 5px 0 "+O+"}.f7q{color:#fff;text-align:center;font-weight:800;margin:10px 4px 6px;line-height:1.3}"
+".f7c{margin:6px 0;background:#0d1117;border-radius:12px;padding:8px 10px;color:#e6edf3;font:13px/1.8 ui-monospace,Consolas,monospace;box-shadow:inset 0 0 0 2px "+O+";white-space:pre-wrap;text-align:left}.f7c div{border-left:4px solid transparent;margin:0 -10px;padding:0 10px;min-height:1.8em}.f7c s{color:#6e7681;text-decoration:none;display:inline-block;width:1.6em}.f7c .now{background:#1f3a5f;border-left-color:#58a6ff}.f7c .er{background:#44181a;border-left-color:#f85149;color:#ff8a9a}.f7c .ok{color:#7ee787}.f7c .mk{background:#3a3210;border-left-color:#ffd84a}.f7c .fa{background:#44181a;border-left-color:#f85149}.f7c [data-l],.f7c [data-p]{cursor:pointer}.f7c .em2,.mut2{color:#8b949e;font:12.5px/1.4 system-ui,sans-serif;white-space:normal}.mut2{color:"+O+";text-align:center;font-weight:700;margin:2px 4px}"
+".sl{display:inline-block;min-width:34px;text-align:center;border:2px dashed #58a6ff;border-radius:7px;padding:0 5px;color:#7ee787;font-style:normal;text-decoration:none;cursor:pointer}.sl.em{color:#8b949e}.sl.on{background:#1f3a5f;border-style:solid}"
+"b.st{display:inline-block;width:26px;height:26px;line-height:24px;text-align:center;border-radius:8px;background:#58a6ff;color:#0d1117;font-weight:900;cursor:pointer;margin:0 3px;user-select:none}.f7c em{color:#ffe94a;font-style:normal;font-weight:900}"
+".f7t{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}.f7t .f7b,.f7b{width:auto;display:inline-block;border:3px solid "+O+";background:#fff;color:"+O+";border-radius:12px;padding:7px 11px;font:800 13px ui-monospace,Consolas,monospace;box-shadow:0 3px 0 "+O+";cursor:pointer}.f7b.on{background:#d6e9ff}.f7b:disabled{opacity:.5}.f7b.v1{background:#d9ffd2;font-family:inherit}.f7b.v2{background:#ffd9df;font-family:inherit}.f7t .f7b.fx{width:100%;display:block;text-align:left;padding:6px 10px}.f7b.fx pre{margin:0;font:12px/1.5 ui-monospace,Consolas,monospace}.f7b.ok{background:#d9ffd2;border-color:#2fb52a}.f7b.bad{background:#ffd9df;border-color:#e0314f}"
+".f7go{text-align:center;padding:12px;border-radius:14px;background:linear-gradient(#8dff5a,#1fb524);color:#fff;font-size:18px;font-weight:900;border:3px solid "+O+";box-shadow:0 4px 0 "+O+";text-shadow:0 2px 0 #0003;cursor:pointer;margin:8px 0}"
+".f7m{margin:8px 0;padding:9px 11px;border-radius:12px;border:3px solid "+O+";font-size:13px;line-height:1.4;color:"+O+";background:#fff}.f7m.red{background:#ffe3e8;border-color:#e0314f}.f7m.green{background:#e4ffe0;border-color:#2fb52a}"
+".f7log{display:flex;flex-direction:column;gap:5px;margin:6px 0}.f7log div{background:#e4ffe0;border:3px solid #2fb52a;border-radius:10px;padding:4px 9px;color:"+O+";font-size:13px;line-height:1.3}.f7log div.bd{background:#fff3c8;border-color:#f0a800}.f7log small{font-weight:700;opacity:.8}";+".lt7c div{padding:0 4px;border-radius:6px}.lt7c div.now{background:#1f3b63}.lt7c div.ok{background:#1f6f3a;color:#fff}.lt7c s{color:#6e7681;text-decoration:none;margin-right:8px}"
+".lt7s{position:relative}.lt7cb{position:absolute;right:12px;top:10px;color:#ffd23f;font:900 italic 18px system-ui;text-shadow:0 2px 0 #000;transition:transform .2s}.lt7cb.on{transform:scale(1.35)}"
+".lt7c{font-size:12px!important;line-height:1.55!important;padding:5px 8px!important}.lt7b{display:grid!important;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}html body .lt7b button{width:auto!important;min-height:0!important;margin:0!important;border:3px solid "+O+"!important;border-radius:14px!important;padding:9px 4px!important;color:#fff!important;font:900 14px system-ui!important;text-shadow:0 2px 0 rgba(0,0,0,.45)!important;box-shadow:0 4px 0 "+O+"!important;cursor:pointer;text-transform:uppercase;transition:transform .1s}.lt7b button i{font-style:normal;margin-right:4px}.lt7b button:active{transform:translateY(3px);box-shadow:0 1px 0 "+O+"}.lt7b button.lt-ok{outline:4px solid #7ee787;outline-offset:2px}.lt7b button.lt-bad{outline:4px solid #ff5a7a;outline-offset:2px;opacity:.7}"
document.head.appendChild(st);
window.F7={runProg:runProg};
if(typeof GI7!="undefined"){GI7.turret=["🎯","Автотурель"];GI7.lab7=["🧪","Лабораторія слаймів"];GI7.loot7=["🏅","Нагородний конвеєр"]}
/* дані */
function F(k,o){if(typeof LES!="undefined"&&LES[k]&&LES[k].g)LES[k].g.push(o)}
function foes(a,k){return a.map(function(x){var e={};e[k]=x[0];return{env:e,want:x[1]}})}
F(716,{type:"turret",title:"Автотурель",hint:"Умова – «розум» турелі. Склади if / else з фрагментів коду, запусти й подивись, по кому вона стріляє.",rounds:[
 {task:"Турель має стріляти по ворогах, які ближче за 5 клітинок. Далеких – чекати й не витрачати патрони. Обери умову.",tag:"dist",tpl:["if {c}:","    fire()","else:","    wait()"],slots:{c:["dist > 5","dist < 5","dist = 5","dist == 5"]},
  foes:foes([[3,"fire()"],[7,"wait()"],[4,"fire()"],[6,"wait()"],[2,"fire()"]],"dist"),why:"Умова dist < 5 істинна для близьких ворогів – виконується гілка if, для далеких – else. А для порівняння завжди потрібне «==», а не «=»."},
 {task:"Дальність турелі – 5 клітинок включно: той, хто стоїть рівно на межі, теж у небезпеці. Яка умова враховує межу?",tag:"dist",tpl:["if {c}:","    fire()","else:","    wait()"],slots:{c:["dist < 5","dist >= 5","dist != 5","dist <= 5"]},
  foes:foes([[2,"fire()"],[5,"fire()"],[7,"wait()"],[4,"fire()"],[6,"wait()"]],"dist"),why:"Щоб межа входила в дальність, порівняння має бути нестрогим: dist <= 5."},
 {task:"На полі є вороги (фіолетові) й друзі (зелені). Стріляй лише по ворогах! Обери умову та дії для гілок if і else.",tag:"kind",tpl:["if {c}:","    {a}","else:","    {b}"],slots:{c:["kind == 'foe'","kind = 'foe'","kind == 'friend'","kind != 'foe'"],a:["fire()","wait()"],b:["wait()","fire()"]},
  foes:[{env:{kind:"foe"},want:"fire()"},{env:{kind:"friend"},want:"wait()"},{env:{kind:"friend"},want:"wait()"},{env:{kind:"foe"},want:"fire()"},{env:{kind:"friend"},want:"wait()"}],why:"Умову можна записати по-різному, головне – щоб гілки if і else відповідали їй. Обидва шляхи ведуть до одного результату."},
 {task:"Добиваємо слабких: якщо в ворога hp < 30 – вогонь, а сильних пропускаємо. Інакше (else) нічого робити не треба. Обери заголовок і дію.",tag:"hp",tpl:["{h}","    {a}"],slots:{h:["if hp < 30","if hp = 30:","if hp <= 30:","if hp < 30:"],a:["wait()","fire()"]},
  foes:foes([[80,null],[25,"fire()"],[60,null],[10,"fire()"],[30,null]],"hp"),why:"Це неповне розгалуження: є лише if. Умова хибна – гілку пропускаємо й ідемо далі. Після умови обов’язкова двокрапка."}]});
function T(t){return ["if t > "+t+":"]}
F(717,{type:"lab7",title:"Лабораторія слаймів",hint:"Гіпотеза – припущення, яке можна перевірити. Запускай досліди, шукай контрприклад і роби висновок.",rounds:[
 {hypT:["Слайми тануть","при t > 30 °C"],pill:"if t > 30: print('розтанув')",vars:[{k:"t",kind:"th",max:60,u:"°C"}],cases:[{t:10},{t:25},{t:30},{t:35},{t:50}],runs:3,
  hyp:["if t > 30:","    print('розтанув')","else:","    print('живий')"],nat:["if t >= 30:","    print('розтанув')","else:","    print('живий')"],look:{"розтанув":"melt","живий":"ok"},
  fix:[["if t > 30:","    print('живий')","else:","    print('розтанув')"],["if t >= 30:","    print('розтанув')","else:","    print('живий')"],["if t > 35:","    print('розтанув')","else:","    print('живий')"]],
  why:"Один контрприклад (t = 30) спростовує гіпотезу – слайм тане і на самій межі. Тому межі умов треба перевіряти окремо: > і >= дають різні результати."},
 {hypT:["Слайм світиться,","коли вологість h > 50 %"],pill:"if h > 50: print('світиться')",vars:[{k:"h",kind:"drop",max:100,u:"%"}],cases:[{h:20},{h:50},{h:51},{h:80},{h:100}],runs:3,
  hyp:["if h > 50:","    print('світиться')","else:","    print('темний')"],nat:["if h >= 51:","    print('світиться')","else:","    print('темний')"],look:{"світиться":"glow","темний":"ok"},
  why:"Жоден дослід не суперечить гіпотезі, тож вона підтверджується (поки не знайдеться контрприклад). Вдалі приклади доводять лише те, що ми перевірили."},
 {hypT:["Слайм розмножується,","коли t > 20 або є світло"],pill:"if t > 20 or light == 'так'",vars:[{k:"t",kind:"th",max:40,u:"°C"},{k:"light",kind:"lamp"}],cases:[{t:10,light:"ні"},{t:25,light:"ні"},{t:10,light:"так"},{t:25,light:"так"},{t:15,light:"так"}],runs:3,
  hyp:["if t > 20 or light == 'так':","    print('розмножується')","else:","    print('спокійний')"],nat:["if t > 20 and light == 'так':","    print('розмножується')","else:","    print('спокійний')"],look:{"розмножується":"split","спокійний":"ok"},
  fix:[["if t > 20 or light == 'ні':","    print('розмножується')","else:","    print('спокійний')"],["if t > 20 and light == 'так':","    print('розмножується')","else:","    print('спокійний')"],["if t > 20 and light = 'так':","    print('розмножується')","else:","    print('спокійний')"]],
  why:"or істинне, коли правдива хоча б одна частина, а слайму потрібні обидві умови – це and. Достатньо одного контрприкладу, щоб гіпотезу виправити."},
 {hypT:["Слайм рухається при t > 10,","тане при t > 30"],pill:"if t > 10 … elif t > 30 …",vars:[{k:"t",kind:"th",max:60,u:"°C"}],cases:[{t:5},{t:15},{t:25},{t:35},{t:50}],runs:3,
  hyp:["if t > 10:","    print('рухається')","elif t > 30:","    print('тане')","else:","    print('спить')"],nat:["if t > 30:","    print('тане')","elif t > 10:","    print('рухається')","else:","    print('спить')"],look:{"тане":"melt","рухається":"jump","спить":"sleep"},
  fix:[["if t > 30:","    print('тане')","if t > 10:","    print('рухається')","else:","    print('спить')"],["if t > 30:","    print('тане')","elif t > 10:","    print('рухається')","else:","    print('спить')"],["if t > 30:","    print('тане')","else if t > 10:","    print('рухається')","else:","    print('спить')"]],
  why:"Умови перевіряються згори вниз, і спрацьовує перша істинна. Для t = 35 умова t > 10 істинна раніше – до t > 30 справа не доходить. Сильніша умова має стояти першою."}]});
F(718,{type:"loot7",title:"Нагородний конвеєр",rounds:[{"hint": "Спортсмени фінішують один за одним. Подивись на ланцюг if / elif / else і тицяй нагороду, яку видасть код. Встигни, поки спортсмен не пішов!", "task": "Визнач нагороду за балами p. Код перевіряє умови згори вниз.", "code": ["if p >= 80:", "    print('золото')", "elif p >= 50:", "    print('срібло')", "elif p >= 20:", "    print('бронза')", "else:", "    print('учасник')"], "bins": ["золото", "срібло", "бронза", "учасник"], "speed": 4200, "items": [{"p": 85}, {"p": 30}, {"p": 55}, {"p": 12}, {"p": 80}, {"p": 49}, {"p": 20}, {"p": 97}], "why": "Спрацьовує перша істинна умова, решта вже не перевіряються. p = 80 і p = 20 – межі, вони входять у гілку завдяки >=."}, {"hint": "Новий розробник переплутав порядок умов. Сортуй так, як ВИКОНАЄ код, а не як «логічно»!", "task": "Обережно: баговий код! Комп’ютер робить те, що написано.", "code": ["if p >= 20:", "    print('бронза')", "elif p >= 50:", "    print('срібло')", "elif p >= 80:", "    print('золото')", "else:", "    print('учасник')"], "bins": ["золото", "срібло", "бронза", "учасник"], "speed": 4000, "items": [{"p": 90}, {"p": 10}, {"p": 60}, {"p": 25}, {"p": 100}, {"p": 19}, {"p": 50}, {"p": 5}], "why": "Якщо першою стоїть найслабша умова p >= 20, вона «з’їдає» всі сильних спортсменів – золото не дістанеться нікому. Тому умови ставлять від найсуворішої до найм’якшої."}, {"hint": "Тепер у спортсмена є вид спорту: 🏃 біг, 🤸 стрибки, 🏊 плавання. Умови стали складнішими – з and.", "task": "Дивись і на бали p, і на вид спорту.", "code": ["if p >= 70 and type == 'біг':", "    print('золото')", "elif type == 'стрибки':", "    print('срібло')", "elif p >= 40:", "    print('бронза')", "else:", "    print('учасник')"], "bins": ["золото", "срібло", "бронза", "учасник"], "speed": 4800, "items": [{"p": 90, "t": "біг"}, {"p": 90, "t": "стрибки"}, {"p": 50, "t": "біг"}, {"p": 30, "t": "плавання"}, {"p": 75, "t": "плавання"}, {"p": 10, "t": "стрибки"}, {"p": 70, "t": "біг"}, {"p": 39, "t": "біг"}], "why": "and вимагає, щоб обидві частини були істинні: сильний плавець – не золото. А стрибки йдуть у срібло за будь-якої сили, бо його гілка стоїть вище за p >= 40."}]});
})();

/* ===== 7 клас · великі ігри 19–21: «Суперздібності» (power), «Ательє вікон» (atelier), «Пульт подій» (pult) ===== */
(function(){
var A=window.A7,O=A.O,DEFS=A.DEFS,esc=A.esc,heroS=A.heroS,cloud=A.cloud,spark=A.spark,bub=A.bub;
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function hl(t){return typeof pyHL=="function"?pyHL(t):esc(t)}
function pre(lines){return "<div class='pyb'><pre class='py'>"+hl(lines.join("\n"))+"</pre></div>"}
function codeBox(lines){return "<div class='pyb'><div class='pyh'><i></i><i></i><i></i> main.py</div><div class='cdl'>"+lines.map(function(l,k){return "<div class='cl' data-k='"+k+"'><b>"+(k+1)+"</b><span>"+hl(l)+"</span></div>"}).join("")+"</div></div>"}
function shuf(a){return a.slice().sort(function(){return Math.random()-.5})}
function hero(x,y,g,s){return "<g transform='translate("+x+","+y+") scale("+(s||1)+")'>"+heroS().replace(/url\(#hO\)/g,"url(#"+(g||"hO")+")")+"</g>"}
var botS=window.A7.botS;function slime(x,y,g,s,dead){return botS(x,y,g,s,dead?"sad":"ok",dead)}
function slimeOld(x,y,g,s,dead){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#sh)' opacity='"+(dead?.55:1)+"'><ellipse cx='0' cy='15' rx='17' ry='4' fill='#0004'/><path d='M-18 13 Q-20 -16 0 -16 Q20 -16 18 13 Q9 17 0 15 Q-9 17 -18 13Z' fill='url(#"+g+")' stroke='"+O+"' stroke-width='3'/><ellipse cx='-7' cy='-8' rx='6' ry='3' fill='#fff' opacity='.5'/>"+(dead?"<path d='M-9 -5 l6 6 m0 -6 l-6 6 M3 -5 l6 6 m0 -6 l-6 6' stroke='"+O+"' stroke-width='2.5' stroke-linecap='round' fill='none'/><path d='M-5 9 Q0 5 5 9' stroke='"+O+"' stroke-width='2' fill='none'/>":"<circle cx='-6' cy='-1' r='4' fill='#fff'/><circle cx='6' cy='-1' r='4' fill='#fff'/><circle cx='-5' cy='0' r='2' fill='"+O+"'/><circle cx='7' cy='0' r='2' fill='"+O+"'/><path d='M-5 7 Q0 10 5 7' stroke='"+O+"' stroke-width='2' fill='none'/>")+"</g>"}
function burst(x,y,s){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#gl)'><circle r='20' fill='url(#glowY)'/><path d='M0 -22 L5 -8 L20 -12 L10 0 L22 10 L6 8 L0 22 L-6 8 L-22 10 L-10 0 L-20 -12 L-5 -8Z' fill='#ff9d1f' stroke='#fff' stroke-width='2'/><path d='M0 -13 L3 -5 L12 -7 L6 0 L13 6 L4 5 L0 13 L-4 5 L-13 6 L-6 0 L-12 -7 L-3 -5Z' fill='#fff35c'/></g>"}
function pill(x,y,w,t,col){return "<g filter='url(#sh)'><rect x='"+x+"' y='"+y+"' width='"+w+"' height='26' rx='9' fill='#0d1117' stroke='"+O+"' stroke-width='2.5'/><text x='"+(x+w/2)+"' y='"+(y+18)+"' text-anchor='middle' font-size='12.5' fill='"+(col||"#7ee787")+"' font-family='monospace' font-weight='700'>"+esc(t)+"</text></g>"}
function stars(n,seed){var s="",q=seed||3;for(var i=0;i<n;i++){q=(q*9301+49297)%233280;var a=q/233280;q=(q*9301+49297)%233280;var b=q/233280;s+="<circle cx='"+Math.round(6+a*348)+"' cy='"+Math.round(6+b*120)+"' r='"+(1+(i%3)*.5)+"' fill='#fff' opacity='"+(.5+(i%3)*.25)+"'/>"}return s}
function hpbar(x,y,p,t){return "<g><rect x='"+(x-21)+"' y='"+y+"' width='42' height='10' rx='5' fill='#fff' stroke='"+O+"' stroke-width='2'/><rect x='"+(x-19)+"' y='"+(y+2)+"' width='"+Math.max(0,38*p)+"' height='6' rx='3' fill='url(#bar)'/><text x='"+x+"' y='"+(y-2)+"' text-anchor='middle' font-size='9' font-weight='900' fill='#fff' stroke='"+O+"' stroke-width='2.5' paint-order='stroke' font-family='monospace'>"+t+"</text></g>"}
function ftxt(x,y,t,col){return "<text x='"+x+"' y='"+y+"' text-anchor='middle' font-size='16' font-weight='900' fill='#fff' stroke='"+(col||"#d81b84")+"' stroke-width='4.5' paint-order='stroke'>"+esc(t)+"</text>"}

/* спільний каркас: раунди, життя, очки, поразка */
function engine(g,P,hint,round){
 var R=g.rounds,n=R.length,i=0,sc=0,lives=4;
 function hud(){gs9((i+1)+" / "+n+" · "+(lives>0?new Array(lives+1).join("❤️"):"💔")+" · ✅ "+sc)}
 function show(){var rd=R[i],miss=0,done=false;
  fr9(g.title,g.hint||hint,"<div class='g7g-sc'><svg id='"+P+"s' viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg'>"+DEFS+"<g id='"+P+"v'></g></svg></div><div class='g7g-q'>"+rd.q+"</div><div id='"+P+"p'></div><div class='g7g-m' id='"+P+"m' style='display:none'></div>");hud();
  var api={P:P,
   alive:function(){return !!document.getElementById(P+"s")},
   v:function(h){var e=document.getElementById(P+"v");if(e)e.innerHTML=h},
   p:function(){return document.getElementById(P+"p")},
   locked:function(){return done},
   msg:function(t,k){var m=document.getElementById(P+"m");if(m&&t==null)m.style.display="none";else if(m){m.style.display="";m.className="g7g-m "+(k||"");m.innerHTML=t}},
   good:function(t){if(done)return;done=true;if(!miss)sc++;hud();api.msg("🎉 "+t,"g");nxt9(i<n-1?"Далі →":"Результат",function(){i++;i<n?show():fin9(sc,n)})},
   bad:function(t){if(done)return;miss++;lives--;hud();
    if(lives<=0){done=true;api.msg("❌ "+t+"<br><b>💔 Життя закінчились – місію не виконано.</b>","r");nxt9("Результат",function(){fin9(sc,n)})}
    else api.msg("❌ "+t+" <b>(залишилось ❤️ "+lives+")</b>","r")}};
  round(rd,api)}
 show()}

/* ================= 19. Суперздібності ================= */
function pwScene(o){var s="<rect width='360' height='200' fill='url(#pnk)'/>"+cloud(60,34,.9,.8)+cloud(300,56,.7,.8)+"<rect y='150' width='360' height='50' fill='url(#grass2)'/><path d='M0 150 Q30 144 60 150 T120 150 T180 150 T240 150 T300 150 T360 150' stroke='#fff' stroke-opacity='.5' stroke-width='2' fill='none'/>";
 if(o.r>0){var Rr=o.r*14;s+="<circle cx='"+o.cx+"' cy='132' r='"+(Rr+10)+"' fill='url(#glowP)'/><circle cx='"+o.cx+"' cy='132' r='"+Rr+"' fill='none' stroke='#fff' stroke-width='3.5' stroke-dasharray='7 6'/>"}
 if(o.shot)s+="<circle cx='"+o.shot.x+"' cy='"+o.shot.y+"' r='6' fill='#ffe94a' stroke='#fff' stroke-width='2' filter='url(#gl)'/>";
 s+=hero(58+(o.hx||0),122,"hP",1.15);
 o.sl.forEach(function(e){s+=slime(e.x,138,"sV",e.s,e.dead)+(e.dead?"":hpbar(e.x,138-16*e.s-15,e.hp/e.max,e.hp))});
 if(o.burst)s+=burst(o.cx,112,1.15)+spark(o.cx+34,96,.7)+spark(o.cx-34,92,.6,"#fff");
 if(o.fl)s+=ftxt(o.cx,74,o.fl);
 if(o.bub)s+=bub(o.bub[0],o.bub[1],o.bub[2],30,esc(o.bub[3]),"#ffe3e8","#c0183a",true);
 if(o.pill)s+=pill(10,166,Math.min(240,o.pill.length*7.4+22),o.pill);
 return s}
function pwNew(sl){return {r:0,cx:270,hx:0,sl:sl.map(function(h,k){return {x:sl.length>1?[232,308][k]:270,hp:h,max:h,s:sl.length>1?.95:1.3,dead:false}}),pill:"",fl:"",burst:false,shot:null,bub:null}}
async function pwShoot(api,st){for(var k=0;k<=8;k++){st.shot={x:80+(st.cx-80)*k/8,y:112-Math.sin(k/8*Math.PI)*46};api.v(pwScene(st));await sleep(40);if(!api.alive())return false}st.shot=null;st.burst=true;api.v(pwScene(st));await sleep(350);return api.alive()}
async function pwMiss(api,st,fl,text){st.fl=fl;api.v(pwScene(st));await sleep(500);if(!api.alive())return;for(var k=0;k<4;k++){st.hx=k%2?0:-6;api.v(pwScene(st));await sleep(70);if(!api.alive())return}st.hx=0;st.burst=false;st.fl="";st.bub=null;api.v(pwScene(st));api.bad(text)}
async function pwWin(api,st,fl,text){st.fl=fl;st.sl.forEach(function(e){e.dead=true});api.v(pwScene(st));await sleep(500);if(!api.alive())return;st.bub=null;api.good(text)}
function pwArgs(rd,api){var a=rd.params.map(function(p){return p.v}),st=pwNew(rd.sl),busy=false,P=api.P;
 function call(){return rd.name+"("+a.join(", ")+")"}
 function draw(){st.r=a[rd.rIdx||0];st.burst=false;st.fl="";st.pill=call()+" → "+rd.f(a);api.v(pwScene(st))}
 var h=pre(rd.def)+"<div class='g7g-row' style='flex-direction:column;align-items:stretch'>";
 rd.params.forEach(function(p,k){h+="<div class='g7g-st'><code>"+p.n+"</code><button data-k='"+k+"' data-d='-1'>−</button><b id='"+P+"a"+k+"'>"+p.v+"</b><button data-k='"+k+"' data-d='1'>+</button></div>"});
 api.p().innerHTML=h+"</div><div class='g7g-call' id='"+P+"c'></div><button class='g7g-go' id='"+P+"g'>🔥 Вогонь!</button>";
 function upd(){rd.params.forEach(function(p,k){document.getElementById(P+"a"+k).textContent=a[k]});document.getElementById(P+"c").innerHTML=hl("x = "+call())+"<br><span class='g7g-res'>"+rd.name+" повертає <b>"+rd.f(a)+"</b></span>";draw()}
 Array.prototype.forEach.call(api.p().querySelectorAll(".g7g-st button"),function(b){b.onclick=function(){if(busy||api.locked())return;var k=+b.getAttribute("data-k"),p=rd.params[k],d=+b.getAttribute("data-d"),stp=p.step||1;a[k]=Math.max(p.min,Math.min(p.max,a[k]+d*stp));upd()}});
 upd();
 document.getElementById(P+"g").onclick=async function(){if(busy||api.locked())return;busy=true;var v=rd.f(a);
  if(!(await pwShoot(api,st)))return;
  var inn=st.sl.every(function(e){return Math.abs(e.x-st.cx)<=st.r*14});
  if(v===rd.target&&inn)return pwWin(api,st,"-"+v+(st.sl.length>1?" ×"+st.sl.length:""),rd.why);
  var t=v===rd.target?"Шкода "+v+" правильна, але радіус "+a[0]+" замалий: вибух не дістав до слаймів (потрібно r ≥ "+rd.minR+").":(v<rd.target?"Шкода "+v+" замала – у слаймів лишилось HP. Потрібно рівно "+rd.target+".":"Шкода "+v+" завелика: вибух нестабільний, слайми відскочили. Потрібно рівно "+rd.target+".");
  st.bub=[150,70,120,"Не те! "+v];await pwMiss(api,st,"-"+v,t);if(api.alive()){busy=false;draw()}}}
function pwOpts(rd,api){var st=pwNew([rd.target]),busy=false,box=document.createElement("div");box.className="g7g-opts";
 st.pill=rd.call+" → ?";api.v(pwScene(st));
 shuf(rd.opts).forEach(function(op){var b=document.createElement("button");b.className="g7g-opt";b.innerHTML=op.code?pre(op.code):"<code>"+esc(op.t)+"</code>";
  b.onclick=async function(){if(busy||api.locked()||b.disabled)return;busy=true;b.disabled=true;
   var hasV=op.v!=null;st.pill=(op.t||rd.call)+" → "+(hasV?op.v:(op.err?"ПОМИЛКА":"None"));st.r=0;
   if(!(await pwShoot(api,st)))return;
   if(hasV&&op.v===rd.target)return pwWin(api,st,"-"+op.v,rd.why);
   b.classList.add("no");st.bub=[150,64,130,hasV?"Не те! "+op.v:(op.err?"Помилка!":"None")];await pwMiss(api,st,hasV?"-"+op.v:"0",op.bad);
   if(api.alive()){busy=false;st.pill=rd.call+" → ?";api.v(pwScene(st))}};
  box.appendChild(b)});
 api.p().innerHTML=rd.def?pre(rd.def):"";api.p().appendChild(box)}
function pwChain(rd,api){var P=api.P,st=pwNew([rd.target]),busy=false,fn={},outer=0,inner=1,x=rd.x0,names=rd.fns.map(function(f){fn[f[0]]=f[2];return f[0]});
 var defs=[];rd.fns.forEach(function(f){defs.push("def "+f[0]+"(x):");defs.push("    return "+f[1])});
 function val(){var iv=fn[names[inner]](x);return {iv:iv,v:fn[names[outer]](iv)}}
 function expr(){return names[outer]+"("+names[inner]+"("+x+"))"}
 function draw(){var r=val();st.r=0;st.burst=false;st.fl="";st.pill=expr()+" → "+r.v;api.v(pwScene(st))}
 api.p().innerHTML=pre(defs)+"<div class='g7g-lb'>зовнішня функція</div><div class='g7g-row' id='"+P+"o'></div><div class='g7g-lb'>внутрішня функція</div><div class='g7g-row' id='"+P+"i'></div><div class='g7g-st'><code>x</code><button data-d='-1'>−</button><b id='"+P+"x'>"+x+"</b><button data-d='1'>+</button></div><div class='g7g-call' id='"+P+"c'></div><button class='g7g-go' id='"+P+"g'>🔥 Вогонь!</button>";
 function upd(){document.getElementById(P+"x").textContent=x;var r=val();document.getElementById(P+"c").innerHTML=hl("x = "+expr())+"<br><span class='g7g-res'>"+x+" → "+names[inner]+" → <b>"+r.iv+"</b> → "+names[outer]+" → <b>"+r.v+"</b></span>";["o","i"].forEach(function(w){Array.prototype.forEach.call(document.getElementById(P+w).children,function(b,k){b.className="g7g-ch"+(k===(w=="o"?outer:inner)?" on":"")})});draw()}
 ["o","i"].forEach(function(w){var host=document.getElementById(P+w);names.forEach(function(nm,k){var b=document.createElement("button");b.className="g7g-ch";b.textContent=nm+"( )";b.onclick=function(){if(busy||api.locked())return;if(w=="o")outer=k;else inner=k;upd()};host.appendChild(b)})});
 Array.prototype.forEach.call(api.p().querySelectorAll(".g7g-st button"),function(b){b.onclick=function(){if(busy||api.locked())return;x=Math.max(rd.xmin,Math.min(rd.xmax,x+ +b.getAttribute("data-d")));upd()}});
 upd();
 document.getElementById(P+"g").onclick=async function(){if(busy||api.locked())return;busy=true;var r=val();
  if(!(await pwShoot(api,st)))return;
  if(r.v===rd.target)return pwWin(api,st,"-"+r.v,rd.why);
  st.bub=[150,64,130,"Не те! "+r.v];await pwMiss(api,st,"-"+r.v,"Вийшло "+r.v+", а щит має "+rd.target+" HP. Подай результат внутрішньої функції в зовнішню й переконайся, що виходить рівно "+rd.target+".");if(api.alive()){busy=false;draw()}}}
GM.power=function(g){engine(g,"pw","Функція – це готова здібність героя. Налаштуй виклик так, щоб вона завдала потрібної шкоди.",function(rd,api){
 if(rd.kind=="args")pwArgs(rd,api);else if(rd.kind=="chain")pwChain(rd,api);else pwOpts(rd,api)})};

/* ================= 20. Ательє вікон ================= */
var COL={yellow:"#ffe94a",green:"#58d05a",blue:"#4d9bff",pink:"#ff8fd0",red:"#ff5b6b",orange:"#ffa63d",white:"#ffffff",gray:"#e4e4e4",black:"#2a2a33",purple:"#b58cff"},K=.395;
function parseGeo(s){var m=/^(\d+)x(\d+)(?:\+(\d+)\+(\d+))?$/.exec(s);if(m)return m[3]!==undefined?{w:+m[1],h:+m[2],x:+m[3],y:+m[4]}:{w:+m[1],h:+m[2]};m=/^\+(\d+)\+(\d+)$/.exec(s);if(m)return{x:+m[1],y:+m[2]};return null}
function atWin(w,gh){var x=22+w.x*K,y=14+w.y*K,W=w.w*K,H=w.h*K,s="";
 if(gh)return "<rect x='"+x+"' y='"+y+"' width='"+W+"' height='"+(H+11)+"' rx='3' fill='#ff4fa3' fill-opacity='.14' stroke='#ff4fa3' stroke-width='2.5' stroke-dasharray='6 4'/><text x='"+(x+W-4)+"' y='"+(y+H+7)+"' text-anchor='end' font-size='8.5' font-weight='900' fill='#d81b84' stroke='#fff' stroke-width='2.5' paint-order='stroke'>ЕСКІЗ</text>";
 s+="<g filter='url(#sh)'><rect x='"+x+"' y='"+y+"' width='"+W+"' height='11' rx='3' fill='url(#ztb)' stroke='"+O+"' stroke-width='1.5'/><rect x='"+x+"' y='"+(y+11)+"' width='"+W+"' height='"+H+"' fill='"+(COL[w.bg]||w.bg)+"' stroke='"+O+"' stroke-width='1.5'/></g><text x='"+(x+5)+"' y='"+(y+8.3)+"' font-size='7.5' font-weight='800' fill='#fff'>"+esc(w.t)+"</text><circle cx='"+(x+W-6)+"' cy='"+(y+5.5)+"' r='2.6' fill='#ff5d6e'/><circle cx='"+(x+W-14)+"' cy='"+(y+5.5)+"' r='2.6' fill='#ffcf1f'/>";
 if(W>=64&&H>=46)s+="<g transform='translate("+(x+W/2)+","+(y+11+H/2+6)+") scale(.5)'>"+heroS().replace(/url\(#hO\)/g,"url(#hP)")+"</g>";
 return s}
function atScene(st){var s="<rect width='360' height='200' fill='url(#pnk)'/><rect x='14' y='6' width='332' height='188' rx='14' fill='"+O+"'/><rect x='22' y='14' width='316' height='172' rx='6' fill='url(#mint)'/><clipPath id='atclip'><rect x='22' y='14' width='316' height='172' rx='6'/></clipPath><g clip-path='url(#atclip)'>"+cloud(70,50,.9,.7)+cloud(280,150,.8,.6);
 if(st.ghost)s+=atWin(st.ghost,true);
 if(st.win)s+=atWin(st.win,false);
 s+="</g>";if(st.tag){var tw=Math.min(330,st.tag.length*7.2+28);s+=pill(180-tw/2,156,tw,st.tag,st.tagc)}return s}
var DEFW={t:"tk",w:200,h:200,x:40,y:30,bg:"gray"};
function atCopy(o){var r={};for(var k in o)r[k]=o[k];return r}
function atSliders(rd,api){var P=api.P,sk=rd.sketch,w=atCopy(DEFW),st={ghost:sk,win:w},busy=false;
 var F=[["w","ширина",100,500],["h","висота",100,300],["x","зліва",0,500],["y","зверху",0,250]];
 var h="<div class='g7g-card'><b>ЕСКІЗ</b> «"+esc(sk.t)+"» · "+sk.w+"×"+sk.h+" · зліва "+sk.x+" · зверху "+sk.y+" · "+sk.bg+"</div><div class='g7g-lb'>title</div><div class='g7g-row' id='"+P+"t'></div><div class='g7g-lb'>geometry</div>";
 F.forEach(function(f){h+="<div class='g7g-rg'><span>"+f[1]+"</span><input type='range' id='"+P+f[0]+"' min='"+f[2]+"' max='"+f[3]+"' step='50' value='"+w[f[0]]+"'><b id='"+P+f[0]+"b'>"+w[f[0]]+"</b></div>"});
 h+="<div class='g7g-lb'>bg</div><div class='g7g-row' id='"+P+"b'></div><div class='g7g-code'><pre class='py' id='"+P+"c'></pre></div><button class='g7g-go' id='"+P+"g'>✔ Перевірити</button>";
 api.p().innerHTML=h;
 function code(){document.getElementById(P+"c").innerHTML=hl("root.title('"+w.t+"')\nroot.geometry('"+w.w+"x"+w.h+"+"+w.x+"+"+w.y+"')\nroot['bg'] = '"+w.bg+"'")}
 function draw(){api.v(atScene(st));code();Array.prototype.forEach.call(document.getElementById(P+"t").children,function(b){b.className="g7g-ch"+(b.getAttribute("data-v")==w.t?" on":"")});Array.prototype.forEach.call(document.getElementById(P+"b").children,function(b){b.className="g7g-ch"+(b.getAttribute("data-v")==w.bg?" on":"")})}
 rd.titles.forEach(function(t){var b=document.createElement("button");b.setAttribute("data-v",t);b.textContent="«"+t+"»";b.onclick=function(){if(busy||api.locked())return;w.t=t;draw()};document.getElementById(P+"t").appendChild(b)});
 rd.bgs.forEach(function(c){var b=document.createElement("button");b.setAttribute("data-v",c);b.textContent=c;b.style.borderLeft="14px solid "+COL[c];b.onclick=function(){if(busy||api.locked())return;w.bg=c;draw()};document.getElementById(P+"b").appendChild(b)});
 F.forEach(function(f){document.getElementById(P+f[0]).oninput=function(){if(busy||api.locked()){this.value=w[f[0]];return}w[f[0]]=+this.value;document.getElementById(P+f[0]+"b").textContent=this.value;draw()}});
 draw();
 document.getElementById(P+"g").onclick=function(){if(api.locked())return;var d=[];if(w.t!==sk.t)d.push("заголовок");if(w.w!==sk.w||w.h!==sk.h)d.push("розмір");if(w.x!==sk.x||w.y!==sk.y)d.push("положення");if(w.bg!==sk.bg)d.push("колір");
  if(!d.length){st.ghost=null;api.v(atScene(st));api.good(rd.why)}else api.bad("Не збігається з ескізом: "+d.join(", ")+". Перевір рядки коду під екраном.")}}
function tiler(host,tiles,cb){var seq=[],api={locked:false},asm=document.createElement("div"),tr=document.createElement("div"),ct=document.createElement("div");asm.className="g7g-asm";tr.className="g7g-row";ct.className="g7g-row";host.appendChild(asm);host.appendChild(tr);host.appendChild(ct);
 function dsp(t){return t===" "?"␣":t}
 var btns=tiles.map(function(t,k){var b=document.createElement("button");b.className="g7g-ch";b.textContent=dsp(t);b.onclick=function(){if(api.locked||b.disabled)return;seq.push(k);draw()};tr.appendChild(b);return b});
 var bk=document.createElement("button");bk.className="g7g-ch";bk.textContent="⌫ Стерти";bk.onclick=function(){if(api.locked)return;seq.pop();draw()};var cl=document.createElement("button");cl.className="g7g-ch";cl.textContent="✖ Очистити";cl.onclick=function(){if(api.locked)return;seq=[];draw()};ct.appendChild(bk);ct.appendChild(cl);
 function draw(){asm.innerHTML=seq.length?seq.map(function(k){return "<span class='g7g-tk'>"+esc(dsp(tiles[k]))+"</span>"}).join(""):"<i>Торкай плитки внизу – вони складуться в рядок…</i>";btns.forEach(function(b,k){b.disabled=seq.indexOf(k)>=0});cb(api.str())}
 api.str=function(){return seq.map(function(k){return tiles[k]}).join("")};api.clear=function(){seq=[];draw()};draw();return api}
function atGeo(rd,api){var P=api.P,tg=parseGeo(rd.target),def=atCopy(DEFW),w=atCopy(def),gh=atCopy(def);for(var k in tg)gh[k]=tg[k];gh.t=rd.t||"tk";gh.bg=rd.bg||"gray";w.t=gh.t;w.bg=gh.bg;
 var st={ghost:gh,win:w,tag:""};api.p().innerHTML="<div class='g7g-code'><pre class='py' id='"+P+"c'></pre></div><div id='"+P+"t'></div><button class='g7g-go' id='"+P+"g'>▶ Застосувати</button>";
 var tl=tiler(document.getElementById(P+"t"),shuf(rd.tiles),function(s){var p=parseGeo(s),w2=atCopy(def);w2.t=w.t;w2.bg=w.bg;if(p)for(var k in p)w2[k]=p[k];st.win=w2;st.tag=s&&!p?"рядок не розпізнано":"";st.tagc="#ff8a9a";document.getElementById(P+"c").innerHTML=hl("root.geometry('"+s.replace(/ /g,"␣")+"')");api.v(atScene(st))});
 document.getElementById(P+"g").onclick=function(){if(api.locked())return;var s=tl.str();
  if(s===rd.target){tl.locked=true;st.ghost=null;api.v(atScene(st));api.good(rd.why)}
  else{var p=parseGeo(s);api.bad(p?"Рядок працює, але вікно вийшло не таким, як на ескізі. Порівняй числа й порядок.":"Python не розуміє цей рядок: між числами немає пропусків, розмір пишуть через x, а відступи – через +.");tl.clear()}}}
function atOrder(rd,api){var P=api.P,seq=[],busy=false,lines=shuf(rd.lines),EMPTY={tag:"екран порожній – запусти програму",tagc:"#ffe94a"};
 api.v(atScene(EMPTY));
 api.p().innerHTML="<div class='g7g-code'><pre class='py' id='"+P+"c'></pre></div><div class='g7g-row' id='"+P+"t'></div><div class='g7g-row'><button class='g7g-ch' id='"+P+"z'>⌫ Стерти</button></div><button class='g7g-go' id='"+P+"g' disabled>▶ Запустити</button>";
 function draw(){document.getElementById(P+"c").innerHTML=seq.length?hl(seq.map(function(k){return lines[k].c}).join("\n")):"<span style='color:#8b949e'># Торкай рядки внизу по черзі…</span>";Array.prototype.forEach.call(document.getElementById(P+"t").children,function(b,k){b.disabled=seq.indexOf(k)>=0});document.getElementById(P+"g").disabled=seq.length<lines.length}
 lines.forEach(function(l,k){var b=document.createElement("button");b.className="g7g-ch";b.textContent=l.c;b.onclick=function(){if(busy||api.locked())return;seq.push(k);draw()};document.getElementById(P+"t").appendChild(b)});
 document.getElementById(P+"z").onclick=function(){if(busy||api.locked())return;seq.pop();draw()};
 draw();
 document.getElementById(P+"g").onclick=async function(){if(busy||api.locked()||seq.length<lines.length)return;busy=true;
  var imp=false,root=false,loop=false,late=false,err="",w=atCopy(DEFW);
  seq.forEach(function(k){var l=lines[k];if(err)return;
   if(l.k=="imp")imp=true;
   else if(l.k=="tk"){if(!imp)err="NameError: Tk не визначено – спершу підключи модуль: from tkinter import *";else root=true}
   else if(l.k=="loop"){if(!root)err="NameError: root не визначено – вікно ще не створене";else loop=true}
   else{if(!root)err="NameError: root не визначено – спершу створи вікно: root = Tk()";else if(loop)late=true;else for(var q in l.set)w[q]=l.set[q]}});
  if(!err&&late)err="Команди після mainloop() не виконуються, доки вікно відкрите: налаштування не застосувались";
  await sleep(300);if(!api.alive())return;
  if(err){api.v(atScene(late?{win:atCopy(DEFW),tag:"налаштування не застосувались",tagc:"#ff8a9a"}:{tag:"помилка – вікна немає",tagc:"#ff8a9a"}));await sleep(800);if(!api.alive())return;api.v(atScene(EMPTY));seq=[];draw();busy=false;api.bad(err+".")}
  else{api.v(atScene({win:w}));await sleep(500);if(!api.alive())return;api.good(rd.why)}}}
GM.atelier=function(g){engine(g,"at","Збирай вікно за ескізом: налаштовуй властивості, складай рядок geometry й порядок команд програми.",function(rd,api){
 if(rd.kind=="sliders")atSliders(rd,api);else if(rd.kind=="geo")atGeo(rd,api);else atOrder(rd,api)})};

/* ================= 21. Пульт подій ================= */
var BC=["#ff4f6d","#ffcf1f","#3cc04a"],BX=[38,80,122],BY=126,GY=[30,92,148],GX=310,GN=["lamp","door","rocket"];
function bez(i,g,t){var p=[[BX[i],100],[BX[i],56],[200,GY[g]],[278,GY[g]]],u=1-t;return [u*u*u*p[0][0]+3*u*u*t*p[1][0]+3*u*t*t*p[2][0]+t*t*t*p[3][0],u*u*u*p[0][1]+3*u*u*t*p[1][1]+3*u*t*t*p[2][1]+t*t*t*p[3][1]]}
function wpath(i,g){return "M"+BX[i]+" 100 C"+BX[i]+" 56 200 "+GY[g]+" 278 "+GY[g]}
function puScene(st){var s="<rect width='360' height='200' fill='url(#night)'/>"+stars(34,5);
 if(st.mode=="scr"){var W=st.win,k=.22,x=171+W.x*k,y=21+W.y*k,ww=200*k,hh=150*k;
  s+="<g filter='url(#sh)'><rect x='166' y='16' width='186' height='116' rx='9' fill='#e8edf8' stroke='#fff' stroke-width='3'/></g><rect x='171' y='21' width='176' height='106' rx='4' fill='url(#mint)'/><clipPath id='puclip'><rect x='171' y='21' width='176' height='106'/></clipPath><g clip-path='url(#puclip)'><g filter='url(#sh)'><rect x='"+x+"' y='"+y+"' width='"+ww+"' height='7' rx='2' fill='url(#ztb)'/><rect x='"+x+"' y='"+(y+7)+"' width='"+ww+"' height='"+hh+"' fill='#fff' stroke='"+O+"' stroke-width='1.2'/></g><text x='"+(x+3)+"' y='"+(y+5.5)+"' font-size='5.5' font-weight='800' fill='#fff'>"+esc(W.t)+"</text></g><text x='259' y='150' text-anchor='middle' font-size='13' font-weight='900' fill='#ffe94a' font-family='monospace'>winfo_y() = "+W.y+"</text><text x='259' y='168' text-anchor='middle' font-size='10' font-weight='800' fill='#fff' font-family='monospace'>title: "+esc(W.t)+"</text>"}
 else{
  for(var i=0;i<3;i++){var g=st.wires[i];if(g<0)continue;
   if(st.brk===i){var q0=bez(i,g,.22);s+="<path id='puw"+i+"' d='"+wpath(i,g)+"' stroke='"+BC[i]+"' stroke-width='4.5' fill='none' stroke-linecap='round' stroke-dasharray='62 600' filter='url(#gl)'/><text x='"+(q0[0]+12)+"' y='"+(q0[1]+6)+"' font-size='20' text-anchor='middle'>✖</text><circle cx='"+(q0[0]+12)+"' cy='"+q0[1]+"' r='12' fill='none' stroke='#ff4f6d' stroke-width='2' stroke-dasharray='3 3'/>"}
   else s+="<path id='puw"+i+"' d='"+wpath(i,g)+"' stroke='"+BC[i]+"' stroke-width='4.5' fill='none' stroke-linecap='round' filter='url(#gl)'/>"}
  for(var q=0;q<3;q++){s+="<circle cx='278' cy='"+GY[q]+"' r='5' fill='#0d1117' stroke='#fff' stroke-width='2'/>"}
  s+="<circle cx='"+GX+"' cy='"+(GY[0]-6)+"' r='"+(st.lamp?34:0)+"' fill='url(#glowY)'/><g filter='url(#sh)'><circle cx='"+GX+"' cy='"+(GY[0]-6)+"' r='13' fill='"+(st.lamp?"url(#gold)":"#6b7190")+"' stroke='"+O+"' stroke-width='3'/><rect x='"+(GX-8)+"' y='"+(GY[0]+6)+"' width='16' height='9' rx='3' fill='url(#silv)' stroke='"+O+"' stroke-width='2.5'/></g>";
  s+="<g filter='url(#sh)'><rect x='"+(GX-22)+"' y='"+(GY[1]-26)+"' width='44' height='54' rx='5' fill='"+(st.door?"#1a0b3d":"#5a3a1a")+"' stroke='"+O+"' stroke-width='3'/>"+(st.door?"<path d='M"+(GX-22)+" "+(GY[1]-26)+" L"+(GX-6)+" "+(GY[1]-20)+" L"+(GX-6)+" "+(GY[1]+22)+" L"+(GX-22)+" "+(GY[1]+28)+"Z' fill='url(#wood)' stroke='"+O+"' stroke-width='2.5'/><circle cx='"+(GX+4)+"' cy='"+(GY[1]+4)+"' r='6' fill='#ffd84a' opacity='.8'/>":"<rect x='"+(GX-18)+"' y='"+(GY[1]-22)+"' width='36' height='46' rx='3' fill='url(#wood)'/><circle cx='"+(GX+10)+"' cy='"+(GY[1]+2)+"' r='3' fill='#ffd84a' stroke='"+O+"' stroke-width='1.5'/>")+"</g>";
  var ry=GY[2]+8-st.rocket*190;s+="<g transform='translate("+GX+","+ry+")' filter='url(#sh)'>"+(st.rocket>0?"<path d='M-6 14 Q0 "+(30+st.rocket*10)+" 6 14Z' fill='#ff9d1f' stroke='#fff' stroke-width='1.5'/>":"")+"<path d='M-10 14 L-18 22 L-8 18Z M10 14 L18 22 L8 18Z' fill='#ff4f6d' stroke='"+O+"' stroke-width='2'/><path d='M0 -26 Q12 -10 10 14 L-10 14 Q-12 -10 0 -26Z' fill='url(#silv)' stroke='"+O+"' stroke-width='3'/><circle cx='0' cy='-6' r='5' fill='url(#water)' stroke='"+O+"' stroke-width='2'/></g>";
  for(var q2=0;q2<3;q2++)s+="<text x='"+(GX+4)+"' y='"+(GY[q2]+(q2==0?32:q2==1?44:38))+"' text-anchor='middle' font-size='9' font-weight='800' fill='#fff' font-family='monospace' opacity='.8'>"+GN[q2]+"</text>"}
 s+="<g filter='url(#sh)'><rect x='10' y='96' width='140' height='92' rx='16' fill='url(#silv)' stroke='#fff' stroke-width='3'/></g><text x='80' y='181' text-anchor='middle' font-size='11' font-weight='900' fill='"+O+"'>ПУЛЬТ</text>";
 for(var b=0;b<3;b++){var on=st.lit===b;s+=(on?"<circle cx='"+BX[b]+"' cy='"+BY+"' r='24' fill='"+BC[b]+"' opacity='.45' filter='url(#bl)'/>":"")+(st.sel===b?"<circle cx='"+BX[b]+"' cy='"+BY+"' r='20' fill='none' stroke='"+O+"' stroke-width='3' stroke-dasharray='4 3'/>":"")+"<circle cx='"+BX[b]+"' cy='"+BY+"' r='"+(on?12:14)+"' fill='"+BC[b]+"' stroke='"+O+"' stroke-width='3'/><ellipse cx='"+(BX[b]-4)+"' cy='"+(BY-5)+"' rx='5' ry='3' fill='#fff' opacity='.55'/><text x='"+BX[b]+"' y='"+(BY+30)+"' text-anchor='middle' font-size='8.5' font-weight='800' fill='"+O+"' font-family='monospace'>"+esc(st.labels[b])+"</text>"}
 if(st.bub)s+=bub(st.bub[0],st.bub[1],st.bub[2],28,st.bub[3],"#ffe3e8","#c0183a",false);
 if(st.sig)s+="<circle cx='"+st.sig[0]+"' cy='"+st.sig[1]+"' r='6' fill='#fff' stroke='"+BC[st.sig[2]]+"' stroke-width='3' filter='url(#gl)'/>";
 return s}
function puNew(o){var st={mode:"gad",wires:[-1,-1,-1],lit:-1,sel:-1,lamp:false,door:false,rocket:0,brk:-1,bub:null,sig:null,labels:["Click","2×Click","Key"],win:{x:260,y:100,t:"tk"}};for(var k in o)st[k]=o[k];return st}
async function puFire(api,st,i,g){
 st.lit=i;api.v(puScene(st));await sleep(240);if(!api.alive())return;
 if(g<0){st.bub=[150,GY[0]-14,130,"Немає обробника"];api.v(puScene(st));await sleep(700)}
 else{var pe=document.getElementById("puw"+i);if(pe){var L=pe.getTotalLength();for(var k=0;k<=10;k++){var pt=pe.getPointAtLength(L*k/10);st.sig=[pt.x,pt.y,i];api.v(puScene(st));pe=document.getElementById("puw"+i);await sleep(35);if(!api.alive())return;pe=document.getElementById("puw"+i)}st.sig=null}
  if(g==0)st.lamp=true;else if(g==1)st.door=true;else{for(var q=1;q<=10;q++){st.rocket=q/10;api.v(puScene(st));await sleep(40);if(!api.alive())return}}}
 st.lit=-1;st.bub=null;api.v(puScene(st));await sleep(200)}
function puReset(st){st.lamp=false;st.door=false;st.rocket=0;st.bub=null;st.sig=null;st.lit=-1}
function puWire(rd,api){var P=api.P,st=puNew({}),busy=false,sel=-1,BI=["'<1>'","'<Double-Button-1>'","'<KeyPress>'"],EF=["вмикає лампу","відчиняє двері","запускає ракету"];
 api.v(puScene(st));
 api.p().innerHTML="<div class='g7g-lb'>1. Обери подію</div><div class='g7g-row' id='"+P+"e'></div><div class='g7g-lb'>2. Обери обробник</div><div class='g7g-row' id='"+P+"h'></div><div class='g7g-code'><pre class='py' id='"+P+"c'></pre></div><button class='g7g-go' id='"+P+"g'>⚡ Випробувати пульт</button>";
 function draw(){st.sel=sel;api.v(puScene(st));var c=[];st.wires.forEach(function(g,i){if(g>=0)c.push("root.bind("+BI[i]+", "+GN[g]+")")});document.getElementById(P+"c").innerHTML=c.length?hl(c.join("\n")):"<span style='color:#8b949e'># зв’язків ще немає</span>";Array.prototype.forEach.call(document.getElementById(P+"e").children,function(b,i){b.className="g7g-ch"+(i===sel?" on":"")});Array.prototype.forEach.call(document.getElementById(P+"h").children,function(b,g){b.className="g7g-ch"+(st.wires.indexOf(g)>=0?" ok":"")})}
 [0,1,2].forEach(function(i){var b=document.createElement("button");b.className="g7g-ch";b.style.borderLeft="14px solid "+BC[i];b.textContent=st.labels[i]+" "+["🖱","🖱🖱","⌨"][i];b.onclick=function(){if(busy||api.locked())return;sel=sel===i?-1:i;draw()};document.getElementById(P+"e").appendChild(b)});
 GN.forEach(function(nm,g){var b=document.createElement("button");b.className="g7g-ch";b.textContent=nm+"(event)";b.onclick=function(){if(busy||api.locked())return;if(sel<0){api.msg("☝️ Спершу торкни подію (кнопку пульта), а потім – обробник.","");return}
  for(var k=0;k<3;k++)if(st.wires[k]===g)st.wires[k]=-1;st.wires[sel]=g;sel=-1;draw()};document.getElementById(P+"h").appendChild(b)});
 draw();
 document.getElementById(P+"g").onclick=async function(){if(busy||api.locked())return;busy=true;puReset(st);st.sel=-1;sel=-1;var wrong=[];
  for(var i=0;i<3;i++){await puFire(api,st,i,st.wires[i]);if(!api.alive())return;if(st.wires[i]!==rd.map[i])wrong.push(i)}
  await sleep(300);if(!api.alive())return;
  if(!wrong.length)return api.good(rd.why);
  var w=wrong[0],t=st.wires[w]<0?"На кнопку «"+st.labels[w]+"» не підключено обробника – пульт нічого не зробив.":"Кнопка «"+st.labels[w]+"» запустила "+GN[st.wires[w]]+", а мала "+EF[rd.map[w]]+".";
  puReset(st);draw();api.bad(t);busy=false}}
function puBug(rd,api){var P=api.P,k=0,busy=false,st=puNew({});
 function stage(){var S=rd.stages[k];api.msg(null);st.wires=[-1,-1,-1];st.wires[S.evt]=S.gad;st.brk=S.evt;puReset(st);api.v(puScene(st));
  api.p().innerHTML="<div class='g7g-lb'>Етап "+(k+1)+" з "+rd.stages.length+" · торкни рядок із помилкою</div><div id='"+P+"k'>"+codeBox(S.code,-1)+"</div>";
  Array.prototype.forEach.call(api.p().querySelectorAll(".cl"),function(el){el.style.cursor="pointer";el.onclick=async function(){if(busy||api.locked())return;var j=+el.getAttribute("data-k");
   if(j!==S.bad){el.classList.add("badl");api.bad("Цей рядок правильний. Шукай помилку в іншому місці: подумай про параметр обробника та запис у bind.");setTimeout(function(){el.classList.remove("badl")},700);return}
   busy=true;el.classList.add("okl");st.brk=-1;api.v(puScene(st));api.msg("🔧 "+S.why,"g");await puFire(api,st,S.evt,S.gad);if(!api.alive())return;
   if(k<rd.stages.length-1){k++;busy=false;await sleep(600);if(!api.alive())return;stage()}else api.good(rd.why)}})}
 stage()}
function puPredict(rd,api){var P=api.P,st=puNew({mode:"scr",labels:rd.labels,win:{x:260,y:rd.y0,t:"tk"}}),busy=false,H=rd.H;
 api.v(puScene(st));
 api.p().innerHTML=pre(rd.code)+"<div class='g7g-card'>Події по черзі: <b>"+rd.evs.map(function(e){return rd.labels[e]}).join(" → ")+"</b></div><div class='g7g-row' id='"+P+"o'></div>";
 var fy=rd.y0;rd.evs.forEach(function(e){if(H[e].dy)fy+=H[e].dy});
 shuf(rd.opts).forEach(function(v){var b=document.createElement("button");b.className="g7g-ch";b.textContent="y = "+v;
  b.onclick=async function(){if(busy||api.locked()||b.disabled)return;busy=true;b.disabled=true;st.win={x:260,y:rd.y0,t:"tk"};api.v(puScene(st));await sleep(300);
   for(var i=0;i<rd.evs.length;i++){var h=H[rd.evs[i]];st.lit=rd.evs[i];api.v(puScene(st));await sleep(380);if(!api.alive())return;if(h.dy)st.win.y+=h.dy;if(h.title)st.win.t=h.title;st.lit=-1;api.v(puScene(st));await sleep(380);if(!api.alive())return}
   if(v===fy)api.good(rd.why);else{b.classList.add("no");api.bad("Ти вибрав y = "+v+", а вікно зупинилось на y = "+fy+". Простеж, як кожен обробник змінює поточне значення.")}busy=false};
  document.getElementById(P+"o").appendChild(b)})}
function puBind(rd,api){var P=api.P,k=0,busy=false,st=puNew({});
 function step(){var S=rd.steps[k];api.v(puScene(st));
  api.p().innerHTML="<div class='g7g-card'><b>"+(k+1)+" / "+rd.steps.length+".</b> "+S.task+"</div><div id='"+P+"t'></div><button class='g7g-go' id='"+P+"g'>🔌 Підключити</button>";
  var tl=tiler(document.getElementById(P+"t"),shuf(S.tiles),function(){});
  document.getElementById(P+"g").onclick=async function(){if(busy||api.locked())return;var s=tl.str();
   if(S.ok.indexOf(s)<0){api.bad((s.indexOf("()")>=0?"Дужки після імені обробника викликають його одразу, а не під час події.":"Перевір запис: першою йде подія в лапках, другим – ім’я обробника без дужок і без зайвого.")+" Зараз: "+esc(s||"порожньо")+".");tl.clear();return}
   busy=true;tl.locked=true;st.wires[S.evt]=S.gad;api.v(puScene(st));await sleep(300);await puFire(api,st,S.evt,S.gad);if(!api.alive())return;
   if(k<rd.steps.length-1){k++;busy=false;step()}else api.good(rd.why)}}
 step()}
GM.pult=function(g){engine(g,"pu","Кожна кнопка пульта – подія. Вона керує гаджетом лише тоді, коли подію пов’язано з обробником за допомогою bind.",function(rd,api){
 if(rd.kind=="wire")puWire(rd,api);else if(rd.kind=="bug")puBug(rd,api);else if(rd.kind=="predict")puPredict(rd,api);else puBind(rd,api)})};

/* стилі */
var sty=document.createElement("style");sty.textContent=".g7g-sc{margin:8px 0}.g7g-sc svg{display:block;width:100%;border:4px solid "+O+";border-radius:20px;box-shadow:0 5px 0 "+O+"}.g7g-q{color:#fff;text-align:center;font-weight:800;margin:10px 4px;line-height:1.35}.g7g-q code{background:#eef;padding:0 4px;border-radius:5px}"+
".g7g-m{margin:8px 0;padding:9px 11px;border-radius:12px;border:3px solid "+O+";font-size:13px;line-height:1.4;color:"+O+";background:#fff}.g7g-m.g{background:#e4ffe0;border-color:#2fb52a}.g7g-m.r{background:#ffe3e8;border-color:#e0314f}"+
".g7g-row{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;align-items:center;justify-content:center}.g7g-lb{font-size:11px;font-weight:900;color:#cfd6ff;opacity:.75;margin:6px 2px 0;text-transform:uppercase;letter-spacing:.04em}"+
"#app .g7g-ch{text-shadow:none;text-align:center;width:auto;display:inline-block;border:3px solid "+O+";background:#fff;color:"+O+";border-radius:12px;padding:6px 10px;font:800 13px ui-monospace,Consolas,monospace;box-shadow:0 3px 0 "+O+";cursor:pointer;min-height:40px;margin:0}#app .g7g-ch.on{background:#ffe94a}#app .g7g-ch:disabled{opacity:.4;box-shadow:none}#app .g7g-ch.ok{background:#c9f7c4}#app .g7g-ch.no{background:#ffd0d8}"+
".g7g-st{display:flex;align-items:center;gap:8px;background:#fff;border:3px solid "+O+";border-radius:14px;padding:4px 8px;margin:4px 0}.g7g-st code{flex:1;font:900 15px ui-monospace,Consolas,monospace;color:"+O+"}#app .g7g-st button{text-shadow:none;margin:0;width:42px;height:38px;border-radius:10px;border:3px solid "+O+";background:#ffd36a;font:900 20px sans-serif;color:"+O+";box-shadow:0 3px 0 "+O+";cursor:pointer;padding:0}.g7g-st b{min-width:36px;text-align:center;font:900 18px ui-monospace,Consolas,monospace;color:"+O+"}"+
"#app .g7g-go{text-transform:none;display:block;width:100%;margin:8px 0;padding:12px;border-radius:14px;background:linear-gradient(#8dff5a,#1fb524);color:#fff;font-size:18px;font-weight:900;border:3px solid "+O+";box-shadow:0 4px 0 "+O+";text-shadow:0 2px 0 #0003;cursor:pointer}#app .g7g-go:disabled{filter:grayscale(1);opacity:.5}"+
".g7g-call,.g7g-code{margin:6px 0;background:#0d1117;border-radius:12px;padding:8px 10px;color:#e6edf3;font:13px/1.6 ui-monospace,Consolas,monospace;box-shadow:inset 0 0 0 2px "+O+"}.g7g-code pre{margin:0;background:none;white-space:pre-wrap;color:#e6edf3;font:inherit}.g7g-res{color:#8b949e;font-size:12px}.g7g-res b{color:#7ee787}"+
".g7g-card{margin:6px 0;padding:8px 10px;border-radius:12px;background:#fff3b8;border:3px dashed "+O+";color:"+O+";font-size:13px;line-height:1.4;font-weight:700}"+
".g7g-rg{display:flex;align-items:center;gap:8px;color:#fff;font-weight:800;font-size:13px;margin:2px 0}.g7g-rg span{width:64px}.g7g-rg input{flex:1;height:30px;accent-color:#ff4fa3}.g7g-rg b{width:34px;text-align:right;font-family:monospace}"+
".g7g-asm{min-height:44px;margin:6px 0;padding:6px;background:#0d1117;border-radius:12px;box-shadow:inset 0 0 0 2px "+O+";display:flex;flex-wrap:wrap;gap:4px;align-items:center}.g7g-asm i{color:#8b949e;font-size:12px}.g7g-tk{background:#1f3a5f;color:#7ee787;border-radius:7px;padding:3px 7px;font:700 13px ui-monospace,Consolas,monospace}"+
"#app .g7g-opts{display:flex;flex-direction:column;gap:8px;margin:8px 0}#app .g7g-opt{text-shadow:none;width:100%;display:block;margin:0;border:3px solid "+O+";background:#fff;border-radius:14px;padding:4px;box-shadow:0 3px 0 "+O+";text-align:left;cursor:pointer;color:"+O+";font:800 13px ui-monospace,Consolas,monospace}#app .g7g-opt:disabled{opacity:.5}#app .g7g-opt.no{background:#ffd0d8}#app .g7g-opt .pyb{margin:0}#app .g7g-opt code{display:block;padding:6px 8px;font-size:14px}";
document.head.appendChild(sty);
if(typeof GI7!="undefined"){GI7.power=["🦸","Суперздібності"];GI7.atelier=["🖼️","Ательє вікон"];GI7.pult=["🎛️","Пульт подій"]}

/* дані */
if(typeof LES!="undefined"){
if(LES[719])LES[719].g.push({type:"power",title:"Суперздібності",hint:"Функція – це здібність героя з іменем. Аргументи задають силу, а return повертає результат удару. Влучай точно!",rounds:[
 {kind:"args",q:"Два слайми по 60 HP. Налаштуй аргументи виклику, щоб boom повернула 60, а радіус r ≥ 3 дістав до обох слаймів.",def:["def boom(r, dmg):","    return r * dmg"],name:"boom",params:[{n:"r",min:1,max:9,v:1},{n:"dmg",min:10,max:50,step:10,v:10}],rIdx:0,f:function(a){return a[0]*a[1]},target:60,minR:3,sl:[60,60],why:"boom(3, 20) і boom(6, 10) дають 60: аргументи потрапили в r і dmg, а return повернув добуток."},
 {kind:"opts",q:"Слайм має 40 HP. Виклик <code>d = strike(5)</code> має покласти в d шкоду 40. Яка версія функції це зробить?",call:"d = strike(5)",target:40,opts:[{code:["def strike(p):","    return p * 8"],v:40},{code:["def strike(p):","    d = p * 8"],bad:"Без return функція повертає None: у змінну d нічого не потрапило, слайм цілий."},{code:["def strike(p):","    print(p * 8)"],bad:"print лише показує 40 на екрані, але не повертає значення – d стало None."}],why:"return повертає результат у місце виклику, тому d отримала 40."},
 {kind:"opts",q:"Здібність «Комбо» має завдати 14 шкоди. Який виклик правильний?",def:["def combo(a, b, c):","    return a + b * c"],call:"combo(...)",target:14,opts:[{t:"combo(2, 3, 4)",v:14},{t:"combo(2, 3)",err:1,bad:"TypeError: функція чекає 3 аргументи, а передано 2."},{t:"combo 2, 3, 4",err:1,bad:"SyntaxError: у виклику функції потрібні дужки."},{t:"combo(3, 2, 4)",v:11,bad:"Виклик працює, але 3 + 2 · 4 = 11. Значення потрапляють в аргументи за порядком."}],why:"Три значення в дужках потрапили в a, b, c за порядком: 2 + 3 · 4 = 14."},
 {kind:"chain",q:"Щит боса має 36 HP. Склади виклик зовнішня(внутрішня(x)) так, щоб результат став 36.",fns:[["double","x * 2",function(x){return x*2}],["plus","x + 10",function(x){return x+10}],["sq","x * x",function(x){return x*x}]],x0:1,xmin:1,xmax:12,target:36,why:"Результат внутрішньої функції став аргументом зовнішньої: так підпрограми комбінують у ланцюжок."}]});
if(LES[720])LES[720].g.push({type:"atelier",title:"Ательє вікон",hint:"Збери вікно за ескізом: налаштуй title, geometry і bg, склади рядок geometry та правильний порядок команд.",rounds:[
 {kind:"sliders",q:"Налаштуй вікно так, щоб воно збіглося з ескізом (рожевий пунктир на екрані).",sketch:{t:"Привіт",w:300,h:200,x:100,y:50,bg:"yellow"},titles:["Привіт","Вікно","tk"],bgs:["yellow","green","blue","pink"],why:"title, geometry і bg збігаються з ескізом."},
 {kind:"geo",q:"Склади рядок geometry: ширина 400, висота 250, відступ зліва 60 і зверху 40. Пропусків у рядку немає!",target:"400x250+60+40",tiles:["400","x","250","+","60","+","40"," ","*"],t:"Гра",bg:"pink",why:"Формат: ширинаxвисота+зліва+зверху."},
 {kind:"order",q:"Склади програму в правильному порядку й запусти її. Вікно мусить отримати заголовок «Гра», розмір 300x200 і колір pink.",lines:[{c:"from tkinter import *",k:"imp"},{c:"root = Tk()",k:"tk"},{c:"root.title('Гра')",k:"p",set:{t:"Гра"}},{c:"root.geometry('300x200+80+40')",k:"p",set:{w:300,h:200,x:80,y:40}},{c:"root['bg'] = 'pink'",k:"p",set:{bg:"pink"}},{c:"root.mainloop()",k:"loop"}],why:"Спершу import і Tk(), потім налаштування, а mainloop() – останньою командою."},
 {kind:"geo",q:"Не змінюючи розміру, перенеси вікно: 300 пікселів від лівого краю й 120 від верхнього. Ескіз показує, куди.",target:"+300+120",tiles:["+","300","+","120","x","200","-"],t:"tk",bg:"gray",why:"Можна задати лише положення: '+300+120'."}]});
if(LES[721])LES[721].g.push({type:"pult",title:"Пульт подій",hint:"Кнопка пульта – це подія. Гаджет відповідає лише тоді, коли подію пов’язано з обробником за допомогою bind.",rounds:[
 {kind:"wire",q:"Підключи обробники: клацання → відчиняє двері; подвійне клацання → запускає ракету; клавіша → вмикає лампу.",map:[1,2,0],why:"Кожна подія має свій обробник: root.bind(подія, обробник)."},
 {kind:"bug",q:"Дріт обірвано: гаджет мовчить. Знайди рядок із помилкою в коді.",stages:[
  {evt:0,gad:0,code:["from tkinter import *","root = Tk()","def lamp(event):","    root['bg'] = 'yellow'","root.bind('<1>', lamp())","root.mainloop()"],bad:4,why:"В bind обробник передають за іменем, без дужок: lamp."},
  {evt:2,gad:1,code:["def door():","    root['bg'] = 'green'","root.bind('<KeyPress>', door)"],bad:0,why:"Обробнику потрібен параметр: def door(event):"}],why:"Обидва дроти полагоджено: параметр event і ім’я без дужок."},
 {kind:"predict",q:"Вікно стоїть на y = 100. Простеж за подіями й вибери, яким буде root.winfo_y() наприкінці.",labels:["Click","Motion","Key"],y0:100,evs:[0,0,1,2,0],H:[{dy:50},{dy:-20},{title:"Ключ"}],opts:[230,250,180],code:["def down(event):","    t = root.winfo_y() + 50","    root.geometry(f'+260+{t}')","def up(event):","    t = root.winfo_y() - 20","    root.geometry(f'+260+{t}')","def key(event):","    root.title('Ключ')","root.bind('<1>', down)","root.bind('<Motion>', up)","root.bind('<KeyPress>', key)"],why:"Кожен обробник бере поточне значення: 100 → 150 → 200 → 180 → 180 → 230."},
 {kind:"bind",q:"Склади виклики bind із плиток: першою йде подія, другим – ім’я обробника без дужок.",steps:[
  {task:"Клацання лівою кнопкою → обробник <b>lamp</b>.",evt:0,gad:0,ok:["root.bind('<1>', lamp)","root.bind('<Button-1>', lamp)"],tiles:["root.bind(","'<1>'",", ","lamp",")","lamp()","'<Click>'","'<Button-1>'"]},
  {task:"Подвійне клацання → обробник <b>door</b>.",evt:1,gad:1,ok:["root.bind('<Double-Button-1>', door)"],tiles:["root.bind(","'<Double-Button-1>'",", ","door",")","door()","'<1>'"]},
  {task:"Натискання клавіші → обробник <b>rocket</b>.",evt:2,gad:2,ok:["root.bind('<KeyPress>', rocket)"],tiles:["root.bind(","'<KeyPress>'",", ","rocket",")","rocket()","'<Key>'","rocket(event)"]}],why:"bind(подія, обробник) пов’язує подію з підпрограмою – гаджети оживають."}]});
}
})();

/* ===== 7 клас · уроки 22–24 · великі ігри: «Поштова вежа», «Карта арени», «Фінальний бій» ===== */
(function(){
var A=A7,O=A.O,DEFS=A.DEFS,esc=A.esc,heroS=A.heroS,cloud=A.cloud,spark=A.spark,bar=A.bar;
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function hero(x,y,s,g){return "<g transform='translate("+x+","+y+") scale("+s+")'>"+(g?heroS().replace(/hO/g,g):heroS())+"</g>"}
function wrap(s,m){var w=String(s).split(" "),L=[],c="";w.forEach(function(x){if(c&&(c+" "+x).length>m){L.push(c);c=x}else c=c?c+" "+x:x});if(c)L.push(c);return L}
function hearts(l){return "❤️".repeat(Math.max(0,l))+"🖤".repeat(Math.max(0,3-l))}
function shuf(n){var a=[],i,j,t;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=a[i];a[i]=a[j];a[j]=t}return a}
function ground(y){return "<rect y='"+y+"' width='340' height='"+(210-y)+"' fill='url(#grass)'/><path d='M0 "+y+" Q28 "+(y-6)+" 57 "+y+" T114 "+y+" T171 "+y+" T228 "+y+" T285 "+y+" T340 "+y+"' stroke='#fff' stroke-opacity='.5' stroke-width='2' fill='none'/>"}
function burst(x,y,s){return "<g transform='translate("+x+","+y+") scale("+s+")' filter='url(#gl)'><circle r='20' fill='url(#glowY)'/><path d='M0 -22 L5 -8 L20 -12 L10 0 L22 10 L6 8 L0 22 L-6 8 L-22 10 L-10 0 L-20 -12 L-5 -8Z' fill='#ff9d1f' stroke='#fff' stroke-width='2'/><path d='M0 -13 L3 -5 L12 -7 L6 0 L13 6 L4 5 L0 13 L-4 5 L-13 6 L-6 0 L-12 -7 L-3 -5Z' fill='#fff35c'/></g>"}
function msgBox(el,t,k){el.style.display="";el.className=el.className.replace(/\s(red|green|blue)/g,"")+" "+k;el.innerHTML=t}
function codeBox(lines,mark){return lines.map(function(l,k){return "<div"+(mark==k?" class='now'":"")+">"+(k+1)+" <i>"+esc(l)+"</i></div>"}).join("")}
function mark(el,a){Array.prototype.forEach.call(el.children,function(c){if(+c.getAttribute("data-k")===a)c.className+=" hint"})}

/* ======================= УРОК 22 · ПОШТОВА ВЕЖА ======================= */
function winS(k,t,x,w){var c={i:["#2d9cf0","ℹ️"],w:["#f0a800","⚠️"],e:["#e0314f","⛔"]}[k],ls=wrap(x,Math.floor(w/6.3)),h=36+ls.length*13+22;
 var s="<g filter='url(#sh)'><rect width='"+w+"' height='"+h+"' rx='9' fill='#fff' stroke='"+O+"' stroke-width='3'/><rect width='"+w+"' height='18' rx='8' fill='"+c[0]+"'/><rect y='10' width='"+w+"' height='8' fill='"+c[0]+"'/><text x='7' y='13.5' font-size='10' font-weight='800' fill='#fff'>"+c[1]+" "+esc(t)+"</text>";
 ls.forEach(function(l,j){s+="<text x='"+(w/2)+"' y='"+(36+j*13)+"' text-anchor='middle' font-size='10.5' font-weight='800' fill='"+O+"'>"+esc(l)+"</text>"});
 return {h:h,s:s+"<rect x='"+(w/2-19)+"' y='"+(h-20)+"' width='38' height='14' rx='5' fill='url(#btn)' stroke='"+O+"' stroke-width='2'/><text x='"+(w/2)+"' y='"+(h-9.5)+"' text-anchor='middle' font-size='9.5' font-weight='900' fill='#fff'>OK</text></g>"}}
function twBase(){return "<rect width='340' height='210' fill='url(#sky2)'/>"+cloud(70,26,.8,.9)+cloud(300,36,.6,.9)+cloud(210,20,.5,.8)+ground(160)+
 "<g filter='url(#sh)'><path d='M24 162 L34 52 H76 L86 162Z' fill='url(#silv)' stroke='"+O+"' stroke-width='3.5'/><path d='M29 124 H81 M27 142 H83' stroke='"+O+"' stroke-opacity='.22' stroke-width='3'/><rect x='36' y='68' width='38' height='26' rx='6' fill='url(#sky)' stroke='"+O+"' stroke-width='3'/><rect x='43' y='116' width='24' height='46' rx='12' fill='url(#wood)' stroke='"+O+"' stroke-width='3'/><circle cx='62' cy='140' r='2.5' fill='#ffcf1f'/><path d='M26 52 L55 20 L84 52Z' fill='url(#sR)' stroke='"+O+"' stroke-width='3.5' stroke-linejoin='round'/><rect x='42' y='50' width='26' height='6' rx='3' fill='#fff' opacity='.5'/></g>"+
 "<circle cx='55' cy='42' r='24' fill='url(#glowY)' opacity='.8'/><circle id='twl' cx='55' cy='42' r='7' fill='#ffe94a' stroke='"+O+"' stroke-width='2.5'/>"}
function tbub(x,y,w,ls,col){var h=ls.length*14+14,s="<g filter='url(#sh)'><path d='M"+(x+14)+" "+(y+h-1)+" l-9 13 l24 -13Z' fill='"+col+"' stroke='"+O+"' stroke-width='2.5' stroke-linejoin='round'/><rect x='"+x+"' y='"+y+"' width='"+w+"' height='"+h+"' rx='11' fill='"+col+"' stroke='"+O+"' stroke-width='2.5'/><rect x='"+(x+10)+"' y='"+(y+h-4)+"' width='22' height='5' fill='"+col+"'/>";
 ls.forEach(function(l,j){s+="<text x='"+(x+w/2)+"' y='"+(y+17+j*14)+"' text-anchor='middle' font-size='11.5' font-weight='800' fill='"+O+"'>"+esc(l)+"</text>"});return s+"</g>"}
GM.tower=function(g){var R=g.rounds,n=R.length,i=0,sc=0,lives=3,KN=["i","w","e"];
 function show(){var rd=R[i],busy=false,win=rd.mode=="win",res=rd.res,ord=win?[0,1,2]:shuf(rd.opts.length);
  if(win)res=KN.map(function(k){return [k,rd.t,rd.x||rd.sit]});
  fr9(g.title,g.hint||"Вежа отримує листи з ситуаціями. Обери, яке вікно повідомлення чи яка команда потрібні, і подивись, що з’явиться на екрані.",
   "<div class='twsc'><svg id='twsv' viewBox='0 0 340 210' xmlns='http://www.w3.org/2000/svg'>"+DEFS+twBase()+"<g id='twh2'></g><g id='twe' style='transition:transform .7s ease-in-out;transform:translate(55px,78px);opacity:0'><g transform='translate(-12,-8)'><rect width='24' height='16' rx='3' fill='#fff' stroke='"+O+"' stroke-width='2'/><path d='M1 2 L12 10 L23 2' stroke='"+O+"' stroke-width='2' fill='none'/></g></g><g id='twr'></g><g id='twx'></g></svg></div><div class='twq'>"+rd.q+"</div>"+
   (rd.code?"<div class='twc'>"+codeBox(rd.code,rd.code.indexOf("???"))+"</div>":"")+"<div class='twopt "+(win?"win":"txt")+"' id='two'></div><div class='twm' id='twm' style='display:none'></div>");
  gs9((i+1)+" / "+n+" · ✅ "+sc+" · "+hearts(lives));
  var gh=document.getElementById("twh2"),ge=document.getElementById("twe"),gr=document.getElementById("twr"),gx=document.getElementById("twx"),lamp=document.getElementById("twl"),tw=document.getElementById("two"),tm=document.getElementById("twm");
  gh.innerHTML=hero(165,134,1);
  gx.innerHTML=tbub(112,14,214,wrap("✉ "+rd.sit,30),"#fff8cc");
  var ICO=["ℹ️","⚠️","⛔"],SUB=["інформація","попередження","помилка"];
  ord.forEach(function(k){var b=document.createElement("div");b.className=win?"twb":"twb tx";b.setAttribute("data-k",k);
   b.innerHTML=win?"<div class='ic'>"+ICO[k]+"</div><b>"+rd.opts[k]+"</b><small>"+SUB[k]+"</small>":"<code>"+esc(rd.opts[k])+"</code>";
   b.onclick=function(){pick(k,b)};tw.appendChild(b)});
  async function pick(k,b){if(busy)return;busy=true;var ok=k===rd.a,r=res[k],cnt=r[3]||1;
   b.className+=ok?" ok":" bad";ge.style.opacity=1;await sleep(30);ge.style.transform="translate(165px,88px)";await sleep(750);ge.style.opacity=0;
   gx.innerHTML="";var d=winS(r[0],r[1],r[2],cnt>1?150:200),h="";
   for(var j=0;j<cnt;j++){var ox=cnt>1?124+j*24:122,oy=cnt>1?8+j*13:12;h+="<g transform='translate("+ox+","+oy+")'><g style='transform-box:fill-box;transform-origin:center;animation:twpop .35s ease-out'>"+d.s+"</g></g>";gx.innerHTML=h;if(cnt>1)await sleep(260)}
   if(cnt>1)gx.innerHTML+="<text x='230' y='"+(8+(cnt-1)*13+d.h+14)+"' text-anchor='middle' font-size='11' font-weight='900' fill='#fff' stroke='"+O+"' stroke-width='3' paint-order='stroke'>вікна лізуть знову й знову!</text>";
   lamp.setAttribute("fill",ok?"#6bff6b":"#ff4f6d");
   gr.innerHTML=ok?spark(118,70,.8)+spark(322,112,.7,"#fff")+spark(215,112,.6):"";
   if(!ok)mark(tw,rd.a);
   if(ok)sc++;else lives--;
   msgBox(tm,(ok?"🎉 Правильно! ":"❌ Не зовсім. ")+rd.why+(lives<=0?"<br><b>Вежа втратила всі життя.</b>":""),ok?"green":"red");
   gs9((i+1)+" / "+n+" · ✅ "+sc+" · "+hearts(lives));
   var last=i>=n-1||lives<=0;nxt9(last?"Результат":"Далі →",function(){i++;last?fin9(sc,n):show()})}
 }
 show()};

/* ======================= УРОК 23 · КАРТА АРЕНИ ======================= */
function lblT(x,y,t,c,a){return "<text x='"+x+"' y='"+y+"' text-anchor='"+(a||"middle")+"' font-size='11' font-weight='800' fill='"+(c||"#fff")+"' stroke='"+O+"' stroke-width='2.5' paint-order='stroke' font-family='monospace'>"+t+"</text>"}
function cmGrid(){var s="<rect width='360' height='200' fill='url(#sand)' stroke='"+O+"' stroke-width='3'/>",x,y;
 for(x=40;x<360;x+=40)s+="<path d='M"+x+" 0 V200' stroke='#fff' stroke-opacity='.55'/>";
 for(y=40;y<200;y+=40)s+="<path d='M0 "+y+" H360' stroke='#fff' stroke-opacity='.55'/>";
 for(x=0;x<=320;x+=40)s+=lblT(x,-5,x);
 for(y=0;y<=160;y+=40)s+=lblT(-5,y+3.5,y,"#fff","end");
 return s+lblT(356,-5,"x →","#ffe94a","end")+lblT(-5,196,"y ↓","#ffe94a","end")}
function parseCall(c){var m=/create_(rectangle|oval)\(([^)]*)\)/.exec(c);if(!m)return null;var nums=[],kw={};m[2].split(",").forEach(function(t){t=t.trim();var e=t.indexOf("=");if(e>0)kw[t.slice(0,e).trim()]=t.slice(e+1).trim().replace(/['"]/g,"");else nums.push(+t)});
 return {t:m[1],x1:Math.min(nums[0],nums[2]),y1:Math.min(nums[1],nums[3]),x2:Math.max(nums[0],nums[2]),y2:Math.max(nums[1],nums[3]),kw:kw,has:Object.keys(kw).length>0}}
function cmShape(c,o){var p=parseCall(c);if(!p)return "";o=o||{};var w=p.x2-p.x1,h=p.y2-p.y1,fill,stk,sw,s,a;
 if(o.ghost){fill="none";stk="#d81b84";sw=3}
 else if(p.has){fill=p.kw.fill||"none";stk=p.kw.outline||"black";sw=p.kw.width||1}
 else{fill=p.t=="rectangle"?"url(#wood)":"url(#water)";stk=O;sw=3}
 a="fill='"+fill+"' stroke='"+stk+"' stroke-width='"+sw+"'"+(o.ghost?" stroke-dasharray='7 5'":"");
 if(p.t=="rectangle")s="<rect x='"+p.x1+"' y='"+p.y1+"' width='"+w+"' height='"+h+"' rx='"+(p.has||o.ghost?0:4)+"' "+a+"/>"+(!p.has&&!o.ghost&&h>8?"<rect x='"+(p.x1+3)+"' y='"+(p.y1+3)+"' width='"+Math.max(0,w-6)+"' height='"+Math.min(5,h/3)+"' rx='2' fill='#fff' opacity='.35'/>":"");
 else s="<ellipse cx='"+(p.x1+w/2)+"' cy='"+(p.y1+h/2)+"' rx='"+w/2+"' ry='"+h/2+"' "+a+"/>"+(!p.has&&!o.ghost?"<ellipse cx='"+(p.x1+w*.4)+"' cy='"+(p.y1+h*.3)+"' rx='"+w*.15+"' ry='"+Math.max(1,h*.07)+"' fill='#fff' opacity='.5'/>":"");
 if(o.bad)s="<g opacity='.85'>"+s+"</g><text x='"+(p.x1+w/2)+"' y='"+(p.y1+h/2+7)+"' text-anchor='middle' font-size='20'>❌</text>";
 return s}
GM.cmap=function(g){var R=g.rounds,n=R.length,i=0,sc=0,lives=3,built=[];
 function show(){var rd=R[i],busy=false,tap=rd.mode=="tap",ord=tap?[]:shuf(rd.opts.length),hx=rd.hero[0],hy=rd.hero[1],ghost=rd.mode=="call"?cmShape(rd.opts[rd.a],{ghost:1}):"";
  fr9(g.title,g.hint||"Полотно Canvas: початок координат – у лівому верхньому куті, вісь x іде вправо, а вісь y – вниз. Будуй арену за координатами.",
   "<div class='cmsc'><svg id='cmsv' viewBox='-26 -18 392 242' xmlns='http://www.w3.org/2000/svg'>"+DEFS+cmGrid()+"<g id='cmbl'>"+built.join("")+"</g><g id='cmg'>"+ghost+"</g><g id='cmp'></g><g id='cmh' style='transition:transform .9s ease-in-out;transform:translate("+hx+"px,"+hy+"px) scale(.8)'>"+heroS().replace(/hO/g,"hT")+"</g><g id='cmx'></g><g id='cmt'></g></svg></div><div class='cmq'>"+rd.q+"</div><div class='cmo' id='cmo'></div><div class='cmm' id='cmm' style='display:none'></div>");
  gs9((i+1)+" / "+n+" · ✅ "+sc+" · "+hearts(lives));
  var sv=document.getElementById("cmsv"),gl=document.getElementById("cmbl"),gg=document.getElementById("cmg"),gp=document.getElementById("cmp"),gh=document.getElementById("cmh"),gx=document.getElementById("cmx"),gt=document.getElementById("cmt"),co=document.getElementById("cmo"),tm=document.getElementById("cmm");
  function tag(t){var fs=Math.min(10.5,345/(t.length*.62));gt.innerHTML="<g filter='url(#sh)'><rect x='0' y='204' width='"+(t.length*fs*.62+14)+"' height='17' rx='7' fill='#0d1117' opacity='.93'/><text x='7' y='216' font-size='"+fs+"' fill='#7ee787' font-family='monospace' font-weight='700'>"+esc(t)+"</text></g>"}
  function pin(x,y,c){return "<circle cx='"+x+"' cy='"+y+"' r='5' fill='"+c+"' stroke='#fff' stroke-width='2'/><text x='"+(x+8)+"' y='"+(y-6)+"' font-size='10' font-weight='900' fill='"+O+"' stroke='#fff' stroke-width='3' paint-order='stroke' font-family='monospace'>("+x+", "+y+")</text>"}
  function mv(x,y){gh.style.transform="translate("+x+"px,"+y+"px) scale(.8)"}
  gp.innerHTML=rd.mode=="pt"?pin(hx,hy,"#2d9cf0"):"";
  function finish(ok){if(ok)sc++;else lives--;gs9((i+1)+" / "+n+" · ✅ "+sc+" · "+hearts(lives));
   msgBox(tm,(ok?"🎉 Вірно! ":"❌ Не те. ")+rd.why+(lives<=0?"<br><b>Арена зруйнована: життя скінчились.</b>":""),ok?"green":"red");
   var last=i>=n-1||lives<=0;nxt9(last?"Результат":"Далі →",function(){i++;last?fin9(sc,n):show()})}
  if(tap){sv.style.cursor="crosshair";tag("торкни карту…");
   sv.onpointerdown=async function(e){if(busy)return;busy=true;var pt=sv.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;var q=pt.matrixTransform(sv.getScreenCTM().inverse()),x=Math.max(0,Math.min(360,Math.round(q.x))),y=Math.max(0,Math.min(200,Math.round(q.y))),ok=Math.hypot(x-rd.tx,y-rd.ty)<=rd.tol;
    sv.style.cursor="";mv(x,y);gp.innerHTML=pin(x,y,ok?"#2fb52a":"#e01f48");tag("герой у точці ("+x+", "+y+")");await sleep(950);
    gx.innerHTML=ok?spark(x,y-30,.9)+spark(x+26,y-14,.6,"#fff"):"<circle cx='"+rd.tx+"' cy='"+rd.ty+"' r='"+rd.tol+"' fill='none' stroke='#d81b84' stroke-width='3' stroke-dasharray='6 4'/><text x='"+rd.tx+"' y='"+(rd.ty+4)+"' text-anchor='middle' font-size='11' font-weight='900' fill='#d81b84' stroke='#fff' stroke-width='3' paint-order='stroke'>тут</text>";
    finish(ok)};return}
  ord.forEach(function(k){var b=document.createElement("div");b.className="cmb";b.setAttribute("data-k",k);b.innerHTML="<code>"+esc(rd.opts[k])+"</code>";
   b.onclick=async function(){if(busy)return;busy=true;var ok=k===rd.a;b.className+=ok?" ok":" bad";
    if(rd.mode=="pt"){var m=/\((\d+),\s*(\d+)\)/.exec(rd.opts[k]),x=+m[1],y=+m[2];gp.innerHTML=pin(hx,hy,"#2d9cf0")+"<path d='M"+hx+" "+hy+" L"+x+" "+y+"' stroke='#d81b84' stroke-width='3' stroke-dasharray='5 5'/>";mv(x,y);tag("герой біжить униз на 40");await sleep(950);gp.innerHTML+=pin(x,y,ok?"#2fb52a":"#e01f48")}
    else{tag(rd.opts[k]);gg.innerHTML=ghost+cmShape(rd.opts[k],{bad:!ok});await sleep(600);
     if(ok){gg.innerHTML="";gl.insertAdjacentHTML("beforeend",cmShape(rd.opts[k]));built.push(cmShape(rd.opts[k]));gx.innerHTML=spark(180,60,.8)+spark(40,150,.6,"#fff")+spark(330,170,.7)}}
    if(!ok)mark(co,rd.a);
    finish(ok)};co.appendChild(b)})}
 show()};

/* ======================= УРОК 24 · ФІНАЛЬНИЙ БІЙ ======================= */
var STARS=[[20,70,1],[60,48,1.5],[100,66,1],[150,44,2],[190,72,1],[236,80,1.5],[280,90,1],[320,100,1],[44,110,1],[330,126,1.5],[170,100,1]];
function fnBase(){var s="<rect width='340' height='210' fill='url(#dusk)'/>";STARS.forEach(function(t){s+="<circle cx='"+t[0]+"' cy='"+t[1]+"' r='"+t[2]+"' fill='#fff' opacity='.8'/>"});
 return s+"<circle cx='296' cy='62' r='16' fill='#ffe9a8'/><circle cx='303' cy='58' r='14' fill='#5b2a9a'/><rect y='156' width='340' height='54' fill='url(#floor)'/>"+[0,45,90,135,180,225,270,315].map(function(x){return "<path d='M"+x+" 156 L"+(x-20+(x-170)/4)+" 210' stroke='#fff' stroke-opacity='.15'/>"}).join("")+"<ellipse cx='256' cy='128' rx='78' ry='56' fill='#ff4f6d' opacity='.3' filter='url(#bl)'/>"}
function bossS(){return "<g filter='url(#sh)'><path d='M206 140 Q200 76 268 70 Q336 76 330 140 Q300 156 268 150 Q236 156 206 140Z' fill='url(#sR)' stroke='#fff' stroke-width='4'/><path d='M222 92 L212 66 L240 82Z M314 92 L324 66 L296 82Z' fill='#ffcf1f' stroke='#fff' stroke-width='3'/><ellipse cx='240' cy='92' rx='13' ry='9' fill='#ffd0d8' opacity='.5'/><circle cx='248' cy='108' r='12' fill='#fff'/><circle cx='288' cy='108' r='12' fill='#fff'/><circle cx='250' cy='110' r='6' fill='#2b1450'/><circle cx='286' cy='110' r='6' fill='#2b1450'/><path d='M244 134 Q268 150 292 134' stroke='#fff' stroke-width='4' fill='none'/><path d='M252 134 l5 7 l6 -6 l6 7 l6 -6 l6 7' stroke='#fff' stroke-width='3' fill='#fff'/></g>"}
GM.finale=function(g){var R=g.rounds,n=R.length,i=0,sc=0,hp=100,bh=100,per=Math.ceil(100/n);
 function show(){var rd=R[i],done=false,tap=rd.mode=="tap",t=rd.sec||30,ord=tap?[]:shuf(rd.opts.length);
  fr9(g.title,g.hint||"Бос атакує розділами курсу. Правильна відповідь – удар героя, помилка чи брак часу – удар боса.",
   "<div class='fnsc'><svg id='fnsv' viewBox='0 0 340 210' xmlns='http://www.w3.org/2000/svg'>"+DEFS+fnBase()+"<g transform='translate(-8,10)'><g id='fnb' style='transform-box:fill-box;transform-origin:center;transition:opacity .8s'>"+bossS()+"</g></g><g transform='translate(62,128) scale(1.2)'><g id='fnh' style='transform-box:fill-box;transform-origin:center'>"+heroS().replace(/hO/g,"hY")+"</g></g><circle id='fnp' r='7' fill='#ffe94a' stroke='#fff' stroke-width='2' filter='url(#gl)' style='transition:transform .5s ease-in;transform:translate(96px,112px);opacity:0'/><g id='fnx'></g><g id='fnu'></g></svg></div><div class='fnt'>Хвиля "+(i+1)+" · "+rd.tp+"</div><div class='fnq'>"+rd.q+"</div>"+(rd.code?"<div class='fnc' id='fnc'></div>":"")+"<div class='fno' id='fno'></div><div class='fnm' id='fnm' style='display:none'></div>");
  gs9((i+1)+" / "+n+" · ✅ "+sc);
  var sv=document.getElementById("fnsv"),gx=document.getElementById("fnx"),gu=document.getElementById("fnu"),gb=document.getElementById("fnb"),gh=document.getElementById("fnh"),pj=document.getElementById("fnp"),co=document.getElementById("fnc"),fo=document.getElementById("fno"),tm=document.getElementById("fnm");
  function tt(v){return "⏱ 0:"+(v<10?"0":"")+Math.max(0,v)}
  function hud(){gu.innerHTML=bar(10,8,130,hp/100,hp<30?"barR":"bar")+bar(200,8,130,bh/100,"barY")+"<text x='12' y='38' font-size='11' font-weight='900' fill='#fff' stroke='"+O+"' stroke-width='3' paint-order='stroke'>❤ ГЕРОЙ "+hp+"</text><text x='328' y='38' text-anchor='end' font-size='11' font-weight='900' fill='#fff' stroke='"+O+"' stroke-width='3' paint-order='stroke'>БОС "+bh+" 👾</text><g filter='url(#sh)'><rect x='130' y='178' width='80' height='24' rx='10' fill='#0d1117' stroke='#fff' stroke-width='2'/><text id='fnk' x='170' y='195' text-anchor='middle' font-size='14' font-weight='900' fill='#ffe94a'>"+tt(t)+"</text></g>"}
  hud();
  function lines(bad,good){if(!co)return;co.innerHTML=rd.code.map(function(l,k){var c=(tap&&!done?"tp ":"")+(k===bad?"er ":"")+(k===good?"ok":"");return "<div class='"+c+"' data-k='"+k+"'>"+(k+1)+" <i>"+esc(l)+"</i></div>"}).join("")+(rd.given?"<div class='gv'>"+esc(rd.given)+"</div>":"")}
  if(co)lines(-1,-1);
  var tmr=setInterval(function(){if(!document.body.contains(sv)||done){clearInterval(tmr);return}t--;var k=document.getElementById("fnk");if(k)k.textContent=tt(t);if(t<=0){clearInterval(tmr);answer(-1,null)}},1000);
  if(tap&&co)Array.prototype.forEach.call(co.querySelectorAll(".tp"),function(d){d.onclick=function(){answer(+d.getAttribute("data-k"),d)}});
  ord.forEach(function(k){var b=document.createElement("div");b.className="fnb2";b.setAttribute("data-k",k);b.innerHTML="<code>"+esc(rd.opts[k])+"</code>";b.onclick=function(){answer(k,b)};fo.appendChild(b)});
  async function tween(from,to,set){for(var s=1;s<=8;s++){set(Math.round(from+(to-from)*s/8));hud();await sleep(40)}}
  function shake(el){el.style.animation="none";void el.getBoundingClientRect();el.style.animation="fnsh .45s"}
  function floatT(x,y,s,c){gx.innerHTML="<text x='"+x+"' y='"+y+"' text-anchor='middle' font-size='20' font-weight='900' fill='"+c+"' stroke='#fff' stroke-width='4' paint-order='stroke' style='animation:fnfl 1s ease-out forwards'>"+s+"</text>"}
  async function answer(k,el){if(done)return;done=true;clearInterval(tmr);var ok=k===rd.a,heal=false,txt;
   if(!tap&&el)el.className+=ok?" ok":" bad";
   if(!tap&&!ok)mark(fo,rd.a);
   if(tap)lines(ok?-1:k,rd.a);
   pj.style.transition="none";pj.style.opacity=1;pj.setAttribute("fill",ok?"#ffe94a":"#ff4f6d");pj.style.transform=ok?"translate(96px,112px)":"translate(236px,112px)";void pj.getBoundingClientRect();pj.style.transition="transform .5s ease-in";
   pj.style.transform=ok?"translate(236px,108px)":"translate(84px,112px)";await sleep(520);pj.style.opacity=0;
   if(ok){sc++;gx.innerHTML=burst(236,108,.9);shake(gb);await sleep(150);floatT(236,84,"−"+Math.min(per,bh),"#ff4f6d");await tween(bh,Math.max(0,bh-per),function(v){bh=v});
    if(hp<30){heal=true;gx.innerHTML+="<text x='62' y='96' text-anchor='middle' font-size='22'>💚</text>"+spark(40,100,.8,"#7eff7a")+spark(86,110,.6,"#fff");await tween(hp,Math.min(100,hp+30),function(v){hp=v})}
    if(bh<=0)gb.style.opacity=.15}
   else{gx.innerHTML=burst(84,112,.9);shake(gh);await sleep(150);floatT(70,84,"−30","#ff4f6d");await tween(hp,Math.max(0,hp-30),function(v){hp=v})}
   var dead=hp<=0,win=bh<=0,last=i>=n-1;
   txt=(ok?"⚔️ Удар! ":(k===-1?"⏱ Час вийшов – бос вдарив. ":"💥 Бос вдарив у відповідь. "))+(heal?"if hp < 30: heal() – ❤ +30. ":"")+rd.why;
   if(dead)txt+="<br><b>Героя переможено. Повтори розділи й спробуй ще!</b>";else if(win)txt+="<br><b>🏆 Бос переможений!</b>";else if(last)txt+="<br><b>Бос відступив, ще маючи "+bh+" здоров’я. Спробуй ще – і добий його!</b>";
   msgBox(tm,txt,ok?"green":"red");gs9((i+1)+" / "+n+" · ✅ "+sc);
   nxt9(dead||last?"Результат":"Далі →",function(){i++;dead||last?fin9(sc,n):show()})}
 }
 show()};

/* ---- стилі ---- */
var st=document.createElement("style");
st.textContent="@keyframes twpop{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}@keyframes fnsh{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(4px)}}@keyframes fnfl{from{transform:translateY(0);opacity:1}to{transform:translateY(-26px);opacity:0}}"+
".twsc svg,.cmsc svg,.fnsc svg{display:block;width:100%;border:4px solid "+O+";border-radius:20px;box-shadow:0 5px 0 "+O+"}.twsc,.cmsc,.fnsc{margin:8px 0}.cmsc svg{background:#fff4d0;touch-action:manipulation;user-select:none}"+
".twq,.cmq,.fnq{background:#fff;border:3px solid "+O+";border-radius:14px;color:"+O+";text-align:center;font-weight:800;margin:10px 0 4px;padding:8px 10px;line-height:1.3}.fnt{display:table;margin:10px auto 0;background:#ffe94a;border:3px solid "+O+";border-radius:10px;padding:2px 12px;color:"+O+";font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:.04em}"+
".twc,.fnc{margin:8px 0;background:#0d1117;border-radius:12px;padding:8px 10px;color:#8b949e;font:12.5px/1.7 ui-monospace,Consolas,monospace;box-shadow:inset 0 0 0 2px "+O+";white-space:pre-wrap}.twc i,.fnc i{color:#e6edf3;font-style:normal}.twc .now i{color:#ffe94a}.fnc .tp{cursor:pointer;margin:0 -10px;padding:0 10px;border-left:4px solid transparent}.fnc .tp:hover{background:#1f3a5f;border-left-color:#58a6ff}.fnc .er{background:#44181a;margin:0 -10px;padding:0 10px;border-left:4px solid #f85149}.fnc .er i{color:#ff8a9a}.fnc .ok{background:#12351a;margin:0 -10px;padding:0 10px;border-left:4px solid #3dbe4a}.fnc .ok i{color:#7ee787}.fnc .gv{margin-top:4px;color:#ffe94a;font-weight:700}"+
".twopt{display:flex;gap:10px;margin:10px 0 4px}.twopt.txt{flex-direction:column;gap:8px}.twb{flex:1;border:4px solid "+O+";border-radius:18px;text-align:center;padding:8px 4px;color:#fff;box-shadow:0 5px 0 "+O+";cursor:pointer;background:linear-gradient(#5cb8ff,#2d7be0)}.twb:nth-child(2){background:linear-gradient(#ffd24a,#f0a800)}.twb:nth-child(3){background:linear-gradient(#ff8aa0,#e01f48)}.twb .ic{font-size:30px}.twb b{display:block;font-size:12.5px;text-shadow:0 2px 0 #0003;overflow-wrap:anywhere;font-size:11px}.twb small{display:block;font-size:11px;font-weight:700}.twb.tx{background:#fff!important;color:"+O+";text-align:left;padding:9px 11px;border-width:3px;border-radius:14px;box-shadow:0 4px 0 "+O+"}.twb.tx code{font:700 12.5px ui-monospace,Consolas,monospace;word-break:break-word}"+
".cmo,.fno{display:flex;flex-direction:column;gap:8px;margin:10px 0 4px}.cmb,.fnb2{border:3px solid "+O+";border-radius:14px;background:#fff;color:"+O+";padding:9px 11px;box-shadow:0 4px 0 "+O+";cursor:pointer}.cmb code,.fnb2 code{font:700 12px/1.35 ui-monospace,Consolas,monospace;word-break:break-word}"+
".twb.ok,.cmb.ok,.fnb2.ok{outline:4px solid #2fb52a}.twb.bad,.cmb.bad,.fnb2.bad{outline:4px solid #e0314f}.twb.tx.ok,.cmb.ok,.fnb2.ok{background:#e4ffe0!important}.twb.tx.bad,.cmb.bad,.fnb2.bad{background:#ffe3e8!important}.twb.hint,.cmb.hint,.fnb2.hint{outline:4px dashed #2fb52a}"+
".twm,.cmm,.fnm{margin:8px 0;padding:9px 11px;border-radius:12px;border:3px solid "+O+";font-size:13px;line-height:1.35;color:"+O+";background:#fff}.twm.red,.cmm.red,.fnm.red{background:#ffe3e8;border-color:#e0314f}.twm.green,.cmm.green,.fnm.green{background:#e4ffe0;border-color:#2fb52a}";
document.head.appendChild(st);
if(typeof GI7!="undefined"){GI7.tower=["🗼","Поштова вежа"];GI7.cmap=["🗺️","Карта арени"];GI7.finale=["⚔️","Фінальний бій"]}

/* ---- дані ---- */
if(typeof LES!="undefined"&&LES[722])LES[722].g.push({type:"tower",title:"Поштова вежа",hint:"До вежі приходять листи з ситуаціями. Вибери вікно повідомлення чи команду, які потрібні, і подивись, що з’явиться на екрані. Маєш 3 життя.",rounds:[
 {mode:"win",q:"Прийшов лист. Яке вікно повідомлення треба показати користувачу?",sit:"Файл успішно збережено",t:"Збереження",opts:["showinfo","showwarning","showerror"],a:0,why:"Це звичайна інформація, тому потрібне showinfo."},
 {mode:"win",q:"Новий лист. Яке вікно потрібне цього разу?",sit:"Пароль занадто слабкий, краще його змінити",t:"Пароль",opts:["showinfo","showwarning","showerror"],a:1,why:"Це попередження про ризик, тому потрібне showwarning."},
 {mode:"win",q:"Ще лист. Що показати користувачу?",sit:"Не вдалося відкрити файл",t:"Файл",opts:["showinfo","showwarning","showerror"],a:2,why:"Щось не вдалося – це повідомлення про помилку, тому showerror."},
 {mode:"txt",q:"Щоб вежа вміла відкривати вікна повідомлень, модуль треба приєднати. Який рядок записати першим?",sit:"Яка команда приєднує модуль?",code:["???","def hi(event):","    showinfo('Привіт', 'Ти клацнув!')"],opts:["from tkinter.messagebox import *","from tkinter.message import *","import showinfo from tkinter"],res:[["i","Готово","Модуль приєднано, вікно відкрито"],["e","ModuleNotFoundError","Такого модуля немає"],["e","SyntaxError","Неправильний запис імпорту"]],a:0,why:"Модуль приєднують командою from tkinter.messagebox import *."},
 {mode:"txt",q:"Вікно має з’являтися лише після клацання. Яку подію прив’язати до обробника hi? Остерігайся пастки!",sit:"Лише після клацання!",code:["def hi(event):","    showinfo('Привіт', 'Ти клацнув!')","???"],opts:["root.bind('<1>', hi)","root.bind('<Motion>', hi)","root.bind(hi, '<1>')"],res:[["i","Привіт","Ти клацнув!"],["i","Привіт","Ти клацнув!",5],["e","TypeError","Спершу подія, потім обробник"]],a:0,why:"<1> – це клацання. <Motion> запускає обробник після кожного руху миші, тож вікна з’являються знову й знову (закрити їх допоможе Alt + F4)."}]});
if(typeof LES!="undefined"&&LES[723])LES[723].g.push({type:"cmap",title:"Карта арени",hint:"Полотно Canvas: початок координат – у лівому верхньому куті, вісь x іде вправо, а вісь y – вниз. Збудуй арену за координатами. Маєш 3 життя.",rounds:[
 {mode:"tap",q:"Торкни на карті точку з координатами (240, 80).",hero:[60,100],tx:240,ty:80,tol:24,why:"x = 240 – праворуч від лівого краю, y = 80 – вниз від верхнього краю."},
 {mode:"pt",q:"Герой біжить вниз на 40 точок. Які будуть його нові координати?",hero:[120,100],opts:["(120, 140)","(120, 60)","(160, 100)"],a:0,why:"Вісь y напрямлена вниз, тож рух униз збільшує y: 100 + 40 = 140."},
 {mode:"call",q:"Збудуй стіну – вона виділена пунктиром. Яка команда її намалює?",hero:[200,150],opts:["c.create_rectangle(40, 30, 132, 50)","c.create_rectangle(40, 30, 92, 20)","c.create_rectangle(30, 40, 50, 132)"],a:0,why:"Прямокутник задають лівою верхньою (40, 30) і правою нижньою (132, 50) вершинами."},
 {mode:"call",q:"Збудуй кругле озеро – воно виділене пунктиром. Яка команда його намалює?",hero:[200,150],opts:["c.create_oval(240, 30, 320, 110)","c.create_oval(240, 30, 320, 70)","c.create_oval(280, 70, 40, 40)"],a:0,why:"Еліпс вписують у прямокутник, а для кола він має бути квадратом: 320 − 240 = 110 − 30 = 80."},
 {mode:"call",q:"Посади кущ: зелена заливка, червоний контур, товщина лінії 4. Яка команда правильна?",hero:[60,150],opts:["c.create_oval(150, 120, 190, 160, fill='green', outline='red', width=4)","c.create_oval(150, 120, 190, 160, fill='red', outline='green', width=4)","c.create_oval(150, 120, 190, 160, fill='green', outline='red', width=1)"],a:0,why:"fill – колір заливки, outline – колір контуру, width – товщина лінії."}]});
if(typeof LES!="undefined"&&LES[724])LES[724].g.push({type:"finale",title:"Фінальний бій",hint:"Бос атакує розділами курсу. Правильна відповідь – удар героя, помилка або брак часу – удар боса. Коли здоров’я героя менше 30, наступна вдала відповідь ще й лікує.",rounds:[
 {mode:"opt",tp:"Змінні й арифметика",q:"Бос рахує! Що виведе програма?",code:["x = 17","y = x // 5","x = x % 5","print(y + x)"],opts:["5","3","20"],a:0,why:"17 // 5 = 3, 17 % 5 = 2, тож y + x = 3 + 2 = 5."},
 {mode:"tap",tp:"Розгалуження",q:"Бос ховається за розгалуженням. Торкни рядок, який виконається.",code:["if t > 25:","    print('спека')","elif t > 10:","    print('тепло')","else:","    print('холодно')"],given:"t = 18",a:3,why:"18 > 25 хибне, а 18 > 10 істинне: виконується перший істинний шлях – print('тепло')."},
 {mode:"opt",tp:"Пошук в Інтернеті",q:"Підручник у форматі PDF захований на сайті school.ua серед реклами. Який запит знайде файл лише на цьому сайті без слова «реклама»?",opts:["підручник filetype:pdf site:school.ua -реклама","підручник pdf site school.ua реклама","підручник filetype:school.ua site:pdf -реклама"],a:0,why:"filetype: задає тип файлу, site: – сайт, а мінус перед словом його виключає."},
 {mode:"tap",tp:"Підпрограми",q:"У заклинанні помилка: функція sq має повертати результат. Торкни хибний рядок.",code:["def sq(x):","    x * x","print(sq(5))"],a:1,why:"Без return функція поверне None. Має бути return x * x."},
 {mode:"opt",tp:"Віконні проєкти",q:"Фінальний удар! Після клацання програма має відкрити вікно з повідомленням про помилку. Що вписати замість ___?",code:["from tkinter.messagebox import *","def oops(event):","    ___('Помилка', 'Файл не знайдено')","root.bind('<1>', oops)"],opts:["showerror","showinfo","geometry"],a:0,why:"showerror відкриває вікно з повідомленням про помилку."}]});
})();

;(window.__GPL=window.__GPL||[]).push("g7_3");
