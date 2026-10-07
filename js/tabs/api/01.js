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
          teach: R`## دالتين بنفس الشكل، وشغلانتين مختلفتين

المثال فيه middleware بيسجّل كل طلب ([[logger]])، و middleware بيقفل route على اللي معاه مفتاح ([[requireApiKey]])، وبعدين بنركّبهم. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## الشكل اللي لازم تحفظه

~~~text
function اسم(req, res, next) {
  ...
  next();   أو   return res.status(...).json(...);
}
~~~

أي middleware بياخد ٣ حاجات: الطلب، والرد، و [[next]] (دالة Express مدّيهالك، لما تناديها بيعدّي الطلب للي بعدك). وفي الآخر لازم يعمل **واحدة من اتنين**: يرد ويقفل، أو ينادي [[next()]].

---

## ١. الـ logger

### [[const start = Date.now();]]

[[Date.now()]] الوقت دلوقتي بالـ millisecond (رقم كبير بيعد من سنة ١٩٧٠). بنحفظه عشان نطرح منه بعدين.

### [[res.on("finish", () => { ... })]]

- [[res]] بيطلع **events** (أحداث)، و [[.on(اسم, دالة)]] معناها «لما الحدث ده يحصل نادي الدالة دي».
- [["finish"]] بيحصل بعد ما الرد يتبعت كله.

ليه مش نطبع على طول؟ لأن دلوقتي لسه محدش رد، فـ [[res.statusCode]] لسه مش معروف. احنا بنسجّل «ابقى فكّرني لما يخلص».

### [[console.log(req.method, req.originalUrl, res.statusCode, Date.now() - start + "ms")]]

| الحتة | مثال |
|---|---|
| [[req.method]] | [[GET]] |
| [[req.originalUrl]] | [[/api/admin/stats]]، العنوان الكامل بالـ query |
| [[res.statusCode]] | [[200]]، الرقم اللي اتبعت فعلًا |
| [[Date.now() - start + "ms"]] | المدة: الطرح الأول، وبعدين [[+ "ms"]] بيلزقها في نص |

### [[next();]]

الـ logger مش بيرد، فلازم يعدّي الطلب. والسطر ده بيتنفذ **قبل** الـ finish (اللي هيحصل بعدين).

---

## ٢. [[requireApiKey]]

~~~text
if (!process.env.API_KEY || req.get("x-api-key") !== process.env.API_KEY) return res.status(401).json({ error: "Bad key" });
next();
~~~

- [[process.env.API_KEY]] متغير بيئة: المفتاح الصح، مش مكتوب في الكود.
- [[req.get("x-api-key")]] بيقرا header من الطلب. الاسم مش حساس لحروف كبيرة وصغيرة. و [[x-]] في الأول عادة قديمة لـ headers مش رسمية.
- الشرط الأول [[!process.env.API_KEY]]: لو المتغير مش متظبط، ارفض الكل. من غيره، طلب من غير header هيبقى [[undefined !== undefined]] = [[false]]، فيعدّي!
- لو الشرط صح: [[return]] رد 401، ومفيش [[next]]، فالـ handler عمره ما بيشتغل.
- لو الاتنين تمام: [[next()]].

---

## ٣. التركيب

| السطر | معناه |
|---|---|
| [[app.use(logger)]] | شغّله على **كل** الطلبات، أي method وأي عنوان |
| [[app.get("/api/admin/stats", requireApiKey, handler)]] | على الـ route ده بس: [[requireApiKey]] الأول، ولو نادى [[next]] يشتغل الـ handler |

فطلب [[GET /api/admin/stats]] بيمشي كده:

~~~text
logger  ->  requireApiKey  ->  handler
  next()       next() أو 401      res.json
~~~

---

## ٤. نجرّب

شغّلنا السيرفر والمتغير متظبط. في Git Bash:

~~~bash
API_KEY=s3cret node server.js
~~~

[[API_KEY=s3cret]] قبل الأمر بيحط المتغير للأمر ده بس. في PowerShell بيبقى سطرين: [[$env:API_KEY = "s3cret"]] وبعدين [[node server.js]].

~~~bash
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats -H "x-api-key: s3cret"
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats -H "x-api-key: wrong"
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats
curl -s -w " [%{http_code}]\n" localhost:3000/nope
~~~

~~~text الناتج
{"tasks":1} [200]
{"error":"Bad key"} [401]
{"error":"Bad key"} [401]
<!DOCTYPE html>... [404]
~~~

~~~text الناتج في ترمنال السيرفر (الـ logger)
GET /api/admin/stats 200 5ms
GET /api/admin/stats 401 1ms
GET /api/admin/stats 401 1ms
GET /nope 404 2ms
~~~

- الـ logger سجّل **حتى** الـ 401 والـ 404، لأنه متركّب على الكل وبيسجّل بعد الـ finish.
- المدة بالـ ms هتختلف عندك، وأول طلب بعد التشغيل غالبًا أبطأ شوية.

ومن غير [[API_KEY]] خالص (شغّلنا [[node server.js]] بس)، **التلات طلبات** رجعوا [[401]]، حتى اللي معاه [[s3cret]]. ده الشرط الأول بيشتغل.

### من PowerShell

~~~powershell
Invoke-RestMethod http://localhost:3000/api/admin/stats -Headers @{ 'x-api-key' = 's3cret' }
~~~

~~~text الناتج (pwsh 7 و Windows PowerShell 5.1)
tasks
-----
    1
~~~

[[-Headers @{ ... }]] بياخد hashtable: [[@{ اسم = قيمة }]]. ومن غير المفتاح، [[Invoke-RestMethod]] بيرمي خطأ على الـ 401 (عكس [[fetch]])، وجواه [[{"error":"Bad key"}]].

---

## ٥. لو نسيت [[next()]]

شلنا [[next()]] من الـ logger بس:

~~~bash
curl -m 3 localhost:3000/api/admin/stats -H "x-api-key: s3cret"
~~~

~~~text الناتج
curl: (28) Operation timed out after 3004 milliseconds with 0 bytes received
~~~

- [[-m 3]] أقصى وقت ٣ ثواني، وإلا curl يقطع. [[(28)]] رقم خطأ الـ timeout في curl.
- ولا سطر اتطبع في اللوج: محدش رد، فـ [[finish]] محصلش.

الطلب وقف عند الـ logger: لا رد ولا عدّى. ده أشهر سبب لـ «الطلب معلّق».

---

## الخلاصة

| middleware | بيعمل إيه | بينادي [[next]]؟ |
|---|---|---|
| [[logger]] | يسجّل بعد ما الرد يخلص | دايمًا |
| [[requireApiKey]] | يتأكد من المفتاح | لو صح بس، وإلا يرد 401 |

- كل middleware: يا يرد، يا [[next()]]. مفيش تالت.
- [[app.use(fn)]] على الكل، و [[app.get(path, fn, handler)]] على route واحد.
- [[return res...]] عشان متكمّلش بعد الرد.`,
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
          teach: R`## الملف ده هو «مسار» كل طلب

المثال مفيهوش كود جديد، فيه **ترتيب**: ١٢ سطر بيقولوا كل طلب هيعدّي على إيه وبأنهي ترتيب. Express بيمشي عليهم من فوق لتحت، وأول واحد يرد بيقفل الرحلة. عشان نجرّبه بجد، شغّلناه على ويندوز 11 (Node 24.19، Express 5.2.1، helmet 8.3، cors 2.8) والحاجات اللي لسه مالهاش درس عملناها نسخ صغيرة: [[requireAuth]] بيقبل أي header [[Authorization]]، و [[loginLimiter]] بيعدّي على طول، والـ routers فيها route أو اتنين.

---

## ١. السطور واحد واحد

| # | السطر | بيعمل إيه | ليه هنا |
|---|---|---|---|
| ١ | [[app.use(helmet())]] | يحط security headers على كل رد | الأول، عشان حتى ردود 401 و 404 تاخدها |
| ٢ | [[app.use(cors(corsOptions))]] | يقول للمتصفح مين مسموحله يكلّم الـ API | قبل الـ auth، عشان طلب الـ preflight يترد من غير توكن |
| ٣ | [[app.use(express.json())]] | يقرا الـ body | قبل أي route محتاج [[req.body]] |
| ٤ | [[app.use(requestLogger)]] | يسجّل كل طلب | قبل الـ routes عشان يشوفهم كلهم |
| ٥ | [[app.use("/api/auth/login", loginLimiter)]] | حد للمحاولات على login بس | قبل route الـ login نفسه |
| ٦ | [[app.get("/health", healthCheck)]] | «السيرفر عايش؟» | قبل أي auth |
| ٧ | [[app.use("/api/auth", authRouter)]] | login و register | من غير توكن، طبعًا |
| ٨ | [[app.use("/api/tasks", requireAuth, tasksRouter)]] | المهام | [[requireAuth]] قبل الـ router، فكل المهام محمية |
| ٩ | [[app.use(notFound)]] | 404 بـ JSON | بعد كل الـ routes: لو وصل هنا يبقى محدش رد |
| ١٠ | [[app.use(errorHandler)]] | يرد على أي خطأ | آخر حاجة، بـ ٤ arguments |

و [[app.use(path, ...)]] بيطابق أي عنوان **بيبدأ** بالـ path، فـ [[/api/tasks]] و [[/api/tasks/5]] الاتنين بيدخلوا سطر ٨.

---

## ٢. نشوف أثر كل سطر

### helmet و cors على رد عادي

~~~bash
curl -si localhost:3000/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';...
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 11

{"ok":true}
~~~

- كل السطور من [[Content-Security-Policy]] لـ [[X-XSS-Protection]] من helmet (تفاصيلها في درس [[helmet]]). ولاحظ إن [[X-Powered-By: Express]] **اختفى**.
- [[Access-Control-Allow-Origin]] من cors، وقيمته الـ origin اللي في [[corsOptions]] (احنا حطيناه [[http://localhost:5173]]، بورت Vite).

### باقي الطلبات

~~~text الناتج
GET  /api/tasks                         {"error":"Login required"}   [401]
POST /api/tasks  + Authorization        {"title":"t"}                [201]
POST /api/auth/login                    {"token":"t","body":{"email":"a@b.c"}}  [200]
GET  /nope                              {"error":"Route not found"}  [404]
POST /api/tasks  body: {bad             {"error":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"}  [400]
~~~

- [[/api/tasks]] من غير توكن: [[requireAuth]] رد 401، والـ router مشتغلش.
- [[/api/auth/login]] اشتغل من غير توكن لأنه في router تاني مش وراه [[requireAuth]].
- [[/nope]] ملقاش route فنزل لحد [[notFound]].
- الـ JSON البايظ: [[express.json()]] (سطر ٣) رمى خطأ، و Express **قفز** على كل اللي بعده لحد [[errorHandler]]، اللي رجّع JSON بدل صفحة HTML.

وده لوج الطلبات:

~~~text الناتج في ترمنال السيرفر
GET /health 200
GET /api/tasks 401
POST /api/tasks 201
POST /api/auth/login 200
GET /nope 404
~~~

خمس سطور لـ ٦ طلبات: طلب الـ JSON البايظ **مش متسجّل**! لأن الخطأ حصل في سطر ٣ والـ logger في سطر ٤، فالقفزة للـ errorHandler عدّت من فوقه. لو عايز اللوج يمسك كل حاجة، حطه قبل [[express.json()]]. يعني الترتيب مش بيأثر على الردود بس، بيأثر على اللي انت شايفه.

### الـ preflight

~~~bash
curl -si -X OPTIONS localhost:3000/api/tasks -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: POST"
~~~

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin, Access-Control-Request-Headers
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
~~~

المتصفح قبل [[POST]] بـ JSON من موقع تاني بيبعت [[OPTIONS]] يسأل «مسموحلي؟». cors (سطر ٢) رد 204 بنفسه قبل ما الطلب يوصل لـ [[requireAuth]]. لو cors كان تحت الـ auth، الـ preflight (اللي مبيبعتش توكن أصلًا) كان هياخد 401 والمتصفح يرفض الطلب الحقيقي.

---

## ٣. التجربتين بتوع الـ try

### [[express.json()]] تحت الـ routes

~~~text الناتج
POST /api/tasks  + Authorization + {"title":"t"}   {}                [201]
POST /api/auth/login + {"email":"a@b.c"}             {"token":"t"}     [200]
POST /api/tasks  body: {bad  (من غير توكن)            {"error":"Login required"}  [401]
~~~

- الـ route رد قبل ما الـ body يتقري، فـ [[req.body?.title]] بقى [[undefined]]، و [[{ title: undefined }]] بيتحول لـ [[{}]] في JSON (المفاتيح اللي قيمتها undefined بتتشال).
- و [[body]] اختفى من رد الـ login لنفس السبب.
- والـ JSON البايظ بقى 401 مش 400: [[requireAuth]] رد قبل ما حد يحاول يقرا الـ body.

### [[notFound]] فوق كل حاجة

~~~text الناتج
GET /health        {"error":"Route not found"} [404]
GET /api/tasks     {"error":"Route not found"} [404]
...كله 404، حتى الـ OPTIONS
~~~

[[notFound]] بيرد على أي حاجة ومبينادي [[next()]]، فمحدش تحته اشتغل، واللوج نفسه فضي.

---

## الخلاصة

~~~text
security (helmet, cors)
   parsing (json)
      logging
         limiters
            routes (health, auth, المحمي)
               notFound
                  errorHandler
~~~

- اسأل عن كل سطر: «لازم يشتغل قبل مين؟».
- الخطأ بيقفز لأول error handler تحته، ويعدّي من فوق أي middleware عادي في الطريق (حتى الـ logger).
- [[notFound]] و [[errorHandler]] آخر سطرين دايمًا.`,
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
          teach: R`## ملف لكل resource

المثال ملفين: [[routes/tasks.routes.js]] فيه كل routes المهام على «app صغير» اسمه router، وسطر واحد في [[app.js]] بيركّب الـ router ده على [[/api/tasks]]. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، بفولدر فيه [[app.js]] و [[routes/]] و [[controllers/]]، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## ١. [[import { Router } from "express";]]

[[Router]] دالة جوه Express بتعمل router جديد. بالأقواس لأنها named export (Express بيصدّرها باسمها جنب الـ default).

## ٢. [[import * as tasks from "../controllers/tasks.controller.js";]]

- [[* as tasks]] معناها «هات **كل** اللي الملف ده بيصدّره، وحطه في object واحد اسمه [[tasks]]». فلو الملف فيه [[export const list = ...]] و [[export const create = ...]]، تبقى [[tasks.list]] و [[tasks.create]].
- [[../]] يعني «اطلع فولدر لفوق»: احنا في [[routes/]]، والـ controller في [[controllers/]] جنبه.
- [[.js]] في آخر المسار **لازم** في ES Modules على Node. من غيرها Node مبيلاقيش الملف.

الـ controller اللي جربنا بيه بسيط، كل دالة فيه [[(req, res) => ...]]، و [[getOne]] بيرجّع شوية معلومات عن العنوان (هتلاقيها تحت).

## ٣. [[const router = Router();]]

router جديد فاضي. ليه [[get]] و [[post]] و [[use]] زي [[app]] بالظبط.

## ٤. الخمس سطور

| السطر | المسار جوه الـ router | المسار الحقيقي بعد التركيب |
|---|---|---|
| [[router.get("/", tasks.list)]] | [[/]] | [[GET /api/tasks]] |
| [[router.post("/", tasks.create)]] | [[/]] | [[POST /api/tasks]] |
| [[router.get("/:id", tasks.getOne)]] | [[/:id]] | [[GET /api/tasks/:id]] |
| [[router.patch("/:id", tasks.update)]] | [[/:id]] | [[PATCH /api/tasks/:id]] |
| [[router.delete("/:id", tasks.remove)]] | [[/:id]] | [[DELETE /api/tasks/:id]] |

لاحظ إننا بنمرر [[tasks.list]] **من غير أقواس**: بنسلّم الدالة نفسها لـ Express عشان يناديها هو مع كل طلب. لو كتبت [[tasks.list()]] هتتنادى مرة واحدة دلوقتي، وده غلط.

## ٥. [[export default router;]]

بيصدّر الـ router كحاجة أساسية للملف، عشان [[app.js]] يستورده بأي اسم.

## ٦. [[app.use("/api/tasks", tasksRouter);]]

في [[app.js]] (ومعاه [[import tasksRouter from "./routes/tasks.routes.js"]] فوق):

> «أي طلب عنوانه بيبدأ بـ [[/api/tasks]]، ابعته للـ router ده.»

---

## ٧. نجرّب

~~~text الناتج
curl -s localhost:3000/api/tasks                  [{"id":1,"title":"buy milk","done":false}]
curl -s -X PATCH localhost:3000/api/tasks/5       {"updated":"5"}
curl -s -X DELETE localhost:3000/api/tasks/5      [204]
curl -s localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"t"}'
                                                  {"id":2,"title":"t"}
~~~

### الـ router شايف إيه؟

[[getOne]] بيرجّع ٣ خانات من [[req]]:

~~~bash
curl -s "localhost:3000/api/tasks/5?x=1"
~~~

~~~text الناتج
{"id":5,"url":"/5?x=1","baseUrl":"/api/tasks","originalUrl":"/api/tasks/5?x=1"}
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| [[req.url]] | [[/5?x=1]] | Express **شال** [[/api/tasks]] قبل ما يدّي الطلب للـ router، فالـ router شايف [[/5]] بس |
| [[req.baseUrl]] | [[/api/tasks]] | الجزء اللي اتشال (مكان التركيب) |
| [[req.originalUrl]] | [[/api/tasks/5?x=1]] | العنوان الأصلي كامل، ودا اللي تستخدمه في اللوجات |

وده سبب إن الـ router مش محتاج يعرف هو متركّب فين: تقدر تنقله لـ [[/api/v2/tasks]] من سطر واحد في [[app.js]].

---

## ٨. الـ users router (solCode)

نفس الشكل بالظبط في ملف تاني، و [[app.use("/api/users", usersRouter)]]:

~~~text الناتج
curl -s localhost:3000/api/users      [{"id":1,"name":"Mona"}]
curl -s localhost:3000/api/users/3    {"id":3}
~~~

[[Number(req.params.id)]] حوّلت [["3"]] لرقم، عشان كده [[3]] من غير تنصيص.

---

## ٩. الغلطتين المشهورتين

### المسار الكامل جوه الـ router

لو كتبت [[router.get("/api/tasks/:id", ...)]] جوه router متركّب على [[/api/tasks]]:

~~~text الناتج
curl localhost:3000/api/tasks/5               404
curl localhost:3000/api/tasks/api/tasks/5     {"id":5,"url":"/api/tasks/5","baseUrl":"/api/tasks","originalUrl":"/api/tasks/api/tasks/5"}
~~~

البادئة اتحطت مرتين.

### نسيت [[export default router]]

~~~text الناتج
file:///.../app.js:3
import usersRouter from "./routes/users.routes.js";
       ^^^^^^^^^^^
SyntaxError: The requested module './routes/users.routes.js' does not provide an export named 'default'
~~~

السيرفر مقامش أصلًا: ES Modules بيتأكد من الـ imports قبل ما أي سطر يشتغل.

---

## الخلاصة

| الملف | فيه |
|---|---|
| [[routes/tasks.routes.js]] | [[Router()]] + مسارات **نسبية** ([[/]] و [[/:id]]) + [[export default]] |
| [[app.js]] | [[import]] + [[app.use("/api/tasks", router)]] |

- المسار الحقيقي = مكان التركيب + المسار جوه الـ router.
- جوه الـ router: [[req.url]] من غير البادئة، و [[req.originalUrl]] كامل.
- مرر الدالة من غير [[()]].`,
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

أشهر غلطتين: تكتب [[router.get("/api/tasks/:id", ...)]] جوه الـ router، فالمسار الحقيقي يبقى [[/api/tasks/api/tasks/:id]] وكله يطلع 404. أو تنسى [[export default router]]، فالسيرفر يقع وهو بيقوم عند سطر الـ import نفسه بـ [[SyntaxError: The requested module './routes/users.routes.js' does not provide an export named 'default']]. (ولو المشروع CommonJS ونسيت [[module.exports = router]]، الـ [[require]] بيرجّع object فاضي و Express يقع بـ [[TypeError: argument handler must be a function]].)

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
          teach: R`## نفس العملية، متقسمة على ملفين

المثال عملية واحدة («ضيف مهمة») متقسمة نصين: **controller** بيتعامل مع HTTP (يقرا من [[req]] ويرد بـ [[res]])، و **service** فيها القاعدة الحقيقية (حد أقصى ٥٠٠ مهمة لكل يوزر) وبتكلّم الداتابيز. الاتنين بيتكلموا بدوال وبيانات عادية.

جرّبناه على ويندوز 11 (Node 24.19، Express 5.2.1). درس Prisma لسه جاي، فعملنا ملف [[db.js]] فيه [[prisma]] وهمي في الذاكرة بنفس الدوال ([[task.count]] و [[task.create]] و [[$disconnect]]) عشان نجرّب التقسيمة نفسها. وعشان نوصل للحد بسرعة خلينا الحد ٢ بدل ٥٠٠ وقت التجربة، وحطينا middleware صغير بيعمل [[req.user = { id: 7 }]] مكان الـ auth اللي لسه جاي.

---

## ١. الـ controller

~~~text controllers/tasks.controller.js
export async function create(req, res) {
  const task = await tasksService.create(req.user.id, req.body);
  res.status(201).json(task);
}
~~~

### [[export async function create(req, res)]]

- [[export]] عشان الـ router يستورده ([[tasks.create]] في الدرس اللي فات).
- [[async]] لأن جواه [[await]]: الداتابيز بتاخد وقت، والدالة دي بترجّع promise.

### [[await tasksService.create(req.user.id, req.body)]]

- [[tasksService]] الـ service، متستوردة فوق بـ [[import * as tasksService from "../services/tasks.service.js"]].
- بنديها **بيانات** مش الطلب: [[req.user.id]] (رقم اليوزر، الـ auth middleware بيحطه بعدين) و [[req.body]].
- [[await]] استنى النتيجة. لو الـ service رمت خطأ، السطر ده بيرمي هو كمان، والدالة بتقف.

### [[res.status(201).json(task)]]

الـ controller هو اللي **بيختار الـ status**، لأن ده قرار HTTP. الـ service متعرفش يعني إيه 201.

---

## ٢. الـ service

~~~text services/tasks.service.js
export async function create(userId, data) {
  const count = await prisma.task.count({ where: { userId } });
  if (count >= 500) throw new AppError(409, "Task limit reached");
  return prisma.task.create({ data: { title: data.title, userId } });
}
~~~

### [[export async function create(userId, data)]]

نفس الاسم [[create]] بس في ملف تاني، ومفيش تعارض لأن كل ملف module لوحده. الـ parameters عادية: رقم و object. **مفيش [[req]] ولا [[res]].**

### [[await prisma.task.count({ where: { userId } })]]

- [[prisma.task]] جدول المهام. [[count]] بيعدّ الصفوف.
- [[{ where: { userId } }]] الشرط: مهام اليوزر ده بس. [[{ userId }]] اختصار لـ [[{ userId: userId }]].

### [[if (count >= 500) throw new AppError(409, "Task limit reached")]]

ده **قاعدة بيزنس**: قرار من المنتج، مش من HTTP. لو اتعدّى الحد:

- [[throw]] بيوقف الدالة ويطلّع الخطأ لبرة.
- [[AppError]] class بتاعتنا (درس [[error middleware]]) بتشيل status ورسالة. الـ service بتقول «409» كمعلومة جوه الخطأ، بس مش بترد بنفسها.
- 409 Conflict: الطلب بيتعارض مع حالة موجودة.

### [[return prisma.task.create({ data: { title: data.title, userId } })]]

- [[data: { title: data.title, userId }]] بنختار الحقول بإيدنا: [[title]] من اللي جاي، و [[userId]] من الـ controller. لو الـ body فيه [[role]] أو [[userId]] تاني مش هيوصلوا.
- [[return]] بيرجّع الـ promise، و [[await]] اللي في الـ controller هو اللي بيستنى.

---

## ٣. نجرّب (والحد ٢)

ابتدينا بمهمة واحدة لليوزر ٧ في الداتابيز الوهمية، وبعتنا نفس الطلب مرتين، والـ body فيه [[role]] و [[userId: 1]] كمان:

~~~bash
curl -s -w " [%{http_code}]\n" localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"t","role":"ADMIN","userId":1}'
~~~

~~~text الناتج
{"id":2,"title":"t","userId":7} [201]
{"error":"Task limit reached"} [409]
~~~

- الأولى: كان فيه ١ (أقل من ٢)، فاتعملت. [[userId]] طلع [[7]] من [[req.user]] مش [[1]] اللي في الـ body، و [[role]] اتشال.
- التانية: بقوا ٢، فالـ service رمت [[AppError]]. الـ controller **ممسكهاش** خالص: Express 5 مسك الـ promise المرفوضة وبعتها لـ error handler اللي قرا [[err.status]] (درس «async errors في Express 5»).

---

## ٤. السكربت (solCode): نفس الـ service من غير Express

~~~text scripts/count.js
import * as tasksService from "../services/tasks.service.js";
import { prisma } from "../db.js";

console.log("tasks:", await tasksService.count());
await prisma.$disconnect();
~~~

- السكربت بينادي [[tasksService.count()]]، ودي دالة لازم تضيفها في الـ service جنب [[create]] (مش في المثال): [[export async function count() { return prisma.task.count(); }]].
- [[await]] في أول مستوى في الملف (top-level await) شغال في ES Modules من غير [[async function]].
- [[prisma.$disconnect()]] بيقفل الاتصال بالداتابيز. من غيره Prisma الحقيقي بيسيب الاتصال مفتوح والسكربت ميخلصش.

~~~bash
node scripts/count.js
~~~

~~~text الناتج
tasks: 1
~~~

وخلص لوحده بـ exit code 0، من غير ما يفتح بورت ولا يستورد [[express]]. ده الاختبار الحقيقي للتقسيمة: لو الـ service محتاجة [[req]] أو [[res]] عشان تشتغل، مكنتش هتقدر تناديها من هنا.

---

## الخلاصة

| الطبقة | بتعرف | متعرفش | مثال |
|---|---|---|---|
| route | العنوان والـ method | المنطق | [[router.post("/", tasks.create)]] |
| controller | [[req]] و [[res]] والـ status | الداتابيز | يقرا [[req.user.id]] ويرد 201 |
| service | قواعد البيزنس والداتابيز | HTTP | الحد ٥٠٠ و [[prisma.task.create]] |

- الـ service بتاخد بيانات عادية وبترجّع بيانات أو ترمي [[AppError]].
- الـ controller مش محتاج [[try/catch]] في Express 5.
- لو قدرت تنادي الـ service من سكربت من غير Express، التقسيمة صح.`,
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
          teach: R`## ملفين: نوع خطأ، ومكان واحد يرد عليه

المثال فيه ٣ حاجات: class اسمها [[AppError]] للأخطاء اللي احنا متوقعينها (زي «المهمة مش موجودة»)، و [[notFound]] لأي عنوان ملوش route، و [[errorHandler]] اللي بيحوّل أي خطأ لرد JSON. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## ١. [[class AppError extends Error]]

~~~text lib/errors.js
export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
~~~

| السطر | معناه |
|---|---|
| [[class AppError]] | نوع جديد من الـ objects، اسمه AppError |
| [[extends Error]] | بيورث من [[Error]] اللي في JavaScript: فيه [[message]] و [[stack]] (مكان الخطأ)، وينفع يترمي بـ [[throw]] |
| [[constructor(status, message)]] | الدالة اللي بتشتغل مع [[new AppError(404, "...")]] |
| [[super(message)]] | نادي constructor بتاع [[Error]] الأصلي عشان يحط [[message]] ويحسب الـ [[stack]]. لازم يتنادى قبل أي [[this]] |
| [[this.status = status]] | زوّد خانة [[status]] على الخطأ ده |

فـ [[throw new AppError(404, "Task not found")]] بيرمي خطأ عادي، بس شايل معاه الرقم اللي المفروض يترد.

---

## ٢. [[notFound]]

~~~text
export const notFound = (req, res) => res.status(404).json({ error: "Route not found" });
~~~

middleware عادي (من غير [[next]] لأنه دايمًا بيرد). بيتسجّل **بعد كل الـ routes**، فلو طلب وصله يبقى محدش رد. بيبدّل صفحة [[Cannot GET /x]] الـ HTML بـ JSON.

---

## ٣. [[errorHandler(err, req, res, next)]]

### ٤ arguments

Express بيعرف إن دي error handler من **عدد** الـ parameters: ٤. فـ [[next]] لازم تتكتب حتى لو مش مستخدمة. وبيتنادى بس لما يحصل خطأ: [[throw]] جوه handler، أو [[next(err)]]، أو middleware زي [[express.json()]] فشل.

### [[const status = err.status ?? err.statusCode ?? 500;]]

[[??]] بياخد أول قيمة مش [[undefined]] ولا [[null]]، من الشمال لليمين:

| الخطأ | [[err.status]] | النتيجة |
|---|---|---|
| [[new AppError(404, ...)]] | [[404]] | 404 |
| JSON بايظ من [[express.json()]] | [[400]] (body-parser بيحطه) | 400 |
| مكتبات بتستخدم [[statusCode]] | [[undefined]] | [[err.statusCode]] |
| [[new Error("...")]] عادي | [[undefined]] | 500 |

### [[if (status >= 500) console.error(err);]]

أخطاء السيرفر بس بتتسجّل كاملة بالـ stack. أخطاء العميل (4xx) طبيعية ومش محتاجة تملا اللوج.

### [[res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message })]]

[[? :]] if قصيرة: لو 500 أو أكتر، رسالة عامة. غير كده، رسالة الخطأ زي ما هي (لأن احنا اللي كاتبينها في [[AppError]]).

---

## ٤. نجرّب

ركّبناهم في الآخر: [[app.use(notFound)]] وبعدين [[app.use(errorHandler)]]. و [[getTask]] بقى بيرمي بدل ما يرد:

~~~text
if (!t) throw new AppError(404, "Task not found");
~~~

وزوّدنا route بيرمي خطأ عادي فيه سر: [[throw new Error("db password is 123")]].

~~~text الناتج
curl localhost:3000/api/tasks/999          {"error":"Task not found"} [404]
curl localhost:3000/api/tasks/1            {"id":1,"title":"buy milk"} [200]
curl localhost:3000/boom                   {"error":"Internal server error"} [500]
curl localhost:3000/nope                   {"error":"Route not found"} [404]
curl ... -d "{bad"                         {"error":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"} [400]
~~~

- [[999]]: الـ [[throw]] وقف الـ handler، و Express قفز للـ errorHandler، اللي قرا [[status: 404]].
- [[/boom]]: المستخدم شاف «Internal server error» بس. والسر راح للترمنال:

~~~text الناتج في ترمنال السيرفر
Error: db password is 123
    at file:///.../server.js:23:40
    at Layer.handleRequest (...\node_modules\router\lib\layer.js:152:17)
    ...
~~~

[[server.js:23:40]] = الملف، السطر ٢٣، الحرف ٤٠: مكان الـ [[throw]] بالظبط.

- الـ JSON البايظ بقى JSON نضيف بـ 400 بدل صفحة HTML (قارنه بدرس [[express.json()]]).

---

## ٥. لو كتبت ٣ arguments بس

جرّبنا نفس الـ handler بـ [[(err, req, res)]]:

~~~text الناتج
curl localhost:3000/api/tasks/999
<!DOCTYPE html>
...
<pre>Error: Task not found<br> &nbsp; &nbsp;at file:///.../server.js:20:17 ...
[404]
~~~

Express عامله كـ middleware عادي ومنادهوش على الخطأ، فالخطأ وصل للـ handler الافتراضي بتاع Express: صفحة HTML فيها الـ stack كله ومسارات الملفات على السيرفر. (الـ 404 لسه صح لأن الـ handler الافتراضي بيقرا [[err.status]] هو كمان.)

---

## الخلاصة

~~~text
throw new AppError(404, "...")   ->  status 404، الرسالة توصل للمستخدم
throw new Error("...")           ->  status 500، "Internal server error"، والتفاصيل في اللوج
express.json() فشل              ->  status 400 من body-parser
عنوان مش موجود                   ->  notFound، 404
~~~

- الـ error handler بـ ٤ arguments وآخر حاجة في الملف.
- رسايل 5xx متوصلش للمستخدم أبدًا.
- [[AppError]] للأخطاء المتوقعة، وأي حاجة تانية 500 لوحدها.`,
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
          teach: R`## ٣ حالات: خطأ بيتمسك لوحده، وخطأ محتاج غلاف، وخطأ محدش يقدر يمسكه

المثال ٣ أجزاء: route async على Express 5 بيرمي من غير [[try/catch]]، والغلاف [[asyncHandler]] اللي كان لازم في Express 4، و route بيرمي جوه [[setTimeout]] ومحدش بيمسكه. جرّبنا الكود نفسه على Express 5.2.1 وعلى Express 4.22.3 (فولدرين)، على ويندوز 11 بـ Node 24.19، وجزء Express 4 اتجرّب كمان على لينكس ([[node:22-alpine]] في Docker). وفي الكل فيه error handler في الآخر بيرد [[{ error }]]، و [[tasksService.getById]] نسخة صغيرة بترجّع مهمة لـ id [["1"]] و [[null]] لأي حاجة تانية.

---

## ١. الـ route في Express 5

~~~text
router.get("/:id", async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (!task) throw new AppError(404, "Task not found");
  res.json(task);
});
~~~

- [[async (req, res) => {...}]] الـ handler دالة async، يعني **بترجّع promise** دايمًا.
- [[await tasksService.getById(...)]] لو الـ service رمت (الداتابيز وقعت مثلًا)، الـ [[await]] بيرمي نفس الخطأ هنا.
- [[throw new AppError(404, ...)]] جوه دالة async معناه «الـ promise اترفض بالخطأ ده».

Express 5 بعد ما ينادي الـ handler بيبص على اللي رجع: لو promise، بيستنى، ولو اترفض بيبعت الخطأ لـ [[next(err)]] لوحده.

~~~text الناتج (Express 5)
curl localhost:3000/api/tasks/1     {"id":1,"title":"buy milk"} [200]
curl localhost:3000/api/tasks/999   {"error":"Task not found"} [404]
~~~

والسيرفر فاضل شغال.

### نفس الكود على Express 4

~~~text الناتج (Express 4، ويندوز)
curl: (56) Recv failure: Connection was reset
~~~

~~~text الناتج (Express 4، لينكس)
curl: (52) Empty reply from server
~~~

~~~text الناتج في ترمنال السيرفر
file:///.../server.js:14
  if (!task) throw new AppError(404, "Task not found");
                   ^

AppError: Task not found
  status: 404
}

Node.js v24.19.0
~~~

Express 4 مبيبصش على الـ promise خالص، فالرفض مكانش ليه صاحب (unhandled rejection)، و Node من نسخة 15 بيقفل العملية كلها عليه. الطلب ده اتقطع، وكل الطلبات اللي بعده كمان، لأن السيرفر نفسه مات. curl بيوصف نفس الحاجة بكلام مختلف حسب النظام: على لينكس [[(52)]] «الاتصال اتقفل من غير رد»، وعلى ويندوز [[(56)]] «الاتصال اتقطع».

---

## ٢. [[asyncHandler]]: الحل في Express 4

~~~text
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
~~~

نفكه من برة لجوه:

1. [[asyncHandler]] بياخد [[fn]]: الـ handler الـ async بتاعك.
2. بيرجّع **handler جديد** [[(req, res, next) => ...]]، وده اللي Express بيناديه.
3. جواه: [[fn(req, res, next)]] بينادي الـ handler بتاعك فيرجّع promise.
4. [[Promise.resolve(...)]] بيضمن إنه promise حتى لو [[fn]] مش async.
5. [[.catch(next)]] لو الـ promise اترفض، نادي [[next]] بالخطأ، وده بالظبط اللي بيودّيه للـ error handler.

والاستخدام: [[router.get("/wrapped/:id", asyncHandler(async (req, res) => {...}))]].

~~~text الناتج
curl localhost:3000/api/tasks/wrapped/999   {"error":"Task not found"} [404]   (Express 4 و Express 5)
~~~

ده اللي Express 5 بقى بيعمله من جوه، عشان كده مش محتاجه في المشاريع الجديدة.

---

## ٣. [[/later]]: محدش يقدر يمسكه

~~~text
router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });
~~~

- [[setTimeout(دالة, 10)]] «نادي الدالة دي بعد ١٠ millisecond».
> سجّلنا [[/later]] **قبل** [[/:id]] في الـ router، وإلا [[:id]] كان هيطابق كلمة later (درس [[app.get و app.post]]).

- الـ handler نفسه بيخلص **فورًا** ومبيرجّعش promise. بعد ١٠ms الدالة اللي جوه بترمي، وساعتها Express خلاص مبقاش شايف حاجة.

~~~text الناتج (curl، وتحته ترمنال السيرفر، في Express 5 و Express 4)
curl: (56) Recv failure: Connection was reset

router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });
                                                        ^
Error: boom
~~~

السيرفر وقع في النسختين. ده **uncaught exception**: خطأ مرمي برة أي حاجة ماسكاه.

---

## ٤. الحل (solCode)

~~~text
router.get("/later", async (req, res) => {
  await new Promise((r) => setTimeout(r, 10));
  throw new Error("boom");
});
~~~

- [[new Promise((r) => setTimeout(r, 10))]] promise بيخلص بعد ١٠ms: [[r]] (resolve) بيتنادى من الـ setTimeout.
- [[await]] الـ handler بيستنى جوه نفسه، فالـ [[throw]] اللي بعده بيحصل **جوه** الـ promise اللي Express ماسكه.

~~~text الناتج (Express 5)
curl localhost:3000/api/tasks/later   {"error":"Internal server error"} [500]
~~~

والسيرفر لسه شغال. على Express 4 بنفس الشكل ده وقع (محتاج [[asyncHandler]] حواليه)، وده اللي التعليق في الـ solCode بيقوله.

---

## الخلاصة

| الحالة | Express 5 | Express 4 |
|---|---|---|
| [[throw]] أو [[await]] فشل جوه async handler | يوصل للـ error handler | السيرفر يقع |
| نفس الكلام ملفوف بـ [[asyncHandler]] | يوصل (الغلاف زيادة) | يوصل |
| [[throw]] جوه [[setTimeout]] أو callback | السيرفر يقع | السيرفر يقع |
| [[await]] لـ promise فيه الانتظار، وبعدين [[throw]] | يوصل | يقع من غير غلاف |

- Express بيمسك بس الـ promise اللي **راجع** من الـ handler.
- أي callback قديم: حوّله لـ promise وخليه [[await]].
- لو اشتغلت على Express 4: [[asyncHandler]] حوالين كل async route.`,
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

على Express 4 بنفس الكود: [[curl]] بيطلع [[curl: (52) Empty reply from server]] (على لينكس، وعلى ويندوز [[curl: (56) Recv failure: Connection was reset]])، والسيرفر بيقع ويطبع الـ stack و [[Node.js v22...]] ويخرج بكود 1، لأن الـ rejection محدش مسكها و Node من 15 بيقفل العملية عليها. لفّ الـ handler بـ [[asyncHandler]] والمشكلة تتحل.

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
          teach: R`## ملف واحد يقرا الإعدادات ويرفض الناقص

[[config.js]] بيوصف الإعدادات اللي التطبيق محتاجها (schema)، ويقارن بيها [[process.env]] أول ما السيرفر يقوم. لو حاجة ناقصة أو غلط، السيرفر يقع فورًا برسالة فيها اسمها. لو كله تمام، بيصدّر object نضيف بالأنواع الصح. اتشغّل على ويندوز 11 بـ Node 24.19 و zod 4.6، وعملنا ملف [[show.js]] صغير بيعمل [[import { config } from "./config.js"]] ويطبعه.

---

## ١. [[import { z } from "zod";]]

zod مكتبة بتوصف «شكل» البيانات وتتحقق منه. [[z]] هو الـ object اللي فيه كل الأدوات ([[z.object]] و [[z.string]] وغيرهم). بتتسطّب بـ [[npm i zod]].

## ٢. [[const Env = z.object({ ... })]]

[[z.object]] بيقول «متوقع object فيه المفاتيح دي، وكل مفتاح بالقواعد دي». ده **الـ schema**. نمشي على المفاتيح:

### [[NODE_ENV: z.enum(["development", "test", "production"]).default("development")]]

- [[z.enum([...])]] لازم القيمة تبقى **واحدة من دول بالظبط**.
- [[.default("development")]] لو المتغير مش موجود، خد دي بدل ما ترفض.

### [[PORT: z.coerce.number().int().default(3000)]]

- [[process.env]] كل قيمه **نصوص**: [[PORT=4000]] بيوصل [["4000"]].
- [[z.coerce.number()]] بيحوّل النص لرقم الأول ([[Number("4000")]])، وبعدين يتأكد إنه رقم.
- [[.int()]] رقم صحيح من غير كسور.
- [[.default(3000)]] لو مش موجود.

### [[DATABASE_URL: z.url()]]

لازم يبقى عنوان URL سليم، زي [[postgresql://app:pw@localhost:5432/tasks]]. ([[z.url()]] شكل zod 4، وفي zod 3 كانت [[z.string().url()]].)

### [[JWT_SECRET: z.string().min(32)]]

نص طوله ٣٢ حرف على الأقل. سر قصير زي [[abc]] سهل يتخمّن، فبيترفض من أول يوم.

### [[CORS_ORIGINS: z.string().transform((s) => s.split(",").map((o) => o.trim()))]]

من جوه لبرة:

1. [[z.string()]] لازم نص.
2. [[.transform(دالة)]] بعد التحقق، غيّر القيمة بالدالة دي.
3. [[s.split(",")]] قسّم النص عند كل فاصلة: array.
4. [[.map((o) => o.trim())]] شيل المسافات من كل عنصر.

فـ [["http://localhost:5173, https://app.example.com"]] بتبقى array فيها عنوانين نضاف.

## ٣. [[export const config = Env.parse(process.env);]]

- [[Env.parse(...)]] بيتحقق من [[process.env]] كله مرة واحدة. لو فيه مشاكل، بيرمي [[ZodError]] فيه **كل** المشاكل مش أول واحدة. لو تمام، بيرجّع object جديد بالقيم المتحولة.
- المفاتيح اللي مش في الـ schema (و [[process.env]] فيه عشرات زي [[PATH]] و [[USERNAME]]) بتتشال.
- [[export const config]] أي ملف تاني يعمل [[import { config }]].

ولأن السطر ده في أول مستوى في الملف، بيتنفذ **أول ما حد يستورد config.js**، يعني وقت تشغيل السيرفر قبل [[app.listen]].

---

## ٤. نجرّب: ملف .env سليم

~~~text .env
DATABASE_URL=postgresql://app:pw@localhost:5432/tasks
JWT_SECRET=0123456789abcdef0123456789abcdef
CORS_ORIGINS=http://localhost:5173, https://app.example.com
PORT=4000
~~~

~~~bash
node --env-file=.env show.js
~~~

[[--env-file=.env]] بيقول لـ Node «اقرا الملف ده وحط كل سطر [[KEY=value]] في [[process.env]] قبل ما تشغّل الكود». نفس الأمر بيشتغل في PowerShell و CMD.

~~~text الناتج
{
  NODE_ENV: 'development',
  PORT: 4000,
  DATABASE_URL: 'postgresql://app:pw@localhost:5432/tasks',
  JWT_SECRET: '0123456789abcdef0123456789abcdef',
  CORS_ORIGINS: [ 'http://localhost:5173', 'https://app.example.com' ]
}
~~~

- [[NODE_ENV]] مش في الملف، فأخد الـ default.
- [[PORT: 4000]] **من غير** علامات تنصيص: بقى number.
- [[CORS_ORIGINS]] بقى array والمسافة اللي بعد الفاصلة اتشالت.

ولو شلنا [[PORT]] من الملف خالص: [[3000 number]].

---

## ٥. نجرّب: ملف فيه غلطتين

~~~text bad.env
DATABASE_URL=not a url
CORS_ORIGINS=x
~~~

~~~text الناتج
file:///.../config.js:12
export const config = Env.parse(process.env);
                          ^

ZodError: [
  {
    "code": "invalid_format",
    "format": "url",
    "path": [
      "DATABASE_URL"
    ],
    "message": "Invalid URL"
  },
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "JWT_SECRET"
    ],
    "message": "Invalid input: expected string, received undefined"
  }
]

Node.js v24.19.0
~~~

نقرا كل مشكلة:

| الخانة | معناها |
|---|---|
| [[path]] | اسم المتغير اللي فيه المشكلة |
| [[code]] | نوعها: [[invalid_format]] الشكل غلط، [[invalid_type]] النوع غلط |
| [[message]] | الشرح: [[received undefined]] يعني مش موجود أصلًا |

المشكلتين طلعوا مع بعض، فبتصلّح مرة واحدة. والسيرفر مقامش: ولا بورت اتفتح.

### سر قصير و [[NODE_ENV]] غلط

~~~text short.env
JWT_SECRET=abc
NODE_ENV=prod
...
~~~

~~~text الناتج (الرسايل بس)
"path": [ "NODE_ENV" ]    "message": "Invalid option: expected one of \"development\"|\"test\"|\"production\""
"path": [ "JWT_SECRET" ]  "message": "Too small: expected string to have >=32 characters"
~~~

[[prod]] مش [[production]]، فالـ enum رفضها. وده بالظبط النوع اللي بيعدّي من غير تحقق ويخلّي كود «لو production» ميشتغلش.

---

## ٦. حاجات اتجرّبت وتفرق معاك

| الحالة | النتيجة |
|---|---|
| [[PORT=abc]] | [[Invalid input: expected number, received NaN]] |
| [[PORT=]] (فاضي) | [[0]]! [[Number("")]] بيطلع صفر، والـ default مبيشتغلش لأن القيمة مش undefined |
| [[PORT=5000]] في الترمنال و [[PORT=4000]] في .env | [[5000]]: [[--env-file]] مبيغطّيش على متغير موجود فعلًا |
| [[--env-file=nope.env]] والملف مش موجود | [[node.exe: nope.env: not found]] والبرنامج ميقومش |

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[z.enum([...]).default(x)]] | قيمة من قايمة، أو x |
| [[z.coerce.number()]] | نص لرقم |
| [[z.url()]] | لازم URL سليم |
| [[z.string().min(32)]] | نص ٣٢ حرف أو أكتر |
| [[.transform(fn)]] | غيّر القيمة بعد التحقق |
| [[Env.parse(process.env)]] | اتحقق دلوقتي، وارمي كل المشاكل مرة واحدة |

- [[process.env]] كله نصوص، وأي حاجة فيه ممكن تبقى ناقصة.
- باقي المشروع يستورد [[config]] ومحدش يقرا [[process.env]] غير config.js.
- السيرفر يقع وهو بيقوم أحسن ما يقع في نص طلب.`,
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
          teach: R`## schema بتوصف الطلب، و middleware بيتحقق

المثال ٣ أجزاء: [[createTaskSchema]] بتقول «الـ body بتاع إضافة مهمة شكله كده»، و [[validate]] دالة بتعمل middleware من أي schema، والسطر الأخير بيركّبهم قبل الـ controller. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و zod 4.6، والـ controller في التجربة بيطبع [[req.body]] اللي وصله ويرجّعه.

---

## ١. الـ schema

~~~text
export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});
~~~

كل حقل سلسلة قواعد بتتنفذ **بالترتيب من الشمال لليمين**:

### [[title: z.string().trim().min(1).max(200)]]

1. [[z.string()]] لازم نص.
2. [[.trim()]] شيل المسافات من الأول والآخر (ده **تحويل** مش فحص).
3. [[.min(1)]] بعد الـ trim، حرف واحد على الأقل. عشان كده [["  "]] بيترفض: بقى [[""]] قبل ما يتفحص.
4. [[.max(200)]] ٢٠٠ حرف بالكتير.

### [[dueDate: z.coerce.date().optional()]]

- [[z.coerce.date()]] بيعمل [[new Date(القيمة)]] الأول، وبعدين يتأكد إن التاريخ سليم. JSON مفيهوش نوع تاريخ، فالتاريخ بييجي نص زي [["2026-12-31"]].
- [[.optional()]] مش لازم يتبعت.

### [[priority: z.enum([...]).default("normal")]]

واحدة من ٣ قيم، ولو مش مبعوتة خالص تبقى [["normal"]].

---

## ٢. [[validate]]: دالة بتعمل middleware

~~~text
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid input", issues: z.flattenError(result.error).fieldErrors });
  req.body = result.data;
  next();
};
~~~

### [[(schema) => (req, res, next) => {...}]]

سهمين: [[validate]] بتاخد schema وبترجّع **middleware**. فـ [[validate(createTaskSchema)]] middleware جاهز للإضافة، و [[validate(updateTaskSchema)]] تاني للتعديل، من نفس الكود.

### [[schema.safeParse(req.body)]]

- [[parse]] (اللي في درس config) بيرمي خطأ. [[safeParse]] **مبيرميش**، بيرجّع object:

~~~text
{ success: true,  data: {...النسخة النضيفة...} }
{ success: false, error: ZodError }
~~~

مناسب هنا لأننا عايزين نرد 400 بنفسنا مش نوقع.

### [[z.flattenError(result.error).fieldErrors]]

[[result.error.issues]] قايمة طويلة (زي اللي شفناها في درس config). [[z.flattenError]] بيحوّلها لشكل أبسط: [[fieldErrors]] object، كل حقل وقايمة رسايله. ده اللي الواجهة تحطه تحت كل input في الفورم.

### [[req.body = result.data;]]

بنبدّل الـ body الأصلي بالنسخة اللي zod طلّعها: متعملها trim، والتاريخ بقى Date، والـ default اتحط، والحقول الزيادة اتشالت.

### [[next();]]

كمّل للـ controller.

---

## ٣. [[router.post("/", validate(createTaskSchema), tasks.create);]]

الـ middleware بين المسار والـ controller، فالـ controller مش بيشتغل غير لو البيانات سليمة.

---

## ٤. نجرّب

### الـ body الغلط من الـ try

~~~bash
curl -s localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"  ","priority":"urgent","role":"ADMIN"}'
~~~

~~~text الناتج [400]
{"error":"Invalid input","issues":{"title":["Too small: expected string to have >=1 characters"],"priority":["Invalid option: expected one of \"low\"|\"normal\"|\"high\""]}}
~~~

- غلطتين، والاتنين رجعوا مع بعض.
- [[role]] مش في الأخطاء: [[z.object]] مبيعترضش على حقول زيادة، بيشيلها بس.
- [[\"]] في الناتج: علامة تنصيص جوه نص JSON بتتكتب كده.

### الـ body الصح ومعاه [[role]]

~~~text الناتج [201]
{"title":"hi","priority":"normal"}
~~~

~~~text الناتج في ترمنال السيرفر
controller got: { title: 'hi', priority: 'normal' }
~~~

اتبعت [[" hi "]] و [[role: "ADMIN"]]. الـ controller استلم [["hi"]] من غير مسافات، و [[priority]] بالـ default، و [[role]] **مش موجود**. ده الحماية من mass assignment.

### التاريخ

~~~text الناتج
{"title":"x","dueDate":"2026-12-31"}   ->  {"title":"x","dueDate":"2026-12-31T00:00:00.000Z","priority":"normal"} [201]
{"title":"x","dueDate":"yesterday"}    ->  {"error":"Invalid input","issues":{"dueDate":["Invalid input: expected date, received Date"]}} [400]
~~~

- التاريخ السليم بقى Date، ولما اترجع JSON اتكتب بصيغة ISO بتوقيت UTC ([[Z]] في الآخر).
- [["yesterday"]] [[new Date("yesterday")]] بيطلع «Invalid Date»، ودا لسه object من نوع Date، عشان كده الرسالة غريبة شوية ([[received Date]]). المهم إنه اترفض بـ 400 مش 500.

### حقل ناقص، ومفيش body خالص

~~~text الناتج
{"priority":"high"}     ->  {"error":"Invalid input","issues":{"title":["Invalid input: expected string, received undefined"]}} [400]
POST من غير body        ->  {"error":"Invalid input","issues":{}} [400]
~~~

التانية الـ [[issues]] فاضية! لأن [[req.body]] نفسه [[undefined]]، فالغلطة على الـ object كله مش على حقل معين، و [[fieldErrors]] فيها أخطاء الحقول بس. الغلطة دي موجودة في [[formErrors]]: جرّبناها، [[z.flattenError]] رجّع [[{"formErrors":["Invalid input: expected object, received undefined"],"fieldErrors":{}}]]. لو عايز الرد يبقى مفهوم في الحالة دي، رجّع الاتنين.

---

## ٥. نسخة الـ params (solCode)

~~~text
const IdParams = z.object({ id: z.coerce.number().int().positive() });
router.get("/:id", validateParams(IdParams), tasks.getOne);
~~~

[[validateParams]] نفس [[validate]] بالظبط، بس بيقرا ويكتب [[req.params]]. و [[positive()]] أكبر من صفر.

~~~text الناتج
/api/tasks/abc   {"error":"Invalid params","issues":{"id":["Invalid input: expected number, received NaN"]}} [400]
/api/tasks/5     {"id":5,"type":"number"} [200]
/api/tasks/0     {"error":"Invalid params","issues":{"id":["Too small: expected number to be >0"]}} [400]
~~~

- الـ controller شاف [[id]] **رقم** ([[typeof]] = number) مش [["5"]].
- [[0]] اترفض، عكس فحص [[Number.isInteger]] في درس [[req.params]] اللي كان بيعدّيه.
- [[req.params = result.data]] اشتغل في Express 5. لكن [[req.query]] مينفعش يتبدّل كده (getter)، فنسخة الـ query تحط النتيجة في مكان تاني زي [[res.locals]].

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[.trim()]] / [[z.coerce.*]] / [[.default()]] | بتحوّل القيمة |
| [[.min()]] / [[.max()]] / [[z.enum()]] / [[.positive()]] | بتفحص |
| [[z.object]] | بيشيل أي حقل مش متعرّف |
| [[safeParse]] | نتيجة من غير ما يرمي |
| [[z.flattenError(e).fieldErrors]] | الأخطاء لكل حقل |

- [[validate(schema)]] middleware واحد لكل الـ endpoints.
- بعد التحقق، بدّل [[req.body]] بـ [[result.data]]، وإلا الحقول الزيادة لسه موجودة.
- التحويل بيحصل بالترتيب: [[trim]] قبل [[min]].`,
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
          teach: R`## قواعد على كل حقل، وانت اللي بتوقف الطلب

المثال route تعديل مهمة ([[PATCH /api/tasks/:id]]): array فيها ٣ قواعد (للـ id وللعنوان ولـ done)، وبعدين الـ handler بيسأل «فيه أخطاء؟» ويرد. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و express-validator 7.3، والطلبات بـ curl من Git Bash، والـ router متركّب على [[/api/tasks]].

---

## ١. [[import { body, param, validationResult, matchedData } from "express-validator";]]

| الاسم | بيعمل إيه |
|---|---|
| [[body("x")]] | قاعدة على [[req.body.x]] |
| [[param("x")]] | قاعدة على [[req.params.x]] (وفيه [[query("x")]] للـ query) |
| [[validationResult(req)]] | يجمع الأخطاء اللي القواعد سجّلتها على الطلب |
| [[matchedData(req)]] | يرجّع الحقول اللي عليها قواعد وعدّت بس |

بتتسطّب بـ [[npm i express-validator]].

---

## ٢. القواعد

~~~text
const rules = [
  param("id").isInt({ min: 1 }).toInt(),
  body("title").optional().isString().trim().isLength({ min: 1, max: 200 }),
  body("done").optional().isBoolean().toBoolean(),
];
~~~

كل سطر **middleware**، والـ array كلها بتتحط في الـ route، و Express بيشغّلهم ورا بعض. والسلسلة بتتنفذ بالترتيب، وفيها نوعين: **validators** بتفحص (أسماءها بتبدأ بـ [[is]])، و **sanitizers** بتعدّل القيمة ([[trim]] و [[to...]]).

### [[param("id").isInt({ min: 1 }).toInt()]]

- [[isInt({ min: 1 })]] رقم صحيح ١ أو أكتر.
- [[toInt()]] حوّل [["5"]] لـ [[5]].

### [[body("title").optional().isString().trim().isLength({ min: 1, max: 200 })]]

- [[optional()]] لو الحقل مش مبعوت خالص، اتجاهل باقي السلسلة. ده PATCH، فاليوزر ممكن يعدّل [[done]] بس.
- [[isString()]] لازم نص.
- [[trim()]] شيل المسافات.
- [[isLength({ min: 1, max: 200 })]] الطول بعد الـ trim من ١ لـ ٢٠٠.

### [[body("done").optional().isBoolean().toBoolean()]]

- [[isBoolean()]] بيقبل [[true]] و [[false]] وكمان النصوص [["true"]] و [["false"]] و [["1"]] و [["0"]] (جرّبناها: [["1"]] بقت [[true]] و [["0"]] بقت [[false]]، و [["yes"]] اترفضت).
- [[toBoolean()]] بيحوّلها لـ boolean حقيقي.

---

## ٣. الـ handler

### [[router.patch("/:id", rules, (req, res) => {...})]]

الـ array بين المسار والـ handler. القواعد بتشتغل الأول، وكل واحدة بتنادي [[next()]] **دايمًا**، حتى لو الحقل غلط: بتسجّل الغلطة على الطلب وتكمّل.

### [[const errors = validationResult(req);]]

اقرا الأخطاء اللي اتسجّلت.

### [[if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });]]

- [[isEmpty()]] [[true]] لو مفيش أخطاء.
- [[errors.array()]] الأخطاء كـ array.
- ده **السطر الوحيد** اللي بيوقف الطلب. من غيره القواعد ملهاش لازمة.

### [[const data = matchedData(req); res.json(data);]]

الحقول اللي عليها قواعد، بعد التحويل. رجّعناها عشان نشوفها.

---

## ٤. نجرّب

### طلب سليم ومعاه حقل زيادة

~~~bash
curl -s -X PATCH localhost:3000/api/tasks/5 -H "Content-Type: application/json" -d '{"title":" new ","done":"true","role":"ADMIN"}'
~~~

~~~text الناتج [200]
{"id":5,"title":"new","done":true}
~~~

- [[id]] بقى رقم (من [[toInt]])، و [[title]] اتعمله trim، و [[done]] بقى [[true]] boolean مع إنه اتبعت نص.
- [[role]] مش موجود: [[matchedData]] بيرجّع الحقول اللي ليها قواعد بس.

### كل حاجة غلط

~~~bash
curl -s -X PATCH localhost:3000/api/tasks/abc -H "Content-Type: application/json" -d '{"title":"","done":"maybe"}'
~~~

~~~text الناتج [400]
{"errors":[
  {"type":"field","value":"abc","msg":"Invalid value","path":"id","location":"params"},
  {"type":"field","value":"","msg":"Invalid value","path":"title","location":"body"},
  {"type":"field","value":"maybe","msg":"Invalid value","path":"done","location":"body"}
]}
~~~

(قسّمناه على سطور عشان يتقري، الرد الحقيقي سطر واحد.)

| الخانة | معناها |
|---|---|
| [[type]] | [[field]]: الغلطة على حقل |
| [[value]] | القيمة اللي اتبعتت. خلي بالك: بترجع زي ما هي، فلو الحقل باسورد هيرجع في الرد |
| [[msg]] | [[Invalid value]] لكل حاجة، إلا لو كتبت [[.withMessage("...")]] |
| [[path]] | اسم الحقل |
| [[location]] | جه منين: [[params]] أو [[body]] أو [[query]] |

### body فاضي

~~~text الناتج [200]
{"id":5}
~~~

[[title]] و [[done]] الاتنين [[optional()]]، فعدّوا، و [[matchedData]] مفيهوش غير الـ id.

---

## ٥. الـ solCode: قواعد الإضافة

~~~text
body("title").isString().trim().isLength({ min: 1, max: 200 }).withMessage("title is required"),
body("dueDate").optional().isISO8601().toDate(),
body("priority").optional().isIn(["low", "normal", "high"]).withMessage("bad priority"),
~~~

- [[title]] من غير [[optional()]]: لازم.
- [[isISO8601()]] تاريخ بصيغة ISO زي [[2026-12-31]]، و [[toDate()]] يحوّله Date.
- [[isIn([...])]] واحدة من القايمة.
- [[withMessage]] بيغيّر [[msg]] للقاعدة اللي قبله.
- [[{ priority: "normal", ...matchedData(req) }]] express-validator مفيهوش default زي zod، فبنحطه بإيدنا: [[...]] بيفرد الحقول، واللي اتبعت بيغطي على [["normal"]].

~~~text الناتج
{"title":"  ","priority":"urgent","role":"ADMIN"}
  -> {"errors":[{"type":"field","value":"","msg":"title is required","path":"title","location":"body"},
               {"type":"field","value":"urgent","msg":"bad priority","path":"priority","location":"body"}]} [400]

{"title":" hi ","dueDate":"2026-12-31","role":"ADMIN"}
  -> {"priority":"normal","title":"hi","dueDate":"2026-12-31T00:00:00.000Z"} [201]
~~~

نفس القواعد من غير [[withMessage]] رجّعت [["msg":"Invalid value"]] للاتنين.

### لو شلت [[validationResult]]

route بنفس القواعد بيرد على طول بـ [[req.body]] و [[matchedData(req)]]:

~~~text الناتج [200]
{"body":{"title":"","priority":"urgent","role":"ADMIN"},"matched":{}}
~~~

- الطلب الغلط **عدّى بـ 200**.
- [[req.body]] فيه كل حاجة، حتى [[role]]، و [[title]] بقى [[""]] لأن [[trim]] عدّل عليه.
- [[matchedData]] فاضي لأنه بيرجّع الحقول **الصح** بس، وكلها كانت غلط.

---

## الخلاصة: express-validator قصاد zod

| | express-validator | zod |
|---|---|---|
| القواعد | سلسلة middleware على الطلب | schema لوحدها، تتستخدم في أي مكان |
| الغلط بيوقف الطلب؟ | لأ، لازم [[validationResult]] | الـ [[validate]] بتاعك بيرد 400 |
| الحقول الزيادة | [[matchedData]] بيشيلها، [[req.body]] لأ | [[result.data]] من غيرها |
| الـ default | بإيدك | [[.default()]] |
| الرسالة الافتراضية | [[Invalid value]] | وصف للغلطة |

- القواعد بتسجّل بس، و [[validationResult]] هو اللي بيوقف.
- خد البيانات من [[matchedData(req)]] مش [[req.body]].`,
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
