// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "ابعت طلبات بنفسك",
      l: 3,
      n: "",
      items: [
        {
          cmd: "fetch من Console",
          title: "أسرع طريقة تجرب API",
          desc: "الطلب بيتبعت كأنه من الصفحة نفسها، يعني بالكوكيز بتاعتك. لو انت عامل login على موقعك، تقدر تكلّم الـ API بتاعه كيوزر مسجّل من غير ما تجيب توكن. لو بتكلّم دومين تاني، قواعد CORS هتطبق. Shift+Enter بتنزل سطر جديد في Console من غير ما تنفّذ.",
          example: R`await fetch("/api/me").then(r => r.json())

await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())`,
          try: "اعمل GET و POST للـ API بتاعك من Console وشوفهم ظاهرين في Network.",
          flag: "console",
          deep: {
            why: "عايز تجرّب API endpoint بسرعة من غير Postman. والطلب بييجي من الـ browser session، فالـ cookies والـ auth موجودين.",
            how: R`أي JavaScript بتكتبه في Console بيتنفّذ في context الصفحة الحالية. لو انت logged in، الطلب بيتبعت بكوكياتك أوتوماتيك.

[[await fetch(...)]] بيشتغل في Console. بعد [[.then(r => r.json())]] بيفتح الناتج كـ object تقدر تعدّيه.

الطلب بيظهر في تاب Network عادي، فتقدر تشوف كل تفاصيله.

Shift+Enter بينزّلك سطر جديد من غير تنفيذ، عشان تكتب كود متعدد الأسطر.`,
            when: "تجرّب endpoint جديد. تبعث بيانات معينة وتشوف الرد. تتأكد إن الـ auth شغال.",
            mistakes: "تستخدمه لطلبات مهمة وتنسى إنهم بيتنفّذوا فعلًا. DELETE في Console بيمسح فعلًا."
          },
          teach: R`## الأول: الطلب بيطلع من الصفحة نفسها

لما تكتب [[fetch]] في Console، الطلب بيتبعت كأن الصفحة هي اللي عملته: نفس الـ origin، ونفس الكوكيز. فلو انت logged in، الـ API هيعاملك كيوزر مسجّل. المثالين اتشغّلوا في Console في Chrome على صفحة على [[http://127.0.0.1:8791]] و API محلي بـ Express.

---

## ١. الـ GET: [[await fetch("/api/me").then(r => r.json())]]

من جوه لبرة:

1. [[fetch("/api/me")]]: ابعت GET (الافتراضي) لـ [[/api/me]] على نفس الموقع. بيرجّع **Promise** (وعد بنتيجة هتيجي بعدين).
2. [[.then(r => r.json())]]: لما الرد ييجي، سمّيه [[r]] واقرا الـ body كـ JSON. وده كمان Promise.
3. [[await]]: استنى لحد ما كله يخلص وهات النتيجة.

~~~text الناتج
{id: 42, name: 'Ali', role: 'user'}
~~~

ومن غير [[await]]:

~~~text fetch("/api/me").then(r => r.json())
Promise {<pending>}
~~~

بتاخد الـ Promise نفسه مش القيمة. فـ [[await]] هو اللي بيطلّع النتيجة.

---

## ٢. الـ POST سطر سطر

~~~javascript Console
await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())
~~~

اكتبه بـ Shift+Enter بين السطور، و Enter في الآخر.

| السطر | معناه |
|---|---|
| [[fetch("/api/users", {]] | الـ URL، وبعده object إعدادات الطلب |
| [[method: "POST",]] | نوع الطلب (الافتراضي GET) |
| [[headers: { "Content-Type": "application/json" },]] | قول للسيرفر «البودي JSON» |
| [[body: JSON.stringify({...})]] | البودي لازم نص، فـ [[JSON.stringify]] بيحوّل الـ object لنص JSON |
| [[}).then(r => r.json())]] | قفلة الإعدادات والـ fetch، وبعدين اقرا الرد JSON |

~~~text الناتج
{id: 7, name: 'test', email: 'test@example.com'}
~~~

الـ API رجّع الـ user الجديد ومعاه [[id]]، والـ status كان [[201]] (شفته بـ [[r.status]] في طلب تاني).

[[JSON.stringify]] لوحده:

~~~text JSON.stringify({ name: "test" })
'{"name":"test"}'
~~~

---

## ٣. جربت أشيل الـ Content-Type

~~~javascript Console
await fetch("/api/users", { method: "POST", body: JSON.stringify({ name: "no header" }) }).then(r => r.json())
~~~

~~~text الناتج
{id: 9}
~~~

الطلب نجح بس الاسم **ضاع**. من غير الـ header، المتصفح بيبعت النص بنوع [[text/plain]]، و [[express.json()]] بيقرا الـ body بس لو النوع [[application/json]]، فالسيرفر شاف body فاضي. ده خطأ صامت: مفيش error، بس الداتا مش وصلت.

## الخلاصة

- [[fetch]] من Console = من الصفحة، بكوكيزك وبقواعد CORS بتاعتها.
- [[await]] عشان تشوف القيمة مش [[Promise]].
- POST بـ JSON محتاج التلاتة: [[method]] و [[Content-Type]] و [[JSON.stringify]].
- الطلبات دي حقيقية: POST بيعمل، و DELETE بيمسح.`,
          lines: [
            "GET وحوّل الرد JSON. [[await]] شغال في Console مباشرة.",
            "POST لنفس الـ API.",
            "نوع الطلب.",
            "قول للسيرفر إن البودي JSON، وإلا ممكن يتجاهله.",
            "البودي لازم يتحوّل لنص بـ stringify.",
            "وحوّل الرد."
          ],
          sol: R`الـ GET بيرجع البيانات مباشرة في Console (object أو array)، والـ POST بيرجع اللي الـ API بيرجعه بعد الإنشاء (غالبًا الـ object الجديد ومعاه [[id]]). وفي تاب Network (فلتر Fetch/XHR) هتلاقي الطلبين، وفي عمود Initiator مكتوب حاجة زي [[VM123:1]] يعني جايين من Console.

دوس على الـ POST: في Payload هتلاقي [[{"name":"test","email":"test@example.com"}]]، والـ status [[201]] لو الـ API مكتوب صح. لو رجع [[400]] أو [[415]] غالبًا نسيت [[Content-Type: application/json]] فالسيرفر مقراش الـ body. ولو الـ GET رجع [[401]] وانت عامل login، يبقى الـ API على دومين تاني والكوكي ما اتبعتتش (محتاج [[credentials: "include"]]).`
        },
        {
          cmd: "Copy as cURL",
          title: "خد أي طلب وكرره من الترمنال",
          desc: "كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL. الطلب هيتنسخ بكل الـ headers والكوكيز والبودي، فتلصقه في الترمنال وتعدّل فيه اللي انت عايزه. على ويندوز اختار «(bash)» لو هتشغّله في Git Bash أو WSL، أو «Copy as PowerShell». وخد بالك: الأمر المنسوخ فيه الكوكيز والتوكن بتوعك، فمتبعتهوش لحد ومتحطهوش في issue على GitHub.",
          example: R`curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
curl -i 'https://example.com/api/orders?page=2' -H 'cookie: session=...'`,
          try: "انسخ طلب من موقعك، وشغّله في الترمنال، وغيّر فيه page أو أي parameter.",
          flag: "term",
          deep: {
            why: "لاقيت طلب في Network فيه مشكلة وعايز تجرّبه من الترمنال. Copy as cURL بيحوّله لأمر جاهز بكل الـ headers والكوكيز.",
            how: R`كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL (bash). الأمر فيه: الـ URL، وكل الـ headers، والـ body لو POST.

تلصقه في الترمنال وتشغّله. تقدر تعدّل: الـ URL، أو قيمة header، أو الـ body.

تحذير: الأمر بيتضمن cookies وTokens الـ session الحقيقية. متبعتهوش في رسايل أو تحطه على GitHub.`,
            when: "Bug في API وعايز تعزله. تشارك الطلب مع backend developer.",
            mistakes: "تنسى تغيير الكوكيز والتوكنات قبل ما تشارك."
          },
          teach: R`## الأول: الطلب كله في أمر واحد

Copy as cURL في Network بيحوّل الطلب لأمر [[curl]] فيه كل حاجة: الـ URL والـ method والـ headers والكوكيز والبودي. مكان الأمر في القايمة من Chrome DevTools docs. والأوامر اللي تحت اتشغّلت بـ [[curl.exe]] في PowerShell 7 على API محلي.

---

## ١. السطر الأول

~~~bash
curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
~~~

| الحتة | معناها |
|---|---|
| [[curl 'URL']] | الطلب، و GET لأن مفيش [[-X]] ولا بودي |
| [[-H 'accept: application/json']] | header: «عايز الرد JSON» |
| [[-H 'cookie: session=...']] | الكوكي بتاعتك. ده اللي بيخلي الطلب «logged in» |
| [[--compressed]] | اطلب رد مضغوط (gzip أو br) وفكّه، زي المتصفح |

الأمر الحقيقي بيبقى أطول بكتير ([[user-agent]] و [[referer]] و [[sec-ch-ua]]...)، ومعظمهم ممكن تمسحه.

جربته على السيرفر المحلي:

~~~powershell
curl.exe 'http://127.0.0.1:8791/api/orders' -H 'accept: application/json' -H 'cookie: session=s3cr3t' --compressed
~~~

~~~text الناتج
{"page":1,"orders":[{"id":11,"total":250},{"id":12,"total":90}]}
~~~

## ٢. السطر التاني: عدّلت فيه

~~~powershell
curl.exe -i 'http://127.0.0.1:8791/api/orders?page=2' -H 'cookie: session=s3cr3t'
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 64

{"page":2,"orders":[{"id":21,"total":250},{"id":22,"total":90}]}
~~~

- [[?page=2]]: query parameter، والـ API رجّع الصفحة التانية.
- [[-i]]: اطبع headers الرد قبل البودي، فتشوف الـ status.
- الـ URL جوه علامات تنصيص عشان [[?]] و [[&]] ليهم معنى في الـ shell.

---

## ٣. أنهي نسخة تنسخ

| هتشغّله في | اختار |
|---|---|
| Git Bash أو WSL أو لينكس أو ماك | Copy as cURL (bash) |
| CMD | Copy as cURL (cmd) |
| PowerShell | Copy as PowerShell (بيطلع [[Invoke-WebRequest]]) أو نسخة bash مع [[curl.exe]] في PowerShell 7 |

الفرق في علامات التنصيص: bash بيستخدم [['...']]، و CMD مبيفهمش الـ single quotes.

## الخلاصة

- Copy as cURL = نفس الطلب بالظبط، تعدّل فيه وتعيده.
- فيه كوكيز وتوكن حقيقيين: متشاركهوش من غير ما تمسحهم.
- لو رجع 401 بعد شوية، الـ session خلصت، انسخه تاني.`,
          lines: [
            "اللي بيطلع من Copy as cURL: الـ URL، وكل header ([[-H]]) بما فيهم الكوكي، و [[--compressed]] يقبل رد مضغوط.",
            "نفس الطلب بعد ما عدّلت فيه: صفحة تانية، و [[-i]] عشان تشوف الـ status."
          ],
          sol: R`في Network كليك يمين على الطلب ثم Copy ثم Copy as cURL (bash). هتلاقي أمر طويل فيه [[-H 'cookie: ...']] و headers كتير. الصقه في الترمنال، المفروض يرجع نفس الـ JSON اللي شايفه في Preview.

غيّر [[page=1]] لـ [[page=2]] في الـ URL (خليه جوه علامات التنصيص عشان [[&]] و [[?]]) وشغّله، هتاخد الصفحة اللي بعدها. زوّد [[-i]] عشان تشوف الـ status.

لو رجعلك [[401]] بعد شوية، الكوكي أو الـ token خلصوا، انسخ الطلب تاني. ولو الناتج رموز غريبة يبقى نسيت [[--compressed]]. وعلى ويندوز اختار «Copy as cURL (cmd)» أو شغّله من Git Bash/WSL لأن علامات التنصيص مختلفة.`
        },
        {
          cmd: "curl -i / -v",
          title: "ابعت واقرا الرد كامل",
          desc: "[[-i]] بيطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب اللي اتبعت نفسه. [[-H]] header، و [[-d]] البودي، و [[-X]] الـ method. ولو الرد JSON وصّله بـ [[jq]] يطلع منسّق.",
          example: R`curl -i https://api.github.com/users/octocat
curl -s https://api.github.com/users/octocat | jq '{name, public_repos}'
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
curl -H "Authorization: Bearer $TOKEN" https://example.com/api/me`,
          try: "اعمل طلب login غلط للـ API بتاعك بـ curl -i، واقرا الـ status والـ body.",
          flag: "term",
          deep: {
            why: "تجرّب API من الترمنال وتقرا الـ status والـ headers والـ body في مكان واحد.",
            how: R`[[-i]] بيطبع الـ response headers قبل الـ body. أول سطر دايمًا الـ status. مفيد لما تشوف السيرفر بيرجع إيه بالظبط.

[[-v]] (verbose) أقوى: بيطبع الطلب (السطور بتبدأ بـ [[>]]) والرد ([[<]]) وتفاصيل الاتصال. مفيد جدًا لـ debugging HTTPS.

[[-s]] بيخفي شريط التحميل. [[-o /dev/null]] برمي الـ body. [[| jq]] بيعرض الـ JSON منسّق.

لو بتبعت JSON: علامات تنصيص مهمة، single quotes بره والـ JSON جواه.`,
            when: "تجرّب API endpoint. تتأكد من الـ headers. تكتب سكربت health check.",
            mistakes: "على ويندوز في CMD، single quotes غير مدعومة. استخدم double quotes."
          },
          teach: R`## الأول: curl بيوريك قد إيه من الكلام

| الفلاج | بيطبع إيه |
|---|---|
| (من غير حاجة) | البودي بس |
| [[-i]] (include) | headers الرد + البودي |
| [[-v]] (verbose) | الاتصال + الطلب اللي اتبعت + headers الرد + البودي |
| [[-s]] (silent) | يشيل شريط التحميل |

الأمثلة اتشغّلت: الـ GitHub في [[docker run --rm ubuntu:24.04]] (curl 8.5.0 و jq 1.7)، والـ login و [[-v]] على API محلي بـ [[curl.exe]] (8.21.0) في ويندوز.

---

## ١. [[curl -i https://api.github.com/users/octocat]]

~~~text الناتج (أول سطور، لينكس)
HTTP/2 200
content-type: application/json; charset=utf-8
cache-control: public, max-age=60, s-maxage=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 57
...

{
  "login": "octocat",
  ...
~~~

[[x-ratelimit-remaining: 57]] معناها: من غير توكن مسموحلك ٦٠ طلب في الساعة، وفاضل ٥٧. حاجة زي دي مش هتشوفها من غير [[-i]].

## ٢. [[curl -s https://api.github.com/users/octocat | jq '{name, public_repos}']]

- [[-s]]: من غير شريط التحميل، عشان ميتلخبطش مع الـ JSON.
- [[| jq]]: ابعت الرد لـ [[jq]]، برنامج بيقرا JSON.
- [['{name, public_repos}']]: اعمل object جديد فيه المفتاحين دول بس.

~~~text الناتج
{
  "name": "The Octocat",
  "public_repos": 8
}
~~~

## ٣. الـ POST: login بباسورد غلط

~~~bash
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
~~~

| الحتة | معناها |
|---|---|
| [[-X POST]] | الـ method |
| [[-H "Content-Type: application/json"]] | البودي JSON |
| [[-d '...']] | البودي (data). الـ JSON جواه double quotes، فبرّه single quotes |

على API محلي:

~~~text الناتج
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37

{"error":"Invalid email or password"}
~~~

### على ويندوز: علامات التنصيص

جربت نفس السطر بالظبط بـ [[curl.exe]]:

| الشِل | النتيجة |
|---|---|
| PowerShell 7 | [[401]]: اشتغل زي bash |
| Windows PowerShell 5.1 | [[400 Bad Request]]: الـ double quotes جوه الـ JSON اتشالت قبل ما توصل لـ curl، والسيرفر قال [[SyntaxError: Expected property name]] |
| CMD | لازم double quotes بره و [[\"]] جوه: [[-d "{\"email\":\"a@b.com\",\"password\":\"secret\"}"]]، وكده رجع 401 |

## ٤. [[curl -H "Authorization: Bearer $TOKEN" URL]]

- [[Authorization: Bearer ...]]: الطريقة المعتادة تبعت توكن.
- [[$TOKEN]]: الـ shell بيحط قيمة المتغير [[TOKEN]] مكانه قبل ما curl يشتغل. اعمله الأول بـ [[TOKEN=abc123]] (في bash) أو [[$env:TOKEN = "abc123"]] واكتب [[$env:TOKEN]] (في PowerShell). وكده التوكن مش مكتوب في الأمر نفسه فمش هيبان في الـ history.

---

## ٥. [[-v]]: الطلب نفسه

~~~text curl.exe -v http://127.0.0.1:8791/api/me (ويندوز)
*   Trying 127.0.0.1:8791...
* Established connection to 127.0.0.1 (127.0.0.1 port 8791) from 127.0.0.1 port 65505
* using HTTP/1.x
> GET /api/me HTTP/1.1
> Host: 127.0.0.1:8791
> User-Agent: curl/8.21.0
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 36
<
* Connection #0 to host 127.0.0.1:8791 left intact
{"id":42,"name":"Ali","role":"user"}
~~~

| أول السطر | معناه |
|---|---|
| [[*]] | معلومات curl عن الاتصال |
| [[>]] | اللي curl **بعته** |
| [[<]] | اللي السيرفر **رده** |

السطر الفاضي بعد [[>]] و [[<]] هو الفاصل بين الـ headers والبودي في HTTP نفسه.

## الخلاصة

- [[-i]] للـ status والـ headers، [[-v]] لما عايز تشوف اللي اتبعت كمان.
- [[-X]] الـ method، [[-H]] header، [[-d]] البودي، و [[| jq]] للـ JSON.
- على ويندوز: PowerShell 7 زي bash، و 5.1 بيبوّظ الـ JSON، و CMD محتاج [[\"]].`,
          lines: [
            "GET مع الـ headers والـ status قبل البودي.",
            "الرد JSON، خد منه حقلين بس بـ jq.",
            "POST بـ JSON: [[-X POST]] النوع، و [[-H]] نوع المحتوى، و [[-d]] البودي بين single quotes.",
            "طلب بتوكن في header الـ Authorization، والتوكن من متغير."
          ],
          sol: R`جربتها على API محلي بباسورد غلط:

[[HTTP/1.1 401 Unauthorized]]
[[Content-Type: application/json]]
وبعد السطر الفاضي الـ body: [[{"error":"Invalid email or password"}]]

ده الصح: [[401]] (أو [[400]] لو الـ body نفسه ناقص) ورسالة عامة متقولش هل الإيميل موجود ولا لأ. لو رجعلك [[200]] ومعاه [[{"success":false}]] ده تصميم وحش لأن أي client أو monitoring هيفتكره نجح. ولو [[500]] يبقى فيه exception في الكود مع الباسورد الغلط، افتح logs. ولو [[404]] يبقى الـ route غلط أو ناقصه prefix زي [[/api/v1]].`
        }
      ]
    },
    {
      t: "Debugging",
      l: 3,
      n: "",
      items: [
        {
          cmd: "Recorder",
          title: "سجّل خطوات وكررها",
          desc: "تاب Recorder بيسجّل اللي بتعمله (كليكات وكتابة وتنقل) كـ user flow، وتعيده بضغطة بدل ما تملى نفس الفورم ٢٠ مرة وانت بتصلّح bug. وفيه زرار يقيس أداء الـ flow في Performance، وتصدّره كـ Puppeteer script أو JSON.",
          example: R`Ctrl+Shift+P > "Show Recorder"
Start new recording > do the flow > End recording
Replay (Slow / Normal)
Export > Puppeteer / JSON`,
          try: "سجّل flow الـ login والـ checkout في موقعك، وكرره بعد كل تعديل.",
          flag: "keys",
          deep: {
            why: "bug بيظهر بعد ٦ خطوات، وكل تجربة بتعيدهم بإيدك.",
            how: "بيسجّل الخطوات مع selectors لكل عنصر، وتقدر تعدّل أي خطوة أو تحط breakpoint عليها. الـ Replay بسرعة عادية أو بطيئة. والتصدير لـ Puppeteer بيحوّله لاختبار أوتوماتيك.",
            when: "bugs في flows طويلة، وقياس أداء تفاعل كامل.",
            mistakes: "تسجّل على داتا بتتغير (IDs عشوائية) فالـ Replay يفشل."
          },
          teach: R`## الأول: Recorder بيحوّل اللي بتعمله لخطوات

تاب Recorder بيسجّل حركاتك على الصفحة (فتح URL، كليك، كتابة، Enter...) كخطوات، كل خطوة معاها selectors للعنصر، وبعدين يعيدها لوحده. كل الكلام هنا من Chrome DevTools docs (صفحة Recorder)، لأنه أداة واجهة مقدرتش أشغّلها من الترمنال.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Ctrl+Shift+P > "Show Recorder"]] | يفتح التاب (أو من القايمة ⋮ ثم More tools ثم Recorder) |
| [[Start new recording > do the flow > End recording]] | تسمّي التسجيل، تعمل الخطوات عادي، وتوقّف |
| [[Replay (Slow / Normal)]] | يعيد الخطوات. Slow بيبطّأ عشان تشوف بعينك |
| [[Export > Puppeteer / JSON]] | يطلّع script تشغّله بـ Node أو تحطه في اختبارات |

## ٢. شكل الخطوات بعد التسجيل

~~~text مثال توضيحي لشكل الخطوات
Set viewport
Navigate      http://localhost:3000/login
Click         aria/Email
Change        aria/Email          value: test@example.com
Click         aria/Password
Change        aria/Password       value: ••••
Click         aria/Log in
~~~

- [[aria/Email]] selector بالاسم اللي قارئ الشاشة بيقراه (label الخانة). ده أثبت من [[div:nth-child(3)]] لأنه مش بيتغير لما التصميم يتغير.
- **Change** = الكتابة في خانة، ومعاها القيمة.
- كل خطوة تقدر تفتحها وتعدّل الـ selector أو تمسحها، وتحط breakpoint عليها فالـ Replay يقف قبلها.

## ٣. ليه الـ Replay بيفشل

| السبب | العلاج |
|---|---|
| class بيتولد لوحده ([[css-1x2y3z]]) | [[data-testid]] أو aria label ثابت |
| داتا بتتغير (إيميل لازم يبقى جديد كل مرة) | عدّل الخطوة أو استخدم حساب تجربة ثابت |
| الصفحة أبطأ من التسجيل | الخطوات بتستنى العنصر لحد timeout، زوّده من إعدادات الخطوة |

## الخلاصة

- سجّل الـ flow مرة، وأعده بعد كل تعديل بدل ما تكتبه بإيدك.
- selectors بالـ aria أو [[data-testid]] عشان الـ Replay يعيش.
- Export لـ Puppeteer يحوّله لاختبار أوتوماتيك.`,
          sol: R`بعد End recording هتلاقي قائمة خطوات: [[Navigate]]، [[Click]] على selector زي [[aria/Login]] أو [[#email]]، [[Change]] بالقيمة اللي كتبتها، وهكذا. Replay بيعيدهم ولو كله عدّى هتلاقي علامة ✓ جنب كل خطوة.

لو خطوة فشلت بعد تعديل، هتقف عندها ويقولك [[Timed out]] أو إن العنصر مش لاقيه: ده إما bug حقيقي في الـ flow أو selector اتغير (زي class بيتولد لوحده). الحل إنك تحط [[data-testid]] أو تستخدم aria labels ثابتة.

متسجلش checkout بكارت حقيقي، استخدم وضع test في بوابة الدفع. وتقدر تعمل Export لـ Puppeteer أو JSON وتحوّله لـ test حقيقي في CI بدل ما تكرره بإيدك.`
        },
        {
          cmd: "Sources و breakpoints",
          title: "وقّف الكود وبص جواه",
          desc: "تاب Sources: افتح الملف (Ctrl+P للبحث)، ودوس على رقم أي سطر تحط breakpoint. الكود هيوقف عنده، وتقدر تشوف قيمة كل متغير وتمشي خطوة خطوة. أو اكتب [[debugger;]] في الكود نفسه. و [[{}]] تحت بيرتب الملفات المضغوطة. و XHR/fetch Breakpoints بيوقّف أول ما أي طلب لـ URL معين يطلع، ومفيد لما مش عارف مين اللي بيبعت الطلب.",
          example: R`Ctrl+P             Open a file by name
Click line number  Add breakpoint
F8                 Resume
F10                Step over
F11                Step into
{ }                Pretty-print minified code`,
          try: "حط breakpoint في handler بتاع زرار في موقعك، ودوس الزرار، وامشي خطوة خطوة.",
          flag: "keys",
          deep: {
            why: "console.log مش بيعطيك كل المعلومات. Breakpoints بتوقّف الكود وتخليك تمشي فيه سطر سطر وتشوف قيمة كل متغير.",
            how: R`تاب Sources بيعرض كل الملفات المحمّلة. Ctrl+P بيفتح بحث بالاسم.

دوس على رقم أي سطر يظهر نقطة زرقاء (breakpoint). لما الكود يوصله يوقف. في اليمين كل المتغيرات وقيمها.

F8 (Resume) يكمّل. F10 (Step over) ينفّذ السطر ويوقف على اللي بعده. F11 (Step into) يدخل جوه function.

[[debugger;]] في الكود نفسه بيعمل breakpoint، وبيشتغل بس لو DevTools مفتوحة.`,
            when: "bug مش قادر تفهمه بـ console.log. متغير بياخد قيمة غلط ومش عارف متى ومنين.",
            mistakes: "تنسى تشيل breakpoints، فيومًا الكود يوقف ومش هتعرف ليه."
          },
          teach: R`## الأول: breakpoint = الكود يقف ويستناك

بدل ما تطبع قيم بـ [[console.log]]، الـ breakpoint بيوقّف الكود عند سطر معين، وتشوف كل المتغيرات اللي موجودة ساعتها، وتكمّل خطوة خطوة. الاختصارات من Chrome DevTools docs (صفحة JavaScript debugging). والوقفات اللي تحت حقيقية: حطيت breakpoint ببروتوكول DevTools (نفس اللي بيحصل لما تدوس على رقم السطر) في Chrome ودوست الزرار.

---

## ١. سطور المثال

| الاختصار | بيعمل إيه |
|---|---|
| [[Ctrl+P]] | يدوّر على ملف بالاسم |
| Click line number | breakpoint على السطر (علامة زرقا) |
| [[F8]] | Resume: كمّل لحد الـ breakpoint الجاي |
| [[F10]] | Step over: نفّذ السطر ده كله وقف على اللي بعده |
| [[F11]] | Step into: لو السطر بينادي function، ادخل جواها |
| [[{ }]] | Pretty print: رتّب ملف minified في أسطر |

---

## ٢. التجربة

~~~text cart.js
1  const prices = { pen: 10, cup: 25 };
2  function total(items) {
3    let sum = 0;
4    for (const it of items) sum += prices[it.name] * it.qty;
5    return sum;
6  }
7  document.getElementById("buy").addEventListener("click", (event) => {
8    const items = [{ name: "pen", qty: 2 }, { name: "cup", qty: 1 }];
9    const t = total(items);
10   console.log("total", t);
11 });
~~~

breakpoint على السطر ٩، ودوست Buy:

~~~text الوقفات (من Scope ثم Local)
وقف عند cart.js:9 في الفانكشن (anonymous)   Local: event=PointerEvent, items=Array(2), t=<لسه>
F11 (Step into)  →  cart.js:3 في total      Local: items=Array(2), sum=<لسه>
F10 (Step over)  →  cart.js:4 في total      Local: items=Array(2), sum=0
F8 (Resume)      →  Console: total 45
~~~

نقرا الوقفات:

- الوقفة الأولى قبل ما السطر ٩ يتنفّذ، فـ [[t]] لسه ملوش قيمة (السطر اللي بيعرّفه متنفّذش). و [[items]] ليه قيمة لأن السطر ٨ خلص.
- [[(anonymous)]] لأن الـ handler arrow function من غير اسم، و [[event]] هو الكليك نفسه ([[PointerEvent]]).
- F11 دخلنا جوه [[total]]، فالـ Local بقى متغيرات [[total]] بس.
- F10 نفّذ [[let sum = 0]] فـ [[sum]] بقى [[0]].
- F8 كمّل للآخر: ١٠ × ٢ + ٢٥ × ١ = ٤٥.

---

## ٣. [[debugger;]] في الكود

بدل الدوس على رقم السطر، تكتب [[debugger;]] في الكود نفسه، والكود يقف عنده **بس لو DevTools مفتوحة**. ومن غيرها السطر ملوش أي تأثير. متنساش تشيله قبل الـ commit.

## ٤. XHR/fetch Breakpoints

في Sources على اليمين، تكتب جزء من URL (زي [[/api/orders]])، والكود يقف عند السطر اللي بيبعت أي طلب الـ URL بتاعه فيه الكلام ده. تلاقي مين بيبعت الطلب من غير ما تدوّر في الكود.

## الخلاصة

- breakpoint = الكود يقف وتشوف كل المتغيرات في Scope.
- F10 فوق السطر، F11 جوه الـ function، F8 كمّل.
- [[debugger;]] بيشتغل بس و DevTools مفتوحة.`,
          sol: R`لما تدوس الزرار الصفحة هتقف ويظهر شريط [[Paused in debugger]]، والسطر اللي عليه الـ breakpoint متعلّم بالأزرق. على اليمين في Scope هتلاقي المتغيرات بقيمها (زي [[event]] و [[this]])، ولو وقفت بالماوس على أي متغير في الكود هيوريك قيمته.

F10 يمشي سطر سطر، F11 يدخل جوه دالة بتتنادي، F8 يكمّل. لو الكود minified ([[index-a1b2.js]] سطر واحد طويل) دوس [[{ }]] الأول، ولو فيه source maps هتلاقي ملفاتك الأصلية في Ctrl+P.

لو دوست الزرار والصفحة ما وقفتش: الـ breakpoint في سطر مش بيتنفذ (مثلًا تعريف الدالة مش جسمها) أو في ملف قديم بعد تعديل. البديل الأسرع: Elements ثم Event Listeners على الزرار ثم دوس على اسم الملف، أو اكتب [[debugger;]] في الكود.`
        },
        {
          cmd: "chrome://inspect",
          title: "ديبج Node وموبايل حقيقي",
          desc: "شغّل Node بـ [[--inspect]] وافتح chrome://inspect في Chrome، هتلاقي التطبيق ظاهر وتقدر تحط breakpoints في كود السيرفر بنفس الطريقة. ونفس الصفحة بتفتح DevTools لموبايل أندرويد متوصل بـ USB (فعّل USB debugging من Developer options في الموبايل).",
          example: R`node --inspect server.js
node --inspect-brk server.js
# then open chrome://inspect in Chrome`,
          try: "شغّل API بتاعك بـ --inspect وحط breakpoint في route.",
          flag: "term",
          deep: {
            why: "بتطوّر Node.js API وعايز تعمل debug بنفس أدوات الـ frontend.",
            how: R`[[node --inspect server.js]] بيشغّل Node ويفتح debug server. افتح chrome://inspect في Chrome، وهتلاقي تطبيقك في «Remote Target». دوس Inspect وهيفتح DevTools مربوطة بـ Node.

كل الأدوات موجودة: Sources لـ breakpoints، وConsole لتنفيذ JavaScript جوه Node.

[[--inspect-brk]] بيوقف على أول سطر فورًا، مفيد لو المشكلة في الـ startup.`,
            when: "bug في Node API صعب بـ console.log. performance issue في الـ server.",
            mistakes: "تترك [[--inspect]] شغال على سيرفر إنتاج. مفيهوش أي باسورد: أي عملية على السيرفر (أو أي حد من بره لو استخدمت 0.0.0.0) يقدر يتصل وينفّذ كود."
          },
          teach: R`## الأول: نفس DevTools، بس لـ Node

Node فيه debugger جاهز. [[--inspect]] بيفتح بورت (افتراضيًا [[127.0.0.1:9229]])، و Chrome بيتصل بيه من صفحة [[chrome://inspect]] ويفتحلك DevTools على كود السيرفر. اتشغّل على Node 24 على ويندوز بملف [[server.js]] فيه سيرفر http صغير على بورت 3999.

---

## ١. [[node --inspect server.js]]

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/5dc9e228-fd3a-4d7e-87a5-ccba58047bd2
For help, see: https://nodejs.org/learn/getting-started/debugging
API on http://127.0.0.1:3999
~~~

- [[ws://]] اتصال WebSocket، وده اللي DevTools بيتكلم بيه مع Node.
- [[127.0.0.1:9229]] جهازك بس، بورت 9229.
- الـ ID الطويل بيتولد كل تشغيلة، عشان محدش يخمّن العنوان.
- السطر التالت من الكود نفسه: السيرفر اشتغل عادي ورد على الطلبات.

وعشان تشوف إن البورت شغال من غير Chrome:

~~~powershell
curl.exe -s http://127.0.0.1:9229/json/list
~~~

~~~text الناتج (مختصر)
[ {
  "description": "node.js instance",
  "title": "server.js",
  "type": "node",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/5dc9e228-fd3a-4d7e-87a5-ccba58047bd2"
} ]
~~~

ده بالظبط اللي [[chrome://inspect]] بيقراه ويعرضه تحت Remote Target باسم [[server.js]] ولينك inspect.

## ٢. [[node --inspect-brk server.js]]

[[brk]] = break: يقف على أول سطر ويستناك تتصل وتدوس Resume.

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/eb6c957c-06ce-4f1d-95c4-6e069c692d89
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

مفيش [[API on ...]]: الكود لسه مبدأش. جربت [[curl.exe http://127.0.0.1:3999/x]] ورجع exit code 7 (couldn't connect)، لأن السيرفر لسه مفتحش بورته. مفيد لما الـ bug في أول ما التطبيق يقوم.

## ٣. السطر التالت [[# then open chrome://inspect in Chrome]]

تعليق: الخطوة الجاية في المتصفح مش في الترمنال. افتح [[chrome://inspect]]، ولو تطبيقك مش ظاهر دوس Configure واتأكد إن [[localhost:9229]] موجود. ومن هناك (حسب Chrome DevTools docs) Inspect يفتح نافذة فيها Sources و Console على كود Node، والـ breakpoints بنفس طريقة درس Sources.

| الفلاج | الكود يبدأ؟ | إمتى |
|---|---|---|
| [[--inspect]] | أيوه على طول | تديبج طلبات وهو شغال |
| [[--inspect-brk]] | لأ، يستنى | bug في الـ startup |
| [[--inspect=0.0.0.0:9229]] | أيوه، ومفتوح لكل الشبكة | جوه Docker بس، ومع بورت مربوط على 127.0.0.1 |

## الخلاصة

- [[--inspect]] بيفتح debugger على [[127.0.0.1:9229]] من غير باسورد.
- [[chrome://inspect]] بيلاقيه ويفتح DevTools عليه.
- متشغّلوش على سيرفر إنتاج، ومتفتحوش على [[0.0.0.0]] على شبكة.`,
          lines: [
            "شغّل Node وافتح بورت للـ debugger، وبعدين chrome://inspect في المتصفح.",
            "نفس الحاجة بس يوقف على أول سطر ويستناك."
          ],
          sol: R`[[node --inspect server.js]] بيطبع قبل أي حاجة:

[[Debugger listening on ws://127.0.0.1:9229/720e51a2-...]]
[[For help, see: https://nodejs.org/learn/getting-started/debugging]] (ده على Node 24، والنسخ القديمة بتكتب لينك تاني)

افتح [[chrome://inspect]] وهتلاقي تحت Remote Target اسم الملف ولينك [[inspect]]. دوسه، هتتفتح نافذة DevTools، افتح الملف بـ Ctrl+P وحط breakpoint في الـ route handler، وابعت طلب ([[curl localhost:3000/api/...]]). الطلب هيفضل معلّق والـ debugger وقف عند السطر، وتقدر تشوف [[req.body]] و [[req.params]] في Scope.

لو مفيش حاجة ظاهرة في chrome://inspect: البورت 9229 مش في الـ Configure (ضيف [[localhost:9229]])، أو السيرفر شغال في Docker أو WSL من غير [[--inspect=0.0.0.0:9229]] وفتح البورت. ولو مع nodemon أو tsx، مرّر الفلاج ليهم هما.`
        }
      ]
    },
    {
      t: "الأداء والجودة",
      l: 3,
      n: "",
      items: [
        {
          cmd: "Lighthouse",
          title: "تقرير شامل بدرجات",
          desc: "تاب Lighthouse بيقيس Performance و Accessibility و Best Practices و SEO، ويقولك تصلّح إيه بالظبط. شغّله في نافذة Incognito عشان الـ extensions متأثرش، وعلى Mobile. من أهم الأرقام في قسم Performance: [[LCP]] أكبر عنصر يظهر في 2.5 ثانية أو أقل، و [[CLS]] الصفحة متتنططش وهي بتحمّل (0.1 أو أقل)، و [[TBT]] (Total Blocking Time) قد إيه الـ JavaScript قفل الصفحة وهي بتحمّل. الـ Core Web Vitals التالت [[INP]] (الصفحة ترد على الضغط في 200ms أو أقل) التقرير العادي ده (وضع Navigation) مبيقيسوش، لأنه محتاج تفاعل حد مع الصفحة (وضع Timespan في DevTools بيقيسه من ضغطاتك انت بس)، فـ TBT هو الرقم اللي بيدلّك عليه في المعمل. INP الحقيقي تلاقيه في PageSpeed Insights (قسم بيانات الزوار الحقيقيين من CrUX، لو موقعك عليه زيارات كفاية) أو تقيسه بنفسك بمكتبة [[web-vitals]].",
          example: R`npx lighthouse https://example.com --view
npx lighthouse https://example.com --preset=desktop --output=html --output-path=report.html`,
          try: "طلّع تقرير Lighthouse لموقعك على Mobile، وصلّح أول 3 حاجات قالك عليها، وقارن الدرجة.",
          flag: "term",
          deep: {
            why: "موقعك شغال، بس محتاج تعرف إزاي Google بيقيّمه من ناحية السرعة والـ SEO والـ accessibility.",
            how: R`Lighthouse بيعمل زيارة ويقيس على ٤ محاور: Performance، وAccessibility، وBest Practices، وSEO. وكل محور درجة من ١٠٠.

Core Web Vitals التلاتة: LCP (Largest Contentful Paint) وقت ظهور أكبر محتوى، والهدف ٢.٥ ثانية أو أقل. CLS (Cumulative Layout Shift) قد إيه عناصر بتتحرك وهي بتتحمّل، ٠.١ أو أقل. INP (Interaction to Next Paint) الوقت بين الضغط والرد، ٢٠٠ms أو أقل.

تقرير Lighthouse العادي (Navigation) بيقيس LCP و CLS في المعمل (lab data)، لكن مبيقيسش INP (وضع Timespan بيقيسه من تفاعلاتك انت بس، مش من الزوار)، لأن INP بيتحسب من تفاعلات الزوار الحقيقيين طول زيارتهم. بداله Lighthouse بيدّيك TBT (Total Blocking Time)، ودا مجموع الوقت اللي الـ main thread كان مقفول فيه بـ long tasks، وهو أقرب مؤشر معملي لـ INP: لو TBT عالي، غالبًا INP هيبقى وحش. الرقم الحقيقي لـ INP بييجي من field data: قسم الزوار الحقيقيين في PageSpeed Insights (من CrUX)، أو مكتبة web-vitals في موقعك بتبعت القياسات للـ analytics بتاعتك.

شغّله في Incognito عشان الـ extensions مش تأثر.`,
            when: "قبل الرفع على إنتاج. لما حد يقولك «الموقع بطيء». بانتظام كل إصدار.",
            mistakes: "تشغّله مرة وتخليها. واجعل الموبايل هو المعيار (دايمًا أبطأ من الديسكتوب). وتفتكر إن درجة ١٠٠ في Lighthouse معناها إن INP كويس: تقرير Lighthouse العادي مبيقيسش INP أصلًا، وسؤال انترفيو مشهور هو الفرق بين lab data (Lighthouse) و field data (CrUX و web-vitals)."
          },
          teach: R`## الأول: Lighthouse زيارة معملية بتتقيس

Lighthouse بيفتح Chrome، ويحمّل الصفحة بظروف ثابتة (موبايل متوسط على نت أبطأ)، ويطلّع تقرير بدرجات من ١٠٠ وقايمة باللي يتصلّح. نفس الأداة موجودة في تاب Lighthouse في DevTools، والمثال بيشغّلها من الترمنال. شغّلتها فعلًا (Lighthouse 13.5.0 بـ [[npx]] على ويندوز، و Chrome المتسطب) على صفحة تجربة على [[http://127.0.0.1:8791/shop]] فيها صورة من غير alt ومن غير مقاسات.

---

## ١. [[npx lighthouse https://example.com --view]]

- [[npx lighthouse]]: نزّل باكدج [[lighthouse]] وشغّلها (أو استخدم المتسطبة).
- الـ URL: الصفحة اللي هتتقاس.
- [[--view]]: افتح التقرير HTML في المتصفح لما يخلص.

من غير أي فلاج تاني القياس **Mobile**. شغّلته بـ [[--output=json --output=html]] عشان أقرا الأرقام:

~~~text الناتج (درجات وأرقام صفحة التجربة)
Performance         100
Accessibility        69
Best Practices       96
SEO                  83
Agentic Browsing    100

First Contentful Paint     0.8 s
Largest Contentful Paint   0.9 s
Total Blocking Time        0 ms
Cumulative Layout Shift    0
Speed Index                0.8 s
~~~

(النسخة 13.5 فيها فئة خامسة اسمها Agentic Browsing، جديدة، والتقرير العادي اللي هتشوفه في DevTools ممكن يعرض الأربعة المعروفين بس حسب نسختك.)

| الرقم | معناه | الحد الكويس |
|---|---|---|
| LCP (Largest Contentful Paint) | أكبر صورة أو نص ظهر إمتى | ٢.٥ ثانية أو أقل |
| TBT (Total Blocking Time) | مجموع الوقت اللي JavaScript قفل فيه الصفحة وهي بتحمّل | أقل من ٢٠٠ms |
| CLS (Cumulative Layout Shift) | قد إيه العناصر اتنططت | ٠.١ أو أقل |
| FCP و Speed Index | أول حاجة ظهرت، وسرعة امتلاء الشاشة | |

ودوّرت في التقرير على [[interaction-to-next-paint]] (INP) **ملقتهوش**: التقرير العادي فعلًا مش بيقيس INP لأن مفيش حد بيدوس على حاجة.

### اللي قال يتصلّح

~~~text من نفس التقرير
image-alt                 Image elements do not have [alt] attributes
unsized-images            Image elements do not have explicit width and height
html-has-lang             <html> element does not have a [lang] attribute
meta-description          Document does not have a meta description
errors-in-console         Browser errors were logged to the console
render-blocking-insight   Render-blocking requests
~~~

كل واحد ليه سبب واضح في الصفحة: صورة من غير alt، صور من غير [[width]] و [[height]] (بيعملوا CLS لما يحمّلوا)، [[<html>]] من غير [[lang]]، مفيش [[<meta name="description">]]، 404 للـ favicon في Console، وملف CSS بيأخّر الرسم.

---

## ٢. [[npx lighthouse URL --preset=desktop --output=html --output-path=report.html]]

| الفلاج | معناه |
|---|---|
| [[--preset=desktop]] | قيس كديسكتوب: شاشة أكبر ومن غير تبطيء الموبايل |
| [[--output=html]] | التقرير HTML (ممكن [[json]] أو [[csv]]) |
| [[--output-path=report.html]] | احفظه في الملف ده بدل ما يفتح |

شغّلته وطلع [[report.html]] حجمه حوالي ٤٠٠ كيلو، تفتحه في أي متصفح.

> لو Chrome مش في مكانه المعتاد، Lighthouse بيقرا مساره من متغير [[CHROME_PATH]]. ولو قالك [[Unable to connect to Chrome]] يبقى مش لاقي Chrome خالص.

## الخلاصة

- Lighthouse = قياس معملي (lab data) بظروف ثابتة، Mobile افتراضيًا.
- LCP و TBT و CLS في التقرير، و INP مش فيه: ده من زوار حقيقيين (field data).
- الدرجة بتتغير كام نقطة بين كل تشغيل والتاني، فقارن متوسط ٢ أو ٣ مرات.`,
          lines: [
            "شغّل Lighthouse من الترمنال (npx بينزّله لو مش موجود) وافتح التقرير في المتصفح.",
            "بإعدادات الديسكتوب، واحفظ التقرير HTML في ملف."
          ],
          sol: R`[[npx lighthouse https://yoursite.com --view]] بيعمل Mobile افتراضيًا ويفتح التقرير. هتلاقي ٤ درجات (Performance و Accessibility و Best Practices و SEO) وتحت Performance أرقام زي LCP و TBT و CLS، وتحتها Opportunities و Diagnostics مرتبين حسب التأثير.

أول ٣ حاجات بتطلع غالبًا: صور كبيرة أو مش WebP/AVIF، render-blocking CSS/JS، صور من غير [[width]] و [[height]] (بتعمل CLS). بعد التصليح شغّله تاني، وخد بالك إن درجة Performance بتتغير كام نقطة بين كل تشغيل والتاني حتى من غير تعديل، فشغّله ٢ أو ٣ مرات وقارن المتوسط.

لو قالك [[Unable to connect to Chrome]] يبقى مفيش Chrome متسطب على الجهاز (أو في مكان غير معتاد، فحط مساره في [[CHROME_PATH]])، وتقدر تستخدم تاب Lighthouse في DevTools أو pagespeed.web.dev. جربته على صفحة تجربة محلية فيها صورة من غير alt ومن غير مقاسات: طلّع Accessibility 69 و SEO 83، وفي القايمة [[image-alt]] و [[unsized-images]] و [[meta-description]] بالظبط.`
        },
        {
          cmd: "Performance و Coverage",
          title: "إيه اللي تاقل الصفحة",
          desc: "Performance: دوس Record، اعمل الحاجة البطيئة، ووقف التسجيل. الـ Long tasks (عليها علامة حمرا) هي الـ JavaScript اللي بيعلّق الصفحة. Coverage بيوريك قد إيه من كل ملف JS و CSS اتحمّل ومستخدمش، والأحمر كود تقدر تأجل تحميله.",
          example: R`Ctrl+Shift+P > "Show Coverage" > reload
Performance > Record > do the slow action > Stop`,
          try: "اعرف نسبة الـ CSS اللي مش مستخدم في الصفحة الرئيسية بتاعة موقعك.",
          flag: "keys",
          deep: {
            why: "Lighthouse قالك درجة منخفضة، بس محتاج تعرف بالظبط إيه اللي بياخد الوقت.",
            how: R`Coverage: Ctrl+Shift+P ثم «Show Coverage». الأحمر كود بيتحمّل ومش بيتنفّذ. كتير أحمر يعني code splitting ممكن يحسّن التحميل كتير.

Performance tab: Record ثم افعل الـ action البطيئة ثم Stop. الـ Long Tasks (مستطيلات حمرا) JavaScript بيشتغل لأكتر من ٥٠ms ويعلّق الشاشة.`,
            when: "لما Performance score منخفض. لما تضغط حاجة والصفحة تعلّق.",
            mistakes: "تتجاهل Coverage لأن درجتك مش وحشة. التطبيقات الكبيرة ممكن بتحمّل ضعف ما تحتاجه."
          },
          teach: R`## الأول: أداتين بيجاوبوا سؤالين

- **Performance**: الصفحة بتعمل إيه في كل ms؟ مين قفل الـ main thread؟
- **Coverage**: من الـ CSS والـ JS اللي اتحمّل، قد إيه اتستخدم فعلًا؟

الأزرار من Chrome DevTools docs. والأرقام اللي تحت جربتها في Chrome على صفحة تجربة بنفس البروتوكول اللي اللوحتين بيستخدموه.

---

## ١. [[Ctrl+Shift+P > "Show Coverage" > reload]]

[[Ctrl+Shift+P]] يفتح Command Menu، وتكتب Show Coverage، وتدوس زرار الريفريش اللي في اللوحة عشان يسجّل من أول التحميل.

ملف الـ CSS في صفحة التجربة:

~~~text app.css
h1 { font-size: 2rem; color: navy }
button { background: #0a7 } button:hover { background: #085 }
.modal { position: fixed; inset: 0 } .tooltip { display: none } .footer-old { color: gray }
~~~

~~~text نتيجة الـ coverage
http://127.0.0.1:8791/assets/app.css   total 189   used 62   unused 127   67%
used: "h1 { font-size: 2rem; color: navy }" | "button { background: #0a7 }"
~~~

- **total**: حجم الملف بالـ byte. **used**: الحتت اللي اتطبقت على عناصر موجودة. **unused**: الباقي، وده الأحمر في اللوحة.
- ٦٧٪ مش مستخدم. بس بص مين: [[button:hover]] (هيتستخدم لما الماوس ييجي)، و [[.modal]] و [[.tooltip]] (ممكن لعناصر بتظهر بعدين)، و [[.footer-old]] (ده اللي فعلًا ميت). عشان كده «مش مستخدم دلوقتي» مش معناها «امسحه».

---

## ٢. [[Performance > Record > do the slow action > Stop]]

بتسجّل والصفحة شغالة، وتطلع timeline. الـ **Long task** = أي شغل على الـ main thread أطول من ٥٠ms، وخلاله الصفحة مش بترد على كليك ولا scroll. في اللوحة عليها مثلث أحمر.

جربت أعمل واحدة بإيدي وأمسكها بالـ API اللي بيعدّهم:

~~~javascript Console
window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => __lt.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: true });
setTimeout(() => { const t = Date.now(); while (Date.now() - t < 300) {} }, 10);
__lt
~~~

~~~text الناتج
[299]
~~~

- [[PerformanceObserver]]: «بلّغني لما يحصل نوع معين من الأحداث»، والنوع هنا [[longtask]].
- [[while (Date.now() - t < 300) {}]]: لفّة فاضية ٣٠٠ms، يعني JavaScript تقيل.
- النتيجة task واحدة ٢٩٩ms. في Performance هتبان كمستطيل أحمر، وتدوس عليه تلاقي الفانكشن المسؤولة في Bottom-Up أو Call Tree.

## الخلاصة

- Coverage: الأحمر كود اتحمّل ومتنفّذش، والحل غالبًا تقسيم أو تأجيل مش مسح.
- Performance: دوّر على Long tasks (أكتر من ٥٠ms)، دي اللي بتعلّق الصفحة.`,
          sol: R`Ctrl+Shift+P ثم Show Coverage ثم زرار الريفريش في اللوحة. هتلاقي جدول بكل ملف CSS و JS، وعمود Unused Bytes ونسبته، وشريط أحمر (مش مستخدم) وأخضر (مستخدم). نسبة CSS المش مستخدم في الصفحة الرئيسية بتبقى عادي ٥٠٪ لـ ٩٠٪ لو بتستخدم framework زي Bootstrap كامل.

دوس على الملف وهيفتحه في Sources والسطور المش مستخدمة عليها علامة حمرا. خد بالك: «مش مستخدم في الصفحة دي وقت التحميل» مش معناها «مش مستخدم خالص»، ممكن يكون لصفحة تانية أو لـ hover أو modal. فالحل مش تمسحه، الحل تقسّم الـ CSS أو تستخدم purge (زي اللي Tailwind بيعمله).`
        },
        {
          cmd: "Overrides",
          title: "جرّب تصليح على الموقع الحقيقي من غير deploy",
          desc: "كليك يمين على أي طلب في Network ثم Override content، وعدّل الملف أو الرد. المتصفح هيستخدم نسختك حتى بعد الريفريش. تقدر كمان تعدّل الـ headers، مثلًا تجرب هل إضافة header هتحل مشكلة CORS قبل ما تلمس السيرفر. وأول مرة هيطلب منك تختار فولدر يحفظ فيه.",
          example: R`Network > right-click request > Override content
Network > right-click request > Override headers
Sources > Overrides > Enable Local Overrides`,
          try: "غيّر رد API في موقعك من Override content، واعرف الواجهة بتتعامل إزاي مع array فاضي.",
          flag: "keys",
          deep: {
            why: "عايز تجرّب تصليح على الموقع الحقيقي من غير ما تعدّل الكود وترفعه.",
            how: R`كليك يمين على ملف في Network ثم Override content. بيفتح Sources وبيخليك تعدّل. التعديل بيتطبق على الريفريش الجاي تلقائيًا.

Override headers بيخليك تعدّل response headers، مفيد تجرّب إضافة CORS header.

متنساش توقّف الـ Overrides من Sources ثم Overrides لما تخلص.`,
            when: "تجرّب bug fix على الموقع قبل PR. تتحقق من إن تصليح معين بيحل المشكلة.",
            mistakes: "تنسى Overrides شغال وتتساءل ليه التعديلات اللي بترفعها مش بتظهر."
          },
          teach: R`## الأول: المتصفح يستخدم نسختك بدل نسخة السيرفر

Local Overrides بيخلي Chrome يحفظ نسخة من ملف أو رد في فولدر على جهازك، وكل ما الصفحة تطلبه يرجّع نسختك. التعديل بيفضل بعد الريفريش، وده الفرق عن Elements. الدرس ده من Chrome DevTools docs (صفحة Local overrides)، لأنه أداة واجهة.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Network > right-click request > Override content]] | يفتح الرد في Sources تعدّله، و Ctrl+S يحفظه |
| [[Network > right-click request > Override headers]] | تضيف أو تغيّر headers الرد (زي [[Access-Control-Allow-Origin]]) |
| [[Sources > Overrides > Enable Local Overrides]] | الزرار اللي يشغّل أو يوقف الخاصية كلها |

أول مرة هيطلب فولدر: اعمل فولدر فاضي **بره المشروع** (مثلًا [[C:\Users\ali\devtools-overrides]])، ودوس Allow عشان Chrome يكتب فيه.

## ٢. الخطوات على رد API

1. في Network كليك يمين على [[GET /api/products]] ثم Override content.
2. في Sources هيفتح الرد زي ما جه، مثلًا [[{"id":1,"name":"Pen"}]] وعنصر تاني جوه array.
3. امسح كل اللي فيه واكتب قوسين مربعين فاضيين (array فاضي) و Ctrl+S.
4. ريفريش: الطلب في Network عليه علامة بنفسجية (overridden)، والواجهة شايفة قايمة فاضية.

وده بيكشف: هل فيه empty state؟ ولا spinner بيلف على طول؟ ولا error زي [[Cannot read properties of undefined (reading '0')]] لأن الكود فاكر إن فيه عنصر أول دايمًا؟

## ٣. Override headers

بدل ما تعدّل السيرفر وترفع عشان تجرّب CORS، تضيف [[Access-Control-Allow-Origin: http://localhost:5173]] على الرد من هنا. لو المشكلة اتحلت، تعرف بالظبط تحط إيه في السيرفر.

## الخلاصة

- Overrides = نسخة محلية بتكسب على السيرفر لحد ما تقفلها.
- جرّب بيها الردود الوحشة: فاضي، [[{}]]، status غلط.
- اقفل Enable Local Overrides لما تخلص، وإلا هتفضل شايف نسختك.`,
          sol: R`كليك يمين على طلب الـ API في Network ثم Override content. أول مرة هيطلب منك تختار فولدر وتدوس Allow. هيفتحلك الرد في Sources، امسح اللي فيه واكتب [[[]]] واحفظ Ctrl+S، وبعدين ريفريش. هتلاقي جنب الطلب في Network علامة بنفسجية (overridden)، والواجهة بقت شايفة array فاضي.

اللي المفروض تشوفه: رسالة زي «مفيش طلبات لسه» (empty state). اللي بيطلع كتير: صفحة فاضية خالص، أو spinner بيلف للأبد، أو error في Console زي [[Cannot read properties of undefined (reading '0')]] لأن الكود فاكر إن فيه عنصر أول دايمًا.

جرّب كمان تحط [[{}]] أو تغيّر الـ status من Override headers. ولما تخلص اقفل Enable Local Overrides في Sources ثم Overrides عشان متنساش إن الرد متزوّر.`
        },
        {
          cmd: "playwright screenshot",
          title: "صور الصفحة بكل المقاسات من الترمنال",
          desc: "بدل ما تغيّر حجم المتصفح بإيدك بعد كل تعديل، أمر واحد بياخد screenshot للصفحة بمقاس ديسكتوب وموبايل، وبالوضع الداكن، والصفحة كاملة لآخرها. تحطهم جنب بعض وتقارن قبل وبعد.",
          example: R`npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 desktop.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 mobile.png
npx playwright screenshot --device "Pixel 7" --color-scheme dark --wait-for-timeout 1000 http://localhost:8791 pixel-dark.png`,
          try: "صوّر صفحتك بأوامر الـ screenshot التلاتة قبل تعديل CSS وبعده، وافتح الصور جنب بعض.",
          flag: "term",
          deep: {
            why: "تعديل صغير في CSS ممكن يكسر الموبايل وانت شغال على الديسكتوب. الصور بتخليك تشوف كل المقاسات في نظرة، وتقدر تحطها في PR أو تبعتها للعميل.",
            how: R`[[playwright install chromium]]: ينزّل المتصفح اللي Playwright بيستخدمه (مرة واحدة).

[[screenshot URL file.png]]: يفتح الصفحة ويصوّرها. [[--viewport-size "390,844"]]: عرض وطول الشاشة (390 عرض موبايل شائع). [[--full-page]]: الصفحة كلها لآخرها مش الجزء الظاهر بس.

[[--device "Pixel 7"]]: مقاس الجهاز وكثافة البكسل والـ user agent واللمس، زي Device Toolbar في DevTools. أجهزة آيفون (زي [[--device "iPhone 13"]]) بتشتغل على WebKit مش Chromium، فمحتاجة [[npx playwright install webkit]] الأول. [[--color-scheme dark]]: يختبر [[prefers-color-scheme: dark]]. [[--wait-for-timeout 1000]]: استنى ثانية بعد التحميل عشان الخطوط والأنيميشن يخلصوا.

من غير Playwright، Chrome نفسه بيعمل ده: [[chrome --headless --screenshot=out.png --window-size=390,844 URL]] (على ويندوز المسار الكامل لـ chrome.exe).

والخطوة الجاية: اختبار visual regression في Playwright Test ([[toHaveScreenshot]]) بيقارن الصور لوحده ويفشل لو حاجة اتغيرت.`,
            when: "بعد أي تعديل في التصميم، وقبل ما تبعت PR فيه CSS.",
            mistakes: "تصوّر قبل ما الخطوط تحمّل فالصورة بخط مختلف. وتسيب عشرات الصور في فولدر المشروع وتترفع على Git، حطهم في فولدر لوحده في [[.gitignore]]."
          },
          teach: R`## الأول: متصفح من غير شاشة بيصوّر

Playwright مكتبة بتتحكم في متصفح، وفيها أمر [[screenshot]] جاهز من الترمنال. كله اتشغّل على ويندوز (Playwright 1.63) على سيرفر محلي.

---

## ١. [[npx playwright install chromium]]

بينزّل المتصفح اللي Playwright بيستخدمه (مش Chrome بتاعك)، مرة واحدة. في النسخة دي نزّل Chromium و Chrome Headless Shell (نسخة خفيفة من غير واجهة بيستخدمها للـ headless) وأدوات صغيرة معاهم.

## ٢. [[npx playwright screenshot --viewport-size "1440,900" URL desktop.png]]

| الحتة | معناها |
|---|---|
| [[--viewport-size "1440,900"]] | الشاشة ١٤٤٠ عرض × ٩٠٠ طول، بفاصلة ومن غير مسافات |
| URL | الصفحة |
| [[desktop.png]] | اسم الصورة |

~~~text الناتج
Navigating to http://127.0.0.1:8791/ssr
Capturing screenshot into desktop.png
~~~

وقريت مقاس الصورة من ملف الـ PNG: [[1440x900]] بالظبط.

## ٣. [[--viewport-size "390,844" --full-page]]

[[--full-page]] بيصوّر الصفحة كلها لآخرها مش الجزء الظاهر بس. على صفحة قصيرة طلعت [[390x844]]. وعلى صفحة فيها جدول عرضه ٦٠٠px طلعت [[608x844]]: الصورة اتوسّعت للعرض الحقيقي للصفحة، وده نفسه دليل إن فيه حاجة طالعة بره الموبايل.

## ٤. [[--device "Pixel 7" --color-scheme dark --wait-for-timeout 1000]]

| الحتة | معناها |
|---|---|
| [[--device "Pixel 7"]] | مقاس الجهاز وكثافة البكسل والـ user agent واللمس |
| [[--color-scheme dark]] | الصفحة تشوف [[prefers-color-scheme: dark]] |
| [[--wait-for-timeout 1000]] | استنى ١٠٠٠ms بعد التحميل قبل الصورة |

~~~text الناتج
Navigating to http://127.0.0.1:8791/ssr
Waiting for timeout 1000...
Capturing screenshot into pixel-dark.png
~~~

الصورة طلعت [[1082x2202]]. ليه مش ٤١٢ عرض؟ الـ Pixel 7 عرضه ٤١٢ «CSS pixel» بس كثافته ٢.٦٢٥، يعني كل CSS pixel = ٢.٦٢٥ بكسل حقيقي: ٤١٢ × ٢.٦٢٥ ≈ ١٠٨٢، و ٨٣٩ × ٢.٦٢٥ ≈ ٢٢٠٢.

> كان المثال فيه [[--device "iPhone 13"]] وجربته: فشل بـ [[Executable doesn't exist at ...\webkit-...]]. أجهزة آيفون في Playwright بتستخدم WebKit (محرك Safari) افتراضيًا حتى لو كتبت [[--browser chromium]]، و WebKit مش متسطب لأننا نزّلنا chromium بس. عشان كده المثال بقى Pixel 7. لو عايز آيفون: [[npx playwright install webkit]] الأول.

## ٥. الأخطاء اللي جربتها

~~~text الناتج
Error: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:8799/
~~~

مفيش سيرفر على البورت ده. شغّل السيرفر الأول.

| الأمر | الصورة |
|---|---|
| [[--viewport-size "1440,900"]] | ديسكتوب، الجزء الظاهر |
| [[--viewport-size "390,844" --full-page]] | موبايل، الصفحة كلها |
| [[--device "Pixel 7" --color-scheme dark]] | جهاز بعينه، وضع داكن |

## الخلاصة

- [[install chromium]] مرة، و [[screenshot]] لكل صورة.
- [[--full-page]] أعرض من الموبايل = فيه حاجة طالعة بره.
- أجهزة آيفون محتاجة WebKit.`,
          lines: [
            "نزّل Chromium بتاع Playwright (مرة واحدة).",
            "ديسكتوب ١٤٤٠ في ٩٠٠.",
            "موبايل ٣٩٠ عرض، والصفحة كاملة.",
            "موبايل Pixel 7 بالوضع الداكن، بعد ثانية من التحميل."
          ],
          sol: R`جربت الأمر التاني على سيرفر محلي وطبع:

[[Navigating to http://localhost:8791]]
[[Capturing screenshot into mobile.png]]

وطلع ملف PNG. هتلاقي ٣ صور: [[desktop.png]] مقاس 1440×900 بالظبط، و [[mobile.png]] عرضه 390 وطوله قد الصفحة كلها (بسبب [[--full-page]])، و [[pixel-dark.png]] بـ dark mode لو الـ CSS بتاعك فيه [[prefers-color-scheme: dark]] (مقاسها 1082×2202 لأن كثافة Pixel 7 هي 2.625 بكسل لكل CSS pixel). قبل وبعد التعديل حطهم جنب بعض في أي image viewer.

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. ولو الصورة فاضية أو نص غير متحمّل، زوّد [[--wait-for-timeout]] أو [[--wait-for-selector]]. ولو [[net::ERR_CONNECTION_REFUSED]] يبقى السيرفر المحلي مش شغال على البورت ده.`
        },
        {
          cmd: "Command Menu",
          title: "كل حاجة في DevTools من مكان واحد",
          desc: "Ctrl+Shift+P (زي VS Code) واكتب اللي عايزه. أشهر الأوامر: صورة للصفحة كلها من فوق لتحت، وقفل JavaScript تشوف الموقع من غيره، و Rendering اللي بيخليك تجرب dark mode أو print من غير ما تغيّر إعدادات جهازك.",
          example: R`Capture full size screenshot
Disable JavaScript
Show Rendering  (emulate prefers-color-scheme: dark, print media)
Show Coverage`,
          try: "خد screenshot للصفحة كلها، واعرض موقعك بـ dark mode من Rendering.",
          flag: "keys",
          deep: {
            why: "DevTools فيه حاجات كتير مخبّية. Command Menu بيخليك توصل لأي حاجة بالبحث.",
            how: R`Ctrl+Shift+P بيفتح Command Menu. أكتر الأوامر المفيدة:

«Capture full size screenshot»: صورة للصفحة كلها من فوق لتحت، حتى الجزء اللي مش في الشاشة.

«Disable JavaScript»: بيوقف JavaScript خالص. مفيد تشوف الموقع بدون JavaScript وتختبر SSR.

«Show Rendering»: emulate dark mode من غير ما تغيّر إعدادات النظام. وprint media query.`,
            when: "أي وقت تعرف إيه اللي عايزه بس مش لاقيه.",
            mistakes: "تبقى في تاب واحد وتنسى إن باقي DevTools فيه أدوات مهمة."
          },
          teach: R`## الأول: بحث في كل أوامر DevTools

[[Ctrl+Shift+P]] (على الماك [[Cmd+Shift+P]]) و DevTools مفتوحة بيفتح خانة بحث فيها كل الأوامر، زي VS Code. أسماء الأوامر من Chrome DevTools docs. والتأثير بتاع كل أمر جربته في Chrome ببروتوكول DevTools اللي الأوامر دي بتستخدمه.

---

## ١. [[Capture full size screenshot]]

صورة PNG للصفحة كلها من فوق لتحت. جربت نفس الأمر في البروتوكول ([[Page.captureScreenshot]] مع [[captureBeyondViewport]]) وطلع PNG للصفحة كلها. أخواته في نفس القايمة: [[Capture screenshot]] (الجزء الظاهر بس)، و [[Capture node screenshot]] (العنصر المختار في Elements بس).

## ٢. [[Disable JavaScript]]

جربت صفحة الـ SPA من درس View Source و JavaScript مقفول:

~~~text الـ body
<body><div id="root"></div><script type="module" src="/assets/index.js"></script></body>
~~~

صفحة فاضية. ده اللي bot مش بيشغّل JavaScript هيشوفه. وفي صفحة SSR المحتوى هيفضل موجود.

## ٣. [[Show Rendering]]

لوحة فيها «Emulate CSS media feature». جربت:

~~~javascript Console
matchMedia("(prefers-color-scheme: dark)").matches
~~~

~~~text الناتج
false     قبل
true      بعد ما اخترت prefers-color-scheme: dark
~~~

و [[matchMedia("print").matches]] بقى [[true]] بعد ما اخترت print. [[matchMedia]] بيسأل «الـ media query دي متحققة دلوقتي؟»، وده نفس اللي الـ CSS بيسأله في [[@media]]. يعني الموقع بيشوف dark mode حقيقي، من غير ما تغيّر إعدادات جهازك.

## ٤. [[Show Coverage]]

يفتح لوحة Coverage (درس Performance و Coverage).

| الأمر | تكتب في Command Menu |
|---|---|
| صورة للصفحة كلها | [[full size]] |
| من غير JavaScript | [[disable javascript]] (وارجع بـ [[enable javascript]]) |
| dark أو print | [[rendering]] |
| الكود اللي متستخدمش | [[coverage]] |

## الخلاصة

- مش فاكر الأداة فين؟ [[Ctrl+Shift+P]] واكتب جزء من اسمها.
- Rendering بيغيّر الـ media queries للتاب ده بس.
- Disable JavaScript بيوريك اللي الـ bots شايفينه.`,
          sol: R`Ctrl+Shift+P واكتب [[full size]] ثم Enter: هينزل PNG للصفحة كلها من فوق لتحت (مش بس الجزء الظاهر). لو الصورة مقصوصة أو فيها أجزاء فاضية، غالبًا عندك lazy loading أو عناصر [[position: fixed]]، اعمل scroll للآخر الأول.

الـ dark mode: Ctrl+Shift+P ثم Show Rendering، وانزل لـ [[Emulate CSS media feature prefers-color-scheme]] واختار [[prefers-color-scheme: dark]]. لو موقعك داعم dark mode بالـ media query هيتقلب فورًا. لو ما اتغيرش يبقى الموقع مش بيقرا الـ media query (يمكن معتمد على زرار و localStorage بس).`
        }
      ]
    }
]);
