// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
          teach: R`## الأوامر بتعمل إيه؟

بدل ما تفتح الموقع وتدوس بالماوس، أول أمر بيطلب نفس الـ zip من start.spring.io بـ [[curl]]. وبعدين تفكه، وتبص على الهيكل، وتشغّل. الـ [[curl]] اتشغّل من Git Bash على ويندوز، والباقي جوه [[maven:3.9-eclipse-temurin-25]] (JDK 25، وسطّبنا فيه [[unzip]] و [[tree]] لأنهم مش موجودين في الـ image).

---

## ١. [[curl]]: طلب المشروع

~~~bash
curl https://start.spring.io/starter.zip -d type=maven-project -d javaVersion=25 -d groupId=com.example -d artifactId=tasks-api -d dependencies=web,data-jpa,postgresql,validation,flyway,actuator -o tasks-api.zip
~~~

| الحتة | معناها |
|---|---|
| [[curl URL]] | اطلب الرابط ده |
| [[/starter.zip]] | الـ endpoint اللي بيرجّع المشروع كـ zip |
| [[-d key=value]] | (d = data) ابعت قيمة مع الطلب. وجود [[-d]] بيخلي الطلب POST |
| [[type=maven-project]] | Maven. والبديل [[gradle-project-kotlin]] أو [[gradle-project]] (Groovy) |
| [[javaVersion=25]] | نسخة Java |
| [[groupId]] و [[artifactId]] | إحداثيات مشروعك (درس pom.xml) |
| [[dependencies=...]] | الـ starters، مفصولين بفاصلة من غير مسافات |
| [[-o tasks-api.zip]] | (o = output) احفظ الرد في ملف بدل ما تطبعه |

الـ dependencies اللي اخترناها:

| الـ id | بيجيب |
|---|---|
| [[web]] | Spring MVC و Tomcat و Jackson: REST APIs |
| [[data-jpa]] | Spring Data JPA و Hibernate: الداتابيز بالـ objects |
| [[postgresql]] | الـ driver |
| [[validation]] | [[@NotBlank]] و [[@Email]] (Jakarta Validation) |
| [[flyway]] | migrations للداتابيز بملفات SQL |
| [[actuator]] | [[/actuator/health]] وغيره للمراقبة |

الملف اللي نزل: ١٥٧٦٨ بايت. ومن غير [[bootVersion]] الموقع بيختار آخر نسخة مستقرة، وهنا كانت Spring Boot 4.1.1.

---

## ٢. [[unzip ... && cd ...]]

~~~bash
unzip tasks-api.zip -d tasks-api && cd tasks-api
~~~

- [[unzip tasks-api.zip -d tasks-api]]: فك الـ zip في فولدر اسمه tasks-api (d = directory).
- [[&&]]: نفّذ اللي بعدها بس لو اللي قبلها نجح. لو الفك فشل، مش هتدخل فولدر مش موجود.

الملفات اللي طلعت:

~~~text الناتج
.gitattributes
.gitignore
.mvn/wrapper/maven-wrapper.properties
HELP.md
mvnw
mvnw.cmd
pom.xml
src/main/java/com/example/tasks_api/TasksApiApplication.java
src/main/resources/application.properties
src/test/java/com/example/tasks_api/TasksApiApplicationTests.java
~~~

| الملف | هو إيه |
|---|---|
| [[pom.xml]] | ملف المشروع (درس pom.xml) |
| [[mvnw]] و [[mvnw.cmd]] و [[.mvn/]] | الـ Maven wrapper للينكس والماك ولويندوز (درس mvnw) |
| [[HELP.md]] | روابط docs للـ starters اللي اخترتها |
| [[.gitignore]] | بيتجاهل [[target/]] وملفات الـ IDE |

---

## ٣. [[tree src]]

~~~bash
tree src
~~~

~~~text الناتج
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── tasks_api
│   │               └── TasksApiApplication.java
│   └── resources
│       ├── application.properties
│       ├── db
│       │   └── migration
│       ├── static
│       └── templates
└── test
    └── java
        └── com
            └── example
                └── tasks_api
                    └── TasksApiApplicationTests.java

16 directories, 3 files
~~~

- [[src/main/java]]: الكود. الـ package [[com.example.tasks_api]] جاي من groupId + artifactId، والشرطة اتحولت [[_]] لأن [[-]] مش مسموحة في أسماء packages. ولو عايز [[com.example.tasks]] ابعت [[-d packageName=com.example.tasks]].
- [[TasksApiApplication.java]]: الـ main class (الدرس الجاي).
- [[src/main/resources]]: الملفات اللي مش كود: [[application.properties]] (الإعدادات، وجواه سطر واحد [[spring.application.name=tasks-api]])، و [[db/migration]] اتعمل عشان اخترنا Flyway (هنا هتحط ملفات زي [[V1__init.sql]])، و [[static]] و [[templates]] لصفحات HTML لو احتجتها.
- [[src/test/java]]: التستات، وفيها تست جاهز [[contextLoads]] بيتأكد إن التطبيق بيقوم.
- لو [[tree]] مش موجود عندك: على ويندوز [[tree /f src]] في CMD، أو استخدم [[find src]].

---

## ٤. [[./mvnw spring-boot:run]]: وبيقع!

~~~bash
./mvnw spring-boot:run
~~~

بالـ dependencies دي التطبيق مش هيقوم. آخر الناتج:

~~~text الناتج
... Tomcat initialized with port 8080 (http)
... Exception encountered during context initialization - cancelling refresh attempt: ... Error creating bean with name 'dataSource' ... Failed to determine a suitable driver class

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class

Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).
~~~

نقراها:

- [[Description]]: Spring لقى JPA و Flyway فعايز DataSource (اتصال بداتابيز)، ومش لاقي [[url]] (عنوان الداتابيز).
- [[Reason]]: من غير url مش عارف يختار driver.
- [[Action]]: الحلول: داتابيز embedded (زي H2) في الـ classpath، أو تفعّل profile فيه الإعدادات.

يعني الـ auto-configuration شغال بالظبط زي ما المفروض (الدرس الجاي). الحل [[spring.datasource.url]] (درس الإعدادات و JPA)، أو starter [[docker-compose]] مع [[compose.yaml]] فيه postgres.

### ومشروع فيه Spring Web بس؟

عملنا مشروع بـ [[dependencies=web]]، وشغّلناه، وطلبنا [[/]]:

~~~text الناتج
... Tomcat started on port 8080 (http) with context path '/'
~~~

~~~bash
curl localhost:5945/
~~~

~~~text الناتج
{"timestamp":"2026-10-07T17:48:25.367Z","status":404,"error":"Not Found","path":"/"}
~~~

([[5945]] لأن بورت 8080 بتاع الـ container متوصّل بـ 5945 على الجهاز.) [[curl]] خد الـ 404 كـ JSON. والمتصفح بيطلب HTML، فبيشوف صفحة «Whitelabel Error Page». طلبناها زيه بـ [[curl -H "Accept: text/html" localhost:5945/]]:

~~~text الناتج
<html><body><h1>Whitelabel Error Page</h1><p>This application has no explicit mapping for /error, so you are seeing this as a fallback.</p>...
~~~

404 لأن مفيش controller لسه. ده طبيعي، ومعناه إن Tomcat شغال.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| مشروع جديد | start.spring.io أو [[curl https://start.spring.io/starter.zip -d ...]] |
| فكه | [[unzip ... -d folder]] |
| الهيكل | [[src/main/java]] و [[src/main/resources]] و [[src/test/java]] |
| شغّل | [[./mvnw spring-boot:run]] |

- كل starter بتختاره بيعمل auto-configuration، و JPA من غير داتابيز بيوقع التطبيق.
- الكود كله لازم تحت الـ package بتاع الـ main class.`,
          lines: [
            R`بيطلب zip من الموقع بالاختيارات: Maven و Java 25 والـ starters. (دي نفس اختيارات الواجهة.)`,
            "فك الملف وادخل الفولدر.",
            "شوف الهيكل.",
            "شغّل. بالـ dependencies دي هيقع بـ «Failed to configure a DataSource» لحد ما تدّيله عنوان داتابيز (شوف الحل)."
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
          teach: R`## الكلاس ده بيعمل إيه؟

ده كل اللي محتاجه عشان تطبيق Spring Boot يقوم: class عليه annotation واحدة، و [[main]] فيها سطر واحد. السطر ده بيعمل الـ objects كلها، ويشغّل Tomcat، ويوصّل الحاجات ببعض. حطيناه بالظبط في مشروع من start.spring.io (Spring Web بس، Spring Boot 4.1.1)، وشغّلناه بـ [[java -jar]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ package

~~~java
package com.example.tasks;
~~~

- [[package]]: «الكلاس ده في الفولدر [[com/example/tasks]]». أسماء الـ packages عادة الدومين بالعكس ([[example.com]] ← [[com.example]]) وبعده اسم المشروع.
- ده **أهم سطر** في الملف: Spring بيدوّر على الكلاسات بتاعتك في الـ package ده وكل اللي تحته بس. أي controller في [[com.example.other]] مش هيتشاف.

---

## ٢. الـ imports

~~~java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
~~~

[[SpringApplication]]: الكلاس اللي بيشغّل كل حاجة. و [[SpringBootApplication]]: الـ annotation. لاحظ إن الـ annotation في package اسمه [[autoconfigure]].

---

## ٣. [[@SpringBootApplication]]

~~~java
@SpringBootApplication
public class TasksApplication {
~~~

الـ [[@]] قبل الاسم معناها annotation: علامة على الكلاس بيقراها Spring. والـ annotation دي ٣ في واحدة:

| جواها | بتقول لـ Spring |
|---|---|
| [[@SpringBootConfiguration]] (نوع من [[@Configuration]]) | الكلاس ده ممكن يعرّف beans بـ [[@Bean]] (درس beans و DI) |
| [[@ComponentScan]] | دوّر في الـ package ده وتحته على كلاسات عليها [[@Component]] و [[@Service]] و [[@RestController]]... واعمل منهم objects |
| [[@EnableAutoConfiguration]] | شغّل الـ auto-configuration: اعمل الحاجات المعتادة حسب المكتبات الموجودة |

---

## ٤. [[main]]

~~~java
  public static void main(String[] args) {
    SpringApplication.run(TasksApplication.class, args);
  }
}
~~~

- [[public static void main(String[] args)]]: نقطة البداية العادية في أي برنامج Java. [[args]] الـ arguments اللي بتتكتب بعد اسم البرنامج.
- [[TasksApplication.class]]: الـ class نفسه كـ object. Spring بيبص على الـ annotations اللي عليه وعلى الـ package بتاعه، عشان يعرف يبدأ منين.
- [[args]]: بيتبعتوا لـ Spring، فـ [[--server.port=9090]] أو [[--debug]] بيوصلوا.

[[SpringApplication.run]] بيعمل بالترتيب:

1. يقرا الإعدادات ([[application.properties]] والـ args والـ environment variables).
2. يعمل الـ **ApplicationContext**: الحاوية اللي فيها كل الـ beans (الـ objects اللي Spring بيديرها).
3. الـ component scan: يلاقي كلاساتك ويسجّلها.
4. الـ auto-configurations: يقيّم شروط كل واحدة ويشغّل اللي اتحققت.
5. يعمل الـ beans ويوصّلهم ببعض، ويشغّل Tomcat.

الناتج:

~~~text الناتج
 :: Spring Boot ::                (v4.1.1)
... Starting TasksApplication v0.0.1-SNAPSHOT using Java 25.0.4.1 with PID 1
... No active profile set, falling back to 1 default profile: "default"
... Tomcat initialized with port 8080 (http)
... Starting Servlet engine: [Apache Tomcat/11.0.24]
... Root WebApplicationContext: initialization completed in 2119 ms
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 3.942 seconds (process running for 5.062)
~~~

إحنا مكتبناش ولا سطر عن Tomcat. الـ auto-configuration لقى Tomcat في الـ classpath (جاي مع starter الويب) فشغّله. و [[run]] مبترجعش: البرنامج بيفضل شغال طول ما Tomcat شغال.

---

## ٥. «ليه اشتغل؟»: [[--debug]]

~~~bash
java -jar target/tasks-api-0.0.1-SNAPSHOT.jar --debug
~~~

[[--debug]] بيطبع تقرير اسمه CONDITIONS EVALUATION REPORT، فيه كل auto-configuration واتشغّلت ولا لأ وليه:

~~~text الناتج
CONDITIONS EVALUATION REPORT
============================

Positive matches:
-----------------

   AopAutoConfiguration matched:
   ...
   DispatcherServletAutoConfiguration matched:
      - @ConditionalOnClass found required class 'org.springframework.web.servlet.DispatcherServlet' (OnClassCondition)
      - found 'session' scope (OnWebApplicationCondition)
   ...
   TomcatServletWebServerAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'jakarta.servlet.ServletRequest', 'org.apache.catalina.startup.Tomcat', ...
~~~

| الشرط | معناه |
|---|---|
| [[@ConditionalOnClass]] | اشتغل لو الـ class ده موجود في الـ classpath (يعني المكتبة موجودة) |
| [[OnWebApplicationCondition]] | اشتغل لو ده تطبيق ويب ([[session]] scope موجود بس في تطبيقات الويب) |
| [[@ConditionalOnMissingBean]] | اشتغل لو انت معرّفتش bean من النوع ده بنفسك |
| [[@ConditionalOnProperty]] | اشتغل لو إعداد معين قيمته كذا |

والـ Negative matches: اللي ماشتغلتش وليه. مثلًا:

~~~text الناتج
Negative matches:
-----------------

   AopAutoConfiguration.AspectJAutoProxyingConfiguration:
      Did not match:
         - @ConditionalOnClass did not find required class 'org.aspectj.weaver.Advice' (OnClassCondition)
~~~

مكتبة AspectJ مش موجودة، فالجزء ده متعملش.

### Spring بيجيب القايمة دي منين؟

كل jar فيه auto-configurations فيه ملف [[META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports]]، وفيه أسماء الكلاسات سطر سطر. فتحنا اللي في [[spring-boot-webmvc-4.1.1.jar]]:

~~~text الناتج
org.springframework.boot.webmvc.autoconfigure.DispatcherServletAutoConfiguration
org.springframework.boot.webmvc.autoconfigure.WebMvcAutoConfiguration
org.springframework.boot.webmvc.autoconfigure.WebMvcObservationAutoConfiguration
...
~~~

في Spring Boot 4 كل تقنية في jar لوحدها ([[spring-boot-webmvc]] و [[spring-boot-tomcat]] و [[spring-boot-jackson]]...)، وكل واحد معاه الملف ده. عشان كده في مشروع Web بس، [[DataSourceAutoConfiguration]] مش موجودة في التقرير خالص (بحثنا عنها: صفر مرات): الـ jar بتاعها مش في المشروع أصلًا.

وفي المشروع اللي فيه JPA (اتشغّل بـ [[./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug]]، وده الشكل لما تشغّل من Maven):

~~~text الناتج
   DataSourceAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'javax.sql.DataSource', 'org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType' (OnClassCondition)
      - @ConditionalOnMissingBean (types: io.r2dbc.spi.ConnectionFactory; SearchStrategy: all) did not find any beans (OnBeanCondition)
~~~

الشرطين اتحققوا: المكتبات موجودة، ومفيش bean بتاع R2DBC (داتابيز reactive). فحاول يعمل DataSource، ووقع لأن مفيش url (درس start.spring.io).

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[package com.example.tasks]] | الـ scan بيبدأ من هنا ولتحت |
| [[@SpringBootApplication]] | configuration + component scan + auto-configuration |
| [[SpringApplication.run(X.class, args)]] | يعمل الـ context والـ beans ويشغّل Tomcat |
| [[--debug]] | تقرير الشروط: Positive و Negative matches |
| [[@ConditionalOn...]] | الشروط اللي كل auto-configuration مستنياها |

- الـ main class في أعلى package، وكل الكود تحته.
- أي bean بتعرّفه بنفسك بيكسب على الافتراضي ([[@ConditionalOnMissingBean]]).`,
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
          teach: R`## الكود بيعمل إيه؟

٣ classes: [[AppConfig]] بيعرّف ساعة ([[Clock]])، و [[GreetingService]] بتستخدم الساعة عشان تقول صباح الخير أو مساء الخير، و [[HelloController]] بيرد على [[GET /hello]] بالرسالة. ولا واحد فيهم بيعمل [[new]] للتاني: Spring هو اللي بيعمل الـ ٣ ويوصّلهم.

اتجرّب كده: كل class في ملف لوحده في [[com.example.tasks]] (جنب [[TasksApplication]] من الدرس اللي فات)، في مشروع Spring Web بس على Spring Boot 4.1.1، واتشغّل في [[maven:3.9-eclipse-temurin-25]] (JDK 25) والبورت 8080 متوصّل بـ 5945 على الجهاز.

> المثال مكتوب من غير [[package]] و [[import]] عشان يبقى قصير. في الملفات الحقيقية كل ملف أوله [[package com.example.tasks;]] وبعده الـ imports: [[java.time.Clock]] و [[java.time.LocalTime]]، و [[org.springframework.context.annotation.Bean]] و [[Configuration]]، و [[org.springframework.stereotype.Service]]، و [[org.springframework.web.bind.annotation.GetMapping]] و [[RequestParam]] و [[RestController]]. الـ IDE بيضيفهم لوحده.

---

## ١. [[AppConfig]]: bean من مكتبة مش بتاعتك

~~~java
@Configuration
public class AppConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
~~~

- [[@Configuration]]: «الكلاس ده فيه تعريفات beans». الـ component scan بيلاقيه زي أي component.
- [[@Bean]] على method: Spring بينادي الـ method دي مرة واحدة وقت البداية، والـ object اللي بترجعه بيتسجّل كـ bean. النوع [[Clock]] واسمه [[clock]] (اسم الـ method).
- ليه [[@Bean]] مش [[@Component]]؟ لأن [[Clock]] class من Java نفسها، مش هتقدر تحط عليه annotation. فبتقول لـ Spring «اعمله كده».
- [[Clock.systemUTC()]]: ساعة حقيقية بتوقيت UTC (توقيت جرينتش، مصر +3 في الصيف).

---

## ٢. [[GreetingService]]: بيطلب اللي محتاجه

~~~java
@Service
public class GreetingService {
    private final Clock clock;

    public GreetingService(Clock clock) {
        this.clock = clock;
    }
~~~

- [[@Service]]: «اعمل object من الكلاس ده وسجّله كـ bean». هو [[@Component]] بالظبط، بس الاسم بيقول إنه business logic.
- [[private final Clock clock]]: الـ dependency. [[final]] لأنها بتتحط مرة واحدة ومبتتغيرش.
- الـ constructor بياخد [[Clock]]: ده **الطلب**. Spring وهو بيعمل [[GreetingService]] بيشوف إنها محتاجة Clock، يدوّر على bean من النوع ده، يلاقي اللي [[AppConfig]] عرّفه، ويبعته. ده اسمه **constructor injection**.
- مفيش [[@Autowired]]: لو الكلاس فيه constructor واحد، Spring بيستخدمه لوحده.

~~~java
    public String greet(String name) {
        int hour = LocalTime.now(clock).getHour();
        return (hour < 12 ? "Good morning, " : "Good evening, ") + name;
    }
}
~~~

- [[LocalTime.now(clock)]]: الوقت دلوقتي **حسب الساعة دي**. لو كتبت [[LocalTime.now()]] من غير باراميتر، هتاخد ساعة الجهاز ومش هتقدر تغيّرها في التست.
- [[.getHour()]]: الساعة من 0 لـ 23.
- [[hour < 12 ? A : B]]: الـ ternary زي JS: لو الشرط صح A وإلا B.

---

## ٣. [[HelloController]]: الـ HTTP

~~~java
@RestController
public class HelloController {
    private final GreetingService greetings;

    public HelloController(GreetingService greetings) {
        this.greetings = greetings;
    }
~~~

- [[@RestController]]: bean كمان، والـ methods بتاعته بترد على HTTP، واللي بترجعه بيبقى body الـ response (String كده زي ما هو، و object بيتحول JSON).
- نفس الحكاية: الـ constructor بيطلب [[GreetingService]]، و Spring بيبعت الـ bean اللي عمله.

ترتيب البناء اللي Spring بيعمله لوحده (حسب مين محتاج مين):

~~~text مين محتاج مين
Clock            (من AppConfig.clock())
  └── GreetingService(clock)
        └── HelloController(greetings)
~~~

~~~java
    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "world") String name) {
        return greetings.greet(name);
    }
}
~~~

- [[@GetMapping("/hello")]]: أي [[GET /hello]] يروح للـ method دي.
- [[@RequestParam]]: الباراميتر [[name]] جاي من الـ query string ([[?name=Sara]]). و [[defaultValue = "world"]]: لو مش موجود خده [["world"]] بدل ما يرجع 400.
- الـ controller مش بيعمل أي logic: بيسلّم الشغل للـ service.

---

## ٤. التشغيل

~~~bash
curl -i "localhost:5945/hello?name=Sara"
~~~

~~~text الناتج
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 18
Date: Wed, 07 Oct 2026 17:48:25 GMT

Good evening, Sara
~~~

- [[-i]]: اطبع الـ headers كمان.
- [[text/plain]]: لأن الـ method رجّعت String.
- [[Good evening]]: الطلب اتعمل الساعة 17:48 بتوقيت UTC، يعني 17 مش أقل من 12.

~~~bash
curl "localhost:5945/hello"
~~~

~~~text الناتج
Good evening, world
~~~

الـ [[defaultValue]] اشتغل.

---

## ٥. لو شلت [[@Service]]

كتبنا [[// @Service]] (يعني بقت comment) وشغّلنا:

~~~text الناتج
***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of constructor in com.example.tasks.HelloController required a bean of type 'com.example.tasks.GreetingService' that could not be found.


Action:

Consider defining a bean of type 'com.example.tasks.GreetingService' in your configuration.
~~~

- [[Parameter 0 of constructor in ...HelloController]]: أول باراميتر (العدّ من صفر) في constructor الـ controller.
- [[required a bean of type ... that could not be found]]: محتاج GreetingService، ومفيش bean منها: من غير [[@Service]] الـ scan عدّى عليها ومعملهاش.
- التطبيق **مقامش خالص**. ده كويس: الغلطة بتبان أول ما تشغّل، مش لما request يوصل.

---

## ٦. الحل: تست من غير Spring

~~~java
import static org.assertj.core.api.Assertions.assertThat;

import java.time.*;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void morningGreeting() {
        Clock nineAm = Clock.fixed(Instant.parse("2026-09-30T09:00:00Z"), ZoneOffset.UTC);
        var service = new GreetingService(nineAm);
        assertThat(service.greet("Sara")).isEqualTo("Good morning, Sara");
    }
}
~~~

- [[import static ...assertThat]]: [[static]] import بيخليك تكتب [[assertThat(...)]] من غير اسم الكلاس قبلها. و AssertJ مكتبة جاية مع starter التست.
- [[@Test]]: JUnit هيشغّل الـ method دي كتست. (التست مكانه [[src/test/java/com/example/tasks/]] وأوله [[package com.example.tasks;]] زي الكلاس اللي بيختبره.)
- [[Instant.parse("2026-09-30T09:00:00Z")]]: لحظة معينة. الـ [[Z]] في الآخر يعني UTC.
- [[Clock.fixed(instant, ZoneOffset.UTC)]]: ساعة **واقفة** على اللحظة دي دايمًا.
- [[new GreetingService(nineAm)]]: هنا احنا اللي بنعمل [[new]] وبنبعت الساعة الوهمية. مفيش Spring خالص.
- [[assertThat(x).isEqualTo(y)]]: لو x مش y التست يفشل.

جوه [[./mvnw test]]:

~~~text الناتج
[INFO] Running com.example.tasks.GreetingServiceTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.458 s -- in com.example.tasks.GreetingServiceTest
~~~

أقل من نص ثانية، مقابل ٩ ثواني للتست اللي بيشغّل Spring كله ([[TasksApplicationTests]]). ده مكسب الـ constructor injection: الكلاس مش عارف ولا مهتم مين اللي بيبعتله الساعة.

---

## الخلاصة

| الطريقة | إمتى |
|---|---|
| [[@Service]] و [[@Component]] و [[@Repository]] و [[@RestController]] على الكلاس | كلاساتك انت |
| [[@Bean]] على method جوه [[@Configuration]] | objects من مكتبات تانية أو محتاجة إعداد |
| constructor فيه الـ dependencies | الطريقة الصح للحقن، والحقول [[final]] |

- Spring بيعمل كل bean مرة واحدة (singleton) ويبعته لكل اللي طالبه.
- لو bean مطلوب ومش موجود، التطبيق مش بيقوم، والرسالة بتقولك مين طلب إيه.
- في التست ابعت fake بنفسك بـ [[new]].`,
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
    }
]);
