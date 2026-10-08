// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "أماكن وأشياء وكلمات صغيرة",
      l: 1,
      n: "أسماء الأماكن (root و path و scope) وأسماء حاجات الكود والويب، والكلمات الصغيرة اللي بتغيّر معنى الجملة كلها",
      items: [
        {
          cmd: "root / path / directory",
          title: "root و path و directory و parent و nested و relative",
          desc: R`دي كلمات «فين»: فين الملف، وفين الأمر شغال، وفين الإعداد.

[[root]] الأصل أو أعلى نقطة (root directory للمشروع، و root user الأدمن في Linux)، و [[path]] المسار لملف أو فولدر، و [[directory]] و [[folder]] نفس الحاجة (directory في الـ terminal والـ docs، و folder في الواجهات)، و [[working directory]] الفولدر اللي انت واقف فيه دلوقتي، و [[home directory]] فولدر اليوزر [[~]]، و [[parent]] الأب (الفولدر اللي فوق)، و [[child]] الابن، و [[nested]] جوه بعض، و [[relative path]] مسار نسبةً لمكانك ([[./src]])، و [[absolute path]] مسار كامل من الـ root ([[/home/sara/app]])، و [[extension]] امتداد الملف ([[.ts]])، و [[entry point]] الملف اللي البرنامج بيبدأ منه، و [[location]] مكان.

كلمة [[root]] نفسها ليها معاني كتير حسب السياق: root directory، و root user، و root element في HTML، و root cause = السبب الأصلي لمشكلة. السياق هو اللي بيحدد.`,
          example: R`root              Run the command from the project root.
path              The path must point to an existing file.
directory         No such file or directory.
working directory The current working directory is /home/sara/app.
home              Config files are stored in your home directory.
parent            The parent directory is ../ (one level up).
nested            Nested folders are created automatically.
relative          Relative paths are resolved from the current directory.
absolute          Use an absolute path in the cron job.
extension         Rename the file extension from .js to .ts.
entry point       The entry point of the app is src/main.tsx.
root cause        We found the root cause: a missing index.`,
          try: R`شغّل [[node -e 'require("fs").readFileSync("nope.txt")']] واقرا الرسالة. وبعدين في أي مشروع عندك افتح [[package.json]] ودوّر على [[main]] أو [[module]] أو [[bin]]: ده الـ entry point. اكتب جملة إنجليزي بتقول الـ entry point بتاعك فين.`,
          flag: "script",
          deep: {
            why: R`أشهر رسالة خطأ في الدنيا فيها كلمة من دول: [[No such file or directory]]. ونص مشاكل السكربتات والـ cron و Docker سببها relative path بيتحسب من working directory غير اللي انت فاكره.`,
            how: R`[[resolve]] هنا معناها «يحسب المسار الكامل»، مش «يحل». فـ [[Relative paths are resolved from the current directory]] = «المسارات النسبية بتتحسب من الفولدر الحالي». نفس الكلمة في Promise معناها «تخلص بنجاح»، وفي DNS «يترجم اسم لـ IP». السياق تاني.

و [[point to]] = يشاور على، و [[one level up]] = مستوى واحد لفوق، و [[automatically]] = لوحده من غير ما تعمل حاجة.

[[directory]] بتتنطق «دايركتوري» أو «ديركتوري» والاتنين صح.`,
            when: "كل ما تقرا خطأ ENOENT أو Cannot find module، وكل ما تكتب مسار في سكربت أو Dockerfile أو cron.",
            mistakes: R`[[in the root of the project]] صح، بس [[in the project's root]] أو [[at the project root]] أشهر. و [[the file is not exist]] غلط، الصح [[the file doesn't exist]]. و [[open the folder of the project]] الأطبع [[open the project folder]]: بالإنجليزي الاسم اللي بيوصف بييجي قبل ([[project folder]] و [[config file]] و [[error message]]). ودي من أهم الفروق بين العربي والإنجليزي.`
          },
          teach: R`## الجمل بتجاوب «فين؟»

---

## رسالة حقيقية: [[No such file or directory]]

جرّبت في Node 22 (Docker) أقرا ملف مش موجود:

~~~bash
node -e 'require("fs").readFileSync("nope.txt")'
~~~

~~~text الناتج (السطور المهمة)
Error: ENOENT: no such file or directory, open 'nope.txt'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'nope.txt'
~~~

| الحتة | معناها |
|---|---|
| [[ENOENT]] | Error NO ENTry: «مفيش حاجة بالاسم ده» |
| [[no such file or directory]] | «مفيش ملف أو فولدر كده». [[such]] = «زي ده» |
| [[open 'nope.txt']] | العملية اللي فشلت: فتح الملف ده |
| [[syscall: 'open']] | الـ system call اللي فشل |
| [[path: 'nope.txt']] | المسار، وهو نسبي، فاتحسب من الفولدر اللي شغّلت منه |

---

## الكلمات في جمل

| الجملة | المهم فيها |
|---|---|
| [[Run the command from the project root.]] | [[project root]] = فولدر المشروع الرئيسي |
| [[The path must point to an existing file.]] | [[must]] لازم، و [[point to]] يشاور على |
| [[The parent directory is ../ (one level up).]] | [[one level up]] مستوى لفوق |
| [[Nested folders are created automatically.]] | passive، و [[automatically]] لوحده |
| [[Relative paths are resolved from the current directory.]] | [[resolved]] هنا = «يتحسب المسار الكامل» |
| [[The entry point of the app is src/main.tsx.]] | الملف اللي البرنامج بيبدأ منه |
| [[We found the root cause: a missing index.]] | [[root cause]] = السبب الأصلي |

---

## قاعدة: الوصف قبل الاسم

| عربي | إنجليزي |
|---|---|
| فولدر المشروع | [[project folder]] |
| ملف الإعدادات | [[config file]] |
| رسالة الخطأ | [[error message]] |

---

## الخلاصة

- [[relative]] بيتحسب من مكانك، و [[absolute]] من الـ root.
- [[root]] ليها معاني كتير: root directory، و root user، و root cause. السياق بيحدد.
- [[the file doesn't exist]] مش [[is not exist]].`,
          lines: [
            R`project root = أصل المشروع. «شغّل الأمر من فولدر المشروع الرئيسي».`,
            R`path + must point to = المسار لازم يشاور على ملف موجود.`,
            R`دي رسالة ENOENT الحقيقية: «مفيش ملف أو فولدر بالاسم ده».`,
            R`working directory = الفولدر الحالي. «الفولدر اللي انت فيه دلوقتي هو ...».`,
            R`home directory = فولدر اليوزر. «ملفات الإعداد متخزنة في الـ home».`,
            R`parent = الأب. «الفولدر الأب هو ../ مستوى واحد لفوق».`,
            R`nested = جوه بعض. «الفولدرات المتداخلة بتتعمل لوحدها» (زي mkdir -p).`,
            R`relative + resolved = النسبية بتتحسب من الفولدر الحالي.`,
            R`absolute = كامل. «استخدم مسار كامل في الـ cron» لأن الـ cron مبيبدأش من فولدرك.`,
            R`extension = الامتداد. «غيّر امتداد الملف من .js لـ .ts».`,
            R`entry point = نقطة البداية. «التطبيق بيبدأ من src/main.tsx».`,
            R`root cause = السبب الأصلي. «لقينا السبب: index ناقص».`
          ],
          sol: R`الرسالة الحقيقية (Node 22):
[[Error: ENOENT: no such file or directory, open 'nope.txt']]
[[ENOENT]] = Error NO ENTry، يعني «مفيش حاجة بالاسم ده». [[open 'nope.txt']] = العملية اللي فشلت كانت فتح الملف ده. والمسار نسبي، فاتحسب من الـ working directory اللي شغّلت منه الأمر.

الـ entry point: في مشروع Node غالبًا [[main]] في package.json، وفي Vite بتلاقي [[src/main.tsx]] أو [[src/main.ts]] متنادي من [[index.html]]. جملة صح:
[[The entry point of my app is src/main.tsx, which is loaded by index.html.]]

لو كتبت [[which loaded by]] نسيت [[is]]: الـ passive محتاج [[is + loaded]].`
        },
        {
          cmd: "scope / module / instance",
          title: "كلمات الكود: scope و module و instance و argument و property",
          desc: R`دي الأسماء اللي بتوصف حاجات جوه الكود نفسه. انت عارف معناها في JS، بس المهم تعرف اسمها بالإنجليزي عشان تقرا الـ docs ورسايل الأخطاء وتسأل صح.

[[variable]] متغير، و [[value]] قيمة، و [[type]] نوع، و [[function]] دالة، و [[method]] دالة جوه object أو class، و [[parameter]] الاسم في تعريف الدالة، و [[argument]] القيمة اللي بتبعتها وقت النداء، و [[property]] و [[field]] خاصية في object، و [[key]] المفتاح، و [[object]] و [[array]] و [[string]]، و [[class]] و [[instance]] نسخة من class ([[new User()]])، و [[module]] ملف بيصدّر حاجات، و [[package]] مكتبة على npm، و [[dependency]] مكتبة مشروعك معتمد عليها، و [[scope]] المكان اللي المتغير معروف فيه، و [[callback]] دالة بتتبعت لدالة تانية، و [[return value]] اللي الدالة بترجّعه، و [[side effect]] أثر جانبي (الدالة غيّرت حاجة برّاها).`,
          example: R`parameter     The function takes two parameters: name and age.
argument      Expected 2 arguments, but got 1.
property      Cannot read properties of undefined (reading 'name').
method        The map() method creates a new array.
instance      Each request creates a new instance of the service.
module        Cannot find module 'expresss'.
dependency    Add zod as a dependency.
scope         The variable is not defined in this scope.
callback      The callback is called with (err, data).
return value  The return value is a Promise.
side effect   This function has no side effects.
key           Each child in a list should have a unique "key" prop.`,
          try: R`اقرا الجملة دي بصوت عالي وترجمها بالعربي: [[The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.]] (دي أول جملة في MDN لـ map). علّم كل كلمة من القايمة موجودة فيها.`,
          flag: "script",
          deep: {
            why: R`رسايل الأخطاء بتستخدم الكلمات دي بدقة: [[Expected 2 arguments]] مش parameters، و [[Cannot read properties]] مش variables. لو عارف الفرق هتعرف تحدد المشكلة فين بالظبط.`,
            how: R`الفرق اللي بيتسأل في الانترفيو: [[parameter]] في التعريف ([[function greet(name)]] ← name parameter)، و [[argument]] في النداء ([[greet("Sara")]] ← "Sara" argument). كتير من الناس بتخلطهم في الكلام وده مقبول، بس في الكتابة الرسمية الـ docs بتفرّق.

و [[takes]] مع الدوال = بتاخد ([[takes two parameters]])، و [[accepts]] نفس المعنى. و [[populated with]] = متعبّي بـ. و [[provided]] = اللي انت بعته. و [[on every element]] = على كل عنصر.

[[method]] = دالة مربوطة بـ object. و MDN بتكتب [[Array.prototype.map()]] يعني «method موجودة على كل array».`,
            when: "وانت بتقرا MDN أو docs أي مكتبة، ووانت بتسأل سؤال على Stack Overflow أو لزميل.",
            mistakes: R`[[I sent the variable to the function]] مفهومة، بس الأدق [[I passed the value as an argument]]. و [[a dependence]] غلط، الصح [[a dependency]] وجمعها [[dependencies]]. و [[attribute]] في HTML ([[href]] attribute) مش زي [[property]] في JS object. و [[the function takes a callback]] صح، و [[the function takes a callback function as parameter]] محتاجة [[a]]: [[as a parameter]].`
          },
          teach: R`## ٤ من الجمل دي رسايل حقيقية

الجمل اللي في المثال نصها وصف، ونصها رسايل أخطاء وتحذيرات حقيقية. شغّلت رسايل Node في Node 22 (Docker)، ورسالة TS في TypeScript 7، وتحذير React بـ React 19.3 (ليستة [[li]] من غير key):

| الكلمة | الرسالة الحقيقية | معناها |
|---|---|---|
| [[argument]] | [[Expected 1 arguments, but got 0.]] (TS2554) | متوقع argument وجالي صفر |
| [[property]] | [[Cannot read properties of undefined (reading 'name')]] | بتقرا خاصية من undefined |
| [[module]] | [[Error: Cannot find module 'expresss']] | مش لاقي المكتبة (الاسم فيه ٣ s) |
| [[key]] | [[Each child in a list should have a unique "key" prop.]] | تحذير React: كل عنصر في ليستة محتاج key فريد |

ملاحظة: TS بيكتب [[1 arguments]] بالجمع، وده غلط grammar في رسالة حقيقية. متتعلمش الـ grammar من رسايل الأخطاء.

---

## parameter ولا argument

~~~js
function greet(name) {}   // name = parameter (في التعريف)
greet("Sara");            // "Sara" = argument (في النداء)
~~~

عشان كده الرسالة بتقول [[Expected 2 arguments]]: هي بتعدّ اللي بعته وقت النداء.

---

## جملة MDN من الـ try، حتة حتة

~~~text
The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
~~~

| الحتة | معناها |
|---|---|
| [[The map() method of Array instances]] | الـ method اللي اسمها map الموجودة على أي array (الفاعل) |
| [[creates a new array]] | بتعمل array جديد (الفعل) |
| [[populated with the results]] | متعبّي بالنتايج |
| [[of calling a provided function]] | بتاعة نداء دالة انت بعتها |
| [[on every element]] | على كل عنصر |
| [[in the calling array]] | في الـ array اللي نادينا عليه map |

---

## كلمات في الجمل

- [[takes two parameters]]: [[takes]] مع الدوال = «بتاخد».
- [[has no side effects]]: ملهاش أثر برّا نفسها (pure).
- [[is called with (err, data)]]: بتتنادى والـ arguments دول.

---

## الخلاصة

- [[parameter]] في التعريف، و [[argument]] في النداء.
- [[property]] خاصية في object، و [[method]] دالة على object.
- [[dependency]] وجمعها [[dependencies]]، مش [[dependence]].`,
          lines: [
            R`parameter = في التعريف. «الدالة بتاخد باراميترين: name و age».`,
            R`argument = في النداء. رسالة TS الحقيقية: «متوقع ٢ arguments، وجالك ١».`,
            R`property = خاصية. رسالة Node الحقيقية: «مش قادر يقرا خصايص من undefined (وهو بيقرا name)».`,
            R`method = دالة على object. «map() بتعمل array جديد».`,
            R`instance = نسخة. «كل طلب بيعمل نسخة جديدة من الـ service».`,
            R`module = ملف/مكتبة. رسالة Node الحقيقية لما تكتب اسم مكتبة غلط (expresss بـ ٣ s).`,
            R`dependency = مكتبة معتمد عليها. «ضيف zod كـ dependency».`,
            R`scope = نطاق. «المتغير مش متعرّف في النطاق ده».`,
            R`callback = دالة بتتنادى بعدين. «الـ callback بتتنادى بـ (err, data)».`,
            R`return value = اللي بيرجع. «اللي بيرجع Promise».`,
            R`side effect = أثر برّا الدالة. «الدالة دي ملهاش آثار جانبية» (pure).`,
            R`key = مفتاح. تحذير React المشهور: «كل ابن في ليستة لازم يبقى ليه key فريد».`
          ],
          sol: R`الترجمة: «الـ method اللي اسمها map() الموجودة على أي array بتعمل array جديد، متعبّي بنتايج نداء دالة انت بتبعتها، على كل عنصر في الـ array اللي نادينا عليه map».

الكلمات من القايمة: [[method]]، و [[instances]]، و [[array]]، و [[function]]، و [[element]] (عنصر). وكلمات جديدة تضيفها لـ [[words.md]]: [[populated with]] = متعبّي بـ، و [[provided]] = اللي اتبعت، و [[calling array]] = الـ array اللي اتنادى عليه.

لو ترجمتها «الطريقة map تخلق مصفوفة جديدة مأهولة...» ده مش غلط بس مش مفيد: اقرا بمصطلحات المبرمجين زي ما هي (method و array)، وفكّر في الكود: [[const doubled = nums.map(n => n * 2)]].`
        },
        {
          cmd: "request / response / header",
          title: "كلمات الويب: request و payload و endpoint و query و token",
          desc: R`دي كلمات أي API وأي docs لـ backend. [[request]] الطلب، و [[response]] الرد، و [[header]] سطر معلومات فوق الطلب أو الرد، و [[body]] جسم الطلب/الرد، و [[payload]] الداتا المهمة اللي جوه، و [[endpoint]] عنوان محدد في الـ API ([[POST /orders]])، و [[route]] نفس الفكرة من ناحية السيرفر، و [[query string]] الجزء بعد [[?]] في الـ URL، و [[query parameter]] واحد منهم ([[?page=2]])، و [[path parameter]] جزء متغير في المسار ([[/users/:id]])، و [[status code]] الرقم (200 و 404)، و [[token]] قيمة بتثبت انت مين، و [[session]] جلسة، و [[cookie]]، و [[timeout]] أقصى وقت، و [[rate limit]] حد لعدد الطلبات، و [[redirect]] تحويل لعنوان تاني، و [[upstream]] السيرفر اللي ورا.`,
          example: R`request        Each request must include an Authorization header.
response       The response body is JSON.
header         Set the Content-Type header to application/json.
payload        The payload is too large (max 1 MB).
endpoint       The /users endpoint returns a paginated list.
query          Filter the results with the ?status= query parameter.
path param     Replace :id with the order ID.
status code    The server responds with status code 201 Created.
token          The access token expires after 15 minutes.
rate limit     You have exceeded the rate limit. Try again in 60 seconds.
redirect       Unauthenticated users are redirected to /login.
timeout        Set a timeout so the request doesn't hang forever.`,
          try: R`شغّل [[curl -i https://api.github.com/users/octocat]] واقرا أول ١٥ سطر (الـ headers). لكل header اكتب اسمه ومعناه في كلمتين. ركّز على اللي فيهم [[ratelimit]]: فاضلك كام طلب؟ وبيتجدد إمتى؟`,
          flag: "script",
          deep: {
            why: "الـ API docs مكتوبة بالكلمات دي بالظبط: «ابعت الـ token في الـ header، والـ payload في الـ body، وهترجعلك 201». ولو فاهمهم، هتقرا صفحة endpoint كاملة في دقيقة.",
            how: R`في أي صفحة API هتلاقي نفس الترتيب: الـ [[method]] والـ [[endpoint]]، وبعدين [[Parameters]] مقسومة ([[path]] و [[query]] و [[body]])، وبعدين [[Headers]]، وبعدين [[Responses]] بالـ status codes، وأمثلة.

كلمات مهمة جنبهم: [[paginated]] = مقسوم صفحات، و [[exceeded]] = عدّيت الحد، و [[include]] = لازم يبقى جوه، و [[hang]] = يفضل معلّق من غير رد، و [[forever]] = للأبد.

و [[Too Many Requests]] (429) و [[Payload Too Large]] (413) أسماء الـ status codes نفسها جمل إنجليزي مفهومة: اقراها زي ما هي.`,
            when: "وانت بتقرا docs أي API (Stripe و GitHub و أي API في شغلك)، ووانت بتكتب docs للـ API بتاعك.",
            mistakes: R`[[I sent a request for the API]] الصح [[I sent a request to the API]]. و [[the response is come]] الصح [[the response came back]] أو [[I got a response]]. و [[the header of the request]] مقبولة بس [[the request headers]] أطبع. و [[params]] اختصار parameters وبتتقال عادي في الكلام.`
          },
          teach: R`## صفحة API بالكلمات دي

أي صفحة endpoint مكتوبة بنفس الترتيب، والجمل اللي في المثال بتغطيه:

| الجزء | الجملة |
|---|---|
| الطلب لازم فيه إيه | [[Each request must include an Authorization header.]] |
| شكل الرد | [[The response body is JSON.]] |
| الـ query | [[Filter the results with the ?status= query parameter.]] |
| الـ path | [[Replace :id with the order ID.]] |
| الـ status | [[The server responds with status code 201 Created.]] |
| الحدود | [[You have exceeded the rate limit. Try again in 60 seconds.]] |

---

## headers حقيقية

شغّلت [[curl -i https://api.github.com/users/octocat]] من Ubuntu 24.04 (Docker). [[-i]] = اعرض الـ headers مع الرد. ودي أهم السطور:

~~~text الناتج (مختصر)
HTTP/2 200
content-type: application/json; charset=utf-8
cache-control: public, max-age=60, s-maxage=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 58
x-ratelimit-used: 2
x-ratelimit-reset: 1791471226
~~~

| الـ header | معناه |
|---|---|
| [[HTTP/2 200]] | نسخة البروتوكول، و 200 = نجح |
| [[content-type]] | الرد JSON بترميز utf-8 |
| [[cache-control: max-age=60]] | ينفع يتخزّن ٦٠ ثانية |
| [[x-ratelimit-limit: 60]] | مسموح ٦٠ طلب (من غير token، في الساعة) |
| [[x-ratelimit-remaining: 58]] | فاضلك ٥٨ |
| [[x-ratelimit-reset]] | إمتى العداد يتصفّر، بالثواني من ١٩٧٠ (Unix timestamp) |

[[x-]] في أول الاسم = header مش قياسي، الشركة عاملاه.

---

## كلمات في الجمل

- [[must include]] = لازم يبقى جوه.
- [[paginated]] = مقسوم صفحات.
- [[exceeded]] = عدّيت الحد.
- [[redirected to]] = اتحوّل لـ.
- [[so the request doesn't hang forever]]: [[so]] = عشان، و [[hang]] = يفضل معلّق.

---

## الخلاصة

- [[request to the API]] مش [[for]].
- الـ headers بتتقري كـ «اسم: قيمة».
- [[Too Many Requests]] (429) و [[Payload Too Large]] (413): أسماء الـ status codes نفسها جمل مفهومة.`,
          lines: [
            R`request + must include = كل طلب لازم يبقى فيه header اسمه Authorization.`,
            R`response body = جسم الرد. «جسم الرد JSON».`,
            R`header = سطر معلومات. «خلّي Content-Type يبقى application/json».`,
            R`payload too large = الداتا أكبر من المسموح (413). max = الحد الأقصى.`,
            R`endpoint + paginated = الـ endpoint ده بيرجّع ليستة مقسومة صفحات.`,
            R`query parameter = بعد ?. «فلتر النتايج بـ ?status=».`,
            R`path parameter = جزء في المسار. «حط رقم الأوردر مكان :id».`,
            R`status code = الرقم. «السيرفر بيرد بـ 201 Created» (اتعمل).`,
            R`token + expires after = الـ token بيخلص بعد ١٥ دقيقة.`,
            R`rate limit + exceeded = عدّيت الحد. رسالة 429 نموذجية.`,
            R`redirected to = اتحوّل لـ. «اللي مش مسجّلين بيتحوّلوا لـ /login».`,
            R`timeout + hang = حط أقصى وقت عشان الطلب ميفضلش معلّق للأبد. so = عشان.`
          ],
          sol: R`هتلاقي headers زي (الأرقام بتتغير):
[[HTTP/2 200]] ← الطلب نجح.
[[content-type: application/json; charset=utf-8]] ← الرد JSON بترميز utf-8.
[[cache-control: public, max-age=60, s-maxage=60]] ← ممكن يتخزن ٦٠ ثانية.
[[x-ratelimit-limit: 60]] ← مسموحلك ٦٠ طلب (من غير token، في الساعة).
[[x-ratelimit-remaining: 59]] ← فاضلك ٥٩.
[[x-ratelimit-reset: 17...]] ← الوقت اللي العداد هيتصفّر فيه، بصيغة Unix timestamp (ثواني من ١٩٧٠).
[[x-ratelimit-used: 1]] ← استخدمت ١.

جملة تكتبها في issue لو اتقفلت: [[I exceeded the unauthenticated rate limit (60 requests per hour); I will use a token.]]

لو مش فاهم [[reset]] هنا: مش «ارجع للأول» بالظبط، هي «امتى العداد هيبدأ من جديد».`
        },
        {
          cmd: "if / unless / instead of",
          title: "الكلمات الصغيرة اللي بتقلب المعنى: unless و otherwise و at least و e.g.",
          desc: R`دي أخطر مجموعة، لأنها صغيرة ومش بتاخد بالك منها، وبتقلب معنى الجملة كلها. جملة زي [[Do not use this in production unless you know what you are doing]] لو فوّت [[unless]] هتفهمها عكس.

الشروط: [[if]] لو، و [[unless]] إلا لو (= if not)، و [[whether]] سواء/هل، و [[only if]] بس لو، و [[even if]] حتى لو، و [[otherwise]] وإلا/غير كده، و [[as long as]] طول ما.
الوقت: [[before]] و [[after]] و [[until]] لحد، و [[once]] أول ما، و [[while]] طول ما، و [[as soon as]] أول ما.
البدائل: [[instead of]] بدل، و [[rather than]] بدل، و [[either ... or]] يا ده يا ده، و [[neither ... nor]] لا ده ولا ده.
الكمية: [[at least]] على الأقل، و [[at most]] على الأكتر، و [[up to]] لحد، و [[per]] لكل، و [[within]] خلال/جوه.
اختصارات: [[e.g.]] مثلًا، و [[i.e.]] يعني بالظبط، و [[etc.]] إلخ، و [[vs.]] مقابل، و [[via]] عن طريق، و [[respectively]] بالترتيب.`,
          example: R`unless         The cache is used unless you pass --no-cache.
only if        The hook runs only if the file has changed.
even if        fetch() resolves even if the server returns 404.
otherwise      Use a token; otherwise, requests are limited to 60 per hour.
until          The button stays disabled until the upload finishes.
once           Once the build is done, the app is deployed automatically.
instead of     Use const instead of let when the value never changes.
at least       The password must be at least 8 characters long.
at most        A page can contain at most 100 items.
within         The link expires within 24 hours.
e.g. / i.e.    Use a package manager (e.g. npm or pnpm), i.e. never copy files by hand.
respectively   The defaults are 3000 and 5432, respectively.`,
          try: R`اكتب «عكس» كل جملة من الـ example بتغيير الكلمة الصغيرة بس (مثلًا [[unless]] ← [[only if]]، و [[at least]] ← [[at most]]). وبعدين ترجم الجملتين (الأصلية والمعكوسة) بالعربي عشان تحس إن كلمة واحدة قلبت المعنى.`,
          flag: "script",
          deep: {
            why: R`معظم الـ bugs اللي سببها «قريت الـ docs غلط» جاية من الكلمات دي: [[at least]] و [[at most]]، أو [[unless]]، أو [[even if]]. الـ docs الكويسة بتحط كل الشروط المهمة في كلمة واحدة زي دي.`,
            how: R`طريقة القراية: لما تشوف جملة فيها شرط، اقسمها نصين عند الكلمة الصغيرة، واقرا كل نص لوحده، وبعدين اربطهم بمعنى الكلمة.

[[unless]] = [[if not]]. فـ [[The cache is used unless you pass --no-cache]] = [[If you don't pass --no-cache, the cache is used]].

[[respectively]] بتربط ليستتين بالترتيب: [[The defaults for the app and the database are 3000 and 5432, respectively]] = الـ app على 3000 والداتابيز على 5432.

[[e.g.]] (exempli gratia) = مثلًا، فيه غيرهم. [[i.e.]] (id est) = يعني بالظبط، مفيش غيره. وده غلط شائع حتى عند الأجانب.

و [[once]] ليها معنيين: «مرة واحدة» ([[runs once]]) و «أول ما» ([[once the build is done]]). لو بعدها جملة فيها فعل يبقى «أول ما».`,
            when: "في أي جملة docs فيها شرط أو رقم أو قيد، وخصوصًا جمل الأمان والإعدادات والـ validation.",
            mistakes: R`[[at least 8 characters]] بتتفهم «٨ بالظبط»، والصح «٨ أو أكتر». و [[e.g.]] و [[i.e.]] بيتبدّلوا. و [[until now]] بتتكتب بمعنى «لحد دلوقتي لسه» في جملة زي [[Until now I didn't find the bug]]، والأطبع [[I still haven't found the bug]] أو [[So far, I haven't found it]]. و [[instead of to use]] غلط، بعد [[instead of]] الفعل بـ ing: [[instead of using]].`
          },
          teach: R`## اقسم الجملة عند الكلمة الصغيرة

الطريقة: لاقي الكلمة الصغيرة، واقسم الجملة نصين عندها، واقرا كل نص لوحده، وبعدين اربطهم بمعناها.

~~~text
The cache is used   |unless|   you pass --no-cache.
   الـ cache شغال        إلا لو        بعت --no-cache
~~~

[[unless]] = [[if not]]. فالجملة = «لو مبعتش --no-cache، الـ cache شغال».

---

## جدول الكلمات بالجمل

| الكلمة | المعنى | الجملة | لو قريتها غلط |
|---|---|---|---|
| [[unless]] | إلا لو | cache unless --no-cache | تفهمها عكس |
| [[only if]] | بس لو | runs only if the file has changed | تفتكره بيشتغل دايمًا |
| [[even if]] | حتى لو | fetch() resolves even if ... 404 | تفتكر fetch بترمي على 404 |
| [[otherwise]] | وإلا | use a token; otherwise ... 60 per hour | |
| [[until]] | لحد ما | disabled until the upload finishes | |
| [[once]] + جملة | أول ما | once the build is done | تفهمها «مرة واحدة» |
| [[instead of]] | بدل | const instead of let | |
| [[at least]] | على الأقل | at least 8 characters | تفهمها «٨ بالظبط» |
| [[at most]] | على الأكتر | at most 100 items | |
| [[within]] | خلال | expires within 24 hours | |
| [[respectively]] | بالترتيب | 3000 and 5432, respectively | |

---

## e.g. و i.e.

~~~text
Use a package manager (e.g. npm or pnpm), i.e. never copy files by hand.
~~~

- [[e.g.]] = مثلًا، وفيه غيرهم (yarn و bun كمان).
- [[i.e.]] = يعني بالظبط، توضيح للي قبله.

## once: معنيين

| الجملة | المعنى |
|---|---|
| [[The callback runs once.]] | مرة واحدة |
| [[Once the build is done, ...]] | أول ما (بعدها جملة فيها فعل) |

---

## الخلاصة

- اقسم الجملة عند الكلمة الصغيرة.
- [[unless]] = [[if not]]، و [[at least 8]] = ٨ أو أكتر.
- بعد [[instead of]] الفعل بـ [[ing]]: [[instead of using]].`,
          lines: [
            R`unless = إلا لو. «الـ cache شغال إلا لو بعت --no-cache».`,
            R`only if = بس لو. «الـ hook بيشتغل بس لو الملف اتغير».`,
            R`even if = حتى لو. «fetch بتخلص بنجاح حتى لو السيرفر رجّع 404». ودي حقيقة مهمة.`,
            R`otherwise = وإلا. «استخدم token، وإلا هتتحدد بـ ٦٠ طلب في الساعة».`,
            R`until = لحد. «الزرار يفضل مقفول لحد ما الرفع يخلص».`,
            R`once + جملة = أول ما. «أول ما الـ build يخلص، التطبيق بيتنشر لوحده».`,
            R`instead of = بدل. «استخدم const بدل let لما القيمة مبتتغيرش».`,
            R`at least = على الأقل. «الباسورد لازم ٨ حروف أو أكتر».`,
            R`at most = على الأكتر. «الصفحة فيها ١٠٠ عنصر كحد أقصى».`,
            R`within = خلال. «الرابط بيخلص خلال ٢٤ ساعة».`,
            R`e.g. = مثلًا (فيه غيرهم)، i.e. = يعني بالظبط. «استخدم package manager (زي npm أو pnpm)، يعني متنسخش ملفات بإيدك أبدًا».`,
            R`respectively = بالترتيب. «القيم الافتراضية 3000 و 5432، بالترتيب» (يعني لحاجتين اتذكروا قبلها).`
          ],
          sol: R`أمثلة للعكس:
[[The cache is used only if you pass --cache.]] ← «الـ cache شغال بس لو بعت --cache» (عكس الأصل تمامًا).
[[fetch() rejects if the server returns 404.]] ← دي جملة غلط في الحقيقة! والأصلية ([[resolves even if]]) هي الصح. شايف إزاي كلمة واحدة بتفرق بين فهم صح و bug؟
[[The password must be at most 8 characters long.]] ← «٨ حروف كحد أقصى»، وده عكس المطلوب تمامًا.
[[Use let instead of const when the value changes.]] ← صح وبمعنى مختلف.

لو في جملة [[once]] فهمتها «مرة واحدة»، راجع القاعدة: بعدها [[the build is done]] (جملة فيها فعل)، يبقى «أول ما».`
        }
      ]
    }
]);
