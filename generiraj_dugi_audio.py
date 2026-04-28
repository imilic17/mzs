"""Generira samo dugi_opis MP3 datoteke (kratki već postoje)."""
import asyncio
import json
import os
import edge_tts

GLASOVI = {
    "hr": "hr-HR-GabrijelaNeural",
    "en": "en-US-JennyNeural",
    "cz": "cs-CZ-VlastaNeural",
}

AUDIO_DIR = os.path.join("assets", "audio")

async def generiraj_clip(tekst, glas, putanja):
    communicate = edge_tts.Communicate(tekst, glas, rate="-8%")
    await communicate.save(putanja)
    velicina = os.path.getsize(putanja)
    print(f"  OK  {putanja}  ({velicina // 1024} KB)")

async def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    with open(os.path.join("data", "eksponati.json"), "r", encoding="utf-8") as f:
        eksponati = json.load(f)

    zadaci = []
    for e in eksponati:
        eid = e["id"]
        hr_dugi = e.get("dugi_opis") or e.get("kratki_opis") or ""
        if hr_dugi:
            zadaci.append((hr_dugi, GLASOVI["hr"], os.path.join(AUDIO_DIR, f"{eid}-hr-dugi.mp3")))

        prijevodi = e.get("prijevodi", {})
        for lang_key, glas in [("en", GLASOVI["en"]), ("cz", GLASOVI["cz"])]:
            p = prijevodi.get(lang_key)
            if not p:
                continue
            dugi = p.get("dugi_opis") or p.get("kratki_opis") or ""
            if dugi:
                zadaci.append((dugi, glas, os.path.join(AUDIO_DIR, f"{eid}-{lang_key}-dugi.mp3")))

    print(f"Generiram {len(zadaci)} dugih audio clipova...\n")
    for tekst, glas, putanja in zadaci:
        try:
            await generiraj_clip(tekst, glas, putanja)
        except Exception as ex:
            print(f"  GRESKA  {putanja}: {ex}")
    print(f"\nGotovo!")

if __name__ == "__main__":
    asyncio.run(main())
