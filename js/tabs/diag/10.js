// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "مشاكل الويب الشائعة وإدارة الحوادث",
      l: 3,
      time: R`حوالي ٦ ساعات (٦ قضايا، كل واحدة بمعملها)`,
      goal: [
        R`تقرا رسالة CORS أو Mixed Content في الكونسول وتعرف منها أنهي حالة من الأربعة، وتثبت بـ [[curl]] السيرفر رد بإيه، وتصلّح في المكان الصح.`,
        R`تلاقي redirect loop بـ [[curl -IL --max-redirs]] واللوج، وتعرف ليه الـ proxy اللي بيفك TLS هو السبب في أغلب الحالات.`,
        R`تصلّح WebSocket بيفشل ورا nginx (426 بدل 101) وبيفصل كل دقيقة، وتفرق بين الاتنين من الوقت.`,
        R`تمسك الـ query البطيء بـ [[log_min_duration_statement]] و [[pg_stat_statements]] و [[EXPLAIN ANALYZE]] وتقيس قبل وبعد بـ [[pgbench]]، وتفهم TIME_WAIT وإزاي اتصال لكل طلب بيخلّص البورتات.`,
        R`تلاقي الـ commit اللي كسر الإنتاج من بين ٤٠ بـ [[git bisect run]] وسكربت بيرجّع 0 و 1 و 125، وتعرف الفخ اللي بيدّي إجابة غلط.`,
        R`تدير حادثة من أول تنبيه: severity، وأدوار، ورسايل، وتوقيف النزيف، وتطلّع الخط الزمني من اللوج، وتكتب runbook و postmortem من غير لوم.`,
      ],
      use: {
        net: R`CORS و Mixed Content و redirects و WebSocket كلهم قواعد HTTP والمتصفح، و TIME_WAIT جزء من TCP نفسه. كل قضية بتوريك الطبقة دي وهي بايظة.`,
        work: R`دي أكتر رسايل بتتبعت في جروبات الفرق: «الـ API شغّال في Postman ومش شغّال في الموقع»، و «ERR_TOO_MANY_REDIRECTS بعد ما حطينا Cloudflare»، و «الشات بيفصل كل شوية»، و «الموقع بطيء الصبح بس»، و «مين كسر الأسعار؟»، و «الموقع وقع، نعمل إيه؟».`,
        prog: R`نص القضايا الحل فيها في الكود (headers و heartbeat و connection pool و index واختبار)، والنص التاني في الإعداد (nginx و proxy). القضية بتعلّمك تعرف أنهي فيهم قبل ما تلمس حاجة.`,
      },
      lab: R`mkdir -p ~/lab/webcases && cd ~/lab/webcases`,
      projects: [
        { lvl: 'صغير', t: R`[[cors-check.sh]]: الـ API هيعدّي من المتصفح؟`, what: R`سكربت بياخد URL الـ API والـ origin والـ method والـ headers، ويعمل preflight بـ [[curl -X OPTIONS]] وطلب حقيقي بـ [[Origin]]، ويطبع لكل شرط (الـ origin، والـ method، والـ headers، والـ credentials، و [[Vary: Origin]]) OK أو FAIL وسبب. من درس «CORS و mixed content».`, done: R`على معمل الدرس: [[/no-header]] بيطلع FAIL في الـ origin، و [[/orders]] من غير [[?fixed=1]] FAIL في الـ preflight بـ 404، و [[/star-cred]] مع [[--credentials]] FAIL بسبب [[*]]، و [[/ok]] كله OK، ورقم الخروج 0 بس لو كله OK.` },
        { lvl: 'صغير', t: R`[[redirects.sh]]: ارسم سلسلة التحويلات`, what: R`بياخد URL ويمشي في التحويلات بإيده (من غير [[-L]]): لكل خطوة يطبع الكود والـ [[Location]]، ويقف لو الـ URL اتكرر ويطبع [[LOOP: A -> B -> A]] أو لو عدّى ١٠ خطوات. من درس «redirect loop».`, done: R`على معمل الدرس بيطبع [[LOOP]] للـ edge (الـ URL بيحوّل لنفسه) وللـ www (اتنين بيحوّلوا لبعض)، وبعد التصليح بيطبع [[200 after 0 redirects]]، ومبيعملش أكتر من ١١ طلب.` },
        { lvl: 'متوسط', t: R`[[ws-probe]]: WebSocket شغّال ورا الـ proxy؟`, what: R`أداة Node (من غير مكتبات) بتفتح WebSocket على URL، وتطبع: الـ handshake (101 ولا كود تاني)، ووقت الفتح، وتبعت رسالة وتستنى الرد، وتفضل مفتوحة مدة تحددها وتطبع إمتى اتقفلت والكود. و [[--expect-idle 70]] تقول FAIL لو اتقفلت قبل ٧٠ ثانية. من درس «WebSocket بيفصل».`, done: R`على معمل الدرس: [[/broken/ws]] بيطبع [[handshake failed]]، و [[/ws]] بالـ timeout القصير بيطبع [[closed after 5.0s code=1006]] و FAIL، وبالـ heartbeat بيعدّي، ورقم الخروج بيفرق بين الحالات.` },
        { lvl: 'متوسط', t: R`تقرير الاستعلامات البطيئة`, what: R`سكربت بيقرا [[pg_stat_statements]] (أو لوج [[duration:]]) ويطبع أبطأ ١٠ استعلامات بالمتوسط والمجموع وعدد المرات، ولكل واحد [[EXPLAIN]] (من غير ANALYZE على الإنتاج) ويعلّم لو فيه [[Seq Scan]] على جدول أكبر من حد. ويحفظ snapshot يومي عشان تقارن. من درس «slow query و TIME_WAIT».`, done: R`على معمل الدرس قبل الـ index: أول سطر [[SELECT ... customer_id = $1]] ومعاه [[Seq Scan]] و mean حوالي ٢٠٠ms، وبعد الـ index بيختفي من أول ١٠ أو mean أقل من ١ms، والمقارنة بين يومين بتطبع الفرق.` },
        { lvl: 'كبير', t: R`[[regress-hunt]]: لاقي الـ commit اللي كسر حاجة لوحدك`, what: R`أداة بتاخد: نسخة سليمة ونسخة بايظة وأمر اختبار. (١) تتأكد إن الأمر بيعدّي على السليمة وبيفشل على البايظة (وإلا ترفض). (٢) تنسخ السكربت برة الريبو. (٣) تعمل [[bisect run]] بغلاف بيرجّع 125 لو البناء نفسه فشل. (٤) تطبع الـ commit والـ diff والكاتب. (٥) تحفظ [[bisect log]]. (٦) ترجّع الريبو زي ما كان حتى لو اتقطعت بـ Ctrl+C. من درس «git bisect لعطل في الإنتاج».`, done: R`على معمل الدرس بتطبع [[f2a1d87 refactor(price): simplify rounding]]، و commit البناء البايظ اتعمله skip، وتشغيلها بأمر بيعدّي على الاتنين بترفض قبل ما تبدأ، وبعد Ctrl+C [[git status]] بيقول [[On branch main]].`, ext: R`خليها تشتغل في CI: لما الـ nightly يفشل، تعمل bisect على الـ commits من آخر نجاح وتعلّق باسم الـ commit في issue.` },
        { lvl: 'كبير', t: R`[[incident-kit]]: أدوات أول ١٥ دقيقة`, what: R`فولدر فيه: [[timeline.sh]] بيطلّع من access log نسبة الأخطاء لكل دقيقة (أو ثانية) وأول وآخر 5xx، و [[status.sh]] بيكتب رسالة تحديث جاهزة (الوقت، والـ severity، والأثر، والخطوة الجاية) من متغيّرات، و [[runbook.md]] لكل عَرَض (502، و 504، والديسك، والـ CPU) أول ٣ أوامر وأول حاجة متعملهاش، و [[postmortem.md]] template. من درس «incident: severity و runbook و postmortem».`, done: R`على لوج معمل الدرس [[timeline.sh]] بيطبع [[11:34:08]] أول 5xx و [[11:34:20]] آخر واحد و [[38.0%]]، و [[status.sh SEV2 ...]] بيطبع رسالة فيها الوقت UTC، وزميل استخدم الـ runbook في «تمرين حريق» ووصل للسبب من غير ما يسألك.`, ext: R`اربطه بالتنبيهات: لما Alertmanager يبعت (درس «Alertmanager» في نفس التاب)، يتعمل فولدر حادثة فيه الخط الزمني وأول رسالة تلقائي.` },
        { lvl: 'فكرة', t: R`كتالوج أعطال الويب بتاعك`, what: R`كل مرة تقابل رسالة غريبة في الكونسول أو من [[curl]] (CORS، و redirects، و WebSocket، و TLS، و cookies، و cache)، اكتب: النص بالظبط، وإزاي تعيدها في معمل صغير، والسبب، والتصليح، والتصليحات الغلط اللي الناس بتقترحها. انت اللي تحدد الشكل (صفحة، أو ريبو فيه فولدر لكل حالة، أو موقع).`, done: R`فيه ١٠ حالات على الأقل، كل واحدة ليها معمل بيتشغّل بأمر واحد ويطلّع نفس الرسالة، وزميل لقى فيه رسالة قابلها وصلّحها من غير مساعدة.`, ext: R`اعمل منه بحث: تحط الرسالة اللي ظاهرة عندك، وهو يطلعلك الحالة الأقرب.` },
      ],
      n: R`أعطال الويب اللي كل مطوّر بيقابلها، وكل واحدة قضية كاملة بمعمل: CORS و mixed content، و redirect loop، و WebSocket بيفشل ورا nginx، و slow query و TIME_WAIT، و git bisect لعطل في الإنتاج، وإدارة الحادثة نفسها: severity و runbook و postmortem`,
      items: [
        {
          cmd: "CORS و mixed content",
          title: "الـ API شغّال في curl والصفحة بتقول blocked by CORS policy، وبعد HTTPS بقت Mixed Content",
          learn: R`تقرا رسالة الكونسول وتعرف منها الحالة، وتثبت إن الطلب وصل السيرفر أو موصلش، وتصلّح الـ headers أو الـ preflight أو الـ credentials أو الـ HTTP في المكان الصح، وتعرف التصليحات اللي بتفتح ثغرة.`,
          out: R`الكونسول بيطبع [[OK [{"id":1,"total":120}]]] من صفحة [[http://shop.example:3000]]، و [[curl -X OPTIONS]] على [[/orders]] بيرجّع [[204]] وفيه [[Access-Control-Allow-Origin]].`,
          desc: R`الصفحة على [[http://shop.example:3000]] بتعمل [[fetch]] لـ [[http://api.shop.example:3001]]. الـ API شغّال: [[curl]] بيرجّع الداتا. بس الكونسول بيقول [[has been blocked by CORS policy]]. السبب: المتصفح بيمنع الصفحة إنها **تقرا** رد من origin تاني (scheme و host و port) إلا لو السيرفر قال صراحة «مسموح للـ origin ده» بـ header [[Access-Control-Allow-Origin]]. و [[curl]] مش متصفح، فمبيطبّقش القاعدة دي أصلًا، و «شغّال في curl» مش دليل على حاجة.

فيه ٤ حالات ليها ٤ رسايل مختلفة: الـ header مش موجود، والـ preflight ([[OPTIONS]] قبل الطلب) مش متعامل معاه، و [[*]] مع cookies، وخطأ 500 من غير headers فبيبان كأنه CORS. وبعد ما الموقع بقى HTTPS ظهرت مشكلة تانية: **Mixed Content**: صفحة HTTPS بتطلب [[http://]]، والمتصفح بيمنع الـ fetch خالص ومش بيبعته.

الحل في السيرفر (أو الـ proxy قدامه)، مش في الصفحة: الـ headers الصح لكل حالة، أو الأحسن تقدّم الـ API من نفس الـ origin ([[/api]] على نفس الدومين) فـ CORS ميبقاش ليه لازمة. ومع HTTPS: الـ API لازم يبقى [[https://]].`,
          example: R`node api.js & node page.js &
node cdp.js "http://shop.example:3000/?t=no-header"
curl -si -H "Origin: http://shop.example:3000" http://127.0.0.1:3001/no-header
curl -si -X OPTIONS -H "Origin: http://shop.example:3000" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type,authorization" http://127.0.0.1:3001/orders
curl -s -o /dev/null -D - -H "Origin: http://shop.example:3000" http://127.0.0.1:3001/crash
node cdp.js "https://shop.example:8443/?t=mixed"`,
          lines: [
            R`بيشغّل سيرفرين المعمل في الخلفية ([[&]]): الـ API على 3001 والصفحة على 3000 (و HTTPS على 8443).`,
            R`بيفتح Chrome headless على الصفحة ويطبع رسايل الكونسول زي ما بتظهر في DevTools. [[?t=]] بيختار الحالة اللي الصفحة هتجرّبها.`,
            R`نفس الطلب من [[curl]] مع [[Origin]] زي المتصفح: [[-i]] بيطبع الـ headers. هنا هنشوف الرد 200 والداتا موجودة، بس مفيش [[Access-Control-Allow-Origin]].`,
            R`بيعمل الـ preflight بإيده: المتصفح بيبعت [[OPTIONS]] ومعاه الـ method والـ headers اللي الطلب الحقيقي محتاجها، ويستنى إذن قبل ما يبعت الـ POST.`,
            R`[[-D -]] بيطبع الـ headers على الشاشة و [[-o /dev/null]] بيرمي الـ body: عشان نشوف إن رد الـ 500 مفيهوش أي [[Access-Control]].`,
            R`صفحة HTTPS بتطلب API على [[http://]]: الكونسول بيطبع [[Mixed Content]] والطلب مبيتبعتش أصلًا.`,
          ],
          try: R`ابني المعمل اللي في الشرح ([[api.js]] و [[page.js]] و [[cdp.js]]) في [[~/lab/webcases/cors]]، وجرّب الـ ٩ حالات واحدة واحدة. قبل كل حالة اكتب توقعك: الكونسول هيقول إيه؟ والطلب هيوصل السيرفر ولا لأ (بص على لوج [[api.js]])؟`,
          teach: R`## العَرَض

المطوّر بيقول: «الـ API شغّال، جرّبته في curl وفي Postman، بس الموقع بيقول CORS». والكونسول:

~~~text Chrome DevTools > Console
Access to fetch at 'http://api.shop.example:3001/no-header' from origin 'http://shop.example:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Failed to load resource: net::ERR_FAILED
JS caught: TypeError Failed to fetch
~~~

والكود بيوصله [[TypeError: Failed to fetch]] بس، من غير أي تفاصيل. التفاصيل في الكونسول بس (عمدًا: الصفحة متعرفش ليه، عشان متقدرش تتجسس على سيرفرات تانية).

---

## المعمل

كل الرسايل هنا من Chrome 156 headless فعلًا على ويندوز (مش من الذاكرة)، و Node 24، و curl 8.23 (Git Bash). ٣ ملفات في [[~/lab/webcases/cors]]:

~~~javascript api.js
// api.shop.example:3001 — كل مسار بيمثّل حالة
const http = require('http');
const PAGE = 'http://shop.example:3000';
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  console.log(new Date().toISOString(), req.method, req.url, 'Origin=' + (req.headers.origin || '-'));
  const send = (code, headers, body) => { res.writeHead(code, { 'Content-Type': 'application/json', ...headers }); res.end(body); };
  const data = JSON.stringify([{ id: 1, total: 120 }]);
  switch (u.pathname) {
    case '/no-header': return send(200, {}, data);
    case '/ok': return send(200, { 'Access-Control-Allow-Origin': PAGE, 'Vary': 'Origin' }, data);
    case '/star-cred': return send(200, { 'Access-Control-Allow-Origin': '*' }, data);
    case '/cred-ok': return send(200, { 'Access-Control-Allow-Origin': PAGE, 'Access-Control-Allow-Credentials': 'true', 'Vary': 'Origin' }, data);
    case '/orders':
      if (req.method === 'OPTIONS') {
        if (u.searchParams.get('fixed') === '1') return send(204, { 'Access-Control-Allow-Origin': PAGE, 'Access-Control-Allow-Methods': 'GET, POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Max-Age': '600', 'Vary': 'Origin' }, '');
        return send(404, {}, '{"error":"not found"}');
      }
      return send(201, { 'Access-Control-Allow-Origin': PAGE, 'Vary': 'Origin' }, '{"id":2}');
    case '/crash': return send(500, {}, '{"error":"db down"}');
    default: return send(404, {}, '{}');
  }
}).listen(3001, () => console.log('api on 3001'));
~~~

- [[page.js]]: سيرفر بيقدّم صفحة HTML فيها [[fetch]] حسب [[?t=]] (مثلًا [[?t=preflight]] بيعمل [[fetch(API + '/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer t' }, body: '{}' })]])، على [[http]] بورت 3000، وعلى [[https]] بورت 8443 بشهادة self-signed من [[openssl req -x509]].
- [[cdp.js]]: بيشغّل Chrome بـ [[--headless=new]] و [[--remote-debugging-port]]، ويتكلم معاه بالـ DevTools Protocol على WebSocket ([[Runtime.enable]] و [[Log.enable]] و [[Page.navigate]])، ويطبع كل رسالة كونسول.
- عشان المتصفح يشوف دومينات حقيقية الشكل من غير DNS: [[--host-resolver-rules="MAP shop.example 127.0.0.1, MAP api.shop.example 127.0.0.1"]]. ده مهم لـ Mixed Content: [[localhost]] و [[127.0.0.1]] المتصفح بيعتبرهم آمنين، فمكانش هيمنع حاجة.

---

## ١. اقرا الرسالة الأول: فيه ٤ رسايل مختلفة

| الحالة | الرسالة (بعد [[blocked by CORS policy:]]) |
|---|---|
| السيرفر مرجّعش الـ header | [[No 'Access-Control-Allow-Origin' header is present on the requested resource.]] |
| الـ preflight فشل | [[Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] |
| [[*]] مع [[credentials: 'include']] | [[The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.]] |
| 500 من غير headers | نفس رسالة الحالة الأولى! |

نفس الـ [[TypeError Failed to fetch]] في الكود في الأربعة. فأول خطوة دايمًا: افتح الكونسول (مش الكود) واقرا الجملة بعد [[CORS policy:]].

---

## ٢. الطلب وصل السيرفر؟ (ده بيفرق الحالات)

لوج [[api.js]] وقت التجارب:

~~~text api.log
GET /no-header Origin=http://shop.example:3000
GET /ok Origin=http://shop.example:3000
GET /star-cred Origin=http://shop.example:3000
GET /cred-ok Origin=http://shop.example:3000
OPTIONS /orders Origin=http://shop.example:3000
OPTIONS /orders?fixed=1 Origin=http://shop.example:3000
POST /orders?fixed=1 Origin=http://shop.example:3000
GET /crash Origin=http://shop.example:3000
~~~

- [[GET /no-header]] **وصل** والسيرفر رد 200 بالداتا. المتصفح استلم الرد ورفض يدّيه للصفحة. يعني: لو الطلب بيغيّر حاجة (طلب GET بيمسح مثلًا) التغيير حصل. CORS بيحمي **القراية**، مش السيرفر.
- [[/orders]] من غير [[fixed]]: وصل [[OPTIONS]] بس، و [[POST]] **عمره ما اتبعت**. الـ preflight فشل فالمتصفح وقف.
- مع [[fixed=1]]: [[OPTIONS]] ثم [[POST]] على طول.
- والـ Mixed Content (تحت) مفيش ليها سطر: الطلب مخرجش من المتصفح.

### إمتى المتصفح بيعمل preflight؟

لو الطلب «مش بسيط»: method غير [[GET]] و [[HEAD]] و [[POST]]، أو header غير الأساسيين (زي [[Authorization]])، أو [[Content-Type]] غير [[text/plain]] و [[multipart/form-data]] و [[application/x-www-form-urlencoded]] (يعني [[application/json]] = preflight). طلب الـ [[/orders]] فيه الاتنين.

---

## ٣. اتأكد بـ [[curl]]: شوف الـ headers بعينك

~~~text curl -si -H "Origin: http://shop.example:3000" http://127.0.0.1:3001/no-header
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 03 Nov 2026 11:23:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

[{"id":1,"total":120}]
~~~

الداتا موجودة (ده اللي خلّى المطوّر يقول «شغّال»)، و [[Access-Control-Allow-Origin]] مش موجود (ده اللي المتصفح بيدوّر عليه).

الـ preflight:

~~~text curl -si -X OPTIONS -H "Origin: ..." -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type,authorization" .../orders
HTTP/1.1 404 Not Found
Content-Type: application/json
~~~

السيرفر معندوش route لـ [[OPTIONS]]، فرجّع 404 من غير headers. وده أشهر سبب في الـ frameworks: الـ CORS middleware متسجّل بعد الـ routes، أو مش متسجّل على [[OPTIONS]]. وبعد التصليح ([[?fixed=1]]):

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://shop.example:3000
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
Vary: Origin
~~~

| الـ header | معناه |
|---|---|
| [[Access-Control-Allow-Origin]] | الـ origin ده مسموحله يقرا. قيمة واحدة بس، أو [[*]] |
| [[Access-Control-Allow-Methods]] | الـ methods المسموحة (للـ preflight) |
| [[Access-Control-Allow-Headers]] | الـ headers اللي الصفحة مسموحلها تبعتها |
| [[Access-Control-Allow-Credentials: true]] | مسموح بالـ cookies، وساعتها الـ origin لازم يبقى بالاسم مش [[*]] |
| [[Access-Control-Max-Age]] | المتصفح يحفظ الإذن ده كام ثانية بدل preflight مع كل طلب |
| [[Vary: Origin]] | لأي cache في النص: الرد بيختلف حسب الـ origin، متديش رد origin لـ origin تاني |

---

## ٤. الحالة الغدّارة: 500 لابس لبس CORS

~~~text curl -s -o /dev/null -D - -H "Origin: ..." http://127.0.0.1:3001/crash
HTTP/1.1 500 Internal Server Error
~~~

الكونسول قال [[No 'Access-Control-Allow-Origin' header]]، والمطوّر قعد يعدّل إعدادات CORS ساعة، والمشكلة الحقيقية [[db down]]. الرد اللي فيه خطأ اتعمل من مكان تاني في الكود (error handler) مبيحطش الـ headers. وفي nginx نفس الحكاية:

~~~nginx default.conf
location /api/ {
  add_header Access-Control-Allow-Origin "https://shop.example";
  return 500 '{"error":"db down"}';
}
location /api2/ {
  add_header Access-Control-Allow-Origin "https://shop.example" always;
  return 500 '{"error":"db down"}';
}
~~~

~~~text curl -si على الاتنين (nginx 1.31.6 في Docker)
== /api/
HTTP/1.1 500 Internal Server Error
== /api2/
HTTP/1.1 500 Internal Server Error
Access-Control-Allow-Origin: https://shop.example
~~~

[[add_header]] من غير [[always]] بيتحط على 200 و 201 و 204 و 206 و 301 و 302 و 303 و 304 و 307 و 308 بس. فأي خطأ بيبان CORS. القاعدة: لو شفت رسالة CORS، أول حاجة [[curl -i]] وشوف الـ **status code** قبل ما تلمس الـ headers.

---

## ٥. Mixed Content

الموقع اتنقل لـ HTTPS، والكود لسه فيه [[http://api.shop.example:3001]]:

~~~text Chrome Console (صفحة https://shop.example:8443)
Mixed Content: The page at 'https://shop.example:8443/?t=mixed' was loaded over HTTPS, but requested an insecure resource 'http://api.shop.example:3001/ok'. This request has been blocked; the content must be served over HTTPS.
JS caught: TypeError Failed to fetch
~~~

ولو صورة ([[<img src="http://...">]]) المتصفح بيحاول يرقّيها لوحده:

~~~text الناتج
Mixed Content: The page at 'https://shop.example:8443/?t=mixed-img' was loaded over HTTPS, but requested an insecure element 'http://api.shop.example:3001/logo.png'. This request was automatically upgraded to HTTPS, For more information see https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html
Failed to load resource: net::ERR_SSL_PROTOCOL_ERROR
~~~

اترقّت لـ [[https://api.shop.example:3001]]، والبورت ده مفيهوش TLS، فـ [[ERR_SSL_PROTOCOL_ERROR]]. يعني الحل الوحيد إن الـ API نفسه يبقى HTTPS. وده **مش** CORS: حتى لو الـ headers كلها صح، الطلب مش هيتبعت.

---

## ٦. السبب والحل لكل حالة

| الحالة | الحل | اتأكد بـ |
|---|---|---|
| مفيش header | السيرفر يرجّع [[Access-Control-Allow-Origin]] بالـ origin من لستة مسموحة، و [[Vary: Origin]] | [[curl -si -H "Origin: ..."]] |
| preflight | route أو middleware لـ [[OPTIONS]] يرجّع 204 بالـ headers التلاتة، **قبل** الـ auth (الـ preflight مبيبعتش [[Authorization]]) | [[curl -X OPTIONS]] |
| [[*]] مع cookies | الـ origin بالاسم و [[Allow-Credentials: true]] | الكونسول |
| 500 متخبّي | الـ headers في الـ error handler، و [[always]] في nginx | [[curl -i]] على endpoint بيفشل |
| Mixed Content | الـ API على HTTPS، والـ URL في الكود [[https://]] أو [[/api]] | الكونسول |
| **الأحسن غالبًا** | الصفحة والـ API على نفس الـ origin: nginx بيعمل [[location /api/ { proxy_pass ...; }]] | مفيش CORS خالص |

### التصليحات اللي اترفضت (وليه)

| التصليح | ليه لأ |
|---|---|
| [[mode: 'no-cors']] في [[fetch]] | الرد بيرجع «opaque»: مفيش body ولا status، يعني مش هتقدر تقرا الداتا أصلًا |
| إضافة متصفح أو [[--disable-web-security]] | شغّال عندك بس، والمستخدمين لأ |
| السيرفر يرجّع أي [[Origin]] جاله زي ما هو + [[Allow-Credentials: true]] | أي موقع في الدنيا يقدر يقرا بيانات المستخدم بالـ cookies بتاعته. ده ثغرة مش تصليح |
| [[Access-Control-Allow-Origin: *]] على API فيه بيانات خاصة | لو مفيش cookies ممكن، بس الأحسن لستة |
| «اسمح بالمحتوى غير الآمن» في إعدادات المتصفح | نفس الإضافة: عندك بس |

### اتأكد إنها اتحلّت

~~~text الكونسول بعد التصليح
### http://shop.example:3000/?t=ok
console.log: OK [{"id":1,"total":120}]
### http://shop.example:3000/?t=preflight-fixed
console.log: OK {"id":2}
### http://shop.example:3000/?t=cred-ok
console.log: OK [{"id":1,"total":120}]
~~~

### متتكررش

- فحص CORS بـ [[curl]] في CI أو بعد كل deploy: preflight لكل origin مسموح، ولازم يرجّع الـ header (مشروع [[cors-check.sh]] في الوحدة).
- لستة الـ origins في متغيّر بيئة، مش مكتوبة في الكود.
- في الـ frontend متكتبش [[http://]] لأي API: استخدم [[/api]] أو متغيّر بيئة.
- وتفاصيل CORS نفسه (إزاي تكتبه في Express و FastAPI) في تاب الـ API وتاب الويب.`,
          deep: {
            why: R`المتصفح بيبعت الـ cookies بتاعة أي موقع مع أي طلب ليه. من غير قاعدة same-origin، أي صفحة تفتحها كانت تقدر تعمل [[fetch]] لبنكك وتقرا الرد بالـ cookies بتاعتك. CORS هو الاستثناء المتحكم فيه: السيرفر بس هو اللي يقول مين مسموحله يقرا. و Mixed Content بيحمي إن صفحة HTTPS متجيبش كود أو بيانات ممكن حد في النص يغيّرها.`,
            how: R`لكل طلب cross-origin المتصفح بيضيف [[Origin]]. لو الطلب «بسيط» بيبعته على طول، ولما الرد يرجع بيقارن [[Access-Control-Allow-Origin]] بالـ origin: لو مش مطابق بيرمي الرد ويرمي [[TypeError]] للصفحة. لو مش بسيط بيبعت [[OPTIONS]] الأول بـ [[Access-Control-Request-Method]] و [[Access-Control-Request-Headers]]، ومش بيكمّل غير لو الرد 2xx وفيه الإذن، وبيحفظه [[Max-Age]] ثانية. ومع [[credentials: 'include']] لازم origin بالاسم و [[Allow-Credentials: true]]. و Mixed Content بيتفحص قبل أي حاجة دي: صفحة [[https]] وطلب [[http]] لدومين مش [[localhost]] = منع (للـ fetch والـ scripts) أو ترقية تلقائية لـ https (للصور والفيديو والصوت).`,
            when: R`أي frontend على دومين أو بورت غير الـ API (Vite على 5173 والـ API على 3000 عند التطوير، أو [[app.]] و [[api.]] في الإنتاج)، وأي نقل لـ HTTPS، وأي مرة الكونسول فيه [[CORS]] أو [[Mixed Content]] أو الكود شايف [[Failed to fetch]] من غير سبب.`,
            mistakes: R`تصدّق «شغّال في curl». وتعدّل CORS والمشكلة 500 متخبّي. و middleware الـ CORS بعد الـ auth فالـ preflight بياخد 401. و [[*]] مع cookies. وتعكس أي Origin. و [[mode: 'no-cors']]. وتنسى [[Vary: Origin]] فالـ CDN يدّي origin رد origin تاني. و [[add_header]] من غير [[always]]. وتجرّب Mixed Content على [[localhost]] فمتشوفهاش وتتفاجئ في الإنتاج. وتحط الـ header مرتين (مرة في nginx ومرة في التطبيق) فالمتصفح يرفض بـ [[contains multiple values]].`
          },
          sol: R`الحالات: [[no-header]] و [[crash]] بنفس رسالة [[No 'Access-Control-Allow-Origin' header is present]]، و [[preflight]] بـ [[Response to preflight request doesn't pass access control check]]، و [[star-cred]] بـ [[must not be the wildcard '*' when the request's credentials mode is 'include']]، و [[ok]] و [[cred-ok]] و [[preflight-fixed]] بـ [[OK]]، و [[mixed]] بـ [[Mixed Content: ... This request has been blocked]]، و [[mixed-img]] بـ [[automatically upgraded to HTTPS]] و [[ERR_SSL_PROTOCOL_ERROR]]. والطلب **وصل** السيرفر في كل حالات CORS ماعدا الـ [[POST]] بتاع الـ preflight الفاشل، وموصلش خالص في Mixed Content.

اتجرّب على ويندوز: Chrome 156 headless عن طريق DevTools Protocol، و Node 24، و curl 8.23، و nginx 1.31.6 ([[nginx:alpine]]) لتجربة [[always]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: الطلب ده هيعمل preflight ولا لأ؟ (١) [[fetch(url)]] (٢) [[fetch(url, {method:'POST', body: form})]] بـ FormData (٣) [[fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}})]] (٤) [[fetch(url, {method:'DELETE'})]] (٥) [[fetch(url, {headers:{Authorization:'Bearer x'}})]].`, done: R`كتبت: لأ، لأ، أيوه، أيوه، أيوه، وقلت السبب لكل واحد (method، أو Content-Type، أو header مش أساسي).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، شيل [[Vary: Origin]] و [[Allow-Credentials]] من [[/cred-ok]] وسيب الـ origin. الكونسول هيقول إيه بالظبط؟ والسيرفر هيشوف الطلب؟ نفّذ.`, done: R`توقعت رسالة فيها [[Access-Control-Allow-Credentials]] لازم تبقى [[true]] مع [[credentials mode is 'include']]، وإن الطلب وصل السيرفر (سطر في اللوج)، والنص اللي طلع اتنسخ في ملاحظاتك.` },
            { lvl: 'تطبيق', t: R`صلّح السيرفر البايظ ده: Express فيه [[app.use(auth)]] وبعده [[app.use(cors({ origin: true, credentials: true }))]]. الـ preflight بيرجّع 401، ولما اتصلّح الترتيب بقى أي موقع يقدر يقرا. اكتب النسخة الآمنة (لستة من [[ALLOWED_ORIGINS]]) وجرّبها بـ [[curl]] بـ origin مسموح ومش مسموح.`, done: R`الـ cors قبل الـ auth، و [[origin]] function بتقبل اللي في اللستة بس، و [[curl -X OPTIONS]] بـ origin مسموح بيرجّع 204 وفيه الـ header، وبـ [[https://evil.example]] مفيش [[Access-Control-Allow-Origin]].` },
            { lvl: 'تطبيق', t: R`ابني الحل «نفس الـ origin»: nginx (أو [[node]] بسيط) بيقدّم الصفحة على [[/]] ويعمل proxy لـ [[/api/]] على الـ API. شيل كل headers الـ CORS من [[api.js]] وغيّر الـ fetch لـ [[/api/no-header]]. الكونسول بيقول إيه؟`, done: R`الصفحة بتطبع [[OK]] والـ API مفيهوش ولا header CORS، و [[curl -si http://shop.example/api/no-header]] بيرجّع 200، واللوج بتاع الـ API مفيهوش [[OPTIONS]] خالص.` },
            { lvl: 'تحدي', t: R`ابني [[cors-check.sh <url> <origin> [method] [headers] [--credentials]]]: preflight وطلب حقيقي، ولكل شرط OK أو FAIL بسبب (الـ status، والـ origin مطابق، والـ method، والـ headers، و [[*]] مع credentials، و [[Vary]])، ورقم خروج غير صفر لو أي FAIL.`, done: R`على المعمل: [[/no-header]] FAIL في الـ origin، و [[/orders]] FAIL في الـ preflight status 404، و [[/orders?fixed=1]] كله OK، و [[/star-cred --credentials]] FAIL بسبب [[*]]، و [[/crash]] FAIL بـ status 500 مكتوب قبل أي حاجة.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه CORS مبيحميش السيرفر، وإيه اللي بيحميه فعلًا، وليه عكس أي [[Origin]] مع cookies ثغرة. استخدم سطر اللوج [[GET /no-header]] من المعمل كدليل.`, done: R`الشرح فيه: الطلب بيوصل والسيرفر بينفّذه (اللوج)، والمتصفح بيمنع القراية بس، والحماية من الطلبات اللي بتغيّر حاجة هي CSRF tokens و [[SameSite]]، وعكس الـ Origin مع cookies بيخلّي أي موقع يقرا بيانات المستخدم.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > api.js <<'EOF'
const http = require('http');
const PAGE = 'http://shop.example:3000';
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const send = (code, h, body) => { res.writeHead(code, { 'Content-Type': 'application/json', ...h }); res.end(body); };
  if (u.pathname === '/no-header') return send(200, {}, '[1]');
  if (u.pathname === '/ok') return send(200, { 'Access-Control-Allow-Origin': PAGE, 'Vary': 'Origin' }, '[1]');
  if (u.pathname === '/orders' && req.method === 'OPTIONS') {
    if (u.searchParams.get('fixed') === '1') return send(204, { 'Access-Control-Allow-Origin': PAGE, 'Access-Control-Allow-Methods': 'GET, POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, '');
    return send(404, {}, '{}');
  }
  if (u.pathname === '/crash') return send(500, {}, '{"error":"db down"}');
  send(404, {}, '{}');
}).listen(38411, () => console.log('ready'));
EOF
node api.js > api.log 2>&1 &
PID=$!
for i in 1 2 3 4 5 6 7 8 9 10; do grep -q ready api.log && break; sleep 0.5; done
O="Origin: http://shop.example:3000"
echo "no-header acao: $(curl -si -H "$O" http://127.0.0.1:38411/no-header | grep -ci '^access-control-allow-origin')"
curl -si -H "$O" http://127.0.0.1:38411/ok | grep -i '^access-control-allow-origin' | tr -d '\r'
P='-X OPTIONS -H Access-Control-Request-Method:POST -H Access-Control-Request-Headers:content-type,authorization'
echo "preflight: $(curl -s -o /dev/null -w '%{http_code}' $P -H "$O" http://127.0.0.1:38411/orders)"
echo "preflight fixed: $(curl -s -o /dev/null -w '%{http_code}' $P -H "$O" 'http://127.0.0.1:38411/orders?fixed=1')"
echo "crash: $(curl -s -o /dev/null -w '%{http_code}' -H "$O" http://127.0.0.1:38411/crash) acao=$(curl -si -H "$O" http://127.0.0.1:38411/crash | grep -ci '^access-control')"
kill $PID; wait $PID 2>/dev/null || true`, expect: [R`no-header acao: 0`, R`Access-Control-Allow-Origin: http://shop.example:3000`, R`preflight: 404`, R`preflight fixed: 204`, R`crash: 500 acao=0`] },
          ],
        },
        {
          cmd: "redirect loop",
          title: "ERR_TOO_MANY_REDIRECTS: الموقع بيحوّل لنفسه بعد ما حطينا proxy بيفك HTTPS",
          learn: R`تثبت إن فيه loop وتلاقي مين بيحوّل لمين بـ [[curl -IL --max-redirs]] واللوج، وتعرف ليه الأصل مش شايف إن الطلب HTTPS، وتصلّحه في الـ proxy أو التطبيق، وتمنعه بفحص بعد كل deploy.`,
          out: R`[[curl -sk -L --max-redirs 5 -w '%{http_code} redirects=%{num_redirects}']] بيطبع [[200 redirects=0]] بعد التصليح بدل [[curl: (47) Maximum (5) redirects followed]].`,
          desc: R`حطيت قدام الموقع حاجة بتفك HTTPS (Cloudflare، أو load balancer، أو nginx تاني) وبتكلّم السيرفر بتاعك بـ HTTP عادي. والسيرفر بتاعك فيه قاعدة «لو الطلب مش HTTPS حوّله لـ HTTPS». النتيجة: المتصفح بيطلب [[https://shop.example/cart]]، والـ edge بيوصّله للأصل كـ HTTP، والأصل بيقول [[301 Location: https://shop.example/cart]]، والمتصفح بيطلب نفس الـ URL... لحد ما يقول [[ERR_TOO_MANY_REDIRECTS]].

الأصل مش شايف إن العميل كان على HTTPS لأن الـ edge مقالوش. والطريقة المتعارف عليها إن الـ edge يبعت [[X-Forwarded-Proto: https]] (أو [[Forwarded: proto=https]])، والأصل يصدّقه. في Cloudflare نفس المشكلة اسمها وضع «Flexible»، والحل الأصح هناك «Full (strict)»: الـ edge يكلّم الأصل HTTPS. ونفس الشكل بيحصل مع www ومن غير www لما مكانين بيحوّلوا لبعض، ومع صفحة login بتحوّل لنفسها لأن الـ cookie مااتحفظتش.`,
          example: R`curl -skIL --max-redirs 5 https://shop.example/cart | grep -iE '^HTTP|^location'
curl -sSk -o /dev/null -L --max-redirs 5 -w '%{http_code} redirects=%{num_redirects} last=%{url_effective}\n' https://shop.example/cart
docker logs edge-and-origin 2>/dev/null | tail -4
proxy_set_header X-Forwarded-Proto $scheme;
nginx -t && nginx -s reload
curl -sSk -L --max-redirs 5 -w '%{http_code} redirects=%{num_redirects}\n' https://shop.example/cart`,
          lines: [
            R`[[-I]] HEAD بس (الـ headers)، و [[-L]] اتبع التحويلات، و [[--max-redirs 5]] اقف بعد ٥، و [[-k]] اقبل الشهادة self-signed بتاعة المعمل. و [[grep]] بيطلّع سطر الكود وسطر [[Location]] من كل خطوة.`,
            R`نفس الطلب بس بيطبع ملخص في سطر: الكود الأخير، وعدد التحويلات، وآخر URL. و [[-sS]] ساكت بس بيطبع الأخطاء، فهنشوف رسالة curl رقم 47.`,
            R`لوج nginx: كل تحويلة بتطلع سطرين، واحد من الـ edge وواحد من الأصل، والاتنين 301. ده دليل إن الاتنين مشتركين في الـ loop.`,
            R`التصليح في الـ edge (جوه [[location]] اللي فيها [[proxy_pass]]): ابعت للأصل الطلب كان [[http]] ولا [[https]]. [[$scheme]] متغيّر nginx فيه scheme الطلب اللي وصل الـ edge.`,
            R`[[nginx -t]] بيفحص الإعدادات قبل ما يطبّقها، و [[-s reload]] بيطبّقها من غير ما يقطع الاتصالات الشغّالة.`,
            R`نفس فحص السطر التاني: دلوقتي [[200 redirects=0]].`,
          ],
          try: R`ابني المعمل اللي في الشرح (nginx واحد في Docker فيه edge على 443 بشهادة self-signed، وأصل على 8080، وسيرفرين www) في [[~/lab/webcases/loop]]، وشوف الـ loop بـ [[curl]]، وعدّ سطور اللوج، وصلّح، وبعدين جرّب حالة الـ www واقرا الـ Location في كل خطوة.`,
          teach: R`## العَرَض

بعد ما حطينا proxy قدام الموقع (زي Cloudflare) الصفحة مبتفتحش:

~~~text Chrome
This page isn't working
shop.example redirected you too many times.
ERR_TOO_MANY_REDIRECTS
~~~

(من Chrome 156 headless على المعمل: [[Page.navigate]] رجّع [[net::ERR_TOO_MANY_REDIRECTS]].) والمستخدمين بيقولوا «امسحوا الـ cookies» ومبيفرقش.

---

## المعمل

nginx واحد في Docker بيلعب الدورين، عشان الـ loop يبان في لوج واحد:

~~~nginx loop.conf
# edge: زي Cloudflare أو load balancer: بيفك TLS ويكلّم الأصل بـ http
server {
  listen 443 ssl;
  server_name shop.example;
  ssl_certificate /certs/cert.pem;
  ssl_certificate_key /certs/key.pem;
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    # السطر الناقص:
    # proxy_set_header X-Forwarded-Proto $scheme;
  }
}
# الأصل (origin): «لو مش https حوّل لـ https»
server {
  listen 8080;
  server_name shop.example;
  if ($http_x_forwarded_proto != "https") {
    return 301 https://$host$request_uri;
  }
  location / { return 200 "shop home\n"; }
}
# www و من غير www بيحوّلوا لبعض
server {
  listen 80;
  server_name shop.example;
  return 301 http://www.shop.example$request_uri;
}
server {
  listen 80;
  server_name www.shop.example;
  return 301 http://shop.example$request_uri;
}
~~~

~~~bash
mkdir -p ~/lab/webcases/loop && cd ~/lab/webcases/loop
export MSYS_NO_PATHCONV=1      # Git Bash بس
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 2 -subj "/CN=shop.example"
docker run -d --name edge-and-origin -p 18443:443 -p 18081:80 -v "$PWD/loop.conf:/etc/nginx/conf.d/default.conf:ro" -v "$PWD:/certs:ro" nginx:alpine
C="--connect-to shop.example:443:127.0.0.1:18443"
~~~

- [[MSYS_NO_PATHCONV=1]]: على Git Bash بس، عشان [[/CN=...]] و [[/etc/nginx/...]] ميتحوّلوش لمسارات ويندوز (من غيرها [[openssl]] مبيعملش الشهادة، و Docker بيرفض المسار).
- [[$http_x_forwarded_proto]]: nginx بيحوّل أي header لمتغيّر: حروف صغيرة و [[_]] بدل [[-]] وقبله [[http_]].
- [[--connect-to shop.example:443:127.0.0.1:18443]]: لـ curl: «أي اتصال بـ shop.example على 443 وصّله لـ 127.0.0.1:18443». كده الـ URL والـ Host والـ redirects كلهم [[https://shop.example/...]] زي الإنتاج، من غير ما نلمس DNS ولا [[hosts]].

اتجرّب بـ nginx 1.31.6 ([[nginx:alpine]])، و curl 8.23 على ويندوز و curl 8.5 على [[ubuntu:24.04]] (نفس رسالة الخطأ في الاتنين).

---

## ١. فيه loop فعلًا؟ ولمين؟

~~~bash
curl -skIL --max-redirs 5 $C https://shop.example/cart | grep -iE '^HTTP|^location'
~~~

~~~text الناتج
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
HTTP/1.1 301 Moved Permanently
Location: https://shop.example/cart
~~~

الـ [[Location]] هو **نفس** الـ URL اللي طلبناه. ده أوضح شكل: الصفحة بتحوّل لنفسها. يعني اللي بيحوّل شايف الطلب بشكل غير اللي احنا بعتناه (http بدل https).

~~~bash
curl -sSk -o /dev/null -L --max-redirs 5 $C -w '%{http_code} redirects=%{num_redirects} last=%{url_effective}\n' https://shop.example/cart; echo "exit=$?"
~~~

~~~text الناتج
curl: (47) Maximum (5) redirects followed
301 redirects=5 last=https://shop.example/cart
exit=47
~~~

- [[47]] رقم خطأ curl للحالة دي (ثابت في كل النسخ، والكلام بعده ممكن يتغيّر من نسخة لنسخة، فالسكربتات تفحص الرقم).
- [[%{num_redirects}]] و [[%{url_effective}]]: عدد التحويلات وآخر URL، أحسن من قراية كل الـ headers في سكربت.

---

## ٢. مين الاتنين؟ اللوج

~~~text docker logs edge-and-origin | tail -4
127.0.0.1 - - [03/Nov/2026:11:23:45 +0000] "GET /cart HTTP/1.1" 301 169 "-" "curl/8.23.0" "-"
172.17.0.1 - - [03/Nov/2026:11:23:45 +0000] "GET /cart HTTP/1.1" 301 169 "-" "curl/8.23.0" "-"
127.0.0.1 - - [03/Nov/2026:11:23:45 +0000] "GET /cart HTTP/1.1" 301 169 "-" "curl/8.23.0" "-"
172.17.0.1 - - [03/Nov/2026:11:23:45 +0000] "GET /cart HTTP/1.1" 301 169 "-" "curl/8.23.0" "-"
~~~

- [[172.17.0.1]]: الطلب داخل الـ edge من برة (من Docker).
- [[127.0.0.1]]: الطلب داخل الأصل من الـ edge نفسه.
- الاتنين [[301]] في نفس الثانية: الأصل بيرد 301 والـ edge بيوصّله زي ما هو.

والمتصفح: نفس الـ loop من Chrome طلّع **٨٠ سطر** في اللوج في أقل من ثانية (٤٠ طلب، كل واحد سطرين) قبل ما يستسلم. تخيّل ده مع آلاف المستخدمين.

---

## ٣. السبب

| الخطوة | الطلب | اللي حصل |
|---|---|---|
| المتصفح ← الـ edge | [[https://shop.example/cart]] | الـ edge فك TLS |
| الـ edge ← الأصل | [[http://127.0.0.1:8080/cart]] من غير [[X-Forwarded-Proto]] | [[$http_x_forwarded_proto]] فاضي ≠ [[https]] |
| الأصل ← المتصفح | [[301 Location: https://shop.example/cart]] | نفس الـ URL، فنرجع لأول خطوة |

الأصل معندوش طريقة يعرف إن العميل كان على HTTPS غير إن الـ edge يقوله.

---

## ٤. التصليح

~~~bash
sed -i 's|    # proxy_set_header X-Forwarded-Proto \$scheme;|    proxy_set_header X-Forwarded-Proto $scheme;|' loop.conf
docker exec edge-and-origin nginx -t
docker exec edge-and-origin nginx -s reload
curl -sSk -L --max-redirs 5 $C -w '%{http_code} redirects=%{num_redirects}\n' https://shop.example/cart
~~~

~~~text الناتج
nginx: configuration file /etc/nginx/nginx.conf test is successful
shop home
200 redirects=0
~~~

وتأكد إن القاعدة لسه شغّالة للي جاي HTTP فعلًا (الحماية متشالتش):

~~~text curl -sS -o /dev/null -w '%{http_code} -> %{redirect_url}\n' -H 'Host: shop.example' http://127.0.0.1:18081/
301 -> http://www.shop.example/
~~~

(دي على بورت 80، اللي فيه حالة الـ www اللي جاية.)

### نفس المشكلة في التطبيق مش nginx

لو التحويل لـ HTTPS في الكود، التطبيق لازم يصدّق الـ header من الـ proxy (من وثائق كل framework):

| الـ framework | الإعداد |
|---|---|
| Express | [[app.set('trust proxy', 1)]]، وبعدها [[req.secure]] و [[req.protocol]] بيقروا [[X-Forwarded-Proto]] |
| Django | [[SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')]] مع [[SECURE_SSL_REDIRECT]] |
| Laravel | middleware [[TrustProxies]] والـ [[proxies]] |
| WordPress | [[$_SERVER['HTTPS'] = 'on']] لو الـ header [[https]] في [[wp-config.php]]، وإلا [[siteurl]] بـ https بيعمل loop |

وثق في الـ header ده **من الـ proxy بتاعك بس**: لو الأصل مفتوح للدنيا أي حد يقدر يبعته. الأصل يسمع على [[127.0.0.1]] أو شبكة داخلية.

### التصليحات اللي اترفضت

| التصليح | ليه لأ |
|---|---|
| امسح الـ cookies | الـ loop مالوش دعوة بالـ cookies هنا. (بيفرق بس لو الـ loop في صفحة login، تحت) |
| شيل قاعدة التحويل من الأصل | الموقع يفتح، بس اللي يوصل للأصل مباشرة على HTTP مش هيتحوّل |
| Cloudflare: سيبها Flexible وشيل التحويل من السيرفر | الطريق بين Cloudflare والسيرفر بيفضل HTTP مكشوف |
| [[302]] بدل [[301]] | مبيحلش الـ loop، بس **مفيد وانت بتجرّب**: المتصفح بيحفظ الـ 301 وممكن يفضل يحوّل حتى بعد التصليح |

والأصح في Cloudflare تحديدًا (من وثائقهم): «Full (strict)»، والأصل عليه شهادة (حتى Origin Certificate من Cloudflare)، فالـ edge بيكلّمه HTTPS أصلًا.

---

## ٥. حالة تانية: www ومن غير www

~~~text curl -sIL --max-redirs 4 http://shop.example/ (على بورت 80 في المعمل)
HTTP/1.1 301 Moved Permanently
Location: http://www.shop.example/
HTTP/1.1 301 Moved Permanently
Location: http://shop.example/
HTTP/1.1 301 Moved Permanently
Location: http://www.shop.example/
HTTP/1.1 301 Moved Permanently
Location: http://shop.example/
HTTP/1.1 301 Moved Permanently
Location: http://www.shop.example/
~~~

هنا الـ [[Location]] بيتبدّل بين اتنين: كل مكان فاكر الاسم التاني هو الأساسي. بيحصل لما حد يحط التحويل في nginx وحد تاني في إعدادات التطبيق أو الـ CDN. الحل: قرار واحد مكتوب (الاسم الأساسي إيه)، وتحويل في مكان واحد.

### وحالة تالتة: login بيحوّل لنفسه

[[/dashboard]] بيحوّل لـ [[/login]] لو مفيش session، و [[/login]] بعد الدخول بيحوّل لـ [[/dashboard]]. لو الـ cookie اتعملت بـ [[Secure]] والأصل شايف الطلب HTTP (نفس السبب فوق!)، أو الـ [[Domain]] بتاعها غلط، المتصفح مبيبعتهاش، فـ loop. اللي بيفرّقها: [[curl -c jar -b jar -IL]] وتشوف [[Set-Cookie]] في كل خطوة.

---

## ٦. اتأكد ومتتكررش

- بعد أي تغيير في الـ proxy أو الـ CDN أو الدومين: [[curl -sS -o /dev/null -L --max-redirs 3 -w '%{http_code} %{num_redirects}']] على [[http://]] و [[https://]] و [[www]] ومن غيره. المتوقع: [[200]] وتحويلة واحدة على الأكتر.
- حط الفحص ده في الـ smoke test (درس «smoke test» في نفس التاب) وفي المراقبة: رقم خروج 47 = تنبيه.
- التحويل لـ HTTPS في مكان واحد (الـ edge غالبًا)، و HSTS بعد ما تتأكد إن كل حاجة شغّالة.`,
          deep: {
            why: R`أي حاجة بتفك TLS قدام السيرفر (CDN، و load balancer، و Kubernetes ingress، و nginx تاني) بتخلّي الأصل شايف كل الطلبات HTTP جاية من IP واحد. أي قرار في الأصل معتمد على «الطلب ده HTTPS؟» أو «مين العميل؟» هيبقى غلط لحد ما الـ proxy يقوله، والأصل يصدّقه. الـ redirect loop أوضح عرض للمشكلة دي، بس نفس السبب بيبوّظ الـ cookies الـ Secure، والـ URLs اللي التطبيق بيبنيها، والـ rate limiting بالـ IP.`,
            how: R`المتصفح بيتبع التحويلات لوحده لحد ٢٠ (Chrome)، وبعدها بيقف بـ [[ERR_TOO_MANY_REDIRECTS]]، و curl بـ [[--max-redirs]] (الافتراضي مع [[-L]] ٥٠) ورقم خطأ 47. و [[301]] و [[308]] permanent: المتصفح بيحفظهم ويحوّل بعد كده من غير ما يسأل السيرفر. والـ proxy بيبلّغ المعلومة الأصلية بـ headers: [[X-Forwarded-Proto]] و [[X-Forwarded-For]] و [[X-Forwarded-Host]] (أو الـ standard [[Forwarded]])، والتطبيق بيقراهم بس لو قلتله إن الـ proxy موثوق.`,
            when: R`بعد أي تغيير في الطبقة اللي قدام السيرفر: CDN جديد، أو load balancer، أو Docker و Traefik أو Caddy قدام التطبيق، أو تفعيل «Always use HTTPS»، أو نقل لـ www. وأي مرة [[ERR_TOO_MANY_REDIRECTS]] تظهر عند ناس ومش عند ناس (cache الـ 301 في المتصفح).`,
            mistakes: R`تمسح الـ cookies وتفتكرها اتحلّت (المتصفح كان حافظ 301). وتشيل قاعدة الـ HTTPS بدل ما تصلّح الـ header. وتثق في [[X-Forwarded-Proto]] من أي حد والأصل مفتوح. وتحط التحويل في ٣ أماكن (CDN و nginx و التطبيق). وتجرّب بـ [[301]] فالتصليح ميبانش عندك. وتقرا [[curl -L]] من غير [[--max-redirs]] فيستنى ٥٠ تحويلة. وتنسى [[$host]] في الـ [[return 301]] مبيحطش البورت، فتحويلة على بورت غير 443 بتروح للبورت الغلط (حصلت في المعمل الأول: [[Location: https://shop.example/cart]] من بورت 18443).`
          },
          sol: R`قبل: كل خطوة [[301]] و [[Location: https://shop.example/cart]] (نفس الـ URL)، و [[curl: (47) Maximum (5) redirects followed]] و [[301 redirects=5]]، واللوج سطرين لكل تحويلة ([[172.17.0.1]] الـ edge و [[127.0.0.1]] الأصل)، و Chrome [[net::ERR_TOO_MANY_REDIRECTS]] و ٨٠ سطر لوج. بعد [[proxy_set_header X-Forwarded-Proto $scheme;]] و reload: [[shop home]] و [[200 redirects=0]]. وحالة الـ www: [[Location]] بيتبدّل بين [[http://www.shop.example/]] و [[http://shop.example/]].

اتجرّب بـ [[nginx:alpine]] (1.31.6) في Docker على ويندوز، و curl 8.23 و curl 8.5 على [[ubuntu:24.04]]، و Chrome 156 headless. إعدادات Express و Django و Laravel و WordPress و Cloudflare من وثائقهم الرسمية.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الـ ٣ أشكال للـ redirect loop في الدرس؟ ولكل واحد شكل الـ [[Location]] في ناتج [[curl -IL]].`, done: R`كتبت: الأصل مش عارف إنه HTTPS (الـ Location نفس الـ URL)، و www ومن غير www (بيتبدّل بين اتنين)، و login والـ cookie مش راجعة (بين [[/login]] و [[/dashboard]]).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل بعد التصليح، لو غيّرت الأصل لـ [[return 301 https://$host:8443$request_uri;]]، و [[curl -skIL --max-redirs 3 $C https://shop.example/cart]]، هيحصل إيه؟ ولو حد طلب [[http://127.0.0.1:18081/]] بـ [[Host: shop.example]]؟`, done: R`توقعت إن الطلب الأول 200 من غير تحويل (الـ header موجود دلوقتي)، والتاني بيحوّل لـ [[www]] (سيرفر بورت 80)، والنتيجة طابقت، وكتبت ليه [[$host]] مبيحطش البورت.` },
            { lvl: 'تطبيق', t: R`ابني [[redirects.sh <url>]]: يمشي في التحويلات بإيده ([[curl -s -o /dev/null -w '%{http_code} %{redirect_url}']] في لوب)، ويطبع كل خطوة، ويقف ويطبع [[LOOP]] لو URL اتكرر، أو بعد ١٠.`, done: R`على المعمل قبل التصليح بيطبع خطوة واحدة وبعدها [[LOOP: https://shop.example/cart -> https://shop.example/cart]]، وحالة الـ www بيطبع خطوتين و [[LOOP]]، وبعد التصليح [[200 after 0 redirects]].` },
            { lvl: 'تطبيق', t: R`صلّح تطبيق Express ورا nginx فيه: [[app.use((req, res, next) => req.secure ? next() : res.redirect(301, 'https://' + req.headers.host + req.url))]]، و nginx فيه [[proxy_set_header X-Forwarded-Proto $scheme;]] صح، والـ loop لسه موجود. فين المشكلة؟ صلّحها وجرّب لو عندك Node.`, done: R`لقيت إن [[trust proxy]] مش متفعّل فـ [[req.secure]] دايمًا false، وضفت [[app.set('trust proxy', 1)]]، و [[curl -H 'X-Forwarded-Proto: https']] على التطبيق مباشرة بيرجّع 200 ومن غيره 301.` },
            { lvl: 'تحدي', t: R`محاكاة حالة الـ login: سيرفر Node فيه [[/dashboard]] بيحوّل لـ [[/login]] لو مفيش cookie [[sid]]، و [[/login]] بيعمل [[Set-Cookie: sid=1; Secure]] ويحوّل لـ [[/dashboard]]. جرّبه بـ [[curl -c jar -b jar -IL --max-redirs 6]] على [[http://]]، وفسّر، وصلّح.`, done: R`على [[http://]] الـ loop بيظهر لأن curl مبيبعتش cookie [[Secure]] على HTTP (زي المتصفح)، وكتبت ده من ناتج [[Set-Cookie]] في كل خطوة، والتصليح (HTTPS قدامه أو مفيش [[Secure]] في التطوير بس) خلّاه يوصل لـ 200.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه «امسح الـ cookies» ساعات بيبان إنه حل للـ redirect loop وهو مش حل؟ واذكر الـ 301 المحفوظ في المتصفح.`, done: R`الشرح فيه: الـ loop من السيرفر مش من المتصفح في حالة الـ proxy، و مسح بيانات الموقع بيمسح كمان الـ 301 المحفوظ فالتصليح اللي حصل في نفس الوقت يبان كأنه من المسح، والطريقة الصح [[curl]] لأنه مبيحفظش حاجة.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > origin.js <<'EOF'
const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/self') { res.writeHead(301, { Location: 'http://127.0.0.1:38412/self' }); return res.end(); }
  if (req.headers['x-forwarded-proto'] !== 'https') { res.writeHead(301, { Location: 'https://shop.example' + req.url }); return res.end(); }
  res.writeHead(200); res.end('shop home\n');
}).listen(38412, () => console.log('ready'));
EOF
node origin.js > o.log 2>&1 &
PID=$!
for i in 1 2 3 4 5 6 7 8 9 10; do grep -q ready o.log && break; sleep 0.5; done
curl -s -o /dev/null -w 'no header: %{http_code} -> %{redirect_url}\n' http://127.0.0.1:38412/cart
curl -s -H 'X-Forwarded-Proto: https' -w 'with header: %{http_code}\n' http://127.0.0.1:38412/cart
curl -s -o /dev/null -L --max-redirs 3 -w 'loop: redirects=%{num_redirects}\n' http://127.0.0.1:38412/self
echo "curl exit=$?"
kill $PID; wait $PID 2>/dev/null || true`, expect: [R`no header: 301 -> https://shop.example/cart`, R`shop home`, R`with header: 200`, R`loop: redirects=3`, R`curl exit=47`] },
          ],
        },
        {
          cmd: "WebSocket بيفصل",
          title: "الشات شغّال على جهازي، وورا nginx الـ WebSocket بيفشل بـ 426، ولما اتصلّح بقى بيفصل كل دقيقة",
          learn: R`تعرف الـ handshake بتاع WebSocket (طلب HTTP و [[101 Switching Protocols]])، وتثبت بـ [[curl]] واللوج إن الـ proxy شال [[Upgrade]]، وتصلّحه، وتفرق بين فشل الـ handshake والفصل بعد مدة، وتحل الفصل بـ heartbeat.`,
          out: R`[[node client.js ws://127.0.0.1:18082/ws 12]] بيطبع [[open]] و [[message: hello]] و [[12.0s still open, bye]]، ولوج nginx فيه [[101]].`,
          desc: R`WebSocket بيبدأ طلب HTTP عادي فيه [[Upgrade: websocket]] و [[Connection: Upgrade]]، والسيرفر بيرد [[101 Switching Protocols]]، ومن هنا نفس اتصال TCP بيبقى قناة مفتوحة في الاتجاهين. المشكلة إن [[Upgrade]] و [[Connection]] من الـ headers اللي «لخطوة واحدة» (hop-by-hop): الـ proxy مبيعديهمش للـ backend لوحده. فـ nginx بـ [[proxy_pass]] بس بيوصّل للتطبيق [[GET /ws]] عادي، والتطبيق بيرد [[426 Upgrade Required]] أو 400، والمتصفح بيقول [[Error during WebSocket handshake: Unexpected response code: 426]].

ولما تضيف الـ headers، تظهر مشكلة تانية: الاتصال بيتقفل كل ٦٠ ثانية بالظبط لو مفيش رسايل، والكود [[1006]] (اتقفل من غير close frame). ده [[proxy_read_timeout]] بتاع nginx: لو مفيش بايت جه من الـ backend في المدة دي، بيقفل. ونفس الفكرة في Cloudflare (١٠٠ ثانية) و AWS ALB (٦٠ ثانية افتراضي). والحل الصح heartbeat: ping كل مدة أقل من أقصر timeout في الطريق، مش timeout يوم.`,
          example: R`node client.js ws://127.0.0.1:18082/broken/ws 2
docker logs ws-app | tail -2
curl -si --max-time 2 -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" http://127.0.0.1:18082/ws
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
node client.js ws://127.0.0.1:18082/ws 9
docker run -d --name ws-app --network wsnet -e HEARTBEAT_MS=3000 -v "$PWD:/app:ro" -w /app node:22-slim node server.js`,
          lines: [
            R`عميل Node صغير (Node 22+ فيه [[WebSocket]] جاهز) بيفتح الاتصال ويطبع كل حدث بالوقت. على المسار البايظ بيطبع [[error]] و [[close code=1006]] في نفس اللحظة.`,
            R`لوج التطبيق: بيقول إن اللي وصله طلب [[plain]] من غير [[upgrade]]، يعني الـ header اتشال في السكة.`,
            R`الـ handshake بإيدك من غير متصفح: الـ ٤ headers اللي الـ WebSocket محتاجهم. [[--max-time 2]] لأن الاتصال لو نجح بيفضل مفتوح، فـ curl يقف بعد ثانيتين.`,
            R`أول سطر من التصليح: الاتصال بالـ backend بـ HTTP/1.1 (الـ Upgrade مش موجود في HTTP/1.0).`,
            R`ابعت [[Upgrade]] زي ما العميل بعته. [[$http_upgrade]] متغيّر nginx فيه قيمة الـ header ده (فاضي لو الطلب عادي).`,
            R`ابعت [[Connection: upgrade]] لو الطلب WebSocket، و [[close]] لو عادي. [[$connection_upgrade]] جاي من [[map]] بنكتبه في [[http]].`,
            R`نفس العميل ٩ ثواني على المسار الصح والـ timeout ٥ ثواني في المعمل: بيفتح ويستقبل، وبعد ٥ ثواني بالظبط [[close code=1006]].`,
            R`نفس التطبيق بـ heartbeat: بيبعت ping frame كل ٣ ثواني (أقل من الـ ٥)، فـ nginx شايف بايتات جاية والاتصال بيفضل مفتوح.`,
          ],
          try: R`ابني المعمل اللي في الشرح ([[server.js]] من غير مكتبات، و [[client.js]]، و nginx فيه [[/broken/]] و [[/ws]] بـ [[proxy_read_timeout 5s]]) على شبكة Docker. جرّب الـ ٣ حالات، وقبل كل واحدة اكتب: هيطبع إيه وبعد كام ثانية.`,
          teach: R`## العَرَض

شات بسيط شغّال على [[ws://localhost:8080]]. بعد النشر ورا nginx:

~~~text Chrome Console
WebSocket connection to 'ws://shop.example:18082/broken/ws' failed: Error during WebSocket handshake: Unexpected response code: 426
ws close 1006
~~~

(من Chrome 156 headless فعلًا على المعمل.) وبعد ما «اتصلّح»: المستخدمين بيقولوا الشات بيفصل لوحده لو محدش كتب حاجة دقيقة.

---

## المعمل

٣ حاجات على شبكة Docker واحدة. التطبيق من غير أي مكتبة عشان نشوف الـ handshake بعينينا:

~~~javascript server.js
// WebSocket echo من غير مكتبات
const http = require('http'), crypto = require('crypto');
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const HEARTBEAT = Number(process.env.HEARTBEAT_MS || 0);   // 0 = من غير ping
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const frame = (op, buf = Buffer.alloc(0)) => Buffer.concat([Buffer.from([0x80 | op, buf.length]), buf]); // رسايل أقل من 126 بايت
const server = http.createServer((req, res) => {
  log('plain', req.method, req.url, 'HTTP/' + req.httpVersion, 'upgrade=' + (req.headers.upgrade || '-'));
  res.writeHead(req.url === '/ws' ? 426 : 200, { 'Content-Type': 'text/plain' });
  res.end(req.url === '/ws' ? 'Upgrade Required\n' : 'ok\n');
});
server.on('upgrade', (req, sock) => {
  log('upgrade', req.url, 'HTTP/' + req.httpVersion, 'connection=' + req.headers.connection);
  const accept = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + GUID).digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.write(frame(0x1, Buffer.from('hello')));
  const t = HEARTBEAT ? setInterval(() => sock.write(frame(0x9)), HEARTBEAT) : null;  // 0x9 = ping
  sock.on('data', d => {
    const op = d[0] & 0x0f, len = d[1] & 0x7f, mask = d.subarray(2, 6);
    const msg = Buffer.from(d.subarray(6, 6 + len).map((b, i) => b ^ mask[i % 4]));
    if (op === 0x1) sock.write(frame(0x1, Buffer.from('echo:' + msg)));
    if (op === 0x8) sock.end(frame(0x8, msg));
  });
  sock.on('close', () => { clearInterval(t); log('closed', req.url); });
});
server.listen(8080, () => log('ws on 8080 heartbeat=' + HEARTBEAT));
~~~

- Node بيطلّع event [[upgrade]] لما الطلب فيه [[Upgrade:]]، وإلا [[request]] العادي (وده بيرد 426 على [[/ws]]).
- [[Sec-WebSocket-Accept]]: SHA-1 لـ الـ key اللي العميل بعته + GUID ثابت من الـ RFC 6455، بـ base64. ده اللي بيثبت للعميل إن السيرفر فاهم WebSocket.
- العميل لازم «يقنّع» (mask) رسايله بـ ٤ بايت، فبنفكها بـ XOR.

~~~javascript client.js
// client.js <url> [ثواني]
const url = process.argv[2], secs = Number(process.argv[3] || 3), t0 = Date.now();
const at = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const ws = new WebSocket(url);
ws.onopen = () => { console.log(at(), 'open'); ws.send('ping-from-client'); };
ws.onmessage = e => console.log(at(), 'message:', e.data);
ws.onerror = e => console.log(at(), 'error:', e.message || e.type);
ws.onclose = e => { console.log(at(), 'close code=' + e.code, 'reason=' + JSON.stringify(e.reason)); process.exit(0); };
setTimeout(() => { console.log(at(), 'still open, bye'); ws.close(1000); }, secs * 1000);
~~~

~~~nginx nginx.conf
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}
server {
  listen 80;
  # ١) غلط: proxy_pass بس
  location /broken/ {
    proxy_pass http://ws-app:8080/;
  }
  # ٢) صح، بس الـ timeout قصير عشان نشوف الوقوع بسرعة (الافتراضي 60s)
  location /ws {
    proxy_pass http://ws-app:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    proxy_read_timeout 5s;
  }
}
~~~

~~~bash
mkdir -p ~/lab/webcases/ws && cd ~/lab/webcases/ws
export MSYS_NO_PATHCONV=1      # Git Bash بس
docker network create wsnet
docker run -d --name ws-app --network wsnet -v "$PWD:/app:ro" -w /app node:22-slim node server.js
docker run -d --name ws-nginx --network wsnet -p 18082:80 -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" nginx:alpine
~~~

اتجرّب بـ nginx 1.31.6، والتطبيق على Node 22.23 في [[node:22-slim]]، والعميل Node 24 على ويندوز.

### فخ في المعمل نفسه

أول مرة الكونتينر كان اسمه [[gapcase-ws-app]] والـ nginx بيدوّر على [[ws-app]]:

~~~text docker logs ws-nginx
nginx: [emerg] host not found in upstream "ws-app" in /etc/nginx/conf.d/default.conf:9
~~~

nginx بيحل الأسامي **وقت ما يبدأ**، ولو اسم واحد مش موجود مبيقومش خالص. والعميل كان بيطبع [[error]] و [[1006]] على كل المسارات، فكان سهل نفتكر الـ WebSocket هو البايظ. أول فحص: [[docker ps]] (الـ nginx كان [[Exited (1)]]). الحل: نفس الاسم، أو [[--network-alias ws-app]].

---

## ١. المسار البايظ: [[/broken/]]

~~~text node client.js ws://127.0.0.1:18082/broken/ws 2
0.1s error: error
0.1s close code=1006 reason=""
~~~

الـ [[onerror]] في المتصفح و Node مبيقولش السبب (زي CORS: عمدًا). الكونسول بتاع Chrome قال [[Unexpected response code: 426]]. نروح للجانبين:

~~~text docker logs ws-nginx (سطر الطلب)
172.18.0.1 - - [03/Nov/2026:11:25:14 +0000] "GET /broken/ws HTTP/1.1" 426 28 "-" "node" "-"
~~~

~~~text docker logs ws-app
11:25:14 plain GET /ws HTTP/1.1 upgrade=-
~~~

- nginx رجّع 426 اللي جاله من التطبيق.
- التطبيق شاف [[plain]]: طلب عادي و [[upgrade=-]]. يعني العميل بعت [[Upgrade: websocket]] بس nginx مبعتهوش.
- [[HTTP/1.1]]: في nginx 1.31.6 الطلب للـ backend طلع HTTP/1.1 حتى من غير [[proxy_http_version]]. في نسخ nginx الأقدم الافتراضي كان 1.0، فاكتبه صراحة (راجع [[proxy_http_version]] في وثائق نسختك). بس حتى مع 1.1 الـ [[Upgrade]] اتشال: الـ headers دي hop-by-hop والـ proxy مبيعديهاش غير لو قلتله.

### نفس الكلام بـ curl

~~~text curl -si --max-time 2 -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" .../broken/ws
HTTP/1.1 426 Upgrade Required
~~~

~~~text نفس الأمر على /ws
HTTP/1.1 101 Switching Protocols
Server: nginx/1.31.6
Date: Tue, 03 Nov 2026 11:25:33 GMT
Connection: upgrade
Upgrade: websocket
~~~

و curl خرج بـ 28 (timeout) بعد ثانيتين، لأن الاتصال فضل مفتوح: ده المطلوب. الـ key [[dGhlIHNhbXBsZSBub25jZQ==]] هو المثال اللي في RFC 6455، والـ Accept بتاعه دايمًا [[s3pPLMBiTxaQ9kYGzzhZRbK+xOo=]] (الـ CI بتاع الدرس بيتأكد من ده).

---

## ٢. التصليح: الـ ٣ سطور والـ map

اللي في [[location /ws]] فوق:

| السطر | ليه |
|---|---|
| [[proxy_http_version 1.1;]] | الـ Upgrade موجود في HTTP/1.1 بس |
| [[proxy_set_header Upgrade $http_upgrade;]] | يعدّي قيمة الـ header اللي العميل بعتها |
| [[proxy_set_header Connection $connection_upgrade;]] | [[upgrade]] لطلبات WebSocket، و [[close]] للعادي |
| [[map $http_upgrade $connection_upgrade]] (في [[http]] برة [[server]]) | عشان مانبعتش [[Connection: upgrade]] لطلب عادي، فيفضل الـ keepalive للـ backend سليم |

~~~text node client.js ws://127.0.0.1:18082/ws 2
0.0s open
0.0s message: hello
0.0s message: echo:ping-from-client
2.0s still open, bye
2.0s close code=1000 reason=""
~~~

و nginx سجّل [[101]]. و [[1000]] = اتقفل عادي من العميل.

---

## ٣. المشكلة التانية: بيفصل لوحده

~~~text node client.js ws://127.0.0.1:18082/ws 9
0.0s open
0.0s message: hello
0.0s message: echo:ping-from-client
5.0s error: error
5.0s close code=1006 reason=""
~~~

- بالظبط بعد [[5.0s]] = [[proxy_read_timeout 5s]]. في الإنتاج بالافتراضي: ٦٠ ثانية. **الرقم الثابت هو الدليل**: لو الفصل بيحصل كل ٦٠ ثانية بالظبط (أو ١٠٠ مع Cloudflare)، دي timeout في الطريق مش bug في الكود.
- [[1006]]: اتقفل من غير close frame (الـ proxy قطع TCP).
- ولوج الـ error بتاع nginx: **ولا سطر**. nginx شايف إن ده انتهاء طبيعي لاتصال هادي، مش خطأ.

### الحل: heartbeat

~~~bash
docker rm -f ws-app
docker run -d --name ws-app --network wsnet -e HEARTBEAT_MS=3000 -v "$PWD:/app:ro" -w /app node:22-slim node server.js
node client.js ws://127.0.0.1:18082/ws 12
~~~

~~~text الناتج
0.0s open
0.0s message: hello
0.0s message: echo:ping-from-client
12.0s still open, bye
12.0s close code=1000 reason=""
~~~

١٢ ثانية مع timeout ٥: السيرفر بيبعت ping frame (opcode 9) كل ٣ ثواني، فـ nginx بيشوف بايتات و timer الـ ٥ ثواني بيبدأ من الأول. المتصفحات و Node بيردوا على الـ ping بـ pong لوحدهم من غير ما الكود يعمل حاجة. وفي مكتبة [[ws]] أو Socket.IO الـ heartbeat موجود (Socket.IO بيبعته كل ٢٥ ثانية افتراضي، من وثائقهم).

### التصليحات اللي اترفضت

| التصليح | ليه لأ |
|---|---|
| [[proxy_read_timeout 86400s;]] بس | nginx بيستحمل، بس Cloudflare (١٠٠ ثانية) والـ load balancer والـ NAT في شبكة المستخدم بيقطعوا برضه. والاتصالات الميتة (موبايل فقد الشبكة) بتفضل محجوزة يوم |
| reconnect في العميل بس | لازم يبقى موجود، بس لوحده بيخبّي المشكلة: المستخدم بيفقد رسايل كل دقيقة |
| ترجع لـ long polling | بيشتغل، بس أتقل على السيرفر، ومش هو المشكلة |

والأصح: heartbeat كل ٢٠–٣٠ ثانية (أقل من أقصر timeout في الطريق)، و timeout معقول في nginx (مثلًا [[3600s]])، و reconnect بـ backoff في العميل.

---

## ٤. اتأكد ومتتكررش

- بعد أي deploy: [[curl]] بالـ ٤ headers ويتوقع [[101]] (فحص CI في الدرس بيعمل ده على سيرفر Node).
- في المراقبة: عدد الـ [[101]] في لوج nginx، وطول الاتصالات (لو كلها حوالي ٦٠ ثانية = timeout).
- لو فيه أكتر من instance للتطبيق: Socket.IO مع polling محتاج sticky sessions، وإلا [[Session ID unknown]] (من وثائق Socket.IO). و WebSocket خالص مش محتاجها بس الرسايل بين المستخدمين على instances مختلفة محتاجة Redis أو حاجة شبهه.
- و [[wss://]] ورا TLS: نفس الإعدادات في الـ [[server]] اللي فيه [[ssl]]، والصفحة HTTPS لازم تستخدم [[wss://]] (وإلا Mixed Content، درس «CORS و mixed content»).`,
          deep: {
            why: R`WebSocket هو الطريقة القياسية للـ realtime (شات، وإشعارات، وأسعار، ولعب). وبيعدّي على نفس البنية اللي اتعملت لطلبات HTTP قصيرة: proxies و load balancers و CDNs بيقفلوا أي اتصال ساكت عشان يوفّروا موارد. فلازم تعرف الـ handshake عشان تصلّح الـ proxy، والـ timeouts عشان الاتصال يعيش.`,
            how: R`العميل بيبعت [[GET]] فيه [[Upgrade: websocket]] و [[Connection: Upgrade]] و [[Sec-WebSocket-Key]] (عشوائي base64) و [[Sec-WebSocket-Version: 13]]. السيرفر بيرد [[101]] و [[Sec-WebSocket-Accept]] = base64(SHA-1(key + GUID)). بعدها نفس الـ socket بيشيل frames: كل frame أول بايت فيه FIN و opcode ([[1]] نص، و [[2]] binary، و [[8]] close، و [[9]] ping، و [[10]] pong)، وتاني بايت الطول وبت الـ mask (لازم من العميل). و nginx في الوضع ده بيبقى نفق: بينقل البايتات في الاتجاهين، و [[proxy_read_timeout]] بيتحسب بين أي قراءتين من الـ backend، و [[proxy_send_timeout]] بين أي كتابتين ليه.`,
            when: R`أي تطبيق فيه WebSocket أو Socket.IO أو SSE أو Vite HMR ورا proxy (nginx، و Traefik، و Caddy، و Cloudflare، و ALB). وأي شكوى «بيفصل كل شوية»: أول سؤال «كل كام ثانية بالظبط؟».`,
            mistakes: R`[[proxy_pass]] بس وتفتكر nginx هيعدّي كل حاجة. و [[Connection: upgrade]] ثابت لكل الطلبات بدل الـ [[map]]. وتصلّح الفصل بـ timeout يوم. وتنسى الـ heartbeat في السيرفر وتعتمد على العميل. وتقرا [[onerror]] وتدوّر على السبب في الكود (مفيش سبب هناك: الكونسول واللوج). وتجرّب على [[localhost]] من غير الـ proxy فكل حاجة تشتغل. واسم الـ upstream غلط فـ nginx مبيقومش وكل المسارات تفشل بنفس الشكل.`
          },
          sol: R`[[/broken/ws]]: العميل [[error]] و [[close code=1006]]، و nginx [[426]]، والتطبيق [[plain GET /ws HTTP/1.1 upgrade=-]]، و Chrome [[Error during WebSocket handshake: Unexpected response code: 426]]. [[/ws]]: [[open]] و [[message: hello]] و [[echo:ping-from-client]] و nginx [[101]]، و curl [[HTTP/1.1 101 Switching Protocols]]. ٩ ثواني من غير heartbeat: [[5.0s close code=1006]] ومفيش سطر في error log. مع [[HEARTBEAT_MS=3000]]: [[12.0s still open, bye]].

اتجرّب بـ [[nginx:alpine]] (1.31.6) و [[node:22-slim]] (22.23) في Docker، والعميل Node 24 على ويندوز، و Chrome 156 headless. أرقام Cloudflare و ALB و Socket.IO من وثائقهم.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الـ ٤ headers في طلب الـ handshake؟ والسيرفر بيرد بأنهي كود و header؟ وإيه معنى الكود [[1006]] و [[1000]]؟`, done: R`كتبت [[Upgrade]] و [[Connection]] و [[Sec-WebSocket-Key]] و [[Sec-WebSocket-Version: 13]]، و [[101]] و [[Sec-WebSocket-Accept]]، و [[1006]] اتقفل من غير close frame، و [[1000]] قفلة عادية.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، شيل [[proxy_set_header Connection $connection_upgrade;]] بس من [[/ws]] وسيب الباقي. [[curl]] بالـ ٤ headers هيرجّع إيه؟ والعميل؟ ولوج التطبيق؟ جرّب.`, done: R`كتبت توقعك (التطبيق مش هيشوف [[Connection: upgrade]] فهيعتبره طلب عادي و 426)، والنتيجة طابقت أو كتبت الفرق وسببه من سطر لوج التطبيق.` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب function [[acceptKey(key)]] في Node بتحسب [[Sec-WebSocket-Accept]]، واختبرها على مثال الـ RFC ([[dGhlIHNhbXBsZSBub25jZQ==]] لازم يطلع [[s3pPLMBiTxaQ9kYGzzhZRbK+xOo=]]) وعلى key عشوائي من [[crypto.randomBytes(16)]] مقارنة برد السيرفر الحقيقي.`, done: R`الـ function بترجّع [[s3pPLMBiTxaQ9kYGzzhZRbK+xOo=]] لمثال الـ RFC، وللـ key العشوائي نفس القيمة اللي في [[Sec-WebSocket-Accept]] من [[curl -si]] على المعمل.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: شغّل العميل ٣٠ ثانية في ٣ حالات: من غير heartbeat و timeout 5s، و heartbeat كل 3s، و heartbeat كل 7s. سجّل لكل حالة اتقفل إمتى وبأنهي كود.`, done: R`جدول فيه: ٥ ثواني و 1006، و ٣٠ ثانية و 1000، و ٥ ثواني و 1006 (الـ ping بعد الـ timeout)، وجملة: الـ heartbeat لازم يبقى أقل من أقصر timeout في الطريق.` },
            { lvl: 'تحدي', t: R`ابني [[ws-probe.js <url> <seconds>]]: يطبع وقت الـ handshake، ويبعت رسالة ويقيس وقت الرد، ويفضل مفتوح، ويطبع [[PASS]] لو فضل مفتوح للمدة و [[FAIL closed after Xs code=N]] لو لأ، ورقم خروج مختلف لكل حالة (handshake فشل، اتقفل بدري، تمام).`, done: R`على المعمل: [[/broken/ws]] رقم خروج للـ handshake، و [[/ws 9]] بيطبع [[FAIL closed after 5.0s code=1006]]، ومع الـ heartbeat [[PASS]] و ٠.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: المستخدمين بيقولوا الشات بيفصل «ساعات». إزاي تعرف من اللوج والأرقام إنها timeout في الـ proxy مش bug في الكود، وإيه الحل اللي هتختاره وليه؟`, done: R`الشرح فيه: مدة الاتصالات في اللوج بتتجمع عند رقم ثابت (٦٠ أو ١٠٠)، والكود 1006، ومفيش error في nginx، والحل heartbeat أقل من أقصر timeout مع reconnect، مش timeout كبير بس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > server.js <<'EOF'
const http = require('http'), crypto = require('crypto');
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const s = http.createServer((req, res) => { res.writeHead(426); res.end('Upgrade Required\n'); });
s.on('upgrade', (req, sock) => {
  const a = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + GUID).digest('base64');
  sock.end('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + a + '\r\n\r\n');
});
s.listen(38413, () => console.log('ready'));
EOF
node server.js > s.log 2>&1 &
PID=$!
for i in 1 2 3 4 5 6 7 8 9 10; do grep -q ready s.log && break; sleep 0.5; done
echo "plain: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:38413/ws)"
curl -si --max-time 3 -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" http://127.0.0.1:38413/ws | tr -d '\r' | grep -E '^HTTP|^Sec-WebSocket-Accept'
kill $PID; wait $PID 2>/dev/null || true`, expect: [R`plain: 426`, R`101 Switching Protocols`, R`Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`] },
          ],
        },
        {
          cmd: "slow query و TIME_WAIT",
          title: "صفحة الطلبات بطيئة تحت الضغط، والسيرفر بيرمي Cannot assign requested address: slow query و TIME_WAIT",
          learn: R`تمسك الاستعلام البطيء من اللوج و [[pg_stat_statements]]، وتقرا [[EXPLAIN ANALYZE]]، وتصلّحه بـ index وتقيس قبل وبعد بـ [[pgbench]]. وتفهم TIME_WAIT: مين بيشيله وليه، وإزاي اتصال جديد لكل طلب بيبطّأ ويخلّص البورتات، والحل الصح (pool و keep-alive).`,
          out: R`[[pgbench]] على نفس الاستعلام: [[latency average = 201.490 ms]] و [[tps = 39.7]] قبل الـ index، و [[latency average = 0.309 ms]] و [[tps = 25852.9]] بعده.`,
          desc: R`الصفحة كانت بتفتح في ثانية، ومع الزحمة بقت ٥ ثواني، وبعدين اللوج بقى فيه [[connect EADDRNOTAVAIL]] أو [[Cannot assign requested address]]. فيه هنا مشكلتين بيتلبسوا في بعض:

**الاستعلام البطيء**: [[SELECT ... WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 20]] على جدول ٣ مليون صف من غير index مناسب. لوحده ٥٨ مللي (مش باين)، بس تحت ضغط ٨ اتصالات مع بعض متوسطه بقى ٢٠١ مللي و ٤٠ طلب في الثانية بس. ومسكه بييجي من ٣ أماكن: [[log_min_duration_statement]] (كل استعلام أبطأ من حد بيتكتب في اللوج)، و [[pg_stat_statements]] (مجموع الوقت لكل شكل استعلام)، و [[EXPLAIN (ANALYZE, BUFFERS)]] (الخطة الفعلية: [[Parallel Seq Scan]] و [[Rows Removed by Filter: 999992]]). والحل index على [[(customer_id, created_at DESC)]] بـ [[CONCURRENTLY]] عشان الجدول ميتقفلش.

**TIME_WAIT**: لما اتصال TCP يتقفل، الطرف اللي قفل **الأول** بيفضل شايل الاتصال في حالة TIME_WAIT حوالي ٦٠ ثانية على لينكس. لو التطبيق بيفتح اتصال جديد بالداتابيز (أو بأي API) مع كل طلب ويقفله، الآلاف دول بيتراكموا، وكل واحد حاجز بورت محلي من حوالي ٢٨ ألف. في المعمل: [[pgbench -C]] (اتصال جديد لكل transaction) عمل ٣١٧٥ TIME_WAIT في ٥ ثواني ونزل من ٣٧٩٤٦ لـ ٦٣٦ طلب في الثانية. ولما البورتات خلصت: [[EADDRNOTAVAIL]]. والحل connection pool أو keep-alive، مش لعب في إعدادات الكيرنل.`,
          example: R`docker logs shop-db 2>&1 | grep 'duration:' | tail -2
psql -c "SELECT calls, round(mean_exec_time::numeric,1) AS mean_ms, round(total_exec_time::numeric) AS total_ms, left(query, 60) AS query FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 3;"
psql -c "EXPLAIN (ANALYZE, BUFFERS) SELECT id, total FROM orders WHERE customer_id = 4242 ORDER BY created_at DESC LIMIT 20;"
psql -c "CREATE INDEX CONCURRENTLY orders_customer_created_idx ON orders (customer_id, created_at DESC);"
pgbench -n -c 8 -j 4 -T 10 -f q.sql shop
pgbench -h 127.0.0.1 -n -c 4 -j 2 -T 5 -C -f one.sql shop
ss -tan state time-wait | tail -n +2 | wc -l`,
          lines: [
            R`لوج Postgres: كل استعلام خد أكتر من [[log_min_duration_statement]] بيتكتب بمدته ونصه. ده أول مكان يقولك «فيه حاجة بطيئة، وهي دي».`,
            R`[[pg_stat_statements]] بيجمّع كل استعلام بنفس الشكل (القيم بتبقى [[$1]]) ويحسب عدد المرات والمتوسط والمجموع. الترتيب بالمجموع: استعلام ٢٠٠ مللي بيتنفذ ٤٠٠ مرة أخطر من واحد ٥ ثواني مرة في اليوم.`,
            R`بينفّذ الاستعلام فعلًا ويطبع الخطة الحقيقية: نوع القراية، والوقت لكل خطوة، وعدد الصفوف اللي اترمت، و [[BUFFERS]] كام صفحة اتقرت من الذاكرة ([[hit]]) ومن الديسك ([[read]]).`,
            R`index على العمودين بنفس ترتيب الـ [[WHERE]] والـ [[ORDER BY]]. [[CONCURRENTLY]] بيبنيه من غير ما يقفل الكتابة على الجدول (أبطأ، ومينفعش جوه transaction).`,
            R`أداة ضغط بتيجي مع Postgres: [[-c 8]] اتصالات مع بعض، و [[-j 4]] threads، و [[-T 10]] ثواني، و [[-f]] ملف فيه الاستعلام، و [[-n]] متعملش vacuum للجداول بتاعتها. بتطبع [[latency average]] و [[tps]].`,
            R`نفس الأداة بـ [[-C]]: اتصال جديد لكل transaction، زي تطبيق مفيهوش pool. [[-h 127.0.0.1]] عشان يبقى TCP مش unix socket.`,
            R`بيعد الاتصالات اللي في TIME_WAIT دلوقتي ([[tail -n +2]] بيشيل سطر العناوين). على السيرفر بتاعك ده رقم تراقبه.`,
          ],
          try: R`ابني المعمل اللي في الشرح ([[postgres:16-alpine]] بـ ٣ مليون طلب و [[pg_stat_statements]])، وقيس بـ [[pgbench]] قبل وبعد الـ index. وبعدين قارن [[pgbench]] بـ [[-C]] ومن غيره وعدّ الـ TIME_WAIT. ولو عندك Docker: جرّب [[tw.js]] بـ [[--sysctl net.ipv4.ip_local_port_range="40000 40009"]] واقرا الخطأ.`,
          teach: R`## العَرَض

- صفحة «طلباتي» بتفتح في ثانية الصبح، و ٥ ثواني بالليل.
- مع حملة إعلانية: اللوج فيه [[connect EADDRNOTAVAIL]] والطلبات بتفشل.
- [[top]] على السيرفر: Postgres واكل المعالج.

---

## المعمل

اتجرّب على [[postgres:16-alpine]] (PostgreSQL 16.13) في Docker، والـ TIME_WAIT على [[ubuntu:24.04]] ([[ss]] من iproute2 6.1) و [[node:22-slim]]:

~~~bash
docker run -d --name shop-db -e POSTGRES_PASSWORD=labpass -e POSTGRES_DB=shop postgres:16-alpine \
  -c log_min_duration_statement=200 -c shared_preload_libraries=pg_stat_statements
docker exec shop-db psql -U postgres -d shop -c "
CREATE EXTENSION pg_stat_statements;
CREATE TABLE orders (id bigserial PRIMARY KEY, customer_id int NOT NULL, status text NOT NULL,
  total numeric(10,2) NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
INSERT INTO orders (customer_id, status, total, created_at)
  SELECT (random()*100000)::int, (ARRAY['new','paid','shipped'])[1+(random()*2)::int],
         round((random()*500)::numeric,2), now() - (random()*365)*interval '1 day'
  FROM generate_series(1,3000000);
ANALYZE orders;"
~~~

- [[-c log_min_duration_statement=200]]: اكتب في اللوج أي استعلام أبطأ من ٢٠٠ مللي.
- [[shared_preload_libraries=pg_stat_statements]]: الإضافة دي لازم تتحمّل وقت تشغيل السيرفر (مش بـ [[CREATE EXTENSION]] بس).
- ٣ مليون طلب لـ ١٠٠ ألف عميل = حوالي ٣٠ طلب لكل عميل. الجدول 243MB.

وفي الأوامر اللي جاية [[psql]] معناها [[docker exec shop-db psql -U postgres -d shop]].

---

## ١. مين البطيء؟ اللوج و [[pg_stat_statements]]

الاستعلام لوحده:

~~~text EXPLAIN ANALYZE (أول مرة)
Execution Time: 58.310 ms
~~~

٥٨ مللي، مش هيظهر في لوج حده ٢٠٠. بس تحت ضغط ٨ مستخدمين مع بعض:

~~~bash
echo '\set c random(1, 100000)
SELECT id, total FROM orders WHERE customer_id = :c ORDER BY created_at DESC LIMIT 20;' > q.sql
pgbench -U postgres -n -c 8 -j 4 -T 10 -f q.sql shop
~~~

~~~text الناتج
number of transactions actually processed: 402
latency average = 201.490 ms
tps = 39.704276 (without initial connection time)
~~~

~~~text docker logs shop-db | grep 'duration:' | tail -2
2026-11-03 11:27:53.654 UTC [154] LOG:  duration: 246.481 ms  statement: SELECT id, total FROM orders WHERE customer_id = 10708 ORDER BY created_at DESC LIMIT 20;
2026-11-03 11:27:53.658 UTC [158] LOG:  duration: 214.979 ms  statement: SELECT id, total FROM orders WHERE customer_id = 17313 ORDER BY created_at DESC LIMIT 20;
~~~

- [[\set c random(1, 100000)]]: [[pgbench]] بيختار عميل عشوائي كل مرة، زي الحقيقة.
- الاستعلام نفسه بقى ٤ مرات أبطأ لما ٨ بيعملوه مع بعض: كلهم بيقروا ٣ مليون صف ويتخانقوا على المعالج والديسك. ده ليه «بطيء بالليل بس».
- [[154]] اللي بين الأقواس رقم الـ process: كل اتصال في Postgres ليه process.

~~~text pg_stat_statements
 calls | mean_ms | total_ms |                            query
-------+---------+----------+--------------------------------------------------------------
   405 |   198.8 |    80494 | SELECT id, total FROM orders WHERE customer_id = $1 ORDER BY
     1 |    59.1 |       59 | EXPLAIN (ANALYZE, BUFFERS) SELECT id, total FROM orders WHER
     1 |     9.6 |       10 | ALTER SYSTEM SET log_min_duration_statement = '30ms'
~~~

[[$1]] مكان الرقم: كل العملاء = سطر واحد. ٨٠ ثانية من وقت الداتابيز في ١٠ ثواني ضغط راحوا على الاستعلام ده.

### فخ: [[ALTER SYSTEM]] مااشتغلش

حاولنا نخلّي الحد ٣٠ مللي من غير restart:

~~~bash
psql -c "ALTER SYSTEM SET log_min_duration_statement = '30ms';" -c "SELECT pg_reload_conf();"
psql -c "SELECT name, setting, source FROM pg_settings WHERE name='log_min_duration_statement';"
~~~

~~~text الناتج
            name            | setting |    source
----------------------------+---------+--------------
 log_min_duration_statement | 200     | command line
~~~

لسه ٢٠٠! [[source = command line]]: القيمة جاية من [[-c]] وقت التشغيل، ودي أعلى أولوية من [[postgresql.auto.conf]] اللي [[ALTER SYSTEM]] بيكتب فيه. فالـ reload نجح والقيمة متغيّرتش ومحدش قال. أول ما إعداد «مش بيتطبّق»: [[pg_settings.source]].

---

## ٢. ليه بطيء؟ [[EXPLAIN (ANALYZE, BUFFERS)]]

~~~text الناتج (قبل الـ index)
 Limit  (cost=39477.26..39479.60 rows=20 width=22) (actual time=53.177..58.210 rows=20 loops=1)
   Buffers: shared hit=12286 read=10640 written=39
   ->  Gather Merge  (cost=39477.26..39480.30 rows=26 width=22) (actual time=53.175..58.205 rows=20 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Sort  (cost=38477.24..38477.27 rows=13 width=22) (actual time=50.175..50.177 rows=8 loops=3)
               Sort Key: created_at DESC
               Sort Method: quicksort  Memory: 25kB
               ->  Parallel Seq Scan on orders  (cost=0.00..38477.00 rows=13 width=22) (actual time=8.746..49.992 rows=8 loops=3)
                     Filter: (customer_id = 4242)
                     Rows Removed by Filter: 999992
 Execution Time: 58.310 ms
~~~

اقراها من تحت لفوق (أعمق سطر بيتنفذ الأول):

| السطر | معناه هنا |
|---|---|
| [[Parallel Seq Scan on orders]] | قرا الجدول كله، مقسوم على ٣ (اتنين workers والـ process الأساسي: [[loops=3]]) |
| [[Rows Removed by Filter: 999992]] | لكل واحد من التلاتة: رمى حوالي مليون صف عشان يلاقي ٨. يعني قرا ٣ مليون عشان ٢٤ |
| [[Buffers: shared hit=12286 read=10640]] | ٢٢٩٢٦ صفحة (8KB) = حوالي 180MB اتقروا، منهم ١٠٦٤٠ من الديسك |
| [[Sort ... quicksort Memory: 25kB]] | الترتيب نفسه رخيص (صفوف قليلة) |
| [[actual time=53.177..58.210]] | أول صف بعد ٥٣ مللي، والكل بعد ٥٨ |
| [[cost=...]] | تقدير الـ planner بوحدات نسبية، مش مللي. قارنه بالـ [[actual]] |

المشكلة واضحة: مفيش طريقة يلاقي طلبات عميل غير إنه يقرا كل حاجة.

---

## ٣. التصليح: index بالترتيب الصح

~~~bash
time psql -c "CREATE INDEX CONCURRENTLY orders_customer_created_idx ON orders (customer_id, created_at DESC);"
~~~

~~~text الناتج
real	0m2.286s
~~~

~~~text EXPLAIN (ANALYZE, BUFFERS) بعد
 Limit  (cost=0.43..83.36 rows=20 width=22) (actual time=0.044..0.150 rows=20 loops=1)
   Buffers: shared hit=6 read=17
   ->  Index Scan using orders_customer_created_idx on orders  (cost=0.43..128.97 rows=31 width=22) (actual time=0.043..0.147 rows=20 loops=1)
         Index Cond: (customer_id = 4242)
         Buffers: shared hit=6 read=17
 Execution Time: 0.207 ms
~~~

- [[Index Scan]] و [[Index Cond]]: راح للعميل ده على طول. ومفيش [[Sort]]: الـ index مترتب بـ [[created_at DESC]] جوه كل عميل، فأول ٢٠ هما المطلوبين.
- ٢٣ صفحة بدل ٢٢٩٢٦، و ٠.٢ مللي بدل ٥٨.

~~~text pgbench بعد (نفس الأمر)
number of transactions actually processed: 258371
latency average = 0.309 ms
tps = 25852.960791 (without initial connection time)
~~~

من ٤٠ لـ ٢٥٨٥٣ طلب في الثانية على نفس الجهاز. والتمن: الـ index حجمه [[90 MB]] ([[pg_relation_size]])، وكل [[INSERT]] بقى بيكتب فيه كمان.

### ليه [[CONCURRENTLY]]؟

[[CREATE INDEX]] العادي بيقفل الكتابة على الجدول لحد ما يخلص (هنا ثانيتين، وعلى جدول حقيقي ممكن دقايق: كل الطلبات الجديدة واقفة). [[CONCURRENTLY]] بيبنيه على مرحلتين من غير قفل الكتابة. ولو فشل في النص بيسيب index بحالة [[INVALID]] لازم تمسحه ([[DROP INDEX CONCURRENTLY]]) وتعيد. ومينفعش جوه transaction، فأدوات الـ migrations محتاجة إعداد خاص له (تفاصيل في تاب Postgres وتاب الداتا).

### التصليحات اللي اترفضت

| التصليح | ليه لأ |
|---|---|
| سيرفر أكبر | ٨ اتصالات قروا ١٨٠MB لكل طلب؛ ضعف المعالج = ضعف الـ tps تقريبًا، مش ٦٠٠ ضعف |
| cache في التطبيق (Redis) | بيخبّي المشكلة لحد ما الـ cache يفضى؛ وكل عميل ليه بياناته فالـ hit rate ضعيف |
| index على [[customer_id]] بس | بيلاقي العميل، بس بيرتب بعدين (لو العميل عنده آلاف الطلبات ده Sort تقيل) |
| [[SET enable_seqscan = off]] | بيجبر الـ planner بس مبيعملش index؛ وده للتجربة مش للإنتاج |

---

## ٤. المشكلة التانية: اتصال جديد لكل طلب

~~~bash
echo "SELECT 1;" > one.sql
pgbench -h 127.0.0.1 -U postgres -n -c 4 -j 2 -T 5 -f one.sql shop
netstat -tan | grep -c TIME_WAIT
pgbench -h 127.0.0.1 -U postgres -n -c 4 -j 2 -T 5 -C -f one.sql shop
netstat -tan | grep -c TIME_WAIT
~~~

~~~text الناتج
latency average = 0.105 ms
tps = 37946.388348 (without initial connection time)
1
latency average = 6.283 ms
average connection time = 3.093 ms
tps = 636.664223 (including reconnection times)
3175
~~~

- نفس الـ [[SELECT 1]]: ٣٧٩٤٦ في الثانية باتصالات ثابتة، و ٦٣٦ بـ اتصال لكل طلب. **٦٠ مرة أبطأ**، والاستعلام نفسه مش هو السبب: فتح الاتصال ([[3.093 ms]]: TCP و الـ auth، وفي Postgres كمان process جديد) هو اللي واكل الوقت.
- ٣١٧٥ اتصال في TIME_WAIT بعد ٥ ثواني بس.
- (جوه [[postgres:16-alpine]] مفيش [[ss]]، فاستخدمنا [[netstat]] بتاع busybox.)

~~~text netstat -tan | grep TIME_WAIT | head -3
tcp        0      0 127.0.0.1:32770         127.0.0.1:5432          TIME_WAIT
tcp        0      0 127.0.0.1:32772         127.0.0.1:5432          TIME_WAIT
tcp        0      0 127.0.0.1:32778         127.0.0.1:5432          TIME_WAIT
~~~

العنوان المحلي بورت عشوائي ([[32770]]) والبعيد [[5432]]: يعني اللي شايل الـ TIME_WAIT هو **العميل** (pgbench = تطبيقك)، لأنه هو اللي قفل الأول.

---

## ٥. TIME_WAIT: إيه ده ومين بيشيله

لما اتصال TCP يتقفل، الطرف اللي بعت [[FIN]] الأول بيستنى ضعف أقصى عمر للـ packet (على لينكس ثابت ٦٠ ثانية) قبل ما ينسى الاتصال، عشان أي packet متأخر من الاتصال القديم ميدخلش في اتصال جديد بنفس الأرقام. ده طبيعي ومش bug.

### [[ss]] على Ubuntu

~~~bash
python3 -m http.server 8000 &
for i in $(seq 200); do curl -s -o /dev/null http://127.0.0.1:8000/; done
ss -tan state time-wait | head -4
ss -tan state time-wait '( sport = :8000 )' | tail -n +2 | wc -l
ss -tano state time-wait | sed -n 2p
cat /proc/sys/net/ipv4/ip_local_port_range
~~~

~~~text الناتج
Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
0      0          127.0.0.1:8000     127.0.0.1:47594
0      0          127.0.0.1:8000     127.0.0.1:47350
0      0          127.0.0.1:8000     127.0.0.1:48822
200
0      0          127.0.0.1:8000     127.0.0.1:47594 timer:(timewait,58sec,0)
32768	60999
~~~

- هنا العكس: الـ TIME_WAIT على **السيرفر** ([[Local 127.0.0.1:8000]])، لأن [[http.server]] بتاع Python بيقفل الاتصال بعد كل رد (HTTP/1.0)، فهو اللي قفل الأول.
- [[state time-wait]]: فلتر الحالة، و [[( sport = :8000 )]] فلتر بالبورت المحلي، و [[dport]] للبعيد.
- [[-o]] بيطبع الـ timer: فاضل [[58sec]].
- [[ip_local_port_range]]: البورتات اللي العميل بياخد منها: ٢٨٢٣٢ بورت. على وجهة واحدة (IP وبورت) ده أقصى عدد اتصالات مفتوحة أو في TIME_WAIT مع بعض. يعني حوالي ٤٧٠ اتصال جديد في الثانية لوجهة واحدة لمدة دقيقة وتخلص.

### لما البورتات تخلص

جربناها بمدى صغير عشان تبان في ثانية ([[--sysctl]] بيغيّر الإعداد جوه الكونتينر بس):

~~~javascript tw.js
// 30 طلب على 127.0.0.1:8080: اتصال جديد لكل طلب والعميل بيقفل الأول، أو اتصال واحد (keepalive)
const net = require('net'), fs = require('fs');
const tw = () => ['/proc/net/tcp', '/proc/net/tcp6'].map(f => fs.readFileSync(f, 'utf8')).join('\n')
  .split('\n').filter(l => l.trim().split(/\s+/)[3] === '06').length;          // 06 = TIME_WAIT
net.createServer(s => s.on('data', () => s.write('ok\n'))).listen(8080, async () => {
  const keep = process.argv[2] === 'keepalive';
  let shared;
  for (let i = 1; i <= 30; i++) {
    try {
      await new Promise((ok, fail) => {
        const c = keep && shared ? shared : net.connect(8080, '127.0.0.1');
        if (keep) shared = c;
        c.once('error', fail);
        c.once('data', () => { c.off('error', fail); if (!keep) c.end(); ok(); });
        c.write('GET\n');
      });
    } catch (e) { console.log('request ' + i + ': ' + e.code + ' ' + e.message); console.log('TIME_WAIT:', tw()); process.exit(1); }
  }
  await new Promise(r => setTimeout(r, 200));
  console.log('30 requests ok (' + (keep ? 'one connection' : 'new connection each') + '), TIME_WAIT: ' + tw());
  process.exit(0);
});
~~~

~~~bash
docker run --rm --sysctl "net.ipv4.ip_local_port_range=40000 40009" --sysctl net.ipv4.tcp_tw_reuse=0 -v "$PWD:/app:ro" node:22-slim node /app/tw.js
docker run --rm --sysctl "net.ipv4.ip_local_port_range=40000 40009" --sysctl net.ipv4.tcp_tw_reuse=0 -v "$PWD:/app:ro" node:22-slim node /app/tw.js keepalive
docker run --rm --sysctl "net.ipv4.ip_local_port_range=40000 40009" -v "$PWD:/app:ro" node:22-slim node /app/tw.js
docker run --rm -v "$PWD:/app:ro" node:22-slim node /app/tw.js
~~~

~~~text الناتج
request 11: EADDRNOTAVAIL connect EADDRNOTAVAIL 127.0.0.1:8080 - Local (0.0.0.0:0)
TIME_WAIT: 9
30 requests ok (one connection), TIME_WAIT: 0
request 11: EADDRNOTAVAIL connect EADDRNOTAVAIL 127.0.0.1:8080 - Local (0.0.0.0:0)
TIME_WAIT: 9
30 requests ok (new connection each), TIME_WAIT: 30
~~~

- ١٠ بورتات: الطلب الـ ١١ وقع بـ [[EADDRNOTAVAIL]] (ده errno 99 من الكيرنل، فأي لغة هتطلّعه بشكلها: في Python اسمه Cannot assign requested address).
- [[keepalive]]: اتصال واحد لـ ٣٠ طلب، ولا TIME_WAIT.
- التالت بـ [[tcp_tw_reuse]] الافتراضي ([[2]] = للـ loopback بس) **برضه وقع**: الـ reuse بيشتغل بس لو عدّت ثانية على الأقل من آخر استخدام، والطلبات هنا ورا بعض. يعني مش حل.
- الرابع بالمدى الافتراضي: عدّى، و ٣٠ TIME_WAIT. المشكلة موجودة بس مستنية زحمة كفاية.
- و [[process.exit]] وسط الـ loop: من غير [[c.off('error', fail)]] Node كان بيطبع [[MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 error listeners added]] في وضع الـ keepalive (listener جديد على نفس الـ socket كل طلب). صلّحناه.

### الحل

| الحل | إزاي |
|---|---|
| connection pool للداتابيز | [[pg.Pool]] في Node، و SQLAlchemy pool في Python، أو PgBouncer قدام Postgres. الاتصالات بتتفتح مرة وتتعاد |
| keep-alive لأي HTTP API بتكلّمه | في Node 19+ الـ [[http.globalAgent]] بـ keepAlive افتراضي، و [[fetch]] (undici) بيعيد الاتصالات؛ في Python [[requests.Session()]] بدل [[requests.get]] |
| nginx للـ backend | [[keepalive 32;]] في [[upstream]] و [[proxy_http_version 1.1;]] و [[proxy_set_header Connection "";]] (من وثائق nginx) |

### اللي اترفض

| التصليح | ليه لأ |
|---|---|
| [[tcp_tw_recycle]] | كان بيكسر المستخدمين اللي ورا NAT، و **اتشال من لينكس 4.12** |
| [[tcp_tw_reuse]] (الافتراضي [[2]] للـ loopback، و [[1]] لكل الاتصالات الخارجة) | بشرط timestamps وثانية من آخر استخدام؛ اتجرّب بـ [[2]] على loopback وموقفش الخطأ |
| توسيع [[ip_local_port_range]] | بيأجّل الخطأ، مبيقللش الـ ٦٠ ضعف بطء |
| [[SO_LINGER]] بـ صفر | بيقفل بـ RST: بيمسح الـ TIME_WAIT بس ممكن يضيّع بيانات لسه في الطريق |

---

## ٦. اتأكد ومتتكررش

- [[pg_stat_statements]] كل يوم: أول ١٠ بالمجموع، وأي واحد جديد فيهم = راجعه (مشروع «تقرير الاستعلامات البطيئة» في الوحدة).
- [[log_min_duration_statement]] على الإنتاج (٢٠٠–٥٠٠ مللي)، و [[auto_explain]] لو عايز الخطة في اللوج (تاب Postgres، درس «الاستعلامات البطيئة»).
- [[EXPLAIN]] لأي استعلام جديد على جدول كبير في الـ review، و [[pgbench]] بنفس شكل الاستعلام قبل ما يتنشر.
- راقب [[ss -s]] (سطر [[timewait]]) وعدد اتصالات Postgres ([[SELECT count(*) FROM pg_stat_activity]]). لو بيكبروا مع الزحمة بنفس النسبة: فيه مكان بيفتح اتصال لكل طلب.
- وأول درس في الموضوع ده «الموقع بطيء مش واقع» في نفس التاب: ابدأ منه لما متعرفش البطء فين أصلًا.`,
          deep: {
            why: R`الاستعلام البطيء والاتصال لكل طلب بيعيشوا مستخبيين في التطوير (بيانات قليلة ومستخدم واحد) ويظهروا مع أول زحمة، وبيتلبسوا في بعض: الاتنين بيبانوا «الداتابيز بطيئة». القياس بالأرقام هو اللي بيفرّق: [[pg_stat_statements]] بيقول وقت الاستعلام نفسه، و [[pgbench -C]] و [[ss]] بيقولوا تمن فتح الاتصالات.`,
            how: R`الـ planner بيختار بين Seq Scan و Index Scan من الإحصائيات ([[ANALYZE]]): لو مفيش index بيطابق الـ [[WHERE]] لازم يقرا الجدول كله، و [[Parallel]] بيقسم القراية على workers بس مبيقللش الشغل. الـ B-tree index على [[(customer_id, created_at DESC)]] مترتب بالعميل وبعدين بالتاريخ، فالاستعلام بينزل للعميل ويقرا أول ٢٠ بالترتيب ويقف. وفي TCP، اللي بيقفل الأول بيدخل FIN_WAIT ثم TIME_WAIT لمدة 2×MSL (٦٠ ثانية ثابتة في لينكس)، والاتصال بيتعرّف بـ ٤ أرقام (IP وبورت لكل طرف)، فعلى وجهة واحدة عدد الاتصالات محدود بعدد البورتات المحلية.`,
            when: R`أي صفحة بطيئة «تحت الضغط بس»، وأي [[EADDRNOTAVAIL]] أو [[Cannot assign requested address]] أو [[too many clients already]] من Postgres، وقبل أي حملة أو إطلاق: [[pgbench]] أو أداة ضغط بنفس شكل الاستعلامات.`,
            mistakes: R`تختبر الاستعلام مرة واحدة على جهازك (٥٨ مللي، «تمام»). و [[EXPLAIN]] من غير [[ANALYZE]] فتقرا تقديرات مش أرقام. و [[EXPLAIN ANALYZE]] على [[DELETE]] أو [[UPDATE]] في الإنتاج (بينفّذه فعلًا!، حطه في [[BEGIN]] و [[ROLLBACK]]). و [[CREATE INDEX]] من غير [[CONCURRENTLY]] على جدول شغّال. و index على كل عمود «احتياطي». و [[ALTER SYSTEM]] والقيمة جاية من [[-c]]. وتفتكر TIME_WAIT مشكلة في حد ذاته وتلعب في الكيرنل بدل ما تعمل pool. و [[tcp_tw_recycle]] من مقال قديم.`
          },
          sol: R`قبل: [[Parallel Seq Scan on orders]] و [[Rows Removed by Filter: 999992]] و [[Execution Time: 58.310 ms]]، و pgbench [[latency average = 201.490 ms]] و [[tps = 39.7]]، واللوج [[duration: 246.481 ms]]، و [[pg_stat_statements]] [[405 | 198.8 | 80494]]. بعد [[CREATE INDEX CONCURRENTLY]] (٢.٣ ثانية): [[Index Scan using orders_customer_created_idx]] و [[0.207 ms]]، و pgbench [[0.309 ms]] و [[tps = 25852.9]]. و [[pgbench -C]]: [[tps = 636]] بدل [[37946]] و ٣١٧٥ TIME_WAIT. و [[tw.js]] بـ ١٠ بورتات: [[request 11: EADDRNOTAVAIL]]، ومع [[keepalive]] صفر TIME_WAIT. والفخ: [[source = command line]].

اتجرّب على [[postgres:16-alpine]] (16.13)، و [[ubuntu:24.04]] (iproute2 6.1، Python 3.12)، و [[node:22-slim]]. [[tcp_tw_recycle]] واتشاله في 4.12، وإعدادات nginx keepalive من الوثائق الرسمية.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: ٣ أماكن تلاقي فيهم الاستعلام البطيء في Postgres، وكل واحد بيدّيك إيه بالظبط؟ ومين اللي بيشيل TIME_WAIT في اتصال TCP؟`, done: R`كتبت اللوج بـ [[log_min_duration_statement]] (كل استعلام بطيء بنصه ووقته)، و [[pg_stat_statements]] (المجموع والمتوسط وعدد المرات لكل شكل)، و [[EXPLAIN (ANALYZE, BUFFERS)]] (الخطة الفعلية لاستعلام واحد)، والطرف اللي قفل الأول.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: على المعمل بعد الـ index، استعلام [[WHERE customer_id = 4242 AND status = 'paid' ORDER BY created_at DESC LIMIT 20]]: الخطة هتستخدم الـ index؟ هيبقى فيه [[Filter]]؟ وبعدين [[WHERE status = 'paid' ORDER BY created_at DESC LIMIT 20]] (من غير عميل). نفّذ [[EXPLAIN ANALYZE]] للاتنين.`, done: R`توقعت إن الأول [[Index Scan]] ومعاه [[Filter: (status = 'paid')]] و [[Rows Removed by Filter]] صغير، والتاني ميقدرش يستخدم الـ index للفلتر (العمود الأول [[customer_id]]) فهيعمل Seq Scan أو حاجة تانية، والنتيجة اتكتبت جنب التوقع بالأرقام.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: بـ [[pgbench]] قيس ٣ حالات على نفس الجدول: من غير index، و index على [[customer_id]] بس، و [[(customer_id, created_at DESC)]]. والعميل اللي هتختبره عنده ٢٠٠٠ طلب (زوّدهم بـ [[INSERT]]). اعمل جدول latency و tps.`, done: R`الجدول فيه ٣ صفوف بالأرقام، والـ index المركب الأسرع، والـ index على [[customer_id]] بس فيه [[Sort]] في الخطة للعميل الكبير، وكتبت جملة ليه.` },
            { lvl: 'تطبيق', t: R`صلّح الكود ده (Node): [[app.get('/orders', async (req, res) => { const c = new pg.Client(); await c.connect(); const r = await c.query(...); await c.end(); res.json(r.rows); })]]. اكتب نسخة بـ [[pg.Pool]]، وقيس بـ [[autocannon]] أو [[ab]] أو لوب [[curl]] متوازي: عدد الطلبات في الثانية و [[ss -tan state time-wait | wc -l]] قبل وبعد.`, done: R`النسخة بتاعتك فيها [[Pool]] واحد برة الـ handler و [[pool.query]] جواه، والطلبات في الثانية زادت بوضوح، و TIME_WAIT ناحية بورت 5432 قريب من صفر بدل آلاف.` },
            { lvl: 'تحدي', t: R`ابني [[slow-report.sh]]: بيقرا [[pg_stat_statements]] ويطبع أول ٥ بالمجموع، ولكل واحد [[EXPLAIN]] (من غير ANALYZE: بعد ما يبدّل [[$1]] بقيمة من [[--sample]] اللي بتديهاله)، ويعلّم [[SEQ]] لو الخطة فيها [[Seq Scan]] على جدول أكبر من ١٠٠ ألف صف ([[pg_class.reltuples]]).`, done: R`على المعمل قبل الـ index أول سطر عليه [[SEQ]] و [[orders]]، وبعده العلامة اختفت، والسكربت مبينفّذش أي استعلام من الإنتاج بـ ANALYZE.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه [[pgbench -C]] كان أبطأ ٦٠ مرة مع إن الاستعلام [[SELECT 1]]؟ وليه رفع [[ip_local_port_range]] مش حل؟ استخدم أرقام المعمل.`, done: R`الشرح فيه: [[average connection time = 3.093 ms]] مقابل [[0.105 ms]] للاستعلام، و Postgres بيعمل process لكل اتصال، و ٣١٧٥ TIME_WAIT في ٥ ثواني، وتوسيع البورتات بيأجّل [[EADDRNOTAVAIL]] بس والبطء زي ما هو، والحل pool.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`python`, run: R`import sqlite3, random, time
db = sqlite3.connect(':memory:')
db.execute('CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INT, total REAL, created_at INT)')
random.seed(1)
db.executemany('INSERT INTO orders (customer_id, total, created_at) VALUES (?, ?, ?)',
               ((random.randint(1, 10000), round(random.random() * 500, 2), i) for i in range(200000)))
q = 'SELECT id, total FROM orders WHERE customer_id = 4242 ORDER BY created_at DESC LIMIT 20'
plan = lambda: ' | '.join(r[-1] for r in db.execute('EXPLAIN QUERY PLAN ' + q))
def ms():
    s = time.perf_counter()
    for _ in range(20):
        db.execute(q).fetchall()
    return (time.perf_counter() - s) / 20 * 1000
print('before:', plan()); b = ms()
db.execute('CREATE INDEX orders_customer_created_idx ON orders (customer_id, created_at DESC)')
print('after:', plan()); a = ms()
print('faster:', 'yes' if a * 5 < b else 'no')`, expect: [R`before: SCAN orders`, R`after: SEARCH orders USING INDEX orders_customer_created_idx`, R`faster: yes`] },
            { os: [R`ubuntu`], sh: R`python`, run: R`import socket, threading, subprocess
srv = socket.socket(); srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
srv.bind(('127.0.0.1', 38414)); srv.listen(128)
def serve():
    while True:
        c, _ = srv.accept(); c.recv(10); c.sendall(b'ok'); c.recv(10); c.close()
threading.Thread(target=serve, daemon=True).start()
for i in range(100):
    s = socket.create_connection(('127.0.0.1', 38414)); s.sendall(b'GET'); s.recv(10); s.close()
count = lambda f: len(subprocess.run(['ss', '-tan', 'state', 'time-wait', f], capture_output=True, text=True).stdout.strip().splitlines()) - 1
client, server = count('( dport = :38414 )'), count('( sport = :38414 )')
print('client holds TIME_WAIT:', client >= 100 and server == 0)`, expect: [R`client holds TIME_WAIT: True`] },
          ],
        },
        {
          cmd: "git bisect لعطل في الإنتاج",
          title: "الأسعار غلط بعد إصدار فيه ٤٠ commit: مين كسرها؟ git bisect run بسكربت بيرجّع 0 و 1 و 125",
          learn: R`تحوّل شكوى («الحساب غلط») لأمر واحد بيقول سليم أو بايظ، وتلاقي الـ commit بـ [[git bisect run]] لوحده حتى لو فيه commits مبتتبنيش، وتعرف الفخ اللي بيخلّي bisect يدّي إجابة غلط بثقة، وتصلّح بـ revert وتمنع التكرار باختبار.`,
          out: R`[[git bisect run sh ../check-total.sh]] بيطبع [[f2a1d87... is the first 'bad' commit]] و [[refactor(price): simplify rounding]]، وبعد [[git revert]] السكربت بيطبع [[total=4.19]] ورقم خروج ٠.`,
          desc: R`بعد نشر [[v1.5.0]] عميل اشتكى: نص كيلو إلا شوية (٠.٣٣٥ كيلو) من صنف سعره ١٢.٥ اتحسب [[4.18]] بدل [[4.19]]. بين [[v1.4.0]] (كان سليم) و [[v1.5.0]] فيه ٣٩ commit، وأغلبها ملهاش دعوة بالأسعار. بدل ما تقرا ٣٩ diff، بتعمل حاجتين: (١) سكربت بيعيد الشكوى ويرجّع [[0]] لو سليم و [[1]] لو بايظ و [[125]] لو النسخة دي أصلًا مبتشتغلش، و (٢) [[git bisect run]] يقسم الـ commits نصين كل مرة ويشغّل السكربت لوحده. في المعمل وصل للـ commit في ٧ تجارب.

السبب كان [[refactor(price): simplify rounding]]: حد غيّر [[Math.round]] لـ [[Math.floor]] «تبسيط». والحل [[git revert]] للـ commit ده بس (مش الإصدار كله)، واختبار بالرقم ده بالظبط في CI.

وأهم فخ: لو سكربت الاختبار **جوه الريبو** ومش موجود في الـ commits القديمة، الـ shell بيرجّع [[127]] (command not found). Git 2.43 اعتبره «bad» وطلّع [[docs: note 2]] كأول commit بايظ: إجابة غلط بثقة. Git 2.56 مسكها ووقف بـ [[bogus exit code 127]]. فالسكربت دايمًا برة الريبو.`,
          example: R`sh ../check-total.sh; echo "exit=$?"
git checkout -q v1.4.0 && sh ../check-total.sh; git checkout -q main
git bisect start v1.5.0 v1.4.0
git bisect run sh ../check-total.sh
git bisect log > ../bisect.log
git bisect reset
git show f2a1d87 -- price.js
git revert --no-edit f2a1d87 && sh ../check-total.sh`,
          lines: [
            R`الشكوى كأمر: على [[main]] (فيه v1.5.0) السكربت بيطبع [[total=4.18]] ورقم خروج ١ = بايظ. قبل أي bisect لازم تتأكد إن الأمر بيفرّق فعلًا.`,
            R`ونفس الأمر على [[v1.4.0]] لازم يطلع ٠. لو الاتنين نفس النتيجة، السكربت مش بيقيس المشكلة والـ bisect هيدّيك كلام فاضي.`,
            R`أول argument البايظ والتاني السليم. git بيوقفك في النص ويطبع كام فاضل.`,
            R`git بيشغّل السكربت على كل نقطة ويحكم من رقم الخروج، لحد ما يطبع [[is the first 'bad' commit]]. السكربت في [[..]] يعني برة الريبو، فموجود في كل الـ commits.`,
            R`بيحفظ كل خطوة (good و bad و skip) في ملف. تقدر تعيدها بـ [[git bisect replay]] أو تبعتها لزميل كدليل.`,
            R`يرجّعك للـ branch اللي كنت عليه. من غيرها هتفضل على detached HEAD عند commit قديم.`,
            R`الـ diff بتاع الـ commit ده في [[price.js]] بس: [[-Math.round]] و [[+Math.floor]].`,
            R`commit جديد بيعكس الـ commit ده بس (باقي الإصدار زي ما هو)، وبعده السكربت لازم يطبع [[total=4.19]].`,
          ],
          try: R`ابني المعمل بسكربت [[lab.sh]] اللي في الشرح (التواريخ ثابتة، فالهاشات هتطلع زي الدرس بالظبط)، واكتب [[check-total.sh]] برة الريبو، واعمل bisect بإيدك الأول (good و bad) وعدّ الخطوات، وبعدين بـ [[run]]. وبعدين جرّب الفخ: حط السكربت جوه الريبو في commit جديد وشغّل [[bisect run]] عليه.`,
          teach: R`## العَرَض

بعد نشر [[v1.5.0]]: عميل اشترى ٠.٣٣٥ كيلو من صنف بـ ١٢.٥ للكيلو. المفروض [[4.1875]] تتقرّب لـ [[4.19]]، والفاتورة [[4.18]]. فرق قرش، بس في كل فاتورة رقمها التالت ٥ أو أكتر. وبين آخر إصدار سليم والحالي ٣٩ commit.

---

## المعمل: الهاشات هتطلع عندك زي ما هي هنا

التواريخ والأسامي ثابتة، فنفس الهاشات طلعت على Git Bash في ويندوز (Git 2.56، Node 24) وعلى [[ubuntu:24.04]] (Git 2.43، Node 18):

~~~bash lab.sh
set -e
export GIT_AUTHOR_NAME=mona GIT_AUTHOR_EMAIL=mona@example.com GIT_COMMITTER_NAME=mona GIT_COMMITTER_EMAIL=mona@example.com
export GIT_AUTHOR_DATE="2026-10-01T10:00:00+02:00" GIT_COMMITTER_DATE="2026-10-01T10:00:00+02:00"
rm -rf lab && mkdir lab && cd lab
git init -q -b main shop-api && cd shop-api && git config core.autocrlf false
printf 'function total(items) {\n  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);\n  return Math.round(sum * 100) / 100;\n}\nmodule.exports = { total };\n' > price.js
echo "# shop-api" > README.md
git add . && git commit -qm "feat: total()" && git tag v1.4.0
for i in $(seq 2 40); do
  case $i in
    23) sed -i 's/Math.round/Math.floor/' price.js; git commit -qam "refactor(price): simplify rounding" ;;
    30) echo "function broken( {" > util.js; echo "require('./util');" >> price.js; git add .; git commit -qm "chore: util wip" ;;
    31) echo "module.exports = {};" > util.js; git commit -qam "fix: util" ;;
    *) echo "line $i" >> README.md; git commit -qam "docs: note $i" ;;
  esac
done
git tag v1.5.0
~~~

- commit ٢٣: الباج. commit ٣٠: حد رفع ملف فيه syntax error (النسخة دي مبتشتغلش خالص)، و ٣١ صلّحه. الباقي توثيق.
- على الماك [[sed -i '']] بدل [[sed -i]].

---

## ١. حوّل الشكوى لأمر

~~~bash check-total.sh
#!/bin/sh
# 0 = سليم، 1 = الباج موجود، 125 = النسخة دي مش بتتبني (skip)
node --check price.js 2>/dev/null || exit 125
node -e "require('./price')" 2>/dev/null || exit 125
out=$(node -e "console.log(require('./price').total([{price:12.5,qty:0.335}]))")
echo "total=$out"
[ "$out" = "4.19" ]
~~~

| السطر | ليه |
|---|---|
| [[node --check price.js]] | الملف فيه syntax error؟ يبقى النسخة دي مش بتتجرّب: [[125]] |
| [[node -e "require('./price')"]] | بيتحمّل بالـ dependencies بتاعته؟ commit ٣٠ بيقع هنا ([[util.js]] بايظ) |
| [[out=$(...)]] | الحالة اللي العميل اشتكى منها بالظبط، بالأرقام |
| آخر سطر (المقارنة بـ [[4.19]]) | رقم خروجه هو رقم خروج السكربت: ٠ لو مساوي، ١ لو لأ |

وأول حاجة قبل أي bisect: السكربت بيفرّق فعلًا؟

~~~text الناتج
total=4.18          ← main
exit=1
total=4.19          ← v1.4.0
exit=0
exit=125            ← chore: util wip (من غير total: وقف في أول سطرين)
~~~

### ليه [[12.5 × 0.335]] بالذات؟

اختبرنا الأول بـ [[19.99 × 3]] وطلع [[59.97]] على الاتنين: [[19.99*3*100]] بيطلع [[5997]] بالظبط، فـ [[floor]] و [[round]] نفس النتيجة. الباج بيظهر بس لما الرقم التالت بعد العلامة ٥ أو أكتر ([[4.1875]]). يعني: اختبار بأرقام «عادية» كان هيعدّي، وده سبب إن الباج عدّى من الـ review أصلًا.

---

## ٢. [[git bisect run]]

~~~bash
git bisect start v1.5.0 v1.4.0
git bisect run sh ../check-total.sh
~~~

~~~text الناتج
Bisecting: 19 revisions left to test after this (roughly 4 steps)
[849cd65c00c95f361c498cc9f09d6a0636c0a0b1] docs: note 20
running 'sh' '../../check-total.sh'
total=4.19
Bisecting: 9 revisions left to test after this (roughly 3 steps)
[f13dbd95c2b84d5654051ac4e3dca25d4030d38e] chore: util wip
running 'sh' '../../check-total.sh'
Bisecting: 9 revisions left to test after this (roughly 3 steps)
[4f89b0dbff7993c41a2498b025975befb6600503] docs: note 37
running 'sh' '../../check-total.sh'
total=4.18
Bisecting: 8 revisions left to test after this (roughly 3 steps)
[b5c7cd0228071a1a21bdd71d8ede5d6162064e2e] docs: note 28
running 'sh' '../../check-total.sh'
total=4.18
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[e9d72bd11005dbfe487d9a74cdeffc8cca0c6404] docs: note 24
running 'sh' '../../check-total.sh'
total=4.18
Bisecting: 1 revision left to test after this (roughly 1 step)
[1276c5627abbf3a543c8d86c39ef3d0202e97c77] docs: note 22
running 'sh' '../../check-total.sh'
total=4.19
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[f2a1d87f6e45bb10b1ce72351dee642c3353a75c] refactor(price): simplify rounding
running 'sh' '../../check-total.sh'
total=4.18
f2a1d87f6e45bb10b1ce72351dee642c3353a75c is the first 'bad' commit
commit f2a1d87f6e45bb10b1ce72351dee642c3353a75c
Author: mona <mona@example.com>
Date:   Thu Oct 1 10:00:00 2026 +0200

    refactor(price): simplify rounding

 price.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
bisect found first 'bad' commit
~~~

(المسار [[../../]] لأن السكربت كان فولدرين فوق في تجربتنا؛ عندك حسب مكانه.)

- ٧ تجارب بدل ٣٩. و log2 لـ ٣٩ حوالي ٥.٣؛ الزيادة بسبب الـ skip.
- [[chore: util wip]]: السكربت رجّع ١٢٥ (مفيش [[total=]])، فـ git عمل skip وراح لـ commit قريب ([[note 37]]) بدل النص بالظبط.
- الحكم من رقم الخروج: [[0]] good، و [[1]] لـ [[127]] ماعدا [[125]] bad، و [[125]] skip، و [[128]] أو أكتر: وقف كل حاجة.

### ولو الـ skip وقع جنب الباج على طول؟

لو commit البناء البايظ هو اللي قبل الباج مباشرة، git مش هيقدر يحكم مين فيهم الأول، وهيطبع إن الـ first bad «could be any of» ومعاها الاتنين. ساعتها بتجرّب الـ commit ده بإيدك (تصلّح البناء مؤقتًا) أو تقرا الـ diff بتاع الاتنين بس.

---

## ٣. الفخ: السكربت جوه الريبو

حطينا [[check-total.sh]] في commit جديد على branch، وعملنا bisect من الـ commit ده لـ [[v1.4.0]]:

~~~text Git 2.43 على Ubuntu
sh: 0: cannot open check-total.sh: No such file
...
912be18d60a45ea75211e127079fafc0a12aed25 is the first bad commit
~~~

و [[912be18]] هو [[docs: note 2]]: **غلط بثقة**. الملف مش موجود في الـ commits القديمة، فالـ shell رجّع [[127]] (على dash الكلام [[cannot open]] وعلى bash [[No such file or directory]])، و [[127]] في النطاق [[1-127]] = bad. فكل commit «بايظ»، فأول واحد بعد السليم هو المتهم.

~~~text Git 2.56 على ويندوز
running 'sh' 'check-total.sh'
sh: check-total.sh: No such file or directory
[f506cca...] feat: total()
running 'sh' 'check-total.sh'
sh: check-total.sh: No such file or directory
error: bogus exit code 127 for 'good' revision
~~~

Git الأحدث بيجرّب الأمر على الـ commit اللي انت قلت إنه سليم، ولو رجّع ١٢٧ هناك يبقى الأمر نفسه بايظ، فبيوقف. بس متعتمدش على ده: **السكربت برة الريبو** ([[../check-total.sh]] أو [[/tmp]])، أو untracked جوه الريبو (الملفات اللي git مش متابعها بتفضل مكانها مع كل checkout).

### رقم خروج ١٢٨ أو أكتر

~~~text git bisect run sh -c 'exit 200'
running 'sh' '-c' 'exit 200'
error: bisect run failed: exit code 200 from 'sh' '-c' 'exit 200' is < 0 or >= 128
~~~

git وقف خالص: الأرقام دي معناها إن البرنامج اتقتل بـ signal (مثلًا ١٣٧ = اتقتل بـ [[kill -9]]، أو الذاكرة خلصت)، فـ git مش عارف يحكم. لو تستاتك ممكن ترجّع أرقام كبيرة، اعمل غلاف بيحوّلها لـ ١ أو ١٢٥.

---

## ٤. السبب والتصليح

~~~text git show f2a1d87 -- price.js (آخر سطور)
-  return Math.round(sum * 100) / 100;
+  return Math.floor(sum * 100) / 100;
~~~

[[Math.floor]] بيقطع ([[418.75]] بقت [[418]])، و [[Math.round]] بيقرّب ([[419]]). الـ commit اسمه refactor، والـ refactor المفروض ميغيّرش السلوك، وده غيّره.

~~~bash
git revert --no-edit f2a1d87
sh ../check-total.sh; echo "exit=$?"
~~~

~~~text الناتج
Auto-merging price.js
[main 18d2c8a] Revert "refactor(price): simplify rounding"
total=4.19
exit=0
~~~

- [[Auto-merging price.js]]: commit ٣٠ و ٣١ غيّروا نفس الملف بعد الباج، و git عرف يعكس السطر لوحده.
- [[18d2c8a]] بالتواريخ الثابتة اللي في [[lab.sh]].

### البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| ارجع لـ [[v1.4.0]] كله | بيشيل ٣٨ commit سليمين (ومنهم تصليحات) عشان سطر واحد. ينفع كإسعاف أولي لو الباج خطير جدًا، وبعدين revert للـ commit بس |
| اقرا الـ ٣٩ diff | ممكن هنا، مستحيل في ٤٠٠. و bisect ميعتمدش إنك «تشك» في الـ commit الصح |
| [[git log -S "Math.floor"]] | **أسرع هنا فعلًا**: طلّع [[f2a1d87]] على طول. بس شغّال لأننا عارفين النص اللي اتغيّر. الـ bisect بيشتغل لما تعرف العَرَض بس (درس «git log -S / blame») |
| صلّح على الإنتاج بإيدك | التصليح مش في git، وأول deploy هيمسحه (قضية «نسخة قديمة كسرت الإنتاج» في نفس التاب) |

---

## ٥. أدوات bisect التانية (اتجرّبت كلها على المعمل)

~~~bash
git bisect log > ../my.log && git bisect reset
git bisect replay ../my.log
git bisect start --term-old=fast --term-new=slow
git bisect terms
git bisect start v1.5.0 v1.4.0 -- util.js
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[bisect log]] و [[replay]] | تحفظ الجلسة وتعيدها (لو غلطت في good أو bad بإيدك: عدّل الملف وأعد) |
| [[--term-old=fast --term-new=slow]] | لما المشكلة مش «باج» بل بطء أو «زاد حجم»: الكلمات [[good]] و [[bad]] بتلخبط. [[bisect terms]] بيطبع [[Your current terms are 'fast' for the old state and 'slow' for the new state.]] |
| [[-- util.js]] | جرّب بس الـ commits اللي لمست الملف ده: وقف على [[chore: util wip]] على طول |
| [[--first-parent]] | في تاريخ فيه merges: يمشي على main بس ويحكم على الـ merge commits (أي PR جاب المشكلة) |
| [[bisect skip]] | بإيدك: الـ commit ده مبيتجرّبش |
| [[bisect visualize]] | يفتح [[gitk]] أو [[git log]] على الـ commits اللي فاضلة |

والأساسيات (bisect بإيدك خطوة خطوة) في درس «git bisect» في تاب git.

---

## ٦. اتأكد ومتتكررش

- السكربت نفسه بقى اختبار: [[total([{price:12.5,qty:0.335}])]] لازم [[4.19]]، في الـ test suite وفي CI، فأي حد يرجّع [[floor]] يتمسك قبل الـ merge.
- اختبارات بأرقام «وحشة» (أرقام بتنتهي بـ ٥، وأرقام كبيرة، وسالبة) مش [[100]] و [[3]] بس.
- كل commit لازم يتبني ويعدّي الاختبارات (CI على كل commit أو squash merge): كل commit مبيتبنيش = skip = bisect أبطأ وأقل دقة.
- الفلوس متتحسبش بـ float أصلًا: قروش كـ integers، أو مكتبة decimal (تاب JavaScript وتاب الداتا).`,
          deep: {
            why: R`أصعب جزء في أي regression مش التصليح، ده إنك تعرف **إيه** اللي اتغيّر. bisect بيحوّل «فيه حاجة باظت في الـ ٤٠ commit دول» لـ commit واحد ومعاه الكاتب والرسالة والـ diff، في عدد خطوات بيكبر ببطء (١٠٠٠ commit = حوالي ١٠ خطوات). وبـ [[run]] الكمبيوتر بيعمل الشغل كله وانت بتعمل حاجة تانية.`,
            how: R`git بيحسب مجموعة الـ commits اللي ancestors للـ bad ومش ancestors لأي good، ويختار commit يقسمها تقريبًا نصين، ويعمل checkout ليه (detached HEAD). مع [[run]] بيشغّل الأمر ويقرا رقم الخروج: ٠ good، و ١–١٢٧ ماعدا ١٢٥ bad، و ١٢٥ skip (بيختار commit قريب بدل النص)، و ١٢٨ أو أكتر بيوقف. والحالة كلها متخزنة في [[.git/BISECT_*]] و [[refs/bisect/*]]، و [[bisect reset]] بيمسحها ويرجّع HEAD. والـ skip بيقلل الدقة: لو الـ commits المتعملها skip في الحدود بين السليم والبايظ، النتيجة بتبقى مجموعة مش commit واحد.`,
            when: R`«كان شغّال في الإصدار اللي فات» ومش عارف إيه السبب، والتاريخ بين الاتنين أكتر من ٥ commits. ولأي حاجة تتقاس بأمر: باج، أو بطء (اختبار بيقيس الوقت ويرجّع ١ لو أكتر من حد)، أو حجم build، أو تحذير جديد من الـ compiler.`,
            mistakes: R`السكربت جوه الريبو ومش موجود في القديم. ومتتأكدش إن السكربت بيفرّق بين السليم والبايظ قبل ما تبدأ. وتختبر بأرقام مبتطلعش الباج. وتعتبر commit مبيتبنيش bad بدل skip (125) فالنتيجة غلط. وتقول good لنسخة مجرّبتهاش كويس في الوضع اليدوي. وتنسى [[bisect reset]]. وتشغّل bisect وفي الفولدر تعديلات مش متسجّلة (git بيرفض الـ checkout أو بيشيلها معاه). وتعمل revert للإصدار كله بدل الـ commit.`
          },
          sol: R`[[sh ../check-total.sh]] على main: [[total=4.18]] و [[exit=1]]، وعلى [[v1.4.0]]: [[total=4.19]] و [[exit=0]]، وعلى [[chore: util wip]]: [[exit=125]]. و [[bisect run]]: ٧ تجارب، و skip على [[f13dbd9]]، والنتيجة [[f2a1d87f6e45bb10b1ce72351dee642c3353a75c is the first 'bad' commit]]. والفخ: Git 2.43 طلّع [[912be18 ... is the first bad commit]] ([[docs: note 2]]، غلط)، و Git 2.56 وقف بـ [[bogus exit code 127 for 'good' revision]]. و [[exit 200]]: [[bisect run failed: exit code 200 ... is < 0 or >= 128]]. وبعد [[git revert --no-edit f2a1d87]]: [[total=4.19]] و [[exit=0]].

اتجرّب على Git Bash (Git 2.56، Node 24) و [[ubuntu:24.04]] (Git 2.43، Node 18) بنفس الهاشات.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: رقم خروج السكربت في [[bisect run]]: [[0]] و [[1]] و [[125]] و [[127]] و [[139]]، كل واحد git بيفهمه إزاي؟ وأنهي فيهم خطير وليه؟`, done: R`كتبت: good، و bad، و skip، و bad (وده الخطير لو جاي من command not found)، و git بيوقف ([[139]] = segfault)، وقلت إن السكربت برة الريبو هو الحماية.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، لو commit البناء البايظ كان رقم ٢٢ (قبل الباج مباشرة) بدل ٣٠، [[bisect run]] هيطبع إيه في الآخر؟ عدّل [[lab.sh]] وجرّب.`, done: R`توقعت إنه مش هيقدر يحدد commit واحد ويطبع الاتنين كاحتمالات، والنتيجة طابقت (انسخ السطر اللي طلع)، وكتبت إزاي تحسمها (تجرّب commit ٢٢ بعد ما تصلّح [[util.js]] مؤقتًا في worktree).` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده: [[npm test && echo ok]]. التستات ساعات بتفشل بـ timeout في الشبكة (exit 1)، وفي commits قديمة [[npm install]] مش متعمل فـ [[jest: not found]] (exit 127). اكتب غلاف بيخلّي الحالتين skip، والفشل الحقيقي bad.`, done: R`الغلاف بيشغّل [[npm ci]] الأول ولو فشل [[exit 125]]، ويعيد التست مرة لو الخطأ فيه [[ETIMEDOUT]]، ويحوّل ١٢٧ لـ ١٢٥، وجرّبته على commit من غير [[package-lock]] فاتعمله skip.` },
            { lvl: 'تطبيق', t: R`قارن: لاقي نفس الـ commit بـ ٣ طرق وقيس الوقت والخطوات: (١) [[git log -S "Math.floor" --oneline]]، (٢) [[bisect]] بإيدك (good و bad)، (٣) [[bisect run]]. وبعدين غيّر الباج لحاجة مالهاش نص واضح (مثلًا [[* 100]] بقت [[* 10 * 10]] وفي نفس الـ commit شلت [[Math.round]]) وكرّر.`, done: R`جدول بالطرق التلاتة والوقت، والطريقة الأولى الأسرع في الحالة الأولى، وفي الحالة التانية [[log -S "Math.round"]] لسه بيلاقيه بس [[log -S "Math.floor"]] مبيلاقيش حاجة، و bisect لاقاه في الحالتين.` },
            { lvl: 'تحدي', t: R`bisect على الأداء: ضيف للمعمل commit رقم ٣٥ بيخلّي [[total]] أبطأ (loop فاضي مليون مرة جواها). اكتب [[check-speed.sh]] بيقيس ١٠٠٠ نداء ويرجّع ١ لو أكتر من حد، واعمل bisect بـ [[--term-old=fast --term-new=slow]].`, done: R`السكربت بيفرّق بين قبل وبعد ٣٥ بوضوح (الحد اتحدد من قياس الاتنين)، و bisect طبع commit ٣٥ و [[is the first 'slow' commit]]، و [[bisect terms]] طبع الكلمتين.` },
            { lvl: 'تحدي', t: R`اشرحها لمدير في ٥ سطور: ليه الفريق محتاج «كل commit يتبني ويعدّي الاختبارات» حتى لو بنعمل squash أو مش بنستخدم bisect كل يوم؟ استخدم أرقام المعمل (٧ تجارب، و skip واحد).`, done: R`الشرح فيه: كل commit بايظ = skip = خطوات زيادة وأحيانًا مفيش إجابة، وإن bisect حوّل ٣٩ commit لـ ٧ تجارب في دقيقة، وإن الاختبار اللي اتكتب للـ bisect بقى حماية دايمة في CI.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=mona GIT_AUTHOR_EMAIL=mona@example.com GIT_COMMITTER_NAME=mona GIT_COMMITTER_EMAIL=mona@example.com
export GIT_AUTHOR_DATE="2026-10-01T10:00:00+02:00" GIT_COMMITTER_DATE="2026-10-01T10:00:00+02:00"
export GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.autocrlf GIT_CONFIG_VALUE_0=false
p(){ printf 'function total(items) {\n  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);\n  return Math.%s(sum * 100) / 100;\n}\nmodule.exports = { total };\n' "$1" > price.js; }
git init -q -b main shop-api && cd shop-api
p round; echo "# shop-api" > README.md
git add . && git commit -qm "feat: total()" && git tag v1.4.0
for i in $(seq 2 40); do
  case $i in
    23) p floor; git commit -qam "refactor(price): simplify rounding" ;;
    30) echo "function broken( {" > util.js; echo "require('./util');" >> price.js; git add .; git commit -qm "chore: util wip" ;;
    31) echo "module.exports = {};" > util.js; git commit -qam "fix: util" ;;
    *) echo "line $i" >> README.md; git commit -qam "docs: note $i" ;;
  esac
done
git tag v1.5.0
cat > ../check-total.sh <<'EOF'
node --check price.js 2>/dev/null || exit 125
node -e "require('./price')" 2>/dev/null || exit 125
out=$(node -e "console.log(require('./price').total([{price:12.5,qty:0.335}]))")
echo "total=$out"
[ "$out" = "4.19" ]
EOF
sh ../check-total.sh; echo "main exit=$?"
git bisect start v1.5.0 v1.4.0 >/dev/null
git bisect run sh ../check-total.sh > ../run.txt 2>&1
grep -E "first .?bad.? commit" ../run.txt | head -1
git bisect reset -q 2>/dev/null || git bisect reset >/dev/null 2>&1
git log -1 --format='%h %s' f2a1d87
git revert --no-edit f2a1d87 >/dev/null && sh ../check-total.sh && echo "after revert exit=$?"`, expect: [R`total=4.18`, R`main exit=1`, R`f2a1d87f6e45bb10b1ce72351dee642c3353a75c is the first`, R`f2a1d87 refactor(price): simplify rounding`, R`total=4.19`, R`after revert exit=0`] },
          ],
        },
        {
          cmd: "incident: severity و runbook و postmortem",
          title: "الموقع رجّع 502 لمدة ١٢ ثانية: تدير الحادثة إزاي، وتحدد الـ severity، وتكتب runbook و postmortem من اللوج",
          learn: R`تمشي في أي حادثة بنفس الترتيب (اتأكد، وحدد الـ severity، ووزّع الأدوار، وقول للناس، ووقّف النزيف، وبعدين دوّر على السبب)، وتطلّع الخط الزمني والأثر بالأرقام من access log، وتكتب runbook حد تاني يقدر يمشي عليه و postmortem من غير لوم بخطوات ليها أصحاب.`,
          out: R`من اللوج: [[first 5xx: 11:34:08]] و [[last 5xx: 11:34:20]] و [[error rate: 38.0% (57 of 150)]]، و [[curl]] بعد التصليح [[200]].`,
          desc: R`الحادثة (incident) أي حاجة بتأثر على المستخدمين دلوقتي ومحتاجة حد يتحرك. وأهم قاعدة: **وقّف النزيف الأول، والسبب بعدين**. يعني لو الموقع بيرجّع 502، رجّعه (restart، أو rollback، أو اقفل الحاجة اللي بتضرب) قبل ما تقعد تفهم ليه. والـ severity (SEV1 لـ SEV4) بتحدد مين يصحى من النوم، وبتقول للناس مستوى الاستعجال من غير نقاش. وفي حادثة فيها أكتر من شخص بتوزّع أدوار: واحد بيقرر (incident commander)، وواحد بيصلّح، وواحد بيكلّم الناس، وواحد بيكتب الخط الزمني.

والمعمل: nginx قدام تطبيق، والتطبيق وقع ١٢ ثانية تحت ضغط ٥ طلبات في الثانية. من access log بس طلّعنا: أول 502 وآخر 502، ونسبة الأخطاء لكل ثانية، و ٥٧ طلب فشلوا من ١٥٠ (٣٨٪). ومن error log السبب المباشر: [[connect() failed (111: Connection refused) while connecting to upstream]]. والأرقام دي هي اللي بتدخل الـ postmortem، مش «حوالي دقيقة كده».

والـ runbook ورقة لكل عَرَض: إزاي تتأكد، وأول ٣ أوامر، والتصليح المؤقت، وإزاي تتأكد إنه اشتغل، وتصعّد لمين. والـ postmortem بعد الحادثة: إيه اللي حصل بالدقيقة، وليه (من غير ما تلوم شخص)، وإيه اللي هيتعمل عشان متتكررش، وكل خطوة ليها صاحب وميعاد.`,
          example: R`curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' http://127.0.0.1/
tail -1 /var/log/nginx/error.log
ss -tlnp | grep -E ':(80|8000) '
cd /srv/shop && python3 -m http.server 8000 &
awk '{n++} $9>=500 {e++} END {printf "error rate: %.1f%% (%d of %d)\n", 100*e/n, e, n}' /var/log/nginx/access.log
awk '$9>=500 {print substr($4,14,8)}' /var/log/nginx/access.log | sed -n '1p;$p'
date -u +%FT%TZ`,
          lines: [
            R`اتأكد إن فيه مشكلة من برة، زي المستخدم: الكود والوقت. [[502]] في ٣ مللي = nginx شغّال ومش لاقي التطبيق.`,
            R`آخر سطر في error log بتاع nginx: السبب المباشر مكتوب ([[Connection refused]] = مفيش حاجة سامعة على بورت التطبيق).`,
            R`مين سامع على البورتات: [[-t]] TCP و [[-l]] listening و [[-n]] أرقام و [[-p]] اسم البرنامج. nginx على 80 موجود، و 8000 مش موجود = التطبيق واقع.`,
            R`وقّف النزيف: شغّل التطبيق تاني (في الإنتاج: [[systemctl restart]] أو [[docker compose up -d]] أو rollback). ده قبل أي تحقيق في السبب.`,
            R`الأثر بالأرقام: كل سطر في access log طلب، والعمود التاسع الكود. [[%.1f%%]] نسبة برقم عشري واحد وبعدها علامة [[%]].`,
            R`أول وآخر 5xx: [[substr($4,14,8)]] بياخد الساعة من [[03/Nov/2026:11:34:08]]، و [[sed -n '1p;$p']] أول سطر وآخر سطر. ده بداية ونهاية الحادثة في الخط الزمني.`,
            R`الوقت بـ UTC بالشكل القياسي لأي رسالة أو خط زمني: الفريق ممكن يبقى في أكتر من منطقة زمنية، واللوجات غالبًا UTC.`,
          ],
          try: R`ابني المعمل اللي في الشرح في كونتينر [[ubuntu:24.04]] (nginx و [[python3 -m http.server]])، وشغّل اللوب اللي بيبعت ٥ طلبات في الثانية، واقفل التطبيق ١٢ ثانية ورجّعه. وبعدين من غير ما تبص على الوقت اللي قفلت فيه: طلّع من اللوج البداية والنهاية والنسبة، واكتب أول رسالة تحديث و postmortem قصير بالـ template اللي في الشرح.`,
          teach: R`## أول ٥ دقايق في أي حادثة (بالترتيب)

| الخطوة | السؤال | مثال من المعمل |
|---|---|---|
| ١. اتأكد | فيه مشكلة فعلًا ومن برة؟ | [[curl]] بيرجّع [[502]] |
| ٢. الحجم | مين متأثر وقد إيه؟ كله ولا جزء؟ | كل الطلبات على [[/]] |
| ٣. severity | قد إيه مستعجل؟ | SEV2 (تحت) |
| ٤. أدوار وقناة | مين بيقرر، ومين بيصلّح، وفين بنتكلم؟ | قناة [[#inc-2026-11-03-502]] |
| ٥. أول رسالة | المستخدمين والفريق عارفين؟ | «بنحقق في أخطاء 502 على الموقع» |
| ٦. وقّف النزيف | أسرع حاجة ترجّع الخدمة؟ | تشغيل التطبيق تاني |
| ٧. اتأكد إنه رجع | الأرقام رجعت طبيعية؟ | [[200]] ونسبة الأخطاء صفر |
| ٨. بعدين: السبب | ليه حصل؟ | postmortem |

والفخ الأشهر: الخطوة ٨ قبل ٦. واحد بيقرا الكود ٢٠ دقيقة يفهم ليه التطبيق وقع، والموقع واقع طول الوقت ده. التحقيق بييجي بعد ما الخدمة ترجع، واللوجات مش هتهرب.

---

## الـ severity

مفيش مقياس واحد عالمي؛ كل شركة بتكتب بتاعها. ده شكل شائع (قريب من اللي في كتب Google SRE و PagerDuty incident response):

| المستوى | يعني | أمثلة | الرد |
|---|---|---|---|
| SEV1 | الخدمة الأساسية واقعة لكل الناس، أو بيانات بتضيع، أو اختراق | الموقع كله 502، أو الدفع بيخصم ومش بيسجّل | كله يصحى دلوقتي، وتحديث كل ١٥–٣٠ دقيقة، و postmortem إجباري |
| SEV2 | جزء مهم بايظ لكتير من الناس، أو كله بايظ لفترة قصيرة | الدفع واقع والتصفح شغّال، أو 502 دقايق | الـ on-call بيبدأ فورًا ويصعّد، و postmortem |
| SEV3 | حاجة ثانوية بايظة أو أبطأ، وفيه طريقة تانية | التصدير لـ PDF واقع، أو صفحة أبطأ ٣ مرات | في ساعات الشغل، وتذكرة |
| SEV4 | مفيش أثر على المستخدم دلوقتي | ديسك وصل ٧٥٪، أو تحذير في اللوج | تذكرة عادية |

- لو مش متأكد: اختار الأعلى، ونزّله بعدين. العكس (تبدأ SEV3 وتطلع SEV1) بيضيّع وقت.
- حادثة المعمل: كل الطلبات فشلت بس ١٢ ثانية = SEV2 (وقصيرة جدًا). لو كانت ١٢ دقيقة = SEV1.

---

## الأدوار (حتى لو انت لوحدك، اعرفها)

| الدور | بيعمل | مبيعملش |
|---|---|---|
| Incident Commander (IC) | بيقرر، وبيوزّع، وبيسأل «إيه الخطوة الجاية ومين؟»، وبيعلن إمتى الحادثة خلصت | مبيكتبش أوامر بنفسه |
| Ops / المصلّح | بيشغّل الأوامر وبيقول كل حاجة قبل ما يعملها في القناة | مبيجرّبش ٣ حاجات مع بعض |
| Comms | بيكتب للمستخدمين والإدارة كل فترة متفق عليها | مبيوعدش بمواعيد |
| Scribe | بيكتب الخط الزمني بالوقت: مين عمل إيه إمتى | — |

---

## المعمل

nginx قدام تطبيق على بورت 8000، و ٥ طلبات في الثانية، والتطبيق بيقع ١٢ ثانية. على [[ubuntu:24.04]] (nginx 1.24 و Python 3.12 و curl 8.5):

~~~bash
docker run -d --name shop-ub ubuntu:24.04 sleep infinity
docker exec -it shop-ub bash
apt-get update -qq && apt-get install -y -qq nginx curl python3 iproute2
cat > /etc/nginx/sites-enabled/default <<'EOF'
server {
  listen 80;
  location / { proxy_pass http://127.0.0.1:8000; }
}
EOF
nginx
mkdir -p /srv/shop && echo ok > /srv/shop/index.html
cd /srv/shop && (python3 -m http.server 8000 >/dev/null 2>&1 & echo $! > /tmp/app.pid)
: > /var/log/nginx/access.log; : > /var/log/nginx/error.log
(for i in $(seq 1 150); do curl -s -o /dev/null http://127.0.0.1/; sleep 0.2; done) &
sleep 8; kill $(cat /tmp/app.pid)          # الحادثة
sleep 12; cd /srv/shop && (python3 -m http.server 8000 >/dev/null 2>&1 & echo $! > /tmp/app.pid)
wait
~~~

- [[: > file]]: بيفضّي الملف من غير ما يمسحه (nginx لسه فاتحه). عشان اللوج يبقى فيه التجربة دي بس، ومتتلخبطش بسطور تشغيل قديم.
- [[echo $! > /tmp/app.pid]]: رقم الـ process عشان نقفله بعدين بـ [[kill]] من غير ما ندوّر عليه.

### فخ حصل وانا ببني المعمل: [[pkill -f]] قتل نفسه

أول محاولة كانت فيها سطر [[pkill -f "http.server 8000"]] جوه [[bash -c]]، والأمر كله خرج بـ:

~~~text الناتج
Exit code 143
~~~

١٤٣ = ١٢٨ + ١٥ (SIGTERM): [[pkill -f]] بيدوّر في **السطر الكامل** لكل process، والـ [[bash -c]] اللي شايل الأمر سطره فيه نفس الكلام [[http.server 8000]]، فقتل نفسه. وكمان مرة قبلها [[kill $(cat /tmp/app.pid)]] مقفلش حاجة لأن الـ PID ده كان لنسخة فشلت تقوم (البورت كان مشغول بنسخة قديمة)، و ١٥٠ طلب كلهم [[200]]. الدرس: في حادثة حقيقية، أي أمر بيقتل أو بيمسح اتأكد قبله هو هيلمس إيه ([[pgrep -af]] قبل [[pkill -f]]، و [[ss -tlnp]] تشوف مين على البورت).

---

## ١. اتأكد وحدد السبب المباشر

~~~bash
curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' http://127.0.0.1/
tail -1 /var/log/nginx/error.log
ss -tlnp | grep -E ':(80|8000) '
~~~

~~~text الناتج (والتطبيق واقع)
502 0.002864s
2026/11/03 11:34:20 [error] 4119#4119: *493 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, server: , request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:8000/", host: "127.0.0.1"
LISTEN 0 511 0.0.0.0:80 0.0.0.0:* users:(("nginx",pid=4100,fd=5))
~~~

- [[502]] بسرعة (٣ مللي): nginx رد فورًا، يعني المشكلة ورا nginx مش قدامه.
- [[111: Connection refused]] و [[upstream: "http://127.0.0.1:8000/"]]: مفيش حاجة سامعة على 8000. (لو [[110: Connection timed out]] كان التطبيق موجود بس مش بيرد: ده 504، درس «504 Gateway Timeout».)
- [[ss]]: 80 موجود و 8000 لأ. التشخيص كامل في ٣ أوامر، والتفاصيل في درس «502 Bad Gateway» في نفس التاب.

---

## ٢. وقّف النزيف واتأكد

~~~text بعد ما التطبيق اشتغل
200 0.004202s
LISTEN 0 5 0.0.0.0:8000 0.0.0.0:* users:(("python3",pid=5595,fd=3))
~~~

---

## ٣. الأثر والخط الزمني من اللوج

~~~bash
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c
awk '{n++} $9>=500 {e++} END {printf "error rate: %.1f%% (%d of %d)\n", 100*e/n, e, n}' /var/log/nginx/access.log
awk '$9>=500 {print substr($4,14,8)}' /var/log/nginx/access.log | sed -n '1p;$p'
grep -c "connect() failed" /var/log/nginx/error.log
~~~

~~~text الناتج
     93 200
     57 502
error rate: 38.0% (57 of 150)
11:34:08
11:34:20
57
~~~

ولكل ثانية:

~~~bash
awk '{t=substr($4,14,8); tot[t]++; if ($9>=500) err[t]++} END {for (t in tot) printf "%s  %d/%d errors\n", t, err[t]+0, tot[t]}' /var/log/nginx/access.log | sort
~~~

~~~text الناتج (جزء)
11:34:06  0/5 errors
11:34:07  0/5 errors
11:34:08  2/4 errors
11:34:09  5/5 errors
...
11:34:18  5/5 errors
11:34:19  5/5 errors
11:34:20  2/5 errors
11:34:21  0/4 errors
11:34:22  0/5 errors
~~~

| الحتة | معناها |
|---|---|
| [[$9]] | العمود التاسع في شكل اللوج الافتراضي: كود الرد |
| [[substr($4,14,8)]] | العمود الرابع [[03/Nov/2026:11:34:08]]: من الحرف ١٤، ٨ حروف = [[11:34:08]] |
| [[tot[t]++]] | عدّاد لكل ثانية: كل الطلبات |
| [[err[t]+0]] | الأخطاء في الثانية دي، و [[+0]] عشان يطبع صفر بدل فراغ لو مفيش |
| [[sort]] | [[for (t in tot)]] مبيطلّعش بترتيب، فبنرتب بعدين |

ودلوقتي نقارن بالوقت اللي احنا عارفينه: التطبيق اتقفل [[11:34:08]] ورجع [[11:34:20]]. اللوج قال نفس الأرقام بالظبط من غير ما يعرف. ده اللي بيدخل الـ postmortem: «من 11:34:08 لـ 11:34:20 UTC (١٢ ثانية)، ٥٧ طلب فشلوا بـ 502 من ١٥٠ (٣٨٪ من الطلبات في الدقيقة دي، ١٠٠٪ وقت الحادثة)».

---

## ٤. رسايل التحديث

~~~text أول رسالة (خلال ٥ دقايق)
[SEV2] 2026-11-03T11:34Z — الموقع بيرجّع أخطاء 502 لكل الطلبات.
بنحقق. التحديث الجاي خلال ١٥ دقيقة أو أول ما يحصل جديد.
IC: mona — القناة: #inc-2026-11-03-502
~~~

~~~text رسالة الحل
[SEV2 — اتحلّت] الموقع رجع طبيعي من 11:34:20 UTC.
الأثر: ١٢ ثانية أخطاء 502 لكل الطلبات (٥٧ طلب).
السبب المباشر: خدمة التطبيق وقفت واتشغّلت تاني. التحقيق في سبب الوقوف مستمر، و postmortem خلال يومين.
~~~

- الوقت بـ UTC ([[date -u +%FT%TZ]] بيطبع زي [[2026-11-03T12:04:27Z]])، والأثر بأرقام، ومتوعدش بميعاد حل.
- و status page للمستخدمين (Better Stack و Atlassian Statuspage و Upptime) بنفس الكلام من غير تفاصيل داخلية.

---

## ٥. الـ runbook

ورقة لكل عَرَض، مكتوبة لحد صاحي من النوم ومش عارف السيستم:

~~~markdown runbook-502.md
# 502 Bad Gateway على shop.example

## إزاي تتأكد
curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' https://shop.example/
- 502 بسرعة (< 100ms): nginx مش لاقي التطبيق. كمّل هنا.
- 504 بعد ~60s: التطبيق موجود وبطيء. روح runbook-504.md.

## أول ٣ أوامر
1. tail -5 /var/log/nginx/error.log      # Connection refused ولا timed out؟
2. ss -tlnp | grep ':8000 '               # التطبيق سامع؟
3. systemctl status shop-api --no-pager   # شغّال؟ آخر سطور اللوج؟

## وقّف النزيف
- systemctl restart shop-api
- لو وقع تاني خلال ٥ دقايق بعد deploy: rollback (runbook-rollback.md)

## اتأكد
curl لـ ٣ صفحات (/ و /login و /api/health) = 200، ونسبة 5xx في الدقيقة الأخيرة = 0.

## متعملش
- متعملش restart لـ nginx (مش هو المشكلة، وبيقطع الاتصالات الشغّالة).
- متمسحش لوجات «عشان المساحة» وسط الحادثة.

## صعّد لـ
بعد ١٥ دقيقة من غير تحسن: @backend-oncall
~~~

والـ runbook الكويس قابل للتنفيذ: الأوامر مكتوبة بالظبط وتتنسخ، وكل خطوة ليها «لو شفت X روح لـ Y»، وبيتجرّب في «تمرين حريق» (تكسر حاجة عمدًا في staging وحد تاني يمشي عليه). ودرس «README و runbook» في تاب هندسة البرمجيات فيه شكل الـ runbook جوه الريبو.

---

## ٦. الـ postmortem (من غير لوم)

~~~markdown postmortem-2026-11-03.md
# 502 لمدة ١٢ ثانية — 2026-11-03

**الحالة:** اتحلّت · **Severity:** SEV2 · **IC:** mona · **الكاتب:** ali

## الملخص
من 11:34:08 لـ 11:34:20 UTC كل الطلبات رجعت 502 لأن خدمة التطبيق وقفت.

## الأثر
- ٥٧ طلب فشلوا من ١٥٠ في الفترة (٣٨٪)، و ١٠٠٪ وقت الحادثة.
- مفيش بيانات ضاعت (الطلبات الفاشلة كانت قراءة بس).

## الخط الزمني (UTC)
| الوقت | اللي حصل | المصدر |
|---|---|---|
| 11:34:08 | أول 502 في access.log | access.log |
| 11:34:08 | process التطبيق اتقفل (SIGTERM) | سجل الأوامر |
| 11:34:20 | التطبيق اشتغل تاني، آخر 502 | access.log |
| 11:34:21 | كل الطلبات 200 | access.log |

## السبب
- المباشر: process التطبيق اتقفل ومفيش حاجة شغّلته تاني لوحدها.
- الأعمق (٥ ليه): ليه وقف؟ أمر kill يدوي. ليه التطبيق مقامش لوحده؟ مش تحت systemd أو supervisor. ليه محدش عرف؟ مفيش تنبيه على نسبة 5xx.

## اللي مشي كويس / اللي مامشيش
- ✓ اللوجات كانت كفاية نعرف البداية والنهاية بالثانية.
- ✗ الرجوع كان يدوي.

## خطوات (كل واحدة ليها صاحب وميعاد)
| الخطوة | النوع | الصاحب | الميعاد |
|---|---|---|---|
| التطبيق تحت systemd بـ Restart=on-failure | منع | ali | 2026-11-05 |
| تنبيه لو 5xx > 5% لمدة دقيقة | اكتشاف | mona | 2026-11-07 |
| runbook-502.md يتجرّب في تمرين | استعداد | ali | 2026-11-10 |
~~~

«من غير لوم» (blameless) مش معناها «محدش غلط». معناها السؤال «إيه في السيستم سمح للغلطة دي تحصل وتأثر؟»، مش «مين». لأن لو الناس اتلامت، المرة الجاية هيخبّوا الغلطات، والـ postmortem هيبقى ناقص. والخطوات من غير صاحب وميعاد مبتتعملش.

والأرقام اللي بتتقاس على الشهر: MTTD (وقت لحد ما عرفنا) و MTTR (وقت لحد ما رجعت)، وعدد الحوادث لكل severity. وتفاصيل الـ SLO و error budget في تاب الكلاود (دروس «SLI / SLO / error budget» و «incident response» و «postmortem»)، وسؤال المقابلات «mitigate ثم postmortem» في تاب المعمارية.`,
          deep: {
            why: R`في الحادثة الكل متوتر، والقرارات اللي من غير ترتيب بتطوّلها: ٣ أشخاص بيجرّبوا ٣ حاجات على الإنتاج في نفس الوقت، ومحدش قال للمستخدمين، وواحد بيدوّر على السبب والموقع واقع. الترتيب الثابت والـ severity والأدوار بيشيلوا القرارات دي من الحادثة نفسها. والـ postmortem هو اللي بيحوّل الحادثة لتحسين، بدل ما تتكرر الشهر الجاي بنفس الشكل.`,
            how: R`access log فيه سطر لكل طلب بالوقت والكود، فأي سؤال عن الأثر (إمتى بدأت، وخلصت، وقد إيه) بيتجاوب بـ [[awk]] على الأعمدة: [[$4]] الوقت و [[$9]] الكود. و error log بيقول السبب المباشر من ناحية nginx ([[111]] رفض، و [[110]] timeout، و [[104]] الاتصال اتقطع). والخط الزمني بيتبني من اللوجات ورسايل القناة وسجل الأوامر، مش من الذاكرة. والـ severity بتتحدد من الأثر (كام مستخدم وأنهي خدمة وقد إيه)، مش من صعوبة المشكلة التقنية.`,
            when: R`أي حاجة بتأثر على المستخدمين دلوقتي. حتى لو SEV3 وانت لوحدك: اكتب الخط الزمني وانت شغّال (سطر لكل حاجة بالوقت)، وبعدها postmortem من ٥ سطور. والـ runbook يتكتب **قبل** الحادثة، لأهم ٥ أعطال (الـ 502 و 504 والديسك والشهادة والـ deploy البايظ)، ويتراجع بعد كل حادثة.`,
            mistakes: R`تدوّر على السبب قبل ما ترجّع الخدمة. وتصلّح من غير ما تقول في القناة. وكل الفريق في الحادثة ومحدش بيقرر. وتقول «حوالي دقيقة» بدل أرقام اللوج. وتخلط مناطق زمنية (اللوج UTC والرسايل بتوقيت القاهرة). وتمسح اللوجات وسط الحادثة. و postmortem فيه «فلان غلط» وخطوات من غير أصحاب. و [[pkill -f]] أو [[rm -rf]] من غير ما تشوف هيلمسوا إيه. وتفضّي اللوج بـ [[rm]] بدل [[: >]] فـ nginx يفضل يكتب في ملف ممسوح.`
          },
          sol: R`أثناء الحادثة: [[502 0.002864s]]، و error log [[connect() failed (111: Connection refused) while connecting to upstream]] و [[upstream: "http://127.0.0.1:8000/"]]، و [[ss]] فيه 80 بس. بعد التشغيل: [[200 0.004202s]] و 8000 بـ [[python3]]. واللوج: [[93 200]] و [[57 502]]، و [[error rate: 38.0% (57 of 150)]]، وأول 5xx [[11:34:08]] وآخره [[11:34:20]]، مطابقين لوقت [[kill]] ووقت التشغيل اللي اتطبعوا ([[app killed at 11:34:08]] و [[app back at 11:34:20]]). والـ [[pkill -f]] جوه [[bash -c]] خرج بـ ١٤٣.

اتجرّب على [[ubuntu:24.04]] (nginx 1.24، و Python 3.12، و curl 8.5، و mawk) في Docker، وأوامر [[awk]] كمان على gawk في Git Bash. مستويات الـ severity والأدوار من الممارسة الشائعة (Google SRE و PagerDuty)، وكل شركة بتكتب بتاعها.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: رتّب دول: «اكتب postmortem»، و «رجّع الخدمة»، و «حدد الـ severity»، و «اتأكد من برة»، و «أول رسالة»، و «دوّر على السبب العميق»، و «اتأكد إن الأرقام رجعت».`, done: R`الترتيب: اتأكد من برة، و severity، وأول رسالة، ورجّع الخدمة، واتأكد إن الأرقام رجعت، ودوّر على السبب، و postmortem. وكتبت ليه «رجّع» قبل «دوّر».` },
            { lvl: 'تطبيق', t: R`حدد الـ severity لكل حالة وقول ليه: (١) الدفع بيفشل لـ ١٠٪ من المستخدمين من ساعة. (٢) صفحة «عن الشركة» 404. (٣) الموقع كله 502 بقاله ٣ دقايق. (٤) الديسك ٨٥٪ وبيزيد ١٪ في اليوم. (٥) الإيميلات بتاعة إعادة كلمة السر مبتوصلش.`, done: R`إجاباتك فيها SEV2 و SEV4 و SEV1 و SEV4 (أو SEV3 لو ميعاد الامتلاء قريب) و SEV2 أو SEV3، ولكل واحدة سبب بالأثر على المستخدمين مش بصعوبة التصليح.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل access log فيه ٣٠٠ سطر على ٥ دقايق، وفيه حادثتين قصيرتين (502 مرة و 504 مرة). طلّع بـ [[awk]]: النسبة لكل دقيقة، وبداية ونهاية كل حادثة، وعدد الطلبات المتأثرة في كل واحدة.`, done: R`الأوامر بتطبع الحادثتين منفصلين بوقت بداية ونهاية صح (الـ 502 والـ 504 كل واحدة لوحدها)، والأعداد بتجمع مع الطلبات السليمة لـ ٣٠٠.` },
            { lvl: 'تطبيق', t: R`صلّح الـ postmortem ده: «الموقع وقع حوالي ساعة بالليل لأن أحمد نسي يجدد الشهادة. الحل: أحمد يبقى ياخد باله.» اكتبه من جديد بالـ template.`, done: R`النسخة الجديدة فيها أوقات بالدقيقة UTC (من لوج أو من [[openssl x509 -enddate]])، وأثر بالأرقام، وسبب سيستم (التجديد يدوي ومفيش تنبيه قبل الانتهاء)، و ٣ خطوات ليها أصحاب ومواعيد (تجديد تلقائي، وتنبيه قبل ١٤ يوم، و runbook)، ومفيش اسم شخص كسبب.` },
            { lvl: 'تحدي', t: R`تمرين حريق: في المعمل اطلب من زميل (أو اعمل سكربت عشوائي) يكسر حاجة من ٣ (يوقف التطبيق، أو يخلّيه يرد بعد ٧٠ ثانية، أو يغيّر بورت nginx). انت معاك runbook-502 و runbook-504 بس. قيس الوقت لحد التشخيص ولحد الرجوع، وحسّن الـ runbook.`, done: R`٣ تجارب متسجّلة بالوقت (MTTD و MTTR)، والتالتة أسرع من الأولى، والـ runbook اتعدّل فيه سطر على الأقل بسبب حاجة احتاجتها ومكانتش مكتوبة.` },
            { lvl: 'تحدي', t: R`اشرحها لمدير في ٥ سطور: ليه الـ postmortem «من غير لوم» بيقلل الحوادث مش بيزوّدها؟ وإيه الفرق بين خطوة «منع» وخطوة «اكتشاف» بمثال من حادثة المعمل.`, done: R`الشرح فيه: اللوم بيخلّي الناس تخبّي فالمعلومات تقل، والسؤال عن السيستم بيلاقي أسباب بتتكرر مع أي حد، والمنع (systemd بـ Restart) والاكتشاف (تنبيه على 5xx) بأمثلة المعمل.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`for t in 06 07 08 08 09 09 18 19 20 20 21 22; do
  case $t in 08|09|18|19|20) s=502 ;; *) s=200 ;; esac
  echo "127.0.0.1 - - [03/Nov/2026:11:34:$t +0000] \"GET / HTTP/1.1\" $s 166 \"-\" \"curl/8.5.0\""
done > access.log
awk '{print $9}' access.log | sort | uniq -c | awk '{print $2": "$1}'
awk '{n++} $9>=500 {e++} END {printf "error rate: %.1f%% (%d of %d)\n", 100*e/n, e, n}' access.log
echo "first 5xx: $(awk '$9>=500 {print substr($4,14,8); exit}' access.log)"
echo "last 5xx: $(awk '$9>=500 {t=substr($4,14,8)} END {print t}' access.log)"
awk '{t=substr($4,14,8); tot[t]++; if ($9>=500) err[t]++} END {for (t in tot) printf "%s %d/%d\n", t, err[t]+0, tot[t]}' access.log | sort | sed -n 3p`, expect: [R`200: 4`, R`502: 8`, R`error rate: 66.7% (8 of 12)`, R`first 5xx: 11:34:08`, R`last 5xx: 11:34:20`, R`11:34:08 2/2`] },
          ],
        },
      ],
    }
]);
