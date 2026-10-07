// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
          teach: R`## الكود ده بيعمل إيه؟

حتتين: إعدادات الاتصال بـ PostgreSQL في [[application.yaml]]، و class اسمه [[Task]] بيتحول لجدول [[task]]: كل object منه صف، وكل حقل عمود. Hibernate (تنفيذ JPA اللي Spring Boot بيستخدمه) هو اللي بيكتب الـ SQL.

اتجرّب في مشروع Spring Boot 4.1.1 فيه [[spring-boot-starter-data-jpa]] و driver [[postgresql]]، على JDK 25، مع [[postgres:18]] في Docker على نفس الـ network. الجدول نفسه اتعمل بـ Flyway (درس Flyway) والـ SQL بتاعه:

~~~sql
create table task (
  id bigserial primary key,
  title varchar(200) not null,
  done boolean not null default false,
  project_id bigint not null references project(id) on delete cascade,
  created_at timestamptz not null default now()
);
~~~

---

## ١. الاتصال: [[spring.datasource]]

~~~yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tasks
    username: app
    password: $__{DB_PASSWORD:secret}
~~~

- [[datasource]]: «مصدر الداتا»، يعني إعدادات الاتصال بالداتابيز.
- [[url]]: الـ JDBC URL (JDBC = Java Database Connectivity، الطريقة القياسية في Java للكلام مع الداتابيز). شكله [[jdbc:postgresql://host:port/database]]: [[localhost]] الجهاز، و [[5432]] بورت Postgres الافتراضي، و [[tasks]] اسم الداتابيز.
- [[username]] و [[password]]: والباسورد من env var [[DB_PASSWORD]]، و [[secret]] للتطوير بس.

Spring Boot شايف driver Postgres في الـ classpath، فبيعمل **connection pool** اسمه HikariCP: مجموعة connections مفتوحة جاهزة، كل request ياخد واحدة ويرجّعها، بدل ما يفتح connection جديدة كل مرة (بطيء). في لوج التشغيل:

~~~text اللوج
HikariPool-1 - Starting...
HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@58c42c8c
HikariPool-1 - Start completed.
~~~

> في Docker الداتابيز مش [[localhost]]، فبعتنا [[SPRING_DATASOURCE_URL=jdbc:postgresql://teach-spring03-db:5432/tasks]] كـ env var، وده غطّى على الـ yaml (درس الإعدادات).

---

## ٢. إعدادات JPA

~~~yaml
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
~~~

- [[jpa]]: إعدادات JPA (Jakarta Persistence API: المعيار، و Hibernate هو اللي بينفذه).
- [[open-in-view: false]]: Spring Boot افتراضيًا بيسيب الـ session بتاعة Hibernate مفتوحة لحد ما الـ response يتكتب، عشان أي lazy loading في الـ controller يشتغل. ده بيحجز connection طول الـ request ويخبّي مشاكل، فبنقفله. (ولو مكتبتهوش خالص، الـ docs بتقول إن Boot بيطبع WARN في أول اللوج بيقولك إنه مفتوح.)
- [[ddl-auto: validate]]: DDL = Data Definition Language (الـ [[CREATE TABLE]] و [[ALTER TABLE]]). [[validate]] يعني: متعدّلش الجداول خالص، بس اتأكد إن الـ entities مطابقة ليها، ولو لأ متقومش.

وقت التشغيل Hibernate بيطبع اللي اتوصل بيه:

~~~text اللوج
HHH000001: Hibernate ORM core version 7.4.5.Final
HHH10001005: Database info:
	Database JDBC URL [jdbc:postgresql://teach-spring03-db:5432/tasks]
	Database driver: PostgreSQL JDBC Driver
	Database dialect: PostgreSQLDialect
	Database version: 18.6
~~~

الـ **dialect**: «لهجة» الـ SQL. كل داتابيز ليها تفاصيل مختلفة، و Hibernate بيختار الصح لوحده.

---

## ٣. الـ entity

~~~java
@Entity
public class Task {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, length = 200) private String title;
  private boolean done;
  protected Task() {}
  public Task(String title) { this.title = title; }
}
~~~

كل annotation هنا من [[jakarta.persistence]]:

- [[@Entity]]: الـ class ده جدول. اسم الجدول من اسم الـ class: [[Task]] ← [[task]].
- [[@Id]]: الـ primary key.
- [[@GeneratedValue(strategy = GenerationType.IDENTITY)]]: الداتابيز هي اللي بتولّد الـ id ([[bigserial]] في Postgres). فوقت الـ insert الـ id مبيتبعتش، و Hibernate بياخده من الداتابيز بعدها.
- [[Long id]] مش [[long]]: قبل الحفظ مفيش id، والـ [[Long]] يقدر يبقى [[null]] (معناها «جديد، لسه متحفظش»).
- [[@Column(nullable = false, length = 200)]]: تفاصيل العمود: NOT NULL و [[varchar(200)]]. بيستخدمها Hibernate لو بيعمل الجداول، والـ validate بيقارن النوع.
- [[private boolean done;]]: من غير annotation خالص، بيبقى عمود [[done]] برضه. أي حقل في الـ entity عمود إلا لو قلت غير كده.
- [[protected Task() {}]]: constructor فاضي. Hibernate لما يقرا صف من الداتابيز بيعمل object فاضي بيه ويملا الحقول. [[protected]] عشان الكود بتاعك ميستخدموش ويعمل Task من غير عنوان.
- [[public Task(String title)]]: ده اللي انت بتستخدمه.

الأسماء بتتحول لوحدها من camelCase لـ snake_case: لو ضفت [[OffsetDateTime createdAt]] هيدوّر على عمود [[created_at]]. ده الـ select اللي Hibernate كتبه لـ [[findById]] في المشروع:

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
~~~

[[t1_0]] اسم مستعار (alias) Hibernate بيديه للجدول، و [[?]] مكان الباراميتر (بيتبعت لوحده، فمفيش SQL injection).

---

## ٤. الـ try: نغيّر اسم حقل

غيّرنا [[private String title;]] لـ [[private String name;]] في الـ entity، والجدول لسه فيه [[title]]:

~~~text اللوج
ERROR ... LocalContainerEntityManagerFactoryBean : Failed to initialize JPA EntityManagerFactory: Unable to build Hibernate SessionFactory  [persistence unit: default] ; nested exception is org.hibernate.tool.schema.spi.SchemaManagementException: Schema validation: missing column [name] in table [task]
ERROR ... o.s.boot.SpringApplication : Application run failed
~~~

التطبيق مقامش، والرسالة بتقول بالظبط: عمود [[name]] مش موجود في جدول [[task]]. الغلط بان على جهازك قبل ما يوصل لحد.

### ونفس التغيير مع [[ddl-auto: update]]

شغّلنا نفس الـ jar بـ [[SPRING_JPA_HIBERNATE_DDL_AUTO=update]]:

~~~text اللوج
DEBUG ... org.hibernate.SQL : alter table if exists task add column name varchar(200) not null
WARN  ... GenerationTarget encountered exception accepting command : Error executing DDL "alter table if exists task add column name varchar(200) not null" via JDBC [ERROR: column "name" of relation "task" contains null values]
INFO  ... Started TasksApplication in 11.954 seconds
~~~

- Hibernate **ضاف** عمود جديد [[name]]، ومحاولش يغيّر اسم [[title]] (هو ميعرفش إنك قصدك rename).
- الـ ALTER فشل لأن الجدول فيه صفوف، والعمود الجديد NOT NULL وفاضي.
- والأخطر: ده مجرد **WARN**، والتطبيق **قام عادي**. يعني الإنتاج شغال بـ entity مش مطابق للجدول، وأول insert هيقع.

وبعدها [[\d task]] في psql: الجدول زي ما هو، [[title]] بس، ومفيش [[name]].

| [[ddl-auto]] | بيعمل إيه | إمتى |
|---|---|---|
| [[validate]] | يقارن ويقع لو فيه فرق | مع Flyway، في كل حتة |
| [[none]] | ولا حاجة | مع Flyway برضه |
| [[update]] | يضيف اللي ناقص بس، ويكمّل لو فشل | تجارب سريعة على جهازك |
| [[create-drop]] | يعمل الجداول ويمسحها لما التطبيق يقفل | تستات وتجارب |

---

## الخلاصة

- [[spring.datasource.url]] و [[username]] و [[password]] كفاية، و Boot بيعمل HikariCP pool لوحده.
- [[@Entity]] و [[@Id]] و [[@GeneratedValue(IDENTITY)]] و [[@Column]]، و constructor فاضي [[protected]]، و [[Long]] للـ id.
- camelCase في Java = snake_case في الجدول.
- [[ddl-auto: validate]] بيوقف التطبيق لو الـ entity مش مطابق (رسالة [[Schema validation: missing column]])، و [[update]] بيحاول ويكمّل بـ WARN حتى لو فشل.
- [[open-in-view: false]] دايمًا.`,
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
          sol: R`مع [[validate]] والجدول مطابق: التطبيق بيقوم عادي. ولما تغيّر [[title]] لـ [[name]]: التطبيق مش بيقوم، والخطأ فيه [[Schema validation: missing column [name] in table [task]]]. ده بالظبط اللي عايزه: الغلط بان وقت البداية على جهازك.

مع [[update]] Hibernate بيحاول يضيف عمود [[name]] جديد جنب [[title]] القديم (مش بيغيّر الاسم): [[alter table if exists task add column name varchar(200) not null]]. ولأن الجدول فيه صفوف، الـ ALTER فشل بـ [[column "name" of relation "task" contains null values]]، بس ده طلع WARN والتطبيق قام عادي، بـ entity مش مطابق للجدول، وأول insert هيقع. في الإنتاج دي كارثة صغيرة محدش هياخد باله منها. الـ migrations بتخليك تكتب [[ALTER TABLE task RENAME COLUMN title TO name;]] بنفسك وتتراجع قبل ما تتنفذ.`
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
          teach: R`## الكود ده بيعمل إيه؟

اتنين interfaces من غير ولا سطر تنفيذ: [[TaskRepository]] و [[ProjectRepository]]. Spring Data JPA بيقرا أسامي الـ methods وقت التشغيل ويكتب الـ SQL بتاعها لوحده، وفوق ده بيدّيك CRUD جاهز ([[save]] و [[findById]] و [[deleteById]]...).

اتجرّب في مشروع Spring Boot 4.1.1 (JDK 25) مع PostgreSQL 18 في Docker، وفيه ٣ مشاريع و ٩ مهام من seed، و [[logging.level.org.hibernate.SQL: debug]] عشان كل SQL يظهر في اللوج.

---

## ١. الـ interface

~~~java
public interface TaskRepository extends JpaRepository<Task, Long> {
~~~

- [[interface]]: مفيش كود، أسامي methods بس. والتنفيذ بيعمله Spring Data وقت ما التطبيق يقوم (proxy).
- [[extends JpaRepository<Task, Long>]]: النوعين بين [[< >]] (generics): الأول نوع الـ entity، والتاني نوع الـ id بتاعه.
- مفيش [[@Repository]] ولا [[@Component]]: Spring Data بيلاقي أي interface بيورث [[JpaRepository]] لوحده. في اللوج:

~~~text اللوج
Bootstrapping Spring Data JPA repositories in DEFAULT mode.
Finished Spring Data repository scanning in 119 ms. Found 2 JPA repository interfaces.
~~~

بمجرد السطر ده عندك methods جاهزة، منها:

| الـ method | الـ SQL اللي اتكتب في المشروع |
|---|---|
| [[findById(1L)]] | [[select ... from task t1_0 where t1_0.id=?]] |
| [[existsById(2L)]] | [[select count(*) from task t1_0 where t1_0.id=?]] |
| [[deleteById(2L)]] | [[select ...]] للـ entity وبعدين [[delete from task where id=?]] |
| [[projects.findAll()]] | [[select p1_0.id,p1_0.name from project p1_0]] |

---

## ٢. derived query مع pagination

~~~java
  Page<Task> findByProjectIdAndDone(Long projectId, boolean done, Pageable pageable);
~~~

Spring Data بيقسم الاسم حتت:

| الحتة | معناها |
|---|---|
| [[find]] | SELECT |
| [[By]] | بعدها الشروط |
| [[ProjectId]] | حقل [[project]] ومنه [[id]]، يعني عمود [[project_id]] |
| [[And]] | AND |
| [[Done]] | حقل [[done]] |

والباراميترات بنفس الترتيب: [[projectId]] للشرط الأول و [[done]] للتاني.

- [[Pageable pageable]]: باراميتر خاص فيه رقم الصفحة وحجمها والترتيب. بيتعمل بـ [[PageRequest.of(page, size, sort)]].
- [[Page<Task>]]: الرجوع مش list بس: فيه العناصر، والعدد الكلي، وعدد الصفحات.

نادينا [[findByProjectIdAndDone(1L, false, PageRequest.of(0, 2, Sort.by("id").descending()))]] (أول صفحة، ٢ في الصفحة، بالـ id من الكبير للصغير):

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.project_id=? and t1_0.done=? order by t1_0.id desc fetch first ? rows only
select count(*) from task t1_0 where t1_0.project_id=? and t1_0.done=?
~~~

- [[order by t1_0.id desc]]: من الـ [[Sort]].
- [[fetch first ? rows only]]: ده نفس [[LIMIT]] بالصيغة القياسية في SQL، و Hibernate 7 بيكتبها كده. (احنا طلبنا أول صفحة بس، فمفيش offset. في الصفحات اللي بعدها بيتضاف offset.)
- الـ query التاني [[count(*)]]: عشان الـ [[Page]] يعرف العدد الكلي وعدد الصفحات. ده تمن [[Page]]: query زيادة. (حسب الـ docs [[Slice]] مبيعملوش.)

والنتيجة بعد ما حوّلناها لـ DTOs:

~~~text الناتج
{"total":2,"pages":1,"content":[{"id":3,"title":"Fix footer",...},{"id":1,"title":"Design home page",...}],"open":6}
~~~

---

## ٣. عدّ بشرط

~~~java
  long countByDoneFalse();
~~~

- [[count]] بدل [[find]]: بيرجع رقم.
- [[DoneFalse]]: الحقل [[done]] قيمته false، من غير باراميتر.

~~~text اللوج
select count(t1_0.id) from task t1_0 where t1_0.done=false
~~~

ورجّع [[6]] (المهام المفتوحة في الـ seed).

---

## ٤. [[@Query]] بـ JPQL

~~~java
  @Query("select t from Task t join fetch t.project where t.done = false")
  List<Task> findOpenWithProject();
}
~~~

- [[@Query]]: انت اللي بتكتب الـ query، والاسم بقى أي حاجة.
- JPQL (Jakarta Persistence Query Language) شبه SQL، بس بأسماء الـ **classes والحقول**: [[Task]] مش [[task]]، و [[t.project]] الحقل مش [[project_id]].
- [[select t from Task t]]: هات entities من نوع Task، و [[t]] اسم مستعار.
- [[join fetch t.project]]: وهات المشروع بتاع كل مهمة في نفس الـ query (درس N+1).
- آخر [[}]] بيقفل الـ interface.

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,p1_0.id,p1_0.name,t1_0.title from task t1_0 join project p1_0 on p1_0.id=t1_0.project_id where t1_0.done=false
~~~

query واحد فيه أعمدة الاتنين، بـ [[join]] عادي (inner).

---

## ٥. [[ProjectRepository]] و [[Optional]]

~~~java
public interface ProjectRepository extends JpaRepository<Project, Long> {
  Optional<Project> findByName(String name);
}
~~~

- [[findByName]]: [[where name = ?]].
- [[Optional<Project>]]: لأن ممكن ميلاقيش. ولو كتبت [[Project findByName]] هيرجع [[null]] لما ميلاقيش، و [[Optional]] بيجبرك تفكر في الحالة دي ([[isPresent()]] أو [[orElseThrow()]]).

السطر اللي في التعليق ([[// tasks.findByProjectIdAndDone(...)]]) هو نفس النداء اللي جربناه فوق.

---

## ٦. الـ try

### [[findByTitleContainingIgnoreCase]]

~~~java
List<Task> findByTitleContainingIgnoreCase(String part);
~~~

- [[Containing]]: [[LIKE '%part%']]. و [[IgnoreCase]]: من غير فرق بين الحروف الكبيرة والصغيرة.

عملنا [[GET /api/tasks/search?q=PAGE]] بينادي الـ method دي:

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where upper(t1_0.title) like upper(?) escape '\'
~~~

~~~text الرد
[{"id":1,"title":"Design home page","done":true,"project":"Website"}]
~~~

- [[upper(...) like upper(?)]]: الطرفين حروف كبيرة، فـ PAGE لقت page.
- الـ [[?]] Spring Data حط فيه [[%PAGE%]] لوحده.
- [[escape '\']]: لو المستخدم كتب [[%]] أو [[_]] في البحث، بيتهربوا بـ [[\]] فيتعاملوا كحروف عادية مش wildcards.

### الاسم الغلط [[findByTitel]]

~~~text اللوج
ERROR ... o.s.boot.SpringApplication : Application run failed
Caused by: org.springframework.data.repository.query.QueryCreationException: Cannot create query for method [TaskRepository.findByTitel(java.lang.String)]; No property 'titel' found for type 'Task'; Did you mean 'title'
~~~

التطبيق مقامش، والرسالة اقترحت الاسم الصح. الغلط بيتمسك وقت البداية مش وقت ما حد ينادي الـ method.

---

## الخلاصة

- [[interface X extends JpaRepository<Entity, IdType>]] = CRUD جاهز من غير تنفيذ.
- اسم الـ method هو الـ query: [[find]] أو [[count]] أو [[exists]]، وبعدها [[By]]، وبعدها حقول مع [[And]] و [[Or]] و [[Containing]] و [[IgnoreCase]] و [[True]] و [[False]].
- [[Pageable]] = ترتيب و [[fetch first ? rows only]]، و [[Page]] = query [[count(*)]] زيادة.
- [[@Query]] بـ JPQL بأسماء الـ classes والحقول، للحاجات اللي الاسم مش هيكفيها.
- اسم حقل غلط = التطبيق مش بيقوم، ومعاه [[Did you mean]].`,
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

[[select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where upper(t1_0.title) like upper(?) escape '\']]

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
          teach: R`## الكود ده بيعمل إيه؟

بيربط entity المشروع ([[Project]]) بالمهام ([[Task]]): كل مهمة ليها مشروع واحد، وكل مشروع فيه مهام كتير. في الداتابيز ده عمود واحد بس: [[task.project_id]] (foreign key). في Java بيبقى حقلين: [[Task.project]] و [[Project.tasks]]، وواحد بس منهم هو اللي بيتكتب في الداتابيز.

اتجرّب في مشروع Spring Boot 4.1.1 (Hibernate 7.4.5 و JDK 25) مع PostgreSQL 18 في Docker، والجداول من Flyway: [[project_id bigint not null references project(id) on delete cascade]].

---

## ١. [[Project]]: الحقول العادية

~~~java
@Entity
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String name;
~~~

زي درس [[@Entity]]: [[@Id]] و [[IDENTITY]] للـ [[bigserial]]. والجديد [[unique = true]]: العمود [[UNIQUE]] (مفيش مشروعين بنفس الاسم).

---

## ٢. [[@OneToMany]]: الناحية «المرآة»

~~~java
  @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Task> tasks = new ArrayList<>();
~~~

- [[@OneToMany]]: مشروع **واحد** ليه مهام **كتير**.
- [[mappedBy = "project"]]: العلاقة دي متعرّفة في الحقل اللي اسمه [[project]] جوه [[Task]]. يعني الـ list دي «مرآة»: Hibernate بيملاها وقت القراية بـ [[select ... from task where project_id=?]]، بس **مش بيبص عليها** وهو بيكتب [[project_id]].
- [[cascade = CascadeType.ALL]]: أي عملية على المشروع (حفظ، مسح...) تتعمل على مهامه كمان. احفظ مشروع جديد فيه مهام ← المهام تتحفظ.
- [[orphanRemoval = true]]: المهمة اللي تتشال من الـ list تبقى «يتيمة»، فـ Hibernate يمسحها من الداتابيز.
- [[= new ArrayList<>()]]: list فاضية من الأول، عشان [[getTasks().add(...)]] متضربش [[NullPointerException]] على مشروع جديد.

---

## ٣. الـ helper method

~~~java
  public void addTask(Task task) {
    tasks.add(task);
    task.setProject(this);
  }
}
~~~

- [[tasks.add(task)]]: الناحية المرآة (عشان الـ object في الذاكرة يبقى صح).
- [[task.setProject(this)]]: الناحية المالكة، **ودي اللي بتتكتب** في [[project_id]]. [[this]] = المشروع ده نفسه.

الاتنين مع بعض في method واحدة عشان محدش ينسى واحدة.

---

## ٤. [[Task]]: الناحية المالكة

~~~java
@Entity
public class Task {
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  private Project project;
}
~~~

(الـ [[Task]] فيه كمان [[id]] و [[title]] و [[done]] من الدرس اللي فات، شلناهم من المثال.)

- [[@ManyToOne]]: مهام **كتير** لمشروع **واحد**. دي الـ **owning side**: الناحية اللي فيها الـ foreign key.
- [[fetch = FetchType.LAZY]]: متجيبش المشروع مع المهمة، غير لما حد يستخدمه. الافتراضي لـ [[@ManyToOne]] هو [[EAGER]] (يجيبه دايمًا)، وده سبب queries زيادة في كل حتة.
- [[optional = false]]: لازم يبقى فيه مشروع.
- [[@JoinColumn(name = "project_id")]]: اسم العمود في جدول [[task]].

### LAZY في اللوج

لما جبنا مهمة بـ [[findById(1)]] وبعدين قرينا [[task.getProject().getName()]]:

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
~~~

الأول المهمة لوحدها (فيها [[project_id]] بس)، والتاني اتعمل **لحظة** ما لمسنا [[getName()]]. قبلها [[task.getProject()]] كان proxy: object فاضي فيه الـ id بس.

---

## ٥. الـ try الأولى: نضيف للـ list بس

عملنا method جوه [[@Transactional]] بتعمل كده (من غير [[setProject]]):

~~~java
Project p = projects.findById(1L).orElseThrow();
p.getTasks().add(new Task("orphan"));
projects.save(p);
~~~

~~~text اللوج
insert into task (done,project_id,title) values (?,?,?)
WARN ... SQLState: 23502
WARN ... ERROR: null value in column "project_id" of relation "task" violates not-null constraint
  Detail: Failing row contains (12, orphan, f, null, 2026-10-07 17:46:15.903555+00).
ERROR ... Request processing failed: org.springframework.dao.DataIntegrityViolationException: could not execute statement [ERROR: null value in column "project_id" ...]
~~~

اقراها كده:

1. الـ cascade شغال: حفظ المشروع حفظ المهمة الجديدة ([[insert into task]]).
2. بس [[project_id]] اتبعت [[null]]: Hibernate بص على [[task.project]] (الناحية المالكة) ولقاه [[null]]. الـ list ملهاش دعوة.
3. الداتابيز رفضت ([[23502]] كود PostgreSQL لـ not-null violation)، و Spring حوّلها لـ [[DataIntegrityViolationException]]، والرد 500.
4. [[Failing row contains (12, orphan, f, null, ...)]]: الصف اللي كان هيتحط، والـ [[null]] مكان [[project_id]].

الحل: [[project.addTask(task)]] اللي بتظبط الناحيتين.

---

## ٦. الـ try التانية: [[orphanRemoval]]

method جوه [[@Transactional]] بتشيل مهمة من الـ list بس:

~~~java
Project p = projects.findById(3L).orElseThrow();
p.getTasks().removeIf(t -> t.getId() == 7);
~~~

~~~text اللوج
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
select t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
delete from task where id=?
~~~

1. المشروع اتحمّل.
2. أول ما لمسنا [[getTasks()]]، الـ list اللي كانت lazy اتحمّلت.
3. وقت الـ commit، Hibernate لقى مهمة اتشالت من الـ list، ولأن [[orphanRemoval = true]]: [[delete]]. ومفيش [[save]] ولا [[delete]] في الكود.

ورجعنا بصينا في الجدول: المهمة ٧ مش موجودة.

---

## الخلاصة

| | [[@ManyToOne]] (في Task) | [[@OneToMany]] (في Project) |
|---|---|---|
| الدور | المالك: بيتكتب في [[project_id]] | مرآة: بتتملي وقت القراية |
| الـ annotation المهمة | [[@JoinColumn(name = "project_id")]] | [[mappedBy = "project"]] |
| الـ fetch | الافتراضي EAGER، اكتب [[LAZY]] دايمًا | الافتراضي LAZY |

- عدّل الناحيتين مع بعض بـ helper زي [[addTask]].
- [[cascade = ALL]]: الحفظ والمسح بيتنقلوا للأبناء. [[orphanRemoval]]: الشيل من الـ list = DELETE.
- LAZY = proxy فيه الـ id، والـ SELECT بيحصل أول ما تلمسه وانت جوه transaction.`,
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
            how: R`الـ lazy collection بتتحمّل أول مرة تلمسها، بـ SELECT لوحده. [[left join fetch]] بيعمل [[LEFT JOIN]] في SQL ويملا الـ collections من نفس النتيجة ([[join fetch]] من غير left بيبقى inner join، فالأب اللي ملوش أبناء مبيظهرش). [[distinct]] في JPQL عشان كل project ميتكررش مرة لكل task (في Hibernate 6+ ده بيحصل لوحده في الـ entities، بس كتابته بتوضح النية).

[[@EntityGraph]] نفس النتيجة من غير ما تكتب JPQL، ومفيد مع derived queries.

القيود: [[join fetch]] على collection مع pagination: Hibernate مش هيقدر يعمل LIMIT في SQL (لأن كل project بقى كذا صف)، فبيجيب كله ويقسّم في الذاكرة مع warning [[firstResult/maxResults specified with collection fetch; applying in memory]]. وجلب اتنين collections (bags) بـ join fetch في query واحد بيرمي [[MultipleBagFetchException]].

الحلول التانية: [[hibernate.default_batch_fetch_size]] (مثلًا 50) بيحوّل N queries لـ N/50 query بـ [[WHERE id IN (...)]]، ودا حل عام كويس. أو DTO projection: [[select new com.example.TaskRow(t.id, t.title, p.name) from Task t join t.project p]] بيجيب الأعمدة اللي محتاجها بس.`,
            when: R`كل endpoint بيرجع list وكل عنصر فيها بيعرض بيانات من علاقة. اتعوّد تبص على عدد الـ queries في اللوج لكل endpoint جديد، أو تكتب test بيعد الـ statements.`,
            mistakes: R`تحل N+1 بـ EAGER: هتجيب العلاقة في كل حتة حتى اللي مش محتاجاها، والـ N+1 بيفضل موجود في [[findAll]]. و [[join fetch]] مع [[Pageable]] على collection من غير ما تاخد بالك من الـ warning. وتفتكر إن N+1 بيحصل بس في الـ collections: [[task.getProject().getName()]] لكل task برضه N+1.`
          },
          teach: R`## الكود ده بيعمل إيه؟

method اتنين في [[ProjectRepository]] بيجيبوا المشاريع **ومعاها** مهامها في query واحد، بدل query للمشاريع + query لكل مشروع. والتعليقات تحت بتقارن الشكلين.

اتجرّب في مشروع Spring Boot 4.1.1 (Hibernate 7.4.5 و JDK 25) مع PostgreSQL 18 في Docker: ٣ مشاريع ومهامهم، و SQL logging شغال، و [[spring.jpa.properties.hibernate.generate_statistics: true]] عشان نعدّ الـ queries بالرقم.

---

## ١. المشكلة: N+1 في اللوج

السطر ده من التعليق (جوه method عليها [[@Transactional(readOnly = true)]]):

~~~java
projects.findAll().forEach(p -> p.getTasks().size());
~~~

- [[findAll()]]: هات كل المشاريع. الـ [[tasks]] بتاعة كل واحد **lazy**: لسه متحمّلتش.
- [[forEach(p -> ...)]]: لف على كل مشروع.
- [[p.getTasks().size()]]: أول ما تلمس الـ list، Hibernate لازم يحمّلها، فبيعمل query.

~~~text اللوج
select p1_0.id,p1_0.name from project p1_0
select t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
select t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
select t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
~~~

query واحد للمشاريع (ده الـ **1**)، وبعده واحد لكل مشروع (دول الـ **N**، و N هنا ٣). المجموع ٤. ومع ٥٠٠ مشروع: ٥٠١، وكل واحد رحلة للداتابيز.

وعدّيناهم بـ [[Statistics]] بتاعة Hibernate ([[emf.unwrap(SessionFactory.class).getStatistics()]]، و [[stats.getPrepareStatementCount()]] = عدد الـ SQL statements اللي اتجهزت):

~~~text GET /api/projects/queries?fetch=false
{"statements":4}
~~~

---

## ٢. الحل الأول: [[join fetch]] في [[@Query]]

~~~java
public interface ProjectRepository extends JpaRepository<Project, Long> {
  @Query("select distinct p from Project p left join fetch p.tasks")
  List<Project> findAllWithTasks();
~~~

افتح الـ JPQL حتة حتة:

| الحتة | معناها |
|---|---|
| [[select ... p from Project p]] | هات entities [[Project]]، و [[p]] اسم مستعار |
| [[left join]] | اربط بالمهام، وسيب المشروع حتى لو ملوش مهام (left) |
| [[fetch]] | واملا [[p.tasks]] من نفس النتيجة. من غيرها الـ join بيبقى للفلترة بس والـ list تفضل lazy |
| [[p.tasks]] | الحقل اللي في الـ entity، مش اسم جدول |
| [[distinct]] | كل مشروع مرة واحدة، مع إن الـ SQL بيرجّعه صف لكل مهمة |

~~~text اللوج
select distinct p1_0.id,p1_0.name,t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from project p1_0 left join task t1_0 on p1_0.id=t1_0.project_id
~~~

query واحد فيه أعمدة المشروع والمهمة جنب بعض: مشروع فيه ٣ مهام بيطلع ٣ صفوف، و Hibernate بيجمّعهم في object واحد list بتاعته فيها ٣.

~~~text GET /api/projects/queries?fetch=true
{"statements":1}
~~~

> [[left join fetch]] بيبقى [[left join]] في SQL. لو كتبت [[join fetch]] بس، بيبقى inner join، والمشاريع اللي ملهاش مهام مش هتظهر خالص (زي query [[findOpenWithProject]] في درس JpaRepository: هناك inner join مقصود).

---

## ٣. الحل التاني: [[@EntityGraph]]

~~~java
  @EntityGraph(attributePaths = "tasks")
  List<Project> findByNameContainingIgnoreCase(String part);
}
~~~

- derived query عادي (درس JpaRepository): مشاريع اسمها فيه [[part]].
- [[@EntityGraph(attributePaths = "tasks")]]: وهات معاها الحقل [[tasks]]. نفس فكرة [[join fetch]] من غير ما تكتب JPQL.

ناديناها بـ [[q=E]] ولفينا على المهام:

~~~text اللوج
select p1_0.id,p1_0.name,t1_0.project_id,t1_0.id,t1_0.created_at,t1_0.done,t1_0.title from project p1_0 left join task t1_0 on p1_0.id=t1_0.project_id where upper(p1_0.name) like upper(?) escape '\'
~~~

~~~text الرد
{"tasks":8,"projects":3,"statements":1}
~~~

٣ مشاريع و ٨ مهام في query واحد، وكمان [[left join]] لوحده.

---

## ٤. التعليقات في المثال

~~~java
// N+1:
//   projects.findAll().forEach(p -> p.getTasks().size());   ← 1 + N queries
// الحل:
//   projects.findAllWithTasks().forEach(p -> p.getTasks().size());   ← query واحد
~~~

نفس اللف بالظبط، الفرق في الـ method اللي جابت المشاريع: الأولى سابت [[tasks]] lazy، والتانية ملتها.

---

## ٥. ولو اللف برّه transaction؟

عملنا نفس اللف في method **من غير** [[@Transactional]] (و [[open-in-view: false]]):

~~~text اللوج
select p1_0.id,p1_0.name from project p1_0
... Request processing failed: org.hibernate.LazyInitializationException: Cannot lazily initialize collection of role 'com.example.tasks.Project.tasks' with key '1' (no session)
~~~

[[findAll()]] اشتغل في transaction قصيرة خاصة بيه وقفلها. ولما لمسنا [[getTasks()]] مكانش فيه session يحمّل منها، فبدل N+1 أخدنا exception و 500. يعني الـ lazy loading بيشتغل بس جوه transaction.

---

## الخلاصة

| | [[findAll()]] + لف | [[findAllWithTasks()]] | [[@EntityGraph]] |
|---|---|---|---|
| عدد الـ queries (٣ مشاريع) | 4 | 1 | 1 |
| الـ SQL | select لكل مشروع | [[left join]] واحد | [[left join]] واحد |
| تكتب JPQL؟ | لأ | أيوه | لأ |

- N+1 = query للقايمة + query لكل عنصر بيلمس علاقة lazy. بتشوفه في اللوج كسطور متكررة بنفس الشكل.
- [[left join fetch]] أو [[@EntityGraph]] بيجيبوا العلاقة في نفس الـ query.
- عدّ الـ queries ([[generate_statistics]] أو اللوج) لكل endpoint بيرجع list.`,
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
          teach: R`## الكود ده بيعمل إيه؟

الـ service بتاع المهام كامل: ٣ methods، وكل واحدة عليها [[@Transactional]]: قراية المهام المفتوحة، وإنشاء مهمة، وتعليم مهمة إنها خلصت. وكل method بتشتغل جوه transaction: يا كل اللي فيها يتحفظ، يا ولا حاجة.

اتجرّب في مشروع Spring Boot 4.1.1 (JDK 25) مع PostgreSQL 18 في Docker. وعشان نشوف الـ transactions نفسها، شغّلنا التطبيق بـ env var [[LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_ORM_JPA=debug]] (لوج [[JpaTransactionManager]])، ومعاه SQL logging.

---

## ١. الـ class والـ constructor

~~~java
@Service
public class TaskService {
  private final TaskRepository tasks;
  private final ProjectRepository projects;

  public TaskService(TaskRepository tasks, ProjectRepository projects) {
    this.tasks = tasks;
    this.projects = projects;
  }
~~~

- [[@Service]]: bean (زي [[@Component]]) والاسم بيقول إنه business logic.
- الـ repositories الاتنين بيتحقنوا في الـ constructor (درس beans و DI).

---

## ٢. قراية بس: [[readOnly = true]]

~~~java
  @Transactional(readOnly = true)
  public List<TaskResponse> open() {
    return tasks.findOpenWithProject().stream().map(TaskResponse::from).toList();
  }
~~~

- [[@Transactional(readOnly = true)]]: transaction للقراية. Hibernate مش بيحتفظ بنسخ للمقارنة (dirty checking) فبيوفر ذاكرة، ومش هيكتب UPDATE حتى لو غيّرت حاجة.
- [[findOpenWithProject()]]: query بـ [[join fetch]] (درس JpaRepository) بيجيب المهام ومشاريعها مرة واحدة.
- [[.map(TaskResponse::from)]]: كل entity بيتحول لـ DTO **جوه** الـ transaction. [[TaskResponse.from]] بيقرا [[getProject().getName()]]، ولو المشروع كان lazy ومتحمّلش، ده هيشتغل هنا لأن الـ session لسه مفتوحة.

---

## ٣. الإنشاء

~~~java
  @Transactional
  public TaskResponse create(CreateTaskRequest req) {
    Project project = projects.findById(req.projectId())
        .orElseThrow(() -> new NotFoundException("project", req.projectId()));
    Task task = new Task(req.title());
    project.addTask(task);
    tasks.save(task);
    return TaskResponse.from(task);
  }
~~~

- [[findById(...)]] بيرجع [[Optional<Project>]]، و [[.orElseThrow(() -> new NotFoundException(...))]]: لو فاضي، ارمي الـ exception دي. [[() -> ...]] lambda من غير باراميترات بتعمل الـ exception وقت الحاجة بس.
- [[new Task(req.title())]]: entity جديد، لسه مالوش id.
- [[project.addTask(task)]]: يظبط الناحيتين (درس العلاقات).
- [[tasks.save(task)]]: هنا **لازم** save، لأن الـ entity جديد ومحدش يعرفه. بيعمل [[INSERT]] وبعدها الـ id بيتملي.

~~~text اللوج (POST بـ projectId 3)
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
insert into task (done,project_id,title) values (?,?,?)
~~~

~~~text الرد
HTTP/1.1 201
Location: /api/tasks/10
{"id":10,"title":"Write docs","done":false,"project":"Backend"}
~~~

### ولو المشروع مش موجود: rollback

~~~text اللوج (POST بـ projectId 99)
Creating new transaction with name [com.example.tasks.TaskService.create]: PROPAGATION_REQUIRED,ISOLATION_DEFAULT
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
Initiating transaction rollback
Rolling back JPA transaction on EntityManager [SessionImpl(8383653<open>)]
Closing JPA EntityManager after transaction
~~~

[[NotFoundException]] طلعت من الـ method، وهي [[RuntimeException]]، فـ Spring عمل **rollback**. وبعدين الـ advice حوّلها لـ 404.

---

## ٤. التعديل من غير save: dirty checking

~~~java
  @Transactional
  public TaskResponse complete(long id) {
    Task task = tasks.findById(id).orElseThrow(() -> new NotFoundException("task", id));
    task.setDone(true);
    return TaskResponse.from(task);
  }
}
~~~

- [[findById(id)]]: الـ entity اتحمّل، و Hibernate حطه في الـ **persistence context** (ذاكرة الـ session لكل entity اتحمّل) ومعاه نسخة من قيمه الأصلية.
- [[task.setDone(true)]]: غيّرنا حقل في الـ object بس. مفيش [[save]].
- آخر [[}]] بيقفل الـ class.

ده اللوج كامل لـ [[PATCH /api/tasks/4/done]]:

~~~text اللوج
Creating new transaction with name [com.example.tasks.TaskService.complete]: PROPAGATION_REQUIRED,ISOLATION_DEFAULT
Opened new EntityManager [SessionImpl(1443984304<open>)] for JPA transaction
Participating in existing transaction
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
Initiating transaction commit
Committing JPA transaction on EntityManager [SessionImpl(1443984304<open>)]
update task set done=?,project_id=?,title=? where id=?
Closing JPA EntityManager after transaction
~~~

اقراه بالترتيب:

| السطر | اللي حصل |
|---|---|
| [[Creating new transaction with name ...complete]] | الـ proxy فتح transaction قبل ما الـ method تبدأ. [[PROPAGATION_REQUIRED]] = الافتراضي: لو مفيش transaction افتح واحدة |
| [[Opened new EntityManager]] | session جديدة (الـ EntityManager هو الـ session بتاعة Hibernate) |
| [[Participating in existing transaction]] | [[findById]] جوه الـ repository عليه [[@Transactional]] هو كمان، فانضم للي موجودة |
| [[select ... from task]] | [[findById]] |
| [[select ... from project]] | [[TaskResponse.from]] لمس [[getProject().getName()]] (lazy) |
| [[Committing ...]] ثم [[update task ...]] | وقت الـ commit، Hibernate قارن الـ entity بالنسخة الأصلية، لقى [[done]] اتغير، فكتب الـ UPDATE (flush) |
| [[Closing JPA EntityManager]] | الـ session اتقفلت |

ولاحظ إن الـ UPDATE فيه كل الأعمدة القابلة للتعديل ([[done]] و [[project_id]] و [[title]]) مش [[done]] بس: ده الافتراضي في Hibernate. و [[created_at]] مش فيه لأنه متعرّف [[updatable = false]] في الـ entity بتاعنا.

---

## ٥. الـ try: شيل [[@Transactional]] من [[complete]]

~~~text PATCH /api/tasks/3/done
HTTP/1.1 500
~~~

~~~text اللوج
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
ERROR ... Request processing failed: org.hibernate.LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session
~~~

~~~text psql بعدها
 id |   title    | done
----+------------+------
  3 | Fix footer | f
~~~

حصلت حاجتين:

1. [[findById]] اشتغل في transaction قصيرة بتاعته لوحده وقفلها، فالـ entity بقى **detached** (مش متابَع). [[setDone(true)]] غيّر الـ object في الذاكرة بس، ومفيش UPDATE: الـ [[done]] فضل [[f]] (false) في الداتابيز.
2. [[TaskResponse.from]] لمس [[getProject().getName()]]، والمشروع proxy lazy ([[Project#1]] = entity Project بالـ id 1)، ومفيش session يحمّل منها: [[LazyInitializationException ... no session]].

---

## الخلاصة

- [[@Transactional]] = Spring بيفتح transaction قبل الـ method ويعمل commit بعدها، أو rollback لو طلع RuntimeException.
- جوه الـ transaction: entity محمّل واتغير = UPDATE لوحده وقت الـ commit. [[save]] للـ entities الجديدة بس.
- [[readOnly = true]] للقراية، والتحويل لـ DTOs يتعمل جوه الـ transaction.
- من غير transaction: التعديلات بتضيع بهدوء، و lazy loading بيقع بـ [[LazyInitializationException]].`,
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
          sol: R`مع [[@Transactional]]: اللوج فيه [[update task set done=?,project_id=?,title=? where id=?]] بعد الـ select، من غير أي save. ده الـ dirty checking: Hibernate قارن الـ entity بالنسخة اللي حمّلها ولقى [[done]] اتغير.

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
          teach: R`## الكود ده بيعمل إيه؟

ملف SQL اسمه [[V1__init.sql]] في [[src/main/resources/db/migration]]، بيعمل جدولين ([[project]] و [[task]]) و index. Flyway بيشغّله **مرة واحدة** أول ما التطبيق يقوم على داتابيز فاضية، ويسجّل إنه اتنفذ، والمرات الجاية بيعدّيه.

اتجرّب في مشروع Spring Boot 4.1.1 فيه [[spring-boot-starter-flyway]] و [[flyway-database-postgresql]] (الاتنين بيتضافوا لوحدهم لو اخترت Flyway و PostgreSQL من start.spring.io)، على JDK 25 و [[postgres:18]] في Docker. وجنبه ملف تاني [[V2__seed.sql]] فيه ٣ مشاريع و ٩ مهام.

---

## ١. جدول المشاريع

~~~sql
create table project (
  id bigserial primary key,
  name varchar(100) not null unique
);
~~~

- [[bigserial]]: [[bigint]] (رقم ٦٤ bit) وبيتملي لوحده من sequence: ١ و ٢ و ٣... ده اللي [[GenerationType.IDENTITY]] في الـ entity متوقعه.
- [[primary key]]: مميز ومش null، وبيتعمله index لوحده.
- [[varchar(100) not null unique]]: نص لحد ١٠٠ حرف، لازم موجود، ومفيش اتنين زي بعض. نفس [[@Column(nullable = false, unique = true, length = 100)]] في الـ entity.

---

## ٢. جدول المهام

~~~sql
create table task (
  id bigserial primary key,
  title varchar(200) not null,
  done boolean not null default false,
  project_id bigint not null references project(id) on delete cascade,
  created_at timestamptz not null default now()
);
~~~

- [[done boolean not null default false]]: لو الـ insert مبعتش قيمة، تبقى false.
- [[project_id bigint not null]]: الـ foreign key، نفس نوع [[project.id]].
- [[references project(id)]]: لازم القيمة تبقى id موجود في [[project]]. مش هتقدر تعمل مهمة لمشروع ٩٩.
- [[on delete cascade]]: لو المشروع اتمسح، مهامه تتمسح معاه من الداتابيز نفسها.
- [[timestamptz]]: timestamp with time zone. Postgres بيخزّنه UTC ويحوّله حسب الـ timezone بتاع الـ connection، فمفيش لخبطة توقيت. و [[default now()]]: وقت الـ insert.

---

## ٣. الـ index

~~~sql
create index task_project_id_idx on task(project_id);
~~~

- [[create index <الاسم> on <الجدول>(<العمود>)]]: الاسم بتختاره، والعرف [[جدول_عمود_idx]].
- Postgres بيعمل index للـ primary key والـ unique لوحده، **بس مش للـ foreign key**. ومن غيره أي [[where project_id = ?]] (وده بيحصل في كل [[getTasks()]] وفي الـ [[on delete cascade]]) بيقرا الجدول كله.

بعد التشغيل، [[\d task]] في psql بيوري:

~~~text الناتج
Indexes:
    "task_pkey" PRIMARY KEY, btree (id)
    "task_project_id_idx" btree (project_id)
Foreign-key constraints:
    "task_project_id_fkey" FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
~~~

---

## ٤. اسم الملف هو الترتيب

| الحتة | في [[V1__init.sql]] |
|---|---|
| [[V]] | versioned: بيتنفذ مرة واحدة |
| [[1]] | رقم النسخة. Flyway بيرتّب بيه (1 ثم 2 ثم 3...) |
| [[__]] | **شرطتين** سفليتين بتفصلوا الرقم عن الوصف |
| [[init]] | الوصف، بيتسجّل في الـ history |
| [[.sql]] | الامتداد |

---

## ٥. أول تشغيل على داتابيز فاضية

~~~text اللوج
FlywayExecutor  : Database: jdbc:postgresql://teach-spring03-db:5432/tasks (PostgreSQL 18.6)
JdbcTableSchemaHistory : Schema history table "public"."flyway_schema_history" does not exist yet
DbValidate      : Successfully validated 2 migrations (execution time 00:00.034s)
JdbcTableSchemaHistory : Creating Schema History table "public"."flyway_schema_history" ...
DbMigrate       : Current version of schema "public": << Empty Schema >>
DbMigrate       : Migrating schema "public" to version "1 - init"
DbMigrate       : Migrating schema "public" to version "2 - seed"
DbMigrate       : Successfully applied 2 migrations to schema "public", now at version v2 (execution time 00:00.018s)
~~~

بالترتيب: اتصل، ملقاش جدول الـ history فعمله، الداتابيز فاضية، نفّذ V1 ثم V2. وده كله **قبل** ما Hibernate يبدأ ([[HHH000001: Hibernate ORM core version ...]] بييجي بعدها في اللوج)، فالـ [[ddl-auto: validate]] بيلاقي الجداول جاهزة.

وتاني تشغيل على نفس الداتابيز:

~~~text اللوج
DbMigrate : Schema "public" is up to date. No migration necessary.
~~~

---

## ٦. الـ try: جدول الـ history

~~~bash
docker exec teach-spring03-db psql -U app -d tasks -c "select version, description, success from flyway_schema_history"
~~~

(احنا شغّلنا [[psql]] جوه container الداتابيز بـ [[docker exec]]، و [[-U app]] اليوزر. على جهازك [[psql -d tasks -c "..."]] زي الـ try بالظبط.)

~~~text الناتج
 version | description | success
---------+-------------+---------
 1       | init        | t
 2       | seed        | t
(2 rows)
~~~

صف لكل migration: النسخة، والوصف من اسم الملف، و [[t]] (true) يعني نجح. وفيه أعمدة تانية منها [[checksum]]: رقم محسوب من محتوى الملف.

---

## ٧. الـ try: عدّلنا V1 بعد ما اتنفذ

غيّرنا [[varchar(100)]] لـ [[varchar(120)]] في [[V1__init.sql]]، وعملنا build وشغّلنا على نفس الداتابيز:

~~~text اللوج
Caused by: org.flywaydb.core.api.exception.FlywayValidateException: Validate failed: Migrations have failed validation
Migration checksum mismatch for migration version 1
-> Applied to database : -1615677739
-> Resolved locally    : -2134459798
Either revert the changes to the migration, or run repair to update the schema history.
~~~

- [[Applied to database]]: الـ checksum المتسجّل لما V1 اتنفذ.
- [[Resolved locally]]: الـ checksum بتاع الملف دلوقتي. مختلفين، يعني حد عدّل ملف اتنفذ.
- التطبيق مقامش. لأن الداتابيز فيها [[varchar(100)]] والملف بيقول 120، و Flyway مش هيسكت على الفرق ده.
- الحل اللي الرسالة بتقوله: رجّع الملف زي ما كان (وده اللي عملناه، فقام تاني عادي)، والتغيير الجديد يبقى في [[V3__...sql]] فيه [[alter table ...]].

---

## الخلاصة

- ملفات [[V<رقم>__<وصف>.sql]] في [[db/migration]]، وكل واحد بيتنفذ مرة بالترتيب، وقبل Hibernate.
- [[flyway_schema_history]] فيه اللي اتنفذ و checksum لكل ملف.
- الـ migration اللي اتنفذ ميتعدّلش: [[Migration checksum mismatch]] والتطبيق مش بيقوم. التغيير = ملف جديد.
- اعمل index لكل foreign key بإيدك.
- في Spring Boot 4: [[spring-boot-starter-flyway]] و [[flyway-database-postgresql]].`,
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
    }
]);
