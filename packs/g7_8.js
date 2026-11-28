/* 7 клас: стиль «Сезон» (хаб із сезоном, рівнем, нагородами й квестами дня; місії розділу; брифінг; питання-плитки). Без нижнього меню. */
(function(){
if(typeof section7!="function")return;
var SN=["Кібер-океан","Лабіринт коду","Сцена","Неонове місто","Вулкан","Фінал сезону"];
var GR=[["#ff3f8e","#ff5a7a"],["#4a6aff","#7a4aff"],["#14c8a8","#2fe0c0"],["#ff8a2a","#ffb02a"],["#8a4aff","#c04aff"],["#2a8cff","#18c0ff"]];
function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function today(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
/* ---- квести дня (локально, на пристрої) ---- */
function qk(){return "inf7q|"+(ME?ME.c+"|"+ME.n:"-")}
function Q(){var o={};try{o=JSON.parse(localStorage.getItem(qk()))||{}}catch(e){}if(o.d!==today())o={d:today(),les:0,gm:0,pf:0};return o}
function Qs(o){try{localStorage.setItem(qk(),JSON.stringify(o))}catch(e){}}
var _es=endScr;endScr=function(a,b,c,e){try{if(CUR9>700&&CUR9<800){var o=Q(),k=CURK||c;if(k=="q"||k=="big")o.les++;else o.gm++;if(b&&a>=b)o.pf++;Qs(o)}}catch(x){}return _es.apply(this,arguments)};
function streak(){try{var U=JSON.parse(localStorage.getItem("infux"))||{},m=U[(ME.c||"")+"|"+(ME.n||"")];return m&&m.st||0}catch(e){return 0}}
/* ---- іконки ---- */
var I={
fire:"<svg width='14' height='14' viewBox='0 0 14 14'><path d='M7 1c3 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 2 2 2 0-2-1-3 0-5z' fill='#ff5a1a'/></svg>",
gift:"<svg width='18' height='18' viewBox='0 0 18 18'><rect x='2' y='7' width='14' height='9' rx='2' fill='#ff3f8e'/><rect x='1' y='4' width='16' height='4' rx='1.5' fill='#ff8a2a'/><path d='M9 4v12' stroke='#ffd23f' stroke-width='2'/></svg>",
target:"<svg width='18' height='18' viewBox='0 0 18 18'><circle cx='9' cy='9' r='8' fill='#ff3f8e'/><circle cx='9' cy='9' r='5' fill='#fff'/><circle cx='9' cy='9' r='2.5' fill='#ff3f8e'/></svg>",
book:"<svg viewBox='0 0 32 32'><path d='M4 8q6-3 12 1v17q-6-4-12-1z' fill='#fff'/><path d='M28 8q-6-3-12 1v17q6-4 12-1z' fill='#d7d0ff'/></svg>",
pad:"<svg viewBox='0 0 32 32'><rect x='3' y='10' width='26' height='14' rx='7' fill='#d7d0ff'/><path d='M10 14v6M7 17h6' stroke='#3a2a7a' stroke-width='2.5' stroke-linecap='round'/><circle cx='21' cy='15' r='1.8' fill='#ff3f8e'/><circle cx='24' cy='19' r='1.8' fill='#2fe0c0'/></svg>",
bolt:"<svg viewBox='0 0 32 32'><path d='M18 3L7 18h8l-2 11 12-16h-8z' fill='#ffd23f'/></svg>",
lock:"<svg width='18' height='20' viewBox='0 0 18 20'><rect x='2' y='9' width='14' height='10' rx='2' fill='#8f86b8'/><path d='M5 9V6a4 4 0 0 1 8 0v3' stroke='#8f86b8' stroke-width='2.5' fill='none'/></svg>"};
var RW=[["Скін","<svg viewBox='0 0 30 30'><path d='M5 18q10-14 20 0v3H5z' fill='#4aa8ff'/><path d='M3 20h24' stroke='#2a6ad8' stroke-width='3' stroke-linecap='round'/></svg>"],
["x2 XP","<svg viewBox='0 0 30 30'><path d='M17 3L7 17h7l-2 10 11-15h-7z' fill='#ffd23f'/></svg>"],
["Скриня","<svg viewBox='0 0 30 30'><rect x='5' y='12' width='20' height='14' rx='2' fill='#ff8a2a'/><rect x='4' y='8' width='22' height='6' rx='2' fill='#ff3f8e'/><path d='M15 8v18' stroke='#ffd23f' stroke-width='3'/></svg>"],
["Рамка","<svg viewBox='0 0 30 30'><path d='M4 22l3-12 5 5 3-9 3 9 5-5 3 12z' fill='#ffd23f'/><rect x='4' y='22' width='22' height='3' fill='#e0a800'/></svg>"],
["Значок","<svg viewBox='0 0 30 30'><path d='M15 3l10 4v8c0 7-5 10-10 12-5-2-10-5-10-12V7z' fill='#2fe0c0'/><path d='M10 15l3 3 7-7' stroke='#0b1a2a' stroke-width='3' fill='none' stroke-linecap='round'/></svg>"]];
var PADI="<svg viewBox='0 0 30 30'><rect x='3' y='9' width='24' height='14' rx='7' fill='#3a3a52'/><circle cx='10' cy='16' r='3' fill='#fff'/><circle cx='21' cy='14' r='1.8' fill='#ff3f8e'/><circle cx='21' cy='18.5' r='1.8' fill='#2fe0c0'/></svg>";
function stars(p){var n=p>=90?3:p>=60?2:p>0?1:0;return "<span class='s7st'>"+"★★★".slice(0,n)+"<i>"+"★★★".slice(0,3-n)+"</i></span>"}
function games(n){var L=LES[700+n];return L&&L.g?L.g.length:0}
function title(t){return t.replace(/^Розділ \d+\.\s*/,"")}
function nextL(){for(var i=1;i<=T7N;i++)if(LES[700+i]&&!B7.l[700+i])return i;return 1}
/* ---- ХАБ ---- */
function hub(){qCredit();var x=xp7()+qx().s,L=Math.floor(x/100)+1,r=x%100,n=nextL(),k=tp7(n),t=TP7[k],q=Q(),st=streak(),eq=EQ();
 var h="<div class='s7hub'><div class='s7hd'><div class='s7me' onclick='rw7col()'>"+avHTML(eq,58)+"<div><small>ГРАВЕЦЬ · "+E(ME.c)+"</small><div class='s7nm'>"+E(ME.n).toUpperCase()+"</div>"+(eq.bd&&ITEM(eq.bd)?"<span class='s7bd'>"+E(ITEM(eq.bd).n)+"</span>":"<span class='s7bd s7bd0'>тапни, щоб змінити образ</span>")+"</div></div><div class='s7hr'><span class='s7stk'>"+I.fire+st+" "+(st==1?"день":st>=2&&st<=4?"дні":"днів")+"</span><button class='s7out' onclick='who()'>Вийти</button></div></div>"+
 "<div class='s7seas' onclick='section7("+(k+1)+")'><div class='s7rings'></div><small>СЕЗОН "+(k+1)+"</small><h1>"+E(SN[k]).toUpperCase().replace(" ","<br>")+"</h1><div class='s7lv'><div class='s7hex'>"+L+"</div><div style='flex:1'><b>РІВЕНЬ "+L+" · "+r+" / 100 XP</b><div class='s7xp'><i style='width:"+r+"%'></i></div><small>До наступної нагороди: "+(100-r)+" XP</small></div></div></div>"+
 "<button class='s7go' onclick='lesson7("+n+")'>ПРОДОВЖИТИ · УРОК "+n+" →</button>"+
 "<div class='s7sec'>"+I.gift+"НАГОРОДИ СЕЗОНУ</div><div class='s7rw'>";
 var a0=Math.max(2,L-1);for(var lv=a0;lv<a0+5;lv++){var it=RWL(lv);h+="<div class='s7r"+(lv<=L?" got":lv==L+1?" on":"")+"' onclick='rw7col()'>"+icoHTML(it)+(lv<=L?E(it.s||it.n):"РІВ. "+lv)+"</div>"}
 h+="</div><div class='s7sec'>"+I.target+"КВЕСТИ ДНЯ</div><div class='s7qs'>"+
 quest(I.book,"Пройди тест уроку",q.les,1,QX.les)+quest(I.pad,"Зіграй у 2 міні-гри",q.gm,2,QX.gm)+quest(I.bolt,"Пройди гру без помилок",q.pf,1,QX.pf)+"</div>"+
 "<div class='s7sec'>СЕЗОНИ РОКУ</div><div class='s7ms'>"+TP7.map(function(t,i){var c=t.b-t.a+1,d=0,sp=0;for(var z=t.a;z<=t.b;z++){sp+=P7(z);if(B7.l[700+z])d++}var g=GR[i%GR.length];
  return "<button class='s7m' style='background:linear-gradient(90deg,"+g[0]+","+g[1]+")' onclick='section7("+(i+1)+")'><span class='s7hx'>"+(i+1)+"</span><span class='s7t'><b>"+E(SN[i]).toUpperCase()+"</b><small>"+E(title(t.t))+" · "+d+" / "+c+"</small></span>"+stars(Math.round(sp/c))+"</button>"}).join("")+"</div></div>";
 return h}
function quest(ic,t,v,m,xp){var p=Math.min(100,Math.round(v/m*100));return "<div class='s7q"+(p>=100?" done":"")+"'>"+ic+"<div><b>"+t+"</b><div class='s7pb'><i style='width:"+p+"%'></i></div></div><span class='s7xpp'>"+(p>=100?"✓ ":"")+"+"+xp+" XP</span></div>"}
var _tp=topics;topics=function(){var r=_tp.apply(this,arguments);if(ME&&String(ME.c).charAt(0)=="7"){document.body.classList.add("s7n");$.innerHTML=hub();window.scrollTo(0,0);setTimeout(lvUp,500)}return r};

/* ---- НАГОРОДИ: реальні, лише косметика, лише для учня (локально) ---- */
var QX={les:20,gm:15,pf:25};
function qxk(){return "inf7qx|"+(ME?ME.c+"|"+ME.n:"-")}
function qx(){var o;try{o=JSON.parse(localStorage.getItem(qxk()))}catch(e){}return o&&o.d?o:{s:0,d:{}}}
function qCredit(){var o=qx(),q=Q(),d=today(),m=o.d[d]||{},ch=0;[["les",1],["gm",2],["pf",1]].forEach(function(z){if(q[z[0]]>=z[1]&&!m[z[0]]){m[z[0]]=1;o.s+=QX[z[0]];ch=1}});
 if(ch){o.d={};o.d[d]=m;try{localStorage.setItem(qxk(),JSON.stringify(o))}catch(e){}}}
var BG={ocean:["#1f6fff","#2fe0c0"],sun:["#ff5f8f","#ff9a4a"],forest:["#14c8a8","#1f6f3a"],space:["#1b1240","#7a2cff"],lava:["#ff3f1f","#ffb02a"],aur:["#2fe0c0","#c04aff"]};
var FR={neon:"0 0 0 3px #2fe0c0,0 0 14px #2fe0c0",gold:"0 0 0 3px #ffd23f,0 0 0 6px #b37a00,0 0 16px #ffd23f88",fire:"0 0 0 3px #ff7a1a,0 0 0 6px #c21f1f,0 0 16px #ff5a1a",rain:"0 0 0 3px #ff3f8e,0 0 0 6px #ffd23f,0 0 0 9px #2fe0c0",dia:"0 0 0 3px #e8f6ff,0 0 0 6px #7ad8ff,0 0 20px #bfeaff"};
var SEQ=[["bd","nov","🐣 Новачок"],["bg","ocean","Океан"],["ac","hp","Навушники"],["fr","neon","Неон"],["bd","py","🐍 Пітоніст"],["bg","sun","Захід"],["ac","cap","Кепка"],["bd","brain","🧠 Мозок"],["fr","gold","Золото"],["bg","forest","Ліс"],["ac","sun","Окуляри"],["bd","bolt","⚡ Блискавка"],["bg","space","Космос"],["fr","fire","Вогонь"],["ac","grad","Шапка випускника"],["bd","shield","🛡️ Кіберзахисник"],["bg","lava","Лава"],["ac","bow","Бантик"],["fr","rain","Райдуга"],["bd","film","🎬 Режисер"],["ac","top","Циліндр"],["bg","aur","Аврора"],["bd","rocket","🚀 Ракета"],["fr","dia","Діамант"],["ac","cow","Капелюх"],["bd","legend","🏆 Легенда"]];
var KN={bd:"Значок",bg:"Фон",ac:"Котик",fr:"Рамка"};
function RWL(lv){var s=SEQ[lv-2];if(!s)return {t:"st",id:"st",n:"Зірка майстра",s:"Зірка"};return {t:s[0],id:s[0]+":"+s[1],v:s[1],n:s[2],s:s[0]=="bd"?s[2].replace(/^\S+\s/,""):s[2]}}
function ITEM(id){for(var i=0;i<SEQ.length;i++)if(SEQ[i][0]+":"+SEQ[i][1]==id)return RWL(i+2);var m=/^bd:s(\d)$/.exec(id||"");if(m)return {t:"bd",id:id,n:"👑 "+SN[+m[1]],s:SN[+m[1]]};return null}
function seasDone(i){var t=TP7[i];if(!t)return false;for(var z=t.a;z<=t.b;z++)if(LES[700+z]&&!B7.l[700+z])return false;return true}
function lvl(){return Math.floor((xp7()+qx().s)/100)+1}
function owned(){var L=lvl(),o={};for(var lv=2;lv<=L&&lv-2<SEQ.length;lv++)o[RWL(lv).id]=lv;for(var i=0;i<SN.length;i++)if(seasDone(i))o["bd:s"+i]="s";return o}
function eqk(){return "inf7eq|"+(ME?ME.c+"|"+ME.n:"-")}
function EQ(){var o;try{o=JSON.parse(localStorage.getItem(eqk()))}catch(e){}return o||{}}
function EQs(o){try{localStorage.setItem(eqk(),JSON.stringify(o))}catch(e){}}
window._av=function(e,s){return avHTML(e,s)};function avHTML(eq,sz){var ac=eq.ac&&eq.ac.split(":")[1],bg=BG[eq.bg&&eq.bg.split(":")[1]]||["#4a33b8","#2a1d78"],fr=FR[eq.fr&&eq.fr.split(":")[1]]||"0 0 0 3px #150a33";
 return "<span class='s7av' style='width:"+sz+"px;height:"+sz+"px;background:linear-gradient(150deg,"+bg[0]+","+bg[1]+");--fr:"+fr+"'><span class='s7cat'>"+catSVG(ac)+"</span></span>"}
function icoHTML(it){if(it.t=="ac")return "<span class='s7ic s7ica'>"+catSVG(it.v)+"</span>";if(it.t=="bd")return "<span class='s7ic'>"+it.n.split(" ")[0]+"</span>";
 if(it.t=="bg"){var g=BG[it.v];return "<span class='s7ic'><b style='display:inline-block;width:26px;height:26px;border-radius:8px;background:linear-gradient(150deg,"+g[0]+","+g[1]+")'></b></span>"}
 if(it.t=="fr")return "<span class='s7ic'><b style='display:inline-block;width:22px;height:22px;border-radius:7px;background:#3b2a92;--fr:"+FR[it.v]+";box-shadow:var(--fr)' class='s7ic'></b></span>";return "<span class='s7ic'>⭐</span>"}

var ACS={hp:"<path d='M15 62Q13 13 50 13Q87 13 85 62' fill='none' stroke='#150a33' stroke-width='10' stroke-linecap='round'/><path d='M15 62Q13 13 50 13Q87 13 85 62' fill='none' stroke='#ff3f8e' stroke-width='4.5' stroke-linecap='round'/><rect x='5' y='50' width='17' height='27' rx='8' fill='#ff3f8e' stroke='#150a33' stroke-width='3'/><rect x='78' y='50' width='17' height='27' rx='8' fill='#ff3f8e' stroke='#150a33' stroke-width='3'/><rect x='9' y='55' width='5' height='17' rx='2.5' fill='#ffd23f'/><rect x='86' y='55' width='5' height='17' rx='2.5' fill='#ffd23f'/>",
cap:"<path d='M22 42Q24 12 52 12Q78 13 78 40Z' fill='#2a8cff' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M50 13Q52 26 50 41' stroke='#150a33' stroke-width='2' fill='none'/><path d='M48 38Q76 32 95 41Q84 49 54 46Z' fill='#1f5fd0' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><circle cx='51' cy='12' r='3.5' fill='#ffd23f' stroke='#150a33' stroke-width='2'/>",
sun:"<path d='M25 56h50' stroke='#150a33' stroke-width='3'/><rect x='24' y='51' width='23' height='16' rx='7' fill='#1a1240' stroke='#150a33' stroke-width='3'/><rect x='53' y='51' width='23' height='16' rx='7' fill='#1a1240' stroke='#150a33' stroke-width='3'/><path d='M29 55l6 0M58 55l6 0' stroke='#7ad8ff' stroke-width='3' stroke-linecap='round'/><path d='M47 56q3-3 6 0' stroke='#150a33' stroke-width='3' fill='none'/>",
grad:"<path d='M32 30h36v12q-18 7-36 0z' fill='#2a1d50' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M50 12L90 26L50 40L10 26Z' fill='#3a2a7a' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><circle cx='50' cy='26' r='3' fill='#ffd23f'/><path d='M50 26L80 31V47' stroke='#ffd23f' stroke-width='2.5' fill='none'/><path d='M76 46h8l-2 8h-4z' fill='#ffd23f' stroke='#150a33' stroke-width='1.5'/>",
bow:"<path d='M30 34L14 24Q10 36 14 46Z' fill='#ff3f8e' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M30 34L46 24Q50 36 46 46Z' fill='#ff3f8e' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><circle cx='30' cy='35' r='5.5' fill='#ff7ab0' stroke='#150a33' stroke-width='3'/>",
top:"<path d='M35 6h30v29h-30z' fill='#251a3a' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M35 26h30v6h-30z' fill='#ff3f5a'/><ellipse cx='50' cy='36' rx='27' ry='5.5' fill='#251a3a' stroke='#150a33' stroke-width='3'/>",
cow:"<path d='M33 34Q32 10 42 12Q50 18 58 12Q68 10 67 34Z' fill='#b8733a' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M33 30h34v5h-34z' fill='#6a3a1a'/><path d='M6 32Q18 44 50 42Q82 44 94 32Q90 46 50 49Q10 46 6 32Z' fill='#c9833f' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/>"};
var ACOLD={"🎧":"hp","🧢":"cap","🕶️":"sun","🎓":"grad","🎀":"bow","🎩":"top","🤠":"cow"};
function catSVG(ac){ac=ACOLD[ac]||ac;var a=ACS[ac]||"",front=ac=="sun";
 return "<svg viewBox='0 0 100 100' width='100%' height='100%' style='overflow:visible;display:block'>"
 +"<path d='M20 50L23 13L45 34Z' fill='#ff9a3c' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/><path d='M80 50L77 13L55 34Z' fill='#ff9a3c' stroke='#150a33' stroke-width='3' stroke-linejoin='round'/>"
 +"<path d='M25 41L26 22L38 34Z' fill='#ff8fb5'/><path d='M75 41L74 22L62 34Z' fill='#ff8fb5'/>"
 +"<ellipse cx='50' cy='60' rx='35' ry='29' fill='#ff9a3c' stroke='#150a33' stroke-width='3'/>"
 +"<path d='M44 33q1 7 0 11M50 32v12M56 33q-1 7 0 11' stroke='#d96a1a' stroke-width='3' stroke-linecap='round' fill='none'/>"
 +"<ellipse cx='50' cy='72' rx='15' ry='10' fill='#ffe2c2'/>"
 +(front?"":"<ellipse cx='37' cy='59' rx='5' ry='6' fill='#150a33'/><ellipse cx='63' cy='59' rx='5' ry='6' fill='#150a33'/><circle cx='39' cy='57' r='1.8' fill='#fff'/><circle cx='65' cy='57' r='1.8' fill='#fff'/>")
 +"<path d='M46 67h8l-4 4z' fill='#ff5a8a' stroke='#150a33' stroke-width='1.5' stroke-linejoin='round'/><path d='M50 71q-3 5-7 3M50 71q3 5 7 3' stroke='#150a33' stroke-width='2' fill='none' stroke-linecap='round'/>"
 +"<circle cx='27' cy='70' r='4' fill='#ff6a8a' opacity='.45'/><circle cx='73' cy='70' r='4' fill='#ff6a8a' opacity='.45'/>"
 +"<path d='M10 66l12 2M10 74l12-1M90 66l-12 2M90 74l-12-1' stroke='#150a33' stroke-width='1.6' stroke-linecap='round'/>"
 +a+"</svg>"}
var COLT="ac";
window.rw7col=function(tab){COLT=tab||COLT;var o=document.querySelector(".rw7ov");if(o)o.remove();var eq=EQ(),own=owned(),L=lvl();
 var all=SEQ.map(function(s,i){return RWL(i+2)});if(COLT=="bd")for(var i=0;i<SN.length;i++)all.push({t:"bd",id:"bd:s"+i,n:"👑 "+SN[i],s:SN[i],sea:i});
 var h="<div class='rw7t'>"+["ac","fr","bd","bg"].map(function(k){return "<b class='"+(k==COLT?"a":"")+"' onclick='rw7col(\""+k+"\")'>"+KN[k]+"</b>"}).join("")+"</div><div class='rw7pv'>"+avHTML(eq,96)+"</div><div class='rw7g'>"
 +"<div class='rw7i"+(!eq[COLT]?" eq":"")+"' onclick='rw7eq(\""+COLT+"\",\"\")'><span class='s7ic'>🚫</span>Без "+(COLT=="ac"?"аксесуара":COLT=="fr"?"рамки":COLT=="bd"?"значка":"фону")+"</div>";
 all.filter(function(it){return it.t==COLT}).forEach(function(it){var lv=own[it.id],ok=!!lv,need=it.sea!=null?"пройди сезон":"рів. "+(SEQ.map(function(s){return s[0]+":"+s[1]}).indexOf(it.id)+2);
  h+="<div class='rw7i"+(eq[COLT]==it.id?" eq":"")+(ok?"":" lk")+"'"+(ok?" onclick='rw7eq(\""+COLT+"\",\""+it.id+"\")'":"")+">"+icoHTML(it)+E(it.s||it.n)+(ok?"":"<small>"+need+"</small>")+"</div>"});
 h+="</div><p class='rw7n'>Рівень "+L+". Нагороди тільки для краси й лише на цьому пристрої. Нічого не купується і не випадає навмання.</p><button class='pri' onclick='this.closest(\".sess-ov\").remove()'>Готово</button>";
 var ov=document.createElement("div");ov.className="sess-ov rw7ov";ov.innerHTML="<div class='sess-b' role='dialog'><h2>Мій образ</h2>"+h+"</div>";ov.onclick=function(e){if(e.target==ov)ov.remove()};document.body.appendChild(ov)};
window.rw7eq=function(k,id){var e=EQ();e[k]=id;EQs(e);rw7col(k);var me=document.querySelector(".s7me");if(me&&typeof topics=="function"&&document.querySelector(".s7hub")){$.innerHTML=hub()}};
function lvUp(){if(!document.querySelector(".s7hub")||document.querySelector(".sess-ov"))return;var e=EQ(),L=lvl();if(e.lv==null){e.lv=L;EQs(e);return}if(L<=e.lv)return;
 var it=RWL(L),more=L-e.lv-1;e.lv=L;EQs(e);var can=it.t!="st";
 var ov=document.createElement("div");ov.className="sess-ov";ov.innerHTML="<div class='sess-b' role='dialog'><div class='rw7big'>"+icoHTML(it)+"</div><h2>Рівень "+L+"!</h2><p>"+(can?KN[it.t]+": «"+E(it.n)+"»":"Ти пройшов усі нагороди. Тримай зірку майстра ⭐")+(more>0?" + ще "+more+" "+(more==1?"нагорода":"нагороди")+" в колекції":"")+"</p>"
 +(can?"<button class='pri' id='rw7on'>Вдягнути</button><button onclick='this.closest(\".sess-ov\").remove()'>Пізніше</button>":"<button class='pri' onclick='this.closest(\".sess-ov\").remove()'>Круто</button>")+"</div>";
 document.body.appendChild(ov);var b=document.getElementById("rw7on");if(b)b.onclick=function(){ov.remove();var q=EQ();q[it.t]=it.id;EQs(q);$.innerHTML=hub()}}
var rcss="html body.g7.s7n #app .card .bar{height:12px!important;padding:0!important;overflow:hidden!important;background:rgba(0,0,0,.35)!important;border:2px solid #fff!important;border-radius:8px!important}html body.g7.s7n #app .card .bar i{display:block!important;height:100%!important;margin:0!important;border-radius:6px!important;background:linear-gradient(90deg,#2fe0c0,#ffd23f)!important;box-shadow:none!important}html body.g5.g7 .ar{grid-template-columns:repeat(6,1fr)!important;gap:5px!important}html body.g5.g7 .ai{padding:5px 1px 4px!important;min-width:0!important;border-radius:12px!important}html body.g5.g7 .ai i{font-size:19px!important}html body.g5.g7 .ai u{font-size:7.5px!important;line-height:1.15!important;word-break:break-word;hyphens:auto}html body span.s7av.s7av,html body .s7ic b.s7ic{box-shadow:var(--fr)!important}.s7me{display:flex;gap:12px;align-items:center;cursor:pointer;min-width:0}.s7av{position:relative;flex:none;display:grid;place-items:center;border-radius:30%;line-height:1}.s7av{overflow:visible}.s7cat{position:absolute;left:8%;right:8%;bottom:4%;top:14%}.s7ica{width:40px;height:40px;margin:2px auto}.rw7big .s7ica{width:96px;height:96px}"
+".s7bd{display:inline-block;margin-top:4px;background:#150a33;border:2px solid #ffd23f;color:#ffd23f;border-radius:10px;font:900 11px system-ui;padding:2px 8px}.s7bd0{border-color:#6a5ab8;color:#b9adf0;font-weight:700}"
+".s7r{cursor:pointer;position:relative}.s7r.got{opacity:1!important;background:#2a7a5c!important;border-color:#2fe0c0!important}.s7r.got:after{content:'✓';position:absolute;top:-7px;right:-5px;width:18px;height:18px;border-radius:50%;background:#2fe0c0;color:#0b1a2a;font:900 12px/18px system-ui}.s7r:not(.got):not(.on){opacity:.6}.s7ic{font-size:24px;line-height:1;display:block}"
+".rw7t{display:flex;gap:6px;margin:4px 0 14px}.rw7t b{flex:1;padding:8px 0;border-radius:12px;background:#2f2275;font-size:12px;cursor:pointer}.rw7t b.a{background:#ffd23f;color:#2a1a00}.rw7pv{display:flex;justify-content:center;margin:26px 0 14px}"
+".rw7g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-height:42vh;overflow:auto;padding:4px}.rw7i{background:#2f2275;border:2px solid #150a33;border-radius:14px;padding:9px 3px;font:800 11px system-ui;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px}"
+".rw7i.eq{border-color:#ffd23f;box-shadow:0 0 0 2px #ffd23f}.rw7i.lk{opacity:.45;cursor:default}.rw7i small{color:#b9adf0;font-size:10px}.rw7n{font-size:12px!important;margin:12px 0 0!important}.rw7big .s7ic{font-size:56px;margin:4px 0}.rw7big .s7ic b{transform:scale(2);margin:14px}";
var rst=document.createElement("style");rst.textContent=rcss;document.head.appendChild(rst);
/* ---- МІСІЇ РОЗДІЛУ ---- */
section7=function(k){k=k||1;CUR9=0;useB7();b7s();pg7();document.body.classList.add("s7n");var t=TP7[k-1];acc7(k-1);
 var h="<div class='s7sub'><button class='s7back' onclick='topics()'>← ХАБ</button><small>СЕЗОН "+k+" · "+E(SN[k-1]).toUpperCase()+"</small></div><div class='s7big'>"+E(title(t.t)).toUpperCase()+"</div><div class='s7ms'>";
 for(var n=t.a;n<=t.b;n++){var x=T7[n-1],has=!!LES[700+n],p=P7(n),g=GR[(n-t.a)%GR.length],kind=x[1]=="p"?"практична":x[1]=="s"?"підсумковий":"",gm=games(n);
  if(!has){h+="<div class='s7m lk'><span class='s7hx'>"+I.lock+"</span><span class='s7t'><b>"+E(x[0])+"</b><small>урок "+n+" · скоро</small></span><span class='s7dash'></span></div>";continue}
  h+="<button class='s7m' style='background:linear-gradient(90deg,"+g[0]+","+g[1]+")' onclick='lesson7("+n+")'><span class='s7hx'>"+n+"</span><span class='s7t'><b>"+E(x[0])+"</b><small>"+(kind?kind+" · ":"")+(gm?"читанка · "+gm+" "+(gm==1?"гра":gm>=2&&gm<=4?"ігри":"ігор")+" · тест":"підсумковий тест · 24 питання")+"</small></span><span class='s7rt'><span class='s7xpp'>"+(B7.l[700+n]?"✓ ":"+")+(100+gm*10)+" XP</span>"+stars(p)+"</span></button>"}
 $.innerHTML=h+"</div>";pg7("l7pg");window.scrollTo(0,0)};
/* ---- урок: шапка місії ---- */
var _l7=lesson7;lesson7=function(n){var r=_l7.apply(this,arguments);try{document.body.classList.add("s7n");var tp=document.querySelector("#app>.top button.sm");if(tp)tp.textContent="← СЕЗОН "+(tp7(n)+1);
 var f0=document.querySelector("#app>.mb");if(f0&&!document.querySelector("#app>.k-rv")&&typeof uxMisN=="function"){var nm=uxMisN(700+n);f0.insertAdjacentHTML("beforebegin","<button class='mb k-rv"+(nm?"":" k-rv0")+"'"+(nm?" onclick='uxRev("+(700+n)+")'":"")+"><span class='ic'>🎯</span><span class='tx'><b>Робота над помилками</b><br><span class='sub'>"+(nm?nm+" "+(nm==1?"питання":nm<5?"питання":"питань")+" з тестів та ігор уроку, де була помилка":"помилок поки немає, так тримати")+"</span></span>"+(nm?"<span class='s7rvn'>"+nm+"</span>":"")+"</button>")}
 document.querySelectorAll("#app>.mb:not(.k-rv)").forEach(function(b){var o=b.getAttribute("onclick")||"",m=/playG\((\d+),(\d+)\)/.exec(o),k="ts";if(/openR/.test(o))k="rd";else if(m){var g=(LES[+m[1]].g||[])[+m[2]];k=g&&g.v!==undefined&&/7$/.test(g.type)?"cx":"gm"}b.classList.add("k-"+k);if(k=="cx"&&!b.querySelector(".s7cx")){var tb=b.querySelector(".tx b");if(tb)tb.insertAdjacentHTML("beforebegin","<span class='s7cx'>★ СКЛАДНА ГРА</span>")}});
 var c=document.querySelector("#app>.card");if(c){c.classList.add("s7les");var s=c.querySelector(".s7");if(s)s.outerHTML="<div class='s7tag'>МІСІЯ "+n+"</div>"}}catch(e){}return r};
/* ---- стилі ---- */
var css="\
body.g7.s7n{background:linear-gradient(180deg,#2c1a63 0%,#3a1b6e 45%,#26124d 100%) fixed!important}\
body.g7.s7n::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(120deg,rgba(255,255,255,.035) 0 26px,transparent 26px 52px);pointer-events:none;z-index:0}\
body.g7.s7n #app{position:relative;z-index:1;background:transparent!important;color:#fff}\
body.g7.s7n #app *{font-family:system-ui,-apple-system,'Segoe UI',sans-serif}\
.s7hub,.s7ms{display:grid;gap:12px}\
.s7hd{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}\
.s7hd small,.s7sub small{font:900 12px system-ui;color:#b9aee8;letter-spacing:.5px}\
.s7nm{font:900 italic 23px system-ui;margin-top:2px;line-height:1.05}\
.s7hr{display:flex;flex-direction:column;align-items:flex-end;gap:6px}\
.s7stk{background:#ffd23f;color:#1a0e00;border-radius:14px;padding:5px 10px;font:900 12px system-ui;display:flex;align-items:center;gap:4px;white-space:nowrap}\
.s7out,.s7back{background:rgba(255,255,255,.1)!important;color:#d7d0ff!important;border:0!important;border-radius:10px!important;padding:5px 10px!important;font:900 11px system-ui!important;width:auto!important;margin:0!important;box-shadow:none!important}\
.s7seas{border-radius:22px;padding:16px;background:linear-gradient(135deg,#ff3f8e 0%,#ff6a4a 55%,#ff9a2a 100%);position:relative;overflow:hidden;box-shadow:0 8px 0 rgba(0,0,0,.25);cursor:pointer}\
.s7rings{position:absolute;right:-30px;top:-30px;width:170px;height:170px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.18) 0 4px,transparent 4px 14px)}\
.s7seas small{font:900 italic 12px system-ui;color:#fff3e0;position:relative}\
.s7seas h1{font:900 italic 32px/1 system-ui!important;margin:4px 0 12px!important;color:#fff!important;position:relative;text-shadow:0 3px 0 rgba(0,0,0,.18)}\
.s7lv{display:flex;align-items:center;gap:12px;position:relative}\
.s7hex,.s7hx{background:#ffd23f;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);display:flex;align-items:center;justify-content:center;flex:none;font:900 italic 26px system-ui;color:#1a0e00}\
.s7hex{width:60px;height:66px}\
.s7lv b{font:900 12px system-ui}.s7lv small{font:800 11px system-ui;color:#fff3e0}\
.s7xp,.s7pb{height:11px;border-radius:7px;background:rgba(0,0,0,.28);margin:6px 0;overflow:hidden}.s7xp i,.s7pb i{display:block;height:100%;background:linear-gradient(90deg,#2fe0c0,#ffd23f)}\
.s7go{display:block;width:100%!important;margin:2px 0 0!important;background:#ffd23f!important;color:#1a0e00!important;border:0!important;border-radius:16px!important;padding:15px 0!important;font:900 italic 17px system-ui!important;box-shadow:0 6px 0 rgba(0,0,0,.3)!important;text-align:center!important}\
.s7sec{margin-top:6px;font:900 italic 15px system-ui;display:flex;align-items:center;gap:6px}\
.s7rw{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}\
.s7r{border-radius:14px;background:#3b2490;border:2px solid #5b3ec0;height:82px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:900 11px system-ui;text-align:center}\
.s7r.got{opacity:.55}.s7r.on{background:#ffd23f;color:#1a0e00;border-color:#fff;box-shadow:0 0 0 2px #ffd23f}.s7r svg{width:30px;height:30px}\
.s7qs{display:grid;gap:10px}\
.s7q{display:flex;align-items:center;gap:12px;background:rgba(20,10,50,.55);border:2px solid rgba(255,255,255,.08);border-radius:16px;padding:11px 12px}\
.s7q svg{width:30px;height:30px;flex:none}.s7q div{flex:1;min-width:0}.s7q b{font:900 14px system-ui;display:block;margin-bottom:4px}\
.s7q.done{border-color:#2fe0c0}\
.s7xpp{background:#ffd23f;color:#1a0e00;border-radius:12px;padding:5px 9px;font:900 12px system-ui;white-space:nowrap}\
.s7sub{display:flex;align-items:center;gap:10px}\
.s7big{font:900 italic 31px/1 system-ui;color:#ffd23f;margin:6px 0 12px;text-shadow:0 3px 0 rgba(0,0,0,.25)}\
.s7m{display:flex!important;align-items:center;gap:12px;width:100%!important;margin:0!important;border:0!important;border-radius:18px!important;padding:13px 13px!important;box-shadow:0 6px 0 rgba(0,0,0,.25)!important;color:#fff!important;text-align:left!important;cursor:pointer}\
.s7hx{width:44px;height:48px;background:#12082b;color:#fff;font-size:19px}\
.s7t{flex:1;min-width:0}.s7t b{font:900 italic 15px/1.1 system-ui;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.s7t small{display:block;font:800 11px system-ui;opacity:.92;margin-top:3px}\
.s7rt{display:flex;flex-direction:column;align-items:flex-end;gap:4px}\
.s7st{color:#ffd23f;font-size:14px;letter-spacing:1px;text-shadow:0 1px 0 rgba(0,0,0,.3)}.s7st i{font-style:normal;color:rgba(255,255,255,.35)}\
.s7m.lk{background:rgba(255,255,255,.07)!important;box-shadow:none!important;color:#8f86b8!important;cursor:default}.s7m.lk .s7hx{background:#1c1440}\
.s7dash{width:22px;height:8px;border-radius:4px;background:#8f86b8;opacity:.6}\
/* загальні елементи класу */\
body.g7.s7n #app>.top{display:flex;justify-content:space-between;align-items:center}\
body.g7.s7n #app>.top .sm{background:rgba(255,255,255,.1)!important;color:#d7d0ff!important;border:0!important;border-radius:10px!important;box-shadow:none!important;font:900 12px system-ui!important}\
body.g7.s7n #app>.top .mut{font:900 13px system-ui;color:#fff}\
body.g7.s7n #app>.bar{height:6px;border-radius:3px;background:rgba(255,255,255,.18);border:0;overflow:hidden}body.g7.s7n #app>.bar i{background:#ffd23f}\
body.g7.s7n #app .card{background:rgba(20,10,50,.55)!important;border:2px solid rgba(255,255,255,.08)!important;border-radius:20px!important;box-shadow:none!important;color:#ece8ff!important}\
body.g7.s7n #app .card h2{font:900 italic 26px/1.05 system-ui!important;color:#fff!important}\
body.g7.s7n #app .card p{font:600 15px/1.55 system-ui;color:#ece8ff}body.g7.s7n #app .card p b{color:#ffd23f}\
body.g7.s7n #app .card .kp{border-left:5px solid #ffd23f;background:rgba(255,255,255,.06);border-radius:6px 14px 14px 6px;padding:10px 14px 10px 30px}\
body.g7.s7n #app .card .fun{background:linear-gradient(90deg,#ff3f8e,#ff8a2a)!important;color:#fff!important;border:0!important;border-radius:16px!important}\
body.g7.s7n #app .card.s7les .s7tag{display:inline-block;background:#2fe0c0;color:#0b1a2a;border-radius:9px;padding:4px 10px;font:900 italic 12px system-ui;margin-bottom:6px}html body.g7.s7n #app .card.s7les .s7tag{margin-right:8px}html body.g7.s7n #app .card.s7les h2{font-size:21px!important;line-height:1.12!important}\
body.g7.s7n #app .card .bar{height:10px;border-radius:6px;background:rgba(0,0,0,.3);border:0}body.g7.s7n #app .card .bar i{background:linear-gradient(90deg,#2fe0c0,#ffd23f)}\
body.g7.s7n #app>.mb{display:flex!important;align-items:center;gap:12px;border:0!important;border-radius:18px!important;padding:13px!important;box-shadow:0 6px 0 rgba(0,0,0,.25)!important;color:#fff!important;margin:0 0 12px!important;background:linear-gradient(90deg,#4a6aff,#7a4aff)!important}\
body.g7.s7n #app>.mb:nth-of-type(3n+1){background:linear-gradient(90deg,#ff3f8e,#ff5a7a)!important}\
body.g7.s7n #app>.mb:nth-of-type(3n+3){background:linear-gradient(90deg,#14c8a8,#2fe0c0)!important}\
body.g7.s7n #app>.mb.k-rd{background:linear-gradient(90deg,#ff3f8e,#ff5a7a)!important}body.g7.s7n #app>.mb.k-gm{background:linear-gradient(90deg,#4a6aff,#7a4aff)!important}body.g7.s7n #app>.mb.k-cx{background:linear-gradient(90deg,#ff7a1a,#ffb02a)!important;box-shadow:0 6px 0 rgba(0,0,0,.25),0 0 0 3px #ffd23f inset!important}body.g7.s7n #app>.mb.k-rv{background:linear-gradient(90deg,#3a1458,#5a1648)!important;box-shadow:0 6px 0 rgba(0,0,0,.25),inset 0 0 0 3px #ff3f5a!important}body.g7.s7n #app>.mb.k-rv0{background:rgba(20,10,50,.55)!important;box-shadow:none!important;opacity:.8;cursor:default}body.g7.s7n #app>.mb .s7rvn{margin-left:auto;flex:none;width:34px!important;padding:0!important;background:#fff;color:#c21f3a;border-radius:12px;min-width:30px;height:30px;display:grid;place-items:center;font:900 15px system-ui}body.g7.s7n #app>.mb.k-rv .ic{display:grid!important;place-items:center;font-size:24px}body.g7.s7n #app>.mb.k-ts{background:linear-gradient(90deg,#14c8a8,#2fe0c0)!important}\
body.g7.s7n #app>.mb .s7cx{display:block;width:max-content;background:#150a33;color:#ffd23f;border-radius:8px;padding:2px 8px;font:900 10px system-ui;letter-spacing:.5px;margin-bottom:3px}\
body.g7.s7n #app>.mb .ic{background:#12082b!important;border:0!important;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);border-radius:0!important;width:46px!important;height:50px!important;box-shadow:none!important}\
body.g7.s7n #app>.mb .tx b{font:900 italic 15px system-ui!important;color:#fff!important}body.g7.s7n #app>.mb .sub{color:rgba(255,255,255,.9)!important;font:800 11px system-ui!important}\
body.g7.s7n #app .pri{background:#ffd23f!important;color:#1a0e00!important;border:0!important;border-radius:16px!important;box-shadow:0 6px 0 rgba(0,0,0,.3)!important;font:900 italic 17px system-ui!important}\
/* тест: кольорові кнопки списком з фігурою зліва */\
body.g7.s7n #o{display:grid!important;grid-template-columns:1fr;gap:10px;margin-top:14px}\
body.g7.s7n #o>button{background:linear-gradient(90deg,#4a3ab8,#5b3ec0)!important;margin:0!important;min-height:58px;border:0!important;border-radius:16px!important;color:#fff!important;font:800 16px/1.3 system-ui!important;box-shadow:0 5px 0 rgba(0,0,0,.28)!important;display:flex!important;align-items:center;gap:12px;text-align:left!important;padding:12px 16px!important;width:100%!important;justify-content:flex-start}\
\
\
\
\
body.g7.s7n #o>button:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.28)!important}\
body.g7.s7n #o>button.ok{background:linear-gradient(90deg,#14b89a,#2fe0c0)!important;outline:3px solid #fff;outline-offset:-3px}\
body.g7.s7n #o>button.bad{background:linear-gradient(90deg,#d8304f,#ff4f6e)!important}\
/* шапки ігор у стилі сезону */\
body.g7.s7n #app .card>.gbn{position:relative!important;height:118px!important;border:0!important;border-radius:22px!important;overflow:hidden!important;background:linear-gradient(120deg,var(--a1,#ff3f8e),var(--a2,#ff9a2a))!important;box-shadow:0 7px 0 rgba(0,0,0,.25)!important;margin-bottom:12px!important;animation:s7in .45s cubic-bezier(.2,1.4,.4,1) both}\
body.g7.s7n #app .card>.gbn::before{content:'';position:absolute;right:-40px;top:-40px;width:190px;height:190px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.18) 0 4px,transparent 4px 14px);animation:s7spin 18s linear infinite}\
body.g7.s7n #app .card>.gbn::after{content:'';position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-20deg);animation:s7sh 3.6s ease-in-out infinite}\
body.g7.s7n #app .card>.gbn>svg.g7a,body.g7.s7n #app .card>.gbn>.g7sh,body.g7.s7n #app .card>.gbn>.pxs{display:none!important}\
body.g7.s7n #app .card>.gbn>.gt{position:absolute!important;left:18px!important;top:auto!important;bottom:18px!important;right:120px!important;background:none!important;border:0!important;box-shadow:none!important;padding:0!important;transform:none!important;font:900 italic 25px/1.02 system-ui!important;color:#fff!important;text-transform:uppercase;letter-spacing:0!important;text-shadow:0 3px 0 rgba(0,0,0,.2)!important;-webkit-text-stroke:0!important;white-space:normal!important}\
body.g7.s7n #app .card>.gbn>.gt::before{content:'МІНІ-ГРА';display:block;font:900 italic 11px system-ui;color:rgba(255,255,255,.85);margin-bottom:4px;letter-spacing:.5px}\
body.g7.s7n #app .card>.gbn>svg:not(.g7a){position:absolute!important;right:22px!important;top:50%!important;left:auto!important;width:76px!important;height:76px!important;margin-top:-38px!important;z-index:2;filter:drop-shadow(0 5px 0 rgba(0,0,0,.25));animation:s7bob 2.6s ease-in-out infinite}\
body.g7.s7n #app .card>.gbn>svg.g7i{position:absolute!important;right:12px!important;top:50%!important;width:96px!important;height:104px!important;margin-top:-52px!important;z-index:1;opacity:1}\
body.g7.s7n #app .card>.gbn+h2{display:none!important}\
body.g7.s7n #app #gs{background:#ffd23f!important;color:#1a0e00!important;border:0!important;box-shadow:0 3px 0 rgba(0,0,0,.25)!important;border-radius:14px!important;font:900 12px system-ui!important;padding:6px 12px!important;-webkit-text-stroke:0!important;text-shadow:none!important}\
body.g7.s7n #gn button,body.g7.s7n #app .card .opts button{animation:s7up .35s ease-out both}\
body.g7.s7n #gn button:nth-child(2){animation-delay:.06s}body.g7.s7n #gn button:nth-child(3){animation-delay:.12s}body.g7.s7n #gn button:nth-child(4){animation-delay:.18s}\
body.g7.s7n #o>button{animation:s7up .35s ease-out both}body.g7.s7n #o>button:nth-child(2){animation-delay:.06s}body.g7.s7n #o>button:nth-child(3){animation-delay:.12s}body.g7.s7n #o>button:nth-child(4){animation-delay:.18s}\
body.g7.s7n #o>button.ok{animation:s7pop .4s ease-out}body.g7.s7n #o>button.bad{animation:s7shake .4s ease-out}\
.s7seas .s7rings{animation:s7spin 22s linear infinite}.s7hex{animation:s7bob 3s ease-in-out infinite}.s7m:not(.lk){animation:s7up .35s ease-out both}\
.s7ms .s7m:nth-child(2){animation-delay:.04s}.s7ms .s7m:nth-child(3){animation-delay:.08s}.s7ms .s7m:nth-child(4){animation-delay:.12s}.s7ms .s7m:nth-child(5){animation-delay:.16s}.s7ms .s7m:nth-child(n+6){animation-delay:.2s}\
.s7go{animation:s7pulse 2.2s ease-in-out infinite}\
@keyframes s7spin{to{transform:rotate(360deg)}}@keyframes s7sh{0%,55%{left:-60%}100%{left:130%}}@keyframes s7bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}\
@keyframes s7in{from{transform:scale(.92);opacity:0}to{transform:none;opacity:1}}@keyframes s7up{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}\
@keyframes s7pop{0%{transform:scale(1)}40%{transform:scale(1.04)}100%{transform:scale(1)}}@keyframes s7shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\
@keyframes s7pulse{0%,100%{box-shadow:0 6px 0 rgba(0,0,0,.3),0 0 0 0 rgba(255,210,63,.5)}50%{box-shadow:0 6px 0 rgba(0,0,0,.3),0 0 0 8px rgba(255,210,63,0)}}\
@media (prefers-reduced-motion:reduce){body.g7.s7n *{animation:none!important}}\
";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
})();

;(window.__GPL=window.__GPL||[]).push("g7_8");
