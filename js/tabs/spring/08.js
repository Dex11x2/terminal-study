// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
          teach: R`## الملف ده بيقول إيه؟

[[pom.xml]] بيوصف المشروع لـ Maven: هو مين (الاسم والنسخة)، وبيورث إعداداته من مين (Spring Boot)، وبيستخدم Java كام، ومحتاج أنهي مكتبات. حطينا الملف ده لوحده في فولدر وشغّلنا عليه [[mvn dependency:tree]] في [[maven:3.9-eclipse-temurin-25]] (Maven 3.9 و JDK 25)، والنتايج تحت.

و [[pom]] اختصار Project Object Model. والملف XML: كل حاجة بين tag بيفتح [[<name>]] و tag بيقفل [[</name>]].

---

## ١. البداية

~~~xml
<project>
  <modelVersion>4.0.0</modelVersion>
~~~

- [[<project>]]: الـ tag اللي كل حاجة جواه.
- [[<modelVersion>4.0.0</modelVersion>]]: نسخة **صيغة** الملف نفسه، مش نسخة مشروعك. ثابتة [[4.0.0]] في Maven 3.

(الـ pom اللي start.spring.io بيعمله فيه كمان [[xmlns]] و [[xsi:schemaLocation]] على [[<project>]]: دول عشان الـ editor يعرف يكمّل ويفحص، و Maven مش محتاجهم.)

---

## ٢. الـ parent

~~~xml
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
  </parent>
~~~

المشروع بيورث pom تاني جاهز، زي [[extends]] في Java. وأي مكتبة في Maven ليها ٣ إحداثيات:

| الإحداثي | معناه | هنا |
|---|---|---|
| [[groupId]] | مين عاملها، عادة الدومين بالعكس | [[org.springframework.boot]] |
| [[artifactId]] | اسمها | [[spring-boot-starter-parent]] |
| [[version]] | نسختها | [[4.1.1]] (آخر نسخة مستقرة لما اتكتب الدرس، وهي اللي start.spring.io اداهالنا) |

الـ parent بيديك جدول بإصدارات مئات المكتبات المجرّبة مع بعض (اسمه BOM = Bill of Materials). سألنا Maven عن قيمتين جاية من الـ parent:

~~~bash
mvn help:evaluate -Dexpression=postgresql.version -q -DforceStdout
~~~

~~~text الناتج
42.7.13
~~~

إحنا مكتبناش رقم نسخة لـ PostgreSQL في أي حتة، وده اللي الـ parent حدده.

---

## ٣. مشروعك نفسه

~~~xml
  <groupId>com.example</groupId>
  <artifactId>tasks-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
~~~

نفس الـ ٣ إحداثيات بس لمشروعك. اسم الـ jar اللي هيطلع بيتعمل منهم: [[tasks-api-0.0.1-SNAPSHOT.jar]]. و [[SNAPSHOT]] معناها «نسخة لسه بتتطور»، ولما تعمل release بتشيلها ([[1.0.0]]).

---

## ٤. الإعدادات

~~~xml
  <properties>
    <java.version>25</java.version>
  </properties>
~~~

[[<properties>]] متغيرات. [[java.version]] property الـ parent بتاع Spring Boot بيقراها ويظبط بيها الـ compiler. اتأكدنا:

~~~bash
mvn help:evaluate -Dexpression=maven.compiler.release -q -DforceStdout
~~~

~~~text الناتج
25
~~~

يعني الكود هيتعمل له compile لـ Java 25.

---

## ٥. المكتبات

~~~xml
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
~~~

- [[<dependencies>]] زي [[dependencies]] في package.json، وكل مكتبة في [[<dependency>]].
- مفيش [[<version>]]: الـ parent بيحددها (4.1.1).
- [[spring-boot-starter-webmvc]]: starter، يعني مكتبة فاضية تقريبًا وظيفتها تجيب مجموعة مكتبات مع بعض: Spring MVC و Tomcat و Jackson (JSON).

~~~xml
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
~~~

[[<scope>]] بيحدد المكتبة متاحة إمتى:

| الـ scope | وقت الـ compile | وقت التشغيل | في التستات | زي في npm |
|---|---|---|---|---|
| [[compile]] (الافتراضي) | أيوه | أيوه | أيوه | dependencies |
| [[runtime]] | لأ | أيوه | أيوه | مفيش |
| [[test]] | للتستات بس | لأ | أيوه | devDependencies |
| [[provided]] | أيوه | السيرفر بيوفرها | أيوه | peerDependencies تقريبًا |

الـ driver بتاع PostgreSQL [[runtime]] لأن كودك مبيكتبش [[import org.postgresql...]] أبدًا: بيتكلم مع [[DataSource]] و JPA، والـ driver بيتحمّل وقت التشغيل.

~~~xml
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
~~~

أدوات التست (JUnit و Mockito و AssertJ و MockMvc)، بـ [[test]] فمش هتدخل الـ jar النهائي.

---

## ٦. الشجرة: [[dependency:tree]]

~~~bash
mvn dependency:tree
~~~

ده جزء من الناتج (شلنا سطور جوه الفروع):

~~~text الناتج
[INFO] com.example:tasks-api:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-webmvc:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-jackson:jar:4.1.1:compile
[INFO] |  |  \- org.springframework.boot:spring-boot-jackson:jar:4.1.1:compile
[INFO] |  |     \- tools.jackson.core:jackson-databind:jar:3.1.5:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-tomcat:jar:4.1.1:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-tomcat-runtime:jar:4.1.1:compile
[INFO] |  ...
[INFO] +- org.postgresql:postgresql:jar:42.7.13:runtime
[INFO] |  \- org.checkerframework:checker-qual:jar:3.55.1:runtime
[INFO] \- org.springframework.boot:spring-boot-starter-webmvc-test:jar:4.1.1:test
[INFO] BUILD SUCCESS
~~~

نقرا سطر: [[groupId:artifactId:jar:version:scope]]. و [[+-]] و [[\-]] فروع الشجرة: كل مكتبة تحت اللي جابها. احنا كتبنا ٣ مكتبات بس، والباقي اسمه **transitive dependencies** (مكتبات المكتبات). و [[tomcat-embed-core]] جاية تحت [[spring-boot-starter-tomcat-runtime]] تحت [[spring-boot-starter-tomcat]] تحت الـ webmvc starter.

ولاحظ [[tools.jackson.core]]: ده Jackson 3 اللي Spring Boot 4 بيستخدمه، بدل [[com.fasterxml.jackson.core:jackson-databind]] بتاع Boot 3.

---

## ٧. لو كتبت version غلط

ضفنا [[<version>1.0</version>]] تحت [[spring-boot-starter-webmvc]] وعملنا [[mvn compile]]:

~~~text الناتج
[WARNING] The POM for org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 is missing, no dependency information available
[INFO] BUILD FAILURE
[ERROR] Failed to execute goal on project tasks-api: Could not resolve dependencies for project com.example:tasks-api:jar:0.0.1-SNAPSHOT
[ERROR] dependency: org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 (compile)
[ERROR] 	Could not find artifact org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 in central (https://repo.maven.apache.org/maven2)
~~~

الـ version اللي بتكتبه بيكسب على الـ parent، و Maven راح يدوّر على [[1.0]] في Maven Central (الـ registry) وملقاهاش. والمكتبات اللي بتتحمّل بتتحفظ في [[~/.m2/repository]].

---

## الخلاصة

| الجزء | زي في package.json |
|---|---|
| [[groupId]] و [[artifactId]] و [[version]] | [[name]] و [[version]] |
| [[<parent>]] | مفيش: إصدارات جاهزة متوافقة |
| [[<properties>]] | إعدادات ومتغيرات |
| [[<dependencies>]] | [[dependencies]] |
| [[<scope>test</scope>]] | [[devDependencies]] |
| [[~/.m2/repository]] | [[node_modules]] بس واحد للجهاز كله |

- متكتبش version لمكتبة الـ parent بيديرها.
- [[dependency:tree]] أول حاجة تبص فيها لما مكتبة تتصرف غريب.`,
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
          sol: R`في [[dependency:tree]] هتلاقي [[tomcat-embed-core]] تحت [[spring-boot-starter-tomcat-runtime]] تحت [[spring-boot-starter-tomcat]] تحت [[spring-boot-starter-webmvc]]، و Jackson تحت [[spring-boot-starter-jackson]]. مكتبتهمش لأن الـ starter جابهم (transitive). وفي Spring Boot 4 هتلاقي Jackson 3 ([[tools.jackson.core:jackson-databind]]) بدل [[com.fasterxml.jackson]] القديم.

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
          teach: R`## الأوامر دي بتعمل إيه؟

دي الأوامر اليومية لمشروع Spring Boot بـ Maven: تشغّل، وتختبر، وتعمل jar وتشغّله، وتبص على المكتبات. جرّبناها كلها على مشروع من start.spring.io فيه Spring Web بس (Spring Boot 4.1.1، و [[artifactId]] اسمه [[tasks-api]])، وضفنا فيه controller صغير ([[/hello]]) وتستين، جوه [[maven:3.9-eclipse-temurin-25]] (JDK 25)، والبورت 8080 بتاع الـ container متوصّل بـ 5945 على الجهاز.

---

## ١. الأول: [[./mvnw]] نفسه

- [[mvnw]] = Maven Wrapper: سكربت shell في فولدر المشروع. أول مرة بيشتغل بيقرا [[.mvn/wrapper/maven-wrapper.properties]] ويعرف النسخة المطلوبة، ويحمّلها في [[~/.m2/wrapper/dists]]، وبعدين يشغّلها.
- [[./]] قبله: «الملف ده اللي في الفولدر الحالي»، لأن لينكس والماك مبيدوروش في الفولدر الحالي لوحدهم. على ويندوز: [[mvnw.cmd]] أو [[.\mvnw]] في PowerShell.

~~~bash
./mvnw --version
~~~

~~~text الناتج
Apache Maven 3.9.16 (2bdd9fddda4b155ebf8000e807eb73fd829a51d5)
Maven home: /root/.m2/wrapper/dists/apache-maven-3.9.16/56ba1f9f
Java version: 25.0.4.1, vendor: Eclipse Adoptium, runtime: /opt/java/openjdk
~~~

- [[Maven home]] جوه [[.m2/wrapper]]: يعني دي النسخة اللي الـ wrapper حمّلها، مش Maven متسطّب.
- [[Java version]]: Maven بيستخدم الـ JDK اللي في [[JAVA_HOME]] أو الـ PATH.

---

## ٢. [[./mvnw spring-boot:run]]

~~~bash
./mvnw spring-boot:run
~~~

[[spring-boot:run]] شكله [[plugin:goal]]: الـ plugin [[spring-boot]] (اللي في [[<build>]] في الـ pom)، والمهمة [[run]]: compile وشغّل من غير jar. الناتج (آخر سطور):

~~~text الناتج
[INFO] Attaching agents: []
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 5.816 seconds (process running for 7.071)
~~~

ومن الجهاز:

~~~bash
curl "localhost:5945/hello?name=Mona"
~~~

~~~text الناتج
Good evening, Mona
~~~

التطبيق بيفضل شغال لحد ما توقفه بـ Ctrl+C.

---

## ٣. [[./mvnw test]] و [[-Dtest=...]]

~~~bash
./mvnw test
~~~

~~~text الناتج
[INFO] Running com.example.tasks.GreetingServiceTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.458 s -- in com.example.tasks.GreetingServiceTest
[INFO] Running com.example.tasks.TaskControllerTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.024 s -- in com.example.tasks.TaskControllerTest
[INFO] Running com.example.tasks.TasksApplicationTests
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 9.364 s -- in com.example.tasks.TasksApplicationTests
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
~~~

- [[test]] هنا **phase** مش goal: Maven بيعدّي على كل اللي قبلها (compile الكود، و compile التستات) وبعدين يشغّل التستات.
- [[Failures]] تست قال النتيجة غلط، و [[Errors]] تست وقع بـ exception.
- لاحظ الوقت: التستين العاديين في أجزاء من الثانية، و [[TasksApplicationTests]] (اللي start.spring.io بيعمله، بيشغّل Spring كله) ٩ ثواني.

~~~bash
./mvnw test -Dtest=TaskControllerTest
~~~

~~~text الناتج
[INFO] Running com.example.tasks.TaskControllerTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
~~~

[[-D]] بيحط system property: [[-Dname=value]]. والـ property [[test]] بيقراها الـ plugin اللي بيشغّل التستات (Surefire) ويختار الـ class ده بس. وتقدر تكتب [[-Dtest=TaskControllerTest#helloUsesService]] لتست واحد (من docs الـ Surefire).

---

## ٤. [[./mvnw clean package -DskipTests]]

~~~bash
./mvnw clean package -DskipTests
~~~

phases بالترتيب:

| الـ phase | بتعمل إيه |
|---|---|
| [[clean]] | تمسح فولدر [[target/]] كله |
| [[validate]] | تتأكد إن الـ pom سليم |
| [[compile]] | تترجم [[src/main/java]] |
| [[test]] | التستات (اتخطت بسبب [[-DskipTests]]) |
| [[package]] | تعمل الـ jar |

~~~text الناتج
[INFO] Tests are skipped.
[INFO] Building jar: /w/web/target/tasks-api-0.0.1-SNAPSHOT.jar
[INFO] Replacing main artifact /w/web/target/tasks-api-0.0.1-SNAPSHOT.jar with repackaged archive, adding nested dependencies in BOOT-INF/.
[INFO] BUILD SUCCESS
~~~

السطر التالت هو الـ Spring Boot plugin: أخد الـ jar العادي (كودك بس) وعمل منه **fat jar** فيه كل المكتبات جوه فولدر [[BOOT-INF/]]. الحجم:

~~~text ls -lh target (الحجم والاسم بس)
19M  target/tasks-api-0.0.1-SNAPSHOT.jar
4.7K target/tasks-api-0.0.1-SNAPSHOT.jar.original
~~~

[[.jar.original]] كودك قبل الـ repackage: ٤.٧ كيلو. والـ ١٩ ميجا معظمهم Tomcat و Spring و Jackson. الاسم [[artifactId-version.jar]] من الـ pom.

---

## ٥. [[java -jar target/tasks-api-0.0.1-SNAPSHOT.jar]]

السيرفر مش محتاج Maven ولا الكود: Java والـ jar بس.

~~~text الناتج
 :: Spring Boot ::                (v4.1.1)
... Starting TasksApplication v0.0.1-SNAPSHOT using Java 25.0.4.1 with PID 1
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 3.942 seconds (process running for 5.062)
~~~

([[...]] مكان التاريخ واسم الـ logger، شلناهم عشان السطر يبان.) أسرع من [[spring-boot:run]] لأن مفيش compile.

ومع [[--server.port=9090]] (الحل في «جرّب»):

~~~text الناتج
... Tomcat started on port 9090 (http) with context path '/'
~~~

أي argument بيبدأ بـ [[--]] بعد اسم الـ jar Spring بيعتبره إعداد، وبيكسب على [[application.properties]].

---

## ٦. [[./mvnw dependency:tree]]

goal من الـ dependency plugin: الشجرة كاملة ومين جاب مين (درس pom.xml). أول سطور:

~~~text الناتج
[INFO] com.example:tasks-api:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-webmvc:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:4.1.1:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:4.1.1:compile
[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.5.38:compile
~~~

---

## ٧. [[./mvnw versions:display-dependency-updates]]

goal من الـ Versions plugin (Maven بيحمّله لوحده أول مرة). بيقارن الإصدارات اللي عندك بآخر إصدارات في Maven Central:

~~~text الناتج
[INFO] The following dependencies in Dependency Management have newer versions:
[INFO]   ch.qos.logback:logback-classic ....................... 1.5.38 -> 1.6.5
[INFO]   ch.qos.logback:logback-core .......................... 1.5.38 -> 1.6.5
[INFO]   com.fasterxml.jackson.core:jackson-annotations ....... 2.21 -> 3.0-rc5
~~~

خلي بالك: في مشروع Spring Boot القايمة طويلة جدًا، لأنه بيعدّ كل مكتبة في جدول الـ parent حتى اللي مش بتستخدمها، وبيعرض نسخ تجريبية زي [[3.0-rc5]] (rc = release candidate). الطريقة الصح للتحديث إنك ترفع نسخة Spring Boot نفسها في [[<parent>]]، مش كل مكتبة لوحدها.

---

## الخلاصة

| الأمر | زي في npm | بيعمل |
|---|---|---|
| [[./mvnw spring-boot:run]] | [[npm run dev]] | يشغّل من الكود |
| [[./mvnw test]] | [[npm test]] | compile + كل التستات |
| [[./mvnw test -Dtest=X]] | [[npm test -- X]] | تست class واحد |
| [[./mvnw clean package -DskipTests]] | [[npm run build]] | fat jar في [[target/]] |
| [[java -jar target/*.jar]] | [[node dist/index.js]] | تشغيل الإنتاج |
| [[./mvnw dependency:tree]] | [[npm ls --all]] | شجرة المكتبات |
| [[./mvnw versions:display-dependency-updates]] | [[npm outdated]] | الإصدارات الأحدث |

- phases ([[test]] و [[package]]) بتعدّي على كل اللي قبلها. goals ([[plugin:goal]]) بتعمل حاجة واحدة.
- استخدم [[./mvnw]] مش [[mvn]]، عشان كله يشتغل بنفس النسخة.`,
          lines: [
            "شغّل التطبيق وانت بتطوّر.",
            "شغّل كل التستات.",
            R`تست class واحد بس.`,
            R`امسح القديم واعمل jar من غير تستات (في Docker مثلًا بعد ما الـ CI اختبر).`,
            "شغّل الـ jar: ده كل اللي محتاجه السيرفر، Java بس.",
            "شجرة المكتبات ومين جاب مين.",
            "إيه المكتبات اللي ليها إصدارات أحدث."
          ],
          sol: R`الـ jar بيطلع في [[target/]] باسم [[artifactId-version.jar]]، وحجمه حوالي ٢٠ ميجا لمشروع فيه Spring Web بس (طلع 19M في تجربتنا على Boot 4.1.1)، وبيكبر مع كل starter، لأن فيه Tomcat و Spring وكل المكتبات. (هتلاقي كمان [[.jar.original]] صغير: ده كودك بس قبل الـ repackage.)

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
          teach: R`## الملف ده بيقول إيه؟

[[build.gradle.kts]] بيقول نفس اللي الـ [[pom.xml]] في الدرس اللي فات بيقوله، بس كود Kotlin بدل XML: الـ plugins، ونسخة Java، ومنين تتحمّل المكتبات، والمكتبات نفسها. [[.kts]] = Kotlin Script. جبنا مشروع «Gradle - Kotlin» من start.spring.io (فيه Spring Web و PostgreSQL Driver)، وحطينا الملف ده مكان اللي جه معاه (الفرق الوحيد إن بتاع الموقع فيه كمان [[version = "0.0.1-SNAPSHOT"]])، وشغّلناه بـ [[./gradlew]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25). الـ wrapper حمّل Gradle 9.7.1 لوحده.

---

## ١. الـ plugins

~~~kotlin
plugins {
    java
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
}
~~~

- [[plugins { ... }]]: block. في Kotlin DSL أي [[name { }]] معناها «نادي [[name]] واديها الكود اللي جوه الأقواس».
- [[java]]: plugin جوه Gradle نفسه: بيضيف tasks زي [[compileJava]] و [[test]] و [[jar]].
- [[id("org.springframework.boot") version "4.1.1"]]: plugin من برّه، بالـ id والنسخة. ده بيضيف [[bootRun]] (زي [[spring-boot:run]]) و [[bootJar]] (الـ fat jar).
- [[io.spring.dependency-management]]: بيقرا جدول الإصدارات (BOM) بتاع Spring Boot، فتكتب المكتبات من غير version. ده شغل الـ [[<parent>]] في Maven.

---

## ٢. الـ group و Java

~~~kotlin
group = "com.example"
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }
}
~~~

- [[group]]: زي [[groupId]]. واسم المشروع نفسه (زي [[artifactId]]) في ملف تاني اسمه [[settings.gradle.kts]]: [[rootProject.name = "tasks-api"]].
- [[toolchain]]: «اعمل compile بـ Java 25»، حتى لو Gradle نفسه شغال بـ JDK تاني. لو مفيش JDK 25 على الجهاز، Gradle بيقول. هنا الـ image فيها JDK 25 أصلًا.

---

## ٣. منين والمكتبات

~~~kotlin
repositories { mavenCentral() }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
~~~

- [[mavenCentral()]]: نفس الـ registry بتاع Maven. Gradle بيستخدم نفس المكتبات.
- كل مكتبة String واحد: [["group:artifact"]] (أو [["group:artifact:version"]]).
- الكلمة اللي قبلها اسمها **configuration**، ودي المقابل للـ scope:

| Gradle | Maven | متاحة فين |
|---|---|---|
| [[implementation]] | [[compile]] | الكود والتشغيل والتستات |
| [[runtimeOnly]] | [[runtime]] | التشغيل بس |
| [[testImplementation]] | [[test]] | كود التستات |
| [[testRuntimeOnly]] | [[test]] (وقت التشغيل) | تشغيل التستات بس |

- [[junit-platform-launcher]]: المكتبة اللي Gradle بيستخدمها عشان يلاقي التستات ويشغّلها. Gradle الحديث بيطلب إنك تضيفها بنفسك.

---

## ٤. التستات

~~~kotlin
tasks.withType<Test> { useJUnitPlatform() }
~~~

- [[tasks.withType<Test>]]: كل الـ tasks اللي نوعها [[Test]]. و [[<Test>]] هنا generic بتاع Kotlin، نفس فكرة Java.
- [[useJUnitPlatform()]]: شغّل التستات بـ JUnit 5 أو أحدث (Spring Boot 4 بيجيب JUnit 6).

---

## ٥. [[./gradlew bootJar]] مرتين

~~~bash
./gradlew bootJar
~~~

أول مرة (آخر سطور الناتج):

~~~text الناتج
Starting a Gradle Daemon (subsequent builds will be faster)
> Task :compileJava
> Task :processResources
> Task :classes
> Task :resolveMainClassName
> Task :bootJar

BUILD SUCCESSFUL in 2m 17s
4 actionable tasks: 4 executed
~~~

- [[Starting a Gradle Daemon]]: Gradle بيشغّل process في الخلفية يفضل شغال، عشان المرات الجاية ميبدأش من الصفر.
- كل [[> Task :name]] task اتنفذت بالترتيب: compile الكود، ونسخ [[resources]]، و [[classes]] (task بتجمع اللي قبلها)، وتحديد الـ main class، وعمل الـ jar.
- الدقيقتين معظمهم تحميل Gradle نفسه والمكتبات.

تاني مرة:

~~~text الناتج
> Task :compileJava UP-TO-DATE
> Task :processResources UP-TO-DATE
> Task :classes UP-TO-DATE
> Task :resolveMainClassName UP-TO-DATE
> Task :bootJar UP-TO-DATE

BUILD SUCCESSFUL in 3s
4 actionable tasks: 4 up-to-date
~~~

[[UP-TO-DATE]]: كل task عارفة مدخلاتها (الكود والمكتبات) ومخرجاتها، ومفيش حاجة اتغيرت، فمتعادتش. ده سبب إن Gradle أسرع في المشاريع الكبيرة. (Maven مع [[package]] بيعدّي على الـ phases كلها كل مرة.)

~~~text ls -lh build/libs (الحجم والاسم بس)
21M tasks-api.jar
~~~

الـ jar في [[build/libs/]] مش [[target/]]. والاسم [[tasks-api.jar]] من غير نسخة، لأننا شلنا سطر [[version]].

---

## ٦. شجرة المكتبات

~~~bash
./gradlew dependencies --configuration runtimeClasspath
~~~

[[runtimeClasspath]] = كل اللي هيبقى موجود وقت التشغيل ([[implementation]] + [[runtimeOnly]] ومكتباتهم). أول سطور:

~~~text الناتج
runtimeClasspath - Runtime classpath of source set 'main'.
+--- org.springframework.boot:spring-boot-starter-webmvc -> 4.1.1
|    +--- org.springframework.boot:spring-boot-starter:4.1.1
|    |    +--- org.springframework.boot:spring-boot-starter-logging:4.1.1
|    |    |    +--- ch.qos.logback:logback-classic:1.5.38
|    |    |    |    +--- ch.qos.logback:logback-core:1.5.38
|    |    |    |    \--- org.slf4j:slf4j-api:2.0.17 -> 2.0.18
~~~

| الرمز | معناه |
|---|---|
| [[-> 4.1.1]] بعد مكتبة من غير نسخة | الـ dependency-management اختار النسخة دي |
| [[2.0.17 -> 2.0.18]] | مكتبة طلبت 2.0.17، و Gradle اختار 2.0.18 لأن حد تاني طلبها (بياخد الأعلى) |
| [[(*)]] | المكتبة دي اتعرضت فوق بفروعها، فمش هيكررها |
| [[(c)]] | constraint: قيد على النسخة جاي من BOM، مش مكتبة اتطلبت |

لاحظ الفرق عن Maven: Gradle بياخد **أعلى** نسخة مطلوبة، و Maven بياخد **الأقرب** في الشجرة.

---

## الخلاصة

| Maven | Gradle (Kotlin DSL) |
|---|---|
| [[pom.xml]] | [[build.gradle.kts]] + [[settings.gradle.kts]] |
| [[<parent>]] | plugin [[io.spring.dependency-management]] |
| [[<java.version>]] | [[toolchain { languageVersion = ... }]] |
| [[<scope>test</scope>]] | [[testImplementation(...)]] |
| [[./mvnw spring-boot:run]] | [[./gradlew bootRun]] |
| [[./mvnw package]] | [[./gradlew bootJar]] |
| [[target/]] | [[build/libs/]] |
| [[dependency:tree]] | [[dependencies --configuration runtimeClasspath]] |

- [[UP-TO-DATE]] يعني Gradle مأعادش task مفيش حاجة اتغيرت فيها.
- [[build.gradle]] (Groovy) و [[build.gradle.kts]] (Kotlin) نفس الفكرة بكتابة مختلفة شوية.`,
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
    }
]);
