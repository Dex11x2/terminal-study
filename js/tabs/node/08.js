// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Webhooks: خلّي Paymob يوصل لجهازك",
      l: 3,
      n: "بوابة الدفع بتبعت callback لسيرفر على النت، وجهازك مش على النت. الـ tunnel بيحل ده",
      items: [
        {
          cmd: "المشكلة",
          title: "ليه localhost مش بيوصل",
          desc: "Paymob وTabby وTamara بعد الدفع بيبعتوا طلب POST لـ URL انت مسجّله عندهم. الـ URL لازم يبقى على النت. [[localhost:3000]] موجود على جهازك بس. الـ tunnel بيعمل عنوان عام مؤقت بيوصّل لجهازك.",
          example: R`curl -X POST http://localhost:3000/webhooks/paymob -H "Content-Type: application/json" -d '{"type":"TRANSACTION","obj":{"success":true,"amount_cents":10000}}'`,
          try: "اعمل route للـ webhook بيطبع req.body، وجرّبه بالأمر ده الأول قبل أي tunnel.",
          deep: {
            why: "بتطوّر الدفع، وكل حاجة شغالة لحد صفحة Paymob، وبعدين مفيش callback. السبب إن Paymob بتبعت للـ URL المسجّل، وده localhost اللي عمره ما هيوصل من سيرفرات Paymob.",
            how: R`الـ webhook مجرد طلب HTTP من سيرفر البوابة لسيرفرك. عشان يوصل، سيرفرك لازم يبقى ليه عنوان عام على النت. جهازك ورا راوتر (NAT) ومفيش عنوان عام يشاور عليه.

الحلول: يا تعمل deploy على staging مع كل تعديل (بطيء)، يا tunnel: برنامج على جهازك بيفتح اتصال لسيرفر على النت، والسيرفر ده بيديك URL عام، وأي طلب يوصله بيبعته جوه الاتصال لجهازك. الطلب بيوصل لـ localhost:3000 كأنه من النت.

بس قبل أي tunnel: الـ curl في المثال بيحاكي الـ webhook. لو الـ route بتاعك مش بيشتغل مع curl من جهازك، مش هيشتغل مع Paymob. اختبر المنطق الأول بـ curl، والـ tunnel بعدين للتكامل الحقيقي.

كل بوابة ليها شكل body مختلف. Paymob بتبعت [[type]] و [[obj]] فيه بيانات المعاملة، و hmac في query string. Tabby و Tamara بيبعتوا JSON مختلف وتوقيع في header. اقرا وثائق كل واحدة.`,
            when: "أول ما تبدأ تطوير أي integration فيه callback: دفع، أو WhatsApp API، أو GitHub webhooks.",
            mistakes: "تسجّل http://localhost في لوحة البوابة وتستنى. وتختبر بالـ tunnel قبل ما الـ route يشتغل مع curl."
          },
          teach: R`## الفكرة

الـ webhook مجرد طلب HTTP: سيرفر Paymob بيعمل POST على URL انت اديته له. ولأن جهازك مالوش عنوان على النت، [[localhost:3000]] مش هيوصله أبدًا. بس قبل ما نحل المشكلة دي، الأمر في المثال بيعمل نفس الطلب **من جهازك لجهازك**، عشان تتأكد إن الكود سليم الأول. جربناه على سيرفر الـ [[solCode]] في [[node:22-slim]]، وعلى ويندوز في PowerShell 7 و 5.1.

---

## السيرفر: الـ [[solCode]]

~~~text app.js
import express from "express";
const app = express();
app.use(express.json());
app.post("/webhooks/paymob", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(3000);
~~~

| السطر | معناه |
|---|---|
| [[app.use(express.json())]] | أي طلب جاي بـ [[Content-Type: application/json]]: حوّل الـ body من نص لـ object في [[req.body]] |
| [[app.post("/webhooks/paymob", ...)]] | لما يجي **POST** على المسار ده بالظبط |
| [[console.log(req.body)]] | اطبع اللي وصل |
| [[res.sendStatus(200)]] | رد بـ 200 والنص [[OK]]. البوابة بتفهم 200 إنك استلمت |

---

## الأمر: نفكه حتة حتة

~~~bash
curl -X POST http://localhost:3000/webhooks/paymob -H "Content-Type: application/json" -d '{"type":"TRANSACTION","obj":{"success":true,"amount_cents":10000}}'
~~~

| الحتة | معناها |
|---|---|
| [[curl]] | برنامج بيبعت طلبات HTTP من الترمنال |
| [[-X POST]] | الـ method (X من request). من غيرها curl بيبعت GET |
| [[http://localhost:3000/webhooks/paymob]] | العنوان: جهازك، بورت 3000، المسار |
| [[-H "Content-Type: application/json"]] | header بيقول «الـ body ده JSON». من غيره [[express.json()]] مش هيقراه |
| [[-d '...']] | الـ body (d = data). علامات التنصيص المفردة عشان الشيل ميلمسش الـ [["]] اللي جوه |

والـ JSON نفسه شكل مبسّط من اللي Paymob بتبعته: [[type]] نوع الحدث، و [[obj]] فيه المعاملة: [[success]] نجحت ولا لأ، و [[amount_cents]] المبلغ بالقروش (10000 = ١٠٠ جنيه، عشان الفلوس متتكتبش بكسور).

~~~text الناتج في الترمنال اللي فيه curl
OK
~~~

~~~text الناتج في ترمنال السيرفر
{ type: 'TRANSACTION', obj: { success: true, amount_cents: 10000 } }
~~~

---

## لما حاجة تبوظ (جربناهم)

| اللي حصل | الناتج | السبب |
|---|---|---|
| شلنا [[-H "Content-Type: ..."]] | السيرفر طبع [[undefined]] | curl بعت الـ body كـ form، و [[express.json()]] اتجاهله |
| المسار [[/webhooks/paymob/x]] | [[Cannot POST /webhooks/paymob/x]] (404) | مفيش route بالمسار ده |
| [[-X GET]] | [[Cannot GET /webhooks/paymob]] | الـ route لـ POST بس |
| السيرفر مش شغال | [[curl: (7) Failed to connect to localhost port 3000]] | مفيش حد سامع على البورت |

---

## على ويندوز

PowerShell 7: نفس السطر بس اكتب [[curl.exe]]، واشتغل وطبع [[OK]] ونفس السطر في السيرفر.

Windows PowerShell 5.1 فيه فخين:

1. [[curl]] لوحدها هناك اسم تاني لـ [[Invoke-WebRequest]] مش curl الحقيقي، فالفلاجات مش هتتفهم. اكتب [[curl.exe]].
2. حتى مع [[curl.exe]]، الـ [["]] اللي جوه [[' ']] بتتشال وهي رايحة للبرنامج، فالسيرفر استلم [[{type:TRANSACTION,...}]] ورد:

~~~text الناتج في PowerShell 5.1
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

الحل في 5.1 يا تكتب [[\"]] قبل كل علامة تنصيص جوه الـ JSON، يا تستخدم أمر PowerShell نفسه (اشتغل في الاتنين):

~~~powershell
Invoke-RestMethod -Method Post http://localhost:3000/webhooks/paymob -ContentType "application/json" -Body '{"type":"TRANSACTION","obj":{"success":true,"amount_cents":10000}}'
~~~

~~~text الناتج
OK
~~~

---

## الخلاصة

- الـ webhook = POST من سيرفر البوابة لسيرفرك، و localhost مش على النت.
- قبل أي tunnel: حاكي الطلب بـ curl لحد ما السيرفر يطبع الـ body صح ويرد 200.
- لما ده يشتغل، أي مشكلة بعد كده تبقى في الـ tunnel أو إعدادات البوابة، مش في الكود.`,
          lines: ["حاكي webhook من Paymob على جهازك: POST بـ JSON بنفس شكل اللي بيبعتوه."],
          sol: R`الـ route البسيط: [[app.post("/webhooks/paymob", (req, res) => { console.log(req.body); res.sendStatus(200); })]] مع [[app.use(express.json())]]. الـ curl بيرجّع [[OK]]، والترمنال بتاع السيرفر بيطبع:

[[{ type: 'TRANSACTION', obj: { success: true, amount_cents: 10000 } }]].

لو طبع [[undefined]]: نسيت [[express.json()]]، أو الـ middleware متسجل بعد الـ route. ولو الـ curl رجّع [[Cannot POST /webhooks/paymob]] (404)، المسار أو الـ method مختلف. ولو [[Connection refused]] السيرفر مش شغال أو على بورت تاني.

النقطة: لما دا يشتغل محليًا بـ curl، أي مشكلة بعد ما تحط ngrok تبقى في الـ tunnel أو إعدادات Paymob، مش في الكود. مش هتحتاج تعمل دفعة حقيقية عشان تختبر كل تعديل.`,
          solCode: R`import express from "express";
const app = express();
app.use(express.json());
app.post("/webhooks/paymob", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(3000);`
        },
        {
          cmd: "ngrok",
          title: "tunnel في ثانية",
          desc: "[[ngrok http 3000]] بيديك URL عام زي [[https://a1b2.ngrok-free.app]] بيوصّل لبورت 3000 عندك. تحطه في إعدادات Paymob كـ callback. وعلى [[localhost:4040]] لوحة بتوريك كل طلب وصل وبتعيد إرساله.",
          example: R`ngrok config add-authtoken TOKEN
ngrok http 3000
ngrok http 3000 --url=https://myapp.ngrok-free.dev
curl -s localhost:4040/api/requests/http | jq '.requests[0].request.uri'`,
          try: "شغّل ngrok وافتح الـ URL من موبايلك على الداتا (مش الواي فاي) واتأكد إنه فتح سيرفرك.",
          deep: {
            why: "أسرع طريقة تخلي جهازك على النت لدقايق. أمر واحد و URL جاهز تحطه في Paymob.",
            how: R`[[ngrok http 3000]] بيفتح اتصال لسيرفرات ngrok، وبيطبع URL عام. أي طلب على الـ URL ده بيتبعت لـ localhost:3000 عندك. HTTPS جاهز، وده مهم لأن البوابات بترفض http.

الـ authtoken مرة واحدة بعد التسجيل (مجاني). من غيره ngrok مش هيفتح tunnel أصلًا.

في الخطة المجانية الـ URL عشوائي وبيتغير كل مرة، فبتغيّره في لوحة Paymob كل مرة. كل حساب مجاني بياخد dev domain ثابت واحد (على ngrok-free.dev) تلاقيه في اللوحة، وتشغّله بـ [[--url]] (بديل [[--domain]] القديم).

الأقوى في ngrok: لوحة [[localhost:4040]]. بتعرض كل طلب وصل بالـ headers والـ body والرد، وزرار Replay بيعيد إرسال نفس الطلب لسيرفرك من غير ما تعمل دفعة جديدة. والـ API بتاعتها على [[/api/requests/http]] بتديك نفس المعلومات كـ JSON.

الطلبات بتعدّي على سيرفرات ngrok، فمتستخدمهوش لبيانات حقيقية حساسة. للتطوير بس.`,
            when: "تطوير أي webhook. وتوريك شغلك لعميل قبل الـ deploy.",
            mistakes: "تنسى ngrok شغال وتقفل الترمنال والـ URL يموت، والبوابة تفضل تبعت لعنوان ميت. وتستخدم الـ URL العشوائي في staging."
          },
          teach: R`## الأوامر دي بتعمل إيه

[[ngrok]] برنامج بيفتح اتصال من جهازك لسيرفرات ngrok، وهما بيدّوك URL عام. أي طلب على الـ URL ده بيرجع جوه نفس الاتصال لبورت على جهازك. فـ Paymob تبعت على [[https://xxxx.ngrok-free.app/webhooks/paymob]] والطلب يوصل لـ [[localhost:3000]].

> ngrok محتاج حساب وتوكن، فمشغّلناهوش هنا. أوامره وأشكال الناتج من الـ docs الرسمية (ngrok v3). سطر [[jq]] الأخير جربناه على JSON بنفس الشكل اللي الـ docs بتوصفه.

---

## ١. [[ngrok config add-authtoken TOKEN]]

| الحتة | معناها |
|---|---|
| [[ngrok config]] | أوامر ملف الإعدادات بتاع ngrok |
| [[add-authtoken]] | احفظ التوكن فيه |
| [[TOKEN]] | مكانه التوكن بتاعك من لوحة ngrok بعد التسجيل (مجاني) |

بيتعمل مرة واحدة على الجهاز، والتوكن بيتحفظ في [[ngrok.yml]] (على لينكس تحت [[~/.config/ngrok/]]، وعلى ويندوز تحت [[%LOCALAPPDATA%\ngrok\]]). من غيره أي tunnel بيقع بـ [[ERR_NGROK_4018]]. والتوكن ده سر: اللي معاه يفتح tunnels باسم حسابك.

---

## ٢. [[ngrok http 3000]]

- [[http]]: نوع الـ tunnel (طلبات ويب).
- [[3000]]: البورت المحلي اللي الطلبات هتروحله.

بيفتح شاشة في الترمنال، أهم سطرين فيها:

~~~text الناتج (من الـ docs)
Forwarding     https://xxxx.ngrok-free.app -> http://localhost:3000
Web Interface  http://127.0.0.1:4040
~~~

- [[Forwarding]]: العنوان العام، والسهم بيقولك بيوصّل لفين. ده اللي تحطه في لوحة Paymob (ومعاه المسار: [[/webhooks/paymob]]). وهو HTTPS جاهز، والبوابات بترفض http.
- [[Web Interface]]: لوحة على جهازك فيها كل طلب عدّى.

وتحت الشاشة دي كل طلب بيوصل بيظهر سطر زي [[POST /webhooks/paymob 200 OK]]. الترمنال ده لازم يفضل مفتوح: لو قفلته، الـ URL مات.

---

## ٣. [[ngrok http 3000 --url=https://myapp.ngrok-free.dev]]

في الخطة المجانية الـ URL في السطر اللي فات بيتغير كل مرة تشغّله، فبتغيّره في Paymob كل مرة. كل حساب مجاني بياخد dev domain واحد ثابت تلاقيه في اللوحة، و [[--url]] بيقول «استخدم ده». ([[--url]] هو الاسم الجديد لـ [[--domain]].)

---

## ٤. [[curl -s localhost:4040/api/requests/http | jq '.requests[0].request.uri']]

نفكه بالترتيب:

### [[curl -s localhost:4040/api/requests/http]]

لوحة 4040 ليها API بترجع الطلبات اللي عدّت كـ JSON. و [[-s]] (silent) بيشيل شريط التقدم. الشكل حسب الـ docs:

~~~text الـ JSON (مختصر)
{
  "uri": "/api/requests/http",
  "requests": [
    {
      "uri": "/api/requests/http/548fb5c700000002",
      "id": "548fb5c700000002",
      "request":  { "method": "POST", "uri": "/webhooks/paymob?hmac=abc" },
      "response": { "status": "401 Unauthorized", "status_code": 401 }
    },
    ...
  ]
}
~~~

خلي بالك إن فيه [[uri]] في مكانين: اللي بره عنوان الطلب **جوه الـ API** نفسه، واللي جوه [[request]] المسار اللي Paymob طلبته فعلًا.

### [[| jq '.requests[0].request.uri']]

- [[|]]: ابعت ناتج curl لـ jq.
- [[jq]]: أداة بتقرا JSON وتطلّع منه حتة.
- [[.requests]]: خانة requests.
- [[[0]]]: أول عنصر (أحدث طلب).
- [[.request.uri]]: المسار اللي اتطلب.

جربناه على الـ JSON ده:

~~~text الناتج
"/webhooks/paymob?hmac=abc"
~~~

يعني آخر طلب وصل كان على المسار ده، وبالـ query string دي. مفيد تتأكد إن Paymob بتبعت الـ [[hmac]] فعلًا. وفي المتصفح نفس المعلومات أوضح على [[http://127.0.0.1:4040]]، ومعاها زرار **Replay** اللي بيعيد إرسال نفس الطلب لسيرفرك من غير دفعة جديدة.

---

## على ويندوز

نفس الأوامر بالظبط ([[ngrok.exe]] من موقعهم أو [[winget install ngrok.ngrok]] حسب الـ docs). وفي PowerShell بدل [[| jq]]:

~~~powershell
(Invoke-RestMethod http://localhost:4040/api/requests/http).requests[0].request.uri
~~~

[[Invoke-RestMethod]] بيحوّل الـ JSON لـ object لوحده، فبتوصل للخانة بالنقط. جربناه في PowerShell 7 و 5.1 على سيرفر صغير بيرجّع نفس الـ JSON، وطبع [[/webhooks/paymob?hmac=abc]] (من غير علامات تنصيص، لأنه نص مش JSON).

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ngrok config add-authtoken TOKEN]] | مرة واحدة: احفظ التوكن |
| [[ngrok http 3000]] | URL عام عشوائي بيوصّل لـ 3000 |
| [[--url=https://...ngrok-free.dev]] | الـ dev domain الثابت بتاعك |
| [[localhost:4040]] | كل طلب وصل، و Replay |
| [[.requests[0].request.uri]] | مسار آخر طلب |

- الـ URL عايش طول ما الترمنال مفتوح بس.
- الطلبات بتعدّي على سيرفرات ngrok: للتطوير، مش لبيانات حقيقية.`,
          lines: [
            "التوكن مرة واحدة بعد التسجيل.",
            "افتح tunnel لبورت 3000، وخد الـ URL اللي يطلع.",
            "بدومين ثابت من ngrok بدل العشوائي.",
            "من API اللوحة: مسار آخر طلب وصل."
          ],
          sol: R`[[ngrok http 3000]] بيفتح شاشة فيها [[Forwarding https://xxxx.ngrok-free.app -> http://localhost:3000]] (الدومين ممكن يبقى ngrok-free.app أو ngrok-free.dev حسب الحساب)، و [[Web Interface http://127.0.0.1:4040]].

من الموبايل على الداتا: أول مرة في الخطة المجانية بتظهر صفحة تحذير من ngrok إنك رايح لموقع حد تاني، وزرار [[Visit Site]]. بعده بتشوف رد سيرفرك، وفي شاشة ngrok في الترمنال السطر [[GET / 200 OK]]. الداتا مش الواي فاي عشان تتأكد إن الطلب فعلًا جاي من الإنترنت، مش من شبكتك.

لو [[ERR_NGROK_4018]] يبقى محتاج [[ngrok config add-authtoken]]. ولو الموبايل شاف [[502 Bad Gateway]] أو صفحة ngrok بتقول مش قادر يوصل لـ localhost:3000، سيرفرك مش شغال أو على بورت تاني. والـ webhooks من Paymob مش بتتأثر بصفحة التحذير لأنها مش متصفح.`
        },
        {
          cmd: "cloudflared",
          title: "tunnel مجاني وثابت",
          desc: "Cloudflare Tunnel بديل مجاني، وبيديك دومين ثابت لو ربطته بدومين عندك على Cloudflare. [[--url]] للتجربة السريعة بعنوان عشوائي. والـ named tunnel للاستخدام المتكرر بعنوان زي [[dev.example.com]].",
          example: R`cloudflared tunnel --url http://localhost:3000
cloudflared tunnel login
cloudflared tunnel create dev
cloudflared tunnel route dns dev dev.example.com
cloudflared tunnel run dev`,
          try: "اعمل named tunnel على subdomain، وحطه مرة واحدة في Paymob، ومش هتغيّره تاني.",
          deep: {
            why: "ngrok المجاني ليه حدود، ولو عندك دومين على Cloudflare أصلًا، الـ tunnel بتاعهم مجاني بالكامل وبيديك subdomain ثابت.",
            how: R`[[cloudflared tunnel --url http://localhost:3000]] زي ngrok بالظبط: URL عشوائي على trycloudflare.com، من غير حساب حتى.

الـ named tunnel للاستخدام المتكرر: [[login]] بيربط بحسابك، [[create dev]] بيعمل tunnel اسمه dev ويحفظ credentials في ملف، [[route dns dev dev.example.com]] بيعمل سجل DNS في Cloudflare يشاور على الـ tunnel، و [[run dev]] بيشغّله.

والـ tunnel محتاج ملف config يقول أنهي hostname يروح لأنهي بورت محلي: [[~/.cloudflared/config.yml]] فيه [[ingress]] بـ hostname و service.

النتيجة: [[dev.example.com]] ثابت، بتحطه في Paymob مرة واحدة. وممكن تحطه على السيرفر كخدمة (cloudflared service install) لو عايز تعرّض خدمة من سيرفر من غير ما تفتح بورت في الفايروول أصلًا، وده استخدام أمني قوي.

ومع Cloudflare Access تقدر تحط تسجيل دخول قبل الـ URL، فمحدش يوصل لجهازك غيرك (بس الـ webhook محتاج استثناء للمسار بتاعه).`,
            when: "لو عندك دومين على Cloudflare. ولتعريض خدمات داخلية من السيرفر بأمان.",
            mistakes: "route dns لدومين مش على Cloudflare nameservers. وتنسى ingress في config فيطلع 404 من Cloudflare."
          },
          teach: R`## الأوامر دي بتعمل إيه

[[cloudflared]] برنامج Cloudflare اللي بيعمل نفس شغلة ngrok: اتصال من جهازك لـ Cloudflare، وهي بتديك عنوان عام بيرجع لبورت عندك. أول سطر tunnel سريع بعنوان عشوائي، والأربعة اللي بعده بيعملوا **named tunnel**: tunnel ليه اسم وعنوان ثابت على دومينك.

> مشغّلناش cloudflared هنا (محتاج تسطيب، والـ named tunnel محتاج حساب Cloudflare ودومين). الأوامر وأشكال الناتج من الـ docs الرسمية لـ Cloudflare Tunnel.

---

## ١. [[cloudflared tunnel --url http://localhost:3000]]

| الحتة | معناها |
|---|---|
| [[cloudflared tunnel]] | كل أوامر الـ tunnels تحت الكلمة دي |
| [[--url http://localhost:3000]] | الخدمة المحلية اللي الطلبات هتروحلها |

من غير حساب خالص. بيطبع عنوان عشوائي على [[trycloudflare.com]] زي [[https://some-random-words.trycloudflare.com]]، وبيتغيّر كل تشغيل. ده اسمه «Quick Tunnel» ومعمول للتجربة بس.

---

## ٢. [[cloudflared tunnel login]]

بيطبع رابط تفتحه في المتصفح، تسجّل دخول على Cloudflare وتختار الدومين. بعدها بيحفظ شهادة في [[~/.cloudflared/cert.pem]]. الشهادة دي بتدّي cloudflared صلاحية يعمل tunnels و DNS على الدومين ده. مرة واحدة.

---

## ٣. [[cloudflared tunnel create dev]]

- [[create]]: اعمل tunnel جديد.
- [[dev]]: اسمه. انت اللي بتختاره.

~~~text الناتج (من الـ docs)
Created tunnel dev with id <uuid>
~~~

وبيكتب ملف [[~/.cloudflared/<uuid>.json]] فيه بيانات دخول الـ tunnel. الملف ده سر: اللي معاه يقدر يشغّل الـ tunnel بتاعك.

---

## ٤. [[cloudflared tunnel route dns dev dev.example.com]]

| الحتة | معناها |
|---|---|
| [[route dns]] | اعمل سجل DNS يشاور على tunnel |
| [[dev]] | اسم الـ tunnel |
| [[dev.example.com]] | الـ subdomain اللي هيتعمل |

بيعمل سجل CNAME في Cloudflare: [[dev.example.com]] يشاور على [[<uuid>.cfargotunnel.com]]. عشان كده الدومين لازم يكون على nameservers بتاعة Cloudflare. ([[example.com]] دومين مخصص للأمثلة، حط دومينك.)

---

## ٥. [[cloudflared tunnel run dev]]

بيشغّل الـ tunnel. بس يوصّل لأنهي بورت؟ ده بييجي من ملف الإعدادات (الـ [[solCode]]):

~~~text ~/.cloudflared/config.yml
tunnel: <TUNNEL-UUID>
credentials-file: /home/you/.cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - service: http_status:404
~~~

| السطر | معناه |
|---|---|
| [[tunnel:]] | الـ id اللي طلع من [[create]] |
| [[credentials-file:]] | ملف بيانات الدخول اللي اتعمل معاه |
| [[ingress:]] | قواعد «الطلب ده يروح فين»، بالترتيب من فوق لتحت |
| [[hostname: dev.example.com]] و [[service: http://localhost:3000]] | أي طلب على الاسم ده يروح لبورت 3000 عندك |
| [[service: http_status:404]] | أي طلب تاني: رد 404. Cloudflare بيطلب إن آخر قاعدة تبقى من غير hostname |

ده YAML: المسافات في أول السطر هي اللي بتحدد مين جوه مين، و [[-]] في أول السطر معناها عنصر في قايمة.

وأول ما يشتغل بيطبع [[Registered tunnel connection]] (عادةً ٤ مرات، اتصالات لأكتر من سيرفر عند Cloudflare). ساعتها [[https://dev.example.com]] بيفتح سيرفرك، وتحطه في Paymob مرة واحدة ومتغيّرهوش تاني.

---

## على ويندوز

نفس الأوامر بالظبط، وملفات [[cert.pem]] و [[<uuid>.json]] و [[config.yml]] بتتحط في [[%USERPROFILE%\.cloudflared\]] بدل [[~/.cloudflared/]] (حسب الـ docs).

---

## الخلاصة

| الأمر | بيعمل إيه | مرة ولا كل مرة |
|---|---|---|
| [[cloudflared tunnel --url http://localhost:3000]] | عنوان عشوائي للتجربة | كل مرة |
| [[cloudflared tunnel login]] | يربط بحسابك ودومينك | مرة |
| [[cloudflared tunnel create dev]] | tunnel اسمه dev + ملف credentials | مرة |
| [[cloudflared tunnel route dns dev dev.example.com]] | CNAME للـ subdomain | مرة |
| [[cloudflared tunnel run dev]] | يشغّل حسب [[config.yml]] | كل مرة |

- 404 من Cloudflare = الـ [[hostname]] في [[ingress]] مش مطابق، أو ناقص.
- الفرق عن ngrok المجاني: عنوان ثابت على دومينك، بس محتاج دومين على Cloudflare.`,
          lines: [
            "tunnel سريع بعنوان عشوائي من غير حساب.",
            "اربط بحسابك على Cloudflare.",
            "اعمل tunnel اسمه dev.",
            "اعمل سجل DNS يشاور عليه.",
            "شغّله (بعد ملف config فيه ingress)."
          ],
          sol: R`الخطوات: [[cloudflared tunnel login]] (بتختار الدومين من المتصفح)، [[cloudflared tunnel create dev]] بيطبع [[Created tunnel dev with id <uuid>]] وبيعمل ملف credentials [[~/.cloudflared/<uuid>.json]]، و [[cloudflared tunnel route dns dev dev.example.com]] بيعمل CNAME في Cloudflare. وبعدين [[~/.cloudflared/config.yml]]:

[[tunnel: <uuid>]] و [[credentials-file: /home/you/.cloudflared/<uuid>.json]] و [[ingress]] فيها [[hostname: dev.example.com]] و [[service: http://localhost:3000]] وآخر قاعدة [[service: http_status:404]]. [[cloudflared tunnel run dev]] بيطبع [[Registered tunnel connection]] (عادة ٤ اتصالات)، و [[https://dev.example.com]] بيفتح سيرفرك. حط الرابط ده في Paymob مرة واحدة.

لو فتح 404 من Cloudflare: الـ ingress ناقصة أو الـ hostname فيها مختلف. ولو DNS مش بيتحل، الدومين مش على nameservers بتاعة Cloudflare.`,
          solCode: R`# ~/.cloudflared/config.yml
tunnel: <TUNNEL-UUID>
credentials-file: /home/you/.cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - service: http_status:404`
        },
        {
          cmd: "التحقق من التوقيع",
          title: "متصدقش أي POST",
          desc: "أي حد يعرف الـ URL يقدر يبعت JSON يقول «الدفع نجح». البوابة بتبعت توقيع HMAC محسوب بمفتاح سري انت بس اللي عارفه. لازم تحسبه عندك وتقارن، وإلا حد يفعّل طلبات من غير ما يدفع.",
          example: R`import crypto from "node:crypto";

export function verifyPaymob(obj, receivedHmac, secret) {
  const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
  const get = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const concat = fields.map((f) => String(get(obj, f))).join("");
  const expected = crypto.createHmac("sha512", secret).update(concat).digest("hex");
  if (typeof receivedHmac !== "string" || receivedHmac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedHmac));
}`,
          try: "ابعت webhook بدون hmac أو بـ hmac غلط واتأكد إن الـ route بيرفض بـ 401 مش بيفعّل الطلب.",
          flag: "script",
          deep: {
            why: R`الـ webhook URL بتاعك عام. أي حد يعرفه (أو يخمّنه) يقدر يبعت POST فيه [["success": true]] ويفعّل طلب من غير ما يدفع. التوقيع هو الدليل إن الطلب من Paymob فعلًا.`,
            how: R`HMAC: البوابة بتاخد بيانات المعاملة، وبتلزقهم في نص واحد بترتيب محدد، وبتحسب hash منه بمفتاح سري (الـ HMAC secret اللي في لوحة Paymob). وبتبعت الـ hash ده مع الطلب.

انت عندك نفس المفتاح. بتعمل نفس الحسبة بالبيانات اللي وصلتك. لو طلع نفس الـ hash، يبقى البيانات متغيرتش واللي بعتها عنده المفتاح. لو حد غيّر [[success]] أو المبلغ، الـ hash هيختلف.

Paymob بتحدد ترتيب الحقول بالظبط (اللي في المثال، أبجدي)، والفصل بينهم مفيش، والقيم كـ نصوص ([[true]] بتبقى "true"). والحقول المتداخلة زي [[order.id]] بتتقري من جوه. الترتيب ده من وثائقهم ولازم يبقى مطابق حرفيًا.

[[timingSafeEqual]] بدل [[===]]: المقارنة العادية بتوقف عند أول حرف مختلف، فوقتها بيكشف قد إيه التخمين قريب (timing attack). دي بتاخد نفس الوقت دايمًا.

Tabby و Tamara بيبعتوا التوقيع في header وبيحسبوه على الـ body الخام، فمحتاج [[express.raw()]] للمسار ده عشان تاخد الـ body قبل ما يتعمله parse.`,
            when: "كل webhook بيأثر على فلوس أو صلاحيات. من غير استثناء.",
            mistakes: "تقارن بـ ===. وتعمل parse للـ body قبل التحقق في البوابات اللي بتوقّع على الـ raw body، فالتوقيع يفشل دايمًا."
          },
          teach: R`## الدالة دي بتعمل إيه

[[verifyPaymob]] بتجاوب على سؤال واحد: «الطلب ده جاي من Paymob فعلًا، ومحدش غيّر فيه؟». Paymob بتحسب «بصمة» (HMAC) من بيانات المعاملة بمفتاح سري، وبتبعتها في الـ URL كـ [[?hmac=...]]. الدالة بتحسب نفس البصمة بنفس المفتاح وتقارن. جربناها على سيرفر Express جوه [[node:22-slim]]، والـ secret [[test-secret]].

> HMAC = Hash-based Message Authentication Code. الـ hash دالة بتحوّل أي نص لرقم طوله ثابت، وأي تغيير في حرف واحد بيغيّر الناتج كله. و HMAC هو hash بيدخل فيه مفتاح سري، فمحدش يقدر يحسبه من غير المفتاح.

---

## ١. [[import crypto from "node:crypto";]]

مكتبة التشفير المبنية في Node. مش محتاج npm install.

---

## ٢. [[export function verifyPaymob(obj, receivedHmac, secret)]]

- [[export]]: الدالة دي تتستخدم من ملف تاني ([[import { verifyPaymob } from "./verify.js"]]).
- [[obj]]: بيانات المعاملة ([[req.body.obj]]).
- [[receivedHmac]]: البصمة اللي وصلت ([[req.query.hmac]]).
- [[secret]]: الـ HMAC secret من لوحة Paymob (مش الـ API key).

---

## ٣. [[const fields = [...]]]

قايمة بـ ٢٠ حقل بالترتيب اللي Paymob بتحدده في الـ docs بتاعتها (أبجدي). الترتيب جزء من الحسبة: لو بدّلت حقلين، البصمة هتختلف. و [[error_occured]] مكتوبة غلط إملائيًا عندهم (المفروض occurred)، ولازم تفضل زي ما هي. و [[order.id]] و [[source_data.pan]] حقول **جوه** objects تانية.

---

## ٤. [[const get = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);]]

دالة صغيرة تقرا حقل متداخل زي [[order.id]]. نفكها من جوه لبرة:

| الخطوة | الحتة | بتعمل إيه | مع [[order.id]] |
|---|---|---|---|
| ١ | [[path.split(".")]] | قسّم النص عند كل نقطة | [[["order", "id"]]] |
| ٢ | [[.reduce(fn, o)]] | ابدأ بـ [[o]]، وعدّي على كل اسم | [[o]] ← [[o.order]] ← [[o.order.id]] |
| ٣ | [[a == null ? a : a[k]]] | لو اللي وصلناله null أو undefined وقّف، وإلا ادخل خطوة | يحمي من error لو [[order]] مش موجود |

[[? :]] اسمه ternary: «الشرط ؟ لو صح : لو غلط». جربناها:

~~~text الناتج
get(obj, "order.id")         ->  777
get(obj, "source_data.pan")  ->  undefined   (مفيش source_data، ومفيش error)
~~~

---

## ٥. [[const concat = fields.map((f) => String(get(obj, f))).join("");]]

- [[fields.map(...)]]: لكل حقل، هات قيمته.
- [[String(...)]]: حوّلها نص: [[true]] تبقى [["true"]] و [[10000]] تبقى [["10000"]].
- [[.join("")]]: الزقهم ورا بعض من غير أي فاصل.

جربناها على ٥ حقول بس عشان تبان:

~~~text الناتج
10000undefined12345777true
~~~

[[amount_cents]] ثم [[currency]] (مش موجودة فبقت [["undefined"]]) ثم [[id]] ثم [[order.id]] ثم [[success]]. ده النص اللي هيتعمل له HMAC.

---

## ٦. [[const expected = crypto.createHmac("sha512", secret).update(concat).digest("hex");]]

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[crypto.createHmac("sha512", secret)]] | جهّز HMAC بخوارزمية SHA-512 والمفتاح السري |
| ٢ | [[.update(concat)]] | ده النص اللي هتحسب بصمته |
| ٣ | [[.digest("hex")]] | احسب، واكتب الناتج hex (أرقام و a-f) |

SHA-512 ناتجه 512 bit = 64 byte، وكل byte بيتكتب حرفين hex، فالناتج دايمًا **128 حرف**. جربناه وطلع 128.

---

## ٧. فحص الطول

~~~text verify.js
if (typeof receivedHmac !== "string" || receivedHmac.length !== expected.length) return false;
~~~

- [[typeof receivedHmac !== "string"]]: لو مفيش [[?hmac]] خالص، القيمة [[undefined]]، فارفض.
- [[receivedHmac.length !== expected.length]]: لو طوله مش 128، أكيد غلط.

ليه السطر ده لازم قبل اللي بعده؟ لأن [[timingSafeEqual]] بيرمي error لو الطولين مختلفين. جربناه:

~~~text الناتج
ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH Input buffers must have the same byte length
~~~

من غير الفحص، أي حد يبعت [[?hmac=abc]] كان هيوقّع الـ route بـ 500 بدل 401.

---

## ٨. [[return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedHmac));]]

- [[Buffer.from(...)]]: حوّل النص لـ bytes، لأن الدالة بتقارن bytes.
- [[timingSafeEqual]]: قارن، وخد **نفس الوقت** دايمًا.

ليه مش [[===]]؟ [[===]] بتوقف عند أول حرف مختلف. فالتخمين اللي أول ١٠ حروف فيه صح بياخد وقت أطول شوية من اللي أول حرف فيه غلط. حد بيقيس الوقت ده آلاف المرات يقدر يخمّن البصمة حرف حرف (timing attack). [[timingSafeEqual]] بتلف على كل الحروف كل مرة.

---

## التجربة كاملة (الـ [[solCode]])

[[sign.js]] بيحسب البصمة الصح لـ body تجربة بنفس الخوارزمية، و [[readFileSync(0, "utf8")]] معناها «اقرا من stdin» (الـ 0 رقم stdin)، فبنبعتله الـ body بـ [[echo "$BODY" |]]. وبعدين ٣ طلبات:

~~~bash
H=$(echo "$BODY" | PAYMOB_HMAC=test-secret node sign.js)
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob" -H "Content-Type: application/json" -d "$BODY"
~~~

- [[H=$(...)]]: شغّل الأمر وخزّن ناتجه في متغير [[H]].
- [[-o /dev/null]]: ارمي الـ body بتاع الرد.
- [[-w "%{http_code}\n"]]: اطبع رقم الـ status بس.

~~~text الناتج
401      من غير ?hmac
401      ?hmac=abc
200      ?hmac=$H   (والسيرفر طبع: activate order 777)
401      نفس الـ hmac بس غيّرنا amount_cents من 10000 لـ 1
~~~

السطر الأخير هو الهدف كله: حد خد webhook حقيقي وغيّر المبلغ، والبصمة مبقتش مطابقة.

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| الحقول بالترتيب | [[fields]] |
| اقرا الحقول المتداخلة بأمان | [[get]] |
| الزق القيم كنصوص | [[map(String).join("")]] |
| احسب HMAC-SHA512 | [[createHmac("sha512", secret)]] |
| ارفض لو ناقص أو طوله غلط | [[typeof]] و [[length]] |
| قارن بوقت ثابت | [[timingSafeEqual]] |

والكود ده JavaScript عادي، فبيشتغل زي ما هو على ويندوز ولينكس والماك.`,
          lines: [
            "مكتبة التشفير المبنية في Node.",
            "الدالة: بيانات المعاملة، والتوقيع اللي وصل، والمفتاح السري.",
            "الحقول بالترتيب اللي Paymob بتحدده (من وثائقهم، حرفيًا).",
            "دالة تقرا حقل متداخل زي order.id بأمان.",
            "الزق قيم الحقول كنصوص من غير فواصل.",
            "احسب HMAC-SHA512 بالمفتاح.",
            "لو الـ hmac مش موجود أو طوله غلط ارفض على طول، لأن timingSafeEqual بيضرب error لو الطولين مختلفين.",
            "قارن بطريقة بتاخد وقت ثابت (مش ===).",
            "قفلة."
          ],
          sol: R`جرّبتها على route فيه [[verifyPaymob]] والـ secret [[test-secret]]، وحسبت الـ hmac الصح بنفس الدالة للـ body ده. النتيجة بالترتيب: من غير [[?hmac]] [[401]]، بـ [[?hmac=abc]] [[401]]، بالـ hmac الصح [[200]] وطبع [[activate order 777]].

من غير hmac الدالة بترجع false قبل ما تحسب حاجة ([[typeof receivedHmac !== "string"]])، و [[abc]] بترجع false من فحص الطول قبل [[timingSafeEqual]] (اللي بيرمي error لو الأطوال مختلفة). والمهم إن الـ route بيرجع 401 وبيخرج قبل أي تعديل في القاعدة.

الأخطاء الشائعة: تستخدم الـ API key بدل الـ HMAC secret من لوحة Paymob فكل الطلبات الحقيقية تطلع 401. أو تغيّر ترتيب الحقول أو تنسى [[order.id]] المتداخل. أو تقارن بـ [[===]] وتنسى إن الرد 200 لازم ميبقاش قبل التحقق.`,
          solCode: R`// sign.js: يحسب الـ hmac الصح لـ body تجربة (نفس خوارزمية verifyPaymob)
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
const tx = JSON.parse(readFileSync(0, "utf8")).obj;
const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
console.log(crypto.createHmac("sha512", process.env.PAYMOB_HMAC).update(fields.map((f) => String(get(tx, f))).join("")).digest("hex"));

// الترمنال
BODY='{"type":"TRANSACTION","obj":{"id":12345,"success":true,"amount_cents":10000,"order":{"id":777}}}'
H=$(echo "$BODY" | PAYMOB_HMAC=test-secret node sign.js)
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=abc" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=$H" -H "Content-Type: application/json" -d "$BODY"`
        },
        {
          cmd: "إعادة الإرسال والتكرار",
          title: "idempotency",
          desc: "البوابة بتعيد إرسال الـ webhook لو سيرفرك مردّش بـ 200 في ثواني. فنفس الدفعة ممكن توصلك ٣ مرات. الحل: رد 200 بسرعة، واعمل الشغل بعدين، وسجّل id الدفعة عشان متنفّذش مرتين.",
          example: R`app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  if (!verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC)) {
    return res.status(401).end();
  }
  res.status(200).end();
  const seen = await db.payment.findUnique({ where: { gatewayId: String(tx.id) } });
  if (seen) return;
  await db.payment.create({ data: { gatewayId: String(tx.id), amount: tx.amount_cents, ok: tx.success } });
  if (tx.success) await activateOrder(tx.order.id);
});`,
          try: "من لوحة ngrok (localhost:4040) اعمل Replay لنفس الطلب ٣ مرات واتأكد إن الطلب اتفعّل مرة واحدة.",
          flag: "script",
          deep: {
            why: "البوابة مش بتبعت مرة واحدة. لو سيرفرك تأخر في الرد أو رد بـ 500، بتعيد بعد دقيقة، وبعد ٥، وبعد ساعة. فلو الكود بيفعّل الطلب مع كل webhook، العميل بيتفعّله ٣ مرات، أو بيتسجّل ٣ دفعات.",
            how: R`الترتيب في الـ handler مقصود: التحقق من التوقيع الأول، وبعدين [[res.status(200).end()]] فورًا قبل أي شغل تقيل. البوابة بتعتبر 200 «استلمت»، ومش هتعيد. لو استنيت لحد ما تكتب في القاعدة وتبعت إيميل، ممكن تعدّي مهلتهم (ثواني قليلة) ويعيدوا.

بعد الرد، الشغل بيكمّل في نفس الـ handler (Express بيسمح بكده). في الأنظمة الأكبر، بيتحط في queue.

الـ idempotency: كل معاملة ليها [[id]] فريد من البوابة. قبل ما تعمل أي حاجة، دوّر عليه في جدول payments. لو موجود، ده تكرار، اطلع. لو لأ، سجّله وكمّل. الجدول ده هو الحماية من التكرار وهو كمان سجل كامل للدفعات.

و [[gatewayId]] لازم يبقى unique في الـ schema، عشان لو webhookين وصلوا في نفس اللحظة، القاعدة ترفض التاني.

[[tx.success]] بيتفحص بعد التسجيل: الدفعات الفاشلة كمان بتتسجّل، مفيدة في الدعم.`,
            when: "كل webhook handler. والفكرة نفسها لأي عملية ممكن تتكرر: إيميلات، وتفعيل اشتراكات.",
            mistakes: "الشغل قبل الرد فتعدّي المهلة. والتحقق من التكرار بالـ order id بدل transaction id، فمحاولة دفع تانية لنفس الطلب تتعتبر تكرار."
          },
          teach: R`## الكود ده بيعمل إيه

handler للـ webhook بيتحمّل إن نفس الطلب يوصل كذا مرة: يتحقق من التوقيع، ويرد 200 على طول، وبعدين يشوف: المعاملة دي اتسجلت قبل كده؟ لو أيوه يطلع، لو لأ يسجلها ويفعّل الطلب. الكلمة اسمها **idempotency**: تنفيذ نفس العملية مرة ولا عشرة، النتيجة واحدة.

جربناه زي ما هو، مع Prisma 7.10.0 و Postgres 16 جوه Docker. الـ [[db]] هو [[PrismaClient]]، و [[verifyPaymob]] من الدرس اللي فات، و [[activateOrder]] دالة بتطبع [[activate order <id>]] بس. والجدول:

~~~text prisma/schema.prisma
model Payment {
  id        Int     @id @default(autoincrement())
  gatewayId String  @unique
  amount    Int
  ok        Boolean
}
~~~

---

## ١. [[app.post("/webhooks/paymob", async (req, res) => {]]

[[async]] عشان جوه الدالة هنستخدم [[await]] مع القاعدة. و Express 5 بيمسك أي error من دالة async لوحده.

## ٢. [[const tx = req.body.obj;]]

[[tx]] (transaction) = بيانات المعاملة اللي Paymob بعتتها: [[id]] و [[success]] و [[amount_cents]] و [[order.id]].

---

## ٣. التحقق الأول

~~~text الكود
if (!verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC)) {
  return res.status(401).end();
}
~~~

- [[req.query.hmac]]: Paymob بتبعت البصمة في الـ URL ([[?hmac=...]])، و Express بيحط الـ query string في [[req.query]].
- [[process.env.PAYMOB_HMAC]]: الـ secret من متغير بيئة، مش مكتوب في الكود.
- [[res.status(401).end()]]: رد 401 (Unauthorized) من غير body.
- [[return]]: اخرج من الدالة. من غيرها الكود كان هيكمّل للسطور اللي تحت.

---

## ٤. [[res.status(200).end();]]

الرد **قبل** أي شغل مع القاعدة. Paymob بتستنى الرد ثواني قليلة، ولو مجاش أو جه 500 بتعيد الإرسال. فبنقولها «استلمت» على طول، والدالة تكمّل شغلها بعد الرد عادي.

---

## ٥. فحص التكرار

~~~text الكود
const seen = await db.payment.findUnique({ where: { gatewayId: String(tx.id) } });
if (seen) return;
~~~

- [[db.payment.findUnique]]: دوّر على صف واحد بعمود unique.
- [[gatewayId: String(tx.id)]]: الـ id بتاع Paymob رقم، والعمود نص، فـ [[String()]] بتحوّله. ليه نص؟ عشان أي بوابة تانية ممكن الـ id بتاعها حروف.
- [[if (seen) return;]]: لقيناه؟ يبقى ده تكرار، اطلع (الرد 200 اتبعت خلاص).

---

## ٦. التسجيل والتفعيل

~~~text الكود
await db.payment.create({ data: { gatewayId: String(tx.id), amount: tx.amount_cents, ok: tx.success } });
if (tx.success) await activateOrder(tx.order.id);
~~~

- [[create]]: سجّل المعاملة، **حتى لو فشلت** ([[ok: false]]): مفيدة لما عميل يكلّم الدعم.
- [[if (tx.success)]]: فعّل الطلب لو الدفع نجح بس.

---

## التجربة ١: نفس الطلب ٤ مرات ورا بعض

نفس الـ body ونفس الـ hmac الصح ٤ مرات (زي Replay من لوحة ngrok):

~~~text الناتج
200 200 200 200
activate order 777
duplicate 12345
duplicate 12345
duplicate 12345
~~~

(ضفنا [[console.log("duplicate", tx.id)]] جنب الـ return عشان يبان.) الأربعة خدوا 200 عشان Paymob تبطّل تعيد، والتفعيل حصل مرة واحدة، والجدول فيه صف واحد:

~~~text الناتج
 id | gatewayId | amount | ok 
----+-----------+--------+----
  1 | 12345     |  10000 | t
~~~

## التجربة ٢: طلبين في نفس اللحظة

بعتنا ١٠ معاملات مختلفة، كل واحدة **مرتين في نفس الوقت** ([[&]] في bash عشان الاتنين يطلعوا مع بعض):

~~~text الناتج
10    activate order ...
5     Unique constraint failed on the constraint: $__btPayment_gatewayId_key$__bt
~~~

في ٥ مرات الطلبين عملوا [[findUnique]] قبل ما أي واحد يعمل [[create]]، فالاتنين شافوا «مش موجود». اللي أنقذ الموقف [[@unique]] على [[gatewayId]]: Postgres رفض الـ create التاني (P2002)، فالـ handler بتاعه وقع قبل [[activateOrder]]. والنتيجة ١٠ تفعيلات بالظبط لـ ١٠ معاملات. Express 5 مسك الـ error وطبعه في اللوج، والـ 200 كان اتبعت خلاص.

يعني [[findUnique]] بيمنع التكرار العادي، و [[@unique]] هو الضمان الحقيقي. ولو عايز اللوج نضيف، امسك [[P2002]] بـ try/catch وتجاهله.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[verifyPaymob]] الأول | متعملش أي حاجة لطلب مزوّر |
| [[res.status(200).end()]] قبل القاعدة | Paymob متعيدش بسبب بطء |
| [[findUnique]] بالـ [[gatewayId]] | التكرار العادي يخرج بدري |
| [[create]] حتى للفاشل | سجل كامل للدعم |
| [[@unique]] على [[gatewayId]] | يمنع التكرار لو طلبين وصلوا مع بعض |

- الـ id بتاع **المعاملة**، مش الطلب (order): العميل ممكن يحاول يدفع نفس الطلب مرتين، والمحاولة التانية معاملة جديدة.`,
          lines: [
            "مسار الـ webhook.",
            "بيانات المعاملة.",
            "لو التوقيع غلط (Paymob بتبعته في query string)...",
            "...ارفض من غير أي شغل.",
            "قفلة.",
            "رد 200 فورًا عشان ميعيدوش، والشغل بعدين.",
            "دوّرنا على المعاملة دي قبل كده؟",
            "لو أيوه، تكرار، خلاص.",
            "سجّلها (gatewayId لازم unique في الـ schema).",
            "لو نجحت، فعّل الطلب.",
            "قفلة."
          ],
          sol: R`بعد الطلب الأصلي و ٣ Replay من [[localhost:4040]]: كلهم بيرجعوا [[200]] (ودا المطلوب، عشان Paymob يبطّل يعيد)، بس التفعيل حصل مرة واحدة. في تجربتي بنفس الـ id طبع [[activate order 777]] أول مرة، وبعدين [[duplicate 12345]] في كل مرة بعدها، وجدول [[payment]] فيه صف واحد بـ [[gatewayId = "12345"]].

لو الطلب اتفعّل كذا مرة: الـ [[findUnique]] بيدوّر على حقل تاني، أو [[gatewayId]] مش متخزن كنص فالمقارنة فشلت. ولو Replay رجّع 401: ngrok بيعيد نفس الـ URL بالـ query، فغالبًا الـ secret اتغير أو الطلب الأصلي كان 401 أصلًا.

وفيه حالة الـ Replay مش بتمسكها: طلبين في نفس اللحظة، الاتنين يعملوا findUnique قبل ما أي واحد يعمل create. الحماية الحقيقية [[@unique]] على [[gatewayId]] في الـ schema، فالتاني يقع بـ P2002 وتتجاهله.`
        },
        {
          cmd: "لوج الـ webhooks",
          title: "سجّل كل حاجة توصل",
          desc: "لما عميل يقول «دفعت والطلب متفعّلش»، محتاج تعرف الـ webhook وصل أصلًا ولا لأ، وبإيه. سجّل الـ body الخام والـ headers والوقت قبل أي معالجة، في جدول أو ملف.",
          example: R`tail -f logs/webhooks.log | jq .
grep '"id":12345' logs/webhooks.log | jq .
curl -s localhost:4040/api/requests/http | jq '.requests[] | {uri: .request.uri, status: .response.status}'`,
          try: "سجّل كل webhook في ملف JSON lines، وبعدين استخدم jq تلاقي دفعة معينة بالـ id.",
          deep: {
            why: "«دفعت والاشتراك متفعّلش» أصعب شكوى تحلها لو مش عندك سجل. وصل webhook أصلًا؟ بإيه؟ التوقيع فشل؟ من غير لوج بتخمّن.",
            how: R`السجل بيتكتب قبل أي معالجة: الوقت، والمسار، والـ headers المهمة، والـ body الخام كامل، ورقم الرد اللي رجعته. لو التوقيع فشل، بيتسجّل إنه فشل. وده غير جدول payments اللي بيتكتب بعد التحقق.

الصيغة الأنسب JSON lines: سطر لكل حدث، كل سطر JSON كامل. [[tail -f | jq .]] بيعرضه منسّق لايف، و [[grep]] بيلاقي دفعة بالـ id وبعدين jq بيفكّها. وفي الإنتاج نفس الفكرة بجدول webhook_events في القاعدة.

في التطوير، لوحة ngrok هي اللوج: الـ API بتاعتها على 4040 بترجع كل الطلبات، والأمر في المثال بيلخّصها: المسار والـ status اللي رجّعته لكل طلب. أي 4xx أو 5xx هناك هو المشكلة.

والاحتفاظ: ٩٠ يوم على الأقل، لأن نزاعات الدفع بتتفتح بعد أسابيع.`,
            when: "من أول webhook في أي مشروع. مش بعد أول شكوى.",
            mistakes: "تسجّل الـ body بعد ما تعدّل فيه. وتسجّل في console.log بس على سيرفر لوجاته بتتدور كل يوم."
          },
          teach: R`## الفكرة

كل webhook يوصل بيتكتب سطر في ملف **قبل** أي تحقق أو معالجة، حتى اللي هيترفض. وبعدين ٣ أوامر تقرا الملف ده: واحد بيتابعه لايف، وواحد بيدوّر على دفعة بالـ id، وواحد بيقرا سجل ngrok. جربنا كله جوه [[node:22-slim]] على سيرفر الـ [[solCode]]، وبعتنا ٤ طلبات: من غير hmac، وبـ hmac غلط، وبالصح، ومعاملة تانية فاشلة.

---

## الكود اللي بيكتب اللوج (الـ [[solCode]])

~~~text server.js
import { appendFile } from "node:fs/promises";

app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  const hmacOk = verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC);
  await appendFile("logs/webhooks.log",
    JSON.stringify({ at: new Date().toISOString(), id: tx?.id, success: tx?.success, hmacOk }) + "\n");
  if (!hmacOk) return res.status(401).end();
  res.status(200).end();
});
~~~

| الحتة | معناها |
|---|---|
| [[appendFile]] | ضيف في **آخر** الملف (ولو مش موجود اعمله). [[writeFile]] كانت هتمسح القديم |
| [[const hmacOk = verifyPaymob(...)]] | احسب نتيجة التحقق وخزّنها، بس **متتصرفش** بيها لسه |
| [[new Date().toISOString()]] | الوقت دلوقتي بصيغة ISO بتوقيت UTC، زي [[2026-10-06T13:30:14.020Z]] ([[Z]] = UTC) |
| [[tx?.id]] | [[?.]] (optional chaining): لو [[tx]] مش موجود رجّع undefined بدل ما يقع |
| [[{ ..., hmacOk }]] | اختصار لـ [[hmacOk: hmacOk]] |
| [[JSON.stringify(...) + "\n"]] | السطر كله JSON في سطر واحد، وبعده سطر جديد |
| [[if (!hmacOk) return ...]] | الرفض **بعد** التسجيل، فالطلب المزوّر نفسه متسجّل |

الشكل ده اسمه **JSON lines**: كل سطر JSON كامل لوحده. ده الملف بعد الـ ٤ طلبات:

~~~text logs/webhooks.log
{"at":"2026-10-06T13:30:14.020Z","id":12345,"success":true,"hmacOk":false}
{"at":"2026-10-06T13:30:14.035Z","id":12345,"success":true,"hmacOk":false}
{"at":"2026-10-06T13:30:14.045Z","id":12345,"success":true,"hmacOk":true}
{"at":"2026-10-06T13:30:14.056Z","id":555,"success":false,"hmacOk":false}
~~~

---

## ١. [[tail -f logs/webhooks.log | jq .]]

- [[tail -f]]: اعرض آخر الملف، و [[-f]] (follow) = فضّل فاتح، وأي سطر جديد يتكتب اطبعه.
- [[| jq .]]: [[.]] في jq معناها «الحاجة كلها»، فبيطبع كل سطر منسّق وملوّن.

~~~text الناتج
{
  "at": "2026-10-06T13:30:14.020Z",
  "id": 12345,
  "success": true,
  "hmacOk": false
}
...
~~~

بتسيبه شغال في ترمنال وانت بتجرّب الدفع، وتقفله بـ Ctrl+C.

---

## ٢. [[grep '"id":12345' logs/webhooks.log | jq .]]

- [[grep '"id":12345']]: هات السطور اللي فيها النص ده بالظبط. علامات التنصيص المفردة بره عشان الدبل اللي جوه توصل لـ grep زي ما هي.

~~~text الناتج (بـ jq -c عشان كل واحد في سطر)
{"at":"2026-10-06T13:30:14.020Z","id":12345,"success":true,"hmacOk":false}
{"at":"2026-10-06T13:30:14.035Z","id":12345,"success":true,"hmacOk":false}
{"at":"2026-10-06T13:30:14.045Z","id":12345,"success":true,"hmacOk":true}
~~~

ودي القصة كاملة: وصل ٣ مرات، أول اتنين التوقيع فشل، والتالت نجح. لو عميل اشتكى، ده اللي هتبص عليه.

بس [[grep]] بيدوّر على نص مش JSON: لو السطر مكتوب [["id": 12345]] بمسافة، جربناها ومطلعش ولا سطر (0). وكمان [["id":12345]] هيطلع جوه [["id":123456]]. الأدق إن jq نفسه يفلتر:

~~~bash
jq -c 'select(.id == 12345 and .hmacOk)' logs/webhooks.log
~~~

~~~text الناتج
{"at":"2026-10-06T13:30:14.045Z","id":12345,"success":true,"hmacOk":true}
~~~

[[select(شرط)]] بيسيب السطور اللي الشرط فيها صح بس، و [[-c]] (compact) سطر لكل نتيجة.

---

## ٣. [[curl -s localhost:4040/api/requests/http | jq '.requests[] | {uri: .request.uri, status: .response.status}']]

ده سجل ngrok نفسه (درس «ngrok»). نفكه:

| الحتة | معناها |
|---|---|
| [[.requests[]]] | لف على كل الطلبات ([[[]]] من غير رقم = كلهم) |
| [[|]] جوه jq | ابعت كل طلب للي بعده |
| [[{uri: .request.uri, status: .response.status}]] | اعمل object جديد فيه خانتين بس |

جربناه على JSON بنفس الشكل اللي docs ngrok بتوصفه (ngrok نفسه مش متسطب هنا):

~~~text الناتج
{"uri":"/webhooks/paymob?hmac=abc","status":"401 Unauthorized"}
{"uri":"/","status":"200 OK"}
~~~

> صلّحنا السطر ده في المثال: كان [[{uri, status: ...}]]، و [[uri]] لوحدها في JSON بتاع ngrok هي عنوان الطلب **جوه الـ API** ([[/api/requests/http/548fb5c700000002]])، مش المسار اللي Paymob طلبته. المسار الحقيقي في [[.request.uri]].

---

## على ويندوز (من غير jq)

PowerShell بيقرا JSON لوحده:

~~~powershell
Get-Content logs/webhooks.log | ConvertFrom-Json | Where-Object id -eq 12345 | Format-Table
~~~

- [[ConvertFrom-Json]]: كل سطر يبقى object.
- [[Where-Object id -eq 12345]]: زي [[select(.id == 12345)]].
- [[Get-Content -Wait logs/webhooks.log]]: بديل [[tail -f]].

~~~text الناتج في Windows PowerShell 5.1
at                          id success hmacOk
--                          -- ------- ------
2026-10-06T13:30:14.020Z 12345    True  False
2026-10-06T13:30:14.035Z 12345    True  False
2026-10-06T13:30:14.045Z 12345    True   True
~~~

وفي PowerShell 7 نفس الصفوف، بس عمود [[at]] اتعرض [[10/6/2026 1:30:14 PM]]: نسخة 7 بتحوّل نصوص التاريخ لـ DateTime لوحدها، وبتعرضه بالتوقيت المحلي من غير الملي ثانية.

---

## الخلاصة

| عايز | لينكس / ماك | PowerShell |
|---|---|---|
| أتابع لايف | [[tail -f file | jq .]] | [[Get-Content -Wait file]] |
| ألاقي دفعة | [[jq 'select(.id == 12345)' file]] | [[ConvertFrom-Json | Where-Object id -eq 12345]] |
| أشوف طلبات ngrok | [[jq '.requests[] | {uri: .request.uri, ...}']] | [[(Invoke-RestMethod ...).requests]] |

- اكتب السطر **قبل** التحقق، عشان المرفوض يتسجّل كمان.
- متسجّلش بيانات كارت ولا الـ hmac كامل، وحط [[logs/]] في [[.gitignore]].`,
          lines: [
            "تابع اللوج لايف منسّق.",
            "لاقي دفعة بالـ id.",
            "من لوحة ngrok: كل الطلبات ومساراتها والرد اللي رجّعته."
          ],
          sol: R`الحل: سطر [[appendFile("logs/webhooks.log", JSON.stringify({...}) + "\n")]] في أول الـ route قبل أي تحقق، فكل طلب، حتى المرفوض، بيتسجل. في تجربتي ٥ طلبات بنفس الـ id طلّعوا ٥ سطور، و [[grep '"id":12345' logs/webhooks.log | jq .]] بيعرضهم كـ JSON منسّق:

[[{ "at": "2026-09-30T07:55:59.070Z", "id": 12345, "success": true, "hmacOk": false }]] (الأولين كانوا من غير hmac صح) وبعدهم [[hmacOk: true]].

خلي بالك: [[grep '"id":12345']] بيعتمد على إن [[JSON.stringify]] بيكتب من غير مسافات؛ لو كتبت اللوج بإيدك بشكل تاني الـ grep مش هيلاقي. الأدق [[jq 'select(.id == 12345)' logs/webhooks.log]]. ومتسجلش بيانات كارت أو الـ hmac الكامل في اللوج، وحط اللوج في [[.gitignore]].`,
          solCode: R`import { appendFile } from "node:fs/promises";

app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  const hmacOk = verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC);
  await appendFile("logs/webhooks.log",
    JSON.stringify({ at: new Date().toISOString(), id: tx?.id, success: tx?.success, hmacOk }) + "\n");
  if (!hmacOk) return res.status(401).end();
  res.status(200).end();
});

// jq 'select(.id == 12345)' logs/webhooks.log`
        },
        {
          cmd: "webhook تيليجرام",
          title: "سجّل عنوان البوت عند تيليجرام وتابعه",
          desc: R`بوت تيليجرام يا بيسأل كل شوية عن رسايل جديدة (polling)، يا تيليجرام بيبعتله كل رسالة على URL (webhook). [[setWebhook]] بيسجّل الـ URL ومعاه [[secret_token]] بيرجع في header مع كل طلب، و [[getWebhookInfo]] بيقولك في رسايل متراكمة ولا لأ، وآخر خطأ حصل.`,
          example: R`source .env
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -d "url=https://example.com/telegram/webhook" -d "secret_token=$WEBHOOK_SECRET"
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getWebhookInfo" | jq .result
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook?drop_pending_updates=true"`,
          try: "اعمل بوت تجربة من BotFather، وسجّل له webhook على URL من ngrok، وابعت له رسالة، وبعدين [[getWebhookInfo]] وشوف pending_update_count.",
          deep: {
            why: "البوت مبيردش، ومش عارف المشكلة فين: الـ URL متسجّلش؟ تيليجرام بيبعت وسيرفرك بيرد بخطأ؟ الشهادة؟ getWebhookInfo بيجاوب في سطر.",
            how: R`[[setWebhook]] بيقول لتيليجرام «ابعت كل update على الـ URL ده». الـ URL لازم HTTPS بشهادة سليمة، وعلى بورت من 443 أو 80 أو 88 أو 8443 بس. في التطوير URL الـ tunnel بيمشي.

[[secret_token]] قيمة انت بتختارها، وتيليجرام بيبعتها في header اسمه [[X-Telegram-Bot-Api-Secret-Token]] مع كل طلب. سيرفرك يقارنها ويرفض أي طلب من غيرها، نفس فكرة توقيع Paymob.

[[getWebhookInfo]] فيه: [[url]] المتسجّل، و [[pending_update_count]] عدد الرسايل اللي مستنية (لو بيزيد، سيرفرك مش بيرد 200)، و [[last_error_message]] و [[last_error_date]] آخر مرة فشل وليه.

الـ webhook والـ polling ميشتغلوش مع بعض: طول ما فيه webhook، [[getUpdates]] بيرجع خطأ 409. [[deleteWebhook]] بيرجّعك للـ polling، و [[drop_pending_updates]] بيرمي الرسايل المتراكمة عشان البوت ميردش على رسايل من إمبارح.

[[source .env]] عشان التوكن ميتكتبش في الأمر نفسه ويفضل في الـ history.`,
            when: "بعد كل deploy بيغيّر الدومين أو المسار. وأول حاجة لما البوت يسكت.",
            mistakes: "تسجّل URL الـ tunnel وتقفل الترمنال، فتيليجرام يفضل يبعت لعنوان ميت والرسايل تتراكم. وتشغّل نسخة polling على جهازك والـ webhook متسجّل للسيرفر، فتاخد 409. وسيرفرك بيرد 500 على update معين، فتيليجرام يفضل يعيده ويوقف اللي وراه."
          },
          teach: R`## الأوامر دي بتعمل إيه

٤ سطور بتكلّم Bot API بتاع تيليجرام: تحمّل التوكن من [[.env]]، وتسجّل URL سيرفرك عند تيليجرام، وتسأل عن حالة التسجيل، وتشيله. مفيش بوت حقيقي هنا، فجربنا الأوامر بتوكن وهمي جوه [[node:22-slim]] (عشان نشوف شكل الرد والأخطاء)، وردود النجاح من docs الـ Bot API الرسمية.

كل طلبات الـ Bot API شكلها واحد:

~~~text شكل العنوان
https://api.telegram.org/bot<TOKEN>/<METHOD>
~~~

- [[bot<TOKEN>]]: كلمة [[bot]] لازقة في التوكن من غير [[/]] بينهم. التوكن من BotFather، شكله [[123456:ABC...]].
- [[<METHOD>]]: اسم العملية: [[setWebhook]] أو [[getWebhookInfo]] أو [[deleteWebhook]].

---

## ١. [[source .env]]

ملف [[.env]] فيه سطرين [[TELEGRAM_BOT_TOKEN=...]] و [[WEBHOOK_SECRET=...]]. و [[source]] بيقرا الملف ده وينفّذه **في الشيل الحالي**، فالمتغيرين يبقوا موجودين للأوامر اللي بعده. جربناها في bash بقيم وهمية: [[echo $WEBHOOK_SECRET]] طبع القيمة.

ليه مش نكتب التوكن في الأمر؟ لأن أي أمر بتكتبه بيتحفظ في [[~/.bash_history]]، والتوكن ده اللي معاه يتحكم في البوت.

> [[source]] أمر bash و zsh. في [[sh]] (زي جوه Docker [[node:22-slim]]) جربناه وطلع [[sh: 1: source: not found]]: هناك اسمه [[.]] (نقطة): [[. ./.env]].

---

## ٢. [[setWebhook]]

~~~bash
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -d "url=https://example.com/telegram/webhook" -d "secret_token=$WEBHOOK_SECRET"
~~~

| الحتة | معناها |
|---|---|
| [[-sS]] | [[-s]] من غير شريط تقدم، و [[-S]] بس اطبع الأخطاء لو حصلت |
| [[$TELEGRAM_BOT_TOKEN]] | الشيل بيحط قيمة المتغير مكانه. علامات التنصيص الدبل بتسمح بده |
| [[-d "url=..."]] | ابعت بيانات form. مجرد [[-d]] بيخلي curl يبعت POST لوحده |
| [[url=https://example.com/telegram/webhook]] | الـ URL اللي تيليجرام هيبعتله كل رسالة. HTTPS وبورت 443 أو 80 أو 88 أو 8443 بس |
| [[secret_token=...]] | كلمة سر انت بتختارها (حروف وأرقام و [[_]] و [[-]]، لحد ٢٥٦ حرف) |

تيليجرام بيرجّع [[secret_token]] ده مع كل طلب في header اسمه [[X-Telegram-Bot-Api-Secret-Token]]. سيرفرك يقارنه ويرد 401 لأي طلب من غيره، زي توقيع Paymob بالظبط.

الرد لو التوكن صح (من الـ docs):

~~~text الناتج
{"ok":true,"result":true,"description":"Webhook was set"}
~~~

ولو التوكن غلط، جربناه:

~~~text الناتج
{"ok":false,"error_code":401,"description":"Unauthorized"}
~~~

كل ردود الـ Bot API فيها [[ok]]: [[true]] يعني تمام، و [[false]] يبقى معاه [[error_code]] و [[description]].

---

## ٣. [[getWebhookInfo | jq .result]]

~~~bash
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getWebhookInfo" | jq .result
~~~

[[jq .result]]: هات خانة [[result]] بس من الرد. والرد فيه (من الـ docs):

| الخانة | معناها |
|---|---|
| [[url]] | الـ URL المتسجّل. فاضي = مفيش webhook (البوت على polling) |
| [[pending_update_count]] | رسايل وصلت تيليجرام ولسه موصلتش لسيرفرك. لازم تبقى 0 أو قريبة منه |
| [[last_error_date]] | آخر مرة فشل، كـ Unix time (ثواني من ١ يناير ١٩٧٠) |
| [[last_error_message]] | ليه فشل: [[Connection refused]] أو [[Wrong response from the webhook: 401 Unauthorized]] |

مع التوكن الوهمي [[jq .result]] طبع [[null]]، لأن الرد مفيهوش [[result]] أصلًا (فيه [[ok: false]]). فلو شفت [[null]]، شيل [[.result]] واقرا الرد كله.

---

## ٤. [[deleteWebhook?drop_pending_updates=true]]

- [[deleteWebhook]]: شيل الـ webhook. البوت يرجع يقدر يستخدم [[getUpdates]] (polling)، اللي بيرجع 409 طول ما فيه webhook.
- [[?drop_pending_updates=true]]: وارمي الرسايل المتراكمة، عشان البوت ميردش على كل رسايل امبارح مرة واحدة.

هنا البيانات في الـ URL نفسه ([[?]] query string) بدل [[-d]]. الـ Bot API بيقبل الطريقتين.

---

## على ويندوز

PowerShell مفيهوش [[source]]. ده بديل اشتغل في PowerShell 7 و 5.1 (بنفس التوكن الوهمي):

~~~powershell
Get-Content .env | ForEach-Object { $n, $v = $_ -split '=', 2; Set-Item "env:$n" $v }
curl.exe -sS "https://api.telegram.org/bot$env:TELEGRAM_BOT_TOKEN/getWebhookInfo"
~~~

- [[Get-Content .env]]: اقرا الملف سطر سطر.
- [[$_ -split '=', 2]]: قسّم السطر عند أول [[=]] بس (الـ 2 = جزئين بالكتير)، فلو القيمة فيها [[=]] متتقسمش.
- [[$n, $v = ...]]: الجزء الأول في [[$n]] والتاني في [[$v]].
- [[Set-Item "env:$n" $v]]: اعمل متغير بيئة بالاسم والقيمة دول.

~~~text الناتج
{"ok":false,"error_code":401,"description":"Unauthorized"}
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[source .env]] | التوكن والسر في متغيرات، مش في الـ history |
| [[setWebhook]] + [[url]] + [[secret_token]] | سجّل سيرفرك، وتيليجرام يبعت السر في header |
| [[getWebhookInfo]] | [[pending_update_count]] و [[last_error_message]]: أول حاجة لما البوت يسكت |
| [[deleteWebhook?drop_pending_updates=true]] | ارجع لـ polling وارمي القديم |

- [[pending_update_count]] بيزيد = سيرفرك مش بيرد 200.
- URL الـ tunnel بيتغير، فبعد كل تشغيل جديد لـ ngrok لازم [[setWebhook]] تاني.`,
          lines: [
            "حمّل التوكن والسر من .env من غير ما تكتبهم في الأمر.",
            "سجّل الـ URL والسر اللي هيرجع في header مع كل طلب.",
            "الحالة: الـ URL، والرسايل المتراكمة، وآخر خطأ.",
            "شيل الـ webhook (ارجع لـ polling) وارمي الرسايل القديمة."
          ],
          sol: R`[[setWebhook]] بيرد [[{"ok":true,"result":true,"description":"Webhook was set"}]]. ولما تبعت رسالة للبوت، سيرفرك بيستقبل POST فيه [[message.text]]، وتيليجرام بيبعت header [[X-Telegram-Bot-Api-Secret-Token]] بنفس الـ [[secret_token]].

[[getWebhookInfo | jq .result]] لو كله تمام: [[url]] بالرابط بتاعك، و [[pending_update_count: 0]]، ومفيش [[last_error_message]]. لو سيرفرك واقع أو رجّع حاجة غير 200: الرقم بيزيد مع كل رسالة، ويظهر [[last_error_date]] و [[last_error_message]] زي [[Wrong response from the webhook: 401 Unauthorized]] أو [[Connection refused]] أو [[502 Bad Gateway]] (لو ngrok وقف).

وخلي بالك إن ngrok المجاني بيغيّر الـ URL كل مرة، فلازم [[setWebhook]] تاني. و [[deleteWebhook?drop_pending_updates=true]] بيمسح الرسايل المتراكمة عشان البوت ما يرّدش على كل حاجة قديمة مرة واحدة.`
        }
      ]
    }
]);
