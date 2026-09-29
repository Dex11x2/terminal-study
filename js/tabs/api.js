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

لو النسخة التانية طبعت «API on ...» عادي، يبقى انت على Express 4: هناك الـ callback مبيوصلوش خطأ خالص، والسيرفر بيقع بـ unhandled error event. شوف النسخة بـ [[npm ls express]].`
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
          ],
          sol: R`الـ hash بيطلع مختلف كل مرة، مثلًا [[$2b$12$FFrStIpK3ozn...]] و [[$2b$12$wsmQ3tQJrJyC...]]، و [[a === b]] بـ [[false]]، و [[compare]] بيرجّع [[true]] للاتنين. السبب: bcrypt بيولّد salt عشوائي جديد مع كل hash ويحطه جوه الـ hash نفسه (الـ 22 حرف اللي بعد [[$12$]])، فـ compare بيقراه من هناك. فمتقارنش hashes ببعض، ومتعملش [[WHERE password_hash = ?]] أبدًا.

والوقت: كل زيادة ١ في الـ cost بتضاعف الوقت تقريبًا. على جهاز عادي حاجة زي [[cost 10: 67ms]] و [[cost 12: 281ms]] و [[cost 14: 1.087s]] (الأرقام عندك هتختلف، النسبة ×٤ كل خطوتين هي المهمة). 12 بيدّي حوالي ربع ثانية: مش ملحوظ في login، ومكلّف جدًا لحد بيجرّب ملايين الباسوردات.

لو القيمتين طلعوا زي بعض، يبقى بتعمل hash مرة وبتطبعه مرتين. ولو compare رجّع [[Promise { <pending> }]]، نسيت [[await]].`,
          solCode: R`import bcrypt from "bcrypt";

const a = await bcrypt.hash("MyS3cret!", 12);
const b = await bcrypt.hash("MyS3cret!", 12);
console.log(a === b, await bcrypt.compare("MyS3cret!", a), await bcrypt.compare("MyS3cret!", b)); // false true true

for (const cost of [10, 12, 14]) {
  console.time($__btcost $__{cost}$__bt);
  await bcrypt.hash("MyS3cret!", cost);
  console.timeEnd($__btcost $__{cost}$__bt);
}`
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
          ],
          sol: R`فك الـ payload بيطبع حاجة زي [[{"sub":"7","role":"USER","iat":1790718907,"exp":1790719807]] من غير أي سر: الـ JWT مش مشفّر، ده base64url بس. فمتحطش فيه حاجة سرية (باسورد، رقم بطاقة).

بعد ما تغيّر الدور لـ ADMIN وتحط الـ payload الجديد مكان القديم، [[jwt.verify]] بيرمي [[JsonWebTokenError: invalid signature]]، لأن التوقيع اتحسب على الـ header والـ payload القديمين بالسر، ومحدش يقدر يعمل توقيع جديد من غير السر. ده كل الأمان في JWT.

والتوكن اللي [[expiresIn: "5s"]] بعد ما تستنى بيرمي [[TokenExpiredError: jwt expired]]. في requireAuth الاتنين بيتحولوا لـ 401. لو verify نجح على التوكن المعدّل، يبقى انت بتعمل [[jwt.decode]] بدل [[jwt.verify]]: decode بيقرا بس ومبيتحققش من حاجة.`
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
          ],
          sol: R`من غير header: [[401]] و [[{"error":"Login required"}]]. بتوكن بايظ ([[Authorization: Bearer abc]]) أو منتهي: [[401]] و [[{"error":"Invalid or expired token"}]]. بتوكن صح: الـ route بيشتغل عادي و [[req.user]] فيه [[{ id: 7, role: "USER" }]].

في الـ controller: [[tasksService.create(req.user.id, req.body)]]، مش [[req.body.userId]]. الـ id اللي في التوكن موقّع من السيرفر فمحدش يقدر يغيّره، إنما أي حاجة في الـ body اليوزر بيكتبها بإيده.

لو التوكن الصح رجّع 401: اتأكد إنك باعت [[Bearer ]] بالمسافة (مش [[Bearer:]])، وإن نفس [[JWT_SECRET]] اللي عمل sign هو اللي بيعمل verify (مثلًا سيرفر اتعمله restart بـ secret عشوائي). ولو الطلب اتعلّق أو وقع السيرفر على Express 4، يبقى الـ throw جوه middleware async محتاج [[asyncHandler]].`,
          solCode: R`import tasksRouter from "./routes/tasks.routes.js";
app.use("/api/tasks", requireAuth, tasksRouter);

// controllers/tasks.controller.js
export async function create(req, res) {
  res.status(201).json(await tasksService.create(req.user.id, req.body));
}

// curl -i localhost:3000/api/tasks                                => 401 Login required
// curl -i -H "Authorization: Bearer abc" localhost:3000/api/tasks => 401 Invalid or expired token`
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
          ],
          sol: R`في Application > Cookies هتلاقي [[refresh]] وعمود HttpOnly عليه علامة، و SameSite [[Lax]]، و Path [[/api/auth]]، و Secure فاضي على localhost (لأن [[secure]] بـ true في production بس). والـ header اللي رجع كان شكله [[Set-Cookie: refresh=...; Max-Age=2592000; Path=/api/auth; Expires=...; HttpOnly; SameSite=Lax]].

[[document.cookie]] في الـ Console مش هيظهر فيه [[refresh]] خالص، لأن HttpOnly معناه إن JavaScript مايقدرش يقراها. فلو حصل XSS، الكود الخبيث مش هيقدر يسرقها.

[[res.clearCookie("refresh")]] من غير path بيبعت [[Set-Cookie: refresh=; Path=/; Expires=Thu, 01 Jan 1970 ...]]. المتصفح بيعتبر [[refresh]] على [[/]] كوكي مختلفة عن [[refresh]] على [[/api/auth]]، فبيمسح حاجة مش موجودة والأصلية بتفضل. لازم نفس الـ path (والـ domain لو حاطه).`
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
          ],
          sol: R`أول [[/refresh]] بالكوكي القديمة بيرجّع [[200]] و [[accessToken]] جديد و [[Set-Cookie: refresh=...]] جديدة. التاني بنفس الكوكي القديمة بيرجّع [[401]] و [[{"error":"Invalid refresh token"}]]، لأن التوكن القديم اتعلّم عليه [[revokedAt]] في أول مرة. ده الـ rotation: كل refresh token بيتستخدم مرة واحدة، فلو اتسرق واستخدمه الحرامي، اليوزر الحقيقي هياخد 401 (أو العكس) وتعرف إن فيه مشكلة.

عشان تجرّب بـ curl: خد القيمة من [[curl -c jar.txt]] بعد login، وابعتها بـ [[curl -X POST -b "refresh=VALUE" localhost:3000/api/auth/refresh]]. لو أول طلب نفسه رجع 401، اتأكد إن [[cookieParser()]] متسجّل، وإن الـ path بتاع الكوكي [[/api/auth]] بيطابق الـ route.

و [[/logout-all]] بيعمل [[updateMany]] على كل توكنات اليوزر اللي لسه مش ملغية، ويمسح الكوكي. بعده أي refresh من أي جهاز بيرجع 401. الـ access tokens الموجودة هتفضل شغالة لحد ما تنتهي (15 دقيقة)، ودي التمنّ بتاع JWT.`,
          solCode: R`router.post("/logout-all", requireAuth, async (req, res) => {
  const { count } = await prisma.refreshToken.updateMany({
    where: { userId: req.user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  res.clearCookie("refresh", { path: "/api/auth" });
  res.json({ revoked: count });
});
// {"revoked":3}   وبعدها أي /refresh => 401`
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
          ],
          sol: R`الكوكي [[connect.sid]] قيمتها حاجة زي [[s%3AuFsOrqRl9dKM...FrmadjhjIE...]]: الـ session id وبعده توقيع بالـ secret. مفيش فيها userId ولا أي بيانات؛ البيانات نفسها على السيرفر في الـ store.

[[/me]] بعد login بيرجّع [[{"userId":7}]]. بعد [[/logout]] ([[req.session.destroy]]) نفس الكوكي بترجّع 401، لأن الـ session اتمسحت من الـ store حتى لو المتصفح لسه باعت الـ id. ده الفرق الكبير عن JWT: الإلغاء فوري.

وبعد restart السيرفر [[/me]] بيرجع 401 برضه، لأن الـ MemoryStore في ذاكرة الـ process وراح معاها. في production لازم store زي Redis ([[connect-redis]]). ولو من الأول [[/me]] رجع 401 على localhost، غالبًا [[secure: true]] على http فالمتصفح رفض يحفظ الكوكي.`,
          solCode: R`app.get("/api/auth/me", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Login required" });
  res.json({ userId: req.session.userId });
});

app.post("/api/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.sendStatus(204);
  });
});`
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
          ],
          sol: R`بتوكن الأدمن: [[200]]. بتوكن اليوزر العادي: [[403]] و [[{"error":"Forbidden"}]]. من غير توكن: [[401]] و [[{"error":"Login required"}]] (من requireAuth، قبل ما requireRole يشتغل). الفرق مهم: 401 يعني «مش عارف انت مين، اعمل login»، و 403 يعني «عارفك، بس مش مسموحلك».

بعد التبديل لـ [[can("users:manage")]] النتيجة نفسها بالظبط، لأن [[users:manage]] موجودة في ADMIN بس. الفرق إن لو بعدين عملت دور MODERATOR وعايزه يدير اليوزرين، هتزوّد الصلاحية في جدول [[PERMISSIONS]] بس، من غير ما تلف على كل route.

لو الأدمن نفسه أخد 403، اتأكد إن الدور مكتوب في التوكن ([[role]] في الـ payload) وبنفس الحروف: [[ADMIN]] مش [[admin]]. ولو اتغيّر دوره في القاعدة، التوكن القديم لسه فيه الدور القديم لحد ما يعمل login أو refresh.`
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
          ],
          sol: R`بتوكن اليوزر الأول على مهمة التاني: [[GET]] و [[PATCH]] و [[DELETE]] التلاتة بيرجّعوا [[404]] و [[{"error":"Task not found"}]]، وصاحب المهمة لسه بيقراها عادي بـ 200 ومتغيرتش. ليه 404 مش 403؟ عشان متأكدش للمهاجم إن الـ id ده موجود أصلًا.

لو واحد منهم رجّع 200 أو 204، ده IDOR حقيقي: غالبًا [[findUnique({ where: { id } })]] أو [[update({ where: { id } })]] من غير [[userId]]. وخلي بالك إن [[update]] و [[delete]] العاديين في Prisma محتاجين unique، فبتستخدم [[updateMany]] و [[deleteMany]] بالشرطين وتبص على [[count]].

للتدوير: [[grep -rnE "findUnique|update\(|delete\(" src/services]]، وكل سطر بياخد id جاي من [[req.params]] لازم يبقى معاه [[userId: req.user.id]] (أو فحص دور الأدمن صريح).`
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
          ],
          sol: R`قبل helmet: headers قليلة و [[X-Powered-By: Express]]. بعده: [[X-Powered-By]] اختفى، وظهر [[Content-Security-Policy: default-src 'self';...]] و [[Strict-Transport-Security: max-age=31536000; includeSubDomains]] و [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options: SAMEORIGIN]] و [[Referrer-Policy: no-referrer]] و [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Resource-Policy: same-origin]] وغيرهم (حوالي ١٢ header).

الصورة: مع الافتراضي [[Cross-Origin-Resource-Policy: same-origin]]، صفحة على [[localhost:5173]] بتطلب صورة من [[localhost:3000]] (بورت مختلف = origin مختلف) والمتصفح بيرفض يعرضها، وفي Network بتشوف [[blocked:NotSameOrigin]] (أو ERR_BLOCKED_BY_RESPONSE في Chrome). مع [[{ policy: "cross-origin" }]] الـ header بيبقى [[cross-origin]] والصورة بتظهر.

لو الصورة ظهرت مع الإعداد الافتراضي، يبقى الصفحة والسيرفر على نفس الـ origin، أو المتصفح عنده الصورة في الكاش: اعمل hard reload.`
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
          ],
          sol: R`من Console على example.com: [[fetch("http://localhost:3000/api/tasks")]] بيفشل بـ [[TypeError: Failed to fetch]]، وفي الـ Console رسالة حمرا زي [[has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present]]. والمهم: الطلب وصل السيرفر فعلًا واتنفّذ (هتشوفه في اللوج)؛ المتصفح هو اللي منع الصفحة تقرا الرد. (المتصفحات الجديدة ممكن تسألك الأول تسمح للموقع يوصل للـ local network، ودي حاجة منفصلة عن CORS.)

بعد ما تزوّد [[https://example.com]] في [[CORS_ORIGINS]] (من غير / في الآخر) وتعيد التشغيل، الرد بيرجع وفيه [[Access-Control-Allow-Origin: https://example.com]] و [[Access-Control-Allow-Credentials: true]].

والـ POST بـ JSON: في Network هتلاقي طلب [[OPTIONS]] قبله (preflight) رجع [[204]] وفيه [[Access-Control-Allow-Methods: GET,POST,PATCH,DELETE]] و [[Access-Control-Allow-Headers: content-type]] و [[Access-Control-Max-Age: 600]]، وبعدها الـ POST الحقيقي. الـ preflight بيحصل لأن [[Content-Type: application/json]] مش من الأنواع «البسيطة»، وبعد أول مرة المتصفح بيخزّنه ١٠ دقايق.`,
          solCode: R`// Console على https://example.com
await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "from example.com" }),
});
// Network: OPTIONS /api/tasks 204  ثم  POST /api/tasks`
        },
        {
          cmd: "express-rate-limit",
          title: "حد لعدد الطلبات من نفس المصدر",
          desc: R`[[rateLimit]] بيعد طلبات كل IP في فترة، ولو عدّى الحد يرد 429.

حد عام معقول للـ API كله، وحد أشد بكتير لـ login و «نسيت الباسورد» و OTP، لأن دول اللي بيتعمل عليهم تخمين. وورا Nginx أو Cloudflare لازم [[app.set("trust proxy", 1)]]، وإلا كل الطلبات هتبان جاية من IP واحد (الـ proxy) والكل يتحظر مع بعض.

والعداد هنا في ذاكرة الـ process. أول ما يبقى عندك أكتر من نسخة، أو عايز حد لكل يوزر أو لكل API key حسب الباقة، العداد يروح Redis: درس [[rate-limit-redis]] في المستوى التالت.`,
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

الـ store الافتراضي في الذاكرة: كل نسخة من السيرفر ليها عداد لوحدها، ومع restart بيتصفّر. لو شغّال نسختين (PM2 cluster أو كذا container)، الحد الفعلي بيتضاعف. الحل store مشترك في Redis: [[store: new RedisStore({ prefix: "rl:api:", sendCommand: (c, ...a) => redis.call(c, ...a) })]]، و store لكل limiter (المكتبة بترمي ValidationError لو نفس الـ store اتدّى لاتنين). الإعداد الكامل وقرار [[passOnStoreError]] (لو Redis وقع تسمح ولا ترفض) في درس [[rate-limit-redis]].

الـ headers: [[standardHeaders: "draft-8"]] بيبعت مع كل رد [[RateLimit-Policy: "300-in-15min"; q=300; w=900]] (الحصة والنافذة بالثواني) و [[RateLimit: "300-in-15min"; r=299; t=900]] (الباقي والثواني لحد التصفير)، ومع الـ 429 [[Retry-After]] بالثواني. العميل الكويس (والموبايل بتاعك) يقرا دول ويستنى بدل ما يخبط. و [[legacyHeaders: false]] بيشيل [[X-RateLimit-*]] القديمة.

[[trust proxy]]: [[req.ip]] بيتقري من الاتصال نفسه، وورا Nginx الاتصال جاي من Nginx، فالـ IP الحقيقي في [[X-Forwarded-For]]. الرقم [[1]] معناه «ثق في hop واحد قدامي». و [[true]] معناها ثق في أي حاجة، وده خطير: أي حد يبعت [[X-Forwarded-For]] مزيف ويبقى IP جديد مع كل طلب. و express-rate-limit بيحذّرك في اللوج لو شاف الإعداد ده.

و [[keyGenerator]] بيخليك تعد بحاجة غير الـ IP: id اليوزر للـ endpoints المحمية ([[(req) => req.user ? $__btuser:$__{req.user.id}$__bt : ipKeyGenerator(req.ip)]])، أو الـ API key لعملاء الـ API، أو الإيميل في login عشان تحمي الحساب نفسه حتى لو الهجوم من IPs كتير. ولو رجّعت الـ IP بنفسك لازم يعدّي على [[ipKeyGenerator]] (بيجمع عناوين IPv6 في subnet)، وإلا express-rate-limit بيرمي ValidationError وانت بتقوم. و [[limit]] ممكن يبقى دالة: [[(req) => (req.user?.plan === "pro" ? 1000 : 100)]].`,
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
          ],
          sol: R`أول ٣ محاولات غلط بيرجّعوا 401 عادي، والرابعة [[429 Too Many Requests]] و [[{"error":"Too many login attempts, try again later"}]]. والـ headers مع [[draft-8]] شكلها: [[RateLimit: "3-in-15min"; r=0; t=900]] (فاضل 0، والعداد يتصفّر بعد 900 ثانية) و [[RateLimit-Policy: "3-in-15min"; q=3; w=900]] و [[Retry-After: 900]]. ولأن [[skipSuccessfulRequests]] شغال، الـ login الصح مبيتعدّش.

[[X-Forwarded-For: 1.2.3.4]] من غير trust proxy: [[req.ip]] فاضل [[127.0.0.1]]، والمكتبة بتطبع تحذير [[ERR_ERL_UNEXPECTED_X_FORWARDED_FOR]]. ومع [[trust proxy]] بـ 1 ومن غير proxy حقيقي: [[req.ip]] بقى [[1.2.3.4]]، يعني أي حد يقدر يغيّر الـ IP بتاعه بـ header، ولو بعت IP مختلف كل مرة عمره ما هياخد 429.

الخلاصة: [[trust proxy]] لازم يطابق الحقيقة: 1 لو ورا nginx واحد أو load balancer واحد، و false لو السيرفر مكشوف مباشرة. غير كده الـ rate limit كله ملوش لازمة.`
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
          ],
          sol: R`اللي بيتحفظ من [[<p>Hi <b>there</b></p><img src=x onerror=alert(1)><script>alert(2)</script>]] هو [[<p>Hi <b>there</b></p><img src="x">]]: الـ [[onerror]] اتشال، و [[<script>]] اتشال كله، والتنسيق العادي فضل. ولو فيه [[<a href="javascript:alert(3)">]] بيبقى [[<a>]] من غير href. لو لقيت [[onerror]] لسه موجود، يبقى بتحفظ [[req.body.bioHtml]] الأصلي مش الناتج من الـ schema.

وفي Mongoose من غير zod: [[{"email": {"$ne": null}}]] بيتحول لـ [[User.findOne({ email: { $ne: null } })]]، يعني «أول يوزر الإيميل بتاعه مش null»، فبيرجّع أول يوزر في الـ collection (غالبًا الأدمن اللي اتعمل الأول) من غير ما تعرف إيميله. في login ده ممكن يبقى دخول بدون باسورد لو الكود بيقارن بطريقة غلط.

مع [[z.email().parse(req.body.email)]] نفس الطلب بيرمي [[ZodError]] و [[Invalid input: expected string, received object]] وبيبقى 400. (وحل تاني على مستوى Mongoose: [[mongoose.set("sanitizeFilter", true)]].)`
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
          ],
          sol: R`بعد ما تعمل مهام وتقفل السيرفر وتشغّله تاني، [[GET /api/tasks]] بيرجّع نفس المهام، لأنها في Postgres مش في array في الذاكرة. والـ ids بتكمّل من آخر رقم ومبترجعش لـ 1.

ومع تفعيل [[log]] على query، كل استدعاء بيطبع SQL حقيقي، مثلًا [[findMany]] بـ [[select]] و [[orderBy]]: [[prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2]]. لاحظ [[$1]]: القيم بتتبعت كـ parameters، ده اللي بيمنع SQL injection. و [[create]] بيطلع [[INSERT INTO ... RETURNING ...]].

لو البيانات اختفت بعد restart، يبقى لسه فيه service بتستخدم الـ array القديمة. ولو شفت [[too many connections]] أو السيرفر بطيء في البداية، دوّر على [[new PrismaClient]] في أكتر من ملف.`,
          solCode: R`// db.js
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});`
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
          ],
          sol: R`مع الكود ده، واحد من الطلبين بينجح (رد الـ redemption) والتاني بياخد [[409]] و [[{"error":"Coupon fully used"}]]، وفي القاعدة redemption واحد بس و [[usedCount]] بـ 1. السبب: [[updateMany]] بالشرط [[usedCount < maxUses]] بيتنفّذ كـ UPDATE واحد، وPostgres بيقفل الصف، فالطلب التاني لما يوصل يلاقي الشرط مبقاش متحقق و [[count]] بـ 0.

النسخة الغلط (تعد الـ redemptions، ولو أقل من maxUses تعمل create) الاتنين بينجحوا وتلاقي redemptions 2 لكوبون مسموح مرة واحدة: الطلبين قروا العدد 0 في نفس الوقت قبل ما أي واحد يكتب. ولأن ده race، ممكن تحتاج تجرّب كذا مرة، أو تحط [[await new Promise((r) => setTimeout(r, 50))]] بين الـ count والـ create عشان تشوفه كل مرة.

ولو النسخة الصح نفسها نجح فيها الاتنين، اتأكد إن الشرط [[usedCount: { lt: coupon.maxUses } ]] جوه الـ [[where]] بتاع الـ update نفسه، مش [[if]] في JavaScript قبله.`,
          solCode: R`# كوبون maxUses: 1 وطلبين في نفس اللحظة
curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
# {"id":1,"userId":7,"couponId":1}{"error":"Coupon fully used"}`
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

const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean();

const recent = await Task.find().sort({ createdAt: -1 }).limit(50).populate({ path: "userId", select: "name email" }).lean();`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل الـ model ده، وجرّب [[Task.create]] من غير title وشوف الـ ValidationError. وقارن سرعة [[find()]] بـ [[lean()]] ومن غيرها على ١٠٠٠٠ مستند. وبعدين فعّل [[mongoose.set("debug", true)]] وهات ٥٠ مهمة ومعاها اسم صاحبها بطريقتين: loop فيه [[User.findById]] لكل مهمة، و [[populate]]. عد الـ queries في اللوج.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير (خصوصًا لوحات الإدارة والمشاريع القديمة) مبنية على Mongo و Mongoose، وأي انترفيو Node ممكن يسألك عنه. Mongo نفسها مفيهاش schema، و Mongoose بيرجّعلك الشكل والتحقق على مستوى التطبيق.",
            how: R`[[mongoose.connect]] بيفتح pool، و Mongoose بيخزّن أي عمليات لحد ما الاتصال يجهز (buffering)، فالـ query قبل الاتصال مبتفشلش على طول: بتستنى ١٠ ثواني وبعدين تفشل. عشان كده [[await connect]] قبل [[listen]].

الـ schema بتعمل validation وقت [[save]] و [[create]]، بس مش افتراضيًا في [[updateOne]] و [[findOneAndUpdate]] إلا لو [[runValidators: true]]. والـ documents اللي بترجع من [[find]] objects تقيلة فيها دوال (save و populate)، و [[lean()]] بيرجّع objects عادية أسرع وأخف لو هتقرا بس.

[[populate("userId")]] بيجيب المستندات المرتبطة بـ query تانية (Mongo مفيهاش joins زي SQL): بيجمع كل الـ userIds من النتيجة ويعمل [[User.find({ _id: { $in: [...] } })]] واحدة، ويحط كل يوزر مكان الـ id بتاعه. يعني ٥٠ مهمة بيوزرهم = ٢ queries. أما الـ loop اللي بيعمل [[await User.findById(t.userId)]] لكل مهمة فده N+1: ٥٠ مهمة = ٥١ query، وكل واحدة رحلة للقاعدة. و [[select]] جوه populate بيجيب الحقول اللي محتاجها بس (ومتنساش إن من غيره الـ hash بتاع الباسورد ممكن يطلع في الرد). والـ populate المتداخل ([[populate({ path: "userId", populate: { path: "company" } })]]) كل مستوى query زيادة، ولو محتاج joins وتجميع تقيل، [[aggregate]] مع [[$lookup]] بيعملها في query واحدة على السيرفر.

الـ transactions: [[await mongoose.connection.transaction(async (session) => { await A.updateOne(..., { session }); await B.updateOne(..., { session }); })]]. لازم تعدّي [[session]] لكل عملية جواها، وأي عملية من غيره بتتنفّذ برّه الـ transaction ومش بترجع لو حصل rollback. والدالة دي بتعيد المحاولة لوحدها في أخطاء transient، فالكود جواها لازم يبقى آمن لو اتنفّذ مرتين (متبعتش إيميل جواها).

والـ transactions في Mongo محتاجة replica set حتى لو node واحدة. و ObjectId مش صحيح (زي [[abc]]) بيعمل [[CastError]]، فاتحقق منه قبل الـ query.`,
            when: "بيانات شكلها بيتغير كتير، أو مستندات متداخلة بتتقري مع بعض، أو مشروع قايم عليه. للبيانات المترابطة (فلوس وأوردرات وصلاحيات)، Postgres غالبًا اختيار أأمن.",
            mistakes: R`[[findOneAndUpdate]] من غير [[runValidators]] فبيانات غلط تتحفظ. و [[find()]] من غير [[limit]] على collection فيها مليون مستند. و [[findById]] جوه loop بدل populate أو [[$in]] (N+1). و transaction بتنسى [[session]] في عملية من عملياتها. وفي مشروع حقيقي كان [[pre("save")]] بيعمل hash للباسورد (صح)، بس الـ model نفسه كان فيه حقل للباسورد نص صريح جنبه (درس [[bcrypt]]).`
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
            "مهام اليوزر، الأحدث، أول ٢٠. [[lean]] بيرجّع objects عادية أسرع.",
            "آخر ٥٠ مهمة ومعاها اسم وإيميل صاحبها: query للمهام وواحدة لكل اليوزرز مع بعض، مش واحدة لكل مهمة."
          ],
          sol: R`[[Task.create({ userId })]] من غير title بيرمي [[ValidationError]] ورسالته [[Task validation failed: title: Path $__bttitle$__bt is required.]]، وفي [[err.errors.title.kind]] هتلاقي [[required]]. حوّله في الـ error handler لـ 400.

[[find()]] من غير [[lean()]] بيرجّع Mongoose documents (فيها getters و [[save()]] و change tracking)، و [[lean()]] بيرجّع objects عادية. على ١٠٠٠٠ مستند lean بيبقى أسرع بشكل واضح وبيستهلك ذاكرة أقل (غالبًا مرتين لـ ٣ مرات، حسب الجهاز والحجم). للقراءة وإرجاع JSON استخدم lean دايمًا.

وفي اللوج بـ [[debug]]: الـ loop بيعمل 51 query ([[tasks.find]] مرة، و [[users.findOne]] ٥٠ مرة، واحدة لكل مهمة): ده N+1. و [[populate]] بيعمل 2 بس: find للمهام، وبعدين [[users.find({ _id: { $in: [...] } })]] واحدة لكل الـ ids. لو populate رجّع [[userId]] بـ null، يبقى الـ ref اسمه غلط أو اليوزر اتمسح.`
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
          ],
          sol: R`[[?page=3&limit=10]] بيرجّع ١٠ مهام (من الـ 21 للـ 30 في الترتيب) ومعاهم [[{"page":3,"limit":10,"total":1000,"pages":100}]].

[[?limit=5000]] و [[?sort=password]] من غير تعديل بيرجّعوا 500، لأن [[ListQuery.parse]] بيرمي [[ZodError]] مالوش status. بعد التعديل في الـ error handler: [[400]] مع [[{"limit":["Too big: expected number to be <=100"]}]] و [[{"sort":["Invalid option: expected one of "createdAt"|"title""]}]]. و [[sort=password]] مهم: من غير enum حد يقدر يرتّب على أي عمود ويستنتج بيانات منه.

و [[?page=90]]: مع ١٠٠٠ صف الفرق صغير، بس الـ SQL فيه [[OFFSET 890]]، والقاعدة لازم تقرا الـ 890 صف وترميهم قبل ما ترجّع الـ 10. كل ما الصفحة تبعد كل ما الشغل يزيد، ومع ملايين الصفوف بيبان جدًا. الحل للقوايم الطويلة cursor pagination ([[where: { id: { lt: lastId } }]] مع index).`,
          solCode: R`import { z, ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
  }
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
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
          ],
          sol: R`الصورة العادية بتعدّي و [[req.file]] فيه [[buffer]] و [[mimetype: "image/jpeg"]] و [[size]]. الملف الـ ٦ ميجا من غير تعديل بيرجّع 500، لأن multer بيرمي [[MulterError]] كوده [[LIMIT_FILE_SIZE]] ورسالته [[File too large]] ومالوش status. بعد التعديل: [[413]] و [[{"error":"File too large"}]].

والـ PDF اللي اسمه [[x.jpg]]: بيعدّي من الـ [[fileFilter]]! لأن [[file.mimetype]] جاي من الكلاينت، و curl بيخمّنه من الامتداد فبيبعت [[image/jpeg]]. فالفلتر ده بيحمي من الغلط العادي بس (PDF بامتداده الحقيقي بيرجع 400 و [[Only JPEG, PNG or WebP]])، والتحقق الحقيقي لازم يبقى على محتوى الملف نفسه، وده اللي sharp بيعمله في الدرس الجاي ([[Not a valid image]]).

لو الصورة الصح رجعت [[Unexpected field]]، يبقى اسم الحقل في [[-F "avatar=@..."]] مش زي [[upload.single("avatar")]].`,
          solCode: R`import multer from "multer";

export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: err.message, code: err.code });
  }
  const status = err.status ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
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
          ],
          sol: R`الصورة الناتجة [[.webp]] مقاسها [[512x512]] وحجمها أصغر بكتير من الأصل (صورة موبايل ٣-٤ ميجا بتبقى عشرات الكيلوبايت). وفي الـ EXIF viewer الأصل فيه GPS وموديل الموبايل والتاريخ، والناتج مفيهوش أي EXIF: sharp مبينقلش الـ metadata إلا لو طلبت [[withMetadata()]]. و [[rotate()]] من غير أرقام بيلف الصورة حسب الـ Orientation اللي في الـ EXIF قبل ما يشيله، فالصورة متطلعش نايمة.

والملف النصي اللي اسمه [[.jpg]]: multer بيعدّيه (الـ mimetype من الامتداد)، بس [[sharp(buffer).metadata()]] بيرمي، فالـ [[catch]] بيرجّع null والرد [[400]] و [[{"error":"Not a valid image"}]].

لو طلع [[ENOENT: no such file or directory]]، يبقى فولدر [[uploads/avatars]] مش موجود أو السيرفر شغال من فولدر تاني (المسار نسبي للـ cwd). ولو الصورة طلعت مقلوبة، اتأكد إن [[rotate()]] قبل [[resize]].`
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

والسرعة: [[sendMail]] ممكن ياخد ثانية أو اتنين. في «نسيت الباسورد» ينفع ترد على اليوزر الأول وتبعت في الخلفية، بس لو السيرفر وقع قبل ما يبعت، الإيميل بيضيع. الحل الأصح queue (درس [[background jobs]] في «تاب بناء مشروع كامل»، وتاب «APIs متقدمة»).

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
          ],
          sol: R`[[createTestAccount()]] بيرجّع [[user]] و [[pass]] و [[smtp.host]] ([[smtp.ethereal.email]])، حطهم في .env. بعد [[sendMail]] الـ [[info.messageId]] فيه id، و [[getTestMessageUrl(info)]] بيرجّع لينك [[https://ethereal.email/message/...]] تفتحه تشوف الإيميل زي ما هيوصل: الـ subject والـ html واللينك. الإيميل مبيوصلش لحد فعلًا، وده المطلوب في التطوير.

[[transporter.verify()]] بيرجّع [[true]] لو الإعدادات صح. ولو غلط بيرمي، والكود بيقولك السبب: [[EDNS]] و [[getaddrinfo ENOTFOUND]] للـ host الغلط، و [[ESOCKET]] و [[ECONNREFUSED]] للبورت الغلط، و [[EAUTH]] (Invalid login) لليوزر أو الباسورد الغلط. عشان كده بتناديه وانت بتقوم: تعرف المشكلة من اللوج بدل ما تعرفها من يوزر بيقول «مجاليش إيميل».

لو [[getTestMessageUrl]] رجّع [[false]]، يبقى انت مش باعت على Ethereal (الـ host أو الحساب غلط).`,
          solCode: R`import nodemailer from "nodemailer";

const account = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: account.smtp.host, port: 587, secure: false,
  auth: { user: account.user, pass: account.pass },
});

await transporter.verify(); // بيرمي لو الإعدادات غلط
const info = await transporter.sendMail({ from: '"MyApp" <no-reply@example.com>', to: "me@example.com", subject: "Test", text: "Hello" });
console.log(nodemailer.getTestMessageUrl(info)); // https://ethereal.email/message/...`
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
          ],
          sol: R`بالمفتاح الصح و [[from: "MyApp <onboarding@resend.dev>"]] و [[to]] إيميل حسابك: [[data]] فيه [[{ id: "..." }]] و [[error]] بـ null، والإيميل بيوصل خلال ثواني (بص في spam لو مش لاقيه). ولو بعت لإيميل غير إيميل حسابك من الدومين التجريبي، هتاخد error بيقولك إنك تقدر تبعت لنفسك بس لحد ما توثّق دومين.

بمفتاح غلط: الـ SDK مبيرميش exception؛ بيرجّع [[data]] بـ null و [[error]] object فيه [[statusCode]] (4xx) و [[name]] و [[message]] بيقول إن المفتاح مش صالح. عشان كده الكود بيبص على [[error]] بنفسه، ولو كتبت [[await resend.emails.send(...)]] واستخدمت [[data.id]] على طول هتاخد TypeError.

الفكرة للانترفيو: فشل إيميل الترحيب مايوقّعش التسجيل، بيتسجّل في اللوج بس (ويتعاد بـ background job في الإنتاج).`
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
          ],
          sol: R`[[dev]] بيطبع سطر قصير ملوّن زي [[POST /api/tasks 201 0.408 ms - 8]] (الـ status أخضر للنجاح وأحمر للـ 500). و [[combined]] بيطبع صيغة Apache: [[127.0.0.1 - - [29/Sep/2026:22:00:07 +0000] "GET /fail HTTP/1.1" 500 33 "-" "curl/8.5.0"]]. وفي الاتنين [[/health]] مش ظاهر بسبب [[skip]].

مع [[stream]]، السطور بتتكتب في [[access.log]] وبتتزوّد عليه مع كل تشغيل (بسبب [[flags: "a"]]) بدل ما تطلع في الترمنال.

عشان تلاقي كل الـ 500 امبارح: في combined الـ status هو العمود التاسع، فـ [[grep "29/Sep/2026" access.log | awk '$9 == 500']]. شغال، بس هش: أي تغيير في الصيغة يبوّظه، ومفيش user id ولا request id. وده السبب اللي بيخلي الإنتاج يستخدم لوجات JSON (درس [[pino]]) تتفلتر بالحقول.`,
          solCode: R`import fs from "node:fs";
app.use(morgan("combined", { stream: fs.createWriteStream("access.log", { flags: "a" }) }));

// كل الـ 500 في يوم معيّن
// grep "29/Sep/2026" access.log | awk '$9 == 500'`
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
          ],
          sol: R`كل سطر JSON واحد. طلب فيه Authorization بيطلع فيه [[req.headers.authorization]] قيمته النص [Redacted] بدل التوكن، ومعاه سطر [[creating task]] فيه [[req.id]] نفس رقم سطر [[request completed]]، فتقدر تجمع كل لوجات الطلب الواحد. ومعاه [[res.statusCode]] و [[responseTime]]. و [[/health]] مالوش سطر بسبب [[ignore]].

[[node server.js | npx pino-pretty]] بيحوّل نفس السطور لشكل مقروء: الوقت وبعده [[INFO (4796): creating task]] وتحته الحقول متنسّقة. في الإنتاج متستخدمهوش: سيب الـ JSON لأداة اللوجات.

و [[req.log.error({ err }, "failed")]] بيطلع سطر [[level: 50]] وفيه [[err]] object فيه [[type]] و [[message]] و [[stack]] كـ string واحد، لأن pino عنده serializer مخصوص للمفتاح [[err]]. لو كتبت [[req.log.error(err)]] أو حطيته تحت اسم تاني زي [[{ error: err }]]، ممكن تاخد [[{}]] فاضي من غير message ولا stack.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبارات للـ API كله: supertest على الـ app من غير بورت، وقاعدة اختبار حقيقية، و factories، ومصفوفة الصلاحيات، والخدمات الخارجية، والـ webhooks",
      items: [
        {
          cmd: "app و server",
          title: "افصل الـ app عن listen عشان تختبره",
          desc: R`[[app.ts]] بيبني الـ app ويرجّعه: middleware و routes و error handler. و [[server.ts]] بس اللي بيعمل [[listen]] ويسمع للـ signals. الاختبارات بتستورد [[createApp()]] وتدّيه لـ supertest مباشرة، فمفيش بورت ثابت يتفتح، ومفيش «البورت مشغول» لما تشغّل ملفين اختبار مع بعض.

القاعدة: مفيش أي side effect وقت الـ import. لا [[listen]]، ولا اتصال بـ Redis أو queue في أول الملف من غير ما حد يطلبه.`,
          example: R`// src/app.ts
import express from "express";
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}

// src/server.ts
import { createApp } from "./app.js";
const server = createApp().listen(config.PORT, () => logger.info({ port: config.PORT }, "listening"));
process.on("SIGTERM", () => server.close(() => process.exit(0)));`,
          try: R`لو السيرفر بتاعك ملف واحد فيه [[app.listen]] في الآخر: قسّمه لملفين زي المثال، وخلي [[npm run dev]] يشغّل server.ts. وبعدين اكتب سكربت صغير يعمل [[import { createApp } from "./src/app.js"]] ويطبع [[typeof createApp()]]، واتأكد إن مفيش سطر «listening» اتطبع.`,
          flag: "script",
          deep: {
            why: R`لو [[app.js]] بيعمل listen وهو بيتعمله import، كل ملف اختبار هيفتح البورت 3000. أول ملف يمسكه، والتاني يقع بـ [[EADDRINUSE]]، والـ process مبتقفلش في الآخر لأن فيه سيرفر لسه سامع. ونفس الفصل بيفيد برّه الاختبارات: سكربت أو worker عايز يستخدم نفس الـ routes أو الإعدادات من غير ما يفتح سيرفر.`,
            how: R`supertest لما تدّيله app (مش URL) بيعمل [[http.createServer(app)]] ويـ listen على بورت 0، يعني النظام يختار بورت فاضي عشوائي، ويبعت الطلب، ويقفل السيرفر بعد الرد. فكل اختبار بيكلّم الـ app الحقيقي بكل الـ middleware بتاعه عبر HTTP حقيقي، بس على بورت مؤقت محدش شايفه.

[[createApp()]] كدالة (مش object جاهز) بيدّيك ميزة تانية: تقدر تبني app جديد لكل ملف اختبار، أو تبعتله dependencies مختلفة ([[createApp({ mailer: fakeMailer })]]) لو عايز. وده نفس اللي «تاب بناء مشروع كامل» بيعمله في هيكل المشروع.

و [[server.ts]] هو المكان الوحيد اللي فيه الحاجات اللي ليها علاقة بالـ process: البورت، و SIGTERM، والإغلاق النضيف (درس «الإغلاق النضيف» في تاب «Node و npm»).`,
            when: "من أول يوم في أي API هتكتبله اختبارات. التكلفة سطرين، ولو أجّلتها هتلاقي imports بتفتح اتصالات في كل حتة.",
            mistakes: R`[[export default app.listen(3000)]]: كده اللي بيتصدّر هو الـ server مش الـ app، والبورت بيتفتح مع أي import. وملف [[db.js]] بيعمل [[await prisma.$connect()]] أو [[redis.connect()]] في أول سطر، فأي اختبار حتى لو مش محتاج الداتابيز بيستنى اتصال. وفي الانترفيو: «إزاي بتختبر الـ API بتاعك؟» الإجابة الكويسة بتبدأ بالفصل ده، وبعدين supertest على الـ app، وبعدين قاعدة اختبار حقيقية.`
          },
          lines: [
            "express.",
            "دالة بتبني app جديد وترجّعه، من غير listen.",
            "app جديد.",
            "الـ middleware العادي.",
            "route للـ health check.",
            "الـ routers.",
            "الـ error handler في الآخر.",
            "رجّعه للي نادى: server.ts أو الاختبار.",
            "قفلة.",
            "server.ts بيستورد نفس الدالة.",
            "هو بس اللي بيعمل listen ويطبع البورت.",
            "ولما الـ process يتطلب منها تقفل، يقفل السيرفر الأول وبعدين يخرج."
          ],
          sol: R`الناتج الصح: [[typeof createApp()]] بيطبع [[function]] (الـ app في Express دالة [[(req, res, next)]])، ومفيش سطر «listening» ولا البورت اتفتح، والسكربت بيخلص ويقفل لوحده.

لو السكربت فضل مفتوح ومقفلش، يبقى فيه حاجة بتتفتح وقت الـ import: listen، أو اتصال Redis، أو setInterval. دوّر عليها بـ [[node --trace-exit]] أو علّق الـ imports واحد واحد.

ولو ظهر «listening»، يبقى [[listen]] لسه في app.ts أو في ملف بيتعمله import منه.`,
          solCode: R`// check-app.mjs
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
// مفيش listen: السكربت يخلص ويقفل لوحده`
        },
        {
          cmd: "supertest",
          title: "اختبر كل endpoint: الـ status والـ body",
          desc: R`[[request(app).post(url).set(header).send(body)]] بيبعت طلب حقيقي للـ app ويرجّعلك الرد، وانت بتتأكد من [[res.status]] و [[res.body]] بـ vitest.

لكل endpoint اختبر الحالة الناجحة، وكل رفض ليه كود مختلف: 400 للـ body الغلط، و 401 من غير توكن، و 404 لحاجة مش موجودة، و 502 لو خدمة برّه وقعت. أساسيات vitest نفسها (describe و it و watch) في درس [[vitest]] في تاب «فحص الكود».`,
          example: R`import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/app.js";
import { createUser } from "./factories.js";

const app = createApp();

describe("POST /api/orders", () => {
  it("creates an order", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
  });

  it("rejects a bad amount with 400", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: -1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("INVALID_AMOUNT");
  });
});`,
          try: R`[[npm i -D vitest supertest]]، واكتب ملف [[tests/health.test.ts]] يتأكد إن [[GET /health]] بيرجّع 200 و [[{ ok: true }]]، وإن [[GET /nope]] بيرجّع 404. شغّل [[npx vitest run]]. وبعدين غيّر الـ status في الـ route لـ 201 وشوف الاختبار بيقع بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`الـ API هو العقد بينك وبين الواجهة والموبايل. اختبار الـ service لوحده مش كفاية: الـ validation والـ auth والـ error handler وشكل الـ JSON كلها بتحصل في الطبقات اللي فوقه. اختبار supertest بيعدّي على كل ده مرة واحدة، فبيمسك الغلطات اللي بتبوّظ الواجهة فعلًا: 500 بدل 400، أو حقل اتشال من الرد، أو route اتنقل.`,
            how: R`[[request(app)]] بيرجّع object تبني عليه الطلب بـ chaining، وأول ما تعمل [[await]] بيتبعت. [[.send(obj)]] بيعمل JSON ويحط [[Content-Type: application/json]] لوحده. و [[.set()]] للـ headers، و [[.query({ page: 2 })]] للـ query string.

الرد فيه [[status]] و [[headers]] و [[body]] (متحوّل من JSON) و [[text]] (النص الخام). و [[toMatchObject]] بيتأكد من الحقول اللي كتبتها بس ويتجاهل الباقي، فالاختبار ميقعش لو ضفت حقل جديد. و [[expect.any(String)]] و [[expect.stringContaining]] للقيم اللي بتتغير كل مرة زي الـ id والتاريخ.

supertest عنده [[.expect(201)]] كمان، بس [[expect(res.status).toBe(201)]] بيطلّع رسالة أوضح في vitest ويخليك تشوف الـ body لما يقع (حط [[console.log(res.body)]] مؤقتًا).

ولو عايز كوكيز تفضل بين الطلبات (login وبعده [[/me]])، استخدم [[request.agent(app)]]: بيحفظ الكوكيز زي المتصفح.`,
            when: "لكل endpoint: الحالة الناجحة، وكل كود خطأ ليه معنى مختلف. الحسابات المعقدة (سعر وخصم وضريبة) اختبرها كمان unit على الدالة نفسها، أسرع وأوضح.",
            mistakes: R`إنك تختبر [[res.status]] بس ومتبصش على الـ body، فـ endpoint بيرجّع [[{}]] بـ 200 يعدّي. أو العكس: [[toEqual]] على الرد كله بالـ id والتاريخ، فالاختبار يقع كل مرة. ونسيان [[await]] قبل [[request(app)]]: الاختبار «ينجح» من غير ما الطلب يتبعت أصلًا. واختبارات بتعتمد على ترتيبها (الأول بيعمل يوزر والتاني بيستخدمه): كل اختبار لازم يجهّز الداتا بتاعته بنفسه (درس [[factories]]).`
          },
          lines: [
            "supertest.",
            "دوال vitest.",
            "الـ app من غير listen.",
            "factory بتعمل يوزر وتوكن (درس [[factories]]).",
            "app واحد للملف كله.",
            "مجموعة اختبارات لـ endpoint واحد.",
            "الحالة الناجحة.",
            "يوزر جديد للاختبار ده بس.",
            "ابعت POST بالتوكن والـ body.",
            "201 Created.",
            "الحقول المهمة بس، والـ checkoutUrl فيه id الطلب.",
            "قفلة.",
            "حالة الرفض.",
            "يوزر.",
            "مبلغ سالب.",
            "400 مش 500.",
            "وكود الخطأ اللي الواجهة بتعتمد عليه.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج: [[Test Files 1 passed]] و [[Tests 2 passed]]. ولما تغيّر الـ status لـ 201، vitest بيطبع [[expected 201 to be 200]] ومعاها السطر اللي وقع.

ولو [[GET /nope]] رجع 200 بـ HTML، يبقى عندك route [[*]] بيرجّع الواجهة (SPA fallback) قبل الـ 404 بتاع الـ API: خلي الـ fallback ده بعد كل routes الـ API، أو ميشتغلش على [[/api]].

ولو الأمر فضل شغال ومقفلش، يبقى فيه اتصال مفتوح (Redis أو الداتابيز): اقفله في [[afterAll]].`,
          solCode: R`import request from "supertest";
import { it, expect } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

it("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

it("unknown route is 404", async () => {
  const res = await request(app).get("/nope");
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "قاعدة الاختبار",
          title: "قاعدة بيانات للاختبار لوحدها، وتتنضف بين الاختبارات",
          desc: R`الاختبارات بتكلّم Postgres حقيقي، بس قاعدة تانية خالص ([[myapp_test]]) عمرها ما تبقى قاعدة التطوير. قبل الاختبارات [[prisma migrate deploy]] عليها، وقبل كل اختبار بتفضّيها.

طريقتين للتنضيف: [[TRUNCATE]] لكل الجداول قبل كل اختبار (بسيطة وشغالة مع أي حاجة)، أو كل اختبار جوه transaction وتعمل ROLLBACK في الآخر (أسرع، بس صعبة لما الطلب بيعدّي على HTTP والكود بيفتح transactions بنفسه).`,
          example: R`// vitest.config.ts
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

// tests/setup.ts
import { afterAll, beforeEach } from "vitest";
import { db } from "../src/db.js";
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());

# package.json: "test": "dotenv -e .env.test -- prisma migrate deploy && vitest run"`,
          try: R`اعمل قاعدة [[myapp_test]] (بـ [[createdb]] أو [[CREATE DATABASE]] في psql)، وشغّل عليها [[DATABASE_URL=... npx prisma migrate deploy]]. اكتب اختبارين: الأول يعمل يوزر بإيميل ثابت، والتاني يعمل يوزر بنفس الإيميل. من غير الـ TRUNCATE التاني هيقع بـ unique constraint لو اتشغّلوا ورا بعض، ومعاه الاتنين ينجحوا.`,
          flag: "script",
          deep: {
            why: R`الـ mock للداتابيز بيخبّي أهم الغلطات: unique constraint، و foreign key، و query غلط، و migration ناقصة، و transaction مش شغالة. الاختبار اللي بيكلّم Postgres حقيقي بيمسك ده كله. والقاعدة المنفصلة لأن الاختبارات بتمسح كل حاجة، وأول مرة حد يشغّلها على قاعدة التطوير هيخسر الداتا بتاعته.`,
            how: R`[[migrate deploy]] مش [[migrate dev]]: الـ deploy بيطبّق الـ migrations الموجودة زي الإنتاج بالظبط، ومبيولّدش migration جديدة ولا بيسألك أسئلة. فلو فيه migration ناقصة من الـ repo، الاختبارات هتقع هنا قبل ما الإنتاج يقع.

[[TRUNCATE ... RESTART IDENTITY CASCADE]] بيفضّي الجداول في أمر واحد، ويرجّع الـ sequences من الأول، و CASCADE بيعدّي على الجداول المرتبطة بـ foreign keys. أسرع بكتير من [[deleteMany]] على كل جدول بالترتيب. والأسماء بين [[""]] لأن Prisma بيعمل الجداول بحروف كبيرة. ومتفضّيش [[_prisma_migrations]]!

الـ rollback: تفتح transaction، وتشغّل الاختبار جواها، وفي الآخر ROLLBACK فكأن مفيش حاجة حصلت. سريع جدًا، بس شرطه إن كل الكود يستخدم نفس الاتصال اللي فيه الـ transaction. مع Prisma والطلب اللي بيعدّي على HTTP ده صعب: الـ client عنده pool، والـ [[$transaction]] اللي جوه الكود بيفتح transaction تانية. عشان كده TRUNCATE هي الاختيار العملي مع Prisma و supertest، و rollback تنفع أكتر في اختبارات الـ repository اللي بتدّيها الـ client بإيدك.

[[fileParallelism: false]] بيشغّل ملفات الاختبار ورا بعض، لأنهم بيشاركوا نفس القاعدة. لو عايز parallel، اعمل قاعدة أو schema لكل worker (مثلًا [[myapp_test_$__{process.env.VITEST_POOL_ID}]]).

وفي CI نفس الفكرة بـ service container لـ Postgres: درس [[services]] في تاب «GitHub Actions»، ومثال كامل في درس «ci.yml: Postgres + Prisma» في تاب «من مشاريعي».`,
            when: "أي اختبار بيعدّي على الداتابيز. والمنطق الصافي (حسابات وتحويلات) اختبره unit من غير قاعدة خالص.",
            mistakes: R`[[DATABASE_URL]] في الاختبار بييجي من [[.env]] العادي لأن حد نسي يغيّره، فالـ TRUNCATE يمسح قاعدة التطوير. حط حارس في setup: [[if (!process.env.DATABASE_URL.includes("_test")) throw ...]]. واستخدام SQLite في الاختبار و Postgres في الإنتاج: أنواع وسلوك مختلف، وهتعدّي اختبارات على حاجات بتقع في الإنتاج. وتشغيل [[migrate dev]] في CI. وملفات اختبار parallel على قاعدة واحدة: اختبارات بتقع مرة وتنجح مرة (flaky) ومحدش فاهم ليه.`
          },
          lines: [
            "إعداد vitest.",
            "قسم الاختبارات.",
            "متغيرات البيئة للاختبار: قاعدة الاختبار وسر JWT ثابت.",
            "ملف بيتشغّل قبل كل ملف اختبار.",
            "ملفات الاختبار ورا بعض عشان بيشاركوا نفس القاعدة.",
            "قفلة.",
            "قفلة.",
            "hooks بتاعة vitest.",
            "نفس الـ Prisma client بتاع التطبيق.",
            "قبل كل اختبار...",
            "...فضّي الجداول وصفّر العدادات، و CASCADE للجداول المرتبطة.",
            "قفلة.",
            "في الآخر اقفل الاتصال عشان الـ process تخلص."
          ],
          sol: R`المتوقع: من غير [[beforeEach]] اللي فيه TRUNCATE، الاختبار التاني بيقع بخطأ Prisma كوده [[P2002]] (Unique constraint failed on the fields: (email)). ومعاه الاتنين بينجحوا مهما شغّلتهم كام مرة.

لو الاتنين نجحوا من غير TRUNCATE، يبقى غالبًا الـ email مش [[@unique]] في الـ schema، أو الاختبارات مش بتكلّم نفس القاعدة اللي انت فاكرها: اطبع [[process.env.DATABASE_URL]] في الـ setup.

ولو ظهر [[relation "User" does not exist]]، يبقى نسيت [[migrate deploy]] على قاعدة الاختبار.`,
          solCode: R`createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts`
        },
        {
          cmd: "factories",
          title: "داتا الاختبار: factory صغيرة بدل ملف fixtures ضخم",
          desc: R`factory دالة بتعمل صف واحد بقيم افتراضية معقولة وبترجّعه، وتقدر تغيّر أي حقل: [[createUser({ role: "ADMIN" })]]. كل اختبار بيعمل الداتا اللي محتاجها بس، فتقرا الاختبار وتفهم هو بيختبر إيه.

و [[createUser]] بترجّع كمان التوكن بتاع اليوزر، عشان مفيش اختبار محتاج يعدّي على login.`,
          example: R`// tests/factories.ts
import jwt from "jsonwebtoken";
import { db } from "../src/db.js";

let n = 0;
export async function createUser(overrides = {}) {
  n++;
  const user = await db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" });
  return { ...user, token };
}

export function createOrder(user, overrides = {}) {
  return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
}`,
          try: R`اعمل [[createUser]] و [[createOrder]] زي المثال، واكتب اختبار «الأدمن يقدر يمسح طلب أي حد»: يوزر عادي عنده طلب، وأدمن بـ [[createUser({ role: "ADMIN" })]] بيعمل DELETE. لازم الاختبار كله يبقى ٦ سطور أو أقل.`,
          flag: "script",
          deep: {
            why: R`ملف fixtures كبير (٢٠ يوزر و ١٠٠ طلب في JSON) بيبدأ صغير ويكبر لحد ما محدش يعرف أنهي اختبار معتمد على أنهي صف. تعدّل حقل عشان اختبار، يقع ٥ اختبارات تانيين. والاختبار نفسه بيبقى [[expect(orders).toHaveLength(7)]] ومحدش فاهم ليه ٧. الـ factory بتخلي السبب مكتوب قدامك: عملت طلبين ليوزر A وطلب ليوزر B، فـ A يشوف ٢.`,
            how: R`القيم الافتراضية لازم تبقى صالحة وتعدّي كل الـ constraints: إيميل فريد (عشان كده العداد [[n]])، وأي حقل مطلوب ليه قيمة. و [[...overrides]] في الآخر عشان أي حاجة تكتبها تغلب الافتراضي.

العلاقات: [[createOrder(user)]] بتاخد اليوزر بدل ما تعمل واحد من عندها. كده انت اللي بتقرر مين صاحب الطلب، ودا بالظبط اللي محتاجه في اختبارات الصلاحيات (الدرس الجاي). ولو عايز الاختصار، ممكن تخلي [[user]] اختياري وتعمل واحد لو مش موجود.

التوكن: بنعمله بـ [[jwt.sign]] بنفس السر اللي الـ app شايفه في الاختبار ([[JWT_SECRET]] من vitest.config). ده أسرع من login حقيقي في كل اختبار، و login نفسه ليه اختبار لوحده. ولو الـ auth عندك session، الـ factory تعمل login بـ [[request.agent(app)]] وترجّع الـ agent.

والـ seed بتاع التطوير (درس «prisma db seed و studio» في تاب «Node و npm») حاجة تانية: داتا شكلها حلو عشان تتفرج على التطبيق. متستخدمهوش في الاختبارات.`,
            when: "من أول ما يبقى عندك أكتر من ٣ اختبارات بتعمل نفس النوع من الداتا. وفيه مكتبات (زي fishery أو @faker-js/faker للقيم العشوائية)، بس دالة صغيرة زي دي كفاية لأغلب المشاريع.",
            mistakes: R`قيم عشوائية في كل حاجة (faker لكل حقل) فالاختبار يقع مرة كل ١٠٠ مرة لأن الاسم العشوائي طلع أطول من الحد: خلي القيم ثابتة إلا لو محتاجها فريدة. و factory بتعمل ١٠ حاجات مرتبطة لوحدها (يوزر وطلبات ومدفوعات) فكل اختبار بطيء ومحدش عارف إيه اللي اتعمل. وإنك تعدّل الـ object اللي راجع من factory في اختبار وتستخدمه في اختبار تاني.`
          },
          lines: [
            "jsonwebtoken عشان نعمل توكن من غير login.",
            "نفس الـ Prisma client.",
            "عداد عشان كل إيميل يبقى فريد.",
            "factory لليوزر، وأي حقل ممكن يتغيّر.",
            "زوّد العداد.",
            "اعمل اليوزر بإيميل فريد، و overrides تغلب الافتراضي.",
            "توكن بنفس السر اللي الـ app شايفه في الاختبار، عمره قصير.",
            "رجّع اليوزر ومعاه التوكن.",
            "قفلة.",
            "factory للطلب، بتاخد صاحبه صريح.",
            "طلب بمبلغ افتراضي، وأي حقل ممكن يتغيّر.",
            "قفلة."
          ],
          sol: R`الاختبار بيعمل صاحب الطلب، والطلب، والأدمن، والـ DELETE، ويتأكد إن الرد 204 وإن الطلب مبقاش موجود في القاعدة. مش كفاية تبص على الـ status: لازم تتأكد إن المسح حصل فعلًا.

لو رجع 403، يبقى الـ role مش في التوكن: الـ factory لازم تعمل [[jwt.sign]] بعد ما تعمل اليوزر بالـ role اللي اتبعت، مش قبله. ولو رجع 404، يبقى الـ route بيدوّر على الطلب بـ [[userId]] الأدمن (ownership) حتى في مسار الأدمن.`,
          solCode: R`it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});`
        },
        {
          cmd: "401 و 403 و 404",
          title: "مصفوفة الصلاحيات: كل route فيه :id يتختبر بيوزرين",
          desc: R`أي route فيه [[:id]] ليه على الأقل ٤ اختبارات: من غير توكن 401، وصاحب الحاجة 200، ويوزر تاني 404 (مش 200 ولا 403)، ويوزر معندوش الـ role المطلوب 403.

أخطر bug في أي API إن يوزر B يشوف أو يعدّل حاجة يوزر A بمجرد ما يغيّر الرقم في الـ URL (IDOR، درس [[ownership (IDOR)]]). الاختبار ده بيمسكه قبل ما حد تاني يمسكه.`,
          example: R`describe("GET /api/orders/:id", () => {
  it("401 without a token", async () => {
    expect((await request(app).get("/api/orders/anything")).status).toBe(401);
  });
  it("200 for the owner", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
    expect(res.status).toBe(200);
  });
  it("404 for another user", async () => {
    const [a, b] = [await createUser(), await createUser()];
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
    expect(res.status).toBe(404);
  });
  it("403 for a non-admin on DELETE", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
  });
});`,
          try: R`اختار route عندك فيه [[:id]] بيعدّل حاجة (PATCH أو DELETE)، واكتبله الأربع حالات. وبعدين «اكسر» الـ service: شيل [[userId]] من الـ where، وشغّل الاختبارات. لازم اختبار «يوزر تاني» يقع. لو ماوقعش، الاختبار نفسه غلط.`,
          flag: "script",
          deep: {
            why: R`الـ auth middleware بيتأكد انت مين، بس مبيعرفش الحاجة دي بتاعة مين. كل route لازم يعمل الفحص ده بنفسه، وسهل جدًا واحد منهم ينسى. واختبار «يوزر تاني» هو الطريقة الوحيدة اللي تتأكد بيها إن كل route فاكر، ومش بتعتمد على مراجعة الكود بعينك.`,
            how: R`[[401 Unauthorized]]: مش عارفين انت مين (مفيش توكن، أو غلط، أو خلص). [[403 Forbidden]]: عارفينك، بس الـ role بتاعك مش مسموحله بالعملية دي خالص (يوزر عادي على route أدمن). [[404 Not Found]]: الحاجة دي مش موجودة بالنسبة لك.

ليه 404 مش 403 ليوزر تاني؟ لأن 403 معناها «موجود بس مش بتاعك»، وده بيسرّب معلومة: المهاجم يعرف إن الـ id ده موجود، ويقدر يعد الطلبات أو اليوزرز. لو الـ query نفسها فيها [[userId]] ([[findFirst({ where: { id, userId } })]])، الـ 404 بتطلع لوحدها من غير if زيادة.

و GET مش كفاية: كرر نفس المصفوفة على PATCH و DELETE، لأن غلطة مشهورة إن الـ GET محمي والـ update بيعمل [[update({ where: { id } })]] من غير userId. ولو فيه routes كتير، اعمل الاختبارات بـ [[it.each]] على قايمة من [method, path] عشان متكتبش نفس الكود ٢٠ مرة.

وفي Nest نفس الفكرة بالظبط، والاختبار نفسه بـ supertest (درس «Nest: الاختبارات»).`,
            when: "كل route فيه :id أو بيرجّع داتا خاصة بيوزر. ده من أهم الاختبارات في المشروع كله، وأولى من اختبارات كتير تانية.",
            mistakes: R`اختبار الصلاحيات بيوزر واحد بس (صاحب الحاجة)، فالاختبار ينجح والـ IDOR موجود. أو ترجّع 403 ليوزر تاني فتسرّب إن الحاجة موجودة. أو 403 للتوكن الغلط بدل 401، فالواجهة متعرفش إنها لازم تعمل refresh أو تودّي على login. وفي الانترفيو: «الفرق بين 401 و 403؟» قول الفرق، وقول ليه بترجّع 404 لحاجة يوزر تاني.`
          },
          lines: [
            "مجموعة لـ route واحد.",
            "من غير توكن.",
            "لازم 401.",
            "قفلة.",
            "صاحب الطلب.",
            "يوزر A.",
            "طلب بتاع A.",
            "A بيطلب طلبه.",
            "200.",
            "قفلة.",
            "يوزر تاني.",
            "يوزرين.",
            "الطلب بتاع A.",
            "B بيطلب طلب A بالـ id بتاعه.",
            "404: بالنسبة لـ B الطلب مش موجود.",
            "قفلة.",
            "الـ role.",
            "يوزر عادي.",
            "طلبه هو.",
            "حتى على طلبه، المسح للأدمن بس: 403.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تشيل [[userId]] من الـ where، اختبار «404 for another user» لازم يقع ويقول [[expected 200 to be 404]]: يعني B قدر يوصل لطلب A. ده بالظبط الـ bug اللي الاختبار معمول عشانه. رجّع الشرط والاختبار ينجح تاني.

لو الاختبار فضل ناجح وانت شايل الشرط، يبقى الاختبار بيستخدم نفس اليوزر للاتنين، أو بيبعت توكن A في الطلبين. اطبع [[a.id]] و [[b.id]] واتأكد إنهم مختلفين.

وممكن تجمع كل الـ routes اللي فيها ownership في اختبار واحد بـ [[it.each]]، زي الكود. الـ DELETE مش في القايمة لأنه للأدمن بس: يوزر B هيوقف عند [[requireRole]] ويرجع 403 قبل ما نوصل لسؤال «الطلب بتاع مين».`,
          solCode: R`it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => {
  const [a, b] = [await createUser(), await createUser()];
  const order = await createOrder(a);
  const res = await request(app)[method](path(order.id)).set("Authorization", $__btBearer $__{b.token}$__bt).send({});
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "msw و nock",
          title: "الاختبار ميكلّمش بوابة الدفع ولا خدمة الإيميل الحقيقية",
          desc: R`أي خدمة برّه (الدفع، والإيميل، والـ SMS، و AI) بتعملها mock على مستوى الشبكة: الكود بتاعك بيعمل [[fetch]] عادي، و msw (أو nock) بيمسك الطلب قبل ما يخرج ويرجّع رد انت كاتبه. كده بتختبر الحالة الناجحة، والخدمة واقعة (503)، والرد البطيء، من غير نت ولا فلوس.

وأي طلب لبرّه ملوش handler لازم يفشل الاختبار، عشان محدش يبعت إيميل حقيقي من CI بالغلط.`,
          example: R`import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
beforeAll(() => pay.listen({
  onUnhandledRequest(req) {
    if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
  },
}));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());

it("returns 502 when the payment provider is down", async () => {
  pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
  const user = await createUser();
  const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
  expect(res.status).toBe(502);
});`,
          try: R`[[npm i -D msw]]، واعمل handler لخدمة الإيميل اللي بتستخدمها (مثلًا [[POST https://api.resend.com/emails]]) بيحفظ الـ body في array. اختبر إن «نسيت الباسورد» بتبعت إيميل واحد للعنوان الصح وفيه لينك. وبعدين شيل الـ handler وشوف الاختبار بيقع بـ «unmocked».`,
          flag: "script",
          deep: {
            why: R`اختبار بيكلّم Paymob أو Resend الحقيقيين بطيء، ومحتاج مفاتيح في CI، وبيفشل لما خدمتهم تهنّج، وممكن يبعت إيميلات لناس حقيقيين. والأهم: مش هتقدر تجرّب «البوابة رجّعت 503» أو «الرد اتأخر ١٠ ثواني»، ودي بالظبط الحالات اللي الكود بتاعك لازم يتعامل معاها صح.`,
            how: R`msw بيركّب interceptor على [[fetch]] و [[http]] في Node. أي طلب بيطلع بيتقارن بالـ handlers: [[http.post(url, resolver)]]. لو فيه match، الـ resolver بيرجّع [[HttpResponse.json(...)]] والطلب عمره ما بيخرج. و [[pay.use(...)]] جوه اختبار واحد بيضيف handler مؤقت يغلب الأساسي (زي «البوابة واقعة»)، و [[resetHandlers()]] بعد كل اختبار بيشيله.

تفصيلة مهمة جربناها: supertest نفسه بيبعت طلب HTTP للـ app على [[127.0.0.1]]، و msw بيشوف الطلب ده كمان. لو كتبت [[onUnhandledRequest: "error"]] كل اختبارات supertest هتقع. عشان كده الدالة: سيب الـ localhost يعدّي، وأي حاجة تانية [[throw]]. ولاحظ إن [[print.error()]] جوه الدالة في msw 2 بيطبع رسالة بس ومبيوقفش الطلب، فالـ throw هو اللي بيضمن إن الطلب ميخرجش (msw بيرجّعله 500 فيه الرسالة).

nock بيعمل نفس الفكرة بأسلوب تاني: [[nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" })]]، و [[nock.disableNetConnect()]] مع [[nock.enableNetConnect("127.0.0.1")]] بيقفل أي طلب تاني. من nock 14 بقى بيمسك [[fetch]] كمان. و [[scope.isDone()]] بيقولك الطلب المتوقع اتبعت ولا لأ.

والبديل التالت: الكود ياخد الـ client كـ dependency ([[createApp({ mailer })]]) وتدّيله fake في الاختبار. أبسط للحاجات اللي انت عاملها wrapper، بس مش بيختبر شكل الطلب الحقيقي اللي بيطلع.`,
            when: "أي كود بيكلّم خدمة برّه. الـ msw نفسه بيتستخدم في الواجهة (React) لنفس الغرض، فلو فريقك بيستخدمه هناك خليه نفس الأداة.",
            mistakes: R`[[vi.mock("node-fetch")]] أو mock لدالة داخلية بدل الشبكة: الاختبار بيختبر الـ mock مش الكود. ونسيان [[resetHandlers]] فالـ handler الـ «واقع» يعدّي على الاختبار اللي بعده. و [[onUnhandledRequest: "bypass"]] فطلب ملوش handler يخرج للنت الحقيقي من غير ما حد ياخد باله. وmock بيرجّع شكل رد مختلف عن الخدمة الحقيقية: خد شكل الرد من الـ docs أو من لوج طلب حقيقي، مش من خيالك.`
          },
          lines: [
            "سيرفر msw للـ Node.",
            "أدوات تعريف الـ handlers والردود.",
            "سيرفر وهمي لبوابة الدفع.",
            "أي POST للعنوان ده...",
            "...اقرا الـ body اللي الكود بعته...",
            "...ورجّع رد شكله زي رد البوابة، فيه رقم الطلب.",
            "قفلة الـ handler.",
            "قفلة.",
            "قبل الاختبارات شغّل الـ interception...",
            "...ولأي طلب ملوش handler:",
            "لو مش طلب supertest للـ app على localhost، ارمي خطأ فالطلب ميخرجش.",
            "قفلة.",
            "قفلة.",
            "بعد كل اختبار شيل أي handler مؤقت.",
            "في الآخر اقفل.",
            "اختبار «البوابة واقعة».",
            "handler مؤقت للاختبار ده بس: 503.",
            "يوزر.",
            "اعمل طلب.",
            "الـ API لازم يرد 502 واضح، مش 500 ولا يعلّق.",
            "قفلة."
          ],
          sol: R`المتوقع: الاختبار ينجح، والـ array فيها عنصر واحد، الـ [[to]] بتاعه إيميل اليوزر، والـ [[html]] فيه اللينك. ولما تشيل الـ handler، الاختبار بيقع لأن الطلب رجعله 500 فيه [[unmocked: POST https://api.resend.com/emails]]، والإيميل عمره ما خرج.

لو الاختبار نجح والـ array فاضية، يبقى الإيميل بيتبعت بعد ما الرد يرجع (fire and forget) والاختبار خلص قبله: اعمل await للإرسال في الكود، أو استنى في الاختبار بـ [[vi.waitFor]].

ولو شغلك بـ nock بدل msw، نفس الفكرة في الكود التاني.`,
          solCode: R`const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
beforeAll(() => mail.listen({ onUnhandledRequest(req) { if (new URL(req.url).hostname !== "127.0.0.1") throw new Error("unmocked: " + req.url); } }));
afterAll(() => mail.close());

it("forgot password sends one email", async () => {
  const user = await createUser();
  const res = await request(app).post("/api/auth/forgot").send({ email: user.email });
  expect(res.status).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].to).toContain(user.email);
  expect(sent[0].html).toMatch(/reset\?token=/);
});

// نفس الفكرة بـ nock:
// nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
// const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... expect(scope.isDone()).toBe(true);`
        },
        {
          cmd: "اختبار الـ webhook",
          title: "webhook: توقيع صح، وتوقيع غلط، ونفس الحدث مرتين",
          desc: R`الـ webhook ليه ٣ اختبارات لازم تبقى موجودة: توقيع صح فالطلب يتفعّل، وتوقيع غلط فيرجع 401 ومفيش حاجة تتغير في القاعدة، ونفس الحدث يوصل مرتين فالرد 200 في المرتين والأثر يحصل مرة واحدة.

الاختبار بيحسب التوقيع بنفس السر ونفس الطريقة اللي البوابة بتستخدمها، وبيبعت الـ body كنص خام بالظبط زي ما اتوقّع.`,
          example: R`import crypto from "node:crypto";

const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex");
const send = (raw, sig) => request(app).post("/webhooks/pay").set("Content-Type", "application/json").set("X-Signature", sig).send(raw);

it("rejects a bad signature and changes nothing", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
  expect((await send(raw, sign(raw + "x"))).status).toBe(401);
  expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
});

it("same event twice = one effect", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_3" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
});`,
          try: R`اكتب الاختبار التالت الناقص: توقيع صح فالطلب يبقى PAID. وبعدين جرّب تبعت نفس الـ JSON بس بمسافة زيادة ([[JSON.stringify(obj, null, 1)]]) مع التوقيع بتاع النسخة من غير مسافات. المفروض يرجع 401. فكّر ليه، وليه ده معناه إن الـ route لازم يقرا الـ raw body.`,
          flag: "script",
          deep: {
            why: R`الـ webhook هو الـ endpoint اللي بيحوّل «طلب» لـ «مدفوع» (درس [[webhook الدفع]] في «تاب بناء مشروع كامل»). أي غلطة فيه معناها فلوس: يا طلبات بتتفعّل من غير دفع، يا ناس دفعت ومخدتش حاجة، يا اشتراك اتضاف مرتين. والبوابات بتعيد الإرسال لو ماردّتش بسرعة، فالتكرار مش احتمال نظري، ده بيحصل كل يوم.`,
            how: R`التوقيع بيتحسب على البايتات بالظبط. لو الـ route بيعمل [[express.json()]] الأول وبعدين [[JSON.stringify(req.body)]] عشان يحسب، أي فرق في المسافات أو ترتيب المفاتيح هيبوّظ المقارنة. عشان كده الـ route ده بياخد [[express.raw({ type: "application/json" })]] قبل الـ [[express.json()]] العام، ويحسب HMAC على الـ Buffer، ويقارن بـ [[timingSafeEqual]] (بعد ما يتأكد إن الطولين زي بعض، وإلا بيرمي). وفي الاختبار [[.send(raw)]] بنص جاهز عشان supertest ميعيدش التنسيق. (بعض البوابات زي Paymob بتوقّع حقول معينة بترتيب معين مش الـ body كله: شوف درس «التحقق من التوقيع» في تاب «Node و npm».)

التوقيع الغلط: مش كفاية الـ 401، لازم تقرا من القاعدة وتتأكد إن الطلب لسه PENDING. أوقات الكود بيحدّث الأول وبعدين يتحقق.

التكرار: اختبرت الـ idempotency بإنك بعت نفس الحدث مرتين وعدّيت الأثر. الكود بيعملها بـ [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]] كحارس أخير. والرد 200 في المرة التانية كمان: لو رجّعت 409 أو 500، البوابة هتفتكر إنه فشل وتفضل تعيد.

وحالات تانية تستاهل اختبار لو البوابة بتبعتها: دفعة فاشلة بعد نجاح (لازم يفضل PAID)، ومبلغ مختلف عن مبلغ الطلب (يتسجّل ومفيش تفعيل)، وطلب مش موجود (200 ومفيش crash).`,
            when: "أي webhook: دفع، أو اشتراكات، أو GitHub، أو تيليجرام. ولو بتستقبل الحدث وتحطه في queue، اختبر الـ route (توقيع و 200 سريعة) والـ worker (idempotent) كل واحد لوحده.",
            mistakes: R`اختبار التوقيع الصح بس، فمحدش اكتشف إن الكود بيقبل أي توقيع طوله صح. أو حساب التوقيع على [[JSON.stringify(req.body)]] بعد الـ parse. أو اختبار التكرار بإنك تبعت حدثين مختلفين. ونسيان إن الـ webhook route لازم يبقى قبل [[express.json()]] العام وإلا [[req.body]] يوصله object مش Buffer. وفي الانترفيو: «إزاي تتأكد إن الـ webhook مش بيتعالج مرتين؟» الإجابة: شرط على الحالة، و unique على id المعاملة، ورد 200 للتكرار.`
          },
          lines: [
            "crypto من Node.",
            "دالة بتحسب التوقيع بنفس سر الاختبار ونفس الخوارزمية اللي الـ route بيستخدمها.",
            "دالة بتبعت نص خام بالتوقيع في header.",
            "توقيع غلط.",
            "طلب لسه PENDING.",
            "الحدث كنص.",
            "توقيع لنص تاني: لازم 401.",
            "واقرا من القاعدة: الطلب متغيّرش.",
            "قفلة.",
            "نفس الحدث مرتين.",
            "طلب.",
            "حدث واحد.",
            "المرة الأولى 200.",
            "والتانية 200 برضه، عشان البوابة تبطّل تعيد.",
            "والأثر حصل مرة واحدة بس.",
            "قفلة."
          ],
          sol: R`الاختبار الناقص: توقيع صح، والرد 200، والطلب في القاعدة بقى [[PAID]] و [[gatewayTxId]] بتاعه [[tx_1]].

ونسخة الـ JSON بالمسافات بترجع 401 لأن التوقيع اتحسب على نص تاني، والـ HMAC بيتغير لو اتغيّر بايت واحد. البوابة بتوقّع البايتات اللي بعتتها بالظبط، فانت لازم تحسب على نفس البايتات اللي وصلت (الـ raw body)، مش على object عملتله parse وبعدين stringify.

لو النسخة بالمسافات عدّت، يبقى الـ route بيحسب على [[JSON.stringify(req.body)]]، وده هيقع مع أول بوابة بتبعت JSON بتنسيق مختلف عن بتاع Node.`,
          solCode: R`it("marks the order PAID with a valid signature", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_1" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  const saved = await db.order.findUnique({ where: { id: order.id } });
  expect(saved).toMatchObject({ status: "PAID", gatewayTxId: "tx_1" });
});

it("pretty JSON with the compact signature is rejected", async () => {
  const order = await createOrder(await createUser());
  const obj = { orderId: order.id, txId: "tx_9" };
  expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
});`
        }
      ]
    },
    {
      t: "Redis",
      l: 3,
      n: "Redis نفسه: الأوامر والأنواع، والكاش من Node والتطبيق شغال لو Redis وقع، والذاكرة، والـ sessions والـ locks، والـ rate limit، والـ pub/sub",
      items: [
        {
          cmd: "redis-cli",
          title: "Redis من الترمنال: مفاتيح وقيم ووقت انتهاء",
          desc: R`Redis قاعدة بيانات في الرام: كل حاجة فيها key وقيمة، وأي key ممكن يبقى ليه TTL (يتمسح لوحده بعد مدة). [[redis-cli]] بيدّيك shell تكتب فيه الأوامر مباشرة، وده أسرع طريقة تفهم بيها التطبيق بيكتب إيه.

اتفق على شكل للمفاتيح بـ [[:]] ([[user:7:name]] و [[otp:7]] و [[rl:login:1.2.3.4]]). وعلى سيرفر حقيقي عمرك ما تكتب [[KEYS *]]: استخدم [[SCAN]].`,
          example: R`docker run -d --name redis -p 6379:6379 redis:8-alpine
redis-cli ping
redis-cli
SET otp:7 482913 EX 300
TTL otp:7
# (integer) 300
TTL user:7:name
# (integer) -1   موجود ومن غير انتهاء
TTL nope
# (integer) -2   مش موجود
INCR views:post:1
SET lock:report 1 NX PX 10000
SCAN 0 MATCH user:* COUNT 100
UNLINK user:7:name
redis-cli --scan --pattern 'sess:*' | head`,
          try: R`شغّل Redis في Docker وادخل [[redis-cli]]. اعمل [[SET code 1234 EX 20]]، واطبع [[TTL code]] كل كام ثانية لحد ما يبقى [[-2]] و [[GET code]] يرجّع [[(nil)]]. وبعدين اعمل [[SET code 1234 EX 20]] تاني وبعده [[SET code 9999]] من غير EX، واطبع الـ TTL. إيه اللي حصل للـ ٢٠ ثانية؟`,
          deep: {
            why: R`Redis موجود جنب Postgres في أغلب مشاريع Node: كاش، و rate limit، و sessions، و BullMQ (درس [[background jobs]] في «تاب بناء مشروع كامل»)، و adapter بتاع socket.io. لو بتستخدمه من المكتبات بس من غير ما تبص جواه، أول مشكلة (ذاكرة مليانة، أو sessions بتختفي، أو كاش مبيتمسحش) هتبقى لغز.`,
            how: R`Redis بيشتغل على thread واحد وبينفّذ أمر واحد في المرة، وكل أمر atomic. عشان كده [[INCR]] آمن من أي عدد من السيرفرات في نفس اللحظة، وده أساس الـ rate limit والعدادات.

الـ TTL: [[EX]] بالثواني و [[PX]] بالملّي ثانية. [[TTL]] بيرجّع الثواني الباقية، و [[-1]] معناه موجود من غير انتهاء، و [[-2]] معناه مش موجود. و [[SET]] عادي من غير EX على key موجود بيشيل الـ TTL القديم، وده مصدر bugs كتير (key المفروض يتمسح بقى دايم). و [[PERSIST]] بيشيل الـ TTL صريح.

[[KEYS pattern]] بيلف على كل المفاتيح مرة واحدة، ولأن Redis thread واحد، كل الطلبات التانية بتستنى. على قاعدة فيها ملايين المفاتيح ده ثواني من التوقف الكامل. [[SCAN cursor MATCH ... COUNT ...]] بيرجّع دفعة صغيرة و cursor تكمّل منه، لحد ما الـ cursor يرجع 0. و [[redis-cli --scan --pattern]] بيعمل اللفة دي لوحده.

[[DEL]] بيمسح فورًا ولو القيمة ضخمة ممكن يوقّف السيرفر شوية، و [[UNLINK]] بيشيل الـ key فورًا ويحرر الذاكرة في الخلفية. وأوامر تانية مفيدة وانت بتدوّر: [[TYPE key]] و [[MEMORY USAGE key]] و [[INFO memory]] و [[MONITOR]] (بيطبع كل أمر بيوصل، للتطوير بس لأنه تقيل).

والصورة [[redis:8-alpine]] هي Redis الرسمي، وفيه بدايل متوافقة معاه في نفس الأوامر زي Valkey.`,
            when: "وانت بتبني أو بتصلّح أي حاجة بتكتب في Redis: تشوف المفاتيح شكلها إيه، والـ TTL متظبط ولا لأ، وفيه حاجة بتكبر من غير ما تتمسح ولا لأ.",
            mistakes: R`[[KEYS *]] أو [[FLUSHALL]] على سيرفر الإنتاج، والتاني بيمسح كل حاجة بما فيها الـ queues والـ sessions. ومفاتيح من غير TTL لحاجات مؤقتة (OTP وكاش)، فالذاكرة تفضل تكبر لحد ما Redis يرفض الكتابة. وRedis مكشوف على النت من غير باسورد: فيه bots بتدوّر على البورت 6379 طول الوقت. خليه على شبكة داخلية أو [[127.0.0.1]]، وبـ [[requirepass]] أو ACL.`
          },
          lines: [
            "شغّل Redis في Docker على البورت الافتراضي.",
            "اتأكد إنه شغال: لازم يرد PONG.",
            "افتح الـ shell التفاعلي.",
            "خزّن كود OTP يتمسح بعد ٥ دقايق.",
            "فاضله كام ثانية.",
            "key من غير TTL.",
            "key مش موجود.",
            "عداد: بيزوّد واحد ويرجّع القيمة الجديدة، atomic.",
            "اكتب بس لو مش موجود، ويتمسح بعد ١٠ ثواني (أساس الـ lock).",
            "دوّر على المفاتيح على دفعات بدل KEYS.",
            "امسح والذاكرة تتحرر في الخلفية.",
            "من برّه الـ shell: لف على كل المفاتيح اللي بتبدأ بـ sess."
          ],
          sol: R`بعد ٢٠ ثانية [[TTL code]] بيرجّع [[-2]] و [[GET code]] بيرجّع [[(nil)]]: الـ key اتمسح لوحده.

والجزء التاني: بعد [[SET code 9999]] من غير EX، [[TTL code]] بيرجّع [[-1]]. الـ SET العادي بيكتب قيمة جديدة ومعاها «مفيش انتهاء»، فالـ ٢٠ ثانية راحت والكود بقى دايم. لو عايز تغيّر القيمة وتسيب الـ TTL زي ما هو، استخدم [[SET code 9999 KEEPTTL]]. ولو عايز TTL جديد، حطه في نفس الأمر.`,
          solCode: R`SET code 1234 EX 20
TTL code
# (integer) 20
SET code 9999
TTL code
# (integer) -1
SET code 1234 EX 20
SET code 9999 KEEPTTL
TTL code
# (integer) 20   الـ TTL القديم فضل زي ما هو`
        },
        {
          cmd: "أنواع Redis",
          title: "string و hash و list و set و sorted set: كل واحد لإيه",
          desc: R`القيمة في Redis مش لازم تبقى نص. فيه ٥ أنواع أساسية وكل واحد ليه أوامره:

[[string]] لقيمة واحدة (كاش JSON أو عداد). و [[hash]] لـ object بحقول (بيانات يوزر أو session). و [[list]] لقايمة بترتيب الإضافة (آخر ١٠ حاجات). و [[set]] لمجموعة من غير تكرار (مين أونلاين). و [[sorted set]] لمجموعة مترتبة بـ score (لوحة الأوائل، أو نافذة زمنية).`,
          example: R`SET product:1:v1 '{"id":1,"name":"Mug"}' EX 300
HSET user:7 name Mona plan pro credits 10
HINCRBY user:7 credits -3
LPUSH recent:7 p3
LTRIM recent:7 0 9
LRANGE recent:7 0 -1
SADD online:2026-09-29 u1 u2 u1
SCARD online:2026-09-29
ZADD leaderboard 120 mona 300 ali 90 sara
ZINCRBY leaderboard 50 sara
ZREVRANGE leaderboard 0 2 WITHSCORES`,
          try: R`اعمل «آخر ٥ منتجات اتفرج عليها اليوزر ٧» بـ list: كل مشاهدة [[LPUSH]] وبعدها [[LTRIM]]. وبعدين فكّر: لو اتفرج على نفس المنتج مرتين هيتكرر. إزاي تمنع التكرار وتفضل محتفظ بالترتيب؟ (تلميح: sorted set والـ score هو الوقت).`,
          deep: {
            why: R`لو كل حاجة string فيها JSON، أي تعديل صغير (زوّد الرصيد ١) معناه: اقرا الـ JSON كله، وعدّل، واكتبه تاني. ولو سيرفرين عملوا كده في نفس اللحظة، تعديل واحد يضيع. الأنواع التانية بتخلي Redis يعمل التعديل بنفسه في أمر واحد atomic.`,
            how: R`[[string]]: [[GET]] و [[SET]] و [[INCR]] و [[INCRBY]]. أقصى حجم كبير جدًا، بس خليها صغيرة (كيلوبايتات مش ميجات). الكاش العادي string فيه JSON.

[[hash]]: [[HSET key field value ...]] و [[HGET]] و [[HGETALL]] و [[HINCRBY]]. تعدّل حقل من غير ما تلمس الباقي. الـ TTL على الـ hash كله (في Redis 7.4 وما بعده فيه كمان [[HEXPIRE]] لحقل لوحده).

[[list]]: [[LPUSH]] و [[RPUSH]] من الطرفين، و [[LRANGE key 0 -1]] للكل، و [[LTRIM]] بيقص القايمة لطول ثابت. و [[BRPOP]] بيستنى لحد ما عنصر يوصل، وده كان أساس queues قديمة (BullMQ دلوقتي بيستخدم أنواع أعقد).

[[set]]: [[SADD]] و [[SISMEMBER]] و [[SCARD]] (العدد) و [[SINTER]] (المشترك بين مجموعتين). التكرار بيتشال لوحده: [[SADD s u1 u2 u1]] بيضيف ٢.

[[sorted set]]: كل عنصر ليه score رقم، والترتيب بيه دايمًا. [[ZADD]] و [[ZINCRBY]] و [[ZREVRANGE ... WITHSCORES]] (الأعلى الأول) و [[ZREVRANK]] (ترتيب عنصر). ولو الـ score هو الوقت بالملّي ثانية، [[ZREMRANGEBYSCORE]] بيشيل كل اللي أقدم من دقيقة، وده أساس sliding window للـ rate limit.

وفيه أنواع تانية هتقابلها: streams ([[XADD]]، زي log بيتقري من أكتر من consumer)، و HyperLogLog ([[PFADD]]، عدد تقريبي للمميزين بذاكرة ثابتة)، و bitmaps.`,
            when: "hash لأي object بتعدّل حقوله لوحده. و sorted set لأي حاجة فيها «أعلى» أو «آخر» أو «في آخر X دقيقة». و set لـ «موجود ولا لأ» والعد من غير تكرار. و string للكاش والعدادات.",
            mistakes: R`JSON في string لحاجة بتتعدّل حقل حقل (رصيد أو عداد جوه object) فيضيع تعديل مع التزامن. و list من غير LTRIM فتكبر للأبد. و [[HGETALL]] أو [[SMEMBERS]] أو [[LRANGE 0 -1]] على key فيه مليون عنصر: نفس مشكلة KEYS، أمر واحد بيوقّف الكل. استخدم [[HSCAN]] و [[SSCAN]] أو صفحات.`
          },
          lines: [
            "string: كاش لمنتج كـ JSON لمدة ٥ دقايق.",
            "hash: بيانات يوزر في حقول.",
            "قلّل حقل واحد بـ ٣ من غير ما تقرا الباقي.",
            "list: ضيف مشاهدة في أول القايمة.",
            "سيب أول ١٠ بس.",
            "اقرا القايمة كلها.",
            "set: الأونلاين النهارده، والتكرار بيتشال لوحده.",
            "عددهم.",
            "sorted set: كل لاعب ونقطه.",
            "زوّد نقط سارة ٥٠.",
            "أعلى ٣ ومعاهم النقط."
          ],
          sol: R`بالـ list: بعد ٦ مشاهدات القايمة فيها آخر ٥ بس، بس لو اتفرج على p2 مرتين هتلاقيها متكررة.

الحل sorted set: العنصر هو id المنتج والـ score هو الوقت. [[ZADD]] لعنصر موجود بيحدّث الـ score بس، فمفيش تكرار والمنتج بيطلع لأول القايمة. وبعدين [[ZREMRANGEBYRANK]] بيشيل الأقدم لو الحجم عدّى ٥. والنتيجة الصح: [[ZREVRANGE recent:7 0 -1]] بيرجّع ٥ منتجات مختلفة، الأحدث الأول.`,
          solCode: R`ZADD recent:7 1727600000001 p1
ZADD recent:7 1727600000002 p2
ZADD recent:7 1727600000003 p1
ZREMRANGEBYRANK recent:7 0 -6
ZREVRANGE recent:7 0 -1
# 1) "p1"
# 2) "p2"`
        },
        {
          cmd: "ioredis",
          title: "Redis من Node: كاش، والتطبيق يكمّل لو Redis وقع",
          desc: R`[[ioredis]] عميل Redis لـ Node، وكل أمر بقى دالة بترجّع promise: [[redis.get(key)]] و [[redis.set(key, value, "EX", 300)]].

الإعداد المهم للكاش: لو Redis وقع، كل أمر يفشل بسرعة بدل ما يستنى، والكود يكمّل من القاعدة. الكاش تحسين، مش حاجة التطبيق يقع لو مش موجودة. نمط cache-aside نفسه والمسح لما الداتا تتغير في درس [[طبقات الكاش]] في «تاب بناء مشروع كامل». هنا الـ client والـ wrapper.`,
          example: R`// lib/redis.ts
import { Redis } from "ioredis";

export const redis = new Redis(config.REDIS_URL, {
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 2000,
  commandTimeout: 500,
});
redis.on("error", (err) => logger.warn({ err: err.message }, "redis error"));

export async function cached(key, ttlSec, load) {
  try {
    const hit = await redis.get(key);
    if (hit !== null) return JSON.parse(hit);
  } catch (err) { logger.warn({ key, err: err.message }, "cache read skipped"); }
  const value = await load();
  try { await redis.set(key, JSON.stringify(value), "EX", ttlSec); }
  catch (err) { logger.warn({ key, err: err.message }, "cache write skipped"); }
  return value;
}

// const product = await cached($__btproduct:$__{id}:v1$__bt, 300, () => db.product.findUnique({ where: { id } }));`,
          try: R`استخدم [[cached]] في endpoint بطيء، وقيس الزمن أول مرة وتاني مرة. وبعدين وقّف Redis ([[docker stop redis]]) وابعت نفس الطلب: لازم يرجع نفس الداتا (أبطأ)، واللوج فيه «cache read skipped». وبعدين شغّله تاني وتأكد إن الكاش رجع يشتغل لوحده من غير restart.`,
          flag: "script",
          deep: {
            why: R`الإعدادات الافتراضية في ioredis معمولة إن «متضيّعش أي أمر»: لو الاتصال مقطوع بيحط الأوامر في طابور ويعيد المحاولة. ده مناسب لـ queue، بس للكاش معناه إن كل طلب HTTP بيستنى Redis لحد ما يرجع أو يوصل للحد، فوقعة Redis بتبقى وقعة للموقع كله. والكاش هدفه يخفف الحمل، مش يبقى نقطة فشل جديدة.`,
            how: R`[[enableOfflineQueue: false]]: لو مفيش اتصال، الأمر يفشل فورًا بخطأ «Stream isn't writeable» بدل ما يستنى في الطابور. و [[maxRetriesPerRequest: 1]]: لو الاتصال اتقطع وأمر شغال، يعيده مرة واحدة بس. و [[commandTimeout: 500]]: أي أمر ياخد أكتر من نص ثانية (Redis مهنّج أو الشبكة بطيئة) يفشل. و [[connectTimeout]] لأول اتصال.

ioredis بيفضل يحاول يتصل في الخلفية لوحده، فلما Redis يرجع، الكاش يرجع يشتغل من غير ما تعمل restart. و [[redis.on("error")]] لازم يبقى موجود: من غيره كل خطأ اتصال بيطبع «Unhandled error event» في اللوج.

جربناها: Redis شغال، أول طلب ٥٠ms من القاعدة والباقي أقل من ms من الكاش. Redis واقف، كل طلب ٥٠ms من القاعدة، ولوج warning، ومفيش أي 500.

الـ client ده للكاش. BullMQ محتاج client تاني بإعدادات عكس دي ([[maxRetriesPerRequest: null]]) لأنه لازم يستنى ميضيّعش jobs، وده في درس [[background jobs]]. وخلي client واحد لكل نوع استخدام للتطبيق كله، مش client لكل طلب.

و [[JSON.parse]] للكاش: تواريخ Prisma بترجع strings مش Date. لو الكود بيعمل [[order.createdAt.getTime()]] هيقع على القيمة الجاية من الكاش بس. ودي ملاحظة: ioredis في وضع صيانة، و node-redis (باكدج [[redis]]) هو اللي Redis نفسهم بينصحوا بيه للمشاريع الجديدة. ioredis لسه منتشر جدًا، و BullMQ مبني عليه.`,
            when: "أي كاش أو عداد مش أساسي. ولحاجات لازم تبقى صح (rate limit للـ login، أو lock على عملية دفع) قرر صريح: لو Redis وقع، تسمح ولا ترفض؟ (درس [[rate-limit-redis]]).",
            mistakes: R`الإعدادات الافتراضية للكاش فوقعة Redis تعلّق كل الطلبات. ومفيش try/catch حوالين الكاش فخطأ Redis يبقى 500. و [[if (hit)]] بدل [[hit !== null]]: لو القيمة المتكاشة [[0]] أو [[""]] هتتعامل كأنها مش موجودة. وتكاش [[null]] (مش موجود) من غير ما تفكر: ده ممكن يبقى مفيد ضد طلبات كتير على id مش موجود، بس بـ TTL قصير. و [[new Redis()]] جوه الـ route فكل طلب اتصال جديد.`
          },
          lines: [
            "ioredis بالـ named export، الشكل اللي المكتبة بتنصح بيه.",
            "client واحد للكاش من الـ URL في config.",
            "لو مفيش اتصال افشل فورًا، متستناش في طابور.",
            "إعادة محاولة واحدة بس للأمر لو الاتصال اتقطع.",
            "أول اتصال ميستناش أكتر من ثانيتين.",
            "أي أمر ياخد أكتر من نص ثانية يفشل.",
            "قفلة.",
            "سجّل أخطاء الاتصال (ومن غيره Node بيطبع unhandled error).",
            "wrapper: key ومدة ودالة بتجيب من القاعدة.",
            "جرّب الكاش.",
            "اقرا.",
            "لقيته؟ رجّعه. ([[!== null]] عشان القيم زي 0 تتحسب.)",
            "Redis فيه مشكلة؟ سجّل وكمّل.",
            "هات من القاعدة.",
            "اكتب في الكاش بالمدة، ولو فشل سجّل وكمّل.",
            "قفلة.",
            "رجّع القيمة.",
            "قفلة."
          ],
          sol: R`المتوقع: أول طلب بزمن القاعدة، وتاني طلب أسرع بكتير (أقل من ms في Redis المحلي). بعد [[docker stop redis]] الطلب بيرجع 200 بنفس الداتا بزمن القاعدة، واللوج فيه [[cache read skipped]] و [[cache write skipped]] ومعاهم [[ECONNREFUSED]]. وبعد [[docker start redis]] بثواني الطلب التالت يرجع يبقى سريع من غير restart.

لو الطلب علّق بعد ما وقّفت Redis، يبقى [[enableOfflineQueue]] لسه true أو [[commandTimeout]] مش موجود. ولو رجع 500، يبقى فيه أمر Redis برّه الـ try.

الكود ده نسخة صغيرة للتجربة من غير Express.`,
          solCode: R`import { cached, redis } from "./lib/redis.js";

let dbCalls = 0;
const load = async () => { dbCalls++; await new Promise((r) => setTimeout(r, 50)); return { id: 1, name: "Mug" }; };
for (let i = 0; i < 3; i++) {
  const t = performance.now();
  await cached("product:1:v1", 60, load);
  console.log(i, (performance.now() - t).toFixed(1) + "ms", "dbCalls=" + dbCalls);
}
redis.disconnect();
// Redis شغال:  0 51ms dbCalls=1 | 1 0.5ms dbCalls=1 | 2 0.4ms dbCalls=1
// Redis واقف:  0 51ms dbCalls=1 | 1 51ms dbCalls=2 | 2 50ms dbCalls=3`
        },
        {
          cmd: "maxmemory و persistence",
          title: "Redis اتملى: يمسح إيه؟ ولو عمل restart يفتكر إيه؟",
          desc: R`Redis في الرام، فلازم تقوله أقصى ذاكرة ([[maxmemory]]) وهيعمل إيه لما يوصلها ([[maxmemory-policy]]): يمسح مفاتيح قديمة، ولا يرفض أي كتابة جديدة.

والـ persistence: هل البيانات تفضل بعد restart؟ RDB بياخد صورة كل فترة، و AOF بيكتب كل أمر في ملف. الكاش ممكن يستغنى عن الاتنين، بس الـ queues والـ sessions لأ.`,
          example: R`redis-cli CONFIG GET maxmemory-policy
redis-cli INFO memory | grep -E "used_memory_human|maxmemory_human"
redis-cli INFO stats | grep evicted_keys

# redis.conf لكاش بس:
maxmemory 512mb
maxmemory-policy allkeys-lru
save ""
appendonly no

# redis.conf لـ BullMQ و sessions:
maxmemory 1gb
maxmemory-policy noeviction
appendonly yes
appendfsync everysec`,
          try: R`في Redis تجربة: [[CONFIG SET maxmemory 2mb]] و [[CONFIG SET maxmemory-policy allkeys-lru]]، واكتب ٣٠٠٠ key كل واحد ٥٠٠ بايت (سكربت bash أو Node). اطبع [[DBSIZE]] و [[evicted_keys]]. وبعدين غيّر الـ policy لـ [[noeviction]] واكتب تاني. إيه اللي بيرجع؟`,
          deep: {
            why: R`من غير maxmemory، Redis بيكبر لحد ما السيرفر نفسه يخلص رام، والـ OOM killer في Linux يقتله (أو يقتل حاجة أهم). ومن غير ما تفكر في الـ policy والـ persistence، ممكن Redis يمسح jobs من الـ queue عشان يعمل مكان لكاش، أو يعمل restart ويخسر كل الـ sessions فكل اليوزرز يخرجوا مرة واحدة.`,
            how: R`الـ policies المهمة: [[noeviction]] (الافتراضي): لما تتملى، أي أمر كتابة يرجع خطأ [[OOM command not allowed]]، والقراية شغالة. و [[allkeys-lru]]: يمسح أقل المفاتيح استخدامًا من الكل، مناسب لكاش بس. و [[volatile-lru]]: يمسح بس من المفاتيح اللي عليها TTL، ويسيب اللي من غير TTL. وفيه [[allkeys-lfu]] (الأقل تكرارًا) و [[volatile-ttl]].

جربناها: ٢ ميجا و allkeys-lru، كتبنا ٣٠٠٠ key، فضل حوالي ١٠٠٠ و [[evicted_keys]] حوالي ٢٠٠٠، ومعاهم اتمسحت مفاتيح تانية كانت موجودة قبل كده (مش بتاعة الكاش). ومع noeviction، الكتابة رجعت [[OOM command not allowed when used memory > 'maxmemory']].

BullMQ بيطلب [[noeviction]] صريح ويحذّرك لو غيره، لأن مسح key من queue معناه job ضاعت أو queue بايظة. فالقاعدة: Redis للكاش بـ allkeys-lru، و Redis تاني للـ queues والـ sessions بـ noeviction. instance تاني مش database تانية ([[SELECT 1]]) في نفس الـ instance، لأن الـ maxmemory والـ policy على مستوى الـ instance كله.

الـ persistence: RDB ([[save 3600 1 300 100 60 10000]] هو الافتراضي في النسخ الحديثة) بياخد snapshot كل فترة حسب عدد التغييرات، فلو وقع ممكن تخسر آخر دقايق. و AOF ([[appendonly yes]]) بيكتب كل أمر، ومع [[appendfsync everysec]] أقصى خسارة حوالي ثانية. للكاش: ولا واحد (أو RDB بس عشان ميبدأش فاضي). للـ queues والـ sessions: AOF.

وفي الخدمات المُدارة (Upstash و Redis Cloud و ElastiCache) الإعدادات دي في لوحة التحكم، بس نفس الأسئلة لازم تجاوب عليها.`,
            when: "أول ما Redis يطلع من جهازك لسيرفر حقيقي. واسأل نفس السؤال مع كل استخدام جديد: لو المفتاح ده اتمسح أو ضاع بعد restart، يحصل إيه؟",
            mistakes: R`كاش و BullMQ على نفس Redis بـ allkeys-lru: تحت الضغط Redis يمسح jobs. أو العكس: noeviction وكاش من غير TTL، فـ Redis يتملى وكل الكتابات تفشل بما فيها الـ queue والـ sessions. و Redis في Docker من غير volume مع AOF، فكل deploy يمسح الـ sessions. وفي الانترفيو: «Redis اتملى، إيه اللي بيحصل؟» الإجابة: حسب الـ policy، وافتراضيًا noeviction يعني الكتابة بتفشل.`
          },
          lines: [
            "الـ policy الحالية.",
            "الذاكرة المستخدمة والحد.",
            "عدد المفاتيح اللي اتمسحت عشان الذاكرة.",
            "أقصى ذاكرة للكاش.",
            "لما تتملى امسح الأقل استخدامًا.",
            "من غير snapshots.",
            "ومن غير AOF: الكاش ممكن يبدأ فاضي.",
            "أقصى ذاكرة للـ queues والـ sessions.",
            "متمسحش أي حاجة أبدًا، ارفض الكتابة.",
            "اكتب كل أمر في ملف.",
            "و sync للديسك كل ثانية."
          ],
          sol: R`مع [[allkeys-lru]] و ٢ ميجا: الكتابة كلها بتنجح، بس [[DBSIZE]] في الآخر حوالي ١٠٠٠ مش ٣٠٠٠، و [[evicted_keys]] حوالي ٢٠٠٠. Redis مسح الأقدم عشان يعمل مكان، ومعاهم أي key تاني كان موجود (لو كان عندك أي حاجة تانية في نفس الـ instance، راحت).

مع [[noeviction]]: أول كام كتابة بتنجح، وبعدين كل [[SET]] بيرجع [[OOM command not allowed when used memory > 'maxmemory']]. ولا key اتمسح، بس مفيش كتابة.

ده بالظبط الفرق: كاش يستحمل يتمسح منه، و queue لازم يرفض بدل ما يخسر. وفي الآخر [[CONFIG SET maxmemory 0]] عشان ترجّع Redis التجربة من غير حد.`,
          solCode: R`redis-cli CONFIG SET maxmemory 2mb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
for i in $(seq 1 3000); do echo "SET junk:$i $(head -c 500 /dev/zero | tr '\0' x)"; done | redis-cli > /dev/null
redis-cli DBSIZE
redis-cli INFO stats | grep evicted_keys
redis-cli CONFIG SET maxmemory-policy noeviction
redis-cli SET one-more x
# (error) OOM command not allowed when used memory > 'maxmemory'.
redis-cli CONFIG SET maxmemory 0`
        },
        {
          cmd: "connect-redis و lock",
          title: "sessions في Redis، و SET NX PX كـ lock بسيط",
          desc: R`الـ sessions (درس [[express-session]]) لازم تتخزن في مكان كل نسخ السيرفر شايفاه ويفضل بعد restart. [[connect-redis]] بيخزنها في Redis، وكل session key ليه TTL بعمر الكوكي.

ونفس Redis بيدّيك lock بسيط: [[SET key token NX PX 10000]] بينجح لواحد بس في نفس الوقت. مفيد لـ «التقرير ده يتعمل مرة واحدة حتى لو ٣ نسخ حاولوا مع بعض».`,
          example: R`import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const sessionRedis = createClient({ url: config.REDIS_URL });
sessionRedis.on("error", (err) => logger.error({ err }, "session redis"));
await sessionRedis.connect();

app.set("trust proxy", 1);
app.use(session({
  store: new RedisStore({ client: sessionRedis, prefix: "sess:" }),
  name: "sid",
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: config.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 },
}));

const RELEASE = 'if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end';
export async function withLock(key, ttlMs, fn) {
  const token = crypto.randomUUID();
  if ((await redis.set(key, token, "PX", ttlMs, "NX")) !== "OK") return { skipped: true };
  try { return { value: await fn() }; }
  finally { await redis.eval(RELEASE, 1, key, token); }
}`,
          try: R`ركّب الـ store، واعمل login، وافتح [[redis-cli --scan --pattern 'sess:*']] و [[TTL]] على الـ key. اعمل restart للسيرفر: لسه عامل login؟ وبعدين logout وتأكد إن الـ key اتمسح. وفي الآخر نادي [[withLock]] ٣ مرات مع بعض بـ [[Promise.all]] على دالة بتاخد ٢٠٠ms، وشوف كام واحدة اشتغلت.`,
          flag: "script",
          deep: {
            why: R`MemoryStore بيضيع مع كل deploy ومبيتشاركش بين النسخ: اليوزر يعمل login على نسخة، والطلب الجاي يروح لنسخة تانية فيبقى «مش مسجّل». و Redis أسرع من Postgres للـ lookup اللي بيحصل مع كل طلب، وبيمسح الـ sessions المنتهية لوحده بالـ TTL.

والـ lock: مع أكتر من نسخة، أي شغل «مرة واحدة» (تقرير يومي، أو مزامنة، أو إعادة حساب) هيتعمل مرة لكل نسخة. الـ lock بيخلي واحدة بس تعمله.`,
            how: R`connect-redis في نسخه الحديثة معمول لـ node-redis (باكدج [[redis]] و [[createClient]])، مش ioredis، لأنه بيستخدم أوامر بالشكل بتاعه ([[scanIterator]] و [[mGet]]). فعادي يبقى عندك client من node-redis للـ sessions و ioredis للكاش و BullMQ. وجربناها: login بيعمل key [[sess:...]] بـ TTL أسبوع (بعمر الكوكي)، و logout بـ [[destroy]] بيمسحه، و [[/me]] بعدها 401.

[[resave: false]] ضروري مع Redis عشان متكتبش الـ session مع كل طلب لو متغيرتش. والـ store بيعمل [[EXPIRE]] (touch) عشان الـ TTL يتجدد مع النشاط.

الـ lock: [[NX]] يعني «اكتب بس لو مش موجود»، وده atomic فواحد بس ينجح. و [[PX]] مهم جدًا: لو الـ process وقع وهو ماسك الـ lock، الـ key يتمسح لوحده بعد المدة بدل ما يفضل مقفول للأبد. والـ token العشوائي عشان وقت الفك: متمسحش الـ lock غير لو لسه بتاعك. لو شغلك خد أكتر من الـ TTL، الـ lock خلص وحد تاني مسكه، و [[DEL]] عادي هيمسح lock بتاع حد تاني. عشان كده الفك بـ Lua script: يقارن ويمسح في خطوة واحدة atomic.

حدود الـ lock ده: على Redis واحد، ومش مضمون ١٠٠٪ لو Redis نفسه عمل failover في النص. لحاجات فلوس، خلي الضمان الحقيقي في Postgres (unique constraint أو [[SELECT FOR UPDATE]]، تاب «SQL و Prisma»)، والـ lock بس يقلل الشغل المكرر. وللشغل الدوري، job scheduler في BullMQ بيحل المشكلة من غير lock خالص.`,
            when: "sessions: أي تطبيق بيستخدم express-session وفيه أكتر من نسخة أو بيعمل deploy (يعني كلهم). والـ lock: شغل دوري أو تقيل لازم يتعمل مرة واحدة، ومش فيه فلوس.",
            mistakes: R`lock من غير TTL فأول crash يقفل الشغل ده للأبد. أو فك بـ [[DEL]] من غير ما تتأكد من الـ token. أو [[GET]] وبعدين [[SET]] في أمرين بدل [[SET NX]]: اتنين يعملوا GET مع بعض ويلاقوه فاضي ويمسكوا الاتنين. وتدّي connect-redis client بتاع ioredis فيقع بأخطاء غريبة. و sessions و كاش على Redis واحد بـ allkeys-lru، فتحت الضغط اليوزرز يخرجوا لوحدهم (درس [[maxmemory و persistence]]).`
          },
          lines: [
            "express-session.",
            "الـ store بتاع Redis.",
            "client من node-redis، لأن connect-redis معمول عليه.",
            "client للـ sessions.",
            "سجّل أخطاءه.",
            "اتصل قبل ما السيرفر يبدأ.",
            "ورا proxy عشان الكوكي الـ secure.",
            "ركّب الـ session.",
            "الـ store في Redis، والمفاتيح بتبدأ بـ sess.",
            "اسم الكوكي بدل الافتراضي connect.sid.",
            "سر التوقيع من config.",
            "متكتبش لو متغيرتش.",
            "متعملش session لأي زائر.",
            "كوكي httpOnly، و secure في الإنتاج، وعمرها أسبوع (وده الـ TTL في Redis).",
            "قفلة.",
            "Lua: امسح بس لو القيمة لسه التوكن بتاعي.",
            "دالة lock عامة.",
            "توكن عشوائي للمحاولة دي.",
            "امسك الـ lock لو فاضي وبمدة، ولو مش فاضي اتخطى.",
            "اعمل الشغل.",
            "وفي كل الأحوال فك الـ lock بتاعك انت بس.",
            "قفلة."
          ],
          sol: R`المتوقع: بعد login فيه key واحد [[sess:...]] والـ TTL حوالي [[604800]] (أسبوع). بعد restart لسه عامل login لأن الـ session في Redis مش في الـ process. وبعد logout الـ key مش موجود و [[/me]] بيرجع 401.

والـ lock: من ٣ نداءات مع بعض، واحد بس رجّع [[{ value: ... }]] والتانيين [[{ skipped: true }]]، وبعدهم [[EXISTS lock:...]] بيرجع 0 لأن الـ lock اتفك.

لو التلاتة اشتغلوا، يبقى بتعمل GET ثم SET بدل [[SET ... NX]]، أو كل نداء بمفتاح مختلف.`,
          solCode: R`const job = (name) => withLock("lock:daily-report", 10_000, async () => {
  await new Promise((r) => setTimeout(r, 200));
  return name + " did it";
});
console.log(await Promise.all([job("A"), job("B"), job("C")]));
// [ { value: 'A did it' }, { skipped: true }, { skipped: true } ]
console.log(await redis.exists("lock:daily-report")); // 0`
        },
        {
          cmd: "rate-limit-redis",
          title: "rate limit مشترك بين كل النسخ: لكل IP ولكل يوزر ولكل API key",
          desc: R`الـ limiter الافتراضي في express-rate-limit بيعد في ذاكرة الـ process، فمع ٣ نسخ الحد الفعلي بيتضرب في ٣. [[rate-limit-redis]] بيخلي العداد في Redis فكل النسخ بتعد في نفس المكان.

ومعاه تعد بحاجة غير الـ IP: [[keyGenerator]] يرجّع id اليوزر أو الـ API key، و [[limit]] ممكن يبقى دالة (الباقة المدفوعة حدها أعلى). والأساسيات (الحد العام، وحد login، و trust proxy) في درس [[express-rate-limit]].`,
          example: R`import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

const redisStore = (prefix) => new RedisStore({ prefix, sendCommand: (command, ...args) => redis.call(command, ...args) });

export const publicApiLimiter = rateLimit({
  windowMs: 60_000,
  limit: (req) => (req.apiKey?.plan === "pro" ? 600 : 60),
  keyGenerator: (req) => (req.apiKey ? $__btkey:$__{req.apiKey.id}$__bt : $__btip:$__{ipKeyGenerator(req.ip)}$__bt),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  identifier: "public",
  store: redisStore("rl:public:"),
  passOnStoreError: true,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  skipSuccessfulRequests: true,
  store: redisStore("rl:login:"),
  passOnStoreError: false,
});`,
          try: R`ركّب [[publicApiLimiter]] على route تجربة بحد ٢ للـ anonymous و ٥ للـ pro. ابعت ٣ طلبات من غير key و ٣ بـ [[X-API-Key: pro_1]]، واطبع الـ status و headers [[RateLimit]] و [[RateLimit-Policy]] و [[Retry-After]]. وبعدين شغّل نسختين من السيرفر على بورتين وابعت الطلبات بالتبادل: الحد لسه ٢ للاتنين مع بعض؟`,
          flag: "script",
          deep: {
            why: R`rate limit في الذاكرة مع أكتر من نسخة بيبقى أضعف مما انت فاكر، وبيتصفّر مع كل deploy. والحد بالـ IP بس مش عادل: شركة كاملة ورا IP واحد تتحظر، ومهاجم عنده ألف IP يعدّي. الـ API العام (للشركاء أو الموبايل) محتاج حد لكل API key حسب الباقة، و endpoints الـ AI أو الـ SMS محتاجة حد لكل يوزر لأنك بتدفع على كل طلب.`,
            how: R`[[sendCommand]] هو الجسر: rate-limit-redis بيبعت أوامره (Lua scripts صغيرة بتزوّد العداد وترجّع الـ TTL) عن طريق الدالة دي. مع ioredis [[redis.call(command, ...args)]]، ومع node-redis [[client.sendCommand(args)]]. و [[prefix]] مختلف لكل limiter: كل limiter لازم يبقى ليه store instance لوحده (express-rate-limit بيرمي ValidationError لو نفس الـ store اتدّى لاتنين)، عشان كده دالة [[redisStore(prefix)]].

[[keyGenerator]]: لو رجّعت الـ IP بنفسك لازم يعدّي على [[ipKeyGenerator]]، اللي بيجمع عناوين IPv6 في subnet واحد (افتراضيًا /56) عشان حد عنده ملايين العناوين ميلفّش. ولو كتبت [[req.ip]] مباشرة، النسخة الحالية بترمي ValidationError بيقولك كده (جربناها). ولو الطلب فيه يوزر مسجّل، [[user:$__{req.user.id}]] أعدل من الـ IP.

[[limit]] كدالة بتاخد الطلب، فالباقة تحدد الحد. والـ middleware اللي بيقرا الـ API key ويحط [[req.apiKey]] لازم يبقى قبل الـ limiter.

الـ headers: [[standardHeaders: "draft-8"]] بيبعت [[RateLimit-Policy: "public"; q=60; w=60]] (الحصة والنافذة بالثواني) و [[RateLimit: "public"; r=59; t=60]] (الباقي والثواني لحد التصفير)، و [[identifier]] هو الاسم اللي بيظهر فيهم. ومع 429 بيبعت [[Retry-After]]. العميل الكويس يقرا دول ويبطّأ لوحده بدل ما يخبط.

[[passOnStoreError]]: لو Redis وقع، تسمح بالطلبات ولا ترفضها؟ للـ API العام [[true]] (متوقّفش الموقع عشان الـ limiter)، وللـ login ممكن [[false]] (ترفض أحسن من إنك تفتح باب التخمين). ده قرار لازم تاخده صريح.

وفيه algorithms تانية (token bucket و sliding window) وحصص شهرية لكل key، ودي في تاب «APIs متقدمة».`,
            when: "أول ما يبقى عندك أكتر من نسخة، أو API key لشركاء، أو endpoint بتدفع على كل طلب فيه.",
            mistakes: R`[[rate-limit-redis]] متسطّب والـ limiter من غير [[store]]، فهو لسه في الذاكرة (حصلت في مشروع حقيقي، درس [[express-rate-limit]]). ونفس الـ store لـ limiterين. و [[keyGenerator: (req) => req.ip]] من غير ipKeyGenerator. والـ limiter قبل الـ middleware اللي بيقرا الـ API key، فكله بيتعد بالـ IP. و Redis الـ rate limit بـ allkeys-lru تحت ضغط، فالعدادات بتتمسح والحد بيتلغي من غير ما حد يعرف.`
          },
          lines: [
            "express-rate-limit، ومعاه دالة تجميع IPv6.",
            "الـ store بتاع Redis.",
            "دالة بتعمل store جديد لكل limiter بـ prefix لوحده، وبتبعت الأوامر عن طريق ioredis.",
            "limiter للـ API العام.",
            "نافذة دقيقة.",
            "الحد حسب الباقة: pro ٦٠٠، والباقي ٦٠.",
            "العد بالـ API key لو موجود، وإلا بالـ IP بعد تجميع IPv6.",
            "headers الـ RateLimit بالشكل الموحد.",
            "من غير headers الـ X-RateLimit القديمة.",
            "اسم السياسة اللي بيظهر في الـ headers.",
            "العداد في Redis.",
            "لو Redis وقع: اسمح، متوقّفش الـ API.",
            "قفلة.",
            "limiter للـ login.",
            "ربع ساعة.",
            "١٠ محاولات.",
            "الناجحة متتحسبش.",
            "store لوحده بـ prefix تاني.",
            "لو Redis وقع هنا: ارفض.",
            "قفلة."
          ],
          sol: R`المتوقع بحد ٢ و ٥: الطلبين الأولين من غير key بـ 200 والتالت 429 ومعاه [[Retry-After: 60]]. وطلبات [[pro_1]] التلاتة 200 والـ header [[RateLimit]] بينزل [[r=4]] ثم [[r=3]] ثم [[r=2]]. والـ [[RateLimit-Policy]] فيه [[q=2]] للـ anonymous و [[q=5]] للـ pro.

وفي Redis هتلاقي مفتاحين: [[rl:public:ip:127.0.0.1]] و [[rl:public:key:pro_1]].

مع نسختين: الحد لسه ٢ للاتنين مع بعض، لأن العداد في Redis. لو كل نسخة سمحت بـ ٢ (يعني ٤ طلبات عدّت)، يبقى الـ store مش متركّب والعد لسه في الذاكرة.`,
          solCode: R`app.use((req, res, next) => {
  const k = req.get("x-api-key");
  req.apiKey = k ? { id: k, plan: k.startsWith("pro") ? "pro" : "free" } : null;
  next();
});
app.get("/v1/data", publicApiLimiter, (req, res) => res.json({ ok: true }));
// limit للتجربة: (req) => (req.apiKey?.plan === "pro" ? 5 : 2)
// anon  200  RateLimit: "public"; r=1; t=60
// anon  200  RateLimit: "public"; r=0; t=60
// anon  429  Retry-After: 60
// pro_1 200  RateLimit: "public"; r=4; t=60`
        },
        {
          cmd: "pub/sub",
          title: "رسالة لكل نسخ السيرفر مرة واحدة",
          desc: R`[[PUBLISH channel message]] بيبعت رسالة لكل اللي عامل [[SUBSCRIBE]] على الـ channel ده في اللحظة دي. مفيش حفظ: اللي مش متصل ساعتها مش هيشوفها أبدًا.

الاستخدام الأشهر: كل نسخ السيرفر بتسمع على channel، وأي نسخة تغيّر حاجة تبلّغ الباقي (امسحوا الكاش المحلي، أو ابعتوا الإشعار ده لليوزر لو متصل عندك).`,
          example: R`import { Redis } from "ioredis";

const pub = new Redis(config.REDIS_URL);
const sub = pub.duplicate();

await sub.subscribe("cache:invalidate");
sub.on("message", (channel, raw) => {
  const { key } = JSON.parse(raw);
  localCache.delete(key);
});

export async function invalidate(key) {
  await pub.del(key);
  await pub.publish("cache:invalidate", JSON.stringify({ key }));
}`,
          try: R`افتح ترمنالين. في الأول [[redis-cli SUBSCRIBE news]]، وفي التاني [[redis-cli PUBLISH news hello]]: الرقم اللي راجع هو عدد اللي استلموا. وبعدين اقفل الأول وابعت تاني: الرقم بقى كام؟ وافتح الأول تاني: وصلته الرسالة اللي فاتت؟`,
          flag: "script",
          deep: {
            why: R`لما التطبيق بقى ٣ نسخ، أي حاجة في ذاكرة process واحدة (كاش محلي، أو اتصالات WebSocket) مبقتش بتشوفها النسخ التانية. pub/sub أبسط طريقة تخلي النسخ تكلّم بعض من غير ما تعرف عناوين بعض.`,
            how: R`الاتصال اللي عمل [[subscribe]] بيدخل وضع المشترك وبيستنى رسايل، فخليه اتصال لوحده ([[duplicate()]] بيعمل client جديد بنفس الإعدادات) ومتستخدموش للأوامر العادية. و [[publish]] بيرجّع عدد المشتركين اللي استلموا، وده مفيد في الـ debugging (0 يعني محدش سامع).

fire-and-forget: Redis بيبعت للمتصلين دلوقتي بس ومبيحفظش. نسخة كانت بتعمل restart ساعة الرسالة مش هتعرف. فاستخدمه لحاجات لو ضاعت مش مشكلة كبيرة (كاش محلي عليه TTL قصير كمان، أو إشعار لحظي محفوظ في القاعدة أصلًا). لو لازم كل رسالة توصل وتتعالج، ده queue (BullMQ) أو Redis Streams، والفرق بين الـ queue و pub/sub و stream في تاب «APIs متقدمة».

socket.io على أكتر من سيرفر بيستخدم pub/sub ده من جوه: اليوزر متصل بنسخة ١ والإشعار اتعمل على نسخة ٢، فالـ Redis adapter بيعمل publish وكل النسخ تبعت للي متصل عندها. الإعداد في درس [[socket.io]] و «scaling path» في «تاب بناء مشروع كامل».

و [[PSUBSCRIBE user:*]] بيشترك بـ pattern. وفي Redis Cluster فيه [[SPUBLISH]] (sharded pub/sub) عشان الرسايل متتبعتش لكل node.`,
            when: "تبليغ كل النسخ بحدث لحظي: مسح كاش محلي، أو إعدادات اتغيرت، أو إشعار realtime. مش للشغل اللي لازم يتعمل (ده queue).",
            mistakes: R`تستخدم pub/sub كـ queue: الإيميل يتبعت لو فيه worker سامع ساعتها، وإلا يضيع من غير أي أثر. أو تعمل subscribe على نفس الـ client اللي بتستخدمه للكاش. أو تفتكر إن الرسالة بتروح لواحد بس: بتروح لكل المشتركين، فلو ٣ workers سامعين، الشغل هيتعمل ٣ مرات.`
          },
          lines: [
            "ioredis.",
            "client للنشر والأوامر العادية.",
            "client تاني للاشتراك بس، بنفس الإعدادات.",
            "اشترك في الـ channel.",
            "مع كل رسالة...",
            "...اقرا الـ key...",
            "...وامسحه من الكاش اللي في ذاكرة النسخة دي.",
            "قفلة.",
            "دالة المسح.",
            "امسح من Redis.",
            "وبلّغ كل النسخ تمسح نسختها المحلية.",
            "قفلة."
          ],
          sol: R`أول [[PUBLISH news hello]] بيرجّع [[(integer) 1]] والترمنال الأول بيطبع [[message]] و [[news]] و [[hello]]. بعد ما تقفل المشترك، نفس الأمر بيرجّع [[(integer) 0]]. ولما تفتح الأول تاني، الرسالة اللي اتبعتت وهو مقفول مش هتوصله أبدًا.

ده معنى fire-and-forget: pub/sub مش بيخزن. لو محتاج الرسالة تستنى لحد ما حد ياخدها، استخدم queue أو stream.`,
          solCode: R`# ترمنال ١
redis-cli SUBSCRIBE news
# ترمنال ٢
redis-cli PUBLISH news hello
# (integer) 1
# اقفل ترمنال ١ بـ Ctrl+C
redis-cli PUBLISH news again
# (integer) 0`
        }
      ]
    },
    {
      t: "ملفات كبيرة وشغل تقيل",
      l: 3,
      n: "ملفات أكبر من الرام بـ streams، وتصدير CSV و Excel، وفاتورة PDF عربي، وحسابات تقيلة من غير ما السيرفر يهنّج، و request id في كل لوج",
      items: [
        {
          cmd: "streams و pipeline",
          title: "ملف ٢ جيجا من غير ما الرام تتملى",
          desc: R`[[fs.readFile]] بيحط الملف كله في الذاكرة مرة واحدة. الـ stream بيقراه حتة حتة (64KB افتراضيًا): تعالج الحتة وترميها وتاخد اللي بعدها، فالذاكرة ثابتة مهما كان حجم الملف.

[[pipeline]] من [[node:stream/promises]] بيوصّل streams ورا بعض (اقرا ← حوّل ← اضغط ← اكتب)، وبيتعامل مع الـ backpressure والأخطاء، وبيقفل الكل لو واحد فشل. و [[readline]] مع [[for await]] بيدّيك الملف سطر سطر.`,
          example: R`import { createReadStream, createWriteStream } from "node:fs";
import { createInterface } from "node:readline";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

export async function importUsers(path) {
  const lines = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  let batch = [], total = 0, header = true;
  for await (const line of lines) {
    if (header) { header = false; continue; }
    const [, email] = line.split(",");
    batch.push({ email });
    if (batch.length === 1000) {
      total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
      batch = [];
    }
  }
  if (batch.length) total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
  return total;
}

await pipeline(createReadStream("export.csv"), createGzip(), createWriteStream("export.csv.gz"));`,
          try: R`اعمل ملف CSV فيه ٢ مليون سطر (سكربت بيكتب بـ [[write]] ويستنى [[drain]])، وبعدين احسب مجموع عمود بطريقتين: [[readFileSync(...).split("\n")]]، و readline. اطبع [[process.memoryUsage().rss]] في آخر كل واحدة. وبعدين اضغط الملف بـ pipeline وقارن الحجم.`,
          flag: "script",
          deep: {
            why: R`استيراد عملاء من Excel، وتصدير طلبات السنة، ورفع فيديو، ولوجات: كلها ملفات ممكن تبقى أكبر من الرام المتاحة للـ container. [[readFile]] على ملف ٥٠٠ ميجا في container حده ٥١٢ ميجا معناه crash. وحتى لو الرام كفاية، ٣ يوزرز بيرفعوا مع بعض كفاية يوقّعوا السيرفر.`,
            how: R`جربناها على CSV حجمه ٥٨ ميجا (٢ مليون سطر): [[readFileSync]] ثم [[split("\n")]] ثم [[split(",")]] وصل الـ RSS لـ ٥٧٩ ميجا (كل سطر بقى string و array). و readline عمل نفس الحساب بـ ٨٦ ميجا. ولو الملف ٢٠ ضعف، الأولى هتقع والتانية تقريبًا نفس الرقم.

الـ backpressure: لو القراية أسرع من الكتابة (ديسك سريع وشبكة بطيئة)، الحتت اللي اتقرت ومتكتبتش بتتكوّم في الذاكرة. [[writable.write()]] بيرجّع [[false]] لما البافر يتملى، والمفروض تستنى event الـ [[drain]] قبل ما تكتب تاني. [[pipeline]] بيعمل ده لوحده، ومعاه [[for await]] على stream بيقرا الحتة الجاية بس لما انت تخلص من اللي قبلها، فلو الداتابيز بطيئة القراية بتبطّأ معاها.

الاستيراد على دفعات: [[createMany]] كل ١٠٠٠ صف بدل insert لكل سطر (٢٠٠ ألف رحلة للقاعدة) أو [[createMany]] واحدة بالملف كله (كل الصفوف في الذاكرة تاني). و [[skipDuplicates]] بيتجاهل الإيميلات الموجودة بدل ما الدفعة كلها تفشل.

و [[pipeline]] بدل [[.pipe()]]: الـ pipe مبيمررش الأخطاء، فلو القراية فشلت الـ write stream بيفضل مفتوح والطلب معلّق. pipeline بيقفل الكل ويرمي الخطأ عشان [[await]] يمسكه. ونفس الفكرة مع HTTP: [[res]] في Express writable stream، فتقدر تعمل [[pipeline(createReadStream(file), res)]] (الدرس الجاي).

وملف CSV حقيقي فيه قيم بين [[""]] فيها فواصل وسطور جديدة: [[line.split(",")]] هنا للتوضيح بس. في الشغل استخدم parser بيدعم streams زي [[csv-parse]].`,
            when: "أي ملف ممكن يكبر: استيراد، وتصدير، ورفع، ولوجات. ولو الملف أكيد صغير (config أو JSON بـ كيلوبايتات)، readFile أبسط.",
            mistakes: R`[[multer.memoryStorage()]] للرفع الكبير، فكل ملف مرفوع في الرام (درس [[multer]]). و [[await]] لكل insert لوحده جوه الـ loop فالاستيراد ياخد ساعة. و [[.pipe()]] من غير error handling. وتقرا الـ upload كله في [[Buffer.concat]] عشان تحسب hash، والـ hash نفسه ينفع stream ([[crypto.createHash]] كـ Transform). وتعمل الاستيراد جوه الطلب نفسه فالـ request يعدّي timeout بتاع Nginx (٦٠ ثانية): الملفات الكبيرة بتروح job (درس [[background jobs]]) والـ API يرد 202.`
          },
          lines: [
            "القراية والكتابة كـ streams.",
            "readline: stream لسطور.",
            "ضغط gzip كـ stream.",
            "pipeline بـ promise.",
            "دالة الاستيراد.",
            "اقرا الملف سطر سطر، و crlfDelay عشان ملفات Windows.",
            "دفعة، والعدد، وأول سطر عناوين.",
            "كل سطر أول ما يتقري.",
            "اتخطى سطر العناوين.",
            "العمود التاني هو الإيميل (CSV بسيط، في الحقيقي استخدم parser).",
            "ضيفه للدفعة.",
            "الدفعة وصلت ١٠٠٠؟",
            "اكتبهم في أمر واحد، واتجاهل المكرر.",
            "ابدأ دفعة جديدة، والقديمة تتمسح من الذاكرة.",
            "قفلة.",
            "قفلة.",
            "آخر دفعة ناقصة.",
            "رجّع العدد.",
            "قفلة.",
            "اقرا ← اضغط ← اكتب، والـ backpressure والأخطاء على pipeline."
          ],
          sol: R`أرقام تقريبية من تجربة على ملف ٥٨ ميجا و ٢ مليون سطر: طريقة [[split]] وصلت لحوالي ٥٧٩ ميجا RSS، و readline لحوالي ٨٦ ميجا لنفس المجموع بالظبط ([[rows: 2000000]]). والنسخة المضغوطة حوالي ١١ ميجا.

الأرقام عندك هتختلف، بس الفرق لازم يبقى كبير، ولو كبّرت الملف الأولى هتكبر معاه والتانية لأ.

ولو سكربت الكتابة نفسه أكل رام كتير، يبقى بتعمل [[write]] من غير ما تستنى [[drain]]: الكتابة بتتكوّم في البافر، ودي الـ backpressure بعينها.`,
          solCode: R`// gen.mjs
import { createWriteStream } from "node:fs";
import { once } from "node:events";
const out = createWriteStream("big.csv");
out.write("id,email,amount\n");
for (let i = 1; i <= 2_000_000; i++) {
  if (!out.write($__bt$__{i},user$__{i}@x.com,$__{(i % 900) + 100}\n$__bt)) await once(out, "drain");
}
out.end();
await once(out, "finish");

// sum.mjs
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
const rl = createInterface({ input: createReadStream("big.csv"), crlfDelay: Infinity });
let total = 0, rows = 0, header = true;
for await (const line of rl) {
  if (header) { header = false; continue; }
  total += Number(line.split(",")[2]); rows++;
}
console.log({ rows, total, rssMB: Math.round(process.memoryUsage().rss / 1e6) });`
        },
        {
          cmd: "تصدير CSV و Excel",
          title: "زرار «تصدير»: CSV و Excel بيتكتبوا وهما بيتبعتوا",
          desc: R`التصدير بيقرا من القاعدة على دفعات (cursor)، ويحوّل كل صف لسطر، ويكتبه في الرد على طول. [[res.attachment("orders.csv")]] بيحط [[Content-Disposition: attachment]] فالمتصفح ينزّله كملف بدل ما يعرضه.

و Excel بـ [[exceljs]] في وضع الـ streaming: [[WorkbookWriter]] بيكتب في [[res]] مباشرة، وكل صف بيتعمله [[commit]] ويتشال من الذاكرة.`,
          example: R`import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import ExcelJS from "exceljs";

async function* ordersInBatches(size = 1000) {
  let cursor;
  while (true) {
    const batch = await db.order.findMany({ take: size, ...(cursor && { skip: 1, cursor: { id: cursor } }), orderBy: { id: "asc" }, include: { user: { select: { email: true } } } });
    if (batch.length === 0) return;
    yield* batch;
    cursor = batch.at(-1).id;
  }
}
const cell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? $__bt"$__{s.replaceAll('"', '""')}"$__bt : s;
};
async function* toCsv(rows) {
  yield "﻿id,email,amount_egp,status\n";
  for await (const o of rows) yield [o.id, o.user.email, (o.amountCents / 100).toFixed(2), o.status].map(cell).join(",") + "\n";
}

router.get("/orders.csv", requireRole("ADMIN"), async (req, res) => {
  res.attachment("طلبات-سبتمبر.csv");
  await pipeline(Readable.from(toCsv(ordersInBatches())), res);
});

router.get("/orders.xlsx", requireRole("ADMIN"), async (req, res) => {
  res.attachment("orders.xlsx");
  const wb = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true });
  const ws = wb.addWorksheet("الطلبات", { views: [{ rightToLeft: true, state: "frozen", ySplit: 1 }] });
  ws.columns = [{ header: "رقم الطلب", key: "id", width: 28 }, { header: "الإيميل", key: "email", width: 30 }, { header: "المبلغ", key: "amount", width: 12, style: { numFmt: "#,##0.00" } }];
  for await (const o of ordersInBatches()) ws.addRow({ id: o.id, email: o.user.email, amount: o.amountCents / 100 }).commit();
  await wb.commit();
});`,
          try: R`اعمل ٢٥٠٠ طلب بـ [[createMany]] (واحد منهم ليوزر إيميله [[=HYPERLINK("http://evil.com","click")]])، ونزّل الـ CSV من المتصفح وافتحه في Excel. العربي باين صح؟ والإيميل الغريب اتعرض كنص ولا كلينك؟ وبعدين نزّل الـ xlsx: الشيت من اليمين للشمال والصف الأول ثابت؟`,
          flag: "script",
          deep: {
            why: R`«عايز أنزّل الطلبات Excel» من أول ٣ طلبات في أي لوحة أدمن أو نظام محاسبة. والطريقة الساذجة ([[findMany()]] من غير حد ثم [[join]] ثم [[res.send]]) شغالة على ١٠٠ صف، وبتوقّع السيرفر على ٥٠٠ ألف: كل الصفوف في الذاكرة، وبعدين النص كله، والطلب بيعدّي الـ timeout قبل ما أول بايت يوصل.`,
            how: R`[[ordersInBatches]] async generator: بيجيب ١٠٠٠ ويسلّمهم واحد واحد، وبعدين يجيب الـ ١٠٠٠ اللي بعدهم من آخر id (cursor pagination، أسرع من [[skip]] الكبير). و [[Readable.from(generator)]] بيحوّل الـ generator لـ stream، و pipeline بيوصّله بـ [[res]] بالـ backpressure: لو الشبكة بطيئة، الـ generator ميجيبش الدفعة الجاية لحد ما الرد يلحق.

[[﻿]] في الأول (BOM): من غيره Excel على Windows بيفتح الـ UTF-8 كأنه ترميز قديم والعربي يطلع رموز. و [[res.attachment(name)]] بيحط [[Content-Type]] من الامتداد، و [[Content-Disposition]] فيه [[filename]] للمتصفحات القديمة و [[filename*=UTF-8''...]] للاسم العربي (جربناها).

دالة [[cell]] فيها حاجتين. الـ escaping: أي قيمة فيها فاصلة أو [[""]] أو سطر جديد بتتحط بين [[""]] والـ [[""]] اللي جواها بتتضاعف. و CSV injection: قيمة بتبدأ بـ [[=]] أو [[+]] أو [[-]] أو [[@]] Excel بيعتبرها formula ويشغّلها، فيوزر يسمّي نفسه [[=HYPERLINK(...)]] والأدمن يدوس. الحل تحط [[']] قبلها فتبقى نص.

exceljs: [[WorkbookWriter({ stream: res })]] بيكتب الملف وهو بيتبني. و [[row.commit()]] بيكتب الصف ويشيله من الذاكرة، و [[wb.commit()]] في الآخر بيقفل الملف والـ stream. و [[rightToLeft: true]] للشيت العربي، و [[ySplit: 1]] يثبّت صف العناوين، و [[numFmt]] بيخلي المبلغ رقم حقيقي يتجمع في Excel مش نص.

تصدير بمئات الآلاف من الصفوف أو تقرير بحسابات تقيلة: متخليش الطلب يستنى. اعمل job (درس [[background jobs]])، يكتب الملف في S3، ويبعت لينك (signed URL) بالإيميل أو إشعار.`,
            when: "أي تصدير من لوحة أدمن. CSV لو هيتفتح في أي برنامج أو هيتعمله import في نظام تاني. xlsx لو اليوزر هيشتغل عليه في Excel ومحتاج أرقام وتنسيق وعربي من اليمين.",
            mistakes: R`[[findMany()]] من غير حد ثم [[res.send(csv)]]. و CSV من غير BOM فالعربي بايظ في Excel. و [[join(",")]] من غير escaping فأول عنوان فيه فاصلة يكسر الأعمدة. و CSV injection. والتصدير من غير صلاحيات، أو بيصدّر كل الأعمدة بما فيها hash الباسورد. و [[new ExcelJS.Workbook()]] العادي لملف كبير: بيبني كل حاجة في الذاكرة الأول.`
          },
          lines: [
            "يحوّل generator لـ stream.",
            "pipeline.",
            "exceljs.",
            "generator بيجيب الطلبات دفعة دفعة.",
            "آخر id اتقري.",
            "لحد ما الداتا تخلص.",
            "١٠٠٠ صف بعد آخر id، مترتبين، ومعاهم إيميل اليوزر بس.",
            "مفيش تاني؟ خلصنا.",
            "سلّم الصفوف واحد واحد.",
            "افتكر آخر id للدفعة الجاية.",
            "قفلة.",
            "قفلة.",
            "تجهيز خانة CSV.",
            "حوّل لنص.",
            "لو بتبدأ برمز formula، حط ' قبلها عشان Excel يعرضها كنص.",
            "لو فيها فاصلة أو علامة تنصيص أو سطر جديد، حطها بين علامتين وضاعف اللي جواها.",
            "قفلة.",
            "generator بيطلّع سطور CSV.",
            "BOM عشان Excel يفهم UTF-8، وبعده العناوين.",
            "كل طلب سطر، والمبلغ بالجنيه.",
            "قفلة.",
            "endpoint الـ CSV للأدمن بس.",
            "نزّله كملف باسم عربي، و Content-Type بيتحط من الامتداد.",
            "الصفوف ← CSV ← الرد، مع الـ backpressure.",
            "قفلة.",
            "endpoint الـ Excel.",
            "نزّله كملف xlsx.",
            "workbook بيكتب في الرد وهو بيتبني.",
            "شيت عربي من اليمين، والصف الأول ثابت.",
            "الأعمدة، والمبلغ رقم بتنسيق.",
            "كل صف يتكتب ويتشال من الذاكرة.",
            "اقفل الملف والرد.",
            "قفلة."
          ],
          sol: R`المتوقع في الـ CSV: العربي مقروء في Excel (بفضل الـ BOM)، و ٢٥٠٠ سطر بعد العناوين، والإيميل الغريب ظاهر كنص بيبدأ بـ [[']] ومش لينك. واسم الملف العربي ظاهر صح في التنزيلات.

في الـ xlsx: اسم الشيت «الطلبات»، والاتجاه من اليمين للشمال، والصف الأول ثابت وانت بتنزل، وعمود المبلغ أرقام (جرّب [[SUM]] عليه).

لو العربي طلع رموز، الـ BOM ناقص. ولو الإيميل اتعرض كلينك أو Excel حذّرك من «external content»، دالة [[cell]] مش متطبّقة على العمود ده. ولو الملف طلع بايظ ومش بيفتح، غالبًا حصل خطأ في النص بعد ما الـ headers اتبعتت: شوف اللوج، وخلي الأخطاء في النص تقفل الاتصال بدل ما تكتب JSON جوه الملف.`,
          solCode: R`const u = await db.user.create({ data: { email: '=HYPERLINK("http://evil.com","click")' } });
await db.order.createMany({ data: Array.from({ length: 2500 }, (_, i) => ({ userId: u.id, amountCents: 1000 + i })) });
// curl -s -D - -o orders.csv http://localhost:3000/api/admin/orders.csv -H "Authorization: Bearer $TOKEN"
// Content-Disposition: attachment; filename="?????-??????.csv"; filename*=UTF-8''%D8%B7%D9%84...
// head -2 orders.csv
// id,email,amount_egp,status
// cm...,"'=HYPERLINK(""http://evil.com"",""click"")",10.00,PENDING`
        },
        {
          cmd: "فاتورة PDF",
          title: "فاتورة PDF عربي من HTML بـ Playwright",
          desc: R`أسهل طريقة لـ PDF شكله حلو: تكتبه HTML و CSS (اللي انت عارفهم)، وتخلي Chromium يطبعه. Playwright بيفتح متصفح headless، و [[page.setContent(html)]] ثم [[page.pdf()]] بيرجّع Buffer.

للعربي: [[dir="rtl"]] و [[lang="ar"]] في الـ HTML، وخط عربي محطوط جوه الصفحة بـ [[@font-face]] (مش معتمد على خطوط السيرفر)، و [[document.fonts.ready]] قبل الطباعة.`,
          example: R`import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const font = readFileSync("assets/fonts/NotoNaskhArabic-Regular.ttf").toString("base64");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const money = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });

const invoiceHtml = (o) => $__bt<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face { font-family: "Naskh"; src: url(data:font/ttf;base64,$__{font}) format("truetype"); }
body { font-family: "Naskh", sans-serif; } td, th { border: 1px solid #ccc; padding: 6px; text-align: start; }
</style></head><body><h1>فاتورة رقم $__{esc(o.number)}</h1><p>العميل: $__{esc(o.customer)}</p>
<table>$__{o.items.map((it) => $__bt<tr><td>$__{esc(it.name)}</td><td>$__{it.qty}</td><td>$__{money.format(it.price)}</td></tr>$__bt).join("")}</table>
<p>الإجمالي: $__{money.format(o.total)}</p></body></html>$__bt;

const browser = await chromium.launch();
export async function renderInvoice(order) {
  const page = await browser.newPage();
  try {
    await page.setContent(invoiceHtml(order), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({ format: "A4", printBackground: true, margin: { top: "15mm", bottom: "15mm", left: "12mm", right: "12mm" } });
  } finally { await page.close(); }
}

router.get("/orders/:id/invoice.pdf", requireAuth, async (req, res) => {
  const order = await ordersService.getForInvoice(req.user.id, req.params.id);
  res.type("pdf").attachment($__btinvoice-$__{order.number}.pdf$__bt).send(await renderInvoice(order));
});`,
          try: R`[[npm i playwright]] و [[npx playwright install chromium]]، ونزّل خط Noto Naskh Arabic أو Cairo حطه في [[assets/fonts]]. اعمل فاتورة فيها اسم عميل [[منى <script>]] وصنف إنجليزي وصنف عربي، واحفظ الـ PDF وافتحه. وبعدين شيل الـ [[@font-face]] وشوف الفرق على السيرفر (أو في Docker) مش على جهازك.`,
          flag: "script",
          deep: {
            why: R`الفواتير والإيصالات والشهادات لازم تبقى PDF: بتتطبع وبتتبعت وبتتحفظ. ومكتبات الـ PDF اللي بترسم بالإحداثيات (زي pdfkit) صعبة جدًا مع العربي: الحروف لازم تتوصل وتتقلب، والجدول من اليمين. Chromium بيعمل كل ده صح لأنه نفس المحرك اللي بيعرض المواقع العربي، وانت بتصمم بـ HTML و CSS.`,
            how: R`[[chromium.launch()]] تقيل (ثانية وأكتر ومئات الميجا)، فبتفتحه مرة وانت بتقوم وتعمل صفحة جديدة لكل فاتورة، و [[page.close()]] في [[finally]] عشان الصفحات متتراكمش. جربناها: الفاتورة كلها (صفحة جديدة و setContent و pdf) حوالي ٣٥٠ms بعد ما المتصفح مفتوح.

الخط: السيرفر (خصوصًا Docker slim أو alpine) غالبًا معندوش خط عربي، فالحروف تطلع مربعات أو بخط fallback وحش. [[@font-face]] بـ data URL من ملف جوه المشروع بيضمن نفس الشكل في كل مكان، والـ PDF بيتضمّن فيه الخط (جربنا: الخط ظهر embedded جوه الملف). و [[document.fonts.ready]] بيستنى الخط يتحمّل قبل الطباعة.

الـ RTL: [[dir="rtl"]] على [[html]] بيقلب الجدول والنصوص، و [[text-align: start]] بدل [[right]] عشان يمشي مع الاتجاه. والأرقام: [[ar-EG]] في [[Intl.NumberFormat]] بيطلّع أرقام عربية شرقية ([[١٥٠٫٠٠ ج.م.]])، ولو عايز 150.00 استخدم [[ar-EG-u-nu-latn]].

الأمان: أي قيمة من اليوزر (الاسم والعنوان والملاحظات) بتدخل الـ HTML لازم تتهرّب ([[esc]])، وإلا حد يحط [[<img src=http://internal-service/...>]] والمتصفح اللي على السيرفر بتاعك يحمّله (SSRF). ولو هتعرض صور، حطها data URL أو من دومينك بس. و [[setContent]] مش [[goto]] على URL جاي من اليوزر.

الحجم: Playwright محتاج Chromium ومكتباته. في Docker استخدم الصورة الرسمية [[mcr.microsoft.com/playwright]] أو [[npx playwright install --with-deps chromium]] في الـ Dockerfile. والفواتير الكتير (آخر الشهر لكل العملاء) تتعمل في worker من queue مش في الـ API، وتتحفظ في S3، والـ endpoint يرجّع اللينك.`,
            when: "أي PDF فيه تصميم أو عربي: فواتير وإيصالات وشهادات وتقارير. لـ PDF بسيط جدًا إنجليزي بس (label شحن)، pdfkit أخف. ولو عندك Next.js، ممكن تعمل الفاتورة صفحة عادية وتطبعها بنفس الطريقة.",
            mistakes: R`[[chromium.launch()]] جوه الـ route لكل طلب: بطء، وتحت الضغط الرام بتخلص. ونسيان [[page.close()]] فالصفحات تتراكم لحد ما المتصفح يقع. والخط من Google Fonts بلينك: السيرفر ممكن ميكونش عنده نت برّه، والطباعة تحصل قبل ما يتحمّل. وقيم اليوزر من غير escape. والعربي شكله صح على جهازك (عندك خطوط) وبايظ على السيرفر، فاختبر في Docker.`
          },
          lines: [
            "Playwright.",
            "قراية ملف الخط.",
            "الخط العربي كـ base64 عشان يتحط جوه الصفحة.",
            "escape لأي قيمة من اليوزر قبل ما تدخل الـ HTML.",
            "تنسيق الفلوس بالعربي والجنيه.",
            "دالة بتبني HTML الفاتورة: عربي ومن اليمين.",
            "الخط العربي من data URL، مش من النت ولا من السيرفر.",
            "الخط على الصفحة، والجدول بيمشي مع الاتجاه.",
            "العنوان واسم العميل بعد الـ escape.",
            "صف لكل صنف.",
            "الإجمالي.",
            "متصفح واحد للتطبيق كله.",
            "دالة الفاتورة.",
            "صفحة جديدة لكل فاتورة.",
            "جرّب...",
            "حط الـ HTML واستنى يتحمّل.",
            "استنى الخطوط.",
            "اطبع A4 بالخلفيات والهوامش، ورجّع Buffer.",
            "وفي كل الأحوال اقفل الصفحة.",
            "قفلة.",
            "endpoint الفاتورة.",
            "هات الطلب بتاع اليوزر ده بس (ownership).",
            "نوع PDF واسم ملف، وابعت الـ Buffer.",
            "قفلة."
          ],
          sol: R`المتوقع: PDF صفحة واحدة، العنوان والجدول من اليمين للشمال، والحروف العربي متوصلة صح، واسم العميل ظاهر كنص [[منى <script>]] (مش اتشال ولا اتنفّذ)، والصنف الإنجليزي ظاهر عادي جوه الجدول، والمبالغ بأرقام عربية.

ولو فتحت خصائص الـ PDF (Document Properties ← Fonts) هتلاقي Noto Naskh Arabic (أو الخط اللي اخترته) embedded.

من غير الـ [[@font-face]]: على جهازك غالبًا هيبان كويس لأن عندك خطوط عربي. في Docker أو سيرفر من غير خطوط هيطلع مربعات أو خط fallback. ده بالظبط سبب إنك تحط الخط جوه الصفحة.

الكود ده سكربت صغير يحفظ الملف للتجربة.`,
          solCode: R`import { writeFileSync } from "node:fs";
import { renderInvoice } from "./invoice.js";

const pdf = await renderInvoice({
  number: "INV-1042",
  customer: "منى <script>",
  items: [{ name: "مج سيراميك", qty: 2, price: 150 }, { name: "Mouse pad", qty: 1, price: 90.5 }],
  total: 390.5,
});
writeFileSync("invoice.pdf", pdf);
console.log("pdf bytes", pdf.length);
process.exit(0);`
        },
        {
          cmd: "worker_threads و cluster",
          title: "حساب تقيل: worker_threads ولا cluster ولا نسخ ورا load balancer؟",
          desc: R`Node بيشغّل الـ JavaScript بتاعك على thread واحد. لو route عمل حساب ٥٠٠ms (hash تقيل، أو معالجة صورة بـ JS، أو تقرير بحسابات)، كل الطلبات التانية بتستنى.

الحلول ٣ ولكل واحد مكان: [[worker_threads]] ينقل الحساب لـ thread تاني فالـ event loop يفضل فاضي. و [[cluster]] (أو PM2 cluster) يشغّل نسخ من السيرفر كله على نفس الجهاز، واحدة لكل core. ونسخ كتير (containers) ورا load balancer هو الـ scaling الحقيقي.`,
          example: R`import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }

if (!isMainThread) {
  parentPort.postMessage(fib(workerData.n));
} else {
  const runInWorker = (n) => new Promise((resolve, reject) => {
    const w = new Worker(new URL(import.meta.url), { workerData: { n } });
    w.once("message", resolve);
    w.once("error", reject);
  });
  app.get("/blocking", (req, res) => res.json({ v: fib(38) }));
  app.get("/offloaded", async (req, res) => res.json({ v: await runInWorker(38) }));
  app.get("/ping", (req, res) => res.json({ ok: true }));
}`,
          try: R`شغّل السيرفر ده، ومن سكربت تاني (process تاني!) ابعت [[/blocking]] وبعده بـ ٥٠ms [[/ping]] واطبع [[/ping]] أخد قد إيه. كرر مع [[/offloaded]]. وبعدين فكّر: لو ١٠٠ طلب [[/offloaded]] جم مع بعض، هيحصل إيه؟`,
          flag: "script",
          deep: {
            why: R`الـ event loop هو اللي بيخلي Node يخدم آلاف الاتصالات بـ thread واحد، طول ما كل حاجة I/O (قاعدة وشبكة وملفات). أول ما كود JS ياخد وقت CPU، السيرفر كله بيقف: الـ health check يفشل، والـ load balancer يفتكره واقع، والطلبات السريعة تبقى بطيئة. وفي الانترفيو «Node single-threaded، إزاي بتعمل حاجة تقيلة؟» سؤال شبه أكيد.`,
            how: R`جربناها بسيرفر و client في process منفصل: وهو بيحسب [[fib(38)]] في الـ route نفسه، [[/ping]] أخد ٤٢١ms (استنى الحساب يخلص). ومع worker، [[/ping]] أخد ٢ms. الحساب نفسه مبقاش أسرع (أبطأ شوية كمان، بسبب تشغيل الـ worker)، بس السيرفر فضل بيرد. (لو جربت الـ client والسيرفر في نفس الـ process، الـ client نفسه هيتعطّل والأرقام تضحك عليك.)

[[worker_threads]]: thread حقيقي بـ V8 لوحده وذاكرة لوحده، وبيتكلموا بـ [[postMessage]] (الداتا بتتنسخ، أو [[SharedArrayBuffer]] / transfer للـ buffers الكبيرة). تشغيل worker ليه تكلفة (عشرات الـ ms وذاكرة)، فلو الشغل متكرر اعمل pool ثابت بعدد الـ cores (مكتبة زي [[piscina]]) بدل worker جديد لكل طلب. ولو ١٠٠ طلب جم مع بعض من غير pool، هتعمل ١٠٠ thread وتخلّص الرام.

[[cluster]]: الـ process الرئيسية بتعمل fork لنسخ من السيرفر كله، وكلهم بيسمعوا على نفس البورت. كده بتستخدم كل الـ cores للطلبات العادية. PM2 بـ [[-i max]] بيعمل نفس الحاجة. بس كل نسخة ذاكرة منفصلة: الـ sessions في الذاكرة، والكاش المحلي، والـ rate limit، والـ cron، كلها بتتكرر أو بتبوظ. عشان كده الشرط الأول إن التطبيق stateless (Redis للـ state).

في Docker و Kubernetes: container فيه process واحدة، وتكبّر بعدد الـ containers ورا load balancer، مش cluster جوه container. ده بيدّيك نفس الفايدة ومعاها إنك تكبّر على أكتر من جهاز وتعمل restart لنسخة من غير الباقي (درس «scaling path» في «تاب بناء مشروع كامل»).

وأوقات الحل مش ولا واحد فيهم: الشغل التقيل اللي مش لازم يرجع في نفس الطلب (فيديو، تقارير، ألف صورة) مكانه queue و worker process لوحدها (درس [[background jobs]]). وفيه حاجات شكلها تقيلة وهي أصلًا بتتعمل برّه الـ event loop: [[bcrypt]] و [[sharp]] و [[crypto.pbkdf2]] بيشتغلوا في thread pool بتاع libuv لو استخدمت النسخة الـ async.`,
            when: "worker_threads: حساب CPU لازم يرجع في نفس الطلب ومفيش مكتبة native بتعمله. cluster أو PM2: سيرفر VPS واحد عليه أكتر من core ومن غير Docker. نسخ ورا load balancer: الإنتاج الطبيعي. queue: أي حاجة تقيلة مش لازم الرد يستناها.",
            mistakes: R`worker جديد لكل طلب من غير حد. واستخدام النسخ الـ Sync ([[bcrypt.hashSync]] و [[crypto.pbkdf2Sync]] و [[fs.readFileSync]]) جوه routes. و cluster والتطبيق فيه state في الذاكرة. و [[JSON.parse]] لـ body ضخم (١٠٠ ميجا) بيوقّف الـ loop برضه، فحط [[limit]] على [[express.json]]. وفي الانترفيو: «worker_threads زي cluster؟» لأ: threads جوه نفس الـ process للحساب، و cluster نسخ من السيرفر كله للطلبات.`
          },
          lines: [
            "worker_threads.",
            "حساب تقيل عمدًا (fibonacci بالـ recursion).",
            "لو الكود ده شغال جوه worker...",
            "...احسب وابعت النتيجة للـ thread الرئيسي.",
            "وإلا احنا في السيرفر نفسه.",
            "دالة بتشغّل نفس الملف كـ worker بالرقم وترجّع promise.",
            "worker جديد من نفس الملف، والرقم في workerData.",
            "أول رسالة هي النتيجة.",
            "ولو الـ worker وقع، الـ promise تترفض.",
            "قفلة.",
            "route بيحسب في الـ event loop نفسه: السيرفر كله بيقف.",
            "route بيحسب في worker: السيرفر فاضي يرد على غيره.",
            "route خفيف نقيس بيه.",
            "قفلة."
          ],
          sol: R`أرقام من تجربة (fib(38) حوالي نص ثانية): مع [[/blocking]]، [[/ping]] أخد حوالي ٤٢٠ms لأنه استنى الحساب. مع [[/offloaded]]، [[/ping]] أخد حوالي ٢ms، والطلب التقيل نفسه أخد وقت أطول شوية (تشغيل الـ worker).

لو [[/ping]] طلع سريع في الحالتين، غالبًا بتقيس من نفس الـ process اللي فيها السيرفر، أو بعت الـ ping قبل ما الطلب التقيل يوصل.

والـ ١٠٠ طلب: ١٠٠ worker مع بعض، كل واحد thread و V8 وذاكرة، على جهاز فيه ٤ cores. الرام تطير والكل يبطأ. الحل pool بعدد الـ cores (piscina)، والطلبات الزيادة تستنى في طابور، أو تتحول لـ queue.`,
          solCode: R`// client.mjs (process منفصل عن السيرفر)
const url = "http://localhost:3000";
for (const path of ["/blocking", "/offloaded"]) {
  const heavy = fetch(url + path);
  await new Promise((r) => setTimeout(r, 50));
  const t = performance.now();
  await fetch(url + "/ping");
  console.log(path, "ping took", Math.round(performance.now() - t), "ms");
  await heavy;
}
// /blocking ping took 421 ms
// /offloaded ping took 2 ms`
        },
        {
          cmd: "AsyncLocalStorage",
          title: "request id في كل سطر لوج من غير ما تعدّيه لكل دالة",
          desc: R`[[AsyncLocalStorage]] بيخليك تحط object في أول الطلب ([[als.run(store, next)]])، وأي كود بيتنفّذ بعد كده في نفس الطلب (حتى بعد await ودوال تانية وملفات تانية) يقدر يقراه بـ [[als.getStore()]]، وكل طلب شايف الـ object بتاعه بس حتى لو ١٠٠ طلب شغالين مع بعض.

الاستخدام الأشهر: logger بيحط الـ request id و id اليوزر في كل سطر لوحده، فتجمع قصة طلب واحد من وسط آلاف السطور.`,
          example: R`import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export const requestContext = new AsyncLocalStorage();

app.use((req, res, next) => {
  const reqId = req.get("x-request-id") ?? randomUUID();
  res.setHeader("x-request-id", reqId);
  requestContext.run({ reqId }, next);
});
app.use(requireAuthOptional, (req, res, next) => {
  const ctx = requestContext.getStore();
  if (ctx) ctx.userId = req.user?.id ?? null;
  next();
});

export const logger = pino({
  mixin: () => {
    const ctx = requestContext.getStore();
    return ctx ? { reqId: ctx.reqId, userId: ctx.userId } : {};
  },
});

// payments.service.js: مفيش req هنا خالص
export async function chargeCard(amount) {
  logger.info({ amount }, "charging card");
}`,
          try: R`اعمل الـ middleware والـ logger، وابعت طلبين مع بعض ([[Promise.all]]) بـ [[x-request-id]] مختلف لكل واحد، والـ service بيعمل [[await]] بوقت عشوائي قبل اللوج. اتأكد إن كل سطر معاه الـ id الصح رغم إن السطور متلخبطة في الترتيب. وبعدين اكتب لوج برّه أي طلب (في [[setInterval]] مثلًا): إيه اللي بيطلع في reqId؟`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوجات بتاعة ٥٠ طلب بتتكتب متداخلة. من غير id مشترك، مفيش طريقة تعرف «الخطأ ده في الدفع حصل في أنهي طلب ولأنهي يوزر». والحل القديم إنك تعدّي [[req]] أو [[logger]] لكل دالة لحد آخر service، وده بيوسّخ كل الـ signatures ودايمًا حد بينسى.`,
            how: R`[[als.run(store, fn)]] بيشغّل [[fn]] ويربط الـ store بكل الشغل الـ async اللي بيبدأ جواها: promises و timers و callbacks. Node بيتابع «مين بدأ مين» ويعدّي الـ store معاها. فـ [[next]] وكل الـ middleware والـ route والـ services اللي بعده شايفين نفس الـ object. جربناها: طلبين A و B مع بعض، السطور طلعت بالترتيب ده: A و B و B و B و A و A، وكل سطر معاه الـ reqId والـ userId الصح. واللوج اللي برّه أي طلب طلع من غير reqId.

الـ store object عادي، فتقدر تضيف عليه بعد كده (زي [[ctx.userId]] بعد الـ auth). و [[mixin]] في pino بيتنادى مع كل سطر لوج ويدمج اللي بيرجّعه، فكل [[logger.info]] في أي ملف بيطلع ومعاه الـ context.

[[x-request-id]]: لو Nginx أو الـ load balancer بيحط id، استخدمه عشان سطر Nginx وسطر التطبيق يتربطوا. ورجّعه في الرد عشان اليوزر أو الواجهة يبعته في شكوى، وانت تدوّر بيه. و pino-http بيعمل [[req.log]] بالـ id (درس [[pino]])، بس [[req.log]] محتاج [[req]]، والـ ALS بيوصّل الـ id لأماكن ملهاش [[req]].

فيه أماكن الـ context ممكن يضيع فيها: مكتبات قديمة بتستخدم callbacks بتاعتها أو connection pools بتنفّذ الـ callback في context اتصال قديم. لو لقيت reqId فاضي في مكان المفروض يبقى فيه، ده السبب غالبًا. والـ jobs في BullMQ مبتورثش الـ context: ابعت الـ reqId في داتا الـ job وافتح [[run]] جديد في الـ worker.

ونفس الفكرة بيستخدمها Sentry و OpenTelemetry من جوه عشان يربطوا الأخطاء والـ traces بالطلب.`,
            when: "أي API هيتشغّل في الإنتاج وفيه أكتر من طبقة (routes و services). وكمان لحاجات زي tenant id في تطبيق multi-tenant، أو transaction تتشارك بين services.",
            mistakes: R`تحط الـ context في متغير global عادي ([[let currentUser]]): مع طلبين مع بعض، الأول بيشوف يوزر التاني، ودي ثغرة مش bug بس. و [[als.enterWith()]] بدل [[run]] من غير ما تفهمه: بيغيّر الـ context لباقي الـ sync code اللي بعده وممكن يسرّب لطلبات تانية. وتخزن حاجات تقيلة (الـ body كله) في الـ store. وفي الانترفيو: «إزاي تعمل request id لكل لوج في Node؟» الإجابة: AsyncLocalStorage، ومش global ولا تعدية req لكل دالة.`
          },
          lines: [
            "AsyncLocalStorage من Node.",
            "مولّد id.",
            "store واحد للتطبيق كله.",
            "أول middleware.",
            "خد الـ id من Nginx لو موجود، وإلا اعمل واحد.",
            "رجّعه في الرد عشان يتربط بالشكاوى.",
            "شغّل باقي الطلب كله جوه context فيه الـ id.",
            "قفلة.",
            "بعد الـ auth...",
            "...هات الـ context بتاع الطلب ده...",
            "...وضيف عليه id اليوزر.",
            "كمّل.",
            "قفلة.",
            "الـ logger.",
            "مع كل سطر لوج...",
            "...هات الـ context...",
            "...وحط الـ reqId والـ userId لو فيه طلب.",
            "قفلة.",
            "قفلة.",
            "service مالهاش أي علاقة بـ Express.",
            "لوج عادي، والـ reqId والـ userId بيتحطوا لوحدهم.",
            "قفلة."
          ],
          sol: R`المتوقع: السطور تطلع متداخلة، زي كده: A start، B start، B charging، B done، A charging، A done. وكل سطر معاه الـ reqId والـ userId الصح بتوعه، رغم إن الاتنين شغالين في نفس الوقت.

اللوج اللي برّه أي طلب بيطلع من غير reqId، لأن [[getStore()]] بترجع [[undefined]] برّه [[run]]. عشان كده الـ mixin فيه [[ctx ?]].

لو لقيت A بياخد id بتاع B، يبقى فيه متغير عادي مشترك بدل الـ ALS، أو فيه [[enterWith]] في مكان. ولو الـ reqId فاضي جوه الـ service، يبقى الـ middleware بتاع [[run]] مش أول واحد، أو فيه مكتبة بتقطع الـ context.`,
          solCode: R`import { AsyncLocalStorage } from "node:async_hooks";
import express from "express";
import request from "supertest";

const als = new AsyncLocalStorage();
const log = (msg) => console.log(JSON.stringify({ reqId: als.getStore()?.reqId, userId: als.getStore()?.userId, msg }));
const chargeCard = async () => { await new Promise((r) => setTimeout(r, Math.random() * 30)); log("charging"); };

const app = express();
app.use((req, res, next) => als.run({ reqId: req.get("x-request-id") }, next));
app.use((req, res, next) => { als.getStore().userId = req.get("x-user"); next(); });
app.post("/pay", async (req, res) => { log("start"); await chargeCard(); log("done"); res.json({ ok: true }); });

await Promise.all([
  request(app).post("/pay").set("x-request-id", "A").set("x-user", "u1"),
  request(app).post("/pay").set("x-request-id", "B").set("x-user", "u2"),
]);
log("outside any request"); // {"msg":"outside any request"}`
        }
      ]
    },
    {
      t: "NestJS",
      l: 3,
      n: "الـ framework اللي في إعلانات شغل كتير: نفس Express من تحت، بس بـ modules و DI و decorators، و validation و guards واختبارات جاهزة",
      items: [
        {
          cmd: "Nest: modules و DI",
          title: "module و controller و provider: مين بيعمل إيه",
          desc: R`NestJS مبني على Express (افتراضيًا)، بس بيفرض هيكل: كل feature ليها module، جواه controller (الـ routes) و provider/service (المنطق). والـ service مبتعملش [[new]] لحاجة: بتطلب اللي محتاجاه في الـ constructor، و Nest بيعمله ويدّيهولها (dependency injection).

ده نفس «routes / controllers / services» اللي عملناه بإيدنا في Express، بس الـ framework هو اللي بيوصّل القطع ببعض. والكود TypeScript بـ decorators (درس الأنواع في تاب «TypeScript»).`,
          example: R`// orders/orders.service.ts
@Injectable()
export class OrdersService {
  constructor(private readonly db: PrismaService) {}
  async findMine(userId: string, id: string) {
    const order = await this.db.order.findFirst({ where: { id, userId } });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }
}

// orders/orders.controller.ts
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}
  @Get(":id")
  findOne(@Req() req, @Param("id") id: string) {
    return this.orders.findMine(req.user.sub, id);
  }
}

// orders/orders.module.ts
@Module({ controllers: [OrdersController], providers: [OrdersService], exports: [OrdersService] })
export class OrdersModule {}

// app.module.ts
@Module({ imports: [PrismaModule, OrdersModule] })
export class AppModule {}`,
          try: R`اعمل مشروع بـ [[npx @nestjs/cli new shop]] وبعدين [[npx nest g resource tasks]] (اختار REST). افتح الملفات اللي اتولدت وارسم على ورقة: مين بيستورد مين، ومين بيطلب مين في الـ constructor. وبعدين شيل [[TasksService]] من [[providers]] في الـ module وشغّل: رسالة الخطأ بتقول إيه؟`,
          flag: "script",
          deep: {
            why: R`Express بيسيبك تنظّم زي ما انت عايز، وفي مشروع فيه ١٠ مطورين كل واحد بينظّم بطريقة، وبعد سنة الكود بقى عجينة. Nest بيدّي الفريق كله نفس الشكل: أي مطور Nest يفتح أي مشروع Nest ويعرف الحاجة فين. وعشان كده بيتطلب كتير في الشركات والإعلانات، خصوصًا في الخليج ومصر.`,
            how: R`[[@Module]] بيعرّف حدود الـ feature: [[controllers]] بتاعته، و [[providers]] اللي بيعملها، و [[exports]] اللي بيسمح لـ modules تانية تستخدمها، و [[imports]] للـ modules اللي محتاجها. والـ provider افتراضيًا singleton: instance واحد للتطبيق كله.

DI: Nest بيقرا نوع الباراميتر في الـ constructor ([[PrismaService]]) من الـ metadata اللي TypeScript بيطلّعها ([[emitDecoratorMetadata]])، ويدوّر عليه في الـ providers المتاحة للـ module ده، ويعمله لو لسه متعملش. لو مش لاقيه، بيرمي خطأ واضح وقت التشغيل: «Nest can't resolve dependencies of the OrdersService (?)». ده بيحصل غالبًا لما تنسى تضيفه في [[providers]]، أو الـ module اللي فيه مش عامل [[exports]] ليه، أو انت مش عامل [[imports]] للـ module.

[[@Global()]] على module (زي PrismaModule) بيخلي الـ exports بتاعته متاحة في كل حتة من غير import. استخدمه للحاجات المشتركة بجد بس.

والـ exceptions: [[NotFoundException]] و [[ForbiddenException]] وأخواتهم بتتحول لرد JSON بالـ status المناسب لوحدها ([[{"statusCode":404,"message":"Order not found","error":"Not Found"}]]). و [[@Controller("orders")]] مع [[@Get(":id")]] بيعملوا [[GET /orders/:id]].

النسخة الحالية (Nest 12) بقت ESM (زي [[import ... from "./orders.service.js"]] بالامتداد) ومحتاجة Node 20 أو أحدث. الـ CLI بيعمل الإعداد ده لوحده.`,
            when: "فريق كبير، أو مشروع هيعيش سنين، أو الشركة شغالة Nest. لـ API صغير أو MVP لوحدك، Express (أو Fastify) أخف وأسرع في البداية.",
            mistakes: R`[[new OrdersService(new PrismaService())]] بإيدك جوه controller: كده ضيّعت الـ DI والاختبار بقى صعب. و module واحد ضخم فيه كل حاجة. و circular dependency بين modules (A بيحتاج B و B بيحتاج A): الحل غالبًا module تالت أو إعادة تقسيم، مش [[forwardRef]] في كل حتة. وفي الانترفيو: «يعني إيه dependency injection وليه؟» قول: الكلاس بيطلب اللي محتاجه بدل ما يعمله، فتقدر تبدّله بـ fake في الاختبار (درس «Nest: الاختبارات»).`
          },
          lines: [
            "الـ service بتتعلّم إنها provider ينفع يتحقن.",
            "كلاس الـ service.",
            "بتطلب PrismaService في الـ constructor، و Nest بيدّيهولها.",
            "دالة: طلب اليوزر ده بالـ id ده.",
            "دوّر بالـ id وصاحبه مع بعض (ownership).",
            "مش موجود؟ exception بتتحول لـ 404 JSON لوحدها.",
            "رجّعه.",
            "قفلة.",
            "قفلة.",
            "controller على [[/orders]].",
            "كل الـ routes هنا محتاجة الـ guard (درس «Nest: guards و interceptors»).",
            "الكلاس.",
            "بيطلب الـ service.",
            "GET /orders/:id.",
            "خد الـ request والـ param.",
            "نادي الـ service بـ id اليوزر من التوكن. اللي بيرجع بيتبعت JSON.",
            "قفلة.",
            "قفلة.",
            "الـ module: الـ controller والـ service، وبيصدّر الـ service لو module تاني احتاجه.",
            "قفلة.",
            "الـ module الرئيسي بيجمع الكل.",
            "قفلة."
          ],
          sol: R`لما تشيل [[TasksService]] من [[providers]] وتشغّل، Nest بيقف وقت البداية (مش وقت أول طلب) برسالة زي: [[Nest can't resolve dependencies of the TasksController (?). Please make sure that the argument TasksService at index [0] is available in the TasksModule context.]]

الـ [[?]] مكان الباراميتر اللي ملقاش ليه provider. والحل واحد من ٣: ضيفه في [[providers]]، أو لو هو في module تاني تأكد إن الـ module ده بيعمل [[exports]] ليه وإنك عامل [[imports]] للـ module.

والرسم: [[AppModule]] بيستورد [[TasksModule]]، و [[TasksController]] بيطلب [[TasksService]]، والاتنين متسجّلين في [[TasksModule]].`,
          solCode: R`npx @nestjs/cli new shop
cd shop
npx nest g resource tasks
# ✔ What transport layer do you use? REST API
npm run start:dev
# شيل TasksService من providers في tasks.module.ts:
# ERROR [ExceptionHandler] Nest can't resolve dependencies of the TasksController (?) ...`
        },
        {
          cmd: "Nest: DTO و pipes",
          title: "الـ body بيتفحص قبل ما يوصل للـ controller",
          desc: R`الـ DTO بيوصف شكل الـ body اللي الـ endpoint بيقبله، والـ pipe بيفحصه قبل ما الـ controller يشتغل. لو غلط، الرد 400 برسالة واضحة والـ controller عمره ما يتنادى.

طريقتين: class بـ decorators من [[class-validator]] مع [[ValidationPipe]] (الأشهر في المشاريع الموجودة)، أو schema بـ Zod مع [[StandardSchemaValidationPipe]] اللي بقى جوه Nest 12 نفسه.`,
          example: R`// الطريقة الكلاسيكية: class-validator
export class CreateTaskDto {
  @IsString() @MaxLength(200) title!: string;
  @IsOptional() @IsInt() @Min(1) priority?: number;
}
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

@Post()
create(@Body() dto: CreateTaskDto) { return this.tasks.create(dto); }

@Get(":id")
findOne(@Param("id", ParseIntPipe) id: number) { return this.tasks.findOne(id); }

// Zod (Nest 12): schema على الباراميتر
export const CreateOrderSchema = z.object({ amountCents: z.number().int().positive(), note: z.string().max(200).optional() });
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
app.useGlobalPipes(new StandardSchemaValidationPipe());

@Post()
create(@Req() req, @Body({ schema: CreateOrderSchema }) dto: CreateOrderDto) { return this.orders.create(req.user.sub, dto); }`,
          try: R`ركّب [[ValidationPipe]] بالإعدادات دي، وابعت بـ curl: body صح، و body فيه حقل زيادة [[isAdmin: true]]، و body من غير title، و [[GET /tasks/abc]]. اكتب الرد بتاع كل واحد. وبعدين شيل [[forbidNonWhitelisted]] وابعت الـ isAdmin تاني: اتقبل؟ وصل للـ controller؟`,
          flag: "script",
          deep: {
            why: R`نفس سبب درس [[validate(schema)]]: متصدّقش أي حاجة جاية. الفرق إن في Nest الفحص جزء من الـ framework: pipe واحد global بيحمي كل الـ endpoints، والـ DTO نفسه توثيق (و [[@nestjs/swagger]] بيقراه ويطلّع OpenAPI).`,
            how: R`[[ValidationPipe]] بياخد الـ body (object عادي)، ويحوّله لـ instance من الـ class بـ class-transformer، ويشغّل الـ decorators بـ class-validator. عشان كده محتاج الباكدجين دول متسطّبين، ومحتاج الـ type في الباراميتر يبقى class مش interface (الـ interface بيتمسح وقت التشغيل ومفيش حاجة يفحص بيها).

الإعدادات: [[whitelist: true]] بيشيل أي حقل ملوش decorator. و [[forbidNonWhitelisted: true]] بدل ما يشيله بيرفض الطلب بـ 400 «property isAdmin should not exist». ودي حماية من mass assignment: حد يبعت [[role: "ADMIN"]] والـ service تعمل [[create(dto)]]. و [[transform: true]] بيخلي [[dto]] instance حقيقي من الـ class، وبيحوّل الأنواع البسيطة لو الـ type بيقول كده. و [[ParseIntPipe]] على الـ param بيحوّل [[42]] لرقم أو يرجّع 400 «numeric string is expected». جربناها كلها على Nest 12.

Zod: في Nest 12 بتحط الـ schema في [[@Body({ schema })]]، و [[StandardSchemaValidationPipe]] بيشغّله. Standard Schema معناها أي مكتبة بتطبّق نفس الواجهة (Zod و Valibot وغيرهم). الرد لـ [[amountCents: "x"]] كان 400 برسالة [[amountCents: Invalid input: expected number, received string]]. وميزتها إنك بتعرّف الشكل مرة، والنوع [[z.infer]] بيطلع منه، وممكن تشارك نفس الـ schema مع الواجهة (درس «Express + Zod» في تاب «TypeScript»). وفي نسخ Nest الأقدم كنت بتكتب pipe بنفسك أو تستخدم مكتبة زي [[nestjs-zod]].

والـ pipe على مستوى: global ([[useGlobalPipes]])، أو controller، أو route، أو باراميتر واحد ([[@Param("id", ParseIntPipe)]]).`,
            when: "global pipe من أول يوم في أي مشروع Nest. class-validator لو المشروع قايم عليه أو بتستخدم swagger بالـ decorators. Zod لو مشروع جديد وعايز نفس الـ schema في الواجهة والباك.",
            mistakes: R`DTO كـ [[interface]] أو [[type]] مع ValidationPipe: مفيش أي فحص خالص والطلب بيعدّي. و ValidationPipe من غير [[whitelist]] فأي حقل زيادة يوصل للـ service ولـ Prisma. ونسيان [[@IsOptional()]] على حقل اختياري فيرفض لما ميتبعتش. و [[@ValidateNested()]] من غير [[@Type(() => ItemDto)]] على array من objects، فالعناصر جوه متتفحصش.`
          },
          lines: [
            "DTO كـ class بـ decorators.",
            "title: نص وأقصاه ٢٠٠.",
            "priority: اختياري، ولو موجود رقم صحيح من ١.",
            "قفلة.",
            "pipe global: شيل وارفض أي حقل مش في الـ DTO، وحوّل لـ instance.",
            "route بيقبل الـ DTO.",
            "الـ body بيوصل هنا بعد ما اتفحص.",
            "param بيتحوّل لرقم، أو 400 لو مش رقم.",
            "خد الـ id كرقم.",
            "schema بـ Zod.",
            "النوع من الـ schema.",
            "pipe global بيشغّل أي schema متحطوط على باراميتر.",
            "route.",
            "الـ schema متحطوط على الـ Body نفسه."
          ],
          sol: R`النتايج (جربناها على Nest 12):

body صح: 201 والـ dto instance من [[CreateTaskDto]].

حقل زيادة: 400 و [[message: ["property isAdmin should not exist"]]].

من غير title: 400 وفيه أكتر من رسالة، منهم [[title must be a string]].

[[GET /tasks/abc]]: 400 و [[Validation failed (numeric string is expected)]]، و [[/tasks/42]] بيوصل الـ id رقم مش string.

من غير [[forbidNonWhitelisted]] (و [[whitelist]] لسه true): الطلب بيتقبل بـ 201، بس [[isAdmin]] بيتشال قبل ما يوصل للـ controller. لو وصل، يبقى [[whitelist]] مش متفعّل.`,
          solCode: R`curl -s -X POST localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"x","isAdmin":true}'
# {"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
curl -s localhost:3000/tasks/abc
# {"message":"Validation failed (numeric string is expected)","error":"Bad Request","statusCode":400}`
        },
        {
          cmd: "Nest: guards و interceptors",
          title: "guards للـ auth والأدوار، و interceptors، و exception filters",
          desc: R`الـ request في Nest بيعدّي على طبقات بترتيب ثابت: middleware ← guards ← interceptors (قبل) ← pipes ← الـ controller ← interceptors (بعد) ← exception filters لو حصل خطأ.

الـ guard بيقرر «يدخل ولا لأ» (توكن صح؟ الـ role مسموح؟). الـ interceptor بيلف حوالين الـ handler (وقت، أو تغيير شكل الرد، أو كاش). والـ exception filter بيحوّل نوع خطأ معين لرد (مثلًا خطأ Prisma unique ← 409).`,
          example: R`export const Roles = Reflector.createDecorator<string[]>();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    try {
      req.user = jwt.verify(req.headers.authorization?.replace(/^Bearer /, ""), process.env.JWT_SECRET);
    } catch {
      throw new UnauthorizedException();
    }
    const roles = this.reflector.getAllAndOverride(Roles, [ctx.getHandler(), ctx.getClass()]);
    if (roles && !roles.includes(req.user.role)) throw new ForbiddenException();
    return true;
  }
}

@Delete(":id")
@Roles(["ADMIN"])
@HttpCode(204)
remove(@Param("id") id: string) { return this.orders.remove(id); }

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    if (err.code === "P2002") return res.status(409).json({ statusCode: 409, error: "CONFLICT" });
    res.status(500).json({ statusCode: 500, error: "INTERNAL" });
  }
}`,
          try: R`اعمل الـ guard والـ decorator، وحطهم على controller فيه GET و DELETE. جرّب: من غير توكن، وبتوكن يوزر عادي على GET ثم DELETE، وبتوكن أدمن على DELETE. وبعدين اعمل interceptor بيطبع [[METHOD URL المدة]] وركّبه global.`,
          flag: "script",
          deep: {
            why: R`في Express كل ده middleware بترتيب انت بتظبطه بإيدك، وسهل تنسى [[requireAuth]] على route. في Nest كل مسؤولية ليها نوع، والـ decorators على الـ controller بتقولك الحماية بتاعته في سطر وانت بتقرا. والـ interviewer في وظيفة Nest هيسأل عن الترتيب ده تقريبًا أكيد.`,
            how: R`الـ guard: [[canActivate]] بيرجّع true أو false (false تبقى 403 افتراضيًا)، أو بيرمي exception بالكود اللي انت عايزه. عشان كده بنرمي [[UnauthorizedException]] للتوكن الغلط (401) و [[ForbiddenException]] للـ role (403)، والفرق مهم للواجهة (درس [[401 و 403 و 404]]). وجربنا المصفوفة دي كلها على Nest 12 بـ supertest.

[[Reflector.createDecorator]] بيعمل decorator زي [[@Roles(["ADMIN"])]] بيحط metadata على الـ method، والـ guard بيقراها بـ [[getAllAndOverride]] من الـ handler الأول وبعدين الـ class. كده تقدر تحط [[@Roles]] على الـ controller كله وتغيّره لـ route واحد.

[[@UseGuards(AuthGuard)]] على الـ controller أو الـ route. أو global بـ [[APP_GUARD]] provider وتعمل decorator [[@Public()]] للـ routes المفتوحة: كده الأصل إن كله محمي، واللي مفتوح لازم يتكتب صريح. ده أأمن. وفيه [[@nestjs/passport]] و [[@nestjs/jwt]] لو عايز strategies جاهزة، بس الـ guard اليدوي ده بيوضّح اللي بيحصل.

الـ interceptor: [[intercept(ctx, next)]] بيرجّع [[next.handle()]] وده Observable (RxJS)، فتقدر تعمل [[pipe(tap(...))]] بعد الرد، أو [[map]] تغيّر شكله. استخدامات: logging بالمدة، أو [[{ data: ... }]] حوالين كل رد، أو [[ClassSerializerInterceptor]] اللي بيشيل الحقول المعلّمة [[@Exclude()]] (زي الباسورد).

الـ filter: [[@Catch(Type)]] بيمسك النوع ده بس. خطأ Prisma [[P2002]] (unique) من غير filter بيبقى 500، ومعاه 409 بمعنى واضح. و [[P2025]] (record مش موجود في update/delete) ← 404. أي خطأ مش [[HttpException]] ومفيش filter ليه، Nest بيرجّع 500 [[Internal server error]] من غير تفاصيل، ويطبع الـ stack في اللوج.`,
            when: "guard global للـ auth في أي مشروع Nest، و Roles للأدمن. interceptor للوج والشكل الموحد. filter لأخطاء المكتبات اللي ليها معنى HTTP (Prisma و Stripe وغيرهم).",
            mistakes: R`التحقق من الـ role جوه كل method بـ if بدل guard. و guard بيرجّع false للتوكن الغلط فالواجهة تاخد 403 بدل 401. و [[@Roles]] من غير ما الـ guard يقراه أصلًا (الـ decorator لوحده مبيعملش حاجة). و filter بيمسك [[@Catch()]] كل حاجة ويرجّع رسالة الخطأ الأصلية للعميل، فبيسرّب تفاصيل القاعدة. وفي الانترفيو: «الفرق بين middleware و guard و interceptor؟» الـ guard عارف الـ handler اللي هيتنفّذ (ExecutionContext والـ metadata)، والـ middleware لأ.`
          },
          lines: [
            "decorator للأدوار بـ Reflector.",
            "الـ guard provider عادي.",
            "كلاس بيطبّق CanActivate.",
            "بيطلب الـ Reflector عشان يقرا الـ metadata.",
            "بيتنادى قبل كل handler.",
            "هات الـ request بتاع Express.",
            "جرّب...",
            "...تتحقق من التوكن وتحط اليوزر على الطلب.",
            "لو غلط...",
            "...401.",
            "قفلة.",
            "اقرا [[@Roles]] من الـ method الأول وبعدين الـ class.",
            "فيه roles واليوزر مش منهم؟ 403.",
            "عدّي.",
            "قفلة.",
            "قفلة.",
            "route المسح.",
            "للأدمن بس.",
            "204 بدل 200.",
            "الـ handler.",
            "filter لأخطاء Prisma المعروفة بس.",
            "كلاس الـ filter.",
            "بيتنادى لما الخطأ ده يترمي.",
            "رد Express.",
            "unique اتكسر: 409.",
            "غير كده 500 من غير تفاصيل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`المتوقع: من غير توكن 401 في الاتنين. يوزر عادي: GET لطلبه 200، و DELETE 403 (حتى على طلبه). أدمن: DELETE 204.

ولو يوزر عادي عمل DELETE ورجع 204، يبقى الـ guard مش بيقرا [[Roles]]: اتأكد إنك بتقرا نفس الـ decorator اللي عملته بـ [[createDecorator]]، وإن [[@Roles]] على الـ method نفسها.

والـ interceptor بيطبع سطر زي [[[HTTP] GET /orders/cm... 4ms]] بعد كل رد ناجح. (لو الـ handler رمى خطأ، الـ [[tap]] العادي مبيتناداش: استخدم [[tap({ next, error })]] أو [[finalize]] لو عايز تسجّل الأخطاء كمان.)`,
          solCode: R`@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const start = Date.now();
    return next.handle().pipe(tap(() => this.logger.log($__bt$__{req.method} $__{req.url} $__{Date.now() - start}ms$__bt)));
  }
}
// main.ts
app.useGlobalInterceptors(new TimingInterceptor());`
        },
        {
          cmd: "Nest: Prisma",
          title: "Prisma جوه Nest: provider واحد للتطبيق كله",
          desc: R`[[PrismaService]] كلاس بيورث من [[PrismaClient]] وعليه [[@Injectable()]]، فأي service تطلبه في الـ constructor. وبيتحط في [[PrismaModule]] عليه [[@Global()]] و [[exports]]، فمتحتاجش تعمل import ليه في كل module.

ولأن الـ provider singleton، التطبيق كله بيستخدم client واحد و pool اتصالات واحد، زي [[db.js]] في Express.`,
          example: R`// prisma.service.ts
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// prisma.module.ts
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}

// main.ts
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();
await app.listen(process.env.PORT ?? 3000);`,
          try: R`حط PrismaModule في [[AppModule]] واستخدم [[PrismaService]] في service. وبعدين اعمل endpoint بيعمل يوزر بإيميل، وابعته مرتين بنفس الإيميل: بيرجع إيه من غير الـ filter بتاع الدرس اللي فات، وبيرجع إيه معاه؟`,
          flag: "script",
          deep: {
            why: R`لو كل service عملت [[new PrismaClient()]]، كل واحدة ليها pool، والقاعدة توصل للحد الأقصى من الاتصالات بسرعة. والـ DI بيخلي في الاختبار تبدّل PrismaService بـ fake من غير ما تلمس الـ service.`,
            how: R`[[extends PrismaClient]] بيخلي كل الـ models ([[this.db.order.findMany]]) موجودة على الـ service مباشرة. و Prisma 7: الـ client بيتولّد في فولدر انت محدده ([[generated/prisma]]) وبيحتاج driver adapter ([[PrismaPg]])، والتفاصيل في تاب «SQL و Prisma».

الاتصال: Prisma بيتصل لوحده مع أول query، فمش لازم [[$connect]] في [[onModuleInit]] (لو عملتها، الغلطة في الـ URL تظهر وقت البداية بدل أول طلب، ودي ميزة). و [[onModuleDestroy]] بيقفل الـ pool لما التطبيق يقفل. بس الـ hooks دي مبتتناديش على SIGTERM إلا لو [[app.enableShutdownHooks()]] في main.ts، وده اللي Docker بيبعته وقت الـ deploy.

الـ transactions: [[this.db.$transaction(async (tx) => ...)]] زي Express بالظبط (درس [[$transaction]]). ولو عايز transaction تعدّي على أكتر من service، ابعت [[tx]] كباراميتر، أو استخدم مكتبة زي [[@nestjs-cls/transactional]] (مبنية على AsyncLocalStorage، درس [[AsyncLocalStorage]]).

أخطاء Prisma ([[P2002]] وغيرها) مش HttpException، فمن غير filter بتبقى 500 (الدرس اللي فات).`,
            when: "أي مشروع Nest بـ Prisma. ولو المشروع بـ TypeORM (منتشر في مشاريع Nest القديمة)، نفس الفكرة بـ [[@nestjs/typeorm]] و repositories.",
            mistakes: R`[[new PrismaClient()]] في كل service. ونسيان [[enableShutdownHooks]] فالاتصالات متتقفلش نضيف. و PrismaModule من غير [[exports]] فالـ modules التانية مش شايفاه («can't resolve dependencies»). وإنك تحط منطق في PrismaService نفسه وتحوّله لـ service لكل حاجة.`
          },
          lines: [
            "decorators و hook الإغلاق.",
            "الـ driver adapter لـ Postgres.",
            "الـ client المتولّد (Prisma 7).",
            "provider ينفع يتحقن.",
            "بيورث كل حاجة من PrismaClient.",
            "الـ constructor.",
            "ابني الـ client بالـ adapter ورابط القاعدة.",
            "قفلة.",
            "لما التطبيق يقفل...",
            "...اقفل الـ pool.",
            "قفلة.",
            "قفلة.",
            "الـ module متاح في كل حتة.",
            "بيعمل PrismaService ويصدّره.",
            "كلاس الـ module.",
            "اعمل التطبيق.",
            "خلي SIGTERM يشغّل الـ hooks (onModuleDestroy).",
            "اسمع على البورت."
          ],
          sol: R`من غير filter: الطلب التاني بيرجع 500 و [[{"statusCode":500,"message":"Internal server error"}]]، واللوج فيه [[PrismaClientKnownRequestError]] كوده [[P2002]]. 500 غلط هنا، لأن ده خطأ من العميل (الإيميل مستخدم).

مع [[PrismaErrorFilter]] مركّب global ([[app.useGlobalFilters(new PrismaErrorFilter())]]): 409 و [[{"statusCode":409,"error":"CONFLICT"}]].

والأحسن كمان إن الـ service تتحقق وترمي [[ConflictException("Email already used")]] برسالة واضحة، والـ filter يفضل شبكة أمان لأي unique تاني نسيته.`,
          solCode: R`@Post("users")
create(@Body({ schema: z.object({ email: z.email() }) }) dto: { email: string }) {
  return this.db.user.create({ data: dto });
}
// curl -X POST ... -d '{"email":"a@b.co"}'  → 201
// نفس الطلب تاني بدون filter → 500
// نفس الطلب تاني مع PrismaErrorFilter → 409 {"statusCode":409,"error":"CONFLICT"}`
        },
        {
          cmd: "Nest: الاختبارات",
          title: "testing module: unit بـ fake، و e2e بـ supertest",
          desc: R`[[Test.createTestingModule]] بيبني نفس الـ DI بتاع التطبيق في الاختبار. للـ unit: بتدّيله الـ service وتبدّل الـ dependencies بـ [[overrideProvider(...).useValue(fake)]]. وللـ e2e: بتستورد [[AppModule]] كله، وتعمل [[createNestApplication()]]، وتبعت طلبات بـ supertest على [[app.getHttpServer()]].

نفس أفكار قسم الاختبارات بالظبط: قاعدة اختبار، و TRUNCATE، ومصفوفة 401 و 403 و 404.`,
          example: R`let app: INestApplication;
let db: PrismaService;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = setupApp(moduleRef.createNestApplication());
  await app.init();
  db = moduleRef.get(PrismaService);
});
beforeEach(() => db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" CASCADE'));
afterAll(() => app.close());

it("404 for another user's order", async () => {
  const [a, b] = [await db.user.create({ data: { email: "a@t.l" } }), await db.user.create({ data: { email: "b@t.l" } })];
  const order = await db.order.create({ data: { userId: a.id, amountCents: 100 } });
  const res = await request(app.getHttpServer()).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{tokenFor(b)}$__bt);
  expect(res.status).toBe(404);
});

it("unit: NotFound when the order is not mine", async () => {
  const moduleRef = await Test.createTestingModule({ providers: [OrdersService, PrismaService] })
    .overrideProvider(PrismaService).useValue({ order: { findFirst: async () => null } })
    .compile();
  await expect(moduleRef.get(OrdersService).findMine("u1", "o1")).rejects.toMatchObject({ status: 404 });
});`,
          try: R`اكتب e2e لـ [[POST /api/orders]]: body صح 201، و [[amountCents: "x"]] 400. وخلي بالك: لازم تستخدم نفس إعداد الـ app اللي في main.ts (الـ pipes والـ prefix)، وإلا الـ 400 هيبقى 201. وبعدين اكتب unit للـ service بـ fake PrismaService.`,
          flag: "script",
          deep: {
            why: R`اختبار Nest من غير الـ testing module معناه تعمل كل الـ services بإيدك بالترتيب، وتفوّت الـ guards والـ pipes. والـ e2e هو اللي بيثبت إن كل الطبقات (guard و pipe و filter) متركّبة صح، ودي أكتر حاجة بتبوظ لما حد يعدّل main.ts.`,
            how: R`[[createNestApplication()]] بيعمل التطبيق بس مبيعملش listen، و supertest بياخد [[app.getHttpServer()]] (نفس فكرة [[app و server]]). و [[app.init()]] لازم قبل الطلبات، و [[app.close()]] في الآخر بيشغّل [[onModuleDestroy]] ويقفل Prisma.

[[setupApp(app)]]: الـ pipes والـ filters والـ prefix اللي في main.ts مش جزء من AppModule، فلو الاختبار معملهمش، هتختبر تطبيق غير اللي بيشتغل. عشان كده دالة واحدة بتعملهم، و main.ts والاختبار الاتنين بينادوها. (البديل: تسجّلهم كـ providers بـ [[APP_PIPE]] و [[APP_FILTER]] جوه الـ module، فيبقوا جزء منه.)

[[overrideProvider(X).useValue(fake)]] بيبدّل الـ provider في الـ DI، و [[moduleRef.get(OrdersService)]] بيجيب الـ instance بالـ fake جواه. في الـ unit مش محتاج [[createNestApplication]] خالص.

الأداة: Nest 12 نفسه بيستخدم Vitest في اختباراته، و Jest لسه منتشر جدًا في المشاريع الموجودة. مع Vitest لازم SWC (باكدج [[unplugin-swc]] في vitest.config) لأن esbuild الافتراضي مبيطلّعش decorator metadata، فالـ DI بالـ types مبيشتغلش (جربناها: من غير إعداد الـ decorators في SWC الملف مبيعملش parse أصلًا). و [[fileParallelism: false]] زي قسم الاختبارات لأن القاعدة مشتركة.`,
            when: "e2e لكل controller (الحالة الناجحة، والـ validation، ومصفوفة الصلاحيات). unit للـ services اللي فيها منطق حقيقي (حسابات أو قرارات). ومتعملش unit لـ service بتعمل findMany وخلاص.",
            mistakes: R`e2e من غير نفس الـ pipes اللي في main.ts، فالـ validation متختبرش. و mock للـ PrismaService في الـ e2e فبتختبر الـ mock. ونسيان [[app.close()]] فـ vitest يفضل مستني. و Vitest من غير SWC فتلاقي «Nest can't resolve dependencies» في الاختبار بس، والتطبيق شغال.`
          },
          lines: [
            "التطبيق للاختبارات.",
            "الـ Prisma للتجهيز والتنضيف.",
            "مرة قبل الكل...",
            "...ابني AppModule كله بالـ DI.",
            "اعمل التطبيق بنفس إعداد main.ts (pipes و prefix و filters).",
            "جهّزه من غير listen.",
            "هات PrismaService من الـ DI.",
            "قفلة.",
            "فضّي الجداول قبل كل اختبار.",
            "في الآخر اقفل التطبيق (و Prisma معاه).",
            "اختبار الـ ownership.",
            "يوزرين.",
            "طلب بتاع A.",
            "B يطلب طلب A.",
            "404.",
            "قفلة.",
            "unit test.",
            "module فيه الـ service والـ dependency...",
            "...والـ dependency اتبدّلت بـ fake بيرجّع null.",
            "ابنيه.",
            "الـ service لازم ترمي 404.",
            "قفلة."
          ],
          sol: R`المتوقع: الـ 201 و الـ 400 الاتنين بينجحوا، ورسالة الـ 400 من Zod زي [[amountCents: Invalid input: expected number, received string]]. والـ unit بينجح من غير قاعدة بيانات خالص.

لو الـ 400 طلع 201، الاختبار مش بيستخدم [[setupApp]] (مفيش pipe). ولو ظهر 404 على كل الـ routes، الـ prefix [[api]] مش متظبط في الاختبار. ولو vitest قال «Expression expected» عند [[@Module]]، SWC مش متظبط للـ decorators.

الإعداد اللي جربناه لـ Vitest في الكود.`,
          solCode: R`// vitest.config.ts
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [swc.vite({ jsc: { parser: { syntax: "typescript", decorators: true }, transform: { legacyDecorator: true, decoratorMetadata: true }, target: "es2022" } })],
  test: { env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" }, fileParallelism: false },
});

// test/orders.e2e.test.ts
it("201 then 400", async () => {
  const u = await db.user.create({ data: { email: "a@t.l" } });
  const auth = { Authorization: $__btBearer $__{tokenFor(u)}$__bt };
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: 500 })).status).toBe(201);
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: "x" })).status).toBe(400);
});`
        }
      ]
    },
    {
      t: "أسئلة انترفيو Backend بـ Node",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Node و Express، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "event loop و blocking",
          title: "Node single-threaded، إزاي بيخدم آلاف الطلبات؟ (event loop)",
          desc: R`الـ JavaScript بتاعي بيشتغل على thread واحد، بس الـ I/O (الشبكة والقاعدة والملفات) مش بيستناه: Node بيطلب العملية من نظام التشغيل أو من thread pool بتاع libuv، ويكمّل يخدم طلبات تانية، ولما النتيجة تيجي الـ callback بتاعها يدخل طابور والـ event loop ينفّذه. فطول ما كل طلب معظم وقته مستني I/O، thread واحد بيكفي آلاف الاتصالات.

المشكلة الحقيقية الـ blocking: أي كود CPU طويل (loop على مليون عنصر، أو [[JSON.parse]] لملف ضخم، أو دالة Sync) بيوقّف الـ loop فكل الطلبات بتستنى. الحل: worker_threads، أو queue، أو تقسيم الشغل.`,
          example: R`console.log("1 sync");
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("2 sync");
// CommonJS: 1 sync, 2 sync, nextTick, promise, timeout, immediate`,
          try: R`شغّل الكود مرة كـ [[.cjs]] ومرة كـ [[.mjs]]، وقارن مكان [[nextTick]] و [[promise]]. وبعدين حط الـ setTimeout والـ setImmediate جوه callback بتاع [[fs.readFile]] وشوف مين الأول.`,
          flag: "script",
          deep: {
            why: "أشهر سؤال Node على الإطلاق. بيختبر إنك فاهم ليه Node سريع في الـ I/O وضعيف في الـ CPU، وده بيأثر على كل قرار: إمتى تستخدم Sync، وإمتى worker، وإزاي تكتشف إن السيرفر «مهنّج».",
            how: R`الترتيب: الكود الـ sync كله الأول. بعده microtasks: طابور [[process.nextTick]] وطابور الـ promises، وبيتفضّوا بالكامل بعد كل task. بعدها مراحل الـ loop: timers ([[setTimeout]] و [[setInterval]])، ثم poll (callbacks الـ I/O)، ثم check ([[setImmediate]])، ثم close callbacks.

تفصيلة جربناها: في CommonJS الـ nextTick قبل الـ promise. في ESM ([[.mjs]] أو [[type: module]]) الـ promise طلع قبل الـ nextTick، لأن الموديول نفسه بيتنفّذ جوه microtask فطابور الـ promises بيتفضى الأول. والـ timeout والـ immediate في المستوى الأعلى ترتيبهم مش مضمون، بس جوه callback بتاع I/O الـ immediate دايمًا الأول.

thread pool بتاع libuv (افتراضيًا ٤ threads، [[UV_THREADPOOL_SIZE]]) بيعمل fs و dns.lookup و crypto (pbkdf2 و scrypt) و zlib. الشبكة (TCP) مش بتستخدمه، بتعتمد على epoll/kqueue في النظام. عشان كده ٤ عمليات bcrypt تقيلة مع بعض ممكن تبطّأ قراية الملفات.

وتكتشف الـ blocking إزاي؟ [[perf_hooks.monitorEventLoopDelay()]] بيقيس التأخير، ولو p99 فوق ١٠٠ms فيه حاجة بتوقّف. و [[node --cpu-prof]] أو clinic.js يوريك الدالة. والتفاصيل الأعمق للـ event loop في JavaScript نفسها في درس [[event loop]] في تاب «JavaScript».`,
            when: R`أسئلة بعدها: «الفرق بين nextTick و setImmediate؟» (الأسماء معكوسة: nextTick أسرع). «إزاي تعمل حاجة تقيلة من غير ما تبلوك؟» (worker_threads أو queue، درس [[worker_threads و cluster]]). «Node multi-threaded ولا لأ؟» (الـ JS بتاعك thread واحد، و Node نفسه فيه threads للـ libuv والـ GC). «إمتى Node اختيار وحش؟»`,
            mistakes: R`«Node multi-threaded» أو «Node single-threaded فمينفعش يعمل حاجتين مع بعض»: الاتنين غلط. و «async بيخلي الكود أسرع»: async بيخلي السيرفر فاضي لغيرك وانت مستني، مش بيسرّع الحساب نفسه. و «setTimeout(fn, 0) بيتنفّذ فورًا». و nextTick recursion بيجوّع الـ loop ومفيش I/O يتنفّذ.`
          },
          lines: [
            "sync.",
            "timer: مرحلة timers.",
            "مرحلة check.",
            "microtask.",
            "طابور nextTick (microtask برضه، ليه أولوية في CommonJS).",
            "sync."
          ],
          sol: R`CommonJS: [[1 sync]]، [[2 sync]]، [[nextTick]]، [[promise]]، [[timeout]]، [[immediate]].

ESM: [[1 sync]]، [[2 sync]]، [[promise]]، [[nextTick]]، وبعدين الاتنين التانيين. السبب إن الـ ESM بيتنفّذ من جوه microtask، فالـ promises بتخلص الأول قبل ما Node يرجع لطابور الـ nextTick.

وجوه [[readFile]]: [[immediate]] قبل [[timeout]] دايمًا، لأن بعد مرحلة الـ poll (اللي فيها callback الـ I/O) الـ loop بيروح على check (setImmediate) قبل ما يلف للـ timers تاني. وفي المستوى الأعلى ترتيب timeout و immediate ممكن يتغير من تشغيلة للتانية.`,
          solCode: R`const { readFile } = require("node:fs");
readFile(__filename, () => {
  setTimeout(() => console.log("timeout in I/O"), 0);
  setImmediate(() => console.log("immediate in I/O"));
});
// immediate in I/O
// timeout in I/O`
        },
        {
          cmd: "next() والترتيب",
          title: "إزاي middleware بيشتغل في Express؟ وليه الترتيب مهم؟ (middleware order)",
          desc: R`Express بيمشي على الـ middleware والـ routes بالترتيب اللي اتسجّلوا بيه. كل واحد يا إما يرد ويقفل الطلب، يا إما ينادي [[next()]] فالطلب يروح للي بعده، يا إما [[next(err)]] فيقفز على طول لأول error middleware (اللي ليه ٤ باراميترز).

فالترتيب هو المنطق: parsing و security headers و CORS و rate limit الأول، وبعدين auth، وبعدين الـ routes، وبعدين 404، وفي الآخر الـ error handler. وأي route متسجّل قبل الـ auth مش محمي حتى لو شكله جنب routes محمية.`,
          example: R`app.get("/a", (req, res) => res.json({ user: req.user ?? null }));
app.use((req, res, next) => { req.user = "u1"; next(); });
app.get("/b", (req, res) => res.json({ user: req.user }));
app.get("/boom", async () => { throw new Error("db down"); });
app.use((err, req, res, next) => res.status(500).json({ error: "INTERNAL" }));`,
          try: R`شغّل المثال واطلب [[/a]] و [[/b]] و [[/boom]]. وبعدين انقل الـ error handler لأول الملف واطلب [[/boom]] تاني. إيه اللي اتغير، وليه؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم Express من جوه مش حافظ أسماء. وغلطات الترتيب من أشهر أسباب الثغرات (route من غير auth) والـ bugs (req.body فاضي، CORS مش شغال).",
            how: R`داخليًا Express عنده stack من الـ layers. كل layer ليها path و method (أو أي method في [[app.use]]). مع كل طلب بيلف عليهم بالترتيب ويشغّل اللي بيطابق. [[next()]] يعني «كمّل على الـ layer اللي بعدي». ولو ولا واحد رد، Express بيرجّع 404 الافتراضي.

الـ error middleware بيتعرف بعدد الباراميترز (٤). لما حد ينادي [[next(err)]] أو يرمي خطأ، Express بيتخطى كل الـ middleware العادي ويروح لأول error middleware بعد المكان ده. وفي Express 5، لو async handler رمى أو الـ promise اترفضت، ده بيتحول لـ [[next(err)]] لوحده (درس [[async errors في Express 5]]). في Express 4 كان الطلب بيعلّق.

أمثلة الترتيب اللي بتتسأل: [[express.json()]] قبل الـ routes وإلا [[req.body]] undefined. والـ webhook اللي محتاج raw body قبل [[express.json()]]. و CORS قبل الـ auth عشان الـ preflight (OPTIONS) ميترفضش بـ 401. و [[express.static]] قبل الـ auth لو الملفات عامة. والتفاصيل في درس [[ترتيب الـ middleware]].`,
            when: R`أسئلة بعدها: «إزاي تعمل error handler مركزي؟». «إيه اللي يحصل لو middleware منسيش ينادي next ولا رد؟» (الطلب يعلّق لحد الـ timeout). «الفرق بين app.use و app.get؟». «middleware في Nest بيختلف عن guard إزاي؟» (درس «Nest: guards و interceptors»).`,
            mistakes: R`«الترتيب مش مهم». و error handler بـ ٣ باراميترز فمش بيتنادى أبدًا. وإنك تنادي [[next()]] بعد [[res.json()]] فيحصل «Cannot set headers after they are sent». و [[res.json()]] من غير [[return]] جوه if، فالكود يكمّل ويرد مرتين.`
          },
          lines: [
            "route قبل الـ middleware: مش هيشوف req.user.",
            "middleware بيحط اليوزر ويكمّل.",
            "route بعده: شايف req.user.",
            "route بيرمي من async (Express 5 بيوديه للـ error handler).",
            "error handler بـ ٤ باراميترز في الآخر."
          ],
          sol: R`النتيجة: [[/a]] بيرجّع [[{ user: null }]] لأنه اتسجّل قبل الـ middleware، و [[/b]] بيرجّع [[{ user: "u1" }]]، و [[/boom]] بيرجّع 500 و [[{ error: "INTERNAL" }]].

لما الـ error handler يبقى أول الملف: [[/boom]] بيرجّع 500 بصفحة HTML الافتراضية بتاعة Express (فيها الـ stack في التطوير)، مش الـ JSON بتاعك. السبب إن [[next(err)]] بيدوّر على error middleware بعد مكان الخطأ، واللي فوق مش بيتشاف.`,
          solCode: R`const r = await Promise.all(["/a", "/b", "/boom"].map((p) => request(app).get(p)));
console.log(r[0].body, r[1].body, r[2].status, r[2].body);
// { user: null } { user: 'u1' } 500 { error: 'INTERNAL' }`
        },
        {
          cmd: "JWT ولا session",
          title: "JWT ولا session؟ وفين تحط التوكن؟ (JWT vs sessions)",
          desc: R`session: السيرفر بيحفظ البيانات في store (Redis)، والعميل معاه id عشوائي في كوكي httpOnly. logout والحظر فوري، بس كل طلب فيه lookup. JWT: البيانات موقّعة جوه التوكن، والسيرفر بيتحقق من التوقيع من غير ما يسأل حد. مفيش lookup، بس مفيش سحب للتوكن قبل ما يخلص.

عشان كده الشكل الشائع مع JWT: access token قصير (١٠-١٥ دقيقة) و refresh token طويل في كوكي httpOnly بيتخزن ويتلغي من السيرفر. ولموقع واحد على دومين واحد، الـ session غالبًا أبسط وأأمن.`,
          example: R`// session: الكوكي فيها id بس، والبيانات في Redis
// Set-Cookie: sid=s%3ACzl9ycc...; Path=/; HttpOnly; Secure; SameSite=Lax
// JWT: البيانات في التوكن نفسه، أي حد يقدر يقراها (مش مشفّرة، موقّعة بس)
node -e 'console.log(JSON.parse(Buffer.from(process.argv[1].split(".")[1], "base64url")))' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9.x`,
          try: R`خد أي JWT من تطبيق عندك وفكّ الجزء التاني بالأمر ده. إيه البيانات اللي فيه؟ ينفع يبقى فيه إيميل أو رقم تليفون؟ وبعدين فكّر: يوزر عمل logout، والـ access token بتاعه لسه فاضله ١٠ دقايق. حد سرقه. يقدر يستخدمه؟`,
          deep: {
            why: "سؤال تصميم بيبان منه إنك بتفهم المقايضات مش بتردد «JWT أحدث». والإجابة الناضجة بتقول إمتى كل واحد، وإيه اللي بيضيع مع JWT، وفين تحط التوكن.",
            how: R`النقط اللي تقولها: الـ session stateful (الحالة عند السيرفر) و JWT stateless (الحالة في التوكن). JWT مناسب لما خدمات كتير محتاجة تتحقق من غير قاعدة مشتركة، أو موبايل، أو API لطرف تالت. والـ session مناسبة لـ web app على دومين واحد.

التخزين: localStorage أي script (XSS) يقدر يقراه ويبعته برّه. الكوكي الـ httpOnly محدش يقدر يقراها بـ JS، بس بتتبعت لوحدها فمحتاجة حماية CSRF ([[SameSite=Lax]] أو Strict، وتوكن CSRF للحالات الحساسة). فالشائع: refresh في كوكي httpOnly، و access في الذاكرة.

سحب التوكن: مع JWT يا إما عمره قصير ومعاه refresh بيتلغي من القاعدة (rotation، درس «refresh rotation» في «تاب بناء مشروع كامل»)، يا إما blocklist بالـ [[jti]] في Redis، وده رجوع لـ lookup. و [[alg]]: حدد الخوارزمية في [[jwt.verify]] صريح عشان هجمات [[alg: none]] أو تبديل الخوارزمية.

الكود في درسي [[express-session]] و [[access و refresh]].`,
            when: R`أسئلة بعدها: «التوكن اتسرق، تعمل إيه؟». «فين تحط الـ JWT في الواجهة؟». «يعني إيه CSRF وليه SameSite بيساعد؟». «ليه الـ access قصير؟». «OAuth و JWT نفس الحاجة؟» (لأ: OAuth بروتوكول تفويض، و JWT شكل توكن).`,
            mistakes: R`«JWT مشفّر»: هو موقّع بس، والـ payload base64 أي حد يقراه، فمتحطش فيه بيانات حساسة. و «JWT أأمن من session». و access token عمره أيام. و logout في الواجهة بس بمسح الـ localStorage والتوكن لسه شغال.`
          },
          lines: [
            "فك الـ payload بتاع JWT من غير أي سر: base64url عادي. (في الـ session بقى، الكوكي فيها id موقّع بس زي السطر المتعلّق فوق.)"
          ],
          sol: R`الأمر بيطبع object زي [[{ sub: "7", role: "USER", exp: 1790714777 }]]. أي حد معاه التوكن يقرا ده من غير أي مفتاح، فمينفعش يبقى فيه باسورد أو بيانات حساسة. الإيميل أحيانًا بيتحط، بس الأحسن id بس.

وسؤال الـ logout: أيوه، التوكن المسروق شغال لحد ما الـ [[exp]] يعدّي، لأن السيرفر مبيسألش حد وهو بيتحقق. عشان كده عمره قصير. ولو محتاج سحب فوري: blocklist للـ [[jti]] في Redis لحد الـ exp، أو [[tokenVersion]] على اليوزر بتزوده مع logout-all والتوكن بيحمله. أو session من الأول.`,
          solCode: R`// blocklist بسيطة في Redis لحد ما التوكن يخلص
await redis.set($__btjwt:revoked:$__{payload.jti}$__bt, "1", "EXAT", payload.exp);
// وفي requireAuth بعد jwt.verify:
if (await redis.exists($__btjwt:revoked:$__{payload.jti}$__bt)) return res.status(401).json({ error: "REVOKED" });`
        },
        {
          cmd: "scale لـ API",
          title: "الـ API بقى بطيء والمستخدمين زادوا ١٠ أضعاف، تعمل إيه؟ (How would you scale it?)",
          desc: R`أبدأ بالقياس مش بالتخمين: أنهي endpoints بطيئة، والوقت رايح فين (القاعدة، ولا CPU، ولا خدمة برّه)، من اللوجات (المدة لكل طلب) و APM و [[EXPLAIN ANALYZE]].

بعدين بالترتيب: صلّح الأرخص (index ناقص، و N+1، و pagination، ورد أصغر)، وبعدين كاش للي بيتقري كتير (Redis و HTTP cache)، وبعدين الشغل التقيل يطلع queue، وبعدين نسخ كتير ورا load balancer (والتطبيق لازم يبقى stateless)، وآخر حاجة القاعدة نفسها (pooler و read replicas).`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u7' ORDER BY "createdAt" DESC LIMIT 20;
-- Seq Scan on "Order" (actual time=0.02..412.30 rows=20)
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
-- Index Scan using order_user_created_idx (actual time=0.03..0.09 rows=20)`,
          try: R`اختار أبطأ endpoint عندك وارسم رحلة الطلب: كام query؟ كام ms لكل واحدة؟ فيه طلب لخدمة برّه؟ اكتب ٣ تحسينات بالترتيب من الأرخص للأغلى، ولكل واحد إزاي هتقيس إنه نفع.`,
          deep: {
            why: "سؤال system design مصغّر. الإجابة الضعيفة «Kubernetes و microservices». الإجابة القوية بتبدأ بالقياس، وبتمشي من الأرخص للأغلى، وبتعرف إن ١٠ سيرفرات على query من غير index هيضربوا القاعدة ١٠ أضعاف.",
            how: R`النقط اللي تقولها بالترتيب:

١. قيس: p50 و p95 و p99 لكل endpoint، و slow query log، و APM (Sentry أو OpenTelemetry). والـ event loop delay لو شاكك في CPU.

٢. القاعدة أول مكان تبص فيه: index على أعمدة الـ WHERE والـ ORDER BY (مثال الـ EXPLAIN من ٤١٢ms لأقل من ms)، و N+1 (درس «indexes و N+1» في «تاب بناء مشروع كامل»)، و [[select]] للأعمدة المطلوبة بس، و pagination.

٣. كاش: HTTP cache و CDN للعام، و Redis (cache-aside) للي بيتقري كتير وبيتغير قليل، مع خطة للمسح.

٤. اطلع من الطلب: إيميلات وصور وتقارير في queue، والرد 202.

٥. horizontal: نسخ ورا load balancer، والشرط stateless: sessions و rate limit و cache في Redis، والملفات في S3، والـ cron في queue scheduler، والـ sockets بـ Redis adapter.

٦. القاعدة لما تبقى هي عنق الزجاجة: connection pooler (PgBouncer)، و read replicas للقراية، وبعدها partitioning. والـ sharding آخر حاجة خالص.

والتفاصيل في درس «scaling path» و «scaling القاعدة» في «تاب بناء مشروع كامل».`,
            when: R`أسئلة بعدها: «ليه الـ stateless مهم؟». «كاش invalidation إزاي؟». «read replica فيها مشكلة إيه؟» (replication lag: اليوزر يكتب وميلاقيش اللي كتبه). «vertical ولا horizontal؟». «إزاي تعرف إن التحسين نفع؟» (نفس المقاييس قبل وبعد).`,
            mistakes: R`تبدأ بـ microservices أو Kubernetes. أو «هنكبّر السيرفر» من غير ما تعرف المشكلة. أو كاش على كل حاجة من غير خطة مسح. أو تنسى القاعدة وتكبّر الـ API بس، فالـ connections تخلص. أو ترد بكلام عام من غير أرقام: قول «p95 كان ٢ ثانية، الـ query دي كانت ١.٨ منهم».`
          },
          lines: [
            "شوف الخطة والوقت الحقيقي.",
            "بتقرا كل الجدول: ٤١٢ms.",
            "index على الفلتر والترتيب، و CONCURRENTLY عشان ميقفلش الجدول.",
            "بعد الـ index: أقل من ms."
          ],
          sol: R`مثال لإجابة كويسة على [[GET /api/orders]]:

الرحلة: auth (Redis، ١ms)، و query الطلبات (٤٠٠ms، Seq Scan)، وبعدين loop بيجيب المنتج لكل طلب (٢٠ query، N+1، ٦٠ms)، وحساب الإجمالي في JS.

التحسينات بالترتيب: (١) index مركّب على [[userId, createdAt]]: أقيس بـ EXPLAIN قبل وبعد. (٢) [[include]] أو [[in]] بدل الـ loop: أقيس عدد الـ queries في لوج Prisma من ٢١ لـ ٢. (٣) كاش للمنتجات لو لسه بطيء: أقيس hit rate و p95.

المهم إن كل خطوة ليها رقم قبل ورقم بعد، وإنك متعدّيش للأغلى إلا لو الأرخص مكفّاش.`,
          solCode: R`const prisma = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let queries = 0;
prisma.$on("query", () => queries++);
// اطلب الـ endpoint مرة، واطبع queries قبل وبعد التحسين`
        },
        {
          cmd: "idempotency",
          title: "اليوزر داس «ادفع» مرتين، أو الشبكة عملت retry: إزاي متخصمش مرتين؟ (idempotency)",
          desc: R`العملية idempotent لو تكرارها بيدّي نفس النتيجة زي مرة واحدة. GET و PUT و DELETE كده بطبيعتهم. POST لأ: مرتين يعني طلبين.

الحل: العميل بيبعت [[Idempotency-Key]] (UUID لكل محاولة شراء)، والسيرفر بيحفظ المفتاح مع النتيجة. لو نفس المفتاح جه تاني، يرجّع نفس الرد من غير ما يعمل العملية تاني. ونفس الفكرة جوه السيرفر: unique constraint، وتحديث بشرط على الحالة، و webhooks وـ jobs بتتعالج مرة مهما اتكررت.`,
          example: R`// الواجهة: مفتاح واحد لكل محاولة، ثابت مع أي retry
// fetch("/api/orders", { method: "POST", headers: { "Idempotency-Key": attemptId }, body })
model IdempotencyKey {
  key        String   @id
  userId     String
  status     Int
  response   Json
  createdAt  DateTime @default(now())
}
// SQL تحت: INSERT ... ON CONFLICT (key) DO NOTHING، ولو مدخلش يبقى تكرار`,
          try: R`اعمل [[POST /api/orders]] بيقرا [[Idempotency-Key]]: لو المفتاح موجود لنفس اليوزر رجّع الرد المحفوظ، ولو لأ اعمل الطلب واحفظ الرد. ابعت نفس الطلب ٣ مرات بنفس المفتاح بـ [[Promise.all]] (مع بعض!). كام طلب اتعمل في القاعدة؟`,
          deep: {
            why: "الشبكات بتقطع، والموبايل بيعيد، واليوزر بيدوس مرتين، والبوابة بتعيد الـ webhook، والـ queue بتعيد الـ job. في أي نظام فيه فلوس، التكرار مش حالة نادرة. والسؤال ده بيفرق بين حد بنى API لعب وحد بنى حاجة فيها دفع.",
            how: R`النقط: [[Idempotency-Key]] من العميل (مش من السيرفر، عشان الـ retry يبعت نفس المفتاح). المفتاح مربوط باليوزر (مفتاح يوزر تاني ميرجّعش رد يوزرك). والحفظ لازم atomic: [[INSERT ... ON CONFLICT DO NOTHING]] أو unique على المفتاح، مش «دوّر وبعدين اعمل» (الاتنين هيدوّروا مع بعض ويلاقوه مش موجود). والطلب التاني اللي جه والأول لسه شغال يرجع 409 «in progress» أو يستنى. والمفاتيح ليها عمر (٢٤ ساعة مثلًا) وبتتمسح. ولو نفس المفتاح جه بـ body مختلف: 422.

ده مفصّل في درس [[Idempotency-Key]] في تاب «APIs متقدمة». وجوه السيرفر: الـ webhook بشرط على الحالة و unique على id المعاملة (درس [[اختبار الـ webhook]])، والـ jobs idempotent (درس [[background jobs]])، ومع بوابات الدفع ابعت نفس المفتاح ليهم كمان (Stripe و Paymob بيدعموا حاجة زي كده).`,
            when: R`أسئلة بعدها: «POST ولا PUT idempotent؟». «إزاي تمنع race condition في الحفظ؟». «at-least-once و exactly-once؟» (الـ queues بتضمن at-least-once، و exactly-once بتعمله انت بالـ idempotency). «تمسح المفاتيح إمتى؟».`,
            mistakes: R`«بقفل الزرار في الواجهة» كحل وحيد: الـ retry بيحصل من الشبكة مش من اليوزر. و «دوّر لو موجود، وإلا اعمل» من غير unique فالتكرار المتزامن يعدّي. ومفتاح جديد مع كل retry فمفيش فايدة. ومفتاح عالمي من غير ربط باليوزر.`
          },
          lines: [
            "جدول المفاتيح.",
            "المفتاح نفسه primary key، فالتكرار مستحيل على مستوى القاعدة.",
            "صاحب المفتاح.",
            "الـ status اللي اترد.",
            "الرد المحفوظ عشان يترجع زي ما هو.",
            "وقت الإنشاء عشان المسح بعد مدة.",
            "قفلة."
          ],
          sol: R`المتوقع لو التنفيذ صح: طلب واحد بس في القاعدة، والتلات ردود زي بعض (أو واحد 201 والباقيين نفس الرد المحفوظ، أو 409 «in progress» لو وصلوا والأول لسه بيتعمل).

لو لقيت ٢ أو ٣ طلبات، يبقى بتعمل [[findUnique]] وبعدين [[create]]: التلاتة دوّروا مع بعض قبل ما أي واحد يكتب. الحل إنك تحجز المفتاح الأول بـ [[create]] وتسيب الـ primary key يرفض التكرار (Prisma بيرمي P2002)، وبعدين تعمل الطلب وتحدّث الصف بالرد.`,
          solCode: R`router.post("/", requireAuth, async (req, res) => {
  const key = req.get("Idempotency-Key");
  if (!key) return res.status(400).json({ error: "IDEMPOTENCY_KEY_REQUIRED" });
  try {
    await db.idempotencyKey.create({ data: { key, userId: req.user.id, status: 0, response: {} } });
  } catch (e) {
    if (e.code !== "P2002") throw e;
    const saved = await db.idempotencyKey.findUnique({ where: { key } });
    if (saved.userId !== req.user.id) return res.status(422).json({ error: "KEY_REUSED" });
    if (saved.status === 0) return res.status(409).json({ error: "IN_PROGRESS" });
    return res.status(saved.status).json(saved.response);
  }
  const order = await ordersService.create(req.user.id, req.body);
  await db.idempotencyKey.update({ where: { key }, data: { status: 201, response: order } });
  res.status(201).json(order);
});`
        },
        {
          cmd: "استراتيجية الأخطاء",
          title: "إزاي بتتعامل مع الأخطاء في API بـ Node؟ (error handling strategy)",
          desc: R`عندي نوعين: أخطاء متوقعة (operational) زي validation أو مش موجود أو مش مسموح أو خدمة برّه واقعة، ودي بترميها كـ [[AppError]] فيها status وكود ثابت. وأخطاء bugs (undefined is not a function) ودي بتبقى 500 برسالة عامة وبتتسجّل بالـ stack وبتروح Sentry.

كل ده بيتمسك في error middleware واحد في الآخر بيرجّع نفس شكل الـ JSON دايمًا. والـ process نفسها: [[unhandledRejection]] و [[uncaughtException]] بيتسجّلوا والـ process بتقفل نضيف وتتعاد (PM2 أو Docker)، مش بتكمّل في حالة مش معروفة.`,
          example: R`export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

app.use((err, req, res, next) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.code, message: err.message });
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: "INTERNAL", requestId: req.id });
});

process.on("unhandledRejection", (reason) => { logger.fatal({ reason }, "unhandledRejection"); shutdown(1); });
process.on("uncaughtException", (err) => { logger.fatal({ err }, "uncaughtException"); shutdown(1); });`,
          try: R`في الـ API بتاعك: ارمي [[new AppError(404, "ORDER_NOT_FOUND", "...")]] من service، وارمي [[TypeError]] عادي من service تانية، وقارن الردين واللوج. وبعدين اعمل [[Promise.reject(new Error("x"))]] برّه أي route وشوف الـ process عملت إيه.`,
          flag: "script",
          deep: {
            why: "API من غير استراتيجية بيرجّع أشكال أخطاء مختلفة في كل route، وأحيانًا بيسرّب stack traces ورسايل القاعدة للعميل، وأحيانًا بيبلع الخطأ فمحدش يعرف. والسؤال بيبين إنك شغّلت حاجة في الإنتاج.",
            how: R`النقط اللي تقولها: شكل واحد للأخطاء ([[{ error: "CODE", message }]] أو [[application/problem+json]]، درس [[problem+json]] في تاب «APIs متقدمة» ودرس «شكل الأخطاء» في «تاب بناء مشروع كامل»)، والواجهة بتعتمد على الـ code مش النص.

مكان الرمي: الـ validation في الـ middleware (400)، والـ service ترمي أخطاء الـ business (404 و 409 و 422)، ومحدش جوه الـ service يعمل [[res.status]]. والخطأ من مكتبة (Prisma P2002، أو 503 من البوابة) بيتحول لـ AppError في مكان واحد.

Express 5 بيمسك rejections الـ async handlers لوحده (درس [[async errors في Express 5]]). والـ 500 عمره ما يرجّع [[err.message]] للعميل، بس [[requestId]] عشان تدوّر بيه في اللوج (درس [[AsyncLocalStorage]]).

uncaughtException: الـ process بعدها في حالة مش معروفة (اتصال نص مفتوح، أو lock مش اتفك). الصح تسجّل، وتبطّل تقبل طلبات، وتقفل، والـ supervisor يشغّل نسخة جديدة. وفي Node الحديث الـ unhandledRejection بيقفل الـ process افتراضيًا أصلًا.

والأخطاء اللي مش بتاعتك: timeouts على أي طلب لبرّه ([[AbortSignal.timeout(5000)]])، و retry بـ backoff للحاجات الـ idempotent بس، و circuit breaker لو الخدمة واقعة كتير.`,
            when: R`أسئلة بعدها: «operational و programmer errors الفرق إيه؟». «ليه متكمّلش بعد uncaughtException؟». «إزاي تعرف إن فيه أخطاء في الإنتاج؟» (Sentry و alerts على نسبة الـ 5xx). «4xx ولا 5xx لو القاعدة وقعت؟» (503).`,
            mistakes: R`[[try/catch]] في كل route بيرجّع [[res.status(500).json(err)]] فيسرّب كل حاجة. و [[catch (e) {}]] فاضي. و [[process.on("uncaughtException", log)]] والـ process تكمّل. ورسايل خطأ مختلفة للإيميل الغلط والباسورد الغلط في login (بتقول للمهاجم مين مسجّل).`
          },
          lines: [
            "كلاس للأخطاء المتوقعة.",
            "فيه status وكود ثابت ورسالة.",
            "قفلة.",
            "error handler واحد في الآخر.",
            "خطأ متوقع: رد بالـ status والكود.",
            "غير كده bug: سجّله بالـ stack.",
            "ورد 500 عام ومعاه id الطلب بس.",
            "قفلة.",
            "promise اترفضت ومحدش مسكها: سجّل واقفل نضيف.",
            "exception محدش مسكه: نفس الحاجة."
          ],
          sol: R`المتوقع: الـ AppError بيرجع 404 و [[{ error: "ORDER_NOT_FOUND", message: "..." }]] ومفيش سطر error في اللوج (أو سطر info، دي حاجة عادية). والـ TypeError بيرجع 500 و [[{ error: "INTERNAL", requestId: "..." }]] من غير أي تفاصيل، واللوج فيه سطر error بالـ stack والـ requestId نفسه.

والـ rejection برّه الـ routes: سطر fatal في اللوج والـ process بتقفل بـ exit code 1، و Docker أو PM2 يشغّلها تاني. لو الـ process كمّلت عادي، يبقى الـ handler بيسجّل بس ومش بيقفل.

ولو الـ 500 رجع فيه رسالة الـ TypeError أو stack، يبقى الـ handler بيبعت [[err.message]]. دي ثغرة تسريب معلومات.`,
          solCode: R`function shutdown(code) {
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 10_000).unref();
}`
        },
        {
          cmd: "streams في الانترفيو",
          title: "إزاي ترفع أو تنزّل ملف ٢ جيجا في Node؟ (streams & backpressure)",
          desc: R`مستحيل أقرا الملف كله في الذاكرة. بستخدم streams: الملف بيتقري ويتبعت حتة حتة، والذاكرة ثابتة مهما كان الحجم. وبوصّلهم بـ [[pipeline]] عشان الأخطاء والـ backpressure: لو الطرف اللي بيكتب أبطأ، القراية بتستنى بدل ما الحتت تتكوّم في الرام.

وللرفع الكبير جدًا، الأحسن إن الملف ميعدّيش على السيرفر خالص: signed upload URL والمتصفح يرفع لـ S3 مباشرة، والسيرفر ياخد إشعار لما يخلص.`,
          example: R`router.get("/files/:id/download", requireAuth, async (req, res) => {
  const file = await filesService.getMine(req.user.id, req.params.id);
  res.attachment(file.name);
  res.setHeader("Content-Length", file.size);
  await pipeline(createReadStream(file.path), res);
});`,
          try: R`اعمل ملف ١ جيجا ([[fallocate -l 1G big.bin]] أو [[dd]])، ونزّله مرة بـ [[res.send(await readFile(path))]] ومرة بالـ pipeline، وراقب الـ RSS بتاع السيرفر في الحالتين. وبعدين نزّله بـ curl بسرعة محدودة ([[--limit-rate 1M]]) وشوف الذاكرة بتعمل إيه مع pipeline.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الـ RAM محدودة وإن Node عنده أداة معمولة للمشكلة دي بالظبط. وبيفتح كلام عن backpressure، وده مفهوم كتير مبيعرفوهوش.",
            how: R`النقط: ٤ أنواع streams (Readable و Writable و Duplex و Transform). الـ backpressure: [[write()]] بيرجّع false لما البافر ([[highWaterMark]]) يتملى، والمفروض تستنى [[drain]]، و pipeline بيعمل ده لوحده. و [[.pipe()]] مبيمررش الأخطاء، فـ pipeline أو [[stream.promises.pipeline]].

في HTTP: [[req]] Readable و [[res]] Writable. فالرفع ممكن يتقري stream (busboy، أو multer بـ diskStorage) من غير ما يتجمّع في الرام. وفي الإنتاج: حد أقصى للحجم، و signed URL للملفات الكبيرة (درس [[signed upload URL]] في «تاب بناء مشروع كامل»)، ومعالجة بعد الرفع في queue.

والتفاصيل والتجربة بالأرقام في درس [[streams و pipeline]].`,
            when: R`أسئلة بعدها: «يعني إيه highWaterMark؟». «إزاي تعمل Transform بتحوّل CSV لـ JSON؟». «async iterators مع streams؟» ([[for await]]). «لو اليوزر قفل الاتصال في النص؟» (pipeline بيعمل destroy للكل، فالملف بيتقفل).`,
            mistakes: R`«بقرا الملف بـ readFile وأبعته» أو «بزوّد الرام». و [[multer.memoryStorage()]] للملفات الكبيرة. و pipe من غير error handling فملف واحد بايظ بيسيب file descriptors مفتوحة.`
          },
          lines: [
            "endpoint تنزيل ملف.",
            "هات بيانات الملف بتاع اليوزر ده بس.",
            "اسم الملف في Content-Disposition.",
            "الحجم عشان المتصفح يعرض progress.",
            "اقرا واكتب في الرد حتة حتة، والـ backpressure والإغلاق على pipeline.",
            "قفلة."
          ],
          sol: R`المتوقع: مع [[readFile]] الـ RSS بيطلع فوق ١ جيجا وقت كل تنزيل (ولو اتنين نزّلوا مع بعض، اتنين جيجا). ومع pipeline بيفضل ثابت تقريبًا (عشرات الميجا) مهما كان حجم الملف.

ومع [[--limit-rate 1M]]: الذاكرة لسه ثابتة، لأن الـ socket بطيء فبيرجّع false، و pipeline بيوقّف القراية لحد ما البافر يفضى. من غير backpressure، القراية كانت هتخلص في ثانية والجيجا كلها تتكوّم في الرام مستنية الشبكة.`,
          solCode: R`fallocate -l 1G big.bin
curl -s -o /dev/null --limit-rate 1M http://localhost:3000/files/1/download -H "Authorization: Bearer $TOKEN" &
while sleep 1; do ps -o rss= -p $(pgrep -f "node server") ; done`
        },
        {
          cmd: "graceful shutdown",
          title: "إزاي تعمل deploy من غير ما طلبات تضيع؟ (graceful shutdown)",
          desc: R`لما Docker أو Kubernetes أو PM2 عايزين يقفلوا النسخة القديمة، بيبعتوا SIGTERM، ولو مقفلتش في مدة (١٠ ثواني في Docker افتراضيًا) بيبعتوا SIGKILL.

على SIGTERM: ابطّل تقبل اتصالات جديدة ([[server.close()]])، وخلّي الـ health check يرجع 503 عشان الـ load balancer يبطّل يبعتلك، وسيب الطلبات اللي شغالة تخلص، واقفل الـ workers والـ queues والقاعدة و Redis، وبعدين اخرج. ومعاه timeout: لو معلّق أكتر من كذا، اخرج بالعافية.`,
          example: R`let shuttingDown = false;
app.get("/health", (req, res) => res.status(shuttingDown ? 503 : 200).json({ ok: !shuttingDown }));

process.on("SIGTERM", async () => {
  shuttingDown = true;
  logger.info("SIGTERM: draining");
  setTimeout(() => process.exit(1), 25_000).unref();
  server.close(async () => {
    await Promise.allSettled([worker.close(), db.$disconnect(), redis.quit()]);
    process.exit(0);
  });
});`,
          try: R`اعمل route بياخد ٥ ثواني، وابعتله طلب، وفي النص ابعت [[kill -TERM <pid>]]. الطلب كمّل؟ وطلب جديد بعد الـ SIGTERM اتقبل؟ جرّب نفس الحاجة من غير الـ handler.`,
          flag: "script",
          deep: {
            why: "كل deploy بيقفل نسخة. من غير إغلاق نضيف، كل deploy بيقطع طلبات شغالة (دفع في النص، أو رفع ملف)، ويسيب jobs نصها معمول، واتصالات قاعدة معلّقة. والسؤال بيبين إنك شغّلت تطبيق في الإنتاج مش على جهازك بس.",
            how: R`النقط: SIGTERM مش SIGKILL (التاني مفيش handler ليه). و [[server.close()]] بيوقّف قبول اتصالات جديدة ويستنى الموجودة، بس الـ keep-alive connections ممكن تفضل مفتوحة: [[server.closeIdleConnections()]] أو خلي Node الحديث يعملها. والـ health بـ 503 قبل الإغلاق بشوية عشان الـ load balancer يلحق يشيلك.

في Docker: [[CMD ["node", "server.js"]]] مش [[npm start]] (npm مبيوصّلش الـ signal دايمًا)، أو [[--init]]. والـ [[stop_grace_period]] أطول من الـ timeout بتاعك. وفي BullMQ [[worker.close()]] بيستنى الـ job الحالية. وفي Nest [[app.enableShutdownHooks()]].

التفاصيل والكود في درس «الإغلاق النضيف» في تاب «Node و npm».`,
            when: R`أسئلة بعدها: «الفرق بين SIGTERM و SIGKILL و SIGINT؟». «zero-downtime deploy إزاي؟» (rolling update + readiness + graceful shutdown). «websocket connections تعمل فيها إيه؟» (ابعت close للعميل عشان يعمل reconnect على نسخة تانية).`,
            mistakes: R`[[process.exit()]] على طول في SIGTERM. أو handler من غير timeout فالـ process تعلّق لحد SIGKILL. أو [[npm start]] كـ PID 1 في Docker فالـ signal مبيوصلش. ونسيان الـ workers والـ intervals فالـ process مبتخرجش لوحدها.`
          },
          lines: [
            "flag للحالة.",
            "الـ health يرجع 503 وانت بتقفل، فالـ load balancer يشيلك.",
            "لما SIGTERM يوصل...",
            "...علّم إنك بتقفل.",
            "سجّل.",
            "حد أقصى: لو معلّق ٢٥ ثانية اخرج بالعافية (و unref عشان ميمنعش الخروج الطبيعي).",
            "ابطّل تقبل اتصالات جديدة، ولما الموجودة تخلص...",
            "...اقفل الـ worker والقاعدة و Redis، حتى لو واحد فشل.",
            "اخرج بنجاح.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع الـ handler: الطلب الشغال كمّل ورجع 200 بعد الـ ٥ ثواني، وأي طلب جديد بعد الـ SIGTERM اترفض بـ connection refused (السيرفر بطّل يسمع)، والـ process خرجت بـ 0 بعد ما الطلب خلص.

من غير الـ handler: Node بيقفل فورًا على SIGTERM، والطلب الشغال بيقطع ([[curl: (52) Empty reply from server]]).

لو الـ process مخرجتش خالص مع الـ handler، يبقى فيه حاجة لسه مفتوحة (interval، أو اتصال keep-alive، أو client Redis)، والـ timeout هو اللي هيطلّعها بعد ٢٥ ثانية.`,
          solCode: R`app.get("/slow", async (req, res) => { await new Promise((r) => setTimeout(r, 5000)); res.json({ ok: true }); });
// ترمنال ١: node server.js
// ترمنال ٢: curl -s localhost:3000/slow & sleep 1; kill -TERM $(pgrep -f "node server.js"); wait
// {"ok":true}   والسيرفر خرج بعدها`
        }
      ]
    }
  ]
});
