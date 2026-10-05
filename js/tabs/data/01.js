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

TAB("data", {
  label: "SQL و Prisma",
  prompt: "$ ",
  lab: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:17
docker exec -it pg psql -U postgres`,
  labText: "تاب PostgreSQL بيعلّمك تدير القاعدة؛ التاب ده بيعلّمك تكتب SQL وتصمم الجداول وتستخدمها من الكود.",
  levels: {"1":["SQL","SELECT و WHERE و INSERT و UPDATE و DELETE و ORDER و GROUP"],"2":["التصميم والعلاقات","الجداول والعلاقات و joins و constraints و indexes و transactions"],"3":["من الكود والانترفيو","Prisma، و Supabase، و Mongoose، و N+1، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الجداول وأنواع البيانات",
      l: 1,
      n: "القاعدة جداول، وكل عمود ليه نوع بيرفض الداتا الغلط. هنشتغل على متجر واحد: users و products و orders و order_items",
      items: [
        {
          cmd: "مقدمة قواعد البيانات و SQL",
          title: "يعني إيه database، وليه مش شيت Excel أو ملف JSON، و SQL بتعمل إيه؟",
          desc: R`الـ database (قاعدة البيانات) برنامج متخصص في إنه يخزّن الداتا ويرجّعهالك بسرعة ومن غير ما تبوظ. أي تطبيق فيه يوزرز أو منتجات أو أوردرات بيحفظهم في database.

طب ليه مش ملف Excel أو JSON؟
• الحجم والسرعة: مع [[index]] القاعدة بتلاقي صف واحد وسط ملايين الصفوف من غير ما تقرا الملف كله.
• كذا حد في نفس الوقت: لو يوزرين اشتروا آخر قطعة في نفس اللحظة، القاعدة عندها transactions بتمنع إن الاتنين ياخدوها. ملف JSON لو اتكتب من مكانين في نفس الوقت ممكن يبوظ.
• بترفض الداتا الغلط: تقدر تقول «الإيميل إجباري» أو «السعر رقم»، والقاعدة ترفض أي صف مخالف حتى لو الكود بتاعك فيه bug.

النوع اللي هنشتغل عليه اسمه relational database، زي PostgreSQL و MySQL و SQLite. الداتا فيه جداول:
• الجدول (table): نوع حاجة واحد، زي products أو users.
• العمود (column): خاصية ليها اسم ونوع ثابت، زي name نص و price رقم.
• الصف (row): حاجة واحدة كاملة، زي منتج واحد.

و [[SQL]] (Structured Query Language) هي اللغة اللي بتكلّم بيها القاعدة. أهم ٤ عمليات اسمهم مع بعض CRUD: Create بـ [[INSERT]]، و Read بـ [[SELECT]]، و Update بـ [[UPDATE]]، و Delete بـ [[DELETE]].

شوية قواعد كتابة: كل أمر بيخلص بـ [[;]]. الكلام النصي بين علامة تنصيص مفردة [['لابتوب']]، والأرقام من غير تنصيص. الكلمات زي SELECT و FROM مش فارق معاها capital أو small، بس العادة إنها تتكتب capital عشان تتفرق عن أسامي الجداول. و [[--]] أول السطر معناها تعليق القاعدة بتتجاهله.

الدرس ده الصورة العامة. الدروس اللي بعده بتفصّل كل حتة: «CREATE TABLE» و «أنواع الأعمدة» و «numeric للفلوس» و «PRIMARY KEY»، وبعدين SELECT و INSERT كل واحد في درس.`,
          example: R`CREATE TABLE demo_products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL
);
INSERT INTO demo_products (name, price) VALUES ('لابتوب', 15000);
SELECT id, name, price FROM demo_products;`,
          try: R`شغّل الـ lab اللي فوق وادخل psql، وانسخ الـ ٣ أوامر بالترتيب. بعدين ضيف منتج تاني: [[INSERT INTO demo_products (name, price) VALUES ('ماوس', 250);]] واعمل الـ SELECT تاني، وشوف الـ id بتاعه. آخر حاجة جرّب تضيف منتج من غير سعر: [[INSERT INTO demo_products (name) VALUES ('كيبورد');]]. ولو مش عايز تسطّب حاجة دلوقتي، حل التمرين اللي تحت: بيشتغل في المتصفح.`,
          flag: "script",
          deep: {
            why: R`الكود بيتغير كل يوم، بس الداتا بتعيش سنين. لو الجداول متصممة صح من الأول، القاعدة نفسها بتمنع أخطاء كتير (يوزر من غير إيميل، أوردر من غير صاحب). ولو متصممة غلط هتفضل تصلّح في الكود حاجات كان المفروض القاعدة ترفضها.`,
            how: R`لما تبعت أمر SQL، القاعدة بتفهمه وبتختار أسرع طريقة تنفّذه بيها (الجزء ده اسمه query planner)، وبعدين تنفّذه وترجّعلك النتيجة. انت بتقول «عايز إيه»، مش «هتجيبه إزاي».

[[serial]] معناها رقم بيزيد لوحده مع كل صف جديد (1، 2، 3...)، فمش محتاج تكتب الـ id بإيدك. و [[PRIMARY KEY]] معناها إن العمود ده هو اللي بيميّز كل صف ومينفعش يتكرر ولا يبقى فاضي، وبيه بعدين تربط جدول الأوردرات بجدول المنتجات. و [[NOT NULL]] معناها العمود إجباري.

في الجداول الحقيقية في التاب ده هتلاقي [[GENERATED ALWAYS AS IDENTITY]] بدل serial، ودي الطريقة الأحدث لنفس الفكرة (درس «PRIMARY KEY»).`,
            when: "أول ما مشروعك يبقى فيه داتا لازم تفضل موجودة بعد ما البرنامج يقفل: يوزرز، أوردرات، رسايل. وقبل ما تكتب الـ API فكّر في الجداول وعلاقاتها الأول.",
            mistakes: R`تحفظ الفلوس في نوع [[float]] بدل [[numeric]] فتطلعلك أرقام زي 0.30000000000000004 (درس «numeric للفلوس»). وتعمل جدول من غير PRIMARY KEY فميبقاش فيه طريقة تشاور بيها على صف واحد بعينه. وتكتب النص بعلامة تنصيص مزدوجة [["لابتوب"]]: في SQL دي معناها اسم عمود مش نص، فهيطلعلك [[column "لابتوب" does not exist]].`
          },
          lines: [
            R`اعمل جدول اسمه [[demo_products]]، والأعمدة بين القوسين مفصولة بـ [[,]].`,
            R`[[id]] رقم بيزيد لوحده ([[serial]])، وهو اللي بيميّز كل صف ([[PRIMARY KEY]]).`,
            R`[[name]] نص ([[text]])، وإجباري ([[NOT NULL]]).`,
            R`[[price]] رقم دقيق ([[numeric]]) مناسب للفلوس، وإجباري.`,
            R`قفلة تعريف الجدول، و [[;]] آخر الأمر.`,
            R`ضيف صف: بنحدد الأعمدة، وبعدين القيم بنفس الترتيب. الـ id مش مكتوب فبيتولّد لوحده.`,
            R`اقرا الأعمدة دي من كل صفوف الجدول.`
          ],
          sol: R`بعد أول ٣ أوامر psql بيطبع:
[[CREATE TABLE]]
[[INSERT 0 1]] (يعني صف واحد اتضاف)
وبعدين جدول فيه صف واحد: [[id]] بـ 1، و [[name]] بـ لابتوب، و [[price]] بـ 15000، وتحته [[(1 row)]].

بعد ما تضيف الماوس وتعمل SELECT: صفين، والماوس الـ id بتاعه 2 من غير ما تكتبه.

والكيبورد من غير سعر بيترفض:
[[ERROR: null value in column "price" of relation "demo_products" violates not-null constraint]]
ومفيش صف اتضاف. لو ضفت منتج سليم بعدها هتلاحظ إن الـ id بتاعه 4 مش 3: المحاولة الفاشلة استهلكت رقم 3، والأرقام دي مش بترجع. ده طبيعي ومش مشكلة، الـ id وظيفته يميّز الصف مش يعد الصفوف.`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE demo_products (id serial PRIMARY KEY, name text NOT NULL, price numeric NOT NULL);
INSERT INTO demo_products (name, price) VALUES ('لابتوب', 15000), ('ماوس', 250);`,
            starter: R`-- اكتب استعلام يرجّع اسم المنتج وسعره بس من جدول demo_products
SELECT ...`,
            expect: [["لابتوب", 15000], ["ماوس", 250]],
            solution: R`SELECT name, price FROM demo_products;`,
            ordered: false
          }
        },
        {
          cmd: "CREATE TABLE",
          title: "اعمل أول جدول: صفوف وأعمدة",
          desc: R`الجدول زي شيت Excel بس صارم: كل عمود ليه اسم ونوع ثابت، وكل صف سجل واحد (يوزر واحد، أوردر واحد). بتعرّف الأعمدة مرة واحدة، وبعد كده القاعدة ترفض أي داتا مش ماشية مع التعريف.

طول التاب ده هنشتغل على مثال واحد: متجر فيه [[users]] و [[products]] و [[orders]] و [[order_items]]. شغّل الـ lab اللي فوق، وجرّب كل مثال بإيدك في psql بالترتيب، لأن كل درس بيبني على اللي قبله.`,
          example: R`CREATE TABLE users (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL UNIQUE,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO users (email, name) VALUES ('you@example.com', 'Ali');
SELECT * FROM users;`,
          try: R`شغّل المثال، وبعدين ضيف نفس الإيميل تاني: هتاخد [[duplicate key value violates unique constraint]]. وجرّب INSERT من غير name: هتاخد [[null value in column "name" of relation "users" violates not-null constraint]]. القاعدة رفضت، مش الكود.`,
          flag: "script",
          deep: {
            why: "لو الداتا في ملف JSON أو شيت، مفيش حاجة بتمنع إن الإيميل يتكرر، أو الاسم يبقى فاضي، أو التاريخ يتكتب «بكرة». الجدول بيحط القواعد دي جوه القاعدة نفسها، فأي حد بيكتب فيها (الـ API، أو سكربت، أو أدمن بإيده) لازم يلتزم.",
            how: R`الـ schema (تعريف الجداول) حاجة، والداتا حاجة تانية. [[CREATE TABLE]] بيسجّل التعريف في catalog جوه Postgres، والصفوف بتتخزن بعد كده في صفحات حجمها 8KB على الديسك.

مع كل INSERT أو UPDATE، Postgres بيتأكد من النوع ومن كل constraint ([[NOT NULL]] و [[UNIQUE]] و [[PRIMARY KEY]]). لو حاجة واحدة فشلت، الأمر كله بيترفض ومفيش صف «نص نص».

[[DEFAULT]] بيتحسب وقت الـ INSERT لو العمود مش مبعوت: [[gen_random_uuid()]] (موجودة من غير extensions من Postgres 13) بتولّد id، و [[now()]] بتحط الوقت.

والأسماء: العرف في Postgres snake_case وجمع ([[users]] و [[created_at]]). لو كتبت اسم فيه حروف كبيرة من غير تنصيص، Postgres بيحوّله small. و Prisma بيعمل جداول زي [[User]] بحرف كبير وبتنصيص، فلما تكتب SQL خام عليها لازم تكتب [["User"]] بالتنصيص.`,
            when: "أول خطوة في أي مشروع: قبل ما تكتب route واحد، ارسم الجداول. وفي مشروع حقيقي مش هتكتب CREATE TABLE بإيدك على السيرفر؛ هيبقى جوه migration (Prisma أو ملف SQL)، والتفاصيل في تاب PostgreSQL.",
            mistakes: R`تنسى [[NOT NULL]] فتلاقي بعد شهر صفوف الاسم فيها NULL والواجهة بتقع. وتسمي الأعمدة camelCase من غير تنصيص فـ [[createdAt]] يتخزن [[createdat]]. و [[SELECT *]] تمام وانت بتجرّب في psql، بس في الكود حدد الأعمدة (درس SELECT).`
          },
          lines: [
            "اعمل جدول اسمه users.",
            "رقم مميز لكل صف نوعه uuid، بيتولّد لوحده لو مبعتهوش.",
            "الإيميل نص، إجباري، ومينفعش يتكرر.",
            "الاسم نص وإجباري.",
            "وقت الإنشاء، بياخد الوقت الحالي لوحده.",
            "قفلة التعريف.",
            "ضيف صف: بتبعت الإيميل والاسم بس، والباقي بياخد الـ DEFAULT.",
            "اعرض كل الصفوف بكل الأعمدة."
          ],
          sol: R`أول INSERT بنفس الإيميل هيترفض بـ [[ERROR:  duplicate key value violates unique constraint "users_email_key"]] وتحته [[DETAIL:  Key (email)=(you@example.com) already exists.]]. الاسم [[users_email_key]] هو اسم الـ constraint اللي Postgres عمله لوحده من كلمة [[UNIQUE]]، وده اللي بتدوّر عليه في الـ error عشان ترجّع للمستخدم «الإيميل ده متسجل قبل كده».

الـ INSERT من غير name هيترفض بـ [[null value in column "name" of relation "users" violates not-null constraint]]، والـ DETAIL بيوريك الصف اللي كان هيتضاف وفيه [[null]] مكان الاسم. لاحظ إن الـ id والـ created_at اتملوا لوحدهم من الـ DEFAULT. ولو [[SELECT * FROM users;]] بعدها، هتلاقي صف واحد بس: ولا محاولة غلط اتحفظت.

لو الـ INSERT التاني عدّى، يبقى انت نسيت [[UNIQUE]] أو [[NOT NULL]] في تعريف الجدول. امسحه بـ [[DROP TABLE users;]] وشغّل المثال تاني.`,
          solCode: R`INSERT INTO users (email, name) VALUES ('you@example.com', 'Ali');
-- ERROR:  duplicate key value violates unique constraint "users_email_key"
INSERT INTO users (email) VALUES ('x@example.com');
-- ERROR:  null value in column "name" of relation "users" violates not-null constraint
SELECT count(*) FROM users;   -- 1`
        },
        {
          cmd: "أنواع الأعمدة",
          title: "كل عمود ياخد نوع إيه: نص ولا رقم ولا وقت ولا JSON",
          desc: R`النوع أول حماية للداتا: عمود [[integer]] مش هيقبل «abc»، وعمود [[timestamptz]] مش هيقبل «30 فبراير». الأنواع اللي هتستخدمها طول الوقت: [[text]] للنصوص، و [[integer]] و [[bigint]] للأرقام الصحيحة، و [[numeric]] للفلوس، و [[boolean]]، و [[timestamptz]] للوقت، و [[uuid]] للـ IDs، و [[jsonb]] لداتا شكلها بيتغير.

القاعدة: اختار أضيق نوع بيوصف الداتا بالظبط. التاريخ في [[timestamptz]] مش [[text]]، ورقم التليفون [[text]] مش [[integer]].`,
          example: R`CREATE TABLE products (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  price      numeric(10,2) NOT NULL,
  stock      integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  attrs      jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO products (name, price, stock, attrs)
VALUES ('T-shirt', 250.00, 40, '{"color": "black", "sizes": ["M", "L"]}');`,
          try: R`جرّب تحط [['abc']] في stock، و [['yes']] في is_active (هيقبلها ويحوّلها true)، و [['{bad json']] في attrs. شوف مين اترفض ومين اتحوّل.`,
          flag: "script",
          deep: {
            why: "لو كل حاجة text، القاعدة مش هتقدر ترتب التواريخ صح، ولا تجمع الأرقام، ولا تمنع «عشرين» في خانة الكمية. النوع الصح بيخلي القاعدة تفهم الداتا وتحسب عليها وتعمل عليها index.",
            how: R`[[text]] نص بأي طول. في Postgres مفيش فرق سرعة بينه وبين [[varchar(255)]]، فاستخدم text، ولو محتاج حد أقصى حط CHECK.

[[integer]] لحد حوالي ٢ مليار، و [[bigint]] لحد 9 × 10^18. الـ IDs والعدادات اللي بتكبر من غير سقف خليها bigint.

[[numeric(10,2)]] رقم decimal مظبوط بالخانة، ده للفلوس (الدرس الجاي).

[[boolean]] بياخد true و false و NULL.

[[timestamptz]] بيخزن لحظة مطلقة (بيحوّلها UTC جوه)، ولما تقراها بيعرضها بتوقيت الـ session. أما [[timestamp]] من غير tz بيخزن «الساعة على الحيطة» من غير ما يعرف أنهي بلد، فلو السيرفر بتوقيت والتطبيق بتوقيت تاني تلاقي فرق ساعتين أو تلاتة. استخدم timestamptz دايمًا، و [[date]] للحاجات اللي ملهاش ساعة زي تاريخ الميلاد.

[[uuid]] بيتخزن 16 byte، مش 36 حرف زي لو خزنته text.

[[jsonb]] بيخزن JSON متحلّل (binary)، فتقدر تستعلم جواه وتعمله index. [[json]] العادي بيحفظ النص زي ما هو، ونادرًا ما تحتاجه.`,
            when: "مع كل عمود جديد: اسأل «أنهي نوع بيوصف القيمة دي بالظبط، وهعمل عليها إيه؟ ترتيب؟ جمع؟ بحث؟».",
            mistakes: R`التاريخ كنص [[29/09/2026]]: الترتيب بيبقى أبجدي والمقارنة غلط. رقم التليفون integer: الصفر اللي على الشمال و [[+20]] بيضيعوا. و [[timestamp]] من غير tz ومشكلة الساعتين. و uuid متخزن text فالـ index أكبر مرتين.`
          },
          lines: [
            "جدول المنتجات.",
            "id رقم متسلسل بيتولّد لوحده (الشرح في درس PRIMARY KEY).",
            "الاسم نص إجباري.",
            "السعر رقم decimal مظبوط: ١٠ خانات منهم ٢ بعد العلامة.",
            "المخزون رقم صحيح، يبدأ من صفر.",
            "المنتج ظاهر ولا متخبي.",
            "مواصفات مرنة (لون، مقاسات) كـ JSON، وافتراضيًا object فاضي.",
            "وقت الإنشاء بالتوقيت.",
            "قفلة التعريف.",
            "ضيف منتج بالأعمدة اللي محتاجها.",
            "القيم: الـ JSON بيتكتب نص وPostgres بيتأكد إنه JSON سليم."
          ],
          sol: R`[['abc']] في stock هيترفض: [[invalid input syntax for type integer: "abc"]]. و [['{bad json']] في attrs هيترفض: [[invalid input syntax for type json]] ومعاه [[Token "bad" is invalid]]. أما [['yes']] في is_active فهيتقبل ويتخزن [[t]]، لأن Postgres بيفهم [['yes']] و [['on']] و [['1']] و [['true']] كـ true (ومقابلهم no و off و 0 و false). جرّب [[RETURNING is_active]] وهتشوف [[t]].

الفكرة: النوع بيرفض الداتا اللي مش منطقية للعمود، بس بيحوّل الصيغ المعروفة. ولو المنتج التجريبي اتضاف امسحه عشان ميلخبطش باقي الدروس.`,
          solCode: R`INSERT INTO products (name, price, stock) VALUES ('X', 1, 'abc');
-- ERROR:  invalid input syntax for type integer: "abc"
INSERT INTO products (name, price, is_active) VALUES ('Yes-test', 1, 'yes') RETURNING is_active;
--  is_active = t
INSERT INTO products (name, price, attrs) VALUES ('X', 1, '{bad json');
-- ERROR:  invalid input syntax for type json
DELETE FROM products WHERE name = 'Yes-test';`
        },
        {
          cmd: "numeric للفلوس",
          title: "ليه 0.1 + 0.2 مش بتساوي 0.3، وده يفرق إيه في الفلوس",
          desc: R`[[float]] و [[real]] و [[double precision]] بيخزنوا الرقم تقريبي في binary، فـ 0.1 + 0.2 بتطلع 0.30000000000000004. في الفلوس ده مش مقبول: قرش هنا وقرش هناك وحسابات آخر الشهر مبتظبطش. [[numeric(10,2)]] بيخزن الرقم decimal بالظبط.

البديل المشهور التاني: تخزن المبلغ بالقروش في [[integer]] أو [[bigint]] في عمود زي [[amount_cents]]، وتقسم على 100 وقت العرض بس. الاتنين صح؛ المهم متستخدمش float.`,
          example: R`SELECT 0.1::float8 + 0.2::float8;       -- 0.30000000000000004
SELECT 0.1::numeric + 0.2::numeric;     -- 0.3
SELECT 19.999::numeric(10,2);           -- 20.00
SELECT round(100 / 3.0, 2);             -- 33.33`,
          try: R`في الـ console بتاع المتصفح اكتب [[0.1 + 0.2]]: نفس المشكلة في JavaScript، لأن كل الأرقام فيه float. وبعدين اجمع [[0.1]] عشر مرات في loop وشوف النتيجة.`,
          flag: "script",
          deep: {
            why: "الكسور زي 0.1 ملهاش تمثيل مظبوط في binary، زي ما 1/3 ملهاش تمثيل مظبوط في decimal (0.3333...). في حساب علمي الفرق ده ملوش لازمة، بس في فاتورة أو رصيد محفظة أو تقرير ضرايب، أي فرق قرش يعني الحسابات مش مظبوطة.",
            how: R`float بيتبع IEEE 754: الرقم بيتخزن كـ mantissa و exponent في binary، فأغلب الكسور العشرية بتتقرّب لأقرب قيمة ممكنة، والخطأ بيتراكم مع الجمع.

[[numeric]] بيخزن الخانات العشرية نفسها، فالحساب مظبوط. أبطأ من float، بس في تطبيقات الويب الفرق ملوش أي أهمية. [[numeric(10,2)]] يعني ١٠ خانات إجمالي منهم ٢ بعد العلامة، يعني أقصى قيمة 99,999,999.99. ولو دخّلت 19.999 بيقرّبها 20.00 من غير error، فقرّب بنفسك بـ [[round(x, 2)]] في الحسابات اللي فيها قسمة.

والخطر مش في القاعدة بس: Prisma بيرجّع عمود [[Decimal]] كـ object مش number. لو حوّلته [[Number()]] وجمعت في JavaScript رجعت لنفس المشكلة. اجمع في SQL، أو استخدم methods الـ Decimal ([[add]] و [[mul]])، أو خزّن بالقروش integer. وفي مشروع حقيقي كان رصيد المدرّسين والمبالغ متخزنة [[amountCents Int]]، وده أنضف حل: كل الحسابات أرقام صحيحة.`,
            when: "أي فلوس: أسعار، وإجمالي أوردر، وأرصدة، وخصومات، ومرتبات. أما الوزن ودرجات الحرارة وإحداثيات الخريطة و scores بتاعة AI فـ float عادي.",
            mistakes: R`[[real]] أو [[Float]] في Prisma لعمود سعر. تجمع الأسعار في JavaScript بـ [[parseFloat]]. تفتكر [[toFixed(2)]] حل؛ هو بيقرّب العرض بس والخطأ لسه في الحساب. وتخلط عملات في عمود واحد من غير عمود [[currency]] جنبه. وفي مشروع حقيقي على MongoDB كانت المرتبات والسلف [[Number]] بالجنيه، يعني float في كل الحسابات.`
          },
          lines: [
            "float: النتيجة فيها خطأ صغير.",
            "numeric: النتيجة مظبوطة.",
            "بيقرّب لخانتين من غير ما يقولك.",
            "قسمة فيها كسر بيتكرر: قرّب بنفسك لخانتين."
          ],
          sol: R`[[0.1 + 0.2]] في الـ console هتطلع [[0.30000000000000004]]، بالظبط زي [[float8]] في Postgres. والـ loop هتطلع [[0.9999999999999999]] مش [[1]]، فـ [[sum === 1]] هتبقى [[false]]. كل جمعة بتزوّد غلطة صغيرة، ومع آلاف العمليات القرش بيبان.

الحل في الكود: خزّن الفلوس بالقروش كـ integer ([[1050]] بدل [[10.50]])، أو استخدم مكتبة decimal. ولاحظ إن [[pg]] في Node بيرجّعلك عمود [[numeric]] كـ string ([['250.00']]) عشان ميضيعش الدقة؛ لو عملت [[Number()]] وبعدين جمعت، رجعت لنفس المشكلة. الغلط الشائع: [[toFixed(2)]] على النتيجة وتفتكر المشكلة اتحلت، هي بس اتخبت في العرض.`,
          solCode: R`console.log(0.1 + 0.2);            // 0.30000000000000004
let sum = 0;
for (let i = 0; i < 10; i++) sum += 0.1;
console.log(sum, sum === 1);       // 0.9999999999999999 false
let cents = 0;
for (let i = 0; i < 10; i++) cents += 10;
console.log(cents / 100);          // 1`
        },
        {
          cmd: "PRIMARY KEY",
          title: "كل صف محتاج رقم ميتكررش أبدًا: متسلسل ولا uuid",
          desc: R`الـ primary key عمود قيمته فريدة ومش NULL، وبيه بتشاور على صف بعينه: [[WHERE id = 42]]. Postgres بيعمله index لوحده. أشهر اختيارين: رقم متسلسل [[bigint GENERATED ALWAYS AS IDENTITY]] (1، 2، 3...)، أو [[uuid]] عشوائي.

المتسلسل أصغر وأسرع وسهل تقراه وانت بتدوّر على مشكلة. الـ uuid ينفع يتولّد في أي مكان (حتى في الـ frontend) ومش بيكشف عدد الأوردرات، وده اللي Supabase Auth بيستخدمه لليوزرز. في المثال: اليوزرز uuid، والباقي أرقام متسلسلة.`,
          example: R`CREATE TABLE orders (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    uuid NOT NULL,
  status     text NOT NULL DEFAULT 'pending',
  total      numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1 RETURNING id;
INSERT INTO orders (id, user_id) SELECT 999, id FROM users LIMIT 1;   -- error: GENERATED ALWAYS`,
          try: R`اعمل INSERT في orders جوه [[BEGIN]] وبعدين [[ROLLBACK]]، وبعدين INSERT عادي: هتلاقي الـ id نط رقم. الأرقام المتسلسلة ممكن يبقى فيها فجوات، وده طبيعي.`,
          flag: "script",
          deep: {
            why: "من غير primary key مفيش طريقة أكيدة تقول «الصف ده بالذات»: لو فيه يوزرين بنفس الاسم، أنهي واحد تعدّل؟ وكل foreign key في الجداول التانية محتاج حاجة ثابتة وفريدة يشاور عليها.",
            how: R`[[PRIMARY KEY]] = [[UNIQUE]] + [[NOT NULL]] + index. جدول واحد ليه primary key واحد، بس ممكن يبقى من كذا عمود (composite)، زي [[(order_id, product_id)]] في جدول البنود.

[[GENERATED ALWAYS AS IDENTITY]] هو الشكل القياسي الحديث بدل [[serial]] القديم: جوه فيه sequence بتدّي الرقم الجاي. ALWAYS بتمنعك تحط id بإيدك بالغلط. والـ sequence مش جزء من الـ transaction: لو INSERT اترجع، الرقم اتصرف خلاص، فالـ IDs فيها فجوات ومينفعش تستخدمها كعدّاد.

[[uuid]] v4 عشوائي بالكامل، فالصفوف الجديدة بتتوزع في كل حتة في الـ index. من Postgres 18 فيه [[uuidv7()]] built-in: أوله وقت، فالجديد بيتحط في آخر الـ index زي المتسلسل، ومع ذلك مش بيتخمّن بسهولة.

المفتاح «الطبيعي» زي الإيميل أو رقم التليفون فكرة وحشة كـ primary key: بيتغير، وكل foreign key بيشاور عليه هيتغير معاه. استخدم id صناعي وحط UNIQUE على الإيميل.`,
            when: "كل جدول من غير استثناء. bigint identity للجداول الداخلية، و uuid لما الـ id بيظهر برّه أو بيتولّد في أكتر من مكان أو مربوط بـ Supabase Auth.",
            mistakes: R`الإيميل primary key. تفتكر الـ IDs من غير فجوات وتستخدمها رقم فاتورة. [[integer]] بدل bigint لجدول بيكبر فيخلص عند ٢ مليار. وتفتكر إن uuid بيحمي من إن حد يغيّر [[/orders/41]] لـ [[/orders/42]] في الـ URL: الحماية الحقيقية إنك تتأكد إن الأوردر ده بتاع اليوزر ده (IDOR)، مش شكل الـ id.`
          },
          lines: [
            "جدول الأوردرات.",
            "primary key رقم متسلسل، والقاعدة بس اللي بتحطه.",
            "صاحب الأوردر (الربط الحقيقي بـ foreign key في المستوى التاني).",
            "الحالة، وتبدأ pending.",
            "الإجمالي بالـ numeric.",
            "وقت الإنشاء.",
            "قفلة التعريف.",
            "اعمل أوردر لأول يوزر، ورجّع الـ id اللي اتولّد.",
            "حاول تحط id بإيدك: مرفوض لأنه ALWAYS."
          ],
          sol: R`الـ INSERT جوه الـ transaction هيرجّع id (مثلًا [[2]])، وبعد [[ROLLBACK]] الصف مش موجود. الـ INSERT العادي بعدها هيرجّع [[3]] مش [[2]]: الرقم اتحجز واتصرف ومش هيرجع تاني. ونفس الحكاية مع أي INSERT فشل بسبب constraint.

ده مقصود: الـ sequence مش جزء من الـ transaction، عشان لو اتنين بيضيفوا في نفس اللحظة ميستنوش بعض. متعتمدش أبدًا إن الـ ids متتالية من غير فجوات، ومتستخدمهاش كـ «رقم فاتورة» لازم يبقى متسلسل قانونيًا؛ ده محتاج جدول عدّاد لوحده. ولو شفت الـ id بقى [[1]] تاني فانت غالبًا عملت [[DROP TABLE]] وأنشأته من الأول.`,
          solCode: R`BEGIN;
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1 RETURNING id;   -- 2
ROLLBACK;
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1 RETURNING id;   -- 3`
        }
      ]
    },
    {
      t: "القراية: SELECT و WHERE",
      l: 1,
      n: "تسأل القاعدة سؤال وترجع بالصفوف اللي عايزها بس، بالترتيب اللي عايزه",
      items: [
        {
          cmd: "SELECT",
          title: "اطلب الأعمدة اللي محتاجها بس",
          desc: R`[[SELECT]] بيرجّع صفوف من جدول. بتحدد الأعمدة بالاسم، وتقدر تسمي الناتج بـ [[AS]]، وتحسب عمود جديد من أعمدة موجودة. و [[DISTINCT]] بيشيل الصفوف المتكررة من الناتج.

في الكود اكتب أسماء الأعمدة دايمًا بدل [[SELECT *]]: داتا أقل على الشبكة، ومش هتسرّب عمود زي [[password_hash]] بالغلط لما حد يضيفه بعدين.`,
          example: R`SELECT name, price FROM products;
SELECT name, price * 1.14 AS price_with_vat FROM products;
SELECT DISTINCT status FROM orders;
SELECT count(DISTINCT user_id) AS buyers FROM orders;
SELECT now(), 2 + 2 AS four;`,
          try: R`الجدول فيه منتج واحد دلوقتي؛ بعد درس INSERT ارجع شغّل الأسطر تاني. وجرّب تضيف [[WHERE price_with_vat > 200]] على السطر التاني وشوف الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات [[name]] والسعر بعد الضريبة مقرّب لخانتين، للمنتجات اللي سعرها بعد الضريبة أكبر من 200 بس.`,
          flag: "script",
          deep: {
            why: "كل شاشة في التطبيق محتاجة جزء من الداتا بس: اسم وسعر مش كل الأعمدة. لو جبت كل حاجة، الـ response بيتقل، والـ memory بتتملي، ولما حد يضيف عمود حساس في الجدول يطلع في الـ API من غير ما حد ياخد باله.",
            how: R`الترتيب اللي بتكتب بيه غير الترتيب اللي Postgres بينفّذ بيه. التنفيذ المنطقي: [[FROM]] ← [[WHERE]] ← [[GROUP BY]] ← [[HAVING]] ← [[SELECT]] ← [[DISTINCT]] ← [[ORDER BY]] ← [[LIMIT]]. عشان كده الاسم اللي عملته بـ AS مش معروف لسه في WHERE (بيتحسب بعده)، بس معروف في ORDER BY.

الناتج نفسه «جدول» مؤقت، وده اللي بيخليك تحط SELECT جوه SELECT (subquery) أو تعمله JOIN.

[[DISTINCT]] لازم يقارن كل الصفوف ببعض (بيرتب أو بيعمل hash)، فعلى نتيجة كبيرة غالي. ولو لقيت نفسك بتحط DISTINCT عشان صفوف اتكررت بعد JOIN، غالبًا الـ JOIN نفسه غلط.

وفيه حاجة خاصة بـ Postgres اسمها [[DISTINCT ON (user_id)]]: بترجّع أول صف لكل user_id حسب الـ ORDER BY، زي «آخر أوردر لكل يوزر».`,
            when: "كل قراية. وفي الـ ORM بتعمل نفس الحاجة بـ [[select]] (درس «include و select» في المستوى التالت).",
            mistakes: R`[[SELECT *]] في كود الـ API. DISTINCT عشان تخبي صفوف متكررة من JOIN غلط. واستخدام اسم الـ AS في WHERE: [[column "price_with_vat" does not exist]].`
          },
          lines: [
            "عمودين بس من كل المنتجات.",
            "عمود محسوب (السعر بالضريبة) باسم جديد.",
            "الحالات الموجودة من غير تكرار.",
            "عدد اليوزرز المختلفين اللي عملوا أوردرات.",
            "SELECT من غير جدول: ينفع تحسب أي تعبير."
          ],
          sol: R`بعد درس INSERT هتلاقي كل المنتجات ظاهرة، وعمود [[price_with_vat]] فيه ٤ أرقام عشرية (مثلًا [[285.0000]] للـ T-shirt)، لأن ضرب [[numeric(10,2)]] في [[1.14]] بيجمع عدد الخانات العشرية. لو عايزها خانتين: [[round(price * 1.14, 2)]].

الـ WHERE على الاسم المستعار هيطلّع [[ERROR:  column "price_with_vat" does not exist]]. السبب إن WHERE بيتنفذ قبل SELECT، فالاسم لسه متعملش. الحل إنك تكرر الحسبة: [[WHERE price * 1.14 > 200]]، أو تحط الاستعلام في subquery أو CTE وتفلتر برّه.`,
          solCode: R`SELECT name, price * 1.14 AS price_with_vat FROM products WHERE price_with_vat > 200;
-- ERROR:  column "price_with_vat" does not exist
SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price * 1.14 > 200;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL,
  is_active boolean NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10, true),
  (2, 'Mug', 120.00, 0, true),
  (3, 'Hoodie', 650.00, 3, true),
  (4, 'Cap', 180.00, 0, false),
  (5, 'Sticker', 0.00, 0, true),
  (6, 'Old Poster', 0.00, 0, false),
  (7, 'Pen', 15.00, 100, true),
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price_with_vat > 200;`,
            expect: [["T-shirt",285], ["Hoodie",741], ["Cap",205.2]],
            solution: R`SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price * 1.14 > 200;`
          }
        },
        {
          cmd: "WHERE",
          title: "رجّع الصفوف اللي بتحقق شرط بس",
          desc: R`[[WHERE]] بيخلّي الصفوف اللي الشرط عليها true بس. بتستخدم مقارنات ([[=]] و [[<>]] و [[<]] و [[>=]])، وتربطهم بـ [[AND]] و [[OR]] و [[NOT]]. و [[IN (...)]] بدل كذا OR، و [[BETWEEN]] لمدى.

خد بالك من الأولوية: AND أقوى من OR، فحط أقواس لما تخلطهم. والنصوص بين علامة تنصيص مفردة [[']]، مش مزدوجة.`,
          example: R`SELECT name, price FROM products WHERE price < 300;
SELECT name FROM products WHERE stock > 0 AND is_active;
SELECT id, status FROM orders WHERE status IN ('paid', 'shipped');
SELECT id FROM orders WHERE created_at >= now() - interval '7 days';
SELECT name FROM products WHERE price BETWEEN 100 AND 500;
SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);`,
          try: R`شيل الأقواس من آخر سطر وقارن النتيجة. وبعدين جرّب [[WHERE status = "paid"]] بالتنصيص المزدوج واقرا الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات أسماء المنتجات النشطة ([[is_active]]) اللي يا إما في المخزون يا إما ببلاش. في الجدول منتج ببلاش ومش نشط، ومينفعش يظهر.`,
          flag: "script",
          deep: {
            why: "من غير WHERE هتجيب الجدول كله وتفلتر في الكود، يعني مليون صف بيعدّوا على الشبكة عشان تستخدم عشرة. الفلترة جوه القاعدة أسرع بمراحل، وممكن تستخدم index.",
            how: R`WHERE بيتقيّم على كل صف لوحده، قبل أي تجميع. النتيجة لازم تبقى true عشان الصف يعدّي؛ false أو NULL الاتنين بيترموا (درس NULL).

التنصيص المفرد [['paid']] قيمة نصية، والمزدوج [["paid"]] اسم عمود أو جدول. عشان كده [[status = "paid"]] بيدوّر على عمود اسمه paid.

[[BETWEEN a AND b]] بيشمل الطرفين. مع timestamps ده فخ: [[BETWEEN '2026-09-01' AND '2026-09-30']] بيقف عند أول لحظة في يوم 30، ويفوّت اليوم كله. الصح: [[created_at >= '2026-09-01' AND created_at < '2026-10-01']].

ومن الكود: القيمة اللي جاية من اليوزر عمرها ما تتلزق في نص الاستعلام. بتتبعت parameter منفصل: [[pool.query('SELECT ... WHERE email = $1', [email])]]. ده بيمنع SQL injection، والتفاصيل في درس $queryRaw.`,
            when: "تقريبًا في كل SELECT و UPDATE و DELETE.",
            mistakes: R`[[a OR b AND c]] وانت قصدك [[(a OR b) AND c]]. BETWEEN مع timestamps. تنصيص مزدوج للنصوص. ولزق input اليوزر في الاستعلام بـ template string.`
          },
          lines: [
            "المنتجات الأرخص من 300.",
            "اللي ليها مخزون وظاهرة (is_active لوحده boolean، مش محتاج = true).",
            "الأوردرات اللي حالتها واحدة من دول.",
            "أوردرات آخر ٧ أيام.",
            "سعر بين 100 و 500، والطرفين داخلين.",
            "الأقواس بتحدد الأولوية: ظاهر، و (ليه مخزون أو مجاني)."
          ],
          sol: R`من غير أقواس، [[AND]] بيتحسب قبل [[OR]]، فالشرط بيبقى [[(is_active AND stock > 0) OR price = 0]]: أي منتج سعره صفر هيظهر حتى لو [[is_active = false]]. على الداتا الحالية (منتج واحد نشط) النتيجة غالبًا هي هي؛ عشان تشوف الفرق ضيف جوه [[BEGIN;]] منتج سعره 0 و is_active = false، وقارن: بالأقواس مش هيظهر، ومن غيرها هيظهر. وبعدين [[ROLLBACK;]].

[[WHERE status = "paid"]] هيطلّع [[ERROR:  column "paid" does not exist]]. في SQL التنصيص المزدوج لأسماء الأعمدة والجداول، والنصوص بتنصيص مفرد بس: [[WHERE status = 'paid']].`,
          solCode: R`BEGIN;
INSERT INTO products (name, price, stock, is_active) VALUES ('Gift', 0, 0, false);
SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);   -- مفيش Gift
SELECT name FROM products WHERE is_active AND stock > 0 OR price = 0;     -- Gift ظهر
ROLLBACK;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL,
  is_active boolean NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10, true),
  (2, 'Mug', 120.00, 0, true),
  (3, 'Hoodie', 650.00, 3, true),
  (4, 'Cap', 180.00, 0, false),
  (5, 'Sticker', 0.00, 0, true),
  (6, 'Old Poster', 0.00, 0, false),
  (7, 'Pen', 15.00, 100, true),
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name FROM products
WHERE is_active AND stock > 0 OR price = 0;`,
            expect: [["T-shirt"], ["Hoodie"], ["Sticker"], ["Pen"], ["Pin"]],
            solution: R`SELECT name FROM products
WHERE is_active AND (stock > 0 OR price = 0);`
          }
        },
        {
          cmd: "ORDER BY و LIMIT",
          title: "رتّب النتيجة وخد أول كام صف",
          desc: R`[[ORDER BY]] بيرتب الناتج: [[ASC]] (الافتراضي) من الصغير للكبير، و [[DESC]] العكس، وتقدر ترتب بأكتر من عمود. [[LIMIT]] بياخد أول كام صف، و [[OFFSET]] بيعدّي كام صف الأول.

من غير ORDER BY، Postgres مش بيوعدك بأي ترتيب، حتى لو شكله ثابت النهارده.`,
          example: R`SELECT name, price FROM products ORDER BY price DESC;
SELECT name, price FROM products ORDER BY price DESC, name ASC;
SELECT id, created_at FROM orders ORDER BY created_at DESC LIMIT 5;
SELECT name, price FROM products ORDER BY price LIMIT 10 OFFSET 20;`,
          try: R`ضيف منتجين بنفس السعر، واعمل [[ORDER BY price LIMIT 1]] كذا مرة بعد UPDATE على واحد منهم. وبعدين ضيف [[, id]] للترتيب وشوف النتيجة بقت ثابتة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أرخص ٣ منتجات بالاسم والسعر، ولو سعرين متساويين الأصغر [[id]] الأول. الترتيب جزء من الإجابة.`,
          flag: "script",
          deep: {
            why: "كل ليستة في التطبيق مترتبة بحاجة: الأحدث الأول، أو الأرخص، أو الأكتر مبيعًا. و LIMIT بيخليك تجيب صفحة واحدة بدل الجدول كله.",
            how: R`الترتيب بيحصل بعد WHERE و SELECT. لو فيه index على العمود اللي بترتب بيه ومعاه LIMIT، Postgres بيقرا أول N صف من الـ index ويقف، ودي أسرع حالة. من غير index لازم يرتب كل الصفوف اللي عدّت من WHERE الأول.

الصفوف اللي قيمتها متساوية ترتيبها بينها عشوائي. في الصفحات ده بيعمل bug: صف يظهر في صفحتين وصف ميظهرش خالص. الحل عمود فريد في الآخر كـ tiebreaker: [[ORDER BY price, id]].

NULL في Postgres بيعتبر أكبر من أي قيمة: بييجي في الآخر مع ASC وفي الأول مع DESC. لو عايز غير كده: [[NULLS LAST]] أو [[NULLS FIRST]].

[[OFFSET 10000]] بيخلي Postgres يقرا ١٠ آلاف صف ويرميهم، فالصفحات البعيدة بتبطأ. الحل في درس keyset pagination في المستوى التاني.`,
            when: "مع أي ليستة بتتعرض، وأي LIMIT لازم معاه ORDER BY، وإلا «أول ٥» ملهاش معنى.",
            mistakes: R`LIMIT من غير ORDER BY. ترتيب من غير tiebreaker في الصفحات. تعتمد إن الصفوف بترجع بترتيب الإضافة. وترتيب عمود نص فيه أرقام، فـ [['10']] بييجي قبل [['9']].`
          },
          lines: [
            "الأغلى الأول.",
            "الأغلى الأول، ولو السعر متساوي بالاسم أبجدي.",
            "آخر ٥ أوردرات.",
            "الصفحة التالتة لو كل صفحة ١٠: عدّي ٢٠ وخد ١٠."
          ],
          sol: R`مع منتجين بنفس السعر، [[ORDER BY price LIMIT 1]] ممكن يرجّع واحد مرة والتاني مرة بعد كل UPDATE. في تجربة حقيقية على Postgres: Pen، وبعد UPDATE على Pen بقى Pin، وبعد UPDATE على Pin رجع Pen. السبب إن UPDATE في Postgres بيكتب نسخة جديدة من الصف في مكان تاني في الجدول، والترتيب بين الصفوف المتساوية مش محدد، فبيطلع على حسب مكانها على الديسك.

بعد [[ORDER BY price, id]] النتيجة ثابتة دايمًا (صاحب الـ id الأصغر). ده مهم جدًا في الـ pagination: من غير عمود فريد في آخر الترتيب، نفس المنتج ممكن يظهر في صفحتين أو ميظهرش خالص. ولو لقيت النتيجة ثابتة من غير id، ده حظ مش ضمان.`,
          solCode: R`INSERT INTO products (name, price, stock) VALUES ('Pen', 50, 10), ('Pin', 50, 10);
SELECT id, name FROM products ORDER BY price LIMIT 1;       -- Pen
UPDATE products SET stock = 9 WHERE name = 'Pen';
SELECT id, name FROM products ORDER BY price LIMIT 1;       -- ممكن يبقى Pin
SELECT id, name FROM products ORDER BY price, id LIMIT 1;   -- دايمًا Pen
DELETE FROM products WHERE name IN ('Pen', 'Pin');`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL,
  is_active boolean NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10, true),
  (2, 'Mug', 120.00, 0, true),
  (3, 'Hoodie', 650.00, 3, true),
  (4, 'Cap', 180.00, 0, false),
  (5, 'Sticker', 0.00, 0, true),
  (6, 'Old Poster', 0.00, 0, false),
  (7, 'Pen', 15.00, 100, true),
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name, price FROM products
ORDER BY price
LIMIT 3;`,
            expect: [["Sticker",0], ["Old Poster",0], ["Pen",15]],
            solution: R`SELECT name, price FROM products
ORDER BY price, id
LIMIT 3;`,
            ordered: true
          }
        },
        {
          cmd: "LIKE و ILIKE",
          title: "دوّر على جزء من نص",
          desc: R`[[LIKE]] بيطابق نص بنمط: [[%]] معناها أي عدد من الحروف، و [[_]] حرف واحد بالظبط. [[ILIKE]] نفس الفكرة بس مش فارق معاه حروف كبيرة أو صغيرة (دي في Postgres بس). ده أبسط بحث في المنتجات أو اليوزرز.

والبحث بـ [[%كلمة%]] على جدول كبير بطيء، لأن الـ index العادي مش بيساعد لما النمط يبدأ بـ %.`,
          example: R`SELECT name FROM products WHERE name LIKE 'T-%';
SELECT email FROM users WHERE email ILIKE '%@example.com';
SELECT name FROM products WHERE name ILIKE '%shirt%';
SELECT name FROM products WHERE name LIKE '_ug';
SELECT name FROM products WHERE name NOT ILIKE '%test%';`,
          try: R`جرّب [[LIKE '%Shirt%']] و [[ILIKE '%Shirt%']] وشوف مين لقى T-shirt. وبعدين دوّر على منتج اسمه فيه [[%]] فعلًا: هتحتاج [[ESCAPE]] أو [[\%]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات المنتجات اللي اسمها فيه علامة [[%]] حقيقية (مش wildcard).`,
          flag: "script",
          deep: {
            why: "خانة البحث في أي لوحة أدمن أو متجر. قبل ما تفكر في محرك بحث كامل، ILIKE بيحل ٩٠٪ من الحالات في الجداول الصغيرة والمتوسطة.",
            how: R`LIKE حساس لحالة الحروف، و ILIKE لأ. B-tree index عادي ممكن يساعد في [[LIKE 'abc%']] (بادئة) بس لو الـ collation هي C أو الـ index معمول بـ [[text_pattern_ops]]. لكن [[%abc%]] مفيهاش بداية ثابتة، فلازم يقرا كل الصفوف.

للبحث الجد: extension اسمها [[pg_trgm]] مع GIN index ([[CREATE INDEX ... USING gin (name gin_trgm_ops)]]) بتخلي ILIKE بـ %...% سريع جدًا، أو full-text search بـ [[tsvector]] للبحث بالكلمات.

ومن الكود: النمط بتبنيه في الكود وتبعته parameter: [[WHERE name ILIKE $1]] والقيمة [['%' + q + '%']]، وده آمن من injection. بس لو اليوزر كتب [[%]] هيطابق كل حاجة، فلو مهم اعمل escape لـ % و _ في النص بتاعه. نفس الفكرة في Prisma: [[{ contains: q, mode: "insensitive" }]] بيتحول ILIKE، وفي supabase-js [[.ilike("name", pattern)]].`,
            when: "بحث بسيط في جداول لحد عشرات الآلاف من الصفوف. أكتر من كده، أو محتاج ترتيب بالأقرب، روح لـ pg_trgm أو full-text.",
            mistakes: R`تلزق كلمة البحث في نص الاستعلام. LIKE وتستغرب إن «Shirt» ملقاش «shirt». و ILIKE %...% على مليون صف من غير trigram index، والصفحة تاخد ثواني.`
          },
          lines: [
            "الأسماء اللي بتبدأ بـ T- (حساس للحروف).",
            "كل إيميلات الدومين ده، مهما كانت الحروف كبيرة أو صغيرة.",
            "أي اسم فيه shirt في أي مكان.",
            "حرف واحد أي حاجة وبعده ug، زي Mug.",
            "استبعد اللي فيها test."
          ],
          sol: R`[[LIKE '%Shirt%']] هيرجّع [[0 rows]] لأن الاسم [[T-shirt]] بـ s صغيرة و LIKE حساس لحالة الحروف. [[ILIKE '%Shirt%']] هيلاقي T-shirt.

للبحث عن [[%]] حقيقية: [[LIKE '%%%']] هيرجّع كل المنتجات، لأن الـ % بقت wildcard. الصح [[LIKE '%\%%']] (الـ backslash هو الـ escape الافتراضي في Postgres)، أو تختار حرف escape بنفسك: [[LIKE '%!%%' ESCAPE '!']]. نفس الكلام على [[_]]. ولو بتبني النمط من input المستخدم في الكود، لازم تعمل escape لـ [[%]] و [[_]] و [[\]] قبل ما تحطها بين علامتين %.`,
          solCode: R`SELECT name FROM products WHERE name LIKE '%Shirt%';    -- 0 rows
SELECT name FROM products WHERE name ILIKE '%Shirt%';   -- T-shirt
BEGIN;
INSERT INTO products (name, price) VALUES ('50% off bag', 100), ('Big bag', 100);
SELECT name FROM products WHERE name LIKE '%%%';                 -- الكل
SELECT name FROM products WHERE name LIKE '%\%%';                -- 50% off bag بس
SELECT name FROM products WHERE name LIKE '%!%%' ESCAPE '!';     -- 50% off bag بس
ROLLBACK;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (id int PRIMARY KEY, name text NOT NULL);
INSERT INTO products VALUES (1, '50% Off Mug'), (2, 'Plain Mug'), (3, '100% Cotton Tee'), (4, 'T-shirt'), (5, 'Discount_Pen');`,
            starter: R`SELECT name FROM products WHERE name LIKE '%%%';`,
            expect: [["50% Off Mug"], ["100% Cotton Tee"]],
            solution: R`SELECT name FROM products WHERE name LIKE '%\%%';`
          }
        },
        {
          cmd: "NULL",
          title: "القيمة المجهولة، وليه = مش شغالة معاها",
          desc: R`[[NULL]] معناها «مش معروف» أو «مفيش قيمة»، مش صفر ومش نص فاضي. وأي مقارنة مع NULL نتيجتها NULL (لا true ولا false)، فـ [[WHERE x = NULL]] عمرها ما هترجع صف. الصح [[IS NULL]] و [[IS NOT NULL]].

و [[COALESCE(a, b)]] بترجّع أول قيمة مش NULL، ودي بتحط بيها قيمة بديلة في العرض أو الحساب.`,
          example: R`ALTER TABLE users ADD COLUMN phone text;
SELECT email FROM users WHERE phone = NULL;          -- 0 rows دايمًا
SELECT email FROM users WHERE phone IS NULL;
SELECT email, COALESCE(phone, 'no phone') AS phone FROM users;
SELECT count(*) AS all_users, count(phone) AS with_phone FROM users;
SELECT NULL = NULL, NULL IS NULL, 5 + NULL;          -- NULL, true, NULL`,
          try: R`حط رقم تليفون ليوزر واحد، وجرّب [[WHERE phone <> '0100']]: اليوزرز اللي تليفونهم NULL مش هيظهروا، مع إن تليفونهم فعلًا مش 0100. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات إيميلات كل اليوزرز اللي تليفونهم مش [['0100']]، ومنهم اللي ملوش تليفون أصلًا.`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية فيها حاجات مش معروفة: تليفون محدش دخّله، أو وقت شحن لأوردر لسه متشحنش. NULL هو الطريقة القياسية تقول «مفيش قيمة». بس قواعده غريبة، ولو مفهمتهاش هتلاقي صفوف بتختفي من التقارير من غير سبب واضح.",
            how: R`SQL شغال بـ three-valued logic: TRUE و FALSE و UNKNOWN. [[NULL = 5]] نتيجتها UNKNOWN، و [[NOT UNKNOWN]] برضه UNKNOWN. و WHERE بيعدّي TRUE بس.

في الحساب: [[5 + NULL]] = NULL. أما الـ aggregates فبتتجاهل NULL: [[count(phone)]] بيعد اللي مش NULL بس، و [[count(*)]] بيعد الصفوف كلها، و [[avg]] مش بيحسب الـ NULL كصفر، بيشيله من الحساب خالص.

[[a IS DISTINCT FROM b]] مقارنة بتعامل NULL كقيمة عادية (NULL مع NULL = مش مختلفين). و [[NULLIF(a, b)]] بترجّع NULL لو القيمتين زي بعض، ودي بتحمي من القسمة على صفر: [[x / NULLIF(y, 0)]].

و UNIQUE بيسمح بكذا NULL (لأن NULL مش بيساوي NULL). وفي JavaScript بتوصلك [[null]]، وفي Prisma العمود اللي ممكن يبقى NULL بتكتبه بعلامة استفهام: [[String?]].`,
            when: "في التصميم: NULL للحاجة اللي ممكن فعلًا متبقاش موجودة (shipped_at قبل الشحن). والحاجة اللي لازم يبقى ليها قيمة دايمًا: NOT NULL و DEFAULT.",
            mistakes: R`[[= NULL]] بدل [[IS NULL]]. [[<>]] بيستبعد الـ NULL من غير ما تاخد بالك. و [[avg]] وانت فاكر الفاضي اتحسب صفر. واستخدام NULL والنص الفاضي [['']] الاتنين بمعنى «مفيش»، فكل استعلام محتاج يشيك على الحالتين.`
          },
          lines: [
            "ضيف عمود تليفون اختياري، فكل الصفوف القديمة قيمتها NULL.",
            "غلط: المقارنة بـ = مع NULL نتيجتها NULL، فمفيش صف بيعدّي.",
            "صح: IS NULL.",
            "اعرض قيمة بديلة مكان الـ NULL.",
            "count(*) بيعد كل الصفوف، و count(phone) بيعد اللي ليهم تليفون بس.",
            "NULL مش بتساوي نفسها، و IS NULL بترجّع true، وأي حساب مع NULL بيبقى NULL."
          ],
          sol: R`عشان تشوف المشكلة لازم يبقى عندك يوزر تاني من غير تليفون. ضيف واحد، وحط [[0123]] لليوزر الأول. [[WHERE phone <> '0100']] هيرجّع اليوزر الأول بس، والتاني اختفى، لأن [[NULL <> '0100']] نتيجتها NULL مش true، و WHERE بيعدّي الـ true بس.

عشان تجيبهم الاتنين: [[WHERE phone IS DISTINCT FROM '0100']]، أو [[WHERE phone <> '0100' OR phone IS NULL]]. و IS DISTINCT FROM بيعامل NULL كقيمة عادية في المقارنة. نفس المشكلة بتحصل مع [[NOT IN]] ومع أي فلتر «مش بيساوي» في لوحة الأدمن.`,
          solCode: R`BEGIN;
INSERT INTO users (email, name) VALUES ('sara@example.com', 'Sara');
UPDATE users SET phone = '0123' WHERE email = 'you@example.com';
SELECT email FROM users WHERE phone <> '0100';                  -- you@example.com بس
SELECT email FROM users WHERE phone IS DISTINCT FROM '0100';    -- الاتنين
ROLLBACK;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');`,
            starter: R`SELECT email FROM users WHERE phone <> '0100';`,
            expect: [["sara@example.com"], ["ali@shop.eg"], ["omar@gmail.com"]],
            solution: R`SELECT email FROM users WHERE phone IS DISTINCT FROM '0100';`
          }
        }
      ]
    },
    {
      t: "الكتابة: INSERT و UPDATE و DELETE",
      l: 1,
      n: "تضيف وتعدّل وتمسح. والـ WHERE في التعديل والمسح هو الفرق بين شغل عادي وكارثة",
      items: [
        {
          cmd: "INSERT",
          title: "ضيف صف، أو كذا صف في أمر واحد",
          desc: R`[[INSERT INTO table (cols) VALUES (...)]] بيضيف صف. تقدر تبعت كذا صف في أمر واحد (أسرع بكتير من أمر لكل صف)، والأعمدة اللي مش مذكورة بتاخد الـ DEFAULT بتاعها أو NULL.

و [[RETURNING]] بيرجّعلك الصف اللي اتعمل بالـ id اللي اتولّد، من غير SELECT تاني. وده بالظبط اللي Prisma بيعمله وراك في [[create]].`,
          example: R`INSERT INTO products (name, price, stock) VALUES ('Mug', 120, 15);
INSERT INTO products (name, price, stock) VALUES
  ('Cap', 180, 0),
  ('Hoodie', 650, 8),
  ('Sticker', 15, 300)
RETURNING id, name;
INSERT INTO orders (user_id, total)
SELECT id, 0 FROM users WHERE email = 'you@example.com'
RETURNING id, status, created_at;`,
          try: R`اعمل INSERT لـ ٣ صفوف واحد فيهم سعره [[NULL]]: هتلاقي ولا صف اتضاف، مش الاتنين السليمين بس. الأمر الواحد يا كله يا ولا حاجة.`,
          flag: "script",
          deep: {
            why: "كل حاجة اليوزر بيعملها (تسجيل، أوردر، تعليق) بتبقى INSERT. ولما تستورد ألف منتج من شيت، الفرق بين ألف أمر وأمر واحد ممكن يبقى دقيقة مقابل ثانية.",
            how: R`في psql والكود، كل أمر لوحده transaction (autocommit). الـ INSERT المتعدد رحلة واحدة للقاعدة و commit واحد، عشان كده أسرع بكتير من loop.

الـ constraints بتتفحص لكل صف، ولو صف واحد فشل، الأمر كله بيفشل ومفيش ولا صف بيتضاف.

[[INSERT ... SELECT]] بياخد الصفوف من استعلام بدل VALUES، مفيد للنسخ والـ migrations. و [[RETURNING]] بيرجّع أي أعمدة من الصفوف اللي اتعملت، بما فيها اللي اتولّدت (id و created_at).

من Node بـ [[pg]]: [[await pool.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id', [name, price])]]. الـ [[$1]] و [[$2]] parameters، مش string بتتلزق. ولملايين الصفوف فيه [[COPY]]، والتفاصيل في تاب PostgreSQL درس [[\copy]].`,
            when: "أي إضافة. ولو بتضيف كذا صف مرة واحدة (بنود أوردر، استيراد)، أمر واحد متعدد أو [[createMany]] في Prisma.",
            mistakes: R`INSERT من غير أسماء الأعمدة ([[INSERT INTO products VALUES (...)]]): بيعتمد على ترتيب الأعمدة، وأول ما حد يضيف عمود بيبوظ. loop فيه ألف [[await]] كل واحد INSERT. وبناء VALUES بلزق النصوص.`
          },
          lines: [
            "ضيف منتج واحد بالأعمدة اللي محتاجها.",
            "ضيف كذا منتج في أمر واحد:",
            "الصف الأول.",
            "التاني.",
            "التالت.",
            "رجّع الـ id والاسم للصفوف اللي اتعملت.",
            "ضيف أوردر، والقيم جاية من استعلام مش مكتوبة بإيدك:",
            "الـ user_id من جدول users بالإيميل.",
            "رجّع الـ id والحالة الافتراضية ووقت الإنشاء."
          ],
          sol: R`الأمر هيفشل بـ [[null value in column "price" of relation "products" violates not-null constraint]]، و [[SELECT count(*) FROM products]] قبله وبعده هيطلع نفس الرقم: ولا A ولا C اتضافوا. الـ INSERT الواحد (حتى لو فيه ١٠٠٠ صف) هو statement واحد، والـ statement في Postgres atomic.

حاجة هتلاحظها: لو عملت INSERT سليم بعدها، الـ id هيبقى نط رقمين أو تلاتة، لأن الصفوف اللي اتحسبت قبل الغلطة حجزت أرقام من الـ sequence. ولو شفت A و C اتضافوا، يبقى انت بعت ٣ أوامر INSERT منفصلة مش أمر واحد فيه ٣ صفوف.`,
          solCode: R`SELECT count(*) FROM products;
INSERT INTO products (name, price, stock) VALUES ('A', 10, 1), ('B', NULL, 1), ('C', 30, 1);
-- ERROR:  null value in column "price" of relation "products" violates not-null constraint
SELECT count(*) FROM products;   -- نفس الرقم`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products (name, price, stock) VALUES ('T-shirt', 250.00, 10);`,
            starter: R`-- ضيف منتجين في أمر INSERT واحد: Cap سعره 180 والمخزون 5، و Mug سعره 120 والمخزون 20
-- الـ id بيتولّد لوحده، فمتكتبهوش. والـ SELECT اللي تحت بيرجّع الأسماء والأسعار من الأرخص للأغلى
INSERT INTO products ...;
SELECT name, price FROM products ORDER BY price;`,
            expect: [["Mug", 120], ["Cap", 180], ["T-shirt", 250]],
            solution: R`INSERT INTO products (name, price, stock) VALUES ('Cap', 180, 5), ('Mug', 120, 20);
SELECT name, price FROM products ORDER BY price;`,
            ordered: true
          }
        },
        {
          cmd: "UPDATE",
          title: "عدّل صفوف موجودة، والشرط قبل أي حاجة",
          desc: R`[[UPDATE table SET col = value WHERE ...]] بيعدّل كل الصفوف اللي بتطابق الـ WHERE. من غير WHERE بيعدّل الجدول كله، ومفيش undo.

وتقدر تحسب القيمة الجديدة من القديمة: [[stock = stock - 1]]. ودي أهم مما تبان: الحساب بيحصل جوه القاعدة في خطوة واحدة، بدل ما تقرا في الكود وتكتب تاني (ليه ده مهم في درس «atomic UPDATE»).`,
          example: R`UPDATE products SET price = 199.00 WHERE name = 'Cap';
UPDATE products SET stock = stock - 1 WHERE name = 'Mug' AND stock > 0 RETURNING stock;
UPDATE products SET is_active = false, stock = 0 WHERE name = 'Sticker';
UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';
UPDATE products SET price = 0;                -- من غير WHERE: كل المنتجات بقت ببلاش`,
          try: R`نفّذ سطر الـ pending مرتين: المرة الأولى psql هيقول [[UPDATE 1]] والتانية [[UPDATE 0]]، لأن الشرط مبقاش متحقق. ده بيمنع إن الأوردر يتدفع مرتين. وقبل آخر سطر اكتب [[BEGIN;]] وبعده [[ROLLBACK;]].`,
          flag: "script danger",
          deep: {
            why: "كل تغيير حالة في التطبيق UPDATE: أوردر اتدفع، منتج خلص، يوزر غيّر اسمه. والغلط فيه بيأثر على داتا موجودة وحقيقية، مش صف جديد تقدر تمسحه.",
            how: R`psql بيطبع [[UPDATE 3]] يعني ٣ صفوف اتعدلت. في الكود نفس الرقم بيوصلك: [[rowCount]] في pg، و [[count]] في [[updateMany]] بتاع Prisma. لو متوقع ١ وجالك ٠، يبقى الشرط اتكسر (المخزون خلص، أو الأوردر اتدفع قبل كده)، ودي معلومة لازم تتعامل معاها.

الشرط الزيادة [[AND status = 'pending']] بيخلي الـ UPDATE «حارس» لتغيير الحالة: ميتنفذش غير لو الصف لسه في الحالة المتوقعة.

جوه Postgres، الـ UPDATE مش بيكتب فوق الصف؛ بيعمل نسخة جديدة منه ويعلّم القديمة إنها ميتة، و VACUUM بينضفها بعدين (MVCC). عشان كده UPDATE على ملايين الصفوف بيكبّر الجدول مؤقتًا.

وأي UPDATE بإيدك على الإنتاج جوه [[BEGIN]] ... [[ROLLBACK]] الأول، والطريقة في تاب PostgreSQL درس «BEGIN و ROLLBACK».`,
            when: "أي تعديل. ولما التعديل معتمد على القيمة الحالية (مخزون، رصيد، عداد)، خلي الحساب جوه الـ SET نفسه.",
            mistakes: R`UPDATE من غير WHERE. تقرا القيمة في JavaScript وتكتبها تاني [[SET stock = 7]] بدل [[stock = stock - 1]]، فطلبين في نفس اللحظة يبوّظوا الرقم. و [[SET a = 1 AND b = 2]] بدل [[SET a = 1, b = 2]]: Postgres بيرفضها، بس MySQL بيقبلها بصمت وبيحط في a نتيجة شرط منطقي.`
          },
          lines: [
            "غيّر سعر منتج واحد.",
            "اخصم واحد من المخزون لو لسه فيه، ورجّع الرقم الجديد.",
            "غيّر عمودين مرة واحدة: الفاصل كومة مش AND.",
            "غيّر الحالة بس لو لسه pending: مينفعش يتدفع مرتين.",
            "الكارثة: من غير WHERE كل الصفوف اتعدلت."
          ],
          sol: R`أول مرة: [[UPDATE 1]] والأوردر بقى paid. تاني مرة: [[UPDATE 0]]، لأن الصف مبقاش pending فمحدش طابق الشرط. في الكود بتقرا [[rowCount]]: لو 0 يبقى الأوردر اتدفع قبل كده (أو مش موجود)، فمتخصمش فلوس تاني. ده أبسط شكل من الـ idempotency.

السطر الأخير جوه [[BEGIN;]] هيقول [[UPDATE 5]] (أو عدد كل المنتجات)، و [[SELECT name, price FROM products;]] هيوريك كله [[0.00]]. بعد [[ROLLBACK;]] الأسعار رجعت. لو نسيت الـ BEGIN ونفّذته، الأسعار اتصفرت فعلًا، ومفيش undo غير backup أو إنك ترجّعها بإيدك.`,
          solCode: R`UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';   -- UPDATE 1
UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';   -- UPDATE 0
BEGIN;
UPDATE products SET price = 0;
SELECT name, price FROM products;   -- كله 0.00
ROLLBACK;
SELECT name, price FROM products;   -- الأسعار رجعت`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10),
  (2, 'Mug', 120.00, 0),
  (3, 'Hoodie', 650.00, 4);`,
            starter: R`-- خلّي سعر Mug بـ 140 والمخزون 15، في أمر UPDATE واحد ومن غير ما تلمس باقي المنتجات
-- والـ SELECT اللي تحت بيرجّع الـ Mug بعد التعديل
UPDATE products SET ...;
SELECT name, price, stock FROM products WHERE name = 'Mug';`,
            expect: [["Mug", 140, 15]],
            solution: R`UPDATE products SET price = 140, stock = 15 WHERE name = 'Mug';
SELECT name, price, stock FROM products WHERE name = 'Mug';`
          }
        },
        {
          cmd: "DELETE",
          title: "امسح صفوف، أو الأحسن متمسحهاش أصلًا",
          desc: R`[[DELETE FROM table WHERE ...]] بيمسح الصفوف اللي بتطابق، ومن غير WHERE بيمسح الجدول كله. قبل أي DELETE مهم، شغّل نفس الـ WHERE في [[SELECT count(*)]] الأول وشوف العدد.

وفي الداتا المهمة (أوردرات، يوزرز، فواتير) الأحسن غالبًا «soft delete»: عمود [[deleted_at]] بتحط فيه الوقت بدل ما تمسح، فالتاريخ يفضل موجود وتقدر ترجّعه.`,
          example: R`SELECT count(*) FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';
DELETE FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';
DELETE FROM products WHERE name = 'Sticker' RETURNING id, name;
ALTER TABLE products ADD COLUMN deleted_at timestamptz;
UPDATE products SET deleted_at = now() WHERE name = 'Cap';
SELECT name FROM products WHERE deleted_at IS NULL;`,
          try: R`اعمل soft delete لمنتج، وبعدين اعمل [[SELECT name FROM products]] من غير الشرط: هتلاقيه لسه ظاهر. ده أكبر عيب في الـ soft delete: كل استعلام لازم يفتكر الشرط.`,
          flag: "script danger",
          deep: {
            why: "المسح النهائي مالوش رجوع غير من باك أب. ويوزر بيقول «أنا مسحت الأوردر بالغلط» أو محاسب بيسأل عن فاتورة من سنة، ساعتها هتفرق معاك إنك مسحت ولا علّمت.",
            how: R`DELETE بيعلّم الصفوف إنها ميتة، والمساحة بترجع للاستخدام بعد VACUUM. والـ foreign keys ممكن تمنع المسح أو تمسح صفوف تانية معاه (درس ON DELETE في المستوى التاني).

[[TRUNCATE]] بيفضّي الجدول كله في لحظة من غير ما يعدّي صف صف، و [[RESTART IDENTITY]] بيرجّع الترقيم من الأول. ده أداة للـ lab والاختبارات، مش لكود التطبيق.

الـ soft delete ليه تمن: كل استعلام لازم يفلتر [[deleted_at IS NULL]] (سهل تنساه)، والـ UNIQUE بيبقى محتاج partial index ([[WHERE deleted_at IS NULL]]) عشان يوزر ممسوح ميمنعش حد يسجل بنفس الإيميل، وقوانين الخصوصية أحيانًا بتطلب مسح حقيقي.`,
            when: "مسح حقيقي للداتا المؤقتة (sessions منتهية، أكواد OTP قديمة). soft delete للداتا اللي ليها قيمة تاريخية أو مالية.",
            mistakes: R`DELETE من غير WHERE، أو بـ WHERE فيها OR من غير أقواس. soft delete وتنسى الفلتر في صفحة واحدة، فالمنتجات الممسوحة تظهر في المتجر. وإيميل UNIQUE مع soft delete، فاليوزر اللي مسح حسابه ميقدرش يسجل تاني.`
          },
          lines: [
            "عد الأول: كام صف هيتمسح؟",
            "نفس الشرط بالظبط، بس المرة دي مسح.",
            "امسح منتج ورجّع اللي اتمسح عشان تتأكد.",
            "ضيف عمود للـ soft delete.",
            "بدل المسح: علّم إنه اتمسح إمتى.",
            "وكل قراية لازم تستبعد الممسوح."
          ],
          sol: R`بعد [[UPDATE products SET deleted_at = now() WHERE name = 'Cap']]، الاستعلام اللي فيه [[WHERE deleted_at IS NULL]] مش هيجيب Cap، لكن [[SELECT name FROM products]] من غير شرط هيجيبه عادي جنب الباقيين. يعني أي صفحة أو تقرير أو join نسي الشرط هيعرض منتج «ممسوح».

الحلول المعتادة: [[VIEW]] اسمها مثلًا active_products فيها الشرط والكود يقرا منها، أو global filter في الـ ORM، أو partial index [[WHERE deleted_at IS NULL]] عشان الاستعلامات اليومية تفضل سريعة. وافتكر إن الـ UNIQUE constraints لسه شايفة الصف الممسوح: لو عايز تضيف Cap جديد باسم unique هيترفض.`,
          solCode: R`UPDATE products SET deleted_at = now() WHERE name = 'Cap';
SELECT name FROM products WHERE deleted_at IS NULL;   -- من غير Cap
SELECT name FROM products;                            -- Cap لسه ظاهر`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10),
  (2, 'Old Poster', 50.00, 0),
  (3, 'Broken Cap', 20.00, 0);`,
            starter: R`-- امسح المنتجات اللي مخزونها خلص (stock = 0) بس
-- والـ SELECT اللي تحت بيرجّع الـ id والاسم للي فضل
DELETE FROM products ...;
SELECT id, name FROM products;`,
            expect: [[1, "T-shirt"]],
            solution: R`DELETE FROM products WHERE stock = 0;
SELECT id, name FROM products;`
          }
        }
      ]
    },
    {
      t: "التجميع: count و GROUP BY و HAVING",
      l: 1,
      n: "بدل ما تجيب كل الصفوف وتحسب في الكود، القاعدة تحسب وترجّعلك الرقم",
      items: [
        {
          cmd: "count و sum و avg",
          title: "احسب رقم واحد من صفوف كتير",
          desc: R`الـ aggregate functions بتاخد صفوف كتير وترجّع قيمة واحدة: [[count]] للعدد، و [[sum]] للمجموع، و [[avg]] للمتوسط، و [[min]] و [[max]]. من غير GROUP BY، النتيجة صف واحد للجدول كله (بعد الـ WHERE).

ده أسرع بكتير من إنك تجيب ١٠ آلاف أوردر للكود وتجمعهم بـ [[reduce]]: القاعدة بتحسب جنب الداتا وبترجّع رقم واحد.`,
          example: R`SELECT count(*) FROM orders;
SELECT count(*) FILTER (WHERE status = 'paid') AS paid_orders FROM orders;
SELECT sum(total) AS revenue FROM orders WHERE status = 'paid';
SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;
SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';`,
          try: R`شغّل [[SELECT sum(total) FROM orders WHERE status = 'refunded']] من غير COALESCE: هترجع NULL مش صفر، والواجهة كانت هتكتب «null جنيه». اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: صف واحد فيه عمودين: إجمالي الأوردرات [[refunded]] (ولو مفيش يبقى 0 مش NULL)، وعدد الأوردرات [[paid]].`,
          flag: "script",
          deep: {
            why: "لوحة الأدمن كلها أرقام: عدد الأوردرات، والإيرادات، ومتوسط الأوردر. لو جبت الصفوف كلها وحسبت في JavaScript، هتنقل ميجات على الشبكة عشان رقم واحد، والصفحة هتبطأ كل ما الداتا تكبر.",
            how: R`الـ aggregate بيعدّي على الصفوف اللي عدّت من WHERE وبيجمّع قيمة. كلها بتتجاهل NULL ما عدا [[count(*)]].

[[sum]] على صفر صفوف بترجّع NULL مش 0، عشان كده [[COALESCE(sum(x), 0)]]. و [[avg]] على integer بترجّع numeric بخانات كتير، فقرّب بـ [[round]].

[[FILTER (WHERE ...)]] (Postgres) بيخليك تحسب كذا عدد مشروط في نفس الاستعلام بدل كذا رحلة للقاعدة: [[count(*) FILTER (WHERE status = 'paid')]] جنب [[count(*) FILTER (WHERE status = 'pending')]].

[[count(*)]] على جدول ضخم في Postgres بطيء نسبيًا، لأنه لازم يتأكد إن كل صف «ظاهر» للـ transaction بتاعتك. للوحات الكبيرة ممكن تستخدم رقم تقريبي من [[pg_class.reltuples]].

في Prisma: [[prisma.order.count({ where })]] و [[prisma.order.aggregate({ _sum: { total: true } })]].`,
            when: "أي رقم ملخّص: dashboards، وعدد النتايج في الصفحات، وتقارير.",
            mistakes: R`sum بترجّع NULL والواجهة تعرضها. تجيب كل الصفوف عشان [[.length]]. وتحط عمود عادي جنب aggregate من غير GROUP BY: [[column "orders.status" must appear in the GROUP BY clause or be used in an aggregate function]].`
          },
          lines: [
            "عدد كل الأوردرات.",
            "عدد المدفوع بس، في نفس المرور على الجدول.",
            "إجمالي الإيرادات من المدفوع.",
            "متوسط السعر لخانتين، وأرخص وأغلى منتج.",
            "لو مفيش صفوف sum بترجّع NULL، فـ COALESCE تخليها صفر."
          ],
          sol: R`هيرجّع صف واحد وعمود sum فاضي: ده NULL (psql بيعرض NULL كخانة فاضية؛ اكتب [[\pset null '(null)']] عشان تشوفها). [[sum]] على صفر صفوف مش بيرجّع 0، بيرجّع NULL، لأن مفيش قيم يجمعها. نفس الكلام على avg و min و max. أما [[count]] فبيرجّع 0.

من Node بـ [[pg]] هتوصلك [[null]]، والواجهة تكتب «null جنيه» أو [[NaN]] لو جمعت عليها. الحل [[COALESCE(sum(total), 0)]] في الاستعلام نفسه. ولاحظ إن COALESCE بيرجّع [[0]] من غير [[.00]]، لأن الـ 0 integer؛ لو عايز الشكل ثابت اكتب [[COALESCE(sum(total), 0.00)]] أو [[0::numeric(10,2)]].`,
          solCode: R`\pset null '(null)'
SELECT sum(total) FROM orders WHERE status = 'refunded';                  -- (null)
SELECT count(*) FROM orders WHERE status = 'refunded';                    -- 0
SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';   -- 0`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT sum(total) FILTER (WHERE status = 'refunded') AS refunded,
       count(*) AS paid_orders
FROM orders;`,
            expect: [[0,5]],
            solution: R`SELECT COALESCE(sum(total) FILTER (WHERE status = 'refunded'), 0) AS refunded,
       count(*) FILTER (WHERE status = 'paid') AS paid_orders
FROM orders;`
          }
        },
        {
          cmd: "GROUP BY",
          title: "رقم لكل مجموعة: أوردرات كل يوزر أو كل حالة",
          desc: R`[[GROUP BY]] بيقسم الصفوف لمجموعات حسب عمود أو أكتر، والـ aggregate بيتحسب لكل مجموعة لوحدها. فبدل رقم واحد للجدول، بتاخد صف لكل حالة أو لكل يوزر أو لكل يوم.

القاعدة: أي عمود في SELECT لازم يا إما يبقى في GROUP BY، يا إما جوه aggregate.`,
          example: R`SELECT status, count(*) AS orders FROM orders GROUP BY status;
SELECT user_id, count(*) AS orders, sum(total) AS spent
FROM orders GROUP BY user_id ORDER BY spent DESC;
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY day ORDER BY day;
SELECT status, user_id FROM orders GROUP BY status;       -- error: user_id لازم يبقى في GROUP BY`,
          try: R`غيّر [[date_trunc('day', ...)]] لـ [[date_trunc('month', ...)]]. وبعدين اعمل GROUP BY على [[created_at]] نفسه من غير date_trunc، وشوف ليه كل أوردر بقى مجموعة لوحده. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: إيراد كل شهر من الأوردرات [[paid]]: عمود الشهر بـ [[date_trunc('month', created_at)]] وعمود المجموع، مترتبين بالشهر.`,
          flag: "script",
          deep: {
            why: "أغلب التقارير «لكل»: إيرادات لكل يوم، أوردرات لكل يوزر، مبيعات لكل منتج. GROUP BY بيعملها في استعلام واحد بدل loop على كل يوزر.",
            how: R`الترتيب: WHERE بيفلتر الصفوف ← بتتقسم مجموعات (بـ hash أو بترتيب) ← الـ aggregate بيتحسب لكل مجموعة ← HAVING ← SELECT.

ليه الـ error في آخر سطر؟ مجموعة status = 'paid' فيها أوردرات من يوزرز كتير، فأنهي user_id يتعرض؟ Postgres مش هيختار عشوائي، بيرفض.

Postgres بيسمح تكتب اسم عمود الناتج أو رقمه في GROUP BY ([[GROUP BY day]] أو [[GROUP BY 1]]). ولو عملت GROUP BY على primary key (زي [[users.id]])، تقدر تعرض أي عمود تاني من نفس الجدول (زي email) من غير ما تحطه في GROUP BY، لأنه معروف إنه واحد لكل id.

الأيام اللي مفيهاش أوردرات مش هتظهر خالص، فالرسم البياني هيبقى فيه فجوات. الحل: [[generate_series]] لكل الأيام مع LEFT JOIN.

في Prisma: [[prisma.order.groupBy({ by: ["status"], _count: true })]].`,
            when: "أي تقرير أو رسم بياني أو ترتيب «الأكتر».",
            mistakes: R`GROUP BY على timestamp كامل فكل صف مجموعة. تجمع بالاسم بدل الـ id فيوزرين بنفس الاسم يتدمجوا. والفجوات في الرسم البياني.`
          },
          lines: [
            "عدد الأوردرات لكل حالة.",
            "لكل يوزر: عدد أوردراته ومجموع اللي صرفه،",
            "والأكتر صرفًا الأول.",
            "إيرادات كل يوم: date_trunc بيقص الوقت لأول اليوم،",
            "من المدفوع بس،",
            "مجمّعة باليوم ومترتبة.",
            "غلط: user_id مش في GROUP BY ومش جوه aggregate."
          ],
          sol: R`بـ [[date_trunc('month', ...)]] هتاخد صف لكل شهر، والقيمة بتبان كأول لحظة في الشهر: [[2026-09-01 00:00:00+00]]. عشان تشوف أكتر من صف ضيف أوردرين paid بتاريخ في أغسطس (INSERT بـ created_at صريح).

GROUP BY على [[created_at]] نفسه هيرجّع صف لكل أوردر تقريبًا، لأن الوقت فيه ميكروثواني ومفيش أوردرين في نفس اللحظة بالظبط، فكل مجموعة فيها صف واحد والـ sum هو نفس total. المجموعة بتتكوّن من القيم المتساوية بالظبط، فلازم تقرّب الوقت لليوم أو الشهر الأول. ولو التقرير طلع صف لكل أوردر، أول حاجة تبص عليها هي العمود اللي في GROUP BY.`,
          solCode: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 300, '2026-08-15 10:00+00' FROM users LIMIT 1;
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY month ORDER BY month;
SELECT created_at, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY created_at ORDER BY created_at;   -- صف لكل أوردر`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT created_at AS month, sum(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY created_at
ORDER BY 1;`,
            expectSql: R`SELECT date_trunc('month', created_at), sum(total) FROM orders WHERE status = 'paid' GROUP BY 1 ORDER BY 1;`,
            solution: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1;`,
            ordered: true
          }
        },
        {
          cmd: "HAVING",
          title: "فلتر المجموعات بعد ما تتحسب",
          desc: R`[[HAVING]] زي WHERE بس بيشتغل بعد GROUP BY، على نتيجة الـ aggregate. «هات اليوزرز اللي عملوا أكتر من ٣ أوردرات» محتاجة HAVING، لأن عدد الأوردرات مش معروف غير بعد التجميع.

WHERE بيفلتر الصفوف قبل التجميع، و HAVING بيفلتر المجموعات بعده، وتقدر تستخدم الاتنين في نفس الاستعلام.`,
          example: R`SELECT user_id, count(*) AS orders
FROM orders
GROUP BY user_id
HAVING count(*) > 3;
SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;
SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_id;   -- error: aggregate في WHERE`,
          try: R`جرّب [[HAVING spent >= 1000]] بالاسم بدل [[sum(total)]]: Postgres هيرفض. وبعدين حط نفس الاسم في ORDER BY: هيقبله. ليه؟ الإجابة في ترتيب التنفيذ. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[user_id]] ومجموع اللي دفعه (أوردرات [[paid]] بس)، لليوزرز اللي دفعوا 1000 أو أكتر، من الأكبر للأصغر.`,
          flag: "script",
          deep: {
            why: "أسئلة زي «اليوزرز الـ VIP» و «المنتجات اللي اتباعت أكتر من ١٠٠ مرة» شرطها على رقم متجمّع، ومفيش طريقة تكتبها في WHERE.",
            how: R`ترتيب التنفيذ: FROM ← WHERE ← GROUP BY ← HAVING ← SELECT ← ORDER BY. عشان كده:

- WHERE مش شايف [[count(*)]]، لأن التجميع لسه محصلش.
- HAVING مش شايف اسم [[spent]] اللي في SELECT، لأن SELECT بيتحسب بعده (في Postgres؛ MySQL أرحم في النقطة دي).
- ORDER BY شايف كل حاجة، لأنه في الآخر.

أي شرط مش على aggregate (زي status) حطه في WHERE: الصفوف بتتفلتر بدري، فالتجميع بيشتغل على داتا أقل.`,
            when: "لما الشرط على نتيجة count أو sum أو avg. وده سؤال انترفيو ثابت (الفرق بين WHERE و HAVING).",
            mistakes: R`تحط [[HAVING status = 'paid']]: هتشتغل لو status في GROUP BY، و Postgres غالبًا بينقلها لـ WHERE لوحده، بس مش واضحة ومتعتمدش إن كل قاعدة هتعمل كده. تستخدم اسم الـ AS في HAVING. وتحط aggregate في WHERE.`
          },
          lines: [
            "لكل يوزر عدد أوردراته،",
            "من جدول الأوردرات،",
            "مجمّعة باليوزر،",
            "وخلّي اللي عددهم أكتر من ٣ بس.",
            "لكل يوزر مجموع اللي صرفه،",
            "من جدول الأوردرات،",
            "WHERE: الصفوف المدفوعة بس، قبل التجميع،",
            "مجمّعة باليوزر،",
            "HAVING: المجموعات اللي صرفت ١٠٠٠ أو أكتر، بعد التجميع،",
            "والأكتر الأول (ORDER BY يعرف اسم spent).",
            "غلط: WHERE ميعرفش count لسه."
          ],
          sol: R`[[HAVING spent >= 1000]] هيطلّع [[ERROR:  column "spent" does not exist]]. و [[ORDER BY spent DESC]] هيشتغل عادي.

السبب ترتيب التنفيذ المنطقي: FROM ثم WHERE ثم GROUP BY ثم HAVING ثم SELECT ثم ORDER BY ثم LIMIT. الاسم [[spent]] بيتعمل في SELECT، فـ HAVING (اللي قبلها) مش شايفاه، و ORDER BY (اللي بعدها) شايفاه. عشان كده في HAVING بتكرر [[sum(total)]]، وده مش بيحسبها مرتين، Postgres بيعرف إنها نفس الـ aggregate. (بعض القواعد زي MySQL بتسمح بالاسم في HAVING، بس دي إضافة منها مش SQL قياسي.)

ده سؤال انترفيو مشهور: «اكتب ترتيب تنفيذ SELECT»، و «ليه مينفعش aggregate في WHERE».`,
          solCode: R`SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid'
GROUP BY user_id HAVING spent >= 1000;
-- ERROR:  column "spent" does not exist
SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid'
GROUP BY user_id HAVING sum(total) >= 1000
ORDER BY spent DESC;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING spent >= 1000
ORDER BY spent DESC;`,
            expect: [[1,1410], [2,1200]],
            solution: R`SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;`,
            ordered: true
          }
        }
      ]
    }
  ]
});
