// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "SSE و streaming",
      l: 2,
      n: "السيرفر يبعت للمتصفح أول بأول على HTTP عادي: حالة طلب، وإشعارات، ورد AI كلمة كلمة، مع الإلغاء",
      items: [
        {
          cmd: "SSE في Express",
          title: "ابعت أحداث من السيرفر للمتصفح من غير WebSocket",
          desc: R`SSE (Server-Sent Events) رد HTTP عادي مبيخلصش: الـ Content-Type بتاعه [[text/event-stream]]، والسيرفر بيكتب فيه أحداث نص كل ما يحصل جديد. كل حدث سطور زي [[id: 7]] و [[event: status]] و [[data: {...}]]، وبعدهم سطر فاضي.

في المتصفح: [[new EventSource("/orders/9001/events")]] وبعدين [[es.addEventListener("status", ...)]]. ولو الاتصال قطع، المتصفح بيعيد الاتصال لوحده، وبيبعت آخر id شافه في header اسمه [[Last-Event-ID]]، فالسيرفر يبعتله اللي فاته بس.

اتجاه واحد بس (السيرفر للمتصفح). ولو محتاج الاتجاهين، ده WebSocket (درس [[socket.io]] في تاب «بناء مشروع كامل»).`,
          example: R`const clients = new Set<{ orderId: string; res: Response }>();
const sse = (e: { id: number; type: string; data: unknown }) => $__btid: $__{e.id}\nevent: $__{e.type}\ndata: $__{JSON.stringify(e.data)}\n\n$__bt;
export async function publishStatus(orderId: string, status: string) {
  const ev = await db.orderEvent.create({ data: { orderId, type: "status", data: { status } } });
  for (const c of clients) if (c.orderId === orderId) c.res.write(sse(ev));
}
app.get("/orders/:id/events", requireAuth, requireOrderOwner, async (req, res) => {
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" });
  res.flushHeaders();
  res.write("retry: 3000\n\n");
  const lastId = Number(req.get("last-event-id")) || 0;
  const missed = await db.orderEvent.findMany({ where: { orderId: req.params.id, id: { gt: lastId } }, orderBy: { id: "asc" } });
  for (const e of missed) res.write(sse(e));
  const client = { orderId: req.params.id, res };
  clients.add(client);
  const ping = setInterval(() => res.write(": ping\n\n"), 15_000);
  req.on("close", () => { clearInterval(ping); clients.delete(client); });
});`,
          try: R`شغّل الـ endpoint، وافتح [[curl -N localhost:3000/orders/9001/events]] في terminal (الـ [[-N]] بيوقف الـ buffering في curl). من terminal تاني نادي [[publishStatus]] (من route تجربة) وشوف الحدث بيظهر في الأول على طول. وبعدين اقفل الـ curl وافتحه تاني ومعاه [[-H 'Last-Event-ID: 1']]: لازم يوصلك كل اللي بعد ١ بس.`,
          flag: "script",
          deep: {
            why: "حالة الطلب، وتقدّم رفع ملف، وإشعار «فيه رسالة جديدة»، ولوحة أرقام بتتحدث: كلها السيرفر بيتكلم والمتصفح بيسمع. الـ polling كل ثانيتين بيعمل آلاف طلبات فاضية وبيأخر التحديث. و WebSocket بروتوكول تاني محتاج إعداد في الـ proxy ومكتبة. SSE بيحل الحالة دي بـ HTTP عادي: نفس الـ cookies ونفس الـ auth middleware ونفس الـ logs.",
            how: R`شكل الحدث: سطور [[field: value]]، والحدث بيخلص بسطر فاضي. [[data]] هو المحتوى (ولو اتكرر في نفس الحدث، السطور بتتجمع بـ newline). [[event]] اسم الحدث، ومن غيره المتصفح بيعتبره [[message]]. [[id]] بيتحفظ في المتصفح كـ «آخر حاجة شفتها». [[retry]] بيقول للمتصفح يستنى كام ملّي ثانية قبل ما يعيد الاتصال. وأي سطر بيبدأ بـ [[:]] تعليق والمتصفح بيتجاهله، وده اللي بنستخدمه كـ heartbeat.

الـ heartbeat ليه؟ الـ proxies والـ load balancers بيقفلوا أي اتصال ساكت فترة (Nginx افتراضيًا [[proxy_read_timeout 60s]]، وفيه load balancers أقل). سطر تعليق كل ١٥ ثانية بيخلي الاتصال «شغال» في نظرهم، وكمان بيكشف إن العميل مشي: الكتابة على اتصال مقفول بتطلّع [[close]].

الـ reconnect: [[EventSource]] بيعيد الاتصال لوحده لو الشبكة قطعت أو السيرفر عمل restart، وبيبعت [[Last-Event-ID]]. عشان ده يشتغل صح، الأحداث لازم تبقى متخزنة بـ id متسلسل في مكان بيعيش أكتر من الـ process (جدول، أو Redis Stream). لو خزنتها في array في الذاكرة، أول restart والـ ids بتبدأ من الأول، والعميل اللي كان عند ٥٠ هيستنى أحداث عمرها ما هتيجي.

الـ buffering: أي طبقة بتجمّع الرد قبل ما تبعته بتبوّظ SSE. [[X-Accel-Buffering: no]] بيقول لـ Nginx ميعملش buffer للرد ده بالذات (أو [[proxy_buffering off]] في الـ location). ومكتبة [[compression]] في Express بتعمل buffer برضه، فاستثني المسار ده منها أو نادي [[res.flush()]] بعد كل كتابة. و [[res.flushHeaders()]] بيبعت الـ headers فورًا، عشان المتصفح يعرف إن الاتصال اتفتح قبل أول حدث.

الحدود: SSE نص بس (UTF-8)، واتجاه واحد. وعلى HTTP/1.1 المتصفح بيسمح بـ ٦ اتصالات بس لنفس الدومين، فـ ٧ تابات مفتوحة على نفس الصفحة = التابة السابعة واقفة. على HTTP/2 المشكلة دي مش موجودة لأن كله على اتصال واحد (تاب «Nginx»، درس [[HTTP/2 و HTTP/3]]). و [[EventSource]] مبيقدرش يبعت headers زي Authorization، فالـ auth بالـ cookie، أو بـ fetch وقراية الـ stream بإيدك (درس «ستريم في React»).

ولو عندك أكتر من سيرفر: الـ [[clients]] Set في ذاكرة كل process، فالحدث اللي اتنشر على سيرفر ١ مش هيوصل للمتصل بسيرفر ٢. نفس الحل بتاع WebSocket: Redis pub/sub بين السيرفرات (درس [[Redis adapter]] في الكاتيجوري الجاية).`,
            when: "أي تحديث من السيرفر للمتصفح في اتجاه واحد: حالة طلب أو job (بعد رد 202)، وإشعارات، ولوحات أرقام، و logs بتتكتب live، وردود AI. ولو الشات محتاج الاتجاهين بسرعة عالية، أو محتاج binary، WebSocket.",
            mistakes: R`تنسى السطر الفاضي في آخر الحدث، فالمتصفح ميعرضش حاجة لحد ما الحدث اللي بعده ييجي. وتنسى الـ heartbeat، فالاتصال يتقفل كل دقيقة من الـ proxy والعميل يعيد ويعيد. وتسيب الـ interval شغال بعد [[close]] (memory leak بيكبر مع كل زائر). و [[compression]] أو Nginx بيجمّعوا الرد فالأحداث توصل كلها مرة واحدة في الآخر. وسؤال انترفيو مشهور: «SSE ولا WebSocket ولا polling؟»، والإجابة بتبدأ بالاتجاه: من السيرفر بس = SSE، الاتجاهين = WebSocket، تحديث كل دقيقة كفاية = polling.`
          },
          teach: R`## الفكرة: رد HTTP مبيخلصش

في الطلب العادي السيرفر بيبعت الرد ويقفل. في SSE السيرفر بيبعت الـ headers وبيسيب الرد مفتوح، وكل ما يحصل جديد بيكتب كام سطر نص في نفس الرد. المثال فيه ٣ حتت: دالة بتحوّل الحدث لنص SSE، ودالة بتنشره لكل المتابعين، والـ endpoint اللي المتصفح بيفتحه.

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠٠٥)، و [[db.orderEvent]] array في الذاكرة بـ id بيزيد ١ مع كل حدث، و [[requireAuth]] و [[requireOrderOwner]] بيعدّوا الطلب (تجربة)، ومعاهم route تجربة بينادي [[publishStatus]]. العميل: curl 8 من Git Bash، و [[EventSource]] حقيقي في Chrome headless عن طريق playwright-core.

---

## ١. قايمة المتصلين

~~~ts
const clients = new Set<{ orderId: string; res: Response }>();
~~~

[[Set]] مجموعة بتضيف وتشيل منها بسرعة ([[add]] و [[delete]])، ومفيهاش تكرار. كل عنصر object فيه الطلب اللي المتصل بيتابعه، والـ [[res]] بتاعه عشان نكتب فيه بعدين. و [[<{...}>]] بيقول لـ TypeScript شكل العناصر.

## ٢. شكل الحدث

~~~ts
const sse = (e: { id: number; type: string; data: unknown }) => $__btid: $__{e.id}\nevent: $__{e.type}\ndata: $__{JSON.stringify(e.data)}\n\n$__bt;
~~~

template string ([[$__bt...$__bt]]) فيها [[$__{...}]] بتتبدل بقيمة، و [[\n]] سطر جديد. لحدث [[{ id: 3, type: "status", data: { status: "shipped" } }]] بتطلّع:

~~~text الناتج
id: 3
event: status
data: {"status":"shipped"}

~~~

| السطر | معناه |
|---|---|
| [[id: 3]] | رقم الحدث. المتصفح بيفتكره كـ «آخر حاجة شفتها» |
| [[event: status]] | اسم الحدث. المتصفح بيسمعله بـ [[addEventListener("status")]] |
| [[data: ...]] | المحتوى. [[JSON.stringify]] بيخلي الـ object سطر واحد |
| سطر فاضي ([[\n\n]]) | **نهاية الحدث**. من غيره المتصفح مش هيعرض حاجة |

و [[unknown]] نوع معناه «أي حاجة، بس لازم تتأكد قبل ما تستخدمها».

## ٣. النشر

~~~ts
export async function publishStatus(orderId: string, status: string) {
  const ev = await db.orderEvent.create({ data: { orderId, type: "status", data: { status } } });
  for (const c of clients) if (c.orderId === orderId) c.res.write(sse(ev));
}
~~~

- الحدث بيتخزّن **الأول**، والقاعدة بتدّيله id متسلسل. ده اللي هيخلي العميل اللي فصل يكمّل من مكانه.
- [[{ orderId }]] اختصار [[{ orderId: orderId }]].
- [[for (const c of clients)]]: لف على كل المتصلين، واكتب الحدث للي متابعين نفس الطلب بس.
- [[res.write]]: اكتب في الرد **من غير ما تقفله** (عكس [[res.send]] و [[res.json]]).

---

## ٤. الـ endpoint سطر سطر

~~~ts
app.get("/orders/:id/events", requireAuth, requireOrderOwner, async (req, res) => {
~~~

نفس الحماية بتاعة أي endpoint: لازم login، ولازم يكون صاحب الطلب (BOLA). [[EventSource]] بيبعت الكوكيز عادي.

~~~ts
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" });
  res.flushHeaders();
~~~

- [[text/event-stream]]: النوع اللي بيقول للمتصفح «ده SSE».
- [[no-cache]]: محدش يكاش الرد.
- [[X-Accel-Buffering: no]]: لـ Nginx بالذات، «متجمّعش الرد ده، ابعته أول بأول».
- [[res.flushHeaders()]]: ابعت الـ headers **دلوقتي**، من غير ما تستنى أول كتابة.

~~~text الناتج (curl -siN localhost:6005/orders/9001/events)
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/event-stream; charset=utf-8
Cache-Control: no-cache
X-Accel-Buffering: no
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
~~~

مفيش [[Content-Length]]، لأن السيرفر نفسه مش عارف الرد هيبقى قد إيه. بداله [[Transfer-Encoding: chunked]]: الرد بييجي حتت، وكل [[write]] حتة. و Express زوّد [[charset=utf-8]] لوحده.

~~~ts
  res.write("retry: 3000\n\n");
~~~

سطر [[retry]] مش حدث: ده إعداد. «لو الاتصال قطع، استنى ٣٠٠٠ ملّي ثانية (٣ ثواني) وعيد».

~~~ts
  const lastId = Number(req.get("last-event-id")) || 0;
~~~

[[req.get]] بيقرا header (من غير ما يفرق بين الحروف الكبيرة والصغيرة). أول اتصال مفيهوش الـ header ده، فـ [[Number(undefined)]] = [[NaN]]، و [[|| 0]] تخليه صفر.

~~~ts
  const missed = await db.orderEvent.findMany({ where: { orderId: req.params.id, id: { gt: lastId } }, orderBy: { id: "asc" } });
  for (const e of missed) res.write(sse(e));
~~~

[[gt]] = greater than: كل الأحداث اللي رقمها **أكبر** من آخر واحد شافه، بالترتيب ([[asc]] = تصاعدي). أول اتصال ([[lastId = 0]]) بياخد كل التاريخ.

~~~ts
  const client = { orderId: req.params.id, res };
  clients.add(client);
~~~

سجّله في القايمة، فـ [[publishStatus]] الجاية توصله.

~~~ts
  const ping = setInterval(() => res.write(": ping\n\n"), 15_000);
~~~

- [[setInterval(fn, ms)]]: نفّذ الدالة كل كذا ملّي ثانية، وبيرجّع رقم تقدر توقفه بيه.
- [[15_000]]: نفس [[15000]]، والـ [[_]] للقراية بس.
- [[: ping]]: أي سطر بيبدأ بـ [[:]] **تعليق**، والمتصفح بيتجاهله. هو بس بيخلي الاتصال مش ساكت، عشان الـ proxies متقفلوش.

~~~ts
  req.on("close", () => { clearInterval(ping); clients.delete(client); });
~~~

[[close]] بيحصل لما العميل يقفل (تابة اتقفلت، أو curl اتقفل، أو الشبكة قطعت). وقّف الـ ping وشيله من القايمة. من غير السطر ده كل زائر بيسيب interval شغال وعنصر في الـ Set للأبد.

---

## ٥. التجربة كلها بـ curl

نشرنا [[pending]] و [[paid]] قبل ما حد يتصل، وبعدين فتحنا الاتصال، ونشرنا [[shipped]] بعد ثانيتين، واستنينا ١٧ ثانية:

~~~bash
curl -siN --max-time 18 localhost:6005/orders/9001/events
~~~

- [[-N]] (no-buffer): اطبع كل حاجة أول ما توصل.
- [[--max-time 18]]: اقفل بعد ١٨ ثانية (عشان التجربة تخلص لوحدها).

~~~text الناتج (بعد الـ headers)
retry: 3000

id: 1
event: status
data: {"status":"pending"}

id: 2
event: status
data: {"status":"paid"}

id: 3
event: status
data: {"status":"shipped"}

: ping

~~~

١ و ٢ وصلوا أول ما اتصل (من [[missed]])، و ٣ وصل لحظة النشر، و [[: ping]] بعد ١٥ ثانية.

### الـ reconnect بـ [[Last-Event-ID]]

~~~bash
curl -sN --max-time 2 localhost:6005/orders/9001/events -H 'Last-Event-ID: 1'
~~~

~~~text الناتج
retry: 3000

id: 2
event: status
data: {"status":"paid"}

id: 3
event: status
data: {"status":"shipped"}

~~~

الحدث ١ متبعتش تاني. ولوج السيرفر كان:

~~~text الناتج (log السيرفر)
09:12:26 connect 9001 last-event-id = (none)
09:12:44 close; clients = 0
09:12:45 connect 9001 last-event-id = 1
09:12:47 close; clients = 0
~~~

[[close]] اتنادى في كل مرة curl قفل، والقايمة رجعت صفر.

---

## ٦. في المتصفح: [[EventSource]] بيعيد لوحده

فتحنا [[new EventSource("/orders/9001/events")]] في Chrome، وبعد ١.٥ ثانية قفلنا الرد من السيرفر ([[res.end()]])، ونشرنا [[delivered]] والعميل فاصل:

~~~text الناتج (console المتصفح)
0.0s open, readyState 1
0.0s status lastEventId=1 {"status":"pending"}
0.0s status lastEventId=2 {"status":"paid"}
0.0s status lastEventId=3 {"status":"shipped"}
1.5s error, readyState 0
4.5s open, readyState 1
4.5s status lastEventId=4 {"status":"delivered"}
~~~

~~~text الناتج (log السيرفر)
09:12:59 connect 9001 last-event-id = (none)
09:13:00 close; clients = 0
09:13:03 connect 9001 last-event-id = 3
~~~

- [[readyState]]: [[1]] = مفتوح، و [[0]] = بيحاول يتصل تاني (و [[2]] = اتقفل نهائي بـ [[es.close()]]).
- [[error]] هنا مش نهاية: ده «الاتصال قطع وهعيد». واتعاد بعد ٣ ثواني بالظبط (١.٥ ← ٤.٥) بسبب [[retry: 3000]].
- المتصفح بعت [[Last-Event-ID: 3]] **لوحده**، فالسيرفر بعتله ٤ بس، وده الحدث اللي اتنشر وهو فاصل.
- [[e.lastEventId]] هو الـ [[id:]] بتاع الحدث.

---

## الخلاصة

| الحتة | ليه موجودة |
|---|---|
| [[text/event-stream]] + [[flushHeaders()]] | المتصفح يعرف إنه SSE من أول لحظة |
| [[id:]] و [[event:]] و [[data:]] + سطر فاضي | شكل الحدث، والسطر الفاضي بيقفله |
| [[retry: 3000]] | وقت الانتظار قبل الـ reconnect |
| [[Last-Event-ID]] + [[id > lastId]] | يكمّل من مكانه من غير تكرار ومن غير ما يفوته حاجة |
| [[: ping]] كل ١٥ ثانية | الـ proxies متقفلش الاتصال الساكت |
| [[req.on("close")]] | وقّف الـ interval وشيله من القايمة |

- الأحداث تتخزن بـ id متسلسل **قبل** ما تتبعت.
- [[res.write]] مش [[res.json]]: الرد بيفضل مفتوح.
- الـ [[clients]] في ذاكرة الـ process: مع أكتر من سيرفر محتاج Redis pub/sub بينهم.`,
          lines: [
            "كل المتصلين دلوقتي: كل واحد متابع أنهي طلب، والـ response بتاعه عشان نكتب فيه.",
            "بيحوّل حدث لشكل SSE: id و event و data (JSON في سطر واحد)، وسطر فاضي في الآخر يقفل الحدث.",
            "دالة بتناديها أي service لما حالة الطلب تتغير.",
            "خزّن الحدث الأول في القاعدة. الـ id المتسلسل هو اللي الـ reconnect هيعتمد عليه.",
            "ابعته لكل اللي متابعين الطلب ده.",
            "قفلة.",
            "الـ endpoint. محمي زي أي endpoint، وصاحب الطلب بس يتابعه (BOLA).",
            "نوع الرد SSE، ومتتكاشش، و Nginx ميعملش buffer للرد ده.",
            "ابعت الـ headers فورًا، من غير ما تستنى أول حدث.",
            "قول للمتصفح: لو الاتصال قطع، استنى ٣ ثواني وعيد.",
            "آخر حدث العميل شافه (المتصفح بيبعته لوحده في الـ reconnect). لو مفيش يبقى صفر.",
            "هات الأحداث اللي فاتته من القاعدة، بالترتيب.",
            "وابعتهاله قبل أي حاجة جديدة.",
            "سجّل الاتصال ده عشان publishStatus يوصله.",
            "ضيفه للقايمة.",
            "heartbeat: سطر تعليق كل ١٥ ثانية، عشان الـ proxy ميقفلش الاتصال الساكت.",
            "لما العميل يقفل: وقّف الـ heartbeat وشيله من القايمة. من غير ده الذاكرة بتتملي.",
            "قفلة."
          ],
          sol: R`في الـ terminal الأول هتشوف [[retry: 3000]] وبعدين الأحداث القديمة (لو فيه)، وبعدين الاتصال واقف مستني. أول ما تنادي publishStatus يظهر حدث زي [[id: 3]] و [[event: status]] و [[data: {"status":"shipped"}]] فورًا. وكل ١٥ ثانية سطر [[: ping]].

لما تفتحه تاني بـ [[Last-Event-ID: 1]] لازم يوصلك الحدث ٢ و ٣ بس، مش ١. لو وصلك كله، يبقى الشرط [[id: { gt: lastId }]] مش شغال، أو الـ header مش بيتقري (اسمه case-insensitive و [[req.get]] بيتعامل مع ده).

لو الحدث مش بيظهر غير لما تقفل الـ curl: فيه buffering. شيل [[-N]] وهتلاقي نفس المشكلة، أو فيه [[compression]] middleware قبل الـ route. ولو بتجرب ورا Nginx وناسي [[X-Accel-Buffering]]، الأحداث بتوصل دفعة واحدة.`
        },
        {
          cmd: "SSE في Route Handler",
          title: "نفس الـ SSE جوه Next بـ ReadableStream",
          desc: R`في Next مفيش [[res.write]]. الـ Route Handler بيرجّع [[Response]]، والـ body بتاعه ممكن يبقى [[ReadableStream]]: بتعمل stream، وجواه كل ما يحصل حدث بتعمل [[controller.enqueue]] بالبايتات، و Next بيبعتها للمتصفح أول بأول.

ولما العميل يقفل التابة، [[request.signal]] بيعمل abort، فتوقف الـ heartbeat وتقفل أي اشتراك.`,
          example: R`// app/api/orders/[id]/events/route.ts
const enc = new TextEncoder();
export async function GET(request: Request, ctx: RouteContext<"/api/orders/[id]/events">) {
  const { id } = await ctx.params;
  if (!(await canViewOrder(id))) return new Response(null, { status: 404 });
  const since = Number(request.headers.get("last-event-id")) || 0;
  const stream = new ReadableStream({
    async start(controller) {
      const send = (s: string) => controller.enqueue(enc.encode(s));
      const ping = setInterval(() => send(": ping\n\n"), 15_000);
      request.signal.addEventListener("abort", () => clearInterval(ping));
      send("retry: 3000\n\n");
      try {
        for await (const e of orderEvents(id, since, request.signal)) {
          send($__btid: $__{e.id}\nevent: status\ndata: $__{JSON.stringify(e.data)}\n\n$__bt);
        }
      } finally {
        clearInterval(ping);
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" } });
}`,
          try: R`اكتب [[orderEvents]] كـ async generator بيطلّع حدث كل ثانية لحد ما الـ signal يعمل abort (خلي أول id يبقى [[since + 1]]). افتح المسار بـ [[curl -N]] وشوف الأحداث، وبعدين [[Ctrl+C]] وحط [[console.log]] في الـ abort listener وتأكد إنه اتنادى.`,
          flag: "script",
          deep: {
            why: "مشاريع Next كتير مفيهاش سيرفر Express منفصل، وعايزة تحديثات live: حالة دفع، أو تقدّم job، أو إشعارات. Route Handler بـ ReadableStream بيدّيك SSE من غير ما تضيف سيرفر أو خدمة.",
            how: R`[[ReadableStream]] من Web Streams (نفس اللي في المتصفح). بتدّيله object فيه [[start(controller)]]: بيتنادى مرة لما الـ stream يبدأ، وانت تفضل تعمل [[enqueue]] براحتك، ولما تخلص [[close()]]. الـ [[enqueue]] بياخد بايتات، عشان كده [[TextEncoder]].

[[request.signal]]: الـ Request في Next بيدّيك AbortSignal بيتعمل abort لما العميل يقطع الاتصال. لو مسمعتلوش، الـ loop هيفضل شغال ويكتب في stream محدش بيقراه. وفيه كمان [[cancel()]] في الـ ReadableStream نفسه بيتنادى لما القارئ يلغي، والاتنين ينفعوا.

[[orderEvents]] هنا async generator: [[for await]] بيستنى كل حدث. ممكن يبقى polling للقاعدة كل ثانية ([[WHERE id > last]])، أو اشتراك في Redis pub/sub، أو LISTEN/NOTIFY في Postgres. المهم إنه يوقف لما الـ signal يعمل abort.

الـ [[no-transform]] في Cache-Control بيقول لأي proxy أو CDN ميعدّلش الرد (ضغط أو تجميع).

الاستضافة بتفرق هنا: على سيرفر Node بتاعك (Docker أو VPS) الاتصال يعيش براحته. على serverless (زي Vercel)، الـ function ليها أقصى مدة تشتغلها، والاتصال بيتقفل بعدها، فالمتصفح يعيد بـ Last-Event-ID. ده شغال طالما الأحداث متخزنة، بس كل اتصال مفتوح بيتحسب وقت function. راجع حدود المنصة بتاعتك قبل ما تعتمد على اتصالات طويلة (تاب «Next.js»، درس [[فين تنشر]]).`,
            when: "مشروع Next محتاج تحديثات live في اتجاه واحد. ولو هتحتاج آلاف الاتصالات المفتوحة طول الوقت على serverless، فكّر في خدمة realtime جاهزة أو سيرفر منفصل.",
            mistakes: R`ترجّع الـ Response بعد ما الـ loop يخلص (يعني [[await]] الـ loop قبل [[return]])، فالمتصفح مش هيشوف أي حاجة لحد الآخر. و [[enqueue]] بعد [[close()]] بيرمي error. وتنسى الـ abort فالـ generator يفضل يسأل القاعدة كل ثانية لعميل مشي من ساعة. وتفتكر إن SSE على serverless هيفضل مفتوح للأبد.`
          },
          teach: R`## الفكرة: نفس SSE، بس الـ body نفسه stream

في Express كنا بنكتب في [[res]] بـ [[res.write]]. في Next مفيش [[res]]: الـ Route Handler بيرجّع [[Response]]، والحل إن الـ body بتاعه يبقى [[ReadableStream]] لسه بيتكتب فيه. بنرجّع الـ Response فورًا، وجوه الـ stream loop بيكتب كل حدث أول ما ييجي.

اتجرّب على ويندوز 11: Next.js 16.4.0 (بـ [[next build]] وبعدين [[next start -p 6007]]) على Node 24.19، و TypeScript 5.9 عدّى الـ build من غير أخطاء. [[canViewOrder]] بيرجّع false للـ id [[403]] بس (تجربة)، و [[orderEvents]] هو الـ generator اللي في الحل، ومعاه [[console.log]] في الـ abort listener وفي الـ generator. العميل curl 8 من Git Bash.

---

## ١. الـ encoder

~~~ts
const enc = new TextEncoder();
~~~

الـ stream بيشيل **بايتات** ([[Uint8Array]])، مش نصوص. [[TextEncoder]] بيحوّل النص لبايتات UTF-8. واحد بس برا الدالة، لأنه مالوش حالة وينفع لكل الطلبات.

## ٢. الـ handler والـ params

~~~ts
export async function GET(request: Request, ctx: RouteContext<"/api/orders/[id]/events">) {
  const { id } = await ctx.params;
~~~

- اسم الدالة [[GET]] هو الـ method. Next بيدوّر على export بالاسم ده في [[route.ts]].
- [[request]]: الـ [[Request]] العادي بتاع Web APIs (نفس اللي في المتصفح).
- [[RouteContext<"...">]]: نوع جاهز في Next (global، مش محتاج import) بياخد المسار ويعرف إن فيه [[id]]. Next بيولّده وقت [[next dev]] أو [[next build]].
- [[ctx.params]] **Promise** في Next 15 و 16، عشان كده [[await]].

~~~ts
  if (!(await canViewOrder(id))) return new Response(null, { status: 404 });
~~~

الحماية جوه كل handler (مفيش middleware زي Express هنا). [[null]] = من غير body.

~~~text الناتج (curl -si localhost:6007/api/orders/403/events)
HTTP/1.1 404 Not Found
~~~

~~~ts
  const since = Number(request.headers.get("last-event-id")) || 0;
~~~

[[request.headers.get]] بيقرا header (من غير ما يفرق بين كبير وصغير). وزي درس Express: مفيش = [[NaN]] = [[0]].

---

## ٣. الـ stream

~~~ts
  const stream = new ReadableStream({
    async start(controller) {
~~~

[[ReadableStream]] بياخد object فيه دوال. [[start]] بتتنادى **مرة واحدة** لما الـ stream يتعمل، و [[controller]] هو اللي بتكتب بيه:

| الدالة | بتعمل إيه |
|---|---|
| [[controller.enqueue(bytes)]] | حط حتة في الـ stream (بتتبعت للعميل) |
| [[controller.close()]] | خلاص، مفيش حاجة تاني |
| [[controller.error(err)]] | اقطع الـ stream بخطأ |

ملحوظة مهمة: [[start]] هنا [[async]] وفيها loop مبيخلصش، بس ده مش بيأخر الـ [[return]] تحت. الـ stream بيتعمل، والـ Response بيرجع، والـ loop بيكمّل في الخلفية.

~~~ts
      const send = (s: string) => controller.enqueue(enc.encode(s));
~~~

helper صغير: نص ← بايتات ← الـ stream.

~~~ts
      const ping = setInterval(() => send(": ping\n\n"), 15_000);
      request.signal.addEventListener("abort", () => clearInterval(ping));
~~~

- الـ heartbeat زي Express: سطر تعليق كل ١٥ ثانية.
- [[request.signal]]: [[AbortSignal]] بيعمل «abort» لما العميل يقفل الاتصال. ده بديل [[req.on("close")]] بتاع Express.

~~~ts
      send("retry: 3000\n\n");
~~~

استنى ٣ ثواني قبل الـ reconnect.

## ٤. الـ loop

~~~ts
      try {
        for await (const e of orderEvents(id, since, request.signal)) {
          send($__btid: $__{e.id}\nevent: status\ndata: $__{JSON.stringify(e.data)}\n\n$__bt);
        }
~~~

- [[orderEvents]] **async generator**: دالة بتطلّع قيم واحدة ورا التانية بـ [[yield]]، وكل قيمة ممكن تستنى قبلها.
- [[for await (... of ...)]]: استنى القيمة الجاية، وبعدين نفّذ الـ body، وهكذا لحد ما الـ generator يخلص.
- وبنباصي الـ [[signal]] للـ generator، عشان يوقف هو كمان لما العميل يمشي.

الـ generator اللي جربنا بيه (من الحل):

~~~ts
async function* orderEvents(id: string, since: number, signal: AbortSignal) {
  let n = since;
  while (!signal.aborted) {
    await new Promise((r) => setTimeout(r, 1000));
    if (signal.aborted) break;
    n++;
    yield { id: n, data: { orderId: id, status: "step " + n } };
  }
}
~~~

- [[function*]]: النجمة معناها generator. و [[async function*]] = async generator.
- [[new Promise((r) => setTimeout(r, 1000))]]: «استنى ثانية». الـ Promise بيخلص لما [[setTimeout]] ينادي [[r]].
- بنسأل [[signal.aborted]] تاني بعد الانتظار، عشان لو العميل مشي في الثانية دي منطلّعش حدث زيادة.

~~~ts
      } finally {
        clearInterval(ping);
        controller.close();
      }
~~~

[[finally]] بيتنفّذ في كل الأحوال: الـ loop خلص، أو حصل error. وقّف الـ ping واقفل الـ stream. ولو حاولت [[enqueue]] بعد [[close]]:

~~~text الناتج (node -e)
TypeError: Invalid state: Controller is already closed ERR_INVALID_STATE
~~~

## ٥. الرد

~~~ts
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" } });
~~~

الـ stream نفسه هو الـ body. و [[no-transform]]: «يا أي proxy أو CDN في النص، متعدّلش الرد (متضغطوش ومتجمّعوش)».

---

## ٦. التجربة

~~~bash
curl -siN --max-time 3.5 localhost:6007/api/orders/9/events
~~~

~~~text الناتج
HTTP/1.1 200 OK
cache-control: no-cache, no-transform
content-type: text/event-stream
x-accel-buffering: no
Transfer-Encoding: chunked

retry: 3000

id: 1
event: status
data: {"orderId":"9","status":"step 1"}

id: 2
event: status
data: {"orderId":"9","status":"step 2"}

id: 3
event: status
data: {"orderId":"9","status":"step 3"}

~~~

حدث كل ثانية. وبعد ٣.٥ ثانية curl قفل، و log السيرفر:

~~~text الناتج (terminal الـ Next)
generator yields 1
generator yields 2
generator yields 3
client left
generator stopped at 3
~~~

[[client left]] من الـ abort listener، والـ generator وقف عند ٣ ومطلّعش ٤. ده معناه إن مفيش حاجة شغالة لعميل مشي.

وبـ [[Last-Event-ID: 4]]:

~~~text الناتج
retry: 3000

id: 5
event: status
data: {"orderId":"9","status":"step 5"}

id: 6
...
~~~

بدأ من ٥.

---

## الخلاصة

| Express | Next Route Handler |
|---|---|
| [[res.set(...)]] + [[res.flushHeaders()]] | [[new Response(stream, { headers })]] |
| [[res.write(s)]] | [[controller.enqueue(enc.encode(s))]] |
| [[req.on("close", ...)]] | [[request.signal.addEventListener("abort", ...)]] |
| [[req.get("last-event-id")]] | [[request.headers.get("last-event-id")]] |
| الرد بيخلص بـ [[res.end()]] | [[controller.close()]] |

- رجّع الـ Response **فورًا**. لو عملت [[await]] للـ loop قبل [[return]]، مفيش حاجة هتوصل لحد الآخر.
- باصي [[request.signal]] لأي حاجة شغالة (generator، أو اشتراك)، عشان توقف لما العميل يمشي.
- على serverless الاتصال ليه أقصى مدة، والمتصفح بيعيد بـ [[Last-Event-ID]].`,
          lines: [
            "نفس الـ encoder لكل الأحداث: بيحوّل النص لبايتات.",
            R`GET على المسار ده. [[RouteContext]] نوع global في Next زي ما في درس [[route.ts]].`,
            R`الـ [[params]] Promise.`,
            "مش من حقه يشوف الطلب ده؟ 404 (الـ auth جوه كل Route Handler).",
            "آخر حدث العميل شافه، لو ده reconnect.",
            "اعمل stream.",
            "الدالة دي بتشتغل مرة لما الرد يبدأ يتبعت.",
            "helper بيكتب نص في الـ stream.",
            "heartbeat كل ١٥ ثانية.",
            "العميل قفل؟ وقّف الـ heartbeat.",
            "قول للمتصفح يستنى ٣ ثواني قبل الـ reconnect.",
            "جرّب...",
            "...لكل حدث جديد (الـ generator بيوقف لما الـ signal يعمل abort)...",
            "...ابعته بشكل SSE.",
            "قفلة الـ loop.",
            "في كل الأحوال (خلص أو حصل error):",
            "وقّف الـ heartbeat...",
            "...واقفل الـ stream.",
            "قفلة.",
            "قفلة start.",
            "قفلة الـ stream.",
            "رجّع الـ stream فورًا كـ body، بنفس headers الـ SSE، و no-transform عشان محدش في النص يعدّل الرد.",
            "قفلة."
          ],
          sol: R`الـ generator ممكن يبقى كده (ده تجربة، في الحقيقة هتقرا من القاعدة أو Redis). مع [[curl -N localhost:3000/api/orders/9/events]] هتشوف [[retry: 3000]] وبعدين [[id: 1]] و [[id: 2]] كل ثانية. ولو بعت [[-H 'Last-Event-ID: 4']] يبدأ من ٥.

أول ما تعمل [[Ctrl+C]] لازم تشوف الـ log بتاع الـ abort في terminal الـ Next، والأحداث توقف. لو الـ log مظهرش والـ generator فضل يطبع، يبقى الـ loop مش بيبص على [[signal.aborted]].

ولو مفيش ولا حدث بيوصل لحد ما الـ stream يخلص: انت عامل [[await]] على الـ loop قبل ما ترجّع الـ Response، أو فيه proxy بيعمل buffer.`,
          solCode: R`async function* orderEvents(id: string, since: number, signal: AbortSignal) {
  let n = since;
  while (!signal.aborted) {
    await new Promise((r) => setTimeout(r, 1000));
    if (signal.aborted) break;
    n++;
    yield { id: n, data: { orderId: id, status: "step " + n } };
  }
}
// وفي الـ route:
request.signal.addEventListener("abort", () => { console.log("client left"); clearInterval(ping); });`
        },
        {
          cmd: "ستريم رد LLM",
          title: "ابعت رد الموديل للمتصفح وهو بيتكتب",
          desc: R`الموديل بيطلّع الرد token ورا token، والرد الكامل ممكن ياخد ٢٠ ثانية. بدل ما المستخدم يبص على spinner، بتعمل stream: السيرفر بيطلب من الـ API بـ streaming، وكل حتة نص توصله بيبعتها للمتصفح على طول.

السيرفر هنا proxy (المفتاح مايروحش للمتصفح، تاب «الذكاء الاصطناعي» درس [[backend proxy]]). والأهم: لو المستخدم قفل الصفحة أو داس «وقّف»، الطلب للموديل نفسه لازم يتلغي، وإلا بتدفع tokens محدش هيقراها.`,
          example: R`// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return Response.json({ title: "Unauthorized", status: 401 }, { status: 401 });
  const parsed = Question.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ title: "Invalid question", status: 422 }, { status: 422 });
  const stream = client.messages.stream(
    { model: "claude-opus-5-5", max_tokens: 4096, messages: [{ role: "user", content: parsed.data.question }] },
    { signal: request.signal },
  );
  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const e of stream) {
          if (e.type === "content_block_delta" && e.delta.type === "text_delta") controller.enqueue(enc.encode(e.delta.text));
        }
        controller.close();
      } catch (err) {
        if (!request.signal.aborted) controller.error(err);
      }
    },
    cancel() { stream.abort(); },
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" } });
}`,
          try: R`شغّل الـ route واطلبه بـ [[curl -N -X POST localhost:3000/api/chat -H 'Content-Type: application/json' -d '{"question":"اشرح REST في ١٠ سطور"}']] (ومعاه الكوكي بتاعة الـ login). شوف النص بيطلع حتة حتة. وبعدين اعمل [[Ctrl+C]] في النص، وافتح لوحة الـ usage عند المزوّد (أو اطبع في [[cancel]]) وتأكد إن الطلب اتقطع فعلًا.`,
          flag: "script",
          deep: {
            why: "أول كلمة بعد نص ثانية بتحسّس المستخدم إن الأب سريع، حتى لو الرد كله خد ١٥ ثانية. ومن غير الإلغاء، كل مستخدم بيدوس «وقّف» أو بيقفل التابة بيسيب الطلب شغال عند المزوّد للآخر، وده فلوس على الفاضي، وبيستهلك الـ rate limit بتاعك.",
            how: R`[[client.messages.stream(...)]] بيرجّع object تقدر تلف عليه بـ [[for await]]. كل event ليه [[type]]: [[message_start]]، وبعدين [[content_block_start]]، وبعدين [[content_block_delta]] كتير (النص في [[delta.text]] لما [[delta.type === "text_delta"]])، وفي الآخر [[message_delta]] (فيه [[stop_reason]] و usage) و [[message_stop]]. احنا بنبعت النص بس.

التاني في [[stream(...)]] هو request options، و [[signal]] فيها بيربط الطلب للمزوّد بالـ signal بتاع طلب المستخدم: لما المستخدم يقطع، Next بيعمل abort للـ request.signal، والـ SDK بيقفل الاتصال بالمزوّد. و [[cancel()]] في الـ ReadableStream طبقة أمان تانية: لو القارئ لغى، [[stream.abort()]].

ليه نص عادي ([[text/plain]]) مش SSE؟ لأن كل اللي بتبعته حتت نص، والعميل بيلزقها ورا بعض. ده أبسط شكل وبيتقري بـ [[fetch]] مباشرة. لو محتاج تبعت أنواع مختلفة (نص، ونتيجة tool، و usage، ورسالة خطأ في النص)، ابعت SSE أو NDJSON (سطر JSON لكل حدث)، أو استخدم مكتبة زي Vercel AI SDK اللي بتعرّف بروتوكول جاهز للسيرفر والعميل.

الأخطاء في النص: الـ status (200) بيتبعت مع أول بايت، فلو المزوّد وقع بعد ٣٠٠ كلمة مينفعش ترجع 500. [[controller.error(err)]] بيقطع الـ stream، والعميل بيشوف قراية فشلت، ويعرض «حصل خطأ». لو حصل abort من المستخدم، ده مش خطأ، فمتعملش error.

والموديلات اللي بتفكّر قبل ما ترد (thinking): أول نص ممكن يتأخر لحد ما التفكير يخلص، والـ events الأولى مبيبقاش فيها [[text_delta]]. اعرض «بيفكّر...» لحد أول حتة نص.

وده لسه endpoint عام: auth، و rate limit لكل مستخدم (المستوى ٣: token bucket و quota)، وحد لطول السؤال في الـ schema، وانت اللي بتختار الموديل و [[max_tokens]]. وسجّل الـ usage من [[await stream.finalMessage()]] لو محتاج تحاسب كل مستخدم.`,
            when: "أي رد من موديل هيتعرض لمستخدم وهو مستني: شات، وتلخيص، وكتابة. ولو الرد قصير (تصنيف، أو استخراج JSON)، الطلب العادي أبسط.",
            mistakes: R`تعمل [[await]] للرد كله وبعدين تبعته (فمفيش stream خالص). ومتربطش الـ signal، فالإلغاء بيقفل المتصفح بس والمزوّد مكمّل. و [[controller.error]] على الـ abort فالـ logs تتملي errors وهمية. وتبعت [[JSON.stringify(event)]] كله للمتصفح (فيه ids وتفاصيل داخلية مالهاش لازمة). وتحط الـ API key في الفرونت عشان «الـ streaming أسهل من هناك».`
          },
          teach: R`## الفكرة: السيرفر في النص بيعدّي الحتت

فيه stream داخل (من المزوّد للسيرفر بتاعك)، و stream خارج (من السيرفر بتاعك للمتصفح). الـ route بيقرا الأول event ورا event، وأي حتة نص بيحطها في التاني على طول. ولما المتصفح يقطع، الطلب للمزوّد بيتقطع معاه.

اتجرّب على ويندوز 11: Next.js 16.4.0 ([[next build]] ثم [[next start -p 6007]]) و [[@anthropic-ai/sdk]] 0.132.1 على Node 24.19. **مكان المزوّد الحقيقي** حطينا سيرفر mock على بورت ٦٠٠٨ بيتكلم بنفس شكل الـ streaming بتاع Messages API (نفس أسماء الـ events)، وبيبعت كلمة كل ١٥٠ ملّي ثانية، وبيطبع لما العميل يقطع. الـ SDK بيروح له لأننا شغّلنا Next بـ [[ANTHROPIC_BASE_URL=http://localhost:6008]] (الـ SDK بيقرا المتغير ده لوحده) و [[ANTHROPIC_API_KEY]] وهمي. [[getUser]] بيقرا كوكي [[session=ok]] (تجربة)، و [[Question]] هي [[z.object({ question: z.string().min(1).max(2000) })]].

---

## ١. الـ SDK والعميل

~~~ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
~~~

[[new Anthropic()]] من غير أي options بيقرا [[ANTHROPIC_API_KEY]] (و [[ANTHROPIC_BASE_URL]] لو موجود) من متغيرات البيئة على السيرفر. الملف ده [[route.ts]]، فمبيتبعتش للمتصفح أصلًا، والمفتاح مبيخرجش.

## ٢. auth والـ validation قبل أي token

~~~ts
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return Response.json({ title: "Unauthorized", status: 401 }, { status: 401 });
~~~

[[Response.json(body, init)]] بيعمل رد JSON بالـ status اللي في [[init]].

~~~text الناتج (من غير الكوكي)
HTTP/1.1 401 Unauthorized
{"title":"Unauthorized","status":401}
~~~

~~~ts
  const parsed = Question.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ title: "Invalid question", status: 422 }, { status: 422 });
~~~

- [[request.json()]] بيقرا الـ body كـ JSON، ولو مكسور بيرمي. [[.catch(() => null)]] بيحوّل الرمية دي لـ [[null]].
- [[safeParse]] مبيرميش: بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]].

~~~text الناتج (body غلط، و JSON مكسور، وسؤال فاضي)
{"title":"Invalid question","status":422} 422
{"title":"Invalid question","status":422} 422
{"title":"Invalid question","status":422} 422
~~~

> النسخة الأولى من المثال كانت [[Question.parse(await request.json())]]، والـ body الغلط رجّع **500** و [[ZodError]] في log الـ Next، لأن مفيش error handler بيحوّلها زي Express. اتصلحت للشكل ده.

---

## ٣. اطلب الرد بـ streaming

~~~ts
  const stream = client.messages.stream(
    { model: "claude-opus-5-5", max_tokens: 4096, messages: [{ role: "user", content: parsed.data.question }] },
    { signal: request.signal },
  );
~~~

[[messages.stream]] بياخد ٢ arguments:

| الـ argument | فيه إيه |
|---|---|
| الأول (الطلب) | [[model]]، و [[max_tokens]] (أقصى طول للرد)، و [[messages]]: المحادثة، كل رسالة [[role]] و [[content]] |
| التاني (request options) | إعدادات الاتصال نفسه، ومنها [[signal]] |

الموديل و [[max_tokens]] **انت** اللي بتحددهم في السيرفر، مش جايين من العميل. والـ mock سجّل الطلب اللي وصله:

~~~text الناتج (log الـ mock)
09:18:08.425 POST /v1/messages model=claude-opus-5-5 stream=true max_tokens=4096
~~~

[[signal: request.signal]]: الـ signal بتاع طلب المستخدم نفسه. لما المستخدم يقطع، Next بيعمل abort، والـ SDK بيقفل الاتصال بالمزوّد.

## ٤. الـ events اللي جاية

لفّينا على نفس الـ stream من script صغير وطبعنا نوع كل event:

~~~text الناتج
message_start
content_block_start
content_block_delta {"type":"text_delta","text":"REST "}
content_block_delta {"type":"text_delta","text":"طريقة "}
...
content_block_stop
message_delta
message_stop
stop_reason: end_turn usage: {"input_tokens":12,"output_tokens":57}
~~~

النص كله في [[content_block_delta]] لما [[delta.type]] يبقى [[text_delta]]. الباقي معلومات عن الرسالة ([[stop_reason]] و [[usage]] في [[message_delta]]، وبتجيبهم كلهم بـ [[await stream.finalMessage()]]).

---

## ٥. الـ stream اللي رايح للمتصفح

~~~ts
  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const e of stream) {
          if (e.type === "content_block_delta" && e.delta.type === "text_delta") controller.enqueue(enc.encode(e.delta.text));
        }
        controller.close();
~~~

- [[for await (const e of stream)]]: كل event من المزوّد أول ما يوصل.
- الشرط بيفلتر النص بس، وبيبعته بايتات ([[enc.encode]]).
- الـ [[&&]] الأول مهم لـ TypeScript: بعد ما يتأكد إن [[e.type]] هو [[content_block_delta]]، بيعرف إن [[e.delta]] موجود.
- المزوّد خلص؟ [[controller.close()]]: المتصفح يعرف إن الرد خلص.

~~~ts
      } catch (err) {
        if (!request.signal.aborted) controller.error(err);
      }
    },
~~~

لو الـ loop رمى: يا المزوّد وقع في النص، يا المستخدم هو اللي قطع (الـ abort بيخلي الـ SDK يرمي). [[request.signal.aborted]] بيفرّق بينهم. خطأ حقيقي = [[controller.error]] (العميل بيشوف القراية فشلت)، والإلغاء مش خطأ.

ليه مش 500؟ لأن الـ [[200]] اتبعت مع أول بايت. بعدها مينفعش تغيّر الـ status.

~~~ts
    cancel() { stream.abort(); },
  });
~~~

[[cancel]] بتتنادى لما **القارئ** يلغي الـ stream (العميل قفل). [[stream.abort()]] بيقطع الطلب للمزوّد. ده طبقة أمان تانية جنب الـ [[signal]].

~~~ts
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" } });
~~~

نص عادي، مش SSE: كل اللي بنبعته حتت نص بتتلزق ورا بعض. و [[charset=utf-8]] مهم للعربي.

---

## ٦. التجربة

~~~bash
curl -siN -X POST localhost:6007/api/chat -H 'Cookie: session=ok' -H 'Content-Type: application/json' -d '{"question":"اشرح REST في ١٠ سطور"}'
~~~

طبعنا الوقت قبل كل حتة وصلت:

~~~text الناتج
HTTP/1.1 200 OK
cache-control: no-cache
content-type: text/plain; charset=utf-8
x-accel-buffering: no
Transfer-Encoding: chunked

REST
[160ms]طريقة
[311ms]لتصميم
[466ms]الـ
[617ms]APIs:
[770ms]كل
~~~

كل حتة لوحدها، وراها بـ ١٥٠ ملّي ثانية تقريبًا (سرعة الـ mock). والطلب الكامل خلص في log الـ mock بـ [[finished, deltas = 57]].

### الإلغاء

~~~bash
curl -sN --max-time 1.2 -X POST localhost:6007/api/chat -H 'Cookie: session=ok' -H 'Content-Type: application/json' -d '{"question":"اشرح REST"}'
~~~

~~~text الناتج (curl)
REST طريقة لتصميم الـ APIs: كل حاجة resource
~~~

~~~text الناتج (log الـ mock)
09:18:17.509 POST /v1/messages model=claude-opus-5-5 stream=true max_tokens=4096
09:18:18.699 client disconnected after 8 deltas
~~~

curl قفل بعد ١.٢ ثانية، وفي نفس اللحظة تقريبًا المزوّد شاف الاتصال اتقطع بعد ٨ حتت بس من ٥٧، و [[cancelled]] اتطبعت في log الـ Next (من [[console.log]] حطيناه في [[cancel]]). مع مزوّد حقيقي ده معناه إن الـ output tokens وقفت تتحسب.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| auth | [[getUser()]] ← 401 |
| validation | [[safeParse]] ← 422 |
| طلب للمزوّد | [[client.messages.stream(params, { signal: request.signal })]] |
| فلترة | [[content_block_delta]] + [[text_delta]] ← [[enqueue]] |
| نهاية | [[controller.close()]] |
| خطأ في النص | [[controller.error]] إلا لو [[aborted]] |
| إلغاء | [[signal]] + [[cancel() { stream.abort() }]] |

- كل الفحوصات **قبل** ما تطلب من المزوّد: الـ tokens فلوس.
- الـ [[signal]] هو اللي بيوصّل الإلغاء من المتصفح للمزوّد.
- بعد أول بايت الـ status اتحدد، فالخطأ في النص بيبان كـ stream مقطوع.`,
          lines: [
            "الـ SDK الرسمي.",
            R`بيقرا [[ANTHROPIC_API_KEY]] من البيئة على السيرفر، ومبيروحش للمتصفح.`,
            "POST، لأن السؤال في الـ body.",
            "مين بيسأل؟",
            "مش مسجّل؟ 401 قبل ما تصرف أي token.",
            R`تحقق من الـ body بـ Zod ([[Question]] فيها حد أقصى للطول). [[safeParse]] مبيرميش، و [[.catch(() => null)]] بتخلي الـ JSON المكسور يبقى null فيفشل الفحص بدل ما يوقّع الـ route.`,
            "body غلط؟ 422 بدل 500، وقبل أي token.",
            "اطلب الرد بـ streaming...",
            "...انت اللي بتحدد الموديل والحد الأقصى، مش العميل...",
            R`...و [[signal]]: لو المستخدم قطع، الطلب للمزوّد بيتقطع معاه.`,
            "قفلة.",
            "encoder للنص.",
            "الـ stream اللي هيروح للمتصفح.",
            "بيبدأ أول ما الرد يتبعت.",
            "جرّب...",
            "...لكل event من المزوّد...",
            "...لو حتة نص، ابعتها على طول.",
            "قفلة الـ loop.",
            "الموديل خلص: اقفل الـ stream.",
            "لو حصل خطأ...",
            "...ومش بسبب إن المستخدم لغى، اقطع الـ stream بـ error عشان العميل يعرف.",
            "قفلة.",
            "قفلة start.",
            "لو القارئ لغى الـ stream، الغي الطلب للمزوّد.",
            "قفلة.",
            "رجّع الـ stream نص عادي، من غير كاش ولا buffering.",
            "قفلة."
          ],
          sol: R`مع [[curl -N]] الكلام بيطلع حتت، كل حتة كلمة أو كلمتين، مش مرة واحدة. لو طلع كله في الآخر: يا انت ناسي [[-N]]، يا فيه buffering في Nginx أو في middleware ضغط.

لما تعمل [[Ctrl+C]] في النص: الـ curl بيقفل، و Next بيعمل abort لـ [[request.signal]]، والـ SDK بيقطع الاتصال بالمزوّد. لو حطيت [[console.log("cancelled")]] في [[cancel()]] هتلاقيه اتطبع. وفي لوحة المزوّد، الـ output tokens للطلب ده هتبقى أقل بكتير من طلب كامل لنفس السؤال.

الغلط الشائع: الإلغاء بيقفل الـ curl بس، والـ log بتاع الـ loop فاضل يطبع لحد الآخر. ده معناه إن [[signal]] مش متباصي للـ SDK.`
        },
        {
          cmd: "ستريم في React",
          title: "اعرض الرد كلمة كلمة ووقّفه بزرار",
          desc: R`في المتصفح [[fetch]] بيرجّع الـ response أول ما الـ headers توصل، و [[res.body]] نفسه stream. بتقراه بـ [[getReader()]] حتة حتة، وكل حتة تضيفها للـ state، فـ React يعرض الرد وهو بيكبر.

والإلغاء بـ [[AbortController]]: بتدّي الـ [[signal]] بتاعه لـ fetch، ولما المستخدم يدوس «وقّف» تنادي [[abort()]]. الـ fetch بيقطع، والسيرفر بيعرف (الدرس اللي فات) ويقطع الطلب للموديل.`,
          example: R`"use client";
import { useEffect, useRef, useState } from "react";
export function AskBox() {
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);
  useEffect(() => () => ctrl.current?.abort(), []);
  async function ask(question: string) {
    ctrl.current?.abort();
    const ac = (ctrl.current = new AbortController());
    setAnswer("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: ac.signal });
      if (!res.ok || !res.body) throw new Error($__btHTTP $__{res.status}$__bt);
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((a) => a + value);
      }
    } catch {
      if (!ac.signal.aborted) setAnswer((a) => a + "\n[حصل خطأ، جرّب تاني]");
    } finally {
      if (ctrl.current === ac) setBusy(false);
    }
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); ask(String(new FormData(e.currentTarget).get("q"))); }}>
      <input name="q" required maxLength={2000} />
      {busy ? <button key="stop" type="button" onClick={() => ctrl.current?.abort()}>وقّف</button> : <button key="ask">اسأل</button>}
      <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
    </form>
  );
}`,
          try: R`حط الـ component في صفحة واسأل سؤال طويل. دوس «وقّف» في النص: الرد يقف عند آخر كلمة وصلت، والزرار يرجع «اسأل». وبعدين اسأل سؤالين ورا بعض بسرعة: الأول لازم يتلغي والتاني بس هو اللي يظهر، من غير ما الردين يتلخبطوا في بعض.`,
          flag: "script",
          deep: {
            why: "الـ streaming من السيرفر مالوش لازمة لو الفرونت بيستنى الرد كله. وزرار «وقّف» مش رفاهية: المستخدم بيكتشف من أول سطرين إن السؤال غلط، ومن غير إلغاء حقيقي، الرد بيكمّل في الخلفية وبيدفع تمنه.",
            how: R`[[res.body]] من نوع [[ReadableStream<Uint8Array>]]: بايتات. [[pipeThrough(new TextDecoderStream())]] بيحوّلها نص UTF-8 صح. ودي مهمة جدًا مع العربي: الحرف العربي بايتين، والحتة ممكن تتقطع في نص الحرف. لو عملت [[new TextDecoder().decode(chunk)]] لكل حتة لوحدها، هتطلع علامات غريبة. الـ stream decoder فاكر البايت الناقص ويكمّله مع الحتة اللي بعدها.

[[reader.read()]] بيرجّع [[{ value, done }]]. لما [[done]] يبقى true، السيرفر قفل الـ stream. و [[setAnswer((a) => a + value)]] بالشكل الـ function عشان كل تحديث يبني على آخر قيمة، مش على القيمة اللي كانت وقت ما الدالة بدأت.

الإلغاء: [[ac.abort()]] بيخلي الـ fetch أو الـ [[read()]] اللي مستني يرمي [[AbortError]]. عشان كده في الـ catch بنسأل [[ac.signal.aborted]]: لو المستخدم هو اللي لغى، ده مش خطأ نعرضه.

الـ ref بيشيل الـ controller الحالي. لو سأل تاني قبل ما الأول يخلص، [[ctrl.current?.abort()]] بيلغي القديم. والـ finally بيتأكد إن الطلب ده لسه هو الحالي قبل ما يقفل الـ busy، عشان الطلب القديم لما يتلغي ميقفلش الـ busy بتاع الجديد. والـ useEffect بيلغي أي طلب شغال لو الـ component اتشال من الصفحة.

لو بتستخدم EventSource (SSE عادي): [[es.close()]] هو الإلغاء. بس EventSource مبيعملش POST ولا بيبعت body أو headers، عشان كده ردود AI غالبًا [[fetch]] زي هنا.

وفيه مكتبات بتعمل كل ده (زي [[useChat]] في Vercel AI SDK)، بس فهم الـ loop ده هو اللي بيخليك تصلّح لما حاجة تبوظ.`,
            when: "أي واجهة بتعرض رد طويل بيتولّد: شات، وتلخيص، وكتابة. ونفس الطريقة لأي download كبير عايز تعرض تقدّمه.",
            mistakes: R`[[TextDecoder]] لكل حتة لوحدها فالعربي يطلع مكسور في حدود الحتت. و [[setAnswer(answer + value)]] بالقيمة القديمة فالرد يطلع آخر حتة بس. ومفيش إلغاء للطلب القديم لما يسأل تاني، فالردين يتكتبوا فوق بعض. وتعرض «حصل خطأ» لما المستخدم نفسه داس وقّف. وتنسى الإلغاء عند الـ unmount، فالـ state بيتحدث في component مش موجود والطلب مكمّل.`
          },
          teach: R`## الفكرة: اقرا الرد حتة حتة، وخلّي الإلغاء في إيدك

component فيه input وزرار. لما تسأل: [[fetch]] للـ route بتاع الدرس اللي فات، وبعدين loop بيقرا الـ body حتة حتة ويضيفها للـ state، فالرد بيكبر قدامك. وزرار «وقّف» بينادي [[abort()]] على [[AbortController]] الطلب.

اتجرّب على ويندوز 11: الـ component جوه صفحة Next.js 16.4.0 (React 19.3)، بيكلم [[/api/chat]] من الدرس اللي فات، والمزوّد هو نفس الـ mock على بورت ٦٠٠٨ (كلمة كل ١٥٠ ملّي ثانية، والرد بيبدأ بالسؤال بين أقواس عشان نعرف ده رد أنهي سؤال). الصفحة اتفتحت في Chrome headless بـ playwright-core، وبنقرا الزرار والرد من الصفحة.

---

## ١. الحالة

~~~tsx
"use client";
import { useEffect, useRef, useState } from "react";
export function AskBox() {
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);
~~~

- [["use client"]]: الملف ده بيشتغل في المتصفح (فيه state و events). من غيره Next بيعتبره Server Component.
- [[useState("")]]: قيمة بتتغير، وكل تغيير بيعيد رسم الـ component. بيرجّع [[[القيمة، دالة التغيير]]].
- [[answer]]: الرد اللي بيكبر. [[busy]]: فيه طلب شغال ولا لأ.
- [[useRef]]: صندوق بيفضل موجود بين الـ renders، وتغييره **مش** بيعيد الرسم. فيه الـ [[AbortController]] بتاع الطلب الحالي.
- [[AbortController | null]]: النوع يا controller يا [[null]] (لسه مفيش طلب).

~~~tsx
  useEffect(() => () => ctrl.current?.abort(), []);
~~~

[[useEffect(fn, [])]] بالـ [[[]]] الفاضية بيشتغل مرة لما الـ component يظهر. والدالة اللي **بيرجّعها** (السهم التاني) بتشتغل لما الـ component يتشال: الغي أي طلب شغال. و [[?.]] معناها «لو مش null، نادي».

---

## ٢. [[ask]]: إلغاء القديم وبداية الجديد

~~~tsx
  async function ask(question: string) {
    ctrl.current?.abort();
    const ac = (ctrl.current = new AbortController());
    setAnswer("");
    setBusy(true);
~~~

- أول حاجة: لو فيه سؤال قديم شغال، الغيه.
- [[(ctrl.current = new AbortController())]]: اعمل controller جديد، وحطه في الـ ref، وفي نفس الوقت في [[ac]]. ليه نسخة محلية؟ لأن [[ctrl.current]] ممكن يتغير لو سؤال جديد جه، و [[ac]] بيفضل يشاور على controller **الطلب ده**.
- امسح الرد القديم، وعلّم إن فيه شغل.

## ٣. الطلب

~~~tsx
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: ac.signal });
      if (!res.ok || !res.body) throw new Error($__btHTTP $__{res.status}$__bt);
~~~

- [[fetch]] بيرجع أول ما الـ **headers** توصل، مش لما الرد كله يخلص.
- [[signal: ac.signal]]: ده اللي بيربط الطلب بزرار «وقّف».
- [[res.ok]]: true لو الـ status من 200 لـ 299. 401 أو 422 أو 429 = اعتبره خطأ.
- [[res.body]]: الـ stream نفسه. ممكن يبقى [[null]] (زي رد 204)، فبنتأكد.

## ٤. القراية

~~~tsx
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
~~~

من جوه لبرة:

1. [[res.body]]: stream بايتات ([[Uint8Array]]).
2. [[.pipeThrough(new TextDecoderStream())]]: عدّيه على محوّل بيطلّع نص UTF-8.
3. [[.getReader()]]: reader تقرا بيه حتة حتة.

ليه [[TextDecoderStream]] مش [[new TextDecoder().decode(chunk)]] لكل حتة؟ الحرف العربي بايتين، والحتة ممكن تتقطع في نصه. جربنا كلمة [[سلام]] (٨ بايت) مقسومة ٣ و ٥:

~~~text الناتج (node)
bytes: 8 d8 b3 d9 84 d8 a7 d9 85
TextDecoder per chunk: "س��ام"
chunk: "س"
chunk: "لام"
TextDecoderStream: "سلام"
~~~

الـ decoder المنفصل طلّع [[�]] (حرف مكسور) مكان اللام. الـ stream decoder شال البايت الناقص لحد الحتة اللي بعدها.

~~~tsx
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((a) => a + value);
      }
~~~

- [[reader.read()]] بيستنى الحتة الجاية، وبيرجّع [[{ value, done }]].
- [[done]] = true لما السيرفر يقفل الـ stream: اخرج من الـ loop.
- [[setAnswer((a) => a + value)]]: بنباصي **دالة** مش قيمة. React بيدّيها آخر قيمة فعلية لـ [[answer]]. لو كتبت [[setAnswer(answer + value)]]، [[answer]] هنا هي القيمة اللي كانت وقت ما [[ask]] بدأت (فاضية)، فكل حتة هتمسح اللي قبلها.

## ٥. الأخطاء والنهاية

~~~tsx
    } catch {
      if (!ac.signal.aborted) setAnswer((a) => a + "\n[حصل خطأ، جرّب تاني]");
    } finally {
      if (ctrl.current === ac) setBusy(false);
    }
~~~

- [[catch]] من غير [[(err)]]: مش محتاجين الخطأ نفسه.
- [[abort()]] بيخلي الـ [[fetch]] أو الـ [[read()]] اللي مستني يرمي [[AbortError]]. لو [[ac.signal.aborted]] true، المستخدم هو اللي وقّف، فمش هنعرض خطأ.
- [[finally]]: لو الطلب ده لسه هو الحالي، اقفل [[busy]]. لو سؤال جديد بدأ، [[ctrl.current]] بقى controller تاني، فالطلب القديم ميقفلش busy بتاع الجديد.

---

## ٦. الواجهة

~~~tsx
    <form onSubmit={(e) => { e.preventDefault(); ask(String(new FormData(e.currentTarget).get("q"))); }}>
~~~

- [[e.preventDefault()]]: امنع الـ form إنه يعمل reload للصفحة.
- [[new FormData(e.currentTarget)]]: اقرا كل حقول الـ form، و [[.get("q")]] قيمة الـ input اللي اسمه [[q]].
- [[String(...)]]: [[get]] ممكن يرجّع ملف أو null، فبنحوّله نص.

~~~tsx
      <input name="q" required maxLength={2000} />
~~~

[[required]] و [[maxLength]] للمستخدم بس. السيرفر بيتحقق تاني (الـ [[max(2000)]] في Zod).

~~~tsx
      {busy ? <button key="stop" type="button" onClick={() => ctrl.current?.abort()}>وقّف</button> : <button key="ask">اسأل</button>}
~~~

- [[cond ? A : B]]: لو شغال اعرض «وقّف»، غير كده «اسأل».
- [[type="button"]]: زرار عادي مش بيبعت الـ form. و «اسأل» من غير [[type]] = [[submit]] (الافتراضي جوه form).
- [[key]] المختلف: **ده كان bug في النسخة الأولى من المثال**. من غير [[key]]، React شايف «زرار مكان زرار»، فبيستخدم **نفس** عنصر الـ DOM ويغيّر الـ [[type]] بتاعه بس. لما دوسنا «وقّف»: الـ abort حصل، و [[busy]] بقى false، والزرار اتحوّل submit **قبل** ما المتصفح يخلص الضغطة، فالـ form اتبعت تاني بنفس السؤال:

~~~text الناتج (من غير key)
after 0.7s        | button: وقّف | answer: "(سؤال1) REST طريقة لتصميم الـ "
right after stop  | button: وقّف | answer: "(سؤال1) "
1s after stop     | button: وقّف | answer: "(سؤال1) REST طريقة لتصميم الـ APIs: كل حاجة "
~~~

«وقّف» مسح الرد وبدأ نفس السؤال من الأول. بالـ [[key]]، React بيشيل الزرار القديم ويحط واحد جديد، فالضغطة بتخلص على زرار مبقاش في الـ form:

~~~text الناتج (بالـ key)
after 0.7s        | button: وقّف | answer: "(سؤال1) REST طريقة لتصميم الـ "
right after stop  | button: اسأل | answer: "(سؤال1) REST طريقة لتصميم الـ "
1s after stop     | button: اسأل | answer: "(سؤال1) REST طريقة لتصميم الـ "
~~~

الرد وقف عند آخر كلمة، والزرار رجع «اسأل»، والطلب ظهر في المتصفح [[net::ERR_ABORTED]]. و log الـ mock: [[client disconnected after 5 deltas]].

~~~tsx
      <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
~~~

[[style={{ }}]]: الأقواس الأولى «JavaScript جوه JSX»، والتانية object الـ CSS. و [[pre-wrap]] بيخلي الـ [[\n]] تبان سطر جديد.

---

## ٧. سؤالين ورا بعض

سألنا [[سؤال2]]، وبعد نص ثانية [[سؤال3]]:

~~~text الناتج
q3 after 0.7s   | button: وقّف | answer: "(سؤال3) REST طريقة لتصميم الـ "
q3 finished     | button: اسأل | answer: "(سؤال3) REST طريقة ... بتقول هتعمل إيه. "
~~~

~~~text الناتج (log الـ mock)
09:20:43.422 POST /v1/messages ...
09:20:43.938 client disconnected after 4 deltas
09:20:43.941 POST /v1/messages ...
09:20:52.825 finished, deltas = 58
~~~

الطلب التاني اتقطع عند المزوّد نفسه أول ما التالت بدأ (٣ ملّي ثانية بينهم)، والرد اللي ظهر هو رد التالت بس.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[useRef<AbortController>]] | الطلب الحالي، من غير re-render |
| [[ctrl.current?.abort()]] أول [[ask]] | سؤال جديد يلغي القديم |
| [[signal: ac.signal]] | يربط الـ fetch بالإلغاء |
| [[pipeThrough(new TextDecoderStream())]] | العربي ميتكسرش بين الحتت |
| [[setAnswer((a) => a + value)]] | يبني على آخر قيمة |
| [[ac.signal.aborted]] في catch | الإلغاء مش خطأ |
| [[ctrl.current === ac]] في finally | الطلب القديم ميقفلش busy بتاع الجديد |
| [[key]] على الزرارين | «وقّف» ميبعتش الـ form |
| [[useEffect]] cleanup | الغي لو الـ component اتشال |`,
          lines: [
            "component في المتصفح (فيه state و events).",
            "الـ hooks.",
            "صندوق السؤال.",
            "الرد اللي بيكبر.",
            "فيه طلب شغال؟",
            "الـ AbortController الحالي، في ref عشان ميتعملش render لما يتغير.",
            "لو الـ component اتشال، الغي أي طلب شغال.",
            "بتتنادى مع كل سؤال.",
            "لو فيه سؤال قديم لسه شغال، الغيه.",
            "controller جديد للطلب ده، واحفظه كـ «الحالي».",
            "امسح الرد القديم.",
            "وعلّم إن فيه طلب شغال.",
            "جرّب...",
            "...ابعت السؤال، ومعاه الـ signal عشان الإلغاء.",
            "السيرفر رفض (401 أو 429 مثلًا)؟ اعتبره خطأ.",
            "حوّل البايتات لنص UTF-8 صح (حتى لو الحرف العربي اتقسم بين حتتين)، وخد reader.",
            "لف...",
            "...استنى الحتة الجاية.",
            "السيرفر قفل: خلصنا.",
            "ضيف الحتة للرد (بالشكل الـ function عشان تبني على آخر قيمة).",
            "قفلة الـ loop.",
            "لو حصل أي خطأ...",
            "...ومش المستخدم اللي لغى، قوله.",
            "في الآخر...",
            "...لو الطلب ده لسه الحالي (مش واحد اتلغى عشان جه سؤال جديد)، اقفل الـ busy.",
            "قفلة.",
            "قفلة ask.",
            "الواجهة:",
            "form: خد السؤال من الـ input وابعته.",
            "مكان السؤال بحد أقصى للطول (والسيرفر بيتحقق تاني).",
            R`وقت الشغل الزرار «وقّف» بينادي abort، وغير كده «اسأل». الـ [[key]] المختلف بيخلي React يعمل زرارين منفصلين: من غيره بيغيّر [[type]] نفس الزرار لـ submit في نص الضغطة، فـ «وقّف» بيبعت السؤال تاني.`,
            "الرد، و pre-wrap عشان السطور الجديدة تبان.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تدوس «وقّف»: الـ [[read()]] بيرمي AbortError، الـ catch بيشوف [[ac.signal.aborted]] true فمش بيعرض خطأ، والـ finally بيقفل الـ busy فالزرار يرجع «اسأل». الرد بيفضل عند آخر كلمة وصلت. وفي الـ Network tab الطلب هيبان «(canceled)».

لما تسأل سؤالين ورا بعض بسرعة: الطلب الأول بيتلغي أول ما التاني يبدأ، و [[setAnswer("")]] بيمسح، فمش هتشوف غير رد التاني. لو شفت كلام الردين متلخبط، يبقى الإلغاء مش شغال (غالبًا الـ signal مش متباصي لـ fetch).

ولو الزرار فضل «وقّف» بعد ما الرد التاني خلص: الشرط [[ctrl.current === ac]] ناقص، والطلب الأول لما اتلغى قفل الـ busy بدري، أو العكس.`
        }
      ]
    }
]);
