// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
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
    },
    {
      t: "التوثيق والأمان",
      l: 1,
      n: "عقد مكتوب (OpenAPI) بيتولّد منه docs وأنواع، وقايمة OWASP الخاصة بالـ APIs",
      items: [
        {
          cmd: "OpenAPI",
          title: "اكتب عقد الـ API في ملف واحد",
          desc: R`OpenAPI ملف YAML أو JSON بيوصف كل endpoint: المسار، والـ parameters، وشكل الطلب، وكل رد ممكن بالـ status بتاعه. الملف ده هو العقد بين الـ backend والفرونت والموبايل والعملاء.

ومنه بيتولّد: صفحة docs تفاعلية، و types لـ TypeScript، و SDKs، و mock servers، واختبارات. النسخة الأشهر 3.1، و 3.2 نزلت في سبتمبر 2025.`,
          example: R`openapi: 3.1.1
info: { title: Orders API, version: 1.4.0 }
servers: [{ url: "https://api.example.com/v1" }]
paths:
  /orders/{id}:
    get:
      operationId: getOrder
      parameters: [{ name: id, in: path, required: true, schema: { type: string } }]
      responses:
        "200": { description: OK, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "404": { description: Not found, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
components:
  schemas:
    Order: { type: object, required: [id, status], properties: { id: { type: string }, status: { type: string, enum: [pending, paid, shipped] } } }
    Problem: { type: object, properties: { title: { type: string }, status: { type: integer }, detail: { type: string } } }`,
          try: R`اكتب الملف ده لـ endpointين من مشروعك، وافحصه بـ [[npx @redocly/cli lint openapi.yaml]]. الأداة هتقولك لو فيه [[$ref]] بيشاور على حاجة مش موجودة، أو رد ناقصه وصف.`,
          flag: "script",
          deep: {
            why: "من غير عقد، الفرونت بيعرف شكل الرد من الـ Network tab أو من سؤال الـ backend. وكل تغيير بيكسر حاجة محدش لاحظها. العقد المكتوب بيخلي الشكل متفق عليه قبل الكود، وبيتولّد منه كل حاجة تانية.",
            how: R`الملف أجزاء: [[info]] و [[servers]]، و [[paths]] (كل مسار وتحته الـ methods)، و [[components]] للحاجات المشتركة (schemas، و responses، و parameters، و securitySchemes) اللي بتتشاور عليها بـ [[$ref]].

3.1 بقت متوافقة بالكامل مع JSON Schema، فنفس الـ schema ينفع لـ validation في أي مكان. و 3.2 (سبتمبر 2025) زودت دعم رسمي للـ streaming زي SSE و JSON Lines، و method اسمها [[QUERY]]، و tags متداخلة. الأدوات بتاخد وقت عشان تدعم الجديد، فـ 3.1 الاختيار الآمن دلوقتي.

فيه طريقتين تكتب بيها:

spec-first: تكتب الـ YAML الأول، وتولّد منه types للسيرفر والعميل. مناسب لما فرق كتير بتشتغل على نفس الـ API.

code-first: الملف بيتولّد من الكود. FastAPI بيعمله لوحده من الـ type hints (تاب «Python و FastAPI»)، و NestJS بالـ decorators، وفي Express فيه مكتبات بتولّده من schemas بتاعة Zod. و Zod 4 فيها [[z.toJSONSchema()]] جاهزة.

الأهم من الطريقة: الملف يتفحص في CI (lint)، ويتقارن بالنسخة اللي فاتت عشان أي breaking change يتمسك قبل الـ merge (فيه أدوات diff للـ OpenAPI بتعمل كده).`,
            when: "أي API هيستخدمه حد غيرك: فرونت في repo تاني، أو موبايل، أو عميل B2B. وحتى لو لوحدك، الـ types المتولّدة لوحدها تستاهل.",
            mistakes: R`الملف مكتوب بالإيد ومحدش بيحدّثه، فبيبقى كذاب بعد شهرين. ومفيش ردود الأخطاء (4xx) فيه، فالعميل ميعرفش شكلها. و [[operationId]] مكرر أو ناقص، فالـ SDK يطلع بأسماء دوال غريبة زي [[getOrdersId1]].`
          },
          lines: [
            "نسخة المواصفة.",
            "اسم الـ API ونسخته (نسخة العقد بتاعك، مش نسخة OpenAPI).",
            "العنوان الأساسي.",
            "المسارات.",
            "مسار فيه parameter اسمه id.",
            "GET عليه.",
            "اسم فريد للعملية، والأدوات بتعمل منه اسم الدالة (getOrder).",
            "الـ id جاي من الـ path، ومطلوب، ونص.",
            "الردود الممكنة:",
            "200: بيرجّع Order بالشكل المتعرّف تحت.",
            "404: بيرجّع Problem بالـ Content-Type بتاع RFC 9457.",
            "الأجزاء المشتركة.",
            "الأشكال (JSON Schema).",
            "شكل الطلب: id و status مطلوبين، والحالة من ٣ قيم.",
            "شكل الخطأ."
          ],
          sol: R`لو فحصت المثال زي ما هو بـ [[@redocly/cli]] (جربناها على 2.55)، هتاخد [[Validation failed with 2 errors and 2 warnings]] من الـ config الافتراضي (recommended): الـ errors هما [[operation-summary]] (العملية ناقصها [[summary]]) و [[security-defined]] (مفيش security على العملية ولا على مستوى الملف). والـ warnings: [[info-license]] و [[no-server-example.com]]. ده طبيعي: الـ lint بيفحص جودة، مش بس إن الملف صحيح.

الحل: [[summary]] لكل operation، و [[securitySchemes]] بـ bearer و [[security]] على مستوى الملف، و [[license]] في [[info]]. في الحل endpointين ([[POST /orders]] و [[GET /orders/{id}]])، ومعاهم ردود 401 و 422 من نوع Problem، والنتيجة [[Your API description is valid]]. التحذير الوحيد اللي بيفضل هو example.com، وده بيختفي لما تحط الدومين الحقيقي بتاعك.

وجرّب تغلط في [[$ref]] (اكتب [[NewOrdr]] مثلًا): هتاخد error اسمه [[no-unresolved-refs]] و [[Can't resolve $ref]]، ومعاه السطر والعمود بالظبط، وكمان warning إن [[NewOrder]] مش مستخدم ([[no-unused-components]]). ولو مش عايز قاعدة معينة، اعمل ملف [[redocly.yaml]] وقفّلها بوعي، متتجاهلش الـ output.`,
          solCode: R`openapi: 3.1.1
info:
  title: Orders API
  version: 1.4.0
  license: { name: Proprietary, identifier: LicenseRef-Proprietary }
servers: [{ url: "https://api.example.com/v1" }]
security: [{ bearerAuth: [] }]
paths:
  /orders:
    post:
      operationId: createOrder
      summary: Create an order
      requestBody:
        required: true
        content: { application/json: { schema: { $ref: "#/components/schemas/NewOrder" } } }
      responses:
        "201": { description: Created, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "422": { description: Validation failed, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
  /orders/{id}:
    get:
      operationId: getOrder
      summary: Get one order
      parameters: [{ name: id, in: path, required: true, schema: { type: string } }]
      responses:
        "200": { description: OK, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "404": { description: Not found, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
  responses:
    Unauthorized: { description: Missing or invalid token, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
  schemas:
    NewOrder: { type: object, required: [productId, qty], properties: { productId: { type: string }, qty: { type: integer, minimum: 1 } } }
    Order: { type: object, required: [id, status], properties: { id: { type: string }, status: { type: string, enum: [pending, paid, shipped] } } }
    Problem: { type: object, properties: { title: { type: string }, status: { type: integer }, detail: { type: string } } }`
        },
        {
          cmd: "Swagger UI و openapi-typescript",
          title: "docs تفاعلية وأنواع TypeScript من نفس العقد",
          desc: R`[[swagger-ui-express]] بيعرض الـ OpenAPI كصفحة تجرّب منها كل endpoint من المتصفح. و [[openapi-typescript]] بيولّد ملف types من نفس العقد، و [[openapi-fetch]] بيستخدمه، فكل طلب من الفرونت متحقق منه وقت الكتابة: المسار، والـ params، وشكل الرد.

لو الـ backend غيّر اسم حقل، الفرونت ميعدّيش الـ typecheck، بدل ما يقع عند المستخدم.`,
          example: R`import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import { readFileSync } from "node:fs";
const spec = parse(readFileSync("openapi.yaml", "utf8"));
app.get("/openapi.json", (_req, res) => res.json(spec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
// الفرونت: npx openapi-typescript http://localhost:3000/openapi.json -o src/api.d.ts
import createClient from "openapi-fetch";
import type { paths } from "./api";
const api = createClient<paths>({ baseUrl: "http://localhost:3000/v1" });
const { data, error } = await api.GET("/orders/{id}", { params: { path: { id: "9001" } } });
if (error) console.error(error.title);
else console.log(data.status);`,
          try: R`شغّل الـ docs وافتح [[/docs]] وجرّب «Try it out». وبعدين ولّد الأنواع، وغيّر في الكود [["/orders/{id}"]] لـ [["/order/{id}"]] وشغّل [[tsc --noEmit]] (تاب «فحص الكود»)، وشوف الخطأ قبل ما تشغّل حاجة.`,
          flag: "script",
          deep: {
            why: "الـ docs اللي في Notion بتبقى قديمة. والأنواع اللي بتكتبها بإيدك في الفرونت بتبعد عن الحقيقة بهدوء. لما الاتنين بيتولّدوا من ملف واحد، مفيش مكان للكذب.",
            how: R`[[swagger-ui-express]] بيقدّم ملفات Swagger UI الثابتة ([[swaggerUi.serve]]) وبيعمل صفحة HTML فيها العقد بتاعك ([[setup(spec)]]). وفيه بدايل أشيك زي Scalar و Redoc، ونفس الفكرة: بياخدوا نفس الـ JSON.

[[openapi-typescript]] بيقرا العقد (ملف أو URL) ويطلّع ملف [[.d.ts]] فيه type اسمه [[paths]]: لكل مسار، ولكل method، الـ parameters والـ body والردود بالـ status. مفيش كود runtime، أنواع بس.

[[openapi-fetch]] wrapper صغير جدًا فوق [[fetch]] بياخد [[paths]] كـ generic. في [[api.GET("/orders/{id}", ...)]] الـ TypeScript بيكمّلك المسارات الموجودة بس، وبيطلب الـ params المطلوبة، وبيرجّع [[{ data, error, response }]]: [[data]] لو 2xx ونوعه من الرد الناجح، و [[error]] لو غير كده ونوعه من ردود الأخطاء. فمش محتاج [[as Order]] في أي حتة.

التوليد يتعمل script في package.json ويتشغّل في CI، ولو الملف المتولّد اتغيّر ومحدش عمله commit، الـ CI يقع. كده أي تغيير في العقد بيبان في الـ PR.

وفي monorepo كله TypeScript فيه بديل من غير عقد خالص: tRPC (المستوى ٣).`,
            when: "أول ما يبقى فيه عقد OpenAPI. وفي أي فرونت بيكلم API مش بتاعك وموفّر OpenAPI (Stripe و GitHub موفّرينه، وتقدر تولّد منه).",
            mistakes: R`[[/docs]] مفتوحة في الإنتاج على API داخلي، فأي حد يشوف كل الـ endpoints (ومنها endpoints الأدمن). اقفلها بـ auth أو اعرضها في dev بس. وتولّد الأنواع مرة وتنسى، فتبقى قديمة زي الأنواع اليدوية. وتعمل [[as]] على [[data]] بدل ما تصلّح العقد.`
          },
          lines: [
            "مكتبة صفحة الـ docs.",
            "parser للـ YAML.",
            "قراية ملفات.",
            "اقرا العقد مرة واحدة وقت التشغيل.",
            "اعرضه JSON عشان الأدوات تسحبه.",
            "صفحة docs تفاعلية على /docs.",
            "(ناحية الفرونت) عميل fetch بيفهم الأنواع.",
            "الأنواع المتولّدة من العقد.",
            "اعمل عميل بالعنوان الأساسي.",
            "المسار لازم يبقى موجود في العقد، والـ id مطلوب ونص. أي غلط هنا = TypeScript error.",
            "error نوعه Problem (من رد 404 في العقد).",
            "data نوعه Order، فـ [[data.status]] معروف إنه pending أو paid أو shipped."
          ],
          sol: R`[[/docs]] بيعمل redirect لـ [[/docs/]] وبيفتح صفحة Swagger UI فيها كل الـ endpoints. بس «Try it out» بيبعت الطلب للـ URL اللي في [[servers]] في العقد، يعني [[https://api.example.com/v1]] مش السيرفر بتاعك، فهتاخد [[Failed to fetch]]. الحل: ضيف [[http://localhost:3000/v1]] أول واحد في [[servers]] (أو اختاره من القايمة اللي فوق)، واتأكد إن الـ routes بتاعتك فعلًا تحت [[/v1]].

بعد التوليد، غيّر المسار لـ [["/order/{id}"]] وشغّل [[tsc --noEmit]]: هتاخد خطأ زي [[Argument of type '"/order/{id}"' is not assignable to parameter of type '"/orders/{id}"']]، قبل ما تشغّل أي حاجة. رجّعه صح والخطأ يختفي، و [[data.status]] نوعه [[pending | paid | shipped]] و [[error.title]] من شكل Problem.

لو [[openapi-typescript]] وقع بـ [[Cannot read properties of undefined (reading 'createKeywordTypeNode')]]: ده لأن المشروع فيه TypeScript 7 (الـ latest على npm دلوقتي)، والنسخة 7.13 من openapi-typescript محتاجة JS API بتاعة TypeScript 5. شغّله بـ [[npx]] من برا المشروع، أو ثبّت [[typescript@5]] له. ولو [[api.GET]] مش بيطلّع أي خطأ مع المسار الغلط، يبقى الـ import بتاع [[paths]] مش لاقي الملف، ونوعه بقى any.`,
          solCode: R`# openapi.yaml: ضيف السيرفر المحلي أول واحد، عشان «Try it out» يبعت له مش لـ api.example.com
servers:
  - { url: "http://localhost:3000/v1", description: Local }
  - { url: "https://api.example.com/v1", description: Production }

# package.json
"scripts": { "gen:api": "openapi-typescript http://localhost:3000/openapi.json -o src/api.d.ts" }

$ npm run gen:api
✨ openapi-typescript 7.13.0
🚀 http://localhost:3000/openapi.json → src/api.d.ts

# بعد ما تغيّر "/orders/{id}" لـ "/order/{id}":
$ npx tsc --noEmit
src/client.ts(4,39): error TS2345: Argument of type '"/order/{id}"' is not assignable to parameter of type '"/orders/{id}"'.`
        },
        {
          cmd: "OWASP API Top 10",
          title: "أشهر ثغرات الـ APIs واللي بيقفلها",
          desc: R`OWASP عندها قايمة خاصة بالـ APIs (آخر نسخة 2023) غير قايمة الويب العامة (تاب «الأمان»). أول ٣ فيها كلهم صلاحيات ودخول: BOLA (تطلب order غيرك بتغيير الـ id)، و Broken Authentication، و BOPLA (تشوف أو تعدّل حقول مش المفروض توصلها، زي [[role]] أو [[passwordHash]]).

المثال بيقفل ٣ منهم في كام سطر: شرط الملكية جوه كل query، و schema صارمة للتعديل، وحد أقصى للقوايم، و [[select]] بالحقول المسموحة بس.`,
          example: R`const OrderPatch = z.strictObject({ note: z.string().max(500), giftWrap: z.boolean() }).partial();
app.patch("/orders/:id", requireAuth, async (req, res) => {
  const data = OrderPatch.parse(req.body);
  const { count } = await db.order.updateMany({ where: { id: req.params.id, userId: req.user.id }, data });
  if (count === 0) return res.status(404).end();
  res.status(204).end();
});
app.get("/orders", requireAuth, async (req, res) => {
  const take = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
  res.json({ items: await db.order.findMany({ where: { userId: req.user.id }, take, select: { id: true, status: true, total: true, createdAt: true } }) });
});`,
          try: R`سجّل دخول بمستخدمين. خد id طلب من الأول، واطلبه وعدّله بتوكن التاني: لازم 404. وابعت PATCH فيه [[{"status":"paid"}]]: لازم 422. ده أهم اختبار أمان في أي API، واعمله لكل endpoint فيه id.`,
          flag: "script",
          deep: {
            why: "أغلب اختراقات الـ APIs مش تشفير مكسور ولا SQL injection. هي حد غيّر رقم في الـ URL وشاف بيانات حد تاني، أو بعت حقل زيادة وبقى admin. الـ API بيعمل بالظبط اللي اتقاله، والسؤال «مين مسموحله؟» مبيتسألش.",
            how: R`القايمة (OWASP API Security Top 10، نسخة 2023) باختصار:

API1 BOLA (Broken Object Level Authorization): [[GET /orders/9001]] من غير فحص إن الطلب ده بتاع اللي بيسأل. الحل: شرط الملكية جوه الاستعلام نفسه، مش فحص بعد ما تجيب.

API2 Broken Authentication: login من غير rate limit، وتوكنات مبتنتهيش، و JWT من غير فحص توقيع أو [[alg]].

API3 BOPLA (Broken Object Property Level Authorization): اتنين في واحد. قراية: الرد فيه حقول سرية (passwordHash و resetToken وبيانات داخلية). كتابة: mass assignment ([[data: req.body]]).

API4 Unrestricted Resource Consumption: مفيش حد للـ limit، ولا لحجم الرفع، ولا لعدد رسايل SMS اللي بتتبعت (وكل SMS بفلوس).

API5 Broken Function Level Authorization: endpoints الأدمن محمية في الواجهة بس ([[/admin/users]] بيشتغل لأي مستخدم مسجّل).

API6 Unrestricted Access to Sensitive Business Flows: bots بتشتري كل التذاكر، أو بتعمل حسابات بالآلاف عشان الكوبونات.

API7 SSRF: الـ API بيعمل fetch لـ URL جاي من المستخدم (webhook URL، أو صورة من لينك) فيوصل لشبكتك الداخلية.

API8 Security Misconfiguration: CORS مفتوح، و stack traces في الردود، و debug endpoints في الإنتاج.

API9 Improper Inventory Management: [[/v1]] قديم لسه شغال من غير الحماية الجديدة، أو staging مفتوح على قاعدة الإنتاج.

API10 Unsafe Consumption of APIs: بتثق في رد API تالت (أو webhook) من غير validation، وهو داخل سيستمك زي أي مدخل من مستخدم.

[[z.strictObject]] في Zod 4 بترفض أي key مش متعرّف، و [[z.object]] العادية بتشيله بهدوء. الاتنين بيحموا من mass assignment طالما بتبعت الناتج مش [[req.body]].`,
            when: "اعمل الـ checklist دي على كل endpoint جديد في الـ code review. و BOLA بالذات: أي route فيه [[:id]] لازم الاستعلام بتاعه فيه شرط ملكية أو صلاحية.",
            mistakes: R`تفحص الملكية في الفرونت بس (بتخفي الزرار). وتفحص [[order.userId === user.id]] في GET وتنسى تعمل ده في endpoint التعديل أو المسح. و [[findMany()]] من غير select فالرد فيه كل الأعمدة. وتفتكر إن UUID في الـ URL حماية: هو بيصعّب التخمين بس، واللينكات بتتسرب.`
          },
          lines: [
            "الحقول اللي المستخدم يقدر يعدّلها بس. [[strictObject]] بترفض أي حقل زيادة زي status أو userId أو total.",
            "تعديل طلب.",
            "اتحقق: أي حقل مش في القايمة = 422 (BOPLA: mass assignment).",
            "عدّل بشرط الـ id والملكية مع بعض في نفس الاستعلام (BOLA).",
            "مش بتاعه أو مش موجود: 404 في الحالتين.",
            "204.",
            "قفلة.",
            "قايمة الطلبات.",
            "بين ١ و ١٠٠ بس، ورقم صحيح، عشان [[take]] السالب في Prisma بيجيب من آخر القايمة ويعدّي الحد (Unrestricted Resource Consumption).",
            "طلباته بس، وبالحقول اللي الواجهة محتاجاها بس (BOPLA: كشف بيانات زيادة).",
            "قفلة."
          ],
          sol: R`بتوكن المستخدم التاني: الـ GET بيرجّع [[404]]، والـ PATCH بيرجّع [[404]]، ونفس الـ 404 لـ id مش موجود أصلًا، فمفيش طريقة يعرف بيها إن الطلب موجود. و PATCH فيه [[{"status":"paid"}]] بتوكن صاحب الطلب نفسه بيرجّع [[422]] و [[unrecognized_keys]] و [[keys: ["status"]]]. و [[{"note":"leave at door"}]] بيرجّع 204 والـ GET يوريك التعديل، ومن غير أي حقل داخلي زي [[internalCost]] لأن الـ [[select]] محدد.

لو المستخدم التاني أخد 200، يبقى الاستعلام بيدوّر بالـ id بس. ولو أخد 403، يبقى بتجيب الطلب الأول وبعدين تقارن [[userId]]: شغال، بس بيأكد وجود الطلب، وأسهل تنساه في endpoint تاني. ولو [[{"status":"paid"}]] رجّع 204، يبقى انت عامل [[z.object]] مش [[z.strictObject]]: الـ status بيتشال بهدوء ومبيتكتبش، فانت محمي، بس العميل مش هيعرف إن طلبه اتجاهل. ولو الطلب اتدفع فعلًا، يبقى بتبعت [[req.body]] للقاعدة بدل الناتج بتاع Zod.

واعمل الاختبار ده اختبار integration ثابت (بمستخدمين واختبار لكل route فيه [[:id]])، عشان أي endpoint جديد ينسى شرط الملكية يقع في CI مش عند العميل.`,
          solCode: R`// الـ GET اللي هتختبر بيه: نفس شرط الملكية جوه الاستعلام، و select بالحقول المسموحة
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    select: { id: true, status: true, total: true, note: true, giftWrap: true },
  });
  if (!order) return res.status(404).end();
  res.json(order);
});

// الاختبار (ORDER_ID بتاع أحمد، و TOKEN_B توكن مستخدم تاني):
// curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_B"                  → 404
// curl -s -o /dev/null -w "%{http_code}\n" -X PATCH localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_B" \
//   -H 'Content-Type: application/json' -d '{"note":"hacked"}'                                                                → 404
// curl -s -X PATCH localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_A" -H 'Content-Type: application/json' -d '{"status":"paid"}'
//   → 422: {"code":"unrecognized_keys","keys":["status"],"path":[],"message":"Unrecognized key: \"status\""}`
        }
      ]
    },
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
  const { question } = Question.parse(await request.json());
  const stream = client.messages.stream(
    { model: "claude-opus-5-5", max_tokens: 4096, messages: [{ role: "user", content: question }] },
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
          lines: [
            "الـ SDK الرسمي.",
            R`بيقرا [[ANTHROPIC_API_KEY]] من البيئة على السيرفر، ومبيروحش للمتصفح.`,
            "POST، لأن السؤال في الـ body.",
            "مين بيسأل؟",
            "مش مسجّل؟ 401 قبل ما تصرف أي token.",
            R`تحقق من الـ body بـ Zod ([[Question]] فيها حد أقصى للطول).`,
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
      {busy ? <button type="button" onClick={() => ctrl.current?.abort()}>وقّف</button> : <button>اسأل</button>}
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
            "وقت الشغل الزرار «وقّف» بينادي abort، وغير كده «اسأل».",
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
    },
    {
      t: "WebSockets على أكتر من سيرفر",
      l: 2,
      n: "socket.io شغال على سيرفر واحد. مع اتنين محتاج Redis بينهم، و load balancer بيودّي العميل لنفس السيرفر، وطريقة تكشف الاتصالات الميتة",
      items: [
        {
          cmd: "Redis adapter",
          title: "إشعار يوصل حتى لو المستخدم متصل بسيرفر تاني",
          desc: R`كل سيرفر socket.io عارف الاتصالات اللي عنده بس. لو المستخدم متصل بسيرفر ١، والطلب اللي عمل الإشعار راح لسيرفر ٢، [[io.to("user:42").emit()]] على سيرفر ٢ مش هيلاقي حد.

الـ Redis adapter بيحل ده: كل [[emit]] لـ room بيتنشر في Redis (pub/sub)، وكل السيرفرات مشتركة، وكل واحد بيوصّله للاتصالات اللي عنده. الكود بتاعك نفسه مبيتغيرش.`,
          example: R`import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
const pubClient = createClient({ url: config.REDIS_URL });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
export const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: { origin: config.WEB_ORIGIN, credentials: true },
});
io.use(verifySocketToken);
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export const notify = (userId: string, n: unknown) => io.to($__btuser:$__{userId}$__bt).emit("notification", n);`,
          try: R`شغّل نسختين من السيرفر على بورتين (3001 و 3002) بنفس Redis. وصّل عميل على 3001، ونادي [[notify]] من endpoint تجربة على 3002: لازم الإشعار يوصل. وبعدين شيل الـ adapter وكرر: مش هيوصل. وجرّب [[(await io.in("user:42").fetchSockets()).length]] من 3002.`,
          flag: "script",
          deep: {
            why: "أول ما تشغّل نسختين من الـ API (عشان الضغط، أو عشان deploy من غير downtime)، نص الإشعارات بتضيع بهدوء: بتوصل للي حظه إنه على نفس السيرفر. ومفيش error في أي حتة. الـ adapter بيخلي الـ rooms «موجودة» على مستوى الـ cluster كله.",
            how: R`الـ adapter محتاج اتصالين بـ Redis: واحد بينشر ([[pub]]) وواحد مشترك ([[sub]])، لأن الاتصال اللي بيعمل SUBSCRIBE في Redis مبيقدرش يعمل أوامر تانية. [[duplicate()]] بيعمل اتصال تاني بنفس الإعدادات.

لما تعمل [[io.to(room).emit()]]: السيرفر بيبعت لاتصالاته المحلية في الـ room، وبينشر الرسالة في Redis. السيرفرات التانية بتستقبلها وتبعتها لاتصالاتها في نفس الـ room. [[socket.join]] نفسه محلي (كل سيرفر عارف مين عنده في أنهي room)، والـ adapter بيوزّع الـ broadcasts بس.

وفيه عمليات بتسأل كل السيرفرات: [[io.in(room).fetchSockets()]] بترجع الاتصالات من كل الـ cluster، و [[io.in(room).disconnectSockets()]] بيقفلهم (مفيد في logout)، و [[serverSideEmit]] لرسالة بين السيرفرات نفسها. دي بتستنى رد من كل سيرفر، فمتستخدمهاش في كل request.

Redis pub/sub مبيخزّنش: لو سيرفر كان بيعمل restart لحظة الـ emit، الرسالة دي ضاعت عليه. عشان كده الإشعار بيتحفظ في القاعدة الأول، والـ socket للسرعة بس (زي درس [[socket.io]] في تاب «بناء مشروع كامل»). وفيه adapter تاني مبني على Redis Streams بيقدر يكمّل بعد انقطاع قصير، ومعاه ميزة [[connectionStateRecovery]] في socket.io اللي بترجّع الرسايل اللي فاتت العميل لو فصل ثواني. الـ pub/sub adapter العادي مبيدعمهاش.

ونفس الفكرة لـ SSE أو WebSocket من غير socket.io: كل سيرفر بيعمل SUBSCRIBE على قناة في Redis، وأي publish بيوصل للكل.`,
            when: "أول ما يبقى عندك أكتر من process بيخدم الـ sockets: أكتر من container، أو PM2 cluster mode، أو deploy بيشغّل الجديد جنب القديم.",
            mistakes: R`تستخدم نفس اتصال Redis للـ pub والـ sub. وتفتكر إن الـ adapter لوحده كفاية من غير sticky sessions (الدرس الجاي). وتعتمد على الـ emit كأنه مضمون وتنسى تحفظ في القاعدة. وتنادي [[fetchSockets()]] في كل request فتعمل ضغط على كل السيرفرات. وسؤال انترفيو: «عندك chat app على ٣ سيرفرات، رسالة من يوزر على الأول لازم توصل ليوزر على التالت، إزاي؟»، والإجابة pub/sub مشترك (Redis adapter) و sticky sessions.`
          },
          lines: [
            "سيرفر socket.io.",
            "الـ adapter الرسمي لـ Redis.",
            "عميل Redis الرسمي (node-redis).",
            "اتصال للنشر.",
            "اتصال تاني للاشتراك (الاتصال اللي بيعمل SUBSCRIBE مبيعملش أوامر تانية).",
            "افتح الاتنين قبل ما السيرفر يبدأ.",
            "السيرفر...",
            "...بالـ adapter: أي emit لـ room بيعدّي على Redis لكل السيرفرات.",
            "CORS للواجهة بس.",
            "قفلة.",
            "تحقق من التوكن قبل أي اتصال (زي درس socket.io في «بناء مشروع كامل»).",
            "كل اتصال يدخل room المستخدم بتاعه، على السيرفر اللي هو عليه.",
            "notify من أي سيرفر بتوصل لكل أجهزة المستخدم، على أي سيرفر."
          ],
          sol: R`مع الـ adapter: العميل المتصل على 3001 بيستقبل الإشعار اللي اتبعت من 3002، و [[fetchSockets()]] على 3002 بترجع 1 (الاتصال موجود على السيرفر التاني بس الـ adapter سأله).

من غير الـ adapter: الإشعار مش بيوصل خالص، و [[fetchSockets()]] على 3002 بترجع 0. ومفيش أي error، وده بالظبط اللي بيحصل في الإنتاج لما حد ينسى الـ adapter.

لو العميل مش بيعرف يتصل أصلًا وانت ورا load balancer، دي مشكلة sticky sessions، الدرس الجاي. وعشان تتأكد إن الاتنين شايفين نفس Redis: [[redis-cli PUBSUB CHANNELS]] لازم يطلّع قنوات بتبدأ بـ [[socket.io]].`
        },
        {
          cmd: "sticky sessions",
          title: "خلّي نفس العميل يروح لنفس السيرفر",
          desc: R`socket.io بيبدأ الاتصال بـ HTTP long-polling (كذا طلب ورا بعض) وبعدين يرقّيه لـ WebSocket. الطلبات دي كلها لازم تروح لنفس السيرفر، لأن الـ session بتاعة الاتصال متخزنة في ذاكرته. لو الـ load balancer وزّعها round-robin، التاني هيقول «مين انت؟» ويرد 400.

الحل: sticky sessions، يعني الـ load balancer يودّي نفس العميل لنفس السيرفر (بالـ IP أو بكوكي). والبديل إن العميل يبدأ WebSocket على طول من غير polling.`,
          example: R`upstream api {
    hash $remote_addr consistent;
    server 10.0.0.11:3000;
    server 10.0.0.12:3000;
}
map $http_upgrade $connection_upgrade { default upgrade; "" close; }
server {
    listen 443 ssl;
    server_name api.example.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_read_timeout 60s;
    }
}`,
          try: R`حط سيرفرين socket.io (بالـ Redis adapter) ورا Nginx مرة بـ [[hash $remote_addr]] ومرة من غيره (round-robin). وصّل عميل بالإعدادات الافتراضية في الحالتين، وشوف الـ transport اللي وصل له ([[socket.io.engine.transport.name]]) أو الـ error.`,
          flag: "script",
          deep: {
            why: "ده أشهر سبب لـ «الـ sockets شغالة على جهازي ووقعت في الإنتاج». على جهازك سيرفر واحد، وفي الإنتاج اتنين ورا load balancer، والـ handshake بيتقسم بينهم.",
            how: R`الـ handshake بتاع socket.io (Engine.IO): أول طلب GET بيرجّع [[sid]] (session id)، وبعدين العميل بيعمل طلبات polling بالـ sid ده، وبيجرّب يفتح WebSocket بيه. السيرفر اللي عمل الـ sid بس هو اللي يعرفه. لو طلب راح لسيرفر تاني: 400 ورسالة [[Session ID unknown]]، وفي العميل [[xhr post error]].

[[hash $remote_addr consistent]] في Nginx بيوزّع حسب IP العميل، و [[consistent]] (ketama) بيخلي إضافة أو شيل سيرفر يحرّك جزء صغير بس من العملاء. [[ip_hash]] قديم وبيشتغل برضه. العيب: كل الناس اللي ورا نفس الـ NAT (شركة أو شبكة موبايل) بيروحوا لنفس السيرفر، والتوزيع بيبقى مش متساوي. ولو فيه Cloudflare أو load balancer قدام Nginx، [[$remote_addr]] هيبقى الـ IP بتاعهم، فلازم الـ IP الحقيقي (تاب «Nginx»، درس [[IP الزائر ورا Cloudflare]]).

في load balancers السحابة (زي AWS ALB) فيه sticky بكوكي، وده أدق من الـ IP.

البديل من غير sticky: [[io(url, { transports: ["websocket"] })]] في العميل. الاتصال طلب واحد بيترقى على طول، فمفيش طلبات تتوزع. العيب إنك خسرت الـ fallback لـ polling لو شبكة ما بتمنع WebSocket (نادر دلوقتي بس بيحصل في شبكات شركات).

الـ Upgrade و Connection headers: Nginx بيشيلهم افتراضيًا، فلازم تمررهم عشان الترقية لـ WebSocket تحصل (تاب «Nginx»، درس [[WebSockets]]). و [[proxy_read_timeout]] لازم يبقى أكبر من الـ ping interval (socket.io بيبعت ping كل ٢٥ ثانية افتراضيًا)، وإلا Nginx يقفل الاتصال الساكت.

sticky sessions مش بديل للـ Redis adapter: الـ sticky بيخلي اتصال عميل واحد يفضل على سيرفر واحد، والـ adapter بيخلي السيرفرات توصّل لبعض. محتاج الاتنين.`,
            when: "أي socket.io ورا أكتر من سيرفر، أو PM2 cluster mode (اللي عنده مكتبة [[@socket.io/sticky]] للحالة دي)، أو أي حاجة بتعمل handshake على كذا طلب.",
            mistakes: R`round-robin عادي وتلوم socket.io. و hash بالـ IP ورا Cloudflare فكل الناس على سيرفر واحد. و [[proxy_read_timeout]] أقل من الـ ping interval فالاتصال يقطع كل شوية. ونسيان headers الـ Upgrade فكل الاتصالات تفضل polling (شغالة بس تقيلة جدًا على السيرفر).`
          },
          lines: [
            "مجموعة السيرفرات اللي بتشغّل الـ API.",
            "sticky: وزّع حسب IP العميل، فنفس العميل دايمًا لنفس السيرفر. و consistent بيقلل اللخبطة لما تضيف سيرفر.",
            "السيرفر الأول.",
            "السيرفر التاني.",
            "قفلة.",
            "لو الطلب فيه Upgrade خلي Connection = upgrade، ولو مفيش = close.",
            "السيرفر.",
            "HTTPS.",
            "الدومين.",
            "مسار socket.io الافتراضي.",
            "ودّيه للمجموعة (بالـ hash).",
            "HTTP/1.1: لازم عشان الترقية لـ WebSocket.",
            "مرر طلب الترقية.",
            "ومعاه Connection.",
            "الـ Host الأصلي.",
            "أكبر من ping socket.io (٢٥ ثانية)، عشان Nginx ميقفلش الاتصال الساكت.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بالـ hash: العميل بيتصل ويترقى، و [[transport.name]] بيطلع [[websocket]].

بالـ round-robin: العميل بيفشل بـ [[connect_error]] ورسالة زي [[xhr post error 400]] (أو [[xhr poll error]])، ولو بصيت على رد السيرفر هتلاقي [[Session ID unknown]]. السبب إن أول طلب polling راح لسيرفر، والتاني راح للتاني اللي مايعرفش الـ sid.

ولو ضفت [[transports: ["websocket"]]] في العميل، هيشتغل حتى مع round-robin، لأن مفيش غير طلب واحد بيتوزع. ده بيأكد إن المشكلة في توزيع طلبات الـ handshake، مش في socket.io نفسه.`
        },
        {
          cmd: "heartbeat و ping",
          title: "اكتشف الاتصال الميت قبل ما يتراكم",
          desc: R`لما موبايل يدخل نفق أو اللابتوب يقفل، الاتصال بيموت من غير ما يبعت «باي». السيرفر شايفه مفتوح، وبيفضل ماسك ذاكرة و file descriptor ليه، وأي رسالة ليه بتروح في الفاضي.

الحل heartbeat: السيرفر يبعت ping كل فترة، ولو مجاش pong قبل الـ ping اللي بعده، يقفل الاتصال بإيده. socket.io بيعمل ده لوحده ([[pingInterval]] و [[pingTimeout]])، ومع مكتبة [[ws]] الخام بتكتبه انت زي المثال.`,
          example: R`import { WebSocketServer, type WebSocket } from "ws";
const wss = new WebSocketServer({ server: httpServer, maxPayload: 64 * 1024 });
const alive = new WeakMap<WebSocket, boolean>();
wss.on("connection", (ws) => {
  alive.set(ws, true);
  ws.on("pong", () => alive.set(ws, true));
  ws.on("error", (err) => log.warn({ err }, "ws error"));
});
const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.get(ws)) { ws.terminate(); continue; }
    alive.set(ws, false);
    ws.ping();
  }
}, 30_000);
wss.on("close", () => clearInterval(interval));`,
          try: R`خلي الـ interval ثانية للتجربة. وصّل عميلين بمكتبة [[ws]]: واحد عادي، والتاني بـ [[new WebSocket(url, { autoPong: false })]] (مبيردش على الـ ping، كأنه اتصال ميت). بعد ٣ ثواني اطبع [[wss.clients.size]].`,
          flag: "script",
          deep: {
            why: "TCP لوحده ممكن يفضل «مفتوح» ساعات على اتصال طرفه التاني اختفى، لأن مفيش حد بيبعت حاجة. في سيرفر عليه آلاف المستخدمين على موبايل، الاتصالات الميتة دي بتتراكم لحد ما الذاكرة أو حد الـ file descriptors يخلص.",
            how: R`بروتوكول WebSocket نفسه فيه frames اسمها ping و pong، والمتصفح والمكتبات بيردوا على الـ ping تلقائيًا من غير كود منك. فالسيرفر: كل ٣٠ ثانية بيبعت ping لكل اتصال، وبيعلّمه «مستني رد». لو المرة الجاية لقاه لسه مستني، يبقى ميت، و [[terminate()]] بيقفل الـ socket فورًا من غير ما يستنى handshake الإغلاق (اللي مش هييجي).

الـ WeakMap: بتربط الحالة بالـ socket من غير ما تمنع الـ garbage collector يشيله بعد ما يتقفل. وفيه ناس بيحطوا [[ws.isAlive]] على الـ object نفسه، ودي الطريقة اللي في README مكتبة ws، والاتنين شغالين.

ناحية العميل: المتصفح مش بيقدر يبعت ping frames من JavaScript. فلو العميل محتاج يعرف إن السيرفر مات (مش العكس)، بتبعت رسالة عادية زي [[{"type":"ping"}]] والسيرفر يرد، ولو مجاش رد في وقت معين يقفل ويعيد الاتصال. socket.io بيعمل ده في الاتجاهين، وبيعيد الاتصال لوحده بـ backoff (بيزيد وقت الانتظار بين المحاولات، ومعاه عشوائية عشان آلاف العملاء ميرجعوش في نفس اللحظة بعد restart).

socket.io: [[pingInterval]] (افتراضي ٢٥ ثانية) و [[pingTimeout]] (افتراضي ٢٠ ثانية). اللي بيحدد إمتى الاتصال يعتبر ميت هو مجموعهم تقريبًا. ولازم يبقوا أقل من الـ idle timeout في أي proxy أو load balancer في النص، وإلا الـ proxy هو اللي هيقفل.

[[maxPayload]] حاجة تانية بس مهمة: أقصى حجم رسالة. من غيره أي حد يبعت رسالة ضخمة تاكل الذاكرة.

وبعد الـ reconnect: العميل رجع، بس فاتته رسايل. يا تبعتله اللي فاته من القاعدة (زي Last-Event-ID في SSE)، يا يعمل refetch للبيانات. الـ socket نفسه مش مخزن.`,
            when: "أي سيرفر WebSocket بمكتبة ws أو uWebSockets. ومع socket.io تظبط الأرقام بس بما يناسب الـ proxy اللي قدامك.",
            mistakes: R`مفيش heartbeat خالص، والذاكرة بتكبر ببطء لحد ما السيرفر يقع بعد أسبوع. و [[ws.close()]] بدل [[terminate()]] مع اتصال ميت (بيستنى رد مش هييجي). والـ interval أكبر من timeout الـ proxy. وتنسى [[clearInterval]] لما السيرفر يقفل (في الاختبارات بيعلّق الـ process). وتعيد الاتصال من العميل فورًا من غير backoff، فبعد كل deploy آلاف العملاء بيضربوا السيرفر في نفس الثانية.`
          },
          lines: [
            "مكتبة ws الخام (من غير socket.io).",
            "سيرفر WebSocket على نفس سيرفر HTTP، وأقصى رسالة 64KB.",
            "حالة كل اتصال: رد على آخر ping ولا لأ.",
            "اتصال جديد:",
            "اعتبره حي.",
            "لما يرد pong، علّمه حي تاني.",
            "سجّل أي error بدل ما يوقّع الـ process.",
            "قفلة.",
            "كل ٣٠ ثانية:",
            "لكل اتصال...",
            "...لو مردش على الـ ping اللي فات: ميت، اقفله فورًا وكمّل.",
            "علّمه «مستني رد».",
            "وابعتله ping (المتصفح بيرد pong لوحده).",
            "قفلة.",
            "قفلة.",
            "لو السيرفر اتقفل، وقّف الـ interval."
          ],
          sol: R`بعد ٣ ثواني [[wss.clients.size]] بيطلع 1. العميل اللي بـ [[autoPong: false]] اتقفل عند تاني دورة (الأولى علّمته «مستني»، والتانية لقته لسه مستني فعمل terminate)، وكود الإغلاق عنده 1006 (اتقفل من غير handshake).

لو لقيت الاتنين لسه موجودين: يا الـ pong listener بيعلّم الاتصال حي حتى من غير رد (مثلًا بتعمل [[alive.set(ws, true)]] قبل الـ ping)، يا الـ interval مبيشتغلش. ولو الاتنين اتقفلوا: غالبًا بتعلّم «مستني» بعد الـ ping بدل قبله، أو ناسي الـ pong listener.`,
          solCode: R`const wss = new WebSocketServer({ port: 8080 });
// ... نفس الكود بـ interval ثانية واحدة
const good = new WebSocket("ws://localhost:8080");
const dead = new WebSocket("ws://localhost:8080", { autoPong: false });
setTimeout(() => console.log("clients left:", wss.clients.size), 3500);
// clients left: 1`
        }
      ]
    },
    {
      t: "GraphQL",
      l: 2,
      n: "endpoint واحد والعميل بيطلب الحقول اللي عايزها بالظبط. قوي، بس ليه مشاكل مش موجودة في REST: N+1، والصلاحيات على مستوى الحقل، والاستعلامات العميقة",
      items: [
        {
          cmd: "GraphQL ولا REST",
          title: "إمتى GraphQL يستاهل وإمتى REST أبسط",
          desc: R`في GraphQL فيه endpoint واحد ([[POST /graphql]])، والعميل بيبعت query بيوصف شكل الرد اللي عايزه بالظبط: المنشورات، ومع كل منشور اسم الكاتب، ومن غير أي حقل تاني. والسيرفر عنده schema فيها كل الأنواع والعلاقات.

في REST نفس الشاشة ممكن تحتاج ٣ طلبات ([[/posts]] وبعدين [[/users/:id]] لكل كاتب)، أو endpoint مخصوص للشاشة. GraphQL بيحل ده، بس بياخد منك حاجات REST بيدّيهالك ببلاش: كاش HTTP، و status codes واضحة، وبساطة.`,
          example: R`query FeedPage($first: Int!) {
  posts(first: $first) {
    id
    title
    author {
      name
      avatarUrl
    }
  }
  me {
    name
    unreadCount
  }
}`,
          try: R`خد شاشة من مشروعك بتعمل أكتر من طلب REST، واكتبلها query واحد بالشكل ده. وبعدين عدّ: كام طلب في REST، وكام حقل بيرجع ومش بيتعرض (over-fetching).`,
          flag: "script",
          deep: {
            why: "الموبايل على شبكة بطيئة بيدفع تمن كل طلب زيادة وكل حقل مش محتاجه. ولما عندك عملاء كتير (ويب، وموبايل، وشركاء) كل واحد عايز شكل مختلف من نفس البيانات، إما تعمل endpoint لكل واحد، أو تديهم لغة يطلبوا بيها. GraphQL هو اللغة دي.",
            how: R`الـ query بيتبعت كـ JSON: [[{"query": "...", "variables": {"first": 10}}]]. السيرفر بيتحقق منه مقابل الـ schema قبل ما ينفّذ (حقل مش موجود = error فورًا)، وبعدين ينفّذ resolver لكل حقل. والرد JSON بنفس شكل الـ query بالظبط، جوه [[data]]، ومعاه [[errors]] لو فيه.

الأنواع التلاتة: [[query]] للقراية، و [[mutation]] للكتابة، و [[subscription]] للتحديثات live (غالبًا على WebSocket أو SSE).

اللي بتكسبه: طلب واحد للشاشة، ومفيش over-fetching، و schema typed بيتولّد منها types للعميل (GraphQL Codegen)، وأدوات بتكمّلك الحقول وانت بتكتب، وإضافة حقول من غير versions.

اللي بتخسره: كاش HTTP. كله POST على نفس الـ URL، فالـ CDN والمتصفح مش فاهمين حاجة. الحل كاش في العميل (Apollo Client و urql بيعملوا normalized cache)، أو persisted queries بـ GET. والـ status codes: GraphQL غالبًا بيرجّع 200 حتى مع أخطاء في [[errors]]، والمراقبة لازم تبص جوه الـ body. والأمان والأداء بقوا أصعب: العميل يقدر يطلب query عميق جدًا أو كبير جدًا، وكل حقل ممكن يعمل استعلام للقاعدة (N+1)، والصلاحيات لازم تبقى لكل حقل مش لكل endpoint. الدروس الجاية في الكاتيجوري دي بتحل التلاتة.

فيه بدايل وسط: REST بـ [[?fields=id,title]] و [[?include=author]] (زي JSON:API)، أو BFF لكل عميل (تاب «Next.js»، درس [[BFF]])، أو tRPC لو الفرونت والباك TypeScript في نفس الـ repo (المستوى ٣).`,
            when: "عملاء كتير بأشكال مختلفة، وبيانات فيها علاقات كتير (graph فعلًا)، وفريق فرونت كبير عايز يتحرك من غير ما يستنى الباك. و REST لـ API عام بسيط، أو CRUD، أو لما الكاش على CDN مهم، أو فريق صغير.",
            mistakes: R`تختار GraphQL عشان «أحدث» لمشروع CRUD فيه عميل واحد، فتدفع التعقيد من غير المكسب. وتسيب الـ introspection والـ playground مفتوحين في الإنتاج على API داخلي. وتفتكر إن مفيش versioning خالص: شيل حقل لسه حد بيستخدمه بيكسره برضه، والحل [[@deprecated]] وتتابع مين لسه بيطلبه. وفخ انترفيو: «GraphQL أسرع من REST؟»، مش بالضرورة. بيقلل عدد الطلبات والحجم، بس ممكن يبقى أبطأ على السيرفر من غير DataLoader وكاش.`
          },
          lines: [
            "query ليه اسم (مفيد في الـ logs) وبياخد متغير first نوعه Int إجباري.",
            "هات المنشورات بالعدد ده...",
            "...الـ id...",
            "...والعنوان...",
            "...والكاتب (علاقة: resolver تاني)...",
            "...اسمه...",
            "...وصورته. ومفيش إيميل ولا أي حقل تاني، مطلبتهوش.",
            "قفلة الكاتب.",
            "قفلة المنشورات.",
            "وفي نفس الطلب: المستخدم الحالي...",
            "...اسمه...",
            "...وعدد الإشعارات.",
            "قفلة.",
            "قفلة: ده كله طلب HTTP واحد."
          ],
          sol: R`مثال شائع: صفحة الـ feed في REST بتعمل [[GET /posts]] و [[GET /me]]، وبعدين [[GET /users/:id]] لكل كاتب مش معروف. يعني ١٢ طلب لـ ١٠ منشورات بكتّاب مختلفين، والـ user object فيه ١٥ حقل والشاشة بتعرض ٢. نفس الشاشة بـ GraphQL طلب واحد، والرد فيه الحقول الـ ٧ بالظبط.

بس لاحظ إن الطلبات دي لسه موجودة، بس اتنقلت للسيرفر: الـ resolver بتاع [[author]] هيتنادى ١٠ مرات. ده الـ N+1، ودرس [[DataLoader و N+1]] بيحله. ولو لقيت إن الشاشة أصلًا بتعمل طلب أو اتنين، فـ GraphQL مش هيكسبك كتير هنا.`
        },
        {
          cmd: "schema و resolvers",
          title: "اعمل سيرفر GraphQL بـ Yoga جوه Express",
          desc: R`الـ schema بتكتبها بلغة SDL: الأنواع وحقولها، و [[Query]] و [[Mutation]] كنقط دخول. والـ resolvers دوال: لكل حقل محتاج منطق، دالة بترجّع قيمته. كل resolver بياخد ٤ حاجات: الـ parent (الـ object اللي فوقه)، والـ args، والـ context (مشترك للطلب كله: المستخدم، والقاعدة)، و info.

GraphQL Yoga سيرفر خفيف مبني على Web APIs، ويتركّب جوه Express أو Next أو لوحده. و Apollo Server بديل مشهور بنفس الفكرة.`,
          example: R`import { createYoga, createSchema } from "graphql-yoga";
const typeDefs = /* GraphQL */ $__bt
  type User { id: ID! name: String! email: String posts: [Post!]! }
  type Post { id: ID! title: String! author: User! }
  type Query { posts(first: Int = 10): [Post!]! me: User }
  type Mutation { createPost(title: String!): Post! }
$__bt;
const resolvers = {
  Query: {
    posts: (_parent, args: { first: number }) => db.post.findMany({ take: Math.min(args.first, 50), orderBy: { id: "desc" } }),
    me: (_parent, _args, ctx: Ctx) => ctx.user,
  },
  Post: { author: (post, _args, ctx: Ctx) => ctx.loaders.user.load(post.authorId) },
  User: { posts: (user) => db.post.findMany({ where: { authorId: user.id }, take: 20 }) },
  Mutation: { createPost: (_p, args: { title: string }, ctx: Ctx) => db.post.create({ data: { title: args.title, authorId: requireUser(ctx).id } }) },
};
export const yoga = createYoga<{ req: express.Request }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
  graphiql: process.env.NODE_ENV !== "production",
  context: async ({ req }) => ({ user: await userFromRequest(req), loaders: makeLoaders() }),
});
app.use(yoga.graphqlEndpoint, yoga);`,
          try: R`سطّب [[npm i graphql@16 graphql-yoga]]، واعمل السيرفر ده بـ array في الذاكرة بدل db. افتح [[localhost:3000/graphql]] (GraphiQL) واكتب query للمنشورات مع اسم الكاتب. وبعدين اطلب حقل مش موجود زي [[posts { price }]] وشوف الخطأ، وابعت نفس الـ query بـ [[curl -X POST localhost:3000/graphql -H 'content-type: application/json' -d '{"query":"{ posts { title } }"}']].`,
          flag: "script",
          deep: {
            why: "الـ schema هي العقد بين الفرونت والباك، زي OpenAPI بالظبط بس جوه السيرفر نفسه. والـ resolvers بتخليك تفكّر في كل حقل لوحده: مين بيجيبه، ومين مسموحله يشوفه، وبيكلّف كام.",
            how: R`SDL: [[!]] يعني مش null. [[[Post!]!]] يعني list مش null، وكل عنصر فيها مش null. [[ID]] نص بيمثل id. والـ args بقيم افتراضية زي [[first: Int = 10]].

إزاي التنفيذ بيمشي: GraphQL بيبدأ من [[Query.posts]]، وياخد النتيجة (array منشورات)، ولكل منشور ولكل حقل مطلوب يدوّر على resolver. لو مفيش resolver للحقل (زي [[title]])، بياخد [[post.title]] من الـ object على طول (default resolver). عشان كده بتكتب resolvers بس للحقول اللي محتاجة منطق: علاقات، أو حقول محسوبة، أو صلاحيات.

الـ context: بيتعمل مرة لكل طلب. فيه المستخدم (من الكوكي أو التوكن) والـ loaders (الدرس الجاي). ولازم يتعمل جديد لكل طلب، مش global، وإلا بيانات مستخدم تتسرب لطلب تاني.

[[createYoga]] بيرجّع handler بيفهم Express و Node و Fetch API. [[graphqlEndpoint]] لازم يبقى نفس المسار اللي ركّبته عليه. و [[graphiql]] صفحة تجرّب منها الـ queries، مقفولة في الإنتاج هنا.

نسخة graphql: مكتبة [[graphql]] نزلت منها 17، بس plugins كتير (منها اللي في درس الـ auth) لسه بتطلب 16، واتنين نسخ من graphql في نفس المشروع بيعملوا أخطاء غريبة. عشان كده [[graphql@16]] دلوقتي، وراجع الـ peerDependencies قبل ما ترقّي.

Apollo Server: نفس الـ typeDefs والـ resolvers بالظبط، والفرق في طريقة التركيب ([[expressMiddleware]]) والـ plugins. والـ resolvers مش مربوطة بالسيرفر، فالنقل بينهم سهل.

وفيه طريقة تانية: code-first (زي Pothos) بتكتب الـ schema بـ TypeScript والـ SDL بيتولّد منها، فالأنواع في الـ resolvers مضبوطة لوحدها.`,
            when: "لما قررت GraphQL (الدرس اللي فات). وخلّي الـ resolvers رفيعة: بتنادي services، زي الـ controllers في REST.",
            mistakes: R`context واحد global لكل الطلبات. و [[take]] من غير حد في resolvers القوايم (العميل يطلب [[first: 100000]]). ومنطق الـ business كله جوه الـ resolvers فمتقدرش تستخدمه من REST أو job. وترجّع أخطاء القاعدة كما هي في [[errors]] (Yoga بيخفيها افتراضيًا في الإنتاج ويبعت «Unexpected error»، إلا لو رميت [[GraphQLError]] بنفسك).`
          },
          lines: [
            "السيرفر ودالة بناء الـ schema.",
            "الـ schema بـ SDL (التعليق بيخلي المحرر يلوّنها).",
            "المستخدم: الإيميل ممكن يبقى null (هنخفيه عن الغريب في درس الـ auth).",
            "المنشور وكاتبه.",
            "نقط الدخول للقراية: المنشورات (افتراضي ١٠)، والمستخدم الحالي.",
            "نقطة دخول للكتابة.",
            "قفلة الـ SDL.",
            "الـ resolvers بنفس شكل الـ schema.",
            "القراية:",
            "المنشورات بحد أقصى ٥٠ مهما طلب العميل.",
            "المستخدم الحالي من الـ context.",
            "قفلة.",
            "كاتب المنشور: من الـ loader مش استعلام لكل منشور (الدرس الجاي).",
            "منشورات المستخدم بحد.",
            "إنشاء منشور: لازم يكون مسجّل، والكاتب هو المستخدم الحالي مش حاجة جاية من الـ args.",
            "قفلة.",
            "اعمل السيرفر.",
            "الـ schema من الأنواع والـ resolvers.",
            "المسار.",
            "GraphiQL في التطوير بس.",
            "context جديد لكل طلب: المستخدم و loaders جديدة.",
            "قفلة.",
            "ركّبه في Express."
          ],
          sol: R`الـ query [[{ posts(first: 2) { title author { name } } }]] بيرجّع [[{"data":{"posts":[{"title":"...","author":{"name":"..."}}, ...]}}]]: نفس شكل الـ query بالظبط.

طلب حقل مش موجود بيرجّع قبل أي تنفيذ، ومن غير ما أي resolver يشتغل: [[{"errors":[{"message":"Cannot query field \"price\" on type \"Post\".","extensions":{"code":"GRAPHQL_VALIDATION_FAILED"}}]}]]. ولاحظ إن الـ status بيفضل 200 مع curl العادي: GraphQL over HTTP بيرجّع 200 مع [[application/json]]، و 4xx بس لو العميل طلب [[Accept: application/graphql-response+json]]. عشان كده المراقبة لازم تبص على [[errors]] جوه الـ body.

لو شفت [[Unexpected error]] أو خطأ فيه [[Cannot use GraphQLSchema from another module or realm]]، غالبًا عندك نسختين من [[graphql]] (شغّل [[npm ls graphql]]). ولو [[author]] رجع null مع [[!]]، الخطأ بيطلع في [[errors]] والمنشور كله بيبقى null: GraphQL بيطلّع الـ null لأقرب حقل يقبل null.`
        },
        {
          cmd: "DataLoader و N+1",
          title: "اجمع استعلامات الـ resolvers في استعلام واحد",
          desc: R`لو طلبت ٥٠ منشور ومع كل واحد الكاتب، resolver الـ [[author]] بيتنادى ٥٠ مرة، وكل مرة استعلام: ٥١ استعلام لطلب واحد. ده الـ N+1.

DataLoader بيحل ده: كل [[load(id)]] في نفس الـ tick بيتجمّع، وفي الآخر بيتنادى batch function واحدة بكل الـ ids، يعني استعلام واحد [[WHERE id IN (...)]]. وكمان بيعمل كاش للطلب: نفس الـ id مرتين = مرة واحدة.`,
          example: R`import DataLoader from "dataloader";
export function makeLoaders() {
  return {
    user: new DataLoader<string, User>(async (ids) => {
      const rows = await db.user.findMany({ where: { id: { in: [...ids] } } });
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btUser $__{id} not found$__bt));
    }),
    postsByAuthor: new DataLoader<string, Post[]>(async (authorIds) => {
      const rows = await db.post.findMany({ where: { authorId: { in: [...authorIds] } }, orderBy: { id: "desc" } });
      return authorIds.map((id) => rows.filter((p) => p.authorId === id));
    }),
  };
}`,
          try: R`عدّ الاستعلامات: زوّد عداد في كل نداء للقاعدة (أو شغّل Prisma بـ [[log: ["query"]]]). اطلب [[{ posts(first: 50) { title author { name } } }]] مرة والـ author resolver بيعمل [[db.user.findUnique]] مباشرة، ومرة بالـ loader. قارن العددين.`,
          flag: "script",
          deep: {
            why: "الـ N+1 هو أشهر مشكلة أداء في GraphQL، ومبيبانش في التطوير: ١٠ منشورات = ١١ استعلام سريعين على جهازك. في الإنتاج ١٠٠ منشور وكل واحد فيه تعليقات وكل تعليق ليه كاتب، والطلب الواحد بقى آلاف الاستعلامات.",
            how: R`DataLoader بيستغل طريقة شغل الـ event loop. الـ resolvers بتاعة الـ ٥٠ منشور بتتنادى ورا بعض في نفس الدورة، وكل واحد بيعمل [[load(id)]] ويرجّع Promise. DataLoader بيستنى لآخر الدورة الحالية، وبعدين ينادي الـ batch function مرة واحدة بكل الـ ids.

قاعدتين للـ batch function: ترجّع array بنفس طول الـ ids، وبنفس ترتيبهم. القاعدة مش بترجّع الصفوف بترتيب [[IN]]، وممكن متلاقيش بعضها. عشان كده الـ Map والـ [[ids.map]]. ولو id مش موجود، رجّع Error في مكانه (أو null لو الحقل بيقبل null)، مش تشيله من الـ array، وإلا كل النتايج اللي بعده هتتزحلق لـ ids غلط.

الكاش: DataLoader بيحفظ كل Promise بالـ id، فنفس الكاتب لـ ٢٠ منشور = id واحد في الاستعلام. والكاش ده لازم يعيش طول الطلب بس. عشان كده [[makeLoaders()]] بتتنادى في الـ context لكل طلب. لو عملته global، مستخدم هيشوف بيانات قديمة، أو بيانات اتجابت بصلاحيات مستخدم تاني.

علاقة one-to-many ([[postsByAuthor]]): الـ batch بيجيب كل منشورات كل الكتّاب في استعلام، ويقسّمها. خلي بالك: [[take]] هنا بيبقى على المجموع مش لكل كاتب، فلو محتاج «آخر ٥ لكل كاتب» محتاج SQL أذكى (window function أو LATERAL).

إزاي تعرف إن عندك N+1؟ شغّل log الاستعلامات وعدّها لكل طلب GraphQL، أو tracing (OpenTelemetry) بيوريك الاستعلامات تحت كل طلب. وفيه أدوات بتعمل تحذير لو عدد الاستعلامات عدّى حد.

ونفس المشكلة موجودة في REST برضه: loop بيعمل استعلام لكل عنصر (تاب «بناء مشروع كامل»، درس [[indexes و N+1]]). بس GraphQL بيخليها الوضع الافتراضي لو مخدتش بالك.`,
            when: "أي resolver لعلاقة (كاتب، أو تعليقات، أو منتج في طلب) بيتنادى جوه قايمة. عمليًا: أي resolver بيعمل [[findUnique]] بـ id جاي من الـ parent.",
            mistakes: R`loader global بكاش بيعيش للأبد. والـ batch function بترجّع الصفوف بترتيب القاعدة مش بترتيب الـ ids (bug بيطلّع كاتب غلط لمنشور، ومبيبانش غير لما الترتيب يختلف). وتشيل الـ ids اللي ملهاش صفوف فالطول يختلف و DataLoader يرمي error. و [[await]] جوه loop في resolver واحد ([[for (const id of ids) await loader.load(id)]]) فكل load في دورة لوحدها ومفيش تجميع: استخدم [[loader.loadMany(ids)]] أو [[Promise.all]].`
          },
          lines: [
            "المكتبة.",
            "بتتنادى لكل طلب في الـ context، فالكاش بيعيش طول الطلب ده بس.",
            "الـ loaders:",
            "loader للمستخدمين بالـ id. الدالة دي بتتنادى مرة واحدة بكل الـ ids اللي اتطلبت في نفس الدورة.",
            "استعلام واحد: WHERE id IN (...).",
            "Map بالـ id عشان نرتّب.",
            "رجّع بنفس ترتيب وطول الـ ids، و Error مكان أي id ملوش صف.",
            "قفلة.",
            "loader لعلاقة one-to-many: منشورات كل كاتب.",
            "استعلام واحد لكل الكتّاب.",
            "قسّمهم: لكل كاتب array بمنشوراته (ممكن تبقى فاضية).",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لـ ٥٠ منشور بين ١٠ كتّاب: من غير loader العداد بيطلع ٥١ (استعلام للمنشورات و ٥٠ للكتّاب، حتى لو الكاتب متكرر). بالـ loader بيطلع ٢: المنشورات، واستعلام [[IN]] واحد فيه ١٠ ids بس (الكاش شال التكرار).

لو لقيته لسه كبير بالـ loader: يا الـ loader بيتعمل جوه الـ resolver نفسه (كل نداء loader جديد، فمفيش تجميع)، يا فيه [[await]] جوه loop. ولو ظهر كاتب غلط على منشور: الـ batch function بترجّع [[rows]] بترتيب القاعدة بدل [[ids.map]].`
        },
        {
          cmd: "auth في resolvers",
          title: "مين يشوف أنهي حقل، وحد للاستعلامات العميقة",
          desc: R`في REST بتحمي endpoint. في GraphQL فيه endpoint واحد، والبيانات نفسها بتتوصل من طرق كتير: الإيميل ممكن يوصله من [[me]] أو من [[post.author]] أو من [[comment.author]]. فالصلاحية لازم تبقى على الحقل أو النوع نفسه، مش على الـ query.

وكمان العميل ممكن يكتب query متداخل ١٠ مستويات (منشور، كاتبه، منشوراته، كاتبها...) يوقّع السيرفر. الحل حد أقصى للعمق والحجم.`,
          example: R`import { createYoga, createGraphQLError } from "graphql-yoga";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
export function requireUser(ctx: Ctx) {
  if (!ctx.user) throw createGraphQLError("Login required", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
  return ctx.user;
}
const resolvers = {
  User: {
    email: (user: User, _a: unknown, ctx: Ctx) => (ctx.user?.id === user.id || ctx.user?.role === "admin" ? user.email : null),
  },
  Mutation: {
    deletePost: async (_p: unknown, args: { id: string }, ctx: Ctx) => {
      const me = requireUser(ctx);
      const { count } = await db.post.deleteMany({ where: { id: args.id, ...(me.role === "admin" ? {} : { authorId: me.id }) } });
      if (count === 0) throw createGraphQLError("Post not found", { extensions: { code: "NOT_FOUND" } });
      return true;
    },
  },
};
export const yoga = createYoga({ schema, context, plugins: [maxDepthPlugin({ n: 6 })], graphiql: false });`,
          try: R`اطلب [[{ posts { author { name email } } }]] من غير توكن، وبتوكن الكاتب نفسه، وبتوكن admin: الإيميل يظهر في الحالتين الأخيرتين بس. وبعدين ابعت query عمقه ٧ ([[posts { author { posts { author { posts { author { name } } } } } }]]) وشوف الرد.`,
          flag: "script",
          deep: {
            why: "BOPLA (تاب APIs المستوى ١، درس [[OWASP API Top 10]]) أسهل بكتير في GraphQL: حد يكتشف إن [[author]] بيرجّع [[email]] و [[phone]]، ويلف على كل المنشورات ويجمع بيانات كل الكتّاب. والـ introspection بيوريله كل الحقول الموجودة. والاستعلام العميق هجوم DoS بسطر واحد.",
            how: R`المستخدم بيتعرف مرة في الـ context (من الكوكي أو التوكن)، وكل resolver يقرر بنفسه. [[requireUser]] helper بيرمي لو مش مسجّل. [[createGraphQLError]] بيعمل خطأ بـ [[extensions.code]] العميل يقدر يتعامل معاه (UNAUTHENTICATED يروح لـ login، و FORBIDDEN يعرض رسالة). و [[http.status]] في الـ extensions بيخلي Yoga يرجّع 401 بدل 200.

صلاحية على الحقل ([[User.email]]): الـ resolver بيرجّع null للغريب. ده ليه الحقل في الـ schema [[String]] مش [[String!]]، عشان null مسموح. البديل إنك ترمي error، بس ده بيبوّظ باقي الرد لو الحقل مش بيقبل null.

صلاحية في الـ mutation: شرط الملكية جوه الاستعلام نفسه، زي REST بالظبط (BOLA). والـ admin استثناء واضح.

لو القواعد كترت، فيه مكتبات بتحطها في مكان واحد (graphql-shield)، أو directives في الـ schema زي [[@auth(requires: ADMIN)]]. المهم إنها تبقى على مستوى الحقل والنوع.

حدود الاستعلام: [[maxDepthPlugin]] بيرفض أي query أعمق من الحد قبل التنفيذ. وفيه plugins تانية من نفس المجموعة (GraphQL Armor): حد لعدد الحقول، وحد لعدد الـ aliases (العميل ممكن يطلب نفس الحقل ١٠٠٠ مرة بأسماء مختلفة في طلب واحد)، و cost limit بيدّي كل حقل «تكلفة» ويرفض لو المجموع عدّى. ومع الحدود دي: حد لـ [[first]] في كل قايمة، و rate limit على الـ endpoint، و timeout.

الـ introspection: بيوري الـ schema كلها لأي حد. في API داخلي (الفرونت بتاعك بس) اقفله في الإنتاج. وأقوى حماية هنا persisted queries: السيرفر بيقبل بس queries اتسجلت وقت الـ build، فمحدش يقدر يبعت query مكتوب بإيده.`,
            when: "من أول resolver بيرجّع بيانات مستخدم. والحدود من أول ما الـ endpoint يبقى على الإنترنت.",
            mistakes: R`تحمي [[Query.me]] وتنسى إن نفس الـ User بيوصل من [[post.author]] من غير حماية. والصلاحية في directive على الـ Query بس، والحقول المتداخلة مكشوفة. ورسايل خطأ بتفرّق بين «مش موجود» و «مش بتاعك». و introspection و GraphiQL مفتوحين في الإنتاج. ومفيش أي حد للعمق أو الحجم، أو حد للعمق بس والـ aliases مفتوحة.`
          },
          lines: [
            "السيرفر، و helper لأخطاء GraphQL بكود ومعلومات زيادة.",
            "plugin بيرفض الـ queries العميقة (من GraphQL Armor).",
            "helper: لازم يكون مسجّل.",
            "مش مسجّل؟ خطأ بكود UNAUTHENTICATED و HTTP 401.",
            "رجّع المستخدم.",
            "قفلة.",
            "الـ resolvers:",
            "على نوع User، في أي مكان يظهر فيه:",
            "الإيميل لصاحبه أو للأدمن بس، وغير كده null. الحماية على الحقل مش على الـ query.",
            "قفلة.",
            "الكتابة:",
            "مسح منشور:",
            "لازم مسجّل.",
            "امسح بشرط الملكية جوه الاستعلام (الأدمن يمسح أي حاجة).",
            "مش موجود أو مش بتاعه: نفس الرد في الحالتين.",
            "تم.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "السيرفر: حد أقصى للعمق ٦، ومن غير GraphiQL في الإنتاج."
          ],
          sol: R`من غير توكن: كل [[email]] بـ [[null]]. بتوكن الكاتب: الإيميل بتاعه بس اللي يظهر، والباقي null. بتوكن admin: كلهم يظهروا.

الـ query العميق بيرجّع من غير أي تنفيذ: [[{"errors":[{"message":"Syntax Error: Query depth limit of 6 exceeded, found 7."}]}]]. لو شفت [[Unexpected error]] بدل الرسالة دي، غالبًا الـ plugin شغال بنسخة graphql مختلفة عن Yoga ([[npm ls graphql]] هيوريك نسختين)، وده اللي حصل معانا مع graphql 17: الـ plugin لسه بيطلب 16.

وجرّب [[deletePost]] على منشور حد تاني بتوكن مستخدم عادي: لازم [[NOT_FOUND]]، مش [[FORBIDDEN]].`
        }
      ]
    },
    {
      t: "OIDC و SSO",
      l: 3,
      n: "الدخول بجوجل أو بحساب الشركة من جوه: الـ discovery، والتحقق من id_token بالمفاتيح العامة، و nonce، وخدمات بتكلّم بعض من غير مستخدم",
      items: [
        {
          cmd: "discovery document",
          title: "اعرف كل عناوين الـ IdP من URL واحد",
          desc: R`OIDC (OpenID Connect) طبقة فوق OAuth2: OAuth بيدّيك access token «مسموحلك تعمل كذا»، و OIDC بيضيف [[id_token]] «ده مين». وأي IdP (جوجل، أو Microsoft Entra، أو Okta، أو Keycloak، أو Auth0) بينشر ملف JSON على عنوان ثابت: [[/.well-known/openid-configuration]] تحت الـ issuer بتاعه.

الملف ده فيه كل اللي محتاجه: عنوان صفحة الدخول، وعنوان تبديل الـ code بـ tokens، وعنوان المفاتيح العامة (JWKS)، والخوارزميات المدعومة. فالكود بتاعك يشتغل مع أي IdP بتديله الـ issuer بس.`,
          example: R`curl -s https://accounts.google.com/.well-known/openid-configuration | jq '{issuer, authorization_endpoint, token_endpoint, jwks_uri, id_token_signing_alg_values_supported}'
curl -s https://www.googleapis.com/oauth2/v3/certs | jq -c '.keys[] | {kid, alg, kty, use}'
curl -s https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration | jq -r '.issuer, .jwks_uri'`,
          try: R`شغّل الأوامر، وبعدين اعمل decode محلي لأي id_token عندك (من تجربة درس [[OAuth]] في تاب «بناء مشروع كامل») بـ [[node -e]] و [[Buffer.from(part, "base64url")]]، مش على موقع أونلاين لأن التوكن ده بيدخّل: قارن الـ [[kid]] اللي في الـ header بالمفاتيح اللي رجعت من الأمر التاني، والـ [[iss]] باللي في الـ discovery.`,
          deep: {
            why: "من غيره بتكتب عناوين جوجل بإيدك في الكود (زي درس OAuth في «بناء مشروع كامل»)، ولما تضيف Microsoft أو IdP بتاع شركة عميل، تكتب عناوين تانية. والمفاتيح بتتغير كل كام يوم، فلو نسختها بإيدك، الدخول هيقع فجأة يوم ما جوجل تبدّلها.",
            how: R`أهم الحقول:

[[issuer]]: هوية الـ IdP. لازم يطابق [[iss]] في أي id_token بالظبط. وده اللي بتتحقق بيه إن التوكن جاي من المكان الصح.

[[authorization_endpoint]]: الصفحة اللي بتودّي المستخدم ليها. [[token_endpoint]]: السيرفر بتاعك بيعمل POST هنا يبدّل الـ code بـ tokens. [[userinfo_endpoint]]: بيانات إضافية بالـ access token. [[end_session_endpoint]] (لو موجود): تسجيل الخروج من الـ IdP.

[[jwks_uri]]: المفاتيح العامة اللي بيوقّع بيها الـ id_tokens، بصيغة JWKS (JSON Web Key Set). كل مفتاح ليه [[kid]] (key id)، والـ id_token فيه [[kid]] في الـ header بيقول اتوقّع بأنهي مفتاح. الـ IdP بينشر أكتر من مفتاح في نفس الوقت عشان يبدّلهم من غير ما حاجة تقع: المفتاح الجديد بيتنشر الأول، وبعد فترة يبدأ يوقّع بيه، وبعدها القديم يتشال.

[[id_token_signing_alg_values_supported]]: الخوارزميات. RS256 (RSA + SHA-256) الأشهر، و ES256 كمان منتشر. الاتنين asymmetric: الـ IdP بيوقّع بالمفتاح الخاص، وأي حد يتحقق بالعام. عكس HS256 (درس [[jwt.sign و jwt.verify]] في تاب «Backend بـ Node») اللي فيه نفس السر للتوقيع والتحقق، فمينفعش بين طرفين مختلفين.

Microsoft [[common]]: الـ issuer فيه [[{tenantid}]] حرفيًا، لأن كل شركة (tenant) ليها issuer مختلف. ده معناه إنك لازم تتحقق من الـ tenant في التوكن بنفسك، ودي نقطة بتقع فيها تطبيقات كتير (الدرس الأخير في الكاتيجوري دي).

الملف ده بيتكاش: بتجيبه مرة وقت التشغيل أو كل كام ساعة، مش في كل login.`,
            when: "أي تكامل مع IdP. والمكتبات (openid-client، و Auth.js، و Better Auth) بتقرا الملف ده لوحدها لما تدّيها الـ issuer.",
            mistakes: R`تنسخ الـ JWKS في ملف عندك. وتقارن الـ issuer بـ [[includes]] أو [[startsWith]] بدل مساواة. وتجيب الـ discovery في كل طلب. وتثق في issuer بتاع Microsoft [[common]] كأنه issuer واحد، فأي حساب Microsoft في الدنيا يدخل. وسؤال انترفيو: «إيه الفرق بين OAuth2 و OIDC؟»: OAuth2 للـ authorization (صلاحية على API)، و OIDC للـ authentication (مين المستخدم) بالـ id_token.`
          },
          lines: [
            "هات الـ discovery بتاع جوجل واعرض أهم الحقول: الـ issuer، وصفحة الدخول، وعنوان التوكنات، وعنوان المفاتيح، والخوارزميات.",
            "هات المفاتيح العامة: كل مفتاح بـ kid ونوعه (RSA) واستخدامه (sig = توقيع). غالبًا هتلاقي اتنين عشان التبديل.",
            "Microsoft: لاحظ إن الـ issuer فيه {tenantid}، لأن كل شركة ليها issuer."
          ],
          sol: R`الأمر الأول بيطلع issuer [[https://accounts.google.com]] و jwks_uri [[https://www.googleapis.com/oauth2/v3/certs]] والخوارزمية [[RS256]]. التاني بيطلع مفتاحين (أو أكتر) كل واحد بـ [[kid]] مختلف و [["alg":"RS256","kty":"RSA","use":"sig"]]. والتالت بيطلع [[https://login.microsoftonline.com/{tenantid}/v2.0]].

لما تعمل decode لـ id_token من جوجل: الـ header فيه [[{"alg":"RS256","kid":"..."}]] والـ kid ده لازم يبقى واحد من اللي في الأمر التاني (لو التوكن قديم ممكن تلاقيه اتشال، وده عادي بعد أيام). والـ payload فيه [[iss]] و [[aud]] (الـ client_id بتاعك) و [[sub]] و [[exp]] و [[nonce]] لو بعته.

ملحوظة: جوجل ممكن ترجّع [[iss]] بـ [[accounts.google.com]] من غير https، ووثايقها بتقول الاتنين صح. فلو بتتحقق من جوجل بالذات، اقبل القيمتين (الدرس الجاي).`
        },
        {
          cmd: "jose و JWKS",
          title: "اتحقق من id_token بالمفاتيح العامة صح",
          desc: R`التحقق من id_token مش decode. لازم ٤ حاجات: التوقيع صح بمفتاح من JWKS الـ IdP، و [[iss]] هو الـ IdP، و [[aud]] هو الـ client_id بتاعك، والتوكن مخلصش ([[exp]]). ومعاهم [[nonce]] (الدرس الجاي).

مكتبة [[jose]] بتعمل ده في سطرين: [[createRemoteJWKSet]] بيجيب المفاتيح ويكاشها ويعيد جلبها لو ظهر [[kid]] جديد، و [[jwtVerify]] بيعمل كل الفحوصات.`,
          example: R`import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
const discovery = await fetch("https://accounts.google.com/.well-known/openid-configuration").then((r) => r.json());
const JWKS = createRemoteJWKSet(new URL(discovery.jwks_uri));
export type IdClaims = JWTPayload & { email?: string; email_verified?: boolean; name?: string; nonce?: string };
export async function verifyIdToken(idToken: string, expectedNonce: string): Promise<IdClaims> {
  const { payload } = await jwtVerify<IdClaims>(idToken, JWKS, {
    issuer: [discovery.issuer, "accounts.google.com"],
    audience: config.GOOGLE_CLIENT_ID,
    algorithms: ["RS256"],
    clockTolerance: 30,
  });
  if (!expectedNonce || payload.nonce !== expectedNonce) throw new Error("nonce mismatch");
  return payload;
}`,
          try: R`اعمل IdP مزيف في نفس الملف: [[generateKeyPair("RS256")]]، واعرض المفتاح العام بـ [[exportJWK]] على [[/jwks]] من سيرفر صغير، ووقّع توكنات بـ [[SignJWT]]. جرّب ٥ توكنات: سليم، و aud غلط، ومتوقّع بمفتاح تاني، و [[alg: HS256]]، ومنتهي. كل واحد لازم يترفض بسبب مختلف.`,
          flag: "script",
          deep: {
            why: "id_token اللي مش متحقق منه صح = أي حد يدخل بأي حساب. أشهر الأخطاء: decode من غير تحقق، أو تحقق من التوقيع بس من غير aud (فتوكن اتعمل لتطبيق تاني عند نفس الـ IdP يدخل عندك)، أو قبول أي alg.",
            how: R`[[createRemoteJWKSet(url)]] بيرجّع دالة. أول تحقق بيجيب الـ JWKS ويحفظه. التحقق بيدوّر على المفتاح بالـ [[kid]] اللي في header التوكن. لو ملقاهوش (الـ IdP بدّل المفاتيح)، بيجيب الـ JWKS تاني. وفيه حمايتين: [[cooldownDuration]] (افتراضي ٣٠ ثانية) مبيعيدش الجلب أسرع من كده حتى لو جاله kid غريب (عشان حد ميبعتلكش توكنات بـ kid عشوائي يخليك تضرب الـ IdP)، و [[cacheMaxAge]] (افتراضي ١٠ دقايق) بيجدد المفاتيح دوريًا. والـ JWKS بيعيش في الذاكرة، فاعمله مرة على مستوى الـ module، مش جوه الدالة.

[[jwtVerify]] بيتحقق من:

التوقيع: بالمفتاح العام اللي الـ kid بيشاور عليه.

[[algorithms]]: الـ alg اللي في الـ header لازم يبقى من القايمة. ده بيقفل هجوم alg confusion: حد يبعت توكن بـ [[alg: HS256]] أو [[none]] ويخلي المكتبة تتحقق بطريقة غلط. jose مبتقبلش [[none]] أصلًا، ومبتسمحش باستخدام مفتاح RSA كسر HMAC، بس القايمة الصريحة بتقفل الباب تمامًا.

[[issuer]] و [[audience]]: لازم يطابقوا بالظبط. ينفع array لو فيه أكتر من قيمة صح (زي جوجل هنا). و [[aud]] في id_token هو الـ client_id بتاعك.

[[exp]] و [[nbf]]: jose بيتحقق منهم تلقائيًا. [[clockTolerance]] بيسمح بفرق ساعة صغير بين سيرفرك والـ IdP.

الأخطاء ليها [[code]]: [[ERR_JWT_EXPIRED]]، و [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]]، و [[ERR_JWT_CLAIM_VALIDATION_FAILED]]، و [[ERR_JOSE_ALG_NOT_ALLOWED]]. سجّلها في الـ logs عشان تفهم ليه الدخول بيفشل، بس رد على المستخدم برسالة عامة.

jose شغالة على Node و Bun و Deno و Edge و المتصفح (Web Crypto). ونفس الكود بيتحقق من access tokens جاية من IdP لـ API بتاعك (الـ audience ساعتها اسم الـ API مش الـ client_id)، ومن توكنات Supabase أو Clerk أو Auth0 بتوع مشروعك، كل واحد بالـ JWKS بتاعه.`,
            when: "أي مكان بيستقبل JWT اتوقّع من حد تاني: id_token في callback، أو من تطبيق موبايل بيبعت id_token من Google Sign-In، أو access token لـ API. التوكنات اللي انت بتعملها لنفسك بـ HS256 ليها درسها في تاب «Backend بـ Node».",
            mistakes: R`[[jwt.decode]] بدل verify. ومفيش audience. و [[createRemoteJWKSet]] جوه الدالة فكل login بيجيب المفاتيح من الأول. وتنسخ المفتاح العام في الكود فيقع يوم التبديل. وتقبل الـ alg اللي في الـ header من غير قايمة. وسؤال انترفيو: «إزاي الـ IdP بيبدّل مفاتيحه من غير ما التطبيقات تقع؟»: بينشر الجديد في JWKS قبل ما يوقّع بيه، والـ kid بيقول أنهي مفتاح، والعملاء بيعيدوا جلب الـ JWKS لما يشوفوا kid جديد.`
          },
          lines: [
            "الدوال اللي محتاجينها من jose.",
            "هات الـ discovery مرة وقت التشغيل.",
            "مصدر المفاتيح: بيجيبها ويكاشها، ويعيد جلبها لو ظهر kid جديد. مرة واحدة للـ module كله.",
            "شكل الـ claims اللي متوقعينها.",
            "دالة التحقق: التوكن والـ nonce اللي احنا بعتناه.",
            "اتحقق من التوقيع والـ claims:",
            "الـ issuer: جوجل بتستخدم الشكلين، فالاتنين مقبولين، وأي حاجة تانية لأ.",
            "الـ audience: التوكن لازم يكون معمول لتطبيقنا احنا.",
            "RS256 بس. أي alg تاني (HS256 أو none) مرفوض.",
            "سماح ٣٠ ثانية لفرق الساعة.",
            "قفلة.",
            "الـ nonce لازم يطابق اللي بعتناه في طلب الدخول ده بالظبط.",
            "رجّع الـ claims بعد ما اتأكدنا من كل حاجة.",
            "قفلة."
          ],
          sol: R`التوكن السليم بيعدّي ويرجّع الـ claims. والباقي بيترفض كده:

aud غلط: [[ERR_JWT_CLAIM_VALIDATION_FAILED]] و [[unexpected "aud" claim value]].
مفتاح تاني: [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]].
HS256: [[ERR_JOSE_ALG_NOT_ALLOWED]]، من غير ما يحاول يتحقق أصلًا.
منتهي (exp من دقيقتين، أكبر من الـ ٣٠ ثانية سماح): [[ERR_JWT_EXPIRED]].

ولو عدّيت عداد على [[/jwks]]، هتلاقيه اتنادى مرة واحدة لكل التجارب، لأن الـ JWKS متكاش. لو توكن بـ kid مش موجود، هيعيد الجلب مرة (لو فات ٣٠ ثانية على آخر جلب) وبعدين يرفض.`,
          solCode: R`import http from "node:http";
import { generateKeyPair, exportJWK, SignJWT, createRemoteJWKSet, jwtVerify } from "jose";
const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
const ISS = "http://localhost:4750";
http.createServer((req, res) => res.end(JSON.stringify({ keys: [jwk] }))).listen(4750);
const JWKS = createRemoteJWKSet(new URL(ISS + "/jwks"));
const verify = (t) => jwtVerify(t, JWKS, { issuer: ISS, audience: "my-client", algorithms: ["RS256"], clockTolerance: 30 });
const base = (aud = "my-client") => new SignJWT({ nonce: "n1" }).setIssuer(ISS).setAudience(aud).setSubject("u1");
const cases = {
  ok: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign(privateKey),
  wrongAud: await base("other").setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign(privateKey),
  otherKey: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime("5m").sign((await generateKeyPair("RS256")).privateKey),
  hs256: await base().setProtectedHeader({ alg: "HS256" }).setExpirationTime("5m").sign(new TextEncoder().encode("x".repeat(32))),
  expired: await base().setProtectedHeader({ alg: "RS256", kid: "k1" }).setExpirationTime(Math.floor(Date.now() / 1000) - 120).sign(privateKey),
};
for (const [name, t] of Object.entries(cases)) {
  try { await verify(t); console.log(name, "OK"); } catch (e) { console.log(name, e.code); }
}
process.exit(0);`
        },
        {
          cmd: "id_token و nonce",
          title: "الـ callback كامل: من الـ code لحد الـ session",
          desc: R`[[nonce]] قيمة عشوائية بتعملها مع كل محاولة دخول، وتبعتها في رابط الدخول جنب [[state]] (الـ state والـ PKCE في درس [[OAuth]] في تاب «بناء مشروع كامل»)، وتحفظها في كوكي. الـ IdP بيحطها جوه الـ id_token. ولما يرجع، لازم تلاقيها هي هي.

الـ state بيحمي الـ callback من CSRF، والـ nonce بيربط الـ id_token نفسه بالمحاولة دي، فتوكن اتسرق من محاولة تانية ميتقبلش. والمثال الـ callback كامل: قارن الـ state، وبدّل الـ code، واتحقق من الـ id_token (الدرس اللي فات)، واعمل session.`,
          example: R`router.get("/auth/google/callback", async (req, res) => {
  const saved = req.signedCookies.oidc ? JSON.parse(req.signedCookies.oidc) : null;
  res.clearCookie("oidc");
  if (!saved || typeof req.query.code !== "string" || req.query.state !== saved.state) return res.status(400).send("Invalid login attempt");
  const tokenRes = await fetch(discovery.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: req.query.code, redirect_uri: config.GOOGLE_REDIRECT_URI, client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, code_verifier: saved.verifier }),
  });
  if (!tokenRes.ok) return res.status(401).send("Login failed");
  const { id_token } = await tokenRes.json();
  const claims = await verifyIdToken(id_token, saved.nonce);
  if (claims.email_verified !== true) return res.status(403).send("Email not verified");
  const user = await upsertUserFromProvider({ provider: "google", subject: claims.sub!, email: claims.email!, name: claims.name });
  await startSession(res, user.id);
  res.redirect("/");
});`,
          try: R`كمّل على IdP المزيف من الدرس اللي فات: ضيف [[/token]] بيرجّع id_token فيه الـ nonce اللي جاله. جرّب الـ callback مرة سليم، ومرة الـ IdP بيرجّع nonce تاني، ومرة الـ state في الـ URL مختلف عن الكوكي. وبعدين حاول تفتح نفس لينك الـ callback مرتين.`,
          flag: "script",
          deep: {
            why: "الـ callback هو المكان اللي بيتقرر فيه «الشخص ده هو مين» في السيستم بتاعك. كل خطوة ناقصة فيه ثغرة معروفة: من غير state = login CSRF، ومن غير nonce = replay لـ id_token قديم، ومن غير تحقق من email_verified = حد يعمل حساب عند IdP بإيميلك ويدخل على حسابك.",
            how: R`الكوكي: [[state]] و [[nonce]] و [[verifier]] (PKCE) اتحفظوا في كوكي httpOnly عمرها ١٠ دقايق لحظة ما المستخدم داس «ادخل بجوجل». [[signed: true]] مع [[cookie-parser]] بسر بيخلي الكوكي متتعدلش. وأول حاجة في الـ callback: امسح الكوكي، عشان نفس المحاولة متتعادش (فتح اللينك مرتين يفشل التانية).

[[sub]] هو هوية المستخدم الثابتة عند الـ IdP، مش الإيميل. الإيميل بيتغير، وممكن حساب جديد ياخد إيميل قديم. فالربط في جدول الـ accounts بـ [[(provider, sub)]]، والإيميل معلومة جنبه.

تبديل الـ code: POST للـ [[token_endpoint]] من السيرفر، فيه الـ client_secret (مبيروحش للمتصفح أبدًا) والـ [[code_verifier]]. الرد فيه [[id_token]] و [[access_token]] (لو محتاج تكلّم APIs جوجل باسم المستخدم) وأحيانًا [[refresh_token]]. لو مش محتاج الـ access token، متخزّنهوش.

لما الـ id_token جاي مباشرة من الـ token endpoint على HTTPS، المواصفة بتقول التحقق من التوقيع ممكن يتجاوز. بس التحقق الكامل بـ jose مش مكلّف، وبيحميك لو حد غيّر الكود بعدين ونقل الـ id_token لمسار تاني (زي تطبيق موبايل بيبعته لك).

[[email_verified]]: لو هتربط بحساب موجود بالإيميل، لازم الإيميل يبقى متأكد عند الـ IdP، وكمان عندك (الفخ اللي في درس [[OAuth]] في «بناء مشروع كامل»).

بعد كل ده بتعمل الـ session بتاعتك العادية (كوكي، أو access + refresh). الـ id_token نفسه مش session ومتبعتهوش للفرونت يستخدمه كـ Bearer.

وفي الإنتاج: مكتبة زي [[openid-client]] (بتاعة نفس مؤلف jose) أو Auth.js أو Better Auth بتعمل الخطوات دي. المثال ده عشان لما حاجة تبوظ تعرف فين.`,
            when: "أي «ادخل بـ ...». ونفس الـ callback لأي IdP OIDC، بس بالـ discovery والـ client بتوعه.",
            mistakes: R`الإيميل هو المفتاح بدل sub. ومتمسحش الكوكي فالـ callback يتفتح مرتين. وتقارن الـ state من غير ما تتأكد إن الكوكي موجودة ([[undefined === undefined]] = true!). والـ nonce في localStorage أو في الـ URL. ورسايل خطأ مفصّلة للمستخدم («الـ nonce مش مطابق») بدل رسالة عامة و log مفصّل.`
          },
          lines: [
            "الـ callback اللي الـ IdP بيرجّع عليه.",
            "هات state و nonce و verifier من الكوكي الموقّعة (لو مش موجودة يبقى null).",
            "امسحها فورًا: المحاولة دي تتستخدم مرة واحدة بس.",
            "مفيش كوكي، أو مفيش code، أو الـ state مختلف: ارفض.",
            "بدّل الـ code بـ tokens...",
            "...POST...",
            "...form مش JSON (المواصفة كده)...",
            "...ومعاه الـ redirect_uri نفسه، والـ client secret (من السيرفر بس)، والـ verifier بتاع PKCE.",
            "قفلة.",
            "الـ IdP رفض (code مستخدم أو منتهي، أو verifier غلط): فشل عام.",
            "خد الـ id_token.",
            "اتحقق منه كامل، ومعاه الـ nonce اللي في الكوكي.",
            "الإيميل مش متأكد عند الـ IdP: متربطهوش بحاجة.",
            "لاقي أو اعمل المستخدم بـ (provider, sub)، مش بالإيميل.",
            "ابدأ الـ session بتاعتك العادية.",
            "رجّعه للموقع.",
            "قفلة."
          ],
          sol: R`السليم: بيعمل session ويعمل redirect لـ [[/]] (302).

nonce مختلف: [[verifyIdToken]] بيرمي [[nonce mismatch]]، والطلب بيطلع 500 لو مفيش error handler. الأصح تمسكه وترجّع 401 برسالة عامة وتسجّل السبب. ده معناه إن الـ id_token ده مش بتاع المحاولة دي.

state مختلف: 400 من السطر الرابع، من غير ما تكلّم الـ IdP خالص.

فتح اللينك مرتين: التانية بتطلع 400 لأن الكوكي اتمسحت في الأولى. ولو كانت الكوكي فضلت، الـ IdP نفسه كان هيرفض الـ code (بيتستخدم مرة واحدة)، فكنت هتاخد 401.`
        },
        {
          cmd: "client credentials",
          title: "خدمة بتكلّم خدمة من غير مستخدم",
          desc: R`مش كل طلب وراه مستخدم. خدمة الفواتير بتكلّم خدمة الطلبات كل ساعة، أو cron job بيكلّم API شريك. هنا بيتستخدم grant اسمه [[client_credentials]]: الخدمة بتبعت الـ client_id والـ secret بتوعها للـ token endpoint، وتاخد access token بصلاحيات محددة (scopes)، وتستخدمه كـ Bearer لحد ما يخلص.

مفيش redirect ولا متصفح ولا id_token، لأن مفيش «مين المستخدم». والتوكن بيتكاش لحد قبل ما يخلص بشوية.`,
          example: R`let cached: { token: string; expiresAt: number } | null = null;
export async function getServiceToken(): Promise<string> {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return cached.token;
  const basic = Buffer.from($__bt$__{encodeURIComponent(config.CLIENT_ID)}:$__{encodeURIComponent(config.CLIENT_SECRET)}$__bt).toString("base64");
  const res = await fetch(config.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: $__btBasic $__{basic}$__bt },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "invoices:write" }),
  });
  if (!res.ok) throw new Error($__bttoken endpoint $__{res.status}: $__{await res.text()}$__bt);
  const { access_token, expires_in } = await res.json();
  cached = { token: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}
const res = await fetch("https://billing.internal/v1/invoices", { method: "POST", headers: { Authorization: $__btBearer $__{await getServiceToken()}$__bt, "Content-Type": "application/json" }, body: JSON.stringify(invoice) });`,
          try: R`اعمل token endpoint مزيف بيتأكد من Basic auth و [[grant_type]]، ويرجّع توكن رقمه بيزيد مع كل طلب و [[expires_in: 3600]]. نادي [[getServiceToken()]] مرتين ورا بعض واطبع عدد التوكنات اللي اتعملت. وبعدين نادي ١٠ مرات مع بعض بـ [[Promise.all]] من أول مرة، وعدّ تاني.`,
          flag: "script",
          deep: {
            why: "البديل الشائع API key ثابت بين الخدمات مبيخلصش ومحدش بيغيّره، ولو اتسرب من log واحد الخدمة مكشوفة للأبد. client credentials بيدّي توكن عمره دقايق، بـ scopes محددة، والـ IdP بيسجّل مين طلب إيه، وتقدر تقفل خدمة واحدة من مكان واحد.",
            how: R`الطلب: POST للـ [[token_endpoint]] (من الـ discovery)، form-encoded، و [[grant_type=client_credentials]]، و scopes. والـ client بيعرّف نفسه بـ HTTP Basic (الـ id والـ secret متعمل لهم URL-encode، دي تفصيلة في المواصفة بتفرق لو فيهم رموز). وفيه IdPs بتقبلهم في الـ body كمان. والأقوى من الـ secret: [[private_key_jwt]] (الخدمة بتوقّع JWT بمفتاح خاص بدل ما تبعت سر) أو mTLS، ودول منتشرين في البنوك وفي الشركات الكبيرة.

الرد: [[access_token]] و [[expires_in]] بالثواني. غالبًا JWT، والـ API اللي بيستقبله بيتحقق منه بـ jose والـ JWKS بتاع الـ IdP (الدرس اللي فات بالظبط)، بس الـ [[audience]] بيبقى معرّف الـ API (زي [[https://billing.internal]])، ويتأكد من الـ [[scope]]. مفيش [[sub]] لمستخدم، الـ sub هو الخدمة نفسها أو الـ client_id.

الكاش: متطلبش توكن لكل request، الـ IdP عنده rate limit. خزّنه لحد قبل الانتهاء بدقيقة (عشان ميخلصش وهو في النص). ولو فيه طلبات كتير في نفس اللحظة والتوكن مش موجود، كلهم هيطلبوا توكن مع بعض. الحل تخزّن الـ Promise نفسه مش النتيجة، فكل اللي جم في نفس الوقت يستنوا نفس الطلب.

ولو الـ API رد 401، امسح الكاش واطلب توكن جديد مرة واحدة (ممكن الـ IdP لغاه قبل ميعاده).

فين الـ secret؟ في secret manager أو env على السيرفر، ويتغير دوريًا. وفي Kubernetes و Cloud فيه workload identity: المنصة نفسها بتدّي الخدمة هوية من غير secret خالص (تاب «Cloud و DevOps»).`,
            when: "أي خدمة بتكلّم خدمة من غير مستخدم: cron، و workers، و microservices، و B2B integrations. ولو فيه مستخدم، مرر هويته (أو استخدم token exchange) بدل ما الخدمة تشتغل بصلاحياتها هي.",
            mistakes: R`الـ secret في الكود أو في الفرونت (ده للسيرفر بس، دايمًا). وتطلب توكن مع كل request. وكاش بيرجّع توكن هيخلص بعد ثانية. و scopes واسعة ([[*]]) لكل خدمة. والـ API اللي بيستقبل بيتحقق من التوقيع بس ومش بيبص على aud و scope، فتوكن معمول لخدمة تانية يعدّي.`
          },
          lines: [
            "كاش في الذاكرة: التوكن وإمتى بيخلص.",
            "دالة بترجّع توكن صالح.",
            "لو عندنا واحد قدامه أكتر من دقيقة، رجّعه من غير طلب.",
            "Basic auth: id:secret بعد URL-encode، و base64.",
            "اطلب توكن جديد...",
            "...POST...",
            "...form، ومعاه هوية الخدمة...",
            "...النوع client_credentials، والصلاحية اللي محتاجينها بس.",
            "قفلة.",
            "رفض؟ ارمي بالتفاصيل (دي logs سيرفر، مش رد لمستخدم).",
            "التوكن ومدته بالثواني.",
            "خزّنه ومعاه وقت الانتهاء.",
            "رجّعه.",
            "قفلة.",
            "الاستخدام: Bearer في أي طلب لخدمة تانية."
          ],
          sol: R`مرتين ورا بعض: توكن واحد اتعمل ([[tok1 tok1 issued: 1]])، التانية جت من الكاش.

١٠ مع بعض من أول مرة: هتلاقي ١٠ توكنات اتعملت، لأن كل النداءات شافت الكاش فاضي قبل ما أول واحد يرجع. الحل تخزّن الـ Promise:`,
          solCode: R`let inflight: Promise<string> | null = null;
export function getServiceTokenOnce() {
  if (cached && cached.expiresAt - 60_000 > Date.now()) return Promise.resolve(cached.token);
  inflight ??= getServiceToken().finally(() => { inflight = null; });
  return inflight;
}
// Promise.all من ١٠ نداءات = توكن واحد`
        },
        {
          cmd: "SSO للشركات",
          title: "كل شركة عميلة تدخل بالـ IdP بتاعها",
          desc: R`لما تبيع لشركات، أول طلب من IT عندهم: «موظفينا يدخلوا بحساب الشركة (Entra أو Okta أو Google Workspace)، ولما حد يمشي يتقفل حسابه عندكم لوحده». ده SSO للشركات.

كل شركة (tenant) ليها «connection»: الـ issuer بتاع الـ IdP بتاعهم، و client_id و secret عملوهم لتطبيقك، والدومين بتاعهم. المستخدم يكتب إيميله، وانت تشوف الدومين، وتودّيه للـ IdP بتاع شركته. والبروتوكول يا OIDC (الدروس اللي فاتت)، يا SAML (أقدم، XML، ولسه منتشر جدًا في الشركات).`,
          example: R`router.post("/auth/sso/start", async (req, res) => {
  const email = z.email().parse(req.body.email).toLowerCase();
  const conn = await db.ssoConnection.findUnique({ where: { domain: email.split("@")[1] } });
  if (!conn?.enabled) return res.json({ method: "password" });
  const idp = await getDiscovery(conn.issuer);
  const { url, state, nonce, verifier } = buildAuthRequest(idp, { clientId: conn.clientId, redirectUri: $__bt$__{config.API_ORIGIN}/auth/sso/callback$__bt, loginHint: email });
  res.cookie("oidc", JSON.stringify({ state, nonce, verifier, connectionId: conn.id }), { httpOnly: true, secure: true, sameSite: "lax", maxAge: 600e3, signed: true });
  res.json({ method: "sso", redirectTo: url });
});
async function onSsoLogin(conn: SsoConnection, claims: IdClaims) {
  const email = String(claims.email).toLowerCase();
  if (!email.endsWith("@" + conn.domain)) throw new Error("email outside connection domain");
  return db.user.upsert({
    where: { ssoConnectionId_subject: { ssoConnectionId: conn.id, subject: claims.sub! } },
    create: { email, name: claims.name ?? email, orgId: conn.orgId, ssoConnectionId: conn.id, subject: claims.sub!, role: "member" },
    update: { email, name: claims.name ?? undefined },
  });
}`,
          try: R`صمم جدول [[SsoConnection]] (orgId، و domain فريد، و issuer، و clientId، و clientSecret متشفّر، و enabled) وجدول users فيه [[@@unique([ssoConnectionId, subject])]]. وبعدين اكتب ٣ حالات: إيميل دومينه ملوش connection، وإيميل دومينه عليه connection، وإيميل من دومين تاني رجع من IdP الشركة.`,
          flag: "script",
          deep: {
            why: "الشركات مبتشتريش أداة موظفينها لازم يعملوا فيها باسورد جديد: ده خطر أمني عندهم (باسوردات ضعيفة، وموظف مشي ولسه داخل). عشان كده SSO غالبًا شرط في أي صفقة enterprise، وناس كتير بتحطه في الخطة الأغلى.",
            how: R`الفلو: صفحة login فيها خانة إيميل الأول. السيرفر بيدوّر على الدومين: لو له connection مفعّل، بيبني رابط دخول للـ IdP بتاع الشركة (بنفس state و nonce و PKCE) ويرجّعه للواجهة تعمل redirect. [[login_hint]] بيملى الإيميل في صفحة الـ IdP. الـ callback هو هو، بس بيجيب الـ connection من الكوكي، ويتحقق من الـ id_token بالـ issuer والـ JWKS والـ client_id بتوع الشركة دي بالذات.

الأمان: التوكن الجاي من IdP شركة «أ» لازم ميقدرش يدخل حد على شركة «ب». عشان كده: التحقق بـ issuer الـ connection، والمستخدم بيترابط بـ [[(connection, sub)]] مش بالإيميل، والإيميل لازم يبقى من دومين الـ connection. وملكية الدومين نفسه: قبل ما تفعّل connection لـ [[acme.com]]، اتأكد إن العميل يملك الدومين (DNS TXT record)، وإلا أي حد يعمل connection لدومين شركة تانية ويستقبل موظفينها. وفي Microsoft [[common]] (multi-tenant) لازم تتأكد من الـ [[tid]] في التوكن، لأن الـ issuer بيتغير مع كل tenant.

JIT provisioning: أول دخول بيعمل المستخدم في الـ org تلقائيًا، زي المثال. وفيه شركات عايزة العكس (بس اللي IT ضافهم يدخلوا).

SCIM: بروتوكول (REST + JSON) الـ IdP بيكلّمك بيه لما موظف يتضاف أو يتشال أو يتغير. من غيره، الموظف اللي اتفصل يفضل حسابه عندك شغال لحد ما session بتاعته تخلص. SCIM هو اللي بيحقق «يتقفل لوحده».

SAML: نفس الفكرة بـ XML موقّع: الـ IdP بيبعت Assertion فيها المستخدم. التحقق من XML signatures صعب وكان ليه ثغرات كتير على مر السنين (XML signature wrapping)، فمتكتبهوش بنفسك أبدًا: استخدم مكتبة مشهورة ومحدّثة، أو خدمة.

خدمات جاهزة: WorkOS و Auth0 و Okta و Clerk و Keycloak (مفتوح المصدر، تشغّله بنفسك) بيدّوك OIDC و SAML و SCIM لكل عملائك من خلال integration واحدة، وبيدّوا IT عند العميل صفحة يعملوا منها الإعداد. وده غالبًا القرار الصح للفرق الصغيرة.

وتسجيل الخروج: logout من تطبيقك بيمسح الـ session بتاعتك بس. الخروج من الـ IdP كمان ([[end_session_endpoint]]) أو Single Logout موضوع تاني ومش كل IdP بيدعمه كويس.`,
            when: "أول عميل enterprise يطلبه. قبلها كفاية Google و Microsoft كـ «ادخل بـ». ولو هتدعم أكتر من ٢-٣ connections أو SAML، فكّر في خدمة بدل ما تبنيه.",
            mistakes: R`تربط بالإيميل فموظف من شركة تانية بنفس الإيميل (أو IdP بيرجّع أي إيميل) ياخد حساب حد. وتفعّل connection لدومين من غير إثبات ملكية. وتقبل multi-tenant issuer من غير فحص tid. ومفيش SCIM ولا مدة قصيرة للـ session، فالموظف المفصول لسه داخل. وتكتب SAML parser بنفسك.`
          },
          lines: [
            "بداية الدخول: الواجهة بتبعت الإيميل بس.",
            "اتحقق إنه إيميل، وحروف صغيرة.",
            "فيه connection للدومين ده؟",
            "لأ، أو مقفول: الواجهة تكمّل بالباسورد العادي.",
            "الـ discovery بتاع IdP الشركة دي (متكاش).",
            "ابني رابط الدخول بنفس state و nonce و PKCE، وبالـ client بتاع الشركة، والإيميل كـ hint.",
            "خزّن المحاولة ومعاها أنهي connection، عشان الـ callback يتحقق بمفاتيح الشركة دي بالذات.",
            "الواجهة تعمل redirect.",
            "قفلة.",
            "بعد ما الـ callback اتحقق من التوكن:",
            "الإيميل.",
            "لازم من دومين الشركة دي. IdP شركة «أ» ميدخلش حد على دومين «ب».",
            "لاقي أو اعمل المستخدم (JIT provisioning)...",
            "...بـ (connection, sub)، مش بالإيميل...",
            "...أول مرة: جوه الـ org بتاعة الشركة، بدور عادي...",
            "...بعد كده: حدّث الإيميل والاسم لو اتغيروا عند الشركة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الحالات التلاتة:

١. [[ahmed@gmail.com]] ومفيش connection لـ gmail.com: الرد [[{"method":"password"}]] والواجهة تعرض خانة الباسورد.

٢. [[mona@acme.com]] وفيه connection مفعّل: الرد [[{"method":"sso","redirectTo":"https://login.microsoftonline.com/..."}]]، وكوكي فيها الـ connectionId.

٣. IdP بتاع acme رجّع [[email: x@other.com]]: [[onSsoLogin]] بترمي، والدخول بيفشل. ده ممكن يحصل لو الـ IdP بيسمح بضيوف (guest users) من برّه الشركة.

والـ schema: [[domain String @unique]] في SsoConnection، و [[@@unique([ssoConnectionId, subject])]] في User، وده اللي بيدّي Prisma الاسم [[ssoConnectionId_subject]] اللي في الـ upsert. والـ clientSecret متشفّر في القاعدة، مش نص عادي.`
        }
      ]
    },
    {
      t: "Rate limiting موزّع",
      l: 3,
      n: "حدود بتشتغل صح على أكتر من سيرفر: token bucket و sliding window في Redis، و quota لكل خطة، والـ headers اللي بتقول للعميل يستنى قد إيه",
      items: [
        {
          cmd: "token bucket في Redis",
          title: "اسمح بـ burst وحافظ على متوسط ثابت",
          desc: R`كل عميل عنده «جردل» فيه tokens (مثلًا ١٠). كل طلب بياخد token، والجردل بيتملى بمعدل ثابت (مثلًا ٢ في الثانية) لحد الحد الأقصى. الجردل فاضي؟ 429.

النتيجة: العميل يقدر يبعت ١٠ طلبات مرة واحدة (burst)، بس على المدى الطويل ميعدّيش ٢ في الثانية. ولأن السيرفرات كتير، الجردل لازم يبقى في Redis، والقراية والتعديل لازم يحصلوا في خطوة واحدة atomic: عشان كده Lua script.`,
          example: R`redis.defineCommand("takeToken", {
  numberOfKeys: 1,
  lua: $__bt
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
    local t = redis.call("TIME")
    local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
    local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
    local tokens = math.min(capacity, (tonumber(b[1]) or capacity) + (now - (tonumber(b[2]) or now)) * rate / 1000)
    local allowed = 0
    if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
    redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
    redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))
    local waitMs = allowed == 1 and 0 or math.ceil((1 - tokens) * 1000 / rate)
    return { allowed, math.floor(tokens), waitMs }
  $__bt,
});
export async function takeToken(key: string, capacity: number, perSecond: number) {
  const [allowed, remaining, waitMs] = await (redis as any).takeToken($__btrl:tb:$__{key}$__bt, capacity, perSecond);
  return { allowed: allowed === 1, remaining, retryAfter: Math.ceil(waitMs / 1000) };
}`,
          try: R`نادي [[takeToken("k1", 10, 2)]] ١٢ مرة ورا بعض واطبع النتايج، واستنى ثانية ونادي ٣ كمان. وبعدين افتح key جديد ونادي ٥٠ مرة بالتوازي بـ [[Promise.all]] بـ capacity ١٠ ومعدل صغير جدًا: كام واحد اتسمح؟`,
          flag: "script",
          deep: {
            why: R`[[express-rate-limit]] بالـ store الافتراضي (تاب «Backend بـ Node») بيعدّ في ذاكرة كل process. مع ٣ سيرفرات ورا load balancer، الحد الحقيقي بقى ٣ أضعاف، وبيختلف حسب أنهي سيرفر الطلب وقع عليه. والـ APIs محتاجة سماح بـ burst (موبايل بيفتح وبيعمل ٨ طلبات مع بعض) من غير ما تسيب حد يعمل ألف طلب في الدقيقة.`,
            how: R`الفكرة إنك مش محتاج «تزوّد» tokens كل ثانية بـ timer. بتخزّن عدد الـ tokens ووقت آخر تحديث، ومع كل طلب بتحسب اللي اتملى من ساعتها: [[(now - ts) * rate / 1000]]، ومتعدّيش الـ capacity.

ليه Lua؟ لو عملت [[HMGET]] في Node وبعدين حسبت وبعدين [[HSET]]، طلبين على سيرفرين ممكن يقروا نفس القيمة (token واحد باقي) والاتنين ياخدوه. Redis بينفّذ الـ script كله من غير ما أي أمر تاني يدخل في النص، فالقراية والكتابة atomic. و [[defineCommand]] في ioredis بيبعت الـ script مرة ويناديه بالـ SHA بعد كده ([[EVALSHA]]).

الوقت من [[redis.call("TIME")]] مش من Node: كل السيرفرات بتستخدم ساعة واحدة (ساعة Redis)، فمفيش مشكلة لو ساعة سيرفر متأخرة ثانيتين.

[[PEXPIRE]]: بعد الوقت اللي الجردل بيتملى فيه كله، الـ key مالوش لازمة (لو اتشال، أول طلب جاي هيلاقيه مليان، وده نفس النتيجة). فالـ keys مبتتراكمش في Redis.

[[waitMs]]: لو مرفوض، قد إيه لحد ما يبقى فيه token واحد. ده اللي بيروح في [[Retry-After]].

المفتاح بيتحدد بإيه؟ الـ API key أو الـ user id للطلبات المسجّلة، والـ IP للمجهولين (والـ IP الحقيقي لو ورا proxy، مع [[trust proxy]] صح). وممكن حدود متعددة مع بعض: لكل مستخدم، ولكل endpoint غالي (login، أو AI، أو SMS)، و global.

بدايل: [[rate-limit-redis]] كـ store لـ express-rate-limit (fixed window في Redis)، ومكتبات زي [[rate-limiter-flexible]] فيها algorithms كتير جاهزة. والكود هنا عشان تفهم اللي جوه وتقدر تعدّل. وفي Nginx أو الـ API gateway فيه rate limit برضه (بالـ IP غالبًا)، وده خط دفاع أول مش بديل.`,
            when: "أي API عام أو فيه أكتر من سيرفر، وأي endpoint بيكلّف فلوس (AI، أو SMS، أو إيميل). token bucket مناسب لما عايز تسمح بـ burst.",
            mistakes: R`GET وبعدين SET من Node (race condition، وبيعدّي أكتر من الحد تحت الضغط). والوقت من [[Date.now()]] على كل سيرفر. ومفيش expire فالـ keys بتملى Redis. و [[capacity]] كبيرة جدًا فالـ burst نفسه هو الهجوم. وتعمل rate limit بالـ IP بس لـ API بيستخدمه شركات ورا NAT واحد. وسؤال انترفيو كلاسيكي: «صمم rate limiter موزّع»، والإجابة: algorithm (token bucket أو sliding window)، ومخزن مشترك (Redis)، وعملية atomic (Lua)، وحدود لكل key، وheaders، وإيه اللي يحصل لو Redis وقع (fail open ولا fail closed).`
          },
          lines: [
            "عرّف أمر جديد في ioredis من Lua script.",
            "بياخد key واحد (الجردل).",
            "الـ script:",
            "السعة القصوى.",
            "المعدل: tokens في الثانية.",
            "الوقت من ساعة Redis (ثواني وميكروثواني)...",
            "...بالملّي ثانية.",
            "هات الـ tokens ووقت آخر تحديث.",
            "الحالي = اللي كان + اللي اتملى من ساعتها، بحد أقصى السعة. أول مرة: الجردل مليان.",
            "مرفوض افتراضيًا.",
            "فيه token؟ خده واسمح.",
            "خزّن الحالة الجديدة.",
            "امسح الـ key بعد ما يتملى كله (مالوش لازمة بعدها).",
            "لو مرفوض: قد إيه لحد token واحد.",
            "رجّع: مسموح؟ وكام باقي، وقد إيه يستنى.",
            "قفلة الـ script.",
            "قفلة.",
            "الدالة اللي هتستخدمها.",
            "نادي الأمر بالـ key والإعدادات.",
            "رجّع النتيجة بشكل مريح، و retryAfter بالثواني.",
            "قفلة."
          ],
          sol: R`١٢ ورا بعض بـ capacity ١٠ ومعدل ٢: أول ١٠ مسموحين والباقي بينزل من ٩ لـ ٠، والـ ٢ الأخيرين مرفوضين بـ [[retryAfter: 1]]:

[[✓9 ✓8 ✓7 ✓6 ✓5 ✓4 ✓3 ✓2 ✓1 ✓0 ✗1s ✗1s]]

بعد ثانية ونص تقريبًا: اتملى ٢ tokens، فأول ٢ مسموحين والتالت مرفوض.

الـ ٥٠ بالتوازي: ١٠ بالظبط اتسمحوا. ده دليل إن الـ Lua script atomic. لو عملتها GET/SET من Node هتلاقي الرقم أكبر من ١٠ وبيتغير من مرة للتانية.

ولو كل الطلبات مرفوضة من الأول: غالبًا [[ARGV]] بتوصل نص ومش متحولة بـ [[tonumber]]، أو الـ rate صفر.`
        },
        {
          cmd: "sliding window",
          title: "حد لكل دقيقة من غير ثغرة حدود النافذة",
          desc: R`أبسط rate limit: fixed window. عداد لكل دقيقة ([[INCR]] على key فيه رقم الدقيقة)، ولو عدّى الحد 429. المشكلة: ١٠٠ طلب في آخر ثانية من دقيقة، و ١٠٠ في أول ثانية من الدقيقة اللي بعدها = ٢٠٠ في ثانيتين والحد ١٠٠.

الـ sliding window counter بيحل ده بتقريب ذكي: بيبص على عداد الدقيقة الحالية وعداد اللي فاتت، ويحسب «كام طلب في آخر ٦٠ ثانية» بوزن العداد القديم حسب الجزء اللي لسه جوه النافذة.`,
          example: R`export async function slidingWindow(key: string, limit: number, windowSec: number) {
  const nowSec = Date.now() / 1000;
  const w = Math.floor(nowSec / windowSec);
  const cur = $__btrl:sw:$__{key}:$__{w}$__bt;
  const prev = $__btrl:sw:$__{key}:$__{w - 1}$__bt;
  const [[, count], , [, prevCount]] = (await redis.multi().incr(cur).expire(cur, windowSec * 2).get(prev).exec())!;
  const elapsed = (nowSec % windowSec) / windowSec;
  const estimated = Number(prevCount ?? 0) * (1 - elapsed) + Number(count);
  if (estimated > limit) await redis.decr(cur);
  return { allowed: estimated <= limit, remaining: Math.max(0, Math.floor(limit - estimated)), resetSec: Math.ceil(windowSec - (nowSec % windowSec)) };
}`,
          try: R`نادي [[slidingWindow("u1", 5, 2)]] ٧ مرات ورا بعض، واستنى ٣ ثواني ونادي ٤ كمان. وبعدين شيل سطر الـ [[decr]] وكرر، وقارن التانية.`,
          flag: "script",
          deep: {
            why: "الحد «١٠٠ في الدقيقة» معناه عند العميل «في أي ٦٠ ثانية». الـ fixed window بيسمح بضعف الحد عند حدود الدقايق، والمهاجم بيعرف كده ويوقّت طلباته. والـ sliding log الكامل (تخزين وقت كل طلب) دقيق بس بياكل ذاكرة مع كل طلب.",
            how: R`التقريب: لو احنا في الثانية ١٥ من الدقيقة الحالية، يبقى آخر ٦٠ ثانية = ١٥ ثانية من الحالية + ٤٥ ثانية (٧٥٪) من اللي فاتت. فالتقدير = عداد الحالية + عداد اللي فاتت × ٠.٧٥. ده بيفترض إن طلبات الدقيقة اللي فاتت كانت موزعة بالتساوي، وفي الواقع الخطأ صغير (Cloudflare بتستخدم الطريقة دي وبتقول إن الخطأ في أقل من ١٪ من الطلبات تقريبًا).

[[MULTI]] هنا (مش Lua): الـ [[INCR]] نفسه atomic ويرجّع العدد بعد الزيادة، فكل طلب واخد رقمه الخاص، ومفيش اتنين بياخدوا نفس الرقم. [[EXPIRE]] بضعف النافذة عشان عداد الدقيقة الحالية لسه هيتقري كـ «اللي فاتت» في الدقيقة الجاية.

الـ [[DECR]] على الرفض: من غيره الطلبات المرفوضة بتتعد، والعميل اللي بيضرب بسرعة بيفضل مقفول حتى لو بطّل، لأن عداده بيكبر من الرفض نفسه. فيه ناس عايزين ده عمدًا (عقاب للي بيضرب). اختار عن قصد.

المقارنة:

fixed window: أبسط وأرخص، بس فيه burst الحدود.
sliding window counter: رخيص (عدادين)، ودقيق كفاية، ومفيش burst حقيقي.
sliding log (sorted set بوقت كل طلب): دقيق تمامًا، بس الذاكرة بتكبر مع عدد الطلبات.
token bucket: بيسمح بـ burst محدد عمدًا، وأنسب لـ «متوسط + سماح».

والـ fail mode: لو Redis وقع، تسمح بكل الطلبات (fail open، الخدمة شغالة بس من غير حماية) ولا ترفضها (fail closed)؟ لأغلب الـ APIs fail open مع alert، وللـ login والحاجات الغالية fail closed.`,
            when: "حدود «X في الدقيقة أو الساعة» على endpoints عامة، وحماية login و signup و reset password من التخمين.",
            mistakes: R`fixed window على login («٥ محاولات في الدقيقة» تبقى ١٠ في ثانيتين). والوقت من ساعة كل سيرفر في الحسبة ([[Date.now()]] هنا بيحدد النافذة، فساعات السيرفرات لازم تبقى متزامنة بـ NTP، أو انقل الحسبة لـ Lua بـ TIME). ونسيان expire. وتحسب بـ GET وبعدين INCR منفصلين.`
          },
          lines: [
            "الحد لكل key في نافذة بالثواني.",
            "الوقت دلوقتي بالثواني (بكسور).",
            "رقم النافذة الحالية.",
            "عداد النافذة الحالية.",
            "عداد اللي فاتت.",
            "في أمر واحد لـ Redis: زوّد الحالية وخد عددها، وخلّيها تعيش نافذتين، وهات عداد اللي فاتت.",
            "قد إيه عدّى من النافذة الحالية (من ٠ لـ ١).",
            "التقدير: الجزء اللي لسه جوه النافذة من القديمة + كل الحالية.",
            "مرفوض؟ متحسبوش، عشان الرفض نفسه ميطوّلش القفل.",
            "رجّع: مسموح؟ وكام باقي، وإمتى النافذة الحالية تخلص.",
            "قفلة."
          ],
          sol: R`أول ٧ بحد ٥ في ثانيتين: [[✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0]].

بعد ٣ ثواني: النافذة اتغيرت، والقديمة (فيها ٥ بس لأن المرفوضين اتشالوا بالـ decr) بتتحسب بجزء من وزنها، فيتسمح بطلبين أو تلاتة حسب اللحظة بالظبط، زي [[✓2 ✓1 ✓0 ✗0]].

من غير الـ decr: القديمة فيها ٧ (المرفوضين اتعدّوا)، فالتقدير بيبدأ فوق الحد، وممكن كل التانية تترفض. ده اللي قصدنا بـ «الرفض بيطوّل القفل».`
        },
        {
          cmd: "quota لكل plan",
          title: "حدود مختلفة لكل خطة، وheaders بتقول للعميل وضعه",
          desc: R`في API بتبيعه، الحدود جزء من المنتج: الخطة المجانية ١٠ طلبات في الثانية و ١٠٠٠ في الشهر، والـ Pro أكتر بكتير. فيه نوعين: rate limit قصير (حماية السيرفر، burst) و quota طويلة (شهرية، مربوطة بالفلوس).

والعميل لازم يعرف هو فين من غير ما يخمّن: headers في كل رد بتقول الحد وكام باقي، و 429 معاها [[Retry-After]].`,
          example: R`const PLANS = {
  free: { burst: 10, perSecond: 1, monthly: 1_000 },
  pro: { burst: 100, perSecond: 20, monthly: 1_000_000 },
} as const;
export async function planLimits(req: Request, res: Response, next: NextFunction) {
  const plan = PLANS[req.apiKey.plan];
  const rl = await takeToken(req.apiKey.id, plan.burst, plan.perSecond);
  res.set("RateLimit-Policy", $__bt"burst";q=$__{plan.burst};w=$__{Math.ceil(plan.burst / plan.perSecond)}$__bt);
  res.set("RateLimit", $__bt"burst";r=$__{rl.remaining};t=$__{rl.retryAfter}$__bt);
  if (!rl.allowed) return res.status(429).set("Retry-After", String(rl.retryAfter)).json({ title: "Too Many Requests", status: 429 });
  const qKey = $__btquota:$__{req.apiKey.id}:$__{new Date().toISOString().slice(0, 7)}$__bt;
  const [[, used]] = (await redis.multi().incr(qKey).expire(qKey, 32 * 86400, "NX").exec())!;
  res.set("X-Quota-Remaining", String(Math.max(0, plan.monthly - Number(used))));
  if (Number(used) > plan.monthly) return res.status(429).json({ title: "Monthly quota exceeded", status: 429, detail: $__btPlan $__{req.apiKey.plan}: $__{plan.monthly} requests/month$__bt });
  next();
}`,
          try: R`حط الـ middleware على endpoint، وابعت ١٢ طلب بمفتاح free بسرعة ([[for i in $(seq 12); do curl -s -o /dev/null -w '%{http_code} ' ...; done]]). وبعدين [[curl -i]] وشوف الـ headers في حالة 429، واطلب بمفتاح pro وقارن.`,
          flag: "script",
          deep: {
            why: "من غير headers، العميل بيكتشف الحد لما يقع فيه، وبيعمل retry فوري فيتقفل أكتر. ومن غير quota مربوطة بالخطة، مفيش فرق بين المجاني والمدفوع، ومفيش سبب حد يرقّي. وأي API فيه AI أو SMS لازم quota، وإلا عميل مجاني واحد يصرف ميزانية الشهر في يوم.",
            how: R`طبقتين بسبب مختلف:

rate limit (token bucket من درسين فاتوا): بيحمي السيرفر من الضغط اللحظي. الرفض مؤقت، و [[Retry-After]] بالثواني.

quota شهرية: عداد لكل مفتاح لكل شهر ([[quota:key:2026-09]]). [[INCR]] atomic، و [[EXPIRE ... NX]] (Redis 7 وأحدث) بيحط مدة للـ key أول مرة بس، فالعداد بيتمسح لوحده بعد الشهر. الرفض هنا مش «استنى ثانية»، ده «رقّي أو استنى الشهر الجاي»، عشان كده الرسالة مختلفة.

الـ headers: فيه draft في IETF لـ headers موحّدة: [[RateLimit-Policy]] بيوصف السياسة ([[q]] الحصة، و [[w]] النافذة بالثواني)، و [[RateLimit]] بيوصف الحالة ([[r]] الباقي، و [[t]] الثواني لحد ما يتجدد). الشكل اتغير بين نسخ الـ draft (النسخ القديمة كانت [[RateLimit-Limit]] و [[RateLimit-Remaining]] و [[RateLimit-Reset]] منفصلين، ودي اللي GitHub وغيره بيبعتوها بـ [[X-]] قبلها)، فاختار شكل وثبّته في التوثيق. [[Retry-After]] نفسه standard قديم ومفهوم لكل المكتبات.

فين تخزّن الـ usage للفواتير؟ Redis للعدّ السريع والحد، بس الأرقام اللي بتحاسب بيها لازم تتسجل في القاعدة (job كل ساعة ينقل العدادات، أو event لكل طلب في جدول usage). Redis مش مصدر الحقيقة للفلوس.

الحد لكل endpoint: [[GET /things]] رخيص، و [[POST /reports]] غالي. ممكن تدّي كل endpoint «تكلفة» وتسحب من الجردل أكتر من token، أو quota منفصلة للحاجات الغالية.

وافصل الـ quota عن الـ rate limit في الـ monitoring: عميل بيوصل للـ quota = فرصة بيع، وعميل بيوصل للـ rate limit كتير = يمكن الـ SDK بتاعه بيعمل retry غلط.`,
            when: "أي API ليه خطط أو عملاء خارجيين، أو أي ميزة بتكلّفك فلوس لكل استخدام.",
            mistakes: R`429 من غير [[Retry-After]]، فالعميل بيعيد فورًا. ورسالة واحدة للـ rate limit والـ quota فالعميل ميعرفش يستنى ثانية ولا شهر. والـ quota في Redis بس من غير سجل في القاعدة، ويوم Redis يقع تضيع أرقام الفواتير. وتعدّ الطلبات اللي فشلت بـ 5xx من عندك في quota العميل. و EXPIRE من غير NX فكل طلب بيمدّ عمر الـ key ومبيتمسحش أبدًا.`
          },
          lines: [
            "الخطط في مكان واحد.",
            "المجانية: burst ١٠، وواحد في الثانية، وألف في الشهر.",
            "Pro.",
            "قفلة.",
            "middleware بعد الـ auth بالـ API key (req.apiKey موجود).",
            "حدود خطة العميل ده.",
            "rate limit قصير بالـ token bucket.",
            "headers السياسة: الحصة ومدة ما الجردل يتملى.",
            "headers الحالة: كام باقي، وبعد كام ثانية.",
            "مرفوض؟ 429 و Retry-After، بشكل problem+json.",
            "key الـ quota: المفتاح والشهر (2026-09).",
            "زوّد العداد، وحط له مدة أول مرة بس (NX).",
            "قول للعميل كام باقي في الشهر.",
            "خلص الشهر؟ 429 برسالة مختلفة: دي مش «استنى ثانية».",
            "كمّل.",
            "قفلة."
          ],
          sol: R`بمفتاح free: [[200]] عشر مرات وبعدين [[429 429]]. و [[curl -i]] في حالة 429 بيطلّع:

[[RateLimit-Policy: "burst";q=10;w=10]]
[[RateLimit: "burst";r=0;t=1]]
[[Retry-After: 1]]

وبمفتاح pro: [[RateLimit-Policy: "burst";q=100;w=5]] و [[RateLimit: "burst";r=99;t=0]] و [[X-Quota-Remaining: 999999]].

لو [[expire ... NX]] رمى [[ERR syntax error]]، الـ Redis عندك أقدم من 7. يا ترقّيه (الـ lab بتاع التاب ده redis:8)، يا تعمل [[EXPIRE]] بس لما [[used === 1]].`
        }
      ]
    },
    {
      t: "Queues والأحداث",
      l: 3,
      n: "queue ولا pub/sub ولا stream، ولما الـ job تفشل كل المحاولات تروح فين، وإزاي تحفظ في القاعدة وتنشر event من غير ما واحد منهم يضيع",
      items: [
        {
          cmd: "queue ولا pub/sub ولا stream",
          title: "تلات طرق لتوصيل رسالة، وكل واحدة لحاجة",
          desc: R`queue: كل رسالة بيستلمها worker واحد بس، ولو محدش فاضي بتستنى. ده شغل لازم يتعمل مرة (إيميل، أو صورة). BullMQ (درس [[background jobs]] في تاب «بناء مشروع كامل») queue فوق Redis.

pub/sub: كل المشتركين دلوقتي بيستلموا الرسالة، واللي مش متصل لحظتها ضاعت عليه. ده للإشعارات اللحظية (الـ Redis adapter في المستوى ٢).

stream: log متخزن بالترتيب، وكل مجموعة مستهلكين (consumer group) ليها مكانها فيه. كل مجموعة بتشوف كل الرسايل، وجوه المجموعة كل رسالة لواحد بس. ولو حد وقع، رسايله بتفضل pending لحد ما حد يأكدها. Redis Streams و Kafka من النوع ده.`,
          example: R`redis-cli PUBLISH order.paid '{"orderId":9001}'
redis-cli LPUSH jobs '{"type":"receipt","orderId":9001}'
redis-cli BRPOP jobs 5
redis-cli XADD orders '*' type paid orderId 9001
redis-cli XGROUP CREATE orders emails 0
redis-cli XGROUP CREATE orders analytics 0
redis-cli XREADGROUP GROUP emails worker-1 COUNT 10 STREAMS orders '>'
redis-cli XREADGROUP GROUP analytics a-1 COUNT 10 STREAMS orders '>'
redis-cli XPENDING orders emails
redis-cli XACK orders emails 1790714741624-0`,
          try: R`شغّل الأوامر بالترتيب (مع Redis من الـ lab). لاحظ رقم الـ PUBLISH، وإن BRPOP رجّع الـ job. وبعد الـ XADD خد الـ id اللي رجع واستخدمه في XACK. وبعدين افتح terminal تاني فيه [[redis-cli SUBSCRIBE order.paid]] وكرر الـ PUBLISH.`,
          deep: {
            why: "اختيار النوع الغلط بيعمل bugs مبتبانش غير تحت الضغط: إيميلات بتتبعت مرتين لأن كل السيرفرات مشتركة في pub/sub، أو أحداث بتضيع وقت deploy لأن pub/sub مبيخزّنش، أو خدمة جديدة محتاجة الأحداث القديمة ومفيش مكان فيه تاريخ.",
            how: R`queue ([[LPUSH]] و [[BRPOP]]، أو BullMQ): الرسالة بتتشال لما worker ياخدها. عشرة workers = الشغل بيتقسم عليهم. BullMQ بيضيف retries، و delays، وأولويات، وحالة لكل job، وبيحمي من إن الـ job تضيع لو الـ worker وقع في النص (بترجع للـ queue بعد ما الـ lock بتاعها يخلص).

pub/sub ([[PUBLISH]] و [[SUBSCRIBE]]): fire-and-forget. الرقم اللي PUBLISH بيرجّعه = عدد المشتركين اللي استلموا. صفر يعني الرسالة راحت في الفاضي. سريع جدًا ومناسب لـ «ابعت لكل السيرفرات دلوقتي» (امسح الكاش المحلي، أو وصّل socket)، ومش مناسب لأي حاجة لازم تتعمل.

stream ([[XADD]] و [[XREADGROUP]] و [[XACK]]): الرسايل متخزنة بـ ids متزايدة (الـ id فيه الوقت بالملّي ثانية). كل consumer group بيعرف آخر حاجة اتسلمتله. الـ [[>]] معناها «رسايل جديدة محدش في المجموعة استلمها». الرسالة بتفضل في الـ PEL (pending entries list) لحد [[XACK]]. لو worker وقع، رسالته pending، وحد تاني ياخدها بـ [[XAUTOCLAIM]] بعد مدة. والمجموعة الجديدة تقدر تبدأ من الأول (الـ [[0]] في XGROUP CREATE) وتقرا التاريخ كله. و [[MAXLEN]] مع XADD بيحدد الحجم عشان الـ stream ميكبرش للأبد.

Kafka و Redpanda: نفس فكرة الـ stream على نطاق ضخم، بـ partitions وتخزين على disk لأيام أو أسابيع. RabbitMQ: queues و exchanges (routing مرن) وفيه streams كمان. و SQS/SNS في AWS: SQS queue و SNS pub/sub. ومعظم المشاريع الصغيرة والمتوسطة BullMQ أو Redis Streams كفاية.

القاعدة: «لازم يتعمل مرة» = queue. «كل اللي مهتم يعرف، ولو فاته مش مهم» = pub/sub. «كل خدمة لازم تشوف كل حدث، بالترتيب، حتى لو كانت واقعة» = stream.

وكل التلاتة at-least-once في أحسن الأحوال: الرسالة ممكن توصل مرتين (worker عمل الشغل ووقع قبل الـ ACK). فالمستهلك لازم يبقى idempotent (نفس فكرة Idempotency-Key في المستوى ١، بالـ event id).`,
            when: "queue للشغل في الخلفية. pub/sub للإشارات اللحظية بين السيرفرات. stream لما أكتر من خدمة محتاجة نفس الأحداث، أو محتاج replay، أو event sourcing.",
            mistakes: R`pub/sub لإرسال إيميلات (كل سيرفر مشترك بيبعت، أو محدش مشترك وقت الـ deploy فمحدش بيبعت). و stream من غير XACK فالـ PEL بيكبر، ومن غير MAXLEN فالذاكرة بتكبر. وتفتكر إن أي واحد فيهم exactly-once. وسؤال انترفيو: «الفرق بين Kafka و RabbitMQ؟»: Kafka log متخزن والمستهلك بيحدد مكانه ويقدر يرجع، و RabbitMQ broker بيوزّع الرسايل ويشيلها بعد الـ ACK.`
          },
          lines: [
            "pub/sub: انشر. الرقم اللي بيرجع = كام مشترك استلم (غالبًا ٠ دلوقتي، فالرسالة ضاعت).",
            "queue بسيطة: حط job في list.",
            "worker بياخدها (ويستنى لحد ٥ ثواني لو فاضية). اتشالت من الـ list، ومحدش تاني هياخدها.",
            "stream: ضيف حدث. الـ * معناها Redis يولّد id فيه الوقت.",
            "مجموعة مستهلكين للإيميلات، تبدأ من أول الـ stream.",
            "ومجموعة تانية للتحليلات: هتشوف نفس الأحداث بشكل مستقل.",
            "worker في مجموعة الإيميلات ياخد الرسايل الجديدة.",
            "ومجموعة التحليلات تاخد نفس الرسالة.",
            "الرسايل اللي اتسلمت لمجموعة الإيميلات ولسه محدش أكدها.",
            "أكّد إن الرسالة خلصت (بالـ id اللي رجع من XADD عندك). بعدها بتتشال من الـ pending."
          ],
          sol: R`الـ PUBLISH بيرجّع [[0]] لو مفيش حد عامل SUBSCRIBE: الرسالة اتنشرت ومحدش سمعها، وخلاص ضاعت. ولما تفتح terminal بـ SUBSCRIBE وتعيد، بيرجّع [[1]] والـ terminal التاني يطبعها.

الـ BRPOP بيرجّع اسم الـ list والـ job. لو عملته تاني، هيستنى ٥ ثواني ويرجع [[(nil)]]: الـ job اتاخدت مرة واحدة.

الـ XADD بيرجّع id زي [[1790714741624-0]]. المجموعتين كل واحدة بتستلم نفس الرسالة. XPENDING لمجموعة الإيميلات بيقول [[1]] ومعاه اسم الـ worker. بعد XACK بالـ id بتاعك (مش اللي في المثال)، XPENDING يرجع [[0]]. ولو XACK رجّع [[0]]، الـ id غلط.`
        },
        {
          cmd: "dead-letter queue",
          title: "الـ job اللي فشلت كل محاولاتها تروح فين",
          desc: R`الـ job بتتعاد لحد [[attempts]] (درس [[background jobs]] في «بناء مشروع كامل»). بس لو فشلت كل المحاولات؟ لو سبتها في failed وخلاص، محدش هيبص عليها. الـ dead-letter queue (DLQ) مكان منفصل للرسايل «الميتة»: بتروحله بكل تفاصيلها وسبب الفشل، وفيه alert، وحد يبص ويصلّح ويرجّعها (redrive).

وفيه أخطاء ملهاش لازمة تتعاد أصلًا (العميل مسح الـ endpoint، أو الداتا بايظة): دي ترمي [[UnrecoverableError]] فتفشل فورًا من غير retries.`,
          example: R`import { Queue, Worker, UnrecoverableError } from "bullmq";
const webhooks = new Queue("webhooks", { connection, defaultJobOptions: { attempts: 8, backoff: { type: "exponential", delay: 30_000 } } });
const dead = new Queue("webhooks-dead", { connection });
const worker = new Worker("webhooks", async (job) => {
  const res = await deliver(job.data);
  if (res.status === 410) throw new UnrecoverableError("endpoint gone");
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
}, { connection, concurrency: 20 });
worker.on("failed", async (job, err) => {
  if (!job || (job.attemptsMade < (job.opts.attempts ?? 1) && !(err instanceof UnrecoverableError))) return;
  await dead.add("dead", { queue: job.queueName, jobId: job.id, data: job.data, error: err.message, failedAt: new Date().toISOString() });
  alerts.notify($__btwebhook job $__{job.id} is dead: $__{err.message}$__bt);
});
export async function redrive(limit = 100) {
  for (const j of await dead.getJobs(["waiting"], 0, limit - 1)) {
    await webhooks.add("deliver", j.data.data);
    await j.remove();
  }
}`,
          try: R`اعمل job بـ URL بيرجّع 500 دايمًا، بـ [[attempts: 3]] و delay ١٠٠ ملّي ثانية للتجربة. بعد ثانيتين اطبع اللي في الـ DLQ. وبعدين صلّح الـ URL (خلّي السيرفر يرجع 200) ونادي [[redrive()]].`,
          flag: "script",
          deep: {
            why: "من غير DLQ الفشل صامت: webhook لعميل مبيوصلش من أسبوع، أو إيصال دفع متبعتش، ومحدش يعرف غير لما العميل يشتكي. الـ DLQ بيحوّل «فشل» لـ «مهمة ليها صاحب»: فيه alert، وفيه مكان تشوف فيه كل الحالات، وزرار تعيدها.",
            how: R`الـ event [[failed]] على الـ Worker بيتنادى مع كل فشل، حتى لو لسه فيه محاولات. [[job.attemptsMade]] عدد المحاولات اللي حصلت، و [[job.opts.attempts]] الحد. لما يوصلوا لبعض (أو الخطأ Unrecoverable)، دي آخر مرة، فتنقلها للـ DLQ.

ليه queue منفصلة ومش سيبها في failed؟ الـ failed set في BullMQ بيتنضف بـ [[removeOnFail]]، وبيختلط فيه كل حاجة. الـ DLQ ليها صلاحيات وتنبيهات ولوحة (Bull Board بيعرضها زي أي queue). وتقدر تحط فيها سياق زيادة: السبب، والوقت، ومين العميل.

[[UnrecoverableError]]: BullMQ بيفهمه وبيوقف الـ retries فورًا. استخدمه لأي خطأ الإعادة مش هتحله: 4xx من العميل (غير 408 و 429)، أو داتا مش valid، أو resource اتمسح.

الـ redrive: بعد ما تصلّح السبب، ترجّع الـ jobs للـ queue الأصلية. خليه على دفعات وبـ rate معقول، عشان ١٠ آلاف job ميتعادوش في ثانية واحدة ويوقعوا اللي لسه قايم. ولو السبب لسه موجود، هيرجعوا للـ DLQ تاني.

خلي بالك: [[worker.on("failed")]] بيشتغل في process الـ worker. لو الـ worker وقع بين الفشل والإضافة للـ DLQ، ممكن تفوتك. للحالات الحساسة [[QueueEvents]] (بيسمع من Redis لكل الـ workers)، أو تعمل الإضافة جوه الـ processor نفسه قبل ما ترمي آخر مرة.

في الأنظمة التانية: SQS فيه redrive policy جاهزة (بعد N مرات تروح لـ queue تانية)، و RabbitMQ فيه dead-letter exchange، و Kafka مفيهوش DLQ built-in والناس بتعمل topic منفصل للرسايل البايظة.`,
            when: "أي queue فيها شغل مهم للعميل أو للفلوس: webhooks، وإيصالات، ومزامنة مع أنظمة تانية.",
            mistakes: R`retries لا نهائية على خطأ مش مؤقت (ضغط على السيرفر التاني على الفاضي). و DLQ من غير alert ولا حد بيبص عليها (بقت مقبرة). و redrive للكل مرة واحدة. وتنقل للـ DLQ مع كل فشل، مش آخر فشل بس. وتحط الـ payload كامل وفيه بيانات حساسة في DLQ مفتوحة لكل الفريق.`
          },
          lines: [
            "BullMQ، والخطأ اللي بيوقف الـ retries.",
            "الـ queue الأصلية: ٨ محاولات بـ backoff أسّي يبدأ من ٣٠ ثانية.",
            "الـ DLQ: queue عادية محدش بيشغّلها أوتوماتيك.",
            "الـ worker:",
            "حاول توصّل.",
            "410 Gone: العميل شال الـ endpoint، الإعادة مالهاش لازمة.",
            "أي فشل تاني: ارمي عادي فيتعاد.",
            "٢٠ job بالتوازي.",
            "مع كل فشل:",
            "لسه فيه محاولات والخطأ مش نهائي؟ متعملش حاجة.",
            "آخر فشل: انقلها للـ DLQ بكل السياق.",
            "ونبّه حد.",
            "قفلة.",
            "إعادة الميتين بعد ما السبب يتصلّح...",
            "...على دفعات...",
            "...رجّعها للـ queue الأصلية...",
            "...وشيلها من الـ DLQ.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بعد ثانيتين: الـ worker اتنادى ٣ مرات للـ job البايظة، والـ DLQ فيها واحدة شكلها كده:

[[{ queue: "webhooks", jobId: "2", data: { url: ".../broken" }, error: "HTTP 500", failedAt: "..." }]]

والـ job الأصلية في failed بتاع [[webhooks]] (عدد ١). بعد الـ redrive: الـ DLQ فاضية، و job جديدة في [[webhooks]]، ولما الـ URL يرجع 200 تنجح.

لو الـ DLQ فيها ٣ نسخ من نفس الـ job: الشرط بتاع «آخر محاولة» غلط (بتنقل مع كل فشل). ولو فاضية خالص: [[attempts]] متحطتش على الـ job فالقيمة ١ والـ backoff مش شغال، أو الـ event مش متسجّل قبل ما الـ job تفشل.`
        },
        {
          cmd: "transactional outbox",
          title: "احفظ في القاعدة وانشر الحدث من غير ما واحد يضيع",
          desc: R`«الطلب اتدفع» لازم يتحفظ في القاعدة، ولازم event يروح للـ queue (إيصال، وشحن، وتحليلات). لو حفظت وبعدين نشرت، والسيرفر وقع بينهم: الطلب مدفوع ومحدش عرف. ولو نشرت الأول والـ transaction فشلت: إيصال لطلب مدفعش. مفيش transaction واحدة بتجمع Postgres و Redis.

الـ outbox: بتكتب الحدث في جدول [[outbox]] في نفس الـ transaction مع التعديل. يا الاتنين يتحفظوا يا مفيش. وبعدين process منفصلة (relay) بتقرا الأحداث اللي لسه متنشرتش، وتنشرها، وتعلّم عليها.`,
          example: R`await db.$transaction(async (tx) => {
  const order = await tx.order.update({ where: { id: orderId, status: "pending" }, data: { status: "paid", paidAt: new Date() } });
  await tx.outbox.create({ data: { topic: "order.paid", payload: { orderId: order.id, total: order.total } } });
});
export async function relayOutbox() {
  return db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ id: bigint; topic: string; payload: unknown }[]>$__bt
      SELECT id, topic, payload FROM outbox
      WHERE published_at IS NULL ORDER BY id LIMIT 100
      FOR UPDATE SKIP LOCKED$__bt;
    for (const r of rows) await events.add(r.topic, r.payload, { jobId: $__btoutbox-$__{r.id}$__bt });
    if (rows.length) await tx.$executeRaw$__btUPDATE outbox SET published_at = now() WHERE id = ANY($__{rows.map((r) => r.id)})$__bt;
    return rows.length;
  });
}`,
          try: R`اعمل جدول outbox (id bigserial، و topic، و payload jsonb، و created_at، و published_at) و index جزئي [[WHERE published_at IS NULL]]. ضيف ٢٥٠ صف، وشغّل [[relayOutbox]] ٣ مرات بالتوازي بـ [[Promise.all]]، وعدّ: كام حدث اتنشر، وفيه تكرار؟ وبعدين جرّب transaction فيها update و outbox وبعدين [[throw]]: الاتنين لازم يترجعوا.`,
          flag: "script",
          deep: {
            why: "مشكلة الـ dual write موجودة في كل سيستم بيحفظ في قاعدة وبيبلّغ حاجة تانية (queue، أو إيميل، أو webhook، أو search index). ونادرًا ما بتبان في التطوير. في الإنتاج بتبان كطلبات مدفوعة من غير شحن، أو إيصالات لعمليات اتلغت، ومحدش يعرف يفسّرها.",
            how: R`الضمان: الـ outbox والتعديل في نفس الـ transaction، فالقاعدة بتضمن الاتنين مع بعض. والـ relay بيضمن إن أي صف في outbox هيتنشر في الآخر، حتى لو وقع ١٠ مرات. النتيجة at-least-once: الحدث ممكن يتنشر مرتين (الـ relay نشر ووقع قبل ما يعلّم)، بس عمره ما يضيع.

[[FOR UPDATE SKIP LOCKED]]: لو شغّلت أكتر من relay (أو أكتر من نسخة من السيرفر فيها relay)، كل واحد بيقفل الصفوف اللي أخدها، والتاني بيعدّيها ويا خد اللي بعدها. فمفيش اتنين بينشروا نفس الحدث في نفس الوقت، ومفيش حد بيستنى التاني.

[[jobId: outbox-id]]: BullMQ بيتجاهل job بنفس الـ jobId لو لسه موجودة، فلو الـ relay نشر ووقع قبل الـ UPDATE، وعاد، التكرار مش هيعمل job تانية (طالما الأولى لسه متشالتش). وده مش بديل عن إن المستهلك يبقى idempotent.

ليه transaction حوالين الـ relay؟ عشان الـ lock بتاع [[FOR UPDATE]] يفضل ماسك لحد الـ UPDATE. خليها قصيرة (١٠٠ صف) عشان متمسكش locks كتير. وشغّله كل ثانية أو اتنين (BullMQ job scheduler، أو loop في worker)، أو اصحى فورًا بـ LISTEN/NOTIFY في Postgres.

الـ id [[bigint]]: Prisma بيرجّعه BigInt من [[$queryRaw]]. الـ template string بتحوّله نص عادي، و Prisma بيبعت الـ array كـ Postgres array في [[ANY()]].

والتنضيف: امسح الصفوف المنشورة الأقدم من كام يوم بـ job دوري، وإلا الجدول بيكبر للأبد.

البديل: CDC (change data capture) زي Debezium بيقرا الـ WAL بتاع Postgres وينشر التغييرات، من غير جدول outbox ولا polling. أقوى وأعقد. والـ outbox بـ polling كفاية لأغلب المشاريع.

والنمط العكسي (inbox): المستهلك بيسجّل الـ event id في جدول في نفس transaction شغله، ولو جاله نفس الـ id تاني يتجاهله. ده اللي بيقفل الدايرة لـ «effectively once».`,
            when: "أي تعديل في القاعدة لازم يطلع منه event لحاجة برّه: دفع، وتسجيل، وتغيير حالة طلب. ولو الحدث مش مهم لو ضاع (analytics تقريبية)، النشر المباشر بعد الـ commit مقبول.",
            mistakes: R`تنشر جوه الـ transaction قبل الـ commit (الحدث طلع والـ transaction اترجعت). وتنشر بعد الـ commit وتفتكر إن ده كفاية. و relay من غير SKIP LOCKED فنسختين ينشروا نفس الصفوف. ومستهلك مش idempotent. وجدول outbox من غير index ولا تنضيف. وسؤال انترفيو مشهور: «إزاي تضمن إن الحفظ في القاعدة وإرسال الرسالة للـ queue يحصلوا الاتنين أو ولا واحد؟»، والإجابة: transactional outbox (أو CDC)، مش two-phase commit.`
          },
          lines: [
            "transaction واحدة:",
            "علّم الطلب مدفوع (بشرط إنه كان pending، فالتكرار ميعملش حاجة).",
            "واكتب الحدث في outbox في نفس الـ transaction: يا الاتنين يتحفظوا يا ولا واحد.",
            "قفلة.",
            "الـ relay: بيتنادى كل ثانية أو اتنين.",
            "transaction عشان الـ lock يفضل لحد التعليم.",
            "هات...",
            "...الأحداث...",
            "...اللي لسه متنشرتش، بالترتيب، ١٠٠ بس...",
            "...واقفلها، وعدّي أي صف relay تاني قافله.",
            "انشر كل واحد، والـ jobId من id الصف عشان التكرار ميعملش job تانية.",
            "علّم اللي اتنشر.",
            "رجّع العدد (للـ logs والـ metrics).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`٣ relays بالتوازي على ٢٥٠ صف: الأعداد زي [[100, 50, 100]] (الترتيب بيختلف)، والمجموع ٢٥٠ بالظبط ومفيش ولا id اتكرر. SKIP LOCKED خلى كل relay ياخد صفوف مختلفة.

لو شلت [[SKIP LOCKED]]: الـ relays التانيين بيستنوا الأول يخلص، وبعدين ياخدوا الـ ١٠٠ اللي بعدهم، فالنتيجة صح بس أبطأ. ولو شلت [[FOR UPDATE]] كلها: هتلاقي نفس الـ ids اتنشرت أكتر من مرة.

والـ transaction اللي فيها throw: لا الطلب اتعلّم paid ولا صف outbox اتضاف. ده الضمان كله.`,
          solCode: R`CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
CREATE INDEX outbox_unpublished ON outbox (id) WHERE published_at IS NULL;
INSERT INTO outbox (topic, payload)
SELECT 'order.paid', jsonb_build_object('orderId', g) FROM generate_series(1, 250) g;`
        }
      ]
    },
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
    },
    // @@MORE@@
  ]
});
