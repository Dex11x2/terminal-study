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
    }
]);
