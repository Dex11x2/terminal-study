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
          teach: R`## error handler واحد، وشكل واحد لكل الأخطاء

الفكرة: أي route يرمي error، و middleware واحد في الآخر يمسكه ويحوّله لـ JSON بشكل ثابت (RFC 9457). المثال ٣ حتت: helper اسمه [[problem]] بيعمل الـ error، و error handler بيحوّله رد، وسطر بيورّي الاستخدام.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٣)، و curl 8.22 من Git Bash. الـ routes كانت ٣: إلغاء بيرمي [[problem(409, ...)]]، و [[POST /orders]] بيعمل [[parse]] لـ [[{ productId: string, qty: number }]]، و [[/boom]] بيرمي [[new Error("db password is x")]].

---

## ١. [[STATUS_CODES]]

~~~ts
import { STATUS_CODES } from "node:http";
~~~

object جاهز في Node فيه اسم كل status. [[node:]] قبل الاسم معناها «موديول من جوه Node نفسه» مش من npm:

~~~bash
node -e 'const { STATUS_CODES } = require("node:http"); console.log(STATUS_CODES[404], "|", STATUS_CODES[422])'
~~~

~~~text الناتج
Not Found | Unprocessable Entity
~~~

بنستخدمه عشان لو الـ error مفيهوش [[title]]، الـ title يبقى اسم الـ status.

---

## ٢. الـ helper: [[problem]]

~~~ts
export const problem = (status: number, title: string, detail?: string, extra: object = {}) =>
  Object.assign(new Error(title), { status, title, detail, extra });
~~~

- [[(...) =>]] arrow function. و [[: number]] و [[: string]] أنواع TypeScript.
- [[detail?]] العلامة [[?]] معناها الـ parameter اختياري.
- [[extra: object = {}]] لو مبعتّوش، قيمته object فاضي.
- [[new Error(title)]] error عادي، عشان يبقى فيه stack وتقدر ترميه بـ [[throw]].
- [[Object.assign(target, source)]] بيلزق حقول [[source]] على [[target]] ويرجّعه. فالنتيجة Error عليه [[status]] و [[title]] و [[detail]] و [[extra]].

---

## ٣. الـ error handler سطر سطر

~~~ts
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
~~~

Express بيعرف إن ده error handler من إن الدالة ليها **٤** parameters. لو كتبت ٣ بس، هيعتبرها middleware عادي ومش هيدّيلها الأخطاء. والـ [[_]] في أول [[_next]] عُرف بين المبرمجين معناه «مش هستخدمه، بس لازم يبقى موجود». ولازم يتسجّل **بعد** كل الـ routes.

~~~ts
  if (err instanceof ZodError) err = problem(422, "Unprocessable Content", "Validation failed", { errors: err.issues });
~~~

[[instanceof]] بيسأل «الـ error ده من نوع ZodError؟». لو أيوه، بنحوّله problem بـ 422، و [[err.issues]] (قايمة غلطات الحقول) بتروح في [[errors]].

~~~ts
  const status = Number.isInteger(err?.status) ? err.status : 500;
~~~

- [[err?.status]] الـ [[?.]] (optional chaining): لو [[err]] نفسه null متقعش، رجّع undefined.
- [[Number.isInteger]] بيتأكد إنه رقم صحيح.
- [[شرط ? أ : ب]] (ternary): لو الشرط صح خد أ، وإلا ب. يعني أي error من غير status صحيح = 500.

~~~ts
  if (status >= 500) console.error(err);
~~~

الـ 5xx بس بتتسجّل في الـ console، لأنها غلطتك. الـ 4xx غلطة العميل.

~~~ts
  const body = status >= 500
    ? { title: "Internal Server Error", status }
    : { title: err.title ?? STATUS_CODES[status], status, detail: err.detail ?? err.message, ...err.extra };
~~~

- للـ 500: عنوان عام **بس**. مفيش [[err.message]] ولا stack، لأن الرسالة ممكن يبقى فيها أسماء جداول أو باسوردات.
- غير كده: [[??]] (nullish coalescing) معناها «لو اللي على الشمال null أو undefined، خد اللي على اليمين». فالـ title يا اللي حطيته يا اسم الـ status، والـ detail يا اللي حطيته يا رسالة الـ error.
- [[...err.extra]] بيفرد الحقول الزيادة (زي [[orderId]] أو [[errors]]) جوه الـ body.

~~~ts
  res.status(status).type("application/problem+json").json({ type: "about:blank", ...body, instance: req.originalUrl });
~~~

- [[.type(...)]] بيحط الـ Content-Type. و [[.json()]] بيحترمه لو اتحط قبله.
- [[type: "about:blank"]] يعني «المشكلة هي معنى الـ status نفسه».
- [[req.originalUrl]] المسار كامل زي ما الطلب جه.

---

## ٤. الاستخدام والناتج

~~~ts
throw problem(409, "Conflict", "Order 9001 is already shipped", { orderId: "9001" });
~~~

### 409 من [[problem]]

~~~bash
curl -i -X POST localhost:6003/orders/9001/cancellation
~~~

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Conflict","status":409,"detail":"Order 9001 is already shipped","orderId":"9001","instance":"/orders/9001/cancellation"}
~~~

[[orderId]] ظهر في المستوى الأول من الـ JSON لأن [[...err.extra]] فرده.

### 400 من JSON مكسور

~~~bash
curl -i -X POST localhost:6003/orders -H 'Content-Type: application/json' -d '{"productId": "7",'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Bad Request","status":400,"detail":"Expected double-quoted property name in JSON at position 18 (line 1 column 19)","instance":"/orders"}
~~~

مكتبناش كود للحالة دي: [[express.json()]] رمى error عليه [[status: 400]]، والـ handler طلّعه. [[position 18]] مكان الحرف اللي وقف عنده الـ parser (العد من صفر): بعد الفاصلة الـ JSON خلص وهو مستني اسم حقل.

### 422 من Zod

~~~bash
curl -i -X POST localhost:6003/orders -H 'Content-Type: application/json' -d '{"productId":"7"}'
~~~

~~~text الناتج
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"number","code":"invalid_type","path":["qty"],"message":"Invalid input: expected number, received undefined"}],"instance":"/orders"}
~~~

سطر الـ status بيقول [[Unprocessable Entity]] (الاسم اللي Node لسه بيستخدمه، شفناه في [[STATUS_CODES]] فوق)، والـ title [[Unprocessable Content]] (اسمه في RFC 9110). نفس الرقم، والعميل بيعتمد على الرقم.

### 500 من غير تسريب

~~~bash
curl -i localhost:6003/boom
~~~

~~~text الناتج
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}
~~~

و console السيرفر طبع [[Error: db password is x]] ومعاه الـ stack. الرسالة عندك، مش عند العميل.

---

## ٥. route مش موجود؟

الـ handler ده بيمسك الأخطاء اللي اترمت **من** routes. لو طلبت مسار مالوش route خالص، Express بيرجّع صفحة HTML بتاعته ([[Cannot POST /nothing]])، لأن مفيش error اترمى أصلًا. الحل middleware قبل الـ error handler وبعد كل الـ routes:

~~~ts
app.use((req, _res, next) => next(problem(404, "Not Found", $__btNo route for $__{req.method} $__{req.path}$__bt)));
~~~

[[next(err)]] بيبعت الـ error للـ handler. جرّبناه:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Not Found","status":404,"detail":"No route for POST /nothing","instance":"/nothing"}
~~~

---

## الخلاصة

| الحقل | معناه |
|---|---|
| [[type]] | نوع المشكلة (URI)، و [[about:blank]] = «معنى الـ status» |
| [[title]] | اسم ثابت للنوع |
| [[status]] | نفس رقم HTTP |
| [[detail]] | شرح الحالة دي بالذات |
| [[instance]] | المسار أو request ID |
| أي حقل زيادة | [[errors]] و [[orderId]]... |

- الـ Content-Type [[application/problem+json]].
- error handler واحد بـ ٤ parameters، بعد كل الـ routes.
- الـ 500 من غير رسالة ولا stack.`,
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
          teach: R`## «عدّي كام وهات كام»

الـ endpoint بياخد رقم الصفحة وحجمها من الـ query string، ويحسب منهم «عدّي كام صف»، ويرجّع الصفحة ومعاها معلومات تعرض بيها «صفحة ٢ من ٥٠».

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. المنتجات كانت ٥٠٠ في الذاكرة بنفس الـ seed اللي في الـ solCode (كل منتج بعد اللي قبله بدقيقة)، والـ stand-in بيعمل [[findMany]] و [[count]] زي Prisma. وجزء «ليه بطيئة» اتجرّب على PostgreSQL 18.6 حقيقي في Docker بمليون صف.

---

## ١. الـ schema بتاع الـ query: [[PageQuery]]

~~~ts
const PageQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
~~~

كل حاجة في الـ query string بتوصل **نص**: [[?page=2]] بيبقى [[req.query.page === "2"]]. فنفك [[page]] حلقة حلقة:

| الحلقة | بتعمل إيه |
|---|---|
| [[z.coerce.number()]] | حوّل النص لرقم ([[Number("2")]] = 2). coerce يعني «اجبر النوع» |
| [[.int()]] | لازم رقم صحيح، مش 2.5 |
| [[.min(1)]] | أقل حاجة 1. الصفحات بتبدأ من 1 |
| [[.default(1)]] | لو مش مبعوت خالص، خليه 1 |

و [[limit]] نفس الكلام ومعاه [[.max(100)]]: من غيره حد يطلب [[?limit=1000000]] والسيرفر يحاول يرجّع الجدول كله.

---

## ٢. الحساب: [[skip]] و [[take]]

~~~ts
  const { page, limit } = PageQuery.parse(req.query);
~~~

[[{ page, limit } = ...]] اسمها destructuring: خد الحقلين دول من الـ object وحط كل واحد في متغير باسمه.

~~~ts
    db.product.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
~~~

- [[orderBy]]: رتّب بالأحدث الأول ([[desc]] = descending، تنازلي). ولو اتنين ليهم نفس الوقت، بالـ [[id]] (اسمه tie-breaker، «فاصل التعادل»)، عشان الترتيب يبقى ثابت كل مرة.
- [[skip: (page - 1) * limit]]: عدّي الصفوف اللي في الصفحات اللي قبل. الصفحة ٣ بـ ٢٠ = عدّي ٤٠.
- [[take: limit]]: هات ٢٠.

Prisma بيترجمهم لـ SQL: [[ORDER BY ... LIMIT 20 OFFSET 40]].

~~~ts
  const [items, total] = await db.$transaction([ findMany(...), db.product.count() ]);
~~~

[[$transaction([...])]] بيشغّل الاستعلامين مع بعض في transaction واحدة، وبيرجّع array بنتايجهم بنفس الترتيب. و [[const [items, total] =]] destructuring للـ array: أول نتيجة في [[items]] والتانية في [[total]].

~~~ts
  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
~~~

[[{ items, page }]] اختصار لـ [[{ items: items, page: page }]]. و [[Math.ceil]] بيقرّب لفوق: ٥٠١ منتج على ١٠ = ٥٠.١، يعني ٥١ صفحة (الأخيرة فيها منتج واحد).

---

## ٣. نشغّله

~~~bash
curl -s "localhost:6004/products?page=2&limit=10"
~~~

~~~text الناتج (الأسماء بس، وبعدين الباقي)
Product 490, Product 489, Product 488, ..., Product 481
{"page":2,"limit":10,"total":500,"totalPages":50}
~~~

الصفحة الأولى ٥٠٠ لـ ٤٩١، فالتانية تبدأ من ٤٩٠. ومن غير أي query: ٢٠ عنصر، وأولهم [[Product 500]]، و [[totalPages]] ٢٥.

### القيم الغلط

~~~bash
curl -s "localhost:6004/products?limit=500"
curl -s "localhost:6004/products?page=0"
curl -s "localhost:6004/products?page=abc"
~~~

~~~text الناتج (حقل errors بس من كل رد، والتلاتة 422)
{"origin":"number","code":"too_big","maximum":100,"inclusive":true,"path":["limit"],"message":"Too big: expected number to be <=100"}
{"origin":"number","code":"too_small","minimum":1,"inclusive":true,"path":["page"],"message":"Too small: expected number to be >=1"}
{"expected":"number","code":"invalid_type","received":"NaN","path":["page"],"message":"Invalid input: expected number, received NaN"}
~~~

- [[inclusive: true]] يعني الحد نفسه مسموح (١٠٠ تمام، ١٠١ لأ).
- [[NaN]] (Not a Number): ده اللي [[Number("abc")]] بيرجّعه. من غير Zod كان هيوصل لـ Prisma ويعمل 500.

---

## ٤. مشكلة الزحلقة

~~~bash
curl -s -X POST localhost:6004/products -H 'Content-Type: application/json' -d '{"name":"NEW"}'
curl -s "localhost:6004/products?page=3&limit=10"
~~~

~~~text الناتج
Product 481, Product 480, Product 479, ..., Product 472
total 501 totalPages 51
~~~

[[Product 481]] كان **آخر** عنصر في صفحة ٢، ودلوقتي **أول** عنصر في صفحة ٣. المنتج الجديد دخل أول القايمة وزق كل حاجة خطوة، و [[OFFSET 20]] لسه بيعدّ ٢٠ من الأول. فالمستخدم اللي بيقلّب هيشوف ٤٨١ مرتين.

---

## ٥. ليه الصفحات البعيدة بطيئة؟

على Postgres 18.6 في Docker، جدول مليون منتج وعليه index على [[("createdAt" DESC, id DESC)]]، و [[EXPLAIN ANALYZE]] بيشغّل الاستعلام ويقول عمل إيه بالظبط:

~~~text صفحة ٢ (OFFSET 20)
Limit (actual time=0.061..0.065 rows=20.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.057..0.061 rows=40.00 loops=1)
Execution Time: 0.077 ms
~~~

~~~text صفحة ٤٥٠٠١ (OFFSET 900000)
Limit (actual time=133.142..133.146 rows=20.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.005..108.057 rows=900020.00 loops=1)
Execution Time: 133.157 ms
~~~

السطر المهم [[rows=]] بتاع الـ Index Scan: في الصفحة القريبة قرا ٤٠ صف عشان يرجّع ٢٠. في البعيدة قرا **٩٠٠٠٢٠** صف ورمى ٩٠٠٠٠٠ منهم، والوقت طلع من ٠.٠٧ ملي ثانية لـ ١٣٣. الـ index بيرتّب، بس مبيقدرش يقفز على الصف رقم ٩٠٠ ألف: لازم يعدّ.

و [[count(*)]] على نفس الجدول:

~~~text الناتج (جزء)
->  Parallel Seq Scan on product (actual time=0.013..23.096 rows=333333.33 loops=3)
Execution Time: 46.895 ms
~~~

Postgres لف على الجدول كله (Seq Scan = scan متسلسل) بـ ٣ عمّال مع بعض، كل واحد حوالي تلت مليون صف. عشان كده العدد الكلي في الجداول الكبيرة بيتكاش أو بيتشال.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[?page=3&limit=20]] | الصفحة التالتة، ٢٠ في الصفحة |
| [[z.coerce.number().int().min(1)]] | نص لرقم صحيح من ١ وطالع |
| [[.max(100)]] | سقف للحجم |
| [[skip: (page - 1) * limit]] | عدّي اللي قبل (OFFSET) |
| [[take: limit]] | هات كام (LIMIT) |
| [[orderBy]] بحقلين | ترتيب ثابت، و id للتعادل |
| [[totalPages]] | [[Math.ceil(total / limit)]] |

- سهلة وفيها «روح لصفحة ٧»، بس الصفحات البعيدة بتبطأ، والعناصر بتتزحلق لو البيانات اتغيرت.
- الحل للقوايم الكبيرة والمتغيرة: الدرس الجاي ([[cursor pagination]]).`,
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
          teach: R`## «هات اللي بعد ده»

بدل رقم صفحة، العميل بيبعت **مؤشر** (cursor) على آخر عنصر شافه، والسيرفر بيرجّع اللي بعده. الـ cursor ده نص فيه وقت آخر عنصر والـ id بتاعه، متحوّل لشكل آمن في الـ URL. هنفك الـ endpoint، وبعدين [[encodeCursor]] و [[decodeCursor]] من الـ solCode، وبعدين نمشي على كل الصفحات ونعدّ.

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. الرسايل ٢٠٠ في الذاكرة زي الـ seed اللي في الـ sol: كل ٤ رسايل ليهم **نفس الثانية بالظبط** (عشان نختبر التعادل)، والـ stand-in بيعمل [[where]] و [[OR]] و [[lt]] و [[orderBy]] زي Prisma. وجزء السرعة اتجرّب على PostgreSQL 18.6 في Docker.

---

## ١. [[limit]] من غير Zod

~~~ts
  const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
~~~

نفكه من جوه لبرة:

| الخطوة | الحتة | [[?limit=-5]] | [[?limit=abc]] |
|---|---|---|---|
| ١ | [[Number(req.query.limit)]] | -5 | NaN |
| ٢ | [[Math.trunc(...)]] شيل الكسر | -5 | NaN |
| ٣ | «أو ٢٠»: لو falsy خد ٢٠ | -5 | 20 |
| ٤ | [[Math.max(..., 1)]] مش أقل من ١ | 1 | 20 |
| ٥ | [[Math.min(..., 100)]] مش أكتر من ١٠٠ | 1 | 20 |

«أو» في الخطوة ٣ هي [[||]] في الكود. [[NaN]] و [[0]] falsy، يعني JavaScript بيعتبرهم «لأ» في الشروط، فبياخدوا الافتراضي. جرّبنا الاتنين: [[?limit=-5]] رجّع عنصر واحد، و [[?limit=abc]] رجّع ٢٠.

---

## ٢. فك الـ cursor

~~~ts
  const after = typeof req.query.after === "string" ? decodeCursor(req.query.after) : null;
~~~

[[typeof x === "string"]] بيتأكد إن [[after]] نص واحد (ممكن يوصل array لو اتكرر في الـ URL). لو موجود نفكه، ولو لأ يبقى [[null]] = أول صفحة.

### [[encodeCursor]] و [[decodeCursor]] (من الـ solCode)

~~~ts
function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}
~~~

- [[JSON.stringify(c)]]: الـ object يبقى نص JSON. الـ Date بيتحوّل لنص ISO لوحده.
- [[Buffer.from(...)]]: النص يبقى bytes.
- [[.toString("base64url")]]: الـ bytes تتكتب بحروف وأرقام و [[-]] و [[_]] بس، فتتحط في URL من غير مشاكل. base64 العادي فيه [[+]] و [[/]] و [[=]] ودول ليهم معنى في الـ URL، والنسخة url بتبدّلهم.

~~~ts
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
~~~

العكس بالظبط، ومعاه فحص:

- [[Buffer.from(s, "base64url").toString("utf8")]] يرجّع النص.
- [[JSON.parse]] يرجّع الـ object. لو النص زبالة بيرمي.
- [[new Date(createdAt)]] النص يرجع Date. ولو مش تاريخ، [[getTime()]] بيرجّع NaN.
- [[try]] و [[catch]]: أي error جوه الـ try (من الـ parse أو من الـ throw بتاعنا) بيروح للـ catch، اللي بيرمي 400 بدل 500.

~~~bash
curl -s -w " %{http_code}\n" "localhost:6004/messages?after=garbage"
~~~

~~~text الناتج
{"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid cursor","instance":"/messages?after=garbage"} 400
~~~

---

## ٣. الاستعلام: «اللي بعد آخر عنصر»

~~~ts
    where: after ? { OR: [{ createdAt: { lt: after.createdAt } }, { createdAt: after.createdAt, id: { lt: after.id } }] } : {},
~~~

[[lt]] = less than (أصغر من). والشرط بالكلام: هات الرسايل اللي **يا** وقتها أقدم من آخر واحدة، **يا** نفس وقتها بالظبط والـ id بتاعها أصغر. ولو مفيش cursor: [[{}]] يعني من غير شرط.

~~~ts
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
~~~

- الترتيب لازم يبقى **نفس** الحقلين اللي في الـ cursor وبنفس الاتجاه، وإلا «اللي بعد» ملهاش معنى.
- [[limit + 1]]: بنطلب واحد زيادة. لو جه، يبقى فيه صفحة كمان. حيلة بتغنيك عن [[count]].

~~~ts
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const next = rows.length > limit && last ? encodeCursor({ createdAt: last.createdAt, id: last.id }) : null;
~~~

- [[slice(0, limit)]] بيرجّع أول [[limit]] عنصر بس (الزيادة كانت للمعرفة).
- [[.at(-1)]] آخر عنصر في الـ array.
- [[&&]] يعني «و»: لو جه أكتر من limit **و** فيه آخر عنصر، اعمل cursor منه. غير كده [[null]].

~~~ts
  res.json({ items, nextCursor: next, links: { next: next && $__bt/messages?limit=$__{limit}&after=$__{next}$__bt } });
~~~

[[next && ...]]: لو [[next]] null، النتيجة null. ولو فيه cursor، النتيجة اللينك. فالعميل مش محتاج يبني URL: ياخد [[links.next]] زي ما هو.

---

## ٤. نشوفه

~~~bash
curl -s "localhost:6004/messages?limit=3"
~~~

~~~text الناتج (بعد ما اتضافت رسالتين جداد، ومتقسّم على سطور عشان يتقري)
{"items":[{"id":"m202","text":"new B",...},{"id":"m201","text":"new A",...},{"id":"m200","text":"msg 200","createdAt":"2026-01-01T00:00:49.000Z"}],
 "nextCursor":"eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ",
 "links":{"next":"/messages?limit=3&after=eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ"}}
~~~

نفك الـ cursor ده:

~~~bash
node -e "console.log(Buffer.from('eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ','base64url').toString())"
~~~

~~~text الناتج
{"createdAt":"2026-01-01T00:00:49.000Z","id":"m200"}
~~~

أي حد يقدر يفكه. ده encoding مش تشفير. والصفحة اللي بعده:

~~~text الناتج (الـ id والوقت)
m199 2026-01-01T00:00:49.000Z
m198 2026-01-01T00:00:49.000Z
m197 2026-01-01T00:00:49.000Z
~~~

التلاتة **نفس الثانية** بتاعة m200. لو الشرط كان «أقدم من» بس، كانوا هيضيعوا. الشق التاني من الـ OR ([[id: { lt }]]) هو اللي جابهم.

---

## ٥. المشي على كل الصفحات (الـ solCode)

~~~ts
let url: string | null = "/messages?limit=15";
while (url) {
  const body: any = await (await fetch(BASE + url)).json();
  // ...
  url = body.links.next;
}
~~~

- [[string | null]]: المتغير يا نص يا null.
- [[while (url)]]: كمّل طول ما فيه لينك. آخر صفحة [[links.next]] بيبقى null فاللفة بتقف.
- [[await (await fetch(...)).json()]]: الأول استنى الرد، وبعدين استنى قراية الـ body كـ JSON.
- [[new Set()]] و [[seen.add(m.id)]]: الـ Set مبيشيلش تكرار، فحجمه = عدد الـ ids المختلفة.
- في الصفحة التالتة بيضيف رسالتين جداد (كأن حد بعت وانت بتعمل scroll).

~~~bash
BASE=http://localhost:6004 node walk.ts
~~~

~~~text الناتج
{ pages: 14, count: 200, unique: 200 }
~~~

[[BASE=... node]] بيحط متغير بيئة للأمر ده بس، والسكربت بيقراه بـ [[process.env.BASE]]. والنتيجة: ٢٠٠ عدّة و ٢٠٠ مختلفين، يعني مفيش تكرار ومفيش حاجة فاتت، حتى مع الإضافة في النص. ١٤ صفحة لأن ٢٠٠ على ١٥ = ١٣ صفحة كاملة وصفحة فيها ٥. والرسالتين الجداد مظهروش لأنهم **أحدث** من أول صفحة، والمشي ماشي لتحت.

### من غير الـ tie-breaker

شغّلنا نسخة من السيرفر الشرط فيها [[{ createdAt: { lt: after.createdAt } }]] بس:

~~~text الناتج
{ pages: 13, count: 188, unique: 188 }
~~~

١٢ رسالة ضاعوا: كل مرة آخر عنصر في الصفحة كان ليه «إخوات» في نفس الثانية، والشرط عدّاهم.

---

## ٦. ليه أسرع؟

على Postgres 18.6 بمليون صف و index على [[("createdAt" DESC, id DESC)]]، الصفحة اللي بعد العنصر رقم ١٠٠ (يعني بعد حوالي ٩٩٩٩٠٠ صف من الأول):

~~~text الناتج
Limit (actual time=0.013..0.016 rows=21.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.012..0.014 rows=21.00 loops=1)
        Index Cond: (ROW("createdAt", id) < ROW('2026-01-01 01:40:00+00'::timestamp with time zone, 100))
Execution Time: 0.034 ms
~~~

[[Index Cond]]: Postgres قفز في الـ index على المكان على طول، وقرا ٢١ صف بس ([[limit + 1]]). قارنها بالـ OFFSET في الدرس اللي فات: ٩٠٠ ألف صف و ١٣٣ ملي ثانية. والشرط ده [[ROW(a, b) < ROW(x, y)]] هو نفس الـ OR بتاعنا مكتوب في SQL مباشرة (row comparison).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| ترتيب بـ [[createdAt]] ثم [[id]] | ترتيب ثابت وفريد |
| الـ cursor = [[{ createdAt, id }]] لآخر عنصر | «كمّل من هنا» |
| [[base64url]] | يتحط في URL. مش تشفير |
| [[OR]]: أقدم، أو نفس الوقت و id أصغر | من غير الشق التاني بتضيع عناصر |
| [[take: limit + 1]] | تعرف فيه صفحة جاية ولا لأ |
| [[links.next]] | العميل ميبنيش URLs |
| cursor بايظ | 400 مش 500 |

- سريع في أي عمق ومفيش تكرار، بس مفيش «صفحة ٧ من ١٢».
- محتاج index على نفس حقول الترتيب.`,
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
          teach: R`## الفلاتر في قايمة مقفولة

العميل بيقول عايز إيه في الـ query string، والسيرفر بيقبل بس اللي في القايمة اللي هو كاتبها (whitelist، يعني «القايمة البيضا»: المسموح بالاسم، وأي حاجة تانية مرفوضة). وفوق كل الفلاتر شرط ثابت: الطلبات بتاعتك انت بس.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. الطلبات كانت ٤ في الذاكرة: ٣ بتوع المستخدم [[u1]] (مجموعهم ١٢٠ و ٤٠ و ٩٠٠) وواحد بتاع [[u2]] بـ ٥٠٠٠، والـ stand-in بيفهم [[where]] و [[gte]] و [[contains]] و [[orderBy]] زي Prisma.

---

## ١. الـ query بيوصل إزاي؟

قبل الكود، شوف [[req.query]] الخام في Express 5 (route بيرجّعه زي ما هو):

~~~text الناتج
?minTotal=100        => {"minTotal":"100"}
?status=a&status=b   => {"status":["a","b"]}
?filter[x]=1         => {"filter[x]":"1"}
~~~

- الرقم وصل **نص** [["100"]].
- الاسم المتكرر وصل **array**.
- الأقواس المربعة فضلت جزء من الاسم، لأن الـ query parser الافتراضي في Express 5 هو البسيط ([[simple]]). في Express 4 كان الافتراضي [[extended]] وكان بيعملها object. يعني شكل [[req.query]] مش مضمون، وعشان كده Zod قبل أي استخدام.

---

## ٢. الـ whitelist: [[ListQuery]]

~~~ts
const ListQuery = z.object({
  status: z.enum(["pending", "paid", "shipped"]).optional(),
  minTotal: z.coerce.number().nonnegative().optional(),
  q: z.string().trim().min(2).max(100).optional(),
  sort: z.enum(["createdAt", "-createdAt", "total", "-total"]).default("-createdAt"),
});
~~~

| الحقل | القاعدة | ليه |
|---|---|---|
| [[status]] | [[z.enum([...])]]: واحدة من ٣ قيم بالظبط | مفيش حالة مخترعة |
| [[minTotal]] | [[coerce.number()]] و [[nonnegative()]] (مش سالب) | النص يبقى رقم، ومفيش [[-1]] |
| [[q]] | [[trim()]] يشيل المسافات من الأطراف، وبعدين من ٢ لـ ١٠٠ حرف | بحث بحرف واحد بيرجّع نص الجدول |
| [[sort]] | ٤ اختيارات بس، والافتراضي [[-createdAt]] | مفيش ترتيب بأي عمود |

و [[.optional()]] معناها الفلتر ده مش لازم. و [[z.object]] بيرمي أي حقل مش متعرّف فيه من النتيجة.

---

## ٣. الـ handler

~~~ts
  const { status, minTotal, q, sort } = ListQuery.parse(req.query);
  const field = sort.replace("-", "") as "createdAt" | "total";
~~~

- الحقول اللي مش مبعوتة بتبقى [[undefined]] (إلا [[sort]] ليه default).
- [[sort.replace("-", "")]]: شيل الشرطة، فـ [["-total"]] يبقى [["total"]].
- [[as "createdAt" | "total"]]: كلام لـ TypeScript بس، «النوع واحد من الاتنين دول». مبيعملش حاجة وقت التشغيل.

~~~ts
    where: { userId: req.user.id, status, total: minTotal === undefined ? undefined : { gte: minTotal }, customerName: q ? { contains: q, mode: "insensitive" } : undefined },
~~~

| الشرط | معناه |
|---|---|
| [[userId: req.user.id]] | من التوكن، مش من العميل. ثابت دايمًا |
| [[status]] | لو undefined، Prisma بيتجاهله |
| [[total: { gte: minTotal }]] | [[gte]] = greater than or equal، أكبر من أو يساوي |
| [[customerName: { contains: q, mode: "insensitive" }]] | الاسم فيه النص ده، من غير فرق بين capital و small |

[[mode: "insensitive"]] على Postgres بيتحول لـ [[ILIKE]] (من docs Prisma).

~~~ts
    orderBy: [{ [field]: sort.startsWith("-") ? "desc" : "asc" }, { id: "asc" }], take: 50,
~~~

- [[{ [field]: ... }]] الأقواس المربعة حوالين اسم الحقل اسمها computed key: اسم الحقل هو **قيمة** المتغير [[field]]، يعني [[{ total: "desc" }]].
- [[startsWith("-")]]: لو فيه شرطة يبقى تنازلي ([[desc]])، وإلا تصاعدي ([[asc]]).
- [[{ id: "asc" }]] للتعادل، و [[take: 50]] سقف.

---

## ٤. نشغّله

[[TOKEN]] في الأوامر متغير bash فيه توكن [[u1]].

### الترتيب بالمجموع تنازلي

~~~bash
curl -s "localhost:6004/orders?sort=-total" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (مختصر)
{"items":[{"id":"o3",...,"total":900,...},{"id":"o1",...,"total":120,...},{"id":"o2",...,"total":40,...}]}
~~~

ومن غير [[sort]] الافتراضي الأحدث الأول: [[o3 2026-03-03, o2 2026-03-02, o1 2026-03-01]].

### بحث ومبلغ مع بعض

~~~bash
curl -s "localhost:6004/orders?q=AHMED&minTotal=100" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (الـ id والاسم والمجموع)
o3 ahmed samir 900, o1 Ahmed Ali 120
~~~

[[AHMED]] لقى [[ahmed samir]] و [[Ahmed Ali]] (insensitive)، و [[minTotal=100]] شال طلب الـ ٤٠.

### المرفوض

~~~text الناتج (errors بس، وكلهم 422)
?sort=password       {"code":"invalid_value","values":["createdAt","-createdAt","total","-total"],"path":["sort"],...}
?status=deleted      {"code":"invalid_value","values":["pending","paid","shipped"],"path":["status"],...}
?q=a                 {"origin":"string","code":"too_small","minimum":2,"path":["q"],...}
?minTotal=-1         {"origin":"number","code":"too_small","minimum":0,"path":["minTotal"],...}
?status=paid&status=shipped   {"code":"invalid_value",...,"path":["status"],...}
~~~

الأخير مهم: الـ array اللي شفناه في أول الدرس مش واحدة من القيم المسموحة، فاترفض بدل ما يوصل للقاعدة بشكل غريب.

### محاولة تشوف طلبات حد تاني

~~~bash
curl -s "localhost:6004/orders?userId=u2" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (الـ id وصاحبه)
o3:u1, o2:u1, o1:u1
~~~

[[userId]] مش في الـ schema، فـ [[z.object]] شاله، والشرط الثابت من التوكن هو اللي اتطبق. طلب [[u2]] (الـ ٥٠٠٠) مظهرش.

---

## ٥. ليه الترتيب لازم whitelist؟

لو [[sort]] كان [[z.string()]] على جدول مستخدمين، [[?sort=passwordHash]] مش هيرجّع الـ hash نفسه، بس **ترتيب** النتايج بيقول مين الـ hash بتاعه أكبر من مين. المهاجم يعمل حسابات بباسوردات يعرفها، ويشوف الضحية بينهم فين، ويضيّق المدى. ده اسمه sort oracle. والسبب التاني: الترتيب بعمود مالوش index على جدول كبير بيخلي القاعدة تلف على الجدول كله.

---

## الخلاصة

| الحتة | الفكرة |
|---|---|
| [[z.object({...})]] | الفلاتر المسموحة بس، والباقي بيتشال |
| [[z.enum]] | قيم محددة (حالة، وترتيب) |
| [[z.coerce.number()]] | الأرقام بتوصل نصوص |
| [[-total]] | الشرطة = تنازلي |
| [[userId: req.user.id]] | الملكية من التوكن، مش من الـ query |
| [[undefined]] في [[where]] | Prisma بيتجاهل الفلتر |
| [[{ id: "asc" }]] و [[take]] | ترتيب ثابت وسقف |

- متبعتش [[req.query]] لـ [[where]] زي ما هو أبدًا.
- الترتيب نفسه ممكن يسرّب بيانات.`,
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
          teach: R`## نسختين من نفس الـ endpoint

الـ API القديم بيرجّع الاسم حقل واحد ([[name]])، والجديد عايز يرجّعه حقلين ([[firstName]] و [[lastName]]). ده تغيير **بيكسر**: أي تطبيق بيقرا [[user.name]] هيلاقيه undefined. فبنعمل [[/v2]] جنب [[/v1]]، والقديم يفضل شغال، ومعاه headers بتقول «أنا ماشي، والبديل هناك».

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠٠٠)، و [[getUser]] كانت بترجّع [[{ id, firstName: "Ali", lastName: "Hassan" }]]. و curl 8.22 من Git Bash، و [[date]] في [[ubuntu:24.04]] على Docker، و PowerShell 7.

---

## ١. router لكل version

~~~ts
const v1 = express.Router();
const v2 = express.Router();
~~~

[[express.Router()]] بيعمل «app صغير» تسجّل فيه routes، وبعدين تركّبه على مسار. كل version ليه router لوحده.

~~~ts
app.use("/v1", v1);
app.use("/v2", v2);
~~~

[[app.use("/v1", v1)]] معناها «أي طلب أوله [[/v1]] ودّيه لـ [[v1]]، وشيل [[/v1]] من أوله». فالـ route اللي جوه مكتوب [[/users/:id]]، بس العنوان الحقيقي [[/v1/users/:id]].

---

## ٢. v1: الشكل القديم + إعلان الوفاة

~~~ts
v1.get("/users/:id", async (req, res) => {
  const u = await getUser(req.params.id);
~~~

الاتنين بيجيبوا البيانات من **نفس** المكان ([[getUser]]). الـ version مش نسخة تانية من الكود كله: هو بس شكل الرد.

~~~ts
  res.set({ Deprecation: "@1767225600", Sunset: "Wed, 30 Jun 2027 23:59:59 GMT", Link: '</v2/users>; rel="successor-version"' });
~~~

[[res.set({...})]] بيحط كذا header مرة واحدة. الـ ٣ headers:

| الـ header | القيمة | معناها |
|---|---|---|
| [[Deprecation]] | [[@1767225600]] | deprecated (متبطّل استخدامه) من التاريخ ده. [[@]] وبعدها unix timestamp (RFC 9745) |
| [[Sunset]] | تاريخ HTTP | هيبطل يشتغل خالص من اليوم ده (RFC 8594) |
| [[Link]] | [[</v2/users>; rel="successor-version"]] | العنوان بين [[< >]]، و [[rel]] نوع العلاقة: «النسخة اللي جاية بعدي» |

### unix timestamp يعني إيه؟

عدد الثواني من أول يناير ١٩٧٠ (UTC). نحوّله لتاريخ:

~~~bash
date -u -d @1767225600
~~~

~~~text الناتج (ubuntu:24.04)
Thu Jan  1 00:00:00 UTC 2026
~~~

[[-u]] بتوقيت UTC، و [[-d]] (date) «اعرض التاريخ ده بدل دلوقتي»، و [[@]] معناها «اللي جاي ثواني من ١٩٧٠». وعلى الماك [[date -u -r 1767225600]] (من الـ docs). وفي PowerShell:

~~~powershell
[DateTimeOffset]::FromUnixTimeSeconds(1767225600).UtcDateTime
~~~

~~~text الناتج (PowerShell 7)
Thursday, January 1, 2026 12:00:00 AM
~~~

يعني v1 deprecated من أول ٢٠٢٦، وهيتقفل آخر يونيو ٢٠٢٧ (وفعلًا ٣٠ يونيو ٢٠٢٧ يوم أربع: [[date -u -d 2027-06-30 +%A]] طلّعت [[Wednesday]]).

~~~ts
  res.json({ id: u.id, name: $__bt$__{u.firstName} $__{u.lastName}$__bt });
~~~

الشكل القديم: الاسمين في حقل واحد بينهم مسافة، بـ template string.

---

## ٣. v2: الشكل الجديد

~~~ts
  res.json({ id: u.id, firstName: u.firstName, lastName: u.lastName });
~~~

من غير headers الإعلان، لأنه الحالي.

---

## ٤. نكلّمهم

~~~bash
curl -i localhost:6000/v1/users/1
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Deprecation: @1767225600
Sunset: Wed, 30 Jun 2027 23:59:59 GMT
Link: </v2/users>; rel="successor-version"
Content-Type: application/json; charset=utf-8

{"id":"1","name":"Ali Hassan"}
~~~

~~~bash
curl -i localhost:6000/v2/users/1
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{"id":"1","firstName":"Ali","lastName":"Hassan"}
~~~

و [[/v3/users/1]] رجّع [[404 Not Found]]: مفيش router متركّب عليه.

ومن PowerShell تقدر تقرا header واحد:

~~~powershell
(Invoke-WebRequest http://localhost:6000/v1/users/1).Headers["Sunset"]
~~~

~~~text الناتج
Wed, 30 Jun 2027 23:59:59 GMT
~~~

[[Invoke-WebRequest]] بيرجّع object فيه [[.Headers]]، والأقواس المربعة بتجيب header باسمه.

---

## ٥. إمتى محتاج version أصلًا؟

| التغيير | بيكسر؟ |
|---|---|
| حقل جديد في الرد | لأ |
| endpoint جديد | لأ |
| فلتر اختياري جديد | لأ |
| حذف حقل أو تغيير اسمه | أيوه |
| تغيير نوع حقل ([[id]] من رقم لنص) | أيوه |
| حقل بقى مطلوب في الطلب | أيوه |
| status code اتغير | أيوه |
| قيمة enum جديدة والعميل بيعمل switch عليها | غالبًا |

---

## الخلاصة

- [[express.Router()]] لكل version، و [[app.use("/v1", v1)]] يركّبه.
- الاتنين فوق نفس الـ service، والفرق شكل الرد بس.
- القديم بيعلن: [[Deprecation: @<unix>]] و [[Sunset: <تاريخ HTTP>]] و [[Link: <...>; rel="successor-version"]].
- بعد الـ Sunset: [[410 Gone]].
- version جديد للتغيير اللي بيكسر بس.`,
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
          teach: R`## ٣ endpoints، و ٣ سياسات كاش

كل رد بيقول للمتصفح والـ CDN (السيرفرات اللي بتكاش قدامك) «تقدر تخزّني؟ وقد إيه؟» عن طريق header اسمه [[Cache-Control]]. ومعاه [[ETag]]: بصمة للنسخة، عشان المتصفح يسأل «اتغيرت؟» بدل ما ينزّل الرد كله تاني. المثال فيه منتج عام، وبيانات المستخدم، وبيانات حساسة، وكل واحد ليه سياسة.

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠٠١)، والمنتج في الذاكرة [[{ id: "1", name: "Mug", price: 150, version: 1 }]] ومعاه route [[PATCH]] بيزوّد الـ version. و curl 8.22 من Git Bash، و [[curl.exe]] من PowerShell 7.6 و Windows PowerShell 5.1.

---

## ١. المنتج العام سطر سطر

~~~ts
  res.set({ ETag: $__bt"$__{p.id}-$__{p.version}"$__bt, "Cache-Control": "public, max-age=60, stale-while-revalidate=300" });
~~~

### الـ ETag

[[$__bt"$__{p.id}-$__{p.version}"$__bt]] template string بيطلّع [["1-1"]]: الـ id، وشرطة، ورقم النسخة. **علامات التنصيص جزء من القيمة**: الـ ETag في HTTP لازم يبقى بين [[" "]]. ولما المنتج يتعدّل، الـ version بيزيد، فالبصمة بتتغير.

### الـ Cache-Control

| الـ directive | معناه |
|---|---|
| [[public]] | أي كاش يخزّنه: المتصفح والـ CDN |
| [[max-age=60]] | الرد fresh (طازة) ٦٠ ثانية: يتستخدم من غير ما يسأل السيرفر |
| [[stale-while-revalidate=300]] | بعد الـ ٦٠ ثانية، يتستخدم القديم لحد ٥ دقايق كمان **وهو بيجيب الجديد في الخلفية** |

~~~ts
  if (req.fresh) return res.status(304).end();
~~~

[[req.fresh]] في Express بيقارن header [[If-None-Match]] اللي جاي من العميل بالـ ETag اللي احنا لسه حاطينه في الرد. لو زي بعض يبقى [[true]]: العميل عنده نفس النسخة، فنرد [[304 Not Modified]] من غير body. ولازم [[res.set]] يبقى **قبل** [[req.fresh]]، لأنه بيقارن بالـ ETag اللي على الرد.

---

## ٢. التسلسل كله

### أول طلب

~~~bash
curl -i localhost:6001/products/1
~~~

~~~text الناتج
HTTP/1.1 200 OK
ETag: "1-1"
Cache-Control: public, max-age=60, stale-while-revalidate=300
Content-Type: application/json; charset=utf-8
Content-Length: 47

{"id":"1","name":"Mug","price":150,"version":1}
~~~

### نفس الطلب ومعاه البصمة

~~~bash
curl -i localhost:6001/products/1 -H 'If-None-Match: "1-1"'
~~~

~~~text الناتج
HTTP/1.1 304 Not Modified
ETag: "1-1"
Cache-Control: public, max-age=60, stale-while-revalidate=300
~~~

مفيش [[Content-Type]] ولا body. العميل يستخدم النسخة اللي عنده. والعلامة المفردة [[' ']] حوالين الـ header كله عشان bash ميشيلش الـ [[" "]] اللي جوه.

### بعد التعديل

~~~bash
curl -X PATCH localhost:6001/products/1 -H 'Content-Type: application/json' -d '{"price":160}'
curl -i localhost:6001/products/1 -H 'If-None-Match: "1-1"'
~~~

~~~text الناتج
HTTP/1.1 200 OK
ETag: "1-2"
{"id":"1","name":"Mug","price":160,"version":2}
~~~

البصمة القديمة مبقتش زي الجديدة، فالرد كامل ومعاه [["1-2"]].

### حالات المقارنة

~~~text الناتج (الـ status بس، والـ ETag الحالي "1-2")
If-None-Match: 1-2                    200   من غير تنصيص: مش ETag صحيح
If-None-Match: W/"1-2"                304   المقارنة هنا weak، فالـ W/ مبتفرقش
If-None-Match: "1-1", "1-2"           304   ينفع تبعت كذا بصمة، ولو واحدة طابقت يبقى 304
"1-2" ومعاه Cache-Control: no-cache   200   العميل طالب نسخة جديدة، فـ req.fresh بقى false
~~~

[[W/]] قبل الـ ETag معناها weak: «نفس المعنى»، مش لازم نفس البايتات. ومع [[If-None-Match]] المقارنة دايمًا weak.

---

## ٣. بيانات المستخدم: [[private, no-cache]]

~~~ts
  res.set("Cache-Control", "private, no-cache");
~~~

- [[private]]: المتصفح بس يخزّنه، الـ CDN لأ. لو CDN خزّن رد [[/me]]، المستخدم التاني ممكن ياخد بيانات الأول.
- [[no-cache]]: **مش** معناها «متخزّنش». معناها «خزّن، بس اسأل السيرفر قبل كل استخدام».

~~~text الناتج
HTTP/1.1 200 OK
Cache-Control: private, no-cache
ETag: W/"20-k32tt//YV7rq4X/VfnMMpdvgusM"

{"id":"u1","emailVerified":true}
~~~

احنا محطّيناش ETag هنا، بس Express عمل واحد weak لوحده من الـ body ([[20]] بالـ hex = ٣٢، طول الـ JSON). ولما بعتناه في [[If-None-Match]] رجع [[304]]. الفرق عن المنتج: هنا الـ handler اشتغل والـ JSON اتعمل وبعدين اترمى، فالتوفير في الشبكة بس. في المنتج رجعنا 304 قبل [[res.json]].

---

## ٤. البيانات الحساسة: [[no-store]]

~~~ts
  res.set("Cache-Control", "no-store");
~~~

~~~text الناتج
HTTP/1.1 200 OK
Cache-Control: no-store
ETag: W/"21-mj4hVhkX7qNWuHc4nyuCwiH2rrU"

[{"brand":"visa","last4":"4242"}]
~~~

[[no-store]]: متتخزنش في أي مكان، ولا على ديسك المتصفح. للكروت والتوكنات.

---

## ٥. على ويندوز

في PowerShell اكتب [[curl.exe]] مش [[curl]] (في Windows PowerShell 5.1 [[curl]] اسم تاني لـ [[Invoke-WebRequest]]). والتنصيص بيفرق بين النسختين:

~~~powershell
curl.exe -s -o NUL -w "%{http_code}$__btn" http://localhost:6001/products/1 -H 'If-None-Match: "1-2"'
~~~

| الـ shell | النتيجة |
|---|---|
| PowerShell 7.6 | [[304]] |
| Windows PowerShell 5.1 | [[200]]: الـ [[" "]] اللي جوه اتشالت قبل ما توصل لـ curl |
| Windows PowerShell 5.1 مع [[\"1-2\"]] | [[304]] |

- [[NUL]] هو [[/dev/null]] بتاع ويندوز.
- [[$__btn]] (backtick ثم n) سطر جديد في PowerShell.

وبـ [[Invoke-WebRequest]] في PowerShell 7:

~~~powershell
$r = Invoke-WebRequest http://localhost:6001/products/1 -Headers @{ 'If-None-Match' = '"1-2"' } -SkipHttpErrorCheck
$r.StatusCode
~~~

~~~text الناتج
304
~~~

[[@{ }]] hashtable فيها الـ headers، و [[-SkipHttpErrorCheck]] (موجود في 7 بس) عشان ميرميش error على أي status مش 2xx.

---

## الخلاصة

| الرد | Cache-Control | ليه |
|---|---|---|
| بيانات عامة | [[public, max-age=60, stale-while-revalidate=300]] + ETag | المتصفح والـ CDN يوفّروا |
| بيانات المستخدم | [[private, no-cache]] | المتصفح بس، ويتأكد كل مرة |
| حساسة | [[no-store]] | ولا أي مكان |

- [[If-None-Match]] + نفس الـ ETag = [[304]] من غير body.
- الـ ETag بين [[" "]]، و [[W/]] مبتفرقش في If-None-Match.
- [[no-cache]] مش «متكاشش». اللي معناها كده [[no-store]].
- ETag من الـ version بيخليك ترد 304 قبل ما تعمل الـ JSON.`,
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
          teach: R`## «عدّل، بشرط إن محدش سبقني»

العميل بيبعت مع التعديل رقم النسخة اللي عدّل عليها في header اسمه [[If-Match]]. السيرفر بيعدّل **بشرط** إن النسخة اللي في القاعدة لسه هي نفس الرقم، وفي نفس الخطوة بيزوّد الرقم. لو حد عدّل قبله، الشرط مش هيلاقي صف، فالرد [[412 Precondition Failed]] («الشرط اللي بعته مش متحقق»).

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٢)، و curl 8.22 من Git Bash. المستند كان في الذاكرة [[{ id: "1", ownerId: "u1", title: "Plan", body: "v1 text", version: 3 }]]، والـ stand-in بيعمل [[updateMany]] (بيرجّع [[count]]) و [[count]] زي Prisma، ومعاه route [[GET]] بيرجّع [[ETag: "3"]].

---

## ١. لازم يبعت النسخة

~~~ts
  const ifMatch = req.get("if-match");
  if (!ifMatch) return res.status(428).json({ title: "If-Match header required" });
~~~

- [[req.get("if-match")]] بيقرا header باسمه، من غير فرق بين capital و small.
- مش مبعوت؟ [[428 Precondition Required]]: «لازم تبعت شرط». من غيره العميل اللي ناسي الـ header هيكتب فوق أي حاجة.

~~~text الناتج (PATCH من غير If-Match)
{"title":"If-Match header required"} 428
~~~

---

## ٢. من ETag لرقم

~~~ts
  const version = Number(ifMatch.replaceAll('"', ""));
~~~

الـ ETag بيوصل [["3"]] **بعلامات التنصيص**. [[replaceAll('"', "")]] بيشيلهم كلهم فيفضل [[3]] نص، و [[Number]] يخليه رقم.

---

## ٣. الفحص والكتابة في خطوة واحدة

~~~ts
  const { count } = await db.document.updateMany({
    where: { id: req.params.id, ownerId: req.user.id, version },
    data: { ...DocPatch.parse(req.body), version: { increment: 1 } },
  });
~~~

| الحتة | معناها |
|---|---|
| [[where.id]] | المستند ده |
| [[where.ownerId: req.user.id]] | وبتاع المستخدم ده |
| [[where.version]] | **والنسخة لسه زي ما العميل شافها** |
| [[...DocPatch.parse(req.body)]] | التعديلات بعد Zod ([[title]] و [[body]] اختياريين) |
| [[version: { increment: 1 }]] | زوّد النسخة واحد في نفس الأمر |
| [[{ count }]] | عدد الصفوف اللي اتعدّلت |

ده في SQL [[UPDATE ... SET ..., version = version + 1 WHERE id = ? AND "ownerId" = ? AND version = ?]]. القاعدة بتعمل الفحص والكتابة **مع بعض**، فمفيش لحظة بين «اتأكدت» و «كتبت» حد تاني يدخل فيها. ولو كتبتها «اقرا الـ version، قارن في JavaScript، وبعدين اكتب»، طلبين ممكن يقروا نفس الرقم في نفس اللحظة ويعدّوا الاتنين.

ليه [[updateMany]] مش [[update]]؟ لأن [[update]] لما ميلاقيش صف بيرمي error، و [[updateMany]] بيرجّع [[count: 0]] بهدوء، وده بالظبط اللي محتاجينه (من docs Prisma).

---

## ٤. [[count === 0]]: ليه؟

~~~ts
  if (count === 0) {
    const exists = await db.document.count({ where: { id: req.params.id, ownerId: req.user.id } });
    return res.status(exists ? 412 : 404).end();
  }
~~~

صفر صفوف ليها سببين، فبنسأل سؤال تاني من غير شرط الـ version:

- موجود وبتاعه؟ يبقى النسخة اتغيرت: [[412]].
- مش موجود، أو بتاع حد تاني: [[404]] (زي درس [[4xx صح]]، مش هنقوله إنه موجود).
- [[exists ? 412 : 404]]: [[count]] بيرجّع رقم، و ١ truthy و ٠ falsy.

---

## ٥. النجاح

~~~ts
  res.set("ETag", $__bt"$__{version + 1}"$__bt).status(204).end();
~~~

الـ ETag الجديد في الرد، بتنصيص، عشان العميل يكمّل عليه من غير GET.

---

## ٦. نشغّله

~~~bash
curl -i localhost:6002/documents/1 -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (جزء)
HTTP/1.1 200 OK
ETag: "3"
{"id":"1","title":"Plan","body":"v1 text"}
~~~

طلبين PATCH بنفس [[If-Match: "3"]] ورا بعض:

~~~bash
curl -i -X PATCH localhost:6002/documents/1 -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -H 'If-Match: "3"' -d '{"body":"first"}'
curl -i -X PATCH localhost:6002/documents/1 -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -H 'If-Match: "3"' -d '{"body":"second"}'
~~~

~~~text الناتج
HTTP/1.1 204 No Content
ETag: "4"

HTTP/1.1 412 Precondition Failed
~~~

الأول عدّل وخلّى النسخة ٤. التاني لسه شايف ٣، فاترفض. والمستند فيه [[first]] مش [[second]]: محدش كتب فوق التاني.

وبتوكن مستخدم تاني و [[If-Match: "4"]]: [[404 Not Found]].

### حالات حدودية

~~~text الناتج
If-Match: W/"4"    412   Number('W/4') = NaN، فمفيش صف. والمواصفة نفسها بتقول If-Match محتاج مقارنة strong
If-Match: *        412   في المواصفة * معناها «أي نسخة موجودة»، والكود البسيط ده مش بيدعمها
~~~

---

## ٧. الواجهة (الـ solCode)

~~~ts
async function loadDoc(id: string) {
  const res = await fetch($__bt$__{BASE}/documents/$__{id}$__bt, { headers: auth });
  return { doc: (await res.json()) as Doc, etag: res.headers.get("ETag")! };
}
~~~

[[res.headers.get("ETag")]] بيقرا الـ header من الرد. و [[!]] في الآخر كلام لـ TypeScript: «متأكد إنه مش null».

~~~ts
  if (res.status === 412) {
    const latest = await loadDoc(id);
    return { ok: false as const, message: "حد عدّل المستند، راجع التغييرات", latest, mine: changes };
  }
~~~

لما يجي 412 **مبنعيدش** الطلب لوحدنا بالـ ETag الجديد، لأن ده بالظبط الكتابة فوق تعديل الشخص التاني. بنجيب النسخة الجديدة، ونرجّعها مع تعديلات المستخدم ([[mine]])، والواجهة تعرضهم جنب بعض. و [[as const]] بيخلي TypeScript يعرف إن [[ok]] قيمته [[false]] بالظبط، فيفرّق بين شكل النجاح وشكل الفشل.

~~~bash
BASE=http://localhost:6002 node client.ts
~~~

~~~text الناتج (المستند كان على النسخة ٤)
{ ok: true, etag: '"5"' }
false حد عدّل المستند، راجع التغييرات edit from A "5"
~~~

التابتين فتحوا النسخة ٤. الأولى حفظت وخدت [["5"]]. التانية خدت [[false]] والرسالة، ومعاها المستند الجديد ([[edit from A]]) والـ ETag الجديد.

---

## الخلاصة

| الحالة | الرد |
|---|---|
| من غير [[If-Match]] | [[428 Precondition Required]] |
| النسخة لسه هي | [[204]] + [[ETag]] الجديد |
| حد سبقك | [[412 Precondition Failed]] |
| مش موجود أو مش بتاعك | [[404]] |

- الشرط على الـ version جوه الـ [[UPDATE]] نفسه، والزيادة في نفس الأمر.
- [[updateMany]] و [[count === 0]] بدل [[update]] والـ error.
- على 412 اعرض النسختين للمستخدم، متعيدش لوحدك.
- لو الـ API على origin تاني، لازم [[Access-Control-Expose-Headers: ETag]] عشان الـ JavaScript يقرا الـ ETag.`,
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
          teach: R`## المفتاح بيحوّل «عيد» لـ «رجّع نفس الرد»

العميل بيولّد id عشوائي (UUID) لكل **عملية**، ويبعته مع كل محاولة في header اسمه [[Idempotency-Key]]. السيرفر أول مرة بيشوف المفتاح بيحجزه في Redis وينفّذ ويخزّن الرد. وأي محاولة تانية بنفس المفتاح بتاخد الرد المتخزّن من غير تنفيذ. الدالة [[withIdempotency]] بتلف حوالين أي handler وتعمل ده.

اتجرّب على ويندوز 11: Express 5.2.1 و ioredis 6.0 على Node 24.19 (بورت ٦٠٠٤)، و Redis 8.10 حقيقي في Docker ([[redis:8-alpine]]). و [[createPayment]] كانت بتستنى ٣٠٠ ملي ثانية (كأنها بتكلّم بوابة دفع) وبعدين تضيف دفعة في قايمة، ومعاها route بيعدّ الدفعات. و curl 8.22 من Git Bash، و PowerShell 7.6.

---

## ١. التوقيع

~~~ts
export async function withIdempotency(req: Request, res: Response, run: () => Promise<{ status: number; body: unknown }>) {
~~~

[[run]] دالة من غير parameters بترجّع Promise فيه [[status]] و [[body]]. يعني الشغل الحقيقي (الدفع) مش بيبعت الرد بنفسه: بيرجّع «إيه اللي المفروض يتبعت»، عشان [[withIdempotency]] تقدر تخزّنه قبل ما تبعته. و [[unknown]] نوع TypeScript معناه «أي حاجة، بس لازم تتأكد قبل ما تستخدمها».

والاستخدام زي ما في الـ desc:

~~~ts
app.post("/payments", requireAuth, (req, res) => withIdempotency(req, res, () => createPayment(req)));
~~~

---

## ٢. المفتاح والبصمة

~~~ts
  const key = req.get("idempotency-key");
  if (!key) return res.status(400).json({ title: "Idempotency-Key header required" });
~~~

~~~text الناتج (من غير الـ header)
{"title":"Idempotency-Key header required"} 400
~~~

~~~ts
  const id = $__btidem:$__{req.user.id}:$__{req.path}:$__{key}$__bt;
~~~

اسم المفتاح في Redis: [[idem:u1:/payments:e1e09ce0-...]]. فيه المستخدم والمسار، عشان لو مستخدمين (بالصدفة أو بقصد) بعتوا نفس المفتاح، كل واحد ليه خانة، ومحدش ياخد رد التاني.

~~~ts
  const hash = createHash("sha256").update(JSON.stringify(req.body)).digest("hex");
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[JSON.stringify(req.body)]] | الـ body نص |
| [[createHash("sha256")]] | من [[node:crypto]]: بيجهّز SHA-256، دالة بتطلّع «بصمة» ثابتة الطول لأي نص |
| [[.update(...)]] | دخّل النص |
| [[.digest("hex")]] | طلّع البصمة 64 حرف hex |

نفس الـ body = نفس البصمة. أي تغيير (٥٠٠ بقت ٧٠٠) = بصمة مختلفة خالص.

---

## ٣. الحجز: [[SET NX]]

~~~ts
  if (!(await redis.set(id, JSON.stringify({ hash }), "EX", 86400, "NX"))) {
~~~

أمر Redis واحد: [[SET id value EX 86400 NX]].

- [[EX 86400]]: المفتاح يمسح نفسه بعد ٨٦٤٠٠ ثانية = ٢٤ ساعة.
- [[NX]] (Not eXists): اكتب **بس** لو المفتاح مش موجود. لو اتكتب، [[ioredis]] بيرجّع [["OK"]]. لو كان موجود، بيرجّع [[null]].
- [[!(...)]]: لو **محجزش** (المفتاح موجود قبل كده)، ادخل جوه الـ if.

الفحص والكتابة أمر واحد في Redis، فطلبين في نفس اللحظة: واحد بس هياخد [["OK"]]. لو كتبتها [[GET]] وبعدين [[SET]]، الاتنين ممكن يلاقوه فاضي ويعدّوا.

---

## ٤. المفتاح موجود: ٣ احتمالات

~~~ts
    const saved = JSON.parse((await redis.get(id)) ?? "{}");
    if (saved.hash !== hash) return res.status(422).json({ title: "Key reused with a different body" });
    if (!saved.body) return res.status(409).json({ title: "Original request still in progress" });
    return res.status(saved.status).json(saved.body);
~~~

- [[?? "{}"]]: لو المفتاح اتمسح في اللحظة دي، اعتبره object فاضي بدل ما [[JSON.parse(null)]] يعمل مشكلة.
- بصمة مختلفة = نفس المفتاح لعملية تانية. ده bug في العميل: [[422]].
- مفيش [[body]] = اتحجز ولسه بيتنفّذ: [[409]]، استنى وعيد.
- غير كده: رجّع الرد المتخزّن **بالحرف**، من غير تنفيذ.

---

## ٥. المفتاح جديد: نفّذ وخزّن

~~~ts
  const result = await run().catch(async (err) => { await redis.del(id); throw err; });
~~~

[[.catch(...)]] على الـ Promise: لو [[run()]] رمى error، امسح الحجز ([[redis.del]]) عشان المحاولة الجاية تقدر تنفّذ، وارمي الـ error تاني عشان يوصل للـ error handler.

~~~ts
  await redis.set(id, JSON.stringify({ hash, ...result }), "EX", 86400);
  res.status(result.status).json(result.body);
~~~

خزّن البصمة والـ status والـ body (من غير [[NX]] المرة دي، عشان نكتب فوق الحجز)، وبعدين ابعت الرد.

---

## ٦. نشغّل الـ solCode

~~~bash
KEY=$(node -e "console.log(crypto.randomUUID())")
pay() {
  curl -s -w " %{http_code}\n" -X POST localhost:6004/payments \
    -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
    -H "Idempotency-Key: $KEY" -d "{\"amount\":$1}"
}
~~~

- [[$(...)]]: شغّل الأمر وحط ناتجه هنا. [[crypto.randomUUID()]] بيطلّع UUID جديد. Git Bash ومعظم صور Docker (زي [[ubuntu:24.04]]) مفيهمش [[uuidgen]]، عشان كده الـ node.
- [[pay() { ... }]]: دالة bash. و [[$1]] أول argument ليها، فـ [[pay 500]] بيبعت [[{"amount":500}]].
- [[\]] في آخر السطر: الأمر مكمّل في السطر اللي بعده.
- [[\"]] جوه [[" "]]: علامة تنصيص حرفية جوه الـ JSON.

### نفس المفتاح ٣ مرات، وبعدين مبلغ تاني

~~~bash
for i in 1 2 3; do pay 500; done
pay 700
~~~

~~~text الناتج
{"id":"1","createdAt":"2026-10-08T08:58:40.094Z","userId":"u1","amount":500} 201
{"id":"1","createdAt":"2026-10-08T08:58:40.094Z","userId":"u1","amount":500} 201
{"id":"1","createdAt":"2026-10-08T08:58:40.094Z","userId":"u1","amount":500} 201
{"title":"Key reused with a different body"} 422
~~~

نفس الـ [[id]] ونفس [[createdAt]] لحد الملي ثانية: الرد اتخزّن واترجع. وعدّاد الدفعات قال [[{"count":1}]].

### نبص جوه Redis

~~~bash
docker exec teach-apis01-redis redis-cli --scan --pattern 'idem:*'
docker exec teach-apis01-redis redis-cli ttl "idem:u1:/payments:$KEY"
~~~

~~~text الناتج
idem:u1:/payments:e1e09ce0-aa4a-423a-bb29-13266f60ceaf
86399
~~~

[[--scan --pattern]] بيدوّر على المفاتيح اللي شكلها كده، و [[ttl]] (time to live) الثواني الباقية. والقيمة نفسها بـ [[get]]:

~~~text الناتج
{"hash":"0780491803d7a0848aa262e346d8b1a3d7cfa31fe7655948de034ec7c10f84d0","status":201,"body":{"id":"1","createdAt":"2026-10-08T08:58:40.094Z","userId":"u1","amount":500}}
~~~

### طلبين في نفس اللحظة

~~~bash
KEY=$(node -e "console.log(crypto.randomUUID())")
pay 100 & sleep 0.05; pay 100; wait
~~~

[[&]] بيشغّل الأول في الخلفية، و [[sleep 0.05]] يستنى ٥٠ ملي ثانية، والتاني يتبعت والأول لسه بيكلّم «البوابة» (٣٠٠ ملي)، و [[wait]] يستنى الخلفية تخلص.

~~~text الناتج
{"title":"Original request still in progress"} 409
{"id":"2","createdAt":"2026-10-08T08:58:41.631Z","userId":"u1","amount":100} 201
~~~

التاني وصل الأول ([[409]])، والأصلي خلص بعده ([[201]]). والعدّاد بقى [[2]]، يعني دفعة واحدة بس للمفتاح ده.

### الغلطة: مفتاح جديد مع كل محاولة

جرّبنا ٣ طلبات بـ [[-H "Idempotency-Key: $(node -e ...)"]] **جوه** الـ loop: العدّاد زاد ٣. كل محاولة شكلها عملية جديدة. المفتاح يتولّد مرة لكل «ضغطة دفع».

---

## ٧. من PowerShell

~~~powershell
$key = (New-Guid).Guid
$h = @{ Authorization = "Bearer $env:TOKEN"; "Idempotency-Key" = $key }
1..3 | ForEach-Object { Invoke-RestMethod -Method Post http://localhost:6004/payments -Headers $h -ContentType "application/json" -Body '{"amount":300}' | ConvertTo-Json -Compress }
~~~

- [[New-Guid]] بيولّد UUID، و [[.Guid]] النص بتاعه. (في Windows PowerShell 5.1 كمان: [[[guid]::NewGuid()]].)
- [[$env:TOKEN]] متغير بيئة اسمه TOKEN.
- [[1..3 | ForEach-Object { }]]: كرر ٣ مرات.
- [[Invoke-RestMethod]] بيبعت الطلب ويحوّل الـ JSON لـ object، و [[ConvertTo-Json -Compress]] يرجّعه JSON في سطر.

~~~text الناتج (PowerShell 7.6)
{"id":"6","createdAt":"2026-10-08T08:58:58.929Z","userId":"u1","amount":300}
{"id":"6","createdAt":"2026-10-08T08:58:58.929Z","userId":"u1","amount":300}
{"id":"6","createdAt":"2026-10-08T08:58:58.929Z","userId":"u1","amount":300}
~~~

---

## الخلاصة

| الحالة | الرد |
|---|---|
| من غير مفتاح | [[400]] |
| مفتاح جديد | ينفّذ ويخزّن ٢٤ ساعة |
| نفس المفتاح ونفس الـ body وخلص | نفس الرد بالحرف |
| نفس المفتاح ولسه شغال | [[409]] |
| نفس المفتاح و body مختلف | [[422]] |
| التنفيذ رمى error | الحجز يتمسح، والـ retry ينفّذ |

- الحجز بـ [[SET ... NX]]: فحص وكتابة في أمر واحد.
- المفتاح مربوط بالمستخدم والمسار.
- مفتاح لكل عملية، مش لكل محاولة.
- التخزين في Redis أو القاعدة، مش في ذاكرة الـ process.`,
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
