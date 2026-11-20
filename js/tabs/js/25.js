// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "PWA و service worker",
      l: 3,
      n: "الموقع يتسطّب ويشتغل من غير نت: manifest، ودورة حياة الـ SW، واستراتيجيات الكاش، وزرار «نسخة جديدة»، و IndexedDB ومساحة التخزين، والـ push و Background Sync",
      projects: [
        { lvl: 'صغير', t: R`مشروع قديم يتسطّب`, what: R`خد أي موقع عملته قبل كده وزوّد له [[manifest.webmanifest]] كامل (درس ١): [[name]] و [[short_name]] و [[start_url]] و [[display]] وأيقونة 192 و 512 وأيقونة maskable، واربطه من كل صفحة.`, done: R`Application ← Manifest مفيهوش ولا warning، وأيقونة التسطيب بتظهر في شريط العنوان في Chrome (ده محتاج كمان service worker بسيط لو المتصفح طالبه)، والتطبيق بعد التسطيب بيفتح في شباك لوحده بالاسم والأيقونة بتوعك، والأيقونة الـ maskable جوه دايرة الأمان في معاينة DevTools.` },
        { lvl: 'صغير', t: R`صفحة «انت offline» محترمة`, what: R`service worker صغير (درس ٢) بيعمل precache لـ [[offline.html]] وملف CSS بتاعها بس، وفي الـ fetch لأي [[navigate]] بيجرّب الشبكة ولو فشلت يرجّع [[offline.html]] (درس ٣).`, done: R`Network ← Offline وتفتح أي صفحة حتى لو مزرتهاش: [[offline.html]] بتظهر بالـ CSS بتاعها مش ديناصور Chrome، ولما ترجع Online الصفحات بترجع عادي، والصور والـ API مش بيتكيّشوا (Cache storage فيه ملفين بس).` },
        { lvl: 'متوسط', t: R`موقع شرح بيشتغل من غير نت`, what: R`موقع ٥ صفحات: precache للـ shell في الـ install، و network-first للصفحات، و cache-first للـ assets، و stale-while-revalidate للـ JSON (درس ٣)، ومسح الكاش القديم في activate (درس ٢)، وشريط «فيه نسخة جديدة» (درس ٤).`, done: R`بعد ما تزور الصفحات مرة، Offline بيفتحها كلها، وعمود Size في Network فيه [[(ServiceWorker)]] للملفات، وتغيير [[CACHE]] بيظهر الشريط، و «حدّث» بيعمل reload مرة واحدة، و Cache storage بعدها فيه الكاش الجديد بس.` },
        { lvl: 'متوسط', t: R`ملاحظات offline في كل التابات`, what: R`صفحة ملاحظات بـ IndexedDB و [[idb]] (درس ٦): إضافة وتعديل ومسح وترتيب بـ index على [[updatedAt]]، و BroadcastChannel بيحدّث التابات التانية، و [[navigator.storage.persist()]]، وكل ده جوه PWA بـ vite-plugin-pwa (درس ٥).`, done: R`ملاحظة تضيفها في تاب بتظهر في التاب التاني من غير refresh، والداتا بتفضل بعد ما تقفل المتصفح وتفتحه وانت Offline، ومسح ملاحظة بيختفي من التابين، و Application ← IndexedDB فيه نفس عدد الملاحظات اللي في الصفحة.` },
        { lvl: 'كبير', t: R`تطبيق مهام PWA بيزامن لما النت يرجع`, what: R`تطبيق مهام بـ Vite و vite-plugin-pwa بـ [[registerType: "prompt"]] (درس ٥): المهام في IndexedDB (درس ٦)، وأي تغيير وانت offline بيتحط في store اسمه [[outbox]] وبيتبعت لـ API بـ Express على localhost لما [[online]] يحصل أو الصفحة تفتح. فيه: فحص المدخلات (عنوان فاضي أو أطول من 200 حرف بيترفض)، و upgrade لـ version 2 بيزوّد index من غير ما يمسح الداتا، و [[QuotaExceededError]] متمسوك برسالة، وزرار «نسخة جديدة» (درس ٤)، و BroadcastChannel بين التابات.`, done: R`Offline: تضيف ٣ مهام وتعدّل واحدة، و [[outbox]] فيه ٤ عمليات. Online: لوج السيرفر فيه ٤ requests بنفس الترتيب، و [[outbox]] بيفضى، ولو السيرفر رجّع 500 العمليات بتفضل مستنية ومبتتمسحش. version 2 فتح على داتا version 1 والمهام كلها موجودة. التطبيق بيتسطّب وبيفتح Offline من أول مرة بعد التسطيب، وتشغيله مرتين في تابين مبيبعتش نفس العملية مرتين.`, ext: R`زوّد login وكل يوزر ليه مهامه، وحل التعارض لو نفس المهمة اتعدّلت من جهازين، و push notifications للتذكير، وانشره على HTTPS وسطّبه على موبايلك.` },
        { lvl: 'فكرة', t: R`حوّل حاجة بتستخدمها لـ PWA`, what: R`فكّر في أداة صغيرة بتفتحها كل يوم ومحتاجها حتى من غير نت (قايمة مشتريات، مصاريف، مذاكرة بالكروت، تايمر تمارين) وابنيها PWA من الأول: انت اللي بتقرر إيه يتكيّش، وإيه يتحفظ في IndexedDB، وإيه محتاج نت.`, done: R`فيه README بيقول كل نوع request بيستخدم أنهي استراتيجية وليه، والتطبيق بيتسطّب على موبايلك، وبيشتغل في وضع الطيارة، وفيه طريقة تصدّر الداتا كـ JSON عشان متضيعش لو المتصفح مسحها.`, ext: R`زوّد sync مع سيرفر بتاعك، و shortcuts في الـ manifest، و share target لو بتستقبل لينكات، وجرّبه على iOS واكتب الفروق اللي لقيتها.` },
      ],
      items: [
        {
          cmd: "manifest.webmanifest",
          title: "تخلي الموقع يتسطّب كتطبيق إزاي؟",
          desc: R`الـ PWA (Progressive Web App) موقع عادي بيتسطّب على الموبايل والكمبيوتر كأنه تطبيق: أيقونة على الشاشة، ويفتح في شباك لوحده من غير شريط العنوان، وممكن يشتغل من غير نت. أول حتة هي الـ manifest: ملف JSON بيوصف التطبيق، وبتربطه من الـ HTML بـ [[<link rel="manifest" href="manifest.webmanifest">]].

الموقع اللي انت بتذاكر فيه ده نفسه PWA: ده الـ manifest بتاعه تقريبًا زي ما هو. أهم الحقول: [[name]] و [[short_name]] (تحت الأيقونة)، و [[start_url]] (يفتح على فين)، و [[display: "standalone"]] (من غير شريط المتصفح)، و [[icons]] (192 و 512 على الأقل، وواحدة [[maskable]] عشان Android يقصّها دايرة أو مربع من غير ما تتقطع)، و [[theme_color]] و [[background_color]] (لون الشريط وشاشة البداية)، و [[lang]] و [[dir]] للعربي.`,
          example: R`// manifest.webmanifest (بتاع الموقع ده، مختصر)
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}`,
          try: R`افتح الموقع ده في Chrome، و DevTools ← Application ← Manifest: شوف الحقول والأيقونات وأي warnings. وبعدين في مشروع عندك: اعمل manifest بنفس الشكل وأيقونات (ممكن تولّدها بـ [[npx @vite-pwa/assets-generator]] أو أي أداة)، واربطه، وشوف أيقونة التسطيب ظهرت في شريط العنوان ولا لأ. ولو مظهرتش، Application ← Manifest هيقولك الناقص.`,
          practice: [
            { lvl: 'سريع', t: R`صلّح الـ manifest البايظ: حط comma زيادة بعد آخر حقل، واكتب [["display": "standlone"]] بغلطة إملائية، وافحصه بـ [[node -e "JSON.parse(require('fs').readFileSync('manifest.webmanifest', 'utf8'))"]] وبـ Application ← Manifest.`, done: R`Node بيطلّع [[SyntaxError]] للـ comma، وبعد ما تشيلها الأمر بيخلص من غير ولا سطر، بس الـ [[display]] لسه غلط و JSON.parse مبيشتكيش (JSON صالح ومعناه غلط)، والمتصفح بيتجاهل القيمة اللي ميعرفهاش ويرجع للـ default ([[browser]]) فالتطبيق بعد التسطيب مبيفتحش في شباك لوحده، ولما تصلّحها لـ [[standalone]] بيفتح.` },
            { lvl: 'تطبيق', t: R`ابني أداة: [[check-manifest.mjs]] بتقرا الـ manifest وبتتأكد إن فيه [[name]] و [[start_url]] و [[display]] من القيم المسموحة، وأيقونة [[192x192]] وأيقونة [[512x512]]، وإن ملفات الأيقونات موجودة على الديسك. بتطبع كل مشكلة في سطر وتخرج بـ [[process.exitCode = 1]].`, done: R`manifest الدرس بيعدّي من غير ناتج وكود 0، وشيل أيقونة الـ 512 بيطبع سطر بيقول إنها ناقصة، ومسار أيقونة غلط بيطبع اسم الملف، و [[display: "standlone"]] بيترفض، و [[echo $?]] (أو [[$LASTEXITCODE]]) بيرجّع 1 في كل الحالات دي.` },
            { lvl: 'تحدي', t: R`ابني أيقونة maskable صح: اللوجو جوه دايرة قطرها 80٪ من الأيقونة، والخلفية مليانة لحد الأطراف. افحصها بـ «Show only the minimum safe area for maskable icons» في Application ← Manifest.`, done: R`مفيش أي جزء من اللوجو بيتقص في المعاينة، ومفيش حواف شفافة، والأيقونة العادية (من غير [[purpose: "maskable"]]) لسه موجودة جنبها للأماكن اللي مبتقصّش.` },
          ],
          flag: "script",
          deep: {
            why: "تطبيق موبايل كامل (Flutter أو React Native) معناه store ومراجعة وتحديثات بتستنى اليوزر. الـ PWA موقعك نفسه، بيتحدّث أول ما تنشر، واليوزر يسطّبه بضغطة. لأدوات داخلية، و dashboards، ومواقع مذاكرة زي دي، وأي حاجة اليوزر بيفتحها كل يوم، ده غالبًا كفاية (تاب Desktop و Mobile بيقارن).",
            how: R`المتصفح بيقرا الـ manifest ويقرر إن الموقع «installable». في Chromium الشروط: HTTPS (أو localhost)، و manifest فيه [[name]] أو [[short_name]] وأيقونة 144 pixel على الأقل بتتحمّل فعلًا (والمستحسن 192 و 512) و [[start_url]] و [[display]] مش [["browser"]]. (زمان كان لازم كمان service worker بـ fetch handler، و Chrome شال الشرط ده في نسخه الحديثة، بس من غير SW مفيش offline.)

في Chrome و Edge بيظهر زرار تسطيب في شريط العنوان، وتقدر تعمل زرار بنفسك بـ [[beforeinstallprompt]] (Chromium بس). في Safari على iOS مفيش prompt: اليوزر لازم يضغط Share ← «Add to Home Screen» بنفسه، فلازم تشرحله. وفي Safari على الماك «Add to Dock».

[[scope]] بيحدد الـ URLs اللي تفضل جوه التطبيق؛ أي لينك برّاه بيفتح في المتصفح. و [[id]] (اختياري) هوية التطبيق لو [[start_url]] اتغير بعدين. والـ manifest نفسه بيتكاش عادي، فالتغييرات فيه (أيقونة جديدة) بتاخد وقت عشان تظهر للي مسطّبين.`,
            when: R`أي موقع اليوزر بيرجعله كتير. والـ manifest لوحده (من غير SW) لسه مفيد: أيقونة ولون وشاشة بداية لما حد يضيفه للشاشة.`,
            mistakes: R`أيقونة maskable محتواها لحد الحواف فبيتقص (خلي المحتوى في الـ 80% اللي في النص). و [[start_url]] مطلق ([["/"]]) والموقع في فولدر فرعي على GitHub Pages. ومفيش [[dir: "rtl"]] لموقع عربي. وتتوقع prompt تلقائي على iPhone.`
          },
          teach: R`## الفكرة في سطر

الـ manifest ملف JSON بيقول للمتصفح «الموقع ده اسمه كذا، وأيقونته دي، ولما يتسطّب يفتح كده». مفيهوش كود بيتنفذ: المتصفح بيقراه ويقرر الموقع ينفع يتسطّب ولا لأ.

جرّبته في Chrome headless (عن طريق playwright-core) على سيرفر Node صغير على localhost: [[index.html]] فيه [[<link rel="manifest">]]، والـ manifest ده بالظبط، و ٣ أيقونات PNG بالمقاسات المكتوبة. وسألت Chrome نفسه عن رأيه بأمر من DevTools Protocol اسمه [[Page.getInstallabilityErrors]] (نفس اللي بيعرضه DevTools ← Application ← Manifest ← Installability).

---

## ١. الربط من الـ HTML

~~~text index.html
<link rel="manifest" href="manifest.webmanifest">
~~~

- [[rel="manifest"]]: نوع العلاقة. المتصفح بيدوّر على [[link]] بالـ rel ده بالظبط.
- [[href]]: مسار الملف، نسبي للصفحة. الامتداد [[.webmanifest]] هو الرسمي، و [[manifest.json]] بيشتغل برضه.

لما فتحت الصفحة، السيرفر استلم بالترتيب ده:

~~~text طلبات السيرفر
GET /
GET /manifest.webmanifest
GET /icons/icon-192.png
~~~

يعني المتصفح بيطلب الـ manifest لوحده بعد الـ HTML، وبيحمّل الأيقونة اللي محتاجها.

---

## ٢. أول سطر: التعليق

~~~text manifest.webmanifest
// manifest.webmanifest (بتاع الموقع ده، مختصر)
~~~

ده عنوان للدرس بس، **مش جزء من الملف**. JSON مفيهوش تعليقات، و [[JSON.parse]] بيرفضه:

~~~text الناتج (Node 24)
JSON.parse: Unexpected token '/', "// c
{}" is not valid JSON
~~~

في تجربتي Chrome عدّى السطر ده وقرا الباقي عادي، بس متعتمدش على كده: أدوات تانية (ومتصفحات تانية) ممكن ترفض الملف كله. احذفه في الملف الحقيقي.

---

## ٣. الحقول واحد واحد

~~~text manifest.webmanifest
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
~~~

| الحقل | معناه | ليه بالقيمة دي |
|---|---|---|
| [[name]] | الاسم الكامل | بيظهر في شاشة التسطيب وقايمة البرامج |
| [[short_name]] | الاسم القصير | تحت الأيقونة على الموبايل، المكان ضيق |
| [[lang]] | لغة النصوص | [[ar]] = عربي |
| [[dir]] | اتجاه الكتابة | [[rtl]] = Right To Left، من اليمين للشمال |
| [[start_url]] | الصفحة اللي التطبيق يفتح عليها | [["./"]] نسبي لمكان الـ manifest |
| [[scope]] | الـ URLs اللي تعتبر «جوه التطبيق» | أي لينك برّاها يفتح في المتصفح العادي |
| [[display]] | شكل الشباك | [[standalone]] = من غير شريط عنوان |
| [[background_color]] | لون شاشة البداية (splash) | قبل ما الصفحة ترسم |
| [[theme_color]] | لون شريط العنوان أو النظام | |

الألوان مكتوبة hex: [[#1f2430]] يعني أحمر [[1f]] وأخضر [[24]] وأزرق [[30]] بالـ base 16. Chrome بيحوّلها لصيغته الداخلية، ولما سألته رجّع:

~~~text الناتج (Chrome، مختصر)
"name":"الترمنال بإيدك"
"display":"kStandalone"
"startUrl":"http://localhost:PORT/"
"scope":"http://localhost:PORT/"
"id":"http://localhost:PORT/"
"themeColor":"rgba(31,36,48,1)"
"backgroundColor":"rgba(31,36,48,1)"
~~~

- [[./]] اتحوّل لـ URL كامل حسب مكان الـ manifest. ده بالظبط ليه بنكتبه نسبي: الموقع ده على GitHub Pages في فولدر فرعي، فـ [["/"]] كانت هتودّي لبرّه.
- [[31,36,48]] هي نفس [[1f]] و [[24]] و [[30]] بالعشري.
- [[id]] مكتبناهوش، فـ Chrome خده من [[start_url]]. ده هوية التطبيق المتسطّب.

### الأيقونات

~~~text manifest.webmanifest
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
~~~

- [[src]]: مسار الصورة، نسبي للـ manifest.
- [[sizes]]: العرض × الطول بالـ pixel. المتصفح بيختار المقاس الأقرب للي محتاجه.
- [[type]]: نوع الملف (MIME type).
- [[purpose: "maskable"]]: الأيقونة دي مسموح تتقص بأي شكل (دايرة، مربع بحواف مدورة). المحتوى المهم لازم يبقى في النص.

---

## ٤. Chrome بيقول إيه لو حاجة ناقصة؟

غيّرت الـ manifest كل مرة حاجة وسألت [[getInstallabilityErrors]]:

| التغيير | رد Chrome |
|---|---|
| الملف زي ما هو | [[[]]] (مفيش أخطاء، ينفع يتسطّب) |
| [[display: "browser"]] | [[manifest-display-not-supported]]: الـ browser معناه تاب عادي، فمفيش حاجة تتسطّب |
| [[minimal-ui]] | مفيش أخطاء، لأنه شباك لوحده بزراير رجوع صغيرة |
| من غير [[name]] و [[short_name]] | [[manifest-missing-name-or-short-name]]: مفيش اسم يتكتب تحت الأيقونة |
| من غير [[start_url]] | [[start-url-not-valid]]: مش عارف يفتح أنهي صفحة لما تدوس الأيقونة |
| أيقونة 192 بس (من غير 512) | مفيش أخطاء |
| أيقونة 192 بمسار غلط ولا غيرها | [[no-acceptable-icon]] و [[minimum-icon-size-in-pixels: 144]] |
| [[icons]] فاضية | [[manifest-missing-suitable-icon]]: مفيش أي أيقونة يحطها على الشاشة الرئيسية |

يعني Chrome فعلًا بيطلب أيقونة واحدة على الأقل 144 pixel وتتحمّل فعلًا. الـ 192 والـ 512 هما المقاسات اللي بيوصّوا بيها عشان كل الشاشات تبقى حلوة (192 للأيقونة، و 512 لشاشة البداية)، فحطهم الاتنين.

> الأخطاء دي بالظبط بتظهر بالكلام العادي في DevTools ← Application ← Manifest ← Installability. لو زرار التسطيب مظهرش، ده أول مكان تبص فيه.

---

## الخلاصة

| لازم لـ Chrome | مستحسن |
|---|---|
| HTTPS أو localhost | [[short_name]] و [[lang]] و [[dir]] |
| [[name]] أو [[short_name]] | أيقونة 192 و 512 وواحدة [[maskable]] |
| [[start_url]] صالح | [[theme_color]] و [[background_color]] (لون شريط العنوان وشاشة البداية) |
| [[display]] مش [[browser]] | [[scope]] نسبي زي [[start_url]]، عشان يحدد الصفحات اللي جوه التطبيق |
| أيقونة 144 pixel أو أكبر بتتحمّل | |

- المسارات النسبية ([["./"]]) بتتحسب من مكان الـ manifest، مش من الصفحة.
- مفيش تعليقات في JSON.
- على iPhone مفيش زرار تسطيب خالص: اليوزر بيضغط Share ← Add to Home Screen.`,
          lines: [
            R`بداية الـ manifest: ملف JSON عادي، object واحد. لازم يبقى JSON سليم (من غير تعليقات ولا فاصلة زيادة في الآخر)، وإلا المتصفح يطلّع syntax error ويتجاهل الملف، فالموقع مش هيتسطّب.`,
            R`[[name]]: الاسم الكامل للتطبيق، بيظهر في رسالة التسطيب وفي قايمة التطبيقات. Chrome محتاج [[name]] أو [[short_name]] على الأقل عشان يعتبر الموقع قابل للتسطيب.`,
            R`[[short_name]]: اسم قصير يتكتب تحت الأيقونة على الشاشة الرئيسية. المساحة هناك صغيرة، فالاسم الطويل بيتقص بـ «...»، عشان كده بنديله اسم مخصوص.`,
            R`[[lang]]: لغة النصوص اللي جوه الـ manifest نفسه (الاسم والوصف)، عشان النظام يعرضها صح. مش بتغيّر لغة الصفحة؛ دي بيحددها [[lang]] على [[<html>]].`,
            R`[[dir]]: اتجاه النصوص اللي في الـ manifest. [[rtl]] لأن الاسم عربي، فيتعرض من اليمين للشمال صح في شاشة التسطيب والقوايم.`,
            R`[[start_url]]: الصفحة اللي تفتح لما اليوزر يدوس على الأيقونة. [[./]] نسبي لمكان ملف الـ manifest مش للصفحة الحالية، فالموقع يفتح صح حتى لو متحطوط في فولدر فرعي (زي GitHub Pages).`,
            R`[[scope]]: الـ URLs اللي تتحسب «جوه التطبيق». لو اليوزر راح لرابط بره الـ scope، المتصفح يعرضه بشريط عنوان أو في المتصفح العادي بدل شباك التطبيق. ولازم [[start_url]] يبقى جواه، وإلا المتصفح يتجاهل الـ scope ده.`,
            R`[[standalone]]: التطبيق يفتح في شباك لوحده من غير شريط العنوان والتابات، فيحس إنه تطبيق متسطّب. القيم التانية: [[browser]] (تاب عادي) و [[minimal-ui]] و [[fullscreen]].`,
            R`[[background_color]]: لون الخلفية في شاشة البداية (splash) اللي بتظهر لحد ما الصفحة تحمّل. خليه نفس لون خلفية الموقع، وإلا هتشوف فلاش بلون تاني قبل ما الـ CSS يشتغل.`,
            R`[[theme_color]]: لون شريط العنوان وشريط النظام حوالين شباك التطبيق. خليه متناسق مع ألوان الموقع عشان الشباك يبان حتة واحدة.`,
            R`بداية ليستة الأيقونات. المتصفح بيختار منها المقاس الأنسب لكل مكان (الشاشة الرئيسية، شاشة البداية، قايمة التطبيقات)، عشان كده بنحط أكتر من مقاس.`,
            R`أيقونة 192×192 للشاشة الرئيسية والأماكن الصغيرة. [[sizes]] و [[type]] بيخلوا المتصفح يختار من غير ما يحمّل كل الصور يجرّبها. وChrome محتاج 192 و 512 على الأقل عشان يسمح بالتسطيب.`,
            R`أيقونة 512×512 لشاشة البداية والتسطيب والشاشات عالية الدقة، عشان متتمطّش وتبان مبكسلة.`,
            R`[[maskable]]: أيقونة مرسومة بهامش أمان حوالين الرسمة، فـ Android يقدر يقصها دايرة أو مربع بحواف من غير ما يقطع منها حاجة. من غير الـ [[purpose]] ده، Android بيحط الأيقونة العادية صغيرة جوه شكل بخلفية.`,
            R`نهاية ليستة [[icons]]. ومفيش فاصلة بعد آخر أيقونة قبلها، لأن JSON مبيقبلش الفاصلة الزيادة.`,
            R`نهاية الـ manifest.`,
          ],
          sol: R`Application ← Manifest بيعرض الاسم والألوان والأيقونات التلاتة، ولو فيه مشكلة (أيقونة ناقصة أو مقاس غلط) بتظهر كـ warning فوق. وفي «Installability» لو فيه سبب يمنع التسطيب.

في مشروعك: أيقونة التسطيب بتظهر في شريط العنوان على Chrome/Edge بعد ما الـ manifest يتقري صح والموقع على [[localhost]] أو HTTPS. الأسباب الشائعة إنها متظهرش: أيقونة 512 ناقصة، أو مسار أيقونة غلط (404 في Network)، أو [[display: "browser"]]، أو فاتح الملف بـ [[file://]]. وعلى iPhone مفيش أيقونة في الشريط أصلًا، التسطيب من زرار Share.`
        },
        {
          cmd: "دورة حياة الـ SW",
          title: "الـ service worker بيتسطّب ويشتغل إزاي، وليه التحديث مش بيظهر؟",
          desc: R`الـ service worker ملف JS بيشتغل في الخلفية بين صفحتك والشبكة: كل request من الصفحة بيعدّي عليه ([[fetch]] event)، ويقدر يرد من كاش أو من الشبكة. من غير DOM ومن غير [[window]]، وبيشتغل بس على HTTPS أو localhost.

دورة حياته: [[register]] من الصفحة ← install (تحفظ الملفات الأساسية في الكاش) ← waiting ← activate (تمسح الكاش القديم) ← يتحكم في الصفحات.

waiting هي سر «عملت deploy والتحديث مش ظاهر»: لما يبقى فيه SW جديد، بيتسطّب ويستنى لحد ما كل التابات اللي شغالة بالقديم تتقفل. الـ refresh مش كفاية. [[self.skipWaiting()]] بيخليه يتفعّل فورًا، و [[clients.claim()]] بيخليه يمسك الصفحات المفتوحة من غير ما تتعمل reload.`,
          example: R`// في الصفحة (app.js):
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
// في sw.js:
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});`,
          try: R`اعمل مشروع صغير بالملفات دي وشغّله على localhost. افتح Application ← Service workers وشوف الحالة. غيّر [[CACHE]] لـ [["app-v3"]] واعمل refresh: فيه SW في حالة «waiting to activate»؟ اعمل refresh تاني: اتفعّل؟ وبعدين دوس «skipWaiting» في DevTools، وبص على Cache storage: القديم اتمسح؟ وآخر حاجة: افتح [[sw.js]] بتاع الموقع ده في الـ repo واعرف هو بيعمل skipWaiting فين.`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع الترتيب الأول وبعدين جرّب: حط [[console.log]] في [[install]] و [[activate]] ومعاه رقم النسخة. إيه اللي هيتطبع في (١) أول زيارة، (٢) refresh عادي، (٣) refresh بعد ما تغيّر حرف في [[sw.js]]؟`, done: R`(١) install وبعدها activate، (٢) ولا حاجة، (٣) install للنسخة الجديدة بس من غير activate، و Application ← Service workers بيعرضها «waiting to activate». لو توقعك كان غير كده، كتبت السبب في سطر.` },
            { lvl: 'تطبيق', t: R`ابني badge صغير في فوتر الصفحة بيقول «SW: مفيش» أو «SW: شغّال app-v2» ([[navigator.serviceWorker.controller]] ورسالة للـ SW بتسأله عن [[CACHE]])، وبيتحدّث على [[controllerchange]]. جرّبه مرة من غير [[clients.claim()]] ومرة بيه (Unregister الأول من DevTools).`, done: R`من غير [[claim]] أول زيارة الـ badge بيقول «مفيش» ومبيتغيرش لحد refresh. مع [[claim]] بيتقلب لـ «شغّال app-v2» لوحده في أول زيارة من غير refresh، وبعد تحديث وتفعيل نسخة جديدة بيعرض الاسم الجديد.` },
            { lvl: 'تحدي', t: R`صلّح الـ scope: سجّل الـ SW من [[/js/sw.js]]، واطبع [[reg.scope]]، وافتح [[/]] و [[/js/page.html]]. وبعدين صلّحها بطريقتين.`, done: R`[[reg.scope]] بيخلص بـ [[/js/]]، والصفحة اللي على [[/]] [[controller]] بتاعها [[null]] واللي جوه [[/js/]] controlled. التصليح الأول: الملف في الـ root. التاني: header [[Service-Worker-Allowed: /]] مع [[sw.js]] والتسجيل بـ [[{ scope: "/" }]]. ومن غير الـ header التسجيل بـ [[scope: "/"]] بيرمي error بيقول إن الـ scope مش مسموح.` },
          ],
          flag: "script",
          deep: {
            why: "أول ما تحط SW في موقع، أول شكوى هتسمعها «أنا مش شايف التعديل». الـ SW بيتحكم في كل request، فلو فهمت دورة حياته غلط ممكن تقفل اليوزرز على نسخة قديمة أسابيع. ودي من أشهر مشاكل الـ PWAs في الشغل الحقيقي (وتاب «من مشاريعي» فيه أمثلة).",
            how: R`المتصفح بيفحص [[sw.js]] عند كل تنقل (وكل ٢٤ ساعة على الأكتر، و [[reg.update()]] يدوي). لو الملف اختلف ولو byte واحد، يعتبره SW جديد ويبدأ install. عشان كده بتغيّر اسم الكاش أو أي حاجة فيه مع كل release (أو الأدوات بتحط hashes الملفات فيه لوحدها). والمتصفح بيتجاهل الـ HTTP cache لـ [[sw.js]] نفسه افتراضيًا، بس ملفات [[importScripts]] ممكن تتكاش.

[[e.waitUntil(promise)]] بيقول «متعتبرش الـ install خلص لحد ما ده يخلص». لو أي ملف في [[addAll]] رجع 404، الـ install كله بيفشل والقديم يفضل شغال.

ليه waiting موجود أصلًا؟ الصفحة المفتوحة اتحمّلت بـ HTML وJS قديم. لو SW جديد مسك كاش جديد في النص، الصفحة ممكن تطلب [[chunk-abc.js]] القديم فميلاقيهوش. فالافتراضي الآمن: استنى لما مفيش حد شغال بالقديم. والـ refresh مش كفاية لأن الصفحة الجديدة بتبدأ قبل ما القديمة تتقفل، فدايمًا فيه client.

الموقع ده بيعمل [[skipWaiting()]] في الـ install و [[clients.claim()]] في الـ activate، ومعاهم كاش network-first (الدرس الجاي)، فالتحديث بيظهر من أول تحميل. ده مناسب لأن كل الملفات بتتجاب من الشبكة أصلًا، بس مع cache-first و chunks بـ hashes الأضمن تسأل اليوزر (زرار «نسخة جديدة»).`,
            when: R`أي PWA. وفي الـ dev خلي «Update on reload» متعلّم في DevTools ← Application ← Service workers، وإلا هتقعد تتلخبط.`,
            mistakes: R`SW على [[/js/sw.js]]: الـ scope بتاعه [[/js/]] بس، فمش هيتحكم في الصفحة (حطه في الـ root). وتنسى تمسح الكاش القديم في activate فالتخزين يكبر. و skipWaiting دايمًا مع cache-first فالصفحة المفتوحة تتكسر. و [[Cache-Control: max-age]] طويل على sw.js في CDN قديم. وفي الانترفيو: «ليه SW الجديد مش بيتفعّل؟» الإجابة waiting، والحل skipWaiting بموافقة اليوزر أو قفل كل التابات.`
          },
          teach: R`## الفكرة في سطر

سطر واحد في الصفحة بيسجّل [[sw.js]]، وجوه [[sw.js]] بنسمع لـ ٣ events: [[install]] (احفظ الملفات)، و [[activate]] (امسح القديم وامسك الصفحات)، و [[message]] (اليوزر وافق، اتفعّل دلوقتي).

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node صغير على localhost فيه [[index.html]] و [[app.css]] و [[app.js]] و [[offline.html]] و [[sw.js]] بالظبط زي المثال. وبعد كل خطوة سألت الصفحة: مين الـ SW اللي بيتحكم؟ ومين active ومين waiting؟ وإيه الكاشات الموجودة؟

---

## ١. التسجيل من الصفحة

~~~text app.js
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
~~~

- [[navigator]]: object فيه معلومات وقدرات المتصفح.
- [["serviceWorker" in navigator]]: [[in]] بيسأل «الخاصية دي موجودة؟». المتصفحات القديمة، أو صفحة مش على HTTPS ولا localhost، مفيهاش [[serviceWorker]]، فالسطر ميعملش حاجة بدل ما يرمي error.
- [[register("/sw.js")]]: نزّل الملف ده وسطّبه كـ service worker. بيرجّع Promise بالـ registration.

مكان الملف مهم: [[/sw.js]] في الـ root فبيتحكم في الموقع كله. لما جربت [[/js/sw.js]]:

~~~text الناتج (Chrome)
{"scope":"/js/","active":"activated","controller":false}
after reload controller: false
~~~

اتسطّب واشتغل، بس الـ scope بتاعه [[/js/]] فمش بيتحكم في الصفحة [[/]] حتى بعد refresh. ولو طلبت scope أوسع بإيدك:

~~~text الناتج (Chrome)
SecurityError: Failed to register a ServiceWorker for scope ('http://localhost:PORT/') with script ('http://localhost:PORT/js/sw.js'): The path of the provided scope ('/') is not under the max scope allowed ('/js/'). Adjust the scope, move the Service Worker script, or use the Service-Worker-Allowed HTTP header to allow the scope.
~~~

---

## ٢. اسم الكاش وقايمة الملفات

~~~text sw.js
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
~~~

- [[CACHE]]: اسم «درج» في Cache Storage (مخزن في المتصفح بيشيل request ← response). بنغيّر الرقم مع كل نسخة.
- [[PRECACHE]]: الملفات اللي لازم تبقى موجودة من أول لحظة عشان الموقع يفتح من غير نت. [["/"]] هي الصفحة الرئيسية نفسها.

---

## ٣. [[install]]

~~~text sw.js
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
~~~

- [[self]]: جوه الـ SW مفيش [[window]]، و [[self]] هو الـ worker نفسه.
- [[install]]: بيتنادى مرة واحدة لكل نسخة جديدة من [[sw.js]].
- [[caches.open(CACHE)]]: افتح الدرج ده (أو اعمله لو مش موجود). بيرجّع Promise بالكاش.
- [[c.addAll(PRECACHE)]]: اطلب كل الملفات دي من السيرفر واحفظها. لو أي واحد فشل، مفيش حاجة بتتحفظ خالص (كله أو ولا حاجة).
- [[e.waitUntil(promise)]]: «متعتبرش الـ install خلص لحد ما الـ Promise ده يخلص». ولو اترفض، الـ install كله فشل.

بعد أول تحميل، السيرفر استلم الطلبات دي (الـ ٤ الأخيرين من الـ SW وهو بيعمل [[addAll]]):

~~~text طلبات السيرفر
GET /  GET /app.css  GET /app.js  GET /favicon.ico  GET /sw.js
GET /  GET /offline.html  GET /app.css  GET /app.js
~~~

ولما حطيت ملف مش موجود ([["/missing.js"]]) في القايمة في نسخة جديدة [["app-v4"]]:

~~~text الناتج (Chrome)
{"active":null,"installing":null,"keys":["app-v4"],"v4entries":0}
~~~

السيرفر رد 404، فالـ install فشل والـ worker اترمى (مفيش active ولا installing). الدرج [["app-v4"]] نفسه اتعمل بـ [[caches.open]] بس فاضي (صفر ملفات). ولما ده حصل على موقع فيه نسخة شغالة قبل كده، القديمة فضلت active ومحدش حس.

---

## ٤. [[activate]]

~~~text sw.js
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
~~~

### من جوه لبرّه

1. [[(async () => { ... })()]]: دالة async بنعرّفها وننادّيها في نفس اللحظة، عشان نقدر نستخدم [[await]] ونرجّع Promise واحد لـ [[waitUntil]].
2. [[caches.keys()]]: أسماء كل الأدراج، مثلًا [[["app-v2", "app-v3"]]].
3. [[.filter((k) => k !== CACHE)]]: سيب بس اللي اسمه مش الحالي.
4. [[.map((k) => caches.delete(k))]]: لكل واحد قديم ابدأ مسح، فيطلع array من Promises.
5. [[Promise.all(...)]]: استنى كل المسح يخلص.
6. [[self.clients.claim()]]: «clients» هي الصفحات المفتوحة. من غيرها، الصفحة اللي سجّلت الـ SW لأول مرة مش بتبقى تحت تحكمه لحد الـ refresh.

---

## ٥. [[message]]

~~~text sw.js
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
~~~

- [[message]]: الصفحة بعتت رسالة بـ [[worker.postMessage(...)]]، و [[e.data]] هو اللي اتبعت.
- [[self.skipWaiting()]]: متستناش التابات القديمة تتقفل، اتفعّل دلوقتي.

---

## ٦. اللي حصل لما شغّلته

~~~text الناتج (Chrome)
أول تحميل (فورًا)       {"controller":false,"active":null,"waiting":null,"caches":[]}
بعد ready               {"controller":true,"active":"activated","waiting":null,"caches":["app-v2"]}
refresh                 {"controller":true,"active":"activated","waiting":null,"caches":["app-v2"]}
CACHE=app-v3 + refresh  {"controller":true,"active":"activated","waiting":"installed","caches":["app-v2","app-v3"]}
refresh تاني            {"controller":true,"active":"activated","waiting":"installed","caches":["app-v2","app-v3"]}
بعد SKIP_WAITING        {"controller":true,"active":"activated","waiting":null,"caches":["app-v3"]}
~~~

اقرا كل عمود كده:

| العمود | معناه |
|---|---|
| [[controller]] | فيه SW بيتحكم في الصفحة دي دلوقتي؟ ([[navigator.serviceWorker.controller]]) |
| [[active]] | حالة الـ SW الشغال ([[reg.active.state]]) |
| [[waiting]] | فيه نسخة جديدة متسطّبة ومستنية؟ ([[reg.waiting]]) |
| [[caches]] | [[caches.keys()]] |

- **أول تحميل:** لسه مفيش حاجة. بعد [[navigator.serviceWorker.ready]] (Promise بيخلص لما يبقى فيه SW active) الـ controller بقى true في نفس الصفحة من غير refresh، وده بفضل [[clients.claim()]].
- **غيّرت [[CACHE]] لـ [["app-v3"]]:** المتصفح لقى [[sw.js]] اتغير، فسطّب النسخة الجديدة (درج [["app-v3"]] اتعمل) ووقفها في [[waiting]] بحالة [["installed"]]. القديمة لسه active، والدرج القديم لسه موجود.
- **refresh تاني:** ولا حاجة اتغيرت. التاب نفسه لسه client بالقديم، والصفحة الجديدة بتتحمّل قبل ما القديمة تتقفل.
- **بعد [[postMessage("SKIP_WAITING")]]:** الجديدة بقت active، والـ activate مسح [["app-v2"]].

> ملحوظة من التجربة: Chrome بيفحص [[sw.js]] بعد التنقل بشوية، مش قبله. فأول refresh بعد التغيير بيرجّع الصفحة لسه بالقديم، والفحص بيحصل في الخلفية.

---

## الخلاصة

| المرحلة | بتحصل إمتى | بنعمل فيها إيه |
|---|---|---|
| [[register]] | من الصفحة | نسجّل [[/sw.js]] من الـ root |
| [[install]] | مرة لكل نسخة جديدة | [[addAll]] للملفات الأساسية |
| waiting | فيه تاب شغال بالقديم | نستنى، أو [[skipWaiting]] بموافقة اليوزر |
| [[activate]] | القديم مشي | نمسح الأدراج القديمة و [[clients.claim()]] |

- أي byte اتغير في [[sw.js]] = نسخة جديدة. عشان كده بنغيّر [[CACHE]].
- ملف واحد 404 في [[addAll]] = الـ install فشل واليوزرز فاضلين على القديم.
- الـ refresh مش بيفعّل النسخة الجديدة: لازم كل التابات تتقفل أو [[skipWaiting]].`,
          lines: [
            R`في الصفحة: لو المتصفح بيدعم service workers ([[serviceWorker]] موجودة في [[navigator]]) سجّل [[/sw.js]]. الشرط بيخلي الموقع يشتغل عادي في المتصفحات القديمة أو على صفحة مش HTTPS بدل ما يرمي error. ومكان الملف مهم: [[/sw.js]] في الـ root يتحكم في كل صفحات الموقع.`,
            R`اسم الكاش وفيه رقم النسخة. لما تغيّر أي ملف من اللي بتتحفظ غيّر الرقم ([[app-v3]]): ده بيغيّر محتوى [[sw.js]] نفسه، فالمتصفح يعتبره نسخة جديدة ويعمل install، و [[activate]] يمسح الكاش القديم بالاسم.`,
            R`ليستة الملفات اللي التطبيق محتاجها عشان يفتح من غير نت: الصفحة الرئيسية وصفحة [[offline.html]] والـ CSS والـ JS. هتتحمّل وتتحفظ مرة واحدة وقت الـ install.`,
            R`[[install]] بيحصل مرة لكل نسخة من [[sw.js]]: أول زيارة، أو لما المتصفح يلاقي الملف اتغير ولو بايت واحد. ده الوقت الصح تحفظ فيه الملفات الأساسية.`,
            R`افتح الكاش بالاسم واحفظ فيه كل ملفات [[PRECACHE]]. [[waitUntil]] بتقول للمتصفح «الـ install مخلصش لحد ما الـ promise دي تخلص». ولو ملف واحد فشل، [[addAll]] كلها بتفشل والـ install يفشل، والنسخة القديمة تفضل شغالة بدل نسخة ناقصة.`,
            R`نهاية الـ [[install]] listener.`,
            R`[[activate]] بيحصل لما النسخة دي تستلم فعلًا: يا إما مفيش قديمة، يا إما القديمة مشيت (كل تابات الموقع اتقفلت أو اتعمل [[skipWaiting]]). ده الوقت الأمان تمسح فيه حاجات النسخة القديمة، لأن محدش بقى بيستخدمها.`,
            R`[[waitUntil]] محتاجة promise، فبنكتب دالة [[async]] وننديها على طول، عشان نستخدم [[await]] جواها ونديها الـ promise اللي راجعة. كده المتصفح بيأجّل الـ fetch events لحد ما التنضيف يخلص.`,
            R`[[caches.keys()]] بترجّع أسامي كل الكاشات اللي الموقع ده عملها، بما فيهم بتوع النسخ القديمة ([[app-v1]] مثلًا).`,
            R`سيب الاسم الحالي ([[CACHE]]) وامسح الباقي كلهم مع بعض بـ [[Promise.all]]. من غير السطر ده، الكاشات القديمة تفضل واكلة مساحة على جهاز اليوزر.`,
            R`[[clients.claim()]]: خلي الـ SW ده يتحكم في الصفحات المفتوحة دلوقتي على طول. من غيرها، في أول زيارة الصفحة اللي سجّلت الـ SW مش بتبقى تحت تحكمه لحد ما تعمل reload.`,
            R`نهاية الدالة الـ [[async]] وندهها، وقفلة [[waitUntil]].`,
            R`نهاية الـ [[activate]] listener.`,
            R`استقبل رسايل من الصفحة (اللي بتتبعت بـ [[postMessage]]). ده الطريق اللي الصفحة بتكلّم بيه الـ SW، زي «اليوزر وافق على التحديث».`,
            R`لو الرسالة [[SKIP_WAITING]]: [[skipWaiting()]] بتخلي النسخة الجديدة اللي مستنية تتفعّل دلوقتي بدل ما تستنى كل التابات تتقفل. بنعملها بس بعد ما اليوزر يوافق، لأن الصفحة المفتوحة محمّلة بـ JS قديم وممكن تطلب ملفات النسخة القديمة اللي اتمسحت.`,
            R`نهاية الـ [[message]] listener.`,
          ],
          sol: R`بعد تغيير [[CACHE]] وأول refresh: DevTools بيعرض SW جديد «waiting to activate» والقديم لسه «activated and is running». الـ refresh التاني غالبًا مش هيفعّله، لأن التاب نفسه client بالقديم. لازم تقفل كل التابات أو تدوس skipWaiting. بعدها الـ activate بيشتغل، و Cache storage فيه [["app-v3"]] بس.

في [[sw.js]] بتاع الموقع ده: [[await self.skipWaiting()]] في آخر الـ install، و [[self.clients.claim()]] في آخر الـ activate بعد ما يمسح أي كاش غير [[CACHE]]. يعني مفيش waiting خالص، ودا آمن هنا لأن استراتيجيته network-first.`
        },
        {
          cmd: "استراتيجيات الكاش",
          title: "ترد من الكاش ولا من الشبكة؟ (network-first و cache-first و stale-while-revalidate)",
          desc: R`في [[fetch]] event بتاع الـ SW بتقرر لكل request:

network-first: جرّب الشبكة، ولو فشلت رد من الكاش. للـ HTML (الصفحات): اليوزر يشوف الأحدث دايمًا، ومن غير نت يشوف آخر نسخة. ده اللي الموقع ده بيعمله لكل حاجة.

cache-first: لو في الكاش رد منه ومتسألش الشبكة. للـ assets اللي في اسمها hash ([[app.3f9a1c.js]]): المحتوى عمره ما هيتغير لنفس الاسم، فمفيش سبب تسأل.

stale-while-revalidate: رد من الكاش فورًا (سريع)، وفي نفس الوقت هات من الشبكة وحدّث الكاش للمرة الجاية. لحاجات تتحمل تكون قديمة شوية: أفاتارات، وخطوط، و API مش حساس.

ومن غير نت وصفحة مش في الكاش: رد بـ [[offline.html]] اللي حفظته في الـ install.`,
          example: R`self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}`,
          try: R`كمّل على مشروع الدرس اللي فات: ضيف الكود ده في [[sw.js]]، واعمل [[offline.html]]. اعمل Offline من DevTools ← Network، وافتح صفحة زرتها قبل كده وصفحة مزرتهاش. وبعدين بص على عمود Size في Network: الـ requests اللي جاية من الـ SW مكتوب جنبها إيه؟ وآخر حاجة: ليه الـ API الخاص بكل يوزر ([[/api/me]]) مش في أي استراتيجية؟`,
          practice: [
            { lvl: 'سريع', t: R`محاكاة في Node: [[cacheFirst(req)]] بتاعة الدرس، بس [[caches]] عبارة عن [[Map]] بإيدك و [[fetch]] دالة وهمية بتزوّد عدّاد وبترجّع [[new Response("ok")]] (و [[status: 500]] لـ [[/broken]]).`, done: R`طلبين لنفس الـ URL: العدّاد 1 والتاني جه من الـ Map. طلبين لـ [[/broken]]: العدّاد بيزيد 2 (الـ 500 متكيّشش عشان [[res.ok]])، و [[await res.text()]] على الـ response اللي جه من الكاش بيرجّع [["ok"]] (عشان اتحفظ [[res.clone()]] مش الأصل).` },
            { lvl: 'تطبيق', t: R`مسألة: كاش للصور بـ cache-first بحد أقصى ٥٠ صورة: [[trimCache(name, max)]] بعد كل [[put]]، بتعمل [[cache.keys()]] ولو أكتر من [[max]] تمسح الأقدم (أول keys في اللستة). جرّبها الأول على الـ Map بتاع التمرين اللي فات.`, done: R`بعد ٦٠ صورة مختلفة الكاش فيه ٥٠ بس وأول ١٠ اتمسحوا، و [[max]] بصفر بيمسح كله، وصورة موجودة بتتطلب تاني مبتزوّدش العدد، و Cache storage في المتصفح بيأكد نفس العدد.` },
            { lvl: 'تحدي', t: R`قارن وقيس: network-first بـ timeout ٣ ثواني بـ [[Promise.race]]، والـ response اللي يوصل متأخر يتحط في الكاش. قيس وقت ظهور الصفحة بـ custom throttling في Network بـ latency ٥ ثواني، مرة بالـ timeout ومرة من غيره.`, done: R`من غير الـ timeout الصفحة بتستنى حوالي ٥ ثواني، وبيه بتظهر بعد حوالي ٣ من الكاش، وبعدها الكاش بيتحدّث بالنسخة الجديدة. على شبكة سريعة بترد من الشبكة على طول، و Offline خالص بيرد من الكاش من غير ما يستنى الـ ٣ ثواني.` },
          ],
          flag: "script",
          deep: {
            why: "الاستراتيجية الغلط بتعمل واحد من اتنين: موقع بطيء (network-first لملفات مش بتتغير) أو موقع عالق على نسخة قديمة (cache-first للـ HTML). الـ bug الشهير «عملت deploy واليوزرز لسه شايفين القديم بعد أسبوع» غالبًا cache-first على [[index.html]].",
            how: R`[[req.mode === "navigate"]] معناها request لصفحة (كتبت URL أو ضغطت لينك)، وده الـ HTML. [[e.respondWith(promise)]] بيقول للمتصفح «أنا هرد»، ولو مناديتهاش ([[return]] من غير حاجة) الـ request بيروح للشبكة عادي كأن مفيش SW.

[[res.clone()]]: الـ Response body stream بيتقري مرة واحدة، فبتعمل نسخة للكاش ونسخة للصفحة. و [[res.ok]] قبل الحفظ عشان متكاشش صفحة 500 أو 404.

في SWR: [[hit ?? fresh]] يعني لو في الكاش رد بيه فورًا، وإلا استنى الشبكة. و [[e.waitUntil(fresh)]] بيخلي الـ SW يفضل صاحي لحد ما التحديث يخلص حتى بعد ما رديت (المتصفح ممكن يوقف الـ SW لو فاضي). و [[catch]] هناك عشان فشل التحديث في الخلفية ميطلعش error ملوش لازمة.

الـ requests اللي من origin تاني (CDN أو API خارجي) بنتجاهلها هنا. الموقع ده بيستثني Google Fonts بس، وردها «opaque» (مش مقروء بسبب CORS)، فمينفعش تعرف هو ok ولا لأ.

وفي HTTP headers نفسها (درس «ETag و Cache-Control» في تاب APIs متقدمة): الـ assets بـ hash [[Cache-Control: max-age=31536000, immutable]]، والـ HTML [[no-cache]]. الـ SW بيشتغل فوق ده مش بداله.`,
            when: R`HTML: network-first. JS/CSS/خطوط بـ hash: cache-first. صور وأفاتارات و API عام: SWR. وأي حاجة خاصة باليوزر (حسابه، سلته) أو POST: متكاشهاش في الـ SW خالص، أو بحذر شديد.`,
            mistakes: R`cache-first للـ HTML. وكاش لـ responses فيها بيانات يوزر، فيعمل logout ويدخل يوزر تاني على نفس الجهاز ويشوف بيانات الأول. وتحفظ 500 في الكاش. وتنسى تمسح الكاشات القديمة فالتخزين يتملي. و [[respondWith]] جوه [[await]] (لازم تتنادى sync في الـ event، ابعتلها promise).`
          },
          teach: R`## الفكرة في سطر

كل request من الصفحة بيعدّي على [[fetch]] event في الـ SW. الكود ده بيبص على نوع الـ request ويوزّعه على واحدة من ٣ دوال: صفحة ← network-first، ملف بـ hash ← cache-first، API عام ← stale-while-revalidate.

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node على localhost. الـ SW فيه الكود ده بالظبط ومعاه [[const CACHE = "app-v1"]] و install بيحفظ [[/offline.html]]. الصفحات: [[/]] و [[/about.html]] و [[/never.html]]، والصفحة الرئيسية بتحمّل [[/assets/app.3f9a1c.js]]. و [[/api/public/news]] بيرجّع [[{"version": N}]] والسيرفر بيزوّد N مع كل طلب، عشان نعرف الرد جه من الشبكة ولا قديم من الكاش.

---

## ١. الموزّع: [[fetch]] event

~~~text sw.js
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
~~~

- [[e.request]]: الـ Request object: فيه [[url]] و [[method]] و [[mode]] والـ headers.
- [[new URL(req.url)]]: بيفك الـ URL لحتت: [[origin]] (البروتوكول والدومين والبورت) و [[pathname]] (المسار).
- [[req.method !== "GET"]]: POST و PUT ودول بيغيّروا داتا، ومينفعش يتكاشوا. [[return]] من غير [[respondWith]] = «مليش دعوة»، والـ request يروح للشبكة عادي.
- [[url.origin !== self.location.origin]]: request لموقع تاني (CDN، API خارجي): برضه سيبه.
- [[req.mode === "navigate"]]: المتصفح بيفتح صفحة (كتبت URL أو ضغطت لينك). ده الـ HTML.
- [[startsWith("/assets/")]]: المسار بيبدأ بكده.
- [[e.respondWith(promise)]]: «أنا اللي هرد، والرد هو اللي الـ Promise ده هيرجّعه». لازم تتنادى على طول جوه الـ event، مش بعد [[await]].

فـ [[return e.respondWith(...)]] معناها: رد، واخرج من الدالة عشان باقي الـ ifs متتفحصش.

---

## ٢. network-first (للصفحات)

~~~text sw.js
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
~~~

1. [[caches.open(CACHE)]]: افتح الدرج.
2. [[try]]: جرّب [[fetch(req)]] من الشبكة.
3. [[res.ok]]: true لو الـ status من 200 لـ 299. صفحة 404 أو 500 متتحفظش.
4. [[cache.put(req, res.clone())]]: احفظ الرد. [[clone()]] لأن الـ body بيتقري مرة واحدة: نسخة للكاش ونسخة للصفحة. ومن غير [[await]] عشان الصفحة متستناش الحفظ.
5. [[catch]]: [[fetch]] بيرمي error بس لما الشبكة نفسها تفشل (مفيش نت، السيرفر مش موجود). الـ 404 مش error.
6. [[cache.match(req)]]: دوّر على نسخة محفوظة، أو [[undefined]].
7. [[?? cache.match("/offline.html")]]: لو مفيش، رجّع صفحة الـ offline.

---

## ٣. cache-first (للملفات اللي في اسمها hash)

~~~text sw.js
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
~~~

- [[caches.match(req)]] (من غير open): بيدوّر في **كل** الأدراج.
- لو لقاه، رد بيه فورًا ومتكلّمش الشبكة خالص.
- لو لأ، هاته واحفظه للمرة الجاية. [[(await caches.open(CACHE)).put(...)]]: الأقواس عشان [[await]] يخلص الأول وبعدين ننادي [[put]] على النتيجة.

---

## ٤. stale-while-revalidate (لـ API عام)

~~~text sw.js
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}
~~~

- [[hit]]: النسخة القديمة (stale) لو موجودة.
- [[fresh]]: طلب الشبكة بيبدأ دلوقتي **من غير [[await]]**، فبيشتغل في الخلفية، ولما يرجع يحدّث الكاش.
- [[e.waitUntil(fresh.catch(() => {}))]]: خلي الـ SW صاحي لحد ما التحديث يخلص (المتصفح بيوقف الـ SW الفاضي). و [[catch]] الفاضية عشان لو مفيش نت الفشل ده ميطلعش error.
- [[hit ?? fresh]]: لو فيه قديم رد بيه فورًا، وإلا استنى الجديد.

---

## ٥. اللي حصل لما شغّلته

### online

~~~text الناتج
online / → server got: GET /
SWR #1: {"version":1} server: GET /api/public/news
SWR #2: {"version":1} server: GET /api/public/news
SWR #3: {"version":2} server: GET /api/public/news
POST server: POST /api/public/news
~~~

- فتح [[/]] للمرة التانية: السيرفر استلم [[GET /]] بس. الـ [[app.3f9a1c.js]] جه من الكاش (cache-first) والسيرفر مشافهوش.
- SWR #1: مفيش كاش، فاستنى الشبكة وجاب version 1.
- SWR #2: رد فورًا بالقديم (version 1)، مع إن السيرفر اتطلب منه في الخلفية وطلّع version 2 واتحفظ.
- SWR #3: رد بـ version 2 اللي اتحفظ في المرة اللي فاتت. يعني SWR دايمًا متأخر خطوة: اللي بتشوفه هو نتيجة الطلب اللي قبله.
- POST: راح للسيرفر عادي والـ SW مقربلوش.

ده محتوى الكاش بعدها:

~~~text الناتج
[ '/offline.html', '/assets/app.3f9a1c.js', '/about.html', '/', '/api/public/news' ]
~~~

### offline (عملت [[setOffline(true)]] زي Offline في DevTools)

~~~text الناتج
offline / → home | home
offline /about.html → about | about
offline /never.html → offline | مفيش نت
SWR offline: {"version":3}
/api/me offline: TypeError: Failed to fetch
~~~

- [[/]] و [[/about.html]] اتزاروا قبل كده، فـ network-first فشل ورجع للكاش.
- [[/never.html]] متزارتش، فرجعت [[offline.html]].
- SWR رجّع آخر نسخة محفوظة (3)، والتحديث في الخلفية فشل بهدوء بسبب [[catch]].
- [[/api/me]] مش في أي استراتيجية، فراح للشبكة وفشل بـ [[TypeError: Failed to fetch]]. ده مقصود: بيانات خاصة باليوزر متتحفظش في Cache Storage.

---

## الخلاصة

| الاستراتيجية | بترد من | سؤال الشبكة | لمين |
|---|---|---|---|
| network-first | الشبكة، ولو فشلت الكاش | كل مرة | الـ HTML |
| cache-first | الكاش، ولو مش موجود الشبكة | أول مرة بس | ملفات بـ hash |
| stale-while-revalidate | الكاش فورًا | كل مرة في الخلفية | API عام، صور |
| مفيش [[respondWith]] | الشبكة عادي | | POST، origins تانية، بيانات اليوزر |

- [[clone()]] قبل [[put]]، و [[res.ok]] قبل الحفظ.
- [[fetch]] بيرمي error لما الشبكة تقع بس، مش مع 404.`,
          lines: [
            R`[[fetch]] بيتنادى على كل request بتطلبه أي صفحة تحت الـ scope (الصفحة نفسها، الصور، الـ CSS، الـ API). هنا بنقرر لكل request: نرد من الكاش ولا من الشبكة.`,
            R`[[e.request]]: الـ request نفسه (الـ URL والـ method والـ mode). بنحطه في متغير قصير لأننا هنقرا منه كتير وهنبعته للـ fetch والكاش زي ما هو.`,
            R`بنحوّل الـ URL النص لـ [[URL]] object عشان نقرا [[pathname]] و [[origin]] على طول بدل ما نقطّع النص بإيدنا.`,
            R`لو مش [[GET]] (زي POST) أو الـ request رايح لموقع تاني: [[return]] من غير [[respondWith]]، فالمتصفح يكمّل بالشبكة عادي. الكاش بيخزّن GET بس ([[cache.put]] بيرمي error مع POST)، وردود المواقع التانية ممكن تبقى opaque فمنعرفش هي نجحت ولا لأ.`,
            R`[[navigate]] يعني اليوزر بيفتح صفحة (HTML). network-first: هات الأحدث من الشبكة، والكاش احتياطي لما النت يقع، فاليوزر مش هيشوف صفحة قديمة طول ما النت شغال.`,
            R`ملفات [[/assets/]] اسمها فيه hash (زي [[app.3f9a.js]])، فلو المحتوى اتغير الاسم يتغير. يبقى أي نسخة في الكاش صح دايمًا، و cache-first بيرد فورًا من غير شبكة.`,
            R`API عام (داتا مش بتتغير كل ثانية ومش خاصة بيوزر): stale-while-revalidate يرد بالقديم فورًا ويحدّثه في الخلفية للمرة الجاية. متستخدمهاش مع داتا شخصية أو لازم تبقى لحظية، لأن اليوزر هيشوف نسخة متأخرة.`,
            R`نهاية الـ [[fetch]] listener. أي request مدخلش في الشروط دي بيروح الشبكة عادي، لأننا ما ندهناش [[respondWith]].`,
            R`network-first: جرّب الشبكة الأول، ولو فشلت ارجع للكاش. بتاخد الـ request وترجّع promise بالـ Response.`,
            R`افتح الكاش بتاعنا بالاسم اللي في [[CACHE]] (بيتعمل لو مش موجود)، عشان نحفظ فيه ونقرا منه.`,
            R`[[try]] لأن [[fetch]] بيرمي error لما مفيش نت خالص، وعايزين نمسك الحالة دي ونرد من الكاش بدل ما الصفحة تقع.`,
            R`هات الصفحة من الشبكة. خلي بالك: [[fetch]] مبيرميش على 404 أو 500، بيرمي بس لو الشبكة نفسها فشلت.`,
            R`احفظ نسخة في الكاش بس لو الرد ناجح ([[ok]] يعني 200 لـ 299)، عشان متحفظش صفحة error. و [[clone()]] لأن الـ body بيتقري مرة واحدة: نسخة للكاش ونسخة للصفحة.`,
            R`رجّع الرد الأصلي للصفحة، حتى لو 404: ده رد حقيقي من السيرفر واليوزر لازم يشوفه.`,
            R`وصلنا هنا يبقى [[fetch]] رمى: غالبًا مفيش نت. [[catch]] من غير متغير لأننا مش محتاجين الـ error نفسه.`,
            R`رجّع الصفحة من الكاش لو اتحفظت قبل كده، ولو مش موجودة ([[match]] رجّعت [[undefined]] فـ [[??]] تكمّل) رجّع [[offline.html]] اللي اتحفظت وقت الـ install، بدل صفحة error بتاعة المتصفح.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية [[networkFirst]].`,
            R`cache-first: دوّر في الكاش الأول، ومتروحش للشبكة إلا لو الملف مش موجود. أسرع استراتيجية، بس مناسبة بس للملفات اللي مبتتغيرش تحت نفس الاسم.`,
            R`[[caches.match]] بتدوّر في كل الكاشات مش كاش واحد، فتلاقي الملف حتى لو اتحفظ في الـ precache. بترجّع [[undefined]] لو ملقيتهوش.`,
            R`لقيناه: رد بيه فورًا من غير شبكة خالص، فده بيشتغل offline وبسرعة.`,
            R`مش في الكاش (أول مرة نطلبه): هاته من الشبكة. ولو مفيش نت هنا، الـ error يطلع والـ request يفشل، لأن مفيش حاجة نرد بيها.`,
            R`لو الرد سليم احفظ نسخة ([[clone]]) في كاشنا، فالمرة الجاية السطر اللي فوق يلاقيه.`,
            R`رجّع الرد الأصلي للصفحة.`,
            R`نهاية [[cacheFirst]].`,
            R`stale-while-revalidate: رد بالقديم فورًا، وفي نفس الوقت هات الجديد وحدّث الكاش. بتاخد [[e]] كمان عشان محتاجين [[waitUntil]].`,
            R`افتح كاشنا عشان نقرا منه ونحدّثه.`,
            R`دوّر على نسخة محفوظة من قبل. ممكن تبقى [[undefined]] لو دي أول مرة.`,
            R`ابدأ طلب الشبكة **من غير** [[await]]، فهو يكمّل في الخلفية واحنا نرد بالقديم على طول. [[fresh]] هنا promise بالرد الجديد.`,
            R`لما الجديد يوصل وهو سليم، حط نسخة منه في الكاش مكان القديمة، فالزيارة الجاية تاخد الأحدث.`,
            R`رجّع الرد الجديد من الـ [[then]]، فـ [[fresh]] يبقى promise بالـ Response. ده اللي هنستخدمه لو مفيش قديم.`,
            R`نهاية الـ [[then]].`,
            R`[[waitUntil]] بتقول للمتصفح «متقفلش الـ SW لحد ما التحديث ده يخلص»، وإلا ممكن يقفله بعد ما الرد يوصل للصفحة والكاش ميتحدّثش. و [[catch(() => {})]] عشان لو مفيش نت، الفشل ده ميطلعش unhandled rejection.`,
            R`لو فيه قديم رد بيه فورًا، ولو مفيش استنى الجديد. ولأن الدالة [[async]]، رجوع promise منها بيستنى نتيجته، فالاتنين بيوصلوا Response. ولو مفيش قديم والنت واقع، الـ request يفشل.`,
            R`نهاية [[staleWhileRevalidate]].`,
          ],
          sol: R`Offline: الصفحة اللي زرتها قبل كده بتفتح من الكاش (network-first فشل فرجع للكاش)، واللي مزرتهاش بيظهر مكانها [[offline.html]]. ولو مظهرتش ولا دي ولا دي، غالبًا [[offline.html]] مش في [[PRECACHE]] أو الـ install فشل.

في Network عمود Size بيقول «(ServiceWorker)» للـ requests اللي الـ SW رد عليها، وفي Chrome كمان بيظهر request تاني بترس ⚙ للـ fetch اللي الـ SW نفسه عمله للشبكة.

[[/api/me]] مش متكاش بقصد: بيانات خاصة، ولو اتحفظت في Cache Storage هتفضل موجودة بعد الـ logout ويشوفها أي حد يفتح الجهاز. ولو محتاجها offline، خزّنها في IndexedDB وامسحها في الـ logout.`
        },
        {
          cmd: "نسخة جديدة، حدّث",
          title: "تعمل زرار «فيه نسخة جديدة، حدّث» إزاي؟",
          desc: R`بدل skipWaiting أوتوماتيك (يكسر الصفحات المفتوحة) أو الاستنى لحد ما اليوزر يقفل كل التابات (ممكن أيام): اسأله. الصفحة تعرف إن فيه SW جديد في حالة waiting، فتظهر شريط «فيه نسخة جديدة» وزرار. لما يضغط، الصفحة تبعت للـ SW رسالة [["SKIP_WAITING"]] (الـ listener اللي عملناه في درس دورة الحياة)، والـ SW يتفعّل، والصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

الحالتين اللي لازم تمسكهم: SW جديد بيتسطّب دلوقتي ([[updatefound]] ثم [[statechange]] لـ [["installed"]])، و SW كان مستني من قبل ما الصفحة تفتح ([[reg.waiting]] موجود من الأول).`,
          example: R`// في app.js (type="module" عشان top-level await)
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
setInterval(() => reg.update(), 60 * 60 * 1000);`,
          try: R`ضيف [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] في الصفحة، وشيل [[skipWaiting()]] من الـ install لو موجودة (خليها في الـ message بس). غيّر [[CACHE]] في sw.js، واعمل refresh: الشريط ظهر؟ اضغط «حدّث». وبعدين افتح الموقع في تابين وحدّث من واحد: التاني عمل إيه؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني الـ toast بتاع التحديث: مخفي من الأول، فيه «حدّث» و «بعدين». «بعدين» بيخفيه لحد ما نسخة أجدد تيجي ([[updatefound]] تاني)، و «حدّث» بيعطّل نفسه بعد أول ضغطة عشان متتبعتش رسالتين.`, done: R`الـ toast بيظهر بعد ما تغيّر [[sw.js]] وتعمل refresh، و «بعدين» بيخفيه و refresh عادي مبيرجّعوش، والضغط مرتين بسرعة على «حدّث» بيعمل reload مرة واحدة، وبعد الـ reload [[reg.waiting]] بـ [[null]].` },
            { lvl: 'تطبيق', t: R`اشرحها: ارسم الخطوات من «غيّرت sw.js» لحد «الصفحة عملت reload» بأسماء الأحداث ([[updatefound]] و [[statechange]] و [[postMessage]] و [[controllerchange]]...) ومين بيعملها (الصفحة ولا الـ SW). وبعدين حط [[console.log]] في كل خطوة (فعّل Preserve log) وقارن.`, done: R`كل حدث في رسمتك ظهر في اللوج (وحالات الـ worker: [[installing]] ثم [[installed]] ثم [[activating]] ثم [[activated]])، ولو الترتيب اختلف عن رسمتك كتبت ليه، وتقدر تشرح الرسمة لزميل في دقيقة.` },
            { lvl: 'تحدي', t: R`محاكاة يوزر عنده ٣ تابات: افتح الموقع ٣ مرات، وغيّر [[sw.js]]، واعمل refresh في واحد بس، واضغط «حدّث» منه. صلّح أي تاب بيعمل reload أكتر من مرة.`, done: R`الشريط بيظهر في التلات تابات، والضغط من تاب واحد بيعمل reload للتلاتة مرة واحدة لكل تاب، ومفيش reload loop حتى لو [[controllerchange]] اتنادى أكتر من مرة، وبعدها Application ← Service workers فيه worker واحد بس activated.` },
          ],
          flag: "script",
          deep: {
            why: "ده الحل المتوازن لمشكلة waiting: اليوزر بياخد التحديث بسرعة، ومفيش صفحة بتتكسر في النص، ومفيش reload فجأة وهو بيكتب. وكل مكتبات الـ PWA (vite-plugin-pwa و Workbox و Serwist) بتقدّم نفس الـ pattern جاهز.",
            how: R`[[navigator.serviceWorker.controller]] بيبقى null في أول زيارة خالص (مفيش SW بيتحكم لسه). من غيره، أول تسطيب هيطلّع «نسخة جديدة» وده غلط: دي أول نسخة.

[[updatefound]] بيتنادى لما المتصفح يلاقي sw.js اتغير ويبدأ يسطّبه، و [[reg.installing]] هو الـ worker الجديد. لما حالته تبقى [["installed"]] وفيه controller قديم، يبقى هو في waiting.

لما اليوزر يضغط: [[postMessage("SKIP_WAITING")]] ← الـ SW الجديد ينادي [[skipWaiting()]] ← activate ← (و [[clients.claim()]] لو موجودة) ← كل التابات المفتوحة تاخد [[controllerchange]] ← reload. عشان كده التاب التاني بيعمل reload هو كمان. الـ [[reloading]] flag بيمنع reload مرتين (في DevTools مع «Update on reload» ممكن يحصل loop).

[[reg.update()]] كل ساعة للتطبيقات اللي بتفضل مفتوحة أيام (dashboard على شاشة)، لأن الفحص التلقائي بيحصل مع التنقل بس.

صفحة الـ offline: [[offline.html]] في الـ PRECACHE، ترد بيها في network-first لما الـ fetch يفشل ومفيش نسخة (الدرس اللي فات). خليها صفحة لوحدها بـ CSS inline ومن غير JS خارجي، عشان مش هتلاقي حاجة تانية من غير نت.`,
            when: R`أي PWA بـ cache-first لملفات الـ JS. و autoUpdate (skipWaiting دايمًا) بس لو الموقع network-first أو static بسيط (زي الموقع ده).`,
            mistakes: R`تنسى فحص controller فيظهر الشريط أول زيارة. وتنسى [[reg.waiting]] عند فتح الصفحة فاللي فتح بعد ما التحديث اتسطب مش هيشوف الشريط. و reload في controllerchange من غير flag. وتنسى إن [[clients.claim()]] بيطلّع controllerchange في أول زيارة كمان فيحصل reload زيادة (ابدأ الـ flag بـ [[!navigator.serviceWorker.controller]]). و reload وهو في نص فورم: احفظ المسودة الأول أو خلي الزرار هو اللي يبدأ الـ reload بس.`
          },
          teach: R`## الفكرة في سطر

الصفحة بتراقب: لو فيه SW جديد واقف في waiting، تظهر شريط. اليوزر يضغط ← الصفحة تبعت [["SKIP_WAITING"]] ← الـ SW الجديد يتفعّل ← الصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node على localhost: [[index.html]] فيه [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] و [[<script type="module" src="/app.js">]]، و [[app.js]] هو المثال بالظبط، و [[sw.js]] من درس دورة الحياة من غير [[skipWaiting]] في الـ install (فيه [[clients.claim()]] في الـ activate والـ message listener).

---

## ١. التسجيل

~~~text app.js
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
~~~

- [[await]] برّه أي دالة (top-level await) مسموح بس في module، عشان كده [[type="module"]] في الـ script.
- [[reg]]: الـ ServiceWorkerRegistration. فيه [[reg.installing]] و [[reg.waiting]] و [[reg.active]]، كل واحد worker أو [[null]].

---

## ٢. دالة إظهار الشريط

~~~text app.js
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
~~~

- [[bar.hidden = false]]: شيل الـ attribute [[hidden]] فالشريط يظهر.
- [[onclick = ...]]: لما الزرار يتضغط. بنستخدم [[onclick]] مش [[addEventListener]] عشان لو الدالة اتنادت مرتين، الـ handler يتبدّل بدل ما يتكرر.
- [[worker.postMessage("SKIP_WAITING")]]: ابعت الرسالة للـ worker **الجديد** ده بالذات (مش للـ controller القديم). جوه [[sw.js]] الـ message listener بينادي [[skipWaiting()]].

---

## ٣. الحالتين اللي بنمسكهم

### كان مستني من قبل ما الصفحة تفتح

~~~text app.js
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
~~~

- [[reg.waiting]]: فيه نسخة متسطّبة ومستنية.
- [[navigator.serviceWorker.controller]]: الـ SW اللي بيتحكم في الصفحة دي. [[null]] في أول زيارة خالص، فالشرط ده بيمنع «نسخة جديدة» في أول مرة.
- [[&&]]: الاتنين لازم يبقوا موجودين.

### بيتسطّب دلوقتي

~~~text app.js
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
~~~

1. [[updatefound]]: المتصفح لقى [[sw.js]] اتغير وبدأ يسطّبه.
2. [[reg.installing]]: الـ worker الجديد، حالته [["installing"]].
3. [[statechange]]: كل ما حالته تتغير: [[installing]] ← [[installed]] ← [[activating]] ← [[activated]] (أو [[redundant]] لو فشل).
4. [["installed"]] وفيه controller قديم = هو في waiting، فاعرض الشريط.

---

## ٤. الـ reload

~~~text app.js
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
~~~

- [[controllerchange]]: الـ SW اللي بيتحكم في الصفحة اتغير. بيحصل في **كل** التابات المفتوحة.
- [[reloading]]: flag عشان نعمل reload مرة واحدة حتى لو الـ event جه مرتين.
- [[location.reload()]]: حمّل الصفحة من جديد، فتيجي الملفات الجديدة.

---

## ٥. الفحص الدوري

~~~text app.js
setInterval(() => reg.update(), 60 * 60 * 1000);
~~~

- [[setInterval(fn, ms)]]: نادي الدالة كل كذا millisecond.
- [[60 * 60 * 1000]]: 60 دقيقة × 60 ثانية × 1000 ms = 3600000 = ساعة.
- [[reg.update()]]: روح شوف [[sw.js]] اتغير ولا لأ دلوقتي. لو اتغير بيبدأ install، فـ [[updatefound]] يتنادى.

---

## ٦. اللي حصل لما شغّلته

فتحت تاب A، وبعدين غيّرت [[CACHE]] في [[sw.js]] لـ [["v2"]]، وفتحت تاب B، وضغطت الزرار في A. وعدّيت مرات تحميل كل تاب:

~~~text الناتج
أول زيارة: الشريط مخفي controller: true
refresh: الشريط مخفي
بعد v2 + refresh: الشريط ظاهر
تاب B اتفتح بعد التحديث: الشريط ظاهر (reg.waiting: true)
loads قبل: {"A":4,"B":1} بعد الضغط: {"A":5,"B":2}
caches: ["v2"] bar A: مخفي bar B: مخفي
~~~

- **أول زيارة:** الشريط مخفي بسبب شرط الـ controller.
- **بعد v2:** [[updatefound]] ← [[statechange]] لـ [["installed"]] ← الشريط ظهر.
- **تاب B:** اتفتح والـ SW الجديد كان واقف في waiting، فالشرط الأولاني ([[reg.waiting]]) هو اللي ظهّر الشريط. من غير السطر ده B مكانش هيعرف.
- **بعد الضغط في A:** كل تاب اتحمّل **مرة واحدة زيادة بالظبط** (A من 4 لـ 5، و B من 1 لـ 2)، والكاش القديم اتمسح.

### مفاجأة: reload زيادة في أول زيارة

ليه A اتحمّل 4 مرات قبل الضغط مع إننا عملنا goto و refresh مرتين بس (3)؟ قِست أول زيارة لوحدها:

~~~text الناتج
loads after first visit: 2 2 x GET /
~~~

في أول زيارة الصفحة اتفتحت من غير controller، وبعدين الـ SW عمل [[clients.claim()]] فالـ controller اتغير من [[null]] لـ SW، فـ [[controllerchange]] اتنادى وعمل reload مش محتاجينه. الحل: ابدأ الـ flag بـ true لو مفيش controller أصلًا:

~~~text app.js
let reloading = !navigator.serviceWorker.controller;
~~~

~~~text الناتج بعد التعديل
loads after first visit: 1 1 x GET /
~~~

وباقي السيناريو اشتغل زي ما هو (الشريط ظهر في A و B، وكل تاب اتحمّل مرة واحدة بعد الضغط). الثمن: الصفحة اللي اتفتحت أول زيارة مش هتعمل reload لوحدها لو جه تحديث وهي لسه مفتوحة، وده مقبول (هتاخده المرة الجاية).

---

## الخلاصة

| الحدث | معناه | بنعمل إيه |
|---|---|---|
| [[reg.waiting]] عند الفتح | نسخة مستنية من قبل | اعرض الشريط |
| [[updatefound]] ← [["installed"]] | نسخة اتسطّبت دلوقتي | اعرض الشريط |
| ضغطة الزرار | اليوزر وافق | [[postMessage("SKIP_WAITING")]] للجديد |
| [[controllerchange]] | الجديد استلم | reload مرة واحدة |

- شرط [[controller]] بيفرّق أول زيارة عن التحديث.
- [[clients.claim()]] بيطلّع [[controllerchange]] في أول زيارة كمان، فخلي بالك من reload زيادة.
- كل التابات بتعمل reload مع بعض، لأن الـ SW واحد للـ origin كله.`,
          lines: [
            R`سجّل الـ SW واستنى الـ registration object، اللي منه هنعرف لو فيه نسخة مستنية أو جديدة بتتسطّب. [[await]] برّه دالة محتاج الملف يتحمّل كـ module ([[type="module"]]).`,
            R`الشريط اللي هيقول «فيه نسخة جديدة» وفيه زرار. بيبدأ [[hidden]] في الـ HTML ومش هيظهر إلا لما يبقى فيه تحديث فعلًا.`,
            R`دالة بتظهر الشريط وتربط الزرار بالـ worker الجديد اللي مستني. بتاخد الـ worker عشان الزرار يبعتله هو بالذات.`,
            R`اظهر الشريط: [[hidden = false]] بتشيل الـ attribute فيبان.`,
            R`لما اليوزر يدوس، ابعت [[SKIP_WAITING]] للـ worker الجديد، فهو ينادي [[skipWaiting()]] ويتفعّل. [[onclick]] مش [[addEventListener]]، عشان لو الدالة اتندهت مرتين الزرار ميبقاش عليه اتنين listeners.`,
            R`نهاية [[showUpdate]].`,
            R`الحالة الأولى: الصفحة فتحت وفيه بالفعل نسخة مستنية من قبل ([[reg.waiting]])، فاعرض الشريط على طول. و [[controller]] بيتأكد إن فيه SW شغال بيتحكم في الصفحة دلوقتي؛ لو مفيش (زي أول زيارة) يبقى مفيش نسخة قديمة نحدّثها.`,
            R`الحالة التانية: [[updatefound]] يعني المتصفح لقى إن [[sw.js]] اتغير وبدأ يسطّب النسخة الجديدة والصفحة مفتوحة.`,
            R`[[reg.installing]]: الـ worker الجديد اللي لسه بيتسطّب. بنحفظه في متغير عشان نتابعه، لأنه لسه مخلصش install.`,
            R`[[statechange]] بيتنادى كل ما حالة الـ worker تتغير ([[installing]] ثم [[installed]] ثم [[activating]] ثم [[activated]])، فبنستنى اللحظة الصح نظهر فيها الشريط.`,
            R`لما يبقى [[installed]] وفيه SW قديم بيتحكم في الصفحة، يبقى الجديد واقف في waiting: اعرض الشريط. من غير شرط [[controller]] الشريط كان هيظهر في أول زيارة خالص، ومفيش حاجة قديمة نحدّثها.`,
            R`نهاية الـ [[statechange]] listener.`,
            R`نهاية الـ [[updatefound]] listener.`,
            R`علامة إننا عملنا reload. محتاجينها لأن [[controllerchange]] ممكن يتنادى أكتر من مرة (زي لما DevTools يبقى عليه «Update on reload»)، ومن غيرها الصفحة تدخل في reload ورا reload.`,
            R`[[controllerchange]]: الـ SW اللي بيتحكم في الصفحة اتغير، يعني الجديد اتفعّل بعد [[skipWaiting]] و [[clients.claim]]. الصفحة دلوقتي شغالة بـ JS قديم مع SW جديد، فلازم reload.`,
            R`لو عملنا reload خلاص، اخرج ومتعملش تاني.`,
            R`علّم إننا بدأنا الـ reload قبل ما ننديه، فأي نداء تاني يقف عند السطر اللي فوق.`,
            R`حمّل الصفحة من جديد، فتيجي الـ HTML والـ JS من النسخة الجديدة اللي الـ SW الجديد بيقدّمها.`,
            R`نهاية الـ [[controllerchange]] listener.`,
            R`المتصفح بيفحص [[sw.js]] لوحده لما اليوزر يفتح صفحة، بس اللي سايب التاب مفتوح أيام مش بيفتح صفحات جديدة. [[reg.update()]] كل ساعة بتفحص بإيدك، ولو لقت نسخة جديدة [[updatefound]] يتنادى والشريط يظهر.`,
          ],
          sol: R`بعد تغيير [[CACHE]] والـ refresh: الـ SW الجديد بيتسطّب ويقف في waiting، فالشريط بيظهر. الضغط على «حدّث» بيعمل reload واحد، والصفحة بقت تحت الـ SW الجديد (Application ← Service workers بيعرض واحد بس activated).

في التابين: التاني بيعمل reload لوحده في نفس اللحظة، لأن الـ SW واحد لكل الـ origin، ولما اتغير كل التابات خدت [[controllerchange]]. ده غالبًا اللي انت عايزه (مفيش تاب شغال بنسخة قديمة مع SW جديد)، بس لو فيه تاب فيه فورم نصه مكتوب، احفظ المسودة قبل الـ reload (درس visibilitychange).

ولو الشريط ظهر في أول زيارة خالص: نسيت شرط [[navigator.serviceWorker.controller]].`
        },
        {
          cmd: "vite-plugin-pwa و Serwist",
          title: "تعمل PWA في مشروع Vite أو Next.js من غير ما تكتب SW بإيدك",
          desc: R`كتابة SW بإيدك مفيدة عشان تفهم، بس في المشاريع الحقيقية فيه مشكلة: الـ build بيطلّع ملفات بأسماء فيها hashes بتتغير كل مرة، ولازم قايمة الـ precache تبقى مظبوطة. الأدوات بتعمل ده لوحدها: بتولّد القايمة من الـ build وبتحطها في الـ SW، وبتدّيك الاستراتيجيات والـ update prompt جاهزين. الاتنين مبنيين على أفكار Workbox بتاعة Google.

Vite (React أو Vue أو أي حاجة): [[vite-plugin-pwa]]. بتضيف [[VitePWA({...})]] في [[vite.config]] بالـ manifest، و [[registerType: "prompt"]] للزرار أو [[autoUpdate]]، وفي الكود [[registerSW]] من [[virtual:pwa-register]] (أو [[useRegisterSW]] من [[virtual:pwa-register/react]]).

Next.js: [[Serwist]] (fork من Workbox بيتطور). بتكتب [[app/sw.ts]] صغير بـ [[new Serwist({...})]]، وبتلف الـ config بـ [[withSerwistInit]] من [[@serwist/next]]. ولـ Turbopack فيه [[@serwist/turbopack]] بطريقة setup مختلفة شوية (route handler)، فبص على الـ docs بتاعة النسخة اللي عندك.`,
          example: R`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
    }),
  ],
});
// src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});`,
          try: R`اعمل [[npm create vite@latest pwa-lab -- --template react-ts]]، و [[npm i -D vite-plugin-pwa]]، وحط الـ config ده، و [[import "./pwa"]] في [[main.tsx]]. اعمل [[npm run build]] و [[npm run preview]] (الـ SW مش بيشتغل في [[dev]] افتراضيًا). بص على [[dist/sw.js]]: فيه أسماء ملفاتك؟ غيّر أي نص في App، واعمل build و preview تاني، واعمل refresh: الـ confirm ظهر؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني في [[pwa.ts]] شريط بدل الـ [[confirm]]: [[onNeedRefresh]] بيظهر شريط فيه «حدّث» بينادي [[updateSW(true)]]، و [[onOfflineReady]] بيظهر toast «الموقع جاهز من غير نت» ويختفي بعد ٣ ثواني.`, done: R`بعد أول [[npm run build]] و [[npm run preview]] الـ toast بيظهر مرة واحدة ويختفي لوحده، وبعد ما تغيّر نص في App وتعمل build تاني و refresh الشريط بيظهر، و «حدّث» بيجيب النص الجديد.` },
            { lvl: 'تطبيق', t: R`دوّر بنفسك في docs بتاعة vite-plugin-pwa و Workbox: إزاي تعمل [[runtimeCaching]] لـ [[/api/]] بـ NetworkFirst، واسم الكاش [[api]]، وحد أقصى ٥٠ entry، وتسيب الـ network ياخد ٣ ثواني بالكتير؟ اكتبها من غير ما تنسخ مثال جاهز.`, done: R`الـ config فيه [[urlPattern]] و [[handler: "NetworkFirst"]] وجوه [[options]]: [[cacheName: "api"]] و [[expiration: { maxEntries: 50 }]] و [[networkTimeoutSeconds: 3]]، والـ build بيعدّي، و Cache storage فيه كاش [[api]] بعد أول نداء، و Offline الصفحة بتعرض آخر داتا جت.` },
            { lvl: 'تحدي', t: R`صلّح باج: في SPA فيه [[navigateFallback]]، لينك [[/api/export.csv]] بيرجّع [[index.html]] بدل الملف، حتى Online (الـ NavigationRoute بيرد من الـ precache على أي navigation). صلّحها بـ [[navigateFallbackDenylist]] لـ [[/api/]] و [[/admin/]].`, done: R`Offline، refresh على [[/settings]] لسه بيفتح التطبيق، و [[/api/export.csv]] بيروح للشبكة (فبينزّل الملف Online وبيفشل Offline) ومبيرجّعش HTML، و [[dist/sw.js]] فيه الـ regex بتاع الـ denylist، وتقدر تقول ليه رجوع [[index.html]] لـ API كان هيبقى bug صعب تلاقيه.` },
          ],
          flag: "script",
          deep: {
            why: "الـ SW بإيدك مع build tool حديث معناه إنك لازم كل مرة تعرف أسماء الملفات الجديدة وتحدّث القايمة وتتأكد إن مفيش حاجة ناقصة. غلطة واحدة = install بيفشل أو يوزرز عالقين. الأدوات دي بتشيل ده، وبتسيبلك انت القرارات: prompt ولا auto، وإيه اللي يتكاش.",
            how: R`vite-plugin-pwa بعد الـ build بيلف على [[dist/]] ويطابق [[globPatterns]]، ويعمل قايمة [[{ url, revision }]] (الـ revision hash للمحتوى)، ويولّد [[sw.js]] بـ Workbox فيه القايمة دي كـ precache. أي ملف اتغير = revision جديد = sw.js اتغير = تحديث. و [[registerType: "prompt"]] معناه الـ SW مش بيعمل skipWaiting لوحده، و [[onNeedRefresh]] بتتنادى لما يبقى فيه واحد waiting (نفس اللي عملناه بإيدنا في الدرس اللي فات)، و [[updateSW(true)]] بتبعت skipWaiting وتعمل reload.

و [[navigateFallback]] (افتراضيًا index.html في الـ SPA) بيخلي أي navigation من غير نت يرد بالـ index.html المتكاش، فالراوتر بتاعك يكمّل. وفيه وضع [[injectManifest]] لو عايز تكتب الـ SW بنفسك وهو يحقن القايمة بس.

Serwist في Next: [[self.__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الـ precache، و [[defaultCache]] فيه استراتيجيات معقولة لكل نوع (صفحات، RSC payloads، صور، خطوط)، و [[fallbacks]] لصفحة offline ([[/~offline]] في الـ docs). وفي Next الـ HTML ممكن يكون ديناميك، فخلي بالك إيه اللي بيتكاش.

والأيقونات: [[@vite-pwa/assets-generator]] بيولّد كل المقاسات (ومنها maskable و apple-touch-icon) من SVG واحد.`,
            when: R`أي مشروع Vite أو Next عايزه PWA. الـ SW بإيدك لمواقع static صغيرة من غير build (زي الموقع ده)، أو لما تحتاج تحكم كامل (وقتها injectManifest).`,
            mistakes: R`تجرّب في [[npm run dev]] وتستغرب إن مفيش SW (فعّل [[devOptions: { enabled: true }]] لو محتاج). و [[autoUpdate]] مع تطبيق فيه فورمز طويلة. و globPatterns بتاخد ملفات ضخمة (فيديو، source maps) فالـ install ياخد ميجات. وتنسى إن النسخة القديمة من Workbox في الـ SW القديم لسه شغالة عند اليوزرز لحد ما يتحدثوا.`
          },
          teach: R`## الفكرة في سطر

بدل ما تكتب [[sw.js]] بإيدك، بتضيف plugin في [[vite.config.ts]]، وهو وقت الـ build بيولّد الـ manifest والـ SW وقايمة الملفات اللي تتحفظ. وفي الكود بتنادي [[registerSW]] وتقول هتعمل إيه لما تيجي نسخة جديدة.

جرّبته فعلًا: [[npm create vite@latest pwa-lab -- --template react-ts]] (طلع Vite 8.3) و [[npm i -D vite-plugin-pwa]] (طلع 2.0.0)، والـ config ده بالظبط، و [[import "./pwa"]] أول سطر في [[src/main.tsx]]، و ٣ أيقونات PNG في [[public/]]. وبعدين [[npm run build]] و [[vite preview]] وفتحته في Chrome headless (playwright-core، بروفايل مؤقت). Serwist و Next.js مجرّبتهمش هنا: الكلام عنهم من الـ docs بتاعتهم.

---

## ١. [[vite.config.ts]]: الـ imports

~~~text vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
~~~

- [[defineConfig]]: دالة بترجّع الـ object زي ما هو، فايدتها إن الـ editor يكمّلك أسماء الإعدادات.
- [[react]]: الـ plugin بتاع React (JSX و Fast Refresh). كان موجود في الـ template.
- [[{ VitePWA }]]: الأقواس يعني named import: هات الحاجة اللي اسمها [[VitePWA]] بس من الـ package.

## ٢. إعدادات الـ plugin

~~~text vite.config.ts
VitePWA({
  registerType: "prompt",
  includeAssets: ["favicon.svg", "apple-touch-icon.png"],
  manifest: { name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430", icons: [...] },
  workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
}),
~~~

| الإعداد | معناه |
|---|---|
| [[registerType: "prompt"]] | الـ SW الجديد يستنى في waiting لحد ما الكود بتاعك يقول (التاني [[autoUpdate]]: يتفعّل لوحده) |
| [[includeAssets]] | ملفات من [[public/]] تدخل الـ precache حتى لو مش متوصّل بيها من الكود |
| [[manifest]] | نفس حقول [[manifest.webmanifest]] (الدرس الأول)، والـ plugin بيكتب الملف |
| [[workbox.globPatterns]] | أنواع الملفات من [[dist/]] اللي تتحفظ |

### الـ glob

[[**/*.{js,css,html,svg,png,woff2}]]:

- [[**/]]: أي فولدر بأي عمق.
- [[*]]: أي اسم ملف.
- [[{js,css,...}]]: واحد من الامتدادات دي.

## ٣. الـ build

~~~text الناتج (npm run build، مختصر)
dist/manifest.webmanifest                          0.31 kB
dist/index.html                                    0.50 kB
dist/assets/index-D64VDMd1.css                     4.10 kB
dist/assets/workbox-window.prod.es5-Bd17z0YL.js    5.65 kB
dist/assets/index-Dt7RnCgD.js                    225.14 kB
✓ built in 407ms

PWA v2.0.0
mode      generateSW
precache  17 entries (272.23 KiB)
files generated
  dist/sw.js
  dist/workbox-2fbc6a65.js
~~~

- [[mode generateSW]]: الـ plugin كتب الـ SW كله لوحده (التاني [[injectManifest]]: انت تكتبه وهو يحقن القايمة بس).
- [[precache 17 entries]]: ١٧ ملف هيتحفظوا في الـ install.
- [[D64VDMd1]] و [[Dt7RnCgD]]: الـ hash بتاع المحتوى في الاسم. أي تعديل = اسم جديد.

وأضاف لوحده سطر الـ manifest في [[dist/index.html]]:

~~~text dist/index.html
<link rel="manifest" href="/manifest.webmanifest"></head>
~~~

### جوه [[dist/sw.js]] (مختصر)

~~~text dist/sw.js
self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),
e.precacheAndRoute([{url:"index.html",revision:"82654995126a90ce03408e36429fb177"},
  {url:"assets/index-Dt7RnCgD.js",revision:null}, ...]),
e.cleanupOutdatedCaches(),
e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))
~~~

ده نفس اللي عملناه بإيدنا في الدروس اللي فاتت:

| السطر | يقابل إيه بإيدنا |
|---|---|
| [[message]] و [[SKIP_WAITING]] | الـ message listener. بس هنا الرسالة object فيه [[type]]، مش string |
| [[precacheAndRoute([...])]] | [[PRECACHE]] و [[addAll]] و cache-first ليهم |
| [[revision: null]] | الاسم فيه hash، فالاسم لوحده كفاية |
| [[revision: "8265..."]] | [[index.html]] اسمه ثابت، فالـ hash بتاع المحتوى هنا |
| [[cleanupOutdatedCaches()]] | مسح الكاش القديم في activate |
| [[NavigationRoute(... "index.html")]] | أي صفحة (navigate) ترد بـ [[index.html]] المتكاش، فالراوتر بتاع React يكمّل |

> لاحظت إن [[favicon.svg]] و [[apple-touch-icon.png]] والأيقونتين طلعوا مرتين في القايمة: مرة من [[includeAssets]] ومرة من [[globPatterns]] (لأنهم بيتنسخوا لـ [[dist/]]). التسطيب عدّى عادي (نفس الـ URL بنفس الـ revision مش مشكلة)، بس ده بيوضّح إن [[includeAssets]] مش محتاجه لو الـ glob بيغطي الملفات دي.

---

## ٤. [[src/pwa.ts]]

~~~text src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});
~~~

- [["virtual:pwa-register"]]: مفيش ملف بالاسم ده. الـ plugin بيعمله وقت الـ build (virtual module).
- [[registerSW({...})]]: بيسجّل [[/sw.js]] وبيتابع الحالات اللي عملناها بإيدنا (waiting و updatefound). بيرجّع دالة شايلناها في [[updateSW]].
- [[onNeedRefresh]]: فيه نسخة في waiting (بتاع الشريط في الدرس اللي فات).
- [[confirm(...)]]: dialog فيه OK و Cancel، بيرجّع true أو false.
- [[updateSW(true)]]: ابعت [[SKIP_WAITING]] واعمل reload لما الجديد يستلم.
- [[onOfflineReady]]: أول تسطيب خلص والملفات اتحفظت.

### أول error

أول [[npm run build]] وقع قبل Vite نفسه، في [[tsc]]:

~~~text الناتج
src/pwa.ts(1,28): error TS2307: Cannot find module 'virtual:pwa-register' or its corresponding type declarations.
~~~

TypeScript ميعرفش الـ virtual module. الحل إنك تضيف الـ types بتاعته في [[tsconfig.app.json]]:

~~~text tsconfig.app.json
"types": ["vite/client", "vite-plugin-pwa/client"],
~~~

(أو سطر [[/// <reference types="vite-plugin-pwa/client" />]] في ملف [[.d.ts]].) بعدها الـ build عدّى.

---

## ٥. اللي حصل في المتصفح

شغّلت [[vite preview --port 4789]] وفتحت الصفحة، وبعدين غيّرت [[<h1>]] في [[App.tsx]] لـ «نسخة 2» وعملت build تاني وrefresh:

~~~text الناتج
console: الموقع جاهز يشتغل من غير نت
h1: Get started
dialog: confirm فيه نسخة جديدة، تحدّث؟
h1 بعد: نسخة 2 loads: 3
offline /any/route h1: نسخة 2
~~~

1. أول فتح: [[onOfflineReady]] اتنادت.
2. بعد الـ build الجديد والـ refresh: [[onNeedRefresh]] اتنادت وظهر الـ confirm. ضغطت OK.
3. الصفحة عملت reload لوحدها وبقت «نسخة 2». ([[loads: 3]] = الفتح الأول، والـ refresh، والـ reload بعد OK.)
4. من غير نت، [[/any/route]] (مسار مش موجود كملف) فتح عادي، بسبب الـ [[NavigationRoute]].

> ليه [[preview]] مش [[dev]]؟ الـ docs بتقول إن الـ SW مش بيتولّد في [[npm run dev]] إلا لو فعّلت [[devOptions: { enabled: true }]]. وفي [[dev]] مفيش [[dist/]] أصلًا.

---

## ٦. Next.js و Serwist (من الـ docs)

نفس الفكرة: [[withSerwistInit]] من [[@serwist/next]] بيلف [[next.config]]، وانت بتكتب [[app/sw.ts]] فيه [[new Serwist({ precacheEntries: self.__SW_MANIFEST, ... })]]. الـ [[__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الملفات، زي القايمة اللي شوفناها في [[dist/sw.js]] فوق.

---

## الخلاصة

| بإيدك (الدروس اللي فاتت) | vite-plugin-pwa |
|---|---|
| [[manifest.webmanifest]] | [[manifest: {...}]] في الـ config |
| [[PRECACHE]] بإيدك | بيتولّد من [[dist/]] بـ [[globPatterns]] |
| تغيّر [[CACHE]] كل release | الـ revisions بتتغير لوحدها |
| شريط و [[postMessage]] و [[controllerchange]] | [[onNeedRefresh]] و [[updateSW(true)]] |

- جرّب بـ [[build]] و [[preview]]، مش [[dev]].
- مع TypeScript ضيف [[vite-plugin-pwa/client]] للـ types.`,
          lines: [
            R`[[defineConfig]] من Vite: بترجّع الـ config زي ما هو، وفايدتها إن المحرر يعرف شكل الـ config فيكمّلك الأسامي ويعلّم على أي خاصية غلط.`,
            R`plugin الـ React الرسمي لـ Vite: بيحوّل JSX وبيشغّل Fast Refresh في الـ dev. مالوش علاقة بالـ PWA، موجود لأن ده config مشروع React عادي.`,
            R`[[VitePWA]]: الـ plugin اللي بيولّد [[sw.js]] و [[manifest.webmanifest]] وقت الـ build، بدل ما تكتبهم بإيدك زي الدروس اللي فاتت.`,
            R`الـ config نفسه، و [[export default]] لأن Vite بيدوّر على الـ default export في [[vite.config.ts]].`,
            R`ليستة الـ plugins اللي Vite هيشغّلهم وقت الـ dev والـ build.`,
            R`شغّل plugin الـ React بالإعدادات الافتراضية.`,
            R`شغّل plugin الـ PWA، وكل اللي جوه الـ object ده إعداداته.`,
            R`[[prompt]]: لما تنزل نسخة جديدة، الـ SW الجديد يفضل waiting ويستنى اليوزر يوافق (هتشوف [[onNeedRefresh]] تحت). البديل [[autoUpdate]] بيحدّث ويعمل reload لوحده، وده ممكن يضيّع على اليوزر حاجة كان بيكتبها في فورم.`,
            R`ملفات من فولدر [[public/]] بنقول للـ plugin يضمها صراحة للـ precache، زي الـ favicon و [[apple-touch-icon]] اللي iOS بيستخدمها للشاشة الرئيسية، فتفضل موجودة من غير نت.`,
            R`[[manifest]]: نفس حقول [[manifest.webmanifest]] من الدرس الأول بس كـ object. الـ plugin بيكتب منه الملف وقت الـ build ويضيف الـ link بتاعه في الـ HTML لوحده.`,
            R`الاسم الكامل والقصير، واللغة عربي، والاتجاه من اليمين، ولون شريط النظام. نفس معنى الحقول في درس [[manifest.webmanifest]] بالظبط.`,
            R`ليستة الأيقونات اللي هتتكتب في الـ manifest. الصور نفسها لازم تبقى موجودة في [[public/]]؛ الـ plugin بيكتب أساميها بس، مش بيعملها.`,
            R`أيقونة 192×192 للشاشة الرئيسية. Chrome محتاج 192 و 512 عشان يسمح بالتسطيب.`,
            R`أيقونة 512×512 لشاشة البداية والشاشات عالية الدقة.`,
            R`نهاية ليستة [[icons]].`,
            R`نهاية [[manifest]].`,
            R`[[workbox]]: إعدادات Workbox اللي بيولّد الـ SW. [[globPatterns]] بتحدد أنهي ملفات من [[dist/]] تدخل الـ precache. لو نسيت امتداد (زي [[woff2]] للخطوط)، الملفات دي مش هتتحفظ والموقع يفتح offline من غيرها.`,
            R`نهاية إعدادات [[VitePWA]].`,
            R`نهاية ليستة الـ [[plugins]].`,
            R`نهاية [[defineConfig]] وآخر [[vite.config.ts]].`,
            R`[[virtual:pwa-register]]: module مش موجود كملف عندك؛ الـ plugin بيولّده وفيه كود التسجيل ومتابعة التحديثات اللي كتبناه بإيدنا في درس «نسخة جديدة، حدّث». مع TypeScript ضيف [[vite-plugin-pwa/client]] للـ types عشان يتعرف عليه.`,
            R`[[registerSW]] بتسجّل الـ SW وبتنادي الدوال اللي تحت لما يحصل حاجة، وبترجّع دالة [[updateSW]] اللي بنفعّل بيها النسخة الجديدة.`,
            R`[[onNeedRefresh]]: بتتنادى لما نسخة جديدة اتسطّبت وواقفة waiting. نفس اللحظة اللي كنا بنظهر فيها الشريط بإيدنا.`,
            R`اسأل اليوزر. لو وافق، [[updateSW(true)]] بتخلي الـ SW الجديد يعمل skipWaiting وتعمل reload للصفحة. [[confirm]] هنا للتبسيط؛ في تطبيق حقيقي اعمل شريط مش بيوقف الصفحة.`,
            R`نهاية [[onNeedRefresh]].`,
            R`[[onOfflineReady]]: بتتنادى بعد أول تسطيب لما الـ precache يخلص، يعني كل الملفات اتحفظت والموقع يقدر يفتح من غير نت.`,
            R`بلّغ إن الموقع جاهز offline. في تطبيق حقيقي اعرض رسالة صغيرة لليوزر بدل الـ console.`,
            R`نهاية [[onOfflineReady]].`,
            R`نهاية [[registerSW]].`,
          ],
          sol: R`[[dist/sw.js]] (أو ملف workbox جنبه) فيه قايمة زي [[{url:"assets/index-B3k9.js",revision:null}]] و [[{url:"index.html",revision:"a1b2..."}]]. الملفات اللي في اسمها hash الـ revision بتاعها null (الاسم نفسه كفاية)، والباقي ليه hash.

بعد تغيير النص و build و preview والـ refresh: الـ confirm «فيه نسخة جديدة» بيظهر. لو ضغطت OK بيعمل reload بالنسخة الجديدة. لو Cancel، الصفحة تفضل بالقديم لحد ما تقفل كل التابات.

لو مظهرش: اتأكد إنك في [[preview]] مش [[dev]]، وإن [[import "./pwa"]] موجود، وإنك مش فاتح DevTools بـ «Update on reload» (دي بتعمل skipWaiting لوحدها فمتشوفش الـ prompt).`
        },
        {
          cmd: "IndexedDB و BroadcastChannel",
          title: "تخزّن داتا كتير في المتصفح وتزامن التابات إزاي؟ (وحدود iOS)",
          desc: R`[[localStorage]] strings بس، و sync (بيوقف الصفحة)، وحوالي 5MB، ومش متاح جوه الـ SW. للداتا الحقيقية offline (مسودات، رسايل، طلبات مستنية النت) فيه IndexedDB: داتابيز جوه المتصفح، بتخزّن objects و Blobs، و async، وبـ indexes، ومساحته بالـ GB حسب الجهاز. بس الـ API الأصلي قديم ومبني على events ومتعب.

عشان كده بتستخدم wrapper: [[idb]] (صغيرة، نفس الـ API بس بـ promises) أو [[Dexie]] (أكبر، فيها queries و live queries لـ React).

و [[BroadcastChannel]]: قناة رسايل بين كل التابات (والـ workers) اللي على نفس الـ origin. لما تاب يغيّر حاجة، يقول للباقي «حدّثوا».`,
          example: R`import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());`,
          try: R`اعمل صفحة بـ Vite (عشان الـ import) فيها input وزرار «ضيف»، وافتح الصفحة في تابين. ضيف ملاحظة في واحد: التاني اتحدّث؟ الملاحظة ظهرت في التاب اللي ضافها؟ وبعدين DevTools ← Application ← IndexedDB وشوف الداتا. وجرّب في Console [[await navigator.storage.estimate()]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل (في المتصفح أو Node بـ [[fake-indexeddb]]): [[db.put("notes", ...)]] مرتين بنفس الـ [[id]] بنصين مختلفين، وبعدين [[db.add("notes", ...)]] بنفس الـ [[id]] جوه try/catch. [[db.count]] كام؟ والـ error اسمه إيه؟`, done: R`[[db.count("notes")]] بيرجّع 1، و [[db.get]] بيرجّع النص التاني ([[put]] بيستبدل)، و [[add]] بيرمي error اسمه [[ConstraintError]] والداتا متغيرتش.` },
            { lvl: 'تطبيق', t: R`ابني migration: ارفع الـ version لـ 2، وفي [[upgrade(db, oldVersion, newVersion, tx)]] زوّد index اسمه [[byTag]] على الـ store الموجود بـ [[tx.objectStore("notes").createIndex(...)]]، من غير ما تعمل الـ store تاني، وخلّي الكود يشتغل صح لو اليوزر جاي من version 0 أو 1.`, done: R`الـ upgrade بيتنادى بـ [[oldVersion]] 1 و [[newVersion]] 2، والملاحظات القديمة كلها لسه موجودة، و [[indexNames]] فيه [[byTag]] و [[byUpdated]]، ومتصفح جديد (version 0) بيعمل الاتنين من غير error، وفتح بـ version 1 بعدها بيرمي [[VersionError]].` },
            { lvl: 'تحدي', t: R`محاكاة outbox: لما [[navigator.onLine]] يبقى [[false]] الإضافة تتحط في store اسمه [[outbox]]، وعلى [[online]] تتبعت لسيرفر Express على localhost واحدة واحدة بالترتيب وتتمسح بعد ما السيرفر يرد [[ok]] بس، وتبعت [[BroadcastChannel]] للتابات.`, done: R`Offline تضيف ٣ وترجع Online: لوج السيرفر فيه ٣ requests بنفس الترتيب و [[outbox]] بيفضى. لو السيرفر رجّع 500 العملية بتفضل في [[outbox]]. التاب التاني بيتحدّث، والتاب اللي بعت مبيستقبلش رسالته (BroadcastChannel مبيرجّعش للـ object اللي بعت).` },
          ],
          flag: "script",
          deep: {
            why: "PWA بيشتغل offline محتاج مكان يحفظ فيه اللي اليوزر عمله لحد ما النت يرجع. ولما اليوزر فاتح التطبيق في تابين، من غير مزامنة واحد فيهم هيعرض داتا قديمة ولو حفظ منه هيمسح تعديلات التاني.",
            how: R`[[openDB(name, version, { upgrade })]]: الـ upgrade بيتنادى بس لما الـ version يزيد (أو أول مرة)، وهو المكان الوحيد اللي تعمل فيه object stores و indexes، زي migrations. عايز تضيف index؟ زوّد الـ version وضيفه في upgrade. [[keyPath: "id"]] يعني المفتاح جوه الـ object نفسه، و [[put]] بتضيف أو تستبدل. و [[getAllFromIndex]] بترجّع مترتبة حسب الـ index. كل عملية جوه transaction؛ idb بتفتحها وتقفلها لك.

بالـ Dexie نفس الكلام: [[db.version(1).stores({ notes: "id, updatedAt" })]] و [[db.notes.orderBy("updatedAt").toArray()]]، و [[useLiveQuery]] في React بتحدّث الـ component لوحدها لما الداتا تتغير (حتى من تاب تاني).

BroadcastChannel بيوصّل الرسالة لكل الـ instances بنفس الاسم ما عدا اللي بعت. عشان كده التاب اللي ضاف لازم يعمل render بنفسه. الرسالة بتتنسخ (structured clone) فمينفعش تبعت دوال.

المساحة: المتصفح ممكن يمسح داتا الموقع لو المساحة قلت (best-effort). [[navigator.storage.persist()]] بيطلب إنه ميتمسحش (Chrome بيوافق غالبًا للمواقع المسطّبة أو اللي اليوزر بيستخدمها كتير، و Firefox ممكن يسأل اليوزر).

حدود iOS/Safari: كل المتصفحات على iPhone بتستخدم WebKit (مع استثناءات في أوروبا). Safari بيمسح كل التخزين اللي بيكتبه JS (IndexedDB و localStorage و Cache Storage) للموقع اللي اليوزر مفتحهوش ٧ أيام، إلا لو الموقع متسطّب على الشاشة الرئيسية. مفيش [[beforeinstallprompt]]. والـ push notifications شغالة بس للـ PWA المتسطّب (من iOS 16.4). و Background Sync مش مدعوم. فمتعتمدش على التخزين المحلي كمصدر وحيد للداتا: السيرفر هو المصدر، والمحلي كاش ومسودات.`,
            when: R`IndexedDB: مسودات، وداتا offline، و queue لطلبات مستنية النت، وملفات كبيرة (Blobs). localStorage: إعدادات صغيرة (theme، آخر تاب). BroadcastChannel: logout في كل التابات، ومزامنة سلة أو إشعارات. وفي الـ SW: IndexedDB بس (localStorage مش موجود هناك).`,
            mistakes: R`localStorage لداتا كبيرة أو objects ([[JSON.stringify]] كل مرة ويوقف الصفحة). وتغيّر الـ schema من غير ما تزوّد الـ version. وتنسى إن الداتا خاصة بالجهاز والمتصفح (مش sync بين الأجهزة). وتخزّن tokens حساسة في IndexedDB وتفتكره آمن من XSS (أي JS على الصفحة يقراه). وتعتمد على التخزين المحلي على iPhone لداتا مهمة.`
          },
          teach: R`## الفكرة في سطر

بنفتح داتابيز اسمها [[notes-app]] جوه المتصفح فيها جدول (store) اسمه [[notes]]، ونضيف ملاحظة، ونقول لباقي التابات «الداتا اتغيرت» عن طريق قناة [[BroadcastChannel]]، فكل تاب يقرا من جديد ويرسم.

جرّبته بطريقتين:

- **في Chrome headless** (playwright-core، بروفايل مؤقت) على سيرفر Node على localhost، بالمثال زي ما هو. بدل Vite استخدمت import map بيقول للمتصفح إن [["idb"]] هو ملف [[idb/build/index.js]] (نسخة 8.0.4)، وفتحت الصفحة في تابين.
- **في Node 24** الـ solCode، ومعاه [[fake-indexeddb]] (IndexedDB مكتوبة بـ JS، عشان Node معندوش واحدة).

---

## ١. فتح الداتابيز

~~~text app.js
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
~~~

- [[openDB(name, version, { upgrade })]]: افتح الداتابيز دي بالـ version ده.
- [[1]]: رقم الـ schema. لو الداتابيز مش موجودة، أو موجودة برقم أقل، [[upgrade]] بتتنادى.
- [[upgrade(db)]]: المكان الوحيد اللي تعمل فيه stores و indexes. زي migration.
- [[createObjectStore("notes", { keyPath: "id" })]]: store اسمه [[notes]] (زي جدول)، والمفتاح بتاع كل object هو الخاصية [[id]] اللي جواه.
- [[createIndex("byUpdated", "updatedAt")]]: index اسمه [[byUpdated]] على الخاصية [[updatedAt]]، عشان نجيب الملاحظات مترتبة بالوقت.

---

## ٢. إضافة ملاحظة

~~~text app.js
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
~~~

- [[db.put(store, value)]]: ضيف، ولو فيه واحد بنفس المفتاح استبدله.
- [[crypto.randomUUID()]]: id عشوائي فريد زي [[52d6a70d-a233-4d1b-9b78-9d1d3d7ec978]] (ده طلع لما جربته في Node).
- [[text]] لوحدها جوه الـ object اختصار [[text: text]].
- [[Date.now()]]: الوقت دلوقتي بالـ millisecond من 1970.
- [[channel.postMessage(...)]]: ابعت رسالة لكل التابات التانية. ([[channel]] متعرّف تحت، بس الدالة مش بتتنادى غير بعد ما يتعرّف، فمفيش مشكلة.)

---

## ٣. القناة

~~~text app.js
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
~~~

- [[new BroadcastChannel("notes")]]: اشترك في قناة اسمها [[notes]]. أي تاب أو worker على نفس الـ origin ومشترك في نفس الاسم بيسمع.
- [[onmessage]]: جالك رسالة. [[e.data]] هو الـ object اللي اتبعت.
- [[getAllFromIndex("notes", "byUpdated")]]: كل الملاحظات مترتبة بـ [[updatedAt]] من الأقدم للأحدث.

---

## ٤. الرسم والتشغيل

~~~text app.js
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());
~~~

- [[render]]: هنا بتطبع النصوص بس، في تطبيق حقيقي بترسم الليستة.
- السطر قبل الأخير: التاب اللي ضاف **مبيستلمش رسالته**، فلازم يرسم بنفسه.
- [[navigator.storage?.persist]]: [[?.]] لو [[storage]] مش موجود رجّع [[undefined]] بدل error. و [[persist()]] بتطلب إن المتصفح ميمسحش الداتا دي لما المساحة تقل، وبترجّع true أو false.

---

## ٥. اللي حصل في Chrome (تابين)

~~~text الناتج
A: [اشتري لبن]
A: persisted: false
B: [اشتري لبن, اشتري لبن]
A: [اشتري لبن, اشتري لبن]
B: persisted: false
--- A adds 'كلم ماما'
B: [اشتري لبن, اشتري لبن, كلم ماما]
~~~

- A فتح: ضاف ملاحظة ورسم نفسه.
- B فتح: هو كمان نفّذ [[addNote("اشتري لبن")]] (فبقوا اتنين)، ورسم نفسه، وA سمع الرسالة ورسم.
- A ضاف «كلم ماما»: B بس اللي طبع. A مطبعش لأنه مبيستلمش رسالته، و [[addNote]] نفسها مبترسمش. ده بالظبط الـ bug اللي في الـ sol.
- [[persisted: false]]: Chrome رفض الطلب هنا (بروفايل مؤقت ومش متسطّب). في موقع متسطّب أو بيتزار كتير غالبًا بيوافق.
- (وكان فيه سطر [[Failed to load resource: 404]]: ده [[favicon.ico]] مش موجود، ملوش علاقة.)

ودي المساحة اللي Chrome اداها للموقع:

~~~text الناتج
estimate: {"quota":10737491968,"usage":73728} 10.0 GB
~~~

[[quota]] الحد الأقصى بالبايت (هنا 10 GB في البروفايل المؤقت، وفي بروفايل عادي بيبقى نسبة من مساحة الديسك الفاضية)، و [[usage]] اللي الموقع مستخدمه فعلًا (حوالي 72 KB).

---

## ٦. الـ solCode في Node

~~~text app.js
import "fake-indexeddb/auto";
~~~

ده بيحط [[indexedDB]] global في Node، فـ [[idb]] تشتغل زي المتصفح. وبعدين بيعمل قناتين بنفس الاسم في نفس البرنامج ([[tabA]] و [[tabB]]) كأنهم تابين، و A بيبعت. و [[close()]] في الآخر عشان القناة المفتوحة اللي عليها [[onmessage]] بتخلي Node مستني ومبيقفلش (جربت من غيرها: البرنامج فضل شغال لحد ما قفلته بعد ٥ ثواني).

~~~text الناتج (Node 24)
B: [ 'اشتري لبن' ]
~~~

سطر «A استلم» مظهرش: نفس النتيجة، الـ instance اللي بعت مبيستلمش.

---

## ٧. المساحة: [[storage.estimate]] و quota و eviction

IndexedDB و Cache Storage (بتاع الـ service worker) بياكلوا من **نفس** المساحة المسموحة للموقع (الـ quota). لو عدّيتها، الكتابة بتفشل. ولو الجهاز نفسه المساحة قلّت فيه، المتصفح ممكن **يمسح** داتا موقعك كلها (ده اسمه eviction).

### كام مستخدم وكام فاضل؟

~~~text app.js
const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
const { quota, usage, usageDetails } = await navigator.storage.estimate();
console.log("usage:", mb(usage), "quota:", mb(quota), JSON.stringify(usageDetails));
~~~

- [[navigator.storage.estimate()]]: بترجّع Promise بـ object فيه [[usage]] (اللي موقعك مستخدمه بالبايت) و [[quota]] (أقصى حاجة مسموحة)، والاتنين **تقريب** مش رقم بالبايت الظبط (عشان المواقع متقدرش تعرف حاجات عن الجهاز من الأرقام دي).
- [[usageDetails]]: في Chrome بس، بيقسّم الاستخدام: [[indexedDB]] و [[caches]] و [[serviceWorkerRegistrations]].
- [[mb]]: دالة صغيرة بتحوّل البايت لـ MB برقم عشري واحد ([[toFixed(1)]]).

حطيت ملف عشوائي 50 MB كـ Blob في IndexedDB وقستها قبل وبعد (Chrome 156 headless):

~~~text الناتج
قبل      usage: 0.0 MB   quota: 10240.0 MB
بعد      usage: 50.0 MB  {"indexedDB":52430644,"serviceWorkerRegistrations":588}
~~~

ملاحظة غريبة: لما حطيت 50 MB **أصفار** بدل بيانات عشوائية، [[usage]] طلع حوالي 5 MB بس: Chrome بيضغط الداتا اللي جوه IndexedDB، فالرقم بيعتمد على الداتا نفسها مش حجمها في JS.

### لما المساحة تخلص: [[QuotaExceededError]]

خلّيت Chrome يدّي الموقع 4 MB بس (بأمر DevTools Protocol اسمه [[Storage.overrideQuotaForOrigin]]، ونفس الحاجة في DevTools ← Application ← Storage ← Simulate custom storage quota)، وحطيت 1 MB وبعدين حاولت 5 MB:

~~~text الناتج
بعد 1MB       usage: 1.1 MB
catch: QuotaExceededError |
بعد المحاولة   usage: 1.1 MB
cache catch: QuotaExceededError | Quota exceeded.
~~~

- الـ transaction بتاع IndexedDB **اتلغى كله** ([[tx.onabort]] و [[tx.error.name]] بـ [[QuotaExceededError]] والرسالة فاضية)، والـ 1 MB القديم فضل زي ما هو: يا كله يا بلاش.
- [[cache.put]] بيرمي نفس الاسم برسالة [[Quota exceeded.]]
- يعني أي كتابة لازم تبقى جوه [[try]]، وتقول لليوزر «المساحة خلصت، امسح حاجات قديمة» بدل ما التطبيق يقف ساكت.
- و [[estimate()]] فضل يقول 10 GB حتى مع الحد ده، فمتعتمدش على [[quota - usage]] كرقم مضمون: الفيصل هو الـ error.

### الـ eviction: إمتى المتصفح يمسح داتا موقعك؟

ده من الـ docs (MDN: Storage quotas and eviction criteria)، لأنه بيحصل لما ديسك الجهاز نفسه يتملي:

| المتصفح | الـ quota تقريبًا | بيمسح إمتى |
|---|---|---|
| Chrome و Edge | لحد حوالي 60٪ من مساحة الديسك لكل موقع | لما الديسك يقرب يتملي، بيمسح المواقع اللي بقالها أطول وقت مااتفتحتش الأول (LRU) |
| Firefox | حوالي 10٪ من الديسك أو 10 GB لكل مجموعة مواقع، الأقل فيهم | نفس فكرة الأقدم استخدامًا الأول |
| Safari | حوالي 60٪ للمتصفح نفسه، وأقل للتطبيقات اللي جواها WebView | وكمان بيمسح كل التخزين لأي موقع اليوزر مفتحهوش ٧ أيام، إلا المتسطّب على الشاشة الرئيسية |

الـ eviction بيمسح **الموقع كله** مرة واحدة (IndexedDB و Cache و localStorage مع بعض)، مش جزء منه، عشان متلاقيش داتا نصها موجود.

### [[persist()]]: متمسحش داتايا

~~~text app.js
console.log("persisted:", await navigator.storage.persisted());
console.log("persist():", await navigator.storage.persist());
~~~

- [[persisted()]]: الداتا دي محمية دلوقتي؟ ([[true]] أو [[false]]) من غير ما تطلب حاجة.
- [[persist()]]: اطلب الحماية. لو اتوافق عليها، المتصفح مش هيمسح داتا موقعك لوحده لما الديسك يتملي، اليوزر بس يقدر يمسحها.
- في تجربتي (بروفايل جديد، موقع مش متسطّب ومحدش زاره قبل كده) الاتنين رجّعوا [[false]]. حسب الـ docs، Chrome بيقرّر لوحده من غير ما يسأل: بيوافق غالبًا لو الموقع متسطّب، أو في الـ bookmarks، أو اليوزر بيزوره كتير، أو الإشعارات متفعّلة. و Firefox بيطلّع سؤال لليوزر.
- اطلبها في الوقت اللي الداتا بقت مهمة فعلًا (أول ما اليوزر يحفظ أول ملاحظة offline)، مش أول ما الصفحة تفتح.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[openDB(name, v, { upgrade })]] | تفتح، و upgrade بتتنادى لما الـ version يزيد |
| [[createObjectStore]] و [[createIndex]] | جوه upgrade بس |
| [[db.put]] | ضيف أو استبدل |
| [[getAllFromIndex]] | كله مترتب بالـ index |
| [[BroadcastChannel]] | رسالة لكل التابات **ما عدا** اللي بعت |
| [[navigator.storage.persist()]] | اطلب الداتا متتمسحش |
| [[navigator.storage.estimate()]] | [[usage]] و [[quota]] تقريبًا، والفيصل الحقيقي هو [[QuotaExceededError]] وقت الكتابة |

- عايز تغيّر الـ schema؟ زوّد الـ version.
- التاب اللي غيّر يرسم بنفسه.`,
          lines: [
            R`[[idb]]: مكتبة صغيرة بتلف IndexedDB بـ promises. الـ API الأصلي شغال بـ events ([[onsuccess]] و [[onerror]]) على كل عملية فالكود بيطول؛ بـ [[idb]] تكتب [[await]] عادي.`,
            R`افتح داتابيز اسمها [[notes-app]] بـ version 1، ولو مش موجودة تتعمل. [[await]] برّه دالة لأن الملف module. الـ version رقم صحيح بتزوّده كل ما تغيّر شكل الداتا.`,
            R`[[upgrade]] بتتنادى بس لما الداتابيز تتعمل أول مرة أو الـ version المطلوب أعلى من اللي على الجهاز. هي المكان الوحيد اللي تقدر تعمل فيه stores و indexes، زي migration.`,
            R`اعمل store (زي جدول) اسمه [[notes]]. [[keyPath: "id"]] يعني المفتاح بيتاخد من خاصية [[id]] جوه كل object فمش محتاج تبعته لوحده. ولو حاولت تعمل store موجود بنفس الاسم يرمي error، عشان كده جوه [[upgrade]] بس.`,
            R`index على [[updatedAt]]: بيخلي الداتابيز تجيب الملاحظات مترتبة بالتاريخ من غير ما تحمّل الكل وترتّب بإيدك. [[byUpdated]] اسم الـ index اللي هنقرا بيه.`,
            R`نهاية [[upgrade]].`,
            R`نهاية الـ options وقفلة [[openDB]].`,
            R`دالة بتضيف ملاحظة وتبلّغ باقي التابات. [[async]] لأن الكتابة في IndexedDB بتاخد وقت ومش بتوقف الصفحة.`,
            R`[[put]] بتضيف الـ object، ولو فيه واحد بنفس الـ [[id]] بتستبدله (عكس [[add]] اللي بترمي error). [[crypto.randomUUID()]] بيعمل id فريد، و [[updatedAt]] هو اللي الـ index بيرتّب بيه.`,
            R`بعد ما الكتابة تخلص، ابعت رسالة صغيرة على القناة إن الداتا اتغيرت. مش بنبعت الداتا نفسها: كل تاب يقرا من الداتابيز، فالكل يبقى على نفس المصدر.`,
            R`نهاية [[addNote]].`,
            R`قناة باسم [[notes]]: أي تاب أو worker من نفس الـ origin يعمل قناة بنفس الاسم بيستلم اللي يتبعت عليها. [[addNote]] فوق بتستخدمها، وده سليم لأن الدالة مش بتتنادى غير بعد السطر ده.`,
            R`لما رسالة توصل من تاب تاني. [[async]] لأننا هنقرا من الداتابيز جوه.`,
            R`لو الرسالة بتقول إن الملاحظات اتغيرت: اقرا كلهم مترتبين بالـ index ([[getAllFromIndex]]) وارسمهم، فالتاب التاني يتحدّث من غير reload.`,
            R`نهاية [[onmessage]].`,
            R`دالة الرسم. هنا بتطبع في الـ console بس عشان المثال يبان؛ في تطبيق حقيقي بتبني الليستة في الصفحة.`,
            R`اطبع نصوص الملاحظات بس: [[map]] بتاخد [[text]] من كل object.`,
            R`نهاية [[render]].`,
            R`ضيف ملاحظة: تتحفظ في الداتابيز وتتبعت رسالة للتابات التانية.`,
            R`التاب اللي بعت الرسالة مبيستلمهاش هو ([[BroadcastChannel]] بيوصّل لكل القنوات بنفس الاسم ما عدا اللي بعتت)، فلازم يرسم بنفسه بعد الإضافة، وإلا الملاحظة الجديدة متظهرش عنده.`,
            R`[[persist()]] بتطلب من المتصفح إن داتا الموقع متتمسحش لما مساحة الجهاز تقل؛ من غيرها الداتا ممكن تتمسح لو المتصفح احتاج مساحة. بترجّع [[true]] أو [[false]] حسب قرار المتصفح، و [[?.]] عشان المتصفحات اللي مش بتدعمها.`,
          ],
          sol: R`التاب التاني بيتحدّث فورًا ويعرض الملاحظة الجديدة. التاب اللي ضاف مش بيستلم رسالته، فلو معملتش render فيه بعد الإضافة مش هتظهر فيه لحد الـ refresh. ده أكتر حاجة بتلخبط في BroadcastChannel.

في Application ← IndexedDB ← notes-app ← notes هتلاقي الـ objects بالـ id و text و updatedAt، وتحت الـ store الـ index [[byUpdated]].

[[estimate()]] بترجّع [[{ quota, usage }]] بالبايت. الـ quota غالبًا بالـ GB (نسبة من مساحة الديسك الفاضية)، والـ usage اللي موقعك مستخدمه فعلًا (IndexedDB و Cache Storage مع بعض).`,
          solCode: R`import "fake-indexeddb/auto";
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" }).createIndex("byUpdated", "updatedAt");
  },
});
const tabA = new BroadcastChannel("notes");
const tabB = new BroadcastChannel("notes");
tabA.onmessage = () => console.log("A استلم (مش المفروض يحصل)");
tabB.onmessage = async () => {
  console.log("B:", (await db.getAllFromIndex("notes", "byUpdated")).map((n) => n.text));
  tabA.close();
  tabB.close();
};
await db.put("notes", { id: crypto.randomUUID(), text: "اشتري لبن", updatedAt: Date.now() });
tabA.postMessage({ type: "notes-changed" });`
        },
        {
          cmd: "push و Background Sync",
          title: "توصّل إشعار والموقع مقفول، وتبعت اللي اتعمل offline أول ما النت يرجع",
          desc: R`**Push API**: السيرفر بتاعك يبعت رسالة لليوزر حتى لو موقعك مش مفتوح خالص. الـ service worker بيصحى، وياخد الرسالة في [[push]] event، ويطلّع إشعار بـ [[registration.showNotification]]. ده اللي بيخلي «طلبك اتشحن» يوصل وانت قافل المتصفح.

**Background Sync**: اليوزر عمل حاجة وهو offline (بعت رسالة، أو حفظ طلب). بدل ما تقوله «جرّب تاني»، بتعمل [[reg.sync.register("send-outbox")]]، والمتصفح بيصحّي الـ service worker بـ [[sync]] event أول ما النت يرجع، حتى لو اليوزر قفل التاب.

الاتنين محتاجين service worker (درس «دورة حياة الـ SW»)، و HTTPS أو localhost. والـ push محتاج إذن الإشعارات (درس «Notification و permissions» في وحدة APIs المتصفح). Background Sync في Chrome و Edge بس، فلازم يبقى عندك بديل.`,
          example: R`// الصفحة: بعد ضغطة زرار والإذن granted (درس «Notification و permissions»)
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
await fetch("/api/push/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sub) });
async function queueSend() {
  if ("sync" in reg) await reg.sync.register("send-outbox");
  else await sendOutbox();
}
// sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? { title: "جديد" };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: data.tag, data: { url: data.url } }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
self.addEventListener("sync", (event) => {
  if (event.tag === "send-outbox") event.waitUntil(sendOutbox());
});
// السيرفر: Node بمكتبة web-push
import webpush from "web-push";
webpush.setVapidDetails("mailto:dev@example.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
await webpush.sendNotification(subscription, JSON.stringify({ title: "طلب جديد", body: "رقم 42", tag: "order-42", url: "/orders/42" }));`,
          try: R`اعمل مفاتيح بـ [[npx web-push generate-vapid-keys]]، وسيرفر Node صغير على localhost فيه [[POST /api/push/subscribe]] بيحفظ الـ subscription في ملف JSON، و [[POST /api/send]] بيبعت إشعار لكل اللي في الملف. اشترك من Chrome، واقفل التاب، وابعت بـ [[curl -X POST localhost:3000/api/send]]: الإشعار ظهر والتاب مقفول؟ وبعدين DevTools ← Network ← Offline، ونادي [[queueSend()]]، وارجع Online وشوف [[/api/outbox]] في لوج السيرفر.`,
          practice: [
            { lvl: 'سريع', t: R`اشرحها: ارسم في ٥ خطوات بالترتيب رحلة إشعار «طلبك اتشحن» من لحظة ما اليوزر داس «فعّل الإشعارات» لحد ما ضغط على الإشعار وفتح صفحة الطلب. كل خطوة: مين بيعمل إيه (الصفحة، أو الـ SW، أو سيرفرك، أو push service زي FCM)، وإيه اللي بيتنقل.`, done: R`الخطوات فيها: [[requestPermission]] ثم [[pushManager.subscribe]] بالـ public key، والـ subscription بيتبعت لسيرفرك ويتحفظ، والسيرفر بيبعت بالـ private key للـ [[endpoint]] (مش للمتصفح مباشرة)، والـ SW بيصحى في [[push]] ويعمل [[showNotification]]، والضغطة [[notificationclick]] بتفتح [[data.url]]. وتقدر تقول ليه السيرفر مبيكلّمش المتصفح مباشرة.` },
            { lvl: 'تطبيق', t: R`ابني «صندوق صادر» (outbox): فورم تعليق، لو [[navigator.onLine]] بـ false أو الـ [[fetch]] فشل، التعليق يتحفظ في IndexedDB (درس «IndexedDB و BroadcastChannel») ويتنادى [[queueSend()]]. و [[sendOutbox()]] واحدة بتشتغل في الصفحة والـ SW: بتقرا كل اللي في الـ outbox، وتبعته، وتمسح اللي اتبعت بس.`, done: R`٣ تعليقات وانت Offline بيوصلوا السيرفر بالترتيب أول ما ترجع Online (في Chrome حتى لو قفلت التاب قبلها)، ومفيش تعليق بيتبعت مرتين لو النت فصل في النص، وفي Firefox (من غير [[sync]]) بيتبعتوا لما تفتح الصفحة تاني أو [[online]] event يحصل.` },
            { lvl: 'تحدي', t: R`محاكاة سيرفر حقيقي: [[sendToAll(subscriptions, payload)]] في Node بتبعت لـ ٥٠٠ subscription بحد ١٠ في نفس الوقت (فكرة [[mapLimit]])، وأي واحد يرجّع [[410]] أو [[404]] يتمسح من التخزين، وأي error تاني يتسجّل ويتعاد مرة واحدة بعد ثانيتين، وفي الآخر ملخص: اتبعت كام، واتمسح كام، وفشل كام.`, done: R`جرّبتها بـ subscription حقيقي واحد و subscription عملتله [[unsubscribe()]] من الصفحة: الأول بيرجّع [[201]] والتاني [[WebPushError]] بـ [[statusCode]] [[410]] واتمسح من الملف، والملخص بيطلع أرقام صح، وتشغيلها مرتين ورا بعض مبيبعتش للممسوح تاني.` },
          ],
          flag: "script",
          deep: {
            why: R`من غير push، الموقع بيعرف يكلّمك بس وانت فاتحه، والتطبيقات الـ native بتكسب. ومن غير Background Sync، أي حاجة بتتعمل في مترو أو أسانسير بتضيع أو بتطلب من اليوزر يفتكر يعيدها. الاتنين بيخلّوا الـ PWA تتصرف زي تطبيق متسطّب: بتوصلك وبتكمّل شغلها لوحدها.`,
            how: R`**الـ push**: [[pushManager.subscribe]] بيكلّم الـ push service بتاع المتصفح (Chrome: FCM، و Firefox: Mozilla autopush، و Safari: Apple) وبيرجّع subscription فيه [[endpoint]] (URL عند الـ push service) و [[keys]] ([[p256dh]] و [[auth]]). السيرفر بتاعك بيعمل POST للـ endpoint ده، والرسالة **متشفّرة** بالـ keys دي فالـ push service مبيقدرش يقراها، وموقّعة بالـ VAPID private key فمحدش غيرك يقدر يبعت لليوزرز بتوعك. و [[userVisibleOnly: true]] وعد إن كل push هيطلّع إشعار، و Chrome مبيقبلش غيره.

**الـ sync**: [[reg.sync.register(tag)]] بيسجّل «لما يبقى فيه نت، صحّيني بالـ tag ده». نفس الـ tag مرتين بيبقى تسجيل واحد. الـ SW بيصحى بـ [[sync]] event، ولو الـ Promise اللي في [[waitUntil]] اترفض، المتصفح بيعيد بعدين بفترات بتزيد، وآخر محاولة [[event.lastChance]] بيبقى [[true]].

[[event.waitUntil(promise)]] في الاتنين: بيقول للمتصفح «متقفلش الـ SW لحد ما ده يخلص». من غيره الـ SW ممكن يتقفل قبل ما الإشعار يظهر أو الطلب يتبعت.`,
            when: R`push: رسايل شات، وحالة طلب، وتنبيه أمني، وتذكير اليوزر طلبه بنفسه. مش للتسويق كل يوم. و Background Sync: أي حاجة اليوزر بيكتبها ولازم توصل (تعليق، طلب، رسالة، form)، مع outbox في IndexedDB. ولمزامنة دورية (أخبار كل ساعة) فيه Periodic Background Sync، بس في Chrome بس وللـ PWA المتسطّبة (من الـ docs).`,
            mistakes: R`تحط الـ VAPID private key في كود الصفحة (هو للسيرفر بس، والـ public بس اللي في الصفحة). وتنسى [[event.waitUntil]] فالإشعار يظهر ساعات ويختفي ساعات. وتفترض إن [[reg.sync]] موجود في كل المتصفحات (Chrome و Edge بس). ومتمسحش الـ subscriptions اللي بترجّع [[410]] فسيرفرك بيبعت لناس مش موجودين للأبد. وتبعت push من غير [[showNotification]]: Chrome بيطلّع إشعار افتراضي بيقول إن الموقع اتحدّث في الخلفية (من الـ docs). وتنسى إن Safari على iPhone بيدعم Web Push للموقع المتسطّب على الشاشة الرئيسية بس.`
          },
          teach: R`## الفكرة في سطر

٣ أماكن بتشتغل مع بعض: **الصفحة** بتشترك وتبعت الاشتراك لسيرفرك، و**سيرفرك** بيبعت رسالة لما حاجة تحصل، و**الـ service worker** بيصحى وياخدها ويطلّع إشعار. ونفس الـ SW بيصحى تاني لما النت يرجع عشان يبعت اللي اتساب offline.

جرّبت الكود ده كله من أوله لآخره: Chrome 156 headless ببروفايل حقيقي (عن طريق playwright-core، على [[http://127.0.0.1]]) وسيرفر Node 24 بـ [[web-push]] 3.6.7. الاشتراك اتعمل فعلًا على FCM (سيرفرات Google للـ push)، والرسالة اتبعتت ووصلت للـ SW. شكل الإشعار على الشاشة **من الـ docs**، لأن الـ headless مبيرسمش إشعارات.

---

## ١. المفاتيح: VAPID

قبل أي حاجة، سيرفرك محتاج زوج مفاتيح (اسمهم VAPID: Voluntary Application Server Identification):

~~~powershell
npx web-push generate-vapid-keys
~~~

~~~text الناتج (المفاتيح نفسها مستخبية)
=======================================

Public Key:
<KEY>

Private Key:
<KEY>

=======================================
~~~

- **الـ public key** (87 حرف): بيتحط في الصفحة، وبتقوله للمتصفح وانت بتشترك.
- **الـ private key** (43 حرف): في السيرفر بس، في متغير بيئة. بيه بتوقّع كل رسالة، فالـ push service يعرف إنها منك انت.
- بتعملهم **مرة واحدة** للمشروع. لو غيّرتهم، كل الاشتراكات القديمة بتبوظ.

## ٢. الصفحة: الاشتراك

~~~text app.js
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
await fetch("/api/push/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sub) });
~~~

- [[navigator.serviceWorker.ready]]: Promise بتتحل لما يبقى فيه SW شغّال، وبترجّع الـ registration.
- [[reg.pushManager.subscribe(...)]]: اشترك في الـ push. المتصفح بيكلّم الـ push service بتاعه وبيرجّع subscription.
- [[userVisibleOnly: true]]: وعد إن كل رسالة هتطلّع إشعار يشوفه اليوزر. جرّبت من غيرها:

~~~text الناتج (Chrome)
NotAllowedError: Registration failed - permission denied
Chrome currently only supports the Push API for subscriptions that will result in user-visible messages. You can indicate this by calling pushManager.subscribe({userVisibleOnly: true}) instead.
~~~

- [[applicationServerKey]]: الـ public key. ومن غيره:

~~~text الناتج (Chrome)
AbortError: Registration failed - missing applicationServerKey, and manifest empty or missing
~~~

- [[fetch("/api/push/subscribe", ...)]]: ابعت الاشتراك لسيرفرك يحفظه (في داتابيز، مع اليوزر صاحبه). [[JSON.stringify(sub)]] بيحوّله لـ:

~~~text اللي السيرفر استلمه
endpoint, expirationTime, keys  |  endpoint host: fcm.googleapis.com
~~~

| الحقل | معناه |
|---|---|
| [[endpoint]] | URL عند الـ push service (هنا FCM) بيمثّل المتصفح ده بالظبط، وسيرفرك بيبعت عليه |
| [[keys.p256dh]] و [[keys.auth]] | مفاتيح التشفير: سيرفرك بيشفّر الرسالة بيهم، فـ FCM نفسه مبيقدرش يقراها |
| [[expirationTime]] | امتى الاشتراك ينتهي، وكان [[null]] (مفيش ميعاد) |

> الـ endpoint ده سرّ صغير: أي حد معاه + المفاتيح يقدر يحاول يبعت، بس من غير الـ VAPID private key بتاعك الرسالة مش هتتقبل. خزّنه زي أي داتا يوزر.

## ٣. الصفحة: لما النت مش موجود

~~~text app.js
async function queueSend() {
  if ("sync" in reg) await reg.sync.register("send-outbox");
  else await sendOutbox();
}
~~~

- الفكرة: اليوزر داس «ابعت» وهو offline. انت حفظت الرسالة في IndexedDB في store اسمه outbox (درس «IndexedDB و BroadcastChannel»)، وبعدين بتنادي [[queueSend()]].
- [[("sync" in reg)]]: هل Background Sync موجود؟ في Chrome و Edge آه، في Firefox و Safari لأ (من الـ docs، MDN: Background Synchronization API).
- [[reg.sync.register("send-outbox")]]: «لما النت يرجع، صحّي الـ SW بالاسم ده». الاسم (tag) انت اللي بتختاره.
- [[else await sendOutbox()]]: البديل: حاول دلوقتي، ولو فشل خلّيه في الـ outbox وحاول تاني على [[online]] event أو أول ما الصفحة تفتح.
- [[sendOutbox()]]: دالة انت بتكتبها: تقرا كل اللي في الـ outbox، وتعمل POST لكل واحد، وتمسح اللي اتبعت. نفس الدالة بتتحط في الصفحة وفي الـ SW.

جرّبت: وانا Offline الـ [[register]] نجح و [[reg.sync.getTags()]] رجّع [[["send-outbox"]]]، ومحصلش حاجة. أول ما رجعت Online، الـ SW صحي لوحده وسيرفري استلم:

~~~text لوج السيرفر
server /api/outbox from-sync
~~~

وجرّبت كمان: لو الإذن [["background-sync"]] متقفل في إعدادات الموقع، [[register]] بيرمي [[NotAllowedError: Permission denied.]]، فحطه جوه [[try]] واعتبره زي «مفيش sync».

## ٤. الـ SW: الـ [[push]] event

~~~text sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? { title: "جديد" };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: data.tag, data: { url: data.url } }));
});
~~~

- [[self]]: الـ SW نفسه (زي [[window]] في الصفحة).
- [[event.data?.json()]]: الرسالة اللي سيرفرك بعتها، كـ JSON. و [[?.]] لأن push ممكن يوصل من غير داتا خالص، و [[?? { title: "جديد" }]] قيمة احتياطي.
- [[self.registration.showNotification(title, options)]]: نفس [[new Notification]] بس من الـ SW، وبيشتغل والموقع مقفول. نفس الـ options: [[body]] و [[tag]]، و [[data]] أي حاجة عايزها وقت الضغط (هنا اللينك).
- [[event.waitUntil(...)]]: «متقفلنيش لحد ما الإشعار يظهر». الـ SW بيتقفل لوحده لما مفيش شغل، فمن غير ده ممكن يموت في النص.

جرّبت أبعت رسالتين من السيرفر، والـ SW استلم الاتنين:

~~~text الناتج
server: sendNotification status 201
server: second status 201
~~~

[[201]] معناه إن FCM قبل الرسالة وهيوصّلها. الرسالتين بنفس [[tag: "order-42"]]، فحسب الـ docs التانية بتبدّل الأولى في مركز الإشعارات بدل ما يبقوا اتنين.

## ٥. الـ SW: الضغط على الإشعار

~~~text sw.js
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
~~~

- [[event.notification]]: الإشعار اللي اتداس عليه. [[close()]] بتشيله.
- [[event.notification.data.url]]: اللي حطيناه في [[data]] وقت [[showNotification]].
- [[clients.openWindow(url)]]: افتح تاب جديد على اللينك ده. [[clients]] هي التابات المفتوحة من موقعك. (في مشروع حقيقي دوّر الأول بـ [[clients.matchAll()]]: لو فيه تاب مفتوح، اعمله [[focus()]] بدل تاب جديد.)

> الـ headless مبيقدرش «يدوس» على إشعار، فالجزء ده من الـ docs (MDN: notificationclick).

## ٦. الـ SW: الـ [[sync]] event

~~~text sw.js
self.addEventListener("sync", (event) => {
  if (event.tag === "send-outbox") event.waitUntil(sendOutbox());
});
~~~

- [[event.tag]]: الاسم اللي سجّلته بيه. ممكن يبقى عندك أكتر من نوع (outbox و likes...).
- [[event.waitUntil(sendOutbox())]]: لو الـ Promise اترفض (السيرفر وقع مثلًا)، المتصفح هيعيد المحاولة بعدين لوحده بفترات بتطول، وآخر محاولة [[event.lastChance]] بيبقى [[true]] (جرّبتها: أول مرة كان [[false]]). عشان كده [[sendOutbox]] لازم **ترمي** لو فشلت، مش تبلع الـ error.

## ٧. السيرفر: الإرسال

~~~text server.mjs
import webpush from "web-push";
webpush.setVapidDetails("mailto:dev@example.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
await webpush.sendNotification(subscription, JSON.stringify({ title: "طلب جديد", body: "رقم 42", tag: "order-42", url: "/orders/42" }));
~~~

- [[web-push]]: مكتبة npm بتعمل التشفير والتوقيع والـ POST للـ endpoint. (تتسطّب بـ [[npm i web-push]].)
- [[setVapidDetails(subject, public, private)]]: الـ subject لازم يبدأ بـ [[mailto:]] أو [[https:]]، عشان الـ push service يكلّمك لو فيه مشكلة. جرّبت من غير [[mailto:]]:

~~~text الناتج
Vapid subject is not a valid URL. dev@example.com
~~~

وبمفتاح غلط: [[Vapid public key should be 65 bytes long when decoded.]]

- [[sendNotification(subscription, payload)]]: [[subscription]] هو الـ object اللي الصفحة بعتته وانت حفظته، والـ payload نص (هنا JSON) وده اللي [[event.data.json()]] بيقراه في الـ SW.

### الاشتراك اللي مات

اليوزر لغى الإذن، أو مسح داتا المتصفح، أو الاشتراك انتهى. جرّبت [[unsubscribe()]] من الصفحة وبعدين بعت من السيرفر:

~~~text الناتج
WebPushError 410 push subscription has unsubscribed or expired.
~~~

[[410]] (أو [[404]]) معناها «امسحه من الداتابيز». لو مامسحتهوش، كل مرة هتبعت لعدد ناس بيزيد ومش موجودين.

---

## الخلاصة

| الحاجة | فين | بتعمل إيه |
|---|---|---|
| [[pushManager.subscribe({ userVisibleOnly, applicationServerKey })]] | الصفحة | بترجّع subscription فيه [[endpoint]] و [[keys]]، وبتبعته لسيرفرك |
| [[webpush.sendNotification(sub, payload)]] | السيرفر | بتشفّر وتوقّع وتبعت للـ endpoint، و [[410]] يعني امسح الاشتراك |
| [[push]] و [[showNotification]] | الـ SW | بتصحى وتطلّع الإشعار، جوه [[event.waitUntil]] |
| [[notificationclick]] و [[clients.openWindow]] | الـ SW | بتفتح الصفحة اللي في [[data.url]] |
| [[reg.sync.register(tag)]] | الصفحة | صحّي الـ SW لما النت يرجع (Chrome و Edge بس) |
| [[sync]] event | الـ SW | ابعت الـ outbox، ولو رميت error المتصفح بيعيد |

- الـ private key في السيرفر بس، والـ public في الصفحة.
- [[event.waitUntil]] في كل event في الـ SW بيعمل شغل async.
- Background Sync مش في Firefox و Safari: لازم بديل بـ [[online]] event.
- Web Push على iPhone للموقع المتسطّب على الشاشة الرئيسية بس (iOS 16.4 وبعده، من الـ docs).`,
          lines: [
            R`استنى لحد ما يبقى فيه service worker شغّال، وخد الـ registration بتاعه. الـ push والـ sync الاتنين بيتسجّلوا على الـ registration ده، مش على الصفحة.`,
            R`اشترك في الـ push: المتصفح بيكلّم الـ push service بتاعه (FCM في Chrome) وبيرجّع subscription. [[userVisibleOnly: true]] وعد إن كل رسالة هتطلّع إشعار (Chrome مبيقبلش غيره)، و [[applicationServerKey]] هو الـ VAPID public key بتاع سيرفرك.`,
            R`ابعت الاشتراك لسيرفرك يحفظه مع اليوزر. [[JSON.stringify(sub)]] بيطلّع [[endpoint]] و [[expirationTime]] و [[keys]]، ودول كل اللي السيرفر محتاجه عشان يبعت بعدين.`,
            R`دالة بتتنادى لما اليوزر يبعت حاجة والنت مش موجود، بعد ما الحاجة اتحفظت في outbox في IndexedDB.`,
            R`لو المتصفح فيه Background Sync (Chrome و Edge)، سجّل tag اسمه [[send-outbox]]: المتصفح هيصحّي الـ SW بيه أول ما النت يرجع، حتى لو التاب اتقفل.`,
            R`غير كده (Firefox و Safari) حاول تبعت دلوقتي بنفس الدالة، ولو فشلت الحاجة تفضل في الـ outbox لحد [[online]] event أو الزيارة الجاية.`,
            R`نهاية [[queueSend]].`,
            R`في الـ SW: [[push]] بيحصل لما رسالة توصل من سيرفرك عن طريق الـ push service، والـ SW بيصحى عشانها حتى لو الموقع مش مفتوح.`,
            R`اقرا الرسالة كـ JSON. [[?.]] لأن push ممكن يوصل من غير داتا، و [[??]] بتدّي عنوان احتياطي بدل ما الكود يقع.`,
            R`اطلّع الإشعار من الـ SW بنفس الـ options بتاعة [[new Notification]]، و [[data.url]] بيتحفظ مع الإشعار عشان نعرف نفتح إيه لما يتداس. [[event.waitUntil]] بيمنع المتصفح يقفل الـ SW قبل ما الإشعار يظهر.`,
            R`نهاية الـ push listener.`,
            R`[[notificationclick]] بيحصل لما اليوزر يدوس على إشعار طلع من الـ SW ده.`,
            R`شيل الإشعار من مركز الإشعارات، عشان ميفضلش موجود بعد ما اليوزر شافه.`,
            R`افتح تاب على اللينك اللي اتحفظ في [[data.url]]. [[clients]] هي تابات موقعك، و [[waitUntil]] عشان الـ SW يفضل صاحي لحد ما التاب يتفتح.`,
            R`نهاية الـ notificationclick listener.`,
            R`[[sync]] بيحصل لما المتصفح يشوف إن النت رجع وفيه tag متسجّل.`,
            R`لو الـ tag هو بتاعنا، ابعت الـ outbox. لو الـ Promise اترفض، المتصفح بيعيد المحاولة بعدين لوحده، فـ [[sendOutbox]] لازم ترمي error لو فشلت.`,
            R`نهاية الـ sync listener.`,
            R`في السيرفر: مكتبة [[web-push]] بتعمل تشفير الرسالة بمفاتيح الاشتراك وتوقيعها بالـ VAPID key والـ POST للـ endpoint.`,
            R`عرّف سيرفرك للـ push services: الـ subject لازم [[mailto:]] أو [[https:]] (وإلا [[Vapid subject is not a valid URL]])، والمفتاحين من متغيرات البيئة مش مكتوبين في الكود.`,
            R`ابعت رسالة لاشتراك واحد. [[subscription]] اللي اتحفظ من الصفحة، والنص JSON بيوصل للـ SW في [[event.data.json()]]. بترجّع [[statusCode]] [[201]] لو اتقبلت، وبترمي [[WebPushError]] بـ [[410]] لو الاشتراك مات.`,
          ],
          sol: R`اتجرّب كله في Chrome 156 headless ببروفايل حقيقي و Node 24 و [[web-push]] 3.6.7: الاشتراك رجع endpoint على [[fcm.googleapis.com]]، و [[sendNotification]] رجّعت [[201]] مرتين والـ SW استلم الرسالتين في [[push]]، ووانا Offline [[reg.sync.register("send-outbox")]] نجح و [[getTags()]] رجّع [[["send-outbox"]]]، وأول ما رجعت Online السيرفر استلم [[POST /api/outbox]] من الـ SW لوحده. وبعد [[unsubscribe()]] الإرسال رمى [[WebPushError 410 push subscription has unsubscribed or expired.]]

اللي من الـ docs (MDN: Push API و Background Synchronization API و notificationclick): شكل الإشعار على الشاشة وهو ظاهر والتاب مقفول، وإن الضغطة بتفتح [[/orders/42]]، وإن Firefox و Safari مفيهمش [[reg.sync]]، و Web Push على iPhone للموقع المتسطّب بس.`
        }
      ]
    }
]);
