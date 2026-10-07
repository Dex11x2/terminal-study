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
          teach: R`## التست ده بيعمل إيه؟

بيختبر [[TaskService]] (اللي كتبناه في درس [[@Transactional]]) **لوحده**: من غير Spring، ومن غير داتابيز. الـ repositories اللي الـ service محتاجها بنحط مكانها objects وهمية (mocks) إحنا اللي بنقولها ترد بإيه. فالتست بيقيس منطق الـ service بس: لو المشروع موجود، المهمة بتتضاف له؟ ولو مش موجود، بيرمي الـ exception الصح؟

كل اللي تحت اتشغّل فعلًا: مشروع Spring Boot 4.1.1 من start.spring.io، جوه Docker على [[maven:3.9-eclipse-temurin-25]] (Java 25)، بأمر [[mvn test]]. والمكتبات اللي نزلت مع [[spring-boot-starter-test]]: JUnit Jupiter 6.0.3، و Mockito 5.23.0، و AssertJ 3.27.7.

---

## ١. الـ imports اللي المثال مش كاتبها

المثال جوه الدرس من غير imports عشان يبقى قصير، بس الملف الحقيقي لازم يبدأ بيهم:

~~~text TaskServiceTest.java (أوله)
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
~~~

- [[import static]]: بيجيب الـ methods الـ static نفسها، فتكتب [[assertThat(...)]] و [[when(...)]] و [[verify(...)]] على طول بدل [[Assertions.assertThat(...)]] و [[Mockito.when(...)]].
- [[org.junit.jupiter]]: ده JUnit الحديث (اسمه Jupiter). و [[org.mockito]] و [[org.assertj]] مكتبتين تانيين جايين مع نفس الـ starter.
- الملف في [[src/test/java/com/example/tasks/]]، نفس الـ package بتاع الـ service، فالتست يقدر يشوف أي method مش public فيه (package-private).

---

## ٢. [[@ExtendWith(MockitoExtension.class)]]

~~~text السطر
@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
~~~

- [[@ExtendWith]]: بتقول لـ JUnit «شغّل الإضافة دي مع كل تست في الـ class».
- [[MockitoExtension]]: الإضافة دي قبل **كل** تست بتعمل mocks جديدة للحقول اللي عليها [[@Mock]]، وبعدين تبني الـ service. وبعد كل تست بتفحص إن مفيش stubbing ملوش لازمة (هتشوف ده في الآخر).
- [[MockitoExtension.class]]: الـ [[.class]] معناها «الـ class نفسه كـ object»، مش object منه.
- الـ class مش [[public]]: JUnit 5 وما بعده مش محتاجها public.

---

## ٣. الحقول: [[@Mock]] و [[@InjectMocks]]

~~~text السطور
  @Mock TaskRepository tasks;
  @Mock ProjectRepository projects;
  @InjectMocks TaskService service;
~~~

- [[@Mock TaskRepository tasks]]: Mockito بيعمل object من نوع [[TaskRepository]] كل methods بتاعته فاضية. لو ناديت عليه حاجة من غير ما تقوله يرد بإيه، بيرجع قيمة «فاضية»: [[null]] للـ objects، و [[0]] للأرقام، و [[Optional.empty()]] للـ Optional، و list فاضية للـ lists.
- [[@InjectMocks TaskService service]]: ده الـ service **الحقيقي**. Mockito بيدوّر على الـ constructor بتاعه ([[TaskService(TaskRepository tasks, ProjectRepository projects)]]) ويناديه بالـ mocks اللي فوق. يعني كأنه كتب:

~~~text اللي بيحصل من ورا
service = new TaskService(tasks, projects);
~~~

ده سبب إن constructor injection مريح في التستات: مفيش Spring، والـ class بيتعمل بـ [[new]] عادي.

---

## ٤. التست الأول: [[createsTaskInsideProject]]

~~~text التست
  @Test
  void createsTaskInsideProject() {
    Project website = new Project("Website");
    when(projects.findById(1L)).thenReturn(Optional.of(website));

    var res = service.create(new CreateTaskRequest("Write docs", 1L));

    assertThat(res.project()).isEqualTo("Website");
    assertThat(website.getTasks()).hasSize(1);
    verify(tasks).save(website.getTasks().get(0));
  }
~~~

- [[@Test]]: «الـ method دي تست، شغّلها». و [[void]] لأن التست مبيرجعش حاجة: لو خلص من غير exception يبقى نجح.
- الاسم بيوصف السلوك ([[createsTaskInsideProject]] = «بيعمل المهمة جوه المشروع»)، عشان لما يقع تعرف إيه اللي باظ من الاسم.

التست متقسم ٣ حتت بسطر فاضي بينهم، والتقسيمة دي اسمها **Arrange / Act / Assert**:

### Arrange: جهّز

- [[new Project("Website")]]: entity حقيقي بـ [[new]]، مش mock. الـ entities objects عادية، ومفيش سبب نزيّفها.
- [[1L]]: الـ [[L]] معناها الرقم [[long]] مش [[int]]، لأن [[findById]] بياخد [[Long]].
- [[when(projects.findById(1L)).thenReturn(Optional.of(website))]]: نقراها من جوه لبرة:
  - [[projects.findById(1L)]]: نداء على الـ mock (بيرجع [[Optional.empty()]] دلوقتي، بس Mockito بيسجّل إنه النداء الأخير).
  - [[when(...)]]: «لما النداء ده يحصل بالـ argument ده بالظبط...»
  - [[.thenReturn(Optional.of(website))]]: «...رجّع المشروع ده». و [[Optional.of]] بيلف القيمة في Optional لأن الـ method بترجع [[Optional<Project>]].
  - ده اسمه **stubbing**: بتحدد رد الـ mock. ولو اتنادى بـ [[2L]] هيرجع [[Optional.empty()]] لأنك محددتش.

### Act: نفّذ

- [[service.create(new CreateTaskRequest("Write docs", 1L))]]: النداء الحقيقي. جوه الـ service: [[findById(1L)]] رجّعت المشروع، فبيعمل [[new Task("Write docs")]] ويضيفها بـ [[project.addTask(task)]]، وينادي [[tasks.save(task)]] (الـ mock مبيعملش حاجة)، ويرجع [[TaskResponse]].
- [[var res]]: الـ compiler يستنتج النوع ([[TaskResponse]]).

### Assert: اتأكد

- [[assertThat(res.project()).isEqualTo("Website")]]: AssertJ. [[assertThat(x)]] بتلف القيمة، و [[.isEqualTo(y)]] بتقارن بـ [[equals]]. زي [[expect(x).toBe(y)]] في Vitest.
- [[assertThat(website.getTasks()).hasSize(1)]]: الـ list بتاعة المشروع فيها عنصر واحد. ده بيثبت إن [[addTask]] اتنادت.
- [[verify(tasks).save(website.getTasks().get(0))]]: نقراها:
  - [[verify(tasks)]]: «اتأكد إن الـ mock ده...»
  - [[.save(...)]]: «...اتنادى عليه [[save]] **مرة واحدة بالظبط**...»
  - [[website.getTasks().get(0)]]: «...بالـ object ده». [[get(0)]] أول عنصر في الـ list.
  - لو [[save]] متناداش، أو اتنادى بـ object تاني، أو اتنادى مرتين، التست يقع.

---

## ٥. التست التاني: حالة الخطأ

~~~text التست
  @Test
  void unknownProjectThrows() {
    when(projects.findById(99L)).thenReturn(Optional.empty());
    assertThatThrownBy(() -> service.create(new CreateTaskRequest("x", 99L)))
        .isInstanceOf(NotFoundException.class)
        .hasMessage("project 99 not found");
  }
~~~

- [[thenReturn(Optional.empty())]]: الـ mock كان هيرجعها لوحده أصلًا، بس كتابتها بتوضح للي بيقرا إن «المشروع مش موجود» جزء من السيناريو.
- [[() -> service.create(...)]]: lambda (الـ [[->]] من درس lambdas). إحنا **مش** بننادي [[create]] هنا، إحنا بنسلّم الكود لـ AssertJ عشان هو ينفّذه ويمسك الـ exception. لو ناديناه مباشرة، الـ exception كانت هتطلع برّه وتوقّع التست.
- [[assertThatThrownBy(...)]]: بتشغّل الـ lambda، ولو مرماش أي exception التست بيقع.
- [[.isInstanceOf(NotFoundException.class)]]: النوع صح.
- [[.hasMessage("project 99 not found")]]: الرسالة بالظبط. الرسالة دي جاية من الـ constructor بتاع [[NotFoundException]]: [[what + " " + id + " not found"]].

---

## ٦. التشغيل

~~~bash
mvn test -Dtest=TaskServiceTest
~~~

[[-Dtest=]] بيشغّل class واحد بس بدل الـ suite كلها (في مشروعك هتكتب [[./mvnw]] بدل [[mvn]]، ونفس الناتج).

~~~text الناتج (مع التستين بتوع الحل)
[INFO] Running com.example.tasks.TaskServiceTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.441 s -- in com.example.tasks.TaskServiceTest
[INFO] BUILD SUCCESS
~~~

| الكلمة | معناها |
|---|---|
| [[Tests run: 4]] | اتشغّل ٤ تستات |
| [[Failures]] | assertion فشل (القيمة غلط) |
| [[Errors]] | exception مكانتش متوقعة طلعت من التست |
| [[Skipped]] | تستات اتخطت (عليها [[@Disabled]] مثلًا) |
| [[0.441 s]] | الـ ٤ تستات في أقل من نص ثانية، لأن مفيش Spring ولا داتابيز |

---

## ٧. شكل التست وهو بيقع

غيّرنا الرسالة المتوقعة لـ [["project 98 not found"]] عشان نشوف AssertJ بيقول إيه:

~~~text الناتج
[ERROR] com.example.tasks.TaskServiceTest.unknownProjectThrows -- Time elapsed: 0.031 s <<< FAILURE!
org.opentest4j.AssertionFailedError:

Expecting message to be:
  "project 98 not found"
but was:
  "project 99 not found"
~~~

بيقولك المتوقع والفعلي جنب بعض، ومعاهم الـ stack trace اللي بيوصلك للسطر.

---

## ٨. الحل: [[complete]] بتستين

~~~text الحل
  Project website = new Project("Website");
  Task task = new Task("Write docs");
  website.addTask(task);
  when(tasks.findById(7L)).thenReturn(Optional.of(task));
~~~

- ليه بنضيف الـ task لمشروع؟ لأن [[complete]] بترجع [[TaskResponse.from(task)]]، وده بيقرا [[task.getProject().getName()]]. لو الـ task من غير مشروع هيبقى [[NullPointerException]]. يعني التست كشف حاجة عن الكود: الـ response محتاج المشروع.
- [[assertThat(res.done()).isTrue()]] و [[assertThat(task.isDone()).isTrue()]]: الأول بيتأكد من الـ DTO اللي رجع، والتاني من الـ entity نفسه.
- مفيش [[verify(tasks).save(...)]]: [[complete]] مبينديش [[save]] أصلًا. الحفظ بيحصل بالـ dirty checking لما الـ transaction تخلص، وده مش موجود هنا (مفيش Spring). ده شغل [[@DataJpaTest]].

---

## ٩. التجربة: stubbing ملوش لازمة

ضفنا [[when(tasks.count()).thenReturn(5L);]] في أول تست من غير ما الـ service يستخدمه:

~~~text الناتج
[ERROR] com.example.tasks.TaskServiceTest.createsTaskInsideProject -- Time elapsed: 0.081 s <<< ERROR!
org.mockito.exceptions.misusing.UnnecessaryStubbingException:

Unnecessary stubbings detected.
Clean & maintainable test code requires zero unnecessary code.
Following stubbings are unnecessary (click to navigate to relevant line of code):
  1. -> at com.example.tasks.TaskServiceTest.createsTaskInsideProject(TaskServiceTest.java:23)
Please remove unnecessary stubbings or use 'lenient' strictness. More info: javadoc for UnnecessaryStubbingException class.
~~~

ده **ERROR** مش FAILURE: الـ assertions كلها عدّت، بس [[MockitoExtension]] بعد التست لقى [[when]] محدش استخدمه فرمى exception. اسمها **strict stubs**، والفكرة إن السطر ده بيضلل اللي بيقرا التست (يفتكر إن [[count()]] مهم). والحل تشيله، أو [[lenient().when(...)]] لو فعلًا محتاجه في تستات وتستات لأ.

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[@ExtendWith(MockitoExtension.class)]] | يعمل الـ mocks قبل كل تست ويفحص الـ stubs بعده |
| [[@Mock]] | object وهمي بيرجع قيم فاضية |
| [[@InjectMocks]] | الـ class الحقيقي بالـ mocks في الـ constructor |
| [[when(...).thenReturn(...)]] | حدد رد الـ mock |
| [[assertThat(x).isEqualTo(y)]] | قارن القيمة |
| [[assertThatThrownBy(() -> ...)]] | اتأكد إن الكود بيرمي |
| [[verify(mock).method(args)]] | اتأكد إن النداء حصل مرة واحدة بالـ args دي |

- الـ unit test بيختبر المنطق بس، فالـ repository دايمًا mock، والـ entities دايمًا [[new]].
- Arrange ثم Act ثم Assert، وسطر فاضي بينهم.
- FAILURE يعني القيمة غلط، و ERROR يعني exception مكانتش متوقعة (زي [[UnnecessaryStubbingException]]).`,
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
          teach: R`## التست ده بيعمل إيه؟

بيختبر [[TaskController]] من برّه، زي ما الـ client بيشوفه: ابعت request، اتأكد من الـ status والـ JSON. بس من غير server حقيقي ومن غير داتابيز: Spring بيقوّم **حتة** من التطبيق (الـ MVC والـ security والـ JSON) والـ service بيبقى mock.

اتشغّل في نفس المشروع (Spring Boot 4.1.1 على Java 25، في Docker) بـ [[mvn test -Dtest=TaskControllerTest]].

---

## ١. الـ imports

~~~text TaskControllerTest.java (أوله)
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
~~~

- [[MockMvcRequestBuilders.*]]: فيها [[get(...)]] و [[post(...)]] اللي بيبنوا الـ request.
- [[MockMvcResultMatchers.*]]: فيها [[status()]] و [[jsonPath(...)]] اللي بيفحصوا الرد.
- [[SecurityMockMvcRequestPostProcessors.jwt]]: من [[spring-security-test]]، بتحط token وهمي.
- [[org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest]]: ده مكانها في Boot 4 (من [[spring-boot-starter-webmvc-test]]). في Boot 3 كانت في [[org.springframework.boot.test.autoconfigure.web.servlet]]، فلو نسخت كود قديم الـ import هيبقى غلط.

---

## ٢. الـ annotations اللي فوق الـ class

~~~text السطور
@WebMvcTest(TaskController.class)
@Import(SecurityConfig.class)
class TaskControllerTest {
~~~

- [[@WebMvcTest(TaskController.class)]]: «قوّم slice الـ MVC، وفيه الـ controller ده بس». الـ slice فيه: الـ controller، و [[@RestControllerAdvice]] (فالـ [[ApiErrors]] بتاعنا بيتحمّل لوحده)، و Jackson، والـ filters، والـ auto-configuration بتاع الـ security. ومفيهوش: [[@Service]] ولا repositories ولا داتابيز ولا [[@Configuration]] بتاعتك.
- [[@Import(SecurityConfig.class)]]: عشان الـ [[@Configuration]] بتاعتك مش بتتحمّل لوحدها، بنجيب قواعد الـ security بتاعتنا بإيدنا. من غيرها، Spring بيحط security افتراضي مختلف (هتشوف الفرق في التجربة).

---

## ٣. الحقول

~~~text السطور
  @Autowired MockMvc mvc;
  @MockitoBean TaskService service;
  @MockitoBean JwtDecoder jwtDecoder;
~~~

- [[@Autowired MockMvc mvc]]: [[MockMvc]] أداة بتبعت requests وهمية لـ Spring MVC مباشرة، من غير بورت ومن غير HTTP حقيقي. و [[@Autowired]] يعني «يا Spring هاتهولي من الـ context» (الـ slice عامله جاهز).
- [[@MockitoBean TaskService service]]: الـ controller محتاج [[TaskService]] في الـ constructor، والـ service مش في الـ slice. [[@MockitoBean]] بيعمل mock من Mockito **ويحطه في الـ Spring context** كـ bean، فالـ controller بياخده. (الفرق عن [[@Mock]] في الدرس اللي فات: [[@Mock]] لـ Mockito لوحده، و [[@MockitoBean]] جوه Spring.)
- [[@MockitoBean JwtDecoder jwtDecoder]]: [[SecurityConfig]] فيه [[oauth2ResourceServer(rs -> rs.jwt(...))]]، وده محتاج bean من نوع [[JwtDecoder]] (اللي بيفك الـ token ويتأكد من التوقيع). الـ bean الحقيقي في class تاني مش في الـ slice، فبنحط mock عشان الـ context يقوم. [[jwt()]] تحت مش بيعدّي عليه أصلًا.

---

## ٤. التست الأول: [[listsOpenTasks]]

~~~text التست
  @Test
  void listsOpenTasks() throws Exception {
    when(service.open()).thenReturn(List.of(new TaskResponse(1L, "Write docs", false, "Website")));
    mvc.perform(get("/api/tasks").with(jwt()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Write docs"));
  }
~~~

- [[throws Exception]]: [[perform]] معلنة إنها بترمي [[Exception]] (checked)، فلازم الـ method تعلن ده كمان، وإلا الـ compiler يرفض.
- [[when(service.open()).thenReturn(List.of(...))]]: الـ service الوهمي هيرجع task واحدة. [[List.of]] list ثابتة.
- نفك سطر الـ [[perform]] من جوه لبرة:
  1. [[get("/api/tasks")]]: ابني request [[GET]] على المسار ده.
  2. [[.with(jwt())]]: حط عليه Authentication جاهز كأن فيه token سليم (اسم اليوزر الافتراضي [[user]] وصلاحية [[SCOPE_read]]). مفيش token حقيقي ولا توقيع.
  3. [[mvc.perform(...)]]: ابعته لـ Spring MVC، فيعدّي على الـ security filters، ثم الـ controller، ثم Jackson.
  4. [[.andExpect(status().isOk())]]: الـ status لازم 200.
  5. [[.andExpect(jsonPath("$[0].title").value("Write docs"))]]: [[jsonPath]] لغة صغيرة تقرا بيها الـ JSON: [[$]] هو الـ JSON كله، و [[[0]]] أول عنصر في الـ array، و [[.title]] الحقل.

الرد اللي اتبعت فعلًا (طبعناه بـ [[.andDo(print())]]):

~~~text الناتج
MockHttpServletResponse:
           Status = 200
     Content type = application/json
             Body = [{"id":1,"title":"Write docs","done":false,"project":"Website"}]
~~~

---

## ٥. التست التاني: من غير token

~~~text التست
mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
~~~

مفيش [[.with(jwt())]]، والقاعدة [[requestMatchers("/api/**").authenticated()]]، فالـ security بيرد قبل ما الـ controller يتنادى:

~~~text الناتج
           Status = 401
          Headers = [WWW-Authenticate:"Bearer resource_metadata="http://localhost/.well-known/oauth-protected-resource"", ...]
             Body =
~~~

- [[isUnauthorized()]] = 401، يعني «مين انت؟ مفيش هوية».
- الـ header [[WWW-Authenticate: Bearer]] بيقول للـ client «ابعتلي Bearer token».

---

## ٦. التست التالت: الـ validation

~~~text التست
    mvc.perform(post("/api/tasks").with(jwt())
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"title\":\"\",\"projectId\":1}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.title").value("must not be blank"));
~~~

- [[post("/api/tasks")]]: request [[POST]].
- [[.contentType(MediaType.APPLICATION_JSON)]]: الـ header [[Content-Type: application/json]]، عشان Spring يعرف يحوّل الـ body بـ Jackson.
- [[.content("...")]]: الـ body نفسه كـ String. و [[\"]] جوه String في Java معناها علامة [["]] جوه النص. يعني الـ body الحقيقي: [[{"title":"","projectId":1}]].
- العنوان فاضي، و [[CreateTaskRequest]] عليه [[@NotBlank]]، والـ controller عليه [[@Valid]]، فـ Spring بيرمي [[MethodArgumentNotValidException]] و [[ApiErrors]] بتحوّلها:

~~~text الناتج
           Status = 400
     Content type = application/problem+json
             Body = {"detail":"Invalid request content.","instance":"/api/tasks","status":400,"title":"Bad Request","errors":{"title":"must not be blank"}}
~~~

- [[$.errors.title]]: [[$]] الـ object كله، ثم الحقل [[errors]]، ثم [[title]] جواه.
- [[application/problem+json]]: نوع الرد بتاع ProblemDetail (RFC 9457).

---

## ٧. التشغيل

~~~text الناتج (التلاتة + التستين بتوع الحل)
[INFO] Running com.example.tasks.TaskControllerTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 3.531 s -- in com.example.tasks.TaskControllerTest
~~~

أول مرة في run لوحده خد حوالي ١٥ ثانية لأن الـ context بيقوم من الصفر (ومعاه Mockito بيعمل attach للـ JVM)، وجوه الـ suite كلها ٣.٥ ثانية. أبطأ من الـ unit test، بس أسرع بكتير من تشغيل التطبيق كله.

---

## ٨. الحل: الـ 404 والـ 403

- [[when(service.create(any())).thenThrow(new NotFoundException("project", 99))]]: [[any()]] يعني «بأي argument»، و [[thenThrow]] بدل [[thenReturn]]: الـ mock يرمي. الرد:

~~~text الناتج
           Status = 404
             Body = {"detail":"project 99 not found","instance":"/api/tasks","status":404,"title":"Not Found"}
~~~

- [[get("/internal/report").with(jwt())]]: المسار مش تحت [[/api]]، فبيقع على [[anyRequest().denyAll()]]:

~~~text الناتج
           Status = 403
          Headers = [WWW-Authenticate:"Bearer error="insufficient_scope", error_description="The request requires higher privileges than provided by the access token.", ...]
~~~

403 مش 401: الـ token موجود (عارفين انت مين)، بس مش مسموحلك.

---

## ٩. التجربة: شلنا [[@Import(SecurityConfig.class)]]

~~~text الناتج
[ERROR] Tests run: 5, Failures: 1, Errors: 0, Skipped: 0 <<< FAILURE! -- in com.example.tasks.TaskControllerTest
[ERROR] com.example.tasks.TaskControllerTest.unknownPathDenied -- Time elapsed: 0.084 s <<< FAILURE!
java.lang.AssertionError: Status expected:<403> but was:<404>
~~~

من غير الـ config بتاعنا، Spring Boot بيحط security افتراضي: «أي request لازم يبقى authenticated». فالـ request اللي معاه [[jwt()]] عدّى، ووصل لـ MVC، وملقاش controller للمسار ده: 404. والتستات التانية عدّت **بالصدفة** لأن الافتراضي شبه بتاعنا في الحالات دي. عشان كده لازم تست لكل قاعدة security مهمة.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[@WebMvcTest(X.class)]] | يقوّم MVC والـ security والـ advices للـ controller ده بس |
| [[@Import(SecurityConfig.class)]] | قواعد الـ security الحقيقية بدل الافتراضية |
| [[@MockitoBean]] | mock جوه الـ Spring context |
| [[mvc.perform(get(...))]] | request وهمي من غير بورت |
| [[.with(jwt())]] | يوزر داخل بـ token وهمي |
| [[status().isOk()]] / [[isBadRequest()]] / [[isUnauthorized()]] / [[isForbidden()]] / [[isNotFound()]] | 200 / 400 / 401 / 403 / 404 |
| [[jsonPath("$.a.b")]] | اقرا حقل من الـ JSON |

- المنطق نفسه مكانه الـ unit test بتاع الـ service، وهنا بتختبر «الغلاف»: المسار، والـ JSON، والـ validation، والأخطاء، والـ security.
- 401 = مفيش هوية، و 403 = في هوية بس مش مسموح.`,
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
          teach: R`## التست ده بيعمل إيه؟

بيختبر [[ProjectRepository]] على PostgreSQL حقيقي: هل [[findAllWithTasks()]] (الـ fetch join من درس N+1) بيجيب ٣ مشاريع و ٩ مهام في **query واحد** فعلًا؟ وهل [[findByName]] بيلاقي الموجود ومبيلاقيش الغلط؟ الداتابيز بتقوم في Docker بـ Testcontainers (الدرس الجاي)، و Flyway بيعمل الجداول والـ seed (٣ مشاريع × ٣ مهام).

اتشغّل في نفس المشروع ([[mvn test -Dtest=ProjectRepositoryTest]]). Testcontainers اشتغل من جوه container الـ Maven عن طريق Docker socket بتاع الجهاز، وبصورة [[postgres:16-alpine]] اللي كانت موجودة عندنا بدل [[17-alpine]] (نفس الكود، والأرقام نفسها).

---

## ١. الـ annotations: كل واحدة بتعمل إيه

~~~text السطور
@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(properties = "spring.jpa.properties.hibernate.generate_statistics=true")
class ProjectRepositoryTest {
~~~

### [[@DataJpaTest]]

slice تاني، زي [[@WebMvcTest]] بس للداتابيز: بيقوّم الـ DataSource و JPA/Hibernate و Flyway والـ repositories بس. مفيش controllers ولا services ولا security. وكمان كل تست بيتلف في transaction **بتتعمل rollback في الآخر**، فاللي تحفظه في تست ميظهرش في اللي بعده. في Boot 4 الـ import: [[org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest]].

### [[@Testcontainers]]

إضافة JUnit من Testcontainers: بتدوّر على الحقول اللي عليها [[@Container]] وتشغّل الـ containers قبل التستات وتقفلها بعدها.

### [[@AutoConfigureTestDatabase(replace = ...Replace.NONE)]]

[[@DataJpaTest]] افتراضيًا بيشيل الداتابيز بتاعتك ويحط داتابيز in-memory (زي H2) لو لقاها. [[Replace.NONE]] يعني «متبدلش حاجة، استخدم اللي متوصّل». ([[Replace]] enum جوه الـ annotation نفسها، عشان كده الاسم طويل.) في Boot 4 الـ import: [[org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase]].

### [[@TestPropertySource(properties = "...")]]

بيضيف property للتست ده بس، كأنها في [[application.yaml]]. والـ property دي:

- [[spring.jpa.properties.]]: أي حاجة بعدها بتتبعت لـ Hibernate زي ما هي.
- [[hibernate.generate_statistics=true]]: Hibernate يعد كل حاجة بيعملها: عدد الـ statements، والـ entities اللي اتحمّلت، وغيرهم. بنحتاجها عشان نعد الـ queries.

---

## ٢. الـ container

~~~text السطور
  @Container
  @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine");
~~~

- [[new PostgreSQLContainer("postgres:17-alpine")]]: وصف لـ container من الصورة دي.
- [[static]]: الحقل ملك الـ class مش كل تست، فالـ container بيقوم **مرة واحدة** لكل التستات اللي في الـ class.
- [[@Container]]: «Testcontainers، شغّل ده».
- [[@ServiceConnection]]: Spring Boot ياخد من الـ container الـ JDBC URL واليوزر والباسورد، بدل [[spring.datasource.*]]. شوف إيه اللي اتوصّل فعلًا:

~~~text من اللوج
Container is started (JDBC URL: jdbc:postgresql://host.docker.internal:61486/test?loggerLevel=OFF)
Migrating schema "public" to version "1 - init"
Migrating schema "public" to version "2 - seed"
Successfully applied 2 migrations to schema "public", now at version v2
~~~

البورت [[61486]] عشوائي، والداتابيز اسمها [[test]]، و Flyway شغّل الـ migrations عليها. ([[host.docker.internal]] ظهر لأن Maven نفسه كان شغال جوه container؛ على جهازك هيبقى [[localhost]].)

---

## ٣. الحقول اللي Spring بيحقنها

~~~text السطور
  @Autowired ProjectRepository projects;
  @Autowired EntityManagerFactory emf;
~~~

- [[projects]]: الـ repository الحقيقي (Spring Data عامل الـ implementation).
- [[EntityManagerFactory]]: المصنع اللي JPA بيعمل منه الـ sessions. محتاجينه عشان نوصل لإحصائيات Hibernate.

---

## ٤. التست الأول: عدّ الـ queries

~~~text التست
    Statistics stats = emf.unwrap(SessionFactory.class).getStatistics();
    stats.clear();
    int total = projects.findAllWithTasks().stream().mapToInt(p -> p.getTasks().size()).sum();
    assertThat(total).isEqualTo(9);
    assertThat(stats.getPrepareStatementCount()).isEqualTo(1);
~~~

### [[emf.unwrap(SessionFactory.class).getStatistics()]]

- [[emf]] هو الواجهة العامة بتاعة JPA. [[unwrap(SessionFactory.class)]] معناها «هاتلي الـ object الحقيقي اللي تحت، بنوع Hibernate»، لأن الإحصائيات حاجة خاصة بـ Hibernate مش في JPA.
- [[getStatistics()]]: العدّاد. و [[Statistics]] من [[org.hibernate.stat]].

### [[stats.clear()]]

صفّر العدّاد، عشان نعد اللي هيحصل من هنا بس (مش queries بتاعة Flyway أو تستات قبله).

### السطر الطويل، من جوه لبرة

1. [[projects.findAllWithTasks()]]: الـ query: [[select distinct p from Project p left join fetch p.tasks]]. بيرجع [[List<Project>]].
2. [[.stream()]]: حوّل الـ list لـ stream.
3. [[.mapToInt(p -> p.getTasks().size())]]: لكل مشروع، عدد مهامه. [[mapToInt]] بيطلّع [[IntStream]] (أرقام [[int]]).
4. [[.sum()]]: اجمعهم.

ولو شغّلت بـ [[spring.jpa.show-sql=true]] هتشوف الـ SQL اللي خرج:

~~~text الناتج
Hibernate: select distinct p1_0.id,p1_0.name,t1_0.project_id,t1_0.id,t1_0.done,t1_0.title from project p1_0 left join task t1_0 on p1_0.id=t1_0.project_id
~~~

سطر واحد فيه المشاريع والمهام مع بعض.

### الـ assertions

- [[isEqualTo(9)]]: ٣ مشاريع × ٣ مهام.
- [[stats.getPrepareStatementCount()]]: عدد الـ SQL statements اللي Hibernate جهّزها وبعتها. [[1]] يعني query واحد. لو حد شال الـ [[join fetch]] بعدين، الرقم هيبقى 4 والتست هيقع. ده الهدف: التست بيحمي الأداء مش الشكل بس.

---

## ٥. التست التاني: derived query

~~~text التست
    assertThat(projects.findByName("Mobile")).isPresent();
    assertThat(projects.findByName("Nope")).isEmpty();
~~~

[[findByName]] بيرجع [[Optional<Project>]]، و AssertJ عنده [[isPresent()]] و [[isEmpty()]] للـ Optional. الـ SQL اللي Spring Data ولّده من اسم الـ method:

~~~text الناتج
Hibernate: select p1_0.id,p1_0.name from project p1_0 where p1_0.name=?
~~~

---

## ٦. التشغيل

~~~text الناتج (مع تست الحل)
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 23.08 s -- in com.example.tasks.ProjectRepositoryTest
~~~

الـ ٢٣ ثانية أغلبها أول مرة: الـ JVM بيحمّل Hibernate و Spring، و Testcontainers بيتصل بـ Docker، والـ container بيقوم. في run الـ suite الكاملة نفس الـ class خد ٤.٧ ثانية بس، لأن class قبله كان سخّن كل ده (الـ container نفسه اتعمل جديد، لأن الحقل static في الـ class ده بس).

---

## ٧. الحل: N+1 بالأرقام

[[findAll()]] واللف على [[getTasks()]] بيطلّع:

~~~text الناتج
Hibernate: select p1_0.id,p1_0.name from project p1_0
Hibernate: select t1_0.project_id,t1_0.id,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
Hibernate: select t1_0.project_id,t1_0.id,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
Hibernate: select t1_0.project_id,t1_0.id,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id=?
~~~

١ للمشاريع + ٣ (واحد لكل مشروع) = 4. ومع [[default_batch_fetch_size=50]]:

~~~text الناتج
Hibernate: select p1_0.id,p1_0.name from project p1_0
Hibernate: select t1_0.project_id,t1_0.id,t1_0.done,t1_0.title from task t1_0 where t1_0.project_id = any (?)
~~~

2 بس: Hibernate 7 بعت كل الـ ids في array واحدة ([[= any (?)]] في PostgreSQL معناها «أي قيمة من الـ array»).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[@DataJpaTest]] | JPA والـ repositories و Flyway بس، وكل تست بـ rollback |
| [[Replace.NONE]] | متبدلش PostgreSQL بـ H2 |
| [[@Container]] + [[static]] | container واحد للـ class |
| [[@ServiceConnection]] | الاتصال من الـ container، من غير [[spring.datasource]] |
| [[generate_statistics=true]] + [[getPrepareStatementCount()]] | عدّ الـ queries في التست |

- اختبر الـ repository على نفس نوع الداتابيز اللي في الإنتاج.
- التست اللي بيعد الـ queries بيمسك أي N+1 جديد قبل ما يوصل للإنتاج.
- جوه التست فيه transaction مفتوحة دايمًا، فالـ lazy loading شغال هنا حتى لو هيقع في الإنتاج.`,
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

ومع [[default_batch_fetch_size=50]]: بيبقى 2: واحد للمشاريع، وواحد لكل مهام الـ ٣ مشاريع مع بعض. في Hibernate 7 مع PostgreSQL طلع [[where t1_0.project_id = any (?)]] (كل الـ ids في array واحدة)، وإصدارات أقدم بتكتب [[in (?, ?, ?)]]. ده حل عام كويس للـ N+1 من غير ما تكتب fetch join لكل حالة.`,
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
          teach: R`## التست ده بيعمل إيه؟

بيقوّم **التطبيق كله** ([[@SpringBootTest]]) متوصّل بـ PostgreSQL حقيقي شغال في Docker، وبعدين يثبت حاجة مينفعش mock يثبتها: إن لمس علاقة lazy برّه transaction بيرمي [[LazyInitializationException]]. الـ container بيقوم قبل التستات ويتمسح بعدها، فكل مرة بتبدأ من داتابيز نضيفة.

اتشغّل في نفس المشروع ([[mvn test -Dtest=PitfallsTest]]). Maven كان شغال جوه container، فاديناله Docker socket بتاع الجهاز ([[-v /var/run/docker.sock:/var/run/docker.sock]]) عشان Testcontainers يقدر يعمل containers، واستخدمنا [[postgres:16-alpine]] اللي عندنا بدل [[17-alpine]].

---

## ١. [[docker info]]: Docker شغال؟

أول سطر تعليق في المثال. Testcontainers محتاج Docker daemon شغال، فاتأكد الأول:

~~~bash
docker info
~~~

~~~text جزء من الناتج
Server Version: 29.6.1
Operating System: Docker Desktop
~~~

لو طلع error إنه مش قادر يوصل للـ Docker daemon، افتح Docker Desktop (أو شغّل الـ service على لينكس) واستنى لحد ما يقوم.

---

## ٢. الـ annotations

~~~text السطور
@SpringBootTest
@Testcontainers
class PitfallsTest {
~~~

- [[@SpringBootTest]]: مش slice. بيدوّر على الـ class اللي عليه [[@SpringBootApplication]] ويقوّم كل الـ beans: services و repositories و security و Flyway. ده **integration test**: بيختبر الحتت مع بعض.
- [[@Testcontainers]]: الإضافة اللي بتشغّل حقول [[@Container]] وتقفلها.

---

## ٣. الـ container

~~~text السطور
  @Container
  @ServiceConnection
  static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine");
~~~

- [[PostgreSQLContainer]]: class جاهز من [[testcontainers-postgresql]] (في Testcontainers 2 في package [[org.testcontainers.postgresql]]). عارف إزاي يقوّم Postgres، ويستنى لحد ما يبقى جاهز، ويطلّع الـ JDBC URL.
- [[postgres:17-alpine]]: اسم الصورة. [[alpine]] نسخة صغيرة. ثبّت نفس الإصدار اللي في الإنتاج.
- [[static]]: container واحد للـ class كله، مش واحد لكل تست.
- [[@ServiceConnection]]: Spring Boot بيقرا من الـ container العنوان واليوزر والباسورد ويعمل منهم الـ DataSource، فمش محتاج [[spring.datasource.url]] خالص.

وانت التستات شغالة، [[docker ps]] في ترمنال تاني بيوري:

~~~text الناتج
IMAGE                PORTS                                           NAMES
postgres:16-alpine   0.0.0.0:50356->5432/tcp, [::]:50356->5432/tcp   suspicious_ardinghelli
~~~

- البورت على الجهاز عشوائي ([[50356]])، مش 5432، عشان ميتخانقش مع أي Postgres عندك ويقدر كذا build يشتغلوا مع بعض.
- الاسم عشوائي، و Testcontainers بيعلّم الـ container بـ labels زي [["org.testcontainers":"true"]] و [[sessionId]].
- وعادةً هتلاقي كمان container [[testcontainers/ryuk]]: ده «عامل نضافة» بيمسح containers الـ session لو العملية وقعت فجأة. إحنا قفلناه في التجربة ([[TESTCONTAINERS_RYUK_DISABLED=true]]) عشان منحمّلش صورته، فكلامه هنا من الـ docs. وبعد ما التستات خلصت، [[docker ps]] رجع فاضي: Testcontainers قفل الـ container بنفسه.

---

## ٤. الـ beans

~~~text السطر
  @Autowired TaskRepository tasks;
~~~

repository حقيقي من التطبيق، متوصّل بالـ Postgres اللي في الـ container، وفيه الـ seed بتاع Flyway (task رقم 1 هي [["Write docs"]] في مشروع [["Website"]]).

---

## ٥. التست: [[lazyOutsideTransactionThrows]]

~~~text التست
    Task t = tasks.findById(1L).orElseThrow();
    assertThatThrownBy(() -> t.getProject().getName())
        .isInstanceOf(LazyInitializationException.class)
        .hasMessageContaining("no session");
~~~

### [[tasks.findById(1L).orElseThrow()]]

- التست نفسه **مش** [[@Transactional]] (ده [[@SpringBootTest]] مش [[@DataJpaTest]])، فـ [[findById]] بيفتح transaction صغيرة لنفسه، يجيب الـ task، ويقفلها.
- [[orElseThrow()]]: لو الـ Optional فاضي ارمي، لو فيه قيمة رجّعها.
- العلاقة [[project]] عليها [[FetchType.LAZY]]، فمكانها proxy فاضي فيه الـ id بس. طبعنا [[t.getProject().getClass().getSimpleName()]]:

~~~text الناتج
Project$HibernateProxy
~~~

[[$]] في اسم class معناها class اتولّد وقت التشغيل: Hibernate عامل subclass من [[Project]].

### [[t.getProject().getName()]]

[[getName()]] محتاج داتا من الداتابيز، والـ session اتقفلت مع الـ transaction:

~~~text الناتج
org.hibernate.LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session
~~~

- [[com.example.tasks.Project#1]]: النوع والـ id اللي كان عايز يحمّله.
- [[- no session]]: مفيش persistence context مفتوح يحمّل بيه.
- [[hasMessageContaining("no session")]]: جزء من الرسالة بس، عشان التست ميقعش لو Hibernate غيّر باقي الصياغة.

---

## ٦. [[./mvnw test]]

آخر سطر تعليق. بيشغّل كل التستات. في مشروعنا (١٥ تست، ٥ منهم بـ Testcontainers في class-ين):

~~~text الناتج
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 32.52 s -- in com.example.tasks.PitfallsTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 4.688 s -- in com.example.tasks.ProjectRepositoryTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.012 s -- in com.example.tasks.ScopesTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 3.531 s -- in com.example.tasks.TaskControllerTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.426 s -- in com.example.tasks.TaskServiceTest
[INFO] Tests run: 15, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
[INFO] Total time:  48.800 s
~~~

لاحظ الفرق: الـ unit tests أجزاء من الثانية، والـ slice ثواني، والـ integration test بالـ container أبطأ حاجة. عشان كده بتكتب unit tests كتير و integration tests قليلة للحاجات اللي محتاجة داتابيز بجد.

---

## ٧. من غير Docker

شغّلنا [[ProjectRepositoryTest]] من غير الـ socket (يعني مفيش Docker يوصله):

~~~text الناتج
ERROR org.testcontainers.dockerclient.DockerClientProviderStrategy -- Could not find a valid Docker environment. Please check configuration. Attempted configurations were:
	UnixSocketClientProviderStrategy: failed with exception InvalidConfigurationException (Could not find unix domain socket). Root cause NoSuchFileException (/var/run/docker.sock)
...
[ERROR] ProjectRepositoryTest » ContainerFetch Can't get Docker image: RemoteDockerImage(imageName=postgres:17-alpine, ...)
Caused by: java.lang.IllegalStateException: Could not find a valid Docker environment. Please see logs and check configuration
~~~

بيقولك جرّب أنهي طرق يوصل بيها لـ Docker وكلها فشلت. لو عايز التستات دي تتخطى بدل ما تفشل على جهاز من غير Docker: [[@Testcontainers(disabledWithoutDocker = true)]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[@SpringBootTest]] | التطبيق كله (integration test) |
| [[@Testcontainers]] | يشغّل ويقفل حقول [[@Container]] |
| [[static PostgreSQLContainer]] | Postgres حقيقي واحد للـ class |
| [[@ServiceConnection]] | Spring ياخد الاتصال من الـ container |
| [[docker info]] | اتأكد إن Docker شغال قبل التستات |

- الـ container بيبدأ فاضي كل مرة، و Flyway بيبني الجداول والـ seed، فالنتيجة واحدة على كل جهاز وفي الـ CI.
- البورت عشوائي، فمتكتبش 5432 في أي حتة.
- تست الـ LazyInitializationException ده بيشتغل هنا بس، لأن [[@DataJpaTest]] بيفتح transaction حوالين التست فالـ lazy loading بينجح.`,
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

من غير Docker: التستات دي بتفشل بـ [[Could not find a valid Docker environment]]. (لو عايز تتخطاها في الحالة دي: [[@Testcontainers(disabledWithoutDocker = true)]].) في مشروعنا الـ suite كلها (١٥ تست، منهم ٥ بـ Testcontainers) خلصت في حوالي ٥٠ ثانية.`
        }
      ]
    }
]);
