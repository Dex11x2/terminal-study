# أدوات كورس الألماني

كل حاجة بتشتغل في Docker، ومفيش تسطيب على الجهاز. الملفات اللي بتتنزّل بتتحط في `.cache/de/` (متجاهل في git، لأن ملفات Goethe عليها حقوق نشر، وملف Wiktionary كبير).

## التجهيز (مرة واحدة)

```bash
docker build -t de-tools tools/de          # pdftotext و Piper (٣ أصوات) و faster-whisper و spaCy
docker pull meyay/languagetool:latest      # مدقق القواعد (مفيش image رسمي)
mkdir -p .cache/de && cd .cache/de
curl -sfLO https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf
curl -sfLO https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf
curl -sfL -o kaikki-de.jsonl.gz https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz   # ≈99 MB
cd ../..
MSYS_NO_PATHCONV=1 docker run --rm -v "$PWD/.cache/de:/w" -w /w de-tools pdftotext -layout Pruefungsziele_Testbeschreibung_A1_SD1.pdf pz.txt
```

## المنهج

```bash
node tools/syllabus-gen/de-wikt.js   # يطلّع كلمات A1 من Wiktionary، ويقارن أداة وجمع كل اسم بقايمة Goethe
node tools/syllabus-gen/de-a1.js     # syllabus/de-a1.json و syllabus/de-a1.md
```

## الصوت والفحص

```bash
# صوت: النص من stdin، والصوت wav
echo "Guten Tag! Ich heiße Lena." | MSYS_NO_PATHCONV=1 docker run --rm -i -v "$PWD/.cache/de:/w" de-tools \
  python -m piper -m /voices/de_DE-thorsten-medium.onnx -f /w/audio/x.wav
# LanguageTool: الـ image ده بيسمع على 8081 جوه الـ container (مش 8010 زي images تانية)
docker run -d --name lt -p 127.0.0.1:8010:8081 meyay/languagetool:latest
curl -s http://127.0.0.1:8010/v2/check --data-urlencode "text=Ich habe gestern in die Schule gegangen." -d language=de-DE
docker rm -f lt
```

## اللي اتقاس (٢١ نوفمبر)

- **الأصوات:** كل صوت بيتعمل بيه جملة، و whisper (`small`) بيسمعها ويكتبها تاني. `thorsten-medium` و `thorsten-high` و `kerstin-medium` رجعوا الجملة كلمة بكلمة. `kerstin-low` قال «Guten» فطلعت «Durven»، و `mls-medium` (٢٣٦ متكلم) طلع كلام ملوش علاقة بالجملة. الاتنين دول مش مستخدمين.
- **whisper مع `av` 19:** `transcribe("file.wav")` بيقع `TypeError: open() got an unexpected keyword argument 'metadata_errors'`. الحل: اقرا الـ wav بـ `wave` و numpy، وحوّله لـ 16kHz، وابعته array.
- **LanguageTool:** مسك «Ich habe … gegangen» (لازم `bin`) و «seit zwei Jahr» (لازم `Jahren`)، **وفاتته «Der Tür»**. عشان كده أداة وجمع كل اسم بيتفحصوا كمان على Wiktionary.
- **Wiktionary:** كل الـ ٣٣١ اسم في قايمة A1 أداتهم وجمعهم متطابقين. وفيه تسجيل بصوت حقيقي (Wikimedia Commons) لـ ٦٧٧ كلمة من ٦٨٧، و IPA لـ ٦٥٤.
- **فخ في ملف kaikki:** أول `"word": "` في السطر ممكن يكون لكلمة مرتبطة (antonyms بتاعة Mann فيها Frau)، فـ Frau أخدت بيانات Mann. الكلمة نفسها هي اللي قبل `"lang": "German"` على طول.
