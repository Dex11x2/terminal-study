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
    await deliveries.add("deliver", { endpointId: ep.id, eventId: event.id }, { jobId: $__bt$__{event.id}:$__{ep.id}$__bt });
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
            "...delivery job منفصلة، والـ jobId بيمنع التكرار.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`التوقيع السليم: [[verify]] بترجّع الـ payload بعد الـ parse. غيّر رقم في الـ body: بترمي [[No matching signature found]]. timestamp من ساعة: بترمي [[Message timestamp too old]] (الحد الافتراضي ٥ دقايق).

ولو عايز تتحقق من غير المكتبة (ده اللي بتحطه في التوثيق للعملاء):`,
          solCode: R`export function verifyWebhook(secret: string, headers: Record<string, string>, body: string, toleranceSec = 300) {
  const ts = Number(headers["webhook-timestamp"]);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > toleranceSec) return false;
  const expected = signWebhook(secret, headers["webhook-id"], body, ts)["webhook-signature"].slice(3);
  return headers["webhook-signature"].split(" ").some((s) => {
    const [v, sig] = s.split(",");
    return v === "v1" && sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
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
            how: R`الـ backoff: BullMQ بيقبل [[backoffStrategy]] في إعدادات الـ Worker، ومعاها [[backoff: { type: "custom" }]] على الـ job. الدالة بتاخد عدد المحاولات اللي فشلت وترجّع كام ملّي ثانية يستنى. الجدول الثابت أوضح من exponential للعملاء، لأنك تقدر تكتبه في التوثيق: «هنحاول ٨ مرات على مدار حوالي ٣٢ ساعة».

ليه مش exponential بس؟ exponential بـ ٥ ثواني بيوصل لساعات بعد ١٢ محاولة تقريبًا، وده صعب يتشرح. وضيف عشوائية صغيرة (jitter) لو عندك آلاف الـ webhooks لنفس العميل وقع، عشان مترجعلوش كلها في نفس الثانية لما يقوم.

النجاح = أي 2xx. 3xx مش نجاح (الـ fetch بـ [[redirect: "manual"]] عشان SSRF، الدرس الجاي). 410 Gone = العميل بيقول «بطّل»، فتقفل الـ endpoint وتبعتله إيميل. و 4xx التانية: بعض الخدمات بتعيد عليها، وبعضها لأ. الأسلم تعيد (يمكن العميل عمل deploy بايظ ويصلّحه).

الـ timeout: رد العميل لازم ييجي في ثواني (١٠ أو ١٥). العميل المفروض يرد 200 بسرعة ويشتغل في الخلفية، وقول ده في التوثيق. من غير timeout، عميل بطيء بيحجز الـ workers بتوعك.

تعطيل تلقائي: لو الـ endpoint فاشل من أيام في كل الأحداث، اقفله وابعت إيميل، بدل ما تفضل تضرب URL ميت للأبد. وخلي العميل يفعّله تاني من اللوحة.

الترتيب: الـ retries بتلخبط الترتيب (حدث ٢ ممكن يوصل قبل ١ لو ١ فشل مرة). قول ده في التوثيق، وحط [[timestamp]] في الـ payload، والعميل يعتمد على الحالة الحالية من الـ API مش ترتيب الوصول.

السجل: جدول [[webhookDelivery]] بيكبر بسرعة. خزّن أول ٥٠٠ حرف من الرد بس، وامسح القديم (٣٠ يوم مثلًا).`,
            when: "مع أي webhooks صادرة، من أول يوم. ولوحة السجل من أول عميل حقيقي.",
            mistakes: R`retry فوري بدون backoff (بتضرب سيرفر واقع). ومفيش timeout. والرد كله في السجل (ممكن يبقى HTML صفحة error بالميجات). وتبعت من جوه الـ request اللي عمل الحدث بدل queue. والـ secret متسجّل في السجل. وتتبع redirects فالعميل يحوّلك على IP داخلي.`
          },
          lines: [
            "جدول الانتظار بين المحاولات (من ٥ ثواني لـ ١٠ ساعات، حوالي يوم ونص كلهم).",
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

[[https://localhost/]] → [[EBLOCKED blocked address 127.0.0.1]] (من الـ lookup).
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

لما تضيف [[currency = 4]] في السيرفر بس: العميل القديم لسه شغال، وبيتجاهل الحقل الجديد. ولو غيّرت رقم [[status]] من ٢ لـ ٥ في السيرفر بس: العميل القديم هيلاقي status فاضي، من غير أي error. ده ليه الأرقام مقدسة.`,
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
