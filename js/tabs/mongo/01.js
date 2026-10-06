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

TAB("mongo", {
  label: "MongoDB",
  prompt: "$ ",
  lab: R`docker run -d --name mongo -p 127.0.0.1:27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:8
docker exec -it mongo mongosh -u admin -p secret`,
  labText: "أسهل قاعدة تجربة: container واحد على جهازك. الأوامر اللي بتبدأ بـ db. بتتكتب جوه mongosh، والباقي في الترمنال.",
  levels: {"1":["البداية","تتصل بـ mongosh وتقرا وتكتب"],"2":["المتوسط","يوزرز و indexes و Docker، وتصميم المستندات و aggregate"],"3":["المتقدم","باك أب مجدول بيتجرّب، وترجيع، ونقل"]},
  categories: [
    {
      t: "الاتصال والقراءة والكتابة",
      l: 1,
      n: "mongosh هو الترمنال بتاع MongoDB: تتصل، وتتنقل، وتكتب وتقرا مستندات",
      items: [
        {
          cmd: "mongosh",
          title: "ادخل على MongoDB من الترمنال",
          desc: R`[[mongosh]] هو الـ shell الرسمي لـ MongoDB، وبياخد رابط اتصال أو [[-u]] و [[-p]]. لو Mongo جوه Docker، بتشغّله جوه الـ container بـ [[docker exec]] لأنه جاي مع الصورة.

و [[--eval]] بينفّذ أمر واحد ويخرج، ودي اللي بتستخدمها في السكربتات.`,
          example: R`docker exec -it mongo mongosh -u admin -p secret
mongosh "mongodb://admin:secret@localhost:27017/?authSource=admin"
mongosh "mongodb://localhost:27017/myapp" -u admin --authenticationDatabase admin
mongosh "mongodb://admin:secret@localhost:27017/?authSource=admin" --quiet --eval "db.adminCommand('ping')"`,
          try: R`شغّل الـ lab، وادخل بأول سطر، واكتب [[db.version()]] وبعدين [[exit]].`,
          deep: {
            why: "Compass والـ GUI حلوين على جهازك، بس على السيرفر وفي السكربتات مفيش غير الترمنال. وأسرع طريقة تتأكد إن القاعدة شغالة والباسورد صح هي mongosh.",
            how: R`[[mongosh]] هو الـ shell الجديد، مبني على Node، فأي حاجة بتكتبها جواه JavaScript. الـ shell القديم اسمه [[mongo]] واتشال من MongoDB 6، فلو لقيته في شرح قديم استبدله بـ mongosh.

الاتصال: يا إما رابط كامل [[mongodb://user:pass@host:port/db]]، يا إما [[-u]] و [[-p]] و [[--authenticationDatabase]]. لو كتبت [[-u]] من غير [[-p]]، بيسألك الباسورد من غير ما يظهر على الشاشة ولا يتسجّل في الـ history.

[[authSource=admin]] (أو [[--authenticationDatabase admin]]): اليوزر اللي بيتعمل من [[MONGO_INITDB_ROOT_USERNAME]] بيتخزن في قاعدة اسمها admin، فلازم تقول لـ Mongo يدوّر عليه هناك، حتى لو هتشتغل على myapp.

جوه Docker: صورة mongo الرسمية فيها mongosh و mongodump، فمش محتاج تسطّب حاجة على السيرفر. [[-it]] لأنك هتكتب جواه.

[[--eval]] بينفّذ ويخرج، و [[--quiet]] بيشيل رسالة الترحيب. و [[db.adminCommand('ping')]] بيرجع [[{ ok: 1 }]] لو السيرفر بيرد.`,
            when: "أي إدارة للقاعدة. تجربة الـ MONGODB_URI قبل ما تحطه في .env. سكربتات الفحص.",
            mistakes: R`تكتب [[mongo]] فيطلع command not found: اسمه mongosh دلوقتي. وتنسى [[authSource=admin]] فيطلع Authentication failed مع إن الباسورد صح. وتكتب الباسورد في الأمر على السيرفر فيفضل في [[~/.bash_history]].`
          },
          teach: R`## [[mongosh]] = الترمنال اللي بتكلّم بيه MongoDB

MongoDB نفسه سيرفر (برنامج اسمه [[mongod]]، الـ d في الآخر اختصار daemon يعني برنامج شغال في الخلفية) قاعد مستني اتصالات على بورت 27017. و [[mongosh]] (اختصار Mongo Shell) هو البرنامج اللي بيتصل بيه وبيديك prompt تكتب فيه أوامر. المثال ٤ طرق للدخول، وكلهم اتشغّلوا على container من [[mongo:8]] (السيرفر 8.3.11 و mongosh 2.12.0) على Docker Desktop.

---

## ١. من جوه الـ container

~~~bash
docker exec -it mongo mongosh -u admin -p secret
~~~

نفكّه حتة حتة:

| الجزء | معناه |
|---|---|
| [[docker exec]] | شغّل أمر جوه container شغال أصلًا |
| [[-it]] | [[-i]] (interactive) سيب الـ input مفتوح، و [[-t]] (tty) اعمل ترمنال حقيقي، فتقدر تكتب جوه |
| [[mongo]] | اسم الـ container (اللي اديته في [[--name]] في الـ lab) |
| [[mongosh]] | الأمر اللي هيتشغّل جوه؛ جاي جاهز مع صورة mongo الرسمية |
| [[-u admin]] | user: اسم اليوزر |
| [[-p secret]] | password: الباسورد |

وأول ما يدخل بيطبع ده (اتشغّل فعلًا):

~~~text الناتج
Current Mongosh Log ID:	6ac4f9dce2ceb213c4d5e2f9
Connecting to:		mongodb://<credentials>@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.12.0
Using MongoDB:		8.3.11
Using Mongosh:		2.12.0
------
   The server generated these startup warnings when booting
   ...: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine...
------
test>
~~~

- [[Connecting to]]: الرابط اللي mongosh بناه من الـ flags. الباسورد متخبّي مكانه [[<credentials>]]، و [[127.0.0.1:27017]] لأننا جوه نفس الـ container اللي فيه السيرفر.
- [[Using MongoDB: 8.3.11]]: نسخة السيرفر، و [[Using Mongosh]] نسخة الـ shell. الاتنين منفصلين.
- الـ warnings: نصايح للإنتاج على لينكس حقيقي (نوع الـ filesystem والـ swap). على جهاز تجربة تجاهلها.
- [[test>]]: الـ prompt. الكلمة اللي قبل [[>]] اسم القاعدة اللي انت واقف عليها، و [[test]] هي الافتراضية لو مقلتش حاجة.

جوه الـ prompt اكتب:

~~~text
test> db.version()
8.3.11
test> exit
~~~

[[db.version()]] بتسأل السيرفر عن نسخته، و [[exit]] ترجّعك لترمنالك. وكل اللي بتكتبه هنا JavaScript، لأن mongosh مبني على Node.

---

## ٢. برابط كامل

~~~bash
mongosh "mongodb://admin:secret@localhost:27017/?authSource=admin"
~~~

ده لو mongosh متسطّب على جهازك نفسه (مش جوه الـ container). الرابط اسمه **connection string**، ونقراه كده:

~~~text تشريح الرابط
mongodb://   admin   :   secret   @   localhost   :   27017   /   ?authSource=admin
 البروتوكول   اليوزر       الباسورد        السيرفر          البورت        الإعدادات
~~~

- [[mongodb://]]: نوع الرابط، زي [[https://]] بس لـ Mongo.
- [[admin:secret@]]: اليوزر وبعده [[:]] والباسورد، والـ [[@]] بتفصلهم عن السيرفر.
- [[localhost:27017]]: السيرفر والبورت. 27017 هو بورت Mongo الافتراضي.
- [[/]] وبعدها فاضي: مفيش قاعدة محددة، فهتقف على [[test]].
- [[?authSource=admin]]: بعد علامة الاستفهام إعدادات. الإعداد ده بيقول «اليوزر ده متسجّل في قاعدة اسمها admin، دوّر عليه هناك».

### ليه [[authSource]] مهمة؟

اليوزر اللي بيتعمل من [[MONGO_INITDB_ROOT_USERNAME]] بيتخزن في قاعدة [[admin]]. ولو كتبت اسم قاعدة في الرابط من غير [[authSource]]، mongosh بيدوّر على اليوزر في القاعدة دي نفسها. جرّبتها:

~~~bash
mongosh "mongodb://admin:secret@localhost:27017/myapp" --quiet --eval "db.getName()"
~~~

~~~text الناتج
MongoServerError: Authentication failed.
~~~

الباسورد صح، بس اليوزر مش في myapp. نفس الرابط بـ [[?authSource=admin]] في الآخر بيدخل عادي.

---

## ٣. من غير ما الباسورد يظهر

~~~bash
mongosh "mongodb://localhost:27017/myapp" -u admin --authenticationDatabase admin
~~~

- الرابط فيه [[/myapp]]: هتدخل واقف على قاعدة myapp على طول.
- [[-u admin]] من غير [[-p]]: mongosh هيسألك [[Enter password:]] والحروف مش هتظهر وانت بتكتب، فالباسورد مش هيتسجّل في الـ history بتاع الترمنال ([[~/.bash_history]]).
- [[--authenticationDatabase admin]]: نفس [[authSource=admin]] بس كـ flag.

---

## ٤. أمر واحد واخرج

~~~bash
mongosh "mongodb://admin:secret@localhost:27017/?authSource=admin" --quiet --eval "db.adminCommand('ping')"
~~~

| الجزء | بيعمل إيه |
|---|---|
| [[--eval "..."]] | نفّذ الكود ده بس واخرج، من غير prompt |
| [[--quiet]] | من غير رسالة الترحيب والـ warnings |
| [[db.adminCommand('ping')]] | ابعت للسيرفر أمر إداري اسمه ping («انت صاحي؟») |

~~~text الناتج
{ ok: 1 }
~~~

[[ok: 1]] يعني السيرفر رد. دي اللي هتحطها في السكربتات والـ healthcheck. وملحوظة جرّبتها: ping بيرد [[{ ok: 1 }]] حتى من غير يوزر وباسورد، لكن أي أمر بيقرا داتا من غير login بيترفض:

~~~text الناتج من غير -u
MongoServerError: Command listDatabases requires authentication
~~~

---

## الأخطاء اللي هتقابلها

| الرسالة | السبب |
|---|---|
| [[mongo: command not found]] أو [[executable file not found]] | الأمر القديم [[mongo]] اتشال من MongoDB 6، اكتب [[mongosh]] |
| [[Authentication failed.]] | باسورد غلط، أو ناقص [[authSource=admin]] |
| [[requires authentication]] | دخلت من غير [[-u]] |
| [[No such container: mongo]] | الـ container مش شغال أو اسمه مختلف، شوف [[docker ps]] |

## الخلاصة

- [[mongosh]] هو الـ shell، و [[mongod]] هو السيرفر.
- يا رابط كامل، يا [[-u]] و [[-p]] و [[--authenticationDatabase]].
- يوزر الـ root متخزن في [[admin]]، فلازم [[authSource=admin]].
- [[--quiet --eval]] للسكربتات، و [[ping]] أسرع فحص إن السيرفر صاحي.`,
          lines: [
            "ادخل على mongosh جوه الـ container باليوزر admin.",
            "نفس الحاجة من جهازك برابط كامل، واليوزر متخزن في admin.",
            "من غير -p: هيسألك الباسورد وميظهرش.",
            "نفّذ أمر واحد واخرج: السيرفر بيرد؟"
          ],
          sol: R`بعد أول سطر هتلاقي الـ prompt [[test>]]، يعني انت متصل وواقف على قاعدة اسمها test (دي الافتراضية). و [[db.version()]] بيرجّع نسخة السيرفر، زي [[8.3.11]] مع image [[mongo:8]]. و [[exit]] بيرجّعك للترمنال.

لو طلعلك [[MongoServerError: Authentication failed.]] يبقى اليوزر أو الباسورد غلط، أو الأشهر: اتصلت بـ URI فيه اسم قاعدة ([[/myapp]]) من غير [[?authSource=admin]]، فـ mongosh دوّر على اليوزر admin جوه myapp ومالقاهوش. ولو [[Error: No such container: mongo]] يبقى الـ lab مش شغال أو اسم الـ container مختلف، شوف [[docker ps]]. ولو اتصلت من غير [[-u]] هيدخلك عادي، بس أول أمر حقيقي هيقول [[requires authentication]].`
        },
        {
          cmd: "show dbs و use",
          title: "اتنقّل بين القواعد والـ collections",
          desc: R`جوه mongosh: [[show dbs]] القواعد، و [[use]] تدخل قاعدة، و [[show collections]] الجداول اللي فيها (اسمها collections). والمتغير [[db]] بيشاور دايمًا على القاعدة اللي انت فيها.

القاعدة مش لازم تتعمل قبل كده: [[use shop]] بيحوّلك عليها، وأول ما تكتب فيها مستند بتتعمل.`,
          example: R`show dbs
use myapp
show collections
db.getName()
db.users.countDocuments()
db.users.findOne()
exit`,
          try: R`ادخل الـ lab، واكتب [[use lab]] وبعدين [[show dbs]]: مش هتلاقيها. اكتب [[db.notes.insertOne({ text: "hi" })]] وارجع [[show dbs]].`,
          flag: "script",
          deep: {
            why: "أول حاجة بتعملها في أي قاعدة جديدة عليك: فيها إيه، وأنهي collection فيه البيانات، وشكل المستند عامل إزاي.",
            how: R`MongoDB: سيرفر فيه قواعد، والقاعدة فيها collections (زي الجداول)، والـ collection فيها documents (زي الصفوف، بس كل واحد JSON ممكن يختلف عن التاني).

[[show dbs]] مش بيعرض القواعد الفاضية. وهتلاقي دايمًا [[admin]] (اليوزرز والصلاحيات) و [[config]] و [[local]]: دول بتوع Mongo نفسه، متلعبش فيهم.

[[use myapp]] بيغيّر [[db]]. بعدها [[db.users]] معناها collection اسمها users في myapp. [[countDocuments()]] العدد، و [[findOne()]] أول مستند، ودي أسرع طريقة تشوف شكل البيانات.

في السكربتات و [[--eval]] الأضمن [[db.getSiblingDB('myapp')]] بدل use، لأنه JavaScript عادي.`,
            when: "أول ما تدخل على قاعدة. وقبل أي تعديل: اتأكد انت في أنهي قاعدة بـ [[db.getName()]].",
            mistakes: R`تغلط في اسم الـ collection ([[db.user]] بدل [[db.users]]) فيرجعلك صفر وتفتكر البيانات اتمسحت. Mongo مش بيطلع error على اسم مش موجود.`
          },
          teach: R`## الترتيب: سيرفر ← قواعد ← collections ← documents

قبل الأوامر، لازم تعرف Mongo مترتب إزاي، لأن كل أمر هنا بيتحرك في مستوى من دول:

| Mongo | المقابل في SQL | مثال |
|---|---|---|
| server | السيرفر | الـ container اللي شغال |
| database | database | [[myapp]] |
| collection | table | [[users]] |
| document | row | [[{ name: 'Sara', email: '...' }]] |

الفرق إن الـ documents في نفس الـ collection مش لازم يبقى ليهم نفس الحقول. الأوامر دي بتتكتب جوه mongosh (بعد ما تدخل بأمر الدرس اللي فات)، واتشغّلت على [[mongo:8]] بعد ما ضفت يوزرين وأوردر في myapp.

---

## ١. [[show dbs]]

~~~text
test> show dbs
admin   100.00 KiB
config   12.00 KiB
lab       8.00 KiB
local    40.00 KiB
myapp    16.00 KiB
~~~

كل سطر قاعدة وحجمها على الديسك (KiB = 1024 بايت). التلاتة [[admin]] و [[config]] و [[local]] موجودين دايمًا وبتوع Mongo نفسه: [[admin]] فيها اليوزرز والصلاحيات، و [[local]] فيها حاجات السيرفر ده بس (زي سجل الـ replication)، و [[config]] لإعدادات داخلية. متكتبش فيهم.

[[show]] مش JavaScript، ده أمر خاص بالـ shell (اسمه helper). عشان كده مفيش أقواس.

---

## ٢. [[use myapp]]

~~~text
test> use myapp
switched to db myapp
myapp>
~~~

الـ prompt اتغير من [[test>]] لـ [[myapp>]]. اللي حصل فعلًا: mongosh غيّر قيمة متغير اسمه [[db]] عنده. مفيش حاجة اتبعتت للسيرفر ولا اتعملت على الديسك.

---

## ٣. [[show collections]]

~~~text
myapp> show collections
orders
users
~~~

الـ collections اللي في القاعدة الحالية. لو القاعدة فاضية مش هيطبع حاجة خالص.

---

## ٤. [[db.getName()]]

~~~text
myapp> db.getName()
myapp
~~~

[[db]] المتغير اللي بيشاور على القاعدة الحالية، و [[.getName()]] دالة عليه بترجّع اسمها. النقطة معناها «من الحاجة اللي قبلي، هات الدالة دي»، والأقواس [[()]] معناها «نفّذها». مفيدة جدًا قبل أي أمر خطير: تتأكد انت فين.

---

## ٥. [[db.users.countDocuments()]]

~~~text
myapp> db.users.countDocuments()
2
~~~

اقراها من الشمال: القاعدة الحالية ← الـ collection اللي اسمها users ← اعدّ المستندات. [[db.users]] بتجيب الـ collection بالاسم بس، حتى لو مش موجودة: [[db.user.countDocuments()]] (من غير s) رجّعلي [[0]] من غير أي error.

---

## ٦. [[db.users.findOne()]]

~~~text
myapp> db.users.findOne()
{
  _id: ObjectId('6ac4f9ea2025d48c2f7b5ced'),
  name: 'Sara',
  email: 'sara@example.com'
}
~~~

أول مستند في الـ collection. ده أسرع طريقة تشوف «الداتا شكلها إيه». الـ [[_id]] حقل Mongo بيعمله لوحده لكل مستند، و [[ObjectId]] نوعه (رقم فريد ١٢ بايت مكتوب hex). ولو الـ collection فاضية بيرجّع [[null]].

---

## ٧. [[exit]]

بيقفل mongosh ويرجّعك للترمنال.

---

## القاعدة بتتعمل لوحدها

اتشغّل كده بالظبط:

~~~text
lab> use lab
switched to db lab
lab> show dbs
admin   100.00 KiB
config   12.00 KiB
local    40.00 KiB
lab> db.notes.insertOne({ text: "hi" })
{
  acknowledged: true,
  insertedId: ObjectId('6ac4f9e496fb9c25aa8e851e')
}
lab> show dbs
admin   100.00 KiB
config   12.00 KiB
lab       8.00 KiB
local    40.00 KiB
~~~

بعد [[use lab]] القاعدة مش في [[show dbs]]. أول مستند اتكتب هو اللي عمل القاعدة والـ collection مع بعض. يعني [[use]] على اسم غلط مش هيقولك حاجة، هيوديك قاعدة فاضية.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[show dbs]] | القواعد اللي فيها داتا |
| [[use X]] | غيّر [[db]] للقاعدة X (من غير ما يعمل حاجة) |
| [[show collections]] | الـ collections في القاعدة الحالية |
| [[db.getName()]] | انت فين |
| [[db.X.countDocuments()]] | العدد |
| [[db.X.findOne()]] | شكل مستند |

وفي [[--eval]] والسكربتات استخدم [[db.getSiblingDB('myapp')]] بدل [[use]]، لأنها JavaScript عادي بترجّع القاعدة.`,
          lines: [
            "القواعد اللي فيها بيانات وحجمها.",
            "ادخل قاعدة myapp.",
            "الـ collections اللي فيها.",
            "انت في أنهي قاعدة دلوقتي.",
            "عدد المستندات في users.",
            "أول مستند: تشوف شكل البيانات.",
            "اخرج."
          ],
          sol: R`بعد [[use lab]] الـ prompt بقى [[lab>]] وكتب [[switched to db lab]]، بس [[show dbs]] بيعرض [[admin]] و [[config]] و [[local]] بس، ومفيش lab.

بعد [[db.notes.insertOne({ text: "hi" })]] الرد فيه [[acknowledged: true]] و [[insertedId: ObjectId('...')]]، و [[show dbs]] بقى فيه سطر [[lab  8.00 KiB]].

السبب إن Mongo بيعمل القاعدة والـ collection بشكل كسول: [[use]] بيغيّر المتغير [[db]] في الـ shell بس، ومفيش حاجة بتتكتب على الديسك لحد أول مستند. عشان كده غلطة في اسم القاعدة (مثلًا [[use myap]]) مش بتطلع أي error، وتلاقي نفسك بتدوّر على داتا مش موجودة. عادة كويسة تكتب [[db.getName()]] قبل أي أمر مهم.`
        },
        {
          cmd: "insertOne و find",
          title: "اكتب مستندات واقراها بشرط",
          desc: R`[[insertOne]] بيضيف مستند، و [[insertMany]] كذا واحد. و [[find]] بياخد شرط زي WHERE، وتاني argument بيحدد الحقول اللي ترجع.

الشروط بعلامات زي [[$gt]] (أكبر من) و [[$in]] (واحد من)، و [[sort]] و [[limit]] بيتركبوا بعد find.`,
          example: R`use lab
db.users.insertOne({ name: "Sara", email: "sara@example.com", age: 28 })
db.users.insertMany([{ name: "Omar", age: 35 }, { name: "Mona", age: 17 }])
db.users.find()
db.users.find({ age: { $gt: 25 } }, { name: 1, _id: 0 })
db.users.find({ name: { $in: ["Sara", "Mona"] } })
db.users.find().sort({ age: -1 }).limit(2)
db.users.countDocuments({ age: { $gte: 18 } })`,
          try: "في قاعدة lab ضيف ٥ يوزرز بأعمار مختلفة، وهات أكبر اتنين سنًا بأسمائهم بس.",
          flag: "script",
          deep: {
            why: "ده ٩٠٪ من الشغل اليومي: تكتب بيانات تجربة، وتدوّر على مستند معيّن عشان تفهم bug، وتعدّ.",
            how: R`المستند بيتخزن بصيغة BSON (JSON بأنواع زيادة زي Date و ObjectId). لو مكتبتش [[_id]]، Mongo بيعمله لوحده [[ObjectId]] فريد. والـ collection بتتعمل مع أول insert.

[[find(شرط, حقول)]]: الشرط [[{ age: 28 }]] مساواة، و [[{ age: { $gt: 25 } }]] أكبر من. فيه [[$gte]] و [[$lt]] و [[$lte]] و [[$ne]] و [[$in]]. أكتر من حقل في نفس الشرط معناها AND.

الحقول: [[{ name: 1, _id: 0 }]] رجّع name بس. و _id بيرجع دايمًا إلا لو قلت 0.

[[find()]] بيرجع cursor: mongosh بيعرض أول ٢٠، واكتب [[it]] للباقي. [[sort({ age: -1 })]] تنازلي، و 1 تصاعدي.`,
            when: "تجربة، وتدوير على بيانات، وفهم شكل الـ collection قبل ما تكتب كود.",
            mistakes: R`تدوّر بـ [[{ age: "28" }]] (نص) والمخزن رقم فمترجعش حاجة: Mongo مش بيحوّل الأنواع. ومفيش schema يمنعك: اسم حقل غلط في insert بيتكتب زي ما هو، ومحدش هيقولك.`
          },
          teach: R`## الكتابة بـ insert والقراية بـ find

كل سطر في المثال شكله واحد: [[db.<collection>.<دالة>(...)]]. والحاجات اللي جوه الأقواس objects بتاعة JavaScript: أقواس معقوفة [[{ }]] وجواها [[اسم: قيمة]] مفصولين بفاصلة. كله اتشغّل في mongosh على [[mongo:8]] على قاعدة lab فاضية.

---

## ١. [[use lab]]

بيحوّلك على قاعدة lab. لو مش موجودة، هتتعمل مع أول insert.

---

## ٢. [[insertOne]]: مستند واحد

~~~javascript
db.users.insertOne({ name: "Sara", email: "sara@example.com", age: 28 })
~~~

المستند فيه ٣ حقول: نصين ورقم. لاحظ إن [[28]] من غير علامات تنصيص، فبيتخزن **رقم** مش نص، ودا هيفرق في البحث بعدين.

~~~text الناتج
{
  acknowledged: true,
  insertedId: ObjectId('6ac4f9f0a32194e5d8a43c04')
}
~~~

- [[acknowledged: true]]: السيرفر استلم الكتابة وأكدها.
- [[insertedId]]: احنا مكتبناش [[_id]]، فـ Mongo عمله لوحده. [[ObjectId]] رقم فريد ١٢ بايت، أوله وقت الإنشاء بالثواني، فالـ ids اللي بتتعمل ورا بعض شبه بعض في البداية.

---

## ٣. [[insertMany]]: كذا مستند

~~~javascript
db.users.insertMany([{ name: "Omar", age: 35 }, { name: "Mona", age: 17 }])
~~~

الأقواس المربعة [[[ ]]] معناها array (قايمة)، وكل عنصر فيها مستند. ولاحظ إن المستندين دول مفيهومش email، ومحدش اعترض: مفيش schema.

~~~text الناتج
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6ac4f9f0a32194e5d8a43c05'),
    '1': ObjectId('6ac4f9f0a32194e5d8a43c06')
  }
}
~~~

[[insertedIds]] بالجمع: لكل مستند رقمه في الـ array ([['0']] و [['1']]) والـ id اللي اتعمله.

---

## ٤. [[find()]]: الكل

~~~text الناتج
[
  {
    _id: ObjectId('6ac4f9f0a32194e5d8a43c04'),
    name: 'Sara',
    email: 'sara@example.com',
    age: 28
  },
  { _id: ObjectId('6ac4f9f0a32194e5d8a43c05'), name: 'Omar', age: 35 },
  { _id: ObjectId('6ac4f9f0a32194e5d8a43c06'), name: 'Mona', age: 17 }
]
~~~

من غير أي حاجة جوه الأقواس = من غير شرط. mongosh بيعرض أول ٢٠ بس، ولو فيه أكتر هيكتبلك [[Type "it" for more]].

---

## ٥. شرط ومعاه اختيار حقول

~~~javascript
db.users.find({ age: { $gt: 25 } }, { name: 1, _id: 0 })
~~~

[[find]] بياخد حاجتين مفصولين بفاصلة:

| الـ argument | القيمة | معناها |
|---|---|---|
| الأول: الشرط (filter) | [[{ age: { $gt: 25 } }]] | العمر أكبر من 25 |
| التاني: الحقول (projection) | [[{ name: 1, _id: 0 }]] | رجّع name، ومن غير _id |

[[$gt]] اختصار greater than. أي حاجة بتبدأ بـ [[$]] في Mongo اسمها **operator**، يعني كلمة خاصة مش اسم حقل. أخواتها:

| operator | اختصار | معناه |
|---|---|---|
| [[$gt]] | greater than | أكبر من |
| [[$gte]] | greater than or equal | أكبر من أو يساوي |
| [[$lt]] | less than | أصغر من |
| [[$lte]] | less than or equal | أصغر من أو يساوي |
| [[$ne]] | not equal | لا يساوي |
| [[$in]] | in | واحد من القايمة |

وفي الـ projection: [[1]] رجّع الحقل، و [[0]] متجيبوش. الـ [[_id]] بيرجع دايمًا إلا لو قلت [[0]].

~~~text الناتج
[ { name: 'Sara' }, { name: 'Omar' } ]
~~~

Mona (17) مش موجودة لأنها مش أكبر من 25.

---

## ٦. [[$in]]

~~~javascript
db.users.find({ name: { $in: ["Sara", "Mona"] } })
~~~

الاسم يساوي أي واحد من اللي في القايمة. رجّع مستند Sara ومستند Mona كاملين (مفيش projection).

---

## ٧. ترتيب وحد

~~~javascript
db.users.find().sort({ age: -1 }).limit(2)
~~~

دي سلسلة: [[find()]] بيرجّع حاجة اسمها **cursor** (مؤشر على النتايج، لسه متجابتش)، و [[.sort()]] و [[.limit()]] بيتركبوا عليه قبل ما النتايج تيجي.

- [[sort({ age: -1 })]]: رتّب بالعمر، و [[-1]] تنازلي (الأكبر الأول)، و [[1]] تصاعدي.
- [[limit(2)]]: أول اتنين بس.

~~~text الناتج
[
  { _id: ObjectId('6ac4f9f0a32194e5d8a43c05'), name: 'Omar', age: 35 },
  {
    _id: ObjectId('6ac4f9f0a32194e5d8a43c04'),
    name: 'Sara',
    email: 'sara@example.com',
    age: 28
  }
]
~~~

---

## ٨. العدّ بشرط

~~~javascript
db.users.countDocuments({ age: { $gte: 18 } })
~~~

~~~text الناتج
2
~~~

Sara و Omar. نفس الشرط بالظبط ينفع في [[find]] و [[countDocuments]] و [[deleteMany]]، ودي ميزة: تجرّب الشرط بالعدّ الأول.

---

## الفخ: نوع القيمة

~~~javascript
db.users.find({ age: "28" }).toArray()
~~~

~~~text الناتج
[]
~~~

العمر متخزن رقم [[28]]، والشرط نص [["28"]]، و Mongo مش بيحوّل. مفيش error، بس مفيش نتيجة.

## الخلاصة

- [[insertOne(مستند)]] و [[insertMany([مستندات])]]، و [[_id]] بيتعمل لوحده.
- [[find(شرط, حقول)]]، والشرط بـ operators بتبدأ بـ [[$]].
- [[.sort()]] و [[.limit()]] بيتركبوا على الـ cursor.
- النوع لازم يطابق: [[28]] غير [["28"]].`,
          lines: [
            "ادخل قاعدة lab (بتتعمل مع أول كتابة).",
            "ضيف مستند واحد، و _id بيتعمل لوحده.",
            "ضيف كذا مستند مرة واحدة.",
            "كل المستندات.",
            "اللي عمرهم أكبر من ٢٥، والاسم بس من غير _id.",
            "اللي اسمهم واحد من دول.",
            "أكبر اتنين سنًا.",
            "عدد اللي عمرهم ١٨ أو أكتر."
          ],
          sol: R`الحل: [[insertMany]] بخمس يوزرز، وبعدين sort تنازلي بالعمر و limit 2، مع projection للاسم بس. في التجربة الأعمار كانت 28 و 35 و 17 و 42 و 23، والناتج:

[[[ { name: 'Ali' }, { name: 'Omar' } ]]]

لو عايز تتأكد إن الترتيب صح، ضيف [[age: 1]] للـ projection مؤقتًا: هيطلع [[{ name: 'Ali', age: 42 }]] و [[{ name: 'Omar', age: 35 }]].

الأخطاء الشائعة: تنسى الـ sort فتاخد أول اتنين اتضافوا ([[Sara]] و [[Omar]] في تجربتي)، وده مش مضمون أصلًا. أو تكتب [[{ age: 1 }]] وانت عايز تنازلي فتاخد الأصغر. أو تنسى [[_id: 0]] فيظهر الـ [[_id]] مع الاسم. ولو خزنت العمر كـ نص [["28"]] الترتيب هيبقى أبجدي مش رقمي.`,
          solCode: R`use lab
db.users.insertMany([
  { name: "Sara", email: "sara@example.com", age: 28 },
  { name: "Omar", age: 35 },
  { name: "Mona", age: 17 },
  { name: "Ali", age: 42 },
  { name: "Hana", age: 23 }
])
db.users.find({}, { name: 1, _id: 0 }).sort({ age: -1 }).limit(2)`
        },
        {
          cmd: "updateOne",
          title: "عدّل حقل من غير ما تمسح الباقي",
          desc: R`[[updateOne(شرط, تعديل)]] بيعدّل أول مستند يطابق الشرط، و [[updateMany]] كلهم. والتعديل لازم يبقى بعلامة زي [[$set]] (غيّر قيمة) أو [[$inc]] (زوّد رقم).

[[upsert: true]] معناها: لو ملقتش، اعمل مستند جديد.`,
          example: R`db.users.updateOne({ email: "sara@example.com" }, { $set: { age: 29 } })
db.users.updateOne({ email: "sara@example.com" }, { $inc: { logins: 1 } })
db.users.updateOne({ email: "sara@example.com" }, { $unset: { tempToken: "" } })
db.users.updateMany({ age: { $lt: 18 } }, { $set: { minor: true } })
db.users.updateOne({ email: "new@example.com" }, { $set: { name: "New" } }, { upsert: true })`,
          try: R`في lab عدّل عمر يوزر بـ [[$set]]، وزوّد عداد بـ [[$inc]] مرتين، وشوف النتيجة بـ findOne.`,
          flag: "script",
          deep: {
            why: "تصليح بيانات يوزر، أو إضافة حقل جديد لكل المستندات القديمة بعد تغيير في الكود، أو عداد يزيد من غير ما تقرا وتكتب.",
            how: R`النتيجة بترجع [[matchedCount]] (كام مستند طابق) و [[modifiedCount]] (كام اتغير فعلًا). لو matched صفر، الشرط غلط.

[[$set]] بيغيّر أو بيضيف الحقل ويسيب الباقي زي ما هو. [[$unset]] بيشيل الحقل. [[$inc]] بيزوّد في خطوة واحدة على السيرفر، فلو طلبين جم مع بعض الاتنين بيتحسبوا (مش زي إنك تقرا وتزوّد في الكود وتكتب).

[[updateMany({}, ...)]] بشرط فاضي بيعدّل كل الـ collection. شغّل نفس الشرط بـ [[countDocuments]] الأول.

[[replaceOne]] مختلف: بيستبدل المستند كله باللي بعته، وأي حقل مش مكتوب بيروح.`,
            when: "تصليح بيانات بإيدك، و data migrations صغيرة، وعدادات.",
            mistakes: R`تكتب التعديل من غير [[$set]]: في mongosh بيطلع error، بس في الـ shell القديم وبعض الكود بيبقى replace فالمستند يفقد كل حقوله. و Mongoose بيلف [[$set]] لوحده فتتعوّد، وبعدين في mongosh تتفاجئ.`
          },
          teach: R`## [[updateOne(شرط, تعديل, اختيارات)]]

كل سطر في المثال فيه نفس الشكل: الأول **مين** (الشرط، زي find)، وبعده **إيه اللي يتغير** (operator زي [[$set]])، واختياري تالت للإعدادات. اتشغّل في mongosh على [[mongo:8]] على قاعدة lab بعد الدرس اللي فات (Sara عمرها 28، وضفتلها [[tempToken]] الأول عشان سطر [[$unset]] يلاقي حاجة يشيلها).

---

## ١. [[$set]]: غيّر قيمة

~~~javascript
db.users.updateOne({ email: "sara@example.com" }, { $set: { age: 29 } })
~~~

- الشرط [[{ email: "sara@example.com" }]]: المستند اللي الإيميل بتاعه كده. [[updateOne]] بيعدّل **أول** واحد يطابق بس.
- [[{ $set: { age: 29 } }]]: خلّي age = 29، وأي حقل تاني يفضل زي ما هو. ولو الحقل مش موجود بيضيفه.

~~~text الناتج
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
~~~

| الحقل | معناه |
|---|---|
| [[matchedCount]] | كام مستند طابق الشرط |
| [[modifiedCount]] | كام واحد اتغير فعلًا |
| [[upsertedCount]] و [[insertedId]] | لو اتعمل مستند جديد (مع upsert، تحت) |

شغّلت نفس السطر تاني والعمر أصلًا 29:

~~~text الناتج
matchedCount: 1,
modifiedCount: 0,
~~~

لقاه، بس ملقاش حاجة يغيّرها. ولو [[matchedCount: 0]] يبقى الشرط مالقاش حاجة، ومفيش error، فبص على الرقم دايمًا.

---

## ٢. [[$inc]]: زوّد رقم

~~~javascript
db.users.updateOne({ email: "sara@example.com" }, { $inc: { logins: 1 } })
~~~

[[$inc]] اختصار increment. بيزوّد [[logins]] بـ 1 على السيرفر نفسه. الحقل ماكانش موجود، فاتعمل بـ 0 واتزوّد عليه. ولو كتبت [[-1]] بينقص.

ليه مش تقرا القيمة وتزوّد في الكود وتكتبها؟ لأن لو طلبين جم في نفس اللحظة، الاتنين هيقروا 5 ويكتبوا 6، وتضيع زيادة. [[$inc]] بيتنفّذ خطوة واحدة على السيرفر، فالاتنين بيتحسبوا.

---

## ٣. [[$unset]]: شيل حقل

~~~javascript
db.users.updateOne({ email: "sara@example.com" }, { $unset: { tempToken: "" } })
~~~

بيشيل الحقل من المستند خالص. القيمة [[""]] مش مهمة، أي حاجة؛ المهم اسم الحقل.

---

## ٤. [[updateMany]]: كل اللي يطابق

~~~javascript
db.users.updateMany({ age: { $lt: 18 } }, { $set: { minor: true } })
~~~

كل اللي عمره أقل من 18 ياخد [[minor: true]]. هنا [[matchedCount: 1]] لأن Mona بس. وخلي بالك: [[updateMany({}, ...)]] بشرط فاضي بيعدّل الـ collection كلها، فجرّب الشرط بـ [[countDocuments]] الأول.

---

## ٥. [[upsert]]: عدّل ولو مش موجود اعمله

~~~javascript
db.users.updateOne({ email: "new@example.com" }, { $set: { name: "New" } }, { upsert: true })
~~~

[[upsert]] = update + insert. الـ argument التالت [[{ upsert: true }]] بيقول: لو ملقتش حد بالإيميل ده، اعمل مستند جديد.

~~~text الناتج
{
  acknowledged: true,
  insertedId: ObjectId('6ac4f9f763a18ec3c7dd0c07'),
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 1
}
~~~

والمستند الجديد شكله:

~~~text الناتج
{
  _id: ObjectId('6ac4f9f763a18ec3c7dd0c07'),
  email: 'new@example.com',
  name: 'New'
}
~~~

لاحظ إن [[email]] اتاخد من الشرط نفسه، و [[name]] من الـ [[$set]].

---

## النتيجة على Sara

~~~text db.users.findOne({ email: "sara@example.com" })
{
  _id: ObjectId('6ac4f9f0a32194e5d8a43c04'),
  name: 'Sara',
  email: 'sara@example.com',
  age: 29,
  logins: 1
}
~~~

العمر اتغير، و logins اتضاف، و tempToken اتشال، والاسم والإيميل زي ما هم.

---

## لو نسيت الـ operator

~~~javascript
db.users.updateOne({ email: "sara@example.com" }, { age: 30 })
~~~

~~~text الناتج
Uncaught MongoInvalidArgumentError: Update document requires atomic operators
~~~

mongosh رفض، ودي حماية: المستند من غير [[$]] معناه «استبدل المستند كله»، ودي شغلة [[replaceOne]]، وكانت هتمسح name و email.

## الخلاصة

| operator | بيعمل إيه |
|---|---|
| [[$set]] | غيّر أو ضيف حقل |
| [[$inc]] | زوّد/نقّص رقم على السيرفر |
| [[$unset]] | شيل حقل |
| [[upsert: true]] | لو مفيش، اعمل جديد |

وبص دايمًا على [[matchedCount]] و [[modifiedCount]].`,
          lines: [
            "غيّر العمر بس، والباقي زي ما هو.",
            "زوّد عداد الدخول ١ على السيرفر.",
            "شيل حقل من المستند.",
            "علّم كل اللي أقل من ١٨.",
            "عدّل، ولو مش موجود اعمله."
          ],
          sol: R`كل updateOne ناجحة بترجّع [[matchedCount: 1]] و [[modifiedCount: 1]]. وبعد [[$set]] للعمر و [[$inc]] مرتين، [[findOne]] بيطلّع:

[[{ _id: ObjectId('...'), name: 'Sara', email: 'sara@example.com', age: 29, logins: 2 }]]

الحقل [[logins]] ما كانش موجود، و [[$inc]] عمله بـ 0 وزوّد عليه.

علامات الغلط: [[matchedCount: 0]] يعني الفلتر مالقاش حاجة (غلطة في الإيميل مثلًا)، ومفيش error فممكن تفوتك. و [[modifiedCount: 0]] مع [[matchedCount: 1]] يعني القيمة كانت كده أصلًا. ولو كتبت [[updateOne({ email: ... }, { age: 30 })]] من غير [[$set]]، mongosh بيرفض بـ [[MongoInvalidArgumentError: Update document requires atomic operators]]؛ دي حماية، لأن الشكل ده في [[replaceOne]] كان هيمسح كل الحقول التانية.`,
          solCode: R`db.users.updateOne({ email: "sara@example.com" }, { $set: { age: 29 } })
db.users.updateOne({ email: "sara@example.com" }, { $inc: { logins: 1 } })
db.users.updateOne({ email: "sara@example.com" }, { $inc: { logins: 1 } })
db.users.findOne({ email: "sara@example.com" })`
        },
        {
          cmd: "deleteOne و deleteMany",
          title: "امسح مستندات من غير ما تمسح الـ collection كلها",
          desc: R`[[deleteOne]] بيمسح أول مستند يطابق، و [[deleteMany]] كل اللي يطابق. مفيش سلة ولا تأكيد ولا undo.

القاعدة: شغّل نفس الشرط بـ [[find]] الأول، ولو النتيجة هي اللي عايزها غيّر find لـ delete. و [[deleteMany({})]] بشرط فاضي بيمسح كل حاجة.`,
          example: R`export MONGO_URI="mongodb://admin:secret@localhost:27017/lab?authSource=admin"
mongosh "$MONGO_URI" --quiet --eval 'db.users.find({ age: { $lt: 18 } }).toArray()'
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteMany({ age: { $lt: 18 } })'
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteOne({ email: "sara@example.com" })'
# خطر: الاتنين دول بيمسحوا كل حاجة في الـ collection
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteMany({})'
mongosh "$MONGO_URI" --quiet --eval 'db.users.drop()'`,
          try: R`في قاعدة lab بس: شغّل الـ find وشوف العدد، وبعدين الـ deleteMany بنفس الشرط، وقارن [[deletedCount]] بالعدد.`,
          flag: "danger",
          deep: {
            why: "مسح بيانات تجربة، أو يوزر طلب حذف حسابه، أو تنضيف مستندات قديمة. وده أسرع طريقة تضيّع بيانات حقيقية في ثانية.",
            how: R`النتيجة بترجع [[deletedCount]]. [[deleteMany({})]] بيمسح كل المستندات بس الـ collection والـ indexes بتفضل. [[drop()]] بيشيل الـ collection كلها بالـ indexes. و [[db.dropDatabase()]] القاعدة كلها.

المثال بيشغّل كل حاجة من الترمنال بـ [[--eval]] ورابط في متغير، فتقدر تحطها في سكربت. والعلامات المفردة حوالين الأمر عشان bash ميلمسش [[$lt]].

لو محتاج ترجع، مفيش غير الباك أب. عشان كده قبل أي مسح كبير على الإنتاج: [[mongodump]] للـ collection دي (في المستوى ٣).`,
            when: "تنضيف بيانات، وحذف حسابات، وقبله دايمًا find بنفس الشرط.",
            mistakes: R`شرط جاي من الكود قيمته undefined: الـ driver ممكن يحوّله null أو Mongoose ممكن يشيله، فيبقى الشرط أوسع من اللي انت فاكره أو فاضي خالص ويمسح كله. اتأكد إن القيمة موجودة قبل أي delete. وتشغّل الأمر وانت على قاعدة الإنتاج وفاكر نفسك على المحلي: بص على [[db.getName()]] والرابط.`
          },
          teach: R`## المسح من الترمنال: شوف الأول، وبعدين امسح

المرة دي الأوامر مش جوه mongosh، دي في **bash** (ترمنال لينكس أو الماك أو WSL أو Git Bash)، وكل سطر بيفتح mongosh ينفّذ أمر واحد ويخرج. ده الشكل اللي هتستخدمه في السكربتات. اتشغّل كله جوه container من [[mongo:8]] (فيه bash و mongosh) على قاعدة lab من الدروس اللي فاتت.

---

## ١. الرابط في متغير

~~~bash
export MONGO_URI="mongodb://admin:secret@localhost:27017/lab?authSource=admin"
~~~

- [[MONGO_URI=...]]: متغير في الـ shell اسمه MONGO_URI وقيمته الرابط. مفيش مسافات حوالين [[=]] في bash.
- [[export]]: يخلي المتغير متاح للبرامج اللي هتتشغّل من الترمنال ده كمان.
- الرابط فيه [[/lab]]، فكل الأوامر هتشتغل على قاعدة lab على طول، و [[authSource=admin]] لأن اليوزر root متخزن في admin.

بعدها في كل سطر بنكتب [[$MONGO_URI]] بدل الرابط الطويل. وفي PowerShell نفس الفكرة بتتكتب [[$env:MONGO_URI = "..."]].

---

## ٢. شوف مين هيتمسح

~~~bash
mongosh "$MONGO_URI" --quiet --eval 'db.users.find({ age: { $lt: 18 } }).toArray()'
~~~

| الجزء | ليه |
|---|---|
| [["$MONGO_URI"]] | قيمة المتغير، والعلامات عشان لو فيه رموز ميتكسرش |
| [[--quiet]] | من غير الترحيب |
| [[--eval '...']] | الكود اللي هيتنفّذ |
| [[.toArray()]] | يحوّل الـ cursor لـ array ويطبعها كلها |

~~~text الناتج
[
  {
    _id: ObjectId('6ac4f9f0a32194e5d8a43c06'),
    name: 'Mona',
    age: 17,
    minor: true
  }
]
~~~

مستند واحد. دا اللي هيتمسح.

### ليه علامة تنصيص مفردة [['...']]؟

جوه العلامات المزدوجة [["..."]] bash بيعتبر أي [[$كلمة]] متغير ويحط قيمته. [[$lt]] مش متغير معرّف، فبيتحط مكانه فاضي. جرّبتها:

~~~bash
mongosh "$MONGO_URI" --quiet --eval "db.users.find({ age: { $lt: 18 } }).toArray()"
~~~

~~~text الناتج
SyntaxError: Unexpected token (1:23)

> 1 | db.users.find({ age: { : 18 } }).toArray()
    |                        ^
~~~

الـ [[$lt]] اختفت. العلامات المفردة بتقول لـ bash «متلمسش اللي جوه».

---

## ٣. امسح بنفس الشرط

~~~bash
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteMany({ age: { $lt: 18 } })'
~~~

~~~text الناتج
{ acknowledged: true, deletedCount: 1 }
~~~

[[deletedCount: 1]] = نفس العدد اللي الـ find وراهولك. لو الرقمين مختلفين، وقّف وافهم ليه.

---

## ٤. مستند واحد

~~~bash
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteOne({ email: "sara@example.com" })'
~~~

~~~text الناتج
{ acknowledged: true, deletedCount: 1 }
~~~

[[deleteOne]] بيمسح أول مستند يطابق بس، حتى لو فيه كذا واحد. والعلامات المزدوجة حوالين الإيميل جوه المفردة عادي.

---

## ٥. و ٦. الخطيرين

~~~bash
mongosh "$MONGO_URI" --quiet --eval 'db.users.deleteMany({})'
mongosh "$MONGO_URI" --quiet --eval 'db.users.drop()'
~~~

عملت index على [[name]] قبلهم عشان نشوف الفرق:

~~~text الناتج
{ acknowledged: true, deletedCount: 4 }
~~~

[[{}]] شرط فاضي = كل المستندات. بعدها [[getIndexes()]] لسه بيطلّع [['_id_', 'name_1']]: الـ collection والـ indexes موجودين بس فاضيين.

~~~text الناتج بتاع drop
true
~~~

[[drop()]] شال الـ collection بالـ indexes، و [[db.getCollectionNames()]] بعدها رجّع [[[ 'notes' ]]] بس.

| الأمر | المستندات | الـ indexes | الـ collection |
|---|---|---|---|
| [[deleteMany({...})]] | اللي يطابق | تفضل | تفضل |
| [[deleteMany({})]] | كلها | تفضل | تفضل |
| [[drop()]] | كلها | تتشال | تتشال |
| [[db.dropDatabase()]] | القاعدة كلها | | |

ومفيش undo لأي واحد فيهم؛ الرجوع من باك أب بس.

## الخلاصة

- اكتب الشرط مرة، وجرّبه بـ [[find]] أو [[countDocuments]]، وانسخه زي ما هو للـ delete.
- قارن [[deletedCount]] بالعدد اللي شفته.
- في bash حط كود mongosh بين [['...']] عشان [[$lt]] و [[$gt]].
- [[deleteMany({})]] بيفضّي، و [[drop()]] بيشيل الـ collection كلها.`,
          lines: [
            "حط الرابط في متغير عشان الأوامر تبقى قصيرة (قاعدة lab).",
            "شوف الأول مين هيتمسح.",
            "امسح كل اللي يطابق نفس الشرط.",
            "امسح مستند واحد بالإيميل.",
            "يمسح كل المستندات (الـ indexes بتفضل).",
            "يشيل الـ collection كلها بالـ indexes."
          ],
          sol: R`الـ find بيرجّع array فيها المستندات اللي هتتمسح، زي [[[ { _id: ObjectId('...'), name: 'Mona', age: 17 } ]]]، يعني واحد. والـ deleteMany بنفس الشرط بترجّع [[{ acknowledged: true, deletedCount: 1 }]]. الرقمين لازم يبقوا متساويين، ودي الفكرة: شوف قبل ما تمسح.

لو [[deletedCount]] أكبر من اللي شفته، يبقى الشرط اتكتب مختلف في المرتين، أو حد ضاف داتا في النص. ولو [[deletedCount: 0]] رغم إن الـ find لقى، غالبًا نوع القيمة مختلف: [[{ age: "17" }]] كنص مش هيطابق 17 كرقم، ودا بيحصل كتير مع قيم جاية من query string.

وأسهل عادة: استخدم [[countDocuments]] بنفس الشرط بالظبط قبل الـ delete، وانسخ الشرط copy/paste مش تكتبه تاني.`
        },
        {
          cmd: "mongodb:// و mongodb+srv://",
          title: "رابط الاتصال اللي في .env",
          desc: R`التطبيق بيتصل برابط واحد في [[MONGODB_URI]]. [[mongodb://]] بتكتب فيه السيرفر والبورت بنفسك، و [[mongodb+srv://]] (بتاع Atlas) بتكتب اسم واحد والـ driver يجيب السيرفرات من الـ DNS.

جوه Docker compose السيرفر اسمه اسم الخدمة ([[mongo]]) مش localhost.`,
          example: R`MONGODB_URI=mongodb://localhost:27017/myapp
MONGODB_URI=mongodb://admin:secret@mongo:27017/myapp?authSource=admin
MONGODB_URI=mongodb://myapp_user:YOUR_PASSWORD@mongo:27017/myapp
MONGODB_URI=mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.example.mongodb.net/myapp?retryWrites=true&w=majority`,
          try: R`جرّب الرابط قبل ما تحطه في .env: [[mongosh "الرابط" --quiet --eval "db.getCollectionNames()"]]، ولازم يطبع أسماء الـ collections (أو [[[]]] لو القاعدة فاضية) من غير error.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل «التطبيق مش شايف القاعدة» سببها سطر واحد: الرابط. host غلط، أو authSource ناقص، أو باسورد فيه حرف بيكسر الرابط.",
            how: R`الشكل: [[mongodb://user:pass@host:port/db?options]]. الـ [[/db]] هي القاعدة اللي التطبيق هيشتغل عليها، وهي كمان المكان اللي بيدوّر فيه على اليوزر لو مكتبتش [[authSource]].

السطر التاني: اليوزر root اتعمل في admin، فلازم [[authSource=admin]]. السطر التالت: يوزر اتعمل جوه myapp نفسها (المستوى ٢)، فمش محتاج authSource.

[[mongodb+srv://]]: الـ driver بيسأل الـ DNS عن سجلات SRV و TXT للاسم، ويعرف منها السيرفرات الـ ٣ والإعدادات (ومنها authSource=admin). مفيش بورت في الرابط، و TLS شغال لوحده.

[[retryWrites=true]] بيعيد الكتابة مرة لو السيرفر الأساسي اتغير في النص. و [[w=majority]] الكتابة تتأكد بعد ما أغلب السيرفرات تسجّلها.

جوه compose كل container ليه localhost بتاعه، فالتطبيق بيوصل لـ Mongo باسم الخدمة. وباسورد فيه [[@]] أو [[:]] أو [[/]] لازم يتكتب encoded ([[@]] تبقى [[%40]]).`,
            when: "أول إعداد للتطبيق، ونقل من Atlas لسيرفرك أو العكس.",
            mistakes: R`في مشروع حقيقي التطبيق كان متصل بنفس اليوزر اللي في admin اللي بيعمل الباك أب، يعني الكود عنده صلاحيات على السيرفر كله؛ يوزر للتطبيق بـ readWrite على قاعدته بس أأمن. و [[localhost]] جوه container التطبيق بيشاور على التطبيق نفسه، فيطلع ECONNREFUSED.`
          },
          teach: R`## سطر واحد في [[.env]] فيه كل حاجة

المثال ٤ أشكال لنفس المتغير [[MONGODB_URI]]، كل واحد لموقف. والتطبيق (Mongoose أو الـ driver) بيقرا المتغير ده ويتصل بيه. الأشكال الـ ٣ الأولى جرّبتها بـ mongosh على container من [[mongo:8]]، والرابع (Atlas) شرحه من الـ docs الرسمية لأنه محتاج cluster حقيقي.

---

## الشكل العام

~~~text
mongodb://  user:password@  host:port  /database  ?option=value&option2=value
~~~

| الحتة | لازمة؟ | معناها |
|---|---|---|
| [[mongodb://]] | أيوه | البروتوكول |
| [[user:password@]] | لو فيه auth | اليوزر والباسورد، والـ [[@]] بتقفلهم |
| [[host:port]] | أيوه | السيرفر والبورت (الافتراضي 27017) |
| [[/database]] | لأ | القاعدة اللي التطبيق هيشتغل عليها، وهي كمان مكان اليوزر لو مفيش authSource |
| [[?options]] | لأ | إعدادات، بينها [[&]] |

---

## ١. محلي من غير باسورد

~~~text
MONGODB_URI=mongodb://localhost:27017/myapp
~~~

ينفع بس مع Mongo شغال **من غير** auth (تطوير على جهازك). على الـ lab اللي فيه باسورد:

~~~text الناتج
MongoServerError: Command listCollections requires authentication
~~~

ولاحظ: [[db.getName()]] بنفس الرابط طبعت [[myapp]] عادي، لأن الاسم جاي من الرابط ومحدش سأل السيرفر. فاختبر الرابط دايمًا بأمر بيقرا داتا، زي [[db.getCollectionNames()]].

---

## ٢. يوزر root جوه compose

~~~text
MONGODB_URI=mongodb://admin:secret@mongo:27017/myapp?authSource=admin
~~~

- [[mongo]] مكان localhost: جوه Docker compose كل خدمة بتوصل للتانية **باسم الخدمة**. و localhost جوه container التطبيق معناها التطبيق نفسه.
- [[?authSource=admin]]: اليوزر admin متخزن في قاعدة admin، والتطبيق شغال على myapp.

جرّبت الحالتين الغلط:

~~~text من غير authSource
MongoServerError: Authentication failed.
~~~

~~~text باسم mongo من برّه شبكة compose
MongoNetworkError: getaddrinfo ENOTFOUND mongo
~~~

[[getaddrinfo]] دالة بتحوّل الاسم لـ IP، و [[ENOTFOUND]] يعني الاسم ده مش معروف هنا. الاسم [[mongo]] موجود جوه شبكة الـ compose بس.

---

## ٣. يوزر خاص بالتطبيق

~~~text
MONGODB_URI=mongodb://myapp_user:YOUR_PASSWORD@mongo:27017/myapp
~~~

اليوزر ده اتعمل وانت واقف على myapp (درس [[createUser]])، فمتخزن في myapp نفسها، و [[/myapp]] في الرابط كفاية من غير authSource. وده الأأمن: صلاحياته على قاعدته بس.

---

## ٤. Atlas بـ [[mongodb+srv://]]

~~~text
MONGODB_URI=mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.example.mongodb.net/myapp?retryWrites=true&w=majority
~~~

من الـ docs الرسمية:

- [[+srv]]: بدل ما تكتب ٣ سيرفرات وبوراتهم، بتكتب اسم واحد، والـ driver بيسأل الـ DNS عن سجل نوعه **SRV** (بيرجّع أسامي السيرفرات وبوراتهم) وسجل **TXT** (بيرجّع إعدادات زي [[authSource=admin]]).
- مفيش بورت في الرابط، وممنوع تكتبه.
- TLS (التشفير) بيشتغل لوحده مع [[+srv]].
- [[retryWrites=true]]: لو الكتابة فشلت عشان السيرفر الأساسي اتغير، يعيدها مرة.
- [[w=majority]]: w اختصار write concern، يعني الكتابة متتحسبش ناجحة غير لما أغلب السيرفرات تسجّلها.

---

## باسورد فيه رموز

الحروف [[@]] و [[:]] و [[/]] ليها معنى في الرابط، فلو في الباسورد لازم تتكتب **URL-encoded**. جرّبت يوزر باسورده [[a/b]]:

~~~text mongodb://atuser:a/b@localhost:27017/lab
MongoParseError: Password contains unescaped characters
~~~

~~~text mongodb://atuser:a%2Fb@localhost:27017/lab
[ 'notes' ]
~~~

والـ encoding بتجيبه كده (في mongosh أو Node):

~~~javascript
encodeURIComponent("p@ss:w/rd")
~~~

~~~text الناتج
p%40ss%3Aw%2Frd
~~~

يعني [[@]] بقت [[%40]]، و [[:]] بقت [[%3A]]، و [[/]] بقت [[%2F]].

## الخلاصة

| الموقف | الرابط |
|---|---|
| جهازك من غير auth | [[mongodb://localhost:27017/myapp]] |
| compose بالـ root | [[mongodb://admin:...@mongo:27017/myapp?authSource=admin]] |
| compose بيوزر التطبيق | [[mongodb://myapp_user:...@mongo:27017/myapp]] |
| Atlas | [[mongodb+srv://...@cluster.../myapp]] |

واختبره قبل ما تحطه: [[mongosh "الرابط" --quiet --eval "db.getCollectionNames()"]].`,
          lines: [
            "محلي من غير باسورد (تطوير بس).",
            "جوه compose باليوزر root، وهو متخزن في admin.",
            "يوزر خاص بالتطبيق اتعمل جوه myapp.",
            "Atlas: اسم واحد والسيرفرات بتيجي من الـ DNS، و TLS لوحده."
          ],
          sol: R`مع الرابط الصح بيطبع أسماء الـ collections، زي [[[ 'users', 'notes' ]]]، أو [[[]]] لو القاعدة لسه فاضية.

ليه مش [[db.getName()]]؟ جرّبتها: بتطبع [[myapp]] حتى مع رابط من غير يوزر ولا باسورد خالص، لأن mongosh بياخد الاسم من الرابط ومش بيسأل السيرفر. فمش بتثبت إن اليوزر والباسورد صح. أي أمر بيقرا من القاعدة زي [[getCollectionNames()]] هو اللي بيكشف المشكلة: من غير يوزر بيطلع [[Command listCollections requires authentication]].

الأخطاء اللي هتقابلها: [[Authentication failed.]] مع [[mongodb://admin:secret@localhost:27017/myapp]] لأن admin متعمل في قاعدة admin، والحل [[?authSource=admin]]. واليوزر اللي متعمل جوه myapp يشتغل من غيرها. والباسورد اللي فيه [[@]] أو [[:]] أو [[/]] لازم يتعمله URL-encode ([[@]] تبقى [[%40]])، وإلا الرابط يتقري غلط. ولو استخدمت [[mongo]] كـ host من جهازك بدل من جوه compose هيطلع [[getaddrinfo ENOTFOUND mongo]].`
        }
      ]
    },
    {
      t: "Docker ويوزرز وسرعة",
      l: 2,
      n: "Mongo بباسورد في compose، ويوزر لكل تطبيق، و indexes، وبورت مقفول",
      items: [
        {
          cmd: "MONGO_INITDB_ROOT_USERNAME",
          title: "Mongo بتسجيل دخول إجباري في compose",
          desc: R`صورة mongo الرسمية لو اديتها [[MONGO_INITDB_ROOT_USERNAME]] و [[MONGO_INITDB_ROOT_PASSWORD]]، بتعمل يوزر root أول مرة وبتشغّل Mongo بـ auth. من غيرهم أي حد يوصل للبورت يقرا ويمسح من غير باسورد.

والبيانات في volume على [[/data/db]]، والبورت على [[127.0.0.1]] بس.`,
          example: R`services:
  mongo:
    image: mongo:8
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD}
    volumes:
      - mongo_data:/data/db
    ports:
      - "127.0.0.1:27017:27017"
volumes:
  mongo_data:`,
          try: R`شغّله بـ [[docker compose up -d]]، وجرّب [[mongosh --eval "db.getMongo().getDBNames()"]] من غير يوزر: هيطلع error إنه محتاج authentication.`,
          flag: "script",
          deep: {
            why: "Mongo من غير باسورد على بورت مفتوح من أشهر طرق ضياع البيانات: بوتات بتلف على الإنترنت، تلاقيه، تمسح كل حاجة، وتسيب رسالة فدية.",
            how: R`الـ entrypoint بتاع الصورة بيبص: لو [[/data/db]] فاضي والمتغيرين موجودين، بيشغّل Mongo مؤقت، يعمل اليوزر في قاعدة admin بدور root، ويعيد التشغيل بـ [[--auth]]. عشان كده مش محتاج تكتب [[command: mongod --auth]] بنفسك.

ده بيحصل أول مرة بس. لو الـ volume فيه بيانات، المتغيرات بتتجاهل. وأي ملفات [[.js]] أو [[.sh]] في [[/docker-entrypoint-initdb.d]] بتتنفّذ برضه أول مرة بس (مفيدة لعمل يوزر التطبيق).

[[$__{MONGO_ROOT_PASSWORD}]] compose بياخدها من ملف .env جنبه، فالباسورد مش مكتوب في الـ YAML اللي على git.

[[127.0.0.1:27017:27017]]: تقدر توصل من السيرفر نفسه أو بـ SSH tunnel، والإنترنت لأ. ولو التطبيق في نفس الـ compose، مش محتاج [[ports]] خالص: بيوصل على [[mongo:27017]] جوه الشبكة.`,
            when: "أي Mongo على سيرفر، حتى لو «للتجربة».",
            mistakes: R`تغيّر [[MONGO_INITDB_ROOT_PASSWORD]] في .env وتستنى الباسورد يتغير: مش هيتغير، لازم [[db.changeUserPassword]]. و [[docker compose down -v]] بيمسح الـ volume بالبيانات؛ في مشروع حقيقي الـ volume اتعمل [[external: true]] (بـ [[docker volume create]] الأول) عشان أمر زي ده ميقدرش يمسحه.`
          },
          teach: R`## ملف compose فيه Mongo بباسورد

ده ملف YAML (اسمه عادة [[compose.yml]]) بيوصف container لـ Mongo: الصورة، والباسورد، ومكان البيانات، والبورت. YAML بيعتمد على **المسافات في أول السطر**: اللي تحت حاجة ومزاح لجوه يبقى جزء منها. شغّلته فعلًا بـ Docker Compose على Docker Desktop (غيّرت البورت بس لـ 27118 عشان ميتعارضش مع الـ lab)، والأوامر نفسها واحدة في PowerShell و bash.

---

## سطر سطر

~~~text
services:
  mongo:
    image: mongo:8
    restart: unless-stopped
~~~

- [[services:]]: قايمة الـ containers اللي في الملف.
- [[mongo:]]: اسم الخدمة. ده كمان الاسم اللي الخدمات التانية هتوصل بيه ([[mongo:27017]]).
- [[image: mongo:8]]: الصورة الرسمية، النسخة 8. التاج [[8]] بيجيب آخر 8.x (طلعت 8.3.11 وقت التجربة).
- [[restart: unless-stopped]]: لو الـ container وقع أو الجهاز عمل restart يقوم تاني، إلا لو انت وقفته بإيدك.

~~~text
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD}
~~~

- [[environment:]]: متغيرات بيئة بتتحط جوه الـ container.
- [[MONGO_INITDB_ROOT_USERNAME]]: اسمها بيتقري كده: MONGO + INITDB (initialize database، يعني تجهيز القاعدة أول مرة) + ROOT USERNAME. الصورة الرسمية بتدوّر عليها.
- [[$__{MONGO_ROOT_USER}]]: compose بيستبدلها بقيمة المتغير ده من ملف [[.env]] اللي جنب [[compose.yml]]. كده الباسورد مش مكتوب في الملف اللي بيترفع على git.

الـ [[.env]] اللي استخدمته:

~~~text .env
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=s3cret
~~~

~~~text
    volumes:
      - mongo_data:/data/db
    ports:
      - "127.0.0.1:27118:27017"
volumes:
  mongo_data:
~~~

- [[mongo_data:/data/db]]: volume اسمه mongo_data متركّب على [[/data/db]]، وده الفولدر اللي Mongo بيكتب فيه البيانات. من غيره البيانات بتتمسح مع الـ container.
- [[ports]]: الشكل [[IP:بورت_عندك:بورت_جوه]]. الـ [[127.0.0.1]] في الأول معناها «من الجهاز ده بس»، فمحدش من الشبكة أو الإنترنت يوصل.
- [[volumes:]] اللي في الآخر (من غير مسافات) بيعرّف الـ volume نفسه. Docker بيسمّيه باسم المشروع قدامه: عندي طلع [[mongo-lab-c1_mongo_data]].

---

## اللي حصل لما شغّلته

~~~bash
docker compose up -d
~~~

~~~text الناتج
 Network mongo-lab-c1_default Created
 Volume mongo-lab-c1_mongo_data Created
 Container mongo-lab-c1-mongo-1 Started
~~~

### من غير يوزر

~~~bash
docker compose exec mongo mongosh --quiet --eval "db.getMongo().getDBNames()"
~~~

[[docker compose exec mongo]] = شغّل أمر جوه خدمة mongo. و [[db.getMongo().getDBNames()]] = هات أسماء القواعد.

~~~text الناتج
MongoServerError: Command listDatabases requires authentication
~~~

وخرج بـ exit code 1. ده المطلوب: السيرفر رد، بس رفض يقول أي حاجة من غير login.

### باليوزر

~~~bash
docker compose exec mongo mongosh -u admin -p s3cret --quiet --eval "db.getMongo().getDBNames()"
~~~

~~~text الناتج
[ 'admin', 'config', 'local' ]
~~~

---

## إيه اللي بيحصل جوه أول مرة؟

الـ entrypoint (السكربت اللي بيشتغل أول ما الـ container يقوم) بيعمل كده:

1. يبص على [[/data/db]]: فاضي؟
2. لو فاضي والمتغيرين موجودين: يشغّل Mongo مؤقت جوه الـ container بس، ويعمل اليوزر في قاعدة [[admin]] بدور [[root]].
3. يقفل المؤقت، ويشغّل Mongo الحقيقي بـ [[--auth]] (يعني login إجباري).

ولو [[/data/db]] فيه بيانات من قبل كده، الخطوة ٢ بتتلغي. جرّبت أغيّر الباسورد في [[.env]] لـ [[changed]] وعملت [[up -d --force-recreate]]:

~~~text الباسورد الجديد
MongoServerError: Authentication failed.
~~~

والقديم [[s3cret]] لسه شغال. الـ volume فيه اليوزر القديم، والمتغيرات اتجاهلت. تغيير الباسورد بيبقى بـ [[db.changeUserPassword]].

### لو نسيت ملف [[.env]]

شيلته وشغّلت [[docker compose config]] (بيطبع الملف بعد التعويض):

~~~text الناتج
level=warning msg="The \"MONGO_ROOT_USER\" variable is not set. Defaulting to a blank string."
level=warning msg="The \"MONGO_ROOT_PASSWORD\" variable is not set. Defaulting to a blank string."
~~~

متغيرات فاضية = مفيش يوزر = Mongo من غير auth. اقرا التحذيرات دي.

## الخلاصة

| السطر | ليه |
|---|---|
| [[MONGO_INITDB_ROOT_*]] | يوزر root و auth إجباري، أول مرة بس |
| [[$__{...}]] من [[.env]] | الباسورد برّه الملف اللي على git |
| [[mongo_data:/data/db]] | البيانات تعيش بعد الـ container |
| [[127.0.0.1:...]] | البورت للجهاز ده بس |

و [[docker compose down -v]] بيمسح الـ volume بالبيانات، فاستخدمه على التجربة بس.`,
          lines: [
            "الخدمات.",
            "خدمة Mongo.",
            "نسخة محددة من الصورة الرسمية.",
            "يقوم تاني لو وقع أو السيرفر عمل restart.",
            "المتغيرات:",
            "اسم يوزر root (من .env).",
            "باسورده (من .env)، ومعاهم Mongo بيشتغل بـ auth.",
            "التخزين:",
            "البيانات في volume عشان متضيعش مع الـ container.",
            "البورتات:",
            "على السيرفر نفسه بس، مش على الإنترنت.",
            "تعريف الـ volumes.",
            "volume البيانات."
          ],
          sol: R`[[docker compose exec mongo mongosh --quiet --eval "db.getMongo().getDBNames()"]] بيطبع:

[[MongoServerError: Command listDatabases requires authentication]] وبيخرج بـ exit code 1. يعني الاتصال نفسه نجح، بس السيرفر رافض أي أمر من غير login. ودا اللي عايزه.

ونفس الأمر مع [[-u "$MONGO_ROOT_USER" -p "$MONGO_ROOT_PASSWORD"]] بيرجّع [[[ 'admin', 'config', 'local' ]]].

لو الأمر من غير يوزر رجّع القواعد عادي: غالبًا الـ volume كان فيه داتا قديمة من قبل ما تضيف المتغيرات. [[MONGO_INITDB_*]] بيشتغلوا بس لما [[/data/db]] يكون فاضي، فالـ root ما اتعملش والـ auth مش متفعلة. على التجربة: [[docker compose down -v]] وارفع تاني. ولو المتغيرات فاضية لأن [[.env]] مش جنب compose.yml، هتلاقي تحذير [[The "MONGO_ROOT_USER" variable is not set]] وقت [[up]].`
        },
        {
          cmd: "healthcheck بـ ping",
          title: "الباك إند يستنى لحد ما Mongo يصحى",
          desc: R`الـ container ممكن يبقى شغال و Mongo لسه بيقوم. [[healthcheck]] بيسأل Mongo كل شوية بـ [[db.adminCommand('ping')]]، و [[condition: service_healthy]] بيخلي الباك إند ميقومش غير لما الرد ييجي.

و ping مش محتاج باسورد، فمتحطش الباسورد في الـ healthcheck.`,
          example: R`services:
  mongo:
    image: mongo:8
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
  backend:
    depends_on:
      mongo:
        condition: service_healthy`,
          try: R`بعد [[docker compose up -d]] شوف الحالة بـ [[docker compose ps mongo]]: عمود STATUS هيقول health: starting وبعدين healthy.`,
          flag: "script",
          deep: {
            why: "من غير healthcheck الباك إند بيقوم قبل Mongo، أول اتصال يفشل، والتطبيق يقع أو يفضل شغال من غير قاعدة لحد ما حد يعمله restart.",
            how: R`Docker بيشغّل الأمر اللي في [[test]] جوه الـ container كل [[interval]]. لو خرج بـ 0 يبقى healthy. mongosh بيخرج بـ error لو مقدرش يتصل، فده كفاية كاختبار.

[[ping]] من الأوامر اللي Mongo بيسمح بيها من غير تسجيل دخول، فالفحص شغال مع [[--auth]] من غير باسورد.

[[start_period]]: أول ٣٠ ثانية الفشل مش بيتحسب (Mongo بياخد وقت أول مرة وهو بيعمل اليوزر). و [[retries: 5]] يعني ٥ مرات فشل ورا بعض قبل ما يبقى unhealthy.

[[condition: service_healthy]] في [[depends_on]]: compose بيستنى الحالة healthy مش بس إن الـ container اشتغل.`,
            when: "أي compose فيه قاعدة وتطبيق بيعتمد عليها.",
            mistakes: R`في مشروع حقيقي الـ healthcheck كان فيه [[-u]] و [[-p]] بالباسورد، فأي حد يعمل [[docker inspect]] يشوفه. ping مش محتاج login أصلًا. و [[depends_on]] من غير condition بيستنى الـ container يبدأ بس، مش Mongo يبقى جاهز.`
          },
          teach: R`## «الـ container شغال» مش معناها «Mongo جاهز»

Docker بيعتبر الـ container شغال أول ما البرنامج اللي جواه يبدأ، بس Mongo بياخد ثواني يجهّز (وأكتر أول مرة وهو بيعمل اليوزر). الـ [[healthcheck]] أمر Docker بيشغّله جوه الـ container كل شوية يسأل «انت جاهز؟»، و [[depends_on]] بشرط بيخلي الباك إند يستنى الإجابة. شغّلته على Docker Desktop بخدمة mongo من [[mongo:8]] وخدمة backend بسيطة ([[ubuntu:24.04]] بتعمل [[sleep]]) مكان الباك إند.

---

## ١. الفحص نفسه

~~~text
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
~~~

[[test]] هو الأمر. مكتوب كـ array (قايمة بين [[[ ]]]):

| العنصر | معناه |
|---|---|
| [["CMD"]] | شغّل اللي بعدي كبرنامج مباشرة (من غير shell) |
| [["mongosh"]] | البرنامج |
| [["--quiet"]] | من غير ترحيب |
| [["--eval"]] و [["db.adminCommand('ping').ok"]] | ابعت ping وهات خانة [[ok]] من الرد |

جرّبت الأمر بإيدي جوه الـ container:

~~~text الناتج
1
~~~

وخرج بـ exit code 0. Docker بيبص على الـ exit code بس: [[0]] = healthy، غيره = فشل. ولو mongosh مقدرش يتصل بيخرج بـ 1 لوحده.

وليه مفيش [[-u]] و [[-p]]؟ لأن [[ping]] من الأوامر القليلة اللي Mongo بيرد عليها من غير login. والباسورد لو اتكتب هنا يبان لأي حد يعمل [[docker inspect]].

---

## ٢. التوقيتات

~~~text
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
~~~

| الإعداد | معناه |
|---|---|
| [[interval: 10s]] | افحص كل ١٠ ثواني (s = seconds) |
| [[timeout: 5s]] | لو الفحص أخد أكتر من ٥ ثواني يتحسب فشل |
| [[retries: 5]] | ٥ مرات فشل ورا بعض = [[unhealthy]] |
| [[start_period: 30s]] | أول ٣٠ ثانية الفشل مش بيتعد (وقت سماح للبداية) |

---

## ٣. الباك إند يستنى

~~~text
  backend:
    depends_on:
      mongo:
        condition: service_healthy
~~~

[[depends_on]] لوحده بيقول «شغّل mongo قبلي» بس. [[condition: service_healthy]] بتزوّد «واستنى لحد ما حالته تبقى healthy».

---

## اللي حصل فعلًا

~~~bash
docker compose up -d
~~~

~~~text الناتج
 Container mongo-lab-c2-mongo-1 Started
 Container mongo-lab-c2-mongo-1 Waiting
 Container mongo-lab-c2-mongo-1 Healthy
 Container mongo-lab-c2-backend-1 Starting
 Container mongo-lab-c2-backend-1 Started
~~~

[[Waiting]] ثم [[Healthy]] للـ mongo، وبعدها بس الـ backend بدأ. و [[docker compose ps]] في النص:

~~~text بعد ثانيتين
backend Created
mongo Up 1 second (health: starting)
~~~

~~~text بعد ما خلص
backend Up Less than a second
mongo Up 6 seconds (healthy)
~~~

الـ backend كان [[Created]] (اتعمل ومش شغال) لحد ما mongo بقى healthy. ووصل healthy في ٦ ثواني مش ١٠، لأن Docker في فترة [[start_period]] بيفحص أسرع (كل ٥ ثواني افتراضيًا، إعداد اسمه [[start_interval]]).

### تفاصيل الفحوصات

~~~bash
docker inspect --format '{{json .State.Health}}' mongo-lab-c2-mongo-1
~~~

~~~text الناتج
{"Status":"healthy","FailingStreak":0,"Log":[{"Start":"2026-10-06T13:44:31.807289908Z","End":"2026-10-06T13:44:32.426798935Z","ExitCode":0,"Output":"1\n"}]}
~~~

[[FailingStreak]] عدد مرات الفشل ورا بعض دلوقتي، و [[Log]] آخر الفحوصات بالـ exit code والناتج. ده أول مكان تبص فيه لو الحالة [[unhealthy]].

> ملحوظة لاحظتها وأنا بجرّب: أول تشغيل، ping بيرد وMongo المؤقت لسه بيعمل اليوزر، فلو دخلت باليوزر في نفس اللحظة ممكن يطلع [[Authentication failed.]] مرة أو اتنين. الباك إند لازم يعيد المحاولة في الاتصال، والـ drivers بتعمل ده لوحدها.

## الخلاصة

- [[healthcheck]] = أمر بيرجع 0 لما الخدمة جاهزة، و [[ping]] من غير باسورد.
- [[condition: service_healthy]] هي اللي بتخلي الاستنى حقيقي.
- [[docker compose ps]] للحالة، و [[docker inspect ... .State.Health]] للتفاصيل.`,
          lines: [
            "الخدمات.",
            "خدمة Mongo.",
            "الصورة.",
            "فحص الصحة:",
            "اسأل Mongo ping، ومحتاجش باسورد.",
            "كل ١٠ ثواني.",
            "لو مردّش في ٥ ثواني يبقى فشل.",
            "٥ مرات فشل ورا بعض يبقى unhealthy.",
            "أول ٣٠ ثانية الفشل مش بيتحسب.",
            "الباك إند.",
            "بيعتمد على:",
            "Mongo...",
            "...لما يبقى healthy مش بس شغال."
          ],
          sol: R`أول ما تعمل [[up -d]]، [[docker compose ps mongo]] بيطلّع في STATUS حاجة زي [[Up Less than a second (health: starting)]]، وبعد أول فحص ناجح (في تجربتي بعد ~١٠ ثواني) بيبقى [[Up 12 seconds (healthy)]].

والـ backend اللي عليه [[condition: service_healthy]] مش هيبدأ غير بعد الـ healthy. في لوج [[docker compose up]] هتشوف [[Waiting]] ثم [[Healthy]] للـ mongo قبل ما الـ backend يبدأ.

لو فضل [[health: starting]] وبعدين بقى [[unhealthy]]: شوف السبب بـ [[docker inspect --format '{{json .State.Health}}' CONTAINER]]، هتلاقي ناتج آخر فحوصات. الأسباب الشائعة: image قديمة مفيهاش [[mongosh]] (قبل Mongo 6 كان اسمه [[mongo]])، أو كتبت الـ test كـ string واحد مع [[CMD]] بدل [[CMD-SHELL]]. والـ ping نفسه مش محتاج auth، فمش هيفشل بسبب الباسورد.`
        },
        {
          cmd: "createUser",
          title: "يوزر للتطبيق بأقل صلاحيات",
          desc: R`root للإدارة بس. التطبيق ياخد يوزر ليه دور [[readWrite]] على قاعدته وبس، والباك أب ياخد يوزر بدور [[backup]]. لو الكود اتخترق، الضرر بيقف عند قاعدة واحدة.

[[passwordPrompt()]] بيسألك الباسورد بدل ما تكتبه في الأمر.`,
          example: R`use myapp
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
db.getUsers()
db.grantRolesToUser("myapp_user", [{ role: "read", db: "reports" }])
db.changeUserPassword("myapp_user", passwordPrompt())
use admin
db.createUser({ user: "backup", pwd: passwordPrompt(), roles: ["backup", "restore"] })`,
          try: R`اعمل myapp_user في الـ lab، واتصل بيه: [[mongosh "mongodb://myapp_user:PASS@localhost:27017/myapp"]]، وجرّب تكتب في myapp (هينفع) وفي قاعدة تانية (هيطلع unauthorized).`,
          flag: "script",
          deep: {
            why: "لو التطبيق متصل بـ root، أي ثغرة في الكود (injection أو سر اتسرّب) بتدي المهاجم كل القواعد وإدارة السيرفر. يوزر محدود بيقلّل الخسارة.",
            how: R`اليوزر بيتخزن في القاعدة اللي انت فيها وقت [[createUser]]. هنا في myapp، فالرابط [[mongodb://myapp_user:...@mongo:27017/myapp]] مش محتاج authSource.

الأدوار الجاهزة: [[read]] قراية بس، [[readWrite]] قراية وكتابة وعمل indexes، [[dbAdmin]] إدارة القاعدة، [[root]] كل حاجة. و [[backup]] و [[restore]] في admin، لـ mongodump و mongorestore.

[[grantRolesToUser]] بيضيف دور من غير ما يلمس الموجود، و [[revokeRolesFromUser]] العكس. و [[getUsers()]] بيعرض اليوزرز وأدوارهم في القاعدة الحالية.

[[passwordPrompt()]] دالة في mongosh بتسأل الباسورد وتخفيه، فمش بيتسجّل في history الـ shell.`,
            when: "أول ما تشغّل Mongo لتطبيق. ويوزر لكل تطبيق لو كذا تطبيق على نفس السيرفر.",
            mistakes: R`في مشروع حقيقي التطبيق والباك أب الاتنين كانوا بيتصلوا بنفس يوزر admin. واحد لكل وظيفة أأمن وأسهل في تغيير الباسورد. وتعمل اليوزر وانت في admin وتنسى، فالتطبيق يفشل لأن الرابط مفيهوش [[authSource=admin]].`
          },
          teach: R`## يوزر لكل وظيفة، وكل يوزر على قده

الـ root اللي اتعمل من [[MONGO_INITDB_ROOT_USERNAME]] بيقدر يعمل أي حاجة في أي قاعدة. المثال بيعمل يوزرين أصغر: واحد للتطبيق، وواحد للباك أب. الأوامر جوه mongosh وانت داخل بالـ root. جرّبتها على [[mongo:8]]، بس بباسورد مكتوب بدل [[passwordPrompt()]]، لأن الأخيرة بتستنى حد يكتب على الكيبورد (هتشوفها تحت).

---

## ١. [[use myapp]]

مهم جدًا هنا: اليوزر **بيتخزن في القاعدة اللي انت واقف فيها**. القاعدة دي اسمها الـ authentication database بتاعته، وهي اللي بتتكتب في [[authSource]].

---

## ٢. [[db.createUser(...)]]

~~~javascript
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
~~~

الـ object اللي جوه فيه ٣ حقول:

| الحقل | القيمة | معناها |
|---|---|---|
| [[user]] | [["myapp_user"]] | اسم اليوزر |
| [[pwd]] | [[passwordPrompt()]] | الباسورد، بيتسأل وقتها |
| [[roles]] | array | الصلاحيات، كل واحدة [[{ role, db }]] |

[[{ role: "readWrite", db: "myapp" }]] = «يقرا ويكتب في myapp». مفيش أي صلاحية على حاجة تانية.

[[passwordPrompt()]] دالة في mongosh بتطبع [[Enter password:]] وتستنى تكتب، والحروف مش بتظهر، والباسورد مش بيتسجّل في history الـ shell. (من الـ docs، ومش بتشتغل في [[--eval]] أو سكربت من غير ترمنال.)

~~~text الناتج
{ ok: 1 }
~~~

---

## ٣. [[db.getUsers()]]

~~~text الناتج
{
  users: [
    {
      _id: 'myapp.myapp_user',
      userId: UUID('43a633c6-79c4-4a9a-981f-1e8ed26b41e8'),
      user: 'myapp_user',
      db: 'myapp',
      roles: [ { role: 'readWrite', db: 'myapp' } ],
      mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
    }
  ],
  ok: 1
}
~~~

- [[_id: 'myapp.myapp_user']]: القاعدة + اسم اليوزر. يعني ممكن يبقى فيه [[myapp_user]] تاني في قاعدة تانية وده يوزر مختلف.
- [[db: 'myapp']]: اتخزن هنا عشان كنا واقفين على myapp.
- [[mechanisms]]: طرق التحقق من الباسورد. SCRAM (Salted Challenge Response Authentication Mechanism) يعني الباسورد مش بيتخزن ولا بيتبعت زي ما هو؛ بيتخزن hash، والدخول بيتم بتبادل رسايل محسوبة منه.

---

## ٤. [[grantRolesToUser]]

~~~javascript
db.grantRolesToUser("myapp_user", [{ role: "read", db: "reports" }])
~~~

بيضيف دور من غير ما يلمس الموجود. بعدها [[db.getUser("myapp_user").roles]]:

~~~text الناتج
[ { role: 'readWrite', db: 'myapp' }, { role: 'read', db: 'reports' } ]
~~~

والعكس [[revokeRolesFromUser]] بنفس الشكل.

---

## ٥. [[changeUserPassword]]

~~~javascript
db.changeUserPassword("myapp_user", passwordPrompt())
~~~

بيغيّر الباسورد ([[{ ok: 1 }]]). جرّبت الدخول بالقديم بعدها: [[Authentication failed.]]. دي الطريقة الوحيدة تغيّر باسورد، مش تغيير متغير في [[.env]].

---

## ٦. و ٧. يوزر الباك أب في admin

~~~javascript
use admin
db.createUser({ user: "backup", pwd: passwordPrompt(), roles: ["backup", "restore"] })
~~~

هنا [[roles]] نصوص بس من غير [[db]]، فالدور بيتاخد من القاعدة الحالية (admin). و [[db.getUser("backup")]] بيأكد:

~~~text الناتج
roles: [ { role: 'backup', db: 'admin' }, { role: 'restore', db: 'admin' } ],
~~~

[[backup]] و [[restore]] أدوار جاهزة بتدّي اللي mongodump و mongorestore محتاجينه على كل القواعد، من غير صلاحيات إدارة.

---

## نجرّب اليوزر

~~~bash
mongosh "mongodb://myapp_user:AppPass2@localhost:27017/myapp" --quiet --eval 'db.notes.insertOne({ text: "ok" })'
~~~

~~~text الناتج
{
  acknowledged: true,
  insertedId: ObjectId('6ac4fb95b8d3c32b043ee6ff')
}
~~~

الرابط فيه [[/myapp]] ومفيش [[authSource]]: اليوزر في myapp أصلًا. ودلوقتي قاعدة تانية:

~~~text db.getSiblingDB("other").notes.insertOne({ text: "no" })
Uncaught MongoServerError[Unauthorized]: not authorized on other to execute command { insert: "notes", ...
~~~

[[getSiblingDB("other")]] = «هات قاعدة اسمها other من نفس السيرفر». والرفض ده المطلوب. والقراية من reports عدّت ورجّعت [[[]]] (فاضية بس مسموح).

ولو شلت [[/myapp]] من الرابط:

~~~text mongodb://myapp_user:AppPass2@localhost:27017/
MongoServerError: Authentication failed.
~~~

من غير قاعدة في الرابط، mongosh بيدوّر على اليوزر في [[admin]]، وهو مش هناك.

## الأدوار الجاهزة

| الدور | بيعمل إيه |
|---|---|
| [[read]] | قراية بس |
| [[readWrite]] | قراية وكتابة وعمل indexes |
| [[dbAdmin]] | إدارة القاعدة (indexes، stats) من غير قراية الداتا |
| [[backup]] / [[restore]] | لأدوات الباك أب (في admin) |
| [[root]] | كل حاجة |

## الخلاصة

- [[use]] القاعدة الصح **قبل** [[createUser]]، لأنها هتبقى الـ authSource.
- التطبيق: [[readWrite]] على قاعدته بس. الباك أب: [[backup]] و [[restore]] في admin.
- [[passwordPrompt()]] بدل الباسورد مكتوب، و [[changeUserPassword]] للتغيير.`,
          lines: [
            "ادخل قاعدة التطبيق (اليوزر هيتخزن هنا).",
            "يوزر يقرا ويكتب في myapp بس، والباسورد بيتسأل.",
            "اليوزرز وأدوارهم.",
            "ضيفله قراية بس على قاعدة تانية.",
            "غيّر باسورده.",
            "ادخل admin.",
            "يوزر للباك أب والترجيع بس."
          ],
          sol: R`[[db.createUser(...)]] بيرجّع [[{ ok: 1 }]]، و [[db.getUsers()]] بيعرض اليوزر بـ [[roles: [ { role: 'readWrite', db: 'myapp' } ]]].

بعدين بالرابط [[mongodb://myapp_user:PASS@localhost:27017/myapp]]: [[db.notes.insertOne({ text: "ok" })]] بيرجّع [[acknowledged: true]]. و [[db.getSiblingDB("other").notes.insertOne({ text: "no" })]] بيرجّع [[MongoServerError[Unauthorized]: not authorized on other to execute command { insert: "notes", ... }]].

الأخطاء الشائعة: تعمل الـ createUser وانت واقف على [[admin]] بدل [[myapp]]، فاليوزر يتسجّل في admin والرابط من غير [[authSource=admin]] يقول [[Authentication failed.]]. ونفس الـ error لو شلت [[/myapp]] من الرابط، لأن الـ authSource الافتراضي ساعتها admin. وخلي بالك إن [[mongodump --db myapp]] مش بياخد اليوزرز، لأنهم متخزنين في [[admin.system.users]]؛ في النقل لسيرفر جديد لازم تعملهم تاني.`,
          solCode: R`use myapp
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
exit

mongosh "mongodb://myapp_user:PASS@localhost:27017/myapp"
db.notes.insertOne({ text: "ok" })
db.getSiblingDB("other").notes.insertOne({ text: "no" })`
        },
        {
          cmd: "createIndex و explain",
          title: "خلي البحث سريع",
          desc: R`من غير index، [[find]] بيقرا كل مستند في الـ collection (اسمها COLLSCAN). [[createIndex]] على الحقل اللي بتدوّر بيه بيخليه يروح للمستندات على طول (IXSCAN).

[[explain("executionStats")]] بيوريك Mongo عمل إيه فعلًا وقرا كام مستند.`,
          example: R`db.users.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.orders.getIndexes()
db.orders.find({ userId: 42 }).sort({ createdAt: -1 }).explain("executionStats")
db.orders.dropIndex("userId_1_createdAt_-1")`,
          try: R`في lab ضيف ١٠٠ ألف مستند بلوب ([[for (let i = 0; i < 100000; i++) db.t.insertOne({ n: i })]])، وشغّل explain على [[find({ n: 99999 })]] قبل وبعد [[createIndex({ n: 1 })]]، وقارن [[totalDocsExamined]].`,
          flag: "script",
          deep: {
            why: "التطبيق سريع أول شهر، وبعد ما البيانات تكبر كل صفحة بتاخد ثواني. السبب غالبًا استعلام بيقرا الـ collection كلها كل مرة.",
            how: R`الـ index ترتيب جاهز للحقل. [[{ email: 1 }]] تصاعدي، و [[unique: true]] بيمنع إيميلين زي بعض (وده حماية بيانات مش سرعة بس).

index على أكتر من حقل: الترتيب مهم. القاعدة: حقول المساواة الأول ([[userId]])، وبعدين الـ sort ([[createdAt]])، وبعدين المدى ([[$gt]]). الـ index ده بيخدم كمان أي بحث بـ userId لوحده.

في ناتج explain بص على: [[stage]] (IXSCAN كويس، COLLSCAN وحش في collection كبيرة)، و [[totalDocsExamined]] مقابل [[nReturned]]: لو قرا ١٠٠ ألف عشان يرجّع ١٠، ناقصك index.

كل index بيبطّأ الكتابة شوية وبياخد رام، فمتعملش index لكل حقل. و [[getIndexes()]] بيوريك الموجود وأساميه عشان [[dropIndex]].`,
            when: "أي حقل بتدوّر بيه أو بترتّب بيه كتير. وكل ما صفحة تبطأ: explain الأول.",
            mistakes: R`تسيب Mongoose يعمل الـ indexes لوحده ([[autoIndex]]) على الإنتاج: بيتبنوا وقت تشغيل التطبيق على collections كبيرة. وتعمل [[unique]] على حقل فيه تكرار أصلًا فيفشل؛ نضّف التكرار الأول.`
          },
          teach: R`## الـ index = فهرس الكتاب

من غير فهرس، عشان تلاقي كلمة في كتاب لازم تقلّب كل الصفحات. ده اللي Mongo بيعمله من غير index: بيقرا كل مستند، واسمها **COLLSCAN** (collection scan). الـ index نسخة مترتبة من حقل (أو أكتر) ومعاها مكان كل مستند، فـ Mongo بيروح للي محتاجه على طول، واسمها **IXSCAN** (index scan). جرّبت المثال في mongosh على [[mongo:8]] بـ 1000 أوردر لـ 50 يوزر (كل يوزر عنده 20).

---

## ١. index فريد على الإيميل

~~~javascript
db.users.createIndex({ email: 1 }, { unique: true })
~~~

- [[{ email: 1 }]]: index على email، و [[1]] ترتيب تصاعدي ([[-1]] تنازلي). لحقل واحد الاتجاه مش فارق، لأن Mongo بيقدر يمشي في الـ index من الناحيتين.
- [[{ unique: true }]]: ممنوع قيمتين زي بعض.

~~~text الناتج
email_1
~~~

ده **اسم** الـ index: اسم الحقل + الاتجاه. وجرّبت أضيف إيميل موجود:

~~~text الناتج
Uncaught MongoServerError: E11000 duplicate key error collection: lab.users index: email_1 dup key: { email: "sara@example.com" }
~~~

[[E11000]] كود الـ duplicate key. يعني الـ unique هنا حماية بيانات، مش سرعة بس.

---

## ٢. index مركّب

~~~javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
~~~

index على حقلين: مترتب بـ [[userId]]، وجوه كل يوزر بـ [[createdAt]] من الأحدث. ده بالظبط شكل صفحة «طلباتي»: أوردرات يوزر واحد بالأحدث. اسمه بيطلع [[userId_1_createdAt_-1]].

---

## ٣. [[getIndexes()]]

~~~text الناتج
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  {
    v: 2,
    key: { userId: 1, createdAt: -1 },
    name: 'userId_1_createdAt_-1'
  }
]
~~~

[[_id_]] موجود دايمًا لوحده في كل collection. [[key]] الحقول، و [[name]] الاسم اللي هتحتاجه في [[dropIndex]]، و [[v: 2]] نسخة صيغة الـ index (متشغلش بالك بيها).

---

## ٤. [[explain("executionStats")]]

~~~javascript
db.orders.find({ userId: 42 }).sort({ createdAt: -1 }).explain("executionStats")
~~~

[[explain]] بدل ما يرجّع النتايج، بيرجّع **إزاي** Mongo جابها. و [["executionStats"]] معناها «نفّذ فعلًا وقولي الأرقام». الناتج طويل، فهنبص على حتتين: [[queryPlanner.winningPlan]] (الخطة اللي اتنفذت) و [[executionStats]] (الأرقام).

### قبل الـ index

~~~text winningPlan
{
  stage: 'SORT',
  sortPattern: { createdAt: -1 },
  memLimit: 104857600,
  inputStage: {
    stage: 'COLLSCAN',
    filter: { userId: { '$eq': 42 } },
    ...
  }
}
~~~

اتقرا من تحت لفوق (من [[inputStage]] لبرّه): **COLLSCAN** قرا كل المستندات وفلتر [[userId = 42]]، وبعدين **SORT** رتّبهم في الرام. [[memLimit: 104857600]] = 100 ميجا بالبايت، أقصى رام مسموح للترتيب ده.

| الرقم | القيمة | معناه |
|---|---|---|
| [[nReturned]] | 20 | رجّع كام |
| [[totalKeysExamined]] | 0 | قرا كام مفتاح من index (مفيش index) |
| [[totalDocsExamined]] | 1000 | قرا كام مستند |

قرا 1000 عشان يرجّع 20.

### بعد الـ index

~~~text winningPlan
{
  stage: 'FETCH',
  inputStage: {
    stage: 'IXSCAN',
    keyPattern: { userId: 1, createdAt: -1 },
    indexName: 'userId_1_createdAt_-1',
    ...
    indexBounds: { userId: [ '[42, 42]' ], createdAt: [ '[MaxKey, MinKey]' ] }
  }
}
~~~

**IXSCAN** مشي في الـ index على المفاتيح اللي [[userId]] بتاعها من 42 لـ 42 ([[indexBounds]])، وهي أصلًا مترتبة بالتاريخ، فمفيش SORT خالص. **FETCH** جاب المستندات نفسها. والأرقام: [[nReturned: 20]] و [[totalKeysExamined: 20]] و [[totalDocsExamined: 20]].

> القاعدة: قارن [[totalDocsExamined]] بـ [[nReturned]]. قريبين من بعض = الـ index شغال. واحد بالآلاف والتاني بالعشرات = ناقصك index.

وفي التجربة بتاعة الـ [[try]] على 100 ألف مستند: [[totalDocsExamined]] كان [[100000]] قبل [[createIndex({ n: 1 })]] و [[1]] بعده.

---

## ٥. [[dropIndex]]

~~~javascript
db.orders.dropIndex("userId_1_createdAt_-1")
~~~

~~~text الناتج
{ nIndexesWas: 2, ok: 1 }
~~~

[[nIndexesWas: 2]] = كان فيه اتنين قبل المسح ([[_id_]] والمركّب). بعدها [[getIndexes()]] فيه [[_id_]] بس.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[createIndex({ f: 1 })]] | index، واسمه [[f_1]] |
| [[{ unique: true }]] | يمنع التكرار (E11000) |
| [[getIndexes()]] | الموجود وأساميه |
| [[explain("executionStats")]] | COLLSCAN ولا IXSCAN، وقرا كام |
| [[dropIndex("name")]] | يشيله |

كل index بيبطّأ الكتابة شوية وبياخد مساحة، فاعمله للحقول اللي بتدوّر أو بترتّب بيها فعلًا.`,
          lines: [
            "index على الإيميل، ومفيش إيميلين زي بعض.",
            "index مركّب: طلبات يوزر مرتبة بالأحدث.",
            "الـ indexes الموجودة وأساميها.",
            "Mongo عمل إيه فعلًا في الاستعلام ده.",
            "شيل index باسمه."
          ],
          sol: R`خلي بالك إن اللوب ده بطيء: ١٠٠ ألف [[insertOne]] كل واحد رحلة للسيرفر، وأخد عندي حوالي دقيقة ونص. نفس الداتا بـ [[insertMany]] خلصت في أقل من ثانية.

قبل الـ index: [[winningPlan.stage]] بيبقى [[COLLSCAN]]، و [[totalDocsExamined: 100000]] و [[totalKeysExamined: 0]]. قرا كل المستندات عشان يلاقي واحد.

بعد [[createIndex({ n: 1 })]] (بيرجّع اسمه [['n_1']]): الخطة بقت [[FETCH]] وتحتها [[IXSCAN]] على [[n_1]]، و [[totalDocsExamined: 1]] و [[totalKeysExamined: 1]]. الوقت نزل من حوالي 20ms لـ 1ms.

المقياس المهم هو نسبة [[totalDocsExamined]] لـ [[nReturned]]: قريبة من 1 يبقى الـ index شغال. ولو بعد الـ index لسه [[COLLSCAN]]، اتأكد إن اسم الحقل في الـ find هو نفسه في الـ index، وإنك على نفس الـ collection. و [[explain()]] من غير [["executionStats"]] مش هيطلّع الأرقام دي.`,
          solCode: R`use lab
db.t.insertMany(Array.from({ length: 100000 }, (_, i) => ({ n: i })))
db.t.find({ n: 99999 }).explain("executionStats").executionStats.totalDocsExamined
db.t.createIndex({ n: 1 })
db.t.find({ n: 99999 }).explain("executionStats").executionStats.totalDocsExamined`
        },
        {
          cmd: "بورت 27017",
          title: "متفتحش بورت القاعدة للإنترنت",
          desc: R`Mongo لازم يسمع على [[127.0.0.1]] أو جوه شبكة Docker بس. و Docker بيفتح البورتات من غير ما يعدّي على ufw، فـ [[-p 27017:27017]] معناها مفتوح للعالم حتى لو ufw قافل.

ولو محتاج تدخل من جهازك (Compass مثلًا): SSH tunnel.`,
          example: R`docker ps --format '{{.Names}}\t{{.Ports}}'
sudo ss -ltnp | grep 27017
nc -zv -w 3 203.0.113.10 27017
ssh -N -L 27017:127.0.0.1:27017 deploy@203.0.113.10`,
          try: R`على سيرفر التجربة: شغّل التالت من جهازك (مش من السيرفر)، والمفروض يفشل. لو اتصل، بورت القاعدة مفتوح للعالم.`,
          deep: {
            why: "فيه بوتات بتلف على الإنترنت كله على بورت 27017. لو لقت Mongo مفتوح، بتمسح القواعد وتسيب collection فيها رسالة فدية. ولو فيه باسورد، بتجرّب باسوردات.",
            how: R`[[docker ps]] بيوريك البورتات المنشورة: [[0.0.0.0:27017->27017/tcp]] يعني مفتوح على كل الواجهات، و [[127.0.0.1:27017->27017/tcp]] يعني السيرفر نفسه بس. ولو مفيش بورت خالص يبقى أحسن: التطبيق بيوصل جوه شبكة compose.

[[ss -ltnp]] نفس الفكرة من ناحية السيستم: مين بيسمع على البورت وعلى أنهي عنوان.

Docker بيكتب قواعد iptables بتاعته قبل قواعد ufw، فـ [[ufw deny 27017]] مش بيقفل بورت نشره Docker. الحل إنك متنشرهوش على 0.0.0.0 من الأول.

[[ssh -N -L]]: البورت 27017 على جهازك بيتنقل عبر SSH لـ 127.0.0.1:27017 على السيرفر. بعدها Compass على جهازك يتصل بـ [[mongodb://...@localhost:27017]] كأن القاعدة عندك. [[-N]] من غير shell، بس النفق.`,
            when: "بعد أي تشغيل لـ Mongo على سيرفر، وبعد أي تعديل في compose.",
            mistakes: R`في مشروع حقيقي الباك إند كان ناشر [[5000:5000]] على كل الواجهات، فالـ API كان مكشوف مباشرة من غير Nginx؛ نفس الغلطة بتحصل مع 27017. اكتب [[127.0.0.1:]] قبل أي بورت مش المفروض يبقى عام. و [[--bind_ip_all]] جوه Docker عادي، الحماية بتبقى في ports.`
          },
          teach: R`## ٤ أسئلة: مين فاتح البورت؟ وعلى أنهي عنوان؟ واصل من برّه؟ وإزاي أدخل بأمان؟

كل سطر في المثال بيجاوب سؤال. الأول والتاني بيتشغّلوا **على السيرفر**، والتالت **من جهازك**، والرابع من جهازك برضه. [[203.0.113.10]] IP مثال (المدى [[203.0.113.x]] محجوز للتوثيق ومش بتاع حد)، حط مكانه IP سيرفرك. جرّبت التلاتة الأولانيين على Docker Desktop وجوه container من [[ubuntu:24.04]]، والرابع (SSH tunnel) محتاج سيرفر حقيقي فشرحه من الـ docs بتاعة OpenSSH.

---

## ١. Docker ناشر إيه؟

~~~bash
docker ps --format '{{.Names}}\t{{.Ports}}'
~~~

- [[docker ps]]: الـ containers الشغالة.
- [[--format '...']]: بدل الجدول الكامل، اطبع اللي أنا عايزه بس. [[{{.Names}}]] الاسم، و [[{{.Ports}}]] البورتات، و [[\t]] tab بينهم.
- العلامات المفردة عشان bash ميلمسش [[{{ }}]] (في PowerShell نفس الأمر شغال زي ما هو).

شغّلت container تجربة منشور غلط جنب الـ lab:

~~~text الناتج
mongo-lab-pub	0.0.0.0:27119->27017/tcp, [::]:27119->27017/tcp
mongo-lab-a	127.0.0.1:27117->27017/tcp
~~~

اقرا كل واحد كده: **عنوان:بورت عندك ← بورت جوه**.

| اللي قبل البورت | معناه |
|---|---|
| [[0.0.0.0]] | كل كروت الشبكة: الجهاز، والشبكة المحلية، والإنترنت لو السيرفر مكشوف. **خطر** |
| [[[::]]] | نفس الكلام بس IPv6 |
| [[127.0.0.1]] | الجهاز ده بس (loopback). **ده الصح** |
| مفيش بورتات خالص | محدش من برّه Docker يوصل، والتطبيق في نفس compose بيوصل باسم الخدمة |

السطر الأول جه من [[-p 27119:27017]] من غير IP، والتاني من [[-p 127.0.0.1:27117:27017]].

---

## ٢. مين بيسمع على السيستم؟

~~~bash
sudo ss -ltnp | grep 27017
~~~

[[ss]] (socket statistics) بيعرض الـ sockets. الـ flags متلزقة في بعض:

| flag | معناه |
|---|---|
| [[-l]] | listening: اللي مستني اتصالات بس |
| [[-t]] | TCP بس |
| [[-n]] | أرقام: [[27017]] مش اسم خدمة |
| [[-p]] | process: اسم البرنامج (محتاج [[sudo]] عشان يشوف بتاع كل اليوزرز) |

و [[| grep 27017]] بيسيب السطور اللي فيها 27017 بس. جرّبته جوه شبكة الـ container بتاع Mongo نفسه:

~~~text الناتج
LISTEN 0      4096         0.0.0.0:27017      0.0.0.0:*
~~~

عمود [[Local Address:Port]] هو المهم. جوه الـ container [[0.0.0.0]] طبيعي (Mongo في صورة Docker بيسمع على كل حاجة جوه، عشان الـ containers التانية توصله)، والحماية الحقيقية في الـ [[ports]] بتاعة Docker. على السيرفر نفسه (برّه Docker) المفروض تشوف [[127.0.0.1:27017]]، ولو شفت [[0.0.0.0:27017]] أو [[*:27017]] يبقى مفتوح.

---

## ٣. واصل من برّه؟

~~~bash
nc -zv -w 3 203.0.113.10 27017
~~~

[[nc]] (netcat) أداة بتفتح اتصال TCP:

| flag | معناه |
|---|---|
| [[-z]] | zero I/O: جرّب تتصل بس، متبعتش حاجة |
| [[-v]] | verbose: قولي النتيجة |
| [[-w 3]] | wait: استنى ٣ ثواني بالكتير |

جرّبت التلات حالات:

~~~text بورت مفتوح (Mongo على 127.0.0.1 من جوه)
Connection to 127.0.0.1 27017 port [tcp/*] succeeded!
~~~

~~~text مفيش حد بيسمع
nc: connect to 127.0.0.1 port 27019 (tcp) failed: Connection refused
~~~

~~~text الـ IP المثال
nc: connect to 203.0.113.10 port 27017 (tcp) timed out: Operation now in progress
~~~

من جهازك على سيرفرك: [[succeeded]] = **مشكلة**، القاعدة مكشوفة. [[refused]] (حد رد وقال لأ) أو [[timed out]] (محدش رد خالص، غالبًا فايروول) = تمام. و exit code بيبقى 1 في الحالتين دول، فتقدر تحطه في سكربت.

### ليه ufw مش كفاية؟

Docker بيضيف قواعد iptables بتاعته في مكان بيتقري **قبل** قواعد ufw، فبورت منشور على [[0.0.0.0]] بيبقى مفتوح حتى لو [[ufw status]] مش فاتحه. الحل مش في الفايروول، الحل [[127.0.0.1:]] في الـ ports.

---

## ٤. ادخل بأمان: SSH tunnel

~~~bash
ssh -N -L 27017:127.0.0.1:27017 deploy@203.0.113.10
~~~

| الجزء | معناه |
|---|---|
| [[deploy@203.0.113.10]] | ادخل السيرفر باليوزر deploy |
| [[-L 27017:127.0.0.1:27017]] | Local forward: البورت 27017 **على جهازك** يتنقل عبر SSH لـ [[127.0.0.1:27017]] **من ناحية السيرفر** |
| [[-N]] | No command: متفتحش shell، النفق بس |

اقراها: **بورت عندي : عنوان من عند السيرفر : بورته**. الأمر بيفضل شغال (من غير ما يطبع حاجة)، وطول ما هو شغال Compass أو mongosh على جهازك يتصل بـ [[mongodb://...@localhost:27017/...]] كأن القاعدة عندك، والاتصال كله مشفّر جوه SSH. [[Ctrl+C]] بيقفل النفق. ولو 27017 مستخدم عندك، غيّر الأول: [[-L 27018:127.0.0.1:27017]] واتصل على 27018. والأمر ده نفسه شغال من PowerShell على ويندوز ١٠/١١ (OpenSSH جاي مع ويندوز).

## الخلاصة

| السؤال | الأمر | الإجابة الصح |
|---|---|---|
| Docker ناشر إيه؟ | [[docker ps --format ...]] | [[127.0.0.1:27017->27017/tcp]] أو مفيش |
| السيستم بيسمع فين؟ | [[sudo ss -ltnp]] | [[127.0.0.1:27017]] |
| واصل من برّه؟ | [[nc -zv]] من جهازك | refused أو timed out |
| أدخل إزاي؟ | [[ssh -N -L]] | نفق، مش بورت مفتوح |`,
          lines: [
            "كل container والبورتات اللي نشرها (دوّر على 0.0.0.0).",
            "مين بيسمع على 27017 وعلى أنهي عنوان.",
            "من جهازك: البورت ده مفتوح من بره؟ (المفروض يفشل).",
            "نفق: 27017 على جهازك يوصل للقاعدة على السيرفر."
          ],
          sol: R`النتيجة الصح من جهازك: [[nc]] يفشل، يا بـ [[Connection timed out]] (الفايروول بيرمي الباكتات) يا [[Connection refused]]. وعلى السيرفر [[docker ps]] لازم يطلّع البورت كده [[127.0.0.1:27017->27017/tcp]]، و [[ss -ltnp]] يطلّع [[127.0.0.1:27017]].

لو طلع [[Connection to 203.0.113.10 27017 port [tcp/*] succeeded!]] يبقى القاعدة مفتوحة للإنترنت. غالبًا compose فيه [["27017:27017"]] من غير [[127.0.0.1]]، و [[docker ps]] بيوريك [[0.0.0.0:27017->27017/tcp]]. والمفاجأة إن ufw مش بيحميك هنا: Docker بيكتب قواعد iptables بتاعته قبل ufw، فحتى لو [[ufw status]] مش فاتح 27017 البورت مفتوح. الحل تغيّر السطر لـ [["127.0.0.1:27017:27017"]] وتعمل [[docker compose up -d]]، أو تشيل [[ports]] خالص لو التطبيق في نفس الـ compose.

وبعدها تستخدم الـ tunnel (السطر الرابع) لما تحتاج توصل من جهازك.`
        }
      ]
    },
    {
      t: "تصميم المستندات والاستعلامات",
      l: 2,
      n: "المستند بيتصمم على حسب إنت بتقراه إزاي، والتقارير بـ aggregate، و populate من غير N+1، و transactions",
      items: [
        {
          cmd: "embed ولا reference",
          title: "أحط البيانات جوه المستند ولا في collection لوحدها؟",
          desc: R`في Mongo السؤال مش «الجداول إيه» زي SQL، السؤال «الشاشة دي بتقرا إيه مع بعض». اللي بيتقري مع بعض دايمًا ومحدود العدد: حطه جوه المستند (embed). اللي بيكبر من غير حد، أو بيتقري لوحده، أو بيتشارك بين مستندات كتير: collection لوحده وتحط الـ [[_id]] بتاعه (reference).

والنص بالنص شائع: الأوردر فيه [[productId]] (reference) ومعاه نسخة من الاسم والسعر وقت الشرا (embed)، لأن سعر المنتج هيتغير والفاتورة لأ.`,
          example: R`use shop
db.users.insertOne({ _id: 1, name: "Sara", addresses: [{ city: "Cairo", street: "Tahrir 5", isDefault: true }] })
db.products.insertOne({ _id: 10, name: "Keyboard", price: 750, stock: 40 })
db.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId: 10, name: "Keyboard", price: 750, qty: 2 }], total: 1500 })
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.orders.find({ userId: 1 }).sort({ createdAt: -1 }).limit(10)
db.users.findOne({ _id: 1 }, { name: 1, addresses: 1 })
db.products.updateOne({ _id: 10 }, { $set: { price: 800 } })
db.orders.findOne({ userId: 1 }, { items: 1, _id: 0 })`,
          try: R`صمّم على ورقة الأول، وبعدين في mongosh: مدونة فيها posts و authors و tags و comments. اكتب جنب كل واحدة «embed» ولا «reference» وليه، على حسب ٣ شاشات: صفحة البوست، وصفحة الكاتب بكل بوستاته، وأحدث ١٠٠ تعليق في الموقع كله.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل Mongo في الإنتاج مش من Mongo نفسها، من تصميم مستندات منقول من SQL (كل حاجة collection لوحدها فكل صفحة ١٠ queries)، أو العكس (كل حاجة جوه مستند واحد لحد ما يتقل ويوصل للحد). والتصميم ده بيتسأل في أي انترفيو فيه Mongo.",
            how: R`القاعدة اللي MongoDB نفسها بتقولها: «البيانات اللي بتتقري مع بعض تتخزن مع بعض». فابدأ من الشاشات والـ endpoints: كل واحدة بتقرا إيه؟ وكل قد إيه؟ وبتكتب إيه؟

embed لما: العلاقة «جزء من» (عناوين اليوزر، بنود الأوردر)، والعدد صغير ومعروف حده، ومش محتاج تجيب الحاجة دي لوحدها من غير الأب. الميزة: قراية واحدة بتجيب كل حاجة، والكتابة على مستند واحد atomic من غير transaction.

reference لما: العدد مالوش سقف (تعليقات، لوجات، أوردرات اليوزر)، أو الحاجة بتتقري لوحدها (صفحة منتج)، أو بتتشارك بين كتير وبتتعدل (سعر المنتج الحالي، اسم اليوزر). المرجع هو [[_id]] بس، والـ join بيبقى query تانية أو [[$lookup]] أو [[populate]] (دروس جاية).

النسخة (denormalization): الأوردر شايل [[name]] و [[price]] من المنتج. ده مش تكرار غلط، ده تاريخ: السطر [[updateOne]] غيّر السعر لـ 800، والأوردر لسه بيقول 750، وده المطلوب في فاتورة. بس لو نسخت حاجة المفروض تفضل متزامنة (زي اسم اليوزر في كل تعليق)، إنت اللي مسؤول تحدّثها في كل مكان.

one-to-many بتتصمم على حسب «many» قد إيه: عشرات: array جوه الأب. مئات لآلاف: array من الـ ids في الأب أو [[userId]] في الابن. ملايين: الابن بس هو اللي بيشاور على الأب ([[userId]] في كل أوردر) ومعاه index، زي المثال.`,
            when: "أول ما تبدأ collection جديدة، وكل ما تلاقي صفحة بتعمل queries كتير أو مستند بيكبر مع الوقت.",
            mistakes: R`تنقل تصميم SQL زي ما هو: [[order_items]] collection لوحدها، فعرض أوردر واحد بقى ٣ queries. وتعمل العكس: اليوزر جواه array بكل أوردراته، فبعد سنة المستند بقى ميجات وكل login بيقراه كله (الدرس الجاي). وفي الانترفيو: «Mongo مفيهاش joins» غلط، فيه [[$lookup]]، بس التصميم الكويس بيقلل الحاجة ليه.`
          },
          teach: R`## نفس المحل بـ ٣ collections، وكل قرار وراه سؤال

المثال محل صغير: يوزر، ومنتج، وأوردر. كل collection فيها قرار: إيه اللي يتحط **جوه** المستند (embed)، وإيه اللي يبقى في مكان لوحده ونشاور عليه بالـ [[_id]] (reference). اتشغّل كله في mongosh على [[mongo:8]] على قاعدة shop فاضية.

السؤالين اللي بيحسموا:

1. الحاجة دي بتتقري **مع** الأب دايمًا؟ وعددها **محدود**؟ ← embed.
2. بتكبر من غير سقف؟ أو بتتقري لوحدها؟ أو بتتشارك بين مستندات كتير وبتتعدل؟ ← reference.

---

## ١. اليوزر وجواه العناوين (embed)

~~~javascript
db.users.insertOne({ _id: 1, name: "Sara", addresses: [{ city: "Cairo", street: "Tahrir 5", isDefault: true }] })
~~~

- [[_id: 1]]: احنا اللي اخترنا الـ id المرة دي (رقم بسيط عشان المثال)، فـ Mongo مش هيعمل ObjectId. الرد: [[{ acknowledged: true, insertedId: 1 }]]. ولو كتبته تاني بيرفض: [[E11000 duplicate key error ... index: _id_ dup key: { _id: 1 }]].
- [[addresses: [ {...} ]]]: array جواها objects. كل عنوان مستند صغير جوه اليوزر.

ليه embed؟ العناوين بتظهر في صفحة الحساب والـ checkout مع اليوزر، واليوزر عنده ٢ أو ٣ بالكتير، ومحدش بيفتح «عنوان» لوحده.

---

## ٢. المنتج لوحده (reference)

~~~javascript
db.products.insertOne({ _id: 10, name: "Keyboard", price: 750, stock: 40 })
~~~

ليه لوحده؟ ليه صفحة لوحده، وأوردرات كتير بتشاور عليه، وسعره ومخزونه بيتغيروا.

---

## ٣. الأوردر: reference ومعاه نسخة

~~~javascript
db.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId: 10, name: "Keyboard", price: 750, qty: 2 }], total: 1500 })
~~~

| الحقل | نوعه | ليه |
|---|---|---|
| [[userId: 1]] | reference لليوزر | اليوزر عنده أوردرات مالهاش سقف، فمش هنحطها جواه |
| [[createdAt: new Date()]] | تاريخ | [[new Date()]] = دلوقتي، وبيتخزن UTC |
| [[items: [...]]] | embed | بنود الأوردر جزء منه وبتتقري معاه دايمًا |
| [[productId: 10]] | reference للمنتج | لو حد عايز يفتح صفحة المنتج |
| [[name]] و [[price]] جوه البند | **نسخة** | السعر وقت الشرا، مش السعر الحالي |

النسخة دي اسمها **denormalization**: بنكرر حاجة عمدًا عشان القراية تبقى أسهل، أو عشان هي تاريخ.

---

## ٤. index لأهم شاشة

~~~javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
~~~

بيرجّع [[userId_1_createdAt_-1]]. الأوردرات في collection لوحدها، فلازم index يجيب أوردرات يوزر بسرعة ومترتبة (درس createIndex).

---

## ٥. صفحة «طلباتي»

~~~javascript
db.orders.find({ userId: 1 }).sort({ createdAt: -1 }).limit(10)
~~~

~~~text الناتج
[
  {
    _id: ObjectId('6ac4fceab9916775feb03969'),
    userId: 1,
    status: 'paid',
    createdAt: ISODate('2026-10-06T13:51:38.368Z'),
    items: [ { productId: 10, name: 'Keyboard', price: 750, qty: 2 } ],
    total: 1500
  }
]
~~~

query واحدة، والبنود باسم المنتج وسعره جوه، فمش محتاجين نروح لـ products. والـ [[Z]] في آخر التاريخ معناها UTC.

---

## ٦. صفحة الحساب

~~~javascript
db.users.findOne({ _id: 1 }, { name: 1, addresses: 1 })
~~~

~~~text الناتج
{
  _id: 1,
  name: 'Sara',
  addresses: [ { city: 'Cairo', street: 'Tahrir 5', isDefault: true } ]
}
~~~

برضه قراية واحدة، لأن العناوين جوه.

---

## ٧. و ٨. السعر اتغير

~~~javascript
db.products.updateOne({ _id: 10 }, { $set: { price: 800 } })
db.orders.findOne({ userId: 1 }, { items: 1, _id: 0 })
~~~

الأول [[matchedCount: 1, modifiedCount: 1]]. والتاني:

~~~text الناتج
{ items: [ { productId: 10, name: 'Keyboard', price: 750, qty: 2 } ] }
~~~

المنتج بقى 800، والأوردر لسه 750. ده **صح**: الفاتورة لازم تفضل بالسعر اللي اليوزر دفعه. لو كنا عاملين reference بس من غير نسخة، كل الفواتير القديمة كانت هتتغير.

---

## «many» قد إيه؟

| العدد | التصميم |
|---|---|
| قليل ومعروف (عناوين، بنود أوردر) | array جوه الأب |
| مئات لآلاف | array من الـ ids في الأب، أو id الأب في الابن |
| مالوش سقف (أوردرات، تعليقات، لوجات) | الابن بس شايل id الأب ([[userId]]) ومعاه index |

## الخلاصة

- ابدأ من الشاشات: كل شاشة بتقرا إيه مع بعض؟
- embed للصغير اللي بيتقري مع أبوه، و reference للي بيكبر أو بيتقري لوحده.
- النسخة (denormalization) مش غلط لما تكون تاريخ (سعر الشرا). لو لازم تفضل متزامنة، انت مسؤول تحدّثها.`,
          lines: [
            "ادخل قاعدة shop.",
            "العناوين جوه اليوزر: بتتقري معاه وعددها صغير.",
            "المنتج لوحده: بيتقري لوحده وبيتشارك بين أوردرات كتير.",
            "الأوردر بيشاور على اليوزر والمنتج، وشايل نسخة من الاسم والسعر وقت الشرا.",
            "index لأهم قراية: أوردرات يوزر بالأحدث.",
            "صفحة «طلباتي»: query واحدة من غير join.",
            "صفحة الحساب: اليوزر بعناوينه في قراية واحدة.",
            "السعر اتغير في المنتج...",
            "...والأوردر لسه شايل السعر القديم، وده الصح في فاتورة."
          ],
          sol: R`مفيش إجابة واحدة، بس التصميم المعقول:

[[authors]] collection لوحدها، والبوست فيه [[authorId]] ومعاه نسخة من [[authorName]] عشان صفحة البوست متعملش query زيادة (ولو الكاتب غيّر اسمه، [[updateMany]] على بوستاته).

[[tags]]: array من النصوص جوه البوست ([[tags: ["mongo", "node"]]]) ومعاه index، لأنها صغيرة ومش محتاجة صفحة لوحدها.

[[comments]]: collection لوحدها فيها [[postId]] و [[createdAt]]، لأن عددها مالوش سقف، وشاشة «أحدث ١٠٠ تعليق في الموقع» محتاجاها لوحدها. ومع البوست ممكن تحط [[commentCount]] وآخر ٣ تعليقات (الدرس الجاي).

الغلطة الشائعة: التعليقات كلها array جوه البوست. شغالة في الأول، وبعدين بوست مشهور يتقل، و «أحدث ١٠٠ تعليق» تبقى aggregate على كل البوستات.`,
          solCode: R`use blogdesign
db.authors.insertOne({ _id: 1, name: "Sara", bio: "..." })
db.posts.insertOne({ _id: 1, title: "Hello Mongo", authorId: 1, authorName: "Sara", tags: ["mongo", "node"], commentCount: 0, recentComments: [] })
db.posts.createIndex({ authorId: 1, createdAt: -1 })
db.posts.createIndex({ tags: 1 })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.createIndex({ createdAt: -1 })
db.comments.find().sort({ createdAt: -1 }).limit(100)`
        },
        {
          cmd: "حد الـ 16MB و bucket",
          title: "array بتكبر من غير سقف: ليه خطر، وتعمل إيه بدلها",
          desc: R`أقصى حجم لمستند Mongo ١٦ ميجا، ولو [[$push]] عدّاه الكتابة بتفشل. بس المشكلة بتبان قبل كده بكتير: كل قراية للمستند بتسحب الـ array كلها، وكل تعديل بيكتبه تاني.

الحل: الحاجة اللي مالهاش سقف في collection لوحدها، والأب يشيل عدّاد وآخر كام واحدة بس ([[$slice]]). ولو البيانات كتير وصغيرة (قراءات حساس، أحداث)، اجمعها في «buckets» كل واحد فيه عدد محدود.`,
          example: R`use blog
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice" }], $slice: -3 } }, $inc: { commentCount: 1 } })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.find({ postId: 1 }).sort({ createdAt: -1 }).limit(20)
bsonsize(db.posts.findOne({ _id: 1 }))
db.posts.aggregate([{ $project: { bytes: { $bsonSize: "$$ROOT" } } }, { $sort: { bytes: -1 } }, { $limit: 5 }])
db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }, { $push: { values: { t: new Date(), v: 21.5 } }, $inc: { count: 1 } }, { upsert: true })`,
          try: R`ضيف ٥ تعليقات بسطري التعليق (في loop)، واتأكد إن [[recentComments]] فيها آخر ٣ بس و [[commentCount]] بقى 5. وبعدين غيّر الـ 500 في سطر الـ readings لـ 3، وشغّله ٧ مرات، وشوف كام bucket اتعمل.`,
          flag: "script",
          deep: {
            why: "«اليوزر جواه array بكل الـ notifications» شغال أول شهر. بعد سنة المستند بقى ميجات، وكل صفحة بتقرا اليوزر (يعني كل request) بتسحبها كلها من الديسك والشبكة، ويوم ما يعدّي ١٦ ميجا الكتابة تقف خالص.",
            how: R`١٦ ميجا حد صارم على حجم المستند BSON (بالظبط 16777216 بايت). جرّبت أعمل [[$push]] على مستند ١٥ ميجا بحاجة ٢ ميجا، والسيرفر (mongo:8) رفض بـ [[Resulting document after update is larger than 16777216]]. والـ driver نفسه بيرفض يبعت insert أكبر من الحد قبل ما يوصل للسيرفر.

قبل الحد بكتير: المستند بيتقري ويتكتب كامل. [[$push]] على array فيها ١٠٠ ألف عنصر بيعيد كتابة المستند كله، والـ index على حقل جوه الـ array (multikey) فيه entry لكل عنصر.

subset pattern (السطر ٤): التعليقات كلها في [[comments]]، والبوست شايل [[commentCount]] وآخر ٣ بس. [[$each]] مع [[$slice: -3]] بيضيف ويقص في نفس الخطوة، فالـ array عمرها ما تعدّي ٣. صفحة البوست قراية واحدة، و «كل التعليقات» صفحة لوحدها بـ pagination على [[comments]].

قياس الحجم: [[bsonsize()]] في mongosh لمستند واحد، و [[$bsonSize: "$$ROOT"]] في aggregate عشان تلاقي أكبر المستندات في الـ collection كلها.

bucket pattern (آخر سطر): بدل مستند لكل قراية (ملايين مستندات صغيرة وindex ضخم)، أو مستند واحد للحساس (بيكبر للأبد)، مستند لكل حساس في اليوم وفيه لحد ٥٠٠ قراية. الشرط [[count: { $lt: 500 }]]: لو الـ bucket الحالي امتلى، الشرط مش هيطابق، و [[upsert]] يعمل bucket جديد. ولو شغلك قراءات بالوقت أصلًا، Mongo فيها time series collections ([[createCollection]] بـ [[timeseries]]) بتعمل ده لوحدها.

outlier pattern: لو ٩٩٪ من الكتب عندها كام مشتري وكتاب واحد عنده مليون، متغيرش التصميم كله عشانه: خلي الـ array تتقص عند حد، وحط [[hasExtras: true]] وكمّل الباقي في collection تانية للحالات الشاذة بس.`,
            when: "أي array ممكن تكبر مع الوقت أو مع الاستخدام: تعليقات، لايكات، notifications، لوج، تاريخ أسعار، أعضاء جروب كبير.",
            mistakes: R`تعمل unique index على [[{ sensorId: 1, day: 1 }]] في الـ buckets، فأول ما bucket يمتلي الـ upsert يفشل بـ duplicate key، لأن اليوم ممكن يبقى فيه أكتر من bucket. وتحط [[likes: [userIds]]] جوه البوست عشان «هل اليوزر ده عمل لايك؟»: الأحسن collection [[likes]] بـ unique index على [[{ postId: 1, userId: 1 }]]. وفي الانترفيو: الـ 16MB إجابة سؤال «إيه عيوب embed؟»، بس الإجابة الأقوى إن الأداء بيقع قبل الحد بكتير.`
          },
          teach: R`## مستند بيكبر للأبد = مشكلة مؤجلة

المثال فيه ٣ حتت: البوست شايل **آخر ٣ تعليقات بس** (subset pattern)، وأداتين تقيس بيهم حجم المستندات، وقراءات حساس متجمعة في **buckets**. اتشغّل كله في mongosh على [[mongo:8]] على قاعدة blog فاضية.

---

## الحد نفسه: ١٦ ميجا

جرّبته: مستند فيه نص ١٥ ميجا، وبعدين [[$push]] بنص ٢ ميجا:

~~~text الناتج
Uncaught MongoServerError: Plan executor error during update :: caused by :: Resulting document after update is larger than 16777216
~~~

[[16777216]] = 16 × 1024 × 1024 بايت بالظبط. والتعديل اترفض كله. بس المشكلة الحقيقية قبل كده: كل قراية للمستند بتجيبه كله، فمستند ٥ ميجا بيتسحب كامل في كل request.

---

## ١. و ٢. البوست والتعليق

~~~javascript
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
~~~

البوست فيه عدّاد [[commentCount]] و array فاضية [[recentComments]]. والتعليق نفسه في collection [[comments]] لوحده، وشايل [[postId]] (reference للبوست).

---

## ٣. السطر المهم: [[$push]] مع [[$each]] و [[$slice]]

~~~javascript
db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice" }], $slice: -3 } }, $inc: { commentCount: 1 } })
~~~

نفكّه من جوه:

| الحتة | معناها |
|---|---|
| [[$push: { recentComments: ... }]] | ضيف للـ array دي |
| [[$each: [ {...} ]]] | العناصر اللي هتتضاف (لازم array، حتى لو واحد) |
| [[$slice: -3]] | بعد الإضافة، سيب آخر ٣ بس (السالب = من الآخر) |
| [[$inc: { commentCount: 1 }]] | وفي نفس الخطوة زوّد العدّاد |

[[$slice]] مش بيشتغل مع [[$push]] لوحده، لازم [[$each]] معاه، عشان كده الشكل ده. والتعديلين ([[$push]] و [[$inc]]) على نفس المستند في عملية واحدة، فـ atomic: يا الاتنين يحصلوا يا ولا واحد.

شغّلته ٤ مرات زيادة (nice 2 لـ nice 5)، والبوست بقى:

~~~text الناتج
{
  _id: 1,
  title: 'Hello',
  commentCount: 5,
  recentComments: [
    { author: 'Omar', text: 'nice 3' },
    { author: 'Omar', text: 'nice 4' },
    { author: 'Omar', text: 'nice 5' }
  ]
}
~~~

العدّاد ٥، والـ array عمرها ما تعدّي ٣. صفحة البوست تقرا مستند واحد صغير.

---

## ٤. و ٥. كل التعليقات من مكانها

~~~javascript
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.find({ postId: 1 }).sort({ createdAt: -1 }).limit(20)
~~~

لما اليوزر يدوس «كل التعليقات»: من collection التعليقات، بالأحدث، ٢٠ ٢٠ (pagination). والـ index على [[postId]] ثم [[createdAt]] عشان ده يبقى سريع مهما كبرت.

---

## ٦. حجم مستند

~~~javascript
bsonsize(db.posts.findOne({ _id: 1 }))
~~~

~~~text الناتج
110
~~~

[[bsonsize]] دالة في mongosh بترجّع حجم المستند بالبايت بصيغة BSON (الصيغة اللي Mongo بيخزن بيها).

## ٧. أكبر المستندات في الـ collection

~~~javascript
db.posts.aggregate([{ $project: { bytes: { $bsonSize: "$$ROOT" } } }, { $sort: { bytes: -1 } }, { $limit: 5 }])
~~~

- [[aggregate([...])]]: pipeline مراحل (درس aggregate بالتفصيل).
- [[$project: { bytes: ... }]]: لكل مستند اعمل حقل اسمه bytes.
- [[$bsonSize: "$$ROOT"]]: حجم... [[$$ROOT]] (بدولارين) متغير معناه «المستند كله».
- [[$sort: { bytes: -1 }]] و [[$limit: 5]]: الأكبر الأول، وأول ٥.

~~~text الناتج
[ { _id: 1, bytes: 110 } ]
~~~

على collection حقيقية، ده بيوريك مين بيقرّب من الحد قبل ما يفشل.

---

## ٨. bucket pattern

~~~javascript
db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }, { $push: { values: { t: new Date(), v: 21.5 } }, $inc: { count: 1 } }, { upsert: true })
~~~

الفكرة: حساس بيبعت قراية كل ثانية. مستند لكل قراية = ملايين مستندات صغيرة. ومستند واحد للحساس = بيكبر للأبد. الحل الوسط: مستند (bucket) لكل حساس في اليوم، فيه لحد ٥٠٠ قراية.

| الحتة | معناها |
|---|---|
| [[{ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }]] | الـ bucket بتاع الحساس ده في اليوم ده **اللي لسه فيه مكان** |
| [[$push: { values: {...} }]] | ضيف القراية |
| [[$inc: { count: 1 }]] | زوّد عدد القراءات |
| [[{ upsert: true }]] | لو مفيش bucket فيه مكان، اعمل جديد |

أول مرة مفيش حاجة، فاتعمل:

~~~text الناتج
{
  _id: ObjectId('6ac4fd1063a18ec3c7dd0c18'),
  day: '2026-09-29',
  sensorId: 's1',
  count: 1,
  values: [ { t: ISODate('2026-10-06T13:52:16.288Z'), v: 21.5 } ]
}
~~~

لاحظ إن [[sensorId]] و [[day]] اتنسخوا من الشرط (مساواة)، لكن [[count]] لأ (شرطه [[$lt]] مش مساواة)، فـ [[$inc]] عمله من 0 لـ 1. ولما الـ bucket يوصل 500، الشرط [[$lt: 500]] مش هيطابقه، فالـ upsert يعمل bucket جديد لنفس اليوم.

## الخلاصة

| المشكلة | الحل |
|---|---|
| array بتكبر من غير سقف | collection لوحدها + عدّاد + آخر كام واحد بـ [[$each]] و [[$slice]] |
| ملايين قراءات صغيرة | buckets بحد أقصى + [[upsert]] |
| عايز تعرف مين كبير | [[bsonsize()]] و [[$bsonSize: "$$ROOT"]] |

والحد ١٦ ميجا للمستند، بس الأداء بيقع قبله بكتير.`,
          lines: [
            "ادخل قاعدة blog.",
            "بوست فيه عدّاد و array صغيرة لآخر التعليقات بس.",
            "التعليق نفسه في collection لوحدها.",
            "في نفس الخطوة: ضيف لآخر التعليقات وقص لآخر ٣، وزوّد العداد.",
            "index لصفحة تعليقات البوست.",
            "كل التعليقات: من collection التعليقات بـ pagination.",
            "حجم مستند واحد بالبايت.",
            "أكبر ٥ مستندات في الـ collection بالحجم.",
            "bucket: ضيف القراية لبوكِت اليوم لو فيه مكان، وإلا اعمل bucket جديد."
          ],
          sol: R`بعد ٥ تعليقات: [[commentCount: 5]]، و [[recentComments]] فيها [[nice 2]] و [[nice 3]] و [[nice 4]] بس (الأقدم اتشالوا)، و [[comments]] فيها الخمسة كلهم.

الـ readings بحد ٣ و ٧ قراءات: ٣ مستندات لنفس الحساس ونفس اليوم، الـ count بتاعهم 3 و 3 و 1. الـ upsert بيعمل bucket جديد لما الشرط [[$lt]] ميطابقش.

لو طلعلك bucket واحد فيه ٧: غالبًا نسيت [[count]] في الشرط، أو كتبت [[$set]] بدل [[$inc]]. ولو طلع duplicate key error: عندك unique index على [[sensorId]] و [[day]]، امسحه.`,
          solCode: R`use blog
db.posts.deleteMany({}); db.comments.deleteMany({}); db.readings.deleteMany({})
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
for (let i = 0; i < 5; i++) {
  db.comments.insertOne({ postId: 1, author: "Omar", text: "nice " + i, createdAt: new Date() })
  db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice " + i }], $slice: -3 } }, $inc: { commentCount: 1 } })
}
db.posts.findOne({ _id: 1 })
for (let i = 0; i < 7; i++) db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 3 } }, { $push: { values: { t: new Date(), v: 20 + i } }, $inc: { count: 1 } }, { upsert: true })
db.readings.find({}, { values: 0 })`
        },
        {
          cmd: "compound index و ESR",
          title: "ترتيب الحقول في الـ index: Equality ثم Sort ثم Range",
          desc: R`index على أكتر من حقل بيخدم الاستعلام لو الحقول مترتبة صح: حقول المساواة الأول، وبعدين حقل الـ sort، وبعدين حقول المدى ([[$gt]] و [[$in]] الكبيرة). ودي اسمها قاعدة ESR.

لو الترتيب غلط، Mongo بيستخدم الـ index بس بيرتّب في الرام (stage اسمها [[SORT]])، فبيقرا آلاف المفاتيح عشان يرجّعلك ٢٠. [[explain]] بيوريك ده، و [[hint]] بيجبره على index معيّن عشان تقارن.`,
          example: R`use shop
db.sales.insertMany(Array.from({ length: 100000 }, (_, i) => ({ userId: i % 5000, status: ["paid", "pending", "cancelled"][i % 3], total: Math.floor(Math.random() * 5000), createdAt: new Date(Date.UTC(2026, 0, 1) + i * 60000) })))
db.sales.createIndex({ status: 1, total: 1, createdAt: -1 }, { name: "ERS" })
db.sales.createIndex({ status: 1, createdAt: -1, total: 1 }, { name: "ESR" })
const q = { status: "paid", total: { $gte: 1000 } }
function plan(c) { const e = c.explain("executionStats"); return { stages: JSON.stringify(e.queryPlanner.winningPlan).match(/"stage":"[A-Z_]+"/g).map(s => s.slice(9, -1)).reverse().join(" -> "), keys: e.executionStats.totalKeysExamined, docs: e.executionStats.totalDocsExamined } }
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ERS"))
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ESR"))
plan(db.sales.find(q, { _id: 0, total: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(20).hint("ESR"))
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))`,
          try: R`شغّل المثال واكتب الأرقام الأربعة بتاعة [[keys]]. وبعدين زوّد index على [[{ createdAt: -1 }]] لوحده وشغّل آخر سطر تاني: الـ stages اتغيرت إزاي؟ ولسه فيه SORT؟`,
          flag: "script",
          deep: {
            why: "درس [[createIndex و explain]] بيقولك اعمل index. ده الخطوة اللي بعدها: عندك index والصفحة لسه بطيئة، لأن ترتيب حقوله مش ماشي مع الاستعلام. وده من أشهر أسئلة انترفيو Mongo والـ databases عمومًا.",
            how: R`الـ index المركّب مترتب بالحقل الأول، وجوه كل قيمة بالتاني، وهكذا. فتخيله دليل تليفونات مترتب بالمحافظة ثم الاسم.

E (Equality): [[status: "paid"]] بينقلك لجزء واحد متصل من الـ index. لازم تبقى الأول.

S (Sort): جوه الجزء ده، لو الحقل التاني هو [[createdAt]]، المفاتيح أصلًا مترتبة بالتاريخ، فـ Mongo بيمشي عليها بالترتيب ويقف بعد ٢٠ تطابق [[total >= 1000]]. النتيجة الحقيقية اللي جربتها على ١٠٠ ألف مستند: [[IXSCAN -> FETCH -> LIMIT]] و keys: 26.

R (Range): لو حطيت [[total]] قبل [[createdAt]] (الـ index اللي اسمه ERS)، المدى بيجيب مفاتيح مترتبة بالـ total مش بالتاريخ، فـ Mongo لازم يقراهم كلهم ويرتّب في الرام: [[IXSCAN -> SORT -> FETCH]] و keys: 26635 عشان ٢٠ نتيجة. وكمان الـ SORT في الرام ليه حد (١٠٠ ميجا)، ولو عدّاه بيكتب على الديسك أو بيفشل.

السطر قبل الأخير covered query: لو كل الحقول اللي بترجعها جوه الـ index وشلت [[_id]]، Mongo مش بيفتح المستندات خالص: [[PROJECTION_COVERED]] و docs: 0.

آخر سطر قاعدة الـ prefix: الاستعلام من غير [[status]] مش بيقدر يستخدم ولا واحد من الاتنين، لأن الاتنين بيبدأوا بـ status: [[COLLSCAN -> SORT]] و docs: 100000.

[[hint]] للمقارنة والتجربة بس. في الكود سيب الـ planner يختار، وهو هنا اختار ESR لوحده. والدالة [[plan]] بتلم أسماء الـ stages من الـ winningPlan وتقلبها عشان تتقري بترتيب تدفق البيانات.`,
            when: "أي استعلام فيه فلتر وترتيب مع بعض، وده تقريبًا كل صفحة فيها قايمة. قبل ما تعمل index اكتب الاستعلام الحقيقي وطبّق عليه ESR.",
            mistakes: R`تعمل index لكل حقل لوحده ([[status]] و [[total]] و [[createdAt]]) وتفتكر إن Mongo هيجمعهم: غالبًا هيستخدم واحد بس. وتعتبر [[$in]] مساواة دايمًا: [[$in]] بقيم قليلة بيتعامل زي Equality، بس لو بعدها sort ممكن Mongo يعمل merge أو SORT، فجرّب بـ explain. وتقرا [[executionTimeMillis]] بس على بيانات صغيرة: بص على keys و docs مقابل nReturned، دول اللي بيكبروا مع البيانات.`
          },
          teach: R`## تجربة: نفس الحقول التلاتة، بترتيبين، والفرق ألف ضعف

المثال بيعمل ١٠٠ ألف أوردر، وindexين على **نفس** الحقول بس بترتيب مختلف، وبعدين يسأل نفس السؤال بكل واحد ويقارن. السؤال: «أحدث ٢٠ أوردر مدفوع قيمتهم ١٠٠٠ أو أكتر». اتشغّل في mongosh على [[mongo:8]]، والأرقام تحت هي اللي طلعتلي (الـ total عشوائي فأرقامك هتختلف شوية).

---

## ١. البيانات

~~~javascript
db.sales.insertMany(Array.from({ length: 100000 }, (_, i) => ({ userId: i % 5000, status: ["paid", "pending", "cancelled"][i % 3], total: Math.floor(Math.random() * 5000), createdAt: new Date(Date.UTC(2026, 0, 1) + i * 60000) })))
~~~

من جوه لبرّه:

| الحتة | بتعمل إيه |
|---|---|
| [[Array.from({ length: 100000 }, (_, i) => ...)]] | array فيها ١٠٠ ألف عنصر، كل عنصر بيتعمل بالدالة دي، و [[i]] رقمه (0، 1، 2...). الـ [[_]] مكان argument مش محتاجينه |
| [[userId: i % 5000]] | [[%]] باقي القسمة: 5000 يوزر بيتكرروا |
| [[["paid", "pending", "cancelled"][i % 3]]] | array واختار منها عنصر حسب الباقي على 3: كل حالة تلت الأوردرات |
| [[Math.floor(Math.random() * 5000)]] | رقم عشوائي صحيح من 0 لـ 4999 |
| [[new Date(Date.UTC(2026, 0, 1) + i * 60000)]] | من أول يناير 2026 (الشهور في JS بتبدأ من 0)، وكل أوردر بعد اللي قبله بدقيقة (60000 مللي ثانية) |

و [[insertMany]] بتبعتهم كلهم في رحلة واحدة تقريبًا، فخلصت في ثواني.

---

## ٢. و ٣. الـ index الغلط والصح

~~~javascript
db.sales.createIndex({ status: 1, total: 1, createdAt: -1 }, { name: "ERS" })
db.sales.createIndex({ status: 1, createdAt: -1, total: 1 }, { name: "ESR" })
~~~

[[{ name: "ERS" }]] بيدّي الـ index اسم احنا اخترناه بدل [[status_1_total_1_createdAt_-1]]. الاسمين اختصار ترتيب الحقول:

| الحرف | الكلمة | الحقل هنا | نوع الشرط |
|---|---|---|---|
| E | Equality (مساواة) | [[status: "paid"]] | قيمة واحدة |
| S | Sort (ترتيب) | [[createdAt: -1]] | الـ sort |
| R | Range (مدى) | [[total: { $gte: 1000 }]] | أكبر من / أصغر من |

---

## ٤. الاستعلام في متغير

~~~javascript
const q = { status: "paid", total: { $gte: 1000 } }
~~~

[[const]] بيعمل متغير في mongosh عشان مانكررش الشرط في كل سطر.

---

## ٥. الدالة [[plan]]

~~~javascript
function plan(c) { const e = c.explain("executionStats"); return { stages: ..., keys: e.executionStats.totalKeysExamined, docs: e.executionStats.totalDocsExamined } }
~~~

بتاخد cursor ([[c]])، وتعمل عليه [[explain("executionStats")]]، وترجّع ٣ حاجات بس من الناتج الطويل:

- [[stages]]: أسماء المراحل. [[JSON.stringify(...)]] بيحوّل الخطة لنص، و [[.match(/"stage":"[A-Z_]+"/g)]] بيلقط كل [["stage":"IXSCAN"]] بـ regular expression، و [[.slice(9, -1)]] بيقص [["stage":"]] (٩ حروف) من الأول والعلامة من الآخر، و [[.reverse()]] بيقلب الترتيب عشان يتقري زي مسار البيانات (من أول مرحلة لآخرها)، و [[.join(" -> ")]] بيوصّلهم بسهم.
- [[keys]]: كام مفتاح اتقرا من الـ index.
- [[docs]]: كام مستند اتفتح.

---

## ٦. بـ ERS (المدى قبل الترتيب)

~~~javascript
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ERS"))
~~~

[[.hint("ERS")]] بيجبر Mongo يستخدم الـ index ده، عشان نقارن.

~~~text الناتج
{ stages: 'IXSCAN -> SORT -> FETCH', keys: 26683, docs: 20 }
~~~

الـ index مترتب: status، وجوه paid مترتب بالـ total. المدى [[total >= 1000]] بيجيب كل الأوردرات المدفوعة اللي فوق ١٠٠٠ (حوالي ٢٦ ألف)، **مترتبين بالـ total مش بالتاريخ**. فـ Mongo لازم يقراهم كلهم، ويرتّبهم بالتاريخ في الرام (**SORT**)، وبعدين ياخد ٢٠. ٢٦ ألف مفتاح عشان ٢٠ نتيجة.

---

## ٧. بـ ESR

~~~javascript
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ESR"))
~~~

~~~text الناتج
{ stages: 'IXSCAN -> FETCH -> LIMIT', keys: 28, docs: 20 }
~~~

هنا جوه paid المفاتيح مترتبة **بالتاريخ** من الأحدث. Mongo بيمشي عليها بالترتيب، ويشيك على الـ total وهو ماشي (مفتاح فيه total أقل من ١٠٠٠ بيتفوّت)، ويقف أول ما يلاقي ٢٠. ٢٨ مفتاح بس، ومفيش SORT خالص.

ومن غير [[hint]] الـ planner اختار ESR لوحده: نفس [[IXSCAN -> FETCH -> LIMIT]] و keys 28.

---

## ٨. covered query

~~~javascript
plan(db.sales.find(q, { _id: 0, total: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(20).hint("ESR"))
~~~

~~~text الناتج
{ stages: 'IXSCAN -> PROJECTION_COVERED -> LIMIT', keys: 28, docs: 0 }
~~~

الـ projection طالب [[total]] و [[createdAt]] بس، والاتنين جوه الـ index، و [[_id: 0]] شالت الحقل الوحيد اللي مش فيه. فـ Mongo جاوب من الـ index لوحده: [[docs: 0]]، ومفيش FETCH. ده أسرع شكل ممكن.

---

## ٩. من غير أول حقل

~~~javascript
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))
~~~

~~~text الناتج
{ stages: 'COLLSCAN -> SORT', keys: 0, docs: 100000 }
~~~

الاتنين بيبدأوا بـ [[status]]، والاستعلام مفيهوش status، فولا واحد ينفع. زي دليل تليفونات مترتب بالمحافظة وانت بتدوّر بالاسم بس. القاعدة اسمها **prefix**: الـ index بيخدم الاستعلامات اللي بتستخدم أول حقل (أو أول حقلين...) منه.

وجرّبت الـ [[try]]: بعد [[createIndex({ createdAt: -1 })]] نفس السطر بقى [[{ stages: 'IXSCAN -> FETCH -> LIMIT', keys: 27, docs: 27 }]]. بيمشي بالتاريخ ويفلتر total وهو ماشي.

## الخلاصة

| الـ index | stages | keys | docs |
|---|---|---|---|
| ERS | [[IXSCAN -> SORT -> FETCH]] | 26683 | 20 |
| ESR | [[IXSCAN -> FETCH -> LIMIT]] | 28 | 20 |
| ESR + covered | [[IXSCAN -> PROJECTION_COVERED -> LIMIT]] | 28 | 0 |
| من غير status | [[COLLSCAN -> SORT]] | 0 | 100000 |

- رتّب حقول الـ index: مساواة، ثم ترتيب، ثم مدى.
- [[SORT]] في الخطة = الترتيب في الرام، وده علامة إن الـ index مش ماشي مع الـ sort.
- [[hint]] للتجربة بس، وبص على [[keys]] و [[docs]] مقابل عدد النتايج.`,
          lines: [
            "ادخل قاعدة shop.",
            "١٠٠ ألف أوردر بحالات وأرقام وتواريخ مختلفة.",
            "index بترتيب غلط: المدى قبل الـ sort.",
            "نفس الحقول بترتيب ESR: مساواة، ترتيب، مدى.",
            "الاستعلام: مساواة على status ومدى على total.",
            "دالة صغيرة بتطلّع الـ stages وعدد المفاتيح والمستندات اللي اتقرت.",
            "بالـ index الغلط: SORT في الرام وآلاف المفاتيح.",
            "بـ ESR: مفيش SORT، وقرا حوالي ٢٠ مفتاح بس.",
            "covered: كل الحقول في الـ index، فمفيش مستندات اتفتحت.",
            "من غير أول حقل: مفيش index ينفع، فـ COLLSCAN."
          ],
          sol: R`الأرقام اللي طلعتلي (الـ total عشوائي فأرقامك هتقرب منها): ERS تقريبًا 26600 مفتاح مع [[SORT]]، و ESR حوالي 26، و covered حوالي 26 ومعاه docs: 0، والأخير 0 مفاتيح و docs: 100000 مع [[COLLSCAN]].

بعد [[createIndex({ createdAt: -1 })]]: آخر سطر بيبقى [[IXSCAN -> FETCH -> LIMIT]] من غير SORT: بيمشي على التواريخ بالترتيب ويفلتر total وهو ماشي، ويقف بعد ٢٠. keys و docs حوالي ٢٥ بدل ١٠٠ ألف.

لو شايف ERS هو اللي اتختار من غير [[hint]]: ده مش هيحصل هنا لأن الـ planner بيجرّب الاتنين ويختار الأسرع. ولو [[keys]] بتاعة ESR طلعت بالآلاف، اتأكد إن الـ sort [[createdAt: -1]] نفس اتجاه الـ index أو عكسه بالظبط.`,
          solCode: R`// في نفس الـ mongosh بعد المثال، عشان الدالة plan والبيانات موجودين
db.sales.createIndex({ createdAt: -1 })
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))
db.sales.getIndexes().map(i => i.name)`
        },
        {
          cmd: "aggregate و $group",
          title: "تقرير الإيراد لكل شهر بـ aggregate",
          desc: R`[[aggregate]] بياخد pipeline: array من المراحل، كل مرحلة بتاخد ناتج اللي قبلها. [[$match]] بيفلتر (زي WHERE)، و [[$group]] بيجمّع ويحسب (زي GROUP BY مع SUM و COUNT)، و [[$sort]] بيرتّب، و [[$project]] بيشكّل الناتج.

التقرير هنا: إيراد الأوردرات المدفوعة لكل شهر، بتوقيت القاهرة مش UTC.`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid", createdAt: { $gte: ISODate("2026-01-01T00:00:00+02:00"), $lt: ISODate("2027-01-01T00:00:00+02:00") } } },
  { $group: {
      _id: { $dateTrunc: { date: "$createdAt", unit: "month", timezone: "Africa/Cairo" } },
      revenue: { $sum: "$total" },
      orders: { $sum: 1 },
      avgOrder: { $avg: "$total" }
  } },
  { $sort: { _id: 1 } },
  { $project: { _id: 0, month: { $dateToString: { date: "$_id", format: "%Y-%m", timezone: "Africa/Cairo" } }, revenue: 1, orders: 1, avgOrder: { $round: ["$avgOrder", 2] } } }
])
db.orders.createIndex({ status: 1, createdAt: 1 })`,
          try: R`ضيف ٥ أوردرات في يناير وفبراير ومارس، منهم واحد [[paid]] تاريخه [[2026-01-31T23:30:00Z]] وواحد [[cancelled]]. شغّل التقرير، وبعدين شغّله تاني بـ [[$dateToString]] من غير timezone في الـ [[$group]]. يناير وفبراير اتغيروا ليه؟`,
          flag: "script",
          deep: {
            why: "أول ما يبقى عندك بيانات حقيقية، حد هيسأل «بعنا بكام الشهر ده؟» أو «أكتر منتج بيتباع؟». من غير aggregate هتجيب كل الأوردرات للـ Node وتجمعهم بـ loop: بطيء، وبياكل رام، وبينقل ميجات على الشبكة عشان ١٢ رقم.",
            how: R`المراحل بتتنفذ بالترتيب، والترتيب فارق في السرعة: [[$match]] في الأول بيقدر يستخدم index ([[{ status: 1, createdAt: 1 }]] هنا، مساواة ثم مدى)، وبيقلل المستندات اللي داخلة على باقي المراحل. [[$match]] بعد [[$group]] بيفلتر على الناتج (زي HAVING).

[[$group]]: الـ [[_id]] هو مفتاح التجميع (أي expression)، وكل حقل تاني accumulator: [[$sum: "$total"]] مجموع الحقل، و [[$sum: 1]] عدد، و [[$avg]] و [[$min]] و [[$max]] و [[$push]] (array بالقيم). [[$field]] بعلامة الدولار معناها «قيمة الحقل ده».

التوقيت: [[createdAt]] متخزن UTC دايمًا. أوردر [[2026-01-31T23:30:00Z]] في القاهرة هو ١ فبراير الساعة ١:٣٠ الصبح. [[$dateTrunc]] مع [[timezone: "Africa/Cairo"]] بيقص لأول الشهر بتوقيت القاهرة، وحدود [[$match]] مكتوبة بـ [[+02:00]] لنفس السبب. جربتها: بالتوقيت ده يناير ١٥٠٠ وفبراير ٦٩٠٠، ومن غيره يناير ١٨٠٠ وفبراير ٦٦٠٠.

[[$project]]: [[0]] يشيل حقل، و [[1]] يسيبه، وأي expression بيعمل حقل جديد. [[$dateToString]] يحوّل التاريخ لنص [[2026-02]]، و [[$round]] يقرّب.

كل مرحلة ليها حد ١٠٠ ميجا رام. [[$group]] و [[$sort]] على بيانات كبيرة بيكتبوا على الديسك لوحدهم (allowDiskUse شغال افتراضيًا من MongoDB 6)، بس ده بطيء، فالأحسن [[$match]] يقلل البيانات الأول.`,
            when: "أي تقرير أو dashboard أو إحصائية: إيراد، أكتر منتجات، يوزرز جداد بالأسبوع. ولو التقرير تقيل وبيتطلب كتير، احفظ ناتجه في collection بـ [[$merge]] وحدّثه كل ساعة.",
            mistakes: R`تجمع بالشهر من غير timezone فأرقام أول وآخر يوم في الشهر تروح للشهر الغلط، والمحاسب يلاقي فرق مع السيستم التاني. وتكتب [[total]] بدل [[$total]] في [[$sum]] فيحسب صفر أو يطلع error. وتحط [[$match]] بعد [[$project]] أو [[$group]] فيفقد الـ index. وتخزّن الفلوس كـ double: [[0.1 + 0.2]] مش 0.3؛ خزّنها قروش كـ int أو [[Decimal128]].`
          },
          teach: R`## pipeline = خط إنتاج

[[aggregate]] بياخد **array من المراحل**. المستندات بتدخل أول مرحلة، وناتجها يدخل اللي بعدها، وهكذا، زي خط إنتاج في مصنع. المثال فيه ٤ مراحل: فلتر، ثم جمّع بالشهر، ثم رتّب، ثم شكّل الناتج. اتشغّل في mongosh على [[mongo:8]] بالـ ٥ أوردرات اللي في الـ solCode (٤ مدفوعين وواحد cancelled، منهم أوردر يوم ٣١ يناير الساعة 23:30 UTC).

~~~text مسار البيانات
5 أوردرات  →  $match  →  4  →  $group  →  3 شهور  →  $sort  →  $project  →  الناتج
~~~

---

## المرحلة ١: [[$match]] (زي WHERE)

~~~javascript
{ $match: { status: "paid", createdAt: { $gte: ISODate("2026-01-01T00:00:00+02:00"), $lt: ISODate("2027-01-01T00:00:00+02:00") } } }
~~~

نفس شكل شرط [[find]] بالظبط: المدفوع بس، وفي سنة 2026.

- [[ISODate("...")]]: بيعمل تاريخ من نص بصيغة ISO (سنة-شهر-يوم ثم T ثم الوقت).
- [[+02:00]] في الآخر: الوقت ده بتوقيت القاهرة (UTC + ساعتين). Mongo بيحوّله لـ UTC وهو بيخزنه. جرّبت:

~~~text ISODate("2026-01-01T00:00:00+02:00")
ISODate('2025-12-31T22:00:00.000Z')
~~~

يعني أول السنة في القاهرة = الساعة ١٠ بالليل ٣١ ديسمبر UTC.

- [[$gte]] من أول السنة (شامل)، و [[$lt]] لحد أول السنة الجاية (مش شامل). ده أنضف شكل لمدى زمني.

الـ cancelled خرج هنا، ودخل ٤ بس.

---

## المرحلة ٢: [[$group]] (زي GROUP BY)

~~~javascript
{ $group: {
    _id: { $dateTrunc: { date: "$createdAt", unit: "month", timezone: "Africa/Cairo" } },
    revenue: { $sum: "$total" },
    orders: { $sum: 1 },
    avgOrder: { $avg: "$total" }
} }
~~~

### [[_id]] = مفتاح التجميع

كل المستندات اللي ليها نفس [[_id]] بتبقى صف واحد. هنا المفتاح أول الشهر:

- [["$createdAt"]]: الـ [[$]] قبل اسم حقل جوه aggregate معناها «**قيمة** الحقل ده في المستند الحالي». من غيرها تبقى نص عادي.
- [[$dateTrunc]]: بيقص التاريخ لأول الوحدة. [[unit: "month"]] = أول الشهر.
- [[timezone: "Africa/Cairo"]]: القص يتعمل بتوقيت القاهرة مش UTC. ([["Africa/Cairo"]] اسم المنطقة من قاعدة بيانات التوقيتات العالمية، وبيعرف التوقيت الصيفي لوحده.)

شغّلت الـ group لوحده عشان نشوف المفتاح:

~~~text الناتج
[
  { _id: ISODate('2025-12-31T22:00:00.000Z'), revenue: 1500 },
  { _id: ISODate('2026-01-31T22:00:00.000Z'), revenue: 6900 },
  { _id: ISODate('2026-02-28T22:00:00.000Z'), revenue: 850 }
]
~~~

الـ [[_id]] شكله غريب، بس هو أول يناير وأول فبراير وأول مارس **في القاهرة**، مكتوبين UTC.

### باقي الحقول = accumulators

كل حقل غير [[_id]] بيحسب حاجة على مستندات الصف:

| الحقل | الـ accumulator | معناه |
|---|---|---|
| [[revenue]] | [[{ $sum: "$total" }]] | اجمع قيمة total |
| [[orders]] | [[{ $sum: 1 }]] | اجمع 1 لكل مستند = العدد |
| [[avgOrder]] | [[{ $avg: "$total" }]] | المتوسط |

وفيه كمان [[$min]] و [[$max]] و [[$push]] (array بالقيم). ولو نسيت الـ [[$]] وكتبت [[$sum: "total"]]، جرّبتها: [[[ { _id: null, r: 0 } ]]]. صفر، لأنه بيجمع النص "total" مش الحقل.

---

## المرحلة ٣: [[$sort]]

~~~javascript
{ $sort: { _id: 1 } }
~~~

رتّب الصفوف بالمفتاح (الشهر) تصاعدي. [[$group]] مش بيضمن أي ترتيب.

---

## المرحلة ٤: [[$project]] (شكل الناتج)

~~~javascript
{ $project: { _id: 0, month: { $dateToString: { date: "$_id", format: "%Y-%m", timezone: "Africa/Cairo" } }, revenue: 1, orders: 1, avgOrder: { $round: ["$avgOrder", 2] } } }
~~~

| الحتة | معناها |
|---|---|
| [[_id: 0]] | شيل الـ _id |
| [[month: { $dateToString: ... }]] | حقل جديد: التاريخ كنص |
| [[format: "%Y-%m"]] | [[%Y]] السنة بـ ٤ أرقام، و [[%m]] الشهر برقمين |
| [[timezone: "Africa/Cairo"]] | لازم هنا كمان، وإلا [[2025-12-31T22:00Z]] يتكتب [[2025-12]] |
| [[revenue: 1]] و [[orders: 1]] | سيبهم زي ما هم |
| [[$round: ["$avgOrder", 2]]] | قرّب لرقمين بعد العلامة |

---

## الناتج

~~~text الناتج
[
  { revenue: 1500, orders: 1, month: '2026-01', avgOrder: 1500 },
  { revenue: 6900, orders: 2, month: '2026-02', avgOrder: 3450 },
  { revenue: 850, orders: 1, month: '2026-03', avgOrder: 850 }
]
~~~

فبراير فيه أوردرين: الـ 6600، والـ 300 بتاع [[2026-01-31T23:30:00Z]]، لأنه في القاهرة الساعة 1:30 الصبح يوم ١ فبراير. و 6900 ÷ 2 = 3450.

### ومن غير timezone؟

نفس التقرير بـ [[$dateToString]] من غير timezone في الـ group:

~~~text الناتج
[
  { _id: '2026-01', revenue: 1800 },
  { _id: '2026-02', revenue: 6600 },
  { _id: '2026-03', revenue: 850 }
]
~~~

الـ 300 راحت يناير. الرقمين «صح» حسابيًا، بس واحد بس صح للبيزنس اللي شغال بتوقيت القاهرة.

---

## آخر سطر: index للـ [[$match]]

~~~javascript
db.orders.createIndex({ status: 1, createdAt: 1 })
~~~

بيرجّع [[status_1_createdAt_1]]. [[$match]] في أول الـ pipeline بيستخدم indexes زي [[find]] بالظبط، ومساواة ([[status]]) ثم مدى ([[createdAt]]). بعد [[$group]] مفيش indexes، فالفلتر لازم يبقى الأول.

## الخلاصة

| المرحلة | زي SQL | بتعمل إيه |
|---|---|---|
| [[$match]] | WHERE | فلتر، وحطه الأول |
| [[$group]] | GROUP BY | [[_id]] المفتاح، والباقي [[$sum]]/[[$avg]]... |
| [[$sort]] | ORDER BY | ترتيب |
| [[$project]] | SELECT | شكل الناتج |

و [["$field"]] = قيمة الحقل، والتواريخ متخزنة UTC فالـ timezone لازم في الجمع والعرض.`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على الأوردرات:",
            "فلتر: المدفوع بس، في سنة 2026 بتوقيت القاهرة.",
            "جمّع:",
            "المفتاح: أول الشهر بتوقيت القاهرة.",
            "مجموع الإيراد.",
            "عدد الأوردرات.",
            "متوسط الأوردر.",
            "قفلة الـ group.",
            "رتّب بالشهر تصاعدي.",
            "شكّل الناتج: الشهر نص، والمتوسط مقرّب لرقمين.",
            "قفلة الـ pipeline.",
            "index يخدم الـ $match: مساواة على status ثم مدى على التاريخ."
          ],
          sol: R`بالبيانات اللي في الحل: ٣ صفوف، [[2026-01]] إيراد 1500 وأوردر واحد، و [[2026-02]] إيراد 6900 وأوردرين ومتوسط 3450، و [[2026-03]] إيراد 850. الـ cancelled مش محسوب.

من غير timezone: يناير 1800 وفبراير 6600. أوردر الـ 300 اللي الساعة [[23:30Z]] يوم ٣١ يناير هو في القاهرة ١ فبراير، فبتوقيت القاهرة بيروح لفبراير. أنهي واحد «صح»؟ اللي البيزنس بيشتغل بيه، وهنا القاهرة.

لو كل الشهور طلعت بصفر: غالبًا كتبت [[$sum: "total"]] من غير [[$]]. ولو طلع صف [[_id: null]]: فيه أوردرات مفيهاش [[createdAt]].`,
          solCode: R`use shop
db.orders.deleteMany({})
db.orders.insertMany([
  { userId: 1, status: "paid", createdAt: ISODate("2026-01-15T10:00:00Z"), items: [{ productId: 10, price: 750, qty: 2 }], total: 1500 },
  { userId: 2, status: "paid", createdAt: ISODate("2026-01-31T23:30:00Z"), items: [{ productId: 11, price: 300, qty: 1 }], total: 300 },
  { userId: 1, status: "paid", createdAt: ISODate("2026-02-10T12:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }, { productId: 11, price: 300, qty: 2 }], total: 6600 },
  { userId: 2, status: "cancelled", createdAt: ISODate("2026-02-11T12:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }], total: 6000 },
  { userId: 2, status: "paid", createdAt: ISODate("2026-03-05T09:00:00Z"), items: [{ productId: 10, price: 800, qty: 1 }, { productId: 99, price: 50, qty: 1 }], total: 850 }
])
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: { $dateToString: { date: "$createdAt", format: "%Y-%m" } }, revenue: { $sum: "$total" } } },
  { $sort: { _id: 1 } }
])`
        },
        {
          cmd: "$lookup و $unwind",
          title: "join في aggregate: أكتر المنتجات مبيعًا بأساميها",
          desc: R`[[$unwind]] بيفك array: أوردر فيه ٣ بنود بيبقى ٣ مستندات، كل واحد فيه بند. و [[$lookup]] بيجيب مستندات من collection تانية (زي LEFT JOIN) ويحطها في array.

الترتيب المهم: جمّع وقص الأول ([[$group]] ثم [[$limit]])، وبعدين [[$lookup]] على الـ ٥ اللي فضلوا بس، مش على كل بند في كل أوردر.`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", qty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } },
  { $sort: { revenue: -1 } },
  { $limit: 5 },
  { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
  { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
  { $project: { _id: 0, productId: "$_id", name: { $ifNull: ["$product.name", "(deleted)"] }, stock: "$product.stock", qty: 1, revenue: 1 } }
])`,
          try: R`بنفس بيانات الدرس اللي فات، وضيف [[products]] للـ ids ‏10 و 11 و 12 بس (سيب 99 من غير منتج). شغّل المثال، وبعدين شيل [[preserveNullAndEmptyArrays]] وشوف مين اختفى. وفي الآخر اكتب pipeline لأكتر ٣ يوزرز صرفوا، بأساميهم من [[users]].`,
          flag: "script",
          deep: {
            why: "تقارير كتير محتاجة بيانات من collection تانية: اسم المنتج، اسم العميل. [[$lookup]] بيعمل ده جوه السيرفر في طلب واحد، بدل ما تجيب النتايج للـ Node وتعمل query لكل صف.",
            how: R`[[$unwind: "$items"]]: كل عنصر في الـ array بيبقى مستند لوحده فيه باقي حقول الأوردر، و [[items]] بقت object مش array. بعدها [[$group]] بـ [[$items.productId]] بيجمع البنود من كل الأوردرات. ٥ أوردرات فيهم ٧ بنود بيبقوا ٧ مستندات.

[[$multiply]] بيحسب سعر البند × الكمية. لاحظ إن السعر جاي من البند (السعر وقت البيع)، مش من [[products]] (السعر الحالي)، وده اللي خلى التصميم في أول درس ينسخ السعر.

[[$lookup]] بـ [[localField]] و [[foreignField]]: لكل مستند داخل، هات من [[products]] اللي [[_id]] بتاعهم يساوي الـ [[_id]] هنا، وحطهم في array اسمها [[product]]. هي array دايمًا حتى لو واحد، عشان كده [[$unwind]] بعدها يحوّلها object.

[[preserveNullAndEmptyArrays: true]]: منتج اتمسح (99) الـ array بتاعته فاضية، و [[$unwind]] العادي بيشيل المستند خالص، فالإيراد بتاعه يختفي من التقرير. معاها بيفضل، و [[$ifNull]] بيكتب «(deleted)».

السرعة: [[$lookup]] بيعمل بحث في الـ collection التانية لكل مستند داخل، فلازم [[foreignField]] يبقى عليه index ([[_id]] دايمًا عليه). وعشان كده [[$limit]] قبله: ٥ عمليات بحث بدل آلاف. وفيه شكل تاني بـ [[let]] و [[pipeline]] لو محتاج شرط أكتر من مساواة أو تختار حقول معينة.`,
            when: "تقارير ولوحات إدارة تجمع من أكتر من collection. لو نفس الـ lookup بيتعمل في كل request عادي للتطبيق، ده غالبًا علامة إن البيانات دي المفروض تبقى embedded أو منسوخة (أول درس).",
            mistakes: R`[[$lookup]] في أول الـ pipeline على كل الأوردرات قبل [[$match]] و [[$limit]]: بيعمل بحث لكل مستند في الـ collection. وتنسى [[$unwind]] بعد [[$lookup]] فتكتب [[$product.name]] وترجعلك array بدل نص. و [[$unwind]] من غير preserve بيشيل صفوف في صمت، فالتقرير يطلع أقل من الحقيقة ومحدش يلاحظ.`
          },
          teach: R`## التقرير: أكتر ٥ منتجات جابت فلوس، بأساميها

نفس فكرة الـ pipeline من الدرس اللي فات، بس المرة دي فيه مرحلتين جداد: [[$unwind]] (تفك array) و [[$lookup]] (تجيب من collection تانية). اتشغّل في mongosh على [[mongo:8]] بنفس الـ ٥ أوردرات، ومعاهم [[products]] فيها 10 و 11 و 12 بس (المنتج 99 «اتمسح»).

~~~text مسار البيانات
4 أوردرات مدفوعة → $unwind → 6 بنود → $group → 4 منتجات → $sort/$limit → $lookup → $unwind → $project
~~~

---

## ١. [[$match]]

~~~javascript
{ $match: { status: "paid" } }
~~~

المدفوع بس، والـ cancelled برّه. ٤ أوردرات.

---

## ٢. [[$unwind: "$items"]]

كل أوردر فيه array [[items]]. [[$unwind]] بيعمل **نسخة من الأوردر لكل بند**، وفي كل نسخة [[items]] بقت object واحد مش array. الـ ٤ أوردرات فيهم ٦ بنود، فطلعوا ٦ مستندات (عدّيتهم بـ [[$count]]). أول اتنين:

~~~text الناتج
[
  {
    _id: ObjectId('6ac4fd80423a29a694c3362d'),
    userId: 1,
    status: 'paid',
    createdAt: ISODate('2026-01-15T10:00:00.000Z'),
    items: { productId: 10, price: 750, qty: 2 },
    total: 1500
  },
  {
    _id: ObjectId('6ac4fd80423a29a694c3362e'),
    ...
    items: { productId: 11, price: 300, qty: 1 },
    ...
  }
]
~~~

لاحظ [[items: { ... }]] من غير [[[ ]]]. كده نقدر نجمّع بحقل جوه البند.

---

## ٣. [[$group]] بالمنتج

~~~javascript
{ $group: { _id: "$items.productId", qty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } }
~~~

- [["$items.productId"]]: النقطة بتدخل جوه object: «حقل productId اللي جوه items». ده المفتاح، فكل منتج صف.
- [[qty: { $sum: "$items.qty" }]]: إجمالي القطع.
- [[$multiply: ["$items.price", "$items.qty"]]]: اضرب سعر البند × كميته، و [[$sum]] بيجمع الناتج. السعر هنا **سعر البند وقت البيع**، مش السعر الحالي في products.

---

## ٤. و ٥. [[$sort]] و [[$limit]]

~~~javascript
{ $sort: { revenue: -1 } },
{ $limit: 5 },
~~~

الأعلى إيراد الأول، وأول ٥ بس. ده **قبل** الـ lookup عمدًا: الـ lookup بيعمل بحث لكل مستند داخل، فـ ٥ أحسن من آلاف.

---

## ٦. [[$lookup]] (زي LEFT JOIN)

~~~javascript
{ $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } }
~~~

| الحقل | معناه |
|---|---|
| [[from: "products"]] | دوّر في collection products |
| [[localField: "_id"]] | خد الحقل ده من المستند الداخل (الـ _id هنا = productId بعد الـ group) |
| [[foreignField: "_id"]] | وطابقه مع الحقل ده في products |
| [[as: "product"]] | وحط اللي لقيته في حقل جديد بالاسم ده |

وقفت الـ pipeline بعده عشان نشوف شكله:

~~~text الناتج
[
  {
    _id: 12,
    qty: 1,
    revenue: 6000,
    product: [ { _id: 12, name: 'Monitor', price: 6000, stock: 5 } ]
  }
]
~~~

[[product]] **array** حتى لو لقى واحد بس، لأن [[$lookup]] ممكن يلاقي كذا مستند. ولو ملقاش حاجة (المنتج 99) بتبقى [[[]]] فاضية.

---

## ٧. [[$unwind]] تاني، بس بحذر

~~~javascript
{ $unwind: { path: "$product", preserveNullAndEmptyArrays: true } }
~~~

هنا بنستخدمه عشان نحوّل الـ array اللي فيها عنصر واحد لـ object. الشكل الطويل ده بياخد:

- [[path]]: الـ array اللي هتتفك.
- [[preserveNullAndEmptyArrays: true]]: لو الـ array فاضية (المنتج اتمسح)، **سيب المستند** بدل ما تشيله.

جرّبت من غيرها ([[$unwind: "$product"]]):

~~~text الناتج
[
  { revenue: 6000, productId: 12, name: 'Monitor' },
  { revenue: 2300, productId: 10, name: 'Keyboard' },
  { revenue: 900, productId: 11, name: 'Mouse' }
]
~~~

المنتج 99 اختفى من غير أي error، والتقرير بقى ناقص 50 جنيه.

---

## ٨. [[$project]]

~~~javascript
{ $project: { _id: 0, productId: "$_id", name: { $ifNull: ["$product.name", "(deleted)"] }, stock: "$product.stock", qty: 1, revenue: 1 } }
~~~

- [[productId: "$_id"]]: غيّر اسم الحقل: قيمة الـ _id في حقل اسمه productId.
- [[$ifNull: [قيمة, بديل]]]: لو القيمة مش موجودة أو null، حط البديل. فالمنتج اللي اتمسح اسمه [["(deleted)"]].
- [[stock: "$product.stock"]]: المخزون الحالي من products.

---

## الناتج

~~~text الناتج
[
  { qty: 1, revenue: 6000, productId: 12, name: 'Monitor', stock: 5 },
  { qty: 3, revenue: 2300, productId: 10, name: 'Keyboard', stock: 40 },
  { qty: 3, revenue: 900, productId: 11, name: 'Mouse', stock: 0 },
  { qty: 1, revenue: 50, productId: 99, name: '(deleted)' }
]
~~~

Keyboard: ‏750×2 من يناير + 800×1 من مارس = 2300، كل بند بسعره وقت البيع. والـ Monitor اللي في الأوردر الـ cancelled مش محسوب. وصف 99 مفيهوش [[stock]] خالص، لأن [[$product.stock]] مش موجود فالحقل مبيتعملش.

ونفس الفكرة لأكتر يوزرز صرفوا (الـ solCode): group بـ [[$userId]]، ثم lookup على users:

~~~text الناتج
[
  { spent: 8100, orders: 2, name: 'Sara' },
  { spent: 1150, orders: 2, name: 'Omar' }
]
~~~

## الخلاصة

| المرحلة | بتعمل إيه |
|---|---|
| [[$unwind: "$arr"]] | مستند لكل عنصر في الـ array |
| [[$lookup]] | هات من collection تانية في array |
| [[$unwind]] بعد lookup | array لـ object، ومعاه [[preserveNullAndEmptyArrays]] لو مش عايز تخسر صفوف |
| [[$ifNull]] | قيمة بديلة للناقص |

والترتيب: [[$match]] ← جمّع ← [[$limit]] ← وبعدين [[$lookup]].`,
          lines: [
            "ادخل قاعدة shop.",
            "pipeline على الأوردرات:",
            "المدفوع بس.",
            "فك البنود: كل بند مستند لوحده.",
            "جمّع بالمنتج: الكمية، والإيراد = السعر وقت البيع × الكمية.",
            "الأعلى إيراد الأول.",
            "أول ٥ بس، قبل الـ join.",
            "هات المنتج من products بالـ _id (بيرجع array).",
            "array لـ object، ومتشيلش منتج اتمسح.",
            "الناتج: الاسم أو (deleted)، والمخزون الحالي، والكمية والإيراد.",
            "قفلة."
          ],
          sol: R`بالبيانات دي الناتج ٤ صفوف: Monitor إيراد 6000 وكمية 1، و Keyboard إيراد 2300 (750×2 + 800×1) وكمية 3، و Mouse إيراد 900 وكمية 3، و [[productId: 99]] باسم [[(deleted)]] وإيراد 50. الـ Monitor التاني في أوردر cancelled فمش محسوب.

من غير [[preserveNullAndEmptyArrays]]: صف 99 بيختفي، والإيراد اللي في التقرير يبقى 9200 بدل 9250.

أكتر ٣ يوزرز: [[$group]] بـ [[$userId]] و [[$sum: "$total"]]، ثم sort و limit، ثم [[$lookup]] على users. الناتج: Sara 8100 و Omar 1150. لو ظهرلك Omar بـ 7150: نسيت [[$match]] على paid فالأوردر الـ cancelled اتحسب.`,
          solCode: R`use shop
db.products.deleteMany({})
db.products.insertMany([{ _id: 10, name: "Keyboard", price: 800, stock: 40 }, { _id: 11, name: "Mouse", price: 300, stock: 0 }, { _id: 12, name: "Monitor", price: 6000, stock: 5 }])
db.users.deleteMany({})
db.users.insertMany([{ _id: 1, name: "Sara" }, { _id: 2, name: "Omar" }])
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$userId", spent: { $sum: "$total" }, orders: { $sum: 1 } } },
  { $sort: { spent: -1 } },
  { $limit: 3 },
  { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $project: { _id: 0, name: "$user.name", spent: 1, orders: 1 } }
])`
        },
        {
          cmd: "populate و N+1",
          title: "populate في Mongoose من غير ما تعمل query لكل صف",
          desc: R`N+1: query تجيب ٢٠ بوست، وبعدين query لكل بوست تجيب الكاتب، يعني ٢١ رحلة للقاعدة. [[populate]] في Mongoose بيجمع كل الـ ids ويجيبهم في query واحدة بـ [[$in]]، فتبقى ٢ مهما كان العدد. و [[$lookup]] بيخليها واحدة.

و [[lean()]] بيرجّع objects عادية بدل Mongoose documents: أخف وأسرع، ومناسب لأي حاجة هتتبعت JSON من غير تعديل.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
let queries = 0;
mongoose.set("debug", () => { queries++; });

const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));

const posts = await Post.find().limit(20).lean();
for (const p of posts) p.author = await User.findById(p.author, "name").lean();
console.log("N+1:", queries);

queries = 0;
const populated = await Post.find().limit(20).populate("author", "name").lean();
console.log("populate:", queries);

queries = 0;
const joined = await Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]);
console.log("$lookup:", queries);

await mongoose.disconnect();`,
          try: R`في فولدر تجربة: [[npm i mongoose]]، وضيف للملف seed بـ ٥ يوزرز و ٢٠ بوست قبل الاستعلامات، وشغّله بـ [[MONGODB_URI=... node n1.mjs]]. سجّل عدد الـ queries والوقت لكل طريقة. وبعدين جرّب [[for (const p of docs) await p.populate("author")]] على documents من غير lean: كام query؟`,
          flag: "script",
          deep: {
            why: "N+1 من أشهر أسباب البطء في أي ORM، ومن أشهر أسئلة الانترفيو. محليًا مش هتحس بيه لأن القاعدة على نفس الجهاز، بس على الإنتاج كل query رحلة شبكة بمللي ثانية أو أكتر، فصفحة فيها ١٠٠ صف بتاخد ١٠٠ رحلة.",
            how: R`[[mongoose.set("debug", fn)]] بيندَه لكل عملية Mongoose بتبعتها للقاعدة، فهنا بيعدّها. جربته على mongod 8 بـ Mongoose 9: الـ loop عمل 21، و populate عمل 2، و [[$lookup]] عمل 1، والناتج في التلاتة نفس الشكل.

[[ref: "User"]] في الـ schema هو اللي بيعرّف populate يروح فين. [[populate("author", "name")]]: بعد ما البوستات ترجع، Mongoose بيلم كل قيم [[author]] المختلفة ويعمل [[User.find({ _id: { $in: [...] } }, "name")]] مرة واحدة، ويحط كل يوزر مكان الـ id. التاني argument بيختار الحقول، فمترجعش الباسورد والإيميل مع كل بوست.

populate مش join: هي ٢ queries من التطبيق. [[$lookup]] بيعمل الـ join على السيرفر في query واحدة، بس بترجع objects عادية (زي lean) ومن غير الـ virtuals والـ getters بتوع Mongoose. populate كفاية في أغلب الصفحات، و [[$lookup]] للتقارير أو لما تحتاج تفلتر أو ترتب بحقل من الـ collection التانية (populate مبيعرفش يعمل كده).

[[lean()]]: من غيرها كل نتيجة document فيه change tracking ودوال زي [[save]]، ودي تكلفة في الرام والـ CPU. معاها objects عادية. جربتها: [[typeof doc.save]] بيبقى function من غير lean، و undefined معاها. استخدم lean في أي GET، وسيب الـ documents لما هتعدّل وتعمل save.

N+1 مستخبي: [[await doc.populate()]] جوه loop، أو virtual populate بيتنده لكل عنصر، أو resolver في GraphQL بيجيب الكاتب لكل بوست لوحده (الحل هناك DataLoader).`,
            when: "أي endpoint بيرجّع قايمة فيها بيانات من collection تانية. شغّل debug في التطوير وبص على عدد الـ queries لكل request.",
            mistakes: R`تحسب إن populate حل كل حاجة، وتعمل populate متداخل ٣ مستويات على قايمة ١٠٠٠ عنصر من غير limit. وتنسى تختار الحقول في populate فالـ passwordHash يرجع في الـ API. وتنسى [[lean()]] وبعدين تستغرب إن [[JSON.stringify]] بيطلع حاجات زيادة أو إن الرام بيعلى. وفي الانترفيو: اشرح N+1 بالأرقام (١ + N رحلة)، والحلين: batching بـ [[$in]] (populate و DataLoader) أو join ([[$lookup]]).`
          },
          teach: R`## نفس الصفحة بـ ٣ طرق، ونعدّ الـ queries

المثال ملف Node (اسمه مثلًا [[n1.mjs]]) بيجيب ٢٠ بوست ومع كل واحد اسم كاتبه، بـ ٣ طرق، ويعدّ كل طريقة بعتت كام query للقاعدة. شغّلته بـ Node 24 و Mongoose 9.11 على الـ lab ([[mongo:8]] في Docker على نفس الجهاز)، بالـ solCode اللي بيضيف ٥ يوزرز و ٢٠ بوست الأول:

~~~bash
MONGODB_URI="mongodb://admin:secret@localhost:27017/blog?authSource=admin" node n1.mjs
~~~

[[VAR=value node ...]] في bash بيحط المتغير للأمر ده بس. في PowerShell بيتكتب على سطرين: [[$env:MONGODB_URI = "..."]] وبعدين [[node n1.mjs]].

~~~text الناتج
N+1        queries: 21 ms: 57.4
populate   queries: 2 ms: 15.7
$lookup    queries: 1 ms: 6.9
loop+doc   queries: 21 ms: 66.8
~~~

والـ ٣ طرق رجّعوا **نفس** الشكل بالظبط:

~~~text أول بوست في التلاتة
{"_id":"6ac4fe02b11c7443e9588661","title":"post 0","author":{"_id":"6ac4fe02b11c7443e958865b","name":"user0"},"__v":0}
~~~

([[__v]] حقل Mongoose بيحطه لوحده: رقم نسخة المستند.)

---

## ١. التجهيز

~~~javascript
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
~~~

- [[import ... from]]: صيغة ES modules، وعشان كده الملف [[.mjs]] (أو [[.js]] مع [["type": "module"]] في package.json).
- [[process.env.MONGODB_URI]]: المتغير اللي حطيناه في الأمر.
- [[await]] في أول الملف مسموحة في ES modules (اسمها top-level await).

## ٢. عدّاد الـ queries

~~~javascript
let queries = 0;
mongoose.set("debug", () => { queries++; });
~~~

[[mongoose.set("debug", دالة)]]: Mongoose بينده الدالة دي مع **كل** عملية بيبعتها للقاعدة، وبيبعتلها اسم الـ collection والعملية. احنا بنزوّد العداد بس. سجّلت كمان الأسماء عشان نشوف إيه اللي اتبعت.

## ٣. الـ models

~~~javascript
const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));
~~~

- [[mongoose.model("User", schema)]]: model اسمه User، و Mongoose بيخزنه في collection اسمها [[users]] (صغير وجمع).
- [[author: { type: ...ObjectId, ref: "User" }]]: الحقل ده id، و [[ref: "User"]] بتقول «الـ id ده بتاع model اسمه User». ده اللي populate بيستخدمه.

---

## الطريقة ١: N+1

~~~javascript
const posts = await Post.find().limit(20).lean();
for (const p of posts) p.author = await User.findById(p.author, "name").lean();
console.log("N+1:", queries);
~~~

- query واحدة للبوستات.
- [[for (const p of posts)]]: لف على كل بوست، و [[await User.findById(...)]] query للكاتب. التاني argument [["name"]] = هات حقل name بس.

١ + ٢٠ = **21**. اسمها N+1 لأنها query واحدة + N (عدد الصفوف). الأسماء اللي سجّلتها: [[posts.find]] ثم [[users.findOne]] (ده اللي [[findById]] بيتحوّل له) ٢٠ مرة. ولو الصفحة ١٠٠ صف، 101 رحلة للقاعدة.

## الطريقة ٢: [[populate]]

~~~javascript
queries = 0;
const populated = await Post.find().limit(20).populate("author", "name").lean();
console.log("populate:", queries);
~~~

[[populate("author", "name")]]: بعد ما البوستات ترجع، Mongoose بيلم كل قيم [[author]] المختلفة (٥ هنا)، ويعمل query واحدة: [[users.find({ _id: { $in: [5 ids] } })]]، ويحط كل يوزر مكان الـ id بتاعه. **2** queries مهما كان عدد البوستات.

## الطريقة ٣: [[$lookup]]

~~~javascript
const joined = await Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]);
~~~

- [[Post.aggregate]]: pipeline على collection posts، بيروح للقاعدة زي ما هو.
- [[$lookup]] بنفس شكل الدرس اللي فات، وزيادة [[pipeline: [{ $project: { name: 1 } }]]]: مراحل بتتنفذ على المستندات اللي اتجابت من users، هنا «هات name بس».
- [[as: "author"]] بنفس اسم الحقل، فالـ id بيتبدل بالـ array، و [[$unwind]] بيحوّلها object.

**1** query، والـ join حصل على السيرفر. بس الناتج objects عادية، من غير مميزات Mongoose.

## الطريقة الرابعة (من الـ try): N+1 متخبّي

~~~javascript
const docs = await Post.find().limit(20);
for (const p of docs) await p.populate("author", "name");
~~~

بيتقري كأنه populate، بس جوه loop: **21** query تاني. الـ populate لازم يبقى على الـ query كلها مرة واحدة.

---

## [[lean()]]

قارنت مستند من غير lean ومعاها:

~~~text الناتج
doc: function model lean: undefined Object
~~~

من غير lean: [[typeof doc.save]] = [[function]]، يعني ده Mongoose document فيه دوال وتتبع للتعديلات. مع lean: object عادي ومفيش [[save]]. lean أخف وأسرع لأي حاجة هتتبعت JSON من غير تعديل.

## ليه الأرقام دي مهمة؟

الأوقات هنا صغيرة لأن القاعدة على نفس الجهاز. على الإنتاج كل query رحلة شبكة (مثلًا ١ مللي ثانية أو أكتر)، فـ 21 رحلة = ٢١ مللي على الأقل، و 101 رحلة = ١٠١. الفرق بيكبر مع عدد الصفوف والمسافة.

## الخلاصة

| الطريقة | queries | إمتى |
|---|---|---|
| loop + [[findById]] | 1 + N | أبدًا |
| [[populate]] على الـ query | 2 | أغلب الصفحات |
| [[$lookup]] | 1 | تقارير، أو فلترة/ترتيب بحقل من التانية |
| [[populate]] جوه loop | 1 + N | أبدًا (N+1 متخبّي) |

و [[mongoose.set("debug")]] في التطوير هو اللي بيكشف ده.`,
          lines: [
            "Mongoose.",
            "اتصل بالرابط اللي في المتغير.",
            "عداد للـ queries.",
            "debug بدالة: بتتنده مع كل عملية بتروح للقاعدة، فنعدّها.",
            "model اليوزر.",
            "model البوست، و author بيشاور على User بـ ref.",
            "N+1: query للبوستات...",
            "...وبعدين query لكل بوست عشان الكاتب.",
            "اطبع العدد: 21.",
            "صفّر العداد.",
            "populate: البوستات، وبعدين كل الكتّاب في query واحدة بـ $in.",
            "اطبع العدد: 2.",
            "صفّر العداد.",
            "$lookup: الـ join على السيرفر.",
            "أول ٢٠ بوست.",
            "هات الكاتب من users، بالاسم بس.",
            "array لـ object.",
            "قفلة الـ pipeline.",
            "اطبع العدد: 1.",
            "اقفل الاتصال عشان البرنامج يخرج."
          ],
          sol: R`اللي طلعلي على mongod محلي: N+1 عمل 21 query في حوالي 27ms، و populate عمل 2 في حوالي 11ms، و [[$lookup]] عمل 1 في حوالي 4ms. الأوقات هتختلف عندك، بس النسبة هي المهمة، وهتبقى أكبر بكتير لو القاعدة على سيرفر تاني.

[[await p.populate("author")]] جوه loop على documents: 20 query زيادة، يعني رجعت N+1 تاني. الـ populate لازم يتعمل على الـ query كلها مرة واحدة.

لو العداد طلع 0: الـ [[mongoose.set("debug")]] لازم قبل الاستعلامات. ولو ظهر [[author: null]]: الـ seed حط ids يوزرز مش موجودين، أو الـ ref اسمه غلط.`,
          solCode: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/blog");
let queries = 0;
mongoose.set("debug", () => { queries++; });

const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));

await User.deleteMany({});
await Post.deleteMany({});
const users = await User.insertMany(Array.from({ length: 5 }, (_, i) => ({ name: "user" + i, email: $__btu$__{i}@example.com$__bt })));
await Post.insertMany(Array.from({ length: 20 }, (_, i) => ({ title: "post " + i, author: users[i % 5]._id })));

async function measure(label, fn) {
  queries = 0;
  const t = performance.now();
  await fn();
  console.log(label.padEnd(10), "queries:", queries, "ms:", (performance.now() - t).toFixed(1));
}

await measure("N+1", async () => {
  const posts = await Post.find().limit(20).lean();
  for (const p of posts) p.author = await User.findById(p.author, "name").lean();
});
await measure("populate", () => Post.find().limit(20).populate("author", "name").lean());
await measure("$lookup", () => Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]));
await measure("loop+doc", async () => {
  const docs = await Post.find().limit(20);
  for (const p of docs) await p.populate("author", "name");
});

await mongoose.disconnect();`
        },
        {
          cmd: "transactions و replica set",
          title: "تعدّل أكتر من مستند يا كله يا ولا حاجة",
          desc: R`الكتابة على مستند واحد في Mongo atomic دايمًا. لو محتاج تعدّل أكتر من مستند مع بعض (تنقص المخزون وتعمل الأوردر)، بتحتاج transaction: يا الاتنين يتكتبوا، يا ولا واحد.

والـ transactions شغالة على replica set بس (أو sharded cluster)، حتى لو node واحدة. Mongo standalone زي الـ lab بيرفضها.`,
          example: R`use shop
db.products.updateOne({ _id: 12 }, { $set: { name: "Monitor", stock: 1 } }, { upsert: true })
const session = db.getMongo().startSession()
const s = session.getDatabase("shop")
function buy(productId, qty) {
  session.withTransaction(() => {
    const r = s.products.updateOne({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } })
    if (r.modifiedCount !== 1) throw new Error("out of stock")
    s.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId, qty, price: 6000 }], total: 6000 * qty })
  })
}
buy(12, 1)
buy(12, 1)
db.products.findOne({ _id: 12 }).stock
session.endSession()`,
          try: R`الـ lab standalone، فشغّل Mongo تاني كـ replica set: [[docker run -d --name mongo-rs -p 127.0.0.1:27018:27017 mongo:8 --replSet rs0]]، وبعدين [[docker exec mongo-rs mongosh --quiet --eval "rs.initiate()"]]، وادخل بـ [[mongosh "mongodb://localhost:27018/shop?directConnection=true"]]. شغّل المثال، وعدّ الأوردرات قبل وبعد. وبعدين جرّب نفس المثال على الـ lab نفسه وشوف الـ error.`,
          flag: "script",
          deep: {
            why: "أي عملية فيها فلوس أو مخزون بتلمس أكتر من مستند. من غير transaction، لو السيرفر وقع بين الخطوتين، المخزون نقص ومفيش أوردر، أو الأوردر اتعمل والمخزون زي ما هو. وده بالظبط سؤال «ليه Postgres أأمن للفلوس؟» في الانترفيو، والإجابة إن Mongo عندها transactions من نسخة 4، بس بشروط.",
            how: R`[[startSession()]] بيفتح session، و [[session.getDatabase]] بيدّيك قاعدة كل عملية عليها جزء من الـ session. [[withTransaction(fn)]] بيبدأ transaction، ينفّذ الدالة، ويعمل commit. لو الدالة رمت error بيعمل abort ويرجّع كل حاجة، ولو الخطأ مؤقت (زي تعارض مع transaction تانية، [[TransientTransactionError]]) بيعيد الدالة كلها لوحده.

الشرط [[stock: { $gte: qty }]] جوه الـ update نفسه هو اللي بيمنع البيع بالسالب: لو المخزون مش كفاية [[modifiedCount]] بيبقى 0 فبنرمي error والأوردر مبيتعملش. جربته: أول [[buy]] نجح، والتاني رمى out of stock، والمخزون 0، وأوردر واحد بس اتعمل.

ليه replica set: الـ transaction مبنية على الـ oplog (سجل العمليات اللي الـ replicas بتنسخ منه) وعلى أرقام transaction لكل session. الـ standalone مفيهوش oplog بالشكل ده، فبيرفض. جربت على mongod standalone: السيرفر رجّع [[Transaction numbers are only allowed on a replica set member or mongos]]، والـ Node driver غلّفها برسالة مضللة: «does not support retryable writes. Please add retryWrites=false». لو عملت كده فعلًا الكتابة العادية هتشتغل بس الـ transaction لسه هتفشل بنفس الرسالة.

replica set بـ node واحدة كفاية للتطوير: [[--replSet rs0]] و [[rs.initiate()]] مرة واحدة. [[rs.initiate()]] من غير config بيسجّل الـ host باسم الـ container، فمن بره لازم [[directConnection=true]] وإلا الـ driver يحاول يوصل لاسم مش معروف عندك. على الإنتاج: ٣ nodes، ولو فيه auth لازم [[keyFile]] بين الـ nodes. Atlas replica set من الأول.

في Mongoose: [[await mongoose.connection.transaction(async (session) => { ... })]] بنفس الفكرة، بس لازم تبعت [[{ session }]] لكل عملية جوه ([[Model.create([doc], { session })]] بـ array). عملية نسيت فيها session بتتكتب برّه الـ transaction ومبترجعش لو حصل abort.`,
            when: "لما عملية واحدة بتلمس أكتر من مستند ولازم يبقوا متسقين: مخزون وأوردر، تحويل رصيد بين حسابين. ولو تقدر تحط الحاجتين في مستند واحد (أول درس)، مش محتاج transaction خالص، وده أسرع.",
            mistakes: R`تكتب الكود وتجربه على Mongo standalone في Docker فيفشل، فتشيل الـ transaction «مؤقتًا» وتنساها. وتنسى [[{ session }]] في عملية واحدة جوه الـ Mongoose transaction. وتعمل حاجة مش بترجع جوه الدالة (إيميل أو request لـ API تاني): [[withTransaction]] ممكن يعيد الدالة كذا مرة، فاليوزر ياخد ٣ إيميلات؛ اعمل الحاجات دي بعد الـ commit. وتفتح transaction طويلة: الافتراضي إنها بتتلغي بعد ٦٠ ثانية، وبتمسك locks على المستندات اللي لمستها.`
          },
          lines: [
            "ادخل قاعدة shop.",
            "منتج عليه قطعة واحدة في المخزون.",
            "افتح session.",
            "قاعدة shop جوه الـ session: أي عملية عليها بتبقى جزء من الـ transaction.",
            "دالة الشرا:",
            "ابدأ transaction، وكل اللي جوه يا يتكتب كله يا لأ.",
            "انقص المخزون بس لو كفاية.",
            "مكفّاش؟ ارمي error فكل حاجة ترجع.",
            "اعمل الأوردر في نفس الـ transaction.",
            "قفلة withTransaction (هنا بيحصل commit).",
            "قفلة الدالة.",
            "أول شرا: ينجح.",
            "التاني: out of stock، ومفيش أوردر اتعمل.",
            "المخزون: 0 مش -1.",
            "اقفل الـ session."
          ],
          sol: R`على الـ replica set: أول [[buy]] بيعدّي، والتاني بيطلع [[Error: out of stock]]، والمخزون [[0]]، وعدد الأوردرات زاد ١ بس. لو شلت سطر [[throw]]، التاني هيعمل أوردر من غير ما المخزون ينقص، ودي بالظبط المشكلة اللي الـ transaction والشرط بيمنعوها.

على الـ lab (standalone): [[MongoServerError]] بـ «Transaction numbers are only allowed on a replica set member or mongos» (أو من mongosh ممكن تشوف رسالة retryable writes). الحل مش إنك تشيل الـ transaction، الحل replica set.

لو [[mongosh]] مقدرش يتصل على 27018 من غير [[directConnection=true]]: ده لأن الـ replica set متسجل باسم الـ container. ونفس الكود بـ Mongoose تحت.`,
          solCode: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27018/shop?directConnection=true");
const Product = mongoose.model("Product", new mongoose.Schema({ _id: Number, name: String, stock: Number }));
const Order = mongoose.model("Order", new mongoose.Schema({ userId: Number, items: Array, total: Number, status: String }, { timestamps: true }));

await Product.updateOne({ _id: 12 }, { name: "Monitor", stock: 1 }, { upsert: true });

function buy(productId, qty) {
  return mongoose.connection.transaction(async (session) => {
    const r = await Product.updateOne({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } }, { session });
    if (r.modifiedCount !== 1) throw new Error("out of stock");
    const [order] = await Order.create([{ userId: 1, items: [{ productId, qty }], total: 6000 * qty, status: "paid" }], { session });
    return order;
  });
}

console.log("ok", (await buy(12, 1))._id);
try { await buy(12, 1); } catch (e) { console.log("second:", e.message); }
console.log("stock:", (await Product.findById(12).lean()).stock);
await mongoose.disconnect();`
        },
        {
          cmd: "$jsonSchema",
          title: "القاعدة نفسها ترفض المستند الغلط",
          desc: R`Mongo من غير schema افتراضيًا، و Mongoose بيتحقق جوه تطبيقك بس. [[$jsonSchema]] في [[validator]] بيخلي القاعدة نفسها ترفض أي insert أو update مش مطابق، مهما كان مين اللي بيكتب: التطبيق، أو سكربت، أو حد في mongosh.

[[collMod]] بيضيفه أو يغيّره على collection موجودة.`,
          example: R`use shop
db.createCollection("customers", { validator: { $jsonSchema: { bsonType: "object", required: ["email", "createdAt"], properties: { email: { bsonType: "string", pattern: "^[^@\\s]+@[^@\\s]+$" }, age: { bsonType: "number", minimum: 0 }, createdAt: { bsonType: "date" } } } } })
db.customers.insertOne({ email: "sara@example.com", age: 28, createdAt: new Date() })
db.customers.insertOne({ email: "bad", createdAt: new Date() })
db.runCommand({ collMod: "orders", validator: { $jsonSchema: { required: ["userId", "status"], properties: { status: { enum: ["pending", "paid", "cancelled"] } } } }, validationLevel: "moderate" })
db.getCollectionInfos({ name: "customers" })[0].options.validator
db.orders.find({ $nor: [db.getCollectionInfos({ name: "orders" })[0].options.validator] })`,
          try: R`شغّل المثال، واقرا الـ error بتاع [[email: "bad"]] كامل. وبعدين جرّب [[age: -1]] و [[age: "28"]] و [[createdAt: "2026-09-29"]] (نص مش Date). كام واحد اترفض؟`,
          flag: "script",
          deep: {
            why: "الـ validation في التطبيق بس بيسيب ثغرات: سكربت migration، أو تطبيق تاني بيكتب في نفس القاعدة، أو [[updateOne]] في Mongoose من غير runValidators، أو حد صلّح بيانات بإيده. بيانات غلط بتدخل في صمت وتكسر التقارير بعد شهور.",
            how: R`[[validator]] بيتخزن مع الـ collection وبيتفحص مع كل كتابة. [[bsonType]] نوع BSON ([[string]] و [[date]] و [[objectId]] و [[number]] اللي بتقبل int و long و double و decimal)، و [[required]] الحقول اللازمة، و [[enum]] و [[pattern]] و [[minimum]]. الحقول اللي مش مذكورة مسموحة إلا لو كتبت [[additionalProperties: false]] (وساعتها لازم تذكر [[_id]]).

المستند المرفوض بيرجع error كود 121 (DocumentValidationFailure)، وفيه [[errInfo.details]] بيقولك أنهي قاعدة فشلت وليه، زي [[propertyName: 'email']] و [[reason: 'regular expression did not match']].

[[validationLevel: "moderate"]] على collection فيها بيانات قديمة: المستندات القديمة اللي مش مطابقة تقدر تتعدل من غير ما تتفحص، والجديدة والمطابقة بتتفحص. [[strict]] (الافتراضي) بيفحص كل حاجة. و [[validationAction: "warn"]] بيكتب في اللوج بس من غير ما يرفض: مفيد وانت بتجرب القواعد على الإنتاج.

آخر سطر: [[$nor]] مع الـ validator نفسه بيجيب المستندات القديمة اللي مش مطابقة، عشان تصلّحها قبل ما تحوّل لـ strict.

[[$jsonSchema]] مش بديل عن Mongoose ولا Zod: رسايل الخطأ للقاعدة مش لليوزر. التطبيق يتحقق ويرجّع 400 برسالة واضحة، والقاعدة خط دفاع أخير.`,
            when: "أي collection مهمة (يوزرز، أوردرات، فلوس)، خصوصًا لو أكتر من تطبيق أو سكربت بيكتب فيها. وقواعد بسيطة: required و الأنواع و enum، مش كل منطق البيزنس.",
            mistakes: R`تكتب [[bsonType: "int"]] للعمر: من mongosh أو Node الرقم الصحيح بيتبعت int فيعدّي، بس [[28.5]] أو [[Double(28)]] أو قيمة جاية من لغة تانية كـ double بتترفض (جربتها). [[number]] أأمن إلا لو محتاج int بالذات. وتضيف validator بـ strict على collection فيها بيانات قديمة غلط، فأول update لمستند قديم يفشل على الإنتاج. وتنسى إن [[bypassDocumentValidation]] موجود وإن mongorestore بيستخدمه أحيانًا.`
          },
          lines: [
            "ادخل قاعدة shop.",
            "اعمل collection بقواعد: email و createdAt لازم، والأنواع محددة، والعمر مش سالب.",
            "مستند مطابق: بيعدّي.",
            "إيميل غلط: بيترفض بـ Document failed validation.",
            "ضيف قواعد على orders الموجودة، والقديم الغلط يفضل يتعدل (moderate).",
            "اعرض القواعد المتخزنة.",
            "هات المستندات القديمة اللي مش مطابقة عشان تصلّحها."
          ],
          sol: R`التلاتة اترفضوا: [[age: -1]] (أقل من minimum)، و [[age: "28"]] (نص مش number)، و [[createdAt: "2026-09-29"]] (نص مش date). كل واحد بيرجع [[MongoServerError: Document failed validation]] وكود 121، وفي [[errInfo.details.schemaRulesNotSatisfied]] اسم الحقل والسبب.

لو واحد منهم عدّى: اتأكد إنك على [[customers]] اللي اتعملت بالـ validator، مش collection اتعملت قبله بنفس الاسم ([[createCollection]] بيفشل لو موجودة، والـ validator مبيتحطش). شوف [[getCollectionInfos]].`,
          solCode: R`use shop
for (const doc of [{ email: "a@b.c", age: -1, createdAt: new Date() }, { email: "a@b.c", age: "28", createdAt: new Date() }, { email: "a@b.c", createdAt: "2026-09-29" }]) {
  try { db.customers.insertOne(doc); print("ok", JSON.stringify(doc)) }
  catch (e) { print("rejected", e.code, JSON.stringify(e.errInfo.details.schemaRulesNotSatisfied[0])) }
}`
        }
      ]
    }
  ]
});
