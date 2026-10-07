// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
    }
]);
