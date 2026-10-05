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
until docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
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

الـ container المؤقت: Mongo نضيف على volume مؤقت، [[until ... ping]] بيستنى لحد ما يصحى، والترجيع فيه، والعدّ. لو الأرقام قريبة من الإنتاج يبقى الباك أب سليم. [[rm -fv]] بيشيل الـ container والـ volume المؤقت بتاعه (من غير [[-v]] الـ volume بيفضل على الديسك).

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
until docker exec mongo2 mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 2; done
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --db myapp --archive --gzip \
  | docker exec -i mongo2 mongorestore -u admin -p secret2 --authenticationDatabase admin --archive --gzip
docker exec mongo  mongosh myapp -u admin -p secret  --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"
docker exec mongo2 mongosh myapp -u admin -p secret2 --authenticationDatabase admin --quiet --eval "db.users.countDocuments()"`
        }
      ]
    }
]);
