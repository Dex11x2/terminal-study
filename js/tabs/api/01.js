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
          ],
          sol: R`اللي المفروض تشوفه: كل طلب في القايمة ليه [[Request URL]] (غالبًا فيه [[/api/]] أو [[/graphql]]) و method و status، وفي تاب Response هتلاقي JSON مش HTML. يعني الصفحة اتحمّلت مرة، وبعدها كل حاجة بتتغير (بوستات جديدة، إشعارات، سلة) بتيجي كبيانات من الـ API والواجهة هي اللي بترسمها.

جرّب تفتح طلب من دول وتبص على تاب Headers: هتلاقي [[Content-Type: application/json]] في الرد، وغالبًا [[Authorization]] أو cookie في الطلب. ده اللي هتعمله انت بالظبط في التاب ده: السيرفر يعرف انت مين من الطلب، ويرجّع بياناتك انت بس.

لو الفلتر Fetch/XHR طلع فاضي: اعمل refresh والـ Network مفتوح، أو اعمل أي حركة في الصفحة (scroll أو دوسة لايك). ولو كل اللي ظاهر HTML، يبقى الموقع ده بيعمل render على السيرفر (SSR)، والـ API موجود بس مش باين كطلبات منفصلة.`
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
          ],
          sol: R`هتلاقي سطور [[>]] زي [[> GET / HTTP/2]] و [[> Host: api.github.com]] و [[> User-Agent: curl/...]] و [[> Accept: */*]]: ده الطلب اللي curl بعته، ومن غير [[-X]] الـ method بيبقى GET. وسطور [[<]] أولها [[< HTTP/2 200]] (الـ status)، وبعدها [[< content-type: application/json; charset=utf-8]]، وكمية headers تانية زي [[x-ratelimit-limit]] و [[x-ratelimit-remaining]] (فاضلك كام طلب في الساعة) وبعدها الـ body JSON.

لو شفت [[HTTP/1.1 200 OK]] بدل [[HTTP/2 200]] مفيش مشكلة: ده بس إصدار البروتوكول اللي اتفقوا عليه (بروكسي في النص مثلًا). ولو شفت سطور بتبدأ بـ [[*]]، دي معلومات من curl نفسه (DNS و TLS)، مش جزء من الطلب ولا الرد.

الغلطة الشائعة: تقرا الـ body وتقول «نجح» من غير ما تبص على الـ status. جرّب [[curl -v https://api.github.com/users/this-user-does-not-exist-xyz]]: الـ body JSON عادي فيه [[message]]، بس الـ status [[404]].`
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
          ],
          sol: R`الأول بيرجّع [[HTTP/1.1 200 OK]] و [[Content-Type: application/json]] والـ body array فيها [[{"id":1,"title":"buy milk","done":false}]]. والتاني ([[/api/tasks?x=1]]) بيرجّع [[HTTP/1.1 404 Not Found]] و [[{"error":"Not found"}]]، لأن [[req.url]] قيمته [[/api/tasks?x=1]] كلها، والمقارنة بـ [[===]] بتفشل.

الحل: افصل المسار عن الـ query بـ [[new URL(req.url, "http://localhost")]]، وقارن [[pathname]] بس، والـ query تقراه من [[searchParams]]. ولـ [[/api/tasks/1]] استخدم regex على الـ pathname وطلّع الرقم منه. ده بالظبط الشغل اللي Express بيعمله عنك في [[req.params]] و [[req.query]].

لو السيرفر مقامش وطلع [[SyntaxError: Cannot use import statement outside a module]]، يبقى [[type=module]] مش في package.json.`,
          solCode: R`const server = createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://localhost");
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  if (req.method === "GET" && pathname === "/api/tasks") return send(200, tasks);
  const m = pathname.match(/^\/api\/tasks\/(\d+)$/);
  if (req.method === "GET" && m) {
    const task = tasks.find((t) => t.id === Number(m[1]));
    return task ? send(200, task) : send(404, { error: "Task not found" });
  }
  send(404, { error: "Not found", query: Object.fromEntries(searchParams) });
});`
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
          ],
          sol: R`[[/api/tasks?x=1]] بترجع [[200]] ونفس الـ array، لأن Express بيطابق الـ route على المسار بس ويحط الـ query لوحده في [[req.query]]. وهتلاحظ headers زيادة جت ببلاش: [[Content-Type: application/json; charset=utf-8]] و [[Content-Length]] و [[ETag]] (و [[X-Powered-By: Express]]، ودي helmet بيشيلها بعدين).

النسخة التانية على نفس البورت بتقع برسالة [[Error: listen EADDRINUSE: address already in use :::3000]] (أو [[0.0.0.0:3000]] حسب الجهاز)، لأن Express 5 بيبعت الخطأ للـ callback في [[err]]، والكود بيعمل [[throw err]]، والـ process بتخرج بكود 1.

لو النسخة التانية وقعت بـ [[Unhandled 'error' event]] بدل ما الخطأ يوصل للـ callback، يبقى انت على Express 4: هناك الـ callback مبيوصلوش خطأ خالص (بيتنادى بس لو الـ listen نجح)، فالسيرفر بيقع بـ unhandled error event. شوف النسخة بـ [[npm ls express]].`
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
          ],
          sol: R`من غير [[next()]]: [[curl localhost:3000/api/admin/stats]] بيفضل مستني ومبيرجعش حاجة، ولو حطيت [[-m 3]] curl بيقطع بـ [[curl: (28) Operation timed out]]. ومفيش سطر لوج كمان، لأن [[finish]] مبيحصلش إلا لما رد يتبعت. الـ middleware لازم يا يرد يا ينادي [[next()]]، غير كده الطلب بيتعلّق للأبد.

بعد ما ترجّعها وتشغّل السيرفر بـ [[API_KEY=s3cret node --watch server.js]]: بالمفتاح الصح [[{"tasks":1}]]، وبالغلط أو من غيره [[401]] و [[{"error":"Bad key"}]]. واللوج بيطبع سطر لكل طلب زي [[GET /api/admin/stats 401 1ms]].

لو المفتاح الصح نفسه رجّع 401: اتأكد إن [[API_KEY]] متعرّف في نفس الترمنال اللي فيه السيرفر (أو في .env ومتحمّل)، لأن الشرط [[!process.env.API_KEY]] بيرفض كل حاجة لو مش موجود، وده مقصود.`
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
          ],
          sol: R`لما [[express.json()]] ييجي بعد الـ routes: الـ route بيشتغل الأول و [[req.body]] بـ [[undefined]]، فأي [[req.body.title]] بيرمي TypeError، والـ route اللي بيستخدم [[req.body?.title]] بيرجّع 400. الـ body اتقري فعلًا بس بعد ما الرد اتبعت.

ولما [[notFound]] ييجي فوق الـ routes: كل طلب، حتى [[/health]]، بيرجّع [[404]] و [[{"error":"Route not found"}]]، لأن notFound بيرد على أي حاجة ومبينادي [[next()]]، فمحدش تحته بيشتغل.

القاعدة: Express بيعدّي على الـ middleware بالترتيب اللي اتكتب بيه. اللي بيجهّز الطلب (helmet و cors و json) فوق، والـ routes في النص، و notFound و errorHandler آخر حاجة.`
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
          ],
          sol: R`بعد النقل كل الـ curl بيرجّع نفس الردود بالظبط: [[GET /api/tasks]] و [[GET /api/tasks/1]] و [[POST /api/tasks]] إلخ. جوه الـ router المسارات بتتكتب نسبية ([[/]] و [[/:id]])، و [[app.use("/api/tasks", tasksRouter)]] هو اللي بيحط البادئة.

أشهر غلطتين: تكتب [[router.get("/api/tasks/:id", ...)]] جوه الـ router، فالمسار الحقيقي يبقى [[/api/tasks/api/tasks/:id]] وكله يطلع 404. أو تنسى [[export default router]]، فالـ import يدّي undefined و Express يقع بـ [[TypeError: argument handler must be a function]].

لـ users نفس الشكل: ملف [[routes/users.routes.js]]، و [[app.use("/api/users", usersRouter)]]، و [[curl localhost:3000/api/users/3]] يرجّع [[{"id":3}]].`,
          solCode: R`// routes/users.routes.js
import { Router } from "express";

const router = Router();
router.get("/", (req, res) => res.json([{ id: 1, name: "Mona" }]));
router.get("/:id", (req, res) => res.json({ id: Number(req.params.id) }));
export default router;

// app.js
import usersRouter from "./routes/users.routes.js";
app.use("/api/users", usersRouter);`
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
          ],
          sol: R`[[node scripts/count.js]] بيطبع حاجة زي [[tasks: 1]] ويقفل لوحده، من غير ما يفتح بورت ولا يستورد express. ده الاختبار: الـ service بتاخد بيانات عادية (userId و data) وبترجّع بيانات أو ترمي [[AppError]]، ومتعرفش حاجة عن [[req]] و [[res]].

لو لقيت نفسك محتاج تعمل [[req]] وهمي أو تستورد express في السكربت، يبقى فيه منطق HTTP دخل الـ service: زي [[res.status(404)]] جوه الـ service بدل [[throw new AppError(404, ...)]]، أو إنها بتقرا [[req.user.id]] بنفسها بدل ما الـ controller يبعته. رجّع ده للـ controller.

ولو السكربت فضل مفتوح ومقفلش، يبقى فيه اتصال (Prisma مثلًا) لسه مفتوح: اعمل [[await prisma.$disconnect()]] في آخره.`,
          solCode: R`// scripts/count.js
import * as tasksService from "../services/tasks.service.js";
import { prisma } from "../db.js";

console.log("tasks:", await tasksService.count());
await prisma.$disconnect();`
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
          ],
          sol: R`[[GET /api/tasks/999]] بيرجّع [[404]] و [[{"error":"Task not found"}]]: الـ [[throw]] وصل للـ errorHandler، وهو قرا [[err.status]] ورجّع الرسالة زي ما هي لأنها أقل من 500.

والـ route اللي بيرمي [[new Error("db password is 123")]] بيرجّع [[500]] و [[{"error":"Internal server error"}]] بس، والرسالة الحقيقية والـ stack بيطلعوا في ترمنال السيرفر من [[console.error(err)]]. ده المطلوب: اليوزر ميشوفش أي تفاصيل داخلية، وانت تشوفها كلها.

لو الرد طلع صفحة HTML فيها الـ stack، يبقى الـ errorHandler مش متسجّل، أو متسجّل قبل الـ routes، أو دالته فيها ٣ parameters بس (Express بيعرف الـ error handler من إن ليه ٤: [[err, req, res, next]]).`
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
          ],
          sol: R`على Express 5: الـ route الـ async اللي بيرمي بيرجّع رد الـ error handler عادي (مثلًا [[{"error":"Task not found"}]] بـ 404) والسيرفر فاضل شغال. Express 5 بيمسك الـ promise المرفوضة ويبعتها لـ [[next(err)]] لوحده.

على Express 4 بنفس الكود: [[curl]] بيطلع [[curl: (52) Empty reply from server]]، والسيرفر بيقع ويطبع الـ stack و [[Node.js v22...]] ويخرج بكود 1، لأن الـ rejection محدش مسكها و Node من 15 بيقفل العملية عليها. لفّ الـ handler بـ [[asyncHandler]] والمشكلة تتحل.

و [[/later]] بيوقّع السيرفر في النسختين: الـ throw جوه [[setTimeout]] بيحصل بعد ما الـ handler خلص، فمحدش ماسكه (uncaught exception). الحل تحوّله لـ promise وتعمله await، أو تنادي [[next(err)]] جوه الـ callback.`,
          solCode: R`// Express 5 أو Express 4 مع الغلاف
router.get("/later", async (req, res) => {
  await new Promise((r) => setTimeout(r, 10));
  throw new Error("boom"); // دلوقتي بيوصل للـ error handler
});`
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
          ],
          sol: R`من غير [[JWT_SECRET]] السيرفر بيقع فورًا قبل ما يسمع على أي بورت، و الرسالة فيها [[ZodError]] وجواها الـ path بتاعه [[JWT_SECRET]] و [[Invalid input: expected string, received undefined]]. ولو حطيته قصير ([[JWT_SECRET=abc]]) الرسالة بتبقى [[Too small: expected string to have >=32 characters]]. ده الهدف: تعرف المشكلة وانت بتقوم، مش أول ما يوزر يحاول يعمل login.

بعد التبديل، [[grep -rn "process.env" src]] المفروض يطلّع سطر واحد بس: [[Env.parse(process.env)]] في config.js. وكمان هتلاحظ إن [[config.PORT]] بقى number مش string، و [[config.CORS_ORIGINS]] array جاهزة.

لو السيرفر قام عادي والمتغير ممسوح، يبقى فيه نسخة تانية منه في الترمنال نفسه ([[echo $JWT_SECRET]]) أو [[.env]] تاني بيتقري. ولو وقع بسبب [[DATABASE_URL]] كمان، ده طبيعي: حطه في .env.`
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
          ],
          sol: R`الـ body الغلط بيرجّع [[400]] وفيه خطأين بس: [[title]] ([[Too small: expected string to have >=1 characters]]، لأن [[trim()]] بيشتغل قبل [[min(1)]] فالمسافات بقت string فاضي) و [[priority]] ([[Invalid option: expected one of "low"|"normal"|"high"]]). و [[role]] مش في الأخطاء خالص: zod مبيعترضش على حقول زيادة، بيشيلها بس.

والـ body الصح [[{"title":" hi ","role":"ADMIN"}]] بيوصل للـ controller كده: [[{ title: "hi", priority: "normal" }]]. اتعمله trim، واتحط الـ default، و [[role]] اتشال لأن [[z.object]] بيرجّع الحقول اللي في الـ schema بس. ده اللي بيحميك من mass assignment.

لو لقيت [[role]] لسه موجود، يبقى نسيت [[req.body = result.data]] وبتستخدم الـ body الأصلي. ونسخة الـ params تحت: [[/api/tasks/abc]] بيرجّع 400 و [[Invalid input: expected number, received NaN]]، و [[/api/tasks/5]] بيوصل فيه [[req.params.id]] رقم مش string.`,
          solCode: R`export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) return res.status(400).json({ error: "Invalid params", issues: z.flattenError(result.error).fieldErrors });
  req.params = result.data;
  next();
};

const IdParams = z.object({ id: z.coerce.number().int().positive() });
router.get("/:id", validateParams(IdParams), tasks.getOne); // req.params.id رقم`
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
          ],
          sol: R`نفس القواعد بـ express-validator: [[body("title").isString().trim().isLength({ min: 1, max: 200 })]] و [[body("dueDate").optional().isISO8601().toDate()]] و [[body("priority").optional().isIn(["low", "normal", "high"])]]. نفس الـ body الغلط بيرجّع 400 و [[errors]] فيها عنصرين، كل واحد شكله [[{"type":"field","value":"urgent","msg":"Invalid value","path":"priority","location":"body"}]]. الرسالة الافتراضية [[Invalid value]] لكل حاجة، فلو عايز رسايل واضحة لازم [[.withMessage()]] على كل قاعدة. والـ default بتاع priority مش موجود لوحده: محتاج [[.default("normal")]].

من غير [[validationResult]]: الطلب الغلط بيعدّي بـ 200 والـ handler بيشوف [[{"title":"","priority":"urgent","role":"ADMIN"}]]. القواعد بتسجّل الأخطاء بس ومبتوقفش حاجة، ودي أشهر غلطة مع المكتبة دي. و [[matchedData(req)]] هو اللي بيشيل [[role]]؛ [[req.body]] نفسه لسه فيه.

المقارنة: zod schema واحد بيدّيك التحقق والتحويل والـ type، وتقدر تستخدمه في الواجهة كمان. express-validator أطول، بس مبني على validator.js وكويس لو المشروع قديم ومستخدمه.`,
          solCode: R`const createRules = [
  body("title").isString().trim().isLength({ min: 1, max: 200 }).withMessage("title is required"),
  body("dueDate").optional().isISO8601().toDate(),
  body("priority").optional().isIn(["low", "normal", "high"]).withMessage("bad priority"),
];

router.post("/", createRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = { priority: "normal", ...matchedData(req) };
  res.status(201).json(data);
});`
        }
      ]
    }
  ]
});
