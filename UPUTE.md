# Upute za rad s projektom

**Muzej za sve · Samsung Challenge 2025./2026.**

Ove upute pisane su za učenike koji prvi put rade s kodom.
Ne trebaš znati programirati da bi dodao novi eksponat ili promijenio fotografiju —
sve što trebaš napraviti objašnjeno je korak po korak.

---

## Sadržaj

1. [Kako pokrenuti aplikaciju na računalu](#1-kako-pokrenuti-aplikaciju-na-računalu)
2. [Kako dodati novi eksponat](#2-kako-dodati-novi-eksponat)
3. [Kako promijeniti fotografiju](#3-kako-promijeniti-fotografiju)
4. [Samsung AI funkcije — što svaka radi](#4-samsung-ai-funkcije--što-svaka-radi)

---

## 1. Kako pokrenuti aplikaciju na računalu

### Zašto ne možeš samo dvostruko kliknuti na index.html?

Kad otvoriš HTML datoteku dvostrukim klikom, browser je otvara s adresom koja počinje s `file://` —
na primjer: `file:///C:/Users/Korisnik/Desktop/Samsung challenge/muzej-za-sve/index.html`.

Problem je što aplikacija treba **učitati JSON datoteku** (`eksponati.json`) koja sadrži sve podatke
o eksponatima. Browser iz sigurnosnih razloga blokira učitavanje datoteka s diska kad koristiš
`file://` protokol. Rezultat: aplikacija se otvori, ali popis eksponata ostaje prazan ili se
pojavi poruka greške.

Rješenje je pokrenuti **lokalni web server** — program koji simulira pravi internet na tvojem računalu.

---

### Opcija A — Python (preporučeno, najjednostavnije)

Python je programski jezik koji dolazi s ugrađenim web serverom.
Provjeri imaš li ga instaliranog: otvori **Command Prompt** (tipka Windows + R, upiši `cmd`, Enter)
i napiši:

```
python --version
```

Ako vidiš nešto poput `Python 3.11.0` — imaš ga i možeš nastaviti.
Ako piše `nije prepoznata naredba` — instaliraj Python s [python.org](https://python.org) (besplatno).

**Koraci:**

```
1. Otvori Command Prompt (Windows + R → cmd → Enter)

2. Navigiraj do mape projekta:
   cd "C:\Users\Korisnik\Desktop\Samsung challenge\muzej-za-sve"

3. Pokreni server:
   python -m http.server 8080

4. Otvori browser i idi na:
   http://localhost:8080
```

Na ekranu Command Prompta vidjet ćeš nešto ovako:

```
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

To znači da server radi. Aplikacija je sad dostupna na `http://localhost:8080`.

**Zaustavljanje servera:** vrati se na Command Prompt i pritisni `Ctrl + C`.

---

### Opcija B — VS Code Live Server (ako koristiš VS Code)

Ako pišeš kod u Visual Studio Codeu, postoji još jednostavniji način:

```
1. Instaliraj ekstenziju "Live Server" (ikona kocke s lijeve strane → pretraži "Live Server")

2. Desni klik na index.html u lijevom panelu

3. Odaberi "Open with Live Server"

4. Browser se automatski otvara na http://127.0.0.1:5500
```

Prednost Live Servera: svaki put kad spremiš promjenu u datoteci, browser se **automatski osvježi**.
Ne moraš ručno pritiskati F5.

---

### Opcija C — Node.js (ako imaš instaliran)

```
npx serve .
```

Pokreni ovu naredbu unutar mape `muzej-za-sve`. Server se pokrene i ispiše adresu.

---

### Testiranje na mobitelu (QR kod)

Kad server radi, aplikaciju možeš otvoriti i na mobitelu — bez interneta, samo putem Wi-Fi mreže:

```
1. Provjeri da su računalo i mobitel na istoj Wi-Fi mreži

2. Pronađi IP adresu računala:
   - Windows: otvori cmd → upiši ipconfig → traži "IPv4 Address"
   - Primjer: 192.168.1.42

3. Na mobitelu otvori browser i idi na:
   http://192.168.1.42:8080

4. Ili otvori qr.html i skeniraj QR kod koji automatski pokazuje
   adresu aplikacije
```

---

## 2. Kako dodati novi eksponat

Svi podaci o eksponatima nalaze se u jednoj datoteci:

```
muzej-za-sve/
└── data/
    └── eksponati.json   ← JEDINA datoteka koju trebaš mijenjati
```

### Što je JSON?

JSON je način zapisivanja podataka koji razumiju i ljudi i računala.
Izgleda ovako:

```json
{
  "naziv": "Diatretni pehar",
  "godina": 1700
}
```

Svaki podatak ima **naziv** (lijevo od dvotočke) i **vrijednost** (desno od dvotočke).
Nazivi su uvijek pod navodnicima. Vrijednosti koje su tekst su pod navodnicima,
a vrijednosti koje su brojevi — nisu.

---

### Kako izgleda jedan eksponat u datoteci

Otvori `data/eksponati.json` u bilo kojem uređivaču teksta (Notepad, VS Code...).
Vidjet ćeš listu eksponata u uglatim zagradama `[ ... ]`.
Svaki eksponat je objekt u vitičastim zagradama `{ ... }`.

Evo kompletnog primjera s objašnjenjem svakog polja:

```json
{
  "id": "diatretni-pehar",
```
**id** — jedinstvena oznaka eksponata. Koristi se u URL-u (npr. `eksponat.html?id=diatretni-pehar`).
Pravila: samo mala slova, bez razmaka, umjesto razmaka stavi crticu `-`, bez hrvatskih slova (č,ć,š,ž,đ).
Primjeri: `"rimska-fibula"`, `"pivovara-daruvar"`, `"toplice-aquae"`.

```json
  "naziv": "Diatretni pehar",
```
**naziv** — ime eksponata kako se prikazuje na ekranu. Može imati dijakritike i razmake.

```json
  "kategorija": "rimsko-doba",
```
**kategorija** — svrstava eksponat u skupinu i određuje boju/ikonu placeholder-a.
Dostupne kategorije (mora biti točno ovako napisano, mala slova):
- `"rimsko-doba"` — rimski artefakti, Aquae Balissae
- `"dvorac-i-barok"` — dvorac Janković i barokno naslijeđe
- `"priroda"` — Ginkgo biloba, parkovi, prirodna baština
- `"ceska-bastina"` — pivovara, češka kulturna zajednica

```json
  "kratki_opis": "Staklena čaša stara oko 1700 godina...",
```
**kratki_opis** — stručni opis, 2–4 rečenice. Piše ga učenik 1 uz pomoć kustosa.
Ovaj opis prikazuje se ispod gumba "Stručni opis" (skriven je po defaultu,
korisnik ga može otvoriti tapkanjem).

```json
  "dugi_opis": "Diatretni pehar izrađen je u 4. stoljeću...",
```
**dugi_opis** — detaljan stručni tekst, može biti više odlomaka.
Trenutno se **ne prikazuje** u aplikaciji (planiran za buduću verziju).
Svejedno ga vrijedi ispuniti jer ostaje kao arhivski zapis.

```json
  "easy_to_read_opis": "Ovo je stara staklena čaša. Ima oko 1700 godina...",
```
**easy_to_read_opis** — ⚠️ OVO JE NAJVAŽNIJE POLJE.
Ovo je tekst koji **glasovni asistent čita naglas** korisnicima s intelektualnim teškoćama.

Pravila pisanja (dogovorena s korisnicima Korak dalje):
- Kratke rečenice — maksimalno 8–10 riječi po rečenici
- Bez stručnih pojmova — ako moraš koristiti stručan naziv, odmah objasni što znači
- Konkretno, opipljivo — "velika kao šalica za kavu" umjesto "visine 12 cm"
- Aktivne rečenice — "Pronašli su je u Daruvaru" umjesto "Pronađena je u Daruvaru"
- Maksimalno 3–4 rečenice ukupno

Loš primjer: *"Artefakt iz kasnoantičkog razdoblja, datiran u 4. st. n. e."*
Dobar primjer: *"Ovo je stara staklena čaša. Ima 1700 godina. Pronašli su je u Daruvaru."*

```json
  "quest_pitanje": "Koliko je star Diatretni pehar pronađen u Daruvaru?",
```
**quest_pitanje** — pitanje koje se prikazuje u Daruvar Quest kvizu.
Treba biti jasno, jednoznačno i vezano uz nešto što posjetitelj može
saznati fizičkim posjetom muzeju.

```json
  "quest_odgovori": ["Oko 500 godina", "Oko 1700 godina", "Oko 300 godina"],
```
**quest_odgovori** — točno 3 odgovora u uglatim zagradama, odvojeni zarezima.
Svaki odgovor je pod navodnicima. Redoslijed je važan — prvi odgovor
je A, drugi B, treći C. Pogrešni odgovori trebaju biti uvjerljivi,
ne smijepljivi (ne stavljaj namjerno smiješne odgovore — korisnici s
intelektualnim teškoćama ih ne razumiju kao šalu).

```json
  "quest_tocni_odgovor": 1,
```
**quest_tocni_odgovor** — redni broj točnog odgovora, ali počinje od **0**.
- `0` znači da je točan **prvi** odgovor (A)
- `1` znači da je točan **drugi** odgovor (B)
- `2` znači da je točan **treći** odgovor (C)

Greška koja se najčešće dogodi: napišeš `1` misleći da je to "odgovor broj 1",
a zapravo `1` znači drugi odgovor. Uvijek provjeri dvaput.

```json
  "quest_zanimljivost": "Diatretni pehar je toliko rijedak...",
```
**quest_zanimljivost** — kratka zanimljiva činjenica koja se prikazuje
**samo** nakon što korisnik odgovori točno. Nagrada za točan odgovor.
Piši nešto što iznenađuje ili što mladi ne bi znali — cilj je da požele
podijeliti tu informaciju s prijateljima.

```json
  "slika_originalna": "assets/slike/diatretni-pehar-original.jpg",
```
**slika_originalna** — putanja do fotografije eksponata.
Fotografija mora biti fizički pohranjena u mapi `assets/slike/`.
Ako fotografija još nije dostupna, možeš izostaviti ovo polje
ili napisati `""` — aplikacija će prikazati ilustrirani placeholder.

```json
  "slika_ai_obradena": "assets/slike/diatretni-pehar-ai.jpg",
```
**slika_ai_obradena** — putanja do AI obrađene verzije fotografije
(Generative Edit, AI Remaster...). Koristi se za portfolio dokumentaciju.
Trenutno se ne prikazuje u aplikaciji automatski — tu je kao arhiv.

```json
  "slika_alt": "Stakleni Diatretni pehar iz rimskog doba..."
}
```
**slika_alt** — kratki opis fotografije za osobe koje koriste čitač ekrana
ili kad se fotografija ne može učitati. Piši konkretno što je na slici:
boja, oblik, materijal, kontekst. Ne piši "slika eksponata" — to ne govori ništa.

---

### Korak po korak: dodavanje novog eksponata

**Korak 1.** Otvori datoteku `data/eksponati.json` u VS Codeu ili Notepadu.

**Korak 2.** Pronađi zadnji eksponat u listi. Izgleda ovako (na kraju datoteke):

```json
  {
    "id": "ginkgo-biloba",
    ...zadnje polje...
    "slika_alt": "..."
  }
]
```

**Korak 3.** Iza zatvorene vitičaste zagrade `}` zadnjeg eksponata, ali **prije** zatvorene uglate zagrade `]`, dodaj zarez i novi eksponat:

```json
  {
    "id": "ginkgo-biloba",
    ...
    "slika_alt": "..."
  },           ← DODAJ ZAREZ OVDJE
  {
    "id": "pivovara-daruvar",
    "naziv": "Pivovara Daruvar",
    "kategorija": "ceska-bastina",
    "kratki_opis": "Tvoj stručni opis ovdje.",
    "dugi_opis": "Detaljniji opis ovdje.",
    "easy_to_read_opis": "Kratke rečenice. Jednostavno. Za Korak dalje.",
    "quest_pitanje": "Tvoje pitanje za kviz?",
    "quest_odgovori": ["Odgovor A", "Odgovor B", "Odgovor C"],
    "quest_tocni_odgovor": 0,
    "quest_zanimljivost": "Zanimljiva činjenica ovdje.",
    "slika_originalna": "assets/slike/pivovara-original.jpg",
    "slika_ai_obradena": "assets/slike/pivovara-ai.jpg",
    "slika_alt": "Opis što je na fotografiji"
  }
]
```

**Korak 4.** Spremi datoteku (Ctrl + S).

**Korak 5.** Osvježi browser (F5). Novi eksponat se treba pojaviti u Vodiču i Questu.

---

### Najčešće greške u JSON-u

JSON je strog — jedna pogrešno postavljena interpunkcija i aplikacija ne radi.

| Greška | Primjer greške | Ispravno |
|--------|---------------|----------|
| Zaboravljen zarez između eksponata | `} {` | `}, {` |
| Zarez iza zadnjeg polja | `"alt": "opis",` (na kraju) | `"alt": "opis"` |
| Navodnici koji nisu ravni | `"naziv": "Pehar"` (tipografski) | `"naziv": "Pehar"` |
| Nedostaje navodnik | `"id: "pehar"` | `"id": "pehar"` |
| Hrvatska slova u id-u | `"id": "čaša"` | `"id": "casa"` |

**Savjet:** VS Code podcrta greške u JSON-u crvenom bojom — tražiti crvene linije.
Može se koristiti i [jsonlint.com](https://jsonlint.com) — zalijepiti cijeli sadržaj
datoteke, kliknuti Validate, i vidjet ćeš točno gdje je greška.

---

## 3. Kako promijeniti fotografiju

### Gdje su fotografije pohranjene

```
muzej-za-sve/
└── assets/
    └── slike/          ← SVE fotografije idu ovdje
        ├── diatretni-pehar-original.jpg
        ├── diatretni-pehar-ai.jpg
        ├── dvorac-jankovic-original.jpg
        └── ...
```

### Konvencija imenovanja datoteka

Ime datoteke treba odgovarati `id`-u eksponata:
- id eksponata: `pivovara-daruvar`
- originalna fotografija: `pivovara-daruvar-original.jpg`
- AI obrađena fotografija: `pivovara-daruvar-ai.jpg`

Ovo nije tehnički obavezno — naziv datoteke može biti bilo što —
ali olakšava snalaženje kad imaš 10+ eksponata.

### Korak po korak: dodavanje fotografije

**Korak 1.** Fotografiju prebaci u mapu `assets/slike/`.

Fotografija može biti `.jpg` ili `.png`. Preporučena veličina:
- Širina: 800–1200px (više nije potrebno, samo zauzima prostor)
- Visina: bilo koja, ali fotografija se automatski izreže na `cover` način
- Veličina datoteke: ispod 500 KB — za brže učitavanje na mobilnom internetu

Za smanjivanje veličine fotografije bez gubitka kvalitete može se koristiti
besplatni alat [Squoosh](https://squoosh.app) u browseru.

**Korak 2.** Otvori `data/eksponati.json` i pronađi eksponat za koji dodaješ fotografiju.

**Korak 3.** Promijeni polje `slika_originalna`:

```json
"slika_originalna": "assets/slike/naziv-tvoje-fotografije.jpg",
```

Pazi: putanja počinje s `assets/slike/` (bez navodnika oko naziva mape,
sve unutar navodnika koji obuhvaćaju cijelu putanju).

**Korak 4.** Promijeni i `slika_alt` — opiši što je točno na novoj fotografiji.

**Korak 5.** Spremi datoteku i osvježi browser. Fotografija se treba pojaviti.

### Što ako se fotografija ne prikazuje

Najčešći razlozi:

1. **Pogrešna putanja** — provjeri slova: `assets/slike/Pehar.jpg` i `assets/slike/pehar.jpg`
   su dvije različite datoteke na Windowsu (no nije uvijek tako na Linux serverima).
   Koristiti samo mala slova.

2. **Pogrešna ekstenzija** — datoteka je `pehar.jpeg`, a u JSON-u piše `pehar.jpg`.
   `.jpg` i `.jpeg` su isti format, ali računalo ih razlikuje po imenu.

3. **Fotografija nije u pravoj mapi** — provjeriti je li datoteka doista u
   `muzej-za-sve/assets/slike/`, a ne negdje drugdje na računalu.

4. **Server nije osvježen** — ponekad treba zatvoriti browser tab i otvoriti novi.

Ako fotografija i dalje ne radi: otvoriti Developer Tools (F12 u browseru),
kliknuti na tab "Console" i tražiti crvene poruke greške — obično piše
točno koji je file `404 Not Found`.

---

## 4. Samsung AI funkcije — što svaka radi

Ovo je pregled svih Samsung AI funkcija korištenih u projektu, pisano jednostavno.

---

### Galaxy S26 — Vizualni istraživač

---

**Generative Edit**

Zamislite da fotkate vitrinu s eksponatom, ali na staklu se vidi odsjaj žarulje —
eksponat je prekriven blijeskom. Generative Edit to popravlja: označiš odsjaj prstom,
AI ga briše i "izmišlja" što se nalazi ispod njega. Rezultat izgleda kao da stakla
nikad nije ni bilo.

*Koristimo za:* fotografiranje vitrina u muzeju.

---

**AI Remaster**

Muzej ima stare fotografije iz prošlog stoljeća — crno-bijele, mračne, s ogrebotinama.
AI Remaster ih "restaurira": pojačava detalje, čisti šum, vraća kontrast.
Ne izmišlja ništa — samo izoštruje ono što je bilo tu, ali nečitljivo.

*Koristimo za:* restauraciju arhivskih fotografija za vodič.

---

**Sketch to Image**

Nacrtaš grubu skicu olovkom — ili čak samo "crtičice" na ekranu —
i AI to pretvori u realističnu fotografiji sličnu sliku. Što detaljnija skica,
to bolji rezultat, ali radi i s grubim skicama.

*Koristimo za dva cilja:*
1. Kustos opisuje predmet koji nedostaje iz zbirke, učenik nacrta skicu → AI ga vizualizira
2. Učenik nacrta kako želi da izgleda ekran aplikacije → AI pokaže konačni izgled

---

**Circle to Search**

Dok gledaš bilo što na ekranu mobitela — fotografiju, web stranicu, kameru —
nartiš kružnicu oko bilo kojeg objekta prstom. Android odmah otvori Google pretragu
s tim predmetom kao upitom, bez napuštanja onoga što gledaš.

*Koristimo za:* istraživanje u muzeju — zaokružiti nepoznat grb, natpis ili predmet
i odmah dobiti informaciju tko je, što je i iz kojeg je vremena.

---

**Dual Recording**

Mobiteli obično snimaju ili prednjom ili stražnjom kamerom.
Dual Recording snima **objema istovremeno** i stavlja oba kadra u jednu datoteku
(ili dva kadra side-by-side). Jedna osoba, jedan uređaj, dva kuta snimanja odjednom.

*Koristimo za:* snimanje intervjua s kustosom — prednja kamera snima njegovu reakciju,
stražnja kamera snima predmete o kojima priča.

---

**Nightography**

Standardna kamera u mraku daje tamnu i zrnastu fotografiju.
Nightography koristi AI koji kombinira više ekspozicija u jednoj snimci i čisti šum —
rezultat je vidljiva, jasna fotografija bez bljeskalice.

*Koristimo za:* fotografiranje tamnih kutova dvorca i slabo osvijetljenih muzejskih vitrina.

---

### Galaxy Z Fold7 — Analitičar i programer

---

**Note Assist**

Snima govor, automatski ga pretvori u tekst (transkripcija) i potom napiše
kratki sažetak s ključnim točkama — sve bez ikakvog ručnog rada.
Umjesto da sat vremena tipkaš što je netko rekao, Note Assist to napravi
za nekoliko minuta.

*Koristimo za:* snimanje razgovora s kustosom i korisnicima Korak dalje.
Transkripcija postaje osnova za pisanje `easy_to_read_opisa` u eksponati.json.

---

**Flex Mode — kiosk postav**

Z Fold7 je telefon koji se može saviti. Kad ga savineš na pola pod kutom od 90°,
stoji sam na stolu poput malog laptopa — i ne treba ga nitko držati.
Gornji ekran prikazuje sadržaj, donji je interaktivna zona za tapkanje.

*Koristimo za:* postavljanje uređaja na stol u Korak dalje kao kiosk.
Korisnici slobodnim rukama listaju aplikaciju.

---

**Multitasking**

Z Fold7 ima velik unutarnji ekran (gotovo kao tablet). Multitasking ga dijeli
na dva dijela: jedna aplikacija lijevo, druga desno. Obje su potpuno funkcionalne
istovremeno.

*Koristimo za:* terenski rad — karta Daruvara s lijeve strane, bilješke s desne.
Nema potrebe za stalnim prebacivanjem između aplikacija.

---

**Sketch to Image — UI dizajn**

Ista funkcija kao na S26, ali korištena za drugi cilj:
prije nego se počne pisati kod za novi ekran aplikacije, učenik nacrta
kako bi htio da izgleda. AI pokaže vizualizaciju ideje.
Timski razgovor o dizajnu postaje lakši kad svi gledaju sliku, a ne opis.

*Koristimo za:* brzu vizualizaciju ideja za dizajn aplikacije u fazi razvoja.

---

### Galaxy Z Flip7 — Dokumentarist i storyteller

---

**Flex Mode — hands-free snimanje**

Kao i Z Fold7, Flip7 se može saviti i stati sam. Razlika: Flip7 je manji i
laganiji — lako se postavi na stol, policu ili stolicu i snima bez
ikakvog postavljanja stativa.

*Koristimo za:* snimanje korisnika Korak dalje dok testiraju aplikaciju.
Reakcije su prirodne jer nitko aktivno ne drži kameru i ne gleda u njih.

---

**AI Video**

AI automatski poboljšava video materijal: stabilizira trešnju kamere,
korigira boje, smanjuje šum u mraku. Sirovi materijal snimljen u
muzejskim hodnicima postaje "uglađen" i prezentabilan.

*Koristimo za:* obradu materijala za dokumentarac projekta (~4 minute).

---

**Instant Slow-mo**

Snimio si nešto normalnom brzinom i kasnije shvatio bi izgledalo mnogo bolje
usporeno. Instant Slow-mo to može: AI analizira kadar i dodaje "izmišljene"
međukadrove koji glatko usporavaju pokret. Ne treba poseban high-speed
mod snimanja — radi i s već snimljenim videom.

*Koristimo za:* dramatične detalje u promotivnom videu —
voda na rimskom vrelu, ruka koja dodiruje eksponat, list ginkga u vjetru.

---

**Vertikalni format (9:16)**

Standardni video je horizontalan (široki, 16:9) — kao televizija.
Ali svi drže mobitele uspravno. Instagram, TikTok i WhatsApp Stories
dizajnirani su za vertikalne videe koji zauzimaju cijeli ekran.
Z Flip7 je dizajniran za prirodno vertikalno snimanje.

*Koristimo za:* sav promo video materijal projekta — odmah spreman za
Instagram Stories i Reels bez ikakve konverzije ili rezanja.

---

## Kratki podsjetnik — što treba napraviti svaki put

Kad dodaješ novi eksponat:

```
□ Fotografija je pohranjena u assets/slike/
□ Naziv fotografije je mala slova, bez razmaka, bez hrv. slova
□ eksponati.json ima ispravan zarez između eksponata
□ id je jedinstven (ne ponavlja se u datoteci)
□ quest_tocni_odgovor je 0, 1 ili 2 (ne 1, 2 ili 3!)
□ easy_to_read_opis je kratke rečenice, bez stručnih pojmova
□ slika_alt opisuje što je na fotografiji
□ Testirati u browseru: Vodič prikazuje novi eksponat ✓
□ Testirati u browseru: Quest ima novo pitanje ✓
```

---

*Mentorica: Ivana Milić · Tehnička škola Daruvar · Samsung Challenge 2025./2026.*
