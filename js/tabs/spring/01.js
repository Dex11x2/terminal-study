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
    }
  ]
});
