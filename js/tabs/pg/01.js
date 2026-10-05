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
          ],
          sol: R`المفروض تشوف جدول صغير فيه عمود واحد اسمه [[now]] وصف واحد بالوقت الحالي بالـ timezone، زي [[2026-09-30 04:55:42.283158+00]] وتحته [[(1 row)]]. و [[\q]] بيرجّعك للترمنال من غير أي رسالة.

لو الـ prompt فضل [[app-#]] بدل [[app=#]] بعد ما دوست Enter، يبقى نسيت الـ [[;]] و psql مستني باقي الأمر: اكتب [[;]] ودوس Enter. ولو طلعلك [[Peer authentication failed for user "postgres"]] يبقى اتصلت بالسوكت المحلي بيوزر لينكس غير postgres: استخدم [[sudo -u postgres psql]] أو ضيف [[-h localhost]] مع باسورد. و [[connection refused]] معناها السيرفر مش شغال أو بيسمع على بورت تاني، اتأكد بـ [[pg_isready -h localhost]].`
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
          ],
          sol: R`[[\d users]] بيطلّع جدول فيه [[Column]] و [[Type]] و [[Nullable]] و [[Default]]، وتحته أقسام. على جدول users بسيط الناتج كان كده:

[[id | bigint | not null | nextval('users_id_seq'::regclass)]] يعني الـ id بيتولّد من sequence. وتحت [[Indexes:]] لقيت [["users_pkey" PRIMARY KEY, btree (id)]] و [["users_email_key" UNIQUE CONSTRAINT, btree (email)]]. وفي الآخر [[Referenced by:]] فيها [[TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)]]، يعني جدول تاني بيشاور على ده. ولو الجدول نفسه بيشاور على غيره هتلاقي قسم [[Foreign-key constraints:]].

الحاجات اللي تسأل نفسك عنها وانت بتقرا: فيه index على الأعمدة اللي بتعمل عليها WHERE؟ الأعمدة المهمة [[not null]]؟ الـ foreign keys عليها index (Postgres مش بيعمله لوحده على العمود اللي بيشاور)؟ ولو [[\d users]] قالك [[Did not find any relation named "users"]] يبقى انت في قاعدة غلط ([[\c]] للصح) أو الجدول في schema تانية ([[\dn]]).`
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
          ],
          sol: R`مع [[\x]] الصف بيتعرض عمودي: [[-[ RECORD 1 ]---]] وتحته كل عمود في سطر [[email | u2@x.com]]. و [[\timing]] بيطبع [[Timing is on.]] وبعد كل استعلام [[Time: ... ms]].

المقارنة الحقيقية محتاجة جدول كبير. على جدول فيه مليون صف: [[SELECT count(*) FROM big WHERE user_id = 4242]] أخد [[Time: 30.416 ms]] من غير index، وبعد [[CREATE INDEX idx_big_user ON big(user_id)]] نفس الاستعلام أخد [[Time: 0.678 ms]]، يعني أسرع بحوالي ٤٠ مرة.

الغلط الشائع: تجرّب على جدول فيه ٥ صفوف فتلاقي الاتنين [[1.5 ms]] و [[0.3 ms]] وتفتكر إن الـ index مالوش لازمة. على الجداول الصغيرة Postgres بيقرا الجدول كله أسرع من الـ index أصلًا. وخلي بالك إن أول تشغيل ممكن يبقى أبطأ عشان الداتا لسه مش في الـ cache، فشغّل كل استعلام مرتين وخد التاني.`
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
          ],
          sol: R`من غير ON_ERROR_STOP، psql بيطبع الـ error ويكمّل: في التجربة بملف فيه INSERT مكرر في النص الناتج كان [[CREATE TABLE]] و [[INSERT 0 1]] وبعدين [[psql:seed.sql:3: ERROR:  duplicate key value violates unique constraint "t1_pkey"]] وبعدين [[CREATE TABLE]] للجدول التاني، و exit code [[0]]. يعني السكربت أو الـ CI هيفتكر إن كله تمام.

مع [[-v ON_ERROR_STOP=1]] بيقف عند السطر 3: الجدول التاني متعملش، و exit code بقى [[3]]. ودا اللي عايزه في أي deploy.

خلي بالك إن الجدول الأول اتعمل في الحالتين، لأن كل أمر بيتنفذ لوحده. لو عايز الملف كله يا يتنفذ يا لأ ضيف [[--single-transaction]] (أو [[-1]]). الغلط الشائع إنك تبص على آخر سطر في الناتج بس وتفوّت الـ ERROR اللي في النص.`,
          solCode: R`cat > seed.sql <<'EOF'
CREATE TABLE t1 (id int PRIMARY KEY, name text);
INSERT INTO t1 VALUES (1, 'a');
INSERT INTO t1 VALUES (1, 'dup');
CREATE TABLE t2 (id int);
EOF
psql -d lab -f seed.sql; echo "exit=$?"
psql -d lab -c "DROP TABLE IF EXISTS t1, t2"
psql -d lab -v ON_ERROR_STOP=1 -f seed.sql; echo "exit=$?"
psql -d lab -v ON_ERROR_STOP=1 --single-transaction -f seed.sql; echo "exit=$?"`
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
          ],
          sol: R`التصدير بيطبع [[COPY 5]] (عدد الصفوف)، والملف أوله سطر الـ header: [[id,email,plan,created_at]] وبعده صف لكل user. وبعد ما تعدّل وتعمل جدول جديد بنفس الشكل وترجّع بـ FROM هتشوف [[COPY 5]] تاني، و SELECT على الصف اللي عدلته هيطلّع القيمة الجديدة.

[[\copy]] مش بيعمل الجدول: لو كتبت اسم جدول مش موجود هيقولك [[ERROR:  relation "users_new" does not exist]]. اعمله الأول بـ [[CREATE TABLE users_new (LIKE users INCLUDING DEFAULTS);]].

المشاكل الشائعة من Excel: بيغيّر شكل التواريخ لـ [[30/09/2026 04:55]] فيطلع [[invalid input syntax for type timestamp]] أو [[date/time field value out of range]]، وممكن يحفظ بـ separator [[;]] بدل [[,]] حسب إعدادات اللغة، أو يضيف BOM في أول الملف فالعمود الأول يبقى اسمه غريب. احفظ كـ «CSV UTF-8». ولو استخدمت [[COPY]] من غير الـ backslash هيدوّر على الملف على السيرفر مش جهازك، ويقولك [[could not open file]] أو [[must be superuser or have privileges of the pg_read_server_files role]].`,
          solCode: R`\copy users TO 'users.csv' CSV HEADER
-- عدّل users.csv واحفظه CSV UTF-8
CREATE TABLE users_import (LIKE users INCLUDING DEFAULTS);
\copy users_import FROM 'users.csv' CSV HEADER
SELECT id, email, plan FROM users_import ORDER BY id;`
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
          ],
          sol: R`السكربت بيطبع [[users: 5]] (أو عدد الصفوف عندك) من غير مسافات ولا header، بفضل [[-t]] و [[-A]]. وتشغيل سطر إنشاء القاعدة أول مرة بيعمل القاعدة، وتاني مرة [[grep -q 1]] بيلاقي الـ 1 فالـ [[||]] مش بيشغّل createdb، والسكربت بيخرج بـ 0 من غير أي رسالة.

قارن بـ [[createdb lab_test]] لوحده مرتين: التانية بتقول [[createdb: error: database creation failed: ERROR:  database "lab_test" already exists]] و exit 1، ومع [[set -e]] السكربت كله يقع.

الغلط الشائع: تنسى [[-A]] فيبقى [[COUNT]] فيه مسافات زي [["     5"]] والمقارنات تبوظ، أو تنسى [[-t]] فالمتغير يبقى فيه [[count]] و [[-------]] و [[(1 row)]].`,
          solCode: R`#!/usr/bin/env bash
set -euo pipefail
COUNT=$(psql -X -d lab -tAc "SELECT count(*) FROM users")
echo "users: $COUNT"
psql -X -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'lab_test'" | grep -q 1 || createdb lab_test`
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
          ],
          sol: R`[[createdb]] و [[dropdb]] لما ينجحوا مش بيطبعوا حاجة خالص. في [[psql -l]] بعد الإنشاء هتلاقي سطر [[app_test | postgres | UTF8 | ...]]، وبعد [[dropdb]] السطر يختفي (اتأكد بـ [[psql -l | grep app_test]]: مش هيطلع حاجة).

لو dropdb قالك [[database "app_test" is being accessed by other users]] يبقى فيه جلسة مفتوحة عليها (غالبًا psql تاني عندك أو التطبيق): اقفلها، أو في PG 13+ استخدم [[dropdb --force app_test]]. ولو createdb قالك [[already exists]] فالاسم مستخدم.

واتعلمها كعادة: قبل [[dropdb]] اقرا الاسم مرتين. dropdb مالوش undo، وعلى سيرفر مشترك ممكن قاعدة بنفس الاسم تبقى بتاعة حد تاني.`
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
          ],
          sol: R`الترتيب اللي هتشوفه: [[BEGIN]]، وبعدين [[DELETE 5]] (عدد صفوف الجدول)، و [[SELECT count(*)]] جوه نفس الـ transaction بيرجّع [[0]]، وبعد [[ROLLBACK]] نفس الـ SELECT بيرجّع [[5]] تاني. الـ prompt نفسه بيتغير لـ [[app=*#]] طول ما فيه transaction مفتوحة.

الفكرة إن الـ DELETE اتعمل فعلًا بس محدش شافه غير جلستك لحد ما تعمل COMMIT. أي جلسة تانية كانت هتشوف ٥ صفوف طول الوقت.

الأخطاء الشائعة: تنسى BEGIN فالـ DELETE يتنفذ ويتحفظ فورًا (psql بيعمل autocommit)، وبعدها ROLLBACK بيطلّع [[WARNING:  there is no transaction in progress]]. أو تعمل error جوه الـ transaction فكل اللي بعده يترفض بـ [[current transaction is aborted]] لحد ما تعمل ROLLBACK. ولو في جدول تاني بيشاور على users بـ foreign key، الـ DELETE نفسه ممكن يترفض بـ [[violates foreign key constraint]].`
        },
        {
          cmd: "يوزرز وصلاحيات",
          title: "يوزر للتطبيق بأقل صلاحيات",
          desc: R`اليوزر [[postgres]] superuser: يقدر يمسح أي قاعدة ويقرا أي حاجة. لو تطبيقك متصل بيه والكود اتخترق (SQL injection مثلًا)، المهاجم ماسك كل حاجة. الحل يوزر خاص بالتطبيق، يقرا ويكتب في جداوله وبس. في Postgres اليوزر اسمه role، و [[CREATE ROLE ... LOGIN PASSWORD]] بيعمله ويسمحله يدخل بباسورد.

الصلاحيات طبقات لازم كلها: [[GRANT CONNECT ON DATABASE]] يدخل القاعدة، و [[USAGE ON SCHEMA public]] يشوف اللي جوه الـ schema، و [[SELECT, INSERT, UPDATE, DELETE ON ALL TABLES]] يقرا ويضيف ويعدّل ويمسح صفوف (من غير ما يقدر يمسح الجدول نفسه). و [[SEQUENCES]] لازمة عشان الـ id اللي بيزيد لوحده يشتغل مع INSERT.

[[GRANT ... ON ALL TABLES]] بيطبّق على الجداول الموجودة دلوقتي بس، فـ [[ALTER DEFAULT PRIVILEGES]] بيدّي نفس الصلاحيات لأي جدول جديد هيتعمل بعدين. و [[readonly]] في الآخر يوزر للتقارير، [[SELECT]] بس. حط باسورد طويل عشوائي حقيقي مكان المثال.`,
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
          ],
          sol: R`لما تتصل كـ app_user وتعمل [[DROP TABLE users;]] الرد: [[ERROR:  must be owner of table users]]. و [[SELECT count(*) FROM users]] بيشتغل عادي. ولو جرّبت [[CREATE TABLE x (id int);]] هتاخد [[ERROR:  permission denied for schema public]]، لأن من PG 15 اليوزر العادي مالوش CREATE على public.

دا بالظبط المطلوب: التطبيق يقرا ويكتب بس، ولو حد عمل SQL injection مش هيقدر يمسح جداول. الـ migrations تشتغل بيوزر تاني صاحب الجداول.

لو الـ DROP اشتغل يبقى انت متصل بالـ owner أو superuser: اعمل [[SELECT current_user;]]. ولو الـ SELECT نفسه اترفض بـ [[permission denied for table users]] يبقى الجداول اتعملت بعد الـ GRANT، ودا اللي [[ALTER DEFAULT PRIVILEGES]] بيحله للجداول الجاية (بشرط تتعمل بنفس اليوزر اللي نفّذ الأمر).`,
          solCode: R`-- كـ postgres
CREATE ROLE app_user LOGIN PASSWORD 'secret';
GRANT CONNECT ON DATABASE lab TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- من الترمنال
psql -h localhost -U app_user -d lab -c "DROP TABLE users"
-- ERROR:  must be owner of table users
psql -h localhost -U app_user -d lab -c "SELECT count(*) FROM users"`
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
          ],
          sol: R`بعد ما تعمل الملف و [[chmod 600]]، [[psql -h localhost -U app_user -d app]] بيدخل على طول من غير [[Password for user app_user:]]. و [[SELECT current_user, current_database();]] بيرجّع [[app_user | app]].

لو نسيت الـ chmod، psql بيطبع [[WARNING: password file "/home/you/.pgpass" has group or world access; permissions should be u=rw (0600) or less]] ويتجاهل الملف، فيسألك عن الباسورد تاني. ولو لسه بيسألك: السطر لازم يطابق بالظبط الـ host (لو كتبت [[localhost]] في الملف واتصلت بـ [[127.0.0.1]] مش هيطابق)، والبورت والقاعدة واليوزر. وتقدر تحط [[*]] في أي خانة.

وخلي بالك: من غير [[-h]] psql بيتصل بالسوكت، ولو الـ auth هناك peer مش هيبص على الباسورد أصلًا.`,
          solCode: R`echo "localhost:5432:app:app_user:secret" >> ~/.pgpass
chmod 600 ~/.pgpass
psql -h localhost -U app_user -d app -c "SELECT current_user, current_database();"`
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
          ],
          sol: R`الأمر [[ssh -N -L 5433:127.0.0.1:5432 deploy@SERVER]] مش بيطبع حاجة وبيفضل واقف. دا الطبيعي: الـ tunnel شغال طول ما الأمر شغال. في DBeaver تحط Host [[localhost]] و Port [[5433]] واليوزر والباسورد بتوع Postgres، و Test Connection يقول Connected. ومن ترمنال تاني [[psql -h localhost -p 5433 -U app_user app]] يدخل.

وتتأكد إن البورت مش مفتوح للعالم: من جهازك [[nc -zv SERVER 5432]] المفروض يفشل (timeout أو refused)، و [[SHOW listen_addresses;]] على السيرفر يفضل [[localhost]].

المشاكل الشائعة: [[bind [127.0.0.1]:5433: Address already in use]] يعني عندك Postgres محلي أو tunnel قديم على البورت، غيّر الرقم. و DBeaver يقولك [[Connection refused]] لما الـ tunnel يكون وقع (قفلت الترمنال). والغلط الأخطر إنك تحل المشكلة بـ [[listen_addresses = '*']] وفتح 5432 في الفايروول.`
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
          ],
          sol: R`الجلسة التانية بتفضل واقفة بعد الـ UPDATE من غير أي رسالة. و pg_stat_activity من جلسة تالتة بيطلّع حاجة زي:

الجلسة الأولى بـ [[state = idle in transaction]] (خلصت الـ UPDATE ومستنية COMMIT)، والتانية بـ [[state = active]] و [[wait_event_type = Lock]] و [[wait_event = transactionid]] والـ query بتاعها هو الـ UPDATE. يعني التانية مستنية الـ transaction بتاعة الأولى تخلص.

أول ما تعمل COMMIT أو ROLLBACK في الأولى، التانية تكمّل فورًا وتطبع [[UPDATE 1]]. الدرس: [[idle in transaction]] لفترة طويلة هو غالبًا سبب «القاعدة واقفة». ولو التانية ما اتعلقتش، يبقى الأولى مكانش فيها BEGIN (اتعملت commit لوحدها) أو الـ UPDATE التاني على صف مختلف. وحط [[SET lock_timeout = '5s';]] في التانية عشان تشوف [[canceling statement due to lock timeout]] بدل الانتظار للأبد.`,
          solCode: R`-- جلسة 1
BEGIN;
UPDATE users SET plan = 'pro' WHERE id = 1;
-- جلسة 2 (هتتعلق)
UPDATE users SET plan = 'x' WHERE id = 1;
-- جلسة 3
SELECT pid, state, wait_event_type, wait_event, left(query, 50)
FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid();`
        },
        {
          cmd: "الحجم",
          title: "إيه اللي واكل المساحة",
          desc: R`لما الديسك يتملى أو القاعدة تبطأ، أول سؤال: مين واكل المساحة؟ [[pg_database_size('app')]] بيرجع حجم القاعدة كلها بالبايت، و [[pg_size_pretty]] بتحوّله لشكل مقروء زي [[245 MB]].

السطر التاني بيجيب أكبر 10 جداول: [[pg_total_relation_size]] حجم الجدول بكل حاجته (البيانات والـ indexes والأعمدة الكبيرة)، و [[pg_statio_user_tables]] جدول نظام فيه جداولك انت بس، و [[ORDER BY ... DESC LIMIT 10]] رتّب من الأكبر وخد 10. التالت نفس الفكرة للـ indexes بـ [[pg_relation_size]] و [[pg_stat_user_indexes]]. و [[\dt+]] اختصار في psql بيعرض كل الجداول وحجمها في عمود Size.

خد بالك: [[DELETE]] مش بيصغّر الملف على الديسك على طول؛ الصفوف بتتعلّم ميتة، و VACUUM بيخلي مكانها يتعاد استخدامه.`,
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
          lines: ["حجم القاعدة كلها.", "أكبر ١٠ جداول (بيانات و indexes).", "أكبر ١٠ indexes.", "الجداول بحجمها."],
          sol: R`الاستعلام بيرجّع [[relname | size]] مترتبين من الأكبر. في قاعدة التجربة كان [[big | 82 MB]] وبعده [[users | 48 kB]] و [[orders | 16 kB]]. في مشروع حقيقي غالبًا هتلاقي فوق جدول زي [[sessions]] أو [[audit_logs]] أو [[notifications]] بحجم أكبر من الداتا المهمة نفسها.

خلي بالك إن [[pg_total_relation_size]] بيحسب الجدول والـ indexes والـ TOAST، فالرقم أكبر من اللي في [[\dt+]] (دا بيعرض الجدول بس). والقرار بعدها مش إنك تمسح وخلاص: حط سياسة (مثلًا امسح sessions المنتهية من ٣٠ يوم) بـ cron.

المفاجأة الشائعة: تمسح نص الجدول والحجم ما يقلّش. دا طبيعي، [[VACUUM]] العادي بيخلي المساحة متاحة لإعادة الاستخدام جوه الجدول بس، ودا موضوع درس VACUUM.`
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
          ],
          sol: R`على جدول مليون صف من [[generate_series]] الأرقام اللي طلعت: [[SELECT count(*) FROM big WHERE user_id = 4242]] أخد حوالي [[30 ms]] من غير index، وإنشاء الـ index أخد [[393 ms]]، ونفس الاستعلام بعده بقى [[0.678 ms]].

الأرقام عندك هتختلف حسب الجهاز، بس الفرق لازم يبقى عشرات المرات. ولو ما لقيتش فرق: يا الاستعلام بيرجّع جزء كبير من الجدول (Postgres بيفضّل الـ Seq Scan لو هترجع مثلًا ٣٠٪ من الصفوف)، يا الـ WHERE عامل حاجة على العمود زي [[lower(email)]] فالـ index العادي مش بيستخدم. واعمل [[ANALYZE big;]] بعد إنشاء الجدول عشان الـ planner يعرف حجمه.

وخلي بالك: [[CREATE INDEX CONCURRENTLY]] مينفعش جوه BEGIN، هيقولك [[cannot run inside a transaction block]].`,
          solCode: R`CREATE TABLE big AS
  SELECT g AS id, (random() * 100000)::int AS user_id, md5(g::text) AS note
  FROM generate_series(1, 1000000) g;
ANALYZE big;
\timing on
SELECT count(*) FROM big WHERE user_id = 4242;
CREATE INDEX idx_big_user ON big (user_id);
SELECT count(*) FROM big WHERE user_id = 4242;`
        },
        {
          cmd: "EXPLAIN ANALYZE",
          title: "اقرا خطة الاستعلام",
          desc: R`لما استعلام يبقى بطيء، [[EXPLAIN]] بيوريك Postgres ناوي ينفّذه إزاي (الخطة) من غير ما ينفّذه: هيقرا الجدول كله صف صف ([[Seq Scan]]) ولا هيستخدم index ويروح للصفوف المطلوبة على طول ([[Index Scan]]). الأرقام هنا تقديرات: [[cost]] رقم نسبي مش وقت، و [[rows]] عدد الصفوف المتوقع.

[[EXPLAIN ANALYZE]] بينفّذ الاستعلام فعلًا ويضيف الأرقام الحقيقية: [[actual time]] بالمللي ثانية وعدد الصفوف الفعلي، وفي الآخر [[Execution Time]]. و [[(ANALYZE, BUFFERS, FORMAT TEXT)]] بيضيف كمان كام صفحة اتقرت من الذاكرة وكام من الديسك. الخطة شجرة: السطور اللي داخلة لجوه أكتر بتتنفّذ الأول.

أشهر اكتشاف: [[Seq Scan]] على جدول كبير في عمود بتفلتر بيه، يعني ناقصه index. وخد بالك: ANALYZE بينفّذ بجد، فمع [[UPDATE]] أو [[DELETE]] لفّه في [[BEGIN]] و [[ROLLBACK]].`,
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
          ],
          sol: R`على عمود من غير index هتشوف حاجة زي:

[[Parallel Seq Scan on big (actual time=32.013..32.013 rows=0 loops=3)]] و [[Filter: (note = 'abc'::text)]] و [[Rows Removed by Filter: 333333]] و [[Execution Time: 43.563 ms]]. الـ [[Rows Removed by Filter]] الكبيرة هي الإشارة: قرينا مليون صف عشان نرجّع صفر.

وعلى عمود عليه index: [[Bitmap Index Scan on idx_big_user]] مع [[Index Cond: (user_id = 4242)]] و [[Execution Time: 0.054 ms]]. أحيانًا تشوف [[Index Scan]] بدل Bitmap، الاتنين معناهم إن الـ index اشتغل.

متقلقش من Seq Scan على جدول صغير أو استعلام بيرجّع أغلب الجدول، دا الصح. قارن كمان [[rows=]] المتوقعة بالـ actual: لو الفرق ضخم (متوقع 1 وطلع 50000) يبقى الإحصائيات قديمة و [[ANALYZE]] هيحسّن الخطة. وخلي بالك إن EXPLAIN ANALYZE بينفّذ الاستعلام فعلًا، فمع UPDATE أو DELETE حطه جوه BEGIN و ROLLBACK.`
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
          ],
          sol: R`بعد [[DELETE FROM big WHERE id % 2 = 0]] على مليون صف، [[pg_stat_user_tables]] طلّع [[n_live_tup = 500000]] و [[n_dead_tup = 500000]]. بعد [[VACUUM big;]] بقى [[n_dead_tup = 0]].

بس الحجم فضل [[82 MB]] قبل وبعد. ودي النقطة المهمة: VACUUM العادي بيعلّم المساحة إنها فاضية لإعادة الاستخدام جوه الجدول، مش بيرجّعها للديسك. [[VACUUM FULL]] بيرجّعها بس بيقفل الجدول كله وهو شغال.

لو [[n_dead_tup]] لسه بصفر بعد الـ DELETE على طول: الإحصائيات بتتحدّث بتأخير بسيط، استنى ثانية. ولو لقيتها صفر من غير ما تعمل VACUUM يبقى الـ autovacuum سبقك، وهتلاقي [[last_autovacuum]] فيه وقت.`,
          solCode: R`DELETE FROM big WHERE id % 2 = 0;
SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables WHERE relname = 'big';
SELECT pg_size_pretty(pg_total_relation_size('big'));
VACUUM big;
SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables WHERE relname = 'big';
SELECT pg_size_pretty(pg_total_relation_size('big'));`
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
          ],
          sol: R`[[SHOW shared_buffers;]] على تثبيت جديد بيرجّع [[128MB]]. و في [[pg_settings]] هتلاقيه [[setting = 16384]] و [[unit = 8kB]] (يعني 16384 × 8kB = 128MB) و [[context = postmaster]]، ودي معناها إنه محتاج ريستارت.

بعد [[ALTER SYSTEM SET shared_buffers = '1GB';]] و [[SELECT pg_reload_conf();]]، الـ SHOW لسه هيقول [[128MB]]، ودا الغلط الشائع: تفتكر الإعداد ما اتحفظش. [[SELECT pending_restart FROM pg_settings WHERE name = 'shared_buffers';]] هيقولك [[t]]. بعد [[sudo systemctl restart postgresql]] (أو ريستارت الـ container) هيبقى [[1GB]].

على العكس، [[work_mem]] الـ context بتاعه [[user]] فيتطبق بعد reload. و ALTER SYSTEM بيكتب في [[postgresql.auto.conf]] جوه مجلد الداتا، مش في postgresql.conf.`
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
          ],
          sol: R`أول [[docker compose up -d]] بفولدر فيه [[01-schema.sql]]: في [[docker compose logs postgres]] هتلاقي [[running /docker-entrypoint-initdb.d/01-schema.sql]]، و [[\dt]] بيطلّع جدولك.

بعد ما تضيف [[02-more.sql]] و [[docker compose up -d]]: الجدول الجديد مش موجود. ولو عملت restart هتلاقي في اللوج [[PostgreSQL Database directory appears to contain a database; Skipping initialization]]. السكربتات بتشتغل مرة واحدة بس لما الـ volume يكون فاضي.

بعد [[docker compose down -v]] و [[up]] تاني: الاتنين اتنفذوا بالترتيب و [[\dt]] فيه الجدولين، بس كل الداتا القديمة راحت. لو السكربت نفسه فيه error الـ container بيقع في الـ init؛ صلّح الملف وامسح الـ volume تاني، لأن init نص مخلص ممكن يسيب الـ volume مش فاضي. ولو الملف مش بيتقري خالص اتأكد إن امتداده [[.sql]] أو [[.sh]] أو [[.sql.gz]] وإنه readable.`
        }
      ]
    }
  ]
});
