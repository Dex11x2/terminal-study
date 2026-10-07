// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "الباك أب",
      l: 3,
      n: "نسخة مشفّرة برّه السيرفر، و Mongo كل يوم، وملف bat لحد مش مبرمج",
      items: [
        {
          cmd: "backup_offsite.sh",
          title: "باك أب مشفّر يترفع برّه السيرفر",
          desc: R`قاعدة 3-2-1 عمليًا: dump لكل قاعدة بالصيغة المضغوطة، تشفير قبل ما الملف يسيب السيرفر، رفع لتخزين خارجي بـ rclone، تأكيد إن الرفع وصل، ومسح أي نسخة أقدم من ٩٠ يوم.

وطريقة الاسترجاع مكتوبة في آخر الملف، لأن الباك أب اللي محدش عارف يرجّعه ملوش لازمة.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
: "$__{BACKUP_PASSPHRASE:?set BACKUP_PASSPHRASE in .env (openssl rand -base64 32)}"
: "$__{BACKUP_REMOTE:?set BACKUP_REMOTE in .env, e.g. remote:bucket/myapp}"
STAMP=$(date +%F_%H%M)
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
for DB in appdb n8n; do
  docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -d "$DB" -Fc > "$TMP/$DB.dump"
  echo "$DB: $(du -h "$TMP/$DB.dump" | cut -f1)"
done
ARCHIVE="myapp_$STAMP.tar.gz.enc"
tar -czf - -C "$TMP" appdb.dump n8n.dump \
  | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt \
      -pass env:BACKUP_PASSPHRASE -out "$TMP/$ARCHIVE"
rclone copy "$TMP/$ARCHIVE" "$BACKUP_REMOTE/"
rclone check "$TMP" "$BACKUP_REMOTE/" --one-way --include "$ARCHIVE"
rclone delete "$BACKUP_REMOTE/" --min-age 90d --include 'myapp_*.enc'
echo "done: $ARCHIVE"
# الاسترجاع (على أي جهاز معاه الـ passphrase):
#   rclone copy "$BACKUP_REMOTE/myapp_2026-09-01_0330.tar.gz.enc" .
#   openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in myapp_2026-09-01_0330.tar.gz.enc | tar -xzf -
#   docker compose exec -T postgres pg_restore -U "$POSTGRES_USER" -d appdb --clean --if-exists < appdb.dump
# cron كل يوم 3:30 الفجر:
#   30 3 * * * cd /opt/myapp && bash scripts/backup_offsite.sh >> /var/log/myapp-backup.log 2>&1`,
          try: "على سيرفر التجربة اعمل remote في rclone لفولدر محلي ([[rclone config]] ← local)، وشغّل السكربت، وبعدين اعمل الاسترجاع كامل على قاعدة جديدة فاضية واتأكد إن الجداول والصفوف رجعت.",
          flag: "script",
          deep: {
            why: "باك أب على نفس السيرفر بيروح مع السيرفر (قرص باظ، أو حد مسح، أو الشركة قفلت الحساب). ورفعه من غير تشفير معناه إن أي حد يوصل للـ bucket معاه بيانات عملائك كلها.",
            how: R`[[set -a; . ./.env; set +a]] بيقرا .env ويعمل export لكل متغير فيه. و [[: "$__{VAR:?msg}"]] بيوقف السكربت برسالة لو المتغير فاضي.

[[mktemp -d]] فولدر مؤقت باسم عشوائي، و [[trap ... EXIT]] بيمسحه في الآخر مهما حصل، حتى لو السكربت وقع في النص.

[[pg_dump -Fc]] الصيغة المضغوطة (custom) اللي [[pg_restore]] بيقراها ويرجّع منها جدول واحد لو عايز. و [[-T]] مع exec عشان مفيش ترمنال (cron).

tar بيطلع على stdout ([[-f -]]) ويدخل على openssl مباشرة، فمفيش نسخة مش مشفّرة على القرص. [[-pbkdf2 -iter 200000]] بيخلي تخمين الـ passphrase بطيء جدًا. و [[-pass env:BACKUP_PASSPHRASE]] بياخد الباسورد من متغير بيئة مش من سطر الأوامر.

[[rclone copy]] بيرفع لأي تخزين (S3 أو Backblaze أو Google Drive)، و [[rclone check --one-way]] بيقارن الملف المحلي باللي اترفع ويفشل لو مختلفين. و [[delete --min-age 90d]] بيمسح النسخ الأقدم من ٩٠ يوم بس.

الاسترجاع بالعكس: نزّل، فك التشفير في tar، و [[pg_restore --clean --if-exists]] بيمسح الجداول الموجودة ويرجّعها.`,
            when: "أي سيرفر فيه بيانات مش عايز تخسرها، ويتربط بـ cron. pg_dump و pg_restore لوحدهم في تاب PostgreSQL، و cron في تاب VPS.",
            mistakes: R`في مشروع حقيقي كان التشفير بـ [[-pass "pass:$PASS"]]، فالباسورد بيبان في [[ps aux]] لأي يوزر على السيرفر وقت ما السكربت شغال. [[env:]] أو [[file:]] بدلها.

و [[aes-256-cbc]] من غير MAC، يعني لو حد عدّل في الملف مش هتعرف. [[age]] أو [[gpg]] أحسن لو هتبدأ من الصفر.

ومكانش فيه أي فحص إن الرفع وصل فعلًا (اتضاف [[rclone check]] هنا)، ولا تنبيه لو cron فشل. الباك أب ممكن يكون واقف من شهر ومحدش واخد باله.

ومفيش اختبار استرجاع دوري. جرّب ترجّع نسخة على قاعدة فاضية مرة كل شهر على الأقل.`
          },
          teach: R`## الأول: ٥ مراحل

السكربت بيعمل ٥ حاجات بالترتيب: يجهّز (يقرا الإعدادات ويتأكد منها)، ياخد dump من كل قاعدة، يجمعهم ويشفّرهم في ملف واحد، يرفعه ويتأكد إنه وصل، ويمسح القديم. وتحت التعليقات طريقة الاسترجاع والـ cron.

جربته بالظبط: مشروع compose فيه خدمة [[postgres]] (Postgres 16) وقاعدتين [[appdb]] (جدول [[t]] فيه ١٠٠ صف) و [[n8n]]، والسكربت في [[scripts/backup_offsite.sh]]، وشغّلته من Git Bash على ويندوز مع rclone 1.75. و [[BACKUP_REMOTE]] فولدر محلي، لأن rclone بيتعامل مع أي مسار عادي كأنه remote. والاسترجاع جربته على Ubuntu 24.04.

---

## ١. التجهيز

### [[#!/usr/bin/env bash]]

الـ shebang: لو شغّلت الملف مباشرة ([[./backup_offsite.sh]])، النظام بيدوّر على [[bash]] في الـ PATH بـ [[env]] ويشغّله بيه.

### [[set -euo pipefail]]

٣ اختيارات مع بعض:

| الحرف | معناه |
|---|---|
| [[-e]] | أي أمر يفشل = السكربت يقف |
| [[-u]] | استخدام متغير مش معرّف = خطأ ويقف (بدل ما يبقى فاضي في صمت) |
| [[-o pipefail]] | في [[a | b]] لو [[a]] فشل، الـ pipe كله فاشل (افتراضيًا بيتحسب بآخر أمر بس) |

### [[cd "$(dirname "$0")/.."]]

[[$0]] مسار السكربت زي ما اتشغّل ([[scripts/backup_offsite.sh]]). [[dirname]] بيشيل اسم الملف ويسيب الفولدر ([[scripts]]). و [[$(...)]] بيشغّل اللي جواه ويحط الناتج مكانه، و [[/..]] فولدر فوق. يعني «ادخل جذر المشروع» مهما كان انت فين وقت التشغيل (cron مثلًا بيبدأ من الـ home).

### [[set -a; . ./.env; set +a]]

[[.]] (نقطة لوحدها) بتقرا الملف وتنفّذه في نفس الـ shell، فكل [[NAME=value]] فيه يبقى متغير. و [[set -a]] (a = all export) بيخلي أي متغير يتعمل بعده يتعمل له export تلقائي، يعني يوصل للبرامج اللي السكربت بيشغّلها (زي [[openssl]] اللي هيقرا [[BACKUP_PASSPHRASE]]). و [[set +a]] بيقفل الوضع ده.

### [[: "$__{BACKUP_PASSPHRASE:?...}"]]

[[:]] أمر مبيعملش حاجة. الفايدة في اللي بعده: [[$__{VAR:?msg}]] لو المتغير فاضي أو مش موجود، bash يطبع الرسالة ويوقف السكربت. جربت أشيل [[BACKUP_REMOTE]] من [[.env]]:

~~~text الناتج
scripts/backup_offsite.sh: line 6: BACKUP_REMOTE: set BACKUP_REMOTE in .env, e.g. remote:bucket/myapp
~~~

وexit 1 قبل ما يلمس القاعدة. والرسالة نفسها بتقولك تعمل الـ passphrase إزاي: [[openssl rand -base64 32]] = ٣٢ بايت عشوائي مكتوبين base64 (حروف وأرقام).

### [[STAMP=$(date +%F_%H%M)]]

[[%F]] = [[2026-10-07]]، و [[%H%M]] الساعة والدقيقة = [[1911]]. فالاسم بيترتّب بالتاريخ لوحده.

### [[TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT]]

[[mktemp -d]] بيعمل فولدر مؤقت باسم عشوائي (زي [[/tmp/tmp.Xa81kQ]]) ويطبع اسمه. و [[trap '...' EXIT]] بيسجّل أمر يتنفّذ لما السكربت يخلص **بأي طريقة**: نجح، أو وقف بسبب [[-e]]، أو [[:?]]. فالـ dumps الغير مشفّرة مش بتفضل على القرص أبدًا.

---

## ٢. الـ dump

~~~bash
for DB in appdb n8n; do
  docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -d "$DB" -Fc > "$TMP/$DB.dump"
  echo "$DB: $(du -h "$TMP/$DB.dump" | cut -f1)"
done
~~~

- [[for DB in appdb n8n]]: لف مرتين، مرة [[DB=appdb]] ومرة [[DB=n8n]].
- [[docker compose exec -T postgres]]: شغّل أمر جوه خدمة [[postgres]]. [[-T]] من غير terminal، لازم مع [[>]] ومع cron.
- [[pg_dump -U "$POSTGRES_USER" -d "$DB" -Fc]]: [[-U]] اليوزر (من [[.env]])، [[-d]] القاعدة، [[-Fc]] = format custom: ملف مضغوط، و [[pg_restore]] يقدر يرجّع منه جدول واحد لو عايز.
- [[> "$TMP/$DB.dump"]]: الناتج بيطلع من الـ container على stdout ويتكتب على السيرفر.
- [[du -h ... | cut -f1]]: [[du]] (disk usage) بيطبع [[الحجم<TAB>الاسم]]، و [[-h]] بوحدات مقروءة، و [[cut -f1]] ياخد أول عمود.

~~~text الناتج
appdb: 4.0K
n8n: 4.0K
~~~

4.0K لأن ده أصغر بلوك على القرص. لو شفت [[0]] يبقى الـ dump فاضي. وجربت أوقف Postgres قبل التشغيل: السكربت وقف هنا برسالة [[service "postgres" is not running]] وexit 1، ومترفعش حاجة.

---

## ٣. التجميع والتشفير

~~~bash
ARCHIVE="myapp_$STAMP.tar.gz.enc"
tar -czf - -C "$TMP" appdb.dump n8n.dump \
  | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt \
      -pass env:BACKUP_PASSPHRASE -out "$TMP/$ARCHIVE"
~~~

الـ [[\]] في آخر السطر يعني «الأمر مكمّل في السطر اللي تحته». فده أمر واحد بـ pipe.

### [[tar -czf - -C "$TMP" appdb.dump n8n.dump]]

| الجزء | معناه |
|---|---|
| [[-c]] | create: اعمل أرشيف |
| [[-z]] | اضغطه gzip |
| [[-f -]] | الملف الناتج اسمه [[-]] = اطبعه على stdout بدل ملف |
| [[-C "$TMP"]] | ادخل الفولدر ده الأول، فالأسامي جوه الأرشيف تبقى [[appdb.dump]] مش مسار كامل |

### [[openssl enc ...]]

| الجزء | معناه |
|---|---|
| [[enc]] | تشفير متماثل (نفس الباسورد للتشفير والفك) |
| [[-aes-256-cbc]] | الخوارزمية: AES بمفتاح 256 بت |
| [[-pbkdf2 -iter 200000]] | المفتاح بيتولّد من الـ passphrase بعد ٢٠٠ ألف دورة hash، فتخمين باسورد واحد بقى بطيء جدًا |
| [[-salt]] | قيمة عشوائية بتتحط في أول الملف، فنفس الباسورد يطلّع مفتاح مختلف كل مرة |
| [[-pass env:BACKUP_PASSPHRASE]] | خد الباسورد من متغير البيئة ده |
| [[-out]] | اكتب الناتج هنا |

أول ١٦ بايت في الملف بتبيّن الـ salt:

~~~text od -c (أول 16 بايت)
S   a   l   t   e   d   _   _   V 373 016 227 377   B   ) 374
~~~

### ليه [[env:]] مش [[pass:]]؟

أي حاجة في سطر الأوامر بتبان لأي يوزر على السيرفر في [[ps]]. شغّلت الاتنين جنب بعض على Ubuntu وبصيت في [[ps -eo args]]:

~~~text الناتج
openssl enc -aes-256-cbc -pbkdf2 -pass pass:TopSecret123 -out /dev/null
openssl enc -aes-256-cbc -pbkdf2 -pass env:X -out /dev/null
~~~

الأول الباسورد مكتوب قدامك، والتاني اسم المتغير بس.

ولأن tar بيكتب على stdout و openssl بيقرا منه مباشرة، النسخة المضغوطة الغير مشفّرة مش بتتكتب على القرص خالص.

---

## ٤. الرفع والتأكد والمسح

### [[rclone copy "$TMP/$ARCHIVE" "$BACKUP_REMOTE/"]]

rclone بيتكلم مع أكتر من ٧٠ نوع تخزين (S3 و Backblaze B2 و Google Drive...) بنفس الأوامر. [[remote:bucket/myapp]] معناها «الـ remote اللي اسمه remote في إعدادات rclone ([[rclone config]])، والمسار ده جواه». [[copy]] بيرفع الملف لو مش موجود أو مختلف.

### [[rclone check "$TMP" "$BACKUP_REMOTE/" --one-way --include "$ARCHIVE"]]

[[check]] بيقارن فولدرين (الحجم والـ hash). [[--include]] يقارن الملف ده بس، و [[--one-way]] يعني «اتأكد إن اللي عندي موجود هناك»، ومتهتمش بالملفات القديمة اللي هناك ومش هنا. لو فيه فرق بيخرج بـ exit غير 0 فـ [[set -e]] يوقف السكربت:

~~~text الناتج
NOTICE: Local file system at .../remote: 0 differences found
NOTICE: Local file system at .../remote: 1 matching files
~~~

### [[rclone delete "$BACKUP_REMOTE/" --min-age 90d --include 'myapp_*.enc']]

امسح الملفات اللي عمرها أكتر من ٩٠ يوم **واسمها على الشكل ده بس**. حطيت ملفين قديمين في الـ remote: [[myapp_2026-06-01_0330.tar.gz.enc]] و [[other_file.txt]]، وشغّلت بـ [[-v]] (تفاصيل):

~~~text الناتج
INFO  : myapp_2026-06-01_0330.tar.gz.enc: Deleted
~~~

اتمسح القديم بتاعنا بس، و [[other_file.txt]] فضل رغم إنه أقدم، لأنه مش مطابق لـ [[--include]]. والـ single quotes حوالين [[myapp_*.enc]] عشان bash ميحاولش يفك [[*]] على ملفات الفولدر الحالي.

~~~text آخر سطر
done: myapp_2026-10-07_1911.tar.gz.enc
~~~

والملف اللي اترفع حجمه 1216 بايت (الـ dumps مضغوطة ومشفّرة).

---

## ٥. الاسترجاع (التعليقات اللي تحت)

### نزّل وفك

~~~bash
rclone copy "$BACKUP_REMOTE/myapp_2026-09-01_0330.tar.gz.enc" .
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in myapp_....tar.gz.enc | tar -xzf -
~~~

[[-d]] = decrypt، ولازم نفس الخوارزمية و [[-iter]] بالظبط. و [[tar -xzf -]]: [[-x]] extract من stdin. جربتها على Ubuntu 24.04 (OpenSSL 3.0.13) لملف اتشفّر على ويندوز (OpenSSL 3.5.8)، يعني «أي جهاز» فعلًا:

~~~text الناتج
appdb.dump
n8n.dump
~~~

وأول ٥ بايت في [[appdb.dump]] كانت [[PGDMP]]، ده توقيع صيغة pg_dump custom. وبباسورد غلط:

~~~text الناتج
bad decrypt
...:error:1C800064:Provider routines:ossl_cipher_unpadblock:bad decrypt:...
~~~

### رجّع للقاعدة

~~~bash
docker compose exec -T postgres pg_restore -U "$POSTGRES_USER" -d appdb --clean --if-exists < appdb.dump
~~~

[[--clean]] امسح كل جدول قبل ما ترجّعه، و [[--if-exists]] متطلعش خطأ لو مش موجود. مسحت ٩٠ صف من [[t]] (فاضل ١٠) ورجّعت: exit 0، و [[select count(*) from t]] رجع [[100]]. ولو القاعدة نفسها مش موجودة:

~~~text الناتج
pg_restore: error: connection to server ... failed: FATAL:  database "appdb_restore" does not exist
~~~

اعملها بـ [[createdb]] الأول.

### الـ cron

~~~text
30 3 * * * cd /opt/myapp && bash scripts/backup_offsite.sh >> /var/log/myapp-backup.log 2>&1
~~~

الخانات: دقيقة 30، ساعة 3، أي يوم، أي شهر، أي يوم في الأسبوع = كل يوم 3:30 الفجر. [[>>]] يضيف للّوج، و [[2>&1]] الأخطاء في نفس اللوج.

---

## الخلاصة

| المرحلة | الأمر | اللي يحميك |
|---|---|---|
| تجهيز | [[set -euo pipefail]] و [[:?]] | يقف عند أول غلطة أو متغير ناقص |
| مؤقت | [[mktemp -d]] + [[trap EXIT]] | مفيش dumps مكشوفة تفضل |
| dump | [[pg_dump -Fc]] | ملف مضغوط يرجع منه جدول واحد |
| تشفير | [[tar | openssl -pbkdf2 -pass env:]] | مفيش نسخة مكشوفة على القرص ولا باسورد في [[ps]] |
| رفع | [[rclone copy]] + [[check --one-way]] | تعرف إنه وصل فعلًا |
| تنضيف | [[delete --min-age 90d --include]] | ملفاتك القديمة بس |
| استرجاع | [[openssl -d]] ثم [[pg_restore --clean --if-exists]] | جرّبه كل شهر، وخزّن الـ passphrase برّه السيرفر |`,
          lines: [
            "أي خطأ، أو متغير مش معرّف، أو pipe فشل: وقّف.",
            "ادخل جذر المشروع (فولدر فوق السكربت).",
            "اقرا .env واعمل export لكل متغير فيه.",
            "لازم passphrase التشفير يبقى موجود.",
            "ولازم مكان الرفع.",
            "التاريخ والساعة في اسم الملف.",
            "فولدر مؤقت يتمسح مهما حصل.",
            "لكل قاعدة:",
            "dump مضغوط من جوه الـ container.",
            "اطبع الحجم (dump فاضي = مشكلة).",
            "قفلة اللوب.",
            "اسم الأرشيف المشفّر.",
            "اجمع الـ dumps في tar على stdout...",
            "...ودخّله على openssl يشفّره...",
            "...بالباسورد من متغير بيئة، واكتب الملف المشفّر.",
            "ارفع للتخزين الخارجي.",
            "اتأكد إن اللي اترفع زي المحلي.",
            "امسح النسخ الأقدم من ٩٠ يوم.",
            "خلصت."
          ],
          sol: R`جربته على Postgres 16 في compose من Git Bash على ويندوز، و rclone 1.75 الحقيقي، و [[BACKUP_REMOTE]] فولدر محلي (rclone بيقبل مسار عادي مكان [[remote:bucket]]). الناتج:

[[appdb: 4.0K]]
[[n8n: 4.0K]]
[[NOTICE: Local file system at ...: 0 differences found]]
[[NOTICE: Local file system at ...: 1 matching files]]
[[done: myapp_2026-09-30_0806.tar.gz.enc]]

والاسترجاع على قاعدة جديدة فاضية: [[openssl enc -d ... | tar -xzf -]] طلّع [[appdb.dump]] و [[n8n.dump]]، و [[pg_restore -d appdb_restore --clean --if-exists < appdb.dump]] خلص بـ exit 0، و [[select count(*) from t]] رجّع [[100]] زي الأصل. وفك التشفير اشتغل على Ubuntu 24.04 بـ OpenSSL 3.0 لملف اتشفّر بـ OpenSSL 3.5 على ويندوز.

الاسترجاع هو الاختبار الحقيقي، مش إن الملف اترفع. لو [[pg_restore]] قال [[database "appdb" does not exist]] اعمل القاعدة الأول. ولو فك التشفير قال [[bad decrypt]] يبقى الـ passphrase مختلف، وخزّنها برّه السيرفر (password manager)، لأن لو السيرفر ضاع والـ passphrase عليه بس، الباك أب ملوش لازمة.`
        },
        {
          cmd: "backup_mongodb.sh",
          title: "باك أب يومي لـ MongoDB جوه Docker",
          desc: R`[[mongodump]] من جوه الـ container على طول لملف مضغوط على السيرفر، ولوج بالتاريخ، ومسح أي نسخة أقدم من ٣٠ يوم. يتربط بـ cron.

النسخة الأصلية كان فيها bug حقيقي: الفشل مكانش بيتكشف أبدًا، لأن السكربت كان بيشيك على exit code بتاع tee مش mongodump. الحل [[set -o pipefail]].`,
          example: R`#!/usr/bin/env bash
# cron: 0 3 * * * /opt/myapp/backup_mongodb.sh
set -euo pipefail
set -a; . /opt/myapp/backup.env; set +a
BACKUP_DIR=/var/backups/myapp
LOG_FILE=/var/log/myapp_backup.log
RETENTION_DAYS=30
FILE="$BACKUP_DIR/myapp_$(date +%F_%H-%M).archive.gz"
log() { echo "[$(date '+%F %T')] $1" | tee -a "$LOG_FILE"; }
mkdir -p "$BACKUP_DIR"
log "start: $FILE"
if ! docker exec -e MONGO_USER -e MONGO_PASS myapp-mongodb sh -c \
    'mongodump -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --db myapp --archive --gzip' \
    > "$FILE" 2>> "$LOG_FILE"; then
  log "ERROR: mongodump failed"; rm -f "$FILE"; exit 1
fi
log "ok: $(du -h "$FILE" | cut -f1)"
find "$BACKUP_DIR" -name 'myapp_*.archive.gz' -mtime +"$RETENTION_DAYS" -delete
log "kept: $(ls "$BACKUP_DIR"/myapp_*.archive.gz | wc -l) backups"
# استرجاع:
#   docker exec -i -e MONGO_USER -e MONGO_PASS myapp-mongodb sh -c 'mongorestore -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --archive --gzip --drop' < FILE`,
          try: "على سيرفر التجربة جرّب الفرق بنفسك: [[false | tee x.log; echo $?]] هيطبع 0. وبعدين [[set -o pipefail; false | tee x.log; echo $?]] هيطبع 1. وبعدها شغّل السكربت على Mongo تجريبي، ووقّف الـ container وشغّله تاني وتأكد إنه قال ERROR.",
          flag: "script",
          deep: {
            why: "أخطر باك أب هو اللي بيفشل في صمت: اللوج كل يوم بيقول SUCCESS، ويوم ما تحتاجه تلاقي الملفات فاضية. ده بالظبط اللي كان ممكن يحصل في النسخة الأصلية.",
            how: R`الـ exit code بتاع pipeline ([[a | b]]) هو بتاع آخر أمر بس. الأصلي كان [[mongodump ... 2>&1 | tee -a "$LOG_FILE"]] وبعدين [[if [ $? -ne 0 ]; then]]، و tee دايمًا بينجح، فـ [[$?]] دايمًا 0. [[set -o pipefail]] بيخلي الـ pipeline يفشل لو أي أمر فيه فشل.

النسخة المصلّحة مش محتاجة pipe أصلًا: [[--archive --gzip]] بيطلّع الباك أب كله ملف واحد مضغوط على stdout، والـ redirect [[> "$FILE"]] بيكتبه على السيرفر مباشرة. مفيش [[docker cp]] ولا tar ولا فولدر مؤقت جوه الـ container. والأخطاء بتروح للّوج بـ [[2>>]].

[[docker exec -e MONGO_PASS]] من غير قيمة بياخد قيمة المتغير من السكربت، فالباسورد مش مكتوب في الملف. والـ single quotes حوالين أمر mongodump بتخلي [[$MONGO_PASS]] يتفك جوه الـ container مش برّه.

[[find -mtime +30 -delete]] بيمسح الملفات اللي آخر تعديل ليها من أكتر من ٣٠ يوم.`,
            when: "أي MongoDB على VPS. ومع نسخة برّه السيرفر زي «backup_offsite.sh». أوامر mongodump و mongorestore لوحدها في تاب MongoDB، و pipefail في تاب bash.",
            mistakes: R`في مشروع حقيقي كان [[if [ $? -ne 0 ]; then]] بعد pipe مع tee، فالفشل عمره ما اتكشف. الحل [[set -o pipefail]] أو تستغنى عن الـ pipe.

والباسورد كان مكتوب في السكربت نفسه، والسكربت مرفوع على git. لازم يتقرا من ملف env بصلاحية 600 ([[chmod 600 backup.env]]).

والباسورد بيتبعت في سطر الأوامر ([[--password]])، فبيبان في [[ps]] على السيرفر وقت الباك أب. لو ده يهمك، استخدم [[--config]] بملف فيه الباسورد جوه الـ container.

والباك أب على نفس السيرفر: لو السيرفر راح الباك أب راح. ومفيش تجربة restore دورية.`
          },
          teach: R`## الأول: الـ bug اللي السكربت ده بيصلّحه

قبل السكربت، لازم تشوف المشكلة بعينك. شغّلت ده على Ubuntu 24.04:

~~~bash
false | tee x.log; echo $?
set -o pipefail; false | tee x.log; echo $?
~~~

~~~text الناتج
0
1
~~~

[[false]] أمر بيفشل دايمًا (exit 1)، و [[tee]] بيكتب اللي جاله على الشاشة وفي ملف. و [[$?]] هو exit code آخر حاجة اتنفّذت. من غير pipefail الـ pipe بياخد exit بتاع **آخر أمر** ([[tee]] اللي نجح)، فالفشل اختفى. وده شكل السكربت الأصلي تقريبًا:

~~~bash
(echo boom >&2; exit 3) 2>&1 | tee -a x.log
if [ $? -ne 0 ]; then echo CAUGHT; else echo "SUCCESS (wrong)"; fi
~~~

~~~text الناتج
boom
SUCCESS (wrong)
~~~

الأمر فشل بـ 3، والسكربت قال نجاح. ده اللي كان بيحصل كل يوم في المشروع الأصلي.

جربت السكربت المصلّح على Mongo 8 حقيقي: container اسمه [[teach-real03-myapp-mongodb]] (بدل [[myapp-mongodb]]) فيه قاعدة [[myapp]] و collection [[users]] فيها ٣ documents، وشغّلته من Git Bash على ويندوز، والمسارات [[/opt]] و [[/var]] بدّلتها بفولدرات تجربة.

---

## ١. الإعدادات

### [[# cron: 0 3 * * * /opt/myapp/backup_mongodb.sh]]

تعليق بيقولك تربطه إزاي: الدقيقة 0، الساعة 3، كل يوم.

### [[set -euo pipefail]]

[[-e]] أي فشل يوقف، [[-u]] متغير مش معرّف = خطأ، و [[-o pipefail]] اللي شفناه فوق.

### [[set -a; . /opt/myapp/backup.env; set +a]]

[[.]] يقرا الملف وينفّذه، و [[set -a]] يعمل export لكل متغير. الملف فيه سطرين:

~~~text backup.env
MONGO_USER=root
MONGO_PASS=s3cret-pass
~~~

الباسورد في ملف لوحده بصلاحية [[600]] (صاحبه بس يقرا ويكتب)، مش جوه السكربت اللي على git.

### المتغيرات

| السطر | معناه |
|---|---|
| [[BACKUP_DIR=/var/backups/myapp]] | فين النسخ |
| [[LOG_FILE=/var/log/myapp_backup.log]] | فين اللوج |
| [[RETENTION_DAYS=30]] | نحتفظ كام يوم |
| [[FILE="$BACKUP_DIR/myapp_$(date +%F_%H-%M).archive.gz"]] | [[%F]] التاريخ و [[%H-%M]] الساعة والدقيقة: [[myapp_2026-10-07_19-15.archive.gz]] |

### [[log() { echo "[$(date '+%F %T')] $1" | tee -a "$LOG_FILE"; }]]

دالة اسمها [[log]]. [[$1]] أول حاجة تتبعتلها، و [[%T]] الوقت [[19:15:03]]. و [[tee -a]] ([[-a]] = append) يطبع على الشاشة ويضيف للّوج. هنا الـ pipe مع tee آمن، لأن [[echo]] مش هيفشل.

### [[mkdir -p "$BACKUP_DIR"]]

[[-p]]: اعمل الفولدر واللي فوقه لو مش موجودين، ومتطلعش خطأ لو موجود.

---

## ٢. الـ dump: الـ [[if]] الطويل

~~~bash
if ! docker exec -e MONGO_USER -e MONGO_PASS myapp-mongodb sh -c \
    'mongodump -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --db myapp --archive --gzip' \
    > "$FILE" 2>> "$LOG_FILE"; then
  log "ERROR: mongodump failed"; rm -f "$FILE"; exit 1
fi
~~~

ده أمر واحد على ٣ سطور ([[\]] = مكمّل تحت). نفكّه من جوه لبرة:

### جوه: [[mongodump ...]]

| الجزء | معناه |
|---|---|
| [[-u "$MONGO_USER" -p "$MONGO_PASS"]] | اليوزر والباسورد |
| [[--authenticationDatabase admin]] | اليوزر ده متعرّف في قاعدة admin |
| [[--db myapp]] | خد القاعدة دي بس |
| [[--archive]] | كل الـ collections في ملف واحد على stdout، بدل فولدر فيه ملفات |
| [[--gzip]] | مضغوط |

### [[sh -c '...']] والـ single quotes

الأمر ده بيتنفّذ **جوه** الـ container. الـ single quotes معناها إن bash اللي على السيرفر مش هيفك [[$MONGO_PASS]]، فبيوصل للـ container زي ما هو، والـ [[sh]] اللي جوه هو اللي يفكه.

### [[docker exec -e MONGO_USER -e MONGO_PASS myapp-mongodb]]

[[-e NAME]] من غير [[=value]] معناها «خد قيمة المتغير ده من البيئة اللي أنا فيها وابعتها للـ container». فالقيم جت من [[backup.env]] ووصلت لـ [[sh]] اللي جوه، والباسورد مش مكتوب في السكربت.

### [[> "$FILE" 2>> "$LOG_FILE"]]

[[>]] الـ stdout (الأرشيف المضغوط) يتكتب في الملف على السيرفر. و [[2>>]] الـ stderr (رقم 2) يتضاف للّوج. mongodump بيكتب رسايل التقدم على stderr، فدخلت اللوج:

~~~text myapp_backup.log
[2026-10-07 19:15:03] start: ./backups/myapp_2026-10-07_19-15.archive.gz
2026-10-07T16:15:04.154+0000	writing $__btmyapp.users$__bt to $__btarchive on stdout$__bt
2026-10-07T16:15:04.168+0000	done dumping $__btmyapp.users$__bt (3 documents)
[2026-10-07 19:15:04] ok: 1.0K
[2026-10-07 19:15:04] kept: 1 backups
~~~

(الوقت اللي جوه مكتوب بـ UTC [[+0000]]، والـ [[log]] بتاعنا بوقت السيرفر، فالفرق ٣ ساعات.)

### [[if ! ...; then ... fi]]

[[if]] بيشغّل الأمر ويبص على الـ exit code بتاعه **هو** (مفيش pipe هنا خالص). و [[!]] بتعكس: «لو فشل». جوه:

- [[log "ERROR: mongodump failed"]]
- [[rm -f "$FILE"]]: امسح الملف الناقص ([[-f]] متشتكيش لو مش موجود)، عشان ميتحسبش نسخة.
- [[exit 1]]: اخرج بفشل، فـ cron أو أي مراقبة تعرف.

جربت أوقف الـ container وأشغّل السكربت:

~~~text الناتج
[2026-10-07 19:17:24] start: .../myapp_2026-10-07_19-17.archive.gz
Error response from daemon: container 723af959... is not running
[2026-10-07 19:17:24] ERROR: mongodump failed
~~~

exit 1، والملف الفاضي اتمسح (مش في [[ls]]).

---

## ٣. النجاح والتنضيف

### [[log "ok: $(du -h "$FILE" | cut -f1)"]]

حجم الملف ([[du -h]] بوحدات مقروءة، [[cut -f1]] أول عمود): [[ok: 1.0K]].

### [[find "$BACKUP_DIR" -name 'myapp_*.archive.gz' -mtime +"$RETENTION_DAYS" -delete]]

| الجزء | معناه |
|---|---|
| [[find "$BACKUP_DIR"]] | دوّر في الفولدر ده |
| [[-name 'myapp_*.archive.gz']] | الملفات اللي اسمها كده بس |
| [[-mtime +30]] | آخر تعديل من أكتر من ٣٠ يوم كامل |
| [[-delete]] | امسحها |

حطيت ملفين قديمين بـ [[touch -d]] (بيغيّر تاريخ الملف): واحد ٤٨ يوم وواحد ١٧ يوم. بعد التشغيل التاني:

~~~text ls backups
myapp_2026-09-20_03-00.archive.gz
myapp_2026-10-07_19-15.archive.gz
myapp_2026-10-07_19-16.archive.gz
~~~

بتاع ٤٨ يوم اتمسح، وبتاع ١٧ يوم فضل.

### [[log "kept: $(ls "$BACKUP_DIR"/myapp_*.archive.gz | wc -l) backups"]]

[[ls]] بيطبع كل ملف في سطر لما الناتج رايح لـ pipe، و [[wc -l]] بيعد السطور: [[kept: 3 backups]].

---

## ٤. الاسترجاع (التعليق اللي تحت)

~~~bash
docker exec -i -e MONGO_USER -e MONGO_PASS myapp-mongodb sh -c 'mongorestore -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --archive --gzip --drop' < FILE
~~~

[[-i]] (interactive) يخلي الـ stdin بتاع السيرفر يوصل للـ container، و [[< FILE]] يبعت الملف عليه. [[--drop]] امسح كل collection قبل ما ترجّعها. و [[-e MONGO_USER -e MONGO_PASS]] هنا كمان (اقرا [[backup.env]] الأول بـ [[set -a]]). النسخة القديمة من التعليق كانت من غيرهم، فالمتغيرين بيوصلوا فاضيين: جربتها وطلعت [[(AuthenticationFailed) Authentication failed.]]، لأن image Mongo مفيهاش متغير اسمه [[MONGO_USER]]. مسحت ٢ من الـ ٣ documents ورجّعت:

~~~text الناتج
dropping collection $__btmyapp.users$__bt before restoring
restoring $__btmyapp.users$__bt from $__btarchive on stdin$__bt
finished restoring $__btmyapp.users$__bt (3 documents, 0 failures)
3 document(s) restored successfully. 0 document(s) failed to restore.
~~~

و [[countDocuments()]] رجع [[3]].

---

## الخلاصة

| الحاجة | إزاي |
|---|---|
| الفشل ميختفيش | [[set -o pipefail]]، والأحسن مفيش pipe: [[if ! cmd > file]] |
| الباسورد | ملف [[backup.env]] بصلاحية 600، و [[docker exec -e NAME]] من غير قيمة |
| ملف واحد مضغوط | [[mongodump --archive --gzip > FILE]] |
| الأخطاء في اللوج | [[2>> "$LOG_FILE"]] |
| ملف ناقص ميتحسبش | [[rm -f "$FILE"; exit 1]] |
| القديم | [[find -mtime +30 -delete]] |
| الاسترجاع | [[docker exec -i ... mongorestore --archive --gzip --drop < FILE]] |`,
          lines: [
            "وقّف عند أي خطأ، وأي أمر في pipe يفشل يفشّل الكل.",
            "اقرا المستخدم والباسورد من ملف بصلاحية 600.",
            "فين الباك أب.",
            "فين اللوج.",
            "عدد الأيام اللي هنحتفظ بيها.",
            "اسم الملف بالتاريخ والساعة.",
            "دالة تكتب سطر بالوقت على الشاشة وفي اللوج.",
            "اعمل الفولدر لو مش موجود.",
            "سجّل البداية.",
            "لو mongodump جوه الـ container فشل...",
            "...الباك أب كله ملف واحد مضغوط على stdout...",
            "...يتكتب على السيرفر، والأخطاء للّوج:",
            "سجّل الخطأ وامسح الملف الناقص واخرج بـ 1.",
            "قفلة الـ if.",
            "سجّل النجاح بالحجم.",
            "امسح النسخ الأقدم من ٣٠ يوم.",
            "سجّل عدد النسخ الموجودة."
          ],
          sol: R`جربت الفرق: [[false | tee x.log; echo $?]] طبع [[0]]، و [[set -o pipefail; false | tee x.log; echo $?]] طبع [[1]]. من غير pipefail، خطوة فاشلة قبل [[|]] بتبان ناجحة.

السكربت على Mongo 8 شغال: اللوج طلّع [[start: .../myapp_2026-09-30_08-06.archive.gz]] وبعدين [[ok: 4.0K]] و [[kept: 1 backups]]. بعد [[docker stop myapp-mongodb]] وتشغيله تاني: [[ERROR: mongodump failed]] و exit [[1]]، واللوج فيه سبب الخطأ ([[container ... is not running]]).

ملاحظتين من التجربة: لو شغّلته قبل ما Mongo يخلص أول تشغيل، بيفشل بـ [[Authentication failed]] لأن اليوزر root لسه بيتعمل، فاستنى ping ينجح الأول. واسم الملف بالدقيقة، فلو نسخة فشلت في نفس دقيقة نسخة ناجحة، [[rm -f "$FILE"]] بيمسح الناجحة. ده مش هيحصل في cron يومي، بس خد بالك وانت بتجرّب.`
        },
        {
          cmd: "backup.bat",
          title: "زرار يرفع نسخة احتياطية على GitHub بدبل كليك",
          desc: R`ملف bat لحد مش مبرمج: دبل كليك، يعمل commit بالتاريخ ويرفع، ويسيب الشباك مفتوح ثواني يقرا النتيجة. عربي صح بـ [[chcp 65001]]، وبيشيك فيه تغييرات ولا لأ بـ [[git diff --cached --quiet]].

والنسخة دي بتشيك الأول إن ملف البيانات مش في .gitignore، لأن ده بالظبط اللي حصل في المشروع الأصلي: السكربت كان «شغال» شهور ومش بيرفع ولا نسخة.`,
          example: R`@echo off
chcp 65001 >nul
cd /d "%~dp0"
git check-ignore -q data.json
if %errorlevel%==0 (
  echo تحذير: data.json في .gitignore، يعني النسخة مش هتترفع!
  pause
  exit /b 1
)
git add -A
git diff --cached --quiet
if %errorlevel%==0 (
  echo مفيش تغييرات جديدة للرفع.
  timeout /t 4 >nul
  exit /b 0
)
git commit -m "backup %date% %time%"
git pull --rebase origin main
git push origin main
if %errorlevel%==0 (echo تم الرفع بنجاح.) else (echo حصل خطأ، اتأكد من النت.)
timeout /t 5 >nul`,
          try: "في ريبو private تجريبي حط data.json والسكربت، وشغّله بدبل كليك. بعدين ضيف data.json لـ .gitignore وشغّله تاني وشوف التحذير. وفي ريبو موجود اسأل: [[git check-ignore -v data.json]].",
          flag: "script",
          deep: {
            why: "برنامج صغير لمحل أو عيادة شايل بيانات في ملف JSON، وصاحبه محتاج يعمل نسخة احتياطية من غير ما يفتح ترمنال. GitHub private ببلاش وفيه تاريخ لكل نسخة.",
            how: R`[[chcp 65001]] بيحوّل الـ console لـ UTF-8 فالعربي يطلع صح (والملف نفسه لازم يتحفظ UTF-8 من غير BOM). [[%~dp0]] فولدر الملف نفسه، و [[/d]] بيغيّر الدرايف كمان.

[[git check-ignore -q data.json]] بيرجع 0 لو الملف متجاهل. هنا 0 معناها مشكلة.

[[git pull --rebase]] بعد الـ commit وقبل الرفع، عشان لو فيه نسخة اترفعت من جهاز تاني، الـ push ميترفضش. ولازم بعد الـ commit: قبله الملف متعدّل ومش متسجّل، و git بيرفض [[pull --rebase]] بـ [[cannot pull with rebase: You have unstaged changes]].

[[git diff --cached --quiet]] بيرجع 0 لو مفيش فرق في اللي اتعمله add. يعني 0 هنا «مفيش جديد»، فنخرج بهدوء بدل commit فاضي يفشل.

[[%errorlevel%]] هو exit code آخر أمر، زي [[$?]] في bash. و [[timeout /t 5 >nul]] بيستنى ٥ ثواني من غير رسالة «اضغط أي زرار».`,
            when: "نسخ احتياطية بسيطة لبيانات صغيرة (مش قواعد بيانات كبيرة). أوامر CMD في تاب CMD، و git في تاب Git.",
            mistakes: R`في مشروع حقيقي كانت ملفات البيانات والنسخ ([[data.json]] و [[backups/data-*.json]]) في .gitignore. السكربت كان بيقول «تم الرفع بنجاح» كل مرة، وهو بيرفع الكود بس. محدش اكتشف ده غير لما بصّوا على الريبو. اتأكد بعينك إن الملف اللي عايز تحميه موجود على GitHub.

وكان فيه [[cd /d]] لمسار ثابت على جهاز واحد بدل [[%~dp0]]. ومفيش [[git pull]] قبل الـ push، فالرفع يترفض لو فيه جهاز تاني رفع قبله.

ولو هترفع بيانات عملاء على GitHub، الريبو لازم يبقى private، والأحسن أصلًا متتحطش في git. وشكل [[%date%]] و [[%time%]] بيتغيّر حسب لغة ويندوز.`
          },
          teach: R`## الأول: ٤ مراحل

ملف [[.bat]] هو سكربت لـ CMD (الترمنال القديم بتاع ويندوز)، ودبل كليك عليه بيفتح شباك CMD ويشغّله سطر سطر. السكربت ده بيعمل ٤ حاجات: يجهّز الشباك، يتأكد إن ملف البيانات مش متجاهل، يشوف فيه جديد ولا لأ، ويعمل commit ويرفع.

جربته على ويندوز 11 بـ [[cmd /c backup.bat]] في ريبو تجربة، و [[origin]] ريبو bare على نفس الجهاز بدل GitHub (نفس أوامر git بالظبط)، وريبو تاني اسمه [[laptop]] بيرفع على نفس الـ origin عشان أجرّب «جهاز تاني رفع قبلي».

---

## ١. التجهيز

### [[@echo off]]

CMD افتراضيًا بيطبع كل أمر قبل ما ينفّذه. [[echo off]] بيقفل ده، و [[@]] قبلها بيخفي السطر ده نفسه. فالشباك يطلع فيه الرسايل بس.

### [[chcp 65001 >nul]]

[[chcp]] (change code page) بيغيّر الترميز اللي الشباك بيعرض بيه، و [[65001]] رقم UTF-8. من غيره العربي اللي في الملف يطلع رموز. و [[>nul]] يرمي رسالة [[Active code page: 65001]] (nul = مكان بيبلع أي حاجة). ولازم الملف نفسه يتحفظ UTF-8.

### [[cd /d "%~dp0"]]

[[%0]] اسم السكربت، و [[~dp]] حروف بتقطع منه: [[d]] الدرايف و [[p]] المسار. يعني [[%~dp0]] = فولدر الملف نفسه، بـ [[\]] في الآخر. و [[/d]] بيغيّر الدرايف كمان لو الملف على [[D:]] والشباك فاتح على [[C:]]. فالسكربت يشتغل صح مهما فتحته منين. جربته وأنا واقف في فولدر تاني، والـ git اشتغل على ريبو الملف.

---

## ٢. ملف البيانات متجاهل؟

~~~text
git check-ignore -q data.json
if %errorlevel%==0 (
  echo تحذير: data.json في .gitignore، يعني النسخة مش هتترفع!
  pause
  exit /b 1
)
~~~

[[git check-ignore]] بيسأل «الملف ده متجاهل؟»، و [[-q]] (quiet) من غير طباعة، الإجابة في الـ exit code بس. [[-v]] بدلها بيقولك السبب. جربت في ريبو جديد:

~~~text الناتج
git check-ignore -v data.json                    (من غير قاعدة)  → ولا حاجة، exit 1
git check-ignore -v data.json                    (بعد القاعدة)   → .gitignore:1:data.json	data.json   exit 0
~~~

السطر بيقولك: الملف [[.gitignore]]، السطر [[1]]، القاعدة [[data.json]]. يعني 0 هنا = مشكلة.

[[%errorlevel%]] = exit code آخر أمر (زي [[$?]] في bash)، و [[==]] مقارنة. [[( ... )]] بلوك سطور. [[pause]] يطبع [[Press any key to continue . . .]] ويستنى، عشان الشباك ميتقفلش قبل ما صاحب المحل يقرا. و [[exit /b 1]] ([[/b]] = اخرج من السكربت بس مش من CMD كله) بكود فشل. ده اللي طلع:

~~~text الناتج
تحذير: data.json في .gitignore، يعني النسخة مش هتترفع!
Press any key to continue . . .
~~~

> تفصيلة: لو [[data.json]] كان **متسجّل في git قبل كده** وبعدين حد ضافه لـ [[.gitignore]]، [[check-ignore]] بيرجّع 1 (مش متجاهل)، لأن git بيكمّل يتابع الملفات المتسجّلة مهما قال [[.gitignore]]. وده صح، لأن تعديلاته فعلًا بتترفع. ولو عايز تشوف القاعدة بس: [[git check-ignore -v --no-index data.json]].

---

## ٣. فيه جديد؟

~~~text
git add -A
git diff --cached --quiet
if %errorlevel%==0 ( ... exit /b 0 )
~~~

[[git add -A]] (A = all): جهّز كل التغييرات، ملفات جديدة ومتعدّلة وممسوحة. [[git diff --cached]] بيقارن اللي اتجهّز بآخر commit، و [[--quiet]] من غير طباعة وexit 1 لو فيه فرق، 0 لو مفيش. فـ 0 هنا = «مفيش جديد»:

~~~text الناتج (تشغيل تاني من غير تعديل)
مفيش تغييرات جديدة للرفع.
~~~

وبيخرج بـ [[exit /b 0]] (نجاح)، بدل [[git commit]] اللي كان هيفشل بـ [[nothing to commit]].

[[timeout /t 4 >nul]]: استنى ٤ ثواني، و [[>nul]] يخفي العدّاد. (لو شغّلته من برنامج تاني مش بدبل كليك، [[timeout]] بيطبع [[ERROR: Input redirection is not supported]] ويكمّل على طول. من الشباك العادي بيستنى.)

---

## ٤. commit وسحب ورفع

### [[git commit -m "backup %date% %time%"]]

[[%date%]] و [[%time%]] متغيرات جاهزة في CMD. عندي (ويندوز إنجليزي، شكل أمريكي):

~~~text الناتج
[main 6ac9c1e] backup Wed 10/07/2026 19:21:13.47
 2 files changed, 2 insertions(+), 2 deletions(-)
~~~

شكلهم بيتغيّر حسب إعدادات اللغة والمنطقة في ويندوز.

### [[git pull --rebase origin main]]

[[pull]] = هات اللي على [[origin]] في فرع [[main]]. و [[--rebase]]: لو فيه commits جديدة هناك، حط الـ commit بتاعي **فوقهم** بدل ما تعمل merge commit. قبل التشغيل رفعت commit من ريبو [[laptop]]، فطلع:

~~~text الناتج
   4ba01f0..ee4bd4c  main       -> origin/main
Rebasing (1/1)
Successfully rebased and updated refs/heads/main.
~~~

**ليه بعد الـ commit مش قبل الـ add؟** النسخة الأولى من الدرس كانت عاملة [[pull]] في الأول، وجربتها والملف متعدّل:

~~~text الناتج
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
~~~

git بيرفض rebase والملفات متعدّلة ومش متسجّلة، والسكربت كان بيكمّل عادي. يعني الـ pull كان بيفشل كل مرة فيها تغيير، ولو جهاز تاني كان رفع قبلك الـ push هيترفض. فاتنقل بعد الـ commit.

### [[git push origin main]] والنتيجة

~~~text الناتج
   ee4bd4c..f0aa289  main -> main
تم الرفع بنجاح.
~~~

وتاريخ الـ origin بقى:

~~~text git log --oneline
f0aa289 backup Wed 10/07/2026 19:21:13.47
ee4bd4c laptop backup
4ba01f0 backup Wed 10/07/2026 19:20:38.36
7685e18 init
~~~

نسخة اللابتوب في النص، ونسختي فوقها، من غير merge.

[[if %errorlevel%==0 (echo ...) else (echo ...)]]: لو الـ push نجح «تم»، وإلا «حصل خطأ». و [[timeout /t 5]] يسيب الشباك مفتوح ٥ ثواني.

---

## الخلاصة

| الخطوة | الأمر | 0 معناها |
|---|---|---|
| متجاهل؟ | [[git check-ignore -q data.json]] | متجاهل = وقّف وحذّر |
| فيه جديد؟ | [[git add -A]] + [[git diff --cached --quiet]] | مفيش جديد = اخرج بهدوء |
| سجّل | [[git commit -m "backup %date% %time%"]] | |
| هات اللي اترفع | [[git pull --rebase origin main]] بعد الـ commit | |
| ارفع | [[git push origin main]] | نجح |

وفي CMD: [[%errorlevel%]] = exit code، و [[%~dp0]] = فولدر الملف، و [[exit /b]] = اخرج من السكربت بس.`,
          lines: [
            "متعرضش الأوامر نفسها.",
            "UTF-8 عشان العربي.",
            "ادخل فولدر الملف.",
            "data.json متجاهل؟",
            "لو أيوه:",
            "حذّر.",
            "استنى المستخدم يقرا.",
            "واخرج بفشل.",
            "قفلة الـ if.",
            "جهّز كل التغييرات.",
            "فيه فرق؟",
            "لو مفيش:",
            "قول كده.",
            "استنى ٤ ثواني.",
            "واخرج بنجاح.",
            "قفلة الـ if.",
            "commit بالتاريخ والوقت.",
            "هات أي نسخة اترفعت من جهاز تاني، وحط الـ commit بتاعك فوقها.",
            "ارفع.",
            "نجح ولا لأ.",
            "استنى ٥ ثواني قبل ما الشباك يقفل."
          ],
          sol: R`أول تشغيل بعد تعديل [[data.json]]: commit باسم زي [[backup Wed 10/07/2026 19:21:13.47]] (الشكل حسب لغة ويندوز)، وبعدين [[git pull --rebase]] و [[git push]]، وفي الآخر [[تم الرفع بنجاح.]]. ولو مفيش تغيير، [[git diff --cached --quiet]] بيرجّع 0 فبيطبع [[مفيش تغييرات جديدة للرفع.]] ويقفل.

بعد ما تضيف [[data.json]] لـ [[.gitignore]]، بيطبع التحذير ويستنى. جربت [[git check-ignore -v data.json]]: من غير القاعدة طبع ولا حاجة وexit [[1]]، ومعاها طبع [[.gitignore:1:data.json	data.json]] وexit [[0]]. السطر ده بيقولك بالظبط أنهي ملف وأنهي سطر عامل ignore.

لو العربي طالع رموز غريبة، [[chcp 65001]] محتاج الملف يتحفظ UTF-8. ولو الـ push قال [[rejected]]، فيه تعديل على GitHub من جهاز تاني والـ [[pull --rebase]] فشل بسبب conflict، ساعتها حلّه بإيدك. (جربت الملف نفسه بـ [[cmd /c]] على ويندوز 11 مع origin محلي بدل GitHub.)`
        }
      ]
    }
]);
