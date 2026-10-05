// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("apis", {
  label: "APIs متقدمة",
  prompt: "$ ",
  lab: R`docker run -d --name redis -p 127.0.0.1:6379:6379 redis:8
npm i ioredis bullmq graphql@16 graphql-yoga dataloader jose
curl -s localhost:3000/health`,
  labText: "كمّل على مشروع Express بتاع تاب «Backend بـ Node». Redis في Docker للكاش والـ queues.",
  levels: {"1":["تصميم API","REST صح: resources و methods و status و pagination و errors و versioning و OpenAPI"],"2":["بروتوكولات تانية","SSE و streaming لردود AI، و WebSockets على أكتر من سيرفر، و GraphQL و DataLoader"],"3":["على نطاق واسع","OIDC و JWKS و SSO، و rate limiting موزّع، و queues و outbox، و API keys و webhooks صادرة، و tRPC و gRPC"]},
  categories: [
    {
      t: "Resources و methods و status codes",
      l: 1,
      n: "الـ URL اسم حاجة، والـ method الفعل، والـ status النتيجة. لو التلاتة واضحين، الـ API بيشرح نفسه",
      items: [
        {
          cmd: "resources و URLs",
          title: "سمّي الـ endpoints إزاي",
          desc: R`الـ URL اسم لحاجة (resource)، مش فعل. [[/users/42]] يعني «المستخدم ٤٢»، والـ method هو اللي بيقول هتعمل فيه إيه. فبدل [[/getUser?id=42]] و [[/deleteUser]] عندك URL واحد و methods مختلفة.

القواعد: أسماء جمع ([[/orders]] مش [[/order]])، وحروف صغيرة و [[-]] بين الكلمات، ومستوى nesting واحد بس لما العلاقة ملكية واضحة ([[/users/42/orders]]). وأي فلترة تروح في query string.

ولما يبقى فيه «فعل» مش CRUD (إلغاء طلب، أو إعادة إرسال إيميل)، اعمله resource: [[POST /orders/9001/cancellation]]، أو خليه تغيير حالة: [[PATCH /orders/9001]] ومعاه [[{"status":"cancelled"}]].`,
          example: R`GET    /v1/users
POST   /v1/users
GET    /v1/users/42
PATCH  /v1/users/42
DELETE /v1/users/42
GET    /v1/users/42/orders
GET    /v1/orders/9001
POST   /v1/orders/9001/cancellation
GET    /v1/orders?status=paid&sort=-createdAt`,
          try: R`خد API من مشروع قديم عندك واكتب كل الـ routes في ملف. علّم على أي route فيه فعل في الاسم ([[/getX]] أو [[/updateX]] أو [[/doSomething]]) وأعد تسميته بالشكل ده.`,
          flag: "script",
          deep: {
            why: "لما كل endpoint ليه اسم على مزاج اللي كتبه، اللي بيستخدم الـ API لازم يقرا الكود عشان يعرف يطلب إيه. الشكل الموحد بيخلي أي حد يخمّن الـ URL صح من أول مرة، وبيخلي الكاش والـ logs والـ rate limiting يشتغلوا بنفس المنطق على كل الـ resources.",
            how: R`REST مبني على فكرة إن كل حاجة في السيستم resource ليها عنوان ثابت، وانت بتتعامل معاها بمجموعة methods محدودة ومعروفة معانيها (GET و POST و PUT و PATCH و DELETE). المعاني دي متفق عليها في HTTP نفسه، فالـ proxies والمتصفحات والـ CDN فاهمينها: GET ينفع يتكاش ويتعاد، و POST لأ.

فيه نوعين resources: collection زي [[/orders]] (عليها GET للقايمة و POST لإنشاء عنصر جديد)، و item زي [[/orders/9001]] (عليه GET و PATCH و PUT و DELETE).

الـ nesting مفيد لما الابن مالوش معنى من غير الأب ([[/users/42/orders]] = طلبات المستخدم ده). بس لو نزلت أكتر من مستوى ([[/users/42/orders/9001/items/3]]) الـ URL بيطول وبيجبرك تعرف كل الآباء. الأحسن [[/orders/9001]] مباشرة، لأن الـ id لوحده كفاية.

الـ IDs في الـ URL الأحسن تبقى مش متسلسلة (UUID أو cuid) في أي resource عام، عشان محدش يعدّ [[/invoices/1]] و [[/invoices/2]] ويعرف حجم شغلك. بس ده مش حماية: الحماية الحقيقية إنك تتأكد إن صاحب الطلب يملك الـ resource (درس OWASP في آخر المستوى).`,
            when: "من أول endpoint. وكل ما تضيف ميزة اسأل: ده resource جديد، ولا حقل في resource موجود، ولا تغيير حالة؟",
            mistakes: R`أفعال في الـ URL ([[/createOrder]])، وخلط المفرد والجمع، و [[POST /orders/delete]] بدل [[DELETE]]. وفي مشروع حقيقي كان فيه route للتطوير بـ GET بيعمل reset لكل الباسوردات. GET المفروض ميغيّرش حاجة، وأي crawler أو prefetch في المتصفح ممكن يفتح اللينك وينفّذه. أي حاجة بتغيّر بيانات مكانها POST أو PATCH أو DELETE. والسؤال الفخ في الانترفيو: «ليه مش كله POST؟»، والإجابة إن معنى الـ methods مفهوم للـ caches والـ retries والأدوات.`
          },
          lines: [
            "هات قايمة المستخدمين (collection).",
            "اعمل مستخدم جديد جوه الـ collection.",
            "هات مستخدم واحد بالـ id.",
            "عدّل جزء من بياناته.",
            "امسحه.",
            "طلبات المستخدم ده: nesting مستوى واحد لأن العلاقة ملكية.",
            "الطلب نفسه له عنوان مباشر، من غير ما تعدّي على المستخدم.",
            "عملية مش CRUD اتعملت resource: «إلغاء» للطلب ده.",
            "الفلترة والترتيب في query string، مش في الـ path."
          ],
          sol: R`الملف في الآخر المفروض يبقى فيه أسماء جمع بس، والفعل راح للـ method. في الحل: [[GET /getProduct?id=7]] بقت [[GET /v1/products/7]]، و [[POST /updateProduct/7]] بقت [[PATCH]]، و [[GET /deleteProduct/7]] بقت [[DELETE]]. والأفعال اللي مش CRUD اتحولت لـ resource ([[/orders/9001/cancellation]] و [[/users/42/verification-emails]]) أو لتغيير حالة ([[PATCH]] ومعاه [[{"status":"paid"}]]). والبحث راح لـ query string.

اختبار سريع: غطّي عمود الـ method واقرا المسارات لوحدها. لو لسه فيه كلمة زي get أو create أو update أو delete أو do، لسه فيه فعل. وأهم حاجة تدوّر عليها في الملف: أي GET بيغيّر بيانات ([[/deleteProduct]] بـ GET مثلًا). دي مش مسألة شكل، دي bug: الـ prefetch أو أي crawler ممكن يفتحها.

الغلط الشائع إنك تعمل nesting لكل حاجة ([[/users/42/orders/9001/items/3]]) عشان «تبان REST». الطلب ليه id لوحده، فـ [[/orders/9001]] كفاية. ولو الـ API ده شغال ومستخدم، الأسماء الجديدة تبقى في [[/v1]] جديد أو aliases جنب القديمة، متغيّرش القديم مرة واحدة (درس versioning).`,
          solCode: R`# قبل                                  →  بعد
GET    /getAllProducts                 →  GET    /v1/products
GET    /getProduct?id=7                →  GET    /v1/products/7
POST   /createProduct                  →  POST   /v1/products
POST   /updateProduct/7                →  PATCH  /v1/products/7
GET    /deleteProduct/7                →  DELETE /v1/products/7
GET    /getUserOrders?userId=42        →  GET    /v1/users/42/orders
POST   /cancelOrder/9001               →  POST   /v1/orders/9001/cancellation
POST   /resendVerificationEmail        →  POST   /v1/users/42/verification-emails
GET    /searchOrders?s=paid            →  GET    /v1/orders?status=paid
POST   /markOrderAsPaid/9001           →  PATCH  /v1/orders/9001   {"status":"paid"}`
        },
        {
          cmd: "safe و idempotent",
          title: "أنهي طلب ينفع يتعاد من غير ضرر",
          desc: R`safe يعني الطلب مبيغيّرش حاجة على السيرفر (GET و HEAD و OPTIONS). و idempotent يعني لو اتبعت مرة ولا عشرة، الحالة النهائية على السيرفر واحدة (كل الـ safe، ومعاهم PUT و DELETE).

POST و PATCH مش idempotent بالتعريف: [[POST /payments]] مرتين = دفعتين. وده مهم لأن الشبكة بتقطع، والعميل مش عارف الطلب وصل ولا لأ، فبيعيد. الـ methods الـ idempotent تتعاد بأمان، والباقي محتاج حماية (Idempotency-Key، في درس جاي).`,
          example: R`GET     /products/7
HEAD    /products/7
OPTIONS /products
PUT     /users/42/avatar
DELETE  /sessions/current
POST    /payments
PATCH   /carts/9    {"op":"increment","itemId":7}`,
          try: R`اعمل form بـ POST، وبعد الـ submit اعمل refresh للصفحة: المتصفح هيحذّرك إنه هيعيد إرسال البيانات، لأن POST مش idempotent. وبعدين خلي السيرفر يرد بـ redirect لصفحة GET بعد الـ submit (نمط Post/Redirect/Get)، واعمل refresh تاني: التحذير اختفى.`,
          flag: "script",
          deep: {
            why: "كل طبقة بين العميل والسيرفر ممكن تعيد الطلب: المتصفح، والـ load balancer، والـ SDK اللي فيه retry، والمستخدم اللي بيدوس على الزرار مرتين. لازم تعرف أنهي طلبات التكرار فيها آمن، وأنهي هتعمل مصيبة لو اتكررت.",
            how: R`التعريفات دي في مواصفة HTTP نفسها (RFC 9110)، مش اختراع REST.

safe: العميل مش طالب أي تغيير. السيرفر ممكن يكتب log أو يزوّد عداد مشاهدات، بس ده أثر جانبي مش مسؤولية العميل. عشان كده المتصفح بيعمل prefetch لـ GET براحته، والـ crawler بيفتح أي لينك.

idempotent: الأثر المقصود على السيرفر بعد N طلب هو نفسه بعد طلب واحد. خد بالك: الرد نفسه ممكن يختلف. أول DELETE بيرجع 204، والتاني 404، بس الحالة (الـ resource مش موجود) واحدة.

PUT idempotent لأنه بيقول «خلي الحاجة دي بالشكل ده بالظبط». PATCH ممكن يبقى idempotent لو بيقول «خلي الاسم أحمد»، ومش idempotent لو بيقول «زوّد الكمية واحد». عشان كده المواصفة مبتضمنهوش.

الـ proxies والمكتبات بتعتمد على ده: كتير من الـ HTTP clients بيعيدوا GET و PUT لوحدهم لو الاتصال قطع، ومبيعيدوش POST إلا لو قلتلهم.`,
            when: "وانت بتختار method لكل endpoint، ووانت بتكتب retry في client: retry للـ idempotent بس، أو POST معاه Idempotency-Key.",
            mistakes: R`GET بيغيّر حاجة: [[/logout]] بـ GET، أو [[/verify?token=]] بيفعّل حساب، وبرنامج الإيميل أو فاحص اللينكات بيفتح اللينك لوحده فيفعّله. وتفتكر إن idempotent معناه «نفس الرد» وهو معناه «نفس الحالة». وفخ الانترفيو: «POST ممكن يبقى idempotent؟»، أيوه لو السيرفر عمله كده بـ Idempotency-Key، بس مش بالتعريف.`
          },
          lines: [
            "safe و idempotent: قراية بس.",
            "زي GET بس من غير body: الـ headers بس (الحجم، و ETag).",
            "safe: بيسأل «إيه المسموح هنا؟»، والمتصفح بيبعته في CORS preflight.",
            "idempotent: بيحط الصورة دي مكان القديمة. مرة ولا عشرة نفس النتيجة.",
            "idempotent: بعد أول مرة الـ session ممسوحة، والتكرار مبيغيّرش حاجة (حتى لو الرد 404).",
            "لا safe ولا idempotent: كل مرة دفعة جديدة.",
            "PATCH بعملية زي increment مش idempotent: كل تكرار بيزوّد واحد."
          ],
          sol: R`قبل الـ redirect: بعد الـ submit الصفحة اللي قدامك هي رد الـ POST نفسه، فالـ refresh معناه «ابعت الـ POST تاني»، والمتصفح بيسألك (في Chrome: «Confirm Form Resubmission»). لو وافقت هيتعمل طلب تاني فعلًا.

بعد PRG: السيرفر بيرد بـ [[303 See Other]] و [[Location: /orders/1]]، والمتصفح بيعمل GET للصفحة دي لوحده. الـ refresh دلوقتي بيعيد GET بس: من غير تحذير، والرد [[Order #1: book (1 orders total)]] مهما عملت refresh. جرّبه بـ [[curl -i -d item=book localhost:3000/order]] وهتشوف الـ 303 والـ Location.

ليه 303 بالذات؟ لأنه بيقول صراحةً «روح بـ GET». [[res.redirect()]] من غير رقم بيرجّع 302، والمتصفحات عمليًا بتحوّله GET هي كمان، بس 303 هو المعنى الدقيق. أما 307 و 308 فبيعيدوا نفس الـ method والـ body، يعني POST تاني: ده الغلط اللي بيرجّع التحذير. وخد بالك إن PRG بيحل الـ refresh بس، مش الدبل كليك على الزرار: ده محتاج تعطيل الزرار أو Idempotency-Key.`,
          solCode: R`const orders: { id: number; item: string }[] = [];

app.get("/order", (_req, res) => {
  res.type("html").send($__bt<form method="post" action="/order">
    <input name="item" value="book"> <button>Order</button>
  </form>$__bt);
});

app.post("/order", express.urlencoded({ extended: false }), (req, res) => {
  const order = { id: orders.length + 1, item: String(req.body.item) };
  orders.push(order);
  // Post/Redirect/Get: متردش بصفحة، رد بـ redirect لصفحة GET
  res.redirect(303, $__bt/orders/$__{order.id}$__bt);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).send("not found");
  res.type("html").send($__bt<p>Order #$__{order.id}: $__{order.item} ($__{orders.length} orders total)</p>$__bt);
});`
        },
        {
          cmd: "PUT و PATCH",
          title: "تستبدل الحاجة كلها ولا تعدّل حقل",
          desc: R`PUT معناه «ده الشكل الكامل الجديد»: أي حقل مش مبعوت يرجع للقيمة الافتراضية أو يتمسح. PATCH معناه «غيّر الحقول دي بس» والباقي زي ما هو.

في الواقع PATCH هو الأكتر استخدامًا لتعديل بيانات من form. و PUT مناسب لما العميل عنده الـ resource كله: ملف إعدادات، أو صورة، أو عنوان كامل.`,
          example: R`const Address = z.object({ city: z.string(), street: z.string(), zip: z.string().optional() });
app.put("/users/:id/address", async (req, res) => {
  const address = Address.parse(req.body);
  const data = { zip: null, ...address };
  await db.address.upsert({ where: { userId: req.params.id }, create: { userId: req.params.id, ...data }, update: data });
  res.status(204).end();
});
app.patch("/users/:id/address", async (req, res) => {
  const changes = Address.partial().parse(req.body);
  await db.address.update({ where: { userId: req.params.id }, data: changes });
  res.status(204).end();
});`,
          try: R`اعمل الـ endpointين، وابعت PUT من غير zip بعد ما كان فيه zip، واعمل GET وشوف إنه اتمسح. وبعدين ابعت PATCH فيه city بس، وشوف إن الباقي فضل زي ما هو.`,
          flag: "script",
          deep: {
            why: "لو معنى التعديل مش واضح، العميل يبعت حقل واحد بـ PUT ويتفاجئ إن باقي البيانات راحت، أو يبعت الشكل كله بـ PATCH ويكتب فوق تعديل حد تاني عمله من ثانية.",
            how: R`PUT في RFC 9110: «الحالة الجديدة للـ resource هي الـ body ده». عشان كده idempotent: نفس الـ body مرتين = نفس النتيجة. وينفع يعمل الـ resource لو مش موجود (زي [[PUT /users/42/avatar]]).

PATCH (RFC 5789) بيبعت «وصف للتغيير»، وشكل الوصف ده بيتحدد بالـ Content-Type:

[[application/merge-patch+json]] (RFC 7396): JSON جزئي بيتدمج. الحقل الموجود بيتغيّر، والحقل اللي قيمته null بيتمسح، والمش موجود بيفضل. ده اللي أغلب الـ APIs بتعمله فعلًا حتى لو بيقولوا application/json.

[[application/json-patch+json]] (RFC 6902): قايمة عمليات، كل واحدة زي [[{"op": "replace", "path": "/city", "value": "Cairo"}]]. أدق (فيه add و remove و test)، بس أصعب، ومستخدم في حاجات زي Kubernetes.

في Prisma: الحقل اللي قيمته [[undefined]] بيتجاهل، و [[null]] بيتكتب null. فـ [[partial()]] في Zod مع Prisma بتدّيك merge patch تقريبًا ببلاش. وخلي بالك إن JSON مفيهوش undefined: الحقل يا مبعوت يا لأ.`,
            when: "PATCH لأغلب التعديلات من الواجهة. PUT لما العميل بيمتلك الشكل كله (إعدادات، أو ملفات، أو ربط علاقة) أو لما محتاج idempotency مضمونة.",
            mistakes: R`PUT بيعمل merge (فمبقاش استبدال، ومحدش فاهم ليه الحقل مش بيتمسح). و PATCH بيستقبل [[req.body]] كله ويبعته للقاعدة: العميل يبعت [[role: "admin"]] ويبقى admin (mass assignment، درس OWASP). وتنسى إن تعديلين PATCH في نفس الوقت ممكن واحد يكتب فوق التاني: الحل If-Match (في درس جاي).`
          },
          lines: [
            "شكل العنوان: المدينة والشارع مطلوبين، والرقم البريدي اختياري.",
            "PUT: استبدال كامل.",
            "لازم الشكل كامل، وإلا Zod يرمي error (والـ error handler بيحوّله 422، درس problem+json).",
            "أي حقل اختياري مش مبعوت يرجع null. ده معنى «استبدال».",
            "upsert: لو مفيش عنوان يتعمل، ولو فيه يتستبدل. عشان كده PUT هنا idempotent.",
            "204: تم، ومفيش body.",
            "قفلة.",
            "PATCH: تعديل جزئي.",
            "[[partial()]] بتخلي كل الحقول اختيارية، فيبعت اللي عايز يغيّره بس.",
            "اللي مش مبعوت ميتلمسش (Prisma بيتجاهل الحقول الـ undefined).",
            "204.",
            "قفلة."
          ],
          sol: R`الترتيب اللي هتشوفه: بعد أول PUT الـ GET بيرجّع [[{"city":"Giza","street":"Tahrir 5","zip":"12611"}]]. بعد PUT من غير zip: [[{"city":"Giza","street":"Tahrir 5","zip":null}]]، يعني الـ zip اتمسح لأن PUT استبدال كامل. وبعد PATCH فيه [[{"city":"Cairo"}]] بس: [[{"city":"Cairo","street":"Tahrir 5","zip":null}]]، المدينة اتغيرت والباقي زي ما هو. وكل الـ PUT و PATCH بيرجعوا 204 من غير body.

لو الـ zip فضل موجود بعد الـ PUT، يبقى نسيت [[{ zip: null, ...address }]] وبعت [[address]] زي ما هو: Prisma بيتجاهل الحقل الـ undefined، فبقى PUT بيعمل merge. ولو بعت PUT فيه [[city]] بس هياخد 422 لأن [[street]] مطلوب، ودا صح: PUT لازم الشكل كامل.

ولو عملت PATCH على مستخدم مالوش عنوان خالص، هتاخد 500 مش 404: [[update]] في Prisma بيرمي P2025 لما ميلاقيش الصف. في مشروع حقيقي امسك الـ P2025 وحوّله 404.`,
          solCode: R`J='Content-Type: application/json'
curl -X PUT localhost:3000/users/42/address -H "$J" -d '{"city":"Giza","street":"Tahrir 5","zip":"12611"}'   # 204
curl localhost:3000/users/42/address        # {"city":"Giza","street":"Tahrir 5","zip":"12611"}

# PUT من غير zip: استبدال كامل، فالـ zip اتمسح
curl -X PUT localhost:3000/users/42/address -H "$J" -d '{"city":"Giza","street":"Tahrir 5"}'                   # 204
curl localhost:3000/users/42/address        # {"city":"Giza","street":"Tahrir 5","zip":null}

# PATCH فيه city بس: الباقي زي ما هو
curl -X PATCH localhost:3000/users/42/address -H "$J" -d '{"city":"Cairo"}'                                    # 204
curl localhost:3000/users/42/address        # {"city":"Cairo","street":"Tahrir 5","zip":null}

# PUT ناقص street: 422 (الـ PUT لازم الشكل كامل)
curl -X PUT localhost:3000/users/42/address -H "$J" -d '{"city":"Alex"}'
# {"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"string","code":"invalid_type","path":["street"],...}],...}`
        },
        {
          cmd: "201 و 204 و 202",
          title: "رد النجاح المناسب لكل عملية",
          desc: R`مش كل نجاح 200. [[201 Created]] لما تعمل حاجة جديدة، ومعاه header اسمه [[Location]] فيه عنوانها. [[204 No Content]] لما العملية نجحت ومفيش حاجة ترجعها (مسح، أو تعديل مش محتاج رد). [[202 Accepted]] لما استلمت الطلب بس الشغل لسه هيتعمل في الخلفية.

والـ 200 للباقي: GET، أو تعديل بيرجّع الشكل الجديد.`,
          example: R`app.post("/users", async (req, res) => {
  const user = await db.user.create({ data: NewUser.parse(req.body) });
  res.status(201).location($__bt/users/$__{user.id}$__bt).json(user);
});
app.delete("/users/:id", async (req, res) => {
  await db.user.delete({ where: { id: req.params.id } });
  res.status(204).end();
});
app.post("/reports", async (req, res) => {
  const job = await reports.add("build", { userId: req.user.id, month: req.body.month });
  res.status(202).location($__bt/jobs/$__{job.id}$__bt).json({ jobId: job.id, status: "queued" });
});`,
          try: R`نفّذ الـ endpoints وشوف الردود بـ [[curl -i]]. لاحظ إن 204 مفيهوش body حتى لو حاولت تبعت [[json()]]، لأن Express بيشيل الـ body لوحده مع 204.`,
          flag: "script",
          deep: {
            why: "العميل (أو الـ SDK اللي بيتولّد من OpenAPI) بيبني منطقه على الـ status. لو كله 200، لازم يقرا الـ body ويخمّن. ولو رجّعت 200 لشغل لسه متعملش، العميل هيفتكر التقرير جاهز.",
            how: R`201: الـ Location header بيقول فين الحاجة اللي اتعملت. ولو رجّعت الـ resource في الـ body، بتوفّر على العميل طلب. [[res.location()]] في Express بيحط الـ header، و [[res.status(201)]] بيحط الكود.

204: الرد مفيهوش body بالتعريف. HTTP نفسه بيمنعه، و Express بيشيل الـ body والـ Content-Type لو الـ status 204. مناسب للـ DELETE، ولـ PUT و PATCH لو العميل مش محتاج الشكل الجديد.

202: «استلمت ولسه مخلصتش». بترجّع مكان يتابع منه، عادة [[GET /jobs/:id]] بيرجّع [[{ "status": "active" }]] وبعدين completed ومعاها النتيجة (في BullMQ: [[queue.getJob(id)]] و [[job.getState()]] و [[job.returnvalue]]). والعميل يا يعمل polling، يا تبلّغه بـ SSE (المستوى ٢) أو webhook (المستوى ٣).

200 مع body للـ GET، ولأي عملية بترجّع نتيجة. ومتنساش الـ 3xx: [[301]] و [[308]] نقل دائم، و [[304]] «النسخة اللي عندك لسه صالحة» (درس ETag).`,
            when: "مع كل endpoint بتكتبه: POST بيعمل حاجة = 201، مسح = 204، شغل في الخلفية = 202.",
            mistakes: R`200 مع [[{"success": false}]] في الـ body: كل أداة مراقبة هتفتكره نجح. و 201 من غير Location. و 204 وبعدين تستغرب إن الـ body مش واصل. و 202 من غير أي طريقة يعرف بيها العميل إن الشغل خلص.`
          },
          lines: [
            "إنشاء مستخدم.",
            "اتحقق من البيانات واعمل الصف.",
            "201، و Location فيه عنوان المستخدم الجديد، والـ body فيه المستخدم نفسه عشان العميل ميعملش GET تاني.",
            "قفلة.",
            "مسح.",
            "امسح (لو مش موجود Prisma بيرمي error، وتحوّله 404).",
            "204: تم، ومفيش body خالص.",
            "قفلة.",
            "طلب تقرير تقيل.",
            "حطه في queue (BullMQ، درس [[background jobs]] في تاب «بناء مشروع كامل») ومتستناش.",
            "202: استلمت، و Location بيشاور على مكان متابعة الشغل.",
            "قفلة."
          ],
          sol: R`الـ POST على [[/users]] بيرجّع [[HTTP/1.1 201 Created]] و [[Location: /users/1]] والمستخدم في الـ body. الـ POST على [[/reports]] بيرجّع [[202 Accepted]] و [[Location: /jobs/17]] و [[{"jobId":"17","status":"queued"}]]. والـ DELETE بيرجّع [[204 No Content]] من غير Content-Type ولا Content-Length ولا body، حتى لو كتبت [[res.status(204).json({ deleted: true })]].

حاجة غريبة هتلاحظها في الـ 204: فيه [[ETag: W/"10-..."]]. Express حسب الـ ETag من الـ JSON اللي انت حاولت تبعته قبل ما يشيله. مش مشكلة، بس دليل إن الـ body اتعمل واترمى، فالأنضف [[res.status(204).end()]].

لو اعتمدت على الـ body ده في الفرونت، [[await res.json()]] هيرمي [[Unexpected end of JSON input]]. اقرا الـ JSON بس لما الـ status مش 204. ولو عملت DELETE لنفس المستخدم مرتين، التانية هتاخد 500 (Prisma بيرمي P2025)، وده مكانه 404 زي ما الشرح بيقول.`,
          solCode: R`curl -i -X POST localhost:3000/users -H 'Content-Type: application/json' -d '{"email":"ali@example.com","name":"Ali"}'
# HTTP/1.1 201 Created
# Location: /users/1
# Content-Type: application/json; charset=utf-8
#
# {"id":"1","email":"ali@example.com","name":"Ali",...}

curl -i -X DELETE localhost:3000/users/1      # حتى لو الكود فيه res.status(204).json({ deleted: true })
# HTTP/1.1 204 No Content
# ETag: W/"10-..."          ← مفيش Content-Type ولا Content-Length ولا body

curl -i -X POST localhost:3000/reports -H 'Authorization: Bearer YOUR_TOKEN' -H 'Content-Type: application/json' -d '{"month":"2026-08"}'
# HTTP/1.1 202 Accepted
# Location: /jobs/17
#
# {"jobId":"17","status":"queued"}`
        },
        {
          cmd: "4xx صح",
          title: "كود الخطأ اللي بيقول الحقيقة",
          desc: R`كل كود بيقول للعميل يعمل إيه بعد كده: [[400]] الطلب نفسه بايظ (JSON مكسور). [[422]] الشكل سليم بس القيم غلط (إيميل مش إيميل). [[401]] «انت مين؟»: مفيش توكن أو بايظ، سجّل دخول. [[403]] «عارف انت مين، ومش مسموحلك». [[404]] مش موجود (أو مش هقولك إنه موجود). [[410]] كان موجود واتشال للأبد. [[409]] تعارض مع الحالة الحالية (الطلب اتشحن خلاص). [[429]] كتير، استنى.

الفرق ده مش شكليات: العميل بيعمل retry على 429 و 503، وبيروح لصفحة login على 401، وبيعرض رسالة للمستخدم على 422.`,
          example: R`app.post("/orders/:id/cancellation", requireAuth, async (req, res) => {
  if (!req.user.emailVerified) return res.status(403).json({ detail: "verify your email first" });
  const parsed = CancelInput.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ errors: parsed.error.issues });
  const order = await db.order.findUnique({ where: { id: req.params.id } });
  if (!order || order.userId !== req.user.id) return res.status(404).end();
  if (order.status === "shipped") return res.status(409).json({ detail: "already shipped" });
  await db.order.update({ where: { id: order.id }, data: { status: "cancelled", cancelReason: parsed.data.reason } });
  res.status(204).end();
});`,
          try: R`جرّب كل حالة بـ curl: من غير توكن، وبتوكن مستخدم تاني، و body فاضي، وطلب متشحن. اكتب الكود اللي رجع قدام كل حالة، واتأكد إن طلب مستخدم تاني بيرجّع 404 مش 403.`,
          flag: "script",
          deep: {
            why: "الـ status أول حاجة العميل والأدوات بيقروها. Sentry والـ dashboards بيعدّوا الـ 5xx كأعطال والـ 4xx كأخطاء عميل. والـ SDKs بتعمل retry على حاجات وتوقف على حاجات. كود غلط = retry على حاجة مش هتنجح، أو تسجيل خروج بسبب خطأ validation.",
            how: R`400 مقابل 422: 400 لما الطلب مش مفهوم أصلًا (JSON مكسور، أو Content-Type غلط، أو header ناقص). [[express.json()]] بيرجّعها لوحده لو الـ JSON مكسور. 422 (Unprocessable Content، بقت جزء من RFC 9110) لما الـ JSON سليم بس القيم مش مقبولة. فيه APIs كتير بترجّع 400 للاتنين وده مقبول، المهم تبقى ثابت وترجّع تفاصيل كل حقل.

401 مقابل 403: الاسم مضلل. 401 «Unauthorized» معناها فعليًا unauthenticated: مش عارفين انت مين. ولازم يبقى معاها header [[WWW-Authenticate]] (زي [[Bearer]]). والعميل يعمل refresh للتوكن أو يروح لـ login. 403 «عارفينك ومش مسموح»، و refresh مش هيحل حاجة.

404 مقابل 403 لحاجة مش بتاعته: لو قلت 403 انت كده أكدت إن الطلب ٩٠٠١ موجود. فالأأمن 404 لموارد المستخدمين التانيين، و 403 للحاجات اللي وجودها مش سر (صفحة الأدمن).

410 Gone: الـ resource اتشال عمدًا ومش راجع (لينك مشاركة اتلغى، أو version قديم من الـ API اتقفل). بيقول للعميل وللـ crawlers «بطّل تسأل».

409 Conflict: الطلب سليم بس بيتعارض مع الحالة: إيميل متسجّل قبل كده، أو تعديل على نسخة قديمة، أو إلغاء طلب اتشحن.

429 Too Many Requests ومعاها [[Retry-After]] بالثواني. والـ 5xx: [[500]] غلط عندك، و [[502]] و [[504]] الـ upstream وقع أو اتأخر (Nginx قدام Node)، و [[503]] مش متاح دلوقتي (صيانة أو ضغط) ومعاها Retry-After.`,
            when: "كل رد خطأ. واعمل helper واحد للأخطاء (الدرس الجاي) عشان متكتبش الأكواد بإيدك في كل مكان.",
            mistakes: R`403 لتوكن منتهي (فالعميل ميعملش refresh ويفضل واقف). و 500 لـ validation (فالـ monitoring يصرّخ على غلط المستخدم). والترتيب: الصلاحية قبل الـ validation، عشان اللي مش مسموحله ميعرفش شكل الـ body المطلوب. وفخ الانترفيو: «401 ولا 403 لو التوكن سليم بس الـ role مش admin؟»، والإجابة 403.`
          },
          lines: [
            "requireAuth قبل الـ handler: لو مفيش توكن أو بايظ بيرجّع 401 ومعاه WWW-Authenticate.",
            "المستخدم معروف بس مأكّدش إيميله: 403، مسموحلوش يعمل العملية دي.",
            "اتحقق من الـ body.",
            "الشكل سليم والقيم غلط: 422 ومعاها تفاصيل كل حقل.",
            "هات الطلب.",
            "مش موجود، أو موجود بس مش بتاعه: 404 في الحالتين، عشان محدش يعرف إن الـ id ده موجود.",
            "الحالة الحالية مبتسمحش: 409.",
            "كل حاجة تمام: نفّذ.",
            "204.",
            "قفلة."
          ],
          sol: R`الجدول اللي المفروض يطلعلك: من غير توكن [[401]] ومعاه [[WWW-Authenticate: Bearer]]. مستخدم مأكّدش إيميله [[403]]. توكن مستخدم تاني [[404]]، ونفس الرد بالظبط لـ id مش موجود أصلًا. body فاضي [[{}]] بيرجّع [[422]] ومعاه [[path: ["reason"]]]. JSON مكسور [[400]] (من [[express.json()]] قبل ما يوصل للـ handler). طلب متشحن [[409]] و [[already shipped]]. وطلب سليم [[204]].

المهم في حالة المستخدم التاني إن الرد ميفرقش عن id مش موجود: نفس الـ status ونفس الـ body الفاضي. لو رجّع 403 يبقى انت فصلت [[!order]] عن [[order.userId !== req.user.id]] في شرطين. والحل الأنضف إن الملكية تبقى جوه الاستعلام نفسه (درس OWASP).

ولاحظ الترتيب: body فاضي من مستخدم مأكّدش إيميله بياخد 403 مش 422، لأن فحص الصلاحية قبل الـ validation. ولو بعت الطلب من غير body خالص هتاخد 422 برضه ([[expected object, received undefined]])، لأن [[req.body]] في Express 5 بيبقى undefined لما مفيش body.`,
          solCode: R`URL=localhost:3000/orders/1/cancellation
J='Content-Type: application/json'
BODY='{"reason":"changed my mind"}'
curl -s -o /dev/null -w "%{http_code}\n" -X POST $URL -H "$J" -d "$BODY"                                   # 401 (ومعاه WWW-Authenticate: Bearer)
curl -s -o /dev/null -w "%{http_code}\n" -X POST $URL -H "Authorization: Bearer $UNVERIFIED" -H "$J" -d "$BODY"  # 403
curl -s -o /dev/null -w "%{http_code}\n" -X POST $URL -H "Authorization: Bearer $OTHER_USER" -H "$J" -d "$BODY"  # 404 مش 403
curl -s -w " %{http_code}\n" -X POST $URL -H "Authorization: Bearer $OWNER" -H "$J" -d '{}'                     # {"errors":[...path":["reason"]...]} 422
curl -s -w " %{http_code}\n" -X POST $URL -H "Authorization: Bearer $OWNER" -H "$J" -d '{reason:'             # 400 (JSON مكسور، من express.json)
curl -s -w " %{http_code}\n" -X POST localhost:3000/orders/2/cancellation -H "Authorization: Bearer $OWNER" -H "$J" -d "$BODY"  # {"detail":"already shipped"} 409
curl -s -o /dev/null -w "%{http_code}\n" -X POST $URL -H "Authorization: Bearer $OWNER" -H "$J" -d "$BODY"   # 204`
        }
      ]
    },
    {
      t: "الأخطاء والقوايم",
      l: 1,
      n: "شكل خطأ واحد في كل الـ API، وقوايم بتتقسّم وتتفلتر من غير ما توقّع السيرفر",
      items: [
        {
          cmd: "problem+json",
          title: "شكل واحد لكل أخطاء الـ API",
          desc: R`RFC 9457 (Problem Details) بيحدد شكل JSON للأخطاء: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]، ومعاهم أي حقول زيادة زي [[errors]] للـ validation. والـ Content-Type بيبقى [[application/problem+json]].

الفايدة إن العميل يكتب كود واحد يقرا بيه أي خطأ من أي endpoint، بدل ما كل route يرجّع شكل مختلف.`,
          example: R`import { STATUS_CODES } from "node:http";
export const problem = (status: number, title: string, detail?: string, extra: object = {}) =>
  Object.assign(new Error(title), { status, title, detail, extra });
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) err = problem(422, "Unprocessable Content", "Validation failed", { errors: err.issues });
  const status = Number.isInteger(err?.status) ? err.status : 500;
  if (status >= 500) console.error(err);
  const body = status >= 500
    ? { title: "Internal Server Error", status }
    : { title: err.title ?? STATUS_CODES[status], status, detail: err.detail ?? err.message, ...err.extra };
  res.status(status).type("application/problem+json").json({ type: "about:blank", ...body, instance: req.originalUrl });
});
throw problem(409, "Conflict", "Order 9001 is already shipped", { orderId: "9001" });`,
          try: R`ارمي [[problem(409, ...)]] من route، وابعت JSON مكسور، وابعت body ناقص حقل. اتأكد إن التلاتة راجعين بنفس الشكل، وإن الـ Content-Type هو [[application/problem+json]]. وبعدين ارمي [[new Error("db password is x")]] واتأكد إن الرسالة مبتطلعش للعميل.`,
          flag: "script",
          deep: {
            why: R`من غير اتفاق، كل route بيرجّع خطأ بشكل: [[{ error: "..." }]] هنا، و [[{ message: "..." }]] هناك. والفرونت بيتملى سطور زي [[err.response?.data?.message || err.response?.data?.error?.message || "حصل خطأ"]]. وفي مشاريع حقيقية لنفس الشخص، backend بيرجّع [[{ status: "error", message }]] والتاني بيرجّع [[{ error: { message } }]]، فكود الأخطاء في الفرونت مكنش ينفع يتنقل من مشروع للتاني.`,
            how: R`الحقول الأساسية:

[[type]]: URI بيعرّف نوع المشكلة، زي [[https://example.com/problems/out-of-credit]]، وممكن يبقى صفحة توثيق. لو مش موجود معناه [[about:blank]]، يعني «المشكلة هي معنى الـ status نفسه»، وساعتها [[title]] يبقى اسم الـ status.

[[title]]: ملخص ثابت لنوع المشكلة (مبيتغيّرش من مرة للتانية). [[detail]]: شرح الحالة دي بالذات («رصيدك ٣٠ والعملية بـ ٥٠»). [[status]]: نفس كود HTTP، عشان لو الـ body اتنقل لوحده (في log مثلًا). [[instance]]: بيعرّف الحالة دي بالذات، والناس بتحط فيه المسار أو request ID.

وأي حقول تانية مسموحة (extension members): [[errors]] للـ validation، أو [[balance]]، أو [[retryAfter]]. العميل اللي مش فاهمها بيتجاهلها.

RFC 9457 طلع سنة 2023 وحل محل RFC 7807، ونفس الشكل تقريبًا. فيه frameworks بتطلّعه لوحدها (Spring و ASP.NET). في Express بتعمله بـ error handler واحد زي المثال. و Express 5 بيبعت أي promise مرفوض من handler للـ error handler تلقائيًا، فمش محتاج [[try/catch]] في كل route (الأساس في تاب «Backend بـ Node»). و [[express.json()]] لما الـ JSON يبقى مكسور بيرمي error معاه [[status]] 400، فالـ handler ده بيطلّعه صح من غير كود زيادة.`,
            when: "من أول يوم في أي API جديد. ولو API قديم، ابدأ بيه في الـ version الجديد.",
            mistakes: R`ترجّع [[err.message]] و [[err.stack]] في أخطاء الـ 500: رسايل Prisma فيها أسماء الجداول والأعمدة. و [[title]] بيتغير مع كل حالة (ده مكانه [[detail]]). و status في الـ body مختلف عن status الـ HTTP. وتنسى الـ Content-Type، فالعملاء اللي بيفرّقوا بيه ميعرفوش إن ده problem.`
          },
          lines: [
            "[[STATUS_CODES]] جاهز في Node: اسم كل status (404 = «Not Found»)، عشان الـ title يبقى ثابت.",
            "helper بيعمل Error عادي ومعاه status و title و detail وحقول زيادة...",
            "...بإنه يلزق الحقول دي على الـ Error.",
            "الـ error handler: Express بيعرفه من إن ليه ٤ parameters.",
            "خطأ Zod يبقى 422، والـ issues بتاعته تبقى حقل errors.",
            "أي error من غير status صحيح يبقى 500.",
            "الـ 500 بس بتتسجّل، لأنها غلط عندك مش عند العميل.",
            "الـ body:",
            "لو 500: عنوان عام بس، من غير رسالة ولا stack، عشان متسرّبش تفاصيل.",
            "غير كده: title ثابت (اسم الـ status لو مفيش)، والرسالة في detail، والحقول الزيادة.",
            "الرد بالـ Content-Type الصح، و instance هو المسار اللي حصل فيه الخطأ.",
            "قفلة.",
            "الاستخدام من أي route: ارمي، والـ handler يتصرف."
          ],
          sol: R`التلاتة بيرجعوا [[Content-Type: application/problem+json; charset=utf-8]] ونفس الشكل: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]. الـ 409 فيه [[orderId]] زيادة، والـ JSON المكسور بيرجّع 400 و [[title: "Bad Request"]] والـ detail فيه رسالة الـ parser، والحقل الناقص بيرجّع 422 ومعاه [[errors]] من Zod فيها [[path: ["qty"]]].

والـ [[new Error("db password is x")]] بيرجّع [[{"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}]] بس. الرسالة الحقيقية بتظهر في console السيرفر، ومفيش [[detail]] ولا stack في الرد. لو شفت [[db password]] في الرد، يبقى الـ error اللي رميته عليه [[status]] رقم أقل من 500، أو الـ handler بيبعت [[err.message]] من غير ما يفرّق.

حاجة هتلاحظها: سطر الـ status بيقول [[422 Unprocessable Entity]] والـ title بيقول [[Unprocessable Content]]. الأول الاسم القديم اللي Node لسه بيستخدمه، والتاني اسمه في RFC 9110، والعميل بيعتمد على الرقم مش الاسم. ولو الأخطاء لسه راجعة HTML فيها [[Cannot POST]]، يبقى الـ handler متسجّل قبل الـ routes، أو ليه ٣ parameters بس.`,
          solCode: R`curl -i -X POST localhost:3000/orders/9001/cancellation      # الـ route بيعمل throw problem(409, ...)
# HTTP/1.1 409 Conflict
# Content-Type: application/problem+json; charset=utf-8
# {"type":"about:blank","title":"Conflict","status":409,"detail":"Order 9001 is already shipped","orderId":"9001","instance":"/orders/9001/cancellation"}

curl -i -X POST localhost:3000/orders -H 'Content-Type: application/json' -d '{"productId": "7",'
# HTTP/1.1 400 Bad Request
# {"type":"about:blank","title":"Bad Request","status":400,"detail":"Expected double-quoted property name in JSON at position 18 (line 1 column 19)","instance":"/orders"}

curl -i -X POST localhost:3000/orders -H 'Content-Type: application/json' -d '{"productId":"7"}'
# HTTP/1.1 422 Unprocessable Entity
# {"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"number","code":"invalid_type","path":["qty"],"message":"Invalid input: expected number, received undefined"}],"instance":"/orders"}

curl -i localhost:3000/boom                                  # الـ route بيعمل throw new Error("db password is x")
# HTTP/1.1 500 Internal Server Error
# {"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}
# والرسالة الحقيقية في console السيرفر بس`
        },
        {
          cmd: "offset pagination",
          title: "قسّم القايمة صفحات بالرقم",
          desc: R`[[?page=3&limit=20]] يعني «عدّي أول ٤٠ وهات ٢٠». سهلة، والعميل يقدر يروح لأي صفحة، وتعرض «صفحة ٣ من ١٢».

مشاكلها: القاعدة بتقرا وترمي كل الصفوف اللي قبل الصفحة، فالصفحة ١٠٠٠ بطيئة. ولو حد ضاف عنصر وانت بتقلّب، العناصر بتتزحلق: تشوف عنصر مرتين، أو يفوتك واحد.`,
          example: R`const PageQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
app.get("/products", async (req, res) => {
  const { page, limit } = PageQuery.parse(req.query);
  const [items, total] = await db.$transaction([
    db.product.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    db.product.count(),
  ]);
  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
});`,
          try: R`اعمل seed بـ ٥٠٠ منتج وجرّب [[?page=2&limit=10]] و [[?limit=500]] و [[?page=0]]. وبعدين وانت على صفحة ٢ ضيف منتج جديد واطلب صفحة ٣، ولاحظ إن أول عنصر فيها هو آخر عنصر كان في صفحة ٢.`,
          flag: "script",
          deep: {
            why: "مفيش API بيرجّع جدول كامل: ١٠٠ ألف صف في رد واحد يتعب ذاكرة السيرفر والشبكة والمتصفح كلهم. الـ pagination بتحدد أقصى حجم للرد، و offset أبسط شكل ليها.",
            how: R`[[skip]] و [[take]] في Prisma بيتحولوا لـ [[OFFSET]] و [[LIMIT]] في SQL. القاعدة مبتقدرش تقفز على طول للصف رقم ١٠٠٠٠، لازم تمشي على الـ index وتعدّ ١٠٠٠٠ صف وترميهم. فالوقت بيزيد مع رقم الصفحة. في جداول صغيرة (آلاف) مش هتحس، وفي ملايين هتحس جدًا.

الترتيب لازم يبقى ثابت وفريد: لو رتبت بـ createdAt بس، وفيه صفين ليهم نفس الوقت، ترتيبهم ممكن يتغير بين طلب والتاني، فعنصر يظهر في صفحتين. عشان كده [[id]] كـ tie-breaker.

[[count()]] على جدول كبير مكلّف هو كمان (Postgres بيعدّ فعلًا). في الجداول الكبيرة يا تكاش العدد، يا تستغنى عنه وتقول «فيه صفحة جاية» بس.

وفيه شكل تاني للرد: الـ items في الـ body، والمعلومات في headers زي [[X-Total-Count]] و [[Link]] (GitHub بيعمل كده). الاتنين مقبولين، المهم الثبات.`,
            when: "لوحات الأدمن، والجداول اللي فيها أرقام صفحات، والبيانات الصغيرة أو اللي مش بتتغير كتير.",
            mistakes: R`مفيش حد أقصى لـ limit. وترتيب مش فريد. و [[page]] بيبدأ من صفر في endpoint ومن واحد في التاني. و [[Number(req.query.page)]] من غير validation، فـ [[?page=abc]] يبقى NaN و Prisma يرمي 500.`
          },
          lines: [
            "شكل الـ query.",
            "[[coerce]] لأن كل حاجة في query string نص. أقل صفحة ١، والافتراضي ١.",
            "الحد الأقصى ١٠٠: من غيره حد يطلب [[limit=1000000]] ويوقّع السيرفر.",
            "قفلة.",
            "الـ endpoint.",
            "اقرا واتحقق (لو غلط Zod يرمي، والـ handler يرجّع 422).",
            "استعلامين في transaction واحدة: الصفحة والعدد الكلي.",
            "ترتيب ثابت (createdAt وبعده id عشان التعادل)، وعدّي اللي قبل الصفحة، وهات limit.",
            "العدد الكلي عشان «صفحة كام من كام».",
            "قفلة.",
            "الرد: العناصر ومعاها معلومات الصفحات.",
            "قفلة."
          ],
          sol: R`[[?page=2&limit=10]] بيرجّع من [[Product 490]] لـ [[Product 481]] (الأحدث الأول)، ومعاهم [[page: 2]] و [[limit: 10]] و [[total: 500]] و [[totalPages: 50]]. و [[?limit=500]] بيرجّع 422 بـ [[too_big]] و [[maximum: 100]]، و [[?page=0]] بيرجّع 422 بـ [[too_small]]. لو [[?limit=500]] رجّعلك ٥٠٠ عنصر، يبقى الـ [[max(100)]] ناقص.

وبعد ما تضيف منتج جديد، صفحة ٣ بتبدأ بـ [[Product 481]]، اللي كان آخر عنصر في صفحة ٢، و total بقى ٥٠١. المنتج الجديد دخل أول القايمة وزق كل حاجة خطوة، فالـ offset ٢٠ بقى بيشاور على عنصر شفته قبل كده. ولو اتمسح منتج بدل ما يتضاف، هيحصل العكس: عنصر يفوتك خالص ومتعرفش.

ده مش bug في كودك، ده طبيعة الـ offset، وحلّه في الدرس الجاي (cursor). ولو ماشفتش العنصر المكرر، اتأكد إن المنتج الجديد [[createdAt]] بتاعه أحدث من الباقي، وإن الترتيب [[desc]].`,
          solCode: R`# seed (مرة واحدة): 500 منتج، كل واحد بعد اللي قبله بدقيقة
# await db.product.createMany({ data: Array.from({ length: 500 }, (_, i) => ({ name: $__btProduct $__{i + 1}$__bt, createdAt: new Date(Date.UTC(2026, 0, 1) + (i + 1) * 60_000) })) });

curl -s "localhost:3000/products?page=2&limit=10"
# items: Product 490 ... Product 481 | "page":2,"limit":10,"total":500,"totalPages":50

curl -s "localhost:3000/products?limit=500"    # 422: "code":"too_big","maximum":100,"path":["limit"]
curl -s "localhost:3000/products?page=0"       # 422: "code":"too_small","minimum":1,"path":["page"]

# الزحلقة: وانت على صفحة 2، حد ضاف منتج جديد
curl -s -X POST localhost:3000/products -H 'Content-Type: application/json' -d '{"name":"NEW"}'
curl -s "localhost:3000/products?page=3&limit=10"
# أول عنصر: Product 481، وده كان آخر عنصر في صفحة 2. و "total":501`
        },
        {
          cmd: "cursor pagination",
          title: "قسّم القايمة بمؤشر مش برقم صفحة",
          desc: R`بدل «عدّي ٤٠»، العميل بيقول «هات اللي بعد العنصر ده»: [[?after=eyJ...&limit=20]]. الـ cursor نص متحوّل بـ base64url (encoded، مش مشفّر: أي حد يقدر يفكّه) فيه مكان آخر عنصر شافه (الوقت والـ id). القاعدة بتروح للمكان ده على طول بالـ index، فالصفحة الألف بنفس سرعة الأولى، ومفيش تكرار لو اتضافت عناصر.

العيب: مفيش «روح لصفحة ٧»، ومفيش عدد صفحات. مناسب للـ feeds والشات والـ infinite scroll والـ APIs العامة. والرد فيه [[links.next]] جاهز، ودي أبسط صورة من فكرة HATEOAS: الرد بيقولك تروح فين بعد كده.`,
          example: R`app.get("/messages", async (req, res) => {
  const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
  const after = typeof req.query.after === "string" ? decodeCursor(req.query.after) : null;
  const rows = await db.message.findMany({
    where: after ? { OR: [{ createdAt: { lt: after.createdAt } }, { createdAt: after.createdAt, id: { lt: after.id } }] } : {},
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
  });
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const next = rows.length > limit && last ? encodeCursor({ createdAt: last.createdAt, id: last.id }) : null;
  res.json({ items, nextCursor: next, links: { next: next && $__bt/messages?limit=$__{limit}&after=$__{next}$__bt } });
});`,
          try: R`اكتب [[encodeCursor]] و [[decodeCursor]] بـ [[Buffer.from(JSON.stringify(c)).toString("base64url")]] والعكس (ورجّع createdAt لـ Date). اعمل seed بـ ٢٠٠ رسالة، وامشي على الصفحات بـ [[links.next]] لحد ما يرجع null، وعدّ: لازم ٢٠٠ بالظبط من غير تكرار، حتى لو ضفت رسايل جديدة في النص.`,
          flag: "script",
          deep: {
            why: "offset بيبطأ مع الصفحات العميقة وبيكرر عناصر لما البيانات تتغير. الـ feeds والشات بيتغيروا كل ثانية، والمستخدم بيعمل scroll لتحت كتير. الـ cursor بيحل الاتنين.",
            how: R`الفكرة اسمها keyset pagination: بدل ما القاعدة تعدّ وترمي، بتدوّر بالـ index على «أول صف بعد المفتاح ده». لو فيه index على [[(createdAt, id)]]، ده seek واحد مهما كانت الصفحة عميقة.

الشرط في المثال ترجمة لـ [[(createdAt, id) < (lastCreatedAt, lastId)]]: يا أقدم، يا نفس الوقت و id أصغر. الـ id موجود عشان لو عنصرين ليهم نفس الوقت بالظبط ميضيعش واحد. وفي Postgres ينفع تكتبها row comparison مباشرة في SQL.

الـ cursor opaque: العميل مش المفروض يفهمه أو يبنيه. بتعمله encode بـ base64url عشان يبقى آمن في الـ URL، وعشان تقدر تغيّر محتواه بعدين من غير ما تكسر حد. ولو عايز تمنع التلاعب بيه، وقّعه بـ HMAC.

Prisma عنده option جاهز [[cursor]] (مع [[skip: 1]])، بس بيشتغل على حقل فريد واحد. الشرط اليدوي أوضح لما الترتيب بحقلين.

HATEOAS (Hypermedia as the Engine of Application State) معناها إن الرد نفسه فيه لينكات للخطوات الجاية: [[next]] و [[prev]] و [[self]]، أو حتى [[cancel]] على طلب لسه ممكن يتلغي. REST «الكامل» بيطلبها، وفي الواقع أغلب الـ APIs بتستخدمها في الـ pagination بس، في الـ body أو في [[Link]] header (RFC 8288) زي GitHub.`,
            when: "أي قايمة بتكبر من غير حد، أو بتتحدّث باستمرار، أو معروضة كـ infinite scroll. و offset للوحات الأدمن اللي محتاجة أرقام صفحات.",
            mistakes: R`ترتيب بحقل مش فريد من غير tie-breaker. والترتيب في الاستعلام مختلف عن اللي الـ cursor اتعمل بيه. و cursor عبارة عن id صريح والعميل بيبني أرقام بنفسه. ونسيان الـ index على [[(createdAt, id)]] فالميزة كلها تروح. وتفتكر إنك تقدر تحسب «صفحة كام» بالـ cursor.`
          },
          lines: [
            "الـ endpoint.",
            "العدد بين ١ و ١٠٠: من غير الحد الأدنى، limit سالب كان هيعدّي لـ take.",
            "لو فيه cursor فكّه، ولو مفيش يبقى أول صفحة.",
            "هات الصفوف...",
            "...اللي بعد آخر عنصر شافه: وقت أقدم، أو نفس الوقت و id أصغر.",
            "نفس الترتيب اللي الـ cursor اتعمل بيه بالظبط.",
            "هات واحد زيادة: لو جه، يبقى فيه صفحة كمان.",
            "قفلة.",
            "رجّع limit بس، والزيادة كانت للمعرفة.",
            "آخر عنصر هيترجع.",
            "الـ cursor الجاي من آخر عنصر، أو null لو مفيش صفحات تانية.",
            "الرد، ومعاه لينك الصفحة الجاية جاهز (HATEOAS على خفيف).",
            "قفلة."
          ],
          sol: R`العدد النهائي ٢٠٠ بالظبط و ٢٠٠ id مختلف، حتى مع رسالتين جداد اتضافوا في النص (في الحل: ١٤ صفحة بـ [[limit=15]]). الرسايل الجديدة مبتظهرش في المشي ده لأنها أحدث من أول صفحة، والـ cursor بيكمّل من «بعد آخر عنصر شفته» مهما اتضاف قبله. ولو فكّيت أي cursor بـ [[Buffer.from(c, "base64url").toString()]] هتلاقي JSON فيه [[createdAt]] و [[id]].

عشان تختبر الـ tie-breaker بجد، خلي كذا رسالة في الـ seed ليهم نفس [[createdAt]] بالظبط (الحل بيدّي كل ٤ رسايل نفس الثانية) واستخدم limit مش من مضاعفات ٤. لو شلت شرط [[id: { lt: after.id }]] وسبت [[createdAt: { lt }]] بس، العدد هيطلع أقل من ٢٠٠: الرسايل اللي ليها نفس وقت آخر عنصر في الصفحة بتضيع.

وفي [[decodeCursor]] متسيبش [[JSON.parse]] يرمي لوحده: cursor بايظ ([[?after=garbage]]) لازم يرجّع 400 مش 500. أما رجوع [[createdAt]] لـ Date، فالأهم إنك تفحص إنه تاريخ صحيح. ولو المشي مبيخلصش أبدًا، يبقى [[links.next]] بيرجع حتى في آخر صفحة: اتأكد إنك طلبت [[limit + 1]] وبتقارن بـ [[rows.length > limit]].`,
          solCode: R`// cursor.ts
type Cursor = { createdAt: Date; id: string };

function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}
function decodeCursor(s: string): Cursor {
  try {
    const { createdAt, id } = JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
    const date = new Date(createdAt);
    if (typeof id !== "string" || Number.isNaN(date.getTime())) throw new Error();
    return { createdAt: date, id };
  } catch {
    throw problem(400, "Bad Request", "Invalid cursor");
  }
}

// walk.ts: امشي على كل الصفحات بـ links.next وعدّ
const BASE = process.env.BASE ?? "http://localhost:3000";
const seen = new Set<string>();
let url: string | null = "/messages?limit=15";
let pages = 0;
let count = 0;
while (url) {
  const body: any = await (await fetch(BASE + url)).json();
  for (const m of body.items) seen.add(m.id);
  count += body.items.length;
  pages++;
  if (pages === 3) {
    // رسايل جديدة وصلت واحنا في النص
    for (const text of ["new A", "new B"]) {
      await fetch(BASE + "/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    }
  }
  url = body.links.next;
}
console.log({ pages, count, unique: seen.size }); // { pages: 14, count: 200, unique: 200 }`
        },
        {
          cmd: "filter و sort",
          title: "فلترة وترتيب من الـ query من غير ثغرات",
          desc: R`الفلترة في query string: [[?status=paid&minTotal=100&q=ahmed&sort=-createdAt]]. العلامة [[-]] قبل الحقل معناها تنازلي. والقاعدة الذهبية: whitelist. كل فلتر وكل حقل ترتيب مسموح بيه متعرّف في schema، وأي حاجة تانية مرفوضة.

ومهما كانت الفلاتر، شرط الملكية ([[userId]]) ثابت ومش جاي من العميل.`,
          example: R`const ListQuery = z.object({
  status: z.enum(["pending", "paid", "shipped"]).optional(),
  minTotal: z.coerce.number().nonnegative().optional(),
  q: z.string().trim().min(2).max(100).optional(),
  sort: z.enum(["createdAt", "-createdAt", "total", "-total"]).default("-createdAt"),
});
app.get("/orders", requireAuth, async (req, res) => {
  const { status, minTotal, q, sort } = ListQuery.parse(req.query);
  const field = sort.replace("-", "") as "createdAt" | "total";
  const items = await db.order.findMany({
    where: { userId: req.user.id, status, total: minTotal === undefined ? undefined : { gte: minTotal }, customerName: q ? { contains: q, mode: "insensitive" } : undefined },
    orderBy: [{ [field]: sort.startsWith("-") ? "desc" : "asc" }, { id: "asc" }], take: 50,
  });
  res.json({ items });
});`,
          try: R`جرّب [[?sort=-total]] و [[?sort=password]] و [[?status=deleted]]: الأول يشتغل، والتانيين 422. وبعدين فكّر: لو [[sort]] كان [[z.string()]] على جدول المستخدمين، و حد بعت [[?sort=passwordHash]]، هيعرف إيه من ترتيب النتايج؟`,
          flag: "script",
          deep: {
            why: "كل عميل عايز الداتا بشكل مختلف. من غير فلاتر في السيرفر، الفرونت بيسحب كل حاجة ويفلتر عنده، وده بطيء وبيكشف بيانات مش المفروض توصله.",
            how: R`الـ query string كله نصوص: [[?minTotal=100]] بيوصل كـ [[req.query.minTotal === "100"]]. و [[?status=a&status=b]] بيوصل array. وممكن [[?filter[x]=1]] يوصل object حسب الـ query parser. عشان كده Zod قبل أي استخدام: بيحوّل الأنواع وبيرفض الأشكال الغريبة.

أشكال مشهورة للفلاتر: حقول مباشرة ([[?status=paid]])، و range بـ prefix أو suffix ([[?minTotal=]] و [[?createdAfter=]])، أو صيغة زي [[?total[gte]=100]] (Stripe بيعمل كده). اختار شكل واحد وامشي عليه في كل الـ API.

الترتيب: [[sort=-createdAt,total]] شكل مشهور (JSON:API). ولازم whitelist لسببين: الترتيب بحقل من غير index على جدول كبير بيعمل full scan، والترتيب بحقل سري (زي passwordHash أو resetToken) بيكشف معلومات: لو قدرت ترتّب المستخدمين بالـ hash وتشوف مين قبل مين، تقدر تستنتج حروف منه بالتدريج (sort oracle).

البحث النصي بـ [[contains]] و [[insensitive]] في Postgres بيتحول لـ ILIKE، ومبيستخدمش index عادي. لو الجدول كبير محتاج trigram index أو full-text search (التفاصيل في تاب «PostgreSQL»).`,
            when: "أي endpoint بيرجّع قايمة. ابدأ بالفلاتر اللي الواجهة محتاجاها فعلًا، مش كل حقل في الجدول.",
            mistakes: R`تبعت [[req.query]] زي ما هو لـ [[where]]: العميل يبعت [[?userId=5]] ويشوف طلبات حد تاني، أو يبعت object فيه operators. وترتيب بأي حقل. وفلتر الملكية يبقى اختياري. وبحث من غير حد أدنى للطول، فـ [[?q=a]] يرجّع نص الجدول.`
          },
          lines: [
            "كل الفلاتر المسموحة في مكان واحد.",
            "الحالة من قايمة ثابتة بس.",
            "أقل مبلغ: رقم مش سالب.",
            "بحث نصي: من ٢ لـ ١٠٠ حرف.",
            "الترتيب من ٤ اختيارات بس، والافتراضي الأحدث الأول.",
            "قفلة.",
            "الـ endpoint، ومحتاج تسجيل دخول.",
            "اقرا واتحقق. أي فلتر مش في الـ schema بيتشال.",
            "اسم الحقل من غير العلامة.",
            "الاستعلام.",
            "شرط الملكية ثابت، والفلاتر اللي مش مبعوتة undefined و Prisma بيتجاهلها.",
            "الترتيب المطلوب، و id كـ tie-breaker، وحد ٥٠ (أو pagination من الدرسين اللي فاتوا).",
            "قفلة.",
            "الرد.",
            "قفلة."
          ],
          sol: R`[[?sort=-total]] بيرجّع طلباتك من الأكبر للأصغر ([[900]] ثم [[120]] ثم [[40]]). و [[?sort=password]] بيرجّع 422 بـ [[invalid_value]] والقيم المسموحة، وكذلك [[?status=deleted]]. وجرّب كمان [[?userId=u2]]: هترجع طلباتك انت بس، لأن [[z.object]] بتشيل أي حقل مش متعرّف، وشرط الملكية ثابت من التوكن.

إجابة سؤال التفكير: هيعرف الـ hash نفسه، حرف حرف. الترتيب بيكشف مقارنة: لو المهاجم عمل حسابات بباسوردات يعرفها (فيعرف الـ hash بتاعها)، وطلب [[?sort=passwordHash]]، مكان الضحية بين حساباته بيقوله الـ hash بتاعها أكبر ولا أصغر من كل واحد. ولو كرر بحسابات جديدة، بيضيّق المدى زي binary search لحد ما يطلّع الـ hash، وبعدها يعمل brute force عليه offline. ونفس الكلام على [[resetToken]] وأي حقل سري. ده اسمه sort oracle: ترتيب شكله «بريء» بيتحول لتسريب.

والإجابة القوية في الانترفيو: الـ whitelist بتحمي من حاجتين، التسريب ده، والترتيب بعمود من غير index على جدول كبير (full scan). ومتعتمدش على «مش هنرجّع الحقل ده في الرد»: الترتيب بيكشفه من غير ما يظهر.`,
          solCode: R`curl -s "localhost:3000/orders?sort=-total" -H "Authorization: Bearer $TOKEN"
# {"items":[{"total":900,...},{"total":120,...},{"total":40,...}]}

curl -s "localhost:3000/orders?sort=password" -H "Authorization: Bearer $TOKEN"
# 422: "code":"invalid_value","values":["createdAt","-createdAt","total","-total"],"path":["sort"]

curl -s "localhost:3000/orders?status=deleted" -H "Authorization: Bearer $TOKEN"
# 422: "code":"invalid_value","values":["pending","paid","shipped"],"path":["status"]

curl -s "localhost:3000/orders?userId=u2" -H "Authorization: Bearer $TOKEN"
# 200 بطلباتك انت بس: z.object شالت userId، والشرط الثابت هو اللي اتطبق`
        }
      ]
    },
    {
      t: "التطور والكاش والتكرار",
      l: 1,
      n: "API بيتغيّر من غير ما يكسر العملاء، وبيوفّر طلبات، ومبينفّذش نفس العملية مرتين",
      items: [
        {
          cmd: "versioning",
          title: "غيّر الـ API من غير ما تكسر اللي شغالين عليه",
          desc: R`التغيير اللي بيضيف (حقل جديد، أو endpoint جديد، أو فلتر اختياري) مش محتاج version. الـ version الجديد بس للتغيير اللي بيكسر: حذف حقل، أو تغيير اسمه أو نوعه، أو تغيير معناه.

أشهر طريقة: الـ version في الـ URL ([[/v1]] و [[/v2]]). وفيه اللي بيحطه في header (Stripe بيبعت تاريخ في [[Stripe-Version]]). ولما تقفل version قديم، بتعلن قبلها بـ headers اسمها [[Deprecation]] و [[Sunset]].`,
          example: R`const v1 = express.Router();
const v2 = express.Router();
v1.get("/users/:id", async (req, res) => {
  const u = await getUser(req.params.id);
  res.set({ Deprecation: "@1767225600", Sunset: "Wed, 30 Jun 2027 23:59:59 GMT", Link: '</v2/users>; rel="successor-version"' });
  res.json({ id: u.id, name: $__bt$__{u.firstName} $__{u.lastName}$__bt });
});
v2.get("/users/:id", async (req, res) => {
  const u = await getUser(req.params.id);
  res.json({ id: u.id, firstName: u.firstName, lastName: u.lastName });
});
app.use("/v1", v1);
app.use("/v2", v2);`,
          try: R`اعمل الـ routers دول، واطلب [[curl -i localhost:3000/v1/users/1]] وشوف الـ headers. وبعدين فكّر في آخر ٣ تغييرات عملتها في API عندك: أنهي فيهم كان بيكسر وكان محتاج version؟`,
          flag: "script",
          deep: {
            why: "الموبايل أب اللي نزل من ٦ شهور لسه على تليفونات ناس مبتحدّثش، وعميل B2B مربوط بالـ API من سنة. لو غيّرت شكل الرد، تطبيقاتهم بتقع. الـ versioning بيخليك تتطور والقديم يفضل شغال لفترة معلنة.",
            how: R`الطرق:

في الـ URL ([[/v1/orders]]): واضحة، وسهلة في الـ logs والكاش والـ routing في Nginx. عيبها إن الـ resource نفسه ليه عنوانين. ده الأشهر وأبسط اختيار.

في header ([[Accept: application/vnd.myapp.v2+json]] أو [[Api-Version: 2]]): الـ URL ثابت، بس أصعب تجربه من المتصفح، ولازم [[Vary]] عشان الكاش.

بالتاريخ (زي Stripe): كل حساب مربوط بالـ version اللي كان موجود لما اتعمل، والـ header بيغيّره. السيرفر بيحوّل الرد خطوة خطوة من الأحدث للقديم. قوية جدًا بس محتاجة بنية.

التغيير بيكسر ولا لأ؟ بيكسر: حذف أو إعادة تسمية حقل، أو تغيير نوعه ([[id]] من رقم لنص)، أو حقل اختياري بقى مطلوب في الطلب، أو status code اتغير، أو قيمة enum جديدة لو العملاء بيعملوا switch عليها. مبيكسرش: حقل جديد في الرد، أو endpoint جديد، أو حقل اختياري جديد في الطلب.

الإعلان: [[Deprecation]] (RFC 9745) قيمته [[@]] وبعدها unix timestamp، ومعناه «ده deprecated من التاريخ ده». و [[Sunset]] (RFC 8594) تاريخ HTTP عادي: «هيبطل يشتغل من اليوم ده». وبعد الـ sunset يرجّع 410 Gone. ومع الـ headers: إيميل للعملاء، وتسجيل مين لسه بيكلم v1 عشان تعرف تتواصل معاه.`,
            when: "من أول API عام: حط [[/v1]] من البداية حتى لو مش ناوي تعمل v2. إضافتها بعدين أصعب بكتير.",
            mistakes: R`version جديد لكل تغيير صغير (هتصون ٥ نسخ). وتكسر v1 بـ «تغيير بسيط». وتنسخ الكود كله في v2 بدل ما v1 يبقى adapter رفيع فوق نفس الـ service. وتقفل version من غير Sunset وإيميل وفترة سماح.`
          },
          lines: [
            "router للـ version القديم.",
            "router للجديد.",
            "الـ endpoint في v1.",
            "نفس مصدر البيانات للاتنين.",
            "v1 متعلن إنه deprecated من أول 2026، وهيتقفل آخر يونيو 2027، واللينك بيشاور على البديل.",
            "v1 بيرجّع الاسم حقل واحد زي ما العملاء القدام متعودين.",
            "قفلة.",
            "نفس الـ endpoint في v2.",
            "نفس المصدر.",
            "v2 بيرجّع الاسم حقلين: تغيير بيكسر، عشان كده version جديد.",
            "قفلة.",
            "ركّب v1 على المسار بتاعه.",
            "و v2."
          ],
          sol: R`في [[curl -i localhost:3000/v1/users/1]] هتلاقي ٣ headers جداد: [[Deprecation: @1767225600]] (يعني deprecated من ١ يناير ٢٠٢٦، والـ [[@]] قبل unix timestamp هو شكل RFC 9745)، و [[Sunset: Wed, 30 Jun 2027 23:59:59 GMT]]، و [[Link: </v2/users>; rel="successor-version"]]. والـ body [[{"id":"1","name":"Ali Hassan"}]]. و v2 من غير الـ headers دي وبيرجّع [[firstName]] و [[lastName]].

إجابة التفكير، قسّم التغييرات كده: بيكسر = حذف حقل أو تغيير اسمه، أو تغيير نوعه ([[price]] من رقم لـ string، أو [[id]] من رقم لـ UUID)، أو حقل بقى مطلوب في الطلب، أو status code اتغير (200 بقى 201)، أو قيمة enum جديدة والموبايل بيعمل switch عليها، أو تغيير في المعنى (السعر بقى بالقرش بدل الجنيه). مش بيكسر = حقل جديد في الرد، أو endpoint جديد، أو فلتر اختياري جديد.

الغلط الشائع إنك تعتبر «حقل بقى null أحيانًا» أو «ترتيب القايمة اتغير» مش كسر: لو عميل كان بيعتمد عليه، اتكسر. والأسلم قبل أي تغيير تسأل «لو التطبيق القديم فضل زي ما هو، هيشتغل؟». وأغلب التغييرات البيكسر ينفع تتعمل من غير version: ضيف الحقل الجديد جنب القديم، واعلن إن القديم deprecated، وشيله بعد ما محدش يستخدمه.`,
          solCode: R`curl -i localhost:3000/v1/users/1
# HTTP/1.1 200 OK
# Deprecation: @1767225600
# Sunset: Wed, 30 Jun 2027 23:59:59 GMT
# Link: </v2/users>; rel="successor-version"
# Content-Type: application/json; charset=utf-8
#
# {"id":"1","name":"Ali Hassan"}

curl -i localhost:3000/v2/users/1      # من غير Deprecation ولا Sunset
# {"id":"1","firstName":"Ali","lastName":"Hassan"}

date -u -d @1767225600                 # Thu Jan  1 00:00:00 UTC 2026 (على الماك: date -u -r 1767225600)`
        },
        {
          cmd: "ETag و Cache-Control",
          title: "خلّي المتصفح والـ CDN يوفّروا طلبات",
          desc: R`[[Cache-Control]] بيقول مين يكاش الرد وقد إيه: [[public, max-age=60]] أي حد يكاشه دقيقة، و [[private, no-cache]] المتصفح بس، وبشرط يتأكد من السيرفر قبل ما يستخدمه، و [[no-store]] ممنوع يتخزن خالص.

[[ETag]] بصمة للنسخة. المتصفح بيبعتها في [[If-None-Match]]، ولو متغيرتش السيرفر يرد [[304 Not Modified]] من غير body. الطلب لسه بيحصل، بس الرد صغير.`,
          example: R`app.get("/products/:id", async (req, res) => {
  const p = await db.product.findUnique({ where: { id: req.params.id } });
  if (!p) return res.status(404).end();
  res.set({ ETag: $__bt"$__{p.id}-$__{p.version}"$__bt, "Cache-Control": "public, max-age=60, stale-while-revalidate=300" });
  if (req.fresh) return res.status(304).end();
  res.json(p);
});
app.get("/me", requireAuth, (req, res) => {
  res.set("Cache-Control", "private, no-cache");
  res.json(req.user);
});
app.get("/me/payment-methods", requireAuth, async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(await listCards(req.user.id));
});`,
          try: R`اطلب المنتج بـ [[curl -i]] وخد الـ ETag، وبعدين اطلبه تاني ومعاه [[-H 'If-None-Match: "..."']] بنفس القيمة: لازم 304 من غير body. عدّل المنتج (زوّد version) وكرر: 200 تاني.`,
          flag: "script",
          deep: {
            why: "أسرع طلب هو اللي محصلش، وتاني أسرع واحد رده صغير. الكاش بيقلل الضغط على السيرفر والقاعدة، وبيخلي الموبايل على شبكة بطيئة يحس إن الأب سريع. والغلط فيه أخطر: بيانات مستخدم تتكاش في CDN وتظهر لمستخدم تاني.",
            how: R`أهم الـ directives في Cache-Control:

[[max-age=N]]: الرد fresh لمدة N ثانية، والمتصفح بيستخدمه من غير ما يسأل. [[s-maxage]]: نفس الفكرة للكاش المشترك بس (CDN)، فتقدر تخلي المتصفح دقيقة والـ CDN عشرة. [[public]]: أي كاش يخزّنه. [[private]]: المتصفح بس. [[no-cache]]: خزّنه بس اسأل السيرفر قبل كل استخدام (مش معناها «متكاشش»!). [[no-store]]: متخزّنش خالص. [[stale-while-revalidate=N]]: بعد ما يبقى قديم، استخدمه N ثانية كمان وانت بتجيب الجديد في الخلفية.

الـ ETag: السيرفر بيرجّع بصمة، والمرة الجاية المتصفح بيبعت [[If-None-Match]] بيها. لو لسه نفس النسخة: 304 من غير body. و [[req.fresh]] في Express بيعمل المقارنة دي صح (بيفهم أكتر من ETag و [[W/]]).

Express بيعمل ETag ضعيف ([[W/"..."]]) تلقائي لأي [[res.json]] من hash الـ body، وبيرد 304 لوحده لو الطلب fresh. بس ده بيوفّر الشبكة بس: القاعدة اتسألت والـ JSON اتعمل. الـ ETag من [[version]] أو [[updatedAt]] زي المثال بيخليك ترد 304 قبل ما تعمل الـ JSON، ولو خزّنت الـ version في Redis، قبل حتى ما تكلّم القاعدة.

strong ولا weak: [[W/]] معناها «نفس المعنى» مش «نفس البايتات»، وده كفاية للـ GET. الـ If-Match (الدرس الجاي) محتاج مقارنة strong.

وخلي بالك من [[Vary]]: لو الرد بيختلف حسب header (زي [[Accept-Language]])، لازم [[Vary: Accept-Language]] عشان الكاش ميرجّعش نسخة لغة لحد طالب لغة تانية. وكاش الملفات الثابتة في تاب «Nginx».`,
            when: "بيانات عامة بتتقري كتير (منتجات، ومقالات، وإعدادات): public و max-age قصير و ETag. بيانات المستخدم: private, no-cache. أي حاجة حساسة (كروت، وتوكنات، وبيانات صحية): no-store.",
            mistakes: R`[[public]] على رد فيه بيانات مستخدم ورا CDN، فالـ CDN يدّي بيانات واحد لكل الناس (حصلت لشركات كبيرة). وتفتكر [[no-cache]] معناها متكاشش. و max-age طويل على API بيتغير، فالتعديل ميبانش لساعات ومفيش طريقة تمسحه من متصفحات الناس. و ETag بيتحسب من حاجة مش بتتغير مع التعديل.`
          },
          lines: [
            "منتج عام.",
            "هاته.",
            "مش موجود: 404.",
            "ETag من الـ id ورقم النسخة (بيزيد مع كل تعديل). وأي حد يكاشه دقيقة، وبعدها ٥ دقايق يقدر يستخدم القديم وهو بيجيب الجديد في الخلفية.",
            "[[req.fresh]] بيقارن If-None-Match بالـ ETag: لو زي بعض رد 304 من غير body.",
            "اتغير أو أول مرة: الرد كامل.",
            "قفلة.",
            "بيانات المستخدم نفسه.",
            "private: المتصفح بس (مش CDN). و no-cache: يتأكد كل مرة، و Express بيحط ETag تلقائي للـ json.",
            "الرد.",
            "قفلة.",
            "بيانات حساسة.",
            "no-store: متتخزنش في أي مكان، ولا حتى على ديسك المتصفح.",
            "الرد.",
            "قفلة."
          ],
          sol: R`أول طلب: [[200 OK]] و [[ETag: "1-1"]] و [[Cache-Control: public, max-age=60, stale-while-revalidate=300]] والمنتج في الـ body. الطلب التاني بـ [[If-None-Match: "1-1"]]: [[304 Not Modified]] بنفس الـ ETag ومن غير body. بعد التعديل الـ version بقى ٢، ونفس الطلب بالـ ETag القديم بيرجّع 200 تاني ومعاه [[ETag: "1-2"]] والبيانات الجديدة.

أشهر سبب إنك متاخدش 304: علامات التنصيص. الـ ETag قيمته [["1-1"]] بالتنصيص، و [[-H 'If-None-Match: 1-2']] من غيرها بيرجّع 200. استخدم علامة تنصيص مفردة حوالين الـ header كله زي الـ try، عشان الـ shell ميشيلش الـ double quotes. أما [[W/"1-2"]] فبيرجّع 304، لأن مقارنة If-None-Match weak.

وسبب تاني: لو بعت [[Cache-Control: no-cache]] مع الطلب (زي الـ hard reload في المتصفح)، [[req.fresh]] بيرجّع false وبتاخد 200 حتى لو الـ ETag صح. وفي المتصفح نفسه، الـ DevTools بيعرض الـ 304 ساعات كـ 200 «from cache»، فجرّب بـ curl الأول.`,
          solCode: R`curl -i localhost:3000/products/1
# HTTP/1.1 200 OK
# ETag: "1-1"
# Cache-Control: public, max-age=60, stale-while-revalidate=300
# {"id":"1","name":"Mug","price":150,"version":1,...}

curl -i localhost:3000/products/1 -H 'If-None-Match: "1-1"'
# HTTP/1.1 304 Not Modified
# ETag: "1-1"                           ← ومفيش body

# عدّل المنتج (الـ version بقى 2)، وابعت الـ ETag القديم
curl -i localhost:3000/products/1 -H 'If-None-Match: "1-1"'
# HTTP/1.1 200 OK
# ETag: "1-2"

curl -i localhost:3000/products/1 -H 'If-None-Match: 1-2'       # من غير علامات تنصيص: 200 مش 304
curl -i localhost:3000/products/1 -H 'If-None-Match: W/"1-2"'   # 304: المقارنة هنا weak`
        },
        {
          cmd: "If-Match و 412",
          title: "امنع تعديلين في نفس الوقت من إن واحد يمسح التاني",
          desc: R`اتنين فتحوا نفس المستند، الأول حفظ، والتاني حفظ بعده بنسخة قديمة، فتعديل الأول راح (lost update). الحل: optimistic concurrency. العميل بيبعت النسخة اللي عدّل عليها في [[If-Match]]، والسيرفر يعدّل بشرط إن النسخة لسه هي هي، ولو اتغيرت يرد [[412 Precondition Failed]].

ولو عايز تجبر كل العملاء يبعتوها، ارفض الطلب اللي من غيرها بـ [[428 Precondition Required]].`,
          example: R`app.patch("/documents/:id", requireAuth, async (req, res) => {
  const ifMatch = req.get("if-match");
  if (!ifMatch) return res.status(428).json({ title: "If-Match header required" });
  const version = Number(ifMatch.replaceAll('"', ""));
  const { count } = await db.document.updateMany({
    where: { id: req.params.id, ownerId: req.user.id, version },
    data: { ...DocPatch.parse(req.body), version: { increment: 1 } },
  });
  if (count === 0) {
    const exists = await db.document.count({ where: { id: req.params.id, ownerId: req.user.id } });
    return res.status(exists ? 412 : 404).end();
  }
  res.set("ETag", $__bt"$__{version + 1}"$__bt).status(204).end();
});`,
          try: R`ابعت طلبين PATCH بنفس [[If-Match: "3"]]: الأول 204 والتاني 412. وبعدين في الواجهة: لما يجي 412، هات النسخة الجديدة واعرض للمستخدم «حد عدّل، راجع التغييرات».`,
          flag: "script",
          deep: {
            why: "أي حاجة بيعدّلها أكتر من حد (مستندات، وإعدادات شركة، ومخزون، وجدول مواعيد) ممكن تحصل فيها الكتابة فوق بعض من غير ما حد يحس. البيانات بتضيع بهدوء، ومحدش يعرف إمتى ولا إزاي.",
            how: R`الفكرة compare-and-set: [[UPDATE ... WHERE id = ? AND version = ?]]. القاعدة بتعمل الفحص والكتابة في خطوة واحدة atomic، فمفيش لحظة بين «اتأكدت» و «كتبت» حد يدخل فيها. لو رجع 0 صفوف، يبقى حد سبقك.

ليه [[updateMany]] مش [[update]]؟ من Prisma 5 [[update]] بيقبل شرط زي [[{ id, version }]]، بس لو ملقاش صف بيرمي error (P2025) وتضطر تمسكه. و [[updateMany]] بيقبل أي شرط وبيرجّع [[count]] من غير error، فتعرف إن حد سبقك بـ [[count === 0]] على طول. والـ schema فيها [[version Int @default(1)]].

optimistic مقابل pessimistic: pessimistic بيقفل الصف ([[SELECT ... FOR UPDATE]]) طول التعديل، وده مناسب جوه transaction قصيرة على السيرفر، مش لمستخدم فاتح form ربع ساعة. optimistic مبيقفلش حاجة، وبيفترض إن التعارض نادر، ولما يحصل يرفض.

الـ ETag في الـ GET هو نفسه الـ version، فالعميل بياخده من الـ GET ويبعته في If-Match مع الـ PATCH. ولازم مقارنة strong (من غير [[W/]]). ونفس الفكرة ممكن من غير headers: حقل [[version]] في الـ body. الـ headers أنضف لأنها standard والأدوات فاهماها.`,
            when: "أي resource بيعدّله أكتر من شخص أو جهاز: مستندات، وإعدادات، وكميات مخزون، وحجوزات.",
            mistakes: R`تقرا الـ version، وتقارن في الكود، وبعدين تكتب (race condition بين الخطوتين). و [[updatedAt]] بدقة ثانية كـ version، فتعديلين في نفس الثانية يعدّوا. و 409 بدل 412 (مقبول، بس 412 هو المعنى الدقيق مع If-Match). ومتزوّدش الـ version في نفس الـ UPDATE.`
          },
          lines: [
            "تعديل مستند.",
            "النسخة اللي العميل عدّل عليها.",
            "مفيش If-Match: 428، لازم تبعتها.",
            "شيل علامات التنصيص من الـ ETag وخده رقم.",
            "عدّل...",
            "...بشرط الـ id، وإنه بتاعه، وإن النسخة لسه زي ما هي.",
            "التعديل، وزوّد النسخة واحد في نفس الأمر.",
            "قفلة.",
            "متعدّلش ولا صف:",
            "شوف المستند موجود أصلًا؟",
            "موجود يبقى النسخة اتغيرت: 412. مش موجود: 404.",
            "قفلة.",
            "نجح: الـ ETag الجديد عشان العميل يكمّل عليه.",
            "قفلة."
          ],
          sol: R`الطلبين بنفس [[If-Match: "3"]]: الأول [[204]] ومعاه [[ETag: "4"]]، والتاني [[412]]، لأن الـ version بقى ٤ وشرط [[version: 3]] ملقاش صف. ومن غير If-Match خالص [[428]]، وبتوكن مستخدم تاني [[404]] مش 412 (مش هنقوله إن المستند موجود).

في الواجهة: أول ما يجي 412 متعيدش الطلب بالـ ETag الجديد أوتوماتيك، ده بيكتب فوق تعديل الشخص التاني، وهو بالظبط اللي بنمنعه. هات النسخة الجديدة، وسيب تعديلات المستخدم في الـ state، واعرضهم جنب بعض عشان هو يقرر. في الحل التابة الأولى بتحفظ وتاخد [[{ ok: true, etag: '"5"' }]]، والتانية بتاخد [[false]] والرسالة ومحتوى المستند الجديد ([[edit from A]]) والـ ETag الجديد.

لو [[res.headers.get("ETag")]] رجّع null في المتصفح والـ API على origin تاني، ده CORS: لازم السيرفر يبعت [[Access-Control-Expose-Headers: ETag]]، وكمان [[If-Match]] لازم يبقى في [[Access-Control-Allow-Headers]]. ولو التاني رجّع 204 بدل 412، يبقى الـ version مش جوه شرط الـ [[where]]، أو مش بيزيد في نفس الـ update.`,
          solCode: R`// الواجهة: احفظ بالنسخة اللي عدّلت عليها، ولو 412 هات الجديدة ووري المستخدم
type Doc = { id: string; title: string; body: string };
const BASE = process.env.BASE ?? "http://localhost:3000";
const auth = { Authorization: "Bearer YOUR_TOKEN" };

async function loadDoc(id: string) {
  const res = await fetch($__bt$__{BASE}/documents/$__{id}$__bt, { headers: auth });
  return { doc: (await res.json()) as Doc, etag: res.headers.get("ETag")! };
}

async function saveDoc(id: string, etag: string, changes: Partial<Doc>) {
  const res = await fetch($__bt$__{BASE}/documents/$__{id}$__bt, {
    method: "PATCH",
    headers: { ...auth, "Content-Type": "application/json", "If-Match": etag },
    body: JSON.stringify(changes),
  });
  if (res.status === 412) {
    const latest = await loadDoc(id);
    return { ok: false as const, message: "حد عدّل المستند، راجع التغييرات", latest, mine: changes };
  }
  if (!res.ok) throw new Error($__btsave failed: $__{res.status}$__bt);
  return { ok: true as const, etag: res.headers.get("ETag")! };
}

// تابتين فاتحين نفس المستند بنفس النسخة
const tabA = await loadDoc("1");
const tabB = await loadDoc("1");
console.log(await saveDoc("1", tabA.etag, { body: "edit from A" }));
const r = await saveDoc("1", tabB.etag, { body: "edit from B" });
console.log(r.ok, r.ok ? "" : r.message, r.ok ? "" : r.latest.doc.body, r.ok ? "" : r.latest.etag);`
        },
        {
          cmd: "Idempotency-Key",
          title: "خلّي POST يتعاد من غير ما يدفع مرتين",
          desc: R`العميل بيولّد UUID لكل عملية ويبعته في header اسمه [[Idempotency-Key]]. السيرفر بيسجّل المفتاح ده مع الرد. لو نفس الطلب اتكرر (الشبكة قطعت والعميل عاد)، بيرجّع الرد المتسجّل من غير ما ينفّذ تاني.

ده اللي Stripe بيعمله في كل POST، وفيه draft في IETF بنفس الاسم: [[400]] لو المفتاح مطلوب ومش مبعوت، و [[409]] لو الطلب الأصلي لسه شغال، و [[422]] لو نفس المفتاح جه مع body مختلف. والاستخدام: [[app.post("/payments", requireAuth, (req, res) => withIdempotency(req, res, () => createPayment(req)))]].`,
          example: R`export async function withIdempotency(req: Request, res: Response, run: () => Promise<{ status: number; body: unknown }>) {
  const key = req.get("idempotency-key");
  if (!key) return res.status(400).json({ title: "Idempotency-Key header required" });
  const id = $__btidem:$__{req.user.id}:$__{req.path}:$__{key}$__bt;
  const hash = createHash("sha256").update(JSON.stringify(req.body)).digest("hex");
  if (!(await redis.set(id, JSON.stringify({ hash }), "EX", 86400, "NX"))) {
    const saved = JSON.parse((await redis.get(id)) ?? "{}");
    if (saved.hash !== hash) return res.status(422).json({ title: "Key reused with a different body" });
    if (!saved.body) return res.status(409).json({ title: "Original request still in progress" });
    return res.status(saved.status).json(saved.body);
  }
  const result = await run().catch(async (err) => { await redis.del(id); throw err; });
  await redis.set(id, JSON.stringify({ hash, ...result }), "EX", 86400);
  res.status(result.status).json(result.body);
}`,
          try: R`اعمل [[POST /payments]] بيها، وابعت نفس الطلب ٣ مرات بنفس المفتاح (خزّن [[$(uuidgen)]] في متغير مرة واحدة). لازم دفعة واحدة في القاعدة و ٣ ردود متطابقة. وبعدين غيّر المبلغ بنفس المفتاح: 422.`,
          flag: "script",
          deep: {
            why: "العميل بيبعت «ادفع ٥٠٠ جنيه»، والشبكة قطعت قبل الرد. هو مش عارف الدفعة حصلت ولا لأ. لو معادش، ممكن الدفعة متحصلش. ولو عاد، ممكن تتدفع مرتين. الـ Idempotency-Key بيحل المعضلة: عيد براحتك، والتنفيذ مرة واحدة.",
            how: R`العميل بيولّد المفتاح مرة واحدة لكل «نية» (ضغطة زرار الدفع)، مش لكل محاولة. كل الـ retries لنفس العملية بنفس المفتاح. و [[crypto.randomUUID()]] موجودة في المتصفح و Node.

السيرفر فيه ٣ حالات: مفتاح جديد (نفّذ وخزّن)، ومفتاح خلص (رجّع المتخزّن)، ومفتاح لسه شغال (409 عشان ميتنفّذش مرتين بالتوازي). الحجز بـ [[SET NX]] هو اللي بيمنع طلبين متوازيين يعدّوا الاتنين: Redis بيعمل الفحص والكتابة في أمر واحد atomic.

البصمة: لو نفس المفتاح جه مع body مختلف، ده bug في العميل (بيعيد استخدام المفاتيح)، والـ draft بتقول 422.

لو التنفيذ فشل بـ error، الحجز لازم يتفك، وإلا العميل هيفضل ياخد 409 لحد ما المفتاح يخلص. بس خلي بالك: لو الفشل حصل بعد ما الدفعة اتنفذت عند بوابة الدفع (timeout مثلًا)، فك الحجز خطر. عشان كده في الأنظمة الجدية المفتاح بيتخزن في نفس القاعدة وفي نفس الـ transaction مع العملية، وبيتبعت كمان لبوابة الدفع (أغلب البوابات بتقبل idempotency key)، فالتكرار بيتمسك عندهم هما كمان.

مدة التخزين: ٢٤ ساعة شائعة (Stripe بيحتفظ بالمفاتيح ٢٤ ساعة على الأقل). بعدها نفس المفتاح يتعامل كجديد.`,
            when: "أي POST ليه أثر مش عايزه يتكرر: دفع، وإنشاء طلب، وإرسال رسالة أو SMS، وتحويل رصيد. والـ webhooks اللي بتستقبلها ليها نفس الفكرة بالـ event id (درس [[webhook]] في تاب «Next.js»).",
            mistakes: R`المفتاح بيتولّد مع كل retry (فكل محاولة شكلها جديدة). وتفحص بـ GET وبعدين SET (اتنين يدخلوا في نفس اللحظة). والمفتاح مش مربوط بالمستخدم. والحجز ميتفكّش لما التنفيذ يفشل. وتخزّن الرد في ذاكرة الـ process، فالـ retry اللي يروح لنسخة تانية من السيرفر يتنفّذ.`
          },
          lines: [
            "helper بياخد الطلب والرد، ودالة بتعمل الشغل الحقيقي وترجّع status و body.",
            "المفتاح اللي العميل ولّده.",
            "مفيش مفتاح: 400.",
            "المفتاح في Redis مربوط بالمستخدم والمسار، عشان مستخدم تاني بنفس المفتاح ميشوفش رد غيره.",
            "بصمة الـ body عشان نعرف لو المفتاح اتعاد مع طلب مختلف.",
            "احجز المفتاح: NX يعني «لو مش موجود بس». لو محجوز قبل كده:",
            "هات اللي متسجّل.",
            "نفس المفتاح بـ body مختلف: 422، ده غلط في العميل.",
            "محجوز ولسه مفيش رد: الطلب الأصلي لسه شغال، 409.",
            "خلص قبل كده: رجّع نفس الرد بالظبط من غير ما تنفّذ.",
            "قفلة.",
            "نفّذ. لو رمى error، فك الحجز عشان الـ retry يقدر ينفّذ، وارمي الـ error تاني.",
            "خزّن الرد ٢٤ ساعة.",
            "ورجّعه.",
            "قفلة."
          ],
          sol: R`التلات طلبات بنفس المفتاح بيرجّعوا نفس الرد بالحرف ([[201]] ونفس الـ [[id]] ونفس [[createdAt]])، وعدد الدفعات في القاعدة ١. أول طلب بس نفّذ، والاتنين التانيين رجّعوا الرد المتسجّل من Redis. ونفس المفتاح بمبلغ ٧٠٠ بيرجّع [[422]] و [[Key reused with a different body]]. ولو بعت طلبين في نفس اللحظة بمفتاح جديد، واحد بياخد [[409]] و [[Original request still in progress]] والتاني 201، ولسه دفعة واحدة. ومن غير header خالص [[400]].

أشهر غلط: تكتب [[-H "Idempotency-Key: $(uuidgen)"]] جوه الـ loop أو جوه الـ curl نفسه، فكل طلب بياخد مفتاح جديد وتلاقي ٣ دفعات. المفتاح يتولّد مرة واحدة ويتخزن في متغير، وده بالظبط اللي العميل الحقيقي بيعمله: مفتاح لكل «ضغطة دفع»، مش لكل محاولة. ولو [[uuidgen]] مش موجود عندك، [[node -e "console.log(crypto.randomUUID())"]] بيدّي نفس النتيجة.

ولو لقيت دفعتين مع إن المفتاح ثابت: اتأكد إن الـ id في Redis مش فيه حاجة بتتغير كل طلب، وإن الحجز بـ [[NX]] مش GET وبعدين SET. وتقدر تشوف المفتاح بعينك بـ [[redis-cli --scan --pattern 'idem:*']] و [[redis-cli ttl]] (حوالي ٨٦٤٠٠).`,
          solCode: R`KEY=$(uuidgen)        # مرة واحدة برا الـ loop (أو: KEY=$(node -e "console.log(crypto.randomUUID())"))
pay() {
  curl -s -w " %{http_code}\n" -X POST localhost:3000/payments \
    -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
    -H "Idempotency-Key: $KEY" -d "{\"amount\":$1}"
}
for i in 1 2 3; do pay 500; done
# {"id":"1","createdAt":"...","userId":"u1","amount":500} 201   ← التلاتة نفس الرد بالحرف، ودفعة واحدة في القاعدة
pay 700
# {"title":"Key reused with a different body"} 422

KEY=$(uuidgen)
pay 100 & sleep 0.05; pay 100; wait
# {"title":"Original request still in progress"} 409   ← التاني وصل والأول لسه شغال
# {"id":"2",...,"amount":100} 201`
        }
      ]
    }
  ]
});
