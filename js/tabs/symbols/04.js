// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز PHP و SQL",
      l: 3,
      n: "$ و -> و => و :: و . في PHP، و * و -- و ; و % و _ و ' في SQL",
      items: [
        {
          cmd: "$var  و  ->  (PHP)",
          title: "الدولار $ قبل أي متغير في PHP، والسهم -> عشان تدخل جوه object",
          desc: R`في PHP كل متغير بيبدأ بـ [[$]]: [[$name = "Ali";]]، ودي إجبارية مش عرف. و [[$this]] جوه الكلاس الـ object الحالي.

[[->]] في PHP زي النقطة في JS و Java: [[$user->name]] خانة، و [[$user->save()]] method، و [[$this->name]] جوه الكلاس. والخانة نفسها بعد السهم من غير [[$]]: [[$user->name]] مش [[$user->$name]] (دي معناها اسم الخانة جوه متغير $name).

و [[?->]] (PHP 8) زي [[?.]] في JS: [[$user?->address?->city]]. و [[??]] قيمة احتياطي زي JS. والملف بيبدأ بـ [[<?php]].`,
          example: R`<?php
class User {
    public function __construct(public string $name) {}
    public function greet(): string { return "أهلًا " . $this->name; }
}
$user = new User("Ali");
echo $user->greet();
echo $user?->address ?? "مفيش عنوان";`,
          flag: "script",
          try: R`احفظ المثال في [[a.php]] وشغّله بـ [[php a.php]] (أو على [[3v4l.org]]). بعدين غيّر [[$this->name]] لـ [[$name]] وشغّل تاني.`,
          deep: {
            why: R`Laravel و WordPress وكود PHP كتير بتقراه مليان [[$this->]]. ولو جاي من JS هتكتب نقطة بدل السهم كتير.`,
            how: R`الـ [[$]] بتخلي PHP يفرّق المتغيرات عن الدوال والثوابت. وجوه الـ methods لازم [[$this->]] صراحة عشان توصل لخانات الـ object، مفيش وصول ضمني زي Java.`,
            when: R`[[->]] مع أي object: models و requests و collections في Laravel.`,
            mistakes: R`تكتب [[$user.name]] زي JS: النقطة في PHP دمج نصوص. وتنسى [[$this->]] جوه الكلاس فتلاقي [[Undefined variable $name]]. وتنسى [[;]] في آخر السطر.`
          },
          lines: [
            R`بداية كود PHP.`,
            R`كلاس.`,
            R`constructor بيعرّف خانة name (PHP 8).`,
            R`[[$this->name]]: خانة الـ object الحالي، و [[.]] بتلزّق النصوص.`,
            R`قفلة الكلاس.`,
            R`object جديد في متغير بـ [[$]].`,
            R`[[->]] نادي method: [[أهلًا Ali]].`,
            R`[[?->]] و [[??]]: الخانة مش موجودة فيطبع البديل، و [[??]] شغالة زي isset فمش بتطلّع warning.`
          ],
          sol: R`[[php a.php]] ← [[أهلًا Ali]] وبعدها رسالة العنوان. مع [[$name]] بدل [[$this->name]] ← [[Warning: Undefined variable $name]] والترحيب يطلع [[أهلًا ]] بس.`
        },
        {
          cmd: "=>  و  .  و  ::  (PHP)",
          title: "رموز PHP التانية: => بين المفتاح والقيمة، و . تلزّق النصوص، و :: للحاجات الـ static",
          desc: R`[[=>]] في PHP بين المفتاح والقيمة في الـ arrays: [[["name" => "Ali", "age" => 20]]]، وفي الـ foreach: [[foreach ($users as $id => $user)]]. وكمان في arrow functions: [[fn($x) => $x * 2]].

[[.]] بتلزّق النصوص: [["Hi " . $name]]، و [[.=]] بتضيف على متغير. (في JS ده [[+]]، وفي PHP [[+]] بتجمع أرقام بس.)

[[::]] للحاجات اللي على الكلاس نفسه مش على object: [[User::find(1)]] و [[self::MAX]] و [[parent::__construct()]] و [[static::create()]]. ولاحظ إن Laravel مليانة [[::]] زي [[Route::get(...)]] و [[DB::table(...)]] (دي facades).`,
          example: R`<?php
$user = ["name" => "Ali", "age" => 20];
foreach ($user as $key => $value) {
    echo $key . ": " . $value . "\n";
}
$msg = "Hi";
$msg .= " there";
$double = fn($x) => $x * 2;
echo DateTime::ATOM;`,
          flag: "script",
          try: R`على [[3v4l.org]] جرّب [[echo "5" + "5";]] و [[echo "5" . "5";]] وقارن. بعدين اعمل array بـ [[=>]] واطبعه بـ [[print_r]].`,
          deep: {
            why: R`أي كود PHP بيتعامل مع arrays (الـ request والـ config والـ database results) فـ [[=>]] في كل سطر. والنقطة بدل [[+]] أول حاجة بتلخبط اللي جاي من JS.`,
            how: R`PHP بيفرّق بين جمع الأرقام ([[+]]) ودمج النصوص ([[.]]) عشان مفيش لبس زي JS. و [[::]] بتشتغل على الكلاس من غير ما تعمل object، و [[self::]] جوه الكلاس.`,
            when: R`[[=>]] في associative arrays دايمًا. [[.]] لدمج النصوص، أو استخدم [["Hi $name"]] جوه double quotes. [[::]] للثوابت والـ static methods.`,
            mistakes: R`[[+]] لدمج نصوص: [["Hi" + "x"]] بيطلع error في PHP 8. وتكتب [[:]] بدل [[=>]] في الـ array زي JSON. وتخلط [[->]] و [[::]].`
          },
          lines: [
            R`PHP.`,
            R`array بـ [[=>]] بين المفتاح والقيمة.`,
            R`foreach بـ [[=>]]: المفتاح في key والقيمة في value.`,
            R`[[.]] بتلزّق: [[name: Ali]] وبعدها [[age: 20]].`,
            R`قفلة الـ loop.`,
            R`نص.`,
            R`[[.=]]: بقى [[Hi there]].`,
            R`arrow function بـ [[=>]].`,
            R`[[::]] ثابت على الكلاس نفسه من غير object: [[DateTime::ATOM]] بيطبع شكل التاريخ [[Y-m-d\TH:i:sP]].`
          ],
          sol: R`[[echo "5" + "5";]] ← [[10]] (جمع). [[echo "5" . "5";]] ← [[55]] (دمج). و [[print_r]] بيطبع [[Array ( [name] => Ali [age] => 20 )]].`
        },
        {
          cmd: "SELECT *  و  --  و  ;",
          title: "رموز SQL الأساسية: * كل الأعمدة، و -- تعليق، و ; نهاية الأمر",
          desc: R`[[SELECT * FROM users]] الـ [[*]] معناها «كل الأعمدة». و [[COUNT(*)]] عدد الصفوف. وبين رقمين [[*]] ضرب عادي.

[[--]] (شرطتين) تعليق لآخر السطر، و [[/* ... */]] تعليق كذا سطر. و [[;]] بتقفل الأمر: في [[psql]] و [[mysql]] لو نسيتها الترمنال هيفضل مستنيك (الـ prompt بيتغير لـ [[-#]] أو [[->]]).

ورموز تانية هتقابلك: [[=]] للمقارنة والتعيين (مفيش [[==]])، و [[<>]] أو [[!=]] مش بيساوي، و [[,]] بين الأعمدة، و [[.]] بين الجدول والعمود [[users.id]]، و [[$1]] أو [[?]] placeholders للقيم في الكود (عشان SQL injection).`,
          example: R`-- كل اليوزرز
SELECT * FROM users;
SELECT COUNT(*) FROM users WHERE age <> 20;
SELECT u.name, o.total * 2 AS doubled
FROM users u JOIN orders o ON o.user_id = u.id;
SELECT * FROM users WHERE id = $1;`,
          flag: "script",
          try: R`في [[psql]] أو [[sqlite3]] أو [[mysql]] اكتب [[SELECT 1 + 1]] من غير [[;]] ودوس Enter ولاحظ الـ prompt. بعدين اكتب [[;]] لوحدها ودوس Enter.`,
          deep: {
            why: R`أي حاجة فيها database هتكتب فيها SQL. ونسيان [[;]] في الترمنال بيخلي المبتدئ يفتكر إن البرنامج علّق.`,
            how: R`الـ client (psql مثلًا) بيجمع السطور لحد ما يلاقي [[;]] وبعدين يبعتها للسيرفر. [[--]] و [[/* */]] بيتشالوا قبل التنفيذ. و [[$1]] بيتبعت منفصل عن الـ query فمستحيل يتفهم كود.`,
            when: R`[[*]] في الاستكشاف بس. في كود التطبيق اكتب الأعمدة اللي محتاجها (أسرع ومش بيبوظ لو اتضاف عمود). و placeholders دايمًا مع أي قيمة جاية من اليوزر.`,
            mistakes: R`[[SELECT *]] في كود production. وتبني الـ query بدمج نصوص من input اليوزر (SQL injection). وفي MySQL [[--]] لازم بعدها مسافة: [[--comment]] لازقة مش تعليق هناك.`
          },
          lines: [
            R`[[--]] تعليق لآخر السطر، بس الفحص هنا بيعدّه سطر عشان مش [[#]] ولا [[//]].`,
            R`[[*]] كل الأعمدة، و [[;]] نهاية الأمر.`,
            R`[[COUNT(*)]] عدد الصفوف، و [[<>]] مش بيساوي.`,
            R`[[.]] بين اسم الجدول (أو اختصاره) والعمود، و [[*]] هنا ضرب.`,
            R`[[=]] للمقارنة في الـ JOIN.`,
            R`[[$1]] placeholder: القيمة بتتبعت لوحدها من الكود (PostgreSQL، وفي MySQL [[?]]).`
          ],
          sol: R`من غير [[;]] الـ prompt في psql بيتغير من [[=#]] لـ [[-#]] (يعني «كمّل»). لما تكتب [[;]] الأمر بيتنفذ ويطبع [[2]].`
        },
        {
          cmd: "LIKE '%a_'",
          title: "الـ % والـ _ في SQL LIKE: % أي عدد حروف، و _ حرف واحد بالظبط",
          desc: R`[[WHERE name LIKE 'Al%']] معناها الاسم بيبدأ بـ Al وبعدها أي حاجة. و [['%ali%']] فيه ali في أي حتة. و [['_li%']] أول حرف أي حاجة، وبعده li. يعني [[%]] زي [[*]] في الشيل، و [[_]] زي [[?]].

في PostgreSQL الـ LIKE حساسة لحالة الحروف: [['al%']] مش هتجيب Ali. استخدم [[ILIKE]]. في MySQL غالبًا مش حساسة (حسب الـ collation).

ولو عايز [[%]] أو [[_]] حرفي حط قبلها [[\]]: [[LIKE '%\_%']] يعني فيه شرطة تحتية فعلًا. ودي غلطة شائعة مع الإيميلات و usernames.`,
          example: R`SELECT name FROM users WHERE name LIKE 'Al%';
SELECT name FROM users WHERE name ILIKE 'al%';
SELECT name FROM users WHERE name LIKE '_li%';
SELECT email FROM users WHERE email LIKE '%\_%';
SELECT email FROM users WHERE email LIKE '%_%';`,
          flag: "script",
          try: R`اعمل جدول فيه أسماء [[Ali]] و [[alia]] و [[Sara]] وإيميل فيه [[_]] وجرّب الـ queries الخمسة. توقّع ناتج كل واحد قبل ما تشغّله.`,
          deep: {
            why: R`البحث في أي موقع (search box) غالبًا بيبدأ بـ LIKE. والـ [[_]] اللي معناها «أي حرف» بتجيب نتايج غلط من غير ما تاخد بالك.`,
            how: R`الـ database بيقارن النص بالنمط حرف حرف. [[LIKE 'Al%']] تقدر تستخدم index لأن البداية معروفة. [[LIKE '%ali%']] لازم تعدّي على كل الصفوف، فبطيئة في الجداول الكبيرة.`,
            when: R`بحث بسيط بالبداية أو جزء من النص. للبحث الحقيقي في نصوص كبيرة استخدم full-text search.`,
            mistakes: R`تنسى إن [[_]] wildcard. وتستخدم [[=]] مع [[%]]: [[name = 'Al%']] بتدوّر على النص [[Al%]] حرفيًا. وتحط input اليوزر في LIKE من غير ما تهرب [[%]] و [[_]] اللي فيه. وتنسى الـ case sensitivity في PostgreSQL.`
          },
          lines: [
            R`بيبدأ بـ Al (حساس للحروف): [[Ali]] بس.`,
            R`[[ILIKE]] مش حساس: [[Ali]] و [[alia]].`,
            R`أي حرف، وبعده li، وبعده أي حاجة: [[Ali]] و [[alia]].`,
            R`[[\_]] شرطة تحتية حرفية: الإيميلات اللي فيها [[_]] بس.`,
            R`[[_]] من غير backslash: أي حرف واحد، فبتجيب كل الإيميلات!`
          ],
          sol: R`مع [[Ali]] و [[alia]] و [[Sara]] وإيميلات [[ali@x.com]] و [[a_b@x.com]] و [[sara@y.org]] في PostgreSQL: الأول ← Ali، التاني ← Ali و alia، التالت ← Ali و alia، الرابع ← [[a_b@x.com]] بس، الخامس ← كل الإيميلات.`
        },
        {
          cmd: "'text'  ضد  \"column\"",
          title: "التنصيص في SQL: ' للنصوص والقيم، و \" لأسماء الأعمدة والجداول، و ' جوه النص بتتكتب ''",
          desc: R`في SQL القياسي (و PostgreSQL و SQLite) [['Ali']] بعلامة مفردة نص (قيمة). [["name"]] بعلامة مزدوجة اسم عمود أو جدول (identifier). فـ [[WHERE name = "Ali"]] في PostgreSQL معناها «قارن عمود name بعمود اسمه Ali»، فيطلع [[column "Ali" does not exist]].

الـ [[""]] مع الأسماء بتحتاجها لو الاسم فيه حروف كبيرة أو مسافة أو كلمة محجوزة: [["createdAt"]] و [["order"]]. (Prisma بيعمل أسماء أعمدة بحروف كبيرة، فهتحتاجها في الـ SQL الخام.)

MySQL مختلف: بيقبل [[""]] للنصوص، ولأسماء الأعمدة بيستخدم الـ backtick. وعشان تحط [[']] جوه نص كرّرها: [['O''Neil']].`,
          example: R`SELECT name FROM users WHERE name = 'Ali';
SELECT name FROM users WHERE name = "Ali";
SELECT "createdAt" FROM "User";
SELECT name FROM users WHERE name = 'O''Neil';`,
          flag: "script",
          try: R`في psql (أو PGlite في تاب SQL) جرّب السطر التاني واقرا الـ error. بعدين جرّب [[SELECT 'it''s';]].`,
          deep: {
            why: R`ده أكتر error محيّر للي جاي من JS أو Python، لأن هناك النوعين واحد. وفي SQL الفرق بين قيمة واسم عمود.`,
            how: R`الـ parser بيعتبر أي حاجة بين [['...']] literal، وأي حاجة بين [["..."]] أو من غير تنصيص identifier. الـ identifiers من غير تنصيص في PostgreSQL بتتحول لحروف صغيرة: [[createdAt]] بتبقى [[createdat]].`,
            when: R`[[']] لكل القيم. [["]] بس لما اسم العمود أو الجدول محتاجها. وفي الكود استخدم placeholders بدل ما تكتب القيم بنفسك.`,
            mistakes: R`[["Ali"]] للقيم في PostgreSQL. وتكتب [[createdAt]] من غير تنصيص فـ PostgreSQL يدوّر على [[createdat]]. وتهرب [[']] بـ backslash [[\']] بدل [['']].`
          },
          lines: [
            R`صح: [['Ali']] نص.`,
            R`غلط في PostgreSQL: [["Ali"]] اسم عمود.`,
            R`[[""]] لأسماء فيها حروف كبيرة (زي جداول Prisma).`,
            R`[['']] جوه النص = علامة واحدة: [[O'Neil]].`
          ],
          sol: R`السطر التاني ← [[ERROR: column "Ali" does not exist]]. و [[SELECT 'it''s';]] ← [[it's]].`
        }
      ]
    },
    {
      t: "Markdown و YAML و Git",
      l: 3,
      n: "# و - و ``` في Markdown، و : و - و | في YAML، و HEAD~1 و .. و ... في Git",
      items: [
        {
          cmd: "#  -  **  ```  (Markdown)",
          title: "رموز Markdown: # عنوان، و - قايمة، و ** bold، و ``` بلوك كود، و [](url) لينك",
          desc: R`Markdown هو اللي مكتوب بيه [[README.md]] وتعليقات GitHub ورسايل كتير. [[#]] في أول السطر ومسافة بعدها عنوان، و [[##]] عنوان أصغر، لحد [[######]]. [[-]] أو [[*]] في أول السطر نقطة في قايمة، و [[1.]] قايمة مرقّمة.

[[**كلام**]] bold، و [[*كلام*]] أو [[_كلام_]] italic. والـ backtick الواحد حوالين كلمة كود جوه الجملة، وتلاتة backticks في سطر لوحدهم بيفتحوا بلوك كود، وبعدهم اسم اللغة للتلوين. [[[text](url)]] لينك، و [[![alt](img.png)]] صورة، و [[>]] اقتباس، و [[---]] خط فاصل، و [[|]] بيعمل جداول.`,
          example: R`# اسم المشروع
## التسطيب
- انسخ الريبو
- **شغّل** الأمر ده:
$__bt$__bt$__btbash
npm install
$__bt$__bt$__bt
اقرا [الـ docs](https://example.com) أو شوف $__btsrc/app.js$__bt.
> ملحوظة: محتاج Node 20.`,
          flag: "script",
          try: R`في VS Code اعمل ملف [[test.md]] واكتب المثال، ودوس [[Ctrl+Shift+V]] عشان تشوفه متنسّق. جرّب تشيل المسافة بعد [[#]] وشوف حصل إيه.`,
          deep: {
            why: R`كل مشروع على GitHub ليه README، وكل Issue و PR بيتكتب Markdown، وكمان أدوات الـ AI بترد بيه. لازم تقراه وتكتبه.`,
            how: R`Markdown بيتحوّل لـ HTML: [[#]] لـ [[h1]]، و [[-]] لـ [[li]]، والبلوك لـ [[pre]] و [[code]]. وفيه نسخ كتير، أشهرها CommonMark و GitHub Flavored Markdown (فيه جداول و checkboxes [[- [ ]]]).`,
            when: R`README و docs و Issues و PRs و ملاحظاتك الشخصية (Obsidian و Notion بيفهموه).`,
            mistakes: R`[[#عنوان]] من غير مسافة مش هيبقى عنوان في GitHub. وتنسى تقفل بلوك الكود فالصفحة كلها تبقى كود. وتنسى سطر فاضي قبل القايمة أو بعد الفقرة فتتلزق.`
          },
          lines: [
            R`[[-]] أول عنصر في قايمة نقط. (السطرين اللي بيبدأوا بـ [[#]] فوق عناوين، والشرح هنا بيعدّيهم.)`,
            R`عنصر تاني، و [[**...**]] bold.`,
            R`تلاتة backticks واسم اللغة: بداية بلوك كود ملوّن.`,
            R`الكود نفسه.`,
            R`تلاتة backticks: قفلة البلوك.`,
            R`[[[...](...)]] لينك، والـ backtick الواحد كود جوه الجملة.`,
            R`[[>]] اقتباس.`
          ],
          sol: R`المعاينة: عنوان كبير، وتحته عنوان أصغر، وقايمة بنقطتين، وبلوك كود رمادي، ولينك، وسطر اقتباس بخط على الجنب. ومن غير المسافة بعد [[#]] السطر هيظهر كلام عادي فيه [[#]].`
        },
        {
          cmd: "key: value  و  -  (YAML)",
          title: "رموز YAML: : بين المفتاح والقيمة، و - عنصر في قايمة، والمسافات بتحدد مين جوه مين",
          desc: R`YAML هو اللي مكتوب بيه [[docker-compose.yml]] و GitHub Actions و Kubernetes. [[key: value]] (لازم مسافة بعد [[:]])، و [[-]] في أول السطر عنصر في list، والمسافات في أول السطر (spaces بس، tabs ممنوعة) بتقول مين جوه مين، زي Python.

[[#]] تعليق. و [[|]] بعد المفتاح بيبدأ نص كذا سطر والسطور الجديدة بتفضل (مفيدة لـ [[run:]] في GitHub Actions). و [[>]] كذا سطر بس بيتلزّقوا بمسافة.

التنصيص اختياري، بس لازم لو القيمة فيها [[: ]] أو بتبدأ بـ [[*]] أو [[&]] أو [[@]]، أو لو عايز [[yes]] و [[no]] و [[on]] تفضل نص (بعض المكتبات بتحوّلهم لـ true و false). والأرقام زي [[1.10]] بتبقى [[1.1]]، فنصّص الإصدارات: [["1.10"]].`,
          example: R`name: CI
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install and test
        run: |
          npm ci
          npm test`,
          flag: "script",
          try: R`اعمل ملف [[a.yml]] فيه [[version: 1.10]] و [[answer: yes]] و [[name: "yes"]]، وشغّل [[python3 -c 'import yaml; print(yaml.safe_load(open("a.yml")))']] (محتاج [[pip install pyyaml]]).`,
          deep: {
            why: R`ملف CI أو compose فيه مسافة زيادة واحدة ممكن يفشل، أو أسوأ: يشتغل بمعنى غلط. والأخطاء بتبقى مكتوبة بأرقام سطور وأعمدة لازم تفهمها.`,
            how: R`الـ parser بيبني شجرة من المسافات: نفس عدد المسافات = نفس المستوى. [[-]] بتعمل عنصر في list، والعناصر اللي تحتها بنفس المسافة خانات في نفس العنصر. JSON صالح هو YAML صالح كمان.`,
            when: R`docker-compose و GitHub Actions و Kubernetes و Ansible، وملفات config كتير (OpenAPI و pnpm-workspace).`,
            mistakes: R`tab بدل مسافات. ونسيان المسافة بعد [[:]] ([[key:value]] بيبقى نص واحد). وعدد مسافات مش متسق. و [[version: 3.10]] بتبقى [[3.1]]. وكلمة [[on]] كـ مفتاح بتتقري true في PyYAML (عشان كده الـ libraries بتتعامل مع GitHub Actions بشكل خاص).`
          },
          lines: [
            R`مفتاح وقيمة، والمسافة بعد [[:]] إجبارية.`,
            R`[[on]] مفتاح عادي هنا (GitHub بيفهمه)، والقيمة push.`,
            R`مفتاح قيمته object، فالسطور اللي بعده داخلة لجوه.`,
            R`مسافتين: job اسمها test جوه jobs.`,
            R`٤ مسافات: خانة جوه test.`,
            R`steps قيمتها list.`,
            R`[[-]]: أول عنصر في الـ list، و [[@v4]] جزء من القيمة (إصدار الـ action).`,
            R`عنصر تاني، أول خانة فيه name.`,
            R`[[|]]: الـ run نص كذا سطر والسطور بتفضل زي ما هي.`,
            R`أول سطر في النص.`,
            R`تاني سطر.`
          ],
          sol: R`الناتج: [[{'version': 1.1, 'answer': True, 'name': 'yes'}]]. الإصدار خسر الصفر، و yes من غير تنصيص بقت boolean، ومع التنصيص فضلت نص.`
        },
        {
          cmd: "HEAD~1  و  HEAD^",
          title: "الـ ~ و ^ في Git: HEAD~1 الكوميت اللي قبل الحالي، و HEAD~3 تلاتة لورا، و HEAD^2 الأب التاني في الـ merge",
          desc: R`[[HEAD]] هو الكوميت اللي انت واقف عليه. [[HEAD~1]] الكوميت اللي قبله، و [[HEAD~3]] تلاتة لورا (أب أب الأب). و [[HEAD~]] لوحدها زي [[HEAD~1]].

[[HEAD^]] برضه الأب. الفرق بيبان بس في كوميت الـ merge اللي ليه أبين: [[HEAD^1]] الأب الأول (الفرع اللي كنت عليه)، و [[HEAD^2]] الأب التاني (الفرع اللي اتعمله merge). أما [[~]] فبتمشي دايمًا ورا الأب الأول.

بتستخدمهم مع أي أمر بياخد كوميت: [[git show HEAD~1]] و [[git diff HEAD~2]] و [[git reset --soft HEAD~1]] (ارجع آخر كوميت واحتفظ بالتغييرات). وتقدر تستخدمهم مع أي اسم فرع: [[main~2]].`,
          example: R`git log --oneline -5
git show HEAD~1
git diff HEAD~3 HEAD
git reset --soft HEAD~1
git log -1 HEAD^2`,
          try: R`في أي ريبو فيه كذا كوميت: اكتب [[git log --oneline -4]] وبعدين [[git log -1 --oneline HEAD~2]] وقارن الكوميت مع القايمة.`,
          deep: {
            why: R`عشان تشاور على كوميتات قريبة من غير ما تنسخ الـ hash الطويل: تشوف آخر تغيير، أو ترجع كوميت، أو تقارن.`,
            how: R`كل كوميت بيشيل hash الأب (أو الأبين). [[~n]] بتمشي n خطوات على الأب الأول. [[^n]] بتختار الأب رقم n في خطوة واحدة. فـ [[HEAD~2^2]] معناها: ارجع ٢، وبعدين خد الأب التاني.`,
            when: R`[[git reset --soft HEAD~1]] لما تعمل commit بدري. [[git diff HEAD~1]] تشوف إيه اتغيّر في آخر كوميت. [[git rebase -i HEAD~3]] لترتيب آخر ٣.`,
            mistakes: R`[[git reset --hard HEAD~1]] بتمسح التغييرات خالص، اتأكد إنك عايز كده. وفي zsh لو [[extendedglob]] مفعّل، [[HEAD^]] بتتفهم glob فيطلع [[no matches found]]: نصّصها [['HEAD^']] أو استخدم [[~]]. وفي CMD على ويندوز [[^]] رمز هروب، فـ [[git log HEAD^]] هيسألك [[More?]]: اكتب [[HEAD^^]] أو [[HEAD~1]].`
          },
          lines: [
            R`آخر ٥ كوميتات عشان تشوف الترتيب.`,
            R`اعرض الكوميت اللي قبل الحالي.`,
            R`الفرق بين ٣ كوميتات لورا ودلوقتي.`,
            R`ارجع آخر كوميت واحد وخلّي التغييرات staged.`,
            R`في كوميت merge: الأب التاني (آخر كوميت في الفرع اللي اتدمج).`
          ],
          sol: R`[[HEAD~2]] هو تالت سطر في [[git log --oneline]] (السطر الأول HEAD نفسه، والتاني HEAD~1).`
        },
        {
          cmd: "a..b  و  a...b",
          title: "النقطتين والتلات نقط في Git: main..feature الكوميتات اللي في feature ومش في main، و ... من نقطة الفرع",
          desc: R`[[git log main..feature]] (نقطتين) معناها «الكوميتات اللي في feature ومش في main»، يعني اللي هيدخل لو عملت merge. والعكس [[feature..main]]: اللي اتضاف على main بعد ما فصلت.

[[git log main...feature]] (تلات نقط) معناها الكوميتات اللي في واحد منهم بس (من الناحيتين). لكن مع [[git diff]] المعنى مختلف: [[git diff main...feature]] معناها «التغييرات في feature من ساعة ما اتفصلت من main»، وده بالظبط اللي GitHub بيعرضه في الـ PR.

و [[git diff main..feature]] (نقطتين) هي هي [[git diff main feature]]: فرق مباشر بين آخر حالة في الاتنين، فهتلاقي فيها كمان عكس اللي اتضاف على main.`,
          example: R`git log --oneline main..feature
git log --oneline feature..main
git log --oneline main...feature
git diff --stat main...feature
git log --oneline origin/main..HEAD`,
          try: R`اعمل ريبو تجربة: ٣ كوميتات على main، وفرع feature فيه كوميتين، وارجع main واعمل كوميت كمان. جرّب الأوامر الأربعة الأولى وقارن.`,
          deep: {
            why: R`قبل أي merge أو PR محتاج تعرف «إيه اللي هيدخل». و [[origin/main..HEAD]] بتقولك إيه اللي عندك ومتعملوش push.`,
            how: R`[[a..b]] = [[^a b]] يعني اللي يوصلّه b ومايوصلوش a. [[a...b]] في log = الفرق المتماثل. وفي diff التلات نقط بتقارن [[merge-base]] (نقطة التفرع) بـ b.`,
            when: R`[[git log main..HEAD]] قبل ما تفتح PR. [[git diff main...HEAD]] تشوف الـ PR قبل ما تفتحه. [[git log origin/main..main]] قبل push.`,
            mistakes: R`تستخدم [[git diff main..feature]] وتستغرب إن فيه تغييرات انت معملتهاش (دي اللي على main). وتعكس الترتيب. وتنسى [[git fetch]] الأول فـ [[origin/main]] قديمة.`
          },
          lines: [
            R`الكوميتات اللي في feature بس (اللي هتدخل في الـ merge).`,
            R`الكوميتات اللي اتضافت على main بعد التفرع.`,
            R`الاتنين مع بعض: اللي في واحد بس.`,
            R`ملفات feature اللي اتغيرت من نقطة التفرع، زي PR.`,
            R`الكوميتات اللي عندك ومتعملهاش push.`
          ],
          sol: R`لو main: c1 c2 c3 c4 و feature اتفصل من c3 وفيه f1 f2: [[main..feature]] ← f2 f1. [[feature..main]] ← c4. [[main...feature]] ← c4 و f2 و f1. و [[diff --stat main...feature]] ← ملفات f1 و f2 بس.`
        }
      ]
    },
    {
      t: "الويب والإصدارات والمواعيد",
      l: 3,
      n: "رموز الـ URL و %20، و ^ و ~ في package.json، والنجوم في الـ cron، و @ في أسماء الحزم",
      items: [
        {
          cmd: "://  ?  &  =  #",
          title: "رموز الـ URL: :// بعد البروتوكول، و ? بداية الـ query، و & بين القيم، و = بين الاسم والقيمة، و # جزء جوه الصفحة",
          desc: R`خد الـ URL ده: [[https://shop.com:8080/products/5?color=red&size=m#reviews]]. الـ [[https]] البروتوكول وبعده [[://]]. و [[shop.com]] الدومين، و [[:8080]] البورت (النقطتين قبله). و [[/products/5]] المسار، و [[/]] بتفصل أجزاءه.

[[?]] بتبدأ الـ query string، و [[&]] بتفصل بين الـ parameters، و [[=]] بين الاسم والقيمة: [[color=red]] و [[size=m]].

[[#]] بتبدأ الـ fragment (اسمه كمان hash): جزء جوه الصفحة. ده عمره ما بيتبعت للسيرفر، المتصفح بس اللي بيستخدمه (عشان كده الـ SPAs القديمة كانت بتعمل routing بيه). و [[@]] في [[user@host]] معناها يوزر، وبتشوفها في [[git@github.com:user/repo.git]] و [[ssh ali@server]].`,
          example: R`const url = new URL("https://shop.com:8080/products/5?color=red&size=m#reviews");
console.log(url.protocol, url.host, url.pathname);
console.log(url.searchParams.get("color"));
console.log(url.hash);
url.searchParams.set("page", "2");
console.log(url.toString());`,
          flag: "script",
          try: R`افتح أي موقع بحث، ودوّر على حاجة، وبص على الـ URL: لاقي الـ [[?]] والـ [[&]]. بعدين جرّب المثال في الـ Console.`,
          deep: {
            why: R`أي API أو صفحة أو redirect فيه URL، والأخطاء فيه (مثلًا [[?]] مرتين، أو [[&]] قبل [[?]]) بتخلي السيرفر ميشوفش الـ parameters.`,
            how: R`المتصفح بيقسم الـ URL بالرموز دي بالترتيب: البروتوكول، والـ host، والمسار، والـ query، والـ fragment. السيرفر بيستلم المسار والـ query بس. وفي Express بتلاقيهم في [[req.query]]، وفي FastAPI بتبقى parameters للدالة.`,
            when: R`الفلاتر والبحث والصفحات ([[?page=2]]) في الـ query. والـ fragment للتنقل جوه الصفحة. وفي الكود استخدم [[URL]] و [[URLSearchParams]] بدل ما تلزّق نصوص.`,
            mistakes: R`[[?a=1?b=2]] بدل [[?a=1&b=2]]. وتحط بيانات حساسة (token أو باسورد) في الـ query فتتسجل في الـ logs والـ history. وتفتكر السيرفر شايف الـ [[#]].`
          },
          lines: [
            R`[[URL]] بتقسم الـ URL لأجزائه.`,
            R`[[https:]] و [[shop.com:8080]] و [[/products/5]].`,
            R`قيمة color من الـ query: [[red]].`,
            R`[[#reviews]].`,
            R`ضيف parameter جديد بأمان.`,
            R`[[...?color=red&size=m&page=2#reviews]].`
          ],
          sol: R`مثلًا في جوجل: [[https://www.google.com/search?q=bash+pipe&hl=ar]]: [[?]] بعد search، و [[q=bash+pipe]] البحث، و [[&]] قبل [[hl=ar]] اللغة. والمثال بيطبع الأجزاء زي ما في الشرح.`
        },
        {
          cmd: "%20",
          title: "الـ % في الـ URL: percent-encoding، كل رمز ممنوع أو حرف عربي بيتحول لـ % ورقمين، و %20 مسافة",
          desc: R`الـ URL مسموح فيه حروف إنجليزي وأرقام وشوية رموز بس. أي حاجة تانية بتتحوّل لـ [[%]] وبعدها رقم hex: المسافة [[%20]]، و [[&]] بتبقى [[%26]]، و [[#]] بتبقى [[%23]]، و [[/]] بتبقى [[%2F]]، و [[%]] نفسها [[%25]]. والحروف العربي كل حرف بيبقى أكتر من واحدة: [[م]] = [[%D9%85]].

عشان كده لما تنسخ لينك فيه عربي من المتصفح بتلاقيه طويل وغريب. و [[+]] في الـ query (من الـ forms) معناها مسافة برضه.

في JS: [[encodeURIComponent]] لقيمة واحدة (بتحوّل [[&]] و [[=]] و [[/]] كمان)، و [[decodeURIComponent]] العكس. وفي Python [[urllib.parse.quote]].`,
          example: R`console.log(encodeURIComponent("a b&c=d#e"));
console.log(encodeURIComponent("مصر"));
console.log(decodeURIComponent("%D9%85%D8%B5%D8%B1"));
const q = "rock & roll";
fetch("/search?q=" + encodeURIComponent(q));`,
          flag: "script",
          try: R`في الـ Console جرّب [[encodeURIComponent("100% مضمون")]] وبعدين [[decodeURIComponent]] على الناتج. وابحث في جوجل عن كلمة عربي وبص على الـ URL في شريط العنوان بعد ما تنسخه.`,
          deep: {
            why: R`لو بعت [[q=rock & roll]] من غير encoding السيرفر هيشوف [[q=rock ]] و parameter تاني اسمه [[ roll]]. وأسماء الملفات اللي فيها مسافات أو عربي في الـ URLs بتطلع 404 لو مش متحولة.`,
            how: R`النص بيتحوّل لـ UTF-8 bytes، وكل byte مش مسموح بيتكتب [[%]] و hex. الحرف العربي في UTF-8 بيتاخد ٢ byte، عشان كده [[م]] بقت [[%D9%85]].`,
            when: R`أي قيمة من اليوزر رايحة في URL. والـ libraries زي [[URLSearchParams]] و axios [[params]] بيعملوها لوحدهم.`,
            mistakes: R`[[encodeURI]] بدل [[encodeURIComponent]] للقيم: الأولى مش بتحوّل [[&]] و [[=]] و [[?]]. وتعمل encode مرتين فـ [[%20]] تبقى [[%2520]]. وتنسى إن [[%]] في نهاية نص بتوقع [[decodeURIComponent]] بـ [[URIError]].`
          },
          lines: [
            R`[[a%20b%26c%3Dd%23e]].`,
            R`[[%D9%85%D8%B5%D8%B1]] (كل حرف عربي ٢ byte).`,
            R`العكس: [[مصر]].`,
            R`قيمة فيها [[&]].`,
            R`لازم encoding وإلا [[&]] هتقسم الـ query.`
          ],
          sol: R`[[encodeURIComponent("100% مضمون")]] ← [[100%25%20%D9%85%D8%B6%D9%85%D9%88%D9%86]]، والـ decode بيرجّعها زي ما كانت.`
        },
        {
          cmd: "^1.2.3  و  ~1.2.3",
          title: "الـ ^ و ~ في package.json: ^ يقبل أي تحديث مش بيكسر (نفس الرقم الأول)، و ~ تحديثات الإصلاح بس",
          desc: R`أرقام الإصدارات (semver) تلات أجزاء: [[MAJOR.MINOR.PATCH]]. MAJOR بيزيد لما فيه تغيير بيكسر الكود القديم، و MINOR لما فيه حاجات جديدة، و PATCH لإصلاح bugs.

في [[package.json]]: [["^1.2.3"]] (caret) معناها أي إصدار [[>=1.2.3]] و [[<2.0.0]]، يعني تحديثات minor و patch. و [["~1.2.3"]] (tilde) معناها [[>=1.2.3]] و [[<1.3.0]]، يعني patch بس. و [["1.2.3"]] من غير رمز: الإصدار ده بالظبط.

تحت الصفر الـ [[^]] بتبقى أضيق: [[^0.2.3]] يعني [[<0.3.0]] بس، لأن قبل 1.0 أي تغيير ممكن يكسر. و [[*]] أو [[latest]] أي إصدار (خطر). والـ [[package-lock.json]] هو اللي بيثبّت الإصدار اللي اتسطب فعلًا.`,
          example: R`{
  "dependencies": {
    "express": "^4.19.2",
    "lodash": "~4.17.21",
    "react": "18.3.1",
    "some-lib": "^0.2.3"
  }
}`,
          flag: "script",
          try: R`افتح [[package.json]] في أي مشروع عندك وحدد كل dependency رمزها إيه. بعدين اكتب [[npm outdated]] وبص على أعمدة Current و Wanted و Latest.`,
          deep: {
            why: R`عشان تفهم ليه [[npm install]] على جهازين ممكن يجيب إصدارات مختلفة لو مفيش lock file، وليه [[npm update]] مش بيجيب أحدث major.`,
            how: R`npm بيختار أعلى إصدار منشور جوه المدى المسموح. الـ lock file بيسجّل الاختيار، و [[npm ci]] بيلتزم بيه بالظبط. وكلمة Wanted في [[npm outdated]] هي أعلى حاجة جوه المدى.`,
            when: R`[[^]] الافتراضي (اللي npm بيحطه)، ومناسب أغلب الوقت. [[~]] أو رقم ثابت لمكتبة بتكسر في الـ minor. ودايمًا اعمل commit للـ lock file.`,
            mistakes: R`تفتكر [[^]] بتجيب أحدث major. وتمسح [[package-lock.json]] عشان تحل مشكلة فتجيب إصدارات جديدة كتير مرة واحدة. وتستخدم [[*]].`
          },
          lines: [
            R`بداية الملف.`,
            R`الـ dependencies.`,
            R`[[^]]: أي 4.x.x من 4.19.2 وطالع.`,
            R`[[~]]: أي 4.17.x من 4.17.21 وطالع.`,
            R`من غير رمز: 18.3.1 بالظبط.`,
            R`[[^]] تحت الصفر: من 0.2.3 لحد قبل 0.3.0 بس.`,
            R`قفلة.`,
            R`قفلة.`
          ],
          sol: R`[[npm outdated]] بيعرض جدول: Current اللي متسطب، و Wanted أعلى إصدار مسموح بالرمز اللي في package.json، و Latest أحدث إصدار منشور. لو Latest رقمها الأول أكبر من Wanted، يبقى فيه major جديد محتاج تحدّثه بإيدك.`
        },
        {
          cmd: "* * * * *",
          title: "النجوم الخمسة في الـ cron: دقيقة ساعة يوم شهر يوم-في-الأسبوع، و * يعني أي، و */5 كل 5، و , و -",
          desc: R`الـ cron بيشغّل أوامر في مواعيد. السطر فيه ٥ خانات قبل الأمر: الدقيقة (0-59)، والساعة (0-23)، ويوم الشهر (1-31)، والشهر (1-12)، ويوم الأسبوع (0-6، و 0 الحد). و [[*]] في أي خانة معناها «أي قيمة».

[[*/15]] في خانة الدقيقة يعني كل ١٥ دقيقة. و [[1-5]] مدى (من الاتنين للجمعة). و [[1,15]] قايمة (يوم ١ ويوم ١٥). فـ [[0 9 * * 1-5]] معناها الساعة ٩ الصبح من الاتنين للجمعة.

بتكتبها في [[crontab -e]] على لينكس، وفي GitHub Actions [[schedule: - cron: '...']] (بتوقيت UTC). وموقع [[crontab.guru]] بيشرحلك أي سطر.`,
          example: R`# دقيقة ساعة يوم شهر يوم-أسبوع  الأمر
*/15 * * * * /home/ali/check.sh
0 9 * * 1-5 /home/ali/report.sh
0 3 * * 0 /home/ali/backup.sh >> /var/log/backup.log 2>&1
30 2 1,15 * * /home/ali/cleanup.sh`,
          flag: "script",
          try: R`افتح [[crontab.guru]] واكتب [[0 9 * * 1-5]] واقرا الشرح. بعدين اكتب سطر بيشتغل كل يوم الساعة ١١ ونص بالليل.`,
          deep: {
            why: R`الـ backups والتقارير وتنضيف الـ logs وتجديد الشهادات كلها بتشتغل بـ cron على السيرفرات، وفي GitHub Actions بنفس الصيغة.`,
            how: R`الـ cron daemon بيصحى كل دقيقة ويقارن الوقت بكل سطر. لو الخانات كلها مطابقة بيشغّل الأمر. البيئة اللي بيشغّل فيها فقيرة (PATH قصير ومفيش [[~/.bashrc]])، عشان كده اكتب مسارات كاملة.`,
            when: R`أي حاجة لازم تتكرر في ميعاد ثابت. ولو محتاج تتأكد إنها اشتغلت، وجّه الناتج لـ log بـ [[>> file 2>&1]].`,
            mistakes: R`[[* 9 * * *]] بتشتغل ٦٠ مرة (كل دقيقة في الساعة ٩)، الصح [[0 9 * * *]]. وتنسى إن GitHub Actions بتوقيت UTC (مصر +2 أو +3). وتستخدم مسارات نسبية أو أوامر مش في PATH. وتنسى إن [[%]] في أمر cron ليها معنى خاص (سطر جديد) فلازم [[\%]].`
          },
          lines: [
            R`كل ١٥ دقيقة طول الوقت.`,
            R`الساعة ٩:٠٠ من الاتنين للجمعة.`,
            R`الساعة ٣ الفجر كل حد، والناتج والأخطاء في log.`,
            R`الساعة ٢:٣٠ يوم ١ ويوم ١٥ من كل شهر.`
          ],
          sol: R`[[0 9 * * 1-5]] ← «At 09:00 on every day-of-week from Monday through Friday». وكل يوم ١١:٣٠ بالليل: [[30 23 * * *]].`
        },
        {
          cmd: "@scope/pkg  و  git@",
          title: "الـ @ في أسماء الحزم والعناوين: @scope/pkg في npm، و pkg@1.2 إصدار، و git@github.com يوزر على سيرفر",
          desc: R`في npm [[@angular/core]] و [[@types/node]] اسمهم scoped packages: [[@]] وبعدها اسم المنظمة وبعدين [[/]] واسم الحزمة. ده بيمنع تصادم الأسماء. و [[@]] بعد اسم الحزمة إصدار: [[npm install react@18]] و [[npx create-next-app@latest]].

في Git و SSH [[git@github.com:user/repo.git]] معناها «اليوزر git على السيرفر github.com»، و [[:]] بعدها المسار. ونفس الصيغة في [[ssh ali@1.2.3.4]]. وفي GitHub Actions [[actions/checkout@v4]] يعني الإصدار v4.

وفي أماكن تانية: [[@]] في الإيميل، و [[@media]] و [[@import]] في CSS، و [[@user]] منشن، و decorators و annotations في الكود. والمعنى العام في الحالات دي «عند» أو «في».`,
          example: R`npm install @types/node
npm install react@18.3.1
npx create-vite@latest my-app
git clone git@github.com:ali/site.git
ssh deploy@203.0.113.10`,
          try: R`اكتب [[npm view @types/node version]] و [[npm view react@18 version]]. وبص على [[git remote -v]] في أي ريبو عندك: هل بيبدأ بـ [[https://]] ولا [[git@]]؟`,
          deep: {
            why: R`أسماء الحزم في npm بـ [[@]] في كل مشروع، و [[git@]] هو اللي بيفرّق بين clone بالـ SSH key و clone بالباسورد أو الـ token.`,
            how: R`npm بيقسم [[@scope/name@version]]: أول [[@]] جزء من الاسم، والتانية بعد الاسم إصدار. و SSH بيقسم [[user@host]] ويستخدم الـ key بتاعك عشان يدخل كـ user ده.`,
            when: R`[[@types/...]] مع TypeScript. و [[pkg@latest]] مع npx عشان تجيب أحدث نسخة. و [[git@]] لما عندك SSH key على GitHub.`,
            mistakes: R`تكتب [[npm install types/node]] من غير [[@]] فيدوّر على حاجة تانية خالص. وتستخدم [[git@]] من غير ما تضيف SSH key فيطلع [[Permission denied (publickey)]]. وتفتكر [[@latest]] بيتسجل في package.json: اللي بيتسجل الرقم الفعلي.`
          },
          lines: [
            R`حزمة scoped: المنظمة types والحزمة node.`,
            R`[[@]] بعد الاسم: إصدار محدد.`,
            R`[[@latest]]: شغّل أحدث نسخة من الأداة.`,
            R`clone بالـ SSH: اليوزر git على github.com.`,
            R`ادخل السيرفر كـ يوزر deploy.`
          ],
          sol: R`[[npm view @types/node version]] بيطبع رقم زي [[22.x.x]]، و [[npm view react@18 version]] بيطبع كل إصدارات 18 أو آخرها. و [[git remote -v]] بيطبع سطرين (fetch و push) يا إما [[https://github.com/...]] يا إما [[git@github.com:...]].`
        }
      ]
    }
]);
