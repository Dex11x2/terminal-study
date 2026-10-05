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

من غير [[@Valid]]: الـ request بيوصل للـ service، و [[findById(null)]] بيرمي exception (غالبًا 500)، أو أسوأ: task بعنوان فاضي بتتحفظ لو مفيش NOT NULL في الداتابيز.

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
          sol: R`مع [[validate]] والجدول مطابق: التطبيق بيقوم عادي. ولما تغيّر [[title]] لـ [[name]]: التطبيق مش بيقوم، والخطأ فيه [[Schema-validation: missing column [name] in table [task]]]. ده بالظبط اللي عايزه: الغلط بان وقت البداية على جهازك.

مع [[update]] كان Hibernate هيضيف عمود [[name]] جديد جنب [[title]] القديم (مش هيغيّر الاسم)، وممكن يفشل لو فيه صفوف والعمود NOT NULL، و [[title]] القديم هيفضل بالداتا بتاعته. في الإنتاج دي كارثة صغيرة محدش هياخد باله منها. الـ migrations بتخليك تكتب [[ALTER TABLE task RENAME COLUMN title TO name;]] بنفسك وتتراجع قبل ما تتنفذ.`
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

[[select t1_0.id, t1_0.created_at, t1_0.done, t1_0.project_id, t1_0.title from task t1_0 where upper(t1_0.title) like upper(?) escape '\']]

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
            how: R`الـ lazy collection بتتحمّل أول مرة تلمسها، بـ SELECT لوحده. [[join fetch]] بيعمل [[LEFT JOIN]] في SQL ويملا الـ collections من نفس النتيجة. [[distinct]] في JPQL عشان كل project ميتكررش مرة لكل task (في Hibernate 6+ ده بيحصل لوحده في الـ entities، بس كتابته بتوضح النية).

[[@EntityGraph]] نفس النتيجة من غير ما تكتب JPQL، ومفيد مع derived queries.

القيود: [[join fetch]] على collection مع pagination: Hibernate مش هيقدر يعمل LIMIT في SQL (لأن كل project بقى كذا صف)، فبيجيب كله ويقسّم في الذاكرة مع warning [[firstResult/maxResults specified with collection fetch; applying in memory]]. وجلب اتنين collections (bags) بـ join fetch في query واحد بيرمي [[MultipleBagFetchException]].

الحلول التانية: [[hibernate.default_batch_fetch_size]] (مثلًا 50) بيحوّل N queries لـ N/50 query بـ [[WHERE id IN (...)]]، ودا حل عام كويس. أو DTO projection: [[select new com.example.TaskRow(t.id, t.title, p.name) from Task t join t.project p]] بيجيب الأعمدة اللي محتاجها بس.`,
            when: R`كل endpoint بيرجع list وكل عنصر فيها بيعرض بيانات من علاقة. اتعوّد تبص على عدد الـ queries في اللوج لكل endpoint جديد، أو تكتب test بيعد الـ statements.`,
            mistakes: R`تحل N+1 بـ EAGER: هتجيب العلاقة في كل حتة حتى اللي مش محتاجاها، والـ N+1 بيفضل موجود في [[findAll]]. و [[join fetch]] مع [[Pageable]] على collection من غير ما تاخد بالك من الـ warning. وتفتكر إن N+1 بيحصل بس في الـ collections: [[task.getProject().getName()]] لكل task برضه N+1.`
          },
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
          sol: R`مع [[@Transactional]]: اللوج فيه [[update task set done=?, project_id=?, title=? where id=?]] بعد الـ select، من غير أي save. ده الـ dirty checking: Hibernate قارن الـ entity بالنسخة اللي حمّلها ولقى [[done]] اتغير.

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
          try: R`شغّل المشروع وجرّب بـ [[curl -i]]: [[/actuator/health]] من غير token، و [[/api/tasks]] من غير token، و [[/actuator/metrics]] بـ token عادي (من الدرس الجاي). اكتب الـ status المتوقع لكل واحد قبل ما تجرّب. وبعدين شيل [["/error"]] من الـ permitAll وابعت POST بـ body غلط.`,
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

[[/api/tasks]] من غير token: [[401]] ومعاه header [[WWW-Authenticate: Bearer]].

[[/actuator/metrics]] بـ token من غير scope admin: [[403]]، والـ header بيقول [[error="insufficient_scope"]].

ولما شلنا [["/error"]] وبعتنا body غلط: بدل [[400]] رجع [[403]] وbody فاضي. الـ validation error اتحوّل لـ forward على [[/error]]، و [[/error]] وقع تحت [[anyRequest().denyAll()]]. (لو الـ advice بيمسك الخطأ ده بـ ResponseEntityExceptionHandler، مش هتشوف المشكلة لأنه مش بيوصل لـ [[/error]] أصلًا، بس أي exception مش متمسك هيوصل.)`
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
