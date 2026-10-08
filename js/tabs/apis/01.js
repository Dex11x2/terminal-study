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
          teach: R`## الفكرة: اسم + فعل

كل سطر في المثال حتتين: **الفعل** (الـ method زي [[GET]] و [[POST]]) و **الاسم** (الـ URL). الـ URL بيشاور على حاجة، والـ method بيقول هتعمل فيها إيه. عشان نتأكد إن الكلام ده مش نظري، عملنا سيرفر Express 5.2.1 صغير على Node 24.19 فيه الـ routes دي بالظبط، وكل route بيرجّع اسمه، وكلّمناه بـ curl 8.22 من Git Bash على ويندوز 11 (السيرفر كان على بورت ٦٠٠٠، فهتلاقي [[localhost:6000]] في الأوامر).

---

## ١. الكلمات اللي هتتكرر

| الكلمة | معناها |
|---|---|
| resource | «حاجة» في السيستم ليها عنوان: مستخدم، أو طلب، أو إلغاء طلب |
| collection | مجموعة من نفس النوع: [[/v1/users]] |
| item | عنصر واحد جوه الـ collection: [[/v1/users/42]] |
| path | الجزء من الـ URL قبل علامة [[?]] |
| query string | اللي بعد [[?]]: أزواج [[key=value]] بينهم [[&]] |
| [[/v1]] | رقم نسخة الـ API (version 1). ليه درس لوحده: [[versioning]] |

---

## ٢. الـ collection: [[/v1/users]]

~~~text
GET    /v1/users
POST   /v1/users
~~~

نفس الـ URL، والـ method هو اللي بيفرّق:

- [[GET]] على الـ collection: «هات القايمة».
- [[POST]] على الـ collection: «ضيف عنصر جديد جوه القايمة دي». السيرفر هو اللي بيختار الـ id، عشان كده الـ POST بيروح للـ collection مش لـ [[/v1/users/43]].

~~~bash
curl -s localhost:6000/v1/users
curl -s -X POST localhost:6000/v1/users -w " %{http_code}\n"
~~~

~~~text الناتج
{"route":"list users"}
{"route":"create user"} 201
~~~

- [[-s]] (silent) بيسكّت شريط التقدم.
- [[-X POST]] بيغيّر الـ method (من غيره curl بيبعت GET).
- [[-w " %{http_code}\n"]] (write-out) بيطبع رقم الـ status بعد الـ body. [[201]] معناها «اتعمل»، وليها درس: [[201 و 204 و 202]].

---

## ٣. الـ item: [[/v1/users/42]]

~~~text
GET    /v1/users/42
PATCH  /v1/users/42
DELETE /v1/users/42
~~~

[[42]] هو الـ id. في Express بتكتبه في الـ route كده: [[/v1/users/:id]]، والنقطتين [[:]] معناها «الحتة دي متغيرة، وحطها في [[req.params.id]]»:

~~~bash
curl -s localhost:6000/v1/users/42
curl -s -X PATCH localhost:6000/v1/users/42
curl -s -i -X DELETE localhost:6000/v1/users/42
~~~

~~~text الناتج
{"route":"get user","params":{"id":"42"}}
{"route":"patch user","params":{"id":"42"}}
HTTP/1.1 204 No Content
~~~

- [[GET]] هات، و [[PATCH]] عدّل جزء (درس [[PUT و PATCH]])، و [[DELETE]] امسح.
- لاحظ إن [["42"]] وصلت **نص** مش رقم: كل حاجة في الـ URL نص.
- [[-i]] بيطبع سطر الـ status والـ headers. [[204]] يعني «تم ومفيش body».

---

## ٤. الـ nesting: [[/v1/users/42/orders]]

~~~text
GET    /v1/users/42/orders
GET    /v1/orders/9001
~~~

- السطر الأول: «طلبات المستخدم ٤٢». الطلبات **بتاعة** المستخدم، فمنطقي تبقى تحته. ده مستوى nesting واحد.
- السطر التاني: الطلب ٩٠٠١ نفسه ليه عنوان مباشر. مش محتاج [[/v1/users/42/orders/9001]]، لأن رقم الطلب لوحده كفاية يعرّفه.

~~~text الناتج
{"route":"orders of user","params":{"id":"42"}}
{"route":"get order","params":{"id":"9001"}}
~~~

---

## ٥. فعل مش CRUD: [[/cancellation]]

CRUD اختصار Create و Read و Update و Delete، الأربع عمليات العادية. «الغي الطلب» مش واحدة منهم، فبدل [[/cancelOrder]] بنعمل «الإلغاء» نفسه حاجة جديدة بتتعمل:

~~~bash
curl -s -X POST localhost:6000/v1/orders/9001/cancellation -w " %{http_code}\n"
~~~

~~~text الناتج
{"route":"cancel order","params":{"id":"9001"}} 201
~~~

[[cancellation]] اسم (مش فعل [[cancel]])، و [[POST]] معناها «اعمل إلغاء جديد للطلب ده». والبديل التاني اللي في الـ desc: [[PATCH /v1/orders/9001]] ومعاه [[{"status":"cancelled"}]].

---

## ٦. الفلترة في الـ query string

~~~bash
curl -s "localhost:6000/v1/orders?status=paid&sort=-createdAt"
~~~

~~~text الناتج
{"route":"list orders","query":{"status":"paid","sort":"-createdAt"}}
~~~

- الـ path لسه [[/v1/orders]] (نفس الـ collection)، والفلاتر بعد [[?]]. Express بيفكهم في [[req.query]].
- [[sort=-createdAt]]: الـ [[-]] قبل اسم الحقل معناها «تنازلي» (الأحدث الأول). تفاصيله في درس [[filter و sort]].
- الـ URL متحط بين علامات تنصيص لأن [[&]] في bash معناها «شغّل في الخلفية».

---

## ٧. والشكل القديم؟

~~~bash
curl -s -i "localhost:6000/getUser?id=42"
~~~

~~~text الناتج (أول سطر وآخره)
HTTP/1.1 404 Not Found
<pre>Cannot GET /getUser</pre>
~~~

مفيش route اسمه كده، فـ Express رجّع صفحة 404 الافتراضية. الفكرة: مع الأسماء الموحدة، اللي بيستخدم الـ API بيخمّن الـ URL صح، ومش محتاج قايمة بكل «فعل» اخترعته.

---

## الخلاصة

| عايز | الـ method | الـ URL |
|---|---|---|
| القايمة | [[GET]] | [[/v1/users]] |
| تضيف | [[POST]] | [[/v1/users]] |
| واحد | [[GET]] | [[/v1/users/42]] |
| تعدّل جزء | [[PATCH]] | [[/v1/users/42]] |
| تمسح | [[DELETE]] | [[/v1/users/42]] |
| حاجة تبع حاجة | [[GET]] | [[/v1/users/42/orders]] |
| عملية مش CRUD | [[POST]] | [[/v1/orders/9001/cancellation]] |
| فلترة وترتيب | [[GET]] | [[/v1/orders?status=paid&sort=-createdAt]] |

- الـ URL **اسم جمع**، والفعل في الـ method.
- nesting مستوى واحد بس، ولما العلاقة ملكية.
- الفلاتر في الـ query string، مش في الـ path.`,
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
          teach: R`## سؤالين على كل method

المثال قايمة طلبات، وقدام كل واحد هنسأل سؤالين:

1. **safe؟** يعني الطلب ده بيغيّر حاجة على السيرفر ولا قراية بس؟
2. **idempotent؟** (تتنطق آيدِمبوتِنت) يعني لو اتبعت مرة ولا عشر مرات، الحالة على السيرفر في الآخر واحدة؟

ليه السؤالين مهمين؟ لأن الشبكة بتقطع، والعميل ساعات ميعرفش طلبه وصل ولا لأ، فيعيده. السؤال التاني بيقولك الإعادة آمنة ولا هتعمل مصيبة. الكلام اتجرّب على سيرفر Express 5.2.1 (Node 24.19) على بورت ٦٠٠٠، بـ curl 8.22 من Git Bash على ويندوز 11.

---

## ١. القراية: [[GET]] و [[HEAD]] و [[OPTIONS]]

~~~text
GET     /products/7
HEAD    /products/7
OPTIONS /products
~~~

التلاتة **safe**، ولأن مفيش تغيير أصلًا، فهم **idempotent** كمان.

### [[HEAD]]: الـ headers من غير body

~~~bash
curl -s -I localhost:6000/products/7
~~~

[[-I]] (حرف i كبير) بيبعت HEAD. Express بيرد على HEAD لوحده من نفس route الـ GET، بس بيشيل الـ body:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-Q4sXsZmwY6zQjHR4Z9zpyrP4qfU"
~~~

[[Content-Length: 21]] يعني الـ body اللي **كان** هيتبعت ٢١ byte، بس متبعتش. فايدته: تعرف حجم ملف أو الـ [[ETag]] بتاعه (بصمة النسخة، ليها درس) من غير ما تنزّله.

### [[OPTIONS]]: إيه المسموح هنا؟

~~~bash
curl -s -i -X OPTIONS localhost:6000/products/7
~~~

~~~text الناتج (جزء)
HTTP/1.1 200 OK
Allow: GET, HEAD
Content-Type: text/plain

GET, HEAD
~~~

Express رد لوحده بالـ methods اللي ليها routes على المسار ده في header [[Allow]]. والمتصفح بيبعت OPTIONS قبل طلبات معيّنة لـ origin تاني (اسمه CORS preflight) عشان يسأل «مسموحلي؟».

---

## ٢. التغيير اللي ينفع يتكرر: [[PUT]] و [[DELETE]]

~~~text
PUT     /users/42/avatar
DELETE  /sessions/current
~~~

دول **مش safe** (بيغيّروا)، بس **idempotent**:

- [[PUT]] معناه «خلي الصورة دي هي الـ avatar». بعتها مرة ولا عشرة، الـ avatar في الآخر هو نفس الصورة.
- [[DELETE]]: أول مرة الـ session اتمسحت. التانية مفيش حاجة تتمسح. الحالة النهائية واحدة: «مفيش session».

> الفخ: idempotent معناها **نفس الحالة**، مش **نفس الرد**. أول DELETE ممكن يرجّع [[204]] والتاني [[404]]، وده لسه idempotent.

---

## ٣. اللي ميتكررش: [[POST]] و [[PATCH]] بعملية

~~~text
POST    /payments
PATCH   /carts/9    {"op":"increment","itemId":7}
~~~

- [[POST /payments]]: كل طلب دفعة جديدة. مرتين = دفعتين.
- [[PATCH]] ده بيقول «زوّد الكمية واحد» ([[op]] = operation، و [[increment]] = زوّد). كل تكرار بيزوّد تاني. أما PATCH بيقول «خلي الكمية ٣» فكان هيبقى idempotent. عشان كده PATCH مش مضمون بالتعريف.

شفنا ده بعينينا مع POST في التجربة اللي تحت: طلبين = أوردرين.

---

## ٤. التجربة: Post/Redirect/Get

ده الـ solCode: form بيعمل POST، والسيرفر بدل ما يرد بصفحة، بيرد بـ redirect.

### السطر المهم

~~~ts
res.redirect(303, $__bt/orders/$__{order.id}$__bt);
~~~

- [[res.redirect]] بيرد بـ status من نوع 3xx ومعاه header [[Location]] فيه العنوان الجديد.
- [[303]] اسمه See Other: «شوف العنوان ده، وروحله بـ **GET**».
- الـ backticks مع [[$__{...}]] ده template string في JavaScript: بيحط رقم الأوردر جوه النص.

### نجرّبه بـ curl

~~~bash
curl -s -i -d item=book localhost:6000/order
~~~

[[-d item=book]] بيبعت body بشكل form ([[key=value]])، ومعاه curl بيخلي الـ method POST لوحده:

~~~text الناتج
HTTP/1.1 303 See Other
Location: /orders/1
Content-Type: text/plain; charset=utf-8

See Other. Redirecting to /orders/1
~~~

### مع [[-L]] (اتبع الـ redirect)

~~~bash
curl -s -L -d item=book localhost:6000/order
curl -s localhost:6000/orders/1
~~~

~~~text الناتج
<p>Order #2: book (2 orders total)</p>
<p>Order #1: book (2 orders total)</p>
~~~

- [[-L]] (location) خلّى curl يروح للعنوان اللي في [[Location]]، وبـ GET زي ما 303 بيقول. ده نفس اللي المتصفح بيعمله.
- العدد بقى ٢: كل POST عمل أوردر. ده معنى «مش idempotent».
- الـ refresh على [[/orders/1]] بيعيد GET بس، فالعدد مبيزيدش ومفيش تحذير.

### ولو استخدمت [[307]]؟

جرّبنا route بيعمل [[res.redirect(307, "/order")]]. curl مع [[-L]] بعت **POST تاني** بنفس الـ body للعنوان الجديد، فاتعمل أوردر. 307 و 308 بيحافظوا على الـ method والـ body، وده عكس اللي عايزينه هنا.

---

## الخلاصة

| method | safe؟ | idempotent؟ | لو اتكرر |
|---|---|---|---|
| [[GET]] و [[HEAD]] و [[OPTIONS]] | أيوه | أيوه | مفيش مشكلة |
| [[PUT]] | لأ | أيوه | نفس النتيجة |
| [[DELETE]] | لأ | أيوه | نفس الحالة (الرد ممكن 404) |
| [[POST]] | لأ | لأ | عملية جديدة كل مرة |
| [[PATCH]] | لأ | حسب العملية | [[increment]] بيتكرر، «خلي القيمة كذا» لأ |

- retry أوتوماتيك للـ idempotent بس. POST محتاج حماية (درس [[Idempotency-Key]]).
- بعد POST من form رد بـ [[303]] لصفحة GET، مش بصفحة.`,
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
          teach: R`## نفس العنوان، معنيين

الـ endpointين على نفس الـ URL ([[/users/:id/address]])، والفرق كله في الـ method: [[PUT]] بيقول «ده العنوان الجديد كله»، و [[PATCH]] بيقول «غيّر الحقول دي بس». هنفك الكود سطر سطر، وبعدين نشوف الفرق في الناتج.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠١)، و curl 8.22 من Git Bash. الـ [[db]] كانت نسخة صغيرة في الذاكرة بنفس سلوك Prisma اللي يهمنا هنا (الحقل الـ [[undefined]] بيتجاهل)، عشان نركّز على HTTP مش على القاعدة. وأخطاء Zod بتتحول لـ 422 عن طريق الـ error handler بتاع درس [[problem+json]].

---

## ١. الشكل: [[Address]]

~~~ts
const Address = z.object({ city: z.string(), street: z.string(), zip: z.string().optional() });
~~~

- [[z]] هو Zod، مكتبة بتوصف شكل البيانات وتتحقق منها.
- [[z.object({...})]]: object فيه الحقول دي.
- [[z.string()]]: لازم نص. ولو الحقل مش موجود خالص، ده غلط.
- [[.optional()]]: الحقل ده مسموح يغيب. فـ [[zip]] (الرقم البريدي) اختياري، و [[city]] و [[street]] مطلوبين.

---

## ٢. الـ PUT سطر سطر

~~~ts
app.put("/users/:id/address", async (req, res) => {
~~~

[[app.put]] بيسجّل route للـ method [[PUT]]. و [[:id]] بيتحط في [[req.params.id]]. و [[async]] عشان جوه الدالة هنستنى القاعدة بـ [[await]].

~~~ts
  const address = Address.parse(req.body);
~~~

[[req.body]] هو الـ JSON اللي العميل بعته (بعد [[express.json()]]). و [[.parse()]] بيتأكد إنه على الشكل: لو تمام بيرجّعه، ولو لأ بيرمي [[ZodError]]، و Express 5 بيوصّل الـ error ده للـ error handler لوحده.

~~~ts
  const data = { zip: null, ...address };
~~~

ده أهم سطر في الدرس. [[...address]] (spread) معناها «انسخ كل حقول [[address]] هنا». والترتيب مهم: [[zip: null]] الأول، وبعدين الـ spread. فلو العميل بعت [[zip]]، قيمته بتكتب فوق الـ null. ولو مبعتهوش، يفضل null. يعني الحقل اللي مش مبعوت **بيتمسح**، وده معنى «استبدال».

~~~ts
  await db.address.upsert({ where: { userId: req.params.id }, create: { userId: req.params.id, ...data }, update: data });
~~~

[[upsert]] = update + insert:

| الجزء | معناه |
|---|---|
| [[where]] | دوّر على العنوان بتاع المستخدم ده |
| [[create]] | لو مش موجود: اعمله بالبيانات دي ومعاها [[userId]] |
| [[update]] | لو موجود: حط البيانات دي |

فالـ PUT بيشتغل سواء العنوان موجود أو لأ، ونفس الطلب مرتين بيدّي نفس النتيجة (idempotent).

~~~ts
  res.status(204).end();
~~~

[[204 No Content]]: تم، ومفيش body. و [[.end()]] بيقفل الرد من غير ما يبعت حاجة.

---

## ٣. الـ PATCH سطر سطر

~~~ts
  const changes = Address.partial().parse(req.body);
~~~

[[.partial()]] بتعمل نسخة من الـ schema كل حقولها اختيارية. فـ [[{"city":"Cairo"}]] لوحده مقبول. بس النوع لسه بيتفحص: [[{"city":5}]] بيرجّع 422.

~~~ts
  await db.address.update({ where: { userId: req.params.id }, data: changes });
~~~

هنا مفيش [[zip: null]]. الحقول اللي مبعتتش مش موجودة في [[changes]] أصلًا (يعني [[undefined]])، و Prisma بيتجاهل الـ undefined، فبتفضل زي ما هي.

---

## ٤. نشغّل التسلسل

~~~bash
J='Content-Type: application/json'
curl -X PUT localhost:6001/users/42/address -H "$J" -d '{"city":"Giza","street":"Tahrir 5","zip":"12611"}'
curl localhost:6001/users/42/address
~~~

- [[J='...']]: متغير في bash شايل الـ header عشان منكررهوش. و [[$J]] بتطلع قيمته، والتنصيص [["$J"]] عشان المسافة اللي جواه.
- [[-H]] بيضيف header. و [[Content-Type: application/json]] بيقول للسيرفر «الـ body ده JSON»، ومن غيره [[express.json()]] مش هيقراه.

~~~text الناتج (الـ PUT رجع 204، وده الـ GET)
{"city":"Giza","street":"Tahrir 5","zip":"12611"}
~~~

### PUT من غير zip

~~~bash
curl -X PUT localhost:6001/users/42/address -H "$J" -d '{"city":"Giza","street":"Tahrir 5"}'
curl localhost:6001/users/42/address
~~~

~~~text الناتج
{"city":"Giza","street":"Tahrir 5","zip":null}
~~~

الـ zip **اتمسح**. العميل قال «ده العنوان كله»، والعنوان ده مفيهوش zip.

### PATCH فيه city بس

~~~bash
curl -X PATCH localhost:6001/users/42/address -H "$J" -d '{"city":"Cairo"}'
curl localhost:6001/users/42/address
~~~

~~~text الناتج
{"city":"Cairo","street":"Tahrir 5","zip":null}
~~~

المدينة بس اتغيرت، والشارع فضل.

### PUT ناقص street

~~~bash
curl -i -X PUT localhost:6001/users/42/address -H "$J" -d '{"city":"Alex"}'
~~~

~~~text الناتج
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"string","code":"invalid_type","path":["street"],"message":"Invalid input: expected string, received undefined"}],"instance":"/users/42/address"}
~~~

[[path: ["street"]]] بيقول الغلط في أنهي حقل، و [[received undefined]] يعني مبعتهوش. الـ PUT لازم الشكل كامل.

### PATCH لمستخدم مالوش عنوان

~~~bash
curl -s -w " %{http_code}\n" -X PATCH localhost:6001/users/7/address -H "$J" -d '{"city":"Cairo"}'
~~~

~~~text الناتج
{"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/users/7/address"} 500
~~~

[[update]] ملقاش صف فرمى error. في Prisma الـ error ده كوده [[P2025]] (من الـ docs، والـ stand-in بتاعنا رمى نفس الكود). مكانه الصح 404، فامسكه وحوّله.

---

## ٥. ليه [[{ zip: null, ...address }]] مش [[address]] بس؟

| الكود | العميل بعت من غير zip | النتيجة |
|---|---|---|
| [[update: address]] | [[zip]] مش موجود = undefined | Prisma يتجاهله، والقديم يفضل: ده merge مش استبدال |
| [[update: { zip: null, ...address }]] | [[zip: null]] | يتكتب null: استبدال حقيقي |

---

## الخلاصة

- [[PUT]] = «ده الشكل كله»: كل الحقول المطلوبة لازم تيجي، واللي مش مبعوت يرجع للافتراضي.
- [[PATCH]] = «غيّر دول بس»: [[.partial()]] في Zod، والـ undefined مبيتكتبش.
- الاتنين بيرجعوا [[204]] من غير body هنا.
- [[update]] على صف مش موجود بيرمي error: حوّله 404.`,
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
          teach: R`## ٣ أنواع نجاح

الـ status code أول حاجة العميل بيقراها. هنا ٣ endpoints، وكل واحد بيرجّع نوع نجاح مختلف: [[201]] «اتعمل»، و [[204]] «تم ومفيش حاجة ترجع»، و [[202]] «استلمت وهشتغل عليه». هنفك كل واحد ونشوف رده الحقيقي.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠١)، و curl 8.22 من Git Bash. الـ [[db.user]] كانت قايمة في الذاكرة، والـ queue بتاع التقارير كان stand-in بيدّي أرقام jobs (أول رقم ١٧)، لأن المهم هنا شكل الرد.

---

## ١. [[201 Created]] للإنشاء

~~~ts
app.post("/users", async (req, res) => {
  const user = await db.user.create({ data: NewUser.parse(req.body) });
  res.status(201).location($__bt/users/$__{user.id}$__bt).json(user);
});
~~~

- [[NewUser.parse(req.body)]]: Zod بيتأكد من الـ body (إيميل صح واسم). لو غلط بيرمي، والـ error handler بيرجّع 422.
- [[db.user.create({ data })]]: اعمل صف جديد، وبيرجّع المستخدم ومعاه الـ [[id]] اللي القاعدة ادّتهوله.
- السطر التالت فيه ٣ دوال ورا بعض (chaining)، كل واحدة بترجّع [[res]] نفسه فتقدر تكمّل عليه:

| الحتة | بتعمل إيه |
|---|---|
| [[res.status(201)]] | رقم الـ status |
| [[.location(...)]] | بتحط header اسمه [[Location]] |
| [[$__bt/users/$__{user.id}$__bt]] | template string: العنوان ومعاه الـ id |
| [[.json(user)]] | بتبعت المستخدم JSON وتقفل الرد |

~~~bash
curl -i -X POST localhost:6001/users -H 'Content-Type: application/json' -d '{"email":"ali@example.com","name":"Ali"}'
~~~

~~~text الناتج
HTTP/1.1 201 Created
Location: /users/1
Content-Type: application/json; charset=utf-8
Content-Length: 49

{"id":"1","email":"ali@example.com","name":"Ali"}
~~~

- [[Location: /users/1]]: العميل عرف عنوان الحاجة الجديدة من غير ما يخمّن.
- والـ body فيه المستخدم نفسه، فالعميل مش محتاج يعمل GET تاني.

---

## ٢. [[204 No Content]] للمسح

~~~ts
app.delete("/users/:id", async (req, res) => {
  await db.user.delete({ where: { id: req.params.id } });
  res.status(204).end();
});
~~~

[[db.user.delete]] بيمسح الصف بالـ id. وبعدين [[204]] و [[.end()]] من غير body.

~~~bash
curl -i -X DELETE localhost:6001/users/1
~~~

~~~text الناتج
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Thu, 08 Oct 2026 08:46:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5
~~~

مفيش [[Content-Type]] ولا [[Content-Length]] ولا body. وده المطلوب.

### لو حاولت تبعت body مع 204؟

جرّبنا نفس الـ route بـ [[res.status(204).json({ deleted: true })]] بدل [[.end()]]:

~~~text الناتج
HTTP/1.1 204 No Content
X-Powered-By: Express
ETag: W/"10-sVfJQj54VHOAwj+hmq8RTMGcte8"
Date: Thu, 08 Oct 2026 08:46:28 GMT
~~~

الـ body اتشال برضه، بس فضل [[ETag]] (بصمة الرد). الرقم [[10]] قبل الشرطة طول الـ body بالـ hex: [[0x10]] = ١٦، وده بالظبط طول [[{"deleted":true}]]. يعني Express عمل الـ JSON وحسب بصمته، وبعدين رماه لأن 204 ممنوع يبقى ليه body.

### والفرونت؟

جرّبنا في Node 24 [[await res.json()]] على رد 204:

~~~text الناتج
204 null
SyntaxError: Unexpected end of JSON input
~~~

[[null]] هو الـ Content-Type (مش موجود)، و [[res.json()]] رمى لأن مفيش حاجة تتقري. فاقرا الـ JSON بس لما الـ status مش 204.

### ومرة تانية لنفس المستخدم؟

في الـ stand-in بتاعنا رمينا 404 لما المستخدم مش موجود:

~~~text الناتج
{"type":"about:blank","title":"Not Found","status":404,"detail":"user not found","instance":"/users/1"} 404
~~~

مع Prisma الحقيقي [[delete]] بيرمي [[P2025]] لو ملقاش الصف (من الـ docs)، ولو مامسكتهوش هيبقى 500. امسكه وحوّله 404.

---

## ٣. [[202 Accepted]] للشغل اللي في الخلفية

~~~ts
app.post("/reports", async (req, res) => {
  const job = await reports.add("build", { userId: req.user.id, month: req.body.month });
  res.status(202).location($__bt/jobs/$__{job.id}$__bt).json({ jobId: job.id, status: "queued" });
});
~~~

- [[reports]] هنا queue (طابور شغل) من BullMQ. [[reports.add("build", data)]] بيحط مهمة اسمها [[build]] ومعاها البيانات في الطابور، ويرجع على طول من غير ما يستنى التقرير يتعمل. worker تاني هو اللي بيشتغل عليها.
- [[req.user.id]]: المستخدم اللي عامل login (من middleware الـ auth).
- [[202]] و [[Location: /jobs/17]]: «استلمت، وتابع من هنا».
- [[status: "queued"]]: لسه في الطابور.

~~~bash
curl -i -X POST localhost:6001/reports -H 'Authorization: Bearer YOUR_TOKEN' -H 'Content-Type: application/json' -d '{"month":"2026-08"}'
~~~

~~~text الناتج
HTTP/1.1 202 Accepted
Location: /jobs/17
Content-Type: application/json; charset=utf-8

{"jobId":"17","status":"queued"}
~~~

[[Authorization: Bearer ...]] هو التوكن. من غيره رجعلنا [[401 Unauthorized]] ومعاه [[WWW-Authenticate: Bearer]]. وبعد كده العميل يسأل [[GET /jobs/17]] كل شوية (polling) لحد ما الحالة تبقى [[completed]].

---

## الخلاصة

| العملية | الـ status | الـ headers | الـ body |
|---|---|---|---|
| إنشاء | [[201 Created]] | [[Location]] للحاجة الجديدة | الحاجة نفسها |
| مسح، أو تعديل مش محتاج رد | [[204 No Content]] | مفيش Content-Type | مفيش، حتى لو كتبت [[.json()]] |
| شغل في الخلفية | [[202 Accepted]] | [[Location]] لمكان المتابعة | رقم الشغلانة وحالتها |
| قراية أو تعديل بيرجّع نتيجة | [[200 OK]] | | النتيجة |

- مع 204 استخدم [[.end()]]، ومتقراش [[res.json()]] في الفرونت.
- 202 لازم معاه طريقة يعرف بيها العميل إن الشغل خلص.`,
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
          teach: R`## كل رقم بيقول للعميل يعمل إيه

الـ endpoint ده بيلغي طلب، وفيه ٦ طرق يفشل بيها، وكل طريقة ليها رقم. الترتيب نفسه جزء من الدرس: الأول «انت مين؟»، وبعدين «مسموحلك؟»، وبعدين «الـ body سليم؟»، وبعدين «الحاجة موجودة وبتاعتك؟»، وبعدين «حالتها تسمح؟».

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٢)، و curl 8.22 من Git Bash. الطلبات كانت في الذاكرة: الطلب ١ بتاع [[u1]] وحالته paid، والطلب ٢ بتاع [[u1]] واتشحن. و [[requireAuth]] كان بيعرف ٣ توكنات: صاحب الطلبات، ومستخدم تاني، ومستخدم مأكّدش إيميله.

---

## ١. [[401]]: «انت مين؟»

~~~ts
app.post("/orders/:id/cancellation", requireAuth, async (req, res) => {
~~~

[[requireAuth]] middleware: دالة بتشتغل **قبل** الـ handler. لو مفيش توكن أو بايظ بترد هي وتوقف. ولو سليم بتحط المستخدم في [[req.user]] وتعدّي.

~~~bash
curl -s -i -X POST localhost:6002/orders/1/cancellation -H 'Content-Type: application/json' -d '{"reason":"changed my mind"}'
~~~

~~~text الناتج (أول سطور)
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer
~~~

الاسم «Unauthorized» مضلل: المعنى الحقيقي «مش عارفين انت مين». و [[WWW-Authenticate: Bearer]] بيقول للعميل «ابعت توكن من نوع Bearer». العميل الصح يعمل refresh للتوكن أو يودّي المستخدم لصفحة login.

---

## ٢. [[403]]: «عارفينك، بس لأ»

~~~ts
  if (!req.user.emailVerified) return res.status(403).json({ detail: "verify your email first" });
~~~

- [[!]] يعني «مش». فالشرط: «لو الإيميل مش متأكّد».
- [[return]] قبل [[res.status(...)]]: ابعت الرد **واخرج** من الدالة. من غيرها الكود هيكمّل وهيحاول يبعت رد تاني.

~~~text الناتج (بتوكن المستخدم اللي مأكّدش)
{"detail":"verify your email first"} 403
~~~

هنا الـ refresh مش هيفيد. المستخدم لازم يعمل حاجة تانية (يأكّد إيميله).

---

## ٣. [[422]]: الشكل سليم والقيم غلط

~~~ts
  const parsed = CancelInput.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ errors: parsed.error.issues });
~~~

- [[safeParse]] زي [[parse]] بس **مبيرميش**: بيرجّع object فيه [[success]] (true أو false). لو true فيه [[data]]، ولو false فيه [[error]].
- [[parsed.error.issues]]: قايمة الغلطات، كل واحدة فيها [[path]] (أنهي حقل) و [[message]].

~~~bash
curl -s -w " %{http_code}\n" -X POST localhost:6002/orders/1/cancellation -H "Authorization: Bearer $OWNER" -H 'Content-Type: application/json' -d '{}'
~~~

~~~text الناتج
{"errors":[{"expected":"string","code":"invalid_type","path":["reason"],"message":"Invalid input: expected string, received undefined"}]} 422
~~~

[[$OWNER]] متغير bash فيه توكن صاحب الطلب. والـ body [[{}]] JSON سليم، بس مفيهوش [[reason]].

### و [[400]]؟

~~~bash
curl -s -w " %{http_code}\n" -X POST localhost:6002/orders/1/cancellation -H "Authorization: Bearer $OWNER" -H 'Content-Type: application/json' -d '{reason:'
~~~

~~~text الناتج
{"type":"about:blank","title":"Bad Request","status":400,"detail":"Expected property name or '}' in JSON at position 1 (line 1 column 2)","instance":"/orders/1/cancellation"} 400
~~~

ده JSON مكسور، فالطلب مش مفهوم أصلًا. [[express.json()]] رماها قبل ما الكود بتاعنا يشتغل، والـ error handler (درس [[problem+json]]) طلّعها 400. الفرق: 400 = «مش فاهم اللي انت بعته»، و 422 = «فاهم، بس القيم مش مقبولة».

---

## ٤. [[404]]: مش موجود، أو مش بتاعك

~~~ts
  const order = await db.order.findUnique({ where: { id: req.params.id } });
  if (!order || order.userId !== req.user.id) return res.status(404).end();
~~~

- [[findUnique]] بيرجّع الطلب أو [[null]].
- [[||]] يعني «أو»: لو مش موجود، **أو** موجود وصاحبه حد تاني.
- [[!==]] يعني «مش بيساوي» (من غير تحويل أنواع).

طلب مستخدم تاني، وطلب رقم ٩٩٩ مش موجود أصلًا:

~~~text الناتج (الاتنين بالحرف)
HTTP/1.1 404 Not Found
X-Powered-By: Express
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 0
~~~

نفس الرد بالظبط. لو كنا رجّعنا 403 لطلب حد تاني، المهاجم كان هيعرف إن الطلب ده **موجود**، ويقدر يعدّ الأرقام ويعرف حجم شغلك.

---

## ٥. [[409]]: الحالة مبتسمحش

~~~ts
  if (order.status === "shipped") return res.status(409).json({ detail: "already shipped" });
~~~

~~~text الناتج (الطلب ٢)
{"detail":"already shipped"} 409
~~~

[[409 Conflict]]: الطلب سليم، بس بيتعارض مع حالة الحاجة دلوقتي. الطلب اتشحن خلاص.

---

## ٦. النجاح: [[204]]

~~~ts
  await db.order.update({ where: { id: order.id }, data: { status: "cancelled", cancelReason: parsed.data.reason } });
  res.status(204).end();
~~~

[[parsed.data.reason]] هو السبب بعد ما Zod اتأكد منه. ولو الطلب كله سليم: [[204]].

---

## ٧. الترتيب بيفرق

جرّبنا body فاضي من المستخدم اللي مأكّدش إيميله:

~~~text الناتج
{"detail":"verify your email first"} 403
~~~

403 مش 422، لأن فحص الصلاحية قبل فحص الـ body: اللي مش مسموحله ميعرفش حتى شكل الـ body المطلوب. وطلب من غير body خالص (من غير [[-d]]):

~~~text الناتج
{"errors":[{"expected":"object","code":"invalid_type","path":[],"message":"Invalid input: expected object, received undefined"}]} 422
~~~

في Express 5 [[req.body]] بيبقى [[undefined]] لما مفيش body، و [[path: []]] (فاضي) معناها الغلط في الـ body كله مش في حقل.

---

## الخلاصة

| الحالة | الرقم | العميل يعمل إيه |
|---|---|---|
| مفيش توكن أو بايظ | [[401]] + [[WWW-Authenticate]] | refresh أو login |
| معروف ومش مسموح | [[403]] | يعرض السبب، الـ retry مش هيفيد |
| JSON مكسور | [[400]] | bug في العميل |
| القيم غلط | [[422]] + تفاصيل كل حقل | يعرض الغلط جنب الحقل |
| مش موجود أو مش بتاعه | [[404]] (نفس الرد للحالتين) | |
| الحالة مبتسمحش | [[409]] | يحدّث البيانات ويعرض السبب |
| كتير | [[429]] + [[Retry-After]] | يستنى ويعيد |
| تمام | [[204]] | |

- 401 = مين انت، و 403 = عارفينك ومش مسموح.
- طلب حد تاني = 404 مش 403.`,
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
    }
  ]
});
