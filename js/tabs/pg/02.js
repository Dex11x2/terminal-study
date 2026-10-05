// تكملة تاب pg: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pg/01.js (شرح حقول الدرس في أوله)
MORE("pg", [
    {
      t: "الإنتاج: باك أب و migrations و Supabase",
      l: 3,
      n: "الداتا أغلى من الكود. الباك أب اللي متجرّبش مش باك أب",
      items: [
        {
          cmd: "pg_dump بعمق",
          title: "schema بس، أو data بس، أو جدول",
          desc: "مش دايمًا محتاج القاعدة كلها. [[-s]] الهيكل بس، و [[-a]] البيانات بس، و [[-t]] جدول معين، و [[--exclude-table]] من غير جدول اللوجات الضخم. وصيغة [[-Fc]] بتسمح ترجّع أجزاء.",
          example: R`pg_dump -U postgres -d app -s > schema.sql
pg_dump -U postgres -d app -a -t users > users_data.sql
pg_dump -U postgres -d app -Fc --exclude-table='*_logs' -f app.dump
pg_restore -l app.dump | head -20
pg_restore -U postgres -d app_copy -t users app.dump
pg_restore -U postgres -d app --clean --if-exists --no-owner app.dump`,
          try: "اعمل dump بـ -Fc، واعرض محتواه بـ [[pg_restore -l]]، ورجّع جدول واحد بس في قاعدة تجربة.",
          flag: "danger",
          deep: {
            why: "الباك أب الكامل مش دايمًا اللي محتاجه. عايز الهيكل بس لتجهيز قاعدة اختبار، أو جدول واحد اتمسح بالغلط، أو كل حاجة ما عدا جدول لوجات ٢٠ جيجا.",
            how: R`[[-s]] (schema-only) بيطلّع CREATE TABLE و indexes و constraints من غير بيانات. [[-a]] (data-only) العكس. [[-t]] جدول معين، وممكن تكرره أو تستخدم pattern. [[--exclude-table]] العكس.

الصيغتين: النص العادي ([[> file.sql]]) بتقراه وترجّعه بـ psql. [[-Fc]] (custom) ملف مضغوط بفهرس، وده الأقوى: [[pg_restore -l]] بيعرض الفهرس، و [[-t]] في pg_restore بيرجّع جدول واحد من dump كامل، و [[-j 4]] بيرجّع بأربع عمليات متوازية.

[[--clean --if-exists]] في pg_restore: امسح الجداول الموجودة الأول من غير error لو مش موجودة. لازمة لما ترجّع على قاعدة فيها بيانات.

[[--no-owner]]: متحاولش تخلي الجداول ملك نفس اليوزر اللي في المصدر. لازمة لما اليوزرز مختلفين بين السيرفرين (وده دايمًا مع Supabase).

pg_dump بياخد snapshot متماسك حتى لو القاعدة شغالة ومفيش قفل.`,
            when: "-s لبيئات الاختبار. -t لاسترجاع جدول. -Fc للباك أب الدوري.",
            mistakes: "نسخة pg_dump أقدم من السيرفر فيرفض. ونسيان --no-owner عند الترجيع على سيرفر تاني فيطلع errors صلاحيات."
          },
          lines: [
            "الهيكل بس.",
            "بيانات جدول واحد بس.",
            "كل حاجة ما عدا جداول اللوجات، بصيغة مضغوطة.",
            "فهرس اللي جوه الـ dump.",
            "رجّع جدول واحد بس منه.",
            "خطر: رجّع كله فوق قاعدة فيها بيانات (بيمسح الموجود الأول)، ومتحاولش تطابق المالك. خد dump جديد قبلها."
          ],
          sol: R`[[pg_restore -l app.dump]] بيطبع الـ header ([[Format: CUSTOM]] و [[Dumped from database version: 16.13]]) وبعده قايمة فيها سطور زي [[TABLE public users postgres]] و [[TABLE DATA public users postgres]] و [[CONSTRAINT public users users_pkey postgres]] و [[FK CONSTRAINT public orders orders_user_id_fkey postgres]].

[[pg_restore -d app_copy -t users app.dump]] بيرجّع الجدول والداتا ([[SELECT count(*)]] زي الأصل). بس لو عملت [[\d users]] هتلاقي إن الجدول من غير primary key ولا unique ولا default للـ id، لأن [[-t]] بيرجّع الجدول وداتاه بس، مش الـ constraints والـ indexes والـ sequence. دي المفاجأة اللي لازم تعرفها قبل ما تحتاجها في طوارئ.

لو عايز كل حاجة تخص الجدول: [[pg_restore -l app.dump > list.txt]]، سيب السطور اللي فيها users وامسح الباقي، و [[pg_restore -L list.txt -d app_copy app.dump]]. وتذكّر إن [[app_copy]] لازم تبقى موجودة الأول بـ createdb.`,
          solCode: R`pg_dump -U postgres -d app -Fc -f app.dump
pg_restore -l app.dump | head -30
createdb -U postgres app_copy
pg_restore -U postgres -d app_copy -t users app.dump
psql -U postgres -d app_copy -c "SELECT count(*) FROM users" -c "\d users"`
        },
        {
          cmd: "ترجيع الباك أب",
          title: "جرّبه قبل ما تحتاجه",
          desc: R`باك أب عمرك ما رجّعته مش مضمون: ممكن يكون ناقص أو مكسور، وهتكتشف ده يوم ما تحتاجه. الاختبار: قاعدة جديدة فاضية، ترجّع فيها الباك أب، وتقارن بالأصل.

[[createdb -U postgres app_restore_test]] بيعمل قاعدة فاضية جديدة ([[-U]] اليوزر اللي بيتصل). [[pg_restore -d app_restore_test]] بيرجّع ملف الـ dump (المعمول بـ [[-Fc]]) جواها، و [[--no-owner]] بيتجاهل مين كان صاحب الجداول في الأصل، فميطلعش error لو اليوزر ده مش موجود هنا. بعدين [[psql -c]] بينفّذ استعلام واحد ويخرج: [[count(*)]] على جدول مهم في النسخة وفي الأصل، ولو الأرقام قريبة (بفرق الصفوف اللي اتضافت بعد الباك أب) يبقى سليم. و [[dropdb]] بيمسح قاعدة التجربة في الآخر.

خد بالك تكتب اسم قاعدة التجربة صح في [[dropdb]] و [[pg_restore]]: لو كتبت [[app]] بالغلط هتلمس قاعدة الإنتاج.`,
          example: R`createdb -U postgres app_restore_test
pg_restore -U postgres -d app_restore_test --no-owner app.dump
psql -U postgres -d app_restore_test -c "SELECT count(*) FROM users;"
psql -U postgres -d app -c "SELECT count(*) FROM users;"
dropdb -U postgres app_restore_test`,
          try: "حط الأوامر دي في سكربت يشتغل أسبوعيًا ويبعتلك رسالة لو الأعداد مختلفة.",
          deep: {
            why: "في يوم الكارثة مش وقت ما تكتشف إن الملف فاضي، أو النسخة مش متوافقة، أو الترجيع بياخد ٦ ساعات.",
            how: R`الاختبار بسيط: قاعدة جديدة فاضية، pg_restore فيها، وقارن. [[count(*)]] على أهم جدولين بين الأصل والنسخة. لو الأرقام متطابقة (بفارق الصفوف الجديدة من وقت الـ dump)، الباك أب سليم.

ده كمان بيقيس وقت الترجيع (RTO): لو أخد ساعة، تعرف إن الموقع هيقع ساعة في الكارثة، وتقرر ده مقبول ولا لأ.

الأتمتة: سكربت أسبوعي بيعمل الخطوات دي ويبعتلك النتيجة (أو بيفشل بصوت عالي في CI). ده اللي الفرق بين «عندي باك أب» و«عندي باك أب شغال».

وجرّب سيناريو استرجاع جدول واحد كمان، لأن ده الأشهر فعليًا: حد عمل DELETE من غير WHERE على جدول واحد.

الباك أب على نفس السيرفر مش باك أب: ديسك يبوظ أو اختراق والاتنين بيروحوا. نسخة على S3 أو Backblaze أو سيرفر تاني.`,
            when: "أسبوعيًا أوتوماتيك. وقبل أي عملية كبيرة على القاعدة.",
            mistakes: "تجرّب الترجيع على قاعدة الإنتاج نفسها بـ --clean."
          },
          lines: [
            "قاعدة فاضية للاختبار.",
            "رجّع فيها.",
            "عدّ الصفوف في النسخة.",
            "وفي الأصل. لازم يطابقوا.",
            "امسح قاعدة الاختبار."
          ],
          sol: R`الحل سكربت بيعمل قاعدة مؤقتة، ويرجّع آخر dump، ويقارن العدد بالأصل، ويبعت رسالة لو مختلفين، ويمسح القاعدة المؤقتة في كل الحالات بـ [[trap]].

لما يشتغل وكله تمام يطبع [[restore ok: users 5 = 5]]. وأي فرق بسيط مقبول لو الموقع شغال والناس بتسجّل بين وقت الـ dump ووقت العد، فالمقارنة الأدق إنك تقارن بعدد متسجّل وقت الـ dump، أو تقبل فرق صغير.

الغلط الشائع: السكربت ينجح بس لأن [[pg_restore]] طبع errors وكمّل (مثلًا [[role "app_user" does not exist]]). عشان كده [[--exit-on-error]] و [[--no-owner]]، وبنقارن أعداد فعلية مش بنصدّق الـ exit code بس. وجدوله في cron الأسبوعي: [[0 4 * * 0 /home/deploy/restore-test.sh]].`,
          solCode: R`#!/usr/bin/env bash
set -euo pipefail
DUMP=$(ls -1t /home/deploy/backups/db/app-*.dump | head -1)
TMP=app_restore_test
trap 'dropdb -U postgres --if-exists "$TMP"' EXIT
createdb -U postgres "$TMP"
pg_restore -U postgres -d "$TMP" --no-owner --exit-on-error "$DUMP"
a=$(psql -U postgres -d "$TMP" -tAc "SELECT count(*) FROM users")
b=$(psql -U postgres -d app -tAc "SELECT count(*) FROM users")
if [ "$a" != "$b" ]; then
  curl -fsS -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d chat_id="$CHAT_ID" -d text="restore test: users $a != $b ($DUMP)"
  exit 1
fi
echo "restore ok: users $a = $b"`
        },
        {
          cmd: "سكربت migrations",
          title: "كل ملفات الـ migration بالترتيب ومرة واحدة بس",
          desc: R`من غير Prisma ولا أداة: سكربت بيلف على [[db/migrations/*.sql]] بالترتيب، ويسجّل كل ملف اتطبق في جدول [[schema_migrations]]، فيعدّي اللي اتطبق قبل كده. وكل ملف في transaction واحدة مع تسجيله، فلو فشل مفيش نص ملف.

و [[ON_ERROR_STOP]] مع [[set -e]] بيوقفوا عند أول فشل.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
: "$__{DATABASE_URL:?DATABASE_URL missing}"
PSQL=(psql "$DATABASE_URL" -X -q -v ON_ERROR_STOP=1)
"$__{PSQL[@]}" -c "CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())"
applied=0; skipped=0
for f in db/migrations/*.sql; do
  name=$(basename "$f")
  if [ -n "$("$__{PSQL[@]}" -tAc "SELECT 1 FROM schema_migrations WHERE name = '$name'")" ]; then
    skipped=$((skipped+1)); continue
  fi
  echo "--> $name"
  { cat "$f"; echo; echo "INSERT INTO schema_migrations (name) VALUES ('$name');"; } \
    | "$__{PSQL[@]}" --single-transaction -f -
  applied=$((applied+1))
done
echo "applied: $applied  skipped: $skipped"`,
          try: "في الـ lab اعمل ٣ ملفات [[001_]] و [[002_]] و [[003_]]، وشغّل السكربت مرتين: التانية كله skipped. بعدين حط error في ملف رابع وشوف إن الجدول بتاعه متعملش وإن اسمه مش في schema_migrations.",
          flag: "script",
          deep: {
            why: "النسخ واللصق في SQL editor ملف ملف بيتنسي فيه ملف، أو يتطبق مرتين، ومحدش عارف القاعدة دي عليها أنهي نسخة. السكربت بيخلي الإجابة في جدول.",
            how: R`[[: "$__{DATABASE_URL:?...}"]] بيوقف السكربت برسالة لو المتغير مش موجود. و [[PSQL=(...)]] array فيها الأمر بخياراته، و [[-X]] بيتجاهل [[~/.psqlrc]] عشان إعداداتك الشخصية متأثرش على السكربت.

الجدول [[schema_migrations]] فيه اسم كل ملف اتطبق ووقته. [[-tAc]] بيسأل «الملف ده اتطبق؟»؛ لو رجع 1 نعدّيه.

السطر اللي بين [[{ }]] بيبعت لـ psql الملف نفسه وبعده سطر INSERT باسمه، و [[-f -]] بيقرا من stdin. [[--single-transaction]] بيلف الاتنين في BEGIN و COMMIT: يا الملف كله والتسجيل، يا ولا حاجة.

الترتيب من الـ glob أبجدي، عشان كده الأسماء بأرقام بطول ثابت ([[001_]] مش [[1_]]، وإلا [[10_]] تيجي قبل [[2_]]).

استثناء: [[CREATE INDEX CONCURRENTLY]] مينفعش جوه transaction، فملف زي ده محتاج يتشغّل لوحده من غير [[--single-transaction]].`,
            when: "مشروع بـ SQL خام من غير ORM، أو Supabase من غير CLI، أو Makefile فيه [[make migrate]].",
            mistakes: "في مشروع حقيقي سكربت migrations كان بيبعت SQL لـ [[/rest/v1/rpc/exec]] بمفتاح service_role: الدالة دي مش موجودة في Supabase أصلًا، ولو حد عملها يبقى فتح تنفيذ أي SQL من REST لأي حد معاه المفتاح. وفي نفس المشروع مكانش فيه جدول بيسجّل اللي اتطبق، فملف ممكن يتطبق مرتين، والـ connection string اتقري بـ [[read]] من غير [[-s]] فالباسورد ظهر على الشاشة. وفي مشروع تاني لوب الـ migrations كان من غير transaction، فملف فشل في النص ساب نصه متطبق."
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "لازم DATABASE_URL يبقى موجود.",
            "أمر psql بخياراته مرة واحدة: وقف عند أول error، ومن غير psqlrc.",
            "جدول بيسجّل الملفات اللي اتطبقت (لو مش موجود).",
            "عدادات.",
            "لف على الملفات بالترتيب الأبجدي.",
            "اسم الملف من غير الفولدر.",
            "الملف ده اتطبق قبل كده؟",
            "عدّيه.",
            "نهاية الشرط.",
            "اطبع اسم الملف.",
            "الملف وبعده تسجيله في الجدول...",
            "...في transaction واحدة: الاتنين أو ولا حاجة.",
            "عدّ.",
            "نهاية اللوب.",
            "الملخص."
          ],
          sol: R`أول تشغيل بـ ٣ ملفات:

[[--> 001_a.sql]] و [[--> 002_b.sql]] و [[--> 003_a_name.sql]] وبعدين [[applied: 3  skipped: 0]]. التشغيل التاني: [[applied: 0  skipped: 3]] (ومعاه [[NOTICE: relation "schema_migrations" already exists, skipping]] ودي عادي).

بملف رابع فيه [[CREATE TABLE d]] وبعده [[SELECT * FROM nope]]: الناتج [[--> 004_bad.sql]] و [[ERROR:  relation "nope" does not exist]] والسكربت بيقف بـ exit code 3. و [[SELECT name FROM schema_migrations]] لسه فيه الـ ٣ بس، و [[SELECT to_regclass('d')]] بيرجّع فاضي (NULL)، يعني الجدول d متعملش رغم إنه قبل السطر الغلط. دا شغل [[--single-transaction]]: الملف والـ INSERT في schema_migrations يا ينجحوا مع بعض يا لأ.

لو لقيت الجدول d موجود، يبقى شلت [[--single-transaction]]. ولو لقيت 004 في schema_migrations، يبقى شلت [[ON_ERROR_STOP]] فـ psql كمّل بعد الـ error.`
        },
        {
          cmd: "Prisma migrate",
          title: "الـ schema بيتغير بأمان",
          desc: "الـ migrations ملفات SQL مرقّمة بتتطبق بالترتيب، وPrisma بيسجّل في جدول [[_prisma_migrations]] إيه اللي اتطبق. [[migrate dev]] على جهازك بيعمل الملف ويطبّقه. [[migrate deploy]] على السيرفر بيطبّق اللي لسه متطبقش بس، من غير ما يولّد حاجة.",
          example: R`npx prisma migrate dev --name add_orders_status
npx prisma migrate status
npx prisma migrate deploy
npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
npx prisma migrate resolve --applied 20260925103000_add_orders_status
npx prisma db pull`,
          try: "عدّل schema.prisma، وشغّل [[migrate dev]]، وافتح ملف SQL اللي اتولّد واقراه قبل ما تعمله commit.",
          deep: {
            why: "تغيير الـ schema بإيدك على السيرفر معناه في يوم ما جهازك والسيرفر والفريق هيبقوا على schemas مختلفة ومحدش عارف الفرق. الـ migrations بتخلي التغيير كود له تاريخ.",
            how: R`[[migrate dev]] على جهازك: بيقارن schema.prisma بحالة القاعدة، ويولّد ملف SQL في [[prisma/migrations/التاريخ_الاسم/migration.sql]]، ويطبّقه. ومن Prisma 7 مبقاش بيعمل generate لوحده: شغّل [[npx prisma generate]] بعده. اقرا الـ SQL المولّد دايمًا قبل commit: Prisma أحيانًا بيمسح عمود ويعمل واحد جديد بدل rename، وده بيضيّع بيانات.

[[migrate deploy]] على السيرفر (في CI أو قبل تشغيل التطبيق): بيبص في جدول [[_prisma_migrations]] يشوف إيه اتطبق، ويطبّق الباقي بالترتيب. مش بيولّد ولا بيسأل. ده الوحيد اللي يتشغّل على الإنتاج.

[[migrate status]] بيقولك فيه migrations لسه متطبقتش أو فيه واحدة فشلت في النص.

[[migrate diff]] بيطلّع SQL الفرق بين حاجتين، مفيد تشوف إيه اللي migrate dev هيعمله قبل ما يعمله.

[[migrate resolve]] لما migration فشلت في النص على الإنتاج: تصلّح بإيدك، وتقوله «اعتبرها اتطبقت».

[[db pull]] العكس: يقرا القاعدة ويكتب schema.prisma، لقاعدة موجودة قبل Prisma.`,
            when: "dev لكل تغيير على جهازك. deploy في pipeline الديبلوي قبل تشغيل النسخة الجديدة.",
            mistakes: "[[migrate dev]] على الإنتاج (ممكن يعمل reset). و [[migrate reset]] على أي حاجة غير جهازك: بيمسح القاعدة."
          },
          lines: [
            "ولّد migration من تغيير schema.prisma وطبّقها محليًا.",
            "إيه اللي اتطبق وإيه لأ.",
            "على السيرفر: طبّق اللي لسه متطبقش، من غير توليد.",
            "SQL الفرق بين القاعدة والـ schema، من غير تطبيق.",
            "لو migration فشلت في النص وصلّحتها بإيدك: اعتبرها اتطبقت.",
            "العكس: اقرا القاعدة واكتب الـ schema."
          ],
          sol: R`لما تضيف مثلًا [[status String @default("pending")]] وتشغّل [[npx prisma migrate dev --name add_orders_status]]، هيقولك إنه عمل فولدر زي [[prisma/migrations/20260930045902_add_orders_status/migration.sql]] و [[Your database is now in sync with your schema.]]. والملف فيه:

[[ALTER TABLE "Order" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'pending';]] وده آمن.

الحالة اللي لازم تتعلم تمسكها: غيّر اسم عمود من [[amount]] لـ [[total]]. Prisma مش بيعرف إنه rename، فبيولّد [[DROP COLUMN "amount"]] و [[ADD COLUMN "total" INTEGER NOT NULL]]، وفي أول الملف تحذير [[All the data in the column will be lost]]. استخدم [[--create-only]] وعدّل الملف لـ [[ALTER TABLE "Order" RENAME COLUMN "amount" TO "total";]] قبل ما تطبّقه. وعلى جدول فيه داتا، [[ADD COLUMN ... NOT NULL]] من غير default هيفشل. و [[npx prisma migrate status]] في الآخر المفروض يقول [[Database schema is up to date!]].`
        },
        {
          cmd: "تغييرات آمنة في الإنتاج",
          title: "ADD COLUMN من غير ما توقّع الموقع",
          desc: "بعض تعديلات الـ schema بتقفل الجدول لحد ما تخلص، وعلى جدول كبير ده دقايق الموقع فيها واقف. [[lock_timeout]] بيخلي الأمر يفشل بدل ما يستنى، و [[CONCURRENTLY]] بيبني index من غير قفل، والقيم الافتراضية الثابتة سريعة من Postgres 11.",
          example: R`SET lock_timeout = '3s';
ALTER TABLE orders ADD COLUMN notes text;
ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'pending';
CREATE INDEX CONCURRENTLY idx_orders_notes ON orders (notes);
ALTER TABLE orders ADD CONSTRAINT chk_amount CHECK (amount >= 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT chk_amount;`,
          try: "على جدول فيه مليون صف، قارن وقت ADD COLUMN بـ DEFAULT ثابت مقابل DEFAULT clock_timestamp(): الأول لحظي والتاني بيعيد كتابة الجدول (now() لحظية كمان لأنها بتتحسب مرة واحدة).",
          flag: "script",
          deep: {
            why: "[[ALTER TABLE]] على جدول فيه ١٠ مليون صف ممكن يقفله ٥ دقايق، وكل طلب على الموقع يستنى، والاتصالات تتراكم، والموقع يقع. الـ migration نفسها صح، التوقيت والطريقة هما المشكلة.",
            how: R`[[SET lock_timeout = '3s']] أول سطر في أي migration إنتاج: لو الأمر مقدرش ياخد الـ lock في ٣ ثواني (لأن استعلام طويل ماسك الجدول)، يفشل بدل ما يستنى ويعلّق كل اللي وراه. تعيد المحاولة بعدين.

[[ADD COLUMN]] من غير default أو بـ default ثابت: لحظي، مش بيلمس الصفوف (Postgres 11+). بـ default بيتحسب لكل صف (volatile) زي [[clock_timestamp()]] أو [[gen_random_uuid()]]: بيعيد كتابة الجدول كله ([[now()]] مش منهم: بتتحسب مرة واحدة فلحظية). الحل: ضيف العمود من غير default، وبعدين حدّث على دفعات.

[[NOT NULL]] على عمود موجود: بيفحص كل الصفوف بقفل. الطريقة: CHECK constraint بـ [[NOT VALID]] (لحظي، بيطبّق على الصفوف الجديدة بس)، وبعدين [[VALIDATE CONSTRAINT]] (بيفحص القديمة من غير قفل قوي).

[[CREATE INDEX CONCURRENTLY]]: مينفعش جوه transaction، و Prisma بيلف كل migration في transaction. الحل: migration منفصلة فيها الأمر ده لوحده من غير أي أمر تاني في نفس الملف، أو تعمل الـ index بإيدك خارج Prisma وتسجّله بـ migrate resolve.

وأي migration بتمسح عمود: خطوتين في deployين. الأول الكود يبطّل يستخدمه، والتاني المسح.`,
            when: "أي migration على جدول أكبر من كام مية ألف صف.",
            mistakes: "RENAME COLUMN مباشرة: الكود القديم اللي لسه شغال لثواني أثناء الـ deploy هيقع. الاسم الجديد يتضاف ويتملى، والقديم يتشال بعدين."
          },
          lines: [
            "لو مقدرتش تاخد الـ lock في ٣ ثواني، افشل بدل ما تعلّق الموقع.",
            "عمود جديد من غير default: لحظي.",
            "default ثابت: لحظي كمان (Postgres 11+).",
            "index من غير قفل الجدول.",
            "constraint على الصفوف الجديدة بس (لحظي).",
            "وبعدين افحص القديمة من غير قفل قوي."
          ],
          sol: R`على جدول مليون صف مع [[\timing]] الأرقام اللي طلعت:

[[ADD COLUMN status text NOT NULL DEFAULT 'pending']] أخد [[2.5 ms]]. و [[ADD COLUMN c1 timestamptz DEFAULT now()]] أخد [[0.8 ms]]. و [[ADD COLUMN c2 timestamptz DEFAULT clock_timestamp()]] أخد [[626 ms]]، يعني مئات المرات أبطأ، لأنه بيعيد كتابة كل صف.

والدليل: [[SELECT count(DISTINCT c1), count(DISTINCT c2) FROM big;]] رجّع [[1]] و حوالي [[332265]]. الـ now() اتحسبت مرة واحدة واتحفظت في الـ catalog، والـ clock_timestamp() اتحسبت لكل صف. وعلى جدول ١٠٠ مليون صف ده دقايق والجدول مقفول [[ACCESS EXCLUSIVE]]، يعني حتى الـ SELECT واقف.

الغلط الشائع إنك تجرّب على جدول صغير فتلاقي الاتنين لحظيين. والـ [[SET lock_timeout = '3s']] قبلهم يخلي الـ ALTER يفشل بسرعة لو فيه transaction طويلة ماسكة الجدول، بدل ما يقف ويوقف الطابور وراه.`,
          solCode: R`CREATE TABLE big AS SELECT g AS id FROM generate_series(1, 1000000) g;
\timing on
SET lock_timeout = '3s';
ALTER TABLE big ADD COLUMN status text NOT NULL DEFAULT 'pending';
ALTER TABLE big ADD COLUMN c1 timestamptz DEFAULT now();
ALTER TABLE big ADD COLUMN c2 timestamptz DEFAULT clock_timestamp();
SELECT count(DISTINCT c1), count(DISTINCT c2) FROM big;`
        },
        {
          cmd: "Supabase CLI",
          title: "القاعدة المحلية والـ migrations",
          desc: "Supabase CLI بيشغّل نسخة كاملة من Supabase على جهازك بـ Docker، وبيدير الـ migrations زي Prisma: تعمل التغيير محليًا، ترفعه لمشروعك على Supabase بـ [[db push]]. و [[gen types]] بيطلّع أنواع TypeScript من الـ schema.",
          example: R`supabase init
supabase start
supabase link --project-ref abcdefghijkl
supabase migration new add_orders
supabase db reset
supabase db push
supabase db pull
supabase gen types typescript --linked > src/types/supabase.ts
supabase db dump -f backup.sql`,
          try: "شغّل [[supabase start]] وافتح Studio المحلي على localhost:54323. القاعدة على بورت 54322.",
          deep: {
            why: "تطوّر على قاعدة Supabase الحقيقية مباشرة؟ كل تجربة بتلمس الإنتاج. الـ CLI بيديك Supabase كامل على جهازك، والتغييرات بتترفع كـ migrations.",
            how: R`التسطيب: مش بـ [[npm install -g supabase]] (مش مدعوم). يا إما [[npx supabase]] كل مرة، يا إما devDependency في المشروع ([[npm i -D supabase]]) فكل الفريق على نفس النسخة، يا إما [[brew install supabase/tap/supabase]] على الماك و [[scoop install supabase]] على ويندوز (بعد [[scoop bucket add supabase https://github.com/supabase/scoop-bucket.git]]).

[[init]] بيعمل فولدر supabase/ فيه config و migrations. [[start]] بيشغّل بـ Docker كل حاجة: Postgres على 54322، و API على 54321، و Studio على 54323. أول مرة بينزّل صور كتير.

[[link]] بيربط الفولدر بمشروعك على Supabase (الـ ref من الـ URL بتاع لوحة التحكم).

الـ migrations: [[migration new اسم]] بيعمل ملف SQL فاضي تكتب فيه التغيير. [[db reset]] بيمسح القاعدة المحلية ويعيد تطبيق كل الـ migrations من الأول (وبيشغّل seed.sql)، فتتأكد إنهم بيشتغلوا من الصفر. [[db push]] بيطبّق الـ migrations اللي لسه متطبقتش على المشروع المربوط، وبيقرا من [[supabase/migrations]] بس، والأسماء لازم تبدأ بـ timestamp زي [[20260503000001_init.sql]] (ودي اللي [[migration new]] بيعملها).

[[db pull]] العكس: لو عملت تغيير من لوحة التحكم، بيطلّعه كـ migration.

[[gen types]] بيقرا الـ schema ويولّد أنواع TypeScript، فـ supabase-js يبقى typed بالكامل.

[[db dump]] باك أب من المشروع المربوط.`,
            when: "أي مشروع Supabase له أكتر من مطوّر أو له إنتاج حقيقي.",
            mistakes: "في مشروع حقيقي الـ migrations كانت في [[database/migrations]] بأسماء [[01_...]]، و [[supabase db push]] قال مفيش حاجة يطبّقها: مبيشوفش غير [[supabase/migrations]] بأسماء timestamp. وفي نفس المشروع الدليل كان بيقول [[npm install -g supabase]] وده بيفشل. وتعدّل الـ schema من لوحة التحكم على الإنتاج وتنسى db pull، فالـ migrations مش بتمثّل الواقع. و db reset وانت فاكر إنه على الإنتاج (هو محلي بس، إلا لو كتبت [[--linked]]: ساعتها بيمسح قاعدة المشروع الحقيقي)."
          },
          lines: [
            "اعمل فولدر supabase/ في المشروع.",
            "شغّل Supabase كامل محليًا بـ Docker.",
            "اربط بمشروعك على Supabase.",
            "ملف migration جديد تكتب فيه SQL.",
            "امسح المحلي وطبّق كل الـ migrations من الأول.",
            "طبّق الجديد على المشروع المربوط.",
            "تغييرات اتعملت من لوحة التحكم: هاتها كـ migration.",
            "أنواع TypeScript من الـ schema.",
            "باك أب من المشروع المربوط."
          ],
          sol: R`[[supabase start]] بيحتاج Docker شغال، وأول مرة بيسحب images كتير فبياخد دقايق. في الآخر بيطبع الـ URLs المحلية: الـ API على [[http://127.0.0.1:54321]]، والقاعدة [[postgresql://postgres:postgres@127.0.0.1:54322/postgres]]، و Studio على [[http://127.0.0.1:54323]]، ومعاهم الـ keys المحلية (شكل العرض بيتغير بين نسخ الـ CLI، بس البورتات دي الافتراضية). [[supabase status]] بيطبعهم تاني في أي وقت.

افتح Studio هتلاقي مشروع فاضي شبه اللوحة الحقيقية. و [[psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -c "\dt"]] بيتصل بنفس القاعدة.

المشاكل الشائعة: [[Cannot connect to the Docker daemon]] يعني Docker مش شغال. و [[port is already allocated]] يعني مشروع Supabase تاني شغال، اعمل [[supabase stop]] جوه فولدره أو غيّر البورتات في [[supabase/config.toml]]. و [[supabase stop]] بيحتفظ بالداتا، و [[supabase stop --no-backup]] بيمسحها.`
        },
        {
          cmd: "Supabase Management API",
          title: "SQL على Supabase بتوكن الحساب من غير psql",
          desc: R`Supabase عندهم API لإدارة المشاريع، ومنه endpoint بينفّذ SQL: [[/v1/projects/REF/database/query]]. بتبعته بـ curl وتوكن حسابك، من غير باسورد القاعدة ومن غير psql.

[[jq -Rs]] بيحوّل ملف SQL كامل لنص JSON سليم، بالسطور والعلامات.`,
          example: R`read -rs SUPABASE_ACCESS_TOKEN; export SUPABASE_ACCESS_TOKEN
jq -Rs '{query: .}' < db/ensure_schema.sql \
  | curl -sS --fail-with-body -X POST "https://api.supabase.com/v1/projects/PROJECT_REF/database/query" \
      -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
      -H "Content-Type: application/json" --data @- | jq .`,
          try: "اعمل توكن من Account ثم Access Tokens في لوحة Supabase، وشغّل الأمر على مشروع تجربة بملف فيه [[SELECT now();]]، وبعدين الغيه من نفس الصفحة.",
          flag: "term",
          deep: {
            why: "أحيانًا مفيش psql ولا IPv6 ولا باسورد القاعدة معاك: CI، أو container صغير، أو سكربت على ويندوز. التوكن والـ API بيكفّوا.",
            how: R`[[read -rs]] بيقرا التوكن من غير ما يظهر ولا يتسجّل في الـ history.

[[jq -R]] (raw) بيقرا الملف كنص مش JSON، و [[-s]] (slurp) بيقراه كله كنص واحد. و [[{query: .}]] بيحطه في object. jq بيعمل escape للسطور والعلامات، فمش محتاج تبني JSON بإيدك.

[[--data @-]] بيقرا الـ body من stdin (الـ pipe). والرد JSON: صفوف لو SELECT، و error برسالة Postgres لو SQL غلط. [[--fail-with-body]] بيخلي curl يرجع exit code مش صفر لو HTTP 400 ويطبع الرسالة برضه، فالسكربت يعرف.

التوكن ده Personal Access Token: بيدي صلاحيات على كل المشاريع في حسابك، مش مشروع واحد. أقوى من service_role نفسه. مكانه جهازك أو secrets الـ CI، والأحسن توكن منفصل لكل استخدام تقدر تلغيه.`,
            when: "سكربت أو CI محتاج يطبّق SQL وماعندهوش psql. للـ migrations المنتظمة Supabase CLI أحسن.",
            mistakes: R`في مشروع حقيقي السكربت ده كان بيتشغّل تلقائي مع كل تشغيل container على الإنتاج، والتوكن الكامل متخزن في .env بتاع التطبيق ومتكرر في كذا مكان: أي حد يوصل للـ container يملك كل مشاريع الحساب. خليه خطوة يدوية أو في CI. وبناء الـ JSON بإيدك ([[{"query": "$SQL"}]]) بيبوظ من أول علامة تنصيص أو سطر جديد في الـ SQL؛ jq -Rs بيحل ده.`
          },
          lines: [
            "اقرا التوكن من غير ما يظهر، وصدّره للأوامر اللي بعده.",
            "حوّل ملف SQL كله لـ JSON فيه query...",
            "...وابعته بـ POST (وافشل لو الرد error)...",
            "...بتوكن الحساب...",
            "...كـ JSON من الـ stdin، واعرض الرد بشكل مقروء."
          ],
          sol: R`لو التوكن صح، الـ [[jq .]] في الآخر بيطبع array فيها صف واحد: [[[ { "now": "2026-09-30 05:10:11.123456+00" } ]]]. الـ API بيرجّع نتيجة آخر statement كـ JSON، وأوامر زي CREATE TABLE بترجّع array فاضية [[[]]].

لو التوكن غلط أو اتلغى هتاخد رد 401 وفيه رسالة Unauthorized، و [[--fail-with-body]] بيخلي curl يطلع بـ exit code غير صفر ويطبع الرد، فالسكربت يقف. ولو الـ SQL نفسه فيه غلط هتاخد رد 400 والـ body فيه رسالة Postgres. ولو كتبت الـ PROJECT_REF غلط هيقولك إن المشروع مش موجود أو مالكش صلاحية عليه.

بعد ما تلغي التوكن من صفحة Access Tokens، نفس الأمر لازم يرجّع 401، ودي علامة إن الإلغاء اشتغل. والـ [[read -rs]] مش بيطبع حاجة وانت بتلزق، عشان التوكن ما يظهرش على الشاشة ولا في الـ history.`
        },
        {
          cmd: "Supabase: الاتصال المباشر",
          title: "psql على قاعدة Supabase",
          desc: "قاعدة Supabase هي Postgres عادي، تقدر تدخلها بـ psql. في لوحة التحكم (زرار Connect) فيه ٣: مباشر [[db.REF.supabase.co:5432]] (IPv6 بس افتراضيًا)، و pooler (Supavisor) بـ session mode على 5432، و transaction mode على 6543. للأوامر الإدارية والـ migrations: المباشر أو session. للتطبيق serverless: transaction.",
          example: R`psql "postgres://postgres.abcdefghijkl:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
psql "$SUPABASE_DB_URL" -c "\dt"
pg_dump "$SUPABASE_DB_URL" -Fc --schema=public -f supabase.dump
psql "$SUPABASE_DB_URL" -c "SELECT count(*) FROM pg_stat_activity;"`,
          try: R`خد الـ connection string من زرار Connect فوق في لوحة Supabase، واتصل بـ psql، واعمل [[\dt]] وشوف جداولك.`,
          deep: {
            why: "لوحة Supabase فيها SQL editor، بس للباك أب والـ migrations وتحليل الأداء محتاج الأدوات الحقيقية. وقاعدتهم Postgres عادي.",
            how: R`زرار Connect فوق في لوحة التحكم فيه الـ connection strings. اليوزر اسمه [[postgres.PROJECT_REF]] (مع الـ ref لأن الاتصال بيعدّي على pooler مشترك). والباسورد اللي حددته عند إنشاء المشروع.

بورت [[5432]] على الـ pooler هو session mode: كل الميزات، للـ migrations و pg_dump وأي حاجة إدارية لو جهازك مفيهوش IPv6 (المباشر [[db.REF.supabase.co]] IPv6 بس). بورت [[6543]] transaction mode عبر Supavisor: للتطبيق، بس مش بيدعم prepared statements ولا بعض الميزات، عشان كده [[?pgbouncer=true]] مع Prisma.

[[pg_dump]] بيشتغل عليها عادي. [[--schema=public]] عشان تاخد جداولك بس من غير schemas بتاعة Supabase (auth، storage) اللي ليها إدارة خاصة.

[[pg_stat_activity]] بيوريك اتصالات تطبيقك، والخطة المجانية ليها حد اتصالات صغير، فده أول حاجة تشوفها لو ظهر too many connections.

ونسخة pg_dump عندك لازم تبقى نفس نسخة Postgres في مشروعك أو أحدث (المشاريع الجديدة على 17)، وإلا بيرفض.`,
            when: "باك أب خاص بيك بعيد عن باك أب Supabase. تحليل أداء. أي حاجة الـ SQL editor ميعملهاش.",
            mistakes: "تستخدم بورت 6543 لـ pg_dump أو migrations فتطلع errors غريبة. الإداري على 5432. وفي مشروع حقيقي الـ container مكانش عارف يوصل لهوست القاعدة، والحل كان [[extra_hosts]] بـ IP ثابت و [[dns: 8.8.8.8]] في compose. ده بيشتغل لحد ما الـ IP يتغير. السبب الشائع إن [[db.REF.supabase.co]] عنوانه IPv6 بس وشبكة Docker الافتراضية IPv4، فالحل الأنضف رابط الـ pooler (IPv4) مش تثبيت IP."
          },
          lines: [
            "عبر الـ pooler بـ session mode (5432): ينفع لأي حاجة إدارية.",
            "جداولك.",
            "باك أب لـ schema public بس (من غير schemas بتاعة Supabase).",
            "عدد الاتصالات (الخطة المجانية ليها حد)."
          ],
          sol: R`بعد ما تلزق الـ URL وتكتب الباسورد مكان [[[YOUR-PASSWORD]]]، [[\dt]] بيطلّع جداول الـ schema [[public]] بس، زي [[public | todos | table | postgres]]. جداول Supabase نفسها في schemas تانية: [[\dt auth.*]] هتلاقي فيها [[users]] و [[sessions]] وغيرهم، و [[\dn]] بيعرض الـ schemas كلها ([[auth]] و [[storage]] و [[realtime]] و [[extensions]] ...).

المشاكل الشائعة: [[password authentication failed for user "postgres"]] يعني الباسورد غلط، أو اليوزر مكتوب [[postgres]] بس مع pooler محتاج [[postgres.PROJECTREF]]. ولو الباسورد فيه رموز زي [[@]] أو [[#]] لازم تعملها URL-encode ([[%40]] و [[%23]]) وإلا الـ URL يتقري غلط. والـ direct connection ([[db.PROJECTREF.supabase.co]]) بقى IPv6 بس في أغلب المشاريع، فلو شبكتك IPv4 استخدم الـ pooler في session mode (بورت 5432) زي المثال.`
        },
        {
          cmd: "connection pooling",
          title: "ليه max_connections بيخلص",
          desc: "كل اتصال Postgres بياخد رام (حوالي ١٠ ميجا). serverless والـ Next.js API routes بيفتحوا اتصالات كتير قصيرة. الـ pooler (PgBouncer أو Supabase pooler) بيمسك اتصالات قليلة للقاعدة ويوزّعها على آلاف اتصالات التطبيق.",
          example: R`SELECT count(*), state FROM pg_stat_activity GROUP BY state;
SHOW max_connections;
psql "postgres://app_user:secret@localhost:6432/app"
psql "postgres://postgres.abcdefghijkl:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"`,
          try: "في Prisma مع Supabase: [[DATABASE_URL]] على 6543 بـ [[?pgbouncer=true]] للتطبيق، و [[DIRECT_URL]] على 5432 للـ migrations (في Prisma 7 الـ DIRECT_URL بيتحط في [[prisma.config.ts]] مش في schema.prisma).",
          deep: {
            why: "Next.js على Vercel أو أي serverless: كل طلب ممكن يفتح اتصال جديد. ١٠٠ طلب متزامن = ١٠٠ اتصال، و Postgres عنده 100 افتراضي، وكل واحد بياخد رام. too many connections بعد ٥ دقايق.",
            how: R`الاتصال بـ Postgres غالي: عملية كاملة على السيرفر لكل اتصال، وحوالي ١٠ ميجا رام، ووقت للفتح. الـ pooler برنامج في النص: التطبيق بيفتح عليه آلاف الاتصالات الرخيصة، وهو ماسك ٢٠ اتصال حقيقي للقاعدة وبيوزّع الاستعلامات عليهم.

[[transaction mode]]: الاتصال الحقيقي بيتخصص للتطبيق مدة transaction واحدة وبعدين يرجع للـ pool. أعلى كفاءة، بس مفيش state بين الـ transactions: prepared statements و SET session و LISTEN مش هيشتغلوا. [[session mode]]: الاتصال ملك التطبيق لحد ما يقفله، كل حاجة شغالة بس كفاءة أقل.

PgBouncer على سيرفرك: بيسمع على 6432، وإعداداته [[pool_mode = transaction]] و [[default_pool_size = 20]]. و Supabase عندهم pooler جاهز على 6543.

الاستعلام الأول في المثال بيوريك عدد الاتصالات بحالتها: لو [[idle]] كتير، التطبيق فاتح اتصالات ومش بيستخدمها، والـ pool size في الكود (Prisma connection_limit) أكبر من اللازم.`,
            when: "أي serverless. وأي تطبيق بيعدّي ٥٠ اتصال متزامن. و Supabase من أول يوم.",
            mistakes: "ترفع max_connections لـ 500 بدل pooler، فالرام تخلص. و prepared statements مع transaction mode من غير pgbouncer=true."
          },
          lines: [
            "الاتصالات بحالتها: idle كتير يعني الـ pool في الكود أكبر من اللازم.",
            "الحد.",
            "عبر PgBouncer على سيرفرك (6432).",
            "عبر pooler بتاع Supabase (6543) بـ transaction mode."
          ],
          sol: R`الشكل الصح في [[.env]]: [[DATABASE_URL="postgres://postgres.PROJECTREF:PASS@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"]] و [[DIRECT_URL="postgres://postgres.PROJECTREF:PASS@aws-0-REGION.pooler.supabase.com:5432/postgres"]]. التطبيق بيستخدم الأول (transaction mode)، و [[prisma migrate]] بيستخدم التاني (session mode)، لأن الـ migrations محتاجة جلسة كاملة وأقفال.

في Prisma 7 الـ URL بتاع CLI بيتحط في [[prisma.config.ts]] جوه [[datasource: { url: env("DIRECT_URL") }]]، والتطبيق بياخد [[DATABASE_URL]] من خلال الـ adapter في الكود.

المشاكل اللي بتقول إنك عكستهم: [[prepared statement "s0" already exists]] يعني التطبيق على 6543 من غير [[pgbouncer=true]]. و [[migrate dev]] يعلّق أو يقول إنه مش قادر ياخد advisory lock يعني الـ migrations شغالة على 6543. و [[SELECT count(*), state FROM pg_stat_activity GROUP BY state]] مع pooling شغال المفروض يفضل رقم ثابت صغير حتى لو عندك functions كتير شغالة.`
        },
        {
          cmd: "الاستعلامات البطيئة",
          title: "log_min_duration و pg_stat_statements",
          desc: "بدل ما تخمّن أنهي استعلام بطيء، خلّي Postgres يسجّل أي استعلام أخد أكتر من حد معين. و [[pg_stat_statements]] بيجمّع إحصائيات كل الاستعلامات: مين اتنفّذ أكتر وأخد وقت أكتر في المجموع.",
          example: R`ALTER SYSTEM SET log_min_duration_statement = '500ms';
SELECT pg_reload_conf();
sudo tail -f /var/log/postgresql/postgresql-16-main.log
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT calls, round(mean_exec_time) AS ms, left(query, 80) FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;
SELECT pg_stat_statements_reset();`,
          try: "فعّل اللوج على 500ms، استخدم الموقع شوية، واقرا اللوج: الاستعلامات اللي هتظهر هي أول حاجة تحطلها index.",
          deep: {
            why: "الموقع بطيء في أوقات معينة ومش عارف أنهي صفحة أو استعلام. بدل التخمين، خلّي Postgres يسجّل.",
            how: R`[[log_min_duration_statement]] بيسجّل أي استعلام أخد أكتر من القيمة دي في لوج Postgres، مع النص الكامل والوقت. 500ms بداية كويسة، وعلى موقع سريع 100ms. [[0]] يسجّل كل حاجة (للتشخيص القصير بس، اللوج هيكبر بسرعة).

اللوج على أوبونتو في [[/var/log/postgresql/]]، وجوه Docker في [[docker logs db]].

[[pg_stat_statements]] extension بيجمّع إحصائيات بشكل مختلف: لكل «شكل استعلام» (بيوحّد القيم)، عدد مرات التنفيذ ومتوسط الوقت والمجموع. الترتيب بـ [[total_exec_time]] بيوريك الاستعلامات اللي واكلة أكتر وقت إجمالًا، وأحيانًا ده استعلام سريع بيتنفذ ١٠ آلاف مرة مش الاستعلام البطيء. لازم [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات وريستارت، وبعدين CREATE EXTENSION.

[[reset()]] بيصفّر الإحصائيات عشان تقيس فترة معينة.

في Supabase الـ extension مفعّلة، وفي لوحة التحكم تحت Reports ثم Query Performance.`,
            when: "بعد أي شكوى من البطء. وشهريًا تبص على أعلى ١٠.",
            mistakes: "log_min_duration_statement = 0 على الإنتاج وتنساه، فالديسك يتملى لوجات."
          },
          lines: [
            "سجّل أي استعلام أبطأ من نص ثانية.",
            "طبّق.",
            "تابع اللوج.",
            "فعّل extension الإحصائيات (بعد shared_preload_libraries وريستارت).",
            "أعلى ١٠ استعلامات في الوقت الإجمالي، بعدد المرات والمتوسط.",
            "صفّر عشان تقيس فترة جديدة."
          ],
          sol: R`بعد ما تفعّله، أي استعلام أبطأ من نص ثانية بيظهر في اللوج كده:

[[2026-09-30 04:57:27.272 UTC [25161] postgres@lab LOG:  duration: 702.895 ms  statement: SELECT pg_sleep(0.7), count(*) FROM users]]. فيه الوقت، والـ pid، واليوزر@القاعدة، والمدة، والاستعلام كامل. جرّب بنفسك بـ [[SELECT pg_sleep(0.7);]] عشان تتأكد إن الإعداد اشتغل قبل ما تستنى استعلام حقيقي.

خلي بالك: [[pg_reload_conf()]] بيبعت signal وبيطبق بعد لحظة، مش في نفس اللحظة. والـ [[pg_stat_statements]] مش هيشتغل من [[CREATE EXTENSION]] بس: أول SELECT منه هيقولك [[pg_stat_statements must be loaded via shared_preload_libraries]]. لازم تضيفه في [[shared_preload_libraries]] وتعمل ريستارت (في Supabase مفعّل جاهز). ولما تخلص رجّع اللوج بـ [[ALTER SYSTEM RESET log_min_duration_statement;]] أو سيبه على رقم أكبر، عشان حجم اللوج.`
        },
        {
          cmd: "النقل بين سيرفرين",
          title: "dump | psql عبر SSH",
          desc: "نقل قاعدة من سيرفر لسيرفر، أو من Supabase لـ VPS، من غير ملف وسيط: pg_dump على مصدر بيطلع على pipe، و psql على الهدف بيقرا منه. والنسخ الكبيرة بملف مضغوط عبر scp.",
          example: R`pg_dump "postgres://user:pass@old-server/app" | psql "postgres://user:pass@new-server/app"
ssh deploy@old "pg_dump -U postgres app | gzip" | gunzip | psql -U postgres app
pg_dump -Fc "$OLD_URL" -f app.dump && pg_restore -d "$NEW_URL" --no-owner --no-privileges app.dump
psql "$NEW_URL" -c "SELECT count(*) FROM users;"`,
          try: "انقل قاعدة تجربة بالطريقة الأولى وقارن عدد الصفوف في الاتنين.",
          deep: {
            why: "بتنقل من Hostinger لسيرفر أكبر، أو من Supabase لـ VPS، أو العكس. البيانات لازم توصل كاملة وصح.",
            how: R`الـ pipe الأول: [[pg_dump]] بيكتب SQL على stdout، و [[psql]] بيقراه من stdin وينفّذه على الهدف. مفيش ملف وسيط، ومناسب لقاعدة لحد كام جيجا. لازم القاعدة على الهدف تكون موجودة وفاضية.

الطريقة التانية لما السيرفر القديم مش متاح من جهازك مباشرة: ssh بينفّذ pg_dump هناك ويضغط، والناتج بيعدّي في SSH لجهازك، يتفك، ويدخل psql. كل ده streaming.

التالتة الأثبت للقواعد الكبيرة: dump بصيغة custom لملف، وبعدين restore. [[--no-owner --no-privileges]] لأن اليوزرز على السيرفر الجديد مختلفين، وهتعمل GRANT من جديد.

بعد النقل: عدّ الصفوف في أهم الجداول على الاتنين. وشغّل [[ANALYZE]] على الهدف عشان الإحصائيات. وحدّث DATABASE_URL في التطبيق.

الـ downtime: أثناء النقل أي كتابة على القديم بتضيع. الأبسط وقف التطبيق، نقل، تشغيل على الجديد. للصفر downtime محتاج replication، وده موضوع أكبر.`,
            when: "تغيير الاستضافة. ترقية Postgres بين نسخ رئيسية (dump من القديم و restore في الجديد أبسط من pg_upgrade).",
            mistakes: "تنقل وانت التطبيق شغال بيكتب، فتفقد آخر دقايق. وتنسى ANALYZE فالاستعلامات بطيئة أول ساعة."
          },
          lines: [
            "dump من القديم مباشرة في psql على الجديد (من غير ملف).",
            "القديم مش متاح من جهازك: dump عبر SSH ومضغوط، يتفك ويدخل الجديد.",
            "للقواعد الكبيرة: ملف custom وبعدين restore من غير مالكين وصلاحيات.",
            "اتأكد من العدد على الجديد."
          ],
          sol: R`[[pg_dump "$OLD" | psql "$NEW"]] بيطبع سيل من [[SET]] و [[CREATE TABLE]] و [[ALTER TABLE]] و [[COPY 5]] لكل جدول، وأرقام [[setval]] للـ sequences. بعدها [[SELECT count(*) FROM users]] على الاتنين لازم يطلّع نفس الرقم (في التجربة [[5]] و [[5]]).

قارن كذا جدول مش جدول واحد. والطريقة الأسرع إنك تقارن كل الجداول مرة واحدة:

[[SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY relname;]] (دا تقريبي، بس [[count(*)]] هو الدقيق).

المشاكل الشائعة: [[role "app_user" does not exist]] لأن الـ dump فيه OWNER لأدوار مش موجودة على السيرفر الجديد، الحل تعمل الـ role الأول أو تستخدم [[--no-owner --no-privileges]]. وكمان إن القاعدة الجديدة لازم تبقى موجودة وفاضية قبلها، وإلا [[already exists]] errors. وخلي بالك إن الـ pipe مش بيقف عند أول error، فزوّد [[-v ON_ERROR_STOP=1]] على psql.`
        },
        {
          cmd: "ترقية Postgres في Docker",
          title: "من 16 لـ 18 من غير ما تضيّع الداتا",
          desc: "تغيير [[postgres:16]] لـ [[postgres:18]] في compose مش ترقية: النسخة الجديدة مش بتقرا ملفات القديمة وهتقع. الطريق الأبسط: وقّف الكتابة، dump كامل بـ [[pg_dumpall]]، شغّل 18 على volume جديد، ورجّع. خلّي الـ volume القديم لحد ما تتأكد.",
          example: R`docker compose stop api
docker compose exec -T db pg_dumpall -U postgres > all-16.sql
docker compose stop db
docker run -d --name pg18 -e POSTGRES_PASSWORD=secret -v pgdata18:/var/lib/postgresql postgres:18
docker exec -i pg18 psql -U postgres < all-16.sql
docker exec pg18 psql -U postgres -c "SELECT version();"`,
          try: "جرّبها على سيرفر التجربة، وقارن count(*) لأهم جدول قبل وبعد، وبعدين غيّر compose.yml للـ image والـ volume الجداد.",
          deep: {
            why: "كل نسخة رئيسية بتتدعم ٥ سنين بس (16 لحد نوفمبر 2028)، والنسخ الجديدة أسرع. بس ملفات البيانات مش متوافقة بين النسخ الرئيسية، فالترقية خطوة لازم تتعمل صح.",
            how: R`النسخ الصغيرة (16.4 لـ 16.8) مجرد تغيير tag وريستارت. النسخ الرئيسية محتاجة نقل.

[[pg_dumpall]] بياخد كل القواعد واليوزرز في ملف SQL واحد، و [[-T]] من غير TTY عشان الـ redirect. وقّف التطبيق الأول وإلا أي كتابة بعد الـ dump تضيع.

من 18 مسار الـ volume بقى [[/var/lib/postgresql]]. استنى القاعدة الجديدة تقوم ([[pg_isready]]) قبل الترجيع، والـ error بتاع «role postgres already exists» عادي. للقواعد الضخمة [[pg_upgrade]] أسرع بس أعقد في Docker. بعد الترجيع اعمل [[ANALYZE]].`,
            when: "لما نسختك تقرّب من نهاية الدعم، أو محتاج ميزة جديدة. ودايمًا بعد باك أب مجرَّب.",
            mistakes: "تغيّر الـ tag بس وتعمل up. وتمسح الـ volume القديم قبل ما تتأكد. وتنسى إن extensions زي PostGIS لازم تكون موجودة في الـ image الجديدة."
          },
          lines: [
            "وقّف التطبيق عشان مفيش كتابة تضيع.",
            "dump لكل القواعد واليوزرز من القديمة ([[-T]] عشان الـ redirect).",
            "وقّف القديمة (الـ volume بتاعها سليم للرجوع).",
            "Postgres 18 على volume جديد، على المسار الجديد.",
            "رجّع الـ dump فيها.",
            "اتأكد من النسخة."
          ],
          sol: R`[[docker exec pg18 psql -U postgres -c "SELECT version();"]] المفروض يبدأ بـ [[PostgreSQL 18.]]. و [[count(*)]] لأهم جدول لازم يبقى نفس الرقم قبل وبعد (في تجربة من 16 لـ 17 كان [[1234]] قبل و [[1234]] بعد).

أثناء الترجيع هتشوف [[ERROR:  role "postgres" already exists]]. دا طبيعي ومش مشكلة: [[pg_dumpall]] بيحاول يعمل كل الأدوار ومنهم postgres اللي موجود أصلًا. أي error تاني اقراه كويس.

في compose.yml بعدها: غيّر [[image: postgres:18]]، وغيّر الـ volume لاسم جديد، ومع 18 خلي الـ mount على [[/var/lib/postgresql]] مش [[/var/lib/postgresql/data]]، لأن 18 غيّر مكان الداتا الافتراضي. الغلط الأشهر إنك تشاور 18 على الـ volume القديم بتاع 16، فالـ container يقع ومايقومش، واللوج يقولك إن ملفات الداتا من نسخة تانية (زي [[database files are incompatible with server]]) أو إنه مش لاقي داتا في المكان الجديد. سيب الـ volume القديم كام يوم كـ rollback قبل ما تمسحه.`
        },
        {
          cmd: "الباك أب المجدول",
          title: "cron وسكربت ونسخة بره السيرفر",
          desc: "الباك أب اليومي سكربت بيعمل dump مضغوط بالتاريخ، يمسح الأقدم من أسبوعين، وينقل نسخة لمكان تاني (S3 أو سيرفر تاني)، لأن باك أب على نفس السيرفر بيروح معاه.",
          example: R`#!/usr/bin/env bash
set -euo pipefail
DIR=/home/deploy/backups/db
mkdir -p "$DIR"
FILE="$DIR/app-$(date +%F).dump"
pg_dump -U postgres -d app -Fc -f "$FILE"
find "$DIR" -name 'app-*.dump' -mtime +14 -delete
rclone copy "$FILE" s3:mybucket/db/ 2>>"$DIR/rclone.log"
echo "backup ok: $FILE ($(du -h "$FILE" | cut -f1))"`,
          try: "حطه في crontab بتاع deploy: [[0 3 * * * /home/deploy/db-backup.sh >> /home/deploy/backups/db/cron.log 2>&1]].",
          flag: "script",
          deep: {
            why: "باك أب بإيدك بيتنسي. السكربت ده مع cron بيضمن نسخة يومية، وينضّف القديم، ويبعت نسخة بره السيرفر.",
            how: R`[[set -euo pipefail]] عشان لو pg_dump فشل السكربت يقف ومينضّفش القديم بناءً على نسخة فاشلة.

الاسم بالتاريخ [[app-2026-09-25.dump]]، وصيغة [[-Fc]] مضغوطة وبتسمح باسترجاع جزئي.

[[find -mtime +14 -delete]] بيحتفظ بأسبوعين. للأمان أكتر: يومي لأسبوعين، وأسبوعي لشهرين، وشهري لسنة (سكربت أطول).

[[rclone]] أداة بتنقل ملفات لأي تخزين سحابي (S3، Backblaze B2، Google Drive) بعد إعداد مرة واحدة بـ [[rclone config]]. B2 أرخص خيار عمليًا. و [[2>>]] بيحفظ أخطاء الرفع في لوج منفصل.

[[.pgpass]] لازم عشان pg_dump ميسألش باسورد. واليوزر اللي بيشغّل السكربت لازم يقدر يقرا القاعدة.

في cron: المسار الكامل للسكربت، والناتج للوج. وراقب اللوج: باك أب بيفشل بصمت من شهر أسوأ من مفيش باك أب لأنك مطمّن.`,
            when: "يوميًا الساعة ٣ الفجر (وقت الهدوء). ومع كل تغيير في القاعدة، جرّب الترجيع.",
            mistakes: "النسخة بره السيرفر بتتعمل «بعدين». والباك أب شغال بس عمره ما اتراقب."
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "فولدر الباك أب.",
            "اعمله لو مش موجود.",
            "الاسم بالتاريخ.",
            "dump مضغوط.",
            "امسح الأقدم من أسبوعين.",
            "انسخ لتخزين خارجي، والأخطاء في لوج.",
            "اطبع النتيجة بالحجم."
          ],
          sol: R`بعد ما تضيف السطر بـ [[crontab -e]]، [[crontab -l]] لازم يعرضه. وتاني يوم الصبح [[cron.log]] فيه سطر زي [[backup ok: /home/deploy/backups/db/app-2026-10-01.dump (1.2M)]]، و [[ls backups/db]] فيه ملف بتاريخ اليوم.

شغّل السكربت بإيدك الأول [[/home/deploy/db-backup.sh]] عشان تتأكد إنه شغال، بعدين استنى أول تشغيل من cron. ولازم تعمل [[chmod +x]] للسكربت.

المشاكل الشائعة في cron: السكربت يشتغل بإيدك ويفشل من cron لأن الـ PATH جوه cron قصير ([[pg_dump: command not found]] أو [[rclone: command not found]]) فاكتب المسار الكامل أو حط PATH في أول السكربت. و [[peer authentication failed]] لو cron بيشتغل بيوزر deploy وانت بتتصل كـ postgres من غير [[.pgpass]]. واعرف إن [[2>&1]] في آخر السطر هو اللي بيخلي الـ errors تتسجل، من غيره بتضيع.`
        },
        {
          cmd: "الأمان",
          title: "SSL وباسوردات و public schema",
          desc: "الاتصال من بره لازم SSL. الباسوردات بصيغة SCRAM مش md5. و public schema افتراضيًا أي يوزر يقدر يعمل فيه جداول (اتغير في Postgres 15). و [[pg_hba]] بيحدد مين يدخل منين.",
          example: R`SHOW ssl;
SHOW password_encryption;
SELECT usename, passwd LIKE 'SCRAM%' AS scram FROM pg_shadow;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
ALTER ROLE app_user PASSWORD 'new-strong-password';
SELECT rolname, rolsuper FROM pg_roles WHERE rolsuper;`,
          try: "اتأكد إن التطبيق مش متصل بيوزر superuser: [[SELECT current_user, usesuper FROM pg_user WHERE usename = current_user;]] من كود التطبيق.",
          deep: {
            why: "القاعدة فيها كل حاجة: المستخدمين، والطلبات، والدفعات. لو اتخترقت مفيش رجوع. الخمس فحوصات دي بتقفل أشهر الثغرات.",
            how: R`[[ssl]]: لو on، الاتصالات من بره متشفّرة. الاتصال المحلي عبر socket مش محتاجه. مع Supabase و RDS مفعّل، وعلى VPS محتاج شهادة (self-signed كفاية للتشفير، أو من Let's Encrypt).

[[password_encryption]]: لازم [[scram-sha-256]]، والـ md5 القديم ضعيف. لو غيّرتها، الباسوردات القديمة لازم تتعاد بـ ALTER ROLE عشان تتخزن بالصيغة الجديدة. الاستعلام على pg_shadow بيوريك مين لسه md5.

[[public schema]]: قبل Postgres 15 أي يوزر يقدر يعمل جداول فيه. [[REVOKE CREATE ON SCHEMA public FROM PUBLIC]] بيقفل ده. Postgres 15+ عامله افتراضيًا.

الـ superusers: المفروض postgres بس، واتصال التطبيق مش منهم. الاستعلام الأخير بيوريك مين superuser.

وطبقات تانية: القاعدة على 127.0.0.1 أو خلف الفايروول، وباسوردات طويلة عشوائية، و pg_hba بيسمح لعناوين محددة، والباك أب مشفّر لو على تخزين خارجي.`,
            when: "بعد التسطيب. وبعد أي تغيير في اليوزرز. وربع سنوي.",
            mistakes: "نفس الباسورد للقاعدة في التطوير والإنتاج. وباسورد postgres الافتراضي في صورة Docker متغيرش."
          },
          lines: [
            "SSL شغال؟",
            "طريقة تخزين الباسوردات (لازم scram-sha-256).",
            "مين لسه باسورده بالصيغة القديمة.",
            "امنع أي يوزر يعمل جداول في public (Postgres 15+ عامله).",
            "غيّر باسورد (بيتخزن بالصيغة الجديدة).",
            "مين superuser (المفروض postgres بس)."
          ],
          sol: R`من كود التطبيق (مثلًا [[await prisma.$queryRaw]] أو route مؤقت) لازم الناتج يبقى [[current_user = app_user]] و [[usesuper = false]].

لو طلع [[postgres | t]] يبقى التطبيق متصل بالـ superuser، ودا معناه إن أي SQL injection يقدر يعمل أي حاجة، حتى [[COPY ... TO PROGRAM]] اللي بيشغّل أوامر على السيرفر. الحل تعمل يوزر زي درس «يوزرز وصلاحيات» وتغيّر [[DATABASE_URL]].

وخلي بالك إن على Supabase اليوزر [[postgres]] مش superuser حقيقي ([[usesuper]] بيطلع [[f]])، بس هو برضه صاحب الجداول ومعاه صلاحيات كتير، فبرضه مش المفروض يكون اللي في كود الـ backend لو تقدر.`,
          solCode: R`SELECT current_user, usesuper FROM pg_user WHERE usename = current_user;
--  current_user | usesuper
-- --------------+----------
--  app_user     | f`
        },
        {
          cmd: "Row Level Security",
          title: "كل يوزر يشوف صفوفه بس",
          desc: "في Supabase الـ frontend بيكلّم القاعدة مباشرة بالـ anon key، فالحماية الوحيدة هي RLS: policies بتحدد أنهي صفوف كل يوزر يقرا ويكتب. جدول في public من غير RLS معناه أي حد معاه الـ key يقرا الجدول كله.",
          example: R`ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
CREATE POLICY todos_owner ON todos FOR ALL TO authenticated USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'todos';`,
          try: "فعّل RLS على جدول تجربة من غير policies، وجرّب تقرا منه بالـ anon key من supabase-js: هيرجع فاضي. ضيف الـ policy وجرّب تاني وانت عامل login.",
          deep: {
            why: "في تطبيق عادي الـ backend هو اللي بيفلتر بـ WHERE user_id. في Supabase مفيش backend في النص، فالقاعدة نفسها لازم تفلتر.",
            how: R`[[ENABLE ROW LEVEL SECURITY]] بيقفل الجدول: من غير policies مفيش صف بيرجع لحد. [[CREATE POLICY]] بيفتح بشرط: [[USING]] للصفوف اللي يقدر يشوفها ويعدّلها ويمسحها، و [[WITH CHECK]] للصفوف اللي يقدر يكتبها (عشان محدش يعمل insert باسم حد تاني).

[[auth.uid()]] رقم اليوزر من الـ JWT، وكتابتها [[(select auth.uid())]] بتخليها تتحسب مرة واحدة بدل كل صف (أسرع). [[TO authenticated]] للي عامل login بس.

الـ superuser وصاحب الجدول والـ service_role key بيعدّوا RLS، عشان كده service_role عمره ما يروح للـ frontend. [[pg_tables.rowsecurity]] بيوريك أنهي جداول لسه مكشوفة، و Security Advisor في لوحة Supabase بينبّهك.`,
            when: "كل جدول في public على Supabase، من أول migration. وفي Postgres عادي لو فيه multi-tenant.",
            mistakes: "جدول جديد من SQL من غير ENABLE RLS. واختبار الـ policies من SQL editor كـ postgres فتعدّي كلها. و USING من غير WITH CHECK."
          },
          lines: [
            "فعّل RLS: الجدول مقفول لحد ما تضيف policy.",
            "policy: اليوزر اللي عامل login يشوف ويكتب الصفوف اللي user_id بتاعها هو بس.",
            "أنهي جداول في public عليها RLS وأنهي لأ.",
            "الـ policies الموجودة على الجدول وشروطها."
          ],
          sol: R`بعد [[ENABLE ROW LEVEL SECURITY]] من غير policies: [[supabase.from('todos').select()]] بيرجّع [[data: []]] و [[error: null]]، مش error. دي النقطة اللي بتلخبط الناس: RLS مش بيرفض، بيفلتر لحد ما مفيش صفوف.

بعد الـ policy و login: بيرجّع صفوف اليوزر ده بس. ولو عملت logout ترجع array فاضية، لأن الـ policy لـ [[authenticated]] بس. ونفس السلوك تقدر تشوفه في Postgres عادي: يوزر مش owner بيعمل [[SELECT count(*) FROM todos]] يطلع [[0]]، وبعد policy بيشوف صفوفه بس، والـ owner بيشوف الكل.

الأخطاء الشائعة: تجرّب من SQL Editor في اللوحة فتشوف كل الصفوف، لأنه بيشتغل كـ [[postgres]] اللي بيعدّي RLS. أو تستخدم الـ service_role key في الكود فكل حاجة تبان شغالة، وهو كده بيعدّي RLS خالص. ولو INSERT رجّع [[new row violates row-level security policy]] يبقى الـ [[user_id]] اللي بتبعته مش بتاع اليوزر اللي عامل login، ودا شغل [[WITH CHECK]].`
        },
        {
          cmd: "pgcli",
          title: "psql بإكمال تلقائي",
          desc: R`[[pgcli]] بديل لـ [[psql]] بيكمّلك أسامي الجداول والأعمدة وانت بتكتب، وبيلوّن الـ SQL، فالكتابة أسرع وأقل غلط. بيتصل بـ Postgres بنفس الطريقة وبيفهم أوامر الـ backslash الأساسية زي [[\dt]].

هو أداة Python، و [[pipx install pgcli]] بيسطّبها في بيئة لوحدها فمتلخبطش مكتبات Python التانية عندك. الاتصال بطريقتين: connection string زي [[postgres://app_user:secret@localhost/app]] (اليوزر:الباسورد@الجهاز/القاعدة)، أو فلاجات: [[-h]] الجهاز، و [[-p]] البورت (هنا 5433)، و [[-U]] اليوزر، وبعدهم اسم القاعدة.

مفيد على جهازك، وعلى السيرفر psql العادي كفاية. وخد بالك إن الباسورد في الـ connection string بيتحفظ في الـ history، فالأحسن ملف [[~/.pgpass]].`,
          example: R`pipx install pgcli
pgcli postgres://app_user:secret@localhost/app
pgcli -h localhost -p 5433 -U app_user app`,
          try: "اتصل بـ pgcli واكتب [[SELECT * FROM us]] ودوس Tab.",
          deep: {
            why: "psql ممتاز، بس مفيهوش إكمال تلقائي لأسامي الجداول والأعمدة. pgcli بيضيف ده وألوان وتاريخ أحسن.",
            how: R`أداة Python بتتكلم مع Postgres بنفس البروتوكول، وبتقبل نفس connection strings و PG* variables و .pgpass. وأوامر الـ backslash الأساسية شغالة فيها.

الإكمال بيقرا الـ schema أول ما تتصل: تكتب اسم جدول جزئي وتدوس Tab، وبعد [[SELECT * FROM users WHERE]] بيقترح الأعمدة. وبيلوّن SQL.

على السيرفر مش هتسطّبها غالبًا (محتاجة Python و pip)، وهناك psql كفاية. على جهازك مع tunnel للسيرفر هي أريح.

بدائل بواجهة: DBeaver (مجاني، بيدعم SSH tunnel مباشرة)، و TablePlus، و pgAdmin.`,
            when: "على جهازك للشغل اليومي مع القاعدة.",
            mistakes: "تعتمد عليها بس وتنسى psql، وبعدين على السيرفر في طوارئ تتوه."
          },
          lines: ["سطّب.", "اتصل بـ URL.", "اتصل عبر tunnel."],
          sol: R`لما تكتب [[SELECT * FROM us]] قايمة بتفتح تحت الكلام فيها [[users]] (وأي جدول بيبدأ بـ us). دوس Tab أو Enter يكمّلها. وبعد [[WHERE ]] هتقترح أسماء أعمدة الجدول ده بالذات، ودي الميزة الكبيرة عن psql.

pgcli بيقبل نفس أوامر الـ backslash زي [[\dt]] و [[\d users]]، وبيلوّن الـ SQL وبيعرض النتايج في جدول مرتب.

لو [[pipx: command not found]] نزّله الأول ([[sudo apt install pipx]] على أوبونتو). ولو الـ completion مش بيطلع أسماء الجداول، ممكن يكون لسه بيحمّلها في أول ثواني، أو إنك في قاعدة مفيهاش جداول في الـ search_path. وخلي بالك إن pgcli للشغل اليدوي بس، في السكربتات استخدم psql.`
        }
      ]
    }
]);
