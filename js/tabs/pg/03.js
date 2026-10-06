// تكملة تاب pg: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pg/01.js (شرح حقول الدرس في أوله)
MORE("pg", [
    {
      t: "الإنتاج: باك أب و migrations و Supabase",
      l: 3,
      n: "الداتا أغلى من الكود. الباك أب اللي متجرّبش مش باك أب",
      items: [
        {
          cmd: "pg_dump بعمق",
          title: "schema بس، أو data بس، أو جدول",
          desc: "مش دايمًا محتاج القاعدة كلها. [[-s]] الهيكل بس، و [[-a]] البيانات بس، و [[-t]] جدول معين، و [[--exclude-table]] من غير جدول اللوجات الضخم. وصيغة [[-Fc]] بتسمح ترجّع أجزاء.",
          example: R`pg_dump -U postgres -d app -s > schema.sql
pg_dump -U postgres -d app -a -t users > users_data.sql
pg_dump -U postgres -d app -Fc --exclude-table='*_logs*' -f app.dump
pg_restore -l app.dump | head -20
pg_restore -U postgres -d app_copy -t users app.dump
pg_restore -U postgres -d app --clean --if-exists --no-owner app.dump`,
          try: "اعمل dump بـ -Fc، واعرض محتواه بـ [[pg_restore -l]]، ورجّع جدول واحد بس في قاعدة تجربة.",
          flag: "danger",
          deep: {
            why: "الباك أب الكامل مش دايمًا اللي محتاجه. عايز الهيكل بس لتجهيز قاعدة اختبار، أو جدول واحد اتمسح بالغلط، أو كل حاجة ما عدا جدول لوجات ٢٠ جيجا.",
            how: R`[[-s]] (schema-only) بيطلّع CREATE TABLE و indexes و constraints من غير بيانات. [[-a]] (data-only) العكس. [[-t]] جدول معين، وممكن تكرره أو تستخدم pattern. [[--exclude-table]] العكس.

الصيغتين: النص العادي ([[> file.sql]]) بتقراه وترجّعه بـ psql. [[-Fc]] (custom) ملف مضغوط بفهرس، وده الأقوى: [[pg_restore -l]] بيعرض الفهرس، و [[-t]] في pg_restore بيرجّع جدول واحد من dump كامل، و [[-j 4]] بيرجّع بأربع عمليات متوازية.

[[--clean --if-exists]] في pg_restore: امسح الجداول الموجودة الأول من غير error لو مش موجودة. لازمة لما ترجّع على قاعدة فيها بيانات.

[[--no-owner]]: متحاولش تخلي الجداول ملك نفس اليوزر اللي في المصدر. لازمة لما اليوزرز مختلفين بين السيرفرين (وده دايمًا مع Supabase).

pg_dump بياخد snapshot متماسك حتى لو القاعدة شغالة ومفيش قفل.`,
            when: "-s لبيئات الاختبار. -t لاسترجاع جدول. -Fc للباك أب الدوري.",
            mistakes: "نسخة pg_dump أقدم من السيرفر فيرفض. ونسيان --no-owner عند الترجيع على سيرفر تاني فيطلع errors صلاحيات."
          },
          teach: R`## الفكرة: [[pg_dump]] مش لازم ياخد القاعدة كلها

[[pg_dump]] (من PostgreSQL dump، يعني «فرّغ القاعدة في ملف») بيكتب القاعدة كأوامر تقدر تعيد بيها بناءها. والفلاجات اللي في الدرس بتختار **إيه بالظبط** يتكتب: الهيكل بس، أو البيانات بس، أو جدول واحد، أو كله ما عدا جدول. وبعدين [[pg_restore]] بيرجّع اللي انت عايزه من الملف.

كل الأوامر دي اتشغّلت جوه container [[postgres:16]] (النسخة 16.15) على قاعدة اسمها [[app]] فيها ٣ جداول:

~~~text القاعدة اللي جربنا عليها
users      5 صفوف    (id primary key، و email unique)
orders     5 صفوف    (user_id بيشاور على users.id)
app_logs   100000 صف  (لوجات، مش عايزينها في الباك أب)
~~~

والفلاجات المشتركة في كل الأوامر:

| الفلاج | معناه |
|---|---|
| [[-U postgres]] | اتصل كيوزر [[postgres]] (U من User) |
| [[-d app]] | القاعدة اسمها [[app]] (d من database) |

---

## ١. الهيكل بس: [[-s]]

~~~bash
pg_dump -U postgres -d app -s > schema.sql
~~~

[[-s]] اختصار [[--schema-only]]: اكتب أوامر إنشاء الجداول والـ sequences والـ constraints، من غير ولا صف بيانات. و [[>]] بيحوّل الناتج من الشاشة لملف [[schema.sql]].

لو بصيت جوه الملف:

~~~bash
grep -E "^CREATE|^ALTER TABLE" schema.sql
~~~

~~~text الناتج (أول سطور)
CREATE TABLE public.app_logs (
ALTER TABLE public.app_logs OWNER TO postgres;
CREATE SEQUENCE public.app_logs_id_seq
CREATE TABLE public.orders (
...
~~~

و [[grep -c "^COPY" schema.sql]] طلّع [[0]]: مفيش ولا أمر [[COPY]] (اللي بيحمل البيانات)، يعني فعلًا هيكل بس. ده اللي محتاجه عشان تبني قاعدة اختبار فاضية بنفس الشكل.

---

## ٢. بيانات جدول واحد: [[-a -t users]]

~~~bash
pg_dump -U postgres -d app -a -t users > users_data.sql
~~~

- [[-a]] اختصار [[--data-only]]: العكس، البيانات بس من غير [[CREATE TABLE]].
- [[-t users]] (t من table): الجدول ده بس. ينفع تكرره ([[-t users -t orders]]) أو تكتب pattern زي [[-t 'order*']].

الملف من جوه (من غير التعليقات):

~~~text users_data.sql
SET statement_timeout = 0;
SET lock_timeout = 0;
...
COPY public.users (id, email, name) FROM stdin;
1	sara@example.com	Sara
2	omar@example.com	Omar
3	mona@example.com	Mona
4	ali@example.com	Ali
5	hana@example.com	Hana
\.
SELECT pg_catalog.setval('public.users_id_seq', 5, true);
~~~

نقرا الملف:

| الجزء | معناه |
|---|---|
| سطور [[SET]] | إعدادات للجلسة اللي هترجّع الملف، زي «متعملش timeout» |
| [[COPY ... FROM stdin;]] | «الصفوف جاية في السطور اللي تحت»، كل عمود مفصول بـ Tab |
| [[\.]] | نهاية البيانات |
| [[setval(..., 5, true)]] | خلّي الـ sequence بتاع [[id]] يكمّل من بعد 5، عشان أول INSERT جديد ميطلعش [[id]] مكرر |

وفي أول الملف وآخره هتلاقي سطر [[\restrict]] و [[\unrestrict]] بكود عشوائي. دول اتضافوا في نسخ 16.10 وما بعدها كحماية: وهو بيرجّع الملف، psql بيرفض أوامر backslash تانية ممكن تكون اتدسّت في البيانات.

---

## ٣. صيغة custom ومن غير اللوجات: [[-Fc --exclude-table]]

~~~bash
pg_dump -U postgres -d app -Fc --exclude-table='*_logs*' -f app.dump
~~~

نفكّه حتة حتة:

### [[-Fc]]

[[-F]] من format، و [[c]] من custom. بدل SQL نص، بيكتب ملف **مضغوط** (gzip) فيه **فهرس** بكل حاجة جواه. أول ٥ بايت في الملف [[PGDMP]]، وده توقيع الصيغة. الفهرس ده هو اللي بيخلي [[pg_restore]] يرجّع حتة من الملف من غير الباقي.

### [[--exclude-table='*_logs*']]

«متاخدش أي جدول اسمه بيطابق الـ pattern». و [[*]] معناها «أي حروف». والعلامات [[' ']] عشان الـ shell ميحاولش يفسّر [[*]] كأسماء ملفات.

ليه [[*_logs*]] بنجمة في الآخر كمان؟ جرّبنا [[*_logs]] الأول، فالجدول [[app_logs]] اتشال، بس الـ sequence بتاعه [[app_logs_id_seq]] فضل في الملف لأن اسمه مش بينتهي بـ [[_logs]]. ولما رجّعنا الملف ده بـ [[--clean]] على [[app]] طلع:

~~~text الناتج مع '*_logs'
pg_restore: error: could not execute query: ERROR:  cannot drop sequence public.app_logs_id_seq because other objects depend on it
...
pg_restore: warning: errors ignored on restore: 2
~~~

بالنجمة التانية الـ pattern بيمسك الجدول والـ sequence بتاعه، والترجيع خلص من غير errors.

### [[-f app.dump]]

[[-f]] من file: اكتب في الملف ده. مع [[-Fc]] استخدم [[-f]] مش [[>]] (الاتنين بيشتغلوا، بس [[-f]] أوضح ومش بيعتمد على الـ shell).

الأحجام في التجربة:

~~~text ls -l
-rw-r--r-- 1 root root   5318 app.dump     من غير اللوجات
-rw-r--r-- 1 root root 456160 full.dump    القاعدة كلها
~~~

يعني الـ ١٠٠ ألف صف لوجات كانوا ٩٩٪ من حجم الباك أب.

---

## ٤. نقرا الفهرس: [[pg_restore -l]]

~~~bash
pg_restore -l app.dump | head -20
~~~

[[-l]] من list: اعرض اللي جوه الملف من غير ما ترجّع حاجة. و [[| head -20]] أول ٢٠ سطر بس. الناتج نوعين سطور:

~~~text الناتج (مختصر)
;     Format: CUSTOM
;     Dumped from database version: 16.15 (Debian 16.15-1.pgdg13+2)
;     Dumped by pg_dump version: 16.15 (Debian 16.15-1.pgdg13+2)
...
218; 1259 16397 TABLE public orders postgres
216; 1259 16386 TABLE public users postgres
3434; 0 16386 TABLE DATA public users postgres
3284; 2606 16393 CONSTRAINT public users users_pkey postgres
3289; 2606 16404 FK CONSTRAINT public orders orders_user_id_fkey postgres
~~~

- السطور اللي بتبدأ بـ [[;]] تعليقات: الصيغة، ونسخة السيرفر اللي اتعمل منه، ونسخة [[pg_dump]].
- كل سطر تاني «حاجة» في الملف: رقم في الفهرس، وأرقام داخلية، ونوعها ([[TABLE]] الجدول فاضي، و [[TABLE DATA]] صفوفه، و [[CONSTRAINT]] و [[FK CONSTRAINT]] و [[SEQUENCE]] و [[DEFAULT]])، والـ schema، والاسم، والمالك.

لاحظ إن الجدول وبياناته والـ primary key بتاعه **٣ سطور منفصلة**. ده مهم في الخطوة الجاية.

---

## ٥. جدول واحد من الملف: [[pg_restore -t]]

~~~bash
pg_restore -U postgres -d app_copy -t users app.dump
~~~

- [[-d app_copy]]: رجّع في القاعدة دي، ولازم تكون موجودة (عملناها الأول بـ [[createdb -U postgres app_copy]]).
- [[-t users]]: من الفهرس كله، خد اللي اسمه [[users]] بس.

النتيجة:

~~~text psql -d app_copy -c "SELECT count(*) FROM users" -c "\d users"
 count
-------
     5

               Table "public.users"
 Column |  Type   | Collation | Nullable | Default
--------+---------+-----------+----------+---------
 id     | integer |           | not null |
 email  | text    |           | not null |
 name   | text    |           |          |
~~~

الصفوف الخمسة رجعت، بس بص على [[\d users]]: مفيش [[Indexes:]] خالص (لا primary key ولا unique على email)، وعمود [[Default]] فاضي (الـ [[nextval]] بتاع الـ sequence مرجعش). ده لأن [[-t]] بيختار سطرين بس من الفهرس: [[TABLE]] و [[TABLE DATA]]، والباقي سطور تانية.

لو عايز الجدول بكل حاجته: [[pg_restore -l app.dump > list.txt]]، سيب سطور [[users]] بس، و [[pg_restore -L list.txt ...]]. و [[-L]] الكبيرة يعني «رجّع اللي في القايمة دي».

---

## ٦. ترجيع كامل فوق قاعدة شغالة: [[--clean --if-exists --no-owner]]

~~~bash
pg_restore -U postgres -d app --clean --if-exists --no-owner app.dump
~~~

| الفلاج | بيعمل إيه |
|---|---|
| [[--clean]] | قبل ما يعمل كل حاجة، يعمل لها [[DROP]] الأول |
| [[--if-exists]] | يكتب [[DROP ... IF EXISTS]]، فلو الحاجة مش موجودة ميطلعش error |
| [[--no-owner]] | متكتبش [[ALTER ... OWNER TO]]، فالجداول تبقى ملك اليوزر اللي بيرجّع |

جرّبناه على [[app]] نفسها (بالـ pattern الصح) والـ exit code كان [[0]] و [[\dt]] لسه فيه الـ ٣ جداول: [[users]] و [[orders]] اترجّعوا، و [[app_logs]] فضل زي ما هو لأنه مش في الملف أصلًا.

> ده أخطر سطر في الدرس: [[--clean]] بيمسح الجداول الموجودة. لو اسم القاعدة غلط، أو الملف قديم، البيانات اللي اتضافت بعده راحت. خد dump جديد قبلها.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| الهيكل بس | [[pg_dump -s]] |
| البيانات بس | [[pg_dump -a]] |
| جدول معين | [[-t اسم]] (في pg_dump و pg_restore) |
| كله ما عدا | [[--exclude-table='pattern']]، وخلّي الـ pattern يمسك الـ sequence كمان |
| ملف مضغوط بفهرس | [[-Fc -f ملف]] |
| تشوف جوه الملف | [[pg_restore -l]] |
| ترجّع فوق الموجود | [[--clean --if-exists --no-owner]] |

و [[pg_restore -t]] بيرجّع الجدول وصفوفه بس، من غير الـ keys والـ indexes والـ defaults.`,
          lines: [
            "الهيكل بس.",
            "بيانات جدول واحد بس.",
            "كل حاجة ما عدا جداول اللوجات، بصيغة مضغوطة.",
            "فهرس اللي جوه الـ dump.",
            "رجّع جدول واحد بس منه.",
            "خطر: رجّع كله فوق قاعدة فيها بيانات (بيمسح الموجود الأول)، ومتحاولش تطابق المالك. خد dump جديد قبلها."
          ],
          sol: R`[[pg_restore -l app.dump]] بيطبع الـ header ([[Format: CUSTOM]] و [[Dumped from database version: 16.15]]) وبعده قايمة فيها سطور زي [[TABLE public users postgres]] و [[TABLE DATA public users postgres]] و [[CONSTRAINT public users users_pkey postgres]] و [[FK CONSTRAINT public orders orders_user_id_fkey postgres]].

[[pg_restore -d app_copy -t users app.dump]] بيرجّع الجدول والداتا ([[SELECT count(*)]] زي الأصل). بس لو عملت [[\d users]] هتلاقي إن الجدول من غير primary key ولا unique ولا default للـ id، لأن [[-t]] بيرجّع الجدول وداتاه بس، مش الـ constraints والـ indexes والـ sequence. دي المفاجأة اللي لازم تعرفها قبل ما تحتاجها في طوارئ.

لو عايز كل حاجة تخص الجدول: [[pg_restore -l app.dump > list.txt]]، سيب السطور اللي فيها users وامسح الباقي، و [[pg_restore -L list.txt -d app_copy app.dump]]. وتذكّر إن [[app_copy]] لازم تبقى موجودة الأول بـ createdb.`,
          solCode: R`pg_dump -U postgres -d app -Fc -f app.dump
pg_restore -l app.dump | head -30
createdb -U postgres app_copy
pg_restore -U postgres -d app_copy -t users app.dump
psql -U postgres -d app_copy -c "SELECT count(*) FROM users" -c "\d users"`
        },
        {
          cmd: "ترجيع الباك أب",
          title: "جرّبه قبل ما تحتاجه",
          desc: R`باك أب عمرك ما رجّعته مش مضمون: ممكن يكون ناقص أو مكسور، وهتكتشف ده يوم ما تحتاجه. الاختبار: قاعدة جديدة فاضية، ترجّع فيها الباك أب، وتقارن بالأصل.

[[createdb -U postgres app_restore_test]] بيعمل قاعدة فاضية جديدة ([[-U]] اليوزر اللي بيتصل). [[pg_restore -d app_restore_test]] بيرجّع ملف الـ dump (المعمول بـ [[-Fc]]) جواها، و [[--no-owner]] بيتجاهل مين كان صاحب الجداول في الأصل، فميطلعش error لو اليوزر ده مش موجود هنا. بعدين [[psql -c]] بينفّذ استعلام واحد ويخرج: [[count(*)]] على جدول مهم في النسخة وفي الأصل، ولو الأرقام قريبة (بفرق الصفوف اللي اتضافت بعد الباك أب) يبقى سليم. و [[dropdb]] بيمسح قاعدة التجربة في الآخر.

خد بالك تكتب اسم قاعدة التجربة صح في [[dropdb]] و [[pg_restore]]: لو كتبت [[app]] بالغلط هتلمس قاعدة الإنتاج.`,
          example: R`createdb -U postgres app_restore_test
pg_restore -U postgres -d app_restore_test --no-owner app.dump
psql -U postgres -d app_restore_test -c "SELECT count(*) FROM users;"
psql -U postgres -d app -c "SELECT count(*) FROM users;"
dropdb -U postgres app_restore_test`,
          try: "حط الأوامر دي في سكربت يشتغل أسبوعيًا ويبعتلك رسالة لو الأعداد مختلفة.",
          deep: {
            why: "في يوم الكارثة مش وقت ما تكتشف إن الملف فاضي، أو النسخة مش متوافقة، أو الترجيع بياخد ٦ ساعات.",
            how: R`الاختبار بسيط: قاعدة جديدة فاضية، pg_restore فيها، وقارن. [[count(*)]] على أهم جدولين بين الأصل والنسخة. لو الأرقام متطابقة (بفارق الصفوف الجديدة من وقت الـ dump)، الباك أب سليم.

ده كمان بيقيس وقت الترجيع (RTO): لو أخد ساعة، تعرف إن الموقع هيقع ساعة في الكارثة، وتقرر ده مقبول ولا لأ.

الأتمتة: سكربت أسبوعي بيعمل الخطوات دي ويبعتلك النتيجة (أو بيفشل بصوت عالي في CI). ده اللي الفرق بين «عندي باك أب» و«عندي باك أب شغال».

وجرّب سيناريو استرجاع جدول واحد كمان، لأن ده الأشهر فعليًا: حد عمل DELETE من غير WHERE على جدول واحد.

الباك أب على نفس السيرفر مش باك أب: ديسك يبوظ أو اختراق والاتنين بيروحوا. نسخة على S3 أو Backblaze أو سيرفر تاني.`,
            when: "أسبوعيًا أوتوماتيك. وقبل أي عملية كبيرة على القاعدة.",
            mistakes: "تجرّب الترجيع على قاعدة الإنتاج نفسها بـ --clean."
          },
          teach: R`## الفكرة: ترجّع الباك أب في مكان فاضي وتعدّ

الاختبار ٥ أوامر: قاعدة فاضية جديدة، ترجّع فيها، تعدّ الصفوف فيها وفي الأصل، وتمسحها. كله اتشغّل جوه container [[postgres:16]] على قاعدة [[app]] فيها جدول [[users]] بـ ٥ صفوف، والملف [[app.dump]] معمول قبلها بـ [[pg_dump -Fc]] (شوف درس «pg_dump بعمق»).

---

## ١. قاعدة فاضية: [[createdb]]

~~~bash
createdb -U postgres app_restore_test
~~~

[[createdb]] برنامج صغير جاي مع Postgres، بيعمل نفس شغل [[CREATE DATABASE]]. و [[-U postgres]] يتصل كيوزر [[postgres]]. لو نجح مش بيطبع حاجة (exit code [[0]]). ولو القاعدة موجودة قبل كده:

~~~text الناتج لو الاسم موجود
createdb: error: database creation failed: ERROR:  database "app_restore_test" already exists
~~~

وده كويس: مستحيل [[createdb]] يكتب فوق قاعدة موجودة.

---

## ٢. الترجيع: [[pg_restore --no-owner]]

~~~bash
pg_restore -U postgres -d app_restore_test --no-owner app.dump
~~~

- [[-d app_restore_test]]: رجّع جوه القاعدة الفاضية دي (مش [[app]]!).
- [[--no-owner]]: الـ dump فيه سطور زي [[ALTER TABLE public.users OWNER TO postgres]]. على سيرفر تاني اليوزر ده ممكن ميبقاش موجود، فالفلاج ده بيتجاهل السطور دي والجداول تبقى ملك اللي بيرجّع.
- [[app.dump]]: الملف، وبيتكتب في الآخر من غير فلاج.

نجح من غير ما يطبع حاجة، و exit code [[0]].

---

## ٣ و ٤. العدّ في الاتنين: [[psql -c]]

~~~bash
psql -U postgres -d app_restore_test -c "SELECT count(*) FROM users;"
psql -U postgres -d app -c "SELECT count(*) FROM users;"
~~~

[[-c]] من command: نفّذ الاستعلام ده واخرج، من غير ما تفتح psql التفاعلي. و [[count(*)]] عدد الصفوف.

~~~text الناتج (الاتنين)
 count
-------
     5
(1 row)
~~~

[[5]] و [[5]]: الباك أب سليم. على موقع شغال الأصل ممكن يبقى أكبر بشوية (ناس سجّلت بعد الـ dump)، وده طبيعي. اللي مش طبيعي إن النسخة تبقى [[0]] أو أقل بكتير.

---

## ٥. التنضيف: [[dropdb]]

~~~bash
dropdb -U postgres app_restore_test
~~~

عكس [[createdb]]: بيمسح القاعدة كلها من غير ما يسأل. عشان كده الاسم في السطر ده بالذات لازم يتقري مرتين قبل Enter.

---

## الحل (solCode): نفس الخطوات كسكربت

### [[set -euo pipefail]]

- [[-e]]: أي أمر يفشل، السكربت يقف.
- [[-u]]: أي متغير مش متعرّف يبقى error بدل ما يتحسب فاضي.
- [[-o pipefail]]: لو أمر في نص [[|]] فشل، الـ pipe كله يفشل.

### [[DUMP=$(ls -1t ... | head -1)]]

[[$( )]] بيشغّل الأمر اللي جواه ويحط ناتجه في المتغير. [[ls -1t]]: اعرض الملفات واحد في السطر ([[-1]]) مترتبين بالأحدث الأول ([[-t]] من time)، و [[head -1]] خد الأول. يعني [[DUMP]] = أحدث باك أب.

### [[trap '...' EXIT]]

[[trap]] بيقول: «لما السكربت يخلص لأي سبب ([[EXIT]])، نفّذ ده». هنا [[dropdb --if-exists]]، فقاعدة الاختبار بتتمسح حتى لو السكربت وقع في النص. و [[--if-exists]] عشان لو وقع قبل [[createdb]] ميطلعش error.

### [[--exit-on-error]]

من غيره [[pg_restore]] بيكمّل بعد أي error وفي الآخر يقول [[errors ignored on restore]]. بيه، أول error يوقفه، و [[set -e]] يوقف السكربت.

### [[-tAc]]

[[-t]] من غير عناوين الأعمدة، و [[-A]] من غير محاذاة ومسافات، و [[-c]] الاستعلام. فالناتج رقم صافي زي [[5]] ينفع يتحط في متغير ويتقارن.

### [[if [ "$a" != "$b" ]; then]]

لو الرقمين مختلفين: ابعت رسالة Telegram بـ [[curl]] واخرج بـ [[exit 1]] (فشل). غير كده اطبع [[restore ok]].

شغّلنا السكربت فعلًا في الـ container بباك أب في [[/home/deploy/backups/db/app-2026-10-06.dump]]:

~~~text التشغيل الأول
restore ok: users 5 = 5
~~~

وبعدين ضفنا صف في [[app]] وشغّلناه تاني، فالأرقام بقت [[5]] و [[6]] ودخل الـ [[if]]. ومن غير ما نعرّف [[BOT_TOKEN]]:

~~~text التشغيل التاني
/tmp/restore-test.sh: line 11: BOT_TOKEN: unbound variable
~~~

ده شغل [[-u]]: السكربت وقف بفشل (exit code [[1]]) بدل ما يبعت لـ URL ناقص. وفي الحالتين [[psql -l]] بعدها ملقاش [[app_restore_test]]، يعني الـ [[trap]] مسحها. على السيرفر الحقيقي لازم [[BOT_TOKEN]] و [[CHAT_ID]] يبقوا متعرّفين في بيئة الـ cron.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| قاعدة فاضية | [[createdb اسم_تجربة]] |
| رجّع فيها | [[pg_restore -d اسم_تجربة --no-owner ملف]] |
| قارن | [[count(*)]] في الاتنين |
| نضّف | [[dropdb اسم_تجربة]] (وفي سكربت: [[trap]]) |

الباك أب اللي عمرك ما رجّعته مجرد ملف. والاختبار ده هو اللي بيحوّله باك أب.`,
          lines: [
            "قاعدة فاضية للاختبار.",
            "رجّع فيها.",
            "عدّ الصفوف في النسخة.",
            "وفي الأصل. لازم يطابقوا.",
            "امسح قاعدة الاختبار."
          ],
          sol: R`الحل سكربت بيعمل قاعدة مؤقتة، ويرجّع آخر dump، ويقارن العدد بالأصل، ويبعت رسالة لو مختلفين، ويمسح القاعدة المؤقتة في كل الحالات بـ [[trap]].

لما يشتغل وكله تمام يطبع [[restore ok: users 5 = 5]]. وأي فرق بسيط مقبول لو الموقع شغال والناس بتسجّل بين وقت الـ dump ووقت العد، فالمقارنة الأدق إنك تقارن بعدد متسجّل وقت الـ dump، أو تقبل فرق صغير.

الغلط الشائع: السكربت ينجح بس لأن [[pg_restore]] طبع errors وكمّل (مثلًا [[role "app_user" does not exist]]). عشان كده [[--exit-on-error]] و [[--no-owner]]، وبنقارن أعداد فعلية مش بنصدّق الـ exit code بس. وجدوله في cron الأسبوعي: [[0 4 * * 0 /home/deploy/restore-test.sh]].`,
          solCode: R`#!/usr/bin/env bash
set -euo pipefail
DUMP=$(ls -1t /home/deploy/backups/db/app-*.dump | head -1)
TMP=app_restore_test
trap 'dropdb -U postgres --if-exists "$TMP"' EXIT
createdb -U postgres "$TMP"
pg_restore -U postgres -d "$TMP" --no-owner --exit-on-error "$DUMP"
a=$(psql -U postgres -d "$TMP" -tAc "SELECT count(*) FROM users")
b=$(psql -U postgres -d app -tAc "SELECT count(*) FROM users")
if [ "$a" != "$b" ]; then
  curl -fsS -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d chat_id="$CHAT_ID" -d text="restore test: users $a != $b ($DUMP)"
  exit 1
fi
echo "restore ok: users $a = $b"`
        },
        {
          cmd: "سكربت migrations",
          title: "كل ملفات الـ migration بالترتيب ومرة واحدة بس",
          desc: R`من غير Prisma ولا أداة: سكربت بيلف على [[db/migrations/*.sql]] بالترتيب، ويسجّل كل ملف اتطبق في جدول [[schema_migrations]]، فيعدّي اللي اتطبق قبل كده. وكل ملف في transaction واحدة مع تسجيله، فلو فشل مفيش نص ملف.

و [[ON_ERROR_STOP]] مع [[set -e]] بيوقفوا عند أول فشل.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
: "$__{DATABASE_URL:?DATABASE_URL missing}"
PSQL=(psql "$DATABASE_URL" -X -q -v ON_ERROR_STOP=1)
"$__{PSQL[@]}" -c "CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())"
applied=0; skipped=0
for f in db/migrations/*.sql; do
  name=$(basename "$f")
  if [ -n "$("$__{PSQL[@]}" -tAc "SELECT 1 FROM schema_migrations WHERE name = '$name'")" ]; then
    skipped=$((skipped+1)); continue
  fi
  echo "--> $name"
  { cat "$f"; echo; echo "INSERT INTO schema_migrations (name) VALUES ('$name');"; } \
    | "$__{PSQL[@]}" --single-transaction -f -
  applied=$((applied+1))
done
echo "applied: $applied  skipped: $skipped"`,
          try: "في الـ lab اعمل ٣ ملفات [[001_]] و [[002_]] و [[003_]]، وشغّل السكربت مرتين: التانية كله skipped. بعدين حط error في ملف رابع وشوف إن الجدول بتاعه متعملش وإن اسمه مش في schema_migrations.",
          flag: "script",
          deep: {
            why: "النسخ واللصق في SQL editor ملف ملف بيتنسي فيه ملف، أو يتطبق مرتين، ومحدش عارف القاعدة دي عليها أنهي نسخة. السكربت بيخلي الإجابة في جدول.",
            how: R`[[: "$__{DATABASE_URL:?...}"]] بيوقف السكربت برسالة لو المتغير مش موجود. و [[PSQL=(...)]] array فيها الأمر بخياراته، و [[-X]] بيتجاهل [[~/.psqlrc]] عشان إعداداتك الشخصية متأثرش على السكربت.

الجدول [[schema_migrations]] فيه اسم كل ملف اتطبق ووقته. [[-tAc]] بيسأل «الملف ده اتطبق؟»؛ لو رجع 1 نعدّيه.

السطر اللي بين [[{ }]] بيبعت لـ psql الملف نفسه وبعده سطر INSERT باسمه، و [[-f -]] بيقرا من stdin. [[--single-transaction]] بيلف الاتنين في BEGIN و COMMIT: يا الملف كله والتسجيل، يا ولا حاجة.

الترتيب من الـ glob أبجدي، عشان كده الأسماء بأرقام بطول ثابت ([[001_]] مش [[1_]]، وإلا [[10_]] تيجي قبل [[2_]]).

استثناء: [[CREATE INDEX CONCURRENTLY]] مينفعش جوه transaction، فملف زي ده محتاج يتشغّل لوحده من غير [[--single-transaction]].`,
            when: "مشروع بـ SQL خام من غير ORM، أو Supabase من غير CLI، أو Makefile فيه [[make migrate]].",
            mistakes: "في مشروع حقيقي سكربت migrations كان بيبعت SQL لـ [[/rest/v1/rpc/exec]] بمفتاح service_role: الدالة دي مش موجودة في Supabase أصلًا، ولو حد عملها يبقى فتح تنفيذ أي SQL من REST لأي حد معاه المفتاح. وفي نفس المشروع مكانش فيه جدول بيسجّل اللي اتطبق، فملف ممكن يتطبق مرتين، والـ connection string اتقري بـ [[read]] من غير [[-s]] فالباسورد ظهر على الشاشة. وفي مشروع تاني لوب الـ migrations كان من غير transaction، فملف فشل في النص ساب نصه متطبق."
          },
          teach: R`## الفكرة: جدول بيفتكر إيه اللي اتطبق

عندك فولدر [[db/migrations/]] فيه ملفات SQL مرقّمة، كل ملف تغيير في الـ schema. السكربت بيلف عليهم بالترتيب، ولكل ملف يسأل جدول اسمه [[schema_migrations]]: «اتطبق قبل كده؟». لو لأ، يطبّقه ويسجّل اسمه في نفس الـ transaction.

السكربت اتشغّل فعلًا بـ bash جوه container [[postgres:16]]، على قاعدة فاضية اسمها [[lab]]، وفي الفولدر ٣ ملفات:

~~~text db/migrations/
001_a.sql        CREATE TABLE a (id int);
002_b.sql        CREATE TABLE b (id int);
003_a_name.sql   ALTER TABLE a ADD COLUMN name text;
~~~

---

## السطر ١: [[#!/usr/bin/env bash]]

اسمه shebang: أول سطر بيقول للنظام يشغّل الملف بأنهي برنامج. [[/usr/bin/env bash]] يعني «دوّر على bash في الـ PATH وشغّل بيه».

## السطر ٢: [[set -euo pipefail]]

| الحتة | معناها |
|---|---|
| [[-e]] | أي أمر يفشل يوقف السكربت |
| [[-u]] | متغير مش متعرّف = error |
| [[-o pipefail]] | لو أي أمر في [[|]] فشل، الـ pipe كله فشل |

---

## السطر ٣: [[: "$__{DATABASE_URL:?DATABASE_URL missing}"]]

من جوه لبرة:

- [[$__{DATABASE_URL}]]: قيمة المتغير.
- [[:?رسالة]]: لو المتغير مش موجود أو فاضي، اطبع الرسالة ووقّف السكربت.
- [[:]] في أول السطر: أمر bash «مبيعملش حاجة». احنا محتاجينه بس عشان bash يحسب الـ [[$__{...}]] اللي بعده.

شغّلناه من غير المتغير:

~~~text الناتج
/tmp/migrate.sh: line 3: DATABASE_URL: DATABASE_URL missing
~~~

وبعدين عرّفناه: [[export DATABASE_URL=postgres://postgres@localhost/lab]].

---

## السطر ٤: [[PSQL=(psql "$DATABASE_URL" -X -q -v ON_ERROR_STOP=1)]]

[[( )]] بعد [[=]] بتعمل **array** في bash: قايمة كلمات. احنا بنحط فيها أمر psql بخياراته مرة واحدة عشان منكررهوش:

| الحتة | معناها |
|---|---|
| [[-X]] | متقراش [[~/.psqlrc]]، عشان إعداداتك الشخصية متغيّرش سلوك السكربت |
| [[-q]] | quiet: متطبعش [[CREATE TABLE]] و [[INSERT 0 1]] بعد كل أمر |
| [[-v ON_ERROR_STOP=1]] | أول error في SQL يوقف psql ويطلع بـ exit code [[3]] (من غيره بيكمّل للسطر اللي بعده) |

وبنستخدمها كده: [[$__{PSQL[@]}]]. و [[@]] بين القوسين المربعين معناها «كل عناصر الـ array»، والعلامات [[" "]] حواليها بتخلي كل عنصر يفضل كلمة لوحده حتى لو فيه مسافات.

## السطر ٥: جدول السجل

~~~sql
CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())
~~~

[[IF NOT EXISTS]] عشان التشغيل التاني ميفشلش. عمودين: [[name]] اسم الملف (و [[PRIMARY KEY]] بيمنع نفس الاسم يتسجّل مرتين)، و [[applied_at]] وقت التطبيق، بيتملى لوحده بـ [[now()]].

## السطر ٦: [[applied=0; skipped=0]]

عدادين، و [[;]] بتفصل أمرين في سطر واحد.

---

## اللوب: السطور ٧ لـ ١٦

### [[for f in db/migrations/*.sql; do]]

[[*.sql]] اسمها glob: bash بيحوّلها لكل الملفات اللي بتنتهي بـ [[.sql]]، **مترتبة أبجديًا**. عشان كده الأرقام بطول ثابت: [[001_]] و [[002_]] و [[010_]]. لو كتبت [[1_]] و [[2_]] و [[10_]]، الترتيب الأبجدي هيحط [[10_]] قبل [[2_]].

### [[name=$(basename "$f")]]

[[basename]] بيشيل الفولدر من المسار: [[db/migrations/001_a.sql]] تبقى [[001_a.sql]]. ده اللي بيتسجّل.

### الشرط: اتطبق قبل كده؟

~~~bash
if [ -n "$("$__{PSQL[@]}" -tAc "SELECT 1 FROM schema_migrations WHERE name = '$name'")" ]; then
~~~

من جوه لبرة:

1. [[-tAc "SELECT 1 ..."]]: لو الاسم موجود يطبع [[1]]، ولو مش موجود ميطبعش حاجة. ([[-t]] من غير عناوين، و [[-A]] من غير مسافات.)
2. [[$( )]] بياخد الناتج ده كنص.
3. القوسين [ ] أمر اختبار في bash، و [[-n]] جواهم يعني «النص ده مش فاضي؟».

جرّبناها: للاسم [[001_a.sql]] بعد ما اتطبق رجّعت [[1]]، ولاسم مش موجود رجّعت نص فاضي.

### [[skipped=$((skipped+1)); continue]]

[[$(( ))]] حساب أرقام في bash. و [[continue]] «سيب باقي اللفة دي وروح للملف اللي بعده».

### قلب السكربت: الملف + تسجيله في transaction واحدة

~~~bash
{ cat "$f"; echo; echo "INSERT INTO schema_migrations (name) VALUES ('$name');"; } \
  | "$__{PSQL[@]}" --single-transaction -f -
~~~

- [[{ ...; }]] بتجمع كذا أمر وناتجهم كله يطلع كأنه أمر واحد: محتوى الملف ([[cat]])، وسطر فاضي ([[echo]]) عشان لو آخر سطر في الملف مفيهوش newline، وسطر الـ [[INSERT]].
- [[\]] في آخر السطر: الأمر مكمّل في السطر اللي تحت.
- [[| ... -f -]]: [[-f]] يعني «اقرا SQL من ملف»، و [[-]] يعني الملف هو اللي داخل من الـ pipe.
- [[--single-transaction]]: psql بيحط [[BEGIN]] قبل كل ده و [[COMMIT]] بعده. يا الملف وتسجيله ينجحوا مع بعض، يا ولا واحد فيهم.

---

## التشغيل الحقيقي

أول مرة:

~~~text الناتج
--> 001_a.sql
--> 002_b.sql
--> 003_a_name.sql
applied: 3  skipped: 0
~~~

تاني مرة:

~~~text الناتج
NOTICE:  relation "schema_migrations" already exists, skipping
applied: 0  skipped: 3
~~~

الـ [[NOTICE]] جاية من [[IF NOT EXISTS]]، معلومة مش error.

### ملف فيه غلط

ضفنا [[004_bad.sql]] فيه سطرين: [[CREATE TABLE d (id int);]] وبعده [[SELECT * FROM nope;]] (جدول مش موجود):

~~~text الناتج
--> 004_bad.sql
psql:<stdin>:2: ERROR:  relation "nope" does not exist
LINE 1: SELECT * FROM nope;
                      ^
exit=3
~~~

- [[psql:<stdin>:2]]: الغلط في السطر ٢ من اللي دخل من الـ pipe.
- [[exit=3]]: ده رقم [[ON_ERROR_STOP]]، و [[pipefail]] و [[-e]] وقفوا السكربت.

وبعدها:

~~~text SELECT name, applied_at FROM schema_migrations
      name      |          applied_at
----------------+-------------------------------
 001_a.sql      | 2026-10-06 13:39:50.471556+00
 002_b.sql      | 2026-10-06 13:39:50.549345+00
 003_a_name.sql | 2026-10-06 13:39:50.638578+00
~~~

و [[SELECT to_regclass('d')]] رجّع فاضي ([[NULL]]): الجدول [[d]] **متعملش** رغم إن سطره كان قبل الغلط. [[--single-transaction]] رجّع كل حاجة. تصلّح الملف وتشغّل السكربت تاني، فيطبّق [[004]] بس.

---

## الخلاصة

| الحتة | بتضمن إيه |
|---|---|
| [[schema_migrations]] | كل ملف يتطبق مرة واحدة بس |
| أسماء بأرقام بطول ثابت | الترتيب صح |
| [[ON_ERROR_STOP=1]] + [[set -e]] | أول غلط يوقف كل حاجة |
| [[--single-transaction]] | مفيش نص ملف متطبق |

واستثناء واحد: [[CREATE INDEX CONCURRENTLY]] مينفعش جوه transaction، فملف زي ده يتشغّل لوحده من غير [[--single-transaction]].`,
          lines: [
            "أي فشل يوقف السكربت.",
            "لازم DATABASE_URL يبقى موجود.",
            "أمر psql بخياراته مرة واحدة: وقف عند أول error، ومن غير psqlrc.",
            "جدول بيسجّل الملفات اللي اتطبقت (لو مش موجود).",
            "عدادات.",
            "لف على الملفات بالترتيب الأبجدي.",
            "اسم الملف من غير الفولدر.",
            "الملف ده اتطبق قبل كده؟",
            "عدّيه.",
            "نهاية الشرط.",
            "اطبع اسم الملف.",
            "الملف وبعده تسجيله في الجدول...",
            "...في transaction واحدة: الاتنين أو ولا حاجة.",
            "عدّ.",
            "نهاية اللوب.",
            "الملخص."
          ],
          sol: R`أول تشغيل بـ ٣ ملفات:

[[--> 001_a.sql]] و [[--> 002_b.sql]] و [[--> 003_a_name.sql]] وبعدين [[applied: 3  skipped: 0]]. التشغيل التاني: [[applied: 0  skipped: 3]] (ومعاه [[NOTICE: relation "schema_migrations" already exists, skipping]] ودي عادي).

بملف رابع فيه [[CREATE TABLE d]] وبعده [[SELECT * FROM nope]]: الناتج [[--> 004_bad.sql]] و [[ERROR:  relation "nope" does not exist]] والسكربت بيقف بـ exit code 3. و [[SELECT name FROM schema_migrations]] لسه فيه الـ ٣ بس، و [[SELECT to_regclass('d')]] بيرجّع فاضي (NULL)، يعني الجدول d متعملش رغم إنه قبل السطر الغلط. دا شغل [[--single-transaction]]: الملف والـ INSERT في schema_migrations يا ينجحوا مع بعض يا لأ.

لو لقيت الجدول d موجود، يبقى شلت [[--single-transaction]]. ولو لقيت 004 في schema_migrations، يبقى شلت [[ON_ERROR_STOP]] فـ psql كمّل بعد الـ error.`
        },
        {
          cmd: "Prisma migrate",
          title: "الـ schema بيتغير بأمان",
          desc: "الـ migrations ملفات SQL مرقّمة بتتطبق بالترتيب، وPrisma بيسجّل في جدول [[_prisma_migrations]] إيه اللي اتطبق. [[migrate dev]] على جهازك بيعمل الملف ويطبّقه. [[migrate deploy]] على السيرفر بيطبّق اللي لسه متطبقش بس، من غير ما يولّد حاجة.",
          example: R`npx prisma migrate dev --name add_orders_status
npx prisma migrate status
npx prisma migrate deploy
npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
npx prisma migrate resolve --applied 20260925103000_add_orders_status
npx prisma db pull`,
          try: "عدّل schema.prisma، وشغّل [[migrate dev]]، وافتح ملف SQL اللي اتولّد واقراه قبل ما تعمله commit.",
          deep: {
            why: "تغيير الـ schema بإيدك على السيرفر معناه في يوم ما جهازك والسيرفر والفريق هيبقوا على schemas مختلفة ومحدش عارف الفرق. الـ migrations بتخلي التغيير كود له تاريخ.",
            how: R`[[migrate dev]] على جهازك: بيقارن schema.prisma بحالة القاعدة، ويولّد ملف SQL في [[prisma/migrations/التاريخ_الاسم/migration.sql]]، ويطبّقه. ومن Prisma 7 مبقاش بيعمل generate لوحده: شغّل [[npx prisma generate]] بعده. اقرا الـ SQL المولّد دايمًا قبل commit: Prisma أحيانًا بيمسح عمود ويعمل واحد جديد بدل rename، وده بيضيّع بيانات.

[[migrate deploy]] على السيرفر (في CI أو قبل تشغيل التطبيق): بيبص في جدول [[_prisma_migrations]] يشوف إيه اتطبق، ويطبّق الباقي بالترتيب. مش بيولّد ولا بيسأل. ده الوحيد اللي يتشغّل على الإنتاج.

[[migrate status]] بيقولك فيه migrations لسه متطبقتش أو فيه واحدة فشلت في النص.

[[migrate diff]] بيطلّع SQL الفرق بين حاجتين، مفيد تشوف إيه اللي migrate dev هيعمله قبل ما يعمله.

[[migrate resolve]] لما migration فشلت في النص على الإنتاج: تصلّح بإيدك، وتقوله «اعتبرها اتطبقت».

[[db pull]] العكس: يقرا القاعدة ويكتب schema.prisma، لقاعدة موجودة قبل Prisma.`,
            when: "dev لكل تغيير على جهازك. deploy في pipeline الديبلوي قبل تشغيل النسخة الجديدة.",
            mistakes: "[[migrate dev]] على الإنتاج (ممكن يعمل reset). و [[migrate reset]] على أي حاجة غير جهازك: بيمسح القاعدة."
          },
          teach: R`## الفكرة: schema.prisma هو الهدف، والـ migrations هي الطريق

انت بتكتب شكل الجداول اللي عايزه في [[prisma/schema.prisma]]. و [[prisma migrate]] بيحسب الفرق بينه وبين القاعدة، ويكتبه ملف SQL، ويسجّل في جدول [[_prisma_migrations]] أنهي ملفات اتطبقت.

كل اللي تحت اتشغّل فعلًا بـ Prisma 7.10.0 في container [[node:22-slim]] متوصّل بـ container [[postgres:16]]، على قاعدتين: [[shop]] (كأنها جهازك) و [[shop_prod]] (كأنها السيرفر). وفي Prisma 7 رابط القاعدة بيتكتب في [[prisma.config.ts]] جوه [[datasource: { url: env("DATABASE_URL") }]]، مش في schema.prisma.

وكلمة [[npx]] في أول كل أمر: شغّل البرنامج [[prisma]] المتسطّب في [[node_modules]] بتاع المشروع.

> خد بالك وانت بتسطّب: يوم التجربة (6 أكتوبر 2026) الـ tag اللي اسمه [[latest]] على npm كان بيشاور على نسخة تجريبية [[8.0.0-rc.20]]، فـ [[npm i -D prisma]] من غير رقم سطّبها، وفيها الأمر اتغيّر اسمه: [[npx prisma migrate dev]] طلّع [[No command registered for $__btmigrate$__bt, did you mean $__btmigration$__bt?]]. عشان الدرس ده ثبّت النسخة: [[npm i -D prisma@7]]، و [[npm view prisma dist-tags]] بيوريك كل tag بيشاور على إيه.

---

## ١. [[migrate dev --name add_orders_status]]

بدأنا بموديل فيه [[id]] و [[amount]] بس، وعملنا أول migration اسمها [[init]]. بعدين ضفنا سطر:

~~~text prisma/schema.prisma
model Order {
  id     Int @id @default(autoincrement())
  amount Int
  status String @default("pending")
}
~~~

- [[migrate dev]]: قارن الـ schema بالقاعدة، اكتب ملف SQL بالفرق، وطبّقه. **على جهازك بس.**
- [[--name add_orders_status]]: اسم يتحط في اسم الفولدر عشان تعرف الملف ده بيعمل إيه.

~~~text الناتج
Datasource "db": PostgreSQL database "shop", schema "public" at "pg02-db:5432"

Applying migration $__bt20261006134857_add_orders_status$__bt

prisma/migrations/
  └─ 20261006134857_add_orders_status/
    └─ migration.sql

Your database is now in sync with your schema.
~~~

اسم الفولدر = التاريخ والساعة ([[20261006134857]] يعني 2026-10-06 13:48:57) + الاسم. التاريخ في الأول بيضمن الترتيب. والملف نفسه:

~~~sql migration.sql
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
~~~

وفي Prisma 7 [[migrate dev]] مبقاش بيعمل [[prisma generate]] لوحده، فشغّله بعدها عشان كود الـ client يشوف العمود الجديد.

---

## ٢. [[migrate status]]

بيقارن الفولدر [[prisma/migrations]] بجدول [[_prisma_migrations]] في القاعدة. على [[shop]]:

~~~text الناتج
2 migrations found in prisma/migrations

Database schema is up to date!
~~~

وعلى [[shop_prod]] اللي لسه فاضية:

~~~text الناتج
Following migrations have not yet been applied:
20261006134842_init
20261006134857_add_orders_status

To apply migrations in development run prisma migrate dev.
To apply migrations in production run prisma migrate deploy.
~~~

---

## ٣. [[migrate deploy]]

ده أمر السيرفر: بيطبّق الملفات اللي مش في [[_prisma_migrations]]، بالترتيب، من غير ما يولّد أي حاجة ومن غير ما يسأل. على [[shop_prod]]:

~~~text الناتج
Applying migration $__bt20261006134842_init$__bt
Applying migration $__bt20261006134857_add_orders_status$__bt

All migrations have been successfully applied.
~~~

والجدول اللي بيفتكر:

~~~text SELECT migration_name, finished_at, applied_steps_count FROM _prisma_migrations
          migration_name          |          finished_at          | applied_steps_count
----------------------------------+-------------------------------+---------------------
 20261006134842_init              | 2026-10-06 13:48:42.706253+00 |                   1
 20261006134857_add_orders_status | 2026-10-06 13:48:57.531605+00 |                   1
~~~

لو [[finished_at]] فاضي، الـ migration بدأت ووقعت في النص.

---

## ٤. [[migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script]]

بيطلّع SQL الفرق **من غير ما يطبّق ولا يكتب ملف**:

| الحتة | معناها |
|---|---|
| [[--from-config-datasource]] | نقطة البداية: القاعدة اللي في [[prisma.config.ts]] |
| [[--to-schema prisma/schema.prisma]] | نقطة النهاية: الملف ده |
| [[--script]] | اطبع SQL (من غيره بيطبع وصف بالكلام) |

لما القاعدة والـ schema متطابقين طبع [[-- This is an empty migration.]]. وبعدين غيّرنا اسم [[amount]] لـ [[total]] في الـ schema:

~~~text الناتج
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
ADD COLUMN     "total" INTEGER NOT NULL;
~~~

ده بالظبط الفخ: Prisma مش فاهم إنها إعادة تسمية، فبيمسح العمود (والبيانات معاه) ويعمل واحد جديد. عشان كده بنعمل الملف بـ [[migrate dev --create-only]] (اكتب الملف ومتطبّقوش)، وفي أوله تحذير:

~~~text الناتج
  - You are about to drop the column $__btamount$__bt on the $__btOrder$__bt table. All the data in the column will be lost.
~~~

ونعدّل الملف بإيدنا لـ [[ALTER TABLE "Order" RENAME COLUMN "amount" TO "total";]].

---

## ٥. [[migrate resolve --applied <اسم>]]

بيكتب في [[_prisma_migrations]] إن الـ migration دي «اتطبقت»، من غير ما ينفّذها. بتستخدمه لما migration فشلت في النص على الإنتاج وانت صلّحت بإيدك. جرّبناه على [[shop_prod]]: عملنا الـ RENAME بإيدنا بـ psql، وبعدين:

~~~text الناتج
Migration 20261006134917_rename_amount marked as applied.
~~~

و [[migrate status]] بعدها قال [[Database schema is up to date!]]. ولو جرّبته على واحدة متسجّلة أصلًا:

~~~text الناتج
Error: P3008

The migration $__bt20261006134857_add_orders_status$__bt is already recorded as applied in the database.
~~~

---

## ٦. [[db pull]]

العكس خالص: بيقرا الجداول من القاعدة ويكتبها في [[schema.prisma]] (اسمها introspection). للمشاريع اللي القاعدة فيها موجودة قبل Prisma.

~~~text الناتج
✔ Introspected 1 model and wrote it into prisma/schema.prisma in 56ms
~~~

وخد بالك إنه **بيكتب فوق** schema.prisma، فاعمله commit قبلها.

---

## الخلاصة

| الأمر | فين | بيعمل إيه |
|---|---|---|
| [[migrate dev]] | جهازك | يولّد ملف SQL ويطبّقه |
| [[migrate dev --create-only]] | جهازك | يولّد بس، عشان تراجع وتعدّل |
| [[migrate status]] | أي مكان | إيه اللي لسه |
| [[migrate deploy]] | السيرفر و CI | يطبّق اللي لسه، من غير توليد |
| [[migrate diff]] | أي مكان | يوريك SQL من غير ما يعمل حاجة |
| [[migrate resolve --applied]] | الإنتاج بعد إصلاح يدوي | يسجّل إنها اتطبقت |
| [[db pull]] | جهازك | القاعدة ← schema.prisma |

اقرا كل [[migration.sql]] قبل الـ commit، وخصوصًا لو فيه [[DROP]].`,
          lines: [
            "ولّد migration من تغيير schema.prisma وطبّقها محليًا.",
            "إيه اللي اتطبق وإيه لأ.",
            "على السيرفر: طبّق اللي لسه متطبقش، من غير توليد.",
            "SQL الفرق بين القاعدة والـ schema، من غير تطبيق.",
            "لو migration فشلت في النص وصلّحتها بإيدك: اعتبرها اتطبقت.",
            "العكس: اقرا القاعدة واكتب الـ schema."
          ],
          sol: R`لما تضيف مثلًا [[status String @default("pending")]] وتشغّل [[npx prisma migrate dev --name add_orders_status]]، هيقولك إنه عمل فولدر زي [[prisma/migrations/20260930045902_add_orders_status/migration.sql]] و [[Your database is now in sync with your schema.]]. والملف فيه:

[[ALTER TABLE "Order" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'pending';]] وده آمن.

الحالة اللي لازم تتعلم تمسكها: غيّر اسم عمود من [[amount]] لـ [[total]]. Prisma مش بيعرف إنه rename، فبيولّد [[DROP COLUMN "amount"]] و [[ADD COLUMN "total" INTEGER NOT NULL]]، وفي أول الملف تحذير [[All the data in the column will be lost]]. استخدم [[--create-only]] وعدّل الملف لـ [[ALTER TABLE "Order" RENAME COLUMN "amount" TO "total";]] قبل ما تطبّقه. وعلى جدول فيه داتا، [[ADD COLUMN ... NOT NULL]] من غير default هيفشل. و [[npx prisma migrate status]] في الآخر المفروض يقول [[Database schema is up to date!]].`
        },
        {
          cmd: "تغييرات آمنة في الإنتاج",
          title: "ADD COLUMN من غير ما توقّع الموقع",
          desc: "بعض تعديلات الـ schema بتقفل الجدول لحد ما تخلص، وعلى جدول كبير ده دقايق الموقع فيها واقف. [[lock_timeout]] بيخلي الأمر يفشل بدل ما يستنى، و [[CONCURRENTLY]] بيبني index من غير قفل، والقيم الافتراضية الثابتة سريعة من Postgres 11.",
          example: R`SET lock_timeout = '3s';
ALTER TABLE orders ADD COLUMN notes text;
ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'pending';
CREATE INDEX CONCURRENTLY idx_orders_notes ON orders (notes);
ALTER TABLE orders ADD CONSTRAINT chk_amount CHECK (amount >= 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT chk_amount;`,
          try: "على جدول فيه مليون صف، قارن وقت ADD COLUMN بـ DEFAULT ثابت مقابل DEFAULT clock_timestamp(): الأول لحظي والتاني بيعيد كتابة الجدول (now() لحظية كمان لأنها بتتحسب مرة واحدة).",
          flag: "script",
          deep: {
            why: "[[ALTER TABLE]] على جدول فيه ١٠ مليون صف ممكن يقفله ٥ دقايق، وكل طلب على الموقع يستنى، والاتصالات تتراكم، والموقع يقع. الـ migration نفسها صح، التوقيت والطريقة هما المشكلة.",
            how: R`[[SET lock_timeout = '3s']] أول سطر في أي migration إنتاج: لو الأمر مقدرش ياخد الـ lock في ٣ ثواني (لأن استعلام طويل ماسك الجدول)، يفشل بدل ما يستنى ويعلّق كل اللي وراه. تعيد المحاولة بعدين.

[[ADD COLUMN]] من غير default أو بـ default ثابت: لحظي، مش بيلمس الصفوف (Postgres 11+). بـ default بيتحسب لكل صف (volatile) زي [[clock_timestamp()]] أو [[gen_random_uuid()]]: بيعيد كتابة الجدول كله ([[now()]] مش منهم: بتتحسب مرة واحدة فلحظية). الحل: ضيف العمود من غير default، وبعدين حدّث على دفعات.

[[NOT NULL]] على عمود موجود: بيفحص كل الصفوف بقفل. الطريقة: CHECK constraint بـ [[NOT VALID]] (لحظي، بيطبّق على الصفوف الجديدة بس)، وبعدين [[VALIDATE CONSTRAINT]] (بيفحص القديمة من غير قفل قوي).

[[CREATE INDEX CONCURRENTLY]]: مينفعش جوه transaction، و Prisma بيلف كل migration في transaction. الحل: migration منفصلة فيها الأمر ده لوحده من غير أي أمر تاني في نفس الملف، أو تعمل الـ index بإيدك خارج Prisma وتسجّله بـ migrate resolve.

وأي migration بتمسح عمود: خطوتين في deployين. الأول الكود يبطّل يستخدمه، والتاني المسح.`,
            when: "أي migration على جدول أكبر من كام مية ألف صف.",
            mistakes: "RENAME COLUMN مباشرة: الكود القديم اللي لسه شغال لثواني أثناء الـ deploy هيقع. الاسم الجديد يتضاف ويتملى، والقديم يتشال بعدين."
          },
          teach: R`## الفكرة: الأمر صح، بس ممكن يقفل الجدول

أي [[ALTER TABLE]] محتاج **قفل** (lock) على الجدول. لو القفل ده ماسك الجدول وقت طويل، كل [[SELECT]] و [[INSERT]] من الموقع بيستنوا وراه، والموقع يبان واقع. الـ ٦ سطور في المثال هما الطرق اللي بتخلي التغيير يا لحظي، يا من غير قفل قوي.

جربناهم كلهم في container [[postgres:16]] على جدول [[orders]] فيه **مليون صف**، و [[\timing on]] شغال عشان كل أمر يطبع وقته.

---

## ١. [[SET lock_timeout = '3s';]]

[[SET]] بيغيّر إعداد للجلسة دي بس. و [[lock_timeout]] معناه: «لو مقدرتش تاخد القفل في ٣ ثواني، افشل».

ليه ده مهم؟ لأن [[ALTER TABLE]] بيستنى أي حد تاني ماسك الجدول. ولو استعلام طويل شغال، الـ ALTER يقف في الطابور، و**كل استعلام جديد يقف وراه**. يعني الـ ALTER نفسه بقى سبب الوقفة.

جربناها: جلسة تانية فتحت transaction على [[orders]] واستنت ٨ ثواني، وفي نفس الوقت:

~~~text الناتج
SET
ERROR:  canceling statement due to lock timeout
Time: 3000.547 ms (00:03.001)
~~~

فشل بعد ٣ ثواني بالظبط بدل ما يعلّق الموقع. تعيد المحاولة بعد ما الاستعلام الطويل يخلص.

---

## ٢. [[ADD COLUMN notes text]]

~~~text الناتج
ALTER TABLE
Time: 4.132 ms
~~~

عمود من غير default: Postgres بيسجّله في الـ catalog (الفهرس اللي فيه شكل الجداول) بس، والصفوف القديمة مبتتلمسش. أي صف قديم لما يتقري، العمود ده يطلع [[NULL]].

## ٣. [[ADD COLUMN status text NOT NULL DEFAULT 'pending']]

~~~text الناتج
ALTER TABLE
Time: 1.450 ms
~~~

لحظي كمان، رغم إن فيه default و [[NOT NULL]]. من Postgres 11، الـ default **الثابت** بيتحفظ مرة واحدة في الـ catalog، وأي صف قديم بيترد بيه. قبل 11 كان بيعيد كتابة المليون صف.

### بس مش أي default

| الـ default | الوقت على مليون صف | ليه |
|---|---|---|
| [['pending']] | 1.450 ms | قيمة ثابتة |
| [[now()]] | 3.953 ms | بتتحسب **مرة واحدة** وقت الأمر |
| [[clock_timestamp()]] | 964.519 ms | بتتحسب **لكل صف** (volatile)، فلازم يكتب كل الصفوف |

والدليل:

~~~text SELECT count(DISTINCT c1), count(DISTINCT c2) FROM orders;
 count | count
-------+--------
     1 | 338890
~~~

عمود [[now()]] فيه قيمة واحدة لكل الصفوف، وعمود [[clock_timestamp()]] فيه حوالي ٣٤٠ ألف قيمة مختلفة: اتحسبت وهو بيكتب كل صف. ثانية على مليون صف، يعني حوالي دقيقة ونص على ١٠٠ مليون، والجدول مقفول [[ACCESS EXCLUSIVE]] (أقوى قفل: حتى [[SELECT]] بيستنى).

---

## ٤. [[CREATE INDEX CONCURRENTLY idx_orders_notes ON orders (notes);]]

- [[CREATE INDEX]] العادي بيمنع الكتابة على الجدول لحد ما يخلص.
- [[CONCURRENTLY]]: ابنيه والجدول شغال عادي. أبطأ (بيمر على الجدول مرتين) بس من غير وقفة.
- [[idx_orders_notes]] اسم الـ index، و [[(notes)]] العمود.

~~~text الناتج
CREATE INDEX
Time: 275.067 ms
~~~

والشرط المهم: مينفعش جوه transaction. جربنا:

~~~text BEGIN; CREATE INDEX CONCURRENTLY ...
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

عشان كده في Prisma (اللي بيلف كل migration في transaction) بيتحط في migration لوحده، وفي سكربت migrations بيتشغّل من غير [[--single-transaction]].

---

## ٥ و ٦. constraint على مرحلتين: [[NOT VALID]] ثم [[VALIDATE]]

~~~sql
ALTER TABLE orders ADD CONSTRAINT chk_amount CHECK (amount >= 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT chk_amount;
~~~

- [[ADD CONSTRAINT chk_amount]]: قاعدة اسمها [[chk_amount]].
- [[CHECK (amount >= 0)]]: أي صف لازم [[amount]] فيه صفر أو أكتر.
- [[NOT VALID]]: طبّقها على الصفوف **الجديدة** بس، ومتفحصش القديمة دلوقتي. فالأمر لحظي: [[1.612 ms]].
- [[VALIDATE CONSTRAINT]]: افحص القديمة دلوقتي. أخد [[45.459 ms]] على المليون صف، وبقفل أخف (الجدول يتقري ويتكتب فيه عادي وهو بيفحص).

لو لقى صف بيكسر القاعدة، [[VALIDATE]] بيفشل والـ constraint بيفضل [[NOT VALID]]: تصلّح الصفوف وتعيد.

---

## الحل (solCode): نفس التجربة خطوة خطوة

~~~sql
CREATE TABLE big AS SELECT g AS id FROM generate_series(1, 1000000) g;
~~~

[[generate_series(1, 1000000)]] بتطلّع الأرقام من ١ لمليون كصفوف، و [[g]] اسمها، و [[CREATE TABLE ... AS SELECT]] بيعمل جدول من النتيجة. وبعدين [[\timing on]] (أمر psql) يطبع وقت كل أمر، وباقي الأوامر هي الـ ٣ defaults اللي في الجدول فوق.

---

## الخلاصة

| التغيير | آمن؟ | الطريقة |
|---|---|---|
| أي migration إنتاج | | أول سطر [[SET lock_timeout]] |
| عمود من غير default أو بـ default ثابت | لحظي | عادي |
| عمود بـ default بيتحسب لكل صف | بيعيد كتابة الجدول | ضيفه من غير default وحدّث على دفعات |
| index | | [[CONCURRENTLY]]، وبره أي transaction |
| CHECK أو NOT NULL على بيانات قديمة | | [[NOT VALID]] وبعدين [[VALIDATE]] |
| مسح أو إعادة تسمية عمود | | على deployين: الكود الأول، والـ schema بعده |`,
          lines: [
            "لو مقدرتش تاخد الـ lock في ٣ ثواني، افشل بدل ما تعلّق الموقع.",
            "عمود جديد من غير default: لحظي.",
            "default ثابت: لحظي كمان (Postgres 11+).",
            "index من غير قفل الجدول.",
            "constraint على الصفوف الجديدة بس (لحظي).",
            "وبعدين افحص القديمة من غير قفل قوي."
          ],
          sol: R`على جدول مليون صف مع [[\timing]] الأرقام اللي طلعت:

[[ADD COLUMN status text NOT NULL DEFAULT 'pending']] أخد [[2.5 ms]]. و [[ADD COLUMN c1 timestamptz DEFAULT now()]] أخد [[0.8 ms]]. و [[ADD COLUMN c2 timestamptz DEFAULT clock_timestamp()]] أخد [[626 ms]]، يعني مئات المرات أبطأ، لأنه بيعيد كتابة كل صف.

والدليل: [[SELECT count(DISTINCT c1), count(DISTINCT c2) FROM big;]] رجّع [[1]] و حوالي [[332265]]. الـ now() اتحسبت مرة واحدة واتحفظت في الـ catalog، والـ clock_timestamp() اتحسبت لكل صف. وعلى جدول ١٠٠ مليون صف ده دقايق والجدول مقفول [[ACCESS EXCLUSIVE]]، يعني حتى الـ SELECT واقف.

الغلط الشائع إنك تجرّب على جدول صغير فتلاقي الاتنين لحظيين. والـ [[SET lock_timeout = '3s']] قبلهم يخلي الـ ALTER يفشل بسرعة لو فيه transaction طويلة ماسكة الجدول، بدل ما يقف ويوقف الطابور وراه.`,
          solCode: R`CREATE TABLE big AS SELECT g AS id FROM generate_series(1, 1000000) g;
\timing on
SET lock_timeout = '3s';
ALTER TABLE big ADD COLUMN status text NOT NULL DEFAULT 'pending';
ALTER TABLE big ADD COLUMN c1 timestamptz DEFAULT now();
ALTER TABLE big ADD COLUMN c2 timestamptz DEFAULT clock_timestamp();
SELECT count(DISTINCT c1), count(DISTINCT c2) FROM big;`
        },
        {
          cmd: "Supabase CLI",
          title: "القاعدة المحلية والـ migrations",
          desc: "Supabase CLI بيشغّل نسخة كاملة من Supabase على جهازك بـ Docker، وبيدير الـ migrations زي Prisma: تعمل التغيير محليًا، ترفعه لمشروعك على Supabase بـ [[db push]]. و [[gen types]] بيطلّع أنواع TypeScript من الـ schema.",
          example: R`supabase init
supabase start
supabase link --project-ref abcdefghijkl
supabase migration new add_orders
supabase db reset
supabase db push
supabase db pull
supabase gen types typescript --linked > src/types/supabase.ts
supabase db dump -f backup.sql`,
          try: "شغّل [[supabase start]] وافتح Studio المحلي على localhost:54323. القاعدة على بورت 54322.",
          deep: {
            why: "تطوّر على قاعدة Supabase الحقيقية مباشرة؟ كل تجربة بتلمس الإنتاج. الـ CLI بيديك Supabase كامل على جهازك، والتغييرات بتترفع كـ migrations.",
            how: R`التسطيب: مش بـ [[npm install -g supabase]] (مش مدعوم). يا إما [[npx supabase]] كل مرة، يا إما devDependency في المشروع ([[npm i -D supabase]]) فكل الفريق على نفس النسخة، يا إما [[brew install supabase/tap/supabase]] على الماك و [[scoop install supabase]] على ويندوز (بعد [[scoop bucket add supabase https://github.com/supabase/scoop-bucket.git]]).

[[init]] بيعمل فولدر supabase/ فيه config و migrations. [[start]] بيشغّل بـ Docker كل حاجة: Postgres على 54322، و API على 54321، و Studio على 54323. أول مرة بينزّل صور كتير.

[[link]] بيربط الفولدر بمشروعك على Supabase (الـ ref من الـ URL بتاع لوحة التحكم).

الـ migrations: [[migration new اسم]] بيعمل ملف SQL فاضي تكتب فيه التغيير. [[db reset]] بيمسح القاعدة المحلية ويعيد تطبيق كل الـ migrations من الأول (وبيشغّل seed.sql)، فتتأكد إنهم بيشتغلوا من الصفر. [[db push]] بيطبّق الـ migrations اللي لسه متطبقتش على المشروع المربوط، وبيقرا من [[supabase/migrations]] بس، والأسماء لازم تبدأ بـ timestamp زي [[20260503000001_init.sql]] (ودي اللي [[migration new]] بيعملها).

[[db pull]] العكس: لو عملت تغيير من لوحة التحكم، بيطلّعه كـ migration.

[[gen types]] بيقرا الـ schema ويولّد أنواع TypeScript، فـ supabase-js يبقى typed بالكامل.

[[db dump]] باك أب من المشروع المربوط.`,
            when: "أي مشروع Supabase له أكتر من مطوّر أو له إنتاج حقيقي.",
            mistakes: "في مشروع حقيقي الـ migrations كانت في [[database/migrations]] بأسماء [[01_...]]، و [[supabase db push]] قال مفيش حاجة يطبّقها: مبيشوفش غير [[supabase/migrations]] بأسماء timestamp. وفي نفس المشروع الدليل كان بيقول [[npm install -g supabase]] وده بيفشل. وتعدّل الـ schema من لوحة التحكم على الإنتاج وتنسى db pull، فالـ migrations مش بتمثّل الواقع. و db reset وانت فاكر إنه على الإنتاج (هو محلي بس، إلا لو كتبت [[--linked]]: ساعتها بيمسح قاعدة المشروع الحقيقي)."
          },
          teach: R`## الفكرة: Supabase كامل على جهازك، والتغييرات ملفات

الـ CLI بيعمل حاجتين: يشغّل نسخة من Supabase على جهازك بـ Docker (Postgres و API و Studio)، ويدير فولدر [[supabase/migrations]] اللي فيه تغييرات الـ schema كملفات SQL، ويرفعها لمشروعك الحقيقي.

اللي اتجرّب هنا: Supabase CLI نسخة 2.120.0 متسطّب بـ [[npm i -D supabase]] في container [[node:22-slim]]. [[init]] و [[migration new]] اشتغلوا فعلًا. [[start]] و [[db reset]] محتاجين Docker على نفس الجهاز، والـ container مفيهوش Docker، فطلّعوا رسالة الخطأ اللي تحت. و [[link]] و [[db push]] و [[db pull]] و [[gen types --linked]] و [[db dump]] محتاجين مشروع Supabase حقيقي وتوكن، فشرحهم من الـ docs الرسمية لـ Supabase CLI.

> كل الأوامر تحت مكتوبة [[supabase ...]]. لو مسطّبه كـ devDependency زي ما عملنا، اكتب قبلها [[npx]] (يعني [[npx supabase init]]).

---

## ١. [[supabase init]]

~~~text الناتج
Finished supabase init.
~~~

بيعمل فولدر [[supabase/]] في المشروع، وجواه [[config.toml]]: إعدادات النسخة المحلية. أهم سطور فيه:

~~~text supabase/config.toml (مختصر)
[api]
port = 54321
[db]
port = 54322
major_version = 17
[studio]
port = 54323
~~~

يعني الـ API على 54321، و Postgres على 54322، ولوحة Studio على 54323، والقاعدة المحلية Postgres 17 زي المشاريع الجديدة على Supabase. الملف ده بيتعمله commit.

## ٢. [[supabase start]]

بيشغّل كل الخدمات كـ containers. أول مرة بينزّل images كتير (دقايق). لما يخلص بيطبع الروابط والمفاتيح المحلية، و [[supabase status]] بيطبعهم تاني. من غير Docker:

~~~text الناتج (جوه container مفيهوش Docker)
failed to inspect container health: docker: command not found (podman also not found) — install Docker Desktop or Podman and ensure it is on PATH
~~~

يعني الحل تشغّل Docker Desktop الأول.

## ٣. [[supabase link --project-ref abcdefghijkl]]

[[--project-ref]] هو كود المشروع: الحروف اللي في رابط لوحة التحكم [[supabase.com/dashboard/project/<ref>]]. بعد الـ link كل الأوامر اللي بتكلّم «المشروع المربوط» بتعرف تروح فين. من غيره:

~~~text الناتج (db push من غير link)
Cannot find project ref. Have you run supabase link?
~~~

---

## ٤. [[supabase migration new add_orders]]

~~~text الناتج
Created new migration at supabase/migrations/20261006135218_add_orders.sql
~~~

ملف فاضي، اسمه = التاريخ والساعة ([[20261006135218]]) + الاسم اللي اديته. انت بتكتب جواه الـ SQL:

~~~sql
CREATE TABLE orders (id bigint generated always as identity primary key, total int not null);
~~~

والـ timestamp في الأول هو اللي بيحدد الترتيب، و [[db push]] مش بيشوف غير الملفات اللي بالشكل ده جوه [[supabase/migrations]].

## ٥. [[supabase db reset]]

بيمسح القاعدة **المحلية** ويطبّق كل الـ migrations من الأول، وبعدين [[supabase/seed.sql]] لو موجود. فايدته إنك تتأكد إن الملفات بتبني القاعدة من الصفر. ومع [[--linked]] بيعمل نفس الكلام على المشروع الحقيقي، يعني بيمسحه، فمتكتبهاش.

## ٦. [[supabase db push]]

بيطبّق على المشروع المربوط الملفات اللي لسه متطبقتش (Supabase بيسجّلهم في جدول [[supabase_migrations.schema_migrations]]، نفس فكرة [[_prisma_migrations]]). و [[--dry-run]] بيوريك هيطبّق إيه من غير ما يطبّق.

## ٧. [[supabase db pull]]

العكس: لو حد غيّر حاجة من لوحة التحكم، بيقارن المشروع بالملفات ويكتب الفرق كملف migration جديد.

---

## ٨. [[supabase gen types typescript --linked > src/types/supabase.ts]]

- [[gen types typescript]]: اقرا الجداول والأعمدة واكتبها types بـ TypeScript.
- [[--linked]]: من المشروع المربوط (و [[--local]] من النسخة المحلية).
- [[>]]: اكتب الناتج في الملف ده بدل الشاشة.

وبعدين [[createClient<Database>(...)]] في supabase-js، فلو كتبت اسم عمود غلط الـ editor يعلّم عليه قبل ما تشغّل.

## ٩. [[supabase db dump -f backup.sql]]

باك أب SQL من المشروع المربوط في ملف ([[-f]] من file). من غير فلاجات بياخد الـ schema بس، و [[--data-only]] البيانات. وهو بيشغّل [[pg_dump]] جوه Docker، فمحتاج Docker برضه.

---

## الخلاصة

| الأمر | بيلمس إيه |
|---|---|
| [[init]] و [[migration new]] | ملفات على جهازك |
| [[start]] و [[stop]] و [[db reset]] | النسخة المحلية (Docker) |
| [[link]] | بيربط الفولدر بمشروع |
| [[db push]] | المشروع الحقيقي: بيطبّق الجديد |
| [[db pull]] و [[gen types --linked]] و [[db dump]] | المشروع الحقيقي: قراية بس |

الدورة: [[migration new]] ← تكتب SQL ← [[db reset]] محليًا ← commit ← [[db push]].`,
          lines: [
            "اعمل فولدر supabase/ في المشروع.",
            "شغّل Supabase كامل محليًا بـ Docker.",
            "اربط بمشروعك على Supabase.",
            "ملف migration جديد تكتب فيه SQL.",
            "امسح المحلي وطبّق كل الـ migrations من الأول.",
            "طبّق الجديد على المشروع المربوط.",
            "تغييرات اتعملت من لوحة التحكم: هاتها كـ migration.",
            "أنواع TypeScript من الـ schema.",
            "باك أب من المشروع المربوط."
          ],
          sol: R`[[supabase start]] بيحتاج Docker شغال، وأول مرة بيسحب images كتير فبياخد دقايق. في الآخر بيطبع الـ URLs المحلية: الـ API على [[http://127.0.0.1:54321]]، والقاعدة [[postgresql://postgres:postgres@127.0.0.1:54322/postgres]]، و Studio على [[http://127.0.0.1:54323]]، ومعاهم الـ keys المحلية (شكل العرض بيتغير بين نسخ الـ CLI، بس البورتات دي الافتراضية). [[supabase status]] بيطبعهم تاني في أي وقت.

افتح Studio هتلاقي مشروع فاضي شبه اللوحة الحقيقية. و [[psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -c "\dt"]] بيتصل بنفس القاعدة.

المشاكل الشائعة: [[Cannot connect to the Docker daemon]] يعني Docker مش شغال. و [[port is already allocated]] يعني مشروع Supabase تاني شغال، اعمل [[supabase stop]] جوه فولدره أو غيّر البورتات في [[supabase/config.toml]]. و [[supabase stop]] بيحتفظ بالداتا، و [[supabase stop --no-backup]] بيمسحها.`
        },
        {
          cmd: "Supabase Management API",
          title: "SQL على Supabase بتوكن الحساب من غير psql",
          desc: R`Supabase عندهم API لإدارة المشاريع، ومنه endpoint بينفّذ SQL: [[/v1/projects/REF/database/query]]. بتبعته بـ curl وتوكن حسابك، من غير باسورد القاعدة ومن غير psql.

[[jq -Rs]] بيحوّل ملف SQL كامل لنص JSON سليم، بالسطور والعلامات.`,
          example: R`read -rs SUPABASE_ACCESS_TOKEN; export SUPABASE_ACCESS_TOKEN
jq -Rs '{query: .}' < db/ensure_schema.sql \
  | curl -sS --fail-with-body -X POST "https://api.supabase.com/v1/projects/PROJECT_REF/database/query" \
      -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
      -H "Content-Type: application/json" --data @- | jq .`,
          try: "اعمل توكن من Account ثم Access Tokens في لوحة Supabase، وشغّل الأمر على مشروع تجربة بملف فيه [[SELECT now();]]، وبعدين الغيه من نفس الصفحة.",
          flag: "term",
          deep: {
            why: "أحيانًا مفيش psql ولا IPv6 ولا باسورد القاعدة معاك: CI، أو container صغير، أو سكربت على ويندوز. التوكن والـ API بيكفّوا.",
            how: R`[[read -rs]] بيقرا التوكن من غير ما يظهر ولا يتسجّل في الـ history.

[[jq -R]] (raw) بيقرا الملف كنص مش JSON، و [[-s]] (slurp) بيقراه كله كنص واحد. و [[{query: .}]] بيحطه في object. jq بيعمل escape للسطور والعلامات، فمش محتاج تبني JSON بإيدك.

[[--data @-]] بيقرا الـ body من stdin (الـ pipe). والرد JSON: صفوف لو SELECT، و error برسالة Postgres لو SQL غلط. [[--fail-with-body]] بيخلي curl يرجع exit code مش صفر لو HTTP 400 ويطبع الرسالة برضه، فالسكربت يعرف.

التوكن ده Personal Access Token: بيدي صلاحيات على كل المشاريع في حسابك، مش مشروع واحد. أقوى من service_role نفسه. مكانه جهازك أو secrets الـ CI، والأحسن توكن منفصل لكل استخدام تقدر تلغيه.`,
            when: "سكربت أو CI محتاج يطبّق SQL وماعندهوش psql. للـ migrations المنتظمة Supabase CLI أحسن.",
            mistakes: R`في مشروع حقيقي السكربت ده كان بيتشغّل تلقائي مع كل تشغيل container على الإنتاج، والتوكن الكامل متخزن في .env بتاع التطبيق ومتكرر في كذا مكان: أي حد يوصل للـ container يملك كل مشاريع الحساب. خليه خطوة يدوية أو في CI. وبناء الـ JSON بإيدك ([[{"query": "$SQL"}]]) بيبوظ من أول علامة تنصيص أو سطر جديد في الـ SQL؛ jq -Rs بيحل ده.`
          },
          teach: R`## الفكرة: SQL جوه طلب HTTP

بدل ما تتصل بالقاعدة بـ psql وباسورد، بتبعت الـ SQL كـ JSON لـ API بتاع Supabase، ومعاه توكن حسابك، والـ API هو اللي بينفّذه ويرجّعلك النتيجة JSON. الأمر كله ٣ برامج ورا بعض: [[jq]] يجهّز الـ JSON، و [[curl]] يبعته، و [[jq]] تاني يعرض الرد.

اتجرّب في container [[node:22-slim]] فيه jq 1.6 و curl. جزء [[jq]] اتشغّل كامل. والطلب اتبعت فعلًا لـ [[api.supabase.com]] بس بتوكن وهمي، فشفنا رد الرفض. الرد الناجح (بتوكن حقيقي) من الـ docs الرسمية لـ Supabase Management API.

---

## السطر ١: [[read -rs SUPABASE_ACCESS_TOKEN; export SUPABASE_ACCESS_TOKEN]]

- [[read]]: استنى اليوزر يكتب سطر، وحطه في المتغير ده.
- [[-r]] (raw): متتعاملش مع [[\]] كرمز خاص، خد النص زي ما هو.
- [[-s]] (silent): متعرضش اللي بيتكتب على الشاشة، زي خانة الباسورد.
- [[export]]: خلّي المتغير متاح للبرامج اللي هتتشغّل بعده (زي [[curl]]).

ليه مش [[SUPABASE_ACCESS_TOKEN=sbp_...]] على طول؟ لأن السطر ده هيتحفظ في [[~/.bash_history]] بالتوكن. [[read]] بيقرا من الكيبورد، فالتوكن مبيتكتبش في أي أمر.

---

## السطر ٢: [[jq -Rs '{query: .}' < db/ensure_schema.sql]]

الملف اللي جربنا بيه فيه سطرين، وفيه علامة تنصيص جوه الـ SQL:

~~~text db/ensure_schema.sql
CREATE TABLE IF NOT EXISTS notes (id int, body text);
SELECT 'it''s ok' AS msg, now();
~~~

| الحتة | معناها |
|---|---|
| [[< db/ensure_schema.sql]] | ادّي jq الملف ده كمدخل |
| [[-R]] (raw input) | المدخل نص عادي، مش JSON |
| [[-s]] (slurp) | اقرا الملف كله كنص **واحد** بدل سطر سطر |
| [[{query: .}]] | اعمل object فيه مفتاح [[query]] وقيمته [[.]]، والـ [[.]] في jq يعني «المدخل نفسه» |

~~~text الناتج
{
  "query": "CREATE TABLE IF NOT EXISTS notes (id int, body text);\nSELECT 'it''s ok' AS msg, now();\n"
}
~~~

لاحظ إن السطر الجديد بقى [[\n]]: jq عمل الـ escape لوحده. ولو بنيت الـ JSON بإيدك بـ [[echo "{\"query\": \"$SQL\"}"]]:

~~~text الناتج
parse error: Invalid string: control characters from U+0000 through U+001F must be escaped at line 2, column 33
~~~

الـ JSON باظ من أول سطر جديد. ده بالظبط اللي [[jq -Rs]] بيحلّه.

---

## السطر ٣: [[| curl -sS --fail-with-body -X POST "https://api.supabase.com/v1/projects/PROJECT_REF/database/query" \]]

- [[|]]: الـ JSON اللي طلع من jq يدخل curl.
- [[-s]] (silent): من غير شريط التحميل. و [[-S]] (show-error): بس لو حصل error اطبعه.
- [[--fail-with-body]]: لو الرد 400 أو أكتر، اطلع بـ exit code مش صفر (22)، **واطبع الـ body برضه** عشان تشوف السبب.
- [[-X POST]]: نوع الطلب POST، يعني «ببعتلك داتا».
- الرابط: [[/v1/projects/]] وبعدها كود مشروعك (الـ ref) وبعدها [[/database/query]].
- [[\]] في آخر السطر: الأمر مكمّل تحت.

## السطر ٤: [[-H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"]]

[[-H]] بيضيف header للطلب. [[Authorization: Bearer <توكن>]] الطريقة المعتادة تقول للـ API «أنا مين». و [[$SUPABASE_ACCESS_TOKEN]] بيتبدل بالقيمة اللي [[read]] قراها، جوه علامات [[" "]] عشان الـ shell يبدّله.

## السطر ٥: [[-H "Content-Type: application/json" --data @- | jq .]]

- [[Content-Type: application/json]]: الـ body اللي جاي JSON.
- [[--data @-]]: [[--data]] هو الـ body، و [[@]] يعني «من ملف»، و [[-]] يعني «الملف هو الـ stdin»، يعني اللي جاي من jq في أول الـ pipe.
- [[| jq .]]: الرد JSON في سطر واحد، و [[jq .]] بيعرضه مترتب وملوّن.

---

## الرد

بتوكن وهمي ([[sbp_fake]]) على مشروع مش موجود:

~~~text الناتج
curl: (22) The requested URL returned error: 401
{
  "message": "JWT could not be decoded"
}
~~~

- [[401]]: مش متعرّف عليك، التوكن غلط.
- [[(22)]] هو الـ exit code بتاع curl مع [[--fail-with-body]]، فسكربت فيه [[set -e]] هيقف هنا.
- والـ body اتطبع برضه، وده فرق [[--fail-with-body]] عن [[-f]] اللي بيخفي الـ body.

وبتوكن حقيقي (من الـ docs): الرد array (بين قوسين مربعين) فيها صفوف **آخر** statement، يعني هنا صف واحد [[{"msg": "it's ok", "now": "..."}]]، وأمر زي [[CREATE TABLE]] لوحده بيرجّع array فاضية. ولو الـ SQL فيه غلط: [[400]] والـ body فيه رسالة Postgres.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[read -rs]] | التوكن ميظهرش ولا يتحفظ في الـ history |
| [[jq -Rs '{query: .}']] | الملف كله ← JSON سليم |
| [[curl --fail-with-body]] | يفشل بـ exit code ويوريك السبب |
| [[Authorization: Bearer]] | التوكن |
| [[--data @-]] | الـ body من الـ pipe |

والتوكن ده Personal Access Token على **كل** مشاريع حسابك: مكانه جهازك أو secrets الـ CI، مش [[.env]] التطبيق.`,
          lines: [
            "اقرا التوكن من غير ما يظهر، وصدّره للأوامر اللي بعده.",
            "حوّل ملف SQL كله لـ JSON فيه query...",
            "...وابعته بـ POST (وافشل لو الرد error)...",
            "...بتوكن الحساب...",
            "...كـ JSON من الـ stdin، واعرض الرد بشكل مقروء."
          ],
          sol: R`لو التوكن صح، الـ [[jq .]] في الآخر بيطبع array فيها صف واحد: [[[ { "now": "2026-09-30 05:10:11.123456+00" } ]]]. الـ API بيرجّع نتيجة آخر statement كـ JSON، وأوامر زي CREATE TABLE بترجّع array فاضية [[[]]].

لو التوكن غلط أو اتلغى هتاخد رد 401 وفيه رسالة Unauthorized، و [[--fail-with-body]] بيخلي curl يطلع بـ exit code غير صفر ويطبع الرد، فالسكربت يقف. ولو الـ SQL نفسه فيه غلط هتاخد رد 400 والـ body فيه رسالة Postgres. ولو كتبت الـ PROJECT_REF غلط هيقولك إن المشروع مش موجود أو مالكش صلاحية عليه.

بعد ما تلغي التوكن من صفحة Access Tokens، نفس الأمر لازم يرجّع 401، ودي علامة إن الإلغاء اشتغل. والـ [[read -rs]] مش بيطبع حاجة وانت بتلزق، عشان التوكن ما يظهرش على الشاشة ولا في الـ history.`
        },
        {
          cmd: "Supabase: الاتصال المباشر",
          title: "psql على قاعدة Supabase",
          desc: "قاعدة Supabase هي Postgres عادي، تقدر تدخلها بـ psql. في لوحة التحكم (زرار Connect) فيه ٣: مباشر [[db.REF.supabase.co:5432]] (IPv6 بس افتراضيًا)، و pooler (Supavisor) بـ session mode على 5432، و transaction mode على 6543. للأوامر الإدارية والـ migrations: المباشر أو session. للتطبيق serverless: transaction.",
          example: R`psql "postgres://postgres.abcdefghijkl:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
psql "$SUPABASE_DB_URL" -c "\dt"
pg_dump "$SUPABASE_DB_URL" -Fc --schema=public -f supabase.dump
psql "$SUPABASE_DB_URL" -c "SELECT count(*) FROM pg_stat_activity;"`,
          try: R`خد الـ connection string من زرار Connect فوق في لوحة Supabase، واتصل بـ psql، واعمل [[\dt]] وشوف جداولك.`,
          deep: {
            why: "لوحة Supabase فيها SQL editor، بس للباك أب والـ migrations وتحليل الأداء محتاج الأدوات الحقيقية. وقاعدتهم Postgres عادي.",
            how: R`زرار Connect فوق في لوحة التحكم فيه الـ connection strings. اليوزر اسمه [[postgres.PROJECT_REF]] (مع الـ ref لأن الاتصال بيعدّي على pooler مشترك). والباسورد اللي حددته عند إنشاء المشروع.

بورت [[5432]] على الـ pooler هو session mode: كل الميزات، للـ migrations و pg_dump وأي حاجة إدارية لو جهازك مفيهوش IPv6 (المباشر [[db.REF.supabase.co]] IPv6 بس). بورت [[6543]] transaction mode عبر Supavisor: للتطبيق، بس مش بيدعم prepared statements ولا بعض الميزات، عشان كده [[?pgbouncer=true]] مع Prisma.

[[pg_dump]] بيشتغل عليها عادي. [[--schema=public]] عشان تاخد جداولك بس من غير schemas بتاعة Supabase (auth، storage) اللي ليها إدارة خاصة.

[[pg_stat_activity]] بيوريك اتصالات تطبيقك، والخطة المجانية ليها حد اتصالات صغير، فده أول حاجة تشوفها لو ظهر too many connections.

ونسخة pg_dump عندك لازم تبقى نفس نسخة Postgres في مشروعك أو أحدث (المشاريع الجديدة على 17)، وإلا بيرفض.`,
            when: "باك أب خاص بيك بعيد عن باك أب Supabase. تحليل أداء. أي حاجة الـ SQL editor ميعملهاش.",
            mistakes: "تستخدم بورت 6543 لـ pg_dump أو migrations فتطلع errors غريبة. الإداري على 5432. وفي مشروع حقيقي الـ container مكانش عارف يوصل لهوست القاعدة، والحل كان [[extra_hosts]] بـ IP ثابت و [[dns: 8.8.8.8]] في compose. ده بيشتغل لحد ما الـ IP يتغير. السبب الشائع إن [[db.REF.supabase.co]] عنوانه IPv6 بس وشبكة Docker الافتراضية IPv4، فالحل الأنضف رابط الـ pooler (IPv4) مش تثبيت IP."
          },
          teach: R`## الفكرة: Supabase = Postgres، فـ psql و pg_dump شغالين عليه عادي

كل اللي محتاجه هو الـ connection string الصح من زرار **Connect** في لوحة Supabase. بعدها نفس أدوات Postgres اللي اتعلمتها.

الرابط الحقيقي محتاج مشروع وباسورد، فالأوامر اتجرّبت على Postgres 16 في container، بنفس شكل الرابط ومتغير [[SUPABASE_DB_URL]] بيشاور عليه. شكل روابط Supabase نفسها والبورتات من الـ docs الرسمية لـ Supabase.

---

## ١. نفك الـ connection string

~~~text الرابط
postgres://postgres.abcdefghijkl:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
~~~

| الحتة | معناها |
|---|---|
| [[postgres://]] | البروتوكول: ده رابط Postgres |
| [[postgres.abcdefghijkl]] | اليوزر: [[postgres]] + نقطة + كود مشروعك. الكود لازم عشان الـ pooler مشترك بين مشاريع كتير وبيعرف مشروعك منه |
| [[:PASSWORD]] | باسورد القاعدة اللي حطيته وانت بتعمل المشروع |
| [[@aws-0-eu-central-1.pooler.supabase.com]] | الهوست: الـ pooler (اسمه Supavisor) في منطقة المشروع |
| [[:5432]] | البورت. على الـ pooler: 5432 session mode، و 6543 transaction mode |
| [[/postgres]] | اسم القاعدة، وفي Supabase دايمًا [[postgres]] |

والـ ٣ اختيارات في زرار Connect:

| النوع | الهوست والبورت | امتى |
|---|---|---|
| Direct | [[db.REF.supabase.co:5432]] | IPv6 بس، فلو شبكتك IPv4 مش هيشتغل |
| Session pooler | [[...pooler.supabase.com:5432]] | migrations و pg_dump وأي شغل إداري، و IPv4 |
| Transaction pooler | [[...pooler.supabase.com:6543]] | التطبيق serverless |

### الباسورد فيه رموز؟

لو الباسورد فيه [[@]] أو [[#]] أو [[/]]، الرابط بيتقري غلط. جربنا يوزر باسورده [[p@ss#1]]:

~~~text psql "postgres://webuser:p@ss#1@localhost:5432/app"
psql: error: could not translate host name "ss#1@localhost" to address: Name or service not known
~~~

psql فهم إن الباسورد [[p]] بس، وإن الهوست هو [[ss#1@localhost]]. الحل URL-encoding: [[@]] تتكتب [[%40]] و [[#]] تتكتب [[%23]]:

~~~text psql "postgres://webuser:p%40ss%231@localhost:5432/app"
 current_user
--------------
 webuser
~~~

---

## ٢. [[psql "$SUPABASE_DB_URL" -c "\dt"]]

بدل ما تلزق الرابط في كل أمر، بتحطه مرة في متغير ([[export SUPABASE_DB_URL="postgres://..."]])، والعلامات [[" "]] حوالين [[$SUPABASE_DB_URL]] عشان أي رمز في الباسورد ميتفسرش. و [[\dt]] (describe tables) بيعرض الجداول:

~~~text الناتج
          List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | app_logs | table | postgres
 public | orders   | table | postgres
 public | users    | table | postgres
~~~

على Supabase هتشوف جداول [[public]] بتاعتك بس. جداول Supabase نفسها في schemas تانية ([[auth]] و [[storage]] ...)، و [[\dn]] بيعرضهم.

---

## ٣. [[pg_dump "$SUPABASE_DB_URL" -Fc --schema=public -f supabase.dump]]

- [[-Fc]]: الصيغة المضغوطة بفهرس (شوف «pg_dump بعمق»).
- [[--schema=public]]: الـ schema ده بس. في Supabase ده مهم، لأن [[auth]] و [[storage]] بيديرهم Supabase، ولو رجّعتهم على مشروع تاني هيتخانقوا مع اللي موجود.
- [[-f supabase.dump]]: الملف.

نجح (exit code [[0]]) والملف طلع ٤٥٦ كيلو.

ونسخة [[pg_dump]] لازم تبقى **نفس نسخة السيرفر أو أحدث**. جربنا [[pg_dump]] 16 على سيرفر 18:

~~~text الناتج
pg_dump: error: aborting because of server version mismatch
pg_dump: detail: server version: 18.6 (Debian 18.6-1.pgdg13+2); pg_dump version: 16.15 (Debian 16.15-1.pgdg13+2)
~~~

المشاريع الجديدة على Supabase بتشتغل Postgres 17، فمحتاج [[pg_dump]] 17 أو أحدث.

---

## ٤. [[psql "$SUPABASE_DB_URL" -c "SELECT count(*) FROM pg_stat_activity;"]]

[[pg_stat_activity]] view فيه سطر لكل process شغال في السيرفر. الناتج على الـ container:

~~~text الناتج
 count
-------
     6
~~~

٦ رغم إن مفيش غيرنا متصل؟ لأن العدد ده فيه processes Postgres الداخلية. لو قسّمته بـ [[backend_type]]:

~~~text SELECT backend_type, count(*) FROM pg_stat_activity GROUP BY 1;
         backend_type         | count
------------------------------+-------
 client backend               |     1
 walwriter                    |     1
 autovacuum launcher          |     1
 logical replication launcher |     1
 background writer            |     1
 checkpointer                 |     1
~~~

الاتصالات الحقيقية هي [[client backend]] بس. فالأدق لعدّ اتصالات تطبيقك: [[WHERE backend_type = 'client backend']]. وده أول حاجة تبص عليها لو ظهر [[too many connections]]، لأن الخطة المجانية ليها حد صغير.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| migrations و pg_dump وشغل إداري | Session pooler على 5432 (أو Direct لو عندك IPv6) |
| التطبيق serverless | Transaction pooler على 6543 |
| باك أب جداولك | [[pg_dump --schema=public]] بنسخة pg_dump زي السيرفر أو أحدث |
| باسورد فيه رموز | URL-encode: [[%40]] و [[%23]] |
| عدد الاتصالات | [[pg_stat_activity]] و [[backend_type = 'client backend']] |`,
          lines: [
            "عبر الـ pooler بـ session mode (5432): ينفع لأي حاجة إدارية.",
            "جداولك.",
            "باك أب لـ schema public بس (من غير schemas بتاعة Supabase).",
            "عدد الاتصالات (الخطة المجانية ليها حد)."
          ],
          sol: R`بعد ما تلزق الـ URL وتكتب الباسورد مكان [[[YOUR-PASSWORD]]]، [[\dt]] بيطلّع جداول الـ schema [[public]] بس، زي [[public | todos | table | postgres]]. جداول Supabase نفسها في schemas تانية: [[\dt auth.*]] هتلاقي فيها [[users]] و [[sessions]] وغيرهم، و [[\dn]] بيعرض الـ schemas كلها ([[auth]] و [[storage]] و [[realtime]] و [[extensions]] ...).

المشاكل الشائعة: [[password authentication failed for user "postgres"]] يعني الباسورد غلط، أو اليوزر مكتوب [[postgres]] بس مع pooler محتاج [[postgres.PROJECTREF]]. ولو الباسورد فيه رموز زي [[@]] أو [[#]] لازم تعملها URL-encode ([[%40]] و [[%23]]) وإلا الـ URL يتقري غلط. والـ direct connection ([[db.PROJECTREF.supabase.co]]) بقى IPv6 بس في أغلب المشاريع، فلو شبكتك IPv4 استخدم الـ pooler في session mode (بورت 5432) زي المثال.`
        },
        {
          cmd: "connection pooling",
          title: "ليه max_connections بيخلص",
          desc: "كل اتصال Postgres بياخد رام (حوالي ١٠ ميجا). serverless والـ Next.js API routes بيفتحوا اتصالات كتير قصيرة. الـ pooler (PgBouncer أو Supabase pooler) بيمسك اتصالات قليلة للقاعدة ويوزّعها على آلاف اتصالات التطبيق.",
          example: R`SELECT count(*), state FROM pg_stat_activity GROUP BY state;
SHOW max_connections;
psql "postgres://app_user:secret@localhost:6432/app"
psql "postgres://postgres.abcdefghijkl:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"`,
          try: "في Prisma مع Supabase: [[DATABASE_URL]] على 6543 بـ [[?pgbouncer=true]] للتطبيق، و [[DIRECT_URL]] على 5432 للـ migrations (في Prisma 7 الـ DIRECT_URL بيتحط في [[prisma.config.ts]] مش في schema.prisma).",
          deep: {
            why: "Next.js على Vercel أو أي serverless: كل طلب ممكن يفتح اتصال جديد. ١٠٠ طلب متزامن = ١٠٠ اتصال، و Postgres عنده 100 افتراضي، وكل واحد بياخد رام. too many connections بعد ٥ دقايق.",
            how: R`الاتصال بـ Postgres غالي: عملية كاملة على السيرفر لكل اتصال، وحوالي ١٠ ميجا رام، ووقت للفتح. الـ pooler برنامج في النص: التطبيق بيفتح عليه آلاف الاتصالات الرخيصة، وهو ماسك ٢٠ اتصال حقيقي للقاعدة وبيوزّع الاستعلامات عليهم.

[[transaction mode]]: الاتصال الحقيقي بيتخصص للتطبيق مدة transaction واحدة وبعدين يرجع للـ pool. أعلى كفاءة، بس مفيش state بين الـ transactions: prepared statements و SET session و LISTEN مش هيشتغلوا. [[session mode]]: الاتصال ملك التطبيق لحد ما يقفله، كل حاجة شغالة بس كفاءة أقل.

PgBouncer على سيرفرك: بيسمع على 6432، وإعداداته [[pool_mode = transaction]] و [[default_pool_size = 20]]. و Supabase عندهم pooler جاهز على 6543.

الاستعلام الأول في المثال بيوريك عدد الاتصالات بحالتها: لو [[idle]] كتير، التطبيق فاتح اتصالات ومش بيستخدمها، والـ pool size في الكود (Prisma connection_limit) أكبر من اللازم.`,
            when: "أي serverless. وأي تطبيق بيعدّي ٥٠ اتصال متزامن. و Supabase من أول يوم.",
            mistakes: "ترفع max_connections لـ 500 بدل pooler، فالرام تخلص. و prepared statements مع transaction mode من غير pgbouncer=true."
          },
          teach: R`## الفكرة: اتصالات كتير رخيصة قدام، وقليلة غالية ورا

كل اتصال بـ Postgres = process كامل على السيرفر وحوالي ١٠ ميجا رام. والسيرفر ليه حد ([[max_connections]]). الـ pooler برنامج بيقف في النص: التطبيق يفتح عليه اتصالات قد ما هو عايز، وهو ماسك عدد صغير ثابت من الاتصالات الحقيقية وبيوزّع الاستعلامات عليهم.

اتجرّب فعلًا: container [[postgres:16]]، وقدامه container PgBouncer 1.26 (image [[edoburu/pgbouncer]]) على بورت 6432 بـ [[pool_mode = transaction]] و [[default_pool_size = 20]]. سطر Supabase من الـ docs الرسمية (محتاج مشروع حقيقي).

---

## ١. [[SELECT count(*), state FROM pg_stat_activity GROUP BY state;]]

- [[pg_stat_activity]]: سطر لكل process في السيرفر.
- [[state]]: حالة الاتصال: [[active]] بينفّذ استعلام دلوقتي، و [[idle]] متصل ومش بيعمل حاجة، و [[idle in transaction]] فاتح transaction ومستني (ودي أخطر واحدة لأنها ماسكة أقفال).
- [[GROUP BY state]]: عدّ لكل حالة لوحدها.

> الـ view ده فيه كمان processes Postgres الداخلية (عمود [[state]] بتاعها فاضي). عشان تعدّ الاتصالات بس زوّد [[WHERE backend_type = 'client backend']]، وده اللي استخدمناه في التجربة تحت.

## ٢. [[SHOW max_connections;]]

~~~text الناتج
 max_connections
-----------------
 100
~~~

[[100]] هو الافتراضي. والحل لما يخلص **مش** إنك ترفعه لـ 500: كل اتصال ليه رام، و ٥٠٠ process بيتخانقوا على نفس الـ CPU.

---

## ٣. [[psql "postgres://app_user:secret@localhost:6432/app"]]

نفس رابط القاعدة بالظبط، الفرق الوحيد البورت: [[6432]] (البورت المعتاد لـ PgBouncer) بدل [[5432]]. التطبيق مش محتاج يعرف إن فيه pooler.

جربنا نتصل من خلاله ونسأل السيرفر هو على أنهي بورت:

~~~text psql "postgres://app_user:secret@pg02-bouncer:6432/app" -c "select current_user, inet_server_port()"
 current_user | inet_server_port
--------------+------------------
 app_user     |             5432
~~~

احنا كلمنا 6432، بس اللي رد علينا Postgres على 5432 من ورا PgBouncer.

### التجربة: ٥٠ عميل في نفس الوقت

شغّلنا ٥٠ psql مع بعض، كل واحد بيعمل [[SELECT pg_sleep(3)]] (استنى ٣ ثواني)، وعدّينا الاتصالات على السيرفر وهم شغالين:

~~~text عن طريق PgBouncer (6432)
 count | state
-------+--------
    21 | active
~~~

~~~text مباشرة على Postgres (5432)
 count | state
-------+--------
    51 | active
    20 | idle
~~~

نقرا الأرقام:

| الرقم | ليه |
|---|---|
| 21 مع PgBouncer | ٢٠ اتصال (الـ [[default_pool_size]]) + اتصالنا اللي بيعدّ. الـ ٣٠ الباقيين استنوا دورهم في طابور جوه PgBouncer، وبعضهم طبع [[NOTICE:  No server connection available in postgres backend, client being queued]] |
| 51 مباشرة | كل عميل فتح process خاص بيه + اتصالنا |
| 20 idle | دول اتصالات PgBouncer نفسه: خلّصوا شغلهم وفضلوا مفتوحين جاهزين للطلب الجاي |

يعني مع الـ pooler السيرفر عمره ما شاف أكتر من ٢١ اتصال، حتى لو العملاء ٥٠ أو ٥٠٠.

---

## ٤. [[...pooler.supabase.com:6543/postgres?pgbouncer=true]]

نفس الفكرة بس الـ pooler بتاع Supabase (Supavisor):

| الحتة | معناها |
|---|---|
| [[:6543]] | transaction mode |
| [[:5432]] على نفس الهوست | session mode |
| [[?pgbouncer=true]] | باراميتر لـ Prisma مش لـ Postgres: «في pooler بـ transaction mode، متستخدمش prepared statements» |

### transaction mode مقابل session mode

| | transaction | session |
|---|---|---|
| الاتصال الحقيقي ملكك امتى | طول transaction واحدة | لحد ما تقفل |
| الكفاءة | أعلى | أقل |
| [[SET]] و prepared statements و [[LISTEN]] | مش مضمونين (الاستعلام الجاي ممكن يروح لاتصال تاني) | شغالين |
| مناسب لـ | التطبيق | migrations و pg_dump |

---

## الخلاصة

- [[max_connections]] حد للسيرفر، والحل لما يخلص pooler مش رقم أكبر.
- التطبيق على الـ pooler (6432 عندك أو 6543 في Supabase)، والـ migrations على اتصال كامل (5432).
- [[pg_stat_activity]] مع [[backend_type = 'client backend']] هو اللي يقولك الاتصالات الحقيقية كام، و [[idle]] كتير من غير pooler يعني الـ pool في كود التطبيق أكبر من اللازم.`,
          lines: [
            "الاتصالات بحالتها: idle كتير يعني الـ pool في الكود أكبر من اللازم.",
            "الحد.",
            "عبر PgBouncer على سيرفرك (6432).",
            "عبر pooler بتاع Supabase (6543) بـ transaction mode."
          ],
          sol: R`الشكل الصح في [[.env]]: [[DATABASE_URL="postgres://postgres.PROJECTREF:PASS@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"]] و [[DIRECT_URL="postgres://postgres.PROJECTREF:PASS@aws-0-REGION.pooler.supabase.com:5432/postgres"]]. التطبيق بيستخدم الأول (transaction mode)، و [[prisma migrate]] بيستخدم التاني (session mode)، لأن الـ migrations محتاجة جلسة كاملة وأقفال.

في Prisma 7 الـ URL بتاع CLI بيتحط في [[prisma.config.ts]] جوه [[datasource: { url: env("DIRECT_URL") }]]، والتطبيق بياخد [[DATABASE_URL]] من خلال الـ adapter في الكود.

المشاكل اللي بتقول إنك عكستهم: [[prepared statement "s0" already exists]] يعني التطبيق على 6543 من غير [[pgbouncer=true]]. و [[migrate dev]] يعلّق أو يقول إنه مش قادر ياخد advisory lock يعني الـ migrations شغالة على 6543. و [[SELECT count(*), state FROM pg_stat_activity GROUP BY state]] مع pooling شغال المفروض يفضل رقم ثابت صغير حتى لو عندك functions كتير شغالة.`
        },
        {
          cmd: "الاستعلامات البطيئة",
          title: "log_min_duration و pg_stat_statements",
          desc: "بدل ما تخمّن أنهي استعلام بطيء، خلّي Postgres يسجّل أي استعلام أخد أكتر من حد معين. و [[pg_stat_statements]] بيجمّع إحصائيات كل الاستعلامات: مين اتنفّذ أكتر وأخد وقت أكتر في المجموع.",
          example: R`ALTER SYSTEM SET log_min_duration_statement = '500ms';
SELECT pg_reload_conf();
sudo tail -f /var/log/postgresql/postgresql-16-main.log
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT calls, round(mean_exec_time) AS ms, left(query, 80) FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;
SELECT pg_stat_statements_reset();`,
          try: "فعّل اللوج على 500ms، استخدم الموقع شوية، واقرا اللوج: الاستعلامات اللي هتظهر هي أول حاجة تحطلها index.",
          deep: {
            why: "الموقع بطيء في أوقات معينة ومش عارف أنهي صفحة أو استعلام. بدل التخمين، خلّي Postgres يسجّل.",
            how: R`[[log_min_duration_statement]] بيسجّل أي استعلام أخد أكتر من القيمة دي في لوج Postgres، مع النص الكامل والوقت. 500ms بداية كويسة، وعلى موقع سريع 100ms. [[0]] يسجّل كل حاجة (للتشخيص القصير بس، اللوج هيكبر بسرعة).

اللوج على أوبونتو في [[/var/log/postgresql/]]، وجوه Docker في [[docker logs db]].

[[pg_stat_statements]] extension بيجمّع إحصائيات بشكل مختلف: لكل «شكل استعلام» (بيوحّد القيم)، عدد مرات التنفيذ ومتوسط الوقت والمجموع. الترتيب بـ [[total_exec_time]] بيوريك الاستعلامات اللي واكلة أكتر وقت إجمالًا، وأحيانًا ده استعلام سريع بيتنفذ ١٠ آلاف مرة مش الاستعلام البطيء. لازم [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات وريستارت، وبعدين CREATE EXTENSION.

[[reset()]] بيصفّر الإحصائيات عشان تقيس فترة معينة.

في Supabase الـ extension مفعّلة، وفي لوحة التحكم تحت Reports ثم Query Performance.`,
            when: "بعد أي شكوى من البطء. وشهريًا تبص على أعلى ١٠.",
            mistakes: "log_min_duration_statement = 0 على الإنتاج وتنساه، فالديسك يتملى لوجات."
          },
          teach: R`## الفكرة: خلّي Postgres هو اللي يقولك مين البطيء

طريقتين بيكمّلوا بعض: **اللوج** بيسجّل كل استعلام عدّى حد معين (بنصه ووقته)، و **[[pg_stat_statements]]** بيجمّع لكل شكل استعلام: اتنفّذ كام مرة وأخد كام في المجموع.

اتجرّب على مكانين: Postgres 16 المتسطّب من [[apt]] جوه container [[ubuntu:24.04]] (عشان مسار اللوج بتاع أوبونتو)، و container [[postgres:16]] متشغّل بـ [[-c shared_preload_libraries=pg_stat_statements]] (عشان الـ extension).

---

## ١. [[ALTER SYSTEM SET log_min_duration_statement = '500ms';]]

| الحتة | معناها |
|---|---|
| [[ALTER SYSTEM SET]] | غيّر إعداد للسيرفر كله ويفضل بعد الريستارت (مش للجلسة دي بس زي [[SET]]) |
| [[log_min_duration_statement]] | «سجّل أي statement أخد المدة دي أو أكتر» |
| [['500ms']] | نص ثانية. ممكن [['1s']] أو [['100ms']] |

القيمة الافتراضية [[-1]] يعني «متسجّلش حاجة»، و [[0]] يعني «سجّل كل حاجة» (للتشخيص دقايق بس).

[[ALTER SYSTEM]] مش بيعدّل [[postgresql.conf]]، بيكتب في ملف جنبه اسمه [[postgresql.auto.conf]]، وده بيتقري بعد الأول فبيكسب:

~~~text cat /var/lib/postgresql/16/main/postgresql.auto.conf
# Do not edit this file manually!
# It will be overwritten by the ALTER SYSTEM command.
log_min_duration_statement = '500ms'
~~~

بس لسه متطبّقش: [[SHOW log_min_duration_statement]] في نفس اللحظة طلّع [[-1]].

## ٢. [[SELECT pg_reload_conf();]]

بيبعت للسيرفر signal اسمها [[SIGHUP]] معناها «اقرا الإعدادات تاني»، من غير ريستارت ومن غير ما حد يتفصل. بيرجّع [[t]] (true) يعني الإشارة اتبعتت. واللوج بيأكّد:

~~~text الناتج في اللوج
LOG:  received SIGHUP, reloading configuration files
LOG:  parameter "log_min_duration_statement" changed to "500ms"
~~~

الإعداد بيتطبق بعد لحظة، مش في نفس السطر: في container [[postgres:16]] عملنا [[ALTER SYSTEM RESET]] و [[pg_reload_conf()]] و [[SHOW]] في نفس الأمر، والـ [[SHOW]] لسه قال [[500ms]]. من جلسة جديدة بيظهر الجديد.

## ٣. [[sudo tail -f /var/log/postgresql/postgresql-16-main.log]]

- [[tail]] بيعرض آخر سطور الملف، و [[-f]] (follow) بيفضل فاتح ويطبع أي سطر جديد يتكتب (تخرج بـ Ctrl+C).
- [[sudo]] لأن فولدر اللوجات مش مقروء لأي يوزر.
- [[16-main]]: نسخة 16، والـ cluster اسمه [[main]]. [[pg_lsclusters]] بيقولك المسار عندك.

جرّبناه بـ [[SELECT pg_sleep(0.7), count(*) FROM users;]] ([[pg_sleep(0.7)]] بتستنى ٠.٧ ثانية، عشان نضمن استعلام بطيء):

~~~text الناتج
2026-10-06 16:47:40.879 UTC [6043] postgres@lab LOG:  duration: 712.525 ms  statement: SELECT pg_sleep(0.7), count(*) FROM users;
~~~

| الحتة | معناها |
|---|---|
| [[2026-10-06 16:47:40.879 UTC]] | امتى خلص |
| [[6043]] بين القوسين | الـ pid بتاع الـ process اللي نفّذه |
| [[postgres@lab]] | اليوزر @ القاعدة |
| [[duration: 712.525 ms]] | المدة |
| [[statement: ...]] | الاستعلام بالكامل |

و [[SELECT pg_sleep(0.2);]] بعده **مظهرش** لأنه أقل من 500ms.

> في Docker مفيش ملف لوج: الكلام ده بيطلع في [[docker logs اسم_الـcontainer]]. وشكل السطر أقصر: [[LOG:  duration: 601.669 ms  statement: SELECT pg_sleep(0.6)]] من غير [[postgres@lab]]، لأن الـ image الرسمية مش حاطة اليوزر والقاعدة في أول السطر ([[log_line_prefix]]) زي أوبونتو.

---

## ٤. [[CREATE EXTENSION IF NOT EXISTS pg_stat_statements;]]

[[EXTENSION]] إضافة جاية مع Postgres بتتفعّل لكل قاعدة لوحدها، و [[IF NOT EXISTS]] عشان ميطلعش error لو مفعّلة.

بس الإضافة دي لازم تتحمّل مع تشغيل السيرفر. على أوبونتو من غير ما نجهّز حاجة:

~~~text الناتج
CREATE EXTENSION
ERROR:  pg_stat_statements must be loaded via shared_preload_libraries
~~~

الـ [[CREATE]] نجح، وأول [[SELECT]] منه فشل. الحل سطر في [[postgresql.conf]] وريستارت (مش reload):

~~~text postgresql.conf
shared_preload_libraries = 'pg_stat_statements'
~~~

وفي Docker بتتحط في الأمر: [[docker run ... postgres:16 -c shared_preload_libraries=pg_stat_statements]] (أو [[command:]] في compose). بعدها [[SHOW shared_preload_libraries;]] طلّع [[pg_stat_statements]].

## ٥. أعلى ١٠ استعلامات

~~~sql
SELECT calls, round(mean_exec_time) AS ms, left(query, 80) FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;
~~~

| الحتة | معناها |
|---|---|
| [[calls]] | اتنفّذ كام مرة |
| [[mean_exec_time]] | متوسط الوقت بالـ ms، و [[round()]] بتقرّبه لرقم صحيح، و [[AS ms]] اسم العمود |
| [[left(query, 80)]] | أول ٨٠ حرف من الاستعلام بس، عشان الجدول ميتمطّش |
| [[ORDER BY total_exec_time DESC]] | رتّب بالوقت **الإجمالي** (المرات × المتوسط)، الأكبر الأول |
| [[LIMIT 10]] | أول ١٠ |

جرّبنا: شغّلنا استعلام سريع ٣٠٠٠ مرة بقيم مختلفة ([[WHERE msg = 'log 1']] و [['log 2']] ...)، و [[pg_sleep(1.5)]] مرة واحدة:

~~~text الناتج
 calls |  ms  |                     left
-------+------+-----------------------------------------------
  3000 |    5 | SELECT * FROM app_logs WHERE msg = $1
     1 | 1502 | SELECT pg_sleep($1)
     1 |    0 | SELECT pg_stat_statements_reset()
     3 |    0 | SELECT count(*) FROM orders WHERE amount > $1
~~~

نقرا الناتج:

- [[$1]] مكان القيمة: الـ ٣٠٠٠ استعلام اتجمّعوا في سطر واحد لأنهم نفس **الشكل**.
- الاستعلام اللي متوسطه [[5]] ms بس فوق اللي متوسطه [[1502]]. ليه؟ لأن ٣٠٠٠ × ٥ تقريبًا ١٥ ثانية من وقت السيرفر، والبطيء ١.٥ ثانية بس. يعني الـ index على [[msg]] هيوفّر أكتر بكتير من إنك تصلّح البطيء. ده اللي اللوج لوحده مكانش هيوريهولك (ولا واحد من الـ ٣٠٠٠ عدّى 500ms).

## ٦. [[SELECT pg_stat_statements_reset();]]

بيصفّر الإحصائيات. بعده [[SELECT count(*) FROM pg_stat_statements]] طلّع [[1]] (الـ reset نفسه). مفيد عشان تقيس فترة معينة: صفّر، سيب الموقع يشتغل يوم، وبص.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تشوف كل استعلام بطيء بنصه ووقته | [[log_min_duration_statement]] + [[pg_reload_conf()]] + اللوج |
| مين واكل وقت السيرفر إجمالًا | [[pg_stat_statements]] مترتب بـ [[total_exec_time]] |
| تفعّل [[pg_stat_statements]] | [[shared_preload_libraries]] + ريستارت + [[CREATE EXTENSION]] |
| ترجّع اللوج زي ما كان | [[ALTER SYSTEM RESET log_min_duration_statement;]] + reload |

ومتسيبش [[log_min_duration_statement = 0]] على الإنتاج: اللوج هيملى الديسك.`,
          lines: [
            "سجّل أي استعلام أبطأ من نص ثانية.",
            "طبّق.",
            "تابع اللوج.",
            "فعّل extension الإحصائيات (بعد shared_preload_libraries وريستارت).",
            "أعلى ١٠ استعلامات في الوقت الإجمالي، بعدد المرات والمتوسط.",
            "صفّر عشان تقيس فترة جديدة."
          ],
          sol: R`بعد ما تفعّله، أي استعلام أبطأ من نص ثانية بيظهر في اللوج كده:

[[2026-09-30 04:57:27.272 UTC [25161] postgres@lab LOG:  duration: 702.895 ms  statement: SELECT pg_sleep(0.7), count(*) FROM users]]. فيه الوقت، والـ pid، واليوزر@القاعدة، والمدة، والاستعلام كامل. جرّب بنفسك بـ [[SELECT pg_sleep(0.7);]] عشان تتأكد إن الإعداد اشتغل قبل ما تستنى استعلام حقيقي.

خلي بالك: [[pg_reload_conf()]] بيبعت signal وبيطبق بعد لحظة، مش في نفس اللحظة. والـ [[pg_stat_statements]] مش هيشتغل من [[CREATE EXTENSION]] بس: أول SELECT منه هيقولك [[pg_stat_statements must be loaded via shared_preload_libraries]]. لازم تضيفه في [[shared_preload_libraries]] وتعمل ريستارت (في Supabase مفعّل جاهز). ولما تخلص رجّع اللوج بـ [[ALTER SYSTEM RESET log_min_duration_statement;]] أو سيبه على رقم أكبر، عشان حجم اللوج.`
        },
        {
          cmd: "النقل بين سيرفرين",
          title: "dump | psql عبر SSH",
          desc: "نقل قاعدة من سيرفر لسيرفر، أو من Supabase لـ VPS، من غير ملف وسيط: pg_dump على مصدر بيطلع على pipe، و psql على الهدف بيقرا منه. والنسخ الكبيرة بملف مضغوط عبر scp.",
          example: R`pg_dump "postgres://user:pass@old-server/app" | psql "postgres://user:pass@new-server/app"
ssh deploy@old "sudo -u postgres pg_dump app | gzip" | gunzip | psql "$NEW_URL"
pg_dump -Fc "$OLD_URL" -f app.dump && pg_restore -d "$NEW_URL" --no-owner --no-privileges app.dump
psql "$NEW_URL" -c "SELECT count(*) FROM users;"`,
          try: "انقل قاعدة تجربة بالطريقة الأولى وقارن عدد الصفوف في الاتنين.",
          deep: {
            why: "بتنقل من Hostinger لسيرفر أكبر، أو من Supabase لـ VPS، أو العكس. البيانات لازم توصل كاملة وصح.",
            how: R`الـ pipe الأول: [[pg_dump]] بيكتب SQL على stdout، و [[psql]] بيقراه من stdin وينفّذه على الهدف. مفيش ملف وسيط، ومناسب لقاعدة لحد كام جيجا. لازم القاعدة على الهدف تكون موجودة وفاضية.

الطريقة التانية لما السيرفر القديم مش متاح من جهازك مباشرة: ssh بينفّذ pg_dump هناك ويضغط، والناتج بيعدّي في SSH لجهازك، يتفك، ويدخل psql. كل ده streaming. و [[sudo -u postgres]] لأن Postgres على أوبونتو بيدخّل اليوزر [[postgres]] من الـ socket المحلي بس لو انت فعلًا يوزر النظام [[postgres]] (peer authentication)، فـ [[pg_dump -U postgres]] من يوزر deploy بيفشل. وده محتاج deploy يقدر يعمل sudo من غير باسورد، لأن ssh مفيهوش terminal يكتب فيه الباسورد.

التالتة الأثبت للقواعد الكبيرة: dump بصيغة custom لملف، وبعدين restore. [[--no-owner --no-privileges]] لأن اليوزرز على السيرفر الجديد مختلفين، وهتعمل GRANT من جديد.

بعد النقل: عدّ الصفوف في أهم الجداول على الاتنين. وشغّل [[ANALYZE]] على الهدف عشان الإحصائيات. وحدّث DATABASE_URL في التطبيق.

الـ downtime: أثناء النقل أي كتابة على القديم بتضيع. الأبسط وقف التطبيق، نقل، تشغيل على الجديد. للصفر downtime محتاج replication، وده موضوع أكبر.`,
            when: "تغيير الاستضافة. ترقية Postgres بين نسخ رئيسية (dump من القديم و restore في الجديد أبسط من pg_upgrade).",
            mistakes: "تنقل وانت التطبيق شغال بيكتب، فتفقد آخر دقايق. وتنسى ANALYZE فالاستعلامات بطيئة أول ساعة."
          },
          teach: R`## الفكرة: [[pg_dump]] بيكتب، و [[psql]] بيقرا، والـ pipe بيوصّلهم

[[pg_dump]] بيطبع القاعدة كأوامر SQL، و [[psql]] بينفّذ أي SQL يدخله. لو حطيت بينهم [[|]] (pipe: ناتج الأمر اللي على الشمال يدخل للي على اليمين)، البيانات بتتنقل من سيرفر لسيرفر من غير ما تتكتب في ملف.

اتجرّب على ٣ containers: [[postgres:16]] قديم فيه قاعدة [[app]] (جداول [[users]] و [[orders]] بـ ٥ صفوف، و [[app_logs]] بـ ١٠٠ ألف)، و [[postgres:16]] جديد فاضي، و [[ubuntu:24.04]] فيه Postgres 16 من [[apt]] و SSH عشان نجرّب السطر التاني زي سيرفر حقيقي.

قبل أي سطر: القاعدة على السيرفر الجديد لازم تبقى **موجودة وفاضية**:

~~~bash
psql "postgres://postgres:secret@new-server/postgres" -c "CREATE DATABASE app"
~~~

---

## ١. [[pg_dump "$OLD" | psql "$NEW"]]

~~~bash
pg_dump "postgres://user:pass@old-server/app" | psql "postgres://user:pass@new-server/app"
~~~

- [[pg_dump "postgres://..."]]: اعمل dump للقاعدة اللي في الرابط ده. من غير [[-f]] ومن غير [[-Fc]] بيطبع SQL نص على الشاشة (stdout).
- [[|]]: بدل الشاشة، ابعته لـ psql.
- [[psql "postgres://..."]]: اتصل بالسيرفر الجديد ونفّذ اللي جايلك من الـ pipe (stdin).
- العلامات [[" "]] حوالين الرابط عشان الـ shell ميفسّرش أي رمز فيه.

اللي psql طبعه (عدّينا السطور المتكررة):

~~~text الناتج (ملخص)
     11 SET
     10 ALTER TABLE
      3 CREATE TABLE
      3 CREATE SEQUENCE
      2 COPY 5
      1 COPY 100000
      3 setval
      2 ERROR:  role "app_user" does not exist
~~~

كل سطر هنا رد أمر اتنفّذ: [[CREATE TABLE]] عمل جدول، و [[COPY 5]] حمّل ٥ صفوف، و [[setval]] ظبط الـ sequence. بس بص على الـ [[ERROR]]: جدول [[orders]] على السيرفر القديم ملك يوزر اسمه [[app_user]]، والـ dump فيه [[ALTER TABLE public.orders OWNER TO app_user;]]، واليوزر ده مش موجود على الجديد.

والأخطر: [[echo $?]] بعدها طلّع [[0]]. psql كمّل بعد الـ error وقال «تمام». عشان كده:

~~~bash
pg_dump "$OLD" | psql -v ON_ERROR_STOP=1 "$NEW"
~~~

[[-v ON_ERROR_STOP=1]] خلّاه يقف عند أول error ويطلع بـ [[3]]. والحل نفسه يا تعمل الـ role على الجديد الأول ([[CREATE ROLE app_user LOGIN PASSWORD '...']])، يا تستخدم السطر التالت.

---

## ٢. عن طريق SSH ومضغوط

~~~bash
ssh deploy@old "sudo -u postgres pg_dump app | gzip" | gunzip | psql "$NEW_URL"
~~~

ده لما السيرفر القديم مش فاتح بورت Postgres لبره (وده الصح)، بس انت تقدر تدخله SSH. نفكّه بترتيب ما البيانات بتمشي:

| الحتة | بتشتغل فين | بتعمل إيه |
|---|---|---|
| [[ssh deploy@old "..."]] | جهازك | ادخل السيرفر القديم كيوزر [[deploy]] ونفّذ اللي بين العلامات **هناك** |
| [[sudo -u postgres pg_dump app]] | السيرفر القديم | dump كيوزر النظام [[postgres]] ([[-u]] من user) |
| [[gzip]] | السيرفر القديم | اضغط الناتج قبل ما يعدّي على الشبكة |
| [[gunzip]] | جهازك | فك الضغط (اللي جاي من ssh بالـ pipe) |
| [[psql "$NEW_URL"]] | جهازك | نفّذه على السيرفر الجديد |

الضغط بيفرق: dump قاعدة صغيرة كان ١١٠٧ بايت، ومضغوط ٥٨٥.

### ليه [[sudo -u postgres]] مش [[-U postgres]]؟

جرّبنا الأول [[pg_dump -U postgres app]] زي ما ناس كتير بتكتبه:

~~~text الناتج
pg_dump: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  Peer authentication failed for user "postgres"
~~~

Postgres على أوبونتو بيستخدم **peer authentication** للاتصال المحلي: بيسأل النظام «مين يوزر النظام اللي بيتصل؟»، ولازم يبقى نفس اسم يوزر Postgres. انت [[deploy]]، فـ [[-U postgres]] اترفض. [[sudo -u postgres]] بيشغّل الأمر كيوزر النظام [[postgres]] فعلًا، فبيعدّي.

وده محتاج deploy يعمل sudo **من غير باسورد**، لأن ssh مفيهوش شاشة تكتب فيها الباسورد. من غير كده:

~~~text الناتج
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
sudo: a password is required
~~~

اللي جربنا بيه سطر في [[/etc/sudoers.d/deploy]] بيسمح بـ [[pg_dump]] بس:

~~~text /etc/sudoers.d/deploy
deploy ALL=(postgres) NOPASSWD: /usr/bin/pg_dump
~~~

### الفخ: الفشل بيعدّي ساكت

لما [[pg_dump]] فشل بالـ peer error فوق، السطر كله رجّع exit code [[0]]. ليه؟ الـ exit code بتاع أي pipe هو بتاع **آخر** أمر: [[psql]] استلم ولا حاجة ونفّذها بنجاح. حتى [[set -o pipefail]] عندك مش كفاية، لأن ssh بيرجّع exit code آخر أمر **هناك**، وهو [[gzip]] اللي نجح:

| التجربة | exit code |
|---|---|
| من غير pipefail | [[0]] |
| [[set -o pipefail]] عندك بس | [[0]] |
| pipefail عندك **وجوه** أمر ssh: [[ssh deploy@old "set -o pipefail; ..."]] | [[1]] |

فالقاعدة: [[set -o pipefail]] في الناحيتين، و**عدّ الصفوف** في الآخر مهما الأمر قال.

---

## ٣. القواعد الكبيرة: ملف وبعدين restore

~~~bash
pg_dump -Fc "$OLD_URL" -f app.dump && pg_restore -d "$NEW_URL" --no-owner --no-privileges app.dump
~~~

- [[$OLD_URL]] و [[$NEW_URL]]: متغيرات فيها الرابطين، معرّفين قبلها بـ [[export OLD_URL="postgres://..."]].
- [[-Fc -f app.dump]]: صيغة custom مضغوطة في ملف (شوف «pg_dump بعمق»).
- [[&&]]: شغّل اللي بعدها **بس لو** اللي قبلها نجح. لو الـ dump فشل، مفيش restore بملف ناقص.
- [[--no-owner]]: متحاولش ترجّع [[OWNER TO app_user]]، فكل حاجة تبقى ملك اللي بيرجّع.
- [[--no-privileges]]: متحاولش ترجّع الـ [[GRANT]] و [[REVOKE]]، لأنها لأدوار ممكن متكونش موجودة. هتعمل الصلاحيات من جديد على السيرفر الجديد.

النتيجة: exit code [[0]] ومفيش ولا error، و [[\dt]] على الجديد:

~~~text الناتج
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | app_logs | table | postgres
 public | orders   | table | postgres
 public | users    | table | postgres
~~~

[[orders]] بقى ملك [[postgres]] بدل [[app_user]]. وليه ملف أحسن للقواعد الكبيرة؟ لو النقل وقع في النص، الملف موجود وتعيد الـ restore بس، و [[pg_restore -j 4]] بيرجّع بـ ٤ عمليات مع بعض.

---

## ٤. [[psql "$NEW_URL" -c "SELECT count(*) FROM users;"]]

~~~text الناتج (على القديم والجديد)
 count
-------
     5
~~~

ولو عايز تقارن كل الجداول مرة واحدة:

~~~sql
SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY relname;
~~~

~~~text الناتج على الجديد
 relname  | n_live_tup
----------+------------
 app_logs |     100000
 orders   |          5
 users    |          5
~~~

[[pg_stat_user_tables]] فيه إحصائيات كل جدول، و [[n_live_tup]] (live tuples) عدد الصفوف **التقريبي**. للتأكيد النهائي [[count(*)]] على أهم الجداول. وبعدها [[ANALYZE]] على الجديد عشان الـ planner يعرف حجم الجداول من أول استعلام.

---

## الخلاصة

| الطريقة | امتى | خد بالك من |
|---|---|---|
| pipe مباشر | الاتنين متاحين من جهازك، والقاعدة صغيرة | [[-v ON_ERROR_STOP=1]] |
| عن طريق ssh ومضغوط | القديم وراه SSH بس | [[sudo -u postgres]]، و pipefail في الناحيتين |
| ملف [[-Fc]] و [[pg_restore]] | القواعد الكبيرة، واليوزرز مختلفين | [[--no-owner --no-privileges]] |

ووقّف التطبيق قبل النقل: أي كتابة على القديم بعد ما الـ dump يبدأ مش هتوصل للجديد.`,
          lines: [
            "dump من القديم مباشرة في psql على الجديد (من غير ملف).",
            "القديم مش متاح من جهازك: dump عبر SSH (كيوزر postgres) ومضغوط، يتفك ويدخل الجديد.",
            "للقواعد الكبيرة: ملف custom وبعدين restore من غير مالكين وصلاحيات.",
            "اتأكد من العدد على الجديد."
          ],
          sol: R`[[pg_dump "$OLD" | psql "$NEW"]] بيطبع سيل من [[SET]] و [[CREATE TABLE]] و [[ALTER TABLE]] و [[COPY 5]] لكل جدول، وأرقام [[setval]] للـ sequences. بعدها [[SELECT count(*) FROM users]] على الاتنين لازم يطلّع نفس الرقم (في التجربة [[5]] و [[5]]).

قارن كذا جدول مش جدول واحد. والطريقة الأسرع إنك تقارن كل الجداول مرة واحدة:

[[SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY relname;]] (دا تقريبي، بس [[count(*)]] هو الدقيق).

المشاكل الشائعة: [[role "app_user" does not exist]] لأن الـ dump فيه OWNER لأدوار مش موجودة على السيرفر الجديد، الحل تعمل الـ role الأول أو تستخدم [[--no-owner --no-privileges]]. وكمان إن القاعدة الجديدة لازم تبقى موجودة وفاضية قبلها، وإلا [[already exists]] errors. وخلي بالك إن الـ pipe مش بيقف عند أول error، فزوّد [[-v ON_ERROR_STOP=1]] على psql.

وفي طريقة SSH: لو [[pg_dump]] فشل هناك (زي [[Peer authentication failed for user "postgres"]] لو كتبت [[pg_dump -U postgres]] من يوزر deploy)، الـ pipe كله بيرجع exit code [[0]] لأن psql استلم ملف فاضي ونجح. و [[set -o pipefail]] لازم على الناحيتين: عندك، وجوه الأمر اللي ssh بينفّذه ([[ssh deploy@old "set -o pipefail; sudo -u postgres pg_dump app | gzip"]])، لأن ssh بيرجّع exit code آخر أمر هناك وهو [[gzip]] اللي نجح. وعدّ الصفوف دايمًا.`
        },
        {
          cmd: "ترقية Postgres في Docker",
          title: "من 16 لـ 18 من غير ما تضيّع الداتا",
          desc: "تغيير [[postgres:16]] لـ [[postgres:18]] في compose مش ترقية: النسخة الجديدة مش بتقرا ملفات القديمة وهتقع. الطريق الأبسط: وقّف الكتابة، dump كامل بـ [[pg_dumpall]]، شغّل 18 على volume جديد، ورجّع. خلّي الـ volume القديم لحد ما تتأكد.",
          example: R`docker compose stop api
docker compose exec -T db pg_dumpall -U postgres > all-16.sql
docker compose stop db
docker run -d --name pg18 -e POSTGRES_PASSWORD=secret -v pgdata18:/var/lib/postgresql postgres:18
docker exec -i pg18 psql -U postgres < all-16.sql
docker exec pg18 psql -U postgres -c "SELECT version();"`,
          try: "جرّبها على سيرفر التجربة، وقارن count(*) لأهم جدول قبل وبعد، وبعدين غيّر compose.yml للـ image والـ volume الجداد.",
          deep: {
            why: "كل نسخة رئيسية بتتدعم ٥ سنين بس (16 لحد نوفمبر 2028)، والنسخ الجديدة أسرع. بس ملفات البيانات مش متوافقة بين النسخ الرئيسية، فالترقية خطوة لازم تتعمل صح.",
            how: R`النسخ الصغيرة (16.4 لـ 16.8) مجرد تغيير tag وريستارت. النسخ الرئيسية محتاجة نقل.

[[pg_dumpall]] بياخد كل القواعد واليوزرز في ملف SQL واحد، و [[-T]] من غير TTY عشان الـ redirect. وقّف التطبيق الأول وإلا أي كتابة بعد الـ dump تضيع.

من 18 مسار الـ volume بقى [[/var/lib/postgresql]]. استنى القاعدة الجديدة تقوم ([[pg_isready]]) قبل الترجيع، والـ error بتاع «role postgres already exists» عادي. للقواعد الضخمة [[pg_upgrade]] أسرع بس أعقد في Docker. بعد الترجيع اعمل [[ANALYZE]].`,
            when: "لما نسختك تقرّب من نهاية الدعم، أو محتاج ميزة جديدة. ودايمًا بعد باك أب مجرَّب.",
            mistakes: "تغيّر الـ tag بس وتعمل up. وتمسح الـ volume القديم قبل ما تتأكد. وتنسى إن extensions زي PostGIS لازم تكون موجودة في الـ image الجديدة."
          },
          teach: R`## الفكرة: الداتا تطلع SQL من القديمة، وتدخل الجديدة

ملفات الداتا بتاعة Postgres 16 مش بتتقري بـ Postgres 18. فبدل ما تغيّر رقم الـ image، بتطلّع كل حاجة كـ SQL بـ [[pg_dumpall]] من 16، وتشغّل 18 على volume **جديد** فاضي، وتنفّذ الـ SQL فيه. والـ volume القديم بيفضل زي ما هو، فلو حاجة باظت ترجع له.

اتجرّب كامل على Docker Desktop: مشروع compose فيه [[db]] على [[postgres:16]] (فيه يوزر [[app_user]] وقاعدة [[app]] وجدول [[users]] بـ ١٢٣٤ صف)، و [[api]] واقف مكان التطبيق. وفي التجربة الأسامي كان قدامها [[pg02-]] ([[pg02-pg18]] و [[pg02-pgdata18]]) عشان متتلخبطش مع containers تانية على الجهاز.

---

## ١. [[docker compose stop api]]

[[stop]] بيوقّف الـ service من غير ما يمسحها (عكس [[down]]). بنوقّف التطبيق الأول ليه؟ لأن أي صف يتكتب بعد ما الـ dump يبدأ مش هيبقى فيه، ويضيع لما تنقل.

~~~text الناتج
 Container pg02up-api-1 Stopped
~~~

## ٢. [[docker compose exec -T db pg_dumpall -U postgres > all-16.sql]]

| الحتة | معناها |
|---|---|
| [[docker compose exec db]] | نفّذ أمر جوه container الـ service اللي اسمها [[db]] |
| [[-T]] | من غير TTY (شاشة وهمية) |
| [[pg_dumpall]] | dump لـ **كل** القواعد واليوزرز والصلاحيات، مش قاعدة واحدة زي [[pg_dump]] |
| [[-U postgres]] | اتصل كـ superuser (لازم عشان يقرا باسوردات اليوزرز) |
| [[> all-16.sql]] | الناتج يتكتب في ملف على **جهازك**، مش جوه الـ container |

### ليه [[-T]]؟

من غير [[-T]]، لو انت في terminal عادي، Docker بيعمل TTY للأمر، والـ TTY بيحوّل كل نهاية سطر لـ [[\r\n]] (زي ويندوز)، فالملف يبقى فيه حروف [[\r]] زيادة ممكن تبوّظ الـ SQL وقت الترجيع (ده من docs الـ Docker). مع [[-T]] الناتج بيعدّي زي ما هو. اتعمل الملف بـ exit code [[0]] وحجمه ٩٣١٩ بايت.

### جوه الملف إيه؟

~~~text grep -E "^(CREATE ROLE|ALTER ROLE|CREATE DATABASE)" all-16.sql
CREATE ROLE app_user;
ALTER ROLE app_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$...';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$...';
CREATE DATABASE app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
~~~

اليوزرز بباسورداتهم (متشفّرة)، والقواعد، وبعدهم جداول كل قاعدة وبياناتها. يعني الملف ده فيه كل حاجة، فعامله كسر: متسيبهوش على السيرفر بعد ما تخلص.

## ٣. [[docker compose stop db]]

بيوقّف 16. والـ volume بتاعه سليم: شغّلناه تاني بعد التجربة كلها وكان لسه [[1234]] صف على [[PostgreSQL 16.15]].

---

## ٤. [[docker run -d --name pg18 -e POSTGRES_PASSWORD=secret -v pgdata18:/var/lib/postgresql postgres:18]]

| الحتة | معناها |
|---|---|
| [[-d]] | شغّله في الخلفية (detached) |
| [[--name pg18]] | اسم الـ container |
| [[-e POSTGRES_PASSWORD=secret]] | باسورد [[postgres]]، والـ image بترفض تقوم من غيره |
| [[-v pgdata18:/var/lib/postgresql]] | volume **جديد** اسمه [[pgdata18]]، متركّب على المسار ده |
| [[postgres:18]] | النسخة الجديدة |

### ليه [[/var/lib/postgresql]] مش [[/var/lib/postgresql/data]]؟

من 18 الـ image بتحط الداتا في فولدر باسم النسخة جوه المسار ده:

~~~text docker exec pg18 bash -c 'ls /var/lib/postgresql; echo $PGDATA'
18
/var/lib/postgresql/18/docker
~~~

[[$PGDATA]] متغير بيقول الداتا فين. ولو جرّبت تركّب الـ volume القديم بتاع 16 على [[/var/lib/postgresql/data]] زي زمان، 18 بيرفض يقوم:

~~~text الناتج
Error: in 18+, these Docker images are configured to store database data in a
       format which is compatible with "pg_ctlcluster" (specifically, using
       major-version-specific directory names).
...
       Counter to that, there appears to be PostgreSQL data in:
         /var/lib/postgresql/data
~~~

ولو أجبرته بـ [[-e PGDATA=/var/lib/postgresql/data]] يقرا ملفات 16:

~~~text الناتج
FATAL:  database files are incompatible with server
DETAIL:  The data directory was initialized by PostgreSQL version 16, which is not compatible with this version 18.6 (Debian 18.6-1.pgdg13+2).
~~~

ده بالظبط اللي بيحصل لو غيّرت الـ tag بس وعملت [[up]].

### استنى لحد ما يقوم

أول تشغيل بيعمل القاعدة من الصفر وبياخد ثواني. [[pg_isready]] بيسأل «جاهز؟»:

~~~text docker exec pg18 pg_isready -U postgres
/var/run/postgresql:5432 - accepting connections
~~~

---

## ٥. [[docker exec -i pg18 psql -U postgres < all-16.sql]]

- [[-i]] (interactive): خلّي الـ stdin مفتوح، عشان الملف يدخل للـ container.
- [[< all-16.sql]]: الملف اللي على جهازك هو الـ stdin.
- [[psql -U postgres]]: نفّذ اللي جاي.

~~~text الناتج (الأهم)
CREATE ROLE
ERROR:  role "postgres" already exists
CREATE DATABASE
...
~~~

الـ [[ERROR]] ده **طبيعي**: [[pg_dumpall]] بيكتب [[CREATE ROLE]] لكل اليوزرز ومنهم [[postgres]]، و [[postgres]] موجود أصلًا في أي Postgres جديد. psql بيكمّل، والسطر اللي بعده ([[ALTER ROLE postgres ...]]) بيظبط الباسورد. أي error تاني غير ده اقراه.

## ٦. [[docker exec pg18 psql -U postgres -c "SELECT version();"]]

~~~text الناتج
 PostgreSQL 18.6 (Debian 18.6-1.pgdg13+2) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
~~~

والتأكيد الحقيقي العدد والمالك:

~~~text SELECT count(*) ... FROM users
1234|app_user
~~~

نفس الـ ١٢٣٤ صف، والجدول لسه ملك [[app_user]] لأن [[pg_dumpall]] نقل اليوزر نفسه.

---

## بعدها: compose.yml

~~~text compose.yml (الـ db بعد الترقية)
  db:
    image: postgres:18
    volumes:
      - pgdata18:/var/lib/postgresql
volumes:
  pgdata18:
~~~

تلات حاجات اتغيّرت: الـ tag، واسم الـ volume، ومسار التركيب. وبعدها [[ANALYZE]] على كل قاعدة، وسيب الـ volume القديم كام يوم قبل ما تمسحه.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| وقّف الكتابة | [[docker compose stop api]] |
| dump لكل حاجة | [[docker compose exec -T db pg_dumpall -U postgres > all-16.sql]] |
| وقّف القديمة (متمسحهاش) | [[docker compose stop db]] |
| الجديدة على volume جديد | [[postgres:18]] و [[-v اسم_جديد:/var/lib/postgresql]] |
| رجّع | [[docker exec -i ... psql -U postgres < all-16.sql]] |
| اتأكد | [[SELECT version()]] و [[count(*)]] |

النسخ الصغيرة (16.4 لـ 16.15) تغيير tag وريستارت بس. النسخ الكبيرة (16 لـ 18) لازم نقل.`,
          lines: [
            "وقّف التطبيق عشان مفيش كتابة تضيع.",
            "dump لكل القواعد واليوزرز من القديمة ([[-T]] عشان الـ redirect).",
            "وقّف القديمة (الـ volume بتاعها سليم للرجوع).",
            "Postgres 18 على volume جديد، على المسار الجديد.",
            "رجّع الـ dump فيها.",
            "اتأكد من النسخة."
          ],
          sol: R`[[docker exec pg18 psql -U postgres -c "SELECT version();"]] المفروض يبدأ بـ [[PostgreSQL 18.]]. و [[count(*)]] لأهم جدول لازم يبقى نفس الرقم قبل وبعد (في تجربة من 16 لـ 18 كان [[1234]] قبل و [[1234]] بعد).

أثناء الترجيع هتشوف [[ERROR:  role "postgres" already exists]]. دا طبيعي ومش مشكلة: [[pg_dumpall]] بيحاول يعمل كل الأدوار ومنهم postgres اللي موجود أصلًا. أي error تاني اقراه كويس.

في compose.yml بعدها: غيّر [[image: postgres:18]]، وغيّر الـ volume لاسم جديد، ومع 18 خلي الـ mount على [[/var/lib/postgresql]] مش [[/var/lib/postgresql/data]]، لأن 18 غيّر مكان الداتا الافتراضي. الغلط الأشهر إنك تشاور 18 على الـ volume القديم بتاع 16، فالـ container يقع ومايقومش، واللوج يقولك إن ملفات الداتا من نسخة تانية (زي [[database files are incompatible with server]]) أو إنه مش لاقي داتا في المكان الجديد. سيب الـ volume القديم كام يوم كـ rollback قبل ما تمسحه.`
        },
        {
          cmd: "الباك أب المجدول",
          title: "cron وسكربت ونسخة بره السيرفر",
          desc: "الباك أب اليومي سكربت بيعمل dump مضغوط بالتاريخ، يمسح الأقدم من أسبوعين، وينقل نسخة لمكان تاني (S3 أو سيرفر تاني)، لأن باك أب على نفس السيرفر بيروح معاه.",
          example: R`#!/usr/bin/env bash
set -euo pipefail
DIR=/home/deploy/backups/db
mkdir -p "$DIR"
FILE="$DIR/app-$(date +%F).dump"
pg_dump -h localhost -U postgres -d app -Fc -f "$FILE"
find "$DIR" -name 'app-*.dump' -mtime +14 -delete
rclone copy "$FILE" s3:mybucket/db/ 2>>"$DIR/rclone.log"
echo "backup ok: $FILE ($(du -h "$FILE" | cut -f1))"`,
          try: "حطه في crontab بتاع deploy: [[0 3 * * * /home/deploy/db-backup.sh >> /home/deploy/backups/db/cron.log 2>&1]].",
          flag: "script",
          deep: {
            why: "باك أب بإيدك بيتنسي. السكربت ده مع cron بيضمن نسخة يومية، وينضّف القديم، ويبعت نسخة بره السيرفر.",
            how: R`[[set -euo pipefail]] عشان لو pg_dump فشل السكربت يقف ومينضّفش القديم بناءً على نسخة فاشلة.

الاسم بالتاريخ [[app-2026-09-25.dump]]، وصيغة [[-Fc]] مضغوطة وبتسمح باسترجاع جزئي.

[[find -mtime +14 -delete]] بيحتفظ بأسبوعين. للأمان أكتر: يومي لأسبوعين، وأسبوعي لشهرين، وشهري لسنة (سكربت أطول).

[[rclone]] أداة بتنقل ملفات لأي تخزين سحابي (S3، Backblaze B2، Google Drive) بعد إعداد مرة واحدة بـ [[rclone config]]. B2 أرخص خيار عمليًا. و [[2>>]] بيحفظ أخطاء الرفع في لوج منفصل.

[[-h localhost]] بيخلي الاتصال TCP بباسورد بدل الـ socket المحلي، لأن على أوبونتو الـ socket بيستخدم peer authentication (يوزر النظام لازم يبقى نفس يوزر Postgres) فيوزر deploy مش هيدخل كـ postgres. والباسورد في [[~/.pgpass]] بسطر [[localhost:5432:app:postgres:الباسورد]] وصلاحيات [[chmod 600]]، وإلا pg_dump هيسأل عنه وcron مفيهوش حد يكتبه. واليوزر اللي بتتصل بيه لازم يقدر يقرا كل الجداول.

في cron: المسار الكامل للسكربت، والناتج للوج. وراقب اللوج: باك أب بيفشل بصمت من شهر أسوأ من مفيش باك أب لأنك مطمّن.`,
            when: "يوميًا الساعة ٣ الفجر (وقت الهدوء). ومع كل تغيير في القاعدة، جرّب الترجيع.",
            mistakes: "النسخة بره السيرفر بتتعمل «بعدين». والباك أب شغال بس عمره ما اتراقب."
          },
          teach: R`## الفكرة: ٩ سطور، و cron بيشغّلهم كل يوم

السكربت بيعمل ٣ حاجات: باك أب مضغوط باسم فيه تاريخ النهارده، يمسح الباك أبات الأقدم من أسبوعين، ويرفع نسخة بره السيرفر. و cron (برنامج في لينكس بيشغّل أوامر في مواعيد) بيشغّله كل يوم.

اتجرّب في container [[ubuntu:24.04]] فيه Postgres 16 من [[apt]]، ويوزر نظام اسمه [[deploy]]، و rclone 1.60.1 من [[apt]]، و cron شغال. السكربت محطوط في [[/home/deploy/db-backup.sh]] وبيتشغّل كـ [[deploy]] زي على سيرفر حقيقي.

---

## السطر ١ و ٢: [[#!/usr/bin/env bash]] و [[set -euo pipefail]]

الأول بيقول «شغّلني بـ bash». والتاني:

| الحتة | معناها هنا |
|---|---|
| [[-e]] | لو [[pg_dump]] فشل، اقف. متكمّلش تمسح القديم وترفع ملف بايظ |
| [[-u]] | متغير مكتوب غلط ([[$FIEL]]) يوقف السكربت بدل ما يبقى فاضي |
| [[-o pipefail]] | لو أمر في نص [[|]] فشل، الـ pipe كله فشل |

## السطر ٣ و ٤: الفولدر

~~~bash
DIR=/home/deploy/backups/db
mkdir -p "$DIR"
~~~

[[DIR=...]] متغير (من غير مسافات حوالين [[=]]). و [[mkdir -p]] بيعمل الفولدر وأي فولدر قبله ناقص، ومش بيطلع error لو موجود ([[-p]] من parents).

## السطر ٥: [[FILE="$DIR/app-$(date +%F).dump"]]

- [[$( )]]: شغّل الأمر اللي جوه وحط ناتجه مكانه.
- [[date +%F]]: التاريخ بصيغة سنة-شهر-يوم. [[%F]] اختصار [[%Y-%m-%d]]:

~~~text date +%F
2026-10-06
~~~

فـ [[FILE]] بقى [[/home/deploy/backups/db/app-2026-10-06.dump]]. والصيغة دي بالذات لأن الترتيب الأبجدي للأسامي = الترتيب بالتاريخ.

## السطر ٦: [[pg_dump -h localhost -U postgres -d app -Fc -f "$FILE"]]

[[-Fc]] صيغة custom مضغوطة (بتسمح ترجّع جدول واحد)، و [[-f]] الملف. والمهم هنا [[-h localhost]]:

### ليه [[-h localhost]]؟

من غيره pg_dump بيتصل بالـ socket المحلي، وPostgres على أوبونتو بيستخدم هناك **peer authentication**: يوزر النظام لازم يبقى نفس يوزر Postgres. احنا [[deploy]] وعايزين ندخل كـ [[postgres]]، فبيترفض:

~~~text الناتج من غير -h localhost
pg_dump: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  Peer authentication failed for user "postgres"
~~~

مع [[-h localhost]] الاتصال بقى TCP، و Postgres بيطلب باسورد. ومن غير باسورد محفوظ:

~~~text الناتج
Password:
pg_dump: error: connection to server at "localhost" (::1), port 5432 failed: fe_sendauth: no password supplied
~~~

[[Password:]] هو pg_dump بيسأل، ومفيش حد يكتب (لا في cron ولا هنا)، فـ [[fe_sendauth]] (fe = frontend يعني pg_dump نفسه) قال «مبعتش باسورد».

### [[~/.pgpass]]

ملف في بيت اليوزر فيه الباسوردات، سطر لكل اتصال: [[الهوست:البورت:القاعدة:اليوزر:الباسورد]].

~~~bash
echo 'localhost:5432:app:postgres:secret' > ~/.pgpass
chmod 600 ~/.pgpass
~~~

[[chmod 600]] يعني صاحب الملف بس يقرا ويكتب. من غيره:

~~~text الناتج
WARNING: password file "/home/deploy/.pgpass" has group or world access; permissions should be u=rw (0600) or less
~~~

وبيتجاهل الملف خالص. بعد [[chmod 600]] الـ dump نجح.

## السطر ٧: [[find "$DIR" -name 'app-*.dump' -mtime +14 -delete]]

| الحتة | معناها |
|---|---|
| [[find "$DIR"]] | دوّر جوه الفولدر ده |
| [[-name 'app-*.dump']] | الملفات اللي اسمها بالشكل ده بس (عشان ميمسحش اللوجات) |
| [[-mtime +14]] | آخر تعديل من **أكتر** من ١٤ يوم (mtime = modification time) |
| [[-delete]] | امسحهم |

جربناها بملفين مزيفين، واحد اتعمله [[touch -d "20 days ago"]] وواحد [[10 days ago]]:

~~~text ls قبل وبعد
قبل:  app-2026-09-16.dump  app-2026-09-26.dump  app-2026-10-06.dump
بعد:  app-2026-09-26.dump  app-2026-10-06.dump
~~~

بتاع ٢٠ يوم اتمسح، وبتاع ١٠ أيام فضل.

## السطر ٨: [[rclone copy "$FILE" s3:mybucket/db/ 2>>"$DIR/rclone.log"]]

- [[rclone copy]]: انسخ الملف لتخزين بره.
- [[s3:mybucket/db/]]: [[s3]] **اسم remote** انت عامله بـ [[rclone config]] (ممكن يكون AWS S3 أو Backblaze B2 أو غيره)، وبعد [[:]] الـ bucket والفولدر.
- [[2>>]]: الـ errors ([[2]] = stderr) تتضاف ([[>>]]) في آخر [[rclone.log]].

من غير ما تعمل [[rclone config]]:

~~~text rclone.log
NOTICE: Config file "/home/deploy/.config/rclone/rclone.conf" not found - using defaults
Failed to create file system for "s3:mybucket/db/": didn't find section in config file
~~~

يعني مفيش remote اسمه [[s3]]. ولأن [[set -e]]، السكربت وقف هنا ومطبعش السطر الأخير. (عشان نكمّل التجربة عرّفنا remote اسمه [[s3]] من نوع [[local]] بمتغير [[RCLONE_CONFIG_S3_TYPE=local]]، يعني بينسخ لفولدر على نفس الجهاز. على السيرفر بتعمل remote حقيقي.)

## السطر ٩: [[echo "backup ok: $FILE ($(du -h "$FILE" | cut -f1))"]]

من جوه لبرة: [[du -h "$FILE"]] بيطبع الحجم وبعده Tab والاسم، و [[cut -f1]] بياخد أول خانة (الحجم). والنتيجة:

~~~text الناتج
backup ok: /home/deploy/backups/db/app-2026-10-06.dump (4.0K)
~~~

[[4.0K]] والملف فعليًا ١٣١١ بايت؟ [[du]] (disk usage) بيعدّ المساحة اللي واخدها على الديسك، والديسك بيدّي مساحة بوحدات ٤ كيلو. [[du -h --apparent-size]] طلّع [[1.3K]].

---

## cron: كل يوم الساعة ٣

~~~bash
crontab -e
~~~

بيفتح جدول مواعيد اليوزر ده، وتضيف سطر:

~~~text crontab
0 3 * * * /home/deploy/db-backup.sh >> /home/deploy/backups/db/cron.log 2>&1
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| دقيقة | [[0]] | الدقيقة صفر |
| ساعة | [[3]] | الساعة ٣ الفجر |
| يوم في الشهر | [[*]] | أي يوم |
| شهر | [[*]] | أي شهر |
| يوم في الأسبوع | [[*]] | أي يوم |

وبعدها: المسار **الكامل** للسكربت، و [[>> cron.log]] الناتج يتضاف للوج، و [[2>&1]] الـ errors تروح نفس المكان. ولازم [[chmod +x db-backup.sh]] عشان يتشغّل كبرنامج.

### جربناه كل دقيقة ([[* * * * *]])

- الـ PATH اللي cron شغّل بيه على أوبونتو كان من [[/etc/environment]]: [[/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:...]]. [[pg_dump]] و [[rclone]] في [[/usr/bin]] فاشتغلوا. لكن أي أداة في [[~/.local/bin]] (زي اللي بتتسطّب بـ pipx) أو من nvm مش هتتلاقي، فاكتب مسارها الكامل.
- rclone كان لسه من غير config، والنتيجة: [[cron.log]] **فاضي خالص**، والـ error في [[rclone.log]]. يعني الفشل ممكن يحصل وانت بتبص في اللوج الغلط. العلامة الوحيدة: سطر [[backup ok]] بتاع النهارده مش موجود.

---

## الخلاصة

| السطر | دوره |
|---|---|
| [[set -euo pipefail]] | أي فشل يوقف كل حاجة |
| [[app-$(date +%F).dump]] | اسم بالتاريخ، مترتب لوحده |
| [[pg_dump -h localhost ... -Fc]] + [[~/.pgpass]] بـ 600 | dump من غير ما حد يكتب باسورد |
| [[find -mtime +14 -delete]] | احتفظ بأسبوعين |
| [[rclone copy]] | نسخة بره السيرفر |
| [[echo "backup ok ..."]] | دليل إن كله نجح |
| [[0 3 * * *]] في crontab | كل يوم الساعة ٣ |

وراقب: كل يوم لازم يبقى فيه سطر [[backup ok]] جديد، وجرّب ترجّع الباك أب ده (درس «ترجيع الباك أب»).`,
          lines: [
            "أي فشل يوقف السكربت.",
            "فولدر الباك أب.",
            "اعمله لو مش موجود.",
            "الاسم بالتاريخ.",
            "dump مضغوط.",
            "امسح الأقدم من أسبوعين.",
            "انسخ لتخزين خارجي، والأخطاء في لوج.",
            "اطبع النتيجة بالحجم."
          ],
          sol: R`بعد ما تضيف السطر بـ [[crontab -e]]، [[crontab -l]] لازم يعرضه. وتاني يوم الصبح [[cron.log]] فيه سطر زي [[backup ok: /home/deploy/backups/db/app-2026-10-01.dump (1.2M)]]، و [[ls backups/db]] فيه ملف بتاريخ اليوم.

شغّل السكربت بإيدك الأول [[/home/deploy/db-backup.sh]] عشان تتأكد إنه شغال، بعدين استنى أول تشغيل من cron. ولازم تعمل [[chmod +x]] للسكربت.

المشاكل الشائعة في cron: السكربت يشتغل بإيدك ويفشل من cron لأن الـ PATH جوه cron مش بتاع الـ shell بتاعك (على أوبونتو بياخده من [[/etc/environment]]، من غير [[~/.local/bin]] ولا مسارات nvm)، فأي أداة متسطّبة هناك تطلع [[command not found]]: اكتب المسار الكامل أو حط PATH في أول السكربت. و [[Peer authentication failed for user "postgres"]] لو شلت [[-h localhost]]، و [[fe_sendauth: no password supplied]] لو مفيش [[.pgpass]] أو صلاحياته مش 600. وخد بالك: لو rclone فشل، الـ error بيروح لـ [[rclone.log]] مش [[cron.log]]، فـ [[cron.log]] بيفضل فاضي. غياب سطر [[backup ok]] في يوم هو علامة الفشل. واعرف إن [[2>&1]] في آخر السطر هو اللي بيخلي الـ errors تتسجل، من غيره بتضيع.`
        },
        {
          cmd: "الأمان",
          title: "SSL وباسوردات و public schema",
          desc: "الاتصال من بره لازم SSL. الباسوردات بصيغة SCRAM مش md5. و public schema افتراضيًا أي يوزر يقدر يعمل فيه جداول (اتغير في Postgres 15). و [[pg_hba]] بيحدد مين يدخل منين.",
          example: R`SHOW ssl;
SHOW password_encryption;
SELECT usename, passwd LIKE 'SCRAM%' AS scram FROM pg_shadow;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
ALTER ROLE app_user PASSWORD 'new-strong-password';
SELECT rolname, rolsuper FROM pg_roles WHERE rolsuper;`,
          try: "اتأكد إن التطبيق مش متصل بيوزر superuser: [[SELECT current_user, usesuper FROM pg_user WHERE usename = current_user;]] من كود التطبيق.",
          deep: {
            why: "القاعدة فيها كل حاجة: المستخدمين، والطلبات، والدفعات. لو اتخترقت مفيش رجوع. الخمس فحوصات دي بتقفل أشهر الثغرات.",
            how: R`[[ssl]]: لو on، الاتصالات من بره متشفّرة. الاتصال المحلي عبر socket مش محتاجه. مع Supabase و RDS مفعّل، وعلى VPS محتاج شهادة (self-signed كفاية للتشفير، أو من Let's Encrypt).

[[password_encryption]]: لازم [[scram-sha-256]]، والـ md5 القديم ضعيف. لو غيّرتها، الباسوردات القديمة لازم تتعاد بـ ALTER ROLE عشان تتخزن بالصيغة الجديدة. الاستعلام على pg_shadow بيوريك مين لسه md5.

[[public schema]]: قبل Postgres 15 أي يوزر يقدر يعمل جداول فيه. [[REVOKE CREATE ON SCHEMA public FROM PUBLIC]] بيقفل ده. Postgres 15+ عامله افتراضيًا.

الـ superusers: المفروض postgres بس، واتصال التطبيق مش منهم. الاستعلام الأخير بيوريك مين superuser.

وطبقات تانية: القاعدة على 127.0.0.1 أو خلف الفايروول، وباسوردات طويلة عشوائية، و pg_hba بيسمح لعناوين محددة، والباك أب مشفّر لو على تخزين خارجي.`,
            when: "بعد التسطيب. وبعد أي تغيير في اليوزرز. وربع سنوي.",
            mistakes: "نفس الباسورد للقاعدة في التطوير والإنتاج. وباسورد postgres الافتراضي في صورة Docker متغيرش."
          },
          teach: R`## الفكرة: ٦ أسئلة تسألها لقاعدتك

كل سطر في المثال يا سؤال ([[SHOW]] و [[SELECT]]) يا تصليح ([[REVOKE]] و [[ALTER ROLE]]). الأسئلة: الاتصال متشفّر؟ الباسوردات متخزنة إزاي؟ مين لسه بالطريقة القديمة؟ مين يقدر يعمل جداول؟ ومين superuser؟

اتجرّب على Postgres 16 في مكانين: container [[postgres:16]] الرسمي، و Postgres 16 من [[apt]] في [[ubuntu:24.04]] (عشان الاتنين مختلفين في SSL). وكل الأوامر اتنفّذت كـ [[postgres]] في [[psql]].

---

## ١. [[SHOW ssl;]]

[[SHOW]] بيعرض قيمة إعداد. و [[ssl]] معناه: السيرفر بيقبل اتصالات متشفّرة (TLS)؟

| المكان | الناتج | ليه |
|---|---|---|
| container [[postgres:16]] الرسمي | [[off]] | الـ image مفيهاش شهادة جاهزة |
| أوبونتو من [[apt]] | [[on]] | التسطيب بيعمل شهادة self-signed: [[ssl_cert_file]] = [[/etc/ssl/certs/ssl-cert-snakeoil.pem]] |

ولما [[ssl]] بـ [[off]] والعميل طالب تشفير ([[?sslmode=require]] في آخر الرابط):

~~~text الناتج
psql: error: connection to server at "localhost" (::1), port 5432 failed: server does not support SSL, but SSL was required
~~~

وعلى أوبونتو، عشان تتأكد إن **اتصالك انت** متشفّر:

~~~sql
SELECT ssl, version, cipher FROM pg_stat_ssl WHERE pid = pg_backend_pid();
~~~

~~~text الناتج (اتصال بـ -h localhost)
 ssl | version |         cipher
-----+---------+------------------------
 t   | TLSv1.3 | TLS_AES_256_GCM_SHA384
~~~

[[pg_stat_ssl]] فيه سطر لكل اتصال، و [[pg_backend_pid()]] رقم الـ process بتاع اتصالك. [[t]] يعني متشفّر بـ TLS 1.3. الاتصال المحلي على الـ socket مش محتاج تشفير (مش بيعدّي على شبكة)؛ اللي محتاجه أي اتصال من جهاز تاني.

---

## ٢. [[SHOW password_encryption;]]

~~~text الناتج
 password_encryption
---------------------
 scram-sha-256
~~~

ده **إزاي** الباسورد الجديد بيتخزن. [[scram-sha-256]] الافتراضي من Postgres 14 والأقوى. القديم [[md5]] أضعف: لو حد سرق الـ hash يقدر يستخدمه يدخل.

## ٣. مين لسه md5؟

~~~sql
SELECT usename, passwd LIKE 'SCRAM%' AS scram FROM pg_shadow;
~~~

- [[pg_shadow]]: view فيه اليوزرز والـ hash بتاع باسورداتهم (superuser بس يقدر يقراه).
- [[passwd LIKE 'SCRAM%']]: الـ hash بيبدأ بـ SCRAM؟ ([[%]] = أي حروف بعدها). النتيجة [[t]] أو [[f]]، و [[AS scram]] اسم العمود.

عشان نشوف يوزر قديم، عملنا واحد والإعداد [[md5]] مؤقتًا ([[SET password_encryption = 'md5']] ثم [[CREATE ROLE old_user ...]]):

~~~text الناتج
 usename  | scram
----------+-------
 postgres | t
 webuser  | t
 app_user | t
 old_user | f
~~~

والفرق في الـ hash نفسه ([[left(passwd, 20)]] = أول ٢٠ حرف):

~~~text الناتج
 postgres | SCRAM-SHA-256$4096:/
 old_user | md50f202efa2b73de538
~~~

[[4096]] عدد مرات تكرار الـ hash، وده اللي بيخلي تخمين الباسورد بطيء. و md5 مفيهوش ده.

---

## ٤. [[REVOKE CREATE ON SCHEMA public FROM PUBLIC;]]

| الحتة | معناها |
|---|---|
| [[REVOKE ... FROM]] | اسحب صلاحية من |
| [[CREATE]] | الصلاحية: إنه يعمل جداول وحاجات جديدة |
| [[ON SCHEMA public]] | جوه الـ schema اللي اسمه [[public]] (الافتراضي اللي جداولك فيه) |
| [[PUBLIC]] (من غير schema) | كلمة خاصة معناها «كل اليوزرز» |

قبل Postgres 15 أي يوزر كان عنده [[CREATE]] على [[public]]. من 15 لأ، وده شكلها في 16 بـ [[\dn+ public]]:

~~~text الناتج
  Name  |       Owner       |           Access privileges
--------+-------------------+----------------------------------------
 public | pg_database_owner | pg_database_owner=UC/pg_database_owner+
        |                   | =U/pg_database_owner
~~~

نقراها: [[U]] = USAGE (يستخدم اللي جوه)، و [[C]] = CREATE. صاحب القاعدة [[UC]]، و [[=U]] (من غير اسم قبل [[=]] يعني PUBLIC) عنده [[U]] بس. يعني على 16 الأمر ده مش هيغيّر حاجة، بس مهم على قاعدة اتعملت على 14 أو أقدم واتنقلت. والتجربة: [[app_user]] (مش صاحب القاعدة) جرّب [[CREATE TABLE]]:

~~~text الناتج
ERROR:  permission denied for schema public
~~~

## ٥. [[ALTER ROLE app_user PASSWORD 'new-strong-password';]]

بيغيّر الباسورد، والجديد بيتخزن بالطريقة اللي في [[password_encryption]] دلوقتي. فده هو تصليح اليوزرز القديمة: عملنا [[ALTER ROLE old_user PASSWORD ...]] وبعدها [[old_user]] بقى [[t]] في استعلام ٣.

> الأمر ده بيتسجّل في history بتاع psql ([[~/.psql_history]]) بالباسورد. الآمن أكتر [[\password app_user]] جوه psql: بيسألك الباسورد مرتين من غير ما يظهر، وبيبعته للسيرفر hash مش نص (من docs الـ psql).

## ٦. [[SELECT rolname, rolsuper FROM pg_roles WHERE rolsuper;]]

[[pg_roles]] فيه كل اليوزرز، و [[rolsuper]] [[true]] لو superuser. و [[WHERE rolsuper]] بس من غير [[= true]] لأن العمود نفسه true أو false.

~~~text الناتج
 rolname  | rolsuper
----------+----------
 postgres | t
~~~

ده الصح: [[postgres]] لوحده.

---

## التجربة: التطبيق متصل بمين؟

~~~sql
SELECT current_user, usesuper FROM pg_user WHERE usename = current_user;
~~~

[[current_user]] اليوزر اللي متصل دلوقتي، و [[usesuper]] هو superuser؟ بـ [[app_user]] طلع [[app_user | f]]، وبـ [[postgres]] طلع [[postgres | t]].

ليه الفرق ده خطير؟ superuser يقدر يشغّل أوامر على **السيرفر نفسه**:

~~~sql
COPY (SELECT 1) TO PROGRAM 'id > /tmp/pwn';
~~~

كـ [[postgres]] اشتغل، والملف اتكتب فيه [[uid=999(postgres) gid=999(postgres) ...]]: أمر لينكس اتنفّذ. وكـ [[app_user]]:

~~~text الناتج
ERROR:  permission denied to COPY to or from an external program
DETAIL:  Only roles with privileges of the "pg_execute_server_program" role may COPY to or from an external program.
~~~

يعني لو التطبيق متصل كـ superuser وفيه SQL injection، المهاجم مش بس بيقرا الداتا، ده بيشغّل أوامر على السيرفر.

---

## الخلاصة

| السؤال | الأمر | الإجابة الصح |
|---|---|---|
| التشفير شغال؟ | [[SHOW ssl]] | [[on]] لو فيه اتصالات من بره |
| الباسوردات بتتخزن إزاي؟ | [[SHOW password_encryption]] | [[scram-sha-256]] |
| مين لسه md5؟ | [[pg_shadow]] و [[LIKE 'SCRAM%']] | محدش (وإلا [[ALTER ROLE ... PASSWORD]]) |
| مين يعمل جداول في public؟ | [[\dn+ public]] | صاحب القاعدة بس |
| مين superuser؟ | [[pg_roles WHERE rolsuper]] | [[postgres]] بس |
| التطبيق؟ | [[current_user, usesuper]] | يوزر عادي، [[f]] |`,
          lines: [
            "SSL شغال؟",
            "طريقة تخزين الباسوردات (لازم scram-sha-256).",
            "مين لسه باسورده بالصيغة القديمة.",
            "امنع أي يوزر يعمل جداول في public (Postgres 15+ عامله).",
            "غيّر باسورد (بيتخزن بالصيغة الجديدة).",
            "مين superuser (المفروض postgres بس)."
          ],
          sol: R`من كود التطبيق (مثلًا [[await prisma.$queryRaw]] أو route مؤقت) لازم الناتج يبقى [[current_user = app_user]] و [[usesuper = false]].

لو طلع [[postgres | t]] يبقى التطبيق متصل بالـ superuser، ودا معناه إن أي SQL injection يقدر يعمل أي حاجة، حتى [[COPY ... TO PROGRAM]] اللي بيشغّل أوامر على السيرفر. الحل تعمل يوزر زي درس «يوزرز وصلاحيات» وتغيّر [[DATABASE_URL]].

وخلي بالك إن على Supabase اليوزر [[postgres]] مش superuser حقيقي ([[usesuper]] بيطلع [[f]])، بس هو برضه صاحب الجداول ومعاه صلاحيات كتير، فبرضه مش المفروض يكون اللي في كود الـ backend لو تقدر.`,
          solCode: R`SELECT current_user, usesuper FROM pg_user WHERE usename = current_user;
--  current_user | usesuper
-- --------------+----------
--  app_user     | f`
        },
        {
          cmd: "Row Level Security",
          title: "كل يوزر يشوف صفوفه بس",
          desc: "في Supabase الـ frontend بيكلّم القاعدة مباشرة بالـ anon key، فالحماية الوحيدة هي RLS: policies بتحدد أنهي صفوف كل يوزر يقرا ويكتب. جدول في public من غير RLS معناه أي حد معاه الـ key يقرا الجدول كله.",
          example: R`ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
CREATE POLICY todos_owner ON todos FOR ALL TO authenticated USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'todos';`,
          try: "فعّل RLS على جدول تجربة من غير policies، وجرّب تقرا منه بالـ anon key من supabase-js: هيرجع فاضي. ضيف الـ policy وجرّب تاني وانت عامل login.",
          deep: {
            why: "في تطبيق عادي الـ backend هو اللي بيفلتر بـ WHERE user_id. في Supabase مفيش backend في النص، فالقاعدة نفسها لازم تفلتر.",
            how: R`[[ENABLE ROW LEVEL SECURITY]] بيقفل الجدول: من غير policies مفيش صف بيرجع لحد. [[CREATE POLICY]] بيفتح بشرط: [[USING]] للصفوف اللي يقدر يشوفها ويعدّلها ويمسحها، و [[WITH CHECK]] للصفوف اللي يقدر يكتبها (عشان محدش يعمل insert باسم حد تاني).

[[auth.uid()]] رقم اليوزر من الـ JWT، وكتابتها [[(select auth.uid())]] بتخليها تتحسب مرة واحدة بدل كل صف (أسرع). [[TO authenticated]] للي عامل login بس.

الـ superuser وصاحب الجدول والـ service_role key بيعدّوا RLS، عشان كده service_role عمره ما يروح للـ frontend. [[pg_tables.rowsecurity]] بيوريك أنهي جداول لسه مكشوفة، و Security Advisor في لوحة Supabase بينبّهك.`,
            when: "كل جدول في public على Supabase، من أول migration. وفي Postgres عادي لو فيه multi-tenant.",
            mistakes: "جدول جديد من SQL من غير ENABLE RLS. واختبار الـ policies من SQL editor كـ postgres فتعدّي كلها. و USING من غير WITH CHECK."
          },
          teach: R`## الفكرة: الجدول نفسه بيفلتر الصفوف حسب مين بيسأل

عادةً الـ backend بيكتب [[WHERE user_id = ...]] في كل استعلام. في Supabase الـ frontend بيكلّم القاعدة مباشرة، فالشرط ده لازم يبقى **جوه القاعدة**: تفعّل RLS (Row Level Security) على الجدول، وتكتب policy بتقول كل يوزر يشوف ويكتب أنهي صفوف.

اتجرّب في container [[postgres:16]] عادي، وعملنا فيه نفس الحاجات اللي Supabase بيعملها عشان الأوامر تشتغل زي ما هي: رولين [[anon]] (اللي مش عامل login) و [[authenticated]] (اللي عامل login)، ودالة [[auth.uid()]] بتقرا رقم اليوزر من إعداد اسمه [[request.jwt.claims]] (وده اللي Supabase بيحط فيه الـ JWT في كل طلب). وجدول [[todos]] فيه ٣ صفوف: ٢ لـ Sara وواحد لـ Omar. وسلوك [[supabase-js]] نفسه من الـ docs الرسمية لـ Supabase.

قبل أي حاجة، من غير RLS: [[SET ROLE anon]] (اتصرّف كأنك [[anon]]) و [[SELECT count(*) FROM todos]] طلّع [[3]]. يعني أي حد معاه الـ anon key (وده موجود في كود الـ frontend، أي حد يشوفه) بيقرا كل الصفوف.

---

## ١. [[ALTER TABLE todos ENABLE ROW LEVEL SECURITY;]]

بيقفل الجدول: من غير أي policy، ولا صف بيرجع لأي حد (ما عدا اللي بيعدّوا RLS، تحت).

~~~text الناتج كـ authenticated (Sara عاملة login)
 count
-------
     0
~~~

لاحظ: **مش error**، صفر صفوف. RLS مش بيرفض الاستعلام، بيشيل الصفوف اللي مش مسموحة. عشان كده في [[supabase-js]] بترجع [[data: []]] من غير error، وده بيلخبط ناس كتير.

---

## ٢. الـ policy

~~~sql
CREATE POLICY todos_owner ON todos FOR ALL TO authenticated USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
~~~

| الحتة | معناها |
|---|---|
| [[CREATE POLICY todos_owner]] | قاعدة اسمها [[todos_owner]] |
| [[ON todos]] | على الجدول ده |
| [[FOR ALL]] | لكل العمليات: [[SELECT]] و [[INSERT]] و [[UPDATE]] و [[DELETE]] (ممكن تكتب واحدة بس) |
| [[TO authenticated]] | للي عامل login بس، فـ [[anon]] ملوش حاجة |
| [[USING (...)]] | شرط الصفوف **الموجودة** اللي يقدر يشوفها ويعدّلها ويمسحها |
| [[WITH CHECK (...)]] | شرط الصفوف **الجديدة** اللي بيكتبها (INSERT، أو شكل الصف بعد UPDATE) |
| [[user_id = (select auth.uid())]] | الصف بتاعه لو [[user_id]] = رقم اليوزر اللي بيسأل |

### [[auth.uid()]] وليه جوه [[(select ...)]]

[[auth.uid()]] بترجّع رقم اليوزر (UUID) من الـ JWT. كـ Sara:

~~~text SELECT auth.uid();
 11111111-1111-1111-1111-111111111111
~~~

لو كتبتها [[auth.uid()]] لوحدها، Postgres ممكن يناديها مرة لكل صف. جوه [[(select ...)]] بتتحسب مرة واحدة للاستعلام كله، وده فرق كبير على جدول فيه مليون صف (من docs الـ RLS performance بتاعة Supabase).

### النتيجة كـ Sara

~~~text SELECT id, title FROM todos;
 id |     title
----+----------------
  1 | sara: buy milk
  2 | sara: call mom
~~~

صف Omar مختفي. وجرّبنا تلات محاولات:

~~~text الناتج
INSERT صف باسم Omar:   ERROR:  new row violates row-level security policy for table "todos"
UPDATE صفوف Omar:      UPDATE 0
INSERT صف باسمها:      INSERT 0 1
~~~

- الأولى وقّفها [[WITH CHECK]]: [[user_id]] اللي بتكتبه مش بتاعها، فـ **error**.
- التانية [[UPDATE 0]]: [[USING]] خبّى صفوف Omar أصلًا، فالـ UPDATE ملقاش حاجة يعدّلها. مش error، صفر.
- التالتة عدّت.

من غير [[WITH CHECK]]، أول محاولة كانت هتعدّي: Sara تكتب todos باسم Omar.

### و [[anon]]؟

[[SET ROLE anon]] و [[count(*)]] طلّع [[0]]: الـ policy لـ [[authenticated]] بس.

---

## ٣. أنهي جداول عليها RLS؟

~~~sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
~~~

[[pg_tables]] فيه كل الجداول، و [[rowsecurity]] [[t]] لو RLS متفعّل. و [[WHERE schemaname = 'public']] لأن ده الـ schema اللي الـ API بتاع Supabase بيعرضه.

~~~text الناتج
 tablename | rowsecurity
-----------+-------------
 todos     | t
~~~

أي سطر فيه [[f]] في مشروع Supabase يعني الجدول ده مكشوف لأي حد معاه الـ anon key.

## ٤. الـ policies وشروطها

~~~sql
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'todos';
~~~

~~~text الناتج
 policyname  | cmd |                  qual
-------------+-----+-----------------------------------------
 todos_owner | ALL | (user_id = ( SELECT auth.uid() AS uid))
~~~

[[cmd]] العملية ([[ALL]] هنا)، و [[qual]] شرط [[USING]] زي ما Postgres فهمه. وفيه كمان عمود [[roles]] (طلع [[{authenticated}]]) و [[with_check]] (نفس الشرط).

---

## مين بيعدّي RLS؟

كـ [[postgres]] (صاحب الجدول و superuser) [[SELECT count(*) FROM todos]] طلّع [[4]]: كل الصفوف. صاحب الجدول والـ superuser ورول [[service_role]] في Supabase بيعدّوا RLS. عشان كده:

- لو جرّبت الـ policies من SQL Editor في لوحة Supabase هتشوف كل حاجة، لأنه بيشتغل كـ [[postgres]]. جرّب من [[supabase-js]] بيوزر عامل login.
- مفتاح [[service_role]] مكانه الـ backend بس، عمره ما يروح للـ frontend.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[ENABLE ROW LEVEL SECURITY]] | يقفل الجدول: صفر صفوف لحد ما تضيف policy |
| [[USING (...)]] | أنهي صفوف موجودة يشوفها ويعدّلها ويمسحها (الباقي بيختفي، مش error) |
| [[WITH CHECK (...)]] | أنهي صفوف يقدر يكتبها (المخالف = [[new row violates row-level security policy]]) |
| [[(select auth.uid())]] | رقم اليوزر، محسوب مرة واحدة |
| [[pg_tables.rowsecurity]] | مين لسه مكشوف |
| [[pg_policies]] | إيه الشروط الموجودة |`,
          lines: [
            "فعّل RLS: الجدول مقفول لحد ما تضيف policy.",
            "policy: اليوزر اللي عامل login يشوف ويكتب الصفوف اللي user_id بتاعها هو بس.",
            "أنهي جداول في public عليها RLS وأنهي لأ.",
            "الـ policies الموجودة على الجدول وشروطها."
          ],
          sol: R`بعد [[ENABLE ROW LEVEL SECURITY]] من غير policies: [[supabase.from('todos').select()]] بيرجّع [[data: []]] و [[error: null]]، مش error. دي النقطة اللي بتلخبط الناس: RLS مش بيرفض، بيفلتر لحد ما مفيش صفوف.

بعد الـ policy و login: بيرجّع صفوف اليوزر ده بس. ولو عملت logout ترجع array فاضية، لأن الـ policy لـ [[authenticated]] بس. ونفس السلوك تقدر تشوفه في Postgres عادي: يوزر مش owner بيعمل [[SELECT count(*) FROM todos]] يطلع [[0]]، وبعد policy بيشوف صفوفه بس، والـ owner بيشوف الكل.

الأخطاء الشائعة: تجرّب من SQL Editor في اللوحة فتشوف كل الصفوف، لأنه بيشتغل كـ [[postgres]] اللي بيعدّي RLS. أو تستخدم الـ service_role key في الكود فكل حاجة تبان شغالة، وهو كده بيعدّي RLS خالص. ولو INSERT رجّع [[new row violates row-level security policy]] يبقى الـ [[user_id]] اللي بتبعته مش بتاع اليوزر اللي عامل login، ودا شغل [[WITH CHECK]].`
        },
        {
          cmd: "pgcli",
          title: "psql بإكمال تلقائي",
          desc: R`[[pgcli]] بديل لـ [[psql]] بيكمّلك أسامي الجداول والأعمدة وانت بتكتب، وبيلوّن الـ SQL، فالكتابة أسرع وأقل غلط. بيتصل بـ Postgres بنفس الطريقة وبيفهم أوامر الـ backslash الأساسية زي [[\dt]].

هو أداة Python، و [[pipx install pgcli]] بيسطّبها في بيئة لوحدها فمتلخبطش مكتبات Python التانية عندك. الاتصال بطريقتين: connection string زي [[postgres://app_user:secret@localhost/app]] (اليوزر:الباسورد@الجهاز/القاعدة)، أو فلاجات: [[-h]] الجهاز، و [[-p]] البورت (هنا 5433)، و [[-U]] اليوزر، وبعدهم اسم القاعدة.

مفيد على جهازك، وعلى السيرفر psql العادي كفاية. وخد بالك إن الباسورد في الـ connection string بيتحفظ في الـ history، فالأحسن ملف [[~/.pgpass]].`,
          example: R`pipx install pgcli
pgcli postgres://app_user:secret@localhost/app
pgcli -h localhost -p 5433 -U app_user app`,
          try: "اتصل بـ pgcli واكتب [[SELECT * FROM us]] ودوس Tab.",
          deep: {
            why: "psql ممتاز، بس مفيهوش إكمال تلقائي لأسامي الجداول والأعمدة. pgcli بيضيف ده وألوان وتاريخ أحسن.",
            how: R`أداة Python بتتكلم مع Postgres بنفس البروتوكول، وبتقبل نفس connection strings و PG* variables و .pgpass. وأوامر الـ backslash الأساسية شغالة فيها.

الإكمال بيقرا الـ schema أول ما تتصل: تكتب اسم جدول جزئي وتدوس Tab، وبعد [[SELECT * FROM users WHERE]] بيقترح الأعمدة. وبيلوّن SQL.

على السيرفر مش هتسطّبها غالبًا (محتاجة Python و pip)، وهناك psql كفاية. على جهازك مع tunnel للسيرفر هي أريح.

بدائل بواجهة: DBeaver (مجاني، بيدعم SSH tunnel مباشرة)، و TablePlus، و pgAdmin.`,
            when: "على جهازك للشغل اليومي مع القاعدة.",
            mistakes: "تعتمد عليها بس وتنسى psql، وبعدين على السيرفر في طوارئ تتوه."
          },
          teach: R`## الفكرة: نفس الاتصال، بس الـ terminal بيكمّلك

[[pgcli]] برنامج بتتصل بيه بـ Postgres زي [[psql]] بالظبط (نفس الرابط، ونفس الفلاجات)، والفرق إنه وانت بتكتب بيفتح قايمة فيها أسامي الجداول والأعمدة والكلمات اللي تنفع في المكان ده.

اتجرّب في container [[ubuntu:24.04]] فيه Postgres 16 من [[apt]]، كيوزر نظام عادي اسمه [[deploy]]، على قاعدة [[app]] فيها جدولين [[users]] و [[user_sessions]] ملك [[app_user]]. والإكمال التلقائي (اللي محتاج terminal حقيقي) اتجرّب بسكربت Python صغير بيفتح terminal وهمي ويكتب الحروف واحد واحد.

---

## ١. [[pipx install pgcli]]

[[pgcli]] مكتوب بـ Python. و [[pipx]] بيسطّب أي أداة Python في بيئة (virtual environment) لوحدها، فمكتباتها متتخانقش مع مكتبات Python التانية على الجهاز، وبيحط الأمر نفسه في [[~/.local/bin]].

~~~text الناتج
  installed package pgcli 4.7.1, installed using Python 3.12.3
  These apps are now globally available
    - pgcli
~~~

لو [[pipx]] نفسه مش موجود: [[sudo apt install pipx]] على أوبونتو، و [[brew install pgcli]] على الماك على طول (من docs الـ pgcli). وعلى ويندوز [[pipx install pgcli]] بعد ما تسطّب Python و pipx (من الـ docs، متجرّبش هنا عشان ميتسطّبش حاجة على الجهاز).

### [[pgcli: command not found]] بعد التسطيب؟

في نفس الـ shell اللي سطّبت منه، [[which pgcli]] مطلّعش حاجة: [[~/.local/bin]] مكانش في الـ PATH لأن الفولدر اتعمل بعد ما الـ shell فتح. افتح terminal جديد (على أوبونتو [[~/.profile]] بيضيفه لوحده لو موجود)، أو [[pipx ensurepath]]. في shell جديد:

~~~text pgcli --version
Version: 4.7.1
~~~

---

## ٢. [[pgcli postgres://app_user:secret@localhost/app]]

نفس شكل الـ connection string بتاع psql:

| الحتة | معناها |
|---|---|
| [[postgres://]] | رابط Postgres |
| [[app_user]] | اليوزر |
| [[:secret]] | الباسورد |
| [[@localhost]] | الجهاز |
| [[/app]] | القاعدة |

أول ما يتصل بيطبع نسخة السيرفر ويستناك:

~~~text الناتج
Server: PostgreSQL 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
Version: 4.7.1
Home: https://pgcli.com
app_user@localhost:app>
~~~

الـ prompt شكله [[اليوزر@الجهاز:القاعدة>]]، فدايمًا عارف انت فين. وتحت شريط فيه [[[F2] Smart Completion: ON]] (الإكمال الذكي شغال، و F2 بيقفله) و [[[F3] Multiline: OFF]] (Enter بينفّذ على طول).

### الإكمال

كتبنا [[SELECT * FROM us]] حرف حرف، والقايمة اللي فتحت فيها:

~~~text القايمة بعد «us»
users            table
user_sessions    table
unistr()         function
...
~~~

بعد [[FROM]] بيقترح جداول (ودوال)، مش أي كلمة. و Tab أو السهم بيختار. وبعد [[SELECT * FROM users WHERE ]]:

~~~text القايمة بعد WHERE
id      column
name    column
~~~

أعمدة الجدول [[users]] بالذات. ده اللي psql مبيعملوش.

### أوامر الـ backslash والنتايج

[[\dt]] شغال زي psql، والنتيجة في جدول بخطوط:

~~~text الناتج
+--------+---------------+-------+----------+
| Schema | Name          | Type  | Owner    |
|--------+---------------+-------+----------|
| public | user_sessions | table | app_user |
| public | users         | table | app_user |
+--------+---------------+-------+----------+
~~~

وبعد كل استعلام بيطبع الوقت ([[Time: 0.006s]]). و Ctrl+D بيخرج ([[Goodbye!]]).

---

## ٣. [[pgcli -h localhost -p 5433 -U app_user app]]

نفس الاتصال بالفلاجات بدل الرابط:

| الفلاج | معناه |
|---|---|
| [[-h localhost]] | الجهاز (h من host) |
| [[-p 5433]] | البورت (p من port) |
| [[-U app_user]] | اليوزر (U من User) |
| [[app]] | القاعدة، في الآخر من غير فلاج |

ليه 5433 مش 5432؟ لأن ده الشكل المعتاد لـ **SSH tunnel**: بورت على جهازك بيوصّل لـ Postgres على السيرفر. جربناه:

~~~bash
ssh -f -N -L 5433:localhost:5432 deploy@server
~~~

- [[-L 5433:localhost:5432]]: أي حاجة تتصل بـ 5433 عندك، وصّلها لـ [[localhost:5432]] **من ناحية السيرفر**.
- [[-N]]: متفتحش shell، tunnel بس. و [[-f]]: روح للخلفية.

وبعدها من نفس الجهاز:

~~~text الناتج
+------------------+--------------+
| inet_server_port | current_user |
|------------------+--------------|
| 5432             | app_user     |
+------------------+--------------+
~~~

احنا اتصلنا بـ 5433، والسيرفر بيقول إنه على 5432: الـ tunnel وصّلنا. ومن غير tunnel:

~~~text الناتج
connection failed: connection to server at "127.0.0.1", port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?
~~~

[[Connection refused]] يعني مفيش حد بيسمع على البورت ده، فشغّل الـ tunnel الأول.

> و [[pgcli ... --ping]] بيتصل ويطبع [[PONG]] ويخرج: أسرع طريقة تتأكد إن الاتصال تمام.

---

## الباسورد

الرابط فيه الباسورد، فبيتحفظ في الـ history بتاع الـ shell. الأحسن تشيله من الرابط ([[pgcli postgres://app_user@localhost/app]]) وتحطه في [[~/.pgpass]] (pgcli بيقراه زي psql)، أو تسيبه يسألك.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تسطّب | [[pipx install pgcli]] (وterminal جديد) |
| تتصل برابط | [[pgcli postgres://user@host/db]] |
| تتصل بفلاجات | [[pgcli -h host -p port -U user db]] |
| تتأكد إن الاتصال شغال | [[--ping]] |
| تقفل/تفتح الإكمال | F2 |

pgcli للشغل بإيدك على جهازك. في السكربتات والسيرفر، [[psql]].`,
          lines: ["سطّب.", "اتصل بـ URL.", "اتصل عبر tunnel."],
          sol: R`لما تكتب [[SELECT * FROM us]] قايمة بتفتح تحت الكلام فيها [[users]] (وأي جدول بيبدأ بـ us). دوس Tab أو Enter يكمّلها. وبعد [[WHERE ]] هتقترح أسماء أعمدة الجدول ده بالذات، ودي الميزة الكبيرة عن psql.

pgcli بيقبل نفس أوامر الـ backslash زي [[\dt]] و [[\d users]]، وبيلوّن الـ SQL وبيعرض النتايج في جدول مرتب.

لو [[pipx: command not found]] نزّله الأول ([[sudo apt install pipx]] على أوبونتو). ولو الـ completion مش بيطلع أسماء الجداول، ممكن يكون لسه بيحمّلها في أول ثواني، أو إنك في قاعدة مفيهاش جداول في الـ search_path. وخلي بالك إن pgcli للشغل اليدوي بس، في السكربتات استخدم psql.`
        }
      ]
    }
]);
