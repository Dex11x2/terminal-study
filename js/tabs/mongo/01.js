// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
            how: R`١٦ ميجا حد صارم على حجم المستند BSON (بالظبط 16777216 بايت). جرّبت أعمل [[$push]] على مستند ١٥ ميجا بحاجة ٢ ميجا، والسيرفر رفض بـ [[BSONObj size: 17825833 ... is invalid]]. والـ driver نفسه بيرفض يبعت insert أكبر من الحد قبل ما يوصل للسيرفر.

قبل الحد بكتير: المستند بيتقري ويتكتب كامل. [[$push]] على array فيها ١٠٠ ألف عنصر بيعيد كتابة المستند كله، والـ index على حقل جوه الـ array (multikey) فيه entry لكل عنصر.

subset pattern (السطر ٤): التعليقات كلها في [[comments]]، والبوست شايل [[commentCount]] وآخر ٣ بس. [[$each]] مع [[$slice: -3]] بيضيف ويقص في نفس الخطوة، فالـ array عمرها ما تعدّي ٣. صفحة البوست قراية واحدة، و «كل التعليقات» صفحة لوحدها بـ pagination على [[comments]].

قياس الحجم: [[bsonsize()]] في mongosh لمستند واحد، و [[$bsonSize: "$$ROOT"]] في aggregate عشان تلاقي أكبر المستندات في الـ collection كلها.

bucket pattern (آخر سطر): بدل مستند لكل قراية (ملايين مستندات صغيرة وindex ضخم)، أو مستند واحد للحساس (بيكبر للأبد)، مستند لكل حساس في اليوم وفيه لحد ٥٠٠ قراية. الشرط [[count: { $lt: 500 }]]: لو الـ bucket الحالي امتلى، الشرط مش هيطابق، و [[upsert]] يعمل bucket جديد. ولو شغلك قراءات بالوقت أصلًا، Mongo فيها time series collections ([[createCollection]] بـ [[timeseries]]) بتعمل ده لوحدها.

outlier pattern: لو ٩٩٪ من الكتب عندها كام مشتري وكتاب واحد عنده مليون، متغيرش التصميم كله عشانه: خلي الـ array تتقص عند حد، وحط [[hasExtras: true]] وكمّل الباقي في collection تانية للحالات الشاذة بس.`,
            when: "أي array ممكن تكبر مع الوقت أو مع الاستخدام: تعليقات، لايكات، notifications، لوج، تاريخ أسعار، أعضاء جروب كبير.",
            mistakes: R`تعمل unique index على [[{ sensorId: 1, day: 1 }]] في الـ buckets، فأول ما bucket يمتلي الـ upsert يفشل بـ duplicate key، لأن اليوم ممكن يبقى فيه أكتر من bucket. وتحط [[likes: [userIds]]] جوه البوست عشان «هل اليوزر ده عمل لايك؟»: الأحسن collection [[likes]] بـ unique index على [[{ postId: 1, userId: 1 }]]. وفي الانترفيو: الـ 16MB إجابة سؤال «إيه عيوب embed؟»، بس الإجابة الأقوى إن الأداء بيقع قبل الحد بكتير.`
          },
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
