// ملف إضافي لتاب diag: الحقول نفس شكلها في 01.js.

MORE("diag", [
    {
      t: "قبل ما يقع: الأرقام و Prometheus",
      l: 2,
      n: "بدل ما تعرف من اليوزر إن الموقع واقع: التطبيق يطلّع أرقامه، و Prometheus يسحبها كل ١٥ ثانية، وانت تسأل بـ PromQL «من إمتى؟ وقد إيه؟»",
      items: [
        {
          cmd: "logs و metrics و traces",
          title: "٣ أنواع بيانات: إيه اللي حصل، وقد إيه، والوقت راح فين",
          desc: R`الـ logs سطر لكل حدث فيه التفاصيل («الطلب ده فشل عشان الـ payment gateway»)، والـ metrics أرقام بتتجمع مع الوقت («١١ طلب فشلوا من ٤٨٦٦، و p95 بقى ٤٧٠ مللي»)، والـ traces رحلة طلب واحد بين الخدمات («٤٠٠ مللي منهم في الـ query دي»). كل نوع بيجاوب سؤال مختلف.

المراقبة قبل ما الحاجة تقع معناها metrics وتنبيهات عليها، لأنها رخيصة وحجمها ثابت مهما الترافيك زاد. والـ logs والـ traces هي اللي بتفتحها بعد ما التنبيه يوصل عشان تعرف السبب.`,
          example: R`# Linux and Mac:
docker logs b3d-api --tail 2
docker logs b3d-api 2>&1 | grep -c '"level":"error"'
curl -s localhost:3000/metrics | grep 'status="500"'
# Windows (PowerShell):
(docker logs b3d-api 2>&1 | Select-String '"level":"error"').Count
curl.exe -s localhost:3000/metrics | Select-String 'status="500"'`,
          try: R`شغّل الـ lab بتاع الدرسين الجايين («prom-client» فيه [[server.js]]، و «Prometheus targets» فيه [[compose.yaml]])، وعدّ الـ 500 مرة من اللوج ومرة من الـ metric وقارن الرقمين. وبعدين فكّر: لو عايز «نسبة الأخطاء كل دقيقة في آخر ٢٤ ساعة»، هتعملها إزاي من اللوج، وإزاي من الـ metric؟`,
          deep: {
            why: R`لو عندك logs بس: عشان تعرف نسبة الأخطاء لازم تقرا كل السطور وتعدّ، ومع مليون طلب في اليوم ده بطيء وغالي، والتنبيه عليه كل دقيقة أصعب. ولو عندك metrics بس: هتعرف إن فيه 500 بتزيد ومن الساعة كام، بس مش هتعرف ليه. ولو عندك traces بس: هتشوف طلب بطيء بالتفصيل، بس مش هتعرف هو واحد من مليون ولا كل الطلبات كده. التلاتة مع بعض: الـ metric يصحّيك، والـ trace يقولك فين، واللوج يقولك إيه.`,
            how: R`الـ metric = اسم + labels + رقم، والـ Prometheus بياخد قيمته كل ١٥ ثانية مثلًا. عدد الأرقام اللي بتتخزن بيعتمد على عدد التركيبات (series) مش على عدد الطلبات: Counter فيه ٣ قيم لـ status بيفضل ٣ أرقام سواء جالك ١٠٠ طلب ولا مليون.

الـ log سطر لكل حدث، فحجمه بيكبر مع الترافيك. وعشان يتعدّ أو يتدوّر فيه بيتبعت لحاجة زي Loki أو Elasticsearch، أو بتقراه بـ [[docker logs]] و [[journalctl]] على السيرفر نفسه.

الـ trace مجموعة spans لطلب واحد، كل span ليه وقت بداية ونهاية، وبيتبعت بـ OpenTelemetry لـ backend زي Jaeger أو Tempo. وغالبًا بياخد عيّنة (sampling) من الطلبات مش كلها، لأنه أتقل من الاتنين. شوف درسي «trace و span» و «OpenTelemetry في Node» في تاب السحابة.`,
            when: R`أول ما التطبيق يبقى عليه يوزرز: metrics للأرقام الأساسية (الطلبات والأخطاء والوقت) وتنبيه أو اتنين، ولوج منظم (JSON) فيه request id. والـ traces لما يبقى عندك أكتر من خدمة والطلب بيعدّي بينهم ومش عارف البطء من مين.`,
            mistakes: R`تحط user id أو request id أو الإيميل كـ label في metric: ده مكانه اللوج، وفي الـ metric كل قيمة جديدة = series جديدة (درس «prom-client» فيه الأرقام). وتعمل التنبيهات على [[grep]] في اللوج. وتفتكر إن الـ metric هيقولك السبب: هو بيقولك «فيه حاجة غلط من الساعة كام»، والسبب في اللوج. وتسيب اللوج نص حر من غير JSON، فتعدّ بـ grep على جملة ممكن تتغيّر.`
          },
          teach: R`## الفكرة: نفس العطل من ٣ زوايا

كل الأوامر دي اتشغّلت على الـ lab بتاع القسم ده: تطبيق Node صغير اسمه [[b3d-api]] (الكود في درس «prom-client») بيرد على [[/users/:id]] و [[/checkout]]، وواحد في المية من طلبات [[/checkout]] بيرجّع 500 ويكتب سطر لوج، ومعاه container بيبعتله حوالي ١٣ طلب في الثانية. اتشغّل على Docker Desktop (ويندوز 11)، والأوامر من Git Bash ومن pwsh 7.6 و Windows PowerShell 5.1.

---

## ١. اللوج: [[docker logs b3d-api --tail 2]]

[[docker logs]] بيطبع اللي التطبيق كتبه على الـ stdout، و [[--tail 2]] آخر سطرين بس.

~~~text الناتج
{"time":"2026-10-28T00:39:17.386Z","level":"error","route":"/checkout","msg":"payment gateway timeout"}
{"time":"2026-10-28T00:39:37.085Z","level":"error","route":"/checkout","msg":"payment gateway timeout"}
~~~

كل سطر حدث واحد بتفاصيله: الوقت بالظبط، والـ route، والسبب ([[payment gateway timeout]]). ده اللي هتحتاجه وانت بتدوّر على **ليه**. ومكتوب JSON عشان أي أداة تقدر تقراه خانة خانة.

### عدّ الأخطاء من اللوج

~~~bash
docker logs b3d-api 2>&1 | grep -c '"level":"error"'
~~~

- [[2>&1]] ابعت الـ stderr (رقم 2) لنفس مكان الـ stdout (رقم 1)، عشان [[docker logs]] بيطبع الاتنين وعايزين نعدّهم مع بعض.
- [[grep -c]] بدل ما يطبع السطور بيطبع عددهم ([[c]] = count).
- [[-c '"level":"error"']] الكلام بين single quotes عشان الـ double quotes اللي جواه توصل لـ grep زي ما هي.

~~~text الناتج
3
~~~

---

## ٢. الـ metric: [[curl -s localhost:3000/metrics | grep 'status="500"']]

التطبيق فاتح صفحة [[/metrics]] فيها عدّادات (الدرس الجاي بيشرحها). [[curl -s]] بيجيبها من غير شريط التحميل ([[s]] = silent)، و [[grep]] بيطلّع سطر الـ 500 بس:

~~~text الناتج (نفس اللحظة)
http_requests_total{method="POST",route="/checkout",status="500"} 3
~~~

نفس الإجابة: ٣. بس الفرق في الطريقة:

| | اللوج | الـ metric |
|---|---|---|
| عشان تعرف العدد | تقرا كل السطور وتعدّ | الرقم جاهز، سطر واحد |
| ١٠٠٠ خطأ كمان | ١٠٠٠ سطر زيادة | نفس السطر، الرقم بقى 1003 |
| يقولك ليه؟ | أيوه: [[msg]] | لأ، يقولك كام بس |
| مين بيستخدمه | انت وانت بتحقق | Prometheus كل ١٥ ثانية، والتنبيهات |

صفحة [[/metrics]] كلها كانت ١٢٬٨٤٩ byte وفيها ٤٦ سطر [[http_request...]] بعد ٤٨٦٦ طلب، ولو بقوا مليون هتفضل تقريبًا نفس الحجم. واللوج لو كتب سطر لكل طلب (مش الأخطاء بس) هيبقى مليون سطر.

> الرقم في الـ metric بيبدأ من الصفر كل ما التطبيق يعمل restart، واللوج كمان (مع [[docker logs]] بيرجع لأول الـ container). عشان كده Prometheus بيخزن الأرقام بتاريخها بره التطبيق، و [[rate()]] بيفهم إن العداد رجع صفر (درس «PromQL»).

---

## ٣. الـ trace: الطلب ده الوقت راح فين؟

الـ metric قال إن p95 لـ [[/checkout]] حوالي ٤٧٠ مللي. طب الوقت ده في الكود ولا في قاعدة البيانات ولا في الـ payment API؟ ده سؤال الـ trace: طلب واحد متقسّم spans بأوقاتها. مش في الـ lab ده، وشرحه كامل ومتجرّب في تاب السحابة: «trace و span» و «OpenTelemetry في Node»، وإزاي تحط الـ trace id في سطر اللوج عشان تنط من واحد للتاني في «trace id في اللوج».

---

## ٤. ويندوز

~~~powershell
(docker logs b3d-api 2>&1 | Select-String '"level":"error"').Count
curl.exe -s localhost:3000/metrics | Select-String 'status="500"'
~~~

- [[Select-String]] هو grep بتاع PowerShell، و [[( ... ).Count]] عدد السطور اللي لقاها.
- [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اختصار لـ [[Invoke-WebRequest]]، و [[curl.exe]] هو curl الحقيقي اللي جاي مع ويندوز 10 و 11.

النتيجة في pwsh 7.6 و Windows PowerShell 5.1 واحدة: [[3]] وبعدها نفس سطر الـ metric. و pwsh بيلوّن الكلمة اللي لقاها بس.

---

## الخلاصة

| السؤال | النوع | أدوات |
|---|---|---|
| فيه مشكلة؟ من إمتى؟ قد إيه؟ | metrics | Prometheus و Grafana، CloudWatch |
| حصل إيه بالظبط للطلب ده؟ | logs | [[docker logs]] و [[journalctl]]، Loki، Elasticsearch |
| الطلب البطيء ده الوقت راح فين؟ | traces | OpenTelemetry مع Jaeger أو Tempo |

التنبيهات واللوحات على الـ metrics. واللوج والـ trace بتفتحهم بعد التنبيه.`,
          lines: [
            "آخر سطرين لوج: كل سطر حدث بتفاصيله (الوقت والـ route والسبب).",
            "عدّ سطور الأخطاء في اللوج كله (بيقرا كل السطور).",
            "نفس الإجابة من الـ metric: سطر واحد فيه العدد جاهز.",
            "ويندوز: نفس العدّ من اللوج بـ Select-String.",
            "ويندوز: سطر الـ 500 من /metrics (curl.exe مش اختصار PowerShell)."
          ],
          sol: R`الرقمين لازم يبقوا زي بعض لو اللوج والـ metric بدأوا مع نفس تشغيل التطبيق: عندي طلعوا [[3]] و [[3]]. لو التطبيق اتعمله restart، [[docker logs]] بيطبع لوج التشغيلة القديمة كمان والعداد بدأ من الصفر، فاللوج هيبقى أكبر.

نسبة الأخطاء كل دقيقة في ٢٤ ساعة: من اللوج لازم تقرا كل سطور اليوم، وتقسّمها دقايق، وتعدّ الأخطاء والطلبات كلها (يعني لازم لوج لكل طلب مش للأخطاء بس). ومن الـ metric هي query واحدة في Prometheus بترجع ١٤٤٠ نقطة على طول: [[sum(rate(http_requests_total{status=~"5.."}[1m])) / sum(rate(http_requests_total[1m]))]] (درس «PromQL»).`
        },
        {
          cmd: "prom-client",
          title: "تطبيق Node يطلّع أرقامه: Counter و Histogram و labels",
          desc: R`[[prom-client]] بيخلّي تطبيق Node يفتح صفحة [[/metrics]] فيها عدّادات: Counter للي بيزيد بس (عدد الطلبات بالـ route والـ status)، و Histogram لمدة الطلب (عشان تحسب p95)، و Gauge للي بيطلع وينزل (الطلبات اللي شغالة دلوقتي). كل label بتقسّم الرقم لـ series، وكل قيمة جديدة لأي label = series جديدة.

الفخ اسمه high cardinality: label قيمه مالهاش آخر (المسار الخام [[/users/8812]]، أو user id، أو إيميل). جربته: ١٠٬٠٠٠ يوزر مختلف طلّعوا ١١٠٬٠٠١ سطر و 8.8 ميجا في [[/metrics]]، بدل ١٢ سطر و ١٠ كيلو.`,
          example: R`# Linux and Mac:
curl -s localhost:3000/metrics | grep -E '^http_requests_(total|in_flight)'
curl -s localhost:3000/metrics | grep 'duration.*checkout'
curl -s localhost:3000/metrics | grep -c '^http_request'
curl -s localhost:3000/metrics | wc -c
# Windows (PowerShell):
curl.exe -s localhost:3000/metrics | Select-String '^http_requests_(total|in_flight)'
(curl.exe -s localhost:3000/metrics | Select-String '^http_request').Count`,
          try: R`شغّل [[server.js]] اللي في الحل (مع [[npm install]] الأول)، وابعتله طلبات على [[/users/1]] لحد [[/users/1000]] وعدّ سطور [[http_request]]. وبعدين شغّله بـ [[LABEL=path]] (بيحط المسار الخام في الـ label بدل القالب) وابعت نفس الطلبات وعدّ تاني، وقيس حجم [[/metrics]] بـ [[wc -c]] في الحالتين.`,
          flag: "script",
          deep: {
            why: R`Prometheus مش بيعرف أي حاجة عن تطبيقك غير اللي التطبيق بيقوله. الرام والـ CPU بيجوا من بره (node_exporter)، لكن «كام طلب على [[/checkout]] فشل؟» و «الـ checkout بياخد قد إيه؟» محدش يعرفهم غير الكود. وهما أهم رقمين: اليوزر مش حاسس بالـ CPU، حاسس بالأخطاء والبطء.`,
            how: R`كل metric اسمه وليه labels، وكل تركيبة قيم labels = series لوحدها (خط في الرسم). Counter فيه [[method]] و [[route]] و [[status]] بيطلّع سطر لكل تركيبة حصلت فعلًا.

Counter: [[inc(labels)]] بيزوّد واحد، ومبيقلّش أبدًا (غير لما التطبيق يعمل restart فيرجع صفر). الاسم بيخلص بـ [[_total]] (عُرف Prometheus).

Histogram: بيعدّ الطلبات في buckets (أقل من ٢٥ مللي، أقل من ٥٠...)، وبيطلّع لكل series سطر لكل bucket + [[+Inf]] + [[_sum]] + [[_count]]. يعني ٧ buckets = ١٠ سطور لكل route. عشان كده شلت [[status]] من labels الـ histogram: الـ Counter فيه الـ status، والـ histogram فيه الوقت.

Gauge: [[inc()]] و [[dec()]] (أو [[set()]])، رقم بيطلع وينزل.

عدد الـ series = حاصل ضرب عدد قيم كل label (اللي حصل منها فعلًا). [[method]] ٢ × [[route]] ٤ × [[status]] ٣ = ٢٤ بالكتير، وده كويس. لكن [[route]] = المسار الخام = عدد اليوزرز، فبيبقى ١٠٬٠٠٠ × ١١ سطر.`,
            when: R`أي API عليه يوزرز. ابدأ بالـ Counter والـ Histogram دول على كل الطلبات (middleware واحد)، وزوّد metrics للحاجات اللي تهم البيزنس: طلبات دفع فشلت، رسايل مستنية في queue، وقت آخر job خلص.`,
            mistakes: R`labels من حاجة اليوزر بيتحكم فيها (المسار الخام، query string، user id، الإيميل، رسالة الخطأ كاملة): أي حد يقدر يبعت طلبات بمسارات عشوائية ويعمل ملايين series. وتعدّ [[/metrics]] نفسه في عداد الطلبات، فكل scrape يزوّد الترافيك. واسم بوحدة غلط ([[_ms]] وانت بتسجّل ثواني): العُرف ثواني و bytes. و buckets بعيدة عن الأرقام الحقيقية فالـ p95 يطلع تقدير مالوش معنى. وتنسى إن كل instance من التطبيق ليه عدّادات لوحده: [[sum]] في PromQL هو اللي بيجمعهم.`
          },
          teach: R`## الفكرة: التطبيق بيعدّ في الذاكرة، والصفحة بتطبع العدد

الكود (في الحل) بيعمل ٣ عدّادات، و middleware بيحدّثهم مع كل طلب، و route اسمه [[/metrics]] بيطبعهم كنص. الأساسيات (إزاي تقرا سطور الـ histogram، و [[collectDefaultMetrics]]) متشرحة في درس «Prometheus + Grafana» في تاب السحابة. هنا هنركز على الـ Counter والـ labels والفخ.

اتجرّب بـ [[prom-client]] 15.1.3 و Express 5.3.0 على Node 22.23.3 (image [[node:22-slim]]) على Docker Desktop، والأوامر من Git Bash، ونفسها من container [[nginx:alpine]] (لينكس Alpine 3.24 و curl 8.22) على نفس الشبكة، ومن pwsh 7.6 و Windows PowerShell 5.1.

---

## ١. الـ Counter

~~~js
const requests = new client.Counter({
  name: "http_requests_total",
  help: "HTTP requests",
  labelNames: ["method", "route", "status"],
});
~~~

| الخانة | معناها |
|---|---|
| [[name]] | الاسم. [[_total]] في الآخر عُرف لأي Counter |
| [[help]] | وصف بيظهر في سطر [[# HELP]] |
| [[labelNames]] | الأبعاد اللي هتقسّم بيها. لازم تتعرف هنا، ومينفعش تزوّد label وقت التشغيل |

وفي الـ middleware، لما الرد يخلص:

~~~js
const route = RAW ? req.path : (req.route?.path ?? "unmatched");
requests.inc({ method: req.method, route, status: res.statusCode });
~~~

- [[req.route?.path]] قالب الـ route في Express ([[/users/:id]])، و [[?.]] معناها لو [[req.route]] مش موجود (مسار مالوش route، يعني 404) متقعش وارجع [[undefined]]، و [[??]] يحط [[unmatched]] مكانه.
- [[RAW]] متغيّر للتجربة بس: لو [[LABEL=path]] بيحط [[req.path]] (المسار الخام). ده الغلط اللي هنقيسه تحت.
- [[inc({...})]] زوّد واحد للتركيبة دي بالظبط.

### [[grep -E '^http_requests_(total|in_flight)']]

[[-E]] regex موسّع، عشان [[(total|in_flight)]] تبقى «ده أو ده»، و [[^]] أول السطر (عشان سطور [[# HELP]] متطلعش).

~~~text الناتج (بعد حوالي ٦ دقايق ترافيك)
http_requests_total{method="GET",route="/users/:id",status="200"} 3581
http_requests_total{method="GET",route="unmatched",status="404"} 90
http_requests_total{method="POST",route="/checkout",status="200"} 1182
http_requests_total{method="POST",route="/checkout",status="500"} 11
http_requests_total{method="GET",route="/chaos/:rate",status="200"} 2
http_requests_in_flight 2
~~~

- كل سطر = series: اسم، و labels بين [[{ }]]، والرقم.
- [[unmatched]] و [[404]]: طلبات على مسار مش موجود، اتجمعت في سطر واحد بدل سطر لكل مسار غلط.
- [[/chaos/:rate]] route في الـ lab بيغيّر نسبة الأخطاء (هنستخدمه في درس التنبيهات). أول ما اتطلب ظهر سطر جديد: كل قيمة جديدة = series جديدة.
- [[http_requests_in_flight 2]] الـ Gauge: طلبين شغالين في اللحظة دي.

الرقم نفسه (3581) مش مهم لوحده: هو عدد من ساعة ما التطبيق قام. المهم بيزيد بسرعة قد إيه، وده شغل [[rate()]] في Prometheus.

---

## ٢. الـ Histogram والـ Gauge

~~~js
const duration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route"],
  buckets: [0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});
const inFlight = new client.Gauge({ name: "http_requests_in_flight", help: "Requests being served right now" });
~~~

الـ buckets بالثواني، ومختارة حوالين الأرقام الحقيقية: [[/users/:id]] بياخد بين ٢٠ و ٨٠ مللي، و [[/checkout]] بين ١٠٠ و ٤٠٠.

~~~text grep 'duration.*checkout'
http_request_duration_seconds_bucket{le="0.025",method="POST",route="/checkout"} 0
http_request_duration_seconds_bucket{le="0.05",method="POST",route="/checkout"} 0
http_request_duration_seconds_bucket{le="0.1",method="POST",route="/checkout"} 1
http_request_duration_seconds_bucket{le="0.25",method="POST",route="/checkout"} 624
http_request_duration_seconds_bucket{le="0.5",method="POST",route="/checkout"} 1193
http_request_duration_seconds_bucket{le="1",method="POST",route="/checkout"} 1193
http_request_duration_seconds_bucket{le="2.5",method="POST",route="/checkout"} 1193
http_request_duration_seconds_bucket{le="+Inf",method="POST",route="/checkout"} 1193
http_request_duration_seconds_sum{method="POST",route="/checkout"} 292.39187561899945
http_request_duration_seconds_count{method="POST",route="/checkout"} 1193
~~~

- [[grep 'duration.*checkout']] [[.*]] أي حاجة في النص، يعني سطر فيه [[duration]] وبعدها في أي حتة [[checkout]].
- [[le]] = less than or equal، والأرقام تراكمية: ٦٢٤ طلب خلصوا في ربع ثانية أو أقل، و ١١٩٣ (كلهم) في نص ثانية.
- [[le="0.1"} 1]] طلب واحد اتقاس ١٠٠ مللي بالظبط تقريبًا (أقل وقت في الكود ١٠٠ مللي).
- [[_count 1193]] = ١١٨٢ نجحوا + ١١ فشلوا في الـ Counter فوق. نفس الطلبات، اتعدّت في مكانين.
- [[_sum ÷ _count]] = ٢٩٢.٤ ÷ ١١٩٣ = ٠.٢٤٥ ثانية متوسط، والكود بيستنى بين ١٠٠ و ٤٠٠ مللي عشوائي (متوسطهم ٢٥٠). مظبوط.

والـ Gauge في الـ middleware: [[inFlight.inc()]] أول ما الطلب يوصل، و [[inFlight.dec()]] لما يخلص.

### ليه [[/metrics]] مش بيتعدّ

~~~js
if (req.path === "/metrics") return next();
~~~

Prometheus بيطلب [[/metrics]] كل ١٥ ثانية. لو اتعدّ، هيبقى عندك ترافيك وهمي ورقم latency مش بتاع اليوزرز.

---

## ٣. الفخ: high cardinality بالأرقام

### [[grep -c '^http_request']] و [[wc -c]]

[[grep -c]] بيعدّ السطور اللي بتبدأ بـ [[http_request]] (يعني كل series بتاعتنا)، و [[wc -c]] عدد الـ bytes في الصفحة ([[wc]] = word count، و [[-c]] bytes):

~~~text الناتج (التطبيق الشغال)
46
12849
~~~

٤٦ = ٥ سطور Counter + سطر الـ Gauge + ٤ routes × ١٠ سطور histogram.

### التجربة: ١٠٬٠٠٠ يوزر

شغّلت نسختين من نفس [[server.js]] على شبكة الـ lab، واحدة عادية وواحدة بـ [[LABEL=path]]، وسكربت صغير بعت لكل واحدة ١٠٬٠٠٠ طلب على [[/users/0]] لحد [[/users/9999]] (٥٠ طلب في نفس الوقت)، وقاس الصفحة قبل وبعد:

~~~text الناتج
== LABEL=route
before series=1 bytes=8584 rss=61MiB render=110ms
after 10000 users series=12 bytes=10074 rss=107MiB render=18ms
== LABEL=path
before series=1 bytes=8584 rss=61MiB render=183ms
after 10000 users series=110001 bytes=8795806 rss=127MiB render=668ms
~~~

| | القالب [[/users/:id]] | المسار الخام [[/users/8812]] |
|---|---|---|
| سطور [[http_request...]] | ١٢ | ١١٠٬٠٠١ |
| حجم [[/metrics]] | ١٠ كيلو | ٨.٨ ميجا، كل ١٥ ثانية |
| وقت تطبيع الصفحة | ١٨ مللي | ٦٦٨ مللي |

الحساب: كل مسار جديد = سطر Counter + ١٠ سطور histogram = ١١. يعني ١٠٬٠٠٠ × ١١ + سطر الـ Gauge = ١١٠٬٠٠١. ومع مليون يوزر ١١ مليون series: الرام بتاعة Prometheus بتتملي، والـ queries بتبطّأ، والـ scrape بياخد أكتر من الـ timeout فالـ target يبقى DOWN. والأسوأ إن أي حد بيبعت مسارات عشوائية (bot بيدوّر على [[/wp-admin]] و [[/.env]]) بيعمل نفس الحكاية.

> القاعدة: label قيمه عددها معروف وصغير (method، route بالقالب، status، اسم الـ queue). أي حاجة فريدة لكل يوزر أو طلب (id، إيميل، request id) مكانها اللوج.

### لو حصل: مين اللي عامل كل الـ series دي؟

Prometheus عنده صفحة بتعدّ: [[curl -s localhost:9090/api/v1/status/tsdb]]. في الـ lab قالت [[numSeries: 1042]]، وأكبر metric كان [[node_cpu_seconds_total]] بـ ١٢٨ series (١٦ CPU × ٨ modes). ونفس السؤال بـ PromQL:

~~~text topk(5, count by (__name__) ({__name__=~".+"}))
node_cpu_seconds_total => 128
node_scrape_collector_success => 49
node_scrape_collector_duration_seconds => 49
node_cpu_guest_seconds_total => 32
http_request_duration_seconds_bucket => 24
~~~

[[__name__]] label مخفي فيه اسم الـ metric، و [[count by (__name__)]] عدد الـ series لكل اسم، و [[topk(5, ...)]] أكبر ٥. لو [[http_...]] بتاعك طلع فوق بعشرات الآلاف، دور على الـ label اللي قيمه بتزيد.

---

## ٤. ويندوز

~~~powershell
curl.exe -s localhost:3000/metrics | Select-String '^http_requests_(total|in_flight)'
(curl.exe -s localhost:3000/metrics | Select-String '^http_request').Count
~~~

[[Select-String]] بيفهم نفس الـ regex ([[^]] و [[(a|b)]]). الناتج في الاتنين نفس سطور لينكس، والعدد طلع [[35]] في pwsh و [[46]] في 5.1 بعدها بثواني: بين التشغيلتين اتطلب [[/chaos/0.01]] لأول مرة، فاتعمل route جديد = ١١ سطر جديد. نفس الفكرة بتاعة القسم ٣ بس بحجم صغير.

---

## الخلاصة

| النوع | امتى | الدالة |
|---|---|---|
| Counter | حاجة بتتعدّ: طلبات، أخطاء، رسايل اتبعتت | [[inc(labels)]] |
| Histogram | مدة أو حجم وعايز p95 | [[startTimer()]] ثم [[end(labels)]] |
| Gauge | رقم بيطلع وينزل: شغال دلوقتي، حجم queue | [[inc()]] و [[dec()]] و [[set()]] |

والـ labels: قيم قليلة ومعروفة بس. الـ route بالقالب، مش بالمسار.`,
          lines: [
            "عدّاد الطلبات (Counter) بكل labels، والـ Gauge بتاع الطلبات الشغالة.",
            "سطور الـ histogram بتاع /checkout: الـ buckets و _sum و _count.",
            "عدد الـ series بتاعة التطبيق (كل سطر = series).",
            "حجم صفحة /metrics بالـ byte.",
            "ويندوز: نفس سطور الـ Counter والـ Gauge.",
            "ويندوز: عدد الـ series."
          ],
          sol: R`الملفين تحت، وبعدها [[npm install]] في الفولدر ([[docker run --rm -v ./app:/app -w /app node:22-slim npm install]] لو مش عايز تسطّب Node). بعد ١٠٠٠ طلب مختلف: العادي هيفضل [[12]] سطر [[http_request]] (Counter + ١٠ histogram + Gauge لـ route واحد)، وبـ [[LABEL=path]] هيبقى حوالي ١١ × ١٠٠٠ + ١ = [[11001]]. وفي تجربتي بـ ١٠٬٠٠٠ يوزر: ١٢ مقابل ١١٠٬٠٠١ سطر، و ١٠٬٠٧٤ مقابل ٨٬٧٩٥٬٨٠٦ byte، وطباعة الصفحة ١٨ مللي مقابل ٦٦٨.

لو طلع عندك [[unmatched]] كتير: الطلبات رايحة لمسار مش موجود (اتأكد من الـ URL في السكربت). ولو العداد مبيزيدش خالص: الـ middleware متسجّل بعد الـ routes ([[app.use]] لازم يبقى قبل [[app.get]]).`,
          solCode: R`// app/package.json
{ "name": "b3d-api", "type": "module", "private": true,
  "dependencies": { "express": "^5.1.0", "prom-client": "15.1.3" } }

// app/server.js
import express from "express";
import client from "prom-client";

const app = express();
client.collectDefaultMetrics();

const requests = new client.Counter({
  name: "http_requests_total",
  help: "HTTP requests",
  labelNames: ["method", "route", "status"],
});
const duration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route"],
  buckets: [0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});
const inFlight = new client.Gauge({ name: "http_requests_in_flight", help: "Requests being served right now" });

const RAW = process.env.LABEL === "path"; // للتجربة بس: المسار الخام في الـ label (غلط)
let failRate = Number(process.env.FAIL_RATE || 0.01);

app.use((req, res, next) => {
  if (req.path === "/metrics") return next();
  inFlight.inc();
  const end = duration.startTimer();
  res.on("finish", () => {
    const route = RAW ? req.path : (req.route?.path ?? "unmatched");
    requests.inc({ method: req.method, route, status: res.statusCode });
    end({ method: req.method, route });
    inFlight.dec();
  });
  next();
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
app.get("/users/:id", async (req, res) => { await sleep(20 + Math.random() * 60); res.json({ id: req.params.id }); });
app.post("/checkout", async (req, res) => {
  await sleep(100 + Math.random() * 300);
  if (Math.random() < failRate) {
    console.log(JSON.stringify({ time: new Date().toISOString(), level: "error", route: "/checkout", msg: "payment gateway timeout" }));
    return res.status(500).json({ error: "payment gateway timeout" });
  }
  res.json({ ok: true });
});
// للـ lab بس: يغيّر نسبة الأخطاء عشان نجرّب التنبيهات. متحطوش في تطبيق حقيقي
app.get("/chaos/:rate", (req, res) => { failRate = Number(req.params.rate); console.log("failRate =", failRate); res.json({ failRate }); });
app.get("/health", (req, res) => res.send("ok"));
app.get("/metrics", async (req, res) => {
  res.type(client.register.contentType).send(await client.register.metrics());
});

app.listen(3000, () => console.log("api on :3000"));`
        },
        {
          cmd: "Prometheus targets",
          title: "Prometheus بيسحب: targets و up، ولما target يبقى DOWN",
          desc: R`Prometheus بيروح لكل target في [[prometheus.yml]] كل [[scrape_interval]] ويطلب [[/metrics]]، ولكل target بيسجّل رقم اسمه [[up]]: 1 لو رد صح و 0 لو لأ، وفي صفحة الـ targets بيكتب الغلطة بالظبط ([[connection refused]] أو [[404 Not Found]] أو [[context deadline exceeded]]). [[up == 0]] أول تنبيه تعمله، لأن من غيره الـ target الواقع بيبقى «مفيش أرقام» مش «فيه مشكلة».

و node_exporter target تاني بيطلّع أرقام السيرفر نفسه (CPU ورام وديسك) بنفس الطريقة، فـ Prometheus واحد بيجمع التطبيق والسيرفر.`,
          example: R`# Linux and Mac:
docker exec b3d-prom promtool check config /etc/prometheus/prometheus.yml
docker exec b3d-prom promtool query instant http://localhost:9090 'up'
curl -s localhost:9090/api/v1/targets | grep -oE '"(scrapeUrl|health|lastError)":"[^"]*"'
docker exec b3d-prom promtool query instant http://localhost:9090 'scrape_samples_scraped'
# Windows (PowerShell):
(Invoke-RestMethod http://localhost:9090/api/v1/targets).data.activeTargets | Select-Object scrapeUrl, health, lastError`,
          try: R`شغّل الـ lab بالـ [[compose.yaml]] اللي في الحل، وافتح [[http://localhost:9090/targets]] واتأكد إن الاتنين UP. وبعدين اكسر حاجة واحدة كل مرة في [[prometheus.yml]] (بورت غلط، اسم غلط، [[localhost]]، [[metrics_path: /metric]]) واعمل restart لـ Prometheus، واقرا [[lastError]] لكل واحدة، واكتب الغلطة دي سببها إيه.`,
          flag: "script",
          deep: {
            why: R`أول مرة الـ dashboard يبقى فاضي أو التنبيه ميجيش، السبب غالبًا مش في الـ query: الـ target نفسه DOWN، فمفيش أرقام أصلًا. والأخطر: لو التطبيق وقع خالص، كل الـ metrics بتاعته بتختفي، والتنبيه على نسبة الأخطاء مبيضربش لأن مفيش أخطاء يحسبها. [[up]] هو الحاجة الوحيدة اللي بتفضل موجودة وقيمتها 0.`,
            how: R`الـ pull: Prometheus هو اللي بيروح للتطبيق، مش التطبيق اللي بيبعت. كل [[scrape_interval]] (هنا ١٥ ثانية) بيعمل GET على [[http://<target>/metrics]] ومعاه مهلة [[scrape_timeout]] (الافتراضي ١٠ ثواني). لو الرد جه بصيغة Prometheus، كل سطر بيتخزن بوقته، ومعاه labels زيادة: [[job]] (من [[job_name]]) و [[instance]] (العنوان).

ومع كل scrape بيعمل لوحده كام metric للـ target: [[up]] (1 أو 0)، و [[scrape_duration_seconds]] (أخد قد إيه)، و [[scrape_samples_scraped]] (كام سطر). دول بيقولولك صحة المراقبة نفسها.

node_exporter برنامج صغير من مشروع Prometheus بيقرا [[/proc]] و [[/sys]] في لينكس ويطلّعهم على بورت 9100. على سيرفر حقيقي بتشغّله بـ [[--path.rootfs]] و [[pid: host]] عشان يشوف السيرفر مش الـ container (درس «node_exporter و Grafana» في تاب VPS فيه الإعداد كامل).`,
            when: R`أول ما تشغّل Prometheus: افتح صفحة الـ targets قبل أي dashboard. وكل ما تضيف target أو تغيّر شبكة أو بورت. وأي dashboard فاضي: ابدأ من [[up]].`,
            mistakes: R`[[localhost:3000]] كـ target و Prometheus في container: ده الـ container نفسه، والصح اسم الـ service ([[api:3000]]). وتنسى [[metrics_path]] لو التطبيق بيطلّع الأرقام على مسار تاني. وتفتح [[/metrics]] وبورت 9100 للنت (بيكشفوا مسارات وأرقام داخلية): خليهم على شبكة داخلية. وتعدّل [[prometheus.yml]] من غير [[promtool check config]] وتعمل restart، فـ Prometheus يقوم بالقديم أو ميقومش. ومتعملش تنبيه على [[up == 0]]، فالـ target الواقع بيبان «هادي».`
          },
          teach: R`## الفكرة: Prometheus بيلف على قايمة عناوين

[[prometheus.yml]] فيه قايمة targets. Prometheus بيلف عليهم كل ١٥ ثانية، يطلب [[/metrics]]، ويخزّن الأرقام. الأوامر هنا بتسأله: الإعداد سليم؟ مين UP ومين لأ؟ وليه؟

اتجرّب بـ Prometheus 3.15.1 و node_exporter 1.12.1 (الـ images الرسمية [[prom/prometheus:v3.15.1]] و [[prom/node-exporter:v1.12.1]]) على Docker Desktop، والأوامر من Git Bash، و [[curl]] نفسه من container [[nginx:alpine]] على نفس الشبكة، والـ PowerShell في pwsh 7.6 و Windows PowerShell 5.1.

---

## ١. الإعداد: [[prometheus.yml]]

~~~yaml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]
~~~

| السطر | معناه |
|---|---|
| [[scrape_interval: 15s]] | كل ١٥ ثانية لكل target. ١٥ أو ٣٠ ثانية العادي، وأقل من كده بيكبّر التخزين |
| [[job_name: api]] | اسم المجموعة، وبيبقى label [[job="api"]] على كل أرقامها |
| [[static_configs]] | قايمة عناوين ثابتة. فيه طرق تانية بتلاقي الـ targets لوحدها (Kubernetes و Docker و ملفات) |
| [[targets: ["api:3000"]]] | اسم الـ service في compose والبورت. والمسار الافتراضي [[/metrics]] |

### [[promtool check config]]

[[promtool]] أداة جوه نفس الـ image بتفحص الإعدادات من غير ما تشغّل حاجة. و [[docker exec b3d-prom]] بيشغّلها جوه الـ container:

~~~text الناتج
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
~~~

لو فيه مسافة غلط أو خانة مكتوبة غلط، بيقولك السطر. اعملها قبل أي restart.

---

## ٢. [[up]]: مين بيرد؟

[[promtool query instant <url> '<query>']] بيسأل Prometheus سؤال PromQL ويطبع النتيجة بشكل مقروء. [[instant]] يعني القيمة دلوقتي (مش رسم على مدة).

~~~text الناتج
up{instance="node-exporter:9100", job="node"} => 1 @[1793147211.516]
up{instance="api:3000", job="api"} => 1 @[1793147211.516]
~~~

- [[instance]] و [[job]] labels حطّهم Prometheus بنفسه.
- [[=> 1]] الـ scrape الأخير نجح.
- [[@[1793147211.516]]] الوقت بالثواني من ١ يناير ١٩٧٠ (Unix time).

---

## ٣. صفحة الـ targets

في المتصفح [[http://localhost:9090/targets]]، ومن الترمنال الـ API بتاعها بيرجّع JSON طويل. [[grep -oE]] بيطلّع الحتت اللي تهمنا بس: [[-o]] الجزء اللي طابق بس مش السطر كله، و [[[^"]*]] أي حروف غير علامة التنصيص (يعني القيمة لحد ما تخلص).

~~~text الناتج
"scrapeUrl":"http://api:3000/metrics"
"lastError":""
"health":"up"
"scrapeUrl":"http://node-exporter:9100/metrics"
"lastError":""
"health":"up"
~~~

[[lastError]] فاضي = كله تمام. ولما التطبيق اتقفل ([[docker stop b3d-api]]) بقى:

~~~text الناتج
api down Get "http://api:3000/metrics": dial tcp: lookup api on 127.0.0.11:53: server misbehaving
~~~

الـ container اتشال من الشبكة، فاسمه مبقاش ليه عنوان. [[127.0.0.11]] هو الـ DNS الداخلي بتاع Docker.

### [[scrape_samples_scraped]] و [[scrape_duration_seconds]]

~~~text الناتج
scrape_samples_scraped{instance="node-exporter:9100", job="node"} => 875
scrape_samples_scraped{instance="api:3000", job="api"} => 136
~~~

التطبيق بيطلّع ١٣٦ رقم كل scrape، و node_exporter ٨٧٥. و [[scrape_duration_seconds]] كان ٠.٠٠٣ ثانية للتطبيق و ٠.٠١٣ لـ node_exporter. لو الرقم ده قرّب من الـ [[scrape_timeout]]، الـ target هيبقى DOWN قريب (غالبًا cardinality، درس «prom-client»).

---

## ٤. ليه DOWN؟ الأخطاء اللي هتشوفها

شغّلت Prometheus تاني على نفس الشبكة، فيه ٦ targets كل واحد غلطان بطريقة، وده [[lastError]] لكل واحد:

| الإعداد الغلط | [[lastError]] | السبب والحل |
|---|---|---|
| [[localhost:3000]] | [[dial tcp [::1]:3000: connect: connection refused]] | localhost جوه container الـ Prometheus هو نفسه. اكتب اسم الـ service |
| [[api:3001]] | [[dial tcp 172.18.0.4:3001: connect: connection refused]] | الاسم صح (اتحوّل لعنوان) بس مفيش حاجة على البورت ده |
| [[apii:3000]] | [[lookup apii on 127.0.0.11:53: server misbehaving]] | الاسم غلط. ومرة تانية نفس الـ target طلّع [[context deadline exceeded]] لأن البحث عن الاسم خلّص الوقت |
| [[metrics_path: /metric]] | [[server returned HTTP status 404 Not Found]] | وصل للتطبيق بس المسار غلط |
| [[metrics_path: /health]] | [[received unsupported Content-Type "text/html; charset=utf-8"]] | المسار رد بحاجة مش بصيغة Prometheus |
| [[scrape_timeout: 1ms]] | [[context deadline exceeded]] | الرد أبطأ من المهلة. في الحقيقة: صفحة [[/metrics]] ضخمة أو التطبيق مشغول |

الترتيب ده نفس «السلّم» في أول التاب: الاسم (DNS)، بعدين البورت (TCP)، بعدين المسار (HTTP)، بعدين المحتوى. و [[no such host]] بدل [[server misbehaving]] اللي هتشوفها غالبًا على لينكس عادي (زي ما طلع في درس تاب VPS): الاتنين معناهم الاسم مش موجود.

---

## ٥. node_exporter

في الـ lab شغال في container من غير أي إعداد، فهو شايف الماكينة الافتراضية بتاعة Docker Desktop:

~~~text الناتج (من Prometheus)
node_memory_MemTotal_bytes => 16460177408
node_memory_MemAvailable_bytes => 12681887744
count(node_cpu_seconds_total{mode="idle"}) => 16
~~~

١٦٬٤٦٠٬١٧٧٬٤٠٨ byte ÷ 1024³ = ١٥.٣ GiB رام، و ١٦ CPU. وقايمة الديسكات فيها [[/etc/hostname]] و [[/etc/hosts]] (ملفات Docker بيركّبها جوه أي container) بدل [[/]] بتاع السيرفر. على سيرفر حقيقي لازم [[--path.rootfs=/host]] و [[pid: host]] (الإعداد في درس «node_exporter و Grafana» في تاب VPS)، أو تسطّبه كبرنامج عادي و systemd service زي ما الـ docs بتاعته بتقول. الأرقام اللي هنستخدمها منه في «PromQL» و «Alertmanager»: CPU ورام وديسك.

---

## ٦. ويندوز: [[Invoke-RestMethod]]

~~~powershell
(Invoke-RestMethod http://localhost:9090/api/v1/targets).data.activeTargets | Select-Object scrapeUrl, health, lastError
~~~

[[Invoke-RestMethod]] بيحوّل الـ JSON لـ objects لوحده، فـ [[.data.activeTargets]] بتمشي جوه الـ JSON خانة خانة، و [[Select-Object]] بيختار ٣ خانات. لازم [[http://]] في الأول: pwsh 7.6 رفض [[localhost:3000/...]] من غيرها ([[The 'localhost' scheme is not supported]]).

~~~text الناتج (pwsh 7.6 و Windows PowerShell 5.1 زي بعض)
scrapeUrl : http://api:3000/metrics
health    : up
lastError :

scrapeUrl : http://node-exporter:9100/metrics
health    : up
lastError :
~~~

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| الإعداد سليم؟ | [[promtool check config]] |
| مين بيرد؟ | [[up]] (1 أو 0) |
| ليه مش بيرد؟ | صفحة [[/targets]] و [[lastError]] |
| الـ scrape تقيل؟ | [[scrape_duration_seconds]] و [[scrape_samples_scraped]] |

اقرا [[lastError]] بالترتيب: اسم ← بورت ← مسار ← محتوى ← وقت.`,
          lines: [
            "افحص ملف الإعداد قبل أي restart (promtool جوه نفس الـ image).",
            "مين بيرد: 1 لكل target نجح آخر scrape، و 0 للي فشل.",
            "من API صفحة الـ targets: العنوان والحالة وآخر غلطة لكل target.",
            "كل target بيطلّع كام رقم في كل scrape (لو كبر فجأة: cardinality).",
            "ويندوز: نفس صفحة الـ targets كجدول."
          ],
          sol: R`الملفات تحت، ومعاها فولدر [[app]] من درس «prom-client» (بعد [[npm install]]). [[docker compose up -d]] من الفولدر اللي فيه [[compose.yaml]]، وبعد ١٥ ثانية [[http://localhost:9090/targets]] يوري [[api]] و [[node]] الاتنين UP.

الأخطاء اللي هتطلعلك (متجربة على Prometheus 3.15.1):
- [[localhost:3000]]: [[connection refused]] على [[[::1]:3000]].
- بورت غلط: [[connection refused]] على عنوان الـ container والبورت الغلط.
- اسم غلط: [[server misbehaving]] على Docker Desktop (أو [[no such host]] على لينكس)، وأحيانًا [[context deadline exceeded]].
- [[metrics_path: /metric]]: [[server returned HTTP status 404 Not Found]].

ولازم [[docker compose restart prometheus]] بعد كل تعديل (أو [[curl -X POST localhost:9090/-/reload]] لو شغّلته بـ [[--web.enable-lifecycle]]).`,
          solCode: R`# compose.yaml (الفولدر app فيه server.js و package.json و load.js)
name: b3d
services:
  api:
    image: node:22-slim
    container_name: b3d-api
    working_dir: /app
    command: node server.js
    volumes: ["./app:/app:ro"]
    ports: ["127.0.0.1:3000:3000"]
  load:
    image: node:22-slim
    container_name: b3d-load
    command: node /app/load.js
    volumes: ["./app:/app:ro"]
    depends_on: [api]
  node-exporter:
    image: prom/node-exporter:v1.12.1
    container_name: b3d-node
    tmpfs: ["/data:size=64m"]
  prometheus:
    image: prom/prometheus:v3.15.1
    container_name: b3d-prom
    volumes: ["./prometheus:/etc/prometheus:ro"]
    ports: ["127.0.0.1:9090:9090"]

# prometheus/prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]

# app/load.js: ترافيك وهمي، ١٠ طلبات users و ٣.٣ checkout و ٠.٢٥ لمسار مش موجود في الثانية
const base = process.env.TARGET || "http://api:3000";
let n = 0;
setInterval(() => {
  n++;
  fetch($__bt$__{base}/users/$__{1 + (n % 50)}$__bt).catch(() => {});
  if (n % 3 === 0) fetch($__bt$__{base}/checkout$__bt, { method: "POST" }).catch(() => {});
  if (n % 40 === 0) fetch($__bt$__{base}/nope$__bt).catch(() => {});
}, 100);`
        },
        {
          cmd: "PromQL",
          title: "PromQL: الأسئلة اللي هتسألها كل يوم",
          desc: R`PromQL لغة الأسئلة بتاعة Prometheus. أغلب اللي هتحتاجه ٥ حاجات: [[rate()]] (الـ Counter بيزيد بكام في الثانية)، و [[increase()]] (زاد كام في المدة دي)، و [[sum by (label)]] (اجمع وسيب label واحدة منفصلة)، و [[histogram_quantile()]] (p95 من الـ buckets)، وقسمة query على query لنسبة الأخطاء.

القاعدة: [[rate]] الأول على الـ Counter وبعدين [[sum]]، والمدة بين القوسين [[[1m]]] لازم تبقى ٤ أضعاف الـ scrape interval على الأقل.`,
          example: R`# Linux and Mac:
docker exec b3d-prom promtool query instant http://localhost:9090 'sum by (route) (rate(http_requests_total[1m]))'
docker exec b3d-prom promtool query instant http://localhost:9090 'sum by (status) (increase(http_requests_total[1m]))'
docker exec b3d-prom promtool query instant http://localhost:9090 'sum(rate(http_requests_total{status=~"5.."}[1m])) / sum(rate(http_requests_total[1m]))'
docker exec b3d-prom promtool query instant http://localhost:9090 'histogram_quantile(0.95, sum by (le, route) (rate(http_request_duration_seconds_bucket[1m])))'
docker exec b3d-prom promtool query instant http://localhost:9090 '100 * (1 - avg(rate(node_cpu_seconds_total{mode="idle"}[1m])))'
# Windows (PowerShell):
docker exec b3d-prom promtool query instant http://localhost:9090 "sum(rate(http_requests_total{status=~'5..'}[1m])) / sum(rate(http_requests_total[1m]))"`,
          try: R`على الـ lab: اكتب query بترجع متوسط وقت الطلب لكل route من [[_sum]] و [[_count]]، وقارنه بالـ p95. وبعدين اعمل [[docker restart b3d-api]] وقارن [[http_requests_total]] قبل وبعد، و [[rate()]] قبل وبعد، و [[resets()]] على ١٠ دقايق.`,
          deep: {
            why: R`Prometheus مليان أرقام، والأرقام الخام مش مفيدة: [[http_requests_total = 3581]] معناه إيه؟ ولا حاجة لوحده. السؤال الحقيقي دايمًا «بقد إيه في الثانية دلوقتي؟» و «كام في المية؟» و «أبطأ ٥٪ بياخدوا قد إيه؟»، وده كله PromQL. ونفس الـ queries هي اللي هتحطها في Grafana وفي قواعد التنبيه، فلو فهمتها هنا، الباقي نسخ ولصق.`,
            how: R`[[http_requests_total]] لوحده = instant vector: آخر قيمة لكل series. ولما تكتب [[[1m]]] بعده = range vector: كل القيم في آخر دقيقة (٤ قيم لو كل ١٥ ثانية). الدوال زي [[rate]] بتاخد range وترجّع رقم لكل series.

[[rate(x[1m])]]: (آخر قيمة - أول قيمة) ÷ المدة بالثواني، مع تقدير للأطراف. ولو العداد نزل (restart)، بيفهم إنه رجع من الصفر ويكمّل صح. [[increase(x[1m])]] = [[rate × 60]]، ولذلك ممكن يطلع بكسور.

[[sum by (route) (...)]] بيجمع كل الـ series اللي ليها نفس الـ route، ويرمي باقي الـ labels. و [[sum(...)]] من غير [[by]] بيجمع الكل في رقم واحد. وفيه [[avg]] و [[max]] و [[count]] و [[topk]] بنفس الشكل.

[[{status=~"5.."}]] فلتر: [[=~]] يطابق regex، و [[5..]] تلات حروف أولها 5. وفيه [[=]] و [[!=]] و [[!~]].

[[histogram_quantile(0.95, ...)]] محتاج الـ buckets بالـ [[le]] بتاعهم، فلازم [[le]] تفضل في الـ [[by]].`,
            when: R`كل dashboard وكل قاعدة تنبيه. وفي التحقيق: افتح صفحة Prometheus ([[http://localhost:9090/query]]) واكتب الـ query وبص على الـ Graph، أو [[promtool query instant]] من الترمنال على السيرفر.`,
            mistakes: R`[[sum]] قبل [[rate]]: لو instance عمل restart، المجموع بينزل فجأة و rate يفتكرها reset. و [[rate]] على Gauge (رقم بيطلع وينزل): بيرجّع رقم من غير خطأ، و Prometheus بيكتب info بس. ومدة أقصر من scrapeين ([[[15s]]] مع scrape كل ١٥ ثانية): نتيجة فاضية. و [[histogram_quantile]] من غير [[le]]: فاضي مع warning. ومتوسط بدل p95: المتوسط بيخبّي الطلبات البطيئة. وتقارن [[rate[5m]]] بعد deploy على طول: الـ series الجديدة ملهاش ٥ دقايق، فالرقم بيطلع أقل من الحقيقة.`
          },
          teach: R`## الفكرة: كل query بتتقرا من جوه لبرة

كل الأرقام هنا من الـ lab بعد ما الترافيك استقر: [[load.js]] بيبعت ١٠ طلبات في الثانية لـ [[/users/:id]]، و ٣.٣٣ لـ [[/checkout]] (كل تالت لفة)، و ٠.٢٥ لمسار مش موجود (كل ٤٠ لفة)، و ١٪ من الـ checkout بيرجّع 500. Prometheus 3.15.1، والأوامر بـ [[promtool query instant]] من Git Bash، وشلت [[@[timestamp]]] من آخر كل سطر عشان الطول. والناتج نفسه من الـ API: [[curl -s localhost:9090/api/v1/query --data-urlencode 'query=up']] (و [[--data-urlencode]] بيعمل encode للأقواس والمسافات).

---

## ١. [[rate()]]: بيزيد بكام في الثانية

الأول الرقم الخام:

~~~text http_requests_total{route="/checkout"}
http_requests_total{..., route="/checkout", status="200"} => 339
http_requests_total{..., route="/checkout", status="500"} => 3
~~~

وبعدين [[rate]]:

~~~text rate(http_requests_total{route="/checkout"}[1m])
{..., route="/checkout", status="200"} => 3.2893274658843406
{..., route="/checkout", status="500"} => 0.022225185580299598
~~~

- [[[1m]]] كل القيم في آخر دقيقة.
- [[rate]] الفرق بين أولها وآخرها ÷ ٦٠: ٣.٢٩ طلب ناجح في الثانية، و ٠.٠٢٢ فاشل (يعني واحد كل ٤٥ ثانية تقريبًا).
- اسم الـ metric اختفى من النتيجة: الرقم بقى حاجة تانية (سرعة مش عدد).

### [[sum by (route)]]

~~~text sum by (route) (rate(http_requests_total[1m]))
{route="/users/:id"} => 9.97910832555452
{route="/checkout"} => 3.3115526514646403
{route="unmatched"} => 0.24447704138329557
~~~

[[sum by (route)]] جمع الـ 200 والـ 500 لكل route ورمى [[method]] و [[status]] و [[instance]]. والأرقام هي اللي [[load.js]] بيبعتها: ١٠ و ٣.٣٣ و ٠.٢٥. ومن غير [[by]]: [[sum(rate(http_requests_total[1m]))]] = [[13.535]] طلب في الثانية للتطبيق كله. ده الـ **Traffic**.

---

## ٢. [[increase()]]: زاد كام

~~~text sum by (status) (increase(http_requests_total[1m]))
{status="200"} => 796.1061474863316
{status="404"} => 14.668622482997733
{status="500"} => 1.3335111348179758
~~~

«في آخر دقيقة: ٧٩٦ نجحوا، و ١٤.٧ مسار غلط، و ١.٣ فشلوا». ليه كسور؟ [[increase]] هو [[rate × 60]] بالظبط: Prometheus عنده قيم كل ١٥ ثانية، فبيقدّر الزيادة على الدقيقة كلها من القيم اللي عنده. استخدمه للعرض («كام طلب فشل في آخر ساعة؟»)، و [[rate]] للرسومات والتنبيهات.

---

## ٣. نسبة الأخطاء: query ÷ query

~~~text sum(rate(http_requests_total{status=~"5.."}[1m])) / sum(rate(http_requests_total[1m]))
{} => 0.0016420361247947454
~~~

من جوه لبرة:

1. [[{status=~"5.."}]] الـ series اللي الـ status بتاعها 500 لحد 599 بس.
2. [[sum(rate(...))]] الأخطاء في الثانية للتطبيق كله.
3. [[/ sum(rate(http_requests_total[1m]))]] ÷ كل الطلبات في الثانية.
4. النتيجة [[0.00164]] = ٠.١٦٪. ده الـ **Errors**.

ليه مش ١٪؟ الـ ١٪ من الـ checkout بس، والـ checkout ربع الترافيك، يعني المتوقع ٠.٢٥٪، وفي دقيقة واحدة فيها حوالي ٢٠٠ checkout الصدفة بتفرق. في درس التنبيهات رفعناها لـ ٥٠٪ وبقت ١٠٪.

> في PowerShell خلي الـ query بين double quotes والـ label بين single quotes: [[{status=~'5..'}]]. PromQL بيقبل الاتنين، و Windows PowerShell 5.1 بيشيل الـ double quotes اللي جوه الكلام وهو بيبعته لـ docker. جربت النسختين: [[status=~"5.."]] جوه single quotes في 5.1 رجّع [[parse error: unexpected character inside braces: '5']]، والشكل اللي في المثال اشتغل في pwsh 7.6 و 5.1.

---

## ٤. [[histogram_quantile()]]: p95

~~~text histogram_quantile(0.95, sum by (le, route) (rate(http_request_duration_seconds_bucket[1m])))
{route="/users/:id"} => 0.09539959016393443
{route="/checkout"} => 0.4748310810810811
{route="unmatched"} => 0.02375
~~~

1. [[rate(..._bucket[1m])]] كل bucket بيزيد بكام في الثانية.
2. [[sum by (le, route)]] اجمع الـ instances وسيب كل bucket ([[le]]) وكل route لوحده.
3. [[histogram_quantile(0.95, ...)]] الوقت اللي ٩٥٪ من الطلبات أقل منه. ده الـ **Latency**.

نقارن بالحقيقة: [[/users/:id]] بياخد ٢٠ + عشوائي لحد ٦٠ مللي، فالـ p95 الحقيقي ≈ ٧٧ مللي، والـ query قالت ٩٥. و [[/checkout]] الحقيقي ≈ ٣٨٥، والـ query قالت ٤٧٥. ليه أكبر؟ الـ histogram عارف بس إن الطلب بين ٥٠ و ١٠٠ مللي (bucket)، فبيقدّر بخط مستقيم جوه الـ bucket. الرقم بيبقى دقيق بقد ما الـ buckets قريبة من بعض حوالين الأرقام اللي تهمك. (الفكرة متشرحة برضه في «Prometheus + Grafana» في تاب السحابة.)

### المتوسط: [[_sum]] ÷ [[_count]]

~~~text sum by (route) (rate(http_request_duration_seconds_sum[5m])) / sum by (route) (rate(http_request_duration_seconds_count[5m]))
{route="/users/:id"} => 0.05023697163951368
{route="/checkout"} => 0.25363799621167893
~~~

المتوسط دقيق (٥٠ و ٢٥٠ مللي زي الكود بالظبط) لأنه محسوب من المجموع الحقيقي مش من الـ buckets. بس بيخبّي البطيء: لو ١٪ من الطلبات بقت ١٠ ثواني، المتوسط بيتحرك شوية والـ p99 بينط.

---

## ٥. CPU من node_exporter

~~~text 100 * (1 - avg(rate(node_cpu_seconds_total{mode="idle"}[1m])))
{} => 16.23327554785108
~~~

1. [[node_cpu_seconds_total{mode="idle"}]] Counter: كل CPU قعد فاضي كام ثانية من ساعة ما الجهاز قام (series لكل CPU، يعني ١٦ هنا).
2. [[rate(...[1m])]] كام ثانية فاضي في كل ثانية = نسبة الفراغ، من 0 لـ 1.
3. [[avg(...)]] متوسط الـ ١٦.
4. [[1 -]] نسبة الشغل، و [[100 *]] نسبة مئوية: ١٦٪ (الماكينة الافتراضية بتاعة Docker Desktop وعليها شغل تاني). ده جزء من الـ **Saturation**.

---

## ٦. الغلطات، بنتايجها الحقيقية

| الـ query | اللي رجع | ليه |
|---|---|---|
| [[rate(http_requests_total{route="/checkout"}[15s])]] | فاضي | ١٥ ثانية فيها قيمة واحدة بس، و rate محتاج اتنين. خليها ٤ أضعاف الـ scrape interval |
| [[rate(http_requests_in_flight[1m])]] | [[0.022]] ومعاه [[PromQL info: metric might not be a counter]] | Gauge مش Counter. الرقم مالوش معنى، و Prometheus بيحذّرك بس |
| [[rate(sum(http_requests_total)[1m])]] | [[parse error: ranges only allowed for vector selectors]] | الـ range على اسم metric بس. والصح [[sum(rate(...))]] |
| [[histogram_quantile(0.95, sum by (route) (rate(..._bucket[1m])))]] | فاضي و [[bucket label "le" is missing]] | شلت [[le]] من الـ [[by]] |

### بعد restart: العداد نزل و [[rate]] مكمّل

~~~text قبل docker stop وبعد docker start بدقيقة
http_requests_total{route="/users/:id"} => 7293          (قبل)
http_requests_total{route="/users/:id"} => 281           (بعد)
resets(http_requests_total{route="/users/:id"}[10m]) => 1
sum(rate(http_requests_total[1m])) => 8.05
~~~

[[resets()]] عدد المرات اللي العداد نزل فيها. و [[rate]] شاف إن العداد رجع صفر، فحسب من الصفر من غير ما يطلّع رقم سالب. والـ ٨ بدل ١٣.٥ لأن الدقيقة دي كان نصها والتطبيق واقف.

### [[rate[5m]]] على series جديدة

أول ما الـ lab قام، [[rate(http_requests_total[5m])]] لـ [[/users/:id]] طلع [[5.32]] و [[rate(...[30s])]] طلع [[9.997]]: الـ series عمرها أقل من ٥ دقايق، و rate بيقسم على المدة كلها تقريبًا. بعد deploy جديد بص على مدة قصيرة أو استنى.

---

## الخلاصة

| عايز | PromQL |
|---|---|
| طلبات في الثانية (Traffic) | [[sum by (route) (rate(x_total[5m]))]] |
| كام في المدة | [[increase(x_total[1h])]] |
| نسبة الأخطاء (Errors) | [[sum(rate(x_total{status=~"5.."}[5m])) / sum(rate(x_total[5m]))]] |
| p95 (Latency) | [[histogram_quantile(0.95, sum by (le) (rate(x_bucket[5m])))]] |
| CPU٪ (Saturation) | [[100 * (1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m])))]] |

[[rate]] قبل [[sum]]، و [[le]] في الـ [[by]]، والمدة ٤ × scrape interval أو أكتر.`,
          lines: [
            "Traffic: طلبات في الثانية لكل route (rate الأول وبعدين sum).",
            "زاد كام طلب في آخر دقيقة لكل status (بكسور لأنه تقدير).",
            "Errors: نسبة الـ 5xx من كل الطلبات، من 0 لـ 1.",
            "Latency: p95 لكل route من الـ buckets (le لازم تفضل في الـ by).",
            "Saturation: نسبة شغل المعالج من node_exporter.",
            "ويندوز: نفس نسبة الأخطاء، والـ label بين single quotes عشان PowerShell."
          ],
          sol: R`المتوسط: [[sum by (route) (rate(http_request_duration_seconds_sum[5m])) / sum by (route) (rate(http_request_duration_seconds_count[5m]))]]. عندي طلع [[0.0502]] لـ [[/users/:id]] و [[0.2536]] لـ [[/checkout]]، والـ p95 [[0.095]] و [[0.475]]. المتوسط قريب من الحقيقة لأنه من المجموع، والـ p95 تقدير جوه الـ bucket.

بعد [[docker restart]]: [[http_requests_total]] نزل (عندي من 7293 لـ 281)، و [[resets(...[10m])]] = [[1]]، و [[rate]] فضل رقم موجب معقول (أقل شوية للوقت اللي التطبيق كان واقف فيه). ولو عملت [[rate(sum(...)[1m])]] هيرفض: [[ranges only allowed for vector selectors]].`
        }
      ]
    },
    {
      t: "لوحات وتنبيهات: تعرف قبل اليوزر",
      l: 3,
      n: "أول dashboard بـ ٤ رسومات (الـ golden signals) متعرّف في ملفات، وقواعد تنبيه في Prometheus بتوصل لـ Alertmanager وهو بيوزّعها، واتجربت وهي بتضرب فعلًا",
      items: [
        {
          cmd: "Grafana provisioning",
          title: "أول dashboard من ملفات: الـ golden signals الأربعة",
          desc: R`Grafana provisioning: بدل ما تضغط في الواجهة عشان تضيف data source وتبني dashboard (وتضيع لو الـ container اتمسح)، بتحط ملفات YAML و JSON في فولدر، و Grafana يقراها وهو بيقوم. نفس الملفات في git = نفس اللوحة على أي جهاز وفي أي وقت.

وأول dashboard عليه الـ golden signals الأربعة من كتاب Google SRE: Latency (p95)، و Traffic (طلبات في الثانية)، و Errors (نسبة 5xx)، و Saturation (المعالج والرام). وده نفس RED (Rate و Errors و Duration) لكل API، زائد الـ Saturation للسيرفر.`,
          example: R`# Linux and Mac:
curl -s localhost:3001/api/health
curl -s -u admin:lab-only-pass localhost:3001/api/datasources/uid/prom/health
curl -s -u admin:lab-only-pass 'localhost:3001/api/search?query=golden'
docker logs b3d-grafana 2>&1 | grep -E 'logger=provisioning\.(datasources|dashboard)'
# Windows (PowerShell):
Invoke-RestMethod http://localhost:3001/api/health
curl.exe -s -u admin:lab-only-pass "localhost:3001/api/search?query=golden"`,
          try: R`ضيف service الـ Grafana والملفات اللي في الحل للـ lab، و [[docker compose up -d grafana]]، وافتح [[http://localhost:3001/d/golden]] (admin والباسورد اللي في الـ compose). وبعدين امسح الـ container ([[docker compose rm -sf grafana]]) وشغّله تاني، واتأكد إن الـ data source والـ dashboard رجعوا لوحدهم. وأخيرًا زوّد panel خامس لـ [[http_requests_in_flight]] في ملف الـ JSON واعمل restart.`,
          flag: "script",
          deep: {
            why: R`Grafana اللي اتعمل بالضغط بيعيش في قاعدة بيانات جوه الـ container. اتمسح، أو اتنقل لسيرفر تاني، أو حد غيّر query بالغلط: اللوحة راحت أو اتغيرت ومحدش يعرف إمتى. ولما الملفات في git، التغيير بيتراجع في PR زي الكود، وأي حد في الفريق بيشغّل نفس اللوحة على جهازه بأمر واحد. والـ golden signals هي الإجابة على «أحط إيه على أول لوحة؟»: الأربعة اللي اليوزر حاسس بيهم، مش ١٠٠ رسمة.`,
            how: R`Grafana وهو بيقوم بيقرا [[/etc/grafana/provisioning/datasources/*.yml]] ويعمل الـ data sources اللي فيها، و [[/etc/grafana/provisioning/dashboards/*.yml]] اللي بيقوله «الـ dashboards في الفولدر الفلاني» ويقرا كل ملف JSON هناك. والـ docs بتقول إنه بيبص على الفولدر كل [[updateIntervalSeconds]] (الافتراضي ١٠ ثواني)، بس على Docker Desktop مع فولدر متركّب من ويندوز التعديل مظهرش لوحده في دقيقة، وظهر بعد restart.

الـ data source المتعمل من ملف بيبقى [[readOnly]] في الواجهة، والـ dashboard [[provisioned: true]]: لو عدّلته في الواجهة مش هيتحفظ (مع [[allowUiUpdates: false]])، والتعديل الصح في الملف.

[[uid]] ثابت (هنا [[prom]] و [[golden]]): الـ panels بتشاور على الـ data source بالـ uid، والرابط [[/d/golden]] مبيتغيرش.

[[$__rate_interval]] متغيّر في Grafana بيختار مدة الـ [[rate]] لوحده حسب الـ zoom والـ scrape interval (الـ docs بتقول على الأقل ٤ أضعاف الـ scrape interval)، فمتكتبش [[[1m]]] ثابتة في الـ dashboard.

الـ golden signals لكل خدمة بيكلمها يوزرز: Latency و Traffic و Errors و Saturation. RED (من Tom Wilkie) نفس الـ ٣ الأولانيين. و USE (من Brendan Gregg) للموارد: Utilization و Saturation و Errors لكل CPU وديسك وشبكة.`,
            when: R`أول ما Prometheus يشتغل ويبقى عندك metrics من التطبيق. لوحة واحدة فيها الأربعة لكل خدمة، وبعد كده لوحات أعمق للي محتاجه (قاعدة البيانات، الـ queue). ولأرقام السيرفر بس: dashboard جاهز من grafana.com زي 1860 لـ node_exporter (درس «node_exporter و Grafana» في تاب VPS) وحطّه برضه كملف JSON في نفس الفولدر.`,
            mistakes: R`تبني اللوحة بالضغط وتنسى تصدّرها، فأول [[docker compose down -v]] ياخدها. ومن غير volume لـ [[/var/lib/grafana]] على السيرفر: الـ users والـ plugins بتروح مع كل container جديد. و URL الـ data source [[http://localhost:9090]] (ده Grafana نفسه): الصح اسم الـ service. وتحط الباسورد الحقيقي في الـ compose اللي في git: حطه في ملف [[.env]] مش متتبّع. و ٣٠ panel في أول لوحة: محدش هيعرف يبص فين وقت المشكلة. وتفتح Grafana على [[0.0.0.0:3000]] من غير HTTPS ولا باسورد قوي.`
          },
          teach: R`## الفكرة: Grafana بيقرا فولدر وهو بيقوم

٤ ملفات: واحد بيعرّف الـ data source، وواحد بيقول «الـ dashboards في الفولدر ده»، وملف JSON للـ dashboard، وسطور في [[compose.yaml]] بتركّب الفولدرات جوه الـ container. مفيش ضغط في الواجهة خالص.

اتجرّب بـ Grafana 13.3.0 (الـ image الرسمي [[grafana/grafana:13.3.0-slim]]) مع Prometheus 3.15.1 بتاع الـ lab على Docker Desktop. الأوامر من Git Bash، والـ PowerShell في pwsh 7.6 و Windows PowerShell 5.1. والـ panels اتأكدت إن فيها أرقام بالـ API بتاع Grafana نفسه ([[/api/ds/query]])، مش بالبص بس.

---

## ١. الـ data source: [[provisioning/datasources/prometheus.yml]]

~~~yaml
apiVersion: 1
datasources:
  - name: Prometheus
    uid: prom
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
~~~

| السطر | معناه |
|---|---|
| [[apiVersion: 1]] | إصدار صيغة ملفات الـ provisioning |
| [[uid: prom]] | id ثابت بتشاور عليه الـ panels. من غيره Grafana بيعمل واحد عشوائي |
| [[type: prometheus]] | نوع الـ plugin |
| [[access: proxy]] | سيرفر Grafana هو اللي بيكلم Prometheus، مش المتصفح. عشان كده الاسم الداخلي [[prometheus]] شغال |
| [[url: http://prometheus:9090]] | اسم الـ service في compose |
| [[isDefault: true]] | الـ data source الافتراضي لأي panel جديد |

### اتأكد إنه شغال

~~~bash
curl -s -u admin:lab-only-pass localhost:3001/api/datasources/uid/prom/health
~~~

[[-u admin:lab-only-pass]] باسورد الـ lab (من [[GF_SECURITY_ADMIN_PASSWORD]] في الـ compose)، و [[/health]] بيخلّي Grafana يسأل Prometheus فعلًا:

~~~text الناتج
{"details":{"application":"Prometheus","features":{"rulerApiEnabled":false}},"message":"Successfully queried the Prometheus API.","status":"OK"}
~~~

### حاجة طلعت في الـ slim image

أول تشغيلة نفس الأمر رجّع:

~~~text الناتج (أول دقيقة)
{"statusCode":404,"messageId":"plugin.notRegistered","message":"Plugin not registered"}
~~~

الـ image [[13.3.0-slim]] نزّل الـ data source plugins (ومنهم prometheus) من النت في الخلفية بعد ما قام، واللوج قال [[Plugin successfully installed pluginId=prometheus duration=15.27s]] بعد حوالي دقيقة وربع من البداية، وبعدها الـ health بقى OK. واتحطوا في [[/var/lib/grafana/plugins]]، فلو الفولدر ده volume مش هيتنزلوا تاني. السيرفر اللي مفيهوش نت (أو بيحجب grafana.com) استخدم الـ image العادي [[grafana/grafana:13.3.0]] أو نزّل الـ plugins مرة وركّبهم.

---

## ٢. الـ dashboards provider: [[provisioning/dashboards/files.yml]]

~~~yaml
apiVersion: 1
providers:
  - name: files
    folder: App
    type: file
    allowUiUpdates: false
    options:
      path: /var/lib/grafana/dashboards
~~~

- [[folder: App]] الـ dashboards هتظهر في فولدر اسمه App في الواجهة.
- [[type: file]] اقرا من ملفات.
- [[allowUiUpdates: false]] متسمحش بحفظ تعديل من الواجهة: الملف هو المرجع.
- [[path]] الفولدر جوه الـ container اللي فيه ملفات JSON (متركّب من [[./grafana/dashboards]]).

واللوج وهو بيقوم ([[docker logs b3d-grafana 2>&1 | grep -E 'logger=provisioning\.(datasources|dashboard)']]، و [[\.]] نقطة حقيقية مش «أي حرف»):

~~~text الناتج (من غير الوقت)
logger=provisioning.datasources level=info msg="inserting datasource from configuration" name=Prometheus uid=prom
logger=provisioning.dashboard level=info msg="starting to provision dashboards"
logger=provisioning.dashboard level=info msg="finished to provision dashboards"
~~~

لو الملف فيه غلطة YAML، هنا هتلاقي [[level=error]] بالسبب.

---

## ٣. الـ dashboard: الـ golden signals

ملف JSON (كامل في الحل) فيه ٤ panels من نوع [[timeseries]]. كل panel: [[title]]، و [[gridPos]] (مكانه وحجمه: الشاشة عرضها ٢٤ عمود، فـ [[w: 12]] نصها)، و [[datasource: {uid: "prom"}]]، و [[unit]]، و [[targets]] فيها الـ query. الـ queries هي نفسها اللي في درس «PromQL»:

| Signal | السؤال | الـ query | [[unit]] |
|---|---|---|---|
| Traffic | جالي كام طلب؟ | [[sum by (route) (rate(http_requests_total[$__rate_interval]))]] | [[reqps]] |
| Errors | كام في المية فشل؟ | [[sum(rate(...{status=~"5.."}[...])) / sum(rate(...[...]))]] | [[percentunit]] (0.05 تتعرض 5%) |
| Latency | أبطأ ٥٪ بياخدوا قد إيه؟ | [[histogram_quantile(0.95, sum by (le, route) (rate(..._bucket[...])))]] | [[s]] |
| Saturation | السيرفر قرّب يتملى؟ | CPU٪ و RAM٪ من node_exporter | [[percent]] |

- [[legendFormat: "{{route}}"]] اسم كل خط في الرسم = قيمة الـ label [[route]].
- جوه JSON علامة التنصيص اللي جوه الـ query بتتكتب [[\"]]: [[{status=~\"5..\"}]].

### هل الـ panels فيها أرقام فعلًا؟

سكربت صغير بعت كل query من الملف لـ [[/api/ds/query]] (نفس اللي الواجهة بتعمله) على آخر ١٠ دقايق:

~~~text الناتج (آخر نقطة في كل خط، مختصر)
Traffic (req/s) | {"route":"/users/:id"} | last: 9.978443007311599
Traffic (req/s) | {"route":"/checkout"}  | last: 3.3113318665688825
Errors (5xx %)  | {}                     | last: 0
Latency p95     | {"route":"/checkout"}  | last: 0.4730072463768116
Latency p95     | {"route":"/users/:id"} | last: 0.0948744292237443
Saturation      | {} (CPU %)             | last: 11.95858704831334
Saturation      | RAM %                  | last: 21.308102975216727
~~~

نفس أرقام Prometheus مباشرة. و Errors صفر لأن آخر دقايق مكانش فيها 500 (ولما رفعنا الأخطاء في درس التنبيهات، نفس الـ panel طلّع [[0.1278]] يعني ١٢.٨٪).

### [[api/search]]: الـ dashboard موجود؟

~~~text الناتج (مختصر)
[{"uid":"golden","title":"API: golden signals","url":"/d/golden/api3a-golden-signals","folderTitle":"App", ...}]
~~~

و [[/api/dashboards/uid/golden]] قال [[provisioned: true]] و [[provisionedExternalId: golden.json]]، و [[/api/datasources]] قال [[readOnly: true]]. يعني الاتنين جايين من الملفات.

---

## ٤. ليه الأربعة دول بالذات

| | بيقولك | لو هو بس اللي عندك |
|---|---|---|
| Traffic | فيه يوزرز ولا لأ، وقد إيه | الترافيك نزل فجأة لصفر؟ غالبًا حاجة قبل التطبيق واقعة (DNS، Nginx) |
| Errors | اليوزرز بيشوفوا أخطاء | أول حاجة تتنبّه عليها |
| Latency | الموقع بطيء | p95 مش متوسط. وبص على latency الطلبات الناجحة لوحدها لو الأخطاء بترجع بسرعة |
| Saturation | قرّبت تتملى | بيقولك «قريب» قبل ما الأخطاء والبطء يبدأوا |

الأربعة **أعراض** بيحسها اليوزر (Saturation الاستثناء: سبب قريب ومؤكد). وده نفس كلام درس «أعراض مش أسباب» في تاب VPS، وعليهم بتتبني الـ SLOs (درس «SLI / SLO / error budget» في تاب السحابة).

---

## ٥. ويندوز

~~~powershell
Invoke-RestMethod http://localhost:3001/api/health
curl.exe -s -u admin:lab-only-pass "localhost:3001/api/search?query=golden"
~~~

~~~text الناتج (pwsh 7.6 و 5.1 زي بعض)
database : ok
version  : 13.3.0
commit   : 6f8ce3c693b493043ebcd4787566d2b6b118b0f0
~~~

وبعده نفس JSON الـ search. الـ URL بين double quotes عشان [[?]] و [[=]] يوصلوا لـ curl زي ما هما.

---

## الخلاصة

| الملف | دوره |
|---|---|
| [[datasources/prometheus.yml]] | Prometheus بـ uid ثابت وعنوان داخلي |
| [[dashboards/files.yml]] | «الـ dashboards في الفولدر ده» |
| [[dashboards/golden.json]] | ٤ panels: Traffic و Errors و Latency و Saturation |
| [[compose.yaml]] | يركّب الفولدرات، والباسورد من env |

اللوحة في git، والواجهة للعرض بس.`,
          lines: [
            "Grafana شغال؟ (database ok والنسخة).",
            "Grafana يقدر يكلم Prometheus من الـ data source اللي في الملف؟",
            "الـ dashboard اتعمل من الملف؟ (uid و folder).",
            "لوج الـ provisioning وهو بيقوم: اتعمل إيه، وأي غلطة.",
            "ويندوز: نفس فحص الـ health.",
            "ويندوز: نفس البحث عن الـ dashboard."
          ],
          sol: R`بعد [[docker compose up -d grafana]] (وتستنى الـ plugin لو الـ image slim): [[http://localhost:3001/d/golden]] فيه ٤ رسومات. ولو مسحت الـ container ورجّعته، الـ data source والـ dashboard بيرجعوا لوحدهم لأنهم من الملفات، لكن أي حاجة عملتها بالضغط (يوزر جديد، dashboard تاني) بتروح لو مفيش volume لـ [[/var/lib/grafana]].

الـ panel الخامس: زوّد في [[panels]] واحد بـ [[id: 5]] و [[gridPos: {x: 0, y: 16, w: 12, h: 8}]] و [[expr: "sum(http_requests_in_flight)"]] (Gauge، فمن غير [[rate]]). وبعدين [[docker compose restart grafana]]: جربتها، و [[/api/dashboards/uid/golden]] بقى فيه ٥ panels، والـ query رجّعت أرقام. (من غير restart التعديل مظهرش في دقيقة على Docker Desktop.)

لو الـ panels فاضية: [[/api/datasources/uid/prom/health]] الأول. [[Plugin not registered]] = الـ plugin لسه بيتنزل، و [[connection refused]] = الـ URL فيه localhost.`,
          solCode: R`# compose.yaml (زوّد الـ service دي للـ lab)
  grafana:
    image: grafana/grafana:13.3.0-slim
    container_name: b3d-grafana
    environment:
      GF_SECURITY_ADMIN_PASSWORD: lab-only-pass
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
      - ./grafana/dashboards:/var/lib/grafana/dashboards:ro
    ports: ["127.0.0.1:3001:3000"]

# grafana/provisioning/datasources/prometheus.yml
apiVersion: 1
datasources:
  - name: Prometheus
    uid: prom
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true

# grafana/provisioning/dashboards/files.yml
apiVersion: 1
providers:
  - name: files
    folder: App
    type: file
    allowUiUpdates: false
    options:
      path: /var/lib/grafana/dashboards

# grafana/dashboards/golden.json
{
  "uid": "golden",
  "title": "API: golden signals",
  "time": { "from": "now-30m", "to": "now" },
  "refresh": "30s",
  "panels": [
    { "id": 1, "type": "timeseries", "title": "Traffic (req/s)", "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
      "datasource": { "uid": "prom" }, "fieldConfig": { "defaults": { "unit": "reqps" } },
      "targets": [{ "refId": "A", "expr": "sum by (route) (rate(http_requests_total[$__rate_interval]))", "legendFormat": "{{route}}" }] },
    { "id": 2, "type": "timeseries", "title": "Errors (5xx %)", "gridPos": { "x": 12, "y": 0, "w": 12, "h": 8 },
      "datasource": { "uid": "prom" }, "fieldConfig": { "defaults": { "unit": "percentunit" } },
      "targets": [{ "refId": "A", "expr": "sum(rate(http_requests_total{status=~\"5..\"}[$__rate_interval])) / sum(rate(http_requests_total[$__rate_interval]))", "legendFormat": "5xx" }] },
    { "id": 3, "type": "timeseries", "title": "Latency p95", "gridPos": { "x": 0, "y": 8, "w": 12, "h": 8 },
      "datasource": { "uid": "prom" }, "fieldConfig": { "defaults": { "unit": "s" } },
      "targets": [{ "refId": "A", "expr": "histogram_quantile(0.95, sum by (le, route) (rate(http_request_duration_seconds_bucket[$__rate_interval])))", "legendFormat": "{{route}}" }] },
    { "id": 4, "type": "timeseries", "title": "Saturation", "gridPos": { "x": 12, "y": 8, "w": 12, "h": 8 },
      "datasource": { "uid": "prom" }, "fieldConfig": { "defaults": { "unit": "percent" } },
      "targets": [
        { "refId": "A", "expr": "100 * (1 - avg(rate(node_cpu_seconds_total{mode=\"idle\"}[$__rate_interval])))", "legendFormat": "CPU %" },
        { "refId": "B", "expr": "100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)", "legendFormat": "RAM %" }] }
  ]
}`
        },
        {
          cmd: "Alertmanager",
          title: "التنبيه يوصلك: قواعد في Prometheus و Alertmanager بيوزّع",
          desc: R`Prometheus بيحسب قواعد التنبيه ([[alerts.yml]]) كل [[evaluation_interval]]: لو الـ [[expr]] رجّع نتيجة، التنبيه يبقى pending، ولو فضل كده طول مدة [[for]] يبقى firing ويتبعت لـ Alertmanager. و Alertmanager بيجمّع التنبيهات ويوزّعها حسب الـ labels ([[severity="page"]] لقناة، والباقي لقناة تانية)، وبيبعت resolved لما تخلص، وبيسكّتها وقت الصيانة (silence).

جربته بجد: نسبة الأخطاء ١٠٪، والديسك ٩٤٪، و target واقع. والـ webhook receiver طبع كل FIRING و RESOLVED بوقته.`,
          example: R`# Linux and Mac:
docker exec b3d-prom promtool check rules /etc/prometheus/alerts.yml
docker exec b3d-am amtool check-config /etc/alertmanager/alertmanager.yml
curl -s localhost:3000/chaos/0.5
docker exec b3d-am amtool --alertmanager.url=http://localhost:9093 alert query
docker logs b3d-hook
docker exec b3d-am amtool --alertmanager.url=http://localhost:9093 silence add alertname=TargetDown --duration=30m --author=ali --comment="planned deploy"
# Windows (PowerShell):
curl.exe -s localhost:3000/chaos/0.5
docker logs b3d-hook 2>&1 | Select-String 'FIRING|RESOLVED'`,
          try: R`على الـ lab بالملفات اللي في الحل: ارفع الأخطاء بـ [[/chaos/0.5]] واكتب الوقت، وتابع [[http://localhost:9090/alerts]] لحد ما HighErrorRate يبقى pending وبعدين firing، واقرا [[docker logs b3d-hook]]. رجّعها [[/chaos/0.01]] واحسب الـ RESOLVED وصل بعد قد إيه، وفسّر ليه. وبعدين [[docker stop b3d-api]] وشوف أنهي تنبيه بيضرب وأنهي لأ.`,
          flag: "script",
          deep: {
            why: R`Dashboard محدش بيبص عليه الساعة ٣ الفجر. التنبيه هو اللي بيحوّل الرقم لرسالة. ولو التنبيهات في Prometheus والتوزيع في Alertmanager، القواعد بتبقى ملفات في git جنب الكود، وتتختبر بـ [[promtool]] زي unit tests، والتوزيع (مين يصحى ومين يشوفها الصبح) في مكان واحد. وده نفس الستاك اللي Kubernetes و أغلب الشركات بتستخدمه، فاللي هتتعلمه هنا هتلاقيه هناك.`,
            how: R`القاعدة: [[alert]] اسم، و [[expr]] PromQL (كل series بيرجعها = تنبيه)، و [[for]] المدة اللي لازم يفضل فيها، و [[labels]] بتتحط على التنبيه (Alertmanager بيوزّع بيها)، و [[annotations]] النص اللي بيوصل، وفيه [[{{ $value }}]] (الرقم) و [[{{ $labels.job }}]].

الحالات: inactive (الـ expr فاضي)، pending (رجع نتيجة ولسه [[for]] مخلصتش)، firing. وفي firing، Prometheus بيبعته لـ Alertmanager كل شوية لحد ما يخلص.

Alertmanager: [[route]] شجرة. التنبيه بيدخل من فوق، وأول [[routes]] فرع الـ [[matchers]] بتاعه طابقت بياخده، ولو مفيش، الـ [[receiver]] الافتراضي. [[group_by: [alertname]]] بيجمع التنبيهات اللي ليها نفس الاسم في رسالة واحدة، و [[group_wait]] يستنى قبل أول رسالة عشان يجمع، و [[group_interval]] كل قد إيه يبعت تحديث للمجموعة (تنبيه جديد فيها أو resolved)، و [[repeat_interval]] يكرر نفس التنبيه لو لسه شغال.

[[webhook_configs]] بيبعت POST فيه JSON لأي URL. وفيه receivers جاهزة لـ Slack و Telegram و email و PagerDuty بنفس الطريقة.`,
            when: R`أول ما يبقى عندك metrics و dashboard. ابدأ بـ ٣: الأخطاء (عَرَض)، والـ target واقع (المراقبة نفسها عمياء)، والديسك (سبب أكيد وقريب). وزوّد بس لما مشكلة تحصل ومتجيش تنبيه عليها.`,
            mistakes: R`[[for: 0]] أو من غير [[for]]: كل spike ثانيتين رسالة. وتنبيه الأخطاء بس من غير [[up == 0]]: التطبيق لو وقع خالص مفيش أرقام، فالنسبة مبتتحسبش ومحدش بيتنبّه (جربناها تحت). و [[rule_files]] بمسار غلط: جربتها، Prometheus قام عادي و [[/api/v1/rules]] رجّع [[groups: []]] من غير أي error، و [[promtool check config]] هو اللي قال [[does not point to an existing file]]. و [[severity="Page"]] في التنبيه و [[severity="page"]] في الـ route: الـ matching حساس للحروف، فبيروح للقناة الافتراضية. و [[repeat_interval]] قصير فنفس الرسالة كل ٥ دقايق. وتفتكر إن الـ annotation في رسالة الـ RESOLVED هو الرقم دلوقتي: ده آخر رقم وهو firing.`
          },
          teach: R`## الفكرة: Prometheus بيقرر، و Alertmanager بيوصّل

١. Prometheus كل ١٥ ثانية بيحسب كل قاعدة في [[alerts.yml]].
٢. القاعدة اللي ضربت ([[for]] خلصت) بتتبعت لـ Alertmanager.
٣. Alertmanager بيشوف الـ labels، ويختار receiver، ويستنى شوية يجمع، ويبعت.

في الـ lab الـ receiver سيرفر Node صغير ([[b3d-hook]]) بيطبع كل تنبيه يوصله، بدل Slack أو Telegram (من غير حسابات ولا tokens). اتجرّب بـ Prometheus 3.15.1 و Alertmanager 0.34.1 ([[prom/alertmanager:v0.34.1]]) و node_exporter 1.12.1 على Docker Desktop، والأوقات تحت حقيقية (UTC).

---

## ١. القواعد: [[prometheus/alerts.yml]]

~~~yaml
groups:
  - name: api
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 2m
        labels:
          severity: page
        annotations:
          summary: "5xx {{ $value | humanizePercentage }} of requests"
~~~

| السطر | معناه |
|---|---|
| [[groups]] و [[name: api]] | القواعد في مجموعات، وكل مجموعة بتتحسب مع بعض |
| [[alert: HighErrorRate]] | اسم التنبيه، وبيبقى label [[alertname]] |
| [[expr: ... > 0.05]] | نسبة الأخطاء (درس «PromQL») أكبر من ٥٪. [[>]] بيرجّع الـ series بس لو الشرط صح، يعني لو أقل من ٥٪ النتيجة فاضية = مفيش تنبيه |
| [[for: 2m]] | لازم يفضل صح دقيقتين متواصلين |
| [[severity: page]] | label بيتحط على التنبيه، و Alertmanager بيوزّع بيه |
| [[{{ $value }}]] | الرقم اللي الـ expr رجّعه، و [[humanizePercentage]] بيحوّل 0.1041 لـ 10.41% |

والتانيين في نفس الملف (كامل في الحل):

~~~yaml
      - alert: TargetDown
        expr: up == 0
        for: 1m
  - name: node
    rules:
      - alert: DiskAlmostFull
        expr: node_filesystem_avail_bytes{mountpoint="/data"} / node_filesystem_size_bytes{mountpoint="/data"} < 0.10
        for: 1m
        labels:
          severity: ticket
~~~

الديسك: الفاضي ÷ الحجم أقل من ١٠٪. على سيرفر حقيقي [[mountpoint="/"]] و [[for: 10m]] أو أكتر. في الـ lab استخدمت [[/data]]: tmpfs حجمه ٦٤ ميجا جوه container الـ node_exporter (من الرام، بيتمسح مع الـ container)، عشان أملاه من غير ما ألمس ديسك الجهاز. وتنبيه «الديسك هيخلص بكرة» بـ [[predict_linear]] في درس «Grafana alert rules» في تاب VPS.

### [[promtool check rules]] و [[amtool check-config]]

~~~text الناتج
Checking /etc/prometheus/alerts.yml
  SUCCESS: 3 rules found

Checking '/etc/alertmanager/alertmanager.yml'  SUCCESS
Found:
 - global config
 - route
 - 0 inhibit rules
 - 2 receivers
 - 0 templates
~~~

و [[prometheus.yml]] محتاج سطرين زيادة: [[rule_files]] (فين القواعد) و [[alerting]] (فين Alertmanager). وبعدها [[promtool check config]] بيقول [[SUCCESS: 1 rule files found]]. ولو المسار غلط بيقول [[FAILED: "/etc/prometheus/alert.yml" does not point to an existing file]]، بينما Prometheus نفسه بيقوم عادي من غير قواعد ومن غير ما يشتكي.

---

## ٢. التوزيع: [[alertmanager/alertmanager.yml]]

~~~yaml
route:
  receiver: tickets
  group_by: [alertname]
  group_wait: 10s
  group_interval: 1m
  repeat_interval: 4h
  routes:
    - matchers: ['severity="page"']
      receiver: pager
receivers:
  - name: pager
    webhook_configs:
      - url: http://hook:5001/pager
  - name: tickets
    webhook_configs:
      - url: http://hook:5001/tickets
~~~

- [[receiver: tickets]] الافتراضي: أي تنبيه مطابقش فرع.
- [[matchers: ['severity="page"']]] الفرع ده لـ [[severity="page"]] بس، ويروح [[pager]]. في الحقيقة [[pager]] يبقى Telegram أو PagerDuty بصوت، و [[tickets]] قناة بتتشاف الصبح.
- الاتنين نفس الـ hook بمسار مختلف عشان نشوف التوزيع في اللوج.

amtool بيوري الشجرة، وبيختبر تنبيه رايح فين من غير ما تبعته:

~~~text amtool config routes show
Routing tree:
.
└── default-route  receiver: tickets
    └── {severity="page"}  receiver: pager
~~~

~~~text amtool config routes test --config.file=/etc/alertmanager/alertmanager.yml <labels> (٣ مرات، الـ labels على الشمال والناتج على اليمين)
severity=page alertname=HighErrorRate   →  pager
severity=ticket                         →  tickets
severity=Page                           →  tickets
~~~

السطر الأخير: [[Page]] بحرف كبير راح للقناة الغلط. الـ matching حساس للحروف.

---

## ٣. التجربة: الأوقات بالظبط

الساعة 00:27:29 بعتّ [[curl -s localhost:3000/chaos/0.5]] (نص الـ checkout بقى 500) وملّيت [[/data]] بـ ٦٠ ميجا ([[dd]] جوه الـ container، ٩٤٪). وبعدين:

| الوقت | اللي حصل |
|---|---|
| 00:27:41 | DiskAlmostFull: **pending** (أول evaluation بعد الملي) |
| 00:28:41 | DiskAlmostFull: **firing** (بعد [[for: 1m]]) |
| 00:28:56 | الـ hook: [[/tickets FIRING DiskAlmostFull]] (بعد [[group_wait]] ١٠ ثواني) |
| 00:29:45 | HighErrorRate: **pending**. ليه بعد دقيقتين وربع؟ [[[5m]]] لسه فيها دقايق قديمة نضيفة، والنسبة محتاجة وقت تعدّي ٥٪ |
| 00:31:45 | HighErrorRate: **firing** (بعد [[for: 2m]]) |
| 00:32:00 | الـ hook: [[/pager FIRING HighErrorRate]] |
| 00:32:09 | رجّعت الأخطاء [[/chaos/0.01]] وشلت الملف |
| 00:32:56 | الـ hook: [[/tickets RESOLVED DiskAlmostFull]] |
| 00:36:00 | الـ hook: [[/pager RESOLVED HighErrorRate]]: ٤ دقايق تقريبًا بعد الإصلاح، لأن الأخطاء القديمة فضلت جوه الـ [[[5m]]] لحد ما النسبة نزلت تحت ٥٪ |

يعني من أول مشكلة لأول رسالة: حوالي دقيقة ونص للديسك، و ٤ دقايق ونص للأخطاء. المدة دي = وقت الـ [[rate[5m]]] يحس + [[for]] + [[group_wait]]. لو عايزها أسرع: [[[1m]]] و [[for]] أقل، والتمن رسايل أكتر على spikes قصيرة.

### [[docker logs b3d-hook]]

~~~text الناتج (الـ labels مختصرة)
/tickets FIRING DiskAlmostFull {"alertname":"DiskAlmostFull","device":"tmpfs",...,"mountpoint":"/data","severity":"ticket"} | /data has 6.25% free
/pager FIRING HighErrorRate {"alertname":"HighErrorRate","severity":"page"} | 5xx 10.41% of requests
/tickets RESOLVED DiskAlmostFull {...} | /data has 6.25% free
/pager RESOLVED HighErrorRate {"alertname":"HighErrorRate","severity":"page"} | 5xx 5.134% of requests
~~~

- [[/pager]] و [[/tickets]]: التوزيع اشتغل حسب [[severity]].
- [[6.25% free]]: ٤ ميجا من ٦٤.
- رسالة الـ RESOLVED فيها **آخر رقم وهو firing** ([[5.134%]] و [[6.25%]])، مش الرقم دلوقتي. متتلخبطش.
- HighErrorRate مفيهوش [[instance]] لأن [[sum(...)]] رمى كل الـ labels. ده مقصود: تنبيه واحد للتطبيق كله مش واحد لكل instance.

### [[amtool alert query]] وهما شغالين

~~~text الناتج
Alertname       Starts At                Summary                 State
DiskAlmostFull  2026-10-28 00:28:41 UTC  /data has 6.25% free    active
HighErrorRate   2026-10-28 00:31:45 UTC  5xx 10.41% of requests  active
~~~

[[Starts At]] هنا وقت الـ firing، مش أول pending (اللي Prometheus بيسميه [[activeAt]]).

---

## ٤. التطبيق وقع خالص

الساعة 00:36:31 [[docker stop b3d-api]]. TargetDown ([[up == 0]] لمدة دقيقة) وصل 00:38:00:

~~~text الناتج
/pager FIRING TargetDown {"alertname":"TargetDown","instance":"api:3000","job":"api","severity":"page"} | api on api:3000 is not answering scrapes
~~~

وفي نفس اللحظة نسبة الأخطاء كانت [[0.0016]] (ولا قريبة من ٥٪)، و [[http_requests_total]] رجّع فاضي. التطبيق واقع ١٠٠٪ وتنبيه الأخطاء ساكت، لأن مفيش طلبات بتتعدّ أصلًا. من غير [[up == 0]] (أو [[absent(http_requests_total)]] اللي رجّع [[1]]) محدش كان هيعرف. شغّلته 00:38:12، والـ RESOLVED وصل 00:39:00.

---

## ٥. Silence: «أنا عارف، اسكت»

~~~bash
docker exec b3d-am amtool --alertmanager.url=http://localhost:9093 silence add alertname=TargetDown --duration=30m --author=ali --comment="planned deploy"
~~~

- [[alertname=TargetDown]] الـ matcher: أي تنبيه بالاسم ده.
- [[--duration=30m]] ينتهي لوحده بعد نص ساعة، فمتنساش تشيله.
- [[--author]] اسمك، و [[--comment]] ليه (لزميلك اللي هيشوفه).

~~~text الناتج
e200dca4-b46a-4d07-8161-ba5e7d24eb43

amtool silence query:
ID                                    Matchers                Ends At                  Created By  Comment
e200dca4-b46a-4d07-8161-ba5e7d24eb43  alertname="TargetDown"  2026-10-28 01:09:23 UTC  ali         planned deploy
~~~

و [[amtool silence expire <ID>]] بيشيله قبل ميعاده. الـ silence في Alertmanager بس: Prometheus لسه شايف التنبيه firing، بس مش هيوصلك.

---

## ٦. اختبر القاعدة قبل ما تحتاجها: [[promtool test rules]]

ملف test بيدّي Prometheus أرقام وهمية ويقول «المفروض التنبيه يبقى كذا في الوقت كذا»:

~~~yaml
rule_files: [alerts.yml]
evaluation_interval: 15s
tests:
  - interval: 15s
    input_series:
      - series: 'http_requests_total{status="200"}'
        values: '0+90x40'
      - series: 'http_requests_total{status="500"}'
        values: '0+10x40'
    alert_rule_test:
      - eval_time: 1m
        alertname: HighErrorRate
        exp_alerts: []
      - eval_time: 5m
        alertname: HighErrorRate
        exp_alerts:
          - exp_labels: { severity: page }
            exp_annotations: { summary: "5xx 10% of requests" }
~~~

[[0+90x40]] يعني يبدأ من 0 ويزيد 90 كل ١٥ ثانية ٤٠ مرة. ١٠ أخطاء من كل ١٠٠ = ١٠٪. عند دقيقة لسه pending (مفيش تنبيه)، وعند ٥ دقايق firing. [[promtool test rules alerts_test.yml]] قال [[SUCCESS]]. ولما غيّرت الأولى لـ [[3m]] و [[exp_alerts: []]]:

~~~text الناتج
  FAILED:
    alertname: HighErrorRate, time: 3m,
        exp:[],
        got:[
            0:
              Labels:{alertname="HighErrorRate", severity="page"}
              Annotations:{summary="5xx 10% of requests"}
            ]
~~~

حطه في الـ CI جنب [[promtool check rules]].

---

## ٧. التنبيه مجاش؟ امشي بالترتيب

| الخطوة | تبص فين | لو غلط |
|---|---|---|
| القاعدة اتقرت؟ | [[/api/v1/rules]] أو صفحة [[/alerts]] | [[rule_files]] مساره غلط |
| حالتها إيه؟ | [[inactive]] / [[pending]] / [[firing]] | inactive = الـ expr فاضي: جرّبه في [[/query]] |
| Prometheus شايف Alertmanager؟ | [[/api/v1/alertmanagers]] | [[activeAlertmanagers]] فاضي = [[alerting]] غلط |
| Alertmanager استلم؟ | [[amtool alert query]] | مش موجود = بص على لوج Prometheus |
| راح لأنهي receiver؟ | [[amtool config routes test]] | label مكتوب غلط |
| مسكّت؟ | [[amtool silence query]] | silence قديم لسه شغال |
| الـ receiver وصله؟ | [[docker logs]] بتاع Alertmanager | error عند اسم الـ receiver = الـ URL أو الـ token غلط |

---

## ٨. ويندوز

أوامر [[docker exec]] نفسها في PowerShell. وعشان تغيّر الأخطاء وتقرا الـ hook:

~~~powershell
curl.exe -s localhost:3000/chaos/0.5
docker logs b3d-hook 2>&1 | Select-String 'FIRING|RESOLVED'
~~~

~~~text الناتج (pwsh 7.6 و 5.1 زي بعض، بعد تجربة TargetDown، وجربتها بـ /chaos/0.01 عشان مرفعش الأخطاء تاني)
{"failRate":0.01}
/pager FIRING TargetDown {"alertname":"TargetDown","instance":"api:3000","job":"api","severity":"page"} | api on api:3000 is not answering scrapes
/pager RESOLVED TargetDown {...} | api on api:3000 is not answering scrapes
~~~

[[Select-String 'FIRING|RESOLVED']] السطور اللي فيها أي واحدة من الكلمتين ([[|]] = أو).

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[expr]] + [[for]] | إمتى يضرب (والمدة بتمنع الـ spikes) |
| [[labels.severity]] | يروح لأنهي قناة |
| [[annotations]] | الرسالة، وفيها [[$value]] |
| [[route]] و [[matchers]] | التوزيع |
| [[group_wait]] و [[repeat_interval]] | إمتى أول رسالة، وكل قد إيه يكرر |
| [[up == 0]] | لازم: التطبيق الواقع مبيطلّعش أخطاء |
| [[promtool test rules]] | القاعدة شغالة قبل ما تحتاجها |`,
          lines: [
            "افحص ملف القواعد (عدد القواعد والصيغة).",
            "افحص إعداد Alertmanager (الـ route والـ receivers).",
            "الـ lab: خلي نص طلبات الـ checkout ترجع 500 عشان التنبيه يضرب.",
            "التنبيهات اللي Alertmanager استلمها دلوقتي.",
            "اللي الـ webhook receiver طبعه: FIRING و RESOLVED وراح لأنهي مسار.",
            "اسكت التنبيه ده نص ساعة (صيانة مخططة) باسمك وبسبب مكتوب.",
            "ويندوز: نفس رفع الأخطاء.",
            "ويندوز: سطور FIRING و RESOLVED من الـ hook."
          ],
          sol: R`اللي حصل عندي: [[/chaos/0.5]] الساعة 00:27:29، HighErrorRate بقى pending 00:29:45 و firing 00:31:45، والـ hook طبع [[/pager FIRING HighErrorRate ... 5xx 10.41% of requests]] 00:32:00. رجّعتها 00:32:09، والـ RESOLVED وصل 00:36:00: حوالي ٤ دقايق، لأن [[rate(...[5m])]] لسه شايل الأخطاء القديمة لحد ما النسبة تنزل تحت ٥٪، وبعدها Alertmanager بيبعت الـ resolved مع الـ [[group_interval]] الجاي.

[[docker stop b3d-api]]: TargetDown ضرب بعد دقيقة ونص تقريبًا (دقيقة [[for]] + scrape + [[group_wait]])، و HighErrorRate **ماضربش**: مفيش طلبات بتتعدّ، فالنسبة مش بتطلع فوق ٥٪. عشان كده [[up == 0]] لازم يبقى موجود.

لو مفيش حاجة وصلت للـ hook خالص: [[/api/v1/alertmanagers]] في Prometheus (فاضي = [[alerting]] في [[prometheus.yml]] غلط)، و [[docker logs b3d-am]] (لو فيه error جنب اسم الـ receiver يبقى الـ URL بتاع الـ hook غلط).`,
          solCode: R`# compose.yaml (زوّد الاتنين دول للـ lab)
  alertmanager:
    image: prom/alertmanager:v0.34.1
    container_name: b3d-am
    volumes: ["./alertmanager:/etc/alertmanager:ro"]
    ports: ["127.0.0.1:9093:9093"]
  hook:
    image: node:22-slim
    container_name: b3d-hook
    command: node /hook/hook.js
    volumes: ["./hook:/hook:ro"]

# prometheus/prometheus.yml (الملف كله بعد الإضافة)
global:
  scrape_interval: 15s
  evaluation_interval: 15s
rule_files:
  - /etc/prometheus/alerts.yml
alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]

# prometheus/alerts.yml
groups:
  - name: api
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 2m
        labels:
          severity: page
        annotations:
          summary: "5xx {{ $value | humanizePercentage }} of requests"
      - alert: TargetDown
        expr: up == 0
        for: 1m
        labels:
          severity: page
        annotations:
          summary: "{{ $labels.job }} on {{ $labels.instance }} is not answering scrapes"
  - name: node
    rules:
      - alert: DiskAlmostFull
        # على سيرفر حقيقي: mountpoint="/" و for: 10m
        expr: node_filesystem_avail_bytes{mountpoint="/data"} / node_filesystem_size_bytes{mountpoint="/data"} < 0.10
        for: 1m
        labels:
          severity: ticket
        annotations:
          summary: "{{ $labels.mountpoint }} has {{ $value | humanizePercentage }} free"

# alertmanager/alertmanager.yml
route:
  receiver: tickets
  group_by: [alertname]
  group_wait: 10s
  group_interval: 1m
  repeat_interval: 4h
  routes:
    - matchers: ['severity="page"']
      receiver: pager
receivers:
  - name: pager
    webhook_configs:
      - url: http://hook:5001/pager
  - name: tickets
    webhook_configs:
      - url: http://hook:5001/tickets

# hook/package.json فيه {"type":"module"}، و hook/hook.js:
import http from "node:http";

http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    const msg = JSON.parse(body);
    for (const a of msg.alerts) {
      console.log($__bt$__{req.url} $__{a.status.toUpperCase()} $__{a.labels.alertname} $__{JSON.stringify(a.labels)} | $__{a.annotations.summary}$__bt);
    }
    res.end("ok");
  });
}).listen(5001, () => console.log("webhook receiver on :5001"));`
        }
      ]
    }
]);
