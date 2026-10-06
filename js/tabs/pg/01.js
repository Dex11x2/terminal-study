// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("pg", {
  label: "psql",
  prompt: "app=# ",
  lab: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16
createdb -h localhost -U postgres lab
psql -h localhost -U postgres -d lab`,
  labText: R`أسهل قاعدة تجربة: docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16. الأوامر اللي بتبدأ بـ \ بتتكتب جوه psql، والباقي في الترمنال.`,
  levels: {
    "1": ["البداية", "تتصل، وتتنقل بين القواعد والجداول، وتشغّل SQL من ملفات، وتصدّر CSV"],
    "2": ["المتوسط", "يوزرز بصلاحيات صح، والأقفال والحجم والـ indexes وقراية EXPLAIN"],
    "3": ["المتقدم", "باك أب بيتجرّب، و migrations آمنة، و Supabase CLI و pooling"]
  },
  categories: [
    {
      t: "الاتصال والتنقل في psql",
      l: 1,
      n: R`psql هو الترمنال بتاع Postgres: تكتب SQL، وأوامر بتبدأ بـ \ للتنقل`,
      items: [
        {
          cmd: "psql",
          title: "اتصل بقاعدة البيانات",
          desc: "[[psql]] بياخد اليوزر ([[-U]])، والسيرفر ([[-h]])، والقاعدة ([[-d]])، أو connection string كامل. من غير [[-h]] بيتصل بالسوكت المحلي. ولو Postgres جوه Docker، بتشغّل psql جوه الـ container.",
          example: R`psql -U postgres -h localhost -d app
psql "postgres://app_user:secret@localhost:5432/app"
docker exec -it db psql -U postgres -d app
psql -U postgres -c "SELECT version();"`,
          try: R`اتصل بأي قاعدة عندك واكتب [[SELECT now();]] و [[\q]] للخروج.`,
          deep: {
            why: "لوحة Supabase و DBeaver حلوين، بس على السيرفر أو في سكربت مفيش غير الترمنال. و psql أسرع لأي حاجة إدارية.",
            how: R`[[psql]] برنامج client بيتكلم مع سيرفر Postgres بالبروتوكول بتاعه. الـ arguments: [[-U]] اليوزر، [[-h]] السيرفر، [[-p]] البورت (5432 افتراضي)، [[-d]] القاعدة.

لو مكتبتش [[-h]]، psql بيتصل بـ Unix socket محلي مش بالشبكة. وعلى أوبونتو الاتصال المحلي كـ postgres بيستخدم [[peer]] authentication: يوزر لينكس postgres هو اللي يقدر يدخل، عشان كده [[sudo -u postgres psql]].

الـ connection string [[postgres://user:pass@host:port/db]] بيجمع كل حاجة، وهو نفسه اللي في [[DATABASE_URL]] بتاع التطبيق. مفيد تجرّب بيه إن الـ URL اللي في .env صح.

جوه Docker: Postgres بيسمع جوه الـ container، فـ [[docker exec -it db psql]] بيشغّل psql جواه. أو من جهازك على البورت المربوط بـ -p.

[[-c]] بينفّذ أمر واحد ويخرج، مفيد في السكربتات.`,
            when: "أي إدارة للقاعدة. تجربة الـ DATABASE_URL. سكربتات.",
            mistakes: "[[psql -U postgres]] من غير -h على السيرفر فيطلع peer authentication failed. استخدم [[sudo -u postgres psql]] أو [[-h localhost]]."
          },
          teach: R`## الفكرة: psql «تليفون» بتكلّم بيه السيرفر

Postgres نفسه سيرفر شغال في الخلفية ومستني حد يكلّمه. و [[psql]] برنامج صغير (client) بيتصل بالسيرفر، تكتب فيه SQL، يبعته، ويطبعلك الرد. عشان يتصل لازم يعرف ٤ حاجات: **مين** انت (اليوزر)، و**فين** السيرفر (الجهاز والبورت)، و**أنهي** قاعدة. المثال فيه ٤ طرق تقول بيها الحاجات دي.

كل الناتج تحت متشغّل فعلًا على [[postgres:16]] (نسخة 16.15) جوه Docker على ويندوز، و psql شغال جوه الـ container نفسه، على قاعدة تجربة اسمها [[app]] فيها جداول [[users]] و [[orders]] و [[sessions]] و [[products]].

---

## ١. الطريقة الطويلة: كل حاجة بـ flag

~~~bash
psql -U postgres -h localhost -d app
~~~

| الحتة | من كلمة | معناها |
|---|---|---|
| [[-U postgres]] | User | ادخل باليوزر [[postgres]] (ده الـ superuser اللي بيتعمل مع أي تسطيب) |
| [[-h localhost]] | host | السيرفر على نفس الجهاز، والاتصال بالشبكة (TCP) |
| [[-d app]] | database | افتح قاعدة اسمها [[app]] |
| [[-p]] (مش مكتوب) | port | البورت، ولو مكتبتهوش يبقى [[5432]] |

بعد ما يدخل الـ prompt بيبقى [[app=#]]: اسم القاعدة، وبعده [[=]] (يعني مستني أمر جديد)، و [[#]] معناها انت superuser (اليوزر العادي بيشوف [[>]]). جرّب:

~~~text جوه psql
SELECT now();
~~~

~~~text الناتج
              now
-------------------------------
 2026-10-06 13:36:46.516681+00
(1 row)
~~~

[[now()]] دالة بترجع الوقت دلوقتي، و [[+00]] في الآخر يعني التوقيت UTC. وخلي بالك من [[;]] في آخر أمر SQL: من غيرها psql بيفتكر إنك لسه بتكتب، والـ prompt يبقى [[app-#]] لحد ما تكتبها. و [[\q]] بيخرّجك.

### هيسألني باسورد؟

حسب ملف [[pg_hba.conf]] (ملف قواعد «مين يدخل منين وإزاي»، ليه درس لوحده في المستوى ٢). ده جزء منه في صورة postgres الرسمية:

~~~text pg_hba.conf جوه postgres:16
local   all   all                   trust
host    all   all   127.0.0.1/32    trust
host    all   all   all             scram-sha-256
~~~

يعني جوه الـ container نفسه ([[local]] أو [[127.0.0.1]]) الكلمة [[trust]] بتدخّلك من غير باسورد، لكن أي اتصال من بره (من جهازك عن طريق البورت) بيقع على السطر الأخير ولازم باسورد ([[scram-sha-256]] طريقة تشفير الباسورد). على سيرفر لينكس عادي القواعد مختلفة، وده سبب خطأ peer اللي تحت.

---

## ٢. نفس الكلام في سطر واحد: connection string

~~~bash
psql "postgres://app_user:secret@localhost:5432/app"
~~~

الـ URL ده بيتقري كده:

~~~text تفكيك الـ URL
postgres://   البروتوكول (ينفع postgresql:// برضه)
app_user      اليوزر
:secret       الباسورد (بعد :)
@localhost    السيرفر (بعد @)
:5432         البورت
/app          القاعدة
~~~

وده بالظبط شكل [[DATABASE_URL]] اللي في [[.env]] بتاع أي تطبيق. فأسرع طريقة تتأكد إن الـ URL بتاع مشروعك صح: تحطه في psql. جربته بيوزر postgres:

~~~bash
psql "postgres://postgres:secret@localhost:5432/app" -c "SELECT inet_server_addr(), inet_server_port();"
~~~

~~~text الناتج
 inet_server_addr | inet_server_port
------------------+------------------
 ::1              |             5432
~~~

[[inet_server_addr()]] بترجع عنوان السيرفر اللي اتصلت بيه: [[::1]] ده localhost بتاع IPv6. يعني الاتصال فعلًا راح بالشبكة على 5432.

> الـ URL محطوط بين [[" "]] عشان الـ shell ميلعبش في رموز زي [[&]] و [[?]] لو فيه خيارات بعد الـ URL.

---

## ٣. Postgres جوه Docker

~~~bash
docker exec -it db psql -U postgres -d app
~~~

من جوه لبره:

| الحتة | معناها |
|---|---|
| [[docker exec]] | شغّل أمر جوه container شغال |
| [[-i]] | interactive: سيب الكيبورد متوصل بالأمر |
| [[-t]] | tty: اعمل ترمنال حقيقي عشان الـ prompt والألوان |
| [[db]] | اسم الـ container (عندك ممكن يبقى [[postgres]] أو أي اسم في compose) |
| [[psql -U postgres -d app]] | الأمر اللي هيتشغّل جوه |

مفيش [[-h]] هنا، فـ psql بيتصل بـ **Unix socket**: ملف خاص على نفس الجهاز بيتكلم بيه البرنامجين من غير شبكة. عشان كده لو سألته عن العنوان:

~~~text الناتج من غير -h
 inet_server_addr
------------------

~~~

فاضي، لأن مفيش شبكة أصلًا. وميزة الطريقة دي إنك مش محتاج psql متسطب على جهازك ولا بورت مفتوح.

---

## ٤. أمر واحد وتخرج: [[-c]]

~~~bash
psql -U postgres -c "SELECT version();"
~~~

~~~text الناتج
                                                       version
----------------------------------------------------------------------------------------------------------------------
 PostgreSQL 16.15 (Debian 16.15-1.pgdg13+2) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
(1 row)
~~~

[[-c]] من command: نفّذ الأمر ده واخرج على طول من غير ما تفتح الـ prompt. ومفيش [[-d]]؟ psql بيفترض قاعدة بنفس اسم اليوزر، يعني [[postgres]] (القاعدة دي موجودة دايمًا).

---

## ٥. لما ميدخلش: اقرا الـ error

~~~text بورت غلط (مفيش حد بيسمع على 5433)
psql: error: connection to server at "localhost" (::1), port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?
connection to server at "localhost" (127.0.0.1), port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?
~~~

([[localhost]] ليه عنوانين: [[::1]] في IPv6 و [[127.0.0.1]] في IPv4، فـ psql جرّب الاتنين.)

~~~text قاعدة مش موجودة
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  database "nope" does not exist
~~~

| الرسالة | معناها |
|---|---|
| [[Connection refused]] | مفيش سيرفر على البورت ده: مش شغال، أو بورت تاني |
| [[database "..." does not exist]] | وصلت للسيرفر، بس اسم القاعدة غلط ([[psql -l]] يعرض الموجود) |
| [[password authentication failed]] | الباسورد أو اليوزر غلط |
| [[Peer authentication failed]] | على لينكس من غير [[-h]]: السيرفر بيقارن اسم يوزر لينكس باسم يوزر Postgres |

والـ exit code في الحالتين كان [[2]]، فأي سكربت يقدر يعرف إن الاتصال فشل.

---

## الخلاصة

~~~text
-U   مين انت          -h   فين السيرفر (من غيره: socket محلي)
-d   أنهي قاعدة       -p   البورت (5432 افتراضي)
-c   أمر واحد واخرج    "postgres://user:pass@host:port/db"  كله في سطر
docker exec -it <container> psql ...   لما Postgres جوه Docker
~~~`,
          lines: [
            "اتصل: يوزر postgres، على localhost، بقاعدة app. هيسألك باسورد.",
            "نفس الحاجة بـ connection string (زي DATABASE_URL في .env).",
            "لو Postgres جوه Docker: شغّل psql جوه الـ container.",
            "نفّذ أمر واحد واخرج."
          ],
          sol: R`المفروض تشوف جدول صغير فيه عمود واحد اسمه [[now]] وصف واحد بالوقت الحالي بالـ timezone، زي [[2026-09-30 04:55:42.283158+00]] وتحته [[(1 row)]]. و [[\q]] بيرجّعك للترمنال من غير أي رسالة.

لو الـ prompt فضل [[app-#]] بدل [[app=#]] بعد ما دوست Enter، يبقى نسيت الـ [[;]] و psql مستني باقي الأمر: اكتب [[;]] ودوس Enter. ولو طلعلك [[Peer authentication failed for user "postgres"]] يبقى اتصلت بالسوكت المحلي بيوزر لينكس غير postgres: استخدم [[sudo -u postgres psql]] أو ضيف [[-h localhost]] مع باسورد. و [[connection refused]] معناها السيرفر مش شغال أو بيسمع على بورت تاني، اتأكد بـ [[pg_isready -h localhost]].`
        },
        {
          cmd: "أوامر الـ backslash",
          title: "التنقل جوه القاعدة",
          desc: R`الأوامر اللي بتبدأ بـ [[\]] بتاعة psql نفسه مش SQL. [[\l]] القواعد، و [[\c]] اتصل بقاعدة، و [[\dt]] الجداول، و [[\d اسم]] أعمدة جدول و indexes بتاعه، و [[\du]] اليوزرز، و [[\?]] كل الأوامر.`,
          example: R`\l
\c app
\dt
\d users
\d+ users
\du
\dn
\df
\q`,
          try: R`ادخل قاعدة مشروعك واعمل [[\d]] لأهم جدول: اقرا الأعمدة والأنواع والـ indexes والـ foreign keys في الآخر.`,
          deep: {
            why: "محتاج تعرف إيه القواعد الموجودة، وإيه الجداول، وأعمدة كل جدول، من غير ما تحفظ استعلامات على جداول النظام.",
            how: R`أي حاجة بتبدأ بـ [[\]] أمر لـ psql نفسه، وبيترجمه لاستعلام على جداول النظام (pg_catalog). ومش محتاجة [[;]] في الآخر.

[[\l]] القواعد (list). [[\c app]] اتصل بقاعدة app (connect). [[\dt]] الجداول (describe tables)، و [[\d]] لوحدها الجداول والـ views والـ sequences.

[[\d users]] أهم واحد: كل أعمدة الجدول بأنواعها والـ defaults والـ nullable، وتحتهم الـ indexes، والـ constraints، والـ foreign keys في الاتجاهين. [[\d+]] بيضيف أعمدة التخزين ([[Storage]]) والوصف ([[Description]])، والحجم بيظهر في [[\dt+]].

[[\du]] اليوزرز (roles) وصلاحياتهم. [[\dn]] الـ schemas. [[\df]] الدوال. [[\?]] كل أوامر الـ backslash، و [[\h ALTER TABLE]] مساعدة SQL.

و [[\e]] بيفتح المحرر تكتب استعلام طويل، و [[\s]] الـ history.`,
            when: "أول ما تدخل قاعدة مش عارفها. قبل ما تكتب استعلام على جدول مش فاكر أعمدته.",
            mistakes: "تنسى [[;]] في آخر أمر SQL فـ psql يستناك والـ prompt يبقى [[app-#]] (أوامر الـ backslash مش محتاجاها، ولو كتبتها psql بيتجاهلها). وتنسى إنك متصل بأنهي قاعدة: الـ prompt بيقولك ([[app=#]])."
          },
          teach: R`## الفكرة: أوامر بتسأل psql نفسه، مش السيرفر

أي سطر بيبدأ بـ [[\]] (backslash) ده أمر لـ **psql** نفسه، مش SQL. psql بيترجمه في السر لاستعلام على جداول النظام ([[pg_catalog]]، المكان اللي Postgres شايل فيه وصف كل حاجة)، ويطبعلك النتيجة بشكل مقروء. فبدل ما تحفظ استعلامات طويلة، تكتب حرفين. ومفيش [[;]] في آخرها، السطر بيتنفّذ أول ما تدوس Enter.

الناتج تحت كله حقيقي من [[postgres:16]] جوه Docker، على قاعدة تجربة [[app]].

---

## ١. [[\l]]: القواعد اللي على السيرفر

[[l]] من list.

~~~text الناتج (مختصر الأعمدة الأخيرة)
                         List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   | ...
-----------+----------+----------+-----------------+------------+
 app       | postgres | UTF8     | libc            | en_US.utf8 |
 postgres  | postgres | UTF8     | libc            | en_US.utf8 |
 template0 | postgres | UTF8     | libc            | en_US.utf8 |
 template1 | postgres | UTF8     | libc            | en_US.utf8 |
(4 rows)
~~~

| العمود | معناه |
|---|---|
| [[Name]] | اسم القاعدة |
| [[Owner]] | صاحبها (اللي يقدر يمسحها ويغيّرها) |
| [[Encoding]] | ترميز النصوص. [[UTF8]] يعني العربي هيتخزن صح |
| [[Collate]] | قواعد الترتيب الأبجدي |

[[postgres]] قاعدة فاضية بتتعمل مع التسطيب عشان يبقى فيه مكان تدخله. و [[template0]] و [[template1]] قوالب: أي [[CREATE DATABASE]] بينسخ [[template1]]. متمسحهمش.

---

## ٢. [[\c app]]: انقل لقاعدة تانية

[[c]] من connect.

~~~text الناتج
You are now connected to database "app" as user "postgres".
~~~

في Postgres الاتصال بيبقى على قاعدة واحدة بس، ومينفعش تعمل استعلام على جدول في قاعدة تانية وانت مكانك. فـ [[\c]] بيقفل الاتصال ويفتح واحد جديد على القاعدة التانية. والـ prompt بيتغير لـ [[app=#]] عشان تفتكر انت فين.

---

## ٣. [[\dt]]: الجداول

[[d]] من describe و [[t]] من tables.

~~~text الناتج
          List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | orders   | table | postgres
 public | products | table | postgres
 public | sessions | table | postgres
 public | users    | table | postgres
(4 rows)
~~~

[[Schema]] هو «فولدر» جوه القاعدة، و [[public]] الفولدر الافتراضي اللي أي جدول بيتعمل فيه لو مقلتش غير كده. و **relation** اسم Postgres العام لأي حاجة شكلها جدول (جدول، view، index، sequence).

---

## ٤. [[\d users]]: أهم أمر فيهم

~~~text الناتج
                                      Table "public.users"
   Column   |           Type           | Collation | Nullable |             Default
------------+--------------------------+-----------+----------+----------------------------------
 id         | bigint                   |           | not null | generated by default as identity
 email      | text                     |           | not null |
 plan       | text                     |           | not null | 'free'::text
 is_admin   | boolean                  |           | not null | false
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    TABLE "sessions" CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

### الجزء الأول: الأعمدة

| العمود | معناه |
|---|---|
| [[Column]] | اسم العمود |
| [[Type]] | نوعه: [[bigint]] رقم صحيح كبير، [[text]] نص، [[boolean]] صح/غلط، [[timestamp with time zone]] تاريخ ووقت |
| [[Nullable]] | [[not null]] يعني ممنوع يتساب فاضي |
| [[Default]] | القيمة لو مبعتهاش: [[generated by default as identity]] يعني رقم بيزيد لوحده، و [['free'::text]] النص free (و [[::text]] معناها «من نوع text») |

### الجزء التاني: Indexes

[[users_pkey]] هو الـ primary key على [[id]]، و [[users_email_key]] بيمنع إيميل يتكرر. و [[btree]] نوع الـ index (شجرة مترتبة، الافتراضي).

### الجزء التالت: العلاقات

[[Referenced by]] يعني «جداول تانية بتشاور عليا»: [[orders.user_id]] و [[sessions.user_id]] لازم يبقوا [[id]] موجود في users. ولو عملت [[\d orders]] هتلاقي نفس العلاقة من الناحية التانية تحت اسم مختلف:

~~~text آخر \d orders
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

ولاحظ إن مفيش index على [[orders.user_id]]: Postgres مش بيعمله لوحده للـ foreign key، ودي حاجة هترجعلها في درس الـ indexes.

---

## ٥. [[\d+ users]]: نفسه بزيادة

[[+]] في أغلب أوامر الـ backslash معناها «تفاصيل أكتر». هنا بيضيف أعمدة [[Storage]] و [[Compression]] و [[Stats target]] و [[Description]] (الوصف اللي بيتكتب بـ [[COMMENT ON]]). الحجم مش هنا، الحجم في [[\dt+]]:

~~~text \dt+ users
 Schema | Name  | Type  |  Owner   | Persistence | Access method | Size  | Description
--------+-------+-------+----------+-------------+---------------+-------+-------------
 public | users | table | postgres | permanent   | heap          | 16 kB |
~~~

---

## ٦. [[\du]] و [[\dn]] و [[\df]]

~~~text \du (u من users، وفي Postgres اسمهم roles)
 Role name |                         Attributes
-----------+------------------------------------------------------------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS
~~~

[[Superuser]] يقدر يعمل أي حاجة، و [[Bypass RLS]] يعدّي قواعد Row Level Security. يوزر التطبيق مينفعش يبقى كده (درس «يوزرز وصلاحيات»).

~~~text \dn (n من namespaces، يعني schemas)
  Name  |       Owner
--------+-------------------
 public | pg_database_owner
~~~

~~~text \df (f من functions) بعد ما عملت دالة تجربة
 Schema |       Name       | Result data type | Argument data types | Type
--------+------------------+------------------+---------------------+------
 public | user_order_count | bigint           | uid bigint          | func
~~~

على قاعدة جديدة [[\df]] بيطلّع [[(0 rows)]] لأنه بيعرض دوالك انت بس، مش الدوال الجاهزة.

---

## ٧. [[\q]]: اخرج

[[q]] من quit. أو [[Ctrl+D]].

---

## الخلاصة

| الأمر | بيعرض |
|---|---|
| [[\l]] | القواعد |
| [[\c اسم]] | ينقلك لقاعدة |
| [[\dt]] / [[\dt+]] | الجداول / ومعاها الحجم |
| [[\d جدول]] | الأعمدة والـ indexes والعلاقات |
| [[\du]] و [[\dn]] و [[\df]] | اليوزرز، الـ schemas، الدوال |
| [[\?]] | كل أوامر الـ backslash |
| [[\q]] | خروج |

> SQL محتاج [[;]] في الآخر، وأوامر [[\]] لأ (ولو كتبتها psql بيتجاهلها، جرّبت [[\d sessions;]] واشتغل عادي).`,
          lines: [
            "القواعد الموجودة.",
            "اتصل بقاعدة app.",
            "الجداول.",
            "أعمدة users وأنواعها و indexes و foreign keys.",
            "نفسه مع أعمدة التخزين والوصف.",
            "اليوزرز وصلاحياتهم.",
            "الـ schemas.",
            "الدوال.",
            "اخرج."
          ],
          sol: R`[[\d users]] بيطلّع جدول فيه [[Column]] و [[Type]] و [[Nullable]] و [[Default]]، وتحته أقسام. على جدول users بسيط الناتج كان كده:

[[id | bigint | not null | nextval('users_id_seq'::regclass)]] يعني الـ id بيتولّد من sequence. وتحت [[Indexes:]] لقيت [["users_pkey" PRIMARY KEY, btree (id)]] و [["users_email_key" UNIQUE CONSTRAINT, btree (email)]]. وفي الآخر [[Referenced by:]] فيها [[TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)]]، يعني جدول تاني بيشاور على ده. ولو الجدول نفسه بيشاور على غيره هتلاقي قسم [[Foreign-key constraints:]].

الحاجات اللي تسأل نفسك عنها وانت بتقرا: فيه index على الأعمدة اللي بتعمل عليها WHERE؟ الأعمدة المهمة [[not null]]؟ الـ foreign keys عليها index (Postgres مش بيعمله لوحده على العمود اللي بيشاور)؟ ولو [[\d users]] قالك [[Did not find any relation named "users"]] يبقى انت في قاعدة غلط ([[\c]] للصح) أو الجدول في schema تانية ([[\dn]]).`
        },
        {
          cmd: R`\x و \timing`,
          title: "خلّي الناتج مقروء",
          desc: R`جدول فيه ٢٠ عمود بيطلع مكسّر. [[\x]] بيعرض كل صف رأسي (عمود: قيمة). [[\timing]] بيطبع وقت كل استعلام، أول أداة لقياس الأداء. و [[\pset]] بيتحكم في الشكل.`,
          example: R`\x
SELECT * FROM users LIMIT 1;
\x auto
\timing
SELECT count(*) FROM orders;
\pset null '[NULL]'
\pset format csv`,
          try: R`شغّل [[\timing]] وقارن وقت استعلام بـ WHERE على عمود عليه index وعمود من غير.`,
          deep: {
            why: "SELECT * على جدول فيه ٢٠ عمود بيطلع سطور ملفوفة مستحيل تقراها. و«الاستعلام ده بطيء» محتاج رقم.",
            how: R`[[\x]] (expanded) بيبدّل العرض: بدل جدول عرضي، كل صف بيتعرض رأسي، اسم العمود وجنبه القيمة. [[\x auto]] بيقرر لوحده حسب عرض الناتج، ودي أحسن إعداد دايم.

[[\timing]] بيطبع بعد كل استعلام [[Time: 12.345 ms]]. ده الوقت الكلي من psql بما فيه الشبكة، مش وقت التنفيذ بس، بس كفاية للمقارنة قبل وبعد index.

[[\pset]] إعدادات العرض: [[null '[NULL]']] بيميّز NULL عن النص الفاضي (افتراضيًا الاتنين فاضي وده مضلل). [[format csv]] الناتج CSV، مفيد مع [[\o file]] تكتبه في ملف.

وتقدر تحط الإعدادات دي في [[~/.psqlrc]] تشتغل مع كل جلسة: [[\x auto]] و [[\timing on]] و [[\pset null]].`,
            when: R`\x auto و \timing في .psqlrc من أول يوم.`,
            mistakes: R`تقيس بـ \timing مرة واحدة: أول مرة الكاش بارد. شغّل ٣ مرات وخد المتوسط.`
          },
          teach: R`## الفكرة: مفاتيح بتغيّر شكل الناتج

الأوامر دي مش بتغيّر البيانات ولا الاستعلام، بتغيّر إزاي psql **بيعرض** الناتج. كل واحد منهم زي مفتاح نور: تكتبه مرة يشتغل، ومرة كمان يطفى (والـ psql بيقولك الحالة في سطر). وبيفضلوا شغالين لحد ما تخرج من psql.

الناتج تحت من [[postgres:16]] جوه Docker، على جدول [[users]] فيه ٥ صفوف و [[orders]] فيه ٢٠٠ ألف صف.

---

## ١. [[\x]]: كل صف بالطول

[[x]] من expanded. من غيره، الصف بيتعرض عرضي:

~~~text SELECT * FROM users LIMIT 1; (من غير \x)
 id |      email       | plan | is_admin |       created_at
----+------------------+------+----------+------------------------
  1 | sara@example.com | pro  | t        | 2025-11-03 10:00:00+00
(1 row)
~~~

ده لسه مقروء لأن الجدول ٥ أعمدة بس. جدول فيه ٢٠ عمود بيطلع أعرض من الشاشة والسطور تتلف فوق بعض. شغّل [[\x]] وجرّب نفس الاستعلام:

~~~text الناتج بعد \x
Expanded display is on.
-[ RECORD 1 ]----------------------
id         | 1
email      | sara@example.com
plan       | pro
is_admin   | t
created_at | 2025-11-03 10:00:00+00
~~~

[[-[ RECORD 1 ]-]] رقم الصف، وتحته كل عمود في سطر: الاسم على الشمال والقيمة على اليمين. و [[t]] في [[is_admin]] معناها true (و [[f]] false).

[[SELECT *]] معناها كل الأعمدة، و [[LIMIT 1]] هات صف واحد بس.

---

## ٢. [[\x auto]]: خليه يقرر لوحده

~~~text الناتج
Expanded display is used automatically.
~~~

لو الناتج داخل في عرض الشاشة يتعرض عادي، ولو أعرض يتعرض بالطول. ده أحسن إعداد تسيبه دايمًا.

---

## ٣. [[\timing]]: كام ثانية خد؟

~~~text الناتج
Timing is on.
~~~

وبعدها أي استعلام بيطبع سطر [[Time:]] في الآخر. شغّلت نفس العدّ مرتين:

~~~text SELECT count(*) FROM orders; مرتين
 count
--------
 200000
(1 row)

Time: 9.285 ms
 count
--------
 200000
(1 row)

Time: 6.879 ms
~~~

[[count(*)]] بيعدّ الصفوف. و [[ms]] مللي ثانية (الثانية فيها ١٠٠٠). ليه المرة التانية أسرع؟ لأن صفحات الجدول بقت في الذاكرة (cache) بعد أول مرة، فمش محتاج يقراها من الديسك. عشان كده متحكمش من أول قياس.

> الرقم ده الوقت كله من psql: إرسال الاستعلام وتنفيذه ورجوع الناتج. لوقت التنفيذ لوحده فيه [[EXPLAIN ANALYZE]] (ليه درس في المستوى ٢).

---

## ٤. [[\pset null '[NULL]']]: فرّق بين «مفيش قيمة» و «نص فاضي»

[[\pset]] من print set: إعدادات الطباعة. و [[null]] الإعداد اللي بيحدد إيه اللي يتطبع مكان NULL. افتراضيًا NULL بيتطبع فراغ، ونص فاضي [['']] برضه فراغ، فمش هتفرق بينهم. جرّبت:

~~~text SELECT email, NULLIF(plan,'free') AS paid_plan, '' AS empty FROM users ORDER BY id LIMIT 3;
Null display is "[NULL]".
      email       | paid_plan | empty
------------------+-----------+-------
 sara@example.com | pro       |
 omar@example.com | [NULL]    |
 mona@example.com | [NULL]    |
(3 rows)
~~~

[[NULLIF(plan,'free')]] بترجع NULL لو الخطة free، فبقت ظاهرة بالكلمة اللي اخترناها. أما عمود [[empty]] نص فاضي حقيقي، فلسه فراغ. من غير الإعداد الاتنين كانوا هيبانوا زي بعض.

---

## ٥. [[\pset format csv]]: الناتج CSV

~~~text SELECT id, email, plan FROM users ORDER BY id LIMIT 3;
Output format is csv.
id,email,plan
1,sara@example.com,pro
2,omar@example.com,free
3,mona@example.com,free
~~~

مفيش خطوط ولا مسافات ولا [[(3 rows)]]: سطر عناوين وبعده القيم بفواصل. ينفع تنسخه في Excel، أو تكتبه في ملف بـ [[\o file.csv]] (كل الناتج بعدها يروح للملف). ترجع للشكل العادي بـ [[\pset format aligned]].

---

## ٦. خليهم دايمًا شغالين: [[~/.psqlrc]]

psql بيقرا الملف ده كل ما يفتح (لو موجود في الـ home بتاعك):

~~~text ~/.psqlrc
\x auto
\timing on
\pset null '[NULL]'
~~~

[[\timing on]] بدل [[\timing]] لوحدها، عشان [[on]] بتشغّله أكيد، أما من غيرها فهو بيقلب الحالة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[\x]] | يقلب بين العرض العادي والعرض بالطول |
| [[\x auto]] | بالطول بس لما الناتج عريض |
| [[\timing]] | يطبع وقت كل استعلام |
| [[\pset null '[NULL]']] | يبيّن NULL بدل الفراغ |
| [[\pset format csv]] | الناتج CSV |
| [[~/.psqlrc]] | إعدادات بتشتغل مع كل جلسة |`,
          lines: [
            "عرض رأسي: كل صف عمود تحت عمود.",
            "جرّب على صف.",
            "رأسي بس لما الناتج عريض.",
            "اطبع وقت كل استعلام.",
            "جرّب.",
            "اعرض NULL بشكل واضح بدل فراغ.",
            "الناتج CSV."
          ],
          sol: R`مع [[\x]] الصف بيتعرض عمودي: [[-[ RECORD 1 ]---]] وتحته كل عمود في سطر [[email | u2@x.com]]. و [[\timing]] بيطبع [[Timing is on.]] وبعد كل استعلام [[Time: ... ms]].

المقارنة الحقيقية محتاجة جدول كبير. على جدول فيه مليون صف: [[SELECT count(*) FROM big WHERE user_id = 4242]] أخد [[Time: 30.416 ms]] من غير index، وبعد [[CREATE INDEX idx_big_user ON big(user_id)]] نفس الاستعلام أخد [[Time: 0.678 ms]]، يعني أسرع بحوالي ٤٠ مرة.

الغلط الشائع: تجرّب على جدول فيه ٥ صفوف فتلاقي الاتنين [[1.5 ms]] و [[0.3 ms]] وتفتكر إن الـ index مالوش لازمة. على الجداول الصغيرة Postgres بيقرا الجدول كله أسرع من الـ index أصلًا. وخلي بالك إن أول تشغيل ممكن يبقى أبطأ عشان الداتا لسه مش في الـ cache، فشغّل كل استعلام مرتين وخد التاني.`
        },
        {
          cmd: "تشغيل SQL من ملف",
          title: "سكربتات وأوامر من بره",
          desc: R`مينفعش تكتب ١٠٠ سطر SQL في psql. [[\i]] ينفّذ ملف من جوه psql، و [[-f]] من الترمنال، و [[-c]] أمر واحد. و [[-v ON_ERROR_STOP=1]] يوقف عند أول error بدل ما يكمّل.`,
          example: R`psql -U postgres -d app -f schema.sql
psql -U postgres -d app -v ON_ERROR_STOP=1 -f seed.sql
psql -U postgres -d app -c "SELECT count(*) FROM users;"
psql -U postgres -d app -At -c "SELECT email FROM users;" > emails.txt
\i migrations/001_init.sql`,
          try: "اكتب ملف فيه CREATE TABLE و INSERT وشغّله بـ [[-f]]، وبعدين حط error في النص وشوف الفرق مع ON_ERROR_STOP.",
          deep: {
            why: "الـ schema والـ seed data والتقارير ملفات SQL في المشروع، بتتشغّل في CI وعلى السيرفر. وأي حاجة أطول من سطرين تتكتب في ملف.",
            how: R`[[-f file]] بيقرا الملف وينفّذ كل أمر فيه بالترتيب. افتراضيًا لو أمر فشل، psql بيطبع الـ error ويكمّل اللي بعده. في سكربت ده كارثة: نص الـ schema يتعمل ونصه لأ. [[-v ON_ERROR_STOP=1]] بيوقف عند أول error ويرجع exit code مش صفر، فالـ CI يعرف.

[[-c]] أمر واحد. و [[-A]] (unaligned) و [[-t]] (tuples only) مع بعض بيطلّعوا القيم بس من غير عناوين ولا خطوط، مثالي لما تحوّل الناتج لملف أو لأمر تاني.

[[\i]] من جوه psql نفس فكرة -f، والمسار نسبي للفولدر اللي شغّلت psql منه. و [[\ir]] المسار نسبي للملف اللي فيه الأمر، فملف master زي [[00_run_all.sql]] فيه [[\ir 01_extensions.sql]] و [[\ir 02_tables.sql]] بيشتغل من أي فولدر.

[[\i]] و [[\ir]] وكل أوامر الـ backslash بتاعة psql بس، مش SQL. السيرفر نفسه ميعرفهاش، فمش هتشتغل في SQL Editor بتاع Supabase ولا في DBeaver.

وللـ transactions: [[-1]] (single transaction) بيلف الملف كله في transaction واحدة، فلو حاجة فشلت كل حاجة تترجع.`,
            when: "schema.sql و seed.sql في CI. تقارير متكررة كملفات. أي أمر إداري بتكرره.",
            mistakes: R`سكربت من غير ON_ERROR_STOP بيفشل في النص ويكمّل، والنتيجة قاعدة نص متعملة. وفي مشروع حقيقي ملف [[00_run_all.sql]] كان مكتوب إنه «للصقه في SQL Editor» وهو كله [[\i]]، ففشل من أول سطر. ولما اتجمعت الملفات بـ [[cat 0*.sql > combined.sql]]، الـ glob دخّل ملف الـ master نفسه في النص؛ حدد الأرقام ([[0[1-9]_*.sql]]) أو استخدم psql -f على الـ master.`
          },
          teach: R`## الفكرة: SQL في ملف، و psql بيقراه سطر سطر

بدل ما تكتب الأوامر بإيدك في الـ prompt، بتحطها في ملف [[.sql]] وتقول لـ psql «نفّذ اللي في الملف ده». وفيه ٣ طرق: [[-f]] لملف من الترمنال، و [[-c]] لأمر واحد من الترمنال، و [[\i]] لملف من جوه psql. والمهم في الدرس: إيه اللي بيحصل لما سطر في النص يفشل.

كل الناتج تحت متشغّل على [[postgres:16]] جوه Docker، و psql جوه الـ container.

---

## ١. [[-f]]: نفّذ ملف

~~~bash
psql -U postgres -d app -f schema.sql
~~~

[[-f]] من file. psql بيفتح الملف وينفّذ كل أمر فيه بالترتيب (الأوامر بتتفصل بـ [[;]])، ويطبع رد كل أمر. ملف فيه [[CREATE TABLE]] واحد طبع:

~~~text الناتج
CREATE TABLE
~~~

ده رد السيرفر: «عملت الجدول». مفيش «تمام» تانية، السطر ده هو التأكيد.

---

## ٢. لما سطر يفشل: من غير ومع [[ON_ERROR_STOP]]

ملف تجربة فيه غلطة مقصودة في السطر التالت (نفس الـ id مرتين، والـ id عليه PRIMARY KEY):

~~~text seed.sql
CREATE TABLE t1 (id int PRIMARY KEY, name text);
INSERT INTO t1 VALUES (1, 'a');
INSERT INTO t1 VALUES (1, 'dup');
CREATE TABLE t2 (id int);
~~~

### من غير حماية

~~~bash
psql -d lab -f seed.sql; echo "exit=$?"
~~~

[[;]] هنا بتاعة الـ shell مش SQL: «بعد ما psql يخلص شغّل الأمر اللي بعدي». و [[$?]] متغير في bash فيه **exit code** آخر أمر: [[0]] يعني نجح، وأي رقم تاني يعني فشل.

~~~text الناتج
CREATE TABLE
INSERT 0 1
psql:seed.sql:3: ERROR:  duplicate key value violates unique constraint "t1_pkey"
DETAIL:  Key (id)=(1) already exists.
CREATE TABLE
exit=0
~~~

اقراه سطر سطر:

| السطر | معناه |
|---|---|
| [[INSERT 0 1]] | دخل صف واحد ([[1]] في الآخر عدد الصفوف، و [[0]] رقم قديم ملوش استخدام دلوقتي) |
| [[psql:seed.sql:3: ERROR:]] | الغلطة في الملف ده، **السطر ٣** |
| [[DETAIL]] | السبب بالتفصيل: الـ id 1 موجود |
| [[CREATE TABLE]] التانية | psql **كمّل** بعد الغلطة وعمل t2 |
| [[exit=0]] | وفي الآخر قال «نجحت» |

يعني سكربت deploy أو CI هيشوف [[0]] ويفتكر كله تمام، والقاعدة فيها نص الحاجات.

### مع [[-v ON_ERROR_STOP=1]]

[[-v]] من variable: بيعرّف متغير جوه psql. و [[ON_ERROR_STOP]] متغير خاص psql بيفهمه: لو [[1]] يقف عند أول error.

~~~bash
psql -d lab -v ON_ERROR_STOP=1 -f seed.sql; echo "exit=$?"
~~~

~~~text الناتج
CREATE TABLE
INSERT 0 1
psql:seed.sql:3: ERROR:  duplicate key value violates unique constraint "t1_pkey"
DETAIL:  Key (id)=(1) already exists.
exit=3
~~~

وقف عند السطر ٣ و t2 متعملتش، والـ exit code بقى [[3]] (رقم psql بيستخدمه لـ «سكربت وقف بسبب error»). أي CI هيعتبره فشل. بس خلي بالك: [[\dt]] بعدها لسه بيطلّع [[t1]]، لأن السطرين الأولانيين اتنفّذوا واتحفظوا كل واحد لوحده.

### كله أو ولا حاجة: [[--single-transaction]]

~~~bash
psql -d lab -v ON_ERROR_STOP=1 --single-transaction -f seed.sql; echo "exit=$?"
~~~

نفس الـ error ونفس [[exit=3]]، بس [[\dt]] بعدها قال [[Did not find any relations.]]: ولا جدول. [[--single-transaction]] (أو [[-1]]) بيلف الملف كله في transaction واحدة، فأي غلطة بترجّع كل اللي قبلها.

---

## ٣. [[-c]]: أمر واحد من غير ملف

~~~bash
psql -U postgres -d app -c "SELECT count(*) FROM users;"
~~~

~~~text الناتج
 count
-------
     5
(1 row)
~~~

---

## ٤. [[-At]]: القيم بس، في ملف

~~~bash
psql -U postgres -d app -At -c "SELECT email FROM users;" > emails.txt
~~~

| الحتة | معناها |
|---|---|
| [[-A]] | unaligned: من غير مسافات محاذاة ولا خطوط حوالين القيم |
| [[-t]] | tuples only: من غير سطر العناوين ولا [[(5 rows)]] |
| [[>]] | بتاعة الـ shell: ابعت الناتج لملف بدل الشاشة (وامسح اللي فيه قبلها) |

~~~text cat emails.txt
sara@example.com
omar@example.com
mona@example.com
hany@example.com
ali@example.com
~~~

إيميل في كل سطر وبس، جاهز لأي برنامج تاني. ([[-A]] و [[-t]] ليهم درس لوحدهم: «psql -tAc».)

---

## ٥. [[\i]]: ملف من جوه psql

~~~text جوه psql
\i migrations/001_init.sql
~~~

نفس [[-f]] بالظبط، بس وانت جوه psql. المسار نسبي للفولدر اللي فتحت منه psql:

~~~text الناتج
CREATE TABLE
~~~

ولو الملف مش موجود:

~~~text الناتج
nope.sql: No such file or directory
~~~

و [[\i]] أمر psql مش SQL، فلو لزقته في SQL Editor بتاع Supabase أو DBeaver هيطلع syntax error.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تنفّذ ملف | [[psql -d app -f file.sql]] |
| ويقف عند أول غلطة | زوّد [[-v ON_ERROR_STOP=1]] |
| ولو فشل ميسيبش حاجة | زوّد [[--single-transaction]] |
| أمر واحد | [[psql -d app -c "..."]] |
| قيم بس من غير شكل | زوّد [[-At]] |
| ملف من جوه psql | [[\i file.sql]] |

> في أي سكربت: [[ON_ERROR_STOP=1]] دايمًا، وإلا الغلطة هتعدّي و exit code هيبقى 0.`,
          lines: [
            "نفّذ ملف schema.",
            "نفس الحاجة بس اوقف عند أول error (لازمة في السكربتات).",
            "أمر واحد من الترمنال.",
            "القيم بس من غير عناوين ولا خطوط ([[-A]] و [[-t]])، في ملف.",
            "من جوه psql: نفّذ ملف."
          ],
          sol: R`من غير ON_ERROR_STOP، psql بيطبع الـ error ويكمّل: في التجربة بملف فيه INSERT مكرر في النص الناتج كان [[CREATE TABLE]] و [[INSERT 0 1]] وبعدين [[psql:seed.sql:3: ERROR:  duplicate key value violates unique constraint "t1_pkey"]] وبعدين [[CREATE TABLE]] للجدول التاني، و exit code [[0]]. يعني السكربت أو الـ CI هيفتكر إن كله تمام.

مع [[-v ON_ERROR_STOP=1]] بيقف عند السطر 3: الجدول التاني متعملش، و exit code بقى [[3]]. ودا اللي عايزه في أي deploy.

خلي بالك إن الجدول الأول اتعمل في الحالتين، لأن كل أمر بيتنفذ لوحده. لو عايز الملف كله يا يتنفذ يا لأ ضيف [[--single-transaction]] (أو [[-1]]). الغلط الشائع إنك تبص على آخر سطر في الناتج بس وتفوّت الـ ERROR اللي في النص.`,
          solCode: R`cat > seed.sql <<'EOF'
CREATE TABLE t1 (id int PRIMARY KEY, name text);
INSERT INTO t1 VALUES (1, 'a');
INSERT INTO t1 VALUES (1, 'dup');
CREATE TABLE t2 (id int);
EOF
psql -d lab -f seed.sql; echo "exit=$?"
psql -d lab -c "DROP TABLE IF EXISTS t1, t2"
psql -d lab -v ON_ERROR_STOP=1 -f seed.sql; echo "exit=$?"
psql -d lab -v ON_ERROR_STOP=1 --single-transaction -f seed.sql; echo "exit=$?"`
        },
        {
          cmd: R`\copy`,
          title: "CSV داخل وخارج",
          desc: R`تصدير جدول أو استعلام لـ CSV، أو استيراد CSV في جدول. [[\copy]] (بـ backslash) بيشتغل من جهازك عبر الاتصال، أما [[COPY]] الـ SQL بيقرا ملفات على السيرفر نفسه ومحتاج صلاحيات.`,
          example: R`\copy users TO 'users.csv' CSV HEADER
\copy (SELECT id, email FROM users WHERE created_at > '2026-01-01') TO 'new_users.csv' CSV HEADER
\copy products FROM 'products.csv' CSV HEADER
psql -d app -c "\copy orders TO STDOUT CSV HEADER" | head`,
          try: "صدّر جدول لـ CSV، افتحه في Excel، عدّل صف، وارجّعه في جدول جديد بـ FROM.",
          deep: {
            why: "العميل عايز الطلبات في Excel. أو عندك CSV من نظام قديم عايز تدخّله. أو بتنقل جدول بين قاعدتين.",
            how: R`[[COPY]] (SQL) أسرع طريقة لنقل بيانات في Postgres، بس بيقرا ويكتب ملفات على السيرفر اللي Postgres شغال عليه، وبيحتاج صلاحيات superuser. [[\copy]] (psql) بيعمل نفس الحاجة بس الملف على جهازك: psql بيقرا الملف ويبعت البيانات عبر الاتصال. عشان كده \copy هو اللي بتستخدمه غالبًا.

[[TO 'file' CSV HEADER]] تصدير بصف عناوين. وممكن تصدّر استعلام مش جدول كامل: بين أقواس.

[[FROM 'file' CSV HEADER]] استيراد: الأعمدة لازم تطابق الجدول بالترتيب، أو تحدد [[(col1, col2)]] بعد اسم الجدول. والاستيراد كله transaction واحدة: صف واحد غلط والكل بيترجع.

[[TO STDOUT]] بيطلّع على الشاشة أو الـ pipe، فتقدر تعمل [[| head]] أو [[| gzip]].`,
            when: "تصدير للعميل. استيراد بيانات أولية. نقل جدول.",
            mistakes: "CSV فيه فاصلة جوه قيمة من غير علامات تنصيص. وترميز الملف مش UTF-8 فالعربي يطلع رموز."
          },
          teach: R`## الفكرة: جدول ⇄ ملف CSV

CSV (من Comma-Separated Values) أبسط شكل لجدول في ملف نصي: كل صف في سطر، والأعمدة بينها فاصلة. Excel و Google Sheets وأي لغة برمجة بيفهموه. و [[\copy]] بينقل بين جدول في Postgres وملف CSV على **جهازك**: [[TO]] يطلّع من الجدول للملف، و [[FROM]] يدخّل من الملف للجدول.

الناتج تحت من [[postgres:16]] جوه Docker، و psql جوه الـ container (فالملفات اتكتبت في فولدر جوه الـ container).

---

## ١. صدّر جدول كامل

~~~text جوه psql
\copy users TO 'users.csv' CSV HEADER
~~~

| الحتة | معناها |
|---|---|
| [[\copy]] | أمر psql (عشان الـ backslash): psql هو اللي بيكتب الملف |
| [[users]] | الجدول |
| [[TO 'users.csv']] | اكتب في الملف ده (المسار نسبي للفولدر اللي فتحت منه psql) |
| [[CSV]] | الشكل: فواصل، وأي قيمة فيها فاصلة تتحط بين [["]] |
| [[HEADER]] | أول سطر يبقى أسماء الأعمدة |

~~~text الناتج
COPY 5
~~~

[[COPY 5]] يعني ٥ صفوف اتكتبوا. والملف:

~~~text users.csv
id,email,plan,is_admin,created_at
1,sara@example.com,pro,t,2025-11-03 10:00:00+00
2,omar@example.com,free,f,2026-01-15 09:30:00+00
3,mona@example.com,free,f,2026-02-20 14:10:00+00
4,hany@example.com,pro,t,2026-03-05 18:45:00+00
42,ali@example.com,free,f,2026-04-01 08:00:00+00
~~~

[[t]] و [[f]] هما true و false زي ما Postgres بيكتبهم.

---

## ٢. صدّر نتيجة استعلام

~~~text جوه psql
\copy (SELECT id, email FROM users WHERE created_at > '2026-01-01') TO 'new_users.csv' CSV HEADER
~~~

بدل اسم جدول حطينا استعلام كامل **بين أقواس**. الأقواس دي اللي بتقول لـ [[\copy]] «ده استعلام مش جدول». والاستعلام بيجيب الـ id والإيميل لليوزرز اللي اتسجلوا بعد أول ٢٠٢٦.

~~~text الناتج و new_users.csv
COPY 4
id,email
2,omar@example.com
3,mona@example.com
4,hany@example.com
42,ali@example.com
~~~

سارة مش موجودة لأنها اتسجلت في ٢٠٢٥. خلي بالك: [[\copy]] لازم يتكتب كله في **سطر واحد**، مينفعش تكسّره على سطرين زي SQL العادي.

---

## ٣. استورد CSV في جدول

الملف ده فيه قيمة فيها فاصلة، فهي بين [["]]:

~~~text products.csv
id,name,price
1,Mechanical Keyboard,1450.00
2,"USB-C Hub, 7 ports",899.50
3,Laptop Stand,650.00
~~~

~~~text جوه psql
\copy products FROM 'products.csv' CSV HEADER
SELECT * FROM products;
~~~

~~~text الناتج
COPY 3
 id |        name         |  price
----+---------------------+---------
  1 | Mechanical Keyboard | 1450.00
  2 | USB-C Hub, 7 ports  |  899.50
  3 | Laptop Stand        |  650.00
~~~

[[HEADER]] هنا معناها «أول سطر عناوين، اتخطاه». والأعمدة لازم تيجي بنفس ترتيب أعمدة الجدول (أو تكتب [[products (id, name, price)]]). والجدول لازم يكون موجود قبلها: [[\copy]] مش بيعمل جداول.

### لو صف واحد غلط؟

شغّلت نفس الاستيراد تاني (الـ ids موجودة فعلًا):

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "products_pkey"
DETAIL:  Key (id)=(1) already exists.
CONTEXT:  COPY products, line 2
~~~

[[line 2]] رقم السطر في الملف. والاستيراد كله بيترجع، مش بيدخل نص الملف: يا كله يا ولا حاجة.

---

## ٤. على الشاشة أو في pipe: [[TO STDOUT]]

~~~bash
psql -d app -c "\copy orders TO STDOUT CSV HEADER" | head
~~~

[[STDOUT]] (standard output) هو «الشاشة» أو أي حاجة بعد [[|]]. و [[| head]] بياخد أول ١٠ سطور بس، عشان الجدول فيه ٢٠٠ ألف صف:

~~~text الناتج (أول سطور)
id,user_id,status,total,created_at
1,2,pending,19.99,2026-10-06 12:36:38.572192+00
2,3,cancelled,29.99,2026-10-06 11:36:38.572192+00
3,4,paid,39.99,2026-10-06 10:36:38.572192+00
~~~

---

## ٥. الفرق بين [[\copy]] و [[COPY]]

[[COPY]] من غير backslash أمر SQL، والسيرفر نفسه هو اللي بيفتح الملف، **على جهاز السيرفر** وبصلاحيات برنامج Postgres. جرّبته:

~~~text COPY users TO '/work/x.csv';  كـ superuser
ERROR:  could not open file "/work/x.csv" for writing: Permission denied
HINT:  COPY TO instructs the PostgreSQL server process to write a file. You may want a client-side facility such as psql's \copy.
~~~

الفولدر بتاعي، بس اللي حاول يكتب هو برنامج السيرفر ومالوش صلاحية. ونفس الأمر بيوزر عادي:

~~~text الناتج بيوزر مش superuser
ERROR:  permission denied to COPY to a file
DETAIL:  Only roles with privileges of the "pg_write_server_files" role may COPY to a file.
HINT:  Anyone can COPY to stdout or from stdin. psql's \copy command also works for anyone.
~~~

| | [[\copy]] | [[COPY]] |
|---|---|---|
| مين بيقرا/يكتب الملف | psql على جهازك | السيرفر على جهازه |
| الصلاحية | أي يوزر عنده صلاحية على الجدول | superuser أو role خاص |
| مع سيرفر بعيد (Supabase مثلًا) | يشتغل | الملف هيتدوّر عليه على السيرفر |

---

## الخلاصة

~~~text
\copy جدول TO 'file.csv' CSV HEADER            تصدير
\copy (SELECT ...) TO 'file.csv' CSV HEADER    تصدير استعلام (سطر واحد)
\copy جدول FROM 'file.csv' CSV HEADER          استيراد (الجدول موجود، الأعمدة بالترتيب)
COPY n                                          عدد الصفوف اللي اتنقلت
~~~`,
          lines: [
            "صدّر جدول لـ CSV بصف عناوين.",
            "صدّر استعلام (مش جدول كامل).",
            "استورد CSV في جدول (الأعمدة بنفس الترتيب).",
            "من الترمنال: صدّر على stdout وشوف أول سطور."
          ],
          sol: R`التصدير بيطبع [[COPY 5]] (عدد الصفوف)، والملف أوله سطر الـ header: [[id,email,plan,created_at]] وبعده صف لكل user. وبعد ما تعدّل وتعمل جدول جديد بنفس الشكل وترجّع بـ FROM هتشوف [[COPY 5]] تاني، و SELECT على الصف اللي عدلته هيطلّع القيمة الجديدة.

[[\copy]] مش بيعمل الجدول: لو كتبت اسم جدول مش موجود هيقولك [[ERROR:  relation "users_new" does not exist]]. اعمله الأول بـ [[CREATE TABLE users_new (LIKE users INCLUDING DEFAULTS);]].

المشاكل الشائعة من Excel: بيغيّر شكل التواريخ لـ [[30/09/2026 04:55]] فيطلع [[invalid input syntax for type timestamp]] أو [[date/time field value out of range]]، وممكن يحفظ بـ separator [[;]] بدل [[,]] حسب إعدادات اللغة، أو يضيف BOM في أول الملف فالعمود الأول يبقى اسمه غريب. احفظ كـ «CSV UTF-8». ولو استخدمت [[COPY]] من غير الـ backslash هيدوّر على الملف على السيرفر مش جهازك، ويقولك [[could not open file]] أو [[must be superuser or have privileges of the pg_read_server_files role]].`,
          solCode: R`\copy users TO 'users.csv' CSV HEADER
-- عدّل users.csv واحفظه CSV UTF-8
CREATE TABLE users_import (LIKE users INCLUDING DEFAULTS);
\copy users_import FROM 'users.csv' CSV HEADER
SELECT id, email, plan FROM users_import ORDER BY id;`
        },
        {
          cmd: "psql -tAc",
          title: "ناتج SQL نضيف تحطه في متغير",
          desc: R`في السكربتات محتاج القيمة بس: رقم أو قايمة إيميلات. [[-t]] بيشيل العناوين وسطر العدد، و [[-A]] بيشيل المسافات والخطوط، و [[-c]] أمر واحد. النتيجة قيم خام تحطها في متغير أو لوب.

و Postgres معندوش [[CREATE DATABASE IF NOT EXISTS]]، فبتسأل بـ [[-tAc]] الأول.`,
          example: R`COUNT=$(psql -U postgres -d app -tAc "SELECT count(*) FROM users")
echo "users: $COUNT"
psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'app_test'" | grep -q 1 || createdb -U postgres app_test
for email in $(psql -U postgres -d app -tAc "SELECT email FROM users WHERE is_admin"); do echo "admin: $email"; done
docker compose exec -T postgres psql -U app -d appdb -tAc "SELECT lower(code) FROM staff WHERE is_active" | tr '\n' ' '
echo "SELECT name FROM staff WHERE code = :'code'" | psql -U app -d appdb -tA -v code="$CODE"`,
          try: "اعمل سكربت بيطبع [[users: N]] من قاعدة الـ lab، وشغّل سطر إنشاء القاعدة مرتين: التانية مش هتطلع error.",
          flag: "term",
          deep: {
            why: "سكربتات الديبلوي والصيانة محتاجة تسأل القاعدة: فيه كام يوزر؟ القاعدة موجودة؟ مين الموظفين النشطين؟ وناتج psql العادي بجدول وعناوين مينفعش يدخل في متغير.",
            how: R`ناتج psql العادي فيه عناوين، وخط تحتها، ومسافات للمحاذاة، وسطر [[(1 row)]] في الآخر. [[-t]] (tuples only) بيشيل العناوين والعدد، و [[-A]] (unaligned) بيشيل المسافات. الاتنين مع بعض: كل صف في سطر، والأعمدة بينها [[|]].

[[$(...)]] بياخد الناتج في متغير. ولو صفوف كتير، [[for x in $(...)]] بيلف عليهم (ينفع لقيم من غير مسافات زي الإيميلات والأكواد).

سطر [[grep -q 1 || createdb]]: لو السؤال رجّع 1 القاعدة موجودة و grep ينجح فـ createdb مش بيتنفّذ. كده السطر ينفع يتكرر في Makefile أو CI.

جوه Docker: [[docker compose exec -T]] من غير TTY، لازم في السكربتات و cron وإلا يطلع [[the input device is not a TTY]]. و [[tr '\n' ' ']] بيحوّل السطور لقايمة في سطر واحد.

آخر سطر: قيمة جاية من بره (argument أو input) متتحطش جوه SQL بـ [['$CODE']]. [[-v code=...]] بيعرّف متغير psql، و [[:'code']] بيحطه كنص بعلامات صح. بس ده بيشتغل مع SQL جاي من stdin أو [[-f]]، مش مع [[-c]] (psql مش بيبدّل المتغيرات جوه -c).`,
            when: "أي سكربت محتاج قيمة من القاعدة: فحوصات قبل الديبلوي، وإنشاء قواعد تجربة، وتقارير سريعة.",
            mistakes: R`في مشروع حقيقي سكربت كان بياخد أكواد الموظفين من الـ arguments ويحطها جوه SQL مباشرة ([[WHERE code = '$code']])؛ كود فيه [[']] يبقى SQL injection. الحل [[-v]] مع [[:'code']]، أو على الأقل تفحص القيمة بـ regex قبلها. و [[-t]] من غير [[-A]] بيسيب مسافة قبل القيمة، فـ [[test "$X" = "1"]] يفشل من غير سبب واضح.`
          },
          teach: R`## الفكرة: ناتج psql «نضيف» يدخل في سكربت

ناتج psql العادي معمول عشان بني آدم يقراه: عناوين وخطوط ومسافات وسطر [[(1 row)]]. سكربت bash محتاج القيمة بس. ٣ حروف بيعملوا ده: [[-t]] و [[-A]] و [[-c]]، ومكتوبين لازقين في بعض [[-tAc]] (أي flags من حرف واحد ينفع تتلزق).

الناتج تحت من bash جوه container بتاع [[postgres:16]]، على قاعدة [[app]] فيها ٥ يوزرز وجدول [[staff]] فيه ٣ موظفين (اتنين نشطين). سطر [[docker compose exec]] اتجرّب بنفس الفكرة بـ [[docker exec]].

---

## ١. ليه [[-t]] و [[-A]]؟ قارن بعينك

~~~text psql -d app -c "SELECT count(*) FROM users"
 count
-------
     5
(1 row)
~~~

~~~text نفسه بـ -t (و cat -A بيبيّن نهاية كل سطر بـ $)
     5$
$
~~~

~~~text نفسه بـ -tA
5$
~~~

| الـ flag | من كلمة | بيشيل إيه |
|---|---|---|
| [[-t]] | tuples only | العناوين والخط وسطر [[(1 row)]] |
| [[-A]] | unaligned | المسافات اللي قبل القيمة (والسطر الفاضي) |
| [[-c]] | command | مش بيشيل حاجة: بيدّيله الأمر اللي ينفّذه |

[[-t]] لوحدها سابت [[     5]] بمسافات قدامها، ودي اللي بتبوّظ المقارنات. الاتنين مع بعض: [[5]] وبس. ولو فيه أكتر من عمود، بيتفصلوا بـ [[|]]:

~~~text psql -d app -tAc "SELECT id, email FROM users WHERE is_admin"
1|sara@example.com
4|hany@example.com
~~~

---

## ٢. القيمة في متغير

~~~bash
COUNT=$(psql -U postgres -d app -tAc "SELECT count(*) FROM users")
echo "users: $COUNT"
~~~

[[$( ... )]] اسمها command substitution: شغّل الأمر اللي جوه، وحط اللي طبعه مكانه. فـ [[COUNT]] بقى فيه [[5]]. ومفيش مسافات حوالين [[=]] في bash، وإلا هيفتكر [[COUNT]] اسم أمر.

~~~text الناتج
users: 5
~~~

---

## ٣. اعمل القاعدة لو مش موجودة بس

Postgres معندوش [[CREATE DATABASE IF NOT EXISTS]]، و [[createdb]] على اسم موجود بيفشل:

~~~text createdb -U postgres app_test (مرة تانية)
createdb: error: database creation failed: ERROR:  database "app_test" already exists
~~~

فبنسأل الأول:

~~~bash
psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'app_test'" | grep -q 1 || createdb -U postgres app_test
~~~

نفكه بالترتيب:

1. [[pg_database]] جدول نظام فيه صف لكل قاعدة، و [[datname]] عمود الاسم. الاستعلام بيطبع [[1]] لو القاعدة موجودة، ومش بيطبع حاجة لو لأ. واتصلنا بقاعدة [[postgres]] لأنها موجودة دايمًا.
2. [[| grep -q 1]]: [[|]] (pipe) بيوصّل ناتج psql لـ grep. و grep بيدوّر على [[1]]، و [[-q]] (quiet) يعني متطبعش حاجة، بس رجّع exit code: [[0]] لو لقى، غير كده لو ملقاش.
3. [[|| createdb ...]]: [[||]] معناها «لو اللي قبلي فشل، شغّلني». يعني لو grep ملقاش 1، اعمل القاعدة.

شغّلت السطر مرتين ورا بعض: الاتنين خرجوا بـ [[exit=0]] من غير ولا رسالة، والقاعدة ظهرت مرة واحدة في [[psql -l]]. ده اللي بيخلي السطر آمن يتكرر في Makefile أو CI.

---

## ٤. لف على صفوف

~~~bash
for email in $(psql -U postgres -d app -tAc "SELECT email FROM users WHERE is_admin"); do echo "admin: $email"; done
~~~

[[for x in ...; do ...; done]] بيلف على كل كلمة في القايمة. والقايمة هنا ناتج psql: إيميل في كل سطر.

~~~text الناتج
admin: sara@example.com
admin: hany@example.com
~~~

bash بيقسّم على المسافات كمان مش السطور بس، فالطريقة دي تنفع لقيم مفيهاش مسافات (إيميلات، أكواد، أرقام).

---

## ٥. من جوه Docker في سكربت

~~~bash
docker compose exec -T postgres psql -U app -d appdb -tAc "SELECT lower(code) FROM staff WHERE is_active" | tr '\n' ' '
~~~

| الحتة | معناها |
|---|---|
| [[docker compose exec]] | شغّل أمر جوه خدمة من compose |
| [[-T]] | من غير ترمنال (TTY). لازمة لما الناتج رايح لـ pipe أو في cron |
| [[postgres]] | اسم الخدمة في compose.yml |
| [[lower(code)]] | الكود بحروف صغيرة |
| [[tr '\n' ' ']] | tr من translate: بدّل كل سطر جديد بمسافة |

جرّبت الفكرة بـ [[docker exec]] (من غير compose):

~~~text الناتج
emp01 emp02
~~~

ومن غير [[-T]]؟ مع [[docker exec -it]] والـ input مش ترمنال، Docker رفض:

~~~text الناتج
cannot attach stdin to a TTY-enabled container because stdin is not a terminal
~~~

---

## ٦. قيمة جاية من بره: بأمان

~~~bash
echo "SELECT name FROM staff WHERE code = :'code'" | psql -U app -d appdb -tA -v code="$CODE"
~~~

- [[-v code="$CODE"]]: اعمل متغير psql اسمه [[code]] قيمته اللي في متغير bash.
- [[:'code']]: جوه الـ SQL، حط قيمة المتغير **كنص بعلامات تنصيص صح**. لو القيمة فيها [[']] psql بيعملها escape.
- الـ SQL داخل من [[echo ... |]] (stdin) مش [[-c]]، لأن psql **مش** بيبدّل المتغيرات جوه [[-c]]:

~~~text نفس الاستعلام بـ -c
ERROR:  syntax error at or near ":"
LINE 1: SELECT name FROM staff WHERE code = :'code'
~~~

بـ [[CODE=EMP02]] الناتج كان [[Omar]]. والتجربة المهمة: قيمة خبيثة [[x' OR '1'='1]]. بالطريقة الآمنة ([[-v]] و [[:'code']]) مطلعش ولا سطر، لأن مفيش موظف الكود بتاعه النص ده بالحرف. أما بالطريقة الغلط:

~~~text الطريقة الغلط: psql -tAc "... WHERE code = '$CODE'"
Sara
Omar
Mona
~~~

في الطريقة الغلط، bash حط النص جوه الـ SQL زي ما هو، فالاستعلام بقى [[WHERE code = 'x' OR '1'='1']]، والشرط ده صح دايمًا، فرجّع **كل** الموظفين. ده اسمه SQL injection.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| قيمة بس من غير شكل | [[psql -tAc "..."]] |
| في متغير | [[X=$(psql -tAc "...")]] |
| اعمل لو مش موجود | اسأل بـ [[-tAc "SELECT 1 ..."]] و [[grep -q 1]]، ولو ملقاش شغّل createdb |
| من Docker في سكربت | [[docker compose exec -T]] |
| قيمة من بره | [[-v name="$VAR"]] و [[:'name']] والـ SQL من stdin |`,
          lines: [
            "عدد اليوزرز في متغير (رقم بس، من غير عناوين).",
            "استخدمه.",
            "اعمل القاعدة لو مش موجودة بس (Postgres معندوش IF NOT EXISTS هنا).",
            "لف على نتيجة استعلام سطر سطر.",
            "من جوه Docker في سكربت (-T)، والقايمة في سطر واحد.",
            "قيمة من بره بأمان: متغير psql بدل ما تلزقها في SQL."
          ],
          sol: R`السكربت بيطبع [[users: 5]] (أو عدد الصفوف عندك) من غير مسافات ولا header، بفضل [[-t]] و [[-A]]. وتشغيل سطر إنشاء القاعدة أول مرة بيعمل القاعدة، وتاني مرة [[grep -q 1]] بيلاقي الـ 1 فالـ [[||]] مش بيشغّل createdb، والسكربت بيخرج بـ 0 من غير أي رسالة.

قارن بـ [[createdb lab_test]] لوحده مرتين: التانية بتقول [[createdb: error: database creation failed: ERROR:  database "lab_test" already exists]] و exit 1، ومع [[set -e]] السكربت كله يقع.

الغلط الشائع: تنسى [[-A]] فيبقى [[COUNT]] فيه مسافات زي [["     5"]] والمقارنات تبوظ، أو تنسى [[-t]] فالمتغير يبقى فيه [[count]] و [[-------]] و [[(1 row)]].`,
          solCode: R`#!/usr/bin/env bash
set -euo pipefail
COUNT=$(psql -X -d lab -tAc "SELECT count(*) FROM users")
echo "users: $COUNT"
psql -X -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'lab_test'" | grep -q 1 || createdb lab_test`
        },
        {
          cmd: "createdb / dropdb",
          title: "أدوات الترمنال بتاعة Postgres",
          desc: "برامج صغيرة بتيجي مع Postgres بتعمل نفس SQL من الترمنال: [[createdb]] و [[dropdb]] و [[createuser]] و [[pg_isready]]. مفيدة في السكربتات والـ CI من غير ما تدخل psql.",
          example: R`createdb -U postgres app_test
dropdb -U postgres app_test
createuser -U postgres --pwprompt app_user
pg_isready -h localhost -p 5432
psql -l`,
          try: "اعمل قاعدة تجربة بـ createdb، اتأكد إنها ظهرت في [[psql -l]]، وامسحها.",
          flag: "danger",
          deep: {
            why: "في CI والسكربتات محتاج تعمل قاعدة تجربة وتمسحها من غير ما تدخل psql وتكتب SQL.",
            how: R`الأدوات دي مجرد wrappers: [[createdb app_test]] بيتصل وينفّذ [[CREATE DATABASE app_test]]. بتاخد نفس خيارات الاتصال (-U و -h).

[[createuser --pwprompt]] بيسأل الباسورد بدل ما تكتبه في الأمر. و [[--interactive]] بيسأل عن الصلاحيات.

[[pg_isready]] بيرجع 0 لو السيرفر بيقبل اتصالات، ودي اللي بتتحط في healthcheck بتاع Docker وفي سكربتات الانتظار.

[[psql -l]] نفس [[\l]] بس من الترمنال.

فيه كمان [[pg_dump]] و [[pg_restore]] و [[vacuumdb]] و [[reindexdb]]، كلهم بنفس النمط.`,
            when: "CI: createdb قبل الاختبارات و dropdb بعدها. Docker healthcheck بـ pg_isready.",
            mistakes: "dropdb على القاعدة الغلط. مفيش سؤال تأكيد إلا بـ [[-i]]."
          },
          teach: R`## الفكرة: SQL متغلّف في أمر ترمنال

مع Postgres بييجي كام برنامج صغير، كل واحد بيعمل حاجة واحدة: يتصل بالسيرفر، ينفّذ أمر SQL واحد، ويخرج. فبدل ما تفتح psql وتكتب [[CREATE DATABASE app_test;]] تكتب [[createdb app_test]] من الترمنال. وكلهم بياخدوا نفس flags الاتصال بتاعة psql: [[-U]] اليوزر و [[-h]] السيرفر و [[-p]] البورت.

الناتج تحت من bash جوه container بتاع [[postgres:16]].

---

## ١. [[createdb]]: اعمل قاعدة

~~~bash
createdb -U postgres app_test
~~~

لما ينجح **مش بيطبع حاجة خالص**، ودي عادة أوامر لينكس: السكوت معناه نجاح. عايز تشوف هو بعت إيه للسيرفر؟ زوّد [[-e]] (echo):

~~~text createdb -U postgres -e app_test
SELECT pg_catalog.set_config('search_path', '', false);
CREATE DATABASE app_test;
~~~

السطر الأول إجراء أمان بيعمله لوحده، والتاني هو الأمر الحقيقي: [[CREATE DATABASE]] عادي.

---

## ٢. [[dropdb]]: امسحها

~~~bash
dropdb -U postgres app_test
~~~

برضه ساكت، وبينفّذ [[DROP DATABASE app_test;]]. **من غير** سؤال «متأكد؟» (السؤال بيظهر بس لو زوّدت [[-i]]، من interactive). القاعدة وكل جداولها بتروح ومفيش undo.

لو فيه حد متصل بيها، Postgres بيرفض. جرّبت وفيه جلسة شغالة عليها:

~~~text الناتج
dropdb: error: database removal failed: ERROR:  database "app_test" is being accessed by other users
DETAIL:  There is 1 other session using the database.
~~~

والرسالة دي مبتطلعش على طول: Postgres بيستنى حوالي ٥ ثواني يمكن الجلسة تقفل لوحدها (الأمر أخد [[5.036s]] بـ [[time]]). و [[dropdb --force app_test]] (من Postgres 13) بيقفل الجلسات دي ويمسح، وخرج بـ [[0]]. ولو القاعدة مش موجودة أصلًا:

~~~text الناتج
dropdb: error: database removal failed: ERROR:  database "app_test" does not exist
~~~

---

## ٣. [[createuser --pwprompt]]: يوزر بباسورد

~~~bash
createuser -U postgres --pwprompt app_user
~~~

[[--pwprompt]] (أو [[-P]]) معناها «اسألني على الباسورد». فبيظهر:

~~~text الناتج
Enter password for new role:
Enter it again:
~~~

والحروف مش بتظهر وانت بتكتب. الفايدة إن الباسورد مش مكتوب في الأمر نفسه، فمش هيتحفظ في الـ history بتاع الترمنال. والأمر بيتحوّل لـ SQL زي ده (من [[createuser -e]] على يوزر تجربة):

~~~text الناتج
CREATE ROLE demo_user NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN NOREPLICATION NOBYPASSRLS;
~~~

لاحظ الافتراضي: [[LOGIN]] يقدر يدخل، وكل الحاجات الخطيرة [[NO...]]: مش superuser ومش بيعمل قواعد ولا يوزرز. ده الصح ليوزر تطبيق.

---

## ٤. [[pg_isready]]: السيرفر صاحي؟

~~~bash
pg_isready -h localhost -p 5432
~~~

~~~text الناتج والـ exit code
localhost:5432 - accepting connections
exit=0
~~~

وعلى بورت مفيش عليه حاجة:

~~~text pg_isready -h localhost -p 5433
localhost:5433 - no response
exit=2
~~~

الـ exit code هو المهم هنا ([[0]] و [[2]] جربتهم، و [[1]] و [[3]] من الـ docs الرسمية):

| الرقم | معناه |
|---|---|
| [[0]] | بيقبل اتصالات |
| [[1]] | شغال بس رافض دلوقتي (غالبًا لسه بيقوم) |
| [[2]] | مفيش رد |
| [[3]] | الأمر نفسه غلط (flags غلط) |

عشان كده بيتحط في healthcheck بتاع Docker وفي سكربتات «استنى لحد ما القاعدة تقوم»، ومش محتاج يوزر ولا باسورد.

---

## ٥. [[psql -l]]: القواعد من الترمنال

نفس [[\l]] بالظبط من غير ما تدخل psql. وبعد [[createdb]] ظهر سطر:

~~~text psql -l | grep app_test
 app_test  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
~~~

وبعد [[dropdb]] نفس الأمر مطلعش حاجة (و grep خرج بـ [[1]] يعني ملقاش).

---

## الخلاصة

| الأمر | الـ SQL اللي بيعمله |
|---|---|
| [[createdb name]] | [[CREATE DATABASE name]] |
| [[dropdb name]] | [[DROP DATABASE name]] (من غير تأكيد) |
| [[createuser -P name]] | [[CREATE ROLE name LOGIN PASSWORD ...]] |
| [[dropuser name]] | [[DROP ROLE name]] |
| [[pg_isready]] | مفيش: بيشوف السيرفر بيرد ولا لأ |
| [[psql -l]] | زي [[\l]] |

> [[-e]] مع أي واحد فيهم بيوريك الـ SQL الحقيقي. وقبل [[dropdb]] اقرا الاسم مرتين.`,
          lines: [
            "اعمل قاعدة.",
            "امسحها (من غير سؤال).",
            "اعمل يوزر واسأل الباسورد.",
            "السيرفر بيقبل اتصالات؟ (بيرجع 0 لو أيوه).",
            "القواعد من الترمنال."
          ],
          sol: R`[[createdb]] و [[dropdb]] لما ينجحوا مش بيطبعوا حاجة خالص. في [[psql -l]] بعد الإنشاء هتلاقي سطر [[app_test | postgres | UTF8 | ...]]، وبعد [[dropdb]] السطر يختفي (اتأكد بـ [[psql -l | grep app_test]]: مش هيطلع حاجة).

لو dropdb قالك [[database "app_test" is being accessed by other users]] يبقى فيه جلسة مفتوحة عليها (غالبًا psql تاني عندك أو التطبيق): اقفلها، أو في PG 13+ استخدم [[dropdb --force app_test]]. ولو createdb قالك [[already exists]] فالاسم مستخدم.

واتعلمها كعادة: قبل [[dropdb]] اقرا الاسم مرتين. dropdb مالوش undo، وعلى سيرفر مشترك ممكن قاعدة بنفس الاسم تبقى بتاعة حد تاني.`
        }
      ]
    },
    {
      t: "الإدارة: يوزرز وأداء وصيانة",
      l: 2,
      n: "التطبيق ميشتغلش بـ postgres، والاستعلام البطيء ليه سبب تقدر تشوفه",
      items: [
        {
          cmd: "BEGIN و ROLLBACK",
          title: "UPDATE بإيدك على الإنتاج؟ جوه transaction",
          desc: "أي UPDATE أو DELETE بإيدك على قاعدة حقيقية: ابدأ بـ [[BEGIN]]، نفّذ، اقرا عدد الصفوف اللي psql طبعه واتأكد بـ SELECT، وبعدين [[COMMIT]] لو تمام أو [[ROLLBACK]] لو فيه حاجة غلط. ومتسيبش الـ transaction مفتوحة: بتمسك locks.",
          example: R`BEGIN;
UPDATE users SET plan = 'pro' WHERE id = 42;
SELECT id, plan FROM users WHERE id = 42;
ROLLBACK;
BEGIN;
DELETE FROM sessions WHERE expires_at < now() - interval '30 days';
COMMIT;`,
          try: "على قاعدة تجربة: BEGIN، و DELETE FROM users من غير WHERE، و SELECT count(*)، وبعدين ROLLBACK وشوف كل الصفوف رجعت.",
          deep: {
            why: "DELETE أو UPDATE من غير WHERE (أو بـ WHERE غلط) هو أشهر كارثة بإيد بني آدم. من غير transaction مفيش undo غير الباك أب.",
            how: R`psql افتراضيًا autocommit: كل أمر بيتحفظ لحظة ما يخلص. [[BEGIN]] بيفتح transaction، وكل اللي بعده مش نهائي ومحدش تاني شايفه.

psql بيطبع [[UPDATE 3]]، يعني ٣ صفوف: لو متوقع واحد وطلع ٣٠٠٠ اعمل [[ROLLBACK]]. [[COMMIT]] بيثبّت. أي error جوه الـ transaction بيخليها aborted ولازم ROLLBACK.

ولحماية إضافية حط [[\set ON_ERROR_ROLLBACK interactive]] في .psqlrc، أو [[\set AUTOCOMMIT off]] فكل أمر يستنى COMMIT.`,
            when: "أي تعديل بيانات بإيدك على الإنتاج. وقبل EXPLAIN ANALYZE على UPDATE أو DELETE.",
            mistakes: "تنسى الـ transaction مفتوحة وتروح، فتبقى idle in transaction ماسكة locks والموقع يعلّق. و COMMIT قبل ما تقرا عدد الصفوف."
          },
          teach: R`## الفكرة: «مسودة» قبل ما تحفظ

عادةً psql بيحفظ كل أمر لحظة ما يخلص (اسمها autocommit). [[BEGIN]] بيقلب الوضع: كل اللي بعده يبقى **مسودة** جلستك بس شايفاها، لحد ما تقرر: [[COMMIT]] تحفظ، أو [[ROLLBACK]] ترمي المسودة كأن مفيش حاجة حصلت. المجموعة دي اسمها **transaction**.

الناتج تحت من psql على [[postgres:16]] جوه Docker، قاعدة [[app]] فيها [[users]] و [[sessions]] (٣٠٠ صف).

---

## الجزء الأول: تعديل وبعدين تراجع

### [[BEGIN;]]

~~~text الناتج
BEGIN
~~~

الـ transaction اتفتحت. وفي psql التفاعلي الـ prompt بيتغيّر من [[app=#]] لـ [[app=*#]]: النجمة دي من [[%x]] في إعداد الـ prompt الافتراضي ([[%/%R%x%#]])، ومعناها «فيه transaction مفتوحة».

### [[UPDATE users SET plan = 'pro' WHERE id = 42;]]

| الحتة | معناها |
|---|---|
| [[UPDATE users]] | عدّل في جدول users |
| [[SET plan = 'pro']] | خلّي عمود plan قيمته pro |
| [[WHERE id = 42]] | في الصفوف اللي الـ id بتاعها 42 بس |

~~~text الناتج
UPDATE 1
~~~

**اقرا الرقم ده دايمًا.** [[1]] عدد الصفوف اللي اتعدّلت. لو متوقع ١ وطلع ٣٠٠٠، يبقى الـ WHERE غلط.

### [[SELECT id, plan FROM users WHERE id = 42;]]

~~~text الناتج
 id | plan
----+------
 42 | pro
~~~

جلستك شايفة التعديل. أي جلسة تانية لسه شايفة [[free]].

### [[ROLLBACK;]]

~~~text الناتج بعد ROLLBACK ونفس الـ SELECT
ROLLBACK
 id | plan
----+------
 42 | free
~~~

التعديل اتلغى كأنه محصلش.

---

## الجزء التاني: مسح حقيقي

قبل ما تمسح، عدّ اللي هيتمسح بنفس الـ WHERE:

~~~text SELECT count(*) FROM sessions WHERE expires_at < now() - interval '30 days';
 count
-------
   181
~~~

[[now() - interval '30 days']] يعني «الوقت دلوقتي ناقص ٣٠ يوم»، و [[expires_at <]] قبله: sessions خلصت من أكتر من شهر. و [[interval]] نوع في Postgres معناه مدة.

~~~text BEGIN; و DELETE FROM sessions WHERE expires_at < now() - interval '30 days';
BEGIN
DELETE 181
~~~

[[DELETE 181]] نفس رقم العد بالظبط، يبقى تمام:

~~~text COMMIT; و SELECT count(*) FROM sessions;
COMMIT
 count
-------
   119
~~~

٣٠٠ ناقص ١٨١ = ١١٩. [[COMMIT]] حفظ، ودلوقتي كل الجلسات شايفة المسح.

---

## الجزء التالت: الغلطات اللي هتقابلها

### ROLLBACK من غير BEGIN

~~~text الناتج
WARNING:  there is no transaction in progress
~~~

يعني الأمر اللي قبله اتحفظ خلاص (autocommit)، ومفيش حاجة ترجع.

### error جوه الـ transaction

~~~text BEGIN; و SELECT 1/0; و SELECT 1;
BEGIN
ERROR:  division by zero
ERROR:  current transaction is aborted, commands ignored until end of transaction block
~~~

بعد أي error الـ transaction بتبوظ ([[aborted]])، وأي أمر بعدها بيترفض، حتى [[SELECT 1]]. الحل الوحيد [[ROLLBACK]] وتبدأ تاني.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[SELECT count(*) ... WHERE ...]] | تعرف هتأثر على كام صف |
| [[BEGIN;]] | ابدأ مسودة |
| [[UPDATE]] / [[DELETE]] | واقرا الرقم اللي بيطبعه |
| [[SELECT]] | اتأكد بعينك |
| [[COMMIT;]] أو [[ROLLBACK;]] | احفظ أو ارمي |

> متسيبش [[app=*#]] مفتوحة وتقوم: الـ transaction المفتوحة ماسكة locks على الصفوف اللي عدّلتها، وأي حد تاني عايز يعدّلهم هيستنى (درس «الجلسات والأقفال»).`,
          lines: [
            "ابدأ transaction: مفيش حاجة نهائية من هنا.",
            "التعديل (psql بيطبع عدد الصفوف: اقراه).",
            "اتأكد بعينك.",
            "مش عاجبك؟ رجّع كل حاجة.",
            "transaction جديدة.",
            "امسح الـ sessions الأقدم من ٣٠ يوم.",
            "العدد مظبوط؟ ثبّت."
          ],
          sol: R`الترتيب اللي هتشوفه: [[BEGIN]]، وبعدين [[DELETE 5]] (عدد صفوف الجدول)، و [[SELECT count(*)]] جوه نفس الـ transaction بيرجّع [[0]]، وبعد [[ROLLBACK]] نفس الـ SELECT بيرجّع [[5]] تاني. الـ prompt نفسه بيتغير لـ [[app=*#]] طول ما فيه transaction مفتوحة.

الفكرة إن الـ DELETE اتعمل فعلًا بس محدش شافه غير جلستك لحد ما تعمل COMMIT. أي جلسة تانية كانت هتشوف ٥ صفوف طول الوقت.

الأخطاء الشائعة: تنسى BEGIN فالـ DELETE يتنفذ ويتحفظ فورًا (psql بيعمل autocommit)، وبعدها ROLLBACK بيطلّع [[WARNING:  there is no transaction in progress]]. أو تعمل error جوه الـ transaction فكل اللي بعده يترفض بـ [[current transaction is aborted]] لحد ما تعمل ROLLBACK. ولو في جدول تاني بيشاور على users بـ foreign key، الـ DELETE نفسه ممكن يترفض بـ [[violates foreign key constraint]].`
        },
        {
          cmd: "يوزرز وصلاحيات",
          title: "يوزر للتطبيق بأقل صلاحيات",
          desc: R`اليوزر [[postgres]] superuser: يقدر يمسح أي قاعدة ويقرا أي حاجة. لو تطبيقك متصل بيه والكود اتخترق (SQL injection مثلًا)، المهاجم ماسك كل حاجة. الحل يوزر خاص بالتطبيق، يقرا ويكتب في جداوله وبس. في Postgres اليوزر اسمه role، و [[CREATE ROLE ... LOGIN PASSWORD]] بيعمله ويسمحله يدخل بباسورد.

الصلاحيات طبقات لازم كلها: [[GRANT CONNECT ON DATABASE]] يدخل القاعدة، و [[USAGE ON SCHEMA public]] يشوف اللي جوه الـ schema، و [[SELECT, INSERT, UPDATE, DELETE ON ALL TABLES]] يقرا ويضيف ويعدّل ويمسح صفوف (من غير ما يقدر يمسح الجدول نفسه). و [[SEQUENCES]] لازمة عشان الـ id اللي بيزيد لوحده يشتغل مع INSERT.

[[GRANT ... ON ALL TABLES]] بيطبّق على الجداول الموجودة دلوقتي بس، فـ [[ALTER DEFAULT PRIVILEGES]] بيدّي نفس الصلاحيات لأي جدول جديد هيتعمل بعدين. و [[readonly]] في الآخر يوزر للتقارير، [[SELECT]] بس. حط باسورد طويل عشوائي حقيقي مكان المثال.`,
          example: R`CREATE ROLE app_user LOGIN PASSWORD 'strong-random-password';
GRANT CONNECT ON DATABASE app TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
CREATE ROLE readonly LOGIN PASSWORD 'x';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;`,
          try: "اعمل app_user واتصل بيه وجرّب [[DROP TABLE]]: المفروض يترفض.",
          flag: "script",
          deep: {
            why: "التطبيق متصل بـ postgres (superuser) معناه أي SQL injection أو bug يقدر يمسح كل القواعد. يوزر بأقل صلاحيات بيحدد الضرر.",
            how: R`في Postgres اليوزر اسمه role. [[CREATE ROLE ... LOGIN PASSWORD]] بيعمله ويسمحله يدخل.

الصلاحيات طبقات: [[CONNECT]] على القاعدة، وبعدين [[USAGE]] على الـ schema (public غالبًا) عشان يشوف اللي فيه، وبعدين على الجداول نفسها [[SELECT, INSERT, UPDATE, DELETE]]. و [[SEQUENCES]] لازمة عشان الأعمدة SERIAL و identity تشتغل في INSERT.

الفخ الأشهر: [[GRANT ... ON ALL TABLES]] بيطبّق على الجداول الموجودة دلوقتي بس. أول migration تعمل جدول جديد، app_user مش هيشوفه. [[ALTER DEFAULT PRIVILEGES]] بيحل ده: أي جدول جديد ياخد الصلاحيات دي لوحده. بس بيطبّق على الجداول اللي بيعملها اليوزر اللي نفّذ الأمر، فنفّذه بنفس اليوزر اللي بيشغّل الـ migrations.

يوزر readonly لأدوات التقارير و Metabase: SELECT بس.

وفي Supabase الصلاحيات دي معمولة جاهزة، والـ Row Level Security طبقة فوقها.`,
            when: "أول حاجة بعد ما تعمل القاعدة، قبل أول migration.",
            mistakes: "GRANT من غير DEFAULT PRIVILEGES، وبعد أول migration التطبيق يطلع permission denied على الجدول الجديد. والـ migrations بيوزر مختلف عن اللي عمل ALTER DEFAULT."
          },
          teach: R`## الفكرة: مفاتيح على قد الشغل

اليوزر [[postgres]] معاه كل المفاتيح. التطبيق محتاج يقرا ويكتب صفوف وبس، فبنعمله يوزر (في Postgres اسمه **role**) وندّيله المفاتيح دي بالظبط. والصلاحيات في Postgres طبقات زي باب العمارة وباب الشقة وباب الأوضة: لازم كلهم يتفتحوا.

كل الأوامر تحت اتنفّذت كـ [[postgres]] على [[postgres:16]] جوه Docker، قاعدة [[app]]، والتجربة بعدها باليوزرز الجداد.

---

## ١. اعمل اليوزر

~~~text SQL
CREATE ROLE app_user LOGIN PASSWORD 'strong-random-password';
~~~

| الحتة | معناها |
|---|---|
| [[CREATE ROLE app_user]] | اعمل role اسمه app_user |
| [[LOGIN]] | يقدر يتصل (role من غير LOGIN بيبقى «مجموعة» صلاحيات بس) |
| [[PASSWORD '...']] | الباسورد، و Postgres بيخزنه متشفّر |

~~~text الناتج
CREATE ROLE
~~~

---

## ٢. الطبقات الأربعة

~~~text SQL
GRANT CONNECT ON DATABASE app TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
~~~

[[GRANT ... ON ... TO ...]] يعني «ادّي الصلاحية دي، على الحاجة دي، لليوزر ده». وكل سطر طبّع [[GRANT]].

| السطر | الطبقة | من غيرها |
|---|---|---|
| [[CONNECT ON DATABASE app]] | باب القاعدة | ميقدرش يتصل بيها |
| [[USAGE ON SCHEMA public]] | باب الـ schema | ميشوفش الجداول اللي جواها |
| [[SELECT, INSERT, UPDATE, DELETE ON ALL TABLES]] | الجداول | يقرا ويضيف ويعدّل ويمسح **صفوف** |
| [[USAGE, SELECT ON ALL SEQUENCES]] | العدّادات | الـ id اللي بيزيد لوحده ([[serial]]) يفشل في INSERT |

لاحظ: مفيش [[DROP]] ولا [[ALTER]] ولا [[TRUNCATE]]. مسح الجدول نفسه أو تغيير شكله بيحتاج تبقى **صاحب** الجدول (owner).

> على تسطيب جديد، [[CONNECT]] و [[USAGE ON SCHEMA public]] مدّيين لكل الناس (PUBLIC) أصلًا، بس كتابتهم بتخلّي السكربت يشتغل حتى لو حد قفلهم.

ونشوف النتيجة بـ [[\dp users]] (p من privileges):

~~~text الناتج (من غير آخر عمودين Column privileges و Policies)
 Schema | Name  | Type  |     Access privileges
--------+-------+-------+---------------------------
 public | users | table | postgres=arwdDxt/postgres+
        |       |       | app_user=arwd/postgres   +
        |       |       | readonly=r/postgres
~~~

كل سطر [[مين=حروف/مين_ادّاها]]. والحروف: [[a]] INSERT (append)، [[r]] SELECT (read)، [[w]] UPDATE (write)، [[d]] DELETE، [[D]] TRUNCATE، [[x]] REFERENCES، [[t]] TRIGGER. فـ app_user عنده [[arwd]] بالظبط، و readonly [[r]] بس.

---

## ٣. الجداول اللي لسه هتتعمل

~~~text SQL
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
~~~

[[ON ALL TABLES]] فوق اتطبّق على الجداول **الموجودة لحظتها** بس. الأمرين دول بيقولوا: «أي جدول أو sequence **هعمله أنا** بعد كده في public، ادّي app_user الصلاحيات دي عليه لوحده». وتشوفهم بـ [[\ddp]] (default privileges):

~~~text الناتج
  Owner   | Schema |   Type   |   Access privileges
----------+--------+----------+------------------------
 postgres | public | sequence | app_user=rU/postgres
 postgres | public | table    | app_user=arwd/postgres
~~~

عمود [[Owner]] مهم: القاعدة دي بتشتغل على الجداول اللي **postgres** يعملها. لو الـ migrations بتشتغل بيوزر تاني، نفّذ الأمر بيه هو. و [[U]] في الـ sequence معناها USAGE.

---

## ٤. يوزر قراية بس

~~~text SQL
CREATE ROLE readonly LOGIN PASSWORD 'x';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
~~~

لأدوات التقارير و Metabase. (وحط باسورد حقيقي طبعًا.)

---

## ٥. نجرّب: الجدول ده اتعمل بعد كل الـ GRANTs

~~~text SQL (كـ postgres)
CREATE TABLE coupons2 (id serial PRIMARY KEY, code text);
~~~

### كـ app_user ([[psql -h localhost -U app_user -d app]])

~~~text الناتج
 current_user
--------------
 app_user

 count
-------
     5
~~~

[[SELECT current_user]] بيقولك انت مين، و [[SELECT count(*) FROM users]] اشتغل. وبعدين:

~~~text DROP TABLE users; و CREATE TABLE x (id int);
ERROR:  must be owner of table users
ERROR:  permission denied for schema public
~~~

ده المطلوب: ميقدرش يمسح جداول، ولا يعمل جداول (من Postgres 15 مفيش حد غير صاحب الـ schema يقدر يعمل جداول في public). والجدول الجديد؟

~~~text INSERT INTO coupons2 (code) VALUES ('NEW'); و SELECT * FROM coupons2;
INSERT 0 1
 id | code
----+------
  1 | NEW
~~~

اشتغل، والـ id اتولّد من الـ sequence، بفضل [[ALTER DEFAULT PRIVILEGES]] على الجداول والـ sequences.

### كـ readonly

~~~text الناتج
 count
-------
     5
ERROR:  permission denied for table users
ERROR:  permission denied for table coupons2
~~~

الـ SELECT على users نجح، والـ UPDATE اترفض (ده المطلوب). بس [[SELECT * FROM coupons2]] اترفض كمان! لأن readonly خد [[GRANT ... ON ALL TABLES]] بس من غير [[ALTER DEFAULT PRIVILEGES]]، فأي جدول جديد مقفول قدامه. ده بالظبط الفخ اللي التطبيق كان هيقع فيه بعد أول migration.

---

## الخلاصة

| الطبقة | الأمر |
|---|---|
| يدخل | [[CREATE ROLE x LOGIN PASSWORD '...']] |
| القاعدة | [[GRANT CONNECT ON DATABASE]] |
| الـ schema | [[GRANT USAGE ON SCHEMA public]] |
| الجداول الموجودة | [[GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES]] |
| العدّادات | [[GRANT USAGE, SELECT ON ALL SEQUENCES]] |
| الجداول الجاية | [[ALTER DEFAULT PRIVILEGES ... GRANT ...]] (بنفس يوزر الـ migrations) |
| تتأكد | [[\dp جدول]] و [[\ddp]] |`,
          lines: [
            "يوزر جديد يقدر يدخل بباسورد.",
            "يقدر يتصل بالقاعدة.",
            "يقدر يشوف اللي في schema public.",
            "يقرا ويكتب في الجداول الموجودة دلوقتي.",
            "يستخدم الـ sequences (لازمة لأعمدة id التلقائية).",
            "وأي جدول جديد ياخد نفس الصلاحيات لوحده.",
            "ونفس الكلام للـ sequences الجديدة، وإلا INSERT في جدول جديد يفشل بـ permission denied for sequence.",
            "يوزر تاني للتقارير.",
            "قراية بس."
          ],
          sol: R`لما تتصل كـ app_user وتعمل [[DROP TABLE users;]] الرد: [[ERROR:  must be owner of table users]]. و [[SELECT count(*) FROM users]] بيشتغل عادي. ولو جرّبت [[CREATE TABLE x (id int);]] هتاخد [[ERROR:  permission denied for schema public]]، لأن من PG 15 اليوزر العادي مالوش CREATE على public.

دا بالظبط المطلوب: التطبيق يقرا ويكتب بس، ولو حد عمل SQL injection مش هيقدر يمسح جداول. الـ migrations تشتغل بيوزر تاني صاحب الجداول.

لو الـ DROP اشتغل يبقى انت متصل بالـ owner أو superuser: اعمل [[SELECT current_user;]]. ولو الـ SELECT نفسه اترفض بـ [[permission denied for table users]] يبقى الجداول اتعملت بعد الـ GRANT، ودا اللي [[ALTER DEFAULT PRIVILEGES]] بيحله للجداول الجاية (بشرط تتعمل بنفس اليوزر اللي نفّذ الأمر).`,
          solCode: R`-- كـ postgres
CREATE ROLE app_user LOGIN PASSWORD 'secret';
GRANT CONNECT ON DATABASE lab TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- من الترمنال
psql -h localhost -U app_user -d lab -c "DROP TABLE users"
-- ERROR:  must be owner of table users
psql -h localhost -U app_user -d lab -c "SELECT count(*) FROM users"`
        },
        {
          cmd: "connection string و .pgpass",
          title: "متكتبش الباسورد كل مرة",
          desc: "الـ URL فيه كل حاجة: يوزر وباسورد وسيرفر وبورت وقاعدة وخيارات. متغيرات [[PGHOST]] و [[PGUSER]] بتخلي psql يعرفهم لوحده. و [[~/.pgpass]] ملف فيه الباسوردات بصلاحية 600، فمفيش باسورد في الأوامر ولا الـ history.",
          example: R`export PGHOST=localhost PGUSER=app_user PGDATABASE=app
psql
echo "localhost:5432:app:app_user:secret" >> ~/.pgpass && chmod 600 ~/.pgpass
psql "postgres://app_user@localhost/app?sslmode=require"
psql "$DATABASE_URL" -c "SELECT current_user, current_database();"`,
          try: "اعمل .pgpass واتصل من غير ما يسألك باسورد.",
          deep: {
            why: "باسورد القاعدة في كل أمر بيتحفظ في الـ history ويبان في [[ps]]. ومحتاج طريقة واحدة الأدوات كلها تفهمها.",
            how: R`كل أدوات Postgres (psql، pg_dump، createdb) بتقرا متغيرات البيئة [[PGHOST]] و [[PGPORT]] و [[PGUSER]] و [[PGDATABASE]] و [[PGPASSWORD]]. لو حددتهم، [[psql]] لوحدها بتتصل. بس [[PGPASSWORD]] في البيئة بيبان لأي عملية، فالأحسن .pgpass.

[[~/.pgpass]] سطر لكل اتصال: [[host:port:database:user:password]]، و [[*]] في أي خانة يعني أي قيمة. لازم صلاحية [[600]] وإلا Postgres بيتجاهله. أي أداة بتلاقي سطر مطابق بتاخد الباسورد منه.

الـ connection string: [[postgres://]] أو [[postgresql://]]، وبعده user:password@host:port/dbname، وبعد [[?]] خيارات زي [[sslmode=require]] و [[connect_timeout=5]] و [[application_name=api]]. لو الباسورد فيه رموز خاصة ([[@]] أو [[#]]) لازم URL encoding.

[[application_name]] مفيد: بيظهر في pg_stat_activity فتعرف الاتصال ده من التطبيق ولا من سكربت.`,
            when: ".pgpass على جهازك وعلى السيرفر لسكربتات الباك أب. PG* في CI.",
            mistakes: ".pgpass بصلاحية 644 فبيتجاهل (مع WARNING سهل تفوّته). وباسورد فيه @ في الـ URL من غير encoding."
          },
          teach: R`## الفكرة: ٣ أماكن psql بيدوّر فيها على بيانات الاتصال

لو مكتبتش [[-h]] و [[-U]] و [[-d]] والباسورد في الأمر، psql (وكل أدوات Postgres) بيدوّر عليهم في: **متغيرات البيئة** [[PG...]]، وملف [[~/.pgpass]] للباسورد، أو **connection string** واحد فيه كله. الدرس بيوريك التلاتة.

الناتج تحت من bash جوه container بتاع [[postgres:16]]. اتصلت بعنوان الـ container على الشبكة ([[172.17.0.2]]، عنوان داخلي بتاع Docker) بدل localhost، لأن localhost جوه الصورة دي [[trust]] ومش بيطلب باسورد أصلًا، وأنا عايز أختبر الباسورد بجد. اليوزر [[app_user]] من الدرس اللي فات.

---

## ١. متغيرات البيئة

~~~bash
export PGHOST=localhost PGUSER=app_user PGDATABASE=app
psql
~~~

[[export]] بيعمل متغير بيئة يشوفه أي برنامج يتشغّل من الترمنال ده بعد كده. ونقدر نعرّف كذا واحد في سطر.

| المتغير | بدل |
|---|---|
| [[PGHOST]] | [[-h]] |
| [[PGPORT]] | [[-p]] |
| [[PGUSER]] | [[-U]] |
| [[PGDATABASE]] | [[-d]] |
| [[PGPASSWORD]] | الباسورد (مش مستحب: أي برنامج تاني ممكن يقراه) |

بعدها [[psql]] لوحدها بتعرف تتصل فين وبمين. بس لسه محتاجة باسورد:

~~~text الناتج من غير باسورد
Password for user app_user:
psql: error: connection to server at "172.17.0.2", port 5432 failed: fe_sendauth: no password supplied
~~~

سأل، وملقاش حد يرد (التجربة كانت من سكربت)، ففشل. [[fe_sendauth]] يعني الـ frontend (psql) مبعتش باسورد.

---

## ٢. [[~/.pgpass]]: الباسورد في ملف

~~~bash
echo "localhost:5432:app:app_user:secret" >> ~/.pgpass && chmod 600 ~/.pgpass
~~~

### الحتة الأولى: السطر نفسه

~~~text شكل السطر
host:port:database:user:password
localhost:5432:app:app_user:secret
~~~

٥ خانات بينها [[:]]. psql بيقارن الاتصال بكل سطر بالترتيب، وأول سطر يطابق ياخد الباسورد منه. و [[*]] في أي خانة يعني «أي قيمة». والـ host لازم يطابق اللي انت كاتبه بالحرف: [[localhost]] غير [[127.0.0.1]].

### الحتة التانية: [[>>]]

[[echo "..." >>]] بيضيف السطر **في آخر** الملف (ولو مش موجود بيعمله). [[>]] واحدة كانت هتمسح الملف وتكتب من الأول، فتضيّع الباسوردات القديمة.

### الحتة التالتة: [[&& chmod 600]]

[[&&]] شغّل اللي بعدي لو اللي قبلي نجح. و [[chmod 600]] بيخلي الملف تقراه وتكتبه انت بس. ليه؟ جربت الأول بـ [[644]] (الكل يقرا):

~~~text الناتج بـ 644
WARNING: password file "/tmp/alihome/.pgpass" has group or world access; permissions should be u=rw (0600) or less
Password for user app_user:
psql: error: ... fe_sendauth: no password supplied
~~~

psql **رفض يستخدم الملف**، لأن ملف باسوردات يقدر أي حد يقراه غلط أمني. وبعد [[chmod 600]]:

~~~text ls -l ~/.pgpass و psql -c "SELECT current_user, current_database();"
-rw------- 1 root root 36 Oct  6 16:31 /tmp/alihome/.pgpass
 current_user | current_database
--------------+------------------
 app_user     | app
~~~

[[-rw-------]]: [[rw]] للصاحب بس، والباقي [[---]]. ودخل من غير ما يسأل.

> على ويندوز الملف اسمه [[%APPDATA%\postgresql\pgpass.conf]] (من الـ docs الرسمية)، ومفيش chmod.

---

## ٣. [[sslmode=require]]

~~~bash
psql "postgres://app_user@localhost/app?sslmode=require"
~~~

الـ URL هنا من غير باسورد (هياخده من .pgpass). وبعد [[?]] بتيجي **خيارات** بالشكل [[اسم=قيمة]]، وبينهم [[&]] لو أكتر من واحد. [[sslmode=require]] يعني «شفّر الاتصال، ولو السيرفر مش بيدعم التشفير متتصلش». الـ container بتاعنا مفيهوش SSL:

~~~text الناتج
psql: error: connection to server at "172.17.0.2", port 5432 failed: server does not support SSL, but SSL was required
~~~

ده الصح: رفض بدل ما يبعت الباسورد مكشوف. السيرفرات المستضافة (Supabase و Neon و RDS) بتدعم SSL، وعلى النت لازم تستخدمه.

---

## ٤. جرّب [[DATABASE_URL]] بتاع مشروعك

~~~bash
psql "$DATABASE_URL" -c "SELECT current_user, current_database();"
~~~

[[$DATABASE_URL]] بيتبدّل بقيمة المتغير، و [[" "]] حواليه عشان لو فيه [[&]] أو [[?]] الـ shell ميفهمهمش غلط. جربته بـ URL فيه [[application_name=api]]:

~~~text الناتج
 current_user | current_database
--------------+------------------
 app_user     | app

 application_name
------------------
 api
~~~

السطر التاني من [[pg_stat_activity]] لجلستي: الاسم ده بيظهر هناك، فتعرف أنهي اتصال من التطبيق وأنهي من سكربت.

### باسورد فيه رموز

~~~text الباسورد p@ss مكتوب زي ما هو في الـ URL
psql: error: could not translate host name "ss@172.17.0.2" to address: Name or service not known
~~~

[[@]] هي اللي بتفصل الباسورد عن السيرفر، فأول [[@]] اتفهمت فاصل، والباقي [[ss@172.17.0.2]] بقى «اسم السيرفر». الحل URL encoding: [[@]] تتكتب [[%40]]، و [[#]] تتكتب [[%23]]، و [[:]] تتكتب [[%3A]].

---

## الخلاصة

| المكان | امتى |
|---|---|
| [[PGHOST]] و [[PGUSER]] و [[PGDATABASE]] | سكربت أو CI بيتصل بنفس القاعدة كتير |
| [[~/.pgpass]] بـ [[chmod 600]] | الباسورد على جهازك أو سكربت باك أب على السيرفر |
| [[postgres://user:pass@host:port/db?opt=val]] | سطر واحد فيه كله، زي [[DATABASE_URL]] |
| [[?sslmode=require]] | أي اتصال بيعدّي على النت |`,
          lines: [
            "حدد الاتصال في البيئة.",
            "دلوقتي psql لوحدها بتتصل.",
            "الباسورد في ملف بصلاحية 600، مفيش باسورد في الأوامر تاني.",
            "اتصال بـ SSL إجباري.",
            "جرّب الـ URL اللي في .env: مين انت وعلى أنهي قاعدة."
          ],
          sol: R`بعد ما تعمل الملف و [[chmod 600]]، [[psql -h localhost -U app_user -d app]] بيدخل على طول من غير [[Password for user app_user:]]. و [[SELECT current_user, current_database();]] بيرجّع [[app_user | app]].

لو نسيت الـ chmod، psql بيطبع [[WARNING: password file "/home/you/.pgpass" has group or world access; permissions should be u=rw (0600) or less]] ويتجاهل الملف، فيسألك عن الباسورد تاني. ولو لسه بيسألك: السطر لازم يطابق بالظبط الـ host (لو كتبت [[localhost]] في الملف واتصلت بـ [[127.0.0.1]] مش هيطابق)، والبورت والقاعدة واليوزر. وتقدر تحط [[*]] في أي خانة.

وخلي بالك: من غير [[-h]] psql بيتصل بالسوكت، ولو الـ auth هناك peer مش هيبص على الباسورد أصلًا.`,
          solCode: R`echo "localhost:5432:app:app_user:secret" >> ~/.pgpass
chmod 600 ~/.pgpass
psql -h localhost -U app_user -d app -c "SELECT current_user, current_database();"`
        },
        {
          cmd: "الوصول من بره",
          title: "listen_addresses و pg_hba",
          desc: "افتراضيًا Postgres بيسمع على localhost بس، وملف [[pg_hba.conf]] بيحدد مين يتصل منين وبأي طريقة. للوصول من جهازك للسيرفر الأصح SSH tunnel، مش فتح البورت.",
          example: R`sudo -u postgres psql -c "SHOW listen_addresses;"
sudo -u postgres psql -c "SHOW hba_file;"
sudo tail -5 /etc/postgresql/16/main/pg_hba.conf
ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
psql -h localhost -p 5433 -U app_user app`,
          try: "افتح tunnel للسيرفر واتصل بـ DBeaver على localhost:5433 من غير ما تفتح 5432 في الفايروول.",
          deep: {
            why: "عايز تفتح قاعدة السيرفر من DBeaver على جهازك. الغريزة تفتح 5432 في الفايروول، ودي أخطر غلطة ممكن تعملها.",
            how: R`طبقتين بيتحكموا في الوصول. [[listen_addresses]] في postgresql.conf: على إيه Postgres بيسمع، والافتراضي localhost بس. و [[pg_hba.conf]] (host-based authentication): جدول قواعد، كل سطر بيقول: نوع الاتصال (local أو host)، وأنهي قاعدة، وأنهي يوزر، ومن أنهي عنوان، وبأي طريقة (scram-sha-256، peer، reject). أول سطر يطابق هو اللي بيتطبق.

الطريقة الآمنة للوصول من جهازك: SSH tunnel. Postgres يفضل على localhost، وانت بتوصله من خلال SSH كأنك على السيرفر. DBeaver بيدعم SSH tunnel مباشرة في إعدادات الاتصال، فمش محتاج حتى الأمر.

لو لازم اتصال مباشر (سيرفر تطبيق تاني): [[listen_addresses = '*']]، وسطر في pg_hba للـ IP بتاعه بس بـ scram-sha-256، والفايروول يسمح للـ IP ده بس، و SSL إجباري ([[hostssl]] بدل host).

بعد تعديل pg_hba: [[SELECT pg_reload_conf()]]. بعد listen_addresses: ريستارت.`,
            when: "tunnel لأي وصول شخصي. فتح البورت بس لسيرفرات تانية بـ IP محدد.",
            mistakes: "[[host all all 0.0.0.0/0 md5]] في pg_hba مع listen '*': القاعدة مفتوحة للنت كله. البوتات هتلاقيها في ساعات."
          },
          teach: R`## الفكرة: بابين قدام أي اتصال

عشان حد يوصل لـ Postgres لازم يعدّي بابين: الأول [[listen_addresses]]: السيرفر **بيسمع** على أنهي كارت شبكة أصلًا. والتاني [[pg_hba.conf]]: لو وصلت، مسموحلك تدخل؟ وبأي طريقة تثبت إنك انت؟ والدرس بيوريك تقرا الاتنين، وبعدين الطريقة الآمنة توصل من جهازك من غير ما تفتح أي باب: SSH tunnel.

أول ٣ سطور اتشغّلت على أوبونتو 24.04 جوه Docker بعد [[apt install postgresql]] (نزّل Postgres 16 بإعدادات أوبونتو). سطور الـ SSH محتاجة سيرفر حقيقي بعيد فمتشغّلتش هنا، وشكلها من الـ docs الرسمية لـ OpenSSH.

---

## ١. Postgres بيسمع على إيه؟

~~~bash
sudo -u postgres psql -c "SHOW listen_addresses;"
~~~

### [[sudo -u postgres]]

[[sudo]] شغّل أمر بصلاحيات يوزر تاني، و [[-u postgres]] اليوزر ده هو يوزر لينكس اسمه [[postgres]] (التسطيب بيعمله). ليه؟ على أوبونتو الدخول المحلي بيستخدم طريقة اسمها **peer**: السيرفر بيسأل نظام التشغيل «مين يوزر لينكس اللي فاتح الاتصال؟» ولازم يطابق يوزر Postgres. جرّبت من غير sudo (كـ root، وبعدين كـ يوزر عادي):

~~~text الناتج
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  Peer authentication failed for user "postgres"
~~~

### [[SHOW listen_addresses]]

~~~text الناتج
 listen_addresses
------------------
 localhost
~~~

[[localhost]] يعني السيرفر مش سامع غير الطلبات اللي جاية من نفس الجهاز. أي حد على النت يخبط على 5432 مش هيلاقي رد. ده الافتراضي وده الآمن.

---

## ٢. فين ملف القواعد؟

~~~bash
sudo -u postgres psql -c "SHOW hba_file;"
~~~

~~~text الناتج
              hba_file
-------------------------------------
 /etc/postgresql/16/main/pg_hba.conf
~~~

[[hba]] من host-based authentication. والمسار فيه [[16]] (النسخة) و [[main]] (اسم الـ cluster). في Docker المكان مختلف ([[/var/lib/postgresql/data/pg_hba.conf]])، عشان كده السؤال أحسن من التخمين.

---

## ٣. نقرا القواعد

~~~bash
sudo tail -5 /etc/postgresql/16/main/pg_hba.conf
~~~

[[tail -5]] آخر ٥ سطور، و [[sudo]] لأن الملف مش متاح لأي حد. القواعد المهمة في الملف ده (من غير التعليقات):

~~~text pg_hba.conf على أوبونتو 24.04
local   all   postgres                  peer
local   all   all                       peer
host    all   all       127.0.0.1/32    scram-sha-256
host    all   all       ::1/128         scram-sha-256
~~~

كل سطر ٥ خانات:

| الخانة | المثال | معناها |
|---|---|---|
| النوع | [[local]] / [[host]] | socket على نفس الجهاز / اتصال شبكة (TCP) |
| القاعدة | [[all]] | أي قاعدة |
| اليوزر | [[postgres]] / [[all]] | أنهي يوزر |
| العنوان | [[127.0.0.1/32]] | جاي منين ([[/32]] يعني العنوان ده بالظبط، و [[::1]] نفس الحاجة في IPv6). مش موجود في [[local]] |
| الطريقة | [[peer]] / [[scram-sha-256]] | إزاي يثبت نفسه: اسم يوزر لينكس / باسورد متشفّر |

Postgres بيمشي من فوق لتحت، و**أول سطر يطابق** هو اللي بيتطبّق. فـ [[psql -h localhost]] بيقع على سطر [[host ... 127.0.0.1/32]] فيطلب باسورد، ومن غير [[-h]] بيقع على [[local]] فيبقى peer. وأي اتصال مش مطابق لأي سطر بيترفض.

بعد ما تعدّل الملف: [[SELECT pg_reload_conf();]] (رجّع [[t]] يعني اتقري تاني). أما [[listen_addresses]] فالـ context بتاعها [[postmaster]] في [[pg_settings]]، يعني محتاجة restart كامل.

---

## ٤. الطريقة الآمنة: SSH tunnel

~~~bash
ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
~~~

| الحتة | معناها |
|---|---|
| [[ssh deploy@203.0.113.10]] | ادخل السيرفر بيوزر deploy (العنوان مثال من الأرقام المحجوزة للتوثيق) |
| [[-L]] | Local forward: افتح بورت على جهازي ووصّله بحاجة على السيرفر |
| [[5433]] | البورت على جهازك |
| [[127.0.0.1:5432]] | رايح فين **من وجهة نظر السيرفر**: Postgres على نفس السيرفر |
| [[-N]] | متفتحش shell، اعمل الـ tunnel بس |

اللي بيحصل: أي حاجة تتصل بـ [[localhost:5433]] على جهازك، ssh بياخدها متشفّرة جوه اتصال الـ SSH، ويسلّمها على السيرفر لـ [[127.0.0.1:5432]]. فـ Postgres شايف الاتصال جاي من localhost، وفضل [[listen_addresses = localhost]] وبورت 5432 مقفول في الفايروول. الأمر بيفضل واقف من غير ما يطبع حاجة، والـ tunnel شغال طول ما هو شغال.

### اتصل من ترمنال تاني

~~~bash
psql -h localhost -p 5433 -U app_user app
~~~

[[-p 5433]] البورت المحلي بتاع الـ tunnel. ولاحظ إن [[app]] في الآخر من غير [[-d]]: psql بيفهم أول كلمة من غير flag إنها اسم القاعدة. واخترنا 5433 مش 5432 عشان لو عندك Postgres على جهازك ميتخانقوش على نفس البورت.

---

## الخلاصة

| السؤال | الأمر | الآمن |
|---|---|---|
| بيسمع على إيه؟ | [[SHOW listen_addresses;]] | [[localhost]] |
| القواعد فين؟ | [[SHOW hba_file;]] | |
| مين يدخل وإزاي؟ | اقرا pg_hba.conf من فوق لتحت | [[scram-sha-256]] أو [[peer]]، ومفيش [[0.0.0.0/0]] |
| طبّق تعديل pg_hba | [[SELECT pg_reload_conf();]] | |
| أوصل من جهازي | [[ssh -N -L 5433:127.0.0.1:5432 user@server]] | من غير فتح 5432 |`,
          lines: [
            "Postgres بيسمع على إيه (localhost افتراضيًا).",
            "فين ملف pg_hba.",
            "آخر قواعد الوصول: مين يدخل منين وبإيه.",
            "الطريقة الآمنة: tunnel، 5433 عندك يوصل لـ 5432 على السيرفر.",
            "اتصل عبر الـ tunnel."
          ],
          sol: R`الأمر [[ssh -N -L 5433:127.0.0.1:5432 deploy@SERVER]] مش بيطبع حاجة وبيفضل واقف. دا الطبيعي: الـ tunnel شغال طول ما الأمر شغال. في DBeaver تحط Host [[localhost]] و Port [[5433]] واليوزر والباسورد بتوع Postgres، و Test Connection يقول Connected. ومن ترمنال تاني [[psql -h localhost -p 5433 -U app_user app]] يدخل.

وتتأكد إن البورت مش مفتوح للعالم: من جهازك [[nc -zv SERVER 5432]] المفروض يفشل (timeout أو refused)، و [[SHOW listen_addresses;]] على السيرفر يفضل [[localhost]].

المشاكل الشائعة: [[bind [127.0.0.1]:5433: Address already in use]] يعني عندك Postgres محلي أو tunnel قديم على البورت، غيّر الرقم. و DBeaver يقولك [[Connection refused]] لما الـ tunnel يكون وقع (قفلت الترمنال). والغلط الأخطر إنك تحل المشكلة بـ [[listen_addresses = '*']] وفتح 5432 في الفايروول.`
        },
        {
          cmd: "الجلسات والأقفال",
          title: "مين متصل ومين معلّق مين",
          desc: "[[pg_stat_activity]] جدول فيه كل اتصال: بيعمل إيه، ومن إمتى، ومستني إيه. استعلام معلّق أو migration واقفة غالبًا بسبب lock. و [[pg_terminate_backend]] بيقفل اتصال.",
          example: R`SELECT pid, usename, state, now() - query_start AS age, left(query, 60) FROM pg_stat_activity WHERE state <> 'idle' ORDER BY age DESC;
SELECT count(*) FROM pg_stat_activity;
SELECT pid, wait_event_type, wait_event, left(query, 60) FROM pg_stat_activity WHERE wait_event IS NOT NULL;
SELECT pg_terminate_backend(12345);
SHOW max_connections;`,
          try: "افتح transaction في جلسة (BEGIN; UPDATE users ...) من غير COMMIT، وفي جلسة تانية جرّب نفس الـ UPDATE: هتتعلّق. شوفها في pg_stat_activity.",
          deep: {
            why: "الموقع علّق فجأة، أو migration واقفة من ١٠ دقايق. غالبًا استعلام ماسك lock والباقي مستنيه. لازم تشوف مين.",
            how: R`[[pg_stat_activity]] صف لكل اتصال. [[state]]: active بينفّذ، idle مستني أوامر، [[idle in transaction]] فتح transaction ومعملش commit (وده خطر: ماسك locks ومش بيعمل حاجة). [[query]] آخر استعلام. و [[now() - query_start]] من إمتى.

[[wait_event_type]] و [[wait_event]]: الاستعلام مستني إيه. [[Lock]] معناه مستني lock من اتصال تاني. [[pg_blocking_pids(pid)]] بيقولك مين ماسكه.

السيناريو الكلاسيكي: transaction من التطبيق فضلت مفتوحة (bug أو اتصال اتقطع)، وماسكة lock على صف، وأي UPDATE للصف ده بيستنى، والاتصالات بتتراكم لحد max_connections والموقع يقع.

[[pg_terminate_backend(pid)]] بيقفل الاتصال ويرجّع الـ transaction. [[pg_cancel_backend]] ألطف: يلغي الاستعلام الحالي بس.

و [[max_connections]] (الافتراضي 100) لما يخلص، أي اتصال جديد بيفشل بـ too many connections، والحل pooling مش رفع الرقم.`,
            when: "الموقع بطيء أو معلّق. قبل أي migration على جدول كبير. too many connections.",
            mistakes: "terminate لاتصال الـ migration نفسه. وإنك تعالج too many connections برفع max_connections بدل pooler."
          },
          teach: R`## الفكرة: جدول فيه كل اللي متصلين دلوقتي

[[pg_stat_activity]] مش جدول عادي، ده «view» بيتحسب لحظة ما تسأله: صف لكل اتصال مفتوح على السيرفر، فيه مين، وبيعمل إيه، ومن إمتى، ومستني إيه. ولما الموقع يعلّق، السبب غالبًا هنا: اتصال ماسك **lock** (قفل على صف أو جدول) والباقيين واقفين مستنيينه.

عشان أوريك ده حقيقي، عملت على [[postgres:16]] جوه Docker ٣ جلسات:

~~~text السيناريو
جلسة 1:  BEGIN; UPDATE users SET plan = 'pro' WHERE id = 1;    ومن غير COMMIT
جلسة 2:  UPDATE users SET plan = 'free' WHERE id = 1;          نفس الصف: هتستنى
جلسة 3:  الاستعلامات اللي في المثال
~~~

---

## ١. مين بيعمل إيه

~~~text SQL
SELECT pid, usename, state, now() - query_start AS age, left(query, 60)
FROM pg_stat_activity WHERE state <> 'idle' ORDER BY age DESC;
~~~

نفكه:

| الحتة | معناها |
|---|---|
| [[pid]] | process id: رقم الاتصال (كل اتصال process لوحده على السيرفر) |
| [[usename]] | اليوزر (مكتوبة كده من غير r، اسم العمود كده) |
| [[state]] | الحالة |
| [[now() - query_start AS age]] | بقاله قد إيه في الاستعلام ده. و [[AS age]] اسم للعمود |
| [[left(query, 60)]] | أول ٦٠ حرف من آخر استعلام، عشان الطويل ميبوّظش الشاشة |
| [[WHERE state <> 'idle']] | [[<>]] يعني «لا يساوي»: سيب الاتصالات الفاضية |
| [[ORDER BY age DESC]] | الأقدم الأول ([[DESC]] تنازلي) |

~~~text الناتج
 pid | usename  |        state        |       age       |                    left
-----+----------+---------------------+-----------------+---------------------------------------------
 625 | postgres | idle in transaction | 00:00:02.996746 | UPDATE users SET plan = 'pro' WHERE id = 1;
 628 | postgres | active              | 00:00:01.986826 | UPDATE users SET plan = 'free' WHERE id = 1;
 630 | postgres | active              | 00:00:00        | SELECT pid, usename, state, now() - query_s
~~~

الحالات:

| [[state]] | معناها |
|---|---|
| [[active]] | بينفّذ دلوقتي (أو واقف مستني lock جوه التنفيذ) |
| [[idle]] | متصل وفاضي، مستني أمر |
| [[idle in transaction]] | فتح BEGIN، عمل حاجة، ومستني من غير COMMIT. **ده الخطر** |

جلسة 625 مش بتعمل حاجة، بس ماسكة قفل الصف. وجلسة 628 [[active]] بس في الحقيقة واقفة. والصف الأخير ده أنا (جلسة 3).

---

## ٢. كام اتصال؟

~~~text SELECT count(*) FROM pg_stat_activity;
 count
-------
     8
~~~

٨ مع إن فيه ٣ جلسات بس؟ لأن الـ view فيه كمان عمليات Postgres الداخلية: [[autovacuum launcher]] و [[checkpointer]] و [[background writer]] و [[walwriter]] وغيرهم (بتبان في عمود [[backend_type]]). الاتصالات بتاعتك نوعها [[client backend]].

---

## ٣. مين مستني إيه

~~~text SQL
SELECT pid, wait_event_type, wait_event, left(query, 60)
FROM pg_stat_activity WHERE wait_event IS NOT NULL;
~~~

[[IS NOT NULL]] يعني «فيه قيمة» (مع NULL لازم [[IS]] مش [[=]]). الناتج فيه العمليات الداخلية كمان (نوعها [[Activity]]، وده طبيعي)، والمهم السطرين دول:

~~~text الناتج (سطور الجلسات بس)
 pid | wait_event_type |  wait_event   |                     left
-----+-----------------+---------------+----------------------------------------------
 625 | Client          | ClientRead    | UPDATE users SET plan = 'pro' WHERE id = 1;
 628 | Lock            | transactionid | UPDATE users SET plan = 'free' WHERE id = 1;
~~~

| القيمة | معناها |
|---|---|
| [[Client / ClientRead]] | مستني العميل يبعت الأمر الجاي (الجلسة 1 مستنياك تكتب COMMIT) |
| [[Lock / transactionid]] | مستني transaction تانية تخلص عشان تفك القفل |

ومين بالظبط؟ [[pg_blocking_pids(pid)]] بترجع قايمة الـ pids اللي سادّين الطريق:

~~~text SELECT pid, pg_blocking_pids(pid) FROM pg_stat_activity WHERE wait_event_type = 'Lock';
 pid | pg_blocking_pids
-----+------------------
 628 | {625}
~~~

[[{625}]] مصفوفة (array) فيها pid واحد: 625 هو اللي قافل على 628. ولو كذا حد مستني ورا بعض هتلاقي سلسلة، زي [[{581,594}]].

---

## ٤. اقفل الاتصال اللي سادد

~~~text SQL
SELECT pg_terminate_backend(625);
~~~

~~~text الناتج
 pg_terminate_backend
----------------------
 t
~~~

[[t]] يعني اتقفل. واللي حصل في الجلستين:

~~~text جلسة 2 (كانت واقفة)
UPDATE 1
~~~

~~~text جلسة 1 (اللي اتقفلت)
FATAL:  terminating connection due to administrator command
server closed the connection unexpectedly
~~~

جلسة 2 كمّلت على طول. وجلسة 1 اتقطعت والـ UPDATE بتاعها **اترجع** (ROLLBACK)، لأنها معملتش COMMIT. لو عايز تلغي الاستعلام الحالي بس من غير ما تقفل الاتصال: [[pg_cancel_backend(pid)]].

> متقفلش pid من غير ما تقرا هو بيعمل إيه: ممكن يكون migration لو اتقطعت في النص هتضطر تعيدها.

---

## ٥. [[SHOW max_connections;]]

~~~text الناتج
 max_connections
-----------------
 100
~~~

ده أقصى عدد اتصالات. لما جلسات كتير تتعلّق ورا lock واحد، التطبيق بيفتح اتصالات جديدة لحد ما توصل ١٠٠، وبعدها أي اتصال جديد بيفشل بـ [[too many connections]].

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| مين شغال ومن إمتى؟ | [[pg_stat_activity]] مع [[state <> 'idle']] |
| مين مستني lock؟ | [[wait_event_type = 'Lock']] |
| مين سادد عليه؟ | [[pg_blocking_pids(pid)]] |
| ألغي الاستعلام بس | [[pg_cancel_backend(pid)]] |
| اقفل الاتصال وارجّع الـ transaction | [[pg_terminate_backend(pid)]] |
| الحد الأقصى | [[SHOW max_connections;]] |

> [[idle in transaction]] لمدة طويلة = اتصال ماسك أقفال ومش بيعمل حاجة. ده أول حاجة تدوّر عليها.`,
          lines: [
            "الاتصالات اللي بتعمل حاجة، مرتبة بالأقدم، مع أول 60 حرف من الاستعلام.",
            "عدد الاتصالات.",
            "مين مستني إيه (Lock يعني مستني اتصال تاني).",
            "اقفل اتصال برقمه.",
            "الحد الأقصى للاتصالات."
          ],
          sol: R`الجلسة التانية بتفضل واقفة بعد الـ UPDATE من غير أي رسالة. و pg_stat_activity من جلسة تالتة بيطلّع حاجة زي:

الجلسة الأولى بـ [[state = idle in transaction]] (خلصت الـ UPDATE ومستنية COMMIT)، والتانية بـ [[state = active]] و [[wait_event_type = Lock]] و [[wait_event = transactionid]] والـ query بتاعها هو الـ UPDATE. يعني التانية مستنية الـ transaction بتاعة الأولى تخلص.

أول ما تعمل COMMIT أو ROLLBACK في الأولى، التانية تكمّل فورًا وتطبع [[UPDATE 1]]. الدرس: [[idle in transaction]] لفترة طويلة هو غالبًا سبب «القاعدة واقفة». ولو التانية ما اتعلقتش، يبقى الأولى مكانش فيها BEGIN (اتعملت commit لوحدها) أو الـ UPDATE التاني على صف مختلف. وحط [[SET lock_timeout = '5s';]] في التانية عشان تشوف [[canceling statement due to lock timeout]] بدل الانتظار للأبد.`,
          solCode: R`-- جلسة 1
BEGIN;
UPDATE users SET plan = 'pro' WHERE id = 1;
-- جلسة 2 (هتتعلق)
UPDATE users SET plan = 'x' WHERE id = 1;
-- جلسة 3
SELECT pid, state, wait_event_type, wait_event, left(query, 50)
FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid();`
        },
        {
          cmd: "الحجم",
          title: "إيه اللي واكل المساحة",
          desc: R`لما الديسك يتملى أو القاعدة تبطأ، أول سؤال: مين واكل المساحة؟ [[pg_database_size('app')]] بيرجع حجم القاعدة كلها بالبايت، و [[pg_size_pretty]] بتحوّله لشكل مقروء زي [[245 MB]].

السطر التاني بيجيب أكبر 10 جداول: [[pg_total_relation_size]] حجم الجدول بكل حاجته (البيانات والـ indexes والأعمدة الكبيرة)، و [[pg_statio_user_tables]] جدول نظام فيه جداولك انت بس، و [[ORDER BY ... DESC LIMIT 10]] رتّب من الأكبر وخد 10. التالت نفس الفكرة للـ indexes بـ [[pg_relation_size]] و [[pg_stat_user_indexes]]. و [[\dt+]] اختصار في psql بيعرض كل الجداول وحجمها في عمود Size.

خد بالك: [[DELETE]] مش بيصغّر الملف على الديسك على طول؛ الصفوف بتتعلّم ميتة، و VACUUM بيخلي مكانها يتعاد استخدامه.`,
          example: R`SELECT pg_size_pretty(pg_database_size('app'));
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS size FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;
SELECT indexrelname, pg_size_pretty(pg_relation_size(indexrelid)) FROM pg_stat_user_indexes ORDER BY pg_relation_size(indexrelid) DESC LIMIT 10;
\dt+`,
          try: "شوف أكبر ٣ جداول في قاعدتك. غالبًا جدول لوجات أو sessions ممكن ينضّف.",
          deep: {
            why: "القاعدة كبرت من ٢ لـ ٢٠ جيجا، والباك أب بقى بطيء، والديسك بيقرّب يتملى. لازم تعرف مين.",
            how: R`[[pg_database_size]] حجم قاعدة، و [[pg_size_pretty]] بيحوّل البايت لـ MB/GB.

[[pg_total_relation_size]] حجم الجدول بكل حاجته: البيانات، والـ indexes، والـ TOAST (الأعمدة الكبيرة زي text و jsonb بتتخزن في جدول جانبي). [[pg_relation_size]] البيانات بس. والفرق بينهم بيقولك الـ indexes واكلة قد إيه.

جداول النظام [[pg_stat_user_tables]] و [[pg_stat_user_indexes]] فيها كل جداولك و indexes بتاعتك مع إحصائيات، والاستعلامات في المثال بترتبهم بالحجم.

[[\dt+]] و [[\di+]] اختصار بيعرض الحجم في العمود الأخير.

أشهر المتهمين: جداول لوجات أو audit مبتتنضفش، و sessions قديمة، و indexes مش مستخدمة، و bloat (صفوف ميتة محتاجة VACUUM).`,
            when: "شهريًا. ولما الباك أب أو الديسك يكبر فجأة.",
            mistakes: "تمسح صفوف قديمة وتستغرب إن الحجم منقصش. DELETE بيعلّم الصفوف بس، و VACUUM بيحرر المساحة للاستخدام، و VACUUM FULL بس اللي بيرجّعها للنظام (وبيقفل الجدول)."
          },
          teach: R`## الفكرة: دوال بترجع حجم بالبايت، ودالة بتخليه مقروء

Postgres فيه دوال جاهزة بتقيس حجم أي حاجة على الديسك: القاعدة كلها، أو جدول، أو index. كلها بترجع **بايت**، فبنلفها في [[pg_size_pretty]] عشان يبقى [[26 MB]] بدل [[27263503]]. والمثال ٣ استعلامات من الأكبر للأصغر: القاعدة، وبعدين الجداول، وبعدين الـ indexes.

الناتج تحت من [[postgres:16]] جوه Docker، على قاعدة [[app]] أكبر جدول فيها [[orders]] بـ ٢٠٠ ألف صف.

---

## ١. حجم القاعدة كلها

~~~text SQL
SELECT pg_size_pretty(pg_database_size('app'));
~~~

من جوه لبره:

~~~text pg_database_size('app') لوحدها
 pg_database_size
------------------
         27263503
~~~

ده بالبايت. و [[pg_size_pretty]] بتقسم وتختار الوحدة المناسبة (bytes و kB و MB و GB و TB، وكل وحدة ١٠٢٤ من اللي قبلها):

~~~text الناتج
 pg_size_pretty
----------------
 26 MB
~~~

27263503 ÷ 1024 ÷ 1024 ≈ 26.

---

## ٢. أكبر ١٠ جداول

~~~text SQL
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;
~~~

| الحتة | معناها |
|---|---|
| [[pg_catalog.pg_statio_user_tables]] | view فيه صف لكل جدول **انت** عامله (من غير جداول النظام). [[pg_catalog.]] اسم الـ schema اللي هو فيها |
| [[relname]] | اسم الجدول (relation name) |
| [[relid]] | رقم الجدول الداخلي (OID)، الدوال بتاخده بدل الاسم |
| [[pg_total_relation_size(relid)]] | حجم الجدول **بكل حاجته**: البيانات والـ indexes و TOAST |
| [[ORDER BY ... DESC]] | رتّب بالحجم الحقيقي بالبايت، من الأكبر |
| [[LIMIT 10]] | أول ١٠ |

ليه بنرتّب بالرقم مش بالـ [[size]]؟ لأن [[size]] نص، والنص بيترتّب حرف حرف، فـ [["80 kB"]] هتيجي قبل [["18 MB"]].

~~~text الناتج
  relname  | size
-----------+-------
 orders    | 18 MB
 users     | 80 kB
 products  | 64 kB
 coupons   | 64 kB
 staff     | 64 kB
 coupons2  | 64 kB
 sessions  | 64 kB
 audit_log | 16 kB
~~~

[[orders]] واكل كل حاجة تقريبًا. و **TOAST** ده جدول جانبي Postgres بيحط فيه القيم الكبيرة (نص طويل أو jsonb كبير) أوتوماتيك.

---

## ٣. أكبر ١٠ indexes

~~~text SQL
SELECT indexrelname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes ORDER BY pg_relation_size(indexrelid) DESC LIMIT 10;
~~~

نفس الفكرة: [[pg_stat_user_indexes]] صف لكل index، و [[indexrelname]] اسمه، و [[pg_relation_size]] حجم الحاجة دي لوحدها.

~~~text الناتج (أول سطور)
  indexrelname   | pg_size_pretty
-----------------+----------------
 orders_pkey     | 4408 kB
 users_email_key | 16 kB
 sessions_pkey   | 16 kB
~~~

### البيانات ولا الـ indexes؟

~~~text SQL
SELECT pg_size_pretty(pg_relation_size('orders')) AS data,
       pg_size_pretty(pg_indexes_size('orders')) AS indexes,
       pg_size_pretty(pg_total_relation_size('orders')) AS total;
~~~

~~~text الناتج
 data  | indexes | total
-------+---------+-------
 14 MB | 4408 kB | 18 MB
~~~

14 MB بيانات + 4.3 MB index ≈ 18 MB. وده بيفسّر الـ 18 فوق.

| الدالة | بتحسب |
|---|---|
| [[pg_relation_size]] | الحاجة دي لوحدها (بيانات الجدول بس، أو الـ index بس) |
| [[pg_indexes_size]] | كل الـ indexes بتاعة الجدول |
| [[pg_total_relation_size]] | الجدول + indexes + TOAST |
| [[pg_database_size]] | القاعدة كلها |

---

## ٤. [[\dt+]]: الاختصار

~~~text الناتج (أعمدة مختارة)
   Name    |    Size
-----------+------------
 audit_log | 8192 bytes
 orders    | 14 MB
 users     | 48 kB
~~~

مترتب بالاسم مش بالحجم، والرقم من غير الـ indexes (لاحظ [[orders]] بـ 14 MB مش 18). و [[8192 bytes]] = صفحة واحدة: Postgres بيخزن كل حاجة في صفحات حجمها 8 kB، فأصغر جدول فيه بيانات بياخد صفحة.

---

## الخلاصة

~~~text
pg_size_pretty(...)            بايت ← kB/MB/GB
pg_database_size('db')         القاعدة
pg_total_relation_size('t')    الجدول بكل حاجته
pg_relation_size('t')          البيانات بس
\dt+  و  \di+                  نفس الكلام بسرعة في psql
~~~

> اترتّب بالرقم مش بالنص. ولو مسحت صفوف والحجم ما نقصش، ده طبيعي: درس VACUUM.`,
          lines: ["حجم القاعدة كلها.", "أكبر ١٠ جداول (بيانات و indexes).", "أكبر ١٠ indexes.", "الجداول بحجمها."],
          sol: R`الاستعلام بيرجّع [[relname | size]] مترتبين من الأكبر. في قاعدة التجربة كان [[big | 82 MB]] وبعده [[users | 48 kB]] و [[orders | 16 kB]]. في مشروع حقيقي غالبًا هتلاقي فوق جدول زي [[sessions]] أو [[audit_logs]] أو [[notifications]] بحجم أكبر من الداتا المهمة نفسها.

خلي بالك إن [[pg_total_relation_size]] بيحسب الجدول والـ indexes والـ TOAST، فالرقم أكبر من اللي في [[\dt+]] (دا بيعرض الجدول بس). والقرار بعدها مش إنك تمسح وخلاص: حط سياسة (مثلًا امسح sessions المنتهية من ٣٠ يوم) بـ cron.

المفاجأة الشائعة: تمسح نص الجدول والحجم ما يقلّش. دا طبيعي، [[VACUUM]] العادي بيخلي المساحة متاحة لإعادة الاستخدام جوه الجدول بس، ودا موضوع درس VACUUM.`
        },
        {
          cmd: "الـ indexes",
          title: "الاستعلام بطيء لأن مفيش index",
          desc: R`من غير index، [[WHERE email = ...]] بيقرا الجدول كله. الـ index زي فهرس الكتاب. [[\di]] بيعرضهم، و [[pg_stat_user_indexes]] بيقولك مين بيتستخدم ومين لأ. الـ index اللي مش بيتستخدم بيبطّئ الكتابة من غير فايدة.`,
          example: R`\di
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);
CREATE INDEX CONCURRENTLY idx_orders_status_created ON orders (status, created_at DESC);
SELECT indexrelname, idx_scan FROM pg_stat_user_indexes WHERE idx_scan = 0 AND indexrelname NOT LIKE '%pkey';
DROP INDEX CONCURRENTLY idx_unused;`,
          try: R`اعمل جدول بمليون صف بـ [[generate_series]]، وقيس استعلام WHERE قبل وبعد الـ index بـ [[\timing]].`,
          deep: {
            why: "نفس الاستعلام بياخد ٢ ثانية على مليون صف و ٢ ملي ثانية مع index. الفرق ألف مرة. ومعظم مشاكل الأداء index ناقص.",
            how: R`الـ index هيكل منفصل (B-tree غالبًا) بيحفظ قيم عمود مرتبة مع مؤشر للصف. [[WHERE email = 'x']] من غيره: Seq Scan، بيقرا كل الصفوف. معاه: Index Scan، بيلاقي القيمة في الشجرة ويروح للصف مباشرة.

الـ primary key و UNIQUE بيعملوا index لوحدهم. الـ foreign key لأ، وده أشهر index ناقص: [[orders.user_id]] من غير index معناه كل [[WHERE user_id = ...]] و كل JOIN على users بطيء.

[[CONCURRENTLY]] بيبني الـ index من غير ما يقفل الجدول للكتابة، فالموقع شغال أثناء البناء. أبطأ ومينفعش جوه transaction، بس على الإنتاج إجباري.

index مركب [[(status, created_at DESC)]] بيخدم [[WHERE status = 'paid' ORDER BY created_at DESC]]، والترتيب فيه مهم: العمود اللي بتساوي فيه الأول.

الـ indexes مش مجانية: كل INSERT و UPDATE بيحدّثهم. [[idx_scan = 0]] معناه عمره ما اتستخدم من آخر reset للإحصائيات، وغالبًا يتشال.`,
            when: "كل foreign key. كل عمود في WHERE أو ORDER BY متكرر. وبعد EXPLAIN يوريك Seq Scan على جدول كبير.",
            mistakes: "CREATE INDEX من غير CONCURRENTLY على الإنتاج فيقفل الجدول دقايق. و index على كل عمود «احتياطي» فالكتابة تبطأ."
          },
          teach: R`## الفكرة: فهرس الكتاب

عايز كل الطلبات بتاعة يوزر 42؟ من غير index، Postgres بيقرا الـ ٢٠٠ ألف صف واحد واحد ويشوف [[user_id]] بتاع كل صف (اسمها **Seq Scan**: قراية متتالية). الـ index نسخة مترتبة من قيم العمود، وجنب كل قيمة مكان الصف، فيروح على طول للقيمة اللي عايزها (**Index Scan**). زي فهرس آخر الكتاب بالظبط.

الناتج تحت من [[postgres:16]] جوه Docker، على [[orders]] فيه ٢٠٠ ألف صف، و [[\timing on]] شغال.

---

## ١. [[\di]]: الموجود

[[d]] describe و [[i]] indexes.

~~~text الناتج (سطور orders و users)
 Schema |      Name       | Type  |  Owner   |   Table
--------+-----------------+-------+----------+-----------
 public | orders_pkey     | index | postgres | orders
 public | users_email_key | index | postgres | users
 public | users_pkey      | index | postgres | users
~~~

كل جدول عنده [[_pkey]] (الـ primary key بيعمل index لوحده)، و [[users_email_key]] جه من [[UNIQUE]] على الإيميل. أما [[orders.user_id]] فعليه foreign key بس **مفيش** index: Postgres مش بيعمله لوحده للـ foreign key.

---

## ٢. قبل وبعد

~~~text SELECT count(*) FROM orders WHERE user_id = 42; (مرتين، من غير index)
 count
-------
 40000
Time: 31.178 ms
Time: 17.108 ms
~~~

~~~text CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);
CREATE INDEX
Time: 133.024 ms
~~~

| الحتة | معناها |
|---|---|
| [[CREATE INDEX]] | اعمل index |
| [[CONCURRENTLY]] | ابنيه والجدول شغال: INSERT و UPDATE مش هيقفوا وهو بيتبني |
| [[idx_orders_user_id]] | اسمه. العُرف: idx_الجدول_العمود |
| [[ON orders (user_id)]] | على أنهي جدول وأنهي عمود |

~~~text نفس الـ count بعد الـ index
 count
-------
 40000
Time: 2.051 ms
~~~

من 17 لـ 2 مللي ثانية. والفرق بيكبر كل ما الجدول يكبر، لأن الـ Seq Scan وقته بيزيد مع عدد الصفوف، والـ index تقريبًا لأ. وعشان تتأكد إنه اتستخدم فعلًا:

~~~text EXPLAIN SELECT count(*) FROM orders WHERE user_id = 42;
   ->  Index Only Scan using idx_orders_user_id on orders  (cost=0.29..844.02 rows=40213 width=0)
         Index Cond: (user_id = 42)
~~~

[[Index Only Scan]] يعني جاوب من الـ index لوحده من غير ما يلمس الجدول (كل اللي محتاجه يعدّ). [[EXPLAIN]] ليه درس لوحده بعد ده.

### ليه [[CONCURRENTLY]] مينفعش جوه BEGIN

~~~text BEGIN; CREATE INDEX CONCURRENTLY x ON orders(total);
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

لأنه بيبني على كذا مرحلة، كل مرحلة transaction لوحدها. فشغّله لوحده، أو في migration متعلّمة إنها من غير transaction.

---

## ٣. index على عمودين

~~~text SQL
CREATE INDEX CONCURRENTLY idx_orders_status_created ON orders (status, created_at DESC);
~~~

بيخدم الاستعلام ده: «آخر ٢٠ طلب مدفوع»:

~~~text EXPLAIN SELECT * FROM orders WHERE status = 'paid' ORDER BY created_at DESC LIMIT 20;  قبل (من غير سطر Workers Planned)
 Limit  (cost=5260.91..5263.21 rows=20 width=38)
   ->  Gather Merge  (cost=5260.91..9800.07 rows=39471 width=38)
         ->  Sort  (cost=4260.90..4359.57 rows=39471 width=38)
               Sort Key: created_at DESC
               ->  Parallel Seq Scan on orders  (cost=0.00..3210.59 rows=39471 width=38)
                     Filter: (status = 'paid'::text)
~~~

من تحت لفوق: اقرا الجدول كله ([[Seq Scan]])، صفّي المدفوع ([[Filter]])، رتّب كله ([[Sort]])، وخد ٢٠ ([[Limit]]).

~~~text نفس الـ EXPLAIN  بعد
 Limit  (cost=0.42..3.06 rows=20 width=38)
   ->  Index Scan using idx_orders_status_created on orders  (cost=0.42..8869.32 rows=67100 width=38)
         Index Cond: (status = 'paid'::text)
~~~

الـ index مترتب بـ status الأول، وجوه كل status مترتب بـ [[created_at DESC]] (الأحدث الأول). فيروح لأول [[paid]] ويقرا ٢٠ ويقف. مفيش Sort خالص، والـ [[cost]] (رقم تقديري نسبي) نزل من 5263 لـ 3.

ترتيب الأعمدة مهم: العمود اللي بتعمل عليه [[=]] الأول، وبعده اللي بترتب بيه أو بتعمل عليه [[>]] و [[<]].

---

## ٤. indexes محدش بيستخدمها

~~~text SQL
SELECT indexrelname, idx_scan FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexrelname NOT LIKE '%pkey';
~~~

[[idx_scan]] عدد المرات اللي الـ index اتقري فيها. و [[NOT LIKE '%pkey']] سيب الـ primary keys ([[%]] يعني «أي حروف»). من جلسة جديدة:

~~~text الناتج
       indexrelname        | idx_scan
---------------------------+----------
 users_email_key           |        0
 idx_orders_status_created |        0
~~~

[[idx_orders_user_id]] مش موجود لأنه اتقري مرة ([[idx_scan = 1]]). و [[idx_orders_status_created]] صفر لأني جربته بـ [[EXPLAIN]] بس، و EXPLAIN مش بينفّذ. و [[users_email_key]] صفر بس متمسحوش: ده بيمنع الإيميل المكرر، شغلته الحماية مش السرعة.

> الإحصائيات دي بتتحدّث بتأخير بسيط، وفي نفس الجلسة اللي استخدمت فيها الـ index ممكن لسه تلاقيه صفر. اسأل من جلسة جديدة. والرقم بيتعد من آخر reset للإحصائيات، فقاعدة لسه شغالة من يومين مش مقياس.

---

## ٥. امسح index

~~~text SQL
DROP INDEX CONCURRENTLY idx_unused;
~~~

~~~text الناتج
DROP INDEX
~~~

ليه نمسح؟ كل INSERT و UPDATE لازم يحدّث **كل** الـ indexes اللي على الجدول، فالـ index اللي محدش بيقراه بيبطّأ الكتابة وبياخد مساحة على الفاضي.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تشوف الموجود | [[\di]] |
| index على الإنتاج | [[CREATE INDEX CONCURRENTLY idx_t_col ON t (col);]] |
| لاستعلام فلتر + ترتيب | [[(col_equal, col_sort DESC)]] |
| تتأكد إنه اتستخدم | [[EXPLAIN]] وتدوّر على [[Index Scan]] |
| مين مش مستخدم | [[pg_stat_user_indexes]] و [[idx_scan = 0]] |
| تمسح | [[DROP INDEX CONCURRENTLY]] |

> أول index تحطه: على كل عمود foreign key ([[orders.user_id]] وأمثاله).`,
          lines: [
            "الـ indexes الموجودة.",
            "index على foreign key، من غير قفل الجدول.",
            "index مركب لاستعلام بيفلتر بالحالة ويرتب بالتاريخ.",
            "indexes عمرها ما اتستخدمت (غير الـ primary keys).",
            "امسح واحد من غير قفل."
          ],
          sol: R`على جدول مليون صف من [[generate_series]] الأرقام اللي طلعت: [[SELECT count(*) FROM big WHERE user_id = 4242]] أخد حوالي [[30 ms]] من غير index، وإنشاء الـ index أخد [[393 ms]]، ونفس الاستعلام بعده بقى [[0.678 ms]].

الأرقام عندك هتختلف حسب الجهاز، بس الفرق لازم يبقى عشرات المرات. ولو ما لقيتش فرق: يا الاستعلام بيرجّع جزء كبير من الجدول (Postgres بيفضّل الـ Seq Scan لو هترجع مثلًا ٣٠٪ من الصفوف)، يا الـ WHERE عامل حاجة على العمود زي [[lower(email)]] فالـ index العادي مش بيستخدم. واعمل [[ANALYZE big;]] بعد إنشاء الجدول عشان الـ planner يعرف حجمه.

وخلي بالك: [[CREATE INDEX CONCURRENTLY]] مينفعش جوه BEGIN، هيقولك [[cannot run inside a transaction block]].`,
          solCode: R`CREATE TABLE big AS
  SELECT g AS id, (random() * 100000)::int AS user_id, md5(g::text) AS note
  FROM generate_series(1, 1000000) g;
ANALYZE big;
\timing on
SELECT count(*) FROM big WHERE user_id = 4242;
CREATE INDEX idx_big_user ON big (user_id);
SELECT count(*) FROM big WHERE user_id = 4242;`
        },
        {
          cmd: "EXPLAIN ANALYZE",
          title: "اقرا خطة الاستعلام",
          desc: R`لما استعلام يبقى بطيء، [[EXPLAIN]] بيوريك Postgres ناوي ينفّذه إزاي (الخطة) من غير ما ينفّذه: هيقرا الجدول كله صف صف ([[Seq Scan]]) ولا هيستخدم index ويروح للصفوف المطلوبة على طول ([[Index Scan]]). الأرقام هنا تقديرات: [[cost]] رقم نسبي مش وقت، و [[rows]] عدد الصفوف المتوقع.

[[EXPLAIN ANALYZE]] بينفّذ الاستعلام فعلًا ويضيف الأرقام الحقيقية: [[actual time]] بالمللي ثانية وعدد الصفوف الفعلي، وفي الآخر [[Execution Time]]. و [[(ANALYZE, BUFFERS, FORMAT TEXT)]] بيضيف كمان كام صفحة اتقرت من الذاكرة وكام من الديسك. الخطة شجرة: السطور اللي داخلة لجوه أكتر بتتنفّذ الأول.

أشهر اكتشاف: [[Seq Scan]] على جدول كبير في عمود بتفلتر بيه، يعني ناقصه index. وخد بالك: ANALYZE بينفّذ بجد، فمع [[UPDATE]] أو [[DELETE]] لفّه في [[BEGIN]] و [[ROLLBACK]].`,
          example: R`EXPLAIN SELECT * FROM orders WHERE user_id = 42;
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.status = 'paid';`,
          try: "شغّل EXPLAIN ANALYZE على أبطأ استعلام عندك، ودوّر على Seq Scan على جدول كبير. ده مكان الـ index الناقص.",
          deep: {
            why: "«الاستعلام بطيء» مش تشخيص. EXPLAIN بيقولك بالظبط Postgres بيعمل إيه وأنهي خطوة بتاخد الوقت.",
            how: R`[[EXPLAIN]] بيعرض الخطة من غير تنفيذ: تقديرات. [[EXPLAIN ANALYZE]] بينفّذ فعلًا ويعرض الأرقام الحقيقية جنب التقديرات. خد بالك: بينفّذ، فمع UPDATE أو DELETE لفّه في transaction واعمل ROLLBACK.

الخطة شجرة، بتتقري من جوه لبره (الأكتر مسافة بادئة بيتنفذ الأول). كل سطر عقدة: نوعها، والتكلفة المقدرة [[cost=]]، والوقت الفعلي [[actual time=]]، وعدد الصفوف المتوقع [[rows=]] والفعلي.

أهم أنواع: [[Seq Scan]] قراية الجدول كله (على جدول صغير طبيعي، على كبير مشكلة). [[Index Scan]] استخدام index. [[Index Only Scan]] أحسن، كل اللي محتاجه في الـ index. [[Nested Loop]] و [[Hash Join]] طرق الـ JOIN. [[Sort]] ترتيب، ولو [[external merge]] معناه work_mem مكفاش وبيرتب على الديسك.

الفرق الكبير بين rows المتوقعة والفعلية معناه الإحصائيات قديمة: [[ANALYZE]].

[[BUFFERS]] بيضيف كام صفحة اتقرت من الكاش (shared hit) ومن الديسك (read).

ولقراية خطة معقدة: explain.dalibo.com، تلزق الناتج ويرسمه.`,
            when: "أي استعلام أبطأ من ١٠٠ms. وقبل ما تضيف index، تتأكد إنه هيتستخدم.",
            mistakes: "EXPLAIN ANALYZE على DELETE من غير transaction. وتقرا الـ cost كأنه وقت، ده رقم نسبي."
          },
          teach: R`## الفكرة: اسأل Postgres «هتعملها إزاي؟»

قبل ما Postgres ينفّذ أي استعلام، جزء منه اسمه **planner** بيفكّر في كذا طريقة (يقرا الجدول كله؟ يستخدم index؟ يربط الجدولين إزاي؟) ويختار الأرخص. [[EXPLAIN]] قبل الاستعلام بيطبعلك الخطة اللي اختارها **من غير ما ينفّذ**. و [[EXPLAIN ANALYZE]] بينفّذ فعلًا ويحط جنب كل خطوة الوقت والعدد الحقيقي.

الناتج تحت من [[postgres:16]] جوه Docker على [[orders]] (٢٠٠ ألف صف، عليه index على [[user_id]] وعلى [[(status, created_at)]] من الدرس اللي فات) و [[users]] (٥ صفوف).

---

## ١. [[EXPLAIN]]: الخطة بالتقديرات

~~~text EXPLAIN SELECT * FROM orders WHERE user_id = 42;
                                      QUERY PLAN
---------------------------------------------------------------------------------------
 Bitmap Heap Scan on orders  (cost=451.95..2694.61 rows=40213 width=38)
   Recheck Cond: (user_id = 42)
   ->  Bitmap Index Scan on idx_orders_user_id  (cost=0.00..441.89 rows=40213 width=0)
         Index Cond: (user_id = 42)
~~~

### بتتقري إزاي؟

الخطة **شجرة**. كل سطر فيه [[->]] خطوة، والأكتر مسافة على الشمال بيتنفّذ **الأول** وبيسلّم نتيجته للي فوقه. فهنا:

1. [[Bitmap Index Scan on idx_orders_user_id]]: افتح الـ index وهات أماكن كل الصفوف اللي [[user_id = 42]] (و [[Index Cond]] الشرط اللي اتدوّر بيه في الـ index).
2. [[Bitmap Heap Scan on orders]]: روح للجدول نفسه (اسمه **heap**) وهات الصفوف دي، مترتبة بمكانها على الديسك عشان يقرا كل صفحة مرة واحدة. و [[Recheck Cond]] بيتأكد من الشرط تاني على الصف.

### الأرقام اللي بين القوسين

| الرقم | معناه |
|---|---|
| [[cost=451.95..2694.61]] | تكلفة تقديرية **نسبية** (مش ثواني): الأول لحد أول صف، والتاني لحد آخر صف |
| [[rows=40213]] | كام صف متوقع يطلع من الخطوة دي |
| [[width=38]] | متوسط حجم الصف بالبايت |

---

## ٢. [[EXPLAIN ANALYZE]]: نفّذ وقيس

~~~text EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
 Bitmap Heap Scan on orders  (cost=451.95..2694.61 rows=40213 width=38) (actual time=2.195..23.864 rows=40000 loops=1)
   Recheck Cond: (user_id = 42)
   Heap Blocks: exact=1740
   ->  Bitmap Index Scan on idx_orders_user_id  (cost=0.00..441.89 rows=40213 width=0) (actual time=1.933..1.934 rows=40000 loops=1)
         Index Cond: (user_id = 42)
 Planning Time: 0.046 ms
 Execution Time: 25.588 ms
~~~

نفس الخطة وزاد قوس تاني [[(actual ...)]]:

| الرقم | معناه |
|---|---|
| [[actual time=2.195..23.864]] | بالمللي ثانية: لحد أول صف، ولحد آخر صف |
| [[rows=40000]] | الصفوف اللي طلعت **فعلًا**. قارنها بالمتوقع ([[40213]]): قريبين، يبقى الإحصائيات تمام |
| [[loops=1]] | الخطوة دي اتنفّذت كام مرة |
| [[Heap Blocks: exact=1740]] | قرا 1740 صفحة من الجدول (كل صفحة 8 kB) |
| [[Planning Time]] | وقت اختيار الخطة |
| [[Execution Time]] | وقت التنفيذ كله، ودا الرقم اللي بتقارن بيه |

### وعلى عمود من غير index

~~~text EXPLAIN ANALYZE SELECT * FROM orders WHERE total = 19.99;
 Seq Scan on orders  (cost=0.00..4240.00 rows=4013 width=38) (actual time=0.010..30.704 rows=4000 loops=1)
   Filter: (total = 19.99)
   Rows Removed by Filter: 196000
 Planning Time: 0.145 ms
 Execution Time: 30.996 ms
~~~

[[Seq Scan]] قرا الجدول كله، و [[Rows Removed by Filter: 196000]] يعني قرا 196 ألف صف ورماهم عشان يرجّع 4000. الرقم ده الكبير جنب [[Seq Scan]] على جدول كبير هو علامة الـ index الناقص.

---

## ٣. [[(ANALYZE, BUFFERS, FORMAT TEXT)]] على JOIN

~~~text SQL
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.status = 'paid';
~~~

الخيارات بين قوسين ومفصولة بفواصل: [[ANALYZE]] نفّذ، [[BUFFERS]] قولي قريت كام صفحة ومنين، [[FORMAT TEXT]] الشكل العادي (فيه كمان [[JSON]]). و [[o]] و [[u]] أسامي مختصرة للجدولين (aliases)، و [[o.*]] كل أعمدة orders.

~~~text الناتج
 Hash Join  (cost=1.11..4566.55 rows=67100 width=54) (actual time=0.103..41.830 rows=66666 loops=1)
   Hash Cond: (o.user_id = u.id)
   Buffers: shared hit=1741
   ->  Seq Scan on orders o  (cost=0.00..4240.00 rows=67100 width=38) (actual time=0.014..25.463 rows=66666 loops=1)
         Filter: (status = 'paid'::text)
         Rows Removed by Filter: 133334
         Buffers: shared hit=1740
   ->  Hash  (cost=1.05..1.05 rows=5 width=24) (actual time=0.028..0.030 rows=5 loops=1)
         Buckets: 1024  Batches: 1  Memory Usage: 9kB
         Buffers: shared hit=1
         ->  Seq Scan on users u  (cost=0.00..1.05 rows=5 width=24) (actual time=0.006..0.007 rows=5 loops=1)
               Buffers: shared hit=1
 Planning:
   Buffers: shared hit=181
 Planning Time: 1.122 ms
 Execution Time: 45.243 ms
~~~

من جوه لبره:

1. [[Seq Scan on users u]]: اقرا الـ ٥ يوزرز.
2. [[Hash]]: اعملهم جدول في الذاكرة بمفتاح [[id]] ([[Memory Usage: 9kB]]).
3. [[Seq Scan on orders o]] مع [[Filter: (status = 'paid')]]: اقرا الطلبات وسيب المدفوع ([[66666]] صف).
4. [[Hash Join]]: لكل طلب، دوّر على صاحبه في الـ hash بـ [[Hash Cond: (o.user_id = u.id)]].

و [[Buffers: shared hit=1740]]: [[shared hit]] يعني الصفحات لقاها في كاش Postgres في الذاكرة، ولو فيه [[read=]] يبقى قرا من الديسك (أبطأ).

### طب ليه Seq Scan وفيه index على status؟

لأن المدفوع ثلث الجدول. لما الاستعلام هيرجّع جزء كبير، قراية الجدول كله بالترتيب أرخص من آلاف القفزات من الـ index للجدول. الـ planner اختار صح، و Seq Scan هنا مش مشكلة.

---

## ٤. تحذير: ANALYZE بينفّذ بجد

~~~text SQL
BEGIN;
EXPLAIN ANALYZE DELETE FROM sessions WHERE expires_at < now();
ROLLBACK;
~~~

من غير [[BEGIN]] و [[ROLLBACK]]، الـ DELETE هيمسح فعلًا وانت كنت «بتقيس» بس.

---

## الخلاصة

| تشوف | معناه |
|---|---|
| [[Seq Scan]] + [[Rows Removed by Filter]] كبير على جدول كبير | ناقص index |
| [[Index Scan]] / [[Bitmap Index Scan]] / [[Index Only Scan]] | الـ index اشتغل |
| [[rows=]] المتوقع بعيد جدًا عن الفعلي | الإحصائيات قديمة: [[ANALYZE table;]] |
| [[shared read]] كبير | بيقرا من الديسك مش الكاش |
| [[Sort Method: external merge]] | الترتيب مكفاش في [[work_mem]] ونزل على الديسك |
| [[Execution Time]] | الرقم اللي بتقارن بيه قبل وبعد |`,
          lines: [
            "الخطة بالتقديرات من غير تنفيذ.",
            "الخطة بالأرقام الفعلية (بينفّذ).",
            "مع عدد الصفحات المقروءة من الكاش والديسك، لاستعلام فيه JOIN."
          ],
          sol: R`على عمود من غير index هتشوف حاجة زي:

[[Parallel Seq Scan on big (actual time=32.013..32.013 rows=0 loops=3)]] و [[Filter: (note = 'abc'::text)]] و [[Rows Removed by Filter: 333333]] و [[Execution Time: 43.563 ms]]. الـ [[Rows Removed by Filter]] الكبيرة هي الإشارة: قرينا مليون صف عشان نرجّع صفر.

وعلى عمود عليه index: [[Bitmap Index Scan on idx_big_user]] مع [[Index Cond: (user_id = 4242)]] و [[Execution Time: 0.054 ms]]. أحيانًا تشوف [[Index Scan]] بدل Bitmap، الاتنين معناهم إن الـ index اشتغل.

متقلقش من Seq Scan على جدول صغير أو استعلام بيرجّع أغلب الجدول، دا الصح. قارن كمان [[rows=]] المتوقعة بالـ actual: لو الفرق ضخم (متوقع 1 وطلع 50000) يبقى الإحصائيات قديمة و [[ANALYZE]] هيحسّن الخطة. وخلي بالك إن EXPLAIN ANALYZE بينفّذ الاستعلام فعلًا، فمع UPDATE أو DELETE حطه جوه BEGIN و ROLLBACK.`
        },
        {
          cmd: "VACUUM و ANALYZE",
          title: "الصيانة اللي بتحصل لوحدها (غالبًا)",
          desc: "Postgres مش بيمسح الصفوف المحذوفة فورًا، بيعلّمها. [[VACUUM]] بينضّفها، و [[ANALYZE]] بيحدّث الإحصائيات اللي المخطط بيعتمد عليها. autovacuum بيعملهم لوحده، بس بعد حذف أو تحديث ضخم ممكن تحتاج تعملهم بإيدك.",
          example: R`VACUUM ANALYZE orders;
SELECT relname, n_dead_tup, last_autovacuum, last_autoanalyze FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;
SHOW autovacuum;
VACUUM (VERBOSE) orders;`,
          try: "بعد ما تمسح نص جدول كبير، شوف n_dead_tup قبل وبعد VACUUM.",
          deep: {
            why: "مسحت مليون صف والجدول لسه بنفس الحجم والاستعلامات بطيئة. Postgres محتاج ينضّف.",
            how: R`Postgres بيستخدم MVCC: لما تعمل UPDATE، مش بيعدّل الصف في مكانه، بيكتب نسخة جديدة ويعلّم القديمة ميتة. DELETE بيعلّم بس. ده بيخلي القراية والكتابة ميعطلوش بعض، بس الصفوف الميتة بتتراكم (bloat).

[[VACUUM]] بيمشي على الجدول ويحرر مكان الصفوف الميتة لإعادة الاستخدام (مش للنظام). [[ANALYZE]] بيحسب إحصائيات عن توزيع القيم، والمخطط بيستخدمها يقرر Index Scan ولا Seq Scan. إحصائيات قديمة = خطط غلط.

[[autovacuum]] عملية خلفية بتعمل الاتنين لوحدها لما نسبة الصفوف الميتة تعدّي حد. شغال افتراضيًا، ومتقفلوش أبدًا. بس بعد عملية ضخمة (حذف نص الجدول، أو استيراد كبير) اعمل [[VACUUM ANALYZE]] بإيدك بدل ما تستنى.

[[n_dead_tup]] في pg_stat_user_tables بيقولك كام صف ميت، و [[last_autovacuum]] آخر مرة.

[[VACUUM FULL]] بيعيد كتابة الجدول كله ويرجّع المساحة للنظام، بس بيقفل الجدول تمامًا. للطوارئ بس، أو pg_repack بديل من غير قفل.`,
            when: "بعد استيراد أو حذف ضخم. لما n_dead_tup كبير. وقبل قياس أداء.",
            mistakes: "تقفل autovacuum «عشان بياخد موارد». والجدول يتضخم والاستعلامات تبطأ تدريجيًا."
          },
          teach: R`## الفكرة: Postgres بيعلّم ومش بيمسح على طول

لما تعمل [[DELETE]]، Postgres مش بيشيل الصف من الديسك. بيكتب عليه «ميت من transaction رقم كذا» وبيسيبه مكانه. و [[UPDATE]] نفس الحكاية: بيكتب نسخة **جديدة** من الصف ويعلّم القديمة ميتة. ليه؟ عشان أي جلسة تانية كانت بدأت تقرا قبل التعديل تفضل شايفة النسخة القديمة من غير ما تستنى (الفكرة دي اسمها **MVCC**: نسخ متعددة لنفس الصف). الصف الميت اسمه **dead tuple** ([[tuple]] اسم تاني للصف).

المشكلة إن الصفوف الميتة بتفضل واخدة مكان. [[VACUUM]] هو اللي بيلف على الجدول ويعلّم مكانها «فاضي، استخدمه تاني». و [[ANALYZE]] حاجة تانية خالص: بيعدّ ويحسب إحصائيات عن القيم اللي في كل عمود، والـ planner (اللي بيختار Seq Scan ولا Index Scan) بيعتمد عليها.

الناتج تحت من [[postgres:16]] جوه Docker: الأول على قاعدة [[app]] (جدول [[orders]] فيه ٢٠٠ ألف صف)، وبعدين على جدول [[big]] بمليون صف عشان الأرقام تبان.

---

## ١. [[VACUUM ANALYZE orders;]]

~~~text الناتج
VACUUM
~~~

سطر واحد بس، ومعناه خلص من غير مشاكل. الأمر بيعمل الاتنين ورا بعض على جدول [[orders]]: ينضّف الصفوف الميتة، وبعدين يحدّث الإحصائيات. ولو كتبت [[VACUUM ANALYZE;]] من غير اسم جدول بيعدّي على كل جداول القاعدة.

قبلها كنت عملت [[UPDATE orders SET total = total WHERE id % 4 = 0;]] (تعديل مش بيغيّر حاجة فعليًا، بس Postgres بيكتب نسخة جديدة برضه)، وده اللي حصل في الإحصائيات قبل وبعد:

~~~text SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables WHERE relname = 'orders';
 relname | n_live_tup | n_dead_tup
---------+------------+------------
 orders  |          0 |      50000
~~~

[[UPDATE 50000]] عمل ٥٠ ألف صف ميت، مع إن ولا قيمة اتغيرت. ([[n_live_tup]] صفر هنا لأن عدّاد الصفوف الحية كان لسه متحسبش من ساعة ما السيرفر قام، و ANALYZE هو اللي بيظبطه.) وبعد [[VACUUM ANALYZE orders]] الـ [[n_dead_tup]] بقى [[0]].

---

## ٢. مين محتاج تنضيف؟

~~~text SQL
SELECT relname, n_dead_tup, last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;
~~~

| الحتة | معناها |
|---|---|
| [[pg_stat_user_tables]] | view فيه صف إحصائيات لكل جدول من جداولك |
| [[relname]] | اسم الجدول |
| [[n_dead_tup]] | عدد الصفوف الميتة اللي لسه متنضّفتش (تقريبي) |
| [[last_autovacuum]] | آخر مرة الـ autovacuum نضّف الجدول ده لوحده |
| [[last_autoanalyze]] | آخر مرة حدّث إحصائياته لوحده |
| [[ORDER BY n_dead_tup DESC LIMIT 10]] | أكتر ١٠ جداول فيها صفوف ميتة |

~~~text الناتج
  relname  | n_dead_tup |        last_autovacuum        |       last_autoanalyze
-----------+------------+-------------------------------+-------------------------------
 users     |          5 |                               |
 sessions  |          0 | 2026-10-06 16:32:09.475744+00 | 2026-10-06 16:32:09.481029+00
 coupons   |          0 |                               |
 orders    |          0 |                               |
 ...
~~~

[[sessions]] كنت مسحت منه ١٨١ صف من ٣٠٠ (درس BEGIN)، فالـ autovacuum لاحظ ونضّفه لوحده، والوقت مكتوب. [[orders]] الخانة فاضية لأني نضّفته **بإيدي**: ده بيتسجل في عمود تاني اسمه [[last_vacuum]]:

~~~text SELECT relname, n_dead_tup, last_vacuum, last_analyze FROM pg_stat_user_tables WHERE relname='orders';
 relname | n_dead_tup |          last_vacuum          |         last_analyze
---------+------------+-------------------------------+-------------------------------
 orders  |          0 | 2026-10-06 16:32:43.312441+00 | 2026-10-06 16:32:43.513948+00
~~~

> الأعمدة دي بتتحدّث بتأخير ثانية تقريبًا، فلو سألت على طول بعد DELETE ممكن تلاقي الرقم لسه صفر.

---

## ٣. [[SHOW autovacuum;]]

~~~text الناتج
 autovacuum
------------
 on
~~~

**autovacuum** عملية في خلفية Postgres بتصحى كل دقيقة ([[autovacuum_naptime = 60]] ثانية)، وتشوف أي جدول عدد صفوفه الميتة عدّى حد معين وتنضّفه. الحد ده من إعدادين:

~~~text SELECT name, setting FROM pg_settings WHERE name IN (...)
              name              | setting
--------------------------------+---------
 autovacuum_naptime             | 60
 autovacuum_vacuum_scale_factor | 0.2
 autovacuum_vacuum_threshold    | 50
~~~

يعني الجدول بيتنضّف لما الميتين يعدّوا **50 + 20٪ من الجدول**. على جدول مليون صف ده ٢٠٠ ألف و٥٠ صف ميت. لازم تفضل [[on]]، والطبيعي إنك متلمسهوش.

---

## ٤. [[VACUUM (VERBOSE) big;]]: شوف عمل إيه

جدول [[big]] فيه مليون صف، ومسحت نصهم:

~~~text DELETE FROM big WHERE id % 2 = 0; وبعدها الإحصائيات والحجم
DELETE 500000
 relname | n_live_tup | n_dead_tup
---------+------------+------------
 big     |     500000 |     500000

 pg_size_pretty
----------------
 74 MB
~~~

نص مليون حي ونص مليون ميت، والحجم زي ما هو. دلوقتي الـ VACUUM بالتفاصيل. الخيارات بتتكتب بين قوسين، و [[VERBOSE]] يعني «احكيلي عملت إيه»:

~~~text الناتج (أهم السطور)
INFO:  vacuuming "lab.public.big"
INFO:  finished vacuuming "lab.public.big": index scans: 0
pages: 0 removed, 9408 remain, 9408 scanned (100.00% of total)
tuples: 500000 removed, 500000 remain, 0 are dead but not yet removable
...
system usage: CPU: user: 0.13 s, system: 0.00 s, elapsed: 0.14 s
INFO:  vacuuming "lab.pg_toast.pg_toast_24609"
...
VACUUM
~~~

| السطر | معناه |
|---|---|
| [[pages: 0 removed, 9408 remain]] | الجدول ٩٤٠٨ صفحة (كل صفحة 8 kB)، ومتشالتش ولا صفحة من الملف |
| [[9408 scanned (100.00% of total)]] | قرا الجدول كله |
| [[tuples: 500000 removed]] | نضّف النص مليون صف الميتين |
| [[500000 remain]] | الحيين |
| [[0 are dead but not yet removable]] | ميتين بس فيه transaction مفتوحة لسه ممكن تشوفهم، فمينفعش يتشالوا. لو الرقم ده كبير دوّر على [[idle in transaction]] |
| [[elapsed: 0.14 s]] | الوقت كله |
| [[pg_toast...]] | الجدول الجانبي بتاع القيم الكبيرة (TOAST)، بيتنضّف معاه |

### الحجم بعدها؟

~~~text SELECT pg_size_pretty(pg_total_relation_size('big'));  بعد VACUUM ثم بعد VACUUM FULL
 74 MB
 37 MB
~~~

بعد [[VACUUM]] العادي الحجم **فضل 74 MB**: المكان بقى فاضي جوه الجدول، والصفوف الجاية هتتكتب فيه، بس الملف على الديسك ما صغرش. [[VACUUM FULL big;]] بيكتب الجدول من الأول في ملف جديد فنزل لـ 37 MB، بس طول ما هو شغال الجدول **مقفول تمامًا** (لا قراية ولا كتابة). عشان كده مش بتشغّله على الإنتاج غير في وقت صيانة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[VACUUM t;]] | يخلي مكان الصفوف الميتة يتعاد استخدامه (الملف مش بيصغر) |
| [[ANALYZE t;]] | يحدّث الإحصائيات للـ planner |
| [[VACUUM ANALYZE t;]] | الاتنين، وده اللي تعمله بعد حذف أو استيراد ضخم |
| [[VACUUM (VERBOSE) t;]] | نفسه وبيحكي اتشال كام صف |
| [[VACUUM FULL t;]] | يصغّر الملف، بس بيقفل الجدول |
| [[n_dead_tup]] و [[last_autovacuum]] | في [[pg_stat_user_tables]]: مين محتاج ومين اتنضّف إمتى |
| [[SHOW autovacuum;]] | لازم [[on]] |`,
          lines: [
            "نضّف الجدول وحدّث إحصائياته.",
            "الجداول اللي فيها أكتر صفوف ميتة، وآخر مرة اتنضّفت.",
            "autovacuum شغال؟ (لازم on).",
            "نضّف بتفاصيل."
          ],
          sol: R`بعد [[DELETE FROM big WHERE id % 2 = 0]] على مليون صف، [[pg_stat_user_tables]] طلّع [[n_live_tup = 500000]] و [[n_dead_tup = 500000]]. بعد [[VACUUM big;]] بقى [[n_dead_tup = 0]].

بس الحجم فضل [[74 MB]] قبل وبعد (و [[VACUUM FULL big;]] نزّله لـ [[37 MB]]). ودي النقطة المهمة: VACUUM العادي بيعلّم المساحة إنها فاضية لإعادة الاستخدام جوه الجدول، مش بيرجّعها للديسك. [[VACUUM FULL]] بيرجّعها بس بيقفل الجدول كله وهو شغال.

لو [[n_dead_tup]] لسه بصفر بعد الـ DELETE على طول: الإحصائيات بتتحدّث بتأخير بسيط، استنى ثانية. ولو لقيتها صفر من غير ما تعمل VACUUM يبقى الـ autovacuum سبقك، وهتلاقي [[last_autovacuum]] فيه وقت.`,
          solCode: R`DELETE FROM big WHERE id % 2 = 0;
SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables WHERE relname = 'big';
SELECT pg_size_pretty(pg_total_relation_size('big'));
VACUUM big;
SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables WHERE relname = 'big';
SELECT pg_size_pretty(pg_total_relation_size('big'));`
        },
        {
          cmd: "الإعدادات",
          title: "SHOW و ALTER SYSTEM",
          desc: "إعدادات Postgres في [[postgresql.conf]]، بس ممكن تغيّرها من SQL بـ [[ALTER SYSTEM]] وتطبّقها بـ [[pg_reload_conf]] من غير ريستارت (لأغلبها). أهم إعدادين: [[shared_buffers]] (الكاش) و [[work_mem]] (لكل استعلام).",
          example: R`SHOW shared_buffers;
SHOW work_mem;
SELECT name, setting, unit, context FROM pg_settings WHERE name IN ('shared_buffers','work_mem','max_connections','effective_cache_size');
ALTER SYSTEM SET work_mem = '32MB';
SELECT pg_reload_conf();
SHOW config_file;`,
          try: "شوف shared_buffers الحالي. الافتراضي 128MB صغير: على سيرفر ٤ جيجا خليه 1GB (محتاج ريستارت).",
          deep: {
            why: "Postgres بييجي بإعدادات لجهاز صغير من ٢٠ سنة. [[shared_buffers]] 128MB على سيرفر ٨ جيجا معناه معظم الرام مش بتتستخدم.",
            how: R`[[SHOW]] بيعرض قيمة إعداد. [[pg_settings]] جدول فيه كل الإعدادات مع [[context]]: [[postmaster]] محتاج ريستارت، [[sighup]] reload كفاية، [[user]] ممكن يتغير في الجلسة.

[[ALTER SYSTEM SET]] بيكتب في ملف [[postgresql.auto.conf]] اللي بيتقري بعد postgresql.conf ويغطي عليه، فمش محتاج تعدّل الملف الأصلي. وبعده [[pg_reload_conf()]] للإعدادات اللي sighup، أو [[systemctl restart postgresql]] للباقي.

القيم اللي تبدأ بيها على سيرفر مخصص للقاعدة: [[shared_buffers]] ربع الرام. [[effective_cache_size]] تلات أرباع الرام (تقدير لكاش النظام، مش حجز). [[work_mem]] للترتيب والـ hash في كل استعلام، 16 لـ 64MB حسب عدد الاتصالات (بيتضرب في عدد العمليات المتزامنة). [[maintenance_work_mem]] لـ VACUUM و CREATE INDEX، 256MB وأكتر.

موقع pgtune.leopard.in.ua بيحسبلك القيم من مواصفات السيرفر.`,
            when: "بعد التسطيب على أي سيرفر. وبعد ترقية الرام.",
            mistakes: "work_mem كبير جدًا (1GB) مع 100 اتصال: كل استعلام ممكن ياخد جيجا والسيرفر يخلص رام."
          },
          teach: R`## الفكرة: تقرا الإعداد، تغيّره، وتعرف إمتى يشتغل

Postgres فيه مئات الإعدادات (اسمها **parameters**): قد إيه رام للكاش، كام اتصال، إلخ. مكانها الأصلي ملف [[postgresql.conf]]، بس مش لازم تفتحه: من SQL تقدر **تقرا** أي إعداد بـ [[SHOW]]، و**تغيّره** بـ [[ALTER SYSTEM]]، و**تطبّقه** بـ [[pg_reload_conf()]]. والسؤال المهم في الدرس: التغيير ده بيشتغل إمتى؟ فورًا، ولا بعد ريستارت؟

الناتج تحت من [[postgres:16]] جوه Docker (إعدادات الصورة الرسمية الافتراضية).

---

## ١. [[SHOW]]: القيمة دلوقتي

~~~text SHOW shared_buffers; و SHOW work_mem;
 shared_buffers
----------------
 128MB

 work_mem
----------
 4MB
~~~

| الإعداد | معناه |
|---|---|
| [[shared_buffers]] | الكاش بتاع Postgres في الرام: صفحات الجداول اللي اتقرت بتفضل فيه، فالقراية الجاية من الذاكرة مش الديسك. مساحة واحدة متشاركة بين كل الاتصالات |
| [[work_mem]] | الذاكرة اللي **عملية واحدة** جوه استعلام (ترتيب [[ORDER BY]] أو hash join) تاخدها قبل ما تنزل تكمّل على الديسك |

[[128MB]] كاش على سيرفر فيه ٨ جيجا يعني أغلب الرام مش مستخدمة. والافتراضيات دي معمولة عشان Postgres يقوم على أي جهاز، مش عشان يبقى سريع.

---

## ٢. [[pg_settings]]: التفاصيل

~~~text SQL
SELECT name, setting, unit, context FROM pg_settings
WHERE name IN ('shared_buffers','work_mem','max_connections','effective_cache_size');
~~~

[[pg_settings]] view فيه صف لكل إعداد، و [[IN (...)]] يعني «الاسم واحد من دول».

~~~text الناتج
         name         | setting | unit |  context
----------------------+---------+------+------------
 effective_cache_size | 524288  | 8kB  | user
 max_connections      | 100     |      | postmaster
 shared_buffers       | 16384   | 8kB  | postmaster
 work_mem             | 4096    | kB   | user
~~~

### [[setting]] و [[unit]]

هنا القيمة **رقم خام** والوحدة في عمود لوحدها. [[shared_buffers]] قيمته [[16384]] ووحدته [[8kB]] (حجم صفحة Postgres)، يعني 16384 × 8 kB = 131072 kB = 128 MB، نفس اللي SHOW قاله. و [[work_mem]] 4096 kB = 4 MB. و [[effective_cache_size]] 524288 × 8 kB = 4 GB.

### [[context]]: أهم عمود

بيقولك التغيير محتاج إيه عشان يشتغل:

| [[context]] | معناه | أمثلة |
|---|---|---|
| [[postmaster]] | ريستارت كامل للسيرفر | [[shared_buffers]] و [[max_connections]] و [[listen_addresses]] |
| [[sighup]] | reload كفاية (من غير ما حد يتفصل) | إعدادات اللوج والـ autovacuum |
| [[user]] | reload، أو أي جلسة تغيّره لنفسها بـ [[SET]] | [[work_mem]] و [[effective_cache_size]] |

([[postmaster]] اسم العملية الأم لـ Postgres، و [[sighup]] اسم الإشارة اللي بتقولها «اقري الإعدادات تاني».)

---

## ٣. [[ALTER SYSTEM SET work_mem = '32MB';]]

~~~text الناتج
ALTER SYSTEM
~~~

الأمر ده **مش** بيغيّر القيمة الشغالة. هو بيكتب السطر في ملف اسمه [[postgresql.auto.conf]] جنب الداتا. Postgres بيقرا [[postgresql.conf]] الأول وبعدين الملف ده، فاللي فيه بيكسب. بصيت عليه بعد التجربة:

~~~text cat /var/lib/postgresql/data/postgresql.auto.conf
# Do not edit this file manually!
# It will be overwritten by the ALTER SYSTEM command.
work_mem = '32MB'
shared_buffers = '256MB'
~~~

(السطر التاني من الجزء ٦ تحت.) وأول سطرين بيقولولك متعدّلوش بإيدك.

---

## ٤. [[SELECT pg_reload_conf();]]

~~~text الناتج
 pg_reload_conf
----------------
 t
~~~

[[t]] يعني الإشارة اتبعتت للسيرفر «اقرا ملفات الإعدادات تاني». جربت [[SHOW work_mem;]] **في نفس اللحظة ونفس الجلسة** فلقيته لسه [[4MB]]: الـ reload بياخد لحظة. وبعد ثانية (الاستعلام ده شغّلته بعد ما غيّرت [[shared_buffers]] كمان في الجزء ٦، عشان كده ظاهر فيه):

~~~text SELECT name, setting, pending_restart FROM pg_settings WHERE name IN ('shared_buffers','work_mem');
      name      | setting | pending_restart
----------------+---------+-----------------
 shared_buffers | 16384   | t
 work_mem       | 32768   | f
~~~

[[work_mem]] بقى 32768 kB = 32 MB، واشتغل من غير ريستارت لأن الـ context بتاعه [[user]]. و [[SHOW work_mem;]] من جلسة جديدة رجّع [[32MB]].

---

## ٥. [[SHOW config_file;]]: الملف فين؟

~~~text الناتج
               config_file
------------------------------------------
 /var/lib/postgresql/data/postgresql.conf
~~~

في Docker الملف جوه فولدر الداتا. على أوبونتو بتسطيب [[apt]] بيبقى في [[/etc/postgresql/16/main/postgresql.conf]]. عشان كده تسأل بدل ما تخمّن. و [[postgresql.auto.conf]] دايمًا في فولدر الداتا ([[SHOW data_directory;]]).

---

## ٦. الفخ: إعداد [[postmaster]]

~~~text SQL
ALTER SYSTEM SET shared_buffers = '256MB';
SELECT pg_reload_conf();
SHOW shared_buffers;
~~~

~~~text الناتج
 shared_buffers
----------------
 128MB
~~~

لسه 128MB! مش لأن الأمر فشل، لأن [[shared_buffers]] الـ context بتاعه [[postmaster]]: الكاش بيتحجز مرة واحدة لما السيرفر يقوم. وفي الجزء ٤ [[pending_restart]] بتاعه كان [[t]]، يعني «اتغيّر في الملف ومستني ريستارت». بعد [[docker restart]] للـ container:

~~~text SHOW shared_buffers; بعد الريستارت
 shared_buffers
----------------
 256MB
~~~

على سيرفر لينكس عادي الريستارت هو [[sudo systemctl restart postgresql]]، وده بيفصل كل الاتصالات لحظة، فخليه في وقت هادي.

### ولو عايز ترجّع الافتراضي

[[ALTER SYSTEM RESET work_mem;]] بيشيل السطر من [[postgresql.auto.conf]]، و [[ALTER SYSTEM RESET ALL;]] بيفضّيه كله (وبعدها reload أو ريستارت حسب الإعداد). ولجلسة واحدة بس: [[SET work_mem = '64MB';]] بيغيّره ليك انت لحد ما تخرج، من غير ما يلمس حد تاني.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| القيمة الحالية | [[SHOW name;]] |
| الوحدة ومحتاج إيه عشان يتغير | [[SELECT name, setting, unit, context FROM pg_settings WHERE ...]] |
| تغيّر للسيرفر كله | [[ALTER SYSTEM SET name = 'value';]] (بيكتب في [[postgresql.auto.conf]]) |
| تطبّق [[user]] / [[sighup]] | [[SELECT pg_reload_conf();]] |
| تطبّق [[postmaster]] | ريستارت ([[pending_restart = t]] بيفكّرك) |
| لجلستك بس | [[SET name = 'value';]] |
| فين الملف | [[SHOW config_file;]] |`,
          lines: [
            "الكاش.",
            "ذاكرة كل استعلام.",
            "أهم ٤ إعدادات مع وحدتها وهل محتاجة ريستارت (context).",
            "غيّر إعداد (بيتكتب في postgresql.auto.conf).",
            "طبّق من غير ريستارت.",
            "فين ملف الإعدادات."
          ],
          sol: R`[[SHOW shared_buffers;]] على تثبيت جديد بيرجّع [[128MB]]. و في [[pg_settings]] هتلاقيه [[setting = 16384]] و [[unit = 8kB]] (يعني 16384 × 8kB = 128MB) و [[context = postmaster]]، ودي معناها إنه محتاج ريستارت.

بعد [[ALTER SYSTEM SET shared_buffers = '1GB';]] و [[SELECT pg_reload_conf();]]، الـ SHOW لسه هيقول [[128MB]]، ودا الغلط الشائع: تفتكر الإعداد ما اتحفظش. [[SELECT pending_restart FROM pg_settings WHERE name = 'shared_buffers';]] هيقولك [[t]]. بعد [[sudo systemctl restart postgresql]] (أو ريستارت الـ container) هيبقى [[1GB]].

على العكس، [[work_mem]] الـ context بتاعه [[user]] فيتطبق بعد reload. و ALTER SYSTEM بيكتب في [[postgresql.auto.conf]] جوه مجلد الداتا، مش في postgresql.conf.`
        },
        {
          cmd: "docker-entrypoint-initdb.d",
          title: "SQL بيتنفّذ أول مرة بس في Docker",
          desc: R`صورة postgres الرسمية بتنفّذ أي ملف [[.sql]] أو [[.sh]] في [[/docker-entrypoint-initdb.d]] بالترتيب الأبجدي، بس أول مرة الـ volume يتعمل وهو فاضي. بعد كده الفولدر بيتجاهل تمامًا.

وبنفس الطريقة [[POSTGRES_INITDB_ARGS]] بيوصل لـ initdb أول مرة بس.`,
          example: R`services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: $__{POSTGRES_PASSWORD}
      POSTGRES_DB: appdb
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
volumes:
  pg_data:`,
          try: "حط ملف [[01-schema.sql]] في db/init، وشغّل compose وشوف الجدول. بعدين ضيف [[02-more.sql]] واعمل [[docker compose up -d]]: مش هيتنفّذ. [[docker compose down -v]] (على التجربة بس) وارفع تاني: هيتنفّذ.",
          flag: "script",
          deep: {
            why: "عايز أي حد يعمل clone ويرفع compose يلاقي القاعدة فيها الـ schema والبيانات الأولية من غير خطوات بإيده.",
            how: R`الـ entrypoint بتاع الصورة بيبص على فولدر البيانات: لو فاضي، بيشغّل [[initdb]] (ومعاه [[POSTGRES_INITDB_ARGS]])، ويعمل اليوزر والقاعدة من المتغيرات، ويشغّل ملفات initdb.d بالترتيب بـ psql (بـ ON_ERROR_STOP)، وبعدين يشغّل Postgres عادي. لو فيه بيانات، بيعدّي كل ده.

عشان كده الترقيم [[01-]] و [[02-]] مهم، وأي error في ملف بيوقف الـ container أول مرة (شوف [[docker compose logs postgres]]).

[[--auth-host=scram-sha-256]]: الاتصالات بالشبكة تتطلب باسورد بـ scram بدل md5. و [[:ro]] الـ container يقرا الملفات بس.

الـ healthcheck بـ [[pg_isready]] بيرجع ناجح لما Postgres يقبل اتصالات، فالتطبيق يستنى بـ [[condition: service_healthy]]. وخلي بالك: أول مرة Postgres بيقوم مؤقت وقت تنفيذ ملفات init وبعدين يعيد التشغيل، فالـ healthcheck ممكن ينجح لحظة قبل الأوان؛ التطبيق لازم يعيد المحاولة على أي حال.`,
            when: "بيئة تطوير أو staging بتتعمل من الصفر. للإنتاج اللي شغال: migrations حقيقية (الدرس الجاي في المستوى ٣).",
            mistakes: "في مشروع حقيقي فولدر الـ migrations نفسه كان متركّب على initdb.d، والكل فاكر إن أي migration جديدة هتتطبق مع الديبلوي. هي اتطبقت أول مرة بس، وأي ملف بعد كده محتاج تشغيل بإيدك أو سكربت migrate. وتغيّر [[POSTGRES_PASSWORD]] أو [[POSTGRES_INITDB_ARGS]] وتستنى يأثروا على volume موجود: مش هيحصل."
          },
          teach: R`## الفكرة: «أول مرة بس»

صورة [[postgres]] الرسمية فيها سكربت بيشتغل أول ما الـ container يقوم (اسمه **entrypoint**). السكربت ده بيبص على فولدر الداتا: لو **فاضي**، يعمل قاعدة جديدة من الصفر، ويشغّل أي ملف [[.sql]] أو [[.sh]] يلاقيه في [[/docker-entrypoint-initdb.d]] بالترتيب الأبجدي. لو الفولدر **فيه** داتا، يعدّي ده كله ويشغّل Postgres على طول. فالملفات دي وسيلة تجهّز القاعدة أول مرة (جداول وبيانات أولية)، مش طريقة تطبّق تعديلات بعد كده.

جربت ملف الـ compose ده بالظبط على ويندوز بـ Docker Desktop (اسم المشروع [[pg01init]]، والباسورد من ملف [[.env]] فيه [[POSTGRES_PASSWORD=devpass]])، والناتج تحت حقيقي.

---

## ١. الملف سطر سطر

~~~text compose.yml
services:
  postgres:
    image: postgres:16
~~~

[[services:]] قايمة الـ containers، و [[postgres:]] اسم الخدمة (ده اللي بتكتبه في [[docker compose exec postgres ...]]). و [[image: postgres:16]] الصورة: النسخة 16 بالظبط، مش [[latest]]، عشان متتفاجئش بنسخة جديدة الداتا القديمة مش متوافقة معاها.

~~~text environment
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: $__{POSTGRES_PASSWORD}
      POSTGRES_DB: appdb
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
~~~

| المتغير | بيعمل إيه (أول مرة بس) |
|---|---|
| [[POSTGRES_USER: app]] | يعمل superuser اسمه [[app]] بدل [[postgres]] |
| [[POSTGRES_PASSWORD]] | باسورده. و [[$__{POSTGRES_PASSWORD}]] معناها «خد القيمة من ملف [[.env]] أو من البيئة»، فالباسورد مش مكتوب في الملف اللي بيترفع على git |
| [[POSTGRES_DB: appdb]] | يعمل قاعدة اسمها [[appdb]] |
| [[POSTGRES_INITDB_ARGS]] | خيارات زيادة لبرنامج [[initdb]] (اللي بيعمل فولدر الداتا من الصفر) |

[[--auth-host=scram-sha-256]] بيحط طريقة [[scram-sha-256]] لكل اتصالات الشبكة ([[host]]) في [[pg_hba.conf]]. اتأكدت من الملف جوه الـ container:

~~~text آخر سطرين من pg_hba.conf
host    replication     all             ::1/128                 scram-sha-256
host all all all scram-sha-256
~~~

حتى سطور localhost بقت بباسورد (من غيره كانت [[trust]] زي ما شفنا في درس psql).

~~~text volumes و healthcheck
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
volumes:
  pg_data:
~~~

| السطر | معناه |
|---|---|
| [[pg_data:/var/lib/postgresql/data]] | volume اسمه [[pg_data]] مكان الداتا، فتفضل لو الـ container اتمسح |
| [[./db/init:/docker-entrypoint-initdb.d]] | فولدر [[db/init]] اللي جنب الملف يظهر جوه بالاسم ده |
| [[:ro]] | read-only: الـ container يقرا الملفات بس ومايعدّلش فيها |
| [[test]] بـ [[CMD-SHELL]] | كل شوية شغّل [[pg_isready]] جوه الـ container (exit [[0]] = صاحي) |
| [[interval: 5s]] | كل ٥ ثواني |
| [[volumes: pg_data:]] في الآخر | تعريف الـ volume عشان compose يعمله |

---

## ٢. أول تشغيل: الفولدر فاضي

في [[db/init/01-schema.sql]] جدول وصفين:

~~~text db/init/01-schema.sql
CREATE TABLE customers (id serial PRIMARY KEY, name text NOT NULL);
INSERT INTO customers (name) VALUES ('Sara'), ('Omar');
~~~

~~~bash
docker compose up -d
docker compose ps
docker compose logs postgres
~~~

~~~text ps
pg01init-postgres-1 Up 8 seconds (healthy)
~~~

[[(healthy)]] جاية من الـ healthcheck. واللوج (السطور المهمة):

~~~text logs
CREATE DATABASE
/usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/01-schema.sql
CREATE TABLE
INSERT 0 2
PostgreSQL init process complete; ready for start up.
LOG:  database system is ready to accept connections
~~~

بالترتيب: عمل [[appdb]]، شغّل الملف (ومعاه رد كل أمر)، وقال إن التجهيز خلص، وبعدين قام بشكل عادي. و [[\dt]] جوه [[appdb]]:

~~~text docker compose exec -T postgres psql -U app -d appdb -c '\dt'
 Schema |   Name    | Type  | Owner
--------+-----------+-------+-------
 public | customers | table | app
~~~

صاحب الجدول [[app]]، لأن الملفات بتتنفذ باليوزر اللي في [[POSTGRES_USER]].

---

## ٣. ضيف ملف تاني: مش هيتنفّذ

حطيت [[db/init/02-more.sql]] فيه [[CREATE TABLE notes ...]] وعملت [[docker compose up -d]]: compose قال [[Running]] (مفيش حاجة اتغيرت في الـ container)، و [[\dt]] لسه فيه [[customers]] بس. وبعد [[docker compose restart]] اللوج قال:

~~~text logs
PostgreSQL Database directory appears to contain a database; Skipping initialization
~~~

يعني «الفولدر فيه داتا، مش هعمل حاجة». الملف الجديد متجاهل، وهيفضل متجاهل.

---

## ٤. ابدأ من الصفر: [[down -v]]

~~~bash
docker compose down -v
docker compose up -d
~~~

[[-v]] بيمسح الـ volumes كمان، يعني **كل الداتا راحت**. (على التجربة بس، عمره ما يتعمل على قاعدة فيها داتا حقيقية.) والمرة دي:

~~~text logs
running /docker-entrypoint-initdb.d/01-schema.sql
running /docker-entrypoint-initdb.d/02-more.sql
~~~

~~~text \dt
 public | customers | table | app
 public | notes     | table | app
~~~

الاتنين بالترتيب الأبجدي، عشان كده الأرقام [[01-]] و [[02-]] في أول الاسم.

---

## ٥. ملف فيه error

ضفت [[03-bad.sql]] فيه [[INSERT INTO nope VALUES (1);]] (جدول مش موجود)، و [[down -v]] و [[up -d]]:

~~~text ps و logs
pg01init-postgres-1 Exited (3) 5 seconds ago
running /docker-entrypoint-initdb.d/03-bad.sql
psql:/docker-entrypoint-initdb.d/03-bad.sql:1: ERROR:  relation "nope" does not exist
~~~

الـ container **وقع** ([[Exited (3)]])، لأن الـ entrypoint بيشغّل الملفات بـ [[ON_ERROR_STOP]] (درس «تشغيل SQL من ملف»). صلّح الملف، وامسح الـ volume تاني، لأن التجهيز وقف في النص وساب داتا ناقصة.

---

## الخلاصة

| الحالة | اللي بيحصل |
|---|---|
| volume فاضي | initdb + اليوزر والقاعدة من المتغيرات + ملفات initdb.d بالترتيب |
| volume فيه داتا | [[Skipping initialization]]: ولا حاجة من دول |
| ملف جديد في initdb.d بعد كده | متجاهل. محتاج migration أو تشغيل بإيدك |
| ملف فيه error أول مرة | الـ container بيقع، صلّح وامسح الـ volume |
| تغيير [[POSTGRES_PASSWORD]] بعد كده | ملوش أثر: غيّر الباسورد بـ [[ALTER ROLE]] |`,
          lines: [
            "الخدمات.",
            "خدمة Postgres.",
            "نسخة محددة.",
            "المتغيرات:",
            "اليوزر.",
            "الباسورد من .env.",
            "القاعدة اللي تتعمل أول مرة.",
            "خيارات لـ initdb: باسوردات الشبكة بـ scram (أول مرة بس).",
            "التخزين:",
            "البيانات في volume.",
            "ملفات SQL تتنفّذ أول مرة بس، و ro للقراية.",
            "فحص الصحة:",
            "Postgres بيقبل اتصالات؟",
            "كل ٥ ثواني.",
            "تعريف الـ volumes.",
            "volume البيانات."
          ],
          sol: R`أول [[docker compose up -d]] بفولدر فيه [[01-schema.sql]]: في [[docker compose logs postgres]] هتلاقي [[running /docker-entrypoint-initdb.d/01-schema.sql]]، و [[\dt]] بيطلّع جدولك.

بعد ما تضيف [[02-more.sql]] و [[docker compose up -d]]: الجدول الجديد مش موجود. ولو عملت restart هتلاقي في اللوج [[PostgreSQL Database directory appears to contain a database; Skipping initialization]]. السكربتات بتشتغل مرة واحدة بس لما الـ volume يكون فاضي.

بعد [[docker compose down -v]] و [[up]] تاني: الاتنين اتنفذوا بالترتيب و [[\dt]] فيه الجدولين، بس كل الداتا القديمة راحت. لو السكربت نفسه فيه error الـ container بيقع في الـ init؛ صلّح الملف وامسح الـ volume تاني، لأن init نص مخلص ممكن يسيب الـ volume مش فاضي. ولو الملف مش بيتقري خالص اتأكد إن امتداده [[.sql]] أو [[.sh]] أو [[.sql.gz]] وإنه readable.`
        }
      ]
    }
  ]
});
