// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
          teach: R`## الإعداد ده بيعمل إيه؟

بيفتح ٤ endpoints من Actuator على HTTP: [[health]] (التطبيق كويس؟)، و [[info]]، و [[metrics]] (أرقام)، و [[prometheus]] (نفس الأرقام بصيغة Prometheus)، ويفعّل health groups اسمهم liveness و readiness. وبعدين نسأل التطبيق بـ [[curl]].

اتشغّل كله على التطبيق الحقيقي: الـ image بتاعة درس Docker الجاي، شغالة مع Postgres بـ docker compose، والبورت على الجهاز [[5955]] بدل [[8080]] (فالأوامر تحت فيها [[localhost:5955]]). والـ dependency: [[spring-boot-starter-actuator]] و [[micrometer-registry-prometheus]] (اختارناهم من start.spring.io باسم [[actuator]] و [[prometheus]]).

---

## ١. الـ YAML سطر سطر

~~~text application.yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true
~~~

- [[management:]]: كل إعدادات Actuator تحت الكلمة دي.
- [[endpoints.web.exposure.include]]: مين يتعرض على HTTP (الـ [[web]] عكس [[jmx]]). افتراضيًا [[health]] بس. القايمة مفصولة بـ [[,]] من غير مسافات.
- [[endpoint.health.probes.enabled: true]]: لاحظ [[endpoint]] مفرد هنا: إعدادات endpoint واحد. ده بيعمل groups [[liveness]] و [[readiness]] تحت [[/actuator/health/]]. Boot بيعملهم لوحده لو حس إنه في Kubernetes، والسطر ده بيعملهم في أي مكان (Docker مثلًا).

---

## ٢. [[curl localhost:8080/actuator/health]]

~~~bash
curl -i localhost:5955/actuator/health
~~~

[[-i]] بيطبع الـ headers كمان:

~~~text الناتج
HTTP/1.1 200
Content-Type: application/vnd.spring-boot.actuator.v3+json

{"groups":["liveness","readiness"],"status":"UP"}
~~~

- [[status: UP]]: كل الـ health indicators تمام: [[db]] (عمل query بسيط على Postgres)، و [[diskSpace]]، و [[ping]].
- [[groups]]: الـ groups اللي [[probes.enabled]] عملهم.
- التفاصيل (مين UP ومين DOWN) مش ظاهرة، لأن [[show-details]] افتراضيًا [[never]]. ده كويس: الـ endpoint ده مفتوح للكل في الـ security بتاعتنا ([[permitAll()]] على [[/actuator/health/**]]).

---

## ٣. [[curl localhost:8080/actuator/health/readiness]]

~~~text الناتج
$ curl -s localhost:5955/actuator/health/readiness
{"status":"UP"}
$ curl -s localhost:5955/actuator/health/liveness
{"status":"UP"}
~~~

| الـ group | السؤال | لو DOWN، الـ orchestrator بيعمل إيه |
|---|---|---|
| liveness | التطبيق عايش ولا معلّق؟ | restart للـ container |
| readiness | جاهز ياخد requests؟ | يبطّل يبعتله traffic لحد ما يرجع UP |

---

## ٤. [[curl .../actuator/prometheus -H "Authorization: Bearer $ADMIN_TOKEN"]]

القاعدة في [[SecurityConfig]]: [[/actuator/**]] محتاج [[SCOPE_admin]]. فنجرّب ٣ مرات:

~~~text النتيجة (ملخّص الـ status لكل مرة)
من غير token          ← 401 و WWW-Authenticate: Bearer ...
token فيه scope=user  ← 403
token فيه "user admin" ← 200
~~~

- [[-H "Authorization: Bearer ..."]]: [[-H]] بيضيف header. الـ token عملناه بـ [[jwt.js]] من درس «JWT resource server» ([[node jwt.js "user admin"]]).
- [[$ADMIN_TOKEN]]: متغير shell فيه الـ token (في bash: [[ADMIN_TOKEN=$(node jwt.js "user admin")]]، وفي PowerShell: [[$ADMIN_TOKEN = node jwt.js "user admin"]]).

وأول سطور الرد:

~~~text الناتج
# HELP application_ready_time_seconds Time taken for the application to be ready to service requests
# TYPE application_ready_time_seconds gauge
application_ready_time_seconds{main_application_class="com.example.tasks.TasksApiApplication"} 7.249
~~~

صيغة Prometheus: [[# HELP]] شرح، و [[# TYPE]] النوع ([[gauge]] رقم بيطلع وينزل، [[counter]] بيزيد بس)، وبعدين [[اسم{labels} قيمة]]. هنا التطبيق خد ٧.٢ ثانية لحد ما بقى جاهز.

---

## ٥. التجربة: [[/actuator/metrics/http.server.requests]]

بعد ٤ requests على [[/api/tasks]] بـ token:

~~~text الناتج
{"availableTags":[{"tag":"exception","values":["none"]},{"tag":"method","values":["GET"]},{"tag":"error","values":["none"]},{"tag":"uri","values":["/actuator/health","/api/tasks","UNKNOWN","/actuator/health/**","/actuator/prometheus"]},{"tag":"outcome","values":["CLIENT_ERROR","SUCCESS"]},{"tag":"status","values":["401","200","403"]}],"baseUnit":"seconds","measurements":[{"statistic":"COUNT","value":11.0},{"statistic":"TOTAL_TIME","value":0.5118769839999999},{"statistic":"MAX","value":0.170517811}],"name":"http.server.requests"}
~~~

- [[measurements]]: [[COUNT]] عدد الـ requests كلها (١١)، و [[TOTAL_TIME]] مجموع وقتهم بالثواني، و [[MAX]] أبطأ واحد (١٧٠ms، غالبًا أول request).
- [[availableTags]]: الأبعاد اللي تقدر تفلتر بيها. [[UNKNOWN]] في الـ uri: requests اترفضت من الـ security قبل ما توصل لـ controller.

فلتر بـ [[?tag=]]:

~~~text الناتج
$ curl -s "localhost:5955/actuator/metrics/http.server.requests?tag=uri:/api/tasks&tag=status:200" -H "Authorization: Bearer $A"
{...,"measurements":[{"statistic":"COUNT","value":4.0},{"statistic":"TOTAL_TIME","value":0.137448122},{"statistic":"MAX","value":0.115113181}],...}
~~~

٤ requests ناجحة على [[/api/tasks]]. وفي [[/actuator/prometheus]] نفس الداتا:

~~~text الناتج (مقتطفات)
http_server_requests_seconds_count{error="none",exception="none",method="GET",outcome="SUCCESS",status="200",uri="/api/tasks"} 4
http_server_requests_seconds_count{error="none",exception="none",method="GET",outcome="CLIENT_ERROR",status="401",uri="UNKNOWN"} 2
jvm_threads_live_threads 23.0
hikaricp_connections_active{pool="HikariPool-1"} 0.0
~~~

النقطة في [[http.server.requests]] بقت [[_]]، وزاد [[_seconds_count]]. و [[hikaricp_connections_active 0]]: مفيش connection مشغولة دلوقتي (الـ pool بيرجّعها بعد كل request).

---

## ٦. التجربة: وقّفنا Postgres

~~~bash
docker compose stop db
~~~

~~~text الناتج (المسار، والـ body، والـ status بين [ ])
/actuator/health            {"groups":["liveness","readiness"],"status":"DOWN"}  [503]
/actuator/health/liveness   {"status":"UP"}  [200]
/actuator/health/readiness  {"status":"UP"}  [200]
~~~

- الـ health العام DOWN و 503، لأن indicator الـ [[db]] فشل.
- liveness و readiness فضلوا UP: الاتنين افتراضيًا بيبصوا على حالة التطبيق الداخلية بس. وده صح للـ liveness (restart مش هيصلّح الداتابيز). أما الـ readiness فلو عايزها تقع مع الداتابيز: [[management.endpoint.health.group.readiness.include: readinessState,db]].
- بعد [[docker compose start db]] بـ ٦ ثواني، [[/actuator/health]] رجع [[UP]] و 200 لوحده.

---

## الخلاصة

| الـ endpoint | بيرجّع | مين يطلبه |
|---|---|---|
| [[/actuator/health]] | UP/DOWN للكل (503 لو DOWN) | انت والـ monitoring |
| [[/actuator/health/liveness]] | عايش؟ | Kubernetes / Docker healthcheck |
| [[/actuator/health/readiness]] | جاهز للـ traffic؟ | load balancer / Kubernetes |
| [[/actuator/metrics/<name>]] | metric واحد بالـ tags | انت وانت بتحقق |
| [[/actuator/prometheus]] | كل الـ metrics بصيغة Prometheus | Prometheus كل كام ثانية |

- [[include]] بالأسامي، عمرك ما تكتب [["*"]] على بورت مفتوح.
- الـ health مفتوح من غير تفاصيل، والباقي بـ [[SCOPE_admin]].`,
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
          teach: R`## الـ Dockerfile ده بيعمل إيه؟

بياخد الـ jar اللي [[mvnw package]] عمله، يفكّه لـ ٤ طبقات (المكتبات لوحدها وكودك لوحده)، ويبني منهم image صغيرة فيها JRE بس، بتشتغل بيوزر عادي مش root، والـ heap بيتظبط على حجم ذاكرة الـ container.

اتجرّب كله: الـ jar اتعمل بـ [[mvn package -DskipTests]] في [[maven:3.9-eclipse-temurin-25]]، والـ image اتبنت بنفس الـ Dockerfile ده بالحرف ([[docker build -t teach-spring04-app .]])، واتشغّلت مع Postgres بـ docker compose.

---

## ١. الـ stage الأول: فك الـ jar

~~~text السطور
FROM eclipse-temurin:25-jre AS extract
WORKDIR /build
COPY target/*.jar app.jar
RUN java -Djarmode=tools -jar app.jar extract --layers --launcher --destination extracted
~~~

- [[FROM eclipse-temurin:25-jre]]: ابدأ من image فيها Java 25 **JRE** بس (بيشغّل Java، مبيعملش compile). Eclipse Temurin توزيعة OpenJDK مجانية.
- [[AS extract]]: سمّي الـ stage ده [[extract]]. ده **multi-stage build**: الـ stage ده مؤقت، ومش هيبقى في الـ image النهائية غير اللي هننسخه منه بالاسم.
- [[WORKDIR /build]]: اعمل الفولدر ده وادخله (زي [[mkdir -p]] و [[cd]] مع بعض).
- [[COPY target/*.jar app.jar]]: انسخ الـ jar من جهازك (من فولدر [[target]]) باسم ثابت. الـ [[*]] عشان اسم الـ jar فيه الإصدار ([[tasks-api-0.0.1-SNAPSHOT.jar]]).
- السطر الطويل، حتة حتة:

| الحتة | معناها |
|---|---|
| [[java -jar app.jar]] | شغّل الـ jar |
| [[-Djarmode=tools]] | [[-D]] بيحط system property. [[jarmode=tools]] بيخلي Spring Boot يشغّل «أدوات الـ jar» بدل التطبيق نفسه |
| [[extract]] | الأداة: فك الـ jar |
| [[--layers]] | فكّه لطبقات، كل طبقة في فولدر |
| [[--launcher]] | خلّي الناتج يشتغل بالـ launcher بتاع Boot (مش [[java -jar]]) |
| [[--destination extracted]] | حط الناتج في فولدر [[extracted]] |

جربناه على نفس الـ jar، وده اللي طلع:

~~~text الناتج
extracted/application:           BOOT-INF  META-INF   180K
extracted/dependencies:          BOOT-INF             61M
extracted/snapshot-dependencies:                      4.0K
extracted/spring-boot-loader:    org                  676K
~~~

المكتبات (Spring و Hibernate و Tomcat و Postgres driver...) ٦١ ميجا، وكودك كله ١٨٠ كيلو. و [[snapshot-dependencies]] فاضية لأن مفيش مكتبات [[-SNAPSHOT]] في المشروع. وترتيب الطبقات من الأقل تغيير للأكتر: [[java -Djarmode=tools -jar app.jar list-layers]] بيطبع [[dependencies]] ثم [[spring-boot-loader]] ثم [[snapshot-dependencies]] ثم [[application]].

---

## ٢. الـ stage التاني: الـ image النهائية

~~~text السطور
FROM eclipse-temurin:25-jre
RUN useradd --system --uid 10001 spring
USER spring
WORKDIR /app
~~~

- [[FROM]] تاني: بداية نضيفة من نفس الـ JRE. أي حاجة عملناها في [[extract]] (الـ jar الأصلي مثلًا) مش هنا.
- [[useradd --system --uid 10001 spring]]: اعمل يوزر لينكس اسمه [[spring]]. [[--system]] يوزر نظام (من غير home ولا login)، و [[--uid 10001]] رقمه ثابت.
- [[USER spring]]: كل اللي بعد كده (والتطبيق نفسه) يشتغل باليوزر ده مش root. لو حد لقى ثغرة في التطبيق، مش هيبقى root جوه الـ container. اتأكدنا:

~~~text الناتج
$ docker run --rm --entrypoint sh teach-spring04-app -c id
uid=10001(spring) gid=999(spring) groups=999(spring)
~~~

---

## ٣. نسخ الطبقات بالترتيب

~~~text السطور
COPY --from=extract /build/extracted/dependencies/ ./
COPY --from=extract /build/extracted/spring-boot-loader/ ./
COPY --from=extract /build/extracted/snapshot-dependencies/ ./
COPY --from=extract /build/extracted/application/ ./
~~~

- [[--from=extract]]: انسخ من الـ stage اللي اسمه [[extract]] مش من جهازك.
- [[./]]: لجوه [[/app]] (الـ WORKDIR).
- كل [[COPY]] بيعمل **layer** في الـ image. و Docker بيكاش كل layer: لو اللي داخل فيها متغيرش، بياخدها من الكاش ومبيعملهاش تاني.
- الترتيب مهم: الأقل تغيير الأول. المكتبات بتتغير لما تغيّر [[pom.xml]] بس، وكودك بيتغير كل commit.

أحجام الطبقات من [[docker history teach-spring04-app]]:

~~~text الناتج (مقتطف)
188kB   COPY /build/extracted/application/ ./
4.1kB   COPY /build/extracted/snapshot-dependencies/
696kB   COPY /build/extracted/spring-boot-loader/ ./
63.5MB  COPY /build/extracted/dependencies/ ./
~~~

---

## ٤. التشغيل

~~~text السطور
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "org.springframework.boot.loader.launch.JarLauncher"]
~~~

- [[EXPOSE 8080]]: توثيق إن التطبيق بيسمع على 8080. مبيفتحش بورت؛ الفتح بـ [[-p]] أو [[ports:]] في compose.
- [[ENTRYPOINT [...]]]: الأمر اللي بيشتغل لما الـ container يقوم. الشكل ده (array) اسمه exec form: Java بيبقى process رقم 1 ويستلم إشارة الإيقاف من Docker مباشرة، فالتطبيق يقفل بنضافة.
- [[org.springframework.boot.loader.launch.JarLauncher]]: الـ class اللي جاي من طبقة [[spring-boot-loader]]. بيلاقي [[BOOT-INF/classes]] و [[BOOT-INF/lib]] ويشغّل الـ main بتاعك.
- [[-XX:MaxRAMPercentage=75]]: أقصى heap = ٧٥٪ من ذاكرة الـ container. جربناه بـ [[docker run -m 512m]] (حد ٥١٢ ميجا):

~~~text الناتج
مع  -XX:MaxRAMPercentage=75   MaxHeapSize = 402653184   (384 MiB)
من غيره                        MaxHeapSize = 134217728   (128 MiB)
~~~

الافتراضي ٢٥٪ بس، يعني ٣٨٤ ميجا من الـ container مش مستخدمة للـ heap. والـ ٢٥٪ الباقية في حالة الـ ٧٥ رايحة للـ metaspace والـ threads والـ native memory.

---

## ٥. البناء والحجم

~~~text الناتج
$ docker images teach-spring04-app
IMAGE                       ID             DISK USAGE   CONTENT SIZE
teach-spring04-app:latest   a59c335c54d4        606MB          177MB
~~~

[[CONTENT SIZE]] (١٧٧ ميجا) هو اللي بيتنقل في الـ push والـ pull: الـ JRE والـ Ubuntu الصغيرة اللي تحته وطبقاتنا. و [[DISK USAGE]] حجمها وهي مفكوكة على الديسك.

---

## ٦. التجربة: compose

الـ compose اللي في الحل بالظبط، مع ٣ فروق: صورة [[postgres:16-alpine]] اللي عندنا، و image اسمها [[teach-spring04-app]]، والبورت [[5955:8080]]:

~~~text الناتج
 Container teach-spring04-db-1 Started
 Container teach-spring04-db-1 Waiting
 Container teach-spring04-db-1 Healthy
 Container teach-spring04-api-1 Starting
 Container teach-spring04-api-1 Started
~~~

[[Waiting]] ثم [[Healthy]]: ده [[condition: service_healthy]] شغال، الـ api استنى لحد ما [[pg_isready]] نجح. ولوج الـ api:

~~~text من اللوج
The following 1 profile is active: "prod"
Database: jdbc:postgresql://db:5432/tasks (PostgreSQL 16.13)
Successfully applied 2 migrations to schema "public", now at version v2
Started TasksApiApplication in 7.138 seconds (process running for 7.744)
~~~

- [[SPRING_PROFILES_ACTIVE: prod]] بقى [[spring.profiles.active=prod]]، و [[SPRING_DATASOURCE_URL]] غيّر الـ URL. ده relaxed binding: الـ env var بحروف كبيرة و [[_]] مكان النقط.
- [[db:5432]]: اسم الـ service في compose هو اسم الـ host جوه الشبكة.

و [[curl localhost:5955/actuator/health/readiness]] رجّع [[{"status":"UP"}]].

---

## ٧. التجربة: غيّرنا سطر وعملنا build تاني

غيّرنا مسار في controller، و [[mvn package]]، و [[docker build --progress=plain]]:

~~~text الناتج (مقتطف)
#7 [extract 3/4] COPY target/*.jar app.jar
#7 DONE 0.3s
#8 [extract 4/4] RUN java -Djarmode=tools -jar app.jar extract --layers --launcher --destination extracted
#8 DONE 1.3s
#11 [stage-1 4/7] COPY --from=extract /build/extracted/dependencies/ ./
#11 CACHED
#12 [stage-1 5/7] COPY --from=extract /build/extracted/spring-boot-loader/ ./
#12 CACHED
#13 [stage-1 6/7] COPY --from=extract /build/extracted/snapshot-dependencies/ ./
#13 CACHED
#14 [stage-1 7/7] COPY --from=extract /build/extracted/application/ ./
#14 DONE 0.1s
~~~

الـ stage الأول اتعمل تاني (الـ jar اتغير)، بس في الـ stage التاني الـ ٦٣ ميجا [[CACHED]]، وطبقة [[application]] (١٨٨ كيلو) هي اللي اتعملت بس. فالـ push الجاي ١٨٨ كيلو مش ٦٤ ميجا.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[FROM ...-jre AS extract]] | stage مؤقت لفك الـ jar |
| [[extract --layers --launcher]] | ٤ طبقات بدل jar واحد |
| [[USER spring]] | متشتغلش root |
| ٤ [[COPY --from=extract]] | الأقل تغيير الأول عشان الكاش |
| [[JarLauncher]] | يشغّل التطبيق من الطبقات |
| [[-XX:MaxRAMPercentage=75]] | الـ heap على قد الـ container |

- JRE مش JDK في الـ image النهائية.
- الأسرار ([[DB_PASSWORD]] و [[JWT_SECRET]]) في env وقت التشغيل، مش في الـ Dockerfile.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيشغّل ١٠٠٠٠ مهمة، كل واحدة بتستنى ٢٠٠ms (زي query أو HTTP call)، كل مهمة على virtual thread لوحدها. لو كانوا ورا بعض كانوا هياخدوا ٢٠٠٠ ثانية، ومع virtual threads بيخلصوا في حوالي ٢٠٠ms، لأنهم كلهم بيستنوا في نفس الوقت.

اتشغّل بـ [[java Vt.java]] (ملف واحد من غير compile، من Java 11، ومن غير class من Java 25) في [[maven:3.9-eclipse-temurin-25]]، على جهاز الـ JVM شايف فيه ١٦ core.

---

## ١. الـ imports و [[main]]

~~~text السطور
import java.time.*;
import java.util.concurrent.*;

void main() throws Exception {
~~~

- [[java.time.*]]: فيها [[Instant]] (لحظة زمنية) و [[Duration]] (مدة).
- [[java.util.concurrent.*]]: فيها [[ExecutorService]] و [[Executors]] و [[Future]].
- [[List]] و [[ArrayList]] مش محتاجين import: الملف ده «compact source file» (Java 25)، وده بيعمل import لـ [[java.base]] كله لوحده. والـ imports اللي فوق مش ضرورية بنفس المنطق، بس بتوضح الأنواع جاية منين.
- [[void main()]] من غير [[class]] ولا [[public static]]: ده بردو من Java 25.
- [[throws Exception]]: [[f.get()]] تحت بيرمي checked exceptions ([[InterruptedException]] و [[ExecutionException]]).

---

## ٢. [[Instant start = Instant.now();]]

بنسجّل الوقت قبل البداية عشان نحسب المدة في الآخر.

---

## ٣. الـ executor

~~~text السطر
    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
~~~

- [[ExecutorService]]: حاجة بتاخد منك مهام ([[submit]]) وتشغّلها على threads.
- [[Executors.newVirtualThreadPerTaskExecutor()]]: executor بيعمل **virtual thread جديد لكل مهمة**. مفيش pool ولا حد أقصى.
- [[try (...)]]: try-with-resources (من درس الـ exceptions). من Java 19 الـ [[ExecutorService]] بيعمل [[AutoCloseable]]، و [[close()]] بتاعه **بيستنى** كل المهام تخلص قبل ما يقفل. فلما نخرج من الـ [[{ }]]، كل الـ ١٠٠٠٠ خلصوا.

---

## ٤. اللوب

~~~text السطور
        List<Future<Integer>> results = new ArrayList<>();
        for (int i = 0; i < 10_000; i++) {
            int n = i;
            results.add(executor.submit(() -> {
                Thread.sleep(Duration.ofMillis(200));
                return n;
            }));
        }
~~~

- [[Future<Integer>]]: «إيصال» بنتيجة لسه مجتش. المهمة هترجع [[Integer]]، و [[Future]] بيشيل مكانها لحد ما تخلص.
- [[10_000]]: الـ [[_]] جوه الرقم للقراية بس، زي ١٠,٠٠٠.
- [[int n = i;]]: الـ lambda مينفعش تستخدم [[i]] لأنه بيتغير ([[i++]]). الـ lambda بتمسك متغيرات **effectively final** بس (اتعيّنت مرة ومتغيرتش)، فبنعمل نسخة جديدة [[n]] في كل لفة.
- [[executor.submit(() -> {...})]]: سلّم المهمة، ويرجعلك [[Future]] على طول من غير ما يستنى.
- [[Thread.sleep(Duration.ofMillis(200))]]: نام ٢٠٠ms. ده blocking: لو كان platform thread، كان هيفضل محجوز وهو نايم. الـ virtual thread بقى لما ينام، الـ JVM بيشيله من الـ carrier thread (الـ OS thread الحقيقي) ويحفظه في الـ heap، والـ carrier يشغّل virtual thread تاني.
- [[return n;]]: نتيجة المهمة.

---

## ٥. تجميع النتايج

~~~text السطور
        long sum = 0;
        for (var f : results) sum += f.get();
        IO.println("sum=" + sum);
    }
~~~

- [[f.get()]]: استنى النتيجة دي (لو جاهزة بترجع على طول).
- [[long]] مش [[int]]: احتياط من الـ overflow (هنا [[int]] كانت هتكفي).
- [[IO.println]]: طريقة الطباعة الجديدة في Java 25 (بدل [[System.out.println]]).

~~~text الناتج
sum=49995000
~~~

مجموع من 0 لـ 9999 = ٩٩٩٩ × ١٠٠٠٠ ÷ ٢ = ٤٩٩٩٥٠٠٠. يعني كل المهام رجعت.

---

## ٦. الوقت

~~~text السطر
    IO.println("took ~" + Duration.between(start, Instant.now()).toMillis() / 100 * 100 + "ms");
~~~

من جوه لبرة: [[Duration.between(start, Instant.now())]] المدة من البداية لدلوقتي، و [[.toMillis()]] بالمللي ثانية، و [[/ 100 * 100]] قسمة صحيحة ثم ضرب فبيقرّب لتحت لأقرب ١٠٠ (مثلًا ٢٧٣ تبقى ٢٠٠) عشان الناتج ميتغيرش كل مرة.

~~~text الناتج (مرتين ورا بعض)
took ~200ms
took ~200ms
~~~

١٠٠٠٠ × ٢٠٠ms نوم، وخلصوا في أقل من ٣٠٠ms.

---

## ٧. virtual thread لوحده

~~~text السطور
    Thread t = Thread.ofVirtual().start(() -> IO.println("virtual? " + Thread.currentThread().isVirtual()));
    t.join();
~~~

- [[Thread.ofVirtual()]]: builder لـ virtual thread، و [[.start(...)]] بيشغّله على طول.
- [[Thread.currentThread().isVirtual()]]: الـ thread اللي أنا شغال عليه دلوقتي virtual؟
- [[t.join()]]: استنى الـ thread يخلص. من غيرها [[main]] ممكن يخلص والبرنامج يقفل قبل ما السطر يتطبع (الـ virtual threads daemon).

~~~text الناتج
virtual? true
~~~

---

## ٨. التجربة: [[newFixedThreadPool(200)]]

نفس الكود، بس الـ executor ٢٠٠ platform thread:

~~~text الناتج
sum=49995000
took ~10000ms
virtual? true
~~~

١٠٠٠٠ ÷ ٢٠٠ = ٥٠ دفعة، كل دفعة ٢٠٠ms = ١٠ ثواني. الـ threads نايمة ومش بتعمل حاجة، بس محجوزة. ده بالظبط وضع Tomcat الافتراضي (٢٠٠ thread) لما الـ requests كلها مستنية داتابيز.

---

## ٩. في Spring Boot

سطر واحد: [[spring.threads.virtual.enabled=true]]. شغّلنا الـ image بتاعة درس Docker مرتين وبصينا على اسم الـ thread في سطر الـ SQL في اللوج:

~~~text الناتج
virtual=false  [nio-8080-exec-1] org.hibernate.SQL : select t1_0.id,t1_0.done,...
virtual=true   [omcat-handler-0] org.hibernate.SQL : select t1_0.id,t1_0.done,...
~~~

اللوج بيقص اسم الـ thread لآخر ١٥ حرف: الأول [[http-nio-8080-exec-1]] (platform thread من الـ pool بتاع Tomcat)، والتاني [[tomcat-handler-0]] (virtual thread لكل request).

---

## الخلاصة

| | platform threads | virtual threads |
|---|---|---|
| مين بيديرها | نظام التشغيل | الـ JVM |
| التكلفة | تقيلة (stack ثابت) | خفيفة جدًا |
| العدد المعقول | مئات | مئات الآلاف |
| وهو بيستنى I/O | محجوز | بيفضّي الـ carrier |
| الكود | blocking عادي | نفس الكود |

- بتزوّد عدد اللي **بيستنوا** مع بعض، مش سرعة كل واحد.
- متعملش pool من virtual threads: واحد لكل مهمة.
- الحد الحقيقي بيبقى الداتابيز (الـ connection pool)، مش الـ threads.`,
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
    }
]);
