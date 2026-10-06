// تكملة تاب sec: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sec/01.js (شرح حقول الدرس في أوله)
MORE("sec", [
    {
      t: "OWASP Top 10: افهمها في كودك",
      l: 2,
      n: "قايمة OWASP لأشهر الثغرات، آخر نسخة 2025. لكل واحدة: بتحصل إزاي، والكود الغلط، والصح. الرقم اللي في اسم الدرس ترتيب الشرح بس، ورقم OWASP الحقيقي (A01 لـ A10) مكتوب في عنوان كل درس: SQL و XSS و Command Injection تحت A05 Injection، و CSRF و SSRF و Path Traversal و Zip Slip تحت A01، و Rate limiting مش بند لوحده، ده دفاع تحت A07 و A06",
      items: [
        {
          cmd: "1. Broken Access Control",
          title: "A01 أخطر واحدة: توصل لحاجة مش من حقك",
          desc: "A01:2025 Broken Access Control، رقم 1 في القايمة. أشهر صورها اسمها IDOR: لما تغيّر id في الـ URL فتشوف داتا حد تاني. الـ API لازم يتأكد إن الحاجة دي بتاعتك، مش بس إنك مسجّل دخول. الغلط الشائع: بتتأكد إن فيه توكن، بس مش بتتأكد إن المورد ده بتاع صاحب التوكن.",
          example: R`// غلط: أي مستخدم مسجّل يشوف أي طلب
app.get("/api/orders/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// صح: لازم يكون بتاعه هو
app.get("/api/orders/:id", auth, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id   // الفلتر ده هو الحماية
  });
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});`,
          try: "في أي API عندك بيرجّع داتا بـ id: سجّل بيوزرين، وجرّب توصل لداتا اليوزر التاني بالـ id بتاعه. لو نجحت، عندك الثغرة دي.",
          flag: "script",
          deep: {
            why: "الأخطر في OWASP Top 10. مش بس تتأكد إن اليوزر logged in، لازم تتأكد إن المورد اللي بيطلبه بتاعه هو.",
            how: R`IDOR: اليوزر يغيّر ID في الـ URL ويوصل لبيانات يوزر تاني.

الكود الغلط: بيتأكد إن فيه session بس ومش بيتأكد إن الـ order بتاع اليوزر ده.

الكود الصح: الـ query بيفلتر على userId مع _id، فمهما غيّر الـ id مش هيلاقي غير الأوامر بتاعته.

مبدأ: أي resource بياخد identifier من اليوزر، لازم يبقى في الـ query شرط إنه بتاعه هو.`,
            when: "في كل route بياخد id من الطلب.",
            mistakes: "الاعتماد على إن الـ id صعب يتخمّن. المشكلة مش التخمين، المشكلة إن مفيش validation."
          },
          teach: R`## الفكرة: «مسجّل دخول» مش معناها «ده بتاعك»

فيه سؤالين مختلفين: **انت مين؟** (authentication) و **ده بتاعك؟** (authorization). الكود الغلط في المثال بيسأل الأول بس. هنفكّه، وبعدين نشوف الفرق على معمل حقيقي.

---

## ١. الكود الغلط سطر سطر

~~~javascript
app.get("/api/orders/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});
~~~

| الحتة | معناها |
|---|---|
| [[app.get(...)]] | لو جالك طلب GET على المسار ده، شغّل اللي بعده |
| [[/api/orders/:id]] | [[:id]] معناها «أي حاجة هنا اسمها id». [[/api/orders/42]] بيدّي [[id = "42"]] |
| [[auth]] | middleware بيشتغل قبل الـ handler: لو مفيش توكن صح يرد 401 ويقف. لو فيه، بيحط اليوزر في [[req.user]] |
| [[async (req, res) => ...]] | الـ handler. [[req]] الطلب و [[res]] الرد |
| [[req.params.id]] | الـ id اللي في الـ URL، واللي **المستخدم بيكتبه** |
| [[Order.findById(...)]] | Mongoose: هات الأوردر اللي الـ [[_id]] بتاعه كده، أيًا كان صاحبه |
| [[res.json(order)]] | ابعته كـ JSON |

المشكلة في سطر [[findById]]: مفيش أي ذكر لـ [[req.user]]. الـ [[auth]] اتأكد إنك مسجّل، وخلاص.

---

## ٢. الكود الصح سطر سطر

~~~javascript
const order = await Order.findOne({
  _id: req.params.id,
  userId: req.user.id   // الفلتر ده هو الحماية
});
if (!order) return res.status(404).json({ error: "Not found" });
~~~

- [[findOne({...})]] بيدوّر على أول document يطابق **كل** الشروط اللي في الـ object.
- [[_id: req.params.id]] الأوردر المطلوب.
- [[userId: req.user.id]] **و** صاحبه هو اللي عامل الطلب. [[req.user.id]] جاي من التوكن اللي السيرفر اتأكد منه، مش من الـ URL ولا الـ body، فالمستخدم مش بيتحكم فيه.
- [[if (!order)]] لو ملقاش، يا الأوردر مش موجود يا مش بتاعك. والرد في الحالتين [[404]]، فالمهاجم ميعرفش حتى إن الرقم ده موجود.
- [[return]] قبل [[res.status]] عشان الكود ميكملش ويبعت رد تاني.

ونفس الفكرة بـ SQL (اللي في كود الحل):

~~~sql
SELECT * FROM orders WHERE id = $1 AND user_id = $2
~~~

[[$1]] و [[$2]] أماكن بتتملي بالقيم [[req.params.id]] و [[req.user.id]] بالترتيب (شرحها في درس «2. SQL Injection»).

---

## ٣. جرّبناها على المعمل

معمل Express و Postgres في Docker على [[localhost:3101]]، فيه الروتين: [[/bad/api/orders/:id]] (الغلط) و [[/api/orders/:id]] (الصح). أوردر 41 بتاع Ali، و 42 بتاع Sara. وهنطلب كل حاجة بتوكن Ali:

~~~bash
curl -s -w "  [%{http_code}]\n" http://localhost:3101/bad/api/orders/42 -H "Authorization: Bearer tok-ali"
~~~

[[-w]] (write-out) بيطبع حاجة بعد الرد، و [[%{http_code}]] رقم الحالة.

| الطلب (بتوكن Ali) | الرد |
|---|---|
| [[/bad/api/orders/41]] | [[{"id":41,"user_id":123,"item":"Laptop","total":25000}  [200]]] |
| [[/bad/api/orders/42]] | [[{"id":42,"user_id":124,"item":"Phone","total":12000}  [200]]] ← أوردر Sara |
| [[/api/orders/41]] | [[{"id":41,"user_id":123,"item":"Laptop","total":25000}  [200]]] |
| [[/api/orders/42]] | [[{"error":"Not found"}  [404]]] |
| [[/api/orders/99]] (مش موجود) | [[{"error":"Not found"}  [404]]] |

ولما Sara نفسها طلبت [[/api/orders/42]] بتوكنها رجعلها الأوردر بـ [[200]]. يعني الإصلاح مقفلش حاجة على صاحبها، قفل على غيره بس. ولاحظ إن 42 و 99 ردهم واحد بالظبط: المهاجم مش عارف يفرّق بين «موجود ومش بتاعك» و «مش موجود».

---

## ٤. فين تدوّر في كودك

| علامة الخطر | ليه |
|---|---|
| [[findById(req.params.id)]] لوحده | مفيش شرط صاحب |
| [[WHERE id = $1]] من غير [[user_id]] | نفس الكلام في SQL |
| [[userId]] جاي من [[req.body]] | المستخدم بيكتبه بنفسه |
| GET اتحمى و PUT و DELETE لأ | التعديل والمسح بيتنسوا |

---

## الخلاصة

- [[auth]] بيقول انت مين، والشرط في الـ query بيقول ده بتاعك.
- صاحب الداتا ييجي من التوكن ([[req.user.id]])، عمره ما ييجي من الطلب.
- رد [[404]] واحد للي مش موجود وللي مش بتاعك.`,
          lines: [
            "الكود الغلط: route بياخد id، ومحمي بـ auth (يعني لازم تكون logged in).",
            "بيجيب الطلب بالـ id زي ما هو، من غير ما يسأل بتاع مين.",
            "ويرجعه. أي يوزر يقدر يشوف طلبات أي يوزر.",
            "قفلة.",
            "الكود الصح: نفس الـ route.",
            "بيدوّر بشرطين.",
            "الـ id المطلوب...",
            "...وإنه بتاع اليوزر اللي عامل الطلب. ده الفلتر اللي بيحمي.",
            "قفلة الشرط.",
            "لو ملقاش (الطلب مش بتاعه)، 404 من غير ما يقول إنه موجود أصلًا.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`اعمل يوزرين A و B، وخد توكن A، واطلب بيه أوردر بتاع B: [[curl -H "Authorization: Bearer $TOKEN_A" http://localhost:3000/api/orders/42]] حيث 42 أوردر B. الرد الصح [[404]] (أو [[403]])، مش داتا B. الـ 404 أحسن غالبًا لأنه مبيأكدش إن الأوردر موجود أصلًا.

لو رجعلك داتا B يبقى عندك IDOR: الكود بيتأكد إنك داخل، بس مش بيتأكد إن الحاجة دي بتاعتك. الحل إن الاستعلام نفسه يشمل صاحب الداتا: [[WHERE id = $1 AND user_id = $2]] بالـ user id اللي جاي من التوكن، مش من الـ body أو الـ URL. وجرّب نفس الكلام على التعديل والمسح (PUT/DELETE)، لأنهم غالبًا اللي بيتنسوا.`,
          solCode: R`# التوكن بتاع A، والأوردر 42 بتاع B
curl -i -H "Authorization: Bearer $TOKEN_A" http://localhost:3000/api/orders/42
# المتوقع: HTTP/1.1 404 Not Found

// الإصلاح: صاحب الداتا جزء من الاستعلام
const { rows } = await db.query(
  "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
  [req.params.id, req.user.id]
);
if (!rows.length) return res.status(404).json({ error: "Not found" });`
        },
        {
          cmd: "2. SQL Injection",
          title: "A05 Injection: لما مدخل المستخدم يتحط في استعلام",
          desc: "SQL Injection نوع من A05:2025 Injection. لو حطيت اللي المستخدم كتبه جوه نص الاستعلام مباشرة، هو يقدر يغيّر معنى الاستعلام. الحل الوحيد الكامل: parameterized queries، اللي بتبعت الاستعلام والقيم منفصلين، فالقيمة تفضل قيمة مهما كانت. متحاولش تنضّف المدخل بنفسك.",
          example: R`// خطر: القيمة بتتلزق في الاستعلام
const q = "SELECT * FROM users WHERE email = '" + email + "'";
db.query(q);

// أمان: القيمة منفصلة ($1)
db.query("SELECT * FROM users WHERE email = $1", [email]);

// مع ORM (Prisma) آمن افتراضيًا
await prisma.user.findUnique({ where: { email } });`,
          try: "دوّر في كودك بـ grep على استعلامات فيها [[+]] أو backticks جواها متغيرات، ده أول مكان تبص فيه.",
          flag: "script",
          deep: {
            why: "المهاجم يكتب SQL في الـ input وتطبيقك ينفّذه. ممكن يمسح قاعدة البيانات أو يسحب كل البيانات.",
            how: R`الكود الغلط: بيبني الاستعلام بـ string concatenation. لو اليوزر كتب [[' OR '1'='1]] كإيميل، الاستعلام بيبقى يرجع كل الصفوف.

Parameterized queries: الاستعلام والبيانات بيتبعتوا منفصلين. قاعدة البيانات نفسها بتعرف إن [[email]] داتا ومش SQL.

ORMs زي Prisma بيعملوا parameterized queries تلقائيًا. الخطر بييجي لو لجأت لـ raw queries.`,
            when: "في أي مكان بتحط فيه بيانات من اليوزر في استعلام.",
            mistakes: "الاعتماد على تنضيف المدخل يدويًا. استخدم parameterized queries وبس."
          },
          teach: R`## الفكرة: الداتا لازم تفضل داتا

الاستعلام كود، والإيميل اللي المستخدم كتبه داتا. لو لزقتهم في string واحد، قاعدة البيانات مش هتعرف تفرّق بينهم، وأي علامة تنصيص في الإيميل هتقفل النص وتكمّل SQL. هنفك سطور المثال، وبعدين نجرّبها على معمل صغير عملناه: Express و Postgres في Docker على [[localhost:3101]]، فيه route غلط [[/bad/users]] و route صح [[/users]].

---

## ١. السطر الغلط

~~~javascript
const q = "SELECT * FROM users WHERE email = '" + email + "'";
db.query(q);
~~~

| الحتة | معناها |
|---|---|
| [[SELECT * FROM users]] | هات كل الأعمدة ([[*]]) من جدول users |
| [[WHERE email = '...']] | بس الصفوف اللي الإيميل فيها بالقيمة دي. في SQL النص بيتحط بين [[' ']] |
| [[+ email +]] | لزق القيمة اللي جت من المستخدم جوه الـ string |
| [[db.query(q)]] | ابعت النص كله لقاعدة البيانات تنفّذه |

لو المستخدم كتب [[ali@example.com]] الاستعلام بيبقى:

~~~sql
SELECT * FROM users WHERE email = 'ali@example.com'
~~~

ولو كتب [[' OR '1'='1]] (أول حرف علامة تنصيص):

~~~sql
SELECT * FROM users WHERE email = '' OR '1'='1'
~~~

علامة التنصيص اللي كتبها قفلت النص بدري، و [[OR '1'='1']] بقى جزء من الشرط، وده صح دايمًا، فالشرط كله صح لكل صف.

---

## ٢. جرّبناه على المعمل

[[-G]] بيخلي curl يحط الداتا في الـ URL كـ query string، و [[--data-urlencode]] بيعمل encoding للمسافات وعلامات التنصيص عشان توصل زي ما هي:

~~~bash
curl -s -G http://localhost:3101/bad/users --data-urlencode "email=ali@example.com"
~~~

~~~text الناتج
[{"id":123,"email":"ali@example.com","name":"Ali"}]
~~~

يوزر واحد، طبيعي. دلوقتي نفس الطلب بالمدخل الخبيث:

~~~bash
curl -s -G http://localhost:3101/bad/users --data-urlencode "email=' OR '1'='1"
~~~

~~~text الناتج
[{"id":123,"email":"ali@example.com","name":"Ali"},{"id":124,"email":"sara@example.com","name":"Sara"}]
~~~

كل اليوزرز رجعوا. ولو المهاجم ضاف [[UNION SELECT]] (بيلزق نتيجة استعلام تاني تحت الأولاني) يقدر يسحب أعمدة مش المفروض تطلع خالص. في المعمل طلّعنا بيها عمود الباسورد مكان عمود الاسم:

~~~text جزء من الناتج
{"id":123,"email":"ali@example.com","name":"$2b$12$aL9/aIKO1hT9mH7tanGRPO..."}
~~~

ودي hashes بـ bcrypt (درس «4. مصادقة سليمة»)، فالضرر أقل، بس لو كانت متخزنة نص عادي كانت خلصت.

### حتى من غير مهاجم: الكود بيقع

يوزر عادي اسمه O'Brien:

~~~bash
curl -s -w " [%{http_code}]" -G http://localhost:3101/bad/users --data-urlencode "email=o'brien@x.com"
~~~

~~~text الناتج
{"error":"syntax error at or near \"brien\""} [500]
~~~

[[-w]] (write-out) بيطبع بعد الرد حاجة نختارها، و [[%{http_code}]] رقم الحالة. الـ [[500]] ورسالة الخطأ دي بتقول للمهاجم إن المدخل بيتلزق في SQL، فهي أول علامة بيدوّر عليها.

### أسوأ من القراية: أوامر كاملة

مكتبة [[pg]] لما تبعتلها string من غير parameters بتسمح بأكتر من أمر مفصولين بـ [[;]]. فالمدخل ده:

~~~text المدخل
'; UPDATE users SET balance = 0 WHERE id = 124; --
~~~

[[;]] قفلت الاستعلام الأولاني، و [[UPDATE]] أمر جديد، و [[--]] بداية تعليق في SQL فبيلغي علامة التنصيص اللي الكود بيحطها في الآخر. بعدها رصيد Sara في المعمل بقى:

~~~text الناتج
{"id":124,"email":"sara@example.com","name":"Sara","balance":0}
~~~

يعني الثغرة دي مش «بيشوف داتا» بس، دي تعديل ومسح كمان.

---

## ٣. السطر الصح: [[$1]]

~~~javascript
db.query("SELECT * FROM users WHERE email = $1", [email]);
~~~

- [[$1]] مكان فاضي (placeholder) جوه الاستعلام، معناه «أول قيمة في الـ array». لو فيه تانية تبقى [[$2]] وهكذا.
- [[[email]]] الـ array اللي فيه القيم بالترتيب.
- مكتبة [[pg]] بتبعت الاستعلام لوحده والقيم لوحدها لـ Postgres (اسمها parameterized query أو prepared statement). Postgres بيفهم شكل الاستعلام **قبل** ما يشوف القيمة، فالقيمة مستحيل تغيّر الشكل. علامة التنصيص فيها بتفضل حرف عادي جوه الإيميل.

نفس المدخلات على [[/users]] (الـ route الصح):

| المدخل | الرد |
|---|---|
| [[ali@example.com]] | [[[{"id":123,"email":"ali@example.com","name":"Ali"}] [200]]] |
| [[' OR '1'='1]] | [[[] [200]]] |
| [[o'brien@x.com]] | [[[] [200]]] |
| [[UPDATE]] اللي فوق | [[[]]]، والرصيد متغيّرش |

مفيش إيميل بالشكل ده، فالنتيجة فاضية. مفيش خطأ ومفيش تسريب، و O'Brien الحقيقي هيتلاقى عادي.

> الـ placeholder في [[pg]] (Postgres) [[$1]]، وفي [[mysql2]] و SQLite علامة [[?]]. الفكرة واحدة.

---

## ٤. Prisma

~~~javascript
await prisma.user.findUnique({ where: { email } });
~~~

- [[prisma.user]] الجدول، و [[findUnique]] هات صف واحد بعمود unique.
- [[{ email }]] اختصار لـ [[{ email: email }]] في JavaScript.

Prisma بتبني الاستعلام بـ parameters لوحدها (من الـ docs بتاعتها، مجرّبناهاش في المعمل). الخطر الوحيد [[$queryRawUnsafe]] اللي بياخد string جاهز زي الكود الغلط بالظبط.

---

## ٥. كود الحل: دوّر على اللزق في مشروعك

~~~bash
grep -rnE '(query|execute|raw)\(.*(\+|\$\{)' --include=*.js --include=*.ts --exclude-dir=node_modules .
~~~

| الحتة | معناها |
|---|---|
| [[-r]] و [[-n]] | جوه كل الفولدرات، واطبع رقم السطر |
| [[-E]] | regex موسّع |
| [[(query|execute|raw)\(]] | اسم دالة من دول وبعدها قوس. [[\(]] قوس حرفي |
| [[.*]] | أي حاجة |
| [[(\+|\$\{)]] | علامة [[+]] (لزق) أو بداية متغير في template string |
| [[--include]] و [[--exclude-dir]] | ملفات js و ts بس، ومن غير node_modules |

لازم الـ regex بين علامات تنصيص مفردة [['...']]: لو حطيته بين [["..."]] الـ shell بيلعب في [[$]] و [[\]]، وجرّبناها بالمزدوجة وطلعت [[grep: Unmatched ( or \(]]. على ملف تجربة فيه السطرين الغلط وسطر بـ [[$1]] (Git Bash على ويندوز) الأمر مسك الغلط بس:

~~~text الناتج
sqlg/a.js:1:db.query("SELECT * FROM users WHERE email = '" + email + "'");
sqlg/a.js:2:db.query($__btSELECT * FROM users WHERE email = '$__{email}'$__bt);
~~~

---

## الخلاصة

- مدخل المستخدم عمره ما يتلزق في نص الاستعلام، لا بـ [[+]] ولا بـ template string.
- [[$1]] والقيم في array: Postgres بيعرف الشكل قبل القيمة، فالقيمة متقدرش تغيّره.
- التنضيف بإيدك (تشيل علامات التنصيص) بيتكسر وبيبوّظ أسامي زي O'Brien. الـ parameters هي الحل.`,
          lines: [
            "الغلط: لزق الإيميل جوه الاستعلام كنص. لو الإيميل فيه علامة تنصيص، بيبقى جزء من الـ SQL.",
            "وتنفيذه.",
            "الصح: الاستعلام فيه [[$1]] كمكان فاضي، والقيمة بتتبعت لوحدها في array. قاعدة البيانات عمرها ما هتعتبرها SQL.",
            "أو ORM زي Prisma، وده بيعمل نفس الحاجة لوحده."
          ],
          sol: R`الأمر اللي بيدوّر: [[grep -rnE "(query|execute|raw)\(.*(\+|\$__{)" --include=*.js --include=*.ts --exclude-dir=node_modules .]]. كل سطر بيطلع معناه إن فيه استعلام بيتبني بلزق نص، زي [[db.query("SELECT * FROM users WHERE email = '" + email + "'")]] أو template string فيها [[$__{email}]]. المشروع السليم المفروض ميطلعش فيه ولا سطر.

كل واحد تلاقيه حوّله لـ parameters: [[db.query("SELECT * FROM users WHERE email = $1", [email])]]، أو استخدم الـ ORM (Prisma مثلًا). خد بالك من حاجتين: Prisma نفسها فيها [[$queryRawUnsafe]] وده بيلزق النص زي الأول بالظبط، أما [[$queryRaw]] بالـ tagged template فأمان. وأسماء الأعمدة والجداول مينفعش تبقى parameters، فلو المستخدم بيختار عمود الترتيب، قارن باللي جاي بقايمة مسموحة (allowlist).`
        },
        {
          cmd: "3. XSS",
          title: "A05 Injection: لما تعرض مدخل المستخدم كـ HTML",
          desc: "XSS في نسخة 2025 جوه A05 Injection، زي SQL Injection بالظبط: مدخل المستخدم بيتفسّر ككود. لو عرضت كلام المستخدم في الصفحة كـ HTML، ممكن يحط فيه سكربت يشتغل عند أي زائر. React بيهرب النصوص لوحده، فأنت آمن طول ما مش بتستخدم [[dangerouslySetInnerHTML]]. لو محتاج تعرض HTML من المستخدم (محرر نصوص مثلًا)، نضّفه بـ [[DOMPurify]]. وكوكي الـ session HttpOnly عشان لو حصل XSS التوكن ميتسرقش.",
          example: R`// خطر: HTML من المستخدم زي ما هو
element.innerHTML = comment.text;
<div dangerouslySetInnerHTML={{ __html: comment.text }} />

// أمان: نص عادي
element.textContent = comment.text;
<div>{comment.text}</div>   // React يهرب ده لوحده

// لو لازم HTML: نضّفه
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />`,
          try: "دوّر في مشروع React بتاعك على [[dangerouslySetInnerHTML]]، وشوف مصدر الـ HTML موثوق ولا لأ.",
          flag: "script",
          deep: {
            why: "لو بتعرض محتوى كتبه يوزر في صفحة HTML من غير تنضيف، المهاجم يحط script بيشتغل عند أي حد يفتح الصفحة.",
            how: R`[[element.innerHTML = comment.text]]: لو comment.text فيه [[<img src=x onerror=alert(1)>]] الكود هيشتغل. (وسم script نفسه مش بيشتغل مع innerHTML، بس الـ event handlers زي onerror بتشتغل).

[[element.textContent]] بيحطه كنص حرفي مش HTML. المتصفح مش هيفسّره.

React آمن افتراضيًا. الخطر الوحيد [[dangerouslySetInnerHTML]].

لو محتاج تعرض HTML حقيقي من اليوزر: استخدم DOMPurify لتنضيفه.`,
            when: "في كل مكان بتعرض فيه محتوى كتبه يوزر.",
            mistakes: "الاعتماد على regex أو blacklist. سهل تتجاوزها."
          },
          teach: R`## الفكرة: نص المستخدم يتعرض كنص، مش ككود

XSS زي SQL Injection بالظبط، بس المكان الصفحة بدل قاعدة البيانات: لو حطيت كلام المستخدم في الـ HTML زي ما هو، المتصفح هيفسّر أي وسم جواه، وممكن يشتغل سكربت عند أي حد يفتح الصفحة. المثال بيوريك الغلط والصح في JavaScript عادي وفي React. جرّبنا الرندر على معمل Express على [[localhost:3101]] فيه [[/bad/comments]] (بيطبع الكومنت خام) و [[/comments]] (بيهرب الحروف).

---

## ١. السطر الغلط

~~~javascript
element.innerHTML = comment.text;
~~~

- [[element]] عنصر في الصفحة، و [[.innerHTML]] محتواه كـ **HTML**: أي وسم في النص بيتحوّل لعنصر حقيقي.
- لو [[comment.text]] = [[<img src=x onerror="alert(document.cookie)">]]، المتصفح بيعمل صورة مصدرها [[x]] (مش موجود)، فبيقع في الخطأ ويشغّل [[onerror]]. ساعتها السكربت بيقرا [[document.cookie]] (الكوكيز بتاعة الزائر) ويبعتها للمهاجم.

> وسم [[<script>]] نفسه مش بيشتغل مع [[innerHTML]]، بس الـ event handlers زي [[onerror]] و [[onload]] بتشتغل، فالثغرة موجودة.

نفس الغلط في React اسمه بيحذّرك:

~~~jsx
<div dangerouslySetInnerHTML={{ __html: comment.text }} />
~~~

[[dangerouslySetInnerHTML]] بياخد object فيه مفتاح [[__html]]، وبيحط قيمته كـ HTML خام، فبيلغي حماية React.

---

## ٢. السطر الصح

~~~javascript
element.textContent = comment.text;
~~~

[[.textContent]] بيحط النص كـ **نص حرفي**: أي [[<]] بتتحوّل لرمز بيتعرض كـ «أصغر من» مش بداية وسم. المتصفح بيعرض الكلام زي ما هو وخلاص.

في React أي نص جوه [[{ }]] بيتهرب لوحده:

~~~jsx
<div>{comment.text}</div>
~~~

### شفنا الفرق بالكود

شغّلنا [[innerHTML]] و [[textContent]] و React على نفس المدخل في Node (بـ jsdom و react-dom، في Docker). المدخل: [[<img src=x onerror="alert(document.cookie)">]]:

~~~text الناتج
innerHTML   -> <img src="x" onerror="alert(document.cookie)">   | children: 1 IMG  onerror: alert(document.cookie)
textContent -> &lt;img src=x onerror="alert(document.cookie)"&gt; | children: 0 #text
React {text} -> <div>&lt;img src=x onerror=&quot;alert(document.cookie)&quot;&gt;</div>
React dangerously -> <div><img src=x onerror="alert(document.cookie)"></div>
~~~

- [[innerHTML]]: اتعمل عنصر [[IMG]] حقيقي (children: 1)، والـ [[onerror]] اتسجّل: دي الثغرة.
- [[textContent]]: صفر children، مجرد نص. [[<]] بقت [[&lt;]].
- React [[{text}]]: نفس الهروب. [[&lt;]] و [[&quot;]] يعني [[<]] و [["]] اتحوّلوا لرموز بتتعرض كنص.
- React [[dangerouslySetInnerHTML]]: رجّع الـ [[<img>]] حي تاني: الثغرة بقت موجودة.

### وعلى السيرفر كمان

خزّنّا كومنت فيه نفس الـ [[<img ...>]] وطلبنا الصفحتين:

~~~text /bad/comments
<p><img src=x onerror="alert(document.cookie)"></p>
~~~

~~~text /comments
<p>&lt;img src=x onerror=&quot;alert(document.cookie)&quot;&gt;</p>
~~~

الدالة اللي بتهرب في الكود بتبدّل [[&]] و [[<]] و [[>]] و [["]] و [[']] برموزها. أهم حاجة إن الهروب يحصل **وقت العرض** (output encoding)، مش وقت التخزين.

---

## ٣. لو لازم HTML من المستخدم

محرر نصوص (bold و لينكات) بيطلّع HTML حقيقي عايزينه يشتغل. ساعتها ننضّفه بـ DOMPurify:

~~~jsx
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
~~~

[[DOMPurify.sanitize]] بيسيب الوسوم الآمنة ويشيل اللي بتشغّل كود. جرّبناه (في Node):

| المدخل | الناتج بعد sanitize |
|---|---|
| [[<img src=x onerror="...">]] | [[<img src="x">]] (شال [[onerror]]) |
| [[<b>bold</b> <a href="javascript:alert(1)">click</a>]] | [[<b>bold</b> <a>click</a>]] (شال اللينك الخبيث) |
| [[<script>alert(1)</script><p onclick="steal()">hi</p>]] | [[<p>hi</p>]] (شال الـ script والـ onclick) |

الوسوم الآمنة فضلت، والخطر اتشال.

---

## ٤. مكان بيتنسي: اللينكات

حتى لو بتعرض النص صح، [[<a href={user.website}>]] خطر لو اليوزر حط [[javascript:alert(1)]]. React الحديثة بتمنع ده فعلًا (جرّبناها: بتبدّل الـ href بتحذير)، بس الأأمن إنك تتأكد إن اللينك بيبدأ بـ [[https://]] بنفسك.

---

## الخلاصة

- اعرض كلام المستخدم كنص ([[textContent]] أو [[{value}]] في React)، مش [[innerHTML]].
- [[dangerouslySetInnerHTML]] بيلغي حماية React: استخدمه بس بعد [[DOMPurify.sanitize]].
- الـ HTML ممكن يوصل من API مش من الفورم، فالهروب وقت العرض هو الضمان.`,
          lines: [
            "الغلط: حط نص اليوزر كـ HTML. لو فيه وسم زي img بـ onerror، الكود اللي فيه هيشتغل.",
            "نفس الغلط في React (الاسم نفسه بيحذّرك).",
            "الصح: حطه كنص. أي وسوم بتظهر ككلام عادي.",
            "الصح في React: الـ JSX بيهرب النص لوحده.",
            "لو لازم تعرض HTML من اليوزر: استورد DOMPurify.",
            "نضّفه الأول، وبعدين اعرضه."
          ],
          sol: R`[[grep -rn "dangerouslySetInnerHTML" src/]]: لو مطلعش حاجة، React بيعمل escape لكل نص بتعرضه بـ [[{value}]]، وانت في أمان من ناحية دي. لو طلع، شوف الـ HTML ده جاي منين: لو من ملف انت كاتبه أو من محتوى ثابت، مفيش مشكلة. لو من المستخدم أو من API خارجي (كومنت، وصف منتج، رد AI)، لازم يعدّي على [[DOMPurify.sanitize()]] قبل ما يتعرض.

الغلطة الشائعة إنك تفكر إن الـ validation على الفورم كفاية: الـ HTML ممكن يوصل قاعدة البيانات من API مباشرة. وفيه مكان تاني بيتنسي: [[href={user.website}]]، لأن React مش بيمنع [[javascript:]] في اللينكات بشكل كامل، فاتأكد إن اللينك بيبدأ بـ [[https://]].`
        },
        {
          cmd: "Command Injection",
          title: "A05 Injection: لما مدخل المستخدم يوصل للـ shell",
          desc: R`نفس فكرة SQL Injection، بس المرة دي اللي بيتنفّذ أوامر على السيرفر نفسه. لو بتشغّل برنامج خارجي (ffmpeg، ImageMagick، git، ping) وبتبني الأمر كـ string فيه حاجة جاية من المستخدم، [[exec]] بيدّي الـ string كله لـ [[/bin/sh]]. ساعتها [[;]] و [[|]] و [[&&]] و [[$(...)]] بيشتغلوا، واليوزر يقدر يشغّل أي أمر بصلاحيات الـ process بتاعك: يقرا [[.env]]، أو ينزّل backdoor.

الحل: [[execFile]] أو [[spawn]] باسم البرنامج لوحده، والـ arguments في array، ومن غير shell. كل عنصر في الـ array بيوصل للبرنامج كـ argument واحد حرفيًا مهما كان فيه، لأن مفيش shell يفسّر الرموز. وفي Python نفس الكلام: [[subprocess.run(["prog", arg])]] بـ list و [[shell=False]] (ودا الافتراضي)، مش string مع [[shell=True]].

والأحسن من الاتنين: لو فيه مكتبة بتعمل نفس الشغل جوه اللغة ([[sharp]] بدل ImageMagick، و [[fs.rm]] بدل [[rm -rf]])، استخدمها ومتشغّلش برنامج خارجي أصلًا.`,
          example: R`import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const execP = promisify(exec);
const execFileP = promisify(execFile);
const host = process.argv[2] ?? "example.com";

// خطر: الـ string كله بيروح لـ /bin/sh
const bad = await execP("echo pinging " + host);
console.log("exec:", bad.stdout.trim());

// أمان: البرنامج لوحده والـ args في array، ومفيش shell
const good = await execFileP("echo", ["pinging", host]);
console.log("execFile:", good.stdout.trim());`,
          try: R`احفظ المثال في [[cmd.mjs]] (هو بيستخدم [[echo]] بدل [[ping]] عشان التجربة تبقى آمنة وسريعة). شغّله بـ [[node cmd.mjs 'x; echo HACKED; id -un']] وبعدين [[node cmd.mjs '$(whoami)']]، وقارن سطر [[exec]] بسطر [[execFile]]. بعدين اكتب نفس التجربة في Python بـ [[subprocess.run]] مرة بـ [[shell=True]] ومرة بـ list.`,
          flag: "script",
          deep: {
            why: R`أي feature بتلف على أداة command line (تحويل فيديو، ضغط صور، عمل PDF، ping لسيرفر، git clone لريبو اليوزر) ممكن تتحول لـ Remote Code Execution، وده أخطر حاجة ممكن تحصل: المهاجم بيبقى جوه السيرفر بصلاحياتك. وفي نسخة 2025 دي جزء من A05 Injection زي SQL و XSS بالظبط: مدخل المستخدم بيتفسّر ككود.`,
            how: R`[[exec(cmd)]] بيشغّل [[/bin/sh -c cmd]] (أو [[cmd.exe]] على Windows). الـ shell هو اللي بيفهم [[;]] كـ «أمر جديد» و [[$(...)]] كـ «شغّل ده وحط الناتج هنا». فلو [[host]] فيه [[x; echo HACKED]]، الـ shell بيشوف أمرين.

[[execFile(file, args)]] و [[spawn(file, args)]] بيعملوا [[execve]] مباشرة: البرنامج بياخد الـ array زي ما هو، كل عنصر argument. مفيش حد يفسّر [[;]]، فهي مجرد حرف في النص.

بس خلي بالك: [[spawn(cmd, { shell: true })]] و [[execFile]] مع [[shell: true]] بيرجّعوا الـ shell تاني، يعني نفس خطر [[exec]].

وفي Python: [[subprocess.run("echo " + x, shell=True)]] خطر، و [[subprocess.run(["echo", x])]] آمن. و [[os.system]] دايمًا بيستخدم shell، فمتستخدمهوش مع مدخل مستخدم.`,
            when: R`في أي مكان فيه [[child_process]] أو [[subprocess]] أو [[os.system]] أو backticks في Ruby/PHP ([[shell_exec]] و [[system]]). دوّر عليهم بـ grep في كودك، ولكل واحد اسأل: فيه حاجة هنا جاية من المستخدم؟ حتى اسم ملف رفعه اليوزر يعتبر مدخل مستخدم.`,
            mistakes: R`تحاول تهرّب المدخل بنفسك بإنك تحطه بين علامات تنصيص: [[exec('convert "' + name + '"')]]، واسم الملف فيه [["]] أو [[$(...)]] فيعدّي. استخدم args array وخلاص.

Argument injection: حتى مع [[execFile]]، لو المدخل بيبدأ بـ [[-]] البرنامج هيفهمه option مش قيمة. مثلًا [[execFile("git", ["log", userInput])]] واليوزر بعت [[--output=/some/path]]، و git هيكتب ملف في المكان ده (جرّبناها وحصلت). الحل: حط [[--]] قبل مدخلات اليوزر ([[execFile("git", ["log", "--", userInput])]]) عشان البرنامج يعرف إن اللي بعدها قيم مش options، واعمل validation (مثلًا hostname بـ regex أو [[new URL]]).

في الانترفيو: «ليه execFile أأمن من exec؟» الإجابة اللي بيدوروا عليها: مش عشان بتفلتر حاجة، عشان مفيش shell خالص بيفسّر المدخل، وكل عنصر في الـ array argument واحد. وضيف حكاية الـ [[--]] كـ bonus.`
          },
          teach: R`## الفكرة: مين اللي بيقرا الأمر، البرنامج ولا الـ shell؟

لما تشغّل برنامج خارجي، فيه طريقتين: تدّي الأمر كـ string لـ [[/bin/sh]] (الـ shell) اللي بيفسّر الرموز، أو تدّي اسم البرنامج والـ arguments منفصلين من غير shell خالص. المثال بيشغّل [[echo]] (بدل [[ping]] عشان التجربة آمنة وسريعة) بالطريقتين، وبيوريك إن الرموز بتشتغل في الأولى بس.

---

## ١. أول سطور المثال

~~~javascript
import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const execP = promisify(exec);
const execFileP = promisify(execFile);
const host = process.argv[2] ?? "example.com";
~~~

- [[exec]] و [[execFile]] من [[node:child_process]]: الاتنين بيشغّلوا برامج، بس بطريقتين مختلفين (الفرق تحت).
- [[promisify]] بيحوّل دالة بـ callback لدالة بترجّع Promise عشان نستخدم [[await]].
- [[process.argv[2]]] أول argument بعد اسم السكربت (argv 0 = node، argv 1 = الملف). ده بيمثّل حاجة جاية من المستخدم.
- [[?? "example.com"]] لو مفيش argument، استخدم القيمة دي. [[??]] معناها «لو اللي قبلي null أو undefined».

---

## ٢. السطر الخطر vs الآمن

~~~javascript
const bad  = await execP("echo pinging " + host);
const good = await execFileP("echo", ["pinging", host]);
~~~

| | [[exec]] | [[execFile]] |
|---|---|---|
| بياخد | string واحد | اسم برنامج + array arguments |
| بيشغّل | [[/bin/sh -c "النص كله"]] | البرنامج مباشرة ([[execve]]) |
| مين بيفسّر [[;]] و [[$(...)]] | الـ shell | محدش، حروف عادية |

[[execFile("echo", ["pinging", host])]]: كل عنصر في الـ array بيوصل لـ [[echo]] كـ argument واحد حرفي، مهما كان فيه.

---

## ٣. جرّبناها (في Docker، node:22)

### مدخل فيه أوامر زيادة

~~~bash
node cmd.mjs 'x; echo HACKED; id -un'
~~~

~~~text الناتج
exec: pinging x
HACKED
root
execFile: pinging x; echo HACKED; id -un
~~~

- [[exec]]: الـ shell شاف [[;]] فنفّذ **3 أوامر**: [[echo pinging x]]، وبعده [[echo HACKED]] (طبع HACKED)، وبعده [[id -un]] (طبع اسم اليوزر، هنا [[root]]). ده execution كامل لأوامر المهاجم.
- [[execFile]]: سطر واحد، والمدخل كله ظهر كنص بعد [[pinging]]. محدش فسّر [[;]].

### مدخل بـ [[$(...)]]

~~~bash
node cmd.mjs '$(whoami)'
~~~

~~~text الناتج
exec: pinging root
execFile: pinging $(whoami)
~~~

[[$(...)]] معناها للـ shell «شغّل اللي جوه وحط ناتجه هنا». [[exec]] شغّل [[whoami]] وحط [[root]]. [[execFile]] طبع النص زي ما هو.

> لازم تحط المدخل بين علامات تنصيص مفردة [['...']]، وإلا الـ shell بتاعك انت هو اللي هيفسّر [[;]] قبل ما node يشوفه، والتجربة مش هتبيّن الفرق.

### نفس الكلام عبر HTTP

ضفنا للمعمل route بيعمل [[exec("echo pinging " + host)]] و route تاني بـ [[execFile]]. بمدخل [[x; id -un; cat /etc/hostname]]:

~~~text /bad/ping
pinging x
root
b61b92bb9ffc
~~~

~~~text /ping
pinging x; id -un; cat /etc/hostname
~~~

يعني أي feature بتلف على أداة (ping، تحويل فيديو، git) بتبقى Remote Code Execution لو اتبنت بـ [[exec]] + لزق.

---

## ٤. Python

نفس القاعدة: [[shell=True]] خطر، list آمن.

~~~python
bad  = subprocess.run("echo pinging " + host, shell=True, capture_output=True, text=True)
good = subprocess.run(["echo", "pinging", host], capture_output=True, text=True)
~~~

جرّبناه (python:3.12) بمدخل [[x; echo HACKED]]:

~~~text الناتج
shell=True: pinging x
HACKED
list: pinging x; echo HACKED
~~~

[[os.system]] دايمًا shell، فمتستخدمهوش مع مدخل مستخدم.

---

## ٥. فخّ لطيف: argument injection

حتى مع [[execFile]]، لو المدخل بيبدأ بـ [[-]] البرنامج هيفهمه option. [[execFile("git", ["log", userInput])]] واليوزر بعت [[--output=/path]]، git هيكتب ملف هناك. الحل: حط [[--]] قبل مدخلات اليوزر ([[execFile("git", ["log", "--", userInput])]]) عشان البرنامج يعرف إن اللي بعدها قيم مش options.

---

## الخلاصة

- [[execFile]]/[[spawn]] باسم البرنامج و array arguments، من غير shell. مش بيفلتر حاجة، بس مفيش shell يفسّر الرموز.
- [[exec]] و [[shell: true]] و [[os.system]] بيرجّعوا الـ shell، فخطر مع أي مدخل مستخدم.
- الأحسن لو فيه مكتبة بتعمل الشغل جوه اللغة ([[sharp]] بدل ImageMagick، [[fs.rm]] بدل [[rm -rf]])، استخدمها.`,
          lines: [
            R`[[exec]] (بيستخدم shell) و [[execFile]] (من غير shell).`,
            R`[[promisify]] عشان نستخدمهم بـ [[await]].`,
            R`نسخة [[exec]] بترجّع Promise فيها [[stdout]] و [[stderr]].`,
            R`نفس الكلام لـ [[execFile]].`,
            R`المدخل: أول argument للسكربت، وده بيمثّل حاجة جاية من المستخدم.`,
            R`الغلط: بيلزق المدخل في string، و [[/bin/sh]] بيفسّر أي [[;]] أو [[$(...)]] فيه.`,
            R`اطبع الناتج: هتلاقي أوامر زيادة اتنفّذت.`,
            R`الصح: اسم البرنامج لوحده، والمدخل عنصر في array. بيوصل لـ echo كـ argument واحد حرفيًا.`,
            R`اطبع الناتج: المدخل ظاهر زي ما هو، ومحصلش حاجة تانية.`
          ],
          sol: R`مع [[node cmd.mjs 'x; echo HACKED; id -un']] هتشوف:

[[exec: pinging x]] وبعده سطر [[HACKED]] وبعده اسم اليوزر اللي شغّال بيه (زي [[root]] أو اسمك). يعني الـ shell نفّذ 3 أوامر. وسطر [[execFile: pinging x; echo HACKED; id -un]] سطر واحد، والمدخل مطبوع كنص.

ومع [[node cmd.mjs '$(whoami)']]: سطر exec هيبقى [[exec: pinging root]] (الـ shell شغّل whoami وحط الناتج)، و execFile هيطبع [[$(whoami)]] حرفيًا.

لو شغّلت الأمر من غير علامات تنصيص مفردة، الـ shell بتاعك انت هو اللي هيفسّر [[;]] قبل ما node يشوف حاجة، والتجربة مش هتبيّن الفرق. لازم [['...']] حوالين المدخل.

في Python نفس النتيجة بالظبط: [[shell=True]] بيطبع [[HACKED]] في سطر لوحده، والـ list بتطبع المدخل كنص.`,
          solCode: R`# cmd.py  ->  python3 cmd.py 'x; echo HACKED'
import subprocess, sys

host = sys.argv[1]

bad = subprocess.run("echo pinging " + host, shell=True, capture_output=True, text=True)
print("shell=True:", bad.stdout.strip())

good = subprocess.run(["echo", "pinging", host], capture_output=True, text=True, check=True)
print("list:", good.stdout.strip())`
        },
        {
          cmd: "Path Traversal",
          title: "A01 لما اسم الملف يطلّعك بره الفولدر",
          desc: R`عندك route بيقرا ملف باسم جاي من المستخدم ([[/files/:name]] أو [[?file=]]). المهاجم يبعت [[../../.env]] فيطلع من فولدر الـ uploads ويقرا أسرارك، أو [[../../../etc/passwd]]. و Express بيفك الـ encoding في الـ params، فـ [[..%2F.env]] بتوصل للكود بتاعك [[../.env]] حتى لو المتصفح أو curl بينضّفوا [[../]] العادية.

[[path.join]] مش حماية: هو بيرتّب المسار بس، و [[path.join("uploads", "../.env")]] بيرجّع [[.env]] بكل أدب. الحماية: [[path.resolve(BASE, name)]] يديك المسار الكامل النهائي، وبعدين اتأكد إنه بيبدأ بـ [[BASE + path.sep]]. لو مش كده ارفض.

والأحسن من الفحص: متستخدمش اسم المستخدم في المسار أصلًا. خزّن الملف باسم [[randomUUID()]] واحفظ الاسم الأصلي في الداتابيز، زي ما في درس [[multer]] في «تاب Backend بـ Node». ودي في OWASP 2025 تحت A01 Broken Access Control، زي SSRF (شوف درس «7. SSRF (بقت جزء من رقم 1)» فوق، مش هنكررها هنا).`,
          example: R`import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
const app = express();
const BASE = path.resolve("uploads");

// غلط: ..%2F.env بتتفك لـ ../.env وتطلع بره الفولدر
app.get("/bad/:name", async (req, res) => {
  res.send(await fs.readFile(path.join(BASE, req.params.name), "utf8"));
});

// صح: حل المسار الكامل، واتأكد إنه لسه جوه الفولدر
app.get("/files/:name", (req, res) => {
  const full = path.resolve(BASE, req.params.name);
  if (!full.startsWith(BASE + path.sep)) return res.status(400).end();
  res.sendFile(full);
});

app.listen(3000);`,
          try: R`في فولدر فاضي: [[npm i express]]، واعمل [[uploads/a.txt]] فيه أي كلام، و [[.env]] جنب فولدر uploads فيه [[SECRET=1]]. احفظ المثال في [[server.mjs]] وشغّله. جرّب: [[curl localhost:3000/bad/..%2F.env]]، و [[curl localhost:3000/files/..%2F.env]]، و [[curl localhost:3000/files/a.txt]]، و [[curl --path-as-is localhost:3000/bad/../.env]]. وبعدين غيّر الشرط لـ [[full.startsWith(BASE)]] من غير [[path.sep]] وفكّر إيه اللي ممكن يعدّي.`,
          flag: "script",
          deep: {
            why: R`أي ميزة تحميل أو عرض ملفات، أو تصدير تقارير، أو قوالب بالاسم، ممكن تبقى باب لقراية أي ملف على السيرفر: [[.env]] فيه مفتاح الداتابيز و JWT secret، والكود نفسه، ومفاتيح SSH. ولو الـ route بيكتب (رفع بالاسم الأصلي)، المهاجم يقدر يكتب على ملفات الكود نفسها.`,
            how: R`[[path.resolve(BASE, name)]] بيبني المسار الكامل ويحل كل [[..]] و [[.]]، ولو [[name]] مسار مطلق زي [[/etc/passwd]] بيتجاهل BASE خالص. فبعده المسار اللي في إيدك هو اللي هيتقري فعلًا، وتقدر تسأل عليه سؤال واحد بسيط: بيبدأ بفولدري ولا لأ؟

ليه [[BASE + path.sep]] مش [[BASE]] بس؟ لأن [[/app/uploads-old/secret]] بيبدأ بـ [[/app/uploads]] برضه. الـ separator بيقفل الثغرة دي.

[[res.sendFile(name, { root: BASE })]] في Express بيعمل الفحص ده لوحده وبيرد 403 لو فيه [[..]] بيطلع بره، وكمان بيرفض الـ dotfiles افتراضيًا. بس [[fs.readFile]] و [[fs.createReadStream]] ملهمش أي حماية.

لو جوه الفولدر فيه symlinks ممكن يعملها حد، استخدم [[await fs.realpath(full)]] قبل الفحص، عشان الـ symlink ممكن يشاور بره.`,
            when: R`أي مكان فيه [[fs.*]] أو [[sendFile]] أو [[open()]] في Python أو [[include]] و [[readfile]] في PHP والمسار فيه حاجة من الطلب: params، و query، واسم ملف مرفوع، وحتى حاجة متخزنة في الداتابيز لو اليوزر هو اللي كتبها. ونفس الفكرة في PHP موجودة في درس [[readfile]] في «تاب PHP و MySQL».`,
            mistakes: R`تمسح [[../]] بـ replace: [[name.replace("../", "")]] بيمسح أول واحدة بس، و [[....//]] بتبقى [[../]] بعد المسح. أي blacklist كده بيتكسر.

تفحص قبل الـ decode: لو بتفحص الـ URL الخام [[..%2F]] مش هتلاقي [[../]]، والكود بعدين بيفك الـ encoding. افحص المسار النهائي اللي هيتفتح فعلًا.

تنسى Windows: هناك [[..\]] بتشتغل كمان. [[path.resolve]] بيتعامل معاها صح، الـ regex بتاعك غالبًا لأ.

في الانترفيو لو اتسألت «إزاي تمنع path traversal؟»: متقولش «بفلتر النقط». قول: resolve للمسار النهائي، وتأكد إنه جوه الـ base بـ separator، والأحسن إن اليوزر ميتحكمش في المسار أصلًا (IDs بدل أسماء).`
          },
          teach: R`## الفكرة: الاسم اللي من المستخدم ممكن يطلّعك بره الفولدر

عندك route بيقرا ملف باسم جاي من المستخدم. المفروض يقرا من فولدر [[uploads]] بس، لكن لو المستخدم بعت [[../.env]] يطلع لفوق ويقرا أسرارك. المثال سيرفر صغير فيه route غلط [[/bad/:name]] و route صح [[/files/:name]]. جرّبناه في Docker على [[localhost:3102]]، وجنب فولدر [[uploads]] حطينا [[.env]] فيه [[SECRET=1]].

---

## ١. أول السطور

~~~javascript
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
const app = express();
const BASE = path.resolve("uploads");
~~~

- [[path]] للتعامل مع المسارات، [[fs/promises]] لقراية الملفات بـ await.
- [[path.resolve("uploads")]] بيطلّع المسار الكامل لفولدر uploads مرة واحدة وقت التشغيل (مثلًا [[/app/uploads]]). ده الـ base المسموح.

---

## ٢. السطر الغلط

~~~javascript
app.get("/bad/:name", async (req, res) => {
  res.send(await fs.readFile(path.join(BASE, req.params.name), "utf8"));
});
~~~

- [[:name]] جزء من المسار بيكتبه المستخدم.
- [[path.join(BASE, name)]] بيوصّل الفولدر بالاسم. **المشكلة**: [[path.join]] بيرتّب المسار بس، فـ [[path.join("/app/uploads", "../.env")]] بيطلّع [[/app/.env]] بكل أدب، بره الفولدر.

Express بيفك الـ URL encoding في الـ params، فـ [[..%2F.env]] بتوصل للكود [[../.env]].

---

## ٣. السطر الصح

~~~javascript
app.get("/files/:name", (req, res) => {
  const full = path.resolve(BASE, req.params.name);
  if (!full.startsWith(BASE + path.sep)) return res.status(400).end();
  res.sendFile(full);
});
~~~

- [[path.resolve(BASE, name)]] بيبني المسار النهائي ويحل كل [[..]]. لو [[name]] مطلق زي [[/etc/passwd]] بيتجاهل BASE خالص.
- [[full.startsWith(BASE + path.sep)]]: السؤال الوحيد، المسار النهائي لسه جوه فولدري؟ [[path.sep]] هو [[/]] (أو [[\]] على ويندوز).
- ليه [[+ path.sep]] مش [[BASE]] لوحده؟ لأن [[/app/uploads-old/x]] بيبدأ بـ [[/app/uploads]] برضه، فمن غير الـ separator فولدر تاني اسمه قريب هيعدّي.

---

## ٤. جرّبناها على السيرفر

~~~text الطلبات والردود
/bad/a.txt                       -> hello from a.txt       [200]
/bad/..%2F.env                   -> SECRET=1               [200]   ← تسريب!
/bad/..%2F..%2F..%2Fetc%2Fhostname -> c31a1be0ce6f          [200]   ← طلع لـ /etc
/files/a.txt                     -> hello from a.txt       [200]
/files/..%2F.env                 -> (فاضي)                 [400]
/files/..%2F..%2Fetc%2Fpasswd    -> (فاضي)                 [400]
/weak/..%2Fuploads-old%2Fx       -> old secret             [200]   ← الشرط من غير path.sep
/files/..%2Fuploads-old%2Fx      -> (فاضي)                 [400]
~~~

[[/bad]] قرا [[.env]] وحتى [[/etc/hostname]] بتاع الـ container. [[/files]] رد [[400]] على كل محاولة خروج. و [[/weak]] (نفس الكود بس شرطه [[startsWith(BASE)]] من غير separator) سمح بـ [[uploads-old]]: ده اللي الـ separator بيقفله.

### فخّ في الاختبار نفسه

~~~bash
curl --path-as-is http://localhost:3102/bad/../.env   # 404
~~~

curl وبعض المتصفحات بيحلّوا [[../]] العادية قبل ما يبعتوا، فبيطلبوا [[/.env]] (و [[--path-as-is]] بيوقّف ده، فالـ router بيشوف [[..]] segments ومبيطابقش). عشان كده المهاجم بيستخدم [[%2F]]، واللي بيختبر بـ [[../]] عادية بيفتكر نفسه آمن وهو مش آمن.

---

## ٥. كود الحل: نفس الفكرة من غير سيرفر

~~~javascript
function safePath(name) {
  const full = path.resolve(BASE, name);
  if (!full.startsWith(BASE + path.sep)) throw new Error("bad path");
  return full;
}
~~~

جرّبناه على أسماء مختلفة:

~~~text الناتج
a.txt              join -> uploads/a.txt       | safe -> /app/uploads/a.txt
../.env            join -> .env                | safe -> bad path
/etc/passwd        join -> uploads/etc/passwd  | safe -> bad path
sub/../a.txt       join -> uploads/a.txt       | safe -> /app/uploads/a.txt
../uploads-old/x   join -> uploads-old/x       | safe -> bad path
~~~

عمود [[join]] بيوريك ليه [[path.join]] مش حماية (طلّع [[.env]] و [[uploads-old]])، وعمود [[safe]] بيرفضهم. لاحظ [[sub/../a.txt]] اتقبل لأنه في الآخر جوه uploads فعلًا.

---

## الخلاصة

- [[path.join]] و مسح [[../]] بـ replace مش حماية، بيتكسروا.
- [[path.resolve]] للمسار النهائي، وبعدين [[startsWith(BASE + path.sep)]].
- افحص المسار بعد الـ decode، مش الـ URL الخام. والأأمن إن المستخدم ميتحكمش في الاسم أصلًا: خزّن بـ [[randomUUID()]] واحفظ الاسم الأصلي في الداتابيز.`,
          lines: [
            "استورد Express.",
            "و path عشان نبني المسارات.",
            R`و [[fs/promises]] عشان نقرا الملفات بـ await.`,
            "السيرفر.",
            R`المسار الكامل لفولدر الملفات المسموح، مرة واحدة وقت التشغيل.`,
            R`الغلط: route بياخد اسم الملف من الـ URL...`,
            R`...ويلزقه بـ [[path.join]] ويقراه. [[../.env]] هتطلع بره uploads وتقرا الأسرار.`,
            "قفلة.",
            "الصح: نفس الفكرة...",
            R`...بس [[path.resolve]] بيدّينا المسار النهائي بعد حل أي [[..]].`,
            R`لو مش بيبدأ بـ [[uploads/]] بالظبط (بالـ separator)، ارفض بـ 400.`,
            R`دلوقتي بس ابعت الملف.`,
            "قفلة.",
            R`شغّل السيرفر على 3000.`
          ],
          sol: R`[[/bad/..%2F.env]] بيرجّع [[SECRET=1]]: Express فك [[%2F]] لـ [[/]]، و [[path.join]] حل [[..]] وطلع بره uploads.

[[/files/..%2F.env]] بيرجّع 400 وجسم فاضي، و [[/files/a.txt]] بيرجّع محتوى الملف عادي.

[[--path-as-is /bad/../.env]] بيرجّع 404: الـ router شايف [[..]] و [[.env]] كـ segments منفصلة، فالـ route مش بيطابق أصلًا. ومن غير [[--path-as-is]]، curl نفسه بيحل [[../]] قبل ما يبعت فبيطلب [[/.env]]. عشان كده المهاجمين بيستخدموا [[%2F]]، واللي بيختبر بـ [[../]] عادية بس بيفتكر إنه آمن وهو مش آمن.

لو شلت [[path.sep]] من الشرط: [[..%2Fuploads-old%2Fx]] هيعدّي الفحص، لأن [[/.../uploads-old/x]] بيبدأ بـ [[/.../uploads]]. السكربت ده بيوريك كل الحالات من غير سيرفر.`,
          solCode: R`import path from "node:path";

const BASE = path.resolve("uploads");

function safePath(name) {
  const full = path.resolve(BASE, name);
  if (!full.startsWith(BASE + path.sep)) throw new Error("bad path");
  return full;
}

for (const name of ["a.txt", "../.env", "/etc/passwd", "sub/../a.txt", "../uploads-old/x"]) {
  let result;
  try { result = safePath(name); } catch (e) { result = e.message; }
  console.log(name.padEnd(18), "join ->", path.join("uploads", name).padEnd(20), "| safe ->", result);
}`
        },
        {
          cmd: "Zip Slip",
          title: "A01 ملف مضغوط بيكتب بره الفولدر",
          desc: R`Path traversal بس في الكتابة. أسماء الملفات جوه zip أو tar بيختارها اللي عمل الملف، وممكن تبقى [[../../app/server.js]] أو [[../../../root/.ssh/authorized_keys]]. لو بتفك ملف مرفوع وبتكتب كل entry في [[path.join(dest, entry.name)]]، الملف ده هيتكتب بره فولدر الفك، على كودك أو إعداداتك. ودي بتوصل لـ Remote Code Execution بسهولة.

العلاج نفس درس «Path Traversal»: لكل entry اعمل [[path.resolve(DEST, name)]] واتأكد إنه جوه [[DEST + path.sep]]. وافحص كل الأسماء الأول قبل ما تكتب ولا ملف، عشان متسيبش نص أرشيف مفكوك لو لقيت واحد وحش في النص.

المكتبات الحديثة بتحمي نفسها في دالة «فك كله»: [[adm-zip]] 0.6 في [[extractAllTo]] بيشيل الـ [[..]]، و [[zipfile.extractall]] في Python كمان. بس لو بتكتب الـ entries بإيدك (streaming بـ [[yauzl]] أو [[unzipper]] أو [[getEntries()]])، الحماية عليك انت. و [[tarfile]] في Python قبل 3.14 بيفك بره الفولدر افتراضيًا إلا لو قلتله [[filter="data"]].`,
          example: R`import AdmZip from "adm-zip";
import path from "node:path";
import fs from "node:fs";
const DEST = path.resolve("out");
const entries = new AdmZip("upload.zip").getEntries();

// افحص كل الأسماء الأول، قبل ما تكتب ولا ملف
for (const e of entries) {
  const target = path.resolve(DEST, e.entryName);
  if (!target.startsWith(DEST + path.sep)) throw new Error("zip slip: " + e.entryName);
}
for (const e of entries) {
  if (e.isDirectory) continue;
  const target = path.resolve(DEST, e.entryName);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, e.getData());
}`,
          try: R`في فولدر تجربة ([[npm i adm-zip]])، اعمل zip خبيث بـ Python: [[python3 -c "import zipfile; z=zipfile.ZipFile('upload.zip','w'); z.writestr('ok.txt','fine'); z.writestr('../../evil.txt','pwned'); z.close()"]] وشوفه بـ [[unzip -l upload.zip]]. شغّل نسخة غلط من المثال (من غير الـ loop الأولانية، وبـ [[path.join]]) وشوف [[evil.txt]] اتكتب فين. امسحه، وبعدين شغّل المثال زي ما هو. وآخر حاجة جرّب [[tarfile]] في Python بـ [[filter="data"]] ومن غيره.`,
          flag: "script",
          deep: {
            why: R`أي ميزة «ارفع zip» (استيراد مشروع، رفع ثيم، رفع صور بالجملة، ملف Excel اللي هو zip من جوه، أو حتى backup بترجّعه) بتدّي المستخدم إنه يختار مسارات كتابة على السيرفر. الثغرة دي لاقوها في مكتبات فك كتير في لغات مختلفة لما اتنشرت سنة 2018، وده سبب إن المكتبات المشهورة ضافت حماية.`,
            how: R`الـ zip بيخزّن اسم كل ملف كـ string، ومفيش حاجة في الـ format تمنع [[..]] أو مسار مطلق. الأداة اللي بتفك هي المسؤولة. [[unzip]] في لينكس بيشيل [[../]] وبيطبع تحذير، و adm-zip و zipfile برضه، بس ده سلوك أداة معينة مش ضمان.

في tar الموضوع أوسع: فيه symlinks و hardlinks. أرشيف ممكن يحط symlink اسمه [[out/link]] بيشاور على [[/etc]]، وبعدين ملف اسمه [[link/cron.d/x]]. عشان كده Python ضافت [[filter="data"]] (في 3.12، واتعمل backport لنسخ أقدم زي 3.11.4)، وبيرفض الـ symlinks اللي بتطلع بره والمسارات المطلقة والـ device files، وبقى الافتراضي في 3.14.

وحط حد لحجم الفك وعدد الملفات: zip صغير ممكن يتفك لجيجات (zip bomb).`,
            when: R`أي فك لأرشيف جاي من بره: رفع من المستخدم، أو تنزيل من URL، أو أرشيف من سيرفر تاني. حتى لو بتفكه في فولدر مؤقت، فولدر مؤقت بـ [[../../]] بيوصل لأي مكان.`,
            mistakes: R`تفحص وانت بتكتب بدل قبلها: أول entry سليمة بتتكتب، والتالتة وحشة بترمي error، والفولدر فيه نص أرشيف. افحص الكل الأول، أو فك في فولدر مؤقت وانقله بعد ما يخلص.

تعتمد على إن «المكتبة بتحمي»: الحماية في [[extractAllTo]] مش في الـ loop اللي كتبتها انت بـ [[getEntries]]. ونسخ adm-zip القديمة (من أيام 2018) كان فيها الثغرة دي نفسها، فحدّث.

تستخدم [[tarfile.extractall()]] من غير filter في Python أقدم من 3.14. وتشغّل عملية الفك بيوزر عنده صلاحية كتابة على الكود: الأحسن الـ process يبقى بيوزر مالوش صلاحية غير على فولدر الفك.`
          },
          teach: R`## الفكرة: اسم الملف جوه الأرشيف بيختاره اللي عمله

Zip Slip هو Path Traversal بس في **الكتابة**. أسماء الملفات جوه zip أو tar نص عادي بيحدده صاحب الملف، وممكن يبقى [[../../evil.txt]]. لو فكيت الأرشيف وكتبت كل ملف في [[path.join(dest, name)]]، الملف هيتكتب بره فولدر الفك، على كودك مثلًا. المثال بـ [[adm-zip]]. جرّبنا الفك في Docker (node:22 و python:3.12) جوه [[/srv/app/work]].

---

## ١. أول السطور

~~~javascript
import AdmZip from "adm-zip";
import path from "node:path";
import fs from "node:fs";
const DEST = path.resolve("out");
const entries = new AdmZip("upload.zip").getEntries();
~~~

- [[adm-zip]] مكتبة بتقرا الـ zip. [[getEntries()]] بترجّع لستة الملفات اللي جواه **من غير ما تكتب حاجة**.
- [[DEST]] المسار الكامل لفولدر الفك المسموح.

عملنا zip خبيث بـ Python فيه ملفين:

~~~text python3 -m zipfile -l upload.zip
ok.txt            4
../../evil.txt    5
~~~

الاسم [[../../evil.txt]] متخزّن كده فعلًا جوه الملف.

---

## ٢. اللفّة الأولى: افحص الكل قبل ما تكتب

~~~javascript
for (const e of entries) {
  const target = path.resolve(DEST, e.entryName);
  if (!target.startsWith(DEST + path.sep)) throw new Error("zip slip: " + e.entryName);
}
~~~

نفس فحص درس «Path Traversal»: [[path.resolve]] للمسار النهائي، وبعدين اتأكد إنه جوه [[DEST + path.sep]]. مهم يحصل **قبل** أي كتابة، عشان متسيبش نص أرشيف مفكوك لو لقيت entry وحشة في النص.

---

## ٣. اللفّة الثانية: الكتابة

~~~javascript
for (const e of entries) {
  if (e.isDirectory) continue;
  const target = path.resolve(DEST, e.entryName);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, e.getData());
}
~~~

- [[isDirectory]]: الفولدرات بتتعمل مع الملفات فاعديها.
- [[path.dirname(target)]] الفولدر اللي فوق الملف، و [[mkdirSync]] بـ [[recursive]] بيعمله.
- [[e.getData()]] محتوى الملف.

---

## ٤. جرّبنا الغلط والصح

النسخة الغلط (بـ [[path.join("out", name)]] ومن غير فحص):

~~~text الناتج
writing out/ok.txt
writing ../evil.txt
~~~

[[ok.txt]] اتكتب في [[out/]]، و [[evil.txt]] اتكتب في [[/srv/app/evil.txt]] (فوق فولدر العمل بمستويين)، بره المكان المقصود خالص. ده الـ zip slip.

النسخة الصح وقفت قبل أي كتابة:

~~~text الناتج
Error: zip slip: ../../evil.txt
~~~

حتى [[ok.txt]] متكتبش، لأن الفحص كله قبل الكتابة.

---

## ٥. المكتبات بتحمي في «فك الكل» بس

[[adm-zip]] في [[extractAllTo]] بيشيل الـ [[..]]. بس لو بتكتب الـ entries بإيدك بـ [[getEntries]] (زي المثال)، الحماية عليك انت.

### و tar في Python أوسع خطرًا

tar فيه symlinks كمان. عملنا tar خبيث فيه [[../evil-tar.txt]]:

~~~python
t.extractall("tar-out", filter="data")
~~~

~~~text مع filter="data"
blocked: '../evil-tar.txt' would be extracted to '/srv/app/work/evil-tar.txt', which is outside the destination
~~~

[[filter="data"]] (بقى الافتراضي في Python 3.14) بيرفض المسارات اللي بتطلع بره والـ symlinks والمطلقة. من غيره (جرّبناه على 3.12):

~~~text من غير filter
DeprecationWarning: Python 3.14 will, by default, filter extracted tar archives...
~~~

والملف [[evil-tar.txt]] اتكتب بره فعلًا. لاحظ إن tar بيفك اللي قبل الملف الوحش، فـ [[ok.txt]] بيتكتب قبل ما يتوقف، عكس كود JavaScript اللي بيفحص الكل الأول.

---

## الخلاصة

- اسم الملف جوه الأرشيف مدخل مستخدم: [[path.resolve]] لكل entry واتأكد إنه جوه [[DEST + path.sep]].
- افحص الكل قبل أول كتابة، أو فك في فولدر مؤقت وانقل بعد النجاح.
- الحماية في [[extractAllTo]]/[[extractall(filter="data")]]، مش في الـ loop اللي كتبتها انت. وحط حد لحجم الفك وعدد الملفات (zip bomb).`,
          lines: [
            R`[[adm-zip]]: مكتبة بتقرا الـ zip وتدّيك الـ entries.`,
            "path للمسارات.",
            R`و [[fs]] للكتابة.`,
            R`المسار الكامل لفولدر الفك.`,
            R`اقرا الأرشيف وهات لستة الملفات اللي جواه (من غير ما تكتب حاجة).`,
            R`أول لفّة: فحص بس.`,
            R`المسار النهائي اللي الـ entry دي هتتكتب فيه.`,
            R`لو طالع بره [[out/]]، وقّف كل حاجة قبل ما يتكتب ولا ملف.`,
            "قفلة.",
            R`تاني لفّة: الكتابة، وكل الأسماء اتفحصت خلاص.`,
            R`الفولدرات بتتعمل مع الملفات، فاعديها.`,
            "نفس المسار النهائي.",
            R`اعمل الفولدرات اللي فوق الملف.`,
            R`واكتب محتوى الملف.`,
            "قفلة."
          ],
          sol: R`[[unzip -l upload.zip]] بيوريك entry اسمها [[../../evil.txt]] جنب [[ok.txt]]، يعني الاسم متخزن كده فعلًا جوه الملف.

النسخة الغلط (بـ [[path.join("out", e.entryName)]] ومن غير فحص) بتكتب [[ok.txt]] في [[out/]] و [[evil.txt]] في الفولدر اللي فوق فولدر التجربة ([[out/../../]])، يعني بره المكان اللي قلت عليه خالص. ده بالظبط الـ zip slip.

المثال زي ما هو بيقف بـ [[Error: zip slip: ../../evil.txt]] ومبيكتبش ولا ملف، حتى [[ok.txt]] مش هتلاقيه، لأن الفحص كله قبل الكتابة.

في Python: [[extractall("tar-out", filter="data")]] بيرمي [[OutsideDestinationError]] (نوع من [[FilterError]]) وبيقولك الملف كان هيتكتب فين. ومن غير filter في Python 3.11، الملف بيتكتب بره فعلًا. وخلي بالك إن tarfile بيفك اللي قبل الملف الوحش، فـ [[ok.txt]] هتلاقيه في [[tar-out]].`,
          solCode: R`# zipdemo.py: يعمل zip و tar خبيثين، ويفك الـ tar بأمان
import io, tarfile, zipfile

with zipfile.ZipFile("upload.zip", "w") as z:
    z.writestr("ok.txt", "fine")
    z.writestr("../../evil.txt", "pwned")

with tarfile.open("evil.tar", "w") as t:
    for name, data in [("ok.txt", b"fine"), ("../evil-tar.txt", b"pwned")]:
        info = tarfile.TarInfo(name)
        info.size = len(data)
        t.addfile(info, io.BytesIO(data))

with tarfile.open("evil.tar") as t:
    try:
        t.extractall("tar-out", filter="data")
    except tarfile.FilterError as e:
        print("blocked:", e)`
        },
        {
          cmd: "CSRF",
          title: "A01: لما موقع تاني يبعت طلب باسمك",
          desc: "CSRF مش بند لوحده في نسخة 2025، هو جوه A01 Broken Access Control. لو اليوزر عامل login عندك وفتح موقع مهاجم، الموقع ده ممكن يعمل form بيبعت POST لموقعك، والمتصفح بيبعت الكوكي بتاعتك معاه لوحده. الحماية: كوكي الـ session بـ [[SameSite=Lax]] أو [[Strict]]، وأي حاجة بتغيّر داتا تبقى POST/PUT/DELETE مش GET، وتتأكد من [[Origin]] على الطلبات دي. لو الـ auth بـ Authorization header مش كوكي، CSRF مش بتأثر عليك.",
          example: R`// الكوكي: SameSite=Lax أقل حاجة
res.cookie("session", token, { httpOnly: true, secure: true, sameSite: "lax" });
// أي تغيير بـ POST، مش GET
app.post("/api/transfer", auth, checkOrigin, transferHandler);
function checkOrigin(req, res, next) {
  if (req.get("origin") !== "https://example.com") return res.status(403).end();
  next();
}`,
          try: "اعمل صفحة HTML على بورت تاني فيها form بيعمل POST لـ API بتاعك، وشوف الكوكي بتتبعت ولا لأ مع SameSite مختلفة.",
          flag: "script",
          deep: {
            why: "الطلب جاي من متصفح اليوزر الحقيقي وبكوكيه الحقيقية، فالسيرفر مش هيفرّق بينه وبين طلب اليوزر نفسه.",
            how: "المتصفح بيضيف الكوكيز لأي طلب رايح لدومينك، مهما كان مين اللي بدأه. [[SameSite=Lax]] (الافتراضي في Chrome) بيمنعها في POST الجاي من موقع تاني، و Strict بيمنعها حتى في اللينكات. التحقق من Origin طبقة تانية، و CSRF token طبقة تالتة للأنظمة القديمة.",
            when: "أي تطبيق بيعتمد على كوكي session.",
            mistakes: "عملية بتغيّر داتا على GET (زي /logout أو /delete?id=). و SameSite=None من غير سبب."
          },
          teach: R`## الفكرة: المتصفح بيبعت كوكيك لوحده

لو انت عامل login عند موقعك، المتصفح بيحفظ كوكي الـ session. لما تفتح موقع مهاجم، الموقع ده يقدر يعمل form بيبعت POST لموقعك، والمتصفح بيلزق كوكيك عليه **لوحده**، فالسيرفر يفتكر إنه انت. المثال: الكوكي بـ [[SameSite]]، والتحويل محمي بفحص [[Origin]]. جرّبناه على معمل [[localhost:3101]] + صفحة مهاجمة على بورت تاني، بمتصفح حقيقي (Chrome عبر Playwright).

---

## ١. السطور

~~~javascript
res.cookie("session", token, { httpOnly: true, secure: true, sameSite: "lax" });

app.post("/api/transfer", auth, checkOrigin, transferHandler);
function checkOrigin(req, res, next) {
  if (req.get("origin") !== "https://example.com") return res.status(403).end();
  next();
}
~~~

- [[httpOnly: true]]: JavaScript مش بيقدر يقرا الكوكي (بيحمي من XSS).
- [[secure: true]]: تتبعت على HTTPS بس.
- [[sameSite: "lax"]]: المتصفح **مش** بيبعت الكوكي مع POST جاي من موقع تاني. ده الدفاع الأساسي.
- [[app.post(...)]]: التحويل POST (مش GET)، ومحمي بـ [[auth]] وبعده [[checkOrigin]].
- [[checkOrigin]]: middleware بيقرا header [[Origin]] (المتصفح بيحطه لوحده وبيقول الطلب جه من أنهي موقع)، ولو مش موقعك يرد [[403]]. [[next()]] بيكمّل للـ handler.

---

## ٢. جرّبناها على المعمل

عملنا [[attack.html]] فيه form بيعمل POST لـ transfer وبيبعت نفسه بـ JavaScript، وشغّلناه من بورت تاني. سجّلنا دخول على المعمل الأول (الكوكي اتحطّت)، وبعدين فتحنا الصفحة المهاجمة.

### الـ route الغلط (من غير فحص Origin)

curl بكوكي + Origin مهاجم:

~~~text POST /bad/api/transfer   (Origin: http://evil.test)
{"from":"ali@example.com","to":"attacker","amount":1000}   [200]
~~~

التحويل نجح باسم Ali. ده الهجوم.

### الـ route الصح

~~~text نفس الطلب على /api/transfer
Origin: http://evil.test  -> [403]
من غير Origin             -> [403]
Origin: http://localhost:3101 (موقعنا) -> {"from":"ali@...","to":"sara","amount":50} [200]
~~~

فحص الـ Origin رفض الغريب وسمح لموقعنا بس.

---

## ٣. SameSite نفسه (في متصفح حقيقي)

[[localhost:3101]] و بورت تاني على [[localhost]] نفس الـ site بالنسبة لـ SameSite (البورت مش بيفرق)، فعشان نشوف SameSite شغال فتحنا الصفحة المهاجمة من [[127.0.0.1]] (site مختلف فعلًا) والـ API على [[localhost]]:

| الكوكي | الـ POST من 127.0.0.1 للـ API | النتيجة |
|---|---|---|
| [[sameSite: "lax"]] | المتصفح **ما بعتش** الكوكي | [[{"error":"Unauthorized"}]] |
| [[sameSite: "none"]] (+ secure) | المتصفح بعت الكوكي | التحويل نجح باسم Ali |

يعني مع [[lax]] الهجوم فشل من غير أي كود دفاع، لأن المتصفح نفسه حجب الكوكي. مع [[none]] الكوكي راحت، وساعتها [[checkOrigin]] هو اللي بيمسك (رد [[403]]).

---

## ٤. متى CSRF مش مشكلتك

لو الـ auth بـ Authorization header (توكن بتبعته انت بـ JavaScript) مش بكوكي، المتصفح مش بيحط التوكن لوحده، فـ CSRF مش بتأثر. CSRF مشكلة الأنظمة اللي بتعتمد على كوكي session.

---

## الخلاصة

- كوكي session: [[httpOnly]] + [[secure]] + [[sameSite: "lax"]] أقل حاجة.
- أي حاجة بتغيّر داتا تبقى POST/PUT/DELETE، وافحص [[Origin]] عليها. عمرك ما تعمل تغيير بـ GET.
- SameSite بيحجب الكوكي، وفحص Origin طبقة تانية. الاتنين مع بعض هم الدفاع.`,
          lines: [
            "كوكي session: JavaScript مش بيقراها، HTTPS بس، ومش بتتبعت مع POST من موقع تاني.",
            "العملية الحساسة POST، ومحمية بـ auth وبفحص الـ Origin.",
            "middleware بيفحص الطلب جاي منين.",
            "لو الـ Origin مش دومينك، ارفض بـ 403.",
            "كمّل للـ handler.",
            "قفلة."
          ],
          sol: R`اعمل ملف [[attack.html]] فيه form بيعمل POST على [[http://localhost:3000/api/transfer]]، وشغّله من بورت تاني بـ [[npx serve -l 5000]]. اعمل login على الـ API الأول عشان الكوكي يتحط، وبعدين افتح الصفحة من البورت التاني. خد بالك إن localhost:3000 و localhost:5000 نفس الـ site بالنسبة لـ SameSite (البورت مش بيفرق)، فالكوكي هيتبعت في الحالتين، وهنا الـ [[checkOrigin]] هو اللي هيرد [[403]] لأن الـ Origin بقى [[http://localhost:5000]].

عشان تشوف SameSite نفسه شغال، لازم site مختلف فعلًا: افتح الصفحة من [[http://127.0.0.1:5000]] والـ API على [[localhost]]. مع [[sameSite: "lax"]] الكوكي مش هيتبعت مع POST جاي من site تاني، فالـ API يرد 401. مع [[sameSite: "none"]] (ولازم معاها secure) هيتبعت. شوف ده في DevTools ← Network ← الطلب ← Cookies. الدرس: SameSite=Lax مع فحص Origin على كل POST هو الدفاع الأساسي، وعمره ما تعمل تغيير بـ GET.`,
          solCode: R`<!-- attack.html: شغّله بـ npx serve -l 5000 -->
<form action="http://localhost:3000/api/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>`
        },
        {
          cmd: "4. مصادقة سليمة",
          title: "A07 الباسوردات والتوكنات",
          desc: "ده A07:2025 Authentication Failures. الباسورد لازم يتخزّن hashed بـ bcrypt أو argon2، أبدًا كنص. لو قاعدة بياناتك اتسربت، الـ hash ميرجّعش الباسورد. الـ JWT secret لازم يكون طويل وعشوائي وفي متغير بيئة. وحط rate limiting على login عشان تمنع تجربة باسوردات كتير.",
          example: R`import bcrypt from "bcrypt";

// عند التسجيل
const hash = await bcrypt.hash(password, 12);

// عند الدخول: مقارنة، مش فك تشفير
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: "Invalid credentials" });
// رسالة واحدة للاتنين: متقولش "الإيميل غلط" أو "الباسورد غلط"`,
          try: "اتأكد إن قاعدة بياناتك مفيهاش ولا باسورد واحد مكتوب صريح.",
          flag: "script",
          deep: {
            why: "الباسورد لو اتخزّن زي ما هو وقاعدة البيانات اتسرقت، كل الأكاونتات في خطر.",
            how: R`bcrypt بيعمل hash للباسورد: رقم طويل مش ممكن ترجّعه للباسورد الأصلي.

[[cost factor 12]]: قد إيه الحساب بطيء. أبطأ = أصعب للمهاجم يجرّب ملايين الباسوردات.

[[bcrypt.compare]] مش بيفك الـ hash. بيعمل hash للجديد بنفس الطريقة ويقارن.

رسالة خطأ واحدة مهمة: قول «Invalid credentials» للاتنين من غير تفريق بين «الإيميل غلط» و«الباسورد غلط».`,
            when: "في كل نقطة تسجيل دخول أو إنشاء أكاونت.",
            mistakes: "MD5 أو SHA256 للباسوردات. دي سريعة جدًا. استخدم bcrypt أو argon2."
          },
          teach: R`## الفكرة: متخزّنش الباسورد، خزّن بصمته

لو خزّنت الباسورد نص عادي وقاعدة بياناتك اتسربت، كل الحسابات راحت. الحل إنك تخزّن [[hash]]: رقم طويل بيتحسب من الباسورد، ومستحيل ترجّعه للباسورد الأصلي. المثال بـ bcrypt. جرّبنا bcrypt في Docker (node:22)، وفحصنا الباسوردات في Postgres بتاع المعمل.

---

## ١. السطور

~~~javascript
import bcrypt from "bcrypt";

const hash = await bcrypt.hash(password, 12);              // عند التسجيل
const ok   = await bcrypt.compare(password, user.passwordHash); // عند الدخول
if (!ok) return res.status(401).json({ error: "Invalid credentials" });
~~~

- [[bcrypt.hash(password, 12)]]: بيحسب الـ hash. الرقم [[12]] هو الـ **cost factor**: قد إيه الحساب بطيء. كل ما زاد، أبطأ، فأصعب على المهاجم يجرّب ملايين الباسوردات. ده اللي بيتخزّن في الداتابيز.
- [[bcrypt.compare(password, hash)]]: **مش** بيفك الـ hash (مفيش فك أصلًا). بياخد الباسورد المكتوب، يعمله hash بنفس الملح والـ cost المخزّنين جوه الـ hash القديم، ويقارن. بيرجّع true/false.
- [[401]] برسالة **واحدة** للاتنين: متقولش «الإيميل غلط» ولا «الباسورد غلط»، عشان المهاجم ميعرفش الإيميل موجود ولا لأ.

---

## ٢. شكل الـ hash والسرعة

~~~text الناتج (bcrypt.hash لنفس الباسورد بثلاث تكاليف)
10  $2b$10$vfo1sQFTD5EUusoJzwqj6e...   طول 60   68ms
12  $2b$12$.tqI5WMUUCtDggKOEuJHhO...   طول 60   238ms
14  $2b$14$bfk0macUnfIdimRmEBvvGe...   طول 60   861ms
~~~

- كل hash بيبدأ بـ [[$2b$]] (نسخة bcrypt)، وبعده الـ cost ([[10]]/[[12]]/[[14]])، وطوله **ثابت 60 حرف** مهما كان الباسورد.
- لاحظ الزمن بيتضاعف تقريبًا مع كل زيادة في الـ cost: ده المقصود. [[12]] (حوالي ربع ثانية) اختيار كويس دلوقتي.

~~~text نفس الباسورد مرتين
again: $2b$12$uw6tzUU1EVEU6t.npjP2we...
~~~

الهاش طلع مختلف عن المرة الأولى بنفس الباسورد: لأن bcrypt بيحط [[salt]] عشوائي جوه كل hash، فنفس الباسورد بيدّي hashes مختلفة، وده بيمنع جداول التخمين الجاهزة (rainbow tables).

~~~text compare
compare right: true
compare wrong: false
~~~

### ليه مش MD5 أو SHA256؟

~~~text
md5:    5175053a7565b844c3377e82565d3319
sha256: 42501b6b7e5fa502f3cbf1fc4b2558b476a1d5ae6c2b064c181ae4462ee422f4
1M sha256: 990ms
~~~

مليون hash بـ SHA256 خدوا أقل من ثانية. يعني المهاجم يجرّب ملايين الباسوردات في ثواني. bcrypt بـ cost 12 بيخلي كل محاولة ربع ثانية، فالمليون بياخد أيام. السرعة هنا عيب مش ميزة.

---

## ٣. تأكّد من الداتابيز

~~~sql
SELECT id, email, left(password, 7) AS prefix, length(password) FROM users;
~~~

~~~text الناتج
 id  |      email       | prefix  | length
-----+------------------+---------+--------
 123 | ali@example.com  | $2b$12$ |     60
 124 | sara@example.com | $2b$12$ |     60
~~~

كلهم [[$2b$12$]] وطولهم 60: hashed صح. فحص سريع:

~~~sql
SELECT count(*) FROM users WHERE password NOT LIKE '$2b$%' AND password NOT LIKE '$argon2%';
~~~

طلع [[0]]: مفيش ولا باسورد غير مـ hashed. لو طلع أكبر من صفر أو لقيت hash طوله 32/64 حرف hex (MD5/SHA256)، لازم تصلّح.

---

## الخلاصة

- خزّن [[bcrypt.hash]] أو argon2، عمرك ما تخزّن الباسورد ولا MD5/SHA.
- [[bcrypt.compare]] بيقارن من غير فك. الـ cost بيخلي التخمين بطيء، والـ salt بيخلي كل hash فريد.
- رسالة خطأ واحدة عامة، وعمود الباسورد عمره ما يرجع في أي response.`,
          lines: [
            "استورد bcrypt.",
            "اعمل hash للباسورد بتكلفة 12 (كل ما تزيد، أبطأ وأصعب على المهاجم). ده اللي بيتخزن.",
            "عند الدخول: قارن الباسورد المكتوب بالـ hash المتخزن. مفيش فك، bcrypt بيعمل hash ويقارن.",
            "لو غلط: 401 برسالة واحدة عامة، متقولش «الإيميل مش موجود» ولا «الباسورد غلط»."
          ],
          sol: R`[[SELECT id, email, left(password, 7) FROM users LIMIT 5;]]: كل الباسوردات المفروض تبدأ بـ [[$2b$10$]] أو [[$2b$12$]] (bcrypt) أو [[$argon2id$]] (argon2)، وطولها ثابت (60 حرف لـ bcrypt) مهما كان الباسورد. تقدر تتأكد بـ [[SELECT count(*) FROM users WHERE password NOT LIKE '$2b$%' AND password NOT LIKE '$argon2%';]] والمفروض يطلع صفر.

لو شفت باسورد مقروء، أو hash طوله 32 أو 64 حرف hex (يعني MD5 أو SHA-256 من غير salt)، يبقى لازم تصلّح: مينفعش تحوّل القديم لـ bcrypt من غير الباسورد الأصلي، فالحل إنك تعمل hash للباسورد بـ bcrypt أول ما اليوزر يعمل login صح، أو تجبر الكل يعمل reset. وخد بالك الـ select نفسه متسيبهوش في كود الـ API: عمود الباسورد عمره ما يرجع في أي response.`
        },
        {
          cmd: "5. إعدادات غلط",
          title: "A02 الافتراضيات الخطيرة",
          desc: "ده A02:2025 Security Misconfiguration، وطلع لرقم 2 في نسخة 2025. صفحات الـ error اللي بتطبع تفاصيل السيرفر، وصلاحيات مفتوحة، ولوحات تحكم بباسورد افتراضي. في Express: شيل [[X-Powered-By]] عشان متعلنش إنك Express، فعّل [[helmet]] للـ security headers، ومتبعتش تفاصيل الأخطاء للمستخدم في الإنتاج.",
          example: R`import helmet from "helmet";
app.use(helmet());
app.disable("x-powered-by");

// في الإنتاج: رسالة عامة، والتفاصيل في اللوج بس
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});`,
          try: "افتح Network على موقعك ودوّر على header اسمه [[X-Powered-By]] أو [[Server]] بيفشي إيه اللي شغال.",
          flag: "script",
          deep: {
            why: "frameworks وبرامج بتيجي بإعدادات للتطوير مش للإنتاج. تغيير حاجات صغيرة يحسّن الأمان بشكل كبير.",
            how: R`[[helmet]] مكتبة Express بتضيف أهم security headers في سطر واحد: CSP، وX-Frame-Options، وغيرهم.

[[app.disable("x-powered-by")]]: شيل الـ header اللي يقول للمهاجم انت شغال بـ Express.

Stack traces في الإنتاج: لو error handler بيرجع التفاصيل للمستخدم، المهاجم بيعرف أكتر. في الإنتاج: رسالة عامة، والتفاصيل في اللوج بس.`,
            when: "قبل كل deploy للإنتاج.",
            mistakes: "نسيان إن [[DEBUG=true]] أو [[NODE_ENV=development]] بيغيّر سلوك مكتبات كتير."
          },
          teach: R`## الفكرة: الإعدادات الافتراضية للتطوير، مش للإنتاج

الـ frameworks بتيجي بإعدادات مريحة للتطوير: بتعلن اسمها في الـ headers، وبتطبع تفاصيل الأخطاء كاملة. في الإنتاج دي معلومات مجانية للمهاجم. المثال بيصلّح تلاتة في Express: يشيل [[X-Powered-By]]، يضيف security headers بـ helmet، ويرد رسالة عامة بدل الـ stack trace. جرّبناه في Docker (node:22): نسخة من غير إعداد ونسخة بـ helmet.

---

## ١. السطور

~~~javascript
import helmet from "helmet";
app.use(helmet());
app.disable("x-powered-by");

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});
~~~

- [[helmet()]]: middleware بيضيف أهم security headers في سطر واحد.
- [[app.disable("x-powered-by")]]: بيشيل الـ header اللي بيقول للمهاجم إنك شغال Express. (helmet بيشيله برضه، فلو مستخدمه مش محتاج السطر ده).
- الـ error handler: الـ **٤ parameters** ([[err, req, res, next]]) هي اللي بتخلي Express يعرف إنه للأخطاء. [[console.error(err)]] التفاصيل في اللوج بتاعك، و [[res.status(500)]] رسالة عامة للمستخدم من غير تفاصيل.

---

## ٢. الـ headers: قبل وبعد

~~~text من غير إعداد: curl -sI http://localhost:3103/
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
...
~~~

[[X-Powered-By: Express]] بيقول للمهاجم على أي framework انت، فيعرف يدوّر على ثغرات نسخته.

~~~text بعد helmet: curl -sI http://localhost:3104/
Content-Security-Policy: default-src 'self';...
Cross-Origin-Opener-Policy: same-origin
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
...
~~~

[[X-Powered-By]] اختفى، وظهرت headers بتحمي: [[X-Frame-Options]] بيمنع إن موقعك يتحط جوه iframe في موقع تاني (clickjacking)، [[X-Content-Type-Options: nosniff]] بيمنع المتصفح من تخمين نوع الملف، و [[Content-Security-Policy]] بيحدد مصادر السكربتات المسموحة.

---

## ٣. صفحة الخطأ بتفشي كتير

طلبنا route بيقع (بيعمل [[JSON.parse]] لمدخل غلط). النسخة الافتراضية مع [[NODE_ENV=development]]:

~~~text /crash?data={bad  (من غير error handler)
<pre>SyntaxError: Expected property name or '}' in JSON at position 1
   at JSON.parse (<anonymous>)
   at file:///app/misconf.mjs:6:40
   at Layer.handleRequest (/app/node_modules/router/lib/layer.js:152:17)
   ...
~~~

ده بيكشف مسارات الملفات على السيرفر، والمكتبات ونسخها، وأماكن في الكود. النسخة اللي فيها error handler:

~~~text /crash?data={bad  (مع error handler)
{"error":"Something went wrong"}   [500]
~~~

> حتى من غير error handler، Express بيخفي الـ stack لو [[NODE_ENV=production]] (جرّبناها: طلعت [[Internal Server Error]] بس). بس الأأمن إنك تحط handler بنفسك عشان تتحكم في الرد والـ logging.

---

## ٤. مش Express بس

| التقنية | بيعلن إيه | العلاج |
|---|---|---|
| Express | [[X-Powered-By: Express]] | [[app.disable("x-powered-by")]] أو helmet |
| Nginx | [[Server: nginx/1.24.0]] | [[server_tokens off;]] |
| Next.js | [[X-Powered-By: Next.js]] | [[poweredByHeader: false]] في next.config |

شيلهم مش لأنهم بيحموك لوحدهم، لكن عشان متسهّلش على السكانر يعرف نسختك ويدوّر على ثغرة معروفة فيها.

---

## الخلاصة

- [[helmet()]] + [[app.disable("x-powered-by")]] سطرين بيحسّنوا الوضع كتير.
- error handler بيرجّع رسالة عامة، والتفاصيل في اللوج بس.
- [[NODE_ENV=production]] بيغيّر سلوك مكتبات كتير: اتأكد إنه متظبوط قبل أي deploy.`,
          lines: [
            "استورد helmet.",
            "فعّله: بيضيف security headers الأساسية كلها.",
            "شيل الـ header اللي بيقول إنك شغال بـ Express.",
            "error handler عام (الـ ٤ parameters هي اللي بتخلي Express يعرف إنه للأخطاء).",
            "سجّل التفاصيل الكاملة في اللوج بتاعك.",
            "ورجّع للمستخدم رسالة عامة بس، من غير stack trace.",
            "قفلة."
          ],
          sol: R`DevTools ← Network ← اختار أول طلب (الصفحة أو أي API) ← Headers ← Response Headers. في Express من غير أي إعداد هتلاقي [[X-Powered-By: Express]]، وفي Nginx من غير إعداد [[Server: nginx/1.24.0]] بالنسخة. نفس الكلام من الترمنال: [[curl -sI http://localhost:3000 | grep -iE "x-powered-by|server"]].

الحل: في Express [[app.disable("x-powered-by")]] أو [[helmet()]] اللي بيشيله لوحده، وفي Nginx [[server_tokens off;]] فيبقى [[Server: nginx]] من غير نسخة. شيله مش لأنه بيحميك لوحده، لكن لأنه بيسهّل على أي سكانر يعرف إنت على نسخة فيها ثغرة معروفة. ولو شفت [[X-Powered-By: Next.js]] فده بيتقفل بـ [[poweredByHeader: false]] في [[next.config]].`
        },
        {
          cmd: "6. مكتبات فيها ثغرات",
          title: "A03 الكود اللي مكتبتوش انت",
          desc: "في نسخة 2025 المكتبات القديمة أو اللي فيها ثغرات معروفة بقت جزء من A03 Software Supply Chain Failures. معظم كودك مكتبات، وأي ثغرة فيها بتبقى ثغرة فيك. [[npm audit]] بيقولك أنهي مكتبة فيها ثغرة معروفة ودرجة خطورتها. راجع اللي بيقترح تحديثه قبل [[--force]] لأنه ممكن يكسر حاجة. و Dependabot على GitHub بيعملك pull request أوتوماتيك بالتحديثات الأمنية.",
          example: R`npm audit
npm audit --omit=dev
npm audit fix
npm outdated`,
          try: "شغّل [[npm audit]] على أكبر مشروع عندك وشوف كام ثغرة فيه.",
          flag: "term",
          deep: {
            why: "معظم كودك مش بتكتبه انت. أي مكتبة فيها ثغرة هي ثغرة فيك.",
            how: R`[[npm audit]] بيقارن مكتباتك بقاعدة GitHub Advisory Database. لو لاقى ثغرة بيقولك اسمها والمكتبة والخطورة والإصدار اللي بيصلّحها.

[[npm audit fix]] بيحاول يحدّث تلقائيًا. إياك [[--force]] من غير ما تقرا.

[[npm ci]] أحسن من [[npm install]] في الإنتاج: بيسطّب بالظبط الـ versions في package-lock.json من غير ما يحدّث حاجة.`,
            when: "في CI: [[npm audit --audit-level=high]] يفشل الـ build لو ثغرة high. وفعّل Dependabot.",
            mistakes: "تتجاهل [[npm audit]] لأن «الموقع شغال»."
          },
          teach: R`## الفكرة: معظم كودك مكتبات، وثغرتها ثغرتك

مشروعك بيعتمد على مئات المكتبات، كل واحدة ممكن تعتمد على غيرها. لو واحدة فيها ثغرة معروفة، هي ثغرة فيك. [[npm audit]] بيقارن مكتباتك بقاعدة بيانات الثغرات المعروفة ويقولك فين المشكلة ودرجتها. جرّبناه في Docker (node:22, npm 10) على مشروع فيه نسخ قديمة عمدًا (express 4.17.1 و lodash و minimist).

---

## ١. السطور

~~~bash
npm audit            # كل المكتبات
npm audit --omit=dev # مكتبات الإنتاج بس
npm audit fix        # صلّح اللي ينفع بأمان
npm outdated         # إيه اللي ليه نسخة أحدث
~~~

---

## ٢. ناتج [[npm audit]]

~~~text جزء من الناتج
minimist  1.0.0 - 1.2.5
Severity: critical
Prototype Pollution in minimist - https://github.com/advisories/GHSA-xvch-5gv4-984h
fix available via $__btnpm audit fix --force$__bt
node_modules/minimist

8 vulnerabilities (3 low, 4 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix
To address all issues, run:
  npm audit fix --force
~~~

لكل ثغرة: اسم المكتبة والنسخ المصابة، الخطورة ([[low]]/[[moderate]]/[[high]]/[[critical]])، لينك الـ advisory، ومكانها في الشجرة. في الآخر عدّاد، وسطرين بيقترحوا [[fix]] أو [[fix --force]]. الـ exit code كان [[1]] (مفيد في CI). على مشروع نضيف بيطبع [[found 0 vulnerabilities]].

---

## ٣. أنهي ثغرة تهمّك فعلًا؟

مش كل ثغرة بنفس الخطورة عليك. ثغرة في أداة build بتشتغل على جهازك بس أقل خطورة من واحدة في مكتبة بتستقبل داتا المستخدمين في الإنتاج:

~~~text npm audit --omit=dev
7 vulnerabilities (3 low, 4 high)
~~~

الـ critical كان في [[minimist]] اللي كان devDependency، فاختفى من فحص الإنتاج (نزل من 8 لـ 7). [[--omit=dev]] بيوريك اللي في الإنتاج بس.

في CI بتختار مستوى: [[npm audit --audit-level=high]] بيرجّع exit 1 لو فيه high أو أعلى. جرّبناه: [[--audit-level=critical --omit=dev]] رجّع [[0]] (اختفى الـ critical)، و [[--audit-level=high]] رجّع [[1]].

---

## ٤. [[npm outdated]] و [[fix]]

~~~text npm outdated
Package   Current  Wanted  Latest
express    4.17.1  4.17.1   5.2.1
minimist    1.2.5   1.2.5   1.2.8
~~~

- [[Current]] المسطّب، [[Wanted]] أحدث نسخة جوه حدود الـ semver في package.json، [[Latest]] آخر نسخة خالص.
- [[Wanted]] = [[Current]] هنا لأن الحدود ضيقة؛ الوصول لـ express 5 نقلة major.

الترتيب الصح: [[npm audit fix]] الأول (بيحدّث في حدود الـ semver ومش بيكسر). الباقي بص عليه بنفسك. **متعملش** [[npm audit fix --force]] من غير ما تقرا: هنا كان هيركّب [[express@4.22.3]] «outside the stated dependency range»، يعني ممكن ينقلك نسخة بتكسر المشروع.

---

## الخلاصة

- [[npm audit]] بيقارن مكتباتك بقاعدة الثغرات؛ exit 1 لو فيه حاجة، فمفيد في CI.
- [[npm audit fix]] آمن، و [[--force]] خطر (نقلات major). [[--omit=dev]] بيركّز على الإنتاج.
- فعّل Dependabot على GitHub عشان ييجي بالتحديثات الأمنية تلقائيًا.`,
          lines: [
            "افحص كل المكتبات ضد قاعدة الثغرات المعروفة.",
            "مكتبات الإنتاج بس (من غير devDependencies).",
            "صلّح اللي ينفع يتصلّح بتحديث آمن.",
            "إيه المكتبات اللي ليها نسخ أحدث."
          ],
          sol: R`[[npm audit]] بيطبع لكل ثغرة اسم المكتبة، الخطورة (low/moderate/high/critical)، ولينك الـ advisory، وسلسلة الاعتماد (مين جابها)، وفي الآخر سطر زي [[5 vulnerabilities (3 moderate, 2 high)]] وتحته [[To address all issues, run: npm audit fix]]. على مشروع نضيف [[found 0 vulnerabilities]].

الترتيب الصح: [[npm audit fix]] الأول (بيحدّث في حدود الـ semver ومش بيكسر)، وبعدين شوف الباقي بنفسك. متعملش [[npm audit fix --force]] من غير ما تقرا، لأنه ممكن ينقلك لنسخة major جديدة وتكسر المشروع. وافهم إن مش كل ثغرة بتأثر عليك: ثغرة في أداة build بتشتغل على جهازك بس أقل خطورة بكتير من واحدة في مكتبة بتستقبل داتا المستخدمين في الإنتاج، وعشان كده [[npm audit --omit=dev]] بيوريك اللي في الإنتاج بس.`
        },
        {
          cmd: "7. SSRF (بقت جزء من رقم 1)",
          title: "A01 SSRF: لما السيرفر يجيب URL من المستخدم",
          desc: "في نسخة 2025 دمجوا SSRF جوه A01 Broken Access Control، لأنها في الآخر وصول لحاجة مش من حقك. بتحصل لو عندك ميزة بتجيب صورة أو داتا من URL بيبعته المستخدم، فيحط عنوان داخلي زي [[169.254.169.254]] (اللي بيرجّع أسرار السيرفر على بعض المنصات) أو [[localhost]] فيوصل لخدمات جواك. الحل: اسمح بدومينات محددة بس، وامنع العناوين الداخلية.",
          example: R`// خطر: بيجيب أي URL
const data = await fetch(req.body.url);

// أمان: قائمة بيضاء
const allowed = ["images.example.com", "cdn.example.com"];
const host = new URL(req.body.url).hostname;
if (!allowed.includes(host)) {
  return res.status(400).json({ error: "URL not allowed" });
}
const safe = await fetch(req.body.url, { redirect: "error" });`,
          try: "لو عندك ميزة بتجيب من URL خارجي، اتأكد إنها بتفلتر الدومينات.",
          flag: "script",
          deep: {
            why: "التطبيق بينفّذ طلبات لـ URLs من اليوزر. المهاجم يبعت URL داخلي يوصل لخدمات على نفس السيرفر.",
            how: R`في OWASP 2025 دمجوا SSRF في Broken Access Control لأنها نفس المشكلة: اليوزر بيوصل لموارد مش مفروض.

الكود الغلط: fetch لأي URL من اليوزر. المهاجم يبعت [[http://169.254.169.254/latest/meta-data/]] ويجيب credentials للـ cloud instance.

الكود الصح: whitelist للـ domains المسموحة. أي URL مش فيها يترفض.`,
            when: "أي feature بتعمل fetch لـ URL من اليوزر: upload by URL، وwebhook.",
            mistakes: R`تستخدم regex للفلترة. سهل تتجاوزها. الأحسن whitelist، ومعاها [[redirect: "error"]] عشان الدومين المسموح ميحوّلكش لعنوان داخلي.`
          },
          teach: R`## الفكرة: خلّي السيرفر يجيب URL من المستخدم، يوصل لجواه

SSRF (Server-Side Request Forgery): عندك ميزة بتجيب صورة أو داتا من URL بيبعته المستخدم. المهاجم يبعت عنوان داخلي بدل عنوان خارجي، فالسيرفر (اللي بيقدر يوصل لخدمات جواه) بيجيبها ويرجّعها له. المثال: fetch لأي URL (غلط)، وقائمة بيضاء (صح). جرّبناه على معمل فيه خدمة أدمن داخلية على [[127.0.0.1:9000]] بترجّع أسرار، مش منشورة لبرّه الـ container.

---

## ١. السطور

~~~javascript
const data = await fetch(req.body.url);   // خطر

const allowed = ["images.example.com", "cdn.example.com"];
const host = new URL(req.body.url).hostname;
if (!allowed.includes(host)) return res.status(400).json({ error: "URL not allowed" });
const safe = await fetch(req.body.url, { redirect: "error" });
~~~

- [[fetch(req.body.url)]]: بيطلب أي URL اليوزر بعته. ده الغلط.
- [[new URL(url).hostname]]: بيطلّع اسم الدومين بس من الـ URL.
- [[allowed.includes(host)]]: لازم يكون من قائمة ثابتة، وإلا [[400]].
- [[redirect: "error"]]: لو الدومين المسموح حاول يحوّلك لعنوان تاني، اعتبرها خطأ. (عشان موقع مسموح ميحوّلكش لعنوان داخلي).

---

## ٢. الهجوم على الـ route الغلط

الخدمة الداخلية مش متاحة من الهوست:

~~~text من الهوست مباشرة
curl http://localhost:9000/   ->   (فشل الاتصال، exit 7)
~~~

لكن عبر الـ route الغلط اللي بيـ fetch نيابة عنك:

~~~text POST /bad/preview  {"url":"http://127.0.0.1:9000/"}
{"service":"internal-admin","DB_PASSWORD":"labpass","JWT_SECRET":"super-secret-lab-key"}   [200]
~~~

السيرفر وصل للخدمة الداخلية وسحب أسرارها. وممكن المهاجم يستكشف الشبكة الداخلية (port scanning): بعت [[http://sec01-pg:6379/]] (بورт مقفول) فرجع [[ECONNREFUSED]]، و [[sec01-pg:5432]] (مفتوح) رجع نوع خطأ تاني، فبيعرف أنهي بورت مفتوح.

> على بعض منصّات السحابة، [[http://169.254.169.254/]] بيرجّع بيانات الـ instance وأحيانًا مفاتيح مؤقتة. ده أشهر هدف لـ SSRF.

---

## ٣. القائمة البيضاء بترفض

~~~text POST /preview
http://127.0.0.1:9000/                     -> {"error":"URL not allowed"} [400]
http://169.254.169.254/latest/meta-data/   -> {"error":"URL not allowed"} [400]
https://images.example.com.evil.test/a.png -> {"error":"URL not allowed"} [400]
https://images.example.com@127.0.0.1:9000/ -> {"error":"URL not allowed"} [400]
not a url                                  -> {"error":"Bad URL"}         [400]
~~~

كلهم اترفضوا قبل أي fetch. لاحظ حالتين ماكرتين:
- [[images.example.com.evil.test]]: دومين تاني خالص بس بيبدأ باسم المسموح. مقارنة النص كانت هتعدّيه، مقارنة [[hostname]] بالقائمة لأ.
- [[images.example.com@127.0.0.1:9000]]: كل اللي قبل [[@]] في الـ URL هو «user info» مش الدومين؛ الدومين الحقيقي [[127.0.0.1]]. [[new URL().hostname]] بيطلّع [[127.0.0.1]] صح، فاترفض.

---

## ٤. كود الحل سطر سطر

~~~javascript
const ALLOWED = new Set(["images.example.com", "cdn.example.com"]);
function checkUrl(input) {
  let u;
  try { u = new URL(input); } catch { return false; }
  return u.protocol === "https:" && ALLOWED.has(u.hostname);
}
~~~

- [[try { new URL(input) } catch { return false }]]: نص مش URL يترفض.
- [[u.protocol === "https:"]]: بيرفض [[file:]] و [[http:]].
- [[ALLOWED.has(u.hostname)]]: الدومين من قائمة ثابتة.

جرّبناه:

~~~text الناتج
https://images.example.com/a.png         true   images.example.com
http://169.254.169.254/latest/           false  169.254.169.254
https://images.example.com.evil.net/     false  images.example.com.evil.net
http://images.example.com/a.png          false  images.example.com   (http مرفوض)
https://IMAGES.example.com/a.png         true   images.example.com   (الدومين case-insensitive)
https://images.example.com@evil.net/     false  evil.net
~~~

---

## الخلاصة

- fetch لـ URL من المستخدم خطر؛ قارن [[new URL(u).hostname]] بقائمة ثابتة، مش بـ [[includes]] على النص.
- اقفل الـ redirects ([[redirect: "error"]] أو [[manual"]]): موقع مسموح ممكن يحوّلك على عنوان داخلي.
- لو لازم تسمح بأي دومين: حلّه لـ IP وارفض أي IP خاص (127.x، 10.x، 192.168.x، 169.254.x).`,
          lines: [
            "الغلط: اطلب أي URL اليوزر يبعته. ممكن يبعت عنوان داخلي زي metadata بتاع الـ cloud.",
            "الصح: لستة الدومينات المسموحة بس.",
            "طلّع الدومين من الـ URL.",
            "لو مش في اللستة...",
            "...ارفض.",
            "قفلة.",
            "دلوقتي بس اطلب، ومن غير ما تتبع redirects، وإلا الدومين المسموح يحوّلك لعنوان داخلي."
          ],
          sol: R`المطلوب تتأكد إن الميزة (preview للينك، رفع صورة من URL، webhook) بترفض أي URL مش في قايمة مسموحة. اختبرها بـ: [[http://127.0.0.1:5432]]، [[http://localhost/admin]]، [[http://169.254.169.254/latest/meta-data/]] (عنوان الميتاداتا في السحابة)، و [[file:///etc/passwd]]. المفروض كلهم يترفضوا بـ [[400]] قبل ما السيرفر يحاول يوصلهم.

لو الفلتر بيقارن النص بس (زي [[url.includes("mysite.com")]]) هيعدّي [[http://mysite.com.evil.net]]، فقارن بـ [[new URL(u).hostname]] على قايمة ثابتة. ولو لازم تسمح بأي دومين، حل الدومين لـ IP وارفض أي IP خاص (127.x، 10.x، 192.168.x، 169.254.x)، واقفل الـ redirects ([[redirect: "manual"]]) لأن موقع مسموح ممكن يحوّلك على عنوان داخلي.`,
          solCode: R`const ALLOWED = new Set(["images.example.com", "cdn.example.com"]);

function checkUrl(input) {
  let u;
  try { u = new URL(input); } catch { return false; }
  return u.protocol === "https:" && ALLOWED.has(u.hostname);
}

// checkUrl("https://images.example.com/a.png")      -> true
// checkUrl("http://169.254.169.254/latest/")        -> false
// checkUrl("https://images.example.com.evil.net/")  -> false`
        },
        {
          cmd: "8. Rate limiting",
          title: "دفاع لـ A07 و A06: امنع الإغراق والتخمين",
          desc: "Rate limiting مش بند في OWASP Top 10، ده دفاع: A07 Authentication Failures بتعدّ brute force و credential stuffing اللي مبيتقفلوش بسرعة ثغرة، و A06 Insecure Design فيها «مفيش حد لعدد مرات التفاعل» (CWE-799). من غيره حد يقدر يجرّب آلاف الباسوردات، أو يغرق الـ API. حط حد على المحاولات، أشد على login و forgot-password. في الإنتاج ورا Nginx أو Cloudflare حط الـ limiting هناك كمان.",
          example: R`import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 دقيقة
  limit: 5,                      // 5 محاولات للـ IP
  message: { error: "Too many attempts, try later" }
});
app.post("/api/login", loginLimiter, loginHandler);`,
          try: "جرّب تبعت لـ login بتاعك 10 طلبات ورا بعض بـ curl في لوب، وشوف بيرد بـ 429 ولا لأ.",
          flag: "script",
          deep: {
            why: "بدون rate limiting، المهاجم يجرّب ملايين الباسوردات، أو يغرق السيرفر.",
            how: R`Rate limiting بيحدد كام طلب مسموح من نفس الـ IP في وقت معين.

في المثال: 5 محاولات login في 15 دقيقة. بعدها 429. وده بيخلي brute force مستحيل عمليًا.

الحدود بتختلف: login و forgot-password أشد (5-10 محاولات). APIs العادية 100-500 في الدقيقة.

في الإنتاج ورا Nginx أو Cloudflare: Nginx عنده [[limit_req_zone]]، وCloudflare عنده rate limiting rules.`,
            when: "على كل login endpoint ومن الأول.",
            mistakes: "Rate limiting على الـ IP بس. اليوزرز ورا NAT (شركات وجامعات) كلهم على نفس الـ IP."
          },
          teach: R`## الفكرة: حط سقف لعدد الطلبات

من غير حد، المهاجم يجرّب ملايين الباسوردات على [[/login]]، أو يغرق الـ API بطلبات. Rate limiting بيحدد كام طلب مسموح من نفس المصدر في وقت معين، وبعدها بيرد [[429 Too Many Requests]]. المثال بـ [[express-rate-limit]]. جرّبناه على المعمل: route بـ limiter و route من غيره.

---

## ١. السطور

~~~javascript
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 دقيقة
  limit: 5,                    // 5 محاولات للـ IP
  message: { error: "Too many attempts, try later" }
});
app.post("/api/login", loginLimiter, loginHandler);
~~~

- [[windowMs]]: النافذة الزمنية بالمللي ثانية. [[15 * 60 * 1000]] = 15 دقيقة.
- [[limit: 5]]: أقصى 5 طلبات من نفس الـ IP في النافذة.
- [[message]]: الجسم اللي بيرجع مع [[429]].
- الـ limiter middleware بيتحط **قبل** الـ handler على route الـ login بس (مش على الـ API كله).

---

## ٢. جرّبناها: 10 طلبات بباسورد غلط

~~~bash
for i in $(seq 1 10); do curl -s -o /dev/null -w "%{http_code}\n" -X POST .../api/login -d '{...wrong...}'; done
~~~

~~~text route من غير limiter (/bad/api/login)
401 401 401 401 401 401 401 401 401 401
~~~

~~~text route بالـ limiter (/api/login)
401 401 401 401 401 429 429 429 429 429
~~~

أول 5 محاولات ردت [[401]] (باسورد غلط)، وبعدها [[429]]: الـ limiter قفل. يعني brute force بقى غير عملي.

### headers بترشدك

~~~text أول محاولة
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
~~~

~~~text بعد ما خلص الرصيد
HTTP/1.1 429 Too Many Requests
X-RateLimit-Remaining: 0
Retry-After: 899
~~~

[[Retry-After: 899]] يعني استنى 899 ثانية (آخر النافذة). لاحظ إنه **حتى الباسورد الصح** بيترد [[429]] بعد ما يخلص الرصيد: العدّاد بيعدّ كل الطلبات، مش الفاشلة بس.

---

## ٣. فخّان شائعان

### ورا بروكسي

لو السيرفر ورا Nginx أو Cloudflare، كل الطلبات جاية من IP البروكسي، فالـ limiter هيقفل على الناس كلهم مع بعض. الحل: [[app.set("trust proxy", 1)]] عشان Express يقرا IP العميل الحقيقي من header [[X-Forwarded-For]].

### أكتر من instance

في الإنتاج بأكتر من نسخة من التطبيق، الذاكرة مش مشتركة بينهم، فكل instance عنده عدّاده. العدّاد لازم يتخزّن في مكان مشترك زي Redis.

---

## ٤. الحدود بتختلف

| الـ endpoint | حد معقول |
|---|---|
| login و forgot-password | 5–10 لكل 15 دقيقة (أشد) |
| APIs عادية | 100–500 في الدقيقة |

وفي الإنتاج، حط limiting على Nginx ([[limit_req_zone]]) أو Cloudflare كمان كطبقة قبل التطبيق.

---

## الخلاصة

- حط limiter على login وforgot-password من الأول، أشد من باقي الـ API.
- [[429]] بيقفل brute force والإغراق. راقب [[X-RateLimit-Remaining]] و [[Retry-After]].
- ورا بروكسي فعّل [[trust proxy]]، وبأكتر من instance خزّن العدّاد في Redis.`,
          lines: [
            "استورد المكتبة.",
            "اعمل limiter.",
            "النافذة الزمنية: ١٥ دقيقة بالمللي ثانية.",
            "أقصى عدد محاولات من نفس الـ IP في النافذة دي.",
            "الرسالة اللي بترجع مع 429.",
            "قفلة.",
            "حط الـ limiter على route الـ login بس، قبل الـ handler."
          ],
          sol: R`بالـ limiter اللي في المثال (5 محاولات كل 15 دقيقة) لوب الـ 10 طلبات لازم يطبع [[401]] خمس مرات (باسورد غلط) وبعدين [[429]] خمس مرات. لو اتطبع 401 عشر مرات، يبقى الـ limiter مش متركّب على الـ route ده، أو متركّب بعد الـ handler.

لو السيرفر ورا Nginx أو Cloudflare وكل الطلبات جاية من نفس الـ IP (IP البروكسي)، هيتقفل على الناس كلها مع بعض: لازم [[app.set("trust proxy", 1)]] عشان Express يقرا IP العميل الحقيقي. وفي الإنتاج بأكتر من instance، الذاكرة مش مشتركة بينهم، فالعداد يتخزن في Redis.`,
          solCode: R`for i in $(seq 1 10); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/login \
    -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"wrong"}'
done
# المتوقع: 401 خمس مرات، وبعدين 429 خمس مرات`
        },
        {
          cmd: "npm و Supply Chain",
          title: "A03 متسيبش مكتبة تشغّل كود وقت التسطيب",
          desc: "هجمات 2025 على npm (مكتبات مشهورة اتسرق حساب صاحبها ونزلت نسخة ملغومة) كانت بتشتغل من [[postinstall]]: مجرد [[npm install]] بيشغّل الكود. [[--ignore-scripts]] بيمنع ده، و [[npm audit signatures]] بيتأكد إن المكتبات متوقّعة من الـ registry فعلًا. وقبل ما تسطّب مكتبة، بص نزلت إمتى: نسخة عمرها ساعات خليك بعيد عنها.",
          example: R`npm ci --ignore-scripts
npm audit signatures
npm config set ignore-scripts true
npm view express time.modified`,
          try: "شغّل [[npm audit signatures]] على مشروعك، وجرّب [[npm ci --ignore-scripts]] وشوف أنهي مكتبة كانت محتاجة scripts.",
          flag: "term",
          deep: {
            why: "المكتبة اللي بتثق فيها ممكن تتخترق هي نفسها، وده اللي OWASP 2025 حطته A03.",
            how: "install scripts بتشتغل بصلاحياتك وتقدر تقرا .env و ~/.npmrc وتسرق التوكنات. ignore-scripts بيقفلها. المكتبات اللي محتاجة build (bcrypt، sharp) هتحتاج تشغّل scripts بتاعتها بإيدك ([[npm rebuild bcrypt]]). والـ lock و npm ci بيضمنوا إن محدش يغيّر النسخ من تحتك.",
            when: "في CI وعلى السيرفر دايمًا، وعلى جهازك لو بتجرّب مكتبات جديدة.",
            mistakes: "تسطيب مكتبة من اسم شبه المشهورة (typosquatting). وتحديث كل حاجة لـ latest أول ما تنزل."
          },
          teach: R`## الفكرة: مجرد تسطيب مكتبة بيشغّل كودها

مكتبات npm ممكن يكون ليها [[postinstall]] أو [[install]] script بيشتغل تلقائيًا وقت [[npm install]]، بصلاحياتك، فيقدر يقرا [[.env]] و [[~/.npmrc]] ويسرق توكناتك. هجمات 2025 على npm (مكتبات مشهورة اتسرق حساب صاحبها) اشتغلت بالطريقة دي. المثال بيوريك إزاي تقفلها وتتأكد. جرّبناه في Docker (node:22, npm 10) على مشروع فيه express و bcrypt و esbuild.

---

## ١. السطور

~~~bash
npm ci --ignore-scripts      # سطّب من الـ lock من غير تشغيل scripts
npm audit signatures         # اتأكد إن المكتبات متوقّعة من الـ registry
npm config set ignore-scripts true  # خلّيها الافتراضي
npm view express time.modified      # آخر مرة اتنشر فيها حاجة
~~~

---

## ٢. [[--ignore-scripts]]: مين كان محتاج scripts؟

~~~text npm ci --ignore-scripts
added 73 packages, and audited 74 packages in 23s
found 0 vulnerabilities
~~~

سطّب عادي من غير ما يشغّل أي postinstall. عشان تعرف مين عنده scripts (قبل ما تشغّلها):

~~~text npm query ":attr(scripts, [postinstall])"  و [install]
esbuild 0.25.12  postinstall: node install.js
bcrypt 6.0.0     install: node-gyp-build
~~~

دول اللي محتاجين scripts عشان بيبنوا أو بينزّلوا حاجة native. جرّبنا إنهم يشتغلوا بعد [[--ignore-scripts]]:

~~~text
bcrypt $2b$04$...   ✓ اشتغل
esbuild let a = 1;   ✓ اشتغل
~~~

هنا اشتغلوا عادي (prebuilt binaries موجودة). عمومًا اللي بيبوظ غالبًا المكتبات دي، وبتلاقي الخطأ وقت التشغيل مش التسطيب. سيب [[ignore-scripts]] وشغّل الـ scripts للمكتبات دي بس.

---

## ٣. [[npm audit signatures]]

~~~text الناتج
audited 73 packages in 7s
73 packages have verified registry signatures
2 packages have verified attestations
~~~

ده بيتأكد إن اللي نزل عندك هو نفسه اللي اتنشر على الـ registry (توقيع من npm). لو طلع [[invalid]] أو [[missing]] فيه حاجة غلط تستاهل تبص عليها. الـ attestations دليل أقوى (بيربط المكتبة بالـ build اللي طلّعها على GitHub).

---

## ٤. بص على عمر النسخة

~~~text npm view express time.modified
2026-10-01T10:45:23.339Z
~~~

~~~text npm view express@5.2.1 time
"5.2.1": "2025-12-01T20:49:43.268Z"
~~~

قاعدة مفيدة: نسخة عمرها ساعات خليك بعيد عنها لحد ما تثبت إنها سليمة؛ معظم النسخ الملغومة بتتشال بسرعة بعد ما تتكتشف. و typosquatting (اسم شبه المشهور) خطر تاني: اتأكد من اسم المكتبة بالظبط قبل ما تسطّبها.

---

## الخلاصة

- [[--ignore-scripts]] (أو [[npm config set ignore-scripts true]]) بيقفل أخطر باب: كود بيشتغل وقت التسطيب.
- [[npm query ":attr(scripts, [postinstall])"]] بيوريك مين محتاج scripts فعلًا، فتشغّلها لدول بس.
- [[npm audit signatures]] بيتأكد من المصدر، وبص على عمر النسخة قبل ما تسطّب الجديد.`,
          lines: [
            "سطّب من الـ lock من غير ما تشغّل أي install scripts.",
            "اتأكد من توقيعات المكتبات من الـ registry.",
            "خلّيها الافتراضي على جهازك.",
            "آخر مرة المكتبة اتنشر فيها حاجة."
          ],
          sol: R`[[npm audit signatures]] بيطبع حاجة زي [[audited 312 packages in 2s]] و [[312 packages have verified registry signatures]]، ولو فيه مكتبات عليها attestations هيقولك [[N packages have verified attestations]]. ده معناه إن اللي نزل عندك هو نفسه اللي اتنشر على الـ registry. لو طلعلك [[invalid]] أو [[missing]] فيه حاجة غلط وتستاهل تبص عليها.

[[npm ci --ignore-scripts]] بيسطب من غير ما يشغّل أي [[postinstall]]. معظم المكتبات هتشتغل عادي. اللي بيبوظ غالبًا المكتبات اللي بتنزّل أو بتبني حاجة native وقت التسطيب، زي [[esbuild]] و [[sharp]] و [[bcrypt]] و [[prisma]]: هتلاقي خطأ وقت التشغيل مش وقت التسطيب. عشان تعرف مين عنده scripts قبل ما تشغّل: [[npm query ":attr(scripts, [postinstall])"]]. بعدها سيب ignore-scripts وشغّل الـ scripts للمكتبات دي بس (في pnpm ده [[allowBuilds]]).`
        },
        {
          cmd: "باقي القايمة",
          title: "A04 و A06 و A08 و A09 في سطر",
          desc: R`قايمة OWASP Top 10 هي أشهر 10 أنواع ثغرات في تطبيقات الويب، والبنود دي من القايمة ملهاش مثال كود في الصفحة، فهنا معنى كل واحد وعلاجه في سطر.

A04 أخطاء التشفير: البيانات بتتنقل من غير HTTPS، أو باسوردات بـ MD5 أو SHA1 (سريعين ومكسورين)، أو أسرار مكتوبة في الكود، أو توكنات معمولة بـ [[Math.random]] اللي ممكن تتوقّع. A06 تصميم مش آمن: الثغرة في فكرة الميزة نفسها، زي كوبون ينفع يتستخدم مالانهاية، فاسأل «لو حد استغلها؟» قبل ما تكتب. A08 سلامة الكود والبيانات: إنك تشغّل كود أو تحديث من غير ما تتأكد إنه نفس اللي اتنشر، زي GitHub Action متثبتة بتاج ممكن يتغير بدل الـ SHA. A09 اللوج والتنبيه: محاولات اختراق بتحصل ومحدش بيعرف لأن مفيش لوج أو مفيش حد بيبص.

المرجع الكامل في owasp.org/Top10.`,
          example: R`A04 Cryptographic Failures       HTTPS everywhere, no MD5/SHA1, secrets from env, strong random
A06 Insecure Design              Think about abuse cases before coding: limits, business rules
A08 Software/Data Integrity      Verify signatures, pin CI actions by SHA, no unsigned auto-updates
A09 Logging & Alerting Failures  Log logins, failed auth, admin actions; alert on spikes`,
          try: "اختار بند واحد وراجعه على آخر مشروع عملته.",
          flag: "script",
          deep: {
            why: "الثغرات الكبيرة مش كلها SQL و XSS: بيانات متشفّرة غلط، أو تصميم مفيهوش حدود، أو اختراق محدش خد باله منه شهور.",
            how: "A04: [[crypto.randomBytes]] مش Math.random للتوكنات، و HTTPS على كل حاجة. A06: اسأل «لو حد استخدم الميزة دي ١٠٠٠ مرة؟» قبل ما تكتبها. A08: ثبّت GitHub Actions بالـ SHA مش بالتاج. A09: سجّل كل login فاشل وكل تغيير صلاحيات، وحط تنبيه لو زادوا فجأة.",
            when: "مراجعة أمان قبل الإنتاج.",
            mistakes: "لوج فيه باسوردات أو توكنات. أو لوج محدش بيبص عليه."
          },
          teach: R`## الفكرة: البنود اللي مالهاش مثال كود

قايمة OWASP Top 10 أشهر 10 أنواع ثغرات في الويب. البنود دي ملهاش مثال كود في الصفحة لأنها مفاهيم أوسع من سطر واحد، فهنا معنى كل واحد وعلاجه. المثال نفسه مجرد جدول تلخيص (نص، مش أمر بيتشغّل).

---

## الأربعة في جدول

| البند | يعني إيه | العلاج |
|---|---|---|
| **A04** Cryptographic Failures | داتا بتتنقل من غير HTTPS، أو باسوردات بـ MD5/SHA1 (سريعين ومكسورين)، أو أسرار في الكود، أو توكنات بـ [[Math.random]] اللي بتتوقّع | HTTPS على كل حاجة، bcrypt/argon2 للباسوردات، الأسرار من [[.env]]، و [[crypto.randomBytes]] للتوكنات |
| **A06** Insecure Design | الثغرة في فكرة الميزة نفسها، زي كوبون ينفع يتستخدم مالانهاية، أو أوردر بكمية سالبة | اسأل «لو حد استغلها؟» قبل ما تكتب: حدود، وقواعد شغل، واختبار حالات الإساءة |
| **A08** Software/Data Integrity | تشغّل كود أو تحديث من غير ما تتأكد إنه نفس اللي اتنشر، زي GitHub Action متثبتة بتاج ممكن يتغيّر | ثبّت الـ actions بالـ SHA مش بالتاج، اتأكد من توقيع الـ webhooks، مفيش auto-update من غير توقيع |
| **A09** Logging & Alerting Failures | محاولات اختراق بتحصل ومحدش بيعرف، لأن مفيش لوج أو محدش بيبص | سجّل الـ logins، وفشل المصادقة، وتغييرات الصلاحيات، ونبّه لو زادوا فجأة |

---

## ليه [[Math.random]] خطر في A04؟

[[Math.random()]] بيولّد رقم شبه-عشوائي **متوقّع**: مش معمول للأمان، وممكن حد يتوقّع الأرقام الجاية. لتوكن reset باسورد أو session، استخدم [[crypto.randomBytes]] اللي بياخد عشوائية من نظام التشغيل.

## أهم حاجة في A09: متسجّلش أسرار

اللوج المفيد في فشل login فيه: الوقت، والـ IP، والإيميل، وإنه فشل. **ومش** فيه الباسورد نفسه ولا التوكن، لأن اللوجات بتتقرا وبتترفع لأدوات تانية.

---

## الخلاصة

- الثغرات الكبيرة مش كلها SQL و XSS: تشفير غلط، تصميم من غير حدود، أو اختراق محدش خد باله منه.
- لكل بند اسأل: اتطبّق عندي ولا لأ؟ الدليل إيه (أمر أو سطر كود)؟ والإصلاح لو ناقص؟
- المرجع الكامل على owasp.org/Top10.`,
          lines: [
            "التشفير: HTTPS وخوارزميات قوية وأسرار بره الكود.",
            "التصميم: فكّر في إساءة الاستخدام قبل الكود.",
            "سلامة الكود والداتا: تحقق من التوقيعات وثبّت الـ actions.",
            "اللوج والتنبيه: سجّل الأحداث الحساسة ونبّه عليها."
          ],
          sol: R`مثال لإجابة كويسة على A09 (Logging): على آخر مشروع، جرّب login بباسورد غلط وشوف اللوج. المفروض تلاقي سطر فيه الوقت، والـ IP، والإيميل، وإنه فشل، ومتلاقيش الباسورد نفسه ولا التوكن. لو ملقيتش حاجة خالص، يبقى لو حد جرّب ألف باسورد مش هتعرف.

أي بند تختاره، الإجابة الكويسة فيها تلات حاجات: البند اتطبّق ولا لأ، الدليل (أمر جربته أو سطر في الكود)، والإصلاح لو ناقص. مثلًا A04 (Insecure Design): هل ممكن تعمل أوردر بكمية سالبة أو سعر جاي من الواجهة؟ A08 (Integrity): هل الـ webhook بيتأكد من التوقيع قبل ما يصدّق الداتا؟ الغلط الشائع إنك تقرا البند وتقول "أنا عامل كده" من غير ما تجرّب فعلًا.`
        },
        {
          cmd: "الجديد في 2025",
          title: "تحديثان مهمان في القايمة",
          desc: "نسخة 2025 (اتثبتت رسميًا يناير 2026) ضافت تصنيفين جداد كانوا بيسببوا اختراقات كتير: [[Software Supply Chain Failures]] (A03)، يعني تعتمد على مكتبة أو أداة اتخترقت هي نفسها، وده أخطر من ثغرة في كودك لأنك مش شايفها، وعلاجه إنك تثبّت نسخ المكتبات وتفحصها. و [[Mishandling of Exceptional Conditions]] (A10)، يعني كودك مبيتعاملش صح مع الحالات الغريبة فيقع أو يتصرف غلط. كمان Security Misconfiguration طلعت لـ A02، و Injection (فيها SQL و XSS) نزلت لـ A05، و SSRF و CSRF بقوا جوه A01. المرجع الرسمي على owasp.org/Top10.",
          example: R`# ثبّت نسخ المكتبات عشان متتغيرش تحتك
npm ci        # بيستخدم package-lock.json بالظبط، مش بيحدّث
# افحص إن مفيش مكتبة متعرفش مصدرها
npm ls --all | head`,
          try: "شغّل [[npm ci]] بدل [[npm install]] في سيرفر الإنتاج، وافهم الفرق.",
          flag: "term",
          deep: {
            why: "OWASP بتحدّث القايمة على أساس بيانات اختراقات حقيقية. النسخة 2025 ضافت تصنيفين جداد.",
            how: R`Software Supply Chain Failures (A03): هجمات بتاخد شكل مكتبات أو نسخ ملغومة. [[npm ci]] بدل [[npm install]] يمنع التحديثات غير المتوقعة.

Mishandling of Exceptional Conditions (A10): كود بيقع أو بيتصرف غلط في حالات مش متوقعة. زي API بيرجع 500 مع stack trace لو الـ input غريب. الحماية: error handling شامل وtesting لـ edge cases.

المرجع الرسمي: owasp.org/Top10`,
            when: "وانت بتراجع أمان أي مشروع.",
            mistakes: "الافتراض إن OWASP 2021 لسه الـ standard. النسخة 2025 هي الرسمية دلوقتي."
          },
          teach: R`## الفكرة: القايمة اتحدّثت، والترتيب اتغيّر

OWASP بتحدّث القايمة على أساس بيانات اختراقات حقيقية. نسخة 2025 (اتثبتت رسميًا يناير 2026) ضافت تصنيفين جداد وغيّرت ترتيب القدامى. المثال بيوريك [[npm ci]]، أهم أمر عملي للتصنيف الجديد A03. جرّبناه في Docker (node:22, npm 10).

---

## ١. التغييرات

| التصنيف | إيه الجديد |
|---|---|
| **A03** Software Supply Chain Failures | **جديد**: تعتمد على مكتبة أو أداة اتخترقت هي نفسها. أخطر من ثغرة في كودك لأنك مش شايفها |
| **A10** Mishandling of Exceptional Conditions | **جديد**: كودك مبيتعاملش صح مع الحالات الغريبة فيقع أو يتصرف غلط |
| Security Misconfiguration | طلع لـ **A02** |
| Injection (SQL و XSS) | نزل لـ **A05** |
| SSRF و CSRF | اندمجوا جوه **A01** Broken Access Control |

---

## ٢. [[npm ci]] vs [[npm install]]

الدفاع العملي لـ A03 إنك تثبّت نسخ المكتبات بالظبط عشان متتغيّرش من تحتك:

~~~bash
npm ci        # بيستخدم package-lock.json بالظبط، مش بيحدّث
npm ls --all | head   # شجرة كل المكتبات بما فيها مكتبات المكتبات
~~~

~~~text npm ci
added 73 packages, and audited 74 packages
found 0 vulnerabilities
~~~

[[npm ci]] بيقرا [[package-lock.json]] بس، بيمسح [[node_modules]] الأول، ويسطّب النسخ اللي في الـ lock حرفيًا. [[npm install]] ممكن يحدّث نسخ جوه الحدود ([[^1.2.0]] ممكن تبقى [[1.9.0]]) ويعدّل الـ lock.

### جرّبنا حالات الفشل

~~~text من غير lock file
npm error The $__btnpm ci$__bt command can only install with an existing package-lock.json
~~~

~~~text package.json مش متوافق مع الـ lock (ضفنا lodash لـ package.json بس)
npm error $__btnpm ci$__bt can only install packages when your package.json and
npm error package-lock.json or npm-shrinkwrap.json are in sync.
npm error Missing: lodash@4.18.1 from lock file
~~~

يعني [[npm ci]] بيقف ويصرخ لو فيه أي اختلاف، بينما [[npm install]] في نفس الحالة ركّب [[lodash]] وعدّل الـ lock من غير ما يسأل. ده بالظبط اللي عايزينه في الإنتاج: نفس الكود اللي جرّبته بالظبط، من غير مفاجآت.

---

## ٣. ليه ده أمان؟

لو مكتبة اتخطفت ونزلت نسخة خبيثة بكرة، [[npm install]] ممكن يجيبها (لو جوه حدود الـ semver)، و [[npm ci]] لأ لأنه مقيّد بالـ lock. عشان كده الـ lock file لازم يكون في Git، ومن غيره [[npm ci]] مش هيشتغل أصلًا.

---

## الخلاصة

- نسخة 2025 هي الرسمية دلوقتي؛ A03 (Supply Chain) و A10 (Exceptional Conditions) جداد، و Injection بقى A05.
- في الإنتاج و CI استخدم [[npm ci]] مش [[npm install]]: بيثبّت النسخ من الـ lock ويقف لو فيه اختلاف.
- خلّي الـ lock file في Git. المرجع على owasp.org/Top10.`,
          lines: [
            "سطّب بالظبط النسخ اللي في package-lock (للإنتاج و CI)، من غير أي تحديث مفاجئ.",
            "شجرة كل المكتبات بما فيها مكتبات المكتبات، عشان تعرف إيه اللي داخل مشروعك فعلًا."
          ],
          sol: R`[[npm ci]] بيقرا [[package-lock.json]] بس ويسطب النسخ اللي فيه بالظبط، وبيمسح [[node_modules]] الأول، ولو الـ lock مش متوافق مع [[package.json]] بيقف بخطأ زي [[npm ci can only install packages when your package.json and package-lock.json are in sync]]. أما [[npm install]] فممكن يحدّث نسخ جوه الحدود ([[^1.2.0]] ممكن تبقى [[1.9.0]]) ويعدّل الـ lock.

الفرق ده مهم للأمان: في الإنتاج عايز نفس الكود اللي جربته بالظبط. لو مكتبة اتخطفت ونزلت نسخة خبيثة بكرة، [[npm install]] ممكن يجيبها، و [[npm ci]] لأ. ولازم الـ lock file يبقى في Git، من غيره [[npm ci]] مش هيشتغل أصلًا ويقولك إنه محتاج lock file.`
        }
      ]
    }
]);
