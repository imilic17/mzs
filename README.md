# Muzej za sve — Pristupačni digitalni vodič

**Samsung Challenge 2025./2026. · Tehnička škola Daruvar**

> "Uz Samsung Galaxy AI pretvorili smo Zavičajni muzej Daruvar u pristupačno digitalno iskustvo za osobe s intelektualnim teškoćama — i za mlade koji tamo nikad ne dolaze. Jer kulturna baština pripada svima."

---

## O projektu

Web aplikacija bez instalacije. Otvara se skeniranjem QR koda u mobilnom browseru. Radi offline nakon prvog učitavanja. Pristupačna po WCAG AA standardu.

**Partneri:** Zavičajni muzej Daruvar · Udruga "Korak dalje" Daruvar · TZ Daruvar-Papuk

**SDG ciljevi:** SDG 10 (smanjenje nejednakosti) · SDG 11 (održivi gradovi i zajednice)

---

## Struktura projekta

```
muzej-za-sve/
├── index.html              — Početni ekran (odabir moda)
├── vodic/
│   ├── index.html          — Lista eksponata po kategorijama
│   └── eksponat.html       — Prikaz jednog eksponata s TTS gumbom
├── quest/
│   ├── index.html          — Uvod u Quest mod
│   ├── kviz.html           — Kviz logika i bodovanje
│   └── rezultat.html       — Rezultati i leaderboard
├── o-projektu/
│   └── index.html          — Tim, partneri, SDG ciljevi
├── assets/
│   ├── slike/              — Fotografije eksponata (originalne i AI obrađene)
│   ├── ikone/              — SVG/PNG ikone (uključujući PWA ikone)
│   └── fonts/              — Lokalni fontovi (offline podrška)
├── data/
│   └── eksponati.json      — Svi podaci o eksponatima — JEDINO što učenik 1 uređuje
├── css/
│   └── style.css           — Pristupačni stilovi, CSS varijable
├── js/
│   ├── tts.js              — Web Speech API wrapper
│   ├── quest.js            — Kviz logika i localStorage score
│   └── app.js              — Navigacija i učitavanje JSON-a
├── service-worker.js       — Offline podrška (PWA)
├── manifest.json           — PWA manifest za instalaciju
├── qr.html                 — Stranica za ispis QR koda
└── README.md               — Ova datoteka
```

---

## Tri moda aplikacije

### Mod 1: Vodič (za Korak dalje korisnike)
- Pasivan pregled eksponata s velikim fotografijama
- Svaki eksponat: fotografija + Easy-to-Read opis + gumb "Slušaj"
- TTS (Web Speech API) čita **samo** `easy_to_read_opis`, nikad stručni tekst
- Navigacija samo velikim gumbima (min. 44×44px), max. 4 opcije po ekranu
- Optimizirano za Samsung Z Fold7 Flex Mode kiosk postav

### Mod 2: Daruvar Quest (za mlade)
- Interaktivni kviz vezan uz fizički posjet muzeju
- Svaki eksponat = jedno pitanje + 3 odgovora + zanimljivost
- Lokalni score u `localStorage` (ključ: `daruvar_quest_score`)
- Share rezultata u clipboard za Instagram Stories

### Mod 3: O projektu
- Tim, partneri, SDG ciljevi, link na digitalni portfolio

---

## Kako dodati novi eksponat

Otvori `data/eksponati.json` i dodaj novi objekt po ovom predlošku:

```json
{
  "id": "jedinstveni-id-bez-razmaka",
  "naziv": "Naziv eksponata",
  "kategorija": "rimsko-doba",
  "kratki_opis": "Stručni opis, 1-2 rečenice.",
  "easy_to_read_opis": "Jednostavan opis. Kratke rečenice. Bez stručnih pojmova.",
  "quest_pitanje": "Pitanje o eksponatu?",
  "quest_odgovori": ["Odgovor A", "Odgovor B", "Odgovor C"],
  "quest_tocni_odgovor": 1,
  "quest_zanimljivost": "Zanimljiva činjenica koja se prikaže nakon točnog odgovora.",
  "slika_originalna": "assets/slike/naziv-slike.jpg",
  "slika_ai_obradena": "assets/slike/naziv-slike-ai.jpg",
  "slika_alt": "Opisni alt tekst fotografije za čitače ekrana"
}
```

**Dostupne kategorije:** `rimsko-doba` · `dvorac-i-barok` · `priroda` · `ceska-bastina`

> `easy_to_read_opis` pišu zajedno učenik 1 i korisnici udruge Korak dalje. Ovo je srce projekta — kratke, konkretne rečenice bez stručnih pojmova.

---

## Pristupačnost (WCAG AA)

| Zahtjev | Implementacija |
|---------|---------------|
| Font min. 20px | Baza 24px na `<html>`, skalabilno A−/A+ gumbima |
| Kontrast min. 4.5:1 | Zelena #1A3A1A na kremu #F4EFE4 = 11.2:1 |
| Gumbi min. 44×44px | Svi interaktivni elementi ≥ 44px visine |
| Max. 4 opcije po ekranu | Vodič mod: uvijek 3 gumba u navigaciji |
| TTS glasovni opis | Web Speech API, lang: 'hr-HR', rate: 0.92 |
| Bez automatskih animacija | Nema CSS transitions ni keyframes |
| Skip link | Na svakoj stranici, vidljiv pri fokusu tipkovnicom |
| Alt tekst | Na svakoj fotografiji, opisni tekst iz JSON-a |
| Kontrola fonta | A− / A+ gumbi, 4 koraka: 20/24/28/32px |
| Offline podrška | Service Worker (vidi odjeljak ispod) |
| Flex Mode (Z Fold7) | Interaktivni elementi u gornjoj polovici ekrana |

---

## Offline podrška — Service Worker

### Kako radi

Service Worker (`service-worker.js`) prolazi kroz tri faze:

**1. INSTALL** — pri prvom posjetu uz internet, preuzima i sprema u keš:
- Sve HTML stranice (`index.html`, `vodic/`, `quest/`, `o-projektu/`, `qr.html`)
- CSS i JavaScript datoteke
- `manifest.json` i `data/eksponati.json`

**2. ACTIVATE** — briše stare verzije keša (npr. `muzej-v0` kad dođe `muzej-v1`)

**3. FETCH** — presreće svaki zahtjev i bira strategiju:

| Tip resursa | Strategija | Zašto |
|-------------|-----------|-------|
| HTML, CSS, JS | **Cache First** | Odmah dostupno offline, bez čekanja mreže |
| `eksponati.json` | **Network First** | Svježi podaci kad ima interneta, fallback keš |
| Slike i ikone | **Cache First + runtime** | Kešira pri prvom posjetu, poseban keš `muzej-slike-v1` |

### Što korisnik dobiva

- Nakon prvog posjeta uz internet: aplikacija se otvara **potpuno offline**
- Slike se kešaju automatski pri prvom pregledu svakog eksponata
- Kad se doda novi eksponat u JSON, SW ga povuče pri sljedećoj posjeti uz internet

### Ažuriranje verzije

Kad dodaš nove datoteke ili promijeniš sadržaj, promijeni `VERZIJA` u `service-worker.js`:

```js
const VERZIJA = 'muzej-v2'; // povećaj broj
```

SW automatski obriše stari keš i preuzme sve ispočetka.

### Registracija SW-a

SW se registrira u `index.html` na kraju `<body>`:

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
```

Registracija se pokreće tek nakon `window.load` — stranica se učita brzo, SW radi u pozadini. Ako browser ne podržava SW (stari uređaji), `if` provjera osigurava da ništa ne pukne.

---

## PWA manifest

Datoteka `manifest.json` omogućuje instalaciju na Home Screen mobilnog uređaja:

| Polje | Vrijednost |
|-------|-----------|
| Naziv | Muzej za sve |
| Kratki naziv | Muzej |
| Tema boja | `#1A3A1A` (tamnozelena) |
| Pozadinska boja | `#F4EFE4` (krem) |
| Prikaz | `standalone` (bez browserove adresne trake) |
| Orijentacija | `portrait-primary` |
| Prečaci | Vodič + Daruvar Quest (direktno s Home Screena) |

### Ikone koje treba stvoriti

Postavi ove PNG datoteke u `assets/ikone/`:

| Datoteka | Veličina | Namjena |
|----------|---------|---------|
| `ikona-192.png` | 192×192px | Standardna PWA ikona |
| `ikona-512.png` | 512×512px | Splash screen |
| `ikona-maskable-512.png` | 512×512px | Android maskable (s "safe zone" marginom) |
| `ikona-vodic-96.png` | 96×96px | Prečac "Vodič" |
| `ikona-quest-96.png` | 96×96px | Prečac "Quest" |

> Koristiti alat [Maskable.app](https://maskable.app) za generiranje maskable varijante iz SVG loga.

---

## QR kod stranica — qr.html

Namjena ove stranice je isključivo **ispis** — nema navigacije, nema zaglavlja, samo QR kod koji vodi na aplikaciju. Učenik 2 je ispisuje, lijepi na ulaz muzeja ili naslonjaču za posjetitelje, a posjetitelji je skeniraju kamerom mobitela.

### Kako se QR kod generira

Stranica koristi besplatni javni API `api.qrserver.com`. Umjesto da generiramo QR kod JavaScript bibliotekom lokalnog (što bi zahtijevalo preuzimanje dodatnog koda), šaljemo zahtjev prema API-ju koji nam vrati gotovu PNG sliku.

Konkretno, browser šalje zahtjev ovakvog oblika:

```
https://api.qrserver.com/v1/create-qr-code/
  ?data=https://muzej-daruvar.hr/         ← URL koji se kodira u QR
  &size=300x300                            ← dimenzije slike u pikselima
  &color=1A3A1A                            ← boja točkica (tamnozelena, hex bez #)
  &bgcolor=ffffff                          ← boja pozadine (bijela)
  &margin=1                               ← bijeli rub oko koda (u "modulima")
  &format=png                              ← format slike
  &ecc=Q                                  ← razina korekcije greške (25%)
```

API vraća PNG sliku koju browser prikazuje u `<img>` elementu — nema JavaScripta, nema biblioteke, samo jedna URL adresa.

### Parametar ecc — korekcija greške

`ecc=Q` znači "Quarter" — QR kod ostaje čitljiv čak i ako je do 25% površine oštećeno ili prekriveno. To je važno za ispis jer tisak ponekad nije savršen, papir se može izgužvati, a kiosk prikazi mogu imati odsjaj. Postoje četiri razine:

| Razina | Oznaka | Korekcija | Kada koristiti |
|--------|--------|-----------|---------------|
| Low | `L` | 7% | Čisti digitalni prikaz, nikad oštećenje |
| Medium | `M` | 15% | Standardni ispis |
| **Quarter** | **`Q`** | **25%** | **Naš izbor — ispis, kiosk, muzej** |
| High | `H` | 30% | Logotipi prekrivaju dio koda |

### Automatski URL — bez ručnog upisivanja

Najvažniji dio JavaScript koda u `qr.html` je automatska detekcija URL-a aplikacije:

```js
const APP_URL = (function() {
  const loc = window.location;
  return loc.origin + loc.pathname.replace('qr.html', '');
})();
```

**Što ovaj kod radi, korak po korak:**

1. `window.location.origin` — uzme protokol + domenu, npr. `https://muzej-daruvar.hr`
2. `window.location.pathname` — uzme putanju, npr. `/muzej-za-sve/qr.html`
3. `.replace('qr.html', '')` — makne naziv datoteke, ostaje `/muzej-za-sve/`
4. Spoji: `https://muzej-daruvar.hr/muzej-za-sve/`

**Rezultat:** isti `qr.html` radi na lokalnom serveru (`localhost:8080`), GitHub Pagesu i bilo kojem produkcijskom hostingu — bez ikakve promjene koda. URL koji API prima uvijek je točan.

### Offline fallback

Ako stranica nije otvorena uz internet (npr. na školskom računalu bez Wi-Fi-a), API ne može vratiti sliku. U tom slučaju:

```html
<img id="qr-slika" src="...api url...">
```

```js
qrSlika.onerror = function() {
  qrSlika.style.display = 'none';   // sakrij prazni <img>
  qrGreska.style.display = 'flex';  // prikaži poruku greške
};
```

Korisniku se prikaže zlatni uzvičnik i tekst: *"QR kod nije dostupan bez interneta. Unesi URL ručno ili ispiši kad budeš online."* — aplikacija ne prikazuje bijeli prazan kvadrat.

### Print stilovi — @media print

CSS blok `@media print` aktivira se automatski kad korisnik pritisne `Ctrl+P` ili klikne gumb "Ispiši QR kod". Razlike od ekranskog prikaza:

| Element | Ekran | Ispis |
|---------|-------|-------|
| Sjena kartice (`box-shadow`) | Vidljiva | Uklonjena |
| Gumb "Ispiši QR kod" | Vidljiv | Skriven (`display: none`) |
| Boje pozadine | Normalne | Osigurane s `print-color-adjust: exact` |

Bez `print-color-adjust: exact` Chrome i Edge automatski uklanjaju boje pozadine pri ispisu kako bi "štedili tintu" — zeleni okvir i zlatna linija ne bi se ispisali.

### Tekst "Skeniraj za otvaranje" — 20px

Ispod QR koda stoji tekst eksplicitno definiran na `font-size: 20px` (ne `rem`, ne `em` — apsolutna vrijednost). Zašto apsolutna vrijednost?

Na ekranskom prikazu `font-size` na `<html>` može biti 20/24/28/32px (A−/A+ kontrola). Da smo koristili `rem`, veličina teksta bi se mijenjala s fontom ostatka aplikacije. Na ovoj stranici to ne želimo — stranica je za ispis, a ispis mora uvijek izgledati isto bez obzira na korisničke postavke.

### Što treba napraviti prije ispisa

1. Osigurati da aplikacija ima **pravi javni URL** (hosting, GitHub Pages ili sl.)
2. Otvoriti `qr.html` u browseru uz internet
3. Vizualno provjeriti da QR kod prikazuje ispravan URL (vidljiv ispod QR koda)
4. Kliknuti "Ispiši QR kod" ili `Ctrl+P`
5. Preporučeno: ispisati u boji, veličina A5 ili veća za dobru čitljivost

---

## Tehnički stack

- **Vanilla HTML/CSS/JavaScript** — bez frameworka, bez bundlera
- **Web Speech API** — TTS na hrvatskom (`lang: 'hr-HR'`)
- **localStorage** — quest score, font veličina
- **Fetch API** — učitavanje `eksponati.json`
- **Service Worker** — offline podrška
- **PWA Manifest** — instalacija na Home Screen
- **Bez vanjskih CDN-ova** — sve lokalno (offline uvjet)

---

## Podjela rada u timu

| Učenik | Uloga | Zadužen za |
|--------|-------|-----------|
| **Učenik 1** | Istraživač / Fotograf | Fotografira (S26), surađuje s Korak dalje, uređuje `eksponati.json` |
| **Učenik 2** | Programer | Sav kod — JS, CSS, HTML, Service Worker, QR stranica |
| **Učenik 3** | Dokumentarist / PM | Snima proces (Z Flip7), portfolio, dokumentarac |

---

## Dosad generirano

| Datoteka | Status | Bilješka |
|----------|--------|---------|
| `index.html` | Gotovo | Početni ekran, A11y audit: PASS |
| `vodic/index.html` | Gotovo | Lista eksponata, A11y audit: PASS |
| `vodic/eksponat.html` | Gotovo | Prikaz eksponata + TTS, A11y audit: PASS |
| `quest/kviz.html` | Gotovo | Kviz logika + localStorage, A11y audit: PASS |
| `service-worker.js` | Gotovo | Cache First + Network First + runtime cache za slike |
| `manifest.json` | Gotovo | PWA instalacija, ikone, prečaci |
| `quest/index.html` | Gotovo | Quest uvod |
| `quest/rezultat.html` | Gotovo | Rezultati |
| `o-projektu/index.html` | Gotovo | O projektu |
| `qr.html` | Gotovo | Ispis QR koda, automatski URL, offline fallback, print stilovi |
| `data/eksponati.json` | Djelomično | Struktura definirana, sadržaj dopunjuje učenik 1 s kustosom |
| `portfolio/samsung-ai.html` | Gotovo | 14 AI kartica za 3 uređaja, PRIJE/POSLIJE okviri, placeholder upute |
| `assets/ikone/` PNG | **Potrebno** | Fizički stvoriti PNG ikone za PWA (192px, 512px, maskable) |

---

## Pokretanje lokalno

Service Worker zahtijeva **HTTPS ili localhost**. Za lokalni razvoj:

```bash
# Opcija 1 — VS Code Live Server (preporučeno za učenike)
# Instaliraj ekstenziju "Live Server", desni klik na index.html → Open with Live Server

# Opcija 2 — Python (ako je instaliran)
python -m http.server 8080
# Otvori: http://localhost:8080/muzej-za-sve/

# Opcija 3 — Node.js
npx serve muzej-za-sve
```

> **Važno:** Otvaranjem HTML datoteke direktno iz file explorera (`file://`) Service Worker **neće raditi**. Uvijek koristiti lokalni server ili HTTPS hosting.

---

*Mentorica: Ivana Milić · Tehnička škola Daruvar · Samsung Challenge 2025./2026.*
