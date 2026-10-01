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

TAB("spring", {
  label: "Java و Spring Boot",
  prompt: "$ ",
  lab: R`java --version
java Hello.java
./mvnw spring-boot:run
./mvnw test`,
  labText: "محتاج JDK 25 (آخر LTS) بس عشان تجرّب دروس Java: أي ملف .java بيشتغل بـ java File.java من غير build. لمشروع Spring Boot اعمل مشروع من start.spring.io، وفيه Maven wrapper (mvnw) جاهز، و PostgreSQL شغال (محلي أو بـ Docker).",
  levels: {"1":["Java وتطبيقات Desktop","الأنواع والكلاسات و records و generics و collections و streams والأخطاء، مقارنة بـ TS، وبرامج ديسكتوب بـ JavaFX و Swing و jpackage"],"2":["API بـ Spring Boot","Maven و Gradle، والـ DI، و REST والـ validation والأخطاء، والإعدادات، و JPA مع PostgreSQL و Flyway"],"3":["الإنتاج والانترفيو","Spring Security بـ JWT، والاختبارات بـ Testcontainers، و Actuator و Docker، وأسئلة Java و Spring في الانترفيو"]},
  categories: [
    {
      t: "Java والـ JVM",
      l: 1,
      n: "الكود بيتحوّل لـ bytecode والـ JVM بيشغّله، والأنواع موجودة وقت التشغيل مش بس وقت الكتابة",
      items: [
        {
          cmd: "JDK و JVM",
          title: "الكود بتاع Java بيشتغل إزاي، وتسطّب إيه عشان تبدأ؟",
          desc: R`Java لغة compiled: [[javac]] بيحوّل ملفات [[.java]] لـ bytecode في ملفات [[.class]]، والـ JVM (Java Virtual Machine) هو اللي بيشغّل الـ bytecode ده على أي نظام. زي ما Node بيشغّل JS، الـ JVM بيشغّل bytecode، بس الفرق إن فيه خطوة compile قبلها بتمسك أخطاء الأنواع، زي [[tsc]] بالظبط بس إجبارية.

اللي بتسطّبه اسمه JDK: فيه [[java]] (الـ JVM) و [[javac]] (الـ compiler) و [[jshell]] (REPL زي [[node]] من غير ملف). آخر إصدار LTS لحد سبتمبر ٢٠٢٦ هو Java 25، وده اللي تستخدمه في أي مشروع جديد.

ومن Java 11 تقدر تشغّل ملف واحد على طول: [[java Hello.java]] بيعمل compile في الذاكرة ويشغّل، زي [[npx tsx file.ts]]. ومن Java 25 الملف ممكن يبقى [[void main()]] بس من غير class، وفيه [[IO.println]] للطباعة.`,
          example: R`void main() {
    String name = "Sara";
    int year = 2026;
    IO.println("Hello " + name + " from Java " + Runtime.version().feature());
    IO.println(year + 1);
}
// في الترمنال:
// java --version
// java Hello.java
// javac Hello.java && java Hello`,
          try: R`سطّب JDK 25 (من adoptium.net أو SDKMAN أو [[sudo apt install openjdk-25-jdk]] على Ubuntu)، واحفظ المثال في [[Hello.java]] وشغّله بـ [[java Hello.java]]. وبعدين غيّر [[int year = 2026;]] لـ [[int year = "2026";]] وشغّل تاني واقرا الخطأ: ظهر إمتى، قبل ما أول سطر يتطبع ولا بعده؟`,
          flag: "script",
          deep: {
            why: R`Spring Boot و Android وأغلب أنظمة البنوك والشركات الكبيرة شغالة على الـ JVM. لو بتقدّم على شغل backend في شركة كبيرة أو بنك أو شركة اتصالات، احتمال كبير تلاقي Java. وفهم إن فيه compile وبعدين تشغيل هيفسّرلك حاجات كتير: ليه الأخطاء بتطلع بدري، وليه التطبيق بياخد ثواني عشان يقوم.`,
            how: R`[[javac]] بيفحص الأنواع ويطلّع bytecode (تعليمات لآلة وهمية، مش لمعالج حقيقي). الـ JVM بيحمّل الـ classes وقت الحاجة، ويبدأ يشغّل الـ bytecode بالـ interpreter، والأجزاء اللي بتتنادى كتير الـ JIT compiler بيحوّلها لكود أصلي سريع وهو شغال. عشان كده تطبيق Java بيبقى أبطأ في أول ثواني (warm-up) وبعدين سريع جدًا.

الـ JVM كمان بيدير الذاكرة بالـ Garbage Collector (زي JS مفيش [[free]])، وده له درس في أسئلة الانترفيو.

الإصدارات: كل ٦ شهور فيه إصدار جديد (مارس وسبتمبر)، وكل سنتين إصدار LTS بيتدعم سنين: 17، 21، 25، وبعده 29 المتوقع في سبتمبر ٢٠٢٧. الإصدارات اللي بين الـ LTS (زي 26 و 27) بتتدعم ٦ شهور بس، فالشركات بتفضل على الـ LTS.

والـ JDK نفسه مفتوح المصدر (OpenJDK)، وفيه توزيعات كتير مجانية كلها نفس الكود تقريبًا: Eclipse Temurin، و Amazon Corretto، و Microsoft Build of OpenJDK، وغيرهم.`,
            when: R`[[java File.java]] للتجارب والسكربتات والدروس اللي في المستوى ده. [[jshell]] لما عايز تجرّب سطر واحد. وفي المشاريع الحقيقية مش هتنادي [[javac]] بإيدك: Maven أو Gradle بيعملوا كده (المستوى ٢).`,
            mistakes: R`تسطّب JRE بس (من غير JDK) فمتلاقيش [[javac]]. أو يبقى عندك كذا JDK و [[JAVA_HOME]] بيشاور على قديم، فـ [[java --version]] يقول 25 و Maven يشتغل بـ 17: اتأكد من الاتنين. وتفتكر إن Java هي JavaScript: ملهمش أي علاقة غير الاسم (قرار تسويق سنة ١٩٩٥).

وفي الانترفيو: «إيه الفرق بين JDK و JRE و JVM؟» الـ JVM بيشغّل bytecode، والـ JRE هو الـ JVM والمكتبات اللي محتاجها التشغيل، والـ JDK هو ده كله ومعاه أدوات التطوير زي javac. ومن Java 11 مفيش JRE منفصل رسمي، بس السؤال لسه بيتسأل.`
          },
          lines: [
            R`من Java 25 الملف ممكن يبدأ بـ [[void main()]] من غير class (compact source file). في الكود القديم هتلاقي [[public static void main(String[] args)]] جوه class.`,
            R`متغير نوعه [[String]]. النوع قبل الاسم، عكس TS ([[name: string]]).`,
            R`[[int]] رقم صحيح. في Java مفيش [[number]] واحد زي JS، فيه أنواع أرقام كتير.`,
            R`[[IO.println]] زي [[console.log]]. و [[Runtime.version().feature()]] بيرجع رقم الإصدار الأساسي (25).`,
            R`[[year + 1]] رقم، فبيطبع 2027 مش "20261" زي ما JS كان ممكن يعمل مع string.`,
            "قفلة main."
          ],
          sol: R`[[java Hello.java]] بيطبع:

[[Hello Sara from Java 25]] وبعدها [[2027]].

ولما تكتب [[int year = "2026";]] بيطلع خطأ وقت الـ compile ومفيش ولا سطر بيتطبع: [[error: incompatible types: String cannot be converted to int]] ومعاه رقم السطر وعلامة [[^]] تحت الغلطة. ده الفرق عن JS: الغلط اتمسك قبل التشغيل خالص. ولو طلعلك [[error: class, interface, enum, or record expected]] أو خطأ على [[IO]]، يبقى الـ JDK عندك أقدم من 25: شوف [[java --version]].`
        },
        {
          cmd: "Java مقابل TypeScript",
          title: "إيه اللي هيفرق معاك وانت جاي من TypeScript؟",
          desc: R`أهم ٣ فروق: الأول إن الأنواع في Java موجودة وقت التشغيل: الـ object عارف هو من أنهي class، و [[instanceof]] بيسأل الـ class الحقيقي، والـ cast الغلط بيوقع البرنامج بـ [[ClassCastException]]. في TS الأنواع بتتمسح (درس type erasure في «تاب TypeScript»).

التاني إن Java nominal مش structural: الـ class لازم يقول صراحة [[implements Shape]] عشان يتعامل كـ Shape، حتى لو فيه نفس الـ methods بالظبط. في TS الشكل كفاية.

التالت إن كل حاجة جوه class، ومفيش object literal زي [[{ name: "Sara" }]]: لازم تعمل class أو record الأول وبعدين [[new]].`,
          example: R`// TypeScript:
//   type User = { name: string; age: number };
//   const u: User = { name: "Sara", age: 27 };
record User(String name, int age) {}
interface Greeter { String greet(User u); }
class Polite implements Greeter {
    public String greet(User u) { return "Welcome, " + u.name(); }
}
void main() {
    User u = new User("Sara", 27);
    Object o = u;
    IO.println(o instanceof User);
    IO.println(o.getClass().getSimpleName());
    Greeter g = new Polite();
    IO.println(g.greet(u));
    String s = (String) o;
}`,
          try: R`شغّل المثال وشوف آخر سطر بيعمل إيه. وبعدين شيل [[implements Greeter]] من [[Polite]] (وسيب الـ method زي ما هي) وشوف [[Greeter g = new Polite();]] بقى إيه. قارن باللي كان هيحصل في TS.`,
          flag: "script",
          deep: {
            why: "لو دخلت Java بعقلية TS هتقع في حاجات صغيرة كتير: هتدوّر على object literal، وهتستغرب إن الـ class مش بيعدّي مكان interface مع إن شكله مطابق، وهتفتكر إن cast زي [[as]] مش بيعمل حاجة وقت التشغيل. معرفة الفروق من الأول بتوفّر أسبوع لخبطة.",
            how: R`كل object في الـ heap معاه مؤشر للـ class بتاعه، فالـ JVM عارف نوعه الحقيقي دايمًا. [[(String) o]] مش مجرد وعد للـ compiler زي [[as string]] في TS: الـ JVM بيفحص فعلًا، ولو النوع مش String بيرمي [[ClassCastException]].

الاستثناء: الـ generics. [[List<String>]] و [[List<Integer>]] وقت التشغيل الاتنين [[ArrayList]] بس، والـ type parameter بيتمسح (type erasure). يعني Java بتمسح أنواع الـ generics بس، مش كل الأنواع زي TS (درس generics).

nominal typing معناه إن العلاقة بين الأنواع مكتوبة بالاسم: [[implements]] و [[extends]]. ده بيخلي الكود أوضح في المشاريع الكبيرة (تقدر تدوّر على كل اللي بيعمل implements للـ interface)، بس أقل مرونة من TS.

وفيه حاجات هتلاقيها مشابهة جدًا: [[interface]] و [[class]] و [[extends]] و [[private]] و [[public]]، والـ lambdas ([[x -> x * 2]] بدل [[x => x * 2]])، والـ generics بـ [[<T>]]، و [[enum]]، و [[switch]].`,
            when: R`في كل كود Java هتكتبه. افتكر القاعدة: «Java بتعرف النوع وقت التشغيل، بس مبتعرفش نوع الـ generic».`,
            mistakes: R`تدوّر على [[any]]: الأقرب في Java هو [[Object]]، وتستخدمه نادر جدًا. وتكتب [[==]] عشان تقارن strings أو objects: في Java [[==]] بيقارن المرجع (هل هما نفس الـ object؟) مش القيمة، والمقارنة بالقيمة بـ [[equals]] (درس String). وتفتكر إن [[null]] ممنوعة زي TS strict: في Java أي متغير object ممكن يبقى [[null]]، ومفيش compiler بيحميك منها افتراضيًا.`
          },
          lines: [
            R`[[record]] نوع بسيط للداتا (زي [[type User]] في TS) وبيعمل constructor و getters و equals لوحده. درسه في المستوى ده.`,
            R`[[interface]] بـ method واحدة. شكله قريب جدًا من TS.`,
            R`[[implements Greeter]] مكتوبة صراحة: من غيرها Polite مش Greeter حتى لو فيه نفس الـ method.`,
            R`تنفيذ الـ method. [[u.name()]] مش [[u.name]]: الـ record بيعمل method بنفس اسم الخاصية.`,
            "قفلة الكلاس.",
            "بداية main.",
            R`مفيش object literal: لازم [[new]] ومعاه كل القيم بالترتيب.`,
            R`[[Object]] أب كل الـ classes. المتغير نوعه Object، بس الـ object نفسه لسه User.`,
            R`[[instanceof]] بيسأل الـ object الحقيقي وقت التشغيل: [[true]].`,
            R`[[getClass()]] بيرجع الـ class الحقيقي: [[User]].`,
            R`متغير نوعه الـ interface، وقيمته object من class بيعمل implements.`,
            "بيطبع التحية.",
            R`cast غلط: الـ compiler بيسمح (Object ممكن يبقى String)، بس الـ JVM بيفحص وقت التشغيل ويقع.`,
            "قفلة main."
          ],
          sol: R`الناتج: [[true]] ثم [[User]] ثم [[Welcome, Sara]]، وبعدين البرنامج بيقع بـ:

[[Exception in thread "main" java.lang.ClassCastException: class VsTs$User cannot be cast to class java.lang.String]] (الـ [[VsTs$]] ده اسم الملف: في الـ compact source file كل الـ classes بتبقى جوه class مخفي باسم الملف)

ده الفرق الأول: في TS [[o as string]] كان هيعدّي ومش هيحصل حاجة لحد ما تنادي method مش موجودة. في Java الـ cast نفسه بيتفحص.

ولما تشيل [[implements Greeter]]: خطأ compile [[incompatible types: Polite cannot be converted to Greeter]]، مع إن الـ method موجودة بنفس الاسم والنوع. في TS نفس الكود كان هيعدّي لأن الشكل مطابق (structural typing). ده nominal typing.`
        },
        {
          cmd: "jshell",
          title: "تجرّب سطر Java بسرعة من غير ما تعمل ملف",
          desc: R`[[jshell]] هو الـ REPL بتاع Java، زي ما تكتب [[node]] وتجرّب. بتكتب expression وبيطبعلك قيمته ونوعه على طول، ومش محتاج [[;]] في الآخر ولا class ولا main.

فيه أوامر بتبدأ بـ [[/]]: [[/vars]] بيعرض المتغيرات، و [[/imports]] بيعرض الـ imports الجاهزة، و [[/exit]] للخروج. والـ Tab بيكمّلك أسماء الـ methods، ولو دوست Tab مرتين بعد اسم method بيعرضلك الـ documentation.`,
          example: R`jshell
jshell> 7 / 2
jshell> 7 / 2.0
jshell> "spring".toUpperCase()
jshell> var list = new ArrayList<>(List.of(3, 1, 2))
jshell> Collections.sort(list); list
jshell> /vars
jshell> /exit`,
          try: R`افتح [[jshell]] وجرّب: [[Integer.MAX_VALUE + 1]] و [[Long.MAX_VALUE]] و [[0.1 + 0.2]] و [["a" + 1 + 2]] و [[1 + 2 + "a"]]. اتوقع الناتج قبل ما تدوس Enter.`,
          deep: {
            why: "وانت بتتعلم هتسأل نفسك كل شوية «هو ده بيرجع إيه؟». عمل ملف و main لكل سؤال بطيء. jshell بيجاوبك في ثانية، وبيوريك النوع كمان.",
            how: R`jshell بيلف كل سطر بتكتبه في class مخفي ويعمله compile ويشغّله، وبيحتفظ بالمتغيرات بين السطور. لما تكتب expression من غير ما تحطه في متغير، بيعمل متغير اسمه [[$1]] و [[$2]] وهكذا عشان تستخدمه بعدين. وفيه imports جاهزة زي [[java.util.*]] فـ [[List]] و [[ArrayList]] شغالين على طول.

وتقدر تفتح ملف: [[/open Hello.java]]، أو تحفظ الجلسة: [[/save session.jsh]].`,
            when: "تجرّب method في مكتبة Java، أو تتأكد من سلوك الأرقام والـ strings، أو تحضّر لانترفيو فيه أسئلة «الكود ده بيطبع إيه».",
            mistakes: R`تحاول تكتب برنامج كامل فيه كذا class في jshell: الملف و [[java File.java]] أريح. وتنسى إن [[/exit]] بالـ slash، مش [[exit]] بس.`
          },
          lines: [
            "افتح الـ REPL.",
            R`قسمة أرقام صحيحة: الناتج [[3]] والكسر بيتشال، عكس JS اللي بيطلع 3.5.`,
            R`لو واحد من الاتنين كسر ([[double]]) الناتج [[3.5]].`,
            R`method على string، والناتج [[SPRING]].`,
            R`[[List.of]] بيعمل list ثابتة، و [[new ArrayList<>(...)]] نسخة تتعدّل.`,
            R`بيرتّب، وبعدين يعرض الليستة: [[[1, 2, 3]]].`,
            "بيعرض كل المتغيرات وأنواعها.",
            "خروج."
          ],
          sol: R`النتايج:

[[Integer.MAX_VALUE + 1]] بيطلع [[-2147483648]]: الـ [[int]] ٣٢ بت، ولما يعدّي الحد بيلف للسالب (overflow) من غير أي خطأ. ودي bug حقيقية في حسابات الفلوس والعدادات، والحل [[long]] أو [[Math.addExact]] اللي بيرمي exception.

[[Long.MAX_VALUE]] = [[9223372036854775807]].

[[0.1 + 0.2]] = [[0.30000000000000004]]: نفس JS بالظبط، لأن الاتنين IEEE 754. عشان كده الفلوس بـ [[long]] (قروش) أو [[BigDecimal]].

[["a" + 1 + 2]] = [["a12"]]، و [[1 + 2 + "a"]] = [["3a"]]: الجمع من الشمال لليمين، وأول ما يقابل string بيبقى تجميع نصوص.`
        }
      ]
    },
    {
      t: "الأنواع والمتغيرات",
      l: 1,
      n: "primitives و wrappers، و String، و var، والـ arrays و null",
      items: [
        {
          cmd: "primitives و wrappers",
          title: "ليه فيه int و Integer، وإمتى الفرق بيعضّك؟",
          desc: R`Java فيها ٨ أنواع primitive: [[int]] و [[long]] و [[double]] و [[boolean]] و [[char]] و [[byte]] و [[short]] و [[float]]. دول قيم خام، مش objects، مينفعش يبقوا [[null]] ومفيهمش methods.

ولكل واحد wrapper class: [[Integer]] و [[Long]] و [[Double]] و [[Boolean]]... دول objects، ممكن يبقوا [[null]]، وهما اللي بيتحطوا في الـ collections، لأن [[List<int>]] مش مسموحة، لازم [[List<Integer>]]. والتحويل بينهم أوتوماتيك (autoboxing و unboxing).

الفخ المشهور: [[==]] على wrappers بيقارن المرجع مش القيمة، فـ [[Integer]] قيمته 1000 ممكن ميساويش [[Integer]] تاني قيمته 1000.`,
          example: R`void main() {
    int count = 5;
    long views = 3_000_000_000L;
    double price = 19.99;
    boolean active = true;
    char grade = 'A';
    Integer boxed = count;
    List<Integer> ids = new ArrayList<>();
    ids.add(count);
    Integer a = 127, b = 127, c = 1000, d = 1000;
    IO.println(a == b);
    IO.println(c == d);
    IO.println(c.equals(d));
    IO.println(7 / 2);
    IO.println(0.1 + 0.2);
}`,
          try: R`شغّل المثال واتوقع كل سطر قبلها. وبعدين ضيف [[Integer missing = null; int n = missing;]] وشغّل: إيه اللي حصل، وإمتى ممكن ده يحصلك في Spring (فكّر في عمود في الداتابيز قيمته null)؟`,
          flag: "script",
          deep: {
            why: R`في JS كل الأرقام [[number]] واحد. في Java لازم تختار، والاختيار الغلط بيعمل bugs: [[int]] بيلف لما يعدّي ٢ مليار، و [[Integer]] ممكن يبقى null ويوقع البرنامج، و [[==]] على wrappers بيشتغل في التست (أرقام صغيرة) ويبوظ في الإنتاج (أرقام كبيرة).`,
            how: R`الـ primitives بتتخزن كقيمة مباشرة (على الـ stack أو جوه الـ object)، فهي أسرع وأخف. الـ wrappers objects في الـ heap.

autoboxing: لما تحط [[int]] مكان [[Integer]]، الـ compiler بيكتب [[Integer.valueOf(count)]] بدالك. و unboxing: لما تحط [[Integer]] مكان [[int]]، بيكتب [[boxed.intValue()]]، ولو boxed كانت null ده بيرمي [[NullPointerException]].

[[Integer.valueOf]] عنده cache للأرقام من -128 لـ 127: بيرجع نفس الـ object كل مرة. عشان كده [[a == b]] مع 127 طلعت true (نفس الـ object)، ومع 1000 false (اتنين objects مختلفين). القاعدة: [[equals]] دايمًا مع الـ objects.

الأرقام: [[int]] ٣٢ بت (لحد حوالي ٢.١ مليار)، و [[long]] ٦٤ بت (ولازم [[L]] في الآخر للأرقام الكبيرة)، و [[double]] كسور. والـ underscore في [[3_000_000_000L]] للقراية بس. والقسمة بين [[int]] و [[int]] بتشيل الكسر.`,
            when: R`[[int]] و [[long]] و [[boolean]] للمتغيرات المحلية والحسابات. [[Integer]] و [[Long]] في الـ collections، وفي الحقول اللي ممكن تبقى فاضية فعلًا (عمود nullable، أو باراميتر اختياري في request). و [[long]] للـ ids في الداتابيز (مش [[int]]). والفلوس: [[long]] بالقروش أو [[BigDecimal]]، ومتستخدمش [[double]] أبدًا.`,
            mistakes: R`[[if (user.getAge() == other.getAge())]] والاتنين [[Integer]]: بيشتغل مع ٢٥ وبيبوظ مع ٢٠٠. وحقل [[int]] في entity لعمود nullable: Hibernate هيوقع أو يحط 0 مكان null. وحقل [[Integer]] في entity وتعمل [[int x = entity.getX()]] على صف قيمته null: NullPointerException.

في الانترفيو: «[[Integer a = 127, b = 127; a == b]]؟» true بسبب الـ Integer cache، ومع 128 false. والسؤال الأهم بعدها: «طب إزاي تقارن؟» [[equals]] أو [[Objects.equals(a, b)]] لو ممكن يبقوا null.`
          },
          lines: [
            "main.",
            R`[[int]] رقم صحيح ٣٢ بت.`,
            R`[[long]] ٦٤ بت، و [[L]] لازمة لأن الرقم أكبر من حد الـ int.`,
            R`[[double]] كسر (زي number في JS).`,
            R`[[boolean]]: true أو false بس، ومفيش truthy و falsy: [[if (count)]] خطأ compile.`,
            R`[[char]] حرف واحد بـ quotes مفردة. [["A"]] بـ double quotes ده String.`,
            R`autoboxing: الـ int اتحوّل لـ Integer لوحده.`,
            R`الـ collections بتاخد objects بس، فالنوع [[Integer]] مش [[int]].`,
            R`[[add(count)]]: autoboxing تاني.`,
            "أربع wrappers: اتنين قيمتهم 127 واتنين 1000.",
            R`[[true]]: الاتنين نفس الـ object من الـ cache.`,
            R`[[false]]: اتنين objects مختلفين، و [[==]] بيقارن المرجع.`,
            R`[[true]]: [[equals]] بيقارن القيمة. دي الطريقة الصح.`,
            R`[[3]]: قسمة int على int بتشيل الكسر.`,
            R`[[0.30000000000000004]]: نفس مشكلة الكسور في JS.`,
            "قفلة."
          ],
          sol: R`الناتج بالترتيب: [[true]] ثم [[false]] ثم [[true]] ثم [[3]] ثم [[0.30000000000000004]].

ولما تضيف [[Integer missing = null; int n = missing;]] البرنامج بيقع بـ [[NullPointerException]]، والرسالة بتقول [[Cannot invoke "java.lang.Integer.intValue()" because ... is null]]. السطر مفيهوش أي method call ظاهرة، بس الـ compiler كتب [[missing.intValue()]] بدالك (unboxing).

في Spring: entity فيه [[Integer discount]] والعمود null في الداتابيز، وبعدين service بيعمل [[int d = product.getDiscount();]]: الصفحة بتقع بـ 500 في منتج واحد بس. الحل: [[int]] لو العمود NOT NULL فعلًا، أو تتعامل مع null صريح (مثلًا [[Objects.requireNonNullElse(product.getDiscount(), 0)]]).`
        },
        {
          cmd: "String",
          title: "تقارن النصوص وتبنيها إزاي في Java؟",
          desc: R`[[String]] في Java object ثابت (immutable): أي method زي [[toUpperCase]] بترجع String جديد والأصلي زي ما هو. نفس JS.

الفرق الكبير: المقارنة بـ [[equals]] مش [[==]]. الـ [[==]] بيسأل «هل دول نفس الـ object؟» ومش «هل النص واحد؟».

ومفيش template literals بـ [[$__{}]] زي JS. البدايل: [[+]] للحاجات الصغيرة، و [["...%s...".formatted(x)]]، و text blocks بـ [["""]] للنصوص اللي فيها كذا سطر (JSON و SQL). ولو بتجمّع نص في loop استخدم [[StringBuilder]].`,
          example: R`void main() {
    String a = "java";
    String b = new String("java");
    IO.println(a == b);
    IO.println(a.equals(b));
    String name = "Sara";
    IO.println("Hi %s, you have %d tasks".formatted(name, 3));
    String json = """
        {"name": "%s", "admin": false}
        """.formatted(name);
    IO.print(json);
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 3; i++) sb.append(i).append(',');
    IO.println(sb);
    IO.println(" a,b ,c ".strip().split(",").length);
}`,
          try: R`اكتب method اسمها [[isAdmin(String role)]] ترجع true لو الـ role هو "admin" بأي حالة حروف ("ADMIN" أو "Admin"). جرّبها بـ [["admin"]] و [["ADMIN"]] و [[null]]. هل كتبتها بشكل ميقعش مع null؟`,
          flag: "script",
          deep: {
            why: R`[[if (role == "admin")]] من أشهر bugs المبتدئين في Java: ساعات بتشتغل (لأن الـ literals بتتخزن مرة واحدة) وساعات لأ (لما النص جاي من request أو داتابيز). ولازم تعرف تبني نصوص بشكل نضيف من غير template literals.`,
            how: R`الـ string literals زي [["java"]] بتتخزن في String pool: أي literal بنفس النص بيشاور على نفس الـ object، فـ [[==]] بينهم بيطلع true بالصدفة. أما [[new String(...)]] أو أي نص جاي من برّه (JSON، أو داتابيز، أو [[substring]]) ده object جديد، فـ [[==]] بتطلع false.

[[equals]] بيقارن الحروف، و [[equalsIgnoreCase]] من غير حالة الحروف. ولو المتغير ممكن يبقى null، اكتب الـ literal الأول: [["admin".equals(role)]] مبتقعش مع null، و [[role.equals("admin")]] بتقع.

[[formatted]] (زي [[String.format]]) بتاخد [[%s]] لأي حاجة، و [[%d]] للأرقام الصحيحة، و [[%.2f]] لكسر برقمين. والـ text block [["""]] بيشيل المسافات المشتركة على الشمال، وبيحافظ على السطور، ومش محتاج تهرب [["]] جواه.

الـ [[+]] في loop بيعمل String جديد كل لفة (لأنه immutable)، و [[StringBuilder]] بيبني في buffer واحد. الـ compiler بيحسّن [[+]] في السطر الواحد لوحده، فمتقلقش منه برّه الـ loops.`,
            when: R`[[equals]] دايمًا لمقارنة النصوص. [[formatted]] للرسايل. text blocks للـ SQL في [[@Query]] والـ JSON في التستات. [[StringBuilder]] في loops. و [[isBlank()]] بدل [[trim().isEmpty()]].`,
            mistakes: R`[[==]] مع النصوص. و [[role.equals("admin")]] و role ممكن تبقى null. ونسيان إن [[split]] بياخد regex: [["a.b".split(".")]] بيرجع array فاضية لأن [[.]] في regex معناها أي حرف، والصح [[split("\\.")]].

في الانترفيو: «ليه String immutable؟» عشان الأمان (نص الـ URL أو الـ password محدش يغيّره بعد الفحص)، وعشان الـ pool، وعشان يبقى آمن بين الـ threads، وعشان الـ hashCode يتحسب مرة ويتخزن (مفتاح HashMap ممتاز). و «الفرق بين String و StringBuilder و StringBuffer؟» الأخير زي StringBuilder بس synchronized وأبطأ، ونادرًا ما تحتاجه.`
          },
          lines: [
            "main.",
            "literal: بيتخزن في الـ String pool.",
            R`[[new String]] بيعمل object جديد بنفس النص.`,
            R`[[false]]: مش نفس الـ object.`,
            R`[[true]]: نفس الحروف. دي المقارنة الصح.`,
            "متغير عادي.",
            R`[[%s]] مكان النص و [[%d]] مكان الرقم: [[Hi Sara, you have 3 tasks]].`,
            R`text block: بيبدأ بـ [["""]] وبعدها سطر جديد لازم.`,
            R`النص نفسه، و [["]] جواه من غير escape.`,
            R`قفلة الـ text block، و [[formatted]] عليه زي أي String.`,
            R`[[print]] من غير سطر جديد، لأن الـ text block فيه سطر جديد في آخره أصلًا.`,
            R`[[StringBuilder]] لبناء نص على مراحل.`,
            R`[[append]] بترجع نفس الـ builder فتقدر تكمّل عليها (chaining).`,
            R`[[0,1,2,]]: println بينادي [[toString]] لوحده.`,
            R`[[strip]] بيشيل المسافات من الأطراف، و [[split]] بيقسم: ٣ أجزاء.`,
            "قفلة."
          ],
          sol: R`الحل تحت. بيطبع [[true]] و [[true]] و [[false]].

كتبنا [["admin".equalsIgnoreCase(role)]] مش [[role.equalsIgnoreCase("admin")]]: لو role قيمتها null، الأولى بترجع false بهدوء، والتانية بترمي NullPointerException لأنك بتنادي method على null. لو استخدمت [[==]] كان [[isAdmin("ADMIN")]] هيرجع false، وممكن [[isAdmin("admin")]] يرجع true بالصدفة بس بسبب الـ String pool، ومع نص جاي من request هيرجع false.`,
          solCode: R`static boolean isAdmin(String role) {
    return "admin".equalsIgnoreCase(role);
}

void main() {
    IO.println(isAdmin("admin"));
    IO.println(isAdmin("ADMIN"));
    IO.println(isAdmin(null));
}`
        },
        {
          cmd: "var و final",
          title: "تخلي Java تستنتج النوع، وتمنع المتغير يتغير",
          desc: R`[[var]] بيخلي الـ compiler يستنتج نوع المتغير المحلي من القيمة: [[var names = new ArrayList<String>();]] نوعها [[ArrayList<String>]]. زي [[let]] مع الاستنتاج في TS، بس النوع بيتحدد مرة وخلاص، و [[var]] ينفع في المتغيرات المحلية بس (مش حقول ولا باراميترات).

و [[final]] زي [[const]] في JS: المتغير مينفعش يتعيّن تاني. بس زي const بالظبط، لو القيمة object، الـ object نفسه ممكن يتعدّل.`,
          example: R`void main() {
    var names = new ArrayList<String>();
    names.add("Sara");
    var total = 0;
    for (var n : names) total += n.length();
    final int limit = 10;
    int[] scores = {90, 75, 60};
    IO.println(scores.length + " " + scores[0]);
    String missing = null;
    IO.println(total + " " + limit);
    IO.println(missing.length());
}`,
          try: R`جرّب: [[var x;]] من غير قيمة، و [[var y = null;]]، و [[limit = 20;]] بعد تعريفه final، و [[scores[3]]]. اقرا رسالة كل واحد، وقول أنهي بيطلع وقت الـ compile وأنهي وقت التشغيل.`,
          flag: "script",
          deep: {
            why: R`الكود القديم في Java كان بيكرر النوع مرتين: [[Map<String, List<Order>> byCity = new HashMap<String, List<Order>>();]]. [[var]] بيشيل التكرار ده. و [[final]] بيوضّح للي بيقرا إن القيمة دي مش هتتغير، وبيسمح للـ lambdas تستخدم المتغير.`,
            how: R`[[var]] استنتاج وقت الـ compile بس، والنوع ثابت بعد كده: [[var total = 0;]] بعدها [[total = "x";]] خطأ. مش dynamic typing.

الـ arrays في Java طولها ثابت من وقت ما تتعمل: [[scores.length]] (خاصية مش method)، ولو قريت برّه الحدود بيرمي [[ArrayIndexOutOfBoundsException]] بدل ما يرجع undefined زي JS. عشان كده في الغالب هتستخدم [[List]] مش arrays.

و [[null]]: أي متغير نوعه object (String أو List أو أي class) ممكن يبقى null، والـ compiler مش هيمنعك. لو ناديت method عليه: [[NullPointerException]]. ومن Java 14 الرسالة بتقولك إيه اللي كان null بالظبط (helpful NPE messages).

والـ lambda مينفعش تستخدم متغير محلي غير لو هو [[final]] أو effectively final (يعني محدش غيّره بعد أول قيمة).`,
            when: R`[[var]] لما النوع واضح من اليمين ([[new]] أو method اسمها واضح). اكتب النوع صريح لما القيمة جاية من method مش واضح بترجع إيه. و [[final]] على الحقول اللي بتتحط في الـ constructor (وده الأهم، في Spring كل الـ dependencies [[private final]]).`,
            mistakes: R`[[var x = service.process();]] ومحدش فاهم x نوعها إيه غير لما يفتح IDE. و [[var list = new ArrayList<>();]] من غير نوع جوه الـ diamond: النوع بيبقى [[ArrayList<Object>]]. وتفتكر إن [[final List]] بيمنع [[add]]: لأ، ده للـ variable بس، وعشان list متتعدلش استخدم [[List.of]] أو [[List.copyOf]].`
          },
          lines: [
            "main.",
            R`[[var]]: النوع اتستنتج [[ArrayList<String>]].`,
            "إضافة عادية.",
            R`[[int]] مستنتج من الـ 0.`,
            R`for-each: زي [[for (const n of names)]] في JS، و [[var]] جواها كمان.`,
            R`[[final]]: زي const، مينفعش يتعيّن تاني.`,
            R`array: طوله ثابت (٣)، والقيم بين [[{}]].`,
            R`[[length]] من غير أقواس في الـ arrays، والـ index من صفر.`,
            R`[[null]] مسموحة في أي نوع object.`,
            R`[[4 10]]: طول "Sara" والـ limit.`,
            R`NullPointerException: بتنادي method على null.`,
            "قفلة."
          ],
          sol: R`الأربعة:

[[var x;]]: خطأ compile [[cannot infer type for local variable x]] و [[(cannot use 'var' on variable without initializer)]].

[[var y = null;]]: خطأ compile [[variable initializer is 'null']]، لأن null ملهاش نوع يتستنتج.

[[limit = 20;]]: خطأ compile [[cannot assign a value to final variable limit]].

[[scores[3]]]: بيعدّي الـ compile، ويقع وقت التشغيل بـ [[ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3]]. الـ compiler مبيعرفش الـ index هيبقى إيه.

وسطر [[missing.length()]] في المثال نفسه بيقع وقت التشغيل بـ [[NullPointerException: Cannot invoke "String.length()" because "<local4>" is null]]. لو عملت compile بـ [[javac -g]] الرسالة بتذكر اسم المتغير [["missing"]] بدل [[<local4>]].`
        }
      ]
    },
    {
      t: "الكلاسات والـ interfaces",
      l: 1,
      n: "class بـ fields و constructor و methods، و static و final، و interfaces، والوراثة",
      items: [
        {
          cmd: "class و constructor",
          title: "تعمل class فيه بيانات وسلوك ومحدش يلعب في حالته من برّه",
          desc: R`الـ class في Java شبه class في TS: حقول (fields) و constructor و methods. الفرق إن الحقول لازم تتعلن بنوعها فوق، والـ constructor اسمه نفس اسم الـ class (مش [[constructor]])، و [[this.]] اختيارية لو مفيش تعارض في الأسماء.

العادة في Java: الحقول [[private]]، والوصول ليها من برّه بـ methods: [[getBalance()]] للقراية، و methods ليها معنى زي [[deposit]] بدل setter عام. وكل class ليه [[toString]] و [[equals]] و [[hashCode]] جايين من [[Object]]، وتقدر تعمل override ليهم.`,
          example: R`public class Account {
    private final String owner;
    private long balance;

    public Account(String owner, long balance) {
        if (balance < 0) throw new IllegalArgumentException("negative balance");
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(long amount) {
        balance += amount;
    }

    public long getBalance() { return balance; }

    @Override
    public String toString() { return owner + ": " + balance; }

    public static void main(String[] args) {
        Account acc = new Account("Sara", 100);
        acc.deposit(50);
        System.out.println(acc);
        System.out.println(acc.getBalance());
    }
}`,
          try: R`ضيف method اسمها [[withdraw(long amount)]] ترمي [[IllegalStateException]] لو الرصيد مش كفاية، وجرّبها بسحب ٥٠ مرة و ٥٠٠ مرة. وبعدين جرّب [[acc.balance = 1_000_000;]] من [[main]] ومن class تاني في نفس الملف: الفرق إيه؟`,
          flag: "script",
          deep: {
            why: R`لو الرصيد حقل public، أي حتة في الكود ممكن تحطه سالب. الـ encapsulation (حقول private و methods بتفحص) بيخلي القواعد في مكان واحد: مفيش طريقة يبقى فيها Account برصيد سالب. وده أساس الـ entities في JPA والـ services في Spring.`,
            how: R`الـ access modifiers: [[private]] جوه الـ class بس، ومن غير أي كلمة (package-private) جوه نفس الـ package، و [[protected]] الـ package والكلاسات الوارثة، و [[public]] أي حد. ده أشد من TS: في Java الـ private بيتفحص وقت التشغيل كمان، مش بس في الـ compiler.

[[new Account(...)]] بيحجز object في الـ heap وينادي الـ constructor. لو معملتش أي constructor، Java بتعمل واحد فاضي من غير باراميترات. ولو عملت واحد بباراميترات، الفاضي بيختفي (وده مهم في JPA اللي محتاج constructor فاضي، درس الـ entities).

[[@Override]] annotation بتقول للـ compiler «أنا قصدي أعمل override لـ method في الأب»، فلو كتبت الاسم غلط ([[tostring]]) بيطلع خطأ بدل ما يعمل method جديدة من غير ما تاخد بالك.

وفي الملف ده عندنا [[public class Account]] و [[main]] جواه بالشكل الكلاسيكي: الملف لازم يبقى اسمه [[Account.java]] بالظبط، لأن الـ public class اسمه لازم يطابق اسم الملف.`,
            when: "أي حاجة ليها حالة وقواعد: حساب، وطلب، وسلة. لو مجرد بيانات بتتنقل من غير قواعد (DTO) استخدم record (درس records).",
            mistakes: R`getter و setter لكل حقل أوتوماتيك (IDE بيولّدهم) فالـ class بقى struct مفتوح وكأن مفيش encapsulation. و ترجّع list داخلية من getter فاللي برّه يعدّل فيها: رجّع [[List.copyOf(items)]]. وتنسى [[this.]] لما اسم الباراميتر زي الحقل: [[owner = owner;]] بيعيّن الباراميتر لنفسه والحقل يفضل null.

وفي الكود القديم هتلاقي Lombok ([[@Getter]] و [[@Setter]] و [[@Data]]) بيولّد الحاجات دي. شائع جدًا في الشركات، بس records قللت الحاجة ليه.`
          },
          lines: [
            R`[[public class]]: اسم الملف لازم يبقى Account.java.`,
            R`حقل [[private final]]: بيتحط في الـ constructor ومش بيتغير.`,
            R`حقل private بيتغير، بس من جوه الـ class بس.`,
            R`الـ constructor: نفس اسم الـ class ومفيش نوع رجوع.`,
            R`الفحص في مكان واحد: مفيش Account برصيد سالب. [[throw]] زي JS.`,
            R`[[this.owner]] الحقل، و [[owner]] الباراميتر.`,
            "نفس الكلام.",
            "قفلة الـ constructor.",
            R`method عامة بتغيّر الحالة. [[void]] يعني مبترجعش حاجة.`,
            "بتعدّل الحقل الخاص.",
            "قفلة.",
            R`getter: الطريقة الوحيدة لقراية الرصيد من برّه.`,
            R`[[@Override]]: بنعيد تعريف method جاية من Object.`,
            R`[[toString]] هو اللي println بتناديه.`,
            R`الشكل الكلاسيكي لـ main: [[public static void]] و [[String[] args]] للـ arguments.`,
            R`[[new]] بيعمل object وبينادي الـ constructor.`,
            "إيداع ٥٠.",
            R`[[System.out.println]] الطريقة القديمة للطباعة (شغالة في كل الإصدارات)، وبتنادي toString: [[Sara: 150]].`,
            R`[[150]].`,
            "قفلة main.",
            "قفلة الـ class."
          ],
          sol: R`[[withdraw]] زي الكود تحت. السحب الأول بيطبع [[Sara: 100]]، والتاني بيرمي [[IllegalStateException: insufficient balance]].

[[acc.balance = 1_000_000;]] من [[main]] بيشتغل لأن main جوه نفس الـ class، والـ private معناها «جوه الـ class» مش «جوه الـ object». من class تاني (اكتب [[class Other { void hack(Account a) { a.balance = 1; } }]] تحت قفلة Account في نفس الملف) بيطلع خطأ compile: [[balance has private access in Account]]. خلي بالك: في ملف compact (اللي بيبدأ بـ [[void main()]] من غير class) كل الـ classes بتبقى nested جوه class واحد مخفي، والـ nested classes بيشوفوا الـ private بتاع بعض، فالتجربة دي لازم تبقى في ملف فيه [[public class]] زي ده.

ليه [[IllegalStateException]] مش [[IllegalArgumentException]]؟ المبلغ نفسه سليم، المشكلة في حالة الحساب. الاتنين unchecked (درس الأخطاء).`,
          solCode: R`public void withdraw(long amount) {
    if (amount > balance) throw new IllegalStateException("insufficient balance");
    balance -= amount;
}

// في main:
acc.withdraw(50);
System.out.println(acc);
acc.withdraw(500);`
        },
        {
          cmd: "static و final",
          title: "حاجة بتاعة الـ class كله مش كل object، وحاجة متتغيرش",
          desc: R`[[static]] معناها إن الحقل أو الـ method بتاع الـ class نفسه، مش كل object: [[Counter.created]] نسخة واحدة مشتركة، و [[Math.max()]] بتتنادى من غير [[new]]. زي [[static]] في classes بتاعة JS و TS بالظبط.

و [[static final]] مع اسم بحروف كبيرة ([[MAX]]) ده الـ constant في Java. و [[final]] على حقل object معناها بيتحط مرة واحدة في الـ constructor، و [[final]] على class معناها محدش يورث منه ([[String]] مثلًا).`,
          example: R`class Counter {
    static int created = 0;
    static final int MAX = 3;
    final int id;

    Counter() {
        created++;
        id = created;
    }

    static boolean full() { return created >= MAX; }
}

void main() {
    var a = new Counter();
    var b = new Counter();
    IO.println(a.id + " " + b.id + " " + Counter.created);
    IO.println(Counter.full());
    final List<String> list = new ArrayList<>();
    list.add("still mutable");
    IO.println(list);
}`,
          try: R`جوه [[full()]] جرّب تقرا [[id]]، واقرا الخطأ. وبعدين فكّر: لو [[created++]] بيتنادى من ١٠٠ thread في نفس الوقت (زي ١٠٠ request في Spring)، الرقم هيطلع صح؟`,
          flag: "script",
          deep: {
            why: R`ثوابت التطبيق، والـ utility methods ([[Math]] و [[List.of]] و [[Objects.equals]])، والـ factory methods ([[Money.of(...)]]) كلها static. وفي Spring هتفهم ليه الـ state المشتركة (static أو حقل في bean) خطر.`,
            how: R`الحقل الـ static بيتخزن مرة واحدة مع الـ class، مش مع كل object. والـ static method ملهاش [[this]]، فمتقدرش تقرا حقول الـ object من جواها.

[[final]] على حقل: لازم يتحط مرة واحدة بالظبط (في التعريف أو في كل constructor)، والـ compiler بيتأكد. وده بيخلي الـ object immutable لو كل حقوله final ونوعها immutable.

ليه [[created++]] مش آمن مع threads: هو ٣ خطوات (اقرا، زوّد، اكتب)، واتنين threads ممكن يقروا نفس القيمة ويكتبوا نفس النتيجة، فيضيع عدّ. الحل [[AtomicInteger]] أو synchronization. JS مفيهاش المشكلة دي لأنها thread واحد، بس Java server بيشغّل كل request على thread.`,
            when: R`[[static final]] للثوابت. static methods للـ utilities اللي ملهاش حالة. في Spring: متخزنش state في حقول static أو حقول عادية في bean (كلهم singletons مشتركين بين كل الـ requests)، إلا لو thread-safe.`,
            mistakes: R`تحط كل حاجة static عشان «أسهل» فالكود يبقى زي procedural ومتقدرش تعمل mock في التستات. وتفتكر إن [[final]] معناها immutable: [[final List]] الـ list نفسها بتتعدّل عادي. ومتغير static بيتعدّل من كذا request: race condition بيطلع تحت الضغط بس.`
          },
          lines: [
            "class من غير public: ينفع كذا واحد في الملف.",
            R`[[static]]: نسخة واحدة للـ class كله.`,
            R`constant: [[static final]] واسم كبير.`,
            R`حقل [[final]] لكل object، بيتحط في الـ constructor.`,
            "constructor من غير باراميترات.",
            "بيزوّد العداد المشترك.",
            R`أول وآخر مرة الـ [[id]] بيتحط.`,
            "قفلة.",
            R`static method: بتتنادى بـ [[Counter.full()]] ومتقدرش تقرا id.`,
            "قفلة الـ class.",
            "main.",
            "object أول.",
            "object تاني.",
            R`[[1 2 2]]: كل واحد ليه id، والعداد واحد مشترك.`,
            R`[[false]]: ٢ أقل من ٣.`,
            R`[[final]] على متغير object: المرجع ثابت.`,
            "بس الـ object نفسه بيتعدّل عادي.",
            R`[[[still mutable]]].`,
            "قفلة."
          ],
          sol: R`قراية [[id]] جوه [[full()]] بتطلع: [[non-static variable id cannot be referenced from a static context]]. الـ static method ملهاش object، فأنهي id؟

وموضوع الـ threads: لأ، مش مضمون. [[created++]] مش atomic، فمع ١٠٠ thread ممكن يطلع ٩٧ مثلًا، والغلط مش هيبان في التجربة على جهازك غالبًا. الحل: [[static final AtomicInteger created = new AtomicInteger();]] و [[created.incrementAndGet()]]. والأهم في Spring: متخليش الـ beans تحتفظ بحالة بتتغير بين الـ requests أصلًا.`
        },
        {
          cmd: "interfaces",
          title: "تعرّف عقد وكذا class ينفذوه، وتشتغل على العقد مش على الـ class",
          desc: R`الـ [[interface]] في Java عقد: methods من غير تنفيذ، وأي class عايز يلتزم بيه يكتب [[implements]] وينفذ كل الـ methods. والكود اللي بيستخدمه بيشتغل على نوع الـ interface: [[List<Shape>]] فيها circles و squares، وكل واحد بينفذ [[area()]] بطريقته (polymorphism).

وممكن الـ interface يبقى فيه [[default]] method بتنفيذ جاهز، والكلاسات تستخدمها أو تعيد تعريفها. وده بالظبط اللي Spring بيعتمد عليه: [[JpaRepository]] interface وانت مش بتكتب ليه class خالص، و Spring بيعمل التنفيذ.`,
          example: R`interface Shape {
    double area();
    default String describe() { return getClass().getSimpleName() + " " + Math.round(area()); }
}

class Circle implements Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}

class Square implements Shape {
    private final double side;
    Square(double side) { this.side = side; }
    public double area() { return side * side; }
}

void main() {
    List<Shape> shapes = List.of(new Circle(1), new Square(3));
    for (Shape s : shapes) IO.println(s.describe());
}`,
          try: R`اعمل interface اسمه [[PaymentGateway]] فيه [[String charge(long cents)]]، واتنين implementations: [[FakeGateway]] بيرجع [["ok-" + cents]]، و [[FailingGateway]] بيرمي exception. واعمل class [[Checkout]] بياخد [[PaymentGateway]] في الـ constructor. ده بالظبط شكل الـ dependency injection في Spring.`,
          flag: "script",
          deep: {
            why: R`الـ interface بيفصل «إيه المطلوب» عن «إزاي بيتعمل». الـ service بتاعك يعتمد على [[PaymentGateway]] مش على Paymob أو Stripe، فتقدر تغيّر المزود أو تحط fake في التست من غير ما تلمس الـ service. ده حرف D في SOLID (درس SOLID في «تاب الانترفيو»)، وأساس Spring كله.`,
            how: R`الـ methods في الـ interface public و abstract افتراضيًا، فمش محتاج تكتبهم. والـ class اللي بينفذ لازم يكتب [[public]] قبل كل method (لأنه مينفعش يقلل الـ visibility).

الـ class ممكن يعمل implements لأكتر من interface ([[class A implements X, Y]])، بس يورث من class واحد بس. و [[default]] methods اتضافت في Java 8 عشان يقدروا يضيفوا methods لـ interfaces قديمة زي [[List]] من غير ما يكسروا كل الكود.

والـ interface اللي فيه method واحدة abstract اسمه functional interface، وده اللي بيخلي الـ lambdas تشتغل (درس lambdas): [[Shape s = () -> 42;]] مسموحة.

الـ dispatch: لما تنادي [[s.area()]]، الـ JVM بيبص على الـ class الحقيقي للـ object وقت التشغيل ويشغّل الـ method بتاعته (dynamic dispatch).`,
            when: R`بين الطبقات: الـ service بيعتمد على interface لما فيه أكتر من implementation فعلًا (مزودين، أو fake في التست)، أو لما Spring بيولّد التنفيذ (repositories). ومش لازم interface لكل service: [[TaskService]] و [[TaskServiceImpl]] من غير سبب ده تعقيد قديم، و Mockito بيعرف يعمل mock للـ class على طول.`,
            mistakes: R`interface لكل class «عشان الـ best practice» فالمشروع كله ملفات [[Impl]]. و interface ضخم فيه ٢٠ method وكل class بينفذ نصهم ويرمي [[UnsupportedOperationException]] في الباقي (خرق لـ Interface Segregation). ونسيان [[public]] في التنفيذ: [[attempting to assign weaker access privileges]].`
          },
          lines: [
            "العقد.",
            R`method من غير جسم: كل واحد لازم ينفذها.`,
            R`[[default]]: تنفيذ جاهز بيستخدم [[area()]] من غير ما يعرف هو شكل إيه.`,
            "قفلة.",
            R`[[implements Shape]]: Circle وعد إنه ينفذ العقد.`,
            "حقل خاص.",
            "constructor.",
            R`التنفيذ، ولازم [[public]].`,
            "قفلة.",
            "class تاني بنفس العقد.",
            "حقل.",
            "constructor.",
            "تنفيذ مختلف لنفس الـ method.",
            "قفلة.",
            "main.",
            R`list نوعها الـ interface وفيها أشكال مختلفة.`,
            R`كل واحد بينفذ [[area]] بتاعته: [[Circle 3]] و [[Square 9]].`,
            "قفلة."
          ],
          sol: R`بيطبع [[paid: ok-5000]] وبعدين [[failed: gateway down]]. [[Checkout]] مبيعرفش ولا بيهمه مين المزود الحقيقي، ده اللي بيتبعتله في الـ constructor. في Spring، [[new Checkout(...)]] ده هيعمله Spring بدالك، وهيختار الـ implementation اللي عليها [[@Component]] (درس الـ DI في المستوى ٢). وفي التست تبعت [[FakeGateway]] أو mock.`,
          solCode: R`interface PaymentGateway { String charge(long cents); }

class FakeGateway implements PaymentGateway {
    public String charge(long cents) { return "ok-" + cents; }
}

class FailingGateway implements PaymentGateway {
    public String charge(long cents) { throw new IllegalStateException("gateway down"); }
}

class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
    String pay(long cents) {
        try {
            return "paid: " + gateway.charge(cents);
        } catch (IllegalStateException e) {
            return "failed: " + e.getMessage();
        }
    }
}

void main() {
    IO.println(new Checkout(new FakeGateway()).pay(5000));
    IO.println(new Checkout(new FailingGateway()).pay(5000));
}`
        },
        {
          cmd: "extends و abstract",
          title: "class بيورث من class، وإمتى الوراثة فكرة وحشة",
          desc: R`[[extends]] بيخلي الـ class يورث حقول و methods من class أب، ويعيد تعريف اللي عايزه بـ [[@Override]]، ويوصل لنسخة الأب بـ [[super]]. والـ [[abstract class]] أب مينفعش يتعمل منه object، وفيه methods لازم الأبناء ينفذوها، وممكن يبقى فيه حقول وكود مشترك (عكس الـ interface).

القاعدة الحديثة: فضّل الـ interfaces والـ composition (object جواه object تاني) على الوراثة. الوراثة بتربط الابن بتفاصيل الأب، وأي تغيير في الأب ممكن يكسر كل الأبناء.`,
          example: R`abstract class Notifier {
    private final String to;
    protected Notifier(String to) { this.to = to; }
    abstract String channel();
    String send(String msg) { return "[" + channel() + "] " + to + ": " + msg; }
}

class EmailNotifier extends Notifier {
    EmailNotifier(String to) { super(to); }
    @Override String channel() { return "email"; }
}

class SmsNotifier extends Notifier {
    SmsNotifier(String to) { super(to); }
    @Override String channel() { return "sms"; }
    @Override String send(String msg) { return super.send(msg.substring(0, Math.min(10, msg.length()))); }
}

void main() {
    List<Notifier> all = List.of(new EmailNotifier("sara@example.com"), new SmsNotifier("0100"));
    for (Notifier n : all) IO.println(n.send("Your order has shipped"));
}`,
          try: R`جرّب [[new Notifier("x")]]، وجرّب تشيل [[super(to);]] من [[EmailNotifier]]. وبعدين أعد كتابة المثال من غير وراثة: interface [[Channel]] فيه [[String name()]]، و class [[Notifier]] واحد بياخد [[Channel]] في الـ constructor.`,
          flag: "script",
          deep: {
            why: R`هتلاقي الوراثة في كل مكتبة Java قديمة وفي كود الشركات، وهتتسأل عنها في الانترفيو (OOP pillars). وفي Spring هتورث من classes جاهزة زي [[ResponseEntityExceptionHandler]] (درس الأخطاء في المستوى ٢). بس في كودك انت، معرفة إمتى تتجنبها أهم.`,
            how: R`الابن بياخد كل حاجة غير الـ private (هي موجودة بس مش ظاهرة له)، وأول سطر في الـ constructor لازم ينادي constructor الأب بـ [[super(...)]]، ولو مكتبتهوش Java بتحط [[super()]] فاضي، ولو الأب مفيهوش constructor فاضي: خطأ compile.

[[abstract]] method: من غير جسم، والابن لازم ينفذها أو يبقى abstract هو كمان. و [[protected]] يعني الأبناء (والـ package) بس.

الـ override بيتحدد وقت التشغيل: [[send]] في الأب بينادي [[channel()]]، واللي بيتنفذ هو نسخة الابن الحقيقي. ده الـ Template Method pattern.

الفرق عن الـ interface: الـ abstract class فيه state (حقول) و constructor، والـ class بيورث من واحد بس. والـ interface مفيهوش state، والـ class ينفذ كذا واحد.`,
            when: R`abstract class لما فيه كود وحالة مشتركة فعلًا بين أنواع قريبة جدًا (علاقة «is-a» حقيقية). غير كده: interface و composition. و Java حديثة بتقدم [[sealed]] و records لنمذجة الأنواع المحدودة (الدرس الجاي).`,
            mistakes: R`سلسلة وراثة طويلة [[BaseEntity → AuditedEntity → SoftDeletableEntity → User]] ومحدش عارف الـ method دي جاية منين. و [[extends]] عشان تعيد استخدام method واحدة. وتنادي method قابلة للـ override من الـ constructor بتاع الأب: بتتنفذ نسخة الابن قبل ما حقوله تتحط.

في الانترفيو: «abstract class ولا interface؟» interface افتراضيًا، و abstract class لما فيه حالة وكود مشترك. و «ليه Java مفيهاش multiple inheritance للـ classes؟» مشكلة الـ diamond: لو أبين فيهم نفس الـ method، ياخد أنهي؟ (مع default methods في interfaces، لو حصل تعارض لازم تعمل override وتختار).`
          },
          lines: [
            R`[[abstract]]: مينفعش [[new Notifier]].`,
            "حقل خاص بالأب.",
            R`constructor [[protected]]: للأبناء بس.`,
            "method من غير جسم: كل ابن لازم ينفذها.",
            R`كود مشترك بينادي [[channel()]] اللي هيتحدد وقت التشغيل.`,
            "قفلة.",
            R`[[extends]]: EmailNotifier هو Notifier.`,
            R`[[super(to)]] بينادي constructor الأب، ولازم يبقى الأول.`,
            "التنفيذ المطلوب.",
            "قفلة.",
            "ابن تاني.",
            "نفس الكلام.",
            "قناته.",
            R`بيعيد تعريف [[send]] كلها، وبينادي نسخة الأب بـ [[super.send]] بعد ما يقص الرسالة لـ ١٠ حروف.`,
            "قفلة.",
            "main.",
            "list نوعها الأب.",
            R`كل واحد بيتصرف حسب نوعه الحقيقي: [[[email] sara@example.com: Your order has shipped]] و [[[sms] 0100: Your order]].`,
            "قفلة."
          ],
          sol: R`[[new Notifier("x")]]: [[Notifier is abstract; cannot be instantiated]].

من غير [[super(to);]]: Java بتحاول تنادي [[super()]] الفاضي ومش لاقياه: [[constructor Notifier in class Notifier cannot be applied to given types]].

والنسخة بالـ composition تحت: بتطبع نفس الناتج. [[Notifier]] دلوقتي class واحد، والاختلاف في object بيتبعتله. تقدر تضيف قناة جديدة (WhatsApp) من غير ما تورث، وتقدر تغيّر قناة object وهو شغال، وتختبر [[Notifier]] بـ Channel وهمي. ولاحظ إن [[() -> "email"]] lambda لأن [[Channel]] فيه method واحدة.`,
          solCode: R`interface Channel { String name(); }

class Notifier {
    private final String to;
    private final Channel channel;
    Notifier(String to, Channel channel) { this.to = to; this.channel = channel; }
    String send(String msg) { return "[" + channel.name() + "] " + to + ": " + msg; }
}

void main() {
    Channel email = () -> "email";
    IO.println(new Notifier("sara@example.com", email).send("Your order has shipped"));
}`
        }
      ]
    },
    {
      t: "records و enums و switch",
      l: 1,
      n: "أنواع داتا في سطر، وقيم محددة بالاسم، و switch بيرجع قيمة، و pattern matching زي discriminated unions",
      items: [
        {
          cmd: "records",
          title: "نوع للداتا بس في سطر واحد، زي type في TS",
          desc: R`[[record Money(long cents, String currency) {}]] سطر واحد بيعمل class كامل: حقول [[private final]]، و constructor بالترتيب، و accessor لكل حقل ([[cents()]] مش [[getCents()]])، و [[equals]] و [[hashCode]] و [[toString]] بيقارنوا بالقيم. ده أقرب حاجة في Java لـ [[type Money = { cents: number; currency: string }]] في TS، بس immutable كمان.

وتقدر تضيف فحص في compact constructor (من غير أقواس باراميترات)، وتضيف methods. وده الشكل اللي هتستخدمه في Spring للـ DTOs: الـ request والـ response.`,
          example: R`record Money(long cents, String currency) {
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
    Money plus(Money other) { return new Money(cents + other.cents, currency); }
}

void main() {
    var a = new Money(1500, "egp");
    var b = new Money(1500, "EGP");
    IO.println(a);
    IO.println(a.cents() + " " + a.currency());
    IO.println(a.equals(b) + " " + (a == b));
    IO.println(a.plus(b));
    var set = new HashSet<Money>(List.of(a, b));
    IO.println(set.size());
}`,
          try: R`جرّب [[a.cents = 5;]] وشوف الخطأ. وبعدين ضيف method [[withCurrency(String c)]] بترجع Money جديد بنفس المبلغ وعملة تانية (زي [[{ ...money, currency }]] في JS)، وخلي [[plus]] ترمي exception لو العملتين مختلفين.`,
          flag: "script",
          deep: {
            why: R`قبل records (Java 16)، class بسيط فيه حقلين كان محتاج ٥٠ سطر: constructor و getters و equals و hashCode و toString، أو Lombok. ودي بالظبط الحاجات اللي الناس بتنساها أو تغلط فيها (equals من غير hashCode). record بيعملهم صح ومش ممكن يتنسوا.`,
            how: R`الـ record class final (محدش يورث منه) وحقوله final. الـ [[equals]] بيقارن كل الحقول بـ equals، و [[hashCode]] محسوب منهم، فتقدر تحطه في [[HashSet]] أو كمفتاح [[HashMap]] وهو شغال صح. عشان كده الـ set في المثال فيها عنصر واحد.

الـ compact constructor ([[Money {]] من غير باراميترات) بيتنفذ قبل ما الحقول تتحط، فتقدر تفحص وتعدّل الباراميترات ([[currency = ...]] بيعدّل الباراميتر، وبعدين Java بتحطه في الحقل).

records تقدر تعمل implements لـ interfaces، ويبقى فيها static methods وحقول static، بس مفيش حقول instance زيادة غير اللي في الـ header.

ومهم تعرف: الـ immutability سطحية. لو حقل نوعه [[List]]، الـ list نفسها ممكن تتعدّل، فاعمل [[items = List.copyOf(items);]] في الـ compact constructor.`,
            when: R`DTOs (request و response في الـ API)، و value objects ([[Money]] و [[Email]])، ومفاتيح مركّبة في Map، ونتايج methods بترجع أكتر من قيمة. ومش مناسبة لـ JPA entities، لأن Hibernate محتاج class عادي بيتعدّل وفيه constructor فاضي (درس الـ entities).`,
            mistakes: R`تستخدم record كـ entity. وتفتكر إن [[a.cents]] من برّه شغالة زي TS: لازم [[a.cents()]]. وتحط [[List]] في record وتفتكر إنه immutable بالكامل. وتكتب [[getCents()]] بإيدك «عشان Jackson»: Jackson بيفهم الـ records من غير getters.`
          },
          lines: [
            R`الـ header: الحقول والـ constructor والـ accessors في سطر.`,
            R`compact constructor: من غير [[( )]]، وبيتنفذ قبل ما الحقول تتحط.`,
            "فحص: مفيش Money بقيمة سالبة.",
            R`تعديل الباراميتر قبل ما يتحفظ: العملة دايمًا حروف كبيرة.`,
            "قفلة.",
            R`method عادية. جوه الـ record تقدر تقرا [[other.cents]] مباشرة.`,
            "قفلة الـ record.",
            "main.",
            R`عملة بحروف صغيرة، والـ constructor هيكبّرها.`,
            "نفس القيم بالظبط.",
            R`[[toString]] جاهز: [[Money[cents=1500, currency=EGP]]].`,
            R`الـ accessors بأقواس: [[1500 EGP]].`,
            R`[[true false]]: متساويين بالقيمة، بس اتنين objects.`,
            R`[[Money[cents=3000, currency=EGP]]].`,
            R`set فيها الاتنين.`,
            R`[[1]]: الـ hashCode و equals متساويين، فاتحسبوا عنصر واحد.`,
            "قفلة."
          ],
          sol: R`[[a.cents = 5;]] بيطلّع [[cannot assign a value to final variable cents]]: الحقول final.

الحل تحت. [[withCurrency]] بترجع object جديد والأصلي زي ما هو (نفس فكرة الـ spread في JS مع الـ state في React). و [[plus]] بين EGP و USD بترمي [[IllegalArgumentException: currency mismatch: EGP vs USD]]. لاحظ إن [[!currency.equals(...)]] مش [[!=]]، لأنها Strings.`,
          solCode: R`record Money(long cents, String currency) {
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
    Money plus(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("currency mismatch: " + currency + " vs " + other.currency);
        return new Money(cents + other.cents, currency);
    }
    Money withCurrency(String c) { return new Money(cents, c); }
}

void main() {
    var egp = new Money(1500, "egp");
    var usd = egp.withCurrency("usd");
    IO.println(egp + " " + usd);
    IO.println(egp.plus(usd));
}`
        },
        {
          cmd: "enum",
          title: "قايمة قيم ثابتة، وكل قيمة ليها بيانات وسلوك",
          desc: R`الـ [[enum]] في Java أقوى بكتير من TS: كل قيمة object حقيقي، وممكن يبقى ليها حقول و constructor و methods. [[Status.DONE]] مش رقم ولا string، ده object واحد بس في البرنامج كله، فمقارنته بـ [[==]] سليمة.

وعندك [[values()]] لكل القيم، و [[valueOf("DONE")]] من string لـ enum (بيقع لو الاسم غلط)، و [[name()]] للاسم، و [[ordinal()]] للترتيب. وفي JPA بتتخزن كـ string بـ [[@Enumerated(EnumType.STRING)]].`,
          example: R`enum Status {
    TODO("Not started"), IN_PROGRESS("In progress"), DONE("Done");

    private final String label;
    Status(String label) { this.label = label; }
    String label() { return label; }
    boolean isOpen() { return this != DONE; }
}

void main() {
    Status s = Status.valueOf("IN_PROGRESS");
    IO.println(s + " " + s.label() + " " + s.ordinal());
    IO.println(s.isOpen());
    for (Status each : Status.values()) IO.print(each.name() + " ");
    IO.println();
    IO.println(Status.valueOf("done"));
}`,
          try: R`اكتب static method اسمها [[parse(String raw)]] جوه الـ enum بترجع [[Optional<Status>]]: بتقبل [["done"]] و [[" Done "]]، وبترجع [[Optional.empty()]] لأي حاجة غلط بدل ما تقع. (لو Optional لسه جديدة عليك، ارجعلها بعد درس Optional.)`,
          flag: "script",
          deep: {
            why: R`حالات الطلب، والأدوار، وأنواع الدفع: كلها قيم محددة. بـ enum الـ compiler بيمنع أي قيمة برّه القايمة، و [[switch]] بيتأكد إنك غطيت كل الحالات (الدرس الجاي)، والسلوك الخاص بكل قيمة بيبقى جوه الـ enum نفسه بدل if متفرقة في الكود.`,
            how: R`الـ enum class خاص: الـ constructor private دايمًا، والـ JVM بيعمل object واحد لكل قيمة وقت تحميل الـ class. عشان كده [[==]] مضمونة، و enum بقيمة واحدة أحسن طريقة لعمل Singleton في Java.

[[valueOf]] بيطابق الاسم بالظبط (حروف كبيرة وصغيرة)، ولو مش لاقي بيرمي [[IllegalArgumentException]]. وفي Spring، لو request بعت [["status": "done"]] والـ enum فيه [[DONE]]، Jackson هيرجع 400 (والرسالة ممكن تكشف القيم المسموحة).

[[ordinal()]] رقم الترتيب في التعريف. متخزنوش في الداتابيز: لو ضفت قيمة في النص كل الأرقام بتتزحزح. عشان كده في JPA [[@Enumerated(EnumType.STRING)]] دايمًا.

وفيه [[EnumMap]] و [[EnumSet]]: map و set مخصوصين للـ enums وأسرع بكتير.`,
            when: R`أي مجموعة قيم ثابتة معروفة وقت الكتابة. لو القيم بتتغير من الـ admin (تصنيفات منتجات مثلًا) دي جدول في الداتابيز مش enum.`,
            mistakes: R`تخزن الـ ordinal في الداتابيز (الافتراضي في JPA لو نسيت [[@Enumerated(EnumType.STRING)]]!). و [[valueOf]] على input من المستخدم من غير ما تمسك الـ exception. وتغيّر اسم قيمة enum والقيم القديمة متخزنة في الداتابيز بالاسم القديم: محتاج migration.`
          },
          lines: [
            "enum بتلات قيم.",
            R`كل قيمة بتنادي الـ constructor بالـ label بتاعها، وبعدها [[;]] لأن فيه كود بعدها.`,
            "حقل لكل قيمة.",
            "constructor (private لوحده).",
            "getter.",
            R`سلوك جوه الـ enum، و [[!=]] سليمة لأن كل قيمة object واحد.`,
            "قفلة.",
            "main.",
            R`من string لـ enum بالاسم بالظبط.`,
            R`[[IN_PROGRESS In progress 1]]: toString هو الاسم، والترتيب من صفر.`,
            R`[[true]].`,
            R`[[values()]] بترجع array بكل القيم بالترتيب.`,
            "سطر جديد.",
            R`[["done"]] بحروف صغيرة: [[IllegalArgumentException: No enum constant ...Status.done]].`,
            "قفلة."
          ],
          sol: R`الحل تحت: بيطبع [[Optional[DONE]]] و [[Optional[DONE]]] و [[Optional.empty]].

[[strip()]] بيشيل المسافات و [[toUpperCase()]] بيحوّل للحروف الكبيرة، وبعدين بندوّر في [[values()]] بـ stream بدل [[valueOf]]، فمفيش exception نمسكها. ولو كتبت [[Optional.of(valueOf(...))]] جوه try/catch ده شغال برضه، بس الـ exceptions للحالات الاستثنائية مش لـ input غلط متوقع. وافحص null قبل [[strip]] لو ممكن يجيلك null.`,
          solCode: R`enum Status {
    TODO, IN_PROGRESS, DONE;

    static Optional<Status> parse(String raw) {
        if (raw == null) return Optional.empty();
        String key = raw.strip().toUpperCase();
        return Arrays.stream(values()).filter(s -> s.name().equals(key)).findFirst();
    }
}

void main() {
    IO.println(Status.parse("done"));
    IO.println(Status.parse(" Done "));
    IO.println(Status.parse("finished"));
}`
        },
        {
          cmd: "switch expressions",
          title: "switch بيرجع قيمة، والـ compiler بيتأكد إنك مغطي كل الحالات",
          desc: R`الـ switch الحديث في Java expression: بيرجع قيمة، وبيستخدم [[->]] فمفيش [[break]] ولا fall-through بالغلط. وممكن كذا قيمة في [[case]] واحد ([[case 1, 2, 3 ->]])، ولو محتاج كذا سطر تحط block وترجع بـ [[yield]].

وأهم ميزة: لما الـ switch على enum ومن غير [[default]]، الـ compiler بيتأكد إنك غطيت كل القيم. لو حد ضاف قيمة جديدة للـ enum، كل switch ناقص بيبقى خطأ compile. ده زي الـ exhaustive check بـ [[never]] في TS.`,
          example: R`enum Status { TODO, IN_PROGRESS, DONE }

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS -> 2;
        case DONE -> 0;
    };
}

String size(int n) {
    return switch (n) {
        case 0 -> "empty";
        case 1, 2, 3 -> "small";
        default -> {
            String label = n > 100 ? "huge" : "big";
            yield label;
        }
    };
}

void main() {
    IO.println(priority(Status.IN_PROGRESS));
    IO.println(size(2) + " " + size(50) + " " + size(500));
}`,
          try: R`ضيف [[BLOCKED]] للـ enum وشغّل: فين الخطأ؟ وبعدين اكتب نفس [[priority]] بالـ switch القديم ([[case TODO: return 1;]]) مع [[default: return 0;]] وضيف BLOCKED: الـ compiler قال حاجة؟`,
          flag: "script",
          deep: {
            why: R`الـ switch القديم (زي JS) كان بيقع في fall-through لو نسيت [[break]]، ومكنش بيرجع قيمة فكنت تعمل متغير وتعيّنه في كل case. والأخطر: لما حد يضيف حالة جديدة، مفيش حاجة بتقولك فين الأماكن اللي محتاجة تتحدّث.`,
            how: R`[[case X ->]] بينفذ اللي بعده بس ومش بيكمّل للـ case اللي تحته. ولو الـ switch expression (بيرجع قيمة)، لازم يغطي كل الاحتمالات: مع enum أو sealed interface (الدرس الجاي) الـ compiler بيعرف القايمة كاملة فمش محتاج [[default]]. مع [[int]] أو [[String]] لازم [[default]].

والـ switch بقى بيشتغل على [[String]] وعلى enums وعلى الأنواع (pattern matching). ولو القيمة null من غير [[case null]]، بيرمي NullPointerException.

والحيلة المهمة: متحطش [[default]] في switch على enum لو عايز الحماية. الـ default بيخلي الـ compiler مطمن إن كله متغطي، فالقيمة الجديدة بتروح للـ default بهدوء.`,
            when: R`بدل سلسلة [[if / else if]] على نفس القيمة، وخصوصًا على enums و sealed types. في Spring: تحويل حالة لـ HTTP status، أو اختيار استراتيجية حسب نوع الدفع.`,
            mistakes: R`[[default]] على enum فتخسر الـ exhaustiveness. وتخلط [[case X:]] (القديم، بيعمل fall-through) و [[case X ->]] في نفس الـ switch: ممنوع أصلًا. وتنسى [[yield]] في الـ block فيطلع خطأ.`
          },
          lines: [
            "enum صغير.",
            "method بترجع int.",
            R`[[return switch]]: الـ switch نفسه قيمة.`,
            R`[[->]] ومفيش break.`,
            "حالة.",
            "حالة.",
            R`قفلة الـ switch بـ [[;]] لأنه expression. مفيش default، والـ compiler متأكد إن التلاتة متغطيين.`,
            "قفلة.",
            "switch على int.",
            "نفس الشكل.",
            "قيمة واحدة.",
            R`كذا قيمة مفصولين بـ [[,]].`,
            R`[[default]] لازمة مع int، وهنا block بكذا سطر.`,
            "حساب عادي.",
            R`[[yield]] بترجع القيمة من الـ block (مش [[return]]، لأن return هتطلع من الـ method كلها).`,
            "قفلة الـ block.",
            "قفلة الـ switch.",
            "قفلة.",
            "main.",
            R`[[2]].`,
            R`[[small big huge]].`,
            "قفلة."
          ],
          sol: R`بعد إضافة [[BLOCKED]]: خطأ compile على [[return switch (s)]]: [[the switch expression does not cover all possible input values]]. الـ compiler بيوريك بالظبط كل مكان محتاج يتحدّث.

مع الـ switch القديم و [[default: return 0;]]: مفيش أي خطأ ولا تحذير، و BLOCKED بترجع 0 بهدوء. لو ده منطق أولويات في تطبيق حقيقي، المهام الـ blocked هتتعامل كأنها خلصت ومحدش هياخد باله. وده سبب إن الـ switch expression من غير default على enum أأمن.`,
          solCode: R`enum Status { TODO, IN_PROGRESS, DONE, BLOCKED }

int priorityOld(Status s) {
    switch (s) {
        case TODO: return 1;
        case IN_PROGRESS: return 2;
        default: return 0;
    }
}

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS, BLOCKED -> 2;
        case DONE -> 0;
    };
}

void main() {
    IO.println(priorityOld(Status.BLOCKED) + " " + priority(Status.BLOCKED));
}`
        },
        {
          cmd: "sealed و pattern matching",
          title: "أنواع محدودة ومعروفة، و switch بيفك كل نوع ويقرا حقوله",
          desc: R`[[sealed interface Payment permits Card, Wallet, Cash]] معناها إن الأنواع اللي بتنفذ Payment هي التلاتة دول بس، ومحدش تاني يقدر. ومع records، ده بالظبط الـ discriminated union في TS: [[type Payment = Card | Wallet | Cash]].

والـ pattern matching بيخليك تفحص النوع وتفك الحقول في خطوة: [[if (o instanceof String s)]] بيفحص ويعمل متغير [[s]] من النوع الصح (من غير cast). وفي الـ switch: [[case Card(var last4, var amount) ->]] بيفحص إنه Card ويطلّع حقوله، و [[when]] بيضيف شرط. ولأن النوع sealed، الـ compiler بيتأكد إنك غطيت كل الأنواع.`,
          example: R`sealed interface Payment permits Card, Wallet, Cash {}
record Card(String last4, long amount) implements Payment {}
record Wallet(String phone, long amount) implements Payment {}
record Cash(long amount) implements Payment {}

String describe(Payment p) {
    return switch (p) {
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
        case Card c -> "card ****" + c.last4();
        case Wallet(var phone, var amount) -> "wallet " + phone + " " + amount;
        case Cash cash -> "cash " + cash.amount();
    };
}

void main() {
    Object o = "hello";
    if (o instanceof String s && s.length() > 3) IO.println(s.toUpperCase());
    List<Payment> all = List.of(new Card("4242", 50_000), new Card("1111", 200), new Wallet("0100", 90), new Cash(10));
    all.forEach(p -> IO.println(describe(p)));
}`,
          try: R`ضيف [[record Installment(int months, long amount) implements Payment {}]] وضيفه لـ [[permits]]، وشغّل: فين الخطأ؟ غطّيه في الـ switch. وبعدين بدّل ترتيب أول سطرين [[case]] (خلي [[case Card c]] الأول) واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`نتيجة عملية (نجحت أو فشلت بسبب كذا)، وأنواع دفع، وأحداث في نظام: كلها «واحد من كذا شكل، وكل شكل بيانات مختلفة». زمان في Java كان الحل وراثة و [[instanceof]] و casts أو visitor pattern معقد. دلوقتي sealed و records و switch بيعملوا ده بأمان وبكود قصير، زي TS.`,
            how: R`[[sealed]] بيحدد مين مسموحله ينفذ. الأنواع المسموحة لازم تبقى [[final]] (والـ records final لوحدها) أو [[sealed]] أو [[non-sealed]]. وبما إن القايمة مقفولة، الـ switch يقدر يتأكد من التغطية.

الـ record pattern [[Card(var last4, var amount)]] بينادي الـ accessors ويحط القيم في متغيرات. و [[when]] guard: الـ case ده يتطابق بس لو الشرط صح، وإلا يكمّل للي بعده.

الترتيب مهم: الـ switch بيجرب الـ cases من فوق لتحت. لو [[case Card c]] (أي Card) جه قبل [[case Card(...) when ...]]، التاني عمره ما هيتطابق، والـ compiler بيعتبره خطأ (dominated).

والـ pattern في [[instanceof]] (من Java 16): [[o instanceof String s && s.length() > 3]] الـ [[s]] متاح بعد [[&&]] لأنه مضمون إنه String هناك، زي الـ narrowing في TS بالظبط.`,
            when: R`نتايج العمليات في الـ domain، والأحداث، والأوامر، وأي حاجة كنت هتعملها discriminated union في TS. وفي Spring ممكن الـ service يرجع [[sealed interface Result]] والـ controller يعمل switch يحوّله لـ status code.`,
            mistakes: R`[[default]] في switch على sealed type فتخسر الحماية. وترتيب cases غلط. ونسيان إن الأنواع المسموحة لازم تبقى في نفس الـ package أو الـ module. وتستخدم [[instanceof]] وبعدين cast يدوي [[(String) o]]: الـ pattern أنضف.`
          },
          lines: [
            R`[[sealed]]: التلاتة دول بس هما Payment.`,
            "record لكل نوع، وكل واحد بياناته مختلفة.",
            "المحفظة: رقم تليفون.",
            "الكاش: مبلغ بس.",
            "method بتاخد أي Payment.",
            "switch على النوع.",
            R`record pattern بيفك الحقول، و [[when]] شرط زيادة: الكروت الكبيرة الأول.`,
            R`type pattern: أي Card تاني، والمتغير [[c]] نوعه Card.`,
            "فك حقول المحفظة.",
            "الكاش.",
            R`مفيش default: الـ compiler متأكد إن التلاتة متغطيين.`,
            "قفلة.",
            "main.",
            R`متغير نوعه Object.`,
            R`[[instanceof String s]] بيفحص ويعمل [[s]] من النوع String: [[HELLO]].`,
            "أربع عمليات دفع.",
            R`[[big card payment ****4242]] و [[card ****1111]] و [[wallet 0100 90]] و [[cash 10]].`,
            "قفلة."
          ],
          sol: R`بعد إضافة [[Installment]] للـ permits: [[the switch expression does not cover all possible input values]] على الـ switch، زي enum بالظبط. الحل: [[case Installment(var months, var amount) -> months + " months of " + amount / months;]].

ولما تحط [[case Card c]] قبل [[case Card(...) when ...]]: [[error: this case label is dominated by a preceding case label]]. أي Card هيتطابق مع الأول، فالتاني مستحيل يتوصله، والـ compiler بيعتبر ده غلط بدل ما يسيبه يعدّي. القاعدة: الـ cases المحددة (بشروط) قبل العامة.`
        }
      ]
    },
    {
      t: "Generics والـ Collections",
      l: 1,
      n: "List و Map و Set، والـ generics بقيودها، والترتيب بـ Comparator",
      items: [
        {
          cmd: "List و Map و Set",
          title: "الـ arrays والـ objects بتوع JS: إيه اللي يقابلهم في Java؟",
          desc: R`[[List]] زي الـ array في JS (بترتيب، وبتكبر)، والتنفيذ المعتاد [[ArrayList]]. و [[Map]] زي [[Map]] في JS (مفتاح وقيمة)، والتنفيذ المعتاد [[HashMap]]، و [[TreeMap]] لو عايز المفاتيح مرتبة. و [[Set]] زي [[Set]] في JS، و [[HashSet]] أشهرها.

المتغير نوعه الـ interface ([[List<String>]])، والقيمة التنفيذ ([[new ArrayList<>()]]). و [[List.of(...)]] و [[Map.of(...)]] بيعملوا collections ثابتة متتعدلش: أي [[add]] عليها بيرمي exception وقت التشغيل.`,
          example: R`void main() {
    List<String> tags = new ArrayList<>(List.of("java", "spring"));
    tags.add("jpa");
    Map<String, Integer> stock = new HashMap<>();
    stock.put("pen", 10);
    stock.merge("pen", 5, Integer::sum);
    stock.putIfAbsent("book", 1);
    Set<String> seen = new HashSet<>(List.of("a", "b", "a"));
    IO.println(tags + " " + tags.get(0) + " " + tags.size());
    IO.println(stock.get("pen") + " " + stock.getOrDefault("cup", 0));
    IO.println(seen.size() + " " + seen.contains("a"));
    for (var e : new TreeMap<>(stock).entrySet()) IO.println(e.getKey() + "=" + e.getValue());
    List<String> fixed = List.of("x", "y");
    fixed.add("z");
}`,
          try: R`اكتب method [[wordCount(String text)]] بترجع [[Map<String, Integer>]] بعدد كل كلمة (من غير حالة الحروف). جرّبها على [["the cat and The dog and THE end"]]. ولو اتنين كلمات عددهم زي بعض، ترتيبهم في الناتج مضمون؟`,
          flag: "script",
          deep: {
            why: R`كل كود backend فيه ليستات ومابات: نتايج queries، وتجميع، وعدّ، وإزالة تكرار. واختيار النوع الصح (List ولا Set، و HashMap ولا TreeMap) بيفرق في السرعة والصحة، وبيتسأل في الانترفيو.`,
            how: R`[[ArrayList]] array جوه بيكبر لوحده: [[get(i)]] سريع O(1)، والإضافة في الآخر O(1) في المتوسط، والإضافة أو المسح من النص O(n). وفيه [[LinkedList]] بس نادرًا ما بتكون أحسن.

[[HashMap]] بيحسب [[hashCode]] للمفتاح ويحطه في bucket: [[get]] و [[put]] O(1) في المتوسط، ومفيش ترتيب مضمون (درس HashMap من جوه في الانترفيو). [[LinkedHashMap]] بيحافظ على ترتيب الإضافة (زي Map في JS)، و [[TreeMap]] بيرتب بالمفتاح O(log n).

methods مفيدة: [[getOrDefault]]، و [[putIfAbsent]]، و [[merge(key, 1, Integer::sum)]] (أنضف طريقة للعدّ)، و [[computeIfAbsent(key, k -> new ArrayList<>())]] لتجميع قيم تحت مفتاح.

[[List.of]] و [[Map.of]] (Java 9+) immutable وكمان مبيقبلوش null. و [[Arrays.asList]] القديمة حجمها ثابت بس [[set]] شغالة: متلخبطش بينهم.`,
            when: R`List لأي ليستة مرتبة. Set لما التكرار ممنوع أو محتاج [[contains]] سريع. Map للبحث بمفتاح والتجميع. [[List.of]] للثوابت ولما ترجع list من method ومش عايز حد يعدّل.`,
            mistakes: R`[[List.of(...)]] وبعدين [[add]]: [[UnsupportedOperationException]] وقت التشغيل مش compile. وتعتمد على ترتيب [[HashMap]] في تست فيعدّي عندك ويقع في CI. وتعدّل list وانت بتلف عليها بـ for-each: [[ConcurrentModificationException]] (استخدم [[removeIf]]). و [[map.get(k)]] بيرجع null لو مش موجود، فـ [[int n = map.get(k);]] ممكن يعمل NullPointerException.`
          },
          lines: [
            "main.",
            R`list تتعدّل، بادئة بقيمتين. النوع الـ interface والقيمة ArrayList.`,
            R`[[add]] زي [[push]].`,
            R`map من String لـ Integer (مش int: الـ generics محتاجة objects).`,
            R`[[put]] زي [[set]] في JS.`,
            R`[[merge]]: لو المفتاح موجود اجمع ٥ على القديم. [[15]].`,
            "حط قيمة لو المفتاح مش موجود بس.",
            R`set من list فيها تكرار: [[a]] و [[b]] بس.`,
            R`[[[java, spring, jpa] java 3]]: الـ toString بتاع الـ collections مقروء.`,
            R`[[15 0]]: [[getOrDefault]] بدل null.`,
            R`[[2 true]].`,
            R`[[TreeMap]] بيرتب المفاتيح، و [[entrySet]] زي [[Object.entries]]: [[book=1]] وبعدين [[pen=15]].`,
            R`list ثابتة.`,
            R`[[UnsupportedOperationException]] وقت التشغيل.`,
            "قفلة."
          ],
          sol: R`الحل تحت: بيطبع [[{and=2, cat=1, dog=1, end=1, the=3}]] مرتب لأننا استخدمنا [[TreeMap]].

لو استخدمت [[HashMap]] الترتيب مش مضمون: ممكن يطلع بأي شكل، وممكن يتغير بين إصدارات Java أو لو الحجم اتغير. لو محتاج ترتيب الإضافة استخدم [[LinkedHashMap]]، ولو مرتب أبجديًا [[TreeMap]]، ولو مرتب بالعدد لازم تعمل sort للـ entries (درس Comparator). و [[split("\\s+")]] بيقسم على أي مسافات حتى لو أكتر من واحدة.`,
          solCode: R`static Map<String, Integer> wordCount(String text) {
    Map<String, Integer> counts = new TreeMap<>();
    for (String w : text.toLowerCase().split("\\s+")) {
        counts.merge(w, 1, Integer::sum);
    }
    return counts;
}

void main() {
    IO.println(wordCount("the cat and The dog and THE end"));
}`
        },
        {
          cmd: "generics",
          title: "class و method بيشتغلوا مع أي نوع، ومن غير ما تخسر الفحص",
          desc: R`نفس فكرة الـ generics في TS: [[record Page<T>(List<T> items, ...)]] صفحة من أي حاجة، و [[<T extends Comparable<T>> T max(List<T> list)]] method بتشتغل مع أي نوع ينفع يتقارن (زي [[T extends ...]] في TS).

والجديد عليك: الـ wildcards. [[List<? extends Number>]] يعني «list من أي نوع أرقام» (Integer أو Double...)، لأن في Java [[List<Integer>]] مش [[List<Number>]] حتى لو Integer هو Number. والأنواع دي بتتمسح وقت التشغيل (type erasure)، زي TS بس للـ generics بس.`,
          example: R`record Page<T>(List<T> items, int page, long total) {
    <R> Page<R> map(java.util.function.Function<T, R> fn) {
        return new Page<>(items.stream().map(fn).toList(), page, total);
    }
}

static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) > 0) best = x;
    return best;
}

static double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

void main() {
    Page<Integer> ids = new Page<>(List.of(1, 2, 3), 1, 3);
    Page<String> labels = ids.map(id -> "task-" + id);
    IO.println(labels);
    IO.println(max(List.of(3, 9, 4)) + " " + max(List.of("b", "z", "a")));
    IO.println(sum(List.of(1, 2.5, 3L)));
    List<String> a = new ArrayList<>();
    List<Integer> b = new ArrayList<>();
    IO.println(a.getClass() == b.getClass());
}`,
          try: R`جرّب [[max(List.of(new Object()))]] واقرا الخطأ. وبعدين غيّر [[sum(List<? extends Number> nums)]] لـ [[sum(List<Number> nums)]] وجرّب تبعتلها [[List<Integer>]] متعرّفة في متغير: [[List<Integer> ints = List.of(1, 2); sum(ints);]].`,
          flag: "script",
          deep: {
            why: R`كل الـ collections و Spring Data ([[JpaRepository<Task, Long>]]) و [[ResponseEntity<T>]] و [[Optional<T>]] generics. لازم تقرا signatures زي [[<S extends T> S save(S entity)]] من غير ما تتخض، وتكتب helpers بسيطة زي [[Page<T>]] و [[ApiResponse<T>]].`,
            how: R`الـ generics بتتفحص وقت الـ compile، وبعدين بتتمسح: [[List<String>]] و [[List<Integer>]] وقت التشغيل الاتنين [[ArrayList]] بس (عشان كده آخر سطر [[true]]). النتايج: مينفعش [[new T()]]، ولا [[instanceof List<String>]]، ولا [[List<int>]] (primitives مش مسموحة، لازم wrapper).

الـ invariance: [[List<Integer>]] مش subtype من [[List<Number>]]. لو كانت، كنت هتقدر تعمل [[numbers.add(2.5)]] على list أصلها Integer. عشان كده الـ wildcards:
[[? extends Number]]: تقرا منها كـ Number، بس متقدرش تضيف (producer).
[[? super Integer]]: تضيف فيها Integer، بس لما تقرا بتاخد Object (consumer).
القاعدة اللي بتتحفظ: PECS، Producer Extends Consumer Super.

و [[<>]] (diamond) بيخلي الـ compiler يستنتج النوع من الشمال: [[new ArrayList<>()]].`,
            when: R`استخدمها في كل الـ collections. واكتبها لما عندك كود بيتكرر لكذا نوع (wrapper لـ response، أو result، أو صفحة). ومتعقدهاش: لو الـ signature محتاج ٣ wildcards عشان تفهمه، غالبًا في طريقة أبسط.`,
            mistakes: R`raw types: [[List list = new ArrayList();]] من غير [[<>]]: الـ compiler بيطلّع warning بس، والفحص كله راح، وده في كود قديم كتير. وتفتكر إن [[List<Object>]] بتاخد أي list: لأ، [[List<?>]] هي اللي بتاخد. و [[max(List<T>)]] مع list فاضية: [[IndexOutOfBoundsException]].`
          },
          lines: [
            R`record generic: [[T]] نوع العناصر.`,
            R`method generic جواه: [[<R>]] نوع جديد، و [[Function<T, R>]] دالة من T لـ R.`,
            R`[[stream().map(fn).toList()]] (درس streams)، والـ diamond [[<>]] استنتج [[Page<R>]].`,
            "قفلة.",
            "قفلة الـ record.",
            R`[[T extends Comparable<T>]]: أي نوع يعرف يقارن نفسه (String و Integer و LocalDate...).`,
            "أول عنصر.",
            R`[[compareTo]] بترجع موجب لو الأول أكبر.`,
            "النتيجة من نفس النوع T.",
            "قفلة.",
            R`wildcard: list من Integer أو Double أو Long، أي نوع تحت Number.`,
            "المجموع.",
            R`كل عنصر Number فيه [[doubleValue()]].`,
            "رجوع.",
            "قفلة.",
            "main.",
            "صفحة أرقام.",
            R`[[map]] حوّلتها لصفحة strings، والنوع اتفحص.`,
            R`[[Page[items=[task-1, task-2, task-3], page=1, total=3]]].`,
            R`نفس الـ method مع أرقام ومع strings: [[9 z]].`,
            R`Integer و Double و Long في list واحدة: [[6.5]].`,
            "list strings.",
            "list أرقام.",
            R`[[true]]: وقت التشغيل الاتنين ArrayList، والـ generic اتمسح.`,
            "قفلة."
          ],
          sol: R`[[max(List.of(new Object()))]]: خطأ compile [[method max ... cannot be applied to given types]] وتحته [[reason: inference variable E has incompatible bounds]] و [[upper bounds: Comparable<T>,Object]]. بالبلدي: T لازم يبقى Comparable، و Object مش Comparable. الـ constraint اشتغل: Object مبيعرفش يقارن نفسه.

ومع [[sum(List<Number> nums)]] و [[sum(ints)]]: [[method sum ... cannot be applied to given types]] وتحته [[reason: argument mismatch; List<Integer> cannot be converted to List<Number>]]. ده الـ invariance. لو كتبت [[sum(List.of(1, 2))]] مباشرة هيعدّي، لأن الـ compiler هيستنتج [[List<Number>]] للـ literal نفسه. رجّع [[? extends Number]] والاتنين يشتغلوا.`
        },
        {
          cmd: "Comparator",
          title: "ترتّب objects بأكتر من حقل، وتمسح من list وانت بتلف عليها",
          desc: R`[[Comparator.comparing(User::age)]] بيرتب بحقل، و [[.thenComparing(...)]] بحقل تاني لو الأول متساوي، و [[.reversed()]] أو [[Comparator.reverseOrder()]] للعكس. أنضف بكتير من [[(a, b) => a.age - b.age]] اللي بتكتبها في JS.

و [[list.sort(...)]] بيرتب في مكانه، و [[stream().sorted(...)]] بيرجع نسخة. وعشان تمسح عناصر بشرط: [[removeIf]]. أما [[remove]] جوه for-each فبيوقع البرنامج.`,
          example: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("Sara", 27, "Cairo"),
        new User("Omar", 22, "Alex"),
        new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparingInt(User::age));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparing(User::city).thenComparing(User::age, Comparator.reverseOrder()));
    IO.println(users.stream().map(User::name).toList());
    var adults = new ArrayList<>(users);
    adults.removeIf(u -> u.age() < 25);
    IO.println(adults.size());
    for (User u : users) if (u.age() > 25) users.remove(u);
}`,
          try: R`رتّب الـ users بالاسم من غير حالة الحروف ([[String.CASE_INSENSITIVE_ORDER]])، وبعدين بالسن تنازلي ولو متساويين بالاسم. وضيف user اسمه [[null]] وشوف إيه اللي بيحصل، وصلّحه بـ [[Comparator.nullsLast]].`,
          flag: "script",
          deep: {
            why: R`الترتيب في كل حتة: جداول، وليدربورد، وتقارير. والطرح [[a - b]] اللي متعود عليه من JS ممكن يعمل overflow مع أرقام كبيرة في Java. والمسح أثناء اللف من أشهر أخطاء المبتدئين.`,
            how: R`[[Comparator<T>]] functional interface فيه [[compare(a, b)]] بيرجع سالب أو صفر أو موجب. [[comparing(keyExtractor)]] بيبني واحد من دالة بتطلّع المفتاح، و [[comparingInt]] نفس الحكاية من غير boxing. و [[thenComparing]] بيتنادى بس لو الأول قال متساويين.

[[List.sort]] و [[Collections.sort]] stable: العناصر المتساوية بتحافظ على ترتيبها القديم. عشان كده في أول ترتيب، Sara فضلت قبل Mona (الاتنين ٢٧).

[[ConcurrentModificationException]]: الـ iterator بتاع ArrayList بيحفظ عدد التعديلات (modCount)، ولو الـ list اتغيرت من برّه الـ iterator بيرمي exception في الخطوة الجاية. الحلول: [[removeIf]]، أو [[Iterator.remove()]]، أو تبني list جديدة بـ stream و filter.`,
            when: R`[[Comparator.comparing]] في أي ترتيب. وفي JPA الأحسن الداتابيز ترتب ([[ORDER BY]] أو [[Sort.by("createdAt")]] في Spring Data) بدل ما تجيب كله وترتب في Java.`,
            mistakes: R`[[(a, b) -> a.getBalance() - b.getBalance()]] مع [[long]] كبيرة: overflow وترتيب غلط؛ استخدم [[Long.compare]] أو [[comparingLong]]. وتنسى إن [[reversed()]] في نص سلسلة بيعكس كل اللي قبله مش آخر حقل بس. و [[remove]] جوه for-each.`
          },
          lines: [
            "record بتلات حقول.",
            "main.",
            R`list تتعدّل من [[List.of]].`,
            "سارة ٢٧ القاهرة.",
            "عمر ٢٢ اسكندرية.",
            "منى ٢٧ اسكندرية.",
            R`ترتيب بالسن. [[User::age]] method reference (درس lambdas).`,
            R`[[[Omar, Sara, Mona]]]: الترتيب stable فسارة فضلت قبل منى.`,
            "بالمدينة، وجوه نفس المدينة بالسن تنازلي.",
            R`[[[Mona, Omar, Sara]]]: اسكندرية الأول (منى ٢٧ ثم عمر ٢٢)، وبعدين القاهرة.`,
            "نسخة.",
            R`[[removeIf]]: المسح بشرط بأمان.`,
            R`[[2]].`,
            R`[[remove]] جوه for-each: [[ConcurrentModificationException]].`,
            "قفلة."
          ],
          sol: R`الحل تحت (كتبنا [[sara]] بحرف صغير عشان نختبر الـ case-insensitive): الناتج [[[Mona, Omar, sara]]] وبعدين [[[Mona, sara, Omar]]] (منى وسارة ٢٧ فمرتبين بالاسم، وبعدين عمر ٢٢)، وبعد ما ضفنا null: [[[Mona, Omar, sara, null]]]. لو استخدمت [[Comparator.comparing(User::name)]] العادي، [[sara]] كانت هتيجي بعد [[Omar]] و [[Mona]] برضه هنا بالصدفة، بس [["sara"]] و [["Sara"]] مش هيترتبوا جنب بعض مع أسماء تانية، لأن الحروف الكبيرة كلها قبل الصغيرة في الترتيب العادي.

لو ضفت user اسمه null ورتبت بالاسم: [[NullPointerException]] جوه الـ comparator. الحل: [[Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER))]]، فالـ null بيروح للآخر. ولاحظ إن [[comparingInt(User::age).reversed()]] جت الأول لوحدها، لأن [[reversed()]] بتعكس كل السلسلة اللي قبلها.`,
          solCode: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("sara", 27, "Cairo"), new User("Omar", 22, "Alex"), new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparingInt(User::age).reversed()
        .thenComparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.add(new User(null, 30, "Giza"));
    users.sort(Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)));
    IO.println(users.stream().map(User::name).toList());
}`
        }
      ]
    },
    {
      t: "Lambdas و Streams و Optional",
      l: 1,
      n: "الدوال كقيم، و map و filter و reduce بتوع Java، والتعامل مع القيمة اللي ممكن متكونش موجودة",
      items: [
        {
          cmd: "lambdas",
          title: "تبعت دالة لدالة: lambdas و method references",
          desc: R`الـ lambda في Java [[x -> x * 2]] (سهم بشرطة، مش [[=>]]). بس في Java مفيش نوع اسمه «دالة»: الـ lambda لازم تتحط مكان interface فيه method واحدة (functional interface)، وهي بتبقى تنفيذ الـ method دي.

فيه interfaces جاهزة في [[java.util.function]]: [[Function<T, R>]] (بياخد ويرجع)، و [[Predicate<T>]] (بيرجع boolean)، و [[Consumer<T>]] (بياخد ومبيرجعش)، و [[Supplier<T>]] (مبياخدش وبيرجع). و method reference [[String::length]] اختصار لـ [[s -> s.length()]].`,
          example: R`import java.util.function.*;

@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    Function<String, Integer> len = s -> s.length();
    Predicate<Integer> isEven = n -> n % 2 == 0;
    Supplier<List<String>> fresh = ArrayList::new;
    BiFunction<Long, Long, Long> add = Long::sum;
    PriceRule tenOff = c -> c * 90 / 100;
    PriceRule minus5 = c -> c - 500;
    IO.println(len.apply("spring") + " " + isEven.test(4) + " " + fresh.get() + " " + add.apply(2L, 3L));
    IO.println(minus5.apply(tenOff.apply(10_000)));
    int discount = 10;
    Function<Integer, Integer> apply = p -> p - discount;
    IO.println(apply.apply(100));
}`,
          try: R`ضيف [[discount = 20;]] بعد سطر الـ lambda الأخيرة واقرا الخطأ. وبعدين اعمل [[List<PriceRule>]] فيها الاتنين وطبّقهم على السعر بالترتيب في loop.`,
          flag: "script",
          deep: {
            why: R`Streams و Optional و Spring Security config ([[auth -> auth.anyRequest()...]]) و Comparators كلها lambdas. لازم تكون مرتاح تقرا [[http.authorizeHttpRequests(a -> a.requestMatchers(...))]] من غير ما تتلخبط.`,
            how: R`الـ compiler بيبص على المكان اللي فيه الـ lambda (target type): لو المطلوب [[Predicate<Integer>]]، يبقى الـ lambda تنفيذ لـ [[test(Integer)]] وبترجع boolean. نفس الـ lambda ممكن تبقى أنواع مختلفة حسب المكان. و [[@FunctionalInterface]] annotation اختيارية بتخلي الـ compiler يتأكد إن فيه method abstract واحدة بس.

أشكال الـ method reference: [[Integer::parseInt]] (static)، و [[String::length]] (method على الباراميتر)، و [[user::getName]] (على object معين)، و [[ArrayList::new]] (constructor).

الـ capture: الـ lambda تقدر تقرا متغيرات محلية من برّه بس لو final أو effectively final (محدش غيّرها). في JS الـ closure بيشوف أحدث قيمة، في Java القيمة بتتنسخ وقت عمل الـ lambda، فمنعوا التغيير عشان ميبقاش فيه لخبطة. الحقول (fields) مش عليها القيد ده.

والأنواع الـ primitive ليها نسخ خاصة من غير boxing: [[IntPredicate]] و [[ToLongFunction]] وغيرهم.`,
            when: R`callbacks وأي حاجة بتاخد سلوك: ترتيب، وفلترة، ومعالجة events. لو الـ lambda بقت أكتر من ٣ سطور، طلّعها method واستخدم method reference.`,
            mistakes: R`تعدّل متغير محلي من جوه lambda ([[count++]] جوه forEach): خطأ compile؛ استخدم stream بـ [[count()]] أو [[sum()]]. وتكتب interface جديد لكل lambda وفيه واحد جاهز في [[java.util.function]]. وتحط checked exception جوه lambda في stream: الـ interfaces الجاهزة مبتسمحش بيها (درس الأخطاء).`
          },
          lines: [
            R`الـ interfaces الجاهزة للدوال.`,
            R`annotation بتتأكد إن فيه method واحدة.`,
            "functional interface بتاعنا.",
            "main.",
            R`[[Function<String, Integer>]]: بياخد String ويرجع Integer. نداءها [[apply]].`,
            R`[[Predicate]]: بيرجع boolean. نداءها [[test]].`,
            R`[[Supplier]] مع constructor reference.`,
            R`[[Long::sum]] static method reference.`,
            R`lambda بقت PriceRule: خصم ١٠٪.`,
            "خصم ٥ جنيه (٥٠٠ قرش).",
            R`[[6 true [] 5]].`,
            R`تركيب القاعدتين: ١٠٠٠٠ → ٩٠٠٠ → [[8500]].`,
            "متغير محلي.",
            "الـ lambda بتقراه (effectively final).",
            R`[[90]].`,
            "قفلة."
          ],
          sol: R`[[discount = 20;]] بعد الـ lambda: [[local variables referenced from a lambda expression must be final or effectively final]]. المتغير بقى بيتغير، فالـ lambda مينفعش تمسكه.

وتطبيق القواعد بالترتيب زي الكود تحت: [[8500]]. لاحظ إن [[rules]] ليستة سلوكيات، وده Strategy pattern بكود قصير جدًا. لو عكست الترتيب (الـ ٥ الأول وبعدين ١٠٪) الناتج [[8550]]، فالترتيب جزء من المنطق.`,
          solCode: R`@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    List<PriceRule> rules = List.of(c -> c * 90 / 100, c -> c - 500);
    long price = 10_000;
    for (PriceRule r : rules) price = r.apply(price);
    IO.println(price);
}`
        },
        {
          cmd: "streams",
          title: "map و filter و reduce بتوع Java، والتجميع بـ groupingBy",
          desc: R`الـ Stream API هو [[map]] و [[filter]] و [[reduce]] اللي متعود عليهم في JS، بس بتبدأ بـ [[.stream()]] وبتنتهي بعملية نهائية: [[toList()]] أو [[count()]] أو [[sum()]] أو [[collect(...)]]. من غير العملية النهائية مفيش حاجة بتتنفذ أصلًا (lazy).

و [[Collectors.groupingBy]] بيعمل اللي بتعمله بـ [[reduce]] معقد في JS: يجمّع حسب مفتاح ويحسب مجموع أو عدد لكل مجموعة، زي [[GROUP BY]] في SQL.`,
          example: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(
        new Order("Sara", "Cairo", 500, true),
        new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false),
        new Order("Mona", "Alex", 800, true));
    long paidTotal = orders.stream().filter(Order::paid).mapToLong(Order::total).sum();
    List<String> bigCustomers = orders.stream()
        .filter(o -> o.total() >= 800)
        .map(Order::customer)
        .distinct()
        .sorted()
        .toList();
    Map<String, Long> byCity = orders.stream()
        .collect(Collectors.groupingBy(Order::city, TreeMap::new, Collectors.summingLong(Order::total)));
    IO.println(paidTotal);
    IO.println(bigCustomers);
    IO.println(byCity);
    IO.println(orders.stream().anyMatch(o -> !o.paid()));
}`,
          try: R`من نفس الـ orders طلّع: (١) عدد الطلبات لكل عميل [[Map<String, Long>]]، (٢) أكبر طلب (استخدم [[max]] مع Comparator، ولاحظ إنها بترجع Optional)، (٣) أسماء العملاء مفصولين بـ [[", "]] في string واحد.`,
          flag: "script",
          deep: {
            why: R`تحويل الـ entities لـ DTOs في كل controller: [[tasks.stream().map(TaskResponse::from).toList()]]. والتقارير والتجميع الصغير. والكود بيبقى قريب من الـ JS اللي انت متعود عليه.`,
            how: R`الـ stream pipeline: مصدر ([[list.stream()]])، وعمليات وسيطة lazy ([[filter]] و [[map]] و [[sorted]] و [[distinct]] و [[limit]])، وعملية نهائية واحدة بتشغّل كله. العناصر بتعدّي على السلسلة واحد واحد، مش كل خطوة بتعمل list جديدة زي JS. والـ stream بيتستخدم مرة واحدة بس.

[[mapToLong]] و [[mapToInt]] بيدوك stream أرقام primitive فيه [[sum()]] و [[average()]] من غير boxing.

[[toList()]] (Java 16) بترجع list ثابتة. [[collect(Collectors.toList())]] القديمة بترجع ArrayList تتعدّل. و [[Collectors]] فيها [[groupingBy]] و [[partitioningBy]] (قسمين بشرط) و [[joining(", ")]] و [[toMap]] و [[counting()]].

و [[parallelStream()]] موجودة بس نادرًا ما تفيد في backend (الـ requests أصلًا شغالة بالتوازي).`,
            when: R`تحويل وفلترة وتجميع على داتا في الذاكرة. أما لو الداتا في الداتابيز، فلتر وجمّع هناك ([[WHERE]] و [[GROUP BY]] أو query method)، ومتجيبش ١٠٠ ألف صف عشان تعمل filter في Java.`,
            mistakes: R`تستخدم الـ stream مرتين: [[IllegalStateException: stream has already been operated upon or closed]]. وتعدّل حاجة برّه من جوه [[map]] أو [[forEach]] (side effects). و [[Collectors.toMap]] مع مفاتيح متكررة: [[IllegalStateException: Duplicate key]] إلا لو اديته merge function. و stream طويل ومعقد بدل for loop واضح: مش كل حاجة لازم تبقى stream.`
          },
          lines: [
            "record للطلب.",
            "main.",
            "أربع طلبات.",
            "سارة، مدفوع.",
            "عمر، مدفوع.",
            "سارة، مش مدفوع.",
            "منى، مدفوع.",
            R`filter بـ method reference، وبعدين مجموع: ٥٠٠ + ١٢٠٠ + ٨٠٠.`,
            "stream تاني (كل stream مرة واحدة).",
            "الطلبات الكبيرة.",
            R`اسم العميل. زي [[map]] في JS.`,
            "من غير تكرار.",
            "ترتيب أبجدي.",
            "عملية نهائية: list ثابتة.",
            "التجميع بالمدينة.",
            R`[[groupingBy]] بمفتاح المدينة، في TreeMap مرتب، والقيمة مجموع الـ totals.`,
            R`[[2500]].`,
            R`[[[Mona, Omar]]].`,
            R`[[{Alex=2000, Cairo=800}]].`,
            R`[[anyMatch]] زي [[some]] في JS: [[true]].`,
            "قفلة."
          ],
          sol: R`الناتج من الحل تحت:

[[{Mona=1, Omar=1, Sara=2}]]: [[counting()]] بترجع Long.

[[Order[customer=Omar, city=Alex, total=1200, paid=true]]]: [[max]] بترجع [[Optional<Order>]] لأن الـ list ممكن تبقى فاضية، فلازم [[orElseThrow()]] أو [[orElse]].

[[Mona, Omar, Sara]]: [[distinct]] شالت سارة المكررة، و [[joining]] زي [[join(", ")]] في JS.`,
          solCode: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(new Order("Sara", "Cairo", 500, true), new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false), new Order("Mona", "Alex", 800, true));
    Map<String, Long> perCustomer = orders.stream()
        .collect(Collectors.groupingBy(Order::customer, TreeMap::new, Collectors.counting()));
    Order biggest = orders.stream().max(Comparator.comparingLong(Order::total)).orElseThrow();
    String names = orders.stream().map(Order::customer).distinct().sorted().collect(Collectors.joining(", "));
    IO.println(perCustomer);
    IO.println(biggest);
    IO.println(names);
}`
        },
        {
          cmd: "Optional",
          title: "method ممكن متلاقيش حاجة: ترجع null ولا Optional؟",
          desc: R`[[Optional<User>]] صندوق يا فيه User يا فاضي. بدل ما [[findById]] ترجع null وتنسى تفحص، النوع نفسه بيقولك «ممكن متلاقيش»، وبيجبرك تقرر: [[orElse(default)]]، أو [[orElseThrow(...)]]، أو [[map]] للتحويل، أو [[ifPresent]].

ده اللي Spring Data بيرجعه: [[repository.findById(id)]] نوعها [[Optional<Task>]]، والشكل المعتاد في الـ service: [[findById(id).orElseThrow(() -> new NotFoundException(...))]]. قريب من [[user?.name ?? "guest"]] في JS بس بـ methods.`,
          example: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) {
    return Optional.ofNullable(db.get(id));
}

void main() {
    IO.println(findById(1).map(User::name).orElse("guest"));
    IO.println(findById(9).map(User::name).orElse("guest"));
    IO.println(findById(2).map(User::email).orElse("no email"));
    findById(1).ifPresent(u -> IO.println("found " + u.id()));
    User u = findById(9).orElseThrow(() -> new NoSuchElementException("user 9 not found"));
}`,
          try: R`جرّب [[findById(9).get()]] وشوف الـ exception. وبعدين اكتب [[Optional<String> emailDomain(long id)]] بترجع الـ domain بتاع الإيميل ([["example.com"]]) أو فاضي، من غير ولا [[if]] ولا null check (استخدم [[map]] و [[filter]]).`,
          flag: "script",
          deep: {
            why: R`[[NullPointerException]] أشهر exception في Java. Java مفيهاش [[strictNullChecks]] زي TS، فـ Optional هو الطريقة إن الـ signature نفسه يقول «القيمة دي ممكن متكونش موجودة». لما تشوف [[Optional<Task>]] مش هتنسى الحالة الفاضية.`,
            how: R`[[Optional.of(x)]] (x مينفعش يبقى null)، و [[Optional.ofNullable(x)]] (فاضي لو null)، و [[Optional.empty()]].

[[map(f)]]: لو فيه قيمة طبّق f، ولو f رجّعت null بقى فاضي (عشان كده Omar اللي إيميله null طلع [["no email"]]). و [[flatMap]] لو f نفسها بترجع Optional. و [[filter]] بيفضّيه لو الشرط مش متحقق.

[[orElse(x)]] بيحسب x دايمًا حتى لو فيه قيمة، و [[orElseGet(() -> x)]] بيحسبه بس لو فاضي؛ فرق مهم لو x استعلام أو object تقيل. و [[orElseThrow()]] من غير باراميتر بيرمي [[NoSuchElementException]]، ومع supplier بيرمي الـ exception بتاعك.

[[get()]] من غير ما تفحص بيرمي [[NoSuchElementException: No value present]]، فاستخدامه بيضيّع الفايدة كلها.`,
            when: R`نوع رجوع لـ methods ممكن متلاقيش (find و search و parse). مش للحقول، ولا باراميترات methods، ولا جوه collections (list فاضية أحسن من [[Optional<List>]])، ولا في الـ entities. Jackson بيعرف يحوّل Optional بس الـ DTOs الأحسن تبقى نوع عادي ممكن يبقى null.`,
            mistakes: R`[[if (opt.isPresent()) { opt.get() }]]: ده null check بشكل أطول؛ استخدم map و orElse. و method نوعها Optional وبترجع [[null]]: أسوأ الاتنين. و [[orElse(repository.save(...))]] وتستغرب إن الـ save بيتنفذ دايمًا: استخدم [[orElseGet]].`
          },
          lines: [
            "record فيه email ممكن يبقى null.",
            R`داتابيز وهمية. [[Map.of]] مبيقبلش null كقيمة، بس القيمة هنا User (وجواه null عادي).`,
            R`نوع الرجوع بيقول «ممكن متلاقيش».`,
            R`[[ofNullable]]: لو [[get]] رجّعت null يبقى Optional فاضي.`,
            "قفلة.",
            "main.",
            R`موجود: [[Sara]].`,
            R`مش موجود: [[guest]].`,
            R`موجود بس الإيميل null، و [[map]] بتحوّل null لفاضي: [[no email]].`,
            R`[[ifPresent]]: نفّذ لو موجود بس: [[found 1]].`,
            R`[[orElseThrow]] بـ exception بتاعنا. ده الشكل اللي هتكتبه في كل service.`,
            "قفلة."
          ],
          sol: R`[[findById(9).get()]]: [[NoSuchElementException: No value present]]. متستخدمش [[get()]] من غير ما تبقى متأكد، واستخدم [[orElseThrow]] برسالة واضحة.

و [[emailDomain]] تحت: [[Optional[example.com]]] لـ 1، و [[Optional.empty]] لـ 2 (إيميل null) و 9 (مش موجود). [[map(User::email)]] بتفضّي لو null، و [[filter]] بتفضّي لو مفيش [[@]]، و [[map]] التانية بتقص. كل خطوة بتعدّي الفاضي زي ما هو، زي [[?.]] في JS.`,
          solCode: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) { return Optional.ofNullable(db.get(id)); }

Optional<String> emailDomain(long id) {
    return findById(id)
        .map(User::email)
        .filter(e -> e.contains("@"))
        .map(e -> e.substring(e.indexOf('@') + 1));
}

void main() {
    IO.println(emailDomain(1) + " " + emailDomain(2) + " " + emailDomain(9));
}`
        }
      ]
    },
    {
      t: "الأخطاء (exceptions)",
      l: 1,
      n: "checked و unchecked، و try-with-resources، و exceptions بتاعتك",
      items: [
        {
          cmd: "checked و unchecked",
          title: "ليه Java بتجبرك تمسك بعض الأخطاء، وبعضها لأ؟",
          desc: R`في Java فيه نوعين exceptions. الـ checked (زي [[IOException]]): الـ compiler بيجبرك يا تمسكها بـ [[try/catch]]، يا تكتب [[throws IOException]] في الـ signature. والـ unchecked (أي حاجة تحت [[RuntimeException]] زي [[IllegalArgumentException]] و [[NullPointerException]]): مش لازم تتمسك.

الفكرة الأصلية: checked للحاجات اللي برّه تحكّمك وممكن تتعافى منها (ملف مش موجود، شبكة وقعت)، و unchecked للغلطات في الكود نفسه. عمليًا، الكود الحديث و Spring بيميلوا للـ unchecked، و Spring بيحوّل أخطاء الداتابيز لـ [[DataAccessException]] وهي unchecked.`,
          example: R`import java.io.IOException;
import java.nio.file.*;

static String readConfig(Path path) throws IOException {
    return Files.readString(path);
}

static int parsePort(String raw) {
    return Integer.parseInt(raw.strip());
}

void main() {
    try {
        IO.println(readConfig(Path.of("missing.txt")));
    } catch (NoSuchFileException e) {
        IO.println("no file: " + e.getMessage());
    } catch (IOException e) {
        throw new UncheckedIOException(e);
    }
    IO.println(parsePort(" 8080 "));
    try {
        parsePort("abc");
    } catch (NumberFormatException e) {
        IO.println(e.getMessage());
    } finally {
        IO.println("finally runs always");
    }
}`,
          try: R`شيل [[throws IOException]] من [[readConfig]] واقرا الخطأ. وبعدين رجّعه وشيل الـ try/catch حوالين النداء. وأخيرًا بدّل ترتيب الـ catch (خلي [[IOException]] قبل [[NoSuchFileException]]).`,
          flag: "script",
          deep: {
            why: R`هتقابل الـ checked exceptions في أول مرة تقرا ملف أو تعمل HTTP call، وهتقابلها في الانترفيو («checked ولا unchecked؟»). وفي Spring هتحتاج تفهمها عشان [[@Transactional]] بيتعامل معاهم بشكل مختلف: بيعمل rollback على الـ unchecked بس افتراضيًا (درس فخاخ @Transactional).`,
            how: R`الشجرة: [[Throwable]] فوق الكل، وتحته [[Error]] (مشاكل في الـ JVM زي [[OutOfMemoryError]]، متمسكهاش) و [[Exception]]. تحت [[Exception]] فيه [[RuntimeException]] ودي وكل اللي تحتها unchecked، والباقي checked.

الـ catch بيتجرب بالترتيب، والأول اللي النوع بتاعه يطابق بيمسك. عشان كده الأخص ([[NoSuchFileException]] وهي IOException) لازم قبل الأعم، والـ compiler بيطلّع خطأ لو العكس. وتقدر تمسك كذا نوع في catch واحد: [[catch (IOException | SQLException e)]].

[[finally]] بيتنفذ دايمًا، سواء حصل exception أو لأ أو حتى لو فيه return.

[[UncheckedIOException]] طريقة شائعة تلف checked جوه unchecked لما مش هتعرف تتعافى منها، ومعاها الـ cause الأصلي فالـ stack trace كامل. الـ lambdas في streams مبتسمحش بـ checked exceptions، فهتحتاج الحركة دي كتير.`,
            when: R`اعمل throw لـ unchecked في كودك للأخطاء المنطقية (not found، و validation، و conflict)، وخلي [[@ControllerAdvice]] يحوّلها لـ HTTP response (درس الأخطاء في المستوى ٢). وامسك الـ checked في الحدود (ملفات وشبكة) ولفّها أو تعامل معاها.`,
            mistakes: R`[[catch (Exception e) {}]] فاضي: الغلطة اختفت ومحدش هيعرف. وأقل منه سوءًا [[e.printStackTrace()]] في الإنتاج بدل logger. و [[throws Exception]] على كل method عشان الـ compiler يسكت. وتلف exception من غير الـ cause: [[new RuntimeException("failed")]] بدل [[new RuntimeException("failed", e)]] فتضيع السبب الأصلي.`
          },
          lines: [
            "الـ checked exception الأشهر.",
            R`[[Files]] و [[Path]] للملفات.`,
            R`[[throws IOException]]: الـ method بتقول «ممكن أرمي ده، واللي بيناديني يتصرف».`,
            R`[[readString]] بترمي IOException (checked).`,
            "قفلة.",
            R`مفيش [[throws]]: [[parseInt]] بترمي [[NumberFormatException]] وهي unchecked.`,
            "تحويل string لـ int.",
            "قفلة.",
            "main.",
            R`[[try]] زي JS.`,
            "الملف مش موجود.",
            R`الأخص الأول: [[NoSuchFileException]] نوع من IOException.`,
            R`[[no file: missing.txt]].`,
            R`أي IOException تانية.`,
            R`نلفها في unchecked ونرميها، ومعاها الأصل.`,
            "قفلة.",
            R`[[8080]].`,
            "try تاني.",
            "string مش رقم.",
            R`نمسك unchecked لأننا عارفين نتصرف.`,
            R`[[For input string: "abc"]].`,
            R`[[finally]]: بيتنفذ في كل الحالات.`,
            R`[[finally runs always]].`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`١. من غير [[throws IOException]]: [[error: unreported exception IOException; must be caught or declared to be thrown]] على سطر [[Files.readString]]. الـ compiler بيجبرك تقرر.

٢. من غير الـ try/catch حوالين النداء: نفس الخطأ بس على سطر النداء في main. المسؤولية اتنقلت للي بينادي. (أو اكتب [[void main() throws IOException]]، ولو الملف مش موجود البرنامج هيقع بـ stack trace.)

٣. [[IOException]] قبل [[NoSuchFileException]]: [[error: exception NoSuchFileException has already been caught]]. الـ catch الأعم بيمسك كل حاجة قبل ما الأخص يتوصله.`
        },
        {
          cmd: "try-with-resources و custom exceptions",
          title: "تقفل الملفات والاتصالات لوحدها، وتعمل exception بمعلومات مفيدة",
          desc: R`أي حاجة لازم تتقفل بعد ما تخلص (ملف، أو connection، أو stream) بتتفتح في [[try (...)]]: Java بتقفلها أوتوماتيك في الآخر، حتى لو حصل exception. زي [[await using]] في JS الحديث.

والـ exception بتاعك: class بيورث من [[RuntimeException]] (غالبًا)، وفيه رسالة واضحة، ولو محتاج حقول زيادة (المبلغ الناقص، أو الـ id) ضيفها. وفي Spring كل exception من دول بيتحول لـ HTTP status برسالة مفهومة في مكان واحد.`,
          example: R`import java.io.*;
import java.nio.file.*;

class InsufficientFundsException extends RuntimeException {
    private final long missing;
    InsufficientFundsException(long missing) {
        super("missing " + missing + " cents");
        this.missing = missing;
    }
    long missing() { return missing; }
}

void withdraw(long balance, long amount) {
    if (amount > balance) throw new InsufficientFundsException(amount - balance);
}

void main() throws IOException {
    Path file = Files.writeString(Path.of("notes.txt"), "line 1\nline 2\n");
    try (BufferedReader reader = Files.newBufferedReader(file)) {
        IO.println(reader.readLine());
    }
    try {
        withdraw(100, 250);
    } catch (InsufficientFundsException e) {
        IO.println(e.getMessage() + " / " + e.missing());
    }
    Files.delete(file);
}`,
          try: R`اعمل class اسمه [[Resource]] بيعمل implements لـ [[AutoCloseable]] وبيطبع [["open"]] في الـ constructor و [["close"]] في [[close()]]. استخدمه في try-with-resources وارمي exception من جوه الـ try: [["close"]] اتطبعت قبل ولا بعد الـ catch؟`,
          flag: "script",
          deep: {
            why: R`connection مفتوحة ومتقفلتش = connection pool بيخلص بعد ساعة والتطبيق يهنج (أشهر مشاكل الإنتاج). والـ exceptions العامة ([[RuntimeException("error")]]) بتخلي الـ API يرجع 500 لكل حاجة، والـ logs مش مفهومة.`,
            how: R`أي class بينفذ [[AutoCloseable]] (فيه [[close()]]) ينفع في try-with-resources. Java بتنادي [[close()]] بعد الـ try block بالعكس من ترتيب الفتح، وقبل الـ catch و finally. ولو الـ try رمى exception والـ close كمان رمى، الأصلي هو اللي بيطلع والتاني بيتحط جواه كـ suppressed ([[getSuppressed()]]).

الـ custom exception: بيورث من [[RuntimeException]] عشان متجبرش كل اللي فوق يكتبوا throws، و [[super(message)]] للرسالة، وكمان [[super(message, cause)]] لو بتلف exception تاني.

في Spring غالبًا مش هتفتح connections بإيدك (Spring و Hibernate بيعملوا كده)، بس هتفتح ملفات و HTTP clients و streams.`,
            when: R`try-with-resources مع أي [[Closeable]] أو [[AutoCloseable]]، دايمًا. و custom exceptions لكل خطأ business ليه معنى: [[NotFoundException]] و [[InsufficientFundsException]] و [[DuplicateEmailException]]، عشان تتحول لـ 404 و 422 و 409 في مكان واحد.`,
            mistakes: R`تفتح stream أو reader وتقفله في آخر الـ try بإيدك: لو حصل exception قبله مش هيتقفل. و exception لكل حاجة صغيرة لحد ما يبقى عندك ٥٠ class. وتستخدم exceptions للـ flow العادي (زي «لو المستخدم مش موجود اعمل واحد»): الأبطأ والأصعب في القراية؛ استخدم Optional.`
          },
          lines: [
            "الـ IO القديم (Reader).",
            R`[[Files]].`,
            R`exception بتاعنا، unchecked لأنه تحت RuntimeException.`,
            "معلومة زيادة: المبلغ الناقص.",
            "constructor.",
            R`[[super]] بيحط الرسالة اللي [[getMessage()]] هترجعها.`,
            "الحقل.",
            "قفلة.",
            "getter.",
            "قفلة الـ class.",
            "method بترمي الـ exception بتاعنا.",
            R`[[throw new]] زي JS.`,
            "قفلة.",
            R`main بتقول إنها ممكن ترمي IOException (checked).`,
            "نكتب ملف تجربة.",
            R`try-with-resources: الـ reader هيتقفل لوحده.`,
            R`[[line 1]].`,
            "هنا الـ reader اتقفل.",
            "try عادي.",
            "سحب أكتر من الرصيد.",
            "نمسك النوع بتاعنا بالظبط.",
            R`[[missing 150 cents / 150]].`,
            "قفلة.",
            "نمسح ملف التجربة.",
            "قفلة."
          ],
          sol: R`الترتيب: [[open]]، وبعدين [[close]]، وبعدين [[caught: boom]]، وبعدين [[finally]]. الـ close بيتنادى أول ما الـ try block يخلص (حتى لو بـ exception)، وقبل الـ catch. ده مهم: جوه الـ catch الـ resource مقفول خلاص، فمتحاولش تستخدمه هناك.`,
          solCode: R`class Resource implements AutoCloseable {
    Resource() { IO.println("open"); }
    @Override public void close() { IO.println("close"); }
}

void main() {
    try (var r = new Resource()) {
        throw new IllegalStateException("boom");
    } catch (IllegalStateException e) {
        IO.println("caught: " + e.getMessage());
    } finally {
        IO.println("finally");
    }
}`
        }
      ]
    },
    {
      t: "تطبيقات ديسكتوب بـ Java (JavaFX و Swing)",
      l: 1,
      n: "برنامج ليه شباك وزراير على الكمبيوتر، وبعدين jar أو installer يتسطّب من غير ما اليوزر يكون عنده Java",
      items: [
        {
          cmd: "تطبيقات ديسكتوب: واجهات JavaFX و Swing",
          title: "تعمل برنامج ديسكتوب بشباك وزرار بـ Java إزاي، وتختار JavaFX ولا Swing؟",
          desc: R`Java مش للسيرفرات بس: تقدر تعمل بيها برنامج ليه شباك وزراير يشتغل على Windows و macOS و Linux. IntelliJ IDEA نفسه و NetBeans و Apache JMeter برامج ديسكتوب مكتوبة بـ Java.

عندك مكتبتين:
• [[Swing]]: جوه الـ JDK من زمان ([[javax.swing]])، فمش محتاج تنزّل أي حاجة. شكلها الافتراضي قديم شوية، بس ثابتة ومستخدمة في برامج كبيرة وأدوات داخلية كتير.
• [[JavaFX]]: أحدث، وفيها تنسيق بـ CSS، وتصميم الشاشات في ملفات FXML، و animations. بس من Java 11 مبقتش جوه الـ JDK: بتضيفها كمكتبة اسمها OpenJFX (من Maven أو Gradle، أو SDK بتنزّله من openjfx.io).
لو هتبدأ برنامج جديد، JavaFX غالبًا الاختيار الأريح. ولو بتعدّل برنامج قديم، غالبًا هتلاقيه Swing.

برنامج JavaFX شكله ثابت:
• الكلاس بيورث من [[Application]] ([[extends]] من درس «extends و abstract»).
• JavaFX بينادي دالة [[start]] وبيديك [[Stage]]: ده الشباك نفسه (العنوان وزراير القفل).
• جوه الشباك [[Scene]]: المحتوى كله، ومقاسه.
• والمحتوى عناصر (اسمها nodes) زي [[Label]] (كلام) و [[Button]] (زرار)، جوه layout زي [[VBox]] اللي بيرصهم تحت بعض.
• [[main]] بتنادي [[launch]]، و launch هي اللي بتجهّز JavaFX وتنادي start.

[[e -> message.setText(...)]] ده lambda (درس «lambdas»): الكود اللي يتنفذ لما الزرار يتضغط. و [[@Override]] بتقول إن start دي بتاعة Application وانت بتكتب نسختك منها.

الدرس الجاي بيحوّل البرنامج لملف تقدر تديه لحد يسطّبه.`,
          example: R`import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

// البرنامج بيورث من Application
public class DesktopApp extends Application {
  // JavaFX بينادي start وبيديك الشباك (Stage)
  @Override
  public void start(Stage stage) {
    Label message = new Label("Hello from JavaFX!");
    Button button = new Button("Click me");
    button.setOnAction(e -> message.setText("Button clicked!"));

    // VBox بيرص العناصر تحت بعض بمسافة 15 بيكسل
    VBox root = new VBox(15, message, button);
    Scene scene = new Scene(root, 360, 200);

    stage.setTitle("My first JavaFX app");
    stage.setScene(scene);
    stage.show();
  }

  public static void main(String[] args) {
    launch(args);
  }
}`,
          try: R`أسهل طريق: في IntelliJ IDEA اعمل New Project واختار JavaFX من القايمة الشمال (بيعمل مشروع Maven فيه JavaFX جاهزة). اعمل class جديدة اسمها [[DesktopApp]] جنب الكلاس اللي اتعمل، والصق الكود تحت سطر الـ [[package]]، واضغط Run الأخضر جنب [[main]]. اضغط الزرار وشوف الكلام بيتغير. ولو مش عايز تنزّل JavaFX دلوقتي، جرّب نسخة Swing اللي تحت في الحل: بتشتغل بـ [[java SwingApp.java]] على طول.`,
          flag: "script",
          deep: {
            why: R`فيه برامج مكانها الكمبيوتر مش المتصفح: برنامج كاشير في محل، أو أداة بتشتغل على ملفات كتير على الجهاز، أو برنامج لازم يشتغل من غير نت. ولو انت عارف Java أصلًا، تقدر تعملها من غير ما تتعلم لغة تانية، ونفس الكود يشتغل على الأنظمة التلاتة.`,
            how: R`JavaFX بيبني الشاشة شجرة: الـ Stage جواه Scene، والـ Scene جواها root (هنا VBox)، والـ root جواه الـ Label والـ Button. لما تغيّر حاجة في الشجرة (زي [[setText]]) JavaFX بيرسم التغيير في الفريم الجاي، وبيستخدم كارت الشاشة في الرسم لما يقدر.

كل حاجة ليها علاقة بالواجهة لازم تحصل على thread واحد اسمه JavaFX Application Thread. [[start]] والـ lambda بتاعة الزرار بيشتغلوا عليه أصلًا، فمفيش مشكلة هنا. بس لو عملت شغل تقيل (تحميل ملف كبير) على thread تاني وعايز تحدّث الواجهة بعده، استخدم [[Platform.runLater(() -> ...)]].

ليه مش [[java DesktopApp.java]] على طول زي باقي دروس Java؟ لأن JavaFX مش جوه الـ JDK. لو نزّلت الـ SDK من openjfx.io بتترجم وتشغّل كده:
[[javac --module-path PATH_TO_FX/lib --add-modules javafx.controls -d out DesktopApp.java]]
[[java --module-path PATH_TO_FX/lib --add-modules javafx.controls -cp out DesktopApp]]
وطريقة الملف الواحد ([[java DesktopApp.java]]) مع JavaFX بتفشل بـ [[ClassNotFoundException: DesktopApp]] حتى لو ضفت الـ module-path، عشان كده بنترجم الأول.`,
            when: "أدوات داخلية لشركة، أو برامج نقاط بيع، أو برامج لازم تشتغل offline أو تتعامل مع ملفات وأجهزة متوصلة بالكمبيوتر. لو البرنامج محتاج يتفتح من أي مكان ومن الموبايل، غالبًا موقع ويب أنسب.",
            mistakes: R`تحاول [[java DesktopApp.java]] من غير JavaFX فيطلعلك [[package javafx.application does not exist]]. تحدّث الواجهة من thread تاني فيطلعلك [[IllegalStateException: Not on FX application thread]] أو الواجهة تتصرف غلط: استخدم [[Platform.runLater]]. وتعمل شغل تقيل جوه الـ lambda بتاعة الزرار، فالشباك كله يهنّج لحد ما يخلص.`
          },
          lines: [
            R`[[Application]]: الأساس اللي أي برنامج JavaFX بيورث منه.`,
            R`[[Scene]]: المحتوى اللي جوه الشباك.`,
            R`[[Button]]: زرار.`,
            R`[[Label]]: كلام بيتعرض.`,
            R`[[VBox]]: layout بيرص العناصر تحت بعض.`,
            R`[[Stage]]: الشباك نفسه.`,
            R`الكلاس بيورث من Application.`,
            R`[[@Override]]: هنكتب نسختنا من start.`,
            R`JavaFX بينادي start ويديك الشباك في [[stage]].`,
            R`[[new Label(...)]]: كلام أوله «Hello from JavaFX!».`,
            R`زرار مكتوب عليه «Click me».`,
            R`لما الزرار يتضغط، غيّر كلام الـ Label. [[e]] هو الـ event (مش مستخدم هنا).`,
            R`VBox: مسافة 15 بين العناصر، وجواه الكلام والزرار.`,
            R`المحتوى بمقاس 360 عرض × 200 طول.`,
            R`العنوان اللي فوق في شريط الشباك.`,
            R`حط المحتوى في الشباك.`,
            R`اعرض الشباك.`,
            R`آخر start.`,
            R`[[main]] نقطة البداية.`,
            R`[[launch]] بيجهّز JavaFX وينادي start.`,
            R`آخر main.`,
            R`آخر الكلاس.`
          ],
          sol: R`بيفتح شباك صغير عنوانه «My first JavaFX app»، فيه فوق «Hello from JavaFX!» وتحته زرار «Click me»، الاتنين على الشمال لأن VBox بيرص من فوق ومن الشمال افتراضيًا. لما تضغط الزرار الكلام بيبقى «Button clicked!». والبرنامج بيقفل لما تقفل الشباك.

لو طلعلك [[package javafx.application does not exist]] أو [[JavaFX runtime components are missing]]، يبقى JavaFX مش متضافة للمشروع: استخدم مشروع IntelliJ بتاع JavaFX أو أوامر [[--module-path]] اللي في «إزاي».

نسخة Swing من نفس البرنامج (احفظها [[SwingApp.java]] وشغّلها بـ [[java SwingApp.java]]، مش محتاجة أي حاجة غير الـ JDK): بتفتح شباك فيه الكلام والزرار جنب بعض في سطر واحد في نص الشباك من فوق، لأن [[JPanel]] بيرص العناصر جنب بعض افتراضيًا. نفس الفكرة بالظبط: شباك ([[JFrame]])، وعناصر، و lambda للزرار. و [[SwingUtilities.invokeLater]] هي اللي بتخلي الواجهة تتعمل على الـ thread بتاعها، زي [[Platform.runLater]] في JavaFX.`,
          solCode: R`import javax.swing.*;

public class SwingApp {
  public static void main(String[] args) {
    SwingUtilities.invokeLater(() -> {
      JFrame frame = new JFrame("My first Swing app");
      JLabel message = new JLabel("Hello from Swing!");
      JButton button = new JButton("Click me");
      button.addActionListener(e -> message.setText("Button clicked!"));
      JPanel panel = new JPanel();
      panel.add(message);
      panel.add(button);
      frame.add(panel);
      frame.setSize(360, 200);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setVisible(true);
    });
  }
}`
        },
        {
          cmd: "تحزيم ونشر برنامج ديسكتوب بـ jpackage",
          title: "تدّي برنامج Java لحد يسطّبه من غير ما يكون عنده Java إزاي؟ (jar و jpackage)",
          desc: R`لما البرنامج يخلص، مش هتبعت للناس ملفات [[.java]] ولا [[.class]]. عندك خطوتين:

١) ملف [[jar]]: كل الـ [[.class]] بتوع البرنامج متجمعين في ملف واحد (هو zip في الحقيقة)، وجواه سطر بيقول أنهي class فيها [[main]]. بيشتغل بـ [[java -jar app.jar]]، أو بدبل كليك عند ناس كتير. بس لازم الجهاز يكون عليه Java بنسخة مناسبة.

٢) [[jpackage]]: أداة جوه الـ JDK (من Java 16). بتاخد الـ jar، وتحط جنبه Java runtime خاص بالبرنامج (معمول بأداة اسمها [[jlink]])، وتطلّع installer عادي للنظام:
• Windows: [[.exe]] أو [[.msi]]. محتاج WiX Toolset متسطّب.
• macOS: [[.dmg]] أو [[.pkg]].
• Linux: [[.deb]] أو [[.rpm]].
اللي هيسطّب البرنامج مش محتاج يعرف إن فيه Java أصلًا.

حاجتين لازم تعرفهم قبل ما تبدأ:
• jpackage بيعمل installer للنظام اللي شغال عليه بس: الـ [[.exe]] لازم يتعمل على Windows، والـ [[.dmg]] على Mac. عشان كده الفرق بتعمل الـ installers على CI فيه أجهزة من الأنظمة التلاتة.
• الحجم: لأن جوه البرنامج Java runtime، حتى برنامج صغير بيطلع عشرات الميجات. تقدر تصغّره بإنك تحدد الـ modules اللي محتاجها بـ [[--add-modules]].

المثال بيحزّم نسخة Swing من الدرس اللي فات ([[SwingApp.java]] اللي في الحل هناك)، لأنها مش محتاجة أي مكتبة برا الـ JDK. برنامج JavaFX نفس الخطوات، بس بتزوّد لـ jpackage مكان JavaFX ([[--module-path]] لفولدر الـ jmods بتاعها) و [[--add-modules javafx.controls]].`,
          example: R`# ترجم الكود لـ bytecode في فولدر bin
javac -d bin SwingApp.java

# اجمعه في jar في فولدر dist، وقول فيه مين الكلاس اللي فيها main
jar --create --file dist/app.jar --main-class SwingApp -C bin .

# جرّب الـ jar
java -jar dist/app.jar

# installer لويندوز (على Windows، و WiX متسطّب)
jpackage --input dist --main-jar app.jar --name MyDesktopApp --type exe --win-shortcut --win-dir-chooser`,
          try: R`في فولدر فيه [[SwingApp.java]] نفّذ أول ٣ أوامر، واتأكد إن الشباك فتح من الـ jar. بعدين جرّب jpackage من غير installer خالص، وده بيشتغل على أي نظام ومش محتاج WiX: [[jpackage --input dist --main-jar app.jar --name MyDesktopApp --type app-image]]، وشغّل البرنامج من الفولدر اللي اتعمل، وشوف حجمه. ولو على Windows ومسطّب WiX، جرّب الأمر الرابع.`,
          flag: "script",
          deep: {
            why: R`أكبر مشكلة كانت في برامج Java الديسكتوب إن اليوزر لازم يسطّب Java الأول، وبالنسخة الصح. jpackage بيحل ده: كل برنامج معاه الـ runtime بتاعه، فمش فارق إيه اللي متسطّب على الجهاز، والبرنامج بيتسطّب ويتشال زي أي برنامج تاني.`,
            how: R`[[javac -d bin]] بيحط الـ [[.class]] في فولدر bin. [[jar --create]] بيجمعهم، و [[--main-class]] بيكتب في ملف جوه الـ jar اسمه [[MANIFEST.MF]] سطر [[Main-Class: SwingApp]]، ودا اللي بيخلي [[java -jar]] يعرف يبدأ منين. و [[-C bin .]] معناها «خش فولدر bin وخد كل اللي فيه».

jpackage بياخد كل اللي في فولدر [[--input]] (عشان كده بنحط الـ jar لوحده في dist، مش في فولدر فيه الكود كله)، ويعمل runtime بـ jlink، ويحطهم مع launcher (البرنامج اللي اليوزر بيدوس عليه) في installer. [[--win-shortcut]] بيعمل اختصار على الديسكتوب، و [[--win-dir-chooser]] بيخلي اليوزر يختار مكان التسطيب.

ومن غير ما تحدد modules، jpackage بيحط runtime كبير فيه modules كتير. لو شغّلت [[jdeps --print-module-deps dist/app.jar]] هيقولك البرنامج محتاج إيه بالظبط (هنا [[java.base,java.desktop]])، وتبعتهم لـ jpackage بـ [[--add-modules java.desktop]]. في تجربة على Linux بـ JDK 21، فولدر app-image لنسخة Swing دي طلع حوالي 160 ميجا من غير تحديد، وحوالي 90 ميجا مع [[--add-modules java.desktop]]، والـ installer بيبقى أصغر لأنه مضغوط.`,
            when: "لما تسلّم برنامج ديسكتوب لناس مش مبرمجين: عميل، أو موظفين في شركة. للتجربة بينك وبين مبرمجين تانيين الـ jar كفاية.",
            mistakes: R`تبعت ملفات [[.class]] أو الكود نفسه لليوزر. تشغّل jpackage بـ [[--input .]] فيتحط في البرنامج كل اللي في الفولدر (الكود والـ bin وأي حاجة تانية). تحاول تعمل [[.exe]] من Linux أو Mac، أو من غير WiX فيطلعلك error إنه مش لاقي الأدوات. وتنسى [[--main-class]] في الـ jar فيطلعلك [[no main manifest attribute, in dist/app.jar]].`
          },
          lines: [
            R`ترجم [[SwingApp.java]]، و [[-d bin]] معناها حط الـ [[.class]] في فولدر bin.`,
            R`اعمل [[dist/app.jar]] من محتوى bin، واكتب فيه إن البداية من [[SwingApp]].`,
            R`شغّل الـ jar زي ما اليوزر هيشغّله لو عنده Java.`,
            R`اعمل installer اسمه MyDesktopApp من الـ jar اللي في dist، مع اختصار على الديسكتوب واختيار مكان التسطيب.`
          ],
          sol: R`بعد أول أمرين هتلاقي [[bin/SwingApp.class]] و [[dist/app.jar]] (حجمه أقل من 2 كيلو). [[java -jar dist/app.jar]] بيفتح نفس شباك Swing.

[[--type app-image]] بيعمل فولدر اسمه [[MyDesktopApp]]، والبرنامج جواه: على Windows [[MyDesktopApp\MyDesktopApp.exe]]، وعلى Linux [[MyDesktopApp/bin/MyDesktopApp]]، وعلى Mac [[MyDesktopApp.app]]. دوس عليه: نفس الشباك، من غير ما يستخدم Java اللي على جهازك. حجم الفولدر حوالي 160 ميجا لأن جواه runtime كامل تقريبًا. أعد الأمر وزوّد [[--add-modules java.desktop]] (بعد ما تمسح الفولدر القديم) وهتلاقيه حوالي 90 ميجا.

والأمر الرابع على Windows بيطلّع [[MyDesktopApp-1.0.exe]] (1.0 هي النسخة الافتراضية، وتغيّرها بـ [[--app-version]]). لو طلعلك إنه مش لاقي WiX، سطّبه وزوّده للـ PATH وجرّب تاني.`
        }
      ]
    },
    {
      t: "Maven و Gradle",
      l: 2,
      n: "الـ package.json والـ npm بتوع Java: ملف المشروع، والمكتبات، وأوامر الـ build",
      items: [
        {
          cmd: "pom.xml",
          title: "ملف المشروع في Maven: المكتبات والإصدارات فين؟",
          desc: R`[[pom.xml]] هو [[package.json]] بتاع Maven: اسم المشروع، ونسخة Java، والمكتبات (dependencies)، والـ plugins اللي بتعمل build. المكتبات بتتحمّل من Maven Central (زي npm registry) وبتتخزن في [[~/.m2/repository]] مرة واحدة لكل الجهاز، مش [[node_modules]] لكل مشروع.

في Spring Boot الـ pom بيورث من [[spring-boot-starter-parent]]: ده بيحدد إصدارات كل المكتبات المتوافقة مع بعض، فانت بتكتب المكتبة من غير version. والـ starters ([[spring-boot-starter-webmvc]] و [[spring-boot-starter-data-jpa]]...) كل واحد بيجيب مجموعة مكتبات متظبطة مع بعض.`,
          example: R`<project>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
  </parent>
  <groupId>com.example</groupId>
  <artifactId>tasks-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <properties>
    <java.version>25</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw dependency:tree]] ودوّر على [[jackson]] و [[tomcat]]: جم منين وانت مكتبتهمش؟ وبعدين ضيف [[<version>1.0</version>]] على [[spring-boot-starter-webmvc]] وشوف Maven بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`كل مشروع Java في الشغل بيبدأ من الملف ده. لو فهمته هتعرف تضيف مكتبة، وتعرف ليه مكتبتين بيتخانقوا على إصدار، وليه التست مش شايف مكتبة معينة.`,
            how: R`كل مكتبة ليها إحداثيات: [[groupId]] (الشركة، زي scope في npm) و [[artifactId]] (الاسم) و [[version]]. والـ scope: [[compile]] (الافتراضي، زي dependencies)، و [[runtime]] (مش محتاجها وقت الـ compile، زي driver الداتابيز)، و [[test]] (زي devDependencies بس للتستات)، و [[provided]].

الـ parent بيعمل حاجتين: dependencyManagement (جدول إصدارات مجرّبة مع بعض، اسمه BOM) وإعدادات plugins جاهزة. لو محتاج إصدار مختلف لمكتبة، بتغيّر property زي [[<postgresql.version>]] بدل ما تكتب version على الـ dependency.

Maven بيحل الـ transitive dependencies (مكتبات المكتبات) لوحده، ولو فيه نسختين من نفس المكتبة بياخد الأقرب في الشجرة. وده سبب مشاكل [[NoSuchMethodError]] الغريبة، و [[dependency:tree]] هو اللي بيكشفها.

في Spring Boot 4 الـ starters اتقسمت أكتر: [[spring-boot-starter-webmvc]] (الاسم القديم [[spring-boot-starter-web]] لسه موجود بس deprecated)، ولكل starter غالبًا starter تست خاص بيه زي [[spring-boot-starter-webmvc-test]].`,
            when: R`كل ما تضيف مكتبة. واستخدم start.spring.io أو صفحة المكتبة على Maven Central عشان تجيب الإحداثيات الصح.`,
            mistakes: R`تكتب [[<version>]] لمكتبة الـ parent بيديرها فتكسر التوافق. وتحط مكتبة تست من غير [[<scope>test</scope>]] فتدخل في الـ jar النهائي. وتنسى [[runtime]] للـ driver ده مش غلط كبير بس بيوضح النية. وتنسخ dependency من مقالة قديمة لـ Boot 2 فيها [[javax.*]]: من Boot 3 كل حاجة بقت [[jakarta.*]].`
          },
          lines: [
            "بداية ملف المشروع.",
            "نسخة صيغة الـ pom، ثابتة دايمًا 4.0.0.",
            R`الأب: منه بتيجي إصدارات كل المكتبات.`,
            "الـ group بتاع Spring Boot.",
            "الـ parent الرسمي.",
            R`إصدار Spring Boot. في سبتمبر ٢٠٢٦ آخر إصدار مستقر 4.1.x.`,
            "قفلة الـ parent.",
            R`الـ group بتاع مشروعك، عادة الدومين بالعكس.`,
            "اسم المشروع.",
            R`[[SNAPSHOT]] يعني نسخة لسه بتتطور.`,
            "إعدادات.",
            R`نسخة Java اللي هيتعمل بيها compile.`,
            "قفلة.",
            "المكتبات.",
            "مكتبة.",
            "من Spring Boot.",
            R`starter الويب: Spring MVC و Tomcat و Jackson. من غير version لأن الـ parent بيحدده.`,
            "قفلة.",
            "مكتبة.",
            "driver بتاع PostgreSQL.",
            "الاسم.",
            R`[[runtime]]: الكود مش بيستخدمه مباشرة، بس لازم يبقى موجود وقت التشغيل.`,
            "قفلة.",
            "مكتبة.",
            "من Spring Boot.",
            R`أدوات التست: JUnit و Mockito و AssertJ و MockMvc.`,
            R`[[test]]: متاحة للتستات بس، ومش هتدخل الـ jar.`,
            "قفلة.",
            "قفلة المكتبات.",
            "قفلة الملف."
          ],
          sol: R`في [[dependency:tree]] هتلاقي [[tomcat-embed-core]] تحت [[spring-boot-starter-tomcat]] تحت [[spring-boot-starter-webmvc]]، و Jackson تحت starter الـ JSON. مكتبتهمش لأن الـ starter جابهم (transitive). وفي Spring Boot 4 هتلاقي Jackson 3 ([[tools.jackson.core:jackson-databind]]) بدل [[com.fasterxml.jackson]] القديم.

ولما تكتب [[<version>1.0</version>]] على الـ starter: Maven هيحاول يجيب [[spring-boot-starter-webmvc:1.0]] ومش هيلاقيها، فالـ build يقع بـ [[Could not find artifact]]. ولو كتبت version موجودة بس مختلفة عن الـ parent، الـ build ممكن يعدّي ويقع وقت التشغيل بسبب عدم توافق. القاعدة: سيب الـ parent يحدد.`
        },
        {
          cmd: "mvnw",
          title: "تعمل build وتشغّل وتختبر المشروع بأوامر Maven",
          desc: R`[[mvnw]] (Maven wrapper) سكربت جوه المشروع بيحمّل نسخة Maven المظبوطة لوحده، فمش محتاج تسطّب Maven، وكل الفريق والـ CI بيستخدموا نفس النسخة. زي [[npx]] بالظبط.

الأوامر الأساسية: [[./mvnw spring-boot:run]] يشغّل (زي [[npm run dev]])، و [[./mvnw test]] التستات، و [[./mvnw package]] يطلّع jar في [[target/]] تشغّله بـ [[java -jar]] (زي [[npm run build]]). على ويندوز [[mvnw.cmd]].`,
          example: R`./mvnw spring-boot:run
./mvnw test
./mvnw test -Dtest=TaskControllerTest
./mvnw clean package -DskipTests
java -jar target/tasks-api-0.0.1-SNAPSHOT.jar
./mvnw dependency:tree
./mvnw versions:display-dependency-updates`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw package]] وشوف الـ jar طلع فين وحجمه كام ([[ls -lh target/*.jar]]). شغّله بـ [[java -jar]]، وبعدين بـ [[java -jar target/*.jar --server.port=9090]]. إيه اللي اتغير؟`,
          deep: {
            why: R`ده اللي هتكتبه كل يوم، وهو نفسه اللي بيتكتب في Dockerfile والـ CI. والـ jar الواحد اللي فيه كل حاجة (fat jar) هو طريقة الـ deploy العادية لـ Spring Boot.`,
            how: R`Maven بيشتغل بـ lifecycle phases بالترتيب: [[validate]] ← [[compile]] ← [[test]] ← [[package]] ← [[verify]] ← [[install]]. لما تطلب [[package]] بيعدّي على اللي قبله كله، فالتستات بتشتغل إلا لو [[-DskipTests]]. و [[clean]] بيمسح [[target/]].

[[spring-boot:run]] ده goal من الـ plugin بتاع Spring Boot: بيعمل compile ويشغّل من غير ما يعمل jar. والـ plugin نفسه في [[package]] بيعمل repackage: بيحط كودك وكل المكتبات في jar واحد ومعاه launcher. عشان كده الحجم عشرات الميجات.

[[-D]] بيحط system property: [[-Dtest=...]] يختار تست، و [[-DskipTests]] يتخطاهم. والـ arguments بعد [[java -jar app.jar]] زي [[--server.port=9090]] بتغيّر أي إعداد في Spring (درس الإعدادات).`,
            when: R`[[spring-boot:run]] أو زرار Run في IntelliJ وانت بتطوّر. [[test]] قبل كل push. [[package]] في الـ CI والـ Docker. و [[dependency:tree]] لما مكتبة تتصرف غريب.`,
            mistakes: R`تستخدم [[mvn]] المتسطّب على جهازك بدل [[./mvnw]] فتشتغل بنسخة مختلفة عن الـ CI. و [[-DskipTests]] كعادة فالتستات تبوظ ومحدش ياخد باله. وتنسى إن [[./mvnw]] محتاج صلاحية تشغيل على لينكس ([[chmod +x mvnw]]) لو اتنسخ من ويندوز. وتشغّل بـ JDK غلط: Maven بياخد [[JAVA_HOME]].`
          },
          lines: [
            "شغّل التطبيق وانت بتطوّر.",
            "شغّل كل التستات.",
            R`تست class واحد بس.`,
            R`امسح القديم واعمل jar من غير تستات (في Docker مثلًا بعد ما الـ CI اختبر).`,
            "شغّل الـ jar: ده كل اللي محتاجه السيرفر، Java بس.",
            "شجرة المكتبات ومين جاب مين.",
            "إيه المكتبات اللي ليها إصدارات أحدث."
          ],
          sol: R`الـ jar بيطلع في [[target/]] باسم [[artifactId-version.jar]]، وحجمه غالبًا بين ٢٠ و ٦٠ ميجا حسب الـ starters، لأن فيه Tomcat و Spring وكل المكتبات. (هتلاقي كمان [[.jar.original]] صغير: ده كودك بس قبل الـ repackage.)

مع [[--server.port=9090]] اللوج هيقول [[Tomcat started on port 9090]] بدل 8080: أي إعداد في [[application.yaml]] ينفع يتغير من الـ command line أو من environment variable ([[SERVER_PORT=9090]]) من غير ما تعيد build. ولو لقيت [[Port 8080 was already in use]]، فيه نسخة تانية شغالة.`
        },
        {
          cmd: "Gradle",
          title: "نفس المشروع بـ Gradle: build.gradle.kts",
          desc: R`Gradle هو البديل التاني الشائع (وهو اللي Android بيستخدمه). بدل XML، الـ build مكتوب كود بـ Kotlin DSL في [[build.gradle.kts]]، وأقصر بكتير. وفيه wrapper برضه: [[./gradlew]].

الأوامر المقابلة: [[./gradlew bootRun]] للتشغيل، و [[./gradlew test]]، و [[./gradlew bootJar]] يطلّع الـ jar في [[build/libs/]]. والـ scopes بقت أسماء configurations: [[implementation]] و [[runtimeOnly]] و [[testImplementation]].`,
          example: R`plugins {
    java
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
}
group = "com.example"
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }
}
repositories { mavenCentral() }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
tasks.withType<Test> { useJUnitPlatform() }`,
          try: R`اعمل مشروع من start.spring.io واختار «Gradle - Kotlin». شغّل [[./gradlew bootJar]] مرتين ورا بعض وقارن الوقت. وبعدين [[./gradlew dependencies --configuration runtimeClasspath]].`,
          flag: "script",
          deep: {
            why: R`هتلاقي الاتنين في الشركات بنسب قريبة، والمهم تعرف تقرا الاتنين. Gradle أسرع في المشاريع الكبيرة بسبب الكاش والـ incremental builds، و Maven أبسط وأثبت.`,
            how: R`Gradle بيبني graph من الـ tasks ([[compileJava]] و [[test]] و [[bootJar]]...)، وكل task بيعرف مدخلاته ومخرجاته، فلو ماتغيرش حاجة بيقول [[UP-TO-DATE]] ومبيعيدش. وفيه daemon بيفضل شغال في الخلفية عشان المرات الجاية تبقى أسرع.

الـ toolchain بيقول «اعمل compile بـ Java 25» حتى لو Gradle نفسه شغال بـ JDK تاني، و Gradle بيدوّر على JDK مناسب على الجهاز.

الـ plugin [[io.spring.dependency-management]] بيعمل نفس شغل الـ parent في Maven: إصدارات المكتبات من غير ما تكتبها. و [[testRuntimeOnly("org.junit.platform:junit-platform-launcher")]] مطلوبة في Gradle الحديث عشان JUnit يشتغل.`,
            when: R`لو المشروع أو الفريق عنده اختيار موجود امشي عليه. في مشروع جديد: Maven لو عايز أبسط حاجة، و Gradle لو المشروع كبير أو multi-module أو عندك خبرة Kotlin.`,
            mistakes: R`تخلط Groovy DSL ([[build.gradle]] بـ [[implementation '...']]) و Kotlin DSL ([[build.gradle.kts]] بـ [[implementation("...")]]): الأمثلة على النت نصها ده ونصها ده. وتسطّب Gradle globally بإصدار مختلف عن الـ wrapper. وتنسى إن الـ jar في [[build/libs]] مش [[target]] وانت بتكتب Dockerfile.`
          },
          lines: [
            "الـ plugins.",
            "دعم Java الأساسي.",
            R`plugin بتاع Spring Boot: بيضيف [[bootRun]] و [[bootJar]].`,
            "إدارة إصدارات المكتبات من الـ BOM بتاع Boot.",
            "قفلة.",
            R`زي [[groupId]].`,
            "إعدادات Java.",
            R`اعمل compile بـ Java 25.`,
            "قفلة.",
            R`المكتبات من Maven Central.`,
            "المكتبات.",
            R`[[implementation]] زي compile scope.`,
            R`[[runtimeOnly]] زي runtime.`,
            R`[[testImplementation]] زي test.`,
            "الـ launcher بتاع JUnit، مطلوب لتشغيل التستات.",
            "قفلة.",
            R`شغّل التستات بـ JUnit 5/6 (Jupiter).`
          ],
          sol: R`أول [[bootJar]] بياخد وقت (تحميل Gradle والمكتبات والـ daemon)، والتاني ثواني وهتلاقي [[BUILD SUCCESSFUL]] والـ tasks كلها [[UP-TO-DATE]]، لأن مفيش مدخلات اتغيرت. الـ jar في [[build/libs/]].

و [[dependencies --configuration runtimeClasspath]] بيطبع نفس فكرة [[mvn dependency:tree]]: الشجرة الكاملة، والإصدارات اللي اتحلت بـ [[->]] لو فيه أكتر من نسخة اتطلبت.`
        }
      ]
    },
    {
      t: "أول تطبيق Spring Boot",
      l: 2,
      n: "تعمل المشروع، وتفهم الـ auto-configuration، وإزاي Spring بيعمل الـ objects ويوصّلها ببعض",
      items: [
        {
          cmd: "start.spring.io",
          title: "تعمل مشروع Spring Boot جديد وتفهم شكله",
          desc: R`start.spring.io هو [[npm create vite]] بتاع Spring: تختار Maven أو Gradle، و Java 25، والـ dependencies (Spring Web و Spring Data JPA و PostgreSQL Driver و Validation و Flyway...)، وتنزّل zip فيه مشروع جاهز. ونفس الحاجة موجودة جوه IntelliJ و VS Code.

المشروع فيه: [[src/main/java]] للكود، و [[src/main/resources/application.properties]] (أو [[.yaml]]) للإعدادات، و [[src/test/java]] للتستات، والـ wrapper ([[mvnw]]). والـ packages بالدومين بالعكس: [[com.example.tasks]].`,
          example: R`curl https://start.spring.io/starter.zip -d type=maven-project -d javaVersion=25 -d groupId=com.example -d artifactId=tasks-api -d dependencies=web,data-jpa,postgresql,validation,flyway,actuator -o tasks-api.zip
unzip tasks-api.zip -d tasks-api && cd tasks-api
tree src
./mvnw spring-boot:run`,
          try: R`اعمل مشروع فيه Spring Web بس، وشغّله، وافتح [[localhost:8080]]. إيه اللي ظهر؟ وبعدين ضيف PostgreSQL Driver و Spring Data JPA من غير أي إعدادات وشغّل تاني: التطبيق قام؟`,
          deep: {
            why: R`البداية الصح بتوفّر ساعات: إصدارات متوافقة، وهيكل كل مطور Java يعرفه، و wrapper، وتست جاهز بيتأكد إن التطبيق بيقوم.`,
            how: R`الـ package الأساسي فيه class عليه [[@SpringBootApplication]] (الدرس الجاي)، وكل الكود لازم يبقى في الـ package ده أو تحته عشان Spring يلاقيه. التنظيم الشائع: package لكل feature ([[tasks]] و [[users]]) جواه controller و service و repository و entity، أحسن من package لكل نوع ([[controllers]] و [[services]]) في المشاريع الكبيرة.

الـ dependency IDs في الـ API ([[web]] و [[data-jpa]]...) هي نفس اللي في الواجهة. وفيه starters مهمة للتطوير: [[devtools]] (restart أوتوماتيك لما تحفظ) و [[docker-compose]] (بيشغّل [[compose.yaml]] اللي في المشروع لوحده وبيوصّل الـ datasource).

التطبيق فيه Tomcat جواه (embedded server)، فمش محتاج تسطّب server: [[java -jar]] بيفتح بورت 8080.`,
            when: R`كل مشروع جديد. ولو بتضيف feature لمشروع موجود، استخدم الموقع عشان تعرف اسم الـ starter الصح وبعدين ضيفه للـ pom.`,
            mistakes: R`تحط classes برّه الـ package الأساسي فـ Spring ميلاقيهاش (الـ endpoint يرجع 404 من غير أي خطأ). وتختار كل الـ dependencies «عشان لو احتجتها»: كل starter بيعمل auto-configuration، و JPA من غير داتابيز بيوقع التطبيق. وتنزّل مثال من النت بـ Spring Boot 2 و [[javax]].`
          },
          lines: [
            R`بيطلب zip من الموقع بالاختيارات: Maven و Java 25 والـ starters. (دي نفس اختيارات الواجهة.)`,
            "فك الملف وادخل الفولدر.",
            "شوف الهيكل.",
            "شغّل."
          ],
          sol: R`مع Spring Web بس: التطبيق بيقوم على 8080، و [[localhost:8080]] بيعرض «Whitelabel Error Page» بـ 404، لأن مفيش controller لسه. ده طبيعي ومعناه إن Tomcat شغال.

ولما تضيف JPA و PostgreSQL من غير إعدادات: التطبيق بيقع وقت البداية بـ [[APPLICATION FAILED TO START]] و [[Failed to configure a DataSource: 'url' attribute is not specified]]. الـ auto-configuration شاف JPA فحاول يوصّل بداتابيز ومش لاقي عنوان. الحل: [[spring.datasource.url]] (درس الـ entities)، أو starter [[docker-compose]] مع [[compose.yaml]] فيه postgres.`
        },
        {
          cmd: "@SpringBootApplication",
          title: "إزاي Spring بيشغّل Tomcat ويوصّل الداتابيز من غير ما تكتب حاجة؟",
          desc: R`[[@SpringBootApplication]] على الـ main class بيجمع ٣ حاجات: [[@Configuration]] (الـ class ده ممكن يعرّف beans)، و [[@ComponentScan]] (دوّر في الـ package ده وتحته على classes عليها [[@Component]] و [[@Service]] و [[@RestController]]...)، و [[@EnableAutoConfiguration]].

الـ auto-configuration هي السحر: Spring Boot بيبص على المكتبات الموجودة والإعدادات، ويعمل الحاجات المعتادة لوحده. لقى Tomcat و Spring MVC؟ يشغّل web server. لقى driver وعنوان داتابيز؟ يعمل connection pool. وأي حاجة تعرّفها انت بنفسك بتكسب على الافتراضي.`,
          example: R`package com.example.tasks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TasksApplication {
  public static void main(String[] args) {
    SpringApplication.run(TasksApplication.class, args);
  }
}`,
          try: R`شغّل التطبيق بـ [[--debug]] ([[./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug]] أو [[java -jar app.jar --debug]]) ودوّر في اللوج على «CONDITIONS EVALUATION REPORT». لاقي [[DataSourceAutoConfiguration]] في أنهي قسم، وليه.`,
          flag: "script",
          deep: {
            why: R`في Spring القديم كنت بتكتب مئات السطور XML عشان توصّل كل حاجة. Boot بيعمل الافتراضي المعقول وانت بتغيّر اللي محتاجه بس. لكن لو مفهمتش الآلية، أول ما حاجة متشتغلش هتحس إنه سحر أسود.`,
            how: R`[[SpringApplication.run]] بيعمل الـ ApplicationContext: الحاوية اللي فيها كل الـ beans (الـ objects اللي Spring بيديرها). بيقرا الإعدادات، ويعمل scan للـ components، وبعدين يحمّل الـ auto-configurations.

كل auto-configuration class فيه شروط: [[@ConditionalOnClass(DataSource.class)]] (لو المكتبة موجودة)، و [[@ConditionalOnMissingBean]] (لو انت معملتش واحد)، و [[@ConditionalOnProperty]] (لو إعداد معين). عشان كده لو عرّفت [[@Bean ObjectMapper]] أو [[@Bean SecurityFilterChain]] بتاعك، الافتراضي بيتلغي.

والتقرير اللي بيطلع بـ [[--debug]] بيقسم الـ configurations لـ Positive matches (اشتغلت وليه) و Negative matches (مااشتغلتش وليه). ودي أداة التشخيص الأهم لما حاجة «مش بتتعمل لوحدها». وفي Actuator فيه endpoint [[/actuator/conditions]] بنفس المعلومات.`,
            when: R`كل تطبيق فيه واحد بس. وبتحتاج تفهمه لما: حاجة مش بتتعمل أوتوماتيك، أو عايز تلغي حاجة ([[@SpringBootApplication(exclude = ...)]])، أو bean متعرّف مرتين.`,
            mistakes: R`كذا class عليهم [[@SpringBootApplication]]. والـ main class في package أعمق من الكود ([[com.example.tasks.app]] والـ controllers في [[com.example.tasks.web]]) فالـ scan مش بيشوفهم. وتعمل [[exclude]] لـ auto-configuration عشان خطأ بدل ما تفهم الخطأ.

في الانترفيو: «Spring Boot بيعمل auto-configuration إزاي؟» الإجابة: conditional beans بتتحمّل من قايمة في الـ jars ([[META-INF/spring/...AutoConfiguration.imports]])، وشروط على الـ classpath والـ beans والـ properties، وكودك بيكسب.`
          },
          lines: [
            R`الـ package الأساسي: كل الكود تحته.`,
            R`[[SpringApplication]] اللي بيشغّل كل حاجة.`,
            "الـ annotation.",
            R`configuration و component scan و auto-configuration في annotation واحدة.`,
            "الـ class الرئيسي.",
            R`[[main]] العادي بتاع Java.`,
            R`بيعمل الـ context ويشغّل Tomcat، ويفضل شغال لحد ما توقفه.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في التقرير هتلاقي قسمين: Positive matches و Negative matches. في مشروعنا (فيه JPA و datasource) لقينا تحت Positive matches: [[DataSourceAutoConfiguration matched:]] وتحتها [[@ConditionalOnClass found required classes 'javax.sql.DataSource', ...]] و [[@ConditionalOnMissingBean (types: io.r2dbc.spi.ConnectionFactory ...) did not find any beans]].

ولو المشروع فيه Web بس: مش هتلاقي [[DataSourceAutoConfiguration]] في التقرير خالص. في Spring Boot 4 الـ auto-configurations اتقسمت على modules، و JDBC في module لوحده بييجي مع starter الـ JPA أو JDBC، فمن غيرهم الـ class مش موجود أصلًا عشان يتقيّم. في Boot 3 كنت هتلاقيه في Negative matches بسبب [[did not find required class]].

الدرس: كل حاجة Boot بيعملها ليها شرط مكتوب، والتقرير بيقولك بالظبط ليه اتعملت أو لأ. (الـ [[-Dspring-boot.run.arguments]] بيعدّي arguments للتطبيق من Maven.)`
        },
        {
          cmd: "beans و DI",
          title: "Spring بيعمل الـ objects ويوصّلها ببعض: dependency injection",
          desc: R`الـ bean object بيديره Spring: هو اللي بيعمله، وبيديله اللي محتاجه، وبيقفله في الآخر. بتقول لـ Spring «اعمل ده» بطريقتين: annotation على الـ class ([[@Service]] و [[@Component]] و [[@Repository]] و [[@RestController]])، أو method عليها [[@Bean]] جوه class عليه [[@Configuration]] (للـ objects من مكتبات مش بتاعتك، زي [[Clock]]).

والـ dependency injection: الـ class بيكتب اللي محتاجه في الـ constructor، و Spring بيدوّر على bean من النوع ده ويبعته. انت عمرك ما بتكتب [[new GreetingService(...)]]. ده نفس فكرة درس الـ interfaces في المستوى الأول، بس Spring هو اللي بيعمل الـ [[new]]. (لو استخدمت NestJS، نفس الفكرة بالظبط.)`,
          example: R`@Configuration
public class AppConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}

@Service
public class GreetingService {
    private final Clock clock;

    public GreetingService(Clock clock) {
        this.clock = clock;
    }

    public String greet(String name) {
        int hour = LocalTime.now(clock).getHour();
        return (hour < 12 ? "Good morning, " : "Good evening, ") + name;
    }
}

@RestController
public class HelloController {
    private final GreetingService greetings;

    public HelloController(GreetingService greetings) {
        this.greetings = greetings;
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "world") String name) {
        return greetings.greet(name);
    }
}`,
          try: R`اعمل الـ ٣ classes (كل واحد في ملف في الـ package الأساسي) وافتح [[localhost:8080/hello?name=Sara]]. وبعدين شيل [[@Service]] من GreetingService وشغّل: اقرا رسالة الخطأ كاملة. وأخيرًا اكتب unit test لـ [[GreetingService]] من غير Spring خالص، بـ [[Clock.fixed(...)]] الساعة ٩ الصبح.`,
          flag: "script",
          deep: {
            why: R`لو كل class بيعمل [[new]] للي محتاجه، مستحيل تبدّل حاجة في التست (الساعة، أو الـ payment gateway، أو الإيميل). الـ DI بيخلي كل class يطلب اللي محتاجه بس، فتقدر في التست تبعتله fake. ومعظم Spring (الـ transactions والـ security والـ caching) شغال عن طريق إن Spring هو اللي بيعمل الـ objects.`,
            how: R`وقت البداية Spring بيجمع تعريفات كل الـ beans، ويرتبهم حسب مين محتاج مين، ويعملهم. الـ constructor injection: لو فيه constructor واحد، Spring بيستخدمه لوحده من غير [[@Autowired]].

الـ beans افتراضيًا singleton: نسخة واحدة للتطبيق كله، مشتركة بين كل الـ requests (درس bean scopes في الانترفيو). عشان كده الحقول تبقى [[final]] ومفيش state بتتغير.

لو فيه أكتر من bean من نفس النوع (مثلًا اتنين implementations لـ [[PaymentGateway]])، Spring مش هيعرف يختار: [[NoUniqueBeanDefinitionException]]. الحل [[@Primary]] على واحد، أو [[@Qualifier("paymob")]] في الـ constructor، أو تطلب [[List<PaymentGateway>]] تاخدهم كلهم.

[[@Component]] و [[@Service]] و [[@Repository]] كلهم نفس الحاجة تقريبًا، الفرق في المعنى (و [[@Repository]] بيحوّل أخطاء الداتابيز لـ exceptions بتاعة Spring). و [[@RestController]] = [[@Controller]] + إن الرجوع يبقى JSON.`,
            when: R`[[@Service]] للـ business logic، و [[@RestController]] للـ HTTP، و [[@Repository]] (أو interfaces بتورث من JpaRepository، مش محتاجة annotation) للداتابيز. و [[@Bean]] للحاجات من مكتبات تانية أو اللي محتاجة إعداد (Clock، و HTTP client، و ObjectMapper مخصوص).`,
            mistakes: R`field injection: [[@Autowired private GreetingService greetings;]]: شائع في الكود القديم، بس بيخبي الـ dependencies وبيمنع [[final]] وبيصعّب التست من غير Spring؛ استخدم الـ constructor. و circular dependency (A محتاج B و B محتاج A): Spring Boot بيرفضها افتراضيًا، والحل تصميم أحسن مش [[@Lazy]]. وتعمل [[new MyService()]] بإيدك فتلاقي كل حاجة جواه null ومفيش transactions.`
          },
          lines: [
            R`[[@Configuration]]: class فيه تعريفات beans.`,
            "بداية الـ class.",
            R`[[@Bean]]: الـ method دي بترجع object، و Spring يسجّله كـ bean.`,
            R`الـ bean نوعه [[Clock]] (من Java نفسها) واسمه clock.`,
            "الساعة الحقيقية بتوقيت UTC.",
            "قفلة.",
            "قفلة.",
            R`[[@Service]]: Spring هيعمل object من الـ class ده.`,
            "بداية الـ class.",
            R`الـ dependency: [[final]] لأنها بتتحط مرة في الـ constructor.`,
            R`الـ constructor بيطلب Clock، و Spring بيبعت الـ bean اللي عرّفناه فوق.`,
            "بيحفظه.",
            "قفلة.",
            R`الـ business logic.`,
            R`الساعة من الـ Clock المحقون، مش من [[LocalTime.now()]] مباشرة، عشان التست يقدر يثبّتها.`,
            "الرسالة حسب الوقت.",
            "قفلة.",
            "قفلة.",
            R`[[@RestController]]: bean كمان، والـ methods بترجع body الـ response.`,
            "بداية.",
            "الـ dependency.",
            R`Spring بيحقن [[GreetingService]] هنا.`,
            "بيحفظه.",
            "قفلة.",
            R`[[GET /hello]] بيروح للـ method دي.`,
            R`[[?name=...]] من الـ URL، واختيارية بقيمة افتراضية.`,
            "بيسلّم الشغل للـ service.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[/hello?name=Sara]] بيرجع [[Good morning, Sara]] أو [[Good evening, Sara]] حسب الساعة بتوقيت UTC (مش توقيت مصر! ده بالظبط سبب إننا خلينا الـ Clock bean: تقدر تغيّره لـ [[Clock.system(ZoneId.of("Africa/Cairo"))]] في مكان واحد).

من غير [[@Service]]: التطبيق مش بيقوم، و [[APPLICATION FAILED TO START]] و [[Parameter 0 of constructor in ...HelloController required a bean of type '...GreetingService' that could not be found.]] ومعاها [[Action: Consider defining a bean of type ...]].

والتست تحت: مفيش Spring خالص، بس [[new]] وبتبعت ساعة ثابتة. بيشتغل في أجزاء من الثانية. ده مكسب الـ constructor injection.`,
          solCode: R`import static org.assertj.core.api.Assertions.assertThat;

import java.time.*;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void morningGreeting() {
        Clock nineAm = Clock.fixed(Instant.parse("2026-09-30T09:00:00Z"), ZoneOffset.UTC);
        var service = new GreetingService(nineAm);
        assertThat(service.greet("Sara")).isEqualTo("Good morning, Sara");
    }
}`
        }
      ]
    },
    {
      t: "REST APIs",
      l: 2,
      n: "controllers و routes، والـ request والـ response، والـ validation، والأخطاء بشكل موحّد",
      items: [
        {
          cmd: "@RestController",
          title: "تعمل endpoints بترجع JSON: GET و POST و PATCH و DELETE",
          desc: R`الـ controller class عليه [[@RestController]] و [[@RequestMapping("/api/tasks")]] (البادئة المشتركة). وكل method عليها [[@GetMapping]] أو [[@PostMapping]] أو [[@PatchMapping]] أو [[@DeleteMapping]]. زي [[router.get("/", handler)]] في Express، بس الـ route مكتوب فوق الـ method.

اللي الـ method بترجعه بيتحول لـ JSON لوحده بـ Jackson، و [[@RequestBody]] بيحوّل الـ JSON اللي جاي لـ object. مش محتاج [[res.json()]] ولا [[express.json()]]. والـ DTOs الأحسن تبقى records.`,
          example: R`@RestController
@RequestMapping("/api/tasks")
public class TaskController {
  private final TaskService service;

  public TaskController(TaskService service) {
    this.service = service;
  }

  @GetMapping
  public List<TaskResponse> open() {
    return service.open();
  }

  @PatchMapping("/{id}/done")
  public TaskResponse complete(@PathVariable long id) {
    return service.complete(id);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable long id) {
    service.delete(id);
  }
}`,
          try: R`اعمل [[record TaskResponse(Long id, String title, boolean done)]] و service فيه list في الذاكرة، وخلي الـ controller ده يشتغل. جرّب بـ [[curl -i]]: الـ GET، والـ PATCH على id موجود، والـ DELETE. الـ DELETE رجّع status كام و body إيه؟`,
          flag: "script",
          deep: {
            why: R`ده ٨٠٪ من شغل backend بـ Spring. ومعرفة إن الـ controller رفيع (بيستقبل ويسلّم للـ service) بيخلي الكود قابل للاختبار ومنظم، زي تقسيمة routes / controllers / services في «تاب Backend بـ Node».`,
            how: R`الـ DispatcherServlet (قلب Spring MVC) بيستقبل كل request، ويدوّر على الـ method اللي الـ path والـ HTTP method بتوعها يطابقوا، ويحوّل الباراميترات ([[@PathVariable]] من الـ path، و [[@RequestParam]] من الـ query، و [[@RequestBody]] من الـ body)، وينادي الـ method، ويحوّل الناتج لـ JSON بـ HttpMessageConverter.

الـ status الافتراضي 200. [[@ResponseStatus]] بيغيّره، و [[void]] مع 204 معناها مفيش body. ولو محتاج تتحكم في الـ status والـ headers حسب الحالة، رجّع [[ResponseEntity]] (الدرس الجاي).

Spring Boot 4 بيستخدم Jackson 3 (package [[tools.jackson]]). في الاستخدام العادي مش هتحس بفرق، بس لو بتعدّل إعدادات Jackson أو بتكتب serializers، الأسماء اتغيرت عن Jackson 2 ([[com.fasterxml.jackson]]).

وكل request شغال على thread من Tomcat، فالـ controllers والـ services (singletons) لازم يبقوا من غير state بتتغير.`,
            when: R`controller لكل resource ([[/api/tasks]] و [[/api/projects]]). الـ controller يستقبل ويعمل validation ويسلّم للـ service ويرجّع DTO. مفيش business logic ولا repositories جوه الـ controller.`,
            mistakes: R`ترجّع الـ JPA entity نفسه من الـ controller: بتكشف حقول مش المفروض تظهر، و Jackson ممكن يدخل في loop على العلاقات أو يعمل LazyInitializationException. رجّع DTO دايمًا. و [[@Controller]] بدل [[@RestController]]: Spring هيدوّر على view (صفحة HTML) باسم اللي رجّعته. وتنسى [[@RequestBody]] فالـ object يوصل فاضي كله null.`
          },
          lines: [
            R`controller بيرجع JSON.`,
            "البادئة لكل الـ routes في الـ class.",
            "بداية.",
            "الـ service محقون.",
            "constructor injection.",
            "بيحفظه.",
            "قفلة.",
            R`[[GET /api/tasks]].`,
            R`list بتتحول لـ JSON array لوحدها.`,
            "بيسلّم للـ service.",
            "قفلة.",
            R`[[PATCH /api/tasks/5/done]].`,
            R`[[@PathVariable]] بياخد [[{id}]] من الـ URL ويحوّله لـ long.`,
            "الـ service بيعلّم المهمة خلصت.",
            "قفلة.",
            R`[[DELETE /api/tasks/5]].`,
            R`204 بدل 200 الافتراضي.`,
            R`[[void]]: مفيش body.`,
            "المسح.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`GET بيرجع [[200]] و JSON array. PATCH على id موجود بيرجع [[200]] والـ task بـ [["done":true]]. DELETE بيرجع [[HTTP/1.1 204]] ومفيش body خالص.

ولو جربت [[PATCH /api/tasks/abc/done]]: 400 لأن [[abc]] مش long، و Spring رفضه قبل ما يوصل للـ method. ولو id مش موجود: غالبًا 500 لحد ما تعمل exception handling (درس ProblemDetail). ولو كتبت [[curl -X PUT]] على route مفيهوش PUT: [[405 Method Not Allowed]].`
        },
        {
          cmd: "ResponseEntity و @RequestParam",
          title: "تتحكم في الـ status والـ headers، وتقرا الـ query params",
          desc: R`[[ResponseEntity<T>]] بيخليك تحدد الـ status والـ headers والـ body مع بعض: [[ResponseEntity.created(uri).body(p)]] بيرجع 201 ومعاه [[Location]] header، و [[ResponseEntity.of(optional)]] بيرجع 200 لو فيه قيمة و 404 لو فاضي.

و [[@RequestParam]] بيقرا [[?minPrice=2000&size=10]] ويحوّله للنوع الصح، ومعاه [[defaultValue]] أو [[required = false]]. زي [[req.query]] في Express بس متحوّل ومتفحوص.`,
          example: R`@GetMapping
public List<Product> list(@RequestParam(defaultValue = "0") long minPrice,
                          @RequestParam(defaultValue = "20") int size) {
    return store.values().stream()
        .filter(p -> p.priceCents() >= minPrice)
        .sorted(Comparator.comparingLong(Product::id))
        .limit(Math.min(size, props.maxPageSize()))
        .toList();
}

@GetMapping("/{id}")
public ResponseEntity<Product> get(@PathVariable long id) {
    return ResponseEntity.of(Optional.ofNullable(store.get(id)));
}

@PostMapping
public ResponseEntity<Product> create(@Valid @RequestBody CreateProduct body) {
    var p = new Product(ids.incrementAndGet(), body.name(), body.priceCents());
    store.put(p.id(), p);
    return ResponseEntity.created(URI.create("/api/products/" + p.id())).body(p);
}`,
          try: R`ابعت POST بـ [[curl -i]] واتأكد من الـ 201 والـ Location. وبعدين [[GET /api/products?minPrice=abc]]: status كام؟ وبعدين [[GET /api/products/99]]: الـ body فيه إيه؟`,
          flag: "script",
          deep: {
            why: R`الـ status codes الصح جزء من الـ API contract: 201 للإنشاء، و 404 للمش موجود، و 204 للمسح. الـ frontend (و React Query) بيعتمد عليها، ورجوع 200 لكل حاجة بـ [[{"error": ...}]] جوه بيبوظ كل ده. تفاصيل الـ status codes في «تاب Backend بـ Node».`,
            how: R`[[ResponseEntity]] builder: [[ok(body)]] و [[created(uri)]] و [[noContent()]] و [[notFound()]] و [[status(HttpStatus.CONFLICT)]]، وبعدين [[.header(...)]] و [[.body(...)]] أو [[.build()]].

[[@RequestParam]] من غير [[defaultValue]] إجباري: لو مش موجود بيرجع 400. ولو النوع غلط ([[abc]] لـ long) برضه 400 (MethodArgumentTypeMismatchException). ونفس الكلام لـ [[@PathVariable]]. وتقدر تاخد كذا param مرة واحدة في record: [[list(ProductFilter filter)]] من غير annotation، و Spring بيملاه من الـ query بالأسماء.

في المثال حطينا [[Math.min(size, maxPageSize)]]: أي API فيه [[size]] من المستخدم لازم يبقى ليه حد أقصى، وإلا حد يطلب مليون صف. وفي Spring Data فيه [[Pageable]] جاهز بيقرا [[page]] و [[size]] و [[sort]] (درس JpaRepository).`,
            when: R`[[ResponseEntity]] لما الـ status أو الـ headers بيتغيروا حسب الحالة (POST، و GET ممكن 404، و caching headers). ولو الـ status ثابت، رجّع الـ object مباشرة وخليه أبسط. والـ 404 للـ resource المش موجود الأنضف تبقى exception بتتحول في مكان واحد (الدرس الجاي).`,
            mistakes: R`[[ResponseEntity<?>]] أو [[ResponseEntity<Object>]] في كل حتة فتخسر النوع في الـ docs والتستات. و [[return null]] من GET: Spring بيرجع 200 و body فاضي، والـ frontend يتلخبط. و [[@RequestParam]] لـ حاجة المفروض في الـ body (بيانات كتير أو حساسة، بتظهر في اللوجز).`
          },
          lines: [
            R`[[GET /api/products]].`,
            R`[[?minPrice=...]] اختياري، والافتراضي 0.`,
            R`[[?size=...]] اختياري، والافتراضي 20.`,
            "القيم من الـ store.",
            "فلتر بالسعر.",
            "ترتيب ثابت بالـ id.",
            R`حد أقصى من الإعدادات، مهما المستخدم طلب.`,
            "list.",
            "قفلة.",
            R`[[GET /api/products/5]].`,
            R`[[ResponseEntity<Product>]]: الـ status هيتحدد جوه.`,
            R`[[of(Optional)]]: 200 مع الـ body لو موجود، و 404 لو فاضي.`,
            "قفلة.",
            R`[[POST /api/products]].`,
            R`[[@Valid]] بيفحص الـ body (الدرس الجاي).`,
            R`[[AtomicLong]] للـ ids لأن requests كتير ممكن ييجوا في نفس الوقت.`,
            "بنحفظ.",
            R`201 و [[Location: /api/products/1]] والـ object في الـ body.`,
            "قفلة."
          ],
          sol: R`الـ POST: [[HTTP/1.1 201]] و [[Location: /api/products/1]] و [[{"id":1,"name":"Pen","priceCents":1500}]].

[[?minPrice=abc]]: [[400 Bad Request]]، لأن abc متتحولش لـ long. من غير إعدادات الـ body شكل Spring الافتراضي ([[timestamp]] و [[status]] و [[error]] و [[path]])، ومع ProblemDetail هيبقى [[Failed to convert 'minPrice' with value: 'abc']] (الدرس بعد الجاي).

[[/api/products/99]]: [[HTTP/1.1 404]] و body فاضي، لأن [[ResponseEntity.of]] بيعمل [[notFound().build()]]. لو عايز رسالة، ارمي exception وحوّلها لـ ProblemDetail.`
        },
        {
          cmd: "Jakarta Validation",
          title: "ترفض الـ request الغلط قبل ما يوصل للـ service",
          desc: R`بتحط constraints على حقول الـ DTO: [[@NotBlank]] و [[@Size(max = 200)]] و [[@Email]] و [[@Positive]] و [[@NotNull]] و [[@Min]] و [[@Pattern]]. وفي الـ controller بتكتب [[@Valid]] قبل [[@RequestBody]]. لو الـ body فيه أي غلط، Spring بيرجع 400 من غير ما الـ method تتنادى أصلًا.

ده زي [[z.object(...)]] مع [[safeParse]] في Zod، بس الـ schema هو الـ record نفسه. محتاج starter [[spring-boot-starter-validation]]، والـ annotations من [[jakarta.validation.constraints]].`,
          example: R`public record CreateTaskRequest(
    @NotBlank @Size(max = 200) String title,
    @NotNull Long projectId) {}

record SignupRequest(
    @NotBlank @Email String email,
    @Size(min = 8, max = 72) String password,
    @Min(13) int age) {}

@PostMapping
public ResponseEntity<TaskResponse> create(@Valid @RequestBody CreateTaskRequest req) {
  TaskResponse created = service.create(req);
  return ResponseEntity.created(URI.create("/api/tasks/" + created.id())).body(created);
}`,
          try: R`ابعت [[{"title":"","projectId":null}]] وشوف الرد. وبعدين شيل [[@Valid]] وابعت نفس الـ body: وصل لحد فين؟ وأخيرًا جرّب [[{"title":"x"}]] من غير projectId خالص، و [[{"title":"x","projectId":"abc"}]]: الاتنين نفس الخطأ؟`,
          flag: "script",
          deep: {
            why: R`أي داتا جاية من برّه لازم تتفحص في الحدود، زي ما اتعلمت في Zod («تاب TypeScript»). الـ validation في الـ controller بيخلي الـ service يفترض إن الداتا سليمة الشكل، ويركّز على قواعد الـ business (المشروع موجود؟ الإيميل متكرر؟).`,
            how: R`Hibernate Validator (التنفيذ الافتراضي لـ Jakarta Validation) بيقرا الـ annotations. [[@Valid]] على الباراميتر بيشغّله، ولو فيه أخطاء Spring بيرمي [[MethodArgumentNotValidException]] ومعاها كل الأخطاء (مش أول واحد بس)، وبتتحول لـ 400.

الفرق بين الثلاثة: [[@NotNull]] مش null بس ([[""]] يعدّي)، و [[@NotEmpty]] مش null ولا فاضي، و [[@NotBlank]] (للنصوص) مش null ولا فاضي ولا مسافات بس.

لاحظ [[Long projectId]] مش [[long]]: الـ primitive مستحيل يبقى null، فلو الحقل مش موجود في الـ JSON هيبقى 0 و [[@NotNull]] مش هتمسكه. عشان كده الـ wrapper مع [[@NotNull]].

[[{"projectId":"abc"}]] خطأ مختلف: JSON مش بيتحول أصلًا ([[HttpMessageNotReadableException]])، وده قبل الـ validation. الاتنين 400 بس بـ exceptions مختلفة ورسايل مختلفة.

وتقدر تعمل validation على [[@PathVariable]] و [[@RequestParam]] بـ constraints مباشرة، وفي Spring 6.1+ ده built-in. وعلى [[@ConfigurationProperties]] بـ [[@Validated]] (درس الإعدادات).`,
            when: R`كل request body وكل input من المستخدم. القواعد اللي محتاجة داتابيز (الإيميل مش متكرر، المشروع موجود) في الـ service وترمي exception مناسبة (409 أو 404)، مش annotation.`,
            mistakes: R`تنسى [[@Valid]] فالـ annotations متشتغلش خالص من غير أي تحذير. و [[@NotNull]] على [[int]]. و [[@Size]] على password من غير max: bcrypt بيتجاهل بعد ٧٢ byte، وكمان حد يبعت ميجا. وتعتمد على الـ validation في الـ frontend بس.`
          },
          lines: [
            "DTO الإنشاء.",
            R`[[@NotBlank]] مش فاضي ولا مسافات، و [[@Size]] حد أقصى زي العمود في الداتابيز.`,
            R`[[Long]] wrapper عشان null تتمسك.`,
            "مثال تاني: تسجيل.",
            "إيميل بشكل صحيح.",
            R`طول الباسورد: ٨ لـ ٧٢ (حد bcrypt).`,
            R`[[@Min]] على رقم.`,
            R`[[POST /api/tasks]].`,
            R`[[@Valid]]: افحص قبل ما تنادي الـ method.`,
            "لو وصلنا هنا يبقى الشكل سليم.",
            "201 مع Location.",
            "قفلة."
          ],
          sol: R`مع [[@Valid]]: [[400]]، والـ body حسب إعداداتك. في المشروع اللي بنبنيه (بعد الدرس الجاي) بيرجع:

[[{"detail":"Invalid request content.","status":400,"title":"Bad Request","errors":{"title":"must not be blank","projectId":"must not be null"}}]]

الغلطتين مع بعض، مش أول واحدة بس.

من غير [[@Valid]]: الـ request بيوصل للـ service، و [[findById(null)]] بيرمي exception (غالبًا 500)، أو أسوأ: task بعنوان فاضي بتتحفظ لو مفيش NOT NULL في الداتابيز.

[[{"title":"x"}]]: [[projectId]] بقى null و [[@NotNull]] مسكته (validation error، [["projectId":"must not be null"]]). أما [["projectId":"abc"]] فـ Jackson فشل يحوّل أصلًا، والرد [["detail":"Failed to read request"]] من غير [[errors]]. الاتنين 400، بس لازم تفرّق بينهم وانت بتقرا اللوج.`
        },
        {
          cmd: "ProblemDetail و @RestControllerAdvice",
          title: "كل الأخطاء ترجع بشكل واحد مفهوم، من مكان واحد",
          desc: R`[[@RestControllerAdvice]] class بيمسك الـ exceptions من كل الـ controllers. كل method عليها [[@ExceptionHandler(NotFoundException.class)]] بتحوّل نوع exception لـ response. زي error middleware في Express، بس لكل نوع handler.

والشكل: [[ProblemDetail]] هو معيار RFC 9457 للأخطاء في HTTP APIs: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]، وتقدر تضيف حقول زيادة. ولو الـ class ورث من [[ResponseEntityExceptionHandler]]، كل أخطاء Spring الجاهزة (validation، و JSON بايظ، و method مش مسموحة) بترجع ProblemDetail هي كمان.`,
          example: R`public class NotFoundException extends RuntimeException {
  public NotFoundException(String what, Object id) {
    super(what + " " + id + " not found");
  }
}

@RestControllerAdvice
public class ApiErrors extends ResponseEntityExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ProblemDetail notFound(NotFoundException ex) {
    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    pd.setTitle("Not Found");
    return pd;
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
        .collect(Collectors.toMap(e -> e.getField(), e -> e.getDefaultMessage(), (a, b) -> a));
    ProblemDetail pd = ex.getBody();
    pd.setProperty("errors", errors);
    return ResponseEntity.badRequest().body(pd);
  }
}`,
          try: R`اعمل [[ConflictException]] وخلي الـ service يرميها لو فيه project بنفس الاسم، وضيف handler يرجّع 409. وجرّب كمان تبعت JSON بايظ ([[{bad]]): الرد شكله إيه؟`,
          flag: "script",
          deep: {
            why: R`من غير كده كل exception بيبقى 500 أو شكل مختلف حسب مين رماها، والـ frontend يكتب ٥ طرق يقرا بيها الخطأ. مكان واحد يعني: شكل واحد، و status صح، ومفيش stack traces بتتسرب للمستخدم.`,
            how: R`لما method في controller ترمي exception، Spring بيدوّر على [[@ExceptionHandler]] مناسب (الأخص أولًا): الأول جوه نفس الـ controller، وبعدين في الـ advices. لو لقى، بياخد اللي رجع ويعمله response. لو ملقاش، الخطأ بيروح لـ [[/error]] (BasicErrorController) وبيرجع 500 بالشكل الافتراضي.

[[ResponseEntityExceptionHandler]] فيه handlers جاهزة لكل exceptions الـ MVC، وكلها بترجع ProblemDetail، وتقدر تعمل override لأي واحد زي ما عملنا في [[handleMethodArgumentNotValid]] عشان نضيف [[errors]] لكل حقل. (بديل أبسط من غير advice: [[spring.mvc.problemdetails.enabled=true]] في الإعدادات بيفعّل ProblemDetail للأخطاء الجاهزة، بس من غير [[errors]] بتاعتنا.)

و [[Content-Type]] للـ ProblemDetail بيبقى [[application/problem+json]].

فخ مع Spring Security: لو الخطأ مااتمسكش ووصل لـ [[/error]]، والـ security قافل كل الـ paths، الـ [[/error]] نفسه بيتقفل والـ client ياخد 401 أو 403 بدل 400 أو 500. حصلت معانا وإحنا بنجرّب المشروع: validation error كان بيرجع 403. الحل: [[permitAll]] على [[/error]]، أو إن كل الأخطاء تتمسك في الـ advice.`,
            when: R`في كل API: advice واحد، و exceptions ليها معنى ([[NotFoundException]] ← 404، و [[ConflictException]] ← 409، و [[ForbiddenException]] ← 403)، و handler أخير لـ [[Exception.class]] بيعمل log ويرجع 500 برسالة عامة.`,
            mistakes: R`[[try/catch]] في كل controller method. و [[ex.getMessage()]] من exception مش بتاعتك في الـ response (ممكن يكشف SQL أو أسماء جداول). و handler لـ [[Exception.class]] من غير log فالـ 500 يحصل ومحدش يعرف ليه. ونسيان الـ [[/error]] مع Security.`
          },
          lines: [
            R`exception بتاعنا، unchecked.`,
            R`بياخد نوع الحاجة والـ id.`,
            R`رسالة زي [[project 99 not found]].`,
            "قفلة.",
            "قفلة.",
            R`advice لكل الـ controllers، والرجوع JSON.`,
            R`بيورث handlers جاهزة لأخطاء Spring كلها بشكل ProblemDetail.`,
            R`الـ method دي للنوع ده بس.`,
            R`بترجع [[ProblemDetail]] و Spring بيحوّله لـ JSON و status.`,
            "404 والرسالة.",
            "عنوان قصير.",
            "رجوع.",
            "قفلة.",
            R`[[@Override]]: بنغيّر الـ handler الجاهز للـ validation.`,
            "الـ signature بتاعه.",
            "الباراميترات من الأب.",
            R`نجمع خطأ لكل حقل: map من اسم الحقل للرسالة.`,
            R`[[toMap]]، و [[(a, b) -> a]] لو الحقل فيه أكتر من خطأ خد الأول.`,
            "الـ ProblemDetail اللي Spring جهزه.",
            R`حقل زيادة [[errors]].`,
            "400 والـ body.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الحل تحت. لما تعمل project بنفس الاسم مرتين: [[409]] و [[{"detail":"project Website already exists","status":409,"title":"Conflict",...}]].

والـ JSON البايظ ([[{bad]]): بيوصل لـ handler جاهز في [[ResponseEntityExceptionHandler]]، والرد [[{"detail":"Failed to read request","instance":"/api/tasks","status":400,"title":"Bad Request"}]]. مفيش stack trace ولا تفاصيل Jackson، وده المطلوب.

(كمان فيه قيد unique على الاسم في الداتابيز: لو اتنين طلبات جم في نفس اللحظة، الفحص في الـ service ممكن يعدّي للاتنين، والداتابيز هي اللي هترمي [[DataIntegrityViolationException]]. ضيف handler ليها برضه يرجع 409.)`,
          solCode: R`public class ConflictException extends RuntimeException {
  public ConflictException(String message) { super(message); }
}

// في ApiErrors:
@ExceptionHandler(ConflictException.class)
public ProblemDetail conflict(ConflictException ex) {
  return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
}

// في ProjectService:
@Transactional
public Project create(String name) {
  if (projects.findByName(name).isPresent())
    throw new ConflictException("project " + name + " already exists");
  return projects.save(new Project(name));
}`
        }
      ]
    },
    {
      t: "الإعدادات والـ profiles",
      l: 2,
      n: "application.yaml، وقراية الإعدادات في class متفحوص، والـ env vars، وإعدادات dev و prod",
      items: [
        {
          cmd: "application.yaml و @ConfigurationProperties",
          title: "الإعدادات بتتكتب فين، وتقراها إزاي من الكود بأمان؟",
          desc: R`[[src/main/resources/application.yaml]] (أو [[.properties]]) فيه إعدادات Spring ([[server.port]] و [[spring.datasource.url]]) وإعداداتك انت. وأي إعداد ممكن يتغير من environment variable: [[shop.max-page-size]] يبقى [[SHOP_MAX_PAGE_SIZE]]، و [[$__{DB_PASSWORD:secret}]] يعني خد الـ env var ولو مش موجود استخدم secret.

وعشان تقرا إعداداتك: record عليه [[@ConfigurationProperties(prefix = "shop")]] بيتملي لوحده، وبـ [[@Validated]] التطبيق مش هيقوم لو إعداد غلط. زي ملف [[config.js]] بـ Zod في «تاب Backend بـ Node».`,
          example: R`server:
  port: 8081
shop:
  currency: EGP
  max-page-size: 50
  support-email: $__{SUPPORT_EMAIL:help@example.com}
# والـ Java:
# @Validated
# @ConfigurationProperties(prefix = "shop")
# public record ShopProperties(@NotBlank String currency, @Max(100) int maxPageSize, String supportEmail) {}
# وعلى الـ main class: @ConfigurationPropertiesScan`,
          try: R`اعمل [[ShopProperties]] وحقنه في controller يرجّعه على [[/api/config]]. شغّل عادي، وبعدين [[SHOP_MAX_PAGE_SIZE=500 java -jar target/*.jar]]. التطبيق قام؟ وبعدين [[SHOP_MAX_PAGE_SIZE=30]]: الـ endpoint رجّع كام؟`,
          flag: "script",
          deep: {
            why: R`نفس الـ jar لازم يشتغل في dev و staging و prod بإعدادات مختلفة من غير ما يتعمل build تاني (12-factor). والأسرار (باسورد الداتابيز، و JWT secret) مينفعش تبقى في الكود ولا في Git.`,
            how: R`Spring بيجمع الإعدادات من مصادر كتير بترتيب أولوية، الأعلى بيكسب: arguments ([[--server.port=9090]]) ثم environment variables ثم [[application-{profile}.yaml]] ثم [[application.yaml]] ثم القيم الافتراضية.

relaxed binding: [[max-page-size]] في yaml، و [[maxPageSize]] في Java، و [[SHOP_MAXPAGESIZE]] أو [[SHOP_MAX_PAGE_SIZE]] في الـ env، كلهم نفس الإعداد.

[[@ConfigurationProperties]] على record بيعمل bind بالـ constructor، و [[@ConfigurationPropertiesScan]] على الـ main class بيلاقي كل الـ records دي ويعملهم beans. و [[@Validated]] مع annotations الـ validation بيفحص وقت البداية.

البديل القديم [[@Value("$__{shop.currency}")]] على حقل: شغال بس مفيش validation، والإعدادات متفرقة في كل الكود، وغلطة إملائية في الاسم بتطلع وقت التشغيل.

وفي yaml الـ indentation مهمة (مسافات مش tabs)، والـ [[---]] بيفصل documents في نفس الملف (الدرس الجاي).`,
            when: R`أي قيمة ممكن تختلف بين البيئات أو تتغير من غير كود: URLs، وحدود، ومفاتيح، ومهلات. والأسرار من env vars أو secret manager، والملف فيه بس الـ placeholder.`,
            mistakes: R`باسورد حقيقي في [[application.yaml]] ومترفوع على Git. و [[@Value]] متكررة في ٢٠ class. وتنسى [[@Validated]] فالتطبيق يقوم بإعداد غلط ويقع أول ما حد يستخدمه. و tabs في yaml.`
          },
          lines: [
            "إعدادات الـ server.",
            "البورت (الافتراضي 8080).",
            R`إعداداتنا تحت prefix [[shop]].`,
            "العملة.",
            R`بـ kebab-case في yaml، وبتتربط بـ [[maxPageSize]] في Java.`,
            R`من الـ env var [[SUPPORT_EMAIL]] ولو مش موجود القيمة بعد [[:]].`
          ],
          sol: R`مع [[SHOP_MAX_PAGE_SIZE=500]] التطبيق مش بيقوم، والرسالة:

[[APPLICATION FAILED TO START]]
[[Binding to target com.example.shop.ShopProperties failed:]]
[[Property: shop.maxPageSize]]، [[Value: "500"]]، [[Origin: System Environment Property "SHOP_MAX_PAGE_SIZE"]]، [[Reason: must be less than or equal to 100]].

لاحظ إن الرسالة قالتلك الإعداد جه منين بالظبط. أحسن بكتير من إن التطبيق يقوم ويقع بعد ساعة.

ومع [[SHOP_MAX_PAGE_SIZE=30]]: الـ endpoint بيرجع [["maxPageSize":30]]: الـ env var كسبت على الـ yaml.`,
          solCode: R`@RestController
public class ConfigController {
    private final ShopProperties props;
    public ConfigController(ShopProperties props) { this.props = props; }

    @GetMapping("/api/config")
    public ShopProperties config() { return props; }
}`
        },
        {
          cmd: "profiles",
          title: "إعدادات مختلفة لـ dev و prod و test",
          desc: R`الـ profile اسم لمجموعة إعدادات: [[dev]] و [[prod]] و [[test]]. بتكتب الإعدادات الخاصة بيه في [[application-dev.yaml]]، أو في نفس الملف بعد [[---]] مع [[spring.config.activate.on-profile: dev]]، وبتفعّله بـ [[SPRING_PROFILES_ACTIVE=dev]] أو [[--spring.profiles.active=dev]].

الإعدادات الخاصة بالـ profile بتكسب على العامة، واللي مش مكتوب فيها بياخد العام. وتقدر كمان تخلي bean يتعمل في profile معين بس بـ [[@Profile("dev")]].`,
          example: R`shop:
  max-page-size: 50
---
spring:
  config:
    activate:
      on-profile: dev
shop:
  max-page-size: 5
logging:
  level:
    org.springframework.web: debug`,
          try: R`شغّل بـ [[--spring.profiles.active=dev]]، ودوّر في أول اللوج على السطر اللي بيقول الـ profile. ضيف ٧ products واطلب [[?size=20]]: رجع كام؟ وبعدين شغّل من غير profile واطلب تاني.`,
          flag: "script",
          deep: {
            why: R`في dev عايز SQL في اللوج وداتابيز محلية وبيانات تجريبية، وفي prod لأ. من غير profiles هتلاقي نفسك بتعلّق وتشيل تعليق قبل كل deploy.`,
            how: R`لما profile يتفعّل، Spring بيحمّل [[application.yaml]] الأول، وبعدين إعدادات الـ profile فوقه. وممكن أكتر من profile مع بعض ([[dev,local]])، والأخير بيكسب لو فيه تعارض.

[[@Profile("dev")]] على [[@Component]] أو [[@Bean]]: الـ bean ده يتعمل بس لو الـ profile شغال، وتقدر تكتب [[@Profile("!prod")]]. مفيد لـ seed data أو fake email sender في dev.

في التستات [[@ActiveProfiles("test")]] بيفعّل profile للتست.

الـ env vars تقدر تكسب على أي profile، فالأسرار في prod بتيجي من الـ env مش من [[application-prod.yaml]].`,
            when: R`dev للجهاز المحلي، و prod للإنتاج، و test للتستات لو محتاجة إعدادات خاصة. متعملش profile لكل سيرفر: الفرق بين السيرفرات يبقى env vars.`,
            mistakes: R`profile [[prod]] فيه أسرار في ملف في Git. ومنطق business بيتغير حسب profile ([[if (env.acceptsProfiles("prod"))]] جوه الكود): التست بيختبر حاجة غير الإنتاج. ونسيان تفعيل profile في الـ Docker فالتطبيق يشتغل بإعدادات dev في الإنتاج.`
          },
          lines: [
            "الإعداد العام.",
            "الافتراضي 50.",
            R`[[---]]: document جديد في نفس الملف.`,
            "إعدادات Spring.",
            "config.",
            "شرط التفعيل.",
            R`الـ document ده بيتطبق بس لما [[dev]] شغال.`,
            "إعداداتنا.",
            "في dev: ٥ بس (عشان تجرّب الـ pagination بداتا قليلة).",
            "اللوج.",
            "المستويات.",
            "تفاصيل كل request في dev."
          ],
          sol: R`اللوج بيقول [[The following 1 profile is active: "dev"]]. ومع ٧ products و [[?size=20]] بيرجع ٥ بس، لأن [[max-page-size]] في dev بـ 5، والكود بياخد الأصغر بين size والحد.

من غير profile: [[No active profile set, falling back to 1 default profile: "default"]]، والطلب بيرجع السبعة (الحد 50).`
        }
      ]
    },
    {
      t: "Spring Data JPA و PostgreSQL",
      l: 2,
      n: "entities و repositories، والعلاقات، و N+1، والـ transactions، والـ migrations بـ Flyway",
      items: [
        {
          cmd: "@Entity",
          title: "class بيتحوّل لجدول: الـ entity وتوصيل PostgreSQL",
          desc: R`الـ entity class عليه [[@Entity]]، وكل object منه صف في جدول. [[@Id]] للـ primary key، و [[@GeneratedValue(strategy = GenerationType.IDENTITY)]] لو الداتابيز بتولّده ([[bigserial]] أو identity)، و [[@Column]] لتفاصيل العمود. Hibernate (تنفيذ JPA) هو اللي بيكتب الـ SQL.

الاتصال في [[application.yaml]]: [[spring.datasource.url]] و [[username]] و [[password]]، ولو الـ driver موجود Boot بيعمل connection pool (HikariCP) لوحده. زي Prisma schema، بس الجدول بيتوصف بـ class. أساسيات SQL نفسها في «تاب SQL و Prisma».`,
          example: R`spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tasks
    username: app
    password: $__{DB_PASSWORD:secret}
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
# والـ entity:
# @Entity
# public class Task {
#   @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
#   @Column(nullable = false, length = 200) private String title;
#   private boolean done;
#   protected Task() {}
#   public Task(String title) { this.title = title; }
# }`,
          try: R`اعمل داتابيز وجدول [[task]] بالـ SQL (أو استنى درس Flyway)، وشغّل التطبيق بـ [[ddl-auto: validate]]. وبعدين غيّر اسم حقل في الـ entity ([[title]] لـ [[name]]) وشغّل: إيه اللي حصل؟ وليه ده أحسن من [[ddl-auto: update]]؟`,
          flag: "script",
          deep: {
            why: R`أغلب تطبيقات Spring بتكلم داتابيز relational بـ JPA. لازم تفهم إن فيه ORM بيكتب SQL بدالك، وإمتى بيكتب SQL وحش، عشان متتفاجئش في الإنتاج.`,
            how: R`Hibernate بيقرا الـ annotations ويعمل mapping: اسم الـ class للجدول والحقول للأعمدة (camelCase بيتحول لـ snake_case: [[createdAt]] ← [[created_at]]). والـ entity محتاج constructor من غير باراميترات (ممكن [[protected]]) عشان Hibernate يعمل objects وهو بيقرا، وميبقاش [[final]] ولا record، لأن Hibernate بيعمل subclass (proxy) للـ lazy loading.

الـ persistence context: جوه الـ transaction، Hibernate فاكر كل entity اتحمّل، ولو غيّرت حقل بيكتب [[UPDATE]] لوحده في الآخر (dirty checking، درس @Transactional).

[[ddl-auto]]: [[create-drop]] (يعمل الجداول ويمسحها، للتجارب)، و [[update]] (يحاول يعدّل الجداول، خطر)، و [[validate]] (يتأكد إن الـ entities مطابقة للجداول ويقع لو لأ)، و [[none]]. في مشروع حقيقي الجداول بتتعمل بـ migrations (Flyway) و ddl-auto يبقى [[validate]] أو [[none]].

[[open-in-view: false]]: Spring Boot افتراضيًا بيسيب الـ session مفتوحة طول الـ request (عشان lazy loading يشتغل في الـ controller)، وبيطبع warning. قفله: أداء أحسن ومشاكل أوضح (درس LazyInitializationException في الانترفيو).

وفي Spring Boot 4 الـ Hibernate 7.x و Jakarta Persistence 3.2 (الـ imports [[jakarta.persistence.*]]).`,
            when: R`للـ CRUD والعلاقات والـ business logic العادي. للتقارير المعقدة أو queries فيها window functions، SQL مباشر ([[@Query(nativeQuery = true)]] أو [[JdbcClient]]) أبسط وأسرع.`,
            mistakes: R`[[ddl-auto: update]] في الإنتاج: مبيمسحش أعمدة ولا بيعمل migrations حقيقية، ومحدش عارف الـ schema الحقيقي إيه. و [[int]] للـ id بدل [[Long]] (الـ id null قبل الحفظ). وتنسى الـ constructor الفاضي: [[No default constructor for entity]]. و [[equals]] و [[hashCode]] على كل الحقول في entity (درس equals في الانترفيو).`
          },
          lines: [
            "إعدادات Spring.",
            R`الـ datasource: Boot بيعمل HikariCP pool منه.`,
            R`JDBC URL: [[jdbc:postgresql://host:port/db]].`,
            "اليوزر.",
            R`من env var، والقيمة الافتراضية للتطوير بس.`,
            "إعدادات JPA.",
            R`متسيبش الـ session مفتوحة طول الـ request.`,
            "Hibernate.",
            R`[[validate]]: اتأكد إن الـ entities مطابقة للجداول، ومتعدّلش حاجة.`
          ],
          sol: R`مع [[validate]] والجدول مطابق: التطبيق بيقوم عادي. ولما تغيّر [[title]] لـ [[name]]: التطبيق مش بيقوم، والخطأ فيه [[Schema-validation: missing column [name] in table [task]]]. ده بالظبط اللي عايزه: الغلط بان وقت البداية على جهازك.

مع [[update]] كان Hibernate هيضيف عمود [[name]] جديد جنب [[title]] القديم (مش هيغيّر الاسم)، وممكن يفشل لو فيه صفوف والعمود NOT NULL، و [[title]] القديم هيفضل بالداتا بتاعته. في الإنتاج دي كارثة صغيرة محدش هياخد باله منها. الـ migrations بتخليك تكتب [[ALTER TABLE task RENAME COLUMN title TO name;]] بنفسك وتتراجع قبل ما تتنفذ.`
        },
        {
          cmd: "JpaRepository",
          title: "CRUD من غير SQL، و queries من اسم الـ method",
          desc: R`بتعمل interface بيورث [[JpaRepository<Task, Long>]] (نوع الـ entity ونوع الـ id)، و Spring Data بيعمل التنفيذ وقت التشغيل. جاهز فيه: [[save]] و [[findById]] (بترجع Optional) و [[findAll]] و [[deleteById]] و [[existsById]] و [[count]].

وأي method تكتبها باسم بقواعد معينة بتتحول لـ query: [[findByProjectIdAndDone(Long projectId, boolean done, Pageable p)]] ← [[WHERE project_id = ? AND done = ?]] مع pagination. وللي أعقد [[@Query]] بـ JPQL (SQL بأسماء الـ classes والحقول).`,
          example: R`public interface TaskRepository extends JpaRepository<Task, Long> {
  Page<Task> findByProjectIdAndDone(Long projectId, boolean done, Pageable pageable);

  long countByDoneFalse();

  @Query("select t from Task t join fetch t.project where t.done = false")
  List<Task> findOpenWithProject();
}
public interface ProjectRepository extends JpaRepository<Project, Long> {
  Optional<Project> findByName(String name);
}
// الاستخدام:
// tasks.findByProjectIdAndDone(1L, false, PageRequest.of(0, 20, Sort.by("id").descending()));`,
          try: R`ضيف [[List<Task> findByTitleContainingIgnoreCase(String part)]] واستخدمها في endpoint بحث. شغّل مع [[logging.level.org.hibernate.SQL: debug]] وشوف الـ SQL اللي اتكتب. وبعدين اكتب method باسم غلط ([[findByTitel]]) وشغّل.`,
          flag: "script",
          deep: {
            why: R`٧٠٪ من الـ queries بتاعة أي CRUD API بسيطة: هات بالـ id، هات بشرط، عدّ، اعمل pagination. Spring Data بيخليك متكتبهاش، وتركز وقتك على الـ queries الصعبة.`,
            how: R`وقت البداية Spring Data بيعمل proxy للـ interface، وبيحلل اسم كل method: [[find...By]] و [[count...By]] و [[exists...By]] و [[delete...By]]، وبعدين شروط بالحقول مع [[And]] و [[Or]] و [[Containing]] و [[IgnoreCase]] و [[GreaterThan]] و [[In]] و [[OrderBy...Desc]]. لو اسم حقل غلط، التطبيق مش بيقوم (الخطأ بدري).

[[Pageable]] (من [[PageRequest.of(page, size, sort)]]) بيضيف [[LIMIT]] و [[OFFSET]] و [[ORDER BY]]، و [[Page<T>]] بيرجع العناصر والعدد الكلي (بـ query عدّ زيادة). ولو مش محتاج العدد، [[Slice<T>]] أرخص. وفي الـ controller تقدر تاخد [[Pageable pageable]] كباراميتر و Spring يملاه من [[?page=0&size=20&sort=id,desc]].

[[@Query]] بـ JPQL: [[select t from Task t]] بأسماء الـ entities مش الجداول، وفيه [[join fetch]] (درس N+1). ولو محتاج SQL حقيقي: [[nativeQuery = true]].

و [[save]] على entity جديد (id null) بيعمل INSERT، وعلى موجود بيعمل merge. بس جوه transaction، تعديل entity محمّل مش محتاج save أصلًا (dirty checking).`,
            when: R`derived queries للشروط البسيطة (لحد ٢ أو ٣ شروط). [[@Query]] لما الاسم يطول أو محتاج join. و Specifications أو Querydsl للبحث بفلاتر ديناميكية كتير.`,
            mistakes: R`اسم method طوله ٨٠ حرف: اكتب [[@Query]]. و [[findAll()]] على جدول فيه مليون صف. و [[Page]] على جدول كبير جدًا: query العدّ بيبقى بطيء، والحل keyset pagination (درس keyset pagination في «تاب SQL و Prisma»). و [[findById(id).get()]].`
          },
          lines: [
            R`النوعين: Task و Long. ومفيش annotation ولا class تنفيذ.`,
            R`derived query: [[WHERE project_id = ? AND done = ?]] مع limit و offset.`,
            R`[[SELECT count(*) ... WHERE done = false]].`,
            R`JPQL: الـ entity [[Task]] وحقله [[project]] مش أسماء الجداول.`,
            "المهام المفتوحة ومعاها المشروع في query واحد.",
            "قفلة.",
            "repository تاني.",
            R`[[Optional]] لأنه ممكن ميلاقيش.`,
            "قفلة."
          ],
          sol: R`اللوج هيطبع حاجة زي:

[[select t1_0.id, t1_0.created_at, t1_0.done, t1_0.project_id, t1_0.title from task t1_0 where upper(t1_0.title) like upper(?) escape '\']]

Spring Data حط [[%part%]] في الـ parameter لوحده (Containing)، و [[upper]] على الطرفين (IgnoreCase). في PostgreSQL ده مش هيستخدم index عادي؛ لو الجدول كبير اعمل index على [[lower(title)]] أو استخدم full-text search.

والاسم الغلط [[findByTitel]]: التطبيق مش بيقوم، والخطأ فيه [[No property 'titel' found for type 'Task']].`
        },
        {
          cmd: "العلاقات",
          title: "مشروع فيه مهام كتير: @ManyToOne و @OneToMany",
          desc: R`[[@ManyToOne]] على الطرف اللي فيه الـ foreign key (كل Task ليها Project واحد)، و [[@JoinColumn(name = "project_id")]] اسم العمود. و [[@OneToMany(mappedBy = "project")]] على الطرف التاني لو محتاج تمشي من المشروع للمهام، و [[mappedBy]] معناها «العلاقة دي متعرّفة في الناحية التانية، أنا مرآة بس».

دايمًا [[fetch = FetchType.LAZY]] على [[@ManyToOne]] (الافتراضي EAGER وده فخ)، و [[@OneToMany]] lazy افتراضيًا. والـ helper method ([[addTask]]) بتظبط الطرفين مع بعض. الأساس النظري (one-to-many و foreign keys) في «تاب SQL و Prisma».`,
          example: R`@Entity
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String name;

  @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Task> tasks = new ArrayList<>();

  public void addTask(Task task) {
    tasks.add(task);
    task.setProject(this);
  }
}

@Entity
public class Task {
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  private Project project;
}`,
          try: R`اعمل [[project.getTasks().add(task)]] من غير [[task.setProject(project)]] واعمل save: إيه اللي حصل في الداتابيز؟ وبعدين امسح task من [[project.getTasks()]] جوه transaction: الصف اتمسح؟ (فكّر في [[orphanRemoval]].)`,
          flag: "script",
          deep: {
            why: R`العلاقات هي أكتر حتة بتلخبط في JPA: bugs زي «الـ foreign key بيتحفظ null» أو «بيجيب الداتابيز كلها» أو «StackOverflowError في الـ JSON» كلها من هنا.`,
            how: R`الطرف المالك (owning side) هو اللي فيه [[@JoinColumn]]، ودايمًا الـ [[@ManyToOne]]. Hibernate بيبص على الطرف ده بس عشان يكتب [[project_id]]. الـ [[@OneToMany(mappedBy)]] مجرد list بتتملى وقت القراية. عشان كده لو ضفت للـ list بس، العمود بيتكتب null (أو يقع لو NOT NULL). الـ helper method بتضمن إن الطرفين متسقين في الذاكرة.

[[cascade = CascadeType.ALL]]: العمليات على المشروع (persist و remove) بتتنقل للمهام. و [[orphanRemoval = true]]: لو شلت task من الـ list، بتتمسح من الداتابيز.

LAZY: [[task.getProject()]] بيرجع proxy (object فاضي فيه الـ id بس)، وأول ما تنادي method عليه Hibernate بيعمل SELECT. ده بيشتغل بس والـ session مفتوحة. الـ EAGER بيجيب العلاقة دايمًا حتى لو مش محتاجها، وبيعمل N+1 خفي في كل query.

many-to-many ([[@ManyToMany]] مع [[@JoinTable]]) موجودة، بس غالبًا أحسن تعمل entity للجدول الوسيط لو فيه أي بيانات زيادة (تاريخ، دور).`,
            when: R`[[@ManyToOne]] LAZY لكل foreign key. و [[@OneToMany]] بس لو فعلًا بتمشي من الأب للأبناء كمجموعة صغيرة (عناصر طلب مثلًا)؛ لو الأبناء بالآلاف (تعليقات post)، متعملهاش، واسأل الـ repository بـ [[findByPostId]] مع pagination.`,
            mistakes: R`EAGER على كل حاجة. و [[@OneToMany]] من غير [[mappedBy]]: Hibernate بيعمل جدول وسيط مش عايزه. وترجّع الـ entity كـ JSON فـ Jackson يلف: project ← tasks ← project ← ... لحد [[StackOverflowError]] (أو يحمّل كل حاجة lazy). الحل DTOs. و [[CascadeType.REMOVE]] على [[@ManyToOne]]: مسح task بيمسح المشروع!`
          },
          lines: [
            "entity المشروع.",
            "بداية.",
            "primary key.",
            R`[[bigserial]] في Postgres.`,
            "الحقل.",
            R`[[NOT NULL]] و [[UNIQUE]] و [[varchar(100)]].`,
            "الاسم.",
            R`[[mappedBy]]: العلاقة متعرّفة في [[Task.project]]. cascade و orphanRemoval: المهام تابعة للمشروع.`,
            R`اعملها فاضية دايمًا، متسيبهاش null.`,
            "helper بيظبط الطرفين.",
            "الطرف المرآة.",
            "الطرف المالك: ده اللي بيتكتب في الداتابيز.",
            "قفلة.",
            "قفلة الـ class.",
            "entity المهمة.",
            "بداية.",
            R`LAZY: متجيبش المشروع غير لما حد يطلبه. [[optional = false]] يعني لازم يبقى فيه مشروع.`,
            R`العمود [[project_id]] (الـ foreign key).`,
            "الحقل.",
            "قفلة."
          ],
          sol: R`لو ضفت للـ list بس: الـ task بتتحفظ بـ [[project_id]] null، ولأن العمود NOT NULL (و [[optional = false]])، الـ insert بيقع من الداتابيز نفسها: [[DataIntegrityViolationException]] و [[null value in column "project_id" of relation "task" violates not-null constraint]]. الـ list مش هي اللي بتتكتب، [[task.project]] هو اللي بيتكتب.

والمسح من [[getTasks()]] جوه [[@Transactional]] مع [[orphanRemoval = true]]: بيعمل [[DELETE FROM task WHERE id = ?]] وقت الـ commit. من غير orphanRemoval، الشيل من الـ list مش هيعمل حاجة في الداتابيز.`
        },
        {
          cmd: "N+1 و fetch join",
          title: "ليه صفحة فيها ٥٠ مشروع بتعمل ٥١ query؟",
          desc: R`لو جبت المشاريع ([[findAll()]]: query واحد)، وبعدين لفيت عليهم وقريت [[p.getTasks().size()]] لكل واحد، Hibernate بيعمل query لكل مشروع عشان يحمّل مهامه: N+1. مع ٥٠ مشروع: ٥١ query. ونفس الحكاية لو [[task.getProject().getName()]] لكل task.

الحل: قول لـ Hibernate يجيب العلاقة مع الأصل في query واحد: [[join fetch]] في [[@Query]]، أو [[@EntityGraph(attributePaths = "tasks")]] على method في الـ repository. ونفس المشكلة شرحناها مع Prisma في «تاب SQL و Prisma» (درس N+1).`,
          example: R`public interface ProjectRepository extends JpaRepository<Project, Long> {
  @Query("select distinct p from Project p left join fetch p.tasks")
  List<Project> findAllWithTasks();

  @EntityGraph(attributePaths = "tasks")
  List<Project> findByNameContainingIgnoreCase(String part);
}
// N+1:
//   projects.findAll().forEach(p -> p.getTasks().size());   ← 1 + N queries
// الحل:
//   projects.findAllWithTasks().forEach(p -> p.getTasks().size());   ← query واحد`,
          try: R`فعّل [[spring.jpa.properties.hibernate.generate_statistics=true]] (أو SQL logging)، ونادي الشكلين في test أو endpoint جوه [[@Transactional(readOnly = true)]] مع ٣ مشاريع. عدّ الـ queries في كل حالة.`,
          flag: "script",
          deep: {
            why: R`أشهر مشكلة أداء في أي ORM، وأشهر سؤال JPA في الانترفيو. في التطوير بـ ٥ صفوف مش هتحس بيها، وفي الإنتاج بـ ٥٠٠ صف الصفحة بتاخد ٣ ثواني.`,
            how: R`الـ lazy collection بتتحمّل أول مرة تلمسها، بـ SELECT لوحده. [[join fetch]] بيعمل [[LEFT JOIN]] في SQL ويملا الـ collections من نفس النتيجة. [[distinct]] في JPQL عشان كل project ميتكررش مرة لكل task (في Hibernate 6+ ده بيحصل لوحده في الـ entities، بس كتابته بتوضح النية).

[[@EntityGraph]] نفس النتيجة من غير ما تكتب JPQL، ومفيد مع derived queries.

القيود: [[join fetch]] على collection مع pagination: Hibernate مش هيقدر يعمل LIMIT في SQL (لأن كل project بقى كذا صف)، فبيجيب كله ويقسّم في الذاكرة مع warning [[firstResult/maxResults specified with collection fetch; applying in memory]]. وجلب اتنين collections (bags) بـ join fetch في query واحد بيرمي [[MultipleBagFetchException]].

الحلول التانية: [[hibernate.default_batch_fetch_size]] (مثلًا 50) بيحوّل N queries لـ N/50 query بـ [[WHERE id IN (...)]]، ودا حل عام كويس. أو DTO projection: [[select new com.example.TaskRow(t.id, t.title, p.name) from Task t join t.project p]] بيجيب الأعمدة اللي محتاجها بس.`,
            when: R`كل endpoint بيرجع list وكل عنصر فيها بيعرض بيانات من علاقة. اتعوّد تبص على عدد الـ queries في اللوج لكل endpoint جديد، أو تكتب test بيعد الـ statements.`,
            mistakes: R`تحل N+1 بـ EAGER: هتجيب العلاقة في كل حتة حتى اللي مش محتاجاها، والـ N+1 بيفضل موجود في [[findAll]]. و [[join fetch]] مع [[Pageable]] على collection من غير ما تاخد بالك من الـ warning. وتفتكر إن N+1 بيحصل بس في الـ collections: [[task.getProject().getName()]] لكل task برضه N+1.`
          },
          lines: [
            "الـ repository.",
            R`[[left join fetch]]: هات المهام مع المشاريع في نفس الـ SQL.`,
            "النتيجة: مشاريع مهامها متحمّلة.",
            R`[[@EntityGraph]]: نفس الفكرة على derived query.`,
            "بحث بالاسم ومعاه المهام.",
            "قفلة."
          ],
          sol: R`في المشروع اللي بنبنيه (٣ مشاريع و ٩ مهام) التست ده عدّى:

[[findAll()]] واللف على [[getTasks().size()]]: [[stats.getPrepareStatementCount()]] = 4 (واحد للمشاريع + واحد لكل مشروع).

[[findAllWithTasks()]]: = 1.

مع ٥٠٠ مشروع الفرق بيبقى ٥٠١ مقابل ١. لو شغّلت اللف برّه transaction (و [[open-in-view: false]])، هتاخد [[LazyInitializationException]] بدل الـ N+1 (درسها في الانترفيو). والتست كامل (بـ Testcontainers) في درس [[@DataJpaTest]].`
        },
        {
          cmd: "@Transactional",
          title: "كذا عملية على الداتابيز يا تنجح كلها يا تتلغي كلها",
          desc: R`[[@Transactional]] على method في الـ service بيفتح transaction قبلها ويعمل commit بعدها، ولو خرج منها RuntimeException بيعمل rollback. زي [[BEGIN]] و [[COMMIT]] في SQL (درس transaction في «تاب SQL و Prisma») أو [[$transaction]] في Prisma، بس بـ annotation.

وجوه الـ transaction فيه dirty checking: أي entity حمّلته وغيّرت فيه، Hibernate بيكتب الـ UPDATE لوحده وقت الـ commit، من غير [[save]]. و [[@Transactional(readOnly = true)]] للقراية بس: أسرع وبيوضح النية.`,
          example: R`@Service
public class TaskService {
  private final TaskRepository tasks;
  private final ProjectRepository projects;

  public TaskService(TaskRepository tasks, ProjectRepository projects) {
    this.tasks = tasks;
    this.projects = projects;
  }

  @Transactional(readOnly = true)
  public List<TaskResponse> open() {
    return tasks.findOpenWithProject().stream().map(TaskResponse::from).toList();
  }

  @Transactional
  public TaskResponse create(CreateTaskRequest req) {
    Project project = projects.findById(req.projectId())
        .orElseThrow(() -> new NotFoundException("project", req.projectId()));
    Task task = new Task(req.title());
    project.addTask(task);
    tasks.save(task);
    return TaskResponse.from(task);
  }

  @Transactional
  public TaskResponse complete(long id) {
    Task task = tasks.findById(id).orElseThrow(() -> new NotFoundException("task", id));
    task.setDone(true);
    return TaskResponse.from(task);
  }
}`,
          try: R`شغّل [[PATCH /api/tasks/2/done]] مع SQL logging: فيه UPDATE مع إن مفيش [[save]]؟ وبعدين شيل [[@Transactional]] من [[complete]] وجرّب تاني: الـ done اتحفظ؟ وإيه اللي حصل لـ [[TaskResponse.from]] اللي بيقرا [[getProject().getName()]]؟`,
          flag: "script",
          deep: {
            why: R`تحويل فلوس، أو طلب ومعاه عناصره، أو إنشاء يوزر ومعاه profile: لو نص العملية نجح والنص التاني وقع، الداتا بتبقى بايظة. والـ transaction كمان هي الحدود اللي الـ lazy loading شغال جواها.`,
            how: R`Spring بيعمل proxy حوالين الـ bean: لما حد برّه ينادي [[complete()]]، الـ proxy بيفتح transaction (بياخد connection من الـ pool ويعمل BEGIN)، وينادي الـ method الحقيقية، وبعدين يعمل flush (يكتب التغييرات) و COMMIT. لو طلع RuntimeException أو Error: ROLLBACK.

قواعد لازم تعرفها (وتفاصيلها في درس فخاخ @Transactional في الانترفيو):
١. الـ checked exceptions مش بتعمل rollback افتراضيًا (إلا بـ [[rollbackFor = Exception.class]]).
٢. النداء من جوه نفس الـ class ([[this.inner()]]) مش بيعدّي على الـ proxy، فالـ annotation مش بتشتغل.
٣. الـ method لازم تبقى public (أو على الأقل مش private) وبتتنادى من bean تاني.

الـ propagation الافتراضي [[REQUIRED]]: لو فيه transaction شغالة انضم ليها، لو مفيش افتح واحدة. و [[REQUIRES_NEW]] بيفتح واحدة مستقلة (مثلًا audit log يتحفظ حتى لو العملية الأصلية فشلت).

[[readOnly = true]] بيقول لـ Hibernate ميعملش dirty checking (أوفر في الذاكرة)، وبيبعت hint للداتابيز والـ driver.`,
            when: R`على methods الـ service (مش الـ controller ولا الـ repository). كل method بتكتب: [[@Transactional]]. كل method بتقرا وبتلمس علاقات lazy: [[@Transactional(readOnly = true)]]. ومتحطش HTTP calls أو إيميلات جوه transaction طويلة: الـ connection بتفضل محجوزة.`,
            mistakes: R`[[@Transactional]] على الـ controller أو على private method. وتفتكر إن [[save]] لازمة بعد كل تعديل. وتنادي API خارجي بياخد ١٠ ثواني جوه الـ transaction فالـ connection pool (١٠ connections افتراضيًا) يخلص تحت الضغط. و [[catch]] للـ exception جوه الـ method: الـ proxy مش بيشوفها فبيعمل commit.`
          },
          lines: [
            "service.",
            "بداية.",
            "repository المهام.",
            "repository المشاريع.",
            "constructor injection.",
            "بيحفظ الأول.",
            "بيحفظ التاني.",
            "قفلة.",
            R`قراية بس: من غير dirty checking.`,
            "المهام المفتوحة.",
            R`تحويل لـ DTOs جوه الـ transaction (لو فيه lazy هيشتغل هنا).`,
            "قفلة.",
            R`transaction للكتابة.`,
            "إنشاء.",
            "المشروع.",
            R`لو مش موجود: exception unchecked ← rollback و 404 من الـ advice.`,
            "entity جديد.",
            "نربط الطرفين.",
            R`[[save]] لازمة هنا لأنه entity جديد (INSERT).`,
            "DTO.",
            "قفلة.",
            "transaction.",
            "تعليم كمنتهية.",
            R`[[findById]]: الـ entity دخل الـ persistence context.`,
            R`تغيير حقل بس، من غير save: Hibernate هيكتب UPDATE وقت الـ commit.`,
            "DTO.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع [[@Transactional]]: اللوج فيه [[update task set done=?, project_id=?, title=? where id=?]] بعد الـ select، من غير أي save. ده الـ dirty checking: Hibernate قارن الـ entity بالنسخة اللي حمّلها ولقى [[done]] اتغير.

من غير [[@Transactional]] على [[complete]]: [[findById]] بيشتغل في transaction قصيرة خاصة بالـ repository ويقفلها، والـ entity بقى detached. [[setDone(true)]] بيغيّر الـ object في الذاكرة بس، ومفيش UPDATE: الـ done مش هيتحفظ. والأسوأ: [[TaskResponse.from]] بيقرا [[getProject().getName()]] والـ project lazy والـ session اتقفلت (مع [[open-in-view: false]]): [[LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session]] و 500.`
        },
        {
          cmd: "Flyway",
          title: "الجداول بتتعمل وتتغير بملفات SQL متسلسلة، مش بـ ddl-auto",
          desc: R`Flyway بيشغّل ملفات SQL من [[src/main/resources/db/migration]] بالترتيب: [[V1__init.sql]] وبعدين [[V2__seed.sql]] وهكذا، وبيسجّل اللي اتنفذ في جدول [[flyway_schema_history]]. كل ما التطبيق يقوم، بيشغّل الجديد بس. زي [[prisma migrate]] بس انت اللي بتكتب الـ SQL.

في Spring Boot 4 لازم starter [[spring-boot-starter-flyway]] (مش [[flyway-core]] لوحده زي زمان)، ومعاه [[flyway-database-postgresql]] لدعم PostgreSQL.`,
          example: R`create table project (
  id bigserial primary key,
  name varchar(100) not null unique
);
create table task (
  id bigserial primary key,
  title varchar(200) not null,
  done boolean not null default false,
  project_id bigint not null references project(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index task_project_id_idx on task(project_id);`,
          try: R`شغّل التطبيق وبعدين [[psql -d tasks -c "select version, description, success from flyway_schema_history"]]. وبعدين عدّل حرف في [[V1__init.sql]] (بعد ما اتنفذ) وشغّل تاني: إيه اللي حصل؟ والصح تعمل إيه؟`,
          flag: "script",
          deep: {
            why: R`الـ schema جزء من الكود: لازم يبقى في Git، ويتراجع في PR، ويتطبق بنفس الترتيب على جهازك والـ CI والإنتاج. [[ddl-auto]] مبيعملش ده، و SQL بإيدك على السيرفر محدش هيفتكره.`,
            how: R`وقت البداية (قبل ما Hibernate يعمل validate)، Flyway بيقرا الـ history، ويشغّل كل ملف version أكبر من آخر واحد اتنفذ، كل ملف في transaction (PostgreSQL بيدعم DDL في transactions، فلو ملف فشل بيتلغي كله). وبيحفظ checksum لكل ملف: لو ملف قديم اتعدّل، بيرفض يقوم.

التسمية: [[V<رقم>__<وصف>.sql]] (شرطتين). وفيه [[R__views.sql]] (repeatable) بيتنفذ تاني كل ما يتغير، مفيد للـ views والـ functions.

الـ migration لازم يبقى آمن لو الجدول فيه داتا وفيه نسخة قديمة من التطبيق شغالة (أثناء الـ deploy): ضيف عمود nullable الأول، واملاه، وبعدين خليه NOT NULL في migration بعدها. تفاصيل ده في «تاب PostgreSQL» (درس تغييرات آمنة في الإنتاج).

Liquibase بديل شائع تاني (بيدعم XML و YAML غير SQL). الفكرة واحدة.`,
            when: R`من أول يوم في أي مشروع فيه داتابيز. ومع [[ddl-auto: validate]] عشان Hibernate يتأكد إن الـ entities ماشية مع الـ migrations.`,
            mistakes: R`تعدّل migration اتنفذ على أي بيئة غير جهازك: الـ checksum بيختلف والتطبيق يقع في الإنتاج. اعمل migration جديد دايمًا. وتنسى [[flyway-database-postgresql]] فيطلع [[Unsupported Database: PostgreSQL]]. وتستخدم [[flyway-core]] بس في Boot 4 فالـ migrations متشتغلش خالص من غير خطأ واضح.`
          },
          lines: [
            "جدول المشاريع.",
            R`[[bigserial]]: bigint و sequence (زي [[GenerationType.IDENTITY]]).`,
            "الاسم فريد، زي الـ entity.",
            "قفلة.",
            "جدول المهام.",
            "id.",
            "العنوان.",
            "boolean افتراضي false.",
            R`foreign key، ولو المشروع اتمسح مهامه تتمسح.`,
            R`[[timestamptz]] دايمًا للتواريخ في Postgres.`,
            "قفلة.",
            R`index على الـ foreign key: Postgres مش بيعمله لوحده، وبيفرق في الـ joins و [[findByProjectId]].`
          ],
          sol: R`الجدول فيه صف لكل migration: [[1 | init | t]] و [[2 | seed | t]] (لو عندك seed). واللوج وقت أول تشغيل: [[Migrating schema "public" to version "1 - init"]].

ولما تعدّل V1 بعد ما اتنفذ: التطبيق مش بيقوم، والخطأ [[Validate failed: Migrations have failed validation]] و [[Migration checksum mismatch for migration version 1]]. Flyway بيحميك من إن الداتابيز عندك تبقى مختلفة عن اللي الملف بيقوله.

الصح: رجّع V1 زي ما كان، واعمل [[V3__add_priority.sql]] فيه [[ALTER TABLE ...]]. (على جهازك بس، وفي داتابيز تجريبية، ممكن تعمل [[drop database]] وتبدأ من الأول، أو [[flyway repair]] لو متأكد.)`
        }
      ]
    },
    {
      t: "Spring Security",
      l: 3,
      n: "الـ filter chain، و 401 و 403، والـ API كـ resource server بيقبل JWT، والصلاحيات على مستوى الـ method",
      items: [
        {
          cmd: "SecurityFilterChain",
          title: "أول ما تضيف Spring Security كل حاجة بتتقفل: تفتح إيه وتقفل إيه؟",
          desc: R`أول ما تضيف [[spring-boot-starter-security]]، كل الـ endpoints بتبقى محتاجة login، و Boot بيعمل يوزر اسمه [[user]] وباسورد عشوائي في اللوج. ده افتراضي آمن مش المقصود تسيبه.

انت بتعرّف [[@Bean SecurityFilterChain]] بتقول فيه: أنهي paths مفتوحة ([[permitAll]])، وأنهي محتاجة login ([[authenticated]])، وأنهي محتاجة صلاحية ([[hasAuthority]])، والـ API stateless (مفيش sessions)، وطريقة الـ authentication (JWT في الدرس الجاي). والفرق المهم: 401 يعني «مين انت؟» (مفيش أو token غلط)، و 403 يعني «عارفك، بس مش مسموحلك».`,
          example: R`@Configuration
@EnableMethodSecurity
public class SecurityConfig {
  @Bean
  SecurityFilterChain api(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health/**", "/error").permitAll()
            .requestMatchers("/actuator/**").hasAuthority("SCOPE_admin")
            .requestMatchers("/api/**").authenticated()
            .anyRequest().denyAll())
        .oauth2ResourceServer(rs -> rs.jwt(jwt -> {}))
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable());
    return http.build();
  }
}`,
          try: R`شغّل المشروع وجرّب بـ [[curl -i]]: [[/actuator/health]] من غير token، و [[/api/tasks]] من غير token، و [[/actuator/metrics]] بـ token عادي (من الدرس الجاي). اكتب الـ status المتوقع لكل واحد قبل ما تجرّب. وبعدين شيل [["/error"]] من الـ permitAll وابعت POST بـ body غلط.`,
          flag: "script",
          deep: {
            why: R`الـ security مش حاجة تتضاف في الآخر. لازم تفهم الـ chain عشان متفتحش حاجة بالغلط (actuator فيه معلومات حساسة)، ومتقفلش حاجة بالغلط (الـ health check بتاع Kubernetes أو Docker بيبقى 401 والـ container يتقتل). والمفاهيم نفسها (authn و authz و 401 و 403) في «تاب الانترفيو».`,
            how: R`Spring Security سلسلة filters بتشتغل قبل الـ DispatcherServlet (قبل الـ controllers). كل request بيعدّي عليهم: واحد يقرا الـ token ويعمل [[Authentication]] ويحطها في [[SecurityContext]]، وواحد في الآخر يطابق الـ path مع القواعد اللي كتبتها.

القواعد بتتقري بالترتيب وأول واحدة بتطابق بتكسب، فالأخص الأول. و [[anyRequest().denyAll()]] في الآخر: أي path نسيته مقفول (deny by default).

[[csrf.disable()]] آمن هنا لأن الـ API مش بيستخدم cookies للـ auth (الـ token في header). لو بتستخدم session cookie، متقفلوش. و [[STATELESS]] يعني متعملش HttpSession.

والـ [[/error]]: لما exception مش متمسك أو Spring MVC نفسه يرفض request، الـ servlet بيعمل forward لـ [[/error]]، وده request جديد بيعدّي على الـ security. لو مقفول: الـ client ياخد 401 أو 403 مكان الخطأ الحقيقي. حصلت معانا فعلًا في المشروع ده.

[[@EnableMethodSecurity]] بيفعّل [[@PreAuthorize]] (درس بعد الجاي).`,
            when: R`في كل API: chain واحد، والـ health مفتوح، والـ actuator للـ admins أو على بورت داخلي، والـ API محتاج token، والباقي deny.`,
            mistakes: R`[[anyRequest().permitAll()]] في الآخر «مؤقتًا». و [[requestMatchers("/api/**").authenticated()]] قبل [[requestMatchers("/api/public/**").permitAll()]]: الأول بيكسب فالـ public بقى مقفول. وتفتح [[/actuator/**]] كله ([[/actuator/env]] و [[/actuator/heapdump]] فيهم أسرار). وتنسى [[/error]] فالأخطاء تبقى 403 ومحدش فاهم.`
          },
          lines: [
            "class إعدادات.",
            R`يفعّل [[@PreAuthorize]] على الـ methods.`,
            "بداية.",
            R`[[SecurityFilterChain]] bean: بيلغي الافتراضي بتاع Boot.`,
            R`[[HttpSecurity]] builder بيبعته Spring.`,
            "نبدأ.",
            "القواعد بالترتيب.",
            R`الـ health (للـ Docker و Kubernetes) و [[/error]] مفتوحين.`,
            R`باقي الـ actuator للي معاه scope admin.`,
            R`الـ API محتاج أي token سليم.`,
            R`أي حاجة تانية: ممنوعة.`,
            R`resource server: اقرا [[Authorization: Bearer ...]] وافحصه كـ JWT.`,
            "مفيش sessions.",
            R`CSRF مقفول لأن الـ auth مش بـ cookies.`,
            "ابني الـ chain.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`اللي حصل معانا في المشروع:

[[/actuator/health]] من غير token: [[200]] و [[{"groups":["liveness","readiness"],"status":"UP"}]].

[[/api/tasks]] من غير token: [[401]] ومعاه header [[WWW-Authenticate: Bearer]].

[[/actuator/metrics]] بـ token من غير scope admin: [[403]]، والـ header بيقول [[error="insufficient_scope"]].

ولما شلنا [["/error"]] وبعتنا body غلط: بدل [[400]] رجع [[403]] وbody فاضي. الـ validation error اتحوّل لـ forward على [[/error]]، و [[/error]] وقع تحت [[anyRequest().denyAll()]]. (لو الـ advice بيمسك الخطأ ده بـ ResponseEntityExceptionHandler، مش هتشوف المشكلة لأنه مش بيوصل لـ [[/error]] أصلًا، بس أي exception مش متمسك هيوصل.)`
        },
        {
          cmd: "JWT resource server",
          title: "الـ API يقبل JWT ويعرف مين اليوزر وصلاحياته",
          desc: R`الشكل المعتاد: فيه auth server (Keycloak أو Auth0 أو Cognito أو خدمة بتاعتكم) بيعمل الـ tokens، والـ API بتاعك resource server بيفحصها بس. بتكتب [[spring.security.oauth2.resourceserver.jwt.issuer-uri]] و Spring بيجيب المفاتيح العامة من الـ issuer ويفحص التوقيع والـ expiry لوحده.

للتجربة أو لو انت اللي بتعمل الـ tokens بمفتاح مشترك (HS256)، بتعرّف [[JwtDecoder]] بالمفتاح. والـ [[scope]] claim بيتحول لـ authorities [[SCOPE_admin]]، وفي الـ controller بتاخد اليوزر بـ [[@AuthenticationPrincipal Jwt jwt]]. تفاصيل الـ JWT نفسه في «تاب Backend بـ Node» (درس jwt.sign و jwt.verify).`,
          example: R`@Bean
JwtDecoder jwtDecoder(AppProperties props) {
  SecretKey key = new SecretKeySpec(props.jwtSecret().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
  return NimbusJwtDecoder.withSecretKey(key).build();
}
@GetMapping("/api/me")
public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
  return Map.of("user", jwt.getSubject(), "scopes", jwt.getClaimAsString("scope"));
}
# أو مع auth server حقيقي، في application.yaml بدل الـ bean:
# spring.security.oauth2.resourceserver.jwt.issuer-uri: https://auth.example.com/realms/shop`,
          try: R`اعمل token بـ Node (السكربت تحت في الحل) بـ [[scope: "user"]] واطلب [[/api/tasks]] بيه. وبعدين: غيّر حرف في آخر الـ token، واعمل token منتهي ([[exp]] في الماضي)، واعمل token بمفتاح تاني. كل واحد رجع كام؟`,
          flag: "script",
          deep: {
            why: R`معظم APIs الحديثة stateless بـ tokens، و Spring Security بيعمل الفحص الصعب (التوقيع، والـ expiry، والـ issuer، وتدوير المفاتيح) بسطرين. لو كتبت فحص JWT بإيدك، فرصة كبيرة تنسى حاجة (زي [[alg: none]]).`,
            how: R`الـ [[BearerTokenAuthenticationFilter]] بياخد الـ token من [[Authorization: Bearer]]، و [[JwtDecoder]] بيفك الـ header و الـ payload ويتأكد من التوقيع و [[exp]] و [[nbf]] (ومع issuer-uri من [[iss]] كمان). لو أي حاجة غلط: 401 و [[WWW-Authenticate: Bearer error="invalid_token"]].

لو سليم: بيعمل [[JwtAuthenticationToken]]، والـ authorities من claim [[scope]] أو [[scp]] بعد ما يضيف [[SCOPE_]] قبل كل واحدة. لو الـ roles عندك في claim تاني (زي [[roles]] في Keycloak)، بتعرّف [[JwtAuthenticationConverter]] يقراها.

مع [[issuer-uri]] Spring بيقرا [[/.well-known/openid-configuration]] بتاع الـ issuer عشان يلاقي الـ [[jwks_uri]]، وبيكاش المفاتيح العامة (RS256). ده الأحسن في الإنتاج: الـ API عمره ما بيشوف مفتاح سري.

HS256 بمفتاح مشترك: أي حد معاه المفتاح يقدر يعمل tokens، فالمفتاح لازم يبقى سر وطوله ٣٢ byte على الأقل (عشان كده عملنا [[@Size(min = 32)]] على الإعداد).`,
            when: R`resource server لأي API الـ frontend بيكلمه بـ token. لو التطبيق نفسه فيه login بصفحات (مش SPA)، session و form login أبسط. ولو محتاج «login بـ Google» في تطبيق server-rendered: [[oauth2Login]] (ده oauth2 client، حاجة تانية).`,
            mistakes: R`JWT secret قصير أو في Git. وتحط بيانات حساسة في الـ payload (الـ JWT مش مشفّر، أي حد يقدر يفكه بـ base64). و tokens عمرها أيام من غير refresh. وتفحص الـ role في الـ controller بـ [[if]] بدل القواعد والـ annotations.`
          },
          lines: [
            R`[[@Bean]].`,
            R`bean بيفحص الـ tokens، ومكانه في [[SecurityConfig]].`,
            R`المفتاح من [[app.jwt-secret]] (env var في الإنتاج).`,
            R`[[NimbusJwtDecoder]] بيفحص التوقيع و exp.`,
            "قفلة.",
            "endpoint بيرجع مين اليوزر.",
            R`[[@AuthenticationPrincipal Jwt]]: الـ token اللي اتفحص.`,
            R`[[sub]] والـ scopes من الـ claims.`,
            "قفلة."
          ],
          sol: R`النتايج في المشروع:

token سليم بـ scope user: [[200]] والمهام.

حرف متغير في التوقيع، أو token بمفتاح تاني: [[401]]، و [[WWW-Authenticate: Bearer error="invalid_token", error_description="An error occurred while attempting to decode the Jwt: Signed JWT rejected: Invalid signature"]] (الصياغة بالظبط ممكن تختلف شوية حسب الإصدار).

token منتهي: [[401]] و [[Jwt expired at ...]].

والـ scope user على [[DELETE]] (اللي عليه [[@PreAuthorize]] للـ admin): [[403]]. السكربت اللي عملنا بيه الـ tokens تحت (Node من غير مكتبات): [[node jwt.js "user admin"]].`,
          solCode: R`// jwt.js: node jwt.js "user admin"
const c = require('crypto');
const b = o => Buffer.from(JSON.stringify(o)).toString('base64url');
const scope = process.argv[2] || 'user';
const now = Math.floor(Date.now() / 1000);
const h = b({ alg: 'HS256', typ: 'JWT' }), p = b({ sub: 'sara', scope, iat: now, exp: now + 3600 });
const s = c.createHmac('sha256', process.env.JWT_SECRET || 'change-me-change-me-change-me-32bytes!!')
  .update(h + '.' + p).digest('base64url');
console.log(h + '.' + p + '.' + s);

// TOKEN=$(node jwt.js user)
// curl -i localhost:8080/api/tasks -H "Authorization: Bearer $TOKEN"`
        },
        {
          cmd: "@PreAuthorize",
          title: "صلاحية على method بعينها، مش على الـ URL",
          desc: R`[[@PreAuthorize("hasAuthority('SCOPE_admin')")]] على method في الـ service: قبل ما تتنفذ، Spring بيتأكد إن اليوزر الحالي معاه الصلاحية، ولو لأ بيرمي [[AccessDeniedException]] وبتتحول لـ 403. محتاج [[@EnableMethodSecurity]] على class إعدادات.

والتعبير SpEL فيه اليوزر والباراميترات: [[@PreAuthorize("#userId == authentication.name")]] يعني «اليوزر بيعدّل نفسه بس». ده أقرب للمنطق من قواعد الـ URL، وبيحمي الـ method من أي مكان اتنادت منه.`,
          example: R`@PreAuthorize("hasAuthority('SCOPE_admin')")
@Transactional
public void delete(long id) {
  if (!tasks.existsById(id)) throw new NotFoundException("task", id);
  tasks.deleteById(id);
}
@PreAuthorize("#userId == authentication.name or hasAuthority('SCOPE_admin')")
public ProfileResponse updateProfile(String userId, UpdateProfile body) {
  return profiles.update(userId, body);
}`,
          try: R`جرّب [[DELETE /api/tasks/1]] بـ token scope user وبعدين scope admin. وبعدين فكّر: لو [[delete]] اتنادت من scheduled job مفيهوش يوزر، هيحصل إيه؟`,
          flag: "script",
          deep: {
            why: R`قواعد الـ URL كويسة للخطوط العريضة، بس «مين يقدر يمسح؟» أو «اليوزر يعدّل بياناته بس» منطق business. لو في الـ URL بس، أي controller أو job جديد بينادي الـ service بيعدّي من غير فحص. وده بالظبط ثغرة Broken Access Control و IDOR (درس ownership في «تاب Backend بـ Node»).`,
            how: R`[[@EnableMethodSecurity]] بيعمل proxy حوالين الـ beans اللي فيها annotations، زي [[@Transactional]] بالظبط، وبنفس القيود: النداء من جوه نفس الـ class مش بيتفحص.

التعبيرات: [[hasAuthority('SCOPE_admin')]] و [[hasRole('ADMIN')]] (بيدوّر على [[ROLE_ADMIN]]) و [[isAuthenticated()]]، و [[authentication]] اليوزر الحالي، و [[#name]] باراميتر بالاسم. وفيه [[@PostAuthorize]] بيفحص على اللي الـ method رجّعته ([[returnObject.owner == authentication.name]]).

الـ [[AccessDeniedException]] بتتحول لـ 403 بواسطة الـ security filter لو اليوزر مسجّل، و 401 لو anonymous.

الـ ownership الحقيقي (المهمة دي بتاعة اليوزر ده؟) غالبًا بيتعمل في الـ query نفسه: [[findByIdAndOwnerId(id, userId)]]، فالـ 404 يطلع للي مش صاحبها (ومتكشفش إن الـ id موجود).`,
            when: R`على methods الـ service اللي فيها عمليات حساسة (مسح، وتغيير صلاحيات، وبيانات يوزر تاني). ومع قواعد الـ URL مش بدالها.`,
            mistakes: R`تنسى [[@EnableMethodSecurity]] فالـ annotations متشتغلش ومن غير أي خطأ. و [[hasRole('SCOPE_admin')]] بدل [[hasAuthority]] (hasRole بيضيف [[ROLE_]]). وتعتمد عليها على private method أو نداء داخلي. و [[@PreAuthorize]] على الـ controller بس والـ service متاح من أماكن تانية.`
          },
          lines: [
            R`قبل التنفيذ: لازم [[SCOPE_admin]].`,
            "transaction.",
            "المسح.",
            "404 لو مش موجودة.",
            "المسح.",
            "قفلة.",
            R`الـ user يعدّل نفسه ([[#userId]] هو الباراميتر) أو admin.`,
            "الـ method.",
            "التعديل.",
            "قفلة."
          ],
          sol: R`بـ scope user: [[403]] (الـ method متنفذتش خالص). بـ scope admin: [[204]].

والـ scheduled job: مفيش Authentication في الـ SecurityContext، فـ Spring بيرمي [[AuthenticationCredentialsNotFoundException]] والـ job يقع. الحلول: الـ job ينادي method داخلية من غير [[@PreAuthorize]] (في service تاني)، أو يحط Authentication لـ system user قبل النداء. ده سبب إن الـ method security لازم يتصمم مع كل اللي بينادوا الـ service، مش الـ HTTP بس.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "JUnit و Mockito للـ unit tests، و slices للـ controller والـ repository، و Testcontainers بـ PostgreSQL حقيقي",
      items: [
        {
          cmd: "JUnit و Mockito",
          title: "تختبر service لوحده من غير Spring ومن غير داتابيز",
          desc: R`JUnit (Jupiter) هو اللي بيشغّل التستات: method عليها [[@Test]] جوه class. و AssertJ للـ assertions: [[assertThat(x).isEqualTo(y)]] (زي [[expect(x).toBe(y)]] في Vitest). و Mockito بيعمل objects وهمية: [[@Mock TaskRepository]] ترد باللي تقوله ([[when(...).thenReturn(...)]])، وبعدين تتأكد إنها اتنادت ([[verify]]).

الـ unit test ده مفيهوش Spring خالص، فبيشتغل في أجزاء من الثانية. وكل ده جاي مع [[spring-boot-starter-test]]. (في Spring Boot 4 الـ JUnit المستخدم نسخة 6.x، والكود نفسه زي JUnit 5.)`,
          example: R`@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
  @Mock TaskRepository tasks;
  @Mock ProjectRepository projects;
  @InjectMocks TaskService service;

  @Test
  void createsTaskInsideProject() {
    Project website = new Project("Website");
    when(projects.findById(1L)).thenReturn(Optional.of(website));

    var res = service.create(new CreateTaskRequest("Write docs", 1L));

    assertThat(res.project()).isEqualTo("Website");
    assertThat(website.getTasks()).hasSize(1);
    verify(tasks).save(website.getTasks().get(0));
  }

  @Test
  void unknownProjectThrows() {
    when(projects.findById(99L)).thenReturn(Optional.empty());
    assertThatThrownBy(() -> service.create(new CreateTaskRequest("x", 99L)))
        .isInstanceOf(NotFoundException.class)
        .hasMessage("project 99 not found");
  }
}`,
          try: R`اكتب تست لـ [[complete(id)]]: مرة الـ task موجودة (اتأكد إن [[isDone()]] بقت true)، ومرة مش موجودة. وبعدين ضيف في التست الأول [[when(tasks.count()).thenReturn(5L);]] من غير ما تستخدمه وشغّل: Mockito قال إيه؟`,
          flag: "script",
          deep: {
            why: R`الـ business logic هو أهم حاجة تتختبر، وأسرع طريقة تختبره من غير ما تقوّم Spring وداتابيز. ١٠٠ unit test بتخلص في ثانية، فتشغّلهم كل ما تحفظ.`,
            how: R`[[MockitoExtension]] بيعمل الـ mocks قبل كل تست، و [[@InjectMocks]] بيعمل [[new TaskService(tasks, projects)]] بالـ mocks (بالـ constructor). الـ mock افتراضيًا بيرجع قيم فاضية: null و 0 و [[Optional.empty()]] و lists فاضية.

[[when(mock.method(args)).thenReturn(value)]] بيحدد الرد لـ arguments معينة، و [[any()]] لأي قيمة. و [[thenThrow]] لرمي exception. و [[verify(mock).method(args)]] بيتأكد إنها اتنادت، و [[verify(mock, never())]] إنها متناديتش.

Strict stubs: [[MockitoExtension]] بيفشل التست لو عملت [[when]] ومحدش استخدمه ([[UnnecessaryStubbingException]])، عشان التست ميبقاش فيه كلام ملوش لازمة.

الـ structure المعتاد: arrange (الـ when)، و act (النداء)، و assert (الـ assertThat و verify)، بسطر فاضي بينهم.`,
            when: R`services فيها منطق: حسابات، وقرارات، وتحويلات، وأخطاء. متعملش unit test لـ repository (الـ mock مش هيختبر الـ query) ولا لـ controller (فيه slice أحسن، الدرس الجاي).`,
            mistakes: R`تعمل mock لكل حاجة لدرجة إن التست بيختبر الـ mocks مش الكود. و [[verify]] على كل نداء فالتست يقع مع أي refactor. وتعمل mock للـ entities والـ records (اعملهم بـ [[new]]). و [[@SpringBootTest]] لكل تست فالـ suite تاخد ١٠ دقايق.`
          },
          lines: [
            "Mockito مع JUnit.",
            "class التست.",
            R`[[@Mock]]: repository وهمي.`,
            "واحد تاني.",
            R`[[@InjectMocks]]: الـ service الحقيقي بالـ mocks.`,
            R`[[@Test]]: ده تست.`,
            "اسم بيوصف السلوك.",
            "entity حقيقي مش mock.",
            R`arrange: لما يتسأل عن 1، رجّع المشروع.`,
            "act: ننادي الـ method.",
            "assert: الـ DTO فيه اسم المشروع.",
            "المهمة اتضافت للمشروع.",
            R`وإن [[save]] اتنادت بنفس الـ task.`,
            "قفلة.",
            "تست تاني.",
            "حالة الخطأ.",
            "مش موجود.",
            R`[[assertThatThrownBy]]: الـ lambda لازم ترمي.`,
            "من النوع ده.",
            "وبالرسالة دي.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`التستين تحت، والاتنين بيعدّوا. في الأول [[complete]] مفيهوش [[save]]، فمش هنعمل verify عليه (في الحقيقة الـ dirty checking هو اللي بيحفظ، ودي حاجة الـ unit test مش هيختبرها، ودي وظيفة [[@DataJpaTest]]).

ولما تضيف [[when(tasks.count())...]] من غير استخدام: التست بيفشل بـ [[UnnecessaryStubbingException]] و [[Unnecessary stubbings detected]] ومعاها السطر. ده الـ strict stubs.`,
          solCode: R`@Test
void completeMarksDone() {
  Project website = new Project("Website");
  Task task = new Task("Write docs");
  website.addTask(task);
  when(tasks.findById(7L)).thenReturn(Optional.of(task));

  var res = service.complete(7L);

  assertThat(res.done()).isTrue();
  assertThat(task.isDone()).isTrue();
}

@Test
void completeMissingThrows() {
  when(tasks.findById(7L)).thenReturn(Optional.empty());
  assertThatThrownBy(() -> service.complete(7L)).isInstanceOf(NotFoundException.class);
}`
        },
        {
          cmd: "@WebMvcTest",
          title: "تختبر الـ controller: الـ routes والـ JSON والـ validation والـ security",
          desc: R`[[@WebMvcTest(TaskController.class)]] بيقوّم جزء Spring MVC بس (الـ controller والـ advices والـ security والـ JSON)، من غير services ولا داتابيز. والـ service بتحط مكانه mock بـ [[@MockitoBean]]. و [[MockMvc]] بيبعت requests وهمية من غير server حقيقي: [[mvc.perform(get("/api/tasks"))]] وبعدين [[andExpect(status().isOk())]] و [[jsonPath("$[0].title")]].

ده زي supertest في «تاب Backend بـ Node»، بس أسرع لأنه مفيش بورت. ومع security: [[.with(jwt())]] بيحط token وهمي. محتاج [[spring-boot-starter-webmvc-test]] و [[spring-boot-starter-security-test]].`,
          example: R`@WebMvcTest(TaskController.class)
@Import(SecurityConfig.class)
class TaskControllerTest {
  @Autowired MockMvc mvc;
  @MockitoBean TaskService service;
  @MockitoBean JwtDecoder jwtDecoder;

  @Test
  void listsOpenTasks() throws Exception {
    when(service.open()).thenReturn(List.of(new TaskResponse(1L, "Write docs", false, "Website")));
    mvc.perform(get("/api/tasks").with(jwt()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Write docs"));
  }

  @Test
  void rejectsAnonymous() throws Exception {
    mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
  }

  @Test
  void validatesBody() throws Exception {
    mvc.perform(post("/api/tasks").with(jwt())
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"\",\"projectId\":1}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.title").value("must not be blank"));
  }
}`,
          try: R`ضيف تست إن [[NotFoundException]] من الـ service بتتحول لـ 404 و [[$.detail]] فيها الرسالة. وضيف تست إن [[GET /internal/report]] بـ [[jwt()]] بيرجع 403 (القاعدة [[anyRequest().denyAll()]]). وبعدين شيل [[@Import(SecurityConfig.class)]] وشغّل: أنهي تست وقع، وليه الباقي عدّى؟`,
          flag: "script",
          deep: {
            why: R`الـ controller فيه حاجات مينفعش unit test عادي يختبرها: الـ path صح؟ الـ JSON شكله إيه؟ الـ validation شغالة؟ الـ 401 بترجع من غير token؟ الأخطاء بتتحول صح؟ الـ slice test بيختبر ده كله في ثانيتين.`,
            how: R`الـ slice بيحمّل beans معينة بس: [[@Controller]] و [[@ControllerAdvice]] (فالـ [[ApiErrors]] بتاعنا بيتحمّل لوحده) و filters و [[Converter]] و Jackson والـ auto-configuration بتاع الـ security. الـ [[@Service]] و [[@Configuration]] بتوعك مش بيتحمّلوا، عشان كده عملنا [[@Import(SecurityConfig.class)]]: من غيره Boot بيستخدم security افتراضي (كل حاجة authenticated) مختلف عن الإنتاج، وتستات كتير هتعدّي بالصدفة. و [[@MockitoBean JwtDecoder]] لأن الـ config بتاعنا محتاجه.

[[@MockitoBean]] (من Spring Framework 6.2، بدل [[@MockBean]] القديم اللي اتشال في Boot 4) بيحط mock مكان الـ bean في الـ context.

[[jwt()]] من [[spring-security-test]]: بيحط Authentication جاهز من غير ما يفحص token حقيقي. وتقدر تحدد الصلاحيات: [[jwt().authorities(new SimpleGrantedAuthority("SCOPE_admin"))]].

[[jsonPath]] بيقرا الـ response بتعبيرات زي [[$.errors.title]] و [[$[0].id]] و [[$.length()]].

والـ annotation في Boot 4 من package [[org.springframework.boot.webmvc.test.autoconfigure]] (اتنقلت مع تقسيم الـ modules).`,
            when: R`تست لكل endpoint: الحالة السعيدة، والـ validation، والـ 404، والـ 401 و 403. والمنطق نفسه اختبره في الـ service.`,
            mistakes: R`[[@SpringBootTest]] مع [[MockMvc]] لكل تست controller: بيقوّم التطبيق كله. ونسيان [[@Import]] للـ security config فالتست بيختبر security غير اللي في الإنتاج، وأخطر حاجة إن التستات بتعدّي. و assertions على الـ JSON كله كـ string فأي حقل جديد يكسر التست.`
          },
          lines: [
            R`slice للـ controller ده بس.`,
            R`الـ security config بتاعنا (الـ slice مش بيحمّل [[@Configuration]] لوحده).`,
            "class التست.",
            R`[[MockMvc]] جاهز من الـ slice.`,
            R`الـ service mock جوه الـ context.`,
            R`الـ config محتاج JwtDecoder، فبنحط mock.`,
            "تست.",
            R`[[throws Exception]] لأن perform بترميها (checked).`,
            "الـ service هيرجع task واحدة.",
            R`GET ومعاه token وهمي.`,
            "200.",
            R`الـ JSON فيه العنوان.`,
            "قفلة.",
            "تست.",
            "من غير token.",
            "401.",
            "قفلة.",
            "تست.",
            "validation.",
            R`POST بـ token.`,
            "JSON.",
            "عنوان فاضي.",
            "400.",
            R`والـ [[errors]] بتاعتنا فيها رسالة الحقل.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`التستين تحت، وبيعدّوا في المشروع (مع التلاتة اللي في المثال: ٥ تستات في حوالي ٢ ثانية). الـ 404 شغال من غير ما نعمل Import لـ [[ApiErrors]]، لأن الـ slice بيحمّل الـ [[@RestControllerAdvice]] لوحده.

ولما شلنا [[@Import(SecurityConfig.class)]]: تست [[/internal/report]] بس اللي وقع: [[Status expected:<403> but was:<404>]]. الـ security الافتراضي بيقول «أي حد معاه token يعدّي»، فالـ request وصل لـ MVC وملقاش handler. أما تستات الـ 401 والـ validation والـ 404 فعدّت بالصدفة، لأن الافتراضي شبه بتاعنا في الحالات دي. الدرس: التست اللي بيعدّي مش دليل إنه بيختبر الإعدادات الحقيقية؛ اكتب تست لكل قاعدة security مهمة.`,
          solCode: R`@Test
void notFoundBecomesProblemDetail() throws Exception {
  when(service.create(any())).thenThrow(new NotFoundException("project", 99));
  mvc.perform(post("/api/tasks").with(jwt())
          .contentType(MediaType.APPLICATION_JSON)
          .content("{\"title\":\"x\",\"projectId\":99}"))
      .andExpect(status().isNotFound())
      .andExpect(jsonPath("$.detail").value("project 99 not found"));
}

@Test
void unknownPathDenied() throws Exception {
  mvc.perform(get("/internal/report").with(jwt())).andExpect(status().isForbidden());
}`
        },
        {
          cmd: "@DataJpaTest",
          title: "تختبر الـ repository والـ queries على داتابيز حقيقية",
          desc: R`[[@DataJpaTest]] بيقوّم JPA بس (الـ entities والـ repositories و Flyway)، وكل تست جوه transaction بتتعمل rollback في الآخر، فالتستات مش بتأثر على بعض. هنا بتختبر إن الـ query بيرجع الصح، وإن الـ fetch join بيعمل query واحد فعلًا.

افتراضيًا بيحاول يستبدل الداتابيز بـ in-memory (H2). ده غلط مع PostgreSQL: الـ SQL مختلف والـ migrations ممكن متشتغلش. عشان كده [[@AutoConfigureTestDatabase(replace = NONE)]] مع PostgreSQL حقيقي (الدرس الجاي).`,
          example: R`@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(properties = "spring.jpa.properties.hibernate.generate_statistics=true")
class ProjectRepositoryTest {
  @Container
  @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine");

  @Autowired ProjectRepository projects;
  @Autowired EntityManagerFactory emf;

  @Test
  void fetchJoinLoadsEverythingInOneQuery() {
    Statistics stats = emf.unwrap(SessionFactory.class).getStatistics();
    stats.clear();
    int total = projects.findAllWithTasks().stream().mapToInt(p -> p.getTasks().size()).sum();
    assertThat(total).isEqualTo(9);
    assertThat(stats.getPrepareStatementCount()).isEqualTo(1);
  }

  @Test
  void derivedQueryByName() {
    assertThat(projects.findByName("Mobile")).isPresent();
    assertThat(projects.findByName("Nope")).isEmpty();
  }
}`,
          try: R`ضيف تست بنفس الطريقة لـ [[findAll()]] واللف على [[getTasks()]]، واتأكد إن عدد الـ statements 4 (N+1). وبعدين ضيف [[spring.jpa.properties.hibernate.default_batch_fetch_size=50]] للـ properties: بقى كام؟`,
          flag: "script",
          deep: {
            why: R`الـ repository بـ mock مش بيختبر حاجة. الـ queries، والـ mappings، والـ constraints، والـ N+1 محتاجين داتابيز حقيقية. والتست اللي بيعدّ الـ queries بيمنع حد يرجّع N+1 من غير ما ياخد باله.`,
            how: R`الـ slice بيحمّل: الـ DataSource و JPA و Flyway و الـ repositories و [[TestEntityManager]]. مش بيحمّل services ولا controllers. وكل تست [[@Transactional]] بـ rollback في الآخر.

خلي بالك: جوه الـ transaction بتاعة التست، الـ lazy loading شغال دايمًا، فمش هتشوف [[LazyInitializationException]] هنا حتى لو كانت هتحصل في الإنتاج. وكمان الـ first-level cache: لو عملت save وبعدين find في نفس التست، Hibernate ممكن يرجّعلك نفس الـ object من الذاكرة من غير SELECT؛ استخدم [[em.flush()]] و [[em.clear()]] لو عايز تتأكد إنه اتكتب واتقرا فعلًا.

Hibernate Statistics ([[generate_statistics=true]]) بيعد الـ statements والـ entities اللي اتحملت، فتقدر تعمل assertion على عدد الـ queries.

في Boot 4 الـ annotation في [[org.springframework.boot.data.jpa.test.autoconfigure]] ومحتاج [[spring-boot-starter-data-jpa-test]].`,
            when: R`لكل [[@Query]] مكتوب بإيدك، ولكل method الأداء بتاعها مهم (عدّ الـ queries)، وللـ constraints المهمة (unique و cascade).`,
            mistakes: R`H2 مكان PostgreSQL: التستات بتعدّي و [[jsonb]] أو [[ILIKE]] أو الـ migrations تبوظ في الإنتاج. وتفتكر إن مفيش LazyInitializationException عشان التست عدّى. ونسيان [[flush]] فالـ constraint violation متطلعش في التست.`
          },
          lines: [
            "slice الـ JPA.",
            "Testcontainers (الدرس الجاي).",
            R`متستبدلش الداتابيز بـ H2.`,
            "فعّل عدّاد الـ queries.",
            "class التست.",
            "container.",
            R`[[@ServiceConnection]]: Spring ياخد الـ URL واليوزر من الـ container.`,
            "PostgreSQL 17 حقيقي في Docker.",
            "الـ repository الحقيقي.",
            "عشان نوصل للإحصائيات.",
            "تست.",
            "fetch join.",
            "إحصائيات Hibernate.",
            "صفّرها.",
            R`الـ query واللف على المهام.`,
            R`الـ seed فيه ٣ مشاريع × ٣ مهام.`,
            R`query واحد بس.`,
            "قفلة.",
            "تست.",
            "derived query.",
            "موجود.",
            "مش موجود.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`تست الـ N+1 تحت: [[findAll()]] واللف بيعمل 4 statements (١ + ٣). ده عدّى عندنا في المشروع.

ومع [[default_batch_fetch_size=50]]: بيبقى 2: واحد للمشاريع، وواحد لكل مهام الـ ٣ مشاريع مع بعض بـ [[where project_id in (?, ?, ?)]] (Hibernate ممكن يحط placeholders زيادة أو يستخدم array حسب الإصدار). ده حل عام كويس للـ N+1 من غير ما تكتب fetch join لكل حالة.`,
          solCode: R`@Test
void naiveLoopCausesNPlusOne() {
  Statistics stats = emf.unwrap(SessionFactory.class).getStatistics();
  stats.clear();
  int total = projects.findAll().stream().mapToInt(p -> p.getTasks().size()).sum();
  assertThat(total).isEqualTo(9);
  assertThat(stats.getPrepareStatementCount()).isEqualTo(4);
}`
        },
        {
          cmd: "Testcontainers",
          title: "PostgreSQL حقيقي بيقوم لكل test suite في Docker",
          desc: R`Testcontainers مكتبة بتشغّل containers من الكود: [[new PostgreSQLContainer("postgres:17-alpine")]] بيقوّم Postgres في Docker قبل التستات ويمسحه بعدها. و [[@ServiceConnection]] بيخلي Spring Boot ياخد عنوانه واليوزر والباسورد لوحده، من غير ما تكتب أي [[spring.datasource]].

محتاج Docker شغال، و [[spring-boot-testcontainers]] و [[testcontainers-postgresql]] (في Testcontainers 2 الأسماء بقت [[testcontainers-*]] والـ class في [[org.testcontainers.postgresql]]). ونفس الـ container ينفع لـ [[@SpringBootTest]] كامل (integration test).`,
          example: R`@SpringBootTest
@Testcontainers
class PitfallsTest {
  @Container
  @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine");

  @Autowired TaskRepository tasks;

  @Test
  void lazyOutsideTransactionThrows() {
    Task t = tasks.findById(1L).orElseThrow();
    assertThatThrownBy(() -> t.getProject().getName())
        .isInstanceOf(LazyInitializationException.class)
        .hasMessageContaining("no session");
  }
}
// في الترمنال:
// docker info
// ./mvnw test`,
          try: R`شغّل [[./mvnw test]] ومعاه [[docker ps]] في ترمنال تاني وانت التستات شغالة: شايف إيه؟ وبعدين اقفل Docker وشغّل التستات: الرسالة بتقول إيه؟`,
          flag: "script",
          deep: {
            why: R`«التستات عدّت عندي» مع H2 أو داتابيز محلية فيها داتا قديمة مش ضمان. Testcontainers بيدي كل واحد (وكل CI) نفس الداتابيز بنفس الإصدار بنفس الـ migrations، من الصفر.`,
            how: R`الـ [[@Container]] على حقل static: الـ container بيقوم مرة واحدة للـ class كله. Testcontainers بيشغّل كمان container صغير اسمه Ryuk بيمسح كل حاجة لو العملية وقعت.

[[@ServiceConnection]] (Boot 3.1+) بيعمل [[ConnectionDetails]] bean من الـ container، فـ Spring بيوصّل الـ DataSource بيه، و Flyway بيشغّل الـ migrations عليه.

الـ Spring test context بيتكاش بين التست classes اللي ليها نفس الإعدادات، فلو كذا class بيستخدموا نفس الإعداد، التطبيق بيقوم مرة واحدة. عشان كده أحسن تعمل base class أو [[@TestConfiguration]] فيه الـ container ([[@Bean @ServiceConnection PostgreSQLContainer postgres()]]) وتستخدمه في كل حتة.

ونفس الـ config ينفع تشغّل بيه التطبيق نفسه في التطوير ([[SpringApplication.from(TasksApplication::main).with(TestcontainersConfig.class).run(args)]]) من غير ما تسطّب Postgres.

في GitHub Actions الـ runners العادية فيها Docker، فبيشتغل من غير إعداد (راجع «تاب GitHub Actions»).`,
            when: R`[[@DataJpaTest]] و [[@SpringBootTest]] اللي بيلمسوا داتابيز. ولأي خدمة تانية (Redis، و Kafka، و MinIO...) فيه modules جاهزة.`,
            mistakes: R`container جديد لكل تست method (حقل مش static): بطيء جدًا. و [[postgres:latest]]: الإصدار بيتغير من غير ما تاخد بالك، ثبّته زي الإنتاج. و [[@SpringBootTest]] بإعدادات مختلفة شوية في كل class فالـ context ميتكاشش والتستات تبطأ.`
          },
          lines: [
            "التطبيق كله (integration test).",
            "فعّل Testcontainers.",
            "class.",
            "container.",
            "Spring ياخد الاتصال منه.",
            R`Postgres 17، static عشان يقوم مرة واحدة.`,
            "repository حقيقي.",
            "تست.",
            "LazyInitializationException.",
            R`[[findById]] برّه أي transaction: الـ session بتتقفل بعده.`,
            "لمس المشروع (lazy proxy).",
            "النوع.",
            "الرسالة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`وانت التستات شغالة، [[docker ps]] بيوري container [[postgres:17-alpine]] بـ port عشوائي (مش 5432، عشان ميتخانقش مع Postgres عندك) و container [[testcontainers/ryuk]]. وبعد ما التستات تخلص بيختفوا.

من غير Docker: التستات دي بتفشل بـ [[Could not find a valid Docker environment]]. (لو عايز تتخطاها في الحالة دي: [[@Testcontainers(disabledWithoutDocker = true)]].) في مشروعنا الـ suite كلها (١٣ تست، منهم ٦ بـ Testcontainers) خلصت في أقل من دقيقة.`
        }
      ]
    },
    {
      t: "الإنتاج",
      l: 3,
      n: "Actuator للـ health والـ metrics، و Docker image، و virtual threads وذاكرة الـ JVM في container",
      items: [
        {
          cmd: "Actuator",
          title: "التطبيق يقول هو شغال ولا لأ، ويطلّع metrics",
          desc: R`[[spring-boot-starter-actuator]] بيضيف endpoints تحت [[/actuator]]: [[health]] (شغال؟ والداتابيز متوصلة؟)، و [[health/liveness]] و [[health/readiness]] (لـ Kubernetes و Docker)، و [[metrics]]، و [[info]]. ومع [[micrometer-registry-prometheus]] بيطلّع [[/actuator/prometheus]] بصيغة Prometheus.

افتراضيًا [[health]] بس اللي معروض على HTTP. الباقي بتفتحه بـ [[management.endpoints.web.exposure.include]]، وتحميه بالـ security. والـ metrics فيها من غير ما تكتب حاجة: عدد الـ requests وزمنها لكل endpoint، والـ JVM memory، والـ GC، و connection pool.`,
          example: R`management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true
# curl localhost:8080/actuator/health
# curl localhost:8080/actuator/health/readiness
# curl localhost:8080/actuator/prometheus -H "Authorization: Bearer $ADMIN_TOKEN"`,
          try: R`اعمل كام request على [[/api/tasks]]، وبعدين افتح [[/actuator/metrics/http.server.requests]] (بـ token admin) ودوّر على الـ tags. وبعدين وقّف PostgreSQL ([[service postgresql stop]]، أو [[docker compose stop db]]) واطلب [[/actuator/health]] و [[/actuator/health/readiness]]: بقوا إيه؟`,
          flag: "script",
          deep: {
            why: R`Docker و Kubernetes و الـ load balancer محتاجين يعرفوا التطبيق جاهز ولا لأ عشان يبعتوله traffic أو يعيدوا تشغيله. و Prometheus و Grafana محتاجين metrics. من غير Actuator هتكتب ده كله بإيدك. (Prometheus و Grafana نفسهم في «تاب Cloud و DevOps».)`,
            how: R`الـ health مجمّع من health indicators: [[db]] (بيعمل query بسيط)، و [[diskSpace]]، و [[ping]]، وأي indicator تعمله انت. لو أي واحد DOWN، الكل DOWN و status 503. والتفاصيل مش بتظهر إلا لو [[management.endpoint.health.show-details]] بيسمح.

liveness («التطبيق عايش ولا لازم restart؟») و readiness («جاهز ياخد traffic؟») مختلفين، و Boot بيعمل groups للاتنين لما [[probes.enabled]] أو لما يلاقي نفسه في Kubernetes. افتراضيًا الاتنين بيعتمدوا على حالة التطبيق الداخلية بس، مش على الداتابيز: جربناها ووقفنا Postgres، فـ [[/actuator/health]] بقى 503 DOWN، و liveness و readiness فضلوا UP. لو عايز الـ readiness تقع مع الداتابيز (متبعتليش traffic) ضيف [[management.endpoint.health.group.readiness.include: readinessState,db]]. ومتحطش الداتابيز في الـ liveness أبدًا: restart مش هيصلّح الداتابيز.

Micrometer هو الـ facade للـ metrics (زي SLF4J للـ logs): الكود بيسجّل counters و timers، والـ registry بيطلّعهم بالصيغة المطلوبة. وفيه Micrometer Tracing و OpenTelemetry للـ traces (في Boot 4 فيه starter [[spring-boot-starter-opentelemetry]]، راجع الـ docs لإعداده).`,
            when: R`في كل تطبيق هيروح إنتاج. الـ health مفتوح (أو على بورت إدارة داخلي بـ [[management.server.port]])، والباقي محمي.`,
            mistakes: R`[[include: "*"]] ومفتوح للنت: [[/actuator/env]] و [[/actuator/heapdump]] فيهم أسرار وباسوردات. و liveness بتعتمد على الداتابيز فوقوع الداتابيز يعمل restart loop لكل الـ pods. وتشغيل Prometheus من غير ما تحمي [[/actuator/prometheus]].`
          },
          lines: [
            "إعدادات الإدارة.",
            "الـ endpoints.",
            "على HTTP.",
            "اللي هيتعرض.",
            R`الأربعة دول بس. متعملش [["*"]].`,
            "إعدادات endpoint معين.",
            "الـ health.",
            "الـ probes.",
            R`يفعّل [[/health/liveness]] و [[/health/readiness]] حتى برّه Kubernetes.`
          ],
          sol: R`[[/actuator/metrics/http.server.requests]] بيرجع [[availableTags]] زي [[uri]] (فيها [[/api/tasks]])، و [[status]]، و [[method]]، و [[outcome]] ([[SUCCESS]] و [[CLIENT_ERROR]]). تقدر تفلتر: [[?tag=uri:/api/tasks&tag=status:200]]. وفي [[/actuator/prometheus]] نفس الداتا كـ [[http_server_requests_seconds_count{...}]]، ومعاها [[jvm_threads_live_threads]] و [[hikaricp_connections_active]].

ولما Postgres يقف: [[/actuator/health]] بيرجع [[503]] و [[{"groups":["liveness","readiness"],"status":"DOWN"}]] (ولو التفاصيل مفتوحة هتلاقي [[db]] هو اللي DOWN)، بس [[/health/liveness]] و [[/health/readiness]] فضلوا [[UP]] لأن الداتابيز مش جزء منهم افتراضيًا (شوف الشرح العميق). رجّع Postgres وهيرجع UP لوحده. (لو Postgres بتاعك مشترك مع حاجات تانية، جرّب في compose بـ [[docker compose stop db]] بدل ما توقف الـ service.)`
        },
        {
          cmd: "Docker",
          title: "تعمل image للتطبيق وتشغّله مع PostgreSQL بـ compose",
          desc: R`الطريقة البسيطة: [[./mvnw package]] وبعدين Dockerfile بياخد الـ jar ويشغّله على image فيها JRE بس (مش JDK). والأحسن تفك الـ jar لطبقات ([[jarmode=tools extract --layers]]): المكتبات في طبقة لوحدها، فلما تغيّر كودك بس، الـ layer الكبيرة بتفضل في الكاش والـ push بيبقى صغير.

وفيه بديل من غير Dockerfile: [[./mvnw spring-boot:build-image]] بيعمل image بـ Cloud Native Buildpacks. أساسيات Docker و compose في «تاب Docker».`,
          example: R`FROM eclipse-temurin:25-jre AS extract
WORKDIR /build
COPY target/*.jar app.jar
RUN java -Djarmode=tools -jar app.jar extract --layers --launcher --destination extracted

FROM eclipse-temurin:25-jre
RUN useradd --system --uid 10001 spring
USER spring
WORKDIR /app
COPY --from=extract /build/extracted/dependencies/ ./
COPY --from=extract /build/extracted/spring-boot-loader/ ./
COPY --from=extract /build/extracted/snapshot-dependencies/ ./
COPY --from=extract /build/extracted/application/ ./
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "org.springframework.boot.loader.launch.JarLauncher"]`,
          try: R`اعمل الـ image ([[docker build -t tasks-api:dev .]])، واعمل [[compose.yaml]] فيه [[db]] (postgres:17-alpine بـ healthcheck) و [[api]] بيعتمد عليه، وخلي الـ api يشتغل بـ profile [[prod]]. اطلب [[/actuator/health/readiness]]. وبعدين غيّر سطر في controller واعمل build تاني: أنهي layers اتعملت من جديد؟`,
          flag: "script",
          deep: {
            why: R`أغلب الـ deploy النهارده containers. و image Java ممكن تبقى ٨٠٠ ميجا ومتعملش كاش لو اتعملت غلط، وممكن تشتغل root، وممكن الـ JVM ياخد ذاكرة أكتر من الـ container فيتقتل (OOMKilled).`,
            how: R`multi-stage: الـ stage الأول بيفك الـ jar، والتاني بيبني الـ image النهائية طبقة طبقة. الـ dependencies نادرًا ما بتتغير فبتتكاش، والـ [[application]] (كودك) صغيرة. ولو عايز الـ build نفسه (mvnw package) جوه Docker، ضيف stage أول بـ [[eclipse-temurin:25-jdk]] وانسخ [[pom.xml]] وشغّل [[dependency:go-offline]] قبل ما تنسخ [[src]] عشان الكاش.

[[JarLauncher]] (في Boot 3.2+ في [[org.springframework.boot.loader.launch]]) بيشغّل التطبيق من الطبقات المفكوكة.

الذاكرة: الـ JVM الحديث بيعرف حدود الـ container (cgroups)، و [[-XX:MaxRAMPercentage=75]] يعني الـ heap لحد ٧٥٪ من ذاكرة الـ container، والباقي للـ metaspace والـ threads والـ native memory. من غيره الافتراضي ٢٥٪ بس.

[[USER spring]]: متشغّلش كـ root. وفي الـ compose، الـ env vars ([[SPRING_DATASOURCE_URL]] و [[SPRING_PROFILES_ACTIVE]] و [[DB_PASSWORD]]) بتغيّر الإعدادات من غير build (relaxed binding).`,
            when: R`أي deploy بـ Docker أو Kubernetes أو PaaS بيقبل images. ولو الـ startup time مهم جدًا (serverless)، فيه GraalVM native image ([[spring-boot:build-image -Pnative]]) بيقوم في أجزاء من الثانية، بس الـ build بطيء وفيه قيود على الـ reflection.`,
            mistakes: R`JDK كامل في الـ image النهائية. و [[COPY . .]] وبعدين build جوه Docker من غير كاش للمكتبات فكل build ياخد ٥ دقايق. و [[-Xmx]] ثابت أكبر من حد الـ container. و [[depends_on]] من غير [[condition: service_healthy]] فالتطبيق يقوم قبل Postgres ويقع. والأسرار في [[ENV]] جوه الـ Dockerfile.`
          },
          lines: [
            R`stage أول: JRE 25 بس لفك الـ jar.`,
            "فولدر شغل.",
            "الـ jar من target.",
            "فك الـ jar لطبقات (مكتبات، و loader، وكودك).",
            R`stage نهائي نضيف.`,
            "يوزر عادي.",
            "متشتغلش root.",
            "فولدر التطبيق.",
            "المكتبات: أكبر طبقة وأقلها تغيير.",
            "الـ launcher بتاع Spring Boot.",
            "مكتبات SNAPSHOT لو فيه.",
            "كودك: أصغر طبقة وأكترها تغيير.",
            "توثيق للبورت.",
            R`شغّل بالـ launcher، والـ heap لحد ٧٥٪ من ذاكرة الـ container.`
          ],
          sol: R`الـ compose تحت، وجربناه: [[Container tasks-api-db-1 Healthy]] وبعدين [[api]] قام، واللوج فيه [[The following 1 profile is active: "prod"]]، و [[curl localhost:18080/actuator/health/readiness]] رجّع [[{"status":"UP"}]]. الـ image طلعت حوالي ١٧٠ ميجا (content size).

ولما تغيّر سطر في controller وتعمل package و build تاني: هتلاقي [[CACHED]] على خطوات الـ dependencies والـ loader، والـ [[application]] بس اللي اتعملت من جديد. ولاحظ إن [[SPRING_DATASOURCE_URL]] بيستخدم اسم الـ service [[db]] مش localhost (راجع درس الشبكات في «تاب Docker»).`,
          solCode: R`services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: tasks
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d tasks"]
      interval: 5s
      retries: 10
  api:
    image: tasks-api:dev
    depends_on:
      db:
        condition: service_healthy
    environment:
      SPRING_PROFILES_ACTIVE: prod
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/tasks
      DB_PASSWORD: secret
      JWT_SECRET: change-me-change-me-change-me-32bytes!!
    ports:
      - "18080:8080"`
        },
        {
          cmd: "virtual threads",
          title: "آلاف الـ requests المتزامنة من غير async: virtual threads",
          desc: R`Spring MVC شغال thread لكل request. الـ platform threads تقيلة (ميجا ذاكرة لكل واحد)، فـ Tomcat عنده ٢٠٠ بس افتراضيًا، ولو كلهم مستنيين داتابيز أو API خارجي، الـ request رقم ٢٠١ بيستنى.

الـ virtual threads (من Java 21) threads خفيفة جدًا بيديرها الـ JVM: تقدر تعمل مليون، ولما واحد يستنى I/O الـ JVM بيشيله من الـ OS thread ويشغّل غيره. بتكتب كود blocking عادي (زي اللي فات كله)، وبتاخد scalability قريبة من Node. في Spring Boot سطر واحد: [[spring.threads.virtual.enabled=true]].`,
          example: R`import java.time.*;
import java.util.concurrent.*;

void main() throws Exception {
    Instant start = Instant.now();
    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
        List<Future<Integer>> results = new ArrayList<>();
        for (int i = 0; i < 10_000; i++) {
            int n = i;
            results.add(executor.submit(() -> {
                Thread.sleep(Duration.ofMillis(200));
                return n;
            }));
        }
        long sum = 0;
        for (var f : results) sum += f.get();
        IO.println("sum=" + sum);
    }
    IO.println("took ~" + Duration.between(start, Instant.now()).toMillis() / 100 * 100 + "ms");
    Thread t = Thread.ofVirtual().start(() -> IO.println("virtual? " + Thread.currentThread().isVirtual()));
    t.join();
}`,
          try: R`شغّل المثال، وبعدين غيّر [[newVirtualThreadPerTaskExecutor()]] لـ [[Executors.newFixedThreadPool(200)]] وشغّل تاني: خد كام؟ وفي المشروع، فعّل [[spring.threads.virtual.enabled]] وبص على اسم الـ thread في اللوج.`,
          flag: "script",
          deep: {
            why: R`قبل كده كان الحل للـ scalability هو WebFlux و reactive programming (Mono و Flux): أسرع بس الكود صعب جدًا يتقرا ويتـ debug. الـ virtual threads بتديك معظم المكسب بالكود العادي. وده سؤال انترفيو جديد مفضّل.`,
            how: R`الـ virtual thread بيتشغّل فوق carrier thread (platform thread من pool صغير، بعدد الـ CPU cores). لما يعمل blocking I/O (socket، أو [[sleep]]، أو lock من [[java.util.concurrent]])، الـ JVM بيحفظ الـ stack بتاعه في الـ heap ويفضّي الـ carrier لـ virtual thread تاني. عشان كده ١٠٠٠٠ مهمة كل واحدة بتنام ٢٠٠ms خلصوا في حوالي ٣٠٠ms.

القيود: الشغل اللي بياكل CPU مش بيستفيد (الـ cores هي هي). و [[synchronized]] كان بيثبّت (pin) الـ virtual thread على الـ carrier في Java 21، واتحلت في Java 24 (JEP 491)، فعلى Java 25 أقل مشكلة. والـ connection pool لسه حد: ١٠٠٠٠ request متزامن و ١٠ connections للداتابيز = ٩٩٩٠ مستنيين؛ الـ virtual threads مش بتزوّد الداتابيز.

في Spring Boot الخاصية بتخلي Tomcat و [[@Async]] والـ scheduling يستخدموا virtual threads. واسم الـ thread في اللوج بيبقى [[tomcat-handler-N]] بدل [[http-nio-8080-exec-N]].

ومن Java 25 فيه [[ScopedValue]] (بديل أخف لـ ThreadLocal) نهائي، و structured concurrency لسه preview.`,
            when: R`APIs بتستنى I/O كتير (داتابيز، و HTTP لخدمات تانية) وعدد الـ requests المتزامنة كبير. على Java 21+ مع Boot 3.2+ فعّلها وقيس. ومش هتفرق في تطبيق CPU-bound أو بـ traffic قليل.`,
            mistakes: R`تفتكر إنها بتخلي الكود أسرع: هي بتخلي عدد أكبر يستنى في نفس الوقت، مش كل واحد أسرع. و pool لـ virtual threads ([[newFixedThreadPool]] مع virtual factory): اعمل واحد لكل مهمة، هما رخاص. و ThreadLocal فيه objects تقيلة مع مليون thread.`
          },
          lines: [
            "الوقت.",
            "الـ executors.",
            "main بترمي checked exceptions من get.",
            "بداية العد.",
            R`executor بيعمل virtual thread جديد لكل مهمة، و try-with-resources بيستنى الكل ويقفل.`,
            "النتايج.",
            "١٠٠٠٠ مهمة.",
            R`نسخة effectively final للـ lambda.`,
            "كل مهمة.",
            R`بتستنى ٢٠٠ms (زي query أو HTTP call).`,
            "وترجع رقمها.",
            "قفلة.",
            "قفلة الـ loop.",
            "المجموع.",
            R`[[get()]] بتستنى النتيجة.`,
            R`[[sum=49995000]].`,
            "هنا كل الـ threads خلصت.",
            R`حوالي [[200ms]] لـ [[300ms]]، مش ١٠٠٠٠ × ٢٠٠ms.`,
            "virtual thread لوحده.",
            R`يستنى يخلص. بيطبع [[virtual? true]].`,
            "قفلة."
          ],
          sol: R`مع virtual threads: [[sum=49995000]] و [[took ~200ms]] أو [[~300ms]] حسب المرة (على جهاز فيه ٤ cores عندنا).

مع [[newFixedThreadPool(200)]]: ١٠٠٠٠ ÷ ٢٠٠ = ٥٠ دفعة × ٢٠٠ms ≈ ١٠ ثواني. نفس الكود، والفرق كله إن الـ platform threads محدودة.

وفي المشروع بعد التفعيل، سطر الـ SQL في اللوج كان على thread اسمه [[tomcat-handler-9]] بدل [[http-nio-8080-exec-1]]: ده virtual thread.`
        }
      ]
    },
    {
      t: "أسئلة انترفيو Java و Spring",
      l: 3,
      n: "الأسئلة اللي بتتكرر: الـ JVM والـ GC، و equals و hashCode، و HashMap، والـ bean scopes، و @Transactional، و lazy loading",
      items: [
        {
          cmd: "JVM والـ GC",
          title: "الذاكرة في Java متقسمة إزاي، والـ Garbage Collector بيشتغل إزاي؟",
          desc: R`الإجابة المختصرة: كل thread ليه stack فيه المتغيرات المحلية والـ primitives والـ references. والـ objects كلها في الـ heap المشترك. والـ class metadata في الـ metaspace (برّه الـ heap). الـ GC بيدوّر على الـ objects اللي مفيش حد بيشاور عليها (من الـ GC roots: الـ stacks والـ static fields) ويمسحها.

الـ heap متقسم لأجيال: young (الـ objects الجديدة، ومعظمها بيموت بسرعة) و old (اللي عاشوا كذا GC). الـ GC الافتراضي G1: بيقسم الـ heap لـ regions وبيحاول يخلي الـ pauses قصيرة. و ZGC للـ pauses تحت الـ ms مع heaps كبيرة.`,
          example: R`void main() {
    Runtime rt = Runtime.getRuntime();
    IO.println("max heap MB: " + rt.maxMemory() / 1024 / 1024);
    IO.println("cpus: " + rt.availableProcessors());
    List<byte[]> keep = new ArrayList<>();
    for (int i = 0; i < 50; i++) {
        byte[] garbage = new byte[1024 * 1024];
        if (i % 10 == 0) keep.add(garbage);
    }
    IO.println("kept: " + keep.size());
    for (var gc : java.lang.management.ManagementFactory.getGarbageCollectorMXBeans())
        IO.println(gc.getName() + " runs=" + gc.getCollectionCount());
}
// java -Xmx64m -Xlog:gc Gc.java`,
          try: R`شغّل بـ [[java -Xmx64m -Xlog:gc Gc.java]] واقرا سطور الـ GC. وبعدين غيّر [[if (i % 10 == 0)]] لـ [[if (true)]] (يعني احتفظ بكله): إيه اللي حصل، وإيه اسمه؟ وجاوب بصوتك: «Java فيها memory leaks مع إن فيها GC؟»`,
          flag: "script",
          deep: {
            why: R`بيتسأل في أي انترفيو Java تقريبًا، ومهم في الشغل: OutOfMemoryError، و pauses بتبطّأ الـ API، و container بيتقتل. الانترفيوير عايز يعرف إنك فاهم الـ stack والـ heap والـ reachability، مش حافظ أسماء collectors.`,
            how: R`نقط لو اتسألت أكتر: الـ young GC (minor) سريع لأنه بينسخ الأحياء القليلين بس ([[Pause Young]] في اللوج). الـ objects اللي عاشت كذا مرة بتترقى للـ old. الـ full GC أو الـ concurrent cycle للـ old أغلى.

الـ reachability: الـ GC مش بيعد references (زي Python)، بيعمل tracing من الـ roots، فالـ cycles (A بيشاور على B و B على A) بتتمسح عادي لو محدش من برّه بيشاور عليهم.

الـ memory leak في Java: objects لسه reachable ومحدش محتاجها: static map بتكبر للأبد (cache من غير حد)، أو listeners متسجلة ومتشالتش، أو ThreadLocal في thread pool. الـ GC مش هيمسحهم لأنهم «مستخدمين» من وجهة نظره.

الـ objects الكبيرة (أكبر من نص region في G1) اسمها humongous وبتتحط مباشرة في مناطق خاصة، وده اللي ظهر في اللوج ([[G1 Humongous Allocation]]).

أدوات: [[-Xlog:gc]]، و [[jcmd <pid> GC.heap_info]]، و heap dump بـ [[-XX:+HeapDumpOnOutOfMemoryError]] وتحلله بـ Eclipse MAT، و JFR ([[jcmd <pid> JFR.start]]).`,
            when: R`«اشرح الـ heap والـ stack»، و «الـ GC بيشتغل إزاي؟»، و «إيه اللي بيعمل OutOfMemoryError؟»، و «إزاي تحقق في memory leak في الإنتاج؟»، و «G1 ولا ZGC؟».`,
            mistakes: R`«الـ primitives على الـ stack والـ objects على الـ heap» بشكل مطلق: الـ primitive حقل في object بيبقى في الـ heap مع الـ object. و «System.gc() بيشغّل الـ GC»: ده طلب ممكن يتجاهل. و «Java مفيهاش memory leaks». و «أزوّد -Xmx» كحل لأي OOM من غير ما تعرف السبب.`
          },
          lines: [
            "main.",
            "معلومات الـ JVM.",
            R`أقصى heap (من [[-Xmx]] أو ٢٥٪ من الذاكرة افتراضيًا).`,
            "الـ cores اللي الـ JVM شايفها (في container: حدود الـ container).",
            "list بنحتفظ فيها ببعض الـ objects.",
            "٥٠ مرة.",
            R`١ ميجا جديدة كل لفة. لو محدش مسكها، بتبقى garbage بعد اللفة.`,
            R`كل عاشر واحدة بنحتفظ بيها: reachable من [[keep]]، فالـ GC مش هيمسحها.`,
            "قفلة.",
            R`[[kept: 5]].`,
            "الـ collectors الشغالة.",
            "اسمها وعدد مرات تشغيلها.",
            "قفلة."
          ],
          sol: R`مع [[-Xmx64m -Xlog:gc]] عندنا: [[Using G1]]، و [[max heap MB: 64]]، وسطور زي [[GC(0) Pause Young (Normal) (G1 Evacuation Pause) 29M->6M(64M) 10.428ms]]: الـ heap كان ٢٩ ميجا ونزل لـ ٦ في ١٠ms، لأن معظم الـ arrays كانت garbage. و [[kept: 5]].

ولما تخلي [[if (true)]]: الـ ٥٠ ميجا كلهم reachable، ومع حد ٦٤ ميجا والـ overhead، البرنامج بيقع بـ [[java.lang.OutOfMemoryError: Java heap space]]. ده مش leak بالمعنى الحرفي، بس نفس الآلية: objects reachable بتتراكم.

الإجابة على السؤال: أيوة. الـ GC بيمسح اللي مش reachable بس، والـ leak في Java هو object لسه reachable ومحدش محتاجه، زي cache في static map من غير حد أو eviction.`
        },
        {
          cmd: "equals و hashCode",
          title: "ليه لو عملت override لـ equals لازم تعمل hashCode؟",
          desc: R`العقد: لو [[a.equals(b)]] يبقى لازم [[a.hashCode() == b.hashCode()]]. الـ HashSet والـ HashMap بيدوّروا بالـ hashCode الأول (يروحوا للـ bucket)، وبعدين بـ equals جوه الـ bucket. لو عملت equals بس، اتنين objects «متساويين» ليهم hashCode مختلف (الافتراضي من الـ identity)، فبيروحوا buckets مختلفة، و [[contains]] بترجع false.

العكس مش لازم: اتنين hashCode بتاعهم واحد ممكن ميبقوش equal (collision)، وده عادي. والـ records بتعمل الاتنين صح لوحدها.`,
          example: R`class Point {
    final int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        return o instanceof Point p && p.x == x && p.y == y;
    }
}

class FixedPoint extends Point {
    FixedPoint(int x, int y) { super(x, y); }
    @Override
    public int hashCode() { return Objects.hash(x, y); }
}

void main() {
    IO.println(new Point(1, 2).equals(new Point(1, 2)));
    Set<Point> broken = new HashSet<>(List.of(new Point(1, 2)));
    IO.println(broken.contains(new Point(1, 2)));
    Set<Point> fixed = new HashSet<>(List.of(new FixedPoint(1, 2)));
    IO.println(fixed.contains(new FixedPoint(1, 2)));
}`,
          try: R`اكتب equals و hashCode لـ JPA entity [[Task]] بالشكل الآمن: على الـ id بس، و hashCode ثابت. وجاوب: ليه hashCode على الـ id مباشرة ([[Objects.hash(id)]]) مشكلة لو حطيت entity جديد (id null) في HashSet وبعدين عملتله save؟`,
          flag: "script",
          deep: {
            why: R`سؤال كلاسيكي، وبيطلع في bugs حقيقية: entities في Set، ومفاتيح Map مركّبة، ومقارنات في التستات. وفي JPA بالذات الإجابة الصح مش بديهية.`,
            how: R`[[Object.equals]] الافتراضي هو [[==]] (نفس الـ object)، و [[hashCode]] الافتراضي مبني على الـ identity. شروط equals: reflexive و symmetric و transitive و consistent، و [[x.equals(null)]] false.

الخطوات في HashSet.contains: احسب hashCode ← روح الـ bucket ← قارن بـ equals مع اللي فيه. hashCode غلط = bucket غلط = مش لاقي حتى لو equals صح.

في JPA: الـ id بيتولّد عند الـ persist، فـ hashCode مبني على الـ id بيتغير بعد الـ save، والـ object يبقى في bucket غلط جوه الـ Set. الحل الشائع: equals على الـ id (ولو null يبقى مش متساوي غير مع نفسه)، و hashCode ثابت ([[getClass().hashCode()]]). كمان خلي بالك إن Hibernate proxies بتبقى subclass، فـ [[getClass() != o.getClass()]] ممكن يطلع false غلط.

ومفاتيح HashMap لازم تبقى immutable: لو غيّرت حقل داخل في الـ hashCode بعد ما حطيته، ضاع (هتشوفه في الدرس الجاي).`,
            when: R`«إيه العقد بين equals و hashCode؟»، و «إيه اللي يحصل لو عملت equals بس؟»، و «إزاي تكتب equals لـ JPA entity؟»، و «ليه records حلّت المشكلة؟».`,
            mistakes: R`«hashCode متساوي يعني equal». و equals بتاخد [[Point]] بدل [[Object]] (ده overload مش override، والـ HashSet مش هيناديه؛ [[@Override]] بتمسك الغلطة دي). و Lombok [[@Data]] على entity: equals و hashCode على كل الحقول بما فيها العلاقات lazy.`
          },
          lines: [
            "class عادي.",
            "حقلين.",
            "constructor.",
            "override لـ equals.",
            R`الـ signature: بتاخد [[Object]] مش Point، وإلا تبقى overload والـ HashSet مش هيناديها.`,
            R`pattern matching: نفس النوع ونفس القيم. ومفيش hashCode!`,
            "قفلة.",
            "قفلة.",
            "class بيصلّح المشكلة.",
            "constructor.",
            "override.",
            R`hashCode من نفس الحقول اللي في equals.`,
            "قفلة.",
            "main.",
            R`[[true]]: equals شغالة.`,
            "Set فيها نقطة.",
            R`[[false]]: hashCode مختلف فراح bucket تاني.`,
            "Set بالنوع المتصلّح.",
            R`[[true]].`,
            "قفلة."
          ],
          sol: R`الشكل الآمن تحت. المشكلة مع [[Objects.hash(id)]]: وانت بتضيف entity جديد لـ HashSet الـ id null، فالـ hash محسوب من null. بعد [[save]] الـ id بقى 42 والـ hash اتغير، بس الـ object لسه في الـ bucket القديم. [[set.contains(task)]] بقت false و [[set.remove(task)]] مش بتشيله، مع إنه جوه. الـ hashCode الثابت بيضمن إن الـ bucket مايتغيرش، وتمنه إن كل الـ entities من النوع ده في نفس الـ bucket (أبطأ مع Set فيها آلاف، ونادرًا ما ده بيحصل مع entities).`,
          solCode: R`@Override
public boolean equals(Object o) {
  if (this == o) return true;
  if (!(o instanceof Task other)) return false;
  return id != null && id.equals(other.getId());
}

@Override
public int hashCode() {
  return Task.class.hashCode();
}`
        },
        {
          cmd: "HashMap من جوه",
          title: "HashMap بيشتغل إزاي من جوه، وإيه اللي يبوظه؟",
          desc: R`HashMap فيه array من buckets (افتراضيًا ١٦). لما تعمل [[put(k, v)]]: يحسب [[k.hashCode()]]، ويخلط البتات العليا في السفلى ([[h ^ (h >>> 16)]])، وياخد [[& (n - 1)]] عشان يحدد الـ bucket. لو الـ bucket فيه عناصر، يقارن بـ equals: لو لقى نفس المفتاح يغيّر القيمة، لو لأ يضيف.

لما العناصر توصل ٧٥٪ من عدد الـ buckets (load factor)، بيضاعف الـ array ويوزّع كله من جديد (resize). ولو bucket واحد فيه أكتر من ٨ عناصر (والـ array ٦٤ أو أكبر)، بيتحول من linked list لشجرة (red-black tree) عشان البحث يبقى O(log n) بدل O(n).`,
          example: R`record Key(String name) {
    @Override public int hashCode() { return 42; }
}

void main() {
    Map<String, Integer> m = new HashMap<>();
    m.put("Aa", 1);
    m.put("BB", 2);
    IO.println("Aa".hashCode() + " " + "BB".hashCode() + " " + m);
    int h = "spring".hashCode();
    IO.println("bucket in 16: " + ((h ^ (h >>> 16)) & 15));
    Map<Key, Integer> slow = new HashMap<>();
    long t = System.nanoTime();
    for (int i = 0; i < 20_000; i++) slow.put(new Key("k" + i), i);
    IO.println("all in one bucket: " + slow.size() + " in " + (System.nanoTime() - t) / 1_000_000 + "ms");
    List<Integer> mutableKey = new ArrayList<>(List.of(1));
    Map<List<Integer>, String> byList = new HashMap<>();
    byList.put(mutableKey, "found");
    mutableKey.add(2);
    IO.println(byList.get(mutableKey) + " " + byList.size());
}`,
          try: R`غيّر [[return 42]] في [[Key]] لـ [[return name.hashCode()]] وقارن الوقت. وبعدين خلي [[Key]] يعمل [[implements Comparable<Key>]] (قارن بالـ name) ورجّع [[return 42]]: الوقت اتحسن؟ ليه؟`,
          flag: "script",
          deep: {
            why: R`من أكتر أسئلة Java تكرارًا. والإجابة بتوري إنك فاهم hashing و equals و hashCode و complexity مع بعض. وليها أثر عملي: مفاتيح بتتغير، و hashCode وحش، و HashMap بين threads.`,
            how: R`نقط لو اتسألت أكتر: [[get]] و [[put]] O(1) في المتوسط، O(log n) أسوأ حالة من Java 8 (بسبب الـ treeification)، وقبلها كانت O(n). الـ treeification بتستخدم [[compareTo]] لو المفاتيح Comparable، ولو لأ بتستخدم ترتيب احتياطي (tie-break) مش بيساعد في البحث، عشان كده [[Key]] مع hash ثابت فضل بطيء.

الـ resize بيحصل لما [[size > capacity * 0.75]]، وبيعيد توزيع كل العناصر O(n). لو عارف الحجم تقريبًا: [[HashMap.newHashMap(expectedSize)]] (Java 19+).

المفتاح null مسموح (واحد، في bucket 0). و HashMap مش thread-safe: من كذا thread استخدم [[ConcurrentHashMap]] (مش [[Collections.synchronizedMap]] ولا [[Hashtable]] القديم).

والمفتاح اللي بيتغير: الـ hash اتحسب وقت الـ put، فلو المفتاح اتغير، الـ get بيحسب hash جديد ويروح bucket تاني: [[null]]، والعنصر لسه جوه (size 1). ده اللي حصل في آخر سطرين.`,
            when: R`«HashMap بيشتغل إزاي؟»، و «إيه اللي يحصل في collision؟»، و «إيه الـ load factor؟»، و «HashMap ولا ConcurrentHashMap؟»، و «ليه مفاتيح HashMap لازم تبقى immutable؟»، و «ليه String مفتاح كويس؟» (immutable و hashCode متكاش).`,
            mistakes: R`«O(1) دايمًا». و «الـ collisions بتمسح القيمة القديمة». ونسيان خطوة الـ equals. و «HashMap بيحافظ على الترتيب» (ده LinkedHashMap). و HashMap عادي كـ cache مشترك بين الـ requests في Spring bean.`
          },
          lines: [
            R`record مفتاح بـ hashCode ثابت (أسوأ hash ممكن).`,
            "كل المفاتيح نفس الرقم.",
            "قفلة.",
            "main.",
            "map عادية.",
            "مفتاح.",
            "مفتاح تاني.",
            R`[[2112 2112 {Aa=1, BB=2}]]: نفس الـ hashCode (collision) والاتنين موجودين بفضل equals.`,
            "hash لـ string.",
            R`نفس الحسبة اللي HashMap بيعملها: bucket رقم [[0]] من ١٦.`,
            "map بالمفتاح الوحش.",
            "وقت.",
            "٢٠٠٠٠ مفتاح كلهم في bucket واحد.",
            R`حوالي [[4048ms]] عندنا، والمفروض أجزاء من الثانية.`,
            "list هتبقى مفتاح.",
            "map مفتاحها list.",
            "put.",
            R`غيّرنا المفتاح بعد ما اتحط: الـ hashCode اتغير.`,
            R`[[null 1]]: مش لاقيه، وهو لسه جوه.`,
            "قفلة."
          ],
          sol: R`مع [[name.hashCode()]] الـ ٢٠٠٠٠ مفتاح اتحطوا عندنا في حوالي ٥ ms بدل ٣ لـ ٤ ثواني: كل مفتاح في bucket تقريبًا لوحده.

ومع [[Comparable]] و hash ثابت: حوالي ٣٥ ms عندنا، يعني أسرع بمية مرة من غير Comparable، بس لسه أبطأ من الـ hash الكويس. لما الـ bucket يتحول لشجرة، الشجرة بتترتب بـ [[compareTo]]، فالبحث جوه الـ bucket بقى O(log n) بدل O(n). من غير Comparable، الشجرة مش بتعرف ترتب المفاتيح بشكل مفيد في البحث، فبتدوّر في كله. الدرس: hashCode كويس أهم حاجة، والـ treeification شبكة أمان.`,
          solCode: R`record Key(String name) implements Comparable<Key> {
    @Override public int hashCode() { return 42; }
    @Override public int compareTo(Key o) { return name.compareTo(o.name); }
}

void main() {
    Map<Key, Integer> m = new HashMap<>();
    long t = System.nanoTime();
    for (int i = 0; i < 20_000; i++) m.put(new Key("k" + i), i);
    IO.println(m.size() + " in " + (System.nanoTime() - t) / 1_000_000 + "ms");
}`
        },
        {
          cmd: "bean scopes",
          title: "الـ beans singleton ولا بيتعمل واحد لكل request؟",
          desc: R`الافتراضي singleton: object واحد للـ ApplicationContext كله، مشترك بين كل الـ requests والـ threads. عشان كده الـ services لازم تبقى stateless (أو thread-safe). [[prototype]]: object جديد كل مرة حد يطلب الـ bean. وفي الويب: [[request]] (واحد لكل HTTP request) و [[session]].

الفخ المشهور: prototype محقون في singleton بيتحقن مرة واحدة وقت عمل الـ singleton، فبيبقى عملًيا singleton. عشان تاخد واحد جديد كل مرة: [[ObjectProvider<Proto>]] و [[getObject()]].`,
          example: R`@Component static class Single {}
@Component @Scope("prototype") static class Proto {}
@Component static class Holder {
  final Proto injected; final ObjectProvider<Proto> provider;
  Holder(Proto injected, ObjectProvider<Proto> provider) { this.injected = injected; this.provider = provider; }
}

@Test
void scopes() {
  try (var ctx = new AnnotationConfigApplicationContext(Single.class, Proto.class, Holder.class)) {
    assertThat(ctx.getBean(Single.class)).isSameAs(ctx.getBean(Single.class));
    assertThat(ctx.getBean(Proto.class)).isNotSameAs(ctx.getBean(Proto.class));
    Holder h = ctx.getBean(Holder.class);
    assertThat(h.injected).isSameAs(h.injected);
    assertThat(h.provider.getObject()).isNotSameAs(h.provider.getObject());
  }
}`,
          try: R`اعمل [[@Service]] فيه [[private int counter;]] و method بتزوّده وترجّعه، وناديها من endpoint. ابعت ١٠٠٠ request بالتوازي ([[seq 1000 | xargs -P 50 -I{} curl -s localhost:8080/count]]) وبص على آخر رقم. وبعدين اشرح بصوتك ليه.`,
          flag: "script",
          deep: {
            why: R`بيختبر إنك فاهم إن الـ bean مشترك بين كل الـ requests، وده سبب bugs خطيرة: بيانات يوزر بتظهر ليوزر تاني لأن حد حطها في حقل في service.`,
            how: R`نقط أكتر: الـ lifecycle: Spring بيعمل الـ bean، ويحقن الـ dependencies، وينادي [[@PostConstruct]]، وفي الآخر [[@PreDestroy]] (للـ singletons بس؛ الـ prototype Spring بيسيبه بعد ما يسلّمه ومبينداش destroy).

الـ singletons بتتعمل وقت بداية التطبيق (eager)، فالأخطاء بتظهر بدري. و [[@Lazy]] بيأجلها لأول استخدام.

الـ request و session scopes بيتحقنوا في الـ singletons عن طريق proxy ([[proxyMode = ScopedProxyMode.TARGET_CLASS]]، أو [[@RequestScope]] اللي بيعمله لوحده): الـ proxy بيروح للـ object بتاع الـ request الحالي كل نداء.

Spring singleton مش Singleton pattern: واحد لكل context، ممكن تعمل [[new]] للـ class عادي، وممكن يبقى فيه اتنين beans من نفس الـ class بأسماء مختلفة.`,
            when: R`«إيه الـ scopes الموجودة؟»، و «Spring beans thread-safe؟» (لأ، Spring مبيعملش حاجة؛ انت اللي تخليها stateless)، و «إيه اللي يحصل لو حقنت prototype في singleton؟»، و «إزاي تخزن بيانات خاصة بالـ request؟» (request scope، أو ThreadLocal، أو الأحسن تعدّيها كباراميتر).`,
            mistakes: R`«كل request بيعمل service جديد». و «الـ singleton thread-safe لأنه واحد». وحقول بتتغير في services «عشان أوفر نداء للداتابيز» (cache في HashMap عادي).`
          },
          lines: [
            "singleton (الافتراضي).",
            "prototype.",
            "singleton بيطلب prototype بطريقتين.",
            R`حقن مباشر، و [[ObjectProvider]] (lazy lookup).`,
            "constructor injection.",
            "قفلة.",
            "تست.",
            "method.",
            R`context صغير من غير Spring Boot.`,
            R`singleton: نفس الـ object.`,
            "prototype: جديد كل مرة.",
            "الـ holder.",
            R`المحقون مباشرة ثابت (اتحقن مرة وقت عمل الـ Holder).`,
            R`[[getObject()]] بيعمل جديد كل مرة.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`آخر رقم غالبًا أقل من 1000 (مثلًا ٩٨٧)، ولو جربت كذا مرة هيختلف. السبب: الـ service singleton، وكل request على thread مختلف، و [[counter++]] مش atomic (اقرا، زوّد، اكتب)، فاتنين threads بيقروا نفس القيمة ويكتبوا نفس النتيجة (lost update). (مع virtual threads أو من غيرها نفس المشكلة.)

الحل لو محتاج عداد فعلًا: [[AtomicInteger]]. والأهم: الـ state المشتركة مكانها الداتابيز أو Redis، مش حقل في bean، لأن مع أكتر من نسخة من التطبيق كل واحدة هيبقى ليها عدادها. (التست اللي في المثال عدّى في المشروع.)`
        },
        {
          cmd: "فخاخ @Transactional",
          title: "ليه @Transactional ساعات مبيعملش rollback أو مبيشتغلش خالص؟",
          desc: R`تلات فخاخ مشهورة: (١) الـ self-invocation: method في نفس الـ class بتنادي method عليها [[@Transactional]] بـ [[this]]، فالنداء مش بيعدّي على الـ proxy والـ transaction مش بتتفتح. (٢) الـ checked exceptions: الـ rollback افتراضيًا على RuntimeException و Error بس، فـ [[throws Exception]] بتعمل commit. (٣) private أو final methods: الـ proxy مش بيقدر يلفها.

وكمان: لو مسكت الـ exception جوه الـ method، الـ proxy مش بيشوفها فبيعمل commit.`,
          example: R`@Service
public class AuditService {
  public boolean outer() {
    return inner();
  }

  @Transactional
  public boolean inner() {
    return TransactionSynchronizationManager.isActualTransactionActive();
  }
}

@Service
public class ImportService {
  @Transactional
  public void importChecked(String name) throws Exception {
    projects.save(new Project(name));
    throw new Exception("csv broken");
  }

  @Transactional
  public void importUnchecked(String name) {
    projects.save(new Project(name));
    throw new IllegalStateException("csv broken");
  }
}`,
          try: R`اكتب integration test (بـ Testcontainers): [[audit.inner()]] و [[audit.outer()]] بيرجعوا إيه؟ ونادي الـ import بالطريقتين وبعدين دوّر على المشروعين بالاسم: مين اتحفظ؟ وصلّح الاتنين.`,
          flag: "script",
          deep: {
            why: R`أشهر سؤال Spring في الانترفيوهات المتقدمة، وأشهر سبب لـ «الداتا اتحفظت نصها» في الإنتاج. والإجابة بتوري إنك فاهم إن Spring شغال بـ proxies.`,
            how: R`Spring بيحقن proxy (subclass بـ CGLIB) مكان الـ bean الحقيقي. لما controller ينادي [[auditService.outer()]]، النداء بيعدّي على الـ proxy، و [[outer]] مفيهاش annotation فالـ proxy بيسلّم للـ object الحقيقي. جوه، [[inner()]] يعني [[this.inner()]]، و [[this]] هو الـ object الحقيقي مش الـ proxy، فمفيش transaction.

الحلول: حط الـ annotation على الـ method اللي بتتنادى من برّه، أو انقل الـ method لـ bean تاني، أو (نادرًا) احقن الـ bean في نفسه. ونفس الكلام لـ [[@Async]] و [[@Cacheable]] و [[@PreAuthorize]].

الـ rollback rules: [[@Transactional(rollbackFor = Exception.class)]] يخلي الـ checked exceptions تعمل rollback. الافتراضي ده جاي من EJB زمان: الـ checked كانت تعتبر «أخطاء business متوقعة».

كمان: [[readOnly]] مش بيمنع الكتابة في كل الحالات، و propagation [[REQUIRES_NEW]] محتاج connection تانية (ممكن deadlock للـ pool لو صغير)، والـ transaction بتبدأ من أول نداء وبتمسك connection لحد الآخر.`,
            when: R`«@Transactional مش شغالة، ليه؟»، و «هل بيعمل rollback على checked exceptions؟»، و «إيه الـ propagation levels؟»، و «Spring AOP بيشتغل إزاي؟».`,
            mistakes: R`«ضيف @Transactional على الـ class كله وخلاص» من غير ما تفهم. و [[catch (Exception e) { log.error(...) }]] جوه method transactional فالـ commit يحصل لنص الشغل. و [[@Transactional]] على private method (Spring 6 بيدعم protected و package-private مع CGLIB، بس private لأ).`
          },
          lines: [
            "service.",
            "بداية.",
            R`method عادية من غير annotation.`,
            R`[[this.inner()]]: مش عن طريق الـ proxy.`,
            "قفلة.",
            R`[[@Transactional]] هنا.`,
            "لو اتنادت من برّه: فيه transaction.",
            "بترجع هل فيه transaction فعلًا.",
            "قفلة.",
            "قفلة.",
            "service تاني.",
            "بداية.",
            "transactional.",
            R`[[throws Exception]]: checked.`,
            "بنحفظ.",
            "checked exception.",
            "قفلة.",
            "transactional.",
            "unchecked.",
            "بنحفظ.",
            "RuntimeException.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`اللي حصل في المشروع (التست عدّى):

[[audit.inner()]] ← [[true]]، و [[audit.outer()]] ← [[false]]: نفس الـ method، بس من جوه الـ class مفيش transaction.

بعد الـ import بالطريقتين: [[findByName("Checked")]] موجود، و [[findByName("Unchecked")]] مش موجود. الـ checked exception خرجت من الـ method بس الـ transaction اتعملها commit.

الإصلاح: [[@Transactional(rollbackFor = Exception.class)]] على [[importChecked]] (أو ارمي unchecked)، وفي [[AuditService]] حط [[@Transactional]] على [[outer]] أو انقل [[inner]] لـ bean تاني.`
        },
        {
          cmd: "LazyInitializationException",
          title: "could not initialize proxy - no session: ليه، وإزاي تصلّحها صح؟",
          desc: R`العلاقة LAZY بترجع proxy فاضي، وبيتحمّل أول ما تلمسه، بشرط إن الـ Hibernate session (الـ persistence context) لسه مفتوحة. لو لمسته بعد ما الـ transaction خلصت (في الـ controller، أو في Jackson وهو بيعمل JSON)، بيرمي [[LazyInitializationException: Could not initialize proxy [...] - no session]].

الحلول الصح: حمّل اللي محتاجه جوه الـ transaction (fetch join أو [[@EntityGraph]])، وحوّل لـ DTO جوه الـ service. الحلول الغلط: EAGER، أو [[open-in-view: true]]، أو [[hibernate.enable_lazy_load_no_trans]].`,
          example: R`// برّه أي transaction (مثلًا في controller مع open-in-view: false):
Task t = tasks.findById(1L).orElseThrow();
t.getProject().getClass().getSimpleName();
t.getProject().getName();
// الصح: جوه service بـ @Transactional(readOnly = true)، أو query بيجيب العلاقة:
@Query("select t from Task t join fetch t.project where t.done = false")
List<Task> findOpenWithProject();
// وبعدين DTO جوه الـ transaction:
// return tasks.findOpenWithProject().stream().map(TaskResponse::from).toList();`,
          try: R`في المشروع، شيل [[@Transactional(readOnly = true)]] من [[open()]] وغيّر الـ query لـ [[findByDoneFalse()]] (من غير fetch join): الـ endpoint رجّع إيه؟ وبعدين خلي [[spring.jpa.open-in-view: true]]: اشتغل؟ وليه ده مش الحل؟`,
          flag: "script",
          deep: {
            why: R`أشهر exception في مشاريع JPA، وسؤال انترفيو ثابت. والطريقة اللي بتصلّحها بيها بتوري إنك فاهم الـ transactions والـ lazy loading، ولا بتدوّر على أول إعداد يخفي المشكلة.`,
            how: R`[[findById]] من غير transaction خارجية بيفتح transaction قصيرة ويقفلها. الـ project بيرجع كـ proxy (subclass من Project اسمه زي [[Project$HibernateProxy]]) فيه الـ id بس. [[getClass()]] أو [[getId()]] مش محتاجين داتابيز، إنما [[getName()]] محتاج SELECT، ومفيش session: exception.

open-in-view (OSIV): Spring Boot افتراضيًا بيفتح session من أول الـ request لآخره (حتى بعد الـ transaction)، فالـ lazy loading بيشتغل في الـ controller و Jackson. ده بيخفي المشكلة، بس: كل lazy load برّه الـ service بيعمل query جديد (N+1 مخفي في الـ JSON)، والـ connection بتفضل ماسكة طول الـ request (حتى وهو بيكتب الـ response لعميل بطيء). عشان كده Boot بيطبع warning لو سبته افتراضي.

الترتيب الصح: الـ service بـ [[@Transactional(readOnly = true)]]، والـ query بيجيب اللي محتاجه (join fetch أو EntityGraph أو DTO projection)، والـ service بيرجّع DTOs، والـ controller عمره ما بيشوف entity.`,
            when: R`«إيه LazyInitializationException وإزاي تحلها؟»، و «open-in-view كويس ولا وحش؟»، و «LAZY ولا EAGER؟»، و «ليه متعملش return للـ entity من الـ controller؟».`,
            mistakes: R`تحط EAGER على العلاقة: المشكلة بتختفي هنا وبيظهر N+1 في كل حتة تانية. أو [[Hibernate.initialize()]] في كل مكان. أو [[enable_lazy_load_no_trans=true]]: كل lazy load بيفتح transaction لوحده (أسوأ من N+1). أو «ضيف @Transactional على الـ controller».`
          },
          lines: [
            R`[[findById]] بـ transaction قصيرة خلصت.`,
            R`[[Project$HibernateProxy]]: proxy، ولسه متحمّلش.`,
            R`هنا الـ exception: [[Could not initialize proxy [com.example.tasks.Project#1] - no session]].`,
            "query بيجيب المشروع مع المهام.",
            "النتيجة جاهزة ومفيش lazy."
          ],
          sol: R`من غير transaction ومن غير fetch join: [[500]]، واللوج فيه [[LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session]] من [[TaskResponse.from]] وهو بيقرا [[getProject().getName()]]. ده بالظبط اللي التست في درس Testcontainers بيثبته (عدّى معانا، والـ class كان [[Project$HibernateProxy]]).

مع [[open-in-view: true]]: بيشتغل، بس لو فيه ١٠٠ task هتلاقي في اللوج ١٠١ query (أو أقل بحسب عدد المشاريع المختلفة، لأن Hibernate بيكاش اللي اتحمّل): الـ N+1 رجع وبقى مخفي، والـ connection محجوزة طول الـ request. الحل الصح: رجّع [[@Transactional(readOnly = true)]] و [[findOpenWithProject()]] بالـ fetch join: query واحد ومفيش exception.`
        }
      ]
    }
  ]
});
