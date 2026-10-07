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
          teach: R`## الفكرة: SELECT بيبني جدول جديد من اللي عندك

كل سطر في المثال بيرجّع «جدول» صغير: أعمدة انت اخترتها، أو حسبتها، أو شلت منها التكرار. الناتج تحت من psql على [[postgres:18]] جوه Docker، على الجداول بالشكل اللي سابته الدروس اللي فاتت: [[products]] فيه منتج واحد (T-shirt)، و [[orders]] فيه أوردرين لنفس اليوزر.

---

## ١. [[SELECT name, price FROM products;]]

| الحتة | معناها |
|---|---|
| [[SELECT name, price]] | الأعمدة اللي عايزها، مفصولة بـ [[,]] وبالترتيب اللي هتتعرض بيه |
| [[FROM products]] | من أنهي جدول |

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

عمودين بس من ٧. ده اللي هتعمله في الكود دايمًا بدل [[SELECT *]].

---

## ٢. [[SELECT name, price * 1.14 AS price_with_vat FROM products;]]

### [[price * 1.14]]

عمود محسوب: لكل صف، السعر مضروب في 1.14 (ضريبة ١٤٪). [[*]] هنا ضرب، مش «كل الأعمدة»: معناها بيتحدد من مكانها.

### [[AS price_with_vat]]

[[AS]] بتدي العمود الناتج اسم (اسمه alias). من غيرها psql بيسميه [[?column?]]:

~~~text SELECT name, price * 1.14 FROM products;
  name   | ?column?
---------+----------
 T-shirt | 285.0000
~~~

وبيها:

~~~text الناتج
  name   | price_with_vat
---------+----------------
 T-shirt |       285.0000
(1 row)
~~~

ليه ٤ خانات بعد العلامة؟ [[price]] فيه خانتين ([[250.00]])، و [[1.14]] فيه خانتين، وضرب الـ numeric بيجمع عدد الخانات: ٢ + ٢ = ٤. الحسبة نفسها مظبوطة (250 × 1.14 = 285)، بس الشكل محتاج تقريب بـ [[round(..., 2)]].

الحسبة دي مش بتغيّر حاجة في الجدول: العمود موجود في الناتج بس.

---

## ٣. [[SELECT DISTINCT status FROM orders;]]

[[DISTINCT]] بيشيل الصفوف المتكررة من **الناتج**. عندنا أوردرين الاتنين [[pending]]:

~~~text الناتج
 status
---------
 pending
(1 row)
~~~

صف واحد بدل اتنين. مفيد لـ «إيه الحالات الموجودة أصلًا؟».

---

## ٤. [[SELECT count(DISTINCT user_id) AS buyers FROM orders;]]

نفكها من جوه لبرة:
1. [[user_id]] من كل الأوردرات: نفس الـ uuid مرتين.
2. [[DISTINCT]] جوه القوس: شيل التكرار، فاضل واحد.
3. [[count(...)]] عدّهم.

~~~text الناتج
 buyers
--------
      1
(1 row)
~~~

ومن غير DISTINCT كان هيعد الأوردرات نفسها:

~~~text SELECT count(user_id) FROM orders;
 count
-------
     2
~~~

الفرق ده هو الفرق بين «كام أوردر» و «كام يوزر اشترى».

---

## ٥. [[SELECT now(), 2 + 2 AS four;]]

SELECT مش لازم يبقى معاه FROM: ينفع يحسب أي تعبير.

~~~text الناتج
              now              | four
-------------------------------+------
 2026-10-07 08:27:41.964263+00 |    4
(1 row)
~~~

[[now()]] الوقت دلوقتي، وعمودها اسمه [[now]] تلقائي (اسم الدالة). وده مفيد تجرّب بيه أي دالة قبل ما تحطها في استعلام كبير.

---

## ٦. ليه الاسم المستعار مش شغال في WHERE (الـ «جرّب»)

~~~text SELECT name, price * 1.14 AS price_with_vat FROM products WHERE price_with_vat > 200;
ERROR:  column "price_with_vat" does not exist
LINE 1: ...rice * 1.14 AS price_with_vat FROM products WHERE price_with...
                                                             ^
~~~

إنت كاتب SELECT الأول، بس Postgres **مش بينفّذ** بالترتيب ده. الترتيب المنطقي:

| الترتيب | الجزء | بيعمل إيه |
|---|---|---|
| ١ | [[FROM]] | يجيب صفوف الجدول |
| ٢ | [[WHERE]] | يفلتر الصفوف |
| ٣ | [[GROUP BY]] / [[HAVING]] | يجمّع (دروس جاية) |
| ٤ | [[SELECT]] | يحسب الأعمدة، وهنا بس الـ AS بيتعمل |
| ٥ | [[DISTINCT]] | يشيل التكرار |
| ٦ | [[ORDER BY]] | يرتب، وهنا الـ AS بقى معروف |
| ٧ | [[LIMIT]] | ياخد أول كام صف |

[[WHERE]] رقم ٢ و [[AS]] بيتعمل في رقم ٤، فوقت الفلترة الاسم [[price_with_vat]] لسه مش موجود. عشان كده الـ error بيقول العمود «مش موجود»: من وجهة نظر WHERE هو فعلًا مش موجود.

> في التمرين اللي تحت هتصلّح الاستعلام ده. فكّر: WHERE شايف أعمدة الجدول نفسه بس، يبقى الشرط لازم يتكتب بيها.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[SELECT a, b FROM t]] | أعمدة بعينها |
| [[expr AS name]] | عمود محسوب باسم جديد |
| [[SELECT DISTINCT col]] | القيم من غير تكرار |
| [[count(DISTINCT col)]] | عدد القيم المختلفة |
| [[SELECT expr]] من غير FROM | آلة حاسبة |

- الأعمدة المحسوبة بتظهر في الناتج بس، مش بتتخزن.
- اسم الـ AS معروف في ORDER BY، ومش معروف في WHERE (بيتنفذ قبله).
- ضرب numeric في numeric بيجمع عدد الخانات العشرية، فقرّب لو محتاج.`,
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
          teach: R`## الفكرة: شرط بيتسأل لكل صف

[[WHERE]] بيعدّي على الصفوف واحد واحد ويسأل الشرط: لو الإجابة true الصف يفضل، ولو false (أو NULL) يترمي. المثال ٦ شروط، كل واحد بيوريك نوع مقارنة. الناتج تحت من psql على [[postgres:18]] جوه Docker: [[products]] فيه T-shirt (سعره 250 ومخزونه 40 ونشط)، و [[orders]] فيه أوردرين [[pending]] اتعملوا النهارده.

---

## ١. [[SELECT name, price FROM products WHERE price < 300;]]

[[<]] أصغر من. المقارنات كلها: [[=]] يساوي، و [[<>]] (أو [[!=]]) لا يساوي، و [[<]] و [[>]] و [[<=]] و [[>=]].

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

250 < 300 = true، فالصف عدّى.

---

## ٢. [[SELECT name FROM products WHERE stock > 0 AND is_active;]]

- [[AND]] = الشرطين لازم يبقوا true.
- [[is_active]] لوحده شرط كامل، لأنه عمود [[boolean]] قيمته أصلًا true أو false، فمش محتاج [[= true]].

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

---

## ٣. [[SELECT id, status FROM orders WHERE status IN ('paid', 'shipped');]]

[[IN (...)]] = القيمة واحدة من اللي في الليستة. اختصار لـ [[status = 'paid' OR status = 'shipped']].

~~~text الناتج
 id | status
----+--------
(0 rows)
~~~

[[(0 rows)]] مش error: الاستعلام سليم، بس الأوردرين [[pending]] فمحدش طابق. psql بيعرض أسماء الأعمدة برضه.

---

## ٤. [[SELECT id FROM orders WHERE created_at >= now() - interval '7 days';]]

نفك الجانب اليمين من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[interval '7 days']] | قيمة نوعها [[interval]] يعني «مدة»: ٧ أيام |
| [[now() - interval '7 days']] | الوقت دلوقتي ناقص ٧ أيام |
| [[created_at >= ...]] | اتعمل في اللحظة دي أو بعدها |

~~~text SELECT now() - interval '7 days' AS week_ago;
           week_ago
-------------------------------
 2026-09-30 08:27:48.835503+00
~~~

~~~text الناتج
 id
----
  1
  3
(2 rows)
~~~

الأوردرين اتعملوا النهارده، فالاتنين جوه آخر ٧ أيام. (الـ id رقم 2 مش موجود لأنه اترمى بـ ROLLBACK في درس «PRIMARY KEY».)

---

## ٥. [[SELECT name FROM products WHERE price BETWEEN 100 AND 500;]]

[[BETWEEN a AND b]] = [[price >= 100 AND price <= 500]]. الطرفين **داخلين**.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

وده فخ مع الوقت. [[BETWEEN '2026-09-01' AND '2026-09-30']] الطرف التاني معناه أول لحظة في يوم 30 (الساعة 00:00)، فأي حاجة حصلت يوم 30 الضهر برّه:

~~~text SELECT '2026-09-30 15:00'::timestamptz BETWEEN '2026-09-01' AND '2026-09-30' AS inside;
 inside
--------
 f
~~~

مع الوقت استخدم [[>=]] للبداية و [[<]] لأول يوم **بعد** النهاية.

---

## ٦. [[SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);]]

هنا بنخلط [[AND]] و [[OR]]، والمهم الأولوية: [[AND]] بيتحسب قبل [[OR]] (زي الضرب قبل الجمع في الحساب). الأقواس بتغيّر الترتيب:

~~~text قراية الشرط
is_active  AND  (stock > 0  OR  price = 0)
   ①                  ②
① لازم يكون نشط
② وكمان: يا إما ليه مخزون، يا إما ببلاش
~~~

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

على الداتا دي النتيجة نفسها بأقواس ومن غيرها. عشان تشوف الفرق، ضيف منتج ببلاش **ومش نشط** جوه [[BEGIN]] ... [[ROLLBACK]]:

~~~text BEGIN; و INSERT INTO products (name, price, stock, is_active) VALUES ('Gift', 0, 0, false);
BEGIN
INSERT 0 1
~~~

بالأقواس:

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

ومن غير أقواس ([[WHERE is_active AND stock > 0 OR price = 0]]):

~~~text الناتج
  name
---------
 T-shirt
 Gift
(2 rows)
~~~

من غير أقواس Postgres قراها [[(is_active AND stock > 0) OR price = 0]]، فـ Gift عدّى عشان [[price = 0]] لوحده كفاية، مع إنه مش نشط. وبعدها [[ROLLBACK;]] يشيل Gift.

---

## ٧. التنصيص المزدوج (الـ «جرّب»)

~~~text SELECT id FROM orders WHERE status = "paid";
ERROR:  column "paid" does not exist
LINE 1: SELECT id FROM orders WHERE status = "paid";
                                             ^
HINT:  Perhaps you meant to reference the column "orders.id".
~~~

[["paid"]] بتنصيص مزدوج = **اسم عمود**، فـ Postgres دوّر على عمود اسمه paid. والـ HINT بيخمّن أقرب عمود ليه، وهنا تخمينه مش مفيد. النص دايمًا [['paid']] بتنصيص مفرد.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[= <> < > <= >=]] | مقارنات |
| [[a AND b]] | الاتنين |
| [[a OR b]] | واحد منهم على الأقل |
| [[NOT a]] | العكس |
| [[col IN ('x', 'y')]] | واحدة من الليستة |
| [[col BETWEEN a AND b]] | من a لـ b والطرفين داخلين |
| [[now() - interval '7 days']] | وقت نسبي |

- AND أقوى من OR: لما تخلطهم حط أقواس دايمًا، حتى لو مش متأكد إنها لازمة.
- [[(0 rows)]] نتيجة عادية مش error.
- النص بين [[' ']] مفردة، والمزدوجة لأسماء الأعمدة.
- مع التواريخ: [[>=]] و [[<]] بدل BETWEEN.`,
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
          teach: R`## الفكرة: رتّب الأول، وبعدين خد اللي محتاجه

[[ORDER BY]] بيحدد ترتيب الصفوف في الناتج، و [[LIMIT]] و [[OFFSET]] بيقصوا جزء منه. من غير ORDER BY، Postgres بيرجّع الصفوف بأي ترتيب يناسبه، وهنشوف ده بعينينا تحت. الناتج من psql على [[postgres:18]] جوه Docker.

---

## ١. [[SELECT name, price FROM products ORDER BY price DESC;]]

- [[ORDER BY price]] رتّب بعمود السعر.
- [[DESC]] = descending، من الكبير للصغير. عكسها [[ASC]] = ascending، من الصغير للكبير، وهي الافتراضي لو مكتبتش حاجة.

~~~text الناتج (فيه منتج واحد لسه)
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

---

## ٢. [[SELECT name, price FROM products ORDER BY price DESC, name ASC;]]

ترتيب بعمودين: رتّب بالسعر من الأغلى، **ولو سعرين متساويين** رتّبهم بالاسم أبجديًا. العمود التاني بيشتغل بس جوه الصفوف اللي العمود الأول فيها متساوي.

بعد ما ضفنا Pen و Pin الاتنين بـ 50:

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
 Pen     |  50.00
 Pin     |  50.00
(3 rows)
~~~

T-shirt الأول لأنه الأغلى. و Pen قبل Pin لأنهم متساويين في السعر، فالاسم حكم: [[Pe]] قبل [[Pi]] أبجديًا.

---

## ٣. [[SELECT id, created_at FROM orders ORDER BY created_at DESC LIMIT 5;]]

- [[ORDER BY created_at DESC]]: الأحدث الأول.
- [[LIMIT 5]]: خد أول ٥ صفوف **بعد** الترتيب.

~~~text الناتج
 id |          created_at
----+-------------------------------
  3 | 2026-10-07 08:27:20.564739+00
  1 | 2026-10-07 08:27:20.560271+00
(2 rows)
~~~

فيه أوردرين بس، فرجعوا الاتنين: LIMIT حد أقصى، مش عدد لازم يتحقق. ولاحظ إن [[3]] قبل [[1]]: اتعمل بعده بأجزاء من الثانية.

---

## ٤. [[SELECT name, price FROM products ORDER BY price LIMIT 10 OFFSET 20;]]

- [[ORDER BY price]] من غير ASC/DESC = ASC، الأرخص الأول.
- [[OFFSET 20]]: عدّي أول ٢٠ صف.
- [[LIMIT 10]]: وخد الـ ١٠ اللي بعدهم.

يعني الصفحة التالتة لو كل صفحة ١٠: صفحة ١ = OFFSET 0، صفحة ٢ = OFFSET 10، صفحة ٣ = OFFSET 20. القاعدة: [[OFFSET = (رقم الصفحة - 1) × حجم الصفحة]].

~~~text الناتج
 name | price
------+-------
(0 rows)
~~~

عندنا أقل من ٢٠ منتج، فبعد ما عدّى العشرين مفضلش حاجة.

---

## ٥. الترتيب بين المتساويين مش مضمون (الـ «جرّب»)

ده أهم جزء في الدرس. ضفنا منتجين بنفس السعر:

~~~text INSERT INTO products (name, price, stock) VALUES ('Pen', 50, 10), ('Pin', 50, 10);
INSERT 0 2
~~~

وبعدين سألنا «أرخص منتج» وعدّلنا حاجة مالهاش علاقة بالسعر (المخزون) بين كل مرة:

| الخطوة | [[SELECT id, name FROM products ORDER BY price LIMIT 1;]] |
|---|---|
| قبل أي UPDATE | [[4 Pen]] |
| بعد [[UPDATE products SET stock = 9 WHERE name = 'Pen';]] | [[5 Pin]] |
| بعد [[UPDATE products SET stock = 9 WHERE name = 'Pin';]] | [[4 Pen]] |

نفس الاستعلام، ونفس الأسعار، والنتيجة بتتغير! ليه؟
- Pen و Pin سعرهم متساوي، فـ [[ORDER BY price]] شايفهم «زي بعض» ومش ملزم بأي ترتيب بينهم.
- الـ UPDATE في Postgres مش بيكتب فوق الصف: بيكتب نسخة جديدة منه في مكان تاني (هنا بعد الصفوف اللي موجودة). فاللي اتعدّل آخر واحد بقى مكانه ورا، والقاعدة بتقرا الصفوف بترتيب مكانها وبتقف عند أول واحد ينفع.

(الـ ids هنا 4 و 5 مش 2 و 3، لأن المحاولات اللي فشلت أو اتمسحت في الدروس اللي فاتت سحبت أرقام من العدّاد.)

### الحل: عمود فريد في آخر الترتيب

~~~text SELECT id, name FROM products ORDER BY price, id LIMIT 1;
 id | name
----+------
  4 | Pen
(1 row)
~~~

[[id]] مفيش اتنين بيه، فبعد ما السعر يتساوى الـ id بيحسم دايمًا. العمود ده اسمه **tiebreaker**. في الـ pagination ده فرق بين صفحات سليمة وبين منتج يظهر في صفحتين ومنتج تاني ميظهرش خالص.

وفي الآخر [[DELETE FROM products WHERE name IN ('Pen', 'Pin');]] بترد [[DELETE 2]].

---

## ٦. حاجتين في الترتيب نفسه

### النص اللي فيه أرقام

~~~text SELECT x FROM (VALUES ('10'),('9'),('2')) v(x) ORDER BY x;
 x
----
 10
 2
 9
~~~

النص بيترتب حرف حرف: [['1']] قبل [['2']] قبل [['9']]، فـ [['10']] جه الأول. عشان كده الأرقام تتخزن في أعمدة أرقام. ([[VALUES (...) v(x)]] هنا مجرد جدول مؤقت صغير عشان نجرّب، اسمه v وعموده x.)

### NULL

~~~text SELECT x FROM (VALUES (1),(NULL),(3)) v(x) ORDER BY x;
 x
---
 1
 3

(3 rows)
~~~

~~~text نفس الاستعلام بـ ORDER BY x DESC
 x
---

 3
 1
(3 rows)
~~~

Postgres بيعتبر NULL أكبر من أي قيمة: في الآخر مع ASC، وفي الأول مع DESC. psql بيعرض NULL كسطر فاضي (هو الصف التالت في الأول، والأول في التاني). ولو عايز غير كده: [[NULLS FIRST]] أو [[NULLS LAST]].

---

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| [[ORDER BY col]] / [[ASC]] | من الصغير للكبير (الافتراضي) |
| [[ORDER BY col DESC]] | من الكبير للصغير |
| [[ORDER BY a, b]] | بـ a، ولو متساويين بـ b |
| [[LIMIT n]] | أول n صف بعد الترتيب |
| [[OFFSET n]] | عدّي أول n صف |

- من غير ORDER BY مفيش ترتيب مضمون، ومع LIMIT من غير ORDER BY «أول ٥» ملهاش معنى.
- الصفوف المتساوية ترتيبها بينها ممكن يتغير في أي لحظة: حط عمود فريد في آخر الترتيب.
- الترتيب بيحصل بعد WHERE و SELECT، فتقدر ترتب باسم AS.`,
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
          teach: R`## الفكرة: مقارنة بنمط بدل قيمة كاملة

[[=]] بيدوّر على نص مطابق بالظبط. [[LIKE]] بيدوّر على نص **شكله** زي نمط: «بيبدأ بكذا»، «فيه كذا في النص»، «٣ حروف آخرهم ug». النمط فيه رمزين بس:

| الرمز | معناه | مثال |
|---|---|---|
| [[%]] | أي عدد حروف، حتى صفر | [['T-%']] = بيبدأ بـ T- |
| [[_]] | حرف واحد بالظبط | [['_ug']] = ٣ حروف آخرهم ug |

و [[ILIKE]] (I = insensitive) نفس الكلام بس مش فارق معاه capital ولا small. الناتج تحت من psql على [[postgres:18]] جوه Docker: [[products]] فيه T-shirt بس، و [[users]] فيه [[you@example.com]].

---

## ١. [[SELECT name FROM products WHERE name LIKE 'T-%';]]

النمط [['T-%']]: أول حرفين [[T-]] بالظبط، وبعدهم أي حاجة. [[T-shirt]] = [[T-]] + [[shirt]].

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

LIKE حساس للحروف: [[t-shirt]] بـ t صغيرة مكانتش هتطابق.

---

## ٢. [[SELECT email FROM users WHERE email ILIKE '%@example.com';]]

[['%@example.com']]: أي حاجة، وبعدها [[@example.com]] **في الآخر**. ده «كل إيميلات الدومين ده». و ILIKE عشان الإيميلات ساعات بتتكتب بحروف كبيرة:

~~~text الناتج
      email
-----------------
 you@example.com
(1 row)
~~~

الفرق بين الاتنين على نفس النص:

~~~text SELECT 'YOU@EXAMPLE.COM' ILIKE '%@example.com' AS i, 'YOU@EXAMPLE.COM' LIKE '%@example.com' AS l;
 i | l
---+---
 t | f
~~~

---

## ٣. [[SELECT name FROM products WHERE name ILIKE '%shirt%';]]

[[%]] من الناحيتين = **فيه** shirt في أي مكان: في الأول أو النص أو الآخر.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

ده الشكل اللي هتستخدمه في خانة البحث. وده كمان الشكل البطيء على الجداول الكبيرة: [[EXPLAIN]] بيوريك Postgres ناوي ينفّذ إزاي:

~~~text EXPLAIN SELECT name FROM products WHERE name ILIKE '%shirt%';
                        QUERY PLAN
----------------------------------------------------------
 Seq Scan on products  (cost=0.00..17.88 rows=1 width=32)
   Filter: (name ~~* '%shirt%'::text)
~~~

- [[Seq Scan]] = هيقرا الجدول كله صف صف. النمط بيبدأ بـ [[%]] فمفيش بداية ثابتة الـ index العادي يقدر يدوّر بيها.
- [[~~*]] هو اسم ILIKE جوه Postgres (و [[~~]] هو LIKE).

---

## ٤. [[SELECT name FROM products WHERE name LIKE '_ug';]]

[[_]] = حرف واحد بالظبط، وبعده [[ug]]، ومفيش حاجة بعدهم.

~~~text الناتج
 name
------
(0 rows)
~~~

مفيش Mug في الجدول لسه (هيتضاف في درس INSERT). عشان نشوف القاعدة على نصوص جاهزة:

~~~text SELECT 'Mug' LIKE '_ug' AS mug, 'Plug' LIKE '_ug' AS plug, 'ug' LIKE '_ug' AS ug, 'mug' LIKE 'M%' AS lower_m;
 mug | plug | ug | lower_m
-----+------+----+---------
 t   | f    | f  | f
~~~

- [[Mug]]: حرف + ug = تمام.
- [[Plug]]: حرفين قبل ug، و [[_]] واحد بس، فلأ.
- [[ug]]: مفيش حرف قبل ug، و [[_]] لازم حرف، فلأ.
- [[mug]] مع [['M%']]: m صغيرة و LIKE حساس، فلأ.

---

## ٥. [[SELECT name FROM products WHERE name NOT ILIKE '%test%';]]

[[NOT]] بتعكس: كل اللي **مفيهوش** test. مفيد تستبعد منتجات تجريبية.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

---

## ٦. لما الرمز نفسه يبقى جزء من الكلام (الـ «جرّب»)

[[LIKE '%Shirt%']] رجّع [[(0 rows)]] و [[ILIKE '%Shirt%']] لقى T-shirt، نفس الكلام اللي فوق.

طب لو عايز تدوّر على [[_]] **حقيقية** في الاسم؟ [[_]] لوحدها معناها «أي حرف». الحل إنك تحط قبلها **escape character**، حرف بيقول «اللي بعدي ليه معناه العادي». في Postgres الافتراضي [[\]] (backslash):

~~~text SELECT 'snake_case' LIKE '%\_%' AS has_underscore, 'snakecase' LIKE '%_%' AS any_char, 'snakecase' LIKE '%\_%' AS esc;
 has_underscore | any_char | esc
----------------+----------+-----
 t              | t        | f
~~~

- [['%_%']] على [[snakecase]] = true، لأن [[_]] من غير escape معناها «أي حرف»، وأي كلمة فيها حرف.
- [['%\_%']] على [[snakecase]] = false: دلوقتي بيدوّر على [[_]] حقيقية ومفيش.

ولو مش عايز الـ backslash، اختار حرف escape بنفسك بـ [[ESCAPE]]:

~~~text SELECT 'a_b' LIKE '%!_%' ESCAPE '!' AS bang;
 bang
------
 t
~~~

[[ESCAPE '!']] = علامة التعجب بقت هي الـ escape، فـ [[!_]] = [[_]] حقيقية. ونفس الفكرة بالظبط على [[%]].

---

## الخلاصة

| النمط | بيطابق |
|---|---|
| [['abc%']] | بيبدأ بـ abc |
| [['%abc']] | بيخلص بـ abc |
| [['%abc%']] | فيه abc في أي مكان |
| [['_bc']] | ٣ حروف آخرهم bc |
| [['%\_%']] | فيه [[_]] حقيقية |

- LIKE حساس للحروف، و ILIKE لأ (ILIKE في Postgres بس).
- النمط اللي بيبدأ بـ [[%]] بيقرا الجدول كله ([[Seq Scan]])، وده بيبان على الجداول الكبيرة.
- [[%]] و [[_]] رموز، ولو عايزهم كحروف عادية حط قبلهم [[\]] أو حرف الـ ESCAPE بتاعك.`,
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
          teach: R`## الفكرة: NULL مش قيمة، هو «مش عارف»

لو سألتك «تليفون علي بيساوي 0100؟» وانت مش عارف تليفون علي، الإجابة الأمينة مش «أيوه» ولا «لأ»، هي «مش عارف». SQL بيفكر كده بالظبط: أي مقارنة مع [[NULL]] نتيجتها NULL (مش معروف). وبما إن [[WHERE]] بيعدّي الـ true بس، الصفوف دي بتختفي. المثال بيوريك الفخ ده والطرق الصح.

الناتج تحت من psql على [[postgres:18]] جوه Docker: [[users]] فيه يوزر واحد ([[you@example.com]]).

---

## ١. [[ALTER TABLE users ADD COLUMN phone text;]]

| الحتة | معناها |
|---|---|
| [[ALTER TABLE users]] | عدّل **تعريف** جدول users (مش الداتا) |
| [[ADD COLUMN phone text]] | ضيف عمود اسمه phone نوعه نص |

مفيش [[NOT NULL]] ولا [[DEFAULT]]، فكل الصفوف الموجودة قيمتها في العمود الجديد NULL.

~~~text الناتج
ALTER TABLE
~~~

---

## ٢. [[SELECT email FROM users WHERE phone = NULL;]]

~~~text الناتج
 email
-------
(0 rows)
~~~

مع إن تليفون اليوزر فعلًا NULL! ليه؟ [[phone = NULL]] معناها «هل القيمة المجهولة بتساوي القيمة المجهولة؟»، والإجابة «مش معروف» (NULL)، مش true. فالصف ميعديش. الشرط ده عمره ما هيرجّع صف، أيًا كانت الداتا.

---

## ٣. [[SELECT email FROM users WHERE phone IS NULL;]]

[[IS NULL]] مش مقارنة، ده سؤال مخصوص: «الخانة دي فاضية؟». وإجابته دايمًا true أو false.

~~~text الناتج
      email
-----------------
 you@example.com
(1 row)
~~~

وعكسها [[IS NOT NULL]].

---

## ٤. [[SELECT email, COALESCE(phone, 'no phone') AS phone FROM users;]]

[[COALESCE(a, b, ...)]] بترجّع **أول قيمة مش NULL** من الليستة. التليفون NULL، فبترجّع [['no phone']]. ولو كان فيه تليفون كانت هترجّعه هو.

~~~text الناتج
      email      |  phone
-----------------+----------
 you@example.com | no phone
(1 row)
~~~

ده للعرض بس: الجدول لسه فيه NULL. و [[AS phone]] عشان العمود يفضل اسمه phone بدل [[coalesce]].

---

## ٥. [[SELECT count(*) AS all_users, count(phone) AS with_phone FROM users;]]

| الدالة | بتعد إيه |
|---|---|
| [[count(*)]] | كل الصفوف |
| [[count(phone)]] | الصفوف اللي phone فيها **مش** NULL |

~~~text الناتج
 all_users | with_phone
-----------+------------
         1 |          0
(1 row)
~~~

يوزر واحد، ومفيش حد ليه تليفون. نفس الحكاية مع [[sum]] و [[avg]]: بيتجاهلوا NULL. جرّبناها على 10 و 20 و NULL:

~~~text SELECT avg(x) AS avg_skip_null, avg(COALESCE(x,0)) AS avg_null_as_zero FROM (VALUES (10),(20),(NULL)) v(x);
    avg_skip_null    |  avg_null_as_zero
---------------------+---------------------
 15.0000000000000000 | 10.0000000000000000
~~~

[[avg]] شال الـ NULL خالص: (10 + 20) ÷ 2 = 15. ولو عايز NULL يتحسب صفر لازم تقول كده بـ COALESCE: (10 + 20 + 0) ÷ 3 = 10.

---

## ٦. [[SELECT NULL = NULL, NULL IS NULL, 5 + NULL;]]

~~~text الناتج
 ?column? | ?column? | ?column?
----------+----------+----------
          | t        |
(1 row)
~~~

الخانة الأولى والتالتة فاضيين: ده شكل NULL في psql. عشان تشوفه صريح، [[\pset null '(null)']] (أمر psql بيغيّر شكل عرض NULL بس):

~~~text بعد \pset null '(null)'
 ?column? | ?column? | ?column?
----------+----------+----------
 (null)   | t        |   (null)
~~~

| التعبير | النتيجة | ليه |
|---|---|---|
| [[NULL = NULL]] | NULL | مجهول يساوي مجهول؟ مش معروف |
| [[NULL IS NULL]] | true | سؤال «فاضي؟» إجابته أكيدة |
| [[5 + NULL]] | NULL | خمسة زائد حاجة مش معروفة = مش معروف |

---

## ٧. فخ [[<>]] (الـ «جرّب»)

ضفنا يوزر تاني من غير تليفون، وحطينا [[0123]] للأول، جوه [[BEGIN]]:

~~~text BEGIN; INSERT ... ('sara@example.com', 'Sara'); UPDATE users SET phone = '0123' WHERE email = 'you@example.com';
BEGIN
INSERT 0 1
UPDATE 1
~~~

وبعدين «هات اللي تليفونهم مش 0100»:

~~~text SELECT email FROM users WHERE phone <> '0100';
      email
-----------------
 you@example.com
(1 row)
~~~

Sara اختفت، مع إن تليفونها أكيد مش 0100 (معندهاش تليفون أصلًا). [[NULL <> '0100']] = NULL، فالصف اترمى. وبعدها [[ROLLBACK;]].

الحل في مقارنة بتعامل NULL كقيمة عادية: [[IS DISTINCT FROM]] («مختلف عن»). شوفها على قيم ثابتة:

~~~text SELECT NULL IS DISTINCT FROM NULL AS a, 5 IS DISTINCT FROM NULL AS b, NULL <> 5 AS c;
 a | b |   c
---+---+--------
 f | t | (null)
~~~

- [[a]]: NULL و NULL «مش مختلفين» = false.
- [[b]]: 5 و NULL مختلفين = **true**، مش NULL.
- [[c]]: نفس السؤال بـ [[<>]] = NULL، وده اللي بيضيّع الصفوف.

### حاجة زيادة: [[NULLIF]]

[[NULLIF(a, b)]] عكس COALESCE تقريبًا: بترجّع NULL لو [[a = b]]. أشهر استخدام: حماية من القسمة على صفر:

~~~text SELECT 10 / NULLIF(0, 0) AS safe;
  safe
--------
 (null)
~~~

من غيرها [[10 / 0]] بيطلّع [[ERROR: division by zero]]. معاها النتيجة NULL، وتقدر تلفها بـ COALESCE.

---

## الخلاصة

| عايز | اكتب | مش |
|---|---|---|
| الفاضي | [[IS NULL]] | [[= NULL]] |
| اللي ليه قيمة | [[IS NOT NULL]] | [[<> NULL]] |
| مختلف ومعاهم الـ NULL | [[IS DISTINCT FROM]] | [[<>]] |
| قيمة بديلة | [[COALESCE(x, بديل)]] | — |
| عد الكل / عد اللي ليهم قيمة | [[count(*)]] / [[count(col)]] | — |

- أي مقارنة أو حساب مع NULL = NULL، و WHERE بيعدّي true بس.
- الـ aggregates بتتجاهل NULL (إلا [[count(*)]])، و [[avg]] مش بيحسبه صفر.
- [[ALTER TABLE ... ADD COLUMN]] من غير DEFAULT = الصفوف القديمة كلها NULL.`,
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
          teach: R`## الفكرة: ٣ أشكال لـ INSERT

المثال فيه ٣ أوامر، كل واحد شكل: صف واحد، وكذا صف في أمر واحد مع [[RETURNING]]، والقيم جاية من استعلام بدل ما تتكتب بإيدك. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد كل الدروس اللي فاتت ([[products]] فيه T-shirt).

---

## ١. [[INSERT INTO products (name, price, stock) VALUES ('Mug', 120, 15);]]

| الحتة | معناها |
|---|---|
| [[INSERT INTO products]] | ضيف في جدول products |
| [[(name, price, stock)]] | الأعمدة اللي هبعتها، بالترتيب ده |
| [[VALUES ('Mug', 120, 15)]] | القيم بنفس الترتيب: الاسم ثم السعر ثم المخزون |

الأعمدة اللي مش مكتوبة ([[id]] و [[is_active]] و [[attrs]] و [[created_at]]) بتاخد الـ DEFAULT بتاعها.

~~~text الناتج
INSERT 0 1
~~~

[[1]] = صف واحد اتضاف.

---

## ٢. كذا صف في أمر واحد، و [[RETURNING]]

~~~text الأمر
INSERT INTO products (name, price, stock) VALUES
  ('Cap', 180, 0),
  ('Hoodie', 650, 8),
  ('Sticker', 15, 300)
RETURNING id, name;
~~~

- بعد [[VALUES]] كذا مجموعة قيم، كل مجموعة بين [[( )]] وبينهم [[,]]. كل مجموعة = صف.
- السطور الجديدة والمسافات للقراية بس: ده أمر واحد لحد الـ [[;]].
- [[RETURNING id, name]]: بعد ما الصفوف تتضاف، رجّعلي العمودين دول منها. ده بيوفّر SELECT تاني عشان تعرف الـ ids اللي اتولّدت.

~~~text الناتج
 id |  name
----+---------
  7 | Cap
  8 | Hoodie
  9 | Sticker
(3 rows)

INSERT 0 3
~~~

- الجدول فوق ناتج RETURNING، و [[INSERT 0 3]] = ٣ صفوف اتضافت.
- الـ ids مش 2 و 3 و 4: Mug خد 6، والأرقام اللي قبلها راحت في محاولات فشلت أو صفوف اتمسحت في الدروس اللي فاتت. العدّاد مبيرجعش لورا.

ليه أمر واحد أحسن من ٣؟ كل أمر رحلة للقاعدة و commit لوحده. أمر واحد بـ ٣ صفوف (أو ألف) = رحلة واحدة و commit واحد.

---

## ٣. [[INSERT ... SELECT]]: القيم من استعلام

~~~text الأمر
INSERT INTO orders (user_id, total)
SELECT id, 0 FROM users WHERE email = 'you@example.com'
RETURNING id, status, created_at;
~~~

نفكه من جوه لبرة:

### [[SELECT id, 0 FROM users WHERE email = 'you@example.com']]

بيرجّع صف واحد فيه عمودين: الـ [[id]] بتاع اليوزر ده، والرقم [[0]] ثابت (SELECT ينفع يرجّع قيمة ثابتة جنب الأعمدة).

### [[INSERT INTO orders (user_id, total) ...]]

كل صف رجع من الـ SELECT بيتحط كصف جديد في orders: العمود الأول يروح [[user_id]]، والتاني يروح [[total]]. لو الـ SELECT رجّع ٥ صفوف كان هيضيف ٥ أوردرات، ولو رجّع صفر مش هيضيف حاجة ومش هيطلّع error.

### [[RETURNING id, status, created_at]]

بيرجّع الأعمدة اللي القاعدة ملتها لوحدها:

~~~text الناتج
 id | status  |          created_at
----+---------+-------------------------------
  4 | pending | 2026-10-07 08:28:20.871409+00
(1 row)

INSERT 0 1
~~~

[[status]] = [[pending]] من الـ DEFAULT، و [[created_at]] من [[now()]]. ميزة الشكل ده إنك مش محتاج تعرف الـ uuid بتاع اليوزر: الاستعلام بيجيبه بالإيميل.

---

## ٤. الأمر الواحد يا كله يا ولا حاجة (الـ «جرّب»)

~~~text SELECT count(*) FROM products;
 count
-------
     5
~~~

~~~text INSERT INTO products (name, price, stock) VALUES ('A', 10, 1), ('B', NULL, 1), ('C', 30, 1);
ERROR:  null value in column "price" of relation "products" violates not-null constraint
DETAIL:  Failing row contains (11, B, null, 1, t, {}, 2026-10-07 08:28:20.875021+00).
~~~

~~~text SELECT count(*) FROM products;
 count
-------
     5
~~~

لسه ٥: لا A اتضاف ولا C. الـ INSERT الواحد **statement** واحد، وأي statement في Postgres يا ينجح كله يا يفشل كله (atomic).

لاحظ في الـ [[DETAIL]] إن B خد id رقم [[11]]: يعني A خد 10 قبله، والاتنين راحوا. وأول INSERT سليم بعدها خد [[12]].

---

## الخلاصة

| الشكل | امتى |
|---|---|
| [[INSERT INTO t (a, b) VALUES (1, 2);]] | صف واحد |
| [[VALUES (...), (...), (...)]] | كذا صف مرة واحدة (أسرع من loop) |
| [[INSERT INTO t (a) SELECT ...]] | القيم جاية من جدول تاني |
| [[... RETURNING col]] | عايز اللي اتولّد (id، وقت) من غير SELECT تاني |

- اكتب أسماء الأعمدة دايمًا بعد اسم الجدول، والقيم بنفس الترتيب.
- اللي مش مكتوب ياخد الـ DEFAULT، أو NULL لو ملوش.
- psql بيرد [[INSERT 0 N]]، و N عدد الصفوف.
- صف واحد غلط = الأمر كله اترفض.`,
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
          teach: R`## الفكرة: SET بيقول «إيه»، و WHERE بيقول «فين»

[[UPDATE]] بيغيّر قيم في صفوف موجودة. [[SET]] فيه القيم الجديدة، و [[WHERE]] بيحدد أنهي صفوف. والرقم اللي psql بيرد بيه ([[UPDATE 1]]) هو عدد الصفوف اللي اتغيرت فعلًا، ودي أهم معلومة في الدرس. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد درس INSERT (فيه T-shirt و Mug و Cap و Hoodie و Sticker، وأوردرات [[pending]]).

---

## ١. [[UPDATE products SET price = 199.00 WHERE name = 'Cap';]]

| الحتة | معناها |
|---|---|
| [[UPDATE products]] | عدّل في جدول products |
| [[SET price = 199.00]] | خلّي عمود price قيمته 199.00 |
| [[WHERE name = 'Cap']] | في الصفوف اللي اسمها Cap بس |

~~~text الناتج
UPDATE 1
~~~

صف واحد اتعدّل. لو كان فيه ٣ منتجات اسمهم Cap كان هيقول [[UPDATE 3]]، وكلهم كانوا هيتعدلوا.

---

## ٢. [[UPDATE products SET stock = stock - 1 WHERE name = 'Mug' AND stock > 0 RETURNING stock;]]

### [[SET stock = stock - 1]]

القيمة الجديدة **محسوبة من القديمة**: [[stock]] على اليمين هو القيمة الحالية في الصف، والناتج بيتحط في [[stock]] اللي على الشمال. Mug كان 15 فبقى 14.

ليه ده أحسن من إنك تقرا 15 في الكود وتبعت [[SET stock = 14]]؟ لو اتنين اشتروا في نفس اللحظة، الاتنين هيقروا 15 ويبعتوا 14، والمخزون هيقل واحد بس بدل اتنين. [[stock - 1]] بيتحسب جوه القاعدة على القيمة الحقيقية لحظة التعديل.

### [[AND stock > 0]]

شرط حماية: متخصمش لو المخزون خلص، عشان ميبقاش بالسالب.

### [[RETURNING stock]]

رجّعلي القيمة **بعد** التعديل.

~~~text الناتج
 stock
-------
    14
(1 row)

UPDATE 1
~~~

وعلى منتج مخزونه صفر (Cap)، نفس الأمر:

~~~text UPDATE products SET stock = stock - 1 WHERE name = 'Cap' AND stock > 0 RETURNING stock;
 stock
-------
(0 rows)

UPDATE 0
~~~

[[UPDATE 0]]: الشرط موقّف التعديل، ومفيش error. في الكود بتشيك على الرقم ده: لو 0 يبقى «المنتج خلص».

---

## ٣. [[UPDATE products SET is_active = false, stock = 0 WHERE name = 'Sticker';]]

عمودين في نفس الأمر، والفاصل بينهم **فاصلة** [[,]].

~~~text الناتج
UPDATE 1
~~~

لو كتبت [[AND]] بدل الفاصلة، Postgres بيقراها كتعبير منطقي واحد ويرفض:

~~~text UPDATE products SET price = 1 AND stock = 2 WHERE name = 'Cap';
ERROR:  argument of AND must be type boolean, not type integer
LINE 1: UPDATE products SET price = 1 AND stock = 2 WHERE name = 'Ca...
                                    ^
~~~

قراها [[price = (1 AND (stock = 2))]]، و [[1]] رقم مش boolean. (MySQL بيقبل نفس الجملة ويحط في price نتيجة الشرط، من غير ما يقولك.)

---

## ٤. [[UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';]]

[[id = 1]] بيحدد الأوردر، و [[status = 'pending']] شرط زيادة: «غيّره بس لو لسه pending». نفّذناه مرتين ورا بعض:

~~~text المرة الأولى
UPDATE 1
~~~

~~~text المرة التانية
UPDATE 0
~~~

المرة التانية الأوردر بقى [[paid]]، فالشرط مبقاش متحقق ومحدش اتعدّل. يعني لو الدفع اتبعت مرتين بالغلط (اليوزر داس الزرار مرتين)، التانية هترجع [[0]] والكود يعرف إن الأوردر اتدفع قبل كده ومش هيخصم تاني.

---

## ٥. [[UPDATE products SET price = 0;]] من غير WHERE

من غير WHERE = **كل** صفوف الجدول. جربناها جوه [[BEGIN]] عشان نقدر نرجع:

~~~text BEGIN; و UPDATE products SET price = 0;
BEGIN
UPDATE 5
~~~

[[UPDATE 5]]: كل المنتجات الخمسة.

~~~text SELECT name, price FROM products;
  name   | price
---------+-------
 T-shirt |  0.00
 Hoodie  |  0.00
 Cap     |  0.00
 Mug     |  0.00
 Sticker |  0.00
(5 rows)
~~~

(لاحظ الترتيب اتلخبط: الصفوف اللي اتعدّلت قبل كده اتكتبت في أماكن جديدة، وده اللي اتشرح في درس «ORDER BY و LIMIT».)

~~~text ROLLBACK; و SELECT name, price, stock, is_active FROM products ORDER BY id;
ROLLBACK
  name   | price  | stock | is_active
---------+--------+-------+-----------
 T-shirt | 250.00 |    40 | t
 Mug     | 120.00 |    14 | t
 Cap     | 199.00 |     0 | t
 Hoodie  | 650.00 |     8 | t
 Sticker |  15.00 |     0 | f
(5 rows)
~~~

[[ROLLBACK]] رجّع الأسعار، والتعديلات اللي قبل الـ BEGIN (Cap بـ 199، و Mug 14، و Sticker مش نشط) فضلت لأنها اتحفظت قبل كده. من غير BEGIN مكانش فيه رجوع.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[SET col = value]] | قيمة جديدة ثابتة |
| [[SET col = col - 1]] | محسوبة من القديمة، جوه القاعدة |
| [[SET a = 1, b = 2]] | كذا عمود، بفاصلة مش AND |
| [[WHERE ... AND status = 'pending']] | عدّل بس لو الصف لسه في الحالة المتوقعة |
| [[RETURNING col]] | القيمة بعد التعديل |

- اقرا رقم [[UPDATE N]] دايمًا: 0 معناه الشرط مش متحقق، ورقم كبير معناه الـ WHERE أوسع من اللي فاكره.
- UPDATE من غير WHERE بيعدّل الجدول كله. لو بتعدّل بإيدك، [[BEGIN]] الأول وبص على الناتج قبل [[COMMIT]].`,
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
          teach: R`## الفكرة: عُد قبل ما تمسح، أو متمسحش أصلًا

المثال جزئين. الأول مسح حقيقي بـ [[DELETE]]، بالطريقة الآمنة: نفس الـ WHERE في [[SELECT count(*)]] الأول، وبعدين المسح. التاني **soft delete**: بدل ما الصف يتمسح، بنكتب في عمود إمتى «اتمسح»، وكل قراية بتستبعده. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد درس UPDATE.

---

## ١. [[SELECT count(*) FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';]]

الشرط:
- [[status = 'cancelled']]: الأوردرات الملغية.
- [[created_at < now() - interval '90 days']]: اتعملت **قبل** ٩٠ يوم من دلوقتي. [[now() - interval '90 days']] لحظة في الماضي، و [[<]] قبلها.

~~~text SELECT now() - interval '90 days' AS cutoff;
            cutoff
-------------------------------
 2026-07-09 08:28:48.185372+00
~~~

يعني أي أوردر ملغي قبل ٩ يوليو.

~~~text الناتج
 count
-------
     0
(1 row)
~~~

عندنا مفيش أوردرات ملغية خالص، فالعدد صفر. الخطوة دي بتقولك بالظبط الـ DELETE هيمسح كام قبل ما يمسح.

---

## ٢. [[DELETE FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';]]

| الحتة | معناها |
|---|---|
| [[DELETE FROM orders]] | امسح صفوف من orders |
| [[WHERE ...]] | نفس الشرط **بالظبط** اللي عدّيت بيه |

مفيش أعمدة في DELETE: بيمسح الصف كله.

~~~text الناتج
DELETE 0
~~~

[[DELETE 0]] = نفس رقم العد. القاعدة: **الرقمين لازم يبقوا زي بعض**. لو العد قال 12 والمسح قال 3000، يبقى انت غيّرت الشرط بين الاتنين.

وعشان نشوف الأرقام مش صفر، ضفنا أوردر ملغي قديم جوه [[BEGIN]]:

~~~text BEGIN; INSERT INTO orders (user_id, status, created_at) SELECT id, 'cancelled', '2026-01-10 12:00+00' FROM users LIMIT 1;
BEGIN
INSERT 0 1
~~~

~~~text نفس الـ count ثم نفس الـ DELETE ثم ROLLBACK;
 count
-------
     1
(1 row)

DELETE 1
ROLLBACK
~~~

العد 1 والمسح 1: متطابقين. و [[ROLLBACK]] رجّع كل حاجة زي ما كانت.

---

## ٣. [[DELETE FROM products WHERE name = 'Sticker' RETURNING id, name;]]

[[RETURNING]] مع DELETE بيرجّع الصفوف **اللي اتمسحت**، فتشوف بعينك إيه اللي راح:

~~~text الناتج
 id |  name
----+---------
  9 | Sticker
(1 row)

DELETE 1
~~~

مفيد كمان تسجّل اللي اتمسح في log قبل ما يختفي.

---

## ٤. soft delete

### [[ALTER TABLE products ADD COLUMN deleted_at timestamptz;]]

عمود وقت جديد، مفيش NOT NULL، فكل المنتجات قيمته فيها NULL. والاتفاق: **NULL = موجود**، و**وقت = اتمسح في الوقت ده**.

~~~text الناتج
ALTER TABLE
~~~

### [[UPDATE products SET deleted_at = now() WHERE name = 'Cap';]]

ده «المسح»: UPDATE مش DELETE. الصف لسه في الجدول، بس عليه علامة.

~~~text الناتج
UPDATE 1
~~~

### [[SELECT name FROM products WHERE deleted_at IS NULL;]]

اقرا اللي **مش** ممسوح بس. ([[IS NULL]] مش [[= NULL]]، درس NULL.)

~~~text الناتج
  name
---------
 T-shirt
 Hoodie
 Mug
(3 rows)
~~~

Cap مش ظاهر.

---

## ٥. العيب الكبير (الـ «جرّب»)

~~~text SELECT name FROM products;
  name
---------
 T-shirt
 Hoodie
 Mug
 Cap
(4 rows)
~~~

من غير الشرط Cap رجع. وده مش في الـ SELECT البسيط بس، أي حساب بينسى الشرط بيحسبه:

~~~text SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;
 avg_price |  min   |  max
-----------+--------+--------
    304.75 | 120.00 | 650.00
~~~

المتوسط ده فيه سعر Cap الممسوح (199): (250 + 120 + 199 + 650) ÷ 4 = 304.75. كل استعلام في المشروع لازم يفتكر [[deleted_at IS NULL]].

---

## الخلاصة

| | [[DELETE]] | soft delete |
|---|---|---|
| الصف | بيختفي | بيفضل، وعليه [[deleted_at]] |
| الرجوع | من backup بس | [[SET deleted_at = NULL]] |
| القراية | عادي | كل استعلام لازم [[WHERE deleted_at IS NULL]] |
| امتى | داتا مؤقتة (sessions، أكواد OTP) | أوردرات، يوزرز، فواتير |

- قبل أي DELETE: نفس الـ WHERE في [[SELECT count(*)]]، وقارن الرقم بـ [[DELETE N]].
- DELETE من غير WHERE بيفضّي الجدول كله.
- [[RETURNING]] بيوريك اللي اتمسح.`,
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
          teach: R`## الفكرة: صفوف كتير تدخل، رقم واحد يطلع

الـ aggregate functions بتلف على كل الصفوف اللي عدّت من [[WHERE]] وترجّع **صف واحد** فيه النتيجة: العدد، أو المجموع، أو المتوسط. الناتج تحت من psql على [[postgres:18]] جوه Docker.

الأوردرات اللي عندنا من الدروس اللي فاتت كلها [[total = 0]]، فالأرقام هتطلع أصفار ملهاش طعم. عشان نشوف أرقام حقيقية ضفنا يوزر وخمس أوردرات جوه [[BEGIN]]، وفي الآخر [[ROLLBACK]]:

~~~text الأمر
BEGIN;
INSERT INTO users (email, name) VALUES ('sara@example.com', 'Sara');
INSERT INTO orders (user_id, status, total, created_at) VALUES
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'paid',      450, '2026-09-03 10:00+00'),
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'paid',      900, '2026-09-03 18:30+00'),
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'cancelled', 300, '2026-09-04 09:00+00'),
  ((SELECT id FROM users WHERE email = 'sara@example.com'), 'paid',      700, '2026-09-05 14:00+00'),
  ((SELECT id FROM users WHERE email = 'sara@example.com'), 'pending',    80, '2026-09-05 16:00+00');
~~~

[[(SELECT id FROM users WHERE email = '...')]] بين قوسين جوه VALUES اسمها **scalar subquery**: استعلام بيرجّع قيمة واحدة بتتحط مكانها، هنا الـ uuid بتاع اليوزر. فبقى عندنا ٨ أوردرات:

~~~text SELECT id, status, total FROM orders ORDER BY id;
 id |  status   | total
----+-----------+--------
  1 | paid      |   0.00
  3 | pending   |   0.00
  4 | pending   |   0.00
 16 | paid      | 450.00
 17 | paid      | 900.00
 18 | cancelled | 300.00
 19 | paid      | 700.00
 20 | pending   |  80.00
(8 rows)
~~~

(الـ ids نطّت لـ 16 لأن تجارب قبلها اترجعت بـ ROLLBACK وسحبت أرقام.) خلّي الجدول ده قدامك وانت بتقرا الأرقام تحت.

---

## ١. [[SELECT count(*) FROM orders;]]

[[count(*)]] = عدد الصفوف. الـ [[*]] هنا معناها «الصف كله»، فبيعد كل صف حتى لو فيه NULL.

~~~text الناتج
 count
-------
     8
(1 row)
~~~

---

## ٢. [[SELECT count(*) FILTER (WHERE status = 'paid') AS paid_orders FROM orders;]]

[[FILTER (WHERE ...)]] بعد الـ aggregate معناها «احسب على الصفوف اللي بتحقق الشرط ده بس». الفرق بينها وبين WHERE العادية: WHERE بتشيل الصفوف من الاستعلام كله، و FILTER بتأثر على الـ aggregate ده بس. فتقدر تحط كذا واحد جنب بعض:

~~~text الناتج
 paid_orders
-------------
           4
(1 row)
~~~

~~~text SELECT count(*) AS all_orders, count(*) FILTER (WHERE status = 'paid') AS paid, count(*) FILTER (WHERE status = 'pending') AS pending FROM orders;
 all_orders | paid | pending
------------+------+---------
          8 |    4 |       3
~~~

٣ أرقام في مرور واحد على الجدول، بدل ٣ استعلامات. (FILTER موجودة في Postgres و SQLite، مش في كل القواعد.)

---

## ٣. [[SELECT sum(total) AS revenue FROM orders WHERE status = 'paid';]]

هنا WHERE عادية: الأول خلّي المدفوع بس (٤ صفوف)، وبعدين [[sum(total)]] تجمع عمود total فيهم:

~~~text الناتج
 revenue
---------
 2050.00
(1 row)
~~~

0 + 450 + 900 + 700 = 2050. والـ cancelled (300) والـ pending (80) برّه.

---

## ٤. [[SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;]]

ثلاث aggregates في نفس الـ SELECT، كلهم على نفس الصفوف:

| الحتة | معناها |
|---|---|
| [[avg(price)]] | المتوسط |
| [[round(..., 2)]] | قرّب المتوسط لخانتين |
| [[min(price)]] / [[max(price)]] | أصغر وأكبر سعر |

~~~text الناتج
 avg_price |  min   |  max
-----------+--------+--------
    304.75 | 120.00 | 650.00
(1 row)
~~~

من غير round:

~~~text SELECT avg(price) FROM products;
         avg
----------------------
 304.7500000000000000
~~~

avg بترجّع numeric بخانات كتير، عشان كده بنقرّبها. ولاحظ إن [[min]] و [[max]] مالهمش اسم بـ AS، فـ psql سمّاهم باسم الدالة.

---

## ٥. [[SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';]]

مفيش ولا أوردر [[refunded]]، فالـ WHERE ساب **صفر صفوف**. نشوف sum لوحدها الأول (مع [[\pset null '(null)']] عشان NULL يبان):

~~~text SELECT sum(total) FROM orders WHERE status = 'refunded';
  sum
--------
 (null)
~~~

~~~text SELECT count(*) FROM orders WHERE status = 'refunded';
 count
-------
     0
~~~

[[sum]] على مفيش = NULL (مفيش حاجة تتجمع)، أما [[count]] على مفيش = 0. ونفس كلام sum على avg و min و max.

[[COALESCE(x, 0)]] بترجّع أول قيمة مش NULL، فبتحوّل الـ NULL لصفر:

~~~text الناتج
 revenue
---------
       0
(1 row)
~~~

[[0]] من غير [[.00]] لأن الـ 0 اللي كتبناه integer.

---

## ٦. الغلطة المشهورة

~~~text SELECT status, count(*) FROM orders;
ERROR:  column "orders.status" must appear in the GROUP BY clause or be used in an aggregate function
~~~

[[count(*)]] بيرجّع صف واحد للجدول كله، و [[status]] ليه ٨ قيم. أنهي واحدة تتحط جنب العدد؟ Postgres بيرفض. الحل [[GROUP BY]] (الدرس الجاي).

---

## الخلاصة

| الدالة | بترجّع | على صفر صفوف | NULL |
|---|---|---|---|
| [[count(*)]] | عدد الصفوف | 0 | بيعده |
| [[count(col)]] | عدد اللي مش NULL | 0 | بيتجاهله |
| [[sum(col)]] | المجموع | **NULL** | بيتجاهله |
| [[avg(col)]] | المتوسط | NULL | بيتجاهله |
| [[min]] / [[max]] | أصغر / أكبر | NULL | بيتجاهله |

- WHERE بيختار الصفوف للاستعلام كله، و [[FILTER (WHERE ...)]] لـ aggregate واحد بس.
- [[COALESCE(sum(x), 0)]] عشان الواجهة متعرضش null.
- مينفعش عمود عادي جنب aggregate من غير GROUP BY.`,
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
          teach: R`## الفكرة: قسّم الصفوف أكوام، واحسب لكل كومة

من غير GROUP BY، [[count(*)]] بيرجّع رقم واحد للجدول كله. [[GROUP BY status]] بيقسم الصفوف أكوام: كومة لكل قيمة status، والـ aggregate بيتحسب لكل كومة لوحدها، فبتاخد صف لكل كومة.

الناتج تحت من psql على [[postgres:18]] جوه Docker، بنفس الداتا التجريبية اللي في درس «count و sum و avg» (٨ أوردرات، جوه [[BEGIN]] ... [[ROLLBACK]]):

| id | status | total | اليوزر | اليوم |
|---|---|---|---|---|
| 1 | paid | 0.00 | you@example.com | 7 أكتوبر |
| 3 | pending | 0.00 | you@example.com | 7 أكتوبر |
| 4 | pending | 0.00 | you@example.com | 7 أكتوبر |
| 16 | paid | 450.00 | you@example.com | 3 سبتمبر |
| 17 | paid | 900.00 | you@example.com | 3 سبتمبر |
| 18 | cancelled | 300.00 | you@example.com | 4 سبتمبر |
| 19 | paid | 700.00 | sara@example.com | 5 سبتمبر |
| 20 | pending | 80.00 | sara@example.com | 5 سبتمبر |

(الأوردرات 1 و 3 و 4 من الدروس اللي فاتت، والباقي التجريبية.)

---

## ١. [[SELECT status, count(*) AS orders FROM orders GROUP BY status;]]

خطوة خطوة:
1. [[FROM orders]]: الـ ٨ صفوف.
2. [[GROUP BY status]]: اعمل كومة لكل قيمة status: كومة [[paid]] (٤)، وكومة [[pending]] (٣)، وكومة [[cancelled]] (١).
3. [[SELECT status, count(*)]]: لكل كومة، اكتب قيمة status بتاعتها وعدد صفوفها.

~~~text الناتج
  status   | orders
-----------+--------
 cancelled |      1
 pending   |      3
 paid      |      4
(3 rows)
~~~

[[status]] مسموح في SELECT لأنه هو عمود التجميع: كل كومة ليها status واحدة. والترتيب عشوائي لأن مفيش ORDER BY.

---

## ٢. [[SELECT user_id, count(*) AS orders, sum(total) AS spent FROM orders GROUP BY user_id ORDER BY spent DESC;]]

| الحتة | معناها |
|---|---|
| [[GROUP BY user_id]] | كومة لكل يوزر |
| [[count(*) AS orders]] | عدد أوردراته |
| [[sum(total) AS spent]] | مجموع اللي صرفه |
| [[ORDER BY spent DESC]] | الأكتر صرفًا الأول. [[spent]] اسم AS، و ORDER BY بيتنفذ بعد SELECT فشايفه |

~~~text الناتج
               user_id                | orders |  spent
--------------------------------------+--------+---------
 fd40c24d-5002-4118-b356-41ff21b0a62d |      6 | 1650.00
 cedbc3e9-393e-40fe-84de-14c259287206 |      2 |  780.00
(2 rows)
~~~

اليوزر الأول: ٦ أوردرات، و 0+0+0+450+900+300 = 1650 (مفيش WHERE، فالـ cancelled داخل). Sara: 700 + 80 = 780. الـ uuids عندك هتبقى مختلفة.

---

## ٣. إيراد كل يوم

~~~text الأمر
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY day ORDER BY day;
~~~

### [[date_trunc('day', created_at)]]

[[date_trunc]] = date truncate، يعني «قُص الوقت». [['day']] معناها: سيب اليوم وصفّر الساعة والدقايق والثواني.

~~~text SELECT date_trunc('day', '2026-09-03 18:30+00'::timestamptz) AS d;
           d
------------------------
 2026-09-03 00:00:00+00
~~~

فأوردرين في نفس اليوم بساعات مختلفة بقوا نفس القيمة بالظبط، وده اللي بيخليهم يقعوا في نفس الكومة. والوحدة ممكن تبقى [['hour']] أو [['week']] أو [['month']] أو [['year']].

### الترتيب

1. [[WHERE status = 'paid']]: المدفوع بس (٤ صفوف) قبل أي تجميع.
2. [[GROUP BY day]]: كومة لكل يوم. Postgres بيسمح تكتب اسم الـ AS هنا ([[day]]) بدل ما تكرر الـ date_trunc كلها.
3. [[sum(total)]] لكل يوم، و [[ORDER BY day]] من الأقدم.

~~~text الناتج
          day           | revenue
------------------------+---------
 2026-09-03 00:00:00+00 | 1350.00
 2026-09-05 00:00:00+00 |  700.00
 2026-10-07 00:00:00+00 |    0.00
(3 rows)
~~~

يوم ٣: 450 + 900 = 1350 (أوردرين اتجمعوا في صف). يوم ٤ مش موجود خالص: كان فيه أوردر بس cancelled، والـ WHERE شاله. الأيام اللي مفيهاش داتا **مبتظهرش** بصفر، بتختفي.

### من غير date_trunc (الـ «جرّب»)

~~~text SELECT created_at, sum(total) AS revenue FROM orders WHERE status = 'paid' GROUP BY created_at ORDER BY created_at;
          created_at           | revenue
-------------------------------+---------
 2026-09-03 10:00:00+00        |  450.00
 2026-09-03 18:30:00+00        |  900.00
 2026-09-05 14:00:00+00        |  700.00
 2026-10-07 08:27:20.560271+00 |    0.00
(4 rows)
~~~

صف لكل أوردر، لأن كل أوردر وقته مختلف (لحد الميكروثانية). الكومة بتتعمل من القيم **المتساوية بالظبط**، فلازم تقُص الوقت الأول.

---

## ٤. [[SELECT status, user_id FROM orders GROUP BY status;]]

~~~text الناتج
ERROR:  column "orders.user_id" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: SELECT status, user_id FROM orders GROUP BY status;
                       ^
~~~

كومة [[paid]] فيها أوردرات من يوزرين. لما تطلب [[user_id]] جنب [[paid]]، تقصد أنهي واحد؟ Postgres مش هيختار عشوائي. الـ error بيقولك الحلين: حطه في [[GROUP BY]] (فتبقى الكومة لكل status + user_id)، أو حطه جوه aggregate (زي [[count(DISTINCT user_id)]]).

استثناء واحد: لو جمّعت بالـ primary key، تقدر تعرض أي عمود تاني من نفس الجدول، لأنه أكيد قيمة واحدة لكل id:

~~~text SELECT u.email, count(*) AS orders FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.id ORDER BY orders DESC;
      email       | orders
------------------+--------
 you@example.com  |      6
 sara@example.com |      2
~~~

([[JOIN]] بيربط كل أوردر بصاحبه، و [[o]] و [[u]] أسماء مختصرة للجدولين. ده درس «INNER JOIN» في المستوى التاني.)

---

## الخلاصة

| الخطوة | الجزء |
|---|---|
| ١ | [[FROM]]: الصفوف |
| ٢ | [[WHERE]]: فلترة الصفوف |
| ٣ | [[GROUP BY]]: أكوام |
| ٤ | aggregate لكل كومة |
| ٥ | [[SELECT]]: صف لكل كومة |
| ٦ | [[ORDER BY]] |

- أي عمود في SELECT: يا إما في GROUP BY، يا إما جوه aggregate.
- الوقت يتجمّع بعد [[date_trunc]]، وإلا كل صف كومة.
- الأيام/المجموعات اللي ملهاش صفوف مش بتظهر بصفر.`,
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
          teach: R`## الفكرة: WHERE للصفوف، HAVING للأكوام

درس «GROUP BY» قسّم الصفوف أكوام وحسب رقم لكل كومة. [[HAVING]] بييجي بعد كده ويقول «خلّي الأكوام اللي رقمها كذا بس». الفرق مع WHERE في **التوقيت**: WHERE بيشتغل على الصفوف قبل التجميع، و HAVING على الأكوام بعده.

الناتج تحت من psql على [[postgres:18]] جوه Docker، بنفس الداتا التجريبية اللي في درس «count و sum و avg»: اليوزر الأول ([[fd40c24d...]]) عنده ٦ أوردرات، منهم paid بـ 0 و 450 و 900 و cancelled بـ 300. و Sara ([[cedbc3e9...]]) عندها paid بـ 700 و pending بـ 80.

---

## ١. اليوزرز اللي عندهم أكتر من ٣ أوردرات

~~~text الأمر
SELECT user_id, count(*) AS orders
FROM orders
GROUP BY user_id
HAVING count(*) > 3;
~~~

بترتيب التنفيذ:
1. [[FROM orders]]: الـ ٨ صفوف.
2. [[GROUP BY user_id]]: كومتين، كومة لكل يوزر: ٦ و ٢.
3. [[HAVING count(*) > 3]]: لكل كومة احسب [[count(*)]] واسأل «أكبر من ٣؟». الأولى 6 = أيوه، التانية 2 = لأ، فتترمي.
4. [[SELECT user_id, count(*) AS orders]]: اعرض الكومة اللي فضلت.

~~~text الناتج
               user_id                | orders
--------------------------------------+--------
 fd40c24d-5002-4118-b356-41ff21b0a62d |      6
(1 row)
~~~

ليه مينفعش WHERE هنا؟ آخر سطر في المثال بيوريك:

~~~text SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_id;
ERROR:  aggregate functions are not allowed in WHERE
LINE 1: SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_...
                                         ^
~~~

[[aggregate functions are not allowed in WHERE]]: WHERE بيتسأل لكل **صف** لوحده، وصف واحد ملوش «عدد». العدد بيبقى موجود بس بعد ما الصفوف تتجمّع، يعني بعد WHERE.

---

## ٢. WHERE و HAVING مع بعض

~~~text الأمر
SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;
~~~

نمشي عليه بالترتيب ونشوف الأرقام بتتغير إزاي:

### الخطوة ١: [[WHERE status = 'paid']]

قبل أي تجميع، الصفوف اللي مش paid بتترمي: الـ cancelled (300) والـ pending كلهم. فاضل ٤ صفوف.

### الخطوة ٢: [[GROUP BY user_id]] و [[sum(total)]]

~~~text نفس الاستعلام من غير HAVING ولا ORDER BY
               user_id                |  spent
--------------------------------------+---------
 cedbc3e9-393e-40fe-84de-14c259287206 |  700.00
 fd40c24d-5002-4118-b356-41ff21b0a62d | 1350.00
~~~

اليوزر الأول: 0 + 450 + 900 = 1350. و Sara: 700. ولو شلت الـ WHERE كان الأول هيبقى 1650 (الـ cancelled داخل) و Sara 780، يعني WHERE غيّرت الأرقام نفسها، مش بس عدد الصفوف.

### الخطوة ٣: [[HAVING sum(total) >= 1000]]

1350 ≥ 1000 = أيوه. 700 ≥ 1000 = لأ، فـ Sara برّه.

### الخطوة ٤: [[ORDER BY spent DESC]]

رتّب اللي فضل من الأكبر.

~~~text الناتج
               user_id                |  spent
--------------------------------------+---------
 fd40c24d-5002-4118-b356-41ff21b0a62d | 1350.00
(1 row)
~~~

---

## ٣. ليه [[sum(total)]] متكررة مش [[spent]] (الـ «جرّب»)

~~~text SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id HAVING spent >= 1000;
ERROR:  column "spent" does not exist
LINE 1: ...ers WHERE status = 'paid' GROUP BY user_id HAVING spent >= 1...
                                                             ^
~~~

ونفس الاسم في ORDER BY اشتغل عادي فوق. السبب ترتيب التنفيذ:

| الترتيب | الجزء | يعرف [[spent]]؟ |
|---|---|---|
| ١ | [[FROM]] | لأ |
| ٢ | [[WHERE]] | لأ، ومش شايف aggregates كمان |
| ٣ | [[GROUP BY]] | لأ |
| ٤ | [[HAVING]] | **لأ**، الاسم لسه متعملش |
| ٥ | [[SELECT]] | هنا [[AS spent]] بيتعمل |
| ٦ | [[ORDER BY]] | **أيوه** |
| ٧ | [[LIMIT]] | — |

فـ HAVING لازم يكتب الـ aggregate نفسه. وده مش بيحسب الجمع مرتين: Postgres بيعرف إن [[sum(total)]] في HAVING هي نفس اللي في SELECT.

---

## الخلاصة

| | [[WHERE]] | [[HAVING]] |
|---|---|---|
| بيشتغل على | كل صف | كل كومة (بعد GROUP BY) |
| إمتى | قبل التجميع | بعد التجميع |
| يقدر يستخدم aggregate | لأ | أيوه |
| يعرف اسم الـ AS | لأ | لأ (في Postgres) |

- الشرط على عمود عادي (زي status) مكانه WHERE: بيقلل الصفوف قبل التجميع ويغيّر الأرقام.
- الشرط على رقم متجمّع (count أو sum) مكانه HAVING.
- في HAVING اكتب الـ aggregate نفسه، والاسم المستعار استخدمه في ORDER BY بس.`,
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
