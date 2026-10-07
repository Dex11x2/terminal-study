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
    }
]);
