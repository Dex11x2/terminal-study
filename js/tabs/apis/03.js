// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
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
]);
