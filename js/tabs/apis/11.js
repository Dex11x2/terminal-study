// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "APIs للمطوّرين التانيين",
      l: 3,
      n: "لما ناس برّه بتبني على الـ API بتاعك: مفاتيح API آمنة، و webhooks صادرة موقّعة وبتتعاد ومحمية من SSRF، و tRPC و gRPC إمتى",
      items: [
        {
          cmd: "API keys",
          title: "مفاتيح للعملاء: تتولّد وتتخزن hash ولها صلاحيات",
          desc: R`الـ API key سر طويل عشوائي العميل بيحطه في [[Authorization: Bearer sk_live_...]]. بتظهره مرة واحدة وقت الإنشاء، وتخزّن الـ hash بتاعه بس (زي الباسورد)، ومعاه prefix قصير عشان العميل يعرف أنهي مفتاح في اللوحة.

وكل مفتاح ليه scopes (orders:read بس مثلًا)، وتاريخ آخر استخدام، ويتلغي لوحده. والتدوير: مفتاح جديد، والقديم يفضل شغال فترة سماح لحد ما العميل يبدّل.`,
          example: R`const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
export async function createApiKey(orgId: string, name: string, scopes: string[]) {
  const secret = "sk_live_" + crypto.randomBytes(32).toString("base64url");
  await db.apiKey.create({ data: { orgId, name, scopes, prefix: secret.slice(0, 12), hash: sha256(secret) } });
  return secret;
}
export async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const secret = req.get("authorization")?.match(/^Bearer (sk_live_[\w-]{43})$/)?.[1];
  const key = secret ? await db.apiKey.findUnique({ where: { hash: sha256(secret) } }) : null;
  if (!key || key.revokedAt || (key.expiresAt && key.expiresAt < new Date())) return res.status(401).set("WWW-Authenticate", "Bearer").json({ title: "Invalid API key", status: 401 });
  req.apiKey = key;
  db.apiKey.update({ where: { id: key.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
  next();
}
export const requireScope = (scope: string) => (req: Request, res: Response, next: NextFunction) =>
  req.apiKey.scopes.includes(scope) ? next() : res.status(403).json({ title: "Forbidden", status: 403, detail: $__btAPI key lacks scope $__{scope}$__bt });
app.get("/v1/orders", apiKeyAuth, requireScope("orders:read"), planLimits, listOrders);`,
          try: R`اعمل مفتاح بـ scope [[orders:read]] واطبعه. اتأكد إن السر مش موجود في أي حتة في القاعدة. جرّب: المفتاح الصح على [[GET /v1/orders]]، ونفس المفتاح على endpoint محتاج [[orders:write]]، ومفتاح متألف. وبعدين اعمل «تدوير»: مفتاح جديد، وحط [[expiresAt]] للقديم بعد ٢٤ ساعة.`,
          flag: "script",
          deep: {
            why: "المفاتيح بتتسرب: في repo على GitHub، وفي logs، وفي screenshot. لو متخزنة نص عادي، أي حد وصل للقاعدة (أو backup) معاه كل مفاتيح كل العملاء. ولو مفيش scopes، مفتاح اتعمل عشان dashboard قراية بس يقدر يمسح بيانات. ولو مفيش تدوير، العميل بيخاف يغيّر المفتاح لأن كل حاجة هتقع.",
            how: R`التوليد: [[crypto.randomBytes(32)]] = ٢٥٦ bit عشوائية، و base64url بيخليه ٤٣ حرف آمن في الـ URL والـ headers. الـ prefix ([[sk_live_]]) مش زينة: بيخلي أدوات secret scanning (زي GitHub) تتعرف عليه لو اتسرب، وبيفرق بين live و test، وبيخلي الـ regex يرفض أي حاجة شكلها غلط قبل ما يكلّم القاعدة.

ليه SHA-256 مش bcrypt؟ الباسورد قصير وممكن يتخمّن، فمحتاج hash بطيء. المفتاح ٢٥٦ bit عشوائية، مستحيل يتخمّن حتى بـ hash سريع. والـ hash السريع بيخليك تدوّر عليه بـ index ([[hash @unique]]) في كل request من غير ما تبطّأ الـ API. وده اللي GitHub و Stripe بيعملوه تقريبًا.

البحث بالـ hash بدل المقارنة: مفيش مقارنة string بين السر والمتخزن، فمفيش timing attack على المقارنة نفسها.

الـ prefix المتخزن ([[sk_live_mhyN]]): بيتعرض في اللوحة عشان العميل يعرف أنهي مفتاح هو، وفي الـ logs بدل المفتاح.

[[lastUsedAt]]: بيقول للعميل «المفتاح ده مستخدمش من ٦ شهور، امسحه؟»، وبيقولك مين لسه على مفتاح قديم وقت التدوير. التحديث بيحصل من غير await، ولو الضغط عالي خليه مرة كل دقيقة لكل مفتاح بدل كل request.

الـ scopes: قايمة صلاحيات بصيغة [[resource:action]]. الـ middleware بيتحقق من الـ scope المطلوب لكل route. وده غير صلاحيات المستخدم: المفتاح بيبقى تبع org، ومبيقدرش يعمل أكتر من اللي الـ org تقدر تعمله.

التدوير: العميل بيعمل مفتاح جديد، ويبدّل في السيستم بتاعه، والقديم يفضل شغال (بـ [[expiresAt]]) لحد ما يخلص. ولو اتسرب: [[revokedAt]] فورًا. وممكن تبعت إيميل لو مفتاح اتسرب في GitHub (GitHub secret scanning partner program بيبلّغك بالمفاتيح اللي بـ prefix بتاعك).

API key ولا OAuth؟ API key لما العميل هو المطوّر نفسه وبيكلّم الـ API من السيرفر بتاعه. OAuth لما تطبيق تالت عايز يتصرف باسم مستخدمين عندك (زي «اربط حسابك بـ Slack»).`,
            when: "أي API بيستخدمه مطوّرين من سيرفراتهم: B2B، و integrations، و CLI tools. مش للفرونت بتاعك (ده session).",
            mistakes: R`تخزّن المفتاح نص عادي. وتعرضه تاني بعد الإنشاء (لو قدرت تعرضه، يبقى متخزّن). ومفتاح واحد لكل حاجة من غير scopes. وتسجّل الـ Authorization header في الـ logs. ومفيش طريقة تدوير، فالعميل بيقول «مش هغيّره عشان هيوقف كل حاجة». ومفتاح في الفرونت (أي حد يفتح DevTools ياخده).`
          },
          teach: R`## سر بيظهر مرة، و hash بيتخزن

المثال ٤ حتت: دالة بتعمل مفتاح جديد وتخزّن الـ hash بتاعه بس، و middleware بياخد المفتاح من الـ header ويدوّر عليه بالـ hash، و middleware تاني بيتأكد إن المفتاح ليه الصلاحية (scope) اللي الـ route محتاجها، وسطر بيركّبهم على route.

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠١٢). الـ [[db.apiKey]] كان array في الذاكرة بنفس دوال Prisma ([[create]] و [[findUnique]] و [[update]])، و [[planLimits]] هي بتاعة درس [[quota لكل plan]] بـ Redis 8.10 حقيقي. والطلبات بـ curl 8.22 من Git Bash.

---

## ١. الـ hash

~~~ts
const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
~~~

دالة سطر واحد: [[createHash("sha256")]] من [[node:crypto]]، و [[.update(s)]] دخّل النص، و [[.digest("hex")]] طلّع البصمة ٦٤ حرف hex. نفس المدخل = نفس البصمة دايمًا، ومن البصمة مفيش طريقة ترجع للنص.

---

## ٢. إنشاء مفتاح

~~~ts
export async function createApiKey(orgId: string, name: string, scopes: string[]) {
  const secret = "sk_live_" + crypto.randomBytes(32).toString("base64url");
~~~

- [[crypto.randomBytes(32)]]: ٣٢ بايت عشوائية من مصدر آمن = ٢٥٦ bit.
- [[.toString("base64url")]]: كل ٣ بايت بيبقوا ٤ حروف، فـ ٣٢ بايت = ٤٣ حرف (من غير [[=]] في الآخر)، وكلهم من [[A-Z a-z 0-9 - _]].
- [[sk_live_]]: prefix. [[sk]] = secret key، و [[live]] عكس [[test]].

~~~ts
  await db.apiKey.create({ data: { orgId, name, scopes, prefix: secret.slice(0, 12), hash: sha256(secret) } });
  return secret;
}
~~~

[[{ orgId, name, scopes }]] اختصار [[{ orgId: orgId, ... }]]. والمتخزن: أول ١٢ حرف ([[sk_live_]] + ٤) والـ hash. والسر نفسه بيترجع للعميل مرة واحدة ومش متخزن.

~~~text الناتج
KEY=sk_live_bn04qpEn…H5D21-CFLCEbbq1HBypob4 len=51
[{"id":"key_1",...,"name":"dashboard","scopes":["orders:read"],"prefix":"sk_live_bn04","hash":"4e43500f2b5b1e0a61a7870aca7fd273e5eb58bf06f101d6f8da1f215dace455"}]
~~~

٥١ حرف = ٨ + ٤٣. ودوّرنا على الجزء العشوائي من السر في كل الصفوف بـ [[grep -c]]: صفر.

---

## ٣. التحقق

~~~ts
export async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const secret = req.get("authorization")?.match(/^Bearer (sk_live_[\w-]{43})$/)?.[1];
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[req.get("authorization")]] | قيمة الـ header (أو [[undefined]]) |
| [[?.match(regex)]] | لو موجود، طابقه. [[?.]] بتوقف من غير error لو [[undefined]] |
| [[^Bearer ]] | لازم يبدأ بـ [[Bearer]] ومسافة |
| [[(sk_live_[\w-]{43})]] | الـ prefix + ٤٣ حرف بالظبط من [[\w]] (حروف وأرقام و [[_]]) أو [[-]]. الأقواس = group |
| [[$]] | وبعدها مفيش حاجة |
| [[?.[1]]] | الـ group الأولاني، يعني المفتاح من غير [[Bearer]] |

أي حاجة شكلها غلط بتبقى [[undefined]] من غير ما نلمس القاعدة.

~~~ts
  const key = secret ? await db.apiKey.findUnique({ where: { hash: sha256(secret) } }) : null;
~~~

احسب الـ hash ودوّر بيه. [[findUnique]] لأن [[hash]] عليه [[@unique]] في الـ schema، فده index lookup سريع.

~~~ts
  if (!key || key.revokedAt || (key.expiresAt && key.expiresAt < new Date())) return res.status(401).set("WWW-Authenticate", "Bearer").json({ title: "Invalid API key", status: 401 });
~~~

٣ أسباب للرفض: مش موجود، أو اتلغى ([[revokedAt]] فيه تاريخ)، أو ليه تاريخ انتهاء وعدّى. و [[WWW-Authenticate: Bearer]]: الـ HTTP spec بتقول أي 401 لازم يقول طريقة الدخول المطلوبة.

~~~ts
  req.apiKey = key;
  db.apiKey.update({ where: { id: key.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
  next();
}
~~~

- [[req.apiKey = key]]: اللي بعده (الـ scope، والـ plan، والـ handler) يعرف المفتاح.
- التحديث **من غير [[await]]**: الطلب ميستناش الكتابة. و [[.catch(() => {})]]: لو فشلت، متعملش unhandled rejection توقّع الـ process.

---

## ٤. الصلاحية

~~~ts
export const requireScope = (scope: string) => (req: Request, res: Response, next: NextFunction) =>
  req.apiKey.scopes.includes(scope) ? next() : res.status(403).json({ title: "Forbidden", status: 403, detail: $__btAPI key lacks scope $__{scope}$__bt });
~~~

دالة بترجّع دالة: [[requireScope("orders:read")]] بتعمل middleware مخصوص للـ scope ده. الـ [[=> (req, res, next) =>]] الأولى بتاخد الـ scope، والتانية هي الـ middleware نفسه. و 403 مش 401: المفتاح سليم، بس ملوش الصلاحية دي.

~~~ts
app.get("/v1/orders", apiKeyAuth, requireScope("orders:read"), planLimits, listOrders);
~~~

Express بيشغّلهم بالترتيب، وكل واحد بينادي [[next()]] عشان اللي بعده يشتغل. لو واحد رد (401 أو 403 أو 429)، الباقي ميشتغلش.

---

## ٥. الـ try

~~~bash
curl -s -w ' %{http_code}\n' -H "Authorization: Bearer $K" localhost:6012/v1/orders
curl -s -w ' %{http_code}\n' -X POST -H "Authorization: Bearer $K" localhost:6012/v1/orders
~~~

[[$K]] متغير فيه المفتاح. والـ POST على route محتاج [[orders:write]]:

~~~text الناتج
[{"id":"9001","total":500}] 200
{"title":"Forbidden","status":403,"detail":"API key lacks scope orders:write"} 403
~~~

مفتاح متألف بنفس الشكل (٤٣ حرف عشوائي)، ومفتاح شكله غلط، ومن غير header:

~~~text الناتج
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer
{"title":"Invalid API key","status":401}
{"title":"Invalid API key","status":401} 401
{"title":"Invalid API key","status":401} 401
~~~

نفس الرد للتلاتة: المهاجم ميعرفش السبب.

### التدوير

عملنا مفتاح جديد [[dashboard-v2]]، وحطينا [[expiresAt]] للقديم بعد ثانيتين (في الحقيقة ٢٤ ساعة):

~~~text الناتج (قبل الانتهاء، وبعده بـ ٢.٢ ثانية)
old 200 new 200
old 401 new 200
~~~

~~~text الصفوف (id | prefix | hash | lastUsedAt | expiresAt)
key_1 | sk_live_bn04 | 4e43500f2b5b1e0a... | 2026-10-08T09:13:43.865Z | 2026-10-08T09:13:45.822Z
key_2 | sk_live_IG_K | 8ce41d0579976d10... | 2026-10-08T09:13:46.300Z | 
~~~

فترة السماح المفتاحين شغالين، وبعدها القديم بيقع لوحده. و [[lastUsedAt]] للقديم وقف عند آخر استخدام: ده اللي بيقولك العميل بدّل ولا لأ.

---

## الخلاصة

| الخطوة | الكود | ليه |
|---|---|---|
| التوليد | [[randomBytes(32)]] + base64url + [[sk_live_]] | ٢٥٦ bit، والـ prefix للـ scanning والـ regex |
| التخزين | [[prefix]] و [[sha256(secret)]] | تسريب القاعدة ميكشفش المفاتيح |
| الشكل | [[/^Bearer (sk_live_[\w-]{43})$/]] | يرفض الغلط قبل القاعدة |
| البحث | [[findUnique({ hash })]] | index، ومفيش مقارنة نصوص |
| الرفض | مش موجود، أو [[revokedAt]]، أو [[expiresAt]] عدّى | 401 + [[WWW-Authenticate]] |
| الصلاحية | [[requireScope("x")]] | 403 بالسبب |

- السر يظهر مرة واحدة. لو تقدر تعرضه تاني، يبقى متخزن.
- SHA-256 كفاية لأن المفتاح عشوائي وطويل، مش باسورد.`,
          lines: [
            "hash سريع: المفتاح عشوائي وطويل، فمش محتاج bcrypt.",
            "إنشاء مفتاح لـ org باسم وصلاحيات.",
            "٣٢ بايت عشوائية بـ base64url، و prefix بيعرّف نوعه.",
            "خزّن الـ hash والـ prefix بس، مش السر.",
            "رجّعه للعميل مرة واحدة. بعدها مفيش طريقة تشوفه تاني.",
            "قفلة.",
            "middleware التحقق.",
            "خد المفتاح من الـ header، ولازم يطابق الشكل بالظبط.",
            "دوّر بالـ hash (عليه unique index).",
            "مش موجود، أو اتلغى، أو خلص: 401 ومعاه WWW-Authenticate.",
            "الطلب ده بالمفتاح ده.",
            "سجّل آخر استخدام من غير ما تستنى (ومن غير ما فشله يوقّع الطلب).",
            "كمّل.",
            "قفلة.",
            "middleware لكل route: المفتاح لازم فيه الـ scope ده...",
            "...وإلا 403 بالسبب.",
            "الاستخدام: المفتاح، وبعده الصلاحية، وبعدها حدود الخطة."
          ],
          sol: R`المفتاح بيطلع ٥١ حرف: [[sk_live_]] + ٤٣. والقاعدة فيها الـ prefix (أول ١٢ حرف) و hash طوله ٦٤ حرف hex، والسر نفسه مش موجود في أي عمود.

المفتاح الصح على [[orders:read]]: يعدّي. نفس المفتاح على endpoint محتاج [[orders:write]]: [[403]] و [[API key lacks scope orders:write]]. مفتاح متألف: [[401]] (بعد الـ regex لو شكله صح، أو قبله لو شكله غلط). ومن غير header: 401.

في التدوير: المفتاحين شغالين لحد [[expiresAt]] القديم، وبعده القديم بيرجع 401. ولو عايز تتأكد إن العميل بدّل: [[lastUsedAt]] للقديم المفروض يوقف يتحدث.`
        },
        {
          cmd: "توقيع webhooks صادرة",
          title: "وقّع الـ webhooks اللي بتبعتها عشان العميل يثق فيها",
          desc: R`لما حاجة تحصل عندك (طلب اتدفع)، بتبعت POST لـ URL العميل سجّله. العميل لازم يتأكد إن الطلب جاي منك مش من حد عرف الـ URL. الحل: لكل endpoint سر بتولّده وتدّيه للعميل، وكل webhook بيتوقّع بـ HMAC-SHA256 على الـ id والوقت والـ body.

المثال ماشي على مواصفة Standard Webhooks (نفس الشكل اللي خدمات كتير بتستخدمه): headers اسمها [[webhook-id]] و [[webhook-timestamp]] و [[webhook-signature]]، فالعميل يقدر يتحقق بمكتبة جاهزة بدل ما يكتب كود.`,
          example: R`export const newWebhookSecret = () => "whsec_" + crypto.randomBytes(24).toString("base64");
export function signWebhook(secret: string, msgId: string, body: string, now = Math.floor(Date.now() / 1000)) {
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const sig = crypto.createHmac("sha256", key).update($__bt$__{msgId}.$__{now}.$__{body}$__bt).digest("base64");
  return { "webhook-id": msgId, "webhook-timestamp": String(now), "webhook-signature": $__btv1,$__{sig}$__bt };
}
export async function emitEvent(orgId: string, type: string, data: object) {
  const endpoints = await db.webhookEndpoint.findMany({ where: { orgId, enabled: true, events: { has: type } } });
  const event = await db.webhookEvent.create({ data: { orgId, type, payload: { type, timestamp: new Date().toISOString(), data } } });
  for (const ep of endpoints) {
    await deliveries.add("deliver", { endpointId: ep.id, eventId: event.id }, { jobId: $__bt$__{event.id}-$__{ep.id}$__bt });
  }
}`,
          try: R`ولّد سر، ووقّع body فيه [[{"type":"order.paid"}]]، واتحقق من التوقيع بمكتبة [[standardwebhooks]] ([[new Webhook(secret).verify(body, headers)]]). وبعدين غيّر رقم واحد في الـ body واتحقق تاني، وبعدين خلي الـ timestamp من ساعة.`,
          flag: "script",
          deep: {
            why: "الـ webhook URL عند العميل endpoint عام. من غير توقيع، أي حد عرفه يبعت «order.paid» مزيف ويخلي العميل يشحن بضاعة. وانت اللي لازم تدّي العميل طريقة سهلة يتحقق بيها، وإلا نصهم مش هيتحقق خالص.",
            how: R`اللي بيتوقّع: [[id.timestamp.body]]. الـ body زي ما اتبعت بالظبط (نفس البايتات)، عشان كده العميل لازم يتحقق على الـ raw body قبل ما يعمله parse (تاب «Next.js»، درس [[webhook]]). الـ timestamp جوه التوقيع بيمنع replay: العميل بيرفض أي حاجة أقدم من ٥ دقايق. والـ id بيخليه يتجاهل التكرار (نفس الـ webhook ممكن يوصل مرتين بسبب الـ retries).

الـ [[v1,]] قبل التوقيع: إصدار الخوارزمية. والـ header ممكن يبقى فيه أكتر من توقيع مفصولين بمسافة، وده اللي بيخلي تدوير السر ممكن: وقت التدوير بتوقّع بالقديم والجديد، والعميل بيقبل لو أي واحد صح.

السر: [[whsec_]] وبعده base64 لبايتات عشوائية. سر مختلف لكل endpoint، عشان تسريب واحد ميأثرش على التاني. وخزّنه متشفّر في القاعدة (محتاجه نص عشان توقّع، فمينفعش hash زي الـ API key).

الـ event والـ delivery حاجتين: الـ event اتعمل مرة ([[webhookEvent]]) وليه id ثابت (ده اللي بيروح في [[webhook-id]] في كل المحاولات). ولكل endpoint مشترك في النوع ده delivery job منفصلة. و [[jobId]] من الاتنين يمنع إن نفس الحدث يتضاف مرتين لنفس الـ endpoint. والأحسن إن [[emitEvent]] نفسها تتنادى من الـ outbox relay (الكاتيجوري اللي فاتت)، عشان الحدث ميضيعش لو السيرفر وقع.

الـ payload: [[type]] و [[timestamp]] و [[data]]. خليه صغير: الـ ids والحالة، ولو العميل محتاج تفاصيل يطلبها من الـ API. كده الـ webhook مبيسرّبش بيانات لو الـ URL اتغير لحاجة غلط، والعميل دايمًا بياخد أحدث نسخة.

وفّر للعملاء: التوثيق فيه كود التحقق بكذا لغة، وزرار «ابعت webhook تجربة» في اللوحة.`,
            when: "أي API فيه أحداث العملاء محتاجين يعرفوها من غير polling: دفع، وتغيير حالة، ورسالة جديدة.",
            mistakes: R`مفيش توقيع، أو توقيع على [[JSON.stringify(parsed)]] مش البايتات اللي اتبعتت. ومفيش timestamp فالـ replay ممكن للأبد. وسر واحد لكل العملاء. ونفس الـ id يتغير مع كل retry فالعميل ميعرفش يشيل التكرار. و payload فيه كل حاجة (بيانات شخصية) لـ URL محدش اتأكد منه.`
          },
          teach: R`## HMAC على id والوقت والـ body

المثال ٣ دوال: واحدة بتولّد سر لكل endpoint، وواحدة بتوقّع رسالة وترجّع الـ headers التلاتة بتاعة مواصفة Standard Webhooks، وواحدة لما حدث يحصل بتسجّله مرة وتعمل delivery job لكل endpoint مشترك. والـ solCode دالة التحقق اللي بتحطها في التوثيق للعملاء.

اتجرّب على ويندوز 11، Node 24.19: التوقيع اتحقق منه بمكتبة [[standardwebhooks]] 1.1 الرسمية (اللي العميل هيستخدمها)، وبالـ solCode، و BullMQ 6.3 على Redis 8.10 للـ jobId.

---

## ١. السر

~~~ts
export const newWebhookSecret = () => "whsec_" + crypto.randomBytes(24).toString("base64");
~~~

٢٤ بايت عشوائية = ١٩٢ bit، و base64 العادي (مش url) بيخليهم ٣٢ حرف. و [[whsec_]] prefix بتاع المواصفة.

~~~text الناتج
secret: whsec_e3uQu2rGshHLEHs+zkjfR+HKIozbtOI8 len 38
~~~

---

## ٢. التوقيع

~~~ts
export function signWebhook(secret: string, msgId: string, body: string, now = Math.floor(Date.now() / 1000)) {
~~~

[[now = ...]] قيمة افتراضية: الوقت دلوقتي بالثواني. بنقدر نبعت وقت تاني في التجارب (وفي الـ solCode).

~~~ts
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
~~~

شيل الـ prefix ([[^]] = في الأول بس)، وفك الـ base64 لبايتات. المفتاح هو الـ ٢٤ بايت، مش النص.

~~~ts
  const sig = crypto.createHmac("sha256", key).update($__bt$__{msgId}.$__{now}.$__{body}$__bt).digest("base64");
~~~

HMAC (Hash-based Message Authentication Code): SHA-256 مخلوط بسر. اللي معاه نفس السر بس يقدر يطلّع نفس الناتج. والمحتوى الموقّع [[id.timestamp.body]] بنقط بينهم:

~~~text اللي اتوقّع بالظبط
msg_2mK1.1791450844.{"type":"order.paid","timestamp":"2026-10-08T09:20:00.000Z","data":{"orderId":"9001"}}
~~~

~~~ts
  return { "webhook-id": msgId, "webhook-timestamp": String(now), "webhook-signature": $__btv1,$__{sig}$__bt };
}
~~~

~~~text الناتج
{
  'webhook-id': 'msg_2mK1',
  'webhook-timestamp': '1791450844',
  'webhook-signature': 'v1,Hnt8AZysFn20kLxFES3CKoriWDB/X5d5PpfwSSUAC7I='
}
~~~

[[v1,]] رقم نسخة الخوارزمية، والتوقيع ٣٢ بايت بـ base64 = ٤٤ حرف.

### العميل بيتحقق بالمكتبة

~~~ts
const wh = new Webhook(secret);
wh.verify(body, headers);
~~~

~~~text الناتج
lib verify: { type: 'order.paid', timestamp: '2026-10-08T09:20:00.000Z', data: { orderId: '9001' } }
tampered: WebhookVerificationError No matching signature found
1h old: WebhookVerificationError Message timestamp too old
1h future: WebhookVerificationError Message timestamp too new
lib sign equals ours: true
~~~

- السليم: [[verify]] بترجّع الـ body بعد [[JSON.parse]].
- غيّرنا [[9001]] لـ [[9002]] في الـ body: التوقيع مبقاش مطابق.
- timestamp من ساعة (أو بعد ساعة): مرفوض حتى لو التوقيع صح. السماح الافتراضي ٥ دقايق. ده اللي بيمنع حد يسجّل webhook قديم ويعيد بعته.
- [[wh.sign(...)]] بتاعة المكتبة طلّعت نفس التوقيع بالحرف: الكود بتاعنا ماشي على المواصفة.

---

## ٣. الحدث والـ deliveries

~~~ts
export async function emitEvent(orgId: string, type: string, data: object) {
  const endpoints = await db.webhookEndpoint.findMany({ where: { orgId, enabled: true, events: { has: type } } });
~~~

الـ endpoints بتاعة الـ org دي، المفعّلة، اللي مشتركة في النوع ده. [[events: { has: type }]] في Prisma معناها «عمود array فيه القيمة دي» (Postgres arrays).

~~~ts
  const event = await db.webhookEvent.create({ data: { orgId, type, payload: { type, timestamp: new Date().toISOString(), data } } });
~~~

الحدث بيتسجّل **مرة**، و [[event.id]] بتاعه هو اللي هيروح في [[webhook-id]] في كل محاولة لكل endpoint. فلو العميل استلمه مرتين، يعرف إنه نفس الحدث.

~~~ts
  for (const ep of endpoints) {
    await deliveries.add("deliver", { endpointId: ep.id, eventId: event.id }, { jobId: $__bt$__{event.id}-$__{ep.id}$__bt });
  }
}
~~~

job لكل endpoint (عشان endpoint واقع ميأخرش الباقيين). والـ job فيها ids بس، والـ worker بيجيب الباقي من القاعدة.

### غلطة صلّحناها في المثال

المثال كان مكتوب [[jobId: evt_1:ep_1]] بـ [[:]]. جرّبناه:

~~~text الناتج
jobId evt_1:ep_1 -> Custom Id cannot contain :
dash jobId ok: evt_1-ep_1 dup add count: 1
~~~

BullMQ بيستخدم [[:]] جوه أسامي الـ keys بتاعته في Redis، فبيرفضها في الـ jobId. بـ [[-]] اشتغل، وإضافة نفس الـ jobId مرتين سابت job واحدة.

---

## ٤. الـ solCode: التحقق من غير مكتبة

~~~ts
export function verifyWebhook(secret: string, headers: Record<string, string>, body: string, toleranceSec = 300) {
  const ts = Number(headers["webhook-timestamp"]);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > toleranceSec) return false;
~~~

- [[Record<string, string>]]: object مفاتيحه وقيمه نصوص.
- [[Number.isFinite(ts)]]: لو الـ header مش موجود أو مش رقم، [[Number]] بيرجّع [[NaN]] وده مش finite.
- [[Math.abs(...)]]: الفرق في الاتجاهين (قديم أو في المستقبل) أكتر من ٣٠٠ ثانية = مرفوض.

~~~ts
  const expected = signWebhook(secret, headers["webhook-id"], body, ts)["webhook-signature"].slice(3);
~~~

احسب التوقيع بنفسك بنفس الـ id والوقت اللي جايين، و [[.slice(3)]] بيشيل [[v1,]].

~~~ts
  return (headers["webhook-signature"] ?? "").split(" ").some((s) => {
    const [v, sig = ""] = s.split(",");
    const a = Buffer.from(sig), b = Buffer.from(expected);
    return v === "v1" && a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}
~~~

- [[.split(" ")]]: الـ header ممكن يبقى فيه أكتر من توقيع بمسافة (وقت تدوير السر).
- [[.some(fn)]]: [[true]] لو أي واحد صح.
- [[timingSafeEqual]]: مقارنة بتاخد نفس الوقت مهما كان أول حرف مختلف فين، فالمهاجم ميعرفش يخمّن التوقيع حرف حرف من وقت الرد. وبترمي لو الطولين مختلفين، عشان كده بنقارن الطول قبلها.

~~~text الناتج
solCode verifyWebhook ok: true tampered: false old: false
two signatures: v1,ZQ84u4sLTUyUPEMgtAdFVHGb7SU... lib: true ours: true
~~~

### ثغرة صلّحناها في الـ solCode

النسخة القديمة كانت بتقارن [[sig.length]] (عدد الحروف) وبعدين [[Buffer.from(sig)]] (عدد البايتات). جرّبنا توقيع من ٤٤ حرف [[é]] (كل واحد بايتين)، وتوقيع من غير فاصلة:

~~~text الناتج (النسخة القديمة)
threw: ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH Input buffers must have the same byte length
threw: TypeError Cannot read properties of undefined (reading 'length')
~~~

الاتنين كانوا بيوقّعوا الـ handler (500) بدل [[false]]. دلوقتي بنقارن طول البايتات، و [[sig = ""]] قيمة افتراضية لو مفيش فاصلة، و [[?? ""]] لو الـ header مش موجود. والنسخة الجديدة رجّعت [[false]] في الحالتين.

---

## الخلاصة

| الـ header | القيمة | دوره |
|---|---|---|
| [[webhook-id]] | id الحدث، ثابت في كل المحاولات | العميل يشيل التكرار |
| [[webhook-timestamp]] | ثواني من ١٩٧٠ | يمنع الـ replay (٥ دقايق) |
| [[webhook-signature]] | [[v1,]] + HMAC-SHA256 base64 | يثبت إنه منك وإن الـ body متغيرش |

- الموقّع [[id.timestamp.body]] بالبايتات اللي اتبعتت بالظبط.
- سر لكل endpoint، وأكتر من توقيع وقت التدوير.
- [[timingSafeEqual]] بعد ما تتأكد إن البايتات نفس الطول.`,
          lines: [
            "سر جديد لكل endpoint: ٢٤ بايت عشوائية.",
            "التوقيع:",
            "السر بعد ما نشيل الـ prefix، كبايتات.",
            "HMAC-SHA256 على id.timestamp.body بالظبط.",
            "الـ headers: id ثابت، والوقت بالثواني، والتوقيع بإصدار v1.",
            "قفلة.",
            "لما حدث يحصل (أحسن من الـ outbox relay):",
            "هات الـ endpoints المشتركة في النوع ده.",
            "سجّل الحدث مرة (id ثابت لكل المحاولات).",
            "لكل endpoint...",
            "...delivery job منفصلة، والـ jobId بيمنع التكرار (بـ - مش :، لأن BullMQ بيرفض : في الـ jobId).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`التوقيع السليم: [[verify]] بترجّع الـ payload بعد الـ parse. غيّر رقم في الـ body: بترمي [[No matching signature found]]. timestamp من ساعة: بترمي [[Message timestamp too old]] (الحد الافتراضي ٥ دقايق).

ولو عايز تتحقق من غير المكتبة (ده اللي بتحطه في التوثيق للعملاء):`,
          solCode: R`export function verifyWebhook(secret: string, headers: Record<string, string>, body: string, toleranceSec = 300) {
  const ts = Number(headers["webhook-timestamp"]);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > toleranceSec) return false;
  const expected = signWebhook(secret, headers["webhook-id"], body, ts)["webhook-signature"].slice(3);
  return (headers["webhook-signature"] ?? "").split(" ").some((s) => {
    const [v, sig = ""] = s.split(",");
    const a = Buffer.from(sig), b = Buffer.from(expected);
    return v === "v1" && a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}`
        },
        {
          cmd: "retries و delivery log",
          title: "عيد المحاولة بـ backoff وسجّل كل محاولة",
          desc: R`سيرفر العميل هيقع، أو هيبطأ، أو هيرجّع 500 وقت deploy. فكل webhook بيتعاد بـ backoff متزايد لحد يوم أو اتنين (مثلًا بعد ٥ ثواني، ٥ دقايق، ٣٠ دقيقة، ساعتين، ٥ ساعات...). وكل محاولة بتتسجل: الوقت، والـ status، والمدة، وجزء من الرد.

السجل ده بيتعرض للعميل في اللوحة، ومعاه زرار «عيد الإرسال». ده اللي بيوفّر عليك نص تذاكر الدعم.`,
          example: R`const SCHEDULE_MS = [5_000, 5 * 60_000, 30 * 60_000, 2 * 3600_000, 5 * 3600_000, 10 * 3600_000, 10 * 3600_000];
export const deliveryWorker = new Worker("webhook-deliveries", async (job) => {
  const ep = await db.webhookEndpoint.findUniqueOrThrow({ where: { id: job.data.endpointId } });
  const ev = await db.webhookEvent.findUniqueOrThrow({ where: { id: job.data.eventId } });
  if (!ep.enabled) return;
  const body = JSON.stringify(ev.payload);
  const started = Date.now();
  let status = 0, error: string | null = null, snippet = "";
  try {
    const res = await postWebhook(ep.url, body, signWebhook(decrypt(ep.secret), ev.id, body));
    status = res.status;
    snippet = (await res.text()).slice(0, 500);
  } catch (e) { error = (e as Error).message; }
  await db.webhookDelivery.create({ data: { eventId: ev.id, endpointId: ep.id, attempt: job.attemptsMade + 1, status, error, responseSnippet: snippet, durationMs: Date.now() - started } });
  if (status >= 200 && status < 300) return;
  if (status === 410) { await db.webhookEndpoint.update({ where: { id: ep.id }, data: { enabled: false } }); throw new UnrecoverableError("endpoint gone"); }
  throw new Error(error ?? $__btHTTP $__{status}$__bt);
}, { connection, concurrency: 50, settings: { backoffStrategy: (attemptsMade: number) => SCHEDULE_MS[Math.min(attemptsMade - 1, SCHEDULE_MS.length - 1)] } });
await deliveries.add("deliver", { endpointId, eventId }, { attempts: SCHEDULE_MS.length + 1, backoff: { type: "custom" } });`,
          try: R`اعمل سيرفر تجربة بيرجّع 503 أول مرتين و 200 بعدها، وحط جدول backoff بالملّي ثواني ([[[0, 50, 100, 200]]]). ضيف job واحدة واطبع سجل المحاولات بعد ثانية. وبعدين خلي السيرفر يرجّع 410 وشوف الـ endpoint اتقفل ومفيش retries.`,
          flag: "script",
          deep: {
            why: "من غير retries، أي restart عند العميل = أحداث ضاعت، وهو ميعرفش. ومن غير سجل، لما العميل يقول «موصلنيش»، مفيش طريقة تعرف: انت بعت؟ هو رد بإيه؟ السجل بيحوّل الخناقة لـ «شوف المحاولة التالتة، سيرفرك رجّع 502 الساعة ٣».",
            how: R`الـ backoff: BullMQ بيقبل [[backoffStrategy]] في إعدادات الـ Worker، ومعاها [[backoff: { type: "custom" }]] على الـ job. الدالة بتاخد عدد المحاولات اللي فشلت وترجّع كام ملّي ثانية يستنى. الجدول الثابت أوضح من exponential للعملاء، لأنك تقدر تكتبه في التوثيق: «هنحاول ٨ مرات على مدار حوالي ٢٨ ساعة».

ليه مش exponential بس؟ exponential بـ ٥ ثواني بيوصل لساعات بعد ١٢ محاولة تقريبًا، وده صعب يتشرح. وضيف عشوائية صغيرة (jitter) لو عندك آلاف الـ webhooks لنفس العميل وقع، عشان مترجعلوش كلها في نفس الثانية لما يقوم.

النجاح = أي 2xx. 3xx مش نجاح (الـ fetch بـ [[redirect: "manual"]] عشان SSRF، الدرس الجاي). 410 Gone = العميل بيقول «بطّل»، فتقفل الـ endpoint وتبعتله إيميل. و 4xx التانية: بعض الخدمات بتعيد عليها، وبعضها لأ. الأسلم تعيد (يمكن العميل عمل deploy بايظ ويصلّحه).

الـ timeout: رد العميل لازم ييجي في ثواني (١٠ أو ١٥). العميل المفروض يرد 200 بسرعة ويشتغل في الخلفية، وقول ده في التوثيق. من غير timeout، عميل بطيء بيحجز الـ workers بتوعك.

تعطيل تلقائي: لو الـ endpoint فاشل من أيام في كل الأحداث، اقفله وابعت إيميل، بدل ما تفضل تضرب URL ميت للأبد. وخلي العميل يفعّله تاني من اللوحة.

الترتيب: الـ retries بتلخبط الترتيب (حدث ٢ ممكن يوصل قبل ١ لو ١ فشل مرة). قول ده في التوثيق، وحط [[timestamp]] في الـ payload، والعميل يعتمد على الحالة الحالية من الـ API مش ترتيب الوصول.

السجل: جدول [[webhookDelivery]] بيكبر بسرعة. خزّن أول ٥٠٠ حرف من الرد بس، وامسح القديم (٣٠ يوم مثلًا).`,
            when: "مع أي webhooks صادرة، من أول يوم. ولوحة السجل من أول عميل حقيقي.",
            mistakes: R`retry فوري بدون backoff (بتضرب سيرفر واقع). ومفيش timeout. والرد كله في السجل (ممكن يبقى HTML صفحة error بالميجات). وتبعت من جوه الـ request اللي عمل الحدث بدل queue. والـ secret متسجّل في السجل. وتتبع redirects فالعميل يحوّلك على IP داخلي.`
          },
          teach: R`## worker بيبعت، ويسجّل، ويقرر يعيد ولا لأ

المثال BullMQ worker لتوصيل الـ webhooks. لكل job: يجيب الـ endpoint والحدث، ويوقّع ويبعت، ويسجّل المحاولة في جدول مهما كانت النتيجة، وبعدين يقرر: 2xx خلاص، 410 اقفل الـ endpoint ووقّف، أي حاجة تانية ارمي عشان تتعاد. ومواعيد الإعادة من جدول ثابت مش exponential.

اتجرّب على ويندوز 11: BullMQ 6.3 على Node 24.19، و Redis 8.10 في Docker، وسيرفر تجربة على بورت ٦٠١٣ بيرجّع 503 أول مرتين لكل مسار و 200 بعدها، و 410 على [[/gone]]. القاعدة كانت objects في الذاكرة بنفس دوال Prisma، و [[decrypt]] بترجّع السر زي ما هو، و [[postWebhook]] كانت [[fetch]] عادي بـ [[redirect: "manual"]] و timeout (النسخة الآمنة في الدرس الجاي بترفض [[http://localhost]]، وده المطلوب منها). و [[signWebhook]] من الدرس اللي فات. وزي الـ try، الجدول كان [[[0, 50, 100, 200]]] ملّي ثانية.

---

## ١. الجدول

~~~ts
const SCHEDULE_MS = [5_000, 5 * 60_000, 30 * 60_000, 2 * 3600_000, 5 * 3600_000, 10 * 3600_000, 10 * 3600_000];
~~~

| بعد الفشل رقم | يستنى |
|---|---|
| ١ | ٥ ثواني |
| ٢ | ٥ دقايق |
| ٣ | ٣٠ دقيقة |
| ٤ | ساعتين |
| ٥ | ٥ ساعات |
| ٦ | ١٠ ساعات |
| ٧ | ١٠ ساعات |

المجموع ٩٩٣٠٥ ثانية = ٢٧ ساعة و ٣٥ دقيقة. يعني ٨ محاولات على مدار حوالي ٢٨ ساعة، وده رقم تقدر تكتبه في التوثيق.

---

## ٢. الـ job بتجيب اللي محتاجاه

~~~ts
export const deliveryWorker = new Worker("webhook-deliveries", async (job) => {
  const ep = await db.webhookEndpoint.findUniqueOrThrow({ where: { id: job.data.endpointId } });
  const ev = await db.webhookEvent.findUniqueOrThrow({ where: { id: job.data.eventId } });
  if (!ep.enabled) return;
~~~

- [[findUniqueOrThrow]]: زي [[findUnique]] بس بيرمي لو مش موجود بدل [[null]].
- الـ job فيها ids بس، والـ endpoint بيتجاب **في كل محاولة**: لو العميل غيّر الـ URL أو السر أو قفله بين المحاولات، المحاولة الجاية تشوف الجديد.
- [[if (!ep.enabled) return]]: الـ job تخلص «بنجاح» من غير ما تبعت، فمفيش retries.

---

## ٣. البعت

~~~ts
  const body = JSON.stringify(ev.payload);
  const started = Date.now();
  let status = 0, error: string | null = null, snippet = "";
~~~

- [[body]] بيتعمل مرة، والنص ده نفسه اللي بيتوقّع وبيتبعت. لو عملت [[JSON.stringify]] مرتين ممكن الترتيب يفرق والتوقيع يبوظ.
- [[let a = 0, b = null, c = ""]]: ٣ متغيرات في سطر. [[status = 0]] معناها «مفيش رد» (خطأ شبكة).

~~~ts
  try {
    const res = await postWebhook(ep.url, body, signWebhook(decrypt(ep.secret), ev.id, body));
    status = res.status;
    snippet = (await res.text()).slice(0, 500);
  } catch (e) { error = (e as Error).message; }
~~~

- [[decrypt(ep.secret)]]: السر متخزن متشفّر، وبيتفك لحظة التوقيع بس.
- [[ev.id]] كـ [[webhook-id]]: ثابت في كل المحاولات.
- [[.slice(0, 500)]]: أول ٥٠٠ حرف من رد العميل، مش صفحة error بالميجات.
- [[(e as Error)]]: TypeScript بيعتبر [[e]] نوعه [[unknown]]، فبنقوله «ده Error».

---

## ٤. السجل والقرار

~~~ts
  await db.webhookDelivery.create({ data: { eventId: ev.id, endpointId: ep.id, attempt: job.attemptsMade + 1, status, error, responseSnippet: snippet, durationMs: Date.now() - started } });
~~~

[[job.attemptsMade]] جوه الـ worker = المحاولات اللي **فشلت قبل كده**، فـ [[+ 1]] رقم المحاولة دي.

~~~ts
  if (status >= 200 && status < 300) return;
  if (status === 410) { await db.webhookEndpoint.update({ where: { id: ep.id }, data: { enabled: false } }); throw new UnrecoverableError("endpoint gone"); }
  throw new Error(error ?? $__btHTTP $__{status}$__bt);
}, ...
~~~

- 2xx: [[return]] = نجاح.
- 410: اقفل الـ endpoint، و [[UnrecoverableError]] توقّف الـ retries.
- غير كده: ارمي. [[error ?? ...]]: لو فيه رسالة خطأ شبكة استخدمها، لو لأ [[HTTP 503]].

---

## ٥. الـ backoff المخصص

~~~ts
}, { connection, concurrency: 50, settings: { backoffStrategy: (attemptsMade: number) => SCHEDULE_MS[Math.min(attemptsMade - 1, SCHEDULE_MS.length - 1)] } });
await deliveries.add("deliver", { endpointId, eventId }, { attempts: SCHEDULE_MS.length + 1, backoff: { type: "custom" } });
~~~

- [[settings.backoffStrategy]] على الـ Worker: دالة BullMQ بيناديها بعد كل فشل، وترجّع كام ملّي يستنى.
- [[backoff: { type: "custom" }]] على الـ job: «استخدم الدالة دي». من غيرها الدالة متتناداش.
- [[Math.min(attemptsMade - 1, length - 1)]]: [[attemptsMade]] هنا **بعد** الزيادة (١ بعد أول فشل)، فـ [[- 1]] بيجيب أول عنصر. و [[Math.min]] بيمنع نخرج برا الـ array.
- [[attempts: SCHEDULE_MS.length + 1]]: ٧ انتظارات = ٨ محاولات.

طبعنا اللي الدالة اتنادت بيه:

~~~text الناتج
  backoffStrategy(attemptsMade = 1 ) -> 0 ms
  failed 1 HTTP 503 attemptsMade 1
  backoffStrategy(attemptsMade = 2 ) -> 50 ms
  failed 1 HTTP 503 attemptsMade 2
  completed 1
~~~

---

## ٦. الـ try: سجل المحاولات

~~~text الناتج (console.table لصفوف webhookDelivery)
┌─────────┬─────────┬────────┬───────┬─────────────────┬────────────┐
│ (index) │ attempt │ status │ error │ responseSnippet │ durationMs │
├─────────┼─────────┼────────┼───────┼─────────────────┼────────────┤
│ 0       │ 1       │ 503    │ null  │ 'error 503'     │ 37         │
│ 1       │ 2       │ 503    │ null  │ 'error 503'     │ 4          │
│ 2       │ 3       │ 200    │ null  │ 'ok thanks'     │ 3          │
└─────────┴─────────┴────────┴───────┴─────────────────┴────────────┘
~~~

وسيرفر التجربة شاف:

~~~text لوج سيرفر العميل
09:14:41.070 POST /hook -> 503 evt_1 v1,1UpvMx8sMalIXnshd
09:14:41.081 POST /hook -> 503 evt_1 v1,1UpvMx8sMalIXnshd
09:14:41.145 POST /hook -> 200 evt_1 v1,1UpvMx8sMalIXnshd
~~~

نفس [[webhook-id]] ([[evt_1]]) في التلاتة. والتوقيع كمان نفسه هنا لأن التلات محاولات في نفس الثانية (الـ timestamp واحد). في الحقيقة المحاولات بينها دقايق وساعات، فالتوقيع بيتغير مع الـ timestamp، والـ id بس اللي ثابت.

### مع 410

~~~text الناتج
  failed 2 endpoint gone attemptsMade 1
┌─────────┬────────────┬─────────┬────────┬─────────────────┐
│ (index) │ endpointId │ attempt │ status │ responseSnippet │
├─────────┼────────────┼─────────┼────────┼─────────────────┤
│ 0       │ 'ep_2'     │ 1       │ 410    │ 'error 410'     │
└─────────┴────────────┴─────────┴────────┴─────────────────┘
ep_2.enabled = false counts: { completed: 1, failed: 1, delayed: 0 }
~~~

محاولة واحدة، والـ endpoint اتقفل، ومفيش حاجة [[delayed]] مستنية إعادة.

---

## الخلاصة

| النتيجة | اللي بيحصل |
|---|---|
| 2xx | سجل + نجاح |
| 410 | سجل + [[enabled: false]] + [[UnrecoverableError]] |
| أي status تاني أو خطأ شبكة | سجل + throw، والإعادة حسب الجدول |
| الـ endpoint اتقفل | [[return]] من غير بعت |

- كل محاولة صف في السجل، نجحت أو فشلت.
- [[backoffStrategy]] في الـ Worker، و [[type: "custom"]] على الـ job، الاتنين لازم.
- [[webhook-id]] ثابت في كل المحاولات.`,
          lines: [
            "جدول الانتظار بين المحاولات (من ٥ ثواني لـ ١٠ ساعات، حوالي ٢٨ ساعة كلهم).",
            "الـ worker:",
            "هات الـ endpoint.",
            "والحدث.",
            "العميل قفله؟ خلاص، من غير retry.",
            "الـ body بالظبط اللي هيتوقّع ويتبعت.",
            "وقت البداية.",
            "هنسجّل الـ status والخطأ وجزء من الرد.",
            "جرّب...",
            "...ابعت بالـ fetch الآمن (الدرس الجاي) ومعاه التوقيع.",
            "الـ status.",
            "أول ٥٠٠ حرف من الرد بس.",
            "خطأ شبكة أو timeout.",
            "سجّل المحاولة: رقمها، والنتيجة، والمدة.",
            "2xx: نجاح.",
            "410: العميل شال الـ endpoint، اقفله ووقّف الـ retries.",
            "أي حاجة تانية: ارمي فيتعاد حسب الجدول.",
            "٥٠ بالتوازي، والانتظار من الجدول حسب رقم المحاولة.",
            "الإضافة: عدد المحاولات = الجدول + الأولى، والـ backoff custom."
          ],
          sol: R`سجل المحاولات: [[#1:503 #2:503 #3:200]]. تلات صفوف في [[webhookDelivery]] والـ job خلصت.

مع 410: محاولة واحدة، والـ endpoint بقى [[enabled: false]]، والـ job في failed من غير retries (بسبب UnrecoverableError).

لو المحاولات بتحصل ورا بعض من غير انتظار: [[backoff: { type: "custom" }]] ناقص على الـ job، أو [[backoffStrategy]] مش في [[settings]] بتاعة الـ Worker. ولو في BullMQ عندك الدالة بتستقبل [[attemptsMade]] بعد الزيادة (يعني ١ بعد أول فشل)، عشان كده [[attemptsMade - 1]] في المثال بيجيب أول عنصر.`
        },
        {
          cmd: "SSRF في webhook URLs",
          title: "العميل بيديك URL: متخليهوش يوصل لشبكتك",
          desc: R`لما العميل يكتب URL والسيرفر بتاعك هو اللي بيعمل الطلب، العميل ممكن يكتب [[http://169.254.169.254/latest/meta-data/]] (مفاتيح السحابة) أو [[http://localhost:6379]] (Redis بتاعك) أو [[http://10.0.0.5/admin]]. ده SSRF (API7 في OWASP API Top 10).

الحماية: https بس، ومن غير user:pass، وأي IP داخلي أو خاص مرفوض، والفحص ده يحصل وقت الاتصال نفسه (مش بس وقت ما العميل سجّل الـ URL)، ومن غير redirects.`,
          example: R`import dns from "node:dns";
import net from "node:net";
import { Agent, fetch } from "undici";
const blocked = new net.BlockList();
for (const [a, p] of [["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.168.0.0", 16], ["224.0.0.0", 4], ["240.0.0.0", 4]] as const) blocked.addSubnet(a, p, "ipv4");
for (const [a, p] of [["::", 128], ["::1", 128], ["fc00::", 7], ["fe80::", 10], ["ff00::", 8]] as const) blocked.addSubnet(a, p, "ipv6");
const isBlocked = (ip: string) => blocked.check(ip, net.isIPv6(ip) ? "ipv6" : "ipv4");
function safeLookup(hostname: string, options: dns.LookupOptions, cb: (...args: any[]) => void) {
  dns.lookup(hostname, { ...options, all: true }, (err, addrs) => {
    if (err) return cb(err);
    const bad = addrs.find((a) => isBlocked(a.address));
    if (bad) return cb(Object.assign(new Error($__btblocked address $__{bad.address}$__bt), { code: "EBLOCKED" }));
    return options.all ? cb(null, addrs) : cb(null, addrs[0].address, addrs[0].family);
  });
}
const webhookAgent = new Agent({ connect: { lookup: safeLookup, timeout: 5_000 }, headersTimeout: 10_000, bodyTimeout: 10_000 });
export function validateWebhookUrl(raw: string) {
  const url = new URL(raw);
  if (url.protocol !== "https:" || url.username || url.password || !["", "443"].includes(url.port)) throw new Error("URL must be https on port 443 without credentials");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host) && isBlocked(host)) throw new Error($__btblocked address $__{host}$__bt);
  return url;
}
export const postWebhook = (url: string, body: string, headers: Record<string, string>) =>
  fetch(validateWebhookUrl(url), { method: "POST", body, headers: { "content-type": "application/json", ...headers }, redirect: "manual", dispatcher: webhookAgent, signal: AbortSignal.timeout(15_000) });`,
          try: R`سطّب [[undici]] وجرّب [[postWebhook]] على: [[https://localhost/]]، و [[https://127.1/]]، و [[https://2130706433/]]، و [[https://[::ffff:127.0.0.1]/]]، و [[https://169.254.169.254/]]، و [[http://example.com]]، و [[https://example.com]]. وبعدين شيل سطرين الـ IP literal من [[validateWebhookUrl]] وجرّب [[https://127.1/]] تاني.`,
          flag: "script",
          deep: {
            why: "على أي سحابة، الـ metadata endpoint ([[169.254.169.254]]) ممكن يدّي مفاتيح الـ IAM بتاعة السيرفر لأي طلب جاي من جوه. وفيه اختراقات كبيرة حصلت بالظبط كده: ميزة «ابعتلي على URL» أو «هات صورة من لينك» اتحولت لطريق للشبكة الداخلية. والـ webhooks ميزة معمولة عشان العميل يدخل URL بإيده.",
            how: R`ليه الفحص وقت الاتصال مش وقت التسجيل؟ DNS rebinding: العميل يسجّل [[hooks.evil.com]] وقت التسجيل بيرجّع IP عام، وبعدين يغيّر الـ DNS يرجّع [[127.0.0.1]]. لو فحصت مرة وبعدين عملت fetch، الـ fetch هيعمل lookup جديد ويوصل للداخلي. الحل: [[lookup]] مخصص في الـ Agent، فالفحص والاتصال بيستخدموا نفس نتيجة الـ DNS. undici بيمرر الـ lookup ده لـ [[net.connect]].

فخ مهم لقيناه وإحنا بنجرب: الـ lookup مبيتناديش لو الـ host نفسه IP ([[https://127.1/]]). Node بيتصل على طول من غير DNS. عشان كده [[validateWebhookUrl]] بتفحص الـ IP literals بنفسها. و [[new URL()]] بيوحّد الأشكال الغريبة: [[127.1]] و [[2130706433]] و [[0x7f.1]] كلهم بيبقوا [[127.0.0.1]]، و IPv6 بيبقى بين أقواس.

[[net.BlockList]]: الـ ranges الخاصة والمحجوزة (RFC 1918، و loopback، و link-local اللي فيه الـ metadata، و CGNAT، و multicast). وبتفهم IPv4-mapped IPv6 ([[::ffff:127.0.0.1]]) وبتطبق عليه قواعد IPv4.

[[redirect: "manual"]]: من غيره، العميل يرد بـ 302 لـ [[http://169.254.169.254/]]، والـ fetch يتبعه (وده طلب جديد ممكن يعدّي الفحص الأول). الـ redirect يعتبر فشل.

الـ timeouts: اتصال ٥ ثواني، ورد ١٠، والطلب كله ١٥. من غيرها سيرفر بطيء عمدًا يحجز الـ workers.

طبقة تانية أقوى: شغّل الـ webhook workers في شبكة منفصلة، أو ورا egress proxy (زي Smokescreen) بيمنع أي وجهة داخلية على مستوى الشبكة، مش الكود بس. وعلى AWS فعّل IMDSv2 (بيطلب token بـ PUT، فالـ SSRF البسيط بـ GET مبيوصلش للمفاتيح).

ونفس الحماية لأي ميزة بتعمل fetch لـ URL من مستخدم: صورة من لينك، و link preview، و import من URL، و OAuth بـ discovery URL بيحطه عميل enterprise (درس [[SSO للشركات]]).`,
            when: "أي كود بيعمل طلب لـ URL المستخدم كتبه أو أثّر فيه.",
            mistakes: R`فحص الـ URL كنص ([[includes("localhost")]]) فـ [[127.1]] و [[0x7f000001]] و [[localtest.me]] يعدّوا. وفحص الـ DNS وقت التسجيل بس. وتتبع redirects. ومفيش timeout. وتنسى IPv6. وتعتمد على الـ lookup لوحده وتنسى إن IP literal مبيعدّيش عليه. وتبعت رد الطلب الداخلي للمستخدم في رسالة الخطأ (فيبقى شايف اللي جوه).`
          },
          teach: R`## فحصين: على الـ URL نفسه، وعلى الـ IP لحظة الاتصال

المثال بيعمل قايمة عناوين ممنوعة (الشبكات الخاصة و loopback و metadata السحابة)، و [[lookup]] مخصص بيتنادى لما الاتصال بيتعمل فعلًا ويرفض لو الـ DNS رجّع عنوان ممنوع، و Agent من undici بيستخدمه. وقبل أي اتصال، [[validateWebhookUrl]] بتفحص الـ URL نفسه: https بس، ومن غير user:pass، وعلى 443، ولو الـ host مكتوب IP تفحصه هي. وفي الآخر [[postWebhook]] بتجمع ده كله.

اتجرّب على ويندوز 11: [[undici]] 8.11 على Node 24.19. كل الحالات اللي في الـ try، وزودنا [[0x7f.1]] و [[[::1]]] و [[localtest.me]] (دومين حقيقي بيرجّع 127.0.0.1 و ::1) و URL فيه باسورد وبورت تاني. و [[https://example.com]] اتبعت له طلب حقيقي على النت.

---

## ١. الـ imports

~~~ts
import dns from "node:dns";
import net from "node:net";
import { Agent, fetch } from "undici";
~~~

[[fetch]] من undici مش الـ global: الاتنين نفس المكتبة جوه Node، بس الـ [[dispatcher]] (الـ Agent بتاعنا) لازم يبقى من نفس نسخة الـ undici اللي بتعمل الـ fetch.

---

## ٢. القايمة الممنوعة

~~~ts
const blocked = new net.BlockList();
for (const [a, p] of [["0.0.0.0", 8], ["10.0.0.0", 8], ...] as const) blocked.addSubnet(a, p, "ipv4");
~~~

[[net.BlockList]] من Node: بتضيف شبكات وتسأل «العنوان ده جوه أي واحدة؟». و [[addSubnet("10.0.0.0", 8, "ipv4")]] = كل العناوين اللي أول ٨ bit منها زي [[10]]، يعني [[10.x.x.x]] (الكتابة دي اسمها CIDR: [[10.0.0.0/8]]). و [[as const]] عشان TypeScript يعرف إن كل عنصر [[[string, number]]] بالظبط.

| الشبكة | إيه هي |
|---|---|
| [[0.0.0.0/8]] | «الجهاز ده» (على لينكس [[0.0.0.0]] بيوصل لـ localhost) |
| [[10/8]] و [[172.16/12]] و [[192.168/16]] | شبكات خاصة (RFC 1918) |
| [[100.64.0.0/10]] | CGNAT، شبكات مزوّدي الخدمة وبعض الـ VPNs |
| [[127/8]] | loopback |
| [[169.254/16]] | link-local، وفيه [[169.254.169.254]] (metadata السحابة) |
| [[224/4]] و [[240/4]] | multicast ومحجوز |
| [[::]] و [[::1]] | IPv6: unspecified و loopback |
| [[fc00::/7]] و [[fe80::/10]] و [[ff00::/8]] | IPv6: خاص (ULA) و link-local و multicast |

~~~ts
const isBlocked = (ip: string) => blocked.check(ip, net.isIPv6(ip) ? "ipv6" : "ipv4");
~~~

[[blocked.check]] لازم تعرف نوع العنوان. وبتفهم [[::ffff:127.0.0.1]] (IPv4 متغلف في IPv6) وبتطبق عليه قواعد IPv4، فمحتجناش نضيفه.

---

## ٣. الـ lookup المخصص

~~~ts
function safeLookup(hostname: string, options: dns.LookupOptions, cb: (...args: any[]) => void) {
  dns.lookup(hostname, { ...options, all: true }, (err, addrs) => {
~~~

نفس شكل [[dns.lookup]] بتاع Node (اسم، و options، و callback)، عشان undici يقدر يستخدمها مكانه. وجوه بنادي الأصلي بـ [[all: true]] عشان نشوف **كل** العناوين، مش أول واحد بس. طبعنا اللي undici بعته:

~~~text الناتج
    lookup( localtest.me { family: undefined, hints: 0, all: true } ) -> [ { address: '::1', family: 6 }, { address: '127.0.0.1', family: 4 } ]
    lookup( example.com { family: undefined, hints: 0, all: true } ) -> [ { address: '104.20.23.154', family: 4 }, ... 4 عناوين ]
~~~

~~~ts
    if (err) return cb(err);
    const bad = addrs.find((a) => isBlocked(a.address));
    if (bad) return cb(Object.assign(new Error($__btblocked address $__{bad.address}$__bt), { code: "EBLOCKED" }));
    return options.all ? cb(null, addrs) : cb(null, addrs[0].address, addrs[0].family);
  });
}
~~~

- لو **أي** عنوان ممنوع، ارفض كله. (لو رفضت الممنوع بس وسبت الباقي، المهاجم يحط عنوان عام وعنوان داخلي ويستنى الاتصال يجرّب التاني.)
- [[Object.assign(err, { code })]]: بيضيف [[code]] للـ error عشان تفرّقه في اللوج.
- السطر الأخير: رجّع بالشكل اللي الـ caller طلبه. لو [[all]] array، لو لأ عنوان ونوعه.

~~~ts
const webhookAgent = new Agent({ connect: { lookup: safeLookup, timeout: 5_000 }, headersTimeout: 10_000, bodyTimeout: 10_000 });
~~~

[[connect.lookup]]: undici بيستخدم دالتنا بدل DNS العادي، فالعنوان اللي اتفحص هو نفسه اللي هيتوصل له. [[connect.timeout]] للاتصال، و [[headersTimeout]] لحد ما الرد يبدأ، و [[bodyTimeout]] بين أجزاء الـ body.

---

## ٤. فحص الـ URL

~~~ts
export function validateWebhookUrl(raw: string) {
  const url = new URL(raw);
  if (url.protocol !== "https:" || url.username || url.password || !["", "443"].includes(url.port)) throw new Error("URL must be https on port 443 without credentials");
~~~

- [[new URL(raw)]]: بيعمل parse، وبيرمي لو مش URL. وبيوحّد الأشكال الغريبة للـ IP.
- [[url.port]] بيبقى [[""]] لو البورت هو الافتراضي (443 في https)، عشان كده الاتنين مقبولين.

~~~ts
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host) && isBlocked(host)) throw new Error($__btblocked address $__{host}$__bt);
  return url;
}
~~~

- [[/^\[|\]$/g]]: [[\[]] في الأول أو [[\]]] في الآخر. [[url.hostname]] بتاع IPv6 بيبقى [[[::1]]] بأقواس، و [[isIP]] عايزه من غيرها.
- [[net.isIP(host)]]: [[4]] أو [[6]] لو IP، و [[0]] لو اسم. لو IP: افحصه هنا، لأن Node مبيعملش DNS لـ IP، فالـ lookup بتاعنا **مش هيتنادى**.

إزاي [[new URL]] بيوحّد:

~~~text الناتج (hostname بعد new URL)
https://127.1/                ->  127.0.0.1
https://2130706433/           ->  127.0.0.1
https://0x7f.1/               ->  127.0.0.1
https://[::ffff:127.0.0.1]/   ->  [::ffff:7f00:1]
~~~

---

## ٥. الإرسال

~~~ts
export const postWebhook = (url: string, body: string, headers: Record<string, string>) =>
  fetch(validateWebhookUrl(url), { method: "POST", body, headers: { "content-type": "application/json", ...headers }, redirect: "manual", dispatcher: webhookAgent, signal: AbortSignal.timeout(15_000) });
~~~

- [[validateWebhookUrl(url)]] بيتنفّذ الأول، ولو رمى الـ fetch مبيبدأش.
- [[...headers]]: headers التوقيع بعد [[content-type]].
- [[redirect: "manual"]]: متتبعش أي 3xx. رجّع الرد زي ما هو، والـ worker يعتبره فشل.
- [[dispatcher: webhookAgent]]: استخدم الـ Agent بالـ lookup الآمن.
- [[AbortSignal.timeout(15_000)]]: الطلب كله ميعدّيش ١٥ ثانية.

---

## ٦. الـ try

~~~text الناتج
https://localhost/              -> TypeError | EBLOCKED blocked address ::1
https://127.1/                  -> Error | blocked address 127.0.0.1
https://2130706433/             -> Error | blocked address 127.0.0.1
https://0x7f.1/                 -> Error | blocked address 127.0.0.1
https://[::ffff:127.0.0.1]/     -> Error | blocked address ::ffff:7f00:1
https://[::1]/                  -> Error | blocked address ::1
https://169.254.169.254/        -> Error | blocked address 169.254.169.254
https://localtest.me/           -> TypeError | EBLOCKED blocked address ::1
http://example.com              -> Error | URL must be https on port 443 without credentials
https://user:pw@example.com/    -> Error | URL must be https on port 443 without credentials
https://example.com:8443/       -> Error | URL must be https on port 443 without credentials
https://example.com             -> 405 text/html
~~~

- [[TypeError]] مع [[EBLOCKED]]: من الـ lookup، لحظة الاتصال. undici بيلف الـ error في [[TypeError: fetch failed]] والسبب الحقيقي في [[e.cause]]. و [[localhost]] على ويندوز رجّع [[::1]] الأول، فده اللي اتطبع (على جهاز تاني ممكن يطلع [[127.0.0.1]]).
- [[Error]] عادي: من [[validateWebhookUrl]]، قبل أي اتصال.
- [[localtest.me]]: اسم شكله عادي خالص، والـ DNS بتاعه بيرجّع loopback. فحص النص ([[includes("localhost")]]) كان هيعدّيه.
- [[example.com]]: اتصل فعلًا، و 405 لأنه مبيقبلش POST. يعني الحماية مبتمنعش العناوين العامة.

### من غير فحص الـ IP literal

شلنا سطر [[net.isIP(host) && isBlocked(host)]]:

~~~text الناتج
https://127.1/               -> TypeError | ECONNREFUSED connect ECONNREFUSED 127.0.0.1:443
https://[::ffff:127.0.0.1]/  -> TypeError | ECONNREFUSED connect ECONNREFUSED ::ffff:7f00:1:443
~~~

[[ECONNREFUSED]] معناها إن الطلب **وصل** لـ 127.0.0.1:443، ومكانش فيه حاجة شغالة عليه. لو كان فيه خدمة داخلية، كان هيكلّمها. الـ lookup اتعدّى خالص، وده سبب السطر ده.

---

## الخلاصة

| الهجوم | مين بيوقفه |
|---|---|
| [[http://]] أو بورت تاني أو [[user:pass@]] | [[validateWebhookUrl]] |
| IP مكتوب بأي شكل ([[127.1]]، [[2130706433]]، [[0x7f.1]]، [[::ffff:]]) | [[new URL]] بيوحّد، و [[isIP]] + [[isBlocked]] |
| اسم بيرجّع IP داخلي ([[localhost]]، [[localtest.me]]) | [[safeLookup]] لحظة الاتصال |
| DNS rebinding (عام وقت التسجيل، داخلي بعدين) | [[safeLookup]]، لأنه بيفحص نفس نتيجة الـ DNS اللي هيتوصل لها |
| redirect لعنوان داخلي | [[redirect: "manual"]] |
| سيرفر بطيء عمدًا | الـ timeouts التلاتة + [[AbortSignal.timeout]] |

- الفحص لحظة الاتصال، مش لحظة التسجيل بس.
- الـ lookup مبيتناداش للـ IP literals، فافحصهم بإيدك.
- أقوى طبقة: workers في شبكة منفصلة أو ورا egress proxy.`,
          lines: [
            "DNS.",
            "BlockList و isIP.",
            "Agent و fetch من undici (بيقبلوا dispatcher بـ lookup مخصص).",
            "قايمة العناوين الممنوعة.",
            "IPv4: الخاص، و loopback، و link-local (فيه الـ metadata)، و CGNAT، و multicast، والمحجوز.",
            "IPv6: unspecified، و loopback، و ULA، و link-local، و multicast.",
            "IP ممنوع؟ (الـ BlockList بتطبق قواعد IPv4 على ::ffff:x.x.x.x كمان).",
            "lookup مخصص: بيتنادى وقت الاتصال نفسه.",
            "اعمل DNS عادي، وهات كل العناوين.",
            "خطأ DNS؟ مرّره.",
            "أي عنوان ممنوع؟",
            "ارفض الاتصال.",
            "غير كده رجّع العناوين بالشكل اللي الـ caller طالبه.",
            "قفلة.",
            "قفلة.",
            "Agent للـ webhooks بالـ lookup ده، و timeouts للاتصال والرد.",
            "فحص الـ URL:",
            "parse (بيوحّد 127.1 و 2130706433 لـ 127.0.0.1).",
            "https بس، ومن غير user:pass، وعلى 443.",
            "الـ host من غير أقواس IPv6.",
            "لو IP مكتوب مباشرة: الـ lookup مش هيتنادى، فافحصه هنا.",
            "رجّع الـ URL.",
            "قفلة.",
            "الإرسال:",
            "افحص، ومن غير redirects، وبالـ Agent الآمن، و timeout للطلب كله."
          ],
          sol: R`النتايج:

[[https://localhost/]] → [[EBLOCKED blocked address ::1]] (من الـ lookup. على ويندوز [[localhost]] بيرجّع [[::1]] الأول، وعلى أجهزة تانية ممكن تشوف [[127.0.0.1]]).
[[https://127.1/]] و [[https://2130706433/]] → [[blocked address 127.0.0.1]] (من validateWebhookUrl، لأن URL وحّدهم).
[[https://[::ffff:127.0.0.1]/]] → [[blocked address ::ffff:7f00:1]].
[[https://169.254.169.254/]] → [[blocked address 169.254.169.254]].
[[http://example.com]] → [[URL must be https...]].
[[https://example.com]] → بيتصل عادي.

ولما شلت فحص الـ IP literal: [[https://127.1/]] وصل فعلًا للـ 127.0.0.1 (لو عندك حاجة شغالة على 443 محليًا هتشوف ردها، ولو لأ [[ECONNREFUSED]]). ده معناه إن الـ lookup اتعدّى، ودي بالظبط الثغرة اللي لقيناها وإحنا بنكتب الدرس.`
        },
        {
          cmd: "tRPC",
          title: "API من غير عقد مكتوب لما الاتنين TypeScript",
          desc: R`لو الفرونت والباك TypeScript في نفس الـ repo (monorepo أو Next)، tRPC بيشيل طبقة العقد كلها: بتكتب procedures على السيرفر بـ input schema (Zod)، والعميل بيناديها كأنها دوال، والأنواع (المدخلات والمخرجات) بتوصل للفرونت من الـ type نفسه، من غير OpenAPI ولا code generation.

غيّر اسم حقل في السيرفر، والفرونت ميعدّيش الـ typecheck.`,
          example: R`import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.context<{ userId: string | null }>().create();
const authed = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { userId: ctx.userId } });
});
export const appRouter = t.router({
  orderById: authed.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const order = await db.order.findFirst({ where: { id: input.id, userId: ctx.userId } });
    if (!order) throw new TRPCError({ code: "NOT_FOUND" });
    return order;
  }),
  cancelOrder: authed.input(z.object({ id: z.string(), reason: z.string().max(200) })).mutation(({ input, ctx }) => ordersService.cancel(ctx.userId, input.id, input.reason)),
});
export type AppRouter = typeof appRouter;
// العميل: const api = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: "/api/trpc" })] });
// const order = await api.orderById.query({ id: "9001" });`,
          try: R`اعمل السيرفر بـ [[createHTTPServer]] من [[@trpc/server/adapters/standalone]] والعميل بـ [[createTRPCClient]] في نفس الملف. نادي [[orderById]] بـ id موجود، وبـ id مش بتاعك، وبعدين غيّر [[reason]] لـ [[note]] في السيرفر وشوف [[tsc --noEmit]] بيقول إيه على كود العميل.`,
          flag: "script",
          deep: {
            why: "في مشروع TypeScript واحد، OpenAPI و codegen طبقة زيادة لازم تفضل متزامنة. tRPC بيخلي السيرفر هو العقد: أي تغيير بيبان في الفرونت فورًا في المحرر.",
            how: R`[[initTRPC.context<...>().create()]] بيعمل الـ builder بنوع الـ context. الـ procedure: [[.input(schema)]] (Zod بيتحقق وقت التشغيل، والنوع بيتاخد منه)، وبعدين [[.query()]] للقراية أو [[.mutation()]] للكتابة. [[.use()]] middleware، زي [[authed]] هنا: بيرمي لو مفيش مستخدم، وبيضيّق نوع الـ context (userId بقى string مش null).

[[TRPCError]] بكود زي [[NOT_FOUND]] و [[UNAUTHORIZED]] و [[FORBIDDEN]] بيتحول لـ HTTP status مناسب (404، و 401، و 403)، والعميل بياخده في [[error.data.code]].

السحر في [[export type AppRouter]]: العميل بيستورد النوع بس (مفيش كود سيرفر بيروح للفرونت)، و [[createTRPCClient<AppRouter>]] بيبني proxy بيعرف كل الـ procedures وأنواعها. [[httpBatchLink]] بيجمع النداءات اللي حصلت في نفس اللحظة في طلب HTTP واحد.

في Next بيتركّب في Route Handler ([[fetchRequestHandler]])، وفي Express بـ adapter، وفيه تكامل مع TanStack Query للكاش في React.

الحدود: الأنواع بتوصل عن طريق TypeScript، فالعميل لازم يبقى TypeScript في نفس الـ repo (أو package مشترك). موبايل Flutter أو Swift، أو عميل خارجي، مش هيستفيد، ومحتاج REST أو OpenAPI. والـ URLs شكلها [[/api/trpc/orderById?input=...]]، مش API عام حلو للناس. والـ versioning مش موجود: الفرونت والباك لازم يتنشروا مع بعض.

وده نفس فكرة Server Actions في Next (تاب «Next.js»)، بس tRPC بيدّيك queries كمان، وشغال مع أي فرونت React أو غيره طالما TypeScript.`,
            when: "full-stack TypeScript في repo واحد، والعميل الوحيد هو الفرونت بتاعك. ولو فيه موبايل native أو عملاء خارجيين، REST + OpenAPI.",
            mistakes: R`تعمل tRPC لـ API هيستخدمه شركاء (مفيش عقد يدّوهولهم). وتنسى الـ auth لأن «ده مجرد function call»: هو HTTP endpoint عام زي أي حاجة. وتستورد [[appRouter]] نفسه في الفرونت بدل [[type AppRouter]] فكود السيرفر يتبندل مع الفرونت. ومنطق الـ business جوه الـ procedure بدل service.`
          },
          teach: R`## السيرفر بيصدّر نوع، والعميل بيبني عليه

المثال سيرفر tRPC فيه procedure للقراية ([[orderById]]) وواحد للكتابة ([[cancelOrder]])، الاتنين ورا middleware بيتأكد إن فيه مستخدم. وفي الآخر بيصدّر **نوع** الـ router، والعميل (في التعليق) بيستورد النوع ده بس ويناديه كأنه دوال.

اتجرّب على ويندوز 11: [[@trpc/server]] و [[@trpc/client]] 11.19 و Zod 4.6 على Node 24.19، والسيرفر بـ [[createHTTPServer]] على بورت ٦٠١٢ بدل ٤٧٨٠. الـ [[db]] و [[ordersService]] كانوا objects في الذاكرة (طلب [[9001]] بتاع [[u1]]، وطلب [[1]] بتاع [[u2]]). والـ typecheck بـ TypeScript 7.0 ([[tsc]]) و [[strict: true]].

---

## ١. الـ builder

~~~ts
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.context<{ userId: string | null }>().create();
~~~

- [[initTRPC]]: نقطة البداية.
- [[.context<{ userId: string | null }>()]]: نوع الـ context، يعني اللي كل procedure هيستلمه عن الطلب (هنا مين المستخدم، أو [[null]]). ده نوع بس، والقيمة بتيجي من [[createContext]] وقت التشغيل.
- [[.create()]]: بيرجّع [[t]]، ومنه [[t.procedure]] و [[t.router]].

---

## ٢. procedure محمي

~~~ts
const authed = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { userId: ctx.userId } });
});
~~~

- [[.use(fn)]]: middleware قبل أي procedure مبني على [[authed]].
- [[({ ctx, next }) =>]]: الـ destructuring بياخد الـ context ودالة [[next]] من الـ object اللي tRPC بيبعته.
- [[TRPCError({ code: "UNAUTHORIZED" })]]: بيتحول لـ HTTP 401.
- [[next({ ctx: { userId: ctx.userId } })]]: كمّل، والـ context الجديد [[userId]] فيه نوعه [[string]] مش [[string | null]]، لأن TypeScript شاف الـ [[if]] اللي فوق. فاللي بعده ميحتاجش يفحص تاني.

---

## ٣. الـ router

~~~ts
export const appRouter = t.router({
  orderById: authed.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
~~~

- [[t.router({...})]]: كل مفتاح اسم procedure.
- [[.input(z.object({ id: z.string() }))]]: Zod بيتحقق من المدخلات وقت التشغيل، و tRPC بياخد النوع منه: [[input]] نوعه [[{ id: string }]].
- [[.query(...)]]: procedure قراية (GET).

~~~ts
    const order = await db.order.findFirst({ where: { id: input.id, userId: ctx.userId } });
    if (!order) throw new TRPCError({ code: "NOT_FOUND" });
    return order;
  }),
~~~

الشرط فيه [[userId]]: طلب حد تاني بيتعامل كأنه مش موجود (404 مش 403، عشان متقولش إنه موجود). و [[return order]]: النوع ده هو اللي هيوصل للعميل.

~~~ts
  cancelOrder: authed.input(z.object({ id: z.string(), reason: z.string().max(200) })).mutation(({ input, ctx }) => ordersService.cancel(ctx.userId, input.id, input.reason)),
});
~~~

[[.mutation]]: procedure كتابة (POST). و [[.max(200)]]: أطول من ٢٠٠ حرف = 400.

~~~ts
export type AppRouter = typeof appRouter;
~~~

[[typeof appRouter]] في مكان نوع معناها «نوع المتغير ده». ده **كل** العقد: أسامي الـ procedures ومدخلاتها ومخرجاتها، من غير سطر كود واحد يتبعت للفرونت.

---

## ٤. الـ solCode: سيرفر وعميل

~~~ts
createHTTPServer({ router: appRouter, createContext: ({ req }) => ({ userId: req.headers.authorization === "Bearer u1" ? "u1" : null }) }).listen(4780);
~~~

[[createHTTPServer]] من [[@trpc/server/adapters/standalone]]: سيرفر HTTP عادي من Node. و [[createContext]] بتتنادى مع كل طلب وترجّع الـ context. (في التجربة: توكن ثابت عشان البساطة.)

~~~ts
const api = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: "http://localhost:4780", headers: { authorization: "Bearer u1" } })] });
~~~

- [[createTRPCClient<AppRouter>]]: العميل بيعرف كل حاجة من النوع. [[api.]] في المحرر بيقترح [[orderById]] و [[cancelOrder]].
- [[links]]: الطريق اللي النداءات بتمشي فيه. [[httpBatchLink]] بيجمع النداءات اللي حصلت في نفس اللحظة في طلب HTTP واحد.

~~~ts
console.log(await api.orderById.query({ id: "9001" }));
try { await api.orderById.query({ id: "1" }); } catch (e: any) { console.log(e.data?.code, e.data?.httpStatus); }
~~~

~~~text الناتج
{ id: '9001', userId: 'u1', status: 'paid', total: 500 }
NOT_FOUND 404
~~~

وزودنا كام نداء:

~~~text الناتج
TRPCClientError | NOT_FOUND
{ id: '9001', userId: 'u1', status: 'cancelled', reason: 'changed my mind' }
anon: UNAUTHORIZED 401
long reason: BAD_REQUEST 400
batched ok 9001 9001
~~~

- الـ error في العميل نوعه [[TRPCClientError]]، والتفاصيل في [[e.data]].
- من غير header: [[authed]] رمى، فـ 401.
- [[reason]] ٢٠١ حرف: Zod رفض قبل ما الـ procedure يشتغل، فـ 400.
- نداءين بـ [[Promise.all]] راحوا في طلب واحد.

---

## ٥. شكلها على السلك

~~~bash
curl -s -H 'Authorization: Bearer u1' 'localhost:6012/orderById?input=%7B%22id%22%3A%229001%22%7D'
curl -s -X POST -H 'Authorization: Bearer u1' -H 'content-type: application/json' -d '{"id":"9001","reason":"late"}' localhost:6012/cancelOrder
~~~

[[%7B%22id%22...]] هو [[{"id":"9001"}]] بعد URL encode.

~~~text الناتج
{"result":{"data":{"id":"9001","userId":"u1","status":"paid","total":500}}}
{"result":{"data":{"id":"9001","userId":"u1","status":"cancelled","reason":"late"}}}
~~~

والـ batch: [[/orderById,orderById?batch=1&input={"0":{...},"1":{...}}]] بيرجّع array فيها نتيجة كل واحد. والـ error بيرجع فيه [[stack]] كامل بمسارات الملفات على السيرفر، لأن tRPC بيعتبره development لو [[NODE_ENV]] مش [[production]]. في الإنتاج اتأكد إن [[NODE_ENV=production]].

---

## ٦. الـ try: غيّر اسم حقل

غيّرنا [[reason]] لـ [[note]] في السيرفر بس، وشغّلنا [[tsc]] على المشروع (العميل لسه بيبعت [[reason]]):

~~~bash
npx tsc -p .
~~~

~~~text الناتج
main.ts(10,56): error TS2353: Object literal may only specify known properties, and 'reason' does not exist in type '{ id: string; note: string; }'.
main.ts(13,50): error TS2353: Object literal may only specify known properties, and 'reason' does not exist in type '{ id: string; note: string; }'.
~~~

الخطأ في ملف **العميل**، في السطرين اللي بينادوا [[cancelOrder.mutate]]، والنوع المتوقع طالع من الـ Zod schema في السيرفر. من غير ما حاجة تشتغل، ومن غير ملف عقد.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[initTRPC.context<T>().create()]] | الـ builder بنوع الـ context |
| [[.use(...)]] | middleware، وبيضيّق نوع الـ context |
| [[.input(zod)]] | تحقق وقت التشغيل + نوع المدخلات |
| [[.query]] و [[.mutation]] | قراية وكتابة |
| [[TRPCError({ code })]] | بيتحول لـ HTTP status ([[UNAUTHORIZED]] 401، [[NOT_FOUND]] 404، [[BAD_REQUEST]] 400) |
| [[export type AppRouter]] | العقد كله، نوع بس |
| [[createTRPCClient<AppRouter>]] | عميل عارف كل الـ procedures |

- العميل يستورد [[type AppRouter]]، مش [[appRouter]].
- كل procedure HTTP endpoint عام: الـ auth والملكية زي أي API.`,
          lines: [
            "الـ builder والـ error.",
            "Zod للمدخلات.",
            "اعمل tRPC بنوع الـ context (المستخدم أو null).",
            "procedure محمي: middleware...",
            "...مفيش مستخدم؟ 401.",
            "...كمّل، والـ userId بقى string أكيد.",
            "قفلة.",
            "الـ router: كل الـ procedures.",
            "قراية: الـ input متحقق منه بـ Zod، والنوع طالع منه.",
            "بشرط الملكية (BOLA).",
            "مش موجود أو مش بتاعه: 404.",
            "رجّعه، ونوع الرد بيوصل للعميل لوحده.",
            "قفلة.",
            "كتابة: mutation بـ input فيه حد للطول، وبتنادي service.",
            "قفلة.",
            "النوع بس هو اللي بيتصدّر للفرونت، مش الكود."
          ],
          sol: R`الـ id الموجود بيرجّع الطلب كـ object عادي. الـ id اللي مش بتاعك: [[TRPCClientError]] و [[e.data.code]] بـ [[NOT_FOUND]] و [[e.data.httpStatus]] بـ [[404]].

لما تغيّر [[reason]] لـ [[note]] في السيرفر، [[tsc]] على كود العميل بيطلع error زي [[Object literal may only specify known properties, and 'reason' does not exist...]] عند نداء [[cancelOrder.mutate]]. من غير ما تشغّل أي حاجة، ومن غير ملف عقد.

ولو النوع مش بيوصل (كله any)، يا انت بتستورد من مسار غلط، يا [[strict]] مقفول في tsconfig.`,
          solCode: R`import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
createHTTPServer({ router: appRouter, createContext: ({ req }) => ({ userId: req.headers.authorization === "Bearer u1" ? "u1" : null }) }).listen(4780);
const api = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: "http://localhost:4780", headers: { authorization: "Bearer u1" } })] });
console.log(await api.orderById.query({ id: "9001" }));
try { await api.orderById.query({ id: "1" }); } catch (e: any) { console.log(e.data?.code, e.data?.httpStatus); }`
        },
        {
          cmd: "gRPC",
          title: "RPC سريع بين الخدمات بعقد .proto",
          desc: R`gRPC بيعرّف الخدمة في ملف [[.proto]] (Protocol Buffers): الـ methods وأنواع الرسايل بأرقام للحقول. ومنه بيتولّد client و server لأي لغة (Go و Java و Python و Node...). الرسايل binary (أصغر وأسرع من JSON)، والنقل على HTTP/2، وفيه streaming في الاتجاهين.

مكانه الطبيعي: خدمات داخلية بتكلّم بعض كتير، بلغات مختلفة. مش للمتصفح مباشرة (محتاج gRPC-Web أو Connect في النص).`,
          example: R`syntax = "proto3";
package orders.v1;
service OrderService {
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc WatchOrders (WatchOrdersRequest) returns (stream Order);
}
message GetOrderRequest { string id = 1; }
message WatchOrdersRequest { string user_id = 1; }
message Order {
  string id = 1;
  string status = 2;
  int64 total_cents = 3;
}`,
          try: R`حط الملف في [[orders.proto]]، وسطّب [[@grpc/grpc-js]] و [[@grpc/proto-loader]]، واعمل server بـ [[addService]] فيه [[getOrder]] و [[watchOrders]] (بيبعت حالتين ويقفل)، و client بينادي الاتنين. وبعدين ضيف حقل [[string currency = 4;]] في السيرفر بس وشوف العميل القديم لسه شغال.`,
          flag: "script",
          deep: {
            why: "بين ٢٠ خدمة بتكلّم بعض آلاف المرات في الثانية، JSON على HTTP/1.1 مكلّف (parse، وحجم، واتصالات). وعقد مكتوب بيتولّد منه كود لكل لغة بيمنع «الخدمة دي بتبعت total كـ string والتانية مستنياه رقم».",
            how: R`الـ proto: كل حقل ليه رقم ([[= 1]]). الرقم ده هو اللي بيتبعت على السلك مش الاسم، عشان كده الرسايل صغيرة. والقاعدة الذهبية: متغيّرش رقم حقل ومتعيدش استخدام رقم اتشال. إضافة حقل جديد برقم جديد متوافقة للخلف: العميل القديم بيتجاهله، والجديد بيلاقي القيمة الافتراضية لو القديم مبعتهوش. و [[package orders.v1]] فيه الـ version.

أنواع الـ RPC أربعة: unary (طلب ورد)، و server streaming (زي [[WatchOrders]]: طلب واحد وردود كتير)، و client streaming، و bidirectional.

[[int64]] في Node: JavaScript number مبيشيلش int64 كامل بدقة، فـ proto-loader بيرجّعه string لو قلتله [[longs: String]]. خد بالك منه في الفلوس.

deadlines: كل نداء gRPC المفروض يبقى ليه deadline ([[{ deadline: Date.now() + 2000 }]])، وبيتنقل للنداءات اللي بعده، فالسلسلة كلها بتقف لو الوقت خلص. ده من أحسن حاجات gRPC.

الأخطاء: status codes خاصة بـ gRPC ([[NOT_FOUND]] و [[PERMISSION_DENIED]] و [[UNAVAILABLE]] و [[DEADLINE_EXCEEDED]])، مش HTTP.

العيوب: مش مقروء (binary، فمحتاج أدوات زي grpcurl للتجربة)، والمتصفح مبيتكلمش gRPC مباشرة، و load balancers كتير محتاجة إعداد عشان HTTP/2 بيفتح اتصال واحد طويل (الطلبات كلها بتروح لنفس السيرفر لو الـ balancer شغال على مستوى الاتصال). و ConnectRPC بديل حديث بيتكلم gRPC و HTTP/JSON عادي من نفس الـ proto، وبيشتغل من المتصفح.

المقارنة السريعة: REST للـ APIs العامة والمتصفح. GraphQL لما العملاء محتاجين يختاروا شكل البيانات. tRPC لـ full-stack TypeScript في repo واحد. gRPC بين خدمات داخلية، خصوصًا بلغات مختلفة وبضغط عالي.`,
            when: "microservices داخلية بلغات مختلفة، أو streaming كتير بين الخدمات، أو أداء مهم جدًا. ومش أول اختيار لـ monolith أو API للمتصفح.",
            mistakes: R`تغيّر أرقام الحقول أو تعيد استخدام رقم محذوف (البيانات تتقري غلط من غير أي error). ونداءات من غير deadline فالخدمات بتستنى للأبد. و int64 للفلوس وتقراه number في JS. وتختار gRPC لـ API المتصفح هيكلّمه. وسؤال انترفيو: «REST ولا gRPC بين الخدمات؟»، والإجابة بتدور حول: اللغات، وحجم الطلبات، والحاجة لـ streaming، وأدوات الفريق وقدرته يعمل debug لـ binary.`
          },
          teach: R`## ملف [[.proto]] هو العقد، والأرقام هي اللي بتتبعت

المثال ملف Protocol Buffers بيعرّف خدمة فيها method بطلب ورد ([[GetOrder]])، و method بطلب واحد وردود كتير ([[WatchOrders]])، وتلات رسايل. والـ solCode server و client في Node بيحمّلوا الملف ده وقت التشغيل.

اتجرّب على ويندوز 11: [[@grpc/grpc-js]] 1.14 و [[@grpc/proto-loader]] 0.8 على Node 24.19، والسيرفر على [[127.0.0.1:6013]] بدل 50051. وللتوافق شغّلنا السيرفر والعميل بنسختين مختلفتين من الملف، وشفنا البايتات اللي بتتبعت بمكتبة [[protobufjs]] (اللي proto-loader مبني عليها).

---

## ١. الملف سطر سطر

~~~proto
syntax = "proto3";
package orders.v1;
~~~

- [[syntax = "proto3"]]: نسخة اللغة. proto3 هي الحالية.
- [[package orders.v1]]: namespace. الاسم الكامل للخدمة [[orders.v1.OrderService]]، والـ [[v1]] في الاسم: لو احتجت تغيير مش متوافق، تعمل [[orders.v2]] جنبها.

~~~proto
service OrderService {
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc WatchOrders (WatchOrdersRequest) returns (stream Order);
}
~~~

[[rpc Name (Request) returns (Response)]]: method. و [[stream]] قبل الرد: السيرفر بيبعت رسايل كتير من النوع ده لحد ما يقفل (server streaming).

~~~proto
message GetOrderRequest { string id = 1; }
message WatchOrdersRequest { string user_id = 1; }
message Order {
  string id = 1;
  string status = 2;
  int64 total_cents = 3;
}
~~~

كل حقل: نوع، واسم، و **رقم**. [[= 1]] مش قيمة افتراضية، ده رقم الحقل، وهو اللي بيتبعت على السلك مش الاسم. و [[int64]] رقم صحيح ٦٤ bit (القروش، عشان مفيش كسور في الفلوس).

### البايتات نفسها

حوّلنا [[{ id: "9001", status: "paid", totalCents: 50000 }]] لـ protobuf وقارنّاها بـ JSON:

~~~text الناتج
protobuf bytes: 16 0a 04 39 30 30 31 12 04 70 61 69 64 18 d0 86 03
JSON bytes: 49 {"id":"9001","status":"paid","total_cents":50000}
~~~

| البايتات | معناها |
|---|---|
| [[0a]] | حقل ١، نوعه طول + بيانات ([[1 << 3 OR 2]] = 10) |
| [[04 39 30 30 31]] | ٤ بايت: [["9001"]] |
| [[12]] | حقل ٢، طول + بيانات |
| [[04 70 61 69 64]] | [["paid"]] |
| [[18]] | حقل ٣، رقم (varint) |
| [[d0 86 03]] | ٥٠٠٠٠ مضغوط في ٣ بايت |

١٦ بايت مقابل ٤٩، ومفيش أسامي حقول خالص. عشان كده الرقم مقدس: هو الطريقة الوحيدة اللي الطرف التاني بيعرف بيها ده أنهي حقل.

---

## ٢. الـ solCode: التحميل

~~~ts
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
const pkg: any = grpc.loadPackageDefinition(protoLoader.loadSync("orders.proto", { longs: String }));
~~~

- [[protoLoader.loadSync]]: بيقرا الملف وقت التشغيل (مفيش code generation).
- [[{ longs: String }]]: رجّع [[int64]] كنص. JavaScript number دقيق لحد 2^53 بس، و int64 أكبر.
- [[loadPackageDefinition]]: بيحوّله لـ object، فـ [[pkg.orders.v1.OrderService]] نفس اسم الـ package والخدمة.
- [[: any]]: الأنواع مش معروفة لـ TypeScript لأن الملف بيتقري وقت التشغيل. (مع code generation زي [[ts-proto]] أو Buf بيبقى فيه أنواع.)

---

## ٣. السيرفر

~~~ts
const server = new grpc.Server();
server.addService(pkg.orders.v1.OrderService.service, {
  getOrder: (call: any, cb: any) => cb(null, { id: call.request.id, status: "paid", totalCents: 50000 }),
  watchOrders: (call: any) => { call.write({ id: "1", status: "paid" }); call.write({ id: "1", status: "shipped" }); call.end(); },
});
~~~

- [[addService(definition, handlers)]]: لكل rpc دالة. الأسامي camelCase ([[getOrder]] مش [[GetOrder]])، و proto-loader بيحوّل [[total_cents]] لـ [[totalCents]] كمان.
- unary: [[call.request]] الطلب، و [[cb(error, response)]] الرد. [[null]] = مفيش error.
- streaming: [[call.write(msg)]] لكل رسالة، و [[call.end()]] تقفل.

~~~ts
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
~~~

[[createInsecure()]]: من غير TLS، للتجربة على الجهاز بس. بين السيرفرات الحقيقية [[createSsl]] أو mTLS.

---

## ٤. العميل

~~~ts
  const client = new pkg.orders.v1.OrderService("127.0.0.1:50051", grpc.credentials.createInsecure());
  client.getOrder({ id: "9001" }, { deadline: Date.now() + 2000 }, (err: any, o: any) => {
    console.log(err?.code, o);
~~~

[[{ deadline: Date.now() + 2000 }]]: لو الرد مجاش في ثانيتين، النداء يفشل.

~~~ts
    const s = client.watchOrders({ userId: "u1" });
    s.on("data", (o: any) => console.log("stream", o.status));
    s.on("end", () => process.exit(0));
~~~

الـ streaming بيرجّع stream: [[data]] مع كل رسالة، و [[end]] لما السيرفر يقفل.

~~~text الناتج
undefined { id: '9001', status: 'paid', totalCents: '50000' }
stream paid
stream shipped
~~~

[[undefined]] = [[err?.code]]، يعني مفيش error. و [[totalCents]] نص [['50000']] بسبب [[longs: String]].

---

## ٥. الـ try: التوافق

السيرفر والعميل كل واحد بملف:

~~~text الناتج
server has currency=4, old client -> { id: '9001', status: 'paid', totalCents: '50000' }
both new -> { id: '9001', status: 'paid', totalCents: '50000', currency: 'EGP' }
server moved status to 5, old client -> { id: '9001', totalCents: '50000' }
~~~

- حقل جديد برقم جديد ([[string currency = 4;]]): العميل القديم استلم الرسالة وتجاهل حقل ٤. متوافق.
- السيرفر غيّر [[status]] من ٢ لـ ٥: العميل القديم مستني حقل ٢، فـ [[status]] اختفى خالص، **من غير أي error**. ده الخطر.

### من غير [[longs: String]]

~~~text الناتج
no longs option -> { id: '9001', status: 'paid', totalCents: Long { low: 50000, high: 0, unsigned: false } }
~~~

object [[Long]] (رقم ٦٤ bit مقسوم نصين ٣٢ bit)، مش رقم ولا نص.

### الـ deadline والأخطاء

~~~text الناتج
server slower than deadline -> code 4 DEADLINE_EXCEEDED | Deadline exceeded after 2.009s,name resolution: 0.001s,LB pick: 0.002s,remote_addr=127.0.0.1:6013
NOT_FOUND -> code 5 NOT_FOUND | order 9001 not found
~~~

- السيرفر استنى ٢.٥ ثانية: العميل فشل بعد ٢ بالظبط بكود [[4]].
- السيرفر رد بـ [[cb({ code: grpc.status.NOT_FOUND, details: "..." })]]: كود [[5]]. أكواد gRPC مش HTTP، و [[grpc.status]] فيه أساميها.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[package orders.v1]] | namespace والـ version |
| [[rpc X (A) returns (B)]] | unary |
| [[returns (stream B)]] | server streaming |
| [[string id = 1]] | الرقم هو اللي بيتبعت، مش الاسم |
| [[longs: String]] | int64 كنص في JS |
| [[deadline]] | كل نداء ليه وقت أقصى |

- ضيف حقول بأرقام جديدة، ومتغيّرش ولا تعيد استخدام رقم.
- الرسالة أصغر بكتير من JSON، بس مش مقروءة من غير الـ proto.`,
          lines: [
            "نسخة Protocol Buffers.",
            "الـ package، والـ version جزء من الاسم.",
            "الخدمة:",
            "unary: طلب ورد.",
            "server streaming: طلب واحد، والسيرفر بيبعت ردود كتير لحد ما يقفل.",
            "قفلة.",
            "رسالة الطلب: الحقل رقمه ١ (ده اللي بيتبعت، مش الاسم).",
            "رسالة المتابعة.",
            "الطلب:",
            "الـ id.",
            "الحالة.",
            "المبلغ بالقروش كـ int64 (في Node خده string عشان الدقة).",
            "قفلة."
          ],
          sol: R`العميل بينادي [[getOrder({ id: "9001" })]] وياخد [[{ id: "9001", status: "paid", totalCents: "50000" }]] (لاحظ totalCents string بسبب [[longs: String]]، و proto-loader بيحوّل snake_case لـ camelCase افتراضيًا). و [[watchOrders]] بيطلّع [[stream paid]] وبعدين [[stream shipped]] وبعدين event [[end]].

لما تضيف [[currency = 4]] في السيرفر بس: العميل القديم لسه شغال، وبيتجاهل الحقل الجديد. ولو غيّرت رقم [[status]] من ٢ لـ ٥ في السيرفر بس: العميل القديم هيلاقي status مش موجود خالص ([[{ id: "9001", totalCents: "50000" }]])، من غير أي error. ده ليه الأرقام مقدسة.`,
          solCode: R`import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
const pkg: any = grpc.loadPackageDefinition(protoLoader.loadSync("orders.proto", { longs: String }));
const server = new grpc.Server();
server.addService(pkg.orders.v1.OrderService.service, {
  getOrder: (call: any, cb: any) => cb(null, { id: call.request.id, status: "paid", totalCents: 50000 }),
  watchOrders: (call: any) => { call.write({ id: "1", status: "paid" }); call.write({ id: "1", status: "shipped" }); call.end(); },
});
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  const client = new pkg.orders.v1.OrderService("127.0.0.1:50051", grpc.credentials.createInsecure());
  client.getOrder({ id: "9001" }, { deadline: Date.now() + 2000 }, (err: any, o: any) => {
    console.log(err?.code, o);
    const s = client.watchOrders({ userId: "u1" });
    s.on("data", (o: any) => console.log("stream", o.status));
    s.on("end", () => process.exit(0));
  });
});`
        }
      ]
    }
]);
