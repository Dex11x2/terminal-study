// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "Network: كل طلب الصفحة بتعمله",
      l: 2,
      n: "هنا بتشوف الكلام اللي بين المتصفح والسيرفر",
      projects: [
        { lvl: 'صغير', t: R`ملخّص HAR`, what: R`سكربت [[har-summary.mjs]] بياخد ملف HAR ويطبع: عدد الطلبات، والحجم الكلي، وأبطأ ١٠، وأكبر ١٠، والفاشلين، وتوزيع البروتوكولات ([[http/1.1]] و [[h2]] و [[h3]]). من دروس Network.`, done: R`على HAR حقيقي بيطبع الـ ٦ أقسام، والأرقام مطابقة للشريط اللي تحت في Network، وعلى ملف مش JSON بيطبع رسالة مفهومة ويخرج بـ [[1]].` },
        { lvl: 'صغير', t: R`صفحة «اختبر النت البطيء»`, what: R`فورم صغير بيبعت POST ويستنى ٢ ثانية، بـ loading state وزرار [[disabled]] ورسالة خطأ لو Offline. اختبرها على Slow 4G و Offline و Block request. من درس «Throttling و Blocking».`, done: R`على Slow 4G داسة واحدة = طلب واحد، و Offline بيطلّع رسالة «مفيش نت» مش صفحة بيضا، و Block request بيرجّع الزرار لحالته.` },
        { lvl: 'متوسط', t: R`مراقب WebSocket للشات`, what: R`شات صغير بـ [[ws]] (Node) فيه ping كل ٢٥ ثانية و reconnect بـ backoff، وسكربت Playwright بيقرا الـ frames من DevTools Protocol ويطبع عدد الرسايل وأكواد القفل. من درس «WebSocket و SSE في Network».`, done: R`لما وقفت السيرفر ٥ ثواني، الصفحة رجعت اتصلت لوحدها، و Messages فيه القفلة بـ [[1006]] والاتصال الجديد، والسكربت طبع ٢ connections.` },
        { lvl: 'متوسط', t: R`حالة الأوردر بـ SSE`, what: R`صفحة بتعرض حالة أوردر لحظي بـ [[EventSource]]، والسيرفر بيكمّل من [[Last-Event-ID]] بعد أي انقطاع، ومبيبعتش نفس الحدث مرتين. من درس «WebSocket و SSE في Network».`, done: R`قفلت السيرفر في النص وشغّلته: الصفحة كمّلت من الحدث اللي بعد آخر واحد وصل، و EventStream مفيهوش تكرار، وعلى HTTP/2 ١٠ تابات شغالين مع بعض.` },
        { lvl: 'كبير', t: R`مسجّل أداء الصفحة من الترمنال`, what: R`CLI بـ Playwright و CDP بياخد URL ويطبع waterfall نصي: كل طلب ومراحله (DNS و connect و TTFB و download)، والـ initiator، والبروتوكول، والحجم قبل وبعد الضغط، ويعلّم على اللي اتأخر بسبب queueing (حد الـ ٦ في HTTP/1.1). وفيه [[--throttle slow4g]] و [[--json]].`, done: R`على صفحة فيها ٦٠ صورة على HTTP/1.1 بيعلّم على الطلبات اللي استنت (عندنا أكتر من ثانية)، وعلى HTTP/2 مبيعلّمش، و [[--json]] بيطلّع JSON صالح، و URL مبيردش بيقول timeout بعد ٣٠ ثانية.`, ext: R`قارن تشغيلين وطلّع الفرق، أو صدّر HAR بنفس الشكل اللي DevTools بيقراه.` },
        { lvl: 'فكرة', t: R`محاكي «يوم وحش» للموقع`, what: R`أداة بتشغّل موقعك تحت ظروف وحشة متدرّجة: نت بطيء، وAPI بيرد ٥٠٠، و CDN واقع (Block)، وخط مش بيتحمّل، وتقول لكل حالة الصفحة عملت إيه. انت بتختار السيناريوهات.`, done: R`٥ سيناريوهات على الأقل، ولكل واحد screenshot وحكم (اتعامل كويس/لأ)، وواحد على الأقل كشف باج حقيقي وصلّحته.`, ext: R`خليها تشتغل في CI قبل كل نشر، وزوّد سيناريو «النت بيقطع وبيرجع» لتطبيقات الـ offline.` },
      ],
      items: [
        {
          cmd: "Network",
          title: "الأساس",
          desc: "افتح التاب وبعدين اعمل ريفريش، لأنه بيسجّل من لحظة ما تفتحه. كل سطر طلب: الاسم، والـ Status، والنوع، والحجم، والوقت. الأحمر طلبات فشلت. فلتر [[Fetch/XHR]] بيوريك طلبات الـ API بس، وده اللي هتستخدمه أكتر حاجة. علّم على Preserve log لو الصفحة بتعمل redirect أو بتعمل submit وبتنقلك، وإلا هيتمسح. وتحت خالص: عدد الطلبات والحجم الكلي ووقت التحميل.",
          example: R`Ctrl+R (DevTools open)   Record page load
Filter: Fetch/XHR        API calls only
Filter box: status-code:500   Only failed server calls
Preserve log             Keep requests across navigation
Disable cache            Always load fresh`,
          try: "افتح موقعك، واعرف كام طلب بيعمل، وإيه أكبر ملف، وإيه أبطأ طلب.",
          flag: "keys",
          deep: {
            why: "الصفحة بطيئة، أو API بيرجع حاجة غلط. Network هو «السجل الكامل» للكلام بين المتصفح والسيرفر.",
            how: R`Network بيسجّل من لحظة ما تفتحه. لو فتحته بعد تحميل الصفحة، هتلاقيه فاضي، لازم Ctrl+R عشان تصوّر التحميل.

كل سطر طلب واحد، الأحمر فشل. الفلاتر فوق: All الكل، وFetch/XHR طلبات API، وDoc الصفحات. غالبًا هتكون في Fetch/XHR.

«Preserve log»: لو الصفحة بتعمل redirect أو form submit، السجل بيتمسح بدونه.

تحت: إجمالي عدد الطلبات، والحجم الكلي، والوقت. وفوق خالص: timeline بيوريك متى بدأ كل طلب.`,
            when: "API بيرجع error. الصفحة بطيئة وعايز تعرف أي طلب السبب. تتأكد إن طلب معين اتبعت أصلًا.",
            mistakes: "تفتح Network بعد تحميل الصفحة وتلاقيه فاضي. وتنسى Preserve log لما الصفحة بتعمل redirect."
          },
          teach: R`## الأول: Network بيسجّل، مش بيفتكر

تاب Network بيكتب سطر لكل طلب المتصفح بيعمله، **من لحظة ما تفتحه**. لو فتحته والصفحة محمّلة خلاص، هتلاقيه فاضي، فلازم [[Ctrl+R]] وهو مفتوح. أسامي الأزرار والفلاتر من Chrome DevTools docs (صفحة Network reference)، والأرقام اللي تحت من تجربة حقيقية.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Ctrl+R (DevTools open)]] | ريفريش وانت بتسجّل، فتشوف كل طلبات التحميل |
| [[Filter: Fetch/XHR]] | يخفي الصور والـ CSS والـ JS ويسيب طلبات الـ API ([[fetch]] و [[XMLHttpRequest]]، الاسم القديم) |
| [[Filter box: status-code:500]] | في خانة الفلتر تكتب [[property:value]]، وده بيسيب الطلبات اللي رجعت 500 بس |
| [[Preserve log]] | ميمسحش السجل لما الصفحة تنتقل (redirect أو submit فورم) |
| [[Disable cache]] | كل طلب يروح للسيرفر، زي زائر جديد |

---

## ٢. نفس المعلومات من Console

المعلومات اللي في جدول Network موجودة كمان في الـ Performance API جوه الصفحة. فتحت صفحة تجربة فيها CSS وصورتين وكتبت:

~~~javascript Console
performance.getEntriesByType("resource").length
performance.getEntriesByType("resource").map(r => r.name.replace(location.origin, "") + "  " + r.transferSize + " B  " + Math.round(r.duration) + " ms")
~~~

~~~text الناتج
4
["/assets/app.css  489 B  11 ms", "/logo.png  370 B  13 ms", "/banner.png  370 B  14 ms", "/favicon.ico  450 B  3 ms"]
~~~

- [[performance.getEntriesByType("resource")]]: كل ملف الصفحة طلبته بعد الـ HTML نفسه (عشان كده ٤ مش ٥).
- [[r.name]]: الـ URL، و [[.replace(location.origin, "")]] بيشيل [[http://127.0.0.1:8791]] من أوله عشان يقصر.
- [[r.transferSize]]: اللي نزل على الشبكة فعلًا بالـ byte، **بالـ headers**. عشان كده صورة حجمها ٧٠ byte طلعت ٣٧٠: الباقي headers الرد. ده نفس عمود Size في Network.
- [[r.duration]]: من أول الطلب لآخر byte بالـ ms، زي عمود Time.

---

## ٣. الشريط اللي تحت

تحت جدول Network فيه سطر بالشكل ده (الأرقام مثال):

~~~text شكل الشريط
42 requests | 1.8 MB transferred | 3.2 MB resources | Finish: 2.1 s | DOMContentLoaded: 0.9 s | Load: 1.6 s
~~~

| الخانة | معناها |
|---|---|
| requests | عدد الطلبات |
| transferred | اللي نزل على الشبكة (مضغوط، وبالـ headers) |
| resources | حجم الملفات بعد فك الضغط |
| Finish | آخر طلب خلص إمتى (ممكن يزيد مع طلبات API بعد التحميل) |
| DOMContentLoaded و Load | الـ HTML اتقرا، وبعدين كل الصور والملفات خلصت |

## الخلاصة

- افتح Network الأول وبعدين [[Ctrl+R]].
- [[Fetch/XHR]] للـ API، و [[status-code:500]] للطلبات اللي فشلت على السيرفر.
- Size = اللي نزل بالـ headers، و Time = المدة كلها. رتّب بيهم تلاقي الأكبر والأبطأ.`,
          sol: R`اعمل Ctrl+R وDevTools مفتوحة على Network. تحت خالص في الـ status bar هتلاقي حاجة زي [[42 requests | 1.8 MB transferred | 3.2 MB resources | Finish: 2.1 s]]: ده عدد الطلبات، و transferred هو اللي نزل فعلًا على الشبكة (مضغوط)، و resources حجمه بعد فك الضغط.

أكبر ملف: دوس على عمود Size يترتب. أبطأ طلب: دوس على عمود Time. الأكبر غالبًا صورة مش مضغوطة أو JS bundle، والأبطأ غالبًا API call أو خط من بره.

لو لقيت الأرقام صغيرة بشكل غريب والـ Size مكتوب فيه [[(memory cache)]]، علّم Disable cache وكرّر، عشان تقيس اللي زائر جديد بيشوفه.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح Network بعد ما الصفحة حمّلت. فاضي ليه؟ اعمل اللي يملاه، وبعدين اكتب الأرقام اللي في الشريط اللي تحت (requests و transferred و resources و Finish و DOMContentLoaded و Load).`, done: R`كاتب إن Network بيسجّل من لحظة ما يتفتح، و ٦ أرقام من الشريط، والفرق بين transferred و resources (المضغوط والكاش مقابل الحجم الحقيقي).`, sol: R`1. افتح الصفحة، وبعد ما تحمّل افتح Network: هتلاقيه فاضي.
2. اعمل ريفريش ([[Ctrl+R]]) والـ Network مفتوح.
3. اقرا الشريط اللي تحت الجدول.

فاضي ليه: Network **بيسجّل من لحظة ما يتفتح**، ومبيفتكرش اللي حصل قبله. عشان كده الريفريش بعد الفتح هو اللي بيملاه.

معنى الأرقام: [[requests]] عدد الطلبات. و [[transferred]] اللي نزل فعلًا على الشبكة بعد الضغط، ومن الكاش بيتحسب صفر تقريبًا. و [[resources]] الحجم الحقيقي بعد فك الضغط، وده اللي المتصفح اشتغل عليه. و [[DOMContentLoaded]] الـ HTML اتقرا. و [[Load]] كل الصور والـ CSS خلصوا. و [[Finish]] آخر طلب خلص، وبيفضل يزيد لو الصفحة بتبعت طلبات بعد التحميل.

الغلطة: تحكم على حجم الصفحة من [[transferred]] وانت جاي من الكاش، فتلاقي رقم صغير وتفرح. علّم Disable cache الأول. ولو حكمت على أداء الجهاز، [[resources]] هو اللي بيتقري ويتنفذ.

الأرقام دي من صفحة معمل فيها CSS و JS مضغوطين بـ gzip، اتجمعت من أحداث DevTools Protocol. [[Finish]] رقم بتحسبه الواجهة، فمش مكتوب هنا.

~~~text الناتج
10 requests | 2.6 kB transferred | 160.6 kB resources | DOMContentLoaded: 33 ms | Load: 41 ms
~~~` },
            { lvl: 'تطبيق', t: R`**فلتر:** على موقع فيه API، طلّع بالفلاتر: طلبات الـ API بس، وبعدين اللي رجعت 4xx أو 5xx، وبعدين أكبر ٣ ملفات. جرّب في صندوق الفلتر [[status-code:404]] و [[larger-than:100k]] و [[-domain:*.google-analytics.com]] و [[method:POST]].`, done: R`لكل فلتر مكتوب عدد الطلبات اللي فضلت، وعارف إن [[-]] قبل أي فلتر بيعكسه.`, sol: R`على صفحة معمل فيها ١٠ طلبات، جرّب كل فلتر لوحده في صندوق الفلتر:

~~~text صندوق الفلتر
status-code:404
larger-than:100k
-domain:*.google-analytics.com
method:POST
~~~

1. زرار Fetch/XHR: طلبات الـ API بس.
2. عشان 4xx و 5xx: [[status-code:404]]، وبعدها [[status-code:500]]. أو علّم عمود Status ورتّب بيه.
3. أكبر ٣ ملفات: دوس على رأس عمود Size مرتين عشان ترتّب من الكبير.

كل فلتر بيبص على خاصية. و [[-]] قبله بيعكسه، فـ [[-domain:*.google-analytics.com]] معناه «خبّي الدومين ده». و [[larger-than:100k]] بيقارن بالحجم الحقيقي بعد فك الضغط، عشان كده [[app.js]] طلع رغم إن اللي نزل منه ٣٧٧ بايت.

الغلطة: تكتب مسافة بعد النقطتين ([[status-code: 404]]) فالفلتر يتعامل معاها كنص عادي. أو تدوّر على طلبات الـ API وأنت على All، وتضيع وسط الصور.

الصندوق واجهة، فالصيغة من وثائق Chrome. والأعداد محسوبة من نفس جدول الطلبات اللي اتسجّل بالـ Protocol.

~~~text الناتج
Fetch/XHR                         3   (/api/me و /api/nope و /api/save)
status-code:404                   2   (/api/nope و favicon.ico)
larger-than:100k                  1   (app.js: 120 kB بعد الفك)
-domain:*.google-analytics.com    10  (مفيش طلبات للدومين ده)
method:POST                       1   (/api/save)
~~~` },
            { lvl: 'تطبيق', t: R`**Preserve log:** فورم login بيعمل redirect. سجّل الطلب اللي بيبعت الباسورد مرة من غير Preserve log ومرة بيه.`, done: R`من غيره الطلب بيختفي بعد الـ redirect، وبيه بتلاقي الـ POST والـ 302 (أو 303) وبعده الـ GET للصفحة الجديدة بالترتيب.`, sol: R`~~~html login.html
<form method="post" action="/login">
  <input name="user" value="sara">
  <input name="password" type="password" value="demo123">
  <button>دخول</button>
</form>
~~~
~~~js جوه السيرفر
if (req.url === "/login") { res.writeHead(303, { Location: "/home.html" }); return res.end(); }
~~~

1. افتح [[login.html]] و Network مفتوح، **من غير** Preserve log، ودوس دخول.
2. علّم Preserve log، وارجع، ودوس دخول تاني.
3. دوس على طلب [[login]]، وافتح Payload.

الـ redirect معناه تنقّل لصفحة جديدة، و Network بيفضّي الجدول عند أي تنقّل. فالطلب اللي بعت الباسورد بيتمسح قبل ما تلحق تشوفه. و Preserve log بيقوله «متفضّيش».

لاحظ في Payload إن الباسورد مكتوب نص عادي. ده طبيعي: هو مشفّر على الشبكة بـ HTTPS، بس في متصفحك انت شايفه. وعشان كده مبتبعتش لقطة Network لحد.

الغلطة: تدوّر على طلب اللوجن في الصفحة الجديدة بدون Preserve log، وتفتكر إن الفورم مبعتش حاجة. ولو [[status]] بتاعه [[200]] مش [[3xx]] يبقى السيرفر رجّع الفورم تاني، وغالبًا فيه خطأ.

مسح الجدول سلوك واجهة من وثائق Chrome. والتسلسل نفسه اتسجّل بالـ Protocol:

~~~text الناتج (مع Preserve log)
POST /login        user=sara&password=demo123
303 -> /home.html
GET  /home.html    200
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية (HAR):** كليك يمين في Network ثم Save all as HAR. افتح الملف في محرر: ده JSON. بـ [[node -e]] طلّع أبطأ ٥ طلبات ([[entries[].time]]) وحجم كل واحد.`, done: R`السكربت بيطبع ٥ سطور متترتبين بالوقت. وكاتب تحذير: الـ HAR ممكن يبقى فيه الكوكيز والتوكن، فافتحه ودوّر على [[cookie]] و [[authorization]] قبل ما تبعته لحد (حسب Chrome docs، النسخ الجديدة بتشيل الحساس افتراضيًا إلا لو اخترت التصدير «with sensitive data»).`, sol: R`~~~bash
node -e "
const h = JSON.parse(require('fs').readFileSync('site.har', 'utf8'));
const top = h.log.entries
  .map(e => ({ u: new URL(e.request.url).pathname, t: Math.round(e.time), s: e.response.content.size }))
  .sort((a, b) => b.t - a.t).slice(0, 5);
for (const x of top) console.log(x.t + ' ms', x.s + ' B', x.u);
"
grep -c -i "cookie" site.har
~~~

الـ HAR ملف JSON عادي، وكل طلب عنصر في [[log.entries]]. وفيه [[time]] (الوقت الكلي بالـ ms)، و [[response.content.size]] (الحجم). فـ [[.map]] بتختصر كل عنصر للي محتاجه، و [[.sort]] بترتب من الأبطأ، و [[.slice(0, 5)]] بتاخد الخمسة.

**تحذير قبل ما تبعته لحد:** الملف ممكن يبقى فيه الكوكيز والتوكن. افتحه ودوّر على [[cookie]] و [[authorization]]. حسب وثائق Chrome، النسخ الجديدة بتشيل البيانات الحساسة افتراضيًا إلا لو اخترت «with sensitive data». ودوّر بنفسك، متعتمدش على الافتراضي. و [[grep -c]] هنا طلع ٢٤ سطر، لأن HAR من Playwright بيكتب مفاتيح اسمها [[cookies]] حتى لو فاضية، فالمهم تبص على القيم.

الغلطة: تبعت الـ HAR لدعم فني أو في issue عام من غير ما تفتحه. ده زي ما تبعت الكوكي نفسها.

الملف هنا اتعمل بـ [[recordHar]] في Playwright، لأن زرار Save all as HAR واجهة. نفس الصيغة.

~~~text الناتج (الصور i7 لـ i9 استنوا اتصال، والسيرفر بيأخّر كل صورة 300ms)
329 ms 70 B /i7.png
329 ms 70 B /i8.png
328 ms 70 B /i9.png
320 ms 70 B /i2.png
320 ms 70 B /i5.png
~~~` },
            { lvl: 'تحدي', t: R`**اقرا الـ Waterfall:** على أي صفحة، لاقي في عمود Waterfall طلب بدأ متأخر عن الباقي. مرّر الماوس عليه: الوقت راح في Queueing ولا Stalled ولا Waiting؟ ودوّر في Initiator مين اللي طلبه.`, done: R`كاتب اسم الطلب، والمرحلة الكبيرة ورقمها، والـ initiator (سكربت ولا CSS ولا الـ HTML)، وتفسيرك ليه اتأخر (اتكشف متأخر، ولا مستني connection، ولا السيرفر بطيء).`, sol: R`~~~html water.html
<link rel="stylesheet" href="/late.css">
<img src="/i1.png"> ... <img src="/i9.png">      <!-- ٩ صور، السيرفر بيأخّر كل واحدة 300ms -->
<div class="x"></div>
~~~
~~~css late.css
.x { height: 9px; background: url(/late.png) }
~~~

1. افتح Network، واعمل ريفريش، وبص على عمود Waterfall.
2. لاقي طلب بدأ بعد الباقي، ومرّر الماوس عليه.
3. افتح الطلب، وتاب Timing للأرقام، وتاب Initiator لمين طلبه.

**القراءة:**

- [[Queueing]] أو [[Stalled]] كبير: الطلب كان **مستني دوره**. على HTTP/1.1 المتصفح بيفتح ٦ اتصالات لكل host، فالسابع بيستنى.
- [[Waiting (TTFB)]] كبير: الطلب وصل والسيرفر هو البطيء.
- بدأ متأخر وفي Initiator ملف CSS أو JS: الطلب **اتكشف متأخر**، لأن المتصفح مشافش الرابط غير لما قرا الملف ده.

في المعمل [[i7.png]] طلع الـ ٦ اللي قبله ماسكين الاتصالات، فاستنى 307ms. و [[late.png]] Initiator بتاعه [[late.css]]، يعني مكنش ينفع يبدأ قبل ما CSS يتقرا.

الغلطة: تبص على طول الشريط وتقول «السيرفر بطيء». لو الوقت في Stalled، السيرفر ملوش ذنب، وتحسين الكود مش هيفيد. الحل HTTP/2، أو عدد ملفات أقل.

~~~text الناتج (الأرقام بالـ ms من response.timing)
الطلب        بدأ   Stalled   Waiting   Initiator
i1.png       9     3         315       الـ HTML
i7.png       9     307       309       الـ HTML    ← مستني اتصال
late.png     23    307       0         late.css    ← اتكشف متأخر
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** الفرق بين DOMContentLoaded و Load: ابني صفحة فيها صورة تقيلة بتتأخر من السيرفر (سيرفر Node بـ [[setTimeout]] ٢ ثانية)، وقيس الرقمين.`, done: R`DOMContentLoaded طلع قبل Load بحوالي ٢ ثانية، وكاتب إن DOMContentLoaded = الـ HTML اتقرا والسكربتات العادية اشتغلت، و Load = كل الصور والـ CSS خلصت.`, sol: R`~~~js server.mjs
import http from "node:http";
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
http.createServer((req, res) => {
  if (req.url === "/slow.png") {
    return setTimeout(() => { res.writeHead(200, { "Content-Type": "image/png" }); res.end(png); }, 2000);
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end('<!doctype html><h1>t</h1><img src="/slow.png">');
}).listen(8910, "127.0.0.1");
~~~
~~~js Console
const n = performance.getEntriesByType("navigation")[0];
[Math.round(n.domContentLoadedEventEnd), Math.round(n.loadEventEnd)];
~~~

[[DOMContentLoaded]]: المتصفح قرا الـ HTML كله وبنى الـ DOM، والسكربتات العادية اشتغلت. الصور مش بتأخّره.

[[Load]]: كل حاجة في الصفحة خلصت، الصور والـ CSS والـ iframes.

عشان كده الصورة اللي السيرفر بيأخّرها ٢ ثانية أخّرت Load بس. وأي كود محتاج الـ DOM يتحط في DOMContentLoaded، مش [[load]]، عشان ميستناش الصور.

الغلطة: تعتبر إن سكربت [[<script src>]] عادي في الـ [[<head>]] زي الصورة. السكربت العادي **بيأخّر** DOMContentLoaded، لأن المتصفح لازم يشغّله الأول. وكمان Load مش معناه إن المستخدم شاف الصفحة: دي شغلة LCP.

~~~text الناتج
DOMContentLoaded: 26 ms
Load:             2017 ms       (الفرق 1991 ms، يعني الـ ٢ ثانية بتاعة الصورة)
~~~` },
          ],
        },
        {
          cmd: "تفاصيل الطلب",
          title: "دوس على أي طلب",
          desc: "[[Headers]]: الـ URL والـ method والـ status، وheaders الطلب والرد. [[Payload]]: البيانات اللي اتبعتت (body أو query). [[Preview]]: الرد منسّق، ولو JSON هيبقى شجرة تفتحها. [[Response]]: الرد خام زي ما جه. [[Timing]]: الوقت راح فين. لو «Waiting for server response» (TTFB) كبير يبقى السيرفر أو الـ API بطيء، ولو «Content Download» كبير يبقى الملف تقيل.",
          example: R`Headers    URL, method, status, request + response headers
Payload    What you sent (JSON body, form data, query params)
Preview    Parsed response (JSON tree, image)
Response   Raw response text
Timing     Where the time went (TTFB = server thinking)
Initiator  Which code line fired this request`,
          try: "اعمل login على موقع بتاعك وافتح طلب الـ login: شوف الـ Payload، والـ status، والـ Set-Cookie في الرد.",
          flag: "keys",
          deep: {
            why: "شوفت في Network طلب أحمر أو بطيء. محتاج تعرف التفاصيل: إيه اللي اتبعت، وإيه اللي رجع، والوقت راح فين.",
            how: R`دوس على أي طلب يفتح panel جانبي.

Headers: الـ URL والـ method والـ status. وResponse Headers كل header رجع (Content-Type، وSet-Cookie...). وRequest Headers كل header اتبعت (Authorization، وCookie...).

Payload: اللي انت بعتته. لو GET: query parameters. لو POST: الـ body.

Preview: الرد منسّق. لو JSON هيوريكه كشجرة. أسرع من Response في القراية.

Timing: أهم تاب للأداء. «Waiting (TTFB)» وقت انتظار أول byte: لو كبير، المشكلة في السيرفر أو قاعدة البيانات. «Content Download» وقت تحميل الرد: لو كبير، الرد تقيل.`,
            when: "بعد أي API request يطلع error: Headers للـ status، وPayload للتأكد من البيانات، وPreview لرسالة الـ error. وTiming لو الـ API بطيء.",
            mistakes: "إنك تتجاهل Timing وتفضل تدوّر في الكود، والمشكلة query بطيء في قاعدة البيانات."
          },
          teach: R`## الأول: كل طلب ليه ٦ تابات

لما تدوس على طلب في Network بيفتح لوحة جنبه. أسماء التابات ومحتواها من Chrome DevTools docs، والأرقام والقيم اللي تحت من تجربة حقيقية على سيرفر محلي.

| التاب | فيه إيه |
|---|---|
| Headers | الـ URL والـ method والـ status، وheaders الطلب والرد |
| Payload | اللي انت بعته: query params أو body |
| Preview | الرد متفسّر: JSON كشجرة، صورة كصورة |
| Response | الرد نص خام |
| Timing | الوقت راح فين |
| Initiator | مين اللي عمل الطلب (أنهي ملف وسطر) |

---

## ١. Headers و Payload و Preview بمثال

عملت من Console طلب [[POST]] لـ [[/api/users]] على السيرفر المحلي بالبودي [[{"name":"test","email":"test@example.com"}]]. القيم دي حقيقية، ومتلخّصة بنفس ترتيب تاب Headers:

~~~text تاب Headers (ملخص)
Request URL:     http://127.0.0.1:8791/api/users
Request Method:  POST
Status Code:     201 Created
Response Headers:  Content-Type: application/json; charset=utf-8
Request Headers:   Content-Type: application/json
~~~

- **Payload** هيعرض البودي اللي بعته (ولو GET هيعرض الـ query params اللي بعد [[?]] في جدول).
- **Preview** هيعرض الرد [[{id: 7, name: "test", email: "test@example.com"}]] كشجرة، و **Response** نفس الكلام نص خام.

---

## ٢. Timing: الوقت راح فين

أهم خانتين:

- **Waiting for server response** (اسمها TTFB = Time To First Byte): من ما الطلب خلص إرسال لحد أول byte في الرد. ده وقت تفكير السيرفر.
- **Content Download**: من أول byte لآخر byte. ده حجم الرد على سرعة النت.

عملت endpoint [[/slow]] بيستنى ٨٠٠ms قبل ما يرد، وقست الخانتين من Console بالـ Performance API (نفس الأرقام اللي Timing بيعرضها):

~~~javascript Console
await fetch("/slow").then(r => r.json())
(() => { const t = performance.getEntriesByName(location.origin + "/slow")[0]; return { waiting_TTFB: Math.round(t.responseStart - t.requestStart), download: Math.round(t.responseEnd - t.responseStart) } })()
~~~

~~~text الناتج
{ok: true}
{waiting_TTFB: 805, download: 0}
~~~

- [[requestStart]]: الطلب اتبعت إمتى. [[responseStart]]: أول byte وصل إمتى. الفرق = TTFB.
- [[responseEnd]]: آخر byte. الفرق بينه وبين [[responseStart]] = Content Download.

الناتج: ٨٠٥ms انتظار و ٠ تحميل. يعني الرد صغير، والبطء كله في السيرفر (الـ ٨٠٠ اللي حطيتهم + ٥ms). في الحقيقة ده شكل query بطيء في قاعدة البيانات، والحل في الـ backend مش في الـ frontend.

---

## ٣. Initiator

بيوريك سلسلة النداء: أنهي ملف وسطر عمل الطلب. لو الطلب جه من Console هتلاقي حاجة زي [[VM123:1]] ([[VM]] = كود اتنفّذ من غير ملف). مفيد جدًا لما تلاقي طلب غريب ومش عارف مين بيبعته.

## الخلاصة

- Headers للـ status والـ headers، Payload للي بعته، Preview للرد.
- Timing: TTFB كبير = السيرفر بطيء. Content Download كبير = الرد تقيل.
- Initiator يقولك مين بعت الطلب.`,
          sol: R`طلب الـ login غالبًا [[POST /api/login]] (فلتر Fetch/XHR عشان تلاقيه). في Payload هتلاقي اللي بعته، غالبًا [[{"email":"...","password":"..."}]]، أيوه الباسورد باين هنا وده طبيعي لأنه جهازك والطلب ماشي على HTTPS. الـ status لو نجح [[200]] أو [[204]]، ولو غلط [[401]] مع body فيه رسالة.

في Headers تحت Response Headers هتلاقي حاجة زي [[set-cookie: session=abc...; Path=/; HttpOnly; Secure; SameSite=Lax]]. لو ملقتش Set-Cookie خالص، يبقى موقعك غالبًا بيرجّع token في الـ body (شوفه في Preview) وبيحفظه في localStorage. ولو Chrome حاطط علامة تحذير صفرا جنب الكوكي، حط الماوس عليها: غالبًا الكوكي اترفضت عشان [[Secure]] على http أو [[SameSite=None]] من غير Secure.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** دوس على طلب API واكتب من كل تاب حاجة واحدة: الـ method والـ status من Headers، والبودي من Payload، وأول مفتاح في Preview، وأول ٢٠ حرف في Response، وأكبر رقم في Timing، والسطر في Initiator.`, done: R`٦ سطور، كل واحد من تاب، ومفيش خانة فاضية.`, sol: R`على طلب [[POST /api/save]] من Console بالجسم [[{"a":1}]]، و [[GET /api/me]] لباقي التابات:

1. Headers: اقرا Request Method و Status Code.
2. Payload: اللي اتبعت ([[view source]] بيوريك النص الخام).
3. Preview: الرد مترتب، وأول مفتاح.
4. Response: الرد الخام، وأول ٢٠ حرف.
5. Timing: أكبر رقم، وغالبًا Waiting.
6. Initiator: مين بعت الطلب.

كل تاب بيجاوب على سؤال مختلف، والتمرين ده عشان تربط السؤال بالتاب: «إيه اللي اتبعت؟» Payload. «إيه اللي رجع؟» Preview و Response. «ليه بطيء؟» Timing. «مين بعته؟» Initiator.

الغلطة: تدوّر على البودي في Headers. البودي في Payload، و Headers فيه الـ headers والـ method بس. وطلب GET مفيهوش تاب Payload لو مفيش query string.

~~~text الناتج
Headers:    POST  201
Payload:    {"a":1}
Preview:    id
Response:   {"id":7,"name":"Sara"}
Timing:     Waiting for server response هو الأكبر
Initiator:  VM...:1 (Console)
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الطلب اتبعت مرة بـ JSON ومرة بـ [[FormData]] من Console. قارن Payload و [[Content-Type]] في Request Headers.`, done: R`JSON بيظهر كشجرة و [[application/json]]، و FormData بيظهر Form Data و [[multipart/form-data; boundary=...]]، وكاتب إن المتصفح هو اللي بيحط الـ boundary.`, sol: R`~~~js Console
await fetch("/api/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: 1 }) });

const f = new FormData();
f.append("a", "1");
await fetch("/api/save", { method: "POST", body: f });
~~~

في الأولى انت اللي بتكتب [[Content-Type]] لأن البودي نص. في التانية **المتصفح** هو اللي بيكتبه، لأنه لازم يولّد [[boundary]]، وده نص عشوائي بيفصل بين الحقول جوه البودي، والسيرفر محتاجه عشان يفهم البودي.

الغلطة المشهورة: تكتب [[headers: { "Content-Type": "multipart/form-data" }]] بنفسك مع FormData. كده الـ header طالع من غير [[boundary]]، والسيرفر مش هيعرف يقرا البودي. سيب [[Content-Type]] خالص مع FormData.

الاسم بعد [[boundary=]] هيختلف كل مرة:

~~~text الناتج
JSON      Content-Type: application/json
          Payload: {"a":1}
FormData  Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryIeA2ua7qT0ik8yjz
          Payload: Form Data   a: 1
~~~` },
            { lvl: 'تطبيق', t: R`**Timing:** اعمل سيرفر Node بـ endpoint بيستنى ١٥٠٠ms قبل ما يرد، و endpoint بيرجّع ملف ٢٠ ميجا. قارن تاب Timing للاتنين.`, done: R`الأول «Waiting for server response» حوالي 1.5s والـ Content Download صغير، والتاني العكس مع Throttling. وكاتب مين المسؤول في كل حالة (السيرفر ولا حجم الملف).`, sol: R`~~~js server.mjs
import http from "node:http";
const big = Buffer.alloc(20 * 1024 * 1024, 97);
http.createServer((req, res) => {
  if (req.url === "/slowapi") {
    return setTimeout(() => { res.writeHead(200, { "Content-Type": "application/json" }); res.end('{"ok":1}'); }, 1500);
  }
  if (req.url === "/big.bin") { res.writeHead(200, { "Content-Type": "application/octet-stream" }); return res.end(big); }
  res.writeHead(200, { "Content-Type": "text/html" }); res.end("<!doctype html>");
}).listen(8910, "127.0.0.1");
~~~
~~~js Console
await (await fetch("/slowapi")).text();
await (await fetch("/big.bin")).arrayBuffer();
~~~

افتح تاب Timing لكل طلب. [[Waiting for server response]] هو الوقت بين ما الطلب خلص وأول بايت رجع، فالمسؤول **السيرفر**. و [[Content Download]] الوقت من أول بايت لآخر بايت، فالمسؤول **حجم الملف** مع سرعة النت.

في [[/slowapi]] الـ 1500ms في Waiting، والتحميل صفر لأن الرد صغير. في [[/big.bin]] العكس: السيرفر رد على طول، والتحميل بيعتمد على النت. على localhost خلص في 25ms، وبـ throttling 20 ميجابت خد 8156ms.

الغلطة: تحسّن الـ API وهو ملف كبير (أو تضغط الملف وهو query بطيئة). التاب ده بيقولك تصلّح فين قبل ما تبدأ. وعلى localhost من غير throttling كل حاجة بتبان سريعة، فلازم تقيس الملف بـ throttling.

~~~text الناتج
                 Waiting    Content Download
/slowapi         1516 ms    0 ms
/big.bin         3 ms       25 ms
بـ throttling 20 Mbit/s:
/slowapi         1507 ms    0 ms
/big.bin         4 ms       8156 ms
~~~` },
            { lvl: 'تطبيق', t: R`**Initiator:** صفحة فيها ٣ ملفات JS واحد منهم بيبعت طلب لـ [[/api/track]] مش عارف مين. لاقيه من تاب Initiator من غير ما تدوّر في الكود.`, done: R`عندك الـ call stack من Initiator واسم الملف ورقم السطر، ودوست عليه وفتحك في Sources على السطر.`, sol: R`~~~html blank.html
<script src="/a1.js">$__lt/script>
<script src="/a2.js">$__lt/script>
<script src="/a3.js">$__lt/script>
~~~
~~~js a2.js
function report(){
  fetch("/api/track",{method:"POST"})
}
function init(){
  report()
}
init()
~~~

1. افتح Network واعمل ريفريش.
2. دوس على طلب [[track]]، وافتح Initiator.
3. هتلاقي **Request call stack**: اقراه من فوق لتحت. فوق خالص أقرب سطر للطلب.
4. دوس على اسم الملف والسطر: بيفتحك على السطر في Sources.

الـ Initiator هو سلسلة الدوال اللي وصلت للطلب، فمش محتاج تدوّر في ٣ ملفات. وعمود Initiator في الجدول بيدّيك نفس الإجابة باختصار، ودوس عليه على طول.

الغلطة: تعمل [[grep]] على [[/api/track]] في الكود. لو الرابط متركب في متغير أو الكود متصغّر، مش هتلاقيه. الـ Initiator بيوديك للمكان اللي نفذ فعلًا.

~~~text الناتج
report   a2.js:2:3
init     a2.js:5:3
(anonymous) a2.js:7:1
~~~` },
            { lvl: 'تحدي', t: R`**صلّح:** طلب رجع [[200]] بس الصفحة بتقول «مفيش بيانات». من Preview و Response اكتشف إن الرد [[{"data":{"items":[]}}]] والكود بيقرا [[res.items]]. اكتب خطوات التشخيص بالترتيب.`, done: R`الخطوات: Status [[200]] (يبقى مش السيرفر وقع)، و Preview بيوري شكل الرد، والكود بيقرا مسار غلط، والتصليح [[res.data.items]]. وكاتب ليه [[200]] لوحده مش معناه إن الرد صح.`, sol: R`~~~js الكود البايظ
const res = await (await fetch("/api/items")).json();
list.textContent = (res.items || []).length ? "" : "مفيش بيانات";
~~~
~~~js التصليح
const items = res.data?.items ?? [];
~~~

**الخطوات بالترتيب:**

1. Status: [[200]]، يبقى السيرفر مش واقع والطلب وصل. متروحش اللوجز.
2. Preview: شكل الرد [[{"data":{"items":[]}}]]، فالبيانات جوه [[data]].
3. الكود: بيقرا [[res.items]]، وده [[undefined]] لأن المسار غلط.
4. Console: [[console.log(res.items, res.data.items)]] بتأكد إن الأول [[undefined]] والتاني Array.
5. التصليح: [[res.data.items]]. وفي المعمل الليستة نفسها فاضية، فالرسالة لسه هتظهر، وده هو الصح. جرّب ببيانات فيها عناصر.

ليه [[200]] لوحده مش معناه إن الرد صح: [[200]] بيقول إن الطلب اتنفّذ. مبيقولش حاجة عن شكل البيانات. ده عقد بين الـ API والـ frontend، ولو حد غيّره السيرفر هيفضل يرجّع [[200]].

الغلطة: [[res.items || []]] هي اللي خبّت الباج. الـ fallback سكّت الـ [[undefined]]، فمفيش خطأ في Console، والصفحة قالت «مفيش بيانات» كأنها معلومة صحيحة.

~~~text الناتج
Status:        200
Preview:       {"data":{"items":[]}}
console.log:   undefined  Array(0)
الصفحة:        مفيش بيانات
~~~` },
          ],
        },
        {
          cmd: "Throttling و Blocking",
          title: "جرّب الظروف الوحشة",
          desc: "القائمة اللي مكتوب فيها «No throttling» بتخليك تجرب الموقع على نت بطيء (Slow 4G) أو من غير نت (Offline)، وهتلاقي مشاكل مش باينة على نت سريع: زراير بتتداس مرتين، loading مش ظاهر. وكليك يمين على أي طلب ثم Block request بيمنعه (أو Throttle request يبطّأه لوحده)، عشان تعرف الموقع هيعمل إيه لو مكتبة أو API وقعت.",
          example: R`Throttling dropdown > Slow 4G / Offline
Right-click request > Block request / Throttle request
Ctrl+Shift+P > "Show Request conditions"`,
          try: "افتح موقعك على Slow 4G واعمل submit لفورم، وشوف المستخدم بيشوف إيه وهو مستني.",
          flag: "keys",
          deep: {
            why: "موقعك شغال تمام على نت سريع والمستخدم يشتكي. أو عايز تتأكد إن الموقع بيتعامل صح لو خدمة خارجية وقعت.",
            how: R`Throttling: القائمة «No throttling» بتقلّد جودة النت. «Slow 4G» بيبطّئ. «Offline» بيقطع خالص.

لما تشغّله وتجرب الموقع، هتلاقي مشاكل مخبّية: لستة بتلود ببطء ومفيش loading indicator، أو زرار اتضغط مرتين لأن المستخدم فكر مش حصل.

Request conditions: كليك يمين ثم Block request أو Throttle request (Chrome 145+). مفيد تشوف الموقع بيعمل إيه لو Google Fonts أو analytics وقعت.`,
            when: "قبل الرفع: جرّب على Slow 4G. لما بتشتغل على error handling.",
            mistakes: "تنسى إن Throttling شغال وتتساءل ليه التحميل بطيء. بيفضل حتى لو فتحت تاب جديد."
          },
          teach: R`## الأول: بتقلّد ظروف وحشة على جهازك انت

القايمة اللي مكتوب فيها [[No throttling]] بتبطّأ النت **للتاب ده بس**، و Block request بيمنع طلب بعينه. أسماء القوايم من Chrome DevTools docs (Network features reference). التأثير اللي تحت جربته في Chrome ببروتوكول DevTools، وده نفس اللي الأزرار بتعمله.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Throttling dropdown > Slow 4G / Offline]] | Slow 4G بيزوّد تأخير على كل طلب ويقلّل السرعة. Offline يقطع النت |
| [[Right-click request > Block request / Throttle request]] | يمنع (أو يبطّأ) الطلب ده بس، والباقي عادي |
| [[Ctrl+Shift+P > "Show Request conditions"]] | لوحة فيها كل الطلبات الممنوعة والمبطّأة، وتضيف patterns بـ [[*]] |

---

## ٢. التبطيء: الأرقام الحقيقية

نفس طلب [[/api/me]] (رده صغير جدًا) مرة بتأخير ٥٦٠ms وسرعة ١.٤ ميجابت (قريب من فكرة Slow 4G)، ومرة من غير:

~~~javascript Console
await (async () => { const t = performance.now(); await fetch("/api/me?x=" + Math.random()); return Math.round(performance.now() - t) + " ms" })()
~~~

~~~text الناتج
"584 ms"    مع التبطيء
"2 ms"      من غير
~~~

- [[performance.now()]] ساعة دقيقة بالـ ms. الفرق قبل وبعد = مدة الطلب.
- [[?x=" + Math.random()]] بيخلي الـ URL مختلف كل مرة عشان الكاش ميلعبش في القياس.
- [[(async () => {...})()]] فانكشن async بتتنفّذ على طول، و [[await]] قبلها بيستنى نتيجتها.

نفس الطلب بقى أبطأ ٣٠٠ مرة. أي زرار مفيهوش loading هيبان «مش شغال» نص ثانية، والمستخدم هيدوس تاني.

---

## ٣. Offline

~~~javascript Console
await fetch("/api/me").then(r => r.json())
~~~

~~~text الناتج في Console
Failed to load resource: net::ERR_INTERNET_DISCONNECTED
Uncaught TypeError: Failed to fetch
~~~

[[fetch]] بيرمي [[TypeError: Failed to fetch]] لما مفيش رد خالص. الكود بتاعك لازم يمسكه بـ [[catch]] ويقول «مفيش نت».

---

## ٤. Block request

منعت [[*/api/products]] وجربت:

~~~text الناتج
Uncaught TypeError: Failed to fetch
~~~

نفس الـ error، والطلب في Network بيبان إنه اتمنع من DevTools (في البروتوكول سبب الفشل [[inspector]]). وده بيوريك الموقع هيعمل إيه لو API أو مكتبة من بره وقعت.

## الخلاصة

- Slow 4G يكشف الزراير اللي مفيهاش loading والضغط المتكرر.
- Offline و Block الاتنين بيطلّعوا [[TypeError: Failed to fetch]]: امسكه في الكود.
- متنساش ترجّع [[No throttling]]، لأنه بيفضل شغال على التاب.`,
          sol: R`على Slow 4G أي submit هياخد ثانية أو اتنين أو أكتر. اللي المفروض يشوفه المستخدم: الزرار اتقفل ([[disabled]]) ومكتوب عليه «جاري الحفظ...» أو spinner، وبعدين رسالة نجاح أو غلط.

النتايج الوحشة اللي بتكشفها التجربة دي: مفيش أي feedback فالمستخدم يدوس تاني، وفي Network هتلاقي نفس الـ POST اتبعت مرتين (ودي بتعمل طلبين أو حسابين مكررين). أو الفورم بيتمسح قبل ما الرد يرجع. ولو جربت Offline هتشوف [[TypeError: Failed to fetch]] في Console: الواجهة لازم تمسك الـ error ده وتقول للمستخدم «مفيش نت» بدل ما تفضل تلف.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل Slow 4G واعمل ريفريش، واكتب Load قبل وبعد، وارجع No throttling. وجرّب Offline على صفحة بتعمل fetch.`, done: R`الرقمين مكتوبين والتاني أكبر بكتير، و Offline طلّع في Console [[Failed to load resource: net::ERR_INTERNET_DISCONNECTED]] و [[Uncaught TypeError: Failed to fetch]].`, sol: R`1. افتح Network، ومن قايمة No throttling اختار Slow 4G.
2. اعمل ريفريش، واكتب Load من الشريط اللي تحت. ارجع No throttling واكتب الرقم تاني.
3. اختار Offline، وفي Console:

~~~js Console
await fetch("/api/me");
~~~

Slow 4G بيقلّد نت أبطأ، بيزوّد latency لكل طلب ويقلل السرعة، فكل ملف بيتأخر. في المعمل الصفحة ١٠ طلبات، فالـ latency بتتجمع. و Offline بيخلّي الطلب يفشل قبل ما يخرج.

ليه رسالتين: الأولى من الشبكة نفسها، والتانية من [[fetch]] اللي رمى خطأ.

الغلطة: تنسى Throttling شغال وتكمل شغلك، فكل حاجة تبان بطيئة وتدوّر على باج. وكل تاب ليه إعداده، فالتاب التاني مش متأثر. ولاحظ إن الرسالة في Console لما تكون [[await]] [[Uncaught TypeError]]. ومن سكربت في الصفحة من غير [[catch]] بتبقى [[Uncaught (in promise) TypeError: Failed to fetch]].

اتقاس بالـ Protocol بقيم Slow 4G بتاعة DevTools (latency 562.5ms، و 1.44 Mbit/s):

~~~text الناتج
No throttling   Load: 44 ms
Slow 4G         Load: 1781 ms
Offline في Console:
Failed to load resource: net::ERR_INTERNET_DISCONNECTED
Uncaught TypeError: Failed to fetch
~~~` },
            { lvl: 'تطبيق', t: R`**محاكاة (optimistic UI):** صفحة فيها زرار «علّم كمدفوع» بيغيّر الحالة في الشاشة على طول وبعدين يبعت [[PATCH]]. اعمل Block request URL على الـ endpoint، ودوس الزرار.`, done: R`كاتب: الشاشة اتغيّرت وبعدين رجعت (لو الكود فيه rollback) أو فضلت غلط (باج)، والطلب في Network أحمر ومكتوب إنه اتمنع من DevTools، و Console فيه [[TypeError: Failed to fetch]]. ولو مفيش rollback: كتبت التصليح (ترجّع الحالة القديمة في [[catch]] وتعرض رسالة).`, sol: R`~~~html pay.html (نسخة فيها rollback)
<span id="st">لسه</span><button id="b">علّم كمدفوع</button>
<script>
b.onclick = async () => {
  const old = st.textContent;
  st.textContent = "مدفوع";                     // الشاشة الأول
  try {
    const r = await fetch("/api/pay/7", { method: "PATCH" });
    if (!r.ok) throw new Error("HTTP " + r.status);
  } catch (e) {
    st.textContent = old;                        // رجّع القديم
    console.error("rollback", e.message);
  }
};
$__lt/script>
~~~

1. في Network كليك يمين على أي طلب PATCH ثم Block request URL، أو من Request conditions زوّد [[*/api/pay/*]].
2. ريفريش، ودوس الزرار.

الـ optimistic UI معناه تغيّر الشاشة قبل رد السيرفر عشان التطبيق يبان سريع. بس لازم تستعد إن السيرفر يرفض. و [[old]] محفوظة قبل التغيير، و [[catch]] بترجّعها. و [[!r.ok]] ضروري لأن [[fetch]] مبيرميش خطأ على [[500]] أو [[403]].

النسخة من غير [[try/catch]] (عملنا الاتنين) الشاشة فضلت «مدفوع» والأوردر مش مدفوع، وده أخطر من مجرد خطأ، لأن المستخدم مصدّق الشاشة.

الغلطة: تختبر الزرار على النت السليم بس. [[Block]] هو أسرع طريقة تجرّب بيها فشل السيرفر من غير ما تلمس السيرفر. ولازم كمان رسالة للمستخدم، مش [[console.error]] بس.

اتجرّب بـ [[Network.setBlockedURLs]]، وده نفس آلية الزرار:

~~~text الناتج
                الشاشة بعد الضغط        Console
فيها rollback   رجعت «لسه»              rollback Failed to fetch
من غير rollback فضلت «مدفوع» (باج)      Uncaught (in promise) TypeError: Failed to fetch
Network: الطلب فشل، و blockedReason = inspector
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في Network conditions اعمل throttling profile اسمه [[Egypt 3G]] (download 750 kb/s، و upload 250، و latency 300ms)، وقيس بيه صفحتك الرئيسية.`, done: R`الـ profile ظاهر في القايمة، ورقم Load بيه مكتوب جنب Slow 4G و No throttling.`, sol: R`1. في Network افتح قايمة Throttling ثم Add... (أو Settings ثم Throttling).
2. Add profile، واكتب: Profile name [[Egypt 3G]]، و Download [[750]]، و Upload [[250]]، و Latency [[300]].
3. احفظ، وارجع القايمة واختاره، واعمل ريفريش واكتب Load.

الـ download والـ upload بالـ kbit/s، و latency وقت إضافي لكل طلب بالـ ms. ده اللي بيخلّي profile بسرعة أقل ولكن latency أقل يكسب في صفحة فيها طلبات كتير صغيرة.

في المعمل الصفحة ١٠ طلبات صغيرة، فـ Slow 4G طلع أبطأ من Egypt 3G، رغم إن سرعته الأعلى. ودي نقطة التمرين: في الصفحات اللي فيها ملفات صغيرة كتير، الـ latency هي اللي بتحكم. وعلى صفحة فيها ملف كبير العكس.

الغلطة: تكتب الرقم بالـ KB بدل kbit. و 750 kb/s = حوالي 94 KB/s بس.

حفظ الـ profile واجهة من وثائق Chrome. والقياس بنفس الأرقام عن طريق [[Network.emulateNetworkConditions]]:

~~~text الناتج
No throttling   44 ms
Egypt 3G        1043 ms
Slow 4G         1781 ms
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** Slow 4G على صفحة فيها فورم: دوس زرار الإرسال ٣ مرات بسرعة. كام طلب اتبعت؟ صلّحها بحيث يطلع طلب واحد والزرار يبان «بيبعت...».`, done: R`قبل التصليح ٣ طلبات [[POST]] في Network، وبعده طلب واحد والزرار [[disabled]] لحد ما الرد يرجع، واتجرّب تاني على Slow 4G.`, sol: R`~~~html form2.html (بعد التصليح)
<form id="f"><input name="q" value="x"><button id="s">ابعت</button></form>
<script>
f.onsubmit = async e => {
  e.preventDefault();
  if (s.disabled) return;
  s.disabled = true;
  const old = s.textContent;
  s.textContent = "بيبعت...";
  try {
    await fetch("/api/form", { method: "POST", body: new FormData(f) });
  } finally {
    s.disabled = false;
    s.textContent = old;
  }
};
$__lt/script>
~~~

على نت بطيء المستخدم مش شايف رد فعل، فبيدوس تاني. وكل دوسة طلب جديد، وممكن تبقى ٣ أوردرات.

[[s.disabled = true]] لازم يبقى **قبل** أول [[await]]، عشان الدوسة التانية تلاقيه مقفول. و [[if (s.disabled) return]] تأمين إضافي، لأن Enter ممكن يبعت الفورم من الحقل. و [[finally]] بيرجّع الزرار في النجاح والفشل. لو حطيته بعد [[await]] بس، أي خطأ هيسيب الزرار مقفول للأبد.

الغلطة: تقفل الزرار بعد الرد، أو تفتكر إن ده كفاية. الحماية الحقيقية في السيرفر كمان (idempotency key)، لأن طلبين ممكن يوصلوا لأسباب تانية، زي retry.

اتجرّب بـ ٣ ضغطات متتالية على Slow 4G، وعدّاد في السيرفر:

~~~text الناتج
قبل:   3 طلبات POST، والزرار فاضل «ابعت»
بعد:   طلب واحد، والزرار disabled و «بيبعت...» لحد الرد، وبعدها رجع «ابعت»
~~~` },
            { lvl: 'تحدي', t: R`**Block الخط:** اعمل Block request على ملف الخط ([[.woff2]] أو [[.ttf]]) في موقع عربي. شكل الصفحة اتغيّر إزاي؟ وإيه اللي الـ CSS لازم يكون فيه عشان الشكل ميبوظش؟`, done: R`كاتب الخط اللي ظهر بداله، وإن [[font-family]] لازم فيه fallback زي [[Tahoma, sans-serif]] بعد الخط، وإن [[font-display: swap]] بيخلّي النص يبان من الأول (درس «مشروع تشخيص موقع بطيء ومكسور» فيه القياس).`, sol: R`~~~html font.html
<html dir="rtl">
<style>
@font-face { font-family: Lab; src: url(/lab.ttf); font-display: swap }
p { font-family: Lab, Arial, sans-serif; font-size: 20px; display: inline-block }
</style>
<p id="t">مرحبا بيكم في المتجر</p>
</html>
~~~

1. في Network فلتر Font، وكليك يمين على الملف ثم Block request URL (أو زوّد [[*.ttf]] في Request conditions).
2. ريفريش.
3. اختار النص في Elements، وافتح Computed، ودوّر تحت خالص على **Rendered Fonts**: ده الخط اللي اترسم فعلًا.

[[font-family]] لستة: المتصفح بيجرب بالترتيب، فلما [[Lab]] فشل نزل لـ [[Arial]]. لو مفيش fallback، هينزل على خط المتصفح الافتراضي.

وفي عربي بالذات ده بيفرق: عرض النص هنا اتغيّر من 180px لـ 137px، فالـ layout نفسه بيتحرك. عشان كده اختار fallback مقارب للخط (مثلًا [[Tahoma, sans-serif]]).

و [[font-display: swap]] بيعرض النص بالـ fallback فورًا، ويبدّله لما الخط يوصل. من غيره النص ممكن يفضل مخفي لفترة وانت مستني.

الغلطة: تكتب [[font-family: Lab]] لوحده. و [[Computed]] بتقول قيمة CSS، مش الخط اللي اترسم، فبص على Rendered Fonts. في المعمل ملف الخط نسخة Tahoma باسم وهمي عشان نشوف الفرق.

~~~text الناتج (CSS.getPlatformFontsForNode)
من غير Block:   Tahoma (custom font)   عرض النص 180px
مع Block:       Arial                  عرض النص 137px
~~~` },
          ],
        },
        {
          cmd: "WebSocket و SSE في Network",
          title: "الاتصال اللي مبيخلصش: تقرا رسايل WebSocket و SSE من DevTools، وليه السابع مبيفتحش",
          desc: R`أي حاجة لحظية (شات، إشعارات، حالة الأوردر) بتبان في Network **سطر واحد بس** مبيخلصش، مش طلب لكل رسالة. WebSocket سطره [[101 Switching Protocols]] ونوعه [[websocket]]، ودوس عليه تلاقي تاب **Messages**: كل رسالة بسهم (طالعة منك ولا جاية من السيرفر)، والنص أو [[Binary Message]]. و SSE (اللي بـ [[EventSource]]) سطره [[200]] ونوعه [[eventsource]] و [[Content-Type: text/event-stream]]، وتابه اسمه **EventStream**: كل حدث بالـ id والنوع والداتا.

وأهم حاجتين بيتكشفوا من هنا: (١) لما السيرفر يقفل SSE، المتصفح بيفتح تاني لوحده بعد [[retry]] وبيبعت [[Last-Event-ID]] بآخر رقم وصله. (٢) على HTTP/1.1 المتصفح بيفتح **٦ اتصالات بس** لنفس السيرفر، فلو فتحت ٨ تابات SSE، السابع والتامن بيفضلوا pending ومحدش بيقولك ليه. على HTTP/2 الـ ٨ بيفتحوا (درس «HTTP/2 و HTTP/3»).`,
          example: R`const ws = new WebSocket("ws://127.0.0.1:8095/chat")
ws.onmessage = e => console.log("got", e.data)
ws.send(JSON.stringify({ type: "hello", from: "baker" }))
ws.close(1000, "done")
const es = new EventSource("/events")
es.addEventListener("order", e => console.log(e.lastEventId, e.data))
es.close()`,
          lines: [
            R`[[new WebSocket(url)]] بيفتح اتصال واحد بيفضل مفتوح. الرابط بيبدأ بـ [[ws://]] (أو [[wss://]] على HTTPS، والصفحة HTTPS لازم [[wss]] وإلا Mixed Content). في Network هيظهر سطر نوعه [[websocket]] والـ Status [[101]].`,
            R`[[onmessage]] بيتنادى مع كل رسالة جاية من السيرفر، و [[e.data]] النص (أو [[Blob]] لو binary). كل رسالة هتظهر في تاب Messages بسهم لتحت.`,
            R`[[send]] بيبعت رسالة. WebSocket بيبعت نص أو bytes بس، فالـ object لازم [[JSON.stringify]]. الرسالة هتظهر في Messages بسهم لفوق.`,
            R`[[close(1000, "done")]] بيقفل بكود [[1000]] (قفلة طبيعية) وسبب. الكود والسبب بيظهروا في آخر Messages، وكود زي [[1006]] معناه الاتصال اتقطع من غير قفلة (السيرفر وقع أو proxy قفله).`,
            R`[[new EventSource(url)]] بيفتح طلب GET عادي بيفضل مفتوح، والسيرفر بيكتب فيه أحداث. اتجاه واحد بس (من السيرفر ليك)، ومن غير مكتبة على السيرفر. في Network نوعه [[eventsource]].`,
            R`[[addEventListener("order", ...)]] بيسمع على الأحداث اللي السيرفر سمّاها [[event: order]]. الأحداث من غير [[event:]] بتروح لـ [[onmessage]]. و [[e.lastEventId]] هو الـ [[id:]] اللي السيرفر بعته.`,
            R`[[es.close()]] بيقفل ومبيرجعش يفتح. من غيره، لو السيرفر قفل الاتصال المتصفح هيفتحه تاني لوحده بعد [[retry]].`,
          ],
          try: R`شغّل سيرفر المعمل اللي في الشرح، وافتح [[http://127.0.0.1:8095/]] وتاب Network مفتوح. دوس على سطر [[chat]] وافتح Messages، وعلى سطر [[events]] وافتح EventStream. استنى لحد ما السيرفر يقفل الـ SSE بعد ٣ أحداث، وشوف السطر التاني اللي اتفتح لوحده وفي Request Headers بتاعه [[Last-Event-ID]]. وبعدين افتح ٨ [[EventSource]] من Console وعدّ كام واحد فتح.`,
          deep: {
            why: R`الطلبات العادية بتتقري من Headers و Response، بس الاتصال اللي بيفضل مفتوح مالوش «رد» واحد: الكلام كله جوه Messages أو EventStream. ولما الشات «مش بيوصل» أو الإشعارات «بتتأخر»، السؤال الأول: الاتصال فاتح أصلًا؟ والرسالة اتبعتت؟ والسيرفر رد؟ وده كله بيتجاوب من سطر واحد في Network من غير console.log.`,
            how: R`WebSocket بيبدأ كطلب HTTP عادي فيه [[Upgrade: websocket]] و [[Sec-WebSocket-Key]]، والسيرفر بيرد [[101 Switching Protocols]] و [[Sec-WebSocket-Accept]]، ومن اللحظة دي نفس الـ TCP connection بقى قناة رسايل في الاتجاهين (frames). كل frame ليه opcode: [[1]] نص، و [[2]] binary، و [[8]] قفلة، و [[9]]/[[10]] ping و pong. DevTools بيعرض النص زي ما هو والـ binary كـ «Binary Message» (في البروتوكول بيوصل base64: [[AQID]] للبايتات 1 و 2 و 3).

SSE طلب GET عادي، والسيرفر بيرد [[text/event-stream]] ومبيقفلش، وبيكتب بلوكات نص كل واحد بيخلص بسطر فاضي: [[id:]] و [[event:]] و [[data:]] و [[retry:]]. لو الاتصال اتقفل، المتصفح بيستنى [[retry]] ms ويطلب تاني بـ header [[Last-Event-ID]]، فالسيرفر يكمّل من بعده. والحد بتاع ٦ اتصالات لكل host في HTTP/1.1 بيشمل الاتصالات المفتوحة دي، فكل SSE ماسك واحد طول الوقت.`,
            when: R`شات أو تعديل مشترك أو لعبة (الاتجاهين): WebSocket. إشعارات، أو تقدّم شغلانة، أو حالة أوردر، أو ردود AI بتتكتب حرف حرف (اتجاه واحد): SSE أبسط، وبيعدّي من proxies أسهل، وبيرجع لوحده. والاختيار بالتفصيل في درس «WebSocket و SSE» في تاب JavaScript، وإعداد nginx في درس «WebSockets» في تاب Nginx.`,
            mistakes: R`تدوّر على الرسايل في Fetch/XHR (مش هناك، دوّر بـ All أو فلتر WS). تفتح Network بعد ما الاتصال اتفتح (الرسايل اللي قبلها مش متسجّلة: ريفريش والتاب مفتوح). تبعت object من غير [[JSON.stringify]] فيوصل [[[object Object]]]. سيرفر SSE مبيبعتش أي حاجة لحد أول حدث فالـ headers متتبعتش و [[onopen]] مبيحصلش (اتقابل في المعمل: الحل [[res.flushHeaders()]] أو تعليق [[: hi]] في الأول). وتفتح SSE في كل تاب على HTTP/1.1 فالتاب السابع يعلّق.`
          },
          teach: R`## الأول: الاتصال المفتوح سطر واحد

الطلب العادي: المتصفح بيسأل، السيرفر بيرد، الطلب خلص. أما WebSocket و SSE فالاتصال بيفضل مفتوح والكلام بيعدّي فيه، فـ Network بيعرضه **سطر واحد** والـ Time بتاعه بيفضل يزيد. الرسايل نفسها مش في Response، في تاب جديد جوه السطر:

| | WebSocket | SSE |
|---|---|---|
| السطر في Network | Status [[101]]، و Type [[websocket]] | Status [[200]]، و Type [[eventsource]] |
| تاب الرسايل | Messages | EventStream |
| الاتجاه | الاتنين | من السيرفر ليك بس |
| بيرجع لوحده لو اتقطع؟ | لأ، انت تكتب الـ reconnect | آه، بعد [[retry]] وبـ [[Last-Event-ID]] |

كل اللي تحت اتجرّب في Chrome 156 (headless) على سيرفر Node 24 فيه الاتنين، والأحداث اتقرت من DevTools Protocol (نفس البيانات اللي Messages و EventStream بيعرضوها).

---

## المعمل

~~~javascript rt-server.mjs (npm i ws)
import http from "node:http";
import { WebSocketServer } from "ws";

const server = http.createServer((req, res) => {
  if (req.url === "/events") {
    console.log("SSE connect, last-event-id =", req.headers["last-event-id"] || "-");
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
    let n = Number(req.headers["last-event-id"] || 0);
    res.write("retry: 1000\n\n");
    const t = setInterval(() => {
      n++;
      res.write("id: " + n + "\nevent: order\ndata: " + JSON.stringify({ order: n, status: "baking" }) + "\n\n");
      if (n % 3 === 0) { clearInterval(t); res.end(); }
    }, 200);
    return;
  }
  res.writeHead(200, { "content-type": "text/html" });
  res.end('<script src="/client.js"></script>');
});
const wss = new WebSocketServer({ server, path: "/chat" });
wss.on("connection", s => s.on("message", (m, bin) => s.send(bin ? m : "echo:" + m)));
server.listen(8095, "127.0.0.1");
~~~

- [[/events]] بيبعت ٣ أحداث كل ٢٠٠ms وبعدين **بيقفل** الاتصال قصد، عشان نشوف المتصفح هيعمل إيه.
- [[retry: 1000]] بيقول للمتصفح «لو الاتصال اتقطع، استنى ثانية وارجع».
- كل حدث [[id:]] و [[event:]] و [[data:]] وبعدهم سطر فاضي ([[\n\n]]): السطر الفاضي هو اللي بيقول «الحدث خلص».
- [[/chat]] بيرد على أي رسالة نص بـ [[echo:]] قبلها، والـ binary زي ما هو.

والصفحة بتعمل سطور المثال: WebSocket بيبعت JSON ورسالة binary ([[new Uint8Array([1, 2, 3])]])، و EventSource بيسمع على [[order]].

---

## ١. سطر الـ WebSocket

~~~text اللي DevTools سجّله (Network.webSocket* events)
webSocketCreated ws://127.0.0.1:8095/chat
handshake 101 Switching Protocols upgrade=websocket
frame SENT opcode=1 {"type":"hello","from":"baker"}
frame SENT opcode=2 AQID
frame RECV opcode=1 echo:{"type":"hello","from":"baker"}
frame RECV opcode=2 AQID
~~~

- [[101 Switching Protocols]]: ده الـ Status اللي هتلاقيه في السطر. لو لقيت [[400]] أو [[426]] أو [[502]]، الـ upgrade فشل، وغالبًا الـ proxy (nginx) مش بيعدّي [[Upgrade]] و [[Connection]] (القضية دي بالتفصيل في درس «WebSocket بيفصل» في تاب التشخيص).
- [[opcode=1]] رسالة نص، وفي Messages بتظهر زي ما هي. [[opcode=2]] binary، وبتظهر «Binary Message» وطولها، و [[AQID]] هي base64 للبايتات [[1 2 3]].
- [[SENT]] = سهم لفوق (منك)، و [[RECV]] = سهم لتحت (من السيرفر).

وفي تاب Messages فيه صندوق فلتر: اكتب [[hello]] يسيب الرسايل اللي فيها الكلمة بس، وقايمة جنبه تختار منها Send أو Receive بس.

---

## ٢. سطر الـ SSE

~~~text DevTools (Network.eventSourceMessageReceived) والـ Console
response EventSource 200 text/event-stream
eventSource order id=1 {"order":1,"status":"baking"}
eventSource order id=2 {"order":2,"status":"baking"}
eventSource order id=3 {"order":3,"status":"baking"}
response EventSource 200 text/event-stream
eventSource order id=4 {"order":4,"status":"baking"}
eventSource order id=5 {"order":5,"status":"baking"}
eventSource order id=6 {"order":6,"status":"baking"}
~~~

~~~text لوج السيرفر
SSE connect, last-event-id = -
SSE connect, last-event-id = 3
~~~

شوف اللي حصل بعد الحدث [[3]]: السيرفر قفل، والمتصفح **فتح لوحده** طلب تاني (سطر [[response EventSource 200]] التاني، وفي Network هتلاقي سطرين [[events]])، وبعت [[Last-Event-ID: 3]]، فالسيرفر كمّل من [[4]] بدل ما يعيد من الأول. ده كله من غير ولا سطر كود في الصفحة.

وفي EventStream كل حدث صف فيه: Id و Type و Data و Time.

> لو عايز SSE يوقف خالص: [[es.close()]] من الصفحة، أو السيرفر يرد بـ [[204]] على طلب الرجوع.

---

## ٣. الفخ: السابع مبيفتحش

فتحت ٨ اتصالات SSE من Console على نفس السيرفر:

~~~javascript Console
const open = [];
for (let i = 1; i <= 8; i++) { const e = new EventSource("/events?k=" + i); e.onopen = () => open.push(i); }
setTimeout(() => console.log(open), 2000);
~~~

~~~text الناتج
HTTP/1.1:  [1, 2, 3, 4, 5, 6]
HTTP/2:    8 من 8
~~~

على HTTP/1.1 المتصفح بيفتح **٦ اتصالات بالكتير لنفس السيرفر**، وكل SSE ماسك واحد طول الوقت، فالسابع والتامن (وأي صورة أو fetch بعدهم) بيستنوا في Network على Stalled ومحدش بيرمي error. ده اللي بيحصل لما اليوزر يفتح الموقع في ٧ تابات. على HTTP/2 كل الطلبات على اتصال واحد (multiplexing)، فالـ ٨ فتحوا (القياس في درس «HTTP/2 و HTTP/3»). WebSocket مش داخل في الحد ده بنفس الشكل (ليه حد تاني أكبر بكتير)، بس كل واحد اتصال TCP لوحده.

وفخ تاني اتقابل وأنا ببني المعمل: سيرفر SSE عمل [[writeHead]] ومكتبش ولا حرف، فـ Node مابعتش الـ headers أصلًا و [[onopen]] مااشتغلش (الأول طلع [[[]]] فاضي). الحل [[res.flushHeaders()]] أو تبعت تعليق [[: hi]] في الأول.

---

## ٤. الأكواد اللي هتشوفها في آخر Messages

| الكود | معناه |
|---|---|
| [[1000]] | قفلة طبيعية (حد فيهم عمل [[close()]]) |
| [[1001]] | الطرف التاني «ماشي»: التاب اتقفل أو السيرفر بيعمل restart |
| [[1006]] | الاتصال اتقطع من غير قفلة: السيرفر وقع، أو proxy قفله لما سكت (الـ timeout الافتراضي في nginx ٦٠ ثانية) |
| [[1008]] و [[1011]] | السيرفر رفض (policy) أو ضرب error |

الأرقام من RFC 6455 و MDN ([[CloseEvent.code]]).

## الخلاصة

- الاتصال المفتوح سطر واحد في Network، والكلام في Messages (WebSocket) أو EventStream (SSE).
- [[101]] يعني WebSocket فتح. أي رقم تاني = الـ upgrade فشل، بص على الـ proxy.
- SSE بيرجع لوحده بـ [[Last-Event-ID]]، فالسيرفر لازم يكمّل من الرقم ده.
- HTTP/1.1 = ٦ اتصالات لكل سيرفر، فـ SSE في تابات كتير بيعلّق. HTTP/2 بيحلها.`,
          sol: R`سطر [[chat]] Status بتاعه [[101]] و Type [[websocket]]، وفي Messages ٤ صفوف: [[{"type":"hello","from":"baker"}]] طالعة، و Binary Message طالعة، و [[echo:{"type":"hello","from":"baker"}]] جاية، و Binary Message جاية.

سطر [[events]] الأول فيه ٣ أحداث في EventStream (Id 1 و 2 و 3، Type [[order]])، وبعد ما السيرفر قفله ظهر سطر [[events]] تاني لوحده بعد حوالي ثانية (الـ [[retry]])، وفي Request Headers بتاعه [[Last-Event-ID: 3]]، وأحداثه 4 و 5 و 6. ولوج السيرفر فيه [[last-event-id = -]] وبعدها [[last-event-id = 3]].

والـ ٨ [[EventSource]] على HTTP/1.1: [[open]] طلع [[[1, 2, 3, 4, 5, 6]]]، والاتنين الباقيين في Network على pending. لو السيرفر بتاعك على HTTP/2 (زي أي موقع ورا nginx أو CDN بـ HTTPS) هتلاقي الـ ٨ فتحوا.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص: Status و Type و اسم تاب الرسايل لكل واحد من WebSocket و SSE، ومعنى الكود [[1006]].`, done: R`كتبت [[101]]/[[websocket]]/Messages و [[200]]/[[eventsource]]/EventStream، و [[1006]] = اتقطع من غير قفلة، وصحّحتهم من الجدول.`, sol: R`| | Status | Type | تاب الرسايل |
|---|---|---|---|
| WebSocket | [[101]] | [[websocket]] | Messages |
| SSE | [[200]] | [[eventsource]] | EventStream |

و [[1006]] معناه الاتصال **اتقطع من غير قفلة** نضيفة، يعني الطرف التاني اختفى من غير ما يبعت close frame، زي سيرفر وقع أو proxy قطع.

ليه [[101]]: الطلب بيبدأ HTTP عادي بـ [[Upgrade: websocket]]، والسيرفر بيرد «هنغيّر البروتوكول»، وبعدها الاتصال مبقاش HTTP. أما SSE فهو HTTP عادي بـ [[200]] ورد مبيخلصش، وعشان كده [[Content-Type: text/event-stream]].

الغلطة: تدوّر على رد WebSocket في Response أو Preview. الرسايل في Messages بس. و [[1006]] مش بيتبعت من السيرفر أصلًا: المتصفح هو اللي بيحطه لما يلاقي الاتصال مات.

اتجرّب في التمارين الجاية، و [[101]] و [[200]] طلعوا من Vite dev والـ SSE.

~~~text الناتج
WebSocket   101 / websocket / Messages
SSE         200 / eventsource / EventStream
1006        اتقطع من غير قفلة
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على أي موقع فيه شات أو إشعارات لحظية (أو Next.js dev بالـ HMR، أو Vite dev)، لاقي سطر الاتصال المفتوح في Network، وقول نوعه، واقرا أول ٣ رسايل.`, done: R`كاتب الـ URL والنوع وأول ٣ رسايل. في Vite dev مثلًا هتلاقي WebSocket أول رسالة فيه حاجة زي [[{"type":"connected"}]]، وبعد ما تحفظ ملف هتلاقي رسالة جديدة فيها [[update]] أو [[full-reload]].`, sol: R`~~~bash
mkdir vapp
echo '<!doctype html><h1>hi</h1><script type="module" src="/main.js">$__lt/script>' > vapp/index.html
echo 'document.title = "a"' > vapp/main.js
npx vite vapp --port 5199 --host 127.0.0.1
~~~

1. افتح [[http://127.0.0.1:5199/]] و Network مفتوح، وفلتر Socket (أو WS).
2. دوس على السطر، وافتح Messages.
3. عدّل [[vapp/main.js]] واحفظ، وبص على الرسالة الجديدة.

الـ dev server فاتح WebSocket عشان يقول للصفحة «ملف اتغيّر». وعشان الملف مش جوه module بيقبل HMR، الرسالة كانت [[full-reload]]. فالصفحة بتعمل ريفريش، وده اللي عمل اتصال جديد. لو React أو Vue هتشوف [[update]] بدل كده.

إزاي تعرف النوع: Status [[101]] مع Type [[websocket]]، أو [[200]] مع [[eventsource]]. ولو [[fetch]] طويل بيرجّع بالتدريج ده streaming، مش SSE.

الغلطة: تفتح Network بعد ما الصفحة حمّلت، فالاتصال المفتوح مش موجود في الجدول. اعمل ريفريش. وفي الرابط [[?token=...]] بيتغيّر: ده حماية Vite ضد المواقع التانية.

~~~text الناتج
URL:   ws://127.0.0.1:5199/?token=...
Type:  websocket، Status 101
1  {"type":"connected"}
2  {"type":"full-reload","path":"/index.html"}       ← بعد حفظ ملف
3  (ريفريش، واتصال جديد) {"type":"connected"}
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «حالة الأوردر» بـ SSE: السيرفر بيبعت [[received]] ثم [[baking]] ثم [[ready]] كل ثانيتين بـ [[id:]]، والصفحة بتعرض الحالة. اقفل السيرفر وشغّله تاني في النص.`, done: R`الصفحة بتكمّل من الحالة اللي بعد آخر واحدة وصلت (السيرفر قرا [[Last-Event-ID]])، و EventStream فيه الأحداث بالأرقام من غير تكرار.`, sol: R`~~~js server.mjs
import http from "node:http";
const steps = ["received", "baking", "ready"];
http.createServer((req, res) => {
  if (req.url === "/events") {
    const last = Number(req.headers["last-event-id"] || 0);
    console.log("connect last-event-id =", req.headers["last-event-id"] || "-");
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
    res.write("retry: 500\n\n");
    let n = last;
    const t = setInterval(() => {
      if (n >= steps.length) { clearInterval(t); res.write("event: done\ndata: 1\n\n"); return res.end(); }
      res.write($__btid: $__{n + 1}\nevent: status\ndata: $__{steps[n]}\n\n$__bt);
      n++;
    }, 2000);
    req.on("close", () => clearInterval(t));
    return;
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end('<!doctype html><h1 id="s">...</h1><script src="/c.js">$__lt/script>');
}).listen(8911, "127.0.0.1");
~~~
~~~js c.js (السيرفر يخدمها بنفس الطريقة)
const es = new EventSource("/events");
es.addEventListener("status", e => { s.textContent = e.data; });
es.addEventListener("done", () => es.close());
~~~

المتصفح بيفتكر آخر [[id:]] وصل. ولما الاتصال يقع بيعمل reconnect لوحده بعد [[retry:]]، ويبعت القيمة في header [[Last-Event-ID]]. والسيرفر بيقراها ويبدأ من اللي بعدها، فمفيش تكرار ومفيش ضياع.

و [[done]] مهم. لو السيرفر قفل من غير ما الصفحة تعمل [[es.close()]]، [[EventSource]] هيفضل يعيد الاتصال للأبد.

الغلطة: تنسى [[id:]] في الرسالة. من غيره مفيش [[Last-Event-ID]]، والسيرفر هيبدأ من الأول. أو تستخدم عدّاد في ذاكرة السيرفر، فبعد إعادة التشغيل يضيع. هنا الرقم جاي من الطلب نفسه.

في المعمل قتلنا السيرفر بعد [[received]]، وشغّلناه تاني بعدها بحوالي ثانية (المعمل كان كل 800ms عشان يخلص بسرعة):

~~~text الناتج
لوج السيرفر:
connect last-event-id = -
connect last-event-id = 1

EventStream:
status id=1 received
(اتصال جديد)
status id=2 baking
status id=3 ready
done id=3 1
~~~` },
            { lvl: 'تحدي', t: R`**صلّح:** WebSocket بيتقفل كل دقيقة بالظبط بكود [[1006]] ورا nginx لما مفيش رسايل. اعرف السبب من Messages (آخر رسالة إمتى وأول قفلة إمتى) وصلّحه من الطرفين.`, done: R`كاتب إن الفرق بين آخر رسالة والقفلة ٦٠ ثانية = [[proxy_read_timeout]] الافتراضي، والتصليح: ping كل ٢٥–٣٠ ثانية من السيرفر (أو الصفحة)، و/أو [[proxy_read_timeout]] أكبر، و reconnect بـ backoff في الصفحة.`, sol: R`~~~js server: ping كل 25 ثانية
wss.on("connection", s => {
  const t = setInterval(() => s.ping(), 25000);
  s.on("close", () => clearInterval(t));
});
~~~
~~~text nginx
location /chat {
  proxy_pass http://app:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_read_timeout 300s;
}
~~~
~~~js reconnect بـ backoff في الصفحة
let delay = 1000;
function connect() {
  const ws = new WebSocket(url);
  ws.onopen = () => { delay = 1000; };
  ws.onclose = () => { setTimeout(connect, delay); delay = Math.min(delay * 2, 30000); };
}
connect();
~~~

**التشخيص:** افتح Messages، وبص على وقت آخر رسالة، ووقت القفلة. الفرق ٦٠ ثانية بالظبط، والقفلة [[1006]]، يعني مش خطأ في الكود، ده عدّاد. و nginx بيقفل الاتصال لو مفيش بيانات جاية من السيرفر لمدة [[proxy_read_timeout]]، والافتراضي ٦٠ ثانية.

**التصليح من الطرفين:**

- ping كل ٢٥–٣٠ ثانية، أقل من الـ timeout، فالاتصال دايمًا فيه حركة.
- [[proxy_read_timeout]] أكبر، ده بيقلل بس، مش بيحل.
- reconnect بـ backoff في الصفحة، لأن أي اتصال هيقع في يوم، و backoff بيمنع إن كل المستخدمين يخبطوا في السيرفر في نفس الثانية.

الغلطة: تكبّر الـ timeout لساعة وتكتفي. أي proxy تاني في الطريق أو نت الموبايل هيقطع برضه، وهتفضل عندك اتصالات ميتة.

nginx مااتشغّلش هنا، والافتراضي ٦٠ ثانية من وثائقه. المعمل proxy صغير بـ Node بيقطع الاتصال بعد ٦ ثواني سكوت (نفس الفكرة بعشر الوقت)، و ping كل 2.5 ثانية:

~~~text الناتج
من غير ping:   اتقفل بعد 6 ثواني، code 1006، wasClean false
مع ping:       لسه مفتوح بعد 15 ثانية (readyState 1)
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس صفحة SSE افتحها في ٨ تابات على سيرفر HTTP/1.1، وبعدين نفس الحاجة ورا HTTP/2 (سيرفر [[node:http2]] بـ [[allowHTTP1: true]] وشهادة محلية). كام تاب الأحداث وصلتله؟`, done: R`على HTTP/1.1 ٦ تابات بس شغالة والباقي مستني (Stalled في Network)، وعلى HTTP/2 الـ ٨، والـ Protocol column (كليك يمين على رأس الجدول ثم Protocol) بيقول [[http/1.1]] مرة و [[h2]] مرة.`, sol: R`~~~js h2.mjs (key.pem و cert.pem شهادة محلية بـ openssl)
import http2 from "node:http2";
import fs from "node:fs";
const handler = (req, res) => {
  if (req.url.startsWith("/events")) {
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
    let n = 0;
    const t = setInterval(() => res.write($__btid: $__{++n}\ndata: $__{n}\n\n$__bt), 300);
    req.on("close", () => clearInterval(t));
    return;
  }
  res.writeHead(200, { "content-type": "text/html" });
  res.end('<!doctype html><script>window.g = 0; const e = new EventSource("/events?t=" + Math.random()); e.onmessage = () => g++$__lt/script>');
};
http2.createSecureServer({ key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem"), allowHTTP1: true }, handler)
  .listen(8916, "127.0.0.1");
~~~

نسخة HTTP/1.1 نفس [[handler]] بـ [[http.createServer(handler)]]. افتح الرابط في ٨ تابات، وبص على عمود Protocol (كليك يمين على رأس الجدول ثم Protocol).

على HTTP/1.1 المتصفح بيفتح ٦ اتصالات بس لكل origin، **في كل التابات مع بعض**. و SSE ماسك الاتصال مفتوح للأبد، فالتاب السابع مستني واحد يفضى، وده مش بيحصل. على HTTP/2 كل التابات stream جوه اتصال واحد، فالـ ٨ شغالين.

وليه [[allowHTTP1: true]]: ده بيخلّي نفس السيرفر يرد على أي عميل مش بيدعم h2. والمتصفحات مبتستخدمش HTTP/2 غير على HTTPS، فلازم شهادة.

الغلطة: تفتكر إن الموقع وقع لأن التاب السابع فاضي. ده بيحصل حتى على ملفات الموقع نفسها، لأن الصفحة نفسها مش هتتحمّل. والحل HTTP/2 أو [[SharedWorker]] أو WebSocket.

~~~text الناتج (عدد الأحداث اللي وصلت كل تاب)
HTTP/1.1 (http/1.1):  11, 10, 10, 9, 9, 8, محجوب, محجوب    ← 6 تابات
HTTP/2 (h2):          10, 9, 9, 8, 8, 7, 7, 6               ← 8 تابات
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import http from "node:http";
const seen = [];
const srv = http.createServer((req, res) => {
  seen.push(req.headers["last-event-id"] || "-");
  res.writeHead(200, { "content-type": "text/event-stream" });
  let n = Number(req.headers["last-event-id"] || 0);
  res.write("retry: 100\n\n");
  for (let i = 0; i < 2; i++) { n++; res.write("id: " + n + "\nevent: order\ndata: {\"order\":" + n + "}\n\n"); }
  res.end();
}).listen(0, "127.0.0.1", async () => {
  const url = "http://127.0.0.1:" + srv.address().port + "/events";
  let last = "";
  for (let round = 0; round < 2; round++) {
    const r = await fetch(url, { headers: last ? { "last-event-id": last } : {} });
    console.log("type", r.headers.get("content-type"));
    const text = await r.text();
    for (const block of text.split("\n\n")) {
      const id = (block.match(/^id: (.*)$/m) || [])[1];
      const data = (block.match(/^data: (.*)$/m) || [])[1];
      if (id) { last = id; console.log("event id=" + id + " data=" + data); }
    }
  }
  console.log("server saw last-event-id:", seen.join(","));
  srv.close();
});`, expect: [R`type text/event-stream`, R`event id=1 data={"order":1}`, R`event id=4 data={"order":4}`, R`server saw last-event-id: -,2`] },
          ],
        }
      ]
    }
]);
