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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("mongo", {
  label: "MongoDB",
  prompt: "$ ",
  lab: R`docker run -d --name mongo -p 127.0.0.1:27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:8
docker exec -it mongo mongosh -u admin -p secret`,
  labText: "أسهل قاعدة تجربة: container واحد على جهازك. الأوامر اللي بتبدأ بـ db. بتتكتب جوه mongosh، والباقي في الترمنال.",
  levels: {"1":["البداية","تتصل بـ mongosh وتقرا وتكتب"],"2":["المتوسط","يوزرز وباسوردات و indexes و Docker"],"3":["المتقدم","باك أب مجدول بيتجرّب، وترجيع، ونقل"]},
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`جرّب الرابط قبل ما تحطه في .env: [[mongosh "الرابط" --quiet --eval "db.getName()"]]، ولازم يطبع اسم القاعدة.`,
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
          ]
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
          ]
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
          try: R`بعد [[docker compose up -d]] شوف الحالة بـ [[docker inspect --format '{{.State.Health.Status}}' mongo]]: starting وبعدين healthy.`,
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      t: "باك أب وترجيع ونقل",
      l: 3,
      n: "mongodump في ملف واحد، وترجيع بيتجرّب، وسكربت يومي ميكدبش عليك",
      items: [
        {
          cmd: "mongodump",
          title: "باك أب لقاعدة Mongo في ملف واحد",
          desc: R`[[mongodump]] بيطلّع نسخة من القاعدة. مع [[--archive --gzip]] بيطلّعها ملف واحد مضغوط على stdout، فتعمله [[docker exec]] من غير [[-t]] وتحوّله لملف على السيرفر مباشرة.

الطريقة التانية ([[--out]]) فولدر جوه الـ container، وبعدها [[docker cp]] وتمسحه.`,
          example: R`docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --archive --gzip > myapp-$(date +%F).archive.gz
ls -lh myapp-*.archive.gz
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --out /tmp/dump
docker cp mongo:/tmp/dump ./dump
docker exec mongo rm -rf /tmp/dump`,
          try: R`في الـ lab ضيف بيانات في قاعدة myapp، وخد باك أب بأول سطر، واتأكد إن حجمه مش صفر.`,
          deep: {
            why: "قبل أي تعديل كبير، وكل يوم على الإنتاج. والصورة الرسمية فيها mongodump، فمش محتاج تسطّب أدوات Mongo على السيرفر.",
            how: R`[[--archive]] من غير اسم ملف بيكتب على stdout كل الـ collections في stream واحد، و [[--gzip]] بيضغطه. [[>]] على السيرفر بيحوّله ملف. خطوة واحدة، ومفيش ملفات مؤقتة جوه الـ container.

[[docker exec]] من غير [[-t]] هنا مهم: الـ TTY بيعدّل في البايتات (زي تحويل سطور)، فالملف الـ binary يبوظ. [[-t]] للشغل التفاعلي بس.

[[--db myapp]] قاعدة واحدة، ومن غيره كل القواعد. و [[--collection users]] collection واحدة.

[[--out]] بيعمل فولدر فيه لكل collection ملف [[.bson]] (البيانات) و [[.metadata.json]] (الـ indexes). مفيد لو عايز ترجّع collection واحدة، بس محتاج [[docker cp]] وتنضيف.

الـ indexes بتتحفظ كتعريف وبتتبني تاني وقت الترجيع. واليوزرز اللي في admin مش جوه dump قاعدة واحدة.`,
            when: "قبل أي migration أو مسح كبير، ويوميًا بسكربت (الدرس الجاي بعد الترجيع).",
            mistakes: R`في مشروع حقيقي الباك أب كان ٣ خطوات: dump لـ /tmp جوه الـ container، وبعدين docker cp، وبعدين rm؛ لو التانية فشلت الملفات بتفضل تكبر جوه الـ container. [[--archive]] على stdout أبسط. وفي نفس المشروع كان فيه كمان سكربت Node بيصدّر الـ collections لـ JSON: مفيد تقراه، بس JSON العادي بيضيّع أنواع زي ObjectId و Date، فمش بديل لـ mongodump.`
          },
          lines: [
            "القاعدة كلها في ملف واحد مضغوط بالتاريخ على السيرفر (من غير -t).",
            "اتأكد إن الملف موجود وحجمه منطقي.",
            "الطريقة التانية: فولدر جوه الـ container.",
            "انسخه للسيرفر.",
            "امسحه من جوه الـ container."
          ]
        },
        {
          cmd: "mongorestore",
          title: "رجّع الباك أب وجرّبه قبل ما تحتاجه",
          desc: R`[[mongorestore]] بيقرا نفس الـ archive من stdin ([[docker exec -i]]). جرّبه الأول على container مؤقت، وعدّ المستندات، وامسح الـ container. الترجيع على الإنتاج نفسه بـ [[--drop]] آخر حاجة.

باك أب عمره ما اترجع مش باك أب: ممكن يكون فاضي أو ناقص ومحدش يعرف.`,
          example: R`docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip --dryRun -v < myapp.archive.gz
docker run -d --name mongo-test -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=test mongo:8
until docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
docker exec -i mongo-test mongorestore -u admin -p test --authenticationDatabase admin --archive --gzip < myapp.archive.gz
docker exec mongo-test mongosh myapp -u admin -p test --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"
docker rm -f mongo-test
# على الإنتاج: بيمسح الـ collections الموجودة ويرجّع اللي في الملف
docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip --drop < myapp.archive.gz`,
          try: "خد باك أب من الـ lab، وامسح collection منها، ورجّعها في container مؤقت الأول، وبعدين في الـ lab بـ --drop، وعدّ المستندات.",
          flag: "danger",
          deep: {
            why: "يوم ما تحتاج الباك أب هتبقى متوتر والموقع واقع. لازم تكون جرّبت الأوامر قبل كده، وعارف إن الملف سليم وإن الترجيع بياخد قد إيه.",
            how: R`[[-i]] (من غير [[-t]]) بيوصّل stdin بتاع السيرفر للأمر اللي جوه الـ container، فالملف بيتقري من [[<]].

[[--dryRun -v]] بيقرا الملف ويقولك هيرجّع إيه من غير ما يكتب حاجة: فحص سريع إن الملف مش بايظ.

الـ container المؤقت: Mongo نضيف على volume مؤقت، [[until ... ping]] بيستنى لحد ما يصحى، والترجيع فيه، والعدّ. لو الأرقام قريبة من الإنتاج يبقى الباك أب سليم. [[rm -f]] بيشيل كل حاجة.

من غير [[--drop]]، mongorestore بيضيف بس: المستندات اللي [[_id]] بتاعها موجود بتفشل بـ duplicate key وبيكمّل. مع [[--drop]] بيمسح كل collection في الملف الأول وبعدين يرجّعها، فأي بيانات اتكتبت بعد الباك أب بتروح.

ولو عايز ترجّع جنب الأصلية مش فوقها: [[--nsFrom 'myapp.*' --nsTo 'myapp_restore.*']].`,
            when: "مرة في الشهر على الأقل كتجربة، وبعد أي تغيير في سكربت الباك أب. و --drop على الإنتاج في الطوارئ بس.",
            mistakes: R`[[docker exec -it]] مع [[<]]: بيطلع error إن الـ input مش TTY. وترجّع ملف [[--gzip]] من غير [[--gzip]] فيقول إن الـ archive بايظ. و [[--drop]] على الإنتاج قبل ما تجرّب الملف في container مؤقت.`
          },
          lines: [
            "فحص: الملف سليم وهيرجّع إيه، من غير كتابة.",
            "Mongo مؤقت نضيف للتجربة.",
            "استنى لحد ما يرد على ping.",
            "رجّع الباك أب فيه.",
            "عدّ المستندات وقارن بالإنتاج.",
            "امسح الـ container المؤقت.",
            "الترجيع الحقيقي: امسح الموجود ورجّع اللي في الملف."
          ]
        },
        {
          cmd: "باك أب Mongo مجدول",
          title: "سكربت يومي بيكتشف الفشل بجد",
          desc: R`سكربت لـ cron: dump مضغوط بالتاريخ، ولوج، ومسح الأقدم من ٣٠ يوم، ونسخة بره السيرفر. والأهم إنه لو mongodump فشل، السكربت يفشل ويقول، مش يكتب «تمام».

[[set -o pipefail]] هو الفرق: من غيره حالة أي pipe هي حالة آخر أمر فيه (زي [[tee]])، مش الأمر اللي فشل.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
set -a; . /opt/myapp/.env; set +a
DIR=/var/backups/myapp
LOG=/var/log/myapp-backup.log
KEEP_DAYS=30
FILE="$DIR/myapp-$(date +%F_%H%M).archive.gz"
log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }
trap 'log "ERROR: backup failed at line $LINENO"; rm -f "$FILE.part"' ERR

mkdir -p "$DIR"
log "start: $FILE"
docker exec mongo mongodump --quiet --db myapp --archive --gzip \
  -u "$MONGO_BACKUP_USER" -p "$MONGO_BACKUP_PASSWORD" --authenticationDatabase admin \
  2>&1 >"$FILE.part" | tee -a "$LOG"
mv "$FILE.part" "$FILE"
[ -s "$FILE" ] || { log "ERROR: empty file"; exit 1; }
log "ok: $(du -h "$FILE" | cut -f1)"
find "$DIR" -name 'myapp-*.archive.gz' -mtime +"$KEEP_DAYS" -delete
rclone copy "$FILE" remote:backups/myapp/
log "done: $(ls "$DIR"/myapp-*.archive.gz | wc -l) backups on disk"`,
          try: R`شغّله بإيدك مرة، وبعدين غيّر الباسورد في .env لباسورد غلط وشغّله تاني: لازم يطبع ERROR ويخرج بـ 1 ([[echo $?]]). وبعدين حطه في crontab: [[0 3 * * * /opt/myapp/backup-mongo.sh >> /var/log/myapp-backup-cron.log 2>&1]].`,
          flag: "script",
          deep: {
            why: "باك أب بيفشل في صمت أسوأ من مفيش باك أب: انت مطمّن، واللوج مكتوب فيه SUCCESS كل يوم، ويوم ما تحتاجه تلاقي ملفات فاضية.",
            how: R`[[set -euo pipefail]]: [[-e]] أي أمر يفشل يوقف السكربت، و [[-u]] متغير مش معرّف يبقى error، و [[pipefail]] الـ pipe يفشل لو أي أمر فيه فشل. والـ [[trap ... ERR]] بيكتب في اللوج قبل ما السكربت يقف، وبيمسح الملف الناقص.

[[set -a; . .env; set +a]]: بيقرا اليوزر والباسورد من ملف .env بصلاحية 600، مش مكتوبين في السكربت. واليوزر هو يوزر [[backup]] بتاع المستوى ٢، مش root.

سطر الـ dump: [[2>&1 >"$FILE.part"]] الترتيب هنا مقصود: الأول stderr يروح مكان stdout (الـ pipe لـ tee)، وبعدين stdout نفسه يروح للملف. فالبيانات في الملف، ورسايل mongodump في اللوج. ومع pipefail فشل mongodump بيفشّل السطر كله.

[[.part]] وبعدين [[mv]]: الملف بياخد اسمه النهائي بس لما يخلص صح، فمفيش ملف نص مكتوب بيتحسب باك أب. و [[-s]] يتأكد إنه مش فاضي.

المسح بـ [[find -mtime +30]] بعد النجاح بس (لأن -e وقف السكربت لو حاجة فشلت قبله)، فعمرك ما هتمسح القديم وانت معندكش جديد. و [[rclone copy]] نسخة بره السيرفر: لو السيرفر راح، الباك أب اللي عليه راح معاه.`,
            when: "أي Mongo فيه بيانات حقيقية. يوميًا في وقت هادي، وجرّب الترجيع (الدرس اللي فات) مرة في الشهر.",
            mistakes: R`في مشروع حقيقي السكربت كان بيعمل [[mongodump ... 2>&1 | tee -a "$LOG_FILE"]] وبعدها [[if [ $? -ne 0 ]; then]]: الـ [[$?]] دي حالة tee، و tee دايمًا بتنجح، فالباك أب لو فشل اللوج يقول SUCCESS. الحل [[set -o pipefail]] أو [[$__{PIPESTATUS[0]}]]. وكان الباسورد مكتوب في السكربت نفسه المرفوع على git، والنسخ كلها على نفس السيرفر، ومفيش تجربة ترجيع أبدًا. وحتى هنا الباسورد بيبان في [[ps]] وقت التشغيل؛ لو ده مهم عندك استخدم ملف [[--config]] بتاع mongodump.`
          },
          lines: [
            "أي فشل، حتى جوه pipe، يوقف السكربت.",
            "اقرا الأسرار من .env (مش مكتوبة هنا).",
            "فولدر الباك أب.",
            "ملف اللوج.",
            "نحتفظ بكام يوم.",
            "اسم الملف بالتاريخ والساعة.",
            "دالة بتكتب سطر بالوقت على الشاشة وفي اللوج.",
            "لو حاجة فشلت: سجّل رقم السطر وامسح الملف الناقص.",
            "اعمل الفولدر لو مش موجود.",
            "سجّل البداية.",
            "dump مضغوط من جوه الـ container...",
            "...بيوزر الباك أب من .env...",
            "...البيانات للملف والرسايل للوج، وفشله بيوقف السكربت.",
            "الملف خلص صح: اديله اسمه النهائي.",
            "اتأكد إنه مش فاضي.",
            "سجّل النجاح بالحجم.",
            "امسح الأقدم من ٣٠ يوم (بعد النجاح بس).",
            "نسخة بره السيرفر.",
            "سجّل العدد اللي على الديسك."
          ]
        },
        {
          cmd: "نقل Mongo لسيرفر تاني",
          title: "انقل القاعدة لسيرفر جديد أو من Atlas",
          desc: R`نفس الـ archive بيتنقل: dump من القديم، ونسخ، و restore في الجديد. ومن Atlas: [[mongodump --uri]] بالرابط بتاعهم على جهازك، وبعدين ترجّع على سيرفرك.

وقّف الكتابة الأول (الباك إند)، وإلا أي حاجة تتكتب بعد الـ dump هتضيع.`,
          example: R`ssh deploy@203.0.113.10 "docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --archive --gzip" > myapp.archive.gz
scp myapp.archive.gz deploy@203.0.113.20:/tmp/
ssh deploy@203.0.113.20 "docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip < /tmp/myapp.archive.gz"
ssh deploy@203.0.113.20 'docker exec mongo mongosh myapp -u admin -p secret --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"'
mongodump --uri "mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.example.mongodb.net/myapp" --archive --gzip > atlas.archive.gz`,
          try: "على جهازك: شغّل container تاني باسم mongo2 على بورت 27018، وانقل قاعدة myapp من الـ lab ليه بنفس الخطوات (من غير ssh)، وقارن العدد.",
          deep: {
            why: "بتنقل لسيرفر أكبر، أو من Atlas لسيرفرك عشان التكلفة، أو العكس. البيانات لازم توصل كاملة، والتطبيق يرجع يشتغل على الجديد.",
            how: R`السطر الأول: الـ dump بيتعمل على السيرفر القديم، والـ stdout بيرجع عبر ssh لجهازك كملف. من غير [[-t]] في docker exec ولا في ssh، عشان البايتات توصل زي ما هي.

[[scp]] للسيرفر الجديد، وبعدين [[docker exec -i]] مع [[<]] جوه الـ ssh (الـ [[<]] جوه العلامات فبيتنفّذ على السيرفر الجديد).

العدّ على الاتنين لازم يطابق لكل collection مهمة. mongorestore بيعيد بناء الـ indexes، فالعدّ بعد ما يخلص.

الترتيب الآمن للنقل: وقّف الباك إند (أو حطه read-only)، dump، restore، اعمل يوزر التطبيق على الجديد ([[createUser]]، لأن dump قاعدة واحدة مفيهوش يوزرز admin)، غيّر [[MONGODB_URI]]، شغّل الباك إند على الجديد، وسيب القديم أسبوع قبل ما تمسحه.

من Atlas: [[mongodump]] محتاج MongoDB Database Tools على جهازك، والرابط [[mongodb+srv]] نفسه اللي في .env. وخلي بالك إن IP جهازك لازم يبقى مسموح في Network Access بتاع Atlas.`,
            when: "تغيير سيرفر، أو خروج من Atlas أو دخول ليه، أو نسخة من الإنتاج لسيرفر staging.",
            mistakes: R`تنقل والتطبيق لسه بيكتب في القديم، فطلبات آخر ساعة تضيع. وتنسى يوزر التطبيق على السيرفر الجديد فيطلع Authentication failed بعد تغيير الرابط. وتمسح القديم في نفس اليوم.`
          },
          lines: [
            "dump على السيرفر القديم، والملف ييجي لجهازك عبر ssh.",
            "انسخه للسيرفر الجديد.",
            "رجّعه في Mongo اللي على الجديد.",
            "اتأكد من العدّ على الجديد.",
            "من Atlas: باك أب بالرابط بتاعهم على جهازك."
          ]
        }
      ]
    }
  ]
});
