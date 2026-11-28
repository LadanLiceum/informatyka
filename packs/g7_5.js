/* Арена знань – стиль 7 класу */
(function(){
var D="#150a33",S="body.g5.g7";
var css=[
S+"{--k7:#7b3cff;--pri:#ffd23a;background:linear-gradient(160deg,#2a1370 0%,#16307e 55%,#0a5f95 100%)!important;background-attachment:fixed!important}",
S+":before{background:repeating-linear-gradient(115deg,rgba(255,255,255,.07) 0 26px,transparent 26px 60px)!important}",
S+" h1,"+S+" h2{text-transform:uppercase;transform:skewX(-8deg) rotate(-1.5deg);transform-origin:left center;text-shadow:3px 3px 0 "+D+",-1px -1px 0 "+D+",5px 5px 0 #ff3d8b!important;letter-spacing:.8px}",
S+" #app .hero h1{color:#fff!important}",
S+" .card,"+S+" .lv{background:linear-gradient(180deg,#2a1668,"+D+")!important;border:3px solid #fff!important;border-radius:16px!important;box-shadow:5px 5px 0 #0d0620!important}",
S+" .ill-wrap{border:3px solid #fff!important;box-shadow:5px 5px 0 #0d0620!important}",
S+" button{border:3px solid "+D+"!important;border-radius:12px!important;box-shadow:3px 4px 0 "+D+"!important;text-transform:none}",
S+" button.pri{background:linear-gradient(#ffe24a,#ffb000)!important;color:#2a1a00!important;text-shadow:none!important;text-transform:uppercase;transform:skewX(-6deg);box-shadow:0 5px 0 #8a5a00!important}",
S+" button.pri:active{transform:skewX(-6deg) translateY(4px)}",
S+" button.sm{background:"+D+"!important;color:#fff!important;border:3px solid #fff!important;transform:skewX(-8deg);box-shadow:3px 3px 0 #0d0620!important}",
S+" .mb{border:3px solid #fff!important;border-radius:14px!important;box-shadow:4px 4px 0 #0d0620!important;transform:rotate(-.6deg);text-shadow:none!important}",
S+" .mb:nth-of-type(even){transform:rotate(.6deg)}",
S+" .mb b{text-shadow:2px 2px 0 "+D+"!important;text-transform:uppercase;letter-spacing:.3px}",
S+" .mb .sub{text-shadow:1px 1px 0 "+D+"!important}",
S+" .mb .ic{border:3px solid "+D+"!important;background:rgba(255,255,255,.28)!important;border-radius:12px!important;transform:skewX(-6deg)}",
S+" .lock{filter:grayscale(.9) brightness(.7)!important}",
S+" .bar,"+S+" .pbar{background:"+D+"!important;border:3px solid #fff!important}",
S+" .bar i,"+S+" .pbar i{background:linear-gradient(90deg,#ffd23a,#ff8a2a)!important;border-right:2px solid "+D+"!important}",
S+" .go7{background:linear-gradient(#ffe24a,#ffb000)!important;color:#2a1a00!important;text-shadow:none!important;border:3px solid "+D+"!important;text-transform:uppercase;transform:skewX(-6deg)}",
S+" .blk{background:linear-gradient(#7b3cff,#5b2bd6)!important;border:3px solid "+D+"!important;text-shadow:none!important;font-weight:900;box-shadow:3px 4px 0 "+D+"!important}",
S+" .blk.ok,"+S+" button.ok{background:linear-gradient(#8dff9a,#2fbf5a)!important;color:#073d1a!important}",
S+" .blk.bad,"+S+" button.bad{background:linear-gradient(#ff9ab8,#e0306a)!important;color:#fff!important}",
S+" .ach .at{color:#ffd23a;text-transform:uppercase;letter-spacing:.5px}",
S+" .atoast .acard,"+S+" .t7 .acard{background:linear-gradient(#2a1668,"+D+")!important;border:3px solid #ffd23a!important;box-shadow:0 0 26px #ffd23a88,5px 5px 0 #0d0620!important}",
S+" .atoast .ahd{color:#ffd23a!important}",
S+" .kp li,"+S+" .fun,"+S+" .chip{border:3px solid "+D+"!important;box-shadow:3px 3px 0 "+D+"}",
S+" .wpill{display:none}"
].join("");
var st=document.createElement("style");st.id="a7css";st.textContent=css;document.head.appendChild(st);
/* заголовок-«сезон» на списку тем */
var _tp=window.topics;
function ban(){try{if(!document.body.classList.contains("g7"))return;var a=document.getElementById("app");if(!a||a.querySelector(".s7"))return;var h=a.querySelector(".c7,.hero,.lv");if(!h)return;var d=document.createElement("div");d.className="s7";d.style.cssText="display:inline-block;margin:6px 0 2px;background:#ff3d8b;color:#fff;border:3px solid #fff;border-radius:10px;padding:3px 12px;font-weight:900;font-size:12px;text-transform:uppercase;transform:skewX(-8deg) rotate(-2deg);box-shadow:3px 3px 0 #0d0620;letter-spacing:.6px";d.textContent="Арена знань";h.insertBefore(d,h.firstChild)}catch(e){}}
if(typeof _tp=="function"){window.topics=function(){var r=_tp.apply(this,arguments);ban();return r}}

/* ===== іконки, аватар, сезони ===== */
var W="#fff",Y="#ffd23a",P="#ff5c9d",C="#5ee7ff",G="#5dff9a",O="#ff9a3a",V="#b58cff",R="#ff4d5e",N="#150a33",BR="#c98a4b";
function sv(x,sz){return "<svg viewBox='0 0 48 48' width='"+(sz||34)+"' height='"+(sz||34)+"' stroke='"+N+"' stroke-width='2.2' stroke-linejoin='round' stroke-linecap='round' aria-hidden='true'>"+x+"</svg>"}
function rc(x,y,w,h,f,r){return "<rect x='"+x+"' y='"+y+"' width='"+w+"' height='"+h+"' rx='"+(r||3)+"' fill='"+f+"'/>"}
function ci(x,y,r,f){return "<circle cx='"+x+"' cy='"+y+"' r='"+r+"' fill='"+f+"'/>"}
function pa(d,f){return "<path d='"+d+"' fill='"+(f||"none")+"'/>"}
var IC={
"📖":sv(pa("M5 11L24 15L43 11V37L24 41L5 37Z",W)+pa("M24 15V41")+pa("M10 20L19 22M10 26L19 28M29 22L38 20M29 28L38 26","none")),
"🔍":sv(ci(20,20,13,C)+pa("M12 15A9 9 0 0 1 19 11","none")+pa("M30 30L42 42")+"<path d='M30 30L42 42' stroke='"+Y+"' stroke-width='6'/>"),
"📦":sv(pa("M24 5L42 13V33L24 43L6 33V13Z",BR)+pa("M6 13L24 22L42 13")+pa("M24 22V43")+pa("M15 9L33 18","none")),
"⚡":sv(pa("M27 3L9 27H22L19 45L39 19H26Z",Y)),
"💥":sv(pa("M24 3L29 15L41 9L35 21L45 26L33 30L37 43L24 35L11 43L15 30L3 26L13 21L7 9L19 15Z",O)+ci(24,25,6,Y)),
"🔢":sv(rc(5,10,38,28,W,5)+"<text x='24' y='31' font-size='17' font-weight='900' text-anchor='middle' fill='"+N+"' stroke='none'>123</text>"),
"✏️":sv(pa("M8 40L10 30L32 8L40 16L18 38Z",Y)+pa("M28 12L36 20")+pa("M8 40L10 30L18 38Z",W)+"<path d='M32 8L40 16' stroke='"+P+"' stroke-width='5'/>"),
"📝":sv(rc(9,5,30,38,W,4)+pa("M15 15H33M15 22H33M15 29H25","none")+pa("M26 36L30 40L40 28","none")+"<path d='M26 36L30 40L40 28' stroke='"+G+"' stroke-width='5'/>"),
"🕵️":sv(pa("M6 22H42L36 20L33 8H15L12 20Z",V)+rc(14,22,20,16,"#ffd9b0",6)+rc(15,26,18,6,N,3)+ci(20,29,2,C)+ci(28,29,2,C)),
"🔗":sv(rc(4,16,22,16,"none",8)+rc(22,16,22,16,"none",8)+"<rect x='4' y='16' width='22' height='16' rx='8' fill='none' stroke='"+C+"' stroke-width='5'/><rect x='22' y='16' width='22' height='16' rx='8' fill='none' stroke='"+Y+"' stroke-width='5'/>"),
"🚫":sv(ci(24,24,18,R)+ci(24,24,11,"#ffd0d6")+"<path d='M15 33L33 15' stroke='"+R+"' stroke-width='6'/>"),
"🗺️":sv(pa("M4 11L16 7L32 11L44 7V37L32 41L16 37L4 41Z",W)+pa("M16 7V37M32 11V41")+pa("M20 28Q26 18 30 24","none")+ci(36,22,4,R)),
"🚪":sv(rc(10,5,28,38,BR,3)+rc(14,10,20,12,"#e0b070",2)+ci(32,27,2.5,Y)),
"💻":sv(rc(8,8,32,23,"#2a2a5c",3)+rc(11,11,26,17,C,2)+pa("M3 36H45L40 31H8Z",W)),
"🧩":sv(pa("M6 14H18A5 5 0 1 1 28 14H40V26A5 5 0 1 0 40 36V42H6Z",G)),
"🕹️":sv(rc(6,32,36,10,V,4)+pa("M24 32V16","none")+"<path d='M24 32V16' stroke='"+W+"' stroke-width='5'/>"+ci(24,12,8,R)),
"🔀":sv(pa("M5 14H15Q24 14 28 24T41 34H34M41 34L35 28M41 34L35 40","none")+pa("M5 34H15Q20 34 23 30M28 18Q31 14 41 14H34M41 14L35 8M41 14L35 20","none")),
"🎯":sv(ci(24,24,19,W)+ci(24,24,13,R)+ci(24,24,7,W)+ci(24,24,3,R)),
"🪜":sv(pa("M13 4L10 44M35 4L38 44","none")+"<path d='M13 4L10 44M35 4L38 44' stroke='"+BR+"' stroke-width='5'/>"+pa("M12 14H36M11 24H37M10 34H38","none")),
"🧪":sv(pa("M19 4H29V16L40 38Q42 44 36 44H12Q6 44 8 38L19 16Z",W)+pa("M12 32H36L40 38Q42 44 36 44H12Q6 44 8 38Z",G)+ci(20,26,2,W)),
"🔓":sv(pa("M15 21V14A9 9 0 0 1 32 11","none")+rc(9,21,30,22,Y,5)+ci(24,31,3.5,N)),
"🐞":sv(pa("M24 8A16 17 0 1 1 24 42A16 17 0 1 1 24 8Z",R)+pa("M24 8V42","none")+ci(16,22,3,N)+ci(32,22,3,N)+ci(18,33,3,N)+ci(30,33,3,N)+ci(24,8,6,N)),
"🏅":sv(pa("M14 3L22 20H30L36 3","none")+"<path d='M14 3L22 20M34 3L26 20' stroke='"+P+"' stroke-width='6'/>"+ci(24,31,12,Y)+"<text x='24' y='37' font-size='15' font-weight='900' text-anchor='middle' fill='"+N+"' stroke='none'>1</text>"),
"📜":sv(pa("M12 7H38V37Q38 43 32 43H12Q18 43 18 37V12Q18 7 12 7Z",W)+pa("M12 7Q6 7 6 12V14H18","none")+pa("M23 16H33M23 23H33M23 30H31","none")),
"🦸":sv(pa("M10 18L24 44L38 18L24 24Z",R)+ci(24,13,8,"#ffd9b0")+rc(15,10,18,5,N,2)+pa("M20 29L24 34L28 29","none")),
"🪟":sv(rc(5,6,38,36,C,3)+pa("M24 6V42M5 24H43","none")+pa("M9 10L17 10","none")),
"🖼️":sv(rc(4,7,40,34,BR,3)+rc(9,12,30,24,"#7fd8ff",2)+ci(18,20,4,Y)+pa("M9 36L21 24L28 32L33 27L39 34V36Z",G)),
"🎛️":sv(pa("M12 6V42M24 6V42M36 6V42","none")+rc(7,28,10,7,Y,2)+rc(19,12,10,7,P,2)+rc(31,22,10,7,C,2)),
"⏱️":sv(ci(24,27,16,W)+rc(20,4,8,6,Y,2)+pa("M24 27V17M24 27L31 31","none")+pa("M38 12L41 9","none")),
"🗼":sv(pa("M24 3L28 16H20ZM20 16H28L36 44H12Z",Y)+pa("M18 30H30M15 38H33","none")+ci(24,10,2,R)),
"🃏":sv(rc(5,10,24,32,W,4)+"<g transform='rotate(14 34 26)'>"+rc(24,8,20,30,Y,4)+ci(34,23,5,R)+"</g>"),
"⚔️":sv(pa("M6 6L28 28M42 6L20 28","none")+"<path d='M6 6L28 28M42 6L20 28' stroke='"+W+"' stroke-width='6'/>"+pa("M10 32L16 38M38 32L32 38M24 28L24 40","none")+"<path d='M10 32L16 38M38 32L32 38' stroke='"+Y+"' stroke-width='6'/>"),
"🔒":sv(pa("M15 21V14A9 9 0 0 1 33 14V21","none")+rc(9,21,30,22,"#9aa3c7",5)+ci(24,31,3.5,N)),
"🎮":sv(rc(4,14,40,22,V,10)+pa("M13 21V29M9 25H17","none")+ci(33,22,3,Y)+ci(37,27,3,G)),
"T1":sv(ci(22,22,16,"#3aa0ff")+pa("M6 22H38M22 6Q12 22 22 38M22 6Q32 22 22 38","none")+"<path d='M32 32L44 44' stroke='"+Y+"' stroke-width='6'/>"+ci(32,32,6,"none")),
"T2":sv(rc(16,4,16,10,Y,3)+rc(4,34,16,10,C,3)+rc(28,34,16,10,P,3)+pa("M24 14V24M12 34V24H36V34","none")),
"T3":sv(rc(4,8,40,26,W,3)+rc(8,12,14,8,P,1)+pa("M26 14H38M26 20H38M8 26H38","none")+pa("M18 34L14 44M30 34L34 44","none")),
"T4":sv(pa("M8 28V24A16 16 0 0 1 40 24V28","none")+"<path d='M8 28V24A16 16 0 0 1 40 24V28' stroke='"+W+"' stroke-width='4' fill='none'/>"+rc(5,26,10,16,P,4)+rc(33,26,10,16,P,4)),
"T5":sv(rc(4,16,40,26,"#2a2a5c",3)+pa("M4 16L12 6H20L12 16M20 16L28 6H36L28 16M36 16L44 6",W)+pa("M18 24L32 30L18 36Z",Y)),
"T6":sv(pa("M10 4V44","none")+"<path d='M10 4V44' stroke='"+BR+"' stroke-width='5'/>"+pa("M12 6H42V26H12Z",W)+rc(12,6,10,10,N,0)+rc(32,6,10,10,N,0)+rc(22,16,10,10,N,0))
};
var BOT="<svg viewBox='0 0 72 72' width='60' height='60' stroke='"+N+"' stroke-width='3' stroke-linejoin='round' aria-hidden='true'><path d='M36 6V15' fill='none'/><circle cx='36' cy='6' r='4' fill='"+R+"'/><rect x='10' y='28' width='7' height='16' rx='3' fill='"+V+"'/><rect x='55' y='28' width='7' height='16' rx='3' fill='"+V+"'/><rect x='15' y='15' width='42' height='42' rx='13' fill='#9aa8e0'/><rect x='15' y='15' width='42' height='14' rx='13' fill='#b9c4f0' stroke='none'/><rect x='21' y='27' width='30' height='15' rx='7' fill='"+N+"'/><circle cx='30' cy='34.5' r='4' fill='"+C+"' stroke='none'/><circle cx='42' cy='34.5' r='4' fill='"+C+"' stroke='none'/><rect x='28' y='47' width='16' height='5' rx='2.5' fill='"+G+"'/></svg>";
var BD=document.body;
var _m7=window.mb;
if(typeof _m7=="function")window.mb=function(c,i,t,s,f){if(BD.classList.contains("g7")&&IC[i])i=IC[i];return _m7.call(this,c,i,t,s,f)};
if(window.TP7)TP7.forEach(function(t,k){t.i=IC["T"+(k+1)]});
var _h7=window.hero7;if(typeof _h7=="function")window.hero7=function(){return _h7.apply(this,arguments).replace("<div class='hv7'>🦊</div>","<div class='hv7'>"+BOT+"</div>")};
var SE=[
["Кібер-океан","#19c6ff","#04205a","#0a4fa0","#0b8fb8","repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 3px,transparent 3px 22px)"],
["Лабіринт коду","#ff4dd2","#2a0a5e","#5a1aa8","#b02a8c","linear-gradient(rgba(255,255,255,.07) 2px,transparent 2px) 0 0/34px 34px,linear-gradient(90deg,rgba(255,255,255,.07) 2px,transparent 2px) 0 0/34px 34px"],
["Сцена","#5dff9a","#0b2f26","#0f6b46","#b88a10","radial-gradient(circle at 50% 0,rgba(255,255,200,.22),transparent 55%)"],
["Неонове місто","#ff5c9d","#1a0535","#5a1590","#e0287c","radial-gradient(rgba(255,255,255,.12) 2px,transparent 2px) 0 0/22px 22px"],
["Вулкан","#ffa23a","#2e0808","#8f2108","#e8650f","repeating-linear-gradient(135deg,rgba(255,200,100,.08) 0 14px,transparent 14px 34px)"],
["Фінальний заїзд","#ffd23a","#06292b","#0a6f6b","#b58a10","conic-gradient(rgba(255,255,255,.07) 25%,transparent 0 50%,rgba(255,255,255,.07) 0 75%,transparent 0) 0 0/44px 44px"]];
var sc=SE.map(function(e,i){var q="body.g5.g7[data-s='"+(i+1)+"']";
 return q+"{--sa:"+e[1]+";background:linear-gradient(160deg,"+e[2]+" 0%,"+e[3]+" 58%,"+e[4]+" 130%)!important;background-attachment:fixed!important}"+
 q+":before{background:"+e[5]+"!important}"+
 q+" .card,"+q+" .lv{background:linear-gradient(180deg,color-mix(in srgb,"+e[1]+" 16%,"+e[2]+"),#0c0620)!important;border-color:"+e[1]+"!important}"+
 q+" h1,"+q+" h2{text-shadow:3px 3px 0 #0c0620,-1px -1px 0 #0c0620,5px 5px 0 "+e[1]+"!important}"+
 q+" .bar i,"+q+" .pbar i{background:linear-gradient(90deg,"+e[1]+",#fff)!important}"+
 q+" .s7{background:"+e[1]+"!important;color:#150a33!important}"+
 q+" .mb{border-color:"+e[1]+"!important;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 62%,"+e[3]+"),color-mix(in srgb,var(--c) 28%,"+e[2]+"))!important}"}).join("");
var st2=document.createElement("style");st2.textContent=sc+
"body.g5.g7 .mb .ic{background:rgba(8,4,32,.45)!important}body.g5.g7 .mb .ic svg{display:block;margin:auto;filter:drop-shadow(0 2px 0 rgba(0,0,0,.35))}body.g5.g7 .hero .big svg{width:76px;height:76px}body.g5.g7 .hv7{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#3a2a9a,#150a33)!important;border:3px solid #fff;border-radius:16px}"+
"body.g5.g7 .mb{background:linear-gradient(135deg,color-mix(in srgb,var(--c) 62%,#150a33),color-mix(in srgb,var(--c) 25%,#0c0620))}body.g5.g7 .hero{text-align:left}";
document.head.appendChild(st2);
function ribbon(i){var a=document.getElementById("app");if(!a)return;var o=a.querySelector(".s7");if(o)o.remove();var d=document.createElement("div");d.className="s7";d.style.cssText="display:table;margin:0 0 10px;border:3px solid #fff;border-radius:10px;padding:3px 12px;font-weight:900;font-size:12px;text-transform:uppercase;transform:skewX(-8deg) rotate(-2deg);box-shadow:3px 3px 0 #0d0620;letter-spacing:.6px";d.textContent="Сезон "+(i+1)+" · "+SE[i][0];var h=a.querySelector(".hero")||a.querySelector(".card");if(h)h.insertBefore(d,h.firstChild)}
var _s7=window.section7;if(typeof _s7=="function")window.section7=function(k){var r=_s7.apply(this,arguments);BD.dataset.s=k||1;ribbon((k||1)-1);try{banner((k||1)-1)}catch(e){}return r};
var _le7=window.lesson7;if(typeof _le7=="function")window.lesson7=function(n){var r=_le7.apply(this,arguments);var k=tp7(n);BD.dataset.s=k+1;ribbon(k);return r};
var _tp2=window.topics;window.topics=function(){var r=_tp2.apply(this,arguments);try{delete BD.dataset.s;if(BD.classList.contains("g7")){var bs=document.querySelectorAll("#app>.mb");Array.prototype.forEach.call(bs,function(b,i){if(SE[i]){b.dataset.sk=i+1;b.style.setProperty("--c",SE[i][1]);b.style.borderColor=SE[i][1];var sub=b.querySelector(".sub");if(sub)sub.textContent="Сезон "+(i+1)+" · "+sub.textContent}})}}catch(e){}return r};

/* ===== великі анімовані плитки сезонів + ефект у шапці ===== */
function tw(n,f){var o="";for(var i=0;i<n;i++)o+=f(i);return o}
var AR=[
 /*1 океан*/ "<g class='wv1'><path d='M-20 78Q0 66 20 78T60 78T100 78T140 78T180 78V130H-20Z' fill='rgba(120,220,255,.28)'/></g><g class='wv2'><path d='M-20 92Q0 82 20 92T60 92T100 92T140 92T180 92V130H-20Z' fill='rgba(60,160,255,.35)'/></g>"+tw(7,function(i){return "<circle class='bb' cx='"+(70+i*13)+"' cy='100' r='"+(2+i%3)+"' fill='none' stroke='#cfeeff' stroke-width='1.6' style='animation-delay:"+(i*.55)+"s'/>"})+"<g class='fl1'><path d='M118 40Q132 34 142 44Q132 50 118 40ZM142 44L152 36V52Z' fill='rgba(255,255,255,.45)'/></g>",
 /*2 лабіринт*/ "<path d='M60 20H150M60 50H150M60 80H150M60 110H150M80 10V120M110 10V120M140 10V120' stroke='rgba(255,255,255,.2)' stroke-width='1.5' fill='none'/><path class='dsh' d='M64 24H106V54H84V84H144V108' stroke='#ffd23a' stroke-width='3.5' fill='none' stroke-dasharray='10 8' stroke-linecap='round'/>"+[[106,24],[84,54],[144,84],[144,108]].map(function(p,i){return "<circle class='pu' cx='"+p[0]+"' cy='"+p[1]+"' r='5' fill='#ff4dd2' style='animation-delay:"+(i*.4)+"s'/>"}).join(""),
 /*3 сцена*/ "<g class='sw1'><path d='M150 -4L110 124H170Z' fill='rgba(255,255,200,.30)'/></g><g class='sw2'><path d='M90 -4L50 124H130Z' fill='rgba(160,255,200,.22)'/></g><rect x='40' y='108' width='130' height='14' fill='rgba(0,0,0,.28)'/>"+tw(6,function(i){return "<path class='ts' d='M"+(70+i*17)+" "+(28+(i*23)%50)+"l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z' fill='#fff7b0' style='animation-delay:"+(i*.35)+"s'/>"}),
 /*4 місто*/ "<circle class='pu' cx='138' cy='28' r='13' fill='rgba(255,230,255,.55)'/>"+[[44,60,24],[70,40,26],[98,70,22],[122,52,24],[148,64,20]].map(function(b,i){return "<rect x='"+b[0]+"' y='"+b[1]+"' width='"+b[2]+"' height='"+(124-b[1])+"' fill='rgba(20,5,50,.55)'/>"+tw(6,function(j){return "<rect class='wn' x='"+(b[0]+4+(j%2)*10)+"' y='"+(b[1]+6+Math.floor(j/2)*14)+"' width='5' height='7' fill='#ffd23a' style='animation-delay:"+((i*3+j)*.37%2.4)+"s'/>"})}).join(""),
 /*5 вулкан*/ "<path d='M40 124L96 34H114L170 124Z' fill='rgba(40,5,5,.55)'/><path d='M96 34H114L110 48L105 42L100 50Z' fill='#ffb22a'/><path class='lv' d='M100 50Q104 80 94 124H116Q110 80 110 48Z' fill='rgba(255,140,30,.55)'/>"+tw(9,function(i){return "<circle class='sp' cx='"+(98+(i*7)%20)+"' cy='36' r='"+(1.5+i%3)+"' fill='#ffd23a' style='animation-delay:"+(i*.33)+"s;--dx:"+((i%2?1:-1)*(8+i*3))+"px'/>"}),
 /*6 фінал*/ "<rect x='46' y='14' width='4' height='108' rx='2' fill='rgba(255,255,255,.7)'/><g class='fg'>"+tw(4,function(r){return tw(6,function(c){return "<rect x='"+(52+c*14)+"' y='"+(16+r*13)+"' width='14' height='13' fill='"+((r+c)%2?"rgba(10,10,20,.7)":"rgba(255,255,255,.75)")+"'/>"})})+"</g>"
];
function art(i){return "<svg class='sc7' viewBox='0 0 160 124' preserveAspectRatio='xMaxYMid slice' aria-hidden='true'>"+(i==5?"<g transform='translate(42 0)'>"+AR[i]+"</g>":AR[i])+"</svg>"}
function banner(i){var h=document.querySelector("#app .hero");if(!h||h.querySelector(".sb7"))return;var bg=h.querySelector(".big");if(bg)bg.remove();h.classList.add("hb7");h.insertAdjacentHTML("afterbegin","<svg class='sb7' viewBox='36 0 134 124' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>"+(i==5?"<g transform='translate(42 0)'>"+AR[i]+"</g>":AR[i])+"</svg><div class='sh7'></div>")}
var FX="<svg class='fx7' viewBox='0 0 120 120' aria-hidden='true'><g class='rg1'><circle cx='60' cy='60' r='50' fill='none' stroke='rgba(255,255,255,.35)' stroke-width='2' stroke-dasharray='8 10'/></g><g class='rg2'><circle cx='60' cy='60' r='36' fill='none' stroke='rgba(94,231,255,.45)' stroke-width='2.5' stroke-dasharray='20 14'/></g><g class='rg3'><path d='M60 60L60 10A50 50 0 0 1 100 30Z' fill='rgba(255,210,58,.22)'/></g><circle cx='60' cy='60' r='6' fill='rgba(255,255,255,.5)'/>"+[[60,10],[100,30],[26,28],[94,92],[18,70]].map(function(p,i){return "<circle class='pu' cx='"+p[0]+"' cy='"+p[1]+"' r='4' fill='#ffd23a' style='animation-delay:"+(i*.45)+"s'/>"}).join("")+"</svg>";
var st3=document.createElement("style");st3.textContent=
"body.g5.g7 #app>.mb[data-sk]{position:relative;overflow:hidden;min-height:132px;padding:16px;align-items:flex-start}"+
"body.g5.g7 #app>.mb[data-sk] .ic{width:64px;height:64px}body.g5.g7 #app>.mb[data-sk] .ic svg{width:44px;height:44px}"+
"body.g5.g7 #app>.mb[data-sk] .tx,body.g5.g7 #app>.mb[data-sk] .ic,body.g5.g7 #app>.mb[data-sk] .go7{position:relative;z-index:2}"+
"body.g5.g7 #app>.mb[data-sk] .go7{align-self:center}body.g5.g7 #app>.mb[data-sk] b{font-size:17px!important}"+
".sc7{position:absolute;right:0;top:0;height:100%;width:62%;z-index:1;pointer-events:none;opacity:.8}"+
".fx7{position:absolute;right:6px;top:50%;margin-top:-52px;width:104px;height:104px;pointer-events:none;opacity:.7}.c7{position:relative;overflow:hidden}.c7 .c7r{position:relative;z-index:2}"+
"@keyframes wvx{from{transform:translateX(0)}to{transform:translateX(-40px)}}.wv1{animation:wvx 5s linear infinite}.wv2{animation:wvx 3.2s linear infinite reverse}"+
"@keyframes bbu{0%{transform:translateY(0);opacity:0}20%{opacity:.9}100%{transform:translateY(-70px);opacity:0}}.bb{animation:bbu 3.6s ease-in infinite}"+
"@keyframes flo{50%{transform:translate(-14px,5px)}}.fl1{animation:flo 4s ease-in-out infinite}"+
"@keyframes dsh{to{stroke-dashoffset:-36}}.dsh{animation:dsh 1.2s linear infinite}"+
"@keyframes pul{0%,100%{opacity:.3;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}.pu{transform-box:fill-box;transform-origin:center;animation:pul 1.8s ease-in-out infinite}"+
"@keyframes swg{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}.sw1{transform-origin:150px -4px;animation:swg 4s ease-in-out infinite}.sw2{transform-origin:90px -4px;animation:swg 5s ease-in-out infinite reverse}"+
".ts{transform-box:fill-box;transform-origin:center;animation:pul 1.5s ease-in-out infinite}"+
"@keyframes wnk{0%,100%{opacity:.9}50%{opacity:.1}}.wn{animation:wnk 2.4s steps(2) infinite}"+
"@keyframes spk{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--dx),-44px);opacity:0}}.sp{animation:spk 2.2s ease-out infinite}"+
"@keyframes lvp{50%{opacity:.45}}.lv{animation:lvp 2s infinite}"+
"@keyframes flw{0%,100%{transform:skewY(-5deg)}50%{transform:skewY(5deg)}}.fg{transform-origin:52px 60px;animation:flw 1.6s ease-in-out infinite}"+
"@keyframes rot{to{transform:rotate(360deg)}}.rg1,.rg2,.rg3{transform-origin:60px 60px}.rg1{animation:rot 24s linear infinite}.rg2{animation:rot 12s linear infinite reverse}.rg3{animation:rot 5s linear infinite}";
st3.textContent+="body.g5.g7 .hero.hb7{position:relative;overflow:hidden;min-height:190px;border:3px solid var(--sa,#fff);border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;text-align:left;box-shadow:5px 5px 0 #0d0620;background:linear-gradient(160deg,color-mix(in srgb,var(--sa,#5ee7ff) 30%,#0c0620),#0c0620)}.sb7{position:absolute;inset:0;width:100%;height:100%;z-index:0;opacity:1}.hb7 .s7{align-self:flex-start}.sh7{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,4,28,.82) 0%,rgba(8,4,28,.35) 48%,rgba(8,4,28,0) 72%)}.hb7>*:not(.sb7):not(.sh7){position:relative;z-index:2}.hb7 h1{margin:6px 0;font-size:24px;max-width:75%}.hb7 .mut{max-width:75%}";
document.head.appendChild(st3);
var _tp3=window.topics;window.topics=function(){var r=_tp3.apply(this,arguments);try{if(BD.classList.contains("g7")){document.querySelectorAll("#app>.mb[data-sk]").forEach(function(b,i){if(!b.querySelector(".sc7"))b.insertAdjacentHTML("afterbegin",art(i))});var c=document.querySelector("#app .c7");if(c&&!c.querySelector(".fx7"))c.insertAdjacentHTML("afterbegin",FX)}}catch(e){}return r};

/* ===== шапки ігор 7 класу ===== */
var st4=document.createElement("style");st4.textContent=
"body.g5.g7 .gbn{position:relative;overflow:hidden;min-height:76px;height:auto!important;border:3px solid var(--sa,#fff)!important;border-radius:14px!important;box-shadow:4px 4px 0 #0d0620!important;background:linear-gradient(135deg,color-mix(in srgb,var(--sa,#5ee7ff) 35%,#0c0620),#0c0620 80%)!important;display:flex;align-items:center;padding:12px}"+
"body.g5.g7 .gbn>svg:not(.g7a):not(.g7i){display:none!important}"+
".gbn .g7a{position:absolute;inset:0;width:100%;height:100%;opacity:.9;z-index:0}.gbn .g7sh{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,4,28,.7),rgba(8,4,28,0) 70%)}"+
".gbn .g7i{position:relative;z-index:2;flex:none;width:52px;height:52px;padding:0;border:0;background:none;box-shadow:none;filter:drop-shadow(0 3px 0 rgba(0,0,0,.45));transform:rotate(-6deg)}"+
"body.g5.g7 .gbn .gt{position:relative;z-index:2;margin-left:14px;background:var(--sa,#ff3d8b)!important;color:#150a33!important;border:3px solid #fff!important;border-radius:10px;padding:5px 12px!important;font-weight:900;font-size:13px;text-transform:uppercase;transform:skewX(-8deg);box-shadow:3px 3px 0 #0d0620;letter-spacing:.5px;text-shadow:none!important;position:relative}";
document.head.appendChild(st4);
function fixGbn(){try{if(!BD.classList.contains("g7"))return;var g=document.querySelector("#app .gbn:not(.g7d)");if(!g)return;g.classList.add("g7d");var n=CUR9-700,k=(n>=1&&n<=52)?tp7(n):0;BD.dataset.s=k+1;var e="🎮",t=window.BNT,m=window.GI7&&GI7[t]||window.GI&&GI[t]||window.GI5&&GI5[t];if(m&&m[0])e=m[0];var ic=IC[e]||IC["🎮"];
 g.insertAdjacentHTML("afterbegin","<svg class='g7a' viewBox='36 0 134 124' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>"+AR[k]+"</svg><div class='g7sh'></div>"+ic.replace("<svg ","<svg class='g7i' ").replace(/width='\d+' height='\d+'/,""))}catch(x){}}
new MutationObserver(function(){fixGbn()}).observe(document.getElementById("app")||BD,{childList:true,subtree:true});

var st5=document.createElement("style");st5.textContent="body.g5.g7 #cl{display:grid!important;grid-template-columns:1fr!important;gap:8px;padding:0!important;font:inherit!important;border:0!important;color:inherit!important;height:auto!important;max-height:none!important;overflow:visible!important;min-height:0!important}body.g5.g7 #cl .clue{height:auto!important;overflow:visible!important;margin:0!important;font:800 14px/1.4 Nunito,Arial,sans-serif!important;color:#150a33!important}";document.head.appendChild(st5);

try{var mv=document.querySelector("meta[name=viewport]");if(mv&&!/maximum-scale/.test(mv.content))mv.content+=", maximum-scale=1";}catch(e){}
var st6=document.createElement("style");st6.textContent="body.g5.g7 input,body.g5.g7 textarea,body.g5.g7 select{font-size:16px!important}body.g5.g7 #app{overflow-x:hidden}";document.head.appendChild(st6);
})();

;(window.__GPL=window.__GPL||[]).push("g7_5");
