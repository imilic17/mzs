/* ═══════════════════════════════════════════════════════════════
   service-worker.js — Offline podrška za "Muzej za sve"
   Samsung Challenge 2025./2026. · Tehnička škola Daruvar

   Strategija: Cache First (statički resursi) + Network First (JSON)
   ─────────────────────────────────────────────────────────────────
   Kako radi:
   1. INSTALL  → preuzme i spremi sve navedene datoteke u keš
   2. ACTIVATE → obriše stare verzije keša
   3. FETCH    → za poznate resurse vraća iz keša (bez interneta);
                  za eksponati.json prvo pokuša mrežu (svježi podaci),
                  pa fallback na keš; za sve ostalo: mreža ili keš
   ═══════════════════════════════════════════════════════════════ */

/* ── Verzija keša ──────────────────────────────────────────────
   Promijeni broj kad se dodaju nove datoteke ili mijenja sadržaj.
   Stara verzija se automatski briše u activate fazi.             */
const VERZIJA = 'muzej-v1';

/* ── Popis svih datoteka koje se kešuju pri instalaciji ────────
   Sve putanje su relativne od korijena aplikacije (gdje leži
   service-worker.js). Ako dodaš novu HTML stranicu, dodaj je ovdje. */
const STATICKI_RESURSI = [

  /* ── Početni ekran ── */
  './',
  './index.html',

  /* ── Vodič mod ── */
  './vodic/index.html',
  './vodic/eksponat.html',

  /* ── Quest mod ── */
  './quest/index.html',
  './quest/kviz.html',
  './quest/rezultat.html',

  /* ── O projektu ── */
  './o-projektu/index.html',

  /* ── QR stranica ── */
  './qr.html',

  /* ── CSS (ako postoji kao zasebna datoteka) ── */
  './css/style.css',

  /* ── JavaScript datoteke ── */
  './js/app.js',
  './js/tts.js',
  './js/quest.js',

  /* ── PWA manifest ── */
  './manifest.json',

  /* ── Podaci eksponata ── */
  './data/eksponati.json',

];

/* ── Slike iz assets/ mape ─────────────────────────────────────
   Slike se ne kešuju unaprijed (ne znamo koji će biti dodani),
   nego ih Service Worker sprema u keš pri prvom posjetu.
   Ovo se zove "runtime caching" — vidi FETCH handler ispod.      */
const SLIKE_CACHE = 'muzej-slike-v1';


/* ══════════════════════════════════════════════════════════════
   FAZA 1 — INSTALL
   Događa se jednom, kad se SW prvi put registrira.
   Preuzima sve statičke resurse i sprema u keš.
   skipWaiting(): nova verzija SW-a preuzima kontrolu odmah,
   ne čeka da korisnik zatvori sve tabove.
   ══════════════════════════════════════════════════════════════ */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERZIJA).then(kesh => {
      /* addAll() preuzima SVE odjednom.
         Ako jedna datoteka ne postoji, instalacija se ne prekida —
         koristimo Promise.allSettled pattern ručno za toleranciju. */
      return Promise.allSettled(
        STATICKI_RESURSI.map(url =>
          kesh.add(url).catch(greska => {
            /* Nepostojeće datoteke (css/style.css, js/app.js ako su inline)
               tiho preskačemo — aplikacija radi i bez njih. */
            console.warn('[SW] Nije moguće keširati:', url, greska.message);
          })
        )
      );
    }).then(() => {
      /* SW odmah preuzima kontrolu nad svim otvorenim tabovima */
      return self.skipWaiting();
    })
  );
});


/* ══════════════════════════════════════════════════════════════
   FAZA 2 — ACTIVATE
   Događa se nakon installa (ili kad stara verzija ode).
   Briše sve keš-ove koji ne odgovaraju trenutnoj verziji.
   clients.claim(): SW odmah počinje presretati fetcheve,
   bez potrebe za ponovnim učitavanjem stranice.
   ══════════════════════════════════════════════════════════════ */
self.addEventListener('activate', event => {
  const DOZVOLJENENI_KESHOVI = [VERZIJA, SLIKE_CACHE];

  event.waitUntil(
    caches.keys().then(kljucevi => {
      return Promise.all(
        kljucevi
          .filter(kljuc => !DOZVOLJENENI_KESHOVI.includes(kljuc))
          .map(staraVerzija => {
            console.log('[SW] Brišem stari keš:', staraVerzija);
            return caches.delete(staraVerzija);
          })
      );
    }).then(() => {
      /* Odmah preuzmi kontrolu nad svim otvorenim straninicama */
      return self.clients.claim();
    })
  );
});


/* ══════════════════════════════════════════════════════════════
   FAZA 3 — FETCH
   Presreće svaki HTTP zahtjev koji stranica šalje.
   Tri strategije prema vrsti resursa:

   A) eksponati.json → Network First
      (pokušaj svježe podatke, fallback na keš)

   B) assets/slike/ i assets/ikone/ → Cache First + runtime cache
      (slika se keša pri prvom učitavanju, zatim uvijek iz keša)

   C) Sve ostalo → Cache First
      (statički resursi koji se ne mijenjaju često)
   ══════════════════════════════════════════════════════════════ */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Presreći samo GET zahtjeve na isti origin.
     POST, external API-ji itd. prolaze bez presretanja. */
  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  /* ── A) eksponati.json — Network First ─────────────────────
     Svježi podaci su prioritet. Ako nema interneta → keš.       */
  if (url.pathname.endsWith('eksponati.json')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  /* ── B) Slike i ikone — Cache First + runtime cache ─────────
     Slike su velike; jednom preuzete rijetko se mijenjaju.       */
  if (url.pathname.includes('/assets/slike/') ||
      url.pathname.includes('/assets/ikone/') ||
      url.pathname.includes('/assets/fonts/')) {
    event.respondWith(cacheFirstZaSlike(event.request));
    return;
  }

  /* ── C) Sve ostalo — Cache First ────────────────────────────
     HTML, CSS, JS — keširani pri instalaciji, odmah dostupni.   */
  event.respondWith(cacheFirst(event.request));
});


/* ══════════════════════════════════════════════════════════════
   POMOĆNE FUNKCIJE — strategije dohvata
   ══════════════════════════════════════════════════════════════ */

/* Cache First: vrati iz keša, ako nema — dohvati s mreže i keširaj.
   Savršeno za statičke datoteke (HTML, CSS, JS, manifest).        */
async function cacheFirst(zahtjev) {
  const kesiraniOdgovor = await caches.match(zahtjev);
  if (kesiraniOdgovor) {
    return kesiraniOdgovor;
  }

  try {
    const mrezniOdgovor = await fetch(zahtjev);
    /* Keširaj uspješne odgovore za buduće offline posjete */
    if (mrezniOdgovor.ok) {
      const kesh = await caches.open(VERZIJA);
      kesh.put(zahtjev, mrezniOdgovor.clone());
    }
    return mrezniOdgovor;
  } catch {
    /* Nema ni mreže ni keša — vrati offline fallback stranicu ako postoji */
    const fallback = await caches.match('./index.html');
    return fallback ?? new Response('Offline — stranica nije dostupna.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}


/* Network First: pokušaj mreža, fallback na keš.
   Za eksponati.json: svježi podaci su prioritet.                  */
async function networkFirst(zahtjev) {
  try {
    const mrezniOdgovor = await fetch(zahtjev);
    if (mrezniOdgovor.ok) {
      /* Ažuriraj keš svježim podacima */
      const kesh = await caches.open(VERZIJA);
      kesh.put(zahtjev, mrezniOdgovor.clone());
    }
    return mrezniOdgovor;
  } catch {
    /* Mreža nije dostupna — vrati prethodno keširani JSON */
    const kesiraniOdgovor = await caches.match(zahtjev);
    if (kesiraniOdgovor) return kesiraniOdgovor;

    /* Ni u kešu — vrati prazan array da aplikacija ne padne */
    return new Response('[]', {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
}


/* Cache First za slike — koristi zasebni keš (SLIKE_CACHE).
   Slike se ne brišu kad se ažurira verzija aplikacije.            */
async function cacheFirstZaSlike(zahtjev) {
  const kesiranaSlika = await caches.match(zahtjev);
  if (kesiranaSlika) return kesiranaSlika;

  try {
    const mrezniOdgovor = await fetch(zahtjev);
    if (mrezniOdgovor.ok) {
      const kesh = await caches.open(SLIKE_CACHE);
      kesh.put(zahtjev, mrezniOdgovor.clone());
    }
    return mrezniOdgovor;
  } catch {
    /* Slika nije dostupna offline — browser prikazuje placeholder */
    return new Response('', { status: 404 });
  }
}
