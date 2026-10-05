// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
]);
