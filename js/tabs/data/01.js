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
          teach: R`## الفكرة: ٣ أوامر = دورة حياة الداتا كلها

المثال ٣ أوامر بس، بس فيهم الحكاية كلها: **اعمل مكان** للداتا ([[CREATE TABLE]])، و**حط فيه** صف ([[INSERT]])، و**اقرا** اللي اتحط ([[SELECT]]). هنفكهم واحد واحد ونشوف psql بيرد بإيه بعد كل واحد.

كل الناتج تحت حقيقي: اتشغّل في psql على [[postgres:18]] جوه Docker (نفس الكلام على [[postgres:17]] اللي في الـ lab).

---

## ١. [[CREATE TABLE demo_products ( ... );]]

~~~text الأمر
CREATE TABLE demo_products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL
);
~~~

الأمر ده بيقول للقاعدة: «اعملي جدول اسمه [[demo_products]]، وده شكل كل صف فيه». بين القوسين [[( )]] الأعمدة، وكل عمود في سطر: **اسمه** وبعده **نوعه** وبعده **شروطه**، والأعمدة مفصولة بـ [[,]] (آخر عمود من غير فاصلة).

| العمود | النوع | الشرط | معناه |
|---|---|---|---|
| [[id]] | [[serial]] | [[PRIMARY KEY]] | رقم بيزيد لوحده (1، 2، 3...)، ومينفعش يتكرر ولا يبقى فاضي |
| [[name]] | [[text]] | [[NOT NULL]] | نص بأي طول، وإجباري |
| [[price]] | [[numeric]] | [[NOT NULL]] | رقم دقيق (مناسب للفلوس)، وإجباري |

- [[serial]] مش نوع حقيقي، هو اختصار: «عمود integer، وقيمته الافتراضية الرقم الجاي من عدّاد». العدّاد ده اسمه **sequence**.
- [[PRIMARY KEY]] (المفتاح الأساسي) العمود اللي بيميّز كل صف عن التاني. بيه هتقول بعدين «المنتج رقم 2».
- [[NOT NULL]]: [[NULL]] في SQL معناها «مفيش قيمة». NOT NULL يعني الخانة دي مينفعش تفضل فاضية.
- و [[;]] في الآخر بتقول لـ psql «الأمر خلص، نفّذ». من غيرها psql هيفضل مستني بقية الأمر.

~~~text الناتج
CREATE TABLE
~~~

psql بيرد باسم الأمر اللي اتنفذ، وده معناه إنه نجح. عايز تتأكد شكل الجدول؟ [[\d demo_products]] (أمر خاص بـ psql، [[d]] = describe):

~~~text \d demo_products
                            Table "public.demo_products"
 Column |  Type   | Collation | Nullable |                  Default
--------+---------+-----------+----------+-------------------------------------------
 id     | integer |           | not null | nextval('demo_products_id_seq'::regclass)
 name   | text    |           | not null |
 price  | numeric |           | not null |
Indexes:
    "demo_products_pkey" PRIMARY KEY, btree (id)
~~~

لاحظ ٣ حاجات:
- [[id]] طلع نوعه [[integer]]، والـ Default بتاعه [[nextval('demo_products_id_seq')]]: ده الـ serial بعد ما اتفك. [[nextval]] يعني «هات الرقم الجاي من العدّاد ده».
- عمود [[Nullable]] مكتوب فيه [[not null]] للتلاتة (الـ PRIMARY KEY بيبقى NOT NULL لوحده).
- [[public]] اسم الـ schema (فولدر الجداول الافتراضي)، و [[demo_products_pkey]] index اتعمل لوحده عشان الـ PRIMARY KEY.

---

## ٢. [[INSERT INTO demo_products (name, price) VALUES ('لابتوب', 15000);]]

نقراه حتة حتة:

| الحتة | معناها |
|---|---|
| [[INSERT INTO demo_products]] | ضيف صف في الجدول ده |
| [[(name, price)]] | هبعتلك قيم العمودين دول بس، بالترتيب ده |
| [[VALUES ('لابتوب', 15000)]] | القيم نفسها، بنفس ترتيب الأعمدة |

- [['لابتوب']] بين علامة تنصيص **مفردة** لأنها نص. و [[15000]] رقم فمن غير تنصيص.
- [[id]] مش مكتوب خالص: القاعدة هتحط الـ Default بتاعه، يعني الرقم الجاي من العدّاد.

~~~text الناتج
INSERT 0 1
~~~

الرقم الأخير [[1]] هو المهم: **عدد الصفوف اللي اتضافت**. الـ [[0]] اللي قبله من زمان (كان OID الصف، وده مبقاش بيستخدم)، فهتلاقيه [[0]] دايمًا.

---

## ٣. [[SELECT id, name, price FROM demo_products;]]

اقراها زي الإنجليزي: «اختار [[id]] و [[name]] و [[price]] **من** جدول [[demo_products]]». مفيش شرط، فهيرجّع كل الصفوف.

~~~text الناتج
 id |  name  | price
----+--------+-------
  1 | لابتوب | 15000
(1 row)
~~~

- أول سطر أسماء الأعمدة، وتحتهم خط [[----+----]]، وبعده صف لكل سجل.
- الـ [[id]] طلع [[1]] مع إننا مكتبناهوش: ده شغل الـ serial.
- [[(1 row)]] عدد الصفوف اللي رجعت.

---

## ٤. اللي بيحصل في الـ «جرّب»

### منتج تاني

بعد [[INSERT INTO demo_products (name, price) VALUES ('ماوس', 250);]] ونفس الـ SELECT:

~~~text الناتج
 id |  name  | price
----+--------+-------
  1 | لابتوب | 15000
  2 | ماوس   |   250
(2 rows)
~~~

العدّاد اداله [[2]]. لاحظ كمان إن الأرقام متظبطة على اليمين والنصوص على الشمال: psql بيعمل كده عشان تفرق بينهم بعينك.

### منتج من غير سعر

~~~text INSERT INTO demo_products (name) VALUES ('كيبورد');
ERROR:  null value in column "price" of relation "demo_products" violates not-null constraint
DETAIL:  Failing row contains (3, كيبورد, null).
~~~

اقرا الـ error زي جملة: «قيمة null في عمود price في جدول ([[relation]]) demo_products بتكسر شرط not-null». والـ [[DETAIL]] بيوريك الصف اللي كان هيتضاف: [[3]] و [[كيبورد]] و [[null]] مكان السعر. يعني الصف اترفض كله، والقاعدة هي اللي رفضته مش الكود.

بس لاحظ الـ [[3]]: العدّاد اتسحب منه رقم قبل ما الفحص يفشل. فأول منتج سليم بعدها:

~~~text INSERT ... ('كيبورد', 400) RETURNING id;
 id
----
  4
(1 row)

INSERT 0 1
~~~

الرقم 3 راح ومش هيرجع. ده طبيعي: الـ id وظيفته يميّز الصف، مش يعد الصفوف.

### غلطة التنصيص المزدوج

~~~text INSERT INTO demo_products (name, price) VALUES ("لابتوب", 1);
ERROR:  column "لابتوب" does not exist
LINE 1: INSERT INTO demo_products (name, price) VALUES ("لابتوب", 1)...
                                                        ^
~~~

في SQL التنصيص المزدوج [[" "]] لأسماء الأعمدة والجداول، فـ Postgres دوّر على **عمود** اسمه لابتوب. والسهم [[^]] تحت السطر بيشاور على مكان الغلطة بالظبط.

---

## الخلاصة

| الأمر | بيعمل إيه | psql بيرد بـ |
|---|---|---|
| [[CREATE TABLE]] | يعرّف شكل الجدول: أعمدة وأنواع وشروط | [[CREATE TABLE]] |
| [[INSERT INTO ... VALUES]] | يضيف صف | [[INSERT 0 عدد_الصفوف]] |
| [[SELECT ... FROM]] | يقرا صفوف | جدول + [[(N rows)]] |

- كل أمر بيخلص بـ [[;]]، والنص بين [[' ']] مفردة، والأرقام من غير تنصيص.
- الأعمدة اللي مش مكتوبة في INSERT بتاخد الـ Default (زي [[id]])، ولو ملهاش Default ومكتوب عليها NOT NULL الصف بيترفض كله.
- اقرا الـ error من أوله: هو بيقولك العمود والجدول والشرط اللي اتكسر.

> في التمرين اللي تحت مطلوب أعمدة معينة بس، مش كل الأعمدة: نفس شكل الـ SELECT هنا، بس انت اللي بتختار الأسامي بعد كلمة SELECT.`,
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
          teach: R`## الفكرة: جدول بيحمي نفسه

المثال بيعمل جدول [[users]]، بس المرة دي كل عمود عليه شروط بتخلي القاعدة **ترفض** الداتا الغلط لوحدها: إيميل متكرر، أو اسم فاضي. وكمان فيه أعمدة بتتملي لوحدها ([[DEFAULT]]) فمش محتاج تبعتها.

الناتج تحت من psql على [[postgres:18]] جوه Docker.

---

## ١. تعريف الجدول سطر سطر

~~~text الأمر
CREATE TABLE users (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL UNIQUE,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
~~~

المسافات اللي بين اسم العمود ونوعه مالهاش أي معنى: متحطوطة عشان الأنواع تيجي تحت بعض وتتقري بسهولة.

### [[id uuid PRIMARY KEY DEFAULT gen_random_uuid()]]

| الحتة | معناها |
|---|---|
| [[uuid]] | نوع العمود: Universally Unique Identifier، رقم عشوائي ١٢٨ bit بيتكتب ٣٦ حرف زي [[fd40c24d-5002-...]] |
| [[PRIMARY KEY]] | ده العمود اللي بيميّز كل صف: فريد ومش NULL |
| [[DEFAULT gen_random_uuid()]] | لو الـ INSERT مبعتش id، احسبه بالدالة دي |

[[gen_random_uuid()]] دالة built-in (موجودة من غير extensions من Postgres 13) بتولّد uuid عشوائي. والأقواس [[()]] بعد اسمها معناها «نادي الدالة»، حتى لو مبتاخدش حاجة.

### [[email text NOT NULL UNIQUE]]

نص، وإجباري، و [[UNIQUE]] يعني مينفعش صفين يبقى ليهم نفس القيمة. ده اللي هيمنع حد يسجل بنفس الإيميل مرتين.

### [[name text NOT NULL]]

نص إجباري، من غير أي حاجة زيادة.

### [[created_at timestamptz NOT NULL DEFAULT now()]]

[[timestamptz]] = timestamp with time zone: لحظة في الزمن (تاريخ + ساعة). و [[now()]] بترجّع الوقت الحالي، فأي صف جديد بياخد وقت إنشاءه لوحده.

~~~text الناتج
CREATE TABLE
~~~

ونشوف اللي اتعمل بـ [[\d users]]:

~~~text \d users
                               Table "public.users"
   Column   |           Type           | Collation | Nullable |      Default
------------+--------------------------+-----------+----------+-------------------
 id         | uuid                     |           | not null | gen_random_uuid()
 email      | text                     |           | not null |
 name       | text                     |           | not null |
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
~~~

تحت [[Indexes]] فيه حاجتين Postgres عملهم لوحده:
- [[users_pkey]] للـ PRIMARY KEY.
- [[users_email_key]] للـ UNIQUE. الاسم بيتكوّن كده: اسم الجدول + اسم العمود + [[key]]. افتكر الاسم ده، هيظهر في الـ error بعد شوية.

---

## ٢. [[INSERT INTO users (email, name) VALUES ('you@example.com', 'Ali');]]

بنبعت عمودين بس من الأربعة. الـ [[id]] و [[created_at]] مش مذكورين، فكل واحد بياخد الـ DEFAULT بتاعه.

~~~text الناتج
INSERT 0 1
~~~

صف واحد اتضاف.

---

## ٣. [[SELECT * FROM users;]]

[[*]] معناها «كل الأعمدة».

~~~text الناتج
                  id                  |      email      | name |          created_at
--------------------------------------+-----------------+------+-------------------------------
 fd40c24d-5002-4118-b356-41ff21b0a62d | you@example.com | Ali  | 2026-10-07 08:26:57.080193+00
(1 row)
~~~

- الـ [[id]] اتولّد عشوائي (عندك هيطلع رقم تاني خالص).
- الـ [[created_at]] فيه الوقت لحد الميكروثانية (٦ أرقام بعد العلامة)، و [[+00]] في الآخر معناها إن العرض بتوقيت UTC، لأن الـ session هنا [[TimeZone = Etc/UTC]]. لو توقيت الـ session القاهرة هتشوف نفس اللحظة بـ [[+03]].

---

## ٤. القاعدة بترفض (الـ «جرّب»)

### نفس الإيميل تاني

~~~text INSERT INTO users (email, name) VALUES ('you@example.com', 'Ali');
ERROR:  duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(you@example.com) already exists.
~~~

- [[duplicate key value]]: القيمة متكررة.
- [[violates unique constraint "users_email_key"]]: كسرت الشرط اللي اسمه كذا. ده نفس الاسم اللي شفناه في [[\d users]]. في الكود بتشيك على اسم الـ constraint ده (أو كود الـ error [[23505]]) عشان ترجّع لليوزر «الإيميل ده متسجل قبل كده».
- [[DETAIL]] بيقولك القيمة نفسها.

### من غير اسم

~~~text INSERT INTO users (email) VALUES ('x@example.com');
ERROR:  null value in column "name" of relation "users" violates not-null constraint
DETAIL:  Failing row contains (3b90633d-bb58-48fb-92ca-d9a03310f090, x@example.com, null, 2026-10-07 08:26:57.084316+00).
~~~

الـ [[DETAIL]] بيوريك الصف اللي كان هيتضاف: الـ id والـ created_at اتحسبوا من الـ DEFAULT، والـ name بقى [[null]] لأنه ملوش DEFAULT، فالشرط اتكسر والصف كله اترفض.

### اتأكد إن مفيش حاجة غلط اتحفظت

~~~text SELECT count(*) FROM users;
 count
-------
     1
(1 row)
~~~

[[count(*)]] بتعد الصفوف. لسه صف واحد: المحاولتين الغلط مسابوش أي أثر.

---

## ٥. حتة عن الأسامي

Postgres بيحوّل أي اسم مش متنصّص لحروف small. جربناها:

~~~text CREATE TABLE camel (createdAt int, "createdAt2" int); ثم \d camel
   Column   |  Type   | Collation | Nullable | Default
------------+---------+-----------+----------+---------
 createdat  | integer |           |          |
 createdAt2 | integer |           |          |
~~~

[[createdAt]] اتخزن [[createdat]]، والمتنصّص بس اللي فضل زي ما هو. عشان كده العرف في Postgres [[snake_case]] زي [[created_at]].

---

## الخلاصة

| الكلمة | بتعمل إيه | لو اتكسرت |
|---|---|---|
| [[PRIMARY KEY]] | العمود المميّز للصف | duplicate key / null value |
| [[NOT NULL]] | العمود إجباري | [[violates not-null constraint]] |
| [[UNIQUE]] | القيمة متتكررش | [[violates unique constraint "..._key"]] |
| [[DEFAULT x]] | قيمة لو العمود مش مبعوت | — |

- الشروط جوه الجدول بتحمي الداتا من أي حد بيكتب فيها: الـ API، أو سكربت، أو أدمن بإيده.
- الأمر اللي فيه غلطة بيترفض **كله**، مفيش صف نص نص.
- [[SELECT *]] تمام في psql وانت بتجرّب، بس في الكود اكتب أسماء الأعمدة.`,
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
          teach: R`## الفكرة: كل عمود بنوع، والنوع هو أول حارس

المثال بيعمل جدول [[products]] فيه ٧ أعمدة، كل واحد بنوع مختلف، وبعدين يضيف منتج. هنمشي على الأعمدة واحد واحد: النوع ده بيقبل إيه، وبيرفض إيه، وليه اخترناه.

الناتج تحت من psql على [[postgres:18]] جوه Docker.

---

## ١. الأعمدة

~~~text الأمر
CREATE TABLE products (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  price      numeric(10,2) NOT NULL,
  stock      integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  attrs      jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
~~~

| العمود | النوع | بيخزن إيه | الـ DEFAULT |
|---|---|---|---|
| [[id]] | [[bigint]] | رقم صحيح كبير (لحد حوالي 9 × 10^18) | الرقم الجاي (IDENTITY) |
| [[name]] | [[text]] | نص بأي طول | مفيش، إجباري |
| [[price]] | [[numeric(10,2)]] | رقم عشري مظبوط: ١٠ أرقام منهم ٢ بعد العلامة | مفيش، إجباري |
| [[stock]] | [[integer]] | رقم صحيح (لحد 2,147,483,647) | [[0]] |
| [[is_active]] | [[boolean]] | [[true]] أو [[false]] | [[true]] |
| [[attrs]] | [[jsonb]] | JSON متحلّل (binary) تقدر تدوّر جواه | [['{}']] object فاضي |
| [[created_at]] | [[timestamptz]] | لحظة في الزمن | [[now()]] |

### [[bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]]

دي الطريقة الحديثة لـ «رقم بيزيد لوحده» (بدل [[serial]]): [[GENERATED]] يعني القاعدة هي اللي بتولّده، و [[ALWAYS]] يعني دايمًا، حتى لو انت حاولت تبعته، و [[IDENTITY]] اسم الميزة. التفاصيل في درس «PRIMARY KEY».

### [[numeric(10,2)]]

الرقمين بين القوسين اسمهم **precision** (كل الأرقام) و **scale** (اللي بعد العلامة). يعني أكبر قيمة 99,999,999.99. جربنا نعدّيها:

~~~text INSERT INTO products (name, price) VALUES ('Big', 123456789.00);
ERROR:  numeric field overflow
DETAIL:  A field with precision 10, scale 2 must round to an absolute value less than 10^8.
~~~

١٠ أرقام ناقص ٢ بعد العلامة = ٨ أرقام قبلها، يعني أقل من [[10^8]] (مية مليون).

### [[jsonb NOT NULL DEFAULT '{}']]

[[jsonb]] (b = binary) بيحلّل الـ JSON وهو بيتخزن، فلو مش JSON سليم بيرفضه. و [['{}']] بين تنصيص مفرد لأن الـ JSON بيتكتب كنص، و Postgres بيحوّله.

~~~text الناتج
CREATE TABLE
~~~

---

## ٢. الـ INSERT

~~~text الأمر
INSERT INTO products (name, price, stock, attrs)
VALUES ('T-shirt', 250.00, 40, '{"color": "black", "sizes": ["M", "L"]}');
~~~

- الأمر على سطرين عادي: psql مش بينفّذ غير لما يلاقي [[;]].
- [[is_active]] و [[created_at]] و [[id]] مش مذكورين، فبياخدوا الـ DEFAULT.
- جوه الـ JSON التنصيص **مزدوج** [["color"]] لأن ده قانون JSON نفسه، والـ JSON كله ملفوف بتنصيص **مفرد** لأنه نص في SQL. الاتنين مع بعض عادي.

~~~text الناتج
INSERT 0 1
~~~

~~~text SELECT * FROM products;
 id |  name   | price  | stock | is_active |                  attrs                  |          created_at
----+---------+--------+-------+-----------+-----------------------------------------+-------------------------------
  1 | T-shirt | 250.00 |    40 | t         | {"color": "black", "sizes": ["M", "L"]} | 2026-10-07 08:27:05.534548+00
(1 row)
~~~

- [[price]] اتعرض [[250.00]] بخانتين دايمًا، عشان الـ scale = 2.
- [[is_active]] اتعرض [[t]]: ده شكل psql لـ true (و [[f]] لـ false).
- وتقدر تقرا من جوه الـ JSON: [[->>]] بيرجّع القيمة كنص، و [[->]] بيرجّعها JSON:

~~~text SELECT attrs->>'color' AS color, attrs->'sizes' AS sizes FROM products;
 color |   sizes
-------+------------
 black | ["M", "L"]
(1 row)
~~~

---

## ٣. النوع بيرفض وبيحوّل (الـ «جرّب»)

### نص في عمود رقم

~~~text INSERT INTO products (name, price, stock) VALUES ('X', 1, 'abc');
ERROR:  invalid input syntax for type integer: "abc"
LINE 1: ...T INTO products (name, price, stock) VALUES ('X', 1, 'abc');
                                                                ^
~~~

[[invalid input syntax for type integer]]: «abc» مش رقم، فمرفوض.

### [['yes']] في عمود boolean

~~~text INSERT INTO products (name, price, is_active) VALUES ('Yes-test', 1, 'yes') RETURNING is_active;
 is_active
-----------
 t
(1 row)

INSERT 0 1
~~~

اتقبل! Postgres بيفهم صيغ معروفة للـ boolean ويحوّلها:

~~~text SELECT 'on'::boolean, '0'::boolean, 'no'::boolean;
 bool | bool | bool
------+------+------
 t    | f    | f
(1 row)
~~~

[[::]] معناها «حوّل للنوع ده» (cast). [['yes']] و [['on']] و [['1']] و [['true']] كلهم true، وعكسهم false.

### JSON بايظ

~~~text INSERT INTO products (name, price, attrs) VALUES ('X', 1, '{bad json');
ERROR:  invalid input syntax for type json
LINE 1: ...NTO products (name, price, attrs) VALUES ('X', 1, '{bad json...
                                                             ^
DETAIL:  Token "bad" is invalid.
CONTEXT:  JSON data, line 1: {bad...
~~~

الـ [[DETAIL]] بيقولك الكلمة اللي وقف عندها: في JSON المفتاح لازم يبقى بين [[" "]]، و [[bad]] من غيرها.

### تاريخ مش موجود

~~~text SELECT '2026-02-30'::timestamptz;
ERROR:  date/time field value out of range: "2026-02-30"
~~~

مفيش ٣٠ فبراير، فـ [[timestamptz]] بيرفضه. لو العمود [[text]] كان هيقبله عادي.

### الـ uuid أصغر من نصه

~~~text SELECT pg_column_size('fd40c24d-5002-4118-b356-41ff21b0a62d'::uuid) AS uuid_bytes, pg_column_size('fd40c24d-5002-4118-b356-41ff21b0a62d'::text) AS text_bytes;
 uuid_bytes | text_bytes
------------+------------
         16 |         40
(1 row)
~~~

نفس الـ uuid: ١٦ byte كنوع [[uuid]]، و ٤٠ كـ [[text]] (٣٦ حرف + ٤ byte header). [[pg_column_size]] بترجّع حجم القيمة بالـ byte.

وفي الآخر امسح منتج التجربة: [[DELETE FROM products WHERE name = 'Yes-test';]] بترد [[DELETE 1]].

---

## الخلاصة

| الداتا | النوع | مش |
|---|---|---|
| نص | [[text]] | — |
| عدد/كمية | [[integer]] | text |
| IDs وعدادات كبيرة | [[bigint]] | integer |
| فلوس | [[numeric(10,2)]] | float |
| نعم/لا | [[boolean]] | text أو integer |
| وقت | [[timestamptz]] | text أو timestamp من غير tz |
| تاريخ من غير ساعة | [[date]] | timestamptz |
| ID عشوائي | [[uuid]] | text |
| مواصفات مرنة | [[jsonb]] | json أو text |

- النوع بيرفض اللي مش منطقي ([['abc']] في رقم، ٣٠ فبراير، JSON بايظ) وبيحوّل الصيغ المعروفة ([['yes']] لـ true).
- اختار أضيق نوع بيوصف الداتا، عشان القاعدة تقدر ترتب وتجمع وتقارن صح.`,
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
          teach: R`## الفكرة: ٤ حسبات صغيرة بتوريك الفرق

المثال كله [[SELECT]] من غير جدول: بنستخدم Postgres كآلة حاسبة عشان نقارن نوعين أرقام. [[float]] بيقرّب الرقم في binary، و [[numeric]] بيحفظه decimal بالظبط. الناتج تحت من psql على [[postgres:18]] جوه Docker.

قبل ما نبدأ، رمزين:
- [[::]] معناها cast، يعني «اعتبر القيمة دي من النوع ده». [[0.1::float8]] = الرقم 0.1 كـ float.
- [[--]] تعليق: كل اللي بعدها في السطر psql بيتجاهله. الأرقام اللي في التعليقات في المثال هي الناتج المتوقع.

---

## ١. [[SELECT 0.1::float8 + 0.2::float8;]]

[[float8]] = [[double precision]] = رقم float حجمه ٨ byte، نفس نوع الأرقام في JavaScript.

~~~text الناتج
      ?column?
---------------------
 0.30000000000000004
(1 row)
~~~

- [[?column?]] اسم psql للعمود اللي ملوش اسم (مكتبناش [[AS]]).
- النتيجة مش 0.3. ليه؟ الكمبيوتر بيخزن الـ float بأرقام binary (0 و 1)، و 0.1 في binary كسر مبيخلصش (زي 1/3 في decimal = 0.3333...). فبيتخزن أقرب رقم ليه، والخطأ الصغير ده بيبان لما تجمع.

وعشان تتأكد إن ده مش مجرد شكل عرض:

~~~text SELECT 0.1::float8 + 0.2::float8 = 0.3::float8 AS f, 0.1 + 0.2 = 0.3 AS n;
 f | n
---+---
 f | t
~~~

المقارنة بالـ float طلعت [[f]] (false). يعني [[if (total == 0.3)]] في كود حقيقي هتفشل.

---

## ٢. [[SELECT 0.1::numeric + 0.2::numeric;]]

~~~text الناتج
 ?column?
----------
      0.3
(1 row)
~~~

[[numeric]] بيخزن الأرقام العشرية نفسها، فالحساب مظبوط. ولاحظ في المقارنة اللي فوق إن [[0.1 + 0.2 = 0.3]] من غير cast طلعت [[t]]: في Postgres أي رقم فيه علامة عشرية مكتوب في الاستعلام بيبقى [[numeric]] من الأول:

~~~text SELECT pg_typeof(0.1), pg_typeof(3.0), pg_typeof(100/3.0);
 pg_typeof | pg_typeof | pg_typeof
-----------+-----------+-----------
 numeric   | numeric   | numeric
~~~

[[pg_typeof]] بترجّع نوع القيمة.

---

## ٣. [[SELECT 19.999::numeric(10,2);]]

~~~text الناتج
 numeric
---------
   20.00
(1 row)
~~~

[[numeric(10,2)]] معناها خانتين بعد العلامة بالظبط. [[19.999]] فيها ٣، فـ Postgres **بيقرّب** لـ [[20.00]] من غير ما يطلّع error. التقريب لأقرب قيمة، والنص بيطلع لفوق:

~~~text SELECT 19.995::numeric(10,2), 19.994::numeric(10,2);
 numeric | numeric
---------+---------
   20.00 |   19.99
~~~

يعني لو حطيت نتيجة حسبة في عمود [[numeric(10,2)]]، الكسور الزيادة بتتقرّب بصمت. اعرف إن ده بيحصل.

---

## ٤. [[SELECT round(100 / 3.0, 2);]]

نفكها من جوه لبرة:

### [[100 / 3.0]]

~~~text SELECT 100 / 3.0;
      ?column?
---------------------
 33.3333333333333333
~~~

[[3.0]] numeric فالقسمة numeric، وبما إن 100/3 كسر مبيخلصش، Postgres بيوقف عند عدد خانات معيّن (١٦ هنا). وخد بالك: [[100 / 3]] من غير [[.0]] قسمة أعداد صحيحة وبترجّع [[33]] بس، والكسر بيضيع.

### [[round(..., 2)]]

[[round(x, 2)]] بيقرّب لخانتين بعد العلامة:

~~~text الناتج
 round
-------
 33.33
(1 row)
~~~

اسم العمود [[round]] لأن psql بيسمّي العمود باسم الدالة لو مسميتهوش.

---

## ٥. نفس المشكلة في JavaScript (الـ «جرّب»)

اتشغّل بـ Node:

~~~text console.log(0.1 + 0.2) و loop بيجمع 0.1 عشر مرات
0.30000000000000004
0.9999999999999999 false
1
~~~

- السطر الأول: نفس رقم [[float8]] بالظبط، لأن كل أرقام JavaScript float8.
- التاني: عشر جمعات لـ 0.1 طلعوا [[0.9999999999999999]]، و [[sum === 1]] = [[false]]. الخطأ بيتراكم.
- التالت: نفس الحسبة بالقروش (integer: 10 عشر مرات = 100، وقسمة على 100 وقت العرض بس) طلعت [[1]] بالظبط.

---

## الخلاصة

| الحسبة | float | numeric |
|---|---|---|
| [[0.1 + 0.2]] | [[0.30000000000000004]] | [[0.3]] |
| [[= 0.3]] | false | true |
| السرعة | أسرع | أبطأ شوية (مش فارق في تطبيقات الويب) |
| تستخدمه في | وزن، إحداثيات، scores | **فلوس** |

- الفلوس يا [[numeric(10,2)]] يا integer بالقروش ([[amount_cents]]). أبدًا float.
- [[numeric(10,2)]] بيقرّب الخانات الزيادة بصمت، فقرّب بنفسك بـ [[round(x, 2)]] في أي حسبة فيها قسمة.
- [[100 / 3]] قسمة أعداد صحيحة = [[33]]. لو عايز كسور خلي واحد منهم عشري ([[3.0]]).`,
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
          teach: R`## الفكرة: رقم بيتولّد لوحده، ومينفعش تلعب فيه

المثال بيعمل جدول [[orders]] الـ [[id]] بتاعه رقم متسلسل القاعدة بس اللي بتحطه، وبعدين يضيف أوردر ويرجّع الرقم اللي اتولّد، ويحاول يحط رقم بإيده فيترفض. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد ما عملنا [[users]] من درس «CREATE TABLE» (فيه يوزر واحد).

---

## ١. الجدول

~~~text الأمر
CREATE TABLE orders (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    uuid NOT NULL,
  status     text NOT NULL DEFAULT 'pending',
  total      numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
~~~

### [[id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]]

نقراها حتة حتة:

| الحتة | معناها |
|---|---|
| [[bigint]] | رقم صحيح ٨ byte، مش هيخلص (لحد 9 × 10^18) |
| [[GENERATED ... AS IDENTITY]] | القاعدة بتولّد القيمة من عدّاد (sequence) جوه |
| [[ALWAYS]] | دايمًا هي، ولو بعت رقم بإيدك يترفض (عكسها [[BY DEFAULT]]: بتولّد بس لو مبعتش) |
| [[PRIMARY KEY]] | فريد + مش NULL + index |

### باقي الأعمدة

- [[user_id uuid NOT NULL]]: صاحب الأوردر، نفس نوع [[users.id]]. الربط الحقيقي بينهم (foreign key) في المستوى التاني.
- [[status text NOT NULL DEFAULT 'pending']]: الحالة بتبدأ [[pending]] لوحدها.
- [[total numeric(10,2) NOT NULL DEFAULT 0]]: الإجمالي بالـ numeric (درس «numeric للفلوس»).

~~~text \d orders
   Column   |           Type           | Collation | Nullable |           Default
------------+--------------------------+-----------+----------+------------------------------
 id         | bigint                   |           | not null | generated always as identity
 user_id    | uuid                     |           | not null |
 status     | text                     |           | not null | 'pending'::text
 total      | numeric(10,2)            |           | not null | 0
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
~~~

---

## ٢. [[INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1 RETURNING id;]]

ده أول INSERT نشوفه من غير [[VALUES]]. نفكه من جوه لبرة:

### [[SELECT id FROM users LIMIT 1]]

هات الـ [[id]] من جدول users، و [[LIMIT 1]] = صف واحد بس. عندنا يوزر واحد فهيرجّع الـ uuid بتاعه.

### [[INSERT INTO orders (user_id) ...]]

بدل ما تكتب القيمة بإيدك في VALUES، الـ INSERT بياخد الصفوف اللي رجعت من الـ SELECT ويحطها في الأعمدة اللي بين القوسين: الـ uuid يروح [[user_id]]. وباقي الأعمدة بتاخد الـ DEFAULT.

### [[RETURNING id]]

بعد ما الصف يتضاف، رجّعلي الـ [[id]] اللي اتولّد. من غيرها كنت هتحتاج SELECT تاني عشان تعرفه.

~~~text الناتج
 id
----
  1
(1 row)

INSERT 0 1
~~~

الجدول الصغير ده ناتج الـ RETURNING، و [[INSERT 0 1]] تحته رد الـ INSERT نفسه (صف واحد اتضاف).

---

## ٣. [[INSERT INTO orders (id, user_id) SELECT 999, id FROM users LIMIT 1;]]

نفس الشكل، بس المرة دي بنبعت [[999]] في عمود [[id]]:

~~~text الناتج
ERROR:  cannot insert a non-DEFAULT value into column "id"
DETAIL:  Column "id" is an identity column defined as GENERATED ALWAYS.
HINT:  Use OVERRIDING SYSTEM VALUE to override.
~~~

- [[cannot insert a non-DEFAULT value]]: مينفعش تحط قيمة غير الافتراضية.
- [[DETAIL]] بيقول السبب: العمود [[GENERATED ALWAYS]].
- [[HINT]] بيقولك المخرج لو انت متأكد (زي وانت بتنقل داتا قديمة): [[INSERT ... OVERRIDING SYSTEM VALUE ...]]. في الشغل العادي مش هتحتاجه، والـ ALWAYS موجودة بالظبط عشان تمنع الغلطة دي.

---

## ٤. الفجوات في الأرقام (الـ «جرّب»)

~~~text BEGIN; ثم INSERT ... RETURNING id; ثم ROLLBACK;
BEGIN
 id
----
  2
(1 row)

INSERT 0 1
ROLLBACK
~~~

- [[BEGIN]] بيفتح transaction: كل اللي بعده مسودة.
- الـ INSERT خد رقم [[2]].
- [[ROLLBACK]] رمى المسودة: الصف اتلغى.

بعدها INSERT عادي:

~~~text INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1 RETURNING id;
 id
----
  3
(1 row)
~~~

[[3]] مش [[2]]. والجدول دلوقتي:

~~~text SELECT * FROM orders;
 id |               user_id                | status  | total |          created_at
----+--------------------------------------+---------+-------+-------------------------------
  1 | fd40c24d-5002-4118-b356-41ff21b0a62d | pending |  0.00 | 2026-10-07 08:27:20.560271+00
  3 | fd40c24d-5002-4118-b356-41ff21b0a62d | pending |  0.00 | 2026-10-07 08:27:20.564739+00
(2 rows)
~~~

ليه؟ العدّاد (sequence) **مش جزء من الـ transaction**: أول ما حد ياخد رقم، الرقم ده اتصرف خلاص حتى لو الـ INSERT اتلغى. ده مقصود، عشان لو اتنين بيضيفوا في نفس اللحظة كل واحد ياخد رقمه على طول من غير ما يستنى التاني. ولاحظ إن [[status]] و [[total]] اتملوا من الـ DEFAULT ([[pending]] و [[0.00]]).

---

## ٥. uuid بدل الرقم

اليوزرز في المثال [[uuid]] مش رقم. على Postgres 18 جربنا الدالتين:

~~~text SELECT uuidv7(), gen_random_uuid();
                uuidv7                |           gen_random_uuid
--------------------------------------+--------------------------------------
 01a1157b-61c6-7cc7-97f7-960d2f49aacd | 92601cc7-78dc-41b4-8c46-d6d687401d55
~~~

- [[gen_random_uuid()]] (v4): عشوائي بالكامل. لاحظ الـ [[4]] في أول الجزء التالت ([[41b4]]): ده رقم الإصدار.
- [[uuidv7()]] (v7، جديدة في Postgres 18): أول جزء منها وقت، فالقيم الجديدة بتيجي ورا بعض في الـ index زي الرقم المتسلسل. و الـ [[7]] في أول الجزء التالت ([[7cc7]]).

---

## الخلاصة

| | [[bigint IDENTITY]] | [[uuid]] |
|---|---|---|
| الحجم | ٨ byte | ١٦ byte |
| بيتولّد فين | في القاعدة بس | في أي حتة (حتى الـ frontend) |
| بيكشف العدد | أيوه ([[/orders/41]]) | لأ |
| فيه فجوات | أيوه، دايمًا | — |

- [[GENERATED ALWAYS AS IDENTITY]] الشكل الحديث لـ serial، و ALWAYS بتمنعك تحط id بإيدك بالغلط.
- [[INSERT ... SELECT]] بياخد القيم من استعلام، و [[RETURNING]] بيرجّعلك اللي اتولّد.
- الأرقام فيها فجوات (ROLLBACK أو INSERT فشل)، فمتستخدمهاش كرقم فاتورة لازم يبقى متتالي.`,
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
    }
  ]
});
