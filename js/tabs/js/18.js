// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "PWA و service worker",
      l: 3,
      n: "الموقع يتسطّب ويشتغل من غير نت: manifest، ودورة حياة الـ SW، واستراتيجيات الكاش، وزرار «نسخة جديدة»، و IndexedDB",
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
| [[display: "browser"]] | [[manifest-display-not-supported]] |
| [[minimal-ui]] | مفيش أخطاء |
| من غير [[name]] و [[short_name]] | [[manifest-missing-name-or-short-name]] |
| من غير [[start_url]] | [[start-url-not-valid]] |
| أيقونة 192 بس (من غير 512) | مفيش أخطاء |
| أيقونة 192 بمسار غلط ولا غيرها | [[no-acceptable-icon]] و [[minimum-icon-size-in-pixels: 144]] |
| [[icons]] فاضية | [[manifest-missing-suitable-icon]] |

يعني Chrome فعلًا بيطلب أيقونة واحدة على الأقل 144 pixel وتتحمّل فعلًا. الـ 192 والـ 512 هما المقاسات اللي بيوصّوا بيها عشان كل الشاشات تبقى حلوة (192 للأيقونة، و 512 لشاشة البداية)، فحطهم الاتنين.

> الأخطاء دي بالظبط بتظهر بالكلام العادي في DevTools ← Application ← Manifest ← Installability. لو زرار التسطيب مظهرش، ده أول مكان تبص فيه.

---

## الخلاصة

| لازم لـ Chrome | مستحسن |
|---|---|
| HTTPS أو localhost | [[short_name]] و [[lang]] و [[dir]] |
| [[name]] أو [[short_name]] | أيقونة 192 و 512 وواحدة [[maskable]] |
| [[start_url]] صالح | [[theme_color]] و [[background_color]] |
| [[display]] مش [[browser]] | [[scope]] نسبي زي [[start_url]] |
| أيقونة 144 pixel أو أكبر بتتحمّل | |

- المسارات النسبية ([["./"]]) بتتحسب من مكان الـ manifest، مش من الصفحة.
- مفيش تعليقات في JSON.
- على iPhone مفيش زرار تسطيب خالص: اليوزر بيضغط Share ← Add to Home Screen.`,
          lines: [
            "القوس.",
            "الاسم الكامل (شاشة التسطيب).",
            "الاسم تحت الأيقونة.",
            "اللغة.",
            "الاتجاه.",
            R`يفتح على فين. [["./"]] نسبي للـ manifest، عشان يشتغل في أي فولدر.`,
            "الـ URLs اللي جوه التطبيق.",
            "شباك لوحده من غير شريط العنوان.",
            "لون شاشة البداية.",
            "لون شريط النظام.",
            "الأيقونات.",
            "للشاشات العادية.",
            "للتسطيب وشاشة البداية.",
            R`[[maskable]]: Android يقصها بالشكل اللي عايزه.`,
            "قفلة.",
            "قفلة."
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
            "سجّل الـ SW لو المتصفح بيدعمه.",
            "اسم الكاش: غيّره مع كل release.",
            "الملفات الأساسية اللي تتحفظ من الأول.",
            R`[[install]]: أول مرة أو نسخة جديدة.`,
            R`[[waitUntil]]: الـ install مخلصش لحد ما كل الملفات تتحفظ.`,
            "قفلة.",
            R`[[activate]]: القديم مشي والجديد استلم.`,
            "دالة async جوه waitUntil.",
            "كل الكاشات الموجودة.",
            "امسح أي كاش غير الحالي.",
            R`[[clients.claim]]: امسك الصفحات المفتوحة دلوقتي.`,
            "قفلة.",
            "قفلة.",
            "رسالة من الصفحة.",
            R`[[skipWaiting]]: متستناش، اتفعّل دلوقتي (بعد ما اليوزر يوافق).`,
            "قفلة."
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
            "كل request من الصفحات اللي تحت الـ scope.",
            "الـ request.",
            "الـ URL كـ object عشان نقرا pathname و origin.",
            "POST أو origin تاني: سيبه للشبكة عادي.",
            R`صفحة (HTML): network-first.`,
            R`ملفات بـ hash تحت [[/assets/]]: cache-first.`,
            "API عام: stale-while-revalidate.",
            "قفلة.",
            "network-first.",
            "الكاش بتاعنا.",
            "جرّب الشبكة.",
            "هات من الشبكة.",
            R`احفظ نسخة لو الرد سليم. [[clone]] لأن الـ body بيتقري مرة.`,
            "رجّع الرد للصفحة.",
            "مفيش نت.",
            R`من الكاش، ولو مش موجودة [[offline.html]].`,
            "قفلة.",
            "قفلة.",
            "cache-first.",
            "دوّر في كل الكاشات.",
            "موجود: رد فورًا من غير شبكة.",
            "مش موجود: هاته.",
            "واحفظه للمرة الجاية.",
            "ورجّعه.",
            "قفلة.",
            "stale-while-revalidate.",
            "الكاش.",
            "القديم (لو فيه).",
            "في نفس الوقت: هات الجديد.",
            "وحدّث الكاش.",
            "ورجّع الجديد (لو مكانش فيه قديم).",
            "قفلة.",
            R`خلي الـ SW صاحي لحد ما التحديث يخلص، وتجاهل فشله.`,
            "القديم فورًا لو موجود، وإلا استنى الجديد.",
            "قفلة."
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
            R`سجّل واستنى الـ registration (محتاج module لـ await برّه دالة).`,
            "الشريط.",
            "دالة تعرض الشريط.",
            "أظهره.",
            R`الزرار: قول للـ SW الجديد يعمل skipWaiting.`,
            "قفلة.",
            R`كان فيه SW مستني قبل ما الصفحة تفتح، ومش أول زيارة.`,
            "المتصفح لقى sw.js جديد وبدأ يسطّبه.",
            "الـ worker الجديد.",
            "تابع حالته.",
            R`خلص install وفيه قديم شغال: يبقى waiting. اعرض الشريط.`,
            "قفلة.",
            "قفلة.",
            "عشان reload مرة واحدة بس.",
            "الـ SW اللي بيتحكم في الصفحة اتغير.",
            "عملنا reload خلاص: متعملش تاني.",
            "علّم.",
            "حمّل الصفحة بالنسخة الجديدة.",
            "قفلة.",
            "افحص تحديثات كل ساعة للصفحات اللي بتفضل مفتوحة."
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
            "defineConfig بتاع Vite.",
            "plugin الـ React.",
            "plugin الـ PWA.",
            "الـ config.",
            "الـ plugins.",
            "React.",
            "الـ PWA.",
            R`[[prompt]]: متحدّثش لوحدك، اسأل اليوزر.`,
            R`ملفات من [[public/]] تتحفظ كمان.`,
            "الـ manifest بيتولّد منه.",
            "الأسماء والاتجاه واللون.",
            "الأيقونات.",
            "192.",
            "512.",
            "قفلة.",
            "قفلة الـ manifest.",
            "أنواع الملفات اللي تدخل الـ precache.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`module افتراضي بيولّده الـ plugin (مش ملف عندك).`,
            "سجّل الـ SW.",
            "فيه نسخة جديدة مستنية (waiting).",
            R`[[updateSW(true)]]: skipWaiting + reload. (في تطبيق حقيقي شريط مش confirm.)`,
            "قفلة.",
            "أول تسطيب خلص.",
            "الموقع بقى يشتغل offline.",
            "قفلة.",
            "قفلة."
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

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[openDB(name, v, { upgrade })]] | تفتح، و upgrade بتتنادى لما الـ version يزيد |
| [[createObjectStore]] و [[createIndex]] | جوه upgrade بس |
| [[db.put]] | ضيف أو استبدل |
| [[getAllFromIndex]] | كله مترتب بالـ index |
| [[BroadcastChannel]] | رسالة لكل التابات **ما عدا** اللي بعت |
| [[navigator.storage.persist()]] | اطلب الداتا متتمسحش |

- عايز تغيّر الـ schema؟ زوّد الـ version.
- التاب اللي غيّر يرسم بنفسه.`,
          lines: [
            R`[[idb]]: wrapper بالـ promises.`,
            "افتح (أو اعمل) الداتابيز، version 1.",
            R`[[upgrade]]: أول مرة أو version أعلى، زي migration.`,
            R`store اسمه notes، والمفتاح [[id]] جوه الـ object.`,
            "index عشان نرتّب بالتاريخ.",
            "قفلة.",
            "قفلة.",
            "ضيف ملاحظة.",
            R`[[put]]: ضيف أو استبدل.`,
            "قول للتابات التانية.",
            "قفلة.",
            "قناة باسم notes على نفس الـ origin.",
            "رسالة من تاب تاني.",
            "اقرا من جديد وارسم.",
            "قفلة.",
            "الرسم (هنا console بس).",
            "اطبع النصوص.",
            "قفلة.",
            "ضيف.",
            R`التاب اللي بعت مبيستلمش رسالته، فارسم بنفسك.`,
            "اطلب إن الداتا متتمسحش لما المساحة تقل."
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
        }
      ]
    }
]);
