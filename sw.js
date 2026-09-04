const CACHE_NAME = "clima-app-v1";
const ARQUIVOS_PARA_CACHE = [
    "index.html",
    "style.css",
    "script.js",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png",
]
;

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARQUIVOS_PARA_CACHE);
        })
);

});

self.addEventListener("fetch", (evento) => {
    evento.respondwith(
        caches.match(evento.request).then((respostaCache) => {
            return respostaCache || fetch(evento.request);
        })
    );
});


    