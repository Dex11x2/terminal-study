// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "WebSockets بمكتبة ws: من الـ upgrade للإنتاج",
      l: 2,
      n: "تكملة لقسم «WebSockets على أكتر من سيرفر»: تتحقق من المستخدم والـ Origin قبل ما الاتصال يتفتح، وعميل بيرجع لوحده من غير ما يفوّت رسايل، وسيرفرين بـ Redis، وعميل بطيء ميوقّعش السيرفر، وإمتى SSE أو Socket.IO أحسن",
      items: [
        {
          cmd: "auth على الـ upgrade",
          title: "اتحقق من المستخدم والـ Origin قبل ما الاتصال يتفتح",
          desc: R`الـ WebSocket بيبدأ بطلب HTTP عادي فيه [[Upgrade: websocket]]، والسيرفر بيرد [[101 Switching Protocols]]. ده آخر طلب HTTP في عمر الاتصال كله، فهو المكان الطبيعي اللي تتحقق فيه من الكوكي (أو التوكن) ومن الـ [[Origin]]، وترفض بـ 401 أو 403 قبل ما الاتصال يتفتح أصلًا.

ليه الـ Origin؟ المتصفح بيبعت الكوكيز مع الـ handshake لوحده، و CORS مش بيحمي WebSocket. يعني أي صفحة تانية تقدر تفتح اتصال لسيرفرك باسم المستخدم وتقرا رسايله. الهجوم ده اسمه CSWSH (Cross-Site WebSocket Hijacking)، وحمايته قايمة Origins مسموحة على السيرفر.`,
          example: R`import { createServer, type IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import { WebSocketServer, type WebSocket } from "ws";
const ALLOWED_ORIGINS = new Set(["https://app.example.com", "http://localhost:5173"]);
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });
function reject(socket: Duplex, status: number, text: string) {
  socket.end($__btHTTP/1.1 $__{status} $__{text}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n$__bt);
}
server.on("upgrade", async (req: IncomingMessage, socket: Duplex, head: Buffer) => {
  const onError = () => socket.destroy();
  socket.on("error", onError);
  if (new URL(req.url ?? "/", "http://x").pathname !== "/ws") return reject(socket, 404, "Not Found");
  if (!ALLOWED_ORIGINS.has(req.headers.origin ?? "")) return reject(socket, 403, "Forbidden");
  const user = await userFromCookie(req.headers.cookie);
  if (!user) return reject(socket, 401, "Unauthorized");
  socket.off("error", onError);
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req, user));
});
wss.on("connection", (ws: WebSocket, _req: IncomingMessage, user: User) => {
  ws.send(JSON.stringify({ type: "hello", name: user.name }));
});
server.listen(3000);`,
          try: R`شغّل السيرفر على بورت 7001 و [[ALLOWED_ORIGINS]] فيها [[http://localhost:7001]] بس، وصفحة على نفس البورت بتعمل login (كوكي [[SameSite=Lax]]) وبعدين [[new WebSocket("ws://localhost:7001/ws")]]. اعمل سيرفر تاني على 7002 فيه صفحة «شريرة» بتفتح نفس الـ URL. افتح الصفحتين في نفس المتصفح وشوف: الكوكي وصل في الحالتين؟ ومين اتفتحله الاتصال؟ وبعدين علّق سطر الـ Origin وكرر.`,
          flag: "script",
          deep: {
            why: R`الـ WebSocket مفيهوش «طلب» بعد الـ handshake: رسايل رايحة جاية على نفس الاتصال. لو مفحصتش هنا، هتلاقي نفسك بتفحص المستخدم جوه كل رسالة، أو أسوأ، بتفتح الاتصال لأي حد وتستنى أول رسالة فيها توكن. وفي الوقت ده أي حد يقدر يفتح آلاف الاتصالات ويحجز ذاكرة.

و CSWSH هجوم حقيقي ومعروف: CORS بيمنع صفحة تقرا رد [[fetch]] من موقع تاني، بس WebSocket مش تحت CORS خالص. المتصفح بيبعت الـ handshake ومعاه الكوكيز، والسيرفر لو قبل، الصفحة الغريبة بتقرا كل الرسايل.`,
            how: R`[[noServer: true]] بيقول لـ ws «متمسكش سيرفر HTTP، أنا هسلّمك الاتصال بإيدي». وبعدين انت بتسمع لحدث [[upgrade]] على سيرفر HTTP نفسه: Node بيدّيك الطلب ([[req]] بالـ headers) والـ socket الخام (TCP) وأول بايتات وصلت بعد الـ headers ([[head]]). لو كله تمام، [[handleUpgrade]] بيكمّل الـ handshake (يرد 101)، ويديك object الـ [[WebSocket]]. لو لأ، انت بتكتب رد HTTP بإيدك على الـ socket وتقفله.

الـ Origin: المتصفح بيحطه في كل handshake ومحدش في JavaScript يقدر يغيّره. أداة زي curl أو script تقدر تبعت أي Origin، بس دي مش مشكلة: الهجوم محتاج كوكيز ضحية، والكوكيز موجودة في متصفح الضحية بس.

ليه [[SameSite]] مش كفاية؟ لأن «site» مش «origin». [[localhost:7002]] و [[localhost:7001]] نفس الـ site (البورت مش جزء منه)، وكذلك [[evil.example.com]] و [[app.example.com]]. فالكوكي [[Lax]] بيتبعت من subdomain تاني أو بورت تاني. وكوكي [[SameSite=None]] بيتبعت من أي حتة.

طرق تانية غير الكوكي: المتصفح مش بيسمح تحط [[Authorization]] header في [[new WebSocket()]]. فلو الـ API بتوكن: اعمل endpoint عادي ([[POST /ws-ticket]]) محمي بالتوكن، بيرجّع ticket عشوائي يعيش ٣٠ ثانية ويتستخدم مرة واحدة، والعميل يفتح [[wss://.../ws?ticket=...]]. ليه مش التوكن نفسه في الـ URL؟ لأن الـ URLs بتتسجل في logs الـ proxy والسيرفر. وفيه ناس بيحطوا التوكن في [[Sec-WebSocket-Protocol]] (الـ argument التاني لـ [[new WebSocket(url, protocols)]])، وده شغال بس شكله hack.

والتوكن بيخلص وانت متصل: السيرفر يحفظ وقت انتهاء الصلاحية مع الاتصال، ولما ييجي يقفل بكود من بتوعك (من 4000 لـ 4999، زي [[4401]]) فالعميل يعرف إنه يجدد قبل ما يرجع (الدرس الجاي).`,
            when: R`أي WebSocket فيه بيانات مستخدم. والفحص ده نفسه موجود في socket.io كـ middleware ([[io.use]] في درس «Redis adapter»)، و socket.io بيقبل كل الـ Origins افتراضيًا لحد ما تحط [[cors.origin]] أو [[allowRequest]].`,
            mistakes: R`تفحص الـ Origin بـ [[includes]] أو [[endsWith("example.com")]] (يعدّي [[evil-example.com]]). وتسيب الـ Origin فاضي يعدّي (المتصفح دايمًا بيبعته، فاللي من غيره مش متصفح، وده قرار لازم تاخده بوعي حسب عملائك). وتقبل الاتصال وتستنى أول رسالة فيها التوكن. وتحط التوكن طويل العمر في الـ query string. وتنسى listener الـ [[error]] على الـ socket الخام قبل الـ upgrade، فـ client بيقفل في النص يوقّع الـ process. وتعمل [[socket.destroy()]] من غير ما تكتب رد، فالعميل يشوف قطع مش 401.`
          },
          teach: R`## الفكرة: بوّابة واحدة قبل الاتصال

كل اتصال WebSocket بيبدأ بطلب HTTP واحد. السيرفر بيقرا الـ headers بتوعه، ويقرر: يكمّل (101) ولا يرفض (403 أو 401). بعد الـ 101 مفيش HTTP تاني، فده المكان الوحيد اللي الفحص فيه رخيص ونضيف.

اتجرّب على ويندوز 11: Node 24.22.1 (بيشغّل ملف [[.ts]] على طول من غير build) و [[ws]] 8.22.0. السيرفر على [[localhost:7001]] و [[ALLOWED_ORIGINS]] فيها [[http://localhost:7001]]، وصفحة «شريرة» على سيرفر تاني (بورت 7002). والمتصفح Chrome 156 headless متشغّل من [[playwright-core]] 1.64.1. و [[userFromCookie]] بيدوّر على [[sid]] في Map بسيطة في الذاكرة.

---

## ١. الـ handshake بعينك

قبل الكود، شوف الطلب نفسه بـ curl (Git Bash):

~~~bash
curl -si --max-time 2 \
  -H "Origin: http://localhost:7001" -H "Cookie: sid=..." \
  -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
  http://localhost:7001/ws
~~~

- [[Connection: Upgrade]] و [[Upgrade: websocket]]: «عايز أغيّر البروتوكول على نفس الاتصال».
- [[Sec-WebSocket-Version: 13]]: النسخة الوحيدة المستخدمة (RFC 6455).
- [[Sec-WebSocket-Key]]: ١٦ بايت عشوائيين بـ base64. المتصفح بيولّده لوحده كل مرة.

الرد (اتطبع بـ [[od -c]] عشان البايتات تبان):

~~~text الناتج
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

201 035 {"type":"hello","name":"ali"}
~~~

- [[Sec-WebSocket-Accept]] = base64 لـ SHA-1 بتاع (الـ key + نص ثابت [[258EAFA5-E914-47DA-95CA-C5AB0DC85B11]]). حسبناها بـ Node وطلعت نفس القيمة. دي **مش** حماية: بس دليل إن اللي رد فاهم WebSocket فعلًا، مش سيرفر HTTP قديم رد بالغلط.
- بعد السطر الفاضي الكلام بقى WebSocket frames: [[201]] بالـ octal = [[0x81]] = آخر جزء في الرسالة (FIN) + نوعها نص. و [[035]] = 29 = طول الرسالة، و [[{"type":"hello","name":"ali"}]] فعلًا ٢٩ حرف.

ونفس الطلب من غير Origin، وبعدين بـ Origin صح ومن غير كوكي:

~~~text الناتج
HTTP/1.1 403 Forbidden
Connection: close
Content-Length: 0

HTTP/1.1 401 Unauthorized
Connection: close
Content-Length: 0
~~~

---

## ٢. [[noServer]]

~~~ts
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });
~~~

- [[createServer(app)]]: سيرفر HTTP من [[node:http]] وجواه الـ app (Express مثلًا). نفس البورت هيخدم الـ API والـ WebSocket.
- [[noServer: true]]: ws مش هيسمع لوحده على حاجة. احنا اللي هنسلّمه كل اتصال بعد ما نفحصه. (في درس «heartbeat و ping» كان [[server: httpServer]]، وده بيقبل أي upgrade من غير ما تتدخل.)
- [[maxPayload]]: أقصى رسالة 64KB (اتشرح في «heartbeat و ping»).

## ٣. [[reject]]: رد HTTP بإيدك

~~~ts
function reject(socket: Duplex, status: number, text: string) {
  socket.end($__btHTTP/1.1 $__{status} $__{text}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n$__bt);
}
~~~

في حدث [[upgrade]] مفيش [[res]]. عندك [[socket]] خام بس ([[Duplex]] = stream بتقرا منه وتكتب فيه)، فبتكتب الرد كنص:

- [[\r\n]]: نهاية سطر في HTTP (CR ثم LF).
- [[Connection: close]] و [[Content-Length: 0]]: مفيش body، والاتصال هيتقفل.
- السطر الفاضي ([[\r\n\r\n]]) = آخر الـ headers.
- [[end(...)]]: اكتب وبعدين اقفل.

## ٤. حدث [[upgrade]] بالترتيب

~~~ts
server.on("upgrade", async (req: IncomingMessage, socket: Duplex, head: Buffer) => {
  const onError = () => socket.destroy();
  socket.on("error", onError);
~~~

- [[req]]: الطلب بالـ headers ([[req.headers.origin]] و [[req.headers.cookie]]).
- [[head]]: أي بايتات وصلت بعد الـ headers. مش بتلمسها، بتديها لـ [[handleUpgrade]].
- [[onError]]: لو العميل قفل في النص والـ socket رمى error من غير listener، الـ process كله يقع. (ده النمط اللي في README مكتبة ws.)

~~~ts
  if (new URL(req.url ?? "/", "http://x").pathname !== "/ws") return reject(socket, 404, "Not Found");
~~~

[[req.url]] فيه المسار والـ query بس (زي [[/ws?ticket=abc]])، و [[URL]] محتاج أصل كامل، فـ [[http://x]] أصل وهمي عشان يتفك. ولو المسار مش [[/ws]]: 404.

~~~ts
  if (!ALLOWED_ORIGINS.has(req.headers.origin ?? "")) return reject(socket, 403, "Forbidden");
~~~

[[Set.has]] مقارنة **بالظبط**: [[https://app.example.com]] بس، مش أي حاجة فيها الكلمة. و [[?? ""]]: لو مفيش Origin خالص يبقى نص فاضي، ومش في القايمة ← 403. الـ Origin قبل الكوكي: أرخص، ومش بتدوّر على session لطلب جاي من صفحة غريبة.

~~~ts
  const user = await userFromCookie(req.headers.cookie);
  if (!user) return reject(socket, 401, "Unauthorized");
  socket.off("error", onError);
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req, user));
});
~~~

- [[userFromCookie]]: نفس الكود اللي بيعرف المستخدم في الـ API العادي (session من القاعدة أو Redis).
- [[socket.off("error", onError)]]: من هنا ws هو اللي مسؤول عن الأخطاء.
- [[handleUpgrade]]: بيرد 101 ويعمل [[WebSocket]]. وبعدين احنا بنطلق [[connection]] بإيدنا ومعاه [[user]] كـ argument تالت، فكل handler بعد كده عارف المستخدم من غير ما يسأل تاني.

## ٥. [[connection]]

~~~ts
wss.on("connection", (ws: WebSocket, _req: IncomingMessage, user: User) => {
  ws.send(JSON.stringify({ type: "hello", name: user.name }));
});
~~~

[[_req]] بشرطة في أوله: عرف في TypeScript معناه «مش هستخدمه». و [[user]] هو اللي بعتناه في [[emit]].

---

## ٦. التجربة في Chrome

| الصفحة | نوع الكوكي | الكوكي وصل؟ | النتيجة |
|---|---|---|---|
| [[localhost:7001]] (التطبيق) | [[Lax]] | أيوه | [[{"type":"hello","name":"ali"}]] |
| [[127.0.0.1:7002]] | [[Lax]] | لأ | 403 (Origin) |
| [[localhost:7002]] | [[Lax]] | **أيوه** | 403 (Origin) |
| [[127.0.0.1:7002]] | [[None; Secure]] | **أيوه** | 403 (Origin) |
| [[localhost:7002]] من غير سطر الـ Origin | [[Lax]] | أيوه | [[STOLEN {"type":"hello","name":"ali"}]] |

اقرا الجدول كده:

- [[127.0.0.1]] و [[localhost]] hosts مختلفين = sites مختلفة، فـ [[Lax]] منع الكوكي.
- [[localhost:7002]] نفس الـ site بتاع [[localhost:7001]] (البورت مش جزء من الـ site)، فالكوكي اتبعت عادي. نفس الكلام لـ subdomain تاني على نفس الدومين.
- [[SameSite=None]] بيتبعت من أي حتة.
- آخر سطر: من غير فحص الـ Origin، صفحة البورت التاني قرت رسالة المستخدم. ده CSWSH بالظبط.

والمتصفح شاف كل الرفض كـ [[error]] وبعده [[close]] بكود [[1006]]. المتصفح **مش** بيوري JavaScript الـ status (403 ولا 401)، عشان كده لو العميل محتاج يفرّق (يروح لـ login مثلًا)، اسأل endpoint عادي زي [[GET /me]] قبل ما تعيد المحاولة.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[noServer: true]] + [[on("upgrade")]] | انت اللي بتقرر قبل الـ 101 |
| المسار ← Origin ← المستخدم | الأرخص الأول |
| [[Set.has(origin)]] | مقارنة بالظبط، مش [[includes]] |
| [[reject]] بنص HTTP | العميل ياخد 403/401 مش قطع |
| [[emit("connection", ws, req, user)]] | المستخدم يمشي مع الاتصال |
| ticket قصير بدل التوكن في الـ URL | الـ URLs بتتسجل في logs |

- CORS مش بيحمي WebSocket. الـ Origin check هو الحماية.
- [[SameSite]] بيحمي من sites تانية بس، مش من subdomain أو بورت تاني.`,
          lines: [
            "سيرفر HTTP من Node، ونوع الطلب.",
            "نوع الـ socket الخام (stream في الاتجاهين).",
            "مكتبة ws: السيرفر ونوع الاتصال.",
            "الـ Origins المسموحة بالظبط.",
            "سيرفر HTTP واحد للـ API والـ WebSocket.",
            "ws من غير سيرفر خاص بيه: احنا اللي بنسلّمه الاتصالات، وأقصى رسالة 64KB.",
            "دالة ترفض الـ upgrade برد HTTP:",
            "تكتب status line و headers على الـ socket وتقفله.",
            "قفلة.",
            "كل طلب upgrade بيعدّي من هنا الأول:",
            "لو الـ socket رمى error...",
            "...اقفله بدل ما يوقّع الـ process.",
            "مسار غلط: 404.",
            "Origin مش في القايمة: 403 (ضد CSWSH).",
            "هات المستخدم من كوكي الـ session.",
            "مفيش مستخدم: 401.",
            "من هنا ws هو اللي بيتعامل مع الأخطاء.",
            "كمّل الـ handshake (101)، وابعت الاتصال ومعاه المستخدم.",
            "قفلة.",
            "اتصال جديد مفحوص:",
            "رسالة ترحيب باسم المستخدم.",
            "قفلة.",
            "شغّل السيرفر."
          ],
          sol: R`اتجرّب في Chrome 156 headless (playwright-core) على ويندوز 11:

- صفحة التطبيق ([[localhost:7001]]): الكوكي وصل والاتصال اتفتح، والرسالة [[{"type":"hello","name":"ali"}]].
- الصفحة الشريرة على [[localhost:7002]]: الكوكي **وصل** (نفس الـ site)، بس السيرفر رد 403 بسبب الـ Origin، والصفحة شافت [[error]] و [[close]] بكود 1006.
- على [[127.0.0.1:7002]]: الكوكي [[Lax]] موصلش أصلًا، و 403 برضه.
- من غير سطر الـ Origin: صفحة [[localhost:7002]] قرت [[{"type":"hello","name":"ali"}]]. ده الهجوم.

ولو جربت curl من غير [[Origin]] header: [[HTTP/1.1 403 Forbidden]]. وبـ Origin صح ومن غير كوكي: [[401 Unauthorized]].`,
          solCode: R`// السجل اللي السيرفر طبعه في حدث upgrade (Lax، الصفحة الشريرة على localhost:7002)
// upgrade from http://localhost:7001 cookie: yes
// upgrade from http://localhost:7002 cookie: yes   <- اترفض 403 بسبب الـ Origin
const evil = new WebSocket("ws://localhost:7001/ws");
evil.onmessage = (e) => { document.title = "STOLEN " + e.data; };
evil.onclose = (e) => { document.title += " close:" + e.code; };`
        },
        {
          cmd: "reconnect و backoff",
          title: "عميل بيرجع لوحده ومبيفوّتش رسايل",
          desc: R`الـ [[WebSocket]] في المتصفح مبيعملش reconnect لوحده: لو الاتصال اتقطع خلاص. فانت بتكتب [[onclose]] بيعيد المحاولة، والانتظار بين المحاولات بيزيد للضعف كل مرة (exponential backoff) ومعاه عشوائية (jitter)، عشان آلاف العملاء ميرجعوش في نفس الثانية بعد deploy.

والرسايل اللي اتبعتت وانت مقطوع؟ كل رسالة ليها رقم متسلسل ([[seq]])، والعميل بيفتكر آخر رقم وصله ويبعته مع الاتصال الجديد ([[?since=23]]). السيرفر بيعيد اللي بعده من history، ولو اللي فاته أقدم من اللي محفوظ، بيقوله [[reset]] فيعمل refetch.`,
          example: R`// المتصفح (client.js):
export function connect(url, onEvent) {
  let lastSeq = 0, attempt = 0, stopped = false, ws;
  function open() {
    ws = new WebSocket($__bt$__{url}?since=$__{lastSeq}$__bt);
    ws.onopen = () => { attempt = 0; };
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.type === "reset") { lastSeq = msg.seq; return onEvent(msg); }
      if (msg.seq <= lastSeq) return;
      lastSeq = msg.seq;
      onEvent(msg);
    };
    ws.onclose = (e) => {
      if (stopped || e.code === 4401) return;
      const delay = Math.random() * Math.min(30_000, 500 * 2 ** attempt++);
      setTimeout(open, delay);
    };
  }
  open();
  return () => { stopped = true; ws.close(1000, "bye"); };
}
// السيرفر:
const history = [];
let seq = 0;
function publish(event) {
  const data = JSON.stringify({ seq: ++seq, ...event });
  history.push({ seq, data });
  if (history.length > 1000) history.shift();
  for (const c of wss.clients) c.send(data);
}
wss.on("connection", (ws, req) => {
  const since = Number(new URL(req.url, "http://x").searchParams.get("since") ?? 0);
  const oldest = history[0]?.seq ?? seq + 1;
  if (since > 0 && since < oldest - 1) return ws.send(JSON.stringify({ type: "reset", seq }));
  for (const h of history) if (h.seq > since) ws.send(h.data);
});`,
          try: R`خلّي السيرفر يعمل [[publish]] كل ١٠٠ مللي ثانية، وافتح الصفحة. بعد ثانية اقفل كل الاتصالات بـ [[terminate()]] وارفض أي upgrade لمدة ثانيتين (رد 503). سجّل في المتصفح كل [[onclose]] والـ delay اللي اتحسب، وفي الآخر اتأكد إن الأرقام اللي وصلت متسلسلة من غير فراغ. وبعدين صغّر الـ history لـ ١٠ رسايل وكرر: لازم يوصلك [[reset]].`,
          flag: "script",
          deep: {
            why: R`الموبايل بيقطع كل شوية (أسانسير، تغيير من Wi-Fi لـ 4G)، والسيرفر بيعمل restart في كل deploy. من غير reconnect، اليوزر لازم يعمل refresh عشان يرجع. ومن غير backoff مع jitter، أول ما السيرفر يقوم بيلاقي كل العملاء بيضربوه في نفس الثانية (thundering herd)، فيقع تاني، وهكذا. ومن غير seq، اللي اتبعت وانت مقطوع بيضيع، واليوزر شايف حالة غلط (طلب «مدفوع» ظاهر «مستني»).`,
            how: R`الـ backoff هنا اسمه «full jitter»: الحد الأقصى بيتضاعف (500، 1000، 2000، ... لحد 30 ثانية)، والانتظار الفعلي رقم عشوائي من صفر للحد ده. ده بيوزّع العملاء على الفترة كلها بدل ما يتجمعوا على نفس اللحظة. و [[attempt = 0]] في [[onopen]] عشان أول قطع بعد اتصال ناجح يبدأ من الأول.

ليه مبيرجعش مع كود [[4401]]؟ دي أكواد التطبيق (4000-4999) اللي السيرفر بيقفل بيها بإيده، هنا معناها «الـ session خلصت». الرجوع مش هيفيد، العميل يروح يجدد الـ login الأول. وكود [[1000]] في [[close(1000, "bye")]] معناه إغلاق عادي.

الـ resume: السيرفر بيدّي كل رسالة رقم بيزيد، ويحتفظ بآخر ١٠٠٠. العميل بيبعت آخر رقم شافه. لو الرقم ده جوه الـ history: بيعيد اللي بعده بس. لو أقدم: [[reset]] ومعاه الرقم الحالي، والعميل يعمل refetch للحالة كلها من REST، ويكمّل من الرقم ده. ونفس الفكرة موجودة جاهزة في SSE باسم [[Last-Event-ID]] (درس «SSE في Express»).

[[msg.seq <= lastSeq]]: لو نفس الرسالة وصلت مرتين (مثلًا اتعادت في الـ replay ووصلت live)، اتجاهلها. ده اسمه dedupe، ومن غيره الإشعار يظهر مرتين.

مفيش race بين الـ replay والرسايل الجديدة هنا: ws بيضيف الاتصال لـ [[wss.clients]] قبل حدث [[connection]]، والـ replay بيحصل في نفس الـ tick من غير [[await]]، فمفيش رسالة تقدر تتبعت في النص. لو الـ history في Redis (الدرس الجاي) فيه [[await]]، وساعتها لازم تعمل buffer.

والسيرفر الميت؟ المتصفح مش بيقدر يبعت ping frames، فلو السيرفر وقع من غير ما يقفل الاتصال (كابل اتشال)، [[onclose]] ممكن يتأخر دقايق. الحل: السيرفر يبعت رسالة صغيرة كل ٢٥ ثانية، والعميل لو معداش عليه ٦٠ ثانية من غير أي رسالة يعمل [[ws.close()]] بنفسه ويعيد. (ناحية السيرفر: درس «heartbeat و ping».)`,
            when: "أي عميل WebSocket في متصفح أو موبايل. لو بتستخدم socket.io، الـ reconnect والـ backoff جاهزين (reconnectionDelay و randomizationFactor)، والـ resume عندهم اسمه Connection State Recovery.",
            mistakes: R`[[setTimeout(open, 1000)]] ثابت من غير jitter. و [[attempt]] مبيرجعش صفر بعد ما الاتصال ينجح، فبعد شوية كل قطع بيستنى ٣٠ ثانية. وتعيد المحاولة مع خطأ صلاحية (loop لا نهائي). وتحط الـ seq في الذاكرة بس والسيرفر يعمل restart: الأرقام ترجع من ١ والعميل عنده ٥٠٠، فكل حاجة بتتجاهل كـ «قديمة». الحل history برا الـ process (Redis) أو [[reset]] لو [[since]] أكبر من [[seq]] الحالي. والعكس كمان: رسايل العميل اللي اتبعتت لحظة القطع ممكن تكون وصلت أو لأ، فمتعيدش بعتها إلا لو ليها id والسيرفر بيرد ack وبيتجاهل الـ id المكرر.`
          },
          teach: R`## الفكرة: ارجع بالراحة، وقول للسيرفر وقفت فين

جزئين: العميل بيعيد الاتصال بانتظار بيكبر وعشوائي، وكل رسالة ليها رقم، فالعميل يقدر يقول «آخر حاجة شفتها رقم ٢٣»، والسيرفر يكمّل من ٢٤.

اتجرّب على ويندوز 11: Node 24.22.1 و ws 8.22.0 للسيرفر (بورت 7003)، والعميل ده بالظبط (زودنا عليه سطر log) في Chrome 156 headless من playwright-core 1.64.1. السيرفر بيعمل [[publish]] كل ١٠٠ مللي ثانية. بعد ثانية من فتح الصفحة: [[terminate()]] لكل الاتصالات، ورفض أي upgrade بـ 503 لمدة ثانيتين.

---

## ١. حالة العميل

~~~js
export function connect(url, onEvent) {
  let lastSeq = 0, attempt = 0, stopped = false, ws;
~~~

- [[connect]] بتاخد الـ URL ودالة [[onEvent]] تتنادى مع كل رسالة جديدة.
- [[lastSeq]]: آخر رقم وصل. [[attempt]]: كام محاولة فشلت ورا بعض. [[stopped]]: اليوزر قفل بنفسه (متعيدش). [[ws]]: الاتصال الحالي.
- كل دول متغيرات جوه الدالة (closure)، فكل [[open()]] جديد شايفهم.

## ٢. [[open]]

~~~js
    ws = new WebSocket($__bt$__{url}?since=$__{lastSeq}$__bt);
    ws.onopen = () => { attempt = 0; };
~~~

- [[?since=...]]: أول مرة 0، وبعد القطع آخر رقم وصل.
- اتصال نجح ← [[attempt]] يرجع صفر.

## ٣. [[onmessage]]

~~~js
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.type === "reset") { lastSeq = msg.seq; return onEvent(msg); }
      if (msg.seq <= lastSeq) return;
      lastSeq = msg.seq;
      onEvent(msg);
    };
~~~

- [[m.data]]: نص الرسالة. [[JSON.parse]] بيحوّله object.
- [[reset]]: «اللي فاتك كتير، هات الحالة من الأول». بنبدأ العد من رقم السيرفر الحالي، و [[onEvent]] هيعمل refetch.
- [[<=]]: رسالة شفناها قبل كده ← تجاهل (dedupe).
- غير كده: احفظ الرقم وسلّم الرسالة.

## ٤. [[onclose]] والـ backoff

~~~js
    ws.onclose = (e) => {
      if (stopped || e.code === 4401) return;
      const delay = Math.random() * Math.min(30_000, 500 * 2 ** attempt++);
      setTimeout(open, delay);
    };
~~~

فك الـ delay من جوه لبرة:

| الحتة | المعنى |
|---|---|
| [[attempt++]] | استخدم القيمة الحالية، وبعدين زوّدها ١ |
| [[2 ** attempt]] | ٢ أس attempt: 1، 2، 4، 8... ([[**]] = أس) |
| [[500 * ...]] | 500، 1000، 2000، 4000 مللي ثانية |
| [[Math.min(30_000, ...)]] | ميعدّيش ٣٠ ثانية ([[_]] في الرقم للقراية بس) |
| [[Math.random() * ...]] | رقم عشوائي من صفر للحد ده (full jitter) |

## ٥. [[return]]

~~~js
  open();
  return () => { stopped = true; ws.close(1000, "bye"); };
~~~

[[connect]] بترجّع دالة «اقفل». في React مثلًا بتحطها في cleanup بتاع [[useEffect]].

---

## ٦. السيرفر: الأرقام والـ history

~~~js
function publish(event) {
  const data = JSON.stringify({ seq: ++seq, ...event });
  history.push({ seq, data });
  if (history.length > 1000) history.shift();
  for (const c of wss.clients) c.send(data);
}
~~~

- [[++seq]]: زوّد الأول وبعدين استخدم (فأول رسالة ١).
- [[...event]]: انسخ حقول الحدث جنب [[seq]].
- [[shift()]]: شيل الأقدم لما يعدّي ١٠٠٠، فالذاكرة ثابتة.
- [[data]] بيتعمل [[stringify]] مرة واحدة ويتبعت لكل العملاء.

~~~js
wss.on("connection", (ws, req) => {
  const since = Number(new URL(req.url, "http://x").searchParams.get("since") ?? 0);
  const oldest = history[0]?.seq ?? seq + 1;
  if (since > 0 && since < oldest - 1) return ws.send(JSON.stringify({ type: "reset", seq }));
  for (const h of history) if (h.seq > since) ws.send(h.data);
});
~~~

- [[searchParams.get("since")]]: قيمة [[?since=]] كنص، و [[Number]] تحوّلها رقم.
- [[history[0]?.seq]]: أقدم رقم محفوظ. [[?.]] = لو الـ history فاضي متقعش، رجّع undefined، و [[??]] يحط [[seq + 1]].
- [[since < oldest - 1]]: الرسالة اللي بعد [[since]] مبقتش محفوظة ← [[reset]].
- غير كده: ابعت كل اللي رقمه أكبر من [[since]].

---

## ٧. التجربة: history ١٠٠٠

~~~text سجل المتصفح (الوقت من فتح الصفحة)
0.78 open since=0
1.78 closed 1006, retry #1 in 63ms
1.86 closed 1006, retry #2 in 704ms
2.57 closed 1006, retry #3 in 1376ms
3.97 open since=23
~~~

~~~text سجل السيرفر
1.53s connected since=0, replayed 14
2.52s drop all clients, refuse for 2s
2.60s upgrade refused (down)
3.32s upgrade refused (down)
4.54s back up
4.72s connected since=23, replayed 21
received 80 first 1 last 80 gaps 0 server seq 80
~~~

- الـ delays: 63 من [[0..500]]، و 704 من [[0..1000]]، و 1376 من [[0..2000]]. كل واحد عشوائي، والحد بيتضاعف.
- الرفض بـ 503 ظهر في المتصفح [[1006]] برضه (المتصفح مبيورّيش الـ status).
- العميل رجع بـ [[since=23]]، والسيرفر أعاد ٢١ رسالة فاتته (24 لـ 44). وفي الآخر ٨٠ رسالة من ١ لـ ٨٠ من غير ولا فراغ ([[gaps 0]]).

## ٨. التجربة: history ١٠ بس

~~~text الناتج
2.63 closed 1006, retry #3 in 1457ms
4.11 open since=23
received 55 first 5 last 80 gaps 1 server seq 80 [ 'reset@45' ]
~~~

- أقدم محفوظ كان أكبر من 24، فالسيرفر بعت [[reset]] ومعاه 45، والعميل كمّل من 46. الفراغ الوحيد ([[gaps 1]]) هو مكان الـ reset، وده المكان اللي العميل فيه بيعمل refetch.
- [[first 5]]: أول اتصال وصّله الـ history اللي كان محفوظ ساعتها (آخر ١٠ بس).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[Math.random() * Math.min(cap, base * 2 ** n)]] | backoff بيكبر ومتوزّع |
| [[attempt = 0]] في [[onopen]] | القطع الجاي يبدأ من الأول |
| [[4401]] ← متعيدش | خطأ صلاحية مش هيتصلح بالمحاولة |
| [[?since=lastSeq]] | السيرفر يكمّل من مكانك |
| [[seq <= lastSeq]] ← تجاهل | مفيش تكرار |
| [[reset]] | فاتك كتير: refetch |

- [[1006]] في المتصفح = اتقطع، ومش هتعرف السبب من JavaScript.
- الـ history في الذاكرة بيضيع مع restart السيرفر. الدرس الجاي بيحطه في Redis.`,
          lines: [
            "دالة بتفتح اتصال وتسلّم كل رسالة لـ onEvent.",
            "آخر رقم وصل، وعدد المحاولات، واليوزر قفل ولا لأ، والاتصال الحالي.",
            "فتح اتصال (أول مرة وبعد كل قطع):",
            "افتح وقول للسيرفر آخر رقم شفته.",
            "نجح: صفّر عدد المحاولات.",
            "مع كل رسالة:",
            "حوّلها object.",
            "reset: ابدأ من رقم السيرفر وخلي التطبيق يعمل refetch.",
            "رسالة شفتها قبل كده: تجاهلها.",
            "احفظ رقمها.",
            "وسلّمها للتطبيق.",
            "قفلة.",
            "الاتصال اتقفل:",
            "اليوزر قفل أو الـ session خلصت (4401): متعيدش.",
            "استنى رقم عشوائي من صفر لحد بيتضاعف كل مرة (أقصاه ٣٠ ثانية).",
            "وبعدين افتح تاني.",
            "قفلة.",
            "قفلة.",
            "أول اتصال.",
            "رجّع دالة تقفل الاتصال وتمنع الرجوع.",
            "قفلة.",
            "آخر رسايل اتبعتت (في الذاكرة).",
            "آخر رقم.",
            "ابعت حدث لكل المتصلين:",
            "ادّيله الرقم الجاي وحوّله نص مرة واحدة.",
            "احفظه في الـ history.",
            "خلّي آخر ١٠٠٠ بس.",
            "ابعته لكل اتصال.",
            "قفلة.",
            "اتصال جديد:",
            "اقرا آخر رقم العميل شافه من ?since.",
            "أقدم رقم لسه محفوظ.",
            "اللي فاته مبقاش محفوظ: ابعت reset.",
            "غير كده ابعت كل اللي بعد since.",
            "قفلة."
          ],
          sol: R`اتجرّب في Chrome 156 headless على ويندوز 11 (Node 24.22.1 و ws 8.22.0):

- ٣ محاولات فشلت بـ delays عشوائية (63 ثم 704 ثم 1376 مللي ثانية، كل واحدة جوه حد بيتضاعف)، وبعدين [[open since=23]].
- السيرفر أعاد ٢١ رسالة، والمتصفح استلم ٨٠ رسالة من ١ لـ ٨٠ من غير فراغ.
- بـ history ١٠ بس: وصل [[reset]] بالرقم 45 بدل الرسايل، والعميل كمّل من 46.

لو لقيت رسايل مكررة: شرط [[msg.seq <= lastSeq]] مش موجود. ولو لقيت فراغ من غير reset: الـ replay بيبعت [[>= since]] غلط، أو [[lastSeq]] بيتحدّث قبل ما الرسالة توصل.`,
          solCode: R`// في السيرفر: افصل الكل وارفض لمدة ثانيتين
down = true;
for (const c of wss.clients) c.terminate();
setTimeout(() => { down = false; }, 2000);
// وفي حدث upgrade:
// if (down) return socket.end("HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");`
        },
        {
          cmd: "ws على سيرفرين بـ Redis",
          title: "رسالة من أي سيرفر توصل لليوزر فين ما كان متصل",
          desc: R`مع سيرفرين، اليوزر متصل بواحد بس منهم، والحدث (طلب اتدفع مثلًا) ممكن يحصل على التاني. الحل بـ ws الخام زي فكرة الـ Redis adapter بتاع socket.io بالظبط: كل حدث بيتنشر في Redis بـ [[PUBLISH]]، وكل سيرفر مشترك ([[PSUBSCRIBE]])، ويبعته للاتصالات اللي عنده هو بس.

والـ history (الدرس اللي فات) بيتنقل لـ Redis برضه، فلو اليوزر رجع على السيرفر التاني، يلاقي اللي فاته. وبكده مش محتاج sticky sessions مع ws الخام.`,
          example: R`import { createClient } from "redis";
import type { WebSocket } from "ws";
const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
await Promise.all([pub.connect(), sub.connect()]);
type Conn = { ws: WebSocket; queue: string[] | null };
const local = new Map<string, Set<Conn>>();
await sub.pSubscribe("user:*", (message, channel) => {
  for (const c of local.get(channel.slice(5)) ?? []) c.queue ? c.queue.push(message) : c.ws.send(message);
});
export async function notify(userId: string, event: object) {
  const seq = await pub.incr($__btseq:$__{userId}$__bt);
  const data = JSON.stringify({ seq, ...event });
  await pub.multi().rPush($__bthist:$__{userId}$__bt, data).lTrim($__bthist:$__{userId}$__bt, -1000, -1).publish($__btuser:$__{userId}$__bt, data).exec();
}
wss.on("connection", async (ws: WebSocket, req: IncomingMessage, userId: string) => {
  const since = Number(new URL(req.url ?? "/", "http://x").searchParams.get("since") ?? 0);
  const conn: Conn = { ws, queue: [] };
  const set = local.get(userId) ?? new Set<Conn>();
  local.set(userId, set.add(conn));
  ws.on("close", () => { set.delete(conn); if (set.size === 0) local.delete(userId); });
  let last = since;
  for (const d of await pub.lRange($__bthist:$__{userId}$__bt, 0, -1)) {
    const s = JSON.parse(d).seq;
    if (s > last) { ws.send(d); last = s; }
  }
  for (const d of conn.queue!) if (JSON.parse(d).seq > last) ws.send(d);
  conn.queue = null;
});`,
          try: R`شغّل Redis في Docker ([[docker run -d --name lab-redis -p 6391:6379 redis:8-alpine]]) ونسختين من السيرفر على 7101 و 7102 بنفس [[REDIS_URL]]، وكل نسخة فيها [[POST /notify?user=u1&text=...]] بينادي [[notify]]. وصّل عميل على 7101، وابعت notify من 7102. اقفل العميل، وابعت رسالتين (واحدة من كل سيرفر)، ووصّله على 7102 بـ [[since]] آخر رقم: لازم الرسالتين يوصلوا. في الآخر [[docker rm -f -v lab-redis]].`,
          flag: "script",
          deep: {
            why: R`أول ما تشغّل نسختين (عشان الـ uptime أو الحمل)، أي كود بيعمل [[for (const ws of wss.clients)]] بقى شايف نص المستخدمين بس. والمشكلة مبتبانش وانت شغال على جهازك بنسخة واحدة، وبتظهر في الإنتاج كـ «الإشعارات بتوصل أحيانًا».`,
            how: R`Redis pub/sub: [[PUBLISH channel message]] بيوصّل الرسالة لكل اللي عامل [[SUBSCRIBE]] على الـ channel ده في اللحظة دي، ومش بيخزنها. و [[PSUBSCRIBE user:*]] اشتراك بـ pattern: أي channel بيبدأ بـ [[user:]].

ليه اتصالين؟ الاتصال اللي عمل subscribe بيدخل «subscriber mode» ومينفعش يعمل أوامر عادية زي [[INCR]]. فـ [[duplicate()]] بيعمل اتصال تاني بنفس الإعدادات.

[[local]]: كل سيرفر عارف مين متصل **عنده**: userId ← Set اتصالات (اليوزر ممكن يفتح من تابين أو جهازين). لما رسالة توصل من Redis، السيرفر بيدوّر في الـ Map بتاعته، ولو اليوزر مش عنده، مبيعملش حاجة.

[[notify]]: [[INCR seq:u1]] بيدّي رقم متسلسل ذري (atomic) حتى لو السيرفرين بيبعتوا في نفس اللحظة. وبعدين [[MULTI]]: الأوامر التلاتة بيتنفذوا مع بعض: [[RPUSH]] يضيف للـ history، و [[LTRIM -1000 -1]] يسيب آخر ١٠٠٠ بس، و [[PUBLISH]] يبعت live.

الـ [[queue]]: الـ replay هنا فيه [[await]] (بيقرا من Redis)، وفي الوقت ده ممكن رسالة جديدة توصل live. لو اتبعتت على طول، ممكن توصل قبل رسايل الـ replay، والعميل (اللي بيتجاهل أي رقم أصغر من آخر رقم) هيرمي رسايل الـ replay. فالرسايل اللي بتوصل أثناء الـ replay بتستنى في [[queue]]، وبعد الـ replay بتتبعت (اللي رقمها أكبر من آخر رقم اتبعت بس).

Sticky sessions: مع ws الخام، الاتصال بعد الـ upgrade TCP واحد مربوط بسيرفر واحد لحد ما يتقفل، فالـ load balancer مش محتاج يفتكر حاجة. الـ sticky بيبقى ضروري لو: socket.io بالـ long-polling (درس «sticky sessions»: كذا طلب HTTP لازم يروحوا لنفس السيرفر)، أو لو حالة الاتصال (زي الـ history في الدرس اللي فات) في ذاكرة سيرفر واحد. الحل التاني أحسن: الحالة في Redis، فأي سيرفر يكمّل. والـ sticky ليه تمن: لو سيرفر وقع، كل عملاؤه بيتنقلوا مرة واحدة، والتوزيع بيبقى مش متساوي.

Redis pub/sub «fire and forget»: لو سيرفر اتقطع عن Redis ثانيتين، الرسايل اللي اتنشرت في الثانيتين دول ضاعت بالنسبة لعملاؤه. الـ seq بيكشف ده: لو العميل استلم 12 بعد 9، يعرف إن فيه فراغ، فيقفل ويرجع بـ [[since=9]] والسيرفر يكمّل من الـ history. ولو محتاج ضمان أقوى، Redis Streams ([[XADD]] و [[XREAD]]) بتخزن وكل سيرفر يقرا من آخر مكان (تاب APIs المستوى ٣، قسم «Queues والأحداث»).`,
            when: R`من أول ما يبقى عندك أكتر من process واحد بيخدم WebSockets (حتى على نفس السيرفر: PM2 cluster أو كذا container). ولو بتستخدم socket.io، استخدم الـ Redis adapter الجاهز بدل الكود ده.`,
            mistakes: R`نفس اتصال Redis للـ subscribe والأوامر. و [[PUBLISH]] و [[RPUSH]] من غير [[MULTI]] (لو السيرفر وقع بينهم، رسالة تتبعت live ومتتحفظش أو العكس). والـ replay من غير queue (رسايل تضيع عشوائيًا تحت الحمل). و [[SUBSCRIBE]] لكل اتصال بدل كل يوزر أو pattern (آلاف الاشتراكات). وتفتكر Redis pub/sub بيخزن الرسايل. وتنسى تشيل الاتصال من [[local]] في [[close]] فالـ Map بتكبر للأبد.`
          },
          teach: R`## الفكرة: كل سيرفر يسمع Redis، ويبعت للي عنده

~~~text الصورة
العميل ── ws ──> سيرفر A ──┐
                            ├── Redis: PUBLISH user:u1
POST /notify ──> سيرفر B ──┘
~~~

اتجرّب على ويندوز 11: Node 24.22.1 و ws 8.22.0 و redis (المكتبة) 6.3.0، و Redis 8 في container ([[redis:8-alpine]]) على بورت 6391. سيرفرين بنفس الكود: A على 7101 و B على 7102، وكل واحد فيه [[POST /notify?user=u1&text=...]]. والـ upgrade بيبعت [[userId]] من [[?user=]] بدل الكوكي، عشان التجربة بس (في الحقيقة: الفحص اللي في درس «auth على الـ upgrade» وبيبعت [[user.id]]). والعميل Node 24 بالـ [[WebSocket]] المدمج فيه (نفس API المتصفح)، ومعاه نفس الـ dedupe بتاع الدرس اللي فات.

---

## ١. اتصالين بـ Redis

~~~ts
const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
await Promise.all([pub.connect(), sub.connect()]);
~~~

- [[REDIS_URL]] زي [[redis://localhost:6391]].
- [[sub]] هيبقى في subscriber mode (مينفعش يعمل [[INCR]] ولا [[LRANGE]])، فـ [[pub]] للأوامر.
- [[Promise.all]]: الاتنين يتصلوا في نفس الوقت، و [[await]] لحد ما الاتنين يخلصوا. ([[await]] على أول مستوى في الملف شغال في ES modules.)

## ٢. مين متصل هنا

~~~ts
type Conn = { ws: WebSocket; queue: string[] | null };
const local = new Map<string, Set<Conn>>();
~~~

- [[Conn]]: الاتصال، ومعاه [[queue]]: لو array يبقى لسه بنعمل replay، ولو [[null]] يبقى live.
- [[local]]: userId ← كل اتصالاته على السيرفر **ده**.

## ٣. الاشتراك

~~~ts
await sub.pSubscribe("user:*", (message, channel) => {
  for (const c of local.get(channel.slice(5)) ?? []) c.queue ? c.queue.push(message) : c.ws.send(message);
});
~~~

- [[pSubscribe]] = [[PSUBSCRIBE]]. الـ callback بياخد الرسالة واسم الـ channel الحقيقي (زي [[user:u1]]).
- [[channel.slice(5)]]: شيل أول ٥ حروف ([[user:]]) يفضل [[u1]].
- [[?? []]]: اليوزر مش متصل هنا ← loop على array فاضي ← ولا حاجة.
- [[c.queue ? push : send]]: بيعمل replay؟ خليها تستنى. غير كده ابعت.

## ٤. [[notify]]

~~~ts
  const seq = await pub.incr($__btseq:$__{userId}$__bt);
  const data = JSON.stringify({ seq, ...event });
  await pub.multi().rPush($__bthist:$__{userId}$__bt, data).lTrim($__bthist:$__{userId}$__bt, -1000, -1).publish($__btuser:$__{userId}$__bt, data).exec();
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[INCR seq:u1]] | الرقم الجاي لليوزر ده (ذري: سيرفرين في نفس اللحظة ياخدوا رقمين مختلفين) |
| [[MULTI]] ... [[EXEC]] | التلاتة اللي جوه يتنفذوا مع بعض، ومحدش يدخل في النص |
| [[RPUSH hist:u1]] | ضيف في آخر الـ list |
| [[LTRIM hist:u1 -1000 -1]] | سيب من العنصر ١٠٠٠ من الآخر لآخر عنصر ([[-1]] = الأخير) |
| [[PUBLISH user:u1]] | ابعتها لكل السيرفرات المشتركة دلوقتي |

## ٥. اتصال جديد: سجّل، وبعدين replay

~~~ts
  const conn: Conn = { ws, queue: [] };
  const set = local.get(userId) ?? new Set<Conn>();
  local.set(userId, set.add(conn));
  ws.on("close", () => { set.delete(conn); if (set.size === 0) local.delete(userId); });
~~~

- بيتسجل **قبل** الـ replay و [[queue: []]]: أي رسالة تيجي من دلوقتي متضيعش، بس تستنى.
- [[set.add(conn)]] بيرجّع الـ Set نفسه، فـ [[local.set]] بياخده على طول.
- [[close]]: شيله، ولو آخر اتصال لليوزر شيل اليوزر من الـ Map.

~~~ts
  let last = since;
  for (const d of await pub.lRange($__bthist:$__{userId}$__bt, 0, -1)) {
    const s = JSON.parse(d).seq;
    if (s > last) { ws.send(d); last = s; }
  }
  for (const d of conn.queue!) if (JSON.parse(d).seq > last) ws.send(d);
  conn.queue = null;
~~~

- [[LRANGE 0 -1]]: الـ list كلها (لحد ١٠٠٠).
- ابعت اللي بعد [[since]]، و [[last]] = آخر رقم اتبعت.
- بعدها الـ queue: اللي وصل أثناء الـ [[await]]. اللي رقمه أكبر من [[last]] بس (لو نفس الرسالة اتحفظت في الـ list ووصلت live، متتبعتش مرتين).
- [[!]] بعد [[queue]]: بيقول لـ TypeScript «أنا متأكد إنها مش null هنا».
- [[queue = null]]: من دلوقتي live.

(وشرط الـ [[reset]] بتاع الدرس اللي فات لو [[since]] أقدم من أول عنصر في الـ list: نفس الفكرة بالظبط، شلناه هنا عشان الكود يبقى أقصر.)

---

## ٦. التجربة

~~~text سجل العميل
[client] POST :7102 -> queued by B
[client] got seq=1 "hello" from B (connected to :7101)
[client] disconnected
[client] POST :7102 -> queued by B
[client] POST :7101 -> queued by A
[client] got seq=2 "while-away-1" from B (connected to :7102)
[client] got seq=3 "while-away-2" from A (connected to :7102)
[client] POST :7101 -> queued by A
[client] got seq=4 "live-again" from A (connected to :7102)
~~~

~~~text سجل السيرفرين
[A] u1 connected since=0, replayed 0
[B] u1 connected since=1, replayed 2
~~~

- السطر التاني: الرسالة اتعملت على B ووصلت للعميل المتصل بـ A. ده الـ pub/sub.
- العميل رجع على **سيرفر تاني** (B) بـ [[since=1]]، و B أعاد رسالتين من Redis، منهم واحدة اتعملت على A. ده الـ history في Redis، ومن غير sticky.
- [[live-again]] اتعملت على A ووصلت للعميل على B.

وجوه Redis:

~~~text redis-cli LRANGE hist:u1 0 -1
{"seq":1,"type":"msg","text":"hello","from":"B"}
{"seq":2,"type":"msg","text":"while-away-1","from":"B"}
{"seq":3,"type":"msg","text":"while-away-2","from":"A"}
{"seq":4,"type":"msg","text":"live-again","from":"A"}
~~~

و [[PUBSUB NUMPAT]] طلّع [[1]]: ده عدد الـ **patterns** المختلفة ([[user:*]])، مش عدد السيرفرات المشتركين فيها.

---

## ٧. Sticky sessions: إمتى؟

| الحالة | محتاج sticky؟ |
|---|---|
| ws الخام، والحالة في Redis (الدرس ده) | لأ: الاتصال بعد الـ upgrade مربوط بسيرفر لوحده |
| ws الخام، والـ history في ذاكرة السيرفر (الدرس اللي فات) | أيوه، أو انقلها لـ Redis (أحسن) |
| socket.io بالـ polling (الافتراضي) | أيوه (درس «sticky sessions») |
| socket.io بـ [[transports: ["websocket"]]] بس | لأ للـ handshake، والـ adapter لسه لازم |

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[pub]] و [[sub]] منفصلين | الـ subscriber مبيعملش أوامر |
| [[PSUBSCRIBE user:*]] + [[local]] | كل سيرفر يبعت للي عنده |
| [[INCR]] | رقم متسلسل واحد لكل السيرفرات |
| [[MULTI]]: [[RPUSH]] + [[LTRIM]] + [[PUBLISH]] | يتحفظ ويتبعت مع بعض |
| [[queue]] أثناء الـ replay | مفيش رسالة تسبق رسايل الـ replay |
| الحالة في Redis | أي سيرفر يكمّل، من غير sticky |

- Redis pub/sub مش بيخزن: الـ history هو اللي بيغطي القطع.`,
          lines: [
            "مكتبة redis الرسمية.",
            "نوع الاتصال من ws.",
            "اتصال للأوامر.",
            "اتصال تاني للاشتراك (نفس الإعدادات).",
            "وصّل الاتنين مع بعض.",
            "الاتصال، ومعاه طابور رسايل وهو بيعمل replay (null = live).",
            "اليوزر ← اتصالاته على السيرفر ده.",
            "اشترك في كل channel بيبدأ بـ user:",
            "لكل اتصال لليوزر ده هنا: لو بيعمل replay خلّيها تستنى، غير كده ابعتها.",
            "قفلة.",
            "ابعت حدث ليوزر من أي سيرفر:",
            "رقم متسلسل ذري لليوزر.",
            "الرسالة كنص.",
            "مع بعض: احفظ في الـ history، وسيب آخر ١٠٠٠، وانشر.",
            "قفلة.",
            "اتصال جديد (الـ upgrade بعت الـ userId):",
            "آخر رقم العميل شافه.",
            "الاتصال في وضع replay.",
            "اتصالات اليوزر هنا أو Set جديد.",
            "سجّل الاتصال قبل الـ replay.",
            "لما يتقفل شيله، ولو آخر واحد شيل اليوزر.",
            "آخر رقم اتبعت.",
            "اقرا الـ history من Redis:",
            "رقم الرسالة.",
            "لو بعد اللي العميل شافه ابعتها.",
            "قفلة.",
            "وبعدين اللي وصل live أثناء الـ replay، من غير تكرار.",
            "من هنا live.",
            "قفلة."
          ],
          sol: R`اتجرّب على ويندوز 11 بـ Redis 8 في Docker ونسختين Node 24.22.1:

[[got seq=1 "hello" from B (connected to :7101)]]: اتعملت على B ووصلت للعميل على A. وبعد ما رجع على 7102 بـ [[since=1]]: [[seq=2]] من B و [[seq=3]] من A وصلوا من الـ history ([[replayed 2]] في سجل B)، و [[seq=4]] اتعملت على A ووصلت live.

لو مفيش حاجة وصلت للعميل من السيرفر التاني: يا [[sub]] مش مشترك قبل ما تبعت ([[await sub.pSubscribe]])، يا اسم الـ channel مختلف بين [[publish]] و [[pSubscribe]]. ولو الرسايل اللي فاتت موصلتش: [[since]] مش بيتبعت، أو [[LRANGE]] على key غلط. ومتنساش [[docker rm -f -v lab-redis]].`,
          solCode: R`docker run -d --name lab-redis -p 6391:6379 redis:8-alpine
REDIS_URL=redis://localhost:6391 NAME=A PORT=7101 node server.ts &
REDIS_URL=redis://localhost:6391 NAME=B PORT=7102 node server.ts &
curl -X POST "localhost:7102/notify?user=u1&text=hello"
docker exec lab-redis redis-cli LRANGE hist:u1 0 -1
docker rm -f -v lab-redis`
        },
        {
          cmd: "backpressure و bufferedAmount",
          title: "عميل بطيء ميوقّعش السيرفر",
          desc: R`[[ws.send()]] مبيستناش الرسالة توصل: بيحطها في buffer في ذاكرة السيرفر ويرجع على طول. لو العميل على نت بطيء ومبيلحقش يقرا، الـ buffer ده بيكبر من غير حد لحد ما الذاكرة تخلص. ده اسمه backpressure.

[[ws.bufferedAmount]] بيقولك كام بايت مستنية تتبعت للاتصال ده. افحصه قبل كل [[send]]: الرسايل اللي ينفع تتشال (سعر بيتحدث كل ثانية) اتجاهلها لو عدّى حد، ولو عدّى حد أكبر اقفل الاتصال، والعميل يرجع ويعمل resume.`,
          example: R`import { WebSocket } from "ws";
const HIGH = 1024 * 1024;
const KILL = 8 * 1024 * 1024;
export function sendTo(ws: WebSocket, data: string, droppable: boolean) {
  if (ws.readyState !== WebSocket.OPEN) return;
  if (ws.bufferedAmount > KILL) { ws.terminate(); return; }
  if (droppable && ws.bufferedAmount > HIGH) { metrics.dropped++; return; }
  ws.send(data);
}
for (const ws of wss.clients) sendTo(ws, priceTick, true);`,
          try: R`اعمل سيرفر بيبعت لكل عميل رسالة 1KB تقريبًا بأسرع ما يقدر ([[setInterval]] كل مللي ثانية، ٢٠ رسالة كل مرة). وصّل عميلين بمكتبة [[ws]]: واحد عادي، والتاني يعمل [[ws.pause()]] أول ما يتفتح (بطّل يقرا من الـ socket، كأنه على 3G وحش). اطبع كل ثانية [[bufferedAmount]] لكل اتصال و [[process.memoryUsage().rss]]، مرة بـ [[ws.send]] على طول، ومرة بـ [[sendTo]].`,
          flag: "script",
          deep: {
            why: R`سيرفر واحد عليه آلاف الاتصالات، وكفاية كام عميل بطيء (أو عميل بيعمل كده قصد) عشان كل واحد فيهم يحجز ميجات في الذاكرة. ومن غير حد، الـ process يقع بـ out of memory ومعاه كل العملاء التانيين. والمشكلة مبتبانش في التطوير لأن الـ localhost سريع.`,
            how: R`فيه ٣ أماكن البيانات بتستنى فيها: buffer الـ socket في Node (ده اللي [[bufferedAmount]] بيعدّه)، وbuffer الكيرنل للـ TCP، والشبكة نفسها. لما العميل مبيقراش، الكيرنل عنده بيتملي، فـ TCP بيقول للسيرفر «استنى» (الـ window بتبقى صفر)، فالكيرنل عند السيرفر يتملي، وبعدين Node يبدأ يكوّم في الذاكرة. فـ [[bufferedAmount]] بيبدأ يزيد بعد ما الكيرنلين يتملوا.

[[ws.pause()]] في التجربة: بيوقّف قراية الـ socket عند العميل، فده بيعمل بالظبط اللي بيعمله عميل بطيء.

التلات قرارات:
1. رسايل ينفع تضيع (أسعار، مكان عربية على الخريطة، «فلان بيكتب»): لو الـ buffer عدّى [[HIGH]] متبعتش، الرسالة الجاية هتجيب أحدث قيمة. أحسن منها: coalescing، تحفظ آخر قيمة لكل key وتبعتها لما الـ buffer يفضى.
2. رسايل مهمة (طلب اتدفع): متتشالش، بتتبعت. ولو الـ buffer عدّى [[KILL]]: [[terminate()]]. العميل هيرجع بـ [[since]] (درس «reconnect و backoff») وياخد اللي فاته من الـ history، فمفيش حاجة ضاعت بجد.
3. الأرقام: [[HIGH]] و [[KILL]] على حسب حجم رسايلك وعدد الاتصالات والذاكرة. ١٠ آلاف اتصال × 8MB = 80GB، فالحد لازم يتحسب.

الاتجاه التاني (العميل بيبعت): في المتصفح [[ws.bufferedAmount]] موجود برضه، والعميل اللي بيرفع ملف حتت يستنى لحد ما يقل قبل ما يبعت الحتة الجاية. والسيرفر بيحمي نفسه من عميل بيغرقه بـ [[maxPayload]] و rate limit لكل اتصال.

وفيه في المتصفح [[WebSocketStream]] (API بـ streams فيه backpressure جوه)، بس لسه مش في كل المتصفحات وقت كتابة الدرس، فراجع MDN قبل ما تعتمد عليه.`,
            when: "أي broadcast لكتير من العملاء أو أي stream بيانات سريع (أسعار، logs لايف، ألعاب). وفي أي سيرفر عام، عشان عميل واحد ميقدرش يحجز ذاكرة من غير حد.",
            mistakes: R`[[ws.send()]] في loop من غير ما تبص على [[bufferedAmount]]. وتقفل الاتصال مع أول ارتفاع (الـ buffer بيعلى ويوطى طبيعي). وتشيل رسايل مهمة عشان الـ buffer مليان. و [[KILL]] من غير resume عند العميل (الرسايل تضيع بجد). وتفتكر إن الـ RSS بتاع الـ process هيقولك المشكلة بدري: الذاكرة بتكبر ببطء والـ GC بيخبيها، و [[bufferedAmount]] لكل اتصال أوضح بكتير.`
          },
          teach: R`## الفكرة: بص على الطابور قبل ما تزوّد فيه

[[bufferedAmount]] = حجم الطابور اللي مستني يتبعت لاتصال واحد. قبل كل [[send]] بتسأل: الطابور ده كبر أكتر من اللازم؟

اتجرّب على ويندوز 11: Node 24.22.1 و ws 8.22.0، السيرفر والعميلين في نفس الـ script (بورت 7201). الرسالة [[{"type":"tick","data":"xxx...(1000 حرف)"}]] حوالي 1KB. [[fast]] عميل عادي، و [[slow]] عمل [[pause()]] أول ما اتفتح. كل ثانية بنطبع [[bufferedAmount]] لكل اتصال بالميجا و RSS الـ process.

---

## ١. الحدود

~~~ts
const HIGH = 1024 * 1024;
const KILL = 8 * 1024 * 1024;
~~~

[[1024 * 1024]] = 1MB، و [[8 * 1024 * 1024]] = 8MB. الأرقام دي للتجربة.

## ٢. [[sendTo]] سطر سطر

~~~ts
  if (ws.readyState !== WebSocket.OPEN) return;
~~~

[[readyState]]: حالة الاتصال: [[CONNECTING]] (0) و [[OPEN]] (1) و [[CLOSING]] (2) و [[CLOSED]] (3). لو مش مفتوح، مفيش داعي.

~~~ts
  if (ws.bufferedAmount > KILL) { ws.terminate(); return; }
~~~

الطابور عدّى 8MB: العميل ده مش هيلحق. [[terminate()]] مش [[close()]]: [[close]] بيحط close frame **في آخر نفس الطابور** ويستنى، و [[terminate]] بيقفل الـ socket فورًا ويرمي الطابور.

~~~ts
  if (droppable && ws.bufferedAmount > HIGH) { metrics.dropped++; return; }
  ws.send(data);
~~~

- [[droppable]]: انت اللي بتقول الرسالة دي ينفع تضيع ولا لأ.
- [[metrics.dropped++]]: عدّاد (Prometheus مثلًا) عشان تشوف ده بيحصل قد إيه.

~~~ts
for (const ws of wss.clients) sendTo(ws, priceTick, true);
~~~

الـ broadcast بقى بيعدّي على [[sendTo]] بدل [[ws.send]].

---

## ٣. التجربة: [[ws.send]] على طول

~~~text الناتج
1.0s slow=5.5MB fast=0.0MB rss=88MB fastGot=5740 dropped=0
2.0s slow=9.3MB fast=0.0MB rss=89MB fastGot=9680 dropped=0
3.0s slow=12.4MB fast=0.0MB rss=90MB fastGot=12840 dropped=0
4.0s slow=15.0MB fast=0.0MB rss=93MB fastGot=15480 dropped=0
5.0s slow=17.8MB fast=0.0MB rss=97MB fastGot=18260 dropped=0
~~~

- [[fast]] طابوره صفر طول الوقت: بيقرا أول بأول (استلم 18260 رسالة في ٥ ثواني).
- [[slow]] بيزيد حوالي 3MB كل ثانية، ومش هيقف. سيبه ساعة = حوالي 10GB.
- RSS زاد 9MB بس في ٥ ثواني، فلو بتراقب الذاكرة الكلية بس مش هتاخد بالك بدري. الرقم اللي بيفضح المشكلة هو [[bufferedAmount]].
- أول ثانية الطابور 5.5MB مرة واحدة: الكيرنلين اتملوا الأول (مش ظاهرين في الرقم ده)، وبعدها كل حاجة اتكوّمت في Node.

## ٤. التجربة: [[sendTo(..., true)]]

~~~text الناتج
1.0s slow=1.0MB fast=0.0MB rss=85MB fastGot=4840 dropped=3649
3.0s slow=1.0MB fast=0.0MB rss=86MB fastGot=15080 dropped=13889
5.0s slow=1.0MB fast=0.0MB rss=86MB fastGot=22780 dropped=21589
~~~

الطابور وقف عند 1MB، والذاكرة ثابتة، والعميل السريع مأثرش عليه حاجة. والرسايل الزيادة اتشالت ([[dropped]]) للعميل البطيء بس.

## ٥. التجربة: [[sendTo(..., false)]] (رسايل مهمة)

~~~text الناتج
1.0s fast=0.0MB slow=4.4MB rss=86MB fastGot=4660 dropped=0
2.0s fast=0.0MB slow=7.6MB rss=89MB fastGot=7940 dropped=0
terminated slow client at 8389437
3.0s fast=0.0MB rss=90MB fastGot=11020 dropped=0
~~~

متشالش حاجة، والطابور كبر لحد ما عدّى 8MB (8389437 بايت > 8388608)، فاتقفل. من الثانية ٣ [[slow]] مش في القايمة. لو العميل ده بيعمل reconnect و resume، هيرجع ياخد اللي فاته من الـ history.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[bufferedAmount]] | حجم الطابور لاتصال واحد |
| [[> HIGH]] + droppable ← متبعتش | الأحدث هييجي بعدها |
| [[> KILL]] ← [[terminate()]] | الطابور ميكبرش للأبد |
| [[terminate]] مش [[close]] | الـ close frame هيستنى في نفس الطابور |
| resume عند العميل | القفل ميضيّعش رسايل مهمة |

- الـ RSS الكلي بيتأخر في إنه يبيّن المشكلة. راقب [[bufferedAmount]] لكل اتصال.`,
          lines: [
            "مكتبة ws.",
            "حد «اتجاهل الرسايل الغير مهمة»: 1MB.",
            "حد «اقفل الاتصال»: 8MB.",
            "ابعت لاتصال واحد بأمان:",
            "مش مفتوح: متعملش حاجة.",
            "الطابور عدّى 8MB: اقفل فورًا (العميل هيرجع ويعمل resume).",
            "رسالة ينفع تضيع والطابور عدّى 1MB: اتجاهلها وعدّها.",
            "غير كده ابعت.",
            "قفلة.",
            "الـ broadcast بقى بيعدّي على sendTo."
          ],
          sol: R`اتجرّب على ويندوز 11 (Node 24.22.1 و ws 8.22.0):

- من غير حماية: [[slow]] وصل 17.8MB في ٥ ثواني ولسه بيزيد (حوالي 3MB/ثانية)، و [[fast]] صفر.
- بـ [[sendTo(..., true)]]: [[slow]] ثابت عند 1.0MB، و 21589 رسالة اتشالت ليه هو بس، و RSS ثابت حوالي 86MB.
- بـ [[sendTo(..., false)]]: اتقفل عند 8389437 بايت ([[terminated slow client]]).

لو [[bufferedAmount]] عند البطيء فضل صفر: العميل مش واقف فعلًا ([[pause()]] اتنادت قبل [[open]]؟)، أو الرسايل صغيرة وبطيئة لدرجة إن الكيرنل شايلها.`,
          solCode: R`const slow = new WebSocket("ws://localhost:7201/slow");
slow.on("open", () => slow.pause());
setInterval(() => {
  for (const ws of wss.clients) console.log((ws.bufferedAmount / 1024 / 1024).toFixed(1) + "MB");
}, 1000);`
        },
        {
          cmd: "ws ولا SSE ولا Socket.IO",
          title: "تختار أنهي واحد للـ realtime",
          desc: R`لو السيرفر بس هو اللي بيبعت (إشعارات، حالة طلب، رد AI بيتكتب): SSE أبسط، شغال على HTTP عادي، وفيه reconnect و [[Last-Event-ID]] جاهزين في المتصفح. لو الاتنين بيبعتوا كتير وبسرعة (شات، لعبة، تعديل مشترك): WebSocket.

وبين ws الخام و Socket.IO: Socket.IO مكتبة فوق WebSocket بتديك reconnect و rooms و acks و Redis adapter جاهزين، بس ليها بروتوكول خاص بيها: عميل WebSocket عادي مش بيكلّم سيرفر Socket.IO ولا العكس.`,
          example: R`// ws: الرسالة زي ما هي
ws.send(JSON.stringify({ id: 7, text: "paid" }));
// SSE: سطور نص على رد HTTP مفتوح
res.write($__btid: 7\nevent: notification\ndata: $__{JSON.stringify({ id: 7, text: "paid" })}\n\n$__bt);
// Socket.IO: event باسم، والمكتبة بتغلّفه
socket.emit("notification", { id: 7, text: "paid" });`,
          try: R`اعمل سيرفر Socket.IO بيعمل [[socket.emit("notification", { id: 7, text: "paid" })]] لأي حد يتصل، ووصّل عليه بمكتبة [[ws]] الخام على [[ws://localhost:7301/socket.io/?EIO=4&transport=websocket]]، واطبع كل frame وطوله. (لما توصلك رسالة بتبدأ بـ [[0]]، رد بـ [[40]] عشان تدخل الـ namespace.) قارن بنفس الرسالة بـ ws و SSE.`,
          flag: "script",
          deep: {
            why: R`الاختيار ده بيتعمل مرة وبيفضل معاك: الـ infrastructure (proxy و CDN و load balancer)، والعملاء (موبايل native، أجهزة IoT)، والـ scaling كلهم بيتبنوا عليه. وناس كتير بتبدأ بـ Socket.IO أو WebSocket لحاجة كانت SSE هتكفيها بربع الكود.`,
            how: R`SSE: رد HTTP عادي بـ [[text/event-stream]] (درس «SSE في Express»). المتصفح بيعيد الاتصال لوحده وبيبعت [[Last-Event-ID]]، والـ proxies والـ CDNs فاهمينه لأنه HTTP. عيوبه: اتجاه واحد (العميل يبعت بـ [[fetch]] عادي)، ونص بس، وعلى HTTP/1.1 المتصفح بيسمح بـ ٦ اتصالات للدومين الواحد (التابات بتتقاسمهم)، والمشكلة دي بتختفي مع HTTP/2 لأن كل الـ streams على اتصال واحد. و [[EventSource]] مبيقبلش headers، فالـ auth بالكوكي (أو ticket زي WebSocket).

WebSocket الخام ([[ws]]): اتجاهين، نص أو binary، وأقل overhead (frame بـ ٢ لـ ١٤ بايت header). بس كل حاجة عليك: reconnect و resume و heartbeat و rooms و scaling (الدروس اللي فاتت كلها). ويشتغل مع أي عميل بيفهم RFC 6455 (موبايل، Go، Python...).

Socket.IO: بيبدأ بـ HTTP long-polling وبعدين يرقّي لـ WebSocket (فيشتغل ورا proxies قديمة بتمنع WebSocket)، وفيه reconnect بـ backoff، و rooms، و acks (رد على رسالة معينة)، و Redis adapter، و Connection State Recovery (resume لفترة قصيرة). التمن: عميل حوالي 14.8KB gzip، وبروتوكول خاص (أي عميل لازم يستخدم مكتبة Socket.IO للغة دي)، و sticky sessions لو الـ polling شغال.

وفيه حاجتين بيتسألوا عليهم: WebTransport (فوق HTTP/3، datagrams و streams) لسه مش مدعوم في كل المتصفحات والسيرفرات، فراجع حالته قبل ما تختاره. و polling عادي (طلب كل ١٠ ثواني) لسه اختيار محترم لو التحديثات قليلة ومش مستعجلة.`,
            when: R`إشعارات وحالة طلبات وتقدم job وستريم AI: SSE. شات ولعبة وتعديل مشترك ومؤشرات «بيكتب»: WebSocket. فريق عايز يخلص بسرعة والعملاء كلهم web أو موبايل بمكتبة Socket.IO: Socket.IO. عملاء native أو IoT أو لغات تانية: ws خام (أو أي سيرفر بيتكلم RFC 6455).`,
            mistakes: R`WebSocket لإشعارات اتجاه واحد (كود وتعقيد على الفاضي). وتفتكر Socket.IO «WebSocket أسهل» وتحاول توصل له بـ [[new WebSocket()]]. و SSE على HTTP/1.1 مع تابات كتير (الاتصالات بتخلص والصفحة تعلّق). وتختار حاجة من غير ما تتأكد إن الـ proxy أو الـ CDN اللي قدامك بيعدّيها ومبيعملش buffering للرد (nginx: [[proxy_buffering off]] للـ SSE، و [[Upgrade]] headers للـ WebSocket، تاب Nginx).`
          },
          teach: R`## الفكرة: مين بيبعت، وقد إيه، ولمين

السؤال الأول: العميل محتاج **يبعت** للسيرفر كتير وبسرعة؟ لو لأ: SSE. لو أيوه: WebSocket. وبعدين: تكتب الحاجات الجاهزة بنفسك (ws) ولا تاخدها من مكتبة (Socket.IO)؟

اتجرّب على ويندوز 11: Node 24.22.1، و socket.io 4.8.4، و ws 8.22.0 كعميل خام على سيرفر Socket.IO (بورت 7301)، عشان نشوف الـ frames الحقيقية.

---

## ١. نفس الرسالة على السلك

~~~ts
ws.send(JSON.stringify({ id: 7, text: "paid" }));
~~~

ws: البايتات هي الـ JSON بالظبط: [[{"id":7,"text":"paid"}]] = 22 بايت (وفوقهم header الـ frame: ٢ بايت للرسايل الصغيرة من السيرفر).

~~~ts
res.write($__btid: 7\nevent: notification\ndata: $__{JSON.stringify({ id: 7, text: "paid" })}\n\n$__bt);
~~~

SSE: سطور نص. [[\n]] نهاية سطر، و [[\n\n]] (سطر فاضي) نهاية الحدث. نفس الرسالة بقت 56 بايت: الزيادة هي [[id:]] و [[event:]] و [[data:]]، وهي اللي بتدّيك الـ resume والـ events بالاسم من غير كود.

~~~ts
socket.emit("notification", { id: 7, text: "paid" });
~~~

Socket.IO: شفنا الـ frames بالعميل الخام:

~~~text الناتج
frame (107 bytes): 0{"sid":"RSy7kVADRZ8iK06eAAAA","upgrades":[],"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}
frame (32 bytes): 40{"sid":"3reuEGKS48DxMv70AAAA"}
frame (41 bytes): 42["notification",{"id":7,"text":"paid"}]
~~~

| الـ frame | معناه |
|---|---|
| [[0{...}]] | Engine.IO «open»: الـ session id والـ heartbeat ([[pingInterval]] و [[pingTimeout]]) |
| [[40]] (احنا بعتناها) ثم [[40{"sid":...}]] | Socket.IO «connect» للـ namespace الرئيسي [[/]] |
| [[42[...]]] | [[4]] = رسالة Engine.IO، و [[2]] = EVENT في Socket.IO، وبعدها array: اسم الـ event ثم البيانات |

يعني Socket.IO بروتوكول **فوق** WebSocket: عميل [[new WebSocket()]] عادي لو اتصل بسيرفر Socket.IO هيشوف الكلام ده، مش الـ JSON بتاعك. وعميل Socket.IO مش هيعرف يتكلم مع سيرفر ws عادي.

وحجم عميل Socket.IO في المتصفح: [[socket.io.min.js]] من الباكدج 47295 بايت، وبعد gzip حوالي 14805 (حوالي 14.8KB). الـ [[WebSocket]] و [[EventSource]] جوه المتصفح ومش بيكلفوا ولا بايت.

---

## ٢. المقارنة

| | SSE | ws الخام | Socket.IO |
|---|---|---|---|
| الاتجاه | سيرفر ← عميل | الاتنين | الاتنين |
| البيانات | نص | نص و binary | نص و binary |
| reconnect | جاهز في المتصفح | تكتبه (درس «reconnect و backoff») | جاهز |
| resume | [[Last-Event-ID]] جاهز | تكتبه ([[seq]] و history) | Connection State Recovery (فترة قصيرة) |
| heartbeat | تبعت comment كل شوية | تكتبه (درس «heartbeat و ping») | جاهز |
| أكتر من سيرفر | Redis pub/sub | Redis pub/sub (درس «ws على سيرفرين بـ Redis») | Redis adapter |
| sticky | لأ | لأ | أيوه مع الـ polling |
| ورا proxy/CDN | HTTP عادي (اقفل الـ buffering) | محتاج دعم [[Upgrade]] | بيرجع لـ polling لوحده |
| auth | كوكي | كوكي أو ticket (درس «auth على الـ upgrade») | كوكي أو [[auth]] في الـ handshake |
| العملاء | أي HTTP client | أي عميل RFC 6455 | مكتبة Socket.IO بس |

---

## ٣. القرار بسرعة

1. السيرفر بس بيبعت؟ **SSE**. (إشعارات، تقدم job، ستريم رد LLM في درس «ستريم رد LLM».)
2. الاتنين بيبعتوا والعملاء web وموبايل بمكتبة Socket.IO، وعايز rooms و acks جاهزين؟ **Socket.IO**.
3. عملاء native أو IoT أو لغات تانية، أو محتاج أقل overhead وتحكم كامل؟ **ws** والدروس اللي في القسم ده.
4. التحديثات كل دقيقة ومش مستعجلة؟ polling عادي بـ [[ETag]] (تاب APIs المستوى ١) ممكن يكفي.

---

## الخلاصة

- SSE = HTTP عادي في اتجاه واحد، وفيه الـ reconnect والـ resume جاهزين.
- WebSocket = اتجاهين، والباقي عليك.
- Socket.IO = WebSocket + بروتوكول + الحاجات الجاهزة، ومش متوافق مع WebSocket الخام.`,
          lines: [
            "ws: ابعت الـ JSON على الاتصال.",
            "SSE: اكتب الحدث كسطور نص (id و event و data) وسطر فاضي في الآخر.",
            "Socket.IO: event باسم وبيانات، والمكتبة بتعمله frame بشكلها."
          ],
          sol: R`اتجرّب على ويندوز 11 (Node 24.22.1 و socket.io 4.8.4 و ws 8.22.0 كعميل خام):

- أول frame: [[0{"sid":...,"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}]] (107 بايت).
- بعد ما بعتنا [[40]]: [[40{"sid":...}]].
- الرسالة نفسها: [[42["notification",{"id":7,"text":"paid"}]]] = 41 بايت، قصاد 22 بايت بـ ws و 56 بايت بـ SSE (بالـ id والـ event).

يعني الفرق في الحجم صغير. الفرق الحقيقي في اللي جاهز واللي عليك، وفي مين يقدر يتصل.`,
          solCode: R`import WebSocket from "ws";
const raw = new WebSocket("ws://localhost:7301/socket.io/?EIO=4&transport=websocket");
raw.on("message", (d) => {
  const s = d.toString();
  console.log($__btframe ($__{Buffer.byteLength(s)} bytes): $__{s}$__bt);
  if (s.startsWith("0")) raw.send("40");
});`
        }
      ]
    }
]);
