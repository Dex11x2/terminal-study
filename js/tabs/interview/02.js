// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "HTTP و REST",
      l: 1,
      n: "أسئلة بتيجي في كل انترفيو backend أو full-stack تقريبًا. الإجابة الصح هنا بتفرّق بين حد بيستخدم الـ API وحد بيصممه",
      items: [
        {
          cmd: "safe و idempotent",
          title: "إيه الفرق بين GET و POST و PUT و PATCH و DELETE؟ وأنهي فيهم تقدر تكرره بأمان؟",
          desc: R`GET بيقرا، و POST بيعمل حاجة جديدة، و PUT بيستبدل الـ resource كله، و PATCH بيعدّل جزء منه، و DELETE بيمسح. الـ safe يعني مبيغيّرش حاجة على السيرفر: GET و HEAD و OPTIONS. والـ idempotent يعني تبعته مرة أو عشرة والأثر على السيرفر واحد: GET و PUT و DELETE. لكن POST لأ، كل مرة ممكن يعمل order جديد، و PATCH مش مضمون.

وده مهم عمليًا في الـ retries: لو الشبكة قطعت ومش عارف الطلب وصل ولا لأ، تعيد PUT من غير قلق. لكن POST بتاع دفع لازم له [[Idempotency-Key]]، عشان العميل ميتحاسبش مرتين.`,
          example: R`curl -X GET    https://api.example.com/orders/42
curl -X POST   https://api.example.com/orders -H "Content-Type: application/json" -d '{"item":"book"}'
curl -X PUT    https://api.example.com/orders/42 -H "Content-Type: application/json" -d '{"item":"pen","qty":2}'
curl -X PATCH  https://api.example.com/orders/42 -H "Content-Type: application/json" -d '{"qty":3}'
curl -X DELETE https://api.example.com/orders/42
curl -X POST   https://api.example.com/payments -H "Content-Type: application/json" -H "Idempotency-Key: 7f3c9a1e" -d '{"amount":100}'`,
          try: "على API عندك: ابعت نفس الـ POST مرتين وشوف اتعمل كام صف في الداتابيز. بعدين ابعت نفس الـ PUT مرتين وقارن.",
          deep: {
            why: "بيختبر إنك بتصمم API مش بس بتستخدمه. والـ idempotency بالذات بتفرق في الدفع والـ webhooks والـ retries، ودي حاجات بتحصل في الإنتاج كل يوم.",
            how: R`التعريفات دي من مواصفة HTTP نفسها (RFC 9110). الـ safe methods مفروض متغيرش حالة، عشان كده المتصفح والـ crawlers بيعملوا GET براحتهم (prefetch، ومعاينة لينكات). والـ idempotency عن الأثر على السيرفر مش عن الرد: أول DELETE يرجّع 204 والتاني 404، بس في الحالتين الـ order ممسوح، فهو idempotent.

PUT مفروض يبعت الـ resource كله. لو بعت جزء بس، الباقي المفروض يتشال. و PATCH بيبعت التغيير بس، وممكن يبقى idempotent ([[{"qty":3}]]) أو لأ ([[{"op":"increment"}]]).

الـ Idempotency-Key: العميل بيعمل ID عشوائي للعملية ويبعته في header. السيرفر يخزّن المفتاح مع الرد أول مرة، ولو المفتاح اتكرر يرجّع نفس الرد من غير ما ينفّذ تاني. Stripe بيشتغل كده، ونفس الفكرة في استقبال webhooks: خزّن الـ event id وتجاهل المكرر.`,
            when: "Follow-ups: «DELETE تاني مرة بيرجّع 404، يبقى مش idempotent؟». «إزاي تخلي POST idempotent؟». «ليه GET مينفعش يغيّر داتا؟». «PUT ولا PATCH لتعديل الإيميل بس؟». «الـ webhook وصل مرتين، تعمل إيه؟».",
            mistakes: R`إن idempotent معناها «نفس الرد»: معناها نفس الأثر. وإن PUT و POST «نفس الحاجة». وإنك تعمل [[GET /deleteUser?id=5]]: أي prefetch أو bot هيمسح يوزرز. وإنك تعمل retry تلقائي لـ POST من غير idempotency key.`
          },
          teach: R`## الفكرة في جملة

الست أوامر بيبعتوا كل HTTP method مرة لنفس الـ API. عشان نشوف الفرق بعينينا مش بالحفظ، شغلناهم على API صغير بـ Node على [[localhost:4000]] (بدل [[api.example.com]] اللي مش حقيقي) وبعتنا كل واحد **مرتين**: الـ method الـ idempotent لازم يسيب السيرفر على نفس الحالة في المرتين. الأوامر اتشغلت بـ curl على ويندوز (Git Bash)، وضفنا [[-i]] عشان نشوف الـ status.

---

## ١. الفلاجز اللي هتتكرر

| الجزء | معناه |
|---|---|
| [[-X GET]] | الـ method. X = request command |
| [[-H "Content-Type: application/json"]] | header بيقول «الـ body ده JSON». H = header |
| [[-d '{"item":"book"}']] | الـ body نفسه. d = data. علامة [[']] حواليه عشان الـ [["]] اللي جواه متتلخبطش |
| [[-i]] | اطبع الـ status والـ headers مع الـ body (ضفناه للتجربة) |

---

## ٢. [[GET /orders/42]]: اقرا

~~~text الناتج
HTTP/1.1 200 OK
{"id":"42","item":"book","qty":1}
~~~

GET **safe**: مبيغيّرش حاجة. عشان كده المتصفح والـ crawlers والـ prefetch بيعملوه براحتهم.

---

## ٣. [[POST /orders]]: اعمل جديد، مرتين

~~~text الناتج: المرة الأولى
HTTP/1.1 201 Created
Location: /orders/43
{"id":"43","item":"book"}
~~~

~~~text الناتج: المرة التانية، نفس الأمر بالظبط
HTTP/1.1 201 Created
Location: /orders/44
{"id":"44","item":"book"}
~~~

نفس الطلب عمل **اتنين** orders (43 و 44). يعني POST **مش idempotent**: كل مرة بتبعته الأثر بيزيد. و [[201 Created]] مع header [[Location]] بيقول عنوان الحاجة الجديدة.

---

## ٤. [[PUT /orders/42]]: استبدل، مرتين

~~~text الناتج: المرتين
HTTP/1.1 200 OK
{"id":"42","item":"pen","qty":2}
~~~

المرة التانية سابت الـ order زي ما هو بالظبط. PUT بيقول «خلي الـ resource **كده**»، فتكراره مبيغيّرش حاجة: **idempotent**. ولاحظ إنه بعت الـ object كله ([[item]] و [[qty]]).

---

## ٥. [[PATCH /orders/42]]: عدّل جزء

~~~text الناتج
HTTP/1.1 200 OK
{"id":"42","item":"pen","qty":3}
~~~

بعت [[qty]] بس، و [[item]] فضل [[pen]]. ده الفرق عن PUT. والـ PATCH ده idempotent لأنه بيحط قيمة ثابتة (3). لو كان [[{"op":"increment"}]] كان كل مرة يزوّد، فمش idempotent. عشان كده بنقول PATCH «مش مضمون».

---

## ٦. [[DELETE /orders/42]]: امسح، مرتين

~~~text الناتج
HTTP/1.1 204 No Content
HTTP/1.1 404 Not Found
{"error":"not found"}
~~~

الرد **اختلف** (204 ثم 404)، بس الحالة على السيرفر واحدة في المرتين: الـ order مش موجود. والـ idempotency عن **الأثر على السيرفر** مش عن شكل الرد، فـ DELETE idempotent. و [[204]] معناها نجح ومفيش body.

---

## ٧. [[POST /payments]] ومعاه [[Idempotency-Key]]

بعتنا الدفع مرتين بنفس المفتاح [[7f3c9a1e]]، ومرة تالتة من غير مفتاح:

~~~text الناتج
HTTP/1.1 201 Created
{"paymentId":"pay_1","amount":100,"charges":1}

HTTP/1.1 200 OK
Idempotent-Replayed: true
{"paymentId":"pay_1","amount":100,"charges":1}

HTTP/1.1 201 Created
{"paymentId":"pay_2","amount":100,"charges":2}
~~~

- المرة الأولى: السيرفر دفع وخزّن الرد جنب المفتاح.
- المرة التانية: لقى المفتاح، فرجّع **نفس الرد القديم** ([[pay_1]]) من غير ما يدفع. [[charges]] لسه 1.
- التالتة من غير مفتاح: دفع تاني ([[pay_2]]). ده اللي بيحصل لو اليوزر داس Pay مرتين والنت فصل وانت معملتش مفتاح.

الكود اللي في السيرفر للجزء ده تلات سطور: لو المفتاح موجود في [[Map]] رجّع اللي متخزن، غير كده نفّذ وخزّن الرد. في الإنتاج بيتخزن في الداتابيز أو Redis بمدة صلاحية. و Stripe بيرجّع header اسمه [[Idempotent-Replayed]] بنفس الفكرة.

---

## الخلاصة

| الـ method | بيعمل إيه | safe | idempotent | المرة التانية عندنا |
|---|---|---|---|---|
| GET | اقرا | أيوه | أيوه | نفس الرد |
| POST | اعمل جديد | لأ | لأ | order جديد (44) |
| PUT | استبدل كله | لأ | أيوه | نفس الحالة |
| PATCH | عدّل جزء | لأ | حسب الـ body | نفس الحالة (قيمة ثابتة) |
| DELETE | امسح | لأ | أيوه | 404 بس نفس الحالة |
| POST + Idempotency-Key | دفع | لأ | بقى أيوه | نفس الرد، من غير دفع |

> idempotent = نفس **الأثر** مش نفس الرد. وأي retry تلقائي لـ POST لازم يبقى معاه مفتاح.`,
          lines: [
            "اقرا order رقم 42. safe و idempotent.",
            "اعمل order جديد. كل مرة تبعته يتعمل واحد كمان.",
            "استبدل الـ order كله بالنسخة دي. تكراره مبيغيّرش حاجة.",
            "عدّل الكمية بس. هنا idempotent لأنه بيحط قيمة ثابتة.",
            "امسح الـ order. التانية هترجّع 404 بس الحالة واحدة.",
            "دفع بـ POST ومعاه مفتاح: لو اتبعت تاني بنفس المفتاح السيرفر يرجّع نفس النتيجة من غير ما يدفع تاني."
          ],
          sol: R`المتوقع: الـ POST مرتين يعمل صفين في الداتابيز بـ id مختلف، والرد [[201]] في المرتين. والـ PUT مرتين يسيب صف واحد بنفس الحالة بالظبط، والرد [[200]] (أو 204) في المرتين. ده تعريف idempotent: نتيجة المرة العاشرة على السيرفر زي نتيجة المرة الأولى، حتى لو الرد نفسه اختلف (DELETE مرتين: أول مرة 204 والتانية 404، بس الحالة واحدة: الأوردر مش موجود).

لو الـ PUT عندك عمل صف جديد كل مرة، يبقى انت معمله زي POST، وده غلط في التصميم. ولو الـ POST التاني اترفض أو معملش صف، يبقى عندك unique constraint أو Idempotency-Key، وده كويس لو مقصود (زي الدفع)، ولو مش مقصود يبقى فيه validation بيمنع حاجة المفروض تتكرر.

وفي الانترفيو اربطها بالحالة الحقيقية: «اليوزر داس Pay مرتين والنت فصل. الـ POST مش idempotent، فبنبعت Idempotency-Key من الكلاينت، والسيرفر يخزنه ولو شافه تاني يرجّع نفس الرد القديم من غير ما يدفع تاني».`
        },
        {
          cmd: "1xx لحد 5xx",
          title: "اشرح عائلات الـ status codes، وإيه الفرق بين 401 و 403؟",
          desc: R`أول رقم بيقول القصة: 1xx معلومة (زي 101 لما الاتصال يتحول WebSocket)، و 2xx نجح، و 3xx روح مكان تاني أو استخدم نسختك المتكاشة، و 4xx الغلط من العميل، و 5xx الغلط من السيرفر. وأشهرهم: 200 و 201 Created و 204 من غير body، و 301 و 302 و 304، و 400 و 401 و 403 و 404 و 409 تعارض و 422 validation و 429 طلبات كتير، و 500 و 502 و 503 و 504.

401 يعني «مش عارف انت مين»: مفيش توكن أو التوكن غلط أو خلص، فسجّل دخول. 403 يعني «عارفك، بس مش مسموحلك». والاسم في الـ spec ملخبط: 401 اسمه Unauthorized بس معناه الحقيقي unauthenticated.`,
          example: R`// requireAuth بيرجّع 401 لو مفيش session
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).json({ error: "not found" });
  if (order.userId !== req.user.id) return res.status(403).json({ error: "forbidden" });
  res.json(order);
});
app.post("/orders", requireAuth, async (req, res) => {
  const order = await db.order.create({ data: { item: req.body.item, userId: req.user.id } });
  res.status(201).location($__bt/orders/$__{order.id}$__bt).json(order);
});`,
          try: "اعمل [[curl -i]] على API عندك من غير توكن، وبتوكن يوزر عادي على route للأدمن، وبـ id مش موجود. هل الأرقام 401 و 403 و 404؟",
          flag: "script",
          deep: {
            why: "الـ status code عقد بين السيرفر وأي حد بيكلّمه: الـ frontend، والكاش، والمونيتورنج، والـ retries. رقم غلط بيكسر كل ده في صمت.",
            how: R`502 Bad Gateway: الـ proxy (Nginx مثلًا) وصل للتطبيق بس جاله رد بايظ أو التطبيق واقع. 504 Gateway Timeout: التطبيق مردّش في الوقت. 503: السيرفر مش قادر دلوقتي (صيانة أو ضغط)، وممكن يبعت [[Retry-After]].

301 و 308 نقل دايم، و 302 و 307 مؤقت. الفرق إن 307 و 308 بيضمنوا إن الـ method والـ body ميتغيروش (POST يفضل POST). و 304 Not Modified معناها «نسختك المتكاشة لسه سليمة» ومفيش body.

409 Conflict لما الطلب بيتعارض مع الحالة (إيميل متسجل قبل كده). و 422 (اسمها دلوقتي Unprocessable Content) لما الـ JSON سليم بس القيم غلط، وفرق كتير بيستخدموا 400 للاتنين، والمهم تكون ثابت. و 429 مع rate limiting.`,
            when: "Follow-ups: «إمتى ترجّع 404 بدل 403؟» (لما متحبش تكشف إن الحاجة موجودة أصلًا). «الفرق بين 502 و 504؟». «301 ولا 308؟». «400 ولا 422؟». «fetch بيرمي error على 500؟».",
            mistakes: R`ترجّع 200 مع [[{ success: false }]] لكل حاجة. وتخلط 401 و 403. وترجّع 500 لغلط validation (ده غلط العميل، يبقى 4xx). وتفتكر إن [[fetch]] بيرمي error على 404 أو 500: مبيرميش، لازم تشيك [[res.ok]].`
          },
          teach: R`## الفكرة في جملة

المثال route في Express بيرجّع **رقم مختلف لكل حالة**: مش عارفينك 401، ومش بتاعك 403، ومش موجود 404، وتمام 200، واتعمل جديد 201. شغلناه فعلًا (Node 24 و Express 5 على ويندوز) بعد ما بدلنا [[requireAuth]] و [[db]] بنسخ صغيرة في الذاكرة: [[requireAuth]] بيقرا header [[Authorization: Bearer u1]] ويعتبر اليوزر [[u1]]، والـ order رقم 1 بتاع [[u1]] ورقم 2 بتاع [[u2]].

---

## ١. أول رقم بيقول القصة

| العيلة | معناها | أشهرهم |
|---|---|---|
| 1xx | معلومة، كمّل | 101 Switching Protocols (WebSocket) |
| 2xx | نجح | 200 OK، و 201 Created، و 204 No Content |
| 3xx | روح مكان تاني أو استخدم الكاش | 301 و 308 دايم، و 302 و 307 مؤقت، و 304 Not Modified |
| 4xx | الغلط عندك (العميل) | 400، و 401، و 403، و 404، و 409، و 422، و 429 |
| 5xx | الغلط عند السيرفر | 500، و 502، و 503، و 504 |

---

## ٢. سطر الـ route

~~~js
app.get("/orders/:id", requireAuth, async (req, res) => {
~~~

- [[app.get(path, ...)]]: لما ييجي GET على المسار ده.
- [[:id]]: جزء متغير، قيمته بتبقى في [[req.params.id]].
- [[requireAuth]]: middleware بيتنفّذ **قبل** الـ handler. لو مفيش يوزر بيرد هو بـ 401 والـ handler مبيشتغلش خالص.
- [[async (req, res) => {]]: الـ handler. [[req]] الطلب و [[res]] الرد، و [[async]] عشان هنستنى الداتابيز بـ [[await]].

جربناه من غير توكن:

~~~text الناتج
$ curl -si localhost:4001/orders/1
HTTP/1.1 401 Unauthorized
{"error":"login first"}
~~~

---

## ٣. هات الـ order و 404

~~~js
  const order = await db.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).json({ error: "not found" });
~~~

- [[await]]: استنى نتيجة الداتابيز.
- [[!order]]: لو رجع [[null]] (مش موجود).
- [[res.status(404).json(...)]]: حط الـ status وابعت JSON. الـ methods دي بترجّع [[res]] نفسه، فينفع تربطهم ورا بعض (chaining).
- [[return]]: اخرج من الدالة. من غيره الكود هيكمّل ويحاول يرد مرة تانية، و Express يرمي error.

~~~text الناتج
$ curl -si localhost:4001/orders/99 -H "Authorization: Bearer u1"
HTTP/1.1 404 Not Found
{"error":"not found"}
~~~

---

## ٤. مش بتاعك: 403

~~~js
  if (order.userId !== req.user.id) return res.status(403).json({ error: "forbidden" });
  res.json(order);
~~~

- [[!==]]: «مش بيساوي» من غير تحويل أنواع.
- [[req.user]]: اليوزر اللي [[requireAuth]] حطه على الطلب.
- [[res.json(order)]]: من غير [[status]] يبقى 200 (الافتراضي).

~~~text الناتج
$ curl -si localhost:4001/orders/2 -H "Authorization: Bearer u1"
HTTP/1.1 403 Forbidden
{"error":"forbidden"}

$ curl -si localhost:4001/orders/1 -H "Authorization: Bearer u1"
HTTP/1.1 200 OK
{"id":"1","item":"book","userId":"u1"}
~~~

السيرفر **عارف** إن ده [[u1]] (عدّى من [[requireAuth]])، بس الـ order 2 مش بتاعه. ده الفرق كله:

| | السيرفر عارفك؟ | مسموحلك؟ |
|---|---|---|
| 401 Unauthorized | لأ | مش معروف لسه |
| 403 Forbidden | أيوه | لأ |

اسم 401 في الـ spec «Unauthorized» ملخبط، معناه الحقيقي unauthenticated.

---

## ٥. الـ POST و 201

~~~js
app.post("/orders", requireAuth, async (req, res) => {
  const order = await db.order.create({ data: { item: req.body.item, userId: req.user.id } });
  res.status(201).location($__bt/orders/$__{order.id}$__bt).json(order);
});
~~~

- [[req.body.item]]: من الـ JSON اللي اتبعت (محتاج [[app.use(express.json())]] عشان Express يفكّه).
- [[userId: req.user.id]]: صاحب الـ order بيتاخد من الـ session، **مش** من الـ body. لو أخدته من الـ body أي حد يعمل orders باسم غيره.
- [[.location(...)]]: يحط header [[Location]]. والـ backticks مع [[$__{order.id}]] template string بتحط الرقم جوه النص.

~~~text الناتج
$ curl -si -X POST localhost:4001/orders -H "Authorization: Bearer u1" -H "Content-Type: application/json" -d '{"item":"lamp"}'
HTTP/1.1 201 Created
Location: /orders/3
{"id":"3","item":"lamp","userId":"u1"}
~~~

---

## ٦. الفخ في الـ frontend: [[fetch]] مبيرميش على 404

جربنا من Node:

~~~js
fetch("http://localhost:4001/orders/99", { headers: { Authorization: "Bearer u1" } })
  .then(r => console.log("fetch resolved:", r.status, r.ok));
~~~

~~~text الناتج
fetch resolved: 404 false
~~~

الـ promise **نجح** رغم الـ 404. [[fetch]] بيرمي error لو الشبكة نفسها فشلت بس، فلازم تشيك [[r.ok]] (بتبقى [[true]] من 200 لـ 299 بس).

---

## الخلاصة

| الحالة في الكود | الرقم | ليه |
|---|---|---|
| [[requireAuth]] ملقاش يوزر | 401 | مش عارفين انت مين |
| [[!order]] | 404 | مش موجود |
| [[order.userId !== req.user.id]] | 403 | عارفينك ومش مسموحلك |
| كله تمام | 200 | الافتراضي |
| اتعمل جديد | 201 + Location | فيه resource جديد |

> 5xx معناها السيرفر هو اللي غلط، فـ validation فاشل عمره ما يبقى 500. و 502 = الـ proxy جاله رد بايظ من التطبيق، و 504 = التطبيق مردّش في الوقت.`,
          lines: [
            "route يجيب order واحد. requireAuth قبله بيرجّع 401 لو اليوزر مش معروف.",
            "هات الـ order من الداتابيز.",
            "مش موجود: 404.",
            "موجود بس مش بتاعك: 403.",
            "كله تمام: 200 مع الداتا (الافتراضي).",
            "قفلة الـ route.",
            "route يعمل order جديد.",
            "اعمله بالحقول المسموحة بس، وصاحبه اليوزر الحالي.",
            "201 Created، ومعاه header [[Location]] بعنوان الحاجة الجديدة.",
            "قفلة."
          ],
          sol: R`الـ API مكتوب صح لو الـ [[curl -i]] طلّع أول سطر: [[HTTP/1.1 401 Unauthorized]] من غير توكن، و [[HTTP/1.1 403 Forbidden]] بتوكن يوزر عادي على route الأدمن، و [[HTTP/1.1 404 Not Found]] للـ id اللي مش موجود. الفرق اللي تحفظه: 401 = «معرفش انت مين، سجّل دخول»، و 403 = «عارف انت مين، ومش مسموحلك».

النتايج الغلط الشائعة: 403 من غير توكن (المفروض 401)، أو 200 وجوه الـ body [[{ error: ... }]] (الكلاينت والـ monitoring مش هيعرفوا إن فيه مشكلة)، أو 500 للـ id المش موجود. الأخيرة بتحصل كتير لما الـ id مش بالشكل الصح (مثلًا مش UUID) والـ ORM يرمي error محدش عمله catch: المفروض 400 أو 404.

استثناء تقدر تقوله: بعض الـ APIs بترجّع 404 بدل 403 على موارد يوزر تاني عمدًا، عشان متأكدش للمهاجم إن الـ id ده موجود. ده مقبول طالما قرار مقصود.`
        },
        {
          cmd: "resources + verbs + stateless",
          title: "يعني إيه API يبقى RESTful؟ (What are REST principles?)",
          desc: R`REST أسلوب لتصميم الـ API: كل حاجة resource ليها URL اسمه اسم مش فعل ([[/orders/42]] مش [[/getOrder]])، والفعل هو الـ HTTP method، والرد status code صح وتمثيل للـ resource (غالبًا JSON). والسيرفر stateless: كل طلب شايل كل اللي محتاجه زي التوكن، فأي نسخة من السيرفر تقدر ترد عليه. وده اللي بيسهّل الكاش والـ scaling.

وفي الانترفيو ضيف الحاجات العملية: أسماء جمع، و nesting خفيف ([[/users/7/orders]])، و pagination و filtering بـ query params، و versioning ([[/v1]])، وشكل ثابت للأخطاء. التفاصيل في تاب «APIs متقدمة».`,
          example: R`GET    /v1/orders?status=paid&page=2&limit=20
GET    /v1/orders/42
POST   /v1/orders
PATCH  /v1/orders/42
DELETE /v1/orders/42
GET    /v1/users/7/orders
POST   /v1/orders/42/refunds`,
          try: "صمّم على الورق endpoints لمكتبة فيها كتب ومؤلفين واستعارات: اللستة، والبحث، والاستعارة، والإرجاع. وخلي بالك إن «إرجاع كتاب» action: هتعمله resource ولا PATCH؟",
          flag: "script",
          deep: {
            why: "أغلب الشغل full-stack هو تصميم APIs واستخدامها. والإنترفيوير عايز يشوف إنك بتفكر في resources واضحة وعقد ثابت، مش endpoint لكل زرار في الـ UI.",
            how: R`REST جه من رسالة دكتوراه لـ Roy Fielding سنة 2000، وفيها قيود: client-server، و stateless، و cacheable، و uniform interface، و layered system (ممكن proxies وكاش في النص من غير ما العميل يعرف)، و code on demand (اختياري).

الـ uniform interface فيه جزء اسمه HATEOAS: الرد نفسه بيحط لينكات للخطوات الجاية. أغلب الـ APIs اللي بنسميها REST مبتعملوش، فهي عمليًا «HTTP JSON APIs». قولها بصراحة لو اتسألت، ده بيبيّن إنك فاهم.

الـ actions اللي مش CRUD: يا إما تعملها sub-resource ([[POST /orders/42/refunds]] بيعمل refund جديد له id)، يا إما تغيير حالة ([[PATCH /orders/42]] بـ [[{"status":"cancelled"}]]). والـ stateless مش معناه مفيش داتابيز: معناه إن السيرفر مبيفتكرش حاجة عن العميل بين طلب والتاني في الذاكرة.`,
            when: "Follow-ups: «REST ولا GraphQL؟». «بتعمل versioning إزاي؟». «pagination بـ offset ولا cursor؟». «إيه هو HATEOAS؟». «action زي cancel تعملها إزاي؟».",
            mistakes: R`أفعال في الـ URL ([[/createUser]]، [[/deleteOrder/5]]). وكل حاجة POST. وتخزين الـ session في ذاكرة process واحدة، فأول ما تشغّل نسختين اليوزر يطلع logged out كل شوية. وإنك تقول REST يعني JSON: REST مش مربوط بفورمات.`
          },
          teach: R`## الفكرة في جملة

المثال مش كود بيتشغّل، ده **تصميم** API: سبع سطور، كل سطر = method + URL. والقاعدة اللي بتربطهم كلهم: الـ URL **اسم** (حاجة)، والـ method **الفعل** (هتعمل فيها إيه). لو فهمت السبع سطور دول تقدر تصمم أي API.

---

## ١. تشريح سطر واحد

~~~text
GET    /v1/orders?status=paid&page=2&limit=20
~~~

| الحتة | اسمها | معناها |
|---|---|---|
| [[GET]] | method | الفعل: اقرا |
| [[/v1]] | version | نسخة الـ API. لو غيرت شكل الرد بطريقة تكسر العملاء، تعمل [[/v2]] والقديم يفضل شغال |
| [[/orders]] | collection | الـ resource بالجمع: «كل الـ orders» |
| [[?]] | بداية الـ query | اللي بعدها فلاتر مش جزء من هوية الـ resource |
| [[status=paid]] | filter | المدفوع بس |
| [[&]] | فاصل | بين كل param والتاني |
| [[page=2&limit=20]] | pagination | الصفحة التانية، ٢٠ في الصفحة |

السيرفر بيقرا الـ query كده (جربناها في Node):

~~~js
const u = new URL("http://x/v1/orders?status=paid&page=2&limit=20");
console.log(u.pathname, Object.fromEntries(u.searchParams));
~~~

~~~text الناتج
/v1/orders { status: 'paid', page: '2', limit: '20' }
~~~

خلي بالك إن [[page]] و [[limit]] وصلوا **نصوص** ([['2']] مش [[2]])، فلازم تحوّلهم أرقام وتحط حد أقصى لـ [[limit]]. والصفحة 2 بـ 20 معناها في SQL [[OFFSET 20 LIMIT 20]]، يعني (2 − 1) × 20.

---

## ٢. باقي السطور

~~~text
GET    /v1/orders/42
POST   /v1/orders
PATCH  /v1/orders/42
DELETE /v1/orders/42
~~~

نفس الـ URL [[/v1/orders/42]] اتكرر ٣ مرات بـ ٣ methods. ده قلب REST: الـ resource واحد، والفعل بيتغير. ومقارنة باللي بيعمله ناس كتير:

| REST | بدل |
|---|---|
| [[GET /orders/42]] | [[GET /getOrder?id=42]] |
| [[POST /orders]] | [[POST /createOrder]] |
| [[PATCH /orders/42]] | [[POST /updateOrder]] |
| [[DELETE /orders/42]] | [[GET /deleteOrder/42]] (أخطرهم: أي prefetch يمسح) |

~~~text
GET    /v1/users/7/orders
~~~

**nesting** مستوى واحد: «orders اليوزر 7». متعملش [[/users/7/orders/42/items/3]]: الـ order ليه id لوحده، فاطلبه مباشرة.

~~~text
POST   /v1/orders/42/refunds
~~~

«استرجع فلوس» فعل مش CRUD. الحل إنك تعمله **resource**: كل refund حاجة جديدة ليها id وحالة وتاريخ، فـ POST على collection اسمها [[refunds]] تحت الـ order. والبديل تغيير حالة: [[PATCH /orders/42]] بـ [[{"status":"cancelled"}]].

---

## ٣. الـ stateless

كل طلب من دول لازم يبقى معاه كل اللي السيرفر محتاجه: التوكن في header، والفلاتر في الـ query. السيرفر مبيفتكرش «اليوزر ده كان في صفحة 1». النتيجة إن أي نسخة من السيرفر ورا الـ load balancer تقدر ترد على أي طلب، وده اللي بيخلي الـ scaling سهل. مش معناه «مفيش داتابيز»، معناه مفيش حالة للعميل في ذاكرة الـ process.

---

## ٤. التمرين: المكتبة

السؤال الصعب فيه «إرجاع كتاب». الطريقة: اسأل «إيه **الحاجة** اللي بتتعمل وليها تاريخ؟». هي الاستعارة (loan). فتبقى resource:

| العملية | الطلب | الرد |
|---|---|---|
| استعارة | [[POST /v1/loans]] بـ [[{"bookId": 42}]] | 201 + Location، أو 409 لو مستعار |
| استعاراتي | [[GET /v1/users/me/loans?status=active]] | 200 |
| إرجاع | [[PATCH /v1/loans/900]] بـ [[returnedAt]] | 200 |

و [[DELETE /loans/900]] للإرجاع غلط: كده بتمسح تاريخ الاستعارة.

---

## الخلاصة

- URL = اسم بالجمع، و method = الفعل، و status code صح.
- الفلاتر والـ pagination في الـ query، والـ version في أول المسار.
- الـ action اللي مش CRUD: resource جديد أو تغيير حالة.
- stateless: كل طلب لوحده، فأي سيرفر يرد.

> أغلب الـ APIs اللي اسمها REST مبتطبّقش HATEOAS (لينكات للخطوة الجاية جوه الرد)، فهي عمليًا «HTTP JSON APIs». لو قلتها في الانترفيو بتبيّن إنك فاهم الأصل.`,
          lines: [
            "لستة الـ orders، متفلترة ومقسّمة صفحات بـ query params.",
            "order واحد بالـ id.",
            "اعمل order جديد، والرد 201.",
            "عدّل جزء من الـ order.",
            "امسح الـ order.",
            "nesting خفيف: orders بتاعة يوزر معين.",
            "action اتحولت resource: refund جديد للـ order ده."
          ],
          sol: R`التصميم الكويس كله أسماء (nouns) بالجمع، والأفعال هي الـ HTTP methods. الإرجاع أنضف حل ليه إنك تعامل «الاستعارة» نفسها كـ resource ليها حالة: الإرجاع [[PATCH /loans/:id]] بـ [[returnedAt]]، أو [[POST /loans/:id/return]] لو الإرجاع بيعمل حاجات جانبية (غرامة تأخير، أو تبليغ اللي في قايمة الانتظار). الاتنين مقبولين لو قلت السبب.

الإجابات الغلط: [[POST /returnBook]] أو [[GET /borrow?bookId=5]] (فعل في الـ URL، و GET بيغيّر داتا)، أو [[DELETE /loans/:id]] للإرجاع لأنك كده بتمسح تاريخ الاستعارة. وخلي بالك من الحالة: استعارة كتاب مستعار أصلًا ترجع [[409 Conflict]]، والاستعارة الجديدة ترجع [[201]] ومعاها Location.`,
          solCode: R`# الكتب والمؤلفين
GET    /v1/books?q=clean+code&authorId=12&available=true&page=1&limit=20
GET    /v1/books/42
POST   /v1/books                      # أدمن
GET    /v1/authors/12
GET    /v1/authors/12/books
# الاستعارة resource ليها حالة
POST   /v1/loans            {"bookId": 42}          → 201 + Location: /v1/loans/900 | 409 لو مستعار
GET    /v1/users/me/loans?status=active
PATCH  /v1/loans/900        {"returnedAt": "2026-09-29T10:00:00Z"}   → 200
# أو لو الإرجاع فيه منطق جانبي (غرامة، قايمة انتظار)
POST   /v1/loans/900/return                           → 200`
        },
        {
          cmd: "Cache-Control و ETag",
          title: "إزاي تخلي المتصفح والـ CDN يحتفظوا بنسخة من الرد صح؟ وإزاي تجبرهم يجيبوا الجديد؟",
          desc: R`[[Cache-Control]] هو المتحكم: [[max-age=3600]] يعني استخدم النسخة دي ساعة من غير ما تسأل، و [[no-cache]] يعني خزّن بس اسأل السيرفر كل مرة، و [[no-store]] متخزّنش خالص، و [[private]] للمتصفح بس مش للـ CDN. ولما النسخة تقدم المتصفح بيسأل بـ [[If-None-Match]] ومعاه الـ ETag، ولو مفيش تغيير السيرفر يرد 304 من غير body.

القاعدة العملية: الملفات اللي في اسمها hash ([[app.3f9a1c.js]]) تتكاش سنة بـ [[immutable]] لأن أي تغيير هيطلّع اسم جديد، والـ HTML [[no-cache]]، وردود الـ API اللي فيها داتا يوزر [[private, no-store]].`,
          example: R`curl -sI https://example.com/assets/app.3f9a1c.js | grep -i cache-control
# cache-control: public, max-age=31536000, immutable
curl -sI https://example.com/ | grep -i -E "cache-control|etag"
curl -sI https://example.com/ -H 'If-None-Match: "abc123"' | head -1
# لو الـ ETag هو نفسه: HTTP/2 304`,
          try: "في Network افتح موقع مرتين واقرا عمود Size: هتلاقي memory cache و disk cache و 304. اعرف أنهي ملفات اتكاشت بـ max-age وأنهي اتسألت بـ ETag.",
          deep: {
            why: "الكاش أرخص تحسين أداء، وأخطر حاجة لو اتعمل غلط: يا الموقع يفضل على نسخة قديمة بعد الـ deploy، يا داتا يوزر تظهر ليوزر تاني من الـ CDN.",
            how: R`فيه مرحلتين: freshness و validation. طول ما النسخة fresh (جوه الـ max-age) المتصفح بيستخدمها من غير أي طلب. بعد كده بتبقى stale، فبيعمل conditional request: [[If-None-Match]] بالـ ETag، أو [[If-Modified-Since]] بالتاريخ. السيرفر يقارن، ولو زي ما هي يرد 304 وخلاص، فبتوفر الـ body بس مش الرحلة.

[[s-maxage]] مدة خاصة بالـ shared caches زي الـ CDN. و [[stale-while-revalidate=60]] بيقول: اعرض القديم فورًا وجدّده في الخلفية. و [[Vary: Accept-Encoding]] بيقول للكاش «خزّن نسخة لكل قيمة من الـ header ده» (نسخة gzip ونسخة br).

والكاش مش في المتصفح بس: فيه CDN، و reverse proxy، وكاش تطبيق في Redis، وكاش داتابيز. في system design قول الطبقة بالظبط. والتفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «عملت deploy واليوزرز لسه شايفين القديم، ليه؟». «الفرق بين no-cache و no-store؟». «إيه هو Vary؟». «تكاش فين: المتصفح ولا الـ CDN ولا Redis؟». «cache invalidation بتعملها إزاي؟».",
            mistakes: R`إن [[no-cache]] معناها متكاشش: معناها خزّن واسأل قبل ما تستخدم. وكاش للـ HTML بـ max-age طويل. و [[public]] على رد فيه داتا يوزر فالـ CDN يوزّعها. وتغيّر ملف JS من غير ما اسمه يتغير وهو متكاش سنة.`
          },
          teach: R`## الفكرة في جملة

التلات أوامر بيسألوا السيرفر عن headers الكاش بس: ملف JS بيتكاش قد إيه؟ والـ HTML عليه ETag؟ ولو بعتنا ETag، السيرفر يرد 304 ولا 200؟ الدومين في المثال وهمي، فعملنا سيرفر Express صغير على [[localhost:4002]] فيه نفس الملفين، وشغلنا نفس الأوامر عليه بـ curl من ويندوز، وجربنا كمان مواقع حقيقية من [[docker run --rm ubuntu:24.04]].

السيرفر نفسه سطرين مهمين:

~~~js
app.use("/assets", express.static("public/assets", { immutable: true, maxAge: "1y" }));
app.use(express.static("public", { setHeaders: res => res.set("Cache-Control", "no-cache") }));
~~~

ملفات [[/assets]] تتكاش سنة و immutable، والباقي (الـ HTML) [[no-cache]].

---

## ١. الملف اللي في اسمه hash

~~~bash
curl -sI http://localhost:4002/assets/app.3f9a1c.js | grep -i cache-control
~~~

- [[-sI]]: طلب HEAD من غير شريط تقدم، فبيرجع الـ headers بس.
- [[grep -i]]: دوّر من غير ما يفرق capital و small، لأن HTTP/2 بيكتب الـ headers small و HTTP/1.1 غالبًا Capital.

~~~text الناتج
Cache-Control: public, max-age=31536000, immutable
~~~

| الكلمة | معناها |
|---|---|
| [[public]] | أي كاش يخزّنه: المتصفح والـ CDN |
| [[max-age=31536000]] | fresh لمدة 31,536,000 ثانية = 365 × 24 × 3600 = سنة. طول المدة دي المتصفح مش هيسأل السيرفر خالص |
| [[immutable]] | حتى لو اليوزر عمل reload، متسألش: الملف ده عمره ما هيتغير |

ليه أمان نكاشه سنة؟ لأن [[3f9a1c]] hash من محتوى الملف. لو غيرت سطر، الـ build يطلّع اسم جديد، والـ HTML يشاور على الاسم الجديد. فالقديم ميتغيرش أبدًا. ونفس الكلام على CDN حقيقي، cdnjs بيرد على jquery 3.7.1:

~~~text الناتج
cache-control: no-transform, public, s-maxage=30672000, max-age=30672000, immutable
age: 1423168
~~~

[[s-maxage]] مدة خاصة بالـ shared caches زي الـ CDN، و [[age]] يعني النسخة دي قاعدة في كاش الـ CDN بقالها ١٦ يوم تقريبًا.

---

## ٢. صفحة الـ HTML

~~~bash
curl -sI http://localhost:4002/ | grep -i -E "cache-control|etag"
~~~

[[-E "a|b"]]: سطور فيها أي واحدة من الكلمتين.

~~~text الناتج
Cache-Control: no-cache
ETag: W/"c-1a11b44fd28"
~~~

- [[no-cache]]: **خزّن** بس اسأل السيرفر قبل كل استخدام. مش «متخزّنش» (دي [[no-store]]).
- [[ETag]]: بصمة لنسخة الملف. Express بيعملها من حجم الملف ووقت تعديله بالـ hex: [[c]] = 12 byte (حجم [[<h1>hi</h1>]] والسطر الجديد).
- [[W/]] في الأول = weak ETag: «نفس المحتوى» مش بالضرورة نفس الـ bytes بالظبط. كفاية للكاش.

---

## ٣. السؤال المشروط: [[If-None-Match]]

بعتنا الـ ETag اللي أخدناه:

~~~bash
curl -sI http://localhost:4002/ -H 'If-None-Match: W/"c-1a11b44fd28"'
~~~

~~~text الناتج
HTTP/1.1 304 Not Modified
~~~

وبـ ETag غلط ([["abc123"]] زي المثال):

~~~text الناتج
HTTP/1.1 200 OK
Content-Length: 12
~~~

- [[If-None-Match]]: «ابعتلي الملف **إلا** لو بصمته لسه دي».
- 304: «نسختك سليمة، استخدمها». **من غير body**. وفّرنا الـ bytes بس لسه فيه رحلة رايح جاي.
- 200 مع [[Content-Length: 12]]: البصمة مختلفة، فبعت الملف كله.

ونفس الفكرة بالتاريخ بدل البصمة: [[example.com]] باعت [[last-modified]]، فبعتناه في [[If-Modified-Since]]:

~~~text الناتج (ubuntu:24.04)
HTTP/2 304
~~~

---

## ٤. الصورة كلها

| الملف | الـ header | المتصفح بيعمل إيه |
|---|---|---|
| [[app.3f9a1c.js]] | [[max-age=31536000, immutable]] | ولا طلب لمدة سنة (memory أو disk cache) |
| [[index.html]] | [[no-cache]] + ETag | يسأل كل مرة، وغالبًا 304 |
| [[/api/me]] | [[private, no-store]] | ميخزّنش خالص، والـ CDN ميلمسوش |

ليه الـ HTML [[no-cache]]؟ لأنه اللي بيشاور على أسماء الملفات الجديدة. لو اتكاش ساعة، اليوزر هيفضل ساعة على الـ deploy القديم.

---

## الخلاصة

- freshness: جوه الـ [[max-age]] مفيش طلب خالص.
- validation: بعده، طلب مشروط بـ [[If-None-Match]] أو [[If-Modified-Since]]، والرد 304 من غير body.
- [[no-cache]] = خزّن واسأل. [[no-store]] = متخزّنش. [[private]] = المتصفح بس.

> اسم فيه hash + سنة + immutable للملفات، و [[no-cache]] للـ HTML، و [[no-store]] لأي داتا يوزر.`,
          lines: [
            "بص على الـ Cache-Control بتاع ملف فيه hash في اسمه.",
            "بص على الـ Cache-Control والـ ETag بتوع صفحة HTML.",
            "اسأل «اتغيرت من ساعة الـ ETag ده؟»: لو لأ الرد 304 من غير body."
          ],
          sol: R`أول مرة كل الملفات هتبقى Size بحجم حقيقي (اتنزلت). في الـ reload العادي: ملفات الـ JS والـ CSS اللي اسمها فيه hash (زي [[app.3f9a1c.js]]) هتلاقيها [[(memory cache)]] أو [[(disk cache)]] ومفيش طلب راح للسيرفر أصلًا، ودي اللي عليها [[max-age=31536000, immutable]]. أما الـ HTML نفسه فغالبًا Status [[304]] وحجمه صغير: المتصفح سأل بـ [[If-None-Match]] والسيرفر قال «زي ما هو»، ودي اللي عليها [[no-cache]] أو [[max-age=0]] ومعاها ETag.

memory cache يعني الملف كان لسه في رام التاب (reload على طول)، و disk cache يعني من الهارد (قفلت التاب وفتحته). عشان تتأكد: دوس على الملف وبص على Response Headers وشوف [[cache-control]] و [[etag]].

النتيجة الغلط الشائعة: كل حاجة 200 بحجمها الكامل. ده غالبًا لأن «Disable cache» متعلّم فوق في Network (بيشتغل طول ما الـ DevTools مفتوحة)، أو إنك عملت hard reload بـ Ctrl+Shift+R، أو إن السيرفر مش باعت أي cache headers خالص.`
        },
        {
          cmd: "same-origin policy",
          title: "الـ frontend بيقول «blocked by CORS policy»: ليه بيحصل، ومين المسؤول يصلّحه؟",
          desc: R`المتصفح عنده same-origin policy: صفحة من origin (protocol + domain + port) مينفعش الـ JavaScript بتاعها يقرا رد من origin تاني، إلا لو السيرفر التاني سمح بـ header اسمه [[Access-Control-Allow-Origin]]. يعني CORS مش حماية للسيرفر، ده السيرفر بيقول للمتصفح «أنا موافق إن الموقع ده يقرا ردودي». عشان كده الحل دايمًا على السيرفر، و curl و Postman مبيتأثروش.

والطلبات «غير البسيطة» (JSON body، أو header زي Authorization، أو PUT و DELETE) بيسبقها preflight بـ [[OPTIONS]]. ولو فيه كوكيز لازم origin محدد مش [[*]] ومعاه [[Access-Control-Allow-Credentials: true]]. الشغل العملي في تاب «المتصفح».`,
          example: R`curl -si -X OPTIONS https://api.example.com/orders -H "Origin: https://app.example.com" -H "Access-Control-Request-Method: POST" | grep -i access-control
# access-control-allow-origin: https://app.example.com
# access-control-allow-methods: GET,POST,PATCH,DELETE
curl -si https://api.example.com/orders -H "Origin: https://evil.example" | grep -i access-control
# (مفيش سطور: المتصفح هيمنع الصفحة دي من قراية الرد، بس الطلب نفسه وصل)`,
          try: "افتح Console على أي موقع واعمل [[fetch]] لـ API بتاعك: شوف الـ error، وشوف في Network إن الطلب وصل وليه رد. بعدين ضيف الـ origin في إعدادات cors وجرّب تاني.",
          deep: {
            why: "أكتر error بيقابل أي حد بيبني frontend و backend منفصلين. والإنترفيوير عايز يعرف إنك فاهم مين بيمنع ومين بيسمح، مش إنك بتنسخ [[cors()]] وخلاص.",
            how: R`الـ origin هو الـ scheme والدومين والبورت مع بعض. [[http://localhost:5173]] و [[http://localhost:3000]] origins مختلفة.

الطلبات البسيطة (GET أو POST بـ form content type ومن غير headers خاصة) بتتبعت على طول، والسيرفر بينفّذها، والمتصفح بس بيخبّي الرد عن الـ JavaScript لو الـ header ناقص. عشان كده CORS لوحده مش حماية من CSRF.

الطلبات التانية: المتصفح يبعت [[OPTIONS]] الأول فيه [[Origin]] و [[Access-Control-Request-Method]] و [[Access-Control-Request-Headers]]، والسيرفر يرد بالمسموح. ولو الرد تمام يبعت الطلب الحقيقي. و [[Access-Control-Max-Age]] بيخلي نتيجة الـ preflight تتكاش شوية.

في التطوير أسهل حل proxy (في Vite أو rewrites في Next.js): الـ frontend يطلب من نفس الـ origin، والـ dev server يوصّل للـ API، فمفيش cross-origin أصلًا.`,
            when: "Follow-ups: «CORS بيحمي من CSRF؟». «ليه Postman شغال والمتصفح لأ؟». «الـ preflight بيتبعت إمتى؟». «إزاي تبعت كوكيز لـ API على دومين تاني؟» ([[credentials: 'include']] و SameSite=None; Secure).",
            mistakes: R`تقول CORS بيحمي الـ API: أي حد بـ curl يقدر يكلّمه. وتحط [[*]] مع credentials (مش هيشتغل). وتعكس أي Origin جاي في الرد من غير قايمة مسموحة، ودي أخطر من [[*]] مع الكوكيز. وتحاول تحلها من الـ frontend بـ [[mode: 'no-cors']]، اللي بيخلي الرد opaque ومتقدرش تقراه أصلًا.`
          },
          teach: R`## الفكرة في جملة

الأمرين بيمثّلوا اللي المتصفح بيعمله: الأول **preflight** بيسأل «مسموح لـ app.example.com يعمل POST؟»، والتاني طلب عادي جاي من origin مش مسموح. عشان نشوف ردود حقيقية عملنا API بـ Express و مكتبة [[cors]] على [[localhost:4003]] بيسمح لـ [[https://app.example.com]] بس، وشغلنا الأوامر بـ curl على ويندوز:

~~~js
app.use(cors({ origin: ["https://app.example.com"], methods: ["GET", "POST", "PATCH", "DELETE"] }));
app.all("/orders", (req, res) => { console.log("route ran:", req.method, req.get("Origin")); res.json([{ id: 1 }]); });
~~~

السطر التاني بيطبع في لوج السيرفر كل مرة الـ route يشتغل، عشان نعرف الطلب وصل ولا لأ.

---

## ١. يعني إيه origin؟

origin = **scheme + domain + port** مع بعض:

| URL | الـ origin |
|---|---|
| [[https://app.example.com/cart]] | [[https://app.example.com]] |
| [[http://localhost:5173]] | [[http://localhost:5173]] |
| [[http://localhost:3000]] | origin **تاني** (البورت مختلف) |

الـ same-origin policy: الـ JavaScript في صفحة من origin مينفعش **يقرا** رد من origin تاني، إلا لو الرد نفسه قال إنه موافق.

---

## ٢. الـ preflight

~~~bash
curl -si -X OPTIONS http://localhost:4003/orders -H "Origin: https://app.example.com" -H "Access-Control-Request-Method: POST" | grep -i access-control
~~~

| الجزء | معناه |
|---|---|
| [[-X OPTIONS]] | الـ method اللي المتصفح بيستخدمه للسؤال |
| [[-H "Origin: ..."]] | أنا جاي من الصفحة دي (المتصفح بيحطه لوحده، والـ JS مبيقدرش يزوّره) |
| [[-H "Access-Control-Request-Method: POST"]] | والطلب الحقيقي هيبقى POST |
| [[grep -i access-control]] | سيب سطور الـ CORS بس |

~~~text الناتج (شلنا الـ grep عشان نشوف الـ status كمان)
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Vary: Origin, Access-Control-Request-Headers
Access-Control-Allow-Methods: GET,POST,PATCH,DELETE
~~~

- [[204]]: الـ preflight نجح ومفيش body.
- [[Access-Control-Allow-Origin]]: «الـ origin ده بالذات مسموحله يقرا ردودي».
- [[Access-Control-Allow-Methods]]: الـ methods المسموحة.
- [[Vary: Origin]]: رسالة للكاش: الرد بيختلف حسب الـ Origin، فمتديش رد app لـ origin تاني.

المتصفح بيبعت الـ preflight ده **لوحده** قبل أي طلب «مش بسيط»: JSON body، أو header زي [[Authorization]]، أو PUT و DELETE و PATCH. ولو الرد مفيهوش الـ origin بتاعه، مبيبعتش الطلب الحقيقي.

---

## ٣. طلب من origin مش في القايمة

~~~bash
curl -si http://localhost:4003/orders -H "Origin: https://evil.example" | grep -i access-control
~~~

~~~text الناتج (من غير grep)
HTTP/1.1 200 OK
[{"id":1}]
~~~

ولوج السيرفر:

~~~text لوج السيرفر
route ran: GET https://evil.example
route ran: GET https://app.example.com
~~~

ده أهم سطر في الدرس كله: الـ route **اشتغل** ورجّع الداتا. اللي ناقص بس [[Access-Control-Allow-Origin]]. يعني:

- curl (أو Postman أو أي سيرفر) شاف الداتا عادي، لأن CORS قاعدة **في المتصفح** بس.
- المتصفح كان هيستلم نفس الرد، ويشوف إن الـ header ناقص، فيخبّيه عن الـ JavaScript ويطلّع في Console: [[blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present]] (الرسالة دي من Chrome).

وللمقارنة، نفس الطلب من الـ origin المسموح:

~~~text الناتج
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
[{"id":1}]
~~~

---

## ٤. مين يصلّح؟

| الحل | صح؟ | ليه |
|---|---|---|
| السيرفر يضيف الـ origin في [[cors({ origin: [...] })]] | أيوه | السيرفر هو اللي بيقول «موافق» |
| proxy في Vite أو Next.js وقت التطوير | أيوه | الصفحة بتطلب من نفس الـ origin، فمفيش CORS أصلًا |
| [[mode: "no-cors"]] في [[fetch]] | لأ | الرد بيبقى opaque ومتقدرش تقرا منه حاجة |
| [[origin: "*"]] مع كوكيز | لأ | المتصفح بيرفض [[*]] مع [[credentials: "include"]] |

---

## الخلاصة

- CORS مش حماية للـ API: الطلب وصل والـ route اشتغل. ده السيرفر بيقول للمتصفح «اسمح للصفحة دي تقرا ردي».
- الحل دايمًا على السيرفر: قايمة origins محددة.
- الطلبات غير البسيطة بيسبقها [[OPTIONS]]، والرد لازم يبقى فيه الـ origin والـ method.

> وبما إن الطلب البسيط بيوصل وبيتنفّذ حتى لو المتصفح خبّى الرد، CORS لوحده مش حماية من CSRF.`,
          lines: [
            "مثّل preflight: «أنا app.example.com وعايز أعمل POST، مسموح؟» واطبع ردود الـ CORS بس.",
            "طلب من origin مش في القايمة: السيرفر مبيرجّعش headers الـ CORS."
          ],
          sol: R`في Console هيطلع error شبه ده بالظبط: [[Access to fetch at 'https://api...' from origin 'https://site...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] والـ fetch يرمي [[TypeError: Failed to fetch]]. وفي Network هتلاقي الطلب اتبعت فعلًا، والسيرفر رد (وممكن تشوف في لوج السيرفر إن الـ route اشتغل)، بس المتصفح مخلّاش الـ JS تقرا الرد. ده أهم حاجة تفهمها: CORS بيحمي قراية الرد في المتصفح، مش السيرفر.

بعد ما تضيف الـ origin (مثلًا [[cors({ origin: "https://site..." })]] في Express)، نفس الـ fetch يرجّع الداتا عادي، وتلاقي في الرد [[access-control-allow-origin]] بنفس الـ origin. ولو الطلب POST بـ JSON هتلاقي قبله طلب [[OPTIONS]] (preflight) لازم هو كمان يرجّع الـ headers.

النتايج الغلط: إنك «تصلّحها» في الـ frontend بـ [[mode: "no-cors"]] (الرد بيبقى opaque ومتقدرش تقرا منه حاجة)، أو extension بيقفل CORS في متصفحك بس. وخلي بالك إن [[*]] مينفعش مع [[credentials: "include"]]: لازم origin محدد و [[Access-Control-Allow-Credentials: true]].`
        }
      ]
    }
]);
