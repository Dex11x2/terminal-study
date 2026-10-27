// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "محركات البحث",
      l: 3,
      n: "Meilisearch للبحث اللي بيستحمل الأخطاء ومعاه فلاتر و facets، و Elasticsearch بالـ mapping والـ analyzers والـ aggregations، وإزاي القاعدة تفضل هي المصدر والـ index يتزامن منها، وإمتى Postgres لوحده كفاية",
      items: [
        {
          cmd: "Meilisearch",
          title: "index وبحث بيستحمل الأخطاء، وفلاتر و facets، والعربي",
          desc: R`Meilisearch محرك بحث مفتوح المصدر، binary واحد، معمول للبحث اللي اليوزر بيكتبه في خانة البحث: بيرجع نتايج وانت بتكتب (prefix)، وبيستحمل غلطة أو اتنين في الكلمة (typo tolerance)، وبيرتب بالأهمية، وفيه فلاتر و sort و facets (عدد النتايج لكل قسم).

الـ documents بتتبعت JSON، وكل كتابة بتبقى task بتتنفذ في الخلفية (async)، فلازم تستنى الـ task لو هتبحث بعدها على طول. وأهم إعدادات: أنهي حقول يتبحث فيها، وأنهي حقول تتفلتر وتترتب، ولغة الحقول (عشان العربي يتقطع صح).`,
          example: R`import { Meilisearch } from "meilisearch";
const client = new Meilisearch({ host: "http://localhost:7700", apiKey: process.env.MEILI_KEY });
const products = client.index("products");
await products.updateSettings({
  searchableAttributes: ["name", "description"],
  filterableAttributes: ["category", "price"],
  sortableAttributes: ["price"],
  localizedAttributes: [{ attributePatterns: ["name", "description"], locales: ["ara", "eng"] }],
}).waitTask();
const task = await products.addDocuments([
  { id: 1, name: "كيبورد ميكانيكال", description: "سويتشات حمرا وإضاءة RGB", category: "accessories", price: 1500 },
  { id: 2, name: "ماوس لاسلكي", description: "بطارية تقعد شهرين", category: "accessories", price: 400 },
  { id: 3, name: "سماعة بلوتوث", description: "عزل ضوضاء للمكالمات", category: "audio", price: 2200 },
  { id: 4, name: "Mechanical Keyboard TKL", description: "brown switches, no numpad", category: "accessories", price: 1900 },
  { id: 5, name: "شاشة ٢٧ بوصة", description: "4K و USB-C", category: "screens", price: 9000 },
], { primaryKey: "id" }).waitTask();
console.log("task", task.uid, task.status, task.details);
const show = (label, r) => console.log(label, "->", r.hits.map((h) => h.id + ":" + h.name).join(" | "), "(" + r.estimatedTotalHits + ", " + r.processingTimeMs + "ms)");
show("keybord", await products.search("keybord"));
show("كيبورد", await products.search("كيبورد"));
show("كيبرد", await products.search("كيبرد"));
show("سماعه", await products.search("سماعه"));
show("لاسلكى", await products.search("لاسلكى"));
show("filter", await products.search("", { filter: "category = accessories AND price < 1600", sort: ["price:asc"] }));
const f = await products.search("", { facets: ["category"], limit: 0 });
console.log("facets", f.facetDistribution);
const h = await products.search("ميكانيكال", { attributesToHighlight: ["name"], limit: 1 });
console.log("highlight", h.hits[0]._formatted.name);`,
          try: R`شغّل Meilisearch:
[[docker run -d --name meili -p 7700:7700 -e MEILI_MASTER_KEY=dev-master-key-change-me-1234 getmeili/meilisearch:v1.56.0]]
و [[npm i meilisearch]]، واحفظ المثال [[meili.mjs]] وشغّله بـ [[MEILI_KEY=dev-master-key-change-me-1234 node meili.mjs]].
1. امسح سطر [[localizedAttributes]]، وامسح الـ index ([[curl -X DELETE localhost:7700/indexes/products -H "Authorization: Bearer ..."]]) وشغّل تاني. [[كيبورد]] لوحدها بترجع إيه؟
2. هات الـ «Default Search API Key» من [[GET /keys]] وجرّب بيه search، وبعدين DELETE للـ index بيه.`,
          flag: "script",
          deep: {
            why: "خانة البحث هي أول حاجة اليوزر بيجربها، وأول حاجة بتبان وحشة: «كيبرد» مش بيلاقي «كيبورد»، و «سماعه» مش بيلاقي «سماعة». Meilisearch بيدّيك ده جاهز في دقايق، ومن غير الـ ops بتاع Elasticsearch، وده بيخليه اختيار كويس لمتاجر وكتالوجات ومواقع محتوى لحد ملايين الـ documents.",
            how: R`الإعدادات:
- [[searchableAttributes]]: الحقول اللي يتبحث فيها **بالترتيب**: كلمة في [[name]] أهم من نفس الكلمة في [[description]] (قاعدة [[attributeRank]]). الافتراضي [[*]] كل الحقول بالترتيب اللي ظهرت بيه.
- [[filterableAttributes]] و [[sortableAttributes]]: لازم تتعلن قبل ما تستخدمها في [[filter]] و [[sort]]، وإلا error. وتغييرها بيعمل reindex.
- [[localizedAttributes]]: اللغة لكل حقل. من غيرها Meilisearch بيخمّن اللغة من النص نفسه، وكلمة عربية لوحدها زي «كيبورد» ممكن تتفهم فارسي (الحروف واحدة)، والفارسي ليه normalization مختلف للكاف والياء، فالبحث مبيطابقش (اللي حصل في تجربتنا). والبديل لكل طلب: [[locales: ["ara"]]] في الـ search.

ترتيب النتايج (ranking rules) الافتراضي في 1.56: [[words]] (كام كلمة من البحث موجودة)، و [[typo]] (أقل أخطاء الأول)، و [[proximity]] (الكلمات قريبة من بعض)، و [[attributeRank]] (في أنهي حقل)، و [[sort]]، و [[wordPosition]]، و [[exactness]]. يعني الـ [[sort]] بييجي **بعد** الأهمية: لو عايز ترتيب بالسعر بس، ابحث بـ [[""]] أو انقل [[sort]] لأول القايمة.

الـ typo tolerance الافتراضي: غلطة واحدة لكلمة من ٥ حروف أو أكتر، وغلطتين من ٩. ممكن تقفلها لحقول ([[disableOnAttributes]]: أكواد المنتجات) أو كلمات.

الـ tasks: كل كتابة (documents أو settings) بترجع task فيها [[uid]]، وبتتنفذ بالترتيب. [[.waitTask()]] (في الـ JS client 0.5x و 0.6x) بيستنى لحد ما تخلص. ومهم تشوف [[task.status]]: ممكن [[failed]] (مثلًا document من غير primary key) والـ promise بينجح عادي.

المفاتيح: [[MEILI_MASTER_KEY]] للإدارة بس (على السيرفر). Meilisearch بيعمل مفاتيح افتراضية: «Default Search API Key» (search بس، ينفع يتحط في الـ frontend)، و «Default Admin API Key» (للـ backend). وللـ multi-tenant فيه tenant tokens: JWT بيتعمل في الـ backend وفيه filter إجباري ([[tenant_id = 42]]).

الحدود: الـ index كله لازم يبقى على سيرفر واحد (فيه sharding/replication في الإصدار Enterprise من الـ docs)، والـ facets بيرجع لحد [[maxValuesPerFacet]] (١٠٠ افتراضيًا)، و [[maxTotalHits]] (١٠٠٠) أقصى نتايج بالـ pagination.`,
            when: "بحث منتجات أو مقالات أو أي حاجة اليوزر بيكتب فيها اسم، ومحتاج تسامح مع الأخطاء و facets، والداتا من آلاف لملايين. ولو الـ logs أو analytics أو aggregations تقيلة، Elasticsearch/OpenSearch (الدرس الجاي). ولو بحث بسيط في جدول، Postgres كفاية (آخر درس في القسم).",
            mistakes: R`تبحث على طول بعد addDocuments من غير ما تستنى الـ task. تستخدم filter على حقل مش في [[filterableAttributes]]. الـ master key في الـ frontend. تسيب اللغة يتخمّن للعربي. تفتكر [[sort]] بيلغي الأهمية. تبعت المنتج كله بكل حقوله (أسعار التكلفة، والملاحظات الداخلية) فيبقى قابل للبحث وراجع في النتايج: ابعت الحقول اللي البحث محتاجها بس.`
          },
          teach: R`## index منتجات، وبحث بأخطاء، وفلاتر، وعربي

السكريبت بيظبط إعدادات الـ index، ويضيف ٥ منتجات (عربي وإنجليزي)، ويستنى الـ task، وبعدين يعمل ٥ عمليات بحث فيها أخطاء، وفلتر، و facets، و highlight.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[meilisearch]] (JS client) 0.62.0، و Meilisearch 1.56.0 في Docker.

---

## ١. السيرفر

~~~bash
docker run -d --name meili -p 7700:7700 -e MEILI_MASTER_KEY=dev-master-key-change-me-1234 getmeili/meilisearch:v1.56.0
~~~

- [[7700]] البورت الافتراضي (HTTP API).
- [[MEILI_MASTER_KEY]]: من غيره أي حد يقدر يعمل أي حاجة. في وضع الإنتاج ([[MEILI_ENV=production]]) لازم يبقى ١٦ byte على الأقل. ده مفتاح تجربة.
- من غير مفتاح في الطلب:

~~~text الناتج (curl localhost:7700/indexes/products/search?q=x)
{"message":"The Authorization header is missing. It must use the bearer authorization method.","code":"missing_authorization_header",...}
~~~

## ٢. الإعدادات

~~~js
await products.updateSettings({
  searchableAttributes: ["name", "description"],
  filterableAttributes: ["category", "price"],
  sortableAttributes: ["price"],
  localizedAttributes: [{ attributePatterns: ["name", "description"], locales: ["ara", "eng"] }],
}).waitTask();
~~~

| الإعداد | معناه |
|---|---|
| [[searchableAttributes]] | ابحث في الاسم ثم الوصف (الترتيب = الأهمية) |
| [[filterableAttributes]] | ينفع تفلتر بالقسم والسعر |
| [[sortableAttributes]] | ينفع ترتّب بالسعر |
| [[localizedAttributes]] | الحقلين دول عربي أو إنجليزي، ومتخمّنش |

[[client.index("products")]] مبيعملش طلب: بيرجّع object للـ index، والـ index نفسه بيتعمل أول ما تكتب فيه. و [[.waitTask()]] بيستنى الـ task تخلص.

## ٣. الـ documents

~~~js
const task = await products.addDocuments([...], { primaryKey: "id" }).waitTask();
console.log("task", task.uid, task.status, task.details);
~~~

[[primaryKey]] الحقل اللي بيميّز كل document. لو بعت document بنفس الـ id تاني، بيتبدل (upsert).

~~~text الناتج
task 5 succeeded { receivedDocuments: 5, indexedDocuments: 5 }
~~~

[[uid 5]] لأن قبلها كان فيه tasks تانية على نفس السيرفر (الإعدادات ومسح الـ index). المهم [[succeeded]].

## ٤. البحث

~~~js
const show = (label, r) => console.log(label, "->", r.hits.map((h) => h.id + ":" + h.name).join(" | "), "(" + r.estimatedTotalHits + ", " + r.processingTimeMs + "ms)");
~~~

دالة طباعة: [[r.hits]] النتايج، و [[estimatedTotalHits]] العدد التقريبي الكلي، و [[processingTimeMs]] وقت البحث جوه Meilisearch.

~~~text الناتج
keybord -> 4:Mechanical Keyboard TKL (1, 1ms)
كيبورد -> 1:كيبورد ميكانيكال (1, 1ms)
كيبرد -> 1:كيبورد ميكانيكال (1, 0ms)
سماعه -> 3:سماعة بلوتوث (1, 0ms)
لاسلكى -> 2:ماوس لاسلكي (1, 1ms)
~~~

| البحث | الموجود | ليه طابق |
|---|---|---|
| [[keybord]] | Keyboard | غلطة واحدة (حرف ناقص) في كلمة ٧ حروف |
| [[كيبرد]] | كيبورد | غلطة واحدة (الواو ناقصة) |
| [[سماعه]] | سماعة | الـ normalization بتاع العربي بيوحّد الهاء والتاء المربوطة |
| [[لاسلكى]] | لاسلكي | والألف المقصورة والياء |

### من غير localizedAttributes

نفس التجربة من غير السطر ده (والـ index جديد):

~~~text الناتج
keybord -> 4:Mechanical Keyboard TKL (1, 0ms)
كيبورد ->  (0, 0ms)
كيبرد ->  (0, 0ms)
سماعه -> 3:سماعة بلوتوث (1, 0ms)
لاسلكى -> 2:ماوس لاسلكي (1, 0ms)
~~~

«كيبورد» مش لاقية نفسها! بينما [[كيب]] و [[كيبورد ميكانيكال]] كانوا بيلاقوها. الكلمة لوحدها اتخمّنت فارسي (نفس الحروف)، والـ normalization الفارسي بيحوّل الكاف والياء لأشكالهم الفارسية، فمبقتش زي اللي في الـ index. البحث بـ [[locales: ["ara"]]] رجّعها، و [[localizedAttributes]] حلّها لكل البحث.

## ٥. فلتر و sort

~~~js
show("filter", await products.search("", { filter: "category = accessories AND price < 1600", sort: ["price:asc"] }));
~~~

- [[""]] بحث فاضي = كل الـ documents.
- [[filter]] لغة بسيطة: [[=]] و [[!=]] و [[<]] و [[TO]] (مدى) و [[IN [...]]] و [[AND]] و [[OR]] و [[NOT]].
- [[sort: ["price:asc"]]] من الأرخص.

~~~text الناتج
filter -> 2:ماوس لاسلكي | 1:كيبورد ميكانيكال (2, 0ms)
~~~

الـ Keyboard الإنجليزي (1900) اتشال بالسعر.

## ٦. facets

~~~js
const f = await products.search("", { facets: ["category"], limit: 0 });
~~~

[[facets]] = عدد النتايج لكل قيمة. و [[limit: 0]] = مش عايز documents، الأرقام بس (للـ sidebar بتاع الفلاتر).

~~~text الناتج
facets { category: { accessories: 3, audio: 1, screens: 1 } }
~~~

## ٧. highlight

~~~text الناتج
highlight كيبورد <em>ميكانيكال</em>
~~~

[[_formatted]] نسخة من الـ document والكلمات المطابقة جوه [[<em>]]. ده HTML: اعرضه بطريقة آمنة (اعمل escape للباقي، أو غيّر الـ tags بـ [[highlightPreTag]]).

## ٨. المفاتيح

بـ «Default Search API Key» (من [[GET /keys]] بالـ master key) البحث اشتغل، والمسح:

~~~text الناتج (DELETE /indexes/products بمفتاح البحث)
{"message":"The provided API key is invalid.","code":"invalid_api_key",...}
~~~

المفتاح ده بس اللي ينفع يوصل للمتصفح.

---

## الخلاصة

| | |
|---|---|
| [[searchableAttributes]] | فين وبأنهي أهمية |
| [[filterableAttributes]] / [[sortableAttributes]] | لازم قبل الـ filter والـ sort |
| [[localizedAttributes]] | حدد العربي، متسيبهوش يتخمّن |
| [[.waitTask()]] + [[status]] | الكتابة async |
| typo tolerance | غلطة من ٥ حروف، واتنين من ٩ |
| Search API Key | للمتصفح، والـ master key للسيرفر بس |`,
          lines: [
            "استورد الـ client الرسمي.",
            "client على السيرفر، والمفتاح من متغير بيئة.",
            "الـ index اسمه products (بيتعمل أول ما تكتب فيه).",
            "حدّث الإعدادات:",
            "الحقول اللي يتبحث فيها بترتيب الأهمية.",
            "الحقول اللي تتفلتر.",
            "الحقول اللي تترتب.",
            "الحقلين دول عربي أو إنجليزي (متخمّنش اللغة).",
            "واستنى الـ task تخلص.",
            "ضيف documents واستنى:",
            "منتج ١.",
            "منتج ٢.",
            "منتج ٣.",
            "منتج ٤ بالإنجليزي.",
            "منتج ٥.",
            "والـ primary key هو id.",
            "اطبع رقم الـ task وحالتها وتفاصيلها.",
            "دالة طباعة للنتايج والعدد والوقت.",
            "بحث بغلطة بالإنجليزي.",
            "بحث عربي صح.",
            "بحث عربي بحرف ناقص.",
            "هاء بدل تاء مربوطة.",
            "ألف مقصورة بدل ياء.",
            "كل الإكسسوارات اللي أقل من ١٦٠٠، من الأرخص.",
            "عدد المنتجات لكل قسم من غير documents.",
            "اطبع الـ facets.",
            "بحث مع highlight على الاسم.",
            "اطبع الاسم والكلمة المطابقة جوه <em>."
          ],
          sol: R`1. من غير [[localizedAttributes]]: [[كيبورد ->  (0, 0ms)]] و [[كيبرد ->  (0, 0ms)]]، والباقي زي ما هو. اللغة اتخمّنت غلط للكلمة لوحدها.
2. بمفتاح البحث: الـ search بيشتغل، والـ DELETE بيرجّع [[{"code":"invalid_api_key"...}]] (HTTP 403).

(اتجرّب على Meilisearch 1.56.0 في Docker و Node 24.22.)`
        },
        {
          cmd: "Elasticsearch: mapping و analyzers",
          title: "نوع كل حقل، والـ analyzer اللي بيقطّع النص لكلمات",
          desc: R`Elasticsearch (و OpenSearch، الـ fork بتاعه بنفس الـ APIs تقريبًا) بيخزن JSON documents في index، وبيبني لكل حقل نصي inverted index: كل كلمة وقايمة الـ documents اللي فيها. الـ **mapping** بيحدد نوع كل حقل: [[text]] بيتقطّع كلمات للبحث، و [[keyword]] بيتخزن زي ما هو للفلترة والترتيب والـ aggregations، و [[integer]] و [[date]] وغيرهم.

والـ **analyzer** هو اللي بيحوّل النص لكلمات (tokens): بيقطّع، ويصغّر الحروف، ويشيل الكلمات الشائعة، ويرجّع الكلمة لأصلها. نفس الـ analyzer بيشتغل على النص وقت التخزين وعلى كلام البحث، فـ «الكيبوردات» و «كيبورد» بيتقابلوا. و [[arabic]] analyzer مدمج: بيشيل «ال» والجمع، وبيوحّد الهاء والتاء المربوطة والألف المقصورة.`,
          example: R`curl -s -X PUT localhost:9200/products -H "content-type: application/json" -d '{"mappings":{"properties":{"name":{"type":"text","analyzer":"arabic","fields":{"raw":{"type":"keyword"}}},"description":{"type":"text","analyzer":"arabic"},"category":{"type":"keyword"},"price":{"type":"integer"}}}}'
curl -s -X POST "localhost:9200/_analyze?filter_path=tokens.token" -H "content-type: application/json" -d '{"analyzer":"standard","text":"الكيبوردات الميكانيكية للمكاتب"}'
curl -s -X POST "localhost:9200/_analyze?filter_path=tokens.token" -H "content-type: application/json" -d '{"analyzer":"arabic","text":"الكيبوردات الميكانيكية للمكاتب"}'
curl -s -X POST "localhost:9200/_analyze?filter_path=tokens.token" -H "content-type: application/json" -d '{"analyzer":"arabic","text":"كيبورد ميكانيكي سماعة سماعه لاسلكى"}'
curl -s -X POST "localhost:9200/_bulk?refresh=true&filter_path=errors" -H "content-type: application/x-ndjson" --data-binary @bulk.ndjson
curl -s -X POST "localhost:9200/auto/_doc?refresh=true" -H "content-type: application/json" -d '{"name":"كيبورد","price":"1500"}'
curl -s localhost:9200/auto/_mapping
curl -s -X PUT localhost:9200/products/_mapping -H "content-type: application/json" -d '{"properties":{"price":{"type":"keyword"}}}'`,
          try: R`شغّل Elasticsearch بذاكرة صغيرة:
[[docker run -d --name es -p 127.0.0.1:9200:9200 -e discovery.type=single-node -e xpack.security.enabled=false -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -m 1.5g elasticsearch:9.5.5]]
(من غير security للتجربة على جهازك بس). اعمل [[bulk.ndjson]] (في الحل)، وشغّل الأوامر. بعدين جرّب [[_analyze]] بـ [[english]] على [[Running mechanical keyboards]]، وشوف [[curl -s "localhost:9200/_cat/indices/products?v&h=index,health,docs.count"]]: الـ health لونه إيه وليه؟ وفي الآخر [[docker rm -fv es]].`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل Elasticsearch من الـ mapping: حقل اتعمل text وانت محتاجه keyword فالفلتر مش بيطابق، أو رقم اتخزن text فالـ range مبيشتغلش، أو analyzer إنجليزي على نص عربي فالبحث مبيلاقيش. والـ mapping مينفعش يتغير بعد ما الداتا تدخل، فالغلطة تمنها reindex.",
            how: R`الأنواع الأساسية:
- [[text]]: بيتحلل بالـ analyzer. للبحث بالكلمات ([[match]]). مينفعش aggregation أو sort عليه افتراضيًا.
- [[keyword]]: القيمة كلها token واحد زي ما هي (حالة الحروف مهمة). للفلترة بالظبط ([[term]])، والـ aggregations، والـ sort. لـ ids، والحالات، والأقسام، والإيميلات.
- [[integer]] و [[long]] و [[float]] و [[scaled_float]] (للفلوس) و [[date]] و [[boolean]] و [[geo_point]] و [[dense_vector]] (للـ embeddings).
- [[fields]] (multi-fields): نفس القيمة بأكتر من شكل: [[name]] text للبحث، و [[name.raw]] keyword للترتيب والـ aggregation.

الـ dynamic mapping: لو بعت document لـ index مالوش mapping، Elasticsearch بيخمّن: أي نص بيبقى [[text]] ومعاه [[.keyword]] (لحد ٢٥٦ حرف)، حتى لو كان رقم بين علامات تنصيص ([["1500"]] بقى text). مريح للتجربة، وخطر في الإنتاج: اعمل الـ mapping بنفسك، أو [[dynamic: strict]] عشان أي حقل مش معروف يترفض.

الـ analyzer = [[char_filter]] (تنضيف قبل التقطيع) ثم [[tokenizer]] (التقطيع) ثم [[token filters]] (lowercase، و stop words، و stemming، و normalization). المدمجين: [[standard]] (تقطيع Unicode و lowercase بس)، و [[arabic]] و [[english]] وعشرات اللغات، و [[keyword]] (من غير تقطيع). وتقدر تعمل analyzer بتاعك في [[settings.analysis]] (مثلًا synonyms: «لابتوب» = «لاب توب» = «laptop»).

[[_analyze]] أهم أداة debugging: بيوريك الـ tokens اللي هتتخزن. لو البحث مش لاقي حاجة، قارن tokens النص بـ tokens كلام البحث.

مينفعش تغيّر نوع حقل موجود ([[cannot be changed from type]]). تقدر تضيف حقول جديدة بس. للتغيير: index جديد بالـ mapping الجديد، و [[_reindex]] من القديم، وحرّك الـ alias ([[products]] → [[products_v2]]) في عملية واحدة. عشان كده التطبيق يكلّم alias مش اسم index.

[[refresh=true]]: الـ documents بتبقى قابلة للبحث بعد refresh (كل ثانية افتراضيًا: near real-time). في التجربة بنجبره، وفي الإنتاج متستخدمهوش مع كل كتابة (بيبطّأ).

الـ health [[yellow]] على node واحد: كل index افتراضيًا ليه replica واحدة، ومينفعش الـ replica تبقى على نفس الـ node بتاع الـ primary، فهي مش متوزعة. في التطوير عادي ([[number_of_replicas: 0]] يخليه green)، وفي الإنتاج ٣ nodes.

Elasticsearch و OpenSearch: OpenSearch fork من Elasticsearch 7.10 (٢٠٢١) بترخيص Apache 2.0، والـ APIs الأساسية دي (mapping و _analyze و _bulk و query DSL و aggregations) واحدة فيهم. الفروق في الحاجات الجديدة والـ plugins والـ security (من docs الاتنين؛ اتجرّب هنا Elasticsearch بس).`,
            when: "قبل ما تبعت أول document لأي index. وكل ما البحث يرجّع نتايج غريبة، ابدأ بـ [[_mapping]] و [[_analyze]].",
            mistakes: R`تسيب الـ dynamic mapping في الإنتاج فالأرقام تبقى text والتواريخ تبقى text. [[term]] على حقل text (الدرس الجاي). aggregation على text. analyzer مش مناسب للغة. تكلّم اسم الـ index من التطبيق مش alias فالـ reindex يبقى downtime. heap أكبر من نص الذاكرة أو أكبر من ~٣١ جيجا (من الـ docs). [[xpack.security.enabled=false]] على سيرفر عليه بورت مفتوح.`
          },
          teach: R`## index بـ mapping عربي، وبنشوف الكلمات بتتقطع إزاي

الأوامر بتعمل index [[products]] بـ mapping صريح، وبتقارن [[standard]] بـ [[arabic]] analyzer، وبتدخّل ٥ منتجات بـ [[_bulk]]، وبتوريك الـ dynamic mapping، وبتحاول تغيّر نوع حقل.

اتجرّب على Elasticsearch 9.5.5 في Docker (node واحد، heap ٥١٢ ميجا، من غير security)، بـ curl من Git Bash على ويندوز 11. الأوامر نفسها شغالة في لينكس والماك. وفي PowerShell، [[curl.exe]] بنفس الشكل بس علامات التنصيص جوه الـ JSON محتاجة تتظبط (أسهل تحط الـ JSON في ملف وتبعته بـ [[--data-binary @file.json]]).

---

## ٠. التشغيل

~~~bash
docker run -d --name es -p 127.0.0.1:9200:9200 -e discovery.type=single-node -e xpack.security.enabled=false -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -m 1.5g elasticsearch:9.5.5
~~~

| الحتة | ليه |
|---|---|
| [[discovery.type=single-node]] | متدوّرش على nodes تانية تعمل معاها cluster |
| [[xpack.security.enabled=false]] | من غير باسورد و TLS. **للتجربة على [[127.0.0.1]] بس** |
| [[ES_JAVA_OPTS="-Xms512m -Xmx512m"]] | الـ JVM heap ٥١٢ ميجا (الافتراضي بياخد جزء كبير من الذاكرة) |
| [[-m 1.5g]] | حد أقصى لذاكرة الـ container كلها |

~~~text الناتج (curl -s localhost:9200، مختصر)
"version" : {
  "number" : "9.5.5",
  "lucene_version" : "10.5.1",
"tagline" : "You Know, for Search"
~~~

Lucene هي المكتبة اللي تحت Elasticsearch و OpenSearch (و Solr) واللي بتعمل الـ inverted index.

## ١. الـ mapping

~~~json
{"mappings":{"properties":{
  "name":{"type":"text","analyzer":"arabic","fields":{"raw":{"type":"keyword"}}},
  "description":{"type":"text","analyzer":"arabic"},
  "category":{"type":"keyword"},
  "price":{"type":"integer"}
}}}
~~~

(نفس الـ JSON اللي في أول أمر، متقسم سطور للقراية.)

| الحقل | النوع | ليه |
|---|---|---|
| [[name]] | text بـ arabic | بحث بالكلمات |
| [[name.raw]] | keyword | ترتيب، و aggregation، ومطابقة بالظبط |
| [[description]] | text بـ arabic | بحث |
| [[category]] | keyword | فلتر و facets |
| [[price]] | integer | range و sort و avg |

~~~text الناتج
{"acknowledged":true,"shards_acknowledged":true,"index":"products"}
~~~

## ٢. standard ولا arabic

~~~bash
curl -s -X POST "localhost:9200/_analyze?filter_path=tokens.token" ... '{"analyzer":"standard","text":"الكيبوردات الميكانيكية للمكاتب"}'
~~~

[[filter_path=tokens.token]]: رجّع الـ tokens بس (من غير الأماكن والأنواع). بيقلل أي رد في Elasticsearch.

~~~text الناتج (standard)
{"tokens":[{"token":"الكيبوردات"},{"token":"الميكانيكية"},{"token":"للمكاتب"}]}
~~~

~~~text الناتج (arabic)
{"tokens":[{"token":"كيبورد"},{"token":"ميكانيك"},{"token":"مكاتب"}]}
~~~

| النص | standard | arabic | اللي اتشال |
|---|---|---|---|
| الكيبوردات | الكيبوردات | كيبورد | «ال» و «ات» |
| الميكانيكية | الميكانيكية | ميكانيك | «ال» و «ية» |
| للمكاتب | للمكاتب | مكاتب | «لل» |

بالـ standard، اللي يدوّر على «كيبورد» مش هيلاقي «الكيبوردات». بالـ arabic، الاتنين [[كيبورد]].

~~~text الناتج (arabic: كيبورد ميكانيكي سماعة سماعه لاسلكى)
{"tokens":[{"token":"كيبورد"},{"token":"ميكانيك"},{"token":"سماع"},{"token":"سماع"},{"token":"لاسلك"}]}
~~~

«سماعة» و «سماعه» نفس الـ token، و «ميكانيكي» زي «الميكانيكية»، و «لاسلكى» بالألف المقصورة بقت [[لاسلك]].

وللمقارنة، [[english]] على [[Running mechanical keyboards]]:

~~~text الناتج
{"tokens":[{"token":"run"},{"token":"mechan"},{"token":"keyboard"}]}
~~~

الـ tokens مش لازم تبقى كلمات حقيقية ([[mechan]]): المهم إن الصيغ المختلفة توصل لنفس الـ token.

## ٣. bulk

~~~bash
curl -s -X POST "localhost:9200/_bulk?refresh=true&filter_path=errors" -H "content-type: application/x-ndjson" --data-binary @bulk.ndjson
~~~

- [[_bulk]]: كذا عملية في طلب واحد. الشكل NDJSON: سطر action ([[{"index":{"_index":"products","_id":"1"}}]]) وتحته سطر الـ document، وهكذا، وسطر فاضي في الآخر.
- [[--data-binary]]: ابعت الملف زي ما هو (من غير ما curl يشيل الأسطر الجديدة، زي [[-d]]).
- [[refresh=true]]: خليهم قابلين للبحث فورًا.

~~~text الناتج
{"errors":false}
~~~

[[errors: false]] مهمة: الـ bulk بيرجّع [[200]] حتى لو documents فشلت، والتفاصيل في [[items]].

## ٤. الـ dynamic mapping

~~~bash
curl -s -X POST "localhost:9200/auto/_doc?refresh=true" ... '{"name":"كيبورد","price":"1500"}'
curl -s localhost:9200/auto/_mapping
~~~

~~~text الناتج (الأمرين)
{"_index":"auto","_id":"JWBZfqEBkr6jwGk6lUBT","_version":1,"result":"created","forced_refresh":true,"_shards":{"total":2,"successful":1,"failed":0},"_seq_no":0,"_primary_term":1}
{"auto":{"mappings":{"properties":{"name":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"price":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}}}}
~~~

- [[_doc]] من غير id: Elasticsearch ولّد واحد ([[JWBZfqEBkr6jwGk6lUBT]]).
- [[_shards total 2, successful 1]]: الـ primary اتكتب، والـ replica ملهاش مكان (نفس سبب الـ yellow تحت).

- index اسمه [[auto]] اتعمل لوحده.
- [[price]] بقى **text** لأنه اتبعت [["1500"]] كنص. أي [[range]] على السعر مش هيشتغل صح.
- [[name]] بـ [[standard]] (مفيش analyzer اتحدد): العربي مش هيتحلل.

## ٥. تغيير نوع حقل

~~~text الناتج (PUT /products/_mapping بـ price keyword)
{"error":{"root_cause":[{"type":"illegal_argument_exception","reason":"mapper [price] cannot be changed from type [integer] to [keyword]"}],"type":"illegal_argument_exception","reason":"mapper [price] cannot be changed from type [integer] to [keyword]"},"status":400}
~~~

الحل: index جديد و [[_reindex]] و alias.

## ٦. الـ health

~~~text الناتج (_cat/indices/products?v)
index    health docs.count store.size
products yellow          5      7.6kb
~~~

[[yellow]]: الـ primary شغال، والـ replica مش متوزعة (مفيش node تاني). ٥ documents في ٧.٦ كيلو.

---

## الخلاصة

| | |
|---|---|
| [[text]] | بيتحلل: للبحث |
| [[keyword]] | زي ما هو: فلتر و sort و aggregation |
| [[fields.raw]] | نفس الحقل بالشكلين |
| [[arabic]] analyzer | بيشيل «ال» والجمع ويوحّد ة/ه و ى/ي |
| [[_analyze]] | شوف الـ tokens لما البحث ميلاقيش |
| الـ mapping | اعمله بنفسك، ومينفعش يتغير: reindex + alias |`,
          lines: [
            "اعمل index products بـ mapping: الاسم text عربي ومعاه نسخة keyword، والوصف text عربي، والقسم keyword، والسعر integer.",
            "قطّع جملة عربي بالـ standard analyzer.",
            "نفس الجملة بالـ arabic analyzer.",
            "كلمات بأشكال مختلفة بالـ arabic analyzer.",
            "دخّل ٥ منتجات من ملف NDJSON في طلب واحد، وخليهم قابلين للبحث فورًا.",
            "ابعت document لـ index مالوش mapping (السعر نص).",
            "شوف الـ mapping اللي Elasticsearch خمّنه.",
            "حاول تغيّر نوع السعر: لازم يفشل."
          ],
          sol: R`[[english]] على [[Running mechanical keyboards]]: [[run]] و [[mechan]] و [[keyboard]].

الـ health [[yellow]]: node واحد، والـ replica الافتراضية ملهاش node تانية تتحط عليه. [[docs.count 5]].

(اتجرّب على Elasticsearch 9.5.5 في Docker.)`,
          solCode: R`{"index":{"_index":"products","_id":"1"}}
{"name":"كيبورد ميكانيكال","description":"سويتشات حمرا وإضاءة","category":"accessories","price":1500}
{"index":{"_index":"products","_id":"2"}}
{"name":"ماوس لاسلكي","description":"بطارية تقعد شهرين","category":"accessories","price":400}
{"index":{"_index":"products","_id":"3"}}
{"name":"سماعة بلوتوث","description":"عزل ضوضاء للمكالمات","category":"audio","price":2200}
{"index":{"_index":"products","_id":"4"}}
{"name":"الكيبوردات اللاسلكية","description":"كيبورد وماوس مع بعض","category":"accessories","price":1100}
{"index":{"_index":"products","_id":"5"}}
{"name":"شاشة 27 بوصة","description":"4K","category":"screens","price":9000}`
        },
        {
          cmd: "match و term و aggregations",
          title: "match للنص، و term للقيم بالظبط، و bool يجمعهم، و aggs للأرقام",
          desc: R`[[match]] بيحلل كلام البحث بنفس analyzer الحقل وبعدين يدوّر على الـ tokens: ده للنص اللي اليوزر كتبه. [[term]] بيدوّر على القيمة **زي ما هي** من غير تحليل: ده للـ keyword والأرقام والـ ids. و [[term]] على حقل text تقريبًا دايمًا غلط.

[[bool]] بيجمع: [[must]] (لازم ويأثر في الترتيب)، و [[filter]] (لازم ومبيأثرش في الترتيب وبيتكاش)، و [[should]] و [[must_not]]. والـ aggregations بتحسب على النتايج: عدد لكل قسم ([[terms]])، ومتوسط ([[avg]])، وفئات أسعار ([[range]])، وكلها في نفس الطلب مع البحث.`,
          example: R`curl -s "localhost:9200/products/_search?filter_path=hits.total.value,hits.hits._id,hits.hits._score" -H "content-type: application/json" -d '{"query":{"match":{"name":"كيبورد"}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.total.value" -H "content-type: application/json" -d '{"query":{"term":{"name":"كيبورد ميكانيكال"}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.total.value,hits.hits._id" -H "content-type: application/json" -d '{"query":{"term":{"name.raw":"كيبورد ميكانيكال"}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.total.value" -H "content-type: application/json" -d '{"query":{"term":{"category":"Accessories"}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.hits._id,hits.hits._source.name,hits.hits._score" -H "content-type: application/json" -d '{"query":{"bool":{"must":[{"match":{"name":"لاسلكى"}}],"filter":[{"term":{"category":"accessories"}},{"range":{"price":{"lte":1200}}}]}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.hits._id" -H "content-type: application/json" -d '{"query":{"match":{"name":{"query":"كيبرد","fuzziness":"AUTO"}}}}'
curl -s "localhost:9200/products/_search?filter_path=aggregations" -H "content-type: application/json" -d '{"size":0,"aggs":{"by_category":{"terms":{"field":"category"},"aggs":{"avg_price":{"avg":{"field":"price"}}}},"price_ranges":{"range":{"field":"price","ranges":[{"to":1000},{"from":1000,"to":5000},{"from":5000}]}}}}'
curl -s "localhost:9200/products/_search?filter_path=error.root_cause.reason" -H "content-type: application/json" -d '{"size":0,"aggs":{"n":{"terms":{"field":"name"}}}}'`,
          try: R`على index الـ products بتاع الدرس اللي فات: جرّب [[match]] على [[name]] بـ [[كيبرد]] من غير [[fuzziness]]: كام نتيجة؟ وبعدين ضيف للـ bool [[must_not]] فيه [[{"term":{"_id":"4"}}]]. وفي الآخر اعمل aggregation [[terms]] على [[name.raw]] بدل [[name]].`,
          flag: "script",
          deep: {
            why: "أشهر سؤال عن Elasticsearch: «ليه الـ term query مش لاقية حاجة والـ document موجود؟». والفرق بين must و filter بيفرق في الأداء والترتيب. والـ aggregations هي السبب إن ناس كتير بتختار Elasticsearch أصلًا (dashboards و facets و analytics).",
            how: R`ليه [[term]] على text فشل؟ [[name]] اتخزن tokens: [[كيبورد]] و [[ميكانيكال]] (بعد الـ arabic analyzer). [[term]] بيدوّر على token واحد بالظبط [[كيبورد ميكانيكال]] بالمسافة، ومفيش token كده. على [[name.raw]] (keyword) القيمة متخزنة كاملة فطابقت. ونفس الكلام [[Accessories]] بحرف كبير على keyword: مفيش lowercase، فـ صفر.

الترتيب ([[_score]]): BM25. الكلمة النادرة في الـ index أهم من الشائعة، والحقل القصير اللي فيه الكلمة أهم من الطويل. والـ [[filter]] مبيحسبش score (أسرع، وبيتكاش)، فأي شرط «نعم أو لا» (القسم، والسعر، والحالة، والـ tenant) مكانه [[filter]] مش [[must]].

[[bool]]:
- [[must]]: لازم يطابق، وبيزوّد الـ score.
- [[filter]]: لازم يطابق، من غير score.
- [[should]]: اختياري، بيزوّد الـ score لو طابق (ولو مفيش must ولا filter، لازم واحد منهم يطابق).
- [[must_not]]: لازم ميطابقش.

[[fuzziness: "AUTO"]]: بيقبل أخطاء حسب طول الكلمة (٠ لحد حرفين، و ١ من ٣ لـ ٥، و ٢ أكتر من كده، من الـ docs). مش مفعّل افتراضيًا زي Meilisearch.

الـ aggregations:
- bucket aggs بتقسّم: [[terms]] (لكل قيمة)، و [[range]]، و [[date_histogram]] (لكل يوم أو ساعة)، و [[histogram]].
- metric aggs بتحسب: [[avg]] و [[sum]] و [[min]] و [[max]] و [[cardinality]] (عدد القيم المختلفة، تقريبي) و [[percentiles]].
- متداخلة: [[avg_price]] جوه [[by_category]] = متوسط لكل قسم.
- [[size: 0]]: مش عايز documents، الأرقام بس.
- الـ aggs بتشتغل على **نتايج الـ query**، فلو حطيت query بتبقى facets للبحث ده.
- [[doc_count_error_upper_bound]]: الـ [[terms]] على كذا shard تقريبي (كل shard بيرجّع أعلى قيم عنده). على shard واحد صفر.

الـ aggregation على text ممنوع ([[Fielddata is disabled]]): الـ text مخزن inverted (كلمة → documents)، والـ aggregation محتاج العكس (document → قيمة) وده بيتخزن لـ keyword والأرقام في doc values على الديسك. الحل keyword (أو multi-field [[.raw]])، مش [[fielddata=true]] (بيحمّل كل ده في الـ heap).`,
            when: "match لأي نص اليوزر كتبه، term و range في filter لكل الفلاتر، aggregations للـ facets والـ dashboards. ولو مستخدم Meilisearch والطلبات بقت analytics تقيلة (histograms و percentiles على ملايين)، ده وقت Elasticsearch أو OpenSearch.",
            mistakes: R`[[term]] على text. فلاتر في [[must]] (أبطأ ومبتتكاش وبتلخبط الترتيب). aggregation على text و [[fielddata=true]] كحل. [[terms]] aggregation بـ [[size]] كبير جدًا على حقل فيه ملايين قيم. pagination عميقة بـ [[from]] كبير (الحد ١٠٠٠٠ افتراضيًا، والصح [[search_after]]). تبني الـ query بـ string concatenation من كلام اليوزر بدل JSON.`
          },
          teach: R`## ٨ طلبات على نفس الـ ٥ منتجات

كل أمر [[_search]] على index الـ products بتاع الدرس اللي فات. هنشوف match و term، وبعدين bool، وبعدين fuzziness، وبعدين aggregations.

اتجرّب على Elasticsearch 9.5.5 في Docker (node واحد) بـ curl من Git Bash على ويندوز 11.

---

## ١. match

~~~json
{"query":{"match":{"name":"كيبورد"}}}
~~~

~~~text الناتج
{"hits":{"total":{"value":2},"hits":[{"_id":"1","_score":0.90928507},{"_id":"4","_score":0.90928507}]}}
~~~

- 1 «كيبورد ميكانيكال» و 4 «الكيبوردات اللاسلكية»: الـ arabic analyzer خلّى الاتنين [[كيبورد]].
- [[_score]] نفس الرقم: الكلمة موجودة مرة في اسم من كلمتين في الاتنين.
- [[filter_path]] في الـ URL بيختار الحقول اللي ترجع بس.

## ٢. term على text، و على keyword

~~~json
{"query":{"term":{"name":"كيبورد ميكانيكال"}}}
{"query":{"term":{"name.raw":"كيبورد ميكانيكال"}}}
~~~

~~~text الناتج
{"hits":{"total":{"value":0}}}
{"hits":{"total":{"value":1},"hits":[{"_id":"1"}]}}
~~~

| | المتخزن | بيدوّر على | النتيجة |
|---|---|---|---|
| [[name]] (text) | [[كيبورد]] و [[ميكانيكال]] | [[كيبورد ميكانيكال]] كـ token واحد | ٠ |
| [[name.raw]] (keyword) | [[كيبورد ميكانيكال]] | نفس القيمة | ١ |

## ٣. الحروف الكبيرة في keyword

~~~json
{"query":{"term":{"category":"Accessories"}}}
~~~

~~~text الناتج
{"hits":{"total":{"value":0}}}
~~~

المتخزن [[accessories]]. الـ keyword بالظبط، حتى حالة الحروف. (لو محتاج case-insensitive: [[normalizer]] بـ lowercase على الحقل.)

## ٤. bool: نص + فلاتر

~~~json
{"query":{"bool":{
  "must":[{"match":{"name":"لاسلكى"}}],
  "filter":[{"term":{"category":"accessories"}},{"range":{"price":{"lte":1200}}}]
}}}
~~~

- [[must]]: الاسم فيه «لاسلكى» (بالألف المقصورة).
- [[filter]]: القسم accessories، و [[range]] السعر [[lte]] (less than or equal) ١٢٠٠.

~~~text الناتج
{"hits":{"hits":[{"_id":"2","_score":0.90928507,"_source":{"name":"ماوس لاسلكي"}},{"_id":"4","_score":0.90928507,"_source":{"name":"الكيبوردات اللاسلكية"}}]}}
~~~

«لاسلكى» لقت «لاسلكي» و «اللاسلكية». والـ [[_score]] جاي من الـ [[must]] بس: الفلاتر مزوّدتش حاجة.

## ٥. أخطاء إملائية

~~~json
{"query":{"match":{"name":{"query":"كيبرد","fuzziness":"AUTO"}}}}
~~~

~~~text الناتج
{"hits":{"hits":[{"_id":"1"},{"_id":"4"}]}}
~~~

ومن غير [[fuzziness]]: [[{"hits":{"total":{"value":0}}}]]. في Elasticsearch التسامح مع الأخطاء انت اللي بتطلبه.

## ٦. aggregations

~~~json
{"size":0,"aggs":{
  "by_category":{"terms":{"field":"category"},"aggs":{"avg_price":{"avg":{"field":"price"}}}},
  "price_ranges":{"range":{"field":"price","ranges":[{"to":1000},{"from":1000,"to":5000},{"from":5000}]}}
}}
~~~

- [[by_category]] و [[avg_price]] و [[price_ranges]] أسامي من عندك، بترجع في الرد بنفس الاسم.
- [[terms]] جواه [[avg]]: متوسط لكل قسم.
- [[range]]: [[to]] أقل من (مش شاملة)، و [[from]] من (شاملة).

~~~text الناتج
{"aggregations":{
  "by_category":{"doc_count_error_upper_bound":0,"sum_other_doc_count":0,"buckets":[
    {"key":"accessories","doc_count":3,"avg_price":{"value":1000.0}},
    {"key":"audio","doc_count":1,"avg_price":{"value":2200.0}},
    {"key":"screens","doc_count":1,"avg_price":{"value":9000.0}}]},
  "price_ranges":{"buckets":[
    {"key":"*-1000.0","to":1000.0,"doc_count":1},
    {"key":"1000.0-5000.0","from":1000.0,"to":5000.0,"doc_count":3},
    {"key":"5000.0-*","from":5000.0,"doc_count":1}]}}}
~~~

(متقسم سطور للقراية.) الإكسسوارات ٣ ومتوسطها (١٥٠٠ + ٤٠٠ + ١١٠٠) ÷ ٣ = ١٠٠٠. وفئات السعر: الماوس تحت الألف، و ٣ بين ألف و ٥ آلاف، والشاشة فوق.

## ٧. aggregation على text

~~~text الناتج (السبب بس)
Fielddata is disabled on [name] in [products]. Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default. Please use a keyword field instead. ...
~~~

[[400]]. استخدم [[name.raw]].

---

## الخلاصة

| | بيحلل كلام البحث؟ | لـ |
|---|---|---|
| [[match]] | أيوه، بنفس analyzer الحقل | نص اليوزر |
| [[term]] | لأ | keyword وأرقام و ids |
| [[range]] | لأ | أرقام وتواريخ |
| [[bool.must]] | | شروط بتأثر في الترتيب |
| [[bool.filter]] | | شروط نعم أو لا، أسرع |
| [[aggs]] | | أرقام على النتايج، على keyword والأرقام بس |`,
          lines: [
            "match: الاسم فيه كيبورد (بعد التحليل).",
            "term على حقل text: صفر.",
            "term على نسخة الـ keyword: طابق.",
            "term بحرف كبير على keyword: صفر.",
            "bool: الاسم فيه لاسلكى، وفلتر بالقسم والسعر ≤ ١٢٠٠.",
            "match بغلطة إملائية مع fuzziness.",
            "aggregations: عدد ومتوسط سعر لكل قسم، وفئات أسعار.",
            "aggregation على text: error."
          ],
          sol: R`[[كيبرد]] من غير fuzziness: [[{"hits":{"total":{"value":0}}}]].

[[must_not]] على [[_id 4]]: الـ bool يرجّع [[2]] بس (الماوس).

[[terms]] على [[name.raw]] بترجع ٥ buckets، كل اسم بـ [[doc_count 1]]، بدل الـ error.

(اتجرّب على Elasticsearch 9.5.5 في Docker.)`,
          solCode: R`curl -s "localhost:9200/products/_search?filter_path=hits.total.value" -H "content-type: application/json" -d '{"query":{"match":{"name":"كيبرد"}}}'
curl -s "localhost:9200/products/_search?filter_path=hits.hits._id" -H "content-type: application/json" -d '{"query":{"bool":{"must":[{"match":{"name":"لاسلكى"}}],"filter":[{"term":{"category":"accessories"}},{"range":{"price":{"lte":1200}}}],"must_not":[{"term":{"_id":"4"}}]}}}'
curl -s "localhost:9200/products/_search?filter_path=aggregations.n.buckets" -H "content-type: application/json" -d '{"size":0,"aggs":{"n":{"terms":{"field":"name.raw"}}}}'`
        },
        {
          cmd: "مزامنة البحث من Postgres",
          title: "القاعدة هي المصدر، و trigger + relay بيوصّلوا كل تغيير للـ index",
          desc: R`الـ search index نسخة، والقاعدة هي المصدر (source of truth). الغلطة المشهورة: الكود يحفظ في Postgres وبعدين يبعت لـ Meilisearch في نفس الـ request، ولو التانية فشلت الاتنين اختلفوا للأبد، وأي حد بيعدّل من مكان تاني (سكريبت، أو أدمن) مش بيوصل.

الحل: trigger على الجدول بيكتب id الصف في جدول [[search_outbox]] في نفس الـ transaction، و relay بياخد دفعة، ويقرا الصفوف **الحالية**، ويبعت الموجود upsert والمش موجود delete، وبعدين يمسح الدفعة. ومن وقت للتاني reindex كامل في index جديد وتبدّل الاتنين (swap) من غير downtime.`,
          example: R`CREATE TABLE search_outbox (id bigserial PRIMARY KEY, product_id int NOT NULL);
CREATE FUNCTION enqueue_product() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO search_outbox (product_id) VALUES (COALESCE(NEW.id, OLD.id));
  RETURN NULL;
END $$;
CREATE TRIGGER products_search AFTER INSERT OR UPDATE OR DELETE ON products FOR EACH ROW EXECUTE FUNCTION enqueue_product();
INSERT INTO products VALUES (1, 'كيبورد ميكانيكال', 'سويتشات حمرا', 'accessories', 1500), (2, 'ماوس لاسلكي', 'بطارية شهرين', 'accessories', 400), (6, 'لوحة ماوس كبيرة', 'قماش', 'accessories', 250);
UPDATE products SET price = 1350 WHERE id = 1;
DELETE FROM products WHERE id = 2;
SELECT * FROM search_outbox;`,
          try: R`بعد درس Meilisearch: اعمل جدول [[products (id int PRIMARY KEY, name text NOT NULL, description text NOT NULL DEFAULT '', category text NOT NULL, price int NOT NULL)]]، ونفّذ المثال، وبعدين شغّل الـ relay اللي في الحل ([[sync.mjs]]) بـ [[DATABASE_URL]] و [[MEILI_KEY]]. المنتج ٢ لسه في Meilisearch؟ وسعر ١ كام؟ وبعدين شغّل [[reindex.mjs]] (في الحل) وشوف عدد الـ documents.`,
          flag: "script",
          deep: {
            why: "أي نسخة من الداتا (search index، أو cache، أو warehouse) بتختلف عن الأصل في الآخر لو بتتحدث من الكود بإيد. والفرق مبيبانش غير لما يوزر يلاقي منتج اتمسح من أسبوع لسه في نتايج البحث، أو سعر قديم. الـ trigger + relay بيضمنوا إن كل تغيير هيوصل، والـ reindex بيصلّح أي حاجة فلتت.",
            how: R`ليه trigger؟ بيشتغل على أي INSERT أو UPDATE أو DELETE من أي مكان (API، أو أدمن، أو migration)، وجوه نفس الـ transaction: لو التعديل اترجع، الصف في الـ outbox اترجع معاه. ده نفس فكرة الـ transactional outbox (درس [[transactional outbox]] في «Queues والأحداث»)، بس الحدث بيتكتب من القاعدة نفسها. والبديل اللي من غير trigger: CDC من الـ WAL (درس «CDC بـ logical decoding» في القسم اللي فات).

الـ trigger:
- [[RETURNS trigger LANGUAGE plpgsql]]: دالة PL/pgSQL من نوع trigger. و [[$$ ... $$]] بيحدد جسم الدالة (dollar quoting) عشان متحتاجش escape للـ [[']].
- [[NEW]] الصف بعد التعديل (فاضي في DELETE)، و [[OLD]] قبله (فاضي في INSERT). و [[COALESCE(NEW.id, OLD.id)]] أول قيمة مش NULL.
- [[AFTER ... FOR EACH ROW]]: بعد كل صف. و [[RETURN NULL]] مسموح في AFTER trigger (القيمة بتتجاهل).

الـ outbox فيه الـ **id بس**، مش الصف. الـ relay بيقرا الصف الحالي وقت المزامنة. فلو المنتج اتعدّل ٥ مرات، بيتبعت مرة بآخر حالة، ولو مش موجود بقى delete. ده بيحل مشكلة الترتيب كمان: مش مهم الأحداث وصلت بأنهي ترتيب، المهم الحالة دلوقتي.

الـ relay:
- [[FOR UPDATE SKIP LOCKED]]: لو فيه أكتر من relay، كل واحد ياخد دفعة مختلفة.
- [[new Set(...)]]: ids من غير تكرار. و [[= ANY($1)]] مع array (الـ driver بيحوّل الـ JS array لـ Postgres array).
- الـ upsert في Meilisearch بيبدّل الـ document كله، والـ delete بالـ ids.
- [[check(task)]]: لو الـ task فشلت ارمي error، فالـ transaction ترجع والدفعة تفضل في الـ outbox وتتعاد. وإعادة نفس الدفعة مفيهاش ضرر (upsert و delete idempotent).
- بنمسح من الـ outbox **بعد** ما Meilisearch يأكد.

شغّله في loop كل ثانية أو اتنين (أو اصحى بـ [[LISTEN/NOTIFY]]). والتأخير بين الحفظ وظهوره في البحث = مدة الـ loop + وقت الـ indexing: ثواني. ده eventual consistency، وفي صفحة المنتج نفسها اقرا من القاعدة.

الـ reindex الكامل: اعمل [[products_new]] بنفس الإعدادات، وحط فيه كل الصفوف من القاعدة، و [[swapIndexes]] بيبدّل الاسمين في عملية واحدة (البحث مبيقفش)، وامسح القديم. اعمله لما تغيّر شكل الـ document، أو كل فترة لتصليح أي drift.

في Elasticsearch نفس الفكرة: [[_bulk]] بدل addDocuments، و aliases بدل swap.`,
            when: "أي search index أو cache أو نسخة بتتبني من جداول. ولو مشروع صغير جدًا، ممكن تبعت للـ index من الكود بعد الـ commit + reindex ليلي، بس اعرف إن ده بيسيب فجوات.",
            mistakes: R`تحدّث الـ index جوه الـ transaction قبل الـ COMMIT (الـ transaction ممكن ترجع). تحدّث بعد الـ commit من غير retry. تحط الصف كله في الـ outbox فتبعت حالة قديمة لو الترتيب اتلخبط. تنسى الـ DELETE. تمسح من الـ outbox قبل ما تتأكد من الـ task. reindex في نفس الـ index القديم (البحث بيرجع نتايج ناقصة في النص). trigger تقيل (بيعمل HTTP أو استعلامات كبيرة) بيبطّأ كل كتابة.`
          },
          teach: R`## الـ trigger بيسجّل، والـ relay بيوصّل

المثال (SQL) بيعمل جدول [[search_outbox]] و trigger على [[products]]، وبعدين ٣ تعديلات ويبص في الـ outbox. والـ relay (في الحل) بيوصّل التغييرات لـ Meilisearch.

اتجرّب على PostgreSQL 16.13 و Meilisearch 1.56.0 في Docker، والـ relay بـ Node 24.22 و [[pg]] 8.23 و [[meilisearch]] 0.62.0. والـ index [[products]] كان فيه الـ ٥ منتجات من درس Meilisearch.

---

## ١. الـ outbox والـ trigger

~~~sql
CREATE TABLE search_outbox (id bigserial PRIMARY KEY, product_id int NOT NULL);
~~~

[[bigserial]] رقم بيزيد لوحده (الترتيب). و [[product_id]] المنتج اللي اتغير، والصف نفسه لأ.

~~~sql
CREATE FUNCTION enqueue_product() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO search_outbox (product_id) VALUES (COALESCE(NEW.id, OLD.id));
  RETURN NULL;
END $$;
~~~

- [[$$ ... $$]] بيحدد جسم الدالة كنص من غير ما تحتاج تعمل escape للـ [[']] جواه.
- في INSERT و UPDATE [[NEW.id]] موجود. في DELETE [[NEW]] فاضي، فـ [[COALESCE]] بياخد [[OLD.id]].

~~~sql
CREATE TRIGGER products_search AFTER INSERT OR UPDATE OR DELETE ON products FOR EACH ROW EXECUTE FUNCTION enqueue_product();
~~~

بعد أي تعديل على أي صف في [[products]]، نادي الدالة.

## ٢. التعديلات

~~~sql
INSERT INTO products VALUES (1, ...), (2, ...), (6, ...);
UPDATE products SET price = 1350 WHERE id = 1;
DELETE FROM products WHERE id = 2;
SELECT * FROM search_outbox;
~~~

~~~text الناتج
 id | product_id
----+------------
  1 |          1
  2 |          2
  3 |          6
  4 |          1
  5 |          2
(5 rows)
~~~

٥ تغييرات على ٣ منتجات: ١ اتضاف واتعدّل، و ٢ اتضاف واتمسح، و ٦ اتضاف.

## ٣. الـ relay (الحل)

~~~js
const { rows } = await client.query("SELECT id, product_id FROM search_outbox ORDER BY id LIMIT 500 FOR UPDATE SKIP LOCKED");
~~~

لحد ٥٠٠ تغيير، مقفولين على الـ relay ده لحد الـ COMMIT، وأي relay تاني بيعدّيهم.

~~~js
const ids = [...new Set(rows.map((r) => r.product_id))];
const { rows: products } = await client.query("SELECT id, name, description, category, price FROM products WHERE id = ANY($1)", [ids]);
const gone = ids.filter((id) => !products.some((p) => p.id === id));
~~~

- [[new Set(...)]] بيشيل التكرار، و [[[...set]]] يرجّعه array: [[[1, 2, 6]]].
- الصفوف الموجودة **دلوقتي**: ١ و ٦.
- [[gone]] = ids اتسجلت ومش موجودة = اتمسحت: [[[2]]].

~~~js
if (products.length) check(await index.addDocuments(products, { primaryKey: "id" }).waitTask());
if (gone.length) check(await index.deleteDocuments(gone).waitTask());
await client.query("DELETE FROM search_outbox WHERE id = ANY($1)", [rows.map((r) => r.id)]);
await client.query("COMMIT");
~~~

upsert للموجود، و delete للي راح، و [[check]] بيرمي error لو الـ task مش [[succeeded]]. وبعدها بس امسح الدفعة من الـ outbox.

~~~text الناتج
synced 5 changes: 2 upserted, 1 deleted
6:لوحة ماوس كبيرة:250 | 1:كيبورد ميكانيكال:1350 | 4:Mechanical Keyboard TKL:1900 | 3:سماعة بلوتوث:2200 | 5:شاشة ٢٧ بوصة:9000
~~~

- ٥ تغييرات بقوا ٣ عمليات: upsert لـ ١ و ٦، و delete لـ ٢.
- ١ بقى بالسعر الجديد ([[1350]])، والماوس اختفى.
- ٣ و ٤ و ٥ لسه موجودين: دول اتضافوا لـ Meilisearch مباشرة في الدرس اللي فات ومش في القاعدة خالص. ده بالظبط الـ drift.
- الـ loop [[while ((await syncOnce()) > 0);]] بيعيد لحد ما الـ outbox يفضى، والتشغيل التاني رجّع صفر وخلص.

## ٤. الـ reindex

[[reindex.mjs]] في الحل: index جديد بنفس الإعدادات، وكل الصفوف، و swap، ومسح القديم.

~~~text الناتج
swap succeeded
products now has 2 documents
~~~

٢ بس (١ و ٦): زي القاعدة بالظبط. المنتجات اللي كانت في الـ index من غير أصل اختفت.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| trigger | كل تعديل من أي مكان، في نفس الـ transaction |
| الـ outbox فيه الـ id بس | الـ relay يبعت الحالة الحالية، فالترتيب مش مهم |
| upsert للموجود، delete للمش موجود | الحالة تتطابق |
| امسح الدفعة بعد ما الـ task تنجح | لو فشلت تتعاد، والإعادة مفيهاش ضرر |
| reindex + swap | يصلّح أي drift من غير ما البحث يقف |`,
          lines: [
            "جدول outbox: id بيزيد، و id المنتج اللي اتغير.",
            "دالة trigger بلغة PL/pgSQL (الجسم بين $$).",
            "بداية الجسم.",
            "سجّل id المنتج (الجديد، ولو مسح يبقى القديم).",
            "AFTER trigger: القيمة اللي بترجع بتتجاهل.",
            "نهاية الجسم.",
            "شغّل الدالة بعد أي INSERT أو UPDATE أو DELETE لكل صف.",
            "ضيف ٣ منتجات.",
            "عدّل سعر.",
            "امسح منتج.",
            "شوف التغييرات المستنية."
          ],
          sol: R`المنتج ٢ اتمسح من Meilisearch، وسعر ١ بقى [[1350]]. الـ relay طبع [[synced 5 changes: 2 upserted, 1 deleted]]، والـ outbox بقى فاضي.

والـ reindex: [[swap succeeded]] و [[products now has 2 documents]]: أي document في الـ index مالوش صف في القاعدة اختفى.

(اتجرّب على PostgreSQL 16.13 و Meilisearch 1.56.0 في Docker و Node 24.22.)`,
          solCode: R`// sync.mjs: الـ relay
import pg from "pg";
import { Meilisearch } from "meilisearch";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const index = new Meilisearch({ host: "http://localhost:7700", apiKey: process.env.MEILI_KEY }).index("products");
const check = (task) => { if (task.status !== "succeeded") throw new Error("meilisearch task " + task.uid + " " + task.status); };

export async function syncOnce() {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("SELECT id, product_id FROM search_outbox ORDER BY id LIMIT 500 FOR UPDATE SKIP LOCKED");
    if (rows.length === 0) {
      await client.query("COMMIT");
      return 0;
    }
    const ids = [...new Set(rows.map((r) => r.product_id))];
    const { rows: products } = await client.query("SELECT id, name, description, category, price FROM products WHERE id = ANY($1)", [ids]);
    const gone = ids.filter((id) => !products.some((p) => p.id === id));
    if (products.length) check(await index.addDocuments(products, { primaryKey: "id" }).waitTask());
    if (gone.length) check(await index.deleteDocuments(gone).waitTask());
    await client.query("DELETE FROM search_outbox WHERE id = ANY($1)", [rows.map((r) => r.id)]);
    await client.query("COMMIT");
    console.log("synced", rows.length, "changes:", products.length, "upserted,", gone.length, "deleted");
    return rows.length;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

while ((await syncOnce()) > 0);
const r = await index.search("", { sort: ["price:asc"] });
console.log(r.hits.map((h) => h.id + ":" + h.name + ":" + h.price).join(" | "));
await db.end();

// reindex.mjs: index جديد من القاعدة، وبعدين swap
import pg from "pg";
import { Meilisearch } from "meilisearch";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = new Meilisearch({ host: "http://localhost:7700", apiKey: process.env.MEILI_KEY });
const settings = await client.index("products").getSettings();
await client.index("products_new").updateSettings(settings).waitTask();
const { rows } = await db.query("SELECT id, name, description, category, price FROM products ORDER BY id");
await client.index("products_new").addDocuments(rows, { primaryKey: "id" }).waitTask();
const swap = await client.swapIndexes([{ indexes: ["products", "products_new"] }]).waitTask();
console.log("swap", swap.status);
await client.deleteIndex("products_new").waitTask();
const stats = await client.index("products").getStats();
console.log("products now has", stats.numberOfDocuments, "documents");
await db.end();`
        },
        {
          cmd: "Postgres ولا search engine",
          title: "إمتى full-text في Postgres كفاية، وإمتى تضيف Meilisearch أو Elasticsearch",
          desc: R`ابدأ بـ Postgres: full-text search بـ [[tsvector]] و GIN، و [[pg_trgm]] للأخطاء الإملائية والبحث الجزئي (القسم «البحث: full-text و pg_trgm والعربي» في تاب «SQL و Prisma»). مفيش سيرفر زيادة، ولا مزامنة، والنتايج دايمًا محدّثة ومع الصلاحيات والـ JOINs.

ضيف محرك بحث لما تحتاج حاجة Postgres مش بيعملها كويس: typo tolerance وترتيب جاهز من غير ضبط، و facets سريعة على ملايين، و search-as-you-type تحت ٥٠ms، و synonyms ولغات كتير. وتمنه: سيرفر تاني، ومزامنة، و eventual consistency.`,
          example: R`SELECT reltuples::bigint AS approx_rows FROM pg_class WHERE relname = 'products';
EXPLAIN (ANALYZE, BUFFERS) SELECT id FROM products WHERE search @@ websearch_to_tsquery('simple', 'كيبورد') LIMIT 20;
SELECT round(100.0 * count(*) FILTER (WHERE results = 0) / count(*), 1) AS zero_pct FROM search_log WHERE at > now() - interval '7 days';`,
          try: R`على جدول منتجات فيه ١٠٠ ألف صف (اعمله بـ [[generate_series]])، اعمل عمود [[tsvector]] و GIN index (درس [[full-text search]] في تاب «SQL و Prisma») وقيس [[EXPLAIN ANALYZE]] لبحث بكلمة. وبعدين ابعت نفس الصفوف لـ Meilisearch وقيس [[processingTimeMs]] لنفس الكلمة وبغلطة فيها. اكتب: الفرق في الوقت يستاهل سيرفر ومزامنة؟`,
          flag: "script",
          deep: {
            why: "الخطأين المشهورين: Elasticsearch من أول يوم لموقع فيه ٢٠٠٠ منتج (سيرفر جاوا بيكل ذاكرة، ومزامنة، ومحدش فاهمه)، أو ILIKE على ١٠ مليون صف لحد ما الموقع يقع. القرار بالأرقام والمتطلبات، مش بالموضة.",
            how: R`| المتطلب | Postgres (tsvector + pg_trgm) | Meilisearch / Typesense | Elasticsearch / OpenSearch |
|---|---|---|---|
| تشغيل | موجود أصلًا | binary واحد، سهل | cluster، و JVM، و heap، وضبط |
| مزامنة | مفيش | لازم (outbox أو CDC) | لازم |
| typo tolerance | [[pg_trgm]] بـ [[similarity]] و [[%]]، محتاج ضبط | جاهز | [[fuzziness]] في الـ query |
| ترتيب بالأهمية | [[ts_rank]]، أساسي | جاهز وكويس للمنتجات | BM25 وقابل للتخصيص جدًا |
| facets و aggregations | [[GROUP BY]]، بطيء على نتايج كبيرة | facets جاهزة | aggregations قوية (histograms و percentiles...) |
| عربي | مفيش stemmer عربي مدمج (config [[simple]] + normalization بإيدك) | tokenizer و normalizer للعربي | [[arabic]] analyzer فيه stemmer |
| logs و observability | لأ | لأ | أيوه (ELK) |
| vector / hybrid search | [[pgvector]] | فيه (embedders) | فيه ([[dense_vector]] و kNN) |
| الصلاحيات و JOINs | كاملة | filters و tenant tokens | filters و document-level security (حسب الترخيص) |

علامات إنك محتاج محرك:
- البحث من غير نتايج عالي، واليوزرز بيغلطوا كتير (متجر، أسامي).
- search-as-you-type على ملايين الـ documents.
- facets كتير على نتايج كبيرة (متجر فيه ٢٠ فلتر).
- بحث في logs أو events بالحجم ده (Elasticsearch/OpenSearch، أو Loki للـ logs).

لو اخترت محرك:
- **Meilisearch أو Typesense**: بحث منتجات ومحتوى، فريق صغير، ونتايج كويسة من غير ضبط.
- **Elasticsearch أو OpenSearch**: analytics و aggregations، و logs، وضبط عميق للـ relevance، وحجم ضخم. OpenSearch fork مفتوح (Apache 2.0) من Elasticsearch 7.10 بتاع AWS، و Elasticsearch رجع فيه خيار AGPL من ٢٠٢٤ (من الـ docs بتوعهم).

والقاعدة: Postgres يفضل المصدر، والمحرك نسخة بتتبني منه (درس «مزامنة البحث من Postgres»).`,
            when: "قبل ما تضيف أي محرك بحث، وفي system design لما حد يرسم Elasticsearch: اسأل كام document، وكام بحث في الثانية، ومحتاجين إيه بالظبط.",
            mistakes: R`محرك بحث لـ ٥٠٠٠ صف. تقيس بـ ILIKE مش بـ tsvector و GIN وتحكم إن Postgres بطيء. تنسى تمن المزامنة والـ eventual consistency. تخلي المحرك هو المصدر (الداتا في Elasticsearch بس). تعرض نتايج البحث من غير ما تطبّق صلاحيات اليوزر.`
          },
          teach: R`## ٣ أسئلة بالأرقام قبل القرار

الأوامر بتجاوب: الجدول كبير قد إيه، والبحث الحالي بطيء ولا لأ، واليوزرز بيلاقوا اللي بيدوروا عليه ولا لأ. اتشغّلت على PostgreSQL 16.13 في Docker على جدول [[products]] فيه ١٠٠ ألف صف من [[generate_series]] (كل صف رقم ١٠٠ اسمه «كيبورد رقم ...» والباقي «منتج رقم ...»)، وعمود [[search]] نوعه [[tsvector]] بـ config [[simple]] وعليه GIN index. والجدول كان في schema لوحده اسمه [[bench]]، فالاستعلام الأول اتشغّل ومعاه [[AND relnamespace = 'bench'::regnamespace]]. والسطر التالت محتاج جدول [[search_log]] بتسجّل فيه كل بحث وعدد نتايجه (مش موجود افتراضيًا: لازم تعمله)، وجربناه على ٥ صفوف تجربة.

---

## ١. حجم الجدول

~~~sql
SELECT reltuples::bigint AS approx_rows FROM pg_class WHERE relname = 'products';
~~~

[[pg_class]] كتالوج فيه كل جدول و index، و [[reltuples]] عدد الصفوف التقريبي اللي [[ANALYZE]] حسبه (أسرع بكتير من [[count(*)]] على جدول كبير). و [[::bigint]] تحويل نوع.

~~~text الناتج
 approx_rows
-------------
      100000
~~~

## ٢. البحث بياخد قد إيه

~~~sql
EXPLAIN (ANALYZE, BUFFERS) SELECT id FROM products WHERE search @@ websearch_to_tsquery('simple', 'كيبورد') LIMIT 20;
~~~

[[ANALYZE]] بينفّذ فعلًا ويقيس، و [[BUFFERS]] بيقول كام صفحة اتقرت من الذاكرة ([[shared hit]]) أو الديسك ([[read]]). و [[simple]] config من غير stemming (مناسب للعربي في Postgres).

~~~text الناتج
 Limit  (cost=22.44..48.15 rows=20 width=4) (actual time=0.610..0.628 rows=20 loops=1)
   Buffers: shared hit=24
   ->  Bitmap Heap Scan on products  (cost=22.44..1333.59 rows=1020 width=4) (actual time=0.609..0.626 rows=20 loops=1)
         Recheck Cond: (search @@ '''كيبورد'''::tsquery)
         Heap Blocks: exact=20
         Buffers: shared hit=24
         ->  Bitmap Index Scan on products_search_idx  (cost=0.00..22.19 rows=1020 width=0) (actual time=0.522..0.522 rows=1000 loops=1)
               Index Cond: (search @@ '''كيبورد'''::tsquery)
               Buffers: shared hit=4
 Planning Time: 0.637 ms
 Execution Time: 0.686 ms
~~~

- [[Bitmap Index Scan on products_search_idx]]: استخدم الـ GIN index، ولقى [[rows=1000]] صف فيهم الكلمة.
- [[Limit]] وقف بعد ٢٠، فمقراش غير ٢٠ صف من الجدول ([[Heap Blocks: exact=20]]).
- [[shared hit=24]]: كل الصفحات كانت في الذاكرة.
- [[Execution Time: 0.686 ms]]: أقل من ملّي ثانية. السرعة مش هي المشكلة هنا.

وبغلطة إملائية ([[كيبرد]]): [[count(*)]] رجع [[0]]. الـ tsvector بيطابق كلمات، مش «قريب من».

نفس الـ ١٠٠ ألف صف في Meilisearch 1.56 (اتعملهم index في ١.٢ ثانية): [[كيبورد]] رجّعت ١٠٠٠ نتيجة في 1ms، و [[كيبرد]] كمان ١٠٠٠ في 1ms. الفرق في الـ typo tolerance، مش في السرعة.

## ٣. اليوزرز بيلاقوا؟

~~~sql
SELECT round(100.0 * count(*) FILTER (WHERE results = 0) / count(*), 1) AS zero_pct FROM search_log WHERE at > now() - interval '7 days';
~~~

- [[count(*) FILTER (WHERE ...)]]: عدّ الصفوف اللي بتحقق الشرط بس.
- [[100.0]] (مش [[100]]) عشان القسمة تبقى عشرية مش صحيحة.
- [[interval '7 days']]: آخر أسبوع.

~~~text الناتج (على ٥ عمليات بحث تجربة، ٢ منهم رجعوا صفر)
 zero_pct
----------
     40.0
~~~

النسبة دي هي اللي بتقول محتاج typo tolerance ولا لأ: لو ٢٠٪ من البحث بيرجع صفر وأغلبها كلمات مكتوبة غلط، ده سبب حقيقي لـ Meilisearch (أو [[pg_trgm]] الأول).

---

## الخلاصة

| لو | فـ |
|---|---|
| البحث سريع بالـ GIN، والـ zero results قليلة | خليك في Postgres |
| zero results عالية من أخطاء إملائية | جرّب [[pg_trgm]]، ولو مش كفاية Meilisearch |
| facets كتير وملايين documents و search-as-you-type | Meilisearch أو Typesense |
| aggregations تقيلة، أو logs، أو ضبط relevance عميق | Elasticsearch أو OpenSearch |

والمحرك دايمًا نسخة، والقاعدة المصدر.`,
          lines: [
            "كام صف في الجدول؟ (العدد التقريبي من كتالوج Postgres، أسرع من count).",
            "البحث الحالي بياخد قد إيه فعلًا؟ نفّذه وقيس الوقت والصفحات اللي اتقرت.",
            "اليوزرز بيلاقوا؟ نسبة عمليات البحث اللي رجعت صفر نتايج في آخر أسبوع (من جدول search_log بتاعك)."
          ],
          sol: R`الأرقام في تجربتنا (١٠٠ ألف صف و GIN): [[Execution Time: 0.686 ms]] في Postgres، و 1ms في Meilisearch. والفرق الحقيقي مش في السرعة: «كيبرد» (بغلطة) رجعت صفر في Postgres بـ tsvector، ولقت «كيبورد» في Meilisearch. فالسؤال الصح: «اليوزرز بيغلطوا؟» مش «Postgres بطيء؟».

(اتجرّب على PostgreSQL 16.13 و Meilisearch 1.56.0 في Docker.)`
        }
      ]
    }
]);
