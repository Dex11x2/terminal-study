// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "المستندات وقواعد البيانات",
      l: 3,
      n: "PDF جواه إيه ومعلوماته المخفية، وليه .docx و .xlsx هما zip فيه XML (وتقرا الداتا منهم بإيدك)، وقاعدة بيانات كاملة في ملف واحد: .db و .sqlite",
      items: [
        {
          cmd: ".pdf",
          title: "ملف PDF جواه إيه، وليه صعب تعدّله أو تطلّع منه نص عربي سليم؟",
          desc: R`PDF (Portable Document Format) معمول عشان المستند يتعرض بنفس الشكل بالظبط على أي جهاز وأي طابعة. هو مش «نص بتنسيق» زي Word: هو أوامر رسم: «حط الحرف ده في الإحداثيات دي بالخط ده». عشان كده:
• شكله ثابت في كل حتة (ودي ميزته الأساسية للفواتير والعقود والـ CV).
• تعديله صعب (البرامج بتحاول تخمّن الفقرات من مكان الحروف).
• استخراج النص منه ساعات بيطلع مكسّر، خصوصًا العربي: الحروف بتبقى مرسومة بأشكالها المتصلة، فالكلمات ممكن تطلع بترتيب مقلوب أو حروف متفصلة.

جواه إيه:
• بيبدأ بـ [[%PDF-1.7]] (النسخة)، وبيخلص بـ [[%%EOF]].
• objects مترقمة: صفحات، وخطوط (غالبًا مدموجة جواه)، وصور، و streams مضغوطة فيها أوامر الرسم.
• جدول في الآخر ([[xref]]) بيقول كل object فين.
• metadata: [[Author]] و [[Creator]] (البرنامج اللي عمله) و [[Producer]] وتاريخ الإنشاء. والـ [[Author]] غالبًا اسمك على الجهاز، فاتأكد منه قبل ما تبعت ملف لعميل.
• ممكن يكون فيه forms وتوقيعات رقمية وروابط و JavaScript ومرفقات، وعشان كده PDF من مصدر مش معروف ممكن يبقى خطر (القارئ اللي في المتصفح أأمن من البرامج القديمة).

أدوات (poppler-utils على لينكس: [[sudo apt install poppler-utils]]):
• [[pdfinfo file.pdf]]: الصفحات والمقاس والـ metadata.
• [[pdftotext file.pdf -]]: النص.
• [[pdftoppm -png file.pdf page]]: كل صفحة صورة.
• [[qpdf]]: يقسم ويدمج ويفك الحماية.
• تعمل PDF: من المتصفح (Print ثم Save as PDF)، أو [[soffice --headless --convert-to pdf file.docx]]، أو من الكود (Puppeteer أو Playwright بيحوّلوا صفحة HTML لـ PDF، ودي أحسن طريقة للفواتير بالعربي).`,
          example: R`file report.pdf
head -c 8 report.pdf
pdfinfo report.pdf
pdftotext report.pdf - | head -3
soffice --headless --convert-to pdf report.txt`,
          try: R`اعمل [[report.txt]] فيه سطرين عربي وحوّله PDF بـ LibreOffice (آخر أمر في المثال، أو من Word ثم Save as PDF). نفّذ باقي المثال عليه واقرا [[Creator]] و [[Producer]]. قارن النص اللي [[pdftotext]] طلّعه بالأصلي. وجرّب على أي فاتورة أو CV عندك [[pdfinfo]] وشوف [[Author]] مكتوب فيه إيه.`,
          deep: {
            why: R`قبل PDF، المستند كان بيتعرض مختلف على كل جهاز على حسب الخطوط والبرامج. Adobe عملته سنة 1993 كـ «ورقة رقمية»، وبقى معيار ISO، فبقى الصيغة الرسمية لأي حاجة لازم شكلها ميتغيرش.`,
            how: R`القارئ بيقرا [[xref]] من آخر الملف عشان يعرف أماكن الـ objects، وبعدين لكل صفحة بيفك الـ stream المضغوط ويمشي على أوامر زي «اختار الخط F1 بحجم 12، روح للنقطة (72, 700)، ارسم الـ glyphs دي». مفيش حاجة اسمها «فقرة» أو «سطر» في الملف، عشان كده [[pdftotext]] بيخمّن.`,
            when: R`فواتير وتقارير وعقود و CV بتتبعت. وفي الكود: توليد فواتير (HTML ثم PDF بـ Playwright)، وقراية PDFs اليوزرز (مكتبات زي pdf.js و pdfplumber، أو OCR لو PDF صور).`,
            mistakes: R`تبعت PDF فيه [[Author]] اسمك الحقيقي أو اسم الشركة القديمة. تعتمد على [[pdftotext]] في استخراج داتا عربي مهمة من غير مراجعة. تعمل «تشويش» على معلومة بمستطيل أسود فوقها والنص لسه تحته (redaction غلط، والنص بيتنسخ عادي). وتفتح مرفقات PDF من مصادر مش معروفة في برامج قديمة.`
          },
          teach: R`## المثال: نفتش PDF من بره ومن جوه

الأوامر بتعرف الملف من بصمته، وتقرا الـ metadata، وتطلّع النص، وآخر سطر بيعمل PDF من ملف نصي بـ LibreOffice. LibreOffice تقيل (مئات الميجا) فمسطّبناهوش في التجربة: عملنا [[report.pdf]] بسطرين عربي («تقرير الحجوزات» و «عدد الأعضاء: 42») بمكتبة PyMuPDF في Python على ويندوز، وحطينا فيه [[Author]] و [[Creator]]. والباقي اتشغّل في [[docker run --rm ubuntu:24.04]] بعد [[apt install poppler-utils]] (poppler 24.02، وفيه [[pdfinfo]] و [[pdftotext]]).

---

## ١. [[file report.pdf]]

~~~text الناتج
report.pdf: PDF document, version 1.7, 1 page(s)
~~~

[[version 1.7]] نسخة صيغة PDF اللي الملف مكتوب بيها (1.7 هي اللي بقت معيار ISO 32000-1)، و [[1 page(s)]] عدد الصفحات.

## ٢. [[head -c 8 report.pdf]]

[[head -c 8]] = أول ٨ **bytes** (مش سطور):

~~~text الناتج
%PDF-1.7
~~~

البصمة نص عادي: [[%PDF-]] والنسخة. وآخر الملف ([[tail -c 6 | xxd]]) هو [[%%EOF]] وسطر جديد. أي PDF مقطوع في التنزيل هيبقى ناقصه السطر ده، وبرامج كتير بتشتكي.

---

## ٣. [[pdfinfo report.pdf]]

~~~text الناتج (أهم السطور)
Title:           Report
Author:          Ali
Creator:         Writer
JavaScript:      no
Pages:           1
Encrypted:       no
Page size:       595 x 842 pts (A4)
File size:       121209 bytes
PDF version:     1.7
~~~

| السطر | معناه |
|---|---|
| [[Title]] و [[Author]] | اللي اتكتب في الـ metadata. [[Author]] هنا [[Ali]] لأننا كتبناه، و Word و LibreOffice بيحطوا اسم اليوزر على الجهاز لوحدهم |
| [[Creator]] | البرنامج اللي عمل المستند الأصلي. و [[Producer]] (لو موجود) اللي حوّله PDF |
| [[JavaScript]] | فيه كود JavaScript؟ لو [[yes]] في ملف جالك من حد مش معروف، خلي بالك |
| [[Encrypted]] | محمي بباسورد أو بقيود (طباعة أو نسخ) |
| [[Page size: 595 x 842 pts (A4)]] | المقاس بالـ points: النقطة 1/72 بوصة، فـ 595×842 = 21×29.7 سم = A4 |
| [[File size]] | ١٢١ كيلو لسطرين، لأن الخطوط **مدموجة جوه الملف** عشان يتعرض صح في أي حتة |

وعشان نتأكد من آخر نقطة، [[pdffonts report.pdf]] بيعرض الخطوط اللي جوه:

~~~text الناتج
name                       type              encoding    emb sub uni
Noto Naskh Arabic Regular  CID Type 0C (OT)  Identity-H  yes no  yes
Nimbus Sans Regular        CID Type 0C       Identity-H  yes no  yes
~~~

[[emb yes]] = embedded (مدموج). خط للعربي وخط للأرقام والرموز.

---

## ٤. [[pdftotext report.pdf - | head -3]]

- [[pdftotext]]: طلّع النص.
- [[-]] مكان اسم ملف الناتج: اطبعه على الشاشة (stdout) بدل ما تكتبه في [[report.txt]].

~~~text الناتج
‫ﺗﻘﺮﻳﺮ ﺍ ﺤﺠﻮﺯﺍﺕ‬
‫ﻋﺪﺩ ﺍ ﻋﻀﺎﺀ‪42 :‬‬
~~~

شكله قريب، بس فيه ٣ مشاكل. بصّينا على الـ bytes بـ [[od -c]] عشان نعرف:

1. **«الـ» اختفت**: [[ال]] في «الحجوزات» و «الأعضاء» طلعت [[ا]] ومسافة. الخط بيرسم «لـ» و «لأ» كشكل واحد مدموج (ligature)، والشكل ده ملوش حرف Unicode يرجع له، فاتشال.
2. **الحروف مش هي الحروف العادية**: الـ bytes [[ef ba ..]] و [[ef bb ..]] دي Arabic Presentation Forms، يعني «التاء في أول الكلمة» و «الراء في آخرها» كحروف منفصلة، مش [[ت]] و [[ر]] العاديين. شكلها صح على الشاشة، بس البحث عن كلمة «تقرير» في النص ده مش هيلاقيها.
3. **حروف اتجاه مخفية**: [[e2 80 ab]] (RLE = ابدأ من اليمين) و [[e2 80 ac]] (PDF = خلّص الاتجاه) حوالين كل سطر، والرقم اتعكس مكانه ([[42 :]]).

وده بالظبط معنى «PDF أوامر رسم مش نص»: الملف بيقول «ارسم الشكل رقم كذا هنا»، و [[pdftotext]] بيحاول يرجّع النص من الأشكال. PyMuPDF نفسه وهو بيقرا نفس الملف طلّع نفس النوع من الحروف المنفصلة. (و LibreOffice في «الحل» طلّع «األعضاء»، مشكلة مختلفة بنفس السبب.)

---

## ٥. [[soffice --headless --convert-to pdf report.txt]]

- [[soffice]]: LibreOffice من الترمنال.
- [[--headless]]: من غير واجهة (لازم على سيرفر).
- [[--convert-to pdf]]: حوّل للصيغة دي، والناتج [[report.pdf]] جنب الأصلي.

مشغّلناهوش هنا (السبب فوق)؛ الأمر من docs بتاعة LibreOffice، والناتج اللي في «الحل» من تشغيل حقيقي سابق.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| ده PDF؟ نسخته؟ | [[file]] أو [[head -c 8]] |
| مين عمله وإمتى، وفيه JavaScript؟ | [[pdfinfo]] |
| الخطوط مدموجة؟ | [[pdffonts]] |
| النص | [[pdftotext file.pdf -]]، وراجعه بعينك لو عربي |
| أعمل PDF | Print ثم Save as PDF، أو [[soffice --headless --convert-to pdf]]، أو Playwright من HTML |`,
          lines: [
            R`[[file]] بيقول PDF ونسخته وعدد الصفحات.`,
            R`أول ٨ حروف: [[%PDF-1.7]].`,
            R`الـ metadata والمقاس وعدد الصفحات.`,
            R`[[-]] يعني اطبع النص على الشاشة بدل ملف.`,
            R`LibreOffice من غير واجهة يحوّل أي مستند لـ PDF.`
          ],
          sol: R`الناتج الحقيقي على PDF عمله LibreOffice من ملف نصي فيه «تقرير الحجوزات» و «عدد الأعضاء: 42»:
[[report.pdf:  PDF document, version 1.7, 1 page(s) (zip deflate encoded)]]
[[%PDF-1.7]]
و [[pdfinfo]] فيه:
[[Creator:         Writer]]
[[Producer:        LibreOffice 24.2]]
[[CreationDate:    Thu Oct  1 17:14:55 2026 EEST]]
[[Pages:           1]]
و [[pdftotext]] طلّع:
[[تقرير الحجوزات]]
[[عدد األعضاء: 42]] (لاحظ «األعضاء» بدل «الأعضاء»: الحرفين المتصلين «لأ» طلعوا «أل» بالترتيب المقلوب، وفيه كمان حروف اتجاه مخفية حوالين السطور).`
        },
        {
          cmd: ".docx و .xlsx",
          title: "ليه .docx و .xlsx في الحقيقة ملفات zip، وتقرا الداتا منهم من غير Office إزاي؟",
          desc: R`صيغ Office الحديثة (من 2007) اسمها Office Open XML: الملف zip فيه ملفات XML (درس [[.xml]]) وصور. الـ [[x]] في آخر الامتداد معناها XML:
• [[.docx]] (Word): النص في [[word/document.xml]]، والتنسيقات في [[word/styles.xml]]، والصور في [[word/media/]].
• [[.xlsx]] (Excel): كل شيت في [[xl/worksheets/sheet1.xml]]، والنصوص كلها مرة واحدة في [[xl/sharedStrings.xml]] (والخلية بتشاور على رقم النص)، والأرقام جوه الخلية نفسها.
• [[.pptx]] (PowerPoint): كل slide في [[ppt/slides/slide1.xml]].
• وفي الكل: [[[Content_Types].xml]] (نوع كل جزء)، و [[docProps/core.xml]] (المؤلف وآخر واحد عدّل والتواريخ)، و [[_rels/]] (العلاقات بين الأجزاء).

التاجات فيها namespaces (درس xmlns): في Word [[<w:p>]] فقرة، و [[<w:r>]] حتة نص بنفس التنسيق (run)، و [[<w:t>]] النص نفسه. وفي Excel [[<c r="B2" t="n"><v>12</v></c>]] خلية B2 رقم قيمتها 12، و [[t="s"]] يعني النص في sharedStrings.

والقديم: [[.doc]] و [[.xls]] و [[.ppt]] (قبل 2007) صيغ binary مقفولة، صعب تتقري من غير مكتبة.

[[.xlsm]] و [[.docm]]: نفس الصيغة بس فيها macros (كود VBA بيتشغّل)، وده أشهر طريقة لنشر الفيروسات في الشركات. Office بيقفل الـ macros في الملفات اللي نازلة من النت.

عمليًا في الكود متفكش الـ XML بإيدك، استخدم مكتبة: [[openpyxl]] و [[pandas.read_excel]] و [[python-docx]] في Python، و [[exceljs]] و [[SheetJS]] في JS، و Apache POI في Java. بس فهمك إنه zip و XML بيفيدك: تطلّع كل الصور من مستند ([[unzip -j file.docx "word/media/*"]])، أو تعرف ليه ملف بايظ، أو تمسح المؤلف من [[core.xml]].`,
          example: R`file report.docx visits.xlsx
unzip -l report.docx
unzip -p report.docx word/document.xml | grep -o '<w:t[^>]*>[^<]*</w:t>'
unzip -p visits.xlsx xl/sharedStrings.xml | grep -o '<t[^>]*>[^<]*</t>'
unzip -p report.docx docProps/core.xml`,
          try: R`اعمل مستند Word فيه سطرين ([[report.docx]]) وشيت Excel فيه عمودين وكام صف ([[visits.xlsx]]) (أو بـ LibreOffice: [[soffice --headless --convert-to docx report.txt]]). نفّذ المثال. غيّر امتداد نسخة من الـ docx لـ [[.zip]] وافتحها بدبل كليك. وفي ملف Word من الشغل شوف [[docProps/core.xml]] فيه اسم مين.`,
          deep: {
            why: R`صيغ Office القديمة كانت binary مقفولة ومحدش بره Microsoft يعرف يقراها كويس. تحت ضغط الحكومات والمعايير المفتوحة، Microsoft عملت صيغة مبنية على zip و XML (اتعملت معيار ISO)، فأي برنامج يقدر يقراها ويكتبها. و LibreOffice عنده نفس الفكرة: [[.odt]] و [[.ods]] (OpenDocument).`,
            how: R`Word وهو بيفتح الملف بيفك الـ zip في الذاكرة، ويقرا [[[Content_Types].xml]] و [[_rels/.rels]] عشان يعرف المستند الأساسي فين، وبعدين يقرا [[document.xml]] فقرة فقرة. وكل ما تغيّر التنسيق في نص الجملة، Word بيقسم النص [[<w:r>]] جديد، عشان كده النص ممكن يطلع متقطع في أكتر من [[<w:t>]].`,
            when: R`استيراد داتا من Excel العميل، أو توليد تقارير Excel أو Word من الكود، أو استخراج الصور من مستند، أو فحص ملف مشبوه.`,
            mistakes: R`تتعامل مع [[.xlsx]] كأنه CSV ([[cat]] أو [[split(",")]]). تبعت مستند فيه tracked changes أو تعليقات قديمة أو اسم المؤلف. تفتح [[.xlsm]] أو [[.docm]] من إيميل وتدوس «Enable Content». وتغيّر امتداد [[.csv]] لـ [[.xlsx]] وتفتكر إنه بقى Excel.`
          },
          teach: R`## المثال: نقرا Word و Excel بـ unzip و grep

الفكرة كلها: [[.docx]] و [[.xlsx]] ملفات zip، جواها XML، فـ [[unzip]] يطلّع الملف و [[grep]] يطلّع النص. عشان نجرّب من غير Office، عملنا الملفين بمكتبتين Python: [[python-docx]] 1.2 (مستند فيه «تقرير الحجوزات» و «عدد الأعضاء: 42»، والـ 42 bold، والمؤلف [[Ali]]) و [[openpyxl]] 3.1.5 (شيت فيه [[name]] و [[visits]] وصفين: سارة 12 وعلي 7). كله اتشغّل في [[docker run --rm python:3.13-slim]] بعد ما سطّبنا [[file]] و [[unzip]] والمكتبتين.

---

## ١. [[file report.docx visits.xlsx]]

~~~text الناتج
report.docx: Microsoft Word 2007+
visits.xlsx: Microsoft Excel 2007+
~~~

الاتنين بيبدأوا بـ [[PK]] زي أي zip، بس [[file]] بيبص على أسامي الملفات جوه ([[word/]] أو [[xl/]]) ويعرف. و [[2007+]] لأن الصيغة دي بدأت مع Office 2007.

---

## ٢. [[unzip -l report.docx]]

~~~text الناتج (مختصر)
     1738  [Content_Types].xml
      734  _rels/.rels
      713  docProps/core.xml
     1752  word/document.xml
   349458  word/styles.xml
     2811  word/fontTable.xml
    10939  word/theme/theme1.xml
     8324  docProps/thumbnail.jpeg
   826356                     17 files
~~~

| الملف | فيه إيه |
|---|---|
| [[[Content_Types].xml]] | نوع كل جزء في الـ zip (ده document، وده styles...) |
| [[_rels/.rels]] | «خريطة»: المستند الأساسي فين، والـ metadata فين |
| [[docProps/core.xml]] | المؤلف والتواريخ |
| [[word/document.xml]] | **النص نفسه**، ١٧٥٢ byte بس |
| [[word/styles.xml]] | التنسيقات (Heading 1 و Normal...)، وهنا أكبر ملف |

لاحظ إن النص أصغر حاجة، والـ ٨٢٦ كيلو كلهم تنسيقات وقالب. الـ docx نفسه ٣٦ كيلو بعد الضغط. (ملف LibreOffice في «الحل» كان ١٠ ملفات بس: كل برنامج بيحط أجزاء مختلفة، بس [[document.xml]] و [[[Content_Types].xml]] موجودين دايمًا.)

---

## ٣. [[unzip -p report.docx word/document.xml | grep -o '<w:t[^>]*>[^<]*</w:t>']]

نفكه من جوه لبرة:

- [[unzip -p report.docx word/document.xml]]: [[-p]] = pipe: فك الملف ده بس واطبعه على الـ stdout. الـ XML كله سطر واحد طويل.
- [[| grep -o '...']]: [[-o]] = only matching: اطبع الحتة اللي طابقت بس، مش السطر كله (لأن السطر هو الملف كله).
- الـ regex:

| الحتة | معناها |
|---|---|
| [[<w:t]] | بداية تاج النص |
| [[[^>]*]] | أي حروف غير [[>]]، أي عدد. ده عشان التاج ممكن يبقى فيه attributes زي [[xml:space="preserve"]] |
| [[>]] | قفلة التاج |
| [[[^<]*]] | النص نفسه: أي حروف لحد أول [[<]] |
| [[</w:t>]] | قفلة النص |

والتنصيص الفردي [[' ']] عشان الـ shell ميلمسش [[<]] و [[>]] و [[*]] (من غيره [[<]] و [[>]] هيتفهموا redirect).

~~~text الناتج
<w:t>تقرير الحجوزات</w:t>
<w:t>عدد الأعضاء</w:t>
<w:t xml:space="preserve">: </w:t>
<w:t>42</w:t>
~~~

ليه السطر التاني اتقسم ٣ حتت؟ ده شكله في [[document.xml]]:

~~~text
<w:p>
  <w:r><w:t>عدد الأعضاء</w:t></w:r>
  <w:r><w:t xml:space="preserve">: </w:t></w:r>
  <w:r><w:rPr><w:b/></w:rPr><w:t>42</w:t></w:r>
</w:p>
~~~

- [[w:p]] = paragraph (فقرة)، و [[w:]] الـ namespace بتاع Word.
- [[w:r]] = run: حتة نص كلها بنفس التنسيق. الـ 42 bold ([[<w:rPr><w:b/>]]: run properties، و [[b]] = bold)، فلازم run لوحدها.
- [[xml:space="preserve"]]: احتفظ بالمسافات اللي في الأول والآخر. من غيرها [[: ]] كانت هتبقى [[:]].

فعشان تجمع النص الحقيقي، بتلزق كل الـ [[w:t]] اللي جوه نفس الـ [[w:p]].

---

## ٤. [[unzip -p visits.xlsx xl/sharedStrings.xml | grep -o '<t[^>]*>[^<]*</t>']]

نفس الفكرة لـ Excel: Excel و LibreOffice بيحطوا كل النصوص مرة واحدة في [[sharedStrings.xml]]، والخلية بتشاور على رقم النص (وده اللي في «الحل»: ملف LibreOffice). بس على ملف openpyxl:

~~~text الناتج
caution: filename not matched:  xl/sharedStrings.xml
~~~

الملف ده مش موجود أصلًا! [[unzip -l]] طلّع ٩ ملفات مفيهمش [[sharedStrings.xml]]. openpyxl بيكتب النص **جوه الخلية نفسها** في [[sheet1.xml]]:

~~~text xl/worksheets/sheet1.xml
<row r="2">
  <c r="A2" t="inlineStr"><is><t>سارة</t></is></c>
  <c r="B2" t="n"><v>12</v></c>
</row>
~~~

| الحتة | معناها |
|---|---|
| [[<row r="2">]] | الصف رقم 2 |
| [[<c r="A2">]] | cell: الخلية A2 |
| [[t="inlineStr"]] | النوع: نص مكتوب جوه الخلية ([[<is><t>]] = inline string) |
| [[t="s"]] | (في ملفات Excel) النص في sharedStrings، و [[<v>0</v>]] رقمه هناك |
| [[t="n"]] و [[<v>12</v>]] | رقم، وقيمته 12 |

يعني الصيغة بتسمح بالطريقتين، وكل برنامج بيختار. ده بالظبط سبب إنك في الكود تستخدم مكتبة ([[openpyxl]] و [[pandas.read_excel]] و [[exceljs]]) بدل [[grep]]: المكتبة بتفهم الاتنين.

---

## ٥. [[unzip -p report.docx docProps/core.xml]]

~~~text الناتج (السطور المهمة)
<dc:creator>Ali</dc:creator>
<dcterms:created xsi:type="dcterms:W3CDTF">2013-12-23T23:15:00Z</dcterms:created>
~~~

- [[dc:creator]]: المؤلف. [[dc]] = Dublin Core، معيار معروف لأسامي الـ metadata.
- [[dcterms:created]]: تاريخ الإنشاء. لاحظ إنه 2013 مش النهارده: python-docx بيبدأ من قالب جاهز اتعمل سنة 2013، ومغيّرش التاريخ. يعني الـ metadata ممكن تكدب كمان، مش بس تفضح.

وفي ملف Word حقيقي من شغلك هتلاقي هنا اسمك واسم آخر واحد عدّل ([[cp:lastModifiedBy]]).

---

## الخلاصة

| عايز | الأمر |
|---|---|
| ده Word ولا Excel؟ | [[file]] |
| جواه إيه؟ | [[unzip -l]] |
| نص Word | [[unzip -p file.docx word/document.xml]] وبعدين [[<w:t>]] |
| نص Excel | [[xl/sharedStrings.xml]] (Excel و LibreOffice) أو [[inlineStr]] جوه [[sheet1.xml]] |
| المؤلف | [[docProps/core.xml]] |
| في الكود | مكتبة، مش grep |`,
          lines: [
            R`[[file]] بيعرفهم Word و Excel (بيبص جوه الـ zip).`,
            R`جوه الـ docx: XML كله.`,
            R`[[-p]] اطبع ملف من جوه الـ zip، و [[grep -o]] يطلّع حتت النص بس.`,
            R`النصوص بتاعة Excel كلها في ملف واحد.`,
            R`المؤلف والتواريخ ([[dc:creator]] و [[cp:lastModifiedBy]]).`
          ],
          sol: R`الناتج الحقيقي (ملفات عملها LibreOffice):
[[report.docx: Microsoft Word 2007+]]
[[visits.xlsx: Microsoft Excel 2007+]]
[[unzip -l]] فيه [[_rels/.rels]] و [[docProps/core.xml]] و [[docProps/app.xml]] و [[word/document.xml]] و [[word/styles.xml]] و [[word/fontTable.xml]] و [[word/settings.xml]] و [[word/theme/theme1.xml]] و [[[Content_Types].xml]]: [[10 files]].
النص:
[[<w:t>تقرير الحجوزات</w:t>]]
[[<w:t>عدد الأعضاء</w:t>]]
[[<w:t xml:space="preserve">: </w:t>]]
[[<w:t>42</w:t>]]
(السطر التاني اتقسم ٣ حتت.) وفي Excel: [[name]] و [[visits]] و [[سارة]] و [[علي]]، والأرقام 12 و 7 في [[sheet1.xml]] نفسه: [[<c r="B2" s="0" t="n"><v>12</v></c>]].
و [[core.xml]] فيه [[<dc:creator>]] (فاضي هنا، وفي Word هتلاقي اسمك) و [[<dc:language>ar-EG</dc:language>]].`
        },
        {
          cmd: ".db و .sqlite",
          title: "قاعدة بيانات كاملة في ملف واحد (.db و .sqlite): تفتحها وتقراها إزاي، وإيه ملفات -wal و -shm؟",
          desc: R`SQLite قاعدة بيانات SQL كاملة (جداول وعلاقات و transactions) بس من غير سيرفر: القاعدة كلها ملف واحد على الهارد، والمكتبة جوه برنامجك بتقرا وتكتب فيه مباشرة. الامتدادات: [[.db]] و [[.sqlite]] و [[.sqlite3]] و [[.db3]] (كلها نفس الصيغة، والاسم اختياري تمامًا).

هي أكتر قاعدة بيانات مستخدمة في العالم: في كل موبايل Android و iPhone (كل تطبيق تقريبًا)، وفي Chrome و Firefox (التاريخ والكوكيز)، وفي VS Code، وفي تطبيقات Desktop كتير، وفي مشاريع صغيرة ومتوسطة على السيرفر، و Prisma و Django بيستخدموها للتجربة ([[dev.db]] و [[db.sqlite3]]).

الملف بيبدأ بـ [[SQLite format 3]] وبعدها byte صفر، فـ [[file]] بيعرفه علطول.

ملفات جنبه:
• [[gym.db-wal]] و [[gym.db-shm]]: لما القاعدة في وضع WAL (Write-Ahead Log)، الكتابات الجديدة بتروح الأول في [[-wal]] وبعدين تتدمج. لو نسخت [[gym.db]] لوحده والبرنامج شغال، ممكن تاخد نسخة ناقصة.
• [[gym.db-journal]]: في الوضع القديم، ملف مؤقت وقت الـ transaction.
عشان كده متنسخش ملف قاعدة شغالة بـ [[cp]]: استخدم [[.backup]] من الـ CLI، أو [[VACUUM INTO 'backup.db']].

بتفتحها إزاي:
• الـ CLI: [[sqlite3 gym.db]] (حزمة [[sqlite3]])، وجواه [[.tables]] و [[.schema]] و [[.dump]] و [[.quit]]. أو [[python3 -m sqlite3 gym.db "SELECT ..."]] (Python 3.12+ من غير تسطيب).
• برامج: DB Browser for SQLite، و DBeaver، وإضافات VS Code.
• من الكود: [[sqlite3]] في Python جاهز، و [[better-sqlite3]] و [[node:sqlite]] في Node.

متى تستخدمها ومتى لأ: ممتازة لتطبيق واحد بيكتب فيها (موبايل، desktop، موقع صغير). مش مناسبة لو سيرفرات كتير هتكتب في نفس الوقت (ده شغل PostgreSQL أو MySQL، اللي القاعدة فيها مش ملف بتتعامل معاه، فولدر كامل بيديره السيرفر).

وفي Git: الـ [[.db]] binary وبيتغير كله مع أي تعديل، فحطه في [[.gitignore]]، واعمل commit للـ migrations أو [[.dump]] بدله.`,
          example: R`file gym.db
xxd -l 16 gym.db
ls gym.db*
python3 -m sqlite3 gym.db "SELECT name, visits FROM members ORDER BY visits DESC"
sqlite3 gym.db .dump`,
          try: R`اعمل القاعدة بـ Python:
[[python3 -c 'import sqlite3; c = sqlite3.connect("gym.db"); c.execute("PRAGMA journal_mode=WAL"); c.execute("CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0)"); c.executemany("INSERT INTO members (name, visits) VALUES (?, ?)", [("سارة", 12), ("علي", 7)]); c.commit(); print(sorted(__import__("os").listdir(".")))']]
لاحظ الملفات وهي مفتوحة. بعدين نفّذ المثال (لو [[sqlite3]] مش متسطّب، الـ dump بـ Python: [[python3 -c 'import sqlite3; [print(l) for l in sqlite3.connect("gym.db").iterdump()]']]). وافتح الملف في DB Browser for SQLite.`,
          deep: {
            why: R`أغلب البرامج محتاجة تخزن داتا منظمة وتعمل عليها استعلامات، بس مش محتاجة سيرفر قاعدة بيانات بإعداداته وباسورداته. SQLite بيدّي SQL كامل في ملف، بمكتبة صغيرة، وموثوق جدًا (بيستخدم في الطيارات).`,
            how: R`الملف مقسوم صفحات (pages) بحجم ثابت (غالبًا 4096 byte)، والجداول والفهارس متخزنة كـ B-trees جوه الصفحات. وفي وضع WAL، الكتابة بتتضاف في آخر [[-wal]] (سريع ومش بيقفل القراية)، وكل فترة بيحصل checkpoint يدمجها في الملف الأصلي. ولما آخر اتصال يتقفل صح، [[-wal]] و [[-shm]] بيتمسحوا.`,
            when: R`تطبيقات الموبايل و Desktop، والمشاريع الصغيرة، والتجربة المحلية، والكاش، وأدوات command line. وكمان تحليل داتا: تحط CSV في SQLite وتعمل عليه SQL.`,
            mistakes: R`تعمل commit لـ [[dev.db]] فيه داتا حقيقية. تنسخ القاعدة بـ [[cp]] والبرنامج شغال وتنسى [[-wal]]. تستخدمها على سيرفرات كتير بتكتب في نفس الوقت أو على فولدر شبكة (NFS) فتتبوظ أو تطلّع [[database is locked]]. وتفتح [[.db]] في محرر نصوص وتحفظه.`
          },
          teach: R`## المثال: قاعدة بيانات كاملة، وهي ملف

هنعمل القاعدة الأول بسطر Python اللي في «جرّب»، وبعدين المثال يتأكد إنها SQLite، ويقرا أول bytes فيها، ويشوف الملفات اللي جنبها، ويعمل استعلام، ويطلّعها كأوامر SQL. اتشغّل على ويندوز: Python 3.14 (فيه SQLite 3.50.4)، و [[file]] و [[xxd]] من Git Bash.

---

## ١. نعمل القاعدة

السطر الطويل اللي في «جرّب» هو كذا أمر Python مفصولين بـ [[;]]. مفرودين:

~~~text
import sqlite3
c = sqlite3.connect("gym.db")
c.execute("PRAGMA journal_mode=WAL")
c.execute("CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0)")
c.executemany("INSERT INTO members (name, visits) VALUES (?, ?)", [("سارة", 12), ("علي", 7)])
c.commit()
print(sorted(os.listdir(".")))
~~~

| السطر | بيعمل إيه |
|---|---|
| [[import sqlite3]] | مكتبة SQLite اللي جاية مع Python، من غير تسطيب |
| [[sqlite3.connect("gym.db")]] | افتح الملف، ولو مش موجود اعمله. [[c]] هو الاتصال (connection) |
| [[PRAGMA journal_mode=WAL]] | [[PRAGMA]] أمر إعدادات خاص بـ SQLite. هنا بنقوله استخدم وضع WAL (هنشرحه تحت). ورجّع [[('wal',)]] |
| [[CREATE TABLE members (...)]] | جدول: [[id]] رقم بيزيد لوحده ([[INTEGER PRIMARY KEY]])، و [[name]] نص إجباري ([[NOT NULL]])، و [[visits]] رقم افتراضيه صفر |
| [[executemany(..., [...])]] | نفّذ نفس الـ INSERT لكل عنصر في الليستة. الـ [[?]] أماكن القيم، والمكتبة بتحطها بأمان (من غير SQL injection) |
| [[c.commit()]] | ثبّت التغييرات. من غيره، الـ INSERT بيضيع لما البرنامج يقفل |
| [[print(sorted(os.listdir(".")))]] | اطبع أسامي الملفات في الفولدر مترتبة. (في «جرّب» مكتوبة [[__import__("os")]]، وهي طريقة تعمل import جوه سطر واحد) |

والناتج والاتصال لسه مفتوح:

~~~text الناتج
['gym.db', 'gym.db-shm', 'gym.db-wal']
~~~

٣ ملفات! ده شرح الأمر التالت تحت.

---

## ٢. [[file gym.db]]

~~~text الناتج
gym.db: SQLite 3.x database, last written using SQLite version 3050004, writer version 2, read version 2, file counter 2, database pages 2, cookie 0x1, schema 4, UTF-8, version-valid-for 2
~~~

كل ده [[file]] قراه من الـ header (أول ١٠٠ byte في الملف):

| الكلمة | معناها |
|---|---|
| [[SQLite version 3050004]] | آخر اللي كتب فيه SQLite نسخة 3.50.4 (مكتوبة رقم واحد: 3 و 050 و 004) |
| [[writer version 2]] و [[read version 2]] | الرقم 2 = وضع WAL. (1 = الوضع القديم بالـ journal) |
| [[file counter 2]] | عدّاد بيزيد مع كل تعديل |
| [[database pages 2]] | الملف صفحتين |
| [[UTF-8]] | النصوص متخزنة UTF-8، فالعربي سليم |

والصفحة حجمها 4096 byte ([[PRAGMA page_size]] قال كده)، فصفحتين = 8192، وده بالظبط حجم [[gym.db]] اللي [[ls -l]] طلّعه. صفحة لجدول النظام اللي فيه شكل الجداول، وصفحة لجدول [[members]].

---

## ٣. [[xxd -l 16 gym.db]]

~~~text الناتج
00000000: 5351 4c69 7465 2066 6f72 6d61 7420 3300  SQLite format 3.
~~~

أول ١٦ byte: النص [[SQLite format 3]] وبعده byte صفر ([[00]]، والنقطة في الآخر). دي البصمة اللي [[file]] بيعرف بيها الملف، مهما كان امتداده [[.db]] أو [[.sqlite]] أو مفيش امتداد.

---

## ٤. [[ls gym.db*]] والملفات اللي جنبه

[[*]] = أي حاجة بعد [[gym.db]]. وهو مفتوح طلّع ٣ ملفات، وبعد ما Python قفل الاتصال طلّع [[gym.db]] بس.

| الملف | دوره |
|---|---|
| [[gym.db]] | القاعدة نفسها |
| [[gym.db-wal]] | **W**rite-**A**head **L**og: أي كتابة جديدة بتتضاف هنا الأول، وبعدين تتنقل للملف الأصلي (checkpoint) |
| [[gym.db-shm]] | **sh**ared **m**emory: فهرس صغير للـ wal عشان كذا برنامج يقروا في نفس الوقت |

ليه WAL؟ القراية والكتابة ميقفلوش بعض: اللي بيقرا بيقرا من [[gym.db]]، والكتابة بتروح في [[-wal]]. والمهم: لما القاعدة مفتوحة، آخر التغييرات ممكن تكون في [[-wal]] لسه. لو نسخت [[gym.db]] لوحده ساعتها، النسخة ناقصة. وعشان كده [[.backup]] أو [[VACUUM INTO]].

---

## ٥. [[python3 -m sqlite3 gym.db "SELECT ..."]]

- [[python3 -m sqlite3]]: [[-m]] = شغّل module كبرنامج. Python 3.12 وأحدث فيه CLI صغير لـ SQLite، فمش محتاج تسطّب [[sqlite3]].
- بعده اسم الملف، وبعده الاستعلام.
- [[ORDER BY visits DESC]]: رتّب بالزيارات من الأكبر ([[DESC]] = descending).

~~~text الناتج
('سارة', 12)
('علي', 7)
~~~

كل صف بيطلع tuple بتاع Python. (على ويندوز لو العربي طلع علامات استفهام، شغّله بـ [[PYTHONIOENCODING=utf-8]] أو في Windows Terminal.)

---

## ٦. [[sqlite3 gym.db .dump]]

الأوامر اللي بتبدأ بنقطة في الـ CLI ([[.dump]] و [[.tables]] و [[.schema]]) مش SQL، دي أوامر للأداة نفسها. و [[.dump]] بيطبع القاعدة كلها كأوامر SQL لو نفذتها على قاعدة فاضية ترجع زي ما هي. الـ [[sqlite3]] CLI مش متسطّب على ويندوز اللي جربنا عليه، فنقلنا نفس [[gym.db]] لـ [[docker run --rm ubuntu:24.04]] وسطّبنا حزمة [[sqlite3]] (نسخة 3.45.1):

~~~text الناتج
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0);
INSERT INTO members VALUES(1,'سارة',12);
INSERT INTO members VALUES(2,'علي',7);
COMMIT;
~~~

[[PRAGMA foreign_keys=OFF]] في الأول عشان لما ترجّع الـ dump، الجداول تتعمل بأي ترتيب من غير ما الـ foreign keys تعترض. و [[sqlite3 gym.db .tables]] طلّع [[members]]. والبديل من غير تسطيب (اللي في «جرّب»): [[iterdump()]] في Python على ويندوز، وطلّع نفس الأوامر من غير سطر الـ PRAGMA، وبالاسم بين تنصيص ([[INSERT INTO "members"]]):

~~~text الناتج
BEGIN TRANSACTION;
CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0);
INSERT INTO "members" VALUES(1,'سارة',12);
INSERT INTO "members" VALUES(2,'علي',7);
COMMIT;
~~~

[[BEGIN TRANSACTION]] و [[COMMIT]] حوالين الكل: يا كله يتنفذ يا ولا حاجة. ولاحظ [[id]] اتملى لوحده 1 و 2. ده الـ backup النصي اللي ينفع تعمله commit في Git بدل الـ [[.db]].

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| ده SQLite؟ | [[file gym.db]] أو أول ١٦ byte = [[SQLite format 3]] |
| فيه إيه؟ | [[python3 -m sqlite3 gym.db "SELECT ..."]] أو [[sqlite3 gym.db]] |
| backup نصي | [[.dump]] أو [[iterdump()]] |
| backup ملف والقاعدة شغالة | [[.backup]] أو [[VACUUM INTO 'backup.db']]، مش [[cp]] |
| [[-wal]] و [[-shm]] | جزء من القاعدة طول ما هي مفتوحة. متمسحهمش |`,
          lines: [
            R`[[file]] بيعرفه SQLite ويقرا معلومات من الـ header.`,
            R`أول ١٦ byte: [[SQLite format 3]] وبعدها صفر.`,
            R`الملف وجنبه [[-wal]] و [[-shm]] لو القاعدة WAL ومفتوحة.`,
            R`استعلام من غير تسطيب أي حاجة (Python 3.12+).`,
            R`القاعدة كلها كأوامر SQL (backup نصي).`
          ],
          sol: R`الناتج الحقيقي:
[[gym.db: SQLite 3.x database, last written using SQLite version 3045001, writer version 2, read version 2, file counter 2, database pages 2, ...]]
[[00000000: 5351 4c69 7465 2066 6f72 6d61 7420 3300  SQLite format 3.]]
وأمر Python وهو شغال طبع [[['gym.db', 'gym.db-shm', 'gym.db-wal']]]، وبعد ما اتقفل [[ls gym.db*]] بيطبع [[gym.db]] بس.
[[('سارة', 12)]]
[[('علي', 7)]]
والـ dump (ده شكل [[iterdump()]] في Python، و [[sqlite3 gym.db .dump]] بيطلّع نفس الأوامر وقبلهم [[PRAGMA foreign_keys=OFF;]] ومن غير تنصيص حوالين [[members]]):
[[BEGIN TRANSACTION;]]
[[CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL, visits INTEGER DEFAULT 0);]]
[[INSERT INTO "members" VALUES(1,'سارة',12);]]
[[INSERT INTO "members" VALUES(2,'علي',7);]]
[[COMMIT;]]`
        }
      ]
    }
]);
