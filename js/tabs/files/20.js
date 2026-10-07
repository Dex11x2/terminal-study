// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "MIME و magic bytes: الملف بيقول على نفسه إيه",
      l: 3,
      n: "الويب مش بيعرف الامتداد: بيعرف Content-Type. والملف نفسه فيه بصمة في أوله بتقول هو إيه. وده بيوصّلنا لأهم درس أمان في التاب: الامتداد ممكن يكدب",
      items: [
        {
          cmd: "MIME type",
          title: "يعني إيه MIME type و Content-Type، وليه السيرفر لازم يبعته صح؟",
          desc: R`MIME type (أو media type) اسم معياري لنوع الملف، شكله [[type/subtype]]:
• [[text/html]] و [[text/css]] و [[text/javascript]] و [[text/plain]] و [[text/csv]].
• [[application/json]] و [[application/xml]] و [[application/pdf]] و [[application/zip]] و [[application/wasm]].
• [[image/png]] و [[image/jpeg]] و [[image/webp]] و [[image/avif]] و [[image/svg+xml]] و [[image/x-icon]].
• [[video/mp4]] و [[video/webm]] و [[audio/mpeg]] و [[font/woff2]].
• [[application/octet-stream]]: «bytes ومعرفش هي إيه». المتصفح بينزّلها كملف بدل ما يعرضها.
• [[multipart/form-data]]: فورم فيها ملفات مرفوعة.
• [[+]] يعني «مبني على»: [[image/svg+xml]] صورة بصيغة XML، و [[application/ld+json]].
• وممكن بعده [[; charset=utf-8]] للنصوص.

فين بتشوفه:
• في HTTP: كل رد من السيرفر فيه header [[Content-Type]] بيقول للمتصفح يعامل الـ bytes إزاي. المتصفح مبيبصش على الامتداد في الرابط خالص: نفس الرابط [[/api/users]] من غير امتداد بيرجع [[application/json]].
• في الطلب: لما تبعت JSON لـ API لازم [[Content-Type: application/json]]، وإلا Express مثلًا ([[express.json()]]) يتجاهل الـ body فيطلع [[req.body]] فاضي.
• [[Accept]] header: العميل بيقول بيقبل أنهي أنواع.
• في الإيميل (هو أصلًا اتعمل للإيميل، MIME = Multipurpose Internet Mail Extensions) و [[<input type="file" accept="image/*">]] و [[<source type="video/webm">]].

مين بيحدده؟ السيرفر، غالبًا من الامتداد: Nginx عنده ملف [[/etc/nginx/mime.types]]، و Express و [[python -m http.server]] عندهم جداول. ولو الامتداد مش في الجدول، Nginx بيبعت [[default_type]] (غالبًا [[application/octet-stream]]).

مشاكل مشهورة بسبب Content-Type غلط:
• [[Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html"]]: الملف مش موجود، والسيرفر (SPA بـ [[try_files ... /index.html]]) رجّع [[index.html]] بدله. أو [[.mjs]] مش متعرّف في Nginx.
• [[Refused to apply style ... because its MIME type ('text/html') is not a supported stylesheet MIME type]]: نفس الحكاية مع CSS.
• [[.wasm]] لازم [[application/wasm]]، و SVG لازم [[image/svg+xml]] وإلا مش هيتعرض كصورة.
• [[X-Content-Type-Options: nosniff]]: header بيقول للمتصفح «صدّق الـ Content-Type ومتخمّنش من المحتوى». مهم للأمان (عشان ملف رفعه يوزر ميتنفّذش كـ script).`,
          example: R`curl -sI http://localhost:8000/app.js | grep -i content-type
curl -sI http://localhost:8000/missing.js | grep -i -E "^HTTP|content-type"
curl -sI https://github.com | grep -i -E "content-type|nosniff"
file --mime-type -b logo.svg camera.webp add.wasm
python3 -c "import mimetypes; print(mimetypes.guess_type('a.webp'))"
grep -E ' (js|mjs|wasm|svg)[ ;]' /etc/nginx/mime.types`,
          try: R`في فولدر فيه ملفات من الدروس اللي فاتت (html و js و json و svg و webp و wasm)، شغّل [[python3 -m http.server 8000]]، ومن ترمنال تاني اعمل [[curl -sI]] لكل ملف وقارن الـ Content-Type. وفي المتصفح افتح [[F12]] ثم Network وافتح أي موقع، ودوس على أي طلب وشوف [[Content-Type]] في Response Headers. وبعدين حل التمرين.`,
          deep: {
            why: R`الرابط ممكن ميكونش فيه امتداد خالص ([[/api/users]] أو [[/image?id=5]])، وممكن يكون فيه امتداد كداب. فالويب اتفق إن السيرفر يقول صراحة «اللي بعتهولك ده نوعه كذا» في header، والمتصفح يتصرف على حسبه: يعرضه، أو ينفّذه، أو ينزّله.`,
            how: R`Nginx وهو بيبعت ملف ثابت بياخد الامتداد ويدوّر عليه في جدول [[types]] (اللي جاي من [[mime.types]])، ويحط النتيجة في [[Content-Type]]. وفي الـ API انت (أو الإطار) اللي بتحدده: [[res.json()]] في Express بيحط [[application/json; charset=utf-8]] لوحده. والمتصفح زمان كان بيعمل «sniffing» يخمّن من المحتوى، وده كان بيعمل ثغرات، فدلوقتي مع [[nosniff]] بيلتزم بالـ header.`,
            when: R`لما ملف مش بيظهر أو script مش بيشتغل وفي الـ Console رسالة MIME، ولما تكتب API (ابعت النوع الصح، واقبل الطلبات بالنوع الصح)، ولما تظبط Nginx أو S3 أو CDN.`,
            mistakes: R`تبعت JSON من [[fetch]] من غير [[headers: { "Content-Type": "application/json" }]] فالسيرفر يشوف body فاضي. ترفع ملفات على S3 من غير Content-Type فتتنزّل بدل ما تتعرض. تثق في الـ Content-Type اللي العميل باعته مع ملف مرفوع (العميل يقدر يكتب أي حاجة، درس «الامتداد بيكدب»). وتنسى [[.mjs]] أو [[.wasm]] في إعدادات السيرفر.`
          },
          teach: R`## الفكرة في سطرين

المثال بيسأل نفس السؤال من ٤ أماكن: «الملف ده نوعه إيه؟». مرة من **السيرفر** (الـ header اللي بيبعته)، ومرة من **المحتوى** ([[file]])، ومرة من **جدول الامتدادات** بتاع Python، ومرة من جدول Nginx. وهتشوف إنهم مش دايمًا بيتفقوا.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، Python 3.12.3 و file 5.45) في فولدر فيه [[app.js]] و [[logo.svg]] و [[camera.webp]] و [[add.wasm]]، وجدول Nginx من الـ image الرسمية [[nginx:alpine]] (nginx 1.31.6). وقبل أول سطر لازم سيرفر شغال في ترمنال تاني:

~~~bash
python3 -m http.server 8000
~~~

ده سيرفر ملفات بسيط جاي مع Python: بيعرض الفولدر الحالي على [[http://localhost:8000]].

---

## ١. السيرفر بيقول إيه: [[curl -sI http://localhost:8000/app.js | grep -i content-type]]

| الحتة | معناها |
|---|---|
| [[curl]] | أداة بتعمل طلب HTTP من الترمنال |
| [[-s]] | silent: من غير شريط التحميل |
| [[-I]] | اطلب الـ headers بس (طلب HEAD)، من غير محتوى الملف |
| [[| grep -i content-type]] | من كل الـ headers هات السطر اللي فيه content-type، و [[-i]] يعني متفرّقش بين الحروف الكبيرة والصغيرة |

الرد كامل من غير [[grep]] شكله كده:

~~~text curl -sI http://localhost:8000/app.js
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.12.3
Date: Wed, 07 Oct 2026 12:08:13 GMT
Content-type: text/javascript
Content-Length: 19
Last-Modified: Wed, 07 Oct 2026 12:08:12 GMT
~~~

وبعد [[grep]]:

~~~text الناتج
Content-type: text/javascript
~~~

[[text/javascript]] شكله [[type/subtype]]: النوع الكبير [[text]] (نص)، والنوع الصغير [[javascript]]. والسيرفر طلّعه من الامتداد [[.js]]. اسم الـ header مكتوب [[Content-type]] بحرف صغير، وده عادي: أسامي الـ headers في HTTP مش حساسة لحالة الحروف، وعشان كده احتجنا [[-i]].

---

## ٢. ملف مش موجود

~~~bash
curl -sI http://localhost:8000/missing.js | grep -i -E "^HTTP|content-type"
~~~

[[-E]] يعني regex موسّع، فـ [[|]] جوه التنصيص معناها «أو»: هات السطر اللي بيبدأ بـ [[HTTP]] ([[^]] = أول السطر) أو اللي فيه content-type.

~~~text الناتج
HTTP/1.0 404 File not found
Content-Type: text/html;charset=utf-8
~~~

الملف مش موجود، فالسيرفر رجّع **صفحة HTML** فيها رسالة الغلط، ونوعها [[text/html]]. تخيل إن الصفحة دي فيها [[<script type="module" src="missing.js">]]: المتصفح هيستلم HTML بدل JavaScript ويقولك [[Expected a JavaScript module script but the server responded with a MIME type of "text/html"]]. يعني الغلط ده معناه غالبًا «المسار غلط»، مش «النوع غلط».

---

## ٣. موقع حقيقي

~~~bash
curl -sI https://github.com | grep -i -E "content-type|nosniff"
~~~

~~~text الناتج
content-type: text/html; charset=utf-8
x-content-type-options: nosniff
~~~

- [[; charset=utf-8]]: معلومة زيادة بعد النوع: الحروف مكتوبة بـ UTF-8.
- [[x-content-type-options: nosniff]]: GitHub بيقول للمتصفح «صدّق الـ content-type ومتخمّنش من المحتوى». [[sniff]] يعني «يشم»، يعني يخمّن.

على ويندوز في PowerShell، [[curl.exe]] موجود جاهز، و [[Select-String]] بدل [[grep]]:

~~~powershell
curl.exe -sI https://github.com | Select-String -Pattern "content-type|nosniff"
~~~

~~~text الناتج (PowerShell 7)
Content-Type: text/html; charset=utf-8
X-Content-Type-Options: nosniff
~~~

نفس المعلومة، و GitHub رجّع الأسامي بحروف كبيرة المرة دي (curl بتاع ويندوز اتكلم HTTP/1.1، و HTTP/2 بيبعتها بحروف صغيرة دايمًا). [[Select-String]] مش حساس للحروف من الأول. واكتب [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]].

---

## ٤. المحتوى بيقول إيه: [[file --mime-type -b logo.svg camera.webp add.wasm]]

- [[--mime-type]]: اطبع الـ MIME type بدل الوصف الطويل.
- [[-b]]: brief: من غير اسم الملف في الأول.

~~~text الناتج
image/svg+xml
image/webp
application/wasm
~~~

[[file]] مبيبصش على الامتداد خالص، بيقرا أول bytes في الملف (الدرس الجاي). [[+xml]] في [[image/svg+xml]] معناها «صورة مكتوبة بصيغة XML». و [[add.wasm]] هنا 8 bytes بس ([[\0asm]] ورقم النسخة)، وده كفاية إن [[file]] يعرفه.

---

## ٥. جدول Python: [[python3 -c "import mimetypes; print(mimetypes.guess_type('a.webp'))"]]

- [[-c]]: نفّذ الكود ده على طول من غير ملف.
- [[mimetypes]]: مكتبة جاية مع Python فيها جدول امتداد ← نوع. دي اللي [[http.server]] بيستخدمها.
- [[guess_type('a.webp')]]: «خمّن» من الاسم بس. الملف مش لازم يكون موجود أصلًا.

~~~text الناتج
('image/webp', None)
~~~

بيرجع حاجتين: النوع، والـ encoding (لو الاسم [[a.webp.gz]] كان هيقول [[gzip]] هنا). [[None]] يعني مفيش. وجرّبنا [[app.js]] و [[a.mjs]] الاتنين طلعوا [[text/javascript]]، على أوبونتو وعلى ويندوز (Python 3.14).

---

## ٦. جدول Nginx

~~~bash
grep -E ' (js|mjs|wasm|svg)[ ;]' /etc/nginx/mime.types
~~~

الـ regex: مسافة، وبعدها واحد من الأربع امتدادات ([[(js|mjs|wasm|svg)]])، وبعده مسافة أو [[;]] ([[[ ;]]] يعني «حرف من دول»). ليه مش [[;]] بس؟ لأن سطر SVG مكتوب فيه امتدادين [[svg svgz;]]، فـ [[svg]] بعدها مسافة مش [[;]].

~~~text الناتج (nginx:alpine)
    application/javascript                           js;
    image/svg+xml                                    svg svgz;
    application/wasm                                 wasm;
~~~

كل سطر: النوع، وبعده الامتدادات اللي ليه. ولاحظ اللي **مش موجود**: [[mjs]]. يعني Nginx بالجدول ده هيبعت ملف [[.mjs]] بـ [[default_type]] (غالبًا [[application/octet-stream]])، والمتصفح هيرفض يشغّله كـ module. وكمان Nginx لسه بيقول [[application/javascript]] لـ [[.js]] و Python بيقول [[text/javascript]]، والاتنين المتصفح بيقبلهم (المعيار الحالي [[text/javascript]]).

---

## مين قال إيه

| المصدر | بيعتمد على | app.js | logo.svg |
|---|---|---|---|
| [[http.server]] (header) | الامتداد (جدول Python) | [[text/javascript]] | [[image/svg+xml]] |
| [[file --mime-type]] | المحتوى | [[text/plain]] (مفيش بصمة لـ JS) | [[image/svg+xml]] |
| [[mimetypes.guess_type]] | الاسم بس | [[text/javascript]] | [[image/svg+xml]] |
| Nginx [[mime.types]] | الامتداد (جدول Nginx) | [[application/javascript]] | [[image/svg+xml]] |

والمتصفح بيصدّق **الـ header** بس.

---

## عن التمرين

التمرين بيطلب منك تعمل جدول زي جدول Nginx بنفسك. فكّر في ٣ حاجات قبل ما تكتب: الامتداد هو اللي **بعد آخر نقطة** (مش أول نقطة، عشان [[app.min.js]])، والحروف الكبيرة ([[.JPEG]])، والأسامي اللي ملهاش امتداد أو بتبدأ بنقطة ([[Makefile]] و [[.env]]). والنصوص بس هي اللي ليها charset.

---

## الخلاصة

~~~text
MIME type        type/subtype، زي text/html و image/png
Content-Type     الـ header اللي فيه الـ MIME type، والمتصفح بيصدّقه هو بس
octet-stream     «bytes ومعرفش هي إيه»: المتصفح بينزّلها
nosniff          متخمّنش من المحتوى
404 بـ text/html  سبب أشهر غلط MIME مع scripts
~~~`,
          lines: [
            R`الـ header اللي python http.server بعته للـ JS.`,
            R`ملف مش موجود: 404 والنوع HTML (صفحة الغلط)، وده اللي بيعمل غلط «MIME type text/html» لو كان script.`,
            R`موقع حقيقي: النوع ومعاه [[nosniff]].`,
            R`[[file]] بيطلّع MIME من المحتوى (مش من السيرفر).`,
            R`جدول Python من الامتداد.`,
            R`جدول Nginx: لاحظ مين موجود ومين لأ.`
          ],
          sol: R`الناتج الحقيقي ([[python3 -m http.server]] في Python 3.12):
[[Content-type: text/javascript]]
[[HTTP/1.0 404 File not found]] و [[Content-Type: text/html;charset=utf-8]]
[[content-type: text/html; charset=utf-8]] و [[x-content-type-options: nosniff]]
[[image/svg+xml]] و [[image/webp]] و [[application/wasm]]
[[('image/webp', None)]]
وفي Nginx (الـ image الرسمية):
[[application/javascript js;]] و [[image/svg+xml svg svgz;]] و [[application/wasm wasm;]]، ومفيش [[mjs]]! يعني ملف [[.mjs]] على Nginx بالإعدادات دي بيتبعت [[application/octet-stream]] والمتصفح يرفض يشغّله كـ module. الحل: ضيف [[types { application/javascript mjs; }]] أو سمّيه [[.js]].

وفي Python الجدول فيه [[.json]] ← [[application/json]] و [[.svg]] ← [[image/svg+xml]] و [[.wasm]] ← [[application/wasm]] كلهم.`,
          check: {
            lang: "js",
            starter: R`// contentTypeFor: رجّع الـ Content-Type المناسب لاسم الملف
// html و css و js و mjs و json و svg و png و jpg و jpeg و webp و wasm و woff2 و pdf
// النصوص (html و css و js و mjs و json) يتضاف لها "; charset=utf-8"
// أي امتداد مش معروف (أو من غير امتداد) ← "application/octet-stream"
function contentTypeFor(name) {
  const ext = name.split(".")[1];
  if (ext === "html") return "text/html";
  return "application/octet-stream";
}`,
            tests: R`test("index.html", () => expect(contentTypeFor("index.html")).toBe("text/html; charset=utf-8"));
test("app.min.js و app.mjs (آخر امتداد بس)", () => expect([contentTypeFor("app.min.js"), contentTypeFor("app.mjs")]).toEqual(["text/javascript; charset=utf-8", "text/javascript; charset=utf-8"]));
test("data.json و style.css", () => expect([contentTypeFor("data.json"), contentTypeFor("style.css")]).toEqual(["application/json; charset=utf-8", "text/css; charset=utf-8"]));
test("الصور من غير charset", () => expect(["logo.svg", "a.png", "b.jpg", "c.JPEG", "d.webp"].map(contentTypeFor)).toEqual(["image/svg+xml", "image/png", "image/jpeg", "image/jpeg", "image/webp"]));
test("wasm و woff2 و pdf", () => expect(["add.wasm", "cairo.woff2", "report.pdf"].map(contentTypeFor)).toEqual(["application/wasm", "font/woff2", "application/pdf"]));
test("مش معروف أو من غير امتداد أو dotfile", () => expect(["backup.tar.zst", "Makefile", ".env"].map(contentTypeFor)).toEqual(["application/octet-stream", "application/octet-stream", "application/octet-stream"]));`,
            solution: R`function contentTypeFor(name) {
  const types = {
    html: "text/html", css: "text/css", js: "text/javascript", mjs: "text/javascript", json: "application/json",
    svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp",
    wasm: "application/wasm", woff2: "font/woff2", pdf: "application/pdf"
  };
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return "application/octet-stream";
  const type = types[name.slice(dot + 1).toLowerCase()];
  if (!type) return "application/octet-stream";
  return ["html", "css", "js", "mjs", "json"].includes(name.slice(dot + 1).toLowerCase()) ? type + "; charset=utf-8" : type;
}`
          }
        },
        {
          cmd: "magic bytes",
          title: "إيه الـ magic bytes، وإزاي تعرف نوع أي ملف من أول كام byte فيه؟",
          desc: R`أغلب صيغ الملفات الـ binary بتبدأ بـ bytes ثابتة اسمها magic bytes أو file signature، زي البصمة. البرامج بتشيك عليها قبل ما تقرا الملف، و [[file]] شغله كله إنه يقارنها بقاعدة بيانات فيها آلاف البصمات.

أشهر البصمات (بالـ hex، وبين قوسين اللي بيبان كحروف):
• PNG: [[89 50 4E 47 0D 0A 1A 0A]] ([[.PNG....]])
• JPEG: [[FF D8 FF]]
• GIF: [[47 49 46 38]] ([[GIF8]])
• WebP: [[52 49 46 46]] ([[RIFF]]) وبعد ٤ bytes [[57 45 42 50]] ([[WEBP]])
• PDF: [[25 50 44 46]] ([[%PDF]])
• ZIP (و docx و xlsx و jar و apk): [[50 4B 03 04]] ([[PK..]])
• gzip: [[1F 8B]]، و 7z: [[37 7A BC AF 27 1C]]، و xz: [[FD 37 7A 58 5A 00]]
• برامج ويندوز ([[.exe]] و [[.dll]]): [[4D 5A]] ([[MZ]])
• برامج لينكس (ELF): [[7F 45 4C 46]] ([[.ELF]])
• Java class: [[CA FE BA BE]]
• WebAssembly: [[00 61 73 6D]] ([[.asm]])
• SQLite: [[53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00]] ([[SQLite format 3.]])
• UTF-8 BOM: [[EF BB BF]] (درس UTF-8)
• الملفات النصية (JSON و CSV و الكود) ملهاش بصمة: [[file]] بيخمّن من المحتوى ([[{]] في الأول؟ [[<?xml]]؟ [[#!]]؟).

بتقراها إزاي:
• [[xxd -l 16 file]] أو [[head -c 16 file | xxd]] (لينكس والماك و Git Bash).
• [[Format-Hex file | Select-Object -First 1]] في PowerShell.
• [[file file]] و [[file --mime-type -b file]].
• في الكود: اقرا أول bytes كـ [[Uint8Array]] (في المتصفح [[await file.slice(0, 16).arrayBuffer()]]، وفي Node [[fs.readFileSync]] أو مكتبة [[file-type]]) وقارن.

ليه مهم: عشان تعرف الملف بجد إيه مهما كان اسمه، ودي الطريقة الصح تتأكد بيها من ملفات اليوزرز المرفوعة (الدرس الجاي).`,
          example: R`xxd -l 8 camera.png
xxd -l 4 camera.jpg
xxd -l 12 camera.webp
xxd -l 4 project.zip
xxd -l 4 gym.db
file --mime-type -b camera.png project.zip gym.db report.docx`,
          try: R`اجمع الملفات اللي عملتها في التاب (png و jpg و webp و zip و pdf و wasm و db و docx و exe) في فولدر ونفّذ [[xxd -l 16]] على كل واحد، واكتب البصمات بإيدك في جدول. بعدين اعمل ملف نصي وسمّيه [[fake.png]] وجرّب [[file]]. وحل التمرين: دالة بتطلّع النوع من الـ bytes.`,
          deep: {
            why: R`الاسم بيتغير بسهولة، بس محتوى الملف لازم يمشي على قواعد الصيغة عشان البرنامج يقدر يقراه. فأحسن طريقة تعرف الملف إيه هي إنك تقرا أوله. وكمان البصمات بتحمي من فتح ملف بالبرنامج الغلط (PNG فيه [[\r\n]] و [[\n]] في البصمة عن قصد: لو حد نقله كنص وغيّر نهايات السطور، البصمة هتبوظ وتعرف إن الملف اتبوظ).`,
            how: R`[[file]] بيقرا قاعدة البيانات بتاعته ([[/usr/share/misc/magic]] وأخواتها)، وكل قاعدة فيها «في المكان ده، لو الـ bytes كذا، يبقى النوع كذا»، وبعضها بيقرا أعمق (المقاس في PNG، أو هل الـ zip ده جواه [[word/]] يبقى docx). ولو مفيش بصمة بيجرّب: هل كل الـ bytes حروف UTF-8؟ يبقى text، وبعدين يدوّر على علامات (HTML، shebang، JSON...).`,
            when: R`لما ملف ميتفتحش أو مش عارف هو إيه، ولما تكتب كود بيقبل رفع ملفات، ولما تستعيد ملفات من هارد بايظ (أدوات الاستعادة بتدوّر على البصمات).`,
            mistakes: R`تتأكد من نوع الملف المرفوع بالامتداد أو بـ [[file.type]] اللي المتصفح باعته (الاتنين من العميل ويتزوروا). تقرا البصمة من غير ما تتأكد إن الملف طوله كفاية. وتنسى إن docx و xlsx و jar و apk كلهم بيبدأوا بـ [[PK]] زي zip، فالبصمة لوحدها بتقول «zip» بس.`
          },
          teach: R`## الفكرة في سطرين

المثال بيقرا **أول كام byte** من كل ملف ويطبعهم بالـ hex، فتشوف البصمة بعينك. وفي الآخر [[file]] بيعمل نفس المقارنة لوحده ويطلّع الـ MIME type.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، file 5.45) على ملفات اتعملت للتجربة: صورة 640x480 بـ ImageMagick حفظناها PNG و JPG و WebP، وفولدر صغير اتضغط zip، وقاعدة SQLite فيها جدول واحد، و docx صغير. وجزء ويندوز اتشغّل في PowerShell 7 و 5.1.

---

## الأداة: [[xxd]]

[[xxd]] بيحوّل أي ملف لـ **hex dump**: كل byte بيتكتب رقمين hex (من [[00]] لـ [[ff]]). و [[-l 8]] يعني length: اقرا أول 8 bytes بس. الناتج كل سطر فيه ٣ أعمدة:

~~~text مثال
00000000: 8950 4e47 0d0a 1a0a                      .PNG....
~~~

- **offset**: مكان أول byte في السطر من أول الملف (بالـ hex). هنا [[00000000]] = من الأول خالص.
- **الـ hex**: [[89]] byte، و [[50]] byte، وهكذا. [[xxd]] بيحطهم اتنين اتنين عشان القراية بس.
- **الحروف**: لو الـ byte حرف ASCII يتطبع بيتكتب، ولو لأ بتتكتب [[.]] نقطة.

---

## ١. PNG: [[xxd -l 8 camera.png]]

~~~text الناتج
00000000: 8950 4e47 0d0a 1a0a                      .PNG....
~~~

| byte | معناه |
|---|---|
| [[89]] | رقم برة ASCII عن قصد، عشان أي برنامج يفتكره نص يعرف إنه مش نص |
| [[50 4e 47]] | [[PNG]] كحروف |
| [[0d 0a]] | [[\r\n]]: نهاية سطر ويندوز |
| [[1a]] | Ctrl+Z: «نهاية الملف» في DOS القديم |
| [[0a]] | [[\n]]: نهاية سطر لينكس |

نهايات السطور جوه البصمة معمولة عشان لو حد نقل الملف كنص وبرنامج «صلّح» نهايات السطور، البصمة تبوظ وتعرف إن الملف اتبوظ.

---

## ٢. JPEG: [[xxd -l 4 camera.jpg]]

~~~text الناتج
00000000: ffd8 ffe0                                ....
~~~

[[ff d8]] معناها «بداية صورة» (SOI = Start Of Image)، و [[ff]] بعدها أول marker. البصمة [[ff d8 ff]] بس، والـ byte الرابع بيختلف: [[e0]] هنا معناها JFIF، وممكن تلاقي [[e1]] (صورة موبايل فيها EXIF). عشان كده البصمة ٣ bytes مش ٤. ومفيش ولا حرف بيتطبع، فالعمود اليمين كله نقط.

---

## ٣. WebP: [[xxd -l 12 camera.webp]]

~~~text الناتج
00000000: 5249 4646 b408 0000 5745 4250            RIFF....WEBP
~~~

هنا البصمة على **حتتين**:

| الـ offset | الـ bytes | معناها |
|---|---|---|
| 0 لـ 3 | [[52 49 46 46]] | [[RIFF]]: حاوية عامة (WAV و AVI بيستخدموها كمان) |
| 4 لـ 7 | [[b4 08 00 00]] | حجم الملف ناقص 8، مكتوب little-endian (بالمقلوب): [[0x000008b4]] = 2228، والملف فعلًا 2236 byte |
| 8 لـ 11 | [[57 45 42 50]] | [[WEBP]]: نوع اللي جوه الحاوية |

يعني [[RIFF]] لوحدها مش كفاية (ممكن تبقى WAV)، لازم تبص على offset 8 كمان. والـ 4 bytes اللي في النص هتختلف من ملف لملف لأنها الحجم.

---

## ٤. ZIP: [[xxd -l 4 project.zip]]

~~~text الناتج
00000000: 504b 0304                                PK..
~~~

[[PK]] أول حرفين من اسم Phil Katz اللي عمل الصيغة، و [[03 04]] معناها «local file header» (أول ملف جوه الأرشيف). نفس البصمة دي في docx و xlsx و jar و apk لأنهم كلهم zip من جوه.

---

## ٥. SQLite: [[xxd -l 4 gym.db]]

~~~text الناتج
00000000: 5351 4c69                                SQLi
~~~

البصمة الكاملة 16 byte، شوفها بـ [[xxd -l 16]]:

~~~text xxd -l 16 gym.db
00000000: 5351 4c69 7465 2066 6f72 6d61 7420 3300  SQLite format 3.
~~~

جملة إنجليزي عادية، وفي آخرها [[00]] (byte صفر، بيتكتب [[.]]).

---

## ٦. [[file]] بيعمل كل ده لوحده

~~~bash
file --mime-type -b camera.png project.zip gym.db report.docx
~~~

~~~text الناتج
image/png
application/zip
application/vnd.sqlite3
application/vnd.openxmlformats-officedocument.wordprocessingml.document
~~~

[[--mime-type]] اطبع النوع بس، و [[-b]] من غير اسم الملف. اللي يستاهل تبص عليه آخر سطر: [[report.docx]] بيبدأ بـ [[PK]] زي [[project.zip]] بالظبط، بس [[file]] **دخل جوه الـ zip** ولقى ملف [[word/document.xml]] و [[[Content_Types].xml]]، فعرف إنه Word. [[vnd]] يعني vendor: نوع خاص بشركة (هنا معايير Office).

ومن غير [[--mime-type]] بيديك وصف أطول، وبيقرا تفاصيل من جوه الملف:

~~~text file camera.png gym.db report.docx
camera.png:  PNG image data, 640 x 480, 16-bit/color RGB, non-interlaced
gym.db:      SQLite 3.x database, last written using SQLite version 3045001, file counter 1, database pages 2, ...
report.docx: Microsoft Word 2007+
~~~

### ملف نصي باسم صورة

~~~bash
printf "hello\n" > fake.png
file fake.png
~~~

~~~text الناتج
fake.png: ASCII text
~~~

الاسم بيقول صورة، والمحتوى بيقول نص. [[file]] صدّق المحتوى.

---

## على ويندوز: [[Format-Hex]]

مفيش [[xxd]] ولا [[file]] في PowerShell (موجودين في Git Bash). البديل [[Format-Hex]]:

~~~powershell
Format-Hex camera.png | Select-Object -First 1
~~~

~~~text الناتج (PowerShell 7)
          Offset Bytes                                           Ascii
                 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
          ------ -----------------------------------------------  -----
0000000000000000 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52 �PNG����   �IHDR
~~~

نفس الأعمدة التلاتة، والـ hex بحروف كبيرة. [[Format-Hex]] بيطبع الملف كله، و [[Select-Object -First 1]] بياخد أول «كتلة» (أول 16 byte). وفي PowerShell 7 تقدر تقول [[Format-Hex gym.db -Count 16]] على طول، بس [[-Count]] مش موجودة في Windows PowerShell 5.1، فهناك استخدم [[Select-Object -First 1]].

---

## البصمات في جدول

| الصيغة | البصمة | offset | كحروف |
|---|---|---|---|
| PNG | [[89 50 4E 47 0D 0A 1A 0A]] | 0 | [[.PNG....]] |
| JPEG | [[FF D8 FF]] | 0 | (مفيش حروف) |
| WebP | [[52 49 46 46]] و [[57 45 42 50]] | 0 و 8 | [[RIFF]] و [[WEBP]] |
| ZIP و docx و apk | [[50 4B 03 04]] | 0 | [[PK..]] |
| SQLite | [[53 51 4C 69 74 65 ...]] | 0 | [[SQLite format 3]] |

---

## عن التمرين

الدالة بتاخد array أرقام، وكل رقم byte زي اللي شفناه في [[xxd]] ([[0x89]] هي [[89]]). فكّر في ٣ حاجات: البصمة لازم **كلها** تطابق مش أول byte بس، و WebP محتاج تشيك في مكانين (0 و 8)، والملف ممكن يكون أقصر من البصمة فمتقراش برة الـ array.

---

## الخلاصة

~~~text
magic bytes     أول bytes ثابتة في كل صيغة binary
xxd -l N        اقرا أول N byte بالـ hex (Format-Hex على ويندوز)
file            بيقارن بآلاف البصمات، وبيدخل جوه zip يفرّق docx
النصوص           ملهاش بصمة: file بيخمّن من المحتوى
الاسم            ممكن يكدب، البصمة صعب
~~~`,
          lines: [
            R`PNG: [[8950 4e47 0d0a 1a0a]].`,
            R`JPEG: [[ffd8 ff]].`,
            R`WebP: [[RIFF]] وبعد ٤ bytes (الحجم) [[WEBP]].`,
            R`ZIP: [[PK]] و [[03 04]].`,
            R`SQLite: [[SQLite]] كنص.`,
            R`النوع من المحتوى، و [[file]] بيبص جوه الـ zip فيفرّق docx.`
          ],
          sol: R`الناتج الحقيقي:
[[00000000: 8950 4e47 0d0a 1a0a                      .PNG....]]
[[00000000: ffd8 ffe0                                ....]]
[[00000000: 5249 4646 f65b 0000 5745 4250            RIFF.[..WEBP]]
[[00000000: 504b 0304                                PK..]]
[[00000000: 5351 4c69                                SQLi]]
[[image/png]] و [[application/zip]] و [[application/vnd.sqlite3]] و [[application/vnd.openxmlformats-officedocument.wordprocessingml.document]]
(آخر واحد هو الـ MIME الرسمي لـ docx.)

و [[fake.png]] النصي: [[file]] بيقول [[ASCII text]] أو [[Unicode text, UTF-8 text]] مهما كان اسمه.`,
          check: {
            lang: "js",
            starter: R`// detectType: خد أول bytes من الملف (array أرقام أو Uint8Array) ورجّع النوع الحقيقي:
// "png" و "jpg" و "gif" و "pdf" و "zip" و "exe" و "elf" و "wasm" و "webp"، وأي حاجة تانية "unknown"
function detectType(bytes) {
  if (bytes[0] === 0x89) return "png";
  return "unknown";
}`,
            tests: R`const hex = (s) => s.split(" ").map((h) => parseInt(h, 16));
test("png (البصمة كاملة مش أول byte بس)", () => expect([detectType(hex("89 50 4E 47 0D 0A 1A 0A 00")), detectType(hex("89 00 00 00 00 00 00 00"))]).toEqual(["png", "unknown"]));
test("jpg و gif و pdf", () => expect([detectType(hex("FF D8 FF E0")), detectType(hex("47 49 46 38 39 61")), detectType(hex("25 50 44 46 2D 31 2E 37"))]).toEqual(["jpg", "gif", "pdf"]));
test("zip و exe و elf و wasm", () => expect([detectType(hex("50 4B 03 04 14")), detectType(hex("4D 5A 90 00")), detectType(hex("7F 45 4C 46 02")), detectType(hex("00 61 73 6D 01 00 00 00"))]).toEqual(["zip", "exe", "elf", "wasm"]));
test("webp: RIFF ومعاها WEBP في مكان 8", () => expect([detectType(hex("52 49 46 46 F6 5B 00 00 57 45 42 50")), detectType(hex("52 49 46 46 F6 5B 00 00 57 41 56 45"))]).toEqual(["webp", "unknown"]));
test("نص عادي ← unknown", () => expect(detectType(Array.from("<?php echo 1;", (c) => c.charCodeAt(0)))).toBe("unknown"));
test("ملف أقصر من البصمة ← unknown", () => expect([detectType([0x89, 0x50]), detectType([])]).toEqual(["unknown", "unknown"]));
test("بيشتغل مع Uint8Array", () => expect(detectType(new Uint8Array(hex("FF D8 FF DB")))).toBe("jpg"));`,
            solution: R`function detectType(bytes) {
  const sigs = [
    ["png", 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ["jpg", 0, [0xff, 0xd8, 0xff]],
    ["gif", 0, [0x47, 0x49, 0x46, 0x38]],
    ["pdf", 0, [0x25, 0x50, 0x44, 0x46]],
    ["zip", 0, [0x50, 0x4b, 0x03, 0x04]],
    ["exe", 0, [0x4d, 0x5a]],
    ["elf", 0, [0x7f, 0x45, 0x4c, 0x46]],
    ["wasm", 0, [0x00, 0x61, 0x73, 0x6d]]
  ];
  const at = (offset, sig) => bytes.length >= offset + sig.length && sig.every((b, i) => bytes[offset + i] === b);
  for (const [name, offset, sig] of sigs) if (at(offset, sig)) return name;
  if (at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return "webp";
  return "unknown";
}`
          }
        },
        {
          cmd: "الامتداد بيكدب",
          title: "إزاي invoice.pdf.exe والامتدادات المخفية بتخدع الناس، وتتأكد من الملفات المرفوعة على موقعك إزاي؟",
          desc: R`كل اللي فات في التاب بيوصل لقاعدة أمان واحدة: اسم الملف وامتداده معلومة من اللي عمل الملف، وممكن تبقى كدب. الطرق المشهورة:

• امتداد مزدوج: [[invoice.pdf.exe]]. لو ويندوز مخبي الامتدادات (الافتراضي!) هيظهر [[invoice.pdf]]، ومع أيقونة PDF متزوّرة جوه البرنامج، الناس بتدوس. الحل الأول: اعرض الامتدادات (درس «إظهار الامتدادات»).
• حرف RTLO: حرف Unicode مخفي ([[U+202E]] Right-to-Left Override) بيقلب اتجاه اللي بعده في العرض. الاسم الحقيقي [[invoice]] وبعده الحرف ده وبعده [[fdp.exe]] بيظهر في مدير الملفات وكأنه بيخلص بـ [[.pdf]] بالمقلوب. والامتداد الحقيقي [[.exe]]. أدوات زي [[ls | cat -A]] بتكشف الحرف.
• امتدادات منفّذة مش متوقعة: [[.scr]] و [[.com]] و [[.js]] و [[.vbs]] و [[.hta]] و [[.lnk]] (اختصار بيشغّل أمر) و [[.iso]] و [[.img]] (بيتعمل لهم mount بدبل كليك وجواهم برامج). و [[.docm]] و [[.xlsm]] بالـ macros.
• داخل أرشيف: zip فيه [[.exe]] أو [[.lnk]]، وأحيانًا بباسورد عشان برامج الحماية متفتحوش.

ولو انت اللي عامل الموقع وبتسمح برفع ملفات (صور، CV، مستندات)، المهاجم هيعمل العكس: يرفع script باسم صورة. القواعد:
• متثقش في الاسم، ولا في [[Content-Type]] اللي العميل باعته، ولا في [[accept]] اللي في الـ HTML. كلهم من العميل.
• اتأكد من المحتوى (magic bytes، أو الأحسن: افتح الصورة بمكتبة صور فعلًا وأعد حفظها، زي sharp، ده بيمسح كمان أي حاجة متخبية والـ EXIF).
• ليستة سماح (allowlist) بالأنواع المقبولة، مش ليستة منع.
• اعمل للملف اسم جديد من عندك ([[crypto.randomUUID() + ".webp"]])، ومتستخدمش اسم العميل في المسار (path traversal: [[../../etc/passwd]]).
• خزّنه بره الفولدر اللي السيرفر بينفّذ منه (عشان [[photo.php]] ميتشغّلش)، أو على S3 أو أي object storage.
• ابعته بـ Content-Type انت محدده و [[X-Content-Type-Options: nosniff]]، ولو مستند خلّيه [[Content-Disposition: attachment]].
• حدّد الحجم الأقصى.
• SVG و HTML المرفوعين ممكن يبقى فيهم scripts (درس [[.svg]])، فإما تمنعهم أو تعرضهم من دومين تاني.`,
          example: R`cp hostname.exe invoice.pdf.exe
cp hostname.exe "$(printf 'invoice\u202Efdp.exe')"
printf '<?php system($_GET["c"]); ?>' > photo.jpg
ls
ls | cat -A
file *`,
          try: R`في فولدر تجربة نفّذ المثال (أي ملف binary ينفع بدل [[hostname.exe]]، مثلًا [[cp /bin/ls]]). بص على ناتج [[ls]] العادي، وبعدين [[cat -A]]. افتح الفولدر في مدير الملفات وشوف الاسم التاني ظاهر إزاي. لو على ويندوز وعندك الامتدادات مخفية، اعمل ملف [[test.pdf.txt]] وشوف هيظهر إزاي، وبعدين اعرض الامتدادات.`,
          deep: {
            why: R`الناس (وبرامج كتير) بتحكم على الملف من اسمه، والاسم أسهل حاجة تتزور. وأغلب الهجمات على الأفراد بتبدأ بمرفق في إيميل أو رسالة، وأغلب الهجمات على المواقع اللي فيها رفع ملفات بتبدأ بملف «صورة» هو في الحقيقة كود.`,
            how: R`ويندوز بيقرر يعمل إيه بالملف من آخر امتداد بس، فـ [[.pdf.exe]] بيتشغّل كبرنامج. وحرف RTLO بيأثر على العرض بس: نظام الملفات شايف الحروف بترتيبها الحقيقي ([[invoice]] ثم الحرف ثم [[fdp.exe]])، فالامتداد الحقيقي [[.exe]]. وعلى السيرفر، لو الملف المرفوع اتحط في فولدر Apache أو Nginx بيشغّل PHP، طلب [[/uploads/photo.php]] هينفّذه.`,
            when: R`كل ما تستلم مرفق، وكل ما تكتب endpoint بيقبل ملفات، وكل ما تراجع كود حد بيعمل كده.`,
            mistakes: R`تتأكد من الصورة بـ [[if (name.endsWith(".jpg"))]] بس. تحفظ الملف باسم العميل في [[public/uploads/]]. تثق في [[file.mimetype]] في multer (ده Content-Type من العميل). وتفتح [[.zip]] جايلك وتدوس على اللي جواه من غير ما تبص على امتداده.`
          },
          teach: R`## الفكرة في سطرين

الدرس ده عن **الدفاع**: إزاي الاسم بيخدع العين، وإزاي تكشفه. المثال بيعمل ٣ ملفات «متنكّرة» عشان تشوف الحيلة بنفسك في فولدر تجربة، وبعدين بيكشفهم بتلات أدوات: [[ls]] (العين)، و [[cat -A]] (الـ bytes)، و [[file]] (المحتوى الحقيقي). الخلاصة: متحكمش على ملف من اسمه.

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker)، و [[hostname.exe]] نسخة من برنامج ويندوز عادي (أي ملف binary ينفع). الملفات دي ملهاش ضرر: محدش هيشغّلها، إحنا بنتفرّج على أساميها بس.

---

## الحيل التلاتة اللي المثال بيوريهالك

| السطر | بيوضّح خطر إيه |
|---|---|
| [[cp hostname.exe invoice.pdf.exe]] | **امتداد مزدوج**: الاسم فيه [[.pdf]] في النص، بس الامتداد الحقيقي (اللي بعد آخر نقطة) [[.exe]]. لو ويندوز مخبي الامتدادات (الافتراضي)، بيشيل [[.exe]] فتشوف [[invoice.pdf]] |
| [[cp hostname.exe "$(printf 'invoice\u202efdp.exe')"]] | **حرف RTLO**: حرف Unicode مخفي ([[U+202E]] = Right-to-Left Override) بيقلب اتجاه عرض اللي بعده، فالاسم يظهر وكأنه بيخلص بـ [[.pdf]] بالمقلوب. [[printf]] هنا بيكتب الحرف المخفي ده عشان نشوف تأثيره |
| [[printf '<?php ... ?>' > photo.jpg]] | **محتوى مش زي الاسم**: ملف اسمه صورة ومحتواه كود. ده شكل الخطر لو موقعك بيقبل رفع ملفات |

كل دول نفس الفكرة: اسم الملف معلومة من اللي عمل الملف، فممكن تبقى كدب. دلوقتي نكشفهم.

---

## كشف ١: [[ls]] العادي مش كفاية

~~~bash
ls
~~~

~~~text الناتج
hostname.exe
invoice.pdf.exe
invoice\u202efdp.exe
photo.jpg
~~~

الاسم اللي فيه RTLO بيظهر مقلوب في مدير الملفات وفي ترمنالات كتير (ساعات [[invoiceexe.pdf]])، فالعين بتتخدع. محتاجين نشوف الـ bytes الحقيقية.

---

## كشف ٢: [[cat -A]] بيكشف الحرف المخفي

[[ls | cat -A]]: ناتج [[ls]] بيدخل لـ [[cat -A]]، و [[-A]] معناها اطبع كل حرف «غير مرئي» في شكل ظاهر، وحطّ [[$]] في آخر كل سطر.

~~~bash
ls | cat -A
~~~

~~~text الناتج
hostname.exe$
invoice.pdf.exe$
invoiceM-bM-^@M-.fdp.exe$
photo.jpg$
~~~

شوف السطر التالت: [[M-bM-^@M-.]] دي الطريقة اللي [[cat -A]] بيكتب بيها الـ ٣ bytes بتوع الحرف المخفي ([[e2 80 ae]] = ترميز UTF-8 للحرف [[U+202E]]). يعني الحرف بان. و [[ls -b]] بيعمل نفس الحاجة بشكل تاني: بيطبع [[invoice\342\200\256fdp.exe]] (نفس الـ bytes بالنظام الثماني).

وفي أي لغة تقدر تشوف الاسم الحقيقي بـ [[repr]]: في Python [[os.listdir(".")]] بيطبع [['invoice\u202efdp.exe']]، فالحرف واضح كـ [[\u202e]].

---

## كشف ٣: [[file]] بيقول الحقيقة من المحتوى

~~~bash
file *
~~~

[[*]] يعني «كل الملفات في الفولدر».

~~~text الناتج
hostname.exe:               PE32+ executable (console) x86-64, for MS Windows, 7 sections
invoice.pdf.exe:            PE32+ executable (console) x86-64, for MS Windows, 7 sections
invoice<U+202E>fdp.exe:     PE32+ executable (console) x86-64, for MS Windows, 7 sections
photo.jpg:                  PHP script, ASCII text, with no line terminators
~~~

(كتبنا الحرف المخفي هنا [[<U+202E>]] عشان ميقلبش الصفحة.) [[file]] بيقرا الـ magic bytes (الدرس اللي فات) مش الاسم: فقال إن اللي أساميهم «PDF» دول **برامج** ([[PE32+ executable]] شكل برامج ويندوز)، وإن [[photo.jpg]] **كود PHP** مش صورة. ده المصدر الوحيد اللي مبيتخدعش.

---

## لو انت صاحب الموقع وبتقبل رفع ملفات

المهاجم هيعمل العكس: يرفع script باسم صورة (زي [[photo.jpg]] فوق). القواعد:

- **متثقش في اللي جاي من العميل**: لا الاسم، ولا الـ [[Content-Type]] اللي بعته، ولا [[accept]] اللي في الـ HTML. كلهم العميل يقدر يكتب فيهم أي حاجة.
- **اتأكد من المحتوى**: اقرا الـ magic bytes، أو الأحسن افتح الصورة بمكتبة صور وأعد حفظها (زي sharp)، ده بيمسح أي حاجة متخبية والـ EXIF كمان.
- **ليستة سماح (allowlist)** بالأنواع المقبولة، مش ليستة منع.
- **اعمل للملف اسم جديد من عندك** ([[crypto.randomUUID() + ".webp"]])، ومتستخدمش اسم العميل في المسار (عشان حيلة [[../../etc/passwd]]).
- **خزّنه بره الفولدر اللي السيرفر بينفّذ منه** (أو على S3)، عشان ملف اسمه [[.php]] ميتشغّلش.
- ابعته بـ [[Content-Type]] انت محدده و [[X-Content-Type-Options: nosniff]]، وحدّد حجم أقصى.
- SVG و HTML المرفوعين ممكن فيهم scripts، فإما تمنعهم أو تعرضهم من دومين تاني.

---

## أول خطوة على جهازك: اعرض الامتدادات

أغلب خدعة الامتداد المزدوج بتشتغل لأن ويندوز بيخبي الامتداد. في File Explorer فعّل **View ثم File name extensions**. ساعتها [[invoice.pdf.exe]] هيظهر بامتداده الحقيقي.

---

## الخلاصة

~~~text
الاسم            معلومة من اللي عمل الملف، ممكن تكدب
امتداد مزدوج       invoice.pdf.exe: الامتداد الحقيقي بعد آخر نقطة
حرف RTLO          U+202E بيقلب العرض: اكشفه بـ cat -A أو ls -b
محتوى ≠ اسم        كود باسم صورة: file بيكشفه
~~~

| تكشف بإيه | الأداة |
|---|---|
| حرف مخفي في الاسم | [[cat -A]] أو [[ls -b]] أو [[repr]] |
| النوع الحقيقي | [[file]] (magic bytes) |
| رفع آمن | allowlist + فحص المحتوى + اسم من عندك + تخزين بره مسار التنفيذ |`,
          lines: [
            R`برنامج باسم شكله PDF.`,
            R`نفس البرنامج، والاسم فيه حرف [[U+202E]] مخفي قبل [[fdp]].`,
            R`كود PHP في ملف اسمه صورة (لو اترفع على سيرفر بيشغّل PHP، ده باب خلفي).`,
            R`[[ls]] العادي: التاني بيظهر [[invoiceexe.pdf]] في أغلب الترمنالات.`,
            R`[[cat -A]] بيكشف الحرف المخفي كـ bytes.`,
            R`[[file]] بيقول الحقيقة لكل واحد.`
          ],
          sol: R`الناتج الحقيقي ([[cat -A]] و [[file]]):
[[invoiceM-bM-^@M-.fdp.exe$]] (الـ [[M-bM-^@M-.]] هي bytes الحرف [[e2 80 ae]])
[[invoice.pdf.exe$]]
[[invoice<U+202E>fdp.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]] (كتبنا الحرف المخفي هنا كـ [[<U+202E>]] عشان ميقلبش الصفحة)
[[invoice.pdf.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]]
[[photo.jpg:       PHP script, ASCII text, with no line terminators]]
وفي مدير الملفات (وفي [[ls]] في ترمنالات كتير) الاسم التاني بيظهر [[invoiceexe.pdf]].

وفي Python: [[repr]] للاسم بيطبع [['invoice\u202efdp.exe']] فالحرف بيبان.`
        }
      ]
    }
]);
