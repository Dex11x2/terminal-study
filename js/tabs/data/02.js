// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
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
    }
]);
