# BRIEF ZA CLAUDE CODE — Portfolio "Muzej za sve"
## GitHub: imilic17/mzs · Grana: main
## Datum: travanj 2026.

---

## KONTEKST

Repo `imilic17/mzs` već sadrži **web aplikaciju** (vodič za posjetitelje muzeja).
Sada treba dodati **portfolio** — zasebnu sekciju koja dokumentira PROCES rada za žiri Samsung Challenge natjecanja.

Portfolio i aplikacija su u **istom repozitoriju**, ali su odvojene cjeline.

---

## ŠTO TREBA NAPRAVITI

Dodati direktorij `portfolio/` unutar postojećeg repozitorija s kompletnom portfolio web stranicom.

---

## STRUKTURA DIREKTORIJA

```
portfolio/
├── index.html              ← Naslovna portfolia (POČETNA TOČKA)
├── tema.html               ← Problem + UN ciljevi
├── istrazivanje.html       ← Posjet muzeju, Samsung AI u akciji
├── ko-kreacija.html        ← Korak dalje kao ko-autori
├── rezultat.html           ← Što smo napravili (aplikacija)
├── tim.html                ← Tko smo, refleksije
├── css/
│   └── portfolio.css       ← Zasebni CSS, ne dira app stilove
└── assets/
    └── slike/              ← Fotografije iz muzeja (simbolički linkovi na ../assets/slike/)
```

**Važno:** `portfolio/css/portfolio.css` je **potpuno odvojen** od `css/style.css` aplikacije. Nema dijeljenja stilova.

---

## DIZAJN — VIZUALNI IDENTITET

### Paleta boja
```css
--boja-pozadina: #FAFAF7;        /* gotovo bijela, topla */
--boja-tekst: #1C1C1A;           /* gotovo crna */
--boja-naglasak: #1A3A1A;        /* tamnozelena (iz app manifesta) */
--boja-zlatna: #C9A84C;          /* zlatna za akcente */
--boja-krem: #F4EFE4;            /* krem za kartice */
--boja-siva: #6B6B68;            /* sekundarni tekst */
```

### Tipografija
- Font: `'Inter', system-ui, sans-serif` — Google Fonts import
- Naslovi: 700 weight
- Tijelo: 400 weight, 1.7 line-height
- Min font na mobilnom: 16px

### Stil
- Minimalistično, puno bijelog prostora
- Fotografije muzeja su **heroji** — neka dominiraju
- Kartice s blagom sjenom (`box-shadow: 0 2px 12px rgba(0,0,0,0.08)`)
- Zaobljeni rubovi: `border-radius: 12px` na karticama
- Nema heavy animacija (pristupačnost)
- **Mobilni first** — žiri će gledati na mobitelu

### Navigacija
```html
<!-- Fiksna na vrhu, hamburger na mobilnom -->
<nav>
  <a href="index.html">← Natrag na aplikaciju</a>
  <span>Portfolio</span>
  <ul>
    <li><a href="tema.html">Tema</a></li>
    <li><a href="istrazivanje.html">Istraživanje</a></li>
    <li><a href="ko-kreacija.html">Korak dalje</a></li>
    <li><a href="rezultat.html">Rezultat</a></li>
    <li><a href="tim.html">Tim</a></li>
  </ul>
</nav>
```

---

## STRANICE — DETALJAN SADRŽAJ

---

### 1. `index.html` — NASLOVNA

**Hero sekcija:**
```
Naslov:    Muzej za sve — Glasovi koji ostaju
Podnaslov: Digitalni vodič za Zavičajni muzej Daruvar
           koji je napravljen za SVE — uključujući osobe
           s intelektualnim teškoćama.
```

**Fotografija heroja:** `../assets/slike/dvorac-izvana.jpg`
→ Ako ne postoji, koristi prvu dostupnu fotografiju iz mape.
→ Placeholder CSS: tamnozeleni gradient s bijelim tekstom.

**3 statistike (u retku):**
```
1 muzej          Zavičajni muzej Daruvar — partner projekta
1 udruga         Korak dalje Daruvar — ko-autori sadržaja  
12 AI funkcija   Samsung Galaxy alati kroz cijeli proces
```

**UN SDG ciljevi (ikone + tekst):**
```
SDG 4  — Kvalitetno obrazovanje
SDG 10 — Smanjenje nejednakosti
SDG 11 — Održivi gradovi i zajednice
```
Ikone: koristiti emoji (🎓 ⚖️ 🏙️) ili SVG iz https://sdgs.un.org/goals

**Navigacijske kartice** (grid 2x2 na mobitelu, 4x1 na desktopu):
```
[Tema projekta →]    [Istraživanje →]
[Korak dalje →]      [Rezultat →]
```

**Footer na svakoj stranici:**
```
Samsung Challenge 2025./2026.
Tehnička škola Daruvar
Tim: Dominik Dušek · Lena Sakar · Darijan Vašatko
Mentorica: Ivana Milić, mag.inf.
```

---

### 2. `tema.html` — TEMA I PROBLEM

**Sekcija 1 — Problem:**

Tekst (piše Claude Code, ne placeholder):
> Zavičajni muzej Daruvar čuva više od 2000 godina povijesti — od rimskog naselja Aquae Balissae, kroz epohu grofova Janković, do Domovinskog rata. No opisi eksponata pisani su stručnim jezikom koji veliki dio posjetitelja ne može razumjeti.

> Posebno je isključena skupina osoba s intelektualnim teškoćama. Prema podacima udruge Korak dalje Daruvar, koja broji 20+ aktivnih korisnika, nije postojao niti jedan prilagođeni materijal za posjet muzeju.

> Drugi problem: od 50 ispitanih vršnjaka učenika Tehničke škole Daruvar, samo 3 posjetila su muzej u prošloj godini izvan školske obveze. Muzej postoji — ali za mnoge praktički ne postoji.

**Sekcija 2 — Lokalna zajednica:**

Tri kartice s logotipima (tekstualne ako nema slike):
```
Zavičajni muzej Daruvar
Osnovan 2022. u dvorcu Janković (1777.)
Partner: kustos Leo Žukina

Udruga "Korak dalje" Daruvar
Organizacija za osobe s intelektualnim teškoćama
Ko-autori sadržaja aplikacije

Tehnička škola Daruvar
Programski smjer — učenici izvođači projekta
Mentorica: Ivana Milić, mag.inf.
```

**Sekcija 3 — UN ciljevi:**

Za svaki SDG: ikona + naziv + jedna rečenica kako projekt doprinosi.

```
SDG 4 — Kvalitetno obrazovanje
→ Prilagođeni easy-to-read opisi eksponata omogućuju
  učenje kulturne baštine svima, bez obzira na razinu pismenosti.

SDG 10 — Smanjenje nejednakosti
→ Osobe s intelektualnim teškoćama postaju ko-autori
  javnog digitalnog sadržaja — vidljivi i uključeni.

SDG 11 — Održivi gradovi i zajednice
→ Kulturna infrastruktura postaje dostupna bez
  dodatnih troškova za muzej ili posjetitelje.
```

---

### 3. `istrazivanje.html` — ISTRAŽIVANJE U MUZEJU

**Uvod:**
> Posjet Zavičajnom muzeju Daruvar održan je 17. travnja 2026. Tim od tri učenika Tehničke škole Daruvar, opremljen Samsung Galaxy uređajima, proveo je istraživanje u suradnji s kustosom Leom Žukinom.

**Sekcija 1 — Samsung AI u istraživanju:**

Horizontalni timeline s 3 koraka:
```
① Snimanje razgovora     ② Fotografiranje         ③ Identifikacija
  Note Assist              Generative Edit            Circle to Search
  Transcript Assist        AI Remaster                ProVisual Engine
  S26 Ultra                S26 Ultra                  S26 Ultra
```

**Sekcija 2 — Samsung AI alati (KLJUČNA SEKCIJA):**

Grid kartica, jedna po AI funkciji. Svaka kartica sadrži:
- Naziv funkcije (bold)
- Uređaj (`S26 Ultra` / `Z Fold7` / `Z Flip7`)
- Jedna rečenica što radi
- Jedna rečenica **zašto** smo je koristili (ovo je važno za žiri)
- Placeholder za sliku/screenshot: `[PLACEHOLDER: screenshot funkcije]`

**12 kartica:**

```
1. Note Assist (S26 Ultra)
   Što: AI sažima bilješke i razgovore u ključne točke.
   Zašto: Razgovor s kustosom trajao je 40 minuta. Note Assist
   izdvojio je 8 ključnih informacija za portfolio za 30 sekundi.
   [PLACEHOLDER: screenshot Note Assist sažetka]

2. Transcript Assist (S26 Ultra)
   Što: Transkribira snimke s razlikovanjem govornika.
   Zašto: Dokaz ko-kreacije — u transkriptu se točno vidi
   koje su riječi rekli korisnici Korak dalje, a koje naš tim.
   [PLACEHOLDER: screenshot transkripta s označenim govornicima]

3. Circle to Search (S26 Ultra)
   Što: Zaokruži bilo koji predmet na ekranu za instant pretragu.
   Zašto: U muzeju smo identificirali predmete čije porijeklo
   nismo znali, bez prekidanja razgovora s kustosom.
   [PLACEHOLDER: screen recording Circle to Search]

4. Generative Edit (S26 Ultra)
   Što: AI uklanja ili premješta objekte s fotografija.
   Zašto: Eksponati su iza stakla. Generative Edit uklonio je
   refleksije i odsjaje sa svih fotografija za objavu.
   [PLACEHOLDER: Prije / Poslije slika eksponata]

5. AI Remaster (S26 Ultra)
   Što: Restaurira stare, oštećene fotografije.
   Zašto: Muzej ima stare razglednice Daruvara koje se ne mogu
   izložiti zbog oštećenja. AI ih je restaurirao za digitalnu zbirku.
   [PLACEHOLDER: Prije / Poslije stare razglednice]

6. ProVisual Engine / AI Zoom (S26 Ultra)
   Što: AI zoom do 100x koji zadržava oštrinu detalja.
   Zašto: Sitni detalji eksponata iza stakla nisu vidljivi golim
   okom ni standardnom kamerom. 100x zoom otkrio je gravure.
   [PLACEHOLDER: usporedba 1x / 30x / 100x istog eksponata]

7. Sketch to Image (Z Fold7)
   Što: Pretvara ručni crtež u realističnu sliku.
   Zašto: Kustos opisao je predmet koji više ne postoji u muzeju.
   Tim ga je skicirao, AI vizualizirao — prikazan u aplikaciji.
   [PLACEHOLDER: skica + AI rezultat]

8. Writing Assist (S26 Ultra)
   Što: AI prilagođava ton i složenost teksta.
   Zašto: Stručni opis eksponata → easy-to-read format za
   osobe s intelektualnim teškoćama. Jedan klik, jedan sekund.
   [PLACEHOLDER: Prije tekst (stručni) / Poslije tekst (jednostavan)]

9. Audio Eraser (S26 Ultra)
   Što: AI uklanja pozadinsku buku iz video snimki.
   Zašto: Muzejska dvorana odjekuje. Audio Eraser uklonio je
   eho i šum iz svih intervju snimki.
   [PLACEHOLDER: vizualizacija zvučnog vala prije/poslije]

10. Flex Mode kiosk (Z Fold7)
    Što: Presavijeni Z Fold7 stoji kao kiosk terminal.
    Zašto: Korisnici Korak dalje testirali su aplikaciju na
    presavijenom Z Fold7 postavljenom na stolu — bez držanja.
    [PLACEHOLDER: fotografija postava Flex Mode kiosk]

11. Flex Mode Interpreter (Z Fold7)
    Što: Gornja polovica ekrana jedan jezik, donja drugi.
    Zašto: Daruvar ima 20,92% češke manjine. Muzej nema opis
    na češkom. Interpreter omogućio je HR↔CZ komunikaciju.
    [PLACEHOLDER: screenshot Flex Mode Interpreter HR/CZ]

12. Dual Recording / Director's View (Z Flip7)
    Što: Prednja i stražnja kamera snimaju istovremeno.
    Zašto: Intervju s korisnicima Korak dalje sniman je
    profesionalnim split-screen formatom bez montaže.
    [PLACEHOLDER: split-screen screenshot]
```

**Sekcija 3 — Galerija fotografija muzeja:**

Masonry ili grid galerija s fotografijama iz posjeta.

**Koristiti ove fotografije** (odabrane iz mape projekta — vizualno raznolike):
```
Dvorana 2. sv. rata (puške i zastave):
  ../20260417_113755.jpg
  ../20260417_113810.jpg
  ../20260417_113827.jpg

Soba Janković (portreti, namještaj):
  ../20260417_121338.jpg
  ../20260417_121352.jpg
  ../20260417_121421.jpg

Domovinski rat (zid s fotografijama, uniforme):
  ../20260417_121548.jpg
  ../20260417_121645.jpg
  ../20260417_121801.jpg

Ginko stablo (izvana):
  ../20260417_122030.jpg
  ../20260417_122130.jpg

Razno (vitrina, slike, prolazi):
  ../20260417_114544.jpg
  ../20260417_115926.jpg
  ../20260417_120204.jpg
  ../20260417_120757.jpg
```

Format galerije:
```html
<figure>
  <img src="../20260417_XXXXXX.jpg" 
       alt="[opis]" 
       loading="lazy">
  <figcaption>Naziv prostorije</figcaption>
</figure>
```

Alt tekst za svaku fotografiju:
```
20260417_113755.jpg → "Dvorana Drugog svjetskog rata — prikaz oružja i fotografija"
20260417_113810.jpg → "Puške iz Drugog svjetskog rata izložene u staklenoj vitrini"
20260417_113827.jpg → "Panorama dvorane s partizanskim zastavama"
20260417_121338.jpg → "Soba obitelji Janković s portretima i stolovima"
20260417_121352.jpg → "Portret grofa Julija Jankovića na zidu dvorca"
20260417_121421.jpg → "Starinski namještaj u salonu dvorca Janković"
20260417_121548.jpg → "Spomen soba Domovinskog rata — zid s fotografijama branitelja"
20260417_121645.jpg → "Uniforme daruvarskih branitelja na lutkama"
20260417_121801.jpg → "Detalj spomen sobe Domovinskog rata"
20260417_122030.jpg → "Daruvarski Adam — ginko stablo staro 245 godina ispred dvorca"
20260417_122130.jpg → "Ginko stablo Daruvarski Adam u punoj proljetnoj lisnatosti"
20260417_114544.jpg → "Vitrina s predmetima iz 19. stoljeća"
20260417_115926.jpg → "Hodnik muzeja s izloženim dokumentima"
20260417_120204.jpg → "Detalj izložbene prostorije"
20260417_120757.jpg → "Panorama izložbene dvorane"
```

---

### 4. `ko-kreacija.html` — KORAK DALJE

**Uvod:**
> Najvažnija odluka u projektu nije bila tehnička — bila je etička. Osobe s intelektualnim teškoćama nisu bile naša "ciljna skupina". Bile su ko-autori.

**Sekcija 1 — Tko je Korak dalje:**
```
Udruga "Korak dalje" Daruvar aktivna je organizacija za osobe
s intelektualnim teškoćama. Surađivali smo s korisnicima koji
su sposobni čitati uz podršku i koji su željeli sudjelovati
u opisivanju onoga što vide.
```

**Sekcija 2 — Proces ko-kreacije:**

Vizualni koraci (numbered list s ikonama):
```
① Posjet muzeja
   Korisnici Korak dalje zajedno s timom posjetili su muzej.
   Stajali su ispred eksponata i opisivali što vide.

② Writing Assist kao polazište
   Samsung Writing Assist pretvorio je stručni kustosov tekst
   u jednostavni format. To je bio prijedlog — ne finalni tekst.

③ Korisnikove riječi
   Korisnici su dodali, mijenjali i finalizirali tekst
   vlastitim riječima. Njihova rečenica, njihov glas.

④ Transcript Assist kao dokaz
   Cijeli proces sniman je i transkribiran. Transcript Assist
   razlikuje govornika — vidi se točno što je rekao koji korisnik.

⑤ Glas u aplikaciji
   Konačni opisi u aplikaciji su korisnikove riječi.
   Kad posjetitelj klikne "Slušaj" — čuje opis koji je
   napisala stvarna osoba s intelektualnim teškoćama.
```

**Sekcija 3 — Transcript kao dokaz (vizualna demonstracija):**

HTML prikaz koji simulira Transcript Assist sučelje:
```html
<div class="transcript-demo">
  <div class="govornik ucenik">
    <span class="oznaka">Učenik</span>
    <p>"Što vidiš na ovoj slici?"</p>
  </div>
  <div class="govornik korisnik">
    <span class="oznaka">Korisnik Korak dalje</span>
    <p>"Vidim starog čovjeka. Ima lijepu odjeću.
        Izgleda važno. Možda je bio kralj."</p>
  </div>
  <div class="govornik ucenik">
    <span class="oznaka">Učenik</span>
    <p>"To je grof Janković — sagradio je ovaj dvorac."</p>
  </div>
  <div class="govornik korisnik">
    <span class="oznaka">Korisnik Korak dalje</span>
    <p>"Aha. Onda je on napravio ovu kuću gdje smo mi sad."</p>
  </div>
</div>
```

Napomena ispod:
> *Prikazani razgovor je ilustrativni primjer načina rada. Stvarni transkripti dostupni su uz pisanu privolu korisnika.*

**Sekcija 4 — Rezultat:**
```
Broj opisanih eksponata: [X] ← placeholder, popuniti
Broj uključenih korisnika: 3–5
Format: easy-to-read, max 3 rečenice po eksponatu
Korišten u: Vodič mod aplikacije, gumb "Slušaj"
```

---

### 5. `rezultat.html` — ŠTO SMO NAPRAVILI

**Uvod:**
> Rezultat projekta je besplatna, open-source web aplikacija koja radi bez instalacije i bez interneta. Dostupna je skeniranjem QR koda u muzeju.

**Sekcija 1 — Aplikacija (3 moda):**

Tri kartice:
```
🗺️ Vodič mod
Pasivan pregled eksponata s fotografijama i easy-to-read opisima.
Gumb "Slušaj" čita opis glasom.
Optimizirano za Samsung Z Fold7 Flex Mode kiosk postav.

🎯 Daruvar Quest
Interaktivni kviz vezan uz fizički posjet muzeju.
Score u lokalnoj memoriji, dijeljenje na Instagram Stories.
Za mlade posjetitelje koji žele gamificirano iskustvo.

ℹ️ O projektu
Tim, partneri, SDG ciljevi.
Korisnici Korak dalje navedeni imenom kao ko-autori.
```

**Sekcija 2 — Pristupačnost:**

Tablica (vizualno):
```
Zahtjev WCAG AA          Naša implementacija
Font min. 20px           Baza 24px, A−/A+ kontrola (4 koraka)
Kontrast 4.5:1           Zelena/krem = 11.2:1 ✓
Gumbi min. 44×44px       Svi elementi ≥ 44px ✓
Max 4 opcije/ekran       Vodič: uvijek 3 gumba ✓
TTS glas                 Web Speech API, hr-HR ✓
Offline podrška          Service Worker + PWA ✓
```

**Sekcija 3 — Tehničke informacije (kratko):**
```
Stack:     Vanilla HTML/CSS/JavaScript
Hosting:   GitHub Pages (besplatno, bez troškova za muzej)
Offline:   Service Worker — radi bez interneta
PWA:       Instalacija na Home Screen
QR kod:    Na ulazu u muzej, skenira se kamerom mobitela
Kod:       github.com/imilic17/mzs (open source)
```

**Sekcija 4 — Link na aplikaciju:**

Veliki CTA gumb:
```
[Otvori aplikaciju →]
href="../index.html"
```

---

### 6. `tim.html` — TIM

**Uvod:**
> Projekt je realizirala tri učenika Tehničke škole Daruvar u sklopu Samsung Challenge natjecanja 2025./2026.

**Tri kartice za učenike:**

```
Dominik Dušek
Istraživač / Fotograf
Uloga: Posjet muzeju, fotografiranje eksponata,
suradnja s korisnicima Korak dalje,
uređivanje eksponati.json

"[PLACEHOLDER: Refleksija — što sam naučio]"

Lena Sakar
Dokumentarist / PM
Uloga: Dokumentacija procesa, portfolio,
snimanje videomate rijala, koordinacija s partnerima

"[PLACEHOLDER: Refleksija — što sam naučila]"

Darijan Vašatko
Programer
Uloga: Sav kod — HTML, CSS, JavaScript,
Service Worker, PWA, QR stranica

"[PLACEHOLDER: Refleksija — što sam naučio]"
```

**Mentorica:**
```
Ivana Milić, mag.inf.
Nastavnica informatičkih predmeta
Tehnička škola Daruvar
```

**Zahvale:**
```
Leo Žukina — kustos Zavičajnog muzeja Daruvar
Renata [prezime] — voditeljica udruge Korak dalje Daruvar
TZ Daruvar-Papuk
```

**Vremenska kapsula** (ako postoji video):
```html
<!-- Embed YouTube/lokalni video ako postoji -->
<div class="video-placeholder">
  [PLACEHOLDER: Video "Vremenska kapsula" — učenici o projektu]
</div>
```

---

## CSS SPECIFIKACIJE

### `portfolio/css/portfolio.css`

```css
/* Varijable */
:root {
  --boja-naglasak: #1A3A1A;
  --boja-zlatna: #C9A84C;
  --boja-krem: #F4EFE4;
  --boja-pozadina: #FAFAF7;
  --boja-tekst: #1C1C1A;
  --boja-siva: #6B6B68;
  --font-osnova: 'Inter', system-ui, sans-serif;
  --razmak: 1.5rem;
  --max-sirina: 1100px;
  --border-radius: 12px;
}

/* Osnova */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-osnova);
  background: var(--boja-pozadina);
  color: var(--boja-tekst);
  line-height: 1.7;
  font-size: 18px;
}

/* Navigacija — fiksna, zelena */
nav { ... }

/* Hero sekcija */
.hero {
  min-height: 60vh;
  background: var(--boja-naglasak);
  color: white;
  display: flex; align-items: center;
  padding: 4rem 2rem;
}

/* Kartice */
.kartica {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1.5rem;
}

/* Transcript demo */
.transcript-demo .govornik { ... }
.govornik.ucenik .oznaka { background: #1A3A1A; color: white; }
.govornik.korisnik .oznaka { background: var(--boja-zlatna); }

/* AI funkcija kartica */
.ai-kartica {
  border-left: 4px solid var(--boja-naglasak);
  ...
}

/* Galerija */
.galerija {
  columns: 2;
  gap: 1rem;
}
@media (min-width: 768px) {
  .galerija { columns: 3; }
}
.galerija figure { break-inside: avoid; }
.galerija img { width: 100%; border-radius: 8px; }

/* Placeholder */
.placeholder {
  background: var(--boja-krem);
  border: 2px dashed var(--boja-siva);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: var(--boja-siva);
  font-style: italic;
}

/* Mobilni */
@media (max-width: 768px) {
  body { font-size: 16px; }
  .hero { min-height: 40vh; }
  .galerija { columns: 1; }
}
```

---

## PLACEHOLDER STRATEGIJA

Svaki screenshot/video koji još ne postoji prikazuje se kao:
```html
<div class="placeholder">
  <p>📱 Samsung [naziv funkcije]</p>
  <p>Screenshot će biti dodan nakon snimanja</p>
  <small>[Opis što screenshot prikazuje]</small>
</div>
```

Placeholderi su **vidljivi i jasno označeni** — ne skrivaju se.
Žiri vidi da smo svjesni što nedostaje.

---

## VAŽNE NAPOMENE ZA CLAUDE CODE

1. **Slike se referenciraju s `../` prefiksom** jer su u rootu repozitorija, a portfolio je u poddirektoriju `portfolio/`.

2. **Ne mijenjaj ništa izvan `portfolio/` direktorija** — aplikacija (index.html, vodic/, quest/ itd.) ostaje netaknuta.

3. **Fotografije imaju timestamp nazive** (`20260417_XXXXXX.jpg`). Koristi ih direktno — ne preimenuj.

4. **Alt tekst je obavezan** na svim fotografijama — dostupnost je prioritet projekta.

5. **Nema vanjske JavaScript biblioteke** — vanilla JS samo ako nužno (hamburger menu). Sve ostalo CSS.

6. **Hrvatski jezik** u svim tekstovima. Dijakritički znakovi: č, ć, ž, š, đ — uvijek. Ne zamjenjuj s c, z, s, d.

7. **Privola za fotografije osoba:** Ne postavljati fotografije lica korisnika Korak dalje bez eksplicitne oznake. Sve fotografije u ovom planu su prostori i predmeti muzeja — OK.

8. **Konzistentna navigacija** — svaka stranica ima isti nav s aktivnom stavkom označenom (class="aktivna").

---

## PROVJERA PRIJE PREDAJE

```
[ ] Sve stranice otvaraju se lokalno (Live Server)
[ ] Navigacija radi na svim stranicama
[ ] Sve slike se učitavaju (provjeri relativne putanje)
[ ] Alt tekst na svim img elementima
[ ] Mobilni prikaz uredan (DevTools 375px)
[ ] Nema console.error u browseru
[ ] Placeholderi su vidljivi i jasno označeni
[ ] Footer je identičan na svim stranicama
[ ] link "← Natrag na aplikaciju" vodi na ../index.html
```

---

*Brief pripremila: Ivana Milić · Projekt: Muzej za sve · Samsung Challenge 2025./2026.*
