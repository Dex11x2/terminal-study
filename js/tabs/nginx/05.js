// ملف إضافي لتاب nginx: الحقول نفس شكلها في 01.js.

MORE("nginx", [
    {
      t: "كاش الـ proxy وتوزيع الحمل",
      l: 3,
      n: "Nginx يحفظ ردود التطبيق ويرجّعها من غير ما يسأله، ويوزّع الطلبات على كذا نسخة، ويلف حوالين النسخة الواقعة",
      items: [
        {
          cmd: "proxy_cache",
          title: "كاش لردود التطبيق نفسه",
          desc: R`[[proxy_cache]] بيخلي Nginx يحفظ رد التطبيق على الديسك ويرجّعه للطلبات الجاية من غير ما يسأل التطبيق. endpoint بياخد ثانية بقى بياخد أقل من ملّي ثانية، والتطبيق مش بيشوف الطلبات دي أصلًا.

ده غير درس «كاش الملفات الثابتة»: هناك بنقول للمتصفح يحفظ الملف عنده، هنا Nginx نفسه اللي بيحفظ رد الباك إند.`,
          example: R`proxy_cache_path /var/cache/nginx/api levels=1:2 keys_zone=api:10m max_size=1g inactive=60m use_temp_path=off;

server {
    listen 80;
    location /api/ {
        proxy_cache api;
        proxy_cache_valid 200 10s;
        proxy_cache_key $scheme$host$request_uri;
        add_header X-Cache-Status $upstream_cache_status always;
        proxy_pass http://app:3000;
    }
}`,
          flag: "script",
          try: R`ابعت نفس الطلب ٣ مرات ورا بعض واطبع الوقت والـ header: [[curl -s -o /dev/null -w "%{time_total} %header{x-cache-status}\n" http://127.0.0.1/api/products]]. استنى ١١ ثانية وابعته تاني. وبعدين ابعت [[/api/products?page=2]].`,
          deep: {
            why: R`صفحة المنتجات أو الـ homepage بتتطلب آلاف المرات، والرد هو هو لكل الناس لمدة دقايق. كل طلب منهم بيصحّي التطبيق ويسأل القاعدة. الكاش في Nginx بيخلي التطبيق يتعب مرة واحدة كل فترة، والباقي يتخدم من الديسك (والـ page cache بتاع لينكس، يعني من الرام عمليًا).`,
            how: R`[[proxy_cache_path]] (جوه http) بيعرّف مكان الكاش على الديسك ومنطقة في الرام اسمها [[keys_zone]] فيها المفاتيح. وفي الـ location: [[proxy_cache api]] شغّل الكاش ده، و [[proxy_cache_valid 200 10s]] الردود اللي status بتاعها 200 تفضل صالحة ١٠ ثواني.

كل رد بيتحفظ تحت «مفتاح» ([[proxy_cache_key]])، والطلب اللي ليه نفس المفتاح بياخد نفس الرد. [[$upstream_cache_status]] بيقولك حصل إيه: MISS (مش موجود، اتسأل التطبيق) و HIT (من الكاش) و EXPIRED (كان موجود وخلص وقته، فاتسأل التطبيق تاني).

Nginx بيحترم headers التطبيق: لو الرد فيه [[Set-Cookie]] أو [[Cache-Control: private]] أو [[no-store]] مش بيتحفظ (درس proxy_cache_bypass).`,
            when: R`endpoints للقراية بس والرد واحد لكل الزوار: قايمة منتجات، مقالات، إعدادات عامة، sitemap. حتى ١٠ ثواني بتفرق جامد تحت الضغط (اسمها microcaching).`,
            mistakes: R`تكاش صفحات فيها بيانات يوزر (درس proxy_cache_bypass). وتنسى [[X-Cache-Status]] فمتعرفش الكاش شغال ولا لأ. وتحط [[proxy_cache_valid]] طويلة من غير طريقة تمسح بيها (Nginx المجاني مفيهوش purge جاهز).`
          },
          teach: R`## الفكرة: Nginx يفتكر الرد بدل ما يسأل كل مرة

جربت المثال ده بـ [[nginx:alpine]] (nginx/1.31.6) جوه Docker، والتطبيق container تاني من [[node:24-alpine]] اسمه [[app]] على نفس الـ network. التطبيق بيستنى **ثانية كاملة** قبل ما يرد (عشان الفرق يبان)، وبيرجّع JSON فيه عدّاد [[n]] بيزيد مع كل طلب **وصله فعلًا**.

---

## ١. [[proxy_cache_path ...]]

السطر ده بيتكتب بره [[server]] (ملفات [[conf.d/*.conf]] بتتقرا جوه [[http]] أصلًا، فحطه أول الملف).

| الحتة | معناها |
|---|---|
| [[/var/cache/nginx/api]] | الفولدر اللي الردود هتتحفظ فيه كملفات |
| [[levels=1:2]] | قسّم الملفات على فولدرات فرعية: مستوى بحرف واحد وتحته مستوى بحرفين، عشان ميبقاش فيه مليون ملف في فولدر واحد |
| [[keys_zone=api:10m]] | منطقة في الرام اسمها [[api]] حجمها ١٠ ميجا فيها المفاتيح وبياناتها. الميجا بتشيل حوالي ٨ آلاف مفتاح |
| [[max_size=1g]] | لو الكاش عدّى ١ جيجا على الديسك، Nginx يمسح الأقدم استخدامًا |
| [[inactive=60m]] | أي رد محدش طلبه ٦٠ دقيقة يتمسح، حتى لو لسه صالح |
| [[use_temp_path=off]] | اكتب الملف في مكانه على طول بدل ما يتكتب في فولدر مؤقت ويتنقل |

## ٢. جوه [[location /api/]]

- [[proxy_cache api;]]: استخدم الكاش اللي اسمه api.
- [[proxy_cache_valid 200 10s;]]: الردود الـ 200 صالحة ١٠ ثواني. أي status مش مكتوب هنا (زي 500) **مش بيتحفظ**.
- [[proxy_cache_key $scheme$host$request_uri;]]: المفتاح = البروتوكول + الدومين + المسار بالـ query string. يعني [[/api/products]] و [[/api/products?page=2]] مفتاحين مختلفين.
- [[add_header X-Cache-Status $upstream_cache_status always;]]: رجّع في كل رد header بيقول الكاش عمل إيه. [[always]] يعني حتى مع ردود الأخطاء.

---

## ٣. التجربة

٣ طلبات ورا بعض، بطبع الـ status والوقت والـ header والـ body:

~~~text الناتج
200 1.015373s X-Cache-Status: MISS
{"path":"/api/products","n":1,"at":"18:38:58"}
200 0.000492s X-Cache-Status: HIT
{"path":"/api/products","n":1,"at":"18:38:58"}
200 0.000413s X-Cache-Status: HIT
{"path":"/api/products","n":1,"at":"18:38:58"}
~~~

- الأول **MISS**: Nginx ملقاش حاجة، سأل التطبيق، واستنى ثانية.
- التاني والتالت **HIT**: نص ملّي ثانية، و [[n]] لسه 1 و [[at]] نفس الوقت. يعني التطبيق ماشافهمش خالص.

استنيت ١١ ثانية وبعت تاني، وبعدين جربت [[?page=2]]:

~~~text الناتج
X-Cache-Status: EXPIRED
{"path":"/api/products","n":2,"at":"18:39:10"}
1.003390
X-Cache-Status: MISS        (لـ /api/products?page=2)
~~~

[[EXPIRED]] = كان موجود بس الـ ١٠ ثواني خلصوا، فسأل التطبيق تاني ([[n]] بقى 2) وأخد ثانية. و [[page=2]] مفتاح جديد فـ MISS.

---

## ٤. الكاش على الديسك شكله إيه

~~~text find /var/cache/nginx/api -type f
/var/cache/nginx/api/5/6d/be85adb656c14f3c86e8639ec6b496d5
/var/cache/nginx/api/8/8a/579767315462aab5457c04136516c8a8
~~~

اسم الملف هو **MD5** للمفتاح. اتأكدت:

~~~text الناتج
$ grep -a "^KEY" /var/cache/nginx/api/8/8a/5797...c8a8
KEY: http127.0.0.1/api/products
$ echo -n "http127.0.0.1/api/products" | md5sum
579767315462aab5457c04136516c8a8  -
~~~

والفولدرات من آخر الاسم: آخر حرف [[8]] هو المستوى الأول، والحرفين اللي قبله [[8a]] هو التاني. ده [[levels=1:2]].

> Nginx المجاني مفيهوش أمر يمسح رد واحد من الكاش (الـ purge في النسخة المدفوعة). عشان كده الكاش القصير (ثواني لدقايق) هو الآمن. ولو لازم تمسح كله: امسح محتوى الفولدر ([[rm -rf /var/cache/nginx/api/*]]) وNginx بيكمل عادي.

---

## الخلاصة

| القيمة | معناها |
|---|---|
| [[MISS]] | مش في الكاش، اتسأل التطبيق |
| [[HIT]] | من الكاش، التطبيق مشافوش |
| [[EXPIRED]] | كان موجود ووقته خلص، اتسأل التطبيق تاني |
| [[BYPASS]] | الكاش اتخطّى عمدًا (درس proxy_cache_bypass) |
| [[STALE]] و [[UPDATING]] | رد قديم اتبعت عن قصد (درس proxy_cache_use_stale) |

- [[proxy_cache_path]] بره، و [[proxy_cache]] + [[proxy_cache_valid]] جوه الـ location.
- المفتاح بيحدد مين ياخد نفس الرد. فكّر فيه كويس.
- حط [[X-Cache-Status]] دايمًا، وإلا مش هتعرف الكاش شغال.`,
          lines: [
            "مكان الكاش على الديسك ومنطقة المفاتيح في الرام (api، ١٠ ميجا)، وأقصى حجم ١ جيجا، واللي محدش طلبه ساعة يتمسح. بيتكتب في http.",
            "بلوك الموقع.",
            "بيسمع على بورت 80.",
            "كل اللي تحت /api/.",
            "شغّل الكاش اللي اسمه api.",
            "ردود الـ 200 صالحة ١٠ ثواني.",
            "المفتاح: البروتوكول والدومين والمسار بالـ query string.",
            "header بيقول HIT أو MISS أو EXPIRED، حتى في ردود الأخطاء.",
            "التطبيق اللي بنكاش ردوده.",
            "قفلة الـ location.",
            "قفلة الـ server."
          ],
          sol: R`أول طلب [[MISS]] وأخد حوالي ثانية (وقت التطبيق). التاني والتالت [[HIT]] في أقل من ملّي ثانية، والـ body فيه نفس [[n]] ونفس [[at]]: يعني التطبيق مشافهمش. بعد ١١ ثانية [[EXPIRED]] وثانية تاني، و [[n]] زاد. و [[?page=2]] أول مرة [[MISS]] لأن الـ query string جزء من المفتاح.

لو كله MISS دايمًا: يا إما التطبيق بيرجّع [[Set-Cookie]] أو [[Cache-Control: private]] أو [[no-store]] (Nginx بيحترمهم ومش بيحفظ)، يا إما الـ status مش 200 ومش مكتوب في [[proxy_cache_valid]]. شوف الـ headers بـ [[curl -sI]].`
        },
        {
          cmd: "proxy_cache_use_stale",
          title: "الكاش يشيل الموقع لما التطبيق يقع أو يزحم",
          desc: R`[[proxy_cache_use_stale]] بيخلي Nginx يرجّع آخر رد كان عنده (حتى لو وقته خلص) لما التطبيق واقع أو بيتحدّث. و [[proxy_cache_lock]] بيخلي طلب واحد بس يروح للتطبيق لما المفتاح مش موجود، والباقي يستنوه، بدل ما ١٠٠ طلب يضربوا التطبيق في نفس اللحظة.`,
          example: R`location /api/ {
    proxy_cache api;
    proxy_cache_valid 200 10s;
    proxy_cache_lock on;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    proxy_cache_background_update on;
    add_header X-Cache-Status $upstream_cache_status always;
    proxy_pass http://app:3000;
}`,
          flag: "script",
          try: R`ابعت ١٠ طلبات في نفس اللحظة لمفتاح جديد ([[for i in $(seq 10); do curl -s -o /dev/null -w "%header{x-cache-status}\n" http://127.0.0.1/api/stats & done; wait]]) وعدّ كام طلب وصل التطبيق في لوجه، مرة من غير [[proxy_cache_lock]] ومرة بيه. وبعدين وقّف التطبيق واستنى الكاش يخلص واطلب تاني.`,
          deep: {
            why: R`مشكلتين بيحصلوا للكاش تحت الضغط. الأولى: الكاش يخلص وقته، وفي نفس الثانية ٥٠٠ طلب يلاقوه منتهي فيروحوا كلهم للتطبيق (اسمها cache stampede أو thundering herd)، والتطبيق يقع. التانية: التطبيق يقع ٣٠ ثانية في deploy، والزوار يشوفوا 502 مع إن عندك رد كويس من دقيقة.`,
            how: R`[[proxy_cache_lock on]]: لو المفتاح مش في الكاش، أول طلب بس يروح للتطبيق، والباقي يستنوه. Nginx بيبص كل نص ثانية هل الرد وصل، فالمستنيين بياخدوا لحد نص ثانية زيادة. (والانتظار حده [[proxy_cache_lock_timeout]]، افتراضيًا ٥ ثواني، وبعدها بيروحوا للتطبيق.)

[[proxy_cache_use_stale]]: امتى مسموح ترجع رد قديم. [[error]] و [[timeout]] و [[http_502]]... لما التطبيق مش بيرد أو بيرد بخطأ. و [[updating]] لما فيه طلب تاني بيجيب النسخة الجديدة دلوقتي.

[[proxy_cache_background_update on]]: أول طلب بعد ما الوقت يخلص ياخد القديم فورًا، و Nginx يجيب الجديد في الخلفية (subrequest). محدش بيستنى.`,
            when: R`أي كاش على endpoint عليه ضغط. و [[use_stale error timeout]] حماية رخيصة وقت الـ deploy أو لما القاعدة تقع لحظة.`,
            mistakes: R`تفتكر إن [[use_stale]] بيرجّع حاجة لو الكاش فاضي: لأ، لو المفتاح عمره ما اتحفظ هتاخد 502 عادي. وتنسى إن [[inactive]] في [[proxy_cache_path]] بيمسح الرد القديم خالص، فالـ stale بيفضل متاح بس لحد ما يعدّي الوقت ده من غير طلبات.`
          },
          teach: R`## الفكرة: رد قديم أحسن من 502، وطلب واحد أحسن من ١٠٠

نفس المعمل بتاع درس [[proxy_cache]] (nginx/1.31.6 والتطبيق اللي بيستنى ثانية وبيعد الطلبات في [[n]]). عملت location تاني بالإعدادات بتاعة المثال، عشان أقارن نفس الطلب مع وبدون.

---

## ١. [[proxy_cache_lock on;]]: الزحمة على مفتاح جديد

### من غيره

١٠ طلبات في نفس اللحظة لمفتاح جديد. [[&]] في آخر الأمر بيشغّله في الخلفية فالعشرة بيطلعوا مع بعض، و [[wait]] بيستناهم:

~~~bash
for i in $(seq 10); do curl -s -o /dev/null -w "%{http_code} %header{x-cache-status}\n" http://127.0.0.1/api/stats & done; wait
docker logs app 2>&1 | grep -c "GET /api/stats"
~~~

~~~text الناتج
200 MISS   (x10)
10
~~~

العشرة MISS، والتطبيق استقبل **١٠ طلبات**. تخيل ده ٥٠٠ طلب على endpoint تقيل.

### معاه

~~~text الناتج
200 MISS 1.002875
200 HIT 1.501492
200 HIT 1.501750
... (8 كمان HIT حوالي 1.50)
1
~~~

التطبيق استقبل **طلب واحد**. الباقيين HIT بس كل واحد أخد ١.٥ ثانية مش ١: Nginx بيبص على القفل كل ٥٠٠ ملّي ثانية، فبيلاحظ إن الرد وصل في أول بصّة بعد الثانية، يعني عند ١.٥. ده التمن، وهو أرخص بكتير من إن التطبيق يقع.

---

## ٢. [[updating]] و [[proxy_cache_background_update on;]]: محدش يستنى التحديث

استنيت الكاش يخلص (١١ ثانية) وبعت ٣ طلبات ورا بعض، وبعد ثانية واحد كمان:

~~~text الناتج
{"path":"/api/stats2","n":11,"at":"18:39:56"}  STALE 0.000334
{"path":"/api/stats2","n":11,"at":"18:39:56"}  UPDATING 0.000312
{"path":"/api/stats2","n":11,"at":"18:39:56"}  UPDATING 0.000300
{"path":"/api/stats2","n":12,"at":"18:40:16"}  HIT 0.000426
~~~

| الطلب | حصل إيه |
|---|---|
| الأول [[STALE]] | الرد القديم في ثلث ملّي ثانية، و Nginx بعت طلب للتطبيق **في الخلفية** |
| التاني والتالت [[UPDATING]] | التحديث لسه شغال، فخدوا القديم برضه |
| الرابع [[HIT]] | التحديث خلص: [[n]] بقى 12 و [[at]] جديد |

من غير [[background_update]] كان أول طلب هيستنى الثانية بتاعة التطبيق.

---

## ٣. [[error timeout http_5xx]]: التطبيق واقع

خزّنت مفتاحين، واحد في location عادي وواحد في location المثال، ووقفت التطبيق (البورت بقى مقفول)، واستنيت ١١ ثانية:

~~~text الناتج
/api/     502 EXPIRED 0.000504
{"path":"/api/news","n":2,"at":"18:44:36"}
/locked/  200 STALE   0.000406
~~~

العادي رجّع **502** مع إن عنده الرد. والتاني رجّع آخر رد بـ **200** و [[STALE]]. وفي error.log:

~~~text error.log
connect() failed (111: Connection refused) while connecting to upstream, ... subrequest: "/locked/news", upstream: "http://172.18.0.2:3000/api/news"
~~~

[[subrequest]] ده التحديث اللي في الخلفية بيحاول ويفشل. الزائر ماحسش بحاجة.

> لو المفتاح عمره ما اتحفظ قبل كده، مفيش حاجة قديمة يرجّعها، فهتاخد 502 عادي. الـ stale بيحمي الصفحات اللي اتطلبت قبل كده بس.

---

## الخلاصة

| الإعداد | بيحل إيه |
|---|---|
| [[proxy_cache_lock on]] | ١٠٠ طلب على مفتاح جديد = طلب واحد للتطبيق (والباقي يستنوا لحد نص ثانية زيادة) |
| [[use_stale updating]] + [[background_update on]] | محدش يستنى التحديث، كله ياخد القديم لحد ما الجديد يوصل |
| [[use_stale error timeout http_502 ...]] | التطبيق واقع؟ رجّع آخر رد بدل 502 |`,
          lines: [
            "كل اللي تحت /api/.",
            "استخدم الكاش اللي اسمه api (متعرّف بـ proxy_cache_path في http).",
            "ردود الـ 200 صالحة ١٠ ثواني.",
            "لو المفتاح مش موجود، طلب واحد بس يروح للتطبيق والباقي يستنوه.",
            "رجّع الرد القديم لو التطبيق فشل أو اتأخر أو رجّع 5xx، أو لو فيه تحديث شغال.",
            "أول طلب بعد انتهاء الوقت ياخد القديم فورًا، والتحديث في الخلفية.",
            "header بيقول HIT أو STALE أو UPDATING.",
            "التطبيق.",
            "قفلة."
          ],
          sol: R`من غير [[proxy_cache_lock]]: العشر طلبات MISS والتطبيق سجّل ١٠ طلبات. بيه: واحد MISS وتسعة HIT، والتطبيق سجّل طلب واحد، بس الـ HIT أخدوا حوالي ١.٥ ثانية (Nginx بيبص على القفل كل نص ثانية).

ولما وقفت التطبيق واستنيت الكاش يخلص: الـ location اللي فيه [[proxy_cache_use_stale]] رجّع 200 و [[X-Cache-Status: STALE]] بآخر body، واللي من غيره رجّع 502. ولو طلبت مسار عمره ما اتطلب قبل كده هتاخد 502 في الاتنين، لأن مفيش نسخة قديمة.`
        },
        {
          cmd: "proxy_cache_bypass",
          title: "متكاش صفحة يوزر وتديها لغيره",
          desc: R`Nginx افتراضيًا بيتجاهل الـ cookie بتاعة الطلب: لو التطبيق رجّع صفحة فيها بيانات يوزر من غير header يمنع الكاش، اليوزر اللي بعده هياخدها. [[proxy_cache_bypass]] و [[proxy_no_cache]] بيخلوا أي طلب فيه session أو Authorization يعدّي على التطبيق ومايتحفظش.`,
          example: R`location /api/ {
    proxy_cache api;
    proxy_cache_valid 200 10m;
    proxy_cache_key $scheme$host$request_uri;
    proxy_cache_bypass $cookie_sid $http_authorization;
    proxy_no_cache     $cookie_sid $http_authorization;
    add_header X-Cache-Status $upstream_cache_status always;
    proxy_pass http://app:3000;
}`,
          flag: "script",
          try: R`من غير سطري bypass و no_cache: اطلب [[/api/dashboard]] بـ [[-H "Cookie: sid=ali"]] وبعدين بـ [[-H "Cookie: sid=mona"]]، وبص على اسم اليوزر في الرد. وبعدين ضيف السطرين وكرر.`,
          deep: {
            why: R`أخطر غلطة في الكاش: صفحة «حسابي» بتاعة يوزر تتحفظ وتتبعت للي بعده. ده تسريب بيانات حقيقي حصل لمواقع كبيرة. والسبب إن المفتاح الافتراضي مفيهوش الـ cookie، فالطلبين ليهم نفس المفتاح.`,
            how: R`Nginx **مش بيحفظ** الرد لو التطبيق قال كده: [[Set-Cookie]] في الرد، أو [[Cache-Control: private]] أو [[no-cache]] أو [[no-store]]. بس لو التطبيق نسي الـ header، Nginx مايعرفش إن الصفحة شخصية.

[[proxy_cache_bypass]]: لو أي متغير من اللي بعده مش فاضي ومش 0، متقراش من الكاش (روح للتطبيق). [[proxy_no_cache]]: نفس الشرط، ومتحفظش الرد. محتاج الاتنين: الأول لوحده بيخلي رد اليوزر يتحفظ ويتبعت للزوار، والتاني لوحده بيخلي اليوزر ياخد نسخة الزوار.

[[$cookie_sid]]: قيمة الـ cookie اللي اسمها sid (غيّر الاسم لاسم الـ session cookie عندك). [[$http_authorization]]: الـ header اللي فيه الـ token.`,
            when: R`أي كاش قدام تطبيق فيه تسجيل دخول. والأحسن كمان إن التطبيق يرجّع [[Cache-Control: private]] على كل رد شخصي، كحماية تانية.`,
            mistakes: R`[[proxy_ignore_headers Set-Cookie Cache-Control]] عشان «الكاش مش شغال»: كده بتلغي الحماية الوحيدة. وتحط [[$cookie_sid]] في المفتاح بدل الـ bypass: هيشتغل، بس كل يوزر هيبقى ليه نسخة على الديسك، والكاش هيتملي على الفاضي.`
          },
          teach: R`## الفكرة: المفتاح مفيهوش مين اللي طالب

عدّلت التطبيق في المعمل (nginx/1.31.6) يرجّع اسم اليوزر من الـ cookie اللي اسمها [[sid]] في حقل [[user]]، من غير أي header يمنع الكاش. وعملت location «ساذج» فيه كاش من غير السطرين، وجنبه location المثال.

---

## ١. المشكلة

~~~text الناتج (الكاش الساذج)
$ curl -s -H "Cookie: sid=ali"  http://127.0.0.1/naive/dashboard
{"path":"/api/dashboard","user":"ali","n":1,"at":"18:46:21"}  MISS
$ curl -s -H "Cookie: sid=mona" http://127.0.0.1/naive/dashboard
{"path":"/api/dashboard","user":"ali","n":1,"at":"18:46:21"}  HIT
$ curl -s http://127.0.0.1/naive/dashboard
{"path":"/api/dashboard","user":"ali","n":1,"at":"18:46:21"}  HIT
~~~

**mona شافت dashboard بتاع ali**، والزائر من غير تسجيل شافه كمان. Nginx شايف ٣ طلبات لنفس المفتاح.

وجربت كمان إن الطلب نفسه مالوش كلمة: [[curl -H "Cache-Control: no-cache"]] رجع **HIT**. Nginx بيتجاهل headers الكاش اللي جاية من الزائر.

---

## ٢. اللي Nginx بيعمله لوحده صح

~~~text الناتج
/api/me      (التطبيق بيرجّع Cache-Control: private)     MISS  MISS
/api/login   (التطبيق بيرجّع Set-Cookie: sid=abc123)     MISS  MISS
~~~

الاتنين MISS في كل مرة: Nginx مش بيحفظ رد فيه [[Set-Cookie]] أو [[private]]. يعني لو التطبيق بيقول، Nginx بيسمع. المشكلة في الصفحات اللي التطبيق نسي يقول عليها.

---

## ٣. السطرين

### [[proxy_cache_bypass $cookie_sid $http_authorization;]]

- [[$cookie_sid]]: Nginx بيعمل متغير لكل cookie: [[$cookie_]] + اسمها.
- [[$http_authorization]]: وبيعمل متغير لكل header: [[$http_]] + اسمه بحروف صغيرة و [[_]] مكان [[-]].
- المعنى: لو أي واحد فيهم ليه قيمة، **متقراش من الكاش**.

### [[proxy_no_cache $cookie_sid $http_authorization;]]

نفس الشرط، والمعنى: **متحفظش الرد** اللي جاي.

~~~text الناتج (بالسطرين)
Cookie: sid=ali    {"user":"ali","n":2}   BYPASS
Cookie: sid=mona   {"user":"mona","n":3}  BYPASS
(من غير cookie)     {"user":null,"n":4}    MISS
(من غير cookie)     {"user":null,"n":4}    HIT
Authorization: Bearer abc                 BYPASS
Cookie: theme=dark                        HIT
~~~

كل يوزر داخل شاف بياناته ([[BYPASS]] = الكاش اتخطّى عمدًا)، والزوار بس اللي اتكاشوا. والـ cookie التانية ([[theme]]) مش فارقة، لأن الشرط على [[sid]] بس.

### ليه الاتنين مع بعض؟

| اللي موجود | بيحصل إيه |
|---|---|
| [[bypass]] بس | ali بيعدّي على التطبيق، بس رده بيتحفظ، فالزائر اللي بعده ياخد صفحة ali |
| [[no_cache]] بس | رد ali مش بيتحفظ، بس ali نفسه ممكن ياخد نسخة الزوار من الكاش |
| الاتنين | ali دايمًا من التطبيق ومش بيتحفظ |

---

## ٤. تفريغ الكاش

الكاش بتاع المعمل فضل موجود بعد ريستارت Nginx (هو ملفات على الديسك)، فالتجربة الأولى ادتني ردود قديمة. اتأكد تفضيه وانت بتجرب: [[rm -rf /var/cache/nginx/api/*]].

---

## الخلاصة

- Nginx بيحترم [[Set-Cookie]] و [[Cache-Control: private/no-store]] اللي **من التطبيق**، وبيتجاهل الـ cookie و headers الكاش اللي **من الزائر**.
- [[proxy_cache_bypass]] = متقراش من الكاش، [[proxy_no_cache]] = متحفظش. استخدمهم مع بعض.
- الحماية التانية في الكود: [[Cache-Control: private]] على أي رد فيه بيانات يوزر.`,
          lines: [
            "كل اللي تحت /api/.",
            "استخدم الكاش اللي اسمه api.",
            "ردود الـ 200 صالحة ١٠ دقايق.",
            "المفتاح: البروتوكول والدومين والمسار بالـ query string. مفيهوش الـ cookie.",
            "لو الطلب فيه cookie اسمها sid أو header Authorization: روح للتطبيق ومتقراش من الكاش.",
            "ونفس الشرط: متحفظش الرد.",
            "header بيقول HIT أو MISS أو BYPASS.",
            "التطبيق.",
            "قفلة."
          ],
          sol: R`من غير السطرين: ali أخد [[MISS]] و [[user: ali]]، و mona أخدت [[HIT]] و [[user: ali]]، يعني شافت بيانات ali. بالسطرين: ali و mona [[BYPASS]] وكل واحد شاف اسمه، والطلب من غير cookie أخد [[MISS]] أول مرة و [[HIT]] بعدها.

لو حطيت [[proxy_cache_bypass]] من غير [[proxy_no_cache]]: رد ali بيتحفظ، والطلب الجاي من غير cookie هياخد صفحة ali. جربها وشوف [[user]] في الرد.`
        },
        {
          cmd: "least_conn",
          title: "توزيع الطلبات على كذا نسخة",
          desc: R`لما يبقى عندك كذا نسخة من التطبيق في [[upstream]]، Nginx بيوزّع بالدور (round robin) افتراضيًا. [[least_conn]] بيبعت للنسخة اللي عندها أقل طلبات شغالة، و [[weight]] بيدي نسخة نصيب أكبر، و [[ip_hash]] و [[hash]] بيثبتوا الزائر على نسخة واحدة. و [[zone]] لازم عشان الـ workers يشوفوا نفس العدّاد.`,
          example: R`upstream api {
    zone api 64k;
    least_conn;
    server app-a:3000;
    server app-b:3000;
    server app-c:3000;
}
# Other methods (one per upstream):
#   nothing                       round robin (default)
#   server app-a:3000 weight=3;   app-a gets 3x the requests
#   ip_hash;                      same client IP -> same server
#   hash $cookie_sid consistent;  same session -> same server
server {
    listen 80;
    location /api/ { proxy_pass http://api; }
}`,
          flag: "script",
          try: R`شغّل ٣ نسخ بترجّع اسمها، وابعت ١٠ طلبات ورا بعض بكل طريقة واكتب مين رد. وبعدين خلي نسخة منهم بطيئة (٣ ثواني) وابعت ١٢ طلب متداخلين مرة بـ round robin ومرة بـ least_conn، وقارن متوسط الوقت.`,
          deep: {
            why: R`نسخة واحدة من التطبيق بتشتغل على نواة واحدة (Node مثلًا)، أو بتقع فالموقع كله يقع. كذا نسخة ورا Nginx = استخدام كل الأنوية، و deploy من غير توقف. والسؤال: الطلب يروح لمين؟`,
            how: R`round robin (من غير ما تكتب حاجة): بالدور a ثم b ثم c. مناسب لو كل الطلبات شبه بعض.

[[least_conn]]: للنسخة اللي عندها أقل اتصالات مفتوحة دلوقتي. لو فيه طلبات تقيلة (تقرير، رفع ملف)، النسخة المشغولة متاخدش أكتر.

[[weight=3]]: نصيب أكبر لسيرفر أقوى. [[ip_hash]]: نفس الـ IP دايمًا لنفس النسخة (لو الـ session متخزنة في رام التطبيق). [[hash $cookie_sid consistent]]: نفس الفكرة بالـ session بدل الـ IP، و [[consistent]] معناها لو نسخة اتشالت، أغلب الزوار يفضلوا على نسختهم.

[[zone api 64k]]: Nginx فيه worker لكل نواة، وكل worker من غير zone ليه عدّاد لوحده. بالـ zone العدّاد في ذاكرة مشتركة.`,
            when: R`أي تطبيق بأكتر من نسخة (pm2 cluster، أو كذا container، أو كذا سيرفر). [[least_conn]] اختيار كويس افتراضي للـ APIs.`,
            mistakes: R`[[ip_hash]] وكل الزوار ورا Cloudflare: كلهم جايين من كام IP فيروحوا لنسخة واحدة. ونسيان [[zone]]، فالتوزيع يطلع غريب بعد كل reload (الكل على أول سيرفر). والحل الحقيقي للـ sessions: خزّنها في Redis أو القاعدة بدل التثبيت.`
          },
          teach: R`## الفكرة: مين ياخد الطلب الجاي؟

المعمل: nginx/1.31.6 و ٣ containers من نفس التطبيق اسمهم [[app-a]] و [[app-b]] و [[app-c]] على نفس الـ network، وكل واحد بيرجّع اسمه في الرد. وعملت upstream لكل طريقة، وطلبت ١٠ مرات ورا بعض.

---

## ١. التوزيع بكل طريقة

~~~text الناتج (مين رد على كل طلب)
round robin:  a b c a b c a b c a
weight=3 (a): a b a c a a b a c a
ip_hash:      c c c c c c c c c c
hash sid:     ali=a mona=c sara=c ali=a mona=c sara=c
~~~

| الطريقة | اللي حصل |
|---|---|
| round robin | بالدور بالظبط |
| [[weight=3]] على a | a أخد ٦ من ١٠ (٣ من كل ٥)، و b و c اتنين اتنين |
| [[ip_hash]] | كل الطلبات من نفس الـ IP (127.0.0.1) راحت لـ c |
| [[hash $cookie_sid consistent]] | كل اسم ثابت على نسخة: ali دايمًا a، و mona دايمًا c |

لاحظ إن الـ hash مش «عادل»: mona و sara وقعوا على نفس النسخة. مع آلاف الزوار بيتوزعوا قريب من التساوي.

---

## ٢. [[least_conn]]: لما نسخة تبقى بطيئة

خليت [[app-a]] يرد في ٣ ثواني والتانيين في ٥٠ ملّي ثانية (زي نسخة واقعة في GC أو شغالة على تقرير تقيل). بعت ١٢ طلب، كل واحد بعد اللي قبله بعُشر ثانية من غير ما أستنى الرد:

~~~text الناتج
rr: b c a b c a b c a b c a   avg 1.03s, slow 4
lc: c b c a b c b c b c b c   avg 0.30s, slow 1
~~~

- **round robin** بعت لـ a كل تالت طلب مهما كان مشغول: ٤ طلبات خدوا ٣ ثواني.
- **least_conn** بعت لـ a مرة، ولما لقاه لسه شغال (عنده اتصال مفتوح) بقى يبعت للتانيين. طلب واحد بس بطيء، والمتوسط نزل من ١ ثانية لـ ٠.٣.

---

## ٣. [[zone api 64k;]]: الفخ اللي محدش بيقولك عليه

قبل ما أضيف zone، عملت ريستارت لـ Nginx وطلبت ٩ مرات ورا بعض:

~~~text الناتج
a a a a a a a a a
~~~

كله راح لـ a! السبب: [[worker_processes auto]] في nginx.conf، والجهاز فيه ١٦ نواة، فيه ١٦ worker، وكل طلب جديد بيمسكه worker مختلف، وكل worker ليه عدّاد round robin لوحده بيبدأ من a. ضفت [[zone rr 64k;]] (ذاكرة مشتركة بين الـ workers ٦٤ كيلو) وريستارت:

~~~text الناتج
a b c a b c a b c
~~~

نفس المشكلة بتبوّظ [[least_conn]] (كل worker شايف اتصالاته هو بس) و [[max_fails]]. حط [[zone]] في أي upstream فيه أكتر من سيرفر.

---

## ٤. [[location /api/ { proxy_pass http://api; }]]

[[http://api]] هنا اسم الـ upstream مش دومين. Nginx بيدوّر الأول على upstream بالاسم ده.

---

## الخلاصة

| الطريقة | امتى |
|---|---|
| round robin | النسخ زي بعض والطلبات خفيفة |
| [[least_conn]] | فيه طلبات تقيلة أو نسخة ممكن تتزحم. اختيار كويس للـ API |
| [[weight]] | سيرفرات مختلفة القوة |
| [[ip_hash]] و [[hash ... consistent]] | محتاج الزائر يفضل على نفس النسخة (websocket، أو session في الرام) |
| [[zone]] | دايمًا، عشان العدّاد يبقى واحد لكل الـ workers |`,
          lines: [
            "مجموعة سيرفرات اسمها api.",
            "ذاكرة مشتركة ٦٤ كيلو عشان كل الـ workers يشوفوا نفس العدّادات.",
            "ابعت للنسخة اللي عندها أقل اتصالات مفتوحة.",
            "النسخة الأولى.",
            "التانية.",
            "التالتة.",
            "قفلة الـ upstream.",
            "بلوك الموقع.",
            "بيسمع على 80.",
            "كل اللي تحت /api/ يروح لمجموعة api (اسم الـ upstream مش دومين).",
            "قفلة."
          ],
          sol: R`ورا بعض: round robin [[a b c a b c...]]، و [[weight=3]] على a بيدّيه حوالي ٦ من ١٠، و [[ip_hash]] كله على نسخة واحدة لأن الـ IP واحد، و [[hash $cookie_sid]] كل اسم ثابت على نسخة.

ومع نسخة بطيئة (٣ ثواني): round robin طلّع ٤ طلبات بطيئة من ١٢ ومتوسط ١.٠٣ ثانية، و least_conn طلّع واحد بس ومتوسط ٠.٣٠.

ولو لقيت كل الطلبات رايحة لأول سيرفر بعد reload: ناقصك [[zone]]، وكل worker بيبدأ العد من الأول لوحده.`
        },
        {
          cmd: "proxy_next_upstream",
          title: "نسخة واقعة؟ جرّب اللي بعدها",
          desc: R`لو النسخة اللي اتبعتلها الطلب فشلت أو اتأخرت، [[proxy_next_upstream]] بيخلي Nginx يجرّب النسخة اللي بعدها والزائر مايحسش. و [[max_fails]] و [[fail_timeout]] بيشيلوا النسخة الواقعة من الدور شوية. بس Nginx مش بيعيد POST اتبعت فعلًا، عشان ميتنفذش مرتين.`,
          example: R`log_format up '$request -> $status upstream=[$upstream_addr] statuses=[$upstream_status] t=$request_time';

upstream api {
    zone api 64k;
    server app-a:3000 max_fails=2 fail_timeout=30s;
    server app-b:3000 max_fails=2 fail_timeout=30s;
    server app-c:3000 max_fails=2 fail_timeout=30s;
}

server {
    listen 80;
    access_log /var/log/nginx/up.log up;
    location /api/ {
        proxy_pass http://api;
        proxy_connect_timeout 2s;
        proxy_read_timeout 2s;
        proxy_next_upstream error timeout http_502 http_503;
        proxy_next_upstream_tries 2;
        add_header X-Upstream $upstream_addr always;
    }
}`,
          flag: "script",
          try: R`خلي نسخة من التلاتة متعلقة (بترد بعد ١٠ ثواني) وابعت ٣ GET و ٣ POST، وبص على الـ status والوقت و [[up.log]]. وبعدين ابعت ٦ GET كمان وشوف [[X-Upstream]].`,
          deep: {
            why: R`نسخة من التلاتة وقعت أو علّقت. من غير إعادة محاولة، كل تالت زائر هياخد 502 أو 504. Nginx يقدر يغطي ده لوحده: يجرب نسخة تانية، ويبطّل يبعت للواقعة شوية.`,
            how: R`[[proxy_next_upstream error timeout http_502 http_503]]: امتى تجرب اللي بعدها. الافتراضي [[error timeout]] بس. [[http_502]] و [[http_503]] لو التطبيق نفسه رجّعهم (زي نسخة بتقفل).

[[proxy_next_upstream_tries 2]]: أقصى عدد محاولات للطلب الواحد. من غيره Nginx ممكن يلف على كل النسخ، والطلب ياخد timeout × عدد النسخ.

[[max_fails=2 fail_timeout=30s]]: لو النسخة فشلت مرتين جوه ٣٠ ثانية، متتبعتلهاش طلبات ٣٠ ثانية. ده «passive health check»: بيتعلم من الطلبات الحقيقية. (الـ health check اللي بيسأل لوحده كل شوية في Nginx Plus المدفوع بس.)

الطلبات اللي مش idempotent (POST و PATCH و LOCK) مش بتتعاد لو كانت اتبعتت للتطبيق فعلًا، لأن ممكن تكون اتنفذت (طلب دفع اتعمل مرتين!). لو مفيش اتصال أصلًا (connection refused) بتتعاد عادي لأن التطبيق مشافهاش.`,
            when: R`أي upstream فيه أكتر من نسخة. ومع blue-green: درس «blue-green» في تاب Nginx بيستخدم [[backup]] للنسخة الاحتياطية.`,
            mistakes: R`[[proxy_read_timeout]] قصير على endpoint بطبيعته طويل (تقرير): Nginx يحسبه فشل ويعيد الطلب على نسخة تانية، والتقرير يتعمل مرتين. وإضافة [[non_idempotent]] لـ [[proxy_next_upstream]] من غير ما تكون متأكد إن الـ POST آمن يتكرر.`
          },
          teach: R`## الفكرة: الزائر مايحسش إن نسخة واقعة

المعمل: nginx/1.31.6 و ٣ نسخ من التطبيق. [[app-a]] و [[app-c]] بيردوا في ٥٠ ملّي ثانية، و [[app-b]] **متعلق**: بيستنى ١٠ ثواني قبل ما يرد (زي نسخة قافلة على القاعدة). و IPs النسخ: a = 172.18.0.4، و b = 172.18.0.5، و c = 172.18.0.6.

---

## ١. [[log_format up '...']]: لوج يوريك المحاولات

[[$upstream_addr]] فيه كل نسخة اتجربت للطلب، مفصولين بفاصلة. و [[$upstream_status]] الرد من كل واحدة. و [[$request_time]] الوقت الكلي. و [[access_log /var/log/nginx/up.log up;]] جوه الـ server بيستخدم الشكل ده.

## ٢. الـ timeouts

- [[proxy_connect_timeout 2s;]]: لو النسخة مش بترد على الاتصال نفسه في ثانيتين، فشل.
- [[proxy_read_timeout 2s;]]: لو اتصلنا ومفيش رد في ثانيتين، فشل. ده اللي هيمسك b.

## ٣. ٣ GET و ٣ POST

~~~text الناتج
GET 200 0.057086s
GET 200 2.059787s
GET 200 0.052154s
POST 200 0.052504s
POST 504 2.002785s
POST 200 0.051791s
~~~

~~~text up.log
GET /api/orders -> 200 upstream=[172.18.0.4:3000] statuses=[200] t=0.057
GET /api/orders -> 200 upstream=[172.18.0.5:3000, 172.18.0.6:3000] statuses=[504, 200] t=2.060
GET /api/orders -> 200 upstream=[172.18.0.6:3000] statuses=[200] t=0.052
POST /api/orders -> 200 upstream=[172.18.0.4:3000] statuses=[200] t=0.053
POST /api/orders -> 504 upstream=[172.18.0.5:3000] statuses=[504] t=2.002
POST /api/orders -> 200 upstream=[172.18.0.6:3000] statuses=[200] t=0.051
~~~

نقرا السطر التاني: الطلب راح لـ b (‎.5)، واستنى ثانيتين ([[proxy_read_timeout]])، ونسخة b اتحسبت [[504]]. Nginx راح لـ c (‎.6) وأخد 200. الزائر أخد **200** بعد ٢.٠٦ ثانية بدل 504.

والـ POST اللي وقع على b رجّع **504** ومتعادش: الطلب **اتبعت** لـ b، ويمكن b نفذه وهو بس بطيء في الرد. لو Nginx بعته لـ c كمان، الأوردر ممكن يتعمل مرتين.

> لو b كان قافل خالص (connection refused)، حتى الـ POST كان هيتعاد، لأن الطلب ماوصلش لحد.

## ٤. [[max_fails=2 fail_timeout=30s]]: شيلها من الدور

b فشلت مرتين (GET و POST) في أقل من ٣٠ ثانية. في error.log:

~~~text error.log
[warn] upstream server temporarily disabled while reading response header from upstream, ... request: "POST /api/orders HTTP/1.1"
~~~

وبعدها ٦ طلبات:

~~~text الناتج
200 0.051810s 172.18.0.4:3000
200 0.051802s 172.18.0.6:3000
200 0.051749s 172.18.0.4:3000
200 0.051871s 172.18.0.6:3000
200 0.051596s 172.18.0.4:3000
200 0.051570s 172.18.0.6:3000
~~~

b مش في الدور خالص، وكل طلب ٥٠ ملّي ثانية. بعد الـ ٣٠ ثانية Nginx هيجرب b بطلب واحد، لو نجح ترجع، لو فشل تتشال تاني.

## ٥. [[proxy_next_upstream_tries 2;]]

أقصى محاولتين للطلب. من غيره، لو نسختين متعلقين، الطلب كان هياخد ٢ + ٢ + ثانية تالتة. خلي الرقم صغير.

---

## الخلاصة

| الإعداد | بيعمل إيه |
|---|---|
| [[proxy_next_upstream error timeout http_502 http_503]] | امتى نجرب النسخة اللي بعدها |
| [[proxy_next_upstream_tries 2]] | أقصى محاولات للطلب |
| [[max_fails=2 fail_timeout=30s]] | فشلتين في ٣٠ ثانية = برّه الدور ٣٠ ثانية |
| [[$upstream_addr]] في اللوج | تشوف كل محاولة |
| POST اتبعت فعلًا | **مش بيتعاد**، والزائر ياخد الخطأ |`,
          lines: [
            "شكل لوج فيه كل النسخ اللي اتجربت وردودها والوقت (في http).",
            "مجموعة سيرفرات api.",
            "ذاكرة مشتركة عشان عدّاد الفشل يبقى واحد لكل الـ workers.",
            "نسخة a: فشلتين في ٣٠ ثانية = برّه الدور ٣٠ ثانية.",
            "نسخة b بنفس الشرط.",
            "نسخة c بنفس الشرط.",
            "قفلة الـ upstream.",
            "بلوك الموقع.",
            "بيسمع على 80.",
            "اللوج بالشكل اللي فوق.",
            "كل اللي تحت /api/.",
            "ابعت للمجموعة.",
            "ثانيتين للاتصال وإلا فشل.",
            "ثانيتين للرد وإلا فشل.",
            "لو فشل أو timeout أو 502/503 جرّب النسخة اللي بعدها.",
            "أقصى محاولتين للطلب الواحد.",
            "header بيقول مين رد (للتجربة).",
            "قفلة الـ location.",
            "قفلة الـ server."
          ],
          sol: R`الـ GET اللي وقع على النسخة المتعلقة أخد حوالي ثانيتين ورجع 200، وفي اللوج النسختين في [[$upstream_addr]] (‎.5 ثم ‎.6) والردود 504 ثم 200: اتجربت b وفشلت، ونجح على c. والـ POST اللي وقع على b رجّع 504 بعد ثانيتين ومتعادش، لأنه اتبعت لـ b فعلًا.

بعد الفشلتين: الـ ٦ طلبات راحوا لـ a و c بس (‎.4 و ‎.6) في ٥٠ ملّي ثانية، و error.log فيه [[upstream server temporarily disabled]].`
        }
      ]
    },
    {
      t: "أدوات الكونفيج: map و auth_request وصفحات الأخطاء",
      l: 2,
      n: "متغيرات محسوبة بدل if، وحماية مسارات بخدمة login بتاعتك، وصفحات خطأ بشكلك بدل صفحة Nginx",
      items: [
        {
          cmd: "map",
          title: "جدول بدل if: redirects ولوج وقرارات",
          desc: R`[[map]] بيعمل متغير جديد قيمته بتتحدد من متغير تاني بجدول. بيه تعمل جدول redirects (مئات الروابط القديمة)، ولوج للأخطاء بس، وتعرف البوتات، من غير سلسلة [[if]].`,
          example: R`map $uri $redirect_to {
    default            "";
    /old-about         /about;
    /blog/2023         /blog;
    ~^/p/(?<id>\d+)$   /products/$id;
}

map $status $loggable {
    ~^[23]   0;
    default  1;
}

map $http_user_agent $is_bot {
    default                  0;
    ~*(bot|crawler|spider)   1;
}

server {
    listen 80;
    access_log /var/log/nginx/errors-only.log combined if=$loggable;
    if ($redirect_to) {
        return 301 $redirect_to;
    }
    location / {
        add_header X-Bot $is_bot always;
        return 200 "ok\n";
    }
}`,
          flag: "script",
          try: R`اطلب [[/old-about]] و [[/p/42]] و [[/p/abc]] بـ [[curl -s -o /dev/null -w "%{http_code} %header{location}\n"]]. واطلب [[/]] بـ [[-A "Googlebot/2.1"]] وبص على [[X-Bot]]. وبعدين اطلب صفحة مش موجودة وبص على اللوج.`,
          deep: {
            why: R`نقلت الموقع لروابط جديدة وعندك ٣٠٠ رابط قديم في جوجل. ٣٠٠ [[location]] أو ٣٠٠ [[if]] صعب يتقروا وبطيئين. [[map]] جدول واحد، و Nginx بيدوّر فيه بسرعة (hash للقيم الثابتة).`,
            how: R`[[map $uri $redirect_to { ... }]]: «اعمل متغير [[$redirect_to]]، قيمته من [[$uri]] حسب الجدول». القيمة الثابتة بتتطابق بالظبط، واللي بتبدأ بـ [[~]] regex (و [[~*]] من غير فرق بين الحروف الكبيرة والصغيرة). و [[default]] لو مفيش تطابق.

[[(?<id>\d+)]] في الـ regex: «اقبض على أرقام وسمّيها id»، وبعدين [[$id]] في القيمة.

الـ map بيتكتب في http (بره server)، ومش بيتحسب غير لما حد يستخدم المتغير، فمالوش تمن لو مش مستخدم.

[[access_log ... if=$loggable]]: اكتب السطر بس لو المتغير مش 0 ومش فاضي.

[[if ($redirect_to)]]: لو المتغير مش فاضي. ده من الاستخدامات القليلة الآمنة لـ if: [[return]] جوه server. (الـ if جوه location مع أوامر تانية سلوكه غريب، والـ docs نفسها بتحذر منه.)`,
            when: R`جدول redirects بعد تغيير الروابط. لوج للأخطاء بس على موقع عليه ضغط. أي قرار حسب header (بوت، دولة، نسخة app). وجدول كبير؟ حطه في ملف لوحده و [[include]] جوه الـ map.`,
            mistakes: R`تكتب الـ map جوه server: [[nginx -t]] بيرفض. وتنسى إن الـ regex بيتجرب بالترتيب، فأول واحد يطابق هو اللي بيكسب. وتستخدم [[$request_uri]] في المفتاح وتستغرب إن [[/old-about?x=1]] مش بيتحوّل: [[$request_uri]] فيه الـ query string، و [[$uri]] من غيرها.`
          },
          teach: R`## الفكرة: متغير بيتحسب من جدول

اتجرب بـ nginx/1.31.6 في [[nginx:alpine]]، والملف كله في [[conf.d/default.conf]].

---

## ١. جدول الـ redirects

~~~text conf.d/default.conf
map $uri $redirect_to {
    default            "";
    /old-about         /about;
    /blog/2023         /blog;
    ~^/p/(?<id>\d+)$   /products/$id;
}
~~~

- [[map $uri $redirect_to]]: المدخل [[$uri]] (المسار من غير query string)، والناتج متغير جديد [[$redirect_to]].
- [[default "";]]: لو مفيش تطابق، فاضي.
- [[/old-about /about;]]: تطابق بالظبط.
- [[~^/p/(?<id>\d+)$ /products/$id;]]: الـ [[~]] معناها regex. [[^]] أول المسار و [[$]] آخره، و [[\d+]] رقم أو أكتر، و [[(?<id>...)]] اقبض عليه باسم [[id]].

واستخدامه في الـ server:

~~~text
if ($redirect_to) {
    return 301 $redirect_to;
}
~~~

لو المتغير مش فاضي، رد [[301]] (نقل دائم) على العنوان الجديد.

~~~text الناتج
/old-about -> 301 http://127.0.0.1/about
/blog/2023 -> 301 http://127.0.0.1/blog
/p/42 -> 301 http://127.0.0.1/products/42
/p/abc -> 200
/about -> 200
~~~

[[/p/abc]] مش أرقام فالـ regex ماطابقش، وراح لـ default. ولاحظ إن Nginx كمّل العنوان لوحده بالدومين ([[http://127.0.0.1/about]]).

---

## ٢. لوج للأخطاء بس

~~~text
map $status $loggable {
    ~^[23]   0;
    default  1;
}
~~~

[[$status]] كود الرد. السطر الأول regex معناه أي كود بيبدأ بـ 2 أو 3 (نجاح أو تحويل) قيمته 0. الباقي 1.

و [[access_log /var/log/nginx/errors-only.log combined if=$loggable;]]: [[combined]] شكل اللوج العادي، و [[if=]] اكتب بس لو القيمة مش 0. بعد كل الطلبات اللي فوق، وطلب لصفحة رجعت 404:

~~~text errors-only.log
127.0.0.1 - - [27/Oct/2026:18:51:57 +0000] "GET /missing HTTP/1.1" 404 153 "-" "curl/8.22.0"
~~~

سطر واحد بس. الـ 301 والـ 200 مااتكتبوش. على موقع بيستقبل ملايين الطلبات، اللوج بيبقى أصغر بكتير والأخطاء باينة.

---

## ٣. تعرف البوت

~~~text
map $http_user_agent $is_bot {
    default                  0;
    ~*(bot|crawler|spider)   1;
}
~~~

[[~*]] regex من غير فرق بين الكبير والصغير، و [[|]] يعني «أو». جوه [[location /]] حطيته في header عشان أشوفه:

~~~text الناتج
-A "Mozilla/5.0 (compatible; Googlebot/2.1)"   ->  X-Bot: 1
-A "Mozilla/5.0 Firefox/130"                   ->  X-Bot: 0
~~~

وتقدر تستخدم [[$is_bot]] في أي حتة: [[access_log ... if=]]، أو مفتاح rate limit، أو [[proxy_set_header]] للتطبيق.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[map A B { }]] | متغير B من A بجدول، في http |
| قيمة عادية | تطابق بالظبط |
| [[~]] و [[~*]] | regex، بفرق وبدون فرق بين الكبير والصغير |
| [[(?<name>...)]] | اقبض على حتة واستخدمها [[$name]] |
| [[default]] | لو مفيش تطابق |
| [[access_log ... if=$var]] | لوج بشرط |`,
          lines: [
            "جدول redirects: المدخل المسار، والناتج $redirect_to.",
            "لو مفيش تطابق: فاضي.",
            "رابط قديم لرابط جديد.",
            "كمان واحد.",
            "regex: /p/ ورقم يتحوّل لـ /products/ ونفس الرقم.",
            "قفلة.",
            "متغير $loggable من كود الرد.",
            "2xx و 3xx = 0 (متتكتبش).",
            "الباقي = 1.",
            "قفلة.",
            "متغير $is_bot من الـ User-Agent.",
            "افتراضيًا 0.",
            "لو فيه bot أو crawler أو spider بأي حروف = 1.",
            "قفلة.",
            "بلوك الموقع.",
            "بيسمع على 80.",
            "لوج للطلبات اللي $loggable بتاعها مش 0 بس.",
            "لو فيه redirect في الجدول...",
            "رد 301 على العنوان الجديد.",
            "قفلة الـ if.",
            "باقي الموقع.",
            "header فيه 1 أو 0 (للتجربة).",
            "رد ثابت ok.",
            "قفلة الـ location.",
            "قفلة الـ server."
          ],
          sol: R`[[/old-about]] رجّع [[301]] و [[Location: http://127.0.0.1/about]]، و [[/p/42]] رجّع 301 لـ [[/products/42]]، و [[/p/abc]] رجّع 200 لأن الـ regex عايز أرقام. والـ Googlebot أخد [[X-Bot: 1]] و Firefox أخد 0. واللوج فيه سطر الـ 404 بس.

لو [[nginx -t]] قال [[map directive is not allowed here]]: انت كاتبه جوه server. انقله فوق، بره أي server.`
        },
        {
          cmd: "auth_request",
          title: "احمي مسار بخدمة الـ login بتاعتك",
          desc: R`[[auth_request]] بيخلي Nginx يسأل endpoint في تطبيقك «الطلب ده مسموح؟» قبل ما يعدّيه. 2xx يعدّي، 401 أو 403 يترفض. كده تحمي أي حاجة ورا Nginx (لوحة admin، أداة داخلية، ملفات) بنفس تسجيل الدخول بتاع موقعك، حتى لو الأداة نفسها مفيهاش login.`,
          example: R`server {
    listen 80;
    location /admin/ {
        auth_request     /_auth;
        auth_request_set $auth_user $upstream_http_x_user;
        proxy_set_header X-User $auth_user;
        proxy_pass http://app:3000/api/;
    }
    location = /_auth {
        internal;
        proxy_pass              http://app:3000/auth/check;
        proxy_pass_request_body off;
        proxy_set_header        Content-Length "";
        proxy_set_header        X-Original-URI $request_uri;
    }
    error_page 401 = @login;
    location @login {
        return 302 /login?next=$request_uri;
    }
}`,
          flag: "script",
          try: R`اطلب [[/admin/stats]] من غير cookie، وبـ [[-H "Cookie: sid=mona"]]، وبـ [[-H "Cookie: sid=ali"]] (الـ endpoint بتاع الفحص بيقبل ali بس). وجرب تبعت [[-H "X-User: boss"]] مع ali وشوف التطبيق شاف مين.`,
          deep: {
            why: R`عندك Grafana أو أداة داخلية أو ملفات تقارير، ومش عايز تعمل login تاني ليها، أو هي أصلًا مفيهاش. بدل basic auth بباسورد مشترك، Nginx يسأل تطبيقك اللي عارف مين داخل.`,
            how: R`لكل طلب على [[/admin/]]، Nginx بيعمل subrequest لـ [[/_auth]]، اللي بيروح لـ [[/auth/check]] في التطبيق بنفس الـ headers والـ cookies. التطبيق يرد 200 (مسموح) أو 401 (مش داخل) أو 403 (داخل بس مش مسموح له).

[[internal]]: الـ location ده مايتطلبش من بره، بس من جوه Nginx (يرد 404 لو حد طلبه).

[[proxy_pass_request_body off]] و [[Content-Length ""]]: الفحص مش محتاج الـ body، فمتبعتهوش (لو حد بيرفع ملف ١٠٠ ميجا، مايتبعتش مرتين).

[[auth_request_set $auth_user $upstream_http_x_user]]: خد header [[X-User]] من رد الفحص في متغير، وابعته للتطبيق بـ [[proxy_set_header]]. وده بيكتب فوق أي [[X-User]] بعته الزائر.

[[error_page 401 = @login]]: لو الفحص قال 401، رد بـ redirect لصفحة الدخول بدل صفحة 401.`,
            when: R`أدوات داخلية ورا Nginx، وملفات محمية (فواتير PDF)، وأي خدمة عايز تحطها ورا نفس الـ login.`,
            mistakes: R`تنسى [[internal]] فأي حد يطلب [[/_auth]] مباشرة. وتنسى إن الفحص بيتعمل مع **كل** طلب (صور وملفات JS كمان)، فلازم يبقى سريع (من Redis أو JWT مش من query تقيلة). وتسيب [[next]] من غير ما التطبيق يتأكد إنه مسار جوه موقعك (open redirect).`
          },
          teach: R`## الفكرة: Nginx يسأل تطبيقك قبل ما يعدّي الطلب

المعمل: nginx/1.31.6 والتطبيق فيه endpoint [[/auth/check]] بيرد **200** مع header [[X-User: ali]] لو الـ cookie [[sid=ali]]، و **401** لأي حد تاني. وباقي التطبيق بيرجّع JSON فيه [[xuser]] = الـ header [[X-User]] اللي وصله.

---

## ١. [[location /admin/]]

- [[auth_request /_auth;]]: قبل ما تعمل أي حاجة، اسأل [[/_auth]]. لو 2xx كمّل، لو 401 أو 403 ارفض بنفس الكود.
- [[auth_request_set $auth_user $upstream_http_x_user;]]: [[$upstream_http_x_user]] هو header [[X-User]] في رد الفحص ([[$upstream_http_]] + اسم الـ header). احفظه في [[$auth_user]].
- [[proxy_set_header X-User $auth_user;]]: ابعته للتطبيق.
- [[proxy_pass http://app:3000/api/;]]: [[/admin/stats]] يروح لـ [[/api/stats]].

## ٢. [[location = /_auth]]

- [[=]] تطابق بالظبط.
- [[internal;]]: من بره بيرد 404. جربت [[curl http://127.0.0.1/_auth]] وطلع [[404]].
- [[proxy_pass http://app:3000/auth/check;]]: الفحص نفسه في التطبيق.
- [[proxy_pass_request_body off;]] و [[proxy_set_header Content-Length "";]]: من غير body.
- [[proxy_set_header X-Original-URI $request_uri;]]: قول للفحص الزائر كان طالب إيه، لو الصلاحية بتفرق حسب المسار.

## ٣. [[error_page 401 = @login;]]

[[@login]] location ليه اسم بس مالوش مسار (named location). [[=]] قبله معناها «خلي الكود اللي يطلع من @login هو الرد»، يعني 302 مش 401. و [[return 302 /login?next=$request_uri;]] بيحوّل لصفحة الدخول ومعاه المكان اللي كان رايحه.

---

## ٤. التجربة

~~~text من غير cookie
HTTP/1.1 302 Moved Temporarily
Location: http://127.0.0.1/login?next=/admin/stats?wait=0
~~~

~~~text Cookie: sid=mona
302 http://127.0.0.1/login?next=/admin/stats?wait=0
~~~

~~~text Cookie: sid=ali
{"path":"/api/stats","user":"ali","xuser":"ali", ...}
~~~

ولوج التطبيق بيوريك إن الفحص اتعمل قبل كل طلب، والطلب الحقيقي وصل مرة واحدة بس (لـ ali):

~~~text docker logs app
18:53:08 GET /auth/check cookie=-
18:53:08 GET /auth/check cookie=sid=mona
18:53:08 GET /auth/check cookie=sid=ali
18:53:08 GET /api/stats?wait=0 cookie=sid=ali
~~~

### محاولة تزوير

بعت ali ومعاه [[-H "X-User: boss"]]:

~~~text الناتج
{"path":"/api/stats","user":"ali","xuser":"ali", ...}
~~~

التطبيق شاف [[ali]]: [[proxy_set_header]] كتب فوق اللي الزائر بعته. ده المهم: التطبيق اللي ورا يثق في [[X-User]] لأن Nginx هو اللي حاططه.

> لاحظ إن [[next]] فيه [[?wait=0]] من غير encoding. صفحة الدخول لازم تقرا [[next]] بحذر وتتأكد إنه مسار جوه موقعك (بيبدأ بـ / واحدة) قبل ما تحوّل عليه.

---

## الخلاصة

| الرد من الفحص | Nginx بيعمل إيه |
|---|---|
| 2xx | يعدّي الطلب، وتقدر تاخد headers منه بـ [[auth_request_set]] |
| 401 | يرفض بـ 401، أو اللي تحدده بـ [[error_page 401]] |
| 403 | يرفض بـ 403 |
| أي حاجة تانية | 500 |`,
          lines: [
            "بلوك الموقع.",
            "بيسمع على 80.",
            "المسار المحمي.",
            "قبل أي حاجة اسأل /_auth.",
            "خد header X-User من رد الفحص في $auth_user.",
            "وابعته للتطبيق (فوق أي X-User بعته الزائر).",
            "التطبيق المحمي.",
            "قفلة.",
            "الفحص: المسار ده بالظبط.",
            "من جوه Nginx بس، من بره 404.",
            "endpoint الفحص في تطبيقك.",
            "متبعتش الـ body للفحص.",
            "ومتبعتش طوله.",
            "قول للفحص الزائر كان طالب إيه.",
            "قفلة.",
            "لو الفحص قال 401، روح لـ @login وخد الكود بتاعه.",
            "location باسم بس.",
            "حوّل لصفحة الدخول ومعاه المكان اللي كان رايحه.",
            "قفلة.",
            "قفلة الـ server."
          ],
          sol: R`من غير cookie و بـ [[sid=mona]]: [[302]] لـ [[/login?next=/admin/stats?wait=0]]. بـ [[sid=ali]]: الرد من التطبيق و [[xuser: ali]]. ومع [[X-User: boss]] برضه [[xuser: ali]]، لأن [[proxy_set_header]] بيكتب فوقه. ولوج التطبيق فيه [[GET /auth/check]] قبل كل طلب.

لو كل الطلبات بترجع 500: الفحص بيرجّع كود مش 2xx ولا 401 ولا 403 (مثلًا 404 لأن المسار غلط). شوف error.log.`
        },
        {
          cmd: "error_page",
          title: "صفحة خطأ بشكلك بدل صفحة Nginx",
          desc: R`[[error_page]] بيبدّل صفحة الخطأ الافتراضية (اللي فيها رقم نسخة Nginx) بصفحة من عندك: HTML للموقع، و JSON للـ API. و [[proxy_intercept_errors on]] بيخليه يبدّل كمان أخطاء التطبيق نفسه (زي 404 منه)، مش بس أخطاء Nginx.`,
          example: R`server {
    listen 80;
    server_tokens off;
    error_page 404 /errors/404.html;
    error_page 502 503 504 /errors/50x.html;
    location ^~ /errors/ {
        internal;
        root /usr/share/nginx;
    }
    location / {
        proxy_pass http://app:3000;
        proxy_intercept_errors on;
    }
    location /api/ {
        proxy_pass http://app:3000;
        error_page 502 503 504 = @api_down;
    }
    location @api_down {
        default_type application/json;
        return 503 '{"error":"service_unavailable","retry_after":30}\n';
    }
}`,
          flag: "script",
          try: R`حط ملفين [[404.html]] و [[50x.html]] في [[/usr/share/nginx/errors/]]. اطلب صفحة التطبيق بيرجّع لها 404 من الموقع ومن الـ API. وبعدين وقّف التطبيق واطلب [[/]] و [[/api/orders]] بـ [[curl -si]].`,
          deep: {
            why: R`لما التطبيق يقع وقت الـ deploy، الزائر بيشوف صفحة بيضا مكتوب فيها [[502 Bad Gateway]] و [[nginx/1.31.6]]: شكلها وحش، وبتقول للمهاجم نسختك بالظبط. والـ frontend اللي مستني JSON بيقع لما ياخد HTML.`,
            how: R`[[error_page 502 503 504 /errors/50x.html]]: لو الرد واحد من دول، اعمل redirect داخلي (الزائر مش شايفه) لـ [[/errors/50x.html]]، والكود يفضل زي ما هو (502).

[[location ^~ /errors/ { internal; root /usr/share/nginx; }]]: [[^~]] لو المسار بيبدأ بـ /errors/ خده من غير ما تجرب الـ regex locations. [[internal]] من بره 404. [[root]] الملف [[/usr/share/nginx/errors/50x.html]].

[[proxy_intercept_errors on]]: من غيره، أي خطأ **جاي من التطبيق** (404 أو 500) بيعدّي زي ما هو، و [[error_page]] بيشتغل بس على أخطاء Nginx نفسه (502 لما التطبيق واقع). معاه، ردود التطبيق اللي كودها 300 وأكتر واللي ليها [[error_page]] بتتبدّل.

[[error_page 502 503 504 = @api_down]]: الـ [[=]] معناها الكود ياخده من [[@api_down]] (503). و [[default_type application/json]] نوع الرد.`,
            when: R`أي موقع في الإنتاج. صفحة الصيانة بالذات: بتتعرض لوحدها كل ما التطبيق يقع.`,
            mistakes: R`[[proxy_intercept_errors on]] على الـ API: الـ 404 بتاعة [[{"error":"user not found"}]] تتحوّل HTML والـ frontend مايعرفش السبب. خليه للموقع بس. وتحط صفحة الخطأ في مكان بيحتاج التطبيق (هيفشل هو كمان). وتنسى [[internal]] فتتفهرس في جوجل.`
          },
          teach: R`## الفكرة: الخطأ بيحصل، بس يبان بشكلك

المعمل: nginx/1.31.6، والتطبيق بيرجّع **404 JSON** لأي مسار آخره [[/missing]]، وفولدر [[errors]] فيه ملفين HTML اتربطوا جوه الـ container على [[/usr/share/nginx/errors]].

### الأول: صفحة Nginx الافتراضية

Nginx من غير أي [[error_page]] والتطبيق واقف:

~~~text curl -si http://127.0.0.1/
HTTP/1.1 502 Bad Gateway
Server: nginx/1.31.6
Content-Type: text/html

<html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>nginx/1.31.6</center>
</body>
</html>
~~~

رقم النسخة في الـ header وفي الصفحة.

---

## ١. [[server_tokens off;]]

يشيل رقم النسخة: [[Server: nginx]] بس.

## ٢. [[error_page 404 /errors/404.html;]] و [[error_page 502 503 504 /errors/50x.html;]]

لو الرد واحد من الأكواد دي، Nginx بيجيب الملف ده ويرجّعه **بنفس الكود**. ده redirect داخلي، الزائر مش بيشوف [[/errors/...]] في العنوان.

## ٣. [[location ^~ /errors/ { internal; root /usr/share/nginx; }]]

- [[^~]]: درس «location ^~» في التاب: الـ prefix ده يكسب من غير ما الـ regex يتجرب.
- [[internal;]]: [[curl http://127.0.0.1/errors/404.html]] رجّع **404**. الملف مايتطلبش مباشرة.
- [[root /usr/share/nginx;]]: المسار + الـ root = [[/usr/share/nginx/errors/404.html]].

## ٤. [[location /]] و [[proxy_intercept_errors on;]]

~~~text الناتج والتطبيق شغال
/shop/missing  ->  <h1>الصفحة دي مش موجودة</h1>  [404]
~~~

التطبيق رجّع 404 JSON، و Nginx بدّله بالصفحة بتاعتك لأن [[proxy_intercept_errors]] شغال.

## ٥. [[location /api/]] من غير intercept

~~~text الناتج والتطبيق شغال
/api/missing  ->  {"error":"not found"}  [404]
~~~

الـ 404 بتاع التطبيق عدّى زي ما هو. ده الصح للـ API: الـ frontend محتاج الرسالة.

## ٦. التطبيق واقف

~~~text curl -si http://127.0.0.1/
HTTP/1.1 502 Bad Gateway
Server: nginx
Content-Type: text/html
Content-Length: 64

<h1>بنعمل صيانة، راجعين كمان شوية</h1>
~~~

~~~text curl -si http://127.0.0.1/api/orders
HTTP/1.1 503 Service Temporarily Unavailable
Server: nginx
Content-Type: application/json
Content-Length: 49

{"error":"service_unavailable","retry_after":30}
~~~

- الموقع: صفحتك، والكود لسه **502**، و [[Server: nginx]] من غير رقم.
- الـ API: [[error_page 502 503 504 = @api_down]]، والـ [[=]] خلت الكود **503** (اللي في [[return]])، و JSON بـ [[Content-Type: application/json]] من [[default_type]].

> الـ error_page اللي جوه [[location /api/]] بيلغي اللي في الـ server للـ location ده. كل مستوى بيورث من اللي فوقه **بس لو** مفيهوش error_page خالص.

---

## الخلاصة

| الإعداد | بيعمل إيه |
|---|---|
| [[error_page 502 /x.html]] | صفحتك بنفس الكود |
| [[error_page 502 = @name]] | الرد والكود من الـ named location |
| [[proxy_intercept_errors on]] | يبدّل كمان أخطاء التطبيق نفسه (للموقع، مش للـ API) |
| [[internal]] | صفحات الخطأ ماتتطلبش مباشرة |
| [[server_tokens off]] | من غير رقم النسخة |`,
          lines: [
            "بلوك الموقع.",
            "بيسمع على 80.",
            "شيل رقم النسخة من header Server ومن صفحات الخطأ.",
            "أي 404 يرجّع صفحتك.",
            "502 و 503 و 504 يرجّعوا صفحة الصيانة بنفس الكود.",
            "صفحات الأخطاء.",
            "من جوه Nginx بس.",
            "الملفات في /usr/share/nginx/errors/.",
            "قفلة.",
            "الموقع.",
            "للتطبيق.",
            "بدّل كمان أخطاء التطبيق (زي 404 منه) بصفحاتك.",
            "قفلة.",
            "الـ API.",
            "للتطبيق (وأخطاؤه بتعدّي زي ما هي).",
            "لو التطبيق واقع، روح لـ @api_down وخد الكود منه.",
            "قفلة.",
            "رد الـ API وهو واقع.",
            "نوع الرد JSON.",
            "503 و JSON فيه امتى يحاول تاني.",
            "قفلة.",
            "قفلة الـ server."
          ],
          sol: R`والتطبيق شغال: [[/shop/missing]] رجّع صفحتك 404 (التطبيق رجّع JSON و Nginx بدّله)، و [[/api/missing]] رجّع JSON التطبيق زي ما هو. ولما وقفت التطبيق: [[/]] رجّع [[502]] وصفحة الصيانة و [[Server: nginx]] من غير رقم، و [[/api/orders]] رجّع [[503]] و [[{"error":"service_unavailable","retry_after":30}]] بـ [[Content-Type: application/json]].

لو لسه شايف صفحة Nginx البيضا: الملف مش في المكان اللي [[root]] بيشاور عليه، و error.log فيه [[open() "/usr/share/nginx/errors/50x.html" failed (2: No such file or directory)]].`
        }
      ]
    }
]);
