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

TAB("api", {
  label: "Backend بـ Node",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/api && cd ~/lab/api
npm init -y && npm i express
node --watch server.js`,
  labText: "مشروع Express صغير بتكبّره درس بدرس. جرّب الـ endpoints بـ curl (تاب bash) أو REST Client في VS Code.",
  levels: {"1":["الأساس","server و routes و JSON و status codes و middleware"],"2":["API حقيقي","validation، و auth، و cookies، و أمان، ورفع ملفات، وإيميلات، وقاعدة بيانات"],"3":["الإنتاج والانترفيو","realtime، و caching بـ Redis، و jobs، والاختبارات، والمعمارية، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "يعني إيه backend",
      l: 1,
      n: "السيرفر بيستقبل طلب HTTP ويرجّع JSON. هنشوفه بـ Node لوحده الأول، وبعدين بـ Express",
      items: [
        {
          cmd: "backend و API",
          title: "الجزء اللي الواجهة بتكلّمه ومحدش بيشوفه",
          desc: R`الـ backend برنامج شغال على سيرفر، بيستقبل طلبات من الواجهة ويقرا ويكتب في قاعدة البيانات ويرجّع رد، والـ API هي قايمة الطلبات اللي بيقبلها.

كل طلب في الـ API ليه عنوان (URL) و method، والرد غالبًا JSON. والواجهة (React أو موبايل) عمرها ما بتكلّم قاعدة البيانات مباشرة، لأن أي كود في المتصفح المستخدم يقدر يقراه ويعدّله. فالقواعد (مين يشوف إيه، والسعر كام، والكوبون صالح ولا لأ) لازم تعيش في مكان المستخدم ميقدرش يلمسه: السيرفر.

في التاب ده هنبني API واحد لتطبيق مهام (tasks) خطوة بخطوة: من سيرفر فاضي لحد auth وقاعدة بيانات واختبارات.`,
          example: R`curl http://localhost:3000/api/tasks
# [{"id":1,"title":"buy milk","done":false}]
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"learn Express"}'
# {"id":2,"title":"learn Express","done":false}`,
          try: R`لحد ما توصل لدرس [[express()]] وتشغّل السيرفر بتاعك: افتح DevTools على أي موقع بتستخدمه، تاب Network، وفلتر على Fetch/XHR، ودوس على أي طلب وشوف الـ API بتاعه بيرجّع إيه في تاب Response.`,
          deep: {
            why: R`من غير backend، يا إما الموقع ثابت ملوش بيانات، يا إما بتحط مفاتيح قاعدة البيانات في كود الواجهة وأي حد يفتح DevTools ياخدها. الـ backend هو الحارس: بيتأكد مين بيطلب، وإيه المسموحله، وبيعمل الحسابات اللي مينفعش تتساب للعميل.`,
            how: R`الرحلة كاملة: المستخدم بيدوس زرار، والواجهة بتعمل [[fetch]] لعنوان زي [[/api/tasks]]. الطلب بيعدّي على النت ويوصل للسيرفر على بورت معين. برنامج Node شغال ومستني على البورت ده، بيقرا الطلب: method إيه، وعنوان إيه، وفيه body ولا لأ. بيدوّر على الكود المسؤول عن العنوان ده (route)، والكود بيكلّم قاعدة البيانات ويرجّع JSON، والواجهة تاخده وتعرضه.

كلمة API معناها أي «واجهة» برنامج بيكلّم بيها برنامج تاني. في الويب غالبًا بنقصد REST API: كل «حاجة» في النظام (tasks و users و orders) ليها عنوان، والـ method بتقول هتعمل فيها إيه: GET تقرا، و POST تعمل جديد، و PATCH تعدّل، و DELETE تمسح.

والـ backend مش لازم يبقى Node. نفس الفكرة في FastAPI (تاب «Python و FastAPI») وفي PHP (تاب «PHP و MySQL»). اللي بيفرق اللغة، والمفاهيم واحدة: routes و middleware و validation و auth.`,
            when: "أي تطبيق فيه يوزرز، أو بيانات بتتحفظ، أو دفع، أو أي حاجة لازم تتحسب في مكان آمن. موقع landing page ثابت مش محتاج backend.",
            mistakes: R`إنك تحط منطق مهم في الواجهة بس: السعر بيتحسب في React والسيرفر بيصدّق الرقم اللي جاي، فأي حد يبعت طلب بـ curl بسعر ١ جنيه. القاعدة: الواجهة للعرض والراحة، والسيرفر هو اللي بيقرر. وإنك تفتكر إن Supabase أو Firebase معناهم «مفيش backend»: فيه، بس جاهز، والقواعد بتتكتب في RLS أو rules بدل Express.`
          },
          lines: [
            "هات كل المهام. الرد JSON: array من objects.",
            "اعمل مهمة جديدة: الـ method POST، ونوع الـ body في header، والـ body نفسه بعد [[-d]]."
          ]
        },
        {
          cmd: "method و status و headers",
          title: "الطلب والرد في HTTP: أربع حاجات لازم تعرفهم",
          desc: R`كل طلب HTTP فيه method وعنوان و headers وأحيانًا body، وكل رد فيه status code و headers و body.

لو دي أول مرة تسمع الكلام ده، ابدأ بدرس «HTTP: الطلب والرد» في تاب «ابدأ من هنا» وارجع. هنا هنشوفه بعين اللي بيكتب السيرفر: الـ route بيتعرّف بالـ method والعنوان، والـ validation على الـ body، والـ auth في الـ headers، والنتيجة في الـ status.`,
          example: R`curl -v -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"learn HTTP"}'
# > POST /api/tasks HTTP/1.1
# > Content-Type: application/json
# < HTTP/1.1 201 Created
# < Location: /api/tasks/3
# {"id":3,"title":"learn HTTP","done":false}
curl -i http://localhost:3000/api/tasks/999
# HTTP/1.1 404 Not Found`,
          try: R`شغّل [[curl -v]] على أي API عام (زي [[https://api.github.com]]) واقرا السطور اللي بتبدأ بـ [[>]] (اللي انت بعته) و [[<]] (اللي رجع). لاقي الـ status والـ Content-Type.`,
          deep: {
            why: R`كل حاجة في الـ backend مبنية على HTTP. لو مش فاهم شكل الطلب والرد، هتفضل تخمّن ليه الواجهة مش شايفة الرد، أو ليه [[req.body]] فاضي، أو ليه التوكن مش واصل.`,
            how: R`الطلب نص عادي بيتبعت على اتصال TCP. أول سطر: [[POST /api/tasks HTTP/1.1]]. بعده headers كل واحد في سطر، وبعدين سطر فاضي، وبعدين الـ body. والرد نفس الشكل: [[HTTP/1.1 201 Created]]، و headers، وسطر فاضي، والـ body. (HTTP/2 و HTTP/3 بيبعتوا نفس المعلومات بشكل binary أسرع، بس المعنى واحد، و Node بيدّيك نفس الـ req و res.)

الـ methods ليها معنى متفق عليه: GET و HEAD للقراية ومفروض ميغيّروش حاجة (safe). PUT و DELETE لو اتكرروا النتيجة واحدة (idempotent). POST مش idempotent: مرتين يعني مهمتين. و PATCH تعديل جزئي.

الـ headers اللي هتقابلها كل يوم: [[Content-Type]] (نوع الـ body، و Express بيقرر يعمل parse ولا لأ على أساسه)، و [[Authorization]] (التوكن)، و [[Cookie]] و [[Set-Cookie]]، و [[Origin]] (الموقع اللي باعت، وده أساس CORS)، و [[Location]] (عنوان الحاجة اللي اتعملت).

والـ status مجموعات: 2xx تمام، و 3xx روح مكان تاني، و 4xx غلطة العميل، و 5xx غلطة السيرفر. التفاصيل في درس [[status codes]].`,
            when: R`كل ما تكتب route اسأل: method إيه؟ الـ body فين؟ بيرجّع status كام؟ وكل ما حاجة متشتغلش، [[curl -v]] أو تاب Network في DevTools (تاب «المتصفح») بيوريك الطلب والرد زي ما هم.`,
            mistakes: R`تبعت JSON من غير [[Content-Type: application/json]]، فالسيرفر يلاقي [[req.body]] فاضي. وتستخدم GET لحاجة بتغيّر بيانات (زي [[GET /delete?id=5]])، فأي preview أو crawler يمسح بيانات. وترجّع 200 ومعاه [[{ error: "..." }]] في الـ body، فالواجهة و fetch يفتكروا الطلب نجح.`
          },
          lines: [
            "[[-v]] بيطبع الطلب والرد بالتفصيل. السطور اللي بتبدأ بـ > اللي اتبعت، واللي بتبدأ بـ < اللي رجع: 201 وعنوان المهمة الجديدة.",
            "[[-i]] بيعرض الـ status والـ headers مع الـ body. مهمة مش موجودة: 404."
          ]
        },
        {
          cmd: "node:http",
          title: "سيرفر من غير أي مكتبة",
          desc: R`موديول [[http]] اللي جوه Node بيعمل سيرفر: بتدّيله دالة، وهو بينادي عليها مع كل طلب ومعاها object للطلب (req) و object للرد (res).

ده اللي Express مبني عليه. هتلاحظ إنك بتعمل كل حاجة بإيدك: تقارن العنوان، وتكتب الـ header، وتحوّل لـ JSON. وده بالظبط اللي Express بيريّحك منه.`,
          example: R`import { createServer } from "node:http";

const tasks = [{ id: 1, title: "buy milk", done: false }];

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/tasks") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(tasks));
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () => console.log("http://localhost:3000"));`,
          try: R`اكتب [[npm pkg set type=module]] مرة في مشروع الـ lab (عشان [[import]] يشتغل)، وشغّل الملف بـ [[node --watch server.js]]، وجرّب [[curl -i localhost:3000/api/tasks]] وبعدين [[/api/tasks?x=1]]. التانية هتطلع 404 لأن [[req.url]] فيه الـ query كمان. فكّر هتعمل إيه عشان تقرا [[/api/tasks/1]].`,
          flag: "script",
          deep: {
            why: "مش هتكتب سيرفر إنتاج كده، بس لازم تشوفه مرة عشان تفهم إن Express مش سحر. هو دالة واحدة بتستقبل req و res، وكل اللي فوقها تنظيم.",
            how: R`[[createServer]] بيعمل سيرفر TCP بيفهم HTTP. مع كل طلب، Node بيقرا أول سطر والـ headers، ويعمل object اسمه [[IncomingMessage]] (ده req)، و object اسمه [[ServerResponse]] (ده res)، وينادي الدالة بتاعتك.

الـ body مش بييجي جاهز. req عبارة عن stream: الـ body بيوصل على أجزاء (chunks)، ولو عايزه لازم تسمع [[data]] و [[end]] وتجمعه وتعمل [[JSON.parse]] بنفسك، وتتعامل مع JSON بايظ، وتحط حد للحجم عشان محدش يبعتلك 1GB. ده بالظبط شغل [[express.json()]].

و [[req.url]] بيبقى [[/api/tasks?done=true]] كله، فلو عايز الـ query لازم [[new URL(req.url, "http://x")]]. ومفيش routes: عايز [[/api/tasks/:id]]؟ اكتب regex بنفسك.

وكل ده شغال على الـ event loop: الدالة بتتنادى لكل طلب على نفس الـ thread. طول ما انت مستني قاعدة بيانات بـ await، Node بيخدم طلبات تانية. بس لو عملت حسبة تقيلة sync، كل الطلبات بتقف (درس «blocking و الـ main thread» في تاب «JavaScript»).`,
            when: "سكربت صغير أو webhook واحد من غير dependencies، أو عشان تفهم Express من جوه. لأي API حقيقي استخدم Express أو Fastify أو Hono.",
            mistakes: R`تنسى [[res.end()]] فالطلب يفضل معلّق لحد الـ timeout. وتكتب [[res.writeHead]] بعد ما بعتّ جزء من الـ body، فيطلع خطأ [[ERR_HTTP_HEADERS_SENT]]. ده نفس الخطأ اللي هتشوفه في Express لو بعتّ رد مرتين.`
          },
          lines: [
            "استورد createServer من موديول http المبني في Node. البادئة [[node:]] بتأكد إنه موديول Node مش باكدج من npm.",
            "بيانات في الذاكرة بدل قاعدة بيانات، للتجربة.",
            "اعمل سيرفر، والدالة دي بتتنادى مع كل طلب.",
            "انت اللي بتقارن الـ method والعنوان بإيدك.",
            "اكتب الـ status والـ headers.",
            "حوّل لـ JSON بإيدك، وابعت، واقفل الرد.",
            "قفلة الـ if.",
            "أي عنوان تاني: 404.",
            "والـ body رسالة خطأ JSON.",
            "قفلة الدالة.",
            "ابدأ استقبل على بورت 3000."
          ]
        },
        {
          cmd: "express()",
          title: "نفس السيرفر بمكتبة بتنظّم الشغل",
          desc: R`[[express()]] بيعمل app تسجّل فيه routes بـ [[app.get]] و [[app.post]]، و [[res.json]] بيحوّل ويكتب الـ header لوحده، و [[app.listen]] بيشغّله.

التاب ده على Express 5 (النسخة اللي [[npm i express]] بتنزّلها دلوقتي)، وأي فرق عن Express 4 هنقوله في وقته، لأنك هتقابل كود Express 4 كتير في المشاريع القديمة والـ tutorials.`,
          example: R`import express from "express";

const app = express();
const tasks = [{ id: 1, title: "buy milk", done: false }];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("API on http://localhost:3000");
});`,
          try: R`قارن الملف ده بملف [[node:http]]: نفس الشغل ونص الكود. جرّب [[/api/tasks?x=1]]: المرة دي هتشتغل. وشغّل نسختين من السيرفر على نفس البورت وشوف الخطأ اللي بيوصل للـ callback.`,
          flag: "script",
          deep: {
            why: "كل backend محتاج نفس الحاجات: routes بـ params، وقراية JSON، وردود JSON، وطبقات بتتعمل قبل كل طلب (auth و logging). Express بيدّيك الحاجات دي بشكل بسيط ومعروف، وهو أشهر مكتبة backend في Node، فأي مشروع هتدخله غالبًا فيه Express.",
            how: R`[[express()]] بيرجّع دالة [[(req, res)]] عادية، و [[app.listen]] جواها بيعمل [[http.createServer(app).listen(...)]]. يعني Express قاعد فوق نفس موديول http، وبيزوّد على req و res دوال زي [[res.json]] و [[res.status]] و [[req.params]] و [[req.query]].

[[app.get(path, handler)]] بيسجّل «لو جالك GET على العنوان ده، نادي الدالة دي». Express بيحتفظ بقايمة (stack) بكل الـ routes والـ middleware بالترتيب، ومع كل طلب بيمشي عليها من فوق لتحت لحد ما حاجة ترد.

في Express 5، لو السيرفر مقدرش يفتح البورت (مثلًا [[EADDRINUSE]] لأن البورت مشغول)، الخطأ بيوصل كأول argument للـ callback بتاع [[listen]]. في Express 4 كان بيطلع كـ event منفصل، ولو محدش سمعه العملية تقع.

و [[app.listen]] بيرجّع الـ server نفسه. احتفظ بيه في متغير لو هتحتاج تقفله بعدين (درس «الإغلاق النضيف» في تاب «Node و npm»).`,
            when: "أي REST API في Node. البدائل: Fastify (أسرع وفيه validation مدمج)، و Hono (خفيف وبيشتغل على edge)، و NestJS (معمارية كاملة فوق Express أو Fastify). المفاهيم هنا بتتنقل لأي واحد فيهم.",
            mistakes: R`تنسخ كود من tutorial قديم فيه [[app.get("*")]] أو [[app.options("*", cors())]]، والسيرفر يقع وهو بيقوم بـ [[Missing parameter name]]، لأن Express 5 غيّر شكل الـ paths (درس [[req.params]]). شوف النسخة في package.json قبل ما تنسخ. و [[npm init -y]] بقى بيكتب [[type: commonjs]] صراحة، فلو نسيت [[npm pkg set type=module]] هيطلعلك [[Cannot use import statement outside a module]].`
          },
          lines: [
            "استورد Express.",
            "اعمل app.",
            "نفس البيانات.",
            "لو جالك GET على العنوان ده، نادي الدالة دي.",
            "[[res.json]] بيحوّل لـ JSON ويحط Content-Type و status 200 لوحده.",
            "قفلة الـ route.",
            "ابدأ استقبل على 3000. في Express 5 أي خطأ في الفتح بيوصل هنا.",
            "لو البورت مشغول مثلًا، اوقع بخطأ واضح.",
            "اطبع العنوان.",
            "قفلة."
          ]
        }
      ]
    },
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
          lines: [
            "كل المهام.",
            "مهمة واحدة برقمها. [[:id]] ده param.",
            "مهمة جديدة، والبيانات في الـ body.",
            "تعديل جزئي لمهمة.",
            "مسح مهمة.",
            "نفس العنوان لأكتر من method في مكان واحد.",
            "GET على العنوان ده.",
            "و PATCH عليه، والفاصلة المنقوطة بتقفل السلسلة."
          ]
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
          ]
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
          lines: [
            "نفس عنوان كل المهام، والـ query اختياري.",
            "فكّ القيم، وحط default لو sort مش مبعوت.",
            "ابدأ بالكل.",
            R`[[done]] جاية string، فقارنها بـ [["true"]] مش بـ true.`,
            "بحث في العنوان. [[String()]] عشان تضمن إنها نص حتى لو اتبعتت مرتين وبقت array.",
            "رجّع النتيجة ومعاها العدد.",
            "قفلة."
          ]
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
          ]
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
          lines: [
            "اتعمل: 201، وفي header الـ [[Location]] عنوانه الجديد، والـ body المهمة نفسها.",
            "اتمسح أو اتعدل ومفيش حاجة ترجع: 204 من غير body.",
            "البيانات اللي جاية ناقصة أو شكلها غلط.",
            "مفيش توكن أو التوكن منتهي: سجّل دخول.",
            "انت معروف، بس ملكش الحق ده.",
            "مش موجود.",
            "بيتعارض مع حاجة موجودة، زي إيميل متسجّل قبل كده.",
            "عدّيت الحد المسموح من الطلبات، استنى."
          ]
        }
      ]
    },
    {
      t: "Middleware والتنظيم",
      l: 1,
      n: "كل طلب بيعدّي على طبقات بالترتيب، والمشروع بيتقسم routes و controllers و services",
      items: [
        {
          cmd: "middleware",
          title: "دالة بتشتغل قبل الـ route وتقرر يكمّل ولا لأ",
          desc: R`الـ middleware دالة [[(req, res, next)]] بتقرا الطلب أو تعدّل عليه، وبعدين يا إما ترد وتنهي، يا إما تنادي [[next()]] فالطلب يكمّل للي بعدها.

[[express.json()]] middleware، و auth middleware، و logger middleware. كلهم نفس الشكل.`,
          example: R`function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(req.method, req.originalUrl, res.statusCode, Date.now() - start + "ms");
  });
  next();
}

function requireApiKey(req, res, next) {
  if (!process.env.API_KEY || req.get("x-api-key") !== process.env.API_KEY) return res.status(401).json({ error: "Bad key" });
  next();
}

app.use(logger);
app.get("/api/admin/stats", requireApiKey, (req, res) => res.json({ tasks: tasks.length }));`,
          try: R`شيل [[next()]] من logger وجرّب أي طلب: هيفضل معلّق. رجّعها، وجرّب [[/api/admin/stats]] بـ [[-H "x-api-key: ..."]] صح وغلط.`,
          flag: "script",
          deep: {
            why: "حاجات كتير لازم تحصل لكل الطلبات أو لمجموعة منها: قراية JSON، وتسجيل، وتحقق من التوكن، و rate limit. بدل ما تكررها في كل route، بتكتبها مرة كـ middleware وتركّبها.",
            how: R`Express جواه stack: array فيها كل [[app.use]] و [[app.get]] بالترتيب اللي اتكتبوا بيه. مع كل طلب بيبدأ من أول واحد: لو الـ path مطابق، بينادي الدالة ويدّيها [[next]]. لما تنادي [[next()]]، Express ينقل للي بعده. ولو رديت ([[res.json]]) من غير next، السلسلة تقف هنا.

[[next(err)]] بأي argument (غير الكلمتين [["route"]] و [["router"]]) معناها «حصل خطأ»: Express بيتخطى كل الـ middleware العادية ويروح لأول error middleware (اللي ليها ٤ arguments). و [[next("route")]] بيتخطى باقي handlers الـ route الحالي بس، و [[next("router")]] بيخرج من الـ router كله.

[[app.use(path, fn)]] بيطابق أي method وأي عنوان بيبدأ بالـ path. [[app.get(path, fn)]] GET بس والعنوان بالظبط. وتقدر تحط أكتر من middleware في route واحد: [[app.post("/x", auth, validate, handler)]]، وبيتنفذوا بالترتيب.

[[res.on("finish")]] بيتنادى بعد ما الرد يتبعت، فده المكان الصح تقيس فيه المدة وتعرف الـ status النهائي. و [[req.originalUrl]] العنوان الكامل حتى لو الـ middleware متركّب على path جزئي.`,
            when: R`أي حاجة مشتركة: auth، و logging، و rate limit، و CORS، و validation، وتحميل حاجة من الداتابيز قبل الـ handler (زي [[loadTask]] يجيب المهمة ويحطها في [[req.task]]).`,
            mistakes: R`تنسى [[next()]] في فرع من الفروع فالطلب يتعلق. أو العكس: تنادي [[next()]] بعد ما رديت، فاللي بعدك يحاول يرد تاني ويطلع [[Cannot set headers after they are sent]]. الحل: [[return res.status(...)]] دايمًا. وفي مشروع حقيقي كان middleware بيبدّل [[res.send]] بنسخة بتسجّل كل رد 4xx. ده بيشتغل بس هش، و [[res.on("finish")]] أنضف وبيمسك كل الردود.`
          },
          lines: [
            "middleware: الطلب، والرد، و next اللي بتكمّل.",
            "سجّل وقت البداية.",
            "لما الرد يخلص ويتبعت...",
            "اطبع الـ method والعنوان والـ status والمدة.",
            "قفلة الـ listener.",
            "كمّل للي بعدي. من غيرها الطلب يفضل معلّق.",
            "قفلة.",
            "middleware بيحمي route.",
            "المفتاح غلط أو مش مبعوت، أو API_KEY مش متظبط في البيئة؟ رد وانهي، ومفيش next. (من غير الشرط الأول، لو المتغير ناقص والطلب من غير header، undefined هتساوي undefined والطلب يعدّي).",
            "المفتاح صح؟ كمّل.",
            "قفلة.",
            "[[app.use]]: شغّل logger على كل الطلبات.",
            "middleware على route واحد بس: بيتحط قبل الـ handler."
          ]
        },
        {
          cmd: "ترتيب الـ middleware",
          title: "ليه سطر في المكان الغلط بيبوّظ السيرفر كله",
          desc: R`Express بيمشي على الـ middleware بالترتيب اللي كتبتها بيه، فالترتيب جزء من المنطق.

اللي بيجهّز الطلب (helmet و cors و json و logger) الأول، وبعدين الـ routes، وبعدين 404 لأي حاجة ملقتش route، وآخر حاجة error handler.`,
          example: R`app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use("/api/auth/login", loginLimiter);

app.get("/health", healthCheck);
app.use("/api/auth", authRouter);
app.use("/api/tasks", requireAuth, tasksRouter);

app.use(notFound);
app.use(errorHandler);`,
          try: R`انقل [[app.use(express.json())]] تحت الـ routes وجرّب POST: [[req.body]] هيبقى undefined. وانقل [[notFound]] فوق الـ routes: كل حاجة هتبقى 404.`,
          flag: "script",
          deep: {
            why: "أغلب «الـ middleware مش شغال» سببه الترتيب مش الكود: auth بعد الـ route فالـ route مكشوف، أو json بعد الـ route فالـ body فاضي، أو error handler في النص فمبيمسكش أخطاء اللي تحته.",
            how: R`كل طلب بيعدّي على الـ stack من فوق لتحت، وأول حاجة ترد بتنهي الرحلة. فاسأل عن كل middleware: «محتاج يشتغل قبل مين؟».

helmet و cors فوق عشان حتى رد 401 أو 429 ياخد الـ headers. لو CORS تحت الـ rate limiter، رد 429 هيوصل للمتصفح من غير [[Access-Control-Allow-Origin]]، فالواجهة تشوف «CORS error» بدل «Too many requests»، وتفضل تدوّر في المكان الغلط.

[[notFound]] مجرد middleware من غير path بعد كل الـ routes: لو الطلب وصله، معناها محدش رد. و [[errorHandler]] بـ ٤ arguments، و Express بيعرفه من عدد الـ arguments، فلازم تكتب الأربعة حتى لو مش هتستخدم [[next]].

و [[app.use("/api/tasks", requireAuth, tasksRouter)]] بيحمي الـ router ده بس، و [[/health]] فوقه مش محمي. ده أوضح من إنك تحط auth على كل حاجة وتعمل استثناءات بـ if.`,
            when: "كل ما تضيف middleware اسأل مكانه فين. والشكل ده (security، ثم parsing، ثم logging، ثم routes، ثم 404، ثم errors) ينفع لأغلب الـ APIs.",
            mistakes: R`في مشروع حقيقي كان الـ handler بتاع الـ rate limiter العام بيسجّل [[req.user?.id]] مع كل رد 429، والـ limiter نفسه متركّب قبل auth، فالقيمة دايمًا guest واللوج ملوش فايدة. وتحط auth جوه الـ controller بدل الـ route، فأول route جديد تنساه فيه يبقى مفتوح.`
          },
          lines: [
            "security headers أول حاجة، عشان تتحط على كل رد حتى ردود الأخطاء.",
            "CORS قبل الـ routes، عشان طلبات الـ preflight (OPTIONS) تترد من غير ما توصل لـ auth.",
            "اقرا الـ body قبل أي حاجة محتاجاه.",
            "سجّل كل طلب.",
            "حد أشد لمحاولات login بس، قبل route الـ auth.",
            "health check قبل الـ auth، عشان Docker أو Nginx يسألوه من غير توكن.",
            "routes الـ auth (login و register) مش محتاجة توكن.",
            "كل routes المهام محمية: auth الأول وبعدين الـ router.",
            "أي طلب وصل هنا ملقاش route: 404 بـ JSON.",
            "error handler آخر واحد، بـ ٤ arguments."
          ]
        },
        {
          cmd: "express.Router",
          title: "قسّم الـ routes على ملفات",
          desc: R`[[express.Router()]] «app صغير» ليه routes و middleware بتوعه، بتعمله لكل جزء (tasks و users و auth) في ملف وتركّبه على path.

جوه الـ router العناوين نسبية: [[router.get("/:id")]] متركّب على [[/api/tasks]] يبقى فعليًا [[/api/tasks/:id]].`,
          example: R`// routes/tasks.routes.js
import { Router } from "express";
import * as tasks from "../controllers/tasks.controller.js";

const router = Router();
router.get("/", tasks.list);
router.post("/", tasks.create);
router.get("/:id", tasks.getOne);
router.patch("/:id", tasks.update);
router.delete("/:id", tasks.remove);
export default router;

// app.js
app.use("/api/tasks", tasksRouter);`,
          try: R`انقل routes المهام لـ [[routes/tasks.routes.js]] واتأكد إن كل curl لسه شغال. وبعدين اعمل router تاني لـ [[/api/users]] بنفس الشكل.`,
          flag: "script",
          deep: {
            why: "API حقيقي فيه عشرات الـ endpoints. في ملف واحد بيبقى ألف سطر ومحدش يلاقي حاجة، وكل تعديل بيعمل conflicts في Git. الـ router بيدّي كل جزء ملفه ومسؤوليته.",
            how: R`الـ Router نفسه middleware: [[app.use("/api/tasks", router)]] معناها «أي طلب بيبدأ بـ [[/api/tasks]] ابعته للـ router ده». Express بيشيل الجزء المتطابق من [[req.url]] قبل ما يدّيه للـ router، فالـ router شايف [[/5]] بدل [[/api/tasks/5]]، والعنوان الكامل موجود في [[req.originalUrl]]، والجزء المتشال في [[req.baseUrl]].

الـ router ليه stack لوحده، فـ [[router.use(requireAuth)]] جواه بيحمي كل routes الملف ده بس.

لو الـ router متركّب على path فيه param زي [[/api/projects/:projectId/tasks]]، الـ router مش هيشوف [[projectId]] إلا لو عملته بـ [[Router({ mergeParams: true })]].

وفي Express 5 اتشال [[app.del]] (بقى [[delete]] بس)، واتشال الشكل القديم [[router.param(fn)]] اللي بياخد دالة من غير اسم، والاسم بقى من غير [[:]] في أوله: [[router.param("id", fn)]] مش [[":id"]].`,
            when: "من أول ما يبقى عندك أكتر من resource: router لكل resource أو لكل feature.",
            mistakes: R`تنسى [[mergeParams]] في nested router، فـ [[req.params.projectId]] يطلع undefined وانت متأكد إنه في العنوان. وتكتب [[router.get("/api/tasks/:id")]] جوه router متركّب أصلًا على [[/api/tasks]]، فالعنوان الحقيقي يبقى [[/api/tasks/api/tasks/:id]].`
          },
          lines: [
            "Router من Express.",
            "كل دوال الـ controller في object واحد اسمه tasks.",
            "router جديد.",
            "[[GET /api/tasks]].",
            "[[POST /api/tasks]].",
            "[[GET /api/tasks/:id]].",
            "تعديل.",
            "مسح.",
            "صدّره عشان app يركّبه.",
            "في app.js: ركّب الـ router على [[/api/tasks]]."
          ]
        },
        {
          cmd: "routes / controllers / services",
          title: "كل طبقة ليها شغلانة واحدة",
          desc: R`الـ route بيقول «العنوان ده يروح لمين»، والـ controller بيقرا الطلب ويرد (HTTP بس)، والـ service فيها المنطق الحقيقي وبتكلّم الداتابيز ومتعرفش حاجة عن req و res.

الفايدة: الـ service تقدر تناديها من route، أو من cron job، أو من سكربت، أو من اختبار، من غير Express خالص.`,
          example: R`// controllers/tasks.controller.js
export async function create(req, res) {
  const task = await tasksService.create(req.user.id, req.body);
  res.status(201).json(task);
}

// services/tasks.service.js
export async function create(userId, data) {
  const count = await prisma.task.count({ where: { userId } });
  if (count >= 500) throw new AppError(409, "Task limit reached");
  return prisma.task.create({ data: { title: data.title, userId } });
}`,
          try: R`قسّم مشروعك لـ controllers و services. وبعدين اكتب سكربت صغير [[scripts/count.js]] بيستورد الـ service ويطبع عدد المهام من غير ما يشغّل Express. لو احتجت تستورد حاجة من Express في السكربت، يبقى فيه منطق HTTP دخل الـ service.`,
          flag: "script",
          deep: {
            why: "لما المنطق كله جوه الـ route، مبتقدرش تعيد استخدامه: الـ cron job اللي بيقفل المهام القديمة لازم ينسخ نفس الكود، والاختبار لازم يعمل طلب HTTP كامل عشان يختبر حسبة. والملف بيكبر لحد ما محدش يفهمه.",
            how: R`القاعدة: كل طبقة بتعرف اللي تحتها بس. الـ route بيعرف الـ controller، والـ controller بيعرف الـ service، والـ service بتعرف الداتابيز. عمر الـ service ما تستورد [[express]] أو تلمس [[res]].

الـ controller رقيق: يقرا من [[req.params]] و [[req.body]] و [[req.user]]، وينادي service، ويختار الـ status. والـ validation ممكن تبقى middleware قبله (درس [[validate(schema)]]).

الأخطاء بتطلع من الـ service كـ [[AppError]] فيها status، والـ controller مش بيمسكها أصلًا: في Express 5 أي خطأ من async handler بيروح لوحده لـ error middleware.

وفيه شكلين للفولدرات: حسب الطبقة ([[controllers/]] و [[services/]]) أو حسب الـ feature ([[modules/tasks/]] وجواه [[tasks.routes.js]] و [[tasks.controller.js]] و [[tasks.service.js]]). في مشروع حقيقي فيه أكتر من ٢٥ feature كان كل واحد في فولدره، ودا أسهل لما المشروع يكبر لأن كل حاجة تخص الـ feature في مكان واحد. وتنظيم الفولدرات حسب الـ feature بالتفصيل في درس «feature folders» في تاب «بناء مشروع كامل».`,
            when: R`من أول ما يبقى فيه منطق أكتر من «هات من الداتابيز ورجّع». مشروع صغير جدًا (٣ endpoints) ممكن يعيش في ملف واحد، وده مش عيب.`,
            mistakes: R`service بتاخد [[req]] كله أو بترجع [[res.json]]، فمتقدرش تناديها من cron. و controller فيه ١٠٠ سطر حسابات. وفي مشروع حقيقي كان فيه service واحدة للأدمن أكتر من ٣٨٠٠ سطر فيها كل حاجة الأدمن بيعملها: قسّم حسب الـ feature، مش حسب مين بيستخدمها.`
          },
          lines: [
            "الـ controller: بياخد من req ويرد بـ res، ومفيش منطق.",
            "بينادي الـ service بالبيانات اللي محتاجاها بس، مش req كله.",
            "يرد 201.",
            "قفلة.",
            "الـ service: دالة عادية، مفيهاش req ولا res.",
            "قاعدة من قواعد البيزنس: حد أقصى للمهام.",
            "لو عدّاه، ارمي خطأ بـ status، والـ error middleware يرد.",
            "اعمل المهمة في الداتابيز ورجّعها.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "الأخطاء والإعدادات",
      l: 1,
      n: "مكان واحد يرد على كل الأخطاء، و Express 5 بيمسك أخطاء async لوحده، والإعدادات متحققة قبل أول طلب",
      items: [
        {
          cmd: "error middleware",
          title: "مكان واحد يرد على كل الأخطاء",
          desc: R`بدل ما كل route يكتب [[res.status(500)]]، بترمي خطأ من أي مكان، و middleware واحد في الآخر بـ ٤ arguments [[(err, req, res, next)]] بيحوّله لرد JSON.

اعمل class للأخطاء المتوقعة فيه status ورسالة تتعرض للمستخدم، وأي خطأ تاني يبقى 500 برسالة عامة، والتفاصيل في اللوج بس.`,
          example: R`// lib/errors.js
export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// middlewares/error.js
export const notFound = (req, res) => res.status(404).json({ error: "Route not found" });

export function errorHandler(err, req, res, next) {
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`,
          try: R`في [[getTask]] اكتب [[throw new AppError(404, "Task not found")]] بدل [[res.status(404)]]. وفي route تاني اكتب [[throw new Error("db password is 123")]] واتأكد إن الرد «Internal server error» والرسالة الحقيقية في الترمنال بس.`,
          flag: "script",
          deep: {
            why: R`من غير مكان واحد للأخطاء، كل route بيرد بشكل مختلف: واحد [[{ message }]] وواحد [[{ error }]] وواحد نص. والأخطر إن رسالة خطأ داتابيز توصل للمستخدم وفيها أسماء جداول أو استعلامات. و Express لوحده بيرجّع صفحة HTML فيها الـ stack في التطوير.`,
            how: R`Express بيعرف الـ error middleware من عدد الـ arguments: ٤. لما أي middleware ينادي [[next(err)]] أو يرمي خطأ (أو في Express 5 async function ترجع promise مرفوض)، Express بيتخطى كل الـ middleware العادية ويدوّر على أول error middleware بعد مكان الخطأ.

لو الرد اتبدأ خلاص ([[res.headersSent]]) وحصل خطأ في النص (مثلًا وانت بتبعت stream)، مينفعش تغيّر الـ status. الصح هنا [[return next(err)]] عشان الـ handler الافتراضي بتاع Express يقفل الاتصال.

الأخطاء اللي جاية من مكتبات ليها أشكال مختلفة: body-parser بيحط [[status]] (400 أو 413)، و multer بيرمي [[MulterError]] ليه [[code]]، و zod بيرمي [[ZodError]]، و Prisma بيرمي خطأ فيه [[code]] زي [[P2002]] (قيمة مكررة) و [[P2025]] (مش موجود). الـ error handler الناضج بيحوّل دول لـ status صح: ZodError لـ 400، و P2002 لـ 409، و P2025 لـ 404.

والـ stack يتسجل في اللوج دايمًا (درس [[pino]])، ويروح للمستخدم في التطوير بس لو حبيت.`,
            when: "في كل API من أول يوم. وهو المكان الوحيد اللي بيقرر شكل الخطأ اللي الواجهة بتشوفه.",
            mistakes: R`في مشروع حقيقي كان الـ error handler بيقارن [[error.message]] بنصوص ثابتة زي «File too large...» عشان يعرف الـ status، فلو حد عدّل الرسالة في مكان تاني، الـ status يبوظ. استخدم class أو [[code]]. وفي مشروع تاني كان بيرجّع [[err.message]] لأي خطأ حتى الـ 500، فرسايل Mongo الداخلية كانت بتوصل للمستخدم. وتكتب ٣ arguments بس، فـ Express يعامله كـ middleware عادي ومبيتناداش على الأخطاء خالص.`
          },
          lines: [
            "خطأ متوقع ليه status.",
            "بياخد الرقم والرسالة.",
            "الرسالة تتحط زي أي Error عادي.",
            "ويشيل الـ status معاه.",
            "قفلة الـ constructor.",
            "قفلة الـ class.",
            "لأي عنوان ملوش route: 404 بـ JSON بدل صفحة HTML.",
            "٤ arguments: كده Express يعرف إنه error handler. [[next]] لازم تتكتب حتى لو مش مستخدمة.",
            "الـ status من الخطأ لو موجود (body-parser بيحط [[status]])، وإلا 500.",
            "أخطاء السيرفر بس تتسجل بالتفاصيل.",
            "رسالة المستخدم للأخطاء المتوقعة، ورسالة عامة لأي 500 عشان منسرّبش تفاصيل.",
            "قفلة."
          ]
        },
        {
          cmd: "async errors في Express 5",
          title: "await فشل جوه route: مين بيمسكه؟",
          desc: R`في Express 5، لو async handler أو middleware رمى خطأ أو promise اترفض، Express بيمسكه ويبعته لـ error middleware لوحده.

فمش محتاج [[try/catch]] و [[next(err)]] في كل controller. في Express 4 ده مكنش بيحصل: الخطأ بيبقى unhandled rejection والسيرفر يقع. عشان كده هتلاقي في الكود القديم [[try/catch]] في كل دالة، أو [[asyncHandler]]، أو مكتبة [[express-async-errors]].`,
          example: R`// Express 5: كفاية كده
router.get("/:id", async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (!task) throw new AppError(404, "Task not found");
  res.json(task);
});

// Express 4: لازم تمسكه بإيدك
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ده مش هيتمسك في أي نسخة: الخطأ بيحصل بعد ما الـ handler خلص
router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });`,
          try: R`اعمل route async بيرمي خطأ وجرّبه على Express 5، وشوف رد الـ error handler. وبعدين في فولدر تاني [[npm i express@4]] وجرّب نفس الكود: السيرفر هيقع بـ unhandled rejection (Node 15 وأحدث بيقفل العملية عليه).`,
          flag: "script",
          deep: {
            why: "أغلب كود الـ backend async: داتابيز، و APIs خارجية، وملفات. لو كل دالة محتاجة try/catch عشان الخطأ ميوقعش السيرفر، هتنسى مرة، والمرة دي هي اللي هتوقع الإنتاج.",
            how: R`Express 5 بعد ما ينادي أي handler بيبص على اللي رجع: لو promise (وأي async function بترجع promise)، بيمسك الرفض ويبعته لـ [[next(err)]]. فأي [[throw]] جوه async function، أو [[await]] لحاجة اترفضت، بيوصل للـ error handler لوحده.

الشرط إن الـ promise يرجع فعلًا من الـ handler. لو كتبت [[promise.then(...)]] من غير [[return]]، أو الخطأ حصل جوه [[setTimeout]] أو callback قديم أو event emitter، Express مش شايفه. ده بيبقى uncaught exception أو unhandled rejection على مستوى العملية كلها، و Node بيقفل العملية عليه. عشان كده في درس «الإغلاق النضيف» في تاب «Node و npm» فيه [[process.on("unhandledRejection")]] كشبكة أمان أخيرة، مش كطريقة معالجة.

والـ services لسه ممكن تمسك أخطاء بعينها وتحوّلها: [[catch (e) { if (e.code === "P2002") throw new AppError(409, "Email already used"); throw e; }]]. المهم ترمي الباقي تاني ومتبلعهوش.`,
            when: R`كل مشروع جديد: Express 5 و async handlers من غير try/catch. ولو شغال على مشروع Express 4: [[asyncHandler]] حوالين كل async route، أو ترقّي لـ 5 (وخد بالك من تغييرات الـ paths).`,
            mistakes: R`في مشروع حقيقي على Express 5 كان كل controller فيه [[try { ... } catch (e) { next(e); }]]. مش غلط، بس مئات السطور ملهاش لازمة ومصدر نسيان. وتكتب [[catch (e) { console.log(e) }]] وخلاص، فالطلب يتعلق من غير رد والخطأ يضيع. وتفتكر إن Express 5 بيمسك الأخطاء في [[setTimeout]] أو [[stream.on("error")]]: مبيمسكش غير الـ promise اللي راجع من الـ handler.`
          },
          lines: [
            "async handler عادي، مفيش try/catch.",
            "لو الـ service رمت خطأ أو الداتابيز وقعت، Express 5 بيمسكه.",
            "و throw بإيدك برضه بيوصل للـ error handler.",
            "رد عادي لو كله تمام.",
            "قفلة.",
            "الحل القديم في Express 4: غلاف بيمسك الـ promise ويبعته لـ next.",
            "خطأ جوه callback بعدين: Express مش شايفه، والعملية كلها ممكن تقع."
          ]
        },
        {
          cmd: "config.js بـ zod",
          title: "الإعدادات من البيئة، متحققة من أول ثانية",
          desc: R`الإعدادات (البورت، ورابط الداتابيز، وسر الـ JWT) بتيجي من متغيرات البيئة، و [[config.js]] واحد بيقراها ويتحقق منها بـ zod عشان السيرفر يقع وهو بيقوم لو حاجة ناقصة.

القيم بتدخل [[process.env]] بـ [[node --env-file=.env server.js]] في Node الحديث أو بمكتبة dotenv (التفاصيل في درس «.env و متغيرات البيئة» في تاب «Node و npm»). بس [[process.env]] كله strings وممكن أي حاجة تبقى ناقصة، فالأحسن تعرف ده من أول ثانية، مش بعد ساعة في نص طلب.`,
          example: R`// config.js
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGINS: z.string().transform((s) => s.split(",").map((o) => o.trim())),
});

export const config = Env.parse(process.env);`,
          try: R`امسح [[JWT_SECRET]] من .env وشغّل السيرفر: لازم يقع فورًا برسالة فيها اسم المتغير. وبعدين بدّل كل [[process.env.X]] في المشروع بـ [[config.X]]، ودوّر بـ [[grep -rn "process.env" src]] واتأكد إن مفيش غير config.js.`,
          flag: "script",
          deep: {
            why: R`متغير ناقص على السيرفر بيبان متأخر: أول ما حد يعمل login، [[jwt.sign]] ياخد undefined ويقع. أو الأسوأ: fallback زي [[process.env.SECRET || "change-me"]] فالسيرفر يشتغل بسر معروف للعالم. التحقق وقت التشغيل بيحوّل ده لخطأ واضح قبل أول طلب.`,
            how: R`[[--env-file=.env]] (Node 20.6 وأحدث) بيقرا الملف ويحط القيم في [[process.env]] قبل ما أي كود يشتغل، فمش محتاج dotenv. ولو الملف مش موجود بيطلع خطأ، و [[--env-file-if-exists]] نسخته اللي متقعش. و dotenv بيعمل نفس الحاجة من جوه الكود ([[import "dotenv/config"]]، ولازم يبقى أول import).

zod بيعدّي على [[process.env]] ويطلّع object جديد بالأنواع الصح: PORT رقم مش string، و CORS_ORIGINS array. و [[parse]] بيرمي [[ZodError]] فيه كل المشاكل مرة واحدة، مش أول واحدة بس. والمفاتيح اللي مش في الـ schema بتتشال، فـ [[config]] فيه اللي انت عرّفته بس.

وكل الكود بعد كده بيستورد [[config]] بدل ما يقرا [[process.env]] في ٥٠ مكان، فتعرف كل الإعدادات من ملف واحد، والـ editor بيكمّلك الأسماء.

واعمل [[.env.example]] فيه نفس الأسماء من غير قيم ويدخل Git، عشان أي حد (أو انت على سيرفر جديد) يعرف محتاج إيه.`,
            when: "أي تطبيق هيتشغّل في أكتر من بيئة. نفس الفكرة في Next.js (مكتبة t3-env) وفي FastAPI (pydantic-settings).",
            mistakes: R`في مشروع حقيقي كان فيه endpoints للـ debug (منها واحد بيعيد تعيين باسوردات كل اليوزرز) محمية بـ [[if (process.env.NODE_ENV !== "production")]]. لو السيرفر اتشغّل من غير NODE_ENV (وده بيحصل كتير)، الـ endpoints دي تبقى مفتوحة للعالم. خليها بـ allow-list ([[=== "development"]]) مش deny-list، والأحسن متتسجّلش في كود الإنتاج أصلًا. وفي نفس المشروع سر الـ JWT كان ليه fallback ثابت لو NODE_ENV مش production: نفس المشكلة. وتفتكر إن [[.env]] بيتقري لوحده: Node مبيقراهوش من غير [[--env-file]] أو dotenv.`
          },
          lines: [
            "zod: مكتبة بتوصف شكل البيانات وتتحقق منها.",
            "شكل البيئة اللي التطبيق محتاجها.",
            "واحدة من ٣ قيم بس، والافتراضي development.",
            "[[coerce]] بيحوّل الـ string لرقم، والافتراضي 3000.",
            "لازم يبقى URL سليم.",
            "سر الـ JWT لازم ٣٢ حرف على الأقل، فالسر الضعيف يتمسك بدري.",
            "قايمة origins مفصولة بفاصلة تتحول لـ array.",
            "قفلة.",
            "اتحقق دلوقتي، ولو فيه غلط ارمي خطأ فيه كل الحقول الناقصة. وصدّر النتيجة متحولة ونضيفة."
          ]
        }
      ]
    },
    {
      t: "Validation: متصدّقش أي حاجة جاية",
      l: 2,
      n: "كل body و params و query بيتحقق منهم قبل ما يوصلوا للـ service",
      items: [
        {
          cmd: "validate(schema)",
          title: "middleware واحد يتحقق من أي طلب بـ zod",
          desc: R`بتوصف شكل البيانات بـ zod schema، و middleware واحد بيتحقق: لو غلط يرد 400 بكل المشاكل، ولو صح يحط النسخة النضيفة في [[req.body]].

النسخة النضيفة متحولة (trim، وتاريخ بقى Date) ومن غير حقول زيادة: [[z.object]] بيشيل أي مفتاح مش متعرّف، فحد يبعت [[role: "ADMIN"]] مبيوصلش للـ service.`,
          example: R`import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid input", issues: z.flattenError(result.error).fieldErrors });
  req.body = result.data;
  next();
};

router.post("/", validate(createTaskSchema), tasks.create);`,
          try: R`ابعت [[{"title":"  ","priority":"urgent","role":"ADMIN"}]] وشوف الأخطاء. وبعدين ابعت body صح فيه [[role]] واطبع [[req.body]] في الـ controller: الحقل مش هيبقى موجود. واعمل نسخة من الـ middleware لـ [[req.params]].`,
          flag: "script",
          deep: {
            why: R`الواجهة مش الوحيدة اللي بتكلّم الـ API: أي حد بـ curl أو Postman يبعت أي حاجة. التحقق في الواجهة للراحة، والتحقق في السيرفر هو الحماية. ومن غيره: عنوان بطول مليون حرف، أو object بدل string يوصل Mongo، أو تاريخ [["yesterday"]] يوقع الداتابيز بـ 500.`,
            how: R`zod schema بتعمل حاجتين مع بعض: تتحقق (النوع والطول والقيم المسموحة) وتحوّل (trim، و coerce لرقم أو تاريخ، و default). و [[safeParse]] بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]]، و [[error.issues]] فيها كل مشكلة بالحقل ([[path]]) والرسالة والكود. و [[z.flattenError]] بيحوّلها لـ object: اسم الحقل وقايمة رسايله.

[[z.object]] افتراضيًا بيشيل أي مفتاح مش في الـ schema (strip). [[z.strictObject]] بيرفضه بخطأ، و [[z.looseObject]] بيعدّيه. للـ body، الـ strip هو اللي بيحميك من mass assignment.

نفس الفكرة للـ query بس خلي بالك: [[req.query]] في Express 5 getter، فمتقدرش تكتب [[req.query = result.data]]. حط النتيجة في [[req.validatedQuery]] أو [[res.locals]]. وللقيم المنطقية في الـ query استخدم [[z.stringbool()]] عشان [["false"]] تبقى false فعلًا.

والـ schema ممكن تتشارك مع الواجهة في monorepo، فالفورم في React والـ API بيتحققوا بنفس القواعد. ولو الـ backend TypeScript، [[z.infer<typeof createTaskSchema>]] بيدّيك النوع من غير ما تكتبه مرتين.`,
            when: "كل endpoint بياخد input: body و params و query، من غير استثناء، حتى endpoints الأدمن.",
            mistakes: R`في مشروع حقيقي على Zod 4 كانت الرسايل مكتوبة بـ [[{ required_error: "Email is required" }]]، والـ option دي اتشالت في Zod 4 واتبدلت بـ [[error]]، فالرسالة المخصصة مبتظهرش. وفي نفس المشروع رد الـ validation كان بيرجّع قيمة كل حقل غلط، فلو الباسورد مش مطابق للشروط، الباسورد نفسه بيرجع في الرد وممكن يتسجل في لوجات. وتتحقق من [[req.body]] وتنسى [[req.params]] و [[req.query]].`
          },
          lines: [
            "zod.",
            "schema لإضافة مهمة: ده «العقد» بتاع الـ endpoint.",
            "نص، يتشال منه المسافات، ومش فاضي، وأقصاه ٢٠٠ حرف.",
            "تاريخ اختياري، و [[coerce]] بيحوّل النص لـ Date.",
            "واحدة من ٣ قيم، ولو مش مبعوتة تبقى normal.",
            "قفلة.",
            "دالة بتاخد schema وترجّع middleware.",
            "[[safeParse]] مبيرميش خطأ، بيرجّع نتيجة فيها success.",
            "غلط؟ 400 ومعاه الأخطاء لكل حقل.",
            "صح؟ بدّل الـ body بالنسخة المتحققة.",
            "كمّل.",
            "قفلة.",
            "ركّبه قبل الـ controller، فالـ controller بيستلم بيانات مضمونة."
          ]
        },
        {
          cmd: "express-validator",
          title: "طريقة التحقق التانية اللي هتلاقيها في مشاريع كتير",
          desc: R`[[express-validator]] بيتحقق بسلسلة دوال على كل حقل زي [[body("email").isEmail()]]، وبعدين [[validationResult(req)]] بيجمع الأخطاء.

أقدم من zod ومنتشر جدًا في مشاريع Express. الفرق: zod بيوصف شكل البيانات في schema تستخدمها في أي مكان (الواجهة، والـ config، والأنواع)، و express-validator مربوط بـ Express وبالطلب.`,
          example: R`import { body, param, validationResult, matchedData } from "express-validator";

const rules = [
  param("id").isInt({ min: 1 }).toInt(),
  body("title").optional().isString().trim().isLength({ min: 1, max: 200 }),
  body("done").optional().isBoolean().toBoolean(),
];

router.patch("/:id", rules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = matchedData(req);
  res.json(data);
});`,
          try: R`نفّذ نفس قواعد [[createTaskSchema]] بـ express-validator وقارن طول الكود ووضوح الأخطاء. وجرّب تشيل سطر [[validationResult]]: الـ route هيكمّل عادي بالبيانات الغلط.`,
          flag: "script",
          deep: {
            why: "هتلاقيه في مشاريع كتير (في مشاريع حقيقية كان متسطّب جنب zod في نفس المشروع). لازم تقراه وتفهمه حتى لو هتختار zod في مشروعك الجديد.",
            how: R`كل [[body("x")]] بيرجّع middleware بيشتغل على [[req.body.x]] وبيسجّل النتيجة جوه الطلب نفسه، بس مش بيوقف الطلب. التوقف مسؤوليتك: [[validationResult(req)]] بيقرا اللي اتسجّل، وانت اللي بترد 400. عشان كده الغلطة المشهورة إن حد يكتب القواعد وينسى الخطوة دي، فالقواعد ملهاش أي تأثير.

الـ sanitizers زي [[trim]] و [[toInt]] و [[toBoolean]] بتعدّل القيمة في الطلب. و [[matchedData(req)]] بيرجّع بس الحقول اللي كان عليها قواعد، ودي الطريقة الصح تاخد البيانات بدل [[req.body]] كله.

وفيه [[checkSchema]] لو عايز تكتب القواعد كـ object بدل سلسلة. والفرق في الفلسفة: express-validator بيتحقق من «الطلب»، و zod بيتحقق من «البيانات» في أي مكان.`,
            when: "مشروع قايم بيستخدمه: كمّل بيه ومتخلطش. مشروع جديد: zod غالبًا أحسن لأنك هتستخدمه في الـ config والواجهة والأنواع كمان.",
            mistakes: R`تنسى [[validationResult]]. وتستخدم [[req.body]] بعد التحقق بدل [[matchedData]] فالحقول الزيادة تعدّي. وتخلط المكتبتين في نفس المشروع، فكل endpoint شكل أخطائه مختلف والواجهة تحتار.`
          },
          lines: [
            "الدوال: قواعد للـ body وللـ params، وجمع الأخطاء، واستخراج الحقول المتحققة بس.",
            "array من القواعد، وكل واحدة middleware.",
            "الـ id رقم صحيح أكبر من صفر، وحوّله لرقم.",
            "العنوان اختياري، ولو موجود نص طوله من ١ لـ ٢٠٠ بعد trim.",
            "done اختياري ولازم boolean، ويتحول.",
            "قفلة.",
            "القواعد قبل الـ handler.",
            "اجمع أي أخطاء حصلت.",
            "لو فيه، 400 بالقايمة.",
            "[[matchedData]] بيرجّع الحقول اللي عليها قواعد بس، فحقل زيادة زي role بيتشال.",
            "رجّعها للتجربة.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Auth: انت مين؟",
      l: 2,
      n: "باسورد متخزن hash، وتوكن أو session تثبت إنك انت، وكوكيز بالإعدادات الصح",
      items: [
        {
          cmd: "bcrypt",
          title: "احفظ الباسورد بطريقة محدش يقدر يرجّعها",
          desc: R`الباسورد عمره ما يتحفظ زي ما هو ولا مشفّر بمفتاح: بيتحفظ hash بدالة اتجاه واحد، وعند الـ login بتقارن.

bcrypt معمول مخصوص للباسوردات: بطيء عن قصد (الـ cost)، وبيضيف salt عشوائي لكل باسورد. cost بين 10 و 12 شائع، واختار أعلى رقم السيرفر بتاعك يستحمله (حوالي ربع ثانية للـ hash الواحد).`,
          example: R`import bcrypt from "bcrypt";

const hash = await bcrypt.hash("MyS3cret!", 12);
console.log(hash);
// $2b$12$L1rSfyd2U5SuHcCfeeLVIu3pk8VYb8uJI3OmMcHt7J/RBXlUSq//.

console.log(await bcrypt.compare("MyS3cret!", hash));
console.log(await bcrypt.compare("wrong", hash));
// true
// false`,
          try: R`اعمل hash لنفس الباسورد مرتين واتأكد إنهم مختلفين، وإن compare بيرجّع true للاتنين. وبعدين قيس الوقت بـ [[console.time]] مع cost 10 و 12 و 14، وشوف كل زيادة ١ بتعمل إيه.`,
          flag: "script",
          deep: {
            why: "الداتابيز بتتسرّب: باك أب منسي، أو SQL injection، أو موظف. لو الباسوردات متخزنة نص، كل اليوزرز اتكشفوا، ومعظمهم بيستخدموا نفس الباسورد في الإيميل والبنك. الـ hash البطيء بيخلي الباسورد القوي شبه مستحيل يترجع، والضعيف ياخد وقت.",
            how: R`الـ hash السريع (زي SHA-256) معمول للسرعة: كارت شاشة يجرّب مليارات الباسوردات في الثانية. bcrypt بيعيد الحسبة [[2^cost]] مرة، فـ cost 12 يعني ٤٠٩٦ دورة، وكل زيادة ١ بتضاعف الوقت. انت بتدفع ربع ثانية مرة عند الـ login، والمهاجم بيدفعها مع كل تخمينة.

الـ salt: ١٦ بايت عشوائي بيتولد مع كل hash. فاتنين باسوردهم «123456» الـ hash بتاعهم مختلف، والمهاجم ميقدرش يستخدم جداول جاهزة (rainbow tables) ولا يكسر الكل مرة واحدة. والـ salt والـ cost محفوظين جوه النص نفسه: [[$2b$12$]] وبعدها ٢٢ حرف salt وبعدها الـ hash. عشان كده [[compare]] مش محتاج تديله salt.

[[bcrypt.hash]] الـ async بيشتغل في thread pool بتاع libuv، فالـ event loop فاضي يخدم طلبات تانية. [[hashSync]] بيوقف السيرفر كله الربع ثانية دي. و [[bcryptjs]] مكتوبة JavaScript فبتشتغل على الـ thread الرئيسي حتى الـ async بتاعها (بتقسّم الشغل بس)، فهي أبطأ وبتزاحم الطلبات.

حد bcrypt: أول ٧٢ بايت بس من الباسورد بيتحسبوا والباقي بيتجاهل. و OWASP بتفضّل Argon2id للمشاريع الجديدة، و bcrypt لسه مقبول ومنتشر.`,
            when: "أي تسجيل بباسورد. وراجع الـ cost كل كام سنة مع تطور الأجهزة: عند login ناجح، لو الـ hash القديم الـ cost بتاعه أقل، اعمله hash جديد.",
            mistakes: R`في مشروع حقيقي كان الـ User model فيه حقل [[plainPassword]] جنب الـ hash، عشان endpoint للأدمن «يعرض الباسوردات»، وباسورد افتراضي ثابت للموظفين. ده بيلغي فايدة الـ hash تمامًا: أي تسريب يبقى كل الباسوردات. الصح: الأدمن يعمل reset ويبعت لينك، وعمره ما يشوف الباسورد. وفي مشاريع تانية كان [[bcrypt]] و [[bcryptjs]] الاتنين متسطبين: اختار واحد. وتستخدم [[md5]] أو [[sha256]] للباسوردات: سريعين زيادة عن اللزوم. وترجّع «الإيميل مش موجود» و «الباسورد غلط» كرسالتين مختلفتين، فحد يعرف مين عنده حساب.`
          },
          lines: [
            "مكتبة bcrypt (native وسريعة). فيه كمان [[bcryptjs]] مكتوبة JavaScript بس، وأبطأ.",
            "اعمل hash بـ cost 12. async عشان الحسبة التقيلة متوقفش السيرفر.",
            "اطبعه: كل مرة هيطلع مختلف حتى لنفس الباسورد، بسبب الـ salt.",
            "قارن باسورد صح بالـ hash: true.",
            "باسورد غلط: false."
          ]
        },
        {
          cmd: "jwt.sign و jwt.verify",
          title: "توكن موقّع يثبت إنك سجّلت دخول",
          desc: R`بعد login ناجح، السيرفر بيدّيك JWT: نص فيه بيانات (زي id اليوزر) وتوقيع بسر محدش يعرفه غير السيرفر، والواجهة بتبعته مع كل طلب في [[Authorization: Bearer ...]].

السيرفر بيتحقق من التوقيع من غير ما يسأل الداتابيز. والـ JWT موقّع مش مشفّر: أي حد يقدر يقرا اللي جواه، فمتحطش فيه باسورد ولا بيانات حساسة.`,
          example: R`import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function signAccessToken(user) {
  return jwt.sign({ sub: String(user.id), role: user.role }, config.JWT_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMDkwMH0.<signature>
//               header                  .                         payload                                        . التوقيع`,
          try: R`اعمل توكن وخد الجزء التاني منه (بين النقطتين) وافكّه بـ [[node -e "console.log(Buffer.from(process.argv[1], 'base64url').toString())" PAYLOAD]]. هتقرا الـ id والدور من غير أي سر. غيّر الدور لـ ADMIN ورجّع شفّره بـ [[node -e "const p = JSON.parse(Buffer.from(process.argv[1], 'base64url')); p.role = 'ADMIN'; console.log(Buffer.from(JSON.stringify(p)).toString('base64url'))" PAYLOAD]]، وحط الناتج مكان الجزء التاني وجرّب verify: [[invalid signature]] (لو غيّرت حرف في النص المشفّر نفسه، غالبًا الـ JSON هيبوظ وهتاخد SyntaxError مش invalid signature). واعمل توكن بـ [[expiresIn: "5s"]] واستنى: [[jwt expired]].`,
          flag: "script",
          deep: {
            why: "HTTP مبيفتكرش: كل طلب لوحده، فلازم كل طلب يثبت صاحبه. الـ JWT بيحط الإثبات ده جوه الطلب نفسه، والسيرفر يتحقق منه بحسبة سريعة من غير lookup، وأي نسخة من السيرفر معاها السر تقدر تتحقق، فتقدر تشغّل كذا نسخة من غير session مشتركة.",
            how: R`JWT تلات أجزاء مفصولة بنقط، كل جزء base64url: الـ header (نوع الـ algorithm)، والـ payload (الـ claims)، والتوقيع. التوقيع = HMAC-SHA256 للجزئين الأولانيين بالسر. أي تغيير في الـ payload بيخلي التوقيع مش مطابق، ومن غير السر محدش يقدر يعمل توقيع جديد.

الـ claims المشهورة: [[sub]] (مين)، و [[exp]] (بينتهي إمتى، بالثواني)، و [[iat]] (اتعمل إمتى)، و [[iss]] و [[aud]] (مين أصدره ولمين). [[verify]] بيتأكد من التوقيع و [[exp]] تلقائي، ومن [[iss]] و [[aud]] لو طلبتهم.

[[algorithms: ["HS256"]]] بيقفل هجوم قديم: توكن بيقول في الـ header إن الـ algorithm [[none]] أو نوع تاني عشان يخدع المكتبة. النسخ الحديثة من jsonwebtoken بتحمي من ده، بس التحديد الصريح عادة كويسة.

المشكلة الأساسية: التوكن صالح لحد [[exp]] مهما حصل. اليوزر عمل logout؟ اتحظر؟ دوره اتغيّر؟ التوكن القديم لسه شغال. عشان كده الـ access token عمره قصير (١٠ لـ ١٥ دقيقة)، ومعاه refresh token (درس [[access و refresh]]).`,
            when: R`APIs لموبايل أو لأكتر من واجهة، أو أكتر من سيرفر. لموقع واحد على نفس الدومين، الـ session بكوكي ممكن تبقى أبسط وأأمن (درس [[express-session]]).`,
            mistakes: R`في مشروع حقيقي كان عمر الـ JWT [[3650d]]، يعني ١٠ سنين، و logout مبيلغيهوش: توكن اتسرق مرة يبقى دخول لـ ١٠ سنين. وفي مشروع تاني توكن تحميل الملفات (عمره ٣٠ يوم) كان موقّع بنفس سر الـ access token ونفس الـ issuer، فكان بيعدّي من [[verifyAccessToken]] كأنه توكن دخول. افصل بسر مختلف أو claim زي [[aud]] وتحقق منه. وتحط الدور في التوكن وتثق فيه: لو الأدمن اتشال، التوكن لسه بيقول ADMIN لحد ما ينتهي.`
          },
          lines: [
            "مكتبة jsonwebtoken.",
            "السر من config المتحقق منه.",
            "اعمل توكن لليوزر.",
            "[[sub]] (subject) هو id اليوزر كـ string، ومعاه الدور، وينتهي بعد ربع ساعة.",
            "قفلة.",
            "اتحقق من توكن جاي.",
            "بيتأكد من التوقيع وإنه مش منتهي، ومبيقبلش غير الـ algorithm ده. لو أي حاجة غلط بيرمي خطأ.",
            "قفلة."
          ]
        },
        {
          cmd: "requireAuth",
          title: "middleware يعرف مين اللي باعت الطلب",
          desc: R`middleware بيقرا التوكن من [[Authorization: Bearer ...]] ويتحقق منه ويحط اليوزر في [[req.user]]، ولو مفيش توكن أو بايظ أو منتهي: 401.

أي route بعده يعرف مين اللي بيطلب من [[req.user]]، وعمره ما يثق في id جاي في الـ body أو الـ query.`,
          example: R`export async function requireAuth(req, res, next) {
  const header = req.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) throw new AppError(401, "Login required");
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
  req.user = { id: Number(payload.sub), role: payload.role };
  next();
}`,
          try: R`ركّبه على router المهام، وجرّب من غير header، وبتوكن بايظ، وبتوكن صح. وفي الـ controller استخدم [[req.user.id]] بدل أي id جاي من الـ body.`,
          flag: "script",
          deep: {
            why: R`كل endpoint محمي محتاج نفس الخطوات. في middleware واحد بتضمن إنها بتتعمل بنفس الطريقة في كل مكان، وإن [[req.user]] دايمًا جاي من توكن متحقق مش من حاجة المستخدم بعتها.`,
            how: R`الـ middleware ده بيحوّل «توكن» لـ «هوية». كل اللي بعده يثق في [[req.user]] بس، عمره ما يثق في [[req.body.userId]].

فيه قرار: تكتفي بالـ payload، ولا تجيب اليوزر من الداتابيز مع كل طلب؟ الـ payload بس أسرع، بس لو اليوزر اتحظر أو دوره اتغيّر، التوكن لسه شغال لحد ما ينتهي. جلب اليوزر ([[prisma.user.findUnique]] بـ [[select]] على الحقول اللي محتاجها) بيضيف query لكل طلب بس بيدّيك حالة حقيقية: [[isActive]] والدور الحالي. مشاريع كتير بتعمل ده، ولو الحمل زاد تكاشه في Redis لدقيقة.

ولو التوكن في كوكي بدل header، نفس الفكرة بس من [[req.cookies]]، وساعتها لازم حماية CSRF (sameSite على الأقل، درس [[res.cookie]]).

و [[optionalAuth]] نسخة بتحط [[req.user]] لو فيه توكن سليم وتكمّل عادي لو مفيش، لصفحات بتتعرض للكل بس بتتغير شوية لو انت عامل login.`,
            when: R`على كل router محتاج login. وخليه على مستوى الـ router ([[router.use(requireAuth)]] أو في [[app.use]]) عشان متنساش route.`,
            mistakes: R`في [[optionalAuth]] تبلع أي خطأ وتكمّل كزائر، وده صح. بس تنسخ نفس الـ catch لـ [[requireAuth]] بالغلط، فأي توكن بايظ يعدّي. وتقرا [[req.user.id]] في route مش عليه requireAuth فيقع بـ 500. وتحط اليوزر كله من الداتابيز في [[req.user]] ومعاه الـ hash، وبعدين route يرجّع [[req.user]] في الرد.`
          },
          lines: [
            "async عشان أي throw يروح لـ error handler في Express 5.",
            "اقرا الـ header، ولو مش موجود خليه نص فاضي.",
            "افصله: كلمة Bearer والتوكن.",
            "مش Bearer أو مفيش توكن: 401.",
            "هنحط فيه الـ payload.",
            "جرّب.",
            "اتحقق من التوقيع والانتهاء.",
            "لو فشل لأي سبب...",
            "401 برسالة واحدة. متقولش للمهاجم السبب بالظبط.",
            "قفلة.",
            "حط اليوزر على الطلب. [[sub]] كان string فرجّعه رقم.",
            "كمّل.",
            "قفلة."
          ]
        },
        {
          cmd: "res.cookie",
          title: "كوكي المتصفح بيبعتها لوحده و JavaScript ميقدرش يقراها",
          desc: R`[[res.cookie(name, value, options)]] بيبعت [[Set-Cookie]]، والمتصفح بيرجّعها لوحده مع كل طلب لنفس السيرفر، و [[cookie-parser]] بيقراها في [[req.cookies]].

التلات إعدادات اللي مينفعش تنساهم: [[httpOnly]] (الـ JavaScript في الصفحة ميقدرش يقراها، فـ XSS ميسرقهاش)، و [[secure]] (تتبعت على HTTPS بس)، و [[sameSite]] (تتبعت مع طلبات جاية من مواقع تانية ولا لأ).`,
          example: R`import cookieParser from "cookie-parser";

app.use(cookieParser(config.COOKIE_SECRET));

export const refreshCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

res.cookie("refresh", token, refreshCookieOptions);
res.clearCookie("refresh", { path: "/api/auth" });`,
          try: R`بعد login افتح DevTools، تاب Application، Cookies: شوف الأعمدة HttpOnly و Secure و SameSite. واكتب [[document.cookie]] في Console: الكوكي الـ httpOnly مش هتظهر. وجرّب [[clearCookie]] من غير الـ path وشوفها لسه موجودة.`,
          flag: "script",
          deep: {
            why: "التوكن لازم يتخزن في مكان. localStorage أي JavaScript في الصفحة يقراه، فأي XSS (أو مكتبة npm مخترقة) تاخده. الكوكي الـ httpOnly الصفحة نفسها متقدرش تقراها، والمتصفح بيبعتها لوحده. بس ده بيفتح باب CSRF، وده اللي sameSite بيقفله.",
            how: R`الرد بيبقى [[Set-Cookie: refresh=abc; Max-Age=2592000; Path=/api/auth; HttpOnly; Secure; SameSite=Lax]]. المتصفح بيحفظها ويبعتها في header الـ [[Cookie]] مع أي طلب لنفس الدومين والـ path.

sameSite ليها ٣ قيم: [[strict]] مبتتبعتش خالص مع أي طلب جاي من موقع تاني (حتى لما حد يدوس لينك ليك من جوجل، فيبان إنه مش عامل login). [[lax]] بتتبعت مع التنقل العادي (لينك GET) بس مش مع POST أو fetch من موقع تاني، وده بيقفل أغلب CSRF. و [[none]] بتتبعت مع كل حاجة، ولازم معاها [[secure]]، وبتستخدم لما الواجهة على دومين مختلف تمامًا.

«موقع تاني» معناها site مختلف مش origin مختلف: [[app.example.com]] و [[api.example.com]] نفس الـ site، فـ lax شغالة بينهم. بس [[myapp.vercel.app]] و [[api.myapp.com]] sites مختلفة، فمحتاج [[none]] و [[secure]]، والمتصفحات اللي بتقفل third-party cookies ممكن ترفضها. الحل الأنضف: الـ API تحت نفس الدومين ([[/api]] من ورا Nginx أو subdomain).

الكوكي الموقّعة ([[signed: true]]): cookie-parser بيضيف توقيع بالسر، ولو حد عدّل القيمة، قيمتها في [[req.signedCookies]] بتبقى [[false]]. ده بيمنع التعديل مش القراية.

و [[clearCookie]] لازم ياخد نفس الـ path والـ domain اللي الكوكي اتعملت بيهم، وإلا المتصفح يعتبرها كوكي تانية. وفي Express 5 بيتجاهل [[maxAge]] و [[expires]] لو بعتّهم.`,
            when: "refresh tokens و session ids، وأي حاجة الـ JavaScript مش محتاج يقراها. وتفضيلات UI (اللغة والثيم) ممكن كوكي عادية أو localStorage.",
            mistakes: R`في مشروع حقيقي كان الـ cookie secret ليه fallback: [[COOKIE_SECRET || "change-me"]] ومعاه warning في اللوج. لو المتغير اتنسي في الإنتاج، أي حد يقدر يوقّع كوكيز. خلي config يقع بدل الـ fallback. و [[secure: true]] على localhost بـ http في متصفح مش بيعتبر localhost آمن، فالكوكي متتحفظش وانت مش فاهم ليه. و [[sameSite: "none"]] من غير [[secure]] فالمتصفح يرفضها. والواجهة بتعمل fetch من غير [[credentials: "include"]] فالكوكي مبتتبعتش أصلًا.`
          },
          lines: [
            "cookie-parser بيقرا header الـ Cookie.",
            "[[req.cookies]] للعادية، والسر عشان [[req.signedCookies]] (الموقّعة).",
            "إعدادات كوكي الـ refresh في مكان واحد.",
            "الـ JavaScript في المتصفح مش شايفها.",
            "HTTPS بس في الإنتاج، وعلى localhost بـ http بتبقى false.",
            "متتبعتش مع POST أو fetch جاي من مواقع تانية.",
            "تتبعت لعناوين الـ auth بس، مش مع كل طلب.",
            "تعيش ٣٠ يوم، بالملّي ثانية.",
            "قفلة.",
            "ابعتها.",
            "امسحها، بنفس الـ path وإلا المتصفح مش هيمسحها."
          ]
        },
        {
          cmd: "access و refresh",
          title: "توكن قصير للطلبات وتوكن طويل يجدده",
          desc: R`الـ access token عمره قصير وبيتبعت مع كل طلب، والـ refresh token عمره طويل ومتخزن في كوكي httpOnly، ووظيفته الوحيدة إنه يجيب access جديد.

والـ refresh بيتسجّل في الداتابيز (كـ hash)، فتقدر تلغيه: logout، أو «اخرج من كل الأجهزة»، أو يوزر اتحظر. ومع كل تجديد القديم بيتلغي وييجي جديد (rotation).`,
          example: R`router.post("/refresh", async (req, res) => {
  const token = req.cookies.refresh;
  if (!token) throw new AppError(401, "No refresh token");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) throw new AppError(401, "Invalid refresh token");
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const newToken = await issueRefreshToken(stored.user.id);
  res.cookie("refresh", newToken, refreshCookieOptions);
  res.json({ accessToken: signAccessToken(stored.user) });
});`,
          try: R`اعمل login وخد الـ refresh cookie، ونادي [[/refresh]] مرتين بنفس الكوكي القديمة (بـ curl و [[-b "refresh=..."]]). التانية لازم ترجع 401. وبعدين اعمل endpoint [[/logout-all]] يلغي كل refresh tokens اليوزر.`,
          flag: "script",
          deep: {
            why: "عايز حاجتين عكس بعض: توكن قصير عشان لو اتسرق ضرره يبقى محدود، ويوزر مش بيعمل login كل ربع ساعة. الحل توكنين: القصير للطلبات، والطويل محمي أكتر (httpOnly ومبيتبعتش غير لـ endpoint واحد) وممكن يتلغي من الداتابيز.",
            how: R`الرحلة: login بيرجّع access في الـ body (الواجهة تحفظه في الذاكرة، في state مش localStorage)، و refresh في كوكي httpOnly. الواجهة تبعت الـ access في [[Authorization]]. لما يرجع 401 بسبب الانتهاء، تنادي [[/refresh]] (المتصفح بيبعت الكوكي لوحده مع [[credentials: "include"]])، تاخد access جديد، وتعيد الطلب. ولو الصفحة اتعملها reload والـ access اللي في الذاكرة راح، أول حاجة تنادي [[/refresh]].

الـ refresh نفسه مش لازم يبقى JWT: نص عشوائي ([[crypto.randomBytes(32).toString("base64url")]]) كفاية لأنك بتدوّر عليه في الداتابيز أصلًا. و [[issueRefreshToken]] بيولّده، ويحفظ الـ hash بتاعه وتاريخ انتهاء، ويرجّعه.

الـ rotation: مع كل تجديد، القديم يتلغي وييجي جديد. لو حرامي سرق refresh واستخدمه، اليوزر الحقيقي لما يستخدم نفس التوكن هيلاقيه ملغي، ودي إشارة سرقة. التطبيقات الأدق بتلغي «العيلة» كلها ساعتها وتجبر login.

تخزين الـ hash بدل التوكن: لو الداتابيز اتسربت، التوكنات مش صالحة للاستخدام. SHA-256 كفاية هنا (مش bcrypt) لأن التوكن عشوائي وطويل، مش باسورد بشري ضعيف.

و [[path: "/api/auth"]] في إعدادات الكوكي بيخلي المتصفح يبعت الـ refresh للـ auth routes بس.`,
            when: "أي API بـ JWT لواجهة ويب أو موبايل. في الموبايل الـ refresh بيتخزن في secure storage (Keychain و Keystore) بدل الكوكي.",
            mistakes: R`في مشروع حقيقي كان الـ backend بيحط الـ refresh في كوكي httpOnly (صح)، وكمان بيرجّعه في الـ body، والواجهة بتحفظه في [[localStorage]]. كده الـ httpOnly ملهاش لازمة: أي XSS يقرا localStorage وياخد توكن عمره ٣٠ يوم. ابعته في الكوكي بس. وفي نفس المشروع endpoint الـ refresh كان بيقبل التوكن من الكوكي أو header الـ Authorization أو الـ body: كل مصدر زيادة باب زيادة. ومن غير rotation، refresh مسروق شغال لحد ما ينتهي.`
          },
          lines: [
            "endpoint التجديد. مش عليه requireAuth، لأن الـ access نفسه ممكن يكون انتهى.",
            "الـ refresh جاي في كوكي (محتاج cookie-parser).",
            "مفيش؟ 401، والواجهة توديه على login.",
            "اعمل hash للتوكن ([[crypto]] من [[node:crypto]]). في الداتابيز بنخزن الـ hash بس، زي الباسورد.",
            "دوّر عليه ومعاه اليوزر.",
            "مش موجود أو ملغي أو منتهي؟ 401.",
            "rotation: الغي القديم. كل refresh يتستخدم مرة واحدة بس.",
            "اعمل refresh جديد واحفظ الـ hash بتاعه.",
            "ابعته في الكوكي بنفس الإعدادات.",
            "ورجّع access جديد في الـ body.",
            "قفلة."
          ]
        },
        {
          cmd: "express-session",
          title: "بديل الـ JWT: السيرفر يفتكرك",
          desc: R`في الـ session السيرفر بيحفظ بياناتك عنده (في Redis أو الداتابيز)، ويدّيك رقم عشوائي بس (session id) في كوكي httpOnly يبعته المتصفح مع كل طلب.

الفرق عن JWT: logout حقيقي (امسح الـ session وخلاص)، والكوكي مفيهاش بيانات، بس كل طلب محتاج lookup في الـ store.`,
          example: R`import session from "express-session";

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 },
}));

app.post("/api/auth/login", async (req, res) => {
  const user = await authService.checkPassword(req.body.email, req.body.password);
  await new Promise((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())));
  req.session.userId = user.id;
  res.json({ id: user.id });
});`,
          try: R`سجّل دخول وبص على الكوكي [[connect.sid]] في DevTools: رقم بس. اعمل route [[/me]] يرجّع [[req.session.userId]]، و route [[/logout]] فيه [[req.session.destroy]]. وأعد تشغيل السيرفر: الـ sessions كلها راحت، لأن الـ store الافتراضي في الذاكرة. (على localhost بـ http خلي [[secure]] false للتجربة.)`,
          flag: "script",
          deep: {
            why: "JWT مش دايمًا الإجابة. لموقع واحد على دومين واحد، الـ session أبسط: مفيش refresh flow، و logout وحظر اليوزر بيحصلوا فورًا، والكوكي فيها رقم بس.",
            how: R`أول مرة تحط حاجة في [[req.session]]، الـ middleware بيولّد id عشوائي طويل، ويحفظ [[{ userId: 7 }]] في الـ store تحت الـ id ده، ويبعت الـ id في كوكي موقّعة بالـ secret. مع كل طلب: يقرا الكوكي، ويتحقق من التوقيع، ويجيب الـ session من الـ store ويحطها في [[req.session]]. وفي آخر الطلب لو اتغيرت يحفظها.

الـ store الافتراضي [[MemoryStore]]: في ذاكرة العملية، بيضيع مع كل restart، ومبيتشاركش بين نسختين، وبيسرّب ذاكرة. للإنتاج Redis (باكدج [[connect-redis]]، والفكرة في درس [[stateless]] في تاب «Cloud و DevOps») أو الداتابيز.

[[regenerate]] بعد الـ login مهم: لو مهاجم قدر يزرع session id معروف في متصفح الضحية قبل الـ login (session fixation)، من غير regenerate الضحية هتعمل login على الـ id بتاع المهاجم. وحوّلناها لـ promise عشان أي خطأ فيها يوصل للـ error handler بدل ما يضيع جوه callback.

و [[secure: true]] ورا Nginx: Express شايف الطلب http (Nginx هو اللي عامل HTTPS)، فـ express-session مش هيبعت الكوكي. الحل [[app.set("trust proxy", 1)]] عشان يقرا [[X-Forwarded-Proto]].`,
            when: "موقع واحد (SSR أو SPA) على نفس الدومين، وخصوصًا لو محتاج logout فوري أو «اطرد اليوزر ده دلوقتي». JWT أنسب للموبايل، وللخدمات اللي بتكلّم بعض، ولأكتر من سيرفر من غير store مشترك.",
            mistakes: R`MemoryStore في الإنتاج: express-session نفسه بيطبع warning، والناس بتتجاهله. و [[saveUninitialized: true]] فكل bot بيعمل session في الـ store. وتنسى [[trust proxy]] ورا Nginx، فالكوكي الـ secure متتبعتش والـ login «مش شغال» على السيرفر بس.`
          },
          lines: [
            "express-session.",
            "ركّبه كـ middleware.",
            "سر لتوقيع الـ session id في الكوكي.",
            "متحفظش الـ session تاني لو متغيرتش.",
            "متعملش session لأي زائر، بس لما تحط فيها حاجة.",
            "إعدادات الكوكي زي أي كوكي auth.",
            "قفلة.",
            "login.",
            "اتأكد من الإيميل والباسورد (بترمي 401 لو غلط).",
            "اعمل session id جديد بعد الـ login (ضد session fixation)، ملفوف في promise عشان الخطأ يوصل للـ error handler.",
            "احفظ id اليوزر في الـ session. بيتخزن في الـ store، مش في الكوكي.",
            "رد.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Authorization والأمان",
      l: 2,
      n: "إنك تعرف هو مين مش كفاية: لازم تتأكد إن ليه الحق، وتقفل الأبواب المعروفة",
      items: [
        {
          cmd: "requireRole",
          title: "الأدمن بس يقدر يعمل كده",
          desc: R`authentication (انت مين) غير authorization (مسموحلك بإيه): بعد [[requireAuth]]، middleware تاني بيتأكد من الدور، والدور الغلط 403 مش 401.

ولما الصلاحيات تكتر، بدل ما تسأل «انت أدمن؟» في كل مكان، اسأل «معاك صلاحية [[users:manage]]؟»، والدور يتحول لقايمة صلاحيات في مكان واحد.`,
          example: R`export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) throw new AppError(401, "Login required");
  if (!roles.includes(req.user.role)) throw new AppError(403, "Forbidden");
  next();
};

const PERMISSIONS = {
  ADMIN: ["tasks:read", "tasks:delete-any", "users:manage"],
  USER: ["tasks:read"],
};
export const can = (perm) => (req, res, next) => {
  if (!PERMISSIONS[req.user?.role]?.includes(perm)) throw new AppError(403, "Forbidden");
  next();
};

router.delete("/users/:id", requireAuth, requireRole("ADMIN"), users.remove);`,
          try: R`اعمل يوزرين بدورين مختلفين، وجرّب endpoint الأدمن بكل واحد: الأدمن 200، والعادي 403، ومن غير توكن 401. وبعدين بدّل [[requireRole("ADMIN")]] بـ [[can("users:manage")]] واتأكد إن النتيجة واحدة.`,
          flag: "script",
          deep: {
            why: "أغلب التطبيقات فيها أنواع يوزرز: زبون وأدمن، أو موظف ومدير. لو فحص الدور مكتوب جوه كل handler بـ if، أول endpoint جديد تنساه فيه هيبقى مفتوح للكل. في middleware، الحماية بتبان في تعريف الـ route نفسه.",
            how: R`RBAC (role-based access control): كل يوزر ليه دور، وكل دور ليه صلاحيات. الأدوار الثابتة في الكود أبسط حاجة. ولما الأدمن محتاج يعمل أدوار جديدة من لوحة التحكم، الأدوار والصلاحيات بتتخزن في جداول (Role و Permission وجدول بيربطهم). في مشروع حقيقي لنظام محاسبة كان ده الشكل: الصلاحيات بتتحسب من الدور وتتحط على [[req.user.permissions]] جوه الـ auth middleware.

فحص الدور بيجاوب «ينفع يعمل النوع ده من العمليات؟». بس مبيجاوبش «ينفع يعملها على الحاجة دي بالذات؟»: يوزر عادي معاه [[tasks:read]]، بس على مهامه هو بس. ده الـ ownership check، الدرس الجاي، وهو اللي بيتنسي أكتر.

والدور جاي منين؟ لو من الـ JWT، تغييره مبيسريش غير لما التوكن ينتهي. لو من الداتابيز في [[requireAuth]]، بيسري فورًا.`,
            when: "أي تطبيق فيه لوحة أدمن أو أنواع يوزرز. ابدأ بسيط (أدوار ثابتة)، وانقل لصلاحيات في الداتابيز لما العميل يطلب يعمل أدوار بنفسه.",
            mistakes: R`تخبي زرار «مسح» في الواجهة وتفتكر كده محمي: الـ endpoint لسه شغال لأي حد بـ curl. وترجّع 401 بدل 403 فالواجهة تعمل logout. وتقارن الدور بـ string مكتوب بإيدك في ٣٠ مكان ([["admin"]] مرة و [["ADMIN"]] مرة): اعمل constants.`
          },
          lines: [
            "دالة بتاخد الأدوار المسموحة وترجّع middleware.",
            "مفيش يوزر أصلًا (نسيت requireAuth قبله): 401.",
            "الدور مش في القايمة: 403.",
            "مسموح، كمّل.",
            "قفلة.",
            "خريطة الأدوار للصلاحيات في مكان واحد.",
            "الأدمن يقدر يمسح مهام أي حد ويدير اليوزرز.",
            "اليوزر العادي يقرا بس (ومهامه هو بس، ودا الدرس الجاي).",
            "قفلة.",
            "middleware بيسأل عن صلاحية مش عن دور.",
            "الدور مش معاه الصلاحية دي: 403.",
            "كمّل.",
            "قفلة.",
            "الترتيب: auth الأول (مين)، وبعدين الدور (مسموح؟)، وبعدين الـ handler."
          ]
        },
        {
          cmd: "ownership (IDOR)",
          title: "تغيير رقم في العنوان بيوريك بيانات حد تاني؟",
          desc: R`IDOR يعني الـ endpoint بياخد id من العنوان ويجيب الحاجة من غير ما يتأكد إنها بتاعتك، فتغيير الرقم في [[GET /api/tasks/42]] يوريك مهمة يوزر تاني.

ودي أشهر ثغرة في الـ APIs (Broken Access Control، رقم ١ في OWASP). الحل: كل query بتاخد [[userId: req.user.id]] في الـ where، فالسؤال للداتابيز نفسه يبقى «هات المهمة ٤٢ اللي بتاعتي».`,
          example: R`// غلط: أي حد عامل login يقرا أي مهمة
const task = await prisma.task.findUnique({ where: { id } });

// صح: المهمة لازم تبقى بتاعتك
const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
if (!task) throw new AppError(404, "Task not found");

// التعديل والمسح بنفس الشرط
const { count } = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
if (count === 0) throw new AppError(404, "Task not found");`,
          try: R`اعمل يوزرين وكل واحد يعمل مهمة. بتوكن الأول، حاول تقرا وتعدّل وتمسح مهمة التاني بالـ id بتاعها: التلاتة لازم 404. وبعدين دوّر في مشروعك على كل [[findUnique]] و [[update]] بـ id جاي من الطلب، وشوف أنهي فيهم ناقصه شرط الملكية.`,
          flag: "script",
          deep: {
            why: R`auth بيأكد إنك يوزر، والدور بيأكد إنك من النوع اللي يعمل كده. بس ولا واحد فيهم بيسأل «المهمة ٤٢ دي بتاعتك؟». والأرقام متتالية وسهلة التخمين، فأي حد يكتب loop من ١ لـ ١٠٠٠٠ وياخد بيانات كل الناس: فواتير، وعناوين، وصور بطاقات.`,
            how: R`الفكرة إن الـ ownership يبقى جزء من الـ query مش خطوة بعدها. [[findUnique]] وبعدين [[if (task.userId !== req.user.id)]] شغال برضه، بس سهل تنساه في endpoint، وبيقول للمهاجم إن الرقم موجود (403 مقابل 404).

للأنظمة اللي فيها شركات أو فرق (multi-tenant) الشرط بيبقى [[companyId: req.user.companyId]]. في مشروع حقيقي لنظام محاسبة كان كل controller بيفلتر بـ companyId لأي حد مش super admin، وكان فيه اختبار بيتأكد من ده بالظبط. والأحسن كمان تخلي الشرط تلقائي: Prisma client extension بيضيفه لكل query، أو Row Level Security في Postgres (درس «Row Level Security» في تاب «PostgreSQL»)، فحتى لو نسيت، الداتابيز نفسها ترفض.

و UUID بدل الأرقام المتتالية بيصعّب التخمين، بس مش حماية: الـ id بيتسرّب في لينكات ولوجات. الحماية الحقيقية الشرط في الـ query.

والأدمن اللي مسموحله يشوف كله؟ route منفصل تحت [[/api/admin]] بـ [[requireRole]]، بدل if جوه نفس الـ endpoint.`,
            when: R`كل endpoint بياخد id من العنوان أو الـ body، من غير استثناء: القراية والتعديل والمسح والتحميل ([[/files/:id]]).`,
            mistakes: R`تتحقق في القراية وتنسى في PATCH و DELETE. وتاخد [[userId]] من الـ body بدل [[req.user.id]]. وفي مشروع حقيقي كان socket.io بيقبل [[userId]] من العميل عشان يدخّله غرفة الرسايل بتاعته، فأي حد يقدر يسمع رسايل أي حد (التفاصيل في درس [[socket.io]] في تاب «بناء مشروع كامل»). وتفتكر إن UUID كفاية.`
          },
          lines: [
            "بيدوّر بالـ id بس، فأي id يرجّع أي مهمة.",
            "الـ id ومعاه صاحبها في نفس الـ where. [[findFirst]] شغال، ومن Prisma 5 [[findUnique]] كمان بيقبل [[userId]] جنب الـ id.",
            "مش لاقيها (مش موجودة أو مش بتاعتك)؟ 404 في الحالتين، عشان متأكدش إن الرقم موجود.",
            "[[deleteMany]] بالشرطين: بيمسح لو بتاعتك بس، وبيرجّع عدد اللي اتمسح.",
            "صفر يعني مش بتاعتك أو مش موجودة."
          ]
        },
        {
          cmd: "helmet",
          title: "headers أمان على كل رد في سطر",
          desc: R`[[helmet()]] بيضيف مجموعة headers بتقول للمتصفح يتصرف بحذر، وبيشيل [[X-Powered-By: Express]].

متخمّنش نوع الملف، ومتعرضش الصفحة في iframe من موقع تاني، واستخدم HTTPS بس، ومتبعتش الـ referrer لمواقع تانية. لـ API بيرجّع JSON بس أغلبها مش فارق كتير، بس رخيص ومفيش سبب تسيبه. والمهم تعرف تعدّل اللي بيبوّظ حاجة بدل ما تشيله كله.`,
          example: R`import helmet from "helmet";

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// curl -I http://localhost:3000/health
// Content-Security-Policy: default-src 'self';base-uri 'self';...
// Strict-Transport-Security: max-age=31536000; includeSubDomains
// X-Content-Type-Options: nosniff
// X-Frame-Options: SAMEORIGIN
// Cross-Origin-Resource-Policy: cross-origin`,
          try: R`شغّل [[curl -I localhost:3000/health]] قبل helmet وبعده وقارن الـ headers. وبعدين اعمل صفحة على بورت تاني فيها صورة بتشاور على [[http://localhost:3000/uploads/x.png]]: مع الإعداد الافتراضي الصورة هتتمنع، ومع [[cross-origin]] هتظهر.`,
          flag: "script",
          deep: {
            why: "فيه هجمات بتعتمد على إن المتصفح «متساهل»: يعرض موقعك في iframe شفاف فوق زرار (clickjacking)، أو يشغّل ملف مرفوع كأنه script لأنه خمّن نوعه، أو يفتح الموقع بـ http فحد في النص يغيّره. الـ headers دي بتقفل الأبواب دي بإعدادات جاهزة ومجرّبة.",
            how: R`helmet مجموعة middlewares صغيرة، كل واحد بيحط header:

[[Content-Security-Policy]]: الصفحة تحمّل scripts وصور وستايلات منين. أهم header ضد XSS في الصفحات، وأقل أهمية لـ JSON API. [[Strict-Transport-Security]]: المتصفح يفتكر إن الموقع HTTPS بس لمدة سنة. [[X-Content-Type-Options: nosniff]]: متخمّنش النوع، التزم بـ Content-Type. [[X-Frame-Options]]: ممنوع iframe من مواقع تانية. [[Referrer-Policy: no-referrer]]. و [[Cross-Origin-Resource-Policy]] و [[Cross-Origin-Opener-Policy]]: مين يقدر يحمّل مواردك أو يفتح نافذتك.

كل واحد تقدر تعدّله أو تقفله: [[helmet({ contentSecurityPolicy: false })]] لو الـ API بيرجّع JSON بس، أو [[directives]] لو بيخدم صفحات.

ولو ورا Nginx، ممكن الـ headers تتحط في Nginx بدل Express. المهم متتحطش في الاتنين بقيم مختلفة، وافحص النتيجة من بره (درس «فحص الـ headers» في تاب «الأمان»).`,
            when: "كل تطبيق Express، كأول middleware. ولو بيخدم HTML (SSR أو صفحات ثابتة) اشتغل على CSP بجد.",
            mistakes: R`تشيله كله عشان صورة مش ظاهرة، بدل ما تعدّل [[crossOriginResourcePolicy]] بس. في مشروع حقيقي كان فيه ٣ middlewares يدوي لفولدرات الـ uploads، كل واحد بيحط headers الـ CORS و CORP بإيده بنفس الكود المنسوخ، والأسهل إعداد helmet واحد و [[cors()]] واحد. وتفتكر إن helmet بيحمي من XSS و SQL injection في الكود: هو headers بس، والـ validation والـ escaping لسه شغلك.`
          },
          lines: [
            "helmet.",
            "ركّبه أول middleware.",
            "الافتراضي [[same-origin]] بيمنع مواقع تانية تعرض صور أو ملفات من الـ API. لو الواجهة على دومين تاني وبتعرض صور مرفوعة، خليه cross-origin.",
            "قفلة."
          ]
        },
        {
          cmd: "cors",
          title: "خلي الواجهة بتاعتك بس هي اللي تقرا ردود الـ API من المتصفح",
          desc: R`المتصفح بيمنع صفحة على origin تقرا رد من origin تاني إلا لو السيرفر قال صراحة إنه مسموح بـ [[Access-Control-Allow-Origin]]، ودي CORS.

مع الكوكيز ([[credentials]]) القواعد أشد: لازم origin محدد (مش [[*]]) و [[Access-Control-Allow-Credentials: true]]، والواجهة تبعت [[credentials: "include"]].`,
          example: R`import cors from "cors";

app.use(cors({
  origin: config.CORS_ORIGINS,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  maxAge: 600,
}));

// الواجهة
fetch("https://api.example.com/api/tasks", { credentials: "include" });`,
          try: R`من Console على موقع تاني (زي example.com) اعمل [[fetch("http://localhost:3000/api/tasks")]]: هتشوف CORS error. زوّد الـ origin ده في [[CORS_ORIGINS]] وجرّب تاني. وافتح تاب Network وشوف طلب الـ OPTIONS اللي بيحصل قبل POST بـ JSON.`,
          flag: "script",
          deep: {
            why: "من غير الـ same-origin policy، أي موقع تفتحه كان هيقدر يعمل fetch لـ API البنك بتاعك بكوكيزك ويقرا الرد. المتصفح بيمنع القراية دي افتراضيًا (same-origin policy)، و CORS هو الطريقة المنظمة إنك تفتح استثناء لمواقعك انت بس.",
            how: R`الـ origin هو protocol و domain و port مع بعض: [[http://localhost:5173]] و [[http://localhost:3000]] origins مختلفة.

الطلبات «البسيطة» (GET، أو POST بفورم عادي) المتصفح بيبعتها على طول ومعاها [[Origin]]، ويبص على [[Access-Control-Allow-Origin]] في الرد: لو مش مطابق، الطلب اتنفذ على السيرفر فعلًا، بس الصفحة ممنوعة تقرا الرد. أي طلب تاني (JSON، أو header زي Authorization، أو PATCH و DELETE) المتصفح بيبعت قبله preflight: [[OPTIONS]] بيسأل «مسموح؟»، ولو الرد مش تمام الطلب الحقيقي مبيتبعتش خالص.

[[cors()]] من غير options بيرد بـ [[*]] لأي origin، ودا مقبول لـ API عام من غير كوكيز. مع [[credentials: true]] الـ [[*]] مرفوضة من المتصفح، فلازم الـ origin بالظبط. والـ array في [[origin]] بيقارن بالظبط، ولو الـ origin في القايمة بيرجّعه في الـ header، ولو مش فيها مبيحطش الـ header خالص فالمتصفح يمنع.

CORS مش حماية للسيرفر: curl و Postman والسيرفرات التانية مبيطبقوهاش أصلًا. هي بتحمي اليوزر من مواقع تانية بتستخدم متصفحه. والحماية الحقيقية للـ API هي auth.

وفي Express 5، [[app.options("*", cors())]] بتاعة الـ tutorials القديمة بتوقع السيرفر وهو بيقوم. [[app.use(cors())]] بيرد على الـ preflight لوحده، فمش محتاجها.`,
            when: R`لما الواجهة والـ API على origins مختلفة (حتى لو بورت مختلف على localhost). لو الاتنين تحت نفس الدومين من ورا Nginx ([[/api]])، مش محتاج CORS خالص.`,
            mistakes: R`في مشروع حقيقي كان التحقق من الـ origin يدوي بـ [[origin.includes("myapp.com")]]، فـ [[https://myapp.com.evil.io]] بيعدّي، ومعاه [[Allow-Credentials: true]]، يعني موقع المهاجم يقرا بيانات اليوزر. وفي نفس الكود كان في التطوير بيرجّع [[*]] مع [[credentials: true]]، والمتصفح بيرفض الكومبينيشن ده أصلًا. استخدم array بمطابقة كاملة أو regex مقفول من الأول للآخر زي [[/^https:\/\/([a-z0-9-]+\.)?myapp\.com$/]]. و «CORS error» في الـ Console ساعات بيبقى 500 أو 404 طالع من غير headers، فبص على الـ status في Network الأول (درس «CORS» في تاب «المتصفح»).`
          },
          lines: [
            "باكدج cors.",
            "ركّبه قبل الـ routes.",
            "array من الـ origins المسموحة بالظبط (من config)، زي [[https://app.example.com]].",
            "اسمح بالكوكيز مع الطلب ([[Access-Control-Allow-Credentials: true]]). أما header الـ Authorization فمش محتاج ده: بيتسمح بـ [[allowedHeaders]]، و cors بيعكس الـ headers المطلوبة افتراضيًا.",
            "الـ methods المسموحة في رد الـ preflight.",
            "المتصفح يكاش رد الـ preflight ١٠ دقايق بدل ما يسأل كل مرة.",
            "قفلة.",
            R`في الواجهة: من غير [[credentials: "include"]] الكوكيز مبتتبعتش لـ origin تاني.`
          ]
        },
        {
          cmd: "express-rate-limit",
          title: "حد لعدد الطلبات من نفس المصدر",
          desc: R`[[rateLimit]] بيعد طلبات كل IP في فترة، ولو عدّى الحد يرد 429.

حد عام معقول للـ API كله، وحد أشد بكتير لـ login و «نسيت الباسورد» و OTP، لأن دول اللي بيتعمل عليهم تخمين. وورا Nginx أو Cloudflare لازم [[app.set("trust proxy", 1)]]، وإلا كل الطلبات هتبان جاية من IP واحد (الـ proxy) والكل يتحظر مع بعض.`,
          example: R`import { rateLimit } from "express-rate-limit";

app.set("trust proxy", 1);

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false });

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts, try again later" },
});

app.use("/api", apiLimiter);
app.use("/api/auth/login", loginLimiter);`,
          try: R`خلي limit الـ login 3، واعمل ٤ محاولات غلط بـ [[curl -i]] وشوف 429 و headers الـ RateLimit في الرد. وبعدين ابعت [[X-Forwarded-For: 1.2.3.4]] بإيدك، مع trust proxy ومن غيره، واطبع [[req.ip]].`,
          flag: "script",
          deep: {
            why: "من غير حد، أي حد يجرّب مليون باسورد على حساب واحد، أو يبعت ألف طلب OTP (وانت بتدفع تمن كل SMS)، أو يعمل scraping لكل البيانات، أو يضغط السيرفر لحد ما يقع. الـ rate limit مش حماية كاملة، بس بيحوّل الهجمات دي من دقايق لسنين.",
            how: R`الـ limiter بيعمل key لكل طلب (افتراضيًا الـ IP، ومع IPv6 بيجمع الـ subnet كله عشان حد عنده ملايين العناوين ميلفّش عليه)، ويزوّد عداد في الـ store. أول ما العداد يعدّي [[limit]] جوه [[windowMs]]، بيرد 429 من غير ما الطلب يوصل للـ route.

الـ store الافتراضي في الذاكرة: كل نسخة من السيرفر ليها عداد لوحدها، ومع restart بيتصفّر. لو شغّال نسختين (PM2 cluster أو كذا container)، الحد الفعلي بيتضاعف. الحل store مشترك في Redis (باكدج [[rate-limit-redis]] مع [[ioredis]]).

[[trust proxy]]: [[req.ip]] بيتقري من الاتصال نفسه، وورا Nginx الاتصال جاي من Nginx، فالـ IP الحقيقي في [[X-Forwarded-For]]. الرقم [[1]] معناه «ثق في hop واحد قدامي». و [[true]] معناها ثق في أي حاجة، وده خطير: أي حد يبعت [[X-Forwarded-For]] مزيف ويبقى IP جديد مع كل طلب. و express-rate-limit بيحذّرك في اللوج لو شاف الإعداد ده.

و [[keyGenerator]] بيخليك تعد بحاجة غير الـ IP: id اليوزر للـ endpoints المحمية، أو الإيميل في login عشان تحمي الحساب نفسه حتى لو الهجوم من IPs كتير.`,
            when: "كل API عام. والحد الأشد على: login، و register، و forgot password، و OTP، وأي endpoint بيبعت إيميل أو SMS أو بيكلّم AI (بتدفع عليه).",
            mistakes: R`في مشروع حقيقي كان [[ioredis]] و [[rate-limit-redis]] متسطبين، والـ limiter فعليًا بيعد في الذاكرة، ومع أكتر من نسخة كل واحدة بتعد لوحدها. وفي نفس المشروع limiter صفحات الـ CMS كان [[skip]] بتاعه بيعدّي كل GET، فبقى بيحمي الـ POST بس. و [[trust proxy: true]] بدل رقم. ونسيانه خالص ورا Nginx: أول مرة الموقع يتزحم، كل الزوار يتحظروا مع بعض لأنهم «IP واحد».`
          },
          lines: [
            "الـ import بالاسم، الشكل الحديث.",
            "ثق في proxy واحد قدامك (Nginx)، فـ [[req.ip]] يبقى IP الزبون الحقيقي من [[X-Forwarded-For]].",
            "٣٠٠ طلب لكل IP كل ربع ساعة للـ API كله، والـ headers بالشكل الموحد الجديد.",
            "limiter تاني لـ login.",
            "نفس النافذة.",
            "١٠ محاولات بس.",
            "المحاولات الناجحة متتحسبش، فاليوزر العادي عمره ما يتحظر.",
            "رسالة JSON بدل النص الافتراضي.",
            "قفلة.",
            "ركّب العام على كل [[/api]].",
            "والأشد على login بس. الاتنين قبل الـ routes."
          ]
        },
        {
          cmd: "sanitization",
          title: "النص اللي جاي من اليوزر: تنضّفه ولا تهرّبه؟",
          desc: R`القاعدة: اتحقق وانت داخل (validation)، وهرّب وانت خارج (escaping)، ونضّف HTML بس في الحقول اللي هي أصلًا HTML.

فيه ٣ حاجات بتتخلط: validation (ارفض اللي شكله غلط)، و sanitization (غيّر المدخل، زي trim أو شيل HTML)، و escaping (هرّب القيمة وقت ما تحطها في HTML أو SQL). React بيعمل escape لوحده، و Prisma بيبعت القيم كـ parameters لوحده، فأغلب الحماية الحقيقية بتحصل تلقائي لو استخدمت الأدوات صح. والـ HTML اللي جاي من rich text editor بس هو اللي محتاج DOMPurify.`,
          example: R`import DOMPurify from "isomorphic-dompurify";

const profileSchema = z.object({
  name: z.string().trim().max(80),
  bioHtml: z.string().max(5000).transform((html) => DOMPurify.sanitize(html)),
});

const search = String(req.query.q ?? "");
const found = await prisma.task.findMany({ where: { userId: req.user.id, title: { contains: search } } });

const email = z.email().parse(req.body.email);
const user = await User.findOne({ email });`,
          try: R`ابعت bioHtml فيه [[<img src=x onerror=alert(1)>]] واطبع اللي اتحفظ. وفي endpoint بـ Mongoose من غير zod، ابعت [[{"email": {"$ne": null}}]] وشوف بيرجّع مين.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه middleware بيعدّي DOMPurify على كل حقل في كل body. النتيجة: أي نص فيه [[<]] (زي «a < b» أو «<3») بيتحفظ متغير ([[&lt;]])، والحماية الحقيقية (escape وقت العرض) كانت موجودة أصلًا في React. التنضيف العشوائي بيبوّظ بيانات ومبيحميش أكتر. لازم تعرف كل خطر بيتقفل فين.`,
            how: R`كل نوع injection ليه مكان بيتقفل فيه:

SQL injection: بيتقفل بالـ parameters. Prisma وأي query builder بيبعتوا القيم منفصلة عن الـ SQL. الخطر بس في [[$queryRawUnsafe]] أو تجميع strings بإيدك، و [[$queryRaw]] بالـ tagged template آمن لأنه بيحوّل القيم لـ parameters.

NoSQL injection في Mongo: لو [[req.body.email]] وصل object زي [[{ $ne: null }]] بدل string، [[findOne({ email })]] بيرجّع أول يوزر. الحل validation إن القيمة string (zod)، و Mongoose عنده option اسمه [[sanitizeFilter]] بيلف أي object فيه مفتاح بيبدأ بـ [[$]] في [[$eq]]، فالـ operator اللي جاي من برّه بيتعامل كقيمة عادية. ومكتبة [[express-mongo-sanitize]] القديمة مبتشتغلش مع Express 5 لأنها بتكتب على [[req.query]].

XSS: بيتقفل وقت العرض. React بيهرّب أي نص تلقائي، والخطر في [[dangerouslySetInnerHTML]]. لو لازم تحفظ HTML من اليوزر، نضّفه بـ DOMPurify.

Path traversal: اسم ملف جاي من اليوزر زي [[../../.env]]. متستخدمش أسماء اليوزر في المسارات خالص، اعمل اسم بـ UUID (درس [[sharp]]).

وأي مكتبة «بتنضّف كل حاجة» زي [[xss-clean]]: مهجورة، ومبتشتغلش على Express 5، وبتدّيك إحساس زايف بالأمان.`,
            when: "validation على كل حاجة داخلة، دايمًا. sanitize للـ HTML بس لما الحقل HTML فعلًا. والـ escape بيحصل تلقائي لو استخدمت الأدوات صح (React و Prisma)، وشغلك إنك متكسرش ده.",
            mistakes: R`تنضّف الـ body كله بـ DOMPurify فتبوّظ الباسوردات والتوكنات (في المشروع الحقيقي كانوا عاملين قايمة استثناءات للحقول الحساسة عشان كده بالظبط). وتعتمد على [[xss-clean]] وهو مش شغال. وتهرّب HTML وقت الحفظ وكمان وقت العرض، فاليوزر يشوف [[&lt;]] على الشاشة بدل [[<]].`
          },
          lines: [
            "DOMPurify بيشتغل في Node والمتصفح.",
            "schema لبروفايل.",
            "الاسم نص عادي: trim وطول. مش محتاج تنضيف، React هيهرّبه وقت العرض.",
            "الحقل ده HTML فعلًا (من rich editor)، فنضّفه: يشيل script و onerror ويسيب b و p.",
            "قفلة.",
            "البحث: اتأكد إنه نص...",
            "و Prisma بيبعته كـ parameter، فمفيش SQL injection مهما اتكتب. ومعاه شرط الملكية.",
            "في Mongo: اتأكد إنه إيميل، يعني string...",
            "فلو حد بعت object فيه [[$ne]] بدل إيميل، zod رفضه قبل ما يوصل للـ query."
          ]
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 2,
      n: "Prisma من جوه الـ services، و transactions للعمليات اللي لازم تتم كلها أو ولا حاجة، و pagination لأي قايمة",
      items: [
        {
          cmd: "Prisma client",
          title: "كلّم الداتابيز من الـ service",
          desc: R`Prisma بيولّد client من الـ schema فيه دالة لكل جدول ([[prisma.task.findMany]] و [[create]] و [[update]])، وبتعمل منه instance واحد للتطبيق كله في [[db.js]].

إزاي تكتب الـ schema والـ migrations وإعداد Prisma 7 (الـ generator والـ driver adapter)، ده في تاب «SQL و Prisma». هنا بنستخدمه من Express.`,
          example: R`// services/tasks.service.js
import { prisma } from "../db.js";

export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });

export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });

export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};`,
          try: R`حوّل الـ array اللي في الذاكرة لجدول Task في Prisma، وخلي كل الـ services تستخدمه. شغّل السيرفر مرتين ورا بعض واتأكد إن البيانات لسه موجودة. وفعّل [[log: ["query"]]] في الـ client وشوف الـ SQL الحقيقي.`,
          flag: "script",
          deep: {
            why: "الـ array اللي في الذاكرة بيضيع مع كل restart ومبيتشاركش بين نسختين. الداتابيز هي المكان الحقيقي، و Prisma بيخليك تكلّمها بـ JavaScript فيه autocomplete وأنواع بدل SQL strings، ومن غير SQL injection.",
            how: R`الـ client بيفتح pool من الاتصالات بالداتابيز ويعيد استخدامها، وكل [[new PrismaClient()]] يعني pool جديد. عشان كده instance واحد في [[db.js]]، وكل الملفات بتستورد نفس الـ module (والـ module في Node بيتحمّل مرة واحدة). اتنين أو تلاتة instances في ملفات مختلفة معناها اتصالات مضاعفة، ومع كل restart في التطوير ممكن توصل لـ [[too many connections]].

في Prisma 7: الـ generator الجديد [[prisma-client]] بيطلّع الكود في فولدر انت بتحدده (مش جوه node_modules) وبتستورد منه، ومحتاج driver adapter زي [[@prisma/adapter-pg]]، ومتغيرات البيئة مبقتش بتتقري لوحدها. والكود المتولّد TypeScript، فلو الـ backend بتاعك JavaScript غالبًا هتكتبه TypeScript أو تشغّله بـ tsx. كل ده بالتفصيل في تاب «SQL و Prisma».

[[select]] بيرجّع الحقول اللي طلبتها بس، ودا مهم لحاجتين: الأداء، وإنك متسرّبش [[passwordHash]] في رد بالغلط. و [[include]] بيجيب العلاقات ([[include: { tags: true }]]).

والأخطاء ليها [[code]]: [[P2002]] قيمة unique اتكررت (الإيميل موجود)، و [[P2025]] السجل مش موجود في update أو delete. حوّلهم لـ 409 و 404 في الـ error handler.`,
            when: "أي backend بـ Postgres أو MySQL أو SQLite. البدائل: Drizzle (أقرب لـ SQL وأخف)، و Kysely، أو [[pg]] مباشرة لو عايز SQL صافي.",
            mistakes: R`في مشروع حقيقي كان [[db.js]] عامل singleton صح، بس فيه كمان [[setInterval]] كل دقيقتين يعمل [[SELECT 1]] ويعيد الاتصال بإيده. Prisma بيدير الـ pool لوحده، والكود ده زوّد تعقيد من غير فايدة. وترجّع نتيجة [[prisma.user.findUnique]] كلها في الرد ومعاها الـ hash. و [[await]] جوه loop على ١٠٠٠ عنصر بدل [[createMany]] أو شرط [[in]].`
          },
          lines: [
            "الـ client الوحيد من db.js.",
            "مهام يوزر معين...",
            "بشرط الملكية، والأحدث الأول، والحقول اللي محتاجها بس.",
            "إضافة: البيانات المتحققة ومعاها صاحبها من التوكن.",
            "تعديل.",
            "عدّل بشرط الملكية.",
            "متعدلش حاجة: 404.",
            "رجّع النسخة الجديدة.",
            "قفلة."
          ]
        },
        {
          cmd: "$transaction",
          title: "عمليتين لازم يحصلوا مع بعض أو ميحصلوش خالص",
          desc: R`الـ transaction بتضمن إن كل الـ queries جواها تنجح مع بعض، أو لو واحدة فشلت كله يرجع زي ما كان.

الأوردر يتعمل، والمخزون يقل، والكوبون يتحسب: لو حاجة وقعت في النص، مفيش أوردر من غير خصم مخزون. في Prisma: [[prisma.$transaction(async (tx) => { ... })]]، وجواها بتستخدم [[tx]] بدل [[prisma]].`,
          example: R`export async function redeemCoupon(userId, code) {
  return prisma.$transaction(async (tx) => {
    const coupon = await tx.coupon.findUnique({ where: { code } });
    if (!coupon) throw new AppError(404, "Coupon not found");
    const updated = await tx.coupon.updateMany({
      where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
      data: { usedCount: { increment: 1 } },
    });
    if (updated.count === 0) throw new AppError(409, "Coupon fully used");
    return tx.redemption.create({ data: { userId, couponId: coupon.id } });
  });
}`,
          try: R`اعمل كوبون [[maxUses: 1]]، وابعت طلبين في نفس اللحظة (أمرين curl في نفس السطر بـ [[&]] بينهم). مع الكود ده واحد بس هينجح. وبعدين جرّب النسخة الغلط: [[count]] وبعدين [[create]] من غير الشرط، وشوف الاتنين بينجحوا.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف ممكن تقع في النص: السيرفر يقف، أو constraint يتكسر، أو خطأ في الكود. من غير transaction بتفضل بيانات نص-نص: فلوس اتخصمت ومفيش أوردر. ومع طلبين في نفس اللحظة، «اتأكد وبعدين اكتب» بيسمح للاتنين يعدّوا من نفس الشرط.",
            how: R`Prisma فيه شكلين: array ([[prisma.$transaction([q1, q2])]]) لـ queries مستقلة عن بعض، و interactive (الدالة) لما query محتاجة نتيجة اللي قبلها. في الـ interactive، Prisma بيفتح [[BEGIN]]، وينفّذ اللي جوه على نفس الاتصال، ولو الدالة خلصت يعمل [[COMMIT]]، ولو رمت خطأ يعمل [[ROLLBACK]] (درس «BEGIN و ROLLBACK» في تاب «PostgreSQL»).

الـ transaction لوحدها مش بتحل الـ race condition: في مستوى العزل الافتراضي في Postgres (Read Committed)، طلبين ممكن يقروا نفس [[usedCount]] مع بعض ويقرروا الاتنين إن لسه فيه مكان. عشان كده الشرط اتحط جوه الـ update نفسه، والداتابيز بتقفل الصف وقت الـ update، فالطلب التاني بيستنى ويشوف القيمة الجديدة ومبيلاقيش صف يطابق. البدائل: [[SELECT ... FOR UPDATE]] بـ [[$queryRaw]]، أو [[isolationLevel: "Serializable"]] مع إعادة المحاولة لو فشلت، أو unique constraint يمنع التكرار.

الـ interactive transaction بتمسك اتصال من الـ pool طول ما هي شغالة، وليها timeout افتراضي ٥ ثواني. عمرك ما تنادي API خارجي (دفع أو إيميل) جوه transaction: ابعت الإيميل بعد ما الـ transaction تخلص.`,
            when: "أي عملية بتكتب في أكتر من جدول ولازم تفضل متسقة: أوردر، وتحويل رصيد، وكوبون، وتسجيل مع إنشاء بروفايل. وأي «اتأكد وبعدين اكتب» على حاجة ليها حد.",
            mistakes: R`في مشروع حقيقي كان التحقق من حد استخدام الكوبون [[count]] وبعدين [[create]] كخطوتين منفصلتين من غير transaction ولا شرط ذرّي، فطلبين في نفس اللحظة ممكن يعدّوا الحد. وتستخدم [[prisma]] بدل [[tx]] جوه الـ transaction بالغلط، فالـ query دي بره الـ transaction ومبترجعش مع الـ rollback. وتحط fetch لبوابة دفع جوه transaction فتفضل ماسكة اتصال ١٠ ثواني وتقع بـ timeout.`
          },
          lines: [
            "استخدام كوبون ليه حد أقصى.",
            "كل اللي جوه transaction واحدة، و [[tx]] client مربوط بيها.",
            "هات الكوبون.",
            "مش موجود: throw، والـ transaction كلها ترجع.",
            "زوّد العداد، بس بشرط...",
            "إنه لسه أقل من الحد. الشرط والزيادة في query واحدة، فطلبين في نفس اللحظة ميعدّوش الاتنين.",
            "زوّد ١.",
            "قفلة.",
            "متعدلش حاجة؟ يبقى خلص. throw يلغي كل حاجة.",
            "سجّل الاستخدام. لو ده فشل، الزيادة اللي فوق بترجع.",
            "قفلة الـ transaction.",
            "قفلة."
          ]
        },
        {
          cmd: "mongoose",
          title: "لو الداتابيز MongoDB",
          desc: R`Mongoose بيدّيك schema و model لكل collection في Mongo ([[Task.find()]] و [[Task.create()]])، وبيقعد في نفس مكان Prisma في المعمارية: جوه الـ services.

أوامر الشيل (mongosh والباك أب) في تاب «MongoDB». هنا الاستخدام من Express باختصار.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(config.MONGO_URL);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  done: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean();`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل الـ model ده، وجرّب [[Task.create]] من غير title وشوف الـ ValidationError. وقارن سرعة [[find()]] بـ [[lean()]] ومن غيرها على ١٠٠٠٠ مستند.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير (خصوصًا لوحات الإدارة والمشاريع القديمة) مبنية على Mongo و Mongoose، وأي انترفيو Node ممكن يسألك عنه. Mongo نفسها مفيهاش schema، و Mongoose بيرجّعلك الشكل والتحقق على مستوى التطبيق.",
            how: R`[[mongoose.connect]] بيفتح pool، و Mongoose بيخزّن أي عمليات لحد ما الاتصال يجهز (buffering)، فالـ query قبل الاتصال مبتفشلش على طول: بتستنى ١٠ ثواني وبعدين تفشل. عشان كده [[await connect]] قبل [[listen]].

الـ schema بتعمل validation وقت [[save]] و [[create]]، بس مش افتراضيًا في [[updateOne]] و [[findOneAndUpdate]] إلا لو [[runValidators: true]]. والـ documents اللي بترجع من [[find]] objects تقيلة فيها دوال (save و populate)، و [[lean()]] بيرجّع objects عادية أسرع وأخف لو هتقرا بس.

[[populate("userId")]] بيجيب المستند المرتبط بـ query تانية (Mongo مفيهاش joins زي SQL)، وده سهل يعمل N+1 لو اتعمل جوه loop.

والـ transactions في Mongo محتاجة replica set حتى لو node واحدة. و ObjectId مش صحيح (زي [[abc]]) بيعمل [[CastError]]، فاتحقق منه قبل الـ query.`,
            when: "بيانات شكلها بيتغير كتير، أو مستندات متداخلة بتتقري مع بعض، أو مشروع قايم عليه. للبيانات المترابطة (فلوس وأوردرات وصلاحيات)، Postgres غالبًا اختيار أأمن.",
            mistakes: R`[[findOneAndUpdate]] من غير [[runValidators]] فبيانات غلط تتحفظ. و [[find()]] من غير [[limit]] على collection فيها مليون مستند. وفي مشروع حقيقي كان [[pre("save")]] بيعمل hash للباسورد (صح)، بس الـ model نفسه كان فيه حقل للباسورد نص صريح جنبه (درس [[bcrypt]]).`
          },
          lines: [
            "Mongoose.",
            "اتصل مرة واحدة وانت بتقوم، قبل listen.",
            "شكل المستند.",
            "نص مطلوب، يتشال منه المسافات، وأقصاه ٢٠٠.",
            "boolean والافتراضي false.",
            "مرجع ليوزر، ومعاه index عشان البحث بيه يبقى سريع.",
            "[[timestamps]] بيضيف createdAt و updatedAt لوحده.",
            "الـ model اللي هتستخدمه في الـ services.",
            "مهام اليوزر، الأحدث، أول ٢٠. [[lean]] بيرجّع objects عادية أسرع."
          ]
        },
        {
          cmd: "pagination",
          title: "متبعتش ١٠٠ ألف صف في رد واحد",
          desc: R`أي endpoint بيرجّع قايمة لازم يرجّع صفحة ([[?page=2&limit=20]])، والـ limit ليه حد أقصى من عندك مهما اليوزر طلب.

والرد فيه البيانات ومعاها معلومات الصفحة. والفلترة والترتيب من الـ query برضه، بس من قايمة مسموحة: الترتيب بـ [[createdAt]] أو [[title]] بس، مش بأي عمود اليوزر يكتبه.`,
          example: R`const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  done: z.stringbool().optional(),
});

router.get("/", async (req, res) => {
  const { page, limit, sort, done } = ListQuery.parse(req.query);
  const where = { userId: req.user.id, ...(done !== undefined && { done }) };
  const [items, total] = await prisma.$transaction([
    prisma.task.findMany({ where, orderBy: [{ [sort]: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    prisma.task.count({ where }),
  ]);
  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
});`,
          try: R`اعمل ١٠٠٠ مهمة بسكربت seed، وجرّب [[?page=3&limit=10]] و [[?limit=5000]] و [[?sort=password]]. التانيين لازم 400: زوّد في الـ error handler إن [[ZodError]] يتحول لـ 400. وبعدين جرّب [[?page=90]] وقيس الوقت، وفكّر ليه بيبطأ مع الصفحات البعيدة.`,
          flag: "script",
          deep: {
            why: "القايمة بتكبر مع الوقت. endpoint بيرجّع كله بيبقى سريع أول شهر، وبعد سنة بيرجّع ٥٠ ميجا وياخد ١٠ ثواني ويوقّع الموبايل. والـ limit من غير حد أقصى بيخلي أي حد يطلب مليون صف في طلب واحد.",
            how: R`offset pagination ([[skip]] و [[take]]، يعني [[OFFSET]] و [[LIMIT]] في SQL) أبسط حاجة وبتدّيك أرقام صفحات. عيبين: الداتابيز لازم تعدّي على كل الصفوف اللي قبل الـ offset، فالصفحة ٥٠٠٠ بطيئة. ولو حاجة اتضافت وانت بتقلّب، بتشوف عنصر مرتين أو يفوتك.

cursor pagination: بدل «اقفز ٤٠»، «هات ٢٠ بعد العنصر ده». في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]]، أو شرط [[id: { lt: lastId }]]. سريع مهما بعدت لأنه بيستخدم الـ index، وثابت مع الإضافات. بس مفيش «روح لصفحة ٧». ده اللي بيستخدم في infinite scroll والـ feeds.

[[count]] على جدول كبير ممكن يبقى بطيء هو كمان. في الـ cursor pagination غالبًا مش محتاجه: بترجّع [[nextCursor]] بس، ولو null يبقى خلصت.

والترتيب لازم يبقى ثابت: لو اتنين ليهم نفس [[createdAt]]، رتّب بـ id كمان (زي المثال)، وإلا نفس العنصر ممكن يظهر في صفحتين. واعمل index على الأعمدة اللي بتفلتر وترتّب بيها. وتصميم الـ pagination في الـ API بالتفصيل في تاب «APIs متقدمة».`,
            when: "أي قايمة ممكن تعدّي ١٠٠ عنصر. offset للوحات الأدمن والجداول بأرقام صفحات، و cursor للـ feeds والموبايل والجداول الكبيرة.",
            mistakes: R`في مشروع حقيقي الـ schema المشتركة للـ pagination كانت بتسمح بـ [[pageSize]] لحد ١٠٠٠، يعني صفحة واحدة ممكن تبقى تقيلة جدًا. خلي الحد الأقصى صغير. وتعدّي [[req.query.sort]] مباشرة لـ [[orderBy]]. و [[skip: page * limit]] بدل [[(page - 1) * limit]] فالصفحة الأولى تضيع.`
          },
          lines: [
            "schema للـ query.",
            "رقم الصفحة من ١، والافتراضي ١.",
            "حجم الصفحة من ١ لـ ١٠٠ مهما طلب، والافتراضي ٢٠.",
            "الترتيب من قايمة مسموحة بس.",
            R`فلتر اختياري، و [[stringbool]] بيحوّل [["false"]] لـ false فعلًا.`,
            "قفلة.",
            "قايمة المهام.",
            "اتحقق من الـ query، ولو غلط بيرمي ZodError.",
            "الشرط: مهامي، ولو فيه فلتر done زوّده.",
            "الصفحة والعدد الكلي في transaction واحدة (الشكل الـ array).",
            "رتّب بالحقل المختار وبعده الـ id عشان الترتيب يبقى ثابت، واقفز على الصفحات اللي فاتت، وخد limit.",
            "العدد الكلي بنفس الشرط.",
            "قفلة.",
            "البيانات ومعلومات الصفحات عشان الواجهة تعمل الأزرار.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "ملفات وإيميلات ولوجات",
      l: 2,
      n: "multer و sharp للصور، و nodemailer و Resend للإيميلات، و morgan و pino للوجات",
      items: [
        {
          cmd: "multer",
          title: "استقبل ملف من فورم بحدود واضحة",
          desc: R`رفع الملفات بييجي [[multipart/form-data]] و [[express.json()]] مبيقراهوش، و [[multer]] بيقراه ويحط الملف في [[req.file]] والحقول النصية في [[req.body]].

أهم حاجة الحدود: أقصى حجم، وعدد الملفات، والأنواع المسموحة. من غيرها أي حد يرفعلك ملف ٥ جيجا.`,
          example: R`import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new AppError(400, "Only JPEG, PNG or WebP"), ok);
  },
});

router.post("/avatar", requireAuth, upload.single("avatar"), users.uploadAvatar);
// curl -F "avatar=@me.jpg" -H "Authorization: Bearer ..." localhost:3000/api/users/avatar`,
          try: R`ارفع صورة بـ [[curl -F]]، وبعدين ملف ٦ ميجا، وبعدين PDF غيّرت اسمه لـ [[x.jpg]]. شوف كل واحد بيرجّع إيه، وزوّد في الـ error handler إن [[MulterError]] بكود [[LIMIT_FILE_SIZE]] يتحول لـ 413.`,
          flag: "script",
          deep: {
            why: "صور البروفايل، وإيصالات الدفع، والمستندات: كل تطبيق تقريبًا بيستقبل ملفات. والرفع أخطر input عندك: كبير، و binary، واسمه ونوعه جايين من العميل، وممكن يتنفّذ لو اتحط في مكان غلط.",
            how: R`multer بيقرا الـ stream بتاع الطلب ويفصل الأجزاء. [[memoryStorage]] بيجمع الملف كله في Buffer في الرام ([[req.file.buffer]])، و [[diskStorage]] بيكتبه على الديسك وانت بتحدد الفولدر والاسم. و [[limits.fileSize]] بيقطع الرفع أول ما يعدّي الحد ويرمي [[MulterError]] بكود [[LIMIT_FILE_SIZE]]، والخطأ بيروح لـ error middleware.

[[file.mimetype]] و [[file.originalname]] جايين من العميل كما هم، فأي حد يسمّي ملف [[shell.php.jpg]] ويقول إنه [[image/jpeg]]. عشان كده الفلتر هنا أول خط بس، والتحقق الحقيقي إنك تقرا محتوى الملف (sharp بيفشل لو مش صورة، الدرس الجاي)، وعمرك ما تستخدم [[originalname]] كاسم للحفظ.

[[single]] لملف واحد، و [[array("photos", 5)]] لكذا ملف في نفس الحقل، و [[fields]] لحقول مختلفة. والحقول النصية في نفس الفورم بتوصل في [[req.body]] بعد multer بس، فالـ validation بتاعها لازم يبقى بعده.

وللملفات الكبيرة (فيديوهات)، الأحسن الواجهة ترفع مباشرة على S3 أو R2 بـ presigned URL، والـ API يدّيها اللينك بس، فالملف مبيعدّيش على السيرفر خالص.`,
            when: "أي رفع ملفات لـ Express. memoryStorage للصور الصغيرة اللي هتعالجها، و diskStorage للملفات الأكبر، و presigned URL للفيديوهات والملفات الضخمة.",
            mistakes: R`في مشروع حقيقي كان فيه [[memoryStorage]] مع حد ١٠٠ ميجا للفيديو و ٥٠٠ ميجا للـ PDF. كل رفع بيتحط كله في الرام، فكام رفعة في نفس الوقت ممكن يوقّعوا السيرفر (out of memory). للملفات الكبيرة: disk أو رفع مباشر. وفي نفس المشروع رسالة الخطأ كانت بتقول «10MB» والحد الفعلي 100MB، فخلي الرسالة تتبني من نفس الرقم. وتحفظ بـ [[originalname]] مع diskStorage، فحد يرفع ملف بنفس اسم ملف موجود في الفولدر (زي صورة يوزر تاني) ويكتب عليه، ولو [[preservePath: true]] متفعّل كمان اسم زي [[../../app.js]] يطلع بره الفولدر.`
          },
          lines: [
            "multer.",
            "إعدادات الرفع.",
            "خلي الملف في الذاكرة كـ Buffer عشان sharp يعالجه بعدين. مناسب للصور الصغيرة بس.",
            "أقصى حجم ٥ ميجا، وملف واحد.",
            "فلتر بيشتغل قبل ما الملف يتقري.",
            "النوع من قايمة مسموحة. خلي بالك: الـ mimetype جاي من العميل ويتزوّر، والتحقق الحقيقي بعدين بـ sharp.",
            "ارفض بـ 400 أو اقبل.",
            "قفلة الفلتر.",
            "قفلة.",
            R`[[single("avatar")]]: ملف واحد في الحقل ده، وبعد requireAuth عشان محدش يرفع من غير login.`
          ]
        },
        {
          cmd: "sharp",
          title: "صغّر الصورة واتأكد إنها صورة فعلًا",
          desc: R`[[sharp]] بيقرا الصورة ويصغّرها ويحوّلها لـ WebP، ولأنه لازم يفكها عشان يشتغل عليها، لو الملف مش صورة حقيقية بيفشل.

ودي أحسن طريقة تتأكد من النوع بعد multer. وإعادة الترميز بتشيل الـ metadata (زي مكان التصوير من الـ GPS) افتراضيًا، ودا مهم لخصوصية اليوزرز.`,
          example: R`import sharp from "sharp";
import { randomUUID } from "node:crypto";

export async function saveAvatar(buffer) {
  const meta = await sharp(buffer).metadata().catch(() => null);
  if (!meta || !["jpeg", "png", "webp"].includes(meta.format)) throw new AppError(400, "Not a valid image");
  const name = $__bt$__{randomUUID()}.webp$__bt;
  await sharp(buffer).rotate().resize(512, 512, { fit: "cover" }).webp({ quality: 80 }).toFile($__btuploads/avatars/$__{name}$__bt);
  return $__bt/uploads/avatars/$__{name}$__bt;
}`,
          try: R`اعمل فولدر [[uploads/avatars]]، وارفع صورة موبايل فيها GPS، وقارن الـ EXIF قبل وبعد بأي EXIF viewer. وارفع ملف نصي اسمه منتهي بـ [[.jpg]] واتأكد إنه 400. وقارن الحجم قبل وبعد.`,
          flag: "script",
          deep: {
            why: "صورة الموبايل ٤ لـ ٨ ميجا، والبروفايل بيتعرض ٦٤ بكسل. من غير resize، كل صفحة فيها ١٠ يوزرز بتحمّل ٥٠ ميجا. ومن غير تحقق من المحتوى، أي ملف متسمّي صورة بيعدّي. وصور الموبايل فيها GPS بيقول اليوزر ساكن فين.",
            how: R`sharp مبني على مكتبة libvips (مكتوبة C)، فسريع جدًا وبيستهلك ذاكرة قليلة، والشغل التقيل بيحصل في thread pool مش على الـ event loop. و [[metadata()]] بيقرا الـ header بس من غير ما يفك الصورة كلها، فسريع.

[[rotate()]] من غير رقم بيقرا اتجاه EXIF ويلف الصورة فعلًا، لأن بعد ما الـ metadata تتشال الصورة هتظهر مقلوبة لو ملفتهاش. [[fit: "cover"]] بيقص ويملّا المقاس، و [[inside]] بيصغّر من غير قص، و [[withoutEnlargement]] بيمنع تكبير صورة صغيرة.

الاسم: [[randomUUID()]] بدل اسم اليوزر، فمفيش path traversal ولا ملف يكتب على ملف تاني.

التخزين على الديسك ([[uploads/]]) أبسط، بس بيضيع لو الـ container اتمسح من غير volume، ومبيتشاركش بين سيرفرين. للإنتاج الأحسن object storage زي S3 أو Cloudflare R2 أو Supabase Storage: [[toBuffer()]] بدل [[toFile()]]، وترفع الـ Buffer بالـ SDK بتاعهم ([[PutObjectCommand]] في [[@aws-sdk/client-s3]] مثلًا)، وتحفظ الـ key في الداتابيز. في مشروع حقيقي كان الشكل ده بالظبط: multer في الذاكرة، ثم sharp، ثم رفع لـ Supabase Storage.

والملفات الخاصة (إيصالات، ومستندات) متتخدمش static خالص: route محمي بيتأكد من الملكية وبعدين [[res.sendFile]]، أو signed URL بعمر قصير.`,
            when: "أي صورة جاية من يوزر. ولو هتعرضها بأكتر من مقاس، اعمل أكتر من نسخة (thumb و medium) وقت الرفع، أو استخدم CDN بيعمل resize.",
            mistakes: R`تحط [[uploads]] كلها على [[express.static]] ومعاها ملفات خاصة، فأي حد يخمّن الاسم ياخدها. في مشروع حقيقي إيصالات الدفع كانت جوه نفس الفولدر، واتحلّت بـ if بيمنع المسار ده بالذات من الـ static. الأنضف فولدر خاص بره الـ static خالص. وتنسى [[rotate()]] فصور الموبايل تظهر نايمة.`
          },
          lines: [
            "sharp.",
            "UUID عشوائي من Node.",
            "بتاخد الـ Buffer اللي multer جابه.",
            "اقرا معلومات الصورة. لو الملف مش صورة، sharp يرمي ونخليها null.",
            "مش صورة، أو نوع مش مسموح: 400. ده التحقق الحقيقي، مش الـ mimetype.",
            "اسم جديد عشوائي. اسم اليوزر عمره ما يدخل المسار.",
            "لف الصورة حسب EXIF، وقص ٥١٢ في ٥١٢، وحوّل لـ WebP بجودة ٨٠، واكتبها. الـ metadata بتتشال.",
            "رجّع المسار عشان يتحفظ في الداتابيز.",
            "قفلة."
          ]
        },
        {
          cmd: "nodemailer",
          title: "ابعت إيميل من السيرفر عن طريق SMTP",
          desc: R`[[nodemailer]] بيبعت إيميلات عن طريق أي سيرفر SMTP (Gmail، أو خدمة زي Resend و Brevo و SES): transporter مرة واحدة بإعدادات من config، وبعدين [[sendMail]].

الإيميل مش مضمون ولا سريع: ممكن ياخد ثواني أو يفشل. فمتخليش الطلب يستنى عليه لو مش لازم، ومتخليش فشله يوقّع العملية الأساسية.`,
          example: R`import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: 587, secure: false,
  auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
});

export async function sendResetEmail(to, link) {
  await transporter.sendMail({
    from: '"MyApp" <no-reply@example.com>',
    to,
    subject: "Reset your password",
    text: $__btOpen this link within 30 minutes: $__{link}$__bt,
    html: $__bt<p>Open <a href="$__{link}">this link</a> within 30 minutes.</p>$__bt,
  });
}`,
          try: R`اعمل حساب تجربة على Ethereal بـ [[nodemailer.createTestAccount()]]، وحط بياناته في .env، وابعت إيميل وافتح لينك المعاينة من [[nodemailer.getTestMessageUrl(info)]]. وبعدين نادي [[transporter.verify()]] وانت بتقوم عشان تكتشف إعدادات SMTP الغلط بدري.`,
          flag: "script",
          deep: {
            why: "تأكيد الإيميل، ونسيت الباسورد، وإيصال الطلب، وتنبيهات الأدمن: كلها إيميلات السيرفر لازم يبعتها. و SMTP هو البروتوكول العام اللي أي خدمة إيميل بتفهمه، فالكود بتاعك مش مربوط بمزوّد.",
            how: R`الـ transporter بيفتح اتصال TCP بسيرفر الـ SMTP، ويعمل TLS، ويسجّل دخول، ويبعت الرسالة. [[pool: true]] بيخلي الاتصال مفتوح لإيميلات كتير ورا بعض بدل اتصال لكل واحد.

الـ deliverability (يوصل للـ inbox مش السبام) مش في الكود: الدومين بتاع [[from]] لازم عليه SPF و DKIM و DMARC في الـ DNS، ودا بيتعمل من لوحة الخدمة. و Gmail الشخصي بيقفلك بعد كام إيميل في اليوم ومش معمول لكده.

والسرعة: [[sendMail]] ممكن ياخد ثانية أو اتنين. في «نسيت الباسورد» ينفع ترد على اليوزر الأول وتبعت في الخلفية، بس لو السيرفر وقع قبل ما يبعت، الإيميل بيضيع. الحل الأصح queue (درس [[node-cron]] وتاب «APIs متقدمة»).

ولينك الـ reset نفسه: توكن عشوائي، والـ hash بتاعه في الداتابيز، وعمره قصير (٣٠ دقيقة)، ويتستخدم مرة واحدة. ودايمًا رد «لو الإيميل موجود هيوصلك لينك» عشان محدش يعرف مين مسجّل.`,
            when: "لو معاك SMTP من أي مزوّد وعايز مرونة تغيّره. ولو المزوّد عنده API (زي Resend)، الـ API غالبًا أسهل (الدرس الجاي).",
            mistakes: R`في مشروع حقيقي كانت دالة الإرسال بتعمل [[attachments.push(logo)]] على الـ array اللي جاية من اللي نادى، فلو نفس الـ array اتستخدمت مرتين اللوجو يتكرر. متعدّلش في الـ arguments. وتعمل transporter جديد مع كل إيميل. وتبعت الإيميل جوه transaction أو قبل ما الداتا تتحفظ، فيوصل لينك لحاجة مش موجودة.`
          },
          lines: [
            "nodemailer.",
            "transporter واحد للتطبيق كله بإعدادات ثابتة. (من غير [[pool: true]] بيفتح اتصال جديد مع كل إيميل.)",
            "سيرفر الـ SMTP من config.",
            "587 مع STARTTLS: بيبدأ عادي وبعدين يتشفّر. (465 يعني [[secure: true]] من الأول.)",
            "اليوزر والباسورد (أو API key في خدمات زي Resend).",
            "قفلة.",
            "دالة لإيميل معين.",
            "ابعت.",
            "المرسل: الاسم والإيميل. الدومين لازم يبقى متوثّق عند الخدمة.",
            "المستلم.",
            "العنوان.",
            "نسخة نص عادي، لبرامج الإيميل اللي مبتعرضش HTML ولفلاتر السبام.",
            "نسخة HTML.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "Resend",
          title: "ابعت إيميل بـ API بدل SMTP",
          desc: R`خدمات الإيميل الحديثة بتدّيك HTTP API: بتبعت JSON بالمستلم والعنوان والمحتوى، وبترجّعلك id أو خطأ واضح. Resend مثال مشهور، و SDK بتاعه في Node سطرين.

نفس القواعد: الدومين لازم يتوثّق عندهم، والمفتاح في .env، والإرسال ميوقّعش العملية الأساسية لو فشل.`,
          example: R`import { Resend } from "resend";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendWelcome(user) {
  const { data, error } = await resend.emails.send({
    from: "MyApp <hello@example.com>",
    to: [user.email],
    subject: "Welcome to MyApp",
    html: "<p>Your account is ready.</p>",
  });
  if (error) console.error("welcome email failed", { userId: user.id, error });
  return data?.id;
}`,
          try: R`اعمل حساب Resend وجرّب الإرسال من [[onboarding@resend.dev]] لإيميل حسابك (ده بيشتغل من غير توثيق دومين، للتجربة بس). وبعدين حط مفتاح غلط وشوف شكل [[error]].`,
          flag: "script",
          deep: {
            why: "SMTP بروتوكول قديم: اتصال وتسجيل دخول وبورتات ممكن تبقى مقفولة عند مزوّد السيرفر (VPS كتير بيقفلوا بورت 25 وأحيانًا غيره). الـ API مجرد HTTPS، وبيرجّع أخطاء واضحة، وفيه مميزات زي الجدولة و idempotency و webhooks لـ «اتفتح» و «ارتد».",
            how: R`[[resend.emails.send]] بيعمل POST للـ API بتاعهم والمفتاح في [[Authorization]]. ولو الطلب فشل (مفتاح غلط، أو دومين مش متوثّق، أو rate limit) بيرجّع [[error]] فيه [[name]] و [[message]] بدل ما يرمي، فلازم تبص عليه بنفسك. لو نسيت، الفشل بيعدّي بصمت.

Resend بيدعم كمان SMTP، فممكن تستخدمه من nodemailer بالـ host بتاعهم. في مشروع حقيقي كان ده الشكل: nodemailer على SMTP بتاع Resend، والـ SDK كمان متسطّب ومش مستخدم. اختار طريقة واحدة.

الإيميلات المهمة (فواتير، و reset) لو هتعيد محاولة إرسالها، Resend بيدعم [[idempotencyKey]] عشان متوصلش مرتين. وقوالب الإيميل ممكن تتكتب بـ React Email بدل HTML strings.`,
            when: "مشروع جديد: API غالبًا أسهل. SMTP لو المزوّد مش عنده API، أو عايز تبدّل مزوّدين من غير تغيير كود.",
            mistakes: R`تفتكر إن [[await resend.emails.send]] بيرمي لو فشل، فمتبصش على [[error]]. وتحط قيمة من اليوزر (زي الاسم) في الـ HTML من غير escape، فحد يسمّي نفسه HTML ويبعت لينكات تصيد في إيميلات رسمية طالعة من دومينك: هرّب أي قيمة، أو استخدم React Email اللي بيهرّب لوحده. والمفتاح في كود الواجهة بدل السيرفر.`
          },
          lines: [
            "SDK بتاع Resend.",
            "client بالمفتاح من config.",
            "إيميل ترحيب.",
            "ابعت. المكتبة مبترميش، بترجّع [[data]] أو [[error]].",
            "المرسل من دومين متوثّق.",
            "المستلم (ممكن أكتر من واحد).",
            "العنوان.",
            "المحتوى HTML، من غير قيم جاية من اليوزر.",
            "قفلة.",
            "لو فشل سجّله، ومتوقفش التسجيل كله عشان إيميل ترحيب.",
            "رجّع الـ id لو محتاجه.",
            "قفلة."
          ]
        },
        {
          cmd: "morgan",
          title: "سطر لوج لكل طلب",
          desc: R`[[morgan]] middleware بيطبع سطر لكل طلب فيه الـ method والعنوان والـ status: [[dev]] ملوّن ومختصر ومعاه المدة للتطوير، و [[combined]] بصيغة لوجات Apache و Nginx المعروفة (فيها الـ IP والتاريخ والـ user-agent، من غير المدة).

بسيط ومفيد، بس نص عادي: صعب تدوّر فيه أو تربطه بباقي اللوجات. للإنتاج، اللوجات المنظمة (JSON) أحسن، الدرس الجاي.`,
          example: R`import morgan from "morgan";

app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev", { skip: (req) => req.path === "/health" }));
// أو صيغة مخصصة من tokens بدلها (مش جنبها): morgan(":method :url :status :response-time ms")

// GET /api/tasks 200 4.123 ms - 512
// ::ffff:10.0.0.5 - - [29/Sep/2026:10:00:00 +0000] "GET /api/tasks HTTP/1.1" 200 512 "-" "curl/8.5.0"`,
          try: R`جرّب الصيغتين، وبعدين خلي morgan يكتب في ملف بـ [[stream: fs.createWriteStream("access.log", { flags: "a" })]]. وفكّر: لو عايز تعرف كل الطلبات اللي رجعت 500 امبارح، هتدوّر إزاي؟`,
          flag: "script",
          deep: {
            why: "أول سؤال لما حاجة تبوظ: «إيه الطلبات اللي جت؟». من غير لوج للطلبات بتبقى أعمى، و morgan بيدّيك ده في سطر.",
            how: R`morgan بيسجّل وقت البداية، ويستنى الرد يخلص، ويطبع السطر بالـ tokens: [[:method]] و [[:url]] و [[:status]] و [[:response-time]] و [[:remote-addr]] و [[:user-agent]]. وتقدر تعمل token بنفسك بـ [[morgan.token("user", (req) => req.user?.id)]].

بيكتب على stdout افتراضيًا، ودا الصح في Docker و PM2: هما اللي بيجمعوا اللوج ويدوّروه (درس «docker logs» في تاب «Docker»). الكتابة في ملفات من جوه التطبيق معناها انت اللي لازم تعمل rotation.

و [[:remote-addr]] ورا proxy بيطلع IP الـ proxy إلا لو [[trust proxy]] متظبط.`,
            when: "التطوير أو المشاريع الصغيرة. ولو عندك pino، [[pino-http]] بيعمل نفس الشغل بـ JSON، فمتشغّلش الاتنين.",
            mistakes: R`في مشروع حقيقي كان فيه morgan، وكمان [[requestLogger]] يدوي، وكمان middleware بيسجّل كل رد 4xx، والتلاتة بيكتبوا على نفس الطلب، فكل طلب ٣ سطور بأشكال مختلفة. لوجر واحد للطلبات يكفي. وتسجّل [[:url]] وفيه توكنات في الـ query ([[?token=...]])، فاللوج بقى فيه أسرار.`
          },
          lines: [
            "morgan.",
            "ملوّن في التطوير، والصيغة المعروفة في الإنتاج، ومن غير طلبات الـ health check اللي بتملّى اللوج. لوجر واحد بس، عشان كل طلب ميتكتبش مرتين."
          ]
        },
        {
          cmd: "pino",
          title: "لوجات JSON تقدر تدوّر فيها",
          desc: R`[[pino]] بيطبع كل لوج كسطر JSON فيه المستوى والوقت والرسالة وأي بيانات تحطها، و [[pino-http]] بيسجّل كل طلب ويدّيك [[req.log]] مربوط بـ id الطلب.

فكل لوجات الطلب الواحد بتتجمع مع بعض. و [[redact]] بيخفي الحقول الحساسة (التوكن والكوكيز والباسورد) قبل ما تتكتب.`,
          example: R`import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: config.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password"],
});

app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));

router.post("/", async (req, res) => {
  req.log.info({ title: req.body.title }, "creating task");
  res.status(201).json(await tasksService.create(req.user.id, req.body));
});`,
          try: R`ابعت طلب فيه [[Authorization]] وشوف السطر الـ JSON والتوكن مكتوب مكانه [Redacted]. وشغّل السيرفر بـ [[node server.js | npx pino-pretty]] في التطوير عشان تقراه بسهولة. وجرّب [[req.log.error({ err }, "failed")]] وشوف الـ stack بيتحط إزاي.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوجات بتتقري بأدوات مش بعينك: «هات كل الأخطاء لليوزر ٧ امبارح» أو «كل الطلبات اللي أخدت أكتر من ثانية». ده مستحيل مع نص حر زي [[console.log("user", id, "failed")]]، وسهل جدًا مع JSON فيه [[userId: 7]] و [[level: 50]].`,
            how: R`pino سريع لأنه بيعمل أقل حاجة ممكنة في العملية الرئيسية: يعمل JSON ويكتبه على stdout. التنسيق الحلو ([[pino-pretty]]) والإرسال لخدمة لوجات بيحصل بره (transport في worker thread أو برنامج تاني).

المستويات: trace و debug و info و warn و error و fatal. [[level]] بيحدد أقل واحد يتطبع، فـ debug بتاعة التطوير مبتظهرش في الإنتاج من غير ما تمسحها من الكود.

[[pino-http]] بيعمل child logger لكل طلب فيه [[req.id]] والـ method والعنوان. أي [[req.log.info]] في أي مكان جوه الطلب بيطلع ومعاه نفس الـ id، فتقدر تجمع قصة الطلب كلها. ولو فيه [[X-Request-Id]] جاي من Nginx، استخدمه في option الـ [[genReqId]] عشان الـ id يبقى واحد من أول ما الطلب دخل.

[[redact]] بيشتغل على المسارات دي قبل الكتابة، و [[*]] في أول المسار يعني «في أي object في المستوى ده». وده خط دفاع أخير، مش بديل إنك متسجّلش الـ body كله أصلًا.`,
            when: "أي API هيتشغّل في الإنتاج. ومع pino-http، شيل morgan.",
            mistakes: R`في مشروع حقيقي كان login بيعمل [[console.log(JSON.stringify(req.body))]] و [[JSON.stringify(req.headers)]] في الإنتاج «عشان نفهم مشكلة». يعني كل باسورد اتكتب في login اتسجّل في اللوج نص صريح، ومعاه التوكنات والكوكيز. اللوجات بتتنسخ وتتبعت وتتحفظ شهور، فعاملها كأنها عامة. وتستخدم [[console.log]] بنصوص حرة في كل مكان فمفيش طريقة تفلتر. وتسجّل [[err.message]] بس من غير الـ stack.`
          },
          lines: [
            "pino: لوجر سريع بيطبع JSON.",
            "middleware بيسجّل الطلبات.",
            "لوجر واحد للتطبيق كله.",
            "أقل مستوى يتطبع: info في الإنتاج، و debug في التطوير.",
            "المسارات دي تتكتب [Redacted] بدل قيمتها، و [[*.password]] يعني password جوه أي object في المستوى الأول (زي [[body.password]])، مش [[password]] لوحده ولا أعمق من كده.",
            "قفلة.",
            "سجّل كل طلب (method و url و status ومدة و id) من غير الـ health check.",
            "route عادي.",
            "[[req.log]] لوجر معاه id الطلب تلقائي. البيانات object الأول، والرسالة بعدها.",
            "رد.",
            "قفلة."
          ]
        }
      ]
    }
  ]
});
