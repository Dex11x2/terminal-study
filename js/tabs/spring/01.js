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
          teach: R`## البرنامج بيعمل إيه؟

ملف Java صغير بيطبع سطرين: تحية فيها رقم إصدار Java اللي شغّالة، وبعدها رقم. والأهم من الكود نفسه: هنشوف الملف بيعدّي بكام مرحلة لحد ما يشتغل. كل اللي تحت اتشغّل فعلًا في [[docker run --rm maven:3.9-eclipse-temurin-25]] (فيه Temurin JDK 25.0.4.1 على لينكس)، والأوامر نفسها هي هي على ويندوز والماك بعد ما تسطّب JDK 25.

---

## ١. [[java --version]]: اتأكد إن الـ JDK موجود

~~~bash
java --version
~~~

~~~text الناتج
openjdk 25.0.4.1 2026-08-18 LTS
OpenJDK Runtime Environment Temurin-25.0.4.1+1 (build 25.0.4.1+1-LTS)
OpenJDK 64-Bit Server VM Temurin-25.0.4.1+1 (build 25.0.4.1+1-LTS, mixed mode, sharing)
~~~

نقرا السطور:

| الجزء | معناه |
|---|---|
| [[openjdk 25.0.4.1]] | الإصدار: 25 هو الأساسي (feature)، والباقي تحديثات أمان وإصلاحات |
| [[2026-08-18]] | تاريخ نزول التحديث ده |
| [[LTS]] | Long-Term Support: إصدار بيتدعم سنين، وده اللي الشركات بتستخدمه |
| [[Temurin]] | اسم التوزيعة (من Eclipse Adoptium). كلها OpenJDK تقريبًا نفس الكود |
| [[64-Bit Server VM]] | الـ JVM نفسه، النسخة الـ 64 بت |
| [[mixed mode]] | بيشغّل الكود بالـ interpreter الأول، والأجزاء اللي بتتكرر بيحوّلها لكود أصلي بالـ JIT (تحت) |

> لو الأمر قال [[command not found]] (أو [['java' is not recognized]] على ويندوز)، يبقى الـ JDK مش متسطّب أو مش في الـ PATH. ولو طلع رقم أقدم من 25، المثال مش هيشتغل (تحت هتشوف ليه).

---

## ٢. الكود سطر سطر

~~~java
void main() {
~~~

- [[main]] هي نقطة البداية: أول حاجة الـ JVM بينفّذها.
- [[void]] معناها إن الـ method مبترجعش قيمة.
- الأقواس [[()]] فاضية: مفيش باراميترات.
- ومفيش [[class]] حوالين الكلام ده خالص. ده اسمه **compact source file**، وبقى رسمي في Java 25. الـ compiler بيلف الملف كله في class مخفي اسمه نفس اسم الملف ([[Hello]]) من غير ما تكتبه.

~~~java
    String name = "Sara";
    int year = 2026;
~~~

- الشكل في Java: **النوع الأول، وبعدين الاسم، وبعدين القيمة**. عكس TS اللي بيكتب [[name: string]].
- [[String]] (بحرف S كبير) نوع النصوص، والنص بين [[" "]] بس. علامة [[' ']] للحرف الواحد ([[char]]).
- [[int]] رقم صحيح. ومن هنا ورايح الـ compiler عارف إن [[year]] رقم، ومش هيسمح تحط فيه نص (هتشوف ده في الخطوة ٥).
- [[;]] في آخر كل سطر **إجبارية** في Java، مش اختيارية زي JS.

~~~java
    IO.println("Hello " + name + " from Java " + Runtime.version().feature());
~~~

نفكّه من جوه لبرة:

1. [[Runtime.version()]]: [[Runtime]] class جاهز في Java بيمثّل البيئة اللي البرنامج شغال فيها، و [[version()]] بترجع object فيه رقم الإصدار كله ([[25.0.4.1]]).
2. [[.feature()]]: بتاخد الرقم الأساسي بس من الـ object ده: [[25]] (رقم [[int]]).
3. [[+]] بين النصوص: بيلزقهم. ولما واحد من الطرفين String، الرقم بيتحوّل نص لوحده: [["Hello Sara from Java 25"]].
4. [[IO.println(...)]]: [[IO]] class جديد في Java 25 للطباعة والقراية من الترمنال، و [[println]] = print line: اطبع وانزل سطر جديد. زي [[console.log]].

~~~java
    IO.println(year + 1);
}
~~~

[[year]] رقم و [[1]] رقم، فـ [[+]] هنا جمع: [[2027]]. والقوس [[}]] بيقفل الـ main.

---

## ٣. [[java Hello.java]]: شغّل الملف على طول

احفظ الكود في ملف اسمه [[Hello.java]] وشغّل:

~~~bash
java Hello.java
~~~

~~~text الناتج
Hello Sara from Java 25
2027
~~~

الأمر [[java]] هنا عمل حاجتين ورا بعض: عمل compile للملف **في الذاكرة** (من غير ما يطلّع أي ملف على الديسك)، وبعدين شغّله. ده اسمه source-file mode، وموجود من Java 11. مريح جدًا للتجارب والسكربتات، وهو اللي هتستخدمه في كل دروس المستوى ده.

---

## ٤. [[javac Hello.java && java Hello]]: الطريقة الكاملة على خطوتين

~~~bash
javac Hello.java && java Hello
~~~

- [[javac]] = Java compiler. بيقرا [[Hello.java]]، ويفحص الأنواع، ويطلّع ملف [[Hello.class]] جنبه.
- [[&&]] (من الشِل، مش من Java): «لو اللي قبلي نجح، شغّل اللي بعدي». فلو الـ compile فشل، مفيش تشغيل.
- [[java Hello]] **من غير** [[.java]]: هنا انت بتدّي الـ JVM اسم الـ class اللي هيدوّر عليه في [[Hello.class]] ويشغّله.

~~~text الناتج
Hello Sara from Java 25
2027
~~~

نفس الناتج، بس دلوقتي فيه ملف [[Hello.class]] على الديسك (حجمه 1033 byte في التجربة دي). ده الـ **bytecode**. لو فتحته بأي محرر هتلاقيه حروف ملخبطة، لأنه مش نص. أول ٤ bytes فيه دايمًا [[ca fe ba be]] (علامة إن ده class file)، وبعدها رقم الإصدار: [[0x45]] = 69، ودي النسخة بتاعة Java 25.

وتقدر تبص جواه بأداة [[javap -c]] (جاية مع الـ JDK، و [[-c]] معناها اعرض الـ code). ده جزء من الناتج:

~~~text javap -c Hello (جزء)
  void main();
    Code:
         0: ldc           #7      // String Sara
         2: astore_1
         3: sipush        2026
         6: istore_2
        ...
        22: iload_2
        23: iconst_1
        24: iadd
        28: invokestatic  #25     // Method java/lang/IO.println:(Ljava/lang/Object;)V
~~~

مش محتاج تحفظ ولا تفهم كل سطر. المهم تشوف إن ده **تعليمات لآلة وهمية** (الـ JVM): «حمّل النص Sara»، «خزّن 2026 في متغير رقم ٢»، «اجمع» ([[iadd]] = integer add)، «نادي IO.println». نفس الملف ده بيشتغل على ويندوز ولينكس والماك من غير ما تعمله compile تاني، لأن كل نظام عنده JVM بيفهم التعليمات دي.

---

## ٥. الـ try: الغلط بيتمسك قبل التشغيل

غيّر [[int year = 2026;]] لـ [[int year = "2026";]] وشغّل [[java Hello.java]]:

~~~text الناتج
Hello.java:3: error: incompatible types: String cannot be converted to int
    int year = "2026";
               ^
1 error
error: compilation failed
~~~

| الجزء | معناه |
|---|---|
| [[Hello.java:3]] | الملف والسطر رقم ٣ |
| [[incompatible types]] | الأنواع مش متوافقة |
| [[String cannot be converted to int]] | انت حاطط نص في متغير نوعه رقم |
| [[^]] | علامة تحت الحتة الغلط بالظبط |
| [[compilation failed]] | الـ compile فشل، فمفيش تشغيل خالص |

ولاحظ: **ولا سطر اتطبع**، حتى [[Hello Sara...]] اللي قبل الغلطة. في JS كان البرنامج هيشتغل ويطبع، والمشكلة تبان بعدين (أو متبانش). هنا الـ compiler رفض البرنامج كله قبل ما يبدأ.

---

## ٦. JDK و JRE و JVM

| الاسم | فيه إيه |
|---|---|
| JVM (Java Virtual Machine) | البرنامج اللي بيشغّل الـ bytecode: الأمر [[java]] |
| JRE (Java Runtime Environment) | الـ JVM والمكتبات اللي التشغيل محتاجها |
| JDK (Java Development Kit) | ده كله ومعاه أدوات التطوير: [[javac]] و [[jshell]] و [[javap]] و [[jpackage]] |

انت كمبرمج محتاج **JDK**. ولو الجهاز عنده JDK قديم (17 أو 21)، الملف ده مش هيشتغل: [[void main()]] من غير class و [[IO]] اتضافوا رسمي في 25.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[java --version]] | يتأكد من الإصدار (لازم 25) |
| [[java Hello.java]] | compile في الذاكرة وتشغيل، للتجارب |
| [[javac Hello.java]] | يطلّع [[Hello.class]] (bytecode) |
| [[java Hello]] | الـ JVM يشغّل الـ class (من غير [[.java]]) |

- الكود بيعدّي على compile (فحص أنواع) وبعدين تشغيل على الـ JVM.
- أخطاء الأنواع بتطلع قبل ما أي سطر يتنفّذ.
- [[void main()]] و [[IO.println]] محتاجين Java 25.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعمل نوع داتا ([[User]])، وعقد ([[Greeter]])، و class بينفّذ العقد، وبعدين بيسأل الـ object عن نوعه الحقيقي وقت التشغيل، وفي الآخر بيعمل cast غلط فيقع. كل ده عشان يوريك الفروق التلاتة عن TypeScript وهي شغالة قدامك. الملف اسمه [[VsTs.java]]، واتشغّل بـ [[java VsTs.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. السطور اللي فوق: TS للمقارنة بس

~~~java
// TypeScript:
//   type User = { name: string; age: number };
//   const u: User = { name: "Sara", age: 27 };
~~~

[[//]] في Java تعليق لآخر السطر، زي JS. دول مكتوبين عشان تقارن: في TS بتعرّف شكل وتعمل object literal على طول. في Java مفيش [[{ name: "Sara" }]] خالص، لازم نوع له اسم الأول.

---

## ٢. [[record User(String name, int age) {}]]

~~~java
record User(String name, int age) {}
~~~

- [[record]]: نوع للداتا بس. السطر ده لوحده بيعمل class فيه حقلين، و constructor بياخدهم بالترتيب، و method لكل حقل ([[name()]] و [[age()]]). ليه درس كامل تحت (records).
- جوه الأقواس: كل حقل **نوعه قبل اسمه**: [[String name]] و [[int age]].
- [[{}]] في الآخر: جسم الـ record فاضي، مش محتاجين حاجة زيادة.

---

## ٣. [[interface Greeter]] و [[class Polite implements Greeter]]

~~~java
interface Greeter { String greet(User u); }
class Polite implements Greeter {
    public String greet(User u) { return "Welcome, " + u.name(); }
}
~~~

- [[interface Greeter]]: عقد فيه method واحدة اسمها [[greet]]، بتاخد [[User]] وبترجع [[String]]. لاحظ نوع الرجوع **قبل** اسم الـ method، عكس TS ([[greet(u: User): string]]).
- [[class Polite implements Greeter]]: [[implements]] معناها «أنا بوعد أنفّذ العقد ده». الكلمة دي **هي** اللي بتخلي Polite يتعامل كـ Greeter.
- [[public]] قبل الـ method: methods الـ interface عامة، فلازم التنفيذ يبقى عام هو كمان.
- [[u.name()]] بأقواس: الـ record عمل method اسمها [[name]]، مش خاصية تقراها بـ [[u.name]].

---

## ٤. [[main]]: object وجواه نوعه

~~~java
    User u = new User("Sara", 27);
    Object o = u;
~~~

- [[new User("Sara", 27)]]: بيعمل object جديد بالقيم بالترتيب (الاسم الأول، وبعدين السن). [[new]] إجبارية.
- [[Object]]: الأب بتاع كل الـ classes في Java. أي object ينفع يتحط في متغير نوعه [[Object]].
- هنا حطينا نفس الـ object في متغيرين: [[u]] نوعه [[User]]، و [[o]] نوعه [[Object]]. **الـ object نفسه واحد ومتغيّرش**، اللي اتغيّر هو «النظارة» اللي بتبص بيها عليه.

~~~java
    IO.println(o instanceof User);
    IO.println(o.getClass().getSimpleName());
~~~

~~~text الناتج
true
User
~~~

- [[instanceof]]: «هل الـ object ده فعلًا User؟». المتغير [[o]] نوعه Object، بس السؤال بيروح للـ object الحقيقي وقت التشغيل، فالإجابة [[true]].
- [[getClass()]]: كل object في Java شايل معاه الـ class بتاعه، والـ method دي بترجعه. و [[getSimpleName()]] الاسم القصير من غير الـ package: [[User]].

ده **الفرق الأول**: في TS الأنواع بتتمسح بعد الـ compile، فمتقدرش تسأل object «انت type User؟» (type مش موجود وقت التشغيل أصلًا). في Java النوع موجود ومعروف.

---

## ٥. متغير نوعه الـ interface

~~~java
    Greeter g = new Polite();
    IO.println(g.greet(u));
~~~

~~~text الناتج
Welcome, Sara
~~~

المتغير نوعه [[Greeter]] (العقد)، والقيمة object من [[Polite]]. مسموح عشان Polite كاتب [[implements Greeter]]. والكود اللي بيستخدم [[g]] ميعرفش ولا يهمه إنه Polite.

---

## ٦. الـ cast الغلط: البرنامج بيقع

~~~java
    String s = (String) o;
~~~

- [[(String) o]] اسمه **cast**: «يا compiler، صدّقني، [[o]] ده String».
- الـ compiler بيعدّيه، لأن متغير نوعه Object **ممكن** يبقى جواه String.
- بس وقت التشغيل الـ JVM بيفحص الـ object الحقيقي، يلاقيه User، فيرمي exception:

~~~text الناتج
Exception in thread "main" java.lang.ClassCastException: class VsTs$User cannot be cast to class java.lang.String (VsTs$User is in unnamed module of loader com.sun.tools.javac.launcher.MemoryClassLoader @21507a04; java.lang.String is in module java.base of loader 'bootstrap')
	at VsTs.main(VsTs.java:13)
~~~

نقرا الرسالة:

| الجزء | معناه |
|---|---|
| [[Exception in thread "main"]] | حصل exception في الـ thread الأساسي ومحدش مسكه، فالبرنامج وقف |
| [[java.lang.ClassCastException]] | نوع الخطأ: cast مستحيل |
| [[class VsTs$User]] | اسم الـ class الحقيقي. [[VsTs]] هو الـ class المخفي اللي الملف اتلف فيه، و [[$]] معناها «جوه»: User جوه VsTs |
| [[(... MemoryClassLoader ...)]] | تفاصيل مين حمّل الـ class. هنا الـ compile كان في الذاكرة (source-file mode)، فمش مهمة |
| [[at VsTs.main(VsTs.java:13)]] | مكان الوقعة: السطر ١٣ في الملف |

في TS [[o as string]] مجرد كلام للـ compiler ومش بيعمل أي حاجة وقت التشغيل. في Java الـ cast **فحص حقيقي**.

---

## ٧. الـ try: شيل [[implements Greeter]]

خلي السطر [[class Polite {]] وسيب الـ method زي ما هي:

~~~text الناتج
NoImpl/VsTs.java:11: error: incompatible types: VsTs.Polite cannot be converted to Greeter
    Greeter g = new Polite();
                ^
1 error
error: compilation failed
~~~

([[NoImpl/]] اسم الفولدر اللي جرّبنا فيه النسخة المعدّلة.) الـ method [[greet]] لسه موجودة بنفس الاسم والنوع بالظبط، والـ compiler برضه رافض. ده **الفرق التاني**: Java **nominal** (بالاسم): لازم تقول [[implements]] صراحة. TS **structural** (بالشكل): لو الشكل مطابق خلاص.

---

## الخلاصة

| | TypeScript | Java |
|---|---|---|
| النوع وقت التشغيل | بيتمسح | موجود: [[instanceof]] و [[getClass()]] |
| الـ cast | [[as]] من غير فحص | [[(Type) x]] بيتفحص، ولو غلط [[ClassCastException]] |
| التوافق بين الأنواع | بالشكل (structural) | بالاسم: [[implements]] و [[extends]] (nominal) |
| object literal | [[{ name: "Sara" }]] | مفيش: [[new User("Sara", 27)]] |
| مكان النوع | [[name: string]] | [[String name]] |

- [[Object]] أب الكل، وهو أقرب حاجة لـ [[unknown]] في TS.
- الاستثناء الوحيد: أنواع الـ generics ([[List<String>]]) بتتمسح وقت التشغيل (درس generics).`,
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

ولما تشيل [[implements Greeter]]: خطأ compile [[incompatible types: VsTs.Polite cannot be converted to Greeter]]، مع إن الـ method موجودة بنفس الاسم والنوع. في TS نفس الكود كان هيعدّي لأن الشكل مطابق (structural typing). ده nominal typing.`
        },
        {
          cmd: "jshell",
          title: "تجرّب سطر Java بسرعة من غير ما تعمل ملف",
          desc: R`[[jshell]] هو الـ REPL بتاع Java، زي ما تكتب [[node]] وتجرّب. بتكتب expression وبيطبعلك قيمته على طول (والنوع بـ [[/vars]])، ومش محتاج [[;]] في الآخر ولا class ولا main.

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
            how: R`jshell بيلف كل سطر بتكتبه في class مخفي ويعمله compile ويشغّله، وبيحتفظ بالمتغيرات بين السطور. لما تكتب expression من غير ما تحطه في متغير، بيعمل متغير اسمه [[$1]] و [[$2]] وهكذا عشان تستخدمه بعدين. ومن Java 25 بيعمل import للـ module الأساسي [[java.base]] كله لوحده، فـ [[List]] و [[ArrayList]] و [[Collections]] شغالين على طول.

وتقدر تفتح ملف: [[/open Hello.java]]، أو تحفظ الجلسة: [[/save session.jsh]].`,
            when: "تجرّب method في مكتبة Java، أو تتأكد من سلوك الأرقام والـ strings، أو تحضّر لانترفيو فيه أسئلة «الكود ده بيطبع إيه».",
            mistakes: R`تحاول تكتب برنامج كامل فيه كذا class في jshell: الملف و [[java File.java]] أريح. وتنسى إن [[/exit]] بالـ slash، مش [[exit]] بس.`
          },
          teach: R`## الأمر بيعمل إيه؟

[[jshell]] بيفتحلك جلسة تكتب فيها Java سطر سطر، وكل سطر بيتنفّذ وتشوف نتيجته على طول، من غير ملف ولا [[main]]. كل اللي تحت اتشغّل في [[maven:3.9-eclipse-temurin-25]] (JShell 25.0.4.1)، وهو نفسه على ويندوز والماك لأنه جاي مع الـ JDK.

---

## ١. [[jshell]]: افتح الجلسة

~~~bash
jshell
~~~

~~~text الناتج
|  Welcome to JShell -- Version 25.0.4.1
|  For an introduction type: /help intro

jshell>
~~~

- [[jshell>]] هو الـ prompt: مستني تكتب.
- [[/help intro]] شرح سريع لو حبيت. أي حاجة بتبدأ بـ [[/]] أمر للـ jshell نفسه، مش كود Java.
- وأول مرة ممكن يطلعلك سطر [[INFO: Created user preferences directory.]]: ده عمل فولدر إعدادات صغير لنفسه، عادي.

---

## ٢. [[7 / 2]] و [[7 / 2.0]]: القسمة

~~~text الناتج
jshell> 7 / 2
$1 ==> 3

jshell> 7 / 2.0
$2 ==> 3.5
~~~

- [[$1 ==> 3]]: كتبت expression ومحطتهاش في متغير، فـ jshell عمل متغير اسمه [[$1]] وحط فيه النتيجة. تقدر تكتب [[$1 * 10]] بعدها وتاخد 30.
- [[7 / 2]]: الاتنين [[int]] (رقم صحيح)، فالقسمة صحيحة والكسر **بيتشال** (مش بيتقرّب): 3. في JS نفس السطر بيطلع 3.5.
- [[7 / 2.0]]: [[2.0]] فيه علامة عشرية، فنوعه [[double]] (كسر). ولما واحد من الطرفين double، الحساب كله بيبقى double: 3.5.

---

## ٣. [["spring".toUpperCase()]]

~~~text الناتج
jshell> "spring".toUpperCase()
$3 ==> "SPRING"
~~~

النص نفسه object من نوع [[String]]، فتقدر تنادي عليه method على طول. والـ jshell بيعرض النصوص بين [[" "]] عشان تعرف إنها String مش حاجة تانية.

---

## ٤. [[var list = new ArrayList<>(List.of(3, 1, 2))]]

نفكّه من جوه لبرة:

1. [[List.of(3, 1, 2)]]: بيعمل list فيها التلات أرقام، بس **ثابتة**: متقدرش تضيف ولا ترتّب فيها.
2. [[new ArrayList<>(...)]]: بيعمل [[ArrayList]] جديدة (list بتتعدّل) وينسخ فيها العناصر. و [[<>]] اسمها diamond: «استنتج نوع العناصر لوحدك» (هنا [[Integer]]).
3. [[var list =]]: متغير والـ compiler يستنتج نوعه ([[ArrayList<Integer>]]).

~~~text الناتج
jshell> var list = new ArrayList<>(List.of(3, 1, 2))
list ==> [3, 1, 2]
~~~

المرة دي مفيش [[$4]]: انت سمّيت المتغير [[list]]، فهو اللي اتعرض.

> مكتبش [[import java.util.*]]؟ مش محتاج: من Java 25 الـ jshell بيعمل import لكل الـ module الأساسي [[java.base]] لوحده، فـ [[List]] و [[ArrayList]] و [[Collections]] جاهزين. أمر [[/imports]] بيوريك ده: [[import java.base]].

---

## ٥. [[Collections.sort(list); list]]

~~~text الناتج
jshell> Collections.sort(list); list
list ==> [1, 2, 3]
~~~

- ده سطرين في سطر واحد، مفصولين بـ [[;]].
- [[Collections.sort(list)]]: بيرتّب الـ list **في مكانها** ومبيرجعش حاجة ([[void]])، فمفيش ناتج ليه.
- [[list]] لوحده بعد الـ [[;]]: expression قيمتها الـ list، فاتعرضت مترتبة.
- ولو كنت جرّبت [[Collections.sort]] على [[List.of(...)]] مباشرة كان هيرمي [[UnsupportedOperationException]]، لأنها ثابتة. ده سبب النسخة في الخطوة ٤.

---

## ٦. [[/vars]]: إيه اللي عندي؟

~~~text الناتج
jshell> /vars
|    int $1 = 3
|    double $2 = 3.5
|    String $3 = "SPRING"
|    ArrayList<Integer> list = [1, 2, 3]
~~~

كل متغير بنوعه وقيمته. هنا تشوف إن [[$1]] نوعه [[int]] و [[$2]] [[double]]: ده تأكيد لكلام القسمة فوق. ولو عايز النوع يظهر مع كل سطر وانت بتكتب، اكتب [[/set feedback verbose]] الأول:

~~~text الناتج
jshell> 7 / 2
$1 ==> 3
|  created scratch variable $1 : int
~~~

---

## ٧. [[/exit]]

~~~text الناتج
jshell> /exit
|  Goodbye
~~~

بالـ [[/]]. لو كتبت [[exit]] من غيرها، jshell هيفتكره اسم متغير في Java:

~~~text الناتج
jshell> exit
|  Error:
|  cannot find symbol
|    symbol:   variable exit
~~~

وتقدر كمان تقفل بـ Ctrl+D. والـ Tab (يكمّل الأسامي) اتجرّب مش هنا: الجلسة دي كانت بتاخد الأوامر من ملف مش من كيبورد، فالكلام عن الـ Tab من الـ docs.

---

## ٨. الـ try: اتوقع قبل ما تدوس Enter

~~~text الناتج
jshell> Integer.MAX_VALUE + 1
$7 ==> -2147483648

jshell> Long.MAX_VALUE
$8 ==> 9223372036854775807

jshell> 0.1 + 0.2
$9 ==> 0.30000000000000004

jshell> "a" + 1 + 2
$10 ==> "a12"

jshell> 1 + 2 + "a"
$11 ==> "3a"
~~~

(الترقيم بدأ من [[$7]] لأن كل سطر قبله، حتى اللي ليه اسم، بياخد رقم snippet.)

| السطر | ليه طلع كده |
|---|---|
| [[Integer.MAX_VALUE + 1]] | [[int]] بيشيل ٣٢ بت، أكبر قيمة 2147483647. لما تزود ١ بيلف لأصغر قيمة (overflow) **من غير أي خطأ** |
| [[Long.MAX_VALUE]] | [[long]] ٦٤ بت، فالحد أكبر بكتير |
| [[0.1 + 0.2]] | الكسور متخزنة بالـ binary (IEEE 754) فمش دقيقة. نفس JS بالظبط |
| [["a" + 1 + 2]] | [[+]] من الشمال لليمين: [["a" + 1]] بقت [["a1"]] (نص)، وبعدين [["a1" + 2]] |
| [[1 + 2 + "a"]] | [[1 + 2]] أرقام فبقت 3، وبعدين [[3 + "a"]] نص |

---

## الخلاصة

| اللي بتكتبه | بيعمل إيه |
|---|---|
| expression | بيتحسب ويتحط في [[$1]] و [[$2]]... |
| [[var x = ...]] | متغير ليه اسم وبيفضل موجود طول الجلسة |
| [[/vars]] | كل المتغيرات بأنواعها |
| [[/imports]] | الـ imports الجاهزة |
| [[/set feedback verbose]] | يعرض النوع مع كل نتيجة |
| [[/exit]] | خروج (بالـ slash) |

- [[int / int]] قسمة صحيحة، والـ overflow صامت.
- مفيش [[;]] إجبارية في آخر السطر، ومفيش class ولا main.`,
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
    }
  ]
});
