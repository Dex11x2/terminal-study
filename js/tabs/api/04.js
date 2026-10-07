// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
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
SET user:7:name Mona
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
          teach: R`## Redis = قاموس كبير في الرام

كل حاجة في Redis عبارة عن **key** (اسم) و **value** (قيمة)، زي object في JavaScript بس عايش في process لوحده وكل السيرفرات بتاعتك بتكلمه. والمثال بيشغّل Redis، وبعدين بيكتب ويقرا مفاتيح ويشوف بتنتهي إمتى. كل الأوامر دي اتشغّلت على Redis 8.10 في Docker (الصورة [[redis:8-alpine]]) من Git Bash و PowerShell على ويندوز 11.

---

## ١. تشغيل Redis: [[docker run -d --name redis -p 6379:6379 redis:8-alpine]]

| الحتة | معناها |
|---|---|
| [[docker run]] | شغّل container جديد من صورة |
| [[-d]] | detached: في الخلفية، والترمنال يرجعلك |
| [[--name redis]] | اسم الـ container، عشان تكلمه بيه بعد كده ([[docker stop redis]]) |
| [[-p 6379:6379]] | البورت ٦٣٧٩ على جهازك يوصل للبورت ٦٣٧٩ جوه الـ container. الشمال جهازك، واليمين جوه |
| [[redis:8-alpine]] | الصورة: Redis نسخة 8، مبني على Alpine Linux (صغير) |

و ٦٣٧٩ هو البورت الافتراضي بتاع Redis. الأمر بيطبع id طويل للـ container وبس.

---

## ٢. [[redis-cli ping]]

[[redis-cli]] = Redis Command Line Interface، البرنامج اللي بيكلّم السيرفر. و [[ping]] أبسط أمر: «انت صاحي؟».

~~~text الناتج
PONG
~~~

> على ويندوز [[redis-cli]] مش متسطب لوحده (جرّبنا: PowerShell مش لاقيه). بس هو موجود جوه الـ container، فاكتب [[docker exec redis redis-cli ping]] بدل [[redis-cli ping]]، وللـ shell التفاعلي [[docker exec -it redis redis-cli]] ([[-it]] = interactive + terminal، عشان تكتب جواه). وده ينطبق على كل [[redis-cli]] في دروس Redis.

---

## ٣. [[redis-cli]] لوحده: الـ shell التفاعلي

من غير أمر بعده بيفتح prompt شكله [[127.0.0.1:6379>]] (العنوان والبورت اللي متصل بيهم)، وكل سطر بتكتبه أمر بيتنفّذ على طول. الأسطر الجاية كلها بتتكتب جواه. والأوامر مش case-sensitive ([[set]] زي [[SET]])، بس أسامي المفاتيح case-sensitive.

---

## ٤. [[SET otp:7 482913 EX 300]]

| الحتة | معناها |
|---|---|
| [[SET]] | اكتب قيمة |
| [[otp:7]] | اسم المفتاح: OTP (One-Time Password) بتاع اليوزر ٧ |
| [[482913]] | القيمة. كل حاجة في Redis بتتخزن كنص، حتى الأرقام |
| [[EX 300]] | EX = expire: امسحه لوحدك بعد ٣٠٠ ثانية (٥ دقايق) |

~~~text الناتج
OK
~~~

و [[:]] في الاسم مالهاش معنى عند Redis، هي اتفاق بين المبرمجين عشان المفاتيح تبقى مقروءة وتتدوّر بـ pattern: [[otp:*]] كل الـ OTPs، و [[user:7:*]] كل حاجات اليوزر ٧.

---

## ٥. [[TTL]]: فاضله قد إيه؟

TTL = Time To Live: عدد الثواني الباقية قبل ما المفتاح يتمسح. جرّبنا التلات حالات:

~~~text
TTL otp:7
(integer) 300
SET user:7:name Mona
OK
TTL user:7:name
(integer) -1
TTL nope
(integer) -2
~~~

| الرقم | معناه |
|---|---|
| رقم موجب | فاضل كذا ثانية |
| [[-1]] | المفتاح موجود بس **ملوش** وقت انتهاء (اتعمل بـ SET من غير EX) |
| [[-2]] | المفتاح **مش موجود** خالص (اتمسح أو عمره ما اتعمل) |

و [[(integer)]] ده redis-cli بيقولك نوع الرد: رقم. و [[(nil)]] معناها «مفيش قيمة».

ولما المدة تخلص: عملنا [[SET short 1 EX 1]] واستنينا ثانيتين:

~~~text
TTL short
(integer) -2
GET short
(nil)
~~~

---

## ٦. [[INCR views:post:1]]

INCR = increment: زوّد واحد ورجّع القيمة الجديدة. لو المفتاح مش موجود بيعتبره صفر، فأول مرة بيرجّع [[1]]:

~~~text الناتج (أول مرة ثم تاني مرة)
(integer) 1
(integer) 2
~~~

الأهم إنه **atomic**: Redis بينفّذ أمر واحد في المرة، فلو ١٠ سيرفرات عملوا INCR في نفس اللحظة الرقم هيزيد ١٠ بالظبط. لو كنت عملت GET وبعدين SET بالرقم الجديد من الكود، اتنين ممكن يقروا نفس الرقم وزيادة تضيع.

---

## ٧. [[SET lock:report 1 NX PX 10000]]

- [[NX]] = Not eXists: اكتب **بس لو** المفتاح مش موجود.
- [[PX 10000]] زي EX بس بالملّي ثانية: يتمسح بعد ١٠ ثواني.

جرّبناه مرتين ورا بعض:

~~~text
SET lock:report 1 NX PX 10000
OK
SET lock:report 1 NX PX 10000
(nil)
PTTL lock:report
(integer) 10000
~~~

الأولى [[OK]] (مسكت)، والتانية [[(nil)]] يعني «مكتبتش، فيه حد ماسك». و [[PTTL]] زي TTL بالملّي ثانية. ده أساس الـ lock اللي هنبنيه في درس [[connect-redis و lock]]: اللي ياخد OK بس هو اللي يشتغل.

---

## ٨. [[SCAN 0 MATCH user:* COUNT 100]]

- [[0]] الـ cursor: من فين تبدأ. أول مرة دايمًا 0.
- [[MATCH user:*]] المفاتيح اللي بتبدأ بـ [[user:]]. و [[*]] يعني «أي حاجة».
- [[COUNT 100]] تقريبًا كام مفتاح يبص عليهم في الدفعة دي (رقم تقريبي مش حد مضبوط).

~~~text الناتج
1) "0"
2) 1) "user:7:name"
~~~

الرد حتتين: (1) الـ cursor الجاي، و (2) المفاتيح اللي لقاها. الـ cursor رجع [[0]] يعني «خلصت اللفة». لو رجع رقم تاني، تبعته في SCAN الجاي وتكمّل. ليه كل اللفة دي بدل [[KEYS user:*]]؟ لأن KEYS بيلف على كل المفاتيح في أمر واحد، و Redis thread واحد، فكل الطلبات التانية بتستنى.

---

## ٩. [[UNLINK user:7:name]]

بيمسح المفتاح ويرجّع عدد اللي اتمسح:

~~~text الناتج (مرة، وبعدين نفس الأمر تاني)
(integer) 1
(integer) 0
~~~

الفرق عن [[DEL]]: المفتاح بيختفي فورًا في الحالتين، بس UNLINK بيحرر الذاكرة في الخلفية، فمسح قيمة ضخمة ميوقّفش السيرفر.

---

## ١٠. [[redis-cli --scan --pattern 'sess:*' | head]]

ده بيتكتب في ترمنال جهازك، مش جوه الـ shell التفاعلي:

- [[--scan]] بيعمل لفة SCAN كاملة لوحده (cursor ورا cursor لحد 0) ويطبع كل مفتاح في سطر.
- [[--pattern 'sess:*']] زي MATCH. و [[' ']] عشان الـ shell ميحاولش يفسر [[*]] كأسماء ملفات.
- [[| head]] خد أول ١٠ سطور بس.

~~~text الناتج (بعد ما عملنا sess:abc و sess:def)
sess:abc
sess:def
~~~

### على ويندوز

[[head]] مش موجود في PowerShell. جرّبنا ده في PowerShell 7 و Windows PowerShell 5.1 واشتغل:

~~~powershell
docker exec redis redis-cli --scan --pattern 'sess:*' | Select-Object -First 10
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[SET k v EX n]] | اكتب ويتمسح بعد n ثانية ([[PX]] بالملّي) |
| [[TTL k]] | الباقي: رقم، أو [[-1]] من غير انتهاء، أو [[-2]] مش موجود |
| [[INCR k]] | عداد atomic |
| [[SET k v NX PX n]] | اكتب بس لو فاضي (lock) |
| [[SCAN]] / [[--scan]] | دوّر على دفعات، مش [[KEYS]] |
| [[UNLINK k]] | امسح والذاكرة تتحرر في الخلفية |

- [[-1]] و [[-2]] أكتر حاجة بتتلخبط: [[-1]] موجود ودايم، [[-2]] مش موجود.
- [[SET]] من غير EX على مفتاح عليه TTL بيشيل الـ TTL (ده سؤال الـ «جرّب»).`,
          lines: [
            "شغّل Redis في Docker على البورت الافتراضي.",
            "اتأكد إنه شغال: لازم يرد PONG.",
            "افتح الـ shell التفاعلي.",
            "خزّن كود OTP يتمسح بعد ٥ دقايق.",
            "فاضله كام ثانية.",
            "key عادي من غير EX.",
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
          teach: R`## ٥ أنواع، وأول حرف في الأمر بيقولك النوع

الأوامر في المثال كلها بتتكتب جوه [[redis-cli]]، واتشغّلت على Redis 8.10 في Docker. لاحظ الحرف الأول: [[H]] للـ hash، و [[L]] للـ list، و [[S]] للـ set، و [[Z]] للـ sorted set، والـ string ملهاش حرف ([[SET]] و [[GET]]). ولو نسيت مفتاح نوعه إيه، [[TYPE key]] بيقولك (جرّبنا: [[TYPE user:7]] رجّع [[hash]]، و [[TYPE leaderboard]] رجّع [[zset]]).

---

## ١. string: [[SET product:1:v1 '{"id":1,"name":"Mug"}' EX 300]]

- القيمة JSON بين [[' ']] عشان redis-cli ياخدها حتة واحدة رغم المسافات والـ [[""]] اللي جواها.
- [[v1]] في آخر الاسم: نسخة شكل البيانات. لو غيّرت شكل الـ JSON بعد كده تخليه [[v2]]، فالكاش القديم ميتقريش غلط.
- [[EX 300]]: كاش لمدة ٥ دقايق.

~~~text GET product:1:v1
"{\"id\":1,\"name\":\"Mug\"}"
~~~

الـ [[\"]] دي redis-cli بيعرض بيها الـ [[""]] اللي جوه النص، القيمة نفسها JSON عادي. Redis مش فاهم إن ده JSON، بالنسباله نص وخلاص.

---

## ٢. hash: [[HSET user:7 name Mona plan pro credits 10]]

hash يعني object جوه المفتاح: حقول وقيم. بعد اسم المفتاح بتكتب أزواج [[field value]]:

| field | value |
|---|---|
| [[name]] | [[Mona]] |
| [[plan]] | [[pro]] |
| [[credits]] | [[10]] |

~~~text الناتج
(integer) 3
~~~

الـ [[3]] عدد الحقول **الجديدة** اللي اتضافت.

### [[HINCRBY user:7 credits -3]]

HINCRBY = Hash INCRement BY: زوّد حقل واحد بالرقم ده. والرقم سالب فبيقلّل:

~~~text الناتج
(integer) 7
~~~

ده الفرق عن JSON في string: عدّلت [[credits]] من غير ما تقرا الباقي ولا تكتبه، وفي أمر واحد atomic. و [[HGETALL user:7]] بيرجّع الكل كقايمة field ثم value:

~~~text HGETALL user:7
1) "name"
2) "Mona"
3) "plan"
4) "pro"
5) "credits"
6) "7"
~~~

وفي Redis 7.4 وما بعده جرّبنا TTL لحقل لوحده: [[HEXPIRE user:7 60 FIELDS 1 credits]] رجّع [[1]] (اتظبط)، و [[HTTL user:7 FIELDS 1 credits]] رجّع [[60]]. ([[FIELDS 1]] يعني «جاي بعدي حقل واحد».)

---

## ٣. list: [[LPUSH]] و [[LTRIM]] و [[LRANGE]]

- [[LPUSH recent:7 p3]]: L = Left، ضيف في **أول** القايمة. بيرجّع طول القايمة بعد الإضافة.
- [[LTRIM recent:7 0 9]]: سيب العناصر من index صفر لـ ٩ (أول ١٠) وامسح الباقي.
- [[LRANGE recent:7 0 -1]]: اقرا من صفر لآخر عنصر. و [[-1]] يعني «الأخير»، و [[-2]] اللي قبله، وهكذا.

جرّبنا [[LPUSH recent:7 p3]] وبعده [[LPUSH recent:7 p4 p5]]:

~~~text LRANGE recent:7 0 -1
1) "p5"
2) "p4"
3) "p3"
~~~

الأحدث الأول، لأن كل LPUSH بيحط في الأول. و LTRIM بعد كل LPUSH بيخلي القايمة متعدّيش ١٠ مهما اليوزر اتفرج.

---

## ٤. set: [[SADD online:2026-09-29 u1 u2 u1]]

set مجموعة من غير تكرار ومن غير ترتيب. ضفنا ٣ بس [[u1]] متكرر:

~~~text
SADD online:2026-09-29 u1 u2 u1
(integer) 2
SCARD online:2026-09-29
(integer) 2
~~~

[[SADD]] رجّع [[2]] = عدد اللي اتضافوا فعلًا. و [[SCARD]] (CARDinality = عدد العناصر) برضه [[2]]. والتاريخ في اسم المفتاح عشان كل يوم ليه set لوحده.

---

## ٥. sorted set: [[ZADD]] و [[ZINCRBY]] و [[ZREVRANGE]]

كل عنصر معاه **score** (رقم)، والعناصر دايمًا مترتبة بيه. في [[ZADD]] الـ score الأول وبعده العنصر:

~~~text
ZADD leaderboard 120 mona 300 ali 90 sara
(integer) 3
ZINCRBY leaderboard 50 sara
"140"
~~~

سارة كانت ٩٠ وبقت ١٤٠. و [[ZREVRANGE leaderboard 0 2 WITHSCORES]]: REV = reverse، من الأعلى للأقل، والعناصر من صفر لـ ٢ (أول ٣)، و [[WITHSCORES]] هات الـ score مع كل عنصر:

~~~text الناتج
1) "ali"
2) "300"
3) "sara"
4) "140"
5) "mona"
6) "120"
~~~

سارة طلعت فوق منى بعد الـ ٥٠ نقطة. ومن غير [[REV]] ([[ZRANGE]]) الترتيب من الأقل للأعلى.

---

## حل «جرّب»: sorted set والـ score هو الوقت

جرّبنا كود الحل: [[p1]] اتضاف مرتين بوقتين مختلفين. أول [[ZADD]] بيرجّع [[1]] (جديد)، والتالت بيرجّع [[0]] (العنصر موجود، الـ score بس اتحدّث). و [[ZREMRANGEBYRANK recent:z 0 -6]] بيمسح من أول عنصر (الأقدم) لحد السادس من الآخر، يعني يسيب آخر ٥ (هنا رجّع [[0]] لأن فيه عنصرين بس):

~~~text ZREVRANGE ... 0 -1
1) "p1"
2) "p2"
~~~

[[p1]] مرة واحدة وفي الأول لأنه الأحدث.

---

## الخلاصة

| النوع | أوامر | استخدامه |
|---|---|---|
| string | [[SET]] [[GET]] [[INCR]] | كاش JSON، عداد |
| hash | [[HSET]] [[HGET]] [[HINCRBY]] [[HGETALL]] | object بتعدّل حقوله لوحدها |
| list | [[LPUSH]] [[LTRIM]] [[LRANGE]] | آخر N حاجة بالترتيب |
| set | [[SADD]] [[SCARD]] [[SISMEMBER]] | من غير تكرار: مين أونلاين |
| sorted set | [[ZADD]] [[ZINCRBY]] [[ZREVRANGE]] | ترتيب بـ score: الأوائل، أو بالوقت |

- الأرقام اللي بترجع من الإضافة (HSET و SADD و ZADD) عدد العناصر **الجديدة**، مش الكل.
- [[0 -1]] في أي range يعني «من الأول للآخر»، وخلي بالك منه على مفتاح ضخم.`,
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
            mistakes: R`الإعدادات الافتراضية للكاش فوقعة Redis تعلّق كل الطلبات. ومفيش try/catch حوالين الكاش فخطأ Redis يبقى 500. وتعمل [[JSON.parse]] الأول وبعدين [[if (value)]]: لو القيمة المتكاشة [[0]] أو [[false]] أو [[""]] هتتعامل كأنها مش موجودة. اسأل على اللي راجع من Redis نفسه: [[hit !== null]]. وتكاش [[null]] (مش موجود) من غير ما تفكر: ده ممكن يبقى مفيد ضد طلبات كتير على id مش موجود، بس بـ TTL قصير. و [[new Redis()]] جوه الـ route فكل طلب اتصال جديد.`
          },
          teach: R`## ملف واحد فيه حاجتين: الاتصال، ودالة كاش

الملف بيعمل اتصال واحد بـ Redis للتطبيق كله، ومعاه دالة [[cached]]: «هات القيمة من Redis لو موجودة، وإلا هاتها من القاعدة واحفظها». والأهم إن أي مشكلة في Redis متوقّعش الطلب. جرّبناه على ويندوز 11 بـ Node 24 و ioredis 6.0 و Redis 8.10 في Docker، و [[config]] و [[logger]] جايين من ملفات المشروع (درس [[config.js بـ zod]] ودرس [[pino]]).

---

## ١. [[import { Redis } from "ioredis";]]

[[ioredis]] باكدج بتتسطب بـ [[npm i ioredis]]. و [[{ Redis }]] بين أقواس معناها named export: بتاخد حاجة اسمها [[Redis]] بالظبط من جوه الباكدج. ده كلاس (قالب بتعمل منه objects بـ [[new]]).

---

## ٢. [[new Redis(config.REDIS_URL, {...})]]

بيعمل client ويبدأ يتصل فورًا. الـ URL شكله [[redis://127.0.0.1:6379]] (أو [[redis://:password@host:6379]] لو فيه باسورد). والـ object التاني الإعدادات، وده قلب الدرس:

| الإعداد | الافتراضي | هنا | معناه |
|---|---|---|---|
| [[enableOfflineQueue]] | [[true]] | [[false]] | لو مفيش اتصال: افشل فورًا بدل ما تستنى في طابور |
| [[maxRetriesPerRequest]] | [[20]] | [[1]] | لو الاتصال اتقطع والأمر شغال، يتعاد مرة واحدة بس |
| [[connectTimeout]] | [[10000]] | [[2000]] | محاولة الاتصال متاخدش أكتر من ٢ ثانية (بالملّي ثانية) |
| [[commandTimeout]] | مفيش | [[500]] | أي أمر ياخد أكتر من نص ثانية يفشل |

و [[export const]]: [[const]] متغير مش هيتعاد تعيينه، و [[export]] عشان أي ملف تاني يعمل [[import { redis }]] وياخد **نفس** الـ client.

---

## ٣. [[redis.on("error", ...)]]

الـ client بيطلّع event اسمه [[error]] كل ما الاتصال يفشل. [[.on(اسم, دالة)]] معناها «لما الحدث ده يحصل نادي الدالة دي»، و [[(err) => ...]] دالة سهم بتاخد الخطأ. هنا بنسجّله warning بـ [[err.message]] بس (الرسالة من غير الـ stack الطويل). لما وقّفنا Redis طلع:

~~~text سطر اللوج
{"level":40,...,"err":"connect ECONNREFUSED 127.0.0.1:56390","msg":"redis error"}
~~~

[[level 40]] في pino يعني warn. و [[ECONNREFUSED]] = Connection Refused: مفيش حد بيسمع على البورت ده.

---

## ٤. [[export async function cached(key, ttlSec, load)]]

[[async]] يعني الدالة بترجّع promise وتقدر تستخدم [[await]] جواها. بتاخد ٣ حاجات:

- [[key]]: اسم المفتاح في Redis.
- [[ttlSec]]: مدة الكاش بالثواني (sec = seconds).
- [[load]]: **دالة** (مش قيمة) بتجيب الداتا من القاعدة. دالة عشان متتنادىش غير لو الكاش فاضي.

### الخطوة ١: اقرا من الكاش

~~~js
try {
  const hit = await redis.get(key);
  if (hit !== null) return JSON.parse(hit);
} catch (err) { logger.warn({ key, err: err.message }, "cache read skipped"); }
~~~

- [[redis.get(key)]] زي [[GET]] في redis-cli، بيرجّع النص أو [[null]] لو المفتاح مش موجود.
- [[hit !== null]]: [[!==]] «مش بيساوي» من غير تحويل أنواع. ده بالظبط معنى «المفتاح موجود». والغلطة الشائعة إنك تعمل [[JSON.parse]] الأول وتسأل [[if (value)]]: ساعتها لو القيمة المتكاشة [[0]] أو [[false]] (قيم falsy، يعني JavaScript بيعتبرها «لأ» في الشرط) هتتحسب كأن الكاش فاضي. جرّبنا: [[JSON.stringify(0)]] بيطلع النص [["0"]]، وده نص مش فاضي، فالسؤال على [[hit]] نفسه هو الصح.
- [[JSON.parse]] بيرجّع النص object.
- [[try/catch]]: لو Redis واقع أو بطيء، [[redis.get]] بيرمي خطأ، فبنسجّله ونكمّل للقاعدة بدل ما الطلب يقع بـ 500.

### الخطوة ٢: هات من القاعدة

[[const value = await load();]] برّه أي try: لو القاعدة نفسها فشلت، ده خطأ حقيقي ولازم يطلع لـ error middleware.

### الخطوة ٣: اكتب في الكاش

[[redis.set(key, JSON.stringify(value), "EX", ttlSec)]] = [[SET key value EX 300]]. ioredis بياخد كل كلمة من الأمر كـ argument. و [[JSON.stringify]] لأن Redis بيخزن نص. وبرضه جوه try: فشل الكتابة مش سبب يفشّل الطلب.

### الخطوة ٤: [[return value;]]

---

## ٥. السطر الأخير (comment): إزاي بتستخدمها

~~~js
const product = await cached($__btproduct:$__{id}:v1$__bt, 300, () => db.product.findUnique({ where: { id } }));
~~~

- [[$__btproduct:$__{id}:v1$__bt]] template string: [[$__{id}]] بيتحط مكانها قيمة [[id]]، فالمفتاح [[product:1:v1]].
- [[() => db.product...]] دالة من غير arguments، و [[cached]] هي اللي تقرر تناديها ولا لأ.

---

## ٦. تشغيل كود الحل: ٣ حالات

### Redis شغال

~~~text الناتج
0 61.2ms dbCalls=1
1 1.3ms dbCalls=1
2 1.2ms dbCalls=1
~~~

أول مرة من «القاعدة» (دالة بتستنى 50ms)، والمرتين التانيين من Redis في حوالي ١ms، و [[dbCalls]] فضل [[1]]. و [[performance.now()]] وقت بالملّي ثانية بكسور، و [[.toFixed(1)]] رقم عشري واحد.

### ملاحظة لقيناها: أول أمر خالص بيتخطى الكاش

حتى و Redis شغال، أول [[redis.get]] طلع معاه:

~~~text
"err":"Stream isn't writeable and enableOfflineQueue options is false","msg":"cache read skipped"
~~~

السبب إن السكربت بعت الأمر قبل ما الاتصال يخلص، ومع [[enableOfflineQueue: false]] مفيش طابور يستنى فيه. ده التمن المقصود: في سيرفر حقيقي الاتصال بيبقى جاهز قبل أول طلب بكتير، والأسوأ إن أول طلب يروح للقاعدة.

### Redis واقف

وجّهنا الـ URL لبورت مفيش عليه حاجة:

~~~text الناتج (من غير سطور اللوج)
0 58.4ms dbCalls=1
1 62.4ms dbCalls=2
2 63.6ms dbCalls=3
~~~

كل طلب راح القاعدة، ومع كل واحد سطرين warning ([[cache read skipped]] و [[cache write skipped]])، ومفيش ولا خطأ وصل للي نادى الدالة.

### Redis وقع ورجع والسكربت شغال

سكربت بيطلب كل نص ثانية، ووقّفنا الـ container في النص وشغّلناه تاني:

~~~text الناتج (مختصر)
5 1.5ms dbCalls=1 status=ready
6 61.9ms dbCalls=2 status=reconnecting
...
18 62.0ms dbCalls=14 status=reconnecting
READY event
19 62.6ms dbCalls=15 status=ready
20 2.0ms dbCalls=15 status=ready
~~~

[[redis.status]] بقى [[reconnecting]] والطلبات كملت من القاعدة، ولما Redis رجع ioredis اتصل لوحده (event [[ready]]) والكاش رجع يشتغل من غير restart. (الطلب ١٩ راح القاعدة لأن Redis الجديد كان فاضي.)

---

## الخلاصة

| الحتة | ليه |
|---|---|
| client واحد [[export]] | اتصال واحد للتطبيق كله |
| [[enableOfflineQueue: false]] + [[commandTimeout]] | Redis واقع أو بطيء = فشل سريع، مش طلب معلّق |
| [[on("error")]] | الأخطاء تتسجّل بدل «Unhandled error event» |
| [[try/catch]] حوالين الكاش بس | Redis يقع، الموقع لأ |
| [[hit !== null]] | القيم الفاضية تتحسب |

- الكاش تحسين: لو اختفى، التطبيق أبطأ بس مش واقع.
- الإعدادات دي للكاش بس. queue زي BullMQ محتاج العكس (يستنى وميضيّعش).`,
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
            "لقيته؟ رجّعه. ([[!== null]] يعني المفتاح موجود، حتى لو القيمة المتكاشة 0 أو false.)",
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
          teach: R`## جزئين: ٣ أوامر بتسأل، وملفين إعدادات

أول ٣ سطور أوامر بتسأل Redis شغال على إيه دلوقتي. والباقي سطور من [[redis.conf]] (ملف إعدادات Redis)، مش أوامر: نسخة لـ Redis كاش، ونسخة لـ Redis فيه queues و sessions. كله اتجرّب على Redis 8.10 في Docker، والملفين اتحمّلوا فعلًا بـ [[redis-server /conf/cache.conf]].

---

## ١. [[redis-cli CONFIG GET maxmemory-policy]]

[[CONFIG GET]] بيقرا إعداد من السيرفر وهو شغال. الرد سطرين: اسم الإعداد وقيمته:

~~~text الناتج (Redis جديد)
maxmemory-policy
noeviction
~~~

[[noeviction]] هو الافتراضي: eviction يعني «طرد»، فـ noeviction = «مبمسحش حاجة لوحدي».

---

## ٢. [[redis-cli INFO memory | grep -E "used_memory_human|maxmemory_human"]]

- [[INFO memory]] تقرير طويل عن الذاكرة، سطر لكل رقم بشكل [[name:value]].
- [[| grep -E "a|b"]]: خد السطور اللي فيها a **أو** b بس. [[-E]] = Extended regex، وفيها [[|]] معناها «أو».
- [[_human]]: نفس الرقم بوحدة مقروءة (M و G) بدل البايتات.

~~~text الناتج
used_memory_human:1.47M
maxmemory_human:0B
~~~

[[used_memory]] اللي Redis واكله فعلًا. و [[maxmemory]] [[0B]] يعني **مفيش حد**: هيفضل ياكل لحد ما رام الجهاز تخلص.

على ويندوز مفيش [[grep]]، وجرّبنا ده في PowerShell 7 و 5.1:

~~~powershell
docker exec redis redis-cli INFO memory | Select-String "used_memory_human|maxmemory_human"
~~~

---

## ٣. [[redis-cli INFO stats | grep evicted_keys]]

[[evicted_keys]] عدد المفاتيح اللي Redis مسحها لوحده عشان يعمل مكان، من ساعة ما السيرفر قام. على Redis جديد [[evicted_keys:0]]. لو الرقم ده بيزيد في الإنتاج، يبقى Redis بيمسح بيانات انت فاكرها موجودة.

---

## ٤. ملف الكاش

~~~text redis.conf لكاش بس
maxmemory 512mb
maxmemory-policy allkeys-lru
save ""
appendonly no
~~~

| السطر | معناه |
|---|---|
| [[maxmemory 512mb]] | متعدّيش ٥١٢ ميجا |
| [[maxmemory-policy allkeys-lru]] | لما توصل: امسح من **كل** المفاتيح ([[allkeys]]) الأقل استخدامًا مؤخرًا (LRU = Least Recently Used) |
| [[save ""]] | اقفل الـ RDB snapshots (صورة من الداتا على الديسك كل فترة) |
| [[appendonly no]] | واقفل الـ AOF (Append Only File: كل أمر كتابة يتسجّل في ملف) |

يعني Redis ده لو عمل restart يبدأ فاضي، وده مقبول للكاش لأن الداتا الأصلية في القاعدة.

---

## ٥. ملف الـ queues والـ sessions

~~~text redis.conf لـ BullMQ و sessions
maxmemory 1gb
maxmemory-policy noeviction
appendonly yes
appendfsync everysec
~~~

- [[noeviction]]: مهما حصل متمسحش حاجة. لو اتملى، ارفض الكتابة. ضياع job أسوأ من خطأ واضح.
- [[appendonly yes]]: كل أمر بيتكتب في ملف، وبعد restart Redis بيعيد قرايته.
- [[appendfsync everysec]]: fsync = «اجبر النظام يكتب على الديسك فعلًا». كل ثانية، فأقصى خسارة لو الجهاز وقع حوالي ثانية.

ولما حمّلنا الملف ده، [[CONFIG GET save]] رجّع [[3600 1 300 100 60 10000]]: الـ RDB الافتراضي لسه شغال جنب الـ AOF. الرقم ده أزواج «ثواني وعدد تغييرات»: snapshot كل ساعة لو فيه تغيير واحد، أو كل ٥ دقايق لو ١٠٠، أو كل دقيقة لو ١٠٠٠٠.

---

## ٦. التجربة (كود الحل): Redis بيتملى

### [[CONFIG SET maxmemory 2mb]] و [[allkeys-lru]]

[[CONFIG SET]] بيغيّر الإعداد وهو شغال من غير restart (ومن غير ما يتحفظ في الملف).

### سطر الـ loop

~~~bash
for i in $(seq 1 3000); do echo "SET junk:$i $(head -c 500 /dev/zero | tr '\0' x)"; done | redis-cli > /dev/null
~~~

من جوه لبرة:

1. [[head -c 500 /dev/zero]]: ٥٠٠ بايت أصفار ([[/dev/zero]] ملف بيطلّع أصفار للأبد، و [[-c]] = bytes).
2. [[| tr '\0' x]]: tr = translate، حوّل كل صفر لحرف [[x]]. فالقيمة ٥٠٠ حرف x.
3. [[$( ... )]]: نفّذ اللي جوه وحط ناتجه مكانه.
4. [[echo "SET junk:$i ..."]]: بيطبع أمر Redis كنص، و [[$i]] رقم اللفة.
5. [[for i in $(seq 1 3000); do ...; done]]: [[seq]] بيطلّع الأرقام من ١ لـ ٣٠٠٠، واللفة بتتكرر لكل رقم.
6. [[| redis-cli]]: كل الـ ٣٠٠٠ سطر داخلين redis-cli كأوامر.
7. [[> /dev/null]]: ارمي الردود (٣٠٠٠ OK).

ده bash، فشغّله في Git Bash أو جوه الـ container ([[docker exec redis sh -c '...']]، واحنا جرّبناه كده).

### النتيجة مع allkeys-lru

~~~text DBSIZE ثم evicted_keys
937
evicted_keys:2109
~~~

كتبنا ٣٠٠٠ والموجود [[937]] بس ([[DBSIZE]] = عدد المفاتيح). ليه مش ٣٠٠٠ × ٥٠٠ = ١.٥ ميجا تكفي؟ لأن كل مفتاح ليه تكلفة زيادة (الاسم، وهياكل Redis الداخلية) و Redis نفسه فاضي بياكل حوالي ١.٥ ميجا. وقبل التجربة كنا حاطين مفتاح [[keep:me]]: بعدها [[EXISTS keep:me]] رجّع [[0]]. اتمسح هو كمان، لأن allkeys معناها أي مفتاح.

### النتيجة مع noeviction

~~~bash
redis-cli CONFIG SET maxmemory-policy noeviction
for i in $(seq 1 300); do echo "SET more:$i ..."; done | redis-cli | grep -c OOM
~~~

~~~text الناتج
272
~~~

من ٣٠٠ كتابة، ٢٨ عدّوا (لسه كان فيه مكان صغير) و ٢٧٢ رجعوا خطأ ([[grep -c]] = عِد السطور بدل ما تطبعها). وأي كتابة بعدها:

~~~text الناتج
(error) OOM command not allowed when used memory > 'maxmemory'.
~~~

OOM = Out Of Memory. والقراية لسه شغالة، ومفيش مفتاح اتمسح. وفي الآخر [[CONFIG SET maxmemory 0]] يشيل الحد.

> لاحظ: لو عملت SET واحد صغير بعد ما تغيّر لـ noeviction على طول، ممكن يعدّي (جرّبنا وعدّى)، لأن الـ LRU كان لسه مفضّي مكان. عشان كده التجربة بتكتب ٣٠٠.

---

## الخلاصة

| | كاش | queues و sessions |
|---|---|---|
| [[maxmemory-policy]] | [[allkeys-lru]] | [[noeviction]] |
| لما يتملى | يمسح القديم ويكمّل | يرفض الكتابة بـ OOM |
| persistence | ولا حاجة (أو RDB بس) | [[appendonly yes]] + [[everysec]] |
| بعد restart | يبدأ فاضي، عادي | يرجع زي ما كان |

- [[maxmemory 0]] (الافتراضي) = مفيش حد.
- الاتنين يبقوا Redis منفصلين، لأن الـ policy على الـ instance كله.`,
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
for i in $(seq 1 300); do echo "SET more:$i $(head -c 500 /dev/zero | tr ' ' x)"; done | redis-cli | grep -c OOM
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
          teach: R`## حاجتين منفصلتين في نفس الملف

النص الأول بيخلي express-session يحفظ الـ sessions في Redis بدل ذاكرة الـ process. والنص التاني دالة [[withLock]]: «اشتغل بس لو محدش تاني شغال». جرّبنا الاتنين في سيرفر Express 5 على ويندوز 11 (Node 24، و connect-redis 10، و redis 6.3، و ioredis 6) و Redis 8.10 في Docker، وضفنا routes صغيرة للتجربة: [[POST /login]] بيحط [[userId]] في الـ session، و [[GET /me]] بيرجّعه أو 401، و [[POST /logout]].

---

## الجزء الأول: الـ sessions

### ١. الـ imports

~~~js
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
~~~

- [[express-session]]: الـ middleware نفسه (درس [[express-session]]). import من غير [[{}]] = الـ default export.
- [[{ RedisStore }]] من [[connect-redis]]: كلاس «store»، يعني المكان اللي express-session يكتب فيه ويقرا منه.
- [[{ createClient }]] من باكدج [[redis]] (اسمه node-redis): العميل الرسمي بتاع Redis. connect-redis مكتوب عليه هو، مش على ioredis.

### ٢. الـ client

~~~js
const sessionRedis = createClient({ url: config.REDIS_URL });
sessionRedis.on("error", (err) => logger.error({ err }, "session redis"));
await sessionRedis.connect();
~~~

- [[createClient]] بيعمل client **من غير** ما يتصل.
- [[on("error")]] زي ioredis: من غيره أي قطع في الاتصال بيبقى «unhandled error» يوقّع الـ process.
- [[await sessionRedis.connect()]]: هنا الاتصال بيحصل. [[await]] في أول الملف (top-level await) شغال في ES modules، فالسيرفر مش هيبدأ قبل ما Redis يبقى جاهز. وده الفرق عن ioredis اللي بيتصل لوحده.

### ٣. [[app.set("trust proxy", 1)]]

لو السيرفر ورا Nginx أو load balancer، الطلب بيوصل لـ Express كـ HTTP عادي. ده بيقوله «صدّق أول proxy قدامك» فيعرف إن الطلب الأصلي كان HTTPS، ومن غيره الكوكي الـ [[secure]] مش هتتبعت خالص.

### ٤. [[session({...})]]: كل خيار

| الخيار | القيمة | معناه |
|---|---|---|
| [[store]] | [[new RedisStore({ client, prefix: "sess:" })]] | احفظ في Redis، وكل مفتاح يبدأ بـ [[sess:]] |
| [[name]] | [[sid]] | اسم الكوكي (الافتراضي [[connect.sid]] بيفضح إنك Express) |
| [[secret]] | من config | بيوقّع الكوكي عشان محدش يزوّر id |
| [[resave]] | [[false]] | متكتبش الـ session تاني لو متغيرتش |
| [[saveUninitialized]] | [[false]] | زائر لسه محطّش حاجة في الـ session؟ متعملوش مفتاح |
| [[cookie.httpOnly]] | [[true]] | JavaScript في المتصفح ميقدرش يقراها |
| [[cookie.secure]] | في الإنتاج بس | تتبعت على HTTPS بس |
| [[cookie.sameSite]] | [["lax"]] | متتبعتش مع طلبات POST جاية من مواقع تانية |
| [[cookie.maxAge]] | [[7 * 24 * 3600 * 1000]] | عمرها بالملّي ثانية: ٧ أيام × ٢٤ ساعة × ٣٦٠٠ ثانية × ١٠٠٠ = ٦٠٤٨٠٠٠٠٠ |

### اللي حصل فعلًا

طلب عادي لـ [[/]] من غير login: مفيش [[Set-Cookie]]، و [[--scan --pattern 'sess:*']] رجّع صفر مفاتيح (ده [[saveUninitialized: false]]). وبعد [[curl -i -c jar.txt -X POST http://localhost:5855/login]]:

~~~text الناتج (headers مختصرة)
HTTP/1.1 200 OK
Set-Cookie: sid=s%3ARfHZyJdCeHBuZyh4vfrfuryPJ_y38v52.0u%2BtkYhOTJwxxg0hzfRR%2FjoVeTOnBI0pTm75ZbUmUq4; Path=/; Expires=Wed, 14 Oct 2026 08:14:07 GMT; HttpOnly; SameSite=Lax

{"ok":true}
~~~

([[-i]] اطبع الـ headers، و [[-c jar.txt]] احفظ الكوكي في ملف، و [[-b jar.txt]] ابعتها بعد كده.) قيمة الكوكي [[s:]] ثم الـ id ثم [[.]] ثم التوقيع ([[%3A]] هي [[:]] بعد الـ encoding). وفي Redis:

~~~text
sess:RfHZyJdCeHBuZyh4vfrfuryPJ_y38v52
TTL → 604799
GET → {"cookie":{"originalMaxAge":604800000,"expires":"2026-10-14T08:14:07.650Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"userId":7}
~~~

المفتاح = [[sess:]] + الـ id اللي في الكوكي. والـ TTL [[604799]] ثانية = أسبوع إلا ثانية: connect-redis حسبه من [[expires]] بتاع الكوكي. والقيمة JSON فيه الكوكي وكل اللي حطيته في [[req.session]].

ووقّفنا السيرفر (بالـ PID بتاعه) وشغّلناه تاني: [[/me]] بنفس الكوكي رجّع [[{"userId":7}]]، لأن الـ session في Redis مش في ذاكرة الـ process اللي ماتت. وبعد [[/logout]] ([[req.session.destroy]]): الرد فيه [[Set-Cookie: sid=; ... Expires=Thu, 01 Jan 1970]] (امسح الكوكي)، والمفتاح اختفى من Redis، و [[/me]] رجّع [[401 Unauthorized]].

---

## الجزء التاني: الـ lock

### ٥. الـ Lua script

~~~js
const RELEASE = 'if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end';
~~~

Lua لغة صغيرة Redis بيشغّلها جواه، والسكربت كله بيتنفّذ كأمر واحد (محدش يدخل في النص). بالعربي: «لو قيمة المفتاح لسه التوكن بتاعي، امسحه، وإلا رجّع 0». و [[KEYS]] قايمة المفاتيح اللي اتبعتت للسكربت، و [[ARGV]] قايمة القيم، و [1] يعني أول عنصر (Lua بتعد من ١ مش صفر).

### ٦. [[withLock(key, ttlMs, fn)]]

~~~js
const token = crypto.randomUUID();
~~~

[[crypto]] هنا الـ Web Crypto اللي موجود global في Node الحديث (من غير import)، و [[randomUUID()]] بيعمل id عشوائي زي [[098b0e9e-b66f-411a-bee6-ad882599e0a5]] (طلع كده عندنا). كل محاولة ليها توكن، عشان نعرف «الـ lock ده بتاعي أنا».

~~~js
if ((await redis.set(key, token, "PX", ttlMs, "NX")) !== "OK") return { skipped: true };
~~~

ده [[SET key token PX 10000 NX]] من درس [[redis-cli]]. الـ [[redis]] هنا client الـ ioredis بتاع الكاش. بيرجّع [[OK]] لو مسكنا، و [[null]] لو حد تاني ماسك، فبنرجّع [[{ skipped: true }]] من غير ما نشتغل.

~~~js
try { return { value: await fn() }; }
finally { await redis.eval(RELEASE, 1, key, token); }
~~~

- [[try]] نفّذ الشغل ورجّع نتيجته جوه [[{ value }]].
- [[finally]] بيتنفّذ **في كل الأحوال**: نجح الشغل أو رمى خطأ. فالـ lock بيتفك دايمًا.
- [[redis.eval(script, 1, key, token)]]: شغّل السكربت. الرقم [[1]] معناه «أول argument بعدي مفتاح» (يروح KEYS)، والباقي يروح ARGV.

### تشغيل كود الحل

٣ نداءات مع بعض بـ [[Promise.all]] على نفس المفتاح، والشغل بياخد ٢٠٠ms:

~~~text الناتج
[ { value: 'A did it' }, { skipped: true }, { skipped: true } ]
0
~~~

A مسك الأول، و B و C لقوه مقفول فاتخطوا. و [[redis.exists]] رجّع [[0]]: الـ [[finally]] فك الـ lock بعد ما A خلص.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[RedisStore]] + client من [[redis]] | الـ sessions تفضل بعد restart وتتشارك بين النسخ |
| TTL المفتاح = [[maxAge]] الكوكي | Redis بيمسح المنتهي لوحده |
| [[resave: false]] و [[saveUninitialized: false]] | مفيش كتابة ومفاتيح على الفاضي |
| [[SET ... NX PX]] | واحد بس يمسك، ويتفك لوحده لو الـ process مات |
| توكن + Lua في [[finally]] | متفكّش lock حد تاني |

- connect-redis عايز client من [[redis]] (node-redis)، والكاش و الـ lock ممكن يفضلوا على ioredis.`,
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
import { Redis } from "ioredis";

const rlRedis = new Redis(config.REDIS_URL, { maxRetriesPerRequest: 1, commandTimeout: 500 });
rlRedis.on("error", (err) => logger.warn({ err: err.message }, "rate-limit redis"));
const redisStore = (prefix) => new RedisStore({ prefix, sendCommand: (command, ...args) => rlRedis.call(command, ...args) });

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
            how: R`[[sendCommand]] هو الجسر: rate-limit-redis بيبعت أوامره (Lua scripts صغيرة بتزوّد العداد وترجّع الـ TTL) عن طريق الدالة دي. مع ioredis [[redis.call(command, ...args)]]، ومع node-redis [[client.sendCommand(args)]]. و [[prefix]] مختلف لكل limiter: كل limiter لازم يبقى ليه store instance لوحده (express-rate-limit بيطبع ValidationError في اللوج لو نفس الـ store اتدّى لاتنين)، عشان كده دالة [[redisStore(prefix)]].

[[keyGenerator]]: لو رجّعت الـ IP بنفسك لازم يعدّي على [[ipKeyGenerator]]، اللي بيجمع عناوين IPv6 في subnet واحد (افتراضيًا /56) عشان حد عنده ملايين العناوين ميلفّش. ولو كتبت [[req.ip]] مباشرة، النسخة الحالية بتطبع ValidationError في اللوج بيقولك كده (جربناها)، ومبتوقّفش السيرفر، فبص على اللوج. ولو الطلب فيه يوزر مسجّل، [[user:$__{req.user.id}]] أعدل من الـ IP.

[[limit]] كدالة بتاخد الطلب، فالباقة تحدد الحد. والـ middleware اللي بيقرا الـ API key ويحط [[req.apiKey]] لازم يبقى قبل الـ limiter.

الـ headers: [[standardHeaders: "draft-8"]] بيبعت [[RateLimit-Policy: "public"; q=60; w=60; pk=:...:]] (الحصة والنافذة بالثواني، و pk hash للمفتاح) و [[RateLimit: "public"; r=59; t=60]] (الباقي والثواني لحد التصفير)، و [[identifier]] هو الاسم اللي بيظهر فيهم. ومع 429 بيبعت [[Retry-After]]. العميل الكويس يقرا دول ويبطّأ لوحده بدل ما يخبط.

[[passOnStoreError]]: لو Redis وقع، تسمح بالطلبات ولا ترفضها؟ للـ API العام [[true]] (متوقّفش الموقع عشان الـ limiter)، وللـ login ممكن [[false]] (ترفض أحسن من إنك تفتح باب التخمين). ده قرار لازم تاخده صريح.

وفيه algorithms تانية (token bucket و sliding window) وحصص شهرية لكل key، ودي في تاب «APIs متقدمة».`,
            when: "أول ما يبقى عندك أكتر من نسخة، أو API key لشركاء، أو endpoint بتدفع على كل طلب فيه.",
            mistakes: R`[[rate-limit-redis]] متسطّب والـ limiter من غير [[store]]، فهو لسه في الذاكرة (حصلت في مشروع حقيقي، درس [[express-rate-limit]]). ونفس الـ store لـ limiterين. و [[keyGenerator: (req) => req.ip]] من غير ipKeyGenerator. والـ limiter قبل الـ middleware اللي بيقرا الـ API key، فكله بيتعد بالـ IP. و Redis الـ rate limit بـ allkeys-lru تحت ضغط، فالعدادات بتتمسح والحد بيتلغي من غير ما حد يعرف. وتدّي الـ store الـ client بتاع الكاش اللي فيه [[enableOfflineQueue: false]] (درس [[ioredis]]): الـ store بيحمّل الـ Lua script أول ما الـ limiter يتعمل، قبل ما الاتصال يجهز، فالتحميل بيفشل والـ limiter بيفضل مقفول لحد restart (جربناها: كل الطلبات عدّت ومفيش ولا 429، واللوج فيه [[async error during store initialization]]).`
          },
          teach: R`## limiterين، وعدّادهم في Redis

الملف بيعمل اتنين middleware: [[publicApiLimiter]] للـ API العام (حد في الدقيقة حسب الباقة)، و [[loginLimiter]] لتسجيل الدخول (١٠ محاولات فاشلة في ربع ساعة). الاتنين بيعدّوا في Redis فكل نسخ السيرفر شايفة نفس العداد. جرّبناه على ويندوز 11 بـ Node 24 و express-rate-limit 8.7 و rate-limit-redis 6.0 و ioredis 6 و Redis 8.10 في Docker، و [[config]] و [[logger]] من ملفات المشروع.

---

## ١. الـ imports

- [[{ rateLimit, ipKeyGenerator }]] من [[express-rate-limit]]: الأولى بتعمل الـ middleware، والتانية بتجهّز الـ IP للعد (تحت).
- [[{ RedisStore }]] من [[rate-limit-redis]]: مكان العد. من غيره express-rate-limit بيعد في ذاكرة الـ process.
- [[{ Redis }]] من [[ioredis]].

---

## ٢. client لوحده للـ rate limit

~~~js
const rlRedis = new Redis(config.REDIS_URL, { maxRetriesPerRequest: 1, commandTimeout: 500 });
~~~

ليه مش نفس client الكاش بتاع درس [[ioredis]]؟ لأن ده فيه [[enableOfflineQueue: false]]. والـ RedisStore أول ما يتعمل بيبعت أمر [[SCRIPT LOAD]] (بيحمّل Lua script في Redis). الأمر ده بيتبعت والاتصال لسه مخلصش، فمع offline queue مقفول بيفشل فورًا، والـ store مبيحاولش تاني. جرّبناها: ٣ طلبات ورا بعض والحد ٢، والتلاتة رجعوا 200، واللوج:

~~~text اللوج
express-rate-limit: async error during store initialization. Error: Stream isn't writeable and enableOfflineQueue options is false
express-rate-limit: error from store, allowing request without rate-limiting. ...
~~~

فهنا سايبين الطابور الافتراضي (الأمر يستنى الاتصال)، و [[commandTimeout: 500]] عشان لو Redis وقع بعدين الطلب ميعلّقش. جرّبنا ده: لما وقّفنا Redis، طلب الـ API العام عدّى 200 في حوالي نص ثانية، والـ login رجع 500 في نص ثانية، ولما Redis رجع الـ limiter رجع يعد ويرجّع 429 من غير restart.

> لو Redis واقع **ساعة** ما السيرفر بيقوم، تحميل الـ script بيفشل والـ limiter بيفضل مقفول لحد restart (جرّبناها). فخلي السيرفر يقوم بعد Redis، أو اعمل له restart لو Redis كان واقع.

---

## ٣. [[redisStore(prefix)]]

~~~js
const redisStore = (prefix) => new RedisStore({ prefix, sendCommand: (command, ...args) => rlRedis.call(command, ...args) });
~~~

- دالة سهم بتاخد [[prefix]] وبترجّع store جديد. ليه دالة؟ لأن كل limiter لازم ياخد store instance لوحده.
- [[{ prefix, ... }]]: اختصار [[prefix: prefix]].
- [[sendCommand]]: rate-limit-redis مش مربوط بمكتبة معينة، فبتدّيله دالة «ابعت الأمر ده». [[(command, ...args)]]: [[...args]] (rest) بتلم باقي الـ arguments في array. و [[rlRedis.call(command, ...args)]] بيبعت أي أمر Redis بالاسم، و [[...args]] هنا (spread) بتفرد الـ array تاني.

---

## ٤. [[publicApiLimiter]]: كل خيار

| الخيار | القيمة | معناه |
|---|---|---|
| [[windowMs]] | [[60_000]] | النافذة: ٦٠ ألف ملّي ثانية = دقيقة. [[_]] فاصل للقراية بس |
| [[limit]] | دالة | الحد لكل نافذة: ٦٠٠ للـ pro و ٦٠ للباقي |
| [[keyGenerator]] | دالة | «بنعد لمين؟» |
| [[standardHeaders]] | [["draft-8"]] | ابعت headers [[RateLimit]] و [[RateLimit-Policy]] بالشكل الموحد |
| [[legacyHeaders]] | [[false]] | متبعتش [[X-RateLimit-*]] القديمة |
| [[identifier]] | [["public"]] | اسم السياسة جوه الـ headers |
| [[store]] | [[redisStore("rl:public:")]] | العد في Redis، والمفاتيح بتبدأ بـ [[rl:public:]] |
| [[passOnStoreError]] | [[true]] | Redis وقع؟ عدّي الطلب |

### الـ [[limit]] كدالة

[[(req) => (req.apiKey?.plan === "pro" ? 600 : 60)]]: [[?.]] (optional chaining) يعني «لو [[req.apiKey]] مش موجود رجّع undefined من غير خطأ». و [[شرط ? أ : ب]] لو الشرط صح أ وإلا ب. و [[req.apiKey]] بيتحط من middleware قبل الـ limiter (في كود الحل: بيقرا header [[X-API-Key]]).

### الـ [[keyGenerator]]

~~~js
(req) => (req.apiKey ? $__btkey:$__{req.apiKey.id}$__bt : $__btip:$__{ipKeyGenerator(req.ip)}$__bt)
~~~

لو فيه API key العد عليه، وإلا على الـ IP. و [[ipKeyGenerator]] بيسيب IPv4 زي ما هو، وعنوان IPv6 بيحوّله لـ subnet (/56)، لأن أي حد عنده IPv6 معاه ملايين العناوين ويقدر يغيّر كل طلب. لو كتبت [[req.ip]] على طول، جرّبنا وطلع:

~~~text الناتج
ValidationError: Custom keyGenerator appears to use request IP without calling the ipKeyGenerator helper function for IPv6 addresses. This could allow IPv6 users to bypass limits.
~~~

وده تحذير في اللوج، مش crash.

---

## ٥. [[loginLimiter]]

- [[15 * 60_000]]: ربع ساعة.
- [[skipSuccessfulRequests: true]]: الطلب اللي رجع 2xx أو 3xx مبيتحسبش. جرّبنا ٣ محاولات 401 وواحدة 200، والعداد في Redis [["3"]].
- [[passOnStoreError: false]]: Redis وقع؟ ارفض (الطلب بيرجع 500). أحسن من إن الـ login يبقى مفتوح للتخمين.
- مفيش [[keyGenerator]]: الافتراضي بالـ IP (وهو أصلًا بيستخدم ipKeyGenerator).

---

## ٦. التشغيل الحقيقي (كود الحل، حد ٢ و ٥)

### ٣ طلبات من غير key

بـ [[curl -i http://localhost:5856/v1/data]]:

~~~text الطلب الأول
HTTP/1.1 200 OK
RateLimit: "public"; r=1; t=60
RateLimit-Policy: "public"; q=2; w=60; pk=:ZTFlODE3NTljODNm:
{"ok":true}
~~~

~~~text التالت
HTTP/1.1 429 Too Many Requests
RateLimit: "public"; r=0; t=60
RateLimit-Policy: "public"; q=2; w=60; pk=:ZTFlODE3NTljODNm:
Retry-After: 60
~~~

| الحتة | معناها |
|---|---|
| [[r=1]] | remaining: فاضلك كام طلب |
| [[t=60]] | الثواني لحد ما العداد يتصفّر |
| [[q=2]] | quota: الحد |
| [[w=60]] | window بالثواني |
| [[pk]] | partition key: hash للمفتاح (مش الـ IP نفسه) |
| [[Retry-After: 60]] | استنى ٦٠ ثانية |

والـ body بتاع الـ 429: [[Too many requests, please try again later.]]

### ٣ طلبات بـ [[-H "X-API-Key: pro_1"]]

التلاتة 200، و [[RateLimit]] نزل [[r=4]] ثم [[r=3]] ثم [[r=2]]، و [[q=5]]: عدّاد تاني خالص.

### في Redis

~~~text redis-cli --scan --pattern 'rl:*'
rl:public:key:pro_1
rl:public:ip:::/56
~~~

[[::/56]]؟ لأن [[localhost]] على ويندوز راح لـ IPv6 ([[::1]])، و ipKeyGenerator حوّله لـ subnet. ولما بعتنا لـ [[127.0.0.1]] المفتاح بقى [[rl:public:ip:127.0.0.1]]، وقيمته عدد الطلبات ([["5"]] بعد ٥ طلبات) و [[PTTL]] بتاعه حوالي ٥٩ ألف ملّي ثانية: نفس النافذة.

### نسختين

شغّلنا نفس السيرفر على 5856 و 5857 وبعتنا بالتبادل:

~~~text الناتج
5856 200
5857 200
5856 429
5857 429
~~~

الحد ٢ للاتنين مع بعض، لأن العداد واحد في Redis.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[RedisStore]] لكل limiter بـ prefix | عداد مشترك بين النسخ، ومنفصل لكل limiter |
| client من غير [[enableOfflineQueue: false]] | الـ store يلحق يحمّل الـ script |
| [[keyGenerator]] + [[ipKeyGenerator]] | عد بالـ API key أو بالـ IP (و IPv6 بالـ subnet) |
| [[limit]] دالة | الحد حسب الباقة |
| [[passOnStoreError]] | قرار: [[true]] للـ API العام، [[false]] للـ login |

- [[RateLimit]] و [[Retry-After]] هما اللي العميل يقراهم عشان يبطّأ.`,
          lines: [
            "express-rate-limit، ومعاه دالة تجميع IPv6.",
            "الـ store بتاع Redis.",
            "ioredis.",
            "client للـ rate limit: الطابور الافتراضي شغال (عشان الـ store يلحق يجهز)، بس أي أمر بيفشل بعد نص ثانية.",
            "سجّل أخطاء الاتصال.",
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
          teach: R`## نسخة بتقول، وكل النسخ بتسمع

الكود ده بيتحط في كل نسخة من السيرفر: كل نسخة عندها كاش في ذاكرتها ([[localCache]]، مثلًا [[Map]])، وسامعة على channel اسمه [[cache:invalidate]]. وأي نسخة تغيّر منتج تنادي [[invalidate(key)]]، فكل النسخ (هي كمان) تمسح نسختها المحلية. جرّبناه بـ ٣ processes منفصلة (A و B و C) على ويندوز 11 بـ Node 24 و ioredis 6 و Redis 8.10 في Docker.

---

## الأول: الفكرة في redis-cli (كود الحل)

ترمنالين. في الأول:

~~~bash
redis-cli SUBSCRIBE news
~~~

~~~text الناتج
1) "subscribe"
2) "news"
3) (integer) 1
~~~

يعني: «اشتركت في [[news]]، وده أول channel ليا». والـ shell بيفضل مستني رسايل ومبيرجعش (Ctrl+C يقفله). وفي التاني:

~~~bash
redis-cli PUBLISH news hello
~~~

~~~text الناتج في الترمنال التاني
(integer) 1
~~~

[[1]] = عدد اللي استلموا. وفي الأول ظهر:

~~~text الناتج في الترمنال الأول
1) "message"
2) "news"
3) "hello"
~~~

نوع الحدث، والـ channel، والرسالة. ولما قفلنا المشترك وبعتنا [[PUBLISH news again]]: الرد [[(integer) 0]]، والرسالة دي راحت ومحدش هيشوفها أبدًا حتى لو اشترك بعدها. و [[PUBSUB NUMSUB news]] بيقولك كام واحد سامع دلوقتي ([[0]] عندنا).

> على ويندوز من غير redis-cli: [[docker exec -it redis redis-cli SUBSCRIBE news]] في PowerShell، والتاني [[docker exec redis redis-cli PUBLISH news hello]].

---

## ١. اتصالين

~~~js
const pub = new Redis(config.REDIS_URL);
const sub = pub.duplicate();
~~~

- [[pub]] للنشر ولأي أمر عادي ([[del]] و [[get]]...).
- [[pub.duplicate()]] بيعمل client **جديد** (اتصال تاني) بنفس الإعدادات. ده [[sub]] للاشتراك بس.

ليه اتنين؟ الاتصال اللي عمل SUBSCRIBE بيدخل «وضع المشترك». في البروتوكول القديم (RESP2) أي أمر عادي عليه بيترفض، و ioredis بيرمي [[Connection in subscriber mode, only subscriber commands may be used]] (من الكود بتاعه). ioredis 6 بيتكلم RESP3 افتراضيًا، وفيه الأمر العادي بيعدّي (جرّبنا [[sub.get]] ونجح)، بس فصلهم برضه أنضف: لو اتصال الكاش اتقطع أو اتعطل، الاشتراك ميتأثرش، والعكس.

---

## ٢. الاشتراك

~~~js
await sub.subscribe("cache:invalidate");
sub.on("message", (channel, raw) => {
  const { key } = JSON.parse(raw);
  localCache.delete(key);
});
~~~

- [[sub.subscribe(...)]] = [[SUBSCRIBE]]، و [[await]] لحد ما Redis يأكد.
- [[sub.on("message", ...)]]: الدالة بتتنادى مع كل رسالة، وبتاخد اسم الـ channel ([[channel]]) والرسالة كنص ([[raw]] = خام، لسه متحوّلتش).
- [[const { key } = JSON.parse(raw)]]: حوّل النص object، وخد منه الخاصية [[key]] في متغير بنفس الاسم (destructuring).
- [[localCache.delete(key)]]: امسح من الكاش اللي في ذاكرة النسخة دي.

---

## ٣. [[invalidate(key)]]

~~~js
await pub.del(key);
await pub.publish("cache:invalidate", JSON.stringify({ key }));
~~~

1. امسح من Redis نفسه (الكاش المشترك).
2. [[publish]] = [[PUBLISH]]. الرسالة لازم نص، فـ [[JSON.stringify({ key })]] بيطلّع [[{"key":"product:1:v1"}]]. حطيناها JSON مش الـ key على طول عشان تقدر تضيف حقول بعدين من غير ما تكسر المشتركين.

الترتيب مهم: المسح من Redis الأول، عشان النسخة اللي تستلم الرسالة وتروح تجيب القيمة من جديد متلاقيش القديمة في Redis.

---

## ٤. التجربة: ٣ processes

خلّينا [[invalidate]] ترجّع ناتج [[publish]] عشان نشوفه، وكل نسخة تطبع لما تستلم. B هي اللي نادت [[invalidate("product:1:v1")]]:

~~~text الناتج
A subscribed
C subscribed
B subscribed
B publish returned 3
C got cache:invalidate {"key":"product:1:v1"} -> local keys now: []
A got cache:invalidate {"key":"product:1:v1"} -> local keys now: []
B got cache:invalidate {"key":"product:1:v1"} -> local keys now: []
~~~

- [[3]]: التلات نسخ استلموا، و B **منهم**: اللي بينشر بيستلم رسالته هو كمان لو مشترك، وده كويس هنا (نفس الكود يمسح عنده).
- الترتيب بين C و A مش مضمون، كل واحد في process لوحده.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[pub]] و [[sub = pub.duplicate()]] | اتصال للأوامر، واتصال للاشتراك |
| [[subscribe]] + [[on("message")]] | اسمع، ومع كل رسالة اعمل حاجة |
| [[publish]] بيرجّع رقم | عدد اللي استلموا ([[0]] = محدش سامع) |
| JSON في الرسالة | تقدر تزوّد حقول بعدين |

- pub/sub مبيحفظش: اللي مش متصل ساعة الرسالة مش هيعرف. ينفع لمسح كاش أو إشعار لحظي، مش لشغل لازم يتعمل.
- الرسالة بتروح **لكل** المشتركين، مش لواحد.`,
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
          teach: R`## حاجتين: استيراد سطر سطر، وضغط ملف

دالة [[importUsers]] بتقرا CSV سطر سطر وتكتب اليوزرز في القاعدة كل ١٠٠٠ مرة واحدة. والسطر الأخير بيضغط ملف بـ gzip من غير ما يحطه في الذاكرة. جرّبنا كل ده على ويندوز 11 بـ Node 24: ملف حقيقي ٢ مليون سطر (٥٧.٨ ميجا) من كود الحل، و [[db]] مزيّف بيقلّد [[createMany]] بتاع Prisma (بيعد ويتجاهل الإيميل المكرر) عشان نشوف الدفعات من غير قاعدة.

---

## ١. الـ imports

| الـ import | من | بيعمل إيه |
|---|---|---|
| [[createReadStream]] و [[createWriteStream]] | [[node:fs]] | يقرا/يكتب ملف حتة حتة (64KB افتراضيًا) |
| [[createInterface]] | [[node:readline]] | يحوّل stream بايتات لسطور |
| [[createGzip]] | [[node:zlib]] | stream بيضغط اللي داخله |
| [[pipeline]] | [[node:stream/promises]] | يوصّل streams ورا بعض ويرجّع promise |

و [[node:]] قبل الاسم معناها «module جاي مع Node»، مش باكدج من npm.

---

## ٢. [[createInterface({ input: createReadStream(path), crlfDelay: Infinity })]]

من جوه لبرة:

1. [[createReadStream(path)]]: stream بيقرا الملف حتة حتة.
2. [[createInterface({ input })]]: بيلم الحتت ويطلّع سطور كاملة (السطر ممكن يتقسم على حتتين، وهو بيلزقهم).
3. [[crlfDelay: Infinity]]: ملفات ويندوز آخر السطر فيها [[\r\n]] (CR = Carriage Return، و LF = Line Feed). القيمة دي بتضمن إن [[\r\n]] دايمًا تتحسب سطر واحد مش سطرين. جرّبنا ملف بـ [[\r\n]]: الإيميلات طلعت نضيفة من غير [[\r]] في آخرها.

---

## ٣. المتغيرات

[[let batch = [], total = 0, header = true;]]: الدفعة الحالية، وعدد اللي اتكتب، وهل لسه أول سطر (العناوين). [[let]] لأنهم بيتغيروا.

---

## ٤. [[for await (const line of lines)]]

[[for await]] بتلف على حاجة async: كل لفة بتستنى السطر الجاي. والأهم: السطر الجاي **مبيتقريش** غير لما جسم اللفة يخلص. فلو [[await db.user.createMany]] أخد وقت، القراية من الديسك بتقف وتستناه، وده الـ backpressure (الضغط الراجع: الأبطأ بيبطّأ الأسرع بدل ما الحاجات تتكوّم في الذاكرة).

### جوه اللفة

- [[if (header) { header = false; continue; }]]: أول سطر عناوين ([[id,email]])، فاقلب الـ flag و [[continue]] = «روح للفة الجاية».
- [[const [, email] = line.split(",");]]: [[split(",")]] بيقسم السطر عند الفواصل لـ array، والأقواس المربعة على الشمال (array destructuring) بتوزّع عناصر الـ array على متغيرات: الفاصلة الفاضية في أولها معناها «سيب أول عنصر (الـ id)»، والتاني يروح في [[email]].
- [[batch.push({ email })]]: ضيفه للدفعة. [[{ email }]] اختصار [[{ email: email }]].
- [[if (batch.length === 1000)]]: الدفعة كملت؟ [[===]] مقارنة من غير تحويل أنواع.

### كتابة الدفعة

~~~js
total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
batch = [];
~~~

[[createMany]] بيكتب الألف صف في أمر واحد ويرجّع [[{ count }]] (عدد اللي اتكتب فعلًا). و [[skipDuplicates: true]] يعني لو إيميل موجود (عليه unique) اتجاهله بدل ما الدفعة كلها تفشل. والسطر اللي بعده بيخلي [[batch]] array فاضية: دفعة جديدة، والقديمة مبقاش حد شايلها فالذاكرة بتتحرر.

---

## ٥. بعد اللفة

[[if (batch.length) total += ...]]: آخر دفعة غالبًا أقل من ١٠٠٠ (لو الملف ٢٠٠١ سطر، فاضل ١). [[batch.length]] لوحده كشرط: صفر = false.

جرّبنا ملف فيه ٢٠٠١ يوزر، آخر واحد إيميله متكرر:

~~~text الناتج
users.csv total 2000 createMany calls 3
~~~

٣ مرات للقاعدة (١٠٠٠ و ١٠٠٠ و ١)، والمكرر اتجاهل فالعدد ٢٠٠٠. لو كنا عملنا insert لكل سطر كان ٢٠٠١ مرة.

---

## ٦. [[await pipeline(createReadStream("export.csv"), createGzip(), createWriteStream("export.csv.gz"))]]

بالترتيب: اقرا ← اضغط ← اكتب. كل حتة بتعدّي على التلاتة وتترمي، و [[pipeline]]:

- بيستنى الكتابة لو أبطأ من القراية (backpressure).
- لو أي واحد فشل بيقفل التلاتة ويرمي الخطأ، فـ [[await]] يمسكه في [[try/catch]].
- الـ promise بيخلص لما الملف يتكتب كله.

جرّبناه على ملف الـ ٢ مليون سطر، وجرّبنا ملف مش موجود:

~~~text الناتج
csv MB 57.8 gz MB 11.2
caught: ENOENT ENOENT: no such file or directory, open '...\nope.csv'
~~~

الـ CSV اتضغط لحوالي الخُمس (نص متكرر بيتضغط كويس). و ENOENT = Error NO ENTry: الملف مش موجود، والخطأ وصل للـ [[catch]] بدل ما يعلّق.

---

## ٧. كود الحل: الفرق في الذاكرة بالأرقام

### [[gen.mjs]]: كتابة ٢ مليون سطر

~~~js
if (!out.write($__bt$__{i},user$__{i}@x.com,$__{(i % 900) + 100}\n$__bt)) await once(out, "drain");
~~~

[[out.write]] بيرجّع [[false]] لما البافر بتاع الكتابة يتملى، و [[once(out, "drain")]] (من [[node:events]]) promise بيخلص لما البافر يفضى. و [[(i % 900) + 100]]: [[%]] باقي القسمة، فالمبلغ دايمًا بين ١٠٠ و ٩٩٩. و [[2_000_000]]: الـ [[_]] للقراية بس. وفي الآخر [[out.end()]] «خلصت» و [[once(out, "finish")]] استنى لحد ما اتكتب. أخد حوالي ١٢ ثانية والـ RSS ١٣٠ ميجا.

### [[sum.mjs]] (readline) قصاد [[readFileSync]] و [[split]]

~~~text الناتج: readline
{ rows: 2000000, total: 1098930200, rssMB: 103 }
~~~

~~~text الناتج: readFileSync ثم split("\n")
{ rows: 2000000, total: 1098930200, rssMB: 389 }
~~~

نفس المجموع بالظبط، بس الطريقة التانية أكلت حوالي ٤ أضعاف. RSS = Resident Set Size: الرام اللي الـ process ماسكها فعلًا، و [[/ 1e6]] بيحوّل البايت لميجا ([[1e6]] = مليون). الـ ١٠٣ ميجا معظمها Node نفسه ثابت مهما الملف كبر، أما الـ ٣٨٩ فبتكبر مع الملف: الملف كله نص، وبعدين array فيها ٢ مليون string. (الأرقام بتختلف من جهاز لجهاز وطريقة لطريقة: الـ ٥٧٩ و ٨٦ المكتوبين في باقي الدرس من تجربة تانية، بس الفرق دايمًا كبير.)

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[createReadStream]] + [[readline]] | سطر سطر، والذاكرة ثابتة |
| [[for await]] | السطر الجاي يستنى اللي قبله يخلص (backpressure) |
| دفعات ١٠٠٠ + [[createMany]] | رحلات قليلة للقاعدة، ومن غير ما الملف كله يبقى في الذاكرة |
| [[pipeline]] | يوصّل streams ويقفل الكل ويرمي الخطأ لو حاجة فشلت |
| [[write]] بيرجّع false ← [[drain]] | لو بتكتب بإيدك، استنى البافر |

- [[split(",")]] هنا للتوضيح. CSV حقيقي فيه [[""]] وفواصل جوه القيم، فاستخدم parser زي [[csv-parse]].`,
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
          teach: R`## ٤ حتت بتتركّب ورا بعض

1. [[ordersInBatches]]: بتجيب الطلبات من القاعدة ١٠٠٠ ١٠٠٠.
2. [[cell]]: بتجهّز خانة واحدة عشان الـ CSV ميتكسرش ومحدش يحقن formula.
3. [[toCsv]]: بتحوّل كل طلب لسطر.
4. الـ routes: CSV بـ [[pipeline]]، و Excel بـ exceljs، والاتنين بيكتبوا في الرد وهما شغالين.

جرّبنا الكود ده كما هو في Express 5 على ويندوز 11 (Node 24 و exceljs 4.4)، مع [[db]] مزيّف فيه ٢٥٠٠ طلب بيقلّد [[findMany]] بتاع Prisma (take و skip و cursor)، والطلب الأول ليوزر إيميله [[=HYPERLINK("http://evil.com","click")]]، و [[requireRole]] بيعدّي الكل.

---

## ١. [[async function* ordersInBatches(size = 1000)]]

[[function*]] (بنجمة) = generator: دالة بتطلّع قيم واحدة ورا التانية بـ [[yield]] بدل [[return]] مرة واحدة. و [[async]] قبلها: بتقدر تعمل [[await]] جواها، واللي بيستخدمها بيلف عليها بـ [[for await]]. و [[size = 1000]] قيمة افتراضية.

### الـ query

~~~js
db.order.findMany({ take: size, ...(cursor && { skip: 1, cursor: { id: cursor } }), orderBy: { id: "asc" }, include: { user: { select: { email: true } } } })
~~~

| الحتة | معناها |
|---|---|
| [[take: size]] | هات ١٠٠٠ بس |
| [[...(cursor && {...})]] | أول مرة [[cursor]] فاضي فـ [[&&]] بيرجّع [[undefined]] و [[...undefined]] مبيضيفش حاجة. بعد كده بيضيف [[skip]] و [[cursor]] |
| [[cursor: { id: cursor }]] | ابدأ من الطلب ده |
| [[skip: 1]] | واتخطاه هو نفسه (اتبعت في الدفعة اللي فاتت) |
| [[orderBy: { id: "asc" }]] | ترتيب ثابت تصاعدي، من غيره الـ cursor ملوش معنى |
| [[include: { user: { select: { email: true } } }]] | هات اليوزر المرتبط، بس الإيميل بتاعه |

### باقي اللفة

- [[while (true)]] لفة من غير نهاية، والخروج منها بـ [[return]].
- [[if (batch.length === 0) return;]]: مفيش صفوف تاني؟ خلصنا.
- [[yield* batch]]: [[yield*]] (بنجمة) بتطلّع عناصر الـ array واحد واحد، كأنك كتبت [[yield]] لكل صف.
- [[cursor = batch.at(-1).id]]: [[at(-1)]] آخر عنصر. الـ id بتاعه نقطة البداية للدفعة الجاية.

والميزة: الـ generator بيقف عند كل [[yield]] لحد ما اللي بيقرا يطلب الصف الجاي. فالدفعة الجاية مبتتجابش غير لما الصفوف اللي قبلها تتكتب. في التجربة، ٢٥٠٠ صف عملوا ٤ نداءات [[findMany]]: ١٠٠٠ و ١٠٠٠ و ٥٠٠ وواحدة فاضية بتقول «خلصنا».

---

## ٢. [[cell(v)]]

~~~js
let s = String(v ?? "");
if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
return /[",\n\r]/.test(s) ? $__bt"$__{s.replaceAll('"', '""')}"$__bt : s;
~~~

1. [[v ?? ""]]: [[??]] لو [[v]] بـ [[null]] أو [[undefined]] خد [[""]]. و [[String(...)]] حوّل أي حاجة لنص.
2. الـ regex الأول: [[^]] في أوله يعني «بيبدأ بـ»، والأقواس المربعة بعدها يعني «حرف واحد من دول»: [[=]] أو [[+]] أو [[-]] (بالـ [[\]] قبلها لأنها جوه الأقواس ليها معنى) أو [[@]] أو tab أو CR. لو بيبدأ بيهم Excel بيعتبره formula، فبنحط [[']] قبله. [[.test(s)]] بترجّع true أو false.
3. الـ regex التاني: فيه [[""]] أو فاصلة أو سطر جديد؟ يبقى لازم الخانة تتحط بين [[""]]، و [[replaceAll('"', '""')]] بيضاعف أي [[""]] جوه (ده قانون CSV).

---

## ٣. [[async function* toCsv(rows)]]

- أول [[yield]]: سطر العناوين، وقبله حرف مش باين: الـ BOM (Byte Order Mark، الحرف U+FEFF). جرّبنا: أول ٣ بايتات في الملف النازل [[ef bb bf]]، ودي علامة UTF-8 اللي Excel على ويندوز بيحتاجها عشان يقرا العربي صح.
- [[for await (const o of rows)]]: لف على الـ generator اللي فات.
- [[.map(cell).join(",")]] على array فيها الخانات بالترتيب: و [[map(cell)]] عدّي كل واحدة على [[cell]]، و [[join(",")]] لزّقهم بفاصلة. و [[(o.amountCents / 100).toFixed(2)]]: المبلغ متخزن قروش، فبنقسم على ١٠٠ ونسيب رقمين عشريين.

---

## ٤. route الـ CSV

~~~js
res.attachment("طلبات-سبتمبر.csv");
await pipeline(Readable.from(toCsv(ordersInBatches())), res);
~~~

- [[res.attachment(name)]]: بيحط [[Content-Type]] من الامتداد و [[Content-Disposition: attachment]] (نزّله كملف).
- من جوه لبرة: [[ordersInBatches()]] ← [[toCsv(...)]] ← [[Readable.from(...)]] (حوّل الـ generator لـ readable stream) ← [[pipeline(..., res)]] (اكتبه في الرد، و [[res]] نفسه writable stream).

بـ [[curl -s -D - -o orders.csv http://localhost:5855/api/admin/orders.csv]] ([[-D -]] اطبع الـ headers، و [[-o]] احفظ الـ body في ملف):

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="?????-??????.csv"; filename*=UTF-8''%D8%B7%D9%84%D8%A8%D8%A7%D8%AA-%D8%B3%D8%A8%D8%AA%D9%85%D8%A8%D8%B1.csv
Transfer-Encoding: chunked
~~~

- [[filename=]] للمتصفحات القديمة: الـ header مينفعش فيه غير ASCII، فالعربي بقى [[?]].
- [[filename*=UTF-8'']] الاسم الحقيقي بالـ percent-encoding، والمتصفحات الحديثة بتقرا ده.
- [[Transfer-Encoding: chunked]]: مفيش [[Content-Length]]، لأن السيرفر مكانش يعرف الحجم وهو بيبعت. الرد بيتبعت حتت.

~~~text أول ٣ سطور من orders.csv
﻿id,email,amount_egp,status
cm000001,"'=HYPERLINK(""http://evil.com"",""click"")",10.00,PENDING
cm000002,mona@example.com,10.01,PENDING
~~~

الإيميل الخبيث بقى يبدأ بـ [[']] (مش formula)، وعشان فيه [[""]] و فواصل اتحط بين [[""]] واتضاعفت اللي جواه. والملف ٢٥٠١ سطر (عناوين + ٢٥٠٠).

---

## ٥. route الـ Excel

| السطر | بيعمل إيه |
|---|---|
| [[new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true })]] | ملف xlsx بيتكتب في الرد وهو بيتبني. [[useStyles]] عشان التنسيق (numFmt) يشتغل |
| [[addWorksheet("الطلبات", { views: [...] })]] | شيت باسم عربي. [[rightToLeft: true]] من اليمين، و [[state: "frozen", ySplit: 1]] الصف الأول ثابت |
| [[ws.columns]] | array فيها كل عمود: [[header]] العنوان، و [[key]] اسم الحقل في الصف، و [[width]] العرض، و [[numFmt: "#,##0.00"]] رقم بفاصل آلاف ورقمين عشريين |
| [[ws.addRow({...}).commit()]] | ضيف صف و [[commit]] = اكتبه في الـ stream وشيله من الذاكرة |
| [[await wb.commit()]] | اقفل الملف، وده بيقفل الرد |

جرّبنا: الرد [[Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet]] و [[filename="orders.xlsx"]]، والملف ٥٧٦٢٦ بايت. ومفتحناهوش في Excel، بس قريناه تاني بـ exceljs:

~~~text الناتج (مختصر): اسم الشيت وعدد الصفوف والـ views، وبعدين numFmt ونوع خانة المبلغ C2
الطلبات 2501 [{"workbookViewId":0,"rightToLeft":true,"state":"frozen","xSplit":0,"ySplit":1,"topLeftCell":"A2",...}]
#,##0.00 number
~~~

اسم الشيت صح، و ٢٥٠١ صف، والاتجاه والتثبيت متسجلين، والمبلغ رقم حقيقي مش نص. والإيميل الخبيث في الـ XML جوه الملف متخزن كقيمة نص من غير عنصر [[<f>]] (اللي هو الـ formula)، فـ exceljs بيكتب النص كنص، والخطر الأكبر في الـ CSV.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| async generator + cursor | دفعات من القاعدة، والدفعة الجاية بس لما الرد يلحق |
| [[cell]] | escaping لـ CSV + منع CSV injection بـ [[']] |
| BOM في أول الملف | Excel يقرا العربي صح |
| [[res.attachment]] | ينزل كملف، والاسم العربي في [[filename*]] |
| [[pipeline(Readable.from(...), res)]] | stream للرد مع الـ backpressure |
| [[WorkbookWriter]] + [[row.commit()]] | Excel كبير من غير ما يتبني كله في الذاكرة |`,
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
          teach: R`## HTML في string، ومتصفح بيطبعه

الملف فيه ٣ حتت: دوال صغيرة بتجهّز الكلام (خط، و escape، وفلوس)، ودالة [[invoiceHtml]] بتبني صفحة HTML للفاتورة، و [[renderInvoice]] بتخلي Chromium يطبع الصفحة دي PDF. جرّبناه على ويندوز 11 بـ Node 24 و Playwright 1.63 (Chromium اتسطب بـ [[npx playwright install chromium]])، وخط Noto Naskh Arabic من مشروع Noto الرسمي.

---

## ١. الـ imports والخط

~~~js
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const font = readFileSync("assets/fonts/NotoNaskhArabic-Regular.ttf").toString("base64");
~~~

- [[chromium]] من Playwright: بيشغّل متصفح Chromium من الكود.
- [[readFileSync]] بيقرا ملف الخط كله (Buffer بايتات). هنا مقبول إنه sync لأنه بيحصل مرة واحدة وانت بتقوم، مش جوه طلب.
- [[.toString("base64")]]: base64 طريقة تكتب بيها أي بايتات كحروف إنجليزي وأرقام، عشان نحطها جوه نص الـ HTML.

---

## ٢. [[esc]]: الـ escape

~~~js
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", ... })[c]);
~~~

- [[/[&<>"']/g]]: أي حرف من الخمسة دول، و [[g]] = global (كله، مش أول واحد بس).
- [[replace]] بدالة: كل حرف لقاه بيتبعت للدالة ([[c]]) واللي ترجّعه بيتحط مكانه.
- الدالة بترجّع object فيه كل حرف وبديله، و [c] بعده بيجيب البديل بالحرف نفسه. يعني [[<]] تبقى [[&lt;]] (entity: طريقة HTML تكتب بيها الحرف كنص).

جرّبنا باسم عميل [[منى <script>]]، والـ HTML اللي اتبنى فيه:

~~~text جزء من الـ HTML
<h1>فاتورة رقم INV-1042</h1><p>العميل: منى &lt;script&gt;</p>
~~~

فالمتصفح بيعرض [[<script>]] كحروف، ومبيعتبرهاش tag.

---

## ٣. [[money]]: [[Intl.NumberFormat]]

[[Intl]] جزء من JavaScript لتنسيق الأرقام والتواريخ حسب اللغة. [[ar-EG]] = عربي مصر، و [[style: "currency", currency: "EGP"]] = فلوس بالجنيه. جرّبنا:

~~~text الناتج
money.format(150)    →  ١٥٠٫٠٠ ج.م.
money.format(390.5)  →  ٣٩٠٫٥٠ ج.م.
ar-EG-u-nu-latn      →  150.00 ج.م.
~~~

أرقام عربية شرقية والعلامة العشرية [[٫]]. و [[-u-nu-latn]] في آخر اسم اللغة معناها «numbering system: latin» لو عايز 150.00.

---

## ٤. [[invoiceHtml(o)]]: template string

الدالة بترجّع string بين backticks، وجواها [[$__{...}]] بيتحط مكانها قيمة. الأهم فيها:

| الحتة | ليه |
|---|---|
| [[<html lang="ar" dir="rtl">]] | اللغة عربي، والاتجاه من اليمين للشمال لكل الصفحة |
| [[<meta charset="utf-8">]] | الحروف UTF-8 عشان العربي |
| [[@font-face { font-family: "Naskh"; src: url(data:font/ttf;base64,...) }]] | خط اسمه Naskh، والملف نفسه جوه الـ URL ([[data:]] URL) فمش محتاج نت ولا خطوط على السيرفر |
| [[font-family: "Naskh", sans-serif]] | استخدم الخط ده، ولو حرف مش فيه خد [[sans-serif]] |
| [[text-align: start]] | الكلام يبدأ من «البداية»، واللي هي اليمين مع rtl |
| [[esc(o.number)]] و [[esc(o.customer)]] | أي حاجة من اليوزر بتعدّي على esc |
| [[o.items.map((it) => ...).join("")]] | لكل صنف [[<tr>]] (صف) فيه ٣ [[<td>]] (خانات)، و [[join("")]] بيلزّقهم من غير فاصل |

---

## ٥. [[const browser = await chromium.launch();]]

بيشغّل Chromium **headless** (من غير شباك). عندنا أخد من ٠.٧ لـ ١.٢ ثانية، فبيتعمل مرة واحدة في أول الملف، مش مع كل فاتورة.

---

## ٦. [[renderInvoice(order)]]

~~~js
const page = await browser.newPage();
try {
  await page.setContent(invoiceHtml(order), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return await page.pdf({ format: "A4", printBackground: true, margin: {...} });
} finally { await page.close(); }
~~~

1. [[browser.newPage()]]: تاب جديد، خفيف.
2. [[page.setContent(html, { waitUntil: "load" })]]: حط الـ HTML في التاب واستنى event الـ [[load]].
3. [[page.evaluate(() => document.fonts.ready)]]: شغّل الكود ده **جوه المتصفح**. [[document.fonts.ready]] promise بيخلص لما كل الخطوط تتحمّل.
4. [[page.pdf({...})]]: اطبع. [[format: "A4"]] مقاس الورقة، و [[printBackground: true]] اطبع الألوان والخلفيات (افتراضيًا الطباعة بتشيلها)، و [[margin]] الهوامش بالـ mm. بيرجّع Buffer.
5. [[finally { await page.close(); }]]: اقفل التاب في كل الأحوال.

### كود الحل

~~~text الناتج
launch ms 1218
first render ms 226
second render ms 172
pdf bytes 58332 isBuffer true
~~~

الفاتورة نفسها حوالي ٢٠٠ms بعد ما المتصفح مفتوح، والملف بيبدأ بـ [[%PDF-1.4]]. وفتحنا الـ PDF: صفحة واحدة، والعنوان والجدول من اليمين، والحروف العربي متوصلة، و [[<script>]] ظاهر كنص، والمبالغ بأرقام عربية.

### الخطوط اللي جوه الملف

دوّرنا على [[/FontName]] جوه الـ PDF:

~~~text الناتج
/FontName /AAAAAA+SegoeUI-Bold
/FontName /BAAAAA+NotoNaskhArabic-Regular
/FontName /CAAAAA+SegoeUI
~~~

Noto Naskh embedded (و [[AAAAAA+]] معناها subset: الحروف المستخدمة بس). بس لاحظ Segoe UI: خط Noto Naskh Arabic فيه حروف عربي بس، فالكلام الإنجليزي ([[INV-1042]] و [[Mouse pad]]) خده الـ fallback ([[sans-serif]])، وده على ويندوز Segoe UI. على سيرفر لينكس هيبقى خط تاني. لو عايز الإنجليزي كمان ثابت في كل مكان، ضيف [[@font-face]] تاني لخط لاتيني وحطه في [[font-family]].

---

## ٧. الـ route

~~~js
res.type("pdf").attachment($__btinvoice-$__{order.number}.pdf$__bt).send(await renderInvoice(order));
~~~

- [[getForInvoice(req.user.id, req.params.id)]]: بيجيب الطلب **بتاع اليوزر ده بس** (ownership، درس [[ownership (IDOR)]]).
- [[res.type("pdf")]] بيحط [[Content-Type: application/pdf]]، و [[attachment(...)]] اسم الملف، و [[send(buffer)]] بيبعت البايتات.

جرّبناه بـ [[curl -s -D - -o inv.pdf]]:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="invoice-INV-1042.pdf"
Content-Length: 47418
~~~

هنا فيه [[Content-Length]] (مش chunked زي التصدير) لأن الـ PDF كله Buffer جاهز قبل ما يتبعت.

> اللي مجرّبناهوش هنا: نفس الكود من غير [[@font-face]] جوه Docker لينكس من غير خطوط. شكل المربعات أو الخط البديل في الحالة دي من الـ docs وتجارب الناس، وجرّبه بنفسك قبل الإنتاج.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[chromium.launch()]] مرة واحدة | تقيل، والصفحات خفيفة |
| [[newPage]] ثم [[close]] في [[finally]] | تاب لكل فاتورة ومفيش تسريب |
| [[dir="rtl"]] + [[text-align: start]] | الاتجاه العربي |
| [[@font-face]] بـ data URL + [[document.fonts.ready]] | نفس الخط في كل مكان، ومتطبعش قبل ما يتحمّل |
| [[esc]] | اسم اليوزر يفضل نص، مش HTML |
| [[Intl.NumberFormat("ar-EG")]] | فلوس بالعربي، و [[-u-nu-latn]] للأرقام الإنجليزي |`,
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
          teach: R`## ملف واحد بيشتغل مرتين

الملف ده بيتشغّل كسيرفر، ونفس الملف بيتشغّل تاني جوه worker يحسب. [[isMainThread]] هو اللي بيفرّق: في السيرفر [[true]]، وجوه الـ worker [[false]]. وفيه ٣ routes عشان نقيس: [[/blocking]] بيحسب في الـ thread الرئيسي، و [[/offloaded]] بيحسب في worker، و [[/ping]] خفيف. جرّبناه على ويندوز 11 بـ Node 24 و Express 5 (السيرفر على البورت 5856، و [[app]] بيتعمل جوه الـ [[else]])، على جهاز فيه ١٦ logical processor.

---

## ١. [[import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";]]

| الاسم | إيه هو |
|---|---|
| [[Worker]] | كلاس: [[new Worker(file)]] بيشغّل الملف ده في thread جديد |
| [[isMainThread]] | [[true]] لو الكود شغال في الـ thread الرئيسي |
| [[parentPort]] | جوه الـ worker: القناة اللي بيكلّم بيها اللي شغّله |
| [[workerData]] | جوه الـ worker: الداتا اللي اتبعتت له وهو بيبدأ |

---

## ٢. [[function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }]]

Fibonacci بالـ recursion (الدالة بتنادي نفسها). مكتوبة بالطريقة البطيئة **عمدًا**: [[fib(38)]] بيعمل عشرات الملايين من النداءات، فبياخد حوالي نص ثانية CPU. والنتيجة [[39088169]].

---

## ٣. فرع الـ worker

~~~js
if (!isMainThread) {
  parentPort.postMessage(fib(workerData.n));
}
~~~

[[!]] = «مش». يعني لو احنا جوه worker: احسب الرقم اللي جالك في [[workerData.n]]، وابعت النتيجة بـ [[postMessage]]. وبعدها الـ worker مبقاش عنده شغل فبيخلص لوحده.

> كل حاجة **برّه** الـ [[if]] بتتنفّذ في الـ worker كمان، لأنه بيشغّل الملف من أوله. عشان كده [[app]] و [[app.listen]] لازم يبقوا جوه الـ [[else]]، وإلا كل worker هيحاول يفتح السيرفر تاني.

---

## ٤. [[runInWorker(n)]]

~~~js
const runInWorker = (n) => new Promise((resolve, reject) => {
  const w = new Worker(new URL(import.meta.url), { workerData: { n } });
  w.once("message", resolve);
  w.once("error", reject);
});
~~~

- [[new Promise((resolve, reject) => ...)]]: promise بإيدك. [[resolve(x)]] = خلص بنجاح بالقيمة x، و [[reject(err)]] = فشل.
- [[import.meta.url]]: عنوان الملف الحالي كـ URL ([[file:///C:/.../server.mjs]]). و [[new URL(...)]] بيحوّله object تقبله [[Worker]]. يعني «شغّل نفس الملف ده».
- [[{ workerData: { n } }]]: ابعت [[n]] للـ worker.
- [[w.once("message", resolve)]]: أول رسالة توصل = النتيجة، فالـ promise يخلص بيها. [[once]] بدل [[on]] لأننا مستنيين رسالة واحدة.
- [[w.once("error", reject)]]: لو الكود جوه الـ worker رمى خطأ، الـ promise يترفض والـ route يرجّع خطأ.

---

## ٥. الـ routes

- [[/blocking]]: [[res.json({ v: fib(38) })]] مباشرة. طول ما [[fib]] شغالة، الـ event loop واقف: ولا طلب تاني بيتقري.
- [[/offloaded]]: [[await runInWorker(38)]]. الـ route بيستنى promise، والـ event loop فاضي يخدم غيره لحد ما الـ worker يرد.
- [[/ping]]: بيرد على طول. ده المقياس: لو أخد وقت، يبقى السيرفر كان مشغول.

---

## ٦. كود الحل: client في process لوحده

~~~js
const heavy = fetch(url + path);
await new Promise((r) => setTimeout(r, 50));
const t = performance.now();
await fetch(url + "/ping");
~~~

ابعت الطلب التقيل **من غير** [[await]] (يفضل شغال)، واستنى ٥٠ms عشان يوصل السيرفر ويبدأ، وبعدين قيس [[/ping]]. وفي الآخر [[await heavy]] عشان منسيبش طلب معلّق. شغّلناه مرتين:

~~~text الناتج (تشغيل ١ ثم ٢)
/blocking ping took 503 ms       /blocking ping took 661 ms
/offloaded ping took 14 ms       /offloaded ping took 11 ms
~~~

مع [[/blocking]]، الـ ping استنى الحساب كله يخلص. مع [[/offloaded]]، رد في حوالي ١٠ms. والطلبين رجعوا نفس النتيجة [[{"v":39088169}]].

وقسنا كل route لوحده من غير ping:

~~~text الناتج
/blocking alone took 516 ms
/offloaded alone took 636 ms
~~~

الـ worker **مش** بيسرّع الحساب، بالعكس أبطأ بحوالي ١٠٠ms: تشغيل thread جديد بـ V8 لوحده وتحميل الملف والـ imports تاني. اللي كسبناه إن السيرفر فضل بيرد على غيره. ولو الـ client كان في نفس الـ process بتاع السيرفر، كان هو نفسه هيقف مع [[/blocking]] والأرقام تكدب.

---

## ٧. والـ ١٠٠ طلب مع بعض؟

كل طلب = [[new Worker]] جديد = thread و V8 وذاكرة. الجهاز هنا فيه ١٦ logical processor ([[os.availableParallelism()]] رجّع [[16]])، فـ ١٠٠ worker هيتزاحموا على ١٦، وكل واحد ياخد أطول، والرام تكبر. الحل pool ثابت بعدد الـ cores (مكتبة [[piscina]]) والباقي يستنى دوره، أو queue.

---

## الخلاصة

| | بيعمل إيه | إمتى |
|---|---|---|
| [[worker_threads]] | يشغّل حساب CPU في thread تاني | حساب لازم يرجع في نفس الطلب |
| [[cluster]] / PM2 | نسخ من السيرفر كله على نفس الجهاز | VPS من غير Docker |
| containers ورا load balancer | نسخ على أجهزة | الإنتاج العادي |
| queue + worker process | الشغل يتعمل بعدين | الحاجة التقيلة اللي الرد مش لازم يستناها |

- worker مش بيسرّع الحساب، بيحمي الـ event loop.
- كل حاجة برّه [[if (!isMainThread)]] بتتنفّذ في الـ worker كمان.`,
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
          teach: R`## «شنطة» لكل طلب، وأي كود يقدر يفتحها

أول middleware بيعمل object صغير للطلب (فيه الـ request id)، وبيشغّل باقي الطلب كله «جواه». بعد كده أي دالة في أي ملف تقدر تسأل «إيه الـ object بتاع الطلب اللي أنا شغالة فيه؟» من غير ما حد يعدّيلها [[req]]. والـ logger بيستخدم ده عشان يحط الـ id في كل سطر لوحده. جرّبنا المثال كما هو في Express 5 و pino 10 على ويندوز 11 بـ Node 24، على البورت 5857، مع [[requireAuthOptional]] بسيط بياخد اليوزر من header [[x-user]]، وجرّبنا كود الحل كمان.

---

## ١. الـ imports و [[new AsyncLocalStorage()]]

- [[AsyncLocalStorage]] من [[node:async_hooks]]: الكلاس اللي بيعمل التخزين ده. ALS اختصار اسمه.
- [[randomUUID]] من [[node:crypto]]: id عشوائي.
- [[export const requestContext = new AsyncLocalStorage();]]: واحد بس للتطبيق كله، و [[export]] عشان الـ logger وأي ملف تاني يستورده. هو مش الـ object نفسه، هو «المخزن» اللي كل طلب ليه فيه درج لوحده.

---

## ٢. أول middleware

~~~js
const reqId = req.get("x-request-id") ?? randomUUID();
res.setHeader("x-request-id", reqId);
requestContext.run({ reqId }, next);
~~~

1. [[req.get("x-request-id")]]: لو Nginx أو الواجهة باعتين id، خده. [[??]]: لو مش موجود ([[undefined]]) اعمل واحد جديد.
2. [[res.setHeader]]: رجّعه في الرد، عشان اللي عنده مشكلة يبعتهولك.
3. [[requestContext.run(store, fn)]]: شغّل [[fn]] (هنا [[next]]، يعني باقي الطلب كله) ومعاها الـ store ده. أي حاجة async بتبدأ جوه [[fn]] (promise أو timer أو await) بتفضل شايفة نفس الـ store، وNode هو اللي بيتابع مين بدأ مين.

ليه [[run]] تلف [[next]] بدل ما تحط الـ object في متغير؟ لأن متغير عادي واحد لكل التطبيق، و ١٠٠ طلب شغالين مع بعض هيكتبوا فيه فوق بعض.

---

## ٣. تاني middleware: ضيف اليوزر

~~~js
app.use(requireAuthOptional, (req, res, next) => {
  const ctx = requestContext.getStore();
  if (ctx) ctx.userId = req.user?.id ?? null;
  next();
});
~~~

- [[app.use(a, b)]]: middlewareين ورا بعض: الأول بيحط [[req.user]] لو فيه، والتاني بيكمّل.
- [[getStore()]]: هات الـ object بتاع الطلب ده. ده نفس الـ object اللي اتعمل في [[run]]، فلو ضفت عليه حاجة كل الكود اللي بعدك هيشوفها.
- [[if (ctx)]]: برّه أي [[run]] بيرجع [[undefined]].
- [[req.user?.id ?? null]]: لو مفيش يوزر [[null]] (مش undefined، عشان يظهر في اللوج صريح).

---

## ٤. الـ logger: [[mixin]]

~~~js
export const logger = pino({
  mixin: () => {
    const ctx = requestContext.getStore();
    return ctx ? { reqId: ctx.reqId, userId: ctx.userId } : {};
  },
});
~~~

[[mixin]] دالة pino بيناديها مع **كل** سطر لوج، واللي بترجّعه بيتدمج في السطر. هنا: لو احنا جوه طلب حط الـ id واليوزر، وإلا ولا حاجة.

---

## ٥. الـ service: مفيش [[req]] خالص

~~~js
export async function chargeCard(amount) {
  logger.info({ amount }, "charging card");
}
~~~

[[logger.info(object, message)]]: الـ object بيتدمج في السطر، والرسالة في [[msg]]. والـ service دي مش عارفة حاجة عن Express، ومع ذلك سطرها هيطلع ومعاه الطلب.

---

## ٦. التشغيل الحقيقي

route [[POST /pay]] بيستنى ٢٠ms وبعدين ينادي [[chargeCard(150)]]، وفيه timer بيعمل لوج برّه أي طلب. طلبين بـ curl:

~~~bash
curl -i -X POST -H "x-request-id: req-123" -H "x-user: u7" http://localhost:5857/pay
curl -i -X POST http://localhost:5857/pay
~~~

~~~text الـ headers اللي رجعت
x-request-id: req-123
x-request-id: 35c898e8-7045-452d-8396-be610d6f7436
~~~

الأول رجّعلنا الـ id بتاعنا، والتاني اتعمله UUID. واللوج (من غير [[time]] و [[pid]]، و [[hostname]] اتغيّر لـ ALI-PC):

~~~text اللوج
{"level":30,"hostname":"ALI-PC","msg":"timer outside any request"}
{"level":30,"hostname":"ALI-PC","reqId":"req-123","userId":"u7","amount":150,"msg":"charging card"}
{"level":30,"hostname":"ALI-PC","reqId":"35c898e8-7045-452d-8396-be610d6f7436","userId":null,"amount":150,"msg":"charging card"}
~~~

[[level 30]] = info في pino. السطر بتاع الـ timer من غير reqId (برّه [[run]])، والتانيين فيهم الطلب واليوزر رغم إن [[chargeCard]] متعرفش عنهم حاجة.

### كود الحل: طلبين في نفس اللحظة

كود الحل نسخة أصغر من غير pino: [[log]] بتطبع JSON فيه [[als.getStore()?.reqId]] ([[?.]] عشان برّه الطلب الـ store [[undefined]])، و [[chargeCard]] بتستنى وقت عشوائي لحد ٣٠ms، و [[supertest]] بيبعت طلبين A و B مع بعض بـ [[Promise.all]] من غير ما يفتح بورت. شغّلناه مرتين:

~~~text التشغيل الأول
{"reqId":"A","userId":"u1","msg":"start"}
{"reqId":"B","userId":"u2","msg":"start"}
{"reqId":"A","userId":"u1","msg":"charging"}
{"reqId":"A","userId":"u1","msg":"done"}
{"reqId":"B","userId":"u2","msg":"charging"}
{"reqId":"B","userId":"u2","msg":"done"}
{"msg":"outside any request"}
~~~

~~~text التشغيل التاني
{"reqId":"A","userId":"u1","msg":"start"}
{"reqId":"B","userId":"u2","msg":"start"}
{"reqId":"B","userId":"u2","msg":"charging"}
{"reqId":"B","userId":"u2","msg":"done"}
{"reqId":"A","userId":"u1","msg":"charging"}
{"reqId":"A","userId":"u1","msg":"done"}
{"msg":"outside any request"}
~~~

الترتيب اتغيّر (الوقت عشوائي)، بس كل سطر لسه معاه الطلب واليوزر بتوعه. وآخر سطر من غير reqId: [[JSON.stringify]] بيشيل أي خاصية قيمتها [[undefined]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[new AsyncLocalStorage()]] | مخزن واحد للتطبيق |
| [[run(store, next)]] في أول middleware | كل الطلب بيتنفّذ ومعاه الـ store بتاعه |
| [[getStore()]] | هات الـ store من أي مكان، أو [[undefined]] برّه طلب |
| [[mixin]] في pino | الـ id في كل سطر لوج لوحده |
| [[x-request-id]] داخل وخارج | تربط لوج Nginx والتطبيق وشكوى اليوزر |

- متحطش الـ context في متغير global عادي: طلبين مع بعض هيشوفوا بيانات بعض.
- لازم يبقى أول middleware عشان كل اللي بعده يبقى جواه.`,
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
    }
]);
