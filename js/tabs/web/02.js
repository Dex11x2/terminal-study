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
            { lvl: 'سريع', t: R`**مراجعة:** افتح Network بعد ما الصفحة حمّلت. فاضي ليه؟ اعمل اللي يملاه، وبعدين اكتب الأرقام اللي في الشريط اللي تحت (requests و transferred و resources و Finish و DOMContentLoaded و Load).`, done: R`كاتب إن Network بيسجّل من لحظة ما يتفتح، و ٦ أرقام من الشريط، والفرق بين transferred و resources (المضغوط والكاش مقابل الحجم الحقيقي).` },
            { lvl: 'تطبيق', t: R`**فلتر:** على موقع فيه API، طلّع بالفلاتر: طلبات الـ API بس، وبعدين اللي رجعت 4xx أو 5xx، وبعدين أكبر ٣ ملفات. جرّب في صندوق الفلتر [[status-code:404]] و [[larger-than:100k]] و [[-domain:*.google-analytics.com]] و [[method:POST]].`, done: R`لكل فلتر مكتوب عدد الطلبات اللي فضلت، وعارف إن [[-]] قبل أي فلتر بيعكسه.` },
            { lvl: 'تطبيق', t: R`**Preserve log:** فورم login بيعمل redirect. سجّل الطلب اللي بيبعت الباسورد مرة من غير Preserve log ومرة بيه.`, done: R`من غيره الطلب بيختفي بعد الـ redirect، وبيه بتلاقي الـ POST والـ 302 (أو 303) وبعده الـ GET للصفحة الجديدة بالترتيب.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية (HAR):** كليك يمين في Network ثم Save all as HAR. افتح الملف في محرر: ده JSON. بـ [[node -e]] طلّع أبطأ ٥ طلبات ([[entries[].time]]) وحجم كل واحد.`, done: R`السكربت بيطبع ٥ سطور متترتبين بالوقت. وكاتب تحذير: الـ HAR ممكن يبقى فيه الكوكيز والتوكن، فافتحه ودوّر على [[cookie]] و [[authorization]] قبل ما تبعته لحد (حسب Chrome docs، النسخ الجديدة بتشيل الحساس افتراضيًا إلا لو اخترت التصدير «with sensitive data»).` },
            { lvl: 'تحدي', t: R`**اقرا الـ Waterfall:** على أي صفحة، لاقي في عمود Waterfall طلب بدأ متأخر عن الباقي. مرّر الماوس عليه: الوقت راح في Queueing ولا Stalled ولا Waiting؟ ودوّر في Initiator مين اللي طلبه.`, done: R`كاتب اسم الطلب، والمرحلة الكبيرة ورقمها، والـ initiator (سكربت ولا CSS ولا الـ HTML)، وتفسيرك ليه اتأخر (اتكشف متأخر، ولا مستني connection، ولا السيرفر بطيء).` },
            { lvl: 'تحدي', t: R`**اشرحها:** الفرق بين DOMContentLoaded و Load: ابني صفحة فيها صورة تقيلة بتتأخر من السيرفر (سيرفر Node بـ [[setTimeout]] ٢ ثانية)، وقيس الرقمين.`, done: R`DOMContentLoaded طلع قبل Load بحوالي ٢ ثانية، وكاتب إن DOMContentLoaded = الـ HTML اتقرا والسكربتات العادية اشتغلت، و Load = كل الصور والـ CSS خلصت.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** دوس على طلب API واكتب من كل تاب حاجة واحدة: الـ method والـ status من Headers، والبودي من Payload، وأول مفتاح في Preview، وأول ٢٠ حرف في Response، وأكبر رقم في Timing، والسطر في Initiator.`, done: R`٦ سطور، كل واحد من تاب، ومفيش خانة فاضية.` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الطلب اتبعت مرة بـ JSON ومرة بـ [[FormData]] من Console. قارن Payload و [[Content-Type]] في Request Headers.`, done: R`JSON بيظهر كشجرة و [[application/json]]، و FormData بيظهر Form Data و [[multipart/form-data; boundary=...]]، وكاتب إن المتصفح هو اللي بيحط الـ boundary.` },
            { lvl: 'تطبيق', t: R`**Timing:** اعمل سيرفر Node بـ endpoint بيستنى ١٥٠٠ms قبل ما يرد، و endpoint بيرجّع ملف ٢٠ ميجا. قارن تاب Timing للاتنين.`, done: R`الأول «Waiting for server response» حوالي 1.5s والـ Content Download صغير، والتاني العكس مع Throttling. وكاتب مين المسؤول في كل حالة (السيرفر ولا حجم الملف).` },
            { lvl: 'تطبيق', t: R`**Initiator:** صفحة فيها ٣ ملفات JS واحد منهم بيبعت طلب لـ [[/api/track]] مش عارف مين. لاقيه من تاب Initiator من غير ما تدوّر في الكود.`, done: R`عندك الـ call stack من Initiator واسم الملف ورقم السطر، ودوست عليه وفتحك في Sources على السطر.` },
            { lvl: 'تحدي', t: R`**صلّح:** طلب رجع [[200]] بس الصفحة بتقول «مفيش بيانات». من Preview و Response اكتشف إن الرد [[{"data":{"items":[]}}]] والكود بيقرا [[res.items]]. اكتب خطوات التشخيص بالترتيب.`, done: R`الخطوات: Status [[200]] (يبقى مش السيرفر وقع)، و Preview بيوري شكل الرد، والكود بيقرا مسار غلط، والتصليح [[res.data.items]]. وكاتب ليه [[200]] لوحده مش معناه إن الرد صح.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** شغّل Slow 4G واعمل ريفريش، واكتب Load قبل وبعد، وارجع No throttling. وجرّب Offline على صفحة بتعمل fetch.`, done: R`الرقمين مكتوبين والتاني أكبر بكتير، و Offline طلّع في Console [[Failed to load resource: net::ERR_INTERNET_DISCONNECTED]] و [[Uncaught TypeError: Failed to fetch]].` },
            { lvl: 'تطبيق', t: R`**محاكاة (optimistic UI):** صفحة فيها زرار «علّم كمدفوع» بيغيّر الحالة في الشاشة على طول وبعدين يبعت [[PATCH]]. اعمل Block request URL على الـ endpoint، ودوس الزرار.`, done: R`كاتب: الشاشة اتغيّرت وبعدين رجعت (لو الكود فيه rollback) أو فضلت غلط (باج)، والطلب في Network أحمر ومكتوب إنه اتمنع من DevTools، و Console فيه [[TypeError: Failed to fetch]]. ولو مفيش rollback: كتبت التصليح (ترجّع الحالة القديمة في [[catch]] وتعرض رسالة).` },
            { lvl: 'تطبيق', t: R`**ابني:** في Network conditions اعمل throttling profile اسمه [[Egypt 3G]] (download 750 kb/s، و upload 250، و latency 300ms)، وقيس بيه صفحتك الرئيسية.`, done: R`الـ profile ظاهر في القايمة، ورقم Load بيه مكتوب جنب Slow 4G و No throttling.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** Slow 4G على صفحة فيها فورم: دوس زرار الإرسال ٣ مرات بسرعة. كام طلب اتبعت؟ صلّحها بحيث يطلع طلب واحد والزرار يبان «بيبعت...».`, done: R`قبل التصليح ٣ طلبات [[POST]] في Network، وبعده طلب واحد والزرار [[disabled]] لحد ما الرد يرجع، واتجرّب تاني على Slow 4G.` },
            { lvl: 'تحدي', t: R`**Block الخط:** اعمل Block request على ملف الخط ([[.woff2]] أو [[.ttf]]) في موقع عربي. شكل الصفحة اتغيّر إزاي؟ وإيه اللي الـ CSS لازم يكون فيه عشان الشكل ميبوظش؟`, done: R`كاتب الخط اللي ظهر بداله، وإن [[font-family]] لازم فيه fallback زي [[Tahoma, sans-serif]] بعد الخط، وإن [[font-display: swap]] بيخلّي النص يبان من الأول (درس «مشروع تشخيص موقع بطيء ومكسور» فيه القياس).` },
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
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص: Status و Type و اسم تاب الرسايل لكل واحد من WebSocket و SSE، ومعنى الكود [[1006]].`, done: R`كتبت [[101]]/[[websocket]]/Messages و [[200]]/[[eventsource]]/EventStream، و [[1006]] = اتقطع من غير قفلة، وصحّحتهم من الجدول.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على أي موقع فيه شات أو إشعارات لحظية (أو Next.js dev بالـ HMR، أو Vite dev)، لاقي سطر الاتصال المفتوح في Network، وقول نوعه، واقرا أول ٣ رسايل.`, done: R`كاتب الـ URL والنوع وأول ٣ رسايل. في Vite dev مثلًا هتلاقي WebSocket أول رسالة فيه حاجة زي [[{"type":"connected"}]]، وبعد ما تحفظ ملف هتلاقي رسالة جديدة فيها [[update]] أو [[full-reload]].` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «حالة الأوردر» بـ SSE: السيرفر بيبعت [[received]] ثم [[baking]] ثم [[ready]] كل ثانيتين بـ [[id:]]، والصفحة بتعرض الحالة. اقفل السيرفر وشغّله تاني في النص.`, done: R`الصفحة بتكمّل من الحالة اللي بعد آخر واحدة وصلت (السيرفر قرا [[Last-Event-ID]])، و EventStream فيه الأحداث بالأرقام من غير تكرار.` },
            { lvl: 'تحدي', t: R`**صلّح:** WebSocket بيتقفل كل دقيقة بالظبط بكود [[1006]] ورا nginx لما مفيش رسايل. اعرف السبب من Messages (آخر رسالة إمتى وأول قفلة إمتى) وصلّحه من الطرفين.`, done: R`كاتب إن الفرق بين آخر رسالة والقفلة ٦٠ ثانية = [[proxy_read_timeout]] الافتراضي، والتصليح: ping كل ٢٥–٣٠ ثانية من السيرفر (أو الصفحة)، و/أو [[proxy_read_timeout]] أكبر، و reconnect بـ backoff في الصفحة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس صفحة SSE افتحها في ٨ تابات على سيرفر HTTP/1.1، وبعدين نفس الحاجة ورا HTTP/2 (سيرفر [[node:http2]] بـ [[allowHTTP1: true]] وشهادة محلية). كام تاب الأحداث وصلتله؟`, done: R`على HTTP/1.1 ٦ تابات بس شغالة والباقي مستني (Stalled في Network)، وعلى HTTP/2 الـ ٨، والـ Protocol column (كليك يمين على رأس الجدول ثم Protocol) بيقول [[http/1.1]] مرة و [[h2]] مرة.` },
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
