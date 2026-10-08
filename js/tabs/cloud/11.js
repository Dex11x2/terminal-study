// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "المراقبة و SRE",
      l: 3,
      n: "تعرف إن فيه مشكلة قبل العميل، وتتصرف صح لما تحصل، وتتعلم منها",
      items: [
        {
          cmd: "CloudWatch",
          title: "لوجات ومقاييس وإنذارات على AWS",
          desc: R`المراقبة ٣ أنواع: logs (إيه اللي حصل بالتفصيل) و metrics (أرقام على مدار الوقت) و traces (رحلة طلب واحد بين الخدمات)، و CloudWatch بيجمع اللوجات والـ metrics من خدمات AWS لوحده وانت بتضيف الإنذارات.

اكتب لوجات التطبيق JSON (بـ pino مثلًا) عشان تبحث فيها بالحقول، وحط مدة احتفاظ لكل log group لأن الافتراضي «للأبد» وبيتحاسب. تحذير: تغيير المدة بيمسح اللوجات الأقدم منها، والإنذارات بتتحاسب بالشهر.`,
          example: R`aws logs tail /ecs/myapp-api --since 30m --follow --format short
aws logs put-retention-policy --log-group-name /ecs/myapp-api --retention-in-days 30
aws logs start-query --log-group-name /ecs/myapp-api --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) --query-string 'fields @timestamp, path, status | filter status >= 500 | stats count() by path'
aws logs get-query-results --query-id 12345678-1234-1234-1234-123456789012
aws cloudwatch put-metric-alarm --alarm-name myapp-5xx --namespace AWS/ApplicationELB --metric-name HTTPCode_Target_5XX_Count --dimensions Name=LoadBalancer,Value=app/myapp-alb/0123456789abcdef --statistic Sum --period 300 --evaluation-periods 1 --threshold 10 --comparison-operator GreaterThanThreshold --alarm-actions arn:aws:sns:eu-central-1:123456789012:myapp-alerts`,
          try: "حط في التطبيق logger بيطبع JSON فيه [[path]] و [[status]] و [[ms]]، وشغّله على ECS أو Lambda. واعمل Logs Insights query بتطلّع أبطأ ١٠ endpoints بـ [[stats avg(ms) by path | sort avg(ms) desc | limit 10]].",
          flag: "danger",
          deep: {
            why: "من غير مراقبة بتعرف إن الموقع واقع من عميل على واتساب. ومن غير لوجات منظمة بتقضي ساعة grep في نص عشوائي. والـ log groups اللي من غير retention بتكبر لحد ما تبقى بند كبير في الفاتورة.",
            how: R`اللوجات: كل خدمة بتكتب في log group ([[/aws/lambda/NAME]] أو اللي حددته في ECS). Lambda و ECS بـ awslogs بيودّوا stdout و stderr لوحدهم، فالتطبيق يطبع على الشاشة بس. ولو السطر JSON، Logs Insights بيفهم الحقول لوحده: [[filter status >= 500]] بدل regex.

[[start-query]] بيبدأ query ويرجّع [[queryId]]، و [[get-query-results]] بيجيب النتيجة (والكونسول أسهل). وبتدفع على الجيجات اللي اتمسحت، فضيّق الوقت.

الـ metrics: كل خدمة بتبعت metrics أساسية لوحدها (CPU الـ EC2، وأخطاء Lambda، و 5xx الـ ALB، واتصالات RDS). الـ alarm بيبص على metric كل [[period]] ثانية، ولو عدّى الحد لعدد [[evaluation-periods]] بيتحول ALARM ويبعت لـ SNS (إيميل أو Slack أو غيره).

الـ traces: X-Ray أو OpenTelemetry. كل طلب ليه trace id بيتنقل في الهيدرز بين الخدمات، فتشوف «الطلب ده قعد ٢ ثانية منهم ١.٨ في query واحدة». والتفاصيل وكود شغال في فئة «OpenTelemetry والـ tracing» تحت.

وتقدر تطلّع metrics من اللوجات نفسها (metric filters)، وده مفيد لرقم زي «عدد الطلبات اللي فشلت في الدفع».`,
            when: "من أول يوم في الإنتاج: retention لكل log group، وإنذار على 5xx، وإنذار على الـ latency، وإنذار على الفاتورة.",
            mistakes: "[[console.log]] نص حر مع كل حاجة، ومفيش request id يربط سطور الطلب الواحد. وتطبع باسوردات أو توكنات في اللوج. و ٥٠ إنذار على كل حاجة فالناس تتجاهلهم كلهم. وإنذار على CPU عالي بدل ما يبقى على اللي اليوزر حاسس بيه (أخطاء وبطء)."
          },
          teach: R`## الفكرة: ٥ أوامر: اقرا، ونضّف، ودوّر، وهات النتيجة، ونبّهني

كل سطر في المثال حاجة بتعملها في الإنتاج: تتابع اللوج لايف، وتحط مدة احتفاظ، وتسأل سؤال على اللوجات (Logs Insights)، وتجيب الإجابة، وتعمل إنذار يصحّيك.

اتجرّب بـ AWS CLI 2.37.10 (الـ image الرسمي [[amazon/aws-cli]]) على LocalStack 4.9، بعد ما عملنا log group اسمه [[/ecs/myapp-api]] وحطينا فيه سطرين JSON زي اللي الـ logger بتاع الحل بيطبعهم. LocalStack مش بينفّذ Logs Insights بجد ومش بيقيّم الإنذار، فشكل النتيجة الحقيقية في الجزء ده من الـ docs ومكتوب كده.

---

## ١. [[aws logs tail]]: تابع اللوج

~~~bash
aws logs tail /ecs/myapp-api --since 30m --follow --format short
~~~

| الحتة | معناها |
|---|---|
| [[/ecs/myapp-api]] | اسم الـ log group (اللي حددته في الـ task definition بتاعة ECS) |
| [[--since 30m]] | ابدأ من آخر ٣٠ دقيقة ([[m]] دقايق، [[h]] ساعات، [[d]] أيام) |
| [[--follow]] | متقفلش، استنى السطور الجديدة واطبعها أول ما توصل (زي [[tail -f]]). بتخرج بـ Ctrl+C |
| [[--format short]] | الوقت والرسالة بس، من غير اسم الـ stream الطويل |

~~~text الناتج (من غير --follow)
2026-10-08T11:36:02 {"level":"info","method":"GET","path":"/users/:id","status":200,"ms":4}
2026-10-08T11:36:32 {"level":"error","method":"POST","path":"/orders","status":502,"ms":3012}
~~~

كل سطر JSON، وده اللي هيخلّي الخطوة ٣ تشتغل. و [[logs tail]] موجود في AWS CLI v2 بس، مش في v1.

---

## ٢. [[put-retention-policy]]: مدة الاحتفاظ

~~~bash
aws logs put-retention-policy --log-group-name /ecs/myapp-api --retention-in-days 30
~~~

مبيطبعش حاجة لو نجح. نتأكد:

~~~bash
aws logs describe-log-groups --query "logGroups[].[logGroupName,retentionInDays,storedBytes]" --output text
~~~

~~~text الناتج
/ecs/myapp-api    30    144
~~~

- [[30]] اللوجات الأقدم من ٣٠ يوم بتتمسح لوحدها. من غير الأمر ده الخانة بتبقى فاضية، يعني «للأبد»، وبتدفع تخزين على كل سطر من أول يوم.
- [[144]] حجم اللي متخزن بالبايت (سطرين).
- [[--query]] بيختار خانات من الرد (لغة اسمها JMESPath): [[logGroups]] وبعدها قوسين مربعين فاضيين = كل group، والقوسين اللي فيهم أسماء = الخانات دي بالترتيب. و [[--output text]] بيطبعهم أعمدة بدل JSON.

> الأيام مش أي رقم: AWS بيقبل قيم محددة بس (1 و 3 و 5 و 7 و 14 و 30 و 60 و 90 و 180 و 365 وغيرهم، حسب الـ docs). LocalStack قبل [[45]] من غير اعتراض، و AWS الحقيقي بيرفضها.

---

## ٣. [[start-query]]: سؤال على اللوجات

~~~bash
aws logs start-query --log-group-name /ecs/myapp-api --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) --query-string 'fields @timestamp, path, status | filter status >= 500 | stats count() by path'
~~~

### الوقت: [[$(date -d '-1 hour' +%s)]]

[[$( )]] في bash معناها «شغّل الأمر ده وحط ناتجه مكانه». و [[date +%s]] الوقت دلوقتي بالثواني من ١ يناير ١٩٧٠ (اسمه Unix time)، و [[-d '-1 hour']] «من ساعة». على أوبونتو 24.04:

~~~text الناتج
1791459476
1791455876
~~~

الفرق ٣٦٠٠ = ساعة. و [[-d]] ده في GNU date (لينكس) بس. المقابل:

| النظام | من ساعة |
|---|---|
| لينكس | [[date -d '-1 hour' +%s]] |
| الماك (من الـ docs) | [[date -v-1H +%s]] |
| PowerShell | [[[DateTimeOffset]::UtcNow.AddHours(-1).ToUnixTimeSeconds()]] |

### الـ query نفسها

اللغة دي pipes زي الترمنال: كل [[|]] بيدّي الناتج للي بعده.

| الحتة | بتعمل إيه |
|---|---|
| [[fields @timestamp, path, status]] | الخانات اللي عايزها. [[@timestamp]] من CloudWatch، و [[path]] و [[status]] من الـ JSON بتاعك |
| [[filter status >= 500]] | الأخطاء بس (5xx) |
| [[stats count() by path]] | عدّهم، مجمّعين بالـ path |

والـ query مبتستناش النتيجة. بترجّع رقم بس:

~~~text الناتج
{
    "queryId": "9fdf6570-21e0-191e-ad8b-c51a926a1a3f"
}
~~~

> Logs Insights بيتحاسب على الجيجات اللي اتمسحت، فكل ما الوقت يضيق كل ما أرخص.

---

## ٤. [[get-query-results]]

~~~bash
aws logs get-query-results --query-id 9fdf6570-21e0-191e-ad8b-c51a926a1a3f
~~~

الـ ID اللي رجع من الخطوة اللي فاتت. الرد فيه [[status]]: [[Running]] لو لسه، و [[Complete]] لما يخلص، ومعاه [[results]]: كل صف قايمة من [[{field, value}]]. LocalStack رجّع [[status: Complete]] بس من غير ما ينفّذ الـ query فعلًا. على AWS (من الـ docs) الشكل هيبقى كده للـ 502 اللي في اللوج:

~~~text الشكل على AWS
"results": [
  [ { "field": "path", "value": "/orders" }, { "field": "count()", "value": "1" } ]
],
"status": "Complete"
~~~

---

## ٥. [[put-metric-alarm]]: الإنذار

الأمر طويل، بس هو جملة واحدة: «لو مجموع أخطاء 5xx من الـ load balancer ده في ٥ دقايق عدّى ١٠، ابعت لـ SNS».

| الحتة | معناها |
|---|---|
| [[--alarm-name myapp-5xx]] | اسمه |
| [[--namespace AWS/ApplicationELB]] | الـ metrics بتاعة الـ ALB (Application Load Balancer) |
| [[--metric-name HTTPCode_Target_5XX_Count]] | عدد ردود 5xx اللي طلعت من تطبيقك (مش من الـ ALB نفسه) |
| [[--dimensions Name=LoadBalancer,Value=app/...]] | أنهي ALB بالظبط |
| [[--statistic Sum]] | اجمع الأرقام جوه الفترة |
| [[--period 300]] | الفترة ٣٠٠ ثانية = ٥ دقايق |
| [[--evaluation-periods 1]] | فترة واحدة فوق الحد تكفي |
| [[--threshold 10]] و [[GreaterThanThreshold]] | أكبر من ١٠ (يعني ١١ أو أكتر) |
| [[--alarm-actions arn:aws:sns:...]] | لما يبقى ALARM ابعت لـ SNS topic ده (إيميل أو Slack) |

بعد الإنشاء:

~~~text aws cloudwatch describe-alarms --alarm-names myapp-5xx
"myapp-5xx", "INSUFFICIENT_DATA", "Unchecked: Initial alarm creation", 300, 1, 10.0, "GreaterThanThreshold"
~~~

الإنذار ليه ٣ حالات:

| الحالة | معناها |
|---|---|
| [[INSUFFICIENT_DATA]] | لسه مفيش أرقام كفاية. ده أول ما يتعمل |
| [[OK]] | الرقم تحت الحد |
| [[ALARM]] | الرقم عدّى الحد، والـ actions بتتبعت |

> ALB مفيش فيه أخطاء خالص مش بيبعت الـ metric دي أصلًا، فالإنذار ممكن يفضل [[INSUFFICIENT_DATA]]. لو عايزه يبقى [[OK]]، ضيف [[--treat-missing-data notBreaching]] (من الـ docs).

---

## ٦. الحل: logger بيطبع JSON

~~~js
app.use((req, res, next) => {
  const start = performance.now();
  res.on("finish", () => {
    console.log(JSON.stringify({
      level: res.statusCode >= 500 ? "error" : "info",
      method: req.method,
      path: req.route?.path ?? "unmatched",
      status: res.statusCode,
      ms: Math.round(performance.now() - start),
    }));
  });
  next();
});
~~~

شغّلناه على Node 24 و Express 5 مع route لـ [[/users/:id]] و route بيرجّع 502، وبعتنا ٤ طلبات:

~~~text الناتج
{"level":"info","method":"GET","path":"/users/:id","status":200,"ms":7}
{"level":"info","method":"GET","path":"/users/:id","status":200,"ms":2}
{"level":"error","method":"GET","path":"/boom","status":502,"ms":2}
{"level":"info","method":"GET","path":"unmatched","status":404,"ms":11}
~~~

- [[res.on("finish")]] بيشتغل بعد ما الرد يتبعت، فالـ status والوقت معروفين.
- [[performance.now()]] وقت بالمللي ثانية بدقة عالية، والفرق بين البداية والنهاية = مدة الطلب.
- [[req.route?.path]] قالب الـ route ([[/users/:id]]) مش المسار الحقيقي. [[?.]] عشان الطلبات اللي ملهاش route (404) ميوقعش، و [[??]] يدّيها [[unmatched]].
- [[res.statusCode >= 500 ? "error" : "info"]] لو الرد 5xx يبقى [[error]]، غير كده [[info]] ([[? :]] اختيار من اتنين).
- [[Math.round]] يقرّب لأقرب مللي ثانية.
- [[JSON.stringify]] سطر JSON واحد. Logs Insights بيقرا خاناته لوحده.
- [[next()]] كمّل للـ route. الـ middleware ده بيسجّل بس، مش بيرد.

لاحظ: [[/users/7]] و [[/users/8]] الاتنين [[path]] بتاعهم [[/users/:id]]، فـ [[stats ... by path]] هيجمعهم في صف واحد. والطلب اللي ملهوش route طلع [[unmatched]] بدل ما يوقع.

---

## الخلاصة

| الأمر | الشغلانة |
|---|---|
| [[logs tail --since --follow]] | تشوف اللي بيحصل دلوقتي |
| [[put-retention-policy]] | اللوجات متتخزنش للأبد |
| [[start-query]] + [[get-query-results]] | سؤال على اللوجات بالخانات |
| [[put-metric-alarm]] | تعرف قبل العميل |

والترتيب في أي مشروع جديد: لوجات JSON، و retention على كل log group، وإنذار على الأخطاء وعلى البطء.`,
          lines: [
            "تابع اللوج لايف من آخر نص ساعة.",
            "احتفظ بـ ٣٠ يوم بس (الأقدم بيتمسح).",
            "Logs Insights: عدد أخطاء 5xx لكل مسار في آخر ساعة.",
            "هات نتيجة الـ query بالرقم اللي رجع.",
            "إنذار: لو أكتر من ١٠ أخطاء 5xx في ٥ دقايق، ابعت لـ SNS."
          ],
          sol: R`الـ logger تحت (جرّبته محليًا). كل طلب بيطبع سطر زي:

[[{"level":"info","method":"GET","path":"/users/:id","status":200,"ms":4}]]

لاحظ إن [[path]] هو الـ route pattern مش المسار الحقيقي ([[/users/:id]] مش [[/users/7]])، عشان الـ stats تجمّع كل المستخدمين في سطر واحد. Logs Insights بيقرا حقول الـ JSON لوحده، فالـ query تحت بترجع جدول: [[path]] و [[avgMs]] و [[n]]، مترتب من الأبطأ.

من الترمنال: [[start-query]] بيرجّع [[queryId]]، و [[get-query-results]] بيرجّع [[status: Running]] وبعدين [[Complete]] ومعاه [[results]] كل صف فيها list من [[{field, value}]].

أخطاء شائعة: الجدول فاضي لأن التطبيق بيطبع نص عادي مش JSON (أو بيطبع [[console.log(obj)]] من غير [[JSON.stringify]] فيطلع شكل Node مش JSON)، أو اختار log group غلط أو فترة زمنية مفيهاش لوجات. ولو الـ path هو المسار الحقيقي، الـ stats هتطلع آلاف الصفوف ومفيش فايدة. ولو [[sort]] على [[avg(ms)]] مباشرة مشتغلش عندك، سمّيه بـ [[as avgMs]] زي ما تحت.`,
          solCode: R`app.use((req, res, next) => {
  const start = performance.now();
  res.on("finish", () => {
    console.log(JSON.stringify({
      level: res.statusCode >= 500 ? "error" : "info",
      method: req.method,
      path: req.route?.path ?? "unmatched",
      status: res.statusCode,
      ms: Math.round(performance.now() - start),
    }));
  });
  next();
});
// Logs Insights:
// fields path, ms | filter ispresent(ms) | stats avg(ms) as avgMs, count(*) as n by path | sort avgMs desc | limit 10`
        },
        {
          cmd: "Prometheus + Grafana",
          title: "مقاييس ولوحات لتطبيقك على أي سيرفر",
          desc: R`Prometheus بيسحب أرقام من endpoint اسمه [[/metrics]] في تطبيقك كل شوية ويخزّنها، و Grafana بيرسمها لوحات وبيعمل إنذارات، وفي Node مكتبة [[prom-client]] بتطلّع الأرقام بالشكل المطلوب.

أهم ٣ أرقام لأي API (RED): Rate (طلبات في الثانية)، و Errors (نسبة الأخطاء)، و Duration (الـ latency، خصوصًا p95 و p99).`,
          example: R`import client from "prom-client";

client.collectDefaultMetrics();
const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.3, 1, 3],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method });
  res.on("finish", () => end({ route: req.route?.path ?? "unmatched", status: res.statusCode }));
  next();
});
app.get("/metrics", async (req, res) => res.type(client.register.contentType).send(await client.register.metrics()));`,
          try: R`شغّل Prometheus و Grafana بـ Docker Compose، و [[prometheus.yml]] فيه [[scrape_configs]] بـ target [[api:3000]]. وفي Grafana اعمل panel بالـ query [[histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))]] وشوف p95 لكل route.`,
          flag: "script",
          deep: {
            why: "CloudWatch مربوط بـ AWS ومكلف مع الحجم. على VPS أو k8s، Prometheus و Grafana ببلاش ومعيار الصناعة. والمتوسط بيكدب: متوسط ١٠٠ مللي ممكن يخبّي إن ١٪ من الطلبات بتاخد ٥ ثواني.",
            how: R`Prometheus بيعمل scrape: كل [[scrape_interval]] بيطلب [[/metrics]] من كل target ويخزّن الأرقام بوقتها (time series). وكل مجموعة labels مختلفة = series لوحدها.

الأنواع: Counter (بيزيد بس، زي عدد الطلبات، وبتقراه بـ [[rate()]])، و Gauge (بيطلع وينزل، زي الاتصالات المفتوحة)، و Histogram (بيعد القيم في buckets عشان تحسب percentiles).

الـ Histogram هنا بيطلّع [[http_request_duration_seconds_bucket]] لكل حد (أقل من ٠.٠٥، أقل من ٠.١، ...)، و [[_sum]] و [[_count]]. و [[histogram_quantile(0.95, ...)]] بيحسب p95 منهم. و [[startTimer]] بيرجّع دالة، لما تناديها بتحسب المدة وتسجّلها بالـ labels.

[[collectDefaultMetrics]] بيضيف أرقام Node نفسه: الرام، و event loop lag، و GC.

الـ route لازم يبقى القالب ([[/users/:id]]) مش المسار الحقيقي ([[/users/8812]])، وإلا كل يوزر series جديدة والـ Prometheus يتملى (high cardinality).

و Grafana بيقرا من Prometheus ويرسم، وفيه alerting بيبعت Telegram أو Slack أو إيميل. ولو مش عايز تدير ده، Grafana Cloud فيه خطة مجانية.`,
            when: "أي تطبيق على VPS أو k8s في الإنتاج. وحتى على AWS لو عندك خدمات كتير وعايز لوحات موحدة.",
            mistakes: "labels فيها user id أو المسار الخام أو الإيميل: ملايين series. و [[/metrics]] مفتوح للنت (بيكشف مسارات وأرقام داخلية)، فاقفله في Nginx أو على بورت داخلي. وتحسب المتوسط بدل p95. وتعمل [[rate()]] على Gauge."
          },
          teach: R`## الفكرة: تطبيقك بيعدّ، و Prometheus بييجي ياخد العدد

الكود ده بيعمل حاجتين: يقيس مدة كل طلب ويحطها في «عدّاد» جوه الذاكرة، ويفتح صفحة [[/metrics]] بتطبع كل العدادات كنص. و Prometheus (برنامج منفصل) بيطلب الصفحة دي كل ١٥ ثانية ويخزّن الأرقام بوقتها، و Grafana بيرسمها.

اتجرّب كله: الكود ده بـ [[prom-client]] 15.1.3 و Express 5 في container [[node:22-slim]]، و Prometheus 3.15.0 (الـ image الرسمي [[prom/prometheus]]) بنفس [[prometheus.yml]] اللي في الحل، على شبكة Docker واحدة والتطبيق اسمه فيها [[api]]. Grafana نفسه متشغّلش (الـ image كبير)، وخطواته من الـ docs.

---

## ١. [[collectDefaultMetrics()]]

~~~js
import client from "prom-client";
client.collectDefaultMetrics();
~~~

سطر واحد بيضيف عشرات الأرقام عن Node نفسه. من [[/metrics]] بعد التشغيل:

~~~text الناتج (سطرين منهم)
process_resident_memory_bytes 66392064
nodejs_eventloop_lag_p99_seconds 0.010887167
~~~

- [[process_resident_memory_bytes]] الرام اللي الـ process واخدها فعلًا: ٦٦ مليون بايت ≈ ٦٣ ميجا.
- [[nodejs_eventloop_lag_p99_seconds]] الـ event loop بيتأخر قد إيه: ٩٩٪ من القياسات أقل من ١١ مللي. لو الرقم ده كبر، فيه كود تقيل بيوقف Node.

---

## ٢. الـ Histogram

~~~js
const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.3, 1, 3],
});
~~~

| الخانة | معناها |
|---|---|
| [[name]] | اسم الـ metric. العرف: الوحدة في الاسم ([[_seconds]]) والقيم بالثواني |
| [[help]] | وصف بيظهر في [[/metrics]] |
| [[labelNames]] | الأبعاد اللي هتقسّم بيها: كل تركيبة [[method]] + [[route]] + [[status]] = series لوحدها |
| [[buckets]] | الحدود بالثواني: أقل من ٥٠ مللي، أقل من ١٠٠، أقل من ٣٠٠، أقل من ثانية، أقل من ٣ |

الـ Histogram مش بيحفظ كل قيمة. بيعدّ بس: «كام طلب كان أقل من ٠.٠٥؟ كام أقل من ٠.١؟...». ده اللي بيخليه خفيف مهما الترافيك كبر.

---

## ٣. الـ middleware

~~~js
app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method });
  res.on("finish", () => end({ route: req.route?.path ?? "unmatched", status: res.statusCode }));
  next();
});
~~~

- [[startTimer({ method })]] بيبدأ ساعة، وبيرجّع **دالة** ([[end]]). والـ label [[method]] معروف من الأول.
- [[res.on("finish", ...)]] لما الرد يخلص: نادي [[end]] بالـ labels اللي فاضلة. [[end]] بتحسب الوقت من [[startTimer]] وتزوّد الـ bucket المناسب.
- [[req.route?.path]] قالب الـ route ([[/users/:id]])، مش [[/users/8812]]. لو كتبت المسار الحقيقي، كل يوزر = series جديدة، والـ Prometheus يتملي (اسمها high cardinality).
- [[next()]] كمّل للـ route.

---

## ٤. [[/metrics]]

~~~js
app.get("/metrics", async (req, res) => res.type(client.register.contentType).send(await client.register.metrics()));
~~~

[[client.register]] المكان اللي كل الـ metrics متسجلة فيه. [[.metrics()]] بيرجّع Promise بالنص كله، و [[res.type(contentType)]] بيقول للـ Prometheus الصيغة.

ضفنا route [[/users/:id]] بيستنى ١٢٠ مللي، وبعتنا ٤٠ طلب وطلب لمسار مش موجود:

~~~text الناتج (الـ route ده بس)
# HELP http_request_duration_seconds HTTP request latency
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.05",method="GET",route="/users/:id",status="200"} 0
http_request_duration_seconds_bucket{le="0.1",method="GET",route="/users/:id",status="200"} 0
http_request_duration_seconds_bucket{le="0.3",method="GET",route="/users/:id",status="200"} 40
http_request_duration_seconds_bucket{le="1",method="GET",route="/users/:id",status="200"} 40
http_request_duration_seconds_bucket{le="3",method="GET",route="/users/:id",status="200"} 40
http_request_duration_seconds_bucket{le="+Inf",method="GET",route="/users/:id",status="200"} 40
http_request_duration_seconds_sum{method="GET",route="/users/:id",status="200"} 4.841056924
http_request_duration_seconds_count{method="GET",route="/users/:id",status="200"} 40
~~~

نقرا السطور:

| السطر | معناه |
|---|---|
| [[_bucket{le="0.1"} 0]] | ولا طلب أقل من ١٠٠ مللي ([[le]] = less than or equal) |
| [[_bucket{le="0.3"} 40]] | الـ ٤٠ كلهم أقل من ٣٠٠ مللي |
| [[le="+Inf"]] | bucket لانهائي = كل الطلبات |
| [[_sum 4.84]] | مجموع الأوقات: ٤.٨٤ ÷ ٤٠ = ١٢١ مللي متوسط |
| [[_count 40]] | عددهم |

الأرقام **تراكمية**: كل bucket فيه اللي قبله. وظهر كمان سطور [[route="unmatched",status="404"]] للمسار اللي مش موجود.

---

## ٥. Prometheus بيسحب: [[prometheus.yml]]

~~~yaml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
~~~

- [[scrape_interval: 15s]] كل ١٥ ثانية يطلب [[/metrics]].
- [[job_name: api]] اسم المجموعة، وبيتحط label [[job="api"]] على كل الأرقام.
- [[targets: ["api:3000"]]] العنوان: اسم الـ service في Docker، مش [[localhost]] (اللي جوه container الـ Prometheus هو نفسه).

صفحة الـ targets ([[/api/v1/targets]]) قالت:

~~~text الناتج
api  http://api:3000/metrics  up
~~~

---

## ٦. الـ query: p95 لكل route

~~~text PromQL
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))
~~~

من جوه لبرة:

1. [[http_request_duration_seconds_bucket[5m]]] قيم كل bucket في آخر ٥ دقايق.
2. [[rate(...)]] بتزيد بكام في الثانية. العدّاد بيزيد بس، فالمهم سرعة الزيادة مش الرقم نفسه.
3. [[sum(...) by (le, route)]] اجمع كل الـ series، وسيب الـ bucket ([[le]]) والـ route منفصلين. لو شلت [[le]]، الدالة اللي بعدها مش هتلاقي buckets.
4. [[histogram_quantile(0.95, ...)]] احسب الرقم اللي ٩٥٪ من الطلبات تحته.

بعد ٥٠ ثانية طلبات على الـ route البطيء:

~~~text الناتج
unmatched   NaN
/metrics    0.0475
/users/:id  0.29
~~~

- [[/users/:id]] طلع [[0.29]] مع إن كل طلب ١٢٠ مللي. ليه؟ الـ histogram عارف بس إن الطلبات بين ٠.١ و ٠.٣، فبيقدّر جوه الـ bucket بخط مستقيم: ٩٥٪ من المسافة بين ٠.١ و ٠.٣ ≈ ٠.٢٩. عشان رقم أدق، حط buckets قريبة من الأرقام اللي تهمك (مثلًا ٠.١٥ و ٠.٢).
- [[unmatched]] طلع [[NaN]] (Not a Number): مفيش طلبات عليه في آخر ٥ دقايق، فـ ٠ ÷ ٠.

والـ Rate من نفس الـ histogram: [[sum(rate(http_request_duration_seconds_count[5m])) by (route)]] طلّع [[1.69]] طلب في الثانية لـ [[/users/:id]].

---

## ٧. Grafana (من الـ docs)

في الـ compose بتاع الحل Grafana على بورت 3001. بتضيف data source نوعه Prometheus بالعنوان [[http://prometheus:9090]] (اسم الـ service، مش localhost)، وتعمل panel بنفس الـ query اللي فوق.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[collectDefaultMetrics]] | رام و event loop و GC ببلاش |
| Histogram + [[buckets]] | يعدّ الطلبات في خانات مدة، مش كل قيمة |
| [[startTimer]] و [[end]] | يقيس كل طلب ويحطه في الخانة الصح بالـ labels |
| [[route]] = القالب | عدد series محدود |
| [[/metrics]] | Prometheus بيسحب منه كل [[scrape_interval]] |
| [[histogram_quantile(0.95, ...)]] | p95، تقدير جوه الـ bucket |

RED: [[rate(_count)]] للـ Rate، ونسبة [[status=~"5.."]] للـ Errors، و [[histogram_quantile]] للـ Duration.`,
          lines: [
            "مكتبة Prometheus لـ Node.",
            "أرقام Node الأساسية: الرام و event loop و GC.",
            "Histogram لمدة الطلبات.",
            "اسم الـ metric (بالثواني، ده العرف).",
            "وصف.",
            "الأبعاد اللي هتقسّم بيها.",
            "حدود الـ buckets بالثواني.",
            "قفلة.",
            "middleware على كل طلب.",
            "ابدأ العدّاد بالـ method.",
            "لما الرد يخلص: سجّل المدة بقالب الـ route (مش المسار الخام) والـ status.",
            "كمّل للـ route.",
            "قفلة.",
            "endpoint بيطلّع كل الأرقام بصيغة Prometheus."
          ],
          sol: R`الملفين تحت. بعد [[docker compose up -d]]: [[http://localhost:9090/targets]] المفروض يوري الـ job [[api]] بحالة [[UP]]. و [[curl localhost:3000/metrics]] يطلّع سطور زي:

[[http_request_duration_seconds_bucket{le="0.3",method="GET",route="/users/:id",status="200"} 3]]

جرّبت ده فعلًا: route بتاخد ١٢٠ مللي، والـ query بتاعة الـ p95 رجّعت [[0.29]] للـ route ده. مش غلط: الـ histogram عارف بس إن الطلبات بين 0.1 و 0.3 (الـ buckets)، فـ [[histogram_quantile]] بيقدّر بالـ interpolation جوه الـ bucket. عشان رقم أدق، حط buckets قريبة من الأرقام اللي تهمك. و route اسمها [[unmatched]] ممكن تطلع [[NaN]] لو مفيهاش ترافيك في آخر ٥ دقايق.

أخطاء شائعة: الـ target [[DOWN]] بـ [[connection refused]] لأنك كتبت [[localhost:3000]] جوه Prometheus (ده الـ container نفسه)، الصح اسم الـ service في Compose [[api:3000]]. والـ panel فاضي في Grafana لأن الـ data source URL مكتوب [[http://localhost:9090]] بدل [[http://prometheus:9090]]. ولو شلت [[by (le, route)]] أو نسيت [[le]] الـ query بترجع فاضي أو خطأ.`,
          solCode: R`# prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
# compose.yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
  prometheus:
    image: prom/prometheus
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml:ro"]
    ports: ["9090:9090"]
  grafana:
    image: grafana/grafana
    ports: ["3001:3000"]
    depends_on: [prometheus]`
        },
        {
          cmd: "Sentry",
          title: "اعرف الأخطاء اللي حصلت عند المستخدم بالـ stack trace",
          desc: R`Sentry بيمسك أي exception في الـ backend أو المتصفح ويبعته بالـ stack trace واليوزر والـ request والنسخة، ويجمّع الأخطاء المتشابهة في issue واحدة وينبّهك لما حاجة جديدة تظهر.

في Node: ملف [[instrument.mjs]] فيه [[Sentry.init]] ويتحمّل قبل أي حاجة بـ [[node --import]]، و [[setupExpressErrorHandler]] بعد كل الـ routes.`,
          example: R`// instrument.mjs
import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { userInfo: false, cookies: false },
});
// app.mjs: بعد كل الـ routes وقبل أي error handler تاني
Sentry.setupExpressErrorHandler(app);
// التشغيل: node --import ./instrument.mjs app.mjs`,
          try: R`اعمل حساب Sentry مجاني ومشروع Node، وحط الـ DSN في متغير بيئة. اعمل route بترمي [[throw new Error("test sentry")]] وافتحه، وشوف الـ issue: الـ stack trace والـ request والـ environment. وبعدها امسح الـ route ده.`,
          flag: "script",
          deep: {
            why: "اللوجات بتقولك إن فيه خطأ لو دوّرت. Sentry بيجيلك هو: «خطأ جديد ظهر في النسخة اللي نزلت من ساعة، حصل ٣٤٠ مرة لـ ٥٠ يوزر، في السطر ده». والأهم أخطاء المتصفح: من غيره مش هتعرف إن زرار الدفع بيقع على Safari.",
            how: R`[[--import ./instrument.mjs]] بيحمّل Sentry قبل تطبيقك، فيقدر يلف (instrument) الـ http و Express و pg و Prisma قبل ما يتحمّلوا. لو عملت init في نص الكود، جزء من الـ tracing مش هيشتغل.

[[setupExpressErrorHandler(app)]] بيضيف error middleware يبعت أي خطأ وصل لـ [[next(err)]] أو اترمى في route. ومكانه بعد الـ routes وقبل الـ error handler بتاعك (اللي بيرجّع JSON لليوزر).

[[environment]] و [[release]] بيخلّوك تفلتر: أخطاء الإنتاج بس، ومن أنهي نسخة بدأت. و [[release]] بالـ commit SHA بيربط الخطأ بالـ deploy اللي جابه.

[[tracesSampleRate: 0.1]]: ١٠٪ من الطلبات بتتسجل كـ traces للأداء. و [[1.0]] في الإنتاج بيخلّص الـ quota بسرعة.

[[dataCollection: { userInfo: false, cookies: false }]]: ميبعتش IPs والكوكيز وبيانات اليوزر تلقائي. ده في SDK نسخة 11 (الحالية). في نسخة 10 وقبلها كان [[sendDefaultPii: false]] وكان هو الافتراضي، إنما في 11 اتشال وبيتجاهل في صمت، والافتراضي بقى إنه يبعت الـ IP والكوكيز، فلازم تقفلهم بنفسك. بيانات العملاء لما تطلع لخدمة برا دي مسؤولية قانونية.

وفي المتصفح (React أو Next.js) فيه SDK لكل framework، ولازم ترفع source maps عشان الـ stack trace يبقى على الكود الأصلي مش الـ minified.`,
            when: "أي تطبيق في الإنتاج، backend و frontend. والخطة المجانية كفاية لمشروع صغير.",
            mistakes: R`في مشروع حقيقي كان [[Sentry.init]] مكتوب في أول [[index.ts]] وتحته تعليق «لازم يتنفذ قبل أي حاجة»، وبعده [[import express]]. بس في ESM كل الـ imports بتتنفذ الأول قبل أي كود في الملف، فالـ init كان بيحصل بعد تحميل Express، والحل ملف instrument منفصل مع [[--import]]. وفي نفس المشروع route للتجربة [[/debug-sentry]] اتساب في الإنتاج. وغلطات تانية: الـ DSN في الكود بدل متغير بيئة، وأخطاء متكررة محدش بيحلها ولا بيعملها ignore لحد ما محدش يبص على Sentry خالص.`
          },
          teach: R`## الفكرة: ملف بيشغّل Sentry قبل التطبيق، وسطر بيمسك أخطاء Express

المثال جزئين: [[instrument.mjs]] بيجهّز Sentry (يبعت فين، وأنهي بيئة، وأنهي نسخة، وإيه اللي ميتبعتش)، وسطر [[setupExpressErrorHandler(app)]] في التطبيق بيبعت أي خطأ يوصل لـ Express.

اتجرّب بـ [[@sentry/node]] 11.5.0 و Express 5 على Node 24 (ويندوز). ومن غير حساب Sentry: عملنا سيرفر صغير على بورت 9999 بيستقبل اللي الـ SDK بيبعته ويطبعه، وحطينا عنوانه في الـ DSN. فاللي تحت هو بالظبط اللي كان هيوصل لـ Sentry. شاشة الـ issue نفسها في Sentry من الـ docs.

---

## ١. [[import * as Sentry from "@sentry/node"]]

[[* as Sentry]] يعني «هات كل اللي المكتبة بتصدّره في object واحد اسمه [[Sentry]]»، فتكتب [[Sentry.init]] و [[Sentry.flush]] وهكذا.

---

## ٢. [[Sentry.init({...})]] خانة خانة

~~~js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { userInfo: false, cookies: false },
});
~~~

### [[dsn]]

DSN = Data Source Name: العنوان اللي الأخطاء رايحة له، وفيه مفتاح المشروع. شكله [[https://KEY@oXXXX.ingest.sentry.io/PROJECT_ID]]. في التجربة كان [[http://abc123@localhost:9999/42]]، والـ SDK بعت على:

~~~text الناتج (السيرفر الوهمي)
POST /api/42/envelope/?sentry_version=7&sentry_key=abc123&sentry_client=sentry.javascript.node%2F11.5.0
~~~

[[42]] رقم المشروع، و [[abc123]] المفتاح، و envelope هو الشكل اللي Sentry بيبعت بيه الأحداث. والـ DSN جاي من [[process.env]] (متغير بيئة) مش مكتوب في الكود. مش سر خطير (أي frontend بيكشفه)، بس كده تغيّره من غير deploy وتسيبه فاضي في التطوير.

### [[environment]] و [[release]]

~~~bash
SENTRY_DSN=http://abc123@localhost:9999/42 NODE_ENV=staging GIT_SHA=$(git rev-parse --short HEAD) node --import ./instrument.mjs app.mjs
~~~

- [[NAME=value command]] في bash بيحط متغير بيئة للأمر ده بس.
- [[$(git rev-parse --short HEAD)]] أول ٧ حروف من رقم الـ commit الحالي.

وفي الحدث اللي وصل:

~~~text الناتج
"environment": "staging",
"release": "f20f356",
~~~

فتقدر تفلتر في Sentry: «أخطاء الإنتاج بس»، و «الخطأ ده بدأ من أنهي commit».

### [[tracesSampleRate: 0.1]]

١٠٪ من الطلبات بتتسجل كـ trace للأداء (الأخطاء نفسها بتتبعت كلها). وده ظاهر في الـ header اللي الـ SDK حطه: [[sentry-sample_rate=0.1]] و [[sentry-sampled=false]] (الطلب ده مطلعش من الـ ١٠٪).

### [[dataCollection: { userInfo: false, cookies: false }]]

ده الجزء اللي اتغير في نسخة 11. جرّبنا نفس الطلب (ومعاه cookie اسمها [[sid]]) مرتين:

| | من غير [[dataCollection]] (الافتراضي) | بالإعداد اللي في المثال |
|---|---|---|
| الـ cookie | [[cookies: { sid: "[Filtered]" }]] والهيدر موجود | مش موجودة خالص |
| اليوزر | [[user: { ip_address: "::1" }]] | مفيش [[user]] |

يعني الافتراضي في 11 بيبعت الـ IP والكوكيز (والقيم اللي اسمها حساس بيخفيها)، وانت لازم تقفلهم بنفسك. [[::1]] هو localhost في IPv6. في الإنتاج ده IP العميل الحقيقي، وده بيانات شخصية.

---

## ٣. [[node --import ./instrument.mjs app.mjs]]

[[--import]] بيحمّل الملف ده الأول، قبل [[app.mjs]] وقبل أي [[import]] جواه. ليه مهم؟ Sentry بيلف (instrument) [[http]] و Express وهما بيتحمّلوا. لو Express اتحمّل الأول، فات الأوان.

جرّبنا نشغّل [[node app.mjs]] من غير [[--import]]: اليوزر أخد 500 عادي، والسيرفر الوهمي **ماستقبلش ولا طلب**. ومن غير خطأ ولا تحذير. ونفس الحكاية لما [[SENTRY_DSN]] مش موجود: الـ SDK بيقفل نفسه في صمت. عشان كده أول حاجة تتأكد منها لو مفيش حاجة وصلت: المتغير والـ [[--import]].

---

## ٤. [[Sentry.setupExpressErrorHandler(app)]]

في الحل:

~~~js
app.get("/debug-sentry", () => {
  throw new Error("test sentry");
});
Sentry.setupExpressErrorHandler(app);
app.use((err, req, res, next) => res.status(500).json({ error: "internal" }));
~~~

- الـ route بيرمي خطأ. Express 5 بيمسكه ويودّيه لأول error middleware.
- [[setupExpressErrorHandler]] هو أول error middleware: بيبعت الخطأ لـ Sentry، ويعدّيه للي بعده.
- الـ middleware التاني (اللي فيه ٤ parameters: [[err, req, res, next]]) هو اللي بيرد على اليوزر.

عشان كده الترتيب: الـ routes، وبعدين Sentry، وبعدين الـ handler بتاعك. والناتج:

~~~text اللي اليوزر شافه
user got: 500 {"error":"internal"}
~~~

~~~text اللي وصل لـ Sentry (مختصر)
"exception": "Error: test sentry",
"frame": { "module": "sapp", "lineno": 5, "colno": 9, "in_app": true,
           "context_line": "  throw new Error(\"test sentry\");" },
"mechanism": { "type": "auto.http.express", "handled": false },
"request": { "method": "GET", "url": "http://localhost:3222/debug-sentry", "headers": {...} }
~~~

| الخانة | معناها |
|---|---|
| [[lineno: 5]] و [[context_line]] | السطر نفسه، والـ SDK بعت كمان السطور اللي قبله وبعده |
| [[in_app: true]] | السطر ده في كودك مش في مكتبة |
| [[handled: false]] | محدش عمل catch، الخطأ وقع لوحده |
| [[mechanism.type]] | مين مسكه: الـ Express integration |
| [[request]] | الـ URL والـ method والـ headers |

وفي Sentry نفسه (من الـ docs) الطلبين اللي بعتناهم بيتجمعوا في issue واحدة عنوانها [[Error: test sentry]] وعدد الـ events ٢، لأن الـ stack trace واحد.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| ملف [[instrument.mjs]] منفصل + [[--import]] | Sentry يتحمّل قبل Express |
| [[dsn]] من متغير بيئة | من غيره الـ SDK بيسكت |
| [[environment]] و [[release]] | تفلتر بالبيئة والـ commit |
| [[tracesSampleRate: 0.1]] | أداء لـ ١٠٪ بس |
| [[dataCollection]] | في نسخة 11: لازم تقفل الـ IP والكوكيز بإيدك |
| [[setupExpressErrorHandler]] | بعد الـ routes وقبل الـ handler بتاعك |`,
          lines: [
            "هات الـ SDK.",
            "ابدأ Sentry قبل أي حاجة في التطبيق.",
            "مفتاح المشروع من متغير بيئة.",
            "البيئة: production أو staging.",
            "النسخة: الـ commit SHA.",
            "سجّل ١٠٪ من الطلبات للأداء.",
            "متبعتش بيانات شخصية تلقائي.",
            "قفلة.",
            "في app.mjs: ابعت أي خطأ في Express لـ Sentry."
          ],
          sol: R`بعد ما تفتح الـ route، خلال ثواني هيظهر issue في Sentry عنوانه [[Error: test sentry]]، وجواه: الـ stack trace لحد السطر اللي فيه [[throw]] في ملفك، وقسم Request فيه الـ URL والـ method والـ headers (من غير IP والكوكيز لأن [[userInfo: false]] و [[cookies: false]])، و tags فيها [[environment]] و [[release]] (لو [[GIT_SHA]] متسجل). واليوزر نفسه هيشوف 500 عادي، لأن Sentry بيسجّل الخطأ وبيسيب الـ error handler التاني يرد.

لو مفيش حاجة ظهرت: أول سبب إن [[SENTRY_DSN]] مش متعرّف في البيئة اللي شغّلت منها، و [[Sentry.init]] بـ dsn فاضي مبيشتكيش، بيقفل نفسه في صمت. تاني سبب: شغّلت [[node app.mjs]] من غير [[--import ./instrument.mjs]]، فالـ instrumentation متحمّلش قبل express. تالت: الـ route عامل [[try/catch]] وبيرجّع 500 بنفسه، فالخطأ موصلش للـ handler أصلًا (في الحالة دي استخدم [[Sentry.captureException(err)]]). ورابع: [[setupExpressErrorHandler]] متحط قبل الـ routes.

جرّب كمان تفتح الـ route مرتين: هيبقى issue واحد عدده 2 events، مش اتنين. وبعدها امسح الـ route واعمل Resolve للـ issue.`,
          solCode: R`app.get("/debug-sentry", () => {
  throw new Error("test sentry");
});
// SENTRY_DSN=https://...ingest.sentry.io/... NODE_ENV=staging GIT_SHA=$(git rev-parse --short HEAD) node --import ./instrument.mjs app.mjs`
        },
        {
          cmd: "SLI / SLO / error budget",
          title: "الاعتمادية بالأرقام: قد إيه مسموح نقع",
          desc: R`SLI رقم بتقيسه من ناحية اليوزر (نسبة الطلبات اللي نجحت أو اللي خلصت في أقل من ٣٠٠ مللي)، و SLO هدف ليه زي «٩٩.٩٪ في ٣٠ يوم»، و error budget هو الفرق: ٠.١٪ مسموح يفشل، يعني حوالي ٤٣ دقيقة وقوع كامل في الشهر.

لو الميزانية لسه موجودة، اعمل deploy وجرّب براحتك. لو خلصت، وقّف الـ features وركّز على الاعتمادية لحد ما ترجع.`,
          example: R`const slo = 0.999;
const minutesIn30Days = 30 * 24 * 60;
console.log((minutesIn30Days * (1 - slo)).toFixed(1)); // 43.2

const total = 1_200_000;
const failed = 900;
const sli = 1 - failed / total;
const budgetUsed = (failed / total) / (1 - slo);
console.log((sli * 100).toFixed(3) + "%", Math.round(budgetUsed * 100) + "% of budget"); // 99.925% 75% of budget`,
          try: "احسب الميزانية لـ ٩٩٪ و ٩٩.٩٩٪. بعدين خد لوجات الـ ALB أو Nginx لأسبوع واحسب الـ SLI الحقيقي بتاعك: كام طلب 5xx من الإجمالي.",
          flag: "script",
          deep: {
            why: "«الموقع لازم يبقى شغال ١٠٠٪» هدف مستحيل وبيقتل السرعة: كل deploy بقى خطر. الـ SLO بيحوّل النقاش من إحساس لرقم: عندنا ٤٣ دقيقة في الشهر، صرفنا منهم ٣٠، يبقى نهدّى.",
            how: R`اختار SLIs من ناحية اليوزر مش السيرفر: CPU ٩٠٪ مش مشكلة لو الطلبات سريعة. الشائع: availability (نسبة الردود اللي مش 5xx) و latency (نسبة الطلبات الأسرع من حد معين).

كل ٩ زيادة أغلى بكتير: ٩٩٪ = ٧.٢ ساعة في الشهر، و ٩٩.٩٪ = ٤٣ دقيقة، و ٩٩.٩٩٪ = ٤ دقايق ونص. الأخيرة معناها إن أي مشكلة لازم تتحل قبل ما حد يصحى أصلًا، يعني automation كامل و Multi-AZ وأكتر.

والـ SLO بتاعك لازم يبقى أقل من اعتمادية اللي انت معتمد عليه: لو القاعدة Single-AZ، متوعدش بـ ٩٩.٩٩٪.

الـ SLA حاجة تانية: عقد مع العميل فيه تعويض لو النسبة وقعت. ودايمًا أقل من الـ SLO، عشان الـ SLO ينبّهك قبل ما تدفع.

والإنذار الصح على «burn rate»: بنصرف الميزانية بسرعة قد إيه. لو بالمعدل ده هتخلص في يومين، صحّي حد. لو في ٣ أسابيع، تذكرة للصبح.`,
            when: "لما يبقى عندك مستخدمين بيدفعوا وعايز قرار واضح: نزوّد features ولا نصلّح استقرار.",
            mistakes: "SLO بـ ١٠٠٪. و SLI على CPU أو uptime السيرفر بدل تجربة اليوزر. وتحط SLO ومحدش بيبص عليه أو بيغيّر قراره بسببه. وتخلط SLO بـ SLA في الانترفيو."
          },
          teach: R`## الفكرة: ٣ أرقام، وكلهم حساب بسيط

الكود ده بيجاوب على سؤالين: «مسموح لنا نقع قد إيه في الشهر؟» و «صرفنا كام من المسموح ده؟». كل الأرقام اتحسبت فعلًا بـ Node 24، والـ awk اللي في الحل اتشغّل في [[ubuntu:24.04]] على لوج Nginx تجربة.

| الاسم | يعني إيه | مثال |
|---|---|---|
| SLI (Service Level Indicator) | رقم بتقيسه | ٩٩.٩٢٥٪ من الطلبات نجحت |
| SLO (Service Level Objective) | الهدف | ٩٩.٩٪ في ٣٠ يوم |
| error budget | المسموح يفشل = ١ − SLO | ٠.١٪ |

---

## ١. الميزانية بالدقايق

~~~js
const slo = 0.999;
const minutesIn30Days = 30 * 24 * 60;
console.log((minutesIn30Days * (1 - slo)).toFixed(1)); // 43.2
~~~

- [[0.999]] هي ٩٩.٩٪ مكتوبة كسر (٩٩.٩ ÷ ١٠٠).
- [[30 * 24 * 60]] أيام × ساعات × دقايق = ٤٣٢٠٠ دقيقة في الشهر.
- [[1 - slo]] الجزء المسموح يفشل: ٠.٠٠١.
- ٤٣٢٠٠ × ٠.٠٠١ = ٤٣.٢ دقيقة.

~~~text الناتج
43.2
~~~

### ليه [[.toFixed(1)]]؟

الكمبيوتر بيخزّن الكسور بالـ binary، ومش كل كسر عشري بيتكتب بالظبط. جرّب [[1 - 0.999]] لوحده:

~~~text الناتج
0.0010000000000000009
~~~

فرق صغير جدًا، بس لو طبعته هيبوّظ الشكل. [[toFixed(1)]] بيقرّب لرقم عشري واحد وبيرجّع **نص** ([["43.2"]]).

> «٤٣ دقيقة» معناها وقوع كامل لكل الطلبات. لو ١٠٪ بس من الطلبات بتفشل، تقدر تستحمل ٤٣٢ دقيقة كده. الميزانية في الحقيقة نسبة طلبات، مش وقت.

---

## ٢. الـ SLI: اللي حصل فعلًا

~~~js
const total = 1_200_000;
const failed = 900;
const sli = 1 - failed / total;
~~~

- [[1_200_000]] الـ [[_]] جوه الرقم للقراية بس (زي الفاصلة في ١,٢٠٠,٠٠٠)، و JavaScript بيتجاهلها.
- [[failed / total]] نسبة الفشل: ٩٠٠ ÷ ١٢٠٠٠٠٠ = ٠.٠٠٠٧٥.
- [[1 - ...]] نسبة النجاح: ٠.٩٩٩٢٥.

---

## ٣. صرفنا كام من الميزانية

~~~js
const budgetUsed = (failed / total) / (1 - slo);
~~~

نسبة الفشل الفعلية ÷ نسبة الفشل المسموحة = ٠.٠٠٠٧٥ ÷ ٠.٠٠١ = ٠.٧٥، يعني ٧٥٪. وفي Node الرقم طلع [[0.7499999999999993]] (نفس حكاية الكسور)، فـ [[Math.round]] بيصلّحه.

~~~js
console.log((sli * 100).toFixed(3) + "%", Math.round(budgetUsed * 100) + "% of budget");
~~~

- [[sli * 100]] من كسر لنسبة مئوية، و [[toFixed(3)]] ٣ أرقام بعد العلامة.
- [[+ "%"]] لزق النص.
- [[Math.round(budgetUsed * 100)]] ٧٤.٩٩٩... → ٧٥.

~~~text الناتج
99.925% 75% of budget
~~~

اقرا الرقم ده كقرار: فاضل ٢٥٪ من الميزانية، يعني حوالي ١١ دقيقة وقوع كامل لآخر الشهر. deploy خطير؟ استنى للشهر الجاي.

---

## ٤. الحل: ٣ أهداف جنب بعض

~~~js
for (const slo of [0.99, 0.999, 0.9999]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
~~~

[[for (const x of [...])]] لف على كل قيمة في القايمة.

~~~text الناتج
0.99 432.0
0.999 43.2
0.9999 4.3
~~~

| الهدف | المسموح في ٣٠ يوم |
|---|---|
| ٩٩٪ | ٤٣٢ دقيقة = ٧.٢ ساعة |
| ٩٩.٩٪ | ٤٣.٢ دقيقة |
| ٩٩.٩٩٪ | ٤.٣ دقيقة |

كل ٩ زيادة = الميزانية ÷ ١٠. مع ٩٩.٩٩٪، deploy بايظ واحد بياخد ٥ دقايق يخلّص الشهر كله.

---

## ٥. الحل: SLI حقيقي من لوج Nginx

~~~bash
cat /var/log/nginx/access.log /var/log/nginx/access.log.1 | awk '{t++} $9>=500{f++} END{printf "total=%d 5xx=%d SLI=%.3f%%\n", t, f, 100*(1-f/t)}'
~~~

### [[cat a b]]

يلزق الملفين ورا بعض: [[access.log]] (النهارده) و [[access.log.1]] (اللي قبله، Nginx بيلفّ اللوج كل يوم أو أسبوع).

### الحقل التاسع

[[awk]] بيقسم كل سطر على المسافات ويسمّي الأجزاء [[$1]] و [[$2]]... سطر Nginx الافتراضي:

~~~text سطر من اللوج
203.0.113.9 - - [08/Oct/2026:10:00:03 +0000] "POST /api/orders HTTP/1.1" 502 157 "-" "Mozilla/5.0"
$1          $2 $3 $4                    $5     $6     $7         $8        $9  $10
~~~

[[$9]] هو الـ status. اتأكدنا بـ [[awk '{print $9}']] على لوج التجربة (٤ سطور):

~~~text الناتج
200 200 502 404
~~~

### الـ awk نفسه

| الحتة | بتعمل إيه |
|---|---|
| [[{t++}]] | مع كل سطر: زوّد [[t]] (total) |
| [[$9>=500{f++}]] | لو الـ status ٥٠٠ أو أكتر: زوّد [[f]] (failed) |
| [[END{...}]] | بعد آخر سطر |
| [[printf "...%d...%.3f%%\n"]] | [[%d]] رقم صحيح، و [[%.3f]] كسر بـ ٣ أرقام، و [[%%]] علامة % نفسها، و [[\n]] سطر جديد |
| [[100*(1-f/t)]] | الـ SLI كنسبة |

~~~text الناتج
total=4 5xx=1 SLI=75.000%
~~~

الـ 404 اتحسب نجاح، وده مقصود: [[$9>=500]] بيعدّ أخطاء السيرفر بس، والـ 404 غالبًا غلطة العميل.

---

## الخلاصة

| الحساب | المعادلة |
|---|---|
| الميزانية بالدقايق | دقايق الفترة × (١ − SLO) |
| الـ SLI | ١ − (الفاشل ÷ الإجمالي) |
| المصروف من الميزانية | (الفاشل ÷ الإجمالي) ÷ (١ − SLO) |

والفشل = 5xx بس، والكسور في JavaScript تتقرّب بـ [[toFixed]] أو [[Math.round]] قبل ما تتطبع.`,
          lines: [
            "الهدف: ٩٩.٩٪.",
            "دقايق الشهر.",
            "الميزانية: ٤٣.٢ دقيقة وقوع كامل في الشهر.",
            "طلبات الشهر.",
            "اللي فشل منها.",
            "الـ SLI: نسبة النجاح الفعلية.",
            "صرفنا كام من الميزانية.",
            "٩٩.٩٢٥٪ نجاح، وصرفنا ٧٥٪ من الميزانية."
          ],
          sol: R`الحسبة لـ ٣٠ يوم (٤٣٢٠٠ دقيقة): ٩٩٪ = [[432.0]] دقيقة (٧.٢ ساعة)، و ٩٩.٩٪ = [[43.2]]، و ٩٩.٩٩٪ = [[4.3]] دقيقة بس. كل ٩ زيادة بتقسم الميزانية على ١٠، وده ليه ٩٩.٩٩٪ معناها إن deploy بايظ واحد في الشهر ممكن يخلّص الميزانية.

للوجات: الـ awk تحت بيعد الطلبات والـ 5xx من لوج Nginx بالشكل الافتراضي (الحقل التاسع هو الـ status). على لوج تجربة فيه ٤ طلبات منهم 502 واحد طبع [[total=4 5xx=1 SLI=75.000%]]. على لوج حقيقي لأسبوع المفروض تلاقي رقم زي [[99.9xx%]]. وقارنه بالـ SLO: لو ٩٩.٩٥٪ والـ SLO ٩٩.٩٪، يبقى صرفت نص الميزانية.

الأخطاء الشائعة: تحسب الـ 4xx كفشل (الـ 404 والـ 401 غالبًا غلطة العميل مش السيستم)، أو تعد طلبات الـ health check من الـ load balancer فتعلّي الـ SLI على الفاضي. ولو اللوج بصيغة مختلفة (JSON أو ALB)، رقم الحقل هيختلف: اطبع سطر واحد الأول وعدّ.`,
          solCode: R`for (const slo of [0.99, 0.999, 0.9999]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
// 0.99 432.0 / 0.999 43.2 / 0.9999 4.3
# من لوجات Nginx لأسبوع:
cat /var/log/nginx/access.log /var/log/nginx/access.log.1 | awk '{t++} $9>=500{f++} END{printf "total=%d 5xx=%d SLI=%.3f%%\n", t, f, 100*(1-f/t)}'`
        },
        {
          cmd: "incident response",
          title: "الموقع وقع: تعمل إيه بالترتيب",
          desc: R`الترتيب: اتأكد إن فيه مشكلة وحجمها، وقول للناس، ووقّف النزيف (rollback أو تعطيل feature) قبل ما تدوّر على السبب، والسبب بتدوّر عليه بعد ما الموقع يرجع.

ومحدش هيعرف إن الموقع وقع من غير uptime check من برا: حاجة (Uptime Kuma على سيرفر تاني، أو Better Stack، أو Route 53 health check) بتطلب [[/health]] كل دقيقة وتبعتلك لو فشل.`,
          example: R`curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" https://myapp.example.com/health
aws ecs describe-services --cluster myapp --services api --query "services[0].deployments[].[status,taskDefinition,rolloutState]" --output table
aws logs tail /ecs/myapp-api --since 15m --filter-pattern ERROR
aws ecs update-service --cluster myapp --service api --task-definition myapp-api:41
aws ecs wait services-stable --cluster myapp --services api`,
          try: "اكتب runbook من ٥ سطور لمشروعك: تعرف منين إنه واقع، وتبص فين الأول، وإزاي ترجّع نسخة. وجرّبه فعلًا على staging: deploy بنسخة بايظة وبعدين رجّعها وانت بتحسب الوقت.",
          deep: {
            why: "وقت الحادثة الكل متوتر، وأسوأ حاجة ٣ ناس يعدّلوا على الإنتاج في نفس الوقت، أو حد يقعد ساعة يدوّر على السبب والموقع واقع والعملاء مش عارفين حاجة. خطوات ثابتة ومكتوبة بتقلل الوقت والغلط.",
            how: R`١. اكتشف: إنذار من الـ uptime check أو Sentry أو CloudWatch، مش من عميل. والـ health check يبقى من مكان تاني غير السيرفر نفسه، وإلا لو السيرفر وقع المراقب وقع معاه.

٢. قيّم: كل الناس ولا جزء؟ كل الـ endpoints ولا واحد؟ من إمتى؟ حصل deploy أو تغيير إعدادات قريب؟ أغلب الحوادث بتيجي بعد تغيير.

٣. نظّم: واحد incident commander بيقرر وبيكلّم الناس، والباقي بيشتغلوا. قناة واحدة للحادثة، وحد بيكتب timeline بالوقت. ورسالة للعملاء (status page) حتى لو «بنحقق».

٤. خفّف: rollback لآخر نسخة سليمة، أو feature flag، أو زوّد السيرفرات، أو اقفل الحاجة اللي بتضرب. في ECS: الـ task definition بتاعة النسخة اللي قبلها ([[:41]])، و [[wait services-stable]] بيستنى لحد ما النسخ الجديدة تبقى healthy.

٥. اتأكد إن الأرقام رجعت طبيعية، وبعدين اقفل الحادثة واكتب postmortem.

وعلى VPS نفس الخطوات بأوامر تانية: تاب التشخيص فيه السلّم الكامل و 502 و 504 و «الـ deploy كسر الموقع».`,
            when: "في كل حادثة، حتى الصغيرة. والتمرين عليها قبلها (game day) بيفرق جدًا.",
            mistakes: "تدوّر على الـ root cause والموقع واقع بدل ما ترجّع النسخة الأول. وكل واحد في الفريق يجرّب حل على الإنتاج في نفس الوقت. ومحدش يقول للعملاء. ومراقب الـ uptime على نفس السيرفر. ومفيش طريقة rollback مجرّبة أصلًا."
          },
          teach: R`## الفكرة: ٥ أوامر = خطوات الحادثة بالترتيب

الموقع وقع. الأوامر دي هي اللي بتكتبها بالترتيب ده: هل هو واقع فعلًا؟ فيه deploy حصل؟ اللوج بيقول إيه؟ ارجع للنسخة اللي قبلها. استنى لحد ما تستقر. لاحظ إن مفيش ولا أمر بيدوّر على **سبب** المشكلة: ده بعدين.

اللي اتجرّب: [[curl]] على Nginx محلي في Docker (من Git Bash ومن Windows PowerShell 5.1)، و [[logs tail]] على LocalStack 4.9. أوامر ECS متجرّبتش: ECS مش موجود في LocalStack المجاني (رجّع [[InternalFailure]])، فشكل نواتجها من الـ docs ومن [[aws ecs ... help]] في AWS CLI 2.37.

---

## ١. الموقع بيرد؟ [[curl -w]]

~~~bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" https://myapp.example.com/health
~~~

| الحتة | معناها |
|---|---|
| [[-s]] | silent: من غير شريط التحميل |
| [[-o /dev/null]] | ارمي جسم الرد (مش محتاجه، عايز الكود بس). [[/dev/null]] ملف «بلّاعة» في لينكس والماك |
| [[-w "..."]] | write-out: اطبع ده بعد ما تخلص |
| [[%{http_code}]] | كود الرد: 200 أو 502 أو غيره |
| [[%{time_total}]] | الطلب كله أخد كام ثانية |
| [[\n]] | سطر جديد في الآخر |

على Nginx محلي:

~~~text الناتج
200 0.003271s     ← /         شغال، ٣ مللي
404 0.002792s     ← /health   السيرفر شغال بس المسار مش موجود
000 0.001088s     ← بعد ما وقّفنا الـ container
~~~

[[000]] معناها مفيش رد خالص (مفيش HTTP أصلًا)، و [[curl]] خرج بـ exit code [[7]] = مقدرش يتصل. ده غير 502: الـ 502 معناها فيه حد رد (الـ load balancer مثلًا) بس اللي وراه مردّش.

> على ويندوز: في Windows PowerShell 5.1 كلمة [[curl]] اسم تاني لـ [[Invoke-WebRequest]] ([[(Get-Command curl).CommandType]] بيقول [[Alias]])، فاكتب [[curl.exe]] و [[-o NUL]] بدل [[/dev/null]]. اتجرّب وطلّع [[200 0.004173s]].

---

## ٢. فيه deploy؟ [[describe-services]]

~~~bash
aws ecs describe-services --cluster myapp --services api --query "services[0].deployments[].[status,taskDefinition,rolloutState]" --output table
~~~

أغلب الحوادث بتيجي بعد تغيير، فده تاني سؤال بعد «هو واقع؟».

| الحتة | معناها |
|---|---|
| [[--cluster myapp --services api]] | الـ service اسمها [[api]] جوه cluster اسمه [[myapp]] |
| [[services[0]]] | أول (والوحيدة) service في الرد |
| [[.deployments[]]] | كل الـ deployments بتاعتها: الشغال والجديد لو فيه |
| [[.[status,taskDefinition,rolloutState]]] | ٣ خانات من كل واحد |
| [[--output table]] | جدول يتقري بالعين |

الشكل (من الـ docs) وفيه deploy بايظ شغال:

~~~text الشكل المتوقع
|  PRIMARY  |  arn:...:task-definition/myapp-api:42  |  IN_PROGRESS  |
|  ACTIVE   |  arn:...:task-definition/myapp-api:41  |  COMPLETED    |
~~~

- [[PRIMARY]] النسخة اللي ECS بيحاول يوصل لها (الجديدة، [[:42]]).
- [[ACTIVE]] القديمة اللي لسه فيها tasks شغالة ([[:41]]).
- [[rolloutState]] حالة الـ rollout: [[IN_PROGRESS]] أو [[COMPLETED]] أو [[FAILED]].

ولو فيه سطرين، يبقى deploy حصل والمشتبه الأول هو [[:42]]. والرقم بعد [[:]] هو الـ revision: كل مرة بتسجّل task definition جديدة الرقم بيزيد.

---

## ٣. اللوج: [[logs tail --filter-pattern]]

~~~bash
aws logs tail /ecs/myapp-api --since 15m --filter-pattern ERROR
~~~

آخر ربع ساعة، والسطور اللي فيها [[ERROR]] بس. على LocalStack طلّع:

~~~text الناتج
2026-10-08T11:36:32.000000+00:00 api/api/abc123 {"level":"error","method":"POST","path":"/orders","status":502,"ms":3012}
~~~

(من غير [[--format short]]، فبيظهر اسم الـ log stream: [[api/api/abc123]] = الـ prefix والـ container والـ task.)

> خلي بالك: LocalStack طلّع كل السطور ومطبّقش الفلتر أصلًا. في CloudWatch الحقيقي الكلمات في الـ filter pattern حساسة لحالة الحروف (حسب الـ docs)، فـ [[ERROR]] مش هيلاقي [[{"level":"error"}]]. مع لوجات JSON استخدم [[--filter-pattern '{ $.level = "error" }']].

---

## ٤. ارجع: [[update-service --task-definition myapp-api:41]]

~~~bash
aws ecs update-service --cluster myapp --service api --task-definition myapp-api:41
~~~

«خلي الـ service تشغّل الـ revision رقم 41» (آخر نسخة كانت سليمة). ECS بيعمل rolling deploy عكسي: tasks جديدة بالنسخة القديمة، ولما تبقى healthy الـ tasks البايظة تتشال. ومحتاجش build ولا push: الـ image القديمة لسه في ECR والـ task definition لسه موجودة.

وعشان تعرف آخر revisions، الحل فيه:

~~~bash
aws ecs list-task-definitions --family-prefix myapp-api --sort DESC --max-items 3
~~~

[[--sort DESC]] الأحدث الأول، و [[--max-items 3]] آخر ٣ بس.

---

## ٥. استنى: [[wait services-stable]]

~~~bash
aws ecs wait services-stable --cluster myapp --services api
~~~

[[wait]] مبيطبعش حاجة، بيفضل واقف لحد ما الحالة تتحقق. الـ help بتاعه في CLI 2.37 بيقول بالظبط بيستنى إيه:

~~~text aws ecs wait services-stable help
Wait until JMESPath query length(services[?!(length(deployments) == 1
&& runningCount == desiredCount)]) == 0 returns True when polling with
describe-services. It will poll every 15 seconds until a successful
state has been reached. This will exit with a return code of 255 after
40 failed checks.
~~~

بالعربي: «استنى لحد ما كل service يبقى ليها deployment واحد بس، وعدد الـ tasks الشغالة = العدد المطلوب». بيسأل كل ١٥ ثانية، ولو ٤٠ مرة (١٠ دقايق) ومستقرتش، يخرج بـ exit code [[255]]. يعني في سكربت تقدر تكتب [[wait ... && echo stable || echo "rollback stuck"]].

وبعدها ترجع لخطوة ١: [[curl]] لازم يرجّع 200 تاني.

---

## الخلاصة

| الخطوة | الأمر | السؤال |
|---|---|---|
| ١ | [[curl -w "%{http_code} %{time_total}s"]] | واقع فعلًا؟ وبطيء قد إيه؟ |
| ٢ | [[describe-services ... deployments]] | فيه deploy قريب؟ |
| ٣ | [[logs tail --since 15m --filter-pattern]] | الأخطاء بتقول إيه؟ |
| ٤ | [[update-service --task-definition :41]] | ارجع للنسخة السليمة |
| ٥ | [[wait services-stable]] | استنى لحد ما يستقر |

ارجع الأول، دوّر على السبب بعدين.`,
          lines: [
            "الموقع بيرد؟ الكود والوقت.",
            "فيه deploy شغال أو فشل؟ النسخة الحالية والجديدة وحالة الـ rollout.",
            "الأخطاء في آخر ربع ساعة.",
            "rollback: رجّع الـ service للـ task definition رقم 41 (آخر نسخة سليمة).",
            "استنى لحد ما النسخ ترجع healthy."
          ],
          sol: R`runbook نموذجي من ٥ سطور (عدّله لمشروعك):

١. الكشف: uptime check من برا على [[/health]] كل دقيقة بينبّه على Telegram أو الإيميل، أو إنذار 5xx من CloudWatch. أول خطوة أأكّد بـ [[curl -w "%{http_code}"]].
٢. أبص فين الأول: هل فيه deploy في آخر ساعة؟ ([[describe-services]] أو تاريخ الـ releases). لو أيوه، ده المشتبه الأول.
٣. اللوج: [[aws logs tail ... --since 15m --filter-pattern ERROR]] أو [[docker compose logs --since 15m]].
٤. الرجوع: [[update-service]] بالـ task definition اللي قبلها (أو [[git revert]] و deploy)، ومتستناش لحد ما تفهم السبب.
٥. أبلّغ: رسالة قصيرة للفريق أو العملاء، وبعد ما يستقر أكتب postmortem.

على staging: المفروض تقيس ٣ أرقام: وقت الاكتشاف (من الـ deploy البايظ لحد الإنذار)، ووقت القرار، ووقت الرجوع ([[wait services-stable]] على ECS غالبًا دقايق). لو الرقم الكلي أكبر من ١٥ دقيقة، أكبر جزء فيه غالبًا الاكتشاف، مش الرجوع.

الغلطة الشائعة: الـ rollback يرجّع الكود بس، والـ migration الجديدة اللي نزلت معاه لسه موجودة، فالنسخة القديمة تقع برضه. عشان كده الـ migrations لازم تبقى backward compatible. وتانية: تقعد تصلّح في الإنتاج قدام الناس بدل ما ترجع الأول.`,
          solCode: R`aws ecs describe-services --cluster myapp --services api --query "services[0].deployments[].[status,taskDefinition,rolloutState]" --output table
aws ecs list-task-definitions --family-prefix myapp-api --sort DESC --max-items 3
aws ecs update-service --cluster myapp --service api --task-definition myapp-api:41
aws ecs wait services-stable --cluster myapp --services api`
        },
        {
          cmd: "postmortem",
          title: "بعد الحادثة: تكتب إيه عشان متتكررش",
          desc: R`الـ postmortem مستند قصير بعد كل حادثة مهمة فيه حصل إيه، وأثّر على مين وقد إيه، والـ timeline، والسبب الجذري، وليه متمسكش بدري، و action items بصاحب وتاريخ.

وهو «blameless»: السؤال «إيه في السيستم سمح للغلطة دي تعدّي؟» مش «مين غلط؟». لو الناس خافت هتخبّي الغلطات، ونفس الحادثة هترجع.`,
          example: R`# Postmortem: 502 على الـ API يوم 2026-09-12
Impact: 38 دقيقة، 12% من الطلبات فشلت، مفيش داتا ضاعت
Detection: إنذار الـ uptime بعد 4 دقايق (مش من عميل)
Timeline: 14:02 deploy v1.9 / 14:06 إنذار / 14:15 rollback / 14:40 رجع طبيعي
Root cause: migration عملت lock على جدول orders، والـ pool خلص
Why not caught: staging فيه 200 صف، والإنتاج 2 مليون
Action: migrations بـ CONCURRENTLY و lock_timeout (owner: Ali، قبل 09-20)
Action: اختبار الـ migrations على نسخة بحجم الإنتاج (owner: Mona، قبل 09-30)`,
          try: "اكتب postmortem لآخر مشكلة حصلت في مشروع من مشاريعك (حتى لو بسيطة، زي شهادة SSL خلصت). واسأل «ليه» ٥ مرات لحد ما توصل لحاجة في السيستم مش في شخص.",
          flag: "script",
          deep: {
            why: "من غير postmortem الحادثة بتتنسى في أسبوع ونفس السبب يرجع بعد شهرين. المستند بيحوّل الوجع لتغيير حقيقي: اختبار أو إنذار أو خطوة في الـ CI.",
            how: R`Impact بالأرقام: مدة، ونسبة، وعدد عملاء، وفلوس لو فيه. و Detection: عرفنا إزاي وبعد قد إيه؛ لو من عميل، ده في حد ذاته action item.

الـ Timeline بالدقيقة من المصادر (لوجات، ورسائل القناة)، مش من الذاكرة.

الـ Root cause بـ «5 whys»: ليه وقع؟ الـ pool خلص. ليه؟ الطلبات مستنية lock. ليه؟ migration قفلت الجدول. ليه عدّت؟ staging صغير. ليه؟ مفيش بيانات بحجم حقيقي. الإجابة الأخيرة هي اللي بتتصلّح.

الـ Action items قليلة ومحددة، كل واحد ليه صاحب وتاريخ وبيتتابع. «نبقى أحرص» مش action item. «الـ CI يرفض migration من غير lock_timeout» action item.

وبيتشارك مع الفريق كله. وشركات كبيرة بتنشر postmortems علني (Cloudflare و GitHub مثلًا)، والقراية فيها بتعلّمك أنماط كتير.`,
            when: "بعد أي حادثة أثّرت على اليوزرز أو كانت هتأثر. وفي خلال أيام، والتفاصيل لسه فاكرها.",
            mistakes: "postmortem بيدوّر على مين الغلطان. و action items كتير ومحدش مسؤول عنها فمبتتعملش. و root cause «خطأ بشري» ووقفت لحد هنا. وتكتبه بعد شهر من الذاكرة."
          },
          teach: R`## الفكرة: ٨ سطور، كل سطر بيجاوب على سؤال

المثال مش كود، ده مستند. وكل سطر فيه بيجاوب على سؤال واحد لازم أي حد يقرا الـ postmortem يلاقي إجابته في ثواني: حصل إيه؟ أثّر قد إيه؟ عرفنا إزاي؟ إمتى بالظبط؟ ليه؟ ليه الاختبارات معدّتهوش؟ هنعمل إيه، ومين، وإمتى؟

اللي اتجرّب هنا: الحساب بتاع الأرقام، والحل التقني اللي في الـ Actions ([[lock_timeout]] و [[CONCURRENTLY]]) على Postgres 16 في Docker ([[postgres:16-alpine]]).

---

## ١. العنوان

~~~text
# Postmortem: 502 على الـ API يوم 2026-09-12
~~~

العَرَض (502) + المكان (الـ API) + التاريخ. مش «مشكلة يوم الجمعة». بعد سنة حد هيدوّر بـ «502» ويلاقيه.

---

## ٢. [[Impact]]: الأثر بالأرقام

~~~text
Impact: 38 دقيقة، 12% من الطلبات فشلت، مفيش داتا ضاعت
~~~

٣ أرقام: **المدة**، و**النسبة** (مش «الموقع كان واقع»، ده كان ١٢٪ بس)، و**الداتا**. والمدة مش اختراع: من الـ timeline، من الـ deploy ([[14:02]]) لحد ما رجع طبيعي ([[14:40]]) = ٣٨ دقيقة.

ولو عندك SLO: ٣٨ دقيقة × ١٢٪ ≈ ٤.٦ دقيقة «وقوع كامل»، يعني حوالي ١١٪ من ميزانية ٩٩.٩٪ (٤٣.٢ دقيقة) في حادثة واحدة.

---

## ٣. [[Detection]]

~~~text
Detection: إنذار الـ uptime بعد 4 دقايق (مش من عميل)
~~~

من [[14:02]] لـ [[14:06]] = ٤ دقايق. و «مش من عميل» دي أهم كلمة: لو كانت «عميل بعت على واتساب بعد ساعة»، يبقى أول action item إنذار.

---

## ٤. [[Timeline]]

~~~text
Timeline: 14:02 deploy v1.9 / 14:06 إنذار / 14:15 rollback / 14:40 رجع طبيعي
~~~

| الوقت | الحدث | المدة من اللي قبله |
|---|---|---|
| 14:02 | deploy v1.9 | |
| 14:06 | إنذار | ٤ دقايق (وقت الاكتشاف) |
| 14:15 | rollback | ٩ دقايق (وقت القرار) |
| 14:40 | رجع طبيعي | ٢٥ دقيقة (وقت الرجوع) |

الجدول ده بيقولك فين الوقت راح: أطول حتة هي الرجوع (٢٥ دقيقة) مش الاكتشاف. ليه الرجوع طوّل؟ لأن الـ migration كانت لسه ماسكة الـ lock حتى بعد الـ rollback. الأرقام دي بتيجي من اللوجات ورسايل القناة، مش من الذاكرة.

---

## ٥. [[Root cause]]

~~~text
Root cause: migration عملت lock على جدول orders، والـ pool خلص
~~~

السلسلة: الـ migration طلبت lock على الجدول كله، فكل query على [[orders]] وقفت مستنياها، فاتصالات الـ pool كلها اتمسكت مستنية، فالطلبات الجديدة ملقتش اتصال، فـ 502.

---

## ٦. [[Why not caught]]

~~~text
Why not caught: staging فيه 200 صف، والإنتاج 2 مليون
~~~

ده السطر اللي بيفرّق postmortem كويس عن واحد عادي. السؤال مش «مين غلط؟»، السؤال «ليه السيستم سمح للغلطة دي تعدّي؟». على ٢٠٠ صف الـ migration بتخلص في مللي ثانية، فمحدش شاف الـ lock.

---

## ٧. الـ [[Action]] items

~~~text
Action: migrations بـ CONCURRENTLY و lock_timeout (owner: Ali، قبل 09-20)
Action: اختبار الـ migrations على نسخة بحجم الإنتاج (owner: Mona، قبل 09-30)
~~~

كل واحد فيه ٣ حاجات: **إيه** بالظبط، و**مين** ([[owner]])، و**إمتى**. من غير الاتنين الأخيرين، مش هيتعمل.

### الأول بيعمل إيه فعلًا؟ جرّبناه

جدول [[orders]] فيه ١٠٠٠ صف، وفي session تانية transaction ماسكة صف ([[SELECT ... FOR UPDATE]]) ٦ ثواني، زي طلب شغال في الإنتاج. وبعدين الـ migration:

~~~sql
SET lock_timeout = '2s';
ALTER TABLE orders ADD COLUMN note text;
~~~

~~~text الناتج
SET
ERROR:  canceling statement due to lock timeout
~~~

- [[ALTER TABLE]] محتاج lock كامل على الجدول، فلازم يستنى الـ transaction التانية تخلص. وهو مستني، أي query جديدة على الجدول بتقف وراه في الطابور، وده بالظبط اللي خلّص الـ pool.
- [[lock_timeout = '2s']]: لو مقدرتش تاخد الـ lock في ثانيتين، اقفل نفسك بخطأ. الـ migration فشلت، بس الموقع فضل شغال. وتعيد المحاولة في وقت أهدى.

~~~sql
CREATE INDEX CONCURRENTLY orders_status_idx ON orders(status);
~~~

~~~text الناتج
CREATE INDEX
~~~

[[CONCURRENTLY]] بيبني الـ index من غير ما يمنع الكتابة في الجدول (أبطأ، بس الموقع شغال). من غيرها، [[CREATE INDEX]] على ٢ مليون صف بيمنع أي [[INSERT]] أو [[UPDATE]] لحد ما يخلص.

والتاني (اختبار على حجم الإنتاج) بيقفل الباب على «النوع» ده كله، مش الحادثة دي بس.

---

## الخلاصة

| الخانة | السؤال |
|---|---|
| [[Impact]] | قد إيه؟ مدة ونسبة وداتا |
| [[Detection]] | عرفنا إزاي وبعد قد إيه؟ |
| [[Timeline]] | إمتى بالظبط، من المصادر؟ |
| [[Root cause]] | ليه حصل، تقنيًا؟ |
| [[Why not caught]] | ليه السيستم سمح بيه؟ |
| [[Action]] | هنعمل إيه، ومين، وإمتى؟ |

ومفيش ولا خانة فيها «فلان».`,
          lines: [
            "الأثر بالأرقام: المدة والنسبة والداتا.",
            "عرفنا إزاي وبعد قد إيه.",
            "الأحداث بالوقت من المصادر.",
            "السبب الجذري التقني.",
            "ليه الاختبارات مكشفتهوش.",
            "تصليح بصاحب وتاريخ.",
            "تصليح تاني يمنع النوع ده كله."
          ],
          sol: R`مثال نموذجي لمشكلة بسيطة، عشان تشوف الـ «٥ ليه» بتوصل لفين:

المشكلة: الموقع طلّع تحذير SSL ساعتين. ليه؟ الشهادة خلصت. ليه؟ التجديد التلقائي فشل. ليه؟ certbot كان محتاج بورت 80 وأنا قفلته في الفايروول من شهرين. ليه محدش عرف؟ مفيش إنذار على فشل التجديد ولا على تاريخ الانتهاء. ليه؟ مفيش مراقبة للشهادات أصلًا. الـ Action هنا مش «أفتكر أجدد»، دي: uptime check بيفحص تاريخ الشهادة وينبّه قبل ١٤ يوم (owner و تاريخ)، وتجديد بـ DNS challenge مش محتاج بورت 80.

الـ postmortem الكويس لازم فيه: Impact بأرقام (مدة، نسبة، داتا ضاعت ولا لأ)، و Detection (عرفنا إزاي، ومن مين)، و Timeline بالدقايق، و Root cause في السيستم، و Actions كل واحدة ليها owner وتاريخ.

الغلطة الشائعة: توقف عند «ليه» الأولى أو التانية وتكتب «فلان نسي» أو «هنخلّي بالنا». لو الإجابة شخص، اسأل «ليه السيستم سمح إن النسيان ده يوقّع الموقع؟». وتانية: Actions من غير owner وتاريخ، ودي عمليًا مش هتتعمل.`
        }
      ]
    }
]);
