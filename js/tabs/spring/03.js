// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
          teach: R`## الكود ده بيعمل إيه؟

class واحد بيعمل ٣ endpoints لمهام (tasks): واحد يجيب المهام المفتوحة، وواحد يعلّم مهمة إنها خلصت، وواحد يمسح مهمة. الـ controller نفسه مبيعملش شغل: بيستقبل الـ request ويسلّمه لـ [[TaskService]] ويرجّع اللي رجع.

كل اللي تحت اتجرّب في مشروع Spring Boot 4.1.1 معمول من start.spring.io، على JDK 25 جوه [[maven:3.9-eclipse-temurin-25]] و PostgreSQL 18 في Docker، والـ service بيكلم الداتابيز (الدروس الجاية). الـ requests اتبعتت بـ [[curl -i]] (الـ [[-i]] بيطبع الـ status والـ headers مع الـ body).

---

## ١. فوق الـ class: annotation اتنين

~~~java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
~~~

- الـ **annotation** هي الكلمة اللي بتبدأ بـ [[@]]: علامة بتتحط فوق class أو method، و Spring بيقراها وقت التشغيل ويتصرف على أساسها.
- [[@RestController]] بتقول حاجتين: الـ class ده **controller** (بيستقبل requests)، وكل method فيه اللي بترجعه **هو الـ body** بتاع الـ response، ويتحول لـ JSON. وهي في الحقيقة [[@Controller]] + [[@ResponseBody]] مع بعض.
- [[@RequestMapping("/api/tasks")]]: البادئة المشتركة. أي route جوه الـ class بيتلزق بعدها، فـ [[@GetMapping]] من غير path يبقى [[GET /api/tasks]].
- [[public class TaskController]]: class عادي. Spring بيلاقيه لوحده لأنه في نفس package الـ main class أو تحته (component scan)، ويعمل منه object واحد بس (singleton bean) لكل التطبيق.

---

## ٢. الـ service والـ constructor

~~~java
  private final TaskService service;

  public TaskController(TaskService service) {
    this.service = service;
  }
~~~

- [[private final TaskService service;]]: حقل بيشيل الـ service. [[final]] يعني بيتحط مرة واحدة ومش بيتغير.
- الـ constructor بياخد [[TaskService]] كباراميتر، ومحدش بيكتب [[new TaskController(...)]] بإيده: Spring شايف إن الـ constructor محتاج [[TaskService]]، فبيدوّر على الـ bean ده ويبعته. ده اسمه **constructor injection** (درس «beans و DI»).
- لما الـ class فيه constructor واحد، مش محتاج [[@Autowired]].

---

## ٣. [[GET /api/tasks]]: list بتبقى JSON array

~~~java
  @GetMapping
  public List<TaskResponse> open() {
    return service.open();
  }
~~~

- [[@GetMapping]] من غير path: الـ method دي بترد على [[GET]] على البادئة نفسها.
- بترجع [[List<TaskResponse>]]، و [[TaskResponse]] record (DTO: object بيتبعت للـ client بس، مش الـ entity بتاع الداتابيز). في المشروع شكله [[record TaskResponse(Long id, String title, boolean done, String project)]].
- مفيش [[res.json()]]: Spring بيدّي اللي رجع لـ **Jackson** (مكتبة JSON)، وهي بتحوّل كل record لـ object، والـ list لـ array.

~~~bash
curl -i localhost:8080/api/tasks
~~~

~~~text الناتج (مقصوص)
HTTP/1.1 200
Content-Type: application/json

[{"id":3,"title":"Fix footer","done":false,"project":"Website"},{"id":1,"title":"Design home page","done":false,"project":"Website"}, ...]
~~~

- [[200]] الافتراضي لأي method رجعت عادي.
- أسماء الحقول في الـ JSON هي أسماء الـ record components بالظبط ([[id]] و [[title]]...).

---

## ٤. [[PATCH /api/tasks/{id}/done]]: جزء من الـ URL كباراميتر

~~~java
  @PatchMapping("/{id}/done")
  public TaskResponse complete(@PathVariable long id) {
    return service.complete(id);
  }
~~~

- [[@PatchMapping]]: [[PATCH]] هو الـ HTTP method لتعديل جزء من resource (هنا حقل [[done]] بس).
- [[{id}]] في الـ path: مكان فاضي بيتملي من الـ URL. [[/api/tasks/1/done]] يبقى [[id]] = 1.
- [[@PathVariable long id]]: خد [[{id}]] من الـ path، وحوّله لـ [[long]]. Spring بيربطهم بالاسم (اسم الباراميتر = اسم اللي بين القوسين).

~~~text PATCH /api/tasks/1/done
HTTP/1.1 200
Content-Type: application/json

{"id":1,"title":"Design home page","done":true,"project":"Website"}
~~~

ولو الـ id مش رقم؟

~~~text PATCH /api/tasks/abc/done
HTTP/1.1 400
{"timestamp":"2026-10-07T17:42:54.608Z","status":400,"error":"Bad Request","path":"/api/tasks/abc/done"}
~~~

وفي لوج التطبيق السبب:

~~~text اللوج
WARN ... DefaultHandlerExceptionResolver : Resolved [...MethodArgumentTypeMismatchException: Method parameter 'id': Failed to convert value of type 'java.lang.String' to required type 'long'; For input string: "abc"]
~~~

يعني Spring رفض الـ request **قبل** ما الـ method تتنادى. والـ body ده (timestamp و status و error و path) هو شكل الأخطاء الافتراضي في Spring Boot، لحد ما نغيّره لـ ProblemDetail (بعد درسين).

---

## ٥. [[DELETE]] و 204

~~~java
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable long id) {
    service.delete(id);
  }
}
~~~

- [[@DeleteMapping("/{id}")]]: [[DELETE /api/tasks/5]].
- [[@ResponseStatus(HttpStatus.NO_CONTENT)]]: غيّر الـ status من 200 لـ **204 No Content**. [[HttpStatus]] enum فيه كل الـ status codes بأسامي ([[NOT_FOUND]] = 404، [[CREATED]] = 201...).
- [[void]]: مفيش حاجة ترجع، فمفيش body.
- آخر [[}]] بيقفل الـ class.

~~~text DELETE /api/tasks/2
HTTP/1.1 204
~~~

مفيش [[Content-Type]] ولا body خالص، وده معنى 204.

وفي اللوج (الـ SQL logging شغال) الـ service عمل ٣ queries:

~~~text اللوج
select count(*) from task t1_0 where t1_0.id=?
select t1_0.id,t1_0.created_at,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
delete from task where id=?
~~~

الأول من [[existsById]]، والتاني والتالت من [[deleteById]] (بيحمّل الـ entity الأول وبعدين يمسحه).

---

## ٦. الحالات اللي في الـ try

| الطلب | النتيجة | ليه |
|---|---|---|
| [[GET /api/tasks]] | [[200]] و JSON array | الـ list اتحولت لـ JSON |
| [[PATCH /api/tasks/1/done]] | [[200]] و [["done":true]] | الـ object اللي رجع |
| [[DELETE /api/tasks/2]] | [[204]] من غير body | [[@ResponseStatus]] و [[void]] |
| [[PATCH /api/tasks/abc/done]] | [[400]] | [[abc]] مش [[long]] |
| [[PATCH /api/tasks/99/done]] | [[500]] | الـ service رمى [[NotFoundException]] ومحدش مسكها |
| [[PUT /api/tasks/1]] | [[405]] و [[Allow: DELETE]] | الـ path موجود بس مفيش PUT عليه |

الـ 500 في اللوج:

~~~text اللوج
ERROR ... Servlet.service() for servlet [dispatcherServlet] ... threw exception [Request processing failed: com.example.tasks.NotFoundException: task 99 not found] with root cause
~~~

والـ 405 معاه header [[Allow: DELETE]]: Spring بيقولك الـ methods المسموحة على [[/api/tasks/1]].

> الـ try بيقول اعمل الـ service بـ list في الذاكرة. نفس الـ controller بالظبط هيشتغل، لأنه مش عارف ولا فارق معاه الـ service بيخزّن فين.

---

## الخلاصة

- [[@RestController]] = اللي بترجعه هو الـ body بـ JSON. [[@RequestMapping]] على الـ class = البادئة.
- [[@GetMapping]] و [[@PostMapping]] و [[@PatchMapping]] و [[@DeleteMapping]] = الـ HTTP method، والـ path جواها بيتلزق بعد البادئة.
- [[@PathVariable]] بياخد [[{id}]] من الـ URL ويحوّله للنوع، ولو فشل: 400 قبل ما الكود بتاعك يشتغل.
- [[@ResponseStatus]] بيغيّر الـ status الثابت، و [[void]] + 204 = مفيش body.
- الـ controller رفيع: بيستقبل ويسلّم للـ service. والـ exceptions اللي محدش بيمسكها = 500 لحد درس ProblemDetail.`,
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
          teach: R`## الكود ده بيعمل إيه؟

٣ methods من controller للمنتجات ([[/api/products]]): واحدة بتجيب list بفلتر من الـ query string، وواحدة بتجيب منتج واحد وترجع 404 لو مش موجود، وواحدة بتعمل منتج وترجع 201. المنتجات متخزنة في الذاكرة عشان نركّز على الـ HTTP.

المثال مش class كامل: في المشروع اللي جربنا فيه (Spring Boot 4.1.1 و JDK 25 في Docker) الـ methods دي جوه class عليه [[@RestController]] و [[@RequestMapping("/api/products")]]، وفوقها ٣ حقول:

~~~java
private final Map<Long, Product> store = new ConcurrentHashMap<>();
private final AtomicLong ids = new AtomicLong();
private final ShopProperties props;   // الإعدادات (درس application.yaml)
~~~

- [[record Product(long id, String name, long priceCents)]]: المنتج. السعر بالقروش ([[priceCents]]) كرقم صحيح، عشان الفلوس متتحسبش بـ [[double]].
- [[ConcurrentHashMap]]: map آمنة لما أكتر من request يكتبوا فيها في نفس الوقت (كل request على thread من Tomcat).
- [[AtomicLong]]: عدّاد آمن مع الـ threads، [[incrementAndGet()]] بيزوّد ١ ويرجّع القيمة الجديدة من غير ما اتنين ياخدوا نفس الرقم.

---

## ١. [[@RequestParam]]: قراية الـ query string

~~~java
@GetMapping
public List<Product> list(@RequestParam(defaultValue = "0") long minPrice,
                          @RequestParam(defaultValue = "20") int size) {
~~~

- الـ query string هو اللي بعد [[?]] في الـ URL: [[/api/products?minPrice=4000&size=2]]، والـ [[&]] بيفصل بين الباراميترات.
- [[@RequestParam long minPrice]]: خد [[minPrice]] من الـ query (بنفس اسم الباراميتر) وحوّله لـ [[long]].
- [[defaultValue = "0"]]: لو مش موجود في الـ URL، استخدم 0. القيمة مكتوبة كنص لأن أي حاجة في الـ URL نص، و Spring بيحوّلها. ووجود [[defaultValue]] بيخلي الباراميتر اختياري أوتوماتيك.
- من غير [[defaultValue]] (ولا [[required = false]]) الباراميتر إجباري. جرّبنا [[GET /api/tasks/search]] من غير [[?q=]] على [[@RequestParam String q]]:

~~~text الناتج (مع ProblemDetail من درس بعد الجاي)
HTTP/1.1 400
{"detail":"Required parameter 'q' is not present.","instance":"/api/tasks/search","status":400,"title":"Bad Request"}
~~~

---

## ٢. الـ stream: فلتر وترتيب وحد أقصى

~~~java
    return store.values().stream()
        .filter(p -> p.priceCents() >= minPrice)
        .sorted(Comparator.comparingLong(Product::id))
        .limit(Math.min(size, props.maxPageSize()))
        .toList();
}
~~~

من فوق لتحت (درس streams):

1. [[store.values().stream()]]: كل المنتجات اللي في الـ map، كـ stream.
2. [[.filter(p -> p.priceCents() >= minPrice)]]: سيب اللي سعرها أكبر من أو يساوي [[minPrice]]. [[p -> ...]] lambda.
3. [[.sorted(Comparator.comparingLong(Product::id))]]: رتّب بالـ id. الـ [[ConcurrentHashMap]] مش بتضمن ترتيب، فمن غير السطر ده الترتيب ممكن يتغير. [[Product::id]] method reference: نفس [[p -> p.id()]].
4. [[.limit(Math.min(size, props.maxPageSize()))]]: خد أول N بس. و N هي الأصغر بين اللي المستخدم طلبه والحد اللي في الإعدادات (50). فلو حد طلب [[size=1000000]] هياخد 50.
5. [[.toList()]]: list جديدة مش بتتعدّل.

جرّبنا: ضفنا ٤ منتجات (Pen بـ 1500، و Notebook بـ 8000، و Bag بـ 3000، و Ruler بـ 5000) وطلبنا:

~~~bash
curl -i "localhost:8080/api/products?minPrice=4000&size=2"
~~~

~~~text الناتج
HTTP/1.1 200
Content-Type: application/json

[{"id":2,"name":"Notebook","priceCents":8000},{"id":4,"name":"Ruler","priceCents":5000}]
~~~

الـ URL متحط بين [["..."]] في الترمنال عشان الـ [[&]] ليها معنى في bash (تشغيل في الخلفية).

ولو الرقم مش رقم:

~~~text GET /api/products?minPrice=abc
HTTP/1.1 400
Content-Type: application/json

{"timestamp":"2026-10-07T17:43:03.513Z","status":400,"error":"Bad Request","path":"/api/products"}
~~~

وفي اللوج: [[MethodArgumentTypeMismatchException: Method parameter 'minPrice': Failed to convert value of type 'java.lang.String' to required type 'long'; For input string: "abc"]].

---

## ٣. [[ResponseEntity.of]]: 200 أو 404 في سطر

~~~java
@GetMapping("/{id}")
public ResponseEntity<Product> get(@PathVariable long id) {
    return ResponseEntity.of(Optional.ofNullable(store.get(id)));
}
~~~

افتحها من جوه لبرة:

1. [[store.get(id)]]: المنتج، أو [[null]] لو مش موجود.
2. [[Optional.ofNullable(...)]]: لفّه في [[Optional]]: صندوق يا فيه قيمة يا فاضي (درس Optional).
3. [[ResponseEntity.of(optional)]]: لو فيه قيمة: 200 والقيمة body. لو فاضي: 404 من غير body.

- [[ResponseEntity<Product>]]: نوع الرجوع بقى «response كامل»: status و headers و body من نوع [[Product]]. ده الفرق عن الدرس اللي فات: هناك الـ status كان ثابت، هنا بيتحدد وقت التشغيل.

~~~text GET /api/products/1 ثم /api/products/99
HTTP/1.1 200
Content-Type: application/json

{"id":1,"name":"Pen","priceCents":1500}

HTTP/1.1 404
Content-Length: 0
~~~

[[Content-Length: 0]]: الـ 404 جه فاضي خالص.

---

## ٤. POST و 201 و Location

~~~java
@PostMapping
public ResponseEntity<Product> create(@Valid @RequestBody CreateProduct body) {
    var p = new Product(ids.incrementAndGet(), body.name(), body.priceCents());
    store.put(p.id(), p);
    return ResponseEntity.created(URI.create("/api/products/" + p.id())).body(p);
}
~~~

- [[@RequestBody CreateProduct body]]: حوّل الـ JSON اللي في الـ body لـ [[record CreateProduct(String name, long priceCents)]]. الـ client مش بيبعت [[id]]: السيرفر هو اللي بيحدده.
- [[@Valid]]: افحص الـ constraints اللي على الـ record الأول (الدرس الجاي). في المشروع عليه [[@NotBlank name]] و [[@Positive priceCents]].
- [[var p = new Product(...)]]: [[var]] يعني النوع يتعرف لوحده ([[Product]]).
- [[store.put(p.id(), p)]]: احفظه.
- السطر الأخير من جوه لبرة:
  - [[URI.create("/api/products/" + p.id())]]: عنوان المنتج الجديد.
  - [[ResponseEntity.created(uri)]]: status **201 Created** وبيحط الـ URI في header اسمه [[Location]].
  - [[.body(p)]]: والـ body هو المنتج.

~~~bash
curl -i -X POST localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Pen","priceCents":1500}'
~~~

- [[-X POST]]: الـ method. [[-H]]: header، و [[Content-Type: application/json]] بيقول لـ Spring إن الـ body JSON. [[-d]]: الـ body نفسه.

~~~text الناتج
HTTP/1.1 201
Location: /api/products/1
Content-Type: application/json

{"id":1,"name":"Pen","priceCents":1500}
~~~

الـ [[Location]] بيقول للـ client: «اللي عملته موجود هنا»، يقدر يعمل GET عليه على طول.

---

## ٥. ملخص الـ try

| الطلب | النتيجة | مين عملها |
|---|---|---|
| POST بـ body سليم | [[201]] و [[Location: /api/products/1]] | [[ResponseEntity.created]] |
| [[?minPrice=abc]] | [[400]] | Spring فشل يحوّل لـ [[long]] قبل الـ method |
| [[/api/products/99]] | [[404]] و body فاضي | [[ResponseEntity.of]] على Optional فاضي |

## الخلاصة

- [[@RequestParam]] للـ query string، و [[defaultValue]] بيخليه اختياري. والنوع الغلط = 400 لوحده.
- [[ResponseEntity<T>]] لما الـ status أو الـ headers بيتغيروا حسب الحالة: [[of(optional)]] للـ 200 أو 404، و [[created(uri).body(x)]] للـ 201 مع [[Location]].
- أي [[size]] جاي من المستخدم ليه حد أقصى من السيرفر.`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيوصف شكل الـ body المقبول بـ annotations على حقول الـ record، وبعدين [[@Valid]] في الـ controller بيخلي Spring يفحص الـ body قبل ما ينادي الـ method. لو فيه غلط: 400 والـ method متتناديش أصلًا.

اتجرّب في مشروع Spring Boot 4.1.1 (JDK 25 في Docker) فيه starter [[spring-boot-starter-validation]]. الـ annotations كلها من package [[jakarta.validation.constraints]].

---

## ١. DTO الإنشاء

~~~java
public record CreateTaskRequest(
    @NotBlank @Size(max = 200) String title,
    @NotNull Long projectId) {}
~~~

- [[record]]: class بيشيل داتا بس (درس records). Jackson بيملاه من الـ JSON بأسماء الحقول.
- [[@NotBlank]]: النص مش [[null]]، ومش فاضي [[""]]، ومش مسافات بس [["   "]].
- [[@Size(max = 200)]]: الطول ٢٠٠ حرف بالكتير، زي العمود [[varchar(200)]] في الداتابيز. لو سبته، عنوان ٣٠٠ حرف هيعدّي الـ validation ويقع في الداتابيز بـ 500.
- [[@NotNull Long projectId]]: لازم موجود. لاحظ [[Long]] (wrapper) مش [[long]] (primitive): الـ primitive مستحيل يبقى [[null]]، فلو الحقل ناقص من الـ JSON هيبقى 0 و [[@NotNull]] مش هتشوف حاجة. الـ wrapper بيبقى [[null]] فيتمسك.
- [[{}]] في الآخر: جسم الـ record فاضي، مفيش methods زيادة.

---

## ٢. DTO تاني: التسجيل

~~~java
record SignupRequest(
    @NotBlank @Email String email,
    @Size(min = 8, max = 72) String password,
    @Min(13) int age) {}
~~~

- [[@Email]]: شكل إيميل صحيح. ([[null]] بيعدّي من [[@Email]] لوحدها، عشان كده معاها [[@NotBlank]].)
- [[@Size(min = 8, max = 72)]]: من ٨ لـ ٧٢. الـ ٧٢ عشان bcrypt (تشفير الباسوردات) بيتجاهل أي حاجة بعد ٧٢ byte.
- [[@Min(13)]]: رقم أكبر من أو يساوي ١٣. على [[int]] هنا عادي، لأن مش فارق معانا الفرق بين «مش موجود» و 0 (الاتنين أقل من ١٣).

جرّبنا الـ record ده على endpoint فيه [[@Valid]] بـ body كل حقوله غلط:

~~~bash
curl -i -X POST localhost:8080/api/tasks/signup-check -H "Content-Type: application/json" -d '{"email":"sara","password":"123","age":10}'
~~~

~~~text الناتج
HTTP/1.1 400
Content-Type: application/problem+json

{"detail":"Invalid request content.","instance":"/api/tasks/signup-check","status":400,"title":"Bad Request","errors":{"password":"size must be between 8 and 72","email":"must be a well-formed email address","age":"must be greater than or equal to 13"}}
~~~

التلات أخطاء مع بعض، مش أول واحد بس. والرسايل دي الافتراضية من Hibernate Validator (التنفيذ اللي Spring بيستخدمه)، وتقدر تغيّرها بـ [[message = "..."]] جوه أي annotation. (شكل الـ [[errors]] ده من الـ advice في الدرس الجاي.)

---

## ٣. [[@Valid]] في الـ controller

~~~java
@PostMapping
public ResponseEntity<TaskResponse> create(@Valid @RequestBody CreateTaskRequest req) {
  TaskResponse created = service.create(req);
  return ResponseEntity.created(URI.create("/api/tasks/" + created.id())).body(created);
}
~~~

- [[@RequestBody]]: حوّل الـ JSON لـ [[CreateTaskRequest]].
- [[@Valid]] قبلها: وبعد التحويل افحص الـ annotations اللي جوه. ولو فيه غلط، Spring بيرمي [[MethodArgumentNotValidException]] وبيرجع 400، والسطر اللي بعده مش بيتنفذ.
- لو وصلنا لـ [[service.create(req)]]، يبقى الشكل سليم أكيد.
- السطر الأخير: 201 و [[Location]] (الدرس اللي فات).

### من غير advice: شكل Spring الافتراضي

~~~text POST {"title":"","projectId":null}
HTTP/1.1 400
Content-Type: application/json

{"timestamp":"2026-10-07T17:43:18.489Z","status":400,"error":"Bad Request","path":"/api/tasks"}
~~~

الـ client مش هيعرف إيه الغلط. التفاصيل في اللوج بس: [[MethodArgumentNotValidException: Validation failed for argument ...]].

### مع الـ advice (اللي هنعمله في الدرس الجاي)

~~~text نفس الطلب
HTTP/1.1 400
Content-Type: application/problem+json

{"detail":"Invalid request content.","instance":"/api/tasks","status":400,"title":"Bad Request","errors":{"title":"must not be blank","projectId":"must not be null"}}
~~~

وطلب سليم:

~~~text POST {"title":"New task","projectId":1}
HTTP/1.1 201
Location: /api/tasks/10

{"id":10,"title":"New task","done":false,"project":"Website"}
~~~

---

## ٤. الـ try: من غير [[@Valid]]

عملنا نسخة من نفس الـ method بالظبط بس من غير [[@Valid]]، وبعتنا نفس الـ body:

~~~text {"title":"","projectId":null} من غير @Valid
HTTP/1.1 500
~~~

~~~text اللوج
Request processing failed: org.springframework.dao.InvalidDataAccessApiUsageException: The given id must not be null
~~~

الـ annotations موجودة على الـ record، بس محدش فحصها. الـ request وصل للـ service، و [[projects.findById(null)]] وقع. ومفيش أي تحذير وقت التشغيل إن [[@Valid]] ناقصة.

والأسوأ: [[{"title":"","projectId":2}]] من غير [[@Valid]]:

~~~text الناتج
HTTP/1.1 201
{"id":11,"title":"","done":false,"project":"Mobile"}
~~~

مهمة بعنوان فاضي اتحفظت، مع إن العمود [[title]] عليه [[NOT NULL]]. ليه؟ لأن [[""]] نص فاضي، مش [[NULL]]، فالداتابيز قبلته. [[@NotBlank]] هو اللي كان هيمسكه.

### الحقل ناقص مقابل النوع غلط

| الـ body | الرد | ليه |
|---|---|---|
| [[{"title":"x"}]] | [[400]] و [["errors":{"projectId":"must not be null"}]] | الـ JSON اتحوّل، و [[projectId]] بقى [[null]]، و [[@NotNull]] مسكته |
| [[{"title":"x","projectId":"abc"}]] | [[400]] و [["detail":"Failed to read request"]] من غير [[errors]] | Jackson فشل يحوّل [["abc"]] لـ [[Long]]، فالـ validation مااشتغلش أصلًا ([[HttpMessageNotReadableException]]) |

الاتنين 400، بس الأول خطأ في **القيم** والتاني خطأ في **شكل الـ JSON**.

---

## الخلاصة

| الـ annotation | بتفحص |
|---|---|
| [[@NotNull]] | مش [[null]] ([[""]] يعدّي) |
| [[@NotBlank]] | نص مش [[null]] ولا فاضي ولا مسافات |
| [[@Size(min, max)]] | طول نص أو حجم list |
| [[@Email]] | شكل إيميل |
| [[@Min]] و [[@Positive]] | رقم |

- من غير [[@Valid]] قبل [[@RequestBody]]، كل ده مبيشتغلش، ومن غير أي خطأ.
- استخدم [[Long]] و [[Integer]] مع [[@NotNull]]، مش [[long]] و [[int]].
- الـ validation بيرجع كل الأخطاء مرة واحدة، والقواعد اللي محتاجة داتابيز (الاسم متكرر؟) مكانها الـ service.`,
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

من غير [[@Valid]]: الـ request بيوصل للـ service، و [[findById(null)]] بيرمي [[InvalidDataAccessApiUsageException: The given id must not be null]] (يعني 500). والأسوأ: [[{"title":"","projectId":2}]] بيرجع 201 وبتتحفظ task بعنوان فاضي، حتى والعمود NOT NULL، لأن [[""]] نص فاضي مش NULL.

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
          teach: R`## الكود ده بيعمل إيه؟

حتتين: exception بتاعتنا اسمها [[NotFoundException]]، و class واحد اسمه [[ApiErrors]] بيمسك الـ exceptions من **كل** الـ controllers ويحوّلها لـ response بشكل واحد: [[ProblemDetail]]. فالـ controllers والـ services بيرموا exceptions بس، ومش بيفكروا في الـ status ولا شكل الـ JSON.

اتجرّب في مشروع Spring Boot 4.1.1 و JDK 25 في Docker، ومعاه PostgreSQL. وكل الأمثلة تحت ناتج [[curl -i]] حقيقي، قبل وبعد ما ضفنا [[ApiErrors]].

---

## ١. الـ exception بتاعتنا

~~~java
public class NotFoundException extends RuntimeException {
  public NotFoundException(String what, Object id) {
    super(what + " " + id + " not found");
  }
}
~~~

- [[extends RuntimeException]]: unchecked exception، يعني مش لازم أي method ترميها تكتب [[throws]] (درس checked و unchecked). وكمان [[@Transactional]] بيعمل rollback عليها لوحده.
- الـ constructor بياخد نوع الحاجة والـ id: [[new NotFoundException("task", 99)]].
- [[Object id]]: أي نوع ([[Long]] أو [[String]]...).
- [[super(...)]]: بينادي constructor الأب ([[RuntimeException]]) بالرسالة، فـ [[ex.getMessage()]] هترجع [["task 99 not found"]].

---

## ٢. [[@RestControllerAdvice]]: مكان واحد للأخطاء

~~~java
@RestControllerAdvice
public class ApiErrors extends ResponseEntityExceptionHandler {
~~~

- [[@RestControllerAdvice]]: الـ class ده «نصيحة» لكل الـ controllers: الـ methods اللي فيه عليها [[@ExceptionHandler]] بتشتغل لما أي controller يرمي exception. و «Rest» يعني اللي بترجعه بيتكتب في الـ body زي [[@RestController]].
- [[extends ResponseEntityExceptionHandler]]: class جاهز من Spring فيه handler لكل أخطاء Spring MVC المعروفة (JSON بايظ، ونوع غلط في الـ path، و method مش مسموحة...)، وكلهم بيرجعوا [[ProblemDetail]].

---

## ٣. handler للـ 404

~~~java
  @ExceptionHandler(NotFoundException.class)
  public ProblemDetail notFound(NotFoundException ex) {
    ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    pd.setTitle("Not Found");
    return pd;
  }
~~~

- [[@ExceptionHandler(NotFoundException.class)]]: الـ method دي للنوع ده (وأي class بيورث منه). [[.class]] معناها «الـ class نفسه» مش object منه.
- الباراميتر [[NotFoundException ex]]: الـ exception اللي اترمت، فنقدر نقرا رسالتها.
- [[ProblemDetail.forStatusAndDetail(status, detail)]]: بيعمل object بالـ status والـ detail. و [[HttpStatus.NOT_FOUND]] = 404.
- [[pd.setTitle("Not Found")]]: عنوان قصير ثابت للنوع ده من الأخطاء.
- [[return pd]]: Spring بيعرف إن [[ProblemDetail]] معناها: الـ status من جواه، والـ body هو هو بـ JSON.

قبل الـ advice:

~~~text PATCH /api/tasks/99/done
HTTP/1.1 500
Content-Type: application/json

{"timestamp":"2026-10-07T17:42:54.680Z","status":500,"error":"Internal Server Error","path":"/api/tasks/99/done"}
~~~

بعده:

~~~text PATCH /api/tasks/99/done
HTTP/1.1 404
Content-Type: application/problem+json

{"detail":"task 99 not found","instance":"/api/tasks/99/done","status":404,"title":"Not Found"}
~~~

### حقول الـ ProblemDetail (RFC 9457)

| الحقل | معناه | جه منين هنا |
|---|---|---|
| [[status]] | الـ HTTP status كرقم | [[HttpStatus.NOT_FOUND]] |
| [[title]] | وصف قصير لنوع الخطأ | [[setTitle]] |
| [[detail]] | شرح الحالة دي بالذات | رسالة الـ exception |
| [[instance]] | الـ path اللي حصل فيه الخطأ | Spring حطه لوحده |
| [[type]] | URI بيعرّف نوع الخطأ | مش ظاهر لأنه الافتراضي [[about:blank]] |

و [[Content-Type: application/problem+json]]: نوع مخصوص للأخطاء بالمعيار ده، فالـ client يعرف من الـ header إن ده خطأ.

---

## ٤. override للـ validation: نضيف [[errors]]

~~~java
  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
~~~

- [[@Override]]: بنعيد تعريف method موجودة في [[ResponseEntityExceptionHandler]]، اللي بتتنادى لما [[@Valid]] يفشل.
- [[protected]]: نفس الـ visibility بتاعة الأب. والـ signature (الباراميترات الأربعة) لازم زيه بالظبط، وإلا [[@Override]] هيطلّع خطأ compile.
- [[ResponseEntity<Object>]]: بترجع response كامل.

~~~java
    Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
        .collect(Collectors.toMap(e -> e.getField(), e -> e.getDefaultMessage(), (a, b) -> a));
~~~

من جوه لبرة:

1. [[ex.getBindingResult()]]: نتيجة الفحص كلها.
2. [[.getFieldErrors()]]: list فيها خطأ لكل حقل فشل (ممكن الحقل يبقى ليه أكتر من خطأ).
3. [[.stream().collect(Collectors.toMap(...))]]: حوّل الـ list لـ map:
  - [[e -> e.getField()]]: المفتاح اسم الحقل ([["title"]]).
  - [[e -> e.getDefaultMessage()]]: القيمة الرسالة ([["must not be blank"]]).
  - [[(a, b) -> a]]: لو نفس الحقل ظهر مرتين، خد الأولى. من غيرها [[toMap]] بيرمي [[IllegalStateException]] على المفتاح المتكرر.

~~~java
    ProblemDetail pd = ex.getBody();
    pd.setProperty("errors", errors);
    return ResponseEntity.badRequest().body(pd);
  }
}
~~~

- [[ex.getBody()]]: الـ ProblemDetail اللي Spring جهّزه أصلًا (400 و [["Invalid request content."]]).
- [[setProperty("errors", errors)]]: حقل زيادة. الـ RFC بيسمح بحقول إضافية، و Jackson بيكتبها جنب الحقول الأساسية.
- [[ResponseEntity.badRequest().body(pd)]]: 400 والـ body.

~~~text POST /api/tasks و {"title":"","projectId":null}
HTTP/1.1 400
Content-Type: application/problem+json

{"detail":"Invalid request content.","instance":"/api/tasks","status":400,"title":"Bad Request","errors":{"title":"must not be blank","projectId":"must not be null"}}
~~~

---

## ٥. اللي ورثناه ببلاش

من غير ما نكتب ولا سطر، الأخطاء دي بقت ProblemDetail لأننا ورثنا [[ResponseEntityExceptionHandler]]:

| الطلب | قبل | بعد |
|---|---|---|
| [[PATCH /api/tasks/abc/done]] | [[400]] بالشكل القديم | [[{"detail":"Failed to convert 'id' with value: 'abc'",...,"status":400}]] |
| [[PUT /api/tasks/1]] | [[405]] بالشكل القديم | [[{"detail":"Method 'PUT' is not supported.",...,"status":405,"title":"Method Not Allowed"}]] |
| body فيه [[{bad]] | [[400]] | [[{"detail":"Failed to read request","instance":"/api/tasks","status":400,"title":"Bad Request"}]] |

لاحظ إن الـ JSON البايظ مفيهوش تفاصيل Jackson ولا stack trace: الـ client ياخد كفاية يعرف إن الـ body غلط، ومفيش حاجة داخلية بتتسرب.

---

## ٦. الحل: [[ConflictException]] و 409

~~~java
public class ConflictException extends RuntimeException {
  public ConflictException(String message) { super(message); }
}
~~~

نفس فكرة [[NotFoundException]]، بس بياخد الرسالة جاهزة.

~~~java
@ExceptionHandler(ConflictException.class)
public ProblemDetail conflict(ConflictException ex) {
  return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
}
~~~

handler تاني في نفس [[ApiErrors]]. [[HttpStatus.CONFLICT]] = 409 («فيه تعارض مع الحالة الحالية»). ومن غير [[setTitle]]، Spring بيحط عنوان الـ status الافتراضي ([["Conflict"]]).

~~~java
@Transactional
public Project create(String name) {
  if (projects.findByName(name).isPresent())
    throw new ConflictException("project " + name + " already exists");
  return projects.save(new Project(name));
}
~~~

- في [[ProjectService]]: [[findByName]] بترجع [[Optional<Project>]] (درس JpaRepository)، و [[isPresent()]] يعني لقى واحد.
- لو موجود: ارمي الـ exception. الـ transaction بيعمل rollback، والـ advice بيحوّلها 409.
- لو لأ: احفظ ورجّع المشروع الجديد.

جرّبناه بـ endpoint بسيط [[POST /api/projects]] بيستقبل [[{"name":...}]] ويرجّع 201، ومشروع Website موجود من الـ seed:

~~~bash
curl -i -X POST localhost:8080/api/projects -H "Content-Type: application/json" -d '{"name":"Website"}'
~~~

~~~text الناتج
HTTP/1.1 409
Content-Type: application/problem+json

{"detail":"project Website already exists","instance":"/api/projects","status":409,"title":"Conflict"}
~~~

---

## ٧. اللي محدش مسكه

لو exception ملهاش handler (زي [[DataIntegrityViolationException]] من الداتابيز)، بتعدّي من الـ advice وتروح لـ [[/error]]، والـ client ياخد 500 بالشكل الافتراضي القديم:

~~~text الناتج
HTTP/1.1 500
Content-Type: application/json

{"timestamp":"...","status":500,"error":"Internal Server Error","path":"/api/projects/1/bad-add"}
~~~

عشان كده الـ sol بيقول ضيف handler لـ [[DataIntegrityViolationException]] يرجّع 409، و handler أخير لـ [[Exception.class]] يعمل log ويرجّع 500 برسالة عامة.

---

## الخلاصة

- الكود بيرمي exceptions ليها معنى ([[NotFoundException]] و [[ConflictException]])، و [[@RestControllerAdvice]] واحد بيحوّلها لـ status.
- [[@ExceptionHandler(X.class)]] بيرجّع [[ProblemDetail]]: [[status]] و [[title]] و [[detail]] و [[instance]]، و [[Content-Type: application/problem+json]].
- [[extends ResponseEntityExceptionHandler]] بيخلي أخطاء Spring نفسها (نوع غلط، JSON بايظ، 405) بنفس الشكل، و [[@Override]] لـ [[handleMethodArgumentNotValid]] بيضيف [[errors]] لكل حقل.
- أي exception من غير handler = 500 بالشكل القديم.`,
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
          teach: R`## الكود ده بيعمل إيه؟

جزء من ملف الإعدادات [[src/main/resources/application.yaml]]: إعداد لـ Spring نفسه (البورت)، وإعدادات بتاعتنا تحت اسم [[shop]]. وفي التعليقات تحت: record في Java بيتملي من الإعدادات دي لوحده، ويتفحص وقت ما التطبيق بيقوم.

اتجرّب في مشروع Spring Boot 4.1.1 و JDK 25 في Docker، وشغّلنا الـ jar بـ [[java -jar]] بـ env vars مختلفة.

---

## ١. YAML في سطرين

YAML (اختصار YAML Ain't Markup Language) طريقة لكتابة إعدادات متداخلة بالمسافات:

~~~yaml
server:
  port: 8081
~~~

- [[server:]] مفتاح، وتحته مسافتين يعني «جوه server».
- [[port: 8081]]: المفتاح الكامل [[server.port]] والقيمة 8081. ونفس السطر في ملف [[.properties]] كان هيبقى [[server.port=8081]].
- المسافات لازم spaces مش tabs، وعددها هو اللي بيحدد مين جوه مين.

[[server.port]] إعداد Spring Boot المعروف: البورت اللي Tomcat بيسمع عليه (الافتراضي 8080). شغّلنا بـ 8081:

~~~text اللوج
Tomcat initialized with port 8081 (http)
Tomcat started on port 8081 (http) with context path '/'
~~~

---

## ٢. إعداداتنا تحت [[shop]]

~~~yaml
shop:
  currency: EGP
  max-page-size: 50
  support-email: $__{SUPPORT_EMAIL:help@example.com}
~~~

- [[shop]] مش حاجة Spring يعرفها: ده **prefix** احنا اخترناه، وكل حاجة تحته بتاعتنا.
- [[currency: EGP]]: نص.
- [[max-page-size: 50]]: مكتوب **kebab-case** (كلمات بشرطة)، وده الشكل المفضل في الملفات.
- [[$__{SUPPORT_EMAIL:help@example.com}]]: **placeholder**. Spring بيدوّر على إعداد أو env var اسمه [[SUPPORT_EMAIL]]، ولو ملقاش بياخد اللي بعد [[:]] الأولى. يعني القيمة الافتراضية للتطوير، والإنتاج يحط الـ env var.
- [[# والـ Java:]] في المثال: [[#]] تعليق في YAML، والسطور دي مكانها ملفات Java مش الـ yaml.

---

## ٣. الـ record اللي بيقرا الإعدادات

~~~java
@Validated
@ConfigurationProperties(prefix = "shop")
public record ShopProperties(@NotBlank String currency, @Max(100) int maxPageSize, String supportEmail) {}
~~~

- [[@ConfigurationProperties(prefix = "shop")]]: املا الـ record ده من كل الإعدادات اللي تحت [[shop]]. كل حقل بيتربط بالإعداد اللي اسمه نفس الاسم.
- [[maxPageSize]] في Java (camelCase) و [[max-page-size]] في الـ yaml: ده **relaxed binding**، Spring بيعتبرهم نفس الإعداد.
- [[int maxPageSize]]: Spring بيحوّل النص [["50"]] لـ [[int]]. ولو القيمة مش رقم التطبيق مش بيقوم. جربنا [[SHOP_MAX_PAGE_SIZE=abc]]: [[APPLICATION FAILED TO START]] و [[Failed to bind properties under 'shop.max-page-size' to int]] و [[NumberFormatException: For input string: "abc"]].
- [[@Validated]]: شغّل الـ validation (نفس annotations درس Jakarta Validation) على الـ record ده وقت البداية.
- [[@NotBlank]] على العملة و [[@Max(100)]] على حجم الصفحة: قواعد على الإعدادات نفسها.

وعلى الـ main class:

~~~java
@SpringBootApplication
@ConfigurationPropertiesScan
public class TasksApplication { ... }
~~~

[[@ConfigurationPropertiesScan]]: دوّر في الـ packages على أي class عليه [[@ConfigurationProperties]] واعمله bean. من غيرها الـ record مش هيتعمل، وأي class بيطلبه في الـ constructor هيقع وقت البداية.

---

## ٤. الـ solCode: نقرا الإعدادات من endpoint

~~~java
@RestController
public class ConfigController {
    private final ShopProperties props;
    public ConfigController(ShopProperties props) { this.props = props; }

    @GetMapping("/api/config")
    public ShopProperties config() { return props; }
}
~~~

- [[ShopProperties]] بقى bean، فبيتحقن في الـ constructor زي أي service.
- [[config()]] بترجع الـ record نفسه، و Jackson بيحوّله JSON.

> في مشروع حقيقي متعرضش الإعدادات كلها في endpoint (ممكن يبقى فيها حاجات حساسة). هنا للتجربة بس.

---

## ٥. التجارب الـ ٣

### تشغيل عادي

~~~bash
java -jar target/tasks-0.0.1-SNAPSHOT.jar
curl localhost:8080/api/config
~~~

~~~text الناتج
{"currency":"EGP","maxPageSize":50,"supportEmail":"help@example.com"}
~~~

[[supportEmail]] أخد القيمة الافتراضية لأن مفيش env var.

### [[SHOP_MAX_PAGE_SIZE=500]]

~~~bash
SHOP_MAX_PAGE_SIZE=500 java -jar target/tasks-0.0.1-SNAPSHOT.jar
~~~

- [[SHOP_MAX_PAGE_SIZE=500]] قبل الأمر في bash: env var للأمر ده بس.
- اسم الـ env var: الـ prefix والاسم بحروف كبيرة، والنقط والشرط بقت [[_]]. ([[SHOP_MAXPAGESIZE]] من غير شرطة بيشتغل برضه، جربناه بـ 40 ورجع [["maxPageSize":40]].)

~~~text اللوج
***************************
APPLICATION FAILED TO START
***************************

Description:

Binding to target com.example.shop.ShopProperties failed:

    Property: shop.maxPageSize
    Value: "500"
    Origin: System Environment Property "SHOP_MAX_PAGE_SIZE"
    Reason: must be less than or equal to 100


Action:

Update your application's configuration
~~~

اقرا الرسالة سطر سطر:

| السطر | معناه |
|---|---|
| [[Binding to target ... failed]] | ملء الـ record ده فشل |
| [[Property: shop.maxPageSize]] | الإعداد اللي فيه المشكلة |
| [[Value: "500"]] | القيمة اللي جت |
| [[Origin: System Environment Property "SHOP_MAX_PAGE_SIZE"]] | جت منين بالظبط: env var، مش الـ yaml |
| [[Reason: must be less than or equal to 100]] | رسالة [[@Max(100)]] |

التطبيق مقامش أصلًا. أحسن بكتير من إنه يقوم ويقع أول ما حد يطلب صفحة.

### [[SHOP_MAX_PAGE_SIZE=30]] و [[SUPPORT_EMAIL]]

~~~text GET /api/config
{"currency":"EGP","maxPageSize":30,"supportEmail":"ops@example.com"}
~~~

الـ env var كسب على الـ 50 اللي في الـ yaml، و [[SUPPORT_EMAIL=ops@example.com]] ملا الـ placeholder.

---

## ٦. مين بيكسب؟

من الأعلى للأقل (الأعلى بيغطي على اللي تحته):

| المصدر | مثال |
|---|---|
| arguments للأمر | [[java -jar app.jar --shop.max-page-size=10]] |
| environment variables | [[SHOP_MAX_PAGE_SIZE=30]] |
| [[application-{profile}.yaml]] | الدرس الجاي |
| [[application.yaml]] | [[max-page-size: 50]] |

> في المشروع ده نفسه، رابط الداتابيز في الـ yaml [[localhost]]، وفي Docker بعتناه بـ env var [[SPRING_DATASOURCE_URL=jdbc:postgresql://teach-spring03-db:5432/tasks]]. نفس الـ jar، بيئة مختلفة، من غير build جديد.

---

## الخلاصة

- [[application.yaml]] فيه إعدادات Spring وإعداداتك، و [[$__{ENV_VAR:default}]] للقيم اللي بتيجي من البيئة.
- record عليه [[@ConfigurationProperties(prefix = ...)]] و [[@Validated]]، و [[@ConfigurationPropertiesScan]] على الـ main class.
- [[max-page-size]] في yaml = [[maxPageSize]] في Java = [[SHOP_MAX_PAGE_SIZE]] في الـ env.
- إعداد غلط = [[APPLICATION FAILED TO START]] ومعاه الإعداد والقيمة وجت منين.`,
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
          teach: R`## الكود ده بيعمل إيه؟

ملف [[application.yaml]] واحد فيه جزئين: إعدادات عامة لكل الحالات، وتحت [[---]] إعدادات بتتطبق **بس** لما الـ profile اللي اسمه [[dev]] يبقى شغال. في dev حجم الصفحة ٥ بدل ٥٠، ولوج الـ web مفصّل.

اتجرّب في نفس مشروع Spring Boot 4.1.1 (JDK 25 في Docker)، ومعاه controller المنتجات من درس ResponseEntity، اللي بياخد الأصغر بين [[size]] و [[shop.max-page-size]].

---

## ١. الجزء العام

~~~yaml
shop:
  max-page-size: 50
~~~

ده اللي بيتطبق دايمًا، سواء فيه profile أو لأ. (باقي إعدادات الدرس اللي فات زي العملة موجودة جنبه في الملف، شلناها من المثال للاختصار.)

---

## ٢. [[---]]: document جديد في نفس الملف

~~~yaml
---
~~~

في YAML، السطر ده بيقسم الملف لكذا **document** كأنهم ملفات منفصلة. Spring بيقرا الـ documents بالترتيب، واللي بعده بيغطي على اللي قبله لو اتطبق.

---

## ٣. شرط التفعيل

~~~yaml
spring:
  config:
    activate:
      on-profile: dev
~~~

المفتاح الكامل [[spring.config.activate.on-profile]]، كل كلمة مستوى:

- [[spring]] → [[config]] (إعدادات تحميل الإعدادات نفسها) → [[activate]] (إمتى الـ document ده يتفعل) → [[on-profile: dev]] (لما profile اسمه dev يبقى شغال).

فالـ document ده كله بيتجاهل لو dev مش شغال.

---

## ٤. إعدادات dev

~~~yaml
shop:
  max-page-size: 5
logging:
  level:
    org.springframework.web: debug
~~~

- [[max-page-size: 5]]: بيغطي على الـ 50. الحد الصغير بيخليك تجرّب الـ pagination بداتا قليلة.
- [[logging.level.<package>: debug]]: مستوى اللوج لـ package معين. [[org.springframework.web]] فيه الـ DispatcherServlet، و [[debug]] بيطبع تفاصيل كل request. المستويات من الأقل للأكتر كلام: [[ERROR]] و [[WARN]] و [[INFO]] (الافتراضي) و [[DEBUG]] و [[TRACE]].

---

## ٥. التفعيل والتجربة

٣ طرق تفعّل بيها profile:

| الطريقة | مثال |
|---|---|
| argument | [[java -jar app.jar --spring.profiles.active=dev]] |
| env var | [[SPRING_PROFILES_ACTIVE=dev java -jar app.jar]] |
| في التستات (من الـ docs) | [[@ActiveProfiles("dev")]] |

جربنا الاتنين الأولانيين، وأول اللوج في الحالتين:

~~~text اللوج
INFO ... com.example.TasksApplication : The following 1 profile is active: "dev"
~~~

وضفنا ٧ منتجات وطلبنا ٢٠:

~~~bash
curl "localhost:8080/api/products?size=20"
~~~

الرد فيه **٥** منتجات بس: [[Math.min(20, 5)]].

ولوج الـ debug بتاع الطلب ده:

~~~text اللوج (مقصوص)
DEBUG ... o.s.web.servlet.DispatcherServlet        : GET "/api/products?size=20", parameters={masked}
DEBUG ... s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to com.example.shop.ProductController#list(long, int)
DEBUG ... m.m.a.RequestResponseBodyMethodProcessor : Using 'application/json', given [*/*] and supported [application/json, application/*+json]
DEBUG ... o.s.web.servlet.DispatcherServlet        : Completed 200 OK
~~~

بيقولك الطلب، وراح لأنهي method، واتكتب بأنهي format، وخلص بكام. [[parameters={masked}]]: Spring بيخبّي قيم الباراميترات في اللوج افتراضيًا عشان ممكن يبقى فيها حاجات حساسة.

### من غير profile

~~~text اللوج
INFO ... com.example.TasksApplication : No active profile set, falling back to 1 default profile: "default"
~~~

ونفس الطلب بعد ٧ منتجات رجّع **السبعة**، لأن الحد 50، ومفيش ولا سطر DEBUG من [[org.springframework.web]].

---

## ٦. ملف منفصل بدل [[---]]

نفس الإعدادات ممكن تتحط في ملف اسمه [[application-dev.yaml]] جنب [[application.yaml]] (من غير [[on-profile]]: الاسم نفسه هو الشرط):

~~~yaml
shop:
  max-page-size: 5
~~~

الطريقتين بيعملوا نفس الحاجة حسب الـ docs (احنا جربنا طريقة [[---]] بس). الملف المنفصل أوضح لما الإعدادات تكتر.

---

## الخلاصة

- الـ profile اسم لمجموعة إعدادات، بيتفعّل بـ [[--spring.profiles.active=dev]] أو [[SPRING_PROFILES_ACTIVE=dev]].
- إعدادات الـ profile بتغطي على العامة، واللي مش مكتوب فيها بياخد العام.
- [[---]] مع [[spring.config.activate.on-profile]]، أو ملف [[application-dev.yaml]].
- أول سطر في اللوج بيقولك مين شغال: [[The following 1 profile is active: "dev"]] أو [[No active profile set]].`,
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
          try: R`شغّل المشروع وجرّب بـ [[curl -i]]: [[/actuator/health]] من غير token، و [[/api/tasks]] من غير token، و [[/actuator/metrics]] بـ token عادي (من الدرس الجاي). اكتب الـ status المتوقع لكل واحد قبل ما تجرّب. وبعدين شيل [["/error"]] من الـ permitAll، وابعت POST بـ body غلط، وبعدين request بيعمل exception محدش بيمسكها (500).`,
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
          teach: R`## الكود ده بيعمل إيه؟

class إعدادات فيه bean واحد: [[SecurityFilterChain]]، وده القواعد اللي كل request بيعدّي عليها قبل ما يوصل لأي controller: مين مفتوح للكل، ومين محتاج token، ومين محتاج صلاحية admin، والباقي ممنوع. وكمان بيقول إن الـ API بيقبل JWT ومن غير sessions.

اتجرّب في مشروع Spring Boot 4.1.1 (Spring Security 7) فيه [[spring-boot-starter-security]] و [[spring-boot-starter-security-oauth2-resource-server]] (ده اسمه في Boot 4) و actuator، على JDK 25 في Docker. الـ tokens اتعملت بسكربت Node بتاع الدرس الجاي.

---

## ٠. قبل الـ class: الافتراضي بتاع Boot

عملنا build من غير الـ class ده ومن غير resource server (security starter بس):

~~~text اللوج
Using generated security password: 19e687d7-de65-4a60-ad94-430ba63405f9

This generated password is for development use only. Your security configuration must be updated before running your application in production.
~~~

~~~text GET /api/tasks من غير حاجة
HTTP/1.1 401
WWW-Authenticate: Basic realm="Realm", charset="UTF-8"
~~~

وبـ [[curl -u "user:<الباسورد>"]] رجع 200. يعني كل حاجة مقفولة، ويوزر واحد اسمه [[user]] بباسورد بيتغير كل تشغيل. أمان افتراضي، بس مش اللي عايزه في API.

(ولو resource server موجود في الـ pom، Boot مبيعملش اليوزر ده خالص.)

---

## ١. الـ class

~~~java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
  @Bean
  SecurityFilterChain api(HttpSecurity http) throws Exception {
~~~

- [[@Configuration]]: class فيه تعريفات beans.
- [[@EnableMethodSecurity]]: شغّل [[@PreAuthorize]] على الـ methods (درس بعد الجاي). من غيرها الـ annotations دي بتتجاهل.
- [[@Bean]]: اللي الـ method بترجعه يبقى bean. ولما فيه [[SecurityFilterChain]] bean بتاعك، Boot بيلغي الإعداد الافتراضي اللي فوق.
- [[HttpSecurity http]]: builder بيبعته Spring، بنوصف عليه القواعد.
- [[throws Exception]]: [[http.build()]] معلنة إنها ممكن ترمي checked exception.

---

## ٢. القواعد بالترتيب

~~~java
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health/**", "/error").permitAll()
            .requestMatchers("/actuator/**").hasAuthority("SCOPE_admin")
            .requestMatchers("/api/**").authenticated()
            .anyRequest().denyAll())
~~~

- [[authorizeHttpRequests(auth -> auth ...)]]: lambda بتاخد object القواعد وبتضيف عليه بالـ chaining (كل [[.]] بترجع نفس الـ object).
- [[requestMatchers("...")]]: الـ paths اللي القاعدة دي ليها. [[**]] يعني أي حاجة بعدها مهما كان عمقها ([[/actuator/health/liveness]] مثلًا).
- [[permitAll()]]: مفتوح للكل حتى من غير token.
- [[hasAuthority("SCOPE_admin")]]: لازم token فيه صلاحية [[SCOPE_admin]] (الدرس الجاي بيشرح جت منين).
- [[authenticated()]]: أي token سليم.
- [[anyRequest().denyAll()]]: أي path مش مكتوب فوق: ممنوع.

القواعد بتتقري **من فوق لتحت، وأول واحدة تطابق بتكسب**. عشان كده [[/actuator/health/**]] قبل [[/actuator/**]]: لو العكس، الـ health كان هيطابق [[/actuator/**]] الأول ويبقى محتاج admin.

---

## ٣. باقي الإعدادات

~~~java
        .oauth2ResourceServer(rs -> rs.jwt(jwt -> {}))
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable());
    return http.build();
  }
}
~~~

- [[oauth2ResourceServer(rs -> rs.jwt(jwt -> {}))]]: الـ API «resource server»: بيقرا [[Authorization: Bearer <token>]] ويفحصه كـ JWT. [[jwt -> {}]] lambda فاضية = الإعدادات الافتراضية (الـ [[JwtDecoder]] bean بييجي من الدرس الجاي).
- [[SessionCreationPolicy.STATELESS]]: متعملش [[HttpSession]] ومتبعتش cookie. كل request لوحده ومعاه الـ token بتاعه. (لاحظ في الافتراضي فوق كان فيه [[Set-Cookie: JSESSIONID=...]]، هنا مفيش.)
- [[csrf.disable()]]: CSRF (Cross-Site Request Forgery) هجوم بيعتمد على إن المتصفح بيبعت الـ cookies لوحده. الـ API ده مش بيستخدم cookies للـ auth، فالحماية دي ملهاش لازمة هنا. جربنا نشيل السطر ده: POST بـ Bearer token عدّى عادي (201)، لأن الـ resource server بيستثني الطلبات اللي فيها Bearer token من فحص CSRF لوحده. بس POST **من غير** token رجع [[403]] بدل [[401]]: فحص CSRF رفضه قبل ما يوصل لسؤال «مين انت؟». فالسطر ده بيخلي الأخطاء صح وبيوضح النية.
- [[return http.build()]]: ابني الـ chain.

---

## ٤. الـ try: ٤ طلبات

### [[/actuator/health]] من غير token

~~~text الناتج
HTTP/1.1 200
Content-Type: application/vnd.spring-boot.actuator.v3+json

{"groups":["liveness","readiness"],"status":"UP"}
~~~

مفتوح، عشان Docker أو Kubernetes يسألوا عليه من غير token. و [[groups]]: الـ probes اللي Kubernetes بيستخدمها.

### [[/api/tasks]] من غير token

~~~text الناتج
HTTP/1.1 401
WWW-Authenticate: Bearer resource_metadata="http://localhost:5950/.well-known/oauth-protected-resource"
Content-Length: 0
~~~

- **401** = «مين انت؟»: مفيش authentication.
- [[WWW-Authenticate: Bearer]]: بيقول للـ client «ابعتلي Bearer token». و [[resource_metadata]] حاجة جديدة في Spring Security 7: رابط بيوصف الـ resource server ده (البورت 5950 لأن ده البورت اللي curl كلمه على الجهاز).

### [[/actuator/metrics]] بـ token فيه [[scope: "user"]] بس

~~~text الناتج
HTTP/1.1 403
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The request requires higher privileges than provided by the access token.", error_uri="https://tools.ietf.org/html/rfc6750#section-3.1"
~~~

- **403** = «عارفك، بس مش مسموحلك». الـ token سليم، بس مفيهوش [[SCOPE_admin]].
- [[insufficient_scope]]: الكود القياسي للحالة دي (RFC 6750). وبـ token فيه [[scope: "user admin"]] نفس الطلب رجع 200.

### path مش مكتوب ([[/other]])

| | الناتج |
|---|---|
| من غير token | [[401]] |
| بـ token سليم | [[403]] و [[insufficient_scope]] |

[[denyAll]] بيقول لأ للكل، بس لو انت مش معرّف أصلًا، الرد الأول «عرّف نفسك» (401).

---

## ٥. الـ try: شيلنا [["/error"]]

لما exception مش متمسكة تطلع من controller، الـ servlet بيعمل forward داخلي لـ [[/error]] عشان يكتب الرد. والـ forward ده بيعدّي على الـ security تاني. شيلنا [["/error"]] من الـ [[permitAll]] وجربنا:

| الطلب | مع [["/error"]] | من غيره |
|---|---|---|
| body فيه validation error | [[400]] و ProblemDetail | [[400]] و ProblemDetail |
| request بيعمل exception مش متمسكة (500) | [[500]] | [[403]] و body فاضي |

- الـ validation error مااتأثرش، لأن الـ advice ([[ResponseEntityExceptionHandler]]، درس ProblemDetail) مسكه، فعمره ما راح لـ [[/error]].
- الـ exception اللي محدش مسكها راحت لـ [[/error]]، و [[/error]] وقع تحت [[anyRequest().denyAll()]]، فالـ client أخد 403 مكان الـ 500 الحقيقي، ومن غير أي تفاصيل. وانت بتدوّر على مشكلة صلاحيات مش موجودة.

---

## الخلاصة

| الكود | المعنى | امتى |
|---|---|---|
| [[401]] | مين انت؟ | مفيش token أو token بايظ |
| [[403]] | مش مسموحلك | token سليم بس الصلاحية ناقصة |

- [[SecurityFilterChain]] bean بيلغي الافتراضي، والقواعد بالترتيب: الأخص فوق، و [[anyRequest().denyAll()]] في الآخر.
- [[permitAll]] للـ health و [[/error]]، و [[hasAuthority]] للـ actuator، و [[authenticated]] للـ API.
- API بـ tokens: [[STATELESS]] و [[csrf.disable()]].
- [[/error]] مقفول = أي 500 يبان 403.`,
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

[[/api/tasks]] من غير token: [[401]] ومعاه header [[WWW-Authenticate: Bearer resource_metadata="http://localhost:8080/.well-known/oauth-protected-resource"]] (الـ [[resource_metadata]] جديد في Spring Security 7).

[[/actuator/metrics]] بـ token من غير scope admin: [[403]]، والـ header بيقول [[error="insufficient_scope"]].

ولما شلنا [["/error"]]: الـ body الغلط فضل [[400]] و ProblemDetail، لأن الـ advice (ResponseEntityExceptionHandler) مسكه ومراحش لـ [[/error]] أصلًا. لكن الـ request اللي بيعمل exception مش متمسكة رجع [[403]] و body فاضي بدل [[500]]: الـ exception اتحوّلت لـ forward على [[/error]]، و [[/error]] وقع تحت [[anyRequest().denyAll()]]. ومن غير advice، حتى الـ validation error هيبقى 403 بنفس الطريقة.`
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
          teach: R`## الكود ده بيعمل إيه؟

حتتين: bean اسمه [[JwtDecoder]] بيعرف يفحص tokens موقّعة بمفتاح سري مشترك (HS256)، و endpoint [[/api/me]] بيرجّع مين صاحب الـ token وصلاحياته. ومعاهم الحل: سكربت Node صغير بيعمل tokens عشان نجرّب بيها.

اتجرّب في نفس مشروع Spring Boot 4.1.1 (Spring Security 7) بالـ [[SecurityFilterChain]] بتاع الدرس اللي فات، على JDK 25 في Docker، والسكربت اتشغّل بـ Node 24 على الجهاز.

---

## ١. شكل الـ JWT في سطرين

الـ JWT (JSON Web Token) ٣ حتت بينهم نقط: [[header.payload.signature]]. ده token حقيقي من السكربت:

~~~text الـ token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXJhIiwic2NvcGUiOiJ1c2VyIGFkbWluIiwiaWF0IjoxNzkxMzk2Njc4LCJleHAiOjE3OTE0MDAyNzh9.2DDGLk0w6UN3jL4FmJt-wdglsM0t9XGsEgk-IrQQmkE
~~~

أول حتتين JSON متحوّل base64url (مش تشفير، أي حد يفكّه):

~~~text بعد الفك
header:  {"alg":"HS256","typ":"JWT"}
payload: {"sub":"sara","scope":"user admin","iat":1791396678,"exp":1791400278}
~~~

والتالتة توقيع: HMAC-SHA256 للحتتين الأولانيين بالمفتاح السري. اللي معاه المفتاح بس يقدر يعمل توقيع صح.

---

## ٢. الـ [[JwtDecoder]]

~~~java
@Bean
JwtDecoder jwtDecoder(AppProperties props) {
  SecretKey key = new SecretKeySpec(props.jwtSecret().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
  return NimbusJwtDecoder.withSecretKey(key).build();
}
~~~

- [[@Bean JwtDecoder]]: الـ [[oauth2ResourceServer(rs -> rs.jwt(...))]] في الـ chain بيدوّر على bean من النوع ده عشان يفحص بيه كل token. مكانه في [[SecurityConfig]].
- [[AppProperties props]]: record إعدادات (درس [[@ConfigurationProperties]]) في المشروع شكله [[record AppProperties(@Size(min = 32) String jwtSecret)]] بـ prefix [[app]]، والـ yaml فيه [[jwt-secret: $__{JWT_SECRET:...}]]. والـ [[@Size(min = 32)]] عشان مفتاح HS256 أقل من ٣٢ byte ضعيف.
- من جوه لبرة:
  - [[props.jwtSecret()]]: المفتاح كنص.
  - [[.getBytes(StandardCharsets.UTF_8)]]: حوّله bytes بترميز UTF-8 (لازم نفس الترميز اللي السكربت بيستخدمه).
  - [[new SecretKeySpec(bytes, "HmacSHA256")]]: لفّ الـ bytes كمفتاح Java لخوارزمية HMAC-SHA256.
- [[NimbusJwtDecoder.withSecretKey(key).build()]]: decoder جاهز من Spring (مبني على مكتبة Nimbus) بيتأكد من التوقيع، و [[exp]] (انتهى؟) و [[nbf]] (بدأ؟).

---

## ٣. [[/api/me]]

~~~java
@GetMapping("/api/me")
public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
  return Map.of("user", jwt.getSubject(), "scopes", jwt.getClaimAsString("scope"));
}
~~~

- [[@AuthenticationPrincipal Jwt jwt]]: Spring بيحقن الـ token اللي اتفحص خلاص، كـ object [[Jwt]].
- [[jwt.getSubject()]]: الـ claim [[sub]] (مين اليوزر).
- [[jwt.getClaimAsString("scope")]]: الـ claim [[scope]] كنص.
- [[Map.of(...)]]: map مش بتتعدّل، و Jackson بيحوّلها object.

~~~bash
TOKEN=$(node jwt.js "user admin")
curl -s localhost:8080/api/me -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج
{"scopes":"user admin","user":"sara"}
~~~

[[Map.of]] مش بيضمن ترتيب، عشان كده [[scopes]] طلعت الأول.

وكمان: الـ [[scope]] [["user admin"]] Spring بيقسمه بالمسافات ويضيف [[SCOPE_]] قبل كل واحدة، فاليوزر ده معاه authorities [[SCOPE_user]] و [[SCOPE_admin]]. وده اللي [[hasAuthority("SCOPE_admin")]] بيدوّر عليه.

---

## ٤. السطور اللي في التعليق: issuer-uri

~~~yaml
spring.security.oauth2.resourceserver.jwt.issuer-uri: https://auth.example.com/realms/shop
~~~

في الإنتاج غالبًا الـ tokens بيعملها auth server (Keycloak مثلًا) بمفتاح خاص (RS256)، والـ API بياخد المفتاح العام بس. بالسطر ده بدل الـ bean، Spring بيجيب المفاتيح العامة من الـ issuer ويفحص [[iss]] كمان. (ده من الـ docs، مجربناهوش لأنه محتاج auth server.)

---

## ٥. الحل: [[jwt.js]] سطر سطر

~~~javascript
const c = require('crypto');
const b = o => Buffer.from(JSON.stringify(o)).toString('base64url');
~~~

- [[crypto]]: موديول Node المدمج للتشفير. من غير مكتبات.
- [[b]]: function بتحوّل object لـ JSON نص، وبعدين bytes ([[Buffer.from]])، وبعدين base64url (زي base64 بس من غير [[+]] و [[/]] و [[=]] عشان ينفع في URL).

~~~javascript
const scope = process.argv[2] || 'user';
const now = Math.floor(Date.now() / 1000);
~~~

- [[process.argv]] array فيها الأمر نفسه، وعنصرها رقم 2: أول argument بعد اسم السكربت ([["user admin"]])، ولو مفيش: [['user']].
- [[Date.now()]] بالـ milliseconds، و JWT بيستخدم ثواني، فبنقسم على ١٠٠٠ ونقرّب لتحت.

~~~javascript
const h = b({ alg: 'HS256', typ: 'JWT' }), p = b({ sub: 'sara', scope, iat: now, exp: now + 3600 });
~~~

- الـ header والـ payload. [[scope]] لوحدها = [[scope: scope]]. [[iat]] (issued at) دلوقتي، و [[exp]] بعد ساعة (٣٦٠٠ ثانية).

~~~javascript
const s = c.createHmac('sha256', process.env.JWT_SECRET || 'change-me-change-me-change-me-32bytes!!')
  .update(h + '.' + p).digest('base64url');
console.log(h + '.' + p + '.' + s);
~~~

- [[createHmac('sha256', key)]]: HMAC بالمفتاح، من env var [[JWT_SECRET]] أو نفس القيمة الافتراضية اللي في yaml التطبيق.
- [[.update(h + '.' + p)]]: الحاجة اللي بتتوقّع: الـ header والـ payload بالنقطة.
- [[.digest('base64url')]]: النتيجة بنفس الترميز.
- واطبع الـ ٣ حتت.

والسطرين اللي في التعليق: [[TOKEN=$(node jwt.js user)]] بيحط ناتج السكربت في متغير bash، وبعدين curl بيبعته في [[Authorization: Bearer $TOKEN]].

---

## ٦. الـ try: tokens بايظة

كلهم على [[GET /api/tasks]]، والـ header [[WWW-Authenticate]] بالظبط:

| الـ token | الرد | [[error_description]] |
|---|---|---|
| سليم، scope user | [[200]] والمهام | |
| حرف متغير في آخر التوقيع | [[401]] | [[An error occurred while attempting to decode the Jwt: Signed JWT rejected: Invalid signature]] |
| اتعمل بـ [[JWT_SECRET]] تاني | [[401]] | نفس [[Invalid signature]] |
| [[exp]] من ساعة | [[401]] | [[An error occurred while attempting to decode the Jwt: Jwt expired at 2026-10-07T16:51:41Z]] |
| [[alg: none]] من غير توقيع | [[401]] | [[Unsupported algorithm of none]] |
| [[abc]] | [[401]] | [[An error occurred while attempting to decode the Jwt: Malformed token]] |

والـ header كامل لواحد منهم:

~~~text الناتج
HTTP/1.1 401
WWW-Authenticate: Bearer error="invalid_token", error_description="An error occurred while attempting to decode the Jwt: Signed JWT rejected: Invalid signature", error_uri="https://tools.ietf.org/html/rfc6750#section-3.1", resource_metadata="http://localhost:5950/.well-known/oauth-protected-resource"
~~~

- [[error="invalid_token"]]: الكود القياسي لأي token بايظ.
- [[alg: none]] هجوم معروف: token بيقول «مفيش توقيع، صدّقني». الـ decoder رفضه لوحده.
- والـ scope user على [[DELETE /api/tasks/1]]: [[403]] (الدرس الجاي).

---

## الخلاصة

- الـ JWT = header و payload (مقروءين لأي حد) وتوقيع. متحطش أسرار في الـ payload.
- [[JwtDecoder]] bean بـ [[NimbusJwtDecoder.withSecretKey]] لـ HS256، أو [[issuer-uri]] مع auth server حقيقي.
- [[@AuthenticationPrincipal Jwt]] بيدّيك الـ claims، والـ [[scope]] بيبقى [[SCOPE_...]] authorities.
- أي token بايظ (توقيع، أو انتهى، أو [[alg: none]]) = 401 و [[invalid_token]] ومعاه السبب.`,
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
          teach: R`## الكود ده بيعمل إيه؟

method اتنين في الـ services عليهم [[@PreAuthorize]]: الأولى مسح مهمة، مسموحة للـ admin بس. والتانية تعديل بروفايل يوزر، مسموحة لصاحب البروفايل نفسه أو للـ admin. الفحص بيحصل **قبل** ما الـ method تتنفذ، مهما كان مين اللي ناداها (controller أو job أو service تاني).

اتجرّب في نفس مشروع Spring Boot 4.1.1 (Spring Security 7)، و [[SecurityConfig]] عليه [[@EnableMethodSecurity]] (درس SecurityFilterChain)، والـ tokens من [[jwt.js]] (الدرس اللي فات): [[sub: "sara"]] و [[scope]] يا [["user"]] يا [["user admin"]].

---

## ١. المسح للـ admin بس

~~~java
@PreAuthorize("hasAuthority('SCOPE_admin')")
@Transactional
public void delete(long id) {
  if (!tasks.existsById(id)) throw new NotFoundException("task", id);
  tasks.deleteById(id);
}
~~~

- [[@PreAuthorize("...")]]: «قبل ما تنفّذ، اتأكد من الشرط ده». الشرط مكتوب بـ SpEL (Spring Expression Language): لغة تعبيرات صغيرة جوه النص.
- [[hasAuthority('SCOPE_admin')]]: اليوزر الحالي معاه الـ authority دي؟ الـ [['...']] علامات تنصيص مفردة لأن النص كله جوه [["..."]] بتاعة Java.
- [[@Transactional]]: transaction عادي (درس @Transactional). الاتنين proxies حوالين نفس الـ bean، والفحص بيحصل قبل ما الـ method تبدأ.
- [[if (!tasks.existsById(id)) throw ...]]: [[!]] نفي. لو مش موجودة: 404 من الـ advice.
- [[tasks.deleteById(id)]]: المسح.

### التجربة على [[DELETE /api/tasks/1]]

~~~bash
curl -i -X DELETE localhost:8080/api/tasks/1 -H "Authorization: Bearer $(node jwt.js user)"
~~~

~~~text scope user
HTTP/1.1 403
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The request requires higher privileges than provided by the access token.", error_uri="https://tools.ietf.org/html/rfc6750#section-3.1"
Content-Length: 0
~~~

قواعد الـ URL عدّت ([[/api/**]] محتاج أي token، والـ token سليم)، والـ controller اتنادى، بس [[@PreAuthorize]] رمت [[AccessDeniedException]] قبل أول سطر في [[delete]]، و Spring Security حوّلها 403. ومفيش ولا SQL في اللوج: الـ method متنفذتش خالص.

~~~text scope "user admin"
HTTP/1.1 204
~~~

~~~text نفس الطلب تاني بـ admin
HTTP/1.1 404
Content-Type: application/problem+json

{"detail":"task 1 not found","instance":"/api/tasks/1","status":404,"title":"Not Found"}
~~~

الصلاحية عدّت، فالـ method اتنفذت، و [[existsById]] رجع false.

ومن غير token خالص: [[401]]، بس دي من قواعد الـ URL قبل ما نوصل للـ method أصلًا.

---

## ٢. اليوزر يعدّل نفسه بس

~~~java
@PreAuthorize("#userId == authentication.name or hasAuthority('SCOPE_admin')")
public ProfileResponse updateProfile(String userId, UpdateProfile body) {
  return profiles.update(userId, body);
}
~~~

افتح التعبير:

| الحتة | معناها |
|---|---|
| [[#userId]] | باراميتر الـ method اللي اسمه [[userId]]. الـ [[#]] في SpEL = متغير |
| [[authentication]] | اليوزر الحالي ([[JwtAuthenticationToken]] هنا) |
| [[authentication.name]] | اسمه، ومع JWT ده الـ [[sub]] |
| [[==]] | بيساوي |
| [[or hasAuthority('SCOPE_admin')]] | أو معاه صلاحية admin |

يعني: «الـ userId اللي عايز تعدّله هو انت، أو انت admin». و [[#userId]] بيشتغل لأن Spring Boot بيعمل compile بـ [[-parameters]] فأسماء الباراميترات بتفضل موجودة.

جرّبناه بـ service صغير بيرجع اللي اتبعت، و endpoint [[PUT /api/users/{userId}/profile]]:

| الـ token | الطلب | الرد |
|---|---|---|
| sara، scope user | [[/api/users/sara/profile]] | [[200]] و [[{"userId":"sara","displayName":"Sara A."}]] |
| sara، scope user | [[/api/users/omar/profile]] | [[403]] و [[insufficient_scope]] |
| sara، scope admin | [[/api/users/omar/profile]] | [[200]] و [[{"userId":"omar","displayName":"Omar"}]] |

ده بيقفل ثغرة IDOR (Insecure Direct Object Reference): يوزر بيغيّر id في الـ URL ويعدّل بيانات حد تاني.

---

## ٣. الـ try: job من غير يوزر

عملنا [[ApplicationRunner]] (كود بيشتغل مرة لما التطبيق يقوم، زي job) بينادي [[taskService.delete(9)]]:

~~~text اللوج
JOB: org.springframework.security.authentication.AuthenticationCredentialsNotFoundException: An Authentication object was not found in the SecurityContext
~~~

- مفيش request، فمفيش token، فالـ [[SecurityContext]] فاضي.
- [[@PreAuthorize]] مش بيقول «مفيش يوزر يبقى مسموح»: بيرمي exception. المهمة متمسحتش.
- الحل: الـ job ينادي method داخلية من غير [[@PreAuthorize]] (في service تاني)، أو يحط Authentication لـ system user قبل النداء.

---

## الخلاصة

- [[@PreAuthorize("...")]] على method في الـ service، ولازم [[@EnableMethodSecurity]] على class إعدادات.
- [[hasAuthority('SCOPE_admin')]] للصلاحيات، و [[#param == authentication.name]] لـ «صاحب الحاجة بس».
- الرفض = [[AccessDeniedException]] = 403 والـ method متنفذتش. ومن غير يوزر خالص (job) = [[AuthenticationCredentialsNotFoundException]].
- قواعد الـ URL للخطوط العريضة، و [[@PreAuthorize]] للقواعد اللي جوه الـ business، والاتنين مع بعض.`,
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
    }
]);
