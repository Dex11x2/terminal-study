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
          teach: R`## الفكرة في سطرين

المثال مش كود سيرفر، ده **اللي الواجهة بتعمله** مع السيرفر: طلبين بـ [[curl]]، واحد بيقرا المهام وواحد بيضيف مهمة. احنا هنا بنلعب دور الواجهة (React أو موبايل) بإيدنا من الترمنال، عشان تشوف الـ API «من برة» قبل ما تكتبه «من جوه».

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، وأوامر [[curl]] من Git Bash (curl 8.22). السيرفر اللي ورا الطلبات Express صغير هتكتبه بنفسك في درس [[express()]].

---

## ١. الطلب الأول: هات المهام

~~~bash
curl http://localhost:3000/api/tasks
~~~

### نفك العنوان حتة حتة

| الحتة | معناها |
|---|---|
| [[curl]] | برنامج بيبعت طلبات HTTP من الترمنال ويطبع الرد. اسمه من «Client URL» |
| [[http://]] | البروتوكول: HTTP عادي من غير تشفير (على جهازك مفيش داعي لـ HTTPS) |
| [[localhost]] | «الجهاز ده نفسه»، يعني السيرفر شغال عندك مش على النت |
| [[:3000]] | البورت: رقم الباب اللي برنامج Node مستني عليه. جهاز واحد ممكن يبقى عليه سيرفرات كتير، كل واحد على بورت |
| [[/api/tasks]] | المسار (path): أنهي «حاجة» عايزها. [[/api]] بادئة متعارف عليها تفصل الـ API عن صفحات الموقع، و [[tasks]] جمع لأنها قايمة |

ومن غير ما تكتب method، [[curl]] بيبعت **GET**، يعني «اقرا».

~~~text الناتج
[{"id":1,"title":"buy milk","done":false}]
~~~

### نقرا الرد

- القوسين المربعين [ و ] برة: **array**، يعني قايمة.
- [[{ }]] جوه القايمة: **object**، مهمة واحدة.
- [["id":1]] رقم المهمة، السيرفر هو اللي بيدّيه.
- [["title":"buy milk"]] نص بين علامتين تنصيص.
- [["done":false]] [[true]] أو [[false]] (boolean) من غير تنصيص.

ده **JSON** (JavaScript Object Notation): نص شكله زي objects جافاسكربت، وأي لغة تقدر تقراه. الواجهة بتاخده وتعمل [[JSON.parse]] (أو [[response.json()]]) وترسم المهام.

---

## ٢. الطلب التاني: ضيف مهمة

~~~bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"learn Express"}'
~~~

| الحتة | معناها |
|---|---|
| [[-X POST]] | [[-X]] يعني «استخدم الـ method دي». [[POST]] معناها «اعمل حاجة جديدة» |
| نفس العنوان [[/api/tasks]] | نفس القايمة. الفرق إن الـ method بقت POST، فالسيرفر يفهم «ضيف عليها» مش «اقراها» |
| [[-H "..."]] | [[-H]] من header: سطر معلومات زيادة مع الطلب |
| [[Content-Type: application/json]] | الـ header ده بيقول للسيرفر «الـ body اللي جاي JSON». من غيره Express مش هيقراه (درس [[express.json()]]) |
| [[-d '...']] | [[-d]] من data: ده الـ **body**، البيانات نفسها |
| [['{"title":"learn Express"}']] | الـ JSON. علامة التنصيص الواحدة [[']] بره عشان bash ميلعبش في الـ [["]] اللي جوه |

~~~text الناتج
{"id":2,"title":"learn Express","done":false}
~~~

لاحظ: احنا بعتنا [[title]] بس، والسيرفر رجّع المهمة **كاملة**: هو اللي حط [[id]] (٢ لأن فيه واحدة قبلها) و [[done: false]]. القرار عنده مش عند الواجهة، وده بالظبط معنى «السيرفر هو اللي بيقرر».

> لو كتبت [[-v]] مع الأمر ده، curl بيطبع ملاحظة [[Note: Unnecessary use of -X or --request, POST is already inferred.]]: لأن [[-d]] لوحده بيخلي الـ method POST. [[-X POST]] مش غلط، بس زيادة. هنسيبه في الأمثلة عشان الـ method يبان.

---

## ٣. على ويندوز

الأوامر دي مكتوبة لـ bash (Git Bash أو WSL أو لينكس أو الماك). في PowerShell فيه فرقين اتجرّبوا هنا:

### [[curl]] ولا [[curl.exe]]؟

في **Windows PowerShell 5.1** كلمة [[curl]] لوحدها اسم تاني (alias) لأمر [[Invoke-WebRequest]] مش البرنامج نفسه، فاكتب [[curl.exe]] دايمًا. في PowerShell 7 الـ alias اتشال، بس [[curl.exe]] بيشتغل في الاتنين.

### علامات التنصيص في الـ body

~~~powershell
curl.exe -s -X POST http://localhost:3000/api/tasks -H 'Content-Type: application/json' -d '{"title":"learn Express"}'
~~~

- في **PowerShell 7** (اتجرّب على pwsh): رجّع [[{"id":2,"title":"learn Express","done":false}]] عادي.
- في **Windows PowerShell 5.1**: نفس السطر رجّع صفحة HTML فيها [[SyntaxError: Expected property name or '}' in JSON at position 1]]. السبب إن 5.1 بيشيل علامات [["]] اللي جوه وهو بيبعت الـ arguments لبرنامج خارجي، فالسيرفر استلم [[{title:learn Express}]]. الحل هناك تكتبها [[\"]]: [['{\"title\":\"escaped\"}']]، أو تستخدم الأمر بتاع PowerShell نفسه:

~~~powershell
Invoke-RestMethod http://localhost:3000/api/tasks
Invoke-RestMethod -Method Post http://localhost:3000/api/tasks -ContentType 'application/json' -Body '{"title":"irm"}'
~~~

~~~text الناتج (PowerShell 7)
id title         done
-- -----         ----
 1 buy milk      False
 2 learn Express False
~~~

[[Invoke-RestMethod]] بيعمل [[JSON.parse]] لوحده ويعرض الرد كجدول، والـ array بقت صفوف.

---

## ٤. مين بيعمل إيه في الرحلة دي

| الخطوة | فين | بيحصل إيه |
|---|---|---|
| ١ | الواجهة (أو curl) | تبني طلب: method وعنوان و headers و body |
| ٢ | النت | الطلب يوصل لجهاز السيرفر على البورت |
| ٣ | Node | يقرا الطلب ويلاقي الكود المسؤول عن [[POST /api/tasks]] (route) |
| ٤ | الـ route | يتحقق من البيانات، ويحفظ (في الداتابيز بعدين)، ويقرر الـ id |
| ٥ | Node | يرجّع رد JSON |
| ٦ | الواجهة | تعرض المهمة الجديدة |

---

## الخلاصة

- الـ **API** هي قايمة الطلبات اللي السيرفر بيقبلها: كل طلب = method + عنوان، والرد JSON.
- **GET** تقرا، **POST** تضيف، ونفس العنوان [[/api/tasks]] بيعمل الاتنين حسب الـ method.
- الـ body بيتبعت مع [[-d]] ولازم معاه [[Content-Type: application/json]].
- السيرفر هو اللي بيقرر ([[id]] و [[done]])، والواجهة بتعرض وبس.
- على ويندوز: [[curl.exe]] مش [[curl]]، وفي PowerShell 5.1 الـ JSON محتاج [[\"]] أو [[Invoke-RestMethod]].`,
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
          teach: R`## هنتفرج على الطلب والرد زي ما هم

في الدرس اللي فات شفنا الـ body بس. هنا [[curl]] هيورينا **كل حاجة** اتبعتت ورجعت: الـ method، والعنوان، والـ headers، والـ status. اتشغّل على ويندوز 11 (Git Bash، curl 8.22) قصاد سيرفر Express 5.2.1 على Node 24.19، والسيرفر كان على بورت تاني غير ٣٠٠٠ فشلنا رقمه من الناتج.

---

## ١. [[curl -v]]: الطلب كله بالتفصيل

~~~bash
curl -v -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"learn HTTP"}'
~~~

الجديد هنا [[-v]] بس (من verbose، يعني «كتير الكلام»). الباقي نفس طلب الإضافة من الدرس اللي فات. الناتج طويل، فهنقسمه ٣ أنواع سطور حسب أول حرف:

| أول السطر | معناه |
|---|---|
| [[*]] | كلام curl نفسه: بيدوّر على السيرفر وبيتصل. مش جزء من HTTP |
| [[>]] | سطر **انت بعته** (الطلب) |
| [[<]] | سطر **رجعلك** (الرد) |

### سطور [[*]]: الاتصال

~~~text الناتج (جزء)
* Host localhost was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]...
* Established connection to localhost (::1 port ...)
~~~

[[localhost]] ليه عنوانين: [[::1]] (IPv6) و [[127.0.0.1]] (IPv4)، والاتنين معناهم «الجهاز ده». curl جرّب الأول ونجح. ده TCP: «خط» مفتوح بين curl والسيرفر، و HTTP كلام بيتكتب على الخط ده.

### سطور [[>]]: الطلب

~~~text الناتج
> POST /api/tasks HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.22.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 22
>
~~~

- **أول سطر** فيه ٣ حاجات: الـ method [[POST]]، والمسار [[/api/tasks]]، وإصدار البروتوكول [[HTTP/1.1]]. ده اللي Express بيعمل عليه الـ matching بتاع الـ route.
- [[Host]] اسم الموقع اللي انت طالبه (سيرفر واحد ممكن يخدم أكتر من دومين).
- [[User-Agent]] مين اللي باعت. المتصفح بيبعت اسمه ونسخته هنا.
- [[Accept: */*]] «أقبل أي نوع رد». [[*/*]] يعني أي نوع وأي شكل.
- [[Content-Type]] احنا اللي حطيناه بـ [[-H]].
- [[Content-Length: 22]] curl حسبه لوحده: طول الـ body بالـ byte. [[{"title":"learn HTTP"}]] فيه ٢٢ حرف بالظبط.
- **السطر الفاضي** [[>]] في الآخر: هو اللي بيقول «الـ headers خلصت، اللي جاي body».

### سطور [[<]]: الرد

~~~text الناتج
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Location: /api/tasks/3
< Content-Type: application/json; charset=utf-8
< Content-Length: 42
< ETag: W/"2a-/WzdITHpJz2/xfRNxboVPCyx6F0"
< Date: Wed, 07 Oct 2026 07:42:53 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
{"id":3,"title":"learn HTTP","done":false}
~~~

| السطر | معناه |
|---|---|
| [[HTTP/1.1 201 Created]] | **الـ status line**: الإصدار، والرقم [[201]]، واسمه [[Created]] («اتعمل») |
| [[X-Powered-By: Express]] | Express بيعرّف نفسه. بيتشال بعدين بـ helmet عشان متقولش للمهاجم انت بتستخدم إيه |
| [[Location: /api/tasks/3]] | عنوان المهمة اللي لسه اتعملت. السيرفر حطه بـ [[res.location()]] |
| [[Content-Type: application/json; charset=utf-8]] | الرد JSON، والحروف بترميز UTF-8 (عشان العربي يوصل سليم) |
| [[Content-Length: 42]] | طول الـ body بالـ byte |
| [[ETag]] | «بصمة» للرد. لو الـ body اتكرر نفس البصمة، والمتصفح يقدر يسأل «اتغير؟» بدل ما ينزّله تاني |
| [[Date]] | وقت الرد بتوقيت GMT |
| [[Connection: keep-alive]] و [[Keep-Alive: timeout=5]] | سيب الخط مفتوح ٥ ثواني لو هتبعت طلب تاني، بدل ما تفتح اتصال جديد |

وبعد السطر الفاضي: الـ body، المهمة رقم ٣.

> وفيه سطر زيادة هتلاقيه في الأول: [[Note: Unnecessary use of -X or --request, POST is already inferred.]] curl بيقولك إن [[-d]] لوحده كان كفاية يخلي الطلب POST.

---

## ٢. [[curl -i]]: الرد بس من غير الطلب

~~~bash
curl -i http://localhost:3000/api/tasks/999
~~~

[[-i]] (من include) بيطبع الـ status والـ headers بتاعة **الرد** فوق الـ body، من غير سطور [[*]] و [[>]]. أنضف لما يهمك الرد بس.

~~~text الناتج
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-D4dsL3U5Autp3bKNpxD/le70vNM"
Date: Wed, 07 Oct 2026 07:42:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Task not found"}
~~~

مفيش مهمة رقم ٩٩٩، فالسيرفر رجّع [[404 Not Found]]، والـ body JSON فيه السبب. الواجهة بتبص على الـ **رقم** الأول وتقرر، والرسالة للبني آدم.

---

## ٣. [[-v]] و [[-i]] قصاد بعض

| الفلاج | بيطبع | إمتى |
|---|---|---|
| من غيرهم | الـ body بس | عايز البيانات |
| [[-i]] | status + headers الرد + body | عايز تتأكد من الـ status أو header زي [[Location]] |
| [[-v]] | سطور [[*]] + الطلب [[>]] + الرد [[<]] + body | حاجة مش شغالة ومش عارف العيب في الطلب ولا في الرد |
| [[-s]] | بيسكّت شريط التقدم ورسايل الأخطاء | في السكربتات |

---

## ٤. نفس الكلام على API حقيقي

الـ try بيقولك جرّب [[curl -v https://api.github.com]]. ده جزء من الناتج الحقيقي:

~~~text الناتج (جزء)
> GET / HTTP/1.1
> Host: api.github.com
> User-Agent: curl/8.22.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< X-RateLimit-Limit: 60
< X-RateLimit-Remaining: 58
< X-RateLimit-Used: 2
< Access-Control-Allow-Origin: *
~~~

- من غير [[-X]] الـ method [[GET]].
- [[X-RateLimit-Limit: 60]] و [[Remaining: 58]]: من غير login ليك ٦٠ طلب في الساعة، فاضلك ٥٨. ده rate limiting، هتعمله بنفسك بعدين.
- [[Access-Control-Allow-Origin: *]] ده CORS: «أي موقع يقدر يكلّمني من المتصفح».
- هنا طلع [[HTTP/1.1 200 OK]]. على أجهزة تانية هيطلع [[HTTP/2 200]]، وده نفس المعنى بإصدار أحدث (ونسخة curl دي اتفقت مع GitHub على 1.1).

وعنوان يوزر مش موجود:

~~~bash
curl -s https://api.github.com/users/this-user-does-not-exist-xyz
~~~

~~~text الناتج
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest",
  "status": "404"
}
~~~

الـ body ده JSON عادي ممكن تفتكره نجاح لو مبصّتش على الـ status. بـ [[-i]] أو [[-w "%{http_code}"]] هتشوف [[404]].

---

## الخلاصة

~~~text
الطلب   method  مسار  إصدار     +  headers  +  سطر فاضي  +  body
الرد    إصدار   status  اسمه    +  headers  +  سطر فاضي  +  body
~~~

- [[-v]] للطلب والرد كاملين، و [[-i]] للرد بس.
- [[>]] انت بعته، و [[<]] رجعلك، و [[*]] كلام curl.
- الـ status أول رقم في الرد، وهو اللي الواجهة بتقرر عليه، مش الـ body.
- [[Content-Type]] في الطلب بيقول للسيرفر يقرا الـ body إزاي، وفي الرد بيقول للواجهة.`,
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
          teach: R`## سيرفر كامل في ١٢ سطر

الملف ده سيرفر حقيقي بيرد على [[GET /api/tasks]] بقايمة المهام، وأي حاجة تانية بـ 404، من غير ولا مكتبة من npm. اتشغّل على ويندوز 11 بـ Node 24.19، والطلبات بـ curl من Git Bash (على بورت تاني غير ٣٠٠٠، والناتج نفسه).

---

## ١. [[import { createServer } from "node:http";]]

- [[import]] بيجيب حاجة من موديول تاني. ده شكل ES Modules، وعشان يشتغل في ملف [[.js]] لازم [["type": "module"]] في package.json (ده اللي [[npm pkg set type=module]] بيعمله).
- [[{ createServer }]] الأقواس معناها «هات الدالة اللي اسمها كده بالظبط» من جوه الموديول، مش الموديول كله.
- [["node:http"]] موديول HTTP اللي جاي مع Node. [[node:]] في الأول بتأكد إنه من Node نفسه مش باكدج اسمه [[http]] من npm.

لو نسيت [[type=module]]، ده اللي بيحصل (اتجرّب بـ package.json فيه [["type": "commonjs"]]، وده اللي [[npm init -y]] بيكتبه):

~~~text الناتج
(node:4116) Warning: Failed to load the ES module: ...\server.js. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
...\server.js:1
import { createServer } from "node:http";
^^^^^^

SyntaxError: Cannot use import statement outside a module
~~~

---

## ٢. [[const tasks = [ ... ];]]

~~~text
const tasks = [{ id: 1, title: "buy milk", done: false }];
~~~

array فيها مهمة واحدة، عايشة في الذاكرة (RAM). يعني لو السيرفر وقف وقام، أي حاجة اتضافت تضيع. ده مؤقت لحد درس قاعدة البيانات.

---

## ٣. [[createServer((req, res) => { ... })]]

[[createServer]] بياخد **دالة**، و Node بينادي الدالة دي مع **كل طلب** بيوصل. الدالة بتستلم حاجتين:

| الاسم | النوع الحقيقي | فيه إيه |
|---|---|---|
| [[req]] (request) | [[IncomingMessage]] | الطلب: [[req.method]] و [[req.url]] و [[req.headers]]، والـ body كـ stream |
| [[res]] (response) | [[ServerResponse]] | الرد اللي انت بتكتبه: [[writeHead]] و [[write]] و [[end]] |

و [[=>]] ده arrow function: دالة من غير كلمة [[function]]. والسيرفر نفسه بيترجع في [[server]]، بس لسه مش بيسمع على أي بورت.

---

## ٤. [[if (req.method === "GET" && req.url === "/api/tasks")]]

- [[req.method]] نص زي [["GET"]] أو [["POST"]]، دايمًا كابيتال.
- [[req.url]] كل اللي بعد الدومين: المسار **و** الـ query مع بعض.
- [[===]] مقارنة بالظبط، و [[&&]] «و»: الاتنين لازم يبقوا صح.

ده الـ «routing» كله: انت بتقارن بإيدك. Express بيعمل نفس المقارنة بس بشكل أشيك.

---

## ٥. [[res.writeHead(200, { "Content-Type": "application/json" })]]

بيكتب **أول سطر في الرد والـ headers**: الـ status [[200]] (تمام)، و header بيقول الـ body JSON. لازم يحصل قبل أي body.

---

## ٦. [[return res.end(JSON.stringify(tasks));]]

ده سطر فيه ٣ حاجات، من جوه لبرة:

1. [[JSON.stringify(tasks)]] بيحوّل الـ array لنص: [['[{"id":1,"title":"buy milk","done":false}]']]. الشبكة بتنقل نصوص و bytes، مش objects.
2. [[res.end(...)]] بيبعت النص ده كـ body **ويقفل الرد**. من غير [[end]] الـ curl يفضل مستني لحد ما يقطع.
3. [[return]] بيخرج من الدالة عشان السطور اللي تحت (بتاعة 404) متشتغلش. جرّبنا نشيله: curl استلم المهام عادي، بس بعدها الكود كمّل لـ [[writeHead(404)]] على رد اتبعت خلاص، والسيرفر كله وقع وخرج بكود 1:

~~~text الناتج في ترمنال السيرفر
node:_http_server:408
    throw new ERR_HTTP_HEADERS_SENT('write');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot write headers after they are sent to the client
~~~

---

## ٧. السطرين بتوع الـ 404

~~~text
res.writeHead(404, { "Content-Type": "application/json" });
res.end(JSON.stringify({ error: "Not found" }));
~~~

أي طلب مدخلش الـ if: method تاني أو عنوان تاني. نفس الخطوتين بـ status [[404]] و object فيه رسالة.

---

## ٨. [[server.listen(3000, () => console.log(...))]]

بيقول لـ Node: «افتح البورت ٣٠٠٠ واستنى طلبات». الدالة التانية بتتنادى **بعد** ما البورت يتفتح فعلًا، فبتطبع العنوان:

~~~text الناتج في ترمنال السيرفر
http://localhost:3000
~~~

والبرنامج **مبيخلصش**: فاضل شغال طول ما فيه سيرفر بيسمع. بتوقفه بـ Ctrl+C.

---

## ٩. نجرّب

~~~bash
curl -i localhost:3000/api/tasks
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json
Date: Wed, 07 Oct 2026 07:45:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

[{"id":1,"title":"buy milk","done":false}]
~~~

قارنه بـ Express بعدين: هنا مفيش [[charset=utf-8]] (احنا مكتبناهوش)، ومفيش [[Content-Length]]. بدله [[Transfer-Encoding: chunked]]، يعني Node بعت الـ body على أجزاء من غير ما يقول طوله مقدمًا، لأننا محسبناهوش.

~~~bash
curl -i "localhost:3000/api/tasks?x=1"
~~~

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: application/json
...

{"error":"Not found"}
~~~

نفس المسار بس رجّع 404! لأن [[req.url]] هنا [["/api/tasks?x=1"]] كله، و [[===]] بتقارنه بـ [["/api/tasks"]] فبتفشل. والـ [[" "]] حوالين العنوان في bash عشان [[?]] و [[&]] ليهم معنى عند الـ shell. وأي method تاني زي [[curl -X POST]] برضه 404.

---

## ١٠. الحل (solCode): نفصل المسار عن الـ query

| السطر | بيعمل إيه |
|---|---|
| [[new URL(req.url, "http://localhost")]] | [[URL]] بيفك العنوان لأجزاء. محتاج عنوان كامل، فبنديله أساس وهمي لأن [[req.url]] بيبدأ بـ [[/]] |
| [[const { pathname, searchParams } = ...]] | destructuring: خد خانتين من الـ object. [[pathname]] المسار بس، و [[searchParams]] الـ query |
| [[const send = (status, data) => {...}]] | دالة صغيرة بتعمل writeHead و end مرة واحدة بدل ما نكررهم |
| [[pathname.match(/^\/api\/tasks\/(\d+)$/)]] | regex: [[^]] أول النص، [[\/]] شرطة، [[(\d+)]] رقم أو أكتر ومحفوظ، [[$]] آخر النص |
| [[Number(m[1])]] | العنصر رقم ١ في [[m]] هو اللي اتمسك جوه القوسين، لسه نص، فبنحوّله رقم |
| [[task ? send(200, task) : send(404, ...)]] | [[? :]] if قصيرة: لو لقيتها رجّعها، وإلا 404 |
| [[Object.fromEntries(searchParams)]] | بيحوّل الـ query لـ object عادي عشان يتطبع |

~~~text الناتج
curl localhost:3000/api/tasks/1          {"id":1,"title":"buy milk","done":false}
curl localhost:3000/api/tasks/7          {"error":"Task not found"}
curl "localhost:3000/api/tasks?x=1"      [{"id":1,"title":"buy milk","done":false}]
curl "localhost:3000/nope?a=1&b=2"       {"error":"Not found","query":{"a":"1","b":"2"}}
~~~

---

## الخلاصة

| اللي عملته بإيدك هنا | اللي Express هيعمله عنك |
|---|---|
| [[if (req.method === ... && req.url === ...)]] | [[app.get("/api/tasks", ...)]] |
| [[new URL(...).searchParams]] | [[req.query]] |
| regex لـ [[/api/tasks/(\d+)]] | [[/api/tasks/:id]] و [[req.params]] |
| [[writeHead]] + [[JSON.stringify]] + [[end]] | [[res.json(data)]] |
| تجمع الـ body من الـ stream بنفسك | [[express.json()]] |

- [[req.url]] فيه الـ query، فمتقارنوش بـ [[===]].
- كل رد لازم يخلص بـ [[res.end()]]، و [[return]] بعده عشان متردش مرتين.`,
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
          teach: R`## نفس سيرفر [[node:http]]، بنص الكود

الملف ده بيعمل نفس اللي عملناه بإيدنا في الدرس اللي فات: [[GET /api/tasks]] يرجّع المهام. الفرق إن Express بيعمل المقارنة والـ headers والتحويل لـ JSON عنك. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 (وللمقارنة Express 4.22.3 في فولدر لوحده)، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

قبل أي حاجة، في فولدر المشروع:

~~~bash
npm i express
npm pkg set type=module
~~~

الأول بينزّل Express (النسخة 5 دلوقتي) في [[node_modules]] ويكتبه في package.json، والتاني بيخلي [[import]] يشتغل.

---

## ١. [[import express from "express";]]

من غير أقواس [[{ }]] المرة دي: ده الـ **default export**، يعني الحاجة الأساسية اللي الموديول بيصدّرها، وهنا دالة اسمها [[express]]. واسم [["express"]] من غير [[node:]] ولا [[./]] معناه باكدج من [[node_modules]].

## ٢. [[const app = express();]]

بننادي الدالة فترجّع **app**: ده التطبيق بتاعك. كل الـ routes والـ middleware بتتسجّل عليه. ومن جوه، [[app]] نفسه دالة [[(req, res)]] عادية زي اللي كنا بنديها لـ [[createServer]].

## ٣. [[tasks]]

نفس البيانات في الذاكرة.

## ٤. [[app.get("/api/tasks", (req, res) => { ... })]]

ده «route». اقراه كده:

> «لو جالك طلب **GET** على المسار **/api/tasks** بالظبط، نادي الدالة دي.»

| الحتة | معناها |
|---|---|
| [[app.get]] | الـ method. وفيه [[app.post]] و [[app.patch]] و [[app.delete]] |
| [["/api/tasks"]] | المسار. Express بيقارنه بالمسار بس، من غير الـ query |
| [[(req, res) => {...}]] | الـ handler: نفس [[req]] و [[res]] بتوع Node، بس Express زوّد عليهم دوال |

## ٥. [[res.json(tasks);]]

سطر واحد بدل ٣:

| بإيدك في [[node:http]] | [[res.json]] بيعمله لوحده |
|---|---|
| [[JSON.stringify(tasks)]] | آه |
| [[writeHead(200, { "Content-Type": ... })]] | آه، و 200 هو الافتراضي |
| [[res.end(...)]] | آه |
| [[Content-Length]] و [[ETag]] | بيحسبهم كمان |

## ٦. [[app.listen(3000, (err) => { ... })]]

بيفتح البورت. ومن جوه بيعمل [[http.createServer(app).listen(3000)]]، يعني نفس اللي عملناه بإيدنا.

الدالة اللي بعد البورت (callback) في **Express 5** بتتنادى في الحالتين:

- البورت اتفتح: [[err]] بيبقى [[undefined]]، فالـ if مبيعملش حاجة، وبنطبع [[API on http://localhost:3000]].
- البورت مقدرش يتفتح: [[err]] فيه الخطأ، و [[throw err]] بيوقّع البرنامج برسالة واضحة.

---

## ٧. نجرّب

~~~bash
node server.js
~~~

~~~text الناتج
API on http://localhost:3000
~~~

وفي ترمنال تاني:

~~~bash
curl -i "localhost:3000/api/tasks?x=1"
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-SNMrx0xIFmoyhuUGd04fr93YLHc"
Date: Wed, 07 Oct 2026 07:46:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"buy milk","done":false}]
~~~

قارنه بناتج [[node:http]]:

- [[?x=1]] **اشتغل** المرة دي: Express طابق المسار بس، وحط [[x]] في [[req.query]].
- [[charset=utf-8]] اتزاد لوحده.
- [[Content-Length: 42]] بدل [[Transfer-Encoding: chunked]]: Express حسب طول الـ body (الـ JSON ده ٤٢ حرف). و [[2a]] في الـ ETag هو ٤٢ بالـ hex.
- [[X-Powered-By: Express]] Express بيعرّف نفسه، وده هيتشال بـ helmet.

---

## ٨. نسختين على نفس البورت

شغّل [[node server.js]] في ترمنال تاني والأول لسه شغال:

~~~text الناتج (Express 5)
file:///.../server.js:11
  if (err) throw err;
           ^

Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:2167:16)
    ...
  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 3000
}

Node.js v24.19.0
~~~

- [[EADDRINUSE]] = Error ADDRess IN USE: البورت محجوز لبرنامج تاني.
- [[:::3000]] أول [[::]] يعني «كل العناوين» بصيغة IPv6، وبعدها [[:3000]] البورت.
- السهم [[^]] تحت [[throw err]]: الخطأ وصل للـ callback بتاعنا فعلًا، واحنا اللي رميناه. والبرنامج خرج بكود [[1]] (فشل).
- [[errno: -4091]] رقم الخطأ على ويندوز. على لينكس الرقم مختلف، بس [[code]] واحد.

### نفس الكود على Express 4

~~~text الناتج (Express 4.22.3)
node:events:487
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::3000
...
Emitted 'error' event on Server instance at:
~~~

هنا الخطأ **موصلش** للـ callback: الـ [[^]] تحت سطر جوه Node نفسه ([[node:events]])، والرسالة [[Unhandled 'error' event]]. في Express 4 الـ callback بيتنادى بس لو الـ listen نجح، والخطأ بيطلع event على الـ server ومحدش سامعه. الاتنين بيخرجوا بكود 1، بس في 5 انت اللي ماسك الخطأ وتقدر تتصرف فيه.

ولو عايز تعرف انت على أنهي نسخة:

~~~bash
npm ls express
~~~

~~~text الناتج
$__bt-- express@5.2.1
~~~

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[import express from "express"]] | هات Express من [[node_modules]] |
| [[const app = express()]] | اعمل التطبيق |
| [[app.get(path, handler)]] | سجّل route لـ GET على المسار ده |
| [[res.json(data)]] | stringify + Content-Type + status 200 + end |
| [[app.listen(port, (err) => ...)]] | افتح البورت. في Express 5 الخطأ بيوصل لـ [[err]] |

- Express مبني فوق [[node:http]] مش بداله.
- المسار بيتقارن من غير الـ query، فـ [[?x=1]] مبيأثرش على الـ route.`,
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
    }
  ]
});
