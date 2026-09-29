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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`الجدول فيه منتج واحد دلوقتي؛ بعد درس INSERT ارجع شغّل الأسطر تاني. وجرّب تضيف [[WHERE price_with_vat > 200]] على السطر التاني وشوف الـ error.`,
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
          ]
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
          try: R`شيل الأقواس من آخر سطر وقارن النتيجة. وبعدين جرّب [[WHERE status = "paid"]] بالتنصيص المزدوج واقرا الـ error.`,
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
          ]
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
          try: R`ضيف منتجين بنفس السعر، واعمل [[ORDER BY price LIMIT 1]] كذا مرة بعد UPDATE على واحد منهم. وبعدين ضيف [[, id]] للترتيب وشوف النتيجة بقت ثابتة.`,
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
          ]
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
          try: R`جرّب [[LIKE '%Shirt%']] و [[ILIKE '%Shirt%']] وشوف مين لقى T-shirt. وبعدين دوّر على منتج اسمه فيه [[%]] فعلًا: هتحتاج [[ESCAPE]] أو [[\%]].`,
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
          ]
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
          try: R`حط رقم تليفون ليوزر واحد، وجرّب [[WHERE phone <> '0100']]: اليوزرز اللي تليفونهم NULL مش هيظهروا، مع إن تليفونهم فعلًا مش 0100.`,
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`شغّل [[SELECT sum(total) FROM orders WHERE status = 'refunded']] من غير COALESCE: هترجع NULL مش صفر، والواجهة كانت هتكتب «null جنيه».`,
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
          ]
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
          try: R`غيّر [[date_trunc('day', ...)]] لـ [[date_trunc('month', ...)]]. وبعدين اعمل GROUP BY على [[created_at]] نفسه من غير date_trunc، وشوف ليه كل أوردر بقى مجموعة لوحده.`,
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
          ]
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
          try: R`جرّب [[HAVING spent >= 1000]] بالاسم بدل [[sum(total)]]: Postgres هيرفض. وبعدين حط نفس الاسم في ORDER BY: هيقبله. ليه؟ الإجابة في ترتيب التنفيذ.`,
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`اعمل أوردر جديد وضيفله بندين، وجرّب الاستعلام التاني عليه. وبعدين بدّل أول [[JOIN ... ON ...]] بـ [[CROSS JOIN users u]] من غير ON، وشوف عدد الصفوف بقى كام.`,
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
          ]
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
          try: R`ضيف يوزر جديد من غير أوردرات. في أول استعلام غيّر [[count(o.id)]] لـ [[count(*)]]: هتلاقي اليوزر الجديد بقى عنده «1». وفي آخر استعلام انقل شرط status من ON لـ WHERE: اليوزر الجديد هيختفي.`,
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
          ]
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
          try: R`جرّب [[SELECT 1 WHERE 3 NOT IN (1, 2, NULL)]]: مش هترجع حاجة. وبعدين [[SELECT 1 WHERE 3 NOT IN (1, 2)]]: هترجع. NULL واحدة بوّظت الشرط كله.`,
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
          ]
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
          try: R`اكتب نفس الاستعلام من غير WITH، بـ subqueries جوه بعض، وقارن أنهي أسهل في القراية. وبعدين حط [[EXPLAIN]] قدام الاتنين: في نسخة WITH هتلاقي [[CTE paid]] و [[CTE Scan]]، لأن paid متستخدمة مرتين فـ Postgres بيحسبها مرة ويحفظها، ونسخة الـ subqueries بتحسبها مرتين. وبعدين اكتب [[paid AS NOT MATERIALIZED (...)]] وشوف الخطة بقت زي الـ subqueries.`,
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`شغّل أول INSERT تلات مرات، وشوف المخزون بيزيد ١٠ كل مرة والـ id ثابت. وبعدين حط نفس الـ sku مرتين في نفس الـ VALUES واقرا الـ error.`,
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
          ]
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
          try: R`غيّر [[rn = 1]] لـ [[rn <= 3]] (آخر ٣ أوردرات لكل يوزر). وضيف عمود [[LAG(revenue) OVER (ORDER BY day)]] للاستعلام التاني عشان تقارن كل يوم باللي قبله.`,
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
          ]
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
          try: R`قيس الاستعلام الأول بـ [[\timing]] مع OFFSET 0 و OFFSET 100000. وبعدين خد آخر صف من صفحة، وحط الـ created_at والـ id بتوعه في الاستعلام الأخير، وقيس.`,
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
          ]
        }
      ]
    },
    // __L3__
  ]
});
