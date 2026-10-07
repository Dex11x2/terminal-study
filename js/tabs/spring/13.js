// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
