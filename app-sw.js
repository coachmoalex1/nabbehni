// نبّهني v20: خدمة التطبيق + إشعارات الموبايل (Web Push) حتى لو التطبيق مقفول
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(){});
function cfg(){return new Promise(function(ok){try{var q=indexedDB.open("nab",1);q.onupgradeneeded=function(){q.result.createObjectStore("kv")};q.onerror=function(){ok(null)};q.onsuccess=function(){var d=q.result;try{var g=d.transaction("kv").objectStore("kv").get("cfg");g.onsuccess=function(){d.close();ok(g.result||null)};g.onerror=function(){d.close();ok(null)}}catch(e){ok(null)}}}catch(e){ok(null)}})}
self.addEventListener("push",function(e){e.waitUntil((async function(){
var t="نبّهني",b="في تنبيه جديد على عربيتك، افتح التطبيق",tag="nb",urg=false;
try{var c=await cfg();if(c){var r=await fetch(c.api,{method:"POST",headers:{"Content-Type":"application/json",apikey:c.key},body:JSON.stringify({action:"app_push_peek",token:c.token})}),j=await r.json();if(j&&j.ok&&j.n){t=j.n.title||t;b=j.n.body||b;tag=j.n.id||tag;urg=j.n.kind==="urgent"}}}catch(x){}
await self.registration.showNotification(t,{body:b,tag:tag,icon:"icon-192.png",badge:"favicon.png",lang:"ar",dir:"rtl",requireInteraction:urg,vibrate:urg?[300,100,300,100,300]:[200,100,200],data:{url:"app.html"}})})())});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontained:true}).then(function(l){for(var i=0;i<l.length;i++){if(l[i].url.indexOf("app.html")>-1&&"focus"in l[i])return l[i].focus()}return clients.openWindow("app.html")}))});
