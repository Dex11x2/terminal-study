// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "التخزين والـ realtime والـ Auth",
      l: 1,
      n: "فين تحفظ التوكن، وإزاي السيرفر يكلّم العميل من غير ما يسأل، والفرق بين «انت مين» و «مسموحلك بإيه»",
      items: [
        {
          cmd: "HttpOnly cookie",
          title: "تحفظ التوكن فين في المتصفح: كوكي ولا localStorage ولا sessionStorage؟",
          desc: R`الكوكي بتتبعت مع كل طلب للسيرفر لوحدها، وحجمها حوالي 4KB، وتقدر تخليها [[HttpOnly]] فـ JavaScript ميشوفهاش. الـ localStorage حوالي 5MB لكل origin، وبيفضل لحد ما تمسحه، ومبيتبعتش للسيرفر لوحده. والـ sessionStorage زيه بس لكل تاب لوحده وبيروح لما التاب يتقفل. للتوكن: كوكي [[HttpOnly]] و [[Secure]] و [[SameSite]] أأمن، لأن أي XSS يقدر يقرا الـ localStorage ويبعته لبرا.

بس الكوكي بتفتح باب CSRF لأن المتصفح بيبعتها لوحده، والحل [[SameSite=Lax]] أو [[Strict]]، و CSRF token لو محتاج. والـ localStorage مكانه الحاجات غير الحساسة: الثيم، واللغة، ومسودة فورم.`,
          example: R`// في السيرفر (Express): كوكي الـ session
res.cookie("sid", sessionId, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 });
// في Console المتصفح
document.cookie = "theme=dark; Max-Age=31536000; Path=/; SameSite=Lax";
localStorage.setItem("lang", "ar");
sessionStorage.setItem("checkoutStep", "2");
document.cookie;`,
          try: "بعد ما تعمل login في أي موقع بتاعك، اكتب [[document.cookie]] في Console: لو التوكن ظهر يبقى مش HttpOnly. وافتح نفس الموقع في تاب جديد وشوف sessionStorage فيه إيه.",
          flag: "script",
          deep: {
            why: "مكان التوكن قرار أمني بيتسأل عنه كتير، ومفيش إجابة «صح» واحدة: فيه trade-off بين XSS و CSRF، والإنترفيوير عايز يشوف إنك شايف الاتنين.",
            how: R`الكوكي ليها خصايص: [[Domain]] و [[Path]] بيحددوا تتبعت لمين، و [[Expires]] أو [[Max-Age]] (من غيرهم بتبقى session cookie وتروح مع قفل المتصفح)، و [[HttpOnly]] تمنع [[document.cookie]] يشوفها، و [[Secure]] على HTTPS بس، و [[SameSite]] بتتحكم هل تتبعت مع طلبات جاية من موقع تاني: Strict أبدًا، و Lax مع الـ navigation العادي بس، و None دايمًا (ولازم معاها Secure). وبعض المتصفحات بتعتبر Lax هو الافتراضي لو مكتبتش حاجة.

الـ Web Storage لكل origin لوحده، و API بتاعه synchronous، وحدوده حوالي 5MB للـ localStorage و 5MB للـ sessionStorage حسب MDN. والـ sessionStorage لو فتحت نسخة من التاب بيتنسخ معاها بس بعد كده كل واحد لوحده.

والـ XSS مش بيتحل بإنك تنقل التوكن للكوكي: الكود الخبيث لسه يقدر يبعت طلبات باسم اليوزر من صفحتك. الكوكي بس بتمنعه يسرق التوكن ويستخدمه من برا.`,
            when: "Follow-ups: «بتحمي الكوكي من CSRF إزاي؟». «الـ frontend على دومين والـ API على دومين تاني، الكوكي هتوصل إزاي؟». «refresh token بتحفظه فين؟». «IndexedDB إمتى؟».",
            mistakes: R`إن الكوكي «قديمة وأضعف»: مع HttpOnly هي الأأمن للتوكن. وإن HttpOnly بيحمي من XSS خالص. وتحط بيانات حساسة أو التوكن في localStorage وتقول «مفيش XSS عندنا». و [[SameSite=None]] من غير [[Secure]] فالمتصفح يرفض الكوكي.`
          },
          teach: R`## الفكرة في جملة

المثال بيحط حاجة في كل مكان من أماكن التخزين التلاتة: كوكي من السيرفر (HttpOnly)، وكوكي من الـ JavaScript، و localStorage، و sessionStorage. وبعدين [[document.cookie]] بيكشف مين الـ JavaScript يقدر يشوفه. شغلناه فعلًا: السطر الأول في Express على [[localhost:4004/login]]، والباقي في Chromium (عن طريق Playwright) على نفس الصفحة.

---

## ١. السيرفر بيحط الكوكي

~~~js
res.cookie("sid", sessionId, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 });
~~~

[[res.cookie(name, value, options)]] في Express بيضيف header اسمه [[Set-Cookie]] على الرد. شوفناه بـ curl:

~~~text الناتج
$ curl -si http://localhost:4004/login | grep -i set-cookie
Set-Cookie: sid=s_8f2k; Max-Age=604800; Path=/; Expires=Thu, 15 Oct 2026 11:29:04 GMT; HttpOnly; Secure; SameSite=Lax
~~~

| الـ option | اللي طلع في الـ header | معناه |
|---|---|---|
| [[httpOnly: true]] | [[HttpOnly]] | [[document.cookie]] مش هيشوفها. الـ JavaScript، ومنه أي XSS، ميقدرش يقراها |
| [[secure: true]] | [[Secure]] | تتبعت على HTTPS بس (و [[localhost]] المتصفح بيعتبره آمن) |
| [[sameSite: "lax"]] | [[SameSite=Lax]] | متتبعتش مع طلبات POST جاية من موقع تاني، فبتقفل أغلب CSRF |
| [[maxAge: 7 * 24 * 3600 * 1000]] | [[Max-Age=604800]] | Express بياخدها **بالمللي ثانية** (604,800,000) وبيكتبها في الـ header **بالثواني**: أسبوع |

و [[Path=/]] افتراضي: تتبعت مع أي مسار في الموقع. ومن هنا ورايح المتصفح بيبعتها **لوحده** مع كل طلب للدومين ده.

---

## ٢. الـ JavaScript في الصفحة

~~~js
document.cookie = "theme=dark; Max-Age=31536000; Path=/; SameSite=Lax";
localStorage.setItem("lang", "ar");
sessionStorage.setItem("checkoutStep", "2");
document.cookie;
~~~

- [[document.cookie = "..."]]: شكلها assignment بس هي **بتضيف** كوكي واحدة، مش بتمسح الباقي. [[Max-Age=31536000]] سنة بالثواني.
- [[localStorage.setItem(key, value)]]: خزّن قيمة نص لكل الـ origin، ومبتخلصش.
- [[sessionStorage.setItem]]: نفس الشكل، بس للتاب ده بس.
- [[document.cookie]] لوحده: اقرا كل الكوكيز اللي الـ JavaScript مسموحله يشوفها.

الناتج الحقيقي في Chromium:

~~~text الناتج
document.cookie                       → "theme=dark"
localStorage.getItem("lang")          → "ar"
sessionStorage.getItem("checkoutStep") → "2"
~~~

[[sid]] **مش ظاهرة** رغم إنها موجودة. سألنا Playwright عن كل كوكيز المتصفح:

~~~text الناتج
sid    httpOnly=true  secure=true  sameSite=Lax
theme  httpOnly=false secure=false sameSite=Lax
~~~

يعني المتصفح شايلها وبيبعتها، بس مخبّيها عن الـ JavaScript. ده بالظبط اللي عايزينه للتوكن.

---

## ٣. تاب جديد على نفس الموقع

فتحنا صفحة تانية على [[localhost:4004]] وقرينا:

~~~text الناتج
sessionStorage.length → 0
localStorage.getItem("lang") → "ar"
document.cookie → "theme=dark"
~~~

الـ sessionStorage فاضي لأنه لكل تاب لوحده. الـ localStorage والكوكيز مشتركين بين كل تابات نفس الـ origin.

---

## ٤. المقارنة

| | كوكي HttpOnly | localStorage | sessionStorage |
|---|---|---|---|
| الحجم | حوالي 4KB | حوالي 5MB | حوالي 5MB |
| بيتبعت للسيرفر لوحده | أيوه، مع كل طلب | لأ | لأ |
| الـ JS يقراه | لأ | أيوه | أيوه |
| بيعيش لحد | Max-Age أو قفل المتصفح | ما تمسحه | قفل التاب |
| الخطر | CSRF (يتقفل بـ SameSite) | XSS يسرقه | XSS يسرقه |

---

## الخلاصة

- التوكن: كوكي [[HttpOnly; Secure; SameSite=Lax]]، لأن XSS ميقدرش يقراها ويبعتها لبرا.
- الكوكي بتتبعت لوحدها، فالـ CSRF بيتقفل بـ SameSite و CSRF token لو محتاج.
- localStorage للحاجات اللي مش سرية: الثيم، واللغة، ومسودة.

> HttpOnly بتمنع **سرقة** التوكن، مش XSS نفسه: كود خبيث على صفحتك لسه يقدر يبعت طلبات باسم اليوزر والمتصفح يحط الكوكي معاها.`,
          lines: [
            "السيرفر بيحط كوكي الـ session: JavaScript ميقراهاش، و HTTPS بس، ومبتتبعتش من مواقع تانية في طلبات POST، ومدتها أسبوع (بالمللي ثانية).",
            "كوكي عادية من JavaScript لحاجة مش حساسة زي الثيم، لمدة سنة.",
            "اللغة في localStorage: بتفضل بعد قفل المتصفح.",
            "خطوة الـ checkout في sessionStorage: بتروح مع قفل التاب.",
            "اعرض الكوكيز اللي JavaScript يقدر يشوفها: sid مش هتظهر."
          ],
          sol: R`لو التوكن متحفوظ صح، [[document.cookie]] هيطلع كوكيز زي [[theme=dark]] بس، واسم كوكي الـ session مش موجود فيها رغم إنه ظاهر في Application ← Cookies وعليه علامة HttpOnly. ولو شفت التوكن نفسه في الناتج (أو في localStorage)، يبقى أي XSS على الموقع يقدر يسرقه ويبعته لبرا، وده الجواب اللي الانترفيوير مستنيه.

وفي التاب الجديد: [[sessionStorage.length]] هيطلع 0، لأن الـ sessionStorage لكل تاب لوحده، بس الـ localStorage والكوكيز مشتركين بين كل تابات نفس الـ origin. الاستثناء اللي بيلخبط الناس: لو عملت «Duplicate tab»، المتصفح بينسخ الـ sessionStorage للتاب الجديد.

وتقدر تقول الخلاصة كده: «الـ session token في كوكي HttpOnly و Secure و SameSite، ومع كده لسه محتاج حماية CSRF للطلبات اللي بتغيّر داتا. localStorage للحاجات اللي مش سرية زي الـ theme واللغة».`
        },
        {
          cmd: "اتجاه واحد ولا اتنين",
          title: "عايز تبعت تحديثات لحظية لليوزر: polling ولا WebSocket ولا SSE؟",
          desc: R`الـ polling: العميل بيسأل كل كام ثانية، بسيط بس فيه طلبات كتير فاضية وتأخير. الـ long polling: الطلب بيفضل مفتوح لحد ما يبقى فيه جديد. الـ SSE: اتصال HTTP واحد مفتوح، والسيرفر بيبعت عليه في اتجاه واحد، والمتصفح بيعمل reconnect لوحده. الـ WebSocket: قناة في الاتجاهين بعد upgrade من HTTP، للشات والألعاب والتعاون اللحظي.

وبختار حسب الاتجاه والتكرار: إشعارات وتحديث حالة order وستريم رد AI كلمة كلمة ← SSE. شات أو محرر مشترك ← WebSocket. داتا بتتغير كل كام دقيقة ← polling عادي وخلاص.`,
          example: R`// احفظه sse.mjs وشغّله، وفي ترمنال تاني: curl -N http://localhost:3000
import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
  const t = setInterval(() => res.write($__btdata: $__{new Date().toISOString()}\n\n$__bt), 1000);
  req.on("close", () => clearInterval(t));
}).listen(3000);`,
          try: "شغّل السيرفر وتابع بـ [[curl -N]]. بعدين من صفحة على نفس الـ origin (أو ضيف header الـ CORS) جرّب [[new EventSource(url).onmessage = e => console.log(e.data)]]، واقفل السيرفر وافتحه وشوف الـ reconnect لوحده.",
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة على قد المشكلة ومش بتحط WebSocket في كل حتة. وبيفتح كلام عن الـ scaling، لأن الاتصالات المفتوحة ليها تمن.",
            how: R`الـ WebSocket بيبدأ كطلب HTTP فيه [[Upgrade: websocket]]، والسيرفر يرد [[101 Switching Protocols]]، وبعدها نفس اتصال الـ TCP بيتحول لقناة frames في الاتجاهين. و [[wss://]] هو النسخة المشفرة.

Socket.IO مش WebSocket صافي: ليه بروتوكول خاص فوقه (rooms، و acks، و reconnect، و fallback لـ polling)، فعميل WebSocket عادي مش هيكلّم سيرفر Socket.IO.

الـ SSE مجرد رد HTTP مبيخلصش بـ content type [[text/event-stream]]، وكل رسالة [[data: ...]] وبعدها سطر فاضي. المتصفح بيعمل reconnect لوحده وبيبعت [[Last-Event-ID]]. على HTTP/1.1 المتصفح بيسمح بحوالي ٦ اتصالات للدومين، فكذا تاب مفتوح ممكن يخلّصهم، و HTTP/2 بيحل ده. وخلي بالك إن Nginx بيعمل buffering للردود، فلازم تقفله للـ SSE.

والـ scaling: الاتصالات دي stateful. لو عندك سيرفرين، يوزر على سيرفر ١ ويوزر على سيرفر ٢ مش هيشوفوا رسايل بعض، فبتحتاج pub/sub مشترك (زي Redis) و sticky sessions أحيانًا. التفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «هتعمل scale لـ WebSocket على أكتر من سيرفر إزاي؟». «الاتصال وقع، بتعمل إيه في الرسايل اللي فاتت؟». «ليه شات بوتس الـ AI بتستخدم SSE؟». «Socket.IO هو WebSocket؟».",
            mistakes: R`WebSocket لكل حاجة حتى لو التحديثات في اتجاه واحد. وتنسى إن الاتصالات stateful فالرسالة توصل لنص اليوزرز بعد ما تزوّد سيرفر. وتنسى الـ reconnect والرسايل اللي ضاعت وقت الانقطاع. و polling كل ثانية من آلاف اليوزرز على endpoint تقيل.`
          },
          teach: R`## الفكرة في جملة

المثال سيرفر SSE (Server-Sent Events) في ٥ سطور: رد HTTP **مبيخلصش**، والسيرفر بيكتب عليه رسالة كل ثانية. الهدف تشوف إن الـ «realtime» ده مش سحر: نص عادي على اتصال HTTP مفتوح. شغلناه بـ Node 24 على ويندوز، وتابعناه بـ curl، وبـ [[EventSource]] من Node.

---

## ١. السيرفر

~~~js
import http from "node:http";
http.createServer((req, res) => {
~~~

- [[node:http]]: موديول HTTP الجاهز في Node، من غير Express.
- [[createServer(handler)]]: الـ handler بيتنادى مع كل طلب، ومعاه [[req]] (الطلب) و [[res]] (الرد).

---

## ٢. الـ headers

~~~js
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
~~~

- [[writeHead(status, headers)]]: ابعت سطر الـ status والـ headers دلوقتي، من غير body لسه.
- [[text/event-stream]]: النوع اللي بيقول للمتصفح «ده SSE». من غيره [[EventSource]] بيرفض الاتصال.
- [[no-cache]]: متخزّنش الرد ده في أي كاش، كل رسالة لحظتها.

---

## ٣. رسالة كل ثانية

~~~js
  const t = setInterval(() => res.write($__btdata: $__{new Date().toISOString()}\n\n$__bt), 1000);
~~~

من جوه لبرا:

1. [[new Date().toISOString()]]: الوقت دلوقتي كنص بصيغة ISO، زي [[2026-10-08T11:30:09.153Z]]. الـ [[Z]] يعني توقيت UTC.
2. الـ backticks مع [[$__{...}]]: template string بيحط القيمة جوه النص.
3. [[data: ...]] ثم [[\n\n]]: ده شكل رسالة SSE. كل سطر بيبدأ بـ [[data:]]، و**سطر فاضي** (يعني [[\n]] مرتين) بيقول «الرسالة خلصت».
4. [[res.write(...)]]: اكتب على الرد **من غير ما تقفله**. ([[res.end]] كانت هتقفله.)
5. [[setInterval(fn, 1000)]]: كرر كل ١٠٠٠ مللي ثانية، ورجّع رقم التايمر في [[t]] عشان نوقفه.

---

## ٤. التنضيف

~~~js
  req.on("close", () => clearInterval(t));
}).listen(3000);
~~~

- [[req.on("close", ...)]]: لما العميل يقفل الاتصال.
- [[clearInterval(t)]]: وقّف التايمر. من غيره السيرفر هيفضل يكتب على اتصال ميت كل ثانية، ومع كل عميل جديد تايمر زيادة (memory leak).
- [[listen(3000)]]: اسمع على بورت 3000.

---

## ٥. التشغيل بـ curl

~~~bash
curl -N -i http://localhost:3000
~~~

[[-N]] (no-buffer): اطبع كل حاجة أول ما توصل. و [[-i]] ضفناه عشان نشوف الـ headers. وقفناه بعد ٣ ثواني بـ [[--max-time 3.5]]:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
Transfer-Encoding: chunked

data: 2026-10-08T11:30:09.153Z

data: 2026-10-08T11:30:10.155Z

data: 2026-10-08T11:30:11.169Z
~~~

- [[Transfer-Encoding: chunked]]: Node حطها لوحده، معناها «مش عارف الحجم الكلي، هبعت حتت». ودي اللي بتخلي الرد يفضل مفتوح.
- رسالة كل ثانية، وبين كل رسالتين السطر الفاضي.

ولوج السيرفر بعد ما curl قفل:

~~~text لوج السيرفر
client closed, timer cleared
~~~

(ضفنا الـ [[console.log]] ده جوه الـ [[close]] عشان نتأكد إنه بيشتغل.)

---

## ٦. العميل: [[EventSource]]

في المتصفح [[EventSource]] جاهز. في Node 24 لسه تجريبي، فشغلناه بـ [[--experimental-eventsource]]:

~~~js
const es = new EventSource("http://localhost:3000");
es.onopen = () => console.log("open, readyState =", es.readyState);
es.onmessage = e => console.log("message:", e.data);
~~~

~~~text الناتج (بعد رسالتين قفلنا بـ es.close())
open, readyState = 1
message: 2026-10-08T11:30:18.703Z
message: 2026-10-08T11:30:19.717Z
closed, readyState = 2
~~~

[[e.data]] فيها النص اللي بعد [[data:]] من غير الكلمة. و [[readyState]]: 0 بيوصل (أو بيعيد المحاولة)، و 1 مفتوح، و 2 مقفول ومش هيحاول تاني. لو السيرفر وقع، المتصفح بيرجع لـ 0 ويعيد الاتصال **لوحده**، ودي ميزة SSE على WebSocket.

---

## ٧. نختار إيه؟

| | polling | SSE | WebSocket |
|---|---|---|---|
| الاتجاه | العميل بيسأل | سيرفر ← عميل | الاتنين |
| البروتوكول | HTTP عادي | HTTP رد مفتوح | upgrade لبروتوكول تاني (101) |
| reconnect | مش محتاج | لوحده | انت تكتبه |
| أمثلة | داتا بتتغير كل دقايق | إشعارات، حالة order، رد AI كلمة كلمة | شات، لعبة، محرر مشترك |

---

## الخلاصة

- SSE = رد HTTP بـ [[text/event-stream]] مبيخلصش، ورسايل [[data: ...]] بينهم سطر فاضي.
- لازم توقف التايمر لما العميل يقفل.
- اتجاه واحد يبقى SSE، اتجاهين يبقى WebSocket، تحديث نادر يبقى polling.

> الاتصالات المفتوحة دي stateful: لو عندك سيرفرين، محتاج pub/sub مشترك (زي Redis) عشان الرسالة توصل لليوزرز على السيرفر التاني.`,
          lines: [
            "موديول HTTP في Node.",
            "سيرفر بسيط، ولكل طلب:",
            "رد مبيخلصش من نوع event-stream، ومن غير كاش.",
            "كل ثانية ابعت رسالة: [[data:]] وبعدها سطر فاضي يقفل الرسالة.",
            "لما العميل يقفل، وقّف التايمر عشان متسيبش حاجة شغالة على الفاضي.",
            "اسمع على بورت 3000."
          ],
          sol: R`[[curl -N]] هيطبع سطر [[data: 2026-...Z]] كل ثانية وبينهم سطر فاضي، وده شكل الـ SSE: نص عادي على HTTP، وكل رسالة بتخلص بسطرين جداد. من غير [[-N]] ممكن تشوف السطور بتيجي متجمعة لأن curl بيعمل buffering.

في المتصفح: [[onmessage]] بيطبع الوقت كل ثانية. ولما تقفل السيرفر هيجيلك [[onerror]] و [[readyState]] بـ 0 (يعني CONNECTING مش CLOSED)، والمتصفح يفضل يحاول لوحده كل كام ثانية (حوالي ٣ ثواني في Chrome، أو القيمة اللي السيرفر يبعتها في [[retry:]]). أول ما السيرفر يرجع هيجيلك [[onopen]] والرسايل تكمل من غير ولا سطر كود منك. جربتها في Chromium بالسيرفر اللي تحت: الرسايل وقفت، وجه error مرتين، وبعد ما السيرفر رجع اتفتح الاتصال لوحده.

النتيجة الغلط: [[readyState]] بـ 2 والمتصفح بطّل يحاول. ده بيحصل لو السيرفر رد بـ status غير 200 أو Content-Type مش [[text/event-stream]]، أو لو الصفحة على origin تاني والسيرفر مش باعت [[Access-Control-Allow-Origin]].`,
          solCode: R`// sse.mjs: نفس السيرفر مع CORS و retry
import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });
  res.write("retry: 2000\n\n");
  const t = setInterval(() => res.write($__btdata: $__{new Date().toISOString()}\n\n$__bt), 1000);
  req.on("close", () => clearInterval(t));
}).listen(3000);
// في Console أي صفحة:
// const es = new EventSource("http://localhost:3000");
// es.onmessage = e => console.log(e.data);
// es.onerror = () => console.log("error, readyState =", es.readyState);`
        },
        {
          cmd: "authentication و authorization",
          title: "إيه الفرق بين إن السيرفر يعرف انت مين، وإنه يقرر مسموحلك تعمل إيه؟",
          desc: R`الأول: انت مين؟ (باسورد، OAuth، كود OTP، passkey). التاني: مسموحلك بإيه؟ (roles، ملكية، permissions). الأول بيحصل مرة في الـ login ويطلّع session أو token، والتاني لازم يحصل في كل طلب. وغلط التاني هو رقم ١ في OWASP: يوزر يغيّر الـ id في الـ URL ويشوف داتا حد تاني.

لو الأول فشل ترجّع 401، ولو التاني فشل 403. وفيه RBAC (roles زي admin و editor) و ABAC (قواعد على الخصايص، زي «صاحب الـ order بس»)، وأغلب المشاريع بتحتاج الاتنين.`,
          example: R`function requireAuth(req, res, next) {
  const user = verifySession(req.cookies.sid);
  if (!user) return res.status(401).json({ error: "login first" });
  req.user = user;
  next();
}
const requireRole = role => (req, res, next) =>
  req.user.role === role ? next() : res.status(403).json({ error: "forbidden" });
app.delete("/users/:id", requireAuth, requireRole("admin"), deleteUser);`,
          try: "في API عندك: سجّل كيوزر عادي، وخد id بتاع order يوزر تاني من الداتابيز، واطلبه. لو رجع الداتا عندك ثغرة IDOR: صلّحها بإن الـ query نفسها تشمل [[userId]].",
          flag: "script",
          deep: {
            why: "الخلط بينهم أشهر ثغرة في التطبيقات الحقيقية: الـ login سليم، بس أي يوزر مسجّل يقدر يوصل لأي حاجة. والإنترفيوير عايز يسمع إنك بتشيك الصلاحية على السيرفر في كل طلب.",
            how: R`الـ authentication بيطلّع هوية: session id في كوكي والسيرفر شايل الحالة، أو JWT موقّع شايل الهوية جواه. بعد كده كل طلب بيعدّي على middleware يحوّل الكوكي أو التوكن لـ [[req.user]].

الـ authorization بيحصل على مستويات: على الـ route (أدمن بس)، وعلى الـ resource نفسه (صاحب الـ order بس)، وعلى الحقول (اليوزر ميعدّلش [[role]] بتاعه). والأمان الحقيقي في الـ query نفسها: [[where: { id, userId: req.user.id }]] بدل ما تجيب بالـ id وتنسى تشيك.

وفيه طبقة تالتة في الداتابيز نفسها زي Row Level Security في PostgreSQL و Supabase: حتى لو الكود نسي، الداتابيز ترفض. وإخفاء الزرار في الـ UI راحة لليوزر مش حماية. التفاصيل في تاب «الأمان».`,
            when: "Follow-ups: «إزاي تمنع يوزر يشوف order يوزر تاني؟». «الـ checks تحطها في middleware ولا في الـ service؟». «RBAC ولا ABAC؟». «ليه إخفاء الزرار مش كفاية؟». «إيه هو IDOR؟».",
            mistakes: R`تخلط الاتنين، أو تفتكر إن التوكن الصحيح كفاية: التوكن بيثبت انت مين بس. وتعمل الصلاحيات في الـ frontend بس. وتجيب الـ resource بالـ id وخلاص. وتسيب اليوزر يبعت [[role]] أو [[isAdmin]] في الـ body وتحفظه (mass assignment).`
          },
          teach: R`## الفكرة في جملة

المثال سلسلة من ٢ middleware قبل الـ handler: الأول [[requireAuth]] بيسأل «انت مين؟» (authentication)، والتاني [[requireRole("admin")]] بيسأل «مسموحلك؟» (authorization). شغلناه في Express 5 على ويندوز بعد ما عملنا [[verifySession]] بسيطة: الـ session [[s_ali]] ليوزر عادي، و [[s_admin]] لأدمن.

---

## ١. [[requireAuth]]: انت مين؟

~~~js
function requireAuth(req, res, next) {
  const user = verifySession(req.cookies.sid);
  if (!user) return res.status(401).json({ error: "login first" });
  req.user = user;
  next();
}
~~~

- الـ middleware في Express دالة بتاخد [[(req, res, next)]]. يا ترد وتوقف السلسلة، يا تنادي [[next()]] فيكمّل للي بعدها.
- [[req.cookies.sid]]: قيمة كوكي [[sid]]. ([[req.cookies]] بتيجي من مكتبة [[cookie-parser]].)
- [[verifySession]]: دالتك اللي بتدوّر على الـ session في الـ store (داتابيز أو Redis) وترجّع اليوزر أو [[null]].
- [[if (!user) return res.status(401)...]]: مفيش session أو مزيفة، فـ 401.
- [[req.user = user]]: حط اليوزر على الطلب، فكل اللي بعدك يعرف مين.

---

## ٢. [[requireRole]]: دالة بترجّع middleware

~~~js
const requireRole = role => (req, res, next) =>
  req.user.role === role ? next() : res.status(403).json({ error: "forbidden" });
~~~

فيه سهمين [[=>]] ورا بعض: [[requireRole]] بتاخد [[role]] و**بترجّع دالة**. جربنا:

~~~text الناتج
typeof requireRole("admin")  → function
~~~

فـ [[requireRole("admin")]] بيتنفّذ مرة واحدة وقت تعريف الـ route، والدالة اللي رجعت هي الـ middleware اللي بيشتغل مع كل طلب. ده اسمه factory.

- [[condition ? a : b]]: الـ ternary. لو الـ role مطابق [[next()]]، غير كده 403.
- بتعتمد على [[req.user]]، فلازم تيجي **بعد** [[requireAuth]].

---

## ٣. الـ route

~~~js
app.delete("/users/:id", requireAuth, requireRole("admin"), deleteUser);
~~~

الترتيب هو ترتيب التنفيذ: انت مين ← أدمن؟ ← امسح. جربنا [[DELETE /users/9]] بأربع حالات:

~~~text الناتج
من غير كوكي            → HTTP/1.1 401 Unauthorized  {"error":"login first"}
sid=fake               → HTTP/1.1 401 Unauthorized  {"error":"login first"}
sid=s_ali (user)       → HTTP/1.1 403 Forbidden     {"error":"forbidden"}
sid=s_admin (admin)    → HTTP/1.1 200 OK            {"deleted":"9"}
~~~

([[curl -b "sid=s_ali"]]: [[-b]] بيبعت كوكي مع الطلب.)

| السؤال | مين بيجاوبه | لو فشل |
|---|---|---|
| انت مين؟ | [[requireAuth]] | 401 |
| مسموحلك؟ | [[requireRole]] | 403 |

---

## ٤. الثغرة اللي الـ role مش بيمسكها: IDOR

الـ role بيجاوب «أدمن ولا لأ». بس [[GET /orders/:id]] مفتوح لأي يوزر مسجّل، والسؤال الحقيقي «الـ order **ده** بتاعك؟». لو جبت الـ order بالـ id وخلاص، أي يوزر يغيّر الرقم في الـ URL يشوف orders غيره. ده IDOR (Insecure Direct Object Reference).

الحل في الـ solCode إن الشرط يبقى جوه الـ query (صيغة Prisma، من الـ docs):

~~~js
const order = await db.order.findFirst({
  where: { id: req.params.id, userId: req.user.id }
});
~~~

- [[findFirst]]: أول صف يطابق كل الشروط.
- [[where: { id, userId }]]: الـ id ده **و** صاحبه اليوزر الحالي. نفس الكلام في SQL: [[WHERE id = $1 AND user_id = $2]].
- لو الـ order بتاع حد تاني، الـ query مبترجّعش حاجة، فبيرد 404.

ليه أحسن من [[if]] بعد ما تجيب؟ لأن الشرط مستحيل يتنسي: مفيش طريقة تجيب الداتا من غيره.

---

## الخلاصة

| | authentication | authorization |
|---|---|---|
| السؤال | انت مين؟ | مسموحلك بإيه؟ |
| إمتى | مرة في الـ login، وبعدين الـ session بتثبته | في **كل** طلب |
| الأدوات | باسورد، OAuth، OTP، passkey | roles (RBAC)، ملكية وقواعد (ABAC) |
| لو فشل | 401 | 403 (أو 404 عشان متكشفش إن الحاجة موجودة) |

> إخفاء الزرار في الـ UI راحة لليوزر مش حماية. الصلاحية بتتشيك على السيرفر، ويُفضّل جوه الـ query نفسها.`,
          lines: [
            "middleware بيتأكد إن فيه يوزر.",
            "حوّل كوكي الـ session ليوزر (دالة بتاعتك بتدوّر في الـ sessions).",
            "مفيش يوزر: 401، سجّل دخول.",
            "حط اليوزر على الطلب عشان اللي بعدك يستخدمه.",
            "كمّل للي بعده.",
            "قفلة.",
            "middleware بيتعمل بـ role: بيرجّع middleware.",
            "لو الـ role مطابق كمّل، غير كده 403: عارفينك بس مش مسموحلك.",
            "المسح: لازم يوزر مسجّل، ولازم أدمن، وبعدين الـ handler."
          ],
          sol: R`لو الطلب رجّع order اليوزر التاني بـ 200، دي ثغرة IDOR (أو BOLA بلغة OWASP API)، وهي أشهر ثغرة في الـ APIs. الـ authentication اشتغل (السيرفر عرف انت مين)، بس الـ authorization ناقص: محدش سأل «الأوردر ده بتاعك؟».

الحل إن شرط الملكية يبقى جوه الـ query نفسها، مش [[if]] بعد ما تجيب الداتا وتنسى تكتبه في route تاني. بعد التعديل نفس الطلب يرجع 404 (أو 403 لو عايز تبان إن الأوردر موجود)، وطلب اليوزر لأوردره هو يرجع 200. واختبرها: اكتب test بيعمل login بيوزر ويطلب أوردر يوزر تاني ويتوقع 404، عشان متتفتحش تاني مع أي refactor.`,
          solCode: R`// Prisma: الشرط جوه الـ where
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });
  if (!order) return res.status(404).json({ error: "not found" });
  res.json(order);
});
// نفس الفكرة بـ SQL:
// SELECT * FROM orders WHERE id = $1 AND user_id = $2`
        },
        {
          cmd: "header.payload.signature",
          title: "الـ token اللي شكله xxx.yyy.zzz: جواه إيه، ومين يقدر يقراه، وإيه عيوبه؟",
          desc: R`JWT تلات أجزاء base64url بينهم نقط: header فيه نوع التوقيع (زي HS256)، و payload فيه الـ claims ([[sub]] و [[exp]] و [[role]])، و signature. أي حد يقدر يقرا الـ payload لأنه encoded مش encrypted، بس محدش يقدر يعدّله من غير ما التوقيع يبوظ. فالسيرفر بيتحقق من التوقيع ومن [[exp]] من غير ما يسأل الداتابيز، ودي ميزته: stateless.

وعيبه الكبير: مينفعش تلغيه قبل ما وقته يخلص. عشان كده الـ access token قصير (دقايق) ومعاه refresh token أطول ممكن يتلغي من الداتابيز. والبديل الـ session: ID عشوائي في كوكي والسيرفر شايل الحالة، سهل تلغيه بس محتاج store مشترك لو عندك كذا سيرفر.`,
          example: R`// احفظه jwt.mjs وشغّله: node jwt.mjs
import { createHmac } from "node:crypto";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const header = b64({ alg: "HS256", typ: "JWT" });
const payload = b64({ sub: "42", role: "user", exp: Math.floor(Date.now() / 1000) + 900 });
const sig = createHmac("sha256", "YOUR_SECRET").update($__bt$__{header}.$__{payload}$__bt).digest("base64url");
console.log($__bt$__{header}.$__{payload}.$__{sig}$__bt);
console.log(JSON.parse(Buffer.from(payload, "base64url").toString()));
// { sub: '42', role: 'user', exp: 1790700000 }`,
          try: "شغّل السكربت، وخد التوكن وحطه في jwt.io: هيقراه من غير السر. بعدين غيّر حرف في الـ payload وشوف إن التوقيع بقى invalid. ده الفرق بين encoded و signed.",
          flag: "script",
          deep: {
            why: "JWT في كل مشروع تقريبًا، وأغلب الناس بتستخدمه من غير ما تعرف إنه مقروء أو إنه مبيتلغيش. السؤال بيكشف ده بسرعة.",
            how: R`التوقيع HS256 هو HMAC بسر واحد: نفس السر بيوقّع وبيتحقق، فأي سيرفر بيتحقق لازم يبقى معاه السر. RS256 أو ES256 بمفتاحين: الـ private بيوقّع في سيرفر الـ auth بس، والـ public بيتوزع على أي خدمة تتحقق. ده الأنسب لو فيه أكتر من خدمة.

التحقق الصح: المكتبة تحسب التوقيع وتقارنه، وتشيك [[exp]] و [[nbf]]، ولو محددين [[iss]] و [[aud]]. ولازم تحدد الـ algorithms المسموحة، عشان توكن جاي بـ [[alg: none]] أو algorithm تاني ميتقبلش.

الإلغاء: access token قصير (مثلًا ١٥ دقيقة)، و refresh token متخزن في الداتابيز وبيتغير كل ما يستخدم (rotation)، فالـ logout بيمسح الـ refresh token. ولو محتاج إلغاء فوري: denylist بالـ [[jti]] أو رقم version على اليوزر، وساعتها رجعت تسأل الداتابيز. والتوكن بيتبعت مع كل طلب، فكل claim بتزوّده بيكبّر كل طلب.`,
            when: "Follow-ups: «session ولا JWT؟». «بتعمل logout إزاي بـ JWT؟». «HS256 ولا RS256؟». «refresh token rotation يعني إيه؟». «التوكن ده بتحفظه فين في المتصفح؟».",
            mistakes: R`إن JWT مشفّر فتحط فيه داتا حساسة. و [[jwt.decode]] بدل [[jwt.verify]] (الأولى مبتتحققش من حاجة). ومتحددش الـ algorithms. و access token صالح أسبوع ومفيش طريقة تلغيه. وسر ضعيف زي [[secret123]] بيتكسر brute force من توكن واحد.`
          },
          teach: R`## الفكرة في جملة

السكربت بيعمل JWT بإيده من غير مكتبة: تلات أجزاء، اتنين منهم JSON متحوّل base64url، والتالت توقيع HMAC. بعدها بيفك الـ payload **من غير السر** عشان يثبت إن أي حد يقدر يقراه. شغلناه بـ Node 24 على ويندوز، ومعاه سكربت الـ solCode اللي بيتحقق.

---

## ١. الاستيراد ودالة [[b64]]

~~~js
import { createHmac } from "node:crypto";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
~~~

- [[{ createHmac }]]: هات الدالة دي بس من موديول [[crypto]] الجاهز.
- [[b64]] بتعمل ٣ خطوات من جوه لبرا:
  - [[JSON.stringify(o)]]: الـ object يبقى نص JSON.
  - [[Buffer.from(...)]]: النص يبقى bytes.
  - [[.toString("base64url")]]: الـ bytes تتكتب بحروف آمنة في URL. base64url زي base64 بس [[-]] و [[_]] بدل [[+]] و [[/]]، ومن غير [[=]] في الآخر.

---

## ٢. الـ header والـ payload

~~~js
const header = b64({ alg: "HS256", typ: "JWT" });
const payload = b64({ sub: "42", role: "user", exp: Math.floor(Date.now() / 1000) + 900 });
~~~

- [[alg: "HS256"]]: التوقيع HMAC بـ SHA-256 (بسر واحد).
- [[sub]] (subject): اليوزر مين. و [[role]] claim بتاعتنا.
- [[exp]] (expiration): وقت الانتهاء بالـ **ثواني** من 1970. [[Date.now()]] بيرجّع **مللي ثانية**، فبنقسم على 1000 و [[Math.floor]] يشيل الكسر، و [[+ 900]] يعني بعد ١٥ دقيقة.

والـ header بعد [[b64]]:

~~~text الناتج
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ←   {"alg":"HS256","typ":"JWT"}
~~~

عشان كده كل JWT في الدنيا بيبدأ بـ [[eyJ]]: ده [[{"]] بالـ base64.

---

## ٣. التوقيع

~~~js
const sig = createHmac("sha256", "YOUR_SECRET").update($__bt$__{header}.$__{payload}$__bt).digest("base64url");
~~~

- [[createHmac("sha256", secret)]]: جهّز HMAC بالسر.
- [[.update(...)]]: البيانات اللي هنوقّع عليها: الـ header والـ payload بينهم نقطة، **بالظبط** زي ما هيتبعتوا.
- [[.digest("base64url")]]: احسب النتيجة واكتبها base64url.

النتيجة ٣٢ byte (SHA-256 = 256 bit)، ولما اتكتبت base64url بقت ٤٣ حرف. محدش يقدر يحسبها من غير السر.

---

## ٤. التوكن وفكّه

~~~js
console.log($__bt$__{header}.$__{payload}.$__{sig}$__bt);
console.log(JSON.parse(Buffer.from(payload, "base64url").toString()));
~~~

~~~text الناتج (التوقيع مختصر)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzkxNDU5OTkzfQ.lat3j…3GmU
{ sub: '42', role: 'user', exp: 1791459993 }
~~~

السطر التاني عمل العكس: base64url ← bytes ← نص ← object، **من غير أي سر**. ده معنى «encoded مش encrypted».

---

## ٥. التحقق (الـ solCode)

~~~js
function verify(token) {
  const [h, p, s] = token.split(".");
  const expected = Buffer.from(sign($__bt$__{h}.$__{p}$__bt));
  const got = Buffer.from(s);
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return "invalid signature";
~~~

- [[const [h, p, s] = token.split(".")]]: قسّم على النقط، و destructuring يحط كل جزء في متغير.
- [[expected]]: احسب التوقيع **من جديد** على الـ header والـ payload اللي جايين.
- [[timingSafeEqual]]: قارن الاتنين في وقت ثابت. المقارنة العادية [[===]] بتقف عند أول حرف مختلف، والفرق في الوقت ممكن يسرّب التوقيع حرف حرف. وهي بترمي error لو الطولين مختلفين، عشان كده شيك الطول الأول.

~~~js
  const payload = JSON.parse(Buffer.from(p, "base64url").toString());
  if (payload.exp < Date.now() / 1000) return "expired";
  return payload;
}
~~~

بعد التوقيع بس نصدّق الـ payload، ونشيك [[exp]].

جربنا ٣ توكنات:

~~~text الناتج
{ sub: '42', role: 'user', exp: 1791459993 }     ← التوكن السليم
invalid signature                                ← غيّرنا role لـ admin وسبنا التوقيع القديم
expired                                          ← توكن exp بتاعه من دقيقة فاتت
~~~

التزوير فشل لأن التوقيع اتحسب على [[role: "user"]]، وعشان تعمل توقيع جديد لـ [[admin]] محتاج السر.

---

## الخلاصة

| الجزء | جواه | مين يقراه | مين يعدّله |
|---|---|---|---|
| header | [[alg]] و [[typ]] | أي حد | محدش من غير ما التوقيع يبوظ |
| payload | [[sub]] و [[exp]] و claims | أي حد | محدش من غير ما التوقيع يبوظ |
| signature | HMAC على الاتنين | — | اللي معاه السر بس |

- الميزة: السيرفر بيتحقق من غير داتابيز (stateless).
- العيب: مينفعش يتلغي قبل [[exp]]، فالـ access token قصير ومعاه refresh token يتلغي.
- متحطش سر في الـ payload، واستخدم [[verify]] مش [[decode]]، وحدد الـ algorithms المسموحة.`,
          lines: [
            "HMAC من crypto المدمج في Node.",
            "دالة صغيرة: object ← JSON ← base64url.",
            "الـ header: التوقيع HS256.",
            "الـ payload: اليوزر 42، والـ role، وبيخلص بعد ١٥ دقيقة (بالثواني).",
            "التوقيع: HMAC على «header.payload» بالسر.",
            "التوكن الكامل: تلات أجزاء بنقط.",
            "فك الـ payload من غير أي سر: أي حد يقدر يقراه."
          ],
          sol: R`jwt.io هيعرض الـ header [[{"alg":"HS256","typ":"JWT"}]] والـ payload [[{"sub":"42","role":"user","exp":...}]] من غير أي سر، لأن الجزئين دول base64url بس مش مشفرين. وتحت هيقول Invalid Signature لحد ما تكتب [[YOUR_SECRET]] في خانة الـ secret، ساعتها يقول Signature Verified.

ولما تغيّر حرف في الـ payload (أو تغيّر [[role]] لـ [[admin]] وتعمل encode تاني)، التوقيع مبقاش مطابق، والسيرفر المفروض يرفضه. السكربت اللي تحت بيعمل ده بالظبط وطلّع: [[{ sub: '42', role: 'user', exp: ... }]] للتوكن الأصلي، و [[invalid signature]] للمزوّر. يعني: أي حد يقدر يقرا، بس محدش يقدر يغيّر من غير السر. متحطش في الـ payload حاجة سرية.

الغلط الشائع في الكود: إنك تعمل decode وتصدّق اللي فيه من غير verify، أو تقبل [[alg: "none"]]. وكمان متلزقش توكن production حقيقي في موقع خارجي.`,
          solCode: R`// verify.mjs: التحقق بنفس السر، ومقارنة آمنة
import { createHmac, timingSafeEqual } from "node:crypto";
const SECRET = "YOUR_SECRET";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const sign = data => createHmac("sha256", SECRET).update(data).digest("base64url");
function verify(token) {
  const [h, p, s] = token.split(".");
  const expected = Buffer.from(sign($__bt$__{h}.$__{p}$__bt));
  const got = Buffer.from(s);
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return "invalid signature";
  const payload = JSON.parse(Buffer.from(p, "base64url").toString());
  if (payload.exp < Date.now() / 1000) return "expired";
  return payload;
}
const header = b64({ alg: "HS256", typ: "JWT" });
const payload = b64({ sub: "42", role: "user", exp: Math.floor(Date.now() / 1000) + 900 });
const token = $__bt$__{header}.$__{payload}.$__{sign($__bt$__{header}.$__{payload}$__bt)}$__bt;
console.log(verify(token));
const forged = b64({ sub: "42", role: "admin", exp: Math.floor(Date.now() / 1000) + 900 });
const [h, , s] = token.split(".");
console.log(verify($__bt$__{h}.$__{forged}.$__{s}$__bt));
// { sub: '42', role: 'user', exp: 1790720945 }
// invalid signature`
        },
        {
          cmd: "authorization code + PKCE",
          title: "زرار «Login with Google» بيشتغل إزاي من جوه؟ (Explain OAuth in one minute)",
          desc: R`OAuth 2.0 بروتوكول تفويض: اليوزر بيدّي تطبيقك صلاحية محددة على حسابه عند provider زي Google من غير ما تشوف الباسورد. تطبيقك بيحوّل اليوزر لصفحة الـ provider، اليوزر يوافق، والـ provider يرجّعه لـ redirect URI عندك ومعاه code قصير العمر، وسيرفرك يبدّل الـ code بـ access token من سيرفر لسيرفر. ولتسجيل الدخول نفسه بنستخدم OpenID Connect فوقه، اللي بيرجّع [[id_token]] (JWT) فيه اليوزر مين.

والـ PKCE بيضيف سر مؤقت: التطبيق يبعت الـ hash بتاعه في الأول، والسر نفسه وقت التبديل، فلو حد سرق الـ code ميقدرش يستخدمه. والـ implicit flow القديم اللي كان بيرجّع التوكن في الـ URL مبقاش مستحسن.`,
          example: R`# ١. تطبيقك يحوّل اليوزر لصفحة الـ provider
GET https://accounts.example.com/authorize?response_type=code&client_id=APP_ID&redirect_uri=https://app.example.com/callback&scope=openid%20email&state=RANDOM&code_challenge=HASH&code_challenge_method=S256
# ٢. اليوزر وافق، والـ provider يرجّعه عندك
GET https://app.example.com/callback?code=SHORT_CODE&state=RANDOM
# ٣. سيرفرك (مش المتصفح) يبدّل الـ code
POST https://accounts.example.com/token  grant_type=authorization_code&code=SHORT_CODE&code_verifier=ORIGINAL_SECRET&redirect_uri=https://app.example.com/callback
{ "access_token": "...", "id_token": "eyJ...", "refresh_token": "...", "expires_in": 3600 }`,
          try: "افتح Network وسجّل دخول بجوجل في أي موقع: تابع الـ redirects وشوف [[response_type=code]] و [[state]] و [[code_challenge]] في الـ URL، والـ [[code]] وهو راجع للـ callback.",
          flag: "script",
          deep: {
            why: "أي تطبيق حديث فيه «Login with Google» أو ربط بخدمة تانية. والسؤال بيكشف هل فاهم إن التوكن مبيعدّيش على المتصفح، وهل تعرف الفرق بين OAuth و OIDC.",
            how: R`الأدوار: resource owner (اليوزر)، و client (تطبيقك)، و authorization server (صفحة الـ login بتاعة الـ provider)، و resource server (الـ API اللي عليه الداتا).

الـ [[state]] قيمة عشوائية بتحفظها قبل الـ redirect وتقارنها وقت الرجوع، عشان محدش يرجّع يوزر لتطبيقك بـ code بتاع حساب تاني (CSRF على الـ callback). والـ [[scope]] بيحدد الصلاحيات. والـ [[redirect_uri]] لازم يطابق بالظبط اللي متسجل عند الـ provider.

الـ access token للـ API بتاع الـ provider، والـ id_token ليك انت عشان تعرف اليوزر مين: تتحقق من توقيعه و [[aud]] بتاعه يساوي الـ client id بتاعك.

وأحدث توصيات أمان OAuth (RFC 9700، يناير 2025): PKCE لكل أنواع العملاء حتى تطبيقات الويب، والـ implicit grant ميتستخدمش، و password grant (اليوزر يدّي تطبيقك الباسورد) ممنوع. التفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «الفرق بين OAuth و OIDC؟». «فايدة state؟». «فايدة PKCE؟». «تبعت access token ولا id token للـ API بتاعك؟». «ليه code الأول بدل التوكن على طول؟».",
            mistakes: R`تقول OAuth بروتوكول login: هو authorization، و OIDC هو اللي عمل الـ login فوقه. وتحط client secret في الـ frontend أو تطبيق موبايل. وتنسى state. وتقبل أي redirect_uri. وتستخدم access token بتاع جوجل كإثبات هوية في الـ API بتاعك.`
          },
          teach: R`## الفكرة في جملة

المثال مش أوامر تتشغّل، دي **الطلبات التلاتة** اللي بتحصل لما تدوس «Login with Google» (authorization code flow مع PKCE). كل طلب فيه parameters، وكل parameter ليه سبب أمني. هنقرا الطلبات واحد واحد، وهنحسب الـ PKCE بإيدينا في Node 24 عشان نشوفه حقيقي.

---

## ١. الطلب الأول: روح لصفحة الـ provider

~~~text
GET https://accounts.example.com/authorize?response_type=code&client_id=APP_ID&redirect_uri=https://app.example.com/callback&scope=openid%20email&state=RANDOM&code_challenge=HASH&code_challenge_method=S256
~~~

ده redirect: تطبيقك بيحوّل المتصفح للـ URL ده. فكّيناه بـ [[new URL(...).searchParams]] في Node:

~~~text الناتج
{
  response_type: 'code',
  client_id: 'APP_ID',
  redirect_uri: 'https://app.example.com/callback',
  scope: 'openid email',
  state: 'RANDOM',
  code_challenge: 'HASH',
  code_challenge_method: 'S256'
}
~~~

| الـ parameter | معناه | ليه موجود |
|---|---|---|
| [[response_type=code]] | عايز code مش توكن | التوكن ميعدّيش على الـ URL أبدًا |
| [[client_id]] | تطبيقك مين (متسجل عند الـ provider) | الـ provider يعرض «تطبيق كذا عايز يوصل لـ...» |
| [[redirect_uri]] | رجّع اليوزر فين | لازم يطابق المتسجل **بالظبط**، وإلا الـ code يروح لمهاجم |
| [[scope=openid%20email]] | الصلاحيات. [[%20]] مسافة متشفّرة | [[openid]] معناها «عايز OIDC login»، و [[email]] عايز الإيميل |
| [[state]] | قيمة عشوائية بتحفظها عندك | تقارنها وقت الرجوع: بتمنع CSRF على الـ callback |
| [[code_challenge]] | hash لسر انت عامله | جزء الـ PKCE |
| [[code_challenge_method=S256]] | الـ hash نوعه SHA-256 | |

---

## ٢. الـ PKCE بإيدينا

PKCE (Proof Key for Code Exchange) = سر مؤقت اسمه [[code_verifier]]، وانت بتبعت **الـ hash بتاعه** بس في أول طلب:

~~~js
const { createHash } = require("crypto");
const challenge = v => createHash("sha256").update(v).digest("base64url");
console.log(challenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"));
~~~

~~~text الناتج
E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
~~~

ده نفس المثال اللي في مواصفة PKCE (RFC 7636) بالظبط، يعني الحساب صح:

- [[createHash("sha256")]]: hash مش HMAC، مفيش سر في الحساب.
- [[.update(v)]]: الـ verifier.
- [[.digest("base64url")]]: النتيجة بحروف آمنة في URL.

والـ verifier الحقيقي بيتعمل عشوائي: [[randomBytes(32).toString("base64url")]] طلّع نص ٤٣ حرف. والـ hash مبيترجعش لأصله، فاللي شاف الـ challenge في الـ URL ميعرفش الـ verifier.

---

## ٣. الطلب التاني: الرجوع للـ callback

~~~text
GET https://app.example.com/callback?code=SHORT_CODE&state=RANDOM
~~~

- [[code]]: قصير العمر (دقايق) وينفع مرة واحدة. لوحده ملوش لازمة.
- [[state]]: سيرفرك يقارنه باللي حفظه. مختلف؟ ارفض.

---

## ٤. الطلب التالت: التبديل، من سيرفر لسيرفر

~~~text
POST https://accounts.example.com/token  grant_type=authorization_code&code=SHORT_CODE&code_verifier=ORIGINAL_SECRET&redirect_uri=https://app.example.com/callback
~~~

- [[grant_type=authorization_code]]: «معايا code وعايز أبدّله».
- [[code_verifier]]: **السر الأصلي**. الـ provider يحسب SHA-256 عليه ويقارنه بالـ challenge اللي جه في الطلب الأول. لو حد سرق الـ code من الـ URL، معندوش الـ verifier، فالتبديل يفشل.
- الطلب ده بيحصل من سيرفرك، مش من المتصفح، فمش هتشوفه في Network.

---

## ٥. الرد

~~~text
{ "access_token": "...", "id_token": "eyJ...", "refresh_token": "...", "expires_in": 3600 }
~~~

| الحاجة | لمين | فيها إيه |
|---|---|---|
| [[access_token]] | الـ API بتاع الـ provider (Gmail، Drive) | صلاحية على الـ scopes |
| [[id_token]] | ليك انت | JWT فيه اليوزر مين ([[sub]] و [[email]]). اتحقق من توقيعه وإن [[aud]] = الـ client_id بتاعك |
| [[refresh_token]] | سيرفرك | يجيب access token جديد من غير ما اليوزر يسجّل تاني |
| [[expires_in]] | | الـ access token يخلص بعد ٣٦٠٠ ثانية = ساعة |

و [[eyJ]] في أول الـ id_token معناها JSON بالـ base64url، يعني JWT (درس [[header.payload.signature]]).

---

## الخلاصة

| الخطوة | فين | أهم parameter |
|---|---|---|
| ١. redirect للـ provider | المتصفح | [[state]] و [[code_challenge]] |
| ٢. اليوزر يوافق ويرجع | المتصفح | [[code]] قصير العمر |
| ٣. تبديل الـ code | سيرفر ← سيرفر | [[code_verifier]] |

> OAuth = تفويض (تطبيقك يوصل لحاجة باسم اليوزر). OIDC فوقه = login (الـ [[id_token]]). والتوصية الحالية (RFC 9700): PKCE لكل العملاء، والـ implicit flow ميتستخدمش.`,
          lines: [
            "رابط التفويض: عايز code، وده تطبيقي، ورجّعني هنا، والصلاحيات دي، ومعاه state و hash الـ PKCE.",
            "الرجوع للـ callback ومعاه code قصير العمر ونفس الـ state.",
            "السيرفر يبدّل الـ code بالتوكنز، ومعاه الـ code_verifier الأصلي.",
            "الرد: access token للـ API، و id token فيه اليوزر مين، و refresh token."
          ],
          sol: R`في Network (فعّل Preserve log عشان الـ redirects متتمسحش) هتلاقي طلب لـ [[accounts.google.com/o/oauth2/v2/auth]] أو شبهه، وفي الـ query: [[response_type=code]] و [[client_id]] و [[redirect_uri]] و [[scope=openid email profile]] و [[state=...]]، وفي مواقع كتير [[code_challenge]] و [[code_challenge_method=S256]]. بعد ما توافق، هتلاقي redirect للموقع على الـ callback وفيه [[code=...]] ونفس الـ [[state]].

اللي مش هتشوفه خالص: الطلب اللي بيبدّل الـ code بالتوكن، لأنه بيحصل من سيرفر الموقع لسيرفر جوجل، مش من المتصفح. ودي النقطة كلها: الـ code قصير العمر ومينفعش لوحده، والـ access token عمره ما عدّى على الـ URL. والـ state بيمنع CSRF على الـ callback، والـ PKCE بيضمن إن اللي بدّل الـ code هو نفس اللي بدأ الطلب.

لو ملقتش [[code_challenge]] فده مش غلط أكيد: تطبيقات السيرفر (confidential clients) بتستخدم client secret، بس النصيحة الحالية إن PKCE يتعمل للكل. ولو لقيت [[#access_token=]] في الـ URL يبقى ده الـ implicit flow القديم اللي مبقاش مستحب. ولو الزرار «Sign in with Google» بيفتح popup ويبعت [[credential=eyJ...]]، ده ID token مباشر من مكتبة جوجل للـ login، مش authorization code.`
        }
      ]
    }
]);
