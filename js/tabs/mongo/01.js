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
    }
  ]
});
