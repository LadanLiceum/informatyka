const C="inf-v4",F="inf-fonts-v1",SHELL=["./","index.html","manifest.json","icon.svg","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>0)))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==F).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
function timeout(p,ms){return new Promise((res,rej)=>{const t=setTimeout(()=>rej(new Error("timeout")),ms);p.then(v=>{clearTimeout(t);res(v)},e=>{clearTimeout(t);rej(e)})})}
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com"){e.respondWith(caches.open(F).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(()=>m))));return}
 if(u.origin!==location.origin)return;
 /* спочатку мережа (свіжа версія), але на слабкому інтернеті через 4 с віддаємо збережену */
 e.respondWith(timeout(fetch(r),4000).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):undefined)||fetch(r))))});
