# Vaja 2 - Spletni sledilniki

V okviru dane vaje izdelajte spletno aplikacijo za persistentno spremljanje odjemalcev, brez uporabe piškotkov (ti. cookieless). Namen dane vaje je, da se spoznate z osnovnimi principi delovanja modernih spletnih sledilnikov (angl. web trackers), ki so vseprisotni na svetovnem spletu, ter pri tem ugotovite načine zaščite.

Najprej na odjemalčevem delu izdelajte aplikacijo v JavaScriptu-u, ki naj omogoča sledeče:

    Vsaj 5 znanih tehnik identifikacije odjemalca (pri tem naj bosta vključeni: HTML5 canvas fingerprinting ter Font fingerprinting). Vsaka tehnika naj bo implementirana v svoji funkciji/metodi. Uporaba knjižnic ni dovoljena. (3%)
    Izračun zgoščevalne vrednosti iz konkatenacije rezultatov uporabljenih tehnik za identifikacijo odjemalca. Omogočite pošiljanje dane vrednosti do vaše strežniške aplikacije preko zahtevka GET. (2%)

Prav tako izdelajte strežniško aplikacijo v poljubni tehnologiji (npr. node.js), ki omogoča sledeče:

    Pridobitev GET zahtevka z zgoščevalno vrednostjo s strani odjemalčeve JS aplikacije. Zgoščevalno vrednost hranite v lokalno datotečno-vodeno podatkovno bazo (npr. sqlite). V primeru, da je identična zgoščevalna vrednost že hranjena, vrnete tekstovni odziv 'true', sicer 'false'. (2%)

Delovanje demonstrirajte lokalno na preprosti spletni strani (gostovana na ločenem strežniku, npr. nginx), ki ob ponovnem obisku izpiše ali ste že spletno stran obiskali ali niste (tudi po ponovnem odprtju brskalnika). Testirajte persistentnost implementiranih tehnik identifikacije pri različni konfiguraciji spletnega brskalnika: incognito način in uporaba vsaj enega varnostnega vtičnika. Testirajte vpliv CORS in CSP. Na koncu podate vaše ugotovitve v obliki poročila (1-2 strani). (5%)

Oddajte naslednje v arhivu ZIP: spletna aplikacija (npr. client.js, server.js, demo.html), porocilo.pdf

Vrednost naloge: 12% od celotne ocene pri predmetu

Naknadni roki za oddajo: 2 tedna pred vsakim izpitnim rokom (datumi bodo objavljeni sproti na uvodni strani predmeta)

Oddana vaja bo ocenjena najkasneje v 2 tednih po roku za oddajo ali v 1 tednu pred izpitnim rokom. Ustnega zagovora pri dani vaji ni. V primeru nestrinjanja z dodeljeno oceno je možen ustni zagovor po predhodnem dogovoru.

Literatura:

Frontend:
JS Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
JS Canvas toDataURL: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
LocalFontAccess API (potrebna privolitev uporabnika): https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API
Izpis vseh pisav na sistemu (primer brez privolitve - vsak font se testira posebej, če obstaja, uporabi se offsetWidth,offsetHeight): https://browserleaks.com/fonts
JS SubtleCrypto digest: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
Backend:
Node.js + express: https://expressjs.com/en/starter/installing.html
Node.js + sqlite: https://www.npmjs.com/package/sqlite
NGINX: https://www.nginx.com/resources/wiki/start/
Testiranje:
Node.js + express + CORS: https://expressjs.com/en/resources/middleware/cors.html
NGINX + CSP: https://content-security-policy.com/examples/nginx/
Font fingerprint defender: https://chromewebstore.google.com/detail/font-fingerprint-defender/fhkphphbadjkepgfljndicmgdlndmoke
Canvas fingerprint defender: https://chromewebstore.google.com/detail/canvas-fingerprint-defend/lanfdkkpgfjfdikkncbnojekcppdebfp