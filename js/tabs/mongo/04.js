// تكملة تاب mongo: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/mongo/01.js (شرح حقول الدرس في أوله)
MORE("mongo", [
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
          teach: R`## نسخة من القاعدة في ملف، من غير ما تسطّب حاجة على السيرفر

[[mongodump]] أداة بتقرا القاعدة وتكتبها بصيغة BSON (الصيغة اللي Mongo بيخزن بيها). وهي جاية جوه صورة [[mongo]] الرسمية، فبتشغّلها بـ [[docker exec]]. شغّلت المثال من Git Bash على ويندوز مع Docker Desktop، على container من [[mongo:8]] (اسمه عندي [[mongo-lab-a]] بدل [[mongo]]) فيه قاعدة myapp بـ collection [[users]] فيها ٥٠٠ مستند و index على email، و collection [[notes]] فيها مستند واحد.

---

## ١. الطريقة الأولى: ملف واحد مضغوط

~~~bash
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --archive --gzip > myapp-$(date +%F).archive.gz
~~~

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[docker exec mongo]] | شغّل جوه الـ container اللي اسمه mongo. **من غير [[-t]]** (تحت ليه) |
| [[mongodump]] | أداة الباك أب |
| [[-u admin -p secret --authenticationDatabase admin]] | اليوزر والباسورد، واليوزر متخزن في قاعدة admin |
| [[--db myapp]] | قاعدة واحدة بس (من غيره: كل القواعد) |
| [[--archive]] | كل الـ collections في ملف واحد متتالي. ومن غير اسم ملف بيكتبه على **stdout** (الناتج العادي للأمر) |
| [[--gzip]] | اضغطه |
| [[>]] | على جهازك (برّه الـ container): حوّل الـ stdout لملف |
| [[$(date +%F)]] | [[$( )]] نفّذ الأمر وحط ناتجه هنا، و [[date +%F]] التاريخ بشكل [[2026-10-06]] (F = Full date) |

يعني البيانات بتطلع من الـ container على stdout، وبتعدّي من [[docker exec]]، والـ shell على جهازك بيكتبها في ملف. مفيش ولا ملف مؤقت جوه الـ container.

~~~text الناتج (على stderr)
2026-10-06T16:31:33.267+0000	writing $__btmyapp.users$__bt to $__btarchive on stdout$__bt
2026-10-06T16:31:33.268+0000	writing $__btmyapp.notes$__bt to $__btarchive on stdout$__bt
2026-10-06T16:31:33.271+0000	done dumping $__btmyapp.notes$__bt (1 document)
2026-10-06T16:31:33.271+0000	done dumping $__btmyapp.users$__bt (500 documents)
~~~

الرسايل دي بتروح على **stderr** (قناة الأخطاء والرسايل)، مش stdout، فبتظهر على الشاشة ومبتدخلش الملف. ولو دخلت الملف كان باظ.

### ليه من غير [[-t]]؟

[[-t]] بيعمل ترمنال وهمي (TTY)، والترمنال بيعدّل في البايتات (زي تحويل نهاية السطر). ده تمام للكلام، بس ملف مضغوط binary أي بايت يتغيّر فيه بيبوظ. فـ [[-t]] للشغل التفاعلي بس.

---

## ٢. اتأكد من الملف

~~~bash
ls -lh myapp-*.archive.gz
~~~

[[-l]] تفاصيل، و [[-h]] الحجم بوحدات مقروءة (human)، و [[*]] أي حاجة في المكان ده.

~~~text الناتج
-rw-r--r-- 1 ali 197609 4.3K Oct  6 19:31 myapp-2026-10-06.archive.gz
~~~

٥٠١ مستند صغيرين في [[4.3K]] بعد الضغط. المهم إنه **مش صفر**، وده سببه:

### تجربة: باسورد غلط

~~~bash
docker exec mongo mongodump -u admin -p wrong --authenticationDatabase admin --db myapp --archive --gzip > bad.archive.gz
echo "exit=$?"
~~~

~~~text الناتج
Failed: can't create session: failed to connect to mongodb://localhost/: connection() error occurred during connection handshake: auth error: unable to authenticate using mechanism "SCRAM-SHA-256": (AuthenticationFailed) Authentication failed.
exit=1
~~~

[[$?]] حالة خروج آخر أمر: [[0]] نجح، وغيره فشل. بس بص على الملف:

~~~text ls -l bad.archive.gz
-rw-r--r-- 1 ali 197609 0 Oct  6 19:31 bad.archive.gz
~~~

الملف اتعمل بحجم [[0]]، لأن الـ shell بيجهّز الـ [[>]] **قبل** ما الأمر يشتغل. فلو بتبص على «الملف موجود» بس، هتتخدع.

### تجربة: اسم قاعدة غلط

[[--db myap]] (ناقصة حرف): خرج بـ [[0]] من غير ولا رسالة، والملف [[116]] بايت بس. mongodump مش بيعتبر قاعدة مش موجودة غلطة، بيعمل dump فاضي. عشان كده بص على الحجم، ولو صغير بشكل غريب يبقى فيه حاجة.

---

## ٣. الطريقة التانية: فولدر

~~~bash
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --out /tmp/dump
docker cp mongo:/tmp/dump ./dump
docker exec mongo rm -rf /tmp/dump
~~~

- [[--out /tmp/dump]]: بدل archive، اكتب فولدر **جوه الـ container**.
- [[docker cp mongo:/tmp/dump ./dump]]: انسخ ([[cp]] = copy) من الـ container (الشكل [[اسم:مسار]]) لجهازك.
- [[rm -rf /tmp/dump]]: امسحه من جوه ([[-r]] بكل اللي جواه، و [[-f]] من غير أسئلة)، وإلا كل باك أب يفضل جوه الـ container ياكل مساحة.

~~~text محتوى الفولدر
dump/myapp/notes.bson               35
dump/myapp/notes.metadata.json     172
dump/myapp/prelude.json             51
dump/myapp/users.bson            43280
dump/myapp/users.metadata.json     263
~~~

لكل collection ملف [[.bson]] فيه المستندات نفسها (users ٤٣ كيلو من غير ضغط، قارنها بالـ 4.3K المضغوطة)، وملف [[.metadata.json]] فيه تعريف الـ indexes (زي [[email_1]]) عشان تتبني تاني وقت الترجيع. و [[prelude.json]] معلومات عن نسخة الأداة.

---

## مقارنة

| | [[--archive --gzip]] على stdout | [[--out]] فولدر |
|---|---|---|
| عدد الخطوات | ١ | ٣ (dump و cp و rm) |
| ملفات مؤقتة جوه الـ container | لأ | آه، لازم تمسحها |
| مضغوط | آه | لأ (إلا لو ضفت [[--gzip]]) |
| ترجّع collection واحدة بسهولة | محتاج [[--nsInclude]] | الملف بتاعها قدامك |

## الخلاصة

- [[docker exec]] من غير [[-t]] و [[--archive --gzip]] و [[>]] = باك أب في خطوة.
- الملف بيتعمل حتى لو الأمر فشل: بص على [[$?]] والحجم.
- اسم قاعدة غلط = dump فاضي من غير error.
- الـ indexes بتتحفظ كتعريف؛ ويوزرز admin مش جوه dump قاعدة واحدة.`,
          lines: [
            "القاعدة كلها في ملف واحد مضغوط بالتاريخ على السيرفر (من غير -t).",
            "اتأكد إن الملف موجود وحجمه منطقي.",
            "الطريقة التانية: فولدر جوه الـ container.",
            "انسخه للسيرفر.",
            "امسحه من جوه الـ container."
          ],
          sol: R`الأمر بيطبع على الـ stderr سطور زي [[writing $__btmyapp.users$__bt to $__btarchive on stdout$__bt]] و [[done dumping $__btmyapp.users$__bt (500 documents)]] لكل collection. و [[ls -lh]] بيعرض الملف بحجم مش صفر (عندي [[3.2K]] لـ ٥٠١ مستند مضغوطين).

أهم غلطة تتعلمها هنا: لو الباسورد غلط، mongodump بيطبع [[Failed: can't create session: ... (AuthenticationFailed) Authentication failed.]] ويخرج بـ 1، بس الـ shell عمل الملف قبل ما الأمر يشتغل بسبب الـ [[>]]، فهتلاقي [[myapp-2026-09-30.archive.gz]] بحجم [[0]]. عشان كده لازم تبص على الحجم، وفي السكربتات تشيك بـ [[-s]].

ولو الملف طلع صغير جدًا (كام بايت) رغم إن عندك داتا: غالبًا اسم القاعدة غلط ([[--db myap]])، و mongodump مش بيقول error، بيعمل dump فاضي.`
        },
        {
          cmd: "mongorestore",
          title: "رجّع الباك أب وجرّبه قبل ما تحتاجه",
          desc: R`[[mongorestore]] بيقرا نفس الـ archive من stdin ([[docker exec -i]]). جرّبه الأول على container مؤقت، وعدّ المستندات، وامسح الـ container. الترجيع على الإنتاج نفسه بـ [[--drop]] آخر حاجة.

باك أب عمره ما اترجع مش باك أب: ممكن يكون فاضي أو ناقص ومحدش يعرف.`,
          example: R`docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip --dryRun -v < myapp.archive.gz
docker run -d --name mongo-test -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=test mongo:8
until docker logs mongo-test 2>&1 | grep -q "init process complete" && docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
docker exec -i mongo-test mongorestore -u admin -p test --authenticationDatabase admin --archive --gzip < myapp.archive.gz
docker exec mongo-test mongosh myapp -u admin -p test --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"
docker rm -fv mongo-test
# على الإنتاج: بيمسح الـ collections الموجودة ويرجّع اللي في الملف
docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip --drop < myapp.archive.gz`,
          try: "خد باك أب من الـ lab، وامسح collection منها، ورجّعها في container مؤقت الأول، وبعدين في الـ lab بـ --drop، وعدّ المستندات.",
          flag: "danger",
          deep: {
            why: "يوم ما تحتاج الباك أب هتبقى متوتر والموقع واقع. لازم تكون جرّبت الأوامر قبل كده، وعارف إن الملف سليم وإن الترجيع بياخد قد إيه.",
            how: R`[[-i]] (من غير [[-t]]) بيوصّل stdin بتاع السيرفر للأمر اللي جوه الـ container، فالملف بيتقري من [[<]].

[[--dryRun -v]] بيقرا الملف ويقولك هيرجّع إيه من غير ما يكتب حاجة: فحص سريع إن الملف مش بايظ.

الـ container المؤقت: Mongo نضيف على volume مؤقت، [[until ... init process complete ... ping]] بيستنى لحد ما يصحى بجد (الـ ping لوحده بيرد من Mongo مؤقت بتاع أول تشغيل)، والترجيع فيه، والعدّ. لو الأرقام قريبة من الإنتاج يبقى الباك أب سليم. [[rm -fv]] بيشيل الـ container والـ volume المؤقت بتاعه (من غير [[-v]] الـ volume بيفضل على الديسك).

من غير [[--drop]]، mongorestore بيضيف بس: المستندات اللي [[_id]] بتاعها موجود بتفشل بـ duplicate key وبيكمّل. مع [[--drop]] بيمسح كل collection في الملف الأول وبعدين يرجّعها، فأي بيانات اتكتبت بعد الباك أب بتروح.

ولو عايز ترجّع جنب الأصلية مش فوقها: [[--nsFrom 'myapp.*' --nsTo 'myapp_restore.*']].`,
            when: "مرة في الشهر على الأقل كتجربة، وبعد أي تغيير في سكربت الباك أب. و --drop على الإنتاج في الطوارئ بس.",
            mistakes: R`[[docker exec -it]] مع [[<]]: بيطلع error إن الـ input مش TTY. وترجّع ملف [[--gzip]] من غير [[--gzip]] فيقول إن الـ archive بايظ. و [[--drop]] على الإنتاج قبل ما تجرّب الملف في container مؤقت.`
          },
          teach: R`## الترجيع بنفس الطريقة بالعكس، وبيتجرّب قبل يوم المصيبة

[[mongorestore]] أخو [[mongodump]]: بياخد الـ archive ويكتبه في القاعدة. هنا الملف داخل للـ container على **stdin** (المدخل) بدل ما يطلع منه. شغّلت كل السطور من Git Bash على ويندوز مع Docker Desktop، بالـ [[myapp.archive.gz]] اللي طلع في الدرس اللي فات (users بـ ٥٠٠ مستند و index على email، و notes بمستند واحد)، والـ containers عندي بأسامي تبدأ بـ [[mongo-lab-]].

---

## ١. فحص من غير كتابة: [[--dryRun]]

~~~bash
docker exec -i mongo mongorestore -u admin -p secret --authenticationDatabase admin --archive --gzip --dryRun -v < myapp.archive.gz
~~~

| الحتة | معناها |
|---|---|
| [[-i]] | interactive: وصّل الـ stdin بتاع جهازك بالأمر اللي جوه. **من غير [[-t]]** |
| [[--archive --gzip]] | الملف archive مضغوط، ومن غير اسم يبقى اقرا من stdin |
| [[--dryRun]] | اعمل كل حاجة إلا الكتابة |
| [[-v]] | verbose: قول بالتفصيل بتعمل إيه |
| [[< myapp.archive.gz]] | على جهازك: ابعت الملف ده على stdin |

~~~text الناتج
archive prelude $__btmyapp.notes$__bt
archive prelude $__btmyapp.users$__bt
preparing collections to restore from
found collection $__btmyapp.notes$__bt bson to restore to $__btmyapp.notes$__bt
found collection metadata from $__btmyapp.notes$__bt to restore to $__btmyapp.notes$__bt
found collection $__btmyapp.users$__bt bson to restore to $__btmyapp.users$__bt
found collection metadata from $__btmyapp.users$__bt to restore to $__btmyapp.users$__bt
dry run completed
0 document(s) restored successfully. 0 document(s) failed to restore.
~~~

(شلت الوقت من أول كل سطر.) قرا الملف كله ولقى الـ collections، و [[0 document(s) restored]] لأنه مكتبش حاجة. ده فحص سريع إن الملف مش بايظ.

وجرّبت أنسى [[--gzip]] مع ملف مضغوط:

~~~text الناتج
Failed: stream or file does not appear to be a mongodump archive
~~~

---

## ٢. Mongo مؤقت للتجربة

~~~bash
docker run -d --name mongo-test -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=test mongo:8
~~~

[[-d]] في الخلفية، و [[--name mongo-test]] اسم، والـ [[-e]] يعملوا يوزر root بباسورد [[test]]. مفيش [[-p]] لبورت ولا volume باسم: محدش محتاج يوصله من برّه، وكله هيتمسح.

---

## ٣. الاستنى: ليه السطر ده طويل؟

~~~bash
until docker logs mongo-test 2>&1 | grep -q "init process complete" && docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
~~~

[[until X; do sleep 2; done]]: كرر «استنى ثانيتين» لحد ما X ينجح. و X هنا شرطين بينهم [[&&]] (التاني بيتشغّل بس لو الأول نجح):

1. [[docker logs mongo-test 2>&1 | grep -q "init process complete"]]: في لوج الـ container سطر «خلصت الإعداد الأول»؟ [[2>&1]] يضم الـ stderr مع الـ stdout، و [[grep -q]] (quiet) بيدوّر من غير ما يطبع، وينجح لو لقى.
2. [[docker exec ... ping]]: Mongo بيرد؟ و [[>/dev/null 2>&1]] بيرمي كل الناتج.

### ليه مش ping لوحده؟

أول تشغيل، صورة mongo بتشغّل **Mongo مؤقت** على [[127.0.0.1]] جوه الـ container، تعمل بيه اليوزر، وتقفله، وتشغّل الحقيقي. والـ ping من جوه الـ container بيرد من المؤقت. جرّبت ping لوحده الأول، والترجيع اللي بعده فشل:

~~~text الناتج
error connecting to host: failed to connect to mongodb://localhost/: ... (AuthenticationFailed) Authentication failed.
~~~

ورصدت ده ثانية بثانية بعد التشغيل:

~~~text الناتج
1 local=1 ...                                     initdone=0
2 local=MongoNetworkError: connect ECONNREFUSED   initdone=1
3 local=1                                         initdone=1
~~~

في الثانية الأولى ping رد ([[1]]) والإعداد لسه مخلصش، وبعدها السيرفر قفل لحظة. سطر [[MongoDB init process complete; ready for start up.]] في اللوج هو العلامة إن المؤقت خلص.

---

## ٤. الترجيع والعدّ

~~~bash
docker exec -i mongo-test mongorestore -u admin -p test --authenticationDatabase admin --archive --gzip < myapp.archive.gz
~~~

~~~text الناتج (مختصر)
restoring $__btmyapp.notes$__bt from $__btarchive on stdin$__bt
finished restoring $__btmyapp.notes$__bt (1 document, 0 failures)
restoring $__btmyapp.users$__bt from $__btarchive on stdin$__bt
finished restoring $__btmyapp.users$__bt (500 documents, 0 failures)
no indexes to restore for collection $__btmyapp.notes$__bt
restoring indexes for collection $__btmyapp.users$__bt from metadata
501 document(s) restored successfully. 0 document(s) failed to restore.
~~~

٥٠٠ + ١ = ٥٠١. والـ indexes بتتبني بعد البيانات من الـ metadata.

~~~bash
docker exec mongo-test mongosh myapp -u admin -p test --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"
~~~

~~~text الناتج
500
~~~

[[mongosh myapp]] ادخل على قاعدة myapp، و [[countDocuments()]] عدّ. نفس رقم الأصل. و [[getIndexes()]] طلّع [[[ '_id_', 'email_1' ]]] زي الأصل.

~~~bash
docker rm -fv mongo-test
~~~

[[rm]] شيل الـ container، [[-f]] حتى لو شغال، [[-v]] وشيل الـ volumes اللي من غير اسم بتاعته. صورة mongo بتعمل اتنين ([[/data/db]] و [[/data/configdb]])، ومن غير [[-v]] بيفضلوا على الديسك.

---

## ٥. على الإنتاج: [[--drop]]

جرّبت على الـ lab: مسحت [[users]] وسيبت [[notes]]، ورجّعت **من غير** [[--drop]]:

~~~text الناتج
continuing through error: E11000 duplicate key error collection: myapp.notes index: _id_ dup key: { _id: ObjectId('6ac5226444349c95c48e2225') }
finished restoring $__btmyapp.notes$__bt (0 documents, 1 failure)
finished restoring $__btmyapp.users$__bt (500 documents, 0 failures)
500 document(s) restored successfully. 1 document(s) failed to restore.
~~~

mongorestore **بيضيف** بس: users رجعت، والمستند اللي في notes كان موجود بنفس [[_id]] فرفضه بـ [[E11000 duplicate key]] (مفتاح مكرر) وكمّل. يعني مش بيستبدل القديم.

ومع [[--drop]]:

~~~text الناتج
dropping collection $__btmyapp.notes$__bt before restoring
finished restoring $__btmyapp.notes$__bt (1 document, 0 failures)
dropping collection $__btmyapp.users$__bt before restoring
finished restoring $__btmyapp.users$__bt (500 documents, 0 failures)
501 document(s) restored successfully. 0 document(s) failed to restore.
~~~

بيمسح كل collection **موجودة في الملف** الأول، وبعدين يرجّعها. فأي حاجة اتكتبت فيها بعد الباك أب بتروح، وأي collection مش في الملف بتفضل زي ما هي.

### غلطة [[-it]]

~~~text الناتج من Git Bash
cannot attach stdin to a TTY-enabled container because stdin is not a terminal
~~~

[[-t]] عايز ترمنال، والـ stdin هنا ملف. على لينكس الرسالة [[the input device is not a TTY]]. الحل [[-i]] لوحده.

## الخلاصة

| السطر | ليه |
|---|---|
| [[--dryRun -v]] | الملف سليم؟ من غير كتابة |
| [[docker run ... mongo-test]] | مكان آمن للتجربة |
| [[until ... init process complete && ... ping]] | استنى Mongo الحقيقي مش المؤقت |
| [[mongorestore ... < file]] | الترجيع، بـ [[-i]] بس |
| [[countDocuments()]] | قارن بالأصل |
| [[rm -fv]] | امسح الـ container وأقراصه |
| [[--drop]] | يستبدل بدل ما يضيف: آخر حاجة، وبعد التجربة |`,
          lines: [
            "فحص: الملف سليم وهيرجّع إيه، من غير كتابة.",
            "Mongo مؤقت نضيف للتجربة.",
            "استنى لحد ما الإعداد الأول يخلص و Mongo الحقيقي يرد على ping.",
            "رجّع الباك أب فيه.",
            "عدّ المستندات وقارن بالإنتاج.",
            "امسح الـ container المؤقت والـ volume بتاعه.",
            "الترجيع الحقيقي: امسح الموجود ورجّع اللي في الملف."
          ],
          sol: R`الـ [[--dryRun -v]] بيطبع [[found collection $__btmyapp.users$__bt bson to restore]] لكل collection وفي الآخر [[dry run completed]] و [[0 document(s) restored successfully]]، يعني الملف سليم ومفيش حاجة اتكتبت.

الـ container المؤقت: [[501 document(s) restored successfully. 0 document(s) failed to restore.]] و [[countDocuments()]] على users رجّع [[500]] زي الأصل.

في الـ lab بعد ما مسحت users: restore من غير [[--drop]] رجّعها، بس لو فيه collection تانية لسه موجودة زي notes هتلاقي [[E11000 duplicate key error ... index: _id_]] و [[1 document(s) failed to restore]]، لأن mongorestore بيضيف ومش بيستبدل. مع [[--drop]]: [[501 document(s) restored successfully. 0 document(s) failed to restore.]] والعدد رجع [[500]]. وخلي بالك إن [[--drop]] بيمسح بس الـ collections اللي في الملف، أي collection جديدة مش في الباك أب بتفضل زي ما هي.`
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
          teach: R`## سكربت bash بيعمل باك أب، والأهم إنه ميقولش «تمام» وهو فاشل

السكربت ده هيشتغل كل يوم الساعة ٣ الفجر ومحدش بيبص. فكل سطر فيه يا بيعمل الباك أب، يا بيتأكد إن الفشل يبان. شغّلته من Git Bash على ويندوز مع Docker Desktop، بعد ما غيّرت ٤ حاجات بس: مسار [[.env]] و [[DIR]] و [[LOG]] لفولدر تجربة، واسم الـ container لـ [[mongo-lab-a]]، و [[rclone]] حطيت مكانه سكربت وهمي بيطبع الأمر بس. وعملت يوزر [[backup]] بصلاحية [[backup]] على admin. عدد السطور زي ما هو، فأرقام السطور في الناتج هي نفسها.

---

## ١. أول سطرين

~~~bash
#!/usr/bin/env bash
set -euo pipefail
~~~

- [[#!]] (اسمها shebang): لما تشغّل الملف بـ [[./backup-mongo.sh]]، النظام يقرا السطر ده عشان يعرف يشغّله بإيه. [[/usr/bin/env bash]] يعني «دوّر على bash في الـ PATH».
- [[set -e]]: أي أمر يفشل، السكربت يقف.
- [[set -u]]: متغير مش معرّف يبقى error (بدل ما يبقى فاضي في صمت، و [[rm -rf "$DIR/"]] بـ DIR فاضي كارثة).
- [[set -o pipefail]]: الـ pipe ([[|]]) يفشل لو **أي** أمر فيه فشل.

### ليه pipefail بالذات؟

من غيره حالة الـ pipe = حالة آخر أمر فيه بس:

~~~bash
bash -c 'false | tee /dev/null; echo "status=$?"'
bash -c 'false | tee /dev/null; echo "$__{PIPESTATUS[@]}"'
~~~

~~~text الناتج
status=0
1 0
~~~

[[false]] أمر بيفشل دايمًا، بس الحالة [[0]] لأن [[tee]] نجح. و [[PIPESTATUS]] array فيها حالة كل أمر في الـ pipe ([[1]] لـ false و [[0]] لـ tee).

---

## ٢. الإعدادات

~~~bash
set -a; . /opt/myapp/.env; set +a
DIR=/var/backups/myapp
LOG=/var/log/myapp-backup.log
KEEP_DAYS=30
FILE="$DIR/myapp-$(date +%F_%H%M).archive.gz"
~~~

- [[.]] (زي [[source]]): اقرا الملف ونفّذه جوه السكربت ده، فالمتغيرات اللي فيه تبقى عندك.
- [[set -a]] ... [[set +a]]: أي متغير يتعرّف في النص ده يتعمله export تلقائي (a = all)، وبعدين نقفلها.
- الـ [[.env]] فيه [[MONGO_BACKUP_USER]] و [[MONGO_BACKUP_PASSWORD]] بصلاحية 600 (صاحبه بس يقراه)، فالباسورد مش في السكربت.
- [[date +%F_%H%M]]: التاريخ وبعده الساعة والدقيقة، زي [[2026-10-06_1934]].

---

## ٣. اللوج والـ trap

~~~bash
log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }
trap 'log "ERROR: backup failed at line $LINENO"; rm -f "$FILE.part"' ERR
~~~

- [[log() { ... }]]: دالة. [[$*]] كل الكلام اللي اتبعت لها، و [[%T]] الوقت، و [[tee -a]] يطبع على الشاشة **ويضيف** (a = append) للوج.
- [[trap '...' ERR]]: «لما أي أمر يفشل، نفّذ ده قبل ما تقف». بيكتب في اللوج رقم السطر ([[$LINENO]]) ويمسح الملف الناقص.

---

## ٤. الـ dump نفسه

~~~bash
mkdir -p "$DIR"
log "start: $FILE"
docker exec mongo mongodump --quiet --db myapp --archive --gzip \
  -u "$MONGO_BACKUP_USER" -p "$MONGO_BACKUP_PASSWORD" --authenticationDatabase admin \
  2>&1 >"$FILE.part" | tee -a "$LOG"
~~~

[[mkdir -p]] اعمل الفولدر لو مش موجود ومتشتكيش لو موجود. و [[\]] في آخر السطر معناها «الأمر مكمّل في السطر اللي جاي». و [[--quiet]] من غير رسايل التقدم.

### [[2>&1 >"$FILE.part"]]: الترتيب مقصود

الـ redirects بتتنفذ من الشمال لليمين:

1. [[2>&1]]: خلي stderr (رقم 2) يروح **مكان stdout دلوقتي**، وstdout دلوقتي هو الـ pipe لـ [[tee]].
2. [[>"$FILE.part"]]: بعدين حوّل stdout نفسه للملف.

النتيجة: البيانات (stdout) في الملف، ورسايل الأخطاء (stderr) في الـ pipe للوج. لو عكست الترتيب الاتنين هيروحوا الملف.

---

## ٥. اتأكد، وبعدين سمّي

~~~bash
mv "$FILE.part" "$FILE"
[ -s "$FILE" ] || { log "ERROR: empty file"; exit 1; }
log "ok: $(du -h "$FILE" | cut -f1)"
~~~

- الملف بيتكتب باسم [[.part]] و [[mv]] بيديله اسمه النهائي **بس لو** اللي قبله نجح. فمفيش ملف نص مكتوب باسم باك أب.
- [[[ -s "$FILE" ]]]: الملف موجود وحجمه أكبر من صفر؟ و [[||]] «لو لأ، نفّذ اللي بعدي».
- [[du -h]] الحجم على الديسك، و [[cut -f1]] أول عمود منه (الحجم من غير اسم الملف).

---

## ٦. التنضيف والنسخة البعيدة

~~~bash
find "$DIR" -name 'myapp-*.archive.gz' -mtime +"$KEEP_DAYS" -delete
rclone copy "$FILE" remote:backups/myapp/
log "done: $(ls "$DIR"/myapp-*.archive.gz | wc -l) backups on disk"
~~~

- [[find ... -mtime +30 -delete]]: الملفات اللي آخر تعديل ليها ([[mtime]]) من أكتر من ٣٠ يوم، امسحها. ومش هيوصل للسطر ده غير لو الباك أب الجديد نجح.
- [[rclone copy]]: انسخ لمكان بعيد ([[remote:]] اسم انت معرّفه في إعدادات rclone، زي S3 أو Google Drive). ده الجزء اللي مجربتوش فعلًا، عندي كان وهمي.
- [[ls ... | wc -l]]: عدّ الملفات ([[wc -l]] عدد السطور).

---

## اللي حصل فعلًا

التشغيل العادي:

~~~text الناتج
[2026-10-06 19:34:42] start: /var/backups/myapp/myapp-2026-10-06_1934.archive.gz
[2026-10-06 19:34:42] ok: 8.0K
rclone (fake) copy /var/backups/myapp/myapp-2026-10-06_1934.archive.gz remote:backups/myapp/
[2026-10-06 19:34:42] done: 1 backups on disk
exit=0
~~~

(كتبت المسار زي بتاع السيرفر بدل فولدر التجربة.) الملف 4378 بايت، و [[du]] قال [[8.0K]] لأنه بيعدّ بلوكات الديسك (٤ كيلو للبلوك) مش البايتات.

بباسورد غلط في [[.env]]:

~~~text الناتج
[2026-10-06 19:34:43] start: /var/backups/myapp/myapp-2026-10-06_1934.archive.gz
[2026-10-06 19:34:43] ERROR: backup failed at line 15
exit=1
~~~

السطر ١٥ هو آخر سطر في أمر الـ dump. والملف القديم فضل سليم (4378 بايت) لأن [[mv]] ما اتنفذش.

### ونفس الغلطة من غير pipefail

شلت [[pipefail]] وشغّلته بالباسورد الغلط في نفس الدقيقة (فنفس اسم الملف):

~~~text الناتج
[2026-10-06 19:34:54] ERROR: empty file
exit=1
~~~

السطر ١٥ «نجح» (لأن tee نجح)، و [[mv]] كتب ملف فاضي **فوق** الباك أب السليم، والـ [[-s]] هو اللي مسكها في الآخر بعد ما الضرر حصل. عشان كده pipefail مش رفاهية.

## الخلاصة

| الحتة | بتحمي من إيه |
|---|---|
| [[set -euo pipefail]] | فشل في نص pipe يعدّي في صمت |
| [[.env]] و [[set -a]] | باسورد مكتوب في السكربت |
| [[trap ... ERR]] | فشل من غير ما اللوج يقول فين |
| [[2>&1 >file]] | رسايل الأخطاء تدخل في ملف البيانات |
| [[.part]] ثم [[mv]] و [[-s]] | ملف ناقص أو فاضي يتحسب باك أب |
| [[find -mtime]] بعد النجاح | تمسح القديم وانت معندكش جديد |
| [[rclone copy]] | السيرفر يروح والباك أب معاه |`,
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
          ],
          sol: R`التشغيل الأول بيطبع:

[[[2026-09-30 05:10:56] start: .../myapp-2026-09-30_0510.archive.gz]] و [[ok: 4.0K]] و [[done: 1 backups on disk]]، و [[echo $?]] بيطبع 0.

بالباسورد الغلط: [[start: ...]] وبعدها على طول [[ERROR: backup failed at line 15]] (رقم السطر اللي فيه [[docker exec ... mongodump]])، و [[echo $?]] بيطبع 1. والـ [[.part]] اتمسح، والباك أب القديم ما اتلمسش، لأن الـ [[mv]] ما اتنفذش. لاحظ إن [[--quiet]] بيخبّي رسالة mongodump نفسها، فالسطر ده في اللوج هو دليلك الوحيد؛ لو عايز السبب شغّل الأمر من غير [[--quiet]] بإيدك.

لو السكربت خرج بـ 0 رغم الباسورد الغلط، يبقى [[pipefail]] مش شغال (مثلًا شغّلته بـ [[sh backup.sh]] بدل [[bash]] أو [[./backup.sh]]). وفي cron: [[crontab -l]] لازم يعرض السطر، و [[/var/log/myapp-backup-cron.log]] يبدأ يتملي بعد ٣ الفجر. ولو قال [[docker: command not found]] أو [[rclone: command not found]] يبقى PATH بتاع cron قصير.`
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
          teach: R`## نفس الـ archive، بس بيسافر بين سيرفرين

النقل = باك أب من القديم + ترجيع في الجديد + عدّ للتأكد. الجديد هنا إن الـ stdout بيعدّي من [[ssh]]. سطور ssh و scp و Atlas في المثال مجربتهاش (معنديش سيرفرين ولا Atlas هنا)، وشرحها من الـ docs ومن نفس سلوك [[docker exec]] اللي جربناه. اللي جربته فعلًا هو الـ solCode: نقل بين ٢ containers على نفس الجهاز، من Git Bash على ويندوز مع Docker Desktop.

---

## ١. dump على القديم، والملف ينزل عندك

~~~bash
ssh deploy@203.0.113.10 "docker exec mongo mongodump ... --archive --gzip" > myapp.archive.gz
~~~

- [[ssh deploy@203.0.113.10 "أمر"]]: ادخل السيرفر ده باليوزر deploy، ونفّذ الأمر اللي بين العلامات **هناك**، واخرج. (203.0.113.x عناوين محجوزة للأمثلة.)
- الـ dump بيطلع على stdout بتاع السيرفر، و ssh بيوصّله لـ stdout بتاعك، و [[>]] (برّه العلامات) بيكتبه في ملف **على جهازك**.
- ssh من غير أمر بيفتح ترمنال، لكن مع أمر مش بيعمل TTY افتراضيًا، فالبايتات بتوصل سليمة. متضيفش [[-t]] لا لـ ssh ولا لـ docker exec.

---

## ٢. ارفعه للجديد، ورجّعه هناك

~~~bash
scp myapp.archive.gz deploy@203.0.113.20:/tmp/
ssh deploy@203.0.113.20 "docker exec -i mongo mongorestore ... --archive --gzip < /tmp/myapp.archive.gz"
~~~

- [[scp]] (secure copy): انسخ ملف عبر ssh، والشكل [[يوزر@سيرفر:مسار]].
- الـ [[<]] هنا **جوه** العلامات، فبيتنفّذ على السيرفر الجديد: اقرا [[/tmp/myapp.archive.gz]] اللي هناك.

> المكان اللي فيه [[<]] أو [[>]] بالنسبة للعلامات هو اللي بيحدد هيتنفّذ على أنهي جهاز.

---

## ٣. العدّ، وليه علامات مختلفة

~~~bash
ssh deploy@203.0.113.20 'docker exec mongo mongosh myapp ... --eval "db.users.countDocuments()"'
~~~

العلامات برّه هنا مفردة ([[' ']]) عشان جوه فيه مزدوجة ([[" "]]). كمان المفردة بتمنع الـ shell عندك إنه يفسّر أي [[$]] جواها، فالأمر يوصل للسيرفر زي ما هو.

---

## ٤. من Atlas

~~~bash
mongodump --uri "mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.example.mongodb.net/myapp" --archive --gzip > atlas.archive.gz
~~~

هنا [[mongodump]] على جهازك نفسه (محتاج تسطّب MongoDB Database Tools)، و [[--uri]] بياخد نفس الرابط اللي في [[.env]]. والـ IP بتاعك لازم يبقى مسموح في Network Access في Atlas. وبعدها الملف ده بيترجع على سيرفرك زي الخطوة ٢.

---

## ٥. اللي جربته: الـ solCode

~~~bash
docker run -d --name mongo2 -p 127.0.0.1:27018:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret2 mongo:8
~~~

Mongo تاني بباسورد مختلف، على بورت 27018 على جهازك ([[127.0.0.1:27018:27017]] = عنوان:بورت عندك:بورت جوه). عندي كان اسمه [[mongo-lab-2]] على بورت تاني.

~~~bash
until docker logs mongo2 2>&1 | grep -q "init process complete" && docker exec mongo2 mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
~~~

نفس الاستنى بتاع درس الترجيع: لحد ما الإعداد الأول يخلص و Mongo الحقيقي يرد.

~~~bash
docker exec mongo mongodump ... --archive --gzip \
  | docker exec -i mongo2 mongorestore ... --archive --gzip
~~~

من غير ملف خالص: [[|]] بيوصّل stdout الأول بـ stdin التاني مباشرة. dump من mongo، و restore في mongo2 بالباسورد بتاعه.

~~~text الناتج (آخر السطور)
restoring indexes for collection $__btmyapp.users$__bt from metadata
501 document(s) restored successfully. 0 document(s) failed to restore.
~~~

وبعدها العدّ على الاتنين:

~~~text الناتج
500
500
~~~

و [[getIndexes()]] على الجديد طلّع [[[ '_id_', 'email_1' ]]] زي القديم.

### اليوزرز مش بيتنقلوا

~~~text يوزرز السيرفر الجديد (db.system.users في admin)
[ { user: 'admin' } ]
~~~

admin بس، اللي اتعمل من [[MONGO_INITDB_ROOT_USERNAME]]. اليوزرز متخزنين في قاعدة admin، و [[--db myapp]] مش بياخدهم، فلازم [[createUser]] ليوزر التطبيق على الجديد قبل ما تغيّر [[MONGODB_URI]].

ولو البورت مستخدم، [[docker run]] بيفشل:

~~~text الناتج
Bind for 127.0.0.1:27119 failed: port is already allocated
~~~

---

## ترتيب النقل الآمن

| # | الخطوة | ليه |
|---|---|---|
| ١ | وقّف الباك إند (أو read-only) | أي كتابة بعد الـ dump تضيع |
| ٢ | dump من القديم | |
| ٣ | restore في الجديد | |
| ٤ | عدّ كل collection مهمة على الاتنين | تتأكد إن كله وصل |
| ٥ | [[createUser]] ليوزر التطبيق على الجديد | اليوزرز مش في الـ dump |
| ٦ | غيّر [[MONGODB_URI]] وشغّل الباك إند | |
| ٧ | سيب القديم أسبوع | لو اكتشفت حاجة ناقصة |

## الخلاصة

- [[ssh سيرفر "أمر" > ملف]]: الأمر هناك، والملف عندك. والـ [[<]] جوه العلامات يبقى هناك.
- من غير [[-t]] في أي حتة البايتات بتعدّي فيها.
- container لـ container على نفس الجهاز: pipe واحد.
- العدّ على الاتنين، واليوزرز تتعمل تاني.`,
          lines: [
            "dump على السيرفر القديم، والملف ييجي لجهازك عبر ssh.",
            "انسخه للسيرفر الجديد.",
            "رجّعه في Mongo اللي على الجديد.",
            "اتأكد من العدّ على الجديد.",
            "من Atlas: باك أب بالرابط بتاعهم على جهازك."
          ],
          sol: R`من غير ssh الخطوات بتبقى pipe واحد: dump من الأول وrestore في التاني على طول. الناتج في الآخر [[501 document(s) restored successfully. 0 document(s) failed to restore.]]، و [[countDocuments()]] على users في الاتنين [[500]] و [[500]].

قارن كل الـ collections المهمة مش واحدة بس. وخلي بالك إن [[myapp_user]] ما اتنقلش: [[--db myapp]] مش بياخد اليوزرز لأنهم في قاعدة admin، فالتطبيق على السيرفر الجديد هيقول [[Authentication failed.]] لحد ما تعمل [[createUser]] تاني هناك.

وتأكد من الـ indexes: [[db.users.getIndexes()]] لازم يطلع نفس القايمة في الاتنين (mongorestore بيرجّعها من الـ metadata). ولو الـ container التاني ما بدأش لأن البورت 27018 مستخدم هيقولك [[port is already allocated]].`,
          solCode: R`docker run -d --name mongo2 -p 127.0.0.1:27018:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret2 mongo:8
until docker logs mongo2 2>&1 | grep -q "init process complete" && docker exec mongo2 mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --archive --gzip \
  | docker exec -i mongo2 mongorestore -u admin -p secret2 --authenticationDatabase admin --archive --gzip
docker exec mongo  mongosh myapp -u admin -p secret  --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"
docker exec mongo2 mongosh myapp -u admin -p secret2 --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"`
        }
      ]
    }
]);
