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

### المراجع التانية (الدفعة ٢)

```bash
mkdir -p .cache/de/src && cd .cache/de/src
curl -sfL -o rc.pdf https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf
curl -sfL -o osd-za1.pdf https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf
curl -sfL -o telc-a.pdf "https://shop.telc.net/media/catalog/product/file//2/0/20201225_5069-b00-010104_web.pdf"
curl -sfL -o dtz.pdf https://www.goethe.de/resources/files/pdf209/dtz_pruefungshandbuch.pdf
# rm.coe.int بيرد 403 على curl العادي، فلازم User-Agent بتاع متصفح
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
curl -sfL -A "$UA" -o cefr-desc.xlsx https://rm.coe.int/cefr-descriptors-2020-/16809ed2c7   # كل جمل CEFR في Excel
cd ../../..
MSYS_NO_PATHCONV=1 docker run --rm -v "$PWD/.cache/de/src:/w" -v "$PWD/tools/de:/tools" -w /w de-tools sh -c '
  pdftotext -layout rc.pdf rc.txt
  python /tools/xlsx-rows.py cefr-desc.xlsx > cefr-desc.json
  pdftotext -f 6 -l 17 osd-za1.pdf osd-test.txt; pdftotext -f 27 -l 29 osd-za1.pdf osd-hoer.txt; cat osd-test.txt osd-hoer.txt > osd-a1.txt
  pdftotext -f 6 -l 18 telc-a.pdf telc-test.txt; pdftotext -f 33 -l 36 telc-a.pdf telc-hoer.txt; cat telc-test.txt telc-hoer.txt > telc-a1.txt
  python /tools/lemmas.py osd-a1.txt telc-a1.txt > lemmas.json'
```

## المنهج

```bash
node tools/syllabus-gen/de-rc.js     # فحص: عدد أهداف الـ Rahmencurriculum لكل مستوى ومجال (لازم يطابق جدول ص ١٦٦–١٧١)
node tools/syllabus-gen/de-wikt.js   # يطلّع كلمات A1 (وكلمات de-a1-extra.js) من Wiktionary، ويقارن أداة وجمع كل اسم بقايمة Goethe
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
- **الـ Rahmencurriculum (الدفعة ٢):** ٦٥٤ هدف (A1 ١٨٥، و A2 ٣٢٢، و B1 ١٤٧). عدد الأهداف وعدد A1 في كل مجال من الـ ١٢ متطابقين مع جدول الإحصائيات في آخر الـ PDF. **فخين اتمسكوا بالمقارنة دي:** عناوين الأعمدة متوسّطة فوق العمود، فمكان «NIVEAU» في العنوان مش هو مكان «A1» في الصف (الفرق بيتحسب من أول صف فيه مستوى)، وصفحات الشرح في الأول فيها جداول أمثلة بتتقري كأنها أهداف (الحل: الأهداف من ص ٢٩ بس). وجدول «Einkaufen» بيقول ٢٤ هدف، والحقيقي ٢٣: هدف واحد ليه نشاطين («hören, schreiben») فاتعدّ مرتين في رسم الأنشطة.
- **CEFR:** ملف الـ PDF (٢٧٨ صفحة) بيترص فيه رقم المستوى في نص مجموعة الجمل، فقراءته من الـ PDF طلّعت مقاييس ناقصة. ملف الـ Excel الرسمي فيه كل جملة بمقياسها ومستواها (وكمان بالألماني): ١٧٥ جملة A1، منها ١٠١ للغة المنطوقة والمكتوبة (الباقي لغة إشارة أو «No descriptors available»).
- **مقارنة الكلمات بـ spaCy:** نص امتحان ÖSD و telc التجريبي طلّع ٤١٢ كلمة مش في قايمة Goethe، معظمها غلط في التصريف (spaCy قال «Minu» و «Antwortbog»)، أو أسامي أماكن، أو كلام الامتحان عن نفسه، أو كلمات مركّبة من كلمات A1 (والتلات امتحانات بيسمحوا بيها). اللي اتاخد بالإيد ٥٥ كلمة. يعني الأداة بتطلّع مرشحين، والقرار بالقراية.
- **فخ في ملف kaikki:** أول `"word": "` في السطر ممكن يكون لكلمة مرتبطة (antonyms بتاعة Mann فيها Frau)، فـ Frau أخدت بيانات Mann. الكلمة نفسها هي اللي قبل `"lang": "German"` على طول.
