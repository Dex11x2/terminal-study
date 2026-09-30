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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("pg", {
  label: "psql",
  prompt: "app=# ",
  lab: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16
createdb -h localhost -U postgres lab
psql -h localhost -U postgres -d lab`,
  labText: R`أسهل قاعدة تجربة: docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16. الأوامر اللي بتبدأ بـ \ بتتكتب جوه psql، والباقي في الترمنال.`,
  levels: {
    "1": ["البداية", "تتصل، وتتنقل بين القواعد والجداول، وتشغّل SQL من ملفات، وتصدّر CSV"],
    "2": ["المتوسط", "يوزرز بصلاحيات صح، والأقفال والحجم والـ indexes وقراية EXPLAIN"],
    "3": ["المتقدم", "باك أب بيتجرّب، و migrations آمنة، و Supabase CLI و pooling"]
  },
  categories: [
    {
      t: "الاتصال والتنقل في psql",
      l: 1,
      n: R`psql هو الترمنال بتاع Postgres: تكتب SQL، وأوامر بتبدأ بـ \ للتنقل`,
      items: [
        {
          cmd: "psql",
          title: "اتصل بقاعدة البيانات",
          desc: "[[psql]] بياخد اليوزر ([[-U]])، والسيرفر ([[-h]])، والقاعدة ([[-d]])، أو connection string كامل. من غير [[-h]] بيتصل بالسوكت المحلي. ولو Postgres جوه Docker، بتشغّل psql جوه الـ container.",
          example: R`psql -U postgres -h localhost -d app
psql "postgres://app_user:secret@localhost:5432/app"
docker exec -it db psql -U postgres -d app
psql -U postgres -c "SELECT version();"`,
          try: R`اتصل بأي قاعدة عندك واكتب [[SELECT now();]] و [[\q]] للخروج.`,
          deep: {
            why: "لوحة Supabase و DBeaver حلوين، بس على السيرفر أو في سكربت مفيش غير الترمنال. و psql أسرع لأي حاجة إدارية.",
            how: R`[[psql]] برنامج client بيتكلم مع سيرفر Postgres بالبروتوكول بتاعه. الـ arguments: [[-U]] اليوزر، [[-h]] السيرفر، [[-p]] البورت (5432 افتراضي)، [[-d]] القاعدة.

لو مكتبتش [[-h]]، psql بيتصل بـ Unix socket محلي مش بالشبكة. وعلى أوبونتو الاتصال المحلي كـ postgres بيستخدم [[peer]] authentication: يوزر لينكس postgres هو اللي يقدر يدخل، عشان كده [[sudo -u postgres psql]].

الـ connection string [[postgres://user:pass@host:port/db]] بيجمع كل حاجة، وهو نفسه اللي في [[DATABASE_URL]] بتاع التطبيق. مفيد تجرّب بيه إن الـ URL اللي في .env صح.

جوه Docker: Postgres بيسمع جوه الـ container، فـ [[docker exec -it db psql]] بيشغّل psql جواه. أو من جهازك على البورت المربوط بـ -p.

[[-c]] بينفّذ أمر واحد ويخرج، مفيد في السكربتات.`,
            when: "أي إدارة للقاعدة. تجربة الـ DATABASE_URL. سكربتات.",
            mistakes: "[[psql -U postgres]] من غير -h على السيرفر فيطلع peer authentication failed. استخدم [[sudo -u postgres psql]] أو [[-h localhost]]."
          },
          lines: [
            "اتصل: يوزر postgres، على localhost، بقاعدة app. هيسألك باسورد.",
            "نفس الحاجة بـ connection string (زي DATABASE_URL في .env).",
            "لو Postgres جوه Docker: شغّل psql جوه الـ container.",
            "نفّذ أمر واحد واخرج."
          ]
        },
        {
          cmd: "أوامر الـ backslash",
          title: "التنقل جوه القاعدة",
          desc: R`الأوامر اللي بتبدأ بـ [[\]] بتاعة psql نفسه مش SQL. [[\l]] القواعد، و [[\c]] اتصل بقاعدة، و [[\dt]] الجداول، و [[\d اسم]] أعمدة جدول و indexes بتاعه، و [[\du]] اليوزرز، و [[\?]] كل الأوامر.`,
          example: R`\l
\c app
\dt
\d users
\d+ users
\du
\dn
\df
\q`,
          try: R`ادخل قاعدة مشروعك واعمل [[\d]] لأهم جدول: اقرا الأعمدة والأنواع والـ indexes والـ foreign keys في الآخر.`,
          deep: {
            why: "محتاج تعرف إيه القواعد الموجودة، وإيه الجداول، وأعمدة كل جدول، من غير ما تحفظ استعلامات على جداول النظام.",
            how: R`أي حاجة بتبدأ بـ [[\]] أمر لـ psql نفسه، وبيترجمه لاستعلام على جداول النظام (pg_catalog). ومش محتاجة [[;]] في الآخر.

[[\l]] القواعد (list). [[\c app]] اتصل بقاعدة app (connect). [[\dt]] الجداول (describe tables)، و [[\d]] لوحدها الجداول والـ views والـ sequences.

[[\d users]] أهم واحد: كل أعمدة الجدول بأنواعها والـ defaults والـ nullable، وتحتهم الـ indexes، والـ constraints، والـ foreign keys في الاتجاهين. [[\d+]] بيضيف الحجم والوصف.

[[\du]] اليوزرز (roles) وصلاحياتهم. [[\dn]] الـ schemas. [[\df]] الدوال. [[\?]] كل أوامر الـ backslash، و [[\h ALTER TABLE]] مساعدة SQL.

و [[\e]] بيفتح المحرر تكتب استعلام طويل، و [[\s]] الـ history.`,
            when: "أول ما تدخل قاعدة مش عارفها. قبل ما تكتب استعلام على جدول مش فاكر أعمدته.",
            mistakes: "تكتب [[;]] بعد أمر backslash فـ psql يستناك. وتنسى إنك متصل بأنهي قاعدة: الـ prompt بيقولك ([[app=#]])."
          },
          lines: [
            "القواعد الموجودة.",
            "اتصل بقاعدة app.",
            "الجداول.",
            "أعمدة users وأنواعها و indexes و foreign keys.",
            "نفسه مع الحجم والوصف.",
            "اليوزرز وصلاحياتهم.",
            "الـ schemas.",
            "الدوال.",
            "اخرج."
          ]
        },
        {
          cmd: R`\x و \timing`,
          title: "خلّي الناتج مقروء",
          desc: R`جدول فيه ٢٠ عمود بيطلع مكسّر. [[\x]] بيعرض كل صف رأسي (عمود: قيمة). [[\timing]] بيطبع وقت كل استعلام، أول أداة لقياس الأداء. و [[\pset]] بيتحكم في الشكل.`,
          example: R`\x
SELECT * FROM users LIMIT 1;
\x auto
\timing
SELECT count(*) FROM orders;
\pset null '[NULL]'
\pset format csv`,
          try: R`شغّل [[\timing]] وقارن وقت استعلام بـ WHERE على عمود عليه index وعمود من غير.`,
          deep: {
            why: "SELECT * على جدول فيه ٢٠ عمود بيطلع سطور ملفوفة مستحيل تقراها. و«الاستعلام ده بطيء» محتاج رقم.",
            how: R`[[\x]] (expanded) بيبدّل العرض: بدل جدول عرضي، كل صف بيتعرض رأسي، اسم العمود وجنبه القيمة. [[\x auto]] بيقرر لوحده حسب عرض الناتج، ودي أحسن إعداد دايم.

[[\timing]] بيطبع بعد كل استعلام [[Time: 12.345 ms]]. ده الوقت الكلي من psql بما فيه الشبكة، مش وقت التنفيذ بس، بس كفاية للمقارنة قبل وبعد index.

[[\pset]] إعدادات العرض: [[null '[NULL]']] بيميّز NULL عن النص الفاضي (افتراضيًا الاتنين فاضي وده مضلل). [[format csv]] الناتج CSV، مفيد مع [[\o file]] تكتبه في ملف.

وتقدر تحط الإعدادات دي في [[~/.psqlrc]] تشتغل مع كل جلسة: [[\x auto]] و [[\timing on]] و [[\pset null]].`,
            when: R`\x auto و \timing في .psqlrc من أول يوم.`,
            mistakes: R`تقيس بـ \timing مرة واحدة: أول مرة الكاش بارد. شغّل ٣ مرات وخد المتوسط.`
          },
          lines: [
            "عرض رأسي: كل صف عمود تحت عمود.",
            "جرّب على صف.",
            "رأسي بس لما الناتج عريض.",
            "اطبع وقت كل استعلام.",
            "جرّب.",
            "اعرض NULL بشكل واضح بدل فراغ.",
            "الناتج CSV."
          ]
        },
        {
          cmd: "تشغيل SQL من ملف",
          title: "سكربتات وأوامر من بره",
          desc: R`مينفعش تكتب ١٠٠ سطر SQL في psql. [[\i]] ينفّذ ملف من جوه psql، و [[-f]] من الترمنال، و [[-c]] أمر واحد. و [[-v ON_ERROR_STOP=1]] يوقف عند أول error بدل ما يكمّل.`,
          example: R`psql -U postgres -d app -f schema.sql
psql -U postgres -d app -v ON_ERROR_STOP=1 -f seed.sql
psql -U postgres -d app -c "SELECT count(*) FROM users;"
psql -U postgres -d app -At -c "SELECT email FROM users;" > emails.txt
\i migrations/001_init.sql`,
          try: "اكتب ملف فيه CREATE TABLE و INSERT وشغّله بـ [[-f]]، وبعدين حط error في النص وشوف الفرق مع ON_ERROR_STOP.",
          deep: {
            why: "الـ schema والـ seed data والتقارير ملفات SQL في المشروع، بتتشغّل في CI وعلى السيرفر. وأي حاجة أطول من سطرين تتكتب في ملف.",
            how: R`[[-f file]] بيقرا الملف وينفّذ كل أمر فيه بالترتيب. افتراضيًا لو أمر فشل، psql بيطبع الـ error ويكمّل اللي بعده. في سكربت ده كارثة: نص الـ schema يتعمل ونصه لأ. [[-v ON_ERROR_STOP=1]] بيوقف عند أول error ويرجع exit code مش صفر، فالـ CI يعرف.

[[-c]] أمر واحد. و [[-A]] (unaligned) و [[-t]] (tuples only) مع بعض بيطلّعوا القيم بس من غير عناوين ولا خطوط، مثالي لما تحوّل الناتج لملف أو لأمر تاني.

[[\i]] من جوه psql نفس فكرة -f، والمسار نسبي للفولدر اللي شغّلت psql منه. و [[\ir]] المسار نسبي للملف اللي فيه الأمر، فملف master زي [[00_run_all.sql]] فيه [[\ir 01_extensions.sql]] و [[\ir 02_tables.sql]] بيشتغل من أي فولدر.

[[\i]] و [[\ir]] وكل أوامر الـ backslash بتاعة psql بس، مش SQL. السيرفر نفسه ميعرفهاش، فمش هتشتغل في SQL Editor بتاع Supabase ولا في DBeaver.

وللـ transactions: [[-1]] (single transaction) بيلف الملف كله في transaction واحدة، فلو حاجة فشلت كل حاجة تترجع.`,
            when: "schema.sql و seed.sql في CI. تقارير متكررة كملفات. أي أمر إداري بتكرره.",
            mistakes: R`سكربت من غير ON_ERROR_STOP بيفشل في النص ويكمّل، والنتيجة قاعدة نص متعملة. وفي مشروع حقيقي ملف [[00_run_all.sql]] كان مكتوب إنه «للصقه في SQL Editor» وهو كله [[\i]]، ففشل من أول سطر. ولما اتجمعت الملفات بـ [[cat 0*.sql > combined.sql]]، الـ glob دخّل ملف الـ master نفسه في النص؛ حدد الأرقام ([[0[1-9]_*.sql]]) أو استخدم psql -f على الـ master.`
          },
          lines: [
            "نفّذ ملف schema.",
            "نفس الحاجة بس اوقف عند أول error (لازمة في السكربتات).",
            "أمر واحد من الترمنال.",
            "القيم بس من غير عناوين ولا خطوط ([[-A]] و [[-t]])، في ملف.",
            "من جوه psql: نفّذ ملف."
          ]
        },
        {
          cmd: R`\copy`,
          title: "CSV داخل وخارج",
          desc: R`تصدير جدول أو استعلام لـ CSV، أو استيراد CSV في جدول. [[\copy]] (بـ backslash) بيشتغل من جهازك عبر الاتصال، أما [[COPY]] الـ SQL بيقرا ملفات على السيرفر نفسه ومحتاج صلاحيات.`,
          example: R`\copy users TO 'users.csv' CSV HEADER
\copy (SELECT id, email FROM users WHERE created_at > '2026-01-01') TO 'new_users.csv' CSV HEADER
\copy products FROM 'products.csv' CSV HEADER
psql -d app -c "\copy orders TO STDOUT CSV HEADER" | head`,
          try: "صدّر جدول لـ CSV، افتحه في Excel، عدّل صف، وارجّعه في جدول جديد بـ FROM.",
          deep: {
            why: "العميل عايز الطلبات في Excel. أو عندك CSV من نظام قديم عايز تدخّله. أو بتنقل جدول بين قاعدتين.",
            how: R`[[COPY]] (SQL) أسرع طريقة لنقل بيانات في Postgres، بس بيقرا ويكتب ملفات على السيرفر اللي Postgres شغال عليه، وبيحتاج صلاحيات superuser. [[\copy]] (psql) بيعمل نفس الحاجة بس الملف على جهازك: psql بيقرا الملف ويبعت البيانات عبر الاتصال. عشان كده \copy هو اللي بتستخدمه غالبًا.

[[TO 'file' CSV HEADER]] تصدير بصف عناوين. وممكن تصدّر استعلام مش جدول كامل: بين أقواس.

[[FROM 'file' CSV HEADER]] استيراد: الأعمدة لازم تطابق الجدول بالترتيب، أو تحدد [[(col1, col2)]] بعد اسم الجدول. والاستيراد كله transaction واحدة: صف واحد غلط والكل بيترجع.

[[TO STDOUT]] بيطلّع على الشاشة أو الـ pipe، فتقدر تعمل [[| head]] أو [[| gzip]].`,
            when: "تصدير للعميل. استيراد بيانات أولية. نقل جدول.",
            mistakes: "CSV فيه فاصلة جوه قيمة من غير علامات تنصيص. وترميز الملف مش UTF-8 فالعربي يطلع رموز."
          },
          lines: [
            "صدّر جدول لـ CSV بصف عناوين.",
            "صدّر استعلام (مش جدول كامل).",
            "استورد CSV في جدول (الأعمدة بنفس الترتيب).",
            "من الترمنال: صدّر على stdout وشوف أول سطور."
          ]
        },
        {
          cmd: "psql -tAc",
          title: "ناتج SQL نضيف تحطه في متغير",
          desc: R`في السكربتات محتاج القيمة بس: رقم أو قايمة إيميلات. [[-t]] بيشيل العناوين وسطر العدد، و [[-A]] بيشيل المسافات والخطوط، و [[-c]] أمر واحد. النتيجة قيم خام تحطها في متغير أو لوب.

و Postgres معندوش [[CREATE DATABASE IF NOT EXISTS]]، فبتسأل بـ [[-tAc]] الأول.`,
          example: R`COUNT=$(psql -U postgres -d app -tAc "SELECT count(*) FROM users")
echo "users: $COUNT"
psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'app_test'" | grep -q 1 || createdb -U postgres app_test
for email in $(psql -U postgres -d app -tAc "SELECT email FROM users WHERE is_admin"); do echo "admin: $email"; done
docker compose exec -T postgres psql -U app -d appdb -tAc "SELECT lower(code) FROM staff WHERE is_active" | tr '\n' ' '
echo "SELECT name FROM staff WHERE code = :'code'" | psql -U app -d appdb -tA -v code="$CODE"`,
          try: "اعمل سكربت بيطبع [[users: N]] من قاعدة الـ lab، وشغّل سطر إنشاء القاعدة مرتين: التانية مش هتطلع error.",
          flag: "term",
          deep: {
            why: "سكربتات الديبلوي والصيانة محتاجة تسأل القاعدة: فيه كام يوزر؟ القاعدة موجودة؟ مين الموظفين النشطين؟ وناتج psql العادي بجدول وعناوين مينفعش يدخل في متغير.",
            how: R`ناتج psql العادي فيه عناوين، وخط تحتها، ومسافات للمحاذاة، وسطر [[(1 row)]] في الآخر. [[-t]] (tuples only) بيشيل العناوين والعدد، و [[-A]] (unaligned) بيشيل المسافات. الاتنين مع بعض: كل صف في سطر، والأعمدة بينها [[|]].

[[$(...)]] بياخد الناتج في متغير. ولو صفوف كتير، [[for x in $(...)]] بيلف عليهم (ينفع لقيم من غير مسافات زي الإيميلات والأكواد).

سطر [[grep -q 1 || createdb]]: لو السؤال رجّع 1 القاعدة موجودة و grep ينجح فـ createdb مش بيتنفّذ. كده السطر ينفع يتكرر في Makefile أو CI.

جوه Docker: [[docker compose exec -T]] من غير TTY، لازم في السكربتات و cron وإلا يطلع [[the input device is not a TTY]]. و [[tr '\n' ' ']] بيحوّل السطور لقايمة في سطر واحد.

آخر سطر: قيمة جاية من بره (argument أو input) متتحطش جوه SQL بـ [['$CODE']]. [[-v code=...]] بيعرّف متغير psql، و [[:'code']] بيحطه كنص بعلامات صح. بس ده بيشتغل مع SQL جاي من stdin أو [[-f]]، مش مع [[-c]] (psql مش بيبدّل المتغيرات جوه -c).`,
            when: "أي سكربت محتاج قيمة من القاعدة: فحوصات قبل الديبلوي، وإنشاء قواعد تجربة، وتقارير سريعة.",
            mistakes: R`في مشروع حقيقي سكربت كان بياخد أكواد الموظفين من الـ arguments ويحطها جوه SQL مباشرة ([[WHERE code = '$code']])؛ كود فيه [[']] يبقى SQL injection. الحل [[-v]] مع [[:'code']]، أو على الأقل تفحص القيمة بـ regex قبلها. و [[-t]] من غير [[-A]] بيسيب مسافة قبل القيمة، فـ [[test "$X" = "1"]] يفشل من غير سبب واضح.`
          },
          lines: [
            "عدد اليوزرز في متغير (رقم بس، من غير عناوين).",
            "استخدمه.",
            "اعمل القاعدة لو مش موجودة بس (Postgres معندوش IF NOT EXISTS هنا).",
            "لف على نتيجة استعلام سطر سطر.",
            "من جوه Docker في سكربت (-T)، والقايمة في سطر واحد.",
            "قيمة من بره بأمان: متغير psql بدل ما تلزقها في SQL."
          ]
        },
        {
          cmd: "createdb / dropdb",
          title: "أدوات الترمنال بتاعة Postgres",
          desc: "برامج صغيرة بتيجي مع Postgres بتعمل نفس SQL من الترمنال: [[createdb]] و [[dropdb]] و [[createuser]] و [[pg_isready]]. مفيدة في السكربتات والـ CI من غير ما تدخل psql.",
          example: R`createdb -U postgres app_test
dropdb -U postgres app_test
createuser -U postgres --pwprompt app_user
pg_isready -h localhost -p 5432
psql -l`,
          try: "اعمل قاعدة تجربة بـ createdb، اتأكد إنها ظهرت في [[psql -l]]، وامسحها.",
          flag: "danger",
          deep: {
            why: "في CI والسكربتات محتاج تعمل قاعدة تجربة وتمسحها من غير ما تدخل psql وتكتب SQL.",
            how: R`الأدوات دي مجرد wrappers: [[createdb app_test]] بيتصل وينفّذ [[CREATE DATABASE app_test]]. بتاخد نفس خيارات الاتصال (-U و -h).

[[createuser --pwprompt]] بيسأل الباسورد بدل ما تكتبه في الأمر. و [[--interactive]] بيسأل عن الصلاحيات.

[[pg_isready]] بيرجع 0 لو السيرفر بيقبل اتصالات، ودي اللي بتتحط في healthcheck بتاع Docker وفي سكربتات الانتظار.

[[psql -l]] نفس [[\l]] بس من الترمنال.

فيه كمان [[pg_dump]] و [[pg_restore]] و [[vacuumdb]] و [[reindexdb]]، كلهم بنفس النمط.`,
            when: "CI: createdb قبل الاختبارات و dropdb بعدها. Docker healthcheck بـ pg_isready.",
            mistakes: "dropdb على القاعدة الغلط. مفيش سؤال تأكيد إلا بـ [[-i]]."
          },
          lines: [
            "اعمل قاعدة.",
            "امسحها (من غير سؤال).",
            "اعمل يوزر واسأل الباسورد.",
            "السيرفر بيقبل اتصالات؟ (بيرجع 0 لو أيوه).",
            "القواعد من الترمنال."
          ]
        }
      ]
    },
    {
      t: "الإدارة: يوزرز وأداء وصيانة",
      l: 2,
      n: "التطبيق ميشتغلش بـ postgres، والاستعلام البطيء ليه سبب تقدر تشوفه",
      items: [
        {
          cmd: "BEGIN و ROLLBACK",
          title: "UPDATE بإيدك على الإنتاج؟ جوه transaction",
          desc: "أي UPDATE أو DELETE بإيدك على قاعدة حقيقية: ابدأ بـ [[BEGIN]]، نفّذ، اقرا عدد الصفوف اللي psql طبعه واتأكد بـ SELECT، وبعدين [[COMMIT]] لو تمام أو [[ROLLBACK]] لو فيه حاجة غلط. ومتسيبش الـ transaction مفتوحة: بتمسك locks.",
          example: R`BEGIN;
UPDATE users SET plan = 'pro' WHERE id = 42;
SELECT id, plan FROM users WHERE id = 42;
ROLLBACK;
BEGIN;
DELETE FROM sessions WHERE expires_at < now() - interval '30 days';
COMMIT;`,
          try: "على قاعدة تجربة: BEGIN، و DELETE FROM users من غير WHERE، و SELECT count(*)، وبعدين ROLLBACK وشوف كل الصفوف رجعت.",
          deep: {
            why: "DELETE أو UPDATE من غير WHERE (أو بـ WHERE غلط) هو أشهر كارثة بإيد بني آدم. من غير transaction مفيش undo غير الباك أب.",
            how: R`psql افتراضيًا autocommit: كل أمر بيتحفظ لحظة ما يخلص. [[BEGIN]] بيفتح transaction، وكل اللي بعده مش نهائي ومحدش تاني شايفه.

psql بيطبع [[UPDATE 3]]، يعني ٣ صفوف: لو متوقع واحد وطلع ٣٠٠٠ اعمل [[ROLLBACK]]. [[COMMIT]] بيثبّت. أي error جوه الـ transaction بيخليها aborted ولازم ROLLBACK.

ولحماية إضافية حط [[\set ON_ERROR_ROLLBACK interactive]] في .psqlrc، أو [[\set AUTOCOMMIT off]] فكل أمر يستنى COMMIT.`,
            when: "أي تعديل بيانات بإيدك على الإنتاج. وقبل EXPLAIN ANALYZE على UPDATE أو DELETE.",
            mistakes: "تنسى الـ transaction مفتوحة وتروح، فتبقى idle in transaction ماسكة locks والموقع يعلّق. و COMMIT قبل ما تقرا عدد الصفوف."
          },
          lines: [
            "ابدأ transaction: مفيش حاجة نهائية من هنا.",
            "التعديل (psql بيطبع عدد الصفوف: اقراه).",
            "اتأكد بعينك.",
            "مش عاجبك؟ رجّع كل حاجة.",
            "transaction جديدة.",
            "امسح الـ sessions الأقدم من ٣٠ يوم.",
            "العدد مظبوط؟ ثبّت."
          ]
        },
        {
          cmd: "يوزرز وصلاحيات",
          title: "يوزر للتطبيق بأقل صلاحيات",
          desc: "التطبيق مش المفروض يتصل بيوزر postgres (superuser). يوزر خاص بيه بيقدر يقرا ويكتب في جداوله بس. لو الكود اتخترق، الضرر محدود.",
          example: R`CREATE ROLE app_user LOGIN PASSWORD 'strong-random-password';
GRANT CONNECT ON DATABASE app TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
CREATE ROLE readonly LOGIN PASSWORD 'x';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;`,
          try: "اعمل app_user واتصل بيه وجرّب [[DROP TABLE]]: المفروض يترفض.",
          flag: "script",
          deep: {
            why: "التطبيق متصل بـ postgres (superuser) معناه أي SQL injection أو bug يقدر يمسح كل القواعد. يوزر بأقل صلاحيات بيحدد الضرر.",
            how: R`في Postgres اليوزر اسمه role. [[CREATE ROLE ... LOGIN PASSWORD]] بيعمله ويسمحله يدخل.

الصلاحيات طبقات: [[CONNECT]] على القاعدة، وبعدين [[USAGE]] على الـ schema (public غالبًا) عشان يشوف اللي فيه، وبعدين على الجداول نفسها [[SELECT, INSERT, UPDATE, DELETE]]. و [[SEQUENCES]] لازمة عشان الأعمدة SERIAL و identity تشتغل في INSERT.

الفخ الأشهر: [[GRANT ... ON ALL TABLES]] بيطبّق على الجداول الموجودة دلوقتي بس. أول migration تعمل جدول جديد، app_user مش هيشوفه. [[ALTER DEFAULT PRIVILEGES]] بيحل ده: أي جدول جديد ياخد الصلاحيات دي لوحده. بس بيطبّق على الجداول اللي بيعملها اليوزر اللي نفّذ الأمر، فنفّذه بنفس اليوزر اللي بيشغّل الـ migrations.

يوزر readonly لأدوات التقارير و Metabase: SELECT بس.

وفي Supabase الصلاحيات دي معمولة جاهزة، والـ Row Level Security طبقة فوقها.`,
            when: "أول حاجة بعد ما تعمل القاعدة، قبل أول migration.",
            mistakes: "GRANT من غير DEFAULT PRIVILEGES، وبعد أول migration التطبيق يطلع permission denied على الجدول الجديد. والـ migrations بيوزر مختلف عن اللي عمل ALTER DEFAULT."
          },
          lines: [
            "يوزر جديد يقدر يدخل بباسورد.",
            "يقدر يتصل بالقاعدة.",
            "يقدر يشوف اللي في schema public.",
            "يقرا ويكتب في الجداول الموجودة دلوقتي.",
            "يستخدم الـ sequences (لازمة لأعمدة id التلقائية).",
            "وأي جدول جديد ياخد نفس الصلاحيات لوحده.",
            "ونفس الكلام للـ sequences الجديدة، وإلا INSERT في جدول جديد يفشل بـ permission denied for sequence.",
            "يوزر تاني للتقارير.",
            "قراية بس."
          ]
        },
        {
          cmd: "connection string و .pgpass",
          title: "متكتبش الباسورد كل مرة",
          desc: "الـ URL فيه كل حاجة: يوزر وباسورد وسيرفر وبورت وقاعدة وخيارات. متغيرات [[PGHOST]] و [[PGUSER]] بتخلي psql يعرفهم لوحده. و [[~/.pgpass]] ملف فيه الباسوردات بصلاحية 600، فمفيش باسورد في الأوامر ولا الـ history.",
          example: R`export PGHOST=localhost PGUSER=app_user PGDATABASE=app
psql
echo "localhost:5432:app:app_user:secret" >> ~/.pgpass && chmod 600 ~/.pgpass
psql "postgres://app_user@localhost/app?sslmode=require"
psql "$DATABASE_URL" -c "SELECT current_user, current_database();"`,
          try: "اعمل .pgpass واتصل من غير ما يسألك باسورد.",
          deep: {
            why: "باسورد القاعدة في كل أمر بيتحفظ في الـ history ويبان في [[ps]]. ومحتاج طريقة واحدة الأدوات كلها تفهمها.",
            how: R`كل أدوات Postgres (psql، pg_dump، createdb) بتقرا متغيرات البيئة [[PGHOST]] و [[PGPORT]] و [[PGUSER]] و [[PGDATABASE]] و [[PGPASSWORD]]. لو حددتهم، [[psql]] لوحدها بتتصل. بس [[PGPASSWORD]] في البيئة بيبان لأي عملية، فالأحسن .pgpass.

[[~/.pgpass]] سطر لكل اتصال: [[host:port:database:user:password]]، و [[*]] في أي خانة يعني أي قيمة. لازم صلاحية [[600]] وإلا Postgres بيتجاهله. أي أداة بتلاقي سطر مطابق بتاخد الباسورد منه.

الـ connection string: [[postgres://]] أو [[postgresql://]]، وبعده user:password@host:port/dbname، وبعد [[?]] خيارات زي [[sslmode=require]] و [[connect_timeout=5]] و [[application_name=api]]. لو الباسورد فيه رموز خاصة ([[@]] أو [[#]]) لازم URL encoding.

[[application_name]] مفيد: بيظهر في pg_stat_activity فتعرف الاتصال ده من التطبيق ولا من سكربت.`,
            when: ".pgpass على جهازك وعلى السيرفر لسكربتات الباك أب. PG* في CI.",
            mistakes: ".pgpass بصلاحية 644 فبيتجاهل بصمت. وباسورد فيه @ في الـ URL من غير encoding."
          },
          lines: [
            "حدد الاتصال في البيئة.",
            "دلوقتي psql لوحدها بتتصل.",
            "الباسورد في ملف بصلاحية 600، مفيش باسورد في الأوامر تاني.",
            "اتصال بـ SSL إجباري.",
            "جرّب الـ URL اللي في .env: مين انت وعلى أنهي قاعدة."
          ]
        },
        {
          cmd: "الوصول من بره",
          title: "listen_addresses و pg_hba",
          desc: "افتراضيًا Postgres بيسمع على localhost بس، وملف [[pg_hba.conf]] بيحدد مين يتصل منين وبأي طريقة. للوصول من جهازك للسيرفر الأصح SSH tunnel، مش فتح البورت.",
          example: R`sudo -u postgres psql -c "SHOW listen_addresses;"
sudo -u postgres psql -c "SHOW hba_file;"
sudo tail -5 /etc/postgresql/16/main/pg_hba.conf
ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
psql -h localhost -p 5433 -U app_user app`,
          try: "افتح tunnel للسيرفر واتصل بـ DBeaver على localhost:5433 من غير ما تفتح 5432 في الفايروول.",
          deep: {
            why: "عايز تفتح قاعدة السيرفر من DBeaver على جهازك. الغريزة تفتح 5432 في الفايروول، ودي أخطر غلطة ممكن تعملها.",
            how: R`طبقتين بيتحكموا في الوصول. [[listen_addresses]] في postgresql.conf: على إيه Postgres بيسمع، والافتراضي localhost بس. و [[pg_hba.conf]] (host-based authentication): جدول قواعد، كل سطر بيقول: نوع الاتصال (local أو host)، وأنهي قاعدة، وأنهي يوزر، ومن أنهي عنوان، وبأي طريقة (scram-sha-256، peer، reject). أول سطر يطابق هو اللي بيتطبق.

الطريقة الآمنة للوصول من جهازك: SSH tunnel. Postgres يفضل على localhost، وانت بتوصله من خلال SSH كأنك على السيرفر. DBeaver بيدعم SSH tunnel مباشرة في إعدادات الاتصال، فمش محتاج حتى الأمر.

لو لازم اتصال مباشر (سيرفر تطبيق تاني): [[listen_addresses = '*']]، وسطر في pg_hba للـ IP بتاعه بس بـ scram-sha-256، والفايروول يسمح للـ IP ده بس، و SSL إجباري ([[hostssl]] بدل host).

بعد تعديل pg_hba: [[SELECT pg_reload_conf()]]. بعد listen_addresses: ريستارت.`,
            when: "tunnel لأي وصول شخصي. فتح البورت بس لسيرفرات تانية بـ IP محدد.",
            mistakes: "[[host all all 0.0.0.0/0 md5]] في pg_hba مع listen '*': القاعدة مفتوحة للنت كله. البوتات هتلاقيها في ساعات."
          },
          lines: [
            "Postgres بيسمع على إيه (localhost افتراضيًا).",
            "فين ملف pg_hba.",
            "آخر قواعد الوصول: مين يدخل منين وبإيه.",
            "الطريقة الآمنة: tunnel، 5433 عندك يوصل لـ 5432 على السيرفر.",
            "اتصل عبر الـ tunnel."
          ]
        },
        {
          cmd: "الجلسات والأقفال",
          title: "مين متصل ومين معلّق مين",
          desc: "[[pg_stat_activity]] جدول فيه كل اتصال: بيعمل إيه، ومن إمتى، ومستني إيه. استعلام معلّق أو migration واقفة غالبًا بسبب lock. و [[pg_terminate_backend]] بيقفل اتصال.",
          example: R`SELECT pid, usename, state, now() - query_start AS age, left(query, 60) FROM pg_stat_activity WHERE state <> 'idle' ORDER BY age DESC;
SELECT count(*) FROM pg_stat_activity;
SELECT pid, wait_event_type, wait_event, left(query, 60) FROM pg_stat_activity WHERE wait_event IS NOT NULL;
SELECT pg_terminate_backend(12345);
SHOW max_connections;`,
          try: "افتح transaction في جلسة (BEGIN; UPDATE users ...) من غير COMMIT، وفي جلسة تانية جرّب نفس الـ UPDATE: هتتعلّق. شوفها في pg_stat_activity.",
          deep: {
            why: "الموقع علّق فجأة، أو migration واقفة من ١٠ دقايق. غالبًا استعلام ماسك lock والباقي مستنيه. لازم تشوف مين.",
            how: R`[[pg_stat_activity]] صف لكل اتصال. [[state]]: active بينفّذ، idle مستني أوامر، [[idle in transaction]] فتح transaction ومعملش commit (وده خطر: ماسك locks ومش بيعمل حاجة). [[query]] آخر استعلام. و [[now() - query_start]] من إمتى.

[[wait_event_type]] و [[wait_event]]: الاستعلام مستني إيه. [[Lock]] معناه مستني lock من اتصال تاني. [[pg_blocking_pids(pid)]] بيقولك مين ماسكه.

السيناريو الكلاسيكي: transaction من التطبيق فضلت مفتوحة (bug أو اتصال اتقطع)، وماسكة lock على صف، وأي UPDATE للصف ده بيستنى، والاتصالات بتتراكم لحد max_connections والموقع يقع.

[[pg_terminate_backend(pid)]] بيقفل الاتصال ويرجّع الـ transaction. [[pg_cancel_backend]] ألطف: يلغي الاستعلام الحالي بس.

و [[max_connections]] (الافتراضي 100) لما يخلص، أي اتصال جديد بيفشل بـ too many connections، والحل pooling مش رفع الرقم.`,
            when: "الموقع بطيء أو معلّق. قبل أي migration على جدول كبير. too many connections.",
            mistakes: "terminate لاتصال الـ migration نفسه. وإنك تعالج too many connections برفع max_connections بدل pooler."
          },
          lines: [
            "الاتصالات اللي بتعمل حاجة، مرتبة بالأقدم، مع أول 60 حرف من الاستعلام.",
            "عدد الاتصالات.",
            "مين مستني إيه (Lock يعني مستني اتصال تاني).",
            "اقفل اتصال برقمه.",
            "الحد الأقصى للاتصالات."
          ]
        },
        {
          cmd: "الحجم",
          title: "إيه اللي واكل المساحة",
          desc: "القاعدة كبرت ومش عارف ليه. الدوال دي بتقولك حجم كل قاعدة وجدول و index بشكل مقروء.",
          example: R`SELECT pg_size_pretty(pg_database_size('app'));
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS size FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;
SELECT indexrelname, pg_size_pretty(pg_relation_size(indexrelid)) FROM pg_stat_user_indexes ORDER BY pg_relation_size(indexrelid) DESC LIMIT 10;
\dt+`,
          try: "شوف أكبر ٣ جداول في قاعدتك. غالبًا جدول لوجات أو sessions ممكن ينضّف.",
          deep: {
            why: "القاعدة كبرت من ٢ لـ ٢٠ جيجا، والباك أب بقى بطيء، والديسك بيقرّب يتملى. لازم تعرف مين.",
            how: R`[[pg_database_size]] حجم قاعدة، و [[pg_size_pretty]] بيحوّل البايت لـ MB/GB.

[[pg_total_relation_size]] حجم الجدول بكل حاجته: البيانات، والـ indexes، والـ TOAST (الأعمدة الكبيرة زي text و jsonb بتتخزن في جدول جانبي). [[pg_relation_size]] البيانات بس. والفرق بينهم بيقولك الـ indexes واكلة قد إيه.

جداول النظام [[pg_stat_user_tables]] و [[pg_stat_user_indexes]] فيها كل جداولك و indexes بتاعتك مع إحصائيات، والاستعلامات في المثال بترتبهم بالحجم.

[[\dt+]] و [[\di+]] اختصار بيعرض الحجم في العمود الأخير.

أشهر المتهمين: جداول لوجات أو audit مبتتنضفش، و sessions قديمة، و indexes مش مستخدمة، و bloat (صفوف ميتة محتاجة VACUUM).`,
            when: "شهريًا. ولما الباك أب أو الديسك يكبر فجأة.",
            mistakes: "تمسح صفوف قديمة وتستغرب إن الحجم منقصش. DELETE بيعلّم الصفوف بس، و VACUUM بيحرر المساحة للاستخدام، و VACUUM FULL بس اللي بيرجّعها للنظام (وبيقفل الجدول)."
          },
          lines: ["حجم القاعدة كلها.", "أكبر ١٠ جداول (بيانات و indexes).", "أكبر ١٠ indexes.", "الجداول بحجمها."]
        },
        {
          cmd: "الـ indexes",
          title: "الاستعلام بطيء لأن مفيش index",
          desc: R`من غير index، [[WHERE email = ...]] بيقرا الجدول كله. الـ index زي فهرس الكتاب. [[\di]] بيعرضهم، و [[pg_stat_user_indexes]] بيقولك مين بيتستخدم ومين لأ. الـ index اللي مش بيتستخدم بيبطّئ الكتابة من غير فايدة.`,
          example: R`\di
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);
CREATE INDEX CONCURRENTLY idx_orders_status_created ON orders (status, created_at DESC);
SELECT indexrelname, idx_scan FROM pg_stat_user_indexes WHERE idx_scan = 0 AND indexrelname NOT LIKE '%pkey';
DROP INDEX CONCURRENTLY idx_unused;`,
          try: R`اعمل جدول بمليون صف بـ [[generate_series]]، وقيس استعلام WHERE قبل وبعد الـ index بـ [[\timing]].`,
          deep: {
            why: "نفس الاستعلام بياخد ٢ ثانية على مليون صف و ٢ ملي ثانية مع index. الفرق ألف مرة. ومعظم مشاكل الأداء index ناقص.",
            how: R`الـ index هيكل منفصل (B-tree غالبًا) بيحفظ قيم عمود مرتبة مع مؤشر للصف. [[WHERE email = 'x']] من غيره: Seq Scan، بيقرا كل الصفوف. معاه: Index Scan، بيلاقي القيمة في الشجرة ويروح للصف مباشرة.

الـ primary key و UNIQUE بيعملوا index لوحدهم. الـ foreign key لأ، وده أشهر index ناقص: [[orders.user_id]] من غير index معناه كل [[WHERE user_id = ...]] و كل JOIN على users بطيء.

[[CONCURRENTLY]] بيبني الـ index من غير ما يقفل الجدول للكتابة، فالموقع شغال أثناء البناء. أبطأ ومينفعش جوه transaction، بس على الإنتاج إجباري.

index مركب [[(status, created_at DESC)]] بيخدم [[WHERE status = 'paid' ORDER BY created_at DESC]]، والترتيب فيه مهم: العمود اللي بتساوي فيه الأول.

الـ indexes مش مجانية: كل INSERT و UPDATE بيحدّثهم. [[idx_scan = 0]] معناه عمره ما اتستخدم من آخر reset للإحصائيات، وغالبًا يتشال.`,
            when: "كل foreign key. كل عمود في WHERE أو ORDER BY متكرر. وبعد EXPLAIN يوريك Seq Scan على جدول كبير.",
            mistakes: "CREATE INDEX من غير CONCURRENTLY على الإنتاج فيقفل الجدول دقايق. و index على كل عمود «احتياطي» فالكتابة تبطأ."
          },
          lines: [
            "الـ indexes الموجودة.",
            "index على foreign key، من غير قفل الجدول.",
            "index مركب لاستعلام بيفلتر بالحالة ويرتب بالتاريخ.",
            "indexes عمرها ما اتستخدمت (غير الـ primary keys).",
            "امسح واحد من غير قفل."
          ]
        },
        {
          cmd: "EXPLAIN ANALYZE",
          title: "اقرا خطة الاستعلام",
          desc: "بيوريك Postgres هينفّذ الاستعلام إزاي: هيقرا الجدول كله (Seq Scan) ولا هيستخدم index (Index Scan)، وكل خطوة أخدت قد إيه. أهم أداة لتشخيص البطء.",
          example: R`EXPLAIN SELECT * FROM orders WHERE user_id = 42;
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.status = 'paid';`,
          try: "شغّل EXPLAIN ANALYZE على أبطأ استعلام عندك، ودوّر على Seq Scan على جدول كبير. ده مكان الـ index الناقص.",
          deep: {
            why: "«الاستعلام بطيء» مش تشخيص. EXPLAIN بيقولك بالظبط Postgres بيعمل إيه وأنهي خطوة بتاخد الوقت.",
            how: R`[[EXPLAIN]] بيعرض الخطة من غير تنفيذ: تقديرات. [[EXPLAIN ANALYZE]] بينفّذ فعلًا ويعرض الأرقام الحقيقية جنب التقديرات. خد بالك: بينفّذ، فمع UPDATE أو DELETE لفّه في transaction واعمل ROLLBACK.

الخطة شجرة، بتتقري من جوه لبره (الأكتر مسافة بادئة بيتنفذ الأول). كل سطر عقدة: نوعها، والتكلفة المقدرة [[cost=]]، والوقت الفعلي [[actual time=]]، وعدد الصفوف المتوقع [[rows=]] والفعلي.

أهم أنواع: [[Seq Scan]] قراية الجدول كله (على جدول صغير طبيعي، على كبير مشكلة). [[Index Scan]] استخدام index. [[Index Only Scan]] أحسن، كل اللي محتاجه في الـ index. [[Nested Loop]] و [[Hash Join]] طرق الـ JOIN. [[Sort]] ترتيب، ولو [[external merge]] معناه work_mem مكفاش وبيرتب على الديسك.

الفرق الكبير بين rows المتوقعة والفعلية معناه الإحصائيات قديمة: [[ANALYZE]].

[[BUFFERS]] بيضيف كام صفحة اتقرت من الكاش (shared hit) ومن الديسك (read).

ولقراية خطة معقدة: explain.dalibo.com، تلزق الناتج ويرسمه.`,
            when: "أي استعلام أبطأ من ١٠٠ms. وقبل ما تضيف index، تتأكد إنه هيتستخدم.",
            mistakes: "EXPLAIN ANALYZE على DELETE من غير transaction. وتقرا الـ cost كأنه وقت، ده رقم نسبي."
          },
          lines: [
            "الخطة بالتقديرات من غير تنفيذ.",
            "الخطة بالأرقام الفعلية (بينفّذ).",
            "مع عدد الصفحات المقروءة من الكاش والديسك، لاستعلام فيه JOIN."
          ]
        },
        {
          cmd: "VACUUM و ANALYZE",
          title: "الصيانة اللي بتحصل لوحدها (غالبًا)",
          desc: "Postgres مش بيمسح الصفوف المحذوفة فورًا، بيعلّمها. [[VACUUM]] بينضّفها، و [[ANALYZE]] بيحدّث الإحصائيات اللي المخطط بيعتمد عليها. autovacuum بيعملهم لوحده، بس بعد حذف أو تحديث ضخم ممكن تحتاج تعملهم بإيدك.",
          example: R`VACUUM ANALYZE orders;
SELECT relname, n_dead_tup, last_autovacuum, last_autoanalyze FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;
SHOW autovacuum;
VACUUM (VERBOSE) orders;`,
          try: "بعد ما تمسح نص جدول كبير، شوف n_dead_tup قبل وبعد VACUUM.",
          deep: {
            why: "مسحت مليون صف والجدول لسه بنفس الحجم والاستعلامات بطيئة. Postgres محتاج ينضّف.",
            how: R`Postgres بيستخدم MVCC: لما تعمل UPDATE، مش بيعدّل الصف في مكانه، بيكتب نسخة جديدة ويعلّم القديمة ميتة. DELETE بيعلّم بس. ده بيخلي القراية والكتابة ميعطلوش بعض، بس الصفوف الميتة بتتراكم (bloat).

[[VACUUM]] بيمشي على الجدول ويحرر مكان الصفوف الميتة لإعادة الاستخدام (مش للنظام). [[ANALYZE]] بيحسب إحصائيات عن توزيع القيم، والمخطط بيستخدمها يقرر Index Scan ولا Seq Scan. إحصائيات قديمة = خطط غلط.

[[autovacuum]] عملية خلفية بتعمل الاتنين لوحدها لما نسبة الصفوف الميتة تعدّي حد. شغال افتراضيًا، ومتقفلوش أبدًا. بس بعد عملية ضخمة (حذف نص الجدول، أو استيراد كبير) اعمل [[VACUUM ANALYZE]] بإيدك بدل ما تستنى.

[[n_dead_tup]] في pg_stat_user_tables بيقولك كام صف ميت، و [[last_autovacuum]] آخر مرة.

[[VACUUM FULL]] بيعيد كتابة الجدول كله ويرجّع المساحة للنظام، بس بيقفل الجدول تمامًا. للطوارئ بس، أو pg_repack بديل من غير قفل.`,
            when: "بعد استيراد أو حذف ضخم. لما n_dead_tup كبير. وقبل قياس أداء.",
            mistakes: "تقفل autovacuum «عشان بياخد موارد». والجدول يتضخم والاستعلامات تبطأ تدريجيًا."
          },
          lines: [
            "نضّف الجدول وحدّث إحصائياته.",
            "الجداول اللي فيها أكتر صفوف ميتة، وآخر مرة اتنضّفت.",
            "autovacuum شغال؟ (لازم on).",
            "نضّف بتفاصيل."
          ]
        },
        {
          cmd: "الإعدادات",
          title: "SHOW و ALTER SYSTEM",
          desc: "إعدادات Postgres في [[postgresql.conf]]، بس ممكن تغيّرها من SQL بـ [[ALTER SYSTEM]] وتطبّقها بـ [[pg_reload_conf]] من غير ريستارت (لأغلبها). أهم إعدادين: [[shared_buffers]] (الكاش) و [[work_mem]] (لكل استعلام).",
          example: R`SHOW shared_buffers;
SHOW work_mem;
SELECT name, setting, unit, context FROM pg_settings WHERE name IN ('shared_buffers','work_mem','max_connections','effective_cache_size');
ALTER SYSTEM SET work_mem = '32MB';
SELECT pg_reload_conf();
SHOW config_file;`,
          try: "شوف shared_buffers الحالي. الافتراضي 128MB صغير: على سيرفر ٤ جيجا خليه 1GB (محتاج ريستارت).",
          deep: {
            why: "Postgres بييجي بإعدادات لجهاز صغير من ٢٠ سنة. [[shared_buffers]] 128MB على سيرفر ٨ جيجا معناه معظم الرام مش بتتستخدم.",
            how: R`[[SHOW]] بيعرض قيمة إعداد. [[pg_settings]] جدول فيه كل الإعدادات مع [[context]]: [[postmaster]] محتاج ريستارت، [[sighup]] reload كفاية، [[user]] ممكن يتغير في الجلسة.

[[ALTER SYSTEM SET]] بيكتب في ملف [[postgresql.auto.conf]] اللي بيتقري بعد postgresql.conf ويغطي عليه، فمش محتاج تعدّل الملف الأصلي. وبعده [[pg_reload_conf()]] للإعدادات اللي sighup، أو [[systemctl restart postgresql]] للباقي.

القيم اللي تبدأ بيها على سيرفر مخصص للقاعدة: [[shared_buffers]] ربع الرام. [[effective_cache_size]] تلات أرباع الرام (تقدير لكاش النظام، مش حجز). [[work_mem]] للترتيب والـ hash في كل استعلام، 16 لـ 64MB حسب عدد الاتصالات (بيتضرب في عدد العمليات المتزامنة). [[maintenance_work_mem]] لـ VACUUM و CREATE INDEX، 256MB وأكتر.

موقع pgtune.leopard.in.ua بيحسبلك القيم من مواصفات السيرفر.`,
            when: "بعد التسطيب على أي سيرفر. وبعد ترقية الرام.",
            mistakes: "work_mem كبير جدًا (1GB) مع 100 اتصال: كل استعلام ممكن ياخد جيجا والسيرفر يخلص رام."
          },
          lines: [
            "الكاش.",
            "ذاكرة كل استعلام.",
            "أهم ٤ إعدادات مع وحدتها وهل محتاجة ريستارت (context).",
            "غيّر إعداد (بيتكتب في postgresql.auto.conf).",
            "طبّق من غير ريستارت.",
            "فين ملف الإعدادات."
          ]
        },
        {
          cmd: "docker-entrypoint-initdb.d",
          title: "SQL بيتنفّذ أول مرة بس في Docker",
          desc: R`صورة postgres الرسمية بتنفّذ أي ملف [[.sql]] أو [[.sh]] في [[/docker-entrypoint-initdb.d]] بالترتيب الأبجدي، بس أول مرة الـ volume يتعمل وهو فاضي. بعد كده الفولدر بيتجاهل تمامًا.

وبنفس الطريقة [[POSTGRES_INITDB_ARGS]] بيوصل لـ initdb أول مرة بس.`,
          example: R`services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: $__{POSTGRES_PASSWORD}
      POSTGRES_DB: appdb
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
volumes:
  pg_data:`,
          try: "حط ملف [[01-schema.sql]] في db/init، وشغّل compose وشوف الجدول. بعدين ضيف [[02-more.sql]] واعمل [[docker compose up -d]]: مش هيتنفّذ. [[docker compose down -v]] (على التجربة بس) وارفع تاني: هيتنفّذ.",
          flag: "script",
          deep: {
            why: "عايز أي حد يعمل clone ويرفع compose يلاقي القاعدة فيها الـ schema والبيانات الأولية من غير خطوات بإيده.",
            how: R`الـ entrypoint بتاع الصورة بيبص على فولدر البيانات: لو فاضي، بيشغّل [[initdb]] (ومعاه [[POSTGRES_INITDB_ARGS]])، ويعمل اليوزر والقاعدة من المتغيرات، ويشغّل ملفات initdb.d بالترتيب بـ psql (بـ ON_ERROR_STOP)، وبعدين يشغّل Postgres عادي. لو فيه بيانات، بيعدّي كل ده.

عشان كده الترقيم [[01-]] و [[02-]] مهم، وأي error في ملف بيوقف الـ container أول مرة (شوف [[docker compose logs postgres]]).

[[--auth-host=scram-sha-256]]: الاتصالات بالشبكة تتطلب باسورد بـ scram بدل md5. و [[:ro]] الـ container يقرا الملفات بس.

الـ healthcheck بـ [[pg_isready]] بيرجع ناجح لما Postgres يقبل اتصالات، فالتطبيق يستنى بـ [[condition: service_healthy]]. وخلي بالك: أول مرة Postgres بيقوم مؤقت وقت تنفيذ ملفات init وبعدين يعيد التشغيل، فالـ healthcheck ممكن ينجح لحظة قبل الأوان؛ التطبيق لازم يعيد المحاولة على أي حال.`,
            when: "بيئة تطوير أو staging بتتعمل من الصفر. للإنتاج اللي شغال: migrations حقيقية (الدرس الجاي في المستوى ٣).",
            mistakes: "في مشروع حقيقي فولدر الـ migrations نفسه كان متركّب على initdb.d، والكل فاكر إن أي migration جديدة هتتطبق مع الديبلوي. هي اتطبقت أول مرة بس، وأي ملف بعد كده محتاج تشغيل بإيدك أو سكربت migrate. وتغيّر [[POSTGRES_PASSWORD]] أو [[POSTGRES_INITDB_ARGS]] وتستنى يأثروا على volume موجود: مش هيحصل."
          },
          lines: [
            "الخدمات.",
            "خدمة Postgres.",
            "نسخة محددة.",
            "المتغيرات:",
            "اليوزر.",
            "الباسورد من .env.",
            "القاعدة اللي تتعمل أول مرة.",
            "خيارات لـ initdb: باسوردات الشبكة بـ scram (أول مرة بس).",
            "التخزين:",
            "البيانات في volume.",
            "ملفات SQL تتنفّذ أول مرة بس، و ro للقراية.",
            "فحص الصحة:",
            "Postgres بيقبل اتصالات؟",
            "كل ٥ ثواني.",
            "تعريف الـ volumes.",
            "volume البيانات."
          ]
        }
      ]
    },
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
          ]
        },
        {
          cmd: "ترجيع الباك أب",
          title: "جرّبه قبل ما تحتاجه",
          desc: "الخطوة اللي الكل بينساها. قاعدة جديدة فاضية، ترجّع فيها، وتعدّ الصفوف وتقارن بالأصل. لو مجرّبتش، يوم الكارثة هتكتشف إن الباك أب ناقص أو مكسور.",
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        },
        {
          cmd: "pgcli",
          title: "psql بإكمال تلقائي",
          desc: "نفس psql بس بإكمال لأسامي الجداول والأعمدة وألوان. بيتسطب بـ pip. مفيد على جهازك، وعلى السيرفر psql العادي كفاية.",
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
          lines: ["سطّب.", "اتصل بـ URL.", "اتصل عبر tunnel."]
        }
      ]
    }
  ]
});
