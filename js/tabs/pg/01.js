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
    }
  ]
});
