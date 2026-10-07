// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "البحث: full-text و pg_trgm والعربي",
      l: 2,
      n: "خانة البحث اللي في كل موقع: بحث بالكلمات مترتب بالأهمية، وبحث بيستحمل الأخطاء الإملائية، وتطبيع العربي عشان «أحمد» تلاقي «احمد»",
      items: [
        {
          cmd: "full-text search",
          title: "بحث بالكلمات مترتب بالأهمية بدل ILIKE",
          desc: R`[[ILIKE '%docker run%']] بيدوّر على النص ده بالحرف، فـ «running docker» مش هتطلع، ومع جدول كبير بيقرا كل الصفوف. الـ full-text search بيفهم الكلمات: بيقطّع النص لكلمات، ويرجّع كل كلمة لأصلها (running و runs بيبقوا run)، ويشيل الكلمات اللي ملهاش معنى (the و a)، وبيرتب النتايج بالأهمية.

الأجزاء: [[tsvector]] النص بعد التقطيع (بيتخزن في عمود generated وعليه GIN index)، و [[tsquery]] كلام البحث، و [[@@]] بيقول «مطابق ولا لأ»، و [[ts_rank]] بيدّي درجة للترتيب.

و [[websearch_to_tsquery]] بياخد اللي اليوزر كتبه في خانة البحث زي ما هو، وبيفهم [["عبارة بالظبط"]] و [[-كلمة]] للاستبعاد و [[or]]، ومبيرميش error أبدًا مهما اليوزر كتب.`,
          example: R`CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
CREATE INDEX articles_search_idx ON articles USING gin (search);
INSERT INTO articles (title, body) VALUES
  ('Running Postgres in Docker', 'How to run a database container with volumes and backups'),
  ('Indexes explained', 'Why queries get slow and how a B-tree index helps when running reports'),
  ('Docker volumes', 'Keep your data when the container is removed');
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
SELECT to_tsvector('english', 'Running containers ran quickly');
SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');
SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;`,
          try: R`دوّر على [[running]] وعلى [[containers]]، وقارن النتيجة بـ [[ILIKE '%running%']]. وبعدين جرّب [[to_tsquery('english', 'docker run')]] (من غير websearch) وشوف بيحصل إيه، وجرّب [[websearch_to_tsquery('english', 'docker -backups')]].`,
          sol: R`[[running]] هترجع المقالتين الأولى والتانية، لأن البحث بقى [['run']] بعد الـ stemming، والأولى فيها Running و run، والتانية فيها running. أما [[ILIKE '%running%']] هترجع نفس الاتنين هنا بالصدفة، بس لو دوّرت بـ [[run]] الـ ILIKE هيجيب أي كلمة فيها run (زي runtime) و full-text مش هيجيبها. و [[containers]] هترجع الأولى والتالتة (container).

[[to_tsquery('english', 'docker run')]] هيطلع [[syntax error in tsquery: "docker run"]]، لأن to_tsquery محتاجة operators صريحة زي [['docker & run']]. عشان كده متحطش اللي اليوزر كتبه في to_tsquery أبدًا، استخدم websearch_to_tsquery أو plainto_tsquery.

و [[docker -backups]] هترجع المقالة التالتة بس (Docker volumes)، لأن الأولى فيها backups فاتشالت.

خد بالك من الحاجة الغريبة: [[ran]] مش بتبقى run، لأن الـ stemmer بيقطع نهايات الكلام بس، مبيعرفش الأفعال الشاذة.`,
          solCode: R`SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'running');
SELECT title FROM articles WHERE title ILIKE '%running%' OR body ILIKE '%running%';
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'containers');
SELECT to_tsquery('english', 'docker run');
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker -backups');`,
          flag: "script",
          deep: {
            why: "خانة البحث موجودة في كل منتج تقريبًا: منتجات، ومقالات، وتذاكر دعم. ILIKE مع % في الأول مبيستخدمش B-tree index، ومبيفهمش صيغ الكلمة، ومبيرتبش. والحل مش لازم يبقى Elasticsearch من أول يوم: Postgres فيه بحث كويس كفاية لأغلب المشاريع.",
            how: R`[[to_tsvector('english', text)]] بيقطّع ويعمل stemming ويشيل الـ stop words، وبيحفظ مكان كل كلمة: [['contain':2 'quick':4 'ran':3 'run':1]]. أول argument هو الـ configuration (اللغة)، ولازم يبقى نفسه في التخزين والبحث.

[[setweight(..., 'A')]] بيدّي كلمات العنوان وزن أعلى من كلمات الـ body، فـ ts_rank بيطلّع المقالة اللي الكلمة في عنوانها الأول. الأوزان A و B و C و D.

العمود [[GENERATED ... STORED]] بيحسب الـ tsvector مرة وقت الكتابة بدل كل بحث، و [[GIN]] index بيعمل «inverted index»: لكل كلمة، قايمة الصفوف اللي فيها. فالبحث بيروح للكلمة على طول. ومن غير العمود ده ممكن تعمل expression index على [[to_tsvector('english', title || ' ' || body)]]، بس لازم تكتب نفس التعبير بالظبط في كل WHERE.

[[websearch_to_tsquery]] للي اليوزر بيكتبه. [[plainto_tsquery]] بيعمل AND بين كل الكلمات. [[to_tsquery]] للي انت بتكتبه في الكود بـ operators: [[&]] و [[|]] و [[!]] و [[<->]] (ورا بعض) و [[:*]] (prefix: [['dock:*']] للـ autocomplete).

[[ts_rank]] بيحسب على الصفوف اللي طابقت بس، فهو مش بيستخدم index. عشان كده الفلترة بـ [[@@]] الأول (بالـ index) وبعدين الترتيب. و [[ts_headline]] بيطلّع جزء من النص والكلمات المطابقة جوه [[<b>]] للعرض (خد بالك: HTML، اعمله escape أو sanitize قبل ما تحطه في الصفحة).

الحدود: مفيش تسامح مع الأخطاء الإملائية (ده pg_trgm، الدرس الجاي)، والعربي محتاج شغل زيادة (نفس الدرس). ولو محتاج facets وتصحيح إملائي وsynonyms وملايين المستندات، ساعتها فكّر في Meilisearch أو Typesense أو Elasticsearch.`,
            when: "بحث في نصوص طويلة (مقالات، وأوصاف منتجات، وتذاكر)، ولما محتاج ترتيب بالأهمية. للأسماء القصيرة والأكواد والبحث اللي لازم يستحمل أخطاء إملائية، pg_trgm أنسب، وكتير من المشاريع بتستخدم الاتنين مع بعض.",
            mistakes: R`to_tsquery على كلام اليوزر فأي علامة غريبة تطلّع error 500. لغة مختلفة في التخزين والبحث ([['english']] هنا و [['simple']] هناك) فمفيش حاجة تطابق. تحسب to_tsvector جوه WHERE من غير index فكل بحث يقرا الجدول كله. الترتيب بـ ts_rank على مليون صف طابقوا. [[ts_headline]] بيطلع HTML وبتحطه في الصفحة من غير escape.`
          },
          teach: R`## الفكرة: النص بيتحوّل لقايمة كلمات، والبحث بيتحوّل لشرط عليها

الـ full-text search في Postgres ماشي على خطوتين: النص المتخزن بيتحوّل لـ [[tsvector]] (قايمة الكلمات بعد ما ترجع لأصلها)، وكلام البحث بيتحوّل لـ [[tsquery]] (الكلمات المطلوبة ومعاها AND و OR و NOT). و [[@@]] بيقول هل الاتنين بيتطابقوا. المثال بيبني جدول مقالات فيه كل ده، وبعدين بيوريك كل حتة لوحدها.

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

---

## ١. [[CREATE TABLE articles (...)]] وعمود [[search]]

~~~text الأمر
CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
~~~

أول ٣ أعمدة عادية. الرابع [[search]] هو المهم: نوعه [[tsvector]]، وهو generated column (الدرس اللي فات) بيتحسب لوحده من title و body. نفك المعادلة من جوه لبرة:

### الخطوة ١: [[to_tsvector('english', title)]]

بتاخد نص وترجّع tsvector. أول argument اسمه الـ **configuration**: قواعد أنهي لغة هتتطبق. جرّبها على عنوان المقالة الأولى:

~~~text SELECT to_tsvector('english', 'Running Postgres in Docker');
          to_tsvector
-------------------------------
 'docker':4 'postgr':2 'run':1
~~~

اللي حصل للنص:

| الكلمة | بقت | ليه |
|---|---|---|
| Running | [['run']] | **stemming**: شيل النهاية ([[ing]]) ورجّعها لأصلها |
| Postgres | [['postgr']] | نفس القاعدة: الـ stemmer شاف [[es]] كنهاية جمع وقصها، حتى لو مش كلمة إنجليزي حقيقية |
| in | اختفت | **stop word**: كلمة متكررة في كل نص ملهاش قيمة في البحث |
| Docker | [['docker']] | حروف صغيرة بس |

والرقم بعد [[:]] هو **مكان** الكلمة في النص الأصلي (in كانت رقم ٣، اتشالت بس الترقيم فضل). المكان ده بيستخدم في البحث عن كلمات ورا بعض.

### الخطوة ٢: [[setweight(..., 'A')]]

بتعلّم كل كلمة في الـ tsvector بوزن من ٤: [[A]] و [[B]] و [[C]] و [[D]] (A الأعلى):

~~~text SELECT setweight(to_tsvector('english', 'Running Postgres in Docker'), 'A');
            setweight
----------------------------------
 'docker':4A 'postgr':2A 'run':1A
~~~

كلمات العنوان بوزن A، وكلمات الـ body بوزن B. فالمقالة اللي الكلمة في **عنوانها** هتطلع أعلى في الترتيب.

### الخطوة ٣: [[||]]

مع الـ tsvector، [[||]] بيدمج الاتنين في tsvector واحد.

### الخطوة ٤: [[STORED]]

النتيجة بتتحسب مرة وقت INSERT أو UPDATE وتتخزن، بدل ما تتحسب مع كل بحث. ده شكل العمود بعد ما نضيف المقالات (الخطوة ٣ تحت):

~~~text SELECT id, search FROM articles ORDER BY id;
 id | search
----+------------------------------------------------------------------------------------
  1 | 'backup':14B 'contain':10B 'databas':9B 'docker':4A 'postgr':2A 'run':1A,7B 'volum':12B
  2 | 'b':11B 'b-tree':10B 'explain':2A 'get':5B 'help':14B 'index':1A,13B 'queri':4B 'report':17B 'run':16B 'slow':6B 'tree':12B
  3 | 'contain':8B 'data':5B 'docker':1A 'keep':3B 'remov':10B 'volum':2A
~~~

لاحظ [['run':1A,7B]] في المقالة الأولى: Running في العنوان (مكان ١، وزن A)، و run في الـ body (مكان ٧، وزن B). والترقيم بيكمل من العنوان للـ body. و [[B-tree]] اتقطعت ٣ حاجات: الكلمة كلها والحتتين.

---

## ٢. [[CREATE INDEX articles_search_idx ON articles USING gin (search);]]

[[USING gin]] نوع index غير الـ B-tree العادي. **GIN** = Generalized Inverted Index: بدل «لكل صف، الكلمات اللي فيه» (ده الـ tsvector)، بيخزن العكس: «لكل كلمة، الصفوف اللي فيها». فالبحث عن [['docker']] بيروح للكلمة على طول ويلاقي قايمة الصفوف [[1، 3]] من غير ما يلف على الجدول.

---

## ٣. [[INSERT INTO articles (title, body) VALUES ...]]

٣ مقالات. [[id]] و [[search]] مش مكتوبين: الأول بيتولد، والتاني بيتحسب.

~~~text الناتج
INSERT 0 3
~~~

---

## ٤. البحث نفسه

~~~text الأمر
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
~~~

### [[websearch_to_tsquery('english', 'docker run')]]

بتحوّل كلام اليوزر لـ tsquery، بنفس قواعد اللغة:

~~~text SELECT websearch_to_tsquery('english', 'docker run');
 websearch_to_tsquery
----------------------
 'docker' & 'run'
~~~

[[&]] = AND: الكلمتين لازم يبقوا موجودين. ولاحظ إن [[run]] عدّت على الـ stemmer هي كمان، عشان تطابق [['run']] اللي في الـ tsvector.

### [[FROM articles, websearch_to_tsquery(...) q]]

الدالة بترجّع قيمة واحدة، وكتابتها في FROM بفاصلة بتخليها «جدول من صف واحد» اسمه [[q]]. فائدتها إنك تستخدم [[q]] مرتين (في WHERE وفي ts_rank) من غير ما تكتب الدالة مرتين.

### [[WHERE search @@ q]]

[[@@]] = «الـ tsvector ده بيطابق الـ tsquery ده؟». ده الشرط اللي بيستخدم الـ GIN index. على ٣ صفوف Postgres بيفضّل يقراهم على طول، فعشان نشوف الخطة بالـ index قفلنا الـ Seq Scan مؤقتًا ([[SET enable_seqscan = off]]، للتجربة بس):

~~~text EXPLAIN SELECT id FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker run');
 Bitmap Heap Scan on articles
   Recheck Cond: (search @@ '''docker'' & ''run'''::tsquery)
   ->  Bitmap Index Scan on articles_search_idx
         Index Cond: (search @@ '''docker'' & ''run'''::tsquery)
~~~

### [[ts_rank(search, q) AS rank]] و [[ORDER BY rank DESC]]

[[ts_rank]] بيدّي كل صف مطابق درجة: قد إيه الكلمات موجودة، وبأنهي وزن. الأوزان الافتراضية: A = 1.0، و B = 0.4، و C = 0.2، و D = 0.1.

~~~text الناتج
 id |           title            |   rank
----+----------------------------+-----------
  1 | Running Postgres in Docker | 0.9898499
(1 row)
~~~

صف واحد بس، ليه؟ لأن الـ AND محتاج الكلمتين:

| المقالة | docker؟ | run؟ | النتيجة |
|---|---|---|---|
| ١ Running Postgres in Docker | أيوه (A) | أيوه (A و B) | طابقت |
| ٢ Indexes explained | لأ | أيوه (running) | لأ |
| ٣ Docker volumes | أيوه (A) | لأ | لأ |

والوزن بيبان لو الكلمة في عنوان مقالة وفي الـ body بتاع مقالة تانية. [[volumes]] في عنوان ٣ (وزن A) وفي الـ body بتاع ١ (وزن B):

~~~text نفس الاستعلام بكلمة 'volumes'
 id |           title            |    rank
----+----------------------------+------------
  3 | Docker volumes             |  0.6079271
  1 | Running Postgres in Docker | 0.24317084
~~~

نفس الكلمة مرة واحدة في الاتنين، بس ٠.٦٠٨ × ٠.٤ (وزن B) = ٠.٢٤٣. فالمقالة اللي الكلمة في عنوانها طلعت الأول.


---

## ٥. [[SELECT to_tsvector('english', 'Running containers ran quickly');]]

~~~text الناتج
              to_tsvector
---------------------------------------
 'contain':2 'quick':4 'ran':3 'run':1
~~~

running بقت run، و containers بقت contain، و quickly بقت quick. بس [[ran]] فضلت ran: الـ stemmer (اسمه Snowball) بيقص نهايات بقواعد ثابتة، مش قاموس، فميعرفش إن ran ماضي run. وقارنها بـ configuration اسمه [['simple']] (من غير stemming ولا stop words):

~~~text SELECT to_tsvector('simple', 'Running containers ran quickly');
 'containers':2 'quickly':4 'ran':3 'running':1
~~~

عشان كده الـ configuration لازم يبقى **نفسه** في التخزين وفي البحث: لو خزنت بـ english ودوّرت بـ simple، [['running']] مش هتلاقي [['run']].

---

## ٦. [[SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');]]

~~~text الناتج
            websearch_to_tsquery
--------------------------------------------
 'docker' <-> 'volum' & !'backup' | 'index'
~~~

| اللي اليوزر كتبه | بقى | معناه |
|---|---|---|
| [["docker volumes"]] بين علامتين | [['docker' <-> 'volum']] | [[<->]] = الكلمتين **ورا بعض** بالظبط (ده فايدة الأماكن في الـ tsvector) |
| [[-backup]] | [[!'backup']] | [[!]] = NOT، المقالة متكونش فيها الكلمة |
| [[or]] | الخط الرأسي اللي قبل [['index']] | OR |
| الباقي | [[&]] بينهم | AND |

يعني: (عبارة «docker volumes» ومن غير backup) **أو** index.

---

## ٧. [[SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;]]

[[ts_headline]] بتاخد النص الأصلي (مش الـ tsvector) والـ query، وترجّع النص والكلمات المطابقة معلّمة بـ [[<b>]]:

~~~text الناتج
 Why queries get <b>slow</b> and how a B-tree index helps when running <b>reports</b>
~~~

ده للعرض في صفحة النتايج. وده HTML، فلو النص نفسه جاي من يوزرز لازم يتعمله sanitize قبل ما يتحط في الصفحة.

---

## ٨. اللي بيحصل في الـ «جرّب»

~~~text الناتج
-- 'running'
           title
----------------------------
 Running Postgres in Docker
 Indexes explained

-- 'containers'
 Running Postgres in Docker
 Docker volumes

-- 'docker -backups'   →   'docker' & !'backup'
 Docker volumes

SELECT to_tsquery('english', 'docker run');
ERROR:  syntax error in tsquery: "docker run"
~~~

- [[containers]] بقت [['contain']]، فطابقت [[container]] المفرد في ١ و ٣.
- [[-backups]] اتعملها stemming لـ [['backup']]، فاستبعدت المقالة الأولى اللي فيها backups.
- [[to_tsquery]] محتاجة operators مكتوبة صريح ([['docker & run']])، فمسافة بين كلمتين = syntax error. عشان كده كلام اليوزر يروح لـ [[websearch_to_tsquery]] أو [[plainto_tsquery]] (اللي بيحط [[&]] بين كل الكلمات)، و [[to_tsquery]] للي انت بتكتبه في الكود، زي [[to_tsquery('english', 'dock:*')]] للـ prefix في الـ autocomplete.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[to_tsvector('english', نص)]] | نص ← كلمات بأصلها وأماكنها، من غير stop words |
| [[setweight(..., 'A')]] | وزن للكلمات (العنوان أعلى من الـ body) |
| عمود [[GENERATED ... STORED]] + [[gin]] index | يتحسب مرة، والبحث يروح للكلمة على طول |
| [[websearch_to_tsquery('english', كلام_اليوزر)]] | كلام البحث ← tsquery، ومبيرميش error |
| [[search @@ q]] | مطابق ولا لأ (بالـ index) |
| [[ts_rank(search, q)]] | درجة للترتيب، على الصفوف اللي طابقت بس |
| [[ts_headline(...)]] | النص والكلمات المطابقة جوه [[<b>]] |

- نفس الـ configuration ([['english']]) في التخزين والبحث، وإلا مفيش تطابق.
- الكلمات بتتطابق بأصلها: running = run، بس ran مش run.
- الكلمات في البحث بينها AND افتراضيًا.`,
          lines: [
            "جدول المقالات:",
            "رقم،",
            "عنوان،",
            "ومحتوى،",
            "وعمود البحث: tsvector بيتحسب لوحده،",
            "كلمات العنوان بوزن A وكلمات المحتوى بوزن B.",
            "وبيتخزن.",
            "قفلة.",
            "GIN index على عمود البحث.",
            "تلات مقالات:",
            "واحدة عن Docker و Postgres،",
            "وواحدة عن الـ indexes،",
            "وواحدة عن الـ volumes.",
            "المقالات ودرجة كل واحدة،",
            "والبحث جاي من كلام اليوزر زي ما هو،",
            "اللي طابقت بس (بالـ index)،",
            "والأهم الأول.",
            "شوف التقطيع: running بقت run، و ran فضلت ran، و quickly بقت quick.",
            "شوف بيفهم إيه: عبارة ورا بعض، واستبعاد، و or.",
            "جزء من النص والكلمات المطابقة معلّمة بـ <b>."
          ]
        },
        {
          cmd: "البحث بالعربي",
          title: "«أحمد» تلاقي «احمد»، و«محمد مصطفا» تلاقي «مُحَمَّد مصطفى»",
          desc: R`العربي فيه مشاكل الإنجليزي مفيهوش: نفس الاسم بيتكتب بـ «أحمد» و «احمد»، و «فاطمة» و «فاطمه»، و «مصطفى» و «مصطفي»، وممكن يكون فيه تشكيل أو تطويل (الـــقاهرة). لو قارنت النص زي ما هو، اليوزر اللي كتب «احمد» مش هيلاقي «أحمد».

الحل على خطوتين: تطبيع (normalization) للنص المتخزن ولكلام البحث بنفس الدالة: الهمزات كلها ا، والتاء المربوطة ه، والألف المقصورة ي، ومن غير تشكيل ولا تطويل. وبعدين للأخطاء الإملائية: extension [[pg_trgm]] بيقارن النصوص بالتشابه (similarity) بدل التطابق.

الدالة لازم تكون [[IMMUTABLE]] عشان تتحط في عمود generated وعليه index.`,
          example: R`CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
INSERT INTO teachers (name) VALUES ('أحمد إبراهيم'), ('مُحَمَّد مصطفى'), ('فاطمة الزهراء'), ('أسامة عبد الله');
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
SELECT name FROM teachers WHERE name LIKE '%احمد%';`,
          try: R`دوّر بـ [[اسامه]] (من غير همزة وبهاء) مرة بـ LIKE على name_norm ومرة بـ [[word_similarity]] و [[<%]]. وبعدين دوّر بغلطة إملائية زي [[ابراهم]] وشوف مين من الطريقتين لقاه. وآخر حاجة: اعمل 5000 مدرس بأسماء متولّدة ([[generate_series]])، وقارن [[EXPLAIN ANALYZE]] للبحث بـ LIKE على name_norm قبل وبعد الـ index.`,
          sol: R`[[اسامه]] بعد التطبيع بقت [[اسامه]]، و [[أسامة عبد الله]] اتخزنت [[اسامه عبد الله]]، فالـ LIKE هيلاقيها. و [[word_similarity(ar_normalize('اسامه'), name_norm)]] هيطلع [[1]] لأن الكلمة موجودة بالكامل جوه الاسم.

[[ابراهم]] (ناقصها ي): الـ LIKE مش هيلاقي حاجة لأن النص مش موجود بالحرف. أما [[ar_normalize('ابراهم') <% name_norm]] هيلاقي [[أحمد إبراهيم]] لأن أغلب الـ trigrams مشتركة. ده الفرق: التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء.

في EXPLAIN ANALYZE قبل الـ index هتلاقي [[Seq Scan on teachers]] ومعاها [[Rows Removed by Filter]] بالآلاف، وبعده [[Bitmap Index Scan on teachers_name_trgm]]. وخد بالك: pg_trgm محتاج ٣ حروف على الأقل في البحث عشان يستخدم الـ index بكفاءة، فالبحث بحرفين بيقرا كتير.`,
          solCode: R`SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;

SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;

DROP INDEX teachers_name_trgm;
INSERT INTO teachers (name) SELECT 'مدرس رقم ' || g FROM generate_series(1, 5000) g;
ANALYZE teachers;
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';`,
          flag: "script",
          deep: {
            why: "في منصة تعليمية، أو متجر، أو نظام موظفين مصري، أغلب البحث بأسماء عربي. اليوزر بيكتب بسرعة من الموبايل من غير همزات، أو بيغلط حرف. لو البحث مش بيستحمل ده، اليوزر هيقول «الاسم مش موجود» وهو موجود، وده بيبان للعميل كأنه bug.",
            how: R`التطبيع: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]] بيشيل التشكيل (الفتحة والضمة والكسرة والتنوين والشدة والسكون، من U+064B لـ U+0652) والتطويل (U+0640). و [[translate(نص, 'أإآٱةى', 'ااااهي')]] بيبدّل كل حرف من الأولى باللي قصاده في التانية بالترتيب، فعدد الحروف لازم يبقى متساوي والترتيب مظبوط. [[lower]] عشان لو فيه إنجليزي في الاسم.

القاعدة الذهبية: نفس الدالة على المتخزن وعلى كلام البحث. لو طبّعت واحد بس، مفيش حاجة هتطابق.

ليه ة تبقى ه مش العكس؟ الاتنين شغالين طالما ثابت. المهم إن «فاطمة» و «فاطمه» يبقوا نفس النص بعد التطبيع.

[[pg_trgm]] بيقطّع النص لـ trigrams (كل ٣ حروف ورا بعض)، و [[similarity(a, b)]] = نسبة الـ trigrams المشتركة من ٠ لـ ١. [[a % b]] معناها «التشابه أكبر من [[pg_trgm.similarity_threshold]]» (الافتراضي 0.3). و [[word_similarity(كلمة, نص)]] مع [[<%]] بيدوّر على الكلمة جوه نص أطول، وده الأنسب لما اليوزر يكتب جزء من الاسم.

الـ index [[gin (col gin_trgm_ops)]] بيخدم [[%]] و [[<%]] و [[LIKE '%x%']] و [[ILIKE]] كمان. يعني نفس الـ index بيحل مشكلة «LIKE بـ % في الأول مبيستخدمش index» من درس LIKE و ILIKE.

والـ full-text بالعربي: Postgres فيه configuration [[arabic]] بيعمل stemming ([[to_tsvector('arabic', 'المدرسون')]] بتطلع [['مدرس']])، وبيشيل الهمزات والتشكيل كمان، بس مش بنفس النتيجة لكل شكل للكلمة: «مصطفى» بتبقى [['مصطفي']] و «مصطفي» بتبقى [['مصطف']]، و «القاهرة» [['قاهر']] و «القاهره» [['قاهره']]، فمش بيطابقوا بعض. فلو محتاجه: [[to_tsvector('arabic', ar_normalize(body))]] في العمود الـ generated، ونفس الحاجة في البحث.

و Supabase فيه pg_trgm و unaccent جاهزين، فعّلهم من Database ← Extensions.`,
            when: "أي بحث بأسماء عربي (مدرسين، وطلاب، وعملاء، ومنتجات)، وأي بحث لازم يستحمل أخطاء إملائية أو autocomplete. للنصوص الطويلة: full-text على النص المتطبّع، ومعاه pg_trgm للأسماء.",
            mistakes: R`تطبّع المتخزن وتنسى تطبّع كلام البحث (أو العكس). [[translate]] بعدد حروف مختلف أو ترتيب غلط، فالتاء المربوطة تبقى ي (حصلت وانا بكتب الدرس ده). الدالة من غير IMMUTABLE فالعمود الـ generated يرفض. threshold عالي فمفيش نتايج، أو واطي فكل حاجة تطلع. بحث بحرف أو حرفين على trigram index. و ILIKE على name الأصلي وتفتكر إنه هيلاقي «احمد» جوه «أحمد».`
          },
          teach: R`## الفكرة: وحّد شكل الكتابة، وبعدين قارن بالتشابه

المثال بيحل مشكلتين مختلفتين بأداتين:

1. **نفس الاسم مكتوب بأشكال مختلفة** («أحمد» و «احمد»، «فاطمة» و «فاطمه»): دالة [[ar_normalize]] بتحوّل أي شكل لشكل واحد، وبتتطبق على المتخزن وعلى كلام البحث.
2. **غلطة إملائية** («مصطفا» بدل «مصطفى»): extension اسمه [[pg_trgm]] بيقيس **قد إيه** نصين شبه بعض بدل «متطابقين ولا لأ».

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

---

## ١. [[CREATE EXTENSION IF NOT EXISTS pg_trgm;]]

الـ **extension** إضافة رسمية بتيجي مع Postgres بس مش متفعّلة لوحدها. [[CREATE EXTENSION]] بيفعّلها في القاعدة دي، و [[IF NOT EXISTS]] بيخلي الأمر ميفشلش لو كانت متفعّلة قبل كده.

~~~text الناتج
CREATE EXTENSION
~~~

[[pg_trgm]] بيضيف دوال زي [[similarity]] و [[word_similarity]]، وعلامات زي [[%]] و [[<%]]، ونوع index اسمه [[gin_trgm_ops]]. هنشوفهم كلهم تحت.

---

## ٢. دالة التطبيع: [[ar_normalize]]

~~~text الأمر
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
~~~

### رأس الدالة

| الحتة | معناها |
|---|---|
| [[ar_normalize(t text) RETURNS text]] | نص داخل ونص خارج |
| [[LANGUAGE sql]] | استعلام واحد (درس CREATE FUNCTION) |
| [[IMMUTABLE]] | وعد: نفس المدخل بيرجّع نفس المخرج **دايمًا**، مش بس جوه استعلام واحد. ده شرط عشان الدالة تتحط في generated column أو index |
| [[PARALLEL SAFE]] | آمنة إن Postgres يشغّلها في كذا worker في نفس الوقت لو الاستعلام اتقسم. مش شرط، بس من غيرها Postgres مش هيقسم أي استعلام بيستخدمها |

### الجسم من جوه لبرة

السطر فيه ٣ دوال جوه بعض، والتنفيذ من جوه:

#### الخطوة ١: [[lower(t)]]

بتصغّر الحروف الإنجليزي بس. العربي ملوش كابيتال، فبيعدّي زي ما هو:

~~~text SELECT lower('Ahmed أحمد');
 ahmed أحمد
~~~

موجودة عشان لو الاسم فيه إنجليزي ([[Ahmed]] و [[ahmed]] يبقوا واحد).

#### الخطوة ٢: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]]

[[regexp_replace(نص, نمط, بديل, flags)]] بتدوّر على النمط وتبدّله. هنا البديل [['']] (نص فاضي)، يعني **امسح**. و [['g']] = global: امسح كل مرة تلاقيه، مش أول مرة بس.

والنمط [[[ً-ْـ]]]: القوسين المربعين [[[ ]]] في regex معناهم «أي حرف واحد من دول». وجواهم حاجتين:
- [[ً-ْ]]: **range** من حرف لحرف. أوله التنوين بالفتح وآخره السكون، ودول في Unicode ورا بعض: من U+064B لـ U+0652. يعني كل التشكيل: الفتحة والضمة والكسرة والتنوين والشدة والسكون.
- [[ـ]]: حرف التطويل (U+0640) اللي في «الـــقاهرة».

أرقامهم اتأكدنا منها بـ [[to_hex(ascii(...))]] (رقم الحرف بالـ hex):

~~~text SELECT to_hex(ascii('ً')), to_hex(ascii('ْ')), to_hex(ascii('ـ'));
 64b | 652 | 640
~~~

~~~text SELECT regexp_replace('مُحَمَّد الـــقاهرة', '[ً-ْـ]', '', 'g');
 محمد القاهرة
~~~

وليه ده مهم؟ التشكيل حروف حقيقية في النص، حتى لو عينك مش شايفاها كحروف:

~~~text SELECT length('مُحَمَّد'), length('محمد');
 8 | 4
~~~

«مُحَمَّد» ٨ حروف: ٤ حروف وفتحة وضمة وشدة وفتحة. فمقارنتها بـ «محمد» من غير تطبيع = نصين مختلفين.

#### الخطوة ٣: [[translate(..., 'أإآٱةى', 'ااااهي')]]

[[translate(نص, من, إلى)]] بتبدّل حرف بحرف: أول حرف في [[من]] بيتبدّل بأول حرف في [[إلى]]، والتاني بالتاني، وهكذا:

| من | إلى |
|---|---|
| أ | ا |
| إ | ا |
| آ | ا |
| ٱ (ألف وصل) | ا |
| ة | ه |
| ى | ي |

~~~text SELECT translate('أحمد إبراهيم مدرسة مصطفى', 'أإآٱةى', 'ااااهي');
 احمد ابراهيم مدرسه مصطفي
~~~

خد بالك: الربط **بالمكان**، فلو عدد الحروف مختلف، الحروف الزيادة في [[من]] بتتمسح بدل ما تتبدّل:

~~~text SELECT translate('abc', 'ab', 'x');
 xc
~~~

[[a]] بقت [[x]]، و [[b]] ملهاش مقابل فاتمسحت. ده نوع الغلط اللي بيطلّع «فاطم» بدل «فاطمه» من غير أي error.

~~~text الناتج
CREATE FUNCTION
~~~

---

## ٣. [[SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');]]

~~~text الناتج
             ar_normalize
---------------------------------------
 محمد احمد ابراهيم مدرسه مصطفي القاهره
~~~

التشكيل والتطويل راحوا، والهمزات بقت ا، والتاء المربوطة بقت ه، والألف المقصورة بقت ي. الشكل النهائي مش «صح إملائيًا»، وده مش مهم: هو للمقارنة بس، مش للعرض.

---

## ٤. جدول المدرسين: [[CREATE TABLE teachers (...)]]

~~~text الأمر
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
~~~

- [[name]]: الاسم زي ما اتكتب، ده اللي بيتعرض لليوزر.
- [[name_norm]]: generated column (درس generated columns) = [[ar_normalize(name)]]، بيتحسب لوحده مع كل INSERT و UPDATE. ده اللي بندوّر فيه. ومسموح هنا بس لأن الدالة [[IMMUTABLE]].

---

## ٥. [[CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);]]

- [[USING gin]]: نفس نوع الـ index بتاع الـ full-text (لكل حتة، الصفوف اللي فيها).
- [[gin_trgm_ops]]: الـ **operator class**، يعني «الـ index ده يقطّع النص trigrams». من غيره Postgres مش هيعرف يعمل GIN على text.

نفس الـ index ده بيخدم [[%]] و [[<%]] و [[LIKE '%...%']] و [[ILIKE]].

---

## ٦. [[INSERT INTO teachers (name) VALUES ...]]

٤ أسماء فيها همزات وتشكيل وتاء مربوطة وألف مقصورة. بعد الـ INSERT:

~~~text SELECT name, name_norm FROM teachers;
      name      |   name_norm
----------------+----------------
 أحمد إبراهيم   | احمد ابراهيم
 مُحَمَّد مصطفى     | محمد مصطفي
 فاطمة الزهراء  | فاطمه الزهراء
 أسامة عبد الله | اسامه عبد الله
~~~

(العمود بيبان مش مظبوط عند «مُحَمَّد» لأن psql بيحسب التشكيل حروف وهو بيرسم الجدول.)

---

## ٧. [[SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';]]

نفك الشرط:
- [[ar_normalize('فاطمه')]]: كلام البحث بيتطبّع **بنفس الدالة**، فبقى [[فاطمه]].
- [[||]] لزق نصوص، فالنمط النهائي [['%فاطمه%']]. و [[%]] في LIKE = أي حاجة (درس LIKE و ILIKE).
- الشرط على [[name_norm]]، والعرض من [[name]].

~~~text الناتج
     name
---------------
 فاطمة الزهراء
~~~

اليوزر كتب بالهاء، والمتخزن بالتاء، والاتنين بقوا [[فاطمه]] بعد التطبيع. والعرض بالاسم الأصلي.

---

## ٨. البحث بغلطة إملائية: [[similarity]] و [[%]]

~~~text الأمر
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
~~~

### يعني إيه trigram؟

[[pg_trgm]] بيقطّع النص لحتت كل واحدة **٣ حروف ورا بعض**، بعد ما يحط مسافتين قبل كل كلمة ومسافة بعدها. على كلمة إنجليزي عشان تبان:

~~~text SELECT show_trgm('cat');
 {"  c"," ca","at ",cat}
~~~

(مع العربي [[show_trgm]] بيعرض كل trigram كرقم hex، لأن الحروف العربي أكتر من byte فـ pg_trgm بيخزن الـ trigram كـ hash. الفكرة نفسها.)

### [[similarity(a, b)]]

= عدد الـ trigrams المشتركة ÷ عدد الـ trigrams في الاتنين من غير تكرار. من ٠ (مفيش أي حاجة مشتركة) لـ ١ (نفس النص). على أسمائنا:

~~~text similarity(name_norm, 'محمد مصطفا') لكل المدرسين
      name      | similarity
----------------+------------
 مُحَمَّد مصطفى     |  0.6666667
 أحمد إبراهيم   |        0.1
 فاطمة الزهراء  |          0
 أسامة عبد الله |          0
~~~

ليه ٠.٦٦٧؟ [['محمد مصطفي']] فيها ١٠ trigrams، و [['محمد مصطفا']] فيها ١٠، والمشترك ٨ (كله ماعدا الحتت اللي فيها آخر حرف). فـ ٨ ÷ (١٠ + ١٠ − ٨) = ٨ ÷ ١٢ = ٠.٦٦٧.

### [[a % b]]

= «[[similarity(a, b)]] أكبر من أو يساوي الحد». والحد اسمه [[pg_trgm.similarity_threshold]]:

~~~text SHOW pg_trgm.similarity_threshold;
 0.3
~~~

فالـ WHERE بتشيل أي حاجة تحت ٠.٣، وده اللي بيستخدم الـ index. والـ SELECT بيحسب الدرجة تاني للترتيب.

~~~text الناتج
    name    |   score
------------+-----------
 مُحَمَّد مصطفى | 0.6666667
(1 row)
~~~

لو كتبت [[=]] بدل [[%]] مكانش هيطلع حاجة، لأن «مصطفا» مش «مصطفي».

---

## ٩. [[SELECT name FROM teachers WHERE name LIKE '%احمد%';]]

نفس البحث على [[name]] الأصلي من غير تطبيع:

~~~text الناتج
 name
------
(0 rows)
~~~

المتخزن «أحمد» بهمزة، و LIKE بيقارن حرف بحرف. و [[ILIKE]] نفس النتيجة (اتجرّب: [[0 rows]])، لأنه بيتجاهل الكابيتال بس، والهمزة مش كابيتال.

---

## ١٠. اللي بيحصل في الـ «جرّب»

### «اسامه» بطريقتين

~~~text الناتج
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
      name
----------------
 أسامة عبد الله

SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;
      name      | score
----------------+-------
 أسامة عبد الله |     1
~~~

[[word_similarity(كلمة, نص)]] بتدوّر على أقرب **جزء** من النص الطويل للكلمة، بدل ما تقارن الكلمة بالاسم كله. «اسامه» موجودة كاملة جوه «اسامه عبد الله» فالدرجة ١. و [[<%]] هو الشرط بتاعها، وحده [[pg_trgm.word_similarity_threshold]] = ٠.٦ افتراضيًا (اتجرّب بـ [[SHOW]]).

### «ابراهم» (ناقصها ي)

~~~text الناتج
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
(0 rows)

SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;
     name
--------------
 أحمد إبراهيم
~~~

الدرجات نفسها:

~~~text SELECT word_similarity('ابراهم', 'احمد ابراهيم'), similarity('ابراهم', 'احمد ابراهيم');
 word_similarity | similarity
-----------------+------------
      0.71428573 | 0.35714287
~~~

[[similarity]] بيقارن بالاسم كله فالدرجة ٠.٣٦، و [[word_similarity]] بيقارن بأقرب كلمة فالدرجة ٠.٧١. عشان كده [[<%]] أنسب لما اليوزر بيكتب جزء من الاسم.

### الـ index قبل وبعد (على ٥٠٠٤ صف)

~~~text من غير الـ index
 Seq Scan on teachers  (actual time=0.010..0.537 rows=1.00 loops=1)
   Filter: (name_norm ~~ '%فاطمه%'::text)
   Rows Removed by Filter: 5003
 Execution Time: 0.547 ms
~~~

~~~text بالـ index
 Bitmap Heap Scan on teachers  (actual time=0.018..0.018 rows=1.00 loops=1)
   Recheck Cond: (name_norm ~~ '%فاطمه%'::text)
   ->  Bitmap Index Scan on teachers_name_trgm
         Index Cond: (name_norm ~~ '%فاطمه%'::text)
 Execution Time: 0.032 ms
~~~

- [[~~]] هو اسم LIKE جوه Postgres.
- من غير index: قرا الـ ٥٠٠٤ صف ورمى ٥٠٠٣ ([[Rows Removed by Filter]]).
- بالـ index: راح للصفوف اللي فيها نفس الـ trigrams على طول، والوقت نزل من ٠.٥٥ لـ ٠.٠٣ ملي ثانية. الفرق ده بيكبر مع حجم الجدول.
- [[Recheck Cond]]: الـ index بيرشّح صفوف «ممكن» تطابق، و Postgres بيتأكد من الشرط الحقيقي على كل واحد منهم.

---

## الخلاصة

| الأداة | بتحل إيه | مثال |
|---|---|---|
| [[ar_normalize]] على المتخزن والبحث | نفس الكلمة بأشكال كتابة مختلفة | «فاطمه» تلاقي «فاطمة» |
| [[similarity]] و [[%]] | غلطة إملائية في الاسم كله | «محمد مصطفا» تلاقي «مُحَمَّد مصطفى» |
| [[word_similarity]] و [[<%]] | جزء من الاسم، ولو فيه غلطة | «ابراهم» تلاقي «أحمد إبراهيم» |
| [[gin (... gin_trgm_ops)]] | السرعة | نفس الـ index للتلاتة وللـ LIKE |

- نفس دالة التطبيع على الاتنين: المتخزن (generated column) وكلام البحث.
- الدالة لازم [[IMMUTABLE]] عشان تتحط في generated column وعليها index.
- [[translate]] بيربط الحروف بالمكان: نفس العدد في الناحيتين.
- التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء، ومحتاج ٣ حروف على الأقل عشان يشتغل كويس.`,
          lines: [
            "فعّل extension الـ trigrams.",
            "دالة التطبيع: نص داخل ونص خارج،",
            "IMMUTABLE: نفس المدخل يرجّع نفس المخرج دايمًا (شرط الـ index).",
            "شيل التشكيل والتطويل، وبعدين بدّل الهمزات بـ ا، و ة بـ ه، و ى بـ ي.",
            "قفلة.",
            "جرّب: محمد احمد ابراهيم مدرسه مصطفي القاهره.",
            "جدول المدرسين:",
            "رقم،",
            "الاسم زي ما اتكتب (للعرض)،",
            "والاسم المتطبّع، بيتحسب لوحده.",
            "قفلة.",
            "trigram index على الاسم المتطبّع.",
            "٤ مدرسين بهمزات وتشكيل وتاء مربوطة.",
            "«فاطمه» بالهاء لقت «فاطمة» بالتاء، لأن الاتنين اتطبّعوا.",
            "بحث بغلطة إملائية: درجة التشابه،",
            "من المدرسين،",
            "اللي تشابههم فوق الحد (0.3 افتراضيًا)،",
            "الأقرب الأول.",
            "من غير تطبيع: مفيش نتيجة، لأن المتخزن «أحمد» بهمزة."
          ]
        }
      ]
    }
]);
