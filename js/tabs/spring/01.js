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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغير من كل نوع primitive مهم، وبعدين يحط رقم في [[Integer]] وفي [[List]]، ويقارن wrappers ببعض بـ [[==]] وبـ [[equals]] عشان يوريك الفخ، ويختم بقسمة صحيحة وكسور. اتشغّل بـ [[java Prim.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف فعلًا.

---

## ١. الـ primitives: قيم خام

~~~java
    int count = 5;
    long views = 3_000_000_000L;
    double price = 19.99;
    boolean active = true;
    char grade = 'A';
~~~

| النوع | بيشيل إيه | الحجم | ملاحظة |
|---|---|---|---|
| [[int]] | رقم صحيح | ٣٢ بت | لحد 2,147,483,647 تقريبًا ٢.١ مليار |
| [[long]] | رقم صحيح كبير | ٦٤ بت | لحد حوالي ٩.٢ × ١٠^١٨ |
| [[double]] | كسر | ٦٤ بت | زي [[number]] في JS |
| [[boolean]] | [[true]] أو [[false]] | | مفيش truthy و falsy |
| [[char]] | حرف واحد | ١٦ بت | بين [[' ']] مش [[" "]] |

وفيه تلاتة كمان نادرًا ما هتستخدمهم: [[byte]] (٨ بت) و [[short]] (١٦ بت) و [[float]] (كسر ٣٢ بت). المجموع ٨.

### ليه [[L]] و [[_]] في [[3_000_000_000L]]؟

- الـ [[_]] للقراية بس، Java بتتجاهلها: [[3_000_000_000]] = تلاتة مليار.
- أي رقم صحيح مكتوب في الكود Java بتعتبره [[int]] الأول. وتلاتة مليار أكبر من حد الـ int، فلازم [[L]] (من Long) تقول «ده long». جرّبنا نشيلها:

~~~text الناتج
P3/Prim.java:3: error: integer number too large
    long views = 3_000_000_000;
                 ^
~~~

### مفيش truthy في Java

جرّبنا نكتب [[if (count) {}]] زي JS:

~~~text الناتج
P4/Prim.java:5: error: incompatible types: int cannot be converted to boolean
~~~

الشرط في Java لازم يبقى [[boolean]] حقيقي: [[if (count > 0)]].

---

## ٢. الـ wrapper و autoboxing

~~~java
    Integer boxed = count;
    List<Integer> ids = new ArrayList<>();
    ids.add(count);
~~~

- [[Integer]] (بحرف كبير) **class**، يعني object في الـ heap بيلف قيمة int جواه. وكل primitive ليه wrapper: [[Long]] و [[Double]] و [[Boolean]] و [[Character]]...
- [[Integer boxed = count;]]: بنحط [[int]] في متغير [[Integer]]. الـ compiler بيكتب بدالك [[Integer.valueOf(count)]]. ده اسمه **autoboxing**.
- [[List<Integer>]]: الـ collections بتشيل objects بس. [[List<int>]] خطأ compile، فلازم الـ wrapper. ومفيش [[import java.util.*;]] فوق لأن الـ compact source file (اللي بيبدأ بـ [[void main()]]) بيعمل import لكل الـ module الأساسي [[java.base]] لوحده، فـ [[List]] و [[ArrayList]] جاهزين.
- [[ids.add(count)]]: [[count]] int، والـ list عايزة Integer، فـ autoboxing تاني.

وتقدر تتأكد إن ده بيحصل فعلًا: عملنا [[javac]] وبصينا في الـ bytecode بـ [[javap -c]]، ولقينا سطور زي دي في الأماكن دي بالظبط:

~~~text javap -c Prim (جزء)
19: invokestatic  #11   // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
~~~

---

## ٣. الفخ: [[==]] على الـ wrappers

~~~java
    Integer a = 127, b = 127, c = 1000, d = 1000;
    IO.println(a == b);
    IO.println(c == d);
    IO.println(c.equals(d));
~~~

~~~text الناتج
true
false
true
~~~

السطر الأول بيعرّف أربع متغيرات [[Integer]] مرة واحدة، مفصولين بـ [[,]]. وبعدين:

- [[==]] بين objects بيسأل «هل الاتنين **نفس الـ object** في الذاكرة؟»، مش «هل القيمة واحدة؟».
- [[Integer.valueOf]] (اللي الـ autoboxing بيناديها) عندها **cache** جاهز للأرقام من -128 لـ 127. لو طلبت 127 مرتين، بترجعلك نفس الـ object المتخزن. عشان كده [[a == b]] طلعت [[true]].
- 1000 برّه الـ cache، فكل مرة بيتعمل object جديد. [[c]] و [[d]] اتنين objects مختلفين قيمتهم واحدة، فـ [[c == d]] = [[false]].
- [[c.equals(d)]] بتقارن **القيمة**: [[true]]. دي الطريقة الصح دايمًا مع الـ objects.

> ليه ده خطير؟ في التست بتستخدم أرقام صغيرة (id = 1 و 2) فـ [[==]] بتشتغل. في الإنتاج الـ ids بقت ٥٠٠٠، فنفس الكود يبوظ من غير ما حاجة تتغير.

---

## ٤. القسمة والكسور

~~~java
    IO.println(7 / 2);
    IO.println(0.1 + 0.2);
~~~

~~~text الناتج
3
0.30000000000000004
~~~

- [[7 / 2]]: int على int = قسمة صحيحة، والكسر بيتشال (مش بيتقرّب). لو عايز 3.5 خلي واحد منهم double: [[7 / 2.0]].
- [[0.1 + 0.2]]: [[double]] بيتخزن بالـ binary، و 0.1 ملهاش تمثيل binary مظبوط (زي 1/3 بالعشري). نفس النتيجة في JS. عشان كده الفلوس **مش** double: [[long]] بالقروش أو [[BigDecimal]].

---

## ٥. الـ try: [[Integer]] قيمته null يتحط في [[int]]

ضفنا في آخر main:

~~~java
    Integer missing = null; int n = missing;
~~~

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "<local14>" is null
	at Prim.main(Prim.java:16)
~~~

- [[Integer]] object، فممكن يبقى [[null]]. [[int]] لأ.
- [[int n = missing;]] شكلها مفيهاش أي method. بس الـ compiler كتب بدالك [[missing.intValue()]] عشان يطلّع الـ int من الـ object. ده **unboxing**.
- و [[intValue()]] على [[null]] = [[NullPointerException]] (اختصارها NPE): «حاولت تنادي method على مفيش».
- [[<local14>]]: الـ JVM مش عارف اسم المتغير، عارف رقمه بس (المتغير المحلي رقم ١٤). لو عملت compile بـ [[javac -g]] (اللي بيحفظ أسامي المتغيرات في الـ class) وشغّلت، الرسالة بتبقى أوضح:

~~~text الناتج مع javac -g
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "missing" is null
~~~

وفي Spring: عمود في الداتابيز قيمته NULL، والـ entity فيه [[Integer]]، وانت كتبت [[int x = entity.getX();]]. الصفحة تقع بـ 500 في الصف ده بس.

---

## الخلاصة

| | primitive ([[int]]) | wrapper ([[Integer]]) |
|---|---|---|
| هو إيه | قيمة خام | object |
| ينفع [[null]]؟ | لأ | أيوه |
| في [[List]] و [[Map]] | لأ | أيوه |
| المقارنة | [[==]] سليمة | [[equals]] (أو [[Objects.equals(a, b)]] لو ممكن null) |

- autoboxing = [[Integer.valueOf(...)]] مخفية، و unboxing = [[.intValue()]] مخفية (وبتقع مع null).
- [[==]] على Integer بتشتغل لحد 127 بالصدفة بس.
- [[L]] للأرقام الكبيرة، و [[int / int]] بيشيل الكسر، والفلوس مش [[double]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيقارن نصين بـ [[==]] وبـ [[equals]]، وبعدين يبني نصوص بـ ٣ طرق: [[formatted]] و text block و [[StringBuilder]]، وفي الآخر يقص نص ويقسمه. اتشغّل بـ [[java Str.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، والسطور الصغيرة الزيادة اتجرّبت في [[jshell]].

---

## ١. [[==]] مقابل [[equals]]

~~~java
    String a = "java";
    String b = new String("java");
    IO.println(a == b);
    IO.println(a.equals(b));
~~~

~~~text الناتج
false
true
~~~

- [["java"]] مكتوبة في الكود كده اسمها **literal**. Java بتخزن الـ literals في مكان اسمه **String pool**: كل literal بنفس النص بيشاور على نفس الـ object.
- [[new String("java")]]: [[new]] بتجبر Java تعمل object **جديد** بنفس الحروف، برّه الـ pool.
- [[a == b]]: [[==]] بين objects بتسأل «نفس الـ object؟». لأ، اتنين مختلفين: [[false]].
- [[a.equals(b)]]: بتقارن الحروف واحد واحد: [[true]].

والفخ إن [[==]] **ساعات** بتطلع true بالصدفة. جرّبنا في jshell:

~~~text الناتج
jshell> String c = "java"
jshell> "java" == c
$2 ==> true

jshell> String x = "jav"; String y = x + "a"
jshell> y == "java"
$3 ==> false
~~~

الأولى literal و literal: نفس الـ object من الـ pool. التانية النص اتبنى وقت التشغيل (زي نص جاي من request أو داتابيز)، فبقى object جديد. نفس الحروف، و [[==]] بتقول false. القاعدة: **[[equals]] دايمًا**.

---

## ٢. [[formatted]]: نص بفراغات

~~~java
    String name = "Sara";
    IO.println("Hi %s, you have %d tasks".formatted(name, 3));
~~~

~~~text الناتج
Hi Sara, you have 3 tasks
~~~

النص فيه **أماكن فاضية** بتبدأ بـ [[%]]، و [[formatted(...)]] بتملاها بالقيم بالترتيب:

| الرمز | بيتملي بإيه | مثال |
|---|---|---|
| [[%s]] | أي حاجة (s = string) | [[name]] |
| [[%d]] | رقم صحيح (d = decimal) | [[3]] |
| [[%.2f]] | كسر برقمين بعد العلامة (f = floating point) | [["%.2f".formatted(19.989)]] بتطلع [["19.99"]] |

ولو حطيت نوع غلط بيقع وقت التشغيل: [["%d".formatted("x")]] رمت [[IllegalFormatConversionException: d != java.lang.String]].

---

## ٣. text block بـ [["""]]

~~~java
    String json = """
        {"name": "%s", "admin": false}
        """.formatted(name);
    IO.print(json);
~~~

~~~text الناتج
{"name": "Sara", "admin": false}
~~~

- [["""]] بتبدأ text block: نص على كذا سطر. ولازم **تنزل سطر** بعد الـ [["""]] الأولى على طول.
- جواه تكتب [["]] عادي من غير [[\"]]: مريح جدًا للـ JSON والـ SQL.
- المسافات اللي على الشمال: Java بتشيل المسافة المشتركة بين كل السطور (بما فيهم سطر الـ [["""]] اللي بيقفل). فالـ JSON طلع من أول السطر من غير مسافات.
- الـ [["""]] اللي بتقفل في سطر لوحدها، فالنص بيخلص بسطر جديد ([[\n]]). عشان كده استخدمنا [[IO.print]] (من غير ln): لو كانت [[println]] كان هيبقى فيه سطر فاضي زيادة.
- [[.formatted(name)]]: الـ text block String عادي، فبتنادي عليه أي method.

---

## ٤. [[StringBuilder]]: تبني نص في loop

~~~java
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 3; i++) sb.append(i).append(',');
    IO.println(sb);
~~~

~~~text الناتج
0,1,2,
~~~

- [[for (int i = 0; i < 3; i++)]]: نفس الـ for بتاعة JS بس بـ [[int]] بدل [[let]]: i بتاخد 0 و 1 و 2.
- الـ String **immutable**: أي [[+]] بيعمل String جديد. في loop طويل ده يعني آلاف الـ objects اللي بتترمي. [[StringBuilder]] فيه buffer واحد بيكبر.
- [[append(i)]] بتضيف للـ buffer وبترجع **نفس** الـ builder، فتقدر تكمّل [[.append(',')]] على طول (chaining). و [[',']] بـ single quotes: [[char]].
- [[IO.println(sb)]]: الطباعة بتنادي [[toString()]] لوحدها.

---

## ٥. [[strip]] و [[split]]

~~~java
    IO.println(" a,b ,c ".strip().split(",").length);
~~~

من الشمال لليمين:

~~~text خطوة خطوة في jshell
jshell> " a,b ,c ".strip()
$3 ==> "a,b ,c"

jshell> " a,b ,c ".strip().split(",")
$4 ==> String[3] { "a", "b ", "c" }
~~~

1. [[strip()]]: بتشيل المسافات من **الأطراف** بس، فالمسافة اللي بعد [[b]] فضلت.
2. [[split(",")]]: بتقسم عند كل [[,]] وبترجع **array** من النصوص.
3. [[.length]]: طول الـ array (خاصية من غير أقواس): [[3]].

> [[split]] بتاخد **regex** مش نص عادي. [["a.b".split(".")]] بترجع array طولها 0، لأن [[.]] في الـ regex معناها «أي حرف» فكل حاجة بقت فاصل. الصح [[split("\\.")]]، وبيرجع طولها 2. والـ [[\\]] اتنين لأن الـ [[\]] نفسها لازم تتهرب جوه نص Java: بـ [[\]] واحدة الـ compiler بيرفض ([[illegal escape character]]).

---

## ٦. الحل: [[isAdmin]] من غير ما يقع مع null

~~~java
static boolean isAdmin(String role) {
    return "admin".equalsIgnoreCase(role);
}
~~~

- [[static]]: الـ method مش محتاجة object عشان تتنادى (درس static).
- [[boolean]]: بترجع true أو false.
- [[equalsIgnoreCase]]: زي [[equals]] بس من غير ما تفرق بين الحروف الكبيرة والصغيرة.
- الترتيب هو السر: [["admin".equalsIgnoreCase(role)]] الـ method بتتنادى على الـ literal (مستحيل يبقى null)، و [[role]] بيتبعت كباراميتر. ولو [[role]] null الـ method بترجع false بهدوء.

~~~text الناتج
true
true
false
~~~

ولو عكست وكتبت [[role.equals("admin")]] و role قيمتها null، جرّبناها في jshell:

~~~text الناتج
|  Exception java.lang.NullPointerException: Cannot invoke "String.equals(Object)" because "REPL.$JShell$11.role" is null
~~~

(الاسم الغريب [[REPL.$JShell$11.role]] هو اسم المتغير جوه الـ class المخفي اللي jshell بيلف فيه كل سطر.)

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقارن نصين | [[a.equals(b)]]، أو [["literal".equals(x)]] لو x ممكن null |
| من غير حالة الحروف | [[equalsIgnoreCase]] |
| نص فيه قيم | [["...%s...".formatted(x)]] |
| نص على كذا سطر | text block [["""]] |
| تبني نص في loop | [[StringBuilder]] و [[append]] |
| تقص المسافات | [[strip()]]، و [[isBlank()]] تسأل هل فاضي |

- الـ String immutable: كل method بترجع نص جديد.
- [[split]] بياخد regex.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيستخدم [[var]] في ٣ أماكن، ويعمل متغير [[final]]، و array صغيرة، وفي الآخر بينادي method على [[null]] عشان يوريك الـ NullPointerException. اتشغّل بـ [[java VarFinal.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ في الـ try اتجرّب بتعديل الملف فعلًا.

---

## ١. [[var]]: الـ compiler يستنتج النوع

~~~java
    var names = new ArrayList<String>();
    names.add("Sara");
    var total = 0;
~~~

- [[var]] مش نوع. هي كلمة معناها «يا compiler، بص على القيمة اللي على اليمين وحط نوعها هنا».
- [[new ArrayList<String>()]]: list بتتعدّل، والعناصر [[String]]. فـ [[names]] نوعها [[ArrayList<String>]]. لاحظ إن النوع مكتوب **جوه** [[<>]] على اليمين: لو كتبت [[new ArrayList<>()]] فاضية مع [[var]]، مفيش حاجة يستنتج منها فيبقى [[ArrayList<Object>]].
- [[var total = 0;]]: [[0]] رقم صحيح، فـ total نوعها [[int]].

والنوع ده **اتحدد خلاص**، مش dynamic زي JS. جرّبنا [[total = "x";]]:

~~~text الناتج
V5/VarFinal.java:4: error: incompatible types: String cannot be converted to int
    var total = 0; total = "x";
                           ^
~~~

---

## ٢. الـ for-each

~~~java
    for (var n : names) total += n.length();
~~~

- [[for (X n : names)]]: «لكل عنصر في names، سمّيه n». زي [[for (const n of names)]] في JS. والـ [[:]] هنا تتقري «في».
- [[var n]]: n نوعها [[String]] (مستنتج من نوع عناصر الـ list).
- [[n.length()]]: طول النص، method بأقواس. و [[+=]] بيزود total. "Sara" طولها 4.

---

## ٣. [[final]]: مفيش تعيين تاني

~~~java
    final int limit = 10;
~~~

[[final]] زي [[const]] في JS: القيمة اتحطت مرة ومش هتتغير. جرّبنا [[limit = 20;]] بعدها:

~~~text الناتج
V3/VarFinal.java:6: error: cannot assign a value to final variable limit
    final int limit = 10; limit = 20;
                          ^
~~~

---

## ٤. الـ array

~~~java
    int[] scores = {90, 75, 60};
    IO.println(scores.length + " " + scores[0]);
~~~

~~~text الناتج
3 90
~~~

- [[int[]]]: الـ [[[]]] بعد النوع معناها array من النوع ده.
- [[{90, 75, 60}]]: القيم بين أقواس معقوفة (مش [[[ ]]] زي JS). والطول بيتحدد هنا (٣) **ومش بيتغير** بعد كده: مفيش [[push]].
- [[scores.length]]: خاصية من غير أقواس (عكس [[n.length()]] بتاعة النص، فخ مشهور).
- [[scores[0]]]: أول عنصر، الترقيم من صفر.
- [[+ " " +]]: المسافة نص، فكل حاجة بقت تجميع نصوص: [["3 90"]].

ولو قريت index برّه الحدود (جرّبنا [[scores[3]]]) مش هيرجع [[undefined]] زي JS، هيقع:

~~~text الناتج
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at VarFinal.main(VarFinal.java:8)
~~~

---

## ٥. [[null]] و NullPointerException

~~~java
    String missing = null;
    IO.println(total + " " + limit);
    IO.println(missing.length());
~~~

~~~text الناتج
4 10
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local4>" is null
	at VarFinal.main(VarFinal.java:11)
~~~

- [[null]] = «مفيش object». أي متغير نوعه class ([[String]] و [[List]] و أي class بتاعك) ممكن يبقى null، والـ compiler مش هيمنعك.
- [[4 10]]: طول Sara، والـ limit.
- [[missing.length()]]: بتنادي method على مفيش، فالـ JVM بيرمي [[NullPointerException]].
- الرسالة بتقولك بالظبط **إيه** اللي كان null ([[String.length()]] اتنادت على حاجة null). ده من Java 14 (helpful NPE messages).
- [[<local4>]]: المتغير المحلي رقم ٤، لأن الـ class اتعمله compile من غير أسامي المتغيرات. عملنا [[javac -g VarFinal.java]] (الـ [[-g]] بيحفظ أسامي المتغيرات للـ debugging) وبعدين [[java VarFinal]]:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "missing" is null
~~~

---

## ٦. الـ try: الأربع أخطاء

~~~text var x;
V1/VarFinal.java:6: error: cannot infer type for local variable x
    final int limit = 10; var x;
                              ^
  (cannot use 'var' on variable without initializer)
~~~

~~~text var y = null;
V2/VarFinal.java:6: error: cannot infer type for local variable y
    final int limit = 10; var y = null;
                              ^
  (variable initializer is 'null')
~~~

| التعديل | إمتى بيطلع | ليه |
|---|---|---|
| [[var x;]] | compile | مفيش قيمة يستنتج منها |
| [[var y = null;]] | compile | null ملهاش نوع |
| [[limit = 20;]] | compile | [[final]] |
| [[scores[3]]] | تشغيل | الـ compiler مبيعرفش الـ index وقت الكتابة |
| [[missing.length()]] | تشغيل | الـ compiler مبيتابعش مين ممكن يبقى null |

---

## الخلاصة

- [[var]]: النوع بيتستنتج **مرة** وقت الـ compile وبعدين ثابت. للمتغيرات المحلية بس، ولازم قيمة مش null.
- [[final]]: مفيش تعيين تاني. بس [[final List]] الـ list نفسها بتتعدّل عادي (زي const).
- الـ array طولها ثابت، و [[.length]] من غير أقواس، والـ index الغلط بيقع. في الغالب هتستخدم [[List]].
- أي object ممكن يبقى [[null]]، و [[javac -g]] بيخلي رسالة الـ NPE فيها اسم المتغير.`,
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
            mistakes: R`getter و setter لكل حقل أوتوماتيك (IDE بيولّدهم) فالـ class بقى struct مفتوح وكأن مفيش encapsulation. و ترجّع list داخلية من getter فاللي برّه يعدّل فيها: رجّع [[List.copyOf(items)]]. وتنسى [[this.]] لما اسم الباراميتر زي الحقل: [[owner = owner;]] بيعيّن الباراميتر لنفسه والحقل يفضل null (ولو الحقل [[final]] زي هنا، الـ compiler بيمسكها: [[variable owner might not have been initialized]]).

وفي الكود القديم هتلاقي Lombok ([[@Getter]] و [[@Setter]] و [[@Data]]) بيولّد الحاجات دي. شائع جدًا في الشركات، بس records قللت الحاجة ليه.`
          },
          teach: R`## البرنامج بيعمل إيه؟

class اسمه [[Account]] (حساب بنكي) فيه صاحب الحساب والرصيد، والرصيد مقفول من برّه: مفيش طريقة تغيّره غير بالـ methods اللي الـ class بيسمح بيها. وفي نفس الـ class فيه [[main]] بالشكل الكلاسيكي اللي هتشوفه في كل كود Java قديم. الملف لازم اسمه [[Account.java]]، واتشغّل بـ [[java Account.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. تعريف الـ class والحقول

~~~java
public class Account {
    private final String owner;
    private long balance;
~~~

- [[public class Account]]: [[class]] قالب للـ objects، و [[public]] معناها أي كود في أي مكان يقدر يستخدمه.
- القاعدة: الـ public class لازم اسم الملف يبقى هو هو. جرّبنا نحط الكود ده في [[Acc.java]] ونعمل [[javac Acc.java]]:

~~~text الناتج
Acc.java:1: error: class Account is public, should be declared in a file named Account.java
~~~

(الغريب إن [[java Acc.java]] نفسها اشتغلت: الـ source-file mode مش بيفحص الاسم. بس [[javac]] و Maven بيفحصوا، فخليك على القاعدة.)

- الحقول (fields): المتغيرات اللي كل object شايلها. في Java **لازم** تتعلن فوق بنوعها.
- [[private]]: محدش برّه الـ class يشوفها أو يلمسها.
- [[final]] على [[owner]]: بيتحط مرة واحدة في الـ constructor ومش بيتغير بعد كده (صاحب الحساب مبيتغيرش).
- [[long balance]]: من غير final، لأن الرصيد بيتغير. و [[long]] مش [[double]]: الفلوس أرقام صحيحة (قروش مثلًا).

---

## ٢. الـ constructor

~~~java
    public Account(String owner, long balance) {
        if (balance < 0) throw new IllegalArgumentException("negative balance");
        this.owner = owner;
        this.balance = balance;
    }
~~~

- الـ constructor هو الكود اللي بيشتغل لما حد يكتب [[new Account(...)]]. اسمه **نفس اسم الـ class** بالظبط، ومفيش قبله نوع رجوع (ولا حتى [[void]]). في TS كان اسمه [[constructor]].
- [[if (balance < 0) throw ...]]: الفحص هنا، في المكان الوحيد اللي الـ object بيتولد فيه. فمستحيل يبقى فيه Account برصيد سالب.
- [[throw new IllegalArgumentException("...")]]: [[throw]] زي JS، و [[IllegalArgumentException]] exception جاهزة معناها «الباراميتر اللي بعتهولي غلط».
- [[this.owner = owner;]]: فيه حاجتين بنفس الاسم: الباراميتر [[owner]] والحقل. [[this.owner]] = الحقل بتاع الـ object ده، و [[owner]] لوحدها = الباراميتر.

ولو نسيت [[this.]] وكتبت [[owner = owner;]]؟ انت بتحط الباراميتر في نفسه والحقل ميتلمسش. ولأن الحقل [[final]] هنا، الـ compiler مسكها:

~~~text الناتج
Account.java:9: error: variable owner might not have been initialized
    }
    ^
~~~

(لو الحقل مش final، مفيش خطأ خالص، والحقل بيفضل [[null]] بهدوء. فايدة تانية لـ final.)

---

## ٣. الـ methods

~~~java
    public void deposit(long amount) {
        balance += amount;
    }

    public long getBalance() { return balance; }
~~~

- [[public void deposit(long amount)]]: method عامة، [[void]] يعني مبترجعش قيمة، وبتاخد باراميتر [[long]].
- [[balance += amount;]]: من جوه الـ class الحقل الـ private متاح عادي، ومن غير [[this.]] لأن مفيش اسم تاني بيغطيه.
- [[getBalance()]]: بيرجع [[long]]. ده **getter**: الطريقة الوحيدة لقراية الرصيد من برّه. ومفيش [[setBalance]]: عايز تغيّر الرصيد؟ اعمل deposit.
- الـ method كلها ممكن تبقى في سطر واحد زي [[getBalance]]: المسافات والسطور في Java ملهاش معنى، الأقواس هي اللي بتحدد.

---

## ٤. [[@Override toString]]

~~~java
    @Override
    public String toString() { return owner + ": " + balance; }
~~~

- كل class في Java بيورث من [[Object]] methods جاهزة، منها [[toString()]]: النص اللي بيظهر لما تطبع الـ object. النسخة الأصلية بتطبع حاجة زي [[Account@1b6d3586]] (اسم الـ class ورقم).
- إحنا بنعيد تعريفها (override) ترجع [["Sara: 150"]].
- [[@Override]] اسمها **annotation**: علامة للـ compiler. معناها «أنا قاصد أعيد تعريف method موجودة في الأب». جرّبنا نكتب الاسم غلط [[tostring]] (t صغيرة):

~~~text الناتج
Account.java:17: error: method does not override or implement a method from a supertype
    @Override
    ^
~~~

من غير [[@Override]] كان هيعدّي، ويبقى عندك method جديدة اسمها tostring ومحدش بيناديها، والطباعة ترجع للشكل القديم من غير ما تفهم ليه.

---

## ٥. [[main]] الكلاسيكي

~~~java
    public static void main(String[] args) {
        Account acc = new Account("Sara", 100);
        acc.deposit(50);
        System.out.println(acc);
        System.out.println(acc.getBalance());
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[public]] | الـ JVM لازم يقدر يناديها من برّه |
| [[static]] | بتتنادى من غير object (الـ JVM لسه مش عامل أي Account) |
| [[void]] | مبترجعش حاجة |
| [[String[] args]] | array نصوص فيها اللي بتكتبه بعد اسم الملف: [[java Account.java Sara]] تبقى [[args[0]]] = [["Sara"]] |
| [[System.out.println]] | الطباعة القديمة: [[System]] class، و [[out]] الـ stream بتاع الشاشة، و [[println]] اطبع وانزل سطر |

ده الشكل اللي كان إجباري قبل Java 25، وهتلاقيه في كل مشروع Spring ([[@SpringBootApplication]] جواه main بالشكل ده).

- [[new Account("Sara", 100)]]: object جديد، والـ constructor اتنادى بالقيمتين.
- [[acc.deposit(50)]]: الرصيد بقى 150.
- [[System.out.println(acc)]]: بتنادي [[toString()]] لوحدها.

~~~text الناتج
Sara: 150
150
~~~

---

## ٦. الـ try: [[withdraw]] و private

الـ solCode مش ملف كامل: الـ method دي تتحط جوه الـ class (تحت [[deposit]] مثلًا)، والسطور اللي تحت [[// في main:]] تتحط في آخر [[main]]:

~~~java
public void withdraw(long amount) {
    if (amount > balance) throw new IllegalStateException("insufficient balance");
    balance -= amount;
}
~~~

- الفحص قبل التغيير: لو المبلغ أكبر من الرصيد، ارمي exception والرصيد ميتلمسش.
- [[IllegalStateException]] مش [[IllegalArgumentException]]: المبلغ نفسه سليم، المشكلة في **حالة** الحساب دلوقتي.
- [[-=]]: اطرح وخزّن.

شغّلناه بعد السطرين بتوع main (الرصيد 150)، وجرّبنا كمان [[acc.balance = 1_000_000;]] من جوه main:

~~~text الناتج
Sara: 150
150
Sara: 100
Sara: 1000000
Exception in thread "main" java.lang.IllegalStateException: insufficient balance
	at Account.withdraw(Account.java:16)
	at Account.main(Account.java:34)
~~~

- سحب 50: الرصيد 100.
- [[acc.balance = 1_000_000;]] **اشتغلت**! ليه؟ لأن main جوه نفس الـ class، و [[private]] معناها «جوه الـ class»، مش «جوه الـ object».
- سحب أكبر من الرصيد: exception. والسطور اللي بتبدأ بـ [[at]] اسمها **stack trace**: مين نادى مين. اقراها من فوق: الوقعة في [[withdraw]] سطر 16، اللي اتنادت من [[main]] سطر 34.

ومن class تاني في نفس الملف (ضفنا [[class Other { void hack(Account a) { a.balance = 1; } }]] تحت قفلة Account):

~~~text الناتج
Account.java:27: error: balance has private access in Account
class Other { void hack(Account a) { a.balance = 1; } }
                                      ^
~~~

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[private]] | جوه الـ class بس |
| (من غير كلمة) | جوه نفس الـ package |
| [[protected]] | الـ package والكلاسات الوارثة |
| [[public]] | أي حد |
| [[final]] على حقل | بيتحط مرة واحدة في الـ constructor |
| [[this.x]] | الحقل، لما فيه باراميتر بنفس الاسم |
| [[@Override]] | الـ compiler يتأكد إنك فعلًا بتعيد تعريف method موجودة |

- الـ constructor اسمه اسم الـ class ومن غير نوع رجوع، والفحص بتاع القواعد بيبقى فيه.
- الحقول private، والتغيير بـ methods ليها معنى ([[deposit]] و [[withdraw]]) مش setters.`,
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
          teach: R`## البرنامج بيعمل إيه؟

class [[Counter]] بيعدّ كام object اتعمل منه: العداد نفسه واحد مشترك ([[static]])، وكل object بياخد رقم خاص بيه ([[id]]) مش بيتغير ([[final]]). وفي الآخر بيوريك إن [[final]] على list مش بيمنع تعديلها. اتشغّل بـ [[java Counter.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. حقول الـ class

~~~java
class Counter {
    static int created = 0;
    static final int MAX = 3;
    final int id;
~~~

- [[class Counter]] من غير [[public]]: ينفع كذا class في نفس الملف، واسم الملف مش لازم يطابق.
- [[static int created = 0;]]: [[static]] معناها «بتاع الـ class نفسه». فيه **نسخة واحدة** من [[created]] مهما عملت objects، وكلهم بيشوفوها ويعدّلوا فيها.
- [[static final int MAX = 3;]]: static (نسخة واحدة) و final (متتغيرش) = **constant**. والعادة في Java إن اسم الـ constant حروف كبيرة و [[_]] بين الكلمات: [[MAX_RETRIES]].
- [[final int id;]]: من غير static، فكل object ليه [[id]] خاص بيه. ومن غير قيمة هنا: final بتسمح تتحط القيمة بعدين، بس **مرة واحدة**، والـ compiler بيتأكد إنها اتحطت في الـ constructor.

---

## ٢. الـ constructor

~~~java
    Counter() {
        created++;
        id = created;
    }
~~~

- [[Counter()]]: constructor من غير باراميترات.
- [[created++]]: [[++]] تزود ١. ده العداد المشترك: أول object يخليه 1، والتاني 2.
- [[id = created;]]: الـ id بتاع الـ object ده ياخد القيمة الحالية. ده أول وآخر تعيين لـ id.

---

## ٣. static method

~~~java
    static boolean full() { return created >= MAX; }
}
~~~

- method بتاعة الـ class: بتتنادى [[Counter.full()]] من غير ما يبقى معاك object.
- عشان كده جواها مفيش [[this]]، وتقدر تقرا الحاجات الـ static بس ([[created]] و [[MAX]]).
- [[>=]] أكبر من أو يساوي، والنتيجة [[boolean]].

جرّبنا نقرا [[id]] جواها ([[return id >= MAX;]]):

~~~text الناتج
st2/Counter.java:11: error: non-static variable id cannot be referenced from a static context
    static boolean full() { return id >= MAX; }
                                   ^
~~~

«non-static variable» = حقل بتاع object. والـ method دي ملهاش object، فـ id بتاع مين؟

---

## ٤. main

~~~java
void main() {
    var a = new Counter();
    var b = new Counter();
    IO.println(a.id + " " + b.id + " " + Counter.created);
    IO.println(Counter.full());
~~~

~~~text الناتج
1 2 2
false
~~~

- بعد [[a]]: created = 1 و a.id = 1. بعد [[b]]: created = 2 و b.id = 2.
- [[a.id]] و [[b.id]]: من الـ object (كل واحد بتاعه). [[Counter.created]]: من اسم الـ class (واحد للكل).
- [[Counter.full()]]: 2 أكبر من أو يساوي 3؟ لأ: [[false]].

---

## ٥. [[final]] على متغير object

~~~java
    final List<String> list = new ArrayList<>();
    list.add("still mutable");
    IO.println(list);
}
~~~

~~~text الناتج
[still mutable]
~~~

[[final]] هنا بتقفل **المتغير** [[list]]: مينفعش تكتب [[list = new ArrayList<>();]] تاني. بس الـ object اللي بيشاور عليه عادي بيتعدّل، و [[add]] اشتغلت. نفس [[const]] مع array في JS بالظبط. عايز list متتعدلش خالص؟ [[List.of(...)]] أو [[List.copyOf(list)]].

---

## ٦. الـ try: [[created++]] مع ١٠٠ thread

[[created++]] شكلها خطوة واحدة، بس هي ٣: اقرا القيمة، زوّد، اكتب. لو اتنين threads قروا نفس القيمة في نفس اللحظة، الاتنين يكتبوا نفس النتيجة، ويضيع عدّة. عشان نشوف ده بعينينا، كتبنا برنامج بيشغّل ١٠٠ thread، كل واحد بيزود عداد عادي وعداد [[AtomicInteger]] ألف مرة:

~~~java
static int plain = 0;
static final AtomicInteger safe = new AtomicInteger();

void main() throws Exception {
    Thread[] ts = new Thread[100];
    for (int i = 0; i < ts.length; i++) {
        ts[i] = new Thread(() -> {
            for (int j = 0; j < 1000; j++) { plain++; safe.incrementAndGet(); }
        });
        ts[i].start();
    }
    for (Thread t : ts) t.join();
    IO.println("plain=" + plain + " safe=" + safe.get());
}
~~~

(مفيش [[import]] لـ [[AtomicInteger]]: الـ compact source file بيعمل import لكل الـ module الأساسي [[java.base]] لوحده. في ملف فيه class عادي محتاج [[import java.util.concurrent.atomic.AtomicInteger;]].) [[new Thread(() -> ...)]] بيعمل thread بيشغّل الكود اللي في الـ lambda، و [[start()]] بيبدأه، و [[join()]] بيستنى لحد ما يخلص. المفروض الناتج 100 × 1000 = 100000. شغّلناه ٣ مرات (الماكينة فيها 16 logical processor):

~~~text الناتج
plain=99998 safe=100000
plain=99719 safe=100000
plain=99992 safe=100000
~~~

- [[plain]]: رقم مختلف كل مرة، وكله أقل من 100000. عدّات ضاعت.
- [[safe]]: 100000 كل مرة. [[incrementAndGet()]] بتعمل القراية والزيادة والكتابة كخطوة واحدة مينفعش حد يدخل في نصها (atomic).

وفي Spring كل request بيشتغل على thread، والـ beans نسخة واحدة مشتركة. فحقل بيتعدّل في bean هو نفس المشكلة دي بالظبط.

---

## الخلاصة

| | من غير static | static |
|---|---|---|
| كام نسخة | واحدة لكل object | واحدة للـ class كله |
| بتتنادى إزاي | [[a.id]] | [[Counter.created]] و [[Counter.full()]] |
| تقرا حقول الـ object؟ | أيوه | لأ، مفيش [[this]] |

- [[static final]] واسم كبير = constant.
- [[final]] = متتعيّنش تاني، مش immutable.
- [[x++]] على حاجة مشتركة بين threads مش آمنة: [[AtomicInteger]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف عقد اسمه [[Shape]] (أي شكل لازم يعرف يحسب مساحته)، واتنين classes بينفذوه بطريقتين مختلفتين، وبعدين list واحدة فيها الاتنين والكود بيتعامل معاهم كـ Shape من غير ما يعرف هما إيه. اتشغّل بـ [[java Shapes.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ interface

~~~java
interface Shape {
    double area();
    default String describe() { return getClass().getSimpleName() + " " + Math.round(area()); }
}
~~~

- [[interface Shape]]: عقد. بيقول «أي حد عايز يبقى Shape لازم يبقى عنده كذا»، ومبيقولش إزاي.
- [[double area();]]: method **من غير جسم**، بتنتهي بـ [[;]] بدل [[{ }]]. اسمها abstract method. وأي method في interface هي [[public]] و [[abstract]] لوحدها، فمش محتاج تكتبهم.
- [[default String describe() {...}]]: [[default]] معناها method **بتنفيذ جاهز** جوه الـ interface. أي class بينفذ Shape بياخدها ببلاش.

نفك [[describe]] من جوه لبرة:

1. [[area()]]: بتنادي الـ abstract method. مين هينفذها؟ الـ object الحقيقي وقت التشغيل (Circle أو Square).
2. [[Math.round(...)]]: بيقرّب لأقرب رقم صحيح. [[Math]] class فيه دوال حسابية كلها static.
3. [[getClass().getSimpleName()]]: اسم الـ class الحقيقي للـ object: [["Circle"]] أو [["Square"]].
4. [[+ " " +]]: لزق النصوص.

---

## ٢. التنفيذ الأول: [[Circle]]

~~~java
class Circle implements Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}
~~~

- [[implements Shape]]: Circle بيوعد إنه ينفذ العقد. ولو نسي method، الـ compiler يرفض. جرّبنا نشيل [[area()]] من Square:

~~~text الناتج
if3/Shapes.java:12: error: Shapes.Square is not abstract and does not override abstract method area() in Shape
~~~

- [[private final double r;]]: نص القطر، بيتحط مرة في الـ constructor.
- [[Math.PI]]: ثابت جاهز (3.141592653589793).
- [[public double area()]]: لازم [[public]]. الـ method في الـ interface public، ومينفعش التنفيذ يبقى أقل منها. جرّبنا نشيل [[public]] من [[area()]] بتاعة Square:

~~~text الناتج
if2/Shapes.java:15: error: area() in Shapes.Square cannot implement area() in Shape
    double area() { return side * side; }
           ^
  attempting to assign weaker access privileges; was public
~~~

«weaker access» = انت بتحاول تخلي الـ method أقل وصولًا من العقد.

---

## ٣. التنفيذ التاني: [[Square]]

~~~java
class Square implements Shape {
    private final double side;
    Square(double side) { this.side = side; }
    public double area() { return side * side; }
}
~~~

نفس العقد، تنفيذ مختلف: الضلع في نفسه. ومفيش [[describe]] هنا ولا في Circle: الاتنين واخدينها من الـ default.

---

## ٤. main: الشغل على العقد

~~~java
void main() {
    List<Shape> shapes = List.of(new Circle(1), new Square(3));
    for (Shape s : shapes) IO.println(s.describe());
}
~~~

~~~text الناتج
Circle 3
Square 9
~~~

- [[List<Shape>]]: list نوع عناصرها الـ interface. ينفع يتحط فيها أي object بينفذ Shape.
- [[for (Shape s : shapes)]]: الكود جوه الـ loop ميعرفش هو بيتعامل مع دايرة ولا مربع.
- [[s.describe()]] بتنادي [[area()]]، والـ JVM بيبص على الـ object الحقيقي ويشغّل نسخته. ده اسمه **dynamic dispatch**، وهو ده الـ **polymorphism**: نفس السطر، سلوك مختلف حسب النوع.
- الأرقام: دايرة نص قطرها 1 مساحتها π = 3.14159، و [[Math.round]] قرّبها لـ 3. مربع ضلعه 3: 9.0 بقت 9.

---

## ٥. الحل: [[PaymentGateway]] و [[Checkout]]

~~~java
interface PaymentGateway { String charge(long cents); }
~~~

العقد: أي بوابة دفع لازم تعرف تسحب مبلغ بالقروش ([[long cents]]) وترجع نص (رقم العملية مثلًا).

~~~java
class FakeGateway implements PaymentGateway {
    public String charge(long cents) { return "ok-" + cents; }
}

class FailingGateway implements PaymentGateway {
    public String charge(long cents) { throw new IllegalStateException("gateway down"); }
}
~~~

تنفيذين: واحد بينجح دايمًا، وواحد بيرمي exception دايمًا. ده بالظبط اللي بتعمله في التستات: تجرّب الحالتين من غير بوابة حقيقية.

~~~java
class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
~~~

- [[Checkout]] بيشيل حقل نوعه **الـ interface**، مش FakeGateway ولا Paymob.
- وبياخده في الـ constructor من برّه، مش بيعمل [[new]] جواه. ده اسمه **dependency injection**: الـ dependency بتتحقن من برّه.

~~~java
    String pay(long cents) {
        try {
            return "paid: " + gateway.charge(cents);
        } catch (IllegalStateException e) {
            return "failed: " + e.getMessage();
        }
    }
}
~~~

- [[try { ... } catch (IllegalStateException e) { ... }]]: زي try/catch في JS، بس بتحدد **نوع** الـ exception اللي هتمسكه. لو اترمى نوع تاني، مش هيتمسك هنا.
- [[e.getMessage()]]: الرسالة اللي اتبعتت للـ exception: [["gateway down"]].

~~~java
void main() {
    IO.println(new Checkout(new FakeGateway()).pay(5000));
    IO.println(new Checkout(new FailingGateway()).pay(5000));
}
~~~

~~~text الناتج
paid: ok-5000
failed: gateway down
~~~

نفس [[Checkout]] بالظبط، واتصرّف بشكلين حسب الـ gateway اللي اتبعتله. في Spring، [[new Checkout(...)]] ده Spring نفسه هيعمله ويختار الـ implementation (درس الـ DI في المستوى ٢).

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[interface]] | عقد: methods من غير تنفيذ |
| [[implements]] | الـ class بيوعد ينفذ العقد، ولازم كل الـ methods و [[public]] |
| [[default]] | method بتنفيذ جاهز جوه الـ interface |
| متغير نوعه interface | يقبل أي class بينفذه، والـ method اللي بتشتغل بتاعة الـ object الحقيقي |

- الـ class ينفذ كذا interface ([[implements A, B]]).
- اشتغل على العقد ([[PaymentGateway]])، وابعت التنفيذ من برّه.`,
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
          teach: R`## البرنامج بيعمل إيه؟

class أب abstract اسمه [[Notifier]] فيه الكود المشترك لإرسال إشعار، واتنين أبناء (إيميل و SMS) كل واحد بيقول اسم قناته، والـ SMS كمان بيقص الرسالة لـ ١٠ حروف. وبعدين نفس الفكرة من غير وراثة خالص (الحل). اتشغّل بـ [[java Notify.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الأب الـ abstract

~~~java
abstract class Notifier {
    private final String to;
    protected Notifier(String to) { this.to = to; }
    abstract String channel();
    String send(String msg) { return "[" + channel() + "] " + to + ": " + msg; }
}
~~~

- [[abstract class]]: class ناقص، **مينفعش** يتعمل منه object. موجود عشان يتورث بس. جرّبنا [[new Notifier("x")]]:

~~~text الناتج
ex2/Notify.java:21: error: Notify.Notifier is abstract; cannot be instantiated
~~~

- [[private final String to;]]: حقل (لمين هيتبعت). الـ interface مينفعش يبقى فيه حقول زي دي، الـ abstract class ينفع.
- [[protected Notifier(String to)]]: constructor. [[protected]] معناها الأبناء (والـ package) بس يقدروا ينادوه. منطقي، لأن محدش تاني هيعمل Notifier أصلًا.
- [[abstract String channel();]]: method من غير جسم. أي ابن **لازم** ينفذها.
- [[send]]: كود مشترك جاهز. بيبني [[[قناة] مستلم: رسالة]]، وبينادي [[channel()]] من غير ما يعرف القناة إيه. اللي هيتنفذ نسخة الابن الحقيقي وقت التشغيل. الشكل ده (الأب كاتب الخطوات والابن بيملا حتة) اسمه **Template Method pattern**.

---

## ٢. الابن الأول: [[EmailNotifier]]

~~~java
class EmailNotifier extends Notifier {
    EmailNotifier(String to) { super(to); }
    @Override String channel() { return "email"; }
}
~~~

- [[extends Notifier]]: EmailNotifier **هو** Notifier، وبياخد كل حاجة فيه ([[send]] جاهزة).
- [[super(to)]]: بينادي constructor الأب ويبعتله [[to]]. لازم يبقى **أول سطر** في constructor الابن، لأن الأب لازم يتجهز الأول.
- ولو مكتبتهوش؟ Java بتحط [[super()]] فاضي لوحدها، والأب مفيهوش constructor فاضي. جرّبنا [[EmailNotifier(String to) { }]]:

~~~text الناتج
ex3/Notify.java:9: error: constructor Notifier in class Notify.Notifier cannot be applied to given types;
    EmailNotifier(String to) { }
                             ^
  required: String
  found:    no arguments
  reason: actual and formal argument lists differ in length
~~~

[[required: String]] = الأب عايز String، و [[found: no arguments]] = اللي اتنادى من غير حاجة (الـ [[super()]] المخفي).

- [[@Override String channel()]]: تنفيذ الـ abstract method. و [[@Override]] ممكن تيجي في نفس السطر عادي.

---

## ٣. الابن التاني: [[SmsNotifier]] بيعيد تعريف [[send]]

~~~java
class SmsNotifier extends Notifier {
    SmsNotifier(String to) { super(to); }
    @Override String channel() { return "sms"; }
    @Override String send(String msg) { return super.send(msg.substring(0, Math.min(10, msg.length()))); }
}
~~~

السطر الأخير طويل، من جوه لبرة:

1. [[msg.length()]]: طول الرسالة. [["Your order has shipped"]] طولها 22.
2. [[Math.min(10, ...)]]: الأصغر بين 10 والطول. ليه؟ لو الرسالة أقصر من 10، [[substring(0, 10)]] هيقع ([[StringIndexOutOfBoundsException]])، فبناخد طولها هي.
3. [[msg.substring(0, 10)]]: الحروف من index 0 لحد 10 (من غير 10): [["Your order"]].
4. [[super.send(...)]]: نادي نسخة **الأب** من send بالرسالة المقصوصة. لو كتبت [[send(...)]] من غير super، هتنادي نفسها تاني وتلف للأبد.

---

## ٤. main

~~~java
void main() {
    List<Notifier> all = List.of(new EmailNotifier("sara@example.com"), new SmsNotifier("0100"));
    for (Notifier n : all) IO.println(n.send("Your order has shipped"));
}
~~~

~~~text الناتج
[email] sara@example.com: Your order has shipped
[sms] 0100: Your order
~~~

- [[List<Notifier>]]: نوعها الأب، وفيها الابنين.
- الإيميل: [[send]] بتاعة الأب، و [[channel()]] رجعت [["email"]].
- الـ SMS: [[send]] بتاعته هو (قص)، وبعدين [[super.send]]، اللي نادت [[channel()]] فرجعت [["sms"]].

---

## ٥. الحل: نفس الفكرة بالـ composition

~~~java
interface Channel { String name(); }
~~~

بدل ما «الإيميل يبقى نوع من Notifier»، نقول «الـ Notifier **عنده** قناة». القناة عقد بـ method واحدة.

~~~java
class Notifier {
    private final String to;
    private final Channel channel;
    Notifier(String to, Channel channel) { this.to = to; this.channel = channel; }
    String send(String msg) { return "[" + channel.name() + "] " + to + ": " + msg; }
}
~~~

- class عادي مش abstract، وحقل [[channel]] نوعه الـ interface.
- [[send]] بتسأل الـ object اللي جواها: [[channel.name()]].

~~~java
void main() {
    Channel email = () -> "email";
    IO.println(new Notifier("sara@example.com", email).send("Your order has shipped"));
}
~~~

~~~text الناتج
[email] sara@example.com: Your order has shipped
~~~

- [[() -> "email"]]: **lambda**، زي [[() => "email"]] في JS بس بسهم [[->]]. ينفع تتحط مكان [[Channel]] لأن Channel فيه method واحدة بس، فالـ lambda بتبقى هي التنفيذ بتاعها (درس lambdas).
- عايز SMS؟ [[() -> "sms"]]. من غير class جديد ولا وراثة. وفي التست تبعت قناة وهمية.
- (الحل بيطبع سطر الإيميل بس. القص بتاع الـ SMS ممكن يبقى method تانية في Channel لو محتاجه.)

---

## الخلاصة

| | abstract class | interface |
|---|---|---|
| حقول (state) | أيوه | لأ |
| constructor | أيوه | لأ |
| class يورث/ينفذ كام واحد | واحد بس ([[extends]]) | كذا واحد ([[implements]]) |
| [[new]] منه مباشرة | لأ | لأ |

- [[super(...)]] أول سطر في constructor الابن، و [[super.method()]] لنسخة الأب.
- [[abstract]] method = الابن لازم ينفذها.
- فضّل الـ composition (object جواه object) على الوراثة، إلا لو فيه علاقة «is-a» حقيقية وكود مشترك فعلًا.`,
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

والنسخة بالـ composition تحت: بتطبع نفس سطر الإيميل [[[email] sara@example.com: Your order has shipped]]. [[Notifier]] دلوقتي class واحد، والاختلاف في object بيتبعتله. تقدر تضيف قناة جديدة (WhatsApp) من غير ما تورث، وتقدر تغيّر قناة object وهو شغال، وتختبر [[Notifier]] بـ Channel وهمي. ولاحظ إن [[() -> "email"]] lambda لأن [[Channel]] فيه method واحدة.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف [[Money]] (مبلغ وعملة) كـ record، بفحص في الـ constructor وتوحيد للعملة، و method بتجمع مبلغين. وبعدين يجرّب الحاجات اللي الـ record عملها لوحده: الطباعة، والـ accessors، والمقارنة بالقيمة، والـ HashSet. اتشغّل بـ [[java MoneyDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ header: سطر بيعمل class كامل

~~~java
record Money(long cents, String currency) {
~~~

الأقواس بعد الاسم اسمها **header**، وفيها الحقول بنوعها. من السطر ده بس، Java ولّدت كل ده. عملنا [[javac]] وبصينا بـ [[javap -p]] ([[-p]] = اعرض الـ private كمان):

~~~text javap -p MoneyDemo$Money
final class MoneyDemo$Money extends java.lang.Record {
  private final long cents;
  private final java.lang.String currency;
  MoneyDemo$Money(long, java.lang.String);
  MoneyDemo$Money plus(MoneyDemo$Money);
  public final java.lang.String toString();
  public final int hashCode();
  public final boolean equals(java.lang.Object);
  public long cents();
  public java.lang.String currency();
}
~~~

| السطر | يعني |
|---|---|
| [[final class ... extends java.lang.Record]] | class عادي، [[final]] (محدش يورث منه) |
| [[private final long cents;]] | الحقول private و final: مبتتغيرش |
| [[MoneyDemo$Money(long, java.lang.String)]] | constructor بالحقول بالترتيب |
| [[toString]] و [[hashCode]] و [[equals]] | متولّدين من **كل** الحقول |
| [[cents()]] و [[currency()]] | accessor لكل حقل، بنفس اسمه (مش [[getCents]]) |
| [[plus]] | الـ method اللي احنا كتبناها |

([[MoneyDemo$]] لأن الملف compact، فالـ record اتحط جوه class مخفي اسمه MoneyDemo.)

---

## ٢. الـ compact constructor

~~~java
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
~~~

- [[Money {]] من غير [[( )]]: ده اسمه **compact constructor**. الباراميترات موجودة جواه بنفس أسامي الحقول ([[cents]] و [[currency]]) من غير ما تكتبها.
- بيتنفذ **قبل** ما القيم تتحط في الحقول. فهو المكان بتاع الفحص والتنضيف.
- [[if (cents < 0) throw ...]]: مفيش Money بمبلغ سالب. جرّبنا [[new Money(-1, "egp")]]:

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: negative
	at MoneyDemo$Money.<init>(MoneyDemo.java:3)
~~~

([[<init>]] هو اسم الـ constructor جوه الـ JVM.)

- [[currency = currency.toUpperCase();]]: بيغيّر **الباراميتر**، مش الحقل. وبعد ما الـ block يخلص، Java بتحط القيم (بعد التعديل) في الحقول. فالعملة دايمًا حروف كبيرة.

---

## ٣. method جوه الـ record

~~~java
    Money plus(Money other) { return new Money(cents + other.cents, currency); }
}
~~~

- الـ record ينفع فيه methods عادي.
- مبيعدّلش نفسه (الحقول final)، بيرجّع **Money جديد**. زي [[toUpperCase]] في String.
- [[other.cents]] من غير أقواس: جوه الـ record نفسه تقدر تقرا الحقل الـ private مباشرة. من برّه لازم [[cents()]].

---

## ٤. main سطر سطر

~~~java
    var a = new Money(1500, "egp");
    var b = new Money(1500, "EGP");
    IO.println(a);
~~~

~~~text الناتج
Money[cents=1500, currency=EGP]
~~~

[[a]] اتعمل بـ [["egp"]] بس الـ constructor كبّرها. و [[toString]] الجاهز شكله [[Name[field=value, ...]]].

~~~java
    IO.println(a.cents() + " " + a.currency());
~~~

~~~text الناتج
1500 EGP
~~~

الـ accessors بأقواس. ولو جرّبت تغيّر الحقل ([[a.cents = 5;]]):

~~~text الناتج
r2/MoneyDemo.java:18: error: cannot assign a value to final variable cents
    a.cents = 5;
     ^
~~~

~~~java
    IO.println(a.equals(b) + " " + (a == b));
~~~

~~~text الناتج
true false
~~~

- [[a.equals(b)]]: الـ equals المتولّد بيقارن كل الحقول: 1500 = 1500 و EGP = EGP، فـ [[true]].
- [[(a == b)]]: الأقواس لازمة عشان [[==]] تتحسب قبل [[+]]. و [[==]] بتسأل «نفس الـ object؟»: لأ، اتنين [[new]]، فـ [[false]].

~~~java
    IO.println(a.plus(b));
~~~

~~~text الناتج
Money[cents=3000, currency=EGP]
~~~

~~~java
    var set = new HashSet<Money>(List.of(a, b));
    IO.println(set.size());
~~~

~~~text الناتج
1
~~~

- [[HashSet]]: مجموعة مفيهاش تكرار. عشان تعرف إن عنصرين «نفس الحاجة» بتستخدم [[hashCode()]] الأول وبعدين [[equals()]].
- الـ record ولّد الاتنين من القيم، فـ a و b ليهم نفس الـ hashCode (اتأكدنا: [[a.hashCode() == b.hashCode()]] طلعت [[true]]) و equals بيقول true. فالـ set شالت عنصر واحد.
- في class عادي من غير equals و hashCode، الـ set كانت هتشيل 2.

---

## ٥. الحل: [[withCurrency]] و [[plus]] بفحص

~~~java
    Money plus(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("currency mismatch: " + currency + " vs " + other.currency);
        return new Money(cents + other.cents, currency);
    }
    Money withCurrency(String c) { return new Money(cents, c); }
~~~

- [[!currency.equals(...)]]: [[!]] = not. ومقارنة String بـ [[equals]] مش [[!=]].
- [[if]] من غير [[{ }]]: مسموح لو جسمه سطر واحد (الـ throw).
- [[withCurrency]]: نسخة جديدة بنفس المبلغ وعملة تانية. زي [[{ ...money, currency: c }]] في JS. والـ compact constructor هيكبّر العملة برضه، لأن أي [[new Money]] بيعدّي عليه.

~~~java
void main() {
    var egp = new Money(1500, "egp");
    var usd = egp.withCurrency("usd");
    IO.println(egp + " " + usd);
    IO.println(egp.plus(usd));
}
~~~

~~~text الناتج
Money[cents=1500, currency=EGP] Money[cents=1500, currency=USD]
Exception in thread "main" java.lang.IllegalArgumentException: currency mismatch: EGP vs USD
	at MoneyDemo$Money.plus(MoneyDemo.java:8)
	at MoneyDemo.main(MoneyDemo.java:18)
~~~

[[egp]] فضل زي ما هو بعد [[withCurrency]] (immutable)، والجمع بين عملتين مختلفتين وقع بالرسالة اللي كتبناها.

---

## الخلاصة

| اللي بتكتبه | اللي بتاخده |
|---|---|
| [[record Money(long cents, String currency)]] | حقول private final، و constructor، و [[cents()]] و [[currency()]]، و equals و hashCode و toString بالقيم |
| [[Money { ... }]] | فحص وتعديل الباراميترات قبل ما تتحفظ |
| [[withX(...)]] | نسخة جديدة بقيمة متغيرة (مفيش setters) |

- [[equals]] بالقيم، فالـ record ينفع في [[HashSet]] وكمفتاح [[HashMap]].
- مفيش حقول زيادة غير اللي في الـ header، ومينفعش يتورث.
- مناسب للـ DTOs والـ value objects، مش للـ JPA entities.`,
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
          teach: R`## البرنامج بيعمل إيه؟

[[enum Status]] فيه ٣ حالات لمهمة، وكل حالة معاها نص للعرض ([[label]]) و method بتقول هل المهمة لسه مفتوحة. وبعدين بيحوّل نص لـ enum، ويلف على كل القيم، ويوقع عمدًا بـ [[valueOf]] باسم غلط. اتشغّل بـ [[java EnumDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. القيم

~~~java
enum Status {
    TODO("Not started"), IN_PROGRESS("In progress"), DONE("Done");
~~~

- [[enum Status]]: نوع ليه عدد قيم ثابت معروف. متغير نوعه Status مينفعش ياخد غير التلاتة دول (أو null).
- [[TODO]] و [[IN_PROGRESS]] و [[DONE]]: الأسامي بحروف كبيرة و [[_]] (عادة الثوابت).
- [[("Not started")]] بعد كل اسم: كل قيمة بتنادي الـ constructor (تحت) بالنص بتاعها. يعني كل قيمة **object حقيقي** جواه بيانات.
- [[,]] بين القيم، و [[;]] في الآخر لازمة لأن فيه كود بعدها. (لو الـ enum فيه أسامي بس من غير كود، الـ [[;]] اختيارية.)

---

## ٢. الحقل والـ constructor والـ methods

~~~java
    private final String label;
    Status(String label) { this.label = label; }
    String label() { return label; }
    boolean isOpen() { return this != DONE; }
}
~~~

- [[private final String label;]]: كل قيمة شايلة label بتاعها.
- [[Status(String label)]]: الـ constructor. في الـ enum بيبقى private دايمًا لوحده، فمحدش يقدر يكتب [[new Status(...)]]: القيم هي التلاتة اللي فوق وبس.
- [[label()]]: getter.
- [[isOpen()]]: [[this]] هو القيمة اللي اتنادت عليها الـ method. و [[!=]] هنا سليمة (مع إنها objects)، لأن الـ JVM بيعمل **object واحد بس** لكل قيمة في البرنامج كله. [[DONE]] في أي مكان هو نفس الـ object.

---

## ٣. [[valueOf]]: من نص لـ enum

~~~java
    Status s = Status.valueOf("IN_PROGRESS");
    IO.println(s + " " + s.label() + " " + s.ordinal());
    IO.println(s.isOpen());
~~~

~~~text الناتج
IN_PROGRESS In progress 1
true
~~~

- [[Status.valueOf("IN_PROGRESS")]]: method جاهزة في أي enum. بتدوّر على قيمة اسمها **بالظبط** كده وترجعها.
- [[s]] لوحدها في الطباعة: [[toString()]] بتاعة الـ enum بترجع الاسم: [[IN_PROGRESS]].
- [[s.label()]]: النص اللي احنا حطيناه: [[In progress]].
- [[s.ordinal()]]: رقم ترتيب القيمة في التعريف، من صفر: TODO = 0 و IN_PROGRESS = 1 و DONE = 2.
- [[isOpen()]]: IN_PROGRESS مش DONE، فـ [[true]].

---

## ٤. [[values()]] و [[name()]]

~~~java
    for (Status each : Status.values()) IO.print(each.name() + " ");
    IO.println();
~~~

~~~text الناتج
TODO IN_PROGRESS DONE 
~~~

- [[Status.values()]]: array فيها كل القيم بترتيب التعريف.
- [[each.name()]]: الاسم كنص. نفس [[toString()]] هنا، بس [[name()]] مضمونة دايمًا ومحدش يقدر يغيّرها (toString ممكن تتعمل لها override).
- [[IO.print]] من غير سطر جديد، فالتلاتة في سطر واحد (وفيه مسافة في الآخر). و [[IO.println()]] الفاضية بتنزل سطر.

---

## ٥. [[valueOf]] باسم غلط

~~~java
    IO.println(Status.valueOf("done"));
~~~

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant EnumDemo.Status.done
	at java.base/java.lang.Enum.valueOf(Enum.java:293)
	at EnumDemo$Status.valueOf(EnumDemo.java:1)
	at EnumDemo.main(EnumDemo.java:16)
~~~

- [["done"]] حروف صغيرة، والاسم [[DONE]]. [[valueOf]] مبتتساهلش: [[No enum constant]] = «مفيش قيمة بالاسم ده».
- [[EnumDemo.Status.done]]: الاسم الكامل اللي دوّر عليه (Status جوه الـ class المخفي EnumDemo).
- الـ stack trace من تحت لفوق: main نادت [[Status.valueOf]]، اللي نادت [[Enum.valueOf]] جوه الـ JDK نفسه ([[java.base]])، وهي اللي رمت.

ولو النص جاي من المستخدم، ده يبقى crash. عشان كده الحل تحت.

---

## ٦. الحل: [[parse]] بترجع [[Optional]]

~~~java
enum Status {
    TODO, IN_PROGRESS, DONE;

    static Optional<Status> parse(String raw) {
        if (raw == null) return Optional.empty();
        String key = raw.strip().toUpperCase();
        return Arrays.stream(values()).filter(s -> s.name().equals(key)).findFirst();
    }
}
~~~

- [[TODO, IN_PROGRESS, DONE;]]: enum من غير labels، والـ [[;]] لأن بعدها method.
- [[static]]: بتتنادى [[Status.parse(...)]] من غير قيمة.
- [[Optional<Status>]]: «صندوق» يا فيه Status يا فاضي. بدل ما ترجع null أو ترمي exception، بترجع صندوق والكود اللي نادى لازم يتعامل مع الحالتين (درس Optional).
- [[if (raw == null) return Optional.empty();]]: [[==]] مع null سليمة. ولو مفحصناش، [[raw.strip()]] كانت هتقع بـ NPE.
- [[raw.strip().toUpperCase()]]: [[" Done "]] تبقى [["DONE"]].
- السطر الأخير من جوه لبرة:
  - [[values()]]: array القيم.
  - [[Arrays.stream(...)]]: بيحوّل الـ array لـ stream، زي ما تمسك array في JS وتعمل عليها [[filter]] و [[find]] (درس streams).
  - [[.filter(s -> s.name().equals(key))]]: سيب بس القيم اللي اسمها يساوي key. [[s -> ...]] lambda زي [[s => ...]] في JS.
  - [[.findFirst()]]: أول واحدة فاضلة، وبترجع [[Optional]] لوحدها: فيه القيمة، أو فاضي لو مفيش.

~~~java
void main() {
    IO.println(Status.parse("done"));
    IO.println(Status.parse(" Done "));
    IO.println(Status.parse("finished"));
}
~~~

~~~text الناتج
Optional[DONE]
Optional[DONE]
Optional.empty
~~~

مفيش ولا exception: [["finished"]] رجعت صندوق فاضي.

---

## الخلاصة

| الـ method | بترجع | مثال |
|---|---|---|
| [[valueOf("DONE")]] | القيمة، أو exception لو الاسم غلط | [[DONE]] |
| [[values()]] | array بكل القيم بالترتيب | [[TODO IN_PROGRESS DONE]] |
| [[name()]] | الاسم كنص | [["DONE"]] |
| [[ordinal()]] | الترتيب من صفر (متخزنوش في داتابيز) | [[2]] |

- كل قيمة object واحد بس، فـ [[==]] سليمة مع الـ enums.
- الـ enum ينفع فيه حقول و constructor و methods.
- [[valueOf]] على input من برّه: امسكها، أو اعمل [[parse]] بترجع Optional.`,
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
          teach: R`## البرنامج بيعمل إيه؟

method بتحوّل حالة مهمة لرقم أولوية بـ switch على enum، و method تانية بتوصف رقم بكلمة بـ switch على int فيه حالة بكذا سطر. الاتنين بيستخدموا الـ switch كـ **قيمة** بترجع. اتشغّل بـ [[java SwitchDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف.

---

## ١. الـ enum و [[priority]]

~~~java
enum Status { TODO, IN_PROGRESS, DONE }

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS -> 2;
        case DONE -> 0;
    };
}
~~~

- [[enum Status { ... }]] في سطر: أسامي بس، فمفيش [[;]].
- [[int priority(Status s)]]: method بترجع [[int]]. ومن غير [[static]] عادي هنا، لأن [[main]] في الملف الـ compact مش static.
- [[return switch (s) { ... };]]: الـ switch كله **expression** ليه قيمة، والقيمة دي هي اللي بترجع. لاحظ الـ [[;]] بعد [[}]]: لأنه آخر جملة [[return]].
- [[case TODO -> 1;]]: لو s هي TODO، قيمة الـ switch 1. السهم [[->]] بينفذ اللي بعده **بس**: مفيش [[break]]، ومفيش «يكمّل للـ case اللي تحته» (fall-through) زي switch بتاع JS.
- مفيش [[default]]: الـ compiler عارف إن الـ enum فيه ٣ قيم والتلاتة متغطيين.

---

## ٢. [[size]]: switch على int

~~~java
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
~~~

- [[case 1, 2, 3 ->]]: كذا قيمة لنفس النتيجة، مفصولين بـ [[,]].
- [[default ->]]: «أي حاجة تانية». مع [[int]] **لازمة**: فيه ٤ مليار احتمال والـ compiler مش هيعرف إنك غطيتهم.
- [[{ ... }]] بعد السهم: لو محتاج أكتر من سطر.
- [[n > 100 ? "huge" : "big"]]: الـ ternary زي JS: لو الشرط صح القيمة الأولى، غير كده التانية.
- [[yield label;]]: بترجّع القيمة **من الـ block للـ switch**. ليه مش [[return]]؟ لأن return هتخرج من الـ method كلها، واحنا عايزين نطلع من الـ case بس.

جرّبنا نشيل سطر الـ [[yield]] خالص:

~~~text الناتج
w4/SwitchDemo.java:17: error: switch rule completes without providing a value
        }
        ^
  (switch rules in switch expressions must either provide a value or throw)
~~~

«كل case في switch expression لازم يطلّع قيمة أو يرمي exception».

---

## ٣. main

~~~java
void main() {
    IO.println(priority(Status.IN_PROGRESS));
    IO.println(size(2) + " " + size(50) + " " + size(500));
}
~~~

~~~text الناتج
2
small big huge
~~~

- [[IN_PROGRESS]] → 2.
- 2 في [[case 1, 2, 3]] → small. 50 مش في أي case، فالـ default، و 50 مش أكبر من 100 → big. و 500 → huge.

---

## ٤. الـ try: إضافة [[BLOCKED]]

غيّرنا السطر الأول لـ [[enum Status { TODO, IN_PROGRESS, DONE, BLOCKED }]] من غير ما نلمس [[priority]]:

~~~text الناتج
w2/SwitchDemo.java:4: error: the switch expression does not cover all possible input values
    return switch (s) {
           ^
~~~

الـ switch بقى ناقص قيمة، والـ compiler رفض البرنامج كله وورّاك مكانه بالظبط. ده المعنى الحقيقي لـ **exhaustive**: لو عندك ٢٠ switch على Status في المشروع، الـ compiler هيطلّعهم كلهم.

---

## ٥. الحل: القديم مقابل الجديد

~~~java
int priorityOld(Status s) {
    switch (s) {
        case TODO: return 1;
        case IN_PROGRESS: return 2;
        default: return 0;
    }
}
~~~

- ده الـ switch القديم (statement، مش expression): [[case X:]] بنقطتين مش سهم، وكل case بيعمل [[return]] بنفسه.
- [[default: return 0;]]: أي حاجة مش TODO ولا IN_PROGRESS ترجع 0.

~~~java
int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS, BLOCKED -> 2;
        case DONE -> 0;
    };
}

void main() {
    IO.println(priorityOld(Status.BLOCKED) + " " + priority(Status.BLOCKED));
}
~~~

~~~text الناتج
0 2
~~~

- النسخة القديمة اتعملها compile **من غير أي خطأ ولا تحذير** بعد إضافة BLOCKED، ورجّعت 0 بهدوء: المهام المتوقفة بقت أولويتها زي المهام اللي خلصت.
- النسخة الجديدة كانت هتوقف الـ compile لحد ما تقرر BLOCKED قيمتها كام، وهنا ضفناها مع IN_PROGRESS: 2.

> ممنوع تخلط الشكلين في نفس الـ switch. جرّبنا نحط [[case 9: yield "nine";]] جوه switch كله أسهم: [[error: different case kinds used in the switch]].

---

## ٦. لو القيمة null؟

جرّبنا في jshell switch على enum قيمته [[null]] من غير [[case null]]:

~~~text الناتج
|  Exception java.lang.NullPointerException: Cannot invoke "REPL.$JShell$2$S.ordinal()" because "REPL.$JShell$3.x" is null
~~~

الـ switch على enum بيستخدم [[ordinal()]] من جوه، فبيقع بـ NPE. لو null متوقعة، ضيف [[case null ->]].

---

## الخلاصة

| | القديم [[case X:]] | الجديد [[case X ->]] |
|---|---|---|
| بيرجع قيمة؟ | لأ (statement) | أيوه (expression) |
| fall-through | أيوه لو نسيت [[break]] | مفيش |
| كذا قيمة | [[case 1: case 2:]] | [[case 1, 2 ->]] |
| block بكذا سطر | عادي | [[{ ... yield x; }]] |
| بيفحص إنك غطيت كل الـ enum | لأ | أيوه، لو مفيش [[default]] |

- متحطش [[default]] في switch على enum: هيخبّي القيم الجديدة.
- مع [[int]] و [[String]] الـ [[default]] لازمة.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف [[Payment]] كنوع مقفول ليه ٣ أشكال بس (كارت، ومحفظة، وكاش)، كل شكل record ببيانات مختلفة. وبعدين method بـ switch بيعرف الشكل ويفك حقوله في نفس الخطوة، وفي main فيه كمان [[instanceof]] بالشكل الجديد. ده المقابل في Java لـ [[type Payment = Card | Wallet | Cash]] في TS. اتشغّل بـ [[java SealedDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف.

---

## ١. [[sealed interface]]: القايمة مقفولة

~~~java
sealed interface Payment permits Card, Wallet, Cash {}
~~~

- [[sealed]] = مقفول. و [[permits Card, Wallet, Cash]] = دول بس المسموح لهم ينفذوا Payment.
- [[{}]]: الـ interface فاضي، ملوش methods. هو هنا «اسم للعيلة» بس.

جرّبنا نضيف نوع رابع مش في القايمة ([[record Crypto(long amount) implements Payment {}]]):

~~~text الناتج
z5/SealedDemo.java:5: error: class is not allowed to extend sealed class: Payment (as it is not listed in its 'permits' clause)
record Crypto(long amount) implements Payment {}
^
~~~

ليه ده مهم؟ لأن الـ compiler دلوقتي **عارف كل الاحتمالات**، زي ما بيعرف قيم الـ enum. فيقدر يتأكد إن الـ switch مغطيهم (تحت).

---

## ٢. الأنواع التلاتة

~~~java
record Card(String last4, long amount) implements Payment {}
record Wallet(String phone, long amount) implements Payment {}
record Cash(long amount) implements Payment {}
~~~

- كل واحد record (درس records) ببيانات مختلفة: الكارت آخر ٤ أرقام، والمحفظة رقم تليفون، والكاش مبلغ بس.
- الأنواع المسموحة لازم تبقى [[final]] أو [[sealed]] أو [[non-sealed]]، عشان محدش يورث منها ويفتح القايمة من الباب الخلفي. والـ records [[final]] لوحدها، فمش محتاج تكتب حاجة.

---

## ٣. الـ switch على النوع

~~~java
String describe(Payment p) {
    return switch (p) {
~~~

switch expression (درس switch) بس المرة دي على **نوع** الـ object مش على قيمة. كل [[case]] اسمه **pattern**.

### الـ case الأول: record pattern مع [[when]]

~~~java
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
~~~

من الشمال لليمين:

1. [[Card(...)]]: هل p نوعه Card؟
2. [[(var last4, var amount)]]: لو أيوه، فكّه: نادي [[last4()]] و [[amount()]] وحط القيم في متغيرين جداد. ده **record pattern**، زي الـ destructuring في JS: [[const { last4, amount } = card]]. و [[var]] = النوع يتستنتج ([[String]] و [[long]]).
3. [[when amount > 10_000]]: **guard**، شرط زيادة. الـ case ده يتطابق بس لو الكارت ومبلغه أكبر من ١٠ آلاف. لو لأ، يكمّل للـ case اللي بعده.
4. [[-> "big card payment ****" + last4]]: النتيجة، و [[last4]] متاح هنا لأنه اتفك.

### الـ case التاني: type pattern

~~~java
        case Card c -> "card ****" + c.last4();
~~~

- [[Card c]]: «لو p نوعه Card، سمّيه [[c]]»، و [[c]] نوعه Card فعلًا، من غير cast. ده **type pattern**.
- هنا ما فكّيناش الحقول، فبنقراها بالـ accessor: [[c.last4()]].
- ده بيلقط أي Card **ما اتلقطش** في اللي فوق (يعني المبلغ 10,000 أو أقل).

### المحفظة والكاش

~~~java
        case Wallet(var phone, var amount) -> "wallet " + phone + " " + amount;
        case Cash cash -> "cash " + cash.amount();
    };
}
~~~

نفس الشكلين: record pattern للمحفظة، و type pattern للكاش. ومفيش [[default]]: الـ compiler عارف من الـ [[permits]] إن التلاتة اتغطوا.

---

## ٤. main

~~~java
void main() {
    Object o = "hello";
    if (o instanceof String s && s.length() > 3) IO.println(s.toUpperCase());
~~~

~~~text الناتج
HELLO
~~~

- [[o]] نوعه Object (والقيمة الحقيقية String).
- [[o instanceof String s]]: بيسأل «هل o String؟»، ولو أيوه بيعمل متغير [[s]] نوعه String. الطريقة القديمة كانت [[instanceof]] وبعدين [[String s = (String) o;]] في سطر لوحده.
- [[&& s.length() > 3]]: [[s]] متاح بعد [[&&]] لأن الجزء التاني مش بيتنفذ غير لو الأول صح، يعني مضمون إنه String هناك. زي الـ narrowing في TS.
- [["hello"]] طولها 5، فاتطبعت بحروف كبيرة.

~~~java
    List<Payment> all = List.of(new Card("4242", 50_000), new Card("1111", 200), new Wallet("0100", 90), new Cash(10));
    all.forEach(p -> IO.println(describe(p)));
}
~~~

~~~text الناتج
big card payment ****4242
card ****1111
wallet 0100 90
cash 10
~~~

- [[all.forEach(p -> ...)]]: لكل عنصر، نفّذ الـ lambda. زي [[forEach(p => ...)]] في JS.
- كارت ٥٠ ألف: عدّى الـ guard → big. كارت ٢٠٠: الـ guard فشل، فنزل لـ [[case Card c]]. والمحفظة والكاش كل واحد في الـ case بتاعه.

---

## ٥. الـ try (١): نوع جديد في الـ permits

ضفنا [[record Installment(int months, long amount) implements Payment {}]] وضفنا [[Installment]] للـ [[permits]]، من غير ما نلمس الـ switch:

~~~text الناتج
z2/SealedDemo.java:8: error: the switch expression does not cover all possible input values
    return switch (p) {
           ^
~~~

نفس رسالة الـ enum بالظبط. وبعد ما ضفنا الـ case:

~~~java
        case Installment(var months, var amount) -> months + " months of " + amount / months;
~~~

وضفنا [[new Installment(3, 900)]] للـ list:

~~~text الناتج
HELLO
big card payment ****4242
card ****1111
wallet 0100 90
cash 10
3 months of 300
~~~

[[amount / months]]: [[long]] على [[int]] = قسمة صحيحة: 900 / 3 = 300.

---

## ٦. الـ try (٢): ترتيب الـ cases

بدّلنا أول سطرين، فبقى [[case Card c]] قبل [[case Card(...) when ...]]:

~~~text الناتج
z4/SealedDemo.java:9: error: this case label is dominated by a preceding case label
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
             ^
~~~

الـ switch بيجرّب من فوق لتحت. [[case Card c]] بيلقط **أي** Card، فاللي تحته مستحيل يتوصل له. **dominated** = «مغطّى بواحد قبله». والـ compiler بيعتبرها غلطة بدل ما يسيبك تكتب كود ميت.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[sealed interface X permits A, B]] | A و B بس هما X |
| [[case A a ->]] | type pattern: لو A، سمّيه a |
| [[case A(var f, var g) ->]] | record pattern: لو A، فك حقوله |
| [[case A a when cond ->]] | guard: ونفس الوقت الشرط صح |
| [[o instanceof String s]] | افحص وسمّي في خطوة |

- sealed + records + switch من غير default = discriminated union في TS، والـ compiler بيمسك أي حالة ناقصة.
- الـ cases المحددة (بشروط أو أنواع أضيق) قبل العامة.`,
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
