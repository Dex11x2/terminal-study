// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
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
    }
]);
