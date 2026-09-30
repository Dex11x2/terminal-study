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
SELECT count(*) FROM products;   -- نفس الرقم`
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
SELECT name, price FROM products;   -- الأسعار رجعت`
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
SELECT name FROM products;                            -- Cap لسه ظاهر`
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
    },
    {
      t: "CASE والتواريخ والنصوص",
      l: 1,
      n: "الدوال اللي أي تقرير أو لوحة أدمن محتاجاها من أول أسبوع: قيمة حسب شرط، وإيراد كل شهر بتوقيت مصر، وتنضيف النصوص",
      items: [
        {
          cmd: "CASE WHEN",
          title: "قيمة حسب شرط جوه الـ SELECT، وعدّ مشروط جوه GROUP BY",
          desc: R`[[CASE]] هو الـ if/else بتاع SQL: بيرجّع قيمة حسب شرط، وتقدر تحطه في أي مكان بتكتب فيه قيمة: في SELECT، أو ORDER BY، أو جوه [[sum()]] و [[count()]]، أو في SET بتاع UPDATE.

الشروط بتتقري بالترتيب، وأول شرط يتحقق هو اللي بيكسب. ولو مفيش شرط اتحقق ومفيش [[ELSE]]، النتيجة [[NULL]].

أشهر استخدام في الشغل: تقرير فيه صف لكل يوزر وعمود لكل حالة ([[count(CASE WHEN status = 'paid' THEN 1 END)]]). وده نفس اللي [[FILTER]] بيعمله في درس count و sum و avg، بس CASE شغال في كل قواعد البيانات (MySQL و SQL Server كمان)، و FILTER في Postgres و SQLite بس.`,
          example: R`SELECT name, price,
       CASE
         WHEN price < 100 THEN 'cheap'
         WHEN price < 500 THEN 'normal'
         ELSE 'premium'
       END AS price_band
FROM products;
SELECT user_id,
       count(*) AS orders,
       count(CASE WHEN status = 'paid' THEN 1 END) AS paid,
       sum(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS paid_total
FROM orders
GROUP BY user_id;
SELECT name, stock FROM products
ORDER BY CASE WHEN stock = 0 THEN 1 ELSE 0 END, name;
UPDATE products
SET price = CASE name WHEN 'Mug' THEN 110 WHEN 'Cap' THEN 170 ELSE price END
WHERE name IN ('Mug', 'Cap');`,
          try: R`اعمل تقرير فيه صف لكل user_id وعمود لكل حالة (pending و paid و cancelled) بعدد الأوردرات، مرة بـ CASE ومرة بـ FILTER، وقارن النتيجتين. وبعدين شيل [[ELSE 0]] من الـ sum وشوف اليوزر اللي ملوش أوردرات مدفوعة بقى عنده إيه. وآخر حاجة اكتب [[count(CASE WHEN status = 'paid' THEN 1 ELSE 0 END)]] وشوف الرقم طلع كام. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: صف لكل [[user_id]] عنده أوردرات، وتلات أعمدة بعدد الـ pending والـ paid والـ cancelled (بالترتيب ده). اليوزر اللي ملوش حالة معينة يطلع عنده 0 مش NULL.`,
          sol: R`الاستعلامين لازم يطلّعوا نفس الأرقام بالظبط: صف لكل user_id، وتلات أعمدة أرقام. لو يوزر ملوش أوردرات pending، العمود بتاعه [[0]] مش NULL، لأن [[count]] بيعدّ القيم اللي مش NULL، و CASE من غير ELSE بيرجّع NULL للصفوف اللي مش مطابقة.

لما تشيل [[ELSE 0]] من [[sum]]: اليوزر اللي ملوش ولا أوردر مدفوع هيطلع عنده خانة فاضية (NULL) بدل [[0]]، لأن [[sum]] لقيم كلها NULL بيرجّع NULL. في الـ API ده بيوصل [[null]] والواجهة تكتب «NaN ج.م». الحل [[ELSE 0]] أو [[COALESCE(sum(...), 0)]].

والغلطة الأخيرة: [[count(CASE ... ELSE 0 END)]] بيطلع نفس عدد كل الأوردرات، لأن [[0]] قيمة مش NULL فـ count بيعدّها. مع count سيب ELSE خالص، ومع sum حط [[ELSE 0]].`,
          solCode: R`SELECT user_id,
       count(CASE WHEN status = 'pending' THEN 1 END)   AS pending,
       count(CASE WHEN status = 'paid' THEN 1 END)      AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders
GROUP BY user_id;

SELECT user_id,
       count(*) FILTER (WHERE status = 'pending')   AS pending,
       count(*) FILTER (WHERE status = 'paid')      AS paid,
       count(*) FILTER (WHERE status = 'cancelled') AS cancelled
FROM orders
GROUP BY user_id;`,
          flag: "script",
          deep: {
            why: "الداتا بتتخزن بشكل، والتقرير محتاجها بشكل تاني: «رخيص/عادي/غالي» بدل الرقم، أو عمود لكل حالة بدل صف لكل حالة، أو المنتجات الخلصانة في آخر القايمة. من غير CASE بتجيب كل الصفوف وتعمل الحسبة دي في JavaScript، وده أبطأ وبيتكرر في كل مكان.",
            how: R`فيه شكلين: [[CASE WHEN شرط THEN قيمة ... END]] (الشكل العام، كل WHEN شرط مستقل)، و [[CASE عمود WHEN قيمة THEN ... END]] (مقارنة بـ = مع قيمة واحدة، زي switch). والشكل التاني مبيعرفش يطابق NULL، لأن [[NULL = NULL]] مش true.

كل الفروع لازم ترجّع نوع واحد: [[THEN 1 ELSE 'none']] هيطلع error، لأن Postgres بيحاول يحوّل 'none' لرقم.

جوه aggregate، الـ CASE بيتحسب لكل صف قبل التجميع. عشان كده [[sum(CASE WHEN status = 'paid' THEN total ELSE 0 END)]] معناها «اجمع total للمدفوع بس» في نفس الـ GROUP BY اللي فيه باقي الأعمدة. وده اسمه conditional aggregation، وبيعمل pivot بسيط: الحالات بقت أعمدة.

في [[UPDATE]]: [[CASE name WHEN 'Mug' THEN 110 ... ELSE price END]] بيعدّل أكتر من صف بقيم مختلفة في أمر واحد. الـ [[ELSE price]] مهم: من غيره أي صف عدّى من الـ WHERE ومش متغطي في الـ CASE سعره هيبقى NULL (أو error لو العمود NOT NULL).`,
            when: "تقارير الأدمن (أوردرات كل حالة، مبيعات كل فئة سعرية)، والترتيب المخصص (المتاح الأول، أو حالات بترتيب منطقي مش أبجدي)، وتحويل أكواد لنصوص مفهومة، وتعديل كذا صف بقيم مختلفة في أمر واحد.",
            mistakes: R`[[count(CASE ... ELSE 0 END)]] فيعدّ كل حاجة. [[sum(CASE ...)]] من غير ELSE فيطلع NULL بدل صفر. تنسى [[END]] (الـ error بيبقى [[syntax error at or near "AS"]]). ترتيب الشروط غلط: [[WHEN price < 500]] قبل [[WHEN price < 100]] فمفيش حاجة هتبقى cheap أبدًا. وفي الانترفيو سؤال مشهور: «هات عدد الأوردرات المدفوعة والملغية لكل يوزر في استعلام واحد»، والإجابة conditional aggregation بـ CASE أو FILTER مش استعلامين.`
          },
          lines: [
            "الاسم والسعر، وعمود محسوب:",
            "ابدأ الـ CASE.",
            "لو السعر أقل من ١٠٠: رخيص.",
            "غير كده لو أقل من ٥٠٠: عادي (أول شرط يتحقق هو اللي بيكسب).",
            "أي حاجة تانية: غالي.",
            "قفلة الـ CASE واسم العمود.",
            "من المنتجات.",
            "لكل يوزر:",
            "عدد كل أوردراته،",
            "وعدد المدفوع بس: CASE بترجّع 1 للمدفوع و NULL لغيره، و count بيعدّ اللي مش NULL.",
            "ومجموع المدفوع: غير المدفوع بيتحسب صفر.",
            "من الأوردرات،",
            "مجمّعة باليوزر.",
            "المنتجات ومخزونها،",
            "الخلصان (stock = 0) ياخد 1 فينزل تحت، والباقي 0 فيطلع فوق، وبعدين بالاسم.",
            "تعديل الأسعار:",
            "كل منتج بسعره الجديد، و ELSE price عشان أي صف تاني يفضل زي ما هو.",
            "على المنتجين دول بس."
          ],
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
            starter: R`SELECT user_id,
       count(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
       count(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders
GROUP BY user_id;`,
            expect: [[3,1,1,0], [2,1,1,0], [1,0,3,1]],
            solution: R`SELECT user_id,
       count(*) FILTER (WHERE status = 'pending') AS pending,
       count(*) FILTER (WHERE status = 'paid') AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders
GROUP BY user_id;`
          }
        },
        {
          cmd: "دوال التاريخ",
          title: "إيراد كل شهر، والشهر بتوقيت القاهرة مش UTC",
          desc: R`أغلب التقارير سؤالها «كام في اليوم أو الشهر؟». الدوال اللي هتستخدمها طول الوقت:

[[date_trunc('month', created_at)]] بيقصّ الوقت لأول الشهر، فكل أوردرات سبتمبر ياخدوا نفس القيمة وتقدر تعمل GROUP BY عليها. و [[extract(hour FROM created_at)]] بيطلّع جزء واحد (الساعة، أو يوم الأسبوع [[dow]]). و [[to_char(created_at, 'YYYY-MM')]] بيحوّل الوقت لنص بالشكل اللي انت عايزه للعرض.

والأهم: [[timestamptz]] متخزن UTC. أوردر اتعمل الساعة ١:٣٠ الفجر يوم ١ سبتمبر في القاهرة، هو في UTC الساعة ١٠:٣٠ بالليل يوم ٣١ أغسطس. لو قصّيت بالشهر من غير توقيت، الأوردر ده هيتحسب في أغسطس. [[AT TIME ZONE 'Africa/Cairo']] بيحوّل الوقت لساعة القاهرة قبل ما تقصّ.`,
          example: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
SELECT to_char(date_trunc('month', created_at AT TIME ZONE 'Africa/Cairo'), 'YYYY-MM') AS month,
       count(*) AS orders, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
SELECT extract(hour FROM created_at AT TIME ZONE 'Africa/Cairo') AS hour, count(*)
FROM orders GROUP BY 1 ORDER BY 2 DESC;
SELECT id, created_at::date AS day, now() - created_at AS age,
       to_char(created_at AT TIME ZONE 'Africa/Cairo', 'DD/MM/YYYY HH24:MI') AS cairo_time
FROM orders ORDER BY id;
SELECT count(*) FROM orders
WHERE created_at >= date_trunc('month', now()) AND created_at < date_trunc('month', now()) + interval '1 month';`,
          try: R`ضيف أوردر مدفوع وقته [['2026-08-31 22:30+00']] (يعني ١:٣٠ الفجر يوم ١ سبتمبر في القاهرة). شغّل أول استعلامين وقارن: الأوردر ده في أنهي شهر في كل واحد؟ وبعدين اكتب استعلام يطلّع أكتر يوم في الأسبوع فيه أوردرات بتوقيت القاهرة، واسم اليوم بالإنجليزي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أكتر يوم في الأسبوع فيه أوردرات بتوقيت القاهرة: اسم اليوم بالإنجليزي من غير مسافات ([[FMDay]]) وعدد الأوردرات، صف واحد. (بتوقيت UTC الإجابة مختلفة.)`,
          sol: R`في الاستعلام الأول (من غير توقيت) الأوردر هيتحسب في [[2026-08-01]]، لأن Postgres بيقصّ الوقت بتوقيت الـ session، وفي Docker الافتراضي [[UTC]] (اتأكد بـ [[SHOW timezone;]]). في التاني هيتحسب في [[2026-09]]، لأن القاهرة في الصيف UTC+3 فالوقت بقى ١:٣٠ يوم ١ سبتمبر. يعني إيراد الشهرين اتغيّر، ورقم التقرير بتاعك كان هيختلف عن رقم المحاسب.

ولأكتر يوم في الأسبوع: [[to_char(..., 'FMDay')]] بيرجّع اسم اليوم ([[FM]] بتشيل المسافات اللي في الآخر)، و [[extract(dow ...)]] بيرجّع رقم من ٠ (الأحد) لـ ٦ (السبت). الغلطة الشائعة إنك تعمل GROUP BY على [[created_at]] نفسه فكل صف يبقى مجموعة لوحده.`,
          solCode: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 500, '2026-08-31 22:30+00' FROM users LIMIT 1;

SELECT to_char(created_at AT TIME ZONE 'Africa/Cairo', 'FMDay') AS weekday,
       count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`,
          flag: "script",
          deep: {
            why: "«مبيعات الشهر ده» و «أكتر ساعة فيها طلبات» و «الأوردرات اللي عدّى عليها أكتر من ٣ أيام من غير شحن» أسئلة يومية. ولو حسبتها غلط بالتوقيت، أرقامك هتختلف عن أرقام البنك وبوابة الدفع، وهتقضي يوم تدوّر على الفرق.",
            how: R`[[date_trunc('day'|'week'|'month'|'year', ts)]] بيرجّع نفس النوع مقصوص. الأسبوع بيبدأ الاتنين (ISO). ومن Postgres 12 فيه شكل بتلات arguments: [[date_trunc('month', created_at, 'Africa/Cairo')]] بيقصّ بتوقيت القاهرة ويرجّع timestamptz، وده أنضف لو هتكمّل حسابات على النتيجة.

[[ts AT TIME ZONE 'Africa/Cairo']] على timestamptz بيرجّع [[timestamp]] من غير tz (الساعة على الحيطة في القاهرة). استخدم اسم المنطقة مش [['+03']]: مصر رجّعت التوقيت الصيفي من ٢٠٢٣، فالفرق بيبقى ٢ في الشتا و ٣ في الصيف، واسم المنطقة بيعرف ده لوحده.

[[extract(field FROM ts)]]: [[year]] و [[month]] و [[day]] و [[hour]] و [[dow]] و [[epoch]] (ثواني من ١٩٧٠، مفيد تحسب مدة بالثواني).

[[now() - created_at]] بيرجّع [[interval]]، و [[age()]] بيرجّع interval بالسنين والشهور. و [[created_at::date]] بياخد التاريخ بتوقيت الـ session.

[[to_char]] للعرض بس: [[YYYY]] و [[MM]] و [[DD]] و [[HH24]] و [[MI]] و [[Mon]] و [[Day]]. النتيجة نص، فلو رتّبت بيها رتّب بصيغة زي [[YYYY-MM]] اللي ترتيبها الأبجدي هو نفس الترتيب الزمني.

والفلترة بالفترة: [[created_at >= بداية AND created_at < بداية الفترة اللي بعدها]]. ده بيستخدم index على created_at. أما [[WHERE date_trunc('month', created_at) = ...]] أو [[WHERE extract(month FROM created_at) = 9]] بيحسب الدالة على كل صف ومبيستخدمش الـ index العادي.`,
            when: "أي تقرير زمني، وأي فلتر «آخر ٧ أيام» أو «الشهر ده»، وعرض الأوقات في لوحة الأدمن. والأحسن إن الـ API يرجّع الوقت ISO بـ UTC والواجهة تعرضه بتوقيت المستخدم؛ استخدم to_char في التقارير والـ exports.",
            mistakes: R`تقصّ بالشهر من غير توقيت فأوردرات أول يوم في الشهر تروح للشهر اللي قبله. تكتب [[+02]] ثابت فالصيف كله يبوظ. [[BETWEEN '2026-09-01' AND '2026-09-30']] على timestamptz: بيقف عند أول لحظة في يوم ٣٠ فيضيّع اليوم كله؛ استخدم [[>=]] و [[<]]. دالة على العمود في WHERE فالـ index ميشتغلش. و [[timestamp]] من غير tz في الجدول أصلًا، فمحدش عارف الوقت المتخزن ده بتوقيت أنهي بلد.`
          },
          lines: [
            "أول كل شهر، ومجموع الإيراد:",
            "من المدفوع والمشحون،",
            "مجمّع بأول عمود (الشهر) ومترتب بيه. التقصيص هنا بتوقيت الـ session (UTC في Docker).",
            "نفس التقرير بس: حوّل للقاهرة الأول، واقصّ بالشهر، واكتبه نص زي 2026-09.",
            "وعدد الأوردرات والإيراد.",
            "نفس الفلتر.",
            "نفس التجميع والترتيب.",
            "الساعة بتوقيت القاهرة، وعدد الأوردرات فيها:",
            "مجمّعة بالساعة، والأكتر الأول.",
            "لكل أوردر: التاريخ بس، وعدّى عليه قد إيه (interval)،",
            "ووقته مكتوب بشكل مصري بتوقيت القاهرة.",
            "مترتبين بالـ id.",
            "عدد أوردرات الشهر الحالي:",
            "من أول الشهر لحد قبل أول الشهر الجاي، بشكل يستخدم الـ index."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE orders (id int PRIMARY KEY, created_at timestamptz NOT NULL);
INSERT INTO orders VALUES
  (1, '2026-08-31 22:30+00'), (2, '2026-09-07 21:15+00'), (3, '2026-09-14 23:00+00'),
  (4, '2026-09-01 10:00+00'), (5, '2026-09-21 09:00+00'), (6, '2026-09-28 12:00+00'),
  (7, '2026-09-03 12:00+00');`,
            starter: R`SELECT to_char(created_at, 'FMDay') AS day, count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`,
            expect: [["Tuesday",4]],
            solution: R`SELECT to_char(created_at AT TIME ZONE 'Africa/Cairo', 'FMDay') AS day, count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`
          }
        },
        {
          cmd: "دوال النصوص",
          title: "نضّف الإيميل، وطلّع الدومين، وركّب نص من كذا عمود",
          desc: R`الداتا اللي اليوزر بيكتبها بتيجي بمسافات زيادة وحروف كبيرة وصغيرة مخلوطة. الدوال دي بتنضّفها وتقطّعها وتركّبها:

[[lower]] و [[upper]] و [[initcap]] للحروف. [[trim]] بيشيل المسافات من الأول والآخر. [[split_part(email, '@', 2)]] بيقسم بفاصل وياخد جزء. [[concat]] و [[concat_ws]] بيركّبوا نص من كذا عمود. [[length]] بيعدّ الحروف. [[replace]] و [[regexp_replace]] للاستبدال.

والبحث بـ [[LIKE]] و [[ILIKE]] اتشرح في درسه في المستوى ده. هنا بنجهّز النص نفسه، سواء للعرض أو قبل ما تقارنه.`,
          example: R`SELECT lower(trim('  Ali@Example.COM ')) AS clean_email;
SELECT name, split_part(email, '@', 2) AS domain, length(name) AS len FROM users;
SELECT concat(name, ' <', email, '>') AS contact,
       concat_ws(' - ', name, phone, email) AS line
FROM users;
SELECT 'x' || NULL AS pipe, concat('x', NULL) AS concat_fn;
SELECT regexp_replace('010-123 45 678', '[^0-9]', '', 'g') AS digits;
SELECT initcap('ahmed mohamed'), left('Hoodie', 3), right('01012345678', 4), lpad('7', 4, '0');
SELECT length('محمد') AS chars, octet_length('محمد') AS bytes;
UPDATE users SET email = lower(trim(email)) WHERE email <> lower(trim(email));`,
          try: R`اعمل استعلام يرجّع لكل يوزر: الاسم الأول بس (قبل أول مسافة)، والدومين بتاع الإيميل، ورقم التليفون مكتوب بنجوم ماعدا آخر ٤ أرقام (زي [[*******5678]]). جرّب على يوزر تليفونه NULL وشوف بيطلع إيه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: لكل يوزر (بترتيب [[id]]): الاسم الأول بس، ودومين الإيميل، والتليفون بنجوم ماعدا آخر ٤ أرقام بنفس طوله (واللي ملوش تليفون يفضل NULL).`,
          sol: R`الاسم الأول: [[split_part(name, ' ', 1)]]، ولو الاسم كلمة واحدة بيرجّعه زي ما هو. الدومين: [[split_part(email, '@', 2)]].

والتليفون: [[lpad(right(phone, 4), length(phone), '*')]] بياخد آخر ٤ أرقام ويكمّل الشمال بنجوم لحد نفس طول الرقم الأصلي. ولليوزر اللي تليفونه NULL النتيجة NULL، لأن أي دالة على NULL بترجّع NULL (ماعدا [[concat]] و [[concat_ws]] اللي بيتجاهلوه). لو عايز نص بداله لفّها بـ [[COALESCE(..., 'no phone')]].

والغلطة الشائعة: [[replace(phone, '0', '*')]]، ده بيبدّل كل صفر في الرقم مش أول الأرقام. و [[substring]] بأرقام ثابتة بتبوظ لو الأرقام مختلفة الطول (+20 ولا 0).`,
          solCode: R`SELECT split_part(name, ' ', 1) AS first_name,
       split_part(email, '@', 2) AS domain,
       COALESCE(lpad(right(phone, 4), length(phone), '*'), 'no phone') AS masked_phone
FROM users;`,
          flag: "script",
          deep: {
            why: "«Ali@Example.com» و «ali@example.com » نفس اليوزر، بس القاعدة شايفاهم اتنين، فيعمل حسابين، أو ميعرفش يعمل login. وأي تقرير أو export محتاج يركّب اسم وتليفون في خانة واحدة، أو يخفي جزء من الرقم. الدوال دي بتعمل ده في نفس الاستعلام من غير loop في الكود.",
            how: R`[[||]] بيركّب نصين، بس لو أي طرف NULL النتيجة كلها NULL. [[concat]] بيعامل NULL كأنه نص فاضي، و [[concat_ws(فاصل, ...)]] بيحط الفاصل بين القيم ويتخطى الـ NULL خالص، فمش هتلاقي [[Ali -  - ali@...]] لما التليفون فاضي.

[[split_part(نص, فاصل, رقم)]] بيبدأ العد من 1، ولو الجزء مش موجود بيرجّع نص فاضي مش NULL. ومن Postgres 14 الرقم السالب بيعدّ من الآخر ([[-1]] آخر جزء).

[[length]] بيعدّ حروف، و [[octet_length]] بيعدّ bytes. الحرف العربي في UTF-8 بياخد ٢ byte، فـ «محمد» ٤ حروف و ٨ bytes. ده يفرق لو فيه حد أقصى بالـ bytes في حتة تانية (زي رسايل SMS).

[[regexp_replace(نص, pattern, بديل, 'g')]]: الـ [['g']] معناها كل المطابقات مش أول واحدة بس. و [[replace]] بيبدّل كل ظهور للنص حرفيًا.

[[trim]] بيشيل المسافات العادية بس. المسافات الغريبة (زي non-breaking space اللي بتيجي من copy/paste) محتاجة [[regexp_replace(x, '\s+', ' ', 'g')]] أو تنضيف في الـ validation.

أحسن مكان للتنضيف: الـ validation قبل ما الداتا تدخل (zod مثلًا بـ [[.trim().toLowerCase()]])، والـ UPDATE اللي في المثال لتنضيف الداتا القديمة مرة واحدة. ولو عايز القاعدة نفسها تمنع التكرار مهما حصل: [[UNIQUE INDEX ON users (lower(email))]] من درس constraints.`,
            when: "تنضيف الإيميلات والأسماء، وتقسيم أو تركيب أعمدة في تقرير أو export، وإخفاء بيانات حساسة في العرض، وتجهيز نص قبل البحث.",
            mistakes: R`[[||]] مع عمود ممكن يبقى NULL فيختفي السطر كله. تقارن [[email = 'Ali@x.com']] من غير lower. [[replace]] لما تقصد أول مرة بس. تنسى [['g']] في [[regexp_replace]] فيتبدّل أول حرف بس. [[WHERE lower(email) = ...]] من غير index على [[lower(email)]] فيعمل seq scan على كل اليوزرز. وتقصّ نص عربي بـ [[left(x, 50)]] وتفتكر إنه ٥٠ byte.`
          },
          lines: [
            "شيل المسافات وحوّل لحروف صغيرة: ali@example.com.",
            "الدومين من الإيميل (الجزء التاني بعد @) وطول الاسم.",
            "ركّب نص: الاسم وجنبه الإيميل بين < >،",
            "وسطر فيه الاسم والتليفون والإيميل بينهم « - »، والـ NULL بيتشال.",
            "من اليوزرز.",
            "الفرق: || مع NULL بيطلع NULL، و concat بيتجاهله فيطلع x.",
            "سيب الأرقام بس: 01012345678.",
            "أول حرف كبير، وأول ٣ حروف، وآخر ٤، وتكميل بأصفار من الشمال: 0007.",
            "٤ حروف، بس ٨ bytes في UTF-8.",
            "نضّف الإيميلات القديمة مرة واحدة، والصفوف اللي محتاجة بس."
          ],
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
            starter: R`SELECT name, email, phone
FROM users
ORDER BY id;`,
            expect: [["Sara","example.com","*******5678"], ["Ali","shop.eg",null], ["Mona","example.com","0100"], ["Omar","gmail.com",null]],
            solution: R`SELECT split_part(name, ' ', 1) AS first_name,
       split_part(email, '@', 2) AS domain,
       lpad(right(phone, 4), length(phone), '*') AS phone
FROM users
ORDER BY id;`,
            ordered: true
          }
        }
      ]
    },
    {
      t: "العلاقات بين الجداول",
      l: 2,
      n: "الداتا الحقيقية مرتبطة ببعض: يوزر ليه أوردرات، وأوردر فيه منتجات. والـ foreign key هو الخيط اللي بيربط",
      items: [
        {
          cmd: "one-to-many",
          title: "يوزر واحد ليه أوردرات كتير",
          desc: R`أشهر علاقة: صف في جدول يقابله صفوف كتير في جدول تاني. اليوزر ليه أوردرات كتير، والأوردر بتاع يوزر واحد. بتتعمل بعمود في جدول «الكتير» بيشاور على الـ primary key بتاع «الواحد»: [[orders.user_id]] بيشاور على [[users.id]].

و [[FOREIGN KEY ... REFERENCES]] بيخلي القاعدة تتأكد إن الـ user_id ده موجود فعلًا في users، فمفيش أوردر ليوزر مش موجود. في جدول جديد بتكتبه في التعريف على طول: [[user_id uuid NOT NULL REFERENCES users (id)]].`,
          example: R`ALTER TABLE orders
  ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
CREATE INDEX orders_user_id_idx ON orders (user_id);
INSERT INTO orders (user_id) VALUES (gen_random_uuid());     -- error: violates foreign key constraint
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com');`,
          try: R`حاول تمسح اليوزر اللي ليه أوردرات: [[DELETE FROM users WHERE email = 'you@example.com']]. اقرا الـ error، وده موضوع درس ON DELETE.`,
          flag: "script",
          deep: {
            why: "من غير foreign key، الكود ممكن يعمل أوردر بـ user_id غلط، أو يمسح يوزر ويسيب أوردراته «يتيمة» بتشاور على حاجة مش موجودة. بعد سنة هتلاقي تقارير فيها أرقام ملهاش صاحب ومحدش عارف جت منين.",
            how: R`العمود دايمًا في ناحية «الكتير». عكس كده (لستة order_ids جوه users) بيكسر أول قاعدة في التصميم: كل خانة فيها قيمة واحدة.

الـ foreign key بيتنفذ بـ triggers داخلية. مع كل INSERT أو UPDATE على orders، Postgres بيدوّر على الـ id في users (سريع، لأنه primary key عليه index). ومع كل DELETE من users، بيدوّر في orders على صفوف بتشاور عليه. وهنا المشكلة: Postgres مش بيعمل index على عمود الـ foreign key لوحده، فمن غير [[orders_user_id_idx]] كل مسح يوزر وكل [[WHERE user_id = ...]] بيقرا جدول الأوردرات كله. التفاصيل في تاب PostgreSQL درس «الـ indexes».

في Prisma العلاقة بتتكتب [[@relation(fields: [userId], references: [id])]]، و Prisma بيعمل الـ FOREIGN KEY في الـ migration.`,
            when: "كل مرة جدول بيشاور على صف في جدول تاني. ومعاه index على عمود الـ FK، إلا لو الجدول صغير جدًا.",
            mistakes: R`تشيل الـ FK «عشان المرونة» فتتراكم صفوف يتيمة. FK من غير index. تربط بالإيميل بدل الـ id، فلما الإيميل يتغير الربط يتقطع. وفي مشروع حقيقي كان جدول المدفوعات مربوط «polymorphic» بعمودين: [[paymentableId]] و [[paymentableType]] (أوردر ولا اشتراك). مفيش FK حقيقي ينفع يتعمل على ده، فالقاعدة مش بتحمي الربط، والـ ORM ميعرفش يعمل include، والنتيجة N+1 (درس N+1 في المستوى التالت).`
          },
          lines: [
            "عدّل جدول الأوردرات:",
            "ضيف foreign key: user_id لازم يبقى id موجود في users.",
            "index على عمود الـ FK (Postgres مش بيعمله لوحده).",
            "أوردر ليوزر مش موجود: مرفوض.",
            "أوردرات يوزر معين،",
            "والـ id جاي من استعلام بالإيميل."
          ],
          sol: R`هتاخد [[ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"]] ومعاه [[DETAIL:  Key (id)=(...) is still referenced from table "orders".]]. اليوزر متمسحش، لأن الافتراضي في أي FK هو [[NO ACTION]]: مينفعش تمسح أب ليه ولاد.

ده بالظبط اللي انت عايزه في الأوردرات: مسح يوزر مينفعش يمسح تاريخ مبيعات بالغلط. الاختيارات التانية (CASCADE أو SET NULL أو soft delete) في درس ON DELETE. لو المسح نجح، يبقى الـ ALTER TABLE اللي بيضيف الـ FK مكملش (غالبًا فيه أوردر قديم بـ user_id مش موجود في users، فالـ constraint اترفض)؛ اقرا الـ error بتاعه.`,
          solCode: R`DELETE FROM users WHERE email = 'you@example.com';
-- ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"`
        },
        {
          cmd: "many-to-many",
          title: "أوردر فيه منتجات كتير، ومنتج في أوردرات كتير",
          desc: R`لما الطرفين «كتير»، مينفعش عمود واحد يربطهم. الحل جدول وسيط (join table) كل صف فيه بيربط أوردر بمنتج: [[order_items]]. والجدول ده المكان الطبيعي لأي معلومة تخص العلاقة نفسها: الكمية، والسعر وقت الشرا.

الـ primary key هنا مركب من العمودين [[(order_id, product_id)]]، فنفس المنتج مايتكررش في نفس الأوردر مرتين.`,
          example: R`CREATE TABLE order_items (
  order_id   bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id bigint NOT NULL REFERENCES products (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE INDEX order_items_product_idx ON order_items (product_id);
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';`,
          try: R`كرر نفس الـ INSERT: هتاخد duplicate key لأن المنتج موجود في الأوردر ده. وبعدين غيّر سعر الـ Mug في products، وشوف إن [[unit_price]] في البند متغيرش.`,
          flag: "script",
          deep: {
            why: "الحل اللي الناس بتعمله أول مرة: عمود [[product_ids]] فيه [['1,5,9']]. ده مينفعش تعمل عليه JOIN، ولا FK، ولا index، ولا تحط جنبه كمية لكل منتج. الجدول الوسيط بيحوّل العلاقة لصفوف عادية تستعلم عليها زي أي حاجة.",
            how: R`كل صف في order_items فيه foreign key لكل ناحية. الـ primary key المركب [[(order_id, product_id)]] بيعمل index بالترتيب ده، فبيخدم «بنود أوردر معين» ([[WHERE order_id = ?]]). بس «الأوردرات اللي فيها منتج معين» محتاجة index تاني على [[product_id]] لوحده، وده اللي عملناه.

[[unit_price]] متكرر من products عن قصد: ده السعر اللي اليوزر دفعه فعلًا، ولازم يفضل ثابت حتى لو السعر اتغير بكرة (درس denormalization).

في Prisma فيه نوعين: implicit (بتكتب لستة المنتجات في Order ولستة الأوردرات في Product، و Prisma يعمل جدول مخفي فيه الـ ids بس)، و explicit (بتكتب model للجدول الوسيط زي [[OrderItem]]). أول ما العلاقة يبقى ليها معلومة (كمية، سعر، تاريخ)، لازم explicit.`,
            when: "أوردرات ومنتجات، طلاب وكورسات، بوستات و tags، يوزرز وأدوار. أي «كتير لكتير».",
            mistakes: R`ids مفصولة بكومة في عمود نص. array column من غير FK. تنسى unit_price وتحسب الفواتير القديمة بالسعر الحالي. وتنسى index على العمود التاني في المفتاح المركب.`
          },
          lines: [
            "الجدول الوسيط بين الأوردرات والمنتجات.",
            "FK للأوردر، ولو الأوردر اتمسح بنوده تتمسح معاه.",
            "FK للمنتج.",
            "الكمية لازم أكبر من صفر.",
            "السعر وقت الشرا، متنسخ من products.",
            "المفتاح المركب: المنتج مرة واحدة في كل أوردر.",
            "قفلة التعريف.",
            "index للناحية التانية: الأوردرات اللي فيها منتج معين.",
            "ضيف بند:",
            "لأوردر 1، منتج Mug، كمية ٢، والسعر من جدول المنتجات نفسه."
          ],
          sol: R`التكرار هيترفض: [[duplicate key value violates unique constraint "order_items_pkey"]] مع [[Key (order_id, product_id)=(1, 2) already exists.]]. الـ PRIMARY KEY المركب معناه إن المنتج يظهر مرة واحدة في الأوردر؛ لو العميل عايز تاني بتزوّد [[quantity]] مش بتضيف صف.

بعد [[UPDATE products SET price = 140 WHERE name = 'Mug']]، الـ join هيوريك [[unit_price]] في البند لسه بالسعر القديم و [[price]] في products بالجديد. ده مقصود: البند بيحفظ السعر وقت الشراء، والفاتورة القديمة متتغيرش لما المنتج يغلى. الغلطة الشائعة إنك تحسب total الأوردر من [[products.price]] بدل [[order_items.unit_price]].`,
          solCode: R`UPDATE products SET price = 140 WHERE name = 'Mug';
SELECT oi.unit_price, p.price
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE p.name = 'Mug';   -- unit_price القديم، price الجديد`
        },
        {
          cmd: "one-to-one",
          title: "بيانات إضافية لصف واحد في جدول تاني",
          desc: R`كل صف في جدول يقابله صف واحد بالكتير في جدول تاني: يوزر وبروفايل، أو أوردر وشحنة. بتتعمل بـ foreign key عليه [[UNIQUE]]، أو أنضف: الـ primary key للجدول التاني هو نفسه الـ foreign key.

وده بالظبط شكل Supabase: [[auth.users]] جدول بتاع Supabase مش بتاعك، فبتعمل [[public.profiles]] والـ id بتاعه هو id اليوزر.`,
          example: R`CREATE TABLE profiles (
  user_id    uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  avatar_url text,
  bio        text
);
CREATE TABLE shipments (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id bigint NOT NULL UNIQUE REFERENCES orders (id),
  tracking text
);`,
          try: R`ضيف بروفايل ليوزر، وبعدين حاول تضيف بروفايل تاني لنفس اليوزر. وشيل [[UNIQUE]] من shipments وشوف إن الأوردر بقى ينفع يبقى ليه شحنتين: العلاقة بقت one-to-many من غير ما تاخد بالك.`,
          flag: "script",
          deep: {
            why: "مش كل معلومة مكانها الجدول الأساسي. البروفايل اختياري وليه صلاحيات مختلفة (عام، والإيميل خاص)، والشحنة مش موجودة لحد ما الأوردر يتشحن. الفصل بيخلي الجدول الأساسي نضيف، من غير عشرين عمود NULL.",
            how: R`اللي بيخلي العلاقة one-to-one هو الـ UNIQUE على عمود الـ FK (أو إنه primary key). من غيره هي one-to-many عادي.

أسباب منطقية للفصل: الداتا اختيارية، أو صلاحيات مختلفة (في Supabase: RLS على profiles تسمح للكل يقرا، و auth.users محدش يلمسه)، أو أعمدة تقيلة بتتقري نادرًا، أو الجدول الأصلي مش ملكك.

لو مفيش سبب من دول، ضيف الأعمدة في نفس الجدول؛ الفصل من غير سبب معناه JOIN زيادة في كل استعلام.

وفي Supabase النمط المشهور: trigger على [[auth.users]] بعد الـ INSERT بيعمل صف في profiles أوتوماتيك، بـ function نوعها [[security definer]].`,
            when: "بيانات اختيارية، أو بصلاحيات مختلفة، أو مربوطة بجدول مش بتاعك (auth.users).",
            mistakes: R`تنسى UNIQUE فيبقى ليوزر بروفايلين. تقسم جدول من غير سبب. وبروفايل Supabase من غير [[ON DELETE CASCADE]]، فمسح اليوزر من لوحة Auth يفشل أو يسيب بروفايل يتيم.`
          },
          lines: [
            "جدول البروفايلات.",
            "الـ primary key هو نفسه FK لليوزر: بروفايل واحد بالكتير لكل يوزر.",
            "صورة اختيارية.",
            "نبذة اختيارية.",
            "قفلة.",
            "جدول الشحنات.",
            "id خاص بيه.",
            "FK للأوردر وعليه UNIQUE: شحنة واحدة لكل أوردر.",
            "رقم التتبع.",
            "قفلة."
          ],
          sol: R`البروفايل التاني لنفس اليوزر هيترفض بـ [[duplicate key value violates unique constraint "profiles_pkey"]]، لأن user_id هو الـ PRIMARY KEY نفسه، فمينفعش يتكرر: يوزر واحد، بروفايل واحد.

في shipments: الشحنة التانية لنفس الأوردر هتترفض بـ [[shipments_order_id_key]]. بعد ما تشيل الـ UNIQUE ([[ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;]]) هتتقبل، و [[SELECT order_id, count(*) FROM shipments GROUP BY 1]] هيطلّع 2. محدش هيحذرك: العلاقة بقت one-to-many، والكود اللي بيقرا «الشحنة» بـ [[LIMIT 1]] هيجيب واحدة عشوائي.

بعد التجربة امسح الشحنات ([[DELETE FROM shipments;]]) ورجّع الـ UNIQUE، لأن FK الشحنات مفيهوش ON DELETE، فدرس ON DELETE هيفشل وهو بيمسح الأوردر لو سبت شحنة عليه.`,
          solCode: R`INSERT INTO profiles (user_id, bio) SELECT id, 'hi' FROM users WHERE email = 'you@example.com';
INSERT INTO profiles (user_id, bio) SELECT id, 'again' FROM users WHERE email = 'you@example.com';
-- ERROR:  duplicate key value violates unique constraint "profiles_pkey"
ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK1'), (1, 'TRK2');   -- اتقبلت
DELETE FROM shipments;
ALTER TABLE shipments ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);`
        },
        {
          cmd: "ON DELETE",
          title: "لما الصف الأب يتمسح، الصفوف المرتبطة بيه يحصلها إيه",
          desc: R`الـ foreign key لازم يعرف يعمل إيه لو الصف اللي بيشاور عليه اتمسح: [[NO ACTION]] أو [[RESTRICT]]: ارفض المسح طول ما فيه صفوف مرتبطة (ده الافتراضي). [[CASCADE]]: امسح المرتبطين معاه. [[SET NULL]]: سيبهم واشطب الربط.

الاختيار قرار business مش تقني: مسح أوردر يمسح بنوده (CASCADE)، بس مسح منتج مينفعش يمسح أوردرات قديمة اتباع فيها (RESTRICT).`,
          example: R`DELETE FROM products WHERE name = 'Mug';        -- error: still referenced from table "order_items"
DELETE FROM orders WHERE id = 1;                -- بنوده اتمسحت معاه (CASCADE)
SELECT count(*) FROM order_items WHERE order_id = 1;   -- 0
ALTER TABLE orders DROP CONSTRAINT orders_user_fk;
ALTER TABLE orders ADD CONSTRAINT orders_user_fk
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT;`,
          try: R`اعمل جدول تجربة فيه FK بـ [[ON DELETE SET NULL]] على عمود [[NOT NULL]]، وامسح الأب: هتاخد error، لأن SET NULL محتاج العمود يقبل NULL.`,
          flag: "script danger",
          deep: {
            why: "لو محددتش، هتكتشف السلوك وقت ما حاجة تتمسح على الإنتاج: يا المسح يفشل والأدمن يتضايق، يا (وده أسوأ) مسح يوزر يمسح معاه سجل مالي كامل.",
            how: R`[[NO ACTION]] هو الافتراضي في Postgres: بيرفض المسح، بس الفحص ممكن يتأجل لآخر الـ transaction لو الـ constraint [[DEFERRABLE]]. [[RESTRICT]] بيرفض فورًا. عمليًا الاتنين «ممنوع».

[[CASCADE]] بيتسلسل: مسح يوزر ← أوردراته ← بنودها. مريح، بس DELETE واحد ممكن يمسح آلاف الصفوف من غير ما يقولك.

[[SET NULL]] بيحط NULL في عمود الـ FK، فلازم العمود يقبل NULL. و [[SET DEFAULT]] بيحط القيمة الافتراضية.

في Prisma بتكتبها [[onDelete: Cascade]] جوه [[@relation]]. ولو مكتبتهاش: العلاقة الإجبارية [[Restrict]] والاختيارية [[SetNull]].`,
            when: R`CASCADE للحاجات اللي ملهاش معنى من غير أبوها: بنود الأوردر، و sessions اليوزر، والبروفايل. RESTRICT للمراجع التاريخية والمالية: الأوردر ← المنتج، والأوردر ← اليوزر. SET NULL للربط الاختياري: [[orders.coupon_id]] لو الكوبون اتمسح.`,
            mistakes: R`CASCADE من users لـ orders، فمسح حساب يمسح تاريخ مبيعات لازم للحسابات؛ الأحسن soft delete أو إخفاء بيانات اليوزر (anonymize). SET NULL على عمود NOT NULL. وتمسح الولاد من الكود بدل الـ FK، فأي مسار نسي يمسحهم يسيب صفوف يتيمة.`
          },
          lines: [
            "منتج ليه بنود في أوردرات: الـ FK بيمنع مسحه.",
            "مسح أوردر: البنود اتمسحت معاه لأن FK بتاعها CASCADE.",
            "اتأكد: مفيش بنود للأوردر ده.",
            "عشان تغيّر السلوك: شيل الـ FK القديم،",
            "وارجع ضيفه بالسلوك اللي عايزه:",
            "مسح يوزر ليه أوردرات ممنوع صراحةً."
          ],
          sol: R`الـ CREATE TABLE هيعدّي عادي (Postgres مش بيعترض على التركيبة وقت التعريف)، والمشكلة تظهر وقت المسح: [[ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint]]، و الـ CONTEXT بيوريك إن Postgres كان بينفذ [[UPDATE ONLY "public"."t_child" SET "parent_id" = NULL ...]] من وراك. المسح كله اترفض، والأب لسه موجود.

الحل يا تشيل [[NOT NULL]] من العمود لو فعلًا الابن ينفع يعيش من غير أب، يا تختار [[CASCADE]] أو [[RESTRICT]]. الخلاصة: SET NULL وعده إنه هيكتب NULL، فالعمود لازم يقبلها.`,
          solCode: R`CREATE TABLE t_parent (id int PRIMARY KEY);
CREATE TABLE t_child (
  id int PRIMARY KEY,
  parent_id int NOT NULL REFERENCES t_parent (id) ON DELETE SET NULL
);
INSERT INTO t_parent VALUES (1);
INSERT INTO t_child VALUES (10, 1);
DELETE FROM t_parent WHERE id = 1;
-- ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint
ALTER TABLE t_child ALTER COLUMN parent_id DROP NOT NULL;
DELETE FROM t_parent WHERE id = 1;   -- DELETE 1، و parent_id بقى NULL
DROP TABLE t_child, t_parent;`
        }
      ]
    },
    {
      t: "JOIN والاستعلامات المركبة",
      l: 2,
      n: "الداتا متقسمة على جداول، و JOIN بيرجّعها صف واحد تقراه. والـ subquery والـ CTE بيخلوا السؤال الصعب خطوات",
      items: [
        {
          cmd: "INNER JOIN",
          title: "هات الأوردر ومعاه إيميل صاحبه ومنتجاته",
          desc: R`[[JOIN ... ON]] بيحط صفوف جدولين جنب بعض لما شرط الربط يتحقق، غالبًا foreign key = primary key. [[INNER JOIN]] (أو [[JOIN]] بس) بيرجّع الصفوف اللي ليها مقابل في الناحيتين بس.

وتقدر تربط أكتر من جدولين في نفس الاستعلام: أوردر ← بنوده ← المنتجات، ودي الفاتورة.`,
          example: R`SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid';
SELECT o.id AS order_id, p.name, oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.id = 2;`,
          try: R`اعمل أوردر جديد وضيفله بندين، وجرّب الاستعلام التاني عليه. وبعدين بدّل أول [[JOIN ... ON ...]] بـ [[CROSS JOIN users u]] من غير ON، وشوف عدد الصفوف بقى كام. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بنود الأوردر رقم 6: اسم المنتج، والكمية، وسعر الوحدة، و [[line_total]] (الكمية × السعر).`,
          flag: "script",
          deep: {
            why: "الـ normalization قسّم الداتا على جداول عشان كل معلومة تتكتب مرة. JOIN هو اللي بيجمّعها تاني وقت العرض: شاشة الأوردر محتاجة إيميل اليوزر وأسماء المنتجات، وكلهم في جداول مختلفة.",
            how: R`فكرة JOIN: كل صف من الشمال مع كل صف من اليمين، وخلّي اللي الـ ON عليه true بس. عمليًا Postgres مش بيعمل كل التوافيق؛ بيختار طريقة من تلاتة:

- [[Nested Loop]]: لكل صف من الناحية الصغيرة يدوّر في التانية بالـ index. ممتاز لما النتيجة صغيرة.
- [[Hash Join]]: يعمل hash table من الجدول الأصغر ويعدّي على الأكبر. ممتاز للجداول الكبيرة من غير index مناسب.
- [[Merge Join]]: الاتنين مترتبين على عمود الربط، فيمشي فيهم مع بعض.

الـ index على عمود الـ FK هو اللي بيخلي الـ JOIN سريع. والخطة بتقراها بـ EXPLAIN، والتفاصيل في تاب PostgreSQL.

وخد بالك من «التكاثر»: أوردر فيه ٣ بنود، JOIN مع order_items بيطلّعه ٣ صفوف. فلو عملت [[sum(o.total)]] بعد الـ JOIN هتحسب إجمالي الأوردر ٣ مرات.`,
            when: "لما البيانات اللي هتعرضها في أكتر من جدول، والعلاقة لازم تبقى موجودة (أوردر من غير يوزر المفروض ميحصلش).",
            mistakes: R`تنسى ON فيبقى CROSS JOIN بملايين الصفوف. [[column reference "id" is ambiguous]] لأنك مكتبتش [[o.id]]. تجمع عمود من الجدول الأب بعد JOIN مع الولاد فالرقم يتضاعف. و JOIN على الإيميل النصي بدل الـ id.`
          },
          lines: [
            "رقم الأوردر وإجماليه وإيميل صاحبه،",
            "من الأوردرات، واسمها المختصر o،",
            "مع اليوزر اللي id بتاعه = user_id بتاع الأوردر،",
            "للمدفوع بس.",
            "الفاتورة: رقم الأوردر واسم المنتج والكمية والسعر،",
            "وإجمالي السطر محسوب.",
            "من الأوردرات،",
            "مع بنود كل أوردر،",
            "ومع المنتج بتاع كل بند،",
            "لأوردر واحد."
          ],
          sol: R`اعمل الأوردر بـ [[RETURNING id]] عشان تعرف رقمه (مش هيبقى ٢ ولا ٣ غالبًا، لأن محاولات فاشلة قبل كده حجزت أرقام)، وحط الرقم ده بدل [[o.id = 2]]. هتاخد صفين: اسم كل منتج وكميته وسعره و line_total. لو الاستعلام رجّع [[0 rows]]، يبقى الـ id غلط أو البنود اتضافت لأوردر تاني.

الـ [[CROSS JOIN users u]] من غير ON بيربط كل أوردر بكل يوزر: عدد الصفوف = عدد الأوردرات × عدد اليوزرز. لو عندك يوزر واحد مش هتلاحظ فرق، فضيف يوزر تاني: أوردرين × يوزرين = ٤ صفوف، ونص الإيميلات غلط. ده نفس اللي بيحصل لما تنسى شرط الـ join، والرقم بيتضاعف في التقارير من غير error.`,
          solCode: R`WITH o AS (
  INSERT INTO orders (user_id) SELECT id FROM users WHERE email = 'you@example.com' RETURNING id
)
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1, p.price FROM o, products p WHERE p.name IN ('Mug', 'Hoodie')
RETURNING order_id;
SELECT count(*) FROM orders o CROSS JOIN users u;   -- orders × users`,
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
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`SELECT p.name, oi.quantity, oi.unit_price, oi.quantity * oi.unit_price AS line_total
FROM order_items oi
CROSS JOIN products p
WHERE oi.order_id = 6;`,
            expect: [["Mug",2,120,240], ["Hoodie",1,650,650], ["Cap",1,180,180]],
            solution: R`SELECT p.name, oi.quantity, oi.unit_price, oi.quantity * oi.unit_price AS line_total
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 6;`
          }
        },
        {
          cmd: "LEFT JOIN",
          title: "هات كل اليوزرز، حتى اللي معملوش أوردرات",
          desc: R`[[LEFT JOIN]] بيرجّع كل صفوف الجدول الشمال، واللي ملوش مقابل في اليمين بياخد NULL في أعمدة اليمين. ده اللي تستخدمه لما المقابل ممكن ميكونش موجود: يوزر من غير أوردرات، منتج عمره ما اتباع.

وبـ [[WHERE right.id IS NULL]] تجيب اللي ملهمش مقابل خالص.`,
          example: R`SELECT u.email, count(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id
ORDER BY orders DESC;
SELECT p.name FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.product_id IS NULL;
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id AND o.status = 'paid';`,
          try: R`ضيف يوزر جديد من غير أوردرات. في أول استعلام غيّر [[count(o.id)]] لـ [[count(*)]]: هتلاقي اليوزر الجديد بقى عنده «1». وفي آخر استعلام انقل شرط status من ON لـ WHERE: اليوزر الجديد هيختفي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: كل اليوزرز بالإيميل وعدد أوردراتهم، حتى اللي ملوش أوردرات (لازم يطلع 0 مش 1).`,
          flag: "script",
          deep: {
            why: "تقارير كتير عن «اللي ملوش»: يوزرز سجلوا ومشتروش، منتجات عمرها ما اتباعت، كورسات محدش اشترك فيها. INNER JOIN بيخفي الصفوف دي خالص، و LEFT JOIN بيظهرها.",
            how: R`LEFT JOIN بيعمل نفس INNER JOIN، وبعدين يضيف كل صف من الشمال ملقاش مقابل، وأعمدة اليمين فيه NULL.

عشان كده [[count(o.id)]] مش [[count(*)]]: اليوزر اللي من غير أوردرات ليه صف واحد فيه o.id = NULL، فـ count(*) بتعده 1، و count(o.id) بتعده 0.

الفخ المشهور: شرط على جدول اليمين في WHERE ([[WHERE o.status = 'paid']]) بيرمي كل الصفوف اللي o.status فيها NULL، يعني بيرمي كل اللي ملهمش مقابل، فالـ LEFT JOIN يبقى INNER من غير ما تاخد بالك. شرط اليمين مكانه في ON.

[[RIGHT JOIN]] نفس الفكرة من الناحية التانية (نادرًا ما حد بيستخدمه؛ اعكس الجداول وخلاص). و [[FULL OUTER JOIN]] بيرجّع الناحيتين.

و [[GROUP BY u.id]] بيسمحلك تعرض u.email لأن id هو الـ primary key.`,
            when: "لما المقابل اختياري، أو لما عايز اللي ملوش مقابل (anti-join؛ أو NOT EXISTS في الدرس الجاي).",
            mistakes: R`[[count(*)]] مع LEFT JOIN. شرط اليمين في WHERE. و LEFT JOIN في كل حتة «احتياطي»، فبيخبي bugs في الداتا (أوردر من غير يوزر المفروض يبقى مستحيل، مش يظهر بـ NULL).`
          },
          lines: [
            "كل يوزر وعدد أوردراته (count على عمود من اليمين)،",
            "من اليوزرز،",
            "مع أوردراتهم لو موجودة،",
            "مجمّعين باليوزر،",
            "والأكتر الأول.",
            "المنتجات،",
            "مع بنودها لو موجودة،",
            "واللي ملهاش بنود خالص: عمره ما اتباع.",
            "كل اليوزرز، ومعاهم أوردراتهم المدفوعة بس:",
            "شرط اليمين في ON عشان اليوزرز التانيين ميختفوش."
          ],
          sol: R`مع [[count(o.id)]] اليوزر الجديد عنده [[0]]. مع [[count(*)]] بقى عنده [[1]]، لأن LEFT JOIN رجّع له صف واحد فيه أعمدة الأوردر كلها NULL، و [[count(*)]] بيعدّ الصفوف، أما [[count(o.id)]] بيعدّ القيم اللي مش NULL.

في آخر استعلام، والشرط في ON: اليوزر الجديد ظاهر وجنبه id فاضي. لما تنقل [[o.status = 'paid']] لـ WHERE هيختفي، لأن WHERE بيتنفذ بعد الـ join، و [[NULL = 'paid']] مش true، فالـ LEFT JOIN اتحول فعليًا لـ INNER JOIN. (ولو مفيش ولا أوردر paid خالص، الاستعلام هيرجّع صفر صفوف.) القاعدة: الشروط على الجدول اليمين في LEFT JOIN مكانها ON.`,
          solCode: R`INSERT INTO users (email, name) VALUES ('new@example.com', 'New');
SELECT u.email, count(*) AS orders
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;                                            -- new@example.com = 1 (غلط)
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid';                                  -- new@example.com اختفى`,
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
            starter: R`SELECT u.email, count(*) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`,
            expect: [["omar@gmail.com",0], ["ali@shop.eg",2], ["mona@example.com",2], ["sara@example.com",4]],
            solution: R`SELECT u.email, count(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`
          }
        },
        {
          cmd: "EXISTS",
          title: "استعلام جوه استعلام: فيه ولا مفيش",
          desc: R`الـ subquery استعلام جوه استعلام. أشهر شكلين: [[IN (SELECT ...)]] و [[EXISTS (SELECT ...)]]. EXISTS بيسأل «فيه ولو صف واحد بيحقق الشرط؟» وبيقف عند أول صف، فمناسب لأسئلة زي «اليوزرز اللي اشتروا المنتج ده».

و [[NOT EXISTS]] أأمن من [[NOT IN]]: لو الـ subquery رجّعت NULL واحدة، NOT IN بترجّع صفر صفوف.`,
          example: R`SELECT email FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.user_id = u.id AND oi.product_id = 4
);
SELECT email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
SELECT name, price FROM products
WHERE price > (SELECT avg(price) FROM products);`,
          try: R`جرّب [[SELECT 1 WHERE 3 NOT IN (1, 2, NULL)]]: مش هترجع حاجة. وبعدين [[SELECT 1 WHERE 3 NOT IN (1, 2)]]: هترجع. NULL واحدة بوّظت الشرط كله. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: إيميلات اليوزرز اللي معملوش ولا أوردر. خلي بالك: فيه أوردر ضيف [[user_id]] بتاعه NULL.`,
          flag: "script",
          deep: {
            why: "«مين اشترى X» بـ JOIN بيرجّع اليوزر مرة لكل أوردر فيه X، فتضطر تحط DISTINCT. EXISTS بيرجّع كل يوزر مرة واحدة ومش بيكمّل بعد أول تطابق.",
            how: R`الـ subquery في أول مثال «correlated»: بتستخدم [[u.id]] من الاستعلام الخارجي. نظريًا بتتنفذ لكل يوزر، بس Postgres ذكي: بيحوّل EXISTS و IN لـ semi-join، و NOT EXISTS لـ anti-join، فالأداء غالبًا زي JOIN.

[[SELECT 1]] عادة وبس؛ EXISTS مش بيبص على الأعمدة، بيبص «فيه صف ولا لأ».

فخ NOT IN: [[x NOT IN (1, NULL)]] معناها [[x <> 1 AND x <> NULL]]، والتانية UNKNOWN، فالشرط كله عمره ما يبقى true. لو العمود في الـ subquery ممكن يبقى NULL، NOT IN هترجع فاضي من غير error. NOT EXISTS مفيهاش المشكلة دي.

آخر مثال scalar subquery: بترجّع قيمة واحدة (صف واحد وعمود واحد) وتتقارن بيها. لو رجّعت أكتر من صف: [[more than one row returned by a subquery used as an expression]].`,
            when: "أسئلة «فيه/مفيش» (اشترى/مشتراش، عنده/معندوش). وقيمة واحدة محسوبة تقارن بيها.",
            mistakes: R`JOIN + DISTINCT بدل EXISTS. NOT IN على عمود ممكن يبقى NULL. و scalar subquery بترجع أكتر من صف.`
          },
          lines: [
            "اليوزرز،",
            "اللي فيه على الأقل صف واحد من ده:",
            "أوردر،",
            "فيه بنود،",
            "بتاع اليوزر ده، وفيه المنتج رقم 4.",
            "قفلة الـ subquery.",
            "اليوزرز،",
            "اللي ملهمش ولا أوردر (anti-join).",
            "المنتجات،",
            "اللي سعرها أعلى من متوسط الأسعار (subquery بترجّع رقم واحد)."
          ],
          sol: R`الأول هيرجّع [[(0 rows)]] والتاني هيرجّع [[1]]. [[3 NOT IN (1, 2, NULL)]] معناها [[3 <> 1 AND 3 <> 2 AND 3 <> NULL]]، والأخيرة NULL، و [[true AND NULL]] = NULL، فالشرط مش true. جرّب [[SELECT 3 NOT IN (1, 2, NULL);]] وهتلاقي خانة فاضية (NULL) مش false.

في الحقيقة ده بيحصل لما تكتب [[WHERE id NOT IN (SELECT user_id FROM ...)]] والـ subquery فيها صف واحد user_id بتاعه NULL: الاستعلام يرجّع فاضي فجأة من غير أي error. عشان كده استخدم [[NOT EXISTS]] دايمًا بدل [[NOT IN]] مع subquery، وده سؤال انترفيو مشهور.`,
          solCode: R`SELECT 1 WHERE 3 NOT IN (1, 2, NULL);   -- 0 rows
SELECT 1 WHERE 3 NOT IN (1, 2);         -- 1
SELECT 3 NOT IN (1, 2, NULL);           -- NULL`,
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
INSERT INTO orders VALUES (9, NULL, 'paid', 75.00, '2026-09-15 10:00+00');`,
            starter: R`SELECT email FROM users
WHERE id NOT IN (SELECT user_id FROM orders);`,
            expect: [["omar@gmail.com"]],
            solution: R`SELECT email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`
          }
        },
        {
          cmd: "WITH (CTE)",
          title: "قسّم الاستعلام الطويل لخطوات ليها أسماء",
          desc: R`[[WITH name AS (SELECT ...)]] بيعرّف نتيجة مؤقتة ليها اسم، وتستخدمها في الاستعلام اللي بعدها كأنها جدول. ده اسمه CTE، وفايدته الأساسية القراية: بدل subquery جوه subquery، تكتب خطوات من فوق لتحت.

وينفع تعمل أكتر من CTE ورا بعض، وكل واحدة تستخدم اللي قبلها.`,
          example: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
),
vip AS (
  SELECT user_id FROM paid WHERE spent >= 1000
)
SELECT u.email, p.spent
FROM vip v
JOIN users u ON u.id = v.user_id
JOIN paid p ON p.user_id = v.user_id
ORDER BY p.spent DESC;`,
          try: R`اكتب نفس الاستعلام من غير WITH، بـ subqueries جوه بعض، وقارن أنهي أسهل في القراية. وبعدين حط [[EXPLAIN]] قدام الاتنين: في نسخة WITH هتلاقي [[CTE paid]] و [[CTE Scan]]، لأن paid متستخدمة مرتين فـ Postgres بيحسبها مرة ويحفظها، ونسخة الـ subqueries بتحسبها مرتين. وبعدين اكتب [[paid AS NOT MATERIALIZED (...)]] وشوف الخطة بقت زي الـ subqueries. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بـ WITH: إيميل كل يوزر ومجموع اللي دفعه ([[paid]])، لليوزرز اللي دفعوا أكتر من متوسط الدفع بين اليوزرز اللي دفعوا.`,
          flag: "script",
          deep: {
            why: "التقارير الحقيقية فيها ٣ و ٤ خطوات: احسب كذا، وفلتر، واربط، ورتّب. متداخلة جوه بعض بتبقى صعبة تتقري أو تتصلح. الـ CTE بيدّي كل خطوة اسم تفهمه.",
            how: R`الـ CTE موجودة جوه الأمر ده بس؛ مش جدول بيتحفظ.

من Postgres 12، الـ CTE اللي بتتستخدم مرة واحدة ومفيهاش تعديل بيانات بتتدمج في الاستعلام الأساسي (inline)، فالـ planner بيشوف من خلالها ويحسّن زي أي subquery. قبل 12 كانت دايمًا بتتحسب لوحدها الأول (optimization fence)، وده سبب نصايح قديمة إنها «بطيئة». وتقدر تتحكم بـ [[AS MATERIALIZED]] و [[AS NOT MATERIALIZED]].

وفيه نوعين مهمين:
- [[WITH RECURSIVE]] للشجر: تصنيفات جواها تصنيفات، أو ردود على تعليقات.
- CTE بتعدّل بيانات: [[WITH o AS (INSERT INTO orders ... RETURNING id) INSERT INTO order_items SELECT o.id, ... FROM o]]. الاتنين أمر واحد، فيا ينجحوا مع بعض يا لأ.`,
            when: "أي استعلام فيه أكتر من خطوة منطقية، أو محتاج نفس النتيجة الوسيطة مرتين.",
            mistakes: R`تفتكر الـ CTE متخزنة وتستخدمها في أمر تاني. نصايح أداء قديمة من قبل Postgres 12. وسلسلة CTEs طويلة بتتكرر في كل مكان، ومكانها view.`
          },
          lines: [
            "خطوة ١ اسمها paid:",
            "مجموع اللي صرفه كل يوزر،",
            "من الأوردرات المدفوعة،",
            "مجمّعة باليوزر.",
            "قفلة الخطوة الأولى.",
            "خطوة ٢ اسمها vip:",
            "اليوزرز اللي صرفوا ١٠٠٠ أو أكتر، من نتيجة الخطوة الأولى.",
            "قفلة.",
            "الاستعلام الأساسي: الإيميل والمبلغ،",
            "من الـ vip،",
            "مع جدول اليوزرز عشان الإيميل،",
            "ومع paid عشان المبلغ،",
            "والأكتر صرفًا الأول."
          ],
          sol: R`النسخة من غير WITH لازم تكرر حسبة paid مرتين (مرة للفلترة ومرة للـ spent)، وده بيخليها أطول وأصعب في التعديل. في EXPLAIN بتاع نسخة WITH هتلاقي [[CTE paid]] فيها [[Seq Scan on orders]] مرة واحدة، وتحتها سطرين [[CTE Scan on paid]]. في نسخة الـ subqueries هتلاقي [[Seq Scan on orders]] و [[Seq Scan on orders orders_1]]: الجدول اتقري مرتين.

مع [[NOT MATERIALIZED]] الخطة بقت نفس خطة الـ subqueries بالظبط (سطرين Seq Scan ومفيش CTE Scan). ومن Postgres 12 الـ CTE اللي بتتستخدم مرة واحدة بس بتتدمج تلقائي، فـ MATERIALIZED بيفرق بس لما الـ CTE بتتقري أكتر من مرة. الاستعلام نفسه هيرجّع صفر صفوف غالبًا، لأن مفيش حد صرف ١٠٠٠؛ ده طبيعي.`,
          solCode: R`EXPLAIN SELECT u.email, p.spent
FROM (SELECT user_id
      FROM (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) x
      WHERE spent >= 1000) v
JOIN users u ON u.id = v.user_id
JOIN (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) p
  ON p.user_id = v.user_id
ORDER BY p.spent DESC;`,
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
            starter: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
)
SELECT u.email, p.spent
FROM paid p
JOIN users u ON u.id = p.user_id;`,
            expect: [["sara@example.com",1410], ["ali@shop.eg",1200]],
            solution: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
),
avg_spent AS (
  SELECT avg(spent) AS value FROM paid
)
SELECT u.email, p.spent
FROM paid p
JOIN users u ON u.id = p.user_id
WHERE p.spent > (SELECT value FROM avg_spent);`
          }
        }
      ]
    },
    {
      t: "التصميم: constraints و normalization",
      l: 2,
      n: "تصميم الجداول بيحدد الداتا هتفضل سليمة بعد سنة ولا لأ: كل معلومة في مكان واحد، والقاعدة ترفض الغلط بنفسها",
      items: [
        {
          cmd: "constraints",
          title: "خلّي القاعدة ترفض الداتا الغلط بنفسها",
          desc: R`الـ constraints قواعد جوه القاعدة نفسها: [[NOT NULL]] (لازم قيمة)، و [[UNIQUE]] (مفيش تكرار)، و [[CHECK]] (شرط زي [[price >= 0]])، و [[FOREIGN KEY]]. أي INSERT أو UPDATE بيكسرها بيترفض، مهما كان جاي منين.

الـ validation في الكود (Zod مثلًا) بيدّي اليوزر رسالة حلوة، بس الـ constraint هو الضمان: سكربت، أو أدمن بإيده، أو bug، أو طلبين في نفس اللحظة، كلهم هيتمسكوا.`,
          example: R`ALTER TABLE products ADD CONSTRAINT price_positive CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT stock_not_negative CHECK (stock >= 0);
ALTER TABLE orders ADD CONSTRAINT status_valid
  CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled', 'refunded'));
CREATE UNIQUE INDEX users_email_lower_uq ON users (lower(email));
UPDATE products SET stock = stock - 100 WHERE name = 'Hoodie';   -- error: violates check constraint`,
          try: R`ضيف يوزر إيميله [[YOU@example.com]] بحروف كبيرة: الـ index على [[lower(email)]] هيرفضه لأنه نفس الإيميل. وبعدين جرّب [[status = 'shiped']] بالغلط.`,
          flag: "script",
          deep: {
            why: "الكود بيتغير، وبيتكتب منه أكتر من نسخة (API، ولوحة أدمن، وسكربت migration، و cron). لو القاعدة الوحيدة في الكود، أول مسار ينساها بيدخّل داتا غلط، وبعد كده كل الكود لازم يتعامل مع الداتا الغلط دي للأبد.",
            how: R`[[UNIQUE]] بيعمل unique index. ولو على تعبير زي [[lower(email)]]، بيمنع [[Ali@x.com]] و [[ali@x.com]] يبقوا يوزرين.

الـ partial unique index بيطبّق التفرد على جزء من الصفوف بس: [[CREATE UNIQUE INDEX ... ON products (sku) WHERE deleted_at IS NULL]] يعني الـ sku فريد بين المنتجات اللي مش ممسوحة، فالممسوح ميمنعش إعادة استخدامه.

UNIQUE بيسمح بكذا NULL، إلا لو كتبت [[NULLS NOT DISTINCT]] (من Postgres 15).

[[CHECK]] بيشوف الصف نفسه بس؛ ميقدرش يبص على صفوف تانية أو جداول تانية (ده شغل FK أو trigger).

والقيم المحددة (زي الحالة) ليها ٣ حلول: CHECK IN (الأسهل في التعديل)، أو enum type في Postgres، أو جدول lookup بـ FK.

وإضافة constraint على جدول كبير موجود بتقرا الجدول كله وهي قافلاه. على الإنتاج: [[NOT VALID]] وبعدين [[VALIDATE CONSTRAINT]]، والتفاصيل في تاب PostgreSQL درس «تغييرات آمنة في الإنتاج».`,
            when: "مع أي قاعدة business ثابتة: السعر مش سالب، والمخزون مش سالب، والحالة من لستة معروفة، والإيميل مايتكررش.",
            mistakes: R`الاعتماد على الـ frontend أو Zod بس. UNIQUE على الإيميل حساس للحروف. ومسك الـ error ورجّعه 500 بدل 409: Postgres بيرجّع code [[23505]] للـ unique، و Prisma بيحوّله [[P2002]]. وفي مشروع حقيقي كان فيه مسار بيخصم المخزون من غير ما يشيك إنه يكفي، فالمخزون ممكن يبقى بالسالب؛ [[CHECK (stock >= 0)]] كان هيحوّل الغلط الصامت ده لـ error واضح.`
          },
          lines: [
            "السعر عمره ما يبقى سالب.",
            "المخزون عمره ما يبقى سالب.",
            "الحالة لازم تبقى واحدة من اللستة دي:",
            "القيم المسموحة.",
            "إيميل فريد من غير ما يفرق حروف كبيرة وصغيرة.",
            "خصم أكتر من المخزون: القاعدة رفضت."
          ],
          sol: R`[[YOU@example.com]] هيترفض: [[duplicate key value violates unique constraint "users_email_lower_uq"]] و [[Key (lower(email))=(you@example.com) already exists.]]. الـ UNIQUE العادي على email كان هيقبله، لأنه نص مختلف حرفيًا. وخلي بالك إن الـ index ده بيخدم بس الاستعلامات اللي فيها [[lower(email)]] بالظبط، فالـ login لازم يدوّر بـ [[WHERE lower(email) = lower($1)]].

[[status = 'shiped']] (سواء UPDATE أو INSERT) هيترفض: [[new row for relation "orders" violates check constraint "status_valid"]]. من غير الـ CHECK كانت الكلمة الغلط هتتحفظ، والأوردر يختفي من أي تقرير بيدوّر على 'shipped'. لو الـ ALTER TABLE نفسه فشل، ده معناه إن فيه داتا قديمة بتكسر الشرط؛ صلّحها الأول.`,
          solCode: R`INSERT INTO users (email, name) VALUES ('YOU@example.com', 'Ali 2');
-- ERROR:  duplicate key value violates unique constraint "users_email_lower_uq"
UPDATE orders SET status = 'shiped' WHERE id = (SELECT min(id) FROM orders);
-- ERROR:  new row for relation "orders" violates check constraint "status_valid"`
        },
        {
          cmd: "normalization",
          title: "كل معلومة تتخزن في مكان واحد بس",
          desc: R`الـ normalization معناها تقسم الداتا لجداول بحيث كل معلومة تتكتب مرة واحدة. لو إيميل اليوزر مكتوب في كل أوردر وغيّر إيميله، هتعدّل ألف صف، ولو نسيت واحد الداتا تتناقض.

بالكلام البسيط: 1NF كل خانة فيها قيمة واحدة (مش لستة). 2NF كل عمود معتمد على الـ key كله مش جزء منه. 3NF مفيش عمود معتمد على عمود تاني غير الـ key. والخلاصة: كل عمود بيوصف الـ key، والـ key كله، ومفيش حاجة غير الـ key.`,
          example: R`CREATE TABLE orders_bad (
  id          bigint PRIMARY KEY,
  user_email  text,
  user_name   text,
  product_ids text,                     -- '1,5,9'
  price_egp numeric, price_usd numeric, price_sar numeric
);
CREATE TABLE product_prices (
  product_id bigint REFERENCES products (id),
  currency   char(3),
  price      numeric(10,2) NOT NULL,
  PRIMARY KEY (product_id, currency)
);`,
          try: R`خد أي شيت Excel في شغلك وطلّع منه الجداول: كل «حاجة» ليها جدول (يوزر، منتج، أوردر)، وكل عمود بيتكرر بنفس القيمة في صفوف كتير علامة إنه مكانه جدول تاني.`,
          flag: "script",
          deep: {
            why: "الداتا المتكررة بتتناقض: إيميل اليوزر في جدول users حاجة وفي الأوردرات حاجة تانية، فأنهي الصح؟ الـ normalization بيمنع التناقض من الأساس، لأن مفيش نسختين أصلًا.",
            how: R`الجدول الوحش فيه كل الأخطاء:

- [[product_ids]] بقيم زي [['1,5,9']] بيكسر 1NF: الخانة فيها لستة. الحل جدول order_items.
- [[price_egp]] و [[price_usd]] و [[price_sar]] «مجموعة متكررة» في أعمدة، وده برضه عكس 1NF. في مشروع حقيقي كان المنتج (وكذا جدول تاني) عليه عمود سعر لكل عملة؛ إضافة عملة جديدة معناها migration على كل الجداول دي وتعديل الكود في كل حتة. الحل جدول [[product_prices]]: صف لكل (منتج، عملة)، وعملة جديدة = صفوف جديدة من غير ما تلمس الـ schema.
- 2NF بتظهر مع المفاتيح المركبة: في order_items المفتاح [[(order_id, product_id)]]، فلو حطيت فيه [[product_name]] يبقى معتمد على product_id لوحده (جزء من المفتاح)، ومكانه products.
- [[user_email]] و [[user_name]] في الأوردر بيكسروا 3NF: معتمدين على اليوزر مش على الأوردر (معتمدين على user_id اللي معتمد على الأوردر). مكانهم users.

المشاكل اللي الـ normalization بيمنعها ليها أسماء: update anomaly (تعدّل في مكان وتنسى التاني)، و insert anomaly (مش عارف تضيف منتج من غير أوردر)، و delete anomaly (تمسح آخر أوردر ليوزر فتضيع بياناته).`,
            when: "الافتراضي لأي قاعدة تطبيق: ابدأ لحد 3NF، وبعدين كرر داتا عن قصد وبسبب واضح بس (الدرس الجاي).",
            mistakes: R`over-normalization: جدول للاسم الأول وجدول للاسم الأخير. لستة مفصولة بكومة في عمود. عمود لكل عملة أو لكل شهر. والخلط بين normalization في قواعد البيانات و «normalize» يعني توحيد شكل النص.`
          },
          lines: [
            "جدول أوردرات متصمم غلط.",
            "المفتاح.",
            "إيميل اليوزر متكرر في كل أوردر (بيكسر 3NF).",
            "واسمه كمان.",
            "لستة ids في خانة واحدة (بيكسر 1NF).",
            "عمود لكل عملة: إضافة عملة = تعديل الـ schema.",
            "قفلة.",
            "الحل للعملات: جدول فيه صف لكل منتج وعملة.",
            "المنتج.",
            "كود العملة (EGP، USD).",
            "السعر بالعملة دي.",
            "المفتاح المركب: سعر واحد لكل منتج في كل عملة.",
            "قفلة."
          ],
          sol: R`إجابة نموذجية على شيت مبيعات أعمدته: التاريخ، اسم العميل، تليفونه، عنوانه، المنتج، سعره، الكمية، المندوب. اسم العميل وتليفونه وعنوانه بيتكرروا في كل صف اشترى فيه، فدول جدول [[customers]]. المنتج وسعره بيتكرروا، فدول جدول منتجات. المندوب جدول لوحده. والعملية نفسها (مين اشترى امتى ومن أنهي مندوب) جدول، وبنودها (منتج وكمية وسعر وقت البيع) جدول تاني بـ PRIMARY KEY مركب.

علامات لازم تلاحظها: عمود فيه أكتر من قيمة ([[«تيشيرت، كاب»]]) يبقى محتاج جدول بنود؛ أعمدة مترقمة ([[تليفون1، تليفون2]]) نفس الحكاية؛ وقيمة لو اتغيرت لازم تعدلها في صفوف كتير (عنوان العميل) يبقى مكانها جدول تاني. والاستثناء: السعر يتنسخ في البند عن قصد، لأنه سعر لحظة البيع مش السعر الحالي. الكود ده اتجرّب على Postgres.`,
          solCode: R`CREATE TABLE customers (
  id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name    text NOT NULL,
  phone   text NOT NULL UNIQUE,
  address text
);
CREATE TABLE sales_reps (
  id   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL
);
CREATE TABLE items (
  id    bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name  text NOT NULL UNIQUE,
  price numeric(10,2) NOT NULL
);
CREATE TABLE sales (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers (id),
  rep_id      bigint REFERENCES sales_reps (id),
  sold_at     date NOT NULL
);
CREATE TABLE sale_items (
  sale_id    bigint REFERENCES sales (id) ON DELETE CASCADE,
  item_id    bigint REFERENCES items (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (sale_id, item_id)
);`
        },
        {
          cmd: "denormalization",
          title: "امتى تكرر الداتا عن قصد",
          desc: R`الـ denormalization إنك تكرر معلومة عن قصد، لسبب واضح: يا القيمة لازم تتجمد في لحظة معينة، يا قرايتها بقت غالية جدًا. أشهر مثال: [[order_items.unit_price]]. السعر موجود في products، بس بتنسخه وقت الشرا لأن الفاتورة القديمة مينفعش تتغير لما تغيّر السعر بكرة.

والمثال التاني: [[orders.total]] محفوظ رغم إنه ممكن يتحسب من البنود، عشان الليستات والتقارير متعملش JOIN و sum على كل صف. والتمن: لازم تضمن إن النسختين مايتناقضوش.`,
          example: R`UPDATE orders o SET total = s.sum
FROM (SELECT order_id, sum(quantity * unit_price) AS sum
      FROM order_items GROUP BY order_id) s
WHERE s.order_id = o.id;
SELECT o.id, o.total, sum(oi.quantity * oi.unit_price) AS real_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> sum(oi.quantity * oi.unit_price);`,
          try: R`ضيف بند لأوردر من غير ما تحدّث total، وشغّل الاستعلام التاني: هيطلّعلك الأوردر ده. ده «تقرير المراجعة» اللي المفروض يشتغل دوريًا على أي رقم متكرر.`,
          flag: "script",
          deep: {
            why: "الـ normalization الكامل ساعات بيدّي إجابة غلط (السعر الحالي بدل السعر اللي اتدفع)، وساعات بيبقى بطيء (مجموع مليون بند كل ما حد يفتح لوحة الأدمن). التكرار المقصود بيحل الاتنين، بشرط تعرف انت كررت إيه وليه.",
            how: R`فيه نوعين مختلفين:

١. snapshot (لقطة تاريخية): [[unit_price]]، وعنوان الشحن وقت الأوردر، واسم المنتج وقت الشرا. دي في الحقيقة مش تكرار؛ دي معلومة مختلفة: «السعر اللي اتدفع» مش «السعر الحالي». في مشروع حقيقي كان جدول الأوردرات بيحفظ عنوان العنصر وقت الشرا، وجدول تاني بيحفظ سعر القطعة «وقت الشرا» بتعليق واضح. ده الصح.

٢. cache (قيمة محسوبة): [[orders.total]]، وعدادات زي [[products.orders_count]]، ورصيد محفظة. دي لازم تفضل متزامنة مع الأصل: تتحدث في نفس الـ transaction اللي بتغيّر الأصل، أو بـ trigger، ومعاها تقرير مراجعة دوري زي المثال.

النمط المحترم للأرصدة: جدول قيود (ledger) هو الحقيقة، كل حركة صف (إضافة أو خصم)، والرصيد مجرد cache بيتحدث في نفس الـ transaction مع كل قيد. لو شكّيت في الرصيد، تعيد حسابه من القيود.

ولتقارير تقيلة بتتقري كتير: [[MATERIALIZED VIEW]] بتحفظ نتيجة استعلام وتعملها refresh كل فترة.`,
            when: "الـ snapshots دايمًا (أي حاجة في فاتورة أو أوردر). الـ caches بس بعد ما تقيس إن القراية بطيئة فعلًا.",
            mistakes: R`مسار بيضيف بند من غير ما يحدّث الـ total. عداد بيتحدث بـ «اقرا واكتب» فيضيع مع التزامن (درس atomic UPDATE). وتكرار «عشان السرعة» قبل ما تقيس أي حاجة.`
          },
          lines: [
            "حدّث total كل أوردر من بنوده:",
            "مجموع (الكمية × السعر) لكل أوردر،",
            "من جدول البنود مجمّع بالأوردر.",
            "واربط كل مجموع بأوردره.",
            "تقرير مراجعة: الإجمالي المحفوظ جنب الإجمالي الحقيقي،",
            "من الأوردرات مع بنودها،",
            "لكل أوردر،",
            "واعرض اللي الرقمين فيه مختلفين بس."
          ],
          sol: R`بعد ما تضيف بند لأوردر من غير ما تحدّث total، استعلام المراجعة هيطلّع صف زي [[2 | 0.00 | 170.00]]: الأوردر رقم كذا، الـ total المتخزن، والمجموع الحقيقي من البنود. قبل الإضافة كان بيرجّع [[0 rows]]، ودي الحالة السليمة.

الـ UPDATE الأول بيصلّح الفرق. خلي بالك إن الاستعلام ده بـ JOIN، فأوردر total بتاعه مش صفر ومفيش ولا بند مش هيظهر فيه؛ لو عايز تمسكه كمان استخدم LEFT JOIN و [[COALESCE(sum(...), 0)]]. والحل الدائم إن أي كود بيضيف بند يحدّث total في نفس الـ transaction (زي درس transaction)، أو trigger، أو إنك تبطل تخزّن total وتحسبه وقت القراية لو الأداء مسموح.`,
          solCode: R`INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT (SELECT max(id) FROM orders), id, 1, price FROM products WHERE name = 'Cap';
SELECT o.id, o.total, sum(oi.quantity * oi.unit_price) AS real_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> sum(oi.quantity * oi.unit_price);   -- الأوردر ده ظهر`
        },
        {
          cmd: "jsonb",
          title: "عمود مرن جوه جدول صارم",
          desc: R`[[jsonb]] بيخزن JSON جوه عمود، وتقدر تستعلم جواه وتعمله index. مناسب للداتا اللي شكلها بيختلف من صف لصف ومش بتعمل عليها JOIN: مواصفات منتج (لون، مقاس، خامة)، أو إعدادات، أو payload جاي من webhook.

القاعدة: اللي بتفلتر بيه أو بتربط بيه دايمًا، أو محتاج constraint، يبقى عمود عادي. و jsonb للتفاصيل المتغيرة بس.`,
          example: R`SELECT name, attrs->>'color' AS color FROM products;
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
SELECT name FROM products WHERE attrs->'sizes' ? 'L';
UPDATE products SET attrs = attrs || '{"material": "cotton"}' WHERE name = 'T-shirt';
CREATE INDEX products_attrs_gin ON products USING gin (attrs);`,
          try: R`جرّب [[attrs->'color']] و [[attrs->>'color']] وقارن: واحدة بترجّع JSON بعلامات تنصيص، والتانية نص عادي. وجرّب [[WHERE attrs->>'color' = 'black']] و [[WHERE attrs @> ...]] واعرف أنهي فيهم بيستخدم الـ GIN index بـ EXPLAIN.`,
          flag: "script",
          deep: {
            why: "تيشيرت ليه مقاس ولون، وكتاب ليه مؤلف وعدد صفحات، وكورس ليه مدة. عمود لكل صفة لكل نوع منتج يعمل جدول بمية عمود أغلبها NULL. jsonb بيحط الصفات المتغيرة دي في عمود واحد، وتفضل الأعمدة المهمة (الاسم والسعر والمخزون) أعمدة عادية بـ constraints.",
            how: R`[[->]] بيرجّع jsonb، و [[->>]] بيرجّع text. [[@>]] يعني «بيحتوي على» (containment). [[?]] يعني «الـ key أو العنصر ده موجود». [[||]] بيدمج (سطحي، المستوى الأول بس)، و [[jsonb_set]] لتعديل قيمة في مسار متداخل.

jsonb بيتخزن متحلّل (binary): الـ keys المتكررة بتتشال، والترتيب مش محفوظ، والقراية سريعة. json العادي بيحفظ النص زي ما هو وبيتحلّل مع كل قراية.

GIN index الافتراضي على jsonb بيخدم [[@>]] و [[?]] و [[?|]] و [[?&]]. ولو بتفلتر دايمًا بـ key واحد، B-tree على التعبير أصغر: [[CREATE INDEX ON products ((attrs->>'color'))]].

جوه jsonb مفيش FK ولا أنواع مضمونة؛ ممكن تحط CHECK زي [[jsonb_typeof(attrs->'sizes') = 'array']]. وتعديل أي حاجة جواه بيكتب القيمة كلها من جديد.

في Prisma النوع [[Json]]، وبتفلتر جواه بـ [[path]].`,
            when: "صفات متغيرة حسب النوع، وإعدادات، و payloads خارجية بتحفظها زي ما هي، و metadata بتتعرض بس.",
            mistakes: R`تحط كل حاجة في jsonb (MongoDB جوه Postgres)، فتخسر الـ constraints والـ JOINs. فلوس أو ids بتربط بيها جوه jsonb. و document jsonb كبير بيتعدّل كتير، وكل تعديل صغير بيعيد كتابته كله.`
          },
          lines: [
            "طلّع قيمة key كنص.",
            "المنتجات اللي JSON بتاعها فيه color = black (بيستخدم GIN index).",
            "المنتجات اللي لستة المقاسات فيها L.",
            "ضيف key جديد من غير ما تمسح الباقي.",
            "GIN index للاستعلام جوه الـ JSON."
          ],
          sol: R`[[attrs->'color']] بيرجّع [["black"]] بعلامات تنصيص ونوعه [[jsonb]]، و [[attrs->>'color']] بيرجّع [[black]] ونوعه [[text]] (اتأكد بـ [[pg_typeof]]). عشان كده المقارنة بنص عادي لازم تبقى بـ [[->>]].

في EXPLAIN على جدول صغير الاتنين هيقولوا [[Seq Scan on products]]، لأن قراية ٥ صفوف أرخص من فتح أي index. عشان تشوف الفرق اكتب [[SET enable_seqscan = off;]] قبلهم: [[@>]] هيبقى [[Bitmap Index Scan on products_attrs_gin]]، و [[->>'color' = 'black']] هيفضل Seq Scan (وتكلفته بقت رقم ضخم لأنه مجبور). الـ GIN الافتراضي بيخدم [[@>]] و [[?]] و [[?|]] و [[?&]]، مش [[->>]] مع [[=]]؛ ده محتاج expression index على [[(attrs->>'color')]].`,
          solCode: R`SELECT attrs->'color', attrs->>'color', pg_typeof(attrs->'color'), pg_typeof(attrs->>'color')
FROM products WHERE name = 'T-shirt';   -- "black" | black | jsonb | text
SET enable_seqscan = off;
EXPLAIN SELECT name FROM products WHERE attrs->>'color' = 'black';        -- Seq Scan
EXPLAIN SELECT name FROM products WHERE attrs @> '{"color": "black"}';   -- Bitmap Index Scan on products_attrs_gin
RESET enable_seqscan;`
        }
      ]
    },
    {
      t: "indexes و transactions",
      l: 2,
      n: "الـ index بيسرّع القراية، والـ transaction بتحمي الداتا لما حاجتين يحصلوا في نفس اللحظة",
      items: [
        {
          cmd: "B-tree index",
          title: "ليه نفس الاستعلام بياخد ثانية أو ملّي ثانية",
          desc: R`الـ index هيكل جنب الجدول بيحفظ قيم عمود مترتبة ومعاها مكان كل صف، زي فهرس آخر الكتاب. من غيره، [[WHERE created_at > ...]] بيقرا الجدول كله صف صف. معاه، بيوصل للصفوف في كام خطوة.

النوع الافتراضي B-tree، وبيخدم [[=]] و [[<]] و [[>]] و [[BETWEEN]] و [[ORDER BY]]، وبادئة LIKE بس لو الـ collation هي C أو الـ index معمول بـ [[text_pattern_ops]] (درس LIKE و ILIKE). وقراية الخطة بـ EXPLAIN وإنشاء الـ index على الإنتاج في تاب PostgreSQL.`,
          example: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT (SELECT id FROM users LIMIT 1), 'paid', (random() * 1000)::numeric(10,2), now() - random() * interval '365 days'
FROM generate_series(1, 200000);
\timing on
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
CREATE INDEX orders_created_at_idx ON orders (created_at);
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';`,
          try: R`بعد الـ index جرّب [[WHERE date(created_at) = current_date]]: هترجع بطيئة تاني، لأن الدالة على العمود بتمنع استخدام الـ index. واكتبها كمدى: [[created_at >= current_date AND created_at < current_date + 1]].`,
          flag: "script",
          deep: {
            why: "الجدول بيبدأ صغير وكل حاجة سريعة، وبعد سنة فيه مليون صف والصفحة بتاخد ٣ ثواني. معظم مشاكل البطء في تطبيقات الويب index ناقص على عمود في WHERE أو JOIN أو ORDER BY.",
            how: R`B-tree شجرة متوازنة: الجذر بيشاور على فروع، والفروع على أوراق، والأوراق فيها القيم مترتبة وجنب كل قيمة عنوان الصف في الجدول. البحث بياخد عدد خطوات قد عمق الشجرة (٣ أو ٤ لملايين الصفوف) بدل ما يعدّي على كل الصفوف.

الـ planner مش دايمًا بيستخدم الـ index: لو الشرط هيرجّع جزء كبير من الجدول (٣٠٪ مثلًا)، قراية الجدول بالترتيب أرخص من القفز بين الـ index والجدول. عشان كده index على عمود boolean زي [[is_active]] نادرًا ما بيفيد.

الـ index ليه تمن: كل INSERT و UPDATE و DELETE لازم يحدّث كل الـ indexes على الجدول، وبياخد مساحة. index زيادة = كتابة أبطأ.

الـ index على [[created_at]] مش بيخدم [[date(created_at)]]: الشرط لازم يطابق اللي اتعمل عليه الـ index. الحل تكتب الشرط كمدى. و index على [[date(created_at)]] نفسه مش هينفع هنا لأن العمود timestamptz: [[functions in index expression must be marked IMMUTABLE]] (اليوم بيفرق حسب الـ timezone). لو لازم، ثبّت المنطقة: [[CREATE INDEX ON orders (((created_at AT TIME ZONE 'UTC')::date))]] واكتب الشرط بنفس التعبير.

PRIMARY KEY و UNIQUE بيعملوا index لوحدهم، والـ FK لأ. وفيه أنواع تانية: GIN (لـ jsonb والـ arrays والبحث)، و BRIN (لجداول ضخمة بتتملي بالترتيب زي اللوجات).`,
            when: "أعمدة الـ FK، والأعمدة اللي في WHERE أو ORDER BY في استعلامات متكررة على جداول بتكبر. وبعد ما EXPLAIN يوريك Seq Scan على جدول كبير.",
            mistakes: R`في مشروع حقيقي كان فيه index على كل عمود تقريبًا في جدول اليوزرز، منهم أعمدة boolean زي «اتكلمناه على واتساب»؛ أغلبها عمره ما هيتستخدم، وكل واحد بيبطّأ كل كتابة. ودالة على العمود في WHERE. وإنشاء index على جدول كبير في الإنتاج من غير [[CONCURRENTLY]] فيقفل الكتابة.`
          },
          lines: [
            "ضيف ٢٠٠ ألف أوردر تجربة:",
            "لأول يوزر، مدفوعة، بمبلغ عشوائي، وتاريخ عشوائي في آخر سنة،",
            "مرة لكل رقم من 1 لـ 200000.",
            "psql يطبع وقت كل أمر.",
            "من غير index: بيقرا الـ ٢٠٠ ألف صف.",
            "اعمل index على التاريخ.",
            "نفس الاستعلام: بيروح للصفوف على طول. قارن الوقت."
          ],
          sol: R`في تجربة على ٢٠٠ ألف صف: قبل الـ index العدّ أخد حوالي ٢٠ms، وبعده حوالي ١.٥ms. [[date(created_at) = current_date]] رجع ~١٩ms تاني، و EXPLAIN بيقول [[Parallel Seq Scan on orders]] ومعاه [[Rows Removed by Filter]] بعشرات الآلاف. المدى [[created_at >= current_date AND created_at < current_date + 1]] رجع أقل من ١ms بـ [[Bitmap Index Scan on orders_created_at_idx]]. الأرقام عندك هتختلف، بس الفرق بالأضعاف هيفضل.

السبب إن الـ index مترتب بقيم [[created_at]] نفسها، مش بـ [[date(created_at)]]، فالدالة بتجبر Postgres يحسبها لكل صف. الحل يا تكتب الشرط كمدى على العمود زي ما عملت، يا تعمل expression index على نفس الدالة بالظبط. والعددين لازم يطلعوا متساويين؛ لو مختلفين يبقى المدى بتاعك فيه [[<=]] بدل [[<]] أو ناقص يوم.`,
          solCode: R`\timing on
EXPLAIN ANALYZE SELECT count(*) FROM orders WHERE date(created_at) = current_date;
-- Parallel Seq Scan on orders
EXPLAIN ANALYZE SELECT count(*) FROM orders
WHERE created_at >= current_date AND created_at < current_date + 1;
-- Bitmap Index Scan on orders_created_at_idx`
        },
        {
          cmd: "composite index",
          title: "index على عمودين: والترتيب بيفرق",
          desc: R`الـ index المركب [[(user_id, created_at)]] مترتب بالعمود الأول، وجوه كل قيمة منه مترتب بالتاني، زي دليل التليفون: بالعيلة وبعدين بالاسم. فبيخدم [[WHERE user_id = ?]] لوحده، و [[WHERE user_id = ? ORDER BY created_at DESC]] من غير ترتيب زيادة. بس مش بيخدم [[WHERE created_at > ?]] لوحده كويس.

القاعدة: الأعمدة اللي بتساوي فيها ([[=]]) الأول، وبعدها اللي بترتب بيه أو بتعمل عليه مدى.`,
          example: R`CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);
SELECT id, total FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
SELECT count(*) FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1);
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
DROP INDEX orders_user_id_idx;`,
          try: R`حط [[EXPLAIN]] قدام التلات استعلامات وشوف مين بيقول [[Index Scan using orders_user_created_idx]]. وبعدين اعمل index بالترتيب العكسي [[(created_at, user_id)]] وقارن الخطة للاستعلام الأول.`,
          flag: "script",
          deep: {
            why: "أغلب الاستعلامات في تطبيق حقيقي فيها أكتر من عمود: «أوردرات اليوزر ده، الأحدث الأول». index على كل عمود لوحده مش بيحلها كويس، و index مركب واحد بالترتيب الصح بيحلها في خطوة.",
            how: R`القاعدة اسمها leftmost prefix: index على [[(a, b)]] بيخدم الشرط على [[a]]، وعلى [[a و b]]، وعلى [[a]] مع ترتيب بـ [[b]]. أما [[b]] لوحده فالقيم بتاعته متفرقة جوه كل قيمة من a.

(من Postgres 18 فيه skip scan: ممكن يستخدم [[(a, b)]] لشرط على b لوحده، بإنه يلف على كل قيمة من a. ده كويس بس لما قيم a قليلة؛ متعتمدش عليه في التصميم).

المساواة الأول والمدى في الآخر: [[(status, created_at)]] لـ [[WHERE status = 'paid' AND created_at > X]] بيروح لأول paid في المدى ويمشي. العكس [[(created_at, status)]] لازم يعدّي على كل الصفوف في المدى من كل الحالات ويفلتر.

[[DESC]] في الـ index مهم بس لو بترتب بعمودين باتجاهين مختلفين؛ B-tree بيتقري من الناحيتين عادي.

و [[INCLUDE (total)]] بيحط أعمدة زيادة في أوراق الـ index، فالاستعلام ياخد كل اللي محتاجه من الـ index من غير ما يروح للجدول (Index Only Scan).

والـ index على [[(user_id)]] لوحده بقى زيادة، لأن المركب بيغطيه، فمسحناه.`,
            when: "لما استعلام متكرر فيه شرط مساواة على عمود + ترتيب أو مدى على عمود تاني. أشهرها: (user_id, created_at) و (status, created_at).",
            mistakes: R`ترتيب الأعمدة بالعكس. index لوحده على عمود موجود أصلًا في أول index مركب: في مشروع حقيقي كان فيه [[@@unique([userId, type])]] وجنبه [[@@index([userId])]]، والتاني ملوش لازمة لأن الـ unique المركب بيغطيه. و index مركب لكل تركيبة ممكنة من الأعمدة.`
          },
          lines: [
            "index مركب: باليوزر، وجوه كل يوزر بالأحدث.",
            "أوردرات يوزر، الأحدث الأول: بيستخدم الـ index كله، ومن غير ترتيب.",
            "شرط على أول عمود بس: بيستخدمه برضه.",
            "شرط على التاني بس: المركب مش مناسب (بيستخدم index التاريخ اللي عملناه قبل كده).",
            "index الـ user_id لوحده بقى زيادة: المركب بيغطيه."
          ],
          sol: R`الاستعلام الأول هيقول [[Index Scan using orders_user_created_idx]] ومفيش [[Sort]] في الخطة، لأن الـ index جايب الصفوف مترتبة. التالت هيستخدم [[orders_created_at_idx]] (index التاريخ من الدرس اللي فات) مش المركب. أما التاني فغالبًا هيطلع [[Seq Scan]]، وده مش غلط: في الـ lab كل الـ ٢٠٠ ألف أوردر بتوع نفس اليوزر، والـ planner عارف إن الشرط هيجيب الجدول كله، فقراية الجدول على طول أرخص. لو عملت يوزر تاني ليه أوردر واحد وحطيت الـ uuid بتاعه نص صريح في الشرط، هتلاقي [[Index Only Scan using orders_user_created_idx]].

بالترتيب العكسي [[(created_at, user_id)]] (امسح المركب الأول عشان تقارن): الاستعلام الأول بقى [[Index Scan Backward using orders_created_at_idx]] ومعاه سطر [[Filter]] على user_id، يعني بيمشي على الأوردرات بالأحدث ويرمي اللي مش بتوع اليوزر. مع يوزر ليه أوردرات قليلة ده ممكن يلف على الجدول كله. المساواة الأول، والترتيب أو المدى بعدها.`,
          solCode: R`EXPLAIN SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
-- Index Scan using orders_user_created_idx
BEGIN;
DROP INDEX orders_user_created_idx;
CREATE INDEX orders_created_user_idx ON orders (created_at, user_id);
EXPLAIN SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
-- Index Scan Backward using orders_created_at_idx + Filter
ROLLBACK;`
        },
        {
          cmd: "transaction",
          title: "كذا أمر يا كلهم يتنفذوا يا ولا حاجة",
          desc: R`الـ transaction بتجمع كذا أمر في وحدة واحدة: يا كلهم ينجحوا ويتحفظوا مع بعض ([[COMMIT]])، يا أي واحد يفشل فكله يترجع ([[ROLLBACK]]). عمل أوردر = صف في orders + بنود في order_items + خصم من stock. لو السيرفر وقع بعد الخصم وقبل البنود، من غير transaction هتلاقي مخزون ناقص وأوردر فاضي.

ده معنى ACID: Atomic (كله أو ولا حاجة)، و Consistent (الـ constraints محترمة)، و Isolated (اللي بيحصل جوه مش باين لحد لحد الـ COMMIT)، و Durable (بعد COMMIT مش هيضيع حتى لو الكهربا قطعت). وتجربتها بإيدك في psql في تاب PostgreSQL درس «BEGIN و ROLLBACK»؛ هنا من الكود.`,
          example: R`const client = await pool.connect();
try {
  await client.query("BEGIN");
  const { rows } = await client.query("INSERT INTO orders (user_id) VALUES ($1) RETURNING id", [userId]);
  await client.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) SELECT $1::bigint, id, $3::int, price FROM products WHERE id = $2", [rows[0].id, productId, qty]);
  const r = await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1", [qty, productId]);
  if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");
  await client.query("UPDATE orders SET total = (SELECT sum(quantity * unit_price) FROM order_items WHERE order_id = $1) WHERE id = $1", [rows[0].id]);
  await client.query("COMMIT");
} catch (e) {
  await client.query("ROLLBACK");
  throw e;
} finally {
  client.release();
}`,
          try: R`حط [[throw new Error("test")]] بعد الـ INSERT التاني وشغّل: اتأكد في psql إن مفيش أوردر جديد ولا بند. وبعدين جرّب تعمل [[pool.query("BEGIN")]] بدل client، وشوف ليه مش بتشتغل.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف أو جدول ولازم تفضل متسقة: أوردر وبنوده ومخزونه، تحويل فلوس من محفظة لمحفظة، موافقة على سحب وخصم من رصيد. من غير transaction، أي crash أو error في النص بيسيب الداتا في حالة نص نص محدش هيعرف يصلحها.",
            how: R`الـ transaction عايشة على connection واحد. [[pool.query]] بياخد أي connection فاضي من الـ pool لكل أمر، فممكن BEGIN يروح على connection والـ INSERT على connection تاني، ومتبقاش transaction أصلًا. عشان كده [[pool.connect()]] بياخد connection واحد تمسكه لحد ما تخلص، و [[release()]] في finally بترجّعه مهما حصل.

جوه Postgres (MVCC): كل صف ليه نسخ، وكل نسخة عليها رقم الـ transaction اللي عملتها. الـ transactions التانية مش شايفة نسخك الجديدة لحد الـ COMMIT. والـ COMMIT بيكتب في الـ WAL (سجل على الديسك) قبل ما يرجّعلك، وده الـ Durable.

لو أمر فشل جوه الـ transaction، هي بتبقى aborted: أي أمر بعد كده بيرفض ([[current transaction is aborted]]) لحد ما تعمل ROLLBACK.

وخليها قصيرة: الـ transaction المفتوحة ماسكة locks على الصفوف اللي عدّلتها، وبتمنع VACUUM ينضف. وعمرك ما تنادي API خارجي (بوابة دفع، إيميل) جوه transaction: الشبكة ممكن تاخد ٣٠ ثانية والـ locks ماسكة.

في Prisma نفس الفكرة بـ [[$transaction]] (المستوى التالت)، وهو اللي بيدير الـ connection بدالك.`,
            when: "أي كتابة متعددة الخطوات لازم تبقى وحدة واحدة.",
            mistakes: R`[[pool.query("BEGIN")]]: مش transaction، وممكن تسيب connection «idle in transaction». تنسى [[release()]] فالـ pool يخلص والتطبيق يعلّق. تنادي بوابة الدفع جوه الـ transaction. وتمسك الـ error من غير ROLLBACK.`
          },
          lines: [
            "خد connection واحد من الـ pool وامسكه.",
            "جرّب:",
            "ابدأ transaction على الـ connection ده.",
            "اعمل الأوردر ورجّع الـ id.",
            "ضيف البند، والسعر من جدول المنتجات مش من الطلب.",
            "اخصم المخزون بشرط إنه يكفي.",
            "مفيش صف اتعدل؟ المخزون مش كفاية: ارمي error.",
            "حدّث إجمالي الأوردر من بنوده في نفس الـ transaction (درس denormalization).",
            "كله تمام: ثبّت.",
            "أي error في أي خطوة:",
            "رجّع كل حاجة كأنها محصلتش.",
            "وارمي الـ error للي نادى.",
            "في كل الأحوال:",
            "رجّع الـ connection للـ pool.",
            "قفلة."
          ],
          sol: R`مع [[throw new Error("test")]] بعد الـ INSERT التاني، الـ catch بيعمل ROLLBACK ويرمي الـ error تاني. [[SELECT count(*) FROM orders]] و [[order_items]] قبل وبعد هيطلعوا نفس الأرقام: الأوردر والبند اتلغوا مع بعض. (الـ id بتاع الأوردر اتحجز واتحرق، فالأوردر الجاي هيبقى رقمه نط.)

[[pool.query("BEGIN")]] مش بتشتغل لأن كل [[pool.query]] ممكن تروح لـ connection مختلفة، والـ transaction ملك connection واحدة. الخطير إنها غالبًا هتبان شغالة وانت بتجرب لوحدك، لأن الـ pool بيرجّعلك نفس الـ connection الفاضية. في تجربة فيها ٢٠ request في نفس الوقت بالكود الغلط، ٦ أوردرات و ٦ بنود اتحفظوا رغم إن كل request عمل ROLLBACK، لأن الـ INSERT راح لـ connection مفيهاش BEGIN فاتحفظ لوحده. عشان كده دايمًا [[pool.connect()]] وكل الأوامر على نفس الـ client، و [[release()]] في finally.`,
          solCode: R`import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function createOrder(userId, productId, qty) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("INSERT INTO orders (user_id) VALUES ($1) RETURNING id", [userId]);
    await client.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) SELECT $1::bigint, id, $3::int, price FROM products WHERE id = $2", [rows[0].id, productId, qty]);
    throw new Error("test");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const count = async () => (await pool.query("SELECT (SELECT count(*) FROM orders) AS orders, (SELECT count(*) FROM order_items) AS items")).rows[0];
const userId = (await pool.query("SELECT id FROM users LIMIT 1")).rows[0].id;
const productId = (await pool.query("SELECT id FROM products WHERE name = 'Hoodie'")).rows[0].id;
console.log("before:", await count());
try { await createOrder(userId, productId, 1); } catch (e) { console.log("error:", e.message); }
console.log("after:", await count());   // نفس الأرقام
await pool.end();`
        },
        {
          cmd: "atomic UPDATE",
          title: "طلبين في نفس اللحظة على آخر قطعة",
          desc: R`الكود ده شكله سليم: اقرا المخزون، لو يكفي اخصم. بس لو طلبين وصلوا في نفس اللحظة، الاتنين هيقروا [[stock = 1]]، والاتنين هيعدّوا الشرط، والاتنين هيكتبوا، وتبيع قطعة مش موجودة. ده race condition، والـ transaction لوحدها مش بتحله في الإعداد الافتراضي.

الحل الأبسط: الشرط والخصم في أمر واحد جوه القاعدة: [[UPDATE ... SET stock = stock - $1 WHERE id = $2 AND stock >= $1]]، واتأكد إن عدد الصفوف اللي اتعدلت 1. لو 0 يبقى خلص.`,
          example: R`// غلط: تقرا في الكود وتكتب
const { rows } = await db.query("SELECT stock FROM products WHERE id = $1", [id]);
if (rows[0].stock < qty) throw new Error("OUT_OF_STOCK");
await db.query("UPDATE products SET stock = $1 WHERE id = $2", [rows[0].stock - qty, id]);

// صح: الشرط والخصم في أمر واحد
const r = await db.query(
  "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
  [qty, id]
);
if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");`,
          try: R`افتح نافذتين psql. في الاتنين اكتب [[BEGIN;]]، وبعدين في الأولى [[UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie' AND stock >= 1;]]. نفس الأمر في التانية هيقف مستني. اعمل COMMIT في الأولى وشوف التانية كمّلت ورجّعت كام صف.`,
          flag: "script",
          deep: {
            why: "Race conditions مش بتظهر وانت بتجرّب لوحدك، بتظهر يوم العرض لما ٥٠٠ واحد بيشتروا في نفس الدقيقة. والنتيجة: مخزون بالسالب، أو كوبون «مرة واحدة» اتستخدم عشر مرات، أو رصيد اتصرف مرتين.",
            how: R`اللي بيحصل في الكود الغلط (lost update): الطلب A يقرا 1، والطلب B يقرا 1، و A يكتب 0، و B يكتب 0. اتباع قطعتين والمخزون صفر، ومحدش أخد error.

ليه الأمر الواحد آمن؟ الـ UPDATE بياخد lock على الصف. الطلب التاني بيستنى لحد ما الأول يعمل COMMIT. وبعدها، في READ COMMITTED (الافتراضي)، Postgres بيعيد تقييم الـ WHERE على النسخة الجديدة من الصف: stock بقى 0، فالشرط [[stock >= 1]] بقى false، والأمر بيرجع 0 صفوف. من غير أي lock صريح منك.

في Prisma نفس النمط: [[updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } })]] وتشيك إن [[count]] مش صفر. مش [[update]] العادي: من Prisma 5 بيقبل شرط زي [[stock: { gte: qty }]] جنب الـ id، بس لو الشرط متحققش بيرمي [[P2025]] بدل ما يرجّعلك عدد، فـ updateMany مع [[count]] أوضح.

ونفس الحيلة لكل «عدّاد بحد»: كوبون [[uses < max_uses]]، رصيد [[balance >= amount]]، تغيير حالة [[status = 'pending']].`,
            when: "المخزون، والأرصدة، والأكواد اللي بتتستخدم مرة، والعدادات، وأي تغيير حالة.",
            mistakes: R`اقرا في JavaScript واكتب. تفتكر إن حطهم جوه transaction بيحل المشكلة. وفي مشروع حقيقي كان مسار الأوردر العادي مكتوب صح بـ updateMany وشرط [[gte]]، بس مسار تاني (رجوع أوردر ملغي لحالة مدفوع) بيخصم بـ [[update]] و [[decrement]] من غير شرط، فالمخزون ممكن يبقى بالسالب. كل مسار بيخصم لازم يتبع نفس القاعدة، و [[CHECK (stock >= 0)]] شبكة أمان.`
          },
          lines: [
            "اقرا المخزون.",
            "لو مش كفاية ارفض (بس الرقم ده ممكن يكون اتغير خلاص).",
            "اكتب رقم محسوب في JavaScript: طلبين في نفس اللحظة يكتبوا نفس الرقم.",
            "أمر واحد:",
            "اخصم بس لو المخزون لسه كفاية، ورجّع الرقم الجديد.",
            "القيم كـ parameters.",
            "قفلة.",
            "ولا صف اتعدل؟ يبقى المخزون خلص."
          ],
          sol: R`التانية هتقف ومش هترجع لحد ما تعمل COMMIT في الأولى، لأن الأولى ماسكة lock على صف الـ Hoodie. بعد الـ COMMIT التانية هتكمّل على طول وتقول [[UPDATE 1]]، والمخزون نزل ٢ (من 8 لـ 6 مثلًا). المهم إن التانية مقرتش القيمة القديمة: Postgres في READ COMMITTED بيعيد تقييم [[stock >= 1]] على النسخة الجديدة من الصف بعد ما القفل يتفك.

عشان تشوف الحماية بجد، خلي المخزون [[1]] ([[UPDATE products SET stock = 1 WHERE name = 'Hoodie';]]) وكرر: الأولى [[UPDATE 1]]، والتانية بعد الـ COMMIT هتقول [[UPDATE 0]]، والمخزون [[0]] مش [[-1]]. الـ 0 ده هو [[rowCount === 0]] اللي بيرمي OUT_OF_STOCK في الكود. أما بالطريقة الغلطة (SELECT في الكود وبعدين SET بالرقم) الاتنين كانوا هيقروا 1 ويكتبوا 0، وتبيع قطعتين وعندك واحدة.`
        },
        {
          cmd: "SELECT FOR UPDATE",
          title: "اقفل الصفوف اللي قريتها لحد ما تخلص",
          desc: R`أحيانًا القرار محتاج أكتر من شرط بسيط في WHERE: تقرا الأوردر، وتتأكد إنه لسه pending، وتشيك مخزون كل بنوده، وبعدين تكتب في جدولين. هنا [[SELECT ... FOR UPDATE]] جوه transaction بيقفل الصفوف اللي قريتها: أي transaction تانية عايزة تعدّلها أو تقفلها لازم تستنى لحد ما انت تعمل COMMIT أو ROLLBACK.

ده اسمه pessimistic locking: بتفترض إن فيه تصادم وبتمنعه من الأول.`,
          example: R`BEGIN;
SELECT status FROM orders WHERE id = 5 FOR UPDATE;
SELECT p.id, p.stock, oi.quantity
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 5
ORDER BY p.id
FOR UPDATE OF p;
UPDATE products p SET stock = p.stock - oi.quantity
FROM order_items oi WHERE oi.order_id = 5 AND p.id = oi.product_id;
UPDATE orders SET status = 'paid' WHERE id = 5;
COMMIT;`,
          try: R`في نافذتين psql: الأولى [[BEGIN; SELECT * FROM orders WHERE id = 5 FOR UPDATE;]]. التانية نفس الأمر: هتقف. وفي نافذة تالتة جرّب [[SELECT * FROM orders WHERE id = 5;]] من غير FOR UPDATE: هترجع على طول، لأن القراية العادية مش بتستنى.`,
          flag: "script",
          deep: {
            why: "في مشروع حقيقي كان فيه زرار «ادفع» في لوحة الأدمن لطلب سحب أرباح. لو اتضغط مرتين بسرعة، أو اتنين أدمن ضغطوا في نفس اللحظة، الطلب كان ممكن يتدفع مرتين. الحل كان: جوه transaction، اقفل صف الطلب بـ FOR UPDATE، واقرا حالته من جديد بعد القفل، ولو اتدفع خلاص ارفض.",
            how: R`[[FOR UPDATE]] بياخد row lock على كل صف رجع. transaction تانية عايزة تعمل UPDATE أو DELETE أو FOR UPDATE على نفس الصف بتستنى. القراية العادية مش بتستنى (MVCC: بتشوف آخر نسخة متثبتة).

الترتيب المهم: القفل الأول وبعدين القراية اللي هتبني عليها القرار. لو قريت الحالة قبل القفل، ممكن تكون اتغيرت وانت مستني.

[[FOR UPDATE OF p]] بيقفل صفوف products بس مش order_items. و [[ORDER BY p.id]] مش للعرض: بيخلي كل الـ transactions تقفل المنتجات بنفس الترتيب. لو T1 قفل A وعايز B، و T2 قفل B وعايز A، يبقى deadlock، و Postgres بيكتشفه بعد ثانية ويلغي واحدة منهم بـ [[deadlock detected]] (40P01).

فيه اختيارات: [[NOWAIT]] بيرمي error فورًا بدل ما يستنى. و [[SKIP LOCKED]] بيعدّي الصفوف المقفولة، وده أساس أي job queue جوه Postgres: كل worker ياخد صفوف مختلفة.

القفل بيفضل لحد COMMIT أو ROLLBACK بس. برّه transaction (autocommit) بيتفك أول ما الأمر يخلص، فملوش لازمة.

في Prisma مفيش FOR UPDATE في الـ API العادي، فبتستخدم [[tx.$executeRaw]] جوه [[$transaction]] التفاعلية (درس $queryRaw).`,
            when: "قرار من أكتر من خطوة على نفس الصفوف: موافقة على طلب، دفع، حجز مقعد، وأي «اقرا، اتأكد، اكتب» الشرط فيها مينفعش يتكتب في WHERE واحد.",
            mistakes: R`FOR UPDATE برّه transaction. تقرا الحالة قبل القفل وتبني عليها. تقفل بترتيب مختلف في أماكن مختلفة فيحصل deadlock. وتمسك القفل وانت بتنادي API خارجي.`
          },
          lines: [
            "ابدأ transaction.",
            "اقفل صف الأوردر واقرا حالته (الكود يتأكد إنها pending).",
            "اقرا بنوده ومخزون كل منتج،",
            "من البنود مع المنتجات،",
            "للأوردر ده،",
            "بترتيب ثابت عشان مفيش deadlock،",
            "واقفل صفوف المنتجات بس (الكود يتأكد إن كل مخزون يكفي).",
            "اخصم كمية كل بند من منتجه،",
            "في أمر واحد بـ UPDATE ... FROM.",
            "علّم الأوردر مدفوع.",
            "ثبّت، والأقفال اتفكت."
          ],
          sol: R`النافذة التانية هتقف ومش هترجع لحد ما الأولى تعمل COMMIT أو ROLLBACK. في تجربة الأولى مسكت الصف ثانيتين، والتانية أخدت [[Time: 1713 ms]] وهي مستنية. التالتة (SELECT عادي) رجعت في أقل من ١ms وشافت الصف بقيمته الحالية، لأن القراية العادية في Postgres مش بتاخد locks ومش بتستنى الكتابة (MVCC).

لو عايز التانية متستناش خالص: [[FOR UPDATE NOWAIT]] بترجع فورًا بـ [[ERROR:  could not obtain lock on row in relation "orders"]]، و [[FOR UPDATE SKIP LOCKED]] بتتخطى الصف المقفول (ودي اللي بتتعمل بيها job queues). ولو التانية فضلت واقفة ومش بتكمل حتى بعد الـ COMMIT، اتأكد إن الأولى فعلًا عملت COMMIT ومش لسه جوه transaction بعد error ([[current transaction is aborted]]).`,
          solCode: R`-- نافذة 1
BEGIN;
SELECT * FROM orders WHERE id = 5 FOR UPDATE;
-- نافذة 2: هتقف
BEGIN;
SELECT * FROM orders WHERE id = 5 FOR UPDATE;
-- نافذة 3: بترجع على طول
SELECT * FROM orders WHERE id = 5;
SELECT * FROM orders WHERE id = 5 FOR UPDATE NOWAIT;
-- ERROR:  could not obtain lock on row in relation "orders"`
        },
        {
          cmd: "isolation levels",
          title: "الـ transaction بتشوف تعديلات غيرها ولا لأ",
          desc: R`الـ isolation level بيحدد الـ transaction بتشوف إيه من شغل الـ transactions التانية اللي شغالة في نفس الوقت. Postgres عمليًا عنده تلاتة: [[READ COMMITTED]] (الافتراضي): كل أمر بيشوف آخر حاجة اتعملها COMMIT لحظة ما هو بدأ. [[REPEATABLE READ]]: الـ transaction كلها بتشوف snapshot واحدة من أولها. [[SERIALIZABLE]]: النتيجة مضمونة كأن الـ transactions اتنفذت ورا بعض.

كل ما تطلع لفوق الأمان بيزيد، بس الـ transaction ممكن تفشل بـ serialization error ولازم تعيدها من الأول.`,
          example: R`BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT stock FROM products WHERE name = 'Hoodie';        -- 8
SELECT stock FROM products WHERE name = 'Hoodie';        -- لسه 8 حتى لو حد عدّله وعمل COMMIT
COMMIT;
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT count(*) FROM orders WHERE status = 'pending' AND user_id = (SELECT id FROM users LIMIT 1);
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1;
COMMIT;                                                  -- ممكن تفشل: could not serialize access (40001)`,
          try: R`جرّب أول transaction في نافذة، وفي نافذة تانية عدّل المخزون بين السطرين. وبعدين كرر نفس الحكاية بـ [[BEGIN;]] عادي (READ COMMITTED): السطر التاني هيشوف الرقم الجديد.`,
          flag: "script",
          deep: {
            why: "الـ transaction مش معناها «لوحدك في القاعدة». في READ COMMITTED تقدر تقرا رقم، وحد يغيّره، وتقرا تاني تلاقيه اتغير في نفس الـ transaction. فهم المستويات بيقولك إمتى تحتاج lock أو شرط atomic، وإمتى ترفع المستوى.",
            how: R`المشاكل اللي المستويات بتمنعها:

- dirty read: تقرا حاجة لسه متعملهاش COMMIT. عمرها ما بتحصل في Postgres (حتى READ UNCOMMITTED بيشتغل زي READ COMMITTED).
- non-repeatable read: تقرا نفس الصف مرتين تلاقيه اتغير. بتحصل في READ COMMITTED.
- phantom read: نفس الشرط يرجّع صفوف جديدة. REPEATABLE READ في Postgres بيمنعها.
- lost update: اقرا وعدّل واكتب (درس atomic UPDATE). في REPEATABLE READ لو حاولت تعدّل صف غيرك عدّله بعد الـ snapshot بتاعتك، بتاخد [[could not serialize access due to concurrent update]] بدل ما تكتب فوقه.
- write skew: اتنين كل واحد قرا، وقرر، وكتب صف مختلف، والقرارين مع بعض بيكسروا قاعدة. مثال المثال: «أوردر pending واحد بس لكل يوزر»؛ طلبين يعدّوا الـ count ويضيفوا الاتنين. SERIALIZABLE بس هو اللي بيمسكها.

SERIALIZABLE في Postgres (SSI) مش بيقفل كل حاجة؛ بيراقب مين قرا إيه ومين كتب إيه، ولو لقى ترتيب مستحيل بيلغي واحدة بـ error كود [[40001]]. والتطبيق لازم يعيد الـ transaction كلها (loop من ٣ محاولات مثلًا).

في Prisma: [[isolationLevel: Prisma.TransactionIsolationLevel.Serializable]] في options بتاعة [[$transaction]]، والتصادم بيوصلك [[P2034]].`,
            when: "الافتراضي + atomic UPDATE + FOR UPDATE بيغطوا أغلب التطبيقات. REPEATABLE READ لتقرير من كذا استعلام لازم يبقوا من نفس اللحظة. SERIALIZABLE لقواعد معقدة بين صفوف كتير، ومعاه retry.",
            mistakes: R`تفتكر إن أي transaction = serializable. SERIALIZABLE من غير retry فاليوزر ياخد error عشوائي. و transactions طويلة في SERIALIZABLE فتتلغي كتير.`
          },
          lines: [
            "ابدأ transaction بـ snapshot ثابتة.",
            "اقرا المخزون.",
            "اقرا تاني: نفس الرقم، حتى لو اتغير برّه.",
            "خلّص.",
            "ابدأ transaction بأعلى مستوى.",
            "اتأكد إن اليوزر معندوش أوردر pending.",
            "مفيش؟ ضيف واحد.",
            "لو transaction تانية عملت نفس الحكاية في نفس الوقت، واحدة منهم هتفشل هنا."
          ],
          sol: R`بـ REPEATABLE READ: السطرين هيرجّعوا نفس الرقم (8 و 8) حتى لو النافذة التانية زوّدت المخزون وعملت COMMIT بينهم، لأن الـ transaction بتشوف snapshot اتاخدت عند أول استعلام فيها. بـ [[BEGIN;]] العادي (READ COMMITTED): السطر التاني هيشوف الرقم الجديد (مثلًا 13 ثم 18 بعد +5)، لأن كل statement بياخد snapshot جديدة.

وفيه حاجة زيادة تستاهل تجربها: جوه REPEATABLE READ، بعد ما التانية عدّلت الصف وعملت COMMIT، اعمل UPDATE على نفس الصف في الأولى: هتاخد [[ERROR:  could not serialize access due to concurrent update]]. Postgres رفض يكتب فوق تعديل انت مشفتوش، والكود لازم يعمل retry للـ transaction كلها. ولو السطرين في REPEATABLE READ طلعوا مختلفين، يبقى التعديل حصل قبل أول SELECT مش بينهم.`,
          solCode: R`-- نافذة 1
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT stock FROM products WHERE name = 'Hoodie';   -- 8
-- نافذة 2
UPDATE products SET stock = stock + 5 WHERE name = 'Hoodie';
-- نافذة 1
SELECT stock FROM products WHERE name = 'Hoodie';   -- لسه 8
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie';
-- ERROR:  could not serialize access due to concurrent update
ROLLBACK;`
        },
        {
          cmd: "ON CONFLICT",
          title: "ضيف لو مش موجود، وعدّل لو موجود",
          desc: R`[[INSERT ... ON CONFLICT]] بيقول لـ Postgres يعمل إيه لو الصف الجديد هيكسر UNIQUE: [[DO NOTHING]] (تجاهل)، أو [[DO UPDATE SET ...]] (عدّل الموجود). ده اسمه upsert، وبيتعمل في أمر واحد atomic، فمفيش race بين «اتأكد إنه موجود» و «ضيفه».

و [[EXCLUDED]] معناها «الصف اللي كنت بحاول أضيفه».`,
          example: R`ALTER TABLE products ADD COLUMN sku text UNIQUE;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock
RETURNING id, price, stock;
INSERT INTO products (sku, name, price) VALUES ('TS-BLK-M', 'T-shirt black M', 250)
ON CONFLICT (sku) DO NOTHING;`,
          try: R`شغّل أول INSERT تلات مرات، وشوف المخزون بيزيد ١٠ كل مرة والـ id ثابت. وبعدين حط نفس الـ sku مرتين في نفس الـ VALUES واقرا الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: شغّل نفس الـ upsert تلات مرات (sku [['TS-BLK-M']] وسعر 250 ومخزون 10)، بحيث المخزون يتجمع والسعر يتحدث، وفي الآخر [[SELECT sku, price, stock FROM products;]].`,
          flag: "script",
          deep: {
            why: "استيراد كتالوج من مورّد كل يوم، أو «ضيف للسلة» (موجود؟ زوّد الكمية)، أو webhook من بوابة دفع بيتبعت مرتين. الحل الساذج SELECT وبعدين INSERT أو UPDATE في الكود، وده بيتكسر لما طلبين ييجوا مع بعض: الاتنين يلاقوا «مش موجود» والاتنين يعملوا INSERT.",
            how: R`الـ conflict target ([[(sku)]]) لازم يطابق unique index أو constraint موجود. لو الـ index partial (فيه WHERE)، لازم تكتب نفس الشرط بعد الأعمدة.

لما يلاقي تصادم، Postgres بيقفل الصف الموجود وبينفّذ الـ UPDATE عليه. لو upsert تاني جه في نفس اللحظة، بيستنى، فالنتيجة دايمًا صح.

[[DO UPDATE ... WHERE]] بيخليك تعدّل بشرط، زي «عدّل بس لو الداتا الجاية أحدث».

قيود: مينفعش نفس الأمر يعدّل نفس الصف مرتين، فلو الـ VALUES فيها نفس المفتاح مرتين: [[ON CONFLICT DO UPDATE command cannot affect row a second time]]. والـ identity بيتصرف رقم حتى لو الصف معملش INSERT، فتلاقي فجوات.

الاستخدام الأهم: idempotency للـ webhooks. بوابات الدفع بتعيد الإرسال لو ماردتش بسرعة. تحفظ [[event_id]] في جدول عليه UNIQUE، وتعمل [[INSERT ... ON CONFLICT DO NOTHING RETURNING id]]: لو مرجعش صف يبقى الحدث اتعالج قبل كده، فمتعملوش تاني.

و Prisma [[upsert]] بيتحول ON CONFLICT حقيقي في حالات معينة بس (unique واحد في where، ومن غير nested writes). غير كده Prisma بيعمل SELECT وبعدين INSERT، وممكن مع التزامن ياخد [[P2002]]؛ والحل اللي في الـ docs: امسكه واعمل retry.`,
            when: "استيراد ومزامنة، وعدادات per-key، وسلة المشتريات، و webhooks.",
            mistakes: R`SELECT ثم INSERT في الكود. نفس المفتاح مرتين في batch واحد. و webhook بيتعالج مرتين فالعميل ياخد الكورس مرتين أو الرصيد يزيد مرتين.`
          },
          lines: [
            "ضيف كود منتج فريد.",
            "حاول تضيف منتج بالكود ده،",
            "ولو الكود موجود، عدّل الموجود بدل الـ error:",
            "السعر الجديد، والمخزون يزيد بالكمية الجاية.",
            "ورجّع الصف في الحالتين.",
            "نفس المحاولة،",
            "بس لو موجود متعملش حاجة خالص."
          ],
          sol: R`التلات مرات هيرجّعوا نفس الـ id، والمخزون [[10]] ثم [[20]] ثم [[30]]: أول مرة INSERT، وبعدها كل مرة UPDATE بيجمع [[EXCLUDED.stock]] (القيمة اللي كنت عايز تدخلها) على [[products.stock]] (القيمة الموجودة). لو شغّلت الدرس قبل كده بالـ ALTER، هيقولك [[column "sku" of relation "products" already exists]]، عادي، والأرقام هتكمل من اللي موجود.

نفس الـ sku مرتين في نفس الـ VALUES مع DO UPDATE: [[ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time]]، لأن الأمر الواحد مينفعش يعدّل نفس الصف مرتين. الحل تجمّع الصفوف في الكود (أو بـ GROUP BY) قبل الإرسال. ومع DO NOTHING مش هيطلع error، هيتضاف صف واحد بس. وخلي بالك: كل محاولة upsert بتحرق رقم من الـ sequence حتى لو عملت UPDATE، فالـ id الجاي للمنتجات الجديدة هيبقى نط.`,
          solCode: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock
RETURNING id, price, stock;   -- نفس الـ id، والمخزون +10 كل مرة
INSERT INTO products (sku, name, price, stock)
VALUES ('TS-BLK-L', 'T-shirt black L', 250, 5), ('TS-BLK-L', 'T-shirt black L', 250, 5)
ON CONFLICT (sku) DO UPDATE SET stock = products.stock + EXCLUDED.stock;
-- ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL DEFAULT 0
);`,
            starter: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
SELECT sku, price, stock FROM products;`,
            expect: [["TS-BLK-M",250,30]],
            solution: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
SELECT sku, price, stock FROM products;`
          }
        }
      ]
    },
    {
      t: "window functions و pagination",
      l: 2,
      n: "حسابات على صفوف جنب بعض من غير ما تدمجهم، وتقسيم النتايج لصفحات بشكل ميبطّأش",
      items: [
        {
          cmd: "window functions",
          title: "آخر أوردر لكل يوزر، ومجموع تراكمي للإيرادات",
          desc: R`الـ window function بتحسب قيمة لكل صف من صفوف تانية مرتبطة بيه، من غير ما تدمج الصفوف زي GROUP BY. و [[OVER (PARTITION BY ... ORDER BY ...)]] بتحدد «الشباك»: PARTITION BY يقسم مجموعات، و ORDER BY يرتب جوه كل مجموعة.

[[ROW_NUMBER()]] بيدّي كل صف رقمه جوه مجموعته (أحدث أوردر لكل يوزر، أو أعلى ٣ منتجات في كل تصنيف)، و [[SUM() OVER (ORDER BY ...)]] بيعمل مجموع تراكمي للإيرادات يوم بيوم.`,
          example: R`SELECT id, user_id, total FROM (
  SELECT id, user_id, total,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn = 1;
SELECT day, revenue,
       SUM(revenue) OVER (ORDER BY day) AS running_total
FROM (
  SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
  FROM orders WHERE status = 'paid' GROUP BY 1
) d
ORDER BY day;`,
          try: R`غيّر [[rn = 1]] لـ [[rn <= 3]] (آخر ٣ أوردرات لكل يوزر). وضيف عمود [[LAG(revenue) OVER (ORDER BY day)]] للاستعلام التاني عشان تقارن كل يوم باللي قبله. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: آخر ٣ أوردرات لكل يوزر: [[user_id]] و [[id]] و [[rn]]، مترتبين بـ [[user_id]] وبعدين [[rn]].`,
          flag: "script",
          deep: {
            why: "«آخر أوردر لكل يوزر» و «أعلى ٣ في كل قسم» و «مجموع تراكمي» و «الفرق عن امبارح» أسئلة بتتسأل كل يوم في التقارير. من غير window functions بتتحل بـ subqueries معقدة أو بتجيب كل الداتا وتحسب في الكود.",
            how: R`الـ window functions بتتحسب بعد WHERE و GROUP BY و HAVING وقبل ORDER BY و LIMIT. عشان كده مينفعش [[WHERE rn = 1]] في نفس المستوى: [[rn]] لسه متحسبش. بتلفها في subquery أو CTE وتفلتر برّه.

[[ROW_NUMBER]] بيدّي أرقام متتالية حتى لو فيه تعادل. [[RANK]] بيدّي المتعادلين نفس الرقم ويسيب فجوة (1، 1، 3). [[DENSE_RANK]] من غير فجوة (1، 1، 2).

الـ frame: لما تكتب ORDER BY جوه OVER، الافتراضي «من أول المجموعة لحد الصف الحالي ومعاه أي صف متعادل معاه في الترتيب». يعني صفين بنفس قيمة الـ ORDER BY (زي أوردرين بنفس created_at بالظبط) بياخدوا نفس المجموع. لو عايز صف بصف بالظبط: [[ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW]].

[[LAG]] و [[LEAD]] بيجيبوا قيمة الصف اللي قبل أو بعد. و [[sum(total) OVER (PARTITION BY user_id)]] بيحط إجمالي اليوزر جنب كل أوردر من أوردراته، فتحسب النسبة.

وفي Postgres بديل أقصر لـ «أول صف لكل مجموعة»: [[SELECT DISTINCT ON (user_id) ... ORDER BY user_id, created_at DESC]]. والـ index على [[(user_id, created_at DESC)]] بيسرّع الاتنين.`,
            when: "ترتيب جوه مجموعات، top-N لكل مجموعة، مجاميع تراكمية، ومقارنة صف باللي قبله.",
            mistakes: R`window function في WHERE. تنسى PARTITION BY فيبقى الترقيم على الجدول كله. تعادل القيم مع الـ frame الافتراضي. وتحسب ده في JavaScript بعد ما تجيب كل الأوردرات.`
          },
          lines: [
            "الأوردر الأحدث لكل يوزر: برّه بنفلتر،",
            "وجوه بنحسب لكل أوردر،",
            "رقمه وسط أوردرات نفس اليوزر، الأحدث رقم 1،",
            "من الأوردرات.",
            "قفلة الـ subquery.",
            "خلّي رقم 1 بس.",
            "كل يوم وإيراده،",
            "ومجموع كل الأيام لحد اليوم ده.",
            "من:",
            "إيراد كل يوم،",
            "من المدفوع، مجمّع باليوم.",
            "قفلة.",
            "بالترتيب."
          ],
          sol: R`بـ [[rn <= 3]] هتاخد لحد ٣ صفوف لكل يوزر، مرتبين من الأحدث، وعمود rn فيه 1 و 2 و 3. اليوزر اللي عنده أوردرين بس هيظهر بصفين. ضيف [[rn]] للـ SELECT و [[ORDER BY user_id, rn]] عشان تشوفها واضحة.

عمود [[LAG(revenue) OVER (ORDER BY day)]] بيجيب إيراد اليوم اللي قبله في نفس الصف. أول يوم هيبقى NULL لأن مفيش قبله، وده صح. و [[revenue - LAG(revenue) OVER (ORDER BY day)]] بيديك الفرق (موجب أو سالب). الغلطة الشائعة إنك تفتكر LAG بيجيب «امبارح» بالتاريخ: هو بيجيب الصف اللي قبله في الترتيب، فلو يوم مفيهوش أوردرات هيقارن بآخر يوم فيه. لو عايز كل الأيام، اعمل join مع [[generate_series]] للتواريخ الأول.`,
          solCode: R`SELECT id, user_id, total, rn FROM (
  SELECT id, user_id, total,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn <= 3
ORDER BY user_id, rn;
SELECT day, revenue,
       SUM(revenue) OVER (ORDER BY day) AS running_total,
       LAG(revenue) OVER (ORDER BY day) AS prev_day,
       revenue - LAG(revenue) OVER (ORDER BY day) AS diff
FROM (
  SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
  FROM orders WHERE status = 'paid' GROUP BY 1
) d
ORDER BY day;`,
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
            starter: R`SELECT user_id, id, rn FROM (
  SELECT user_id, id,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn = 1
ORDER BY user_id, rn;`,
            expect: [[1,8,1], [1,4,2], [1,2,3], [2,6,1], [2,3,2], [3,7,1], [3,5,2]],
            solution: R`SELECT user_id, id, rn FROM (
  SELECT user_id, id,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn <= 3
ORDER BY user_id, rn;`,
            ordered: true
          }
        },
        {
          cmd: "keyset pagination",
          title: "صفحات سريعة حتى في الصفحة الألف",
          desc: R`[[LIMIT 20 OFFSET 10000]] بيخلي Postgres يقرا ١٠٠٢٠ صف ويرمي أول ١٠ آلاف، فكل ما الصفحة تبعد تبطأ. ولو اتضاف صف جديد وانت بتقلّب، الصفوف بتزحلق فتشوف صف مرتين أو يفوتك صف.

الـ keyset (أو cursor) pagination بدل «عدّي كذا صف» بيقول «هات اللي بعد آخر صف شفته»: [[WHERE (created_at, id) < (آخر وقت، آخر id)]]. مع index مناسب بيبدأ من المكان ده على طول، فالصفحة الألف زي الأولى.`,
          example: R`SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 100000;
CREATE INDEX orders_created_id_idx ON orders (created_at DESC, id DESC);
SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20;
SELECT id, total, created_at FROM orders
WHERE (created_at, id) < ('2026-03-01 10:00:00+00', 1234)
ORDER BY created_at DESC, id DESC
LIMIT 20;`,
          try: R`قيس الاستعلام الأول بـ [[\timing]] مع OFFSET 0 و OFFSET 100000. وبعدين خد آخر صف من صفحة، وحط الـ created_at والـ id بتوعه في الاستعلام الأخير، وقيس. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: آخر صف في الصفحة اللي فاتت كان [[created_at = '2026-09-10 10:00+00']] و [[id = 11]]. هات [[id]] بتاع الـ ٣ صفوف اللي بعده بالترتيب [[created_at DESC, id DESC]]. فيه أوردرين تانيين في نفس اللحظة بالظبط (10 و 7)، ولازم ميضيعوش.`,
          flag: "script",
          deep: {
            why: "الـ infinite scroll والـ feeds والـ APIs اللي بتتقلّب بالصفحات بتوصل لصفحات بعيدة، والـ OFFSET بيخلي كل صفحة أبطأ من اللي قبلها، والـ database بتتعب على الفاضي.",
            how: R`الـ row comparison [[(a, b) < (x, y)]] معناها [[a < x OR (a = x AND b < y)]]، و Postgres بيستخدم الـ index المركب عليها مباشرة: يروح للنقطة دي ويقرا ٢٠ صف ويقف.

الـ id موجود كـ tiebreaker: created_at ممكن يتكرر، ومن غيره ممكن صف يتنط.

الـ API بيرجّع مع كل صفحة [[nextCursor]] (الـ created_at والـ id بتوع آخر صف، متحولين لـ base64 كـ string مقفول عشان العميل ميعتمدش على شكلهم؛ ده encoding مش تشفير، فالسيرفر لازم يتحقق من القيم بعد ما يفكها، ولو عايز تمنع التلاعب اعمله sign بـ HMAC)، والعميل يبعته في الطلب الجاي.

التمن: مفيش «روح للصفحة ٥٧» مباشرة، ومفيش عدد صفحات ببلاش. عشان كده الـ OFFSET لسه كويس للوحات أدمن صغيرة فيها أرقام صفحات. و [[count(*)]] لعدد الصفحات على جدول كبير غالي؛ اعرض «فيه أكتر» بدل الرقم، أو رقم تقريبي.

في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]] مع orderBy فيه عمود unique. وفي supabase-js: [[.lt("created_at", cursor).order("created_at", { ascending: false }).limit(20)]] (ولو فيه تكرار في الوقت محتاج [[.or()]] للـ tiebreaker).`,
            when: "infinite scroll، و feeds، و APIs عامة، وأي جدول كبير بيكبر. والـ OFFSET للجداول الصغيرة اللي محتاجة أرقام صفحات.",
            mistakes: R`keyset على عمود مش فريد من غير tiebreaker، فصفوف بتضيع. ORDER BY مش مطابق للـ index ولا معكوسه بالكامل: اتجاهات مخلوطة (زي created_at DESC, id ASC على index (DESC, DESC)) أو أعمدة بترتيب غير ترتيب الـ index، فـ Postgres يعمل Sort بدل ما يقرا من الـ index (العكس الكامل ASC, ASC عادي، بيقرا الـ index بالعكس). وخلط الاتجاهات كمان بيخلّي الـ row comparison الواحدة غلط، لازم تتكتب a < x OR (a = x AND b > y). و OFFSET في infinite scroll على جدول بيتضاف فيه كل ثانية.`
          },
          lines: [
            "الطريقة البطيئة:",
            "بترتيب الأحدث، والـ id لو الوقت متساوي،",
            "عدّي ١٠٠ ألف صف (بيقراهم ويرميهم) وخد ٢٠.",
            "index بنفس ترتيب الـ ORDER BY بالظبط.",
            "أول صفحة:",
            "نفس الترتيب،",
            "أول ٢٠.",
            "الصفحة اللي بعدها:",
            "اللي أقدم من آخر صف شفته (الوقت والـ id بتوعه).",
            "نفس الترتيب،",
            "٢٠ صف، ومن غير ما يعدّي حاجة."
          ],
          sol: R`في تجربة على ٢٠٠ ألف أوردر: OFFSET 0 أخد حوالي ١ms، و OFFSET 100000 أخد حوالي ٩٠ms من غير الـ index الجديد و ٤٤ms بيه. حتى مع الـ index لازم يعدّي على ١٠٠ ألف صف ويرميهم، فالوقت بيكبر مع رقم الصفحة. الـ keyset من نفس المكان أخد أقل من ١ms، و EXPLAIN بيقول [[Index Only Scan using orders_created_id_idx]] ومعاه [[Index Cond: (ROW(created_at, id) < ROW(...))]]: بيروح للمكان على طول ويقرا ٢٠ صف بس.

لما تنسخ الـ created_at من الناتج خده بالميكروثواني والتوقيت زي ما هو ([['2026-03-30 18:06:41.224496+00']])؛ لو قصّيته للثانية الصفحة الجاية هتكرر أو تنط صفوف. ونفس الكلام لو نسيت الـ id وقارنت بـ created_at لوحده: صفين بنفس الوقت ممكن واحد فيهم يضيع بين صفحتين. والعيب الوحيد: مفيش «روح لصفحة 57» مباشرة، فيه «اللي بعده» بس.`,
          solCode: R`\timing on
SELECT id FROM orders ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 0;
SELECT id FROM orders ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 100000;
-- خد created_at و id من آخر صف في الصفحة، وحطهم هنا:
SELECT id, total, created_at FROM orders
WHERE (created_at, id) < ('2026-03-30 18:06:41.224496+00', 32378)
ORDER BY created_at DESC, id DESC
LIMIT 20;`,
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
INSERT INTO orders VALUES
  (10, 2, 'paid', 40.00, '2026-09-10 10:00+00'),
  (11, 3, 'paid', 55.00, '2026-09-10 10:00+00');`,
            starter: R`SELECT id FROM orders
WHERE created_at < '2026-09-10 10:00+00'
ORDER BY created_at DESC, id DESC
LIMIT 3;`,
            expect: [[10], [7], [6]],
            solution: R`SELECT id FROM orders
WHERE (created_at, id) < ('2026-09-10 10:00+00', 11)
ORDER BY created_at DESC, id DESC
LIMIT 3;`,
            ordered: true
          }
        }
      ]
    },
    {
      t: "استعلامات للتقارير والـ API",
      l: 2,
      n: "جدول بيتربط بنفسه، ونتايج من كذا جدول في قايمة واحدة، والأوردر وبنوده في صف واحد جاهز للـ JSON، وآخر N صفوف لكل يوزر",
      items: [
        {
          cmd: "self join",
          title: "الموظف ومديره في نفس الجدول",
          desc: R`أحيانًا الصف بيشاور على صف تاني في نفس الجدول: الموظف ومديره موظف برضه، والتعليق والرد عليه تعليق برضه، والتصنيف وتصنيفه الأب. العمود ده FK على نفس الجدول ([[manager_id REFERENCES employees (id)]]).

عشان تجيب الاتنين في صف واحد، بتعمل JOIN للجدول على نفسه بـ alias مختلف: [[employees e]] للموظف و [[employees m]] للمدير. SQL شايفهم جدولين، مع إنهم نفس الداتا.`,
          example: R`CREATE TABLE employees (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  manager_id bigint REFERENCES employees (id)
);
INSERT INTO employees (name, manager_id) VALUES ('Mona', NULL), ('Karim', 1), ('Hany', 1), ('Nour', 2);
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;
SELECT m.name AS manager, count(e.id) AS reports
FROM employees m
JOIN employees e ON e.manager_id = m.id
GROUP BY m.name;`,
          try: R`اعمل جدول [[comments]] فيه [[id]] و [[body]] و [[parent_id]] بيشاور على نفس الجدول، وضيف تعليقين وردّين على الأول ورد على الرد. اكتب استعلام يرجّع كل رد ومعاه نص التعليق اللي بيرد عليه. وبعدين هات كل السلسلة من الرد الأخير لحد التعليق الأصلي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بـ [[WITH RECURSIVE]]: السلسلة من الرد رقم 5 لحد التعليق الأصلي: [[id]] و [[body]] و [[depth]] (الرد نفسه 0)، مترتبة بالـ depth.`,
          sol: R`الاستعلام الأول self join عادي: [[comments r JOIN comments p ON p.id = r.parent_id]]. هيرجّع ٣ صفوف (الردين على الأول، والرد على الرد) ومعاهم نص الأب. التعليقات الأصلية مش هتظهر لأن parent_id بتاعها NULL و INNER JOIN بيشيلها؛ لو عايزها تظهر بأب فاضي استخدم LEFT JOIN.

السلسلة كلها مش هتتعمل بـ JOIN ثابت، لأنك مش عارف العمق كام. الحل [[WITH RECURSIVE]]: تبدأ من الرد الأخير، وكل خطوة تجيب الأب بتاع اللي قبله، لحد ما parent_id يبقى NULL. النتيجة ٣ صفوف: الرد على الرد (depth 0)، وبعده الرد، وبعده التعليق الأصلي (depth 2).

الغلطة الشائعة: تنسى الـ alias وتكتب [[JOIN comments ON comments.id = comments.parent_id]]، فـ Postgres يقول [[table name "comments" specified more than once]].`,
          solCode: R`CREATE TABLE comments (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  body      text NOT NULL,
  parent_id bigint REFERENCES comments (id) ON DELETE CASCADE
);
INSERT INTO comments (body, parent_id) VALUES
  ('first', NULL), ('second', NULL), ('reply 1', 1), ('reply 2', 1), ('reply to reply', 3);

SELECT r.body AS reply, p.body AS replying_to
FROM comments r
JOIN comments p ON p.id = r.parent_id;

WITH RECURSIVE thread AS (
  SELECT id, body, parent_id, 0 AS depth FROM comments WHERE id = 5
  UNION ALL
  SELECT c.id, c.body, c.parent_id, t.depth + 1
  FROM comments c JOIN thread t ON c.id = t.parent_id
)
SELECT body, depth FROM thread;`,
          flag: "script",
          deep: {
            why: "الهياكل الشجرية في كل حتة: موظفين ومديرين، وتعليقات وردود، وتصنيفات جوه تصنيفات، ويوزر دعا يوزر (referral). عمل جدول تاني للمديرين أو للردود بيكرر نفس الأعمدة، وبيخلي «رد على رد» مستحيل.",
            how: R`الـ alias هو كل الحكاية: [[FROM employees e JOIN employees m]] بيخلي Postgres يقرا الجدول مرتين كأنهم جدولين. [[ON m.id = e.manager_id]] معناها «المدير هو الصف اللي الـ id بتاعه هو manager_id بتاعي».

[[LEFT JOIN]] مهم هنا: المدير الكبير ملوش مدير (manager_id NULL)، فلو INNER JOIN هيختفي من القايمة.

الاتجاه بيفرق: [[e.manager_id = m.id]] بيجيب مدير كل موظف (صف لكل موظف)، و [[GROUP BY m]] بيعدّ اللي تحت كل مدير.

لعمق مش معروف (سلسلة المديرين لحد الآخر، أو شجرة ردود كاملة) بتستخدم [[WITH RECURSIVE]]: جزء بيبدأ (الصف الأول)، و [[UNION ALL]]، وجزء بيتكرر وبيعمل JOIN على نتيجة الخطوة اللي قبله، لحد ما مفيش صفوف جديدة. وحط شرط عمق ([[WHERE depth < 20]]) لو ممكن الداتا يكون فيها دايرة (A مديره B و B مديره A)، وإلا الاستعلام مش هيخلص.

والـ index على العمود اللي بيشاور ([[manager_id]] أو [[parent_id]]) ضروري، زي أي FK.`,
            when: "أي علاقة أب وابن من نفس النوع: مديرين، ردود، تصنيفات، فولدرات، referrals. ولو الشجرة كبيرة جدًا وبتتقري أكتر ما بتتكتب، فيه تصميمات تانية (materialized path أو extension [[ltree]]).",
            mistakes: R`INNER JOIN فالمدير الكبير أو التعليقات الأصلية تختفي. نفس الاسم من غير alias. اتجاه الـ ON معكوس فتطلع «مرؤوسين» بدل «مدير». استعلام لكل مستوى في الكود (الرد، وبعدين ردود الرد، وبعدين...)، وده N+1 على شكل شجرة. و WITH RECURSIVE من غير حد للعمق على داتا ممكن يكون فيها دايرة. وفي الانترفيو سؤال كلاسيكي: «هات الموظفين اللي مرتبهم أعلى من مرتب مديرهم»، والإجابة self join وشرط [[e.salary > m.salary]].`
          },
          lines: [
            "جدول الموظفين:",
            "رقم كل موظف،",
            "اسمه،",
            "ومديره: FK بيشاور على نفس الجدول، و NULL للمدير الكبير.",
            "قفلة.",
            "Mona مالهاش مدير، و Karim و Hany تحتها، و Nour تحت Karim.",
            "لكل موظف: اسمه واسم مديره،",
            "e هو الموظف،",
            "و m نفس الجدول بس في دور المدير. LEFT عشان Mona تظهر.",
            "بالترتيب.",
            "لكل مدير: عدد اللي تحته،",
            "m المدير،",
            "و e الموظفين اللي manager_id بتاعهم هو.",
            "مجمّعين بالمدير."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE comments (
  id int PRIMARY KEY,
  body text NOT NULL,
  parent_id int REFERENCES comments (id)
);
INSERT INTO comments VALUES
  (1, 'Great post', NULL),
  (2, 'Typo in line 3', NULL),
  (3, 'Agreed', 1),
  (4, 'Which part?', 1),
  (5, 'The intro', 4),
  (6, 'Fixed, thanks', 2);`,
            starter: R`SELECT r.id, r.body, 0 AS depth
FROM comments r
WHERE r.id = 5;`,
            expect: [[5,"The intro",0], [4,"Which part?",1], [1,"Great post",2]],
            solution: R`WITH RECURSIVE chain AS (
  SELECT id, body, parent_id, 0 AS depth FROM comments WHERE id = 5
  UNION ALL
  SELECT c.id, c.body, c.parent_id, chain.depth + 1
  FROM comments c
  JOIN chain ON c.id = chain.parent_id
)
SELECT id, body, depth FROM chain ORDER BY depth;`,
            ordered: true
          }
        },
        {
          cmd: "UNION و UNION ALL",
          title: "activity feed من كذا جدول في قايمة واحدة",
          desc: R`JOIN بيحط أعمدة جنب بعض، و [[UNION]] بيحط صفوف تحت بعض: نتيجة استعلامين (أو أكتر) في قايمة واحدة. الشرط إن الاستعلامات ترجّع نفس عدد الأعمدة وبأنواع متوافقة وبنفس الترتيب.

[[UNION ALL]] بيحطهم زي ما هم. [[UNION]] من غير ALL بيشيل الصفوف المتكررة، وده معناه sort أو hash على النتيجة كلها. لو عارف إن مفيش تكرار، أو التكرار مش فارق، استخدم UNION ALL دايمًا.

المثال المشهور: «النشاط الأخير» لليوزر، أوردرات وتسجيل ومراجعات من جداول مختلفة، في feed واحد مترتب بالوقت.`,
          example: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'you@example.com'
ORDER BY created_at DESC
LIMIT 10;
SELECT status FROM orders UNION SELECT 'refunded';
SELECT status FROM orders UNION ALL SELECT 'refunded';
SELECT email FROM users
EXCEPT
SELECT u.email FROM users u JOIN orders o ON o.user_id = u.id;
SELECT id FROM orders UNION SELECT email FROM users;`,
          try: R`ضيف للـ feed نوع تالت: كل بند اتضاف في أوردر من أوردرات اليوزر ده (من order_items)، بنص زي [[Mug x2]]. وخلّي الـ feed يرجّع آخر ٥ أحداث بس. وبعدين بدّل UNION ALL بـ UNION وشوف لو النتيجة اتغيرت، وفكّر ليه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الـ feed بتاع [[sara@example.com]] بتلات أنواع: [['signup']] بالإيميل، و [['order']] برقم الأوردر كنص، و [['item']] بنص زي [[Mug x2]] ووقت الأوردر بتاعه. التلات أعمدة: [[kind]] و [[ref]] و [[created_at]]، والترتيب مش مهم.`,
          sol: R`هتضيف استعلام تالت بـ UNION ALL فيه نفس التلات أعمدة بنفس الترتيب: [['item']] كـ kind، و [[p.name || ' x' || oi.quantity]] كـ ref، و [[o.created_at]] كوقت (order_items ملوش وقت خاص بيه، فبتاخد وقت الأوردر). الـ ORDER BY و LIMIT بيتكتبوا مرة واحدة في الآخر وبيتطبقوا على النتيجة كلها.

لو بدّلت لـ UNION غالبًا النتيجة مش هتتغير، لأن مفيش صفين متطابقين في كل الأعمدة. بس Postgres عمل شغل زيادة يدوّر على تكرار مش موجود. ولو فيه منتج اتضاف مرتين بنفس الكمية في نفس الأوردر (مش ممكن هنا عشان الـ PRIMARY KEY)، UNION كان هيشيل واحد منهم من غير ما تاخد بالك.

لو الـ error هو [[each UNION query must have the same number of columns]] يبقى عدد الأعمدة مختلف. ولو [[UNION types text and bigint cannot be matched]] يبقى محتاج [[::text]] على الـ id.`,
          solCode: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'you@example.com'
UNION ALL
SELECT 'item', p.name || ' x' || oi.quantity, o.created_at
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC
LIMIT 5;`,
          flag: "script",
          deep: {
            why: "لوحة اليوزر («آخر نشاط»)، وسجل التغييرات في لوحة الأدمن، وبحث واحد بيدوّر في المنتجات والتصنيفات مع بعض، وتقرير بيجمع جدولين نفس الشكل (أوردرات السنة دي وأرشيف السنة اللي فاتت). من غير UNION بتعمل استعلامين وتدمجهم وترتبهم في JavaScript، وده أصعب لما يبقى فيه pagination.",
            how: R`أسماء الأعمدة بتيجي من أول استعلام بس، فحط الـ [[AS]] هناك. الأنواع لازم تتوافق عمود بعمود، ولو مش متوافقة حوّل بـ [[::text]].

[[ORDER BY]] و [[LIMIT]] في الآخر بيتطبقوا على النتيجة المدموجة كلها. لو عايز ترتب أو تحدد جوه جزء واحد بس، حطه بين قوسين: [[(SELECT ... ORDER BY ... LIMIT 5) UNION ALL (...)]].

[[UNION]] = [[UNION ALL]] + إزالة تكرار، والإزالة بتعدّي على النتيجة كلها. [[INTERSECT]] بيرجّع اللي موجود في الاتنين، و [[EXCEPT]] بيرجّع اللي في الأول ومش في التاني (زي «يوزرز معملوش أوردرات»، مع إن [[NOT EXISTS]] غالبًا أوضح).

في feed كبير بـ pagination: خلّي كل جزء يرجّع [[LIMIT]] بتاعه بعد ما يترتب بالوقت (مفيش جزء محتاج يرجّع أكتر من حجم الصفحة)، وبعدين ادمج ورتّب وخد الصفحة. ولو الـ feed ده بيتقري كتير جدًا، فيه تصميم تاني: جدول [[activities]] واحد بيتكتب فيه كل حدث وقت ما يحصل (بـ trigger أو من الكود).`,
            when: "feeds وسجلات نشاط، وبحث في كذا جدول، ودمج جداول نفس الشكل، وإضافة صف «إجمالي» تحت تقرير. أما لو عايز أعمدة من جدول جنب أعمدة من جدول تاني، ده JOIN مش UNION.",
            mistakes: R`UNION من غير ALL على نتايج كبيرة فيبطأ على الفاضي، أو بيشيل صفوف حقيقية متطابقة (زي بندين بنفس القيمة). عدد أعمدة أو ترتيب مختلف فتلاقي الإيميل في عمود التاريخ. ORDER BY جوه جزء من غير أقواس. وفي الانترفيو: «إيه الفرق بين UNION و UNION ALL؟» الإجابة: ALL بيحتفظ بالتكرار ومش بيعمل sort أو hash، فأسرع.`
          },
          lines: [
            "أوردرات اليوزر كأحداث: نوع ثابت، والـ id كنص، والوقت.",
            "أوردرات اليوزر ده بس.",
            "وتحتهم:",
            "حدث التسجيل: نفس التلات أعمدة بنفس الترتيب.",
            "من جدول اليوزرز.",
            "الترتيب على النتيجة كلها: الأحدث الأول،",
            "وآخر ١٠ أحداث.",
            "الحالات من غير تكرار، ومعاها refunded (UNION شال التكرار).",
            "نفس الحاجة بـ ALL: كل الصفوف زي ما هي، والمتكرر يتكرر.",
            "كل الإيميلات،",
            "ناقص",
            "إيميلات اللي عملوا أوردرات: اللي فاضل معملش ولا أوردر.",
            "error: الأنواع مش متوافقة (bigint و text)."
          ],
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
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'sara@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'sara@example.com';`,
            expectSql: R`SELECT 'order', id::text, created_at FROM orders WHERE user_id = 1
UNION ALL SELECT 'signup', email, created_at FROM users WHERE id = 1
UNION ALL SELECT 'item', p.name || ' x' || oi.quantity, o.created_at FROM order_items oi JOIN orders o ON o.id = oi.order_id JOIN products p ON p.id = oi.product_id WHERE o.user_id = 1;`,
            solution: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'sara@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'sara@example.com'
UNION ALL
SELECT 'item', p.name || ' x' || oi.quantity, o.created_at
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.user_id = (SELECT id FROM users WHERE email = 'sara@example.com');`
          }
        },
        {
          cmd: "json_agg",
          title: "الأوردر وبنوده في صف واحد جاهز للـ API",
          desc: R`الـ JOIN بين orders و order_items بيرجّع صف لكل بند، فالأوردر اللي فيه ٣ منتجات بيطلع ٣ صفوف والبيانات بتاعته متكررة. والـ API عايز object واحد للأوردر وجواه array البنود.

[[json_agg]] بيجمّع صفوف المجموعة في JSON array، و [[json_build_object]] بيعمل object من أزواج اسم وقيمة. مع [[GROUP BY o.id]] بيطلع صف واحد لكل أوردر وفيه عمود [[items]] جاهز.

وفيه أخوات: [[array_agg]] بيجمّع في array بتاع Postgres ([[{1,2}]])، و [[string_agg(name, ', ')]] بيجمّع في نص واحد مفصول بفاصل، مفيد في التقارير والـ CSV.`,
          example: R`SELECT o.id, o.total,
       json_agg(json_build_object('product', p.name, 'qty', oi.quantity, 'price', oi.unit_price)
                ORDER BY p.name) AS items
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.id = 1
GROUP BY o.id;
SELECT o.id, string_agg(p.name, ', ' ORDER BY p.name) AS products,
       array_agg(p.id ORDER BY p.id) AS product_ids
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
GROUP BY o.id ORDER BY o.id;
SELECT u.email,
       COALESCE(json_agg(o.id) FILTER (WHERE o.id IS NOT NULL), '[]') AS order_ids
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.email;`,
          try: R`اكتب استعلام يرجّع لكل يوزر (حتى اللي معملش أوردرات): الإيميل، و [[orders]] كـ JSON array، كل عنصر فيه id الأوردر وحالته والـ total. شغّله الأول من غير [[FILTER]] وشوف اليوزر اللي ملوش أوردرات بيطلع عنده إيه. وبعدين استدعيه من Node بـ [[pg]] واطبع [[typeof rows[0].orders]] و [[typeof]] الـ total جوه أول عنصر.`,
          sol: R`من غير FILTER، اليوزر اللي ملوش أوردرات هيطلع عنده [[[{"id" : null, "status" : null, "total" : null}]]] مش [[[]]]: الـ LEFT JOIN رجّع له صف واحد كل أعمدة orders فيه NULL، و json_agg جمّع الصف ده. الحل [[FILTER (WHERE o.id IS NOT NULL)]] ولفّه بـ [[COALESCE(..., '[]')]] لأن json_agg على صفر صفوف بيرجّع NULL مش array فاضي.

من Node: [[typeof rows[0].orders]] هيطلع [['object']] (array)، لأن [[pg]] بيعمل parse لأعمدة json و jsonb لوحده. و [[total]] جوه الـ JSON هيطلع [['number']]، مش string زي ما [[numeric]] بيرجع لما يكون عمود عادي. يعني [[250.00]] بقى [[250]]، ولو الرقم فيه كسور كتير ممكن يتقرّب. لو ده فارق معاك (فلوس)، حوّله نص جوه SQL: [['total', o.total::text]].`,
          solCode: R`SELECT u.email,
       COALESCE(
         json_agg(json_build_object('id', o.id, 'status', o.status, 'total', o.total)
                  ORDER BY o.created_at DESC)
           FILTER (WHERE o.id IS NOT NULL),
         '[]'
       ) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.email;

// check.mjs
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query(
  "SELECT u.email, COALESCE(json_agg(json_build_object('id', o.id, 'total', o.total)) FILTER (WHERE o.id IS NOT NULL), '[]') AS orders FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.email"
);
console.log(typeof rows[0].orders, Array.isArray(rows[0].orders), typeof rows.find(r => r.orders.length)?.orders[0].total);
await pool.end();`,
          flag: "script",
          deep: {
            why: "من غير json_agg عندك طريقتين وحشين: استعلام للأوردرات وبعدين استعلام لبنود كل أوردر (N+1)، أو JOIN يرجّع صفوف متكررة وتقعد تجمّعها في JavaScript بـ reduce. json_agg بيخلّي القاعدة تسلّمك الشكل النهائي في رحلة واحدة، وده نفس اللي Supabase (PostgREST) و Prisma في بعض الحالات بيعملوه من جوه.",
            how: R`[[json_agg(قيمة ORDER BY ...)]] بيحترم ترتيب انت بتحدده، ومن غير ORDER BY الترتيب مش مضمون.

[[json_build_object('key', value, ...)]] بياخد أزواج. و [[to_jsonb(p)]] بيحوّل الصف كله لـ object، و [[to_jsonb(p) - 'attrs']] بيشيل منه مفتاح.

[[json]] ولا [[jsonb]]: [[json_agg]] بيحافظ على ترتيب المفاتيح زي ما كتبتها، و [[jsonb_agg]] بيعيد ترتيبها وبيشيل التكرار. للرد على الـ API غالبًا json_agg كفاية.

مع [[LEFT JOIN]]: اليوزر اللي ملوش أوردرات بيطلع [[[null]]] أو object كل قيمه null. [[FILTER (WHERE ... IS NOT NULL)]] بيشيل الصف ده، و [[COALESCE(..., '[]')]] بيحوّل NULL لـ array فاضي.

تحويل الأنواع: الـ uuid والتواريخ بيتحولوا نصوص في JSON (التواريخ ISO)، و numeric بيتحول رقم JSON، فلما [[pg]] يعمل parse بيبقى JavaScript number (float). ده عكس العمود العادي اللي [[pg]] بيرجّعه string عشان ميضيعش دقة.

[[array_agg]] بيرجّع Postgres array، والـ driver بيحوّله JavaScript array. [[string_agg(x, ', ' ORDER BY x)]] للعرض. ولو عندك مستويين (أوردرات وجوا كل أوردر بنوده) استخدم subquery أو LATERAL لكل مستوى بدل GROUP BY واحد كبير.`,
            when: "endpoints بترجّع object ومعاه أولاده (أوردر وبنوده، بوست وتاجاته)، والتقارير اللي محتاجة «كل المنتجات في خانة واحدة»، وأي مكان بتعمل فيه reduce على صفوف JOIN في الكود.",
            mistakes: R`[[[null]]] لليوزرز اللي من غير أولاد. تنسى ORDER BY جوه json_agg فالبنود ترجع بترتيب عشوائي. الفلوس جوه JSON بقت float. [[GROUP BY o.id]] وبتختار عمود من جدول تاني مش بيعتمد على o.id فتاخد error. و json_agg على مئات الآلاف من الصفوف في صف واحد فيعمل رد ضخم بدل pagination.`
          },
          lines: [
            "لكل أوردر: رقمه والـ total،",
            "وكل بنوده كـ JSON array، كل بند object فيه المنتج والكمية والسعر،",
            "مترتبين بالاسم.",
            "من الأوردرات،",
            "مع بنودها،",
            "ومنتجاتها.",
            "أوردر واحد.",
            "صف واحد لكل أوردر.",
            "أسماء المنتجات في نص واحد بفاصلة،",
            "وأرقامها في array.",
            "من الأوردرات،",
            "مع البنود،",
            "والمنتجات.",
            "لكل أوردر.",
            "كل يوزر،",
            "وأرقام أوردراته كـ array، و [] بدل [null] لليوزر اللي ملوش.",
            "LEFT عشان اليوزر من غير أوردرات يظهر.",
            "صف لكل يوزر."
          ]
        },
        {
          cmd: "LATERAL",
          title: "آخر ٣ أوردرات لكل يوزر",
          desc: R`subquery عادية في FROM مش بتقدر تشوف أعمدة الجداول اللي قبلها. [[LATERAL]] بيسمح لها تشوفهم، فتبقى زي loop: لكل يوزر، شغّل الاستعلام ده بالـ id بتاعه.

وده بيحل «أعلى N لكل مجموعة» بشكل مباشر: لكل يوزر، هات أوردراته مترتبة بالأحدث و [[LIMIT 3]]. ومع index على [[(user_id, created_at DESC)]] كل لفة بتقرا ٣ صفوف من الـ index وتقف.

[[CROSS JOIN LATERAL]] بيشيل اليوزر اللي ملوش نتيجة (زي INNER JOIN)، و [[LEFT JOIN LATERAL ... ON true]] بيسيبه بقيم NULL.`,
          example: R`SELECT u.name, o.id, o.total, o.created_at
FROM users u
CROSS JOIN LATERAL (
  SELECT id, total, created_at FROM orders
  WHERE user_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) o
ORDER BY u.name, o.created_at DESC;
SELECT u.name, last.id AS last_order, last.created_at
FROM users u
LEFT JOIN LATERAL (
  SELECT id, created_at FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1
) last ON true
ORDER BY u.name;`,
          try: R`اكتب «أغلى منتجين في كل أوردر» بـ LATERAL (من order_items و products)، مرة بـ CROSS JOIN ومرة بـ LEFT JOIN، وقارن عدد الصفوف لو فيه أوردر من غير بنود. وبعدين حط [[EXPLAIN]] قدام الاستعلام الأول في المثال، واعمل index على [[orders (user_id, created_at DESC)]] (لو مش موجود من درس composite index) وشوف الـ plan اتغير إزاي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أغلى بندين في كل أوردر: [[order_id]] واسم المنتج و [[unit_price]]، والأوردر اللي ملوش بنود يطلع مرة واحدة بـ NULL (يعني LEFT JOIN LATERAL).`,
          sol: R`الـ LATERAL هنا بيلف على الأوردرات: [[FROM orders o CROSS JOIN LATERAL (SELECT ... FROM order_items oi JOIN products p ... WHERE oi.order_id = o.id ORDER BY oi.unit_price DESC LIMIT 2) top]]. الأوردر اللي فيه بند واحد هيطلع صف واحد، واللي فيه ٣ هيطلع أغلى ٢ بس.

الأوردر اللي من غير بنود هيختفي مع CROSS JOIN، ويظهر مرة واحدة بقيم NULL مع [[LEFT JOIN LATERAL ... ON true]]. فعدد الصفوف في LEFT هيبقى أكبر بعدد الأوردرات الفاضية.

في الـ EXPLAIN من غير index هتلاقي [[Nested Loop]] وجواه لكل يوزر [[Seq Scan on orders]] و [[Sort]]، يعني بيقرا جدول الأوردرات كله مرة لكل يوزر. بعد الـ index هتلاقي [[Index Scan using ...]] من غير Sort، لأن الـ index مترتب أصلًا. على جدول صغير ممكن Postgres يفضل الـ Seq Scan عشان أرخص، فجرّب بعد ما تضيف الـ ٢٠٠ ألف صف من درس B-tree index.`,
          solCode: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
LEFT JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top ON true
ORDER BY o.id, top.unit_price DESC;

EXPLAIN SELECT u.name, o.id FROM users u
CROSS JOIN LATERAL (
  SELECT id FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 3
) o;`,
          flag: "script",
          deep: {
            why: "«آخر ٣ أوردرات لكل يوزر» و «أحدث رسالة في كل محادثة» و «أغلى منتجين في كل تصنيف» بتتسأل كتير. ROW_NUMBER (درس window functions) بيحلها، بس بيرقّم كل الصفوف وبعدين يفلتر. LATERAL مع LIMIT بيقف بدري، فلما كل يوزر عنده آلاف الأوردرات وانت عايز ٣ بس، الفرق كبير.",
            how: R`Postgres بينفّذ الـ LATERAL كـ Nested Loop: لكل صف من الجدول الشمال، بيشغّل الـ subquery بقيم الصف ده. ومع index مركّب على [[(user_id, created_at DESC)]]، كل تشغيل بيبقى Index Scan بيقرا أول ٣ entries ويقف.

ليه مش subquery في SELECT؟ [[(SELECT id FROM orders WHERE ... LIMIT 1)]] في الـ SELECT بيرجّع قيمة واحدة بس. لو عايز عمودين أو ٣ صفوف هتاخد [[subquery must return only one column]] أو [[more than one row returned by a subquery]]. الـ LATERAL بيرجّع جدول كامل.

[[LEFT JOIN LATERAL (...) x ON true]]: الـ ON لازم يتكتب مع LEFT JOIN، و true معناها «مفيش شرط إضافي، الشرط جوه الـ subquery».

LATERAL ولا ROW_NUMBER؟ ROW_NUMBER أبسط لما تكون عايز معظم الصفوف أو الجدول صغير. LATERAL أسرع لما N صغير والمجموعات كبيرة، وفيه index مناسب. و [[DISTINCT ON]] لما N = 1 بس.

وده بالظبط اللي Prisma بيحتاجه لما تكتب [[include: { orders: { take: 3, orderBy: ... } }]]: مش كل الـ ORMs بتطلّع LATERAL، فلو الـ query بطيء اكتبه بـ $queryRaw.`,
            when: "top-N لكل مجموعة، وأحدث صف لكل حاجة، ولما محتاج كذا عمود من subquery مربوطة بالصف اللي برّه، وكمان مع دوال بترجّع جداول زي [[jsonb_array_elements]] و [[generate_series]].",
            mistakes: R`CROSS JOIN LATERAL لما عايز اليوزرز اللي من غير أوردرات يظهروا. من غير index على (user_id, created_at) فكل لفة Seq Scan وSort، وده أبطأ من ROW_NUMBER. ORDER BY برّه بس فالـ LIMIT جوه بياخد ٣ عشوائيين. وتعمل ده في الكود: loop على اليوزرز وفي كل لفة query، وده N+1.`
          },
          lines: [
            "لكل يوزر وأوردراته:",
            "من اليوزرز،",
            "ولكل يوزر شغّل الـ subquery دي (وهي شايفة u):",
            "أوردراته،",
            "بتاعة اليوزر ده،",
            "الأحدث الأول،",
            "٣ بس.",
            "اسم النتيجة o، ويوزر من غير أوردرات بيختفي (CROSS).",
            "الترتيب النهائي.",
            "لكل يوزر: آخر أوردر ليه،",
            "من اليوزرز،",
            "LEFT: اليوزر من غير أوردرات يفضل موجود بقيم NULL،",
            "أحدث أوردر واحد.",
            "ON true لأن الشرط جوه.",
            "بالاسم."
          ],
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
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
CROSS JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top;`,
            expect: [[1,"T-shirt",250], [1,"Mug",120], [2,"Hoodie",650], [2,"T-shirt",250], [3,"Mug",120], [4,null,null], [5,"T-shirt",250], [6,"Hoodie",650], [6,"Cap",180], [7,null,null], [8,"Pen",15]],
            solution: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
LEFT JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top ON true;`
          }
        }
      ]
    },
    {
      t: "views و triggers و functions",
      l: 2,
      n: "استعلام متسمّي بتستخدمه كأنه جدول، وكود بيشتغل جوه القاعدة لوحده مع كل تعديل، ودوال بتناديها من SQL أو من Supabase",
      items: [
        {
          cmd: "VIEW و MATERIALIZED VIEW",
          title: "استعلام بتكرره كتير: خليه جدول وهمي أو نسخة محفوظة",
          desc: R`[[CREATE VIEW]] بيدّي اسم لاستعلام. بعد كده [[SELECT * FROM order_summaries]] كأنه جدول، بس مفيش داتا متخزنة: كل مرة Postgres بيشغّل الاستعلام الأصلي. فالنتيجة دايمًا محدّثة، والسرعة هي سرعة الاستعلام الأصلي.

[[CREATE MATERIALIZED VIEW]] بيشغّل الاستعلام مرة ويخزّن النتيجة على الديسك زي جدول. القراية منه سريعة جدًا، بس النتيجة بتفضل قديمة لحد ما تعمل [[REFRESH MATERIALIZED VIEW]]. و [[CONCURRENTLY]] بيحدّثه من غير ما يقفل القراية، بشرط يكون عليه unique index.

القاعدة: VIEW لتبسيط استعلام بيتكرر. MATERIALIZED لتقرير تقيل بيتقري كتير ومش لازم يبقى لحظي (لوحة أرقام بتتحدث كل ساعة).`,
          example: R`CREATE VIEW order_summaries AS
SELECT o.id, u.email, o.status, o.total, o.created_at,
       count(oi.product_id) AS lines
FROM orders o
JOIN users u ON u.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, u.email;
SELECT * FROM order_summaries WHERE status = 'paid' ORDER BY created_at DESC;
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1;
CREATE UNIQUE INDEX monthly_revenue_month_uq ON monthly_revenue (month);
SELECT * FROM monthly_revenue ORDER BY month;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;`,
          try: R`بعد ما تعمل الاتنين: ضيف أوردر مدفوع جديد، واعمل SELECT من الـ view ومن الـ materialized view من غير refresh. مين شاف الأوردر ومين لأ؟ اعمل REFRESH واتأكد. وبعدين اعمل materialized view تاني من غير unique index وجرّب [[REFRESH ... CONCURRENTLY]] عليه.`,
          sol: R`الـ view هيشوف الأوردر الجديد على طول، لأنه بيشغّل الاستعلام كل مرة. الـ materialized view هيفضل بالأرقام القديمة (نفس revenue ونفس عدد orders للشهر ده) لحد ما تعمل [[REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue]]، وبعدها الشهر الحالي هيزيد بقيمة الأوردر والعدد يزيد ١.

والـ materialized view اللي من غير unique index: الـ refresh العادي هيشتغل، بس CONCURRENTLY هيفشل بـ [[cannot refresh materialized view "public.mv2" concurrently]] ومعاه hint إنك تعمل unique index على عمود أو أكتر من غير WHERE. السبب إن CONCURRENTLY بيحسب النتيجة الجديدة جنب القديمة ويقارنهم صف بصف، ومحتاج مفتاح يعرف بيه الصف.`,
          solCode: R`INSERT INTO orders (user_id, status, total)
SELECT id, 'paid', 999 FROM users LIMIT 1;

SELECT count(*) FROM order_summaries;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;

CREATE MATERIALIZED VIEW mv2 AS SELECT status, count(*) FROM orders GROUP BY status;
REFRESH MATERIALIZED VIEW CONCURRENTLY mv2;`,
          flag: "script",
          deep: {
            why: "نفس الـ JOIN بتاع «الأوردر وإيميل صاحبه وعدد بنوده» بيتكتب في ١٠ أماكن، ولما تغيّر فيه حاجة لازم تلف عليهم كلهم. والـ view بيخليه في مكان واحد. وتقارير الأدمن اللي بتجمّع ملايين الصفوف ممكن تاخد ثواني. لو ٥٠ واحد فاتحين اللوحة، القاعدة هتحسب نفس الرقم ٥٠ مرة، والـ materialized view بيحسبه مرة كل ساعة.",
            how: R`الـ view مجرد استعلام متخزن. Postgres بيدمجه في الاستعلام بتاعك، فـ [[WHERE status = 'paid']] بتتطبق جوه وبتستخدم الـ indexes عادي. الـ view البسيط (جدول واحد من غير GROUP BY) ينفع تعمل عليه INSERT و UPDATE كمان.

[[CREATE OR REPLACE VIEW]] بيسمح تضيف أعمدة في الآخر بس. لو عايز تشيل أو تغيّر نوع عمود: [[DROP VIEW]] وتعمله تاني. ولو فيه view تاني معتمد عليه، الـ DROP هيرفض إلا بـ CASCADE.

الـ materialized view جدول حقيقي: ليه مساحة، وتقدر تعمل عليه indexes. [[REFRESH]] العادي بيعيد حسابه وبيقفل القراية لحد ما يخلص. [[REFRESH ... CONCURRENTLY]] بيحسب نسخة جديدة ويقارنها بالقديمة ويطبّق الفرق، فالقراية شغالة طول الوقت، بس أبطأ ومحتاج [[UNIQUE INDEX]].

الـ refresh مش بيحصل لوحده. بتجدوله: [[pg_cron]] جوه القاعدة (موجود في Supabase)، أو cron job على السيرفر، أو من الكود بعد عملية معينة.

وفي Supabase: الـ view العادي بيشتغل بصلاحيات اللي عمله (غالبًا postgres) فبيعدّي RLS. من Postgres 15 اكتب [[CREATE VIEW ... WITH (security_invoker = true)]] عشان يطبّق RLS على اللي بيقرا. والـ materialized view مبيطبّقش RLS خالص، فمتعرضوش في الـ API لو فيه داتا خاصة.`,
            when: "VIEW: استعلام بيتكرر، أو عايز تدّي حد (أو أداة BI) شكل مبسّط من الداتا من غير ما يشوف الجداول. MATERIALIZED: dashboards وتقارير تقيلة، أو ليدربورد بتتحدث كل كام دقيقة، والتأخير فيها مقبول.",
            mistakes: R`تفتكر إن الـ view بيسرّع. هو بيبسّط بس، والسرعة هي سرعة الاستعلام الأصلي. materialized view ومحدش عامل له refresh، فالأرقام واقفة من أسبوع. CONCURRENTLY من غير unique index. [[SELECT *]] جوه الـ view: الأعمدة بتتحدد وقت الإنشاء، فالعمود الجديد في الجدول مش هيظهر. وفي Supabase: view عادي بيكشف صفوف محمية بـ RLS لأي حد معاه الـ publishable key.`
          },
          lines: [
            "اعمل view اسمه order_summaries على الاستعلام ده:",
            "الأوردر وإيميل صاحبه وحالته وقيمته ووقته،",
            "وعدد بنوده.",
            "من الأوردرات،",
            "مع اليوزرز،",
            "والبنود (LEFT عشان الأوردر الفاضي يطلع بصفر).",
            "صف لكل أوردر.",
            "استخدمه كأنه جدول، وبشروط عادي.",
            "materialized view: النتيجة هتتحسب دلوقتي وتتخزن.",
            "الإيراد وعدد الأوردرات لكل شهر،",
            "من المدفوع والمشحون،",
            "مجمّع بالشهر.",
            "unique index على الشهر: شرط الـ refresh من غير قفل.",
            "قراية سريعة من النسخة المحفوظة.",
            "حدّث النسخة المحفوظة من غير ما تقفل القراية."
          ]
        },
        {
          cmd: "CREATE TRIGGER",
          title: "updated_at يتحدث لوحده، وكل تعديل يتسجل في audit log",
          desc: R`الـ trigger دالة بتشتغل أوتوماتيك جوه القاعدة لما يحصل INSERT أو UPDATE أو DELETE على جدول. مش مهم مين عمل التعديل: الـ API، ولا سكربت، ولا أدمن من psql. الـ trigger هيشتغل.

أشهر استخدامين:

[[updated_at]] يتحدث مع كل UPDATE من غير ما تفتكر تبعته من الكود. ده trigger من نوع [[BEFORE]]: بيعدّل الصف ([[NEW]]) قبل ما يتكتب.

audit log: كل تعديل على الأوردرات يتسجل في جدول (مين، وإمتى، وكان إيه وبقى إيه). ده trigger من نوع [[AFTER]]: بيتفرج على الصف القديم ([[OLD]]) والجديد ([[NEW]]) ويكتب في جدول تاني.`,
          example: R`ALTER TABLE products ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
UPDATE products SET price = 260 WHERE name = 'T-shirt' RETURNING name, price, updated_at;
CREATE TABLE audit_log (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  table_name text NOT NULL,
  op         text NOT NULL,
  row_id     text,
  old_data   jsonb,
  new_data   jsonb,
  changed_by text NOT NULL DEFAULT current_user,
  changed_at timestamptz NOT NULL DEFAULT now()
);
CREATE FUNCTION audit_row() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO audit_log (table_name, op, row_id, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.id, OLD.id)::text,
          CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
          CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
  RETURN NULL;
END;
$$;
CREATE TRIGGER orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_row();`,
          try: R`غيّر حالة أوردر لـ shipped، وامسح أوردر تاني، وبعدين اعرض من audit_log: العملية، ورقم الصف، والحالة القديمة والجديدة (من جوه الـ jsonb). وبعدين ركّب نفس trigger الـ updated_at على جدول orders (ضيف العمود الأول)، وجرّب UPDATE تبعت فيه [[updated_at = '2020-01-01']] بإيدك: القيمة اللي اتخزنت كام؟`,
          sol: R`في audit_log هتلاقي صفين: [[UPDATE]] فيه old_status [[paid]] (أو اللي كانت) و new_status [[shipped]]، و [[DELETE]] فيه old_data كامل و new_data [[NULL]]. الاستعلام: [[old_data->>'status']] و [[new_data->>'status']]. و [[changed_by]] هيبقى اسم يوزر القاعدة ([[postgres]] في الـ lab)، مش اليوزر بتاع التطبيق. عشان تسجّل يوزر التطبيق لازم تبعته، زي [[SET LOCAL app.user_id = '...']] جوه الـ transaction وتقراه في الـ trigger بـ [[current_setting('app.user_id', true)]].

وتجربة updated_at: القيمة المتخزنة هتبقى وقت دلوقتي مش 2020، لأن الـ BEFORE trigger بيكتب فوق أي قيمة بعتها في NEW قبل ما الصف يتحفظ. ده المقصود: محدش يقدر يزوّر وقت التعديل.

لو الـ trigger مش شغال، اتأكد إنه [[FOR EACH ROW]] مش STATEMENT (الـ STATEMENT مفيهوش NEW)، وإنه BEFORE مش AFTER (تعديل NEW في AFTER ملوش تأثير).`,
          solCode: R`UPDATE orders SET status = 'shipped' WHERE id = (SELECT min(id) FROM orders);
DELETE FROM orders WHERE id = (SELECT max(id) FROM orders);

SELECT op, row_id,
       old_data->>'status' AS old_status,
       new_data->>'status' AS new_status,
       changed_by, changed_at
FROM audit_log ORDER BY id;

ALTER TABLE orders ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE TRIGGER orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

UPDATE orders SET status = 'paid', updated_at = '2020-01-01' WHERE id = (SELECT min(id) FROM orders) RETURNING updated_at;`,
          flag: "script",
          deep: {
            why: "لو updated_at معتمد على إن كل مطوّر يفتكر يبعته، هيتنسي في endpoint من العشرين، والـ sync والـ cache اللي معتمدين عليه هيبوظوا. والـ audit log من الكود بيفوّت أي تعديل حصل من برّه الكود: سكربت، أو migration، أو أدمن صلّح حاجة بإيده من psql، وده بالظبط التعديل اللي هتحتاج تعرفه لما فلوس تختفي.",
            how: R`الـ trigger ليه جزئين: function بترجّع نوع [[trigger]] (ده الكود)، و [[CREATE TRIGGER]] (ده بيقول إمتى تشتغل). نفس الـ function ينفع تتركّب على جداول كتير.

جوه الـ function عندك متغيرات جاهزة: [[NEW]] الصف الجديد (INSERT و UPDATE)، و [[OLD]] الصف القديم (UPDATE و DELETE)، و [[TG_OP]] اسم العملية، و [[TG_TABLE_NAME]] اسم الجدول.

[[BEFORE]] بيشتغل قبل الكتابة وتقدر تعدّل NEW. لو رجّعت NEW الصف بيتكتب، ولو رجّعت NULL العملية بتتلغي للصف ده من غير error. [[AFTER]] بيشتغل بعد الكتابة، والقيمة اللي بيرجّعها ملهاش لازمة (عشان كده [[RETURN NULL]])، وبيستخدم للتسجيل أو لتحديث جداول تانية.

[[FOR EACH ROW]] مرة لكل صف. [[FOR EACH STATEMENT]] مرة لكل أمر حتى لو عدّل مليون صف. و [[WHEN (OLD.status IS DISTINCT FROM NEW.status)]] في CREATE TRIGGER بيشغّله بس لو الحالة اتغيرت فعلًا.

الـ trigger جزء من نفس الـ transaction. لو فشل، التعديل الأصلي كله بيترجع. وده حلو (مفيش تعديل من غير audit)، بس كمان معناه إن trigger بطيء بيبطّأ كل INSERT.

[[to_jsonb(OLD)]] بيحوّل الصف كله لـ jsonb، فنفس الـ audit function تشتغل على أي جدول من غير ما تكتب أسماء الأعمدة.

وفي Prisma: [[@updatedAt]] في الـ schema بيحدّث القيمة من الـ client، مش من القاعدة. يعني UPDATE من psql أو من سكربت مش هيحدّثه. الـ trigger بيغطي كل الطرق.`,
            when: "updated_at، والـ audit logs، والـ counters اللي لازم تفضل مظبوطة، وفي Supabase: إنشاء صف في profiles لما يوزر يسجّل (trigger على auth.users، درس one-to-one). أما منطق البيزنس الكبير (إيميلات، ودفع، ومناداة APIs) مكانه الكود مش trigger.",
            mistakes: R`منطق كتير مستخبي في triggers، فمحدش فاهم ليه القيمة اتغيرت. trigger بيعدّل نفس الجدول اللي عليه فيعمل loop. AFTER وبتعدّل NEW وتستغرب مفيش حاجة حصلت. [[FOR EACH ROW]] على جدول بيتعمله bulk insert بملايين الصفوف فيبقى بطيء جدًا. [[DROP FUNCTION]] بيفشل لأن فيه trigger معتمد عليها. وفي الانترفيو: «إيه عيوب الـ triggers؟» منطق مستخبي، وصعب في الـ testing والـ debugging، وبيأثر على سرعة الكتابة.`
          },
          lines: [
            "ضيف عمود updated_at للمنتجات.",
            "function بترجّع trigger،",
            "مكتوبة بـ plpgsql. الـ $$ بتبدأ الكود.",
            "البداية.",
            "حط الوقت الحالي في الصف الجديد.",
            "رجّع الصف المعدّل عشان يتكتب.",
            "النهاية.",
            "قفلة الكود.",
            "trigger اسمه products_updated_at:",
            "قبل أي UPDATE على المنتجات،",
            "لكل صف، شغّل الدالة دي.",
            "جرّب: updated_at اتغير لوحده.",
            "جدول الـ audit:",
            "رقم،",
            "اسم الجدول،",
            "العملية (INSERT و UPDATE و DELETE)،",
            "رقم الصف،",
            "الصف قبل التعديل،",
            "والصف بعده،",
            "مين عمل التعديل (يوزر القاعدة)،",
            "وإمتى.",
            "قفلة.",
            "function الـ audit،",
            "بـ plpgsql.",
            "البداية.",
            "سجّل صف:",
            "اسم الجدول والعملية ورقم الصف (من NEW، ولو DELETE من OLD)،",
            "القديم لو مش INSERT،",
            "والجديد لو مش DELETE.",
            "AFTER trigger: القيمة اللي بترجع ملهاش لازمة.",
            "النهاية.",
            "قفلة الكود.",
            "trigger على الأوردرات:",
            "بعد أي إضافة أو تعديل أو مسح،",
            "لكل صف."
          ]
        },
        {
          cmd: "CREATE FUNCTION",
          title: "منطق جوه القاعدة: دالة SQL أو plpgsql وتناديها من أي مكان",
          desc: R`الـ function في Postgres بتاخد parameters وترجّع قيمة أو جدول، وتناديها من أي استعلام: [[SELECT user_spent(id) FROM users]].

فيه لغتين هتستخدمهم: [[LANGUAGE sql]] لاستعلام واحد (أبسط وPostgres يقدر يحسّنه)، و [[LANGUAGE plpgsql]] لما محتاج متغيرات و IF و RAISE.

الاستخدام الأهم في الشغل: عملية لازم تحصل كلها مع بعض (خصم مخزون وإنشاء أوردر وبنده). الـ function كلها بتشتغل في transaction واحدة، فلو حاجة فشلت كله بيترجع. وفي Supabase دي الطريقة اللي الـ frontend بينفّذ بيها عملية زي دي: [[supabase.rpc('place_order', {...})]] (درس rpc في المستوى التالت).`,
          example: R`CREATE FUNCTION user_spent(p_user_id uuid) RETURNS numeric
LANGUAGE sql STABLE AS $$
  SELECT COALESCE(sum(total), 0) FROM orders
  WHERE user_id = p_user_id AND status IN ('paid', 'shipped');
$$;
SELECT email, user_spent(id) FROM users ORDER BY 2 DESC;
CREATE FUNCTION place_order(p_user_id uuid, p_product_id bigint, p_qty int)
RETURNS bigint LANGUAGE plpgsql AS $$
DECLARE
  v_price numeric;
  v_order_id bigint;
BEGIN
  UPDATE products SET stock = stock - p_qty
  WHERE id = p_product_id AND stock >= p_qty
  RETURNING price INTO v_price;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'OUT_OF_STOCK';
  END IF;
  INSERT INTO orders (user_id, total) VALUES (p_user_id, v_price * p_qty)
  RETURNING id INTO v_order_id;
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (v_order_id, p_product_id, p_qty, v_price);
  RETURN v_order_id;
END;
$$;
SELECT place_order((SELECT id FROM users LIMIT 1), 2, 3);`,
          try: R`نادي [[place_order]] على منتج مخزونه صفر (Cap بعد درس UPDATE مثلًا)، وبعدين اتأكد إن عدد الأوردرات متغيّرش. وبعدين اكتب function بـ [[LANGUAGE sql]] اسمها [[top_products(p_limit int)]] ترجّع جدول ([[RETURNS TABLE (name text, sold bigint)]]) بأكتر المنتجات مبيعًا، وناديها بـ [[SELECT * FROM top_products(3)]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: اعمل [[top_products(p_limit int)]] بـ [[LANGUAGE sql]] و [[RETURNS TABLE (name text, sold bigint)]] (مجموع الكميات من order_items)، وآخر سطر [[SELECT * FROM top_products(3);]].`,
          sol: R`على منتج خلصان هتاخد [[ERROR: OUT_OF_STOCK]] ومعاها [[CONTEXT: PL/pgSQL function place_order(uuid,bigint,integer) line 10 at RAISE]]. و [[SELECT count(*) FROM orders]] هيطلع نفس الرقم قبل وبعد: الـ UPDATE مغيّرش ولا صف أصلًا ([[NOT FOUND]])، والـ exception وقّفت الدالة قبل الـ INSERT. ولو الغلطة حصلت بعد الـ INSERT (زي product_id مش موجود في order_items)، كل اللي حصل جوه الدالة كان هيترجع برضه، لأن الـ function جزء من transaction الأمر اللي ناداها.

و [[top_products(3)]] هترجع ٣ صفوف بعمودين، زي أي جدول: تقدر تعمل عليها WHERE و JOIN. لو نسيت [[RETURNS TABLE]] وكتبت [[RETURNS bigint]] هترجع أول قيمة بس. وخلي بالك أسماء الأعمدة في [[RETURNS TABLE]] بتبقى متغيرات جوه الدالة، فلو في plpgsql عندك عمود في جدول اسمه name هتاخد [[column reference "name" is ambiguous]]. في LANGUAGE sql مفيش المشكلة دي.`,
          solCode: R`SELECT count(*) FROM orders;
SELECT place_order((SELECT id FROM users LIMIT 1), (SELECT id FROM products WHERE stock = 0 LIMIT 1), 1);
SELECT count(*) FROM orders;

CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)
  FROM order_items oi JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY 2 DESC
  LIMIT p_limit;
$$;

SELECT * FROM top_products(3);`,
          flag: "script",
          deep: {
            why: "لما نفس المنطق (حساب رصيد، أو إنشاء أوردر) بيتكتب في الـ API وفي سكربت وفي لوحة الأدمن، كل نسخة بتختلف شوية. الـ function بتحطه في مكان واحد جنب الداتا، وبتشتغل في رحلة واحدة للقاعدة بدل ٤ queries رايحة جاية. وفي Supabase، لو الـ frontend بيكلّم القاعدة مباشرة، ده الطريق الوحيد لعملية فيها كذا خطوة لازم تتم مع بعض.",
            how: R`[[$$ ... $$]] مجرد علامات تنصيص للكود، عشان متحتاجش تهرّب كل [[']] جواه.

الـ parameters باسم زي [[p_user_id]]: الـ prefix بيمنع التضارب مع أسماء الأعمدة. في plpgsql لو الـ parameter اسمه [[user_id]] والجدول فيه عمود [[user_id]]، Postgres مش هيعرف تقصد مين.

[[STABLE]] معناها «مش بتعدّل حاجة، ونفس المدخلات في نفس الاستعلام بترجّع نفس النتيجة»، و [[IMMUTABLE]] «نفس المدخلات بترجّع نفس النتيجة دايمًا» (شرط عشان تستخدمها في index أو generated column)، و [[VOLATILE]] الافتراضي لأي حاجة بتعدّل. التصنيف الصح بيخلي Postgres يحسّن.

في plpgsql: [[DECLARE]] للمتغيرات، و [[SELECT ... INTO v]] أو [[RETURNING ... INTO v]] يحط نتيجة في متغير، و [[FOUND]] بيقولك آخر أمر أثّر في صفوف ولا لأ، و [[RAISE EXCEPTION]] بيوقف كل حاجة ويرجّع error.

الـ function مش بتعمل COMMIT لوحدها: هي جوه الـ transaction بتاع الأمر اللي ناداها. عشان كده أي exception بيرجّع كل اللي عملته. ولو محتاج COMMIT في النص (batch كبير) ده [[PROCEDURE]] مش function.

[[RETURNS TABLE (...)]] أو [[RETURNS SETOF orders]] بيرجّع صفوف، فتستخدمها في FROM. و [[CREATE OR REPLACE FUNCTION]] بيعدّلها، بس لو غيّرت نوع الـ return لازم DROP الأول.

والأمان: الافتراضي [[SECURITY INVOKER]]، يعني بتشتغل بصلاحيات اللي بيناديها. [[SECURITY DEFINER]] بتشتغل بصلاحيات اللي عملها، ودي خطيرة لو مش واخد بالك (بتعدّي RLS). التفاصيل في درس rpc.`,
            when: "عمليات من كذا خطوة لازم تتم مع بعض (خصوصًا في Supabase)، وحسابات بتتكرر في استعلامات كتير، ودوال الـ triggers، ودوال IMMUTABLE للـ indexes (زي التطبيع في درس البحث بالعربي). أما منطق فيه مناداة APIs برّه أو إيميلات، مكانه الكود.",
            mistakes: R`parameter بنفس اسم عمود في plpgsql. [[SECURITY DEFINER]] من غير [[SET search_path]] ومن غير ما تتأكد مين بيناديها. تعليم دالة بتقرا من جدول IMMUTABLE عشان تحطها في index، فالـ index يبقى غلط لما الجدول يتغير. منطق كتير جدًا جوه القاعدة ومفيش tests ولا version control، فخليها في ملفات migrations زي أي حاجة تانية. و [[RAISE EXCEPTION]] برسالة فيها داتا حساسة بتوصل للـ client.`
          },
          lines: [
            "دالة بتاخد id يوزر وترجّع رقم،",
            "SQL عادي، و STABLE: بتقرا بس.",
            "مجموع مدفوعاته (أو صفر)،",
            "للأوردرات المدفوعة والمشحونة بتاعته.",
            "قفلة الكود.",
            "استخدمها في SELECT زي أي دالة.",
            "دالة بتعمل أوردر: يوزر ومنتج وكمية،",
            "بترجّع رقم الأوردر، ومكتوبة بـ plpgsql.",
            "المتغيرات:",
            "سعر المنتج،",
            "ورقم الأوردر الجديد.",
            "البداية.",
            "اخصم المخزون،",
            "بشرط يكون كفاية (atomic UPDATE)،",
            "وحط السعر في المتغير.",
            "لو مفيش صف اتعدّل (المنتج خلصان أو مش موجود):",
            "وقّف وارمي error، وكل حاجة ترجع.",
            "نهاية الـ IF.",
            "اعمل الأوردر بالإجمالي،",
            "وخد رقمه.",
            "ضيف البند،",
            "بنفس السعر اللي اتخصم بيه.",
            "رجّع رقم الأوردر.",
            "النهاية.",
            "قفلة الكود.",
            "ناديها: أول يوزر، ومنتج رقم ٢، و٣ قطع."
          ],
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
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`CREATE FUNCTION top_products(p_limit int) RETURNS bigint
LANGUAGE sql STABLE AS $$
  SELECT sum(quantity) FROM order_items;
$$;
SELECT * FROM top_products(3);`,
            expect: [["Pen",6], ["Mug",4], ["T-shirt",3]],
            solution: R`CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)::bigint AS sold
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY sold DESC, p.name
  LIMIT p_limit;
$$;
SELECT * FROM top_products(3);`
          }
        },
        {
          cmd: "generated columns",
          title: "عمود بيتحسب لوحده من أعمدة تانية",
          desc: R`[[GENERATED ALWAYS AS (تعبير) STORED]] بيعمل عمود قيمته بتتحسب من أعمدة تانية في نفس الصف، وبتتخزن وتتحدث لوحدها مع كل INSERT و UPDATE. محدش يقدر يكتب فيه بإيده.

مثال: [[line_total]] في order_items = الكمية × السعر. بدل ما تحسبه في كل استعلام أو تثق إن الكود بعته صح، القاعدة بتحسبه. وتقدر تعمل عليه index زي أي عمود.

الشرط: التعبير يعتمد على أعمدة نفس الصف بس، وبدوال IMMUTABLE. مينفعش [[now()]] ولا subquery ولا جدول تاني.`,
          example: R`ALTER TABLE order_items
  ADD COLUMN line_total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED;
SELECT order_id, quantity, unit_price, line_total FROM order_items ORDER BY order_id LIMIT 3;
UPDATE order_items SET quantity = 3 WHERE order_id = 1 AND product_id = 2 RETURNING line_total;
UPDATE order_items SET line_total = 1;
ALTER TABLE users ADD COLUMN email_domain text GENERATED ALWAYS AS (split_part(email, '@', 2)) STORED;
CREATE INDEX users_email_domain_idx ON users (email_domain);`,
          try: R`ضيف لجدول users عمود [[email_normalized]] generated من [[lower(trim(email))]] واعمل عليه unique index. جرّب تضيف يوزر إيميله [['  YOU@example.com']]. وبعدين جرّب تعمل عمود generated من [[now() - created_at]] وشوف الـ error.`,
          sol: R`اليوزر الجديد هيترفض بـ [[duplicate key value violates unique constraint "users_email_normalized_uq"]]، لأن العمود المحسوب بقى [[you@example.com]]، وده موجود قبل كده. يعني القاعدة نفسها بقت تمنع التكرار مهما الكود بعت الإيميل بأي شكل. وده بديل للـ expression index [[ON users (lower(email))]] اللي في درس constraints، والفرق إن القيمة المتطبّعة بقت عمود تقدر تعمل عليه SELECT و WHERE مباشرة.

والعمود من [[now() - created_at]] هيفشل بـ [[generation expression is not immutable]]، لأن [[now()]] قيمتها بتتغير، والعمود المخزن مش هيتحدث لوحده كل ثانية. أي حاجة معتمدة على الوقت الحالي احسبها في SELECT أو اعملها view.`,
          solCode: R`ALTER TABLE users
  ADD COLUMN email_normalized text GENERATED ALWAYS AS (lower(trim(email))) STORED;
CREATE UNIQUE INDEX users_email_normalized_uq ON users (email_normalized);

INSERT INTO users (email, name) VALUES ('  YOU@example.com', 'Copy');

ALTER TABLE users ADD COLUMN age interval GENERATED ALWAYS AS (now() - created_at) STORED;`,
          flag: "script",
          deep: {
            why: "القيم المحسوبة لما تتخزن من الكود بتختلف عن الحقيقة مع الوقت: حد عدّل الكمية من لوحة الأدمن ونسي يعدّل line_total. والحساب في كل SELECT بيتكرر ومبيتعملوش index. الـ generated column بيجمع الاتنين: القيمة دايمًا صح، ومتخزنة فتتفلتر وتترتب وتتعمل عليها index.",
            how: R`[[STORED]] معناها القيمة بتتحسب وقت الكتابة وتتخزن على الديسك. Postgres 18 ضاف كمان [[VIRTUAL]] (بتتحسب وقت القراية ومبتاخدش مساحة) وخلاه الافتراضي. بس الـ lab على Postgres 17 فاكتب STORED، وده اللي بتحتاجه لو هتعمل index.

الإضافة على جدول موجود ([[ALTER TABLE ... ADD COLUMN ... STORED]]) بتعيد كتابة الجدول كله عشان تحسب القيمة لكل صف القديم، وده بياخد قفل. على جدول كبير في الإنتاج خد بالك (درس تغييرات آمنة في الإنتاج في تاب «PostgreSQL»).

مينفعش تكتب فيه: [[UPDATE ... SET line_total = 1]] بيطلع [[column "line_total" can only be updated to DEFAULT]]. وفي INSERT متبعتوش خالص.

الاستخدامات الشائعة: مجموع من أعمدة، أو نسخة متطبّعة من نص (lowercase، أو من غير تشكيل)، أو [[tsvector]] للبحث (الدرس الجاي)، أو استخراج قيمة من jsonb عشان تعمل عليها index عادي.

في Prisma: العمود ده بيتعرف في الـ schema عادي، بس لازم تعدّل الـ migration بإيدك وتكتب الـ GENERATED، لأن Prisma مبيعرفش يولّده. ومتبعتوش في create، أو استخدم [[@default(dbgenerated())]] عشان Prisma ميطلبوش منك.`,
            when: "قيمة بتتحسب من نفس الصف وبتتقري أو بتتفلتر كتير: إجماليات، ونصوص متطبّعة للبحث والـ unique، و tsvector، ومفاتيح من jsonb.",
            mistakes: R`تحاول تستخدم [[now()]] أو جدول تاني. تبعت قيمة للعمود في INSERT من الكود (Prisma أو غيره) فيطلع error. تضيفه على جدول فيه ملايين الصفوف في وقت الذروة. تعمل generated column لحاجة بتتحسب مرة واحدة ومش بتتفلتر بيها، فتخزن حاجة ملهاش لازمة.`
          },
          lines: [
            "ضيف لـ order_items عمود:",
            "line_total = الكمية × السعر، بيتحسب ويتخزن لوحده.",
            "القيمة موجودة من غير ما حد يحسبها.",
            "غيّر الكمية: line_total اتحدث لوحده.",
            "error: العمود ده محدش يكتب فيه.",
            "عمود دومين الإيميل محسوب من الإيميل،",
            "وعليه index عشان الفلترة بالدومين تبقى سريعة."
          ]
        }
      ]
    },
    {
      t: "البحث: full-text و pg_trgm والعربي",
      l: 2,
      n: "خانة البحث اللي في كل موقع: بحث بالكلمات مترتب بالأهمية، وبحث بيستحمل الأخطاء الإملائية، وتطبيع العربي عشان «أحمد» تلاقي «احمد»",
      items: [
        {
          cmd: "full-text search",
          title: "بحث بالكلمات مترتب بالأهمية بدل ILIKE",
          desc: R`[[ILIKE '%docker run%']] بيدوّر على النص ده بالحرف، فـ «running docker» مش هتطلع، ومع جدول كبير بيقرا كل الصفوف. الـ full-text search بيفهم الكلمات: بيقطّع النص لكلمات، ويرجّع كل كلمة لأصلها (running و runs بيبقوا run)، ويشيل الكلمات اللي ملهاش معنى (the و a)، وبيرتب النتايج بالأهمية.

الأجزاء: [[tsvector]] النص بعد التقطيع (بيتخزن في عمود generated وعليه GIN index)، و [[tsquery]] كلام البحث، و [[@@]] بيقول «مطابق ولا لأ»، و [[ts_rank]] بيدّي درجة للترتيب.

و [[websearch_to_tsquery]] بياخد اللي اليوزر كتبه في خانة البحث زي ما هو، وبيفهم [["عبارة بالظبط"]] و [[-كلمة]] للاستبعاد و [[or]]، ومبيرميش error أبدًا مهما اليوزر كتب.`,
          example: R`CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
CREATE INDEX articles_search_idx ON articles USING gin (search);
INSERT INTO articles (title, body) VALUES
  ('Running Postgres in Docker', 'How to run a database container with volumes and backups'),
  ('Indexes explained', 'Why queries get slow and how a B-tree index helps when running reports'),
  ('Docker volumes', 'Keep your data when the container is removed');
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
SELECT to_tsvector('english', 'Running containers ran quickly');
SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');
SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;`,
          try: R`دوّر على [[running]] وعلى [[containers]]، وقارن النتيجة بـ [[ILIKE '%running%']]. وبعدين جرّب [[to_tsquery('english', 'docker run')]] (من غير websearch) وشوف بيحصل إيه، وجرّب [[websearch_to_tsquery('english', 'docker -backups')]].`,
          sol: R`[[running]] هترجع المقالتين الأولى والتانية، لأن البحث بقى [['run']] بعد الـ stemming، والأولى فيها Running و run، والتانية فيها running. أما [[ILIKE '%running%']] هترجع نفس الاتنين هنا بالصدفة، بس لو دوّرت بـ [[run]] الـ ILIKE هيجيب أي كلمة فيها run (زي runtime) و full-text مش هيجيبها. و [[containers]] هترجع الأولى والتالتة (container).

[[to_tsquery('english', 'docker run')]] هيطلع [[syntax error in tsquery: "docker run"]]، لأن to_tsquery محتاجة operators صريحة زي [['docker & run']]. عشان كده متحطش اللي اليوزر كتبه في to_tsquery أبدًا، استخدم websearch_to_tsquery أو plainto_tsquery.

و [[docker -backups]] هترجع المقالة التالتة بس (Docker volumes)، لأن الأولى فيها backups فاتشالت.

خد بالك من الحاجة الغريبة: [[ran]] مش بتبقى run، لأن الـ stemmer بيقطع نهايات الكلام بس، مبيعرفش الأفعال الشاذة.`,
          solCode: R`SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'running');
SELECT title FROM articles WHERE title ILIKE '%running%' OR body ILIKE '%running%';
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'containers');
SELECT to_tsquery('english', 'docker run');
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker -backups');`,
          flag: "script",
          deep: {
            why: "خانة البحث موجودة في كل منتج تقريبًا: منتجات، ومقالات، وتذاكر دعم. ILIKE مع % في الأول مبيستخدمش B-tree index، ومبيفهمش صيغ الكلمة، ومبيرتبش. والحل مش لازم يبقى Elasticsearch من أول يوم: Postgres فيه بحث كويس كفاية لأغلب المشاريع.",
            how: R`[[to_tsvector('english', text)]] بيقطّع ويعمل stemming ويشيل الـ stop words، وبيحفظ مكان كل كلمة: [['contain':2 'quick':4 'ran':3 'run':1]]. أول argument هو الـ configuration (اللغة)، ولازم يبقى نفسه في التخزين والبحث.

[[setweight(..., 'A')]] بيدّي كلمات العنوان وزن أعلى من كلمات الـ body، فـ ts_rank بيطلّع المقالة اللي الكلمة في عنوانها الأول. الأوزان A و B و C و D.

العمود [[GENERATED ... STORED]] بيحسب الـ tsvector مرة وقت الكتابة بدل كل بحث، و [[GIN]] index بيعمل «inverted index»: لكل كلمة، قايمة الصفوف اللي فيها. فالبحث بيروح للكلمة على طول. ومن غير العمود ده ممكن تعمل expression index على [[to_tsvector('english', title || ' ' || body)]]، بس لازم تكتب نفس التعبير بالظبط في كل WHERE.

[[websearch_to_tsquery]] للي اليوزر بيكتبه. [[plainto_tsquery]] بيعمل AND بين كل الكلمات. [[to_tsquery]] للي انت بتكتبه في الكود بـ operators: [[&]] و [[|]] و [[!]] و [[<->]] (ورا بعض) و [[:*]] (prefix: [['dock:*']] للـ autocomplete).

[[ts_rank]] بيحسب على الصفوف اللي طابقت بس، فهو مش بيستخدم index. عشان كده الفلترة بـ [[@@]] الأول (بالـ index) وبعدين الترتيب. و [[ts_headline]] بيطلّع جزء من النص والكلمات المطابقة جوه [[<b>]] للعرض (خد بالك: HTML، اعمله escape أو sanitize قبل ما تحطه في الصفحة).

الحدود: مفيش تسامح مع الأخطاء الإملائية (ده pg_trgm، الدرس الجاي)، والعربي محتاج شغل زيادة (نفس الدرس). ولو محتاج facets وتصحيح إملائي وsynonyms وملايين المستندات، ساعتها فكّر في Meilisearch أو Typesense أو Elasticsearch.`,
            when: "بحث في نصوص طويلة (مقالات، وأوصاف منتجات، وتذاكر)، ولما محتاج ترتيب بالأهمية. للأسماء القصيرة والأكواد والبحث اللي لازم يستحمل أخطاء إملائية، pg_trgm أنسب، وكتير من المشاريع بتستخدم الاتنين مع بعض.",
            mistakes: R`to_tsquery على كلام اليوزر فأي علامة غريبة تطلّع error 500. لغة مختلفة في التخزين والبحث ([['english']] هنا و [['simple']] هناك) فمفيش حاجة تطابق. تحسب to_tsvector جوه WHERE من غير index فكل بحث يقرا الجدول كله. الترتيب بـ ts_rank على مليون صف طابقوا. [[ts_headline]] بيطلع HTML وبتحطه في الصفحة من غير escape.`
          },
          lines: [
            "جدول المقالات:",
            "رقم،",
            "عنوان،",
            "ومحتوى،",
            "وعمود البحث: tsvector بيتحسب لوحده،",
            "كلمات العنوان بوزن A وكلمات المحتوى بوزن B.",
            "وبيتخزن.",
            "قفلة.",
            "GIN index على عمود البحث.",
            "تلات مقالات:",
            "واحدة عن Docker و Postgres،",
            "وواحدة عن الـ indexes،",
            "وواحدة عن الـ volumes.",
            "المقالات ودرجة كل واحدة،",
            "والبحث جاي من كلام اليوزر زي ما هو،",
            "اللي طابقت بس (بالـ index)،",
            "والأهم الأول.",
            "شوف التقطيع: running بقت run، و ran فضلت ran، و quickly بقت quick.",
            "شوف بيفهم إيه: عبارة ورا بعض، واستبعاد، و or.",
            "جزء من النص والكلمات المطابقة معلّمة بـ <b>."
          ]
        },
        {
          cmd: "البحث بالعربي",
          title: "«أحمد» تلاقي «احمد»، و«محمد مصطفا» تلاقي «مُحَمَّد مصطفى»",
          desc: R`العربي فيه مشاكل الإنجليزي مفيهوش: نفس الاسم بيتكتب بـ «أحمد» و «احمد»، و «فاطمة» و «فاطمه»، و «مصطفى» و «مصطفي»، وممكن يكون فيه تشكيل أو تطويل (الـــقاهرة). لو قارنت النص زي ما هو، اليوزر اللي كتب «احمد» مش هيلاقي «أحمد».

الحل على خطوتين: تطبيع (normalization) للنص المتخزن ولكلام البحث بنفس الدالة: الهمزات كلها ا، والتاء المربوطة ه، والألف المقصورة ي، ومن غير تشكيل ولا تطويل. وبعدين للأخطاء الإملائية: extension [[pg_trgm]] بيقارن النصوص بالتشابه (similarity) بدل التطابق.

الدالة لازم تكون [[IMMUTABLE]] عشان تتحط في عمود generated وعليه index.`,
          example: R`CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
INSERT INTO teachers (name) VALUES ('أحمد إبراهيم'), ('مُحَمَّد مصطفى'), ('فاطمة الزهراء'), ('أسامة عبد الله');
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
SELECT name FROM teachers WHERE name LIKE '%احمد%';`,
          try: R`دوّر بـ [[اسامه]] (من غير همزة وبهاء) مرة بـ LIKE على name_norm ومرة بـ [[word_similarity]] و [[<%]]. وبعدين دوّر بغلطة إملائية زي [[ابراهم]] وشوف مين من الطريقتين لقاه. وآخر حاجة: اعمل 5000 مدرس بأسماء متولّدة ([[generate_series]])، وقارن [[EXPLAIN ANALYZE]] للبحث بـ LIKE على name_norm قبل وبعد الـ index.`,
          sol: R`[[اسامه]] بعد التطبيع بقت [[اسامه]]، و [[أسامة عبد الله]] اتخزنت [[اسامه عبد الله]]، فالـ LIKE هيلاقيها. و [[word_similarity(ar_normalize('اسامه'), name_norm)]] هيطلع [[1]] لأن الكلمة موجودة بالكامل جوه الاسم.

[[ابراهم]] (ناقصها ي): الـ LIKE مش هيلاقي حاجة لأن النص مش موجود بالحرف. أما [[ar_normalize('ابراهم') <% name_norm]] هيلاقي [[أحمد إبراهيم]] لأن أغلب الـ trigrams مشتركة. ده الفرق: التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء.

في EXPLAIN ANALYZE قبل الـ index هتلاقي [[Seq Scan on teachers]] ومعاها [[Rows Removed by Filter]] بالآلاف، وبعده [[Bitmap Index Scan on teachers_name_trgm]]. وخد بالك: pg_trgm محتاج ٣ حروف على الأقل في البحث عشان يستخدم الـ index بكفاءة، فالبحث بحرفين بيقرا كتير.`,
          solCode: R`SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;

SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;

DROP INDEX teachers_name_trgm;
INSERT INTO teachers (name) SELECT 'مدرس رقم ' || g FROM generate_series(1, 5000) g;
ANALYZE teachers;
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';`,
          flag: "script",
          deep: {
            why: "في منصة تعليمية، أو متجر، أو نظام موظفين مصري، أغلب البحث بأسماء عربي. اليوزر بيكتب بسرعة من الموبايل من غير همزات، أو بيغلط حرف. لو البحث مش بيستحمل ده، اليوزر هيقول «الاسم مش موجود» وهو موجود، وده بيبان للعميل كأنه bug.",
            how: R`التطبيع: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]] بيشيل التشكيل (الفتحة والضمة والكسرة والتنوين والشدة والسكون، من U+064B لـ U+0652) والتطويل (U+0640). و [[translate(نص, 'أإآٱةى', 'ااااهي')]] بيبدّل كل حرف من الأولى باللي قصاده في التانية بالترتيب، فعدد الحروف لازم يبقى متساوي والترتيب مظبوط. [[lower]] عشان لو فيه إنجليزي في الاسم.

القاعدة الذهبية: نفس الدالة على المتخزن وعلى كلام البحث. لو طبّعت واحد بس، مفيش حاجة هتطابق.

ليه ة تبقى ه مش العكس؟ الاتنين شغالين طالما ثابت. المهم إن «فاطمة» و «فاطمه» يبقوا نفس النص بعد التطبيع.

[[pg_trgm]] بيقطّع النص لـ trigrams (كل ٣ حروف ورا بعض)، و [[similarity(a, b)]] = نسبة الـ trigrams المشتركة من ٠ لـ ١. [[a % b]] معناها «التشابه أكبر من [[pg_trgm.similarity_threshold]]» (الافتراضي 0.3). و [[word_similarity(كلمة, نص)]] مع [[<%]] بيدوّر على الكلمة جوه نص أطول، وده الأنسب لما اليوزر يكتب جزء من الاسم.

الـ index [[gin (col gin_trgm_ops)]] بيخدم [[%]] و [[<%]] و [[LIKE '%x%']] و [[ILIKE]] كمان. يعني نفس الـ index بيحل مشكلة «LIKE بـ % في الأول مبيستخدمش index» من درس LIKE و ILIKE.

والـ full-text بالعربي: Postgres فيه configuration [[arabic]] بيعمل stemming ([[to_tsvector('arabic', 'المدرسون')]] بتطلع [['مدرس']])، بس مبيطبّعش الهمزات والتاء المربوطة. فلو محتاجه: [[to_tsvector('arabic', ar_normalize(body))]] في العمود الـ generated، ونفس الحاجة في البحث.

و Supabase فيه pg_trgm و unaccent جاهزين، فعّلهم من Database ← Extensions.`,
            when: "أي بحث بأسماء عربي (مدرسين، وطلاب، وعملاء، ومنتجات)، وأي بحث لازم يستحمل أخطاء إملائية أو autocomplete. للنصوص الطويلة: full-text على النص المتطبّع، ومعاه pg_trgm للأسماء.",
            mistakes: R`تطبّع المتخزن وتنسى تطبّع كلام البحث (أو العكس). [[translate]] بعدد حروف مختلف أو ترتيب غلط، فالتاء المربوطة تبقى ي (حصلت وانا بكتب الدرس ده). الدالة من غير IMMUTABLE فالعمود الـ generated يرفض. threshold عالي فمفيش نتايج، أو واطي فكل حاجة تطلع. بحث بحرف أو حرفين على trigram index. و ILIKE على name الأصلي وتفتكر إنه هيلاقي «احمد» جوه «أحمد».`
          },
          lines: [
            "فعّل extension الـ trigrams.",
            "دالة التطبيع: نص داخل ونص خارج،",
            "IMMUTABLE: نفس المدخل يرجّع نفس المخرج دايمًا (شرط الـ index).",
            "شيل التشكيل والتطويل، وبعدين بدّل الهمزات بـ ا، و ة بـ ه، و ى بـ ي.",
            "قفلة.",
            "جرّب: محمد احمد ابراهيم مدرسه مصطفي القاهره.",
            "جدول المدرسين:",
            "رقم،",
            "الاسم زي ما اتكتب (للعرض)،",
            "والاسم المتطبّع، بيتحسب لوحده.",
            "قفلة.",
            "trigram index على الاسم المتطبّع.",
            "٤ مدرسين بهمزات وتشكيل وتاء مربوطة.",
            "«فاطمه» بالهاء لقت «فاطمة» بالتاء، لأن الاتنين اتطبّعوا.",
            "بحث بغلطة إملائية: درجة التشابه،",
            "من المدرسين،",
            "اللي تشابههم فوق الحد (0.3 افتراضيًا)،",
            "الأقرب الأول.",
            "من غير تطبيع: مفيش نتيجة، لأن المتخزن «أحمد» بهمزة."
          ]
        }
      ]
    },
    {
      t: "Prisma من الكود",
      l: 3,
      n: "نفس المتجر بس من TypeScript: إعداد Prisma 7، والـ schema والعلاقات، وتجيب وتكتب علاقات في query واحد، و SQL خام بأمان، و N+1",
      items: [
        {
          cmd: "إعداد Prisma 7",
          title: "prisma.config.ts و driver adapter والـ client المتولّد",
          desc: R`Prisma 7 غيّر طريقة الإعداد عن 5 و 6. تلات حاجات لازم تعرفها:

رابط القاعدة مبقاش في [[schema.prisma]]. بقى في ملف [[prisma.config.ts]] جنب package.json، وده اللي الـ CLI (migrate و generate) بيقراه. والملف ده مش بيقرا [[.env]] لوحده: لازم [[import "dotenv/config"]] في أوله.

الـ client مبقاش بيتولّد جوه node_modules. الـ generator الجديد [[prisma-client]] بيكتب كود TypeScript في فولدر انت بتحدده بـ [[output]]، وبتستورد منه: [[./generated/prisma/client]].

والـ client محتاج driver adapter: لـ Postgres هو [[@prisma/adapter-pg]]، وده بيستخدم مكتبة [[pg]] من تحت. بتعمل adapter برابط القاعدة وتدّيه لـ [[new PrismaClient({ adapter })]].

والمثال هنا نفس متجر التاب ده (users و orders و products و order_items)، بس جداول جديدة بتعملها Prisma في قاعدة فاضية.`,
          example: R`// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});

// prisma/schema.prisma (أول الملف)
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
}

// src/db.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter, log: ["query", "warn", "error"] });`,
          try: R`اعمل مشروع جديد في فولدر فاضي: [[npm init -y]]، و [[npm pkg set type=module]]، وسطّب [[prisma@7]] و [[tsx]] و [[dotenv]] كـ dev dependencies، و [[@prisma/client@7]] و [[@prisma/adapter-pg@7]] و [[pg]]. شغّل [[npx prisma init --datasource-provider postgresql --output ../src/generated/prisma]] وشوف اسم ملف الـ config اللي اتعمل. عدّل [[DATABASE_URL]] في .env يشاور على قاعدة فاضية في الـ lab (مثلًا [[createdb shop]])، وضيف model بسيط، وشغّل [[npx prisma migrate dev --name init]]. فيه فولدر [[src/generated]] اتعمل؟`,
          sol: R`بعد [[prisma init]] هتلاقي [[prisma/schema.prisma]] و [[.env]] وملف config. في آخر نسخ Prisma 7 (7.10 وقت كتابة الدرس) الملف بيتسمّى [[prisma7.config.ts]] مش [[prisma.config.ts]]، عشان الاسم ده هيبقى لـ Prisma 8. الاتنين بيتقروا في Prisma 7 وجواهم نفس الكلام، فلو المشروع أو الدروس بتقول prisma.config.ts متقلقش.

بعد [[migrate dev]] هتشوف [[Your database is now in sync with your schema]] وفولدر [[prisma/migrations/التاريخ_init/migration.sql]]. بس فولدر [[src/generated]] مش هيبقى موجود. من Prisma 7 الـ migrate مبقاش بيعمل generate لوحده، فلازم [[npx prisma generate]] وبعدها هتلاقي [[src/generated/prisma/client.ts]].

الأخطاء الشائعة: لو نسيت [[import "dotenv/config"]] في ملف الـ config، الـ CLI مش هيلاقي الرابط. ولو كتبت [[npm i -D prisma]] من غير [[@7]]، ممكن تنزل نسخة 8 (وقت كتابة الدرس الـ tag [[latest]] بتاع الـ CLI كان بيشاور على 8.0.0-rc)، و 8 ليها API مختلف تمامًا. ولو استوردت [[PrismaClient]] من [[@prisma/client]] بدل الفولدر المتولّد هيقولك إن الـ client مش متولّد. ولو السكربت فيه top-level await واشتكى من [[cjs]]، يبقى ناقصك [[type=module]] في package.json.`,
          solCode: R`mkdir shop-prisma && cd shop-prisma
npm init -y && npm pkg set type=module
npm i -D prisma@7 tsx dotenv
npm i @prisma/client@7 @prisma/adapter-pg@7 pg
npx prisma init --datasource-provider postgresql --output ../src/generated/prisma
# عدّل DATABASE_URL في .env، وضيف model في prisma/schema.prisma
npx prisma migrate dev --name init
npx prisma generate
ls src/generated/prisma
npx tsx src/main.ts`,
          flag: "script",
          deep: {
            why: "Prisma هو الـ ORM الأشهر في مشاريع Node و Next.js، وتقريبًا كل tutorial قديم على النت بيوريك إعداد 5 أو 6 (url جوه الـ schema، و import من @prisma/client). لو مشيت وراه على Prisma 7 هتقع في errors مش مفهومة. وفهم الأجزاء (CLI بيقرا config، و client بيتولّد، و adapter بيكلّم القاعدة) بيخليك تعرف المشكلة فين لما حاجة تقع.",
            how: R`في Prisma 7 الـ client اتكتب من غير الـ query engine القديم (binary مكتوب بـ Rust كان بيتحط جنب التطبيق). دلوقتي الـ client TypeScript بيبني SQL ويبعته عن طريق الـ driver adapter، و [[@prisma/adapter-pg]] بيستخدم pool من مكتبة [[pg]]. عشان كده الـ adapter إجباري، والـ bundle أصغر، ومفيش binary يختلف بين الماك والسيرفر.

[[prisma.config.ts]] للـ CLI بس: [[migrate]] و [[db pull]] و [[studio]] بيقروا منه رابط القاعدة ومكان الـ schema والـ migrations. التطبيق نفسه مش بيقراه. التطبيق بياخد الرابط من [[process.env.DATABASE_URL]] ويدّيه للـ adapter. يعني ممكن الاتنين يبقوا مختلفين: الـ CLI على رابط مباشر (direct) عشان الـ migrations، والتطبيق على رابط الـ pooler (زي Supabase، درس connection pooling في تاب «PostgreSQL»).

الـ generator [[prisma-client]] بيكتب ملفات [[.ts]] في الـ output. عشان كده التطبيق لازم يكون TypeScript أو يتشغّل بـ [[tsx]]، أو تبنيه بـ [[tsc]]. و [[src/generated]] حطه في [[.gitignore]] وولّده في الـ CI والـ Docker build بـ [[prisma generate]].

[[log: ["query"]]] بيطبع كل SQL الـ client بيبعته. ده أهم أداة عندك عشان تفهم Prisma بيعمل إيه، وهتستخدمه في درس N+1. خليه في التطوير بس.

وعمل instance واحد من PrismaClient للتطبيق كله (singleton) اتشرح في درس Prisma client في تاب «Backend بـ Node». والـ migrations (migrate dev على جهازك و migrate deploy على السيرفر) في درس Prisma migrate في تاب «PostgreSQL».`,
            when: "أي مشروع Node أو Next.js جديد بـ Postgres أو MySQL أو SQLite. في مشروع قديم على Prisma 6 خد النقل خطوة خطوة بدليل الـ upgrade الرسمي. و Prisma 8 وقت كتابة الدرس لسه RC و API بتاعه مختلف تمامًا، فمتبدأش بيه مشروع حقيقي لحد ما يبقى stable ويكون فيه دليل واضح.",
            mistakes: R`[[npm i prisma]] من غير version فتنزل major مش هي اللي انت متوقعها. ناسي [[dotenv/config]]. [[prisma generate]] مش في الـ build، فالسيرفر يقوم من غير client. الـ generated في git فيحصل conflicts. [[migrate dev]] على الإنتاج (بيقترح reset ويمسح الداتا). وتعدّل ملف migration اتطبق قبل كده: Prisma بيحسب checksum لكل ملف، فهيقولك إن الـ migration اتغيرت ويطلب reset. أي تصليح بيبقى migration جديدة.`
          },
          lines: [
            "حمّل .env في process.env، لأن الـ config مش بيعملها لوحده.",
            "دالة الإعداد من Prisma.",
            "الإعداد:",
            "مكان الـ schema،",
            "ومكان فولدر الـ migrations،",
            "ورابط القاعدة اللي الـ CLI هيستخدمه.",
            "قفلة.",
            "الـ generator الجديد:",
            "prisma-client بدل prisma-client-js القديم،",
            "والكود المتولّد يتكتب هنا (المسار نسبةً لملف الـ schema).",
            "قفلة.",
            "نوع القاعدة، ومفيش url هنا خلاص.",
            "postgresql.",
            "قفلة.",
            "في التطبيق: حمّل .env برضه.",
            "الـ driver adapter بتاع Postgres.",
            "الـ client من الفولدر المتولّد، مش من @prisma/client.",
            "adapter برابط القاعدة (بيعمل pool من pg).",
            "client واحد للتطبيق كله، وبيطبع كل SQL بيتبعت."
          ]
        },
        {
          cmd: "schema.prisma",
          title: "models و @relation و onDelete و @@index",
          desc: R`كل [[model]] في [[schema.prisma]] بيبقى جدول، وكل سطر جواه عمود: الاسم، والنوع، وبعدين attributes بـ [[@]]. ومن الملف ده Prisma بيعمل حاجتين: الـ migrations (الـ SQL)، والـ types في الـ client.

العلاقة ليها ناحيتين: في [[Order]] عمود حقيقي [[userId]] ومعاه [[user User @relation(fields: [userId], references: [id])]] (ده FK)، وفي [[User]] سطر [[orders Order[]]] مالوش عمود في القاعدة: موجود بس عشان تقدر تكتب [[include: { orders: true }]].

و [[@map]] و [[@@map]] بيخلّوا الأسماء في TypeScript زي [[createdAt]] وفي القاعدة [[created_at]]، فالـ SQL الخام يفضل snake_case زي باقي التاب.`,
          example: R`model User {
  id        String   @id @default(uuid()) @db.Uuid
  email     String   @unique
  name      String
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz
  orders    Order[]

  @@map("users")
}

model Order {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id") @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Restrict)
  status    String   @default("pending")
  total     Decimal  @default(0) @db.Decimal(10, 2)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz

  @@index([userId, createdAt(sort: Desc)])
  @@map("orders")
}`,
          try: R`حط الموديلين في الـ schema وشغّل [[migrate dev]]، وافتح [[migration.sql]] ودوّر على: الـ FOREIGN KEY وفيه ON DELETE إيه، والـ index المركّب، ونوع عمود total. وبعدين غيّر [[onDelete: Restrict]] لـ [[Cascade]] واعمل migration تانية واقرا الـ SQL بتاعها. وآخر حاجة: اعمل يوزر وأوردر ليه من الكود، وجرّب [[prisma.user.delete]] مع Restrict، واطبع [[e.code]].`,
          sol: R`في الـ migration الأولى هتلاقي [[CREATE TABLE "users"]] و [[CREATE TABLE "orders"]] بأسماء snake_case (بسبب [[@map]])، و [[CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at" DESC)]]، و [[ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE]]، و total نوعه [[DECIMAL(10,2)]].

الـ migration التانية هتبقى [[DROP CONSTRAINT]] وبعده [[ADD CONSTRAINT]] بنفس الاسم بس [[ON DELETE CASCADE]]. وده بيوريك إن تغيير سطر في الـ schema ممكن يبقى أكتر من أمر SQL، فاقرا الملف قبل ما تعمله commit.

والمسح مع Restrict هيفشل، و [[e.code]] هيبقى [[P2003]] (Foreign key constraint violated on the constraint orders_user_id_fkey). في الـ error handler حوّله لـ 409 برسالة زي «اليوزر ده عنده أوردرات». ولو قريت الرسالة وملقيتش P2003، اتأكد إن الـ migration الأولى هي اللي متطبقة مش التانية.`,
          solCode: R`// src/try-delete.ts
import { prisma } from "./db";

const user = await prisma.user.create({
  data: { email: "ali@example.com", name: "Ali", orders: { create: { total: 250 } } },
});
try {
  await prisma.user.delete({ where: { id: user.id } });
} catch (e: any) {
  console.log(e.code);
}
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "الـ schema هو المصدر الوحيد للحقيقة: منه بتطلع الجداول في القاعدة، والـ types اللي بتحميك في الكود. أي غلطة فيه (FK من غير index، أو onDelete غلط، أو Float للفلوس) بتتحول لجدول غلط في الإنتاج، وتصليحها بعد ما يبقى فيه داتا أصعب بكتير.",
            how: R`الأنواع: [[String]] بيبقى [[text]]، و [[Int]] بيبقى [[integer]]، و [[BigInt]] بيبقى [[bigint]] (وبيرجع JavaScript bigint، ودي مبتتحولش JSON لوحدها)، و [[Decimal]] بيبقى [[numeric]] (وبيرجع object من نوع Decimal مش number، درس numeric للفلوس)، و [[DateTime]] بيبقى timestamp. و [[@db.Timestamptz]] و [[@db.Uuid]] و [[@db.Decimal(10, 2)]] بيحددوا النوع الـ native بالظبط. من غيرهم DateTime بيبقى [[timestamp(3)]] من غير tz، ودي المشكلة اللي في درس أنواع الأعمدة.

[[@id]] الـ primary key، و [[@@id([a, b])]] مفتاح مركّب. [[@default(uuid())]] الـ id بيتولّد من الـ client، و [[@default(dbgenerated("gen_random_uuid()"))]] بيخلي القاعدة هي اللي تولّده. [[@unique]] و [[@@unique([a, b])]] بيعملوا unique constraint.

[[@relation(fields: [userId], references: [id])]] بيتكتب في الناحية اللي فيها العمود. [[onDelete]]: [[Cascade]] و [[Restrict]] و [[SetNull]] (العمود لازم يبقى optional بـ [[?]]) و [[NoAction]]. الافتراضي لو العلاقة إجبارية [[Restrict]]، ولو optional [[SetNull]]. نفس معاني درس ON DELETE في المستوى التاني.

مهم: Prisma على Postgres مش بيعمل index لوحده على عمود الـ FK. [[@@index([userId])]] انت اللي بتكتبه. والـ index المركّب [[(userId, createdAt DESC)]] بيخدم «أوردرات يوزر مترتبة بالأحدث» زي درس composite index.

[[status String]] ولا [[enum]]؟ الـ enum في Prisma بيبقى [[CREATE TYPE ... AS ENUM]] في Postgres، وده صعب تشيل منه قيمة بعدين. كتير من الفرق بتفضّل String ومعاه CHECK في migration بإيدها، أو validation في الكود.`,
            when: "مع كل تغيير في الداتا: عدّل الـ schema، وشغّل migrate dev، واقرا الـ SQL، وبعدين commit للاتنين مع بعض. ولو القاعدة موجودة قبل Prisma: [[prisma db pull]] بيكتب الـ schema منها.",
            mistakes: R`[[Float]] للفلوس. [[DateTime]] من غير [[@db.Timestamptz]]. FK من غير [[@@index]]. [[onDelete: Cascade]] على علاقة فيها فلوس (مسح يوزر يمسح أوردراته وفواتيره). أسماء PascalCase من غير [[@@map]]، وبعدين تكتب SQL خام فتحتاج [["User"]] بتنصيص في كل حتة. [[@updatedAt]] وتفتكر إنه trigger في القاعدة: ده الـ client بيحطه، فالتعديل من psql مش بيحدّثه (درس CREATE TRIGGER). وفي الانترفيو: «ليه onDelete Restrict للأوردرات؟» عشان مسح يوزر بالغلط ميضيّعش تاريخ المبيعات، والأحسن soft delete.`
          },
          lines: [
            "model User = جدول.",
            "id نص بيتخزن uuid، وبيتولّد لوحده.",
            "الإيميل unique.",
            "الاسم إجباري (من غير ? يعني NOT NULL).",
            "createdAt في الكود، و created_at في القاعدة، ونوعه timestamptz.",
            "الناحية التانية من العلاقة: مالهاش عمود، بس بتخليك تعمل include للأوردرات.",
            "اسم الجدول في القاعدة users.",
            "قفلة.",
            "model Order.",
            "id رقم متسلسل.",
            "العمود الحقيقي للـ FK: user_id في القاعدة.",
            "العلاقة: userId بيشاور على User.id، ومسح يوزر عنده أوردرات مرفوض.",
            "الحالة نص، وافتراضيًا pending.",
            "الفلوس Decimal(10,2)، مش Float.",
            "وقت الإنشاء timestamptz.",
            "index مركّب: أوردرات اليوزر بالأحدث.",
            "اسم الجدول orders.",
            "قفلة."
          ]
        },
        {
          cmd: "علاقات Prisma",
          title: "one-to-many و many-to-many: implicit ولا explicit join table",
          desc: R`one-to-many اتشرحت في الدرس اللي فات: FK في ناحية، و [[Model[]]] في الناحية التانية.

many-to-many في Prisma ليها طريقتين:

implicit: بتكتب [[tags Tag[]]] في Product و [[products Product[]]] في Tag، و Prisma بيعمل جدول ربط لوحده اسمه [[_ProductToTag]] بعمودين [[A]] و [[B]]، ومبتشوفوش في الكود خالص.

explicit: بتعمل انت model للربط، زي [[OrderItem]] بين Order و Product. ده لازم لما الربط نفسه ليه داتا: الكمية وسعر الوحدة وقت الشرا. وده نفس جدول order_items في درس many-to-many في المستوى التاني.

القاعدة: لو الربط ممكن يحتاج أي عمود في يوم من الأيام (وقت الإضافة، مين ضافه، ترتيب)، ابدأ explicit. التحويل من implicit لـ explicit بعدين migration مش لطيفة.`,
          example: R`model Product {
  id    Int         @id @default(autoincrement())
  name  String
  price Decimal     @db.Decimal(10, 2)
  stock Int         @default(0)
  items OrderItem[]
  tags  Tag[]

  @@map("products")
}

model OrderItem {
  orderId   Int     @map("order_id")
  productId Int     @map("product_id")
  quantity  Int
  unitPrice Decimal @map("unit_price") @db.Decimal(10, 2)
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
  @@index([productId])
  @@map("order_items")
}

model Tag {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  products Product[]

  @@map("tags")
}`,
          try: R`ضيف الموديلات دي، وضيف في Order السطر [[items OrderItem[]]]. شغّل migrate dev واقرا الـ SQL: الجدول الـ implicit اسمه إيه وأعمدته إيه وعليه إيه؟ وبعدين من الكود: اعمل منتج بتاجين، وشيل تاج منه بـ [[disconnect]]، وهات المنتجات اللي فيها تاج معين.`,
          sol: R`في الـ SQL هتلاقي [[CREATE TABLE "_ProductToTag" ("A" INTEGER NOT NULL, "B" INTEGER NOT NULL, CONSTRAINT "_ProductToTag_AB_pkey" PRIMARY KEY ("A","B"))]] و [[CREATE INDEX "_ProductToTag_B_index"]]، واتنين FOREIGN KEY بـ [[ON DELETE CASCADE]]. [[A]] بيشاور على الموديل اللي اسمه أول أبجديًا (Product) و [[B]] على التاني (Tag). يعني الأسماء مش واضحة لو كتبت SQL خام عليه، وده من أسباب إن ناس كتير بتفضّل explicit.

ومن الكود: [[tags: { connectOrCreate: [...] }]] وقت الإنشاء، و [[tags: { disconnect: { name: "kitchen" } }]] في update بيمسح صف الربط بس (التاج نفسه بيفضل موجود)، و [[where: { tags: { some: { name: "kitchen" } } }]] بيجيب المنتجات اللي فيها التاج.

لو الـ migrate اشتكى إن Order ناقصه العلاقة التانية ([[The relation field order on model OrderItem is missing an opposite relation field]])، يبقى نسيت [[items OrderItem[]]] في Order. كل علاقة في Prisma لازم يكون ليها الناحيتين.`,
          solCode: R`import { prisma } from "./db";

const tag = (name: string) => ({ where: { name }, create: { name } });
const mug = await prisma.product.create({
  data: { name: "Mug", price: 120, stock: 15, tags: { connectOrCreate: [tag("kitchen"), tag("gift")] } },
  include: { tags: true },
});
console.log(mug.tags.map((t) => t.name));

await prisma.product.update({ where: { id: mug.id }, data: { tags: { disconnect: { name: "gift" } } } });

const kitchen = await prisma.product.findMany({
  where: { tags: { some: { name: "kitchen" } } },
  select: { name: true },
});
console.log(kitchen);
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "تقريبًا كل مشروع فيه many-to-many: منتجات وتاجات، وطلاب وكورسات، ويوزرز وأدوار. والاختيار بين implicit و explicit بيتعمل في أول يوم، وبيفرق جدًا بعد سنة لما حد يطلب «امتى الطالب اشترك في الكورس؟» ومفيش مكان تخزن فيه التاريخ.",
            how: R`الـ implicit: Prisma بيدير جدول [[_AToB]] بالكامل. [[connect]] بيضيف صف فيه، و [[disconnect]] بيمسحه، و [[set: [...]]] بيستبدل كل الروابط. والـ include بيعدّي عليه لوحده: [[include: { tags: true }]] بيرجّع التاجات على طول.

الـ explicit: جدول عادي وليه model، والمفتاح غالبًا مركّب [[@@id([orderId, productId])]] (فمينفعش نفس المنتج يتكرر في نفس الأوردر). والـ include بيبقى مستويين: [[include: { items: { include: { product: true } } }]]. وبتضيف وتشيل بـ [[create]] و [[delete]] على الـ OrderItem نفسه.

الـ [[@@index([productId])]]: الـ primary key [[(orderId, productId)]] بيخدم البحث بـ orderId (أول عمود)، بس البحث بـ productId لوحده («المنتج ده اتباع في أنهي أوردرات») محتاج index تاني. نفس فكرة درس composite index. في الـ implicit، Prisma بيعمل index على B لوحده.

[[onDelete: Cascade]] من OrderItem لـ Order: مسح الأوردر بيمسح بنوده. ومن غير onDelete لـ Product، يعني Restrict: مينفعش تمسح منتج اتباع قبل كده. ودي نفس قرارات درس ON DELETE.

وفيه كمان self-relation (يوزر بيتابع يوزر، أو موظف ومديره): العلاقة على نفس الـ model، ومحتاجة اسم [[@relation("Manager")]] على الناحيتين عشان Prisma يفرّق بينهم.`,
            when: "implicit: ربط بسيط مش هيحتاج أي بيانات إضافية ومش هتكتب عليه SQL خام كتير (تاجات، وفئات). explicit: أي حاجة فيها كمية، أو سعر، أو تاريخ، أو دور، أو ترتيب (بنود أوردر، واشتراك في كورس، وعضوية في فريق بدور).",
            mistakes: R`implicit لبنود الأوردر فمفيش مكان للكمية. تنسى الناحية التانية من العلاقة فالـ schema ميتعملوش validate. explicit من غير unique على الزوج، فنفس المنتج يتضاف مرتين. تكتب SQL خام على [[_ProductToTag]] وتنسى إن A و B بيتحددوا بالترتيب الأبجدي. وفي الانترفيو: «إزاي بتعمل many-to-many في قاعدة relational؟» جدول وسيط فيه FK للطرفين ومفتاح مركّب، والـ ORM بيخفيه بس هو موجود.`
          },
          lines: [
            "model Product.",
            "id متسلسل.",
            "الاسم.",
            "السعر Decimal.",
            "المخزون.",
            "بنود الأوردرات اللي فيها المنتج (ناحية الـ explicit).",
            "التاجات: many-to-many implicit، Prisma بيعمل جدول الربط لوحده.",
            "الجدول products.",
            "قفلة.",
            "جدول الربط explicit: بند في أوردر.",
            "عمود الأوردر.",
            "عمود المنتج.",
            "الكمية: داتا خاصة بالربط نفسه.",
            "سعر الوحدة وقت الشرا.",
            "العلاقة بالأوردر، ومسح الأوردر يمسح بنوده.",
            "العلاقة بالمنتج، ومسح منتج اتباع مرفوض (Restrict).",
            "مفتاح مركّب: المنتج مرة واحدة في كل أوردر.",
            "index للبحث بالمنتج لوحده.",
            "الجدول order_items.",
            "قفلة.",
            "model Tag.",
            "id.",
            "اسم التاج unique (عشان connectOrCreate بالاسم).",
            "الناحية التانية من الـ many-to-many.",
            "الجدول tags.",
            "قفلة."
          ]
        },
        {
          cmd: "include و select",
          title: "هات العلاقات والحقول اللي محتاجها بس",
          desc: R`[[findMany]] من غير حاجة بيرجّع كل أعمدة الجدول ومن غير أي علاقات.

[[include]] بيضيف علاقات فوق كل الأعمدة: [[include: { user: true }]] يرجّع الأوردر كامل ومعاه اليوزر كامل.

[[select]] بيحدد بالظبط إيه اللي يرجع، أعمدة وعلاقات، ولأي عمق: [[select: { id: true, user: { select: { email: true } } }]]. والـ type اللي بيرجع بيتغير على حسب اللي اخترته، فلو حاولت تقرا حاجة مطلبتهاش، TypeScript هيقولك قبل ما تشغّل.

القاعدة: في الـ API استخدم select. الأسرع (أعمدة أقل)، والأأمن (مفيش [[passwordHash]] بيتسرّب في رد)، والرد شكله ثابت. ومينفعش select و include في نفس المستوى، بس ينفع include جوه select أو العكس في مستوى أعمق.`,
          example: R`const orders = await prisma.order.findMany({
  where: { status: "pending" },
  orderBy: { createdAt: "desc" },
  take: 20,
  select: {
    id: true,
    total: true,
    user: { select: { email: true } },
    items: { select: { quantity: true, product: { select: { name: true } } } },
  },
});

const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: { user: true, items: { include: { product: true } } },
});

const user = await prisma.user.findUnique({
  where: { email: "ali@example.com" },
  include: { orders: { where: { status: "paid" }, orderBy: { createdAt: "desc" }, take: 3 } },
});`,
          try: R`شغّل الاستعلام الأول والتاني و [[log: ["query"]]] شغال، وعدّ كام SQL اتبعت لكل واحد وإيه الأعمدة اللي اتطلبت. وبعدين حاول في الاستعلام الأول تقرا [[orders[0].status]] وشوف TypeScript قال إيه. وجرّب تحط select و include مع بعض في نفس المستوى.`,
          sol: R`الاستعلام الأول هيطلّع كذا SQL (واحد للأوردرات، وواحد لليوزرز، وواحد للبنود، وواحد للمنتجات)، وكل واحد فيه [[WHERE ... IN ($1, $2, ...)]] بالـ ids اللي جات من اللي قبله، مش استعلام لكل أوردر. وفي SELECT هتلاقي الأعمدة اللي طلبتها بس، ومعاها الـ ids اللي Prisma محتاجها عشان يربط النتايج ببعض.

التاني نفس عدد الاستعلامات بس بـ [[SELECT]] لكل الأعمدة في كل جدول.

[[orders[0].status]]: TypeScript هيطلّع [[Property 'status' does not exist on type]]، لأن الـ type اتبنى من الـ select. ده بيمنعك تعتمد على حقل مش جاي. ولو بتكتب JavaScript من غير types، القيمة هتبقى [[undefined]] من غير أي error، وده بيبقى bug صعب تلاقيه.

و select مع include في نفس المستوى: [[Please either use include or select, but not both at the same time]]. لو محتاج أعمدة معينة وعلاقة: select للأعمدة، وجواه [[user: { select: {...} }]] أو [[user: true]].`,
          solCode: R`// نفس الـ client بـ log: ["query"]
const orders = await prisma.order.findMany({
  where: { status: "pending" },
  select: { id: true, total: true, user: { select: { email: true } } },
});
console.log(orders[0]?.total.toString());

await prisma.order.findMany({ select: { id: true }, include: { user: true } } as any)
  .catch((e) => console.log(e.message.split("\n").at(-1)));`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل الأداء مع ORM بتيجي من إنه بيجيب أكتر من اللازم: كل الأعمدة (ومنها jsonb تقيل أو نص طويل) وعلاقات مش محتاجها. وأغلب تسريبات البيانات في APIs بتيجي من [[res.json(user)]] على object فيه hash الباسورد أو توكن. select بيحل الاتنين من نفس المكان.",
            how: R`Prisma 7 بيطلّع لكل مستوى من العلاقات استعلام منفصل بـ [[IN]] (زي اللي بتشوفه في الـ log). يعني include بـ ٣ مستويات = ٤ استعلامات، مهما كان عدد الصفوف. ده مش N+1: عدد الاستعلامات ثابت. بس لو المستوى الأول رجّع ١٠ آلاف صف، الـ [[IN]] بتاع المستوى التاني هيبقى فيه ١٠ آلاف قيمة، فخلي [[take]] دايمًا موجود.

جوه include أو select لعلاقة many، تقدر تكتب [[where]] و [[orderBy]] و [[take]] و [[skip]] للأولاد بس: «آخر ٣ أوردرات مدفوعة». وده بيطبّق الـ take على كل أب لوحده في النتيجة.

والأنواع: [[Decimal]] بيرجع object ([[Prisma.Decimal]])، فـ [[JSON.stringify]] بيحوّله string زي [["250"]]، و [[BigInt]] بيوقّع JSON.stringify خالص. و [[DateTime]] بيرجع Date.

ولو نفس الـ select بيتكرر، اعمله ثابت واحد: [[const orderListSelect = { id: true, total: true } satisfies Prisma.OrderSelect]]، واستخدم [[Prisma.OrderGetPayload<{ select: typeof orderListSelect }>]] عشان تجيب الـ type بتاع النتيجة.

وفيه [[omit]] (موجود في Prisma من 6.2): [[omit: { passwordHash: true }]] على الـ query، أو على مستوى الـ client كله، بيرجّع كل الأعمدة ماعدا دي. مفيد لما الأعمدة كتير والممنوع حاجة واحدة.`,
            when: "select في كل endpoint بيرجّع داتا للعميل. include في الكود الداخلي (سكربتات، و jobs، و tests) لما محتاج الـ object كامل. و omit لما فيه عمود حساس لازم ميطلعش أبدًا من غير ما تعدّ باقي الأعمدة.",
            mistakes: R`[[include: { user: true }]] في رد API فالـ hash يطلع. include متداخل ٤ مستويات من غير take فيرجع ميجات. [[findMany]] من غير take على جدول بيكبر. [[JSON.stringify]] على نتيجة فيها BigInt. وتفتكر إن include بيعمل JOIN واحد، وهو في الحقيقة استعلام لكل مستوى. وفي الانترفيو: «إيه الفرق بين include و select في Prisma؟» include بيضيف علاقات فوق كل الأعمدة، و select بيحدد كل حاجة بالظبط وبيغيّر الـ type.`
          },
          lines: [
            "قايمة أوردرات لصفحة الأدمن:",
            "الـ pending بس،",
            "الأحدث الأول،",
            "٢٠ بس.",
            "والحقول دي بالظبط:",
            "رقم الأوردر،",
            "والإجمالي،",
            "وإيميل صاحبه بس (مش كل بيانات اليوزر)،",
            "والبنود: الكمية واسم المنتج.",
            "قفلة الـ select.",
            "قفلة.",
            "صفحة أوردر واحد في الكود الداخلي:",
            "بالـ id،",
            "كل الأعمدة، ومعاها اليوزر كامل، والبنود وجوا كل بند المنتج كامل.",
            "قفلة.",
            "يوزر ومعاه:",
            "بالإيميل،",
            "آخر ٣ أوردرات مدفوعة ليه بس (فلتر وترتيب وحد على الأولاد).",
            "قفلة."
          ]
        },
        {
          cmd: "nested writes",
          title: "اعمل أوردر ببنوده في أمر واحد: create و connect و connectOrCreate",
          desc: R`بدل ما تعمل الأوردر وتاخد الـ id وبعدين تعمل البنود واحد واحد، Prisma بيخليك تكتب الأب والأولاد في أمر واحد، وبيحطهم في transaction واحدة: يا كلهم يتكتبوا، يا ولا حاجة.

جوه علاقة في [[data]] عندك:

[[create]] اعمل صف جديد مربوط (الأوردر ومعاه بنوده).

[[connect]] اربط بصف موجود بمفتاح unique ([[product: { connect: { id: 5 } }]]).

[[connectOrCreate]] اربط لو موجود، واعمله لو مش موجود (التاج بالاسم).

وفي update كمان: [[disconnect]] و [[set]] و [[update]] و [[delete]] و [[deleteMany]] على الأولاد.`,
          example: R`const user = await prisma.user.create({
  data: {
    email: "ali@example.com",
    name: "Ali",
    orders: {
      create: {
        total: 300,
        items: {
          create: [
            { product: { connect: { id: mugId } }, quantity: 1, unitPrice: 120 },
            { product: { connect: { id: capId } }, quantity: 1, unitPrice: 180 },
          ],
        },
      },
    },
  },
  include: { orders: { include: { items: true } } },
});

await prisma.product.update({
  where: { id: mugId },
  data: { tags: { connectOrCreate: [{ where: { name: "gift" }, create: { name: "gift" } }] } },
});

await prisma.order.update({
  where: { id: orderId },
  data: { items: { deleteMany: {}, create: [{ product: { connect: { id: mugId } }, quantity: 2, unitPrice: 120 }] } },
});`,
          try: R`اعمل يوزر بأوردر فيه بندين زي المثال و [[log: ["query"]]] شغال، وشوف الـ SQL: الكتابة كلها بتخلص بـ COMMIT واحد؟ وبعدين اعمله تاني بس خلّي بند منهم يشاور على [[id: 999999]] (منتج مش موجود): اليوزر اتعمل ولا لأ؟ وجرّب تكتب بند بـ [[productId: mugId]] والتاني بـ [[product: { connect: ... }]] في نفس الـ array.`,
          sol: R`في الـ log هتلاقي INSERT في users، و INSERT في orders، وقبل كل بند SELECT صغير بيتأكد إن المنتج موجود (ده الـ connect)، و INSERT في order_items، وبعدين الـ SELECTs بتاعة الـ include، وفي الآخر [[COMMIT]] واحد. يعني الكتابة كلها transaction واحدة (الـ BEGIN نفسه مش بيظهر في الـ log، بس الـ COMMIT والـ ROLLBACK بيظهروا).

مع المنتج اللي مش موجود هتاخد [[P2025]] (فيه سجل مطلوب للـ connect ملقاهوش)، وهتلاقي [[ROLLBACK]] في الـ log. و [[prisma.user.count()]] مش هيزيد: اليوزر والأوردر اترجعوا مع البند.

والخلط بين الشكلين في نفس الـ array هيطلع validation error زي [[Argument product is missing]]. Prisma عنده شكلين للـ input: «checked» بالعلاقات ([[product: { connect }]]) و «unchecked» بالـ ids الخام ([[productId]]). الشكل بيتحدد للـ create كله، فاختار واحد والتزم بيه. والـ unchecked ([[productId]]) مش متاح لما تكون جوه nested create للأب، لأن [[orderId]] لسه مش معروف.`,
          solCode: R`import { prisma } from "./db";

const before = await prisma.user.count();
try {
  await prisma.user.create({
    data: {
      email: "fail@example.com",
      name: "Fail",
      orders: { create: { total: 100, items: { create: [{ product: { connect: { id: 999999 } }, quantity: 1, unitPrice: 100 }] } } },
    },
  });
} catch (e: any) {
  console.log(e.code);
}
console.log(before === (await prisma.user.count()));
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "«اعمل أوردر ببنوده» هي أهم عملية في أي متجر، ولو اتكتبت خطوات منفصلة من غير transaction، أي error في النص بيسيب أوردر من غير بنود أو بنود من غير أوردر. الـ nested write بيدّيك الـ transaction ببلاش، والكود بيبان زي شكل الداتا.",
            how: R`Prisma بيحوّل الـ nested write لسلسلة INSERTs جوه transaction: الأب الأول عشان ياخد الـ id، وبعدين الأولاد بالـ id ده. عشان كده في nested create مبتكتبش [[orderId]] أبدًا.

[[connect]] محتاج حقل unique ([[id]] أو [[email]] أو [[@unique]] تاني). لو الصف مش موجود: P2025 والكل يترجع.

[[connectOrCreate]] بيعمل SELECT وبعدين INSERT لو ملقاش. لو طلبين في نفس اللحظة عملوا نفس التاج، واحد منهم ممكن ياخد P2002 (unique). لو ده متوقع كتير (زي تاجات بيكتبها اليوزرز)، اعمل [[upsert]] على التاج الأول أو اعمل retry.

[[createMany]] أسرع بكتير للكميات الكبيرة (INSERT واحد بكل الصفوف)، بس مبيعملش nested للأولاد. ومن Prisma 5.14 فيه [[createManyAndReturn]] بيرجّع الصفوف.

الـ nested write مش بيحل مشكلة المخزون. «اخصم المخزون بشرط يكون كفاية» لسه محتاج [[updateMany]] بـ [[where: { stock: { gte: qty } }]] و [[data: { stock: { decrement: qty } }]] جوه [[$transaction]] التفاعلية، وتتأكد إن [[count]] مش صفر (درس atomic UPDATE، ودرس $transaction في تاب «Backend بـ Node»).

وفي update: [[deleteMany: {}]] جوه علاقة بيمسح كل أولاد الأب ده بس (مش الجدول كله)، وبعده [[create]] بيضيف الجداد. ده أبسط طريقة «استبدل البنود» في transaction واحدة.`,
            when: "أي إنشاء لأب وأولاده مع بعض (أوردر وبنوده، وبوست وتاجاته، ويوزر وبروفايله)، وربط بحاجات موجودة وقت الإنشاء. أما آلاف الصفوف مرة واحدة (import أو seed) فـ createMany.",
            mistakes: R`[[await]] في loop على البنود بعد ما الأوردر يتعمل من غير transaction. خلط [[productId]] مع [[product: { connect }]]. [[connectOrCreate]] على قيمة مش unique. تفتكر إن [[deleteMany: {}]] جوه nested update بيمسح الجدول كله (لأ، أولاد الأب ده بس)، والعكس: [[prisma.orderItem.deleteMany({})]] من برّه بيمسح الجدول كله فعلًا. وتثق في السعر اللي جاي من العميل في [[unitPrice]] بدل ما تقراه من المنتج في السيرفر.`
          },
          lines: [
            "اعمل يوزر، وكل اللي تحت في transaction واحدة:",
            "البيانات:",
            "الإيميل،",
            "والاسم،",
            "والأوردرات:",
            "اعمل أوردر جديد مربوط بيه:",
            "بإجمالي ٣٠٠،",
            "والبنود:",
            "اعمل بنود جديدة مربوطة بالأوردر:",
            "بند مربوط بمنتج موجود (connect بالـ id)،",
            "وبند تاني.",
            "قفلة الـ array.",
            "قفلة items.",
            "قفلة الأوردر.",
            "قفلة orders.",
            "قفلة data.",
            "ورجّع اليوزر ومعاه أوردراته وبنودها.",
            "قفلة.",
            "في update:",
            "على المنتج ده،",
            "اربط تاج gift لو موجود، واعمله لو مش موجود.",
            "قفلة.",
            "استبدل بنود أوردر:",
            "الأوردر ده،",
            "امسح بنوده كلها، وضيف بند جديد، في transaction واحدة.",
            "قفلة."
          ]
        },
        {
          cmd: "relation filters",
          title: "فلتر بالعلاقات: some و every و none و _count",
          desc: R`عايز «اليوزرز اللي عملوا أوردر مدفوع»؟ ده فلتر على اليوزر بشرط في جدول تاني. في SQL ده [[EXISTS]] (درس EXISTS)، وفي Prisma:

[[some]] فيه ولد واحد على الأقل بيحقق الشرط. [[none]] مفيش ولا ولد بيحققه. [[every]] كل الأولاد بيحققوه. وللعلاقة الـ one (زي [[order.user]]) بتستخدم [[is]] و [[isNot]].

و [[_count]] بيرجّع عدد الأولاد من غير ما يجيبهم: [[select: { _count: { select: { orders: true } } }]]. وتقدر ترتب بيه: [[orderBy: { orders: { _count: "desc" } }]].`,
          example: R`const buyers = await prisma.user.findMany({
  where: { orders: { some: { status: "paid", total: { gte: 100 } } } },
  select: { email: true },
});

const neverOrdered = await prisma.user.findMany({ where: { orders: { none: {} } } });

const allPaid = await prisma.user.findMany({
  where: { orders: { some: {}, every: { status: "paid" } } },
});

const kitchen = await prisma.product.findMany({ where: { tags: { some: { name: "kitchen" } } } });

const topCustomers = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: true } } },
  orderBy: { orders: { _count: "desc" } },
  take: 10,
});`,
          try: R`اعمل يوزر جديد معملش ولا أوردر، وشغّل [[where: { orders: { every: { status: "paid" } } }]] من غير [[some: {}]]. اليوزر الجديد طلع؟ ليه؟ وبعدين هات لكل يوزر عدد أوردراته المدفوعة بس في [[_count]]، وشوف الـ SQL اللي اتولّد لـ [[none]] في الـ log. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: اكتب بـ SQL اللي Prisma بيعمله لـ [[{ some: {}, every: { status: "paid" } }]]: إيميلات اليوزرز اللي عندهم أوردر واحد على الأقل وكل أوردراتهم [[paid]]. اليوزر اللي ملوش أوردرات مينفعش يطلع.`,
          sol: R`أيوه، اليوزر اللي ملوش أوردرات هيطلع في نتيجة [[every]]. في المنطق، «كل أوردراته مدفوعة» صح لما ميكونش عنده أوردرات أصلًا (vacuous truth)، و Prisma بيترجمها لـ [[NOT EXISTS (أوردر مش مدفوع)]]، واليوزر ده مفيش عنده أوردر مش مدفوع. عشان كده في المثال فيه [[some: {}]] مع every: «عنده أوردر واحد على الأقل، وكلهم مدفوعين».

عدد المدفوع بس: [[_count: { select: { orders: { where: { status: "paid" } } } }]]. اليوزر اللي ملوش هيطلع [[0]] مش null.

والـ SQL بتاع none هتلاقي فيه [[NOT EXISTS]] أو [[NOT IN]] على subquery من orders، نفس اللي كتبته بإيدك في درس EXISTS. الشكل بالظبط ممكن يختلف بين النسخ، المهم إنه استعلام واحد مش استعلام لكل يوزر.`,
          solCode: R`await prisma.user.create({ data: { email: "new@example.com", name: "New" } });

const everyOnly = await prisma.user.findMany({
  where: { orders: { every: { status: "paid" } } },
  select: { email: true },
});
console.log(everyOnly);

const paidCounts = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: { where: { status: "paid" } } } } },
});
console.log(paidCounts);`,
          flag: "script",
          deep: {
            why: "الشاشات والتقارير مليانة الأسئلة دي: «العملاء اللي اشتروا المنتج ده»، «اليوزرز اللي سجلوا ومعملوش ولا أوردر» (عشان تبعتلهم خصم)، «الكورسات اللي فيها طلاب». من غير relation filters بتجيب كل اليوزرز وأوردراتهم وتفلتر في JavaScript، وده بيبقى أبطأ مع كل يوزر جديد.",
            how: R`كل relation filter بيتحول subquery في نفس الـ SQL ([[EXISTS]] أو [[IN]])، فالقاعدة هي اللي بتفلتر، ومع index على الـ FK بيبقى سريع.

[[some: {}]] من غير شرط = «عنده أي ولد». [[none: {}]] = «ملوش ولا ولد». وتقدر تتداخل: [[orders: { some: { items: { some: { productId: 5 } } } }]] = «اشترى المنتج ٥ في أي أوردر».

[[every]] بيرجّع الأب اللي ملوش أولاد خالص، وده بيفاجئ ناس كتير. لو ده مش قصدك، ضيف [[some: {}]] جنبه.

[[_count]] بيتحسب جوه نفس الاستعلام (JOIN على subquery فيها [[COUNT(*)]] مجمّعة بالـ FK) من غير ما يجيب الصفوف. و [[_count]] ينفع في [[include]] كمان، وفيه [[where]] من Prisma 4.16.

لتجميعات أكتر (مجموع ومتوسط): [[prisma.order.aggregate]] و [[prisma.order.groupBy({ by: ["status"], _sum: { total: true } })]]. ولو التقرير فيه JOIN و CASE و date_trunc مع بعض، اكتبه SQL بـ $queryRaw (الدرس الجاي) بدل ما تحاول تلوي الـ API.`,
            when: "فلترة بوجود أو عدم وجود أولاد، وعرض عدادات («٣ أوردرات»، «١٢ طالب») جنب كل صف، وترتيب بالأكتر نشاط.",
            mistakes: R`every من غير some فتطلع يوزرز ملهمش أوردرات. تجيب الأولاد كلهم عشان تعرف [[.length]] بدل [[_count]]. [[include: { orders: true }]] وبعدين [[filter]] في JavaScript. شرط على علاقة one بـ some (هي [[is]]). ومن غير index على الـ FK، كل subquery بتقرا جدول الأوردرات كله.`
          },
          lines: [
            "اليوزرز اللي عندهم:",
            "أوردر واحد على الأقل مدفوع وقيمته ١٠٠ أو أكتر،",
            "الإيميل بس.",
            "قفلة.",
            "اللي ملهمش ولا أوردر خالص.",
            "اللي كل أوردراتهم مدفوعة:",
            "و some: {} عشان اللي ملوش أوردرات ميطلعش (every لوحدها بتطلّعه).",
            "قفلة.",
            "المنتجات اللي عليها تاج kitchen (many-to-many).",
            "أكتر ١٠ عملاء:",
            "الإيميل وعدد الأوردرات من غير ما تجيبها،",
            "مترتبين بالعدد،",
            "أول ١٠.",
            "قفلة."
          ],
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
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
INSERT INTO users VALUES (5, 'Nour', 'nour@example.com', NULL, '2026-04-01 10:00+00');
INSERT INTO orders VALUES (9, 5, 'paid', 99.00, '2026-09-20 10:00+00'), (10, 5, 'paid', 10.00, '2026-09-21 10:00+00');`,
            starter: R`SELECT email FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status <> 'paid'
);`,
            expect: [["nour@example.com"]],
            solution: R`SELECT email FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)
  AND NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status <> 'paid'
  );`
          }
        },
        {
          cmd: "$queryRaw",
          title: "SQL خام من Prisma بأمان: tagged template ولا Unsafe",
          desc: R`لما Prisma ميكفيش (تقرير فيه date_trunc و CASE، أو [[FOR UPDATE]]، أو LATERAL، أو full-text)، بتكتب SQL بإيدك:

[[prisma.$queryRaw]] لاستعلام بيرجّع صفوف، و [[prisma.$executeRaw]] لأمر بيعدّل وبيرجّع عدد الصفوف.

الاتنين tagged templates: بتكتبهم بعلامة الـ backtick من غير أقواس، وأي [[$__{قيمة}]] جواهم مش بتتلزق في النص. بتتبعت parameter منفصل ([[$1]] و [[$2]])، فمفيش SQL injection. ده نفس اللي [[pool.query(sql, [params])]] بيعمله في درس WHERE.

أما [[$queryRawUnsafe]] و [[$executeRawUnsafe]] بياخدوا string عادي. لو ركّبته بـ template literal عادي فيه قيمة من اليوزر، ده SQL injection. لو لازم تستخدمهم، القيم بتتبعت parameters بعد الـ string: [[$queryRawUnsafe("... WHERE email = $1", email)]].`,
          example: R`const email = req.query.email;
const users = await prisma.$queryRaw$__bt
  SELECT id, email FROM users WHERE email = $__{email}
$__bt;

const revenue = await prisma.$queryRaw<{ month: Date; revenue: string; orders: number }[]>$__bt
  SELECT date_trunc('month', created_at) AS month, sum(total)::text AS revenue, count(*)::int AS orders
  FROM orders WHERE status = 'paid' AND created_at >= $__{from}
  GROUP BY 1 ORDER BY 1
$__bt;

const changed = await prisma.$executeRaw$__bt
  UPDATE products SET stock = stock - $__{qty} WHERE id = $__{productId} AND stock >= $__{qty}
$__bt;

const ids = [1, 2, 3];
const some = await prisma.$queryRaw$__btSELECT name FROM products WHERE id = ANY($__{ids})$__bt;

await prisma.$transaction(async (tx) => {
  await tx.$queryRaw$__btSELECT id FROM orders WHERE id = $__{orderId} FOR UPDATE$__bt;
});`,
          try: R`اعمل يوزر، وبعدين خلي [[email]] يساوي [["ali@example.com' OR '1'='1"]]، وشغّل الاستعلام مرة بـ [[$queryRaw]] (tagged) ومرة بـ [[$queryRawUnsafe]] وانت راكب الـ string بـ template literal عادي. كام صف رجع في كل مرة؟ وبعدين شغّل تقرير الإيراد من غير [[::int]] و [[::text]] وجرّب [[JSON.stringify]] على النتيجة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: تقرير الإيراد اللي بيتبعت لـ [[$queryRaw]]: من أول أغسطس 2026، الشهر، والإيراد [[::text]]، وعدد الأوردرات [[::int]]، للأوردرات [[paid]]، مترتب بالشهر.`,
          sol: R`الـ tagged هيرجّع [[[]]]: الإيميل اتبعت parameter واحد كنص كامل، ومفيش يوزر إيميله كده. الـ Unsafe بالـ template literal هيرجّع كل اليوزرز، لأن النص بقى [[WHERE email = 'ali@example.com' OR '1'='1']]، والشرط التاني دايمًا صح. ده SQL injection بالظبط. ولو كتبت [[$queryRawUnsafe("... WHERE email = $1", email)]] هيرجّع [[[]]] برضه، لأن القيمة اتبعتت parameter.

ومن غير الـ casts: [[count(*)]] نوعه bigint في Postgres، فبيرجع JavaScript [[BigInt]] ([[1n]])، و [[JSON.stringify]] هيقع بـ [[Do not know how to serialize a BigInt]]. و [[sum(total)]] بيرجع [[Decimal]] object. الحل الأسهل تحوّل جوه SQL: [[count(*)::int]] (لو العدد مش هيعدّي ٢ مليار) و [[sum(total)::text]] للفلوس عشان متضيعش دقة.

وخد بالك: الـ type اللي بتكتبه في [[$queryRaw<...>]] مجرد وعد منك، Prisma مش بيتأكد منه. لو كتبت [[orders: number]] والقاعدة رجّعت bigint، TypeScript هيصدقك والـ bug هيطلع في الـ runtime.`,
          solCode: R`import { prisma } from "./db";

const email = "ali@example.com' OR '1'='1";
const safe = await prisma.$queryRaw$__btSELECT id, email FROM users WHERE email = $__{email}$__bt;
const unsafe = await prisma.$queryRawUnsafe($__btSELECT id, email FROM users WHERE email = '$__{email}'$__bt);
const unsafeButParam = await prisma.$queryRawUnsafe("SELECT id, email FROM users WHERE email = $1", email);
console.log((safe as any[]).length, (unsafe as any[]).length, (unsafeButParam as any[]).length);

const rows: any[] = await prisma.$queryRaw$__btSELECT count(*) AS n FROM orders$__bt;
try { JSON.stringify(rows); } catch (e: any) { console.log(e.message); }
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "مهما الـ ORM كان كويس، فيه استعلامات بيعملها غلط أو مبيعرفهاش خالص: تقارير بالتواريخ، و window functions، و LATERAL، والأقفال. SQL الخام هو الحل، والخطر الوحيد إنك تفتح SQL injection. والإجابة على سؤال انترفيو «إزاي بتمنع SQL injection؟» هي parameterized queries، و $queryRaw بالـ backtick هو ده.",
            how: R`الـ tagged template: JavaScript بيدّي الدالة الأجزاء الثابتة من النص لوحدها والقيم لوحدها، و Prisma بيبني [[... WHERE email = $1]] ويبعت القيم منفصلة. القاعدة بتعامل القيمة كـ data، مستحيل تبقى جزء من الأمر.

عشان كده مينفعش تحط اسم عمود أو جدول أو اتجاه ترتيب كـ [[$__{}]]: هيتبعت كقيمة نصية مش اسم. للحاجات دي فيه [[Prisma.raw("name")]] بيلزق النص زي ما هو، ودي Unsafe فعليًا، فاستخدمها مع whitelist بس: [[const col = ["name", "price"].includes(x) ? x : "name"]].

[[Prisma.sql]] بيبني جزء من استعلام بنفس الأمان عشان تركّب شروط اختيارية، و [[Prisma.join(ids)]] بيطلّع [[$1, $2, $3]] لـ [[IN (...)]]. أو ابعت array واستخدم [[= ANY($__{ids})]]، وده أبسط.

أسماء الجداول والأعمدة في SQL الخام هي أسماء القاعدة، مش أسماء الـ models. لو عامل [[@@map("orders")]] يبقى [[orders]] و [[created_at]]، ولو مش عامل يبقى [["Order"]] و [["createdAt"]] بتنصيص.

الأنواع اللي بترجع: [[bigint]] بيرجع BigInt، و [[numeric]] بيرجع Decimal، و [[timestamptz]] بيرجع Date. و Prisma فيه كمان [[TypedSQL]]: بتكتب الاستعلام في ملف [[.sql]] جوه [[prisma/sql]] و [[prisma generate --sql]] بيولّد function ليها types حقيقية من القاعدة. مفيد للتقارير اللي بتتكرر.

و [[FOR UPDATE]]: مفيش في API بتاع Prisma. بتكتبه بـ [[tx.$queryRaw]] جوه [[$transaction]] التفاعلية، والقفل بيفضل لحد آخر الـ callback (درس SELECT FOR UPDATE).`,
            when: "تقارير وتجميعات معقدة، و window functions و LATERAL و CTE، والأقفال، و full-text و pg_trgm، وأي استعلام الـ log بيوريك إن Prisma عامله أبطأ بكتير من اللي تكتبه بإيدك. وللـ CRUD العادي، الـ API العادي أوضح وأأمن في الـ types.",
            mistakes: R`[[$queryRawUnsafe]] بـ template literal فيه قيمة من اليوزر. [[$queryRaw("SELECT ...")]] بأقواس: دي بقت دالة عادية مش tagged template، و Prisma هيرفضها أو يعاملها غلط. [[$__{column}]] لاسم عمود فالترتيب ميشتغلش. أسماء الـ models بدل أسماء الجداول. [[JSON.stringify]] على BigInt. تثق في الـ generic type من غير ما تتأكد. و [[Prisma.raw]] على قيمة من اليوزر.`
          },
          lines: [
            "قيمة جاية من اليوزر.",
            "SQL خام كـ tagged template (backtick من غير أقواس):",
            "الإيميل بيتبعت parameter ($1)، مش بيتلزق في النص.",
            "قفلة.",
            "تقرير الإيراد الشهري، والـ type اللي متوقعه (وعد منك، مش متأكد منه):",
            "count متحوّل int و sum متحوّل text، عشان ميرجعوش BigInt و Decimal.",
            "المدفوع من تاريخ معين، والتاريخ parameter.",
            "مجمّع ومترتب بالشهر.",
            "قفلة.",
            "أمر بيعدّل: بيرجّع عدد الصفوف اللي اتغيرت.",
            "خصم المخزون بشرط، وكل القيم parameters.",
            "قفلة. لو changed = 0 يبقى المخزون مش كفاية.",
            "array ids.",
            "ANY بياخد الـ array كـ parameter واحد.",
            "transaction تفاعلية:",
            "اقفل صف الأوردر لحد آخر الـ callback (مفيش FOR UPDATE في API بتاع Prisma).",
            "قفلة."
          ],
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
            starter: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1;`,
            expectSql: R`SELECT date_trunc('month', created_at), sum(total), count(*) FROM orders WHERE status = 'paid' AND created_at >= '2026-08-01' GROUP BY 1 ORDER BY 1;`,
            solution: R`SELECT date_trunc('month', created_at) AS month, sum(total)::text AS revenue, count(*)::int AS orders
FROM orders
WHERE status = 'paid' AND created_at >= '2026-08-01'
GROUP BY 1
ORDER BY 1;`,
            ordered: true
          }
        },
        {
          cmd: "N+1",
          title: "query جوه loop: ليه الصفحة بتبطأ مع كل يوزر جديد",
          desc: R`N+1 يعني: استعلام واحد يجيب قايمة (N صف)، وبعدين استعلام لكل صف يجيب حاجة مرتبطة بيه. ١٠٠ يوزر = ١٠١ استعلام. كل واحد سريع لوحده، بس الـ round trips بتتجمع، والصفحة اللي كانت سريعة وفيها ١٠ يوزرز بتبقى بطيئة لما يبقوا ١٠٠٠.

المشكلة إن الكود شكله بريء: [[for (const u of users) { await prisma.order.findMany({ where: { userId: u.id } }) }]]. ومش هتلاقيها غير لما تشغّل [[log: ["query"]]] وتشوف نفس الـ SELECT بيتكرر.

الحل: اطلب العلاقة مع القايمة ([[include]] أو [[select]] للعلاقة)، و Prisma هيجيب الكل باستعلامين: واحد لليوزرز، وواحد للأوردرات بـ [[WHERE user_id IN (...)]]. أو اجمع الـ ids بنفسك واعمل استعلام واحد بـ [[in]]، أو اكتب JOIN أو json_agg بـ $queryRaw.`,
          example: R`const users = await prisma.user.findMany({ take: 100 });
for (const u of users) {
  const orders = await prisma.order.findMany({ where: { userId: u.id } });
  console.log(u.email, orders.length);
}

const withOrders = await prisma.user.findMany({
  take: 100,
  include: { orders: { select: { id: true, total: true } } },
});

const counts = await prisma.user.findMany({
  take: 100,
  select: { email: true, _count: { select: { orders: true } } },
});

const userIds = users.map((u) => u.id);
const orders = await prisma.order.findMany({ where: { userId: { in: userIds } } });
const byUser = Map.groupBy(orders, (o) => o.userId);`,
          try: R`اعمل ٢٠٠ يوزر بأوردرات (بـ createMany، أو بسكربت الـ seed في درس faker)، و [[log: ["query"]]] شغال. شغّل الـ loop الأول وعدّ سطور [[prisma:query]]، وقيس الوقت بـ [[console.time]]. وبعدين نفس الحاجة للـ include، وللـ _count. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: استعلام واحد بدل الـ loop: لكل يوزر الإيميل، وعدد أوردراته، ووقت آخر أوردر (NULL لو ملوش)، واليوزر اللي ملوش أوردرات يطلع بـ 0.`,
          sol: R`الـ loop هيطبع ٢٠١ سطر [[prisma:query]]: واحد [[SELECT ... FROM "public"."users"]] وبعده ٢٠٠ مرة [[SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1]]. الـ include هيطبع سطرين بس: اليوزرز، وبعدهم [[... WHERE "public"."orders"."user_id" IN ($1,$2,...)]]. والـ _count سطر واحد: الـ count بيتحسب بـ LEFT JOIN على subquery فيها [[COUNT(*)]] و GROUP BY، جوه نفس الاستعلام.

الوقت على القاعدة اللي على جهازك ممكن يبان قريب (كل استعلام أقل من ملّي ثانية)، لأن مفيش network. الفرق الحقيقي بيبان لما القاعدة على سيرفر تاني: لو كل round trip بياخد ٢٠ ملّي ثانية (Supabase من منطقة بعيدة مثلًا)، الـ loop هياخد حوالي ٤ ثواني والـ include حوالي ٤٠ ملّي ثانية. عشان كده N+1 بيعدّي في التطوير ويبان في الإنتاج.

ولو عدد السطور في الـ include طلع أكتر من ٢، اتأكد إنك مش عامل include جوه include، كل مستوى بيزوّد استعلام واحد (مش N).`,
          solCode: R`import { prisma } from "./db";

console.time("loop");
const users = await prisma.user.findMany({ take: 200 });
for (const u of users) {
  await prisma.order.findMany({ where: { userId: u.id } });
}
console.timeEnd("loop");

console.time("include");
await prisma.user.findMany({ take: 200, include: { orders: true } });
console.timeEnd("include");

console.time("count");
await prisma.user.findMany({ take: 200, select: { email: true, _count: { select: { orders: true } } } });
console.timeEnd("count");
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "N+1 أشهر مشكلة أداء في أي تطبيق بيستخدم ORM، وسؤال شبه ثابت في انترفيوهات الـ backend. ومش بتبان في التطوير (داتا قليلة وقاعدة على نفس الجهاز)، وتظهر فجأة في الإنتاج لما الداتا تكبر.",
            how: R`التكلفة مش في الاستعلام نفسه، في الـ round trip: الكود بيبعت، ويستنى الشبكة، والقاعدة تعمل parse و plan وتنفّذ، والرد يرجع. ١٠٠ مرة ورا بعض بـ await يعني ١٠٠ مرة الانتظار ده. و [[Promise.all]] على الـ loop بيوازي الانتظار، بس بيبعت ١٠٠ استعلام في نفس اللحظة ويقفل الـ connection pool (الافتراضي في pg ١٠ اتصالات). فده مش حل.

أشكاله المستخبية:

في الـ serializer أو الـ mapper: دالة [[toDTO(order)]] جواها [[await prisma.user.findUnique]].

في GraphQL: resolver لكل حقل علاقة بيتنادي لكل أب (والحل DataLoader: بيجمع الـ ids في نفس الـ tick ويعمل استعلام واحد).

في React Server Components: component لكل صف بيعمل fetch لوحده.

الـ polymorphic relations (زي [[paymentableId]] و [[paymentableType]] في درس one-to-many): مفيش FK، فمفيش include، فالكود بيجيب كل واحدة لوحدها.

الحلول بالترتيب: include أو select للعلاقة. [[_count]] لو محتاج العدد بس. [[in]] بالـ ids وتجمّع في الكود ([[Map.groupBy]] موجودة من Node 21). SQL واحد بـ JOIN أو json_agg أو LATERAL عن طريق $queryRaw لو الشكل معقد.

وإزاي تكتشفه: [[log: ["query"]]] في التطوير، و test بيعدّ الاستعلامات (event [[query]] من الـ client)، و [[pg_stat_statements]] في الإنتاج (نفس الاستعلام بـ [[calls]] رقم ضخم)، أو APM زي Sentry بيوريك نفس الـ span متكرر.`,
            when: "راجع أي loop فيه await على القاعدة، وأي دالة بتتنادي لكل عنصر في list وجواها query. والقاعدة: عدد الاستعلامات في الصفحة لازم يبقى ثابت، مش بيكبر مع عدد الصفوف.",
            mistakes: R`[[Promise.all]] على الـ loop وتفتكر إنك حليتها. include متداخل كتير من غير take فبدل N+1 عندك استعلام بيرجّع ميجات. [[findUnique]] جوه map في الـ serializer. تقيس في التطوير على ١٠ صفوف وتقول «سريع». وفي الانترفيو: «إيه هي مشكلة N+1 وإزاي بتحلها؟» عرّفها بالأرقام (استعلام للقايمة و N للتفاصيل)، وقول إزاي بتكتشفها (query log أو APM)، والحل (eager loading بـ include أو JOIN أو batching بـ IN أو DataLoader).`
          },
          lines: [
            "استعلام واحد: ١٠٠ يوزر (الـ 1).",
            "لكل يوزر:",
            "استعلام لأوردراته (الـ N): ١٠٠ استعلام ورا بعض.",
            "اطبع.",
            "قفلة الـ loop. الإجمالي ١٠١ استعلام.",
            "الحل: نفس القايمة،",
            "١٠٠ يوزر،",
            "ومعاهم أوردراتهم: Prisma بيجيبهم باستعلام تاني واحد بـ IN.",
            "قفلة. الإجمالي ٢ استعلام.",
            "لو محتاج العدد بس:",
            "١٠٠ يوزر،",
            "والعدد من غير ما تجيب الأوردرات.",
            "قفلة.",
            "أو يدوي: اجمع الـ ids،",
            "استعلام واحد بـ IN،",
            "وقسّم النتيجة على اليوزرز في الكود."
          ],
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
            starter: R`SELECT u.email, count(*) AS orders, max(o.created_at) AS last_order
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`,
            expectSql: R`SELECT u.email, (SELECT count(*) FROM orders o WHERE o.user_id = u.id), (SELECT max(created_at) FROM orders o WHERE o.user_id = u.id) FROM users u;`,
            solution: R`SELECT u.email, count(o.id) AS orders, max(o.created_at) AS last_order
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`
          }
        }
      ]
    },
    {
      t: "Supabase من الكود",
      l: 3,
      n: "الـ frontend بيكلّم Postgres مباشرة بـ supabase-js، والحماية كلها في RLS: أنهي key يروح فين، و policies لكل عملية، ودوال بـ rpc، وملفات و realtime",
      items: [
        {
          cmd: "supabase-js",
          title: "اقرا واكتب من الـ frontend، وأنهي key يروح فين",
          desc: R`Supabase بيدّيك Postgres ومعاه API جاهز (PostgREST) على كل جدول في [[public]]. من الكود بتستخدم [[@supabase/supabase-js]]: [[supabase.from("orders").select(...)]] بيتحول لطلب HTTP، والـ API بيحوله SQL.

المفاتيح: [[publishable key]] (بيبدأ بـ [[sb_publishable_]]، وده بديل الـ [[anon]] key القديم) مكانه الـ frontend، ومفيش مشكلة إن أي حد يشوفه. هو بس بيقول «الطلب ده من تطبيقك»، والصلاحيات بتتحدد بالـ RLS وباليوزر اللي عامل login. أما [[secret key]] (بيبدأ بـ [[sb_secret_]]، بديل [[service_role]]) بيعدّي RLS خالص، ومكانه السيرفر بس: backend، أو Edge Function، أو سكربت. الاتنين القدام (anon و service_role) لسه شغالين في المشاريع القديمة لحد ما تقفلهم.

و [[select]] بيجيب العلاقات بالـ FK: [[select("id, total, order_items(quantity, products(name))")]] بيرجّع الأوردر وجواه بنوده وجوا كل بند المنتج، في طلب واحد.`,
          example: R`import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) throw authError;

const { data: orders, error } = await supabase
  .from("orders")
  .select("id, total, status, created_at, order_items(quantity, products(name))")
  .eq("status", "paid")
  .order("created_at", { ascending: false })
  .limit(20);
if (error) throw error;

const { data: note, error: insertError } = await supabase
  .from("notes")
  .insert({ body: "hello" })
  .select()
  .single();

// على السيرفر بس:
const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});`,
          try: R`في مشروع Supabase (أو [[supabase start]] محليًا، درس Supabase CLI في تاب «PostgreSQL»)، اعمل جدول [[notes]] من غير RLS، واقرا منه بالـ publishable key من غير login. وبعدين فعّل RLS من غير policies واقرا تاني. وآخر حاجة اقرا بالـ secret key من سكربت Node. قارن التلات نتايج، وبص على [[error]] في كل مرة.`,
          sol: R`من غير RLS: هترجع كل الصفوف لأي حد معاه الـ publishable key، حتى من غير login. يعني أي حد فتح DevTools وخد الـ key من الـ JS بتاع موقعك يقدر يقرا الجدول كله (وممكن يكتب ويمسح كمان لو الجدول ليه صلاحيات كتابة). ده أشهر ثغرة في مشاريع Supabase.

بعد RLS من غير policies: [[data]] هيرجع [[[]]] و [[error]] هيبقى [[null]]. مش error. الـ RLS بيفلتر الصفوف بهدوء، فالواجهة هتعرض «مفيش داتا» ومحدش هيعرف ليه. لو عملت insert هتاخد error فيه [[new row violates row-level security policy]].

وبالـ secret key: كل الصفوف هترجع رغم الـ RLS، لأن الـ secret key بيعدّي RLS. عشان كده مكانه السيرفر بس، والـ secret keys الجديدة بترفض لو اتبعتت من متصفح (401).

ولو الجدول مش ظاهر للـ API خالص (error فيه إن الـ relation مش موجودة أو permission denied)، ده غالبًا بسبب الـ grants: Supabase بيغيّر الافتراضي عشان الجداول الجديدة متبقاش مكشوفة للـ API لوحدها، فممكن تحتاج [[grant select on public.notes to anon, authenticated]]. تأكد من إعدادات مشروعك.`,
          solCode: R`create table public.notes (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body text not null
);
insert into public.notes (user_id, body) select id, 'secret note' from auth.users limit 1;

// من المتصفح أو Node بالـ publishable key:
const { data, error } = await supabase.from("notes").select("*");
console.log(data, error);

alter table public.notes enable row level security;

// بالـ secret key من السيرفر:
const { data: all } = await admin.from("notes").select("*");
console.log(all.length);`,
          flag: "script",
          deep: {
            why: "Supabase بيشيل عنك كتابة backend لـ CRUD: الـ auth والـ API والملفات والـ realtime جاهزين. بس ده معناه إن الـ frontend بيكلّم القاعدة تقريبًا مباشرة، فكل الأمان اللي كان في الـ backend (مين يشوف إيه) لازم يبقى في القاعدة نفسها. لو فهمت أنهي key بيعمل إيه، هتتجنب أغلب الكوارث.",
            how: R`كل طلب من supabase-js بيروح لـ [[https://xxx.supabase.co/rest/v1/orders?select=...]] ومعاه الـ key، ولو اليوزر عامل login معاه JWT بتاعه. الـ API بيحوّل الطلب SQL وبيشغّله بـ role حسب الـ JWT: [[anon]] لو مفيش login، و [[authenticated]] لو فيه. والـ RLS بتطبّق بـ [[auth.uid()]] اللي جاي من الـ JWT. أما الـ secret key بيشغّل الطلب بـ role [[service_role]] اللي عنده [[BYPASSRLS]].

كل دالة بترجّع [[{ data, error }]] ومش بترمي exception. لازم تتحقق من [[error]] كل مرة، وإلا الفشل هيعدّي كأن مفيش داتا.

الفلاتر: [[eq]] و [[neq]] و [[gt]] و [[gte]] و [[lt]] و [[like]] و [[ilike]] و [[in]] و [[is]] و [[or("status.eq.paid,total.gt.500")]]. و [[range(0, 19)]] للـ pagination بالـ offset. و [[single()]] بيرجّع object بدل array ويرمي error لو مش صف واحد بالظبط، و [[maybeSingle()]] بيسمح بصفر.

العلاقات في select بتمشي على الـ FKs. و [[products!inner(name)]] بيخليها INNER JOIN (الأوردر اللي ملوش منتج مطابق بيختفي)، فتقدر تفلتر بعمود في جدول مرتبط.

والـ types: [[supabase gen types typescript]] بيولّد types من القاعدة، وبتدّيها لـ [[createClient<Database>]] فالـ select والـ insert يبقوا typed.

الـ insert والـ update مش بيرجّعوا الصفوف غير لو كتبت [[.select()]] بعدهم. وخلي بالك: الـ select بعد الـ insert محتاج policy للـ SELECT كمان، وإلا الـ insert هينجح والـ select يرجع فاضي أو error.`,
            when: "تطبيقات من غير backend خاص (أو backend صغير)، وتطبيقات موبايل، ولوحات أدمن داخلية، والـ MVPs. ولو المنطق معقد (دفع، وحسابات، وصلاحيات متشابكة) خلي الـ frontend ينادي Edge Function أو backend بتاعك، واللي بيستخدم الـ secret key.",
            mistakes: R`الـ secret key أو service_role في الـ frontend أو في متغير بيبدأ بـ [[NEXT_PUBLIC_]] أو [[VITE_]]: كده أي حد عنده صلاحيات أدمن على القاعدة. جدول في public من غير RLS. تتجاهل [[error]]. [[single()]] على استعلام ممكن يرجع صفر فيطلع error. تعتمد على فلتر في الـ frontend ([[eq("user_id", myId)]]) كأنه أمان، وده سهل أي حد يشيله من الطلب. الأمان هو RLS بس.`
          },
          lines: [
            "المكتبة.",
            "client برابط المشروع والـ publishable key (عادي يبقوا في كود الواجهة).",
            "login بإيميل وباسورد: من هنا ورايح الطلبات معاها JWT اليوزر.",
            "الدوال مش بترمي error، فاتحقق بنفسك.",
            "اقرا الأوردرات:",
            "من جدول orders،",
            "الأعمدة دي، وجواها البنود، وجوا كل بند اسم المنتج (بالـ FKs)،",
            "المدفوعة بس،",
            "الأحدث الأول،",
            "٢٠ بس. والـ RLS هتفلتر لأوردرات اليوزر ده لوحدها لو الـ policy كده.",
            "اتحقق من الـ error.",
            "ضيف note:",
            "في جدول notes،",
            "الـ body بس، والـ user_id بياخد auth.uid() كـ default في القاعدة،",
            "ورجّع الصف اللي اتعمل (محتاج policy للـ SELECT كمان)،",
            "كـ object مش array.",
            "client بالـ secret key: بيعدّي RLS، ومكانه السيرفر بس ومن env مش في الكود،",
            "ومن غير حفظ session، لأنه مش يوزر.",
            "قفلة."
          ]
        },
        {
          cmd: "policies و auth.uid()",
          title: "policy لكل عملية: مين يقرا ومين يكتب ومين يعدّل",
          desc: R`درس Row Level Security في تاب «PostgreSQL» شرح الفكرة وعمل policy واحدة [[FOR ALL]]. في مشروع حقيقي غالبًا كل عملية ليها قاعدة مختلفة: الكل يقرا الـ notes العامة، وصاحب الـ note بس يقرا الخاصة بتاعته، وأي حد عامل login يضيف note باسمه هو بس، وصاحبها بس يعدّل ويمسح.

عشان كده بتعمل policy لكل عملية ([[FOR SELECT]] و [[FOR INSERT]] و [[FOR UPDATE]] و [[FOR DELETE]]) ولكل role ([[TO anon, authenticated]]).

[[USING]] بيحدد الصفوف الموجودة اللي تقدر تشوفها أو تعدّلها أو تمسحها. [[WITH CHECK]] بيحدد شكل الصف الجديد المسموح بيه بعد INSERT أو UPDATE. و [[auth.uid()]] هو id اليوزر من الـ JWT، و NULL لو مش عامل login.`,
          example: R`CREATE TABLE notes (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id   uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  body      text NOT NULL,
  is_public boolean NOT NULL DEFAULT false
);
CREATE INDEX notes_user_id_idx ON notes (user_id);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read public or own" ON notes FOR SELECT TO anon, authenticated
  USING (is_public OR user_id = (select auth.uid()));
CREATE POLICY "insert as self" ON notes FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "update own" ON notes FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "delete own" ON notes FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}', true);
SELECT body FROM notes;
UPDATE notes SET body = 'hacked' WHERE user_id <> (select auth.uid());
ROLLBACK;`,
          try: R`في SQL Editor بتاع Supabase (أو [[supabase start]])، اعمل يوزرين من لوحة Auth، وضيف لكل واحد note خاصة وواحد منهم note عامة. استخدم الـ BEGIN و [[SET LOCAL ROLE]] اللي في المثال بالـ id بتاع اليوزر الأول، وجرّب: SELECT، و UPDATE على note اليوزر التاني، و INSERT بـ user_id اليوزر التاني، و UPDATE يغيّر user_id بتاع note بتاعته لليوزر التاني. وبعدين جرّب SELECT كـ [[anon]] من غير claims.`,
          sol: R`كيوزر أول: الـ SELECT هيرجّع الـ notes بتاعته (الخاصة والعامة) والـ notes العامة بتاعة غيره، ومش هيرجّع الخاصة بتاعة اليوزر التاني.

الـ UPDATE على note غيره هيرجّع [[UPDATE 0]] من غير error: الـ USING خبّى الصف، فالأمر ملقاش حاجة يعدّلها. نفس الحاجة للـ DELETE.

الـ INSERT بـ user_id حد تاني: [[new row violates row-level security policy for table "notes"]]، لأن الـ WITH CHECK رفض.

تغيير user_id بتاع note بتاعته لحد تاني: نفس الـ error. الـ USING سمح له يوصل للصف (هو بتاعه)، بس الـ WITH CHECK رفض الشكل الجديد. من غير WITH CHECK في policy الـ UPDATE، كان هيقدر «يرمي» notes على حساب حد تاني.

وكـ anon من غير claims: [[auth.uid()]] بيرجّع NULL، فالشرط بيبقى [[is_public OR NULL]]، فيرجع العام بس.

ولو كل حاجة رجعت، اتأكد إنك مش شغال كـ postgres: الـ superuser وصاحب الجدول بيعدّوا RLS، عشان كده الـ SET LOCAL ROLE مهم في الاختبار.`,
          solCode: R`BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "<id اليوزر الأول>", "role": "authenticated"}', true);
SELECT body, is_public FROM notes;
UPDATE notes SET body = 'hacked' WHERE user_id = '<id اليوزر التاني>';
INSERT INTO notes (user_id, body) VALUES ('<id اليوزر التاني>', 'fake');
ROLLBACK;

BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "<id اليوزر الأول>", "role": "authenticated"}', true);
UPDATE notes SET user_id = '<id اليوزر التاني>' WHERE user_id = (select auth.uid());
ROLLBACK;

BEGIN;
SET LOCAL ROLE anon;
SELECT body FROM notes;
ROLLBACK;`,
          flag: "script",
          deep: {
            why: "الـ RLS هو الـ backend بتاعك في Supabase. policy واحدة FOR ALL سهلة بس غالبًا غلط: يا إما بتقفل حاجة المفروض تبقى عامة، يا بتفتح كتابة لحد المفروض يقرا بس. ولما كل عملية ليها policy، القواعد بتبان زي متطلبات البيزنس بالظبط، وسهل تراجعها.",
            how: R`الـ policies بتتجمع بـ OR: لو فيه اتنين FOR SELECT، الصف بيظهر لو أي واحدة سمحت (دي الـ PERMISSIVE، الافتراضي). وفيه [[AS RESTRICTIVE]] بتتجمع بـ AND، مفيدة لشرط لازم يتحقق دايمًا (زي «الحساب مش موقوف»).

[[FOR SELECT]] بتاخد USING بس. [[FOR INSERT]] بتاخد WITH CHECK بس. [[FOR UPDATE]] بتاخد الاتنين. [[FOR DELETE]] بتاخد USING بس. وفي UPDATE و DELETE، Postgres محتاج يقرا الصف الأول، فالـ SELECT policy بتأثر عليهم كمان.

[[(select auth.uid())]] بين قوسين بـ select: Postgres بيحسبها مرة واحدة للاستعلام كله (initPlan) بدل مرة لكل صف. على جدول فيه مليون صف الفرق كبير. ونفس الحاجة لـ [[auth.jwt()]].

[[auth.uid()]] في Supabase دالة بتقرا [[request.jwt.claims]] من إعدادات الـ session، والـ API بيحطها من الـ JWT مع كل طلب. عشان كده الاختبار في SQL بيبقى بـ [[set_config('request.jwt.claims', ...)]] و [[SET LOCAL ROLE authenticated]] جوه transaction.

الأداء: كل شرط في policy بيتضاف على كل استعلام. index على [[user_id]] ضروري. والـ policies اللي فيها subquery على جدول تاني ([[EXISTS (SELECT 1 FROM members WHERE ...)]]) لازم يكون عليها index، أو تحطها في دالة [[security definer]] بتتعمل مرة.

[[DEFAULT auth.uid()]] على user_id بيخلي الـ frontend ميبعتش user_id خالص. والـ WITH CHECK بيضمن إنه لو بعته، يكون هو.`,
            when: "كل جدول في public في مشروع Supabase، من أول migration. ابدأ بـ «مقفول» (ENABLE RLS)، وافتح كل عملية لوحدها باللي محتاجه. وحط الـ policies في ملفات migrations مش من اللوحة بإيدك، عشان تبقى في git وتتراجع.",
            mistakes: R`UPDATE policy من غير WITH CHECK. [[TO public]] أو من غير TO فتنطبق على anon كمان من غير ما تقصد. [[auth.uid()]] من غير select حواليها فالاستعلام يبطأ على جداول كبيرة. تختبر من SQL Editor كـ postgres فكل حاجة تعدّي. من غير index على user_id. شرط بيعتمد على [[user_metadata]] في الـ JWT: ده اليوزر يقدر يعدّله بنفسه، فمتستخدموش للصلاحيات. استخدم [[app_metadata]] أو جدول أدوار.`
          },
          lines: [
            "جدول notes:",
            "رقم،",
            "صاحبها: افتراضيًا اليوزر اللي عامل الطلب، ومسح اليوزر يمسح notes بتاعته،",
            "النص،",
            "وعامة ولا خاصة.",
            "قفلة.",
            "index على user_id: كل policy هتفلتر بيه.",
            "اقفل الجدول: مفيش صف لحد لحد ما تضيف policy.",
            "القراية: للـ anon والـ authenticated،",
            "العامة، أو بتاعتي أنا.",
            "الإضافة: للي عامل login بس،",
            "والصف الجديد لازم يكون باسمي.",
            "التعديل: الصفوف اللي أوصلها بتاعتي،",
            "والشكل الجديد لازم يفضل بتاعي (ممنوع تحوّلها لحد تاني).",
            "المسح: للي عامل login،",
            "بتاعتي بس.",
            "اختبار من SQL: transaction،",
            "اشتغل بدور authenticated (زي ما الـ API بيعمل)،",
            "وحط الـ JWT claims: auth.uid() هترجّع الـ sub ده.",
            "هيرجّع العام وبتاعي بس.",
            "هيرجّع UPDATE 0: صفوف غيري مستخبية.",
            "ارجع من غير ما تحفظ أي حاجة."
          ]
        },
        {
          cmd: "rpc",
          title: "نادي دالة Postgres من الـ frontend: security invoker ولا definer",
          desc: R`لما عملية محتاجة كذا خطوة لازم تحصل مع بعض (خصم مخزون وإنشاء أوردر)، أو حساب على داتا كتير (إجمالي، ترتيب)، مينفعش تعملها بكذا طلب من الـ frontend. بتكتبها function في Postgres (درس CREATE FUNCTION في المستوى التاني) وتناديها: [[supabase.rpc("place_order", { p_product_id: 5, p_qty: 2 })]].

أسماء الـ parameters في الـ object لازم تبقى نفس أسماء الـ parameters في الدالة. والنتيجة في [[data]]: قيمة، أو array لو الدالة بترجّع جدول.

الأمان: الافتراضي [[SECURITY INVOKER]]، يعني الدالة بتشتغل بصلاحيات اليوزر اللي ناداها، والـ RLS بتتطبق جواها. [[SECURITY DEFINER]] بتشتغل بصلاحيات صاحبها (غالبًا postgres) وبتعدّي RLS، فلازم تتحقق جواها بنفسك مين بينادي، وتقفلها بـ [[REVOKE EXECUTE]] عن اللي مش المفروض يناديها.`,
          example: R`CREATE FUNCTION public.my_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes WHERE user_id = (select auth.uid());
$$;
CREATE FUNCTION public.all_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes;
$$;
REVOKE EXECUTE ON FUNCTION public.all_notes_count() FROM PUBLIC, anon, authenticated;
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "22222222-2222-2222-2222-222222222222"}', true);
SELECT public.my_notes_count();
SELECT public.all_notes_count();
ROLLBACK;`,
          try: R`اعمل الدالتين في مشروعك. من supabase-js وانت عامل login، نادي [[rpc("my_notes_count")]] و [[rpc("all_notes_count")]]. وبعدين من سكربت على السيرفر بالـ secret key نادي التانية. وبعدين شيل سطر الـ REVOKE (اعمل الدالة من جديد) ونادي [[all_notes_count]] من المتصفح تاني.`,
          sol: R`[[my_notes_count]] هترجّع عدد الـ notes بتاعتك بس، لأنها INVOKER والـ RLS شغالة، والشرط كمان جواها بـ auth.uid().

[[all_notes_count]] من المتصفح هترجّع error: [[permission denied for function all_notes_count]] (في supabase-js هتلاقيها في [[error.message]] و [[error.code]] = [[42501]]). ومن السيرفر بالـ secret key هترجّع العدد الكلي لكل اليوزرز، لأن service_role عنده صلاحيات والدالة DEFINER.

من غير الـ REVOKE: أي يوزر (وحتى anon) يقدر يناديها ويعرف عدد كل الـ notes في النظام. هنا العدد بس، بس تخيّل دالة DEFINER بترجّع صفوف أو بتعدّل: ده يبقى bypass كامل للـ RLS من الـ frontend. عشان كده أي دالة DEFINER في public يا إما جواها check على [[auth.uid()]]، يا إما مقفولة بـ REVOKE. وخد بالك إن Postgres بيدّي [[EXECUTE]] لـ [[PUBLIC]] افتراضيًا على أي دالة جديدة، و Supabase كمان بيدّي anon و authenticated، فلازم الـ REVOKE يشيل الاتنين.`,
          solCode: R`// في الواجهة، واليوزر عامل login
const mine = await supabase.rpc("my_notes_count");
console.log(mine.data, mine.error);
const all = await supabase.rpc("all_notes_count");
console.log(all.data, all.error?.code, all.error?.message);

// على السيرفر بالـ secret key
const adminAll = await admin.rpc("all_notes_count");
console.log(adminAll.data);`,
          flag: "script",
          deep: {
            why: "من غير backend، الـ rpc هو الطريقة الوحيدة تعمل عملية ذرية (atomic) من الـ frontend: عشر طلبات insert و update ورا بعض من المتصفح ممكن نصهم ينجح ونصهم يفشل، أو اليوزر يقفل الصفحة في النص. والدالة بتشتغل في transaction واحدة جوه القاعدة.",
            how: R`[[supabase.rpc(name, args)]] بيبعت POST لـ [[/rest/v1/rpc/name]] والـ args JSON، والـ API بيطابق أسماء المفاتيح بأسماء الـ parameters. لو الاسم غلط هتاخد error إن الدالة مش موجودة بالتوقيع ده. ولو الدالة بترجّع جدول تقدر تكمّل عليها فلاتر: [[rpc("search_notes", { q }).select("id, body").limit(10)]].

[[SET search_path = '']] مهم جدًا مع DEFINER: من غيره، حد يقدر يعمل object بنفس الاسم في schema تانية ويخلي دالتك تستخدمه بصلاحيات postgres. عشان كده كل الأسماء جوه الدالة بتتكتب كاملة ([[public.notes]]). و Security Advisor في لوحة Supabase بينبّهك لأي دالة من غير search_path.

إمتى DEFINER؟ لما الدالة محتاجة تقرا جدول اليوزر مش مسموح له يقراه مباشرة، زي «هل أنا عضو في الفريق ده؟» على جدول members، أو trigger على [[auth.users]] بيعمل profile. وفي الحالة دي الدالة بترجّع أقل حاجة ممكنة (boolean مثلًا)، ومش بتاخد id يوزر كـ parameter (خدها من [[auth.uid()]]، وإلا أي حد هيبعت id غيره).

الأخطاء: [[RAISE EXCEPTION 'OUT_OF_STOCK']] بترجع في [[error.message]]، فتقدر تتعامل معاها في الواجهة. ومتحطش فيها داتا حساسة.

والـ Edge Functions بديل لما المنطق محتاج API برّه (دفع أو إيميل) أو مكتبات JavaScript. الـ rpc للمنطق اللي كله داتا.`,
            when: "عمليات من كذا خطوة (أوردر، تحويل رصيد، حجز)، وبحث أو تقارير فيها SQL معقد (full-text، و pg_trgm، و window functions)، وأي حاجة محتاجة تبقى atomic أو أسرع من كذا رحلة للسيرفر.",
            mistakes: R`DEFINER من غير search_path ومن غير REVOKE. دالة DEFINER بتاخد [[p_user_id]] من الـ client وتثق فيه. أسماء parameters مختلفة بين الدالة والـ object. تتجاهل [[error]]. تعمل الدالة من اللوحة ومحدش عارف إنها موجودة؛ حطها في migration. ودالة بترجّع [[SETOF notes]] وهي DEFINER، فبترجّع كل الـ notes لأي حد.`
          },
          lines: [
            "دالة بتعدّ notes اليوزر اللي بينادي،",
            "INVOKER (بصلاحياته والـ RLS شغالة)، و search_path فاضي عشان الأمان.",
            "العد بـ auth.uid()، والأسماء كاملة بالـ schema.",
            "قفلة.",
            "دالة بتعدّ كل الـ notes في النظام،",
            "DEFINER: بتشتغل بصلاحيات postgres وبتعدّي RLS.",
            "العد من غير أي شرط.",
            "قفلة.",
            "اقفلها: محدش من الـ frontend يقدر يناديها (السيرفر بالـ secret key بس).",
            "اختبار:",
            "كيوزر عامل login،",
            "بالـ id ده.",
            "بترجّع notes بتاعته بس.",
            "error: permission denied.",
            "ارجع."
          ]
        },
        {
          cmd: "Storage و Realtime",
          title: "ارفع صورة البروفايل في فولدر اليوزر، واسمع الأوردرات الجديدة لحظة بلحظة",
          desc: R`Storage: ملفات في buckets. الـ bucket ممكن يبقى public (أي حد معاه الرابط يشوف الملف) أو private (بتطلب رابط مؤقت [[createSignedUrl]]). والصلاحيات بـ RLS برضه، بس على جدول [[storage.objects]]: كل ملف صف، واسم الملف (المسار) في عمود [[name]]. النمط المشهور: كل يوزر يرفع في فولدر اسمه الـ id بتاعه، والـ policy بتقارن أول جزء من المسار بـ [[auth.uid()]].

Realtime: [[postgres_changes]] بيبعتلك كل INSERT أو UPDATE أو DELETE على جدول لحظة ما يحصل، عن طريق websocket. الجدول لازم يتضاف لـ publication اسمها [[supabase_realtime]]، والـ RLS بتتطبق: كل يوزر بيوصله بس التغييرات على الصفوف اللي يقدر يقراها.`,
          example: R`const path = $__bt$__{user.id}/avatar.png$__bt;
const { error: upError } = await supabase.storage
  .from("avatars")
  .upload(path, file, { upsert: true, contentType: file.type });
const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60);

const channel = supabase
  .channel("my-orders")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
    console.log("new order", payload.new);
  })
  .subscribe();

await supabase.removeChannel(channel);`,
          try: R`اعمل bucket private اسمه [[avatars]]، وضيف policies على storage.objects للـ INSERT والـ SELECT والـ UPDATE بشرط [[(storage.foldername(name))[1] = (select auth.uid())::text]]. ارفع صورة في فولدرك، وبعدين جرّب ترفع في [[other-user-id/avatar.png]]. وبعدين فعّل realtime على جدول orders ([[alter publication supabase_realtime add table orders]])، وافتح الصفحة في تابين بيوزرين مختلفين، وضيف أوردر ليوزر منهم.`,
          sol: R`الرفع في فولدرك هينجح. الرفع في فولدر حد تاني هيرجّع error فيه [[new row violates row-level security policy]] (بـ status 403). ولو الرفع العادي نفسه فشل بنفس الرسالة رغم إن INSERT policy صح، غالبًا ناقصك SELECT policy: الـ Storage API بيعمل INSERT ومعاه RETURNING، فمحتاج يقدر يقرا الصف اللي اتعمل. و [[upsert: true]] (استبدال الصورة) محتاج UPDATE policy كمان.

الـ signed URL هيشتغل ساعة وبعدين يرجّع error. الرابط العادي ([[getPublicUrl]]) مش هيشتغل لأن الـ bucket private.

وفي realtime: التاب بتاع صاحب الأوردر هيطبع [[new order]] ومعاه الصف، والتاب التاني مش هيوصله حاجة، لو الـ RLS على orders بتسمح لكل يوزر يقرا أوردراته بس. لو ولا تاب وصله حاجة: الجدول مش في الـ publication، أو الـ subscribe فشل (بص على الـ status في callback الـ subscribe). ولو الاتنين وصلهم: الـ RLS مش متفعلة أو فيها policy فاتحة.`,
          solCode: R`create policy "avatar read own" on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatar upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatar replace own" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

alter publication supabase_realtime add table public.orders;

// في الواجهة
const bad = await supabase.storage.from("avatars").upload("someone-else/avatar.png", file);
console.log(bad.error?.message);`,
          flag: "script",
          deep: {
            why: "كل تطبيق تقريبًا فيه صور بروفايل أو مرفقات، وكتير فيهم «تحديث لحظي» (أوردر جديد في لوحة المطعم، رسالة جديدة). Supabase بيدّيك الاتنين من غير سيرفر ملفات ولا websocket server، بس نفس قاعدة الأمان: كله RLS، وأي policy ناقصة يا إما بتقفل الخدمة يا بتفتحها للكل.",
            how: R`Storage: الملفات نفسها في object storage (زي S3)، والـ metadata صف في [[storage.objects]] (bucket_id و name و owner). كل عملية من الـ client بتتحول عملية على الجدول ده، فالـ RLS بتحكم: upload = INSERT، و download و list = SELECT، و upsert = SELECT و UPDATE، و remove = DELETE.

[[storage.foldername(name)]] بتقسم المسار لـ array فولدرات، و [[(...)[1]]] أول فولدر (Postgres arrays بتبدأ من 1). والمقارنة بـ [[auth.uid()::text]] لأن الـ uid نوعه uuid والمسار نص.

الـ public bucket: القراية مش محتاجة policy ولا login، أي حد عنده الرابط. مناسب للصور العامة (صور منتجات). الـ private: [[createSignedUrl(path, ثواني)]] رابط مؤقت. ومتحطش حاجة حساسة (بطايق، وعقود) في public أبدًا. الـ URL ممكن يتخمن أو يتسرّب.

Realtime postgres_changes: Postgres بيكتب التغييرات في الـ WAL، وسيرفر Realtime بيقراها من publication [[supabase_realtime]]، ولكل subscriber بيتأكد من RLS قبل ما يبعت. و [[filter: "user_id=eq." + id]] بيقلل اللي بيتبعت. للـ DELETE، الـ payload فيه الـ primary key بس، إلا لو عملت [[REPLICA IDENTITY FULL]] على الجدول.

الحدود: postgres_changes بيشيّك RLS لكل subscriber على كل تغيير، فمع آلاف المشتركين بيبقى تقيل. Supabase بينصح بـ [[Broadcast]] (رسايل بتبعتها انت، أو من trigger في القاعدة) للحاجات الكبيرة زي الشات، و [[Presence]] لـ «مين أونلاين».

والـ realtime مش بديل للداتا: لو الـ websocket اتقطع، اللي حصل وقتها ضاع. لما يرجع اعمل fetch للحالة الحالية.`,
            when: "Storage: صور بروفايل، ومرفقات، وملفات بتترفع من اليوزر. Realtime: لوحات بتتحدث لوحدها (أوردرات، تذاكر دعم)، وإشعارات جوه التطبيق، وحاجات تعاونية بسيطة.",
            mistakes: R`bucket public لملفات خاصة. policy للـ INSERT بس فالرفع يفشل (ناقص SELECT) أو الاستبدال يفشل (ناقص UPDATE). مسار الملف من غير فولدر اليوزر، فمفيش طريقة تكتب policy. تنسى تضيف الجدول للـ publication. تنسى [[removeChannel]] لما الـ component يتشال، فالـ subscriptions تتراكم. وتعتمد على realtime لوحده من غير fetch بعد إعادة الاتصال.`
          },
          lines: [
            "المسار: فولدر باسم id اليوزر، وجواه الصورة.",
            "ارفع:",
            "في bucket اسمه avatars،",
            "الملف في المسار ده، واستبدله لو موجود (محتاج UPDATE policy).",
            "رابط مؤقت لمدة ساعة (للـ bucket الـ private).",
            "اشترك في التغييرات:",
            "channel باسم،",
            "كل INSERT على جدول orders (والـ RLS بتحدد أنهي صفوف توصلك)،",
            "الصف الجديد في payload.new.",
            "قفلة الـ callback.",
            "ابدأ الاشتراك.",
            "لما تخلص (الـ component اتشال): الغي الاشتراك."
          ]
        }
      ]
    },
    {
      t: "Mongoose و Drizzle و seed",
      l: 3,
      n: "populate و N+1 في Mongoose، وبديل Prisma الأقرب لـ SQL، وإزاي تملا القاعدة بداتا شبه الحقيقية",
      items: [
        {
          cmd: "populate",
          title: "Mongoose: populate بدل JOIN، و N+1 بشكل تاني",
          desc: R`MongoDB مفيهاش JOIN زي SQL. في Mongoose بتخزن الـ ObjectId بتاع المستند المرتبط ([[user: { type: ObjectId, ref: "User" }]])، و [[populate("user")]] بيجيبه.

الـ populate مش JOIN في القاعدة: هو استعلام تاني. Mongoose بيجيب الأوردرات، ويجمع الـ user ids كلها، ويعمل [[User.find({ _id: { $in: ids } })]] واحد، ويحط كل يوزر مكانه. يعني ٢ استعلام، زي include في Prisma.

والـ N+1 بيرجع لو عملت populate أو findById جوه loop. وأساسيات Mongoose (الاتصال، والـ schema، و lean) في درس mongoose في تاب «Backend بـ Node»، وأوامر الشيل والباك أب في تاب «MongoDB».`,
          example: R`const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: [{ name: String, qty: Number, unitPrice: Number }],
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);

mongoose.set("debug", true);

const orders = await Order.find({ status: "paid" })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate("user", "email name")
  .lean();

for (const o of await Order.find().limit(20)) {
  const user = await User.findById(o.user);
}

const stats = await Order.aggregate([
  { $match: { status: "paid" } },
  { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $group: { _id: "$user.email", orders: { $sum: 1 } } },
]);`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل ١٠ يوزرز و ١٠٠ أوردر، و [[mongoose.set("debug", true)]] شغال. شغّل الـ find بالـ populate وعدّ الأوامر اللي اتطبعت، وبعدين الـ loop اللي فيه findById. وجرّب populate على حقل مش عليه [[ref]].`,
          sol: R`الـ find بالـ populate هيطبع أمرين: [[orders.find({ status: 'paid' }, ...)]] و [[users.find({ _id: { '$in': [ ... ] } }, { projection: { email: 1, name: 1 } })]]. مهما كان عدد الأوردرات، ٢ بس. والـ user في النتيجة بقى object فيه email و name (والـ _id).

الـ loop هيطبع أمر واحد للأوردرات وبعده ٢٠ مرة [[users.findOne({ _id: ... })]]، يعني ٢١. ده N+1 بالظبط زي درس N+1 في Prisma.

والـ populate على حقل من غير ref: هيطلع [[MissingSchemaError]] أو الحقل هيفضل ObjectId زي ما هو، حسب الحالة. لازم الـ schema يقول الحقل بيشاور على أنهي model، أو تكتب [[populate({ path: "user", model: "User" })]].

(ملاحظة: الأمثلة دي متجرّبتش على MongoDB حقيقي وقت كتابة الدرس. الأسماء بالظبط في سطور الـ debug ممكن تختلف شوية بين نسخ Mongoose، المهم عدد الأوامر.)`,
          solCode: R`mongoose.set("debug", true);

console.log("--- populate");
await Order.find({ status: "paid" }).limit(20).populate("user", "email name").lean();

console.log("--- loop (N+1)");
for (const o of await Order.find().limit(20)) {
  await User.findById(o.user);
}`,
          flag: "script",
          deep: {
            why: "مشاريع Node كتير (خصوصًا القديمة ولوحات الإدارة) على Mongo و Mongoose، ونفس أسئلة الأداء بتتسأل: «ليه الصفحة دي بطيئة؟». لو فاهم إن populate استعلام تاني مش JOIN، هتعرف تصمم الداتا صح وتلاقي الـ N+1.",
            how: R`[[populate]] بيجمع كل قيم الحقل من النتيجة، ويعمل find واحد بـ [[$in]]، ويبدّل الـ ids بالمستندات. التاني argument ([["email name"]]) projection: الحقول اللي عايزها بس، زي select في Prisma. و [[populate({ path: "items.product" })]] للحقول جوه arrays، والـ populate المتداخل بيزوّد استعلام لكل مستوى.

[[lean()]] بيرجّع objects عادية من غير دوال Mongoose، أسرع وأخف لو هتقرا بس.

[[$lookup]] في aggregation هو اللي أقرب لـ JOIN: بيتعمل جوه القاعدة في رحلة واحدة. مفيد للتقارير اللي فيها group و sum على داتا مرتبطة.

في Mongo التصميم بيبدأ من سؤال: الداتا دي بتتقري مع بعض؟ البنود جوه الأوردر (embedded) لأنها دايمًا بتتقري معاه ومبتتعدّلش لوحدها. واليوزر reference لأنه مستقل وليه أوردرات كتير. ومن غير كده بتلاقي نفسك بتعمل populate في كل حتة، وده علامة إن الداتا relational وكان Postgres أنسب.

و index على الحقل اللي بتدوّر بيه ([[index: true]] على user) زي index على FK في SQL.`,
            when: "populate لما محتاج بيانات مستند مرتبط في الرد (اسم اليوزر مع الأوردر). $lookup للتقارير. والـ embedding لداتا بتتقري دايمًا مع الأب ومش بتكبر من غير حد.",
            mistakes: R`findById أو populate جوه loop. populate من غير projection فتجيب اليوزر كامل ومعاه الـ hash. populate متداخل ٣ مستويات على كل request. embedding لحاجة بتكبر من غير حد (كل تعليقات البوست جوه البوست، والمستند ليه حد أقصى ١٦ ميجا). وتنسى index على حقل الـ ref.`
          },
          lines: [
            "schema الأوردر:",
            "reference ليوزر (ObjectId و ref)، وعليه index.",
            "البنود embedded جوه الأوردر.",
            "الحالة بقيم محددة.",
            "و createdAt و updatedAt لوحدهم.",
            "الـ model.",
            "اطبع كل أمر Mongoose بيبعته.",
            "الأوردرات المدفوعة:",
            "الأحدث الأول،",
            "٢٠،",
            "وهات اليوزر بتاع كل واحد (email و name بس) باستعلام تاني واحد بـ $in،",
            "كـ objects عادية.",
            "غلط: لكل أوردر،",
            "استعلام لليوزر بتاعه (N+1).",
            "قفلة.",
            "تقرير بـ aggregation:",
            "المدفوع،",
            "JOIN جوه القاعدة على users،",
            "فكّ الـ array لـ object،",
            "وعدد الأوردرات لكل إيميل.",
            "قفلة."
          ]
        },
        {
          cmd: "Drizzle",
          title: "schema بـ TypeScript و drizzle-kit، و Prisma ولا Drizzle",
          desc: R`Drizzle ORM بديل لـ Prisma، وأقرب لـ SQL: الـ schema ملف TypeScript عادي ([[pgTable]])، والاستعلامات شبه SQL بالظبط ([[db.select().from(users).where(eq(users.email, x))]])، ومفيش generate: الـ types بتطلع من الـ schema على طول.

[[drizzle-kit generate]] بيقارن الـ schema بآخر migration ويكتب ملف SQL جديد، و [[drizzle-kit migrate]] بيطبّقه. زي migrate dev و deploy في Prisma بس خطوتين منفصلين.

Prisma ولا Drizzle؟ Prisma: API عالي المستوى (include و nested writes)، وأسهل للمبتدئ، وليه أدوات (Studio و migrate). Drizzle: لو بتفكر بـ SQL وعايز تتحكم في الاستعلام بالظبط، وأخف (مفيش خطوة generate)، ومناسب للـ serverless والـ edge. معرفة Prisma و SQL بتنقل لـ Drizzle بسرعة.`,
          example: R`// src/schema.ts
import { pgTable, uuid, text, bigint, numeric, timestamp, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: text().notNull().default("pending"),
  total: numeric({ precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("orders_user_created_idx").on(t.userId, t.createdAt.desc())]);

// src/report.ts
const db = drizzle(process.env.DATABASE_URL!);
const top = await db
  .select({ email: users.email, spent: sql<string>$__btsum($__{orders.total})$__bt })
  .from(users)
  .innerJoin(orders, eq(orders.userId, users.id))
  .where(and(eq(orders.status, "paid"), gte(orders.createdAt, sql$__btnow() - interval '90 days'$__bt)))
  .groupBy(users.id)
  .orderBy(desc(sql$__btsum($__{orders.total})$__bt))
  .limit(3);`,
          try: R`اعمل مشروع فيه [[drizzle-orm]] و [[pg]] و [[drizzle-kit]]، وملف [[drizzle.config.ts]] فيه [[dialect: "postgresql"]] ومكان الـ schema و [[out: "./drizzle"]] ورابط القاعدة. شغّل [[npx drizzle-kit generate --name init]] واقرا الـ SQL، وبعدين [[npx drizzle-kit migrate]]. واطبع [[db.select().from(users).where(eq(users.email, "x")).toSQL()]].`,
          sol: R`[[generate]] هيكتب [[drizzle/0000_init.sql]] وفيه [[CREATE TABLE "orders"]] بـ [[GENERATED ALWAYS AS IDENTITY]]، و [[CREATE TABLE "users"]] بـ [[DEFAULT gen_random_uuid()]] و [[CONSTRAINT "users_email_unique" UNIQUE("email")]]، والـ FK بـ [[ON DELETE restrict]]، و [[CREATE INDEX "orders_user_created_idx" ON "orders" USING btree ("user_id","created_at" DESC NULLS LAST)]]. وبين الأوامر [[--> statement-breakpoint]]، ده فاصل Drizzle بيستخدمه وهو بيطبّق. و [[migrate]] هيطبع [[migrations applied successfully!]].

و [[toSQL()]] هيطبع [[{ sql: 'select "id", "email", "name", "created_at" from "users" where "users"."email" = $1', params: [ 'x' ] }]]. شايف: نفس الـ SQL اللي كنت هتكتبه، والقيمة parameter.

ولاحظ إن [[numeric]] بيرجع string في Drizzle (زي pg)، مش Decimal زي Prisma. فالفلوس بتفضل string لحد ما تقرر تعمل بيها إيه.

لو generate قال مفيش تغييرات، اتأكد إن مسار [[schema]] في الـ config صح. ولو migrate فشل في الاتصال، الـ config مش بيقرا .env لوحده، فمحتاج [[import "dotenv/config"]] زي Prisma.`,
          solCode: R`// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL! },
});

// في الترمنال:
// npx drizzle-kit generate --name init
// npx drizzle-kit migrate

// src/check.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { users } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
console.log(db.select().from(users).where(eq(users.email, "x")).toSQL());`,
          flag: "script",
          deep: {
            why: "Drizzle انتشر جدًا في مشاريع Next.js والـ serverless، وهتقابله في مشاريع وفي انترفيوهات. ومقارنته بـ Prisma بتوضحلك الـ trade-offs في أي ORM: API مريح ولا تحكم في الـ SQL، وأدوات جاهزة ولا خفة.",
            how: R`الـ schema هو TypeScript حقيقي، فالـ types بتطلع منه على طول: [[typeof users.$inferSelect]] نوع الصف. مفيش كود متولّد ولا خطوة generate للـ client.

الـ query builder بيتبني SQL واحد: الـ select والـ join والـ where بالظبط زي ما كتبتهم، وده بيخلي الأداء متوقع. و [[sql$__bt...$__bt]] template للأجزاء اللي مش موجودة في الـ API، وبرضه بيبعت القيم parameters (زي $queryRaw).

وفيه كمان relational queries API ([[db.query.users.findMany({ with: { orders: true } })]]) شبه include في Prisma، بس محتاج تعرّف الـ relations. والـ API ده بيتغير في Drizzle 1.0 (كان beta وقت كتابة الدرس)، فارجع للـ docs بتاعة النسخة اللي عندك.

[[drizzle-kit generate]] بيحفظ snapshot للـ schema جنب كل migration، وبيقارن بيه. لو فيه rename بيسألك (rename ولا drop و create). [[drizzle-kit push]] بيطبّق الـ schema على القاعدة مباشرة من غير ملفات migrations، مفيد للتجربة بس مش للإنتاج. و [[drizzle-kit studio]] واجهة زي Prisma Studio.

الـ numeric بيرجع string، و [[bigint({ mode: "number" })]] بيرجّعه number (خد بالك من الأرقام الأكبر من 2^53)، و [[mode: "bigint"]] بيرجّعه BigInt.`,
            when: "Drizzle: فريق مرتاح مع SQL، وتطبيقات serverless أو edge، ولما عايز الاستعلام متوقع ومفيش خطوة build. Prisma: فريق فيه ناس جديدة على SQL، و CRUD كتير بعلاقات متداخلة، ولما Studio و nested writes هيوفروا وقت. والاتنين فيهم مخرج لـ SQL خام.",
            mistakes: R`[[drizzle-kit push]] على الإنتاج. تعدّل ملف migration اتطبق. تنسى [[import "dotenv/config"]] في الـ config. [[mode: "number"]] على IDs ممكن تعدّي 2^53. وتفتكر إن Drizzle بيمنع N+1 لوحده؛ الـ loop بـ await هو هو في أي ORM.`
          },
          lines: [
            "الدوال اللي بتعرّف أعمدة Postgres.",
            "جدول users:",
            "uuid بيتولّد من القاعدة (gen_random_uuid).",
            "نص إجباري و unique.",
            "نص إجباري.",
            "timestamptz بعمود اسمه created_at في القاعدة.",
            "قفلة.",
            "جدول orders:",
            "bigint identity، وبيرجع JavaScript number.",
            "FK على users، ومسح يوزر عنده أوردرات مرفوض.",
            "نص وافتراضيًا pending.",
            "numeric(10,2) (بيرجع string).",
            "timestamptz.",
            "index مركّب (user_id, created_at DESC) في آخر argument.",
            "الـ client برابط القاعدة (بيستخدم pg من تحت).",
            "أكتر ٣ عملاء صرفوا في آخر ٩٠ يوم:",
            "الإيميل ومجموع الصرف (sql template للـ sum)،",
            "من users،",
            "JOIN مع orders،",
            "المدفوع في آخر ٩٠ يوم،",
            "مجمّع باليوزر،",
            "الأكتر الأول،",
            "٣ بس."
          ]
        },
        {
          cmd: "seed بـ faker",
          title: "املا القاعدة بآلاف الصفوف شبه الحقيقية، بالعربي",
          desc: R`دروس كتير بتقولك «جرّب على مليون صف» أو «قيس قبل وبعد الـ index». عشان كده محتاج seed: سكربت بيملا القاعدة بداتا شكلها حقيقي، بكميات كبيرة، وتقدر تعيده في أي وقت.

[[@faker-js/faker]] بيولّد أسماء وإيميلات وأسعار وتواريخ، وفيه locale عربي: [[fakerAR]] بيطلّع أسماء زي «نوف بن عبد السلام». و [[faker.seed(42)]] بيخلي نفس الداتا تطلع كل مرة، فالتجارب تبقى قابلة للتكرار.

والأهم في السرعة: متعملش INSERT لكل صف. ابعت الصفوف دفعات ([[createMany]] في Prisma، أو [[insert().values([...])]] في Drizzle، ألف صف في المرة). ولو محتاج ملايين: [[generate_series]] في SQL أو [[\copy]] من ملف أسرع من أي ORM.`,
          example: R`import { fakerAR as faker } from "@faker-js/faker";

faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });

const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: faker.helpers.weightedArrayElement([
      { value: "paid", weight: 7 }, { value: "pending", weight: 2 }, { value: "cancelled", weight: 1 },
    ]),
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}`,
          try: R`شغّل السكربت ده (مع schema الـ Drizzle من الدرس اللي فات، أو حوّله لـ [[prisma.user.createMany]])، واطبع أول ٣ أسماء وعدد الأوردرات. شغّله مرتين بعد ما تفضّي الجداول: الأسماء اتغيرت؟ وبعدين شيل [[faker.seed(42)]] وشغّل تاني. وقيس الوقت لو خليت الـ loop يعمل insert لكل أوردر لوحده.`,
          sol: R`مع [[faker.seed(42)]] هتطلع نفس الأسماء ونفس عدد الأوردرات في كل مرة (عندي كانت [[نوف بن عبد السلام]] و [[دكتور فاطمه بوهاها]] و [[بتول النفير]]، وحوالي ٢٤٠٠ أوردر، والأرقام عندك ممكن تختلف لو نسخة faker مختلفة). من غير seed كل تشغيلة بداتا مختلفة. ده مفيد للتجربة، بس وحش في test بيعتمد على رقم معين.

والإيميلات من [[user$__{i}]] مش من faker عشان عمود الإيميل unique، و faker ممكن يكرر مع آلاف الصفوف. و [[fakerAR]] أصلًا بيطلّع إيميلات بحروف عربي أحيانًا أو مش مفهومة، فالـ index أضمن.

الـ insert لكل صف لوحده هياخد وقت أكتر بمراحل: كل صف round trip. ألف صف في كل insert بيقسم الوقت على ألف تقريبًا. ومتكبّرش الدفعة أوي: Postgres ليه حد ٦٥٥٣٥ parameter في الأمر الواحد، فلو كل صف ٥ أعمدة يبقى أقصى حاجة حوالي ١٣ ألف صف في الدفعة.`,
          solCode: R`import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { fakerAR as faker } from "@faker-js/faker";
import { users, orders } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
await db.delete(orders);
await db.delete(users);
faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
console.time("seed");
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });
const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: "paid",
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}
console.timeEnd("seed");
console.log(fakeUsers.slice(0, 3).map((u) => u.name), fakeOrders.length);
process.exit(0);`,
          flag: "script",
          deep: {
            why: "مشاكل الأداء (N+1، و index ناقص، و OFFSET) مش بتبان على ١٠ صفوف. والواجهة بتبان مختلفة خالص مع أسماء عربي طويلة ونصوص حقيقية. والـ seed بيخلّي أي حد في الفريق يقوم بقاعدة فيها داتا في دقيقة، بدل ما كل واحد يضيف بإيده.",
            how: R`faker مولّد عشوائي بـ seed: نفس الـ seed ونفس ترتيب المناداة يطلّعوا نفس القيم. لو غيّرت ترتيب الأسطر، القيم هتتغير.

[[fakerAR]] instance جاهز بالـ locale العربي (أسماء وعناوين)، والحاجات اللي مش موجودة بالعربي بترجع للإنجليزي. و [[faker.helpers.weightedArrayElement]] بيختار بنسب (٧٠٪ مدفوع)، فالتوزيع يبقى شبه الحقيقة مش متساوي.

الداتا الواقعية مش بس أسماء: التوزيع مهم. أغلب اليوزرز عندهم أوردرات قليلة وشوية عندهم كتير، والتواريخ متوزعة على شهور. ده اللي بيطلّع مشاكل الـ indexes وخطط الاستعلام الحقيقية.

السرعة: batch insert بيبعت صفوف كتير في أمر واحد. [[createMany]] في Prisma بيعمل كده، و [[skipDuplicates: true]] بيتجاهل التكرار. ولملايين الصفوف، [[INSERT ... SELECT ... FROM generate_series(1, 1000000)]] جوه القاعدة (درس B-tree index) أسرع بكتير، لأن الداتا مش بتعدّي على الشبكة أصلًا.

وفي Prisma: [[migrations.seed]] في [[prisma.config.ts]] (زي [[seed: "tsx prisma/seed.ts"]]) و [[npx prisma db seed]] بيشغّله. ومن Prisma 7 مبيشتغلش لوحده بعد migrate dev أو reset، لازم تشغّله انت.`,
            when: "أول ما تعمل الـ schema: seed صغير للتطوير. قبل ما تقيس أداء: seed كبير. في الـ tests: داتا محددة بـ seed ثابت. وعمره ما يشتغل على الإنتاج.",
            mistakes: R`insert لكل صف في loop. faker للإيميلات في عمود unique فيقع بعد آلاف الصفوف. من غير seed ثابت فالـ test يعدّي مرة ويفشل مرة. سكربت seed بيمسح الجداول وبيقرا DATABASE_URL فحد يشغّله بالغلط على الإنتاج (حط check إن الرابط localhost). ودفعة أكبر من حد الـ parameters.`
          },
          lines: [
            "faker بالـ locale العربي.",
            "ثبّت الـ seed: نفس الداتا كل مرة.",
            "١٠٠٠ يوزر:",
            "إيميل فريد من الرقم (مش من faker عشان الـ unique)،",
            "اسم عربي،",
            "وتاريخ تسجيل في آخر سنة.",
            "قفلة.",
            "insert واحد بكل اليوزرز، ورجّع الـ ids.",
            "لكل يوزر من ٠ لـ ٥ أوردرات:",
            "عدد عشوائي.",
            "صاحب الأوردر،",
            "حالة بنسب:",
            "٧٠٪ مدفوع، و٢٠٪ pending، و١٠٪ ملغي.",
            "قفلة.",
            "سعر بين ٥٠ و ٣٠٠٠ (بيرجع string مناسب لـ numeric)،",
            "وتاريخ في آخر ٦ شهور.",
            "قفلة.",
            "قفلة الـ flatMap: array واحد فيه كل الأوردرات.",
            "دفعات ألف ألف:",
            "insert واحد لكل ألف أوردر.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "أسئلة انترفيو قواعد البيانات",
      l: 3,
      n: "الأسئلة اللي بتتسأل في أي انترفيو backend، والإجابة بمثال من المتجر بدل التعريف المحفوظ",
      items: [
        {
          cmd: "SQL ولا NoSQL",
          title: "امتى Postgres وامتى MongoDB، وإزاي تجاوب من غير «حسب الحالة» وبس",
          desc: R`السؤال مش «أنهي أحسن». السؤال «شكل الداتا إيه، وهتتقري إزاي، وإيه اللي لازم يفضل مظبوط؟».

SQL (Postgres و MySQL): جداول بـ schema صارم، وعلاقات بـ FKs و JOINs، و transactions و constraints بتحمي الداتا. مناسب لأي حاجة فيها فلوس، أو علاقات كتير، أو تقارير بتجمّع من كذا جدول.

NoSQL (MongoDB، و Redis، و DynamoDB): أنواع مختلفة، مش حاجة واحدة. Mongo مستندات مرنة بتتقري كوحدة واحدة. Redis key-value في الذاكرة للـ cache والـ sessions. DynamoDB و Cassandra لحجم ضخم بأنماط قراية معروفة مسبقًا.

الإجابة القوية: الافتراضي Postgres (وفيه jsonb للأجزاء المرنة)، ونختار حاجة تانية لما يبقى فيه سبب محدد تقدر تقوله.`,
          example: R`SELECT name, price, attrs FROM products WHERE is_active;
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
SELECT u.email, sum(o.total) FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.email;`,
          try: R`لكل حالة من دول قول هتختار إيه وليه في جملتين: (١) محفظة فلوس للمدرسين فيها سحب وإيداع. (٢) لوج أحداث من تطبيق موبايل، ملايين في اليوم وكل حدث شكله مختلف. (٣) cache لنتيجة API بتتطلب كتير. (٤) كتالوج منتجات كل فئة ليها مواصفات مختلفة.`,
          sol: R`(١) Postgres: فلوس يعني transactions و constraints ([[CHECK (balance >= 0)]]) و [[SELECT FOR UPDATE]] أو atomic UPDATE. ولو قلت Mongo لازم تبرر الـ transactions (محتاجة replica set) وإن الـ schema مش هيحمي الرصيد.

(٢) ممكن الاتنين: Postgres بجدول فيه عمود jsonb و partitioning بالتاريخ بيستحمل كويس، و Mongo أو ClickHouse لو الحجم ضخم والتحليل هو الأساس. الإجابة الأقوى تسأل: هنعمل إيه بيها؟ تقارير تجميع؟ يبقى محتاجين حاجة معمولة للتحليل.

(٣) Redis، بـ TTL. مش قاعدة أساسية: لو ضاع، بيتحسب تاني.

(٤) Postgres بجدول products بأعمدة ثابتة (الاسم والسعر والمخزون) و [[attrs jsonb]] للمواصفات، و GIN index عليه (درس jsonb). ده بيدّيك مرونة Mongo في جزء واحد بس، والباقي محمي.

الغلطة في الانترفيو: «NoSQL أسرع و scalable أكتر». ده مش صحيح بشكل عام. السرعة بتيجي من الـ indexes وشكل الاستعلام.`,
          flag: "script",
          deep: {
            why: "السؤال ده في أغلب انترفيوهات الـ backend، وبيكشف لو انت بتختار أدوات بالموضة ولا بالمتطلبات. والإجابة الكويسة بتبين إنك عارف trade-offs حقيقية.",
            how: R`الفروق اللي تتقال: الـ schema (صارم ولا مرن، مع إن Mongoose بيرجّع schema في التطبيق). والعلاقات (JOIN في القاعدة ولا embedding و populate). والـ consistency (ACID من زمان في SQL، و Mongo بقت فيها transactions بس مكلفة ومش الأسلوب الأساسي). والـ scaling (Postgres بيكبر رأسيًا وبـ read replicas كويس جدًا لأغلب الشركات، و Mongo معمولة للـ sharding من الأول).

وفي الحقيقة الاتنين قربوا من بعض: Postgres فيه jsonb، و Mongo فيها transactions و $lookup.`,
            when: "أول قرار في أي مشروع، وفي أي سؤال system design.",
            mistakes: R`«Mongo عشان مفيش schema» (فيه schema، بس في الكود ومحدش بيحميه). «SQL مش بيعمل scale». تختار حاجتين من الأول من غير سبب. وتنسى إن الفريق بيعرف إيه جزء من القرار.`
          },
          lines: [
            "جدول products من أول التاب: أعمدة ثابتة للحاجات المهمة، و attrs jsonb للمواصفات المرنة.",
            "بحث جوه الـ jsonb (زي Mongo)، ومعاه GIN index يبقى سريع.",
            "و JOIN و GROUP BY في استعلام واحد، ودي الحاجة اللي Mongo بتصعّبها."
          ],
          solCode: R`CREATE TABLE teacher_wallets (
  teacher_id bigint PRIMARY KEY,
  balance_cents bigint NOT NULL DEFAULT 0 CHECK (balance_cents >= 0)
);
UPDATE teacher_wallets SET balance_cents = balance_cents - 5000
WHERE teacher_id = 1 AND balance_cents >= 5000;`
        },
        {
          cmd: "ACID",
          title: "ACID بمثال: تحويل فلوس من محفظة لمحفظة",
          desc: R`ACID أربع ضمانات للـ transaction:

Atomicity: كله أو ولا حاجة. الخصم من محفظة والإضافة للتانية يا حصلوا الاتنين يا ولا واحد.

Consistency: الداتا بتنتقل من حالة صحيحة لحالة صحيحة. الـ constraints (زي [[CHECK (balance >= 0)]]) عمرها ما تتكسر حتى في النص.

Isolation: transactions شغالة في نفس الوقت متشوفش تعديلات بعض الناقصة. وقد إيه بالظبط بيتحدد بالـ isolation level (الدرس الجاي).

Durability: بعد COMMIT الداتا مش هتضيع حتى لو الكهربا قطعت. Postgres بيكتبها في الـ WAL على الديسك قبل ما يقولك تم.`,
          example: R`CREATE TABLE wallets (id bigint PRIMARY KEY, balance numeric(10,2) NOT NULL CHECK (balance >= 0));
INSERT INTO wallets VALUES (1, 100), (2, 0);
BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          try: R`شغّل المثال: أول UPDATE هيفشل. بعد الـ error جرّب تكمّل التاني وتعمل COMMIT. إيه اللي حصل للمحفظتين؟ وبعدين كرر بمبلغ ٥٠ وشوف.`,
          sol: R`بـ ١٥٠: أول UPDATE هيفشل بـ [[violates check constraint "wallets_balance_check"]]. بعدها أي أمر في نفس الـ transaction هيطلع [[current transaction is aborted, commands ignored until end of transaction block]]، و COMMIT هيتحول ROLLBACK (psql هيكتب [[ROLLBACK]]). المحفظتين هيفضلوا ١٠٠ و ٠. ده الـ Atomicity والـ Consistency مع بعض: مفيش ١٥٠ اتضافوا لحد من غير ما يتخصموا من حد.

بـ ٥٠: الاتنين هيتنفذوا و COMMIT: ٥٠ و ٥٠.

في الانترفيو قول المثال ده بالظبط، وضيف إن الـ durability في Postgres جاية من الـ WAL (بيتكتب قبل الـ COMMIT يرجع)، و [[synchronous_commit = off]] بيتنازل عن جزء منها عشان السرعة.`,
          solCode: R`BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;

BEGIN;
UPDATE wallets SET balance = balance - 50 WHERE id = 1;
UPDATE wallets SET balance = balance + 50 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          flag: "script",
          deep: {
            why: "أكتر سؤال قواعد بيانات بيتسأل. والتعريف المحفوظ للأربع حروف مش كفاية؛ اللي بيفرق إنك تدّي مثال وتوضح كل حرف بيحمي من إيه.",
            how: R`Atomicity في Postgres جاية من MVCC: كل صف ليه نسخ، والتعديلات بتبقى مش ظاهرة لحد الـ COMMIT، والـ ROLLBACK بيسيبها ميتة (والـ VACUUM بينضفها). Consistency جاية من الـ constraints والـ FKs والـ triggers. Isolation من الـ snapshots والأقفال. Durability من الـ WAL و fsync.

وخلي بالك: الـ C في ACID غير الـ C في CAP theorem. هنا معناها «القواعد متتكسرش»، هناك معناها «كل النسخ شايفة نفس القيمة».`,
            when: "أي عملية بتعدّل أكتر من صف ولازم تبقى مع بعض: تحويل، وأوردر، وحجز. التفاصيل العملية في درس transaction ودرس $transaction في تاب «Backend بـ Node».",
            mistakes: R`تحفظ التعريفات من غير مثال. تخلط C بتاعة ACID مع CAP. تقول إن Mongo «مش ACID» (بقت فيها transactions متعددة المستندات، بشروط). وفي الكود: تعمل الخطوتين من غير transaction وتفتكر إن القاعدة هتحميك لوحدها.`
          },
          lines: [
            "محافظ، والرصيد مينفعش يبقى سالب.",
            "محفظة فيها ١٠٠ ومحفظة فاضية.",
            "ابدأ transaction.",
            "اخصم ١٥٠: هيفشل (الرصيد هيبقى سالب).",
            "أضيف للتانية: متجاهل، الـ transaction بقت aborted.",
            "COMMIT هنا بيبقى ROLLBACK.",
            "المحفظتين زي ما كانوا."
          ]
        },
        {
          cmd: "isolation anomalies",
          title: "dirty read و lost update و phantom و write skew: كل واحدة بمثال",
          desc: R`لما two transactions شغالين في نفس الوقت، ممكن يحصل مشاكل (anomalies)، والـ isolation level بيحدد أنهي منها ممكن:

dirty read: تقرا تعديل لسه متعملوش COMMIT. مستحيل في Postgres خالص.

non-repeatable read: تقرا نفس الصف مرتين في transaction واحدة فتلاقي قيمتين، لأن حد عمل COMMIT في النص. بيحصل في [[READ COMMITTED]] (الافتراضي)، ومش بيحصل في [[REPEATABLE READ]].

phantom: نفس الـ WHERE يرجّع صفوف زيادة في المرة التانية. في Postgres الـ REPEATABLE READ بيمنعه.

lost update: الاتنين قروا المخزون ١٠، والاتنين كتبوا ٩، فبيعتين بقوا واحدة. بيحصل في READ COMMITTED لو قريت في الكود وكتبت. REPEATABLE READ بيرفض التاني بـ error.

write skew: كل واحد قرا حاجة وكتب في صف مختلف، فالقاعدة (زي «لازم دكتور واحد مناوب على الأقل») اتكسرت. [[SERIALIZABLE]] بس اللي بيمنعه.`,
          example: R`// session A و B في نفس الوقت، READ COMMITTED
await a.query("BEGIN"); await b.query("BEGIN");
const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1]);
await a.query("COMMIT");
await pending;
await b.query("COMMIT");`,
          try: R`شغّل السيناريو بمكتبة pg وعميلين ([[new pg.Client]] مرتين)، والمخزون ١٠. المخزون النهائي كام؟ وبعدين غيّر BEGIN في الاتنين لـ [[BEGIN ISOLATION LEVEL REPEATABLE READ]] وشوف B حصله إيه.`,
          sol: R`في READ COMMITTED: المخزون النهائي [[9]] مع إن قطعتين اتباعوا. ده lost update. الـ UPDATE بتاع B استنى A يخلص (قفل على الصف)، وبعدين كتب 9 اللي كان حسبها من قراية قديمة.

في REPEATABLE READ: الـ UPDATE بتاع B هيفشل بـ [[could not serialize access due to concurrent update]] (code [[40001]])، والمخزون 9 بعد بيعة واحدة بس. التطبيق لازم يعمل retry للـ transaction كلها.

والحل الأبسط من غير تغيير الـ level: متقراش في الكود وتكتب. [[UPDATE products SET stock = stock - 1 WHERE ... AND stock >= 1]] (درس atomic UPDATE)، أو [[SELECT ... FOR UPDATE]].`,
          solCode: R`import pg from "pg";
const url = process.env.DATABASE_URL;
const a = new pg.Client(url), b = new pg.Client(url);
await a.connect(); await b.connect();

for (const level of ["READ COMMITTED", "REPEATABLE READ"]) {
  await a.query("UPDATE products SET stock = 10 WHERE name = 'Hoodie'");
  await a.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt); await b.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt);
  const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
  const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1])
    .then(() => "ok", (e) => "ERR " + e.code);
  await a.query("COMMIT");
  const res = await pending;
  await b.query(res === "ok" ? "COMMIT" : "ROLLBACK");
  const { rows } = await a.query("SELECT stock FROM products WHERE name = 'Hoodie'");
  console.log(level, res, rows[0].stock);
}
await a.end(); await b.end();`,
          flag: "script",
          deep: {
            why: "السؤال «إيه الـ isolation levels؟» بيتسأل كتير، والإجابة اللي بتفرق هي إنك تربط كل level بالمشكلة اللي بيمنعها، بمثال حقيقي زي المخزون، وتقول الحل العملي.",
            how: R`Postgres بيطبّق الـ levels بـ snapshots (MVCC): READ COMMITTED بياخد snapshot جديد لكل أمر، و REPEATABLE READ snapshot واحد للـ transaction كلها، و SERIALIZABLE نفس الـ snapshot ومعاه تتبع للاعتماديات (SSI) ويلغي transaction لو النتيجة مش ممكن تطلع من تنفيذ ورا بعض.

الأعلى = مشاكل أقل بس errors أكتر ([[40001]]) لازم الكود يعيد عليها. التفاصيل في درس isolation levels في المستوى التاني.

optimistic ولا pessimistic locking؟ pessimistic: اقفل الأول ([[FOR UPDATE]]) لما التضارب متوقع كتير (آخر قطعة في flash sale). optimistic: عمود [[version]] و [[UPDATE ... SET version = version + 1 WHERE id = $1 AND version = $2]]، ولو 0 صفوف اتعدّلت يبقى حد سبقك، اعرض رسالة أو أعد المحاولة. مناسب لتعديلات الفورمز اللي التضارب فيها نادر.`,
            when: "أي read-modify-write: مخزون، ورصيد، وكوبونات، وحجز مواعيد.",
            mistakes: R`تقول إن READ COMMITTED بيمنع lost update. ترفع كل حاجة لـ SERIALIZABLE من غير retry. تفتكر إن الـ transaction لوحدها (BEGIN و COMMIT) بتمنع التضارب. وتنسى إن Postgres مفيهوش dirty read حتى لو طلبت READ UNCOMMITTED.`
          },
          lines: [
            "افتح transaction في الاتنين.",
            "A قرا المخزون (١٠).",
            "B قرا نفس المخزون (١٠).",
            "A كتب ٩.",
            "B بيحاول يكتب ٩: بيستنى قفل A.",
            "A عمل COMMIT.",
            "B كمّل وكتب ٩ فوق ٩ (في READ COMMITTED).",
            "B عمل COMMIT: بيعتين والمخزون نقص واحد."
          ]
        },
        {
          cmd: "index trade-offs",
          title: "ليه متعملش index على كل عمود",
          desc: R`الـ index بيسرّع القراية، بس ليه تمن:

كل INSERT و UPDATE و DELETE لازم يعدّل كل index على الجدول. جدول عليه ١٠ indexes الكتابة فيه أبطأ بكتير.

مساحة على الديسك وفي الذاكرة (الـ index اللي ميدخلش الـ RAM بيبقى أبطأ).

والـ planner ممكن ميستخدموش أصلًا: لو الشرط بيرجّع جزء كبير من الجدول ([[status = 'paid']] و ٩٠٪ مدفوع)، الـ Seq Scan أسرع.

القاعدة: index للأعمدة اللي في WHERE و JOIN و ORDER BY لاستعلامات بتتشغّل كتير، والـ FKs، وبعد كده قيس بـ EXPLAIN وامسح اللي مش مستخدم.`,
          example: R`SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan, pg_relation_size(indexrelid) DESC;
CREATE INDEX orders_pending_idx ON orders (created_at) WHERE status = 'pending';
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);`,
          try: R`شغّل أول استعلام على قاعدة الـ lab بعد الدروس اللي فاتت: فيه indexes عندها [[idx_scan = 0]]؟ وبعدين اعمل ١٠٠ ألف INSERT في orders مرة بالـ indexes اللي عليها ومرة بعد ما تمسح الـ indexes الزيادة، وقارن الوقت بـ [[\timing]].`,
          sol: R`هتلاقي indexes [[idx_scan]] بتاعها صفر أو قليل جدًا، غالبًا اللي عملتها للتجربة (زي [[orders_created_at_idx]] لو مبقتش بتفلتر بيه). الـ primary keys والـ unique ممكن يبقوا صفر برضه بس دول متمسحهمش: وظيفتهم منع التكرار مش السرعة.

الـ INSERT هيبقى أسرع بعد ما تمسح الـ indexes الزيادة، والفرق بيكبر مع عدد الـ indexes وحجمها. لو الجدول مكانش عليه indexes زيادة أصلًا (أوامر DROP طلّعت NOTICE إن الـ index مش موجود)، الوقتين هيبقوا قريبين، وده منطقي. ده بالظبط السبب إن الـ bulk imports الكبيرة أحيانًا بتمسح الـ indexes وتعملها تاني بعد الـ import.

في الانترفيو: «الـ index بيسرّع القراية ويبطّأ الكتابة وياخد مساحة، وبعمله على اللي بقيس إنه محتاجه».`,
          solCode: R`\timing on
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);
DROP INDEX IF EXISTS orders_created_at_idx;
DROP INDEX IF EXISTS orders_created_id_idx;
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);`,
          flag: "script",
          deep: {
            why: "«ليه منعملش index على كل حاجة؟» سؤال كلاسيكي، والإجابة بتبين إنك فاهم الـ index بيتخزن ويتحدث إزاي، مش بس إنه «بيسرّع».",
            how: R`الـ B-tree شجرة مترتبة، وكل تعديل في الجدول بيضيف entry فيها أو يعدّلها، وأحيانًا يقسم صفحة. في Postgres كمان أي UPDATE بيعمل نسخة جديدة من الصف، فبيحتاج entry جديدة في كل index (إلا لو HOT update: العمود المتعدل مش في أي index والصفحة فيها مكان).

أنواع تقلل التكلفة: partial index ([[WHERE status = 'pending']]) أصغر بكتير ومفيد لو بتسأل عن جزء صغير. covering index ([[INCLUDE (total)]]) بيخلي القراية من الـ index بس (Index Only Scan). و [[CREATE INDEX CONCURRENTLY]] على الإنتاج عشان متقفلش الكتابة.

وترتيب الأعمدة في الـ composite index بيفرق (درس composite index)، و GIN للـ jsonb والبحث، و BRIN لجداول ضخمة مترتبة بالوقت.`,
            when: "بعد ما تشوف استعلام بطيء في EXPLAIN أو pg_stat_statements، مش قبل. والـ FKs من الأول.",
            mistakes: R`index على عمود boolean لوحده. index مكرر (عندك [[(user_id, created_at)]] وعامل [[(user_id)]] كمان، الأول بيغطي التاني). CREATE INDEX من غير CONCURRENTLY على جدول كبير في الإنتاج. وتمسح unique index لأن idx_scan صفر.`
          },
          lines: [
            "كل index: اسم الجدول والـ index، واتستخدم كام مرة، وحجمه،",
            "من إحصائيات Postgres،",
            "الأقل استخدامًا والأكبر الأول (مرشحين للمسح).",
            "partial index: على الأوردرات الـ pending بس، فصغير.",
            "على الإنتاج: اعمله من غير ما تقفل الكتابة."
          ]
        },
        {
          cmd: "replication و sharding",
          title: "القاعدة مبقتش مستحملة: read replicas ولا sharding",
          desc: R`replication: نسخ من القاعدة كلها على سيرفرات تانية. الـ primary بيستقبل الكتابة، والـ replicas بتاخد التغييرات منه (streaming من الـ WAL) وبتخدم القراية. بيحل: قراية كتير، و high availability (لو الـ primary وقع، replica تبقى primary).

sharding: تقسيم الداتا نفسها على كذا سيرفر، كل واحد عنده جزء (مثلًا حسب tenant_id). بيحل: كتابة أكتر من اللي سيرفر واحد يستحمله، أو داتا أكبر من سيرفر. وتمنه كبير: JOIN و transactions بين shards صعبة، وتغيير الـ shard key شبه مستحيل.

الترتيب الطبيعي: indexes واستعلامات أحسن، وبعدين سيرفر أكبر، وبعدين connection pooling و cache، وبعدين read replicas، و sharding في الآخر خالص.`,
          example: R`SELECT client_addr, state, sync_state, replay_lag FROM pg_stat_replication;
SELECT pg_is_in_recovery();
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;`,
          try: R`يوزر عمل تعديل على بروفايله، وبعدين الصفحة اتعملها refresh وظهر الاسم القديم. التطبيق بيكتب على الـ primary ويقرا من replica. اشرح ليه، واقترح حلين.`,
          sol: R`ده replication lag: الـ replica بتستلم التغييرات asynchronous، فممكن تكون ورا الـ primary بملّي ثواني أو ثواني. القراية اللي جات بعد الكتابة على طول راحت replica لسه موصلهاش التعديل.

الحلول: (١) read-your-writes: القراية اللي بعد كتابة من نفس اليوزر (لفترة قصيرة، أو لنفس الـ session) تروح للـ primary. (٢) القراية المهمة (البروفايل، والرصيد، وحالة الدفع) دايمًا من الـ primary، والـ replicas للتقارير والقوايم والبحث. (٣) synchronous replication بتحل ده بس بتبطّأ كل كتابة.

وقول في الانترفيو إن [[pg_stat_replication]] على الـ primary و [[pg_last_xact_replay_timestamp()]] على الـ replica بيقيسوا الـ lag.`,
          solCode: R`-- على الـ replica: هي ورا بقد إيه؟
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;

// في الكود: القراية بعد كتابة من الـ primary
const user = await primary.user.update({ where: { id }, data: { name } });
const profile = await primary.user.findUnique({ where: { id } });
const feed = await replica.post.findMany({ take: 20 });`,
          flag: "script",
          deep: {
            why: "أي سؤال system design بيوصل لـ «والقاعدة لما الترافيك يزيد؟». والإجابة الناضجة إنك متقفزش لـ sharding، وتعرف مشاكل كل حل (lag، و cross-shard queries).",
            how: R`الـ streaming replication في Postgres: الـ replica بتقرا الـ WAL من الـ primary وتطبّقه، فهي نسخة طبق الأصل وللقراية بس. الـ logical replication بتنقل تغييرات جداول معينة (مفيد للنقل بين نسخ أو لأنظمة تانية). Supabase و RDS و Neon بيدّوك read replicas بزرار.

الـ sharding في Postgres مش built-in: Citus extension، أو تقسيم في التطبيق (كل tenant في قاعدة). والـ partitioning (جدول واحد مقسوم بالتاريخ جوه نفس السيرفر) حاجة تانية خالص، بتسهّل مسح الداتا القديمة وبتسرّع استعلامات الفترات.`,
            when: "replicas لما القراية هي الضغط والـ primary CPU عالي. sharding لما الكتابة أو الحجم فعلًا أكبر من أكبر سيرفر معقول، وده نادر في أغلب الشركات.",
            mistakes: R`sharding من أول يوم. قراية من replica بعد الكتابة على طول. تفتكر إن الـ replica باك أب (مسح بالغلط بيتنسخ للـ replica في ثانية؛ الباك أب في تاب «PostgreSQL»). و shard key بيعمل hot spot (كل الترافيك على shard واحد).`
          },
          lines: [
            "على الـ primary: الـ replicas المتصلة وحالتها والتأخير.",
            "true يعني السيرفر ده replica.",
            "على الـ replica: آخر تعديل اتطبق من قد إيه."
          ]
        },
        {
          cmd: "الاستعلام بطيء",
          title: "الصفحة بطيئة وبيقولوا «القاعدة»: هتعمل إيه خطوة بخطوة",
          desc: R`الإجابة المرتبة أهم من أي أداة:

١. اتأكد إنها القاعدة: الـ query log أو APM بيوريك وقت كل استعلام. ممكن المشكلة N+1 (استعلامات سريعة كتير) مش استعلام بطيء.

٢. لاقي الاستعلام: [[pg_stat_statements]] مترتب بـ [[total_exec_time]] (الأكتر تكلفة إجمالًا، مش الأبطأ مرة واحدة).

٣. [[EXPLAIN (ANALYZE, BUFFERS)]]: دوّر على Seq Scan على جدول كبير، و [[Rows Removed by Filter]] كبير، و Sort على داتا كتير، وفرق كبير بين rows المتوقع والحقيقي.

٤. صلّح: index مناسب، أو اكتب الاستعلام تاني (keyset بدل OFFSET، و EXISTS، وأعمدة أقل)، أو [[ANALYZE]] لو الإحصائيات قديمة.

٥. قيس تاني، وراقب.`,
          example: R`SELECT query, calls, round(total_exec_time) AS total_ms, round(mean_exec_time, 1) AS mean_ms
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;
CREATE INDEX IF NOT EXISTS orders_user_created_idx ON orders (user_id, created_at DESC);`,
          try: R`على جدول orders بعد ما تضيف ٢٠٠ ألف صف (درس B-tree index) امسح أي index على user_id (عندك [[orders_user_created_idx]] من درس composite index)، وشغّل الـ EXPLAIN اللي في المثال واكتب أهم ٣ سطور فيه. وبعدين اعمل الـ index وشغّله تاني وقارن Execution Time والـ Buffers.`,
          sol: R`قبل الـ index هتلاقي [[Seq Scan on orders]] (أو Parallel Seq Scan) ومعاها [[Filter: (user_id = $0)]]، وفوقها [[Sort]] بـ [[Sort Key: orders.created_at DESC]]: قرا الجدول كله ورتّب عشان ٢٠ صف. و Buffers بالآلاف (عندي حوالي ١٩٠٠ صفحة لـ ٢٠٠ ألف صف)، و Execution Time عشرات الملّي ثواني حسب الجهاز وحسب عدد أوردرات اليوزر ده.

بعد الـ index: [[Index Scan using orders_user_created_idx on orders]] و [[Index Cond: (user_id = $0)]] ومفيش Sort (الـ index مترتب)، و Buffers بقت أرقام صغيرة (٦ تقريبًا)، والوقت أقل من ملّي ثانية. عندي كان ٢٩ ملّي ثانية قبل و ٠٫٠٦ بعد.

في الانترفيو اشرح الـ Buffers: عدد الصفحات (8KB) اللي اتقرت، ودي أثبت من الوقت اللي بيتأثر بالـ cache. ولو [[pg_stat_statements]] مش متفعّل: محتاج [[shared_preload_libraries]] و [[CREATE EXTENSION pg_stat_statements]] (درس الاستعلامات البطيئة في تاب «PostgreSQL»).`,
          solCode: R`DROP INDEX IF EXISTS orders_user_created_idx;
DROP INDEX IF EXISTS orders_user_id_idx;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;

CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);
ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;`,
          flag: "script",
          deep: {
            why: "«إزاي تتعامل مع استعلام بطيء؟» سؤال شبه أكيد، والانترفيور عايز يشوف طريقة تفكير: قياس الأول، وبعدين سبب، وبعدين تصليح، وبعدين قياس تاني. مش «هعمل index» على طول.",
            how: R`الـ EXPLAIN بيتقري من جوه لبرّه: أعمق node بتشتغل الأول. [[actual time]] بالملّي ثانية لكل loop، و [[loops]] عدد المرات (في Nested Loop اضرب). لو [[rows]] المتوقع بعيد جدًا عن الحقيقي، الإحصائيات قديمة أو الشرط معقد، و ANALYZE بيساعد.

أسباب شائعة غير الـ index: دالة على العمود في WHERE ([[lower(email)]]، أو date_trunc)، ونوع مختلف ([[WHERE id = '5']] على bigint ده تمام بس uuid مقارن بـ text لأ)، و OFFSET كبير، و [[SELECT *]] بيجيب jsonb تقيل، و [[LIKE '%x%']] من غير trigram، وأقفال (استعلام مستني lock مش بطيء، شوف [[pg_stat_activity]] و [[wait_event]]).

وبرّه الاستعلام: connection pool مليان (الطلبات مستنية اتصال)، و N+1، والـ network لسيرفر بعيد.`,
            when: "أي شكوى بطء، وكمان بشكل دوري: بص على أعلى ١٠ في pg_stat_statements كل فترة قبل ما حد يشتكي.",
            mistakes: R`تعمل index من غير EXPLAIN. تقيس مرة واحدة (أول مرة الـ cache بارد). EXPLAIN ANALYZE على UPDATE أو DELETE على الإنتاج: ده بينفّذ فعلًا (لفه في BEGIN و ROLLBACK). تبص على أبطأ استعلام مرة واحدة وتسيب استعلام ٥ ملّي ثانية بيتنادي مليون مرة. وتنسى إن الإجابة ممكن تكون cache أو تغيير في الـ API مش في SQL.`
          },
          lines: [
            "كل استعلام: نصه، واتنادى كام مرة، والوقت الإجمالي والمتوسط،",
            "من الإحصائيات (extension pg_stat_statements)،",
            "الأكتر تكلفة إجمالًا الأول،",
            "أول ١٠.",
            "اشرح الاستعلام ونفّذه فعلًا، ومعاه الصفحات اللي اتقرت:",
            "آخر ٢٠ أوردر،",
            "ليوزر معين،",
            "بالأحدث.",
            "الـ index اللي بيخدمه (الفلتر والترتيب)."
          ]
        }
      ]
    }
  ]
});
