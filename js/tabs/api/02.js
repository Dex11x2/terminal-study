// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "Routes: العنوان والبيانات",
      l: 1,
      n: "كل endpoint هو method و path، والبيانات بتيجي من ٣ أماكن: params و query و body",
      items: [
        {
          cmd: "app.get و app.post",
          title: "endpoint لكل عملية على المهام",
          desc: R`REST بيقول: كل «حاجة» ليها عنوان (resource)، والـ method هي الفعل.

للمهام: [[GET /api/tasks]] الكل، و [[GET /api/tasks/:id]] واحدة، و [[POST /api/tasks]] جديدة، و [[PATCH /api/tasks/:id]] تعديل، و [[DELETE /api/tasks/:id]] مسح. و [[app.route(path)]] بيجمع كل الـ methods لنفس العنوان في مكان واحد.`,
          example: R`app.get("/api/tasks", listTasks);
app.get("/api/tasks/:id", getTask);
app.post("/api/tasks", createTask);
app.patch("/api/tasks/:id", updateTask);
app.delete("/api/tasks/:id", deleteTask);

app.route("/api/users/:id")
  .get(getUser)
  .patch(updateUser);`,
          try: R`اكتب الخمس handlers كدوال بترجع [[res.json({ ok: true })]]، وجرّب كل واحد بـ curl بالـ method الصح ([[-X PATCH]] و [[-X DELETE]]). وجرّب method مش متسجّل زي [[-X PUT]] وشوف بيرجع إيه.`,
          flag: "script",
          deep: {
            why: R`لو كل واحد سمّى الـ endpoints على مزاجه ([[/getAllTasks]] و [[/deleteTaskById]])، كل API هيبقى لغة جديدة. REST بيدّيك شكل ثابت: الأسماء جمع، والـ method هي الفعل. أي حد يشوف [[DELETE /api/tasks/5]] يفهم من غير docs.`,
            how: R`Express بيخزّن كل route كـ (method و path pattern و handlers). مع كل طلب بيمشي على القايمة بالترتيب، وأول route الـ method والـ path بتوعه مطابقين بيتنادى. لو محدش طابق، Express بيرجّع 404 افتراضي كصفحة HTML فيها [[Cannot GET /x]] (وهنبدّله بـ JSON في درس [[error middleware]]).

[[app.all(path)]] بيطابق أي method. و [[app.route]] مجرد اختصار بيقلل تكرار العنوان وغلطات الكتابة.

قواعد التسمية المتعارف عليها: أسماء جمع ([[/tasks]] مش [[/task]])، و kebab-case ([[/order-items]])، والعلاقات متداخلة مستوى واحد ([[/projects/7/tasks]]). ولو الفعل مش CRUD (زي «ابعت الفاتورة»)، يا إما PATCH على حقل ([[{ done: true }]])، يا إما sub-resource زي [[POST /invoices/9/send]]. تصميم الـ API بالتفصيل (versioning وشكل الأخطاء) في تاب «APIs متقدمة».`,
            when: "أي API هيستخدمه frontend أو موبايل. ولو العملية «نفّذ أمر» مش «حاجة ليها بيانات»، ممكن شكل RPC يبقى أوضح (والأفعال اللي مش CRUD بالتفصيل في درس «resources و URLs» في تاب «APIs متقدمة»).",
            mistakes: R`[[POST /api/tasks/delete]] بدل [[DELETE]]، أو GET بيغيّر حاجة. وتكتب [[/api/tasks/:id]] قبل [[/api/tasks/stats]]، فكلمة [[stats]] تتفهم كـ id ويتنادى getTask. الـ routes الثابتة قبل اللي فيها params.`
          },
          teach: R`## ٥ عمليات على المهام = ٥ سطور

المثال بيسجّل كل العمليات اللي أي تطبيق مهام محتاجها (CRUD: Create و Read و Update و Delete)، وكل سطر فيه ٣ حاجات: الـ **method**، والـ **path**، والدالة اللي هترد (**handler**). الدوال نفسها ([[listTasks]] وغيرها) لسه مش مكتوبة، فهنكتبها بالـ solCode الأول عشان نقدر نجرّب.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash (على بورت تاني غير ٣٠٠٠).

---

## ١. الـ handlers المؤقتة (solCode)

~~~text
const ok = (name) => (req, res) => res.json({ ok: true, handler: name, params: req.params });
~~~

ده سطر فيه **دالتين جوه بعض**، نفكه من برة لجوه:

1. [[ok]] دالة بتاخد [[name]] (اسم زي [["list"]]).
2. وبترجّع **دالة تانية** [[(req, res) => ...]]، ودي اللي Express بيناديها مع الطلب.
3. الدالة التانية بترد بـ JSON فيه اسم الـ handler و [[req.params]]، عشان نعرف مين اللي رد.

فـ [[ok("list")]] بترجّع handler جاهز بيرد [[{"ok":true,"handler":"list",...}]]. الشكل ده (دالة بتعمل دالة) هتشوفه تاني في [[validate(schema)]].

~~~text
const listTasks = ok("list"), getTask = ok("get"), createTask = ok("create");
~~~

الفاصلة بين التعريفات معناها كذا متغير في [[const]] واحد.

---

## ٢. السطور الخمسة

| السطر | الطلب اللي بيطابقه | معناه |
|---|---|---|
| [[app.get("/api/tasks", listTasks)]] | [[GET /api/tasks]] | هات الكل |
| [[app.get("/api/tasks/:id", getTask)]] | [[GET /api/tasks/5]] | هات واحدة |
| [[app.post("/api/tasks", createTask)]] | [[POST /api/tasks]] | ضيف واحدة (البيانات في الـ body) |
| [[app.patch("/api/tasks/:id", updateTask)]] | [[PATCH /api/tasks/5]] | عدّل جزء منها |
| [[app.delete("/api/tasks/:id", deleteTask)]] | [[DELETE /api/tasks/5]] | امسحها |

- [[:id]] النقطتين قبل الاسم معناها «أي قيمة في المكان ده»، واسمها [[id]] (درس [[req.params]]).
- لاحظ إن **الإضافة** على القايمة نفسها ([[/api/tasks]]) من غير id، لأن الـ id لسه مش موجود: السيرفر هو اللي هيعمله.
- PATCH تعديل جزئي (ابعت الحقول اللي اتغيرت بس)، و PUT استبدال كامل. احنا مسجّلين PATCH بس.

### نجرّب

~~~bash
curl -s localhost:3000/api/tasks
curl -s localhost:3000/api/tasks/1
curl -s -X POST localhost:3000/api/tasks
curl -s -X PATCH localhost:3000/api/tasks/1
curl -s -X DELETE localhost:3000/api/tasks/1
~~~

~~~text الناتج
{"ok":true,"handler":"list","params":{}}
{"ok":true,"handler":"get","params":{"id":"1"}}
{"ok":true,"handler":"create","params":{}}
{"ok":true,"handler":"update","params":{"id":"1"}}
{"ok":true,"handler":"delete","params":{"id":"1"}}
~~~

- [[-s]] (silent) بيشيل شريط التقدم.
- كل طلب راح للـ handler الصح على حسب الـ method **والمسار** مع بعض.
- [["id":"1"]] بين علامتين تنصيص: الـ param بيوصل **string** دايمًا، حتى لو شكله رقم.

---

## ٣. [[app.route(...)]]: نفس العنوان، كذا method

~~~text
app.route("/api/users/:id")
  .get(getUser)
  .patch(updateUser);
~~~

- [[app.route(path)]] بيرجّع object للعنوان ده، تسجّل عليه methods من غير ما تكرر الـ path.
- [[.get(...)]] بترجّع نفس الـ object، فتكمّل بـ [[.patch(...)]] (ده اسمه chaining، سلسلة).
- السطور مكسورة على ٣ للقراية بس، وهي جملة واحدة بتخلص عند [[;]].

~~~text الناتج
curl -s localhost:3000/api/users/7            {"ok":true,"handler":"getUser","params":{"id":"7"}}
curl -s -X PATCH localhost:3000/api/users/7   {"ok":true,"handler":"updateUser","params":{"id":"7"}}
~~~

---

## ٤. method مش متسجّل

~~~bash
curl -i -X PUT localhost:3000/api/tasks/1
~~~

~~~text الناتج
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 150
...

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot PUT /api/tasks/1</pre>
</body>
</html>
~~~

- المسار [[/api/tasks/1]] متسجّل فعلًا، بس لـ GET و PATCH و DELETE. محدش متسجّل لـ PUT، فـ Express رد بالـ 404 الافتراضي بتاعه.
- الرد **HTML** مش JSON ([[Content-Type: text/html]])، وده اللي هنبدّله بـ [[notFound]] بتاعنا في درس [[error middleware]].
- [[Content-Security-Policy: default-src 'none']] و [[nosniff]] Express بيحطهم على صفحة الخطأ دي عشان المتصفح ميشغّلش فيها أي حاجة.

ونفس الكلام لـ [[POST /api/tasks/1]] (404، لأن POST متسجّل على [[/api/tasks]] من غير id) و [[DELETE /api/users/7]] ([[Cannot DELETE /api/users/7]]).

---

## ٥. الترتيب بيفرق

لو عندك [[/api/tasks/:id]] وبعده [[app.get("/api/tasks/stats", ...)]]:

~~~text الناتج
curl -s localhost:3000/api/tasks/stats   {"ok":true,"handler":"get","params":{"id":"stats"}}
~~~

Express بيمشي على الـ routes بالترتيب، و [[:id]] بيطابق أي كلمة، فـ [[stats]] اتفهمت id. الـ routes الثابتة تتكتب **قبل** اللي فيها params.

---

## الخلاصة

| method | المسار | العملية | الـ status المعتاد |
|---|---|---|---|
| GET | [[/api/tasks]] | الكل | 200 |
| GET | [[/api/tasks/:id]] | واحدة | 200 أو 404 |
| POST | [[/api/tasks]] | جديدة | 201 |
| PATCH | [[/api/tasks/:id]] | تعديل جزئي | 200 |
| DELETE | [[/api/tasks/:id]] | مسح | 204 |

- الـ route = method + path، والاتنين لازم يطابقوا.
- الأسماء جمع والفعل في الـ method، مش في العنوان.
- مفيش route مطابق؟ Express بيرجّع 404 HTML فيها [[Cannot METHOD /path]].`,
          lines: [
            "كل المهام.",
            "مهمة واحدة برقمها. [[:id]] ده param.",
            "مهمة جديدة، والبيانات في الـ body.",
            "تعديل جزئي لمهمة.",
            "مسح مهمة.",
            "نفس العنوان لأكتر من method في مكان واحد.",
            "GET على العنوان ده.",
            "و PATCH عليه، والفاصلة المنقوطة بتقفل السلسلة."
          ],
          sol: R`الخمسة بيرجّعوا [[{"ok":true}]] بـ [[200]]، بشرط كل طلب يطابق الـ method والمسار الاتنين: [[curl localhost:3000/api/tasks/1]] بيروح لـ getTask، و [[curl -X PATCH localhost:3000/api/tasks/1]] بيروح لـ updateTask، و [[curl -X DELETE ...]] لـ deleteTask، و [[curl -X POST localhost:3000/api/tasks]] لـ createTask.

[[curl -i -X PUT localhost:3000/api/tasks/1]] بيرجّع [[404 Not Found]] وصفحة HTML فيها [[Cannot PUT /api/tasks/1]]. ده الـ 404 الافتراضي بتاع Express لما مفيش route مطابق (method + مسار)، حتى لو المسار نفسه متسجّل بـ methods تانية. (فيه APIs بترجع 405 Method Not Allowed في الحالة دي، بس Express مبيعملهاش لوحده.) ولما تعمل [[notFound]] بتاعك بعدين هيبقى JSON بدل HTML.

لو [[-X POST]] على [[/api/tasks/1]] رجّع 404، ده صح: POST متسجّل على [[/api/tasks]] من غير id.`,
          solCode: R`const ok = (name) => (req, res) => res.json({ ok: true, handler: name, params: req.params });
const listTasks = ok("list"), getTask = ok("get"), createTask = ok("create");
const updateTask = ok("update"), deleteTask = ok("delete");
// curl -X PATCH localhost:3000/api/tasks/1   => {"ok":true,"handler":"update","params":{"id":"1"}}
// curl -i -X PUT localhost:3000/api/tasks/1  => 404  Cannot PUT /api/tasks/1`
        },
        {
          cmd: "req.params",
          title: "اقرا الرقم اللي في العنوان",
          desc: R`[[/api/tasks/:id]] بيطابق [[/api/tasks/42]]، و [[req.params.id]] بيبقى [["42"]] كـ string دايمًا.

فحوّله وتأكد إنه رقم فعلًا قبل ما تستخدمه. و Express 5 غيّر شكل الـ patterns: الجزء الاختياري بين أقواس [[{}]] بدل [[?]]، والـ wildcard لازم ليه اسم زي [[/*path]].`,
          example: R`app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.get("/api/projects/:projectId/tasks/:taskId", (req, res) => res.json(req.params));
app.get("/files/*path", (req, res) => res.json(req.params.path));
app.get("/api/reports{/:year}", (req, res) => res.json({ year: req.params.year ?? "all" }));`,
          try: R`جرّب [[/api/tasks/abc]] و [[/api/tasks/999]] و [[/api/tasks/1]]، واتأكد إن كل واحد بيرجّع status مختلف. وبعدين اكتب [[app.get("/files/*", ...)]] وشوف السيرفر بيقع وهو بيقوم.`,
          flag: "script",
          deep: {
            why: "أغلب الـ endpoints بتشتغل على حاجة معينة: مهمة رقم ٥، يوزر رقم ١٢. الـ params هي الطريقة اللي العنوان يشيل بيها الرقم ده من غير query ولا body.",
            how: R`Express بيحوّل الـ path pattern لـ regex بمكتبة path-to-regexp. [[:id]] بيطابق أي حروف لحد أول [[/]]، واللي اتطابق بيتحط في [[req.params]] كـ string بعد decode (فـ [[%20]] بتبقى مسافة).

Express 5 نقل لنسخة جديدة من path-to-regexp، وده غيّر حاجات: [[?]] للاختياري اتشالت وبقت أقواس زي [[/:file{.:ext}]]، و [[*]] لوحدها بقت ممنوعة ولازم اسم ([[/*splat]])، وقيمتها بقت array من الأجزاء. والـ regex جوه الـ string ([[/:id(\d+)]]) اتشال، فالتحقق إنه رقم بقى شغلك في الكود أو في validation (درس [[validate(schema)]]). و [[/*splat]] مبيطابقش العنوان من غير أجزاء بعده، ولو عايزه كمان اكتبه [[/{*splat}]].

و [[req.params]] في Express 5 object من غير prototype، فمتعملش [[req.params.hasOwnProperty(...)]]. استخدم [[Object.hasOwn]] لو احتجت.`,
            when: R`أي حاجة بتحدد resource واحد: id، أو slug ([[/blog/:slug]])، أو علاقة أب وابن. الفلترة والترتيب مكانهم الـ query مش الـ params.`,
            mistakes: R`تقارن [[t.id === req.params.id]] (رقم مع string) فمتلاقيش حاجة أبدًا، وترجّع 404 وانت مش فاهم ليه. وتبعت الـ id من غير تحقق للداتابيز، فـ [[Number("abc")]] يبقى NaN ويطلع 500 بدل 400. وفي مشاريع Mongo، id مش ObjectId صحيح بيعمل CastError، فاتحقق منه الأول برضه.`
          },
          teach: R`## الرقم اللي في العنوان بيوصل إزاي

المثال فيه route واحد كامل بيجيب مهمة برقمها ويتعامل مع ٣ حالات (رقم غلط، مش موجودة، موجودة)، وبعده ٣ سطور بتوري أشكال تانية للـ params في Express 5. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 (path-to-regexp 8)، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## ١. [[app.get("/api/tasks/:id", ...)]]

[[:id]] اسمه **route parameter**: النقطتين معناها «أي قيمة هنا لحد أول [[/]]»، والاسم بعدها هو المفتاح اللي هتلاقيه فيه. فطلب [[/api/tasks/42]] بيوصل والـ handler شايف:

~~~text
req.params = { id: "42" }
~~~

[["42"]] **string** مش رقم، لأن العنوان كله نص.

## ٢. [[const id = Number(req.params.id);]]

[[Number()]] بيحوّل النص لرقم. وأي حاجة مش رقم بتبقى [[NaN]] (Not a Number):

| [[req.params.id]] | [[Number(...)]] |
|---|---|
| [["42"]] | [[42]] |
| [["abc"]] | [[NaN]] |
| [["1.5"]] | [[1.5]] |
| [[" "]] (مسافة، [[%20]] في العنوان) | [[0]] |

## ٣. [[if (!Number.isInteger(id)) return res.status(400).json(...)]]

- [[Number.isInteger(id)]] بيرجّع [[true]] لو رقم صحيح من غير كسور. [[NaN]] و [[1.5]] بيرجّعوا [[false]].
- [[!]] بتعكس: «لو **مش** رقم صحيح».
- [[res.status(400)]] بيحط الـ status، وبيرجّع [[res]] نفسه فنكمّل بـ [[.json(...)]].
- [[400]] Bad Request: العيب في الطلب نفسه، مش إن الحاجة مش موجودة.
- [[return]] عشان الدالة تقف هنا ومتكمّلش.

## ٤. [[const task = tasks.find((t) => t.id === id);]]

[[find]] بيعدّي على الـ array ويرجّع أول عنصر الشرط بتاعه [[true]]، أو [[undefined]] لو ملقاش. [[t]] كل مهمة في دورها. والمقارنة [[===]] رقم مع رقم، وده سبب التحويل اللي فوق: لو قارنت [[1 === "1"]] النتيجة [[false]].

## ٥. [[if (!task) return res.status(404).json(...)]]

[[!task]] صح لو [[task]] بـ [[undefined]]. يبقى 404 Not Found.

## ٦. [[res.json(task)]]

لقيناها: 200 والمهمة.

### نجرّب التلات حالات

~~~text الناتج
/api/tasks/abc   -> {"error":"Invalid id"}                      [400]
/api/tasks/999   -> {"error":"Task not found"}                  [404]
/api/tasks/1     -> {"id":1,"title":"buy milk","done":false}    [200]
/api/tasks/1.5   -> {"error":"Invalid id"}                      [400]
/api/tasks/%20   -> {"error":"Task not found"}                  [404]
~~~

(الأمر اللي طبع ده [[curl -s -w ' [%{http_code}]' localhost:3000/api/tasks/abc]]: [[-w]] بيطبع الـ status بعد الـ body.)

آخر سطر مهم: [[%20]] مسافة، و Express عمل لها decode، و [[Number(" ")]] بيطلع [[0]]، و [[0]] رقم صحيح، فعدّت من الفحص ووصلت 404 بدل 400. يعني [[Number.isInteger]] بيقبل [[0]] والأرقام السالبة والمسافة. الفحص الكامل ([[positive()]] رقم أكبر من صفر) بييجي في درس [[validate(schema)]].

---

## ٧. أكتر من param

~~~text
app.get("/api/projects/:projectId/tasks/:taskId", (req, res) => res.json(req.params));
~~~

~~~text الناتج
/api/projects/3/tasks/9 -> {"projectId":"3","taskId":"9"}
~~~

كل [[:اسم]] بيبقى مفتاح في نفس الـ object، والقيم strings.

---

## ٨. الـ wildcard: [[/files/*path]]

~~~text
app.get("/files/*path", (req, res) => res.json(req.params.path));
~~~

[[*path]] معناها «كل اللي باقي من العنوان، حتى لو فيه [[/]]»، واسمه [[path]]. في Express 5 القيمة **array** من الأجزاء:

~~~text الناتج
/files/a/b.png     -> ["a","b.png"]          [200]
/files/a/b/c.txt   -> ["a","b","c.txt"]      [200]
/files             -> Cannot GET /files       [404]
/files/            -> Cannot GET /files/      [404]
~~~

لاحظ إن [[/files]] لوحده مش بيطابق: الـ wildcard محتاج جزء واحد على الأقل. لو عايزه يطابق كمان اكتبه [[/files{/*path}]]: جرّبناه، [[/files]] رجّع [[req.params]] فاضي [[{}]]، و [[/files/a/b]] رجّع [[{"path":["a","b"]}]].

ولو اتبعت الشكل القديم من Express 4 ([[/files/*]] من غير اسم)، السيرفر **مبيقومش أصلًا**:

~~~text الناتج
...\node_modules\path-to-regexp\dist\index.js:108
                    throw new PathError(...)
                          ^

PathError [TypeError]: Missing parameter name at index 8: /files/*; visit https://git.new/pathToRegexpError for info
  originalPath: '/files/*'
}
~~~

[[index 8]] مكان النجمة في النص [[/files/*]] (العد بيبدأ من صفر). الخطأ بيحصل وقت تسجيل الـ route، قبل أي طلب.

---

## ٩. جزء اختياري: [[{/:year}]]

~~~text
app.get("/api/reports{/:year}", (req, res) => res.json({ year: req.params.year ?? "all" }));
~~~

- الأقواس [[{ }]] في Express 5 معناها «الحتة دي ممكن تيجي وممكن لأ». في Express 4 كانت [[/:year?]].
- [[??]] (nullish coalescing): لو اللي على الشمال [[undefined]] أو [[null]] خد اللي على اليمين.

~~~text الناتج
/api/reports        -> {"year":"all"}
/api/reports/2025   -> {"year":"2025"}
~~~

---

## الخلاصة

| الشكل في Express 5 | بيطابق | [[req.params]] |
|---|---|---|
| [[/api/tasks/:id]] | [[/api/tasks/42]] | [[{ id: "42" }]] |
| [[/projects/:p/tasks/:t]] | [[/projects/3/tasks/9]] | [[{ p: "3", t: "9" }]] |
| [[/files/*path]] | [[/files/a/b.png]] (مش [[/files]]) | [[{ path: ["a", "b.png"] }]] |
| [[/reports{/:year}]] | [[/reports]] و [[/reports/2025]] | [[{}]] أو [[{ year: "2025" }]] |

- القيم strings دايمًا: حوّل وافحص قبل ما تستخدم.
- غلط في الشكل = 400، مش موجود = 404.
- [[*]] من غير اسم بيوقّع السيرفر في Express 5.`,
          lines: [
            "[[:id]] أي قيمة في المكان ده، وبتوصل في [[req.params.id]].",
            "حوّلها لرقم، لأنها جاية string.",
            "مش رقم صحيح (زي abc)؟ 400، الطلب نفسه غلط.",
            "دوّر عليها.",
            "مش موجودة؟ 404.",
            "رجّعها.",
            "قفلة.",
            R`أكتر من param: [[/api/projects/3/tasks/9]] بيدّيك [[{ projectId: "3", taskId: "9" }]].`,
            "wildcard باسم (Express 5): [[/files/a/b.png]] بيدّيك array فيها a و b.png.",
            "جزء اختياري بين أقواس: بيطابق [[/api/reports]] و [[/api/reports/2025]]."
          ],
          sol: R`[[/api/tasks/abc]] بيرجّع [[400]] و [[{"error":"Invalid id"}]] (لأن [[Number("abc")]] بـ NaN)، و [[/api/tasks/999]] بيرجّع [[404]] و [[{"error":"Task not found"}]]، و [[/api/tasks/1]] بيرجّع [[200]] والمهمة. تلات حالات، تلات status مختلفة، والواجهة تقدر تتصرف في كل واحدة لوحدها.

و [[app.get("/files/*", ...)]] السيرفر بيقع وهو بيقوم، قبل أي طلب، بـ [[PathError [TypeError]: Missing parameter name at index 8: /files/*]]. في Express 5 (path-to-regexp 8) الـ wildcard لازم يبقى ليه اسم: [[/files/*path]]، وقيمته بتيجي array: [[/files/a/b/c.txt]] بيرجّع array فيها [[a]] و [[b]] و [[c.txt]].

لو [[/api/tasks/1]] رجع 404، غالبًا بتقارن [[req.params.id]] (string) بـ [[t.id]] (number) بـ [[===]] من غير [[Number]].`
        },
        {
          cmd: "req.query",
          title: "الفلترة والبحث من غير ما تغيّر العنوان",
          desc: R`اللي بعد [[?]] في العنوان هو الـ query: [[?done=true&q=milk]] بيدّيك [[req.query.done]] و [[req.query.q]] كـ strings.

كل القيم strings (أو array لو الاسم اتكرر)، ومحدش مجبر يبعتها، فلازم default. وفي Express 5 الـ query parser الافتراضي بقى "simple"، فـ [[?filter[done]=true]] مبقتش بتتحول لـ object زي Express 4. و [[req.query]] بقى getter، مينفعش تبدّله.`,
          example: R`app.get("/api/tasks", (req, res) => {
  const { done, q, sort = "createdAt" } = req.query;
  let result = tasks;
  if (done !== undefined) result = result.filter((t) => t.done === (done === "true"));
  if (q) result = result.filter((t) => t.title.includes(String(q)));
  res.json({ sort, count: result.length, items: result });
});
// GET /api/tasks?done=false&q=milk
// GET /api/tasks?tag=a&tag=b   =>  req.query.tag = ["a", "b"]`,
          try: R`جرّب [[?done=false]] و [[?done=true&q=milk]] و [[?q=a&q=b]]، واطبع [[req.query]] في كل مرة وشوف شكله. وبعدين جرّب [[req.query.page = 2]] واطبعه تاني: القيمة مش هتبقى موجودة.`,
          flag: "script",
          deep: {
            why: "القايمة الواحدة بتتعرض بأكتر من شكل: متفلترة، ومترتبة، وصفحة معينة، ونتيجة بحث. بدل endpoint لكل شكل، endpoint واحد بياخد اختيارات في الـ query.",
            how: R`Express بيقرا الجزء اللي بعد [[?]] ويحوّله لـ object. في Express 5 الافتراضي "simple"، اللي بيستخدم [[querystring]] بتاع Node: كل [[key=value]] بيبقى property، ولو المفتاح اتكرر القيمة بتبقى array، والأقواس زي [[a[b]=1]] بتفضل جزء من اسم المفتاح.

لو محتاج objects متداخلة، فيه [[app.set("query parser", "extended")]] اللي بيستخدم مكتبة qs زي Express 4. بس خلي بالك: ده بيخلي أي حد يبعت objects في الـ query، وده باب لـ NoSQL injection في Mongo ([[?email[$ne]=x]] يبقى [[{ email: { $ne: "x" } }]]).

و [[req.query]] في Express 5 getter: بيتحسب من العنوان من جديد كل ما تقراه. فـ [[req.query.page = 2]] بيروح، و [[req.query = clean]] بيرمي [[Cannot set property query]]. ودي السبب إن مكتبات قديمة زي [[xss-clean]] و [[express-mongo-sanitize]] بتوقع أو مبتشتغلش على Express 5. لو عايز تحفظ النسخة المتحققة، حطها في مكان تاني زي [[req.validatedQuery]] أو [[res.locals]].`,
            when: R`فلترة، وترتيب، وبحث، و pagination ([[?page=2&limit=20]]). أي حاجة اختيارية بتغيّر «شكل» القايمة، مش «أنهي» resource.`,
            mistakes: R`[[if (req.query.done)]] وهي [["false"]]: الـ string مش فاضي فبيتحسب true. وتعدّي [[req.query.sort]] مباشرة لـ [[orderBy]] من غير ما تتأكد إنه من قايمة مسموحة، فحد يرتّب بـ [[password]]. وتحط بيانات حساسة (توكن أو باسورد) في الـ query، فتتسجل في لوجات Nginx وفي history المتصفح.`
          },
          teach: R`## route واحد، وأشكال كتير للقايمة

المثال endpoint واحد [[GET /api/tasks]] بيرجّع المهام، وبيقرا من الـ query اختيارات: [[done]] يفلتر المخلّص من اللي لسه، و [[q]] يبحث في العنوان، و [[sort]] للترتيب. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، بـ ٣ مهام بدل واحدة عشان الفلترة تبان:

~~~text
{ id: 1, title: "buy milk",  done: false }
{ id: 2, title: "read book", done: true  }
{ id: 3, title: "milk cow",  done: true  }
~~~

وزوّدنا [[console.log(req.query)]] في أول الـ handler عشان نشوف Express فهم إيه.

---

## الأول: الـ query شكله إيه

~~~text
/api/tasks?done=true&q=milk
          ^ ^         ^
          | |         & بتفصل بين كل اختيار والتاني
          | key=value
          ? أول الـ query
~~~

Express بيقرا الجزء ده ويحطه في [[req.query]] كـ object، والمسار [[/api/tasks]] لوحده هو اللي بيتقارن بالـ route.

---

## ١. [[const { done, q, sort = "createdAt" } = req.query;]]

ده **destructuring**: بيطلّع ٣ مفاتيح من [[req.query]] في ٣ متغيرات مرة واحدة. و [[sort = "createdAt"]] جواه معناها **default**: لو [[sort]] مش مبعوت (undefined) خد [["createdAt"]].

اللي Express طبعه لكل طلب:

~~~text الناتج في ترمنال السيرفر
/api/tasks                     [Object: null prototype] {}
/api/tasks?done=false          [Object: null prototype] { done: 'false' }
/api/tasks?done=true&q=milk    [Object: null prototype] { done: 'true', q: 'milk' }
/api/tasks?q=a&q=b             [Object: null prototype] { q: [ 'a', 'b' ] }
/api/tasks?tag=a&tag=b         [Object: null prototype] { tag: [ 'a', 'b' ] }
~~~

- كل القيم **strings**: [['false']] مش [[false]].
- المفتاح لو اتكرر بيبقى **array**.
- [[null prototype]] معناها object «عريان» من غير الدوال الموروثة زي [[hasOwnProperty]]. ده مقصود عشان محدش يبعت [[?__proto__=...]] ويلعب في الـ objects.

## ٢. [[let result = tasks;]]

[[let]] مش [[const]] لأننا هنبدّل قيمته بنتيجة كل فلتر.

## ٣. [[if (done !== undefined) result = result.filter((t) => t.done === (done === "true"));]]

نفكه من جوه لبرة:

1. [[done === "true"]] بيحوّل النص لـ boolean: [["true"]] تبقى [[true]]، وأي حاجة تانية [[false]].
2. [[t.done === (...)]] المهمة تعدّي لو حالتها زي المطلوب.
3. [[result.filter(...)]] بيرجّع array جديدة فيها اللي عدّى بس.
4. [[done !== undefined]] الفلتر يشتغل بس لو [[done]] اتبعت أصلًا.

ليه مش [[if (done)]]؟ لأن [["false"]] نص مش فاضي، والنص المش فاضي بيتحسب [[true]] في الـ if. فـ [[?done=false]] كانت هتدخل كأنها مبعوتة صح، بس الأخطر في كود تاني بيكتب [[if (req.query.done)]] ويفتكرها boolean.

## ٤. [[if (q) result = result.filter((t) => t.title.includes(String(q)));]]

- [[includes]] بيشوف النص فيه الكلمة دي ولا لأ.
- [[String(q)]] بيضمن إنها نص. لو اتبعتت مرتين وبقت array، [[String(["a","b"])]] بتبقى [["a,b"]] والكود ميقعش (بس مش هيلاقي حاجة).

## ٥. [[res.json({ sort, count: result.length, items: result })]]

[[{ sort }]] اختصار لـ [[{ sort: sort }]]. و [[count]] العدد عشان الواجهة متعدّش بنفسها.

### الردود

~~~text الناتج
?done=false          {"sort":"createdAt","count":1,"items":[{"id":1,"title":"buy milk","done":false}]}
?done=true&q=milk    {"sort":"createdAt","count":1,"items":[{"id":3,"title":"milk cow","done":true}]}
?q=a&q=b             {"sort":"createdAt","count":0,"items":[]}
?tag=a&tag=b         {"sort":"createdAt","count":3,"items":[...المهام التلاتة...]}
~~~

- [[done=true&q=milk]] الفلترين مع بعض: مخلّصة **و** فيها milk. [[buy milk]] فيها milk بس مش مخلّصة.
- [[q=a&q=b]] بقت [["a,b"]] فمفيش عنوان فيه النص ده.
- [[tag]] مش متقري في الكود أصلًا فاتجاهل.

---

## ٦. الأقواس في الـ query: Express 5 مبيعملش objects

~~~bash
curl -g "localhost:3000/api/tasks?filter[done]=true&sort=title"
~~~

~~~text الناتج في ترمنال السيرفر
[Object: null prototype] { 'filter[done]': 'true', sort: 'title' }
~~~

الـ parser الافتراضي في Express 5 ("simple") ساب [['filter[done]']] اسم مفتاح عادي. في Express 4 (جرّبناه على 4.22.3) نفس الطلب رجّع [[{"filter":{"done":"true"}}]]: object متداخل.

و [[-g]] في curl (globbing off) مهم هنا: من غيره curl بيفتكر الأقواس [ و ] نطاق أرقام ويرفض:

~~~text الناتج من غير -g
curl: (3) bad range in position 33:
~~~

---

## ٧. [[req.query]] مبيتعدّلش

جرّبنا الكلام اللي في الـ try:

~~~text
req.query.page = 2;
console.log("page after set:", req.query.page);
req.query = {};
~~~

~~~text الناتج
page after set: undefined
TypeError: Cannot set property query of #<IncomingMessage> which has only a getter
~~~

- السطر الأول عدّى من غير خطأ بس **ضاع**: [[req.query]] في Express 5 **getter**، يعني دالة بتحلّل العنوان من جديد كل ما تقراه، فبيرجّع object جديد كل مرة.
- السطر التالت وقع بـ TypeError: مفيش setter، فمينفعش تبدّله.

عايز تحفظ قيم بعد ما تنضّفها؟ حطها في متغير، أو [[res.locals]].

---

## الخلاصة

| السؤال | الإجابة في Express 5 |
|---|---|
| نوع القيم؟ | strings، أو array لو المفتاح اتكرر |
| مش مبعوت؟ | [[undefined]]، فحط default |
| [[?done=false]] في if؟ | [[true]]! قارن بـ [[=== "true"]] |
| [[a[b]=1]]؟ | مفتاح اسمه [['a[b]']]، مش object |
| [[req.query.x = 1]]؟ | بيضيع، و [[req.query = ...]] TypeError |`,
          lines: [
            "نفس عنوان كل المهام، والـ query اختياري.",
            "فكّ القيم، وحط default لو sort مش مبعوت.",
            "ابدأ بالكل.",
            R`[[done]] جاية string، فقارنها بـ [["true"]] مش بـ true.`,
            "بحث في العنوان. [[String()]] عشان تضمن إنها نص حتى لو اتبعتت مرتين وبقت array.",
            "رجّع النتيجة ومعاها العدد.",
            "قفلة."
          ],
          sol: R`اللي هيتطبع: [[?done=false]] بيدّي [[{ done: "false" }]] (string مش boolean)، و [[?done=true&q=milk]] بيدّي [[{ done: "true", q: "milk" }]]، و [[?q=a&q=b]] بيدّي [[{ q: ["a", "b"] }]]: نفس المفتاح مرتين بقى array. وده خطر لو الكود بيعمل [[q.toLowerCase()]] مثلًا: TypeError و 500. عشان كده الكود بيعمل [[String(q)]]، وأحسن منه تعمل validation بـ zod (درس [[validate(schema)]]).

و [[req.query.page = 2]] وبعدها [[console.log(req.query.page)]] بيطبع [[undefined]]: في Express 5 [[req.query]] getter بيحلّل الـ URL من جديد كل مرة تقراه، فأي حاجة تكتبها عليه بتضيع. لو عايز تشيل القيم بعد التحويل، حطها في متغير أو في [[res.locals]].

الغلطة الشائعة: [[if (done)]] بدل [[done !== undefined]]، فـ [[?done=false]] يتعامل كأنه true لأن [["false"]] string مش فاضي.`
        },
        {
          cmd: "express.json()",
          title: "اقرا الـ body اللي جاي JSON",
          desc: R`الـ body مش بيتقري لوحده: [[app.use(express.json())]] بيقرا أي طلب نوعه [[application/json]] ويحطه في [[req.body]] كـ object.

ولو الطلب مش JSON، [[req.body]] في Express 5 بيفضل undefined (في Express 4 الـ parser كان بيحط [[{}]] حتى لو ملقاش حاجة يقراها)، ولو مفيش parser خالص يبقى undefined في الاتنين. والحد الافتراضي للحجم 100kb، وأي حاجة أكبر بترجع 413.`,
          example: R`app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));

app.post("/api/tasks", (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }
  const task = { id: tasks.length + 1, title: title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});`,
          try: R`ابعت POST بـ JSON صح، وبعدين نفس الطلب من غير [[-H "Content-Type: application/json"]]، وبعدين JSON بايظ زي [[-d "{bad"]]. شوف الـ status في كل مرة، وفين بيوصل الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ body بيوصل كـ stream من bytes. من غير parser، كل route لازم يجمع الـ chunks ويعمل parse ويتعامل مع JSON بايظ وحجم كبير. [[express.json()]] بيعمل ده مرة واحدة لكل الطلبات.`,
            how: R`[[express.json()]] middleware مبني على body-parser. مع كل طلب بيبص على [[Content-Type]]: لو [[application/json]]، بيقرا الـ stream لحد الآخر (ويقطع لو عدّى [[limit]] ويرمي خطأ 413)، ويعمل [[JSON.parse]]، ويحط النتيجة في [[req.body]]. لو الـ JSON بايظ، بيرمي خطأ الـ status بتاعه 400 ويروح لـ error middleware. ولو الـ Content-Type مش JSON، بيسيب الطلب يعدّي من غير ما يلمس الـ body.

[[strict: true]] (الافتراضي) بيقبل objects و arrays بس، فـ [["hello"]] لوحدها مرفوضة. و [[verify]] option بيدّيك الـ buffer الخام قبل الـ parse، وده مهم للـ webhooks اللي محتاجة تتحقق من توقيع على الـ body بالظبط (درس «التحقق من التوقيع» في تاب «Node و npm»).

و [[express.urlencoded]] للفورمز العادية، و [[extended]] الافتراضي بتاعه بقى false في Express 5. ورفع الملفات ([[multipart/form-data]]) مش شغل ده ولا ده، ده محتاج multer (درس [[multer]]).`,
            when: R`في أي API: [[express.json()]] من أول يوم، قبل الـ routes. وزوّد الـ limit لـ route معين بس لو محتاج (مثلًا import كبير)، مش للسيرفر كله.`,
            mistakes: R`تحطه بعد الـ routes، فـ [[req.body]] يفضل undefined. وتعمل [[limit: "50mb"]] للسيرفر كله عشان endpoint واحد، فأي حد يبعت طلبات ضخمة تاكل الرام. وتحفظ [[{ ...req.body }]] كله في الداتابيز، فحد يبعت [[role: "ADMIN"]] ويترقّى لوحده (mass assignment): اختار الحقول بإيدك أو بـ zod. وفي مشروع حقيقي كان [[verify]] بيحفظ الـ raw body لأي عنوان فيه كلمة webhook ويطبع حجمه في اللوج مع كل طلب. الأنضف [[express.raw({ type: "application/json" })]] على route الـ webhook بس، ويتسجّل قبل [[express.json()]].`
          },
          teach: R`## الـ body محتاج حد يقراه

المثال بيعمل حاجتين: سطرين في الأول بيقولوا لـ Express «اقرا الـ body لو JSON أو فورم»، وبعدهم route بيضيف مهمة بعد ما يتأكد إن [[title]] موجود. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash، وزوّدنا [[console.log("body:", req.body)]] في أول الـ route عشان نشوف اللي وصل.

---

## ١. [[app.use(express.json({ limit: "100kb" }))]]

من جوه لبرة:

- [[express.json(...)]] بيعمل **middleware**: دالة بتشتغل على كل طلب قبل الـ routes (الدرس الجاي بالتفصيل).
- [[{ limit: "100kb" }]] أقصى حجم للـ body: ١٠٠ كيلوبايت. ده الافتراضي أصلًا، اتكتب عشان يبان.
- [[app.use(...)]] بيركّبه على كل الطلبات.

الـ middleware ده بيبص على header الـ [[Content-Type]]: لو [[application/json]] بيقرا الـ body كله ويعمل [[JSON.parse]] ويحطه في [[req.body]]. لو أي نوع تاني، بيعدّي الطلب من غير ما يلمسه.

## ٢. [[app.use(express.urlencoded({ extended: false }))]]

نفس الفكرة للفورمز العادية في HTML، اللي بتتبعت بشكل [[title=from+form&done=1]] ([[+]] = مسافة). [[extended: false]] يعني استخدم الـ parser البسيط (من غير objects متداخلة)، وده الافتراضي في Express 5.

## ٣. [[const title = req.body?.title;]]

[[?.]] (optional chaining): لو [[req.body]] نفسه [[undefined]]، متحاولش تقرا [[.title]] منه (كانت هتبقى TypeError)، ورجّع [[undefined]] على طول.

## ٤. [[if (typeof title !== "string" || !title.trim())]]

شرطين، و [[||]] معناها «أو»: أي واحد فيهم صح يبقى الطلب مرفوض.

- [[typeof title !== "string"]] مش نص؟ (ممكن يبقى undefined، أو رقم، أو array).
- [[!title.trim()]] [[trim()]] بيشيل المسافات من الأول والآخر. لو اللي فاضل نص فاضي [[""]]، فـ [[!""]] بـ [[true]].

والترتيب مهم: لو مش string، [[||]] بيقف عند الأول ومبيجربش [[.trim()]] (اللي كانت هتقع على undefined).

## ٥. [[return res.status(400).json({ error: "title is required" })]]

400 ورسالة واضحة، و [[return]] عشان نخرج.

## ٦. [[const task = { id: tasks.length + 1, title: title.trim(), done: false };]]

بنبني المهمة **بإيدنا** من الحقول اللي احنا عايزينها بس. لو حد بعت [[done: true]] أو [[role: "ADMIN"]] مش هيوصلوا. و [[tasks.length + 1]] id بسيط للتجربة (الداتابيز بتعمله بعدين).

## ٧. [[tasks.push(task); res.status(201).json(task);]]

[[push]] بيضيف للآخر، و [[201 Created]] لأن حاجة جديدة اتعملت.

---

## ٨. نجرّب الحالات

### JSON صح

~~~bash
curl -i localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"  learn  "}'
~~~

~~~text الناتج
HTTP/1.1 201 Created
{"id":2,"title":"learn","done":false}
~~~

وفي ترمنال السيرفر [[body: { title: '  learn  ' }]]: الـ body وصل بالمسافات، والكود عمل [[trim]].

### من غير [[Content-Type]]

~~~bash
curl -i localhost:3000/api/tasks -d '{"title":"learn"}'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
{"error":"title is required"}
~~~

~~~text الناتج في ترمنال السيرفر
body: { '{"title":"learn"}': '' }
~~~

curl لما بتديله [[-d]] من غير header بيبعت [[Content-Type: application/x-www-form-urlencoded]]. فـ [[express.json()]] اتجاهله، و [[express.urlencoded]] قراه كفورم: الـ JSON كله بقى **اسم حقل** قيمته فاضية. و [[title]] مش موجود فالـ route رجّع 400.

### من غير body خالص

~~~bash
curl -i -X POST localhost:3000/api/tasks
~~~

[[body: undefined]] في اللوج، والرد 400. ده الفرق في Express 5: لو مفيش parser قرا حاجة، [[req.body]] بيفضل [[undefined]] (Express 4 كان بيحط [[{}]])، وعشان كده [[?.]] مهمة.

### JSON بايظ

~~~bash
curl -i localhost:3000/api/tasks -H "Content-Type: application/json" -d "{bad"
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
...
<pre>SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)<br> ...
~~~

الـ route **مشتغلش أصلًا** (مفيش سطر [[body:]] في اللوج): [[express.json()]] فشل في [[JSON.parse]] ورمى خطأ status بتاعه 400، و Express رد بصفحة HTML فيها الـ stack. [[position 1]] يعني الحرف رقم ١ (العد من صفر) وهو [[b]]: بعد [[{]] كان مستني اسم حقل بين تنصيص.

### body أكبر من 100kb

عملنا ملف [[big.json]] فيه title طوله ١٢٠ ألف حرف:

~~~bash
curl -i localhost:3000/api/tasks -H "Content-Type: application/json" --data-binary @big.json
~~~

~~~text الناتج
HTTP/1.1 413 Payload Too Large
<pre>PayloadTooLargeError: request entity too large<br> ...
~~~

[[--data-binary @ملف]] بيبعت محتوى الملف زي ما هو. و 413 معناها «الـ body أكبر من المسموح».

### نص لوحده مش object

~~~bash
curl -i localhost:3000/api/tasks -H "Content-Type: application/json" -d '"hello"'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
<pre>SyntaxError: Unexpected token '"', ""hello"" is not valid JSON ...
~~~

[["hello"]] JSON سليم في الحقيقة، بس [[strict: true]] (الافتراضي) بيقبل objects و arrays بس.

### فورم عادي

~~~bash
curl -s localhost:3000/api/tasks -d "title=from+form"
~~~

~~~text الناتج
{"id":3,"title":"from form","done":false}
~~~

ده شغل [[express.urlencoded]]: [[+]] بقت مسافة.

---

## الخلاصة

| اللي اتبعت | مين قراه | [[req.body]] | الرد |
|---|---|---|---|
| JSON + header صح | [[express.json]] | [[{ title: '  learn  ' }]] | 201 |
| JSON من غير header | [[express.urlencoded]] | [[{ '{"title":"learn"}': '' }]] | 400 من الـ route |
| مفيش body | محدش | [[undefined]] | 400 من الـ route |
| [[{bad]] | [[express.json]] وقع | الـ route مشتغلش | 400 HTML |
| أكبر من 100kb | [[express.json]] وقف | الـ route مشتغلش | 413 HTML |
| [[title=from+form]] | [[express.urlencoded]] | [[{ title: 'from form' }]] | 201 |

- الـ parsers تتسجّل **قبل** الـ routes.
- خد الحقول اللي محتاجها بالاسم، متاخدش [[req.body]] كله.
- الـ 400 و 413 الـ HTML دول هيبقوا JSON لما نعمل error handler.`,
          lines: [
            "اقرا أي body نوعه JSON، وأقصى حجم 100kb (ده الافتراضي، كتبناه عشان يبان).",
            "اقرا الفورمز العادية. في Express 5 [[extended]] الافتراضي بقى false.",
            "route إضافة مهمة.",
            "[[?.]] عشان لو الـ body مش موجود أصلًا ميقعش.",
            "لازم نص ومش فاضي.",
            "400 ورسالة واضحة.",
            "قفلة.",
            "اعمل المهمة من الحقول اللي انت عايزها بس، مش من الـ body كله.",
            "احفظها.",
            "201 Created والمهمة الجديدة.",
            "قفلة."
          ],
          sol: R`الطلب الصح بيرجّع [[201 Created]] والمهمة الجديدة.

من غير [[-H "Content-Type: application/json"]]، curl بيبعت [[-d]] كـ [[application/x-www-form-urlencoded]]، فـ [[express.json()]] بيتجاهله و [[express.urlencoded]] هو اللي بيقراه: [[req.body]] بيبقى [[{ '{"title":"learn"}': '' }]] (الـ JSON كله بقى اسم حقل!)، فـ [[title]] بـ undefined والرد [[400]] و [[{"error":"title is required"}]] من الـ route بتاعك. (ولو مفيش urlencoded خالص، [[req.body]] بيبقى undefined، وعشان كده فيه [[?.]].)

والـ JSON البايظ [[-d "{bad"]] بيرجّع [[400 Bad Request]] بس مش من الـ route: [[express.json()]] نفسه بيرمي [[SyntaxError: Expected property name or '}' in JSON at position 1]] قبل ما الـ handler يشتغل، ولأن مفيش error handler لسه، Express بيرجّع صفحة HTML فيها الـ stack كله. بعد درس [[error middleware]] الخطأ ده هيوصل للـ handler بتاعك وفيه [[err.status]] بـ 400 و [[err.type]] بـ [[entity.parse.failed]]، فترجّع JSON نضيف.`
        },
        {
          cmd: "status codes",
          title: "الرقم الصح لكل رد",
          desc: R`الـ status أول حاجة الواجهة بتبص عليها: [[fetch]] بيعتبر أي حاجة من 200 لـ 299 نجاح ([[response.ok]])، والباقي فشل.

فلو رجّعت 200 ومعاه خطأ، الواجهة هتفتكر كل حاجة تمام. الأهم: 200 تمام، و 201 اتعمل، و 204 تمام ومفيش body، و 400 البيانات غلط، و 401 مش عامل login، و 403 عامل login بس مش مسموحلك، و 404 مش موجود، و 409 تعارض (الإيميل مستخدم)، و 422 الشكل صح بس المعنى غلط، و 429 طلبات كتير، و 500 غلطة عندنا.`,
          example: R`res.status(201).location($__bt/api/tasks/$__{task.id}$__bt).json(task);
res.sendStatus(204);
res.status(400).json({ error: "title is required" });
res.status(401).json({ error: "Login required" });
res.status(403).json({ error: "Not your task" });
res.status(404).json({ error: "Task not found" });
res.status(409).json({ error: "Email already used" });
res.status(429).json({ error: "Too many requests" });`,
          try: R`ارجع لكل route في مشروعك واتأكد: الإضافة 201، والمسح 204، و id مش موجود 404، و body ناقص 400. وافتح Console في المتصفح واعمل fetch لكل واحد واطبع [[response.ok]].`,
          flag: "script",
          deep: {
            why: "الـ status بيخلي الواجهة تتصرف صح من غير ما تقرا الرسالة: 401 يوديها صفحة login، و 403 يعرض «ملكش صلاحية»، و 409 يقول «الإيميل مستخدم»، و 5xx يعرض «حاول تاني». ولوحات المراقبة بتعد الـ 5xx عشان تنبّهك. لو كله 200، كل ده بيبوظ.",
            how: R`[[res.status(code)]] بيحدد الرقم ويرجّع res عشان تكمّل بـ [[.json()]]. في Express 5 الرقم لازم integer من 100 لـ 999، وإلا بيرمي خطأ (في 4 كان بيعدّي). و [[res.sendStatus(204)]] بيحط الرقم ويبعت اسمه كـ body، إلا مع 204 و 304 اللي مينفعش يبقى ليهم body أصلًا.

401 مقابل 403: الاسم الرسمي لـ 401 «Unauthorized» مضلل، معناه الحقيقي «unauthenticated»: مش عارفين انت مين. و 403 «Forbidden»: عارفينك ومش مسموحلك. وفي الحاجات الحساسة بعض الـ APIs بترجّع 404 بدل 403 عشان متأكدش إن الحاجة موجودة أصلًا (GitHub بيعمل كده مع الـ repos الخاصة).

400 مقابل 422: 400 الطلب نفسه بايظ (JSON مش سليم، أو حقل ناقص)، و 422 الشكل سليم بس القيمة مش منطقية (تاريخ النهاية قبل البداية). APIs كتير بتستخدم 400 للاتنين، والمهم تثبت على اختيار واحد.

و 500 متبعتهاش بإيدك. سيبها لـ error middleware لما حاجة تقع فعلًا (درس [[error middleware]]).`,
            when: R`مع كل [[res.]] بتكتبه. وثبّت شكل body الخطأ في المشروع كله (مثلًا [[{ error: "..." }]]) عشان الواجهة تقراه بطريقة واحدة.`,
            mistakes: R`200 مع [[{ success: false }]]. و 401 لما اليوزر عامل login بس مش أدمن (المفروض 403)، فالواجهة تعمل logout غلط. و 500 لغلطة validation، فالمراقبة تصرخ على غلطات مستخدمين. و [[res.json(obj, 201)]] بالشكل القديم: Express 5 شاله، استخدم [[res.status(201).json(obj)]].`
          },
          teach: R`## كل سطر = رد بـ status مختلف

المثال ٨ سطور، كل واحد شكل رد هتكتبه كتير: نجاح بإضافة، ونجاح من غير body، و٦ أنواع أخطاء. عشان نجرّبهم حطيناهم في routes حقيقية على ويندوز 11 (Node 24.19، Express 5.2.1) وبعتنالهم بـ curl من Git Bash.

---

## ١. الشكل العام: [[res.status(...).json(...)]]

- [[res.status(201)]] بيحط رقم الـ status **وبيرجّع [[res]] نفسه**، فتقدر تكمّل بنقطة.
- [[.json(...)]] بيبعت الـ body ويقفل الرد.

ده اسمه chaining. ولو منادتش [[status]] خالص، الافتراضي 200.

---

## ٢. [[res.status(201).location(...).json(task)]]

~~~text
res.status(201).location($__bt/api/tasks/$__{task.id}$__bt).json(task);
~~~

٣ حلقات في سلسلة:

1. [[status(201)]] Created: «اتعمل حاجة جديدة».
2. [[.location(...)]] بيحط header اسمه [[Location]] فيه عنوان الحاجة الجديدة. والـ backticks مع [[$__{task.id}]] (template literal) بتحط رقم المهمة جوه النص.
3. [[.json(task)]] الـ body: المهمة نفسها، عشان الواجهة متعملش طلب تاني تجيبها.

~~~text الناتج (curl -i)
HTTP/1.1 201 Created
X-Powered-By: Express
Location: /api/tasks/2
Content-Type: application/json; charset=utf-8
Content-Length: 33

{"id":2,"title":"x","done":false}
~~~

---

## ٣. [[res.sendStatus(204)]]

204 No Content: «تمام، ومفيش حاجة أرجّعهالك». مناسب للمسح.

~~~text الناتج
HTTP/1.1 204 No Content
X-Powered-By: Express
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
~~~

مفيش body ولا [[Content-Type]] ولا [[Content-Length]]. [[sendStatus]] عادةً بيبعت اسم الـ status كنص، يعني [[res.sendStatus(404)]] رجّعت:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=utf-8
Content-Length: 9

Not Found
~~~

بس مع 204 (و 304) HTTP نفسه بيمنع أي body، فـ Express بيشيله.

---

## ٤. الـ ٦ أخطاء

| السطر | الرقم | اسمه | إمتى |
|---|---|---|---|
| [[res.status(400)...]] | 400 | Bad Request | البيانات ناقصة أو شكلها غلط |
| [[res.status(401)...]] | 401 | Unauthorized | مفيش login أو التوكن منتهي |
| [[res.status(403)...]] | 403 | Forbidden | عارفينك، بس ملكش الحق ده |
| [[res.status(404)...]] | 404 | Not Found | مش موجود |
| [[res.status(409)...]] | 409 | Conflict | بيتعارض مع حاجة موجودة (إيميل متسجّل) |
| [[res.status(429)...]] | 429 | Too Many Requests | طلبات كتير، استنى |

~~~text الناتج (curl -s -w " [%{http_code}]")
{"error":"Login required"} [401]
{"error":"Not your task"} [403]
{"error":"Email already used"} [409]
{"error":"Too many requests"} [429]
~~~

الأول بيقولك **مين المسؤول**: 4xx غلطة العميل (يصلّح طلبه)، 5xx غلطة السيرفر (احنا اللي نصلّح). 401 و 403 بيتلخبطوا كتير: 401 = «مش عارفين انت مين»، و 403 = «عارفينك ومش مسموحلك».

---

## ٥. Express 5 بيتشدد في الرقم

جرّبنا [[res.status(99)]]:

~~~text الناتج في ترمنال السيرفر
RangeError: Invalid status code: 99. Status code must be greater than 99 and less than 1000.
    at ServerResponse.status (...\node_modules\express\lib\response.js:71:11)
~~~

يعني الرقم لازم من 100 لـ 999. وجرّبنا الشكل القديم [[res.json({ a: 1 }, 201)]]: مرماش خطأ، بس رجّع **200**، الـ 201 اتجاهلت من غير ولا كلمة. عشان كده الشكل الوحيد الصح [[res.status(201).json(...)]].

---

## ٦. الواجهة بتشوف إيه (solCode)

الـ solCode بيتكتب في Console بتاع المتصفح وانت فاتح أي صفحة من نفس السيرفر (مثلًا [[http://localhost:3000/api/tasks]])، لأن العناوين فيه نسبية ([[/api/tasks]]). شغّلناه في Node بعد ما زوّدنا [[http://localhost:3000]] قبل كل عنوان، لأن [[fetch]] في Node محتاج عنوان كامل (من غيره طلع [[TypeError: Failed to parse URL from /api/tasks]]).

| الحتة | معناها |
|---|---|
| [[for (const [method, url, body] of [...])]] | لف على array من الطلبات، وكل طلب array صغيرة بنفكها لـ ٣ متغيرات |
| [[fetch(url, { method, headers, body })]] | ابعت الطلب |
| [[body && JSON.stringify(body)]] | لو فيه body حوّله نص، ولو مفيش ([[undefined]]) سيبه [[undefined]] |
| [[r.status]] | الرقم |
| [[r.ok]] | [[true]] لو الرقم من 200 لـ 299 |
| [[r.status === 204 ? "(no body)" : await r.json()]] | متقراش JSON من 204 |

~~~text الناتج
POST /api/tasks 201 true { id: 2, title: 'x', done: false }
POST /api/tasks 400 false { error: 'title is required' }
GET /api/tasks/999 404 false { error: 'Task not found' }
DELETE /api/tasks/1 204 true (no body)
~~~

- [[fetch]] **مرماش خطأ** على 400 ولا 404: الطلب «وصل ورجع»، فـ [[fetch]] شايفه نجح. انت اللي لازم تبص على [[r.ok]].
- ولو قريت [[r.json()]] من رد 204:

~~~text الناتج
SyntaxError: Unexpected end of JSON input
~~~

مفيش نص أصلًا، فـ [[JSON.parse]] لقى النهاية على طول.

---

## الخلاصة

| الرقم | [[r.ok]] | الاستخدام |
|---|---|---|
| 200 | true | تمام ومعاه body (الافتراضي) |
| 201 | true | اتعمل، ومعاه [[Location]] |
| 204 | true | تمام ومفيش body: متعملش [[.json()]] |
| 400 / 422 | false | البيانات غلط |
| 401 | false | سجّل دخول |
| 403 | false | ملكش صلاحية |
| 404 | false | مش موجود |
| 409 | false | تعارض |
| 429 | false | استنى |
| 500 | false | غلطة عندنا: سيبها للـ error handler |

- [[fetch]] مبيرميش على 4xx و 5xx، فاقرا [[r.ok]] دايمًا.
- متكتبش [[res.json(obj, 201)]]: Express 5 بيرجّع 200 من غير ما يقولك.`,
          lines: [
            "اتعمل: 201، وفي header الـ [[Location]] عنوانه الجديد، والـ body المهمة نفسها.",
            "اتمسح أو اتعدل ومفيش حاجة ترجع: 204 من غير body.",
            "البيانات اللي جاية ناقصة أو شكلها غلط.",
            "مفيش توكن أو التوكن منتهي: سجّل دخول.",
            "انت معروف، بس ملكش الحق ده.",
            "مش موجود.",
            "بيتعارض مع حاجة موجودة، زي إيميل متسجّل قبل كده.",
            "عدّيت الحد المسموح من الطلبات، استنى."
          ],
          sol: R`في الـ Console، [[response.ok]] بيبقى [[true]] لأي status من 200 لـ 299 بس: الإضافة (201) و المسح (204) [[true]]، و 400 و 404 [[false]]. ومهم: [[fetch]] مبيرميش خطأ على 404 ولا 500، بيرمي بس لو الشبكة وقعت. فالواجهة لازم تبص على [[response.ok]] بنفسها.

وخلي بالك من 204: مفيش body، فـ [[await response.json()]] عليه بيرمي [[SyntaxError: Unexpected end of JSON input]]. اقرا الـ JSON بس لو الـ status مش 204.

لو لقيت route بيرجّع 200 على الإضافة، أو 500 على id مش موجود، أو 200 و [[{ error: ... }]] في الـ body: دي بالظبط الحاجات اللي الـ try بيدوّر عليها، صلّحها.`,
          solCode: R`for (const [method, url, body] of [
  ["POST", "/api/tasks", { title: "x" }],
  ["POST", "/api/tasks", {}],
  ["GET", "/api/tasks/999"],
  ["DELETE", "/api/tasks/1"],
]) {
  const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body && JSON.stringify(body) });
  console.log(method, url, r.status, r.ok, r.status === 204 ? "(no body)" : await r.json());
}
// POST /api/tasks 201 true {...}
// POST /api/tasks 400 false {error: 'title is required'}
// GET /api/tasks/999 404 false {error: 'Task not found'}
// DELETE /api/tasks/1 204 true (no body)`
        }
      ]
    }
]);
