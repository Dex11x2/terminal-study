// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
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
