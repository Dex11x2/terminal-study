// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Prisma في مشروع Node",
      l: 3,
      n: "الكلاينت المتولّد، والـ migrations وقت التشغيل، وليه db push مكانه جهازك بس (تفاصيل migrate في تاب PostgreSQL)",
      items: [
        {
          cmd: "prisma generate",
          title: "الكلاينت اللي بيتولّد من الـ schema",
          desc: R`الكود اللي بتكتب بيه [[prisma.user.findMany()]] مش مكتوب في المكتبة، ده بيتولّد من [[schema.prisma]] بأمر [[prisma generate]]. عدّلت الـ schema أو سطّبت من الأول؟ generate تاني، وإلا الكود بيشتغل بأنواع قديمة أو بيقع بـ [[did not initialize yet]].

وgenerate مش محتاج يتصل بالقاعدة، فمفيش داعي تدّي الـ build أي سر.`,
          example: R`npx prisma validate
npx prisma format
npx prisma generate
pnpm exec prisma generate
npm pkg set scripts.postinstall="prisma generate"`,
          try: "ضيف حقل جديد في model في schema.prisma، وجرّب تستخدمه في الكود قبل generate وشوف خطأ الأنواع، وبعدين generate وشوفه اختفى.",
          deep: {
            why: "Prisma بيديك أنواع مظبوطة لكل جدول وعمود، والتمن إن الكود ده لازم يتولّد. أغلب أخطاء Prisma الغريبة بعد pull أو في Docker سببها generate متعملش، أو اتعمل على schema قديمة.",
            how: R`[[validate]] بيتأكد إن الـ schema سليمة، و [[format]] بينسّقها. [[generate]] بيقرا الـ schema ويكتب كود الكلاينت: في Prisma 7 بالـ generator الجديد [[prisma-client]] بيتكتب في فولدر انت محدده بـ [[output]] (زي src/generated/prisma) وبتستورد منه، وفي النسخ القديمة كان بيتكتب جوه [[node_modules/.prisma/client]].

إمتى تشغّله: بعد أي تعديل في الـ schema، وبعد تسطيب من الصفر (CI و Docker)، وقبل [[next build]] أو [[tsc]]. ومن Prisma 7 [[migrate dev]] مبقاش بيعمله لوحده.

[[postinstall]] بيخليه يتعمل بعد كل install لوحده، ودي أسهل طريقة تضمن إن محدش ينساه. في Dockerfile: [[RUN npx prisma generate && npm run build]] في مرحلة الـ build.

مع pnpm 10: لو Prisma محتاج سكربت تسطيب ومش متوافق عليه في approve-builds، الـ generate أو الـ engines ممكن يبقوا ناقصين.`,
            when: "بعد كل تعديل في schema.prisma، وفي كل build نضيف.",
            mistakes: R`في مشروع حقيقي كان الـ Dockerfile فيه [[ARG DATABASE_URL]] و [[ENV DATABASE_URL]] عشان generate يشتغل، والسر اتحفظ في طبقات الـ image. generate مش محتاج اتصال: شيلهم، ولو prisma.config.ts بيطلب المتغير حط قيمة وهمية في الـ build بس، والحقيقي وقت التشغيل. وغلطة تانية: الفولدر المتولّد داخل Git، فكل واحد في الفريق عنده نسخة مختلفة شوية.`
          },
          teach: R`## الأوامر دي بتعمل إيه

Prisma بيقرا ملف [[schema.prisma]] (وصف الجداول بلغة Prisma)، ومنه بيكتب كود JavaScript و TypeScript جاهز تكلّم بيه القاعدة. الـ ٥ سطور: افحص الـ schema، ونسّقها، وولّد الكود، ونفس التوليد في pnpm، وخليه يتعمل لوحده بعد كل install. جربناهم كلهم بـ Prisma 7.10.0 جوه [[node:22-slim]].

> خلي بالك: [[npm install prisma]] النهارده بيجيب نسخة 8 (لسه rc لكنها متعلّمة [[latest]]). احنا سطّبنا [[prisma@7]] و [[@prisma/client@7]] عشان الدرس على 7.

الـ schema اللي اشتغلنا عليها:

~~~text prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  role  String @default("USER")
}
~~~

- [[generator client]]: «ولّد كود». [[provider = "prisma-client"]] المولّد الجديد في Prisma 7، و [[output]] الفولدر اللي هيتكتب فيه (نسبةً لملف الـ schema، فـ [[../generated/prisma]] يبقى في جذر المشروع).
- [[datasource db]]: نوع القاعدة. الرابط نفسه في Prisma 7 بقى في [[prisma.config.ts]] مش هنا.
- [[model User]]: جدول. [[@id]] المفتاح، و [[@default(autoincrement())]] رقم بيزيد لوحده، و [[@unique]] ممنوع التكرار.

---

## ١. [[npx prisma validate]]

بيقرا الـ schema ويقول سليمة ولا لأ، من غير ما يكلّم القاعدة.

~~~text الناتج
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma/schema.prisma.
The schema at prisma/schema.prisma is valid 🚀
~~~

ضفنا model فيه غلطة إملائية ([[x Strin]] بدل [[String]]):

~~~text الناتج
Error code: P1012
error: Type "Strin" is neither a built-in type, nor refers to another model, composite type, or enum.
  -->  prisma/schema.prisma:23
   |
22 |   id Int @id
23 |   x Strin
~~~

بيقولك السطر بالظبط (23)، والـ exit code 1، فيوقف CI.

---

## ٢. [[npx prisma format]]

بينسّق الملف: يرصّ الأعمدة تحت بعض ويصلّح المسافات. كتبنا model مبعتر:

~~~text قبل
model   Post {
id Int @id @default(autoincrement())
  title     String
}
~~~

~~~text بعد prisma format
model Post {
  id    Int    @id @default(autoincrement())
  title String
}
~~~

~~~text الناتج
Formatted prisma/schema.prisma in 11ms 🚀
~~~

---

## ٣. [[npx prisma generate]]

~~~text الناتج
✔ Generated Prisma Client (7.10.0) to ./generated/prisma in 28ms
~~~

وفي الفولدر:

~~~text generated/prisma
browser.ts
client.ts
commonInputTypes.ts
enums.ts
internal
models
models.ts
~~~

ده الكود اللي بتعمل منه [[import { PrismaClient } from "./generated/prisma/client.ts"]]. يعني [[prisma.user.findMany()]] مش مكتوبة في المكتبة، اتكتبت هنا من الـ model بتاعك.

### التجربة: ضيف عمود وانسى generate

كتبنا كود بيقرا [[u?.phone]]، وضفنا [[phone String?]] في الـ schema ([[?]] = ممكن يبقى فاضي)، وشغّلنا [[tsc --noEmit]] (فحص TypeScript من غير ما يطلّع ملفات):

~~~text الناتج قبل generate
a.ts(4,16): error TS2339: Property 'phone' does not exist on type '{ id: number; email: string; name: string; role: string; }'.
~~~

الـ schema فيها [[phone]]، بس الكود المتولّد لسه قديم ومفيهوش. بعد [[npx prisma generate]]: [[tsc]] خرج بـ 0 من غير أخطاء.

### محتاج القاعدة؟ لأ

شلنا ملف [[.env]] خالص (مفيش [[DATABASE_URL]]) وشغّلنا generate:

~~~text الناتج
✔ Generated Prisma Client (7.10.0) to ./generated/prisma in 46ms
~~~

اشتغل عادي، لأن generate بيقرا الـ schema بس. يعني متدّيش الـ Docker build أي سر عشانه.

---

## ٤. [[pnpm exec prisma generate]]

نفس الأمر في مشروع pnpm. [[pnpm exec]] زي [[npx]]: شغّل البرنامج من [[node_modules/.bin]] بتاع المشروع. جربناها بـ corepack وطلع نفس سطر [[✔ Generated Prisma Client]].

---

## ٥. [[npm pkg set scripts.postinstall="prisma generate"]]

- [[npm pkg set]]: عدّل [[package.json]] من الترمنال.
- [[scripts.postinstall]]: script اسمه [[postinstall]]، و npm بيشغّله لوحده **بعد** كل [[npm install]] أو [[npm ci]].

~~~text الناتج من npm pkg get scripts
{
  "test": "echo \"Error: no test specified\" && exit 1",
  "postinstall": "prisma generate"
}
~~~

مسحنا [[generated]] خالص وعملنا [[npm install]]:

~~~text الناتج
> pr@1.0.0 postinstall
✔ Generated Prisma Client (7.10.0) to ./generated/prisma in 28ms
~~~

رجع لوحده. والسطر ده بنفس الشكل اشتغل في PowerShell 7 و 5.1 وكتب نفس القيمة في package.json.

---

## الخلاصة

| الأمر | بيعمل إيه | محتاج القاعدة؟ |
|---|---|---|
| [[prisma validate]] | يفحص الـ schema | لأ |
| [[prisma format]] | ينسّقها | لأ |
| [[prisma generate]] | يكتب كود الكلاينت في [[output]] | لأ |
| [[pnpm exec prisma generate]] | نفسه في pnpm | لأ |
| [[postinstall]] | generate بعد كل install | لأ |

- عدّلت الـ schema أو عملت [[git pull]] فيه تعديل فيها؟ generate.
- generate بيحدّث الكود بس، مش القاعدة. القاعدة محتاجة migration (الدروس الجاية).`,
          lines: [
            "اتأكد إن الـ schema سليمة.",
            "نسّقها.",
            "ولّد الكلاينت من الـ schema.",
            "نفس الحاجة في مشروع pnpm.",
            "خليه يتولّد لوحده بعد كل install."
          ],
          sol: R`لو ضفت [[phone String?]] في [[model User]] وكتبت [[user.phone]] في الكود قبل generate، الـ editor و [[tsc --noEmit]] بيقولوا [[error TS2339: Property 'phone' does not exist on type '{ name: string; id: number; email: string; role: string; }'.]]، ولو استخدمته في [[create]] أو [[where]]: [[Object literal may only specify known properties, and 'phone' does not exist in type ...]].

بعد [[npx prisma generate]] (بيطبع [[✔ Generated Prisma Client (7.10.0) to ./generated/prisma]] أو المسار عندك) الخطأ بيختفي، لأن الأنواع اتولّدت من الـ schema الجديدة. أحيانًا VS Code محتاج [[TypeScript: Restart TS Server]] عشان ياخد باله.

خلي بالك إن generate بيحدّث الكود بس، مش القاعدة: لو شغّلت الكود هتاخد error إن العمود مش موجود لحد ما تعمل migration. والغلط الشائع إنك تنسى generate بعد [[git pull]] فيه تغيير في الـ schema، ودا اللي [[postinstall]] في المثال بيحله.`
        },
        {
          cmd: "prisma db push",
          title: "مزامنة الـ schema من غير migrations، وليه خطر",
          desc: R`[[db push]] بيقارن الـ schema بالقاعدة ويعدّلها على طول: من غير ملف migration ولا تاريخ. ممتاز وانت بتجرّب شكل الجداول على جهازك. و [[--accept-data-loss]] بيوافق مقدمًا على أي تغيير بيمسح داتا، من غير ما يسألك.

الاتنين مكانهم جهاز التطوير. الإنتاج بياخد [[migrate deploy]] بس.`,
          example: R`npx prisma db push
npx prisma db push --accept-data-loss
# الغلطة: أمر تشغيل الـ container في الإنتاج
# command: sh -c "npx prisma db push --accept-data-loss && node src/server.js"
# الصح:
# command: sh -c "npx prisma migrate deploy && node src/server.js"`,
          try: "على قاعدة تجربة: اعمل model فيه عمود name وضيف كام صف، وغيّر اسمه لـ fullName، وشغّل db push واقرا التحذير. بعدها جرّب بـ --accept-data-loss وشوف الداتا راحت فين.",
          flag: "danger",
          deep: {
            why: "db push مريح جدًا: تعدّل الـ schema، أمر واحد، والقاعدة زيها. عشان كده بيتسرّب لسكربتات التشغيل. وهناك بيبقى قنبلة: أول تعديل بيمسح عمود، بيمسح داتا العملاء مع أول deploy.",
            how: R`db push مبيعرفش نيتك. لو غيّرت اسم عمود من [[name]] لـ [[fullName]]، هو شايف عمود اتشال وعمود جديد اتضاف، فبيعمل DROP للقديم و ADD للجديد، والداتا بتروح. نفس الحاجة لو غيّرت نوع عمود بطريقة مش متوافقة.

من غير الفلاج: لو فيه خسارة داتا، بيوقف ويسأل. وفي container مفيش حد يجاوب، فبيفشل والـ deploy يقف، ودي بالظبط الحماية. الفلاج بيشيلها.

[[migrate deploy]] مختلف: بيطبّق ملفات SQL اتكتبت واتراجعت واتعملها commit، بالترتيب، وبيسجّل اللي اتطبق. محدش بيولّد حاجة وقت الـ deploy.

لو القاعدة اتعملت بـ db push وعايز تنقل لـ migrations: ولّد migration أولى من الـ schema بـ [[prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script]] في [[prisma/migrations/0_init/migration.sql]]، وعلّمها متطبقة بـ [[prisma migrate resolve --applied 0_init]]. التفاصيل في تاب PostgreSQL.`,
            when: "db push على جهازك وانت لسه بتصمم الجداول، أو قاعدة تجربة بتترمي. مش على أي قاعدة فيها داتا حد محتاجها.",
            mistakes: R`في مشروع حقيقي كان أمر تشغيل الـ backend في docker-compose: [[npx prisma db push --accept-data-loss && node src/server.js]]. يعني مع كل restart أو deploy، أي تغيير في الـ schema بيتطبق فورًا ومن غير سؤال، ولو فيه rename لعمود الداتا بتتمسح. والصح migrate deploy في نفس المكان. وقريب منه [[prisma migrate reset]]: بيمسح القاعدة كلها ويعيد بناها، فاتأكد إن DATABASE_URL مش بيشاور على الإنتاج قبل ما تشغّله.`
          },
          teach: R`## الأمر ده بيعمل إيه

[[prisma db push]] بيبص على [[schema.prisma]] وعلى القاعدة، ويغيّر القاعدة لحد ما تبقى زي الـ schema، على طول. مفيش ملف migration بيتكتب، ومفيش سجل باللي اتغيّر. جربنا السيناريو كله بـ Prisma 7.10.0 على Postgres 16 في Docker.

---

## ١. [[npx prisma db push]] أول مرة

الـ model:

~~~text prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  role  String @default("USER")
}
~~~

~~~text الناتج
Datasource "db": PostgreSQL database "app", schema "public" at "node03-pg:5432"

🚀  Your database is now in sync with your Prisma schema. Done in 161ms
~~~

- [[Datasource "db"]]: اسم الـ datasource في الـ schema، وبعده نوع القاعدة واسمها وعنوانها. **اقرا السطر ده كل مرة**: لو العنوان بتاع الإنتاج، وقّف.
- [[in sync]]: الجدول اتعمل. وحطينا فيه صفّين ([[Ali]] و [[Sara]]).

---

## ٢. غيّرنا اسم العمود: [[name]] بقى [[fullName String]]

انت قصدك «rename». بس db push مبيعرفش نيتك: هو شايف عمود [[name]] اختفى وعمود [[fullName]] جديد ظهر.

~~~text الناتج
⚠️ We found changes that cannot be executed:

  • Added the required column $__btfullName$__bt to the $__btUser$__bt table without a default value. There are 2 rows in this table, it is not possible to execute this step.

You may use the --force-reset flag to drop the database before push like prisma db push --force-reset
All data will be lost.
~~~

[[fullName]] مطلوب (من غير [[?]]) ومالوش default، والجدول فيه صفين: هيحط فيهم إيه؟ مستحيل. والـ exit code 1. و [[--force-reset]] اللي بيقترحه بيمسح **القاعدة كلها**.

---

## ٣. خليناه اختياري: [[fullName String?]]

~~~text الناتج
⚠️  There might be data loss when applying the changes:

  • You are about to drop the column $__btname$__bt on the $__btUser$__bt table, which still contains 2 non-null values.

Error: Use the --accept-data-loss flag to ignore the data loss warnings like prisma db push --accept-data-loss
~~~

هنا ممكن ينفذ، بس هيمسح [[name]] باللي فيه، فوقف وطلب موافقة. وده اللي بيحميك في container: مفيش حد يوافق، فبيفشل.

---

## ٤. [[npx prisma db push --accept-data-loss]]

[[--accept-data-loss]] = «موافق مقدمًا على أي مسح». 

~~~text الناتج
🚀  Your database is now in sync with your Prisma schema. Done in 115ms
~~~

وبصينا في الجدول بـ [[psql]]:

~~~text الناتج
 id |  email  | fullName 
----+---------+----------
  1 | a@x.com | 
  2 | b@x.com | 
~~~

[[Ali]] و [[Sara]] راحوا. العمود القديم اتمسح والجديد فاضي. ده الفرق بين push و migration: الـ migration ملف SQL بتقراه قبل ما يتطبق، فلو لقيت فيه DROP و ADD بتغيّرهم بإيدك لـ [[ALTER TABLE "User" RENAME COLUMN "name" TO "fullName"]] اللي بيحافظ على الداتا.

---

## ٥. السطور المتعلّقة (تعليقات في المثال)

~~~text docker-compose.yml
# الغلطة
command: sh -c "npx prisma db push --accept-data-loss && node src/server.js"
# الصح
command: sh -c "npx prisma migrate deploy && node src/server.js"
~~~

- [[command:]]: الأمر اللي الـ container بيشغّله كل ما يقوم.
- [[sh -c "..."]]: شغّل السطر ده بالشيل، عشان [[&&]] تشتغل.

يعني السطر الغلط بيعمل خطوة ٤ فوق **مع كل restart**، على داتا العملاء. والصح بيطبّق ملفات migrations اتكتبت واتراجعت (درس «migrate deploy قبل السيرفر»).

---

## الخلاصة

| التغيير في الـ schema | db push من غير فلاج | مع [[--accept-data-loss]] |
|---|---|---|
| جدول أو عمود جديد اختياري | بينفّذ | بينفّذ |
| عمود مطلوب جديد في جدول فيه داتا | يرفض | يرفض برضه |
| مسح أو rename عمود فيه داتا | يوقف ويطلب الفلاج | **يمسح الداتا** |

- db push: جهازك، وقاعدة تجربة بتترمي.
- الإنتاج: [[migrate deploy]] بس.
- الأمر واحد على ويندوز ولينكس والماك.`,
          lines: [
            "طابق القاعدة مع الـ schema، ويسأل لو فيه مسح.",
            "نفسه، ويوافق على المسح من غير سؤال (تجربة بس)."
          ],
          sol: R`مع model فيه [[name String]] وصفّين، ولما تغيّره لـ [[fullName String]] (مطلوب):

[[⚠️ We found changes that cannot be executed:]] و [[Added the required column fullName to the User table without a default value. There are 2 rows in this table, it is not possible to execute this step.]] يعني مينفعش أصلًا، و [[--accept-data-loss]] مش هيحلها (الـ CLI بيقترح [[--force-reset]] اللي بيمسح القاعدة كلها).

لو خليته [[fullName String?]]: [[⚠️ There might be data loss when applying the changes:]] و [[You are about to drop the column name on the User table, which still contains 2 non-null values.]] و [[Use the --accept-data-loss flag to ignore the data loss warnings]]. مع [[--accept-data-loss]]: عمود [[name]] اتمسح بالداتا، و [[fullName]] اتعمل فاضي ([[null]] في الصفين). الداتا راحت، مش اتنقلت، لأن db push مش بيعرف إن دا rename.

ودا سبب إنه مينفعش في الإنتاج: rename بسيط بقى مسح. الصح migration بـ [[RENAME COLUMN]]. ولاحظ إن نسخ Prisma الجديدة ممكن ترفض الـ flag ده لو حسّت إنها شغالة من agent آلي، وتطلب موافقة صريحة من الإنسان.`
        },
        {
          cmd: "migrate deploy قبل السيرفر",
          title: "فين تشغّل الـ migrations في الإنتاج",
          desc: R`[[prisma migrate deploy]] لازم يتشغّل قبل الكود الجديد ما يقوم، وإلا الكود يطلب عمود لسه مش موجود. يا إما خطوة في الـ deploy قبل ما تشغّل التطبيق، يا إما أول سطر في الـ entrypoint.

والمهم في الحالتين: لو الـ migration فشلت، السيرفر ميقومش.`,
          example: R`npx prisma migrate status
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app
docker compose logs --tail 50 app
# أو في entrypoint.sh:
# npx prisma migrate deploy && exec node server.js`,
          try: "في مشروع تجربة بـ compose: اعمل migration جديدة، وارفعها، وطبّقها بـ [[docker compose run --rm]] قبل [[up -d]]، وبعدين [[migrate status]] يقول كله متطبق.",
          deep: {
            why: "الكود والقاعدة لازم يتحركوا مع بعض. deploy الكود من غير migration = أخطاء في كل request. و migration بتفشل في صمت = نفس النتيجة، بس انت فاكر كله تمام.",
            how: R`[[migrate status]] بيقولك إيه اللي لسه متطبقش، اقراه قبل أي deploy.

الطريقة الأولى، خطوة منفصلة: [[docker compose run --rm app npx prisma migrate deploy]] بيشغّل container مؤقت من نفس الـ image، يطبّق ويخرج. لو فشل، الـ && في سكربت الـ deploy بتوقف قبل [[up -d]]، والنسخة القديمة لسه شغالة.

الطريقة التانية، في الـ entrypoint: [[migrate deploy && exec node server.js]]. بسيطة، بس بتتشغّل مع كل restart، ومحتاجة Prisma CLI جوه image الإنتاج (وده مش موجود في standalone ولا مع omit=dev)، ولو عندك أكتر من نسخة من التطبيق الكل بيحاول مع بعض (Prisma بيقفل بـ lock فواحدة بس بتطبّق، والباقي بيستنى لحد 10 ثواني بس، ولو الـ migration طوّلت أكتر بيفشلوا).

[[exec]] بيخلي node ياخد مكان الشيل كـ PID 1، فيستلم SIGTERM من Docker ويقفل نضيف.`,
            when: "كل deploy فيه migration جديدة. والخطوة المنفصلة أحسن أول ما يبقى عندك CI أو أكتر من نسخة.",
            mistakes: R`في مشروع حقيقي كان الـ entrypoint: [[node scripts/auto-migrate.mjs || echo "schema sync skipped"]]. الـ [[|| echo]] بتبلع الفشل، فالسيرفر يقوم على schema قديمة وكل request يضرب error. ده غير إن السكربت كان بيشتغل مع كل تشغيل container بتوكن إدارة كامل للقاعدة، وكان فيه ملفين entrypoint واحد بيشاور على .js والتاني على .mjs. خليها [[&&]] من غير أي fallback.`
          },
          teach: R`## الأوامر دي بتعمل إيه

بتطبّق الـ migrations الجديدة على قاعدة الإنتاج **قبل** ما الكود الجديد يقوم، ولو التطبيق فشل، الكود الجديد ميقومش. جربنا الخطوات كلها بـ docker compose على جهازنا: service اسمها [[db]] (Postgres 16) و service اسمها [[app]] (node:22-slim فيها مشروع Prisma 7.10.0 وسيرفر صغير بيرجّع اليوزرز كـ JSON).

ملفات الـ migrations فولدرات جوه [[prisma/migrations]]، كل واحد فيه [[migration.sql]]:

~~~text prisma/migrations
0_init/migration.sql         CREATE TABLE "User" (...)
1_add_phone/migration.sql    ALTER TABLE "User" ADD COLUMN "phone" TEXT;
~~~

Prisma بيطبّقهم بترتيب الاسم، وبيسجّل اللي اتطبق في جدول جوه القاعدة اسمه [[_prisma_migrations]].

---

## ١. [[npx prisma migrate status]]

بيقارن الفولدر بالجدول ده ويقولك الفرق. على قاعدة جديدة:

~~~text الناتج
Datasource "db": PostgreSQL database "shop", schema "public" at "db:5432"

1 migration found in prisma/migrations
Following migration have not yet been applied:
0_init

To apply migrations in development run prisma migrate dev.
To apply migrations in production run prisma migrate deploy.
~~~

والـ exit code هنا **1**، يعني تقدر تستخدمه في سكربت كشرط: «فيه حاجة متطبقتش». ولما كله يتطبق:

~~~text الناتج
1 migration found in prisma/migrations

Database schema is up to date!
~~~

و exit 0.

---

## ٢. [[docker compose run --rm app npx prisma migrate deploy]]

نفكه من برة لجوه:

| الحتة | معناها |
|---|---|
| [[docker compose run]] | شغّل container **جديد مؤقت** من تعريف service، ونفّذ فيه أمر |
| [[--rm]] | امسح الـ container ده أول ما يخلص |
| [[app]] | استخدم تعريف service اسمها app: نفس الـ image والمتغيرات ([[DATABASE_URL]]) والشبكة |
| [[npx prisma migrate deploy]] | الأمر اللي هيتنفّذ بدل [[command]] بتاع الـ service |

~~~text الناتج
1 migration found in prisma/migrations

Applying migration $__bt0_init$__bt

The following migration(s) have been applied:

migrations/
  └─ 0_init/
    └─ migration.sql

All migrations have been successfully applied.
~~~

وأي مرة بعدها من غير جديد: [[No pending migrations to apply.]]

> لاحظنا تحذير مع كل أمر Prisma: [[Prisma failed to detect the libssl/openssl version]]. صورة [[node:22-slim]] مفيهاش OpenSSL، و Prisma بيحتاجه. الأوامر اشتغلت، بس في Dockerfile حقيقي ضيف [[apt-get install -y openssl]] زي ما الرسالة بتقول.

---

## ٣. [[docker compose up -d app]]

- [[up]]: شغّل الـ service بالـ [[command]] بتاعها ([[node server.js]]).
- [[-d]] (detached): في الخلفية، ورجّعلي الترمنال.

~~~text الناتج من curl
[{"email":"a@x.com"}]
~~~

---

## ٤. [[docker compose logs --tail 50 app]]

- [[logs]]: اللي الـ container طبعه.
- [[--tail 50]]: آخر ٥٠ سطر بس.

~~~text الناتج
app-1  | listening 3000
~~~

مفيش أخطاء قاعدة. ده الفحص بعد كل deploy.

---

## التجربة: الكود الجديد قام قبل الـ migration

ضفنا [[phone String?]] في الـ schema، و migration [[1_add_phone]]، وخلّينا السيرفر يطلب [[phone]]، وعملنا restart للـ app **من غير** migrate deploy:

~~~text الناتج
$ curl localhost:3913
error
$ docker compose logs --tail 5 app
app-1  | db error: The column $__btUser.phone$__bt does not exist in the current database.
~~~

كل request بيقع. ده بالظبط اللي بيحصل لما ترتيب الـ deploy يبقى غلط. والـ [[migrate status]] كان قايلها:

~~~text الناتج
2 migrations found in prisma/migrations
Following migration have not yet been applied:
1_add_phone
~~~

بعد [[docker compose run --rm app npx prisma migrate deploy]] ([[Applying migration 1_add_phone]]) و [[up -d app]]:

~~~text الناتج
[{"email":"a@x.com","phone":null}]
~~~

---

## الطريقة التانية: entrypoint

~~~text entrypoint.sh
npx prisma migrate deploy && exec node server.js
~~~

- [[&&]]: السيرفر يقوم **بس** لو الـ migration نجحت.
- [[exec]]: node ياخد مكان الشيل (PID 1)، فيستلم SIGTERM من Docker ويقفل نضيف (درس «الإغلاق النضيف»).

جربنا migration بايظة ([[ALTER TABLE "Nope" ...]] على جدول مش موجود):

~~~text الناتج
Error: P3009

migrate found failed migrations in the target database, new migrations will not be applied.
The $__bt2_bad$__bt migration started at 2026-10-06 13:17:56.389788 UTC failed

server never started, exit 1
~~~

[[P3009]] = فيه migration وقعت قبل كده، وبعدها Prisma بيرفض يطبّق أي حاجة لحد ما تصلّحها بإيدك ([[prisma migrate resolve]]). والمهم: السيرفر مقامش. أما لو كتبت [[migrate deploy || echo "schema sync skipped"]]، الـ exit code طلع **0** رغم الفشل، والسيرفر كان هيقوم على schema ناقصة.

---

## الخلاصة

| الخطوة | الأمر | لو فشل |
|---|---|---|
| ١ | [[prisma migrate status]] | exit 1 = فيه حاجة متطبقتش |
| ٢ | [[docker compose run --rm app npx prisma migrate deploy]] | وقّف، والنسخة القديمة لسه شغالة |
| ٣ | [[docker compose up -d app]] | — |
| ٤ | [[docker compose logs --tail 50 app]] | أي [[does not exist]] = migration ناقصة |

- [[&&]] دايمًا، وعمرك ما تحط [[|| echo]] بعد migrate.
- الأوامر نفسها على ويندوز ولينكس، لأنها كلها [[docker compose]].`,
          lines: [
            "إيه اللي لسه متطبقش.",
            "طبّق في container مؤقت من نفس الـ image، ويتمسح بعدها.",
            "وبعد ما نجح بس، شغّل النسخة الجديدة.",
            "اتأكد إنه قام من غير أخطاء قاعدة."
          ],
          sol: R`[[docker compose run --rm app npx prisma migrate deploy]] بيطبع اسم كل migration جديدة و [[All migrations have been successfully applied.]] (ولو مفيش جديد: [[No pending migrations to apply.]]). وبعد [[up -d]]، [[npx prisma migrate status]] بيقول [[Database schema is up to date!]]، واللوج بتاع app مفيهوش errors عن أعمدة ناقصة.

ليه [[run --rm]] الأول: لو الـ migration فشلت، السيرفر القديم لسه شغال على الـ schema القديمة، والجديد ما اتشغلش على schema ناقصة. [[--rm]] بيمسح الـ container المؤقت بعد ما يخلص.

الأخطاء الشائعة: [[P3009 migrate found failed migrations in the target database]] يعني migration سابقة وقعت في النص؛ اقرا الـ error، صلّح القاعدة، و [[prisma migrate resolve]]. و [[P1001 Can't reach database server]] يعني الـ app مش شايف الـ db (اسم الـ service في DATABASE_URL أو الـ db لسه مقامتش). ولو [[migrate status]] قال فيه migrations مش متطبقة، يبقى الـ image اللي عملت منها run قديمة ومفيهاش ملفات الـ migrations الجديدة: اعمل build الأول.`
        },
        {
          cmd: "prisma db seed و studio",
          title: "بيانات أولية وواجهة تتصفّح بيها القاعدة",
          desc: R`[[db seed]] بيشغّل سكربت بيحط بيانات البداية: أدمن، وتصنيفات، وإعدادات. أمره بيتكتب مرة في الإعدادات وأي حد في الفريق يشغّله بنفس الشكل. و [[studio]] بيفتح واجهة ويب على [[localhost:5555]] تشوف وتعدّل فيها الداتا.

الاتنين للتطوير. على السيرفر بحذر شديد، و studio عمره ما يتفتح للنت.`,
          example: R`npx prisma db seed
node --env-file=.env prisma/seed.js
npx prisma studio
npx prisma studio --port 5556 --browser none
ssh -L 5555:localhost:5555 deploy@203.0.113.10`,
          try: "اكتب seed بيعمل أدمن بـ upsert، وشغّله مرتين، واتأكد إن مفيش أدمن مكرر. وبعدين افتح studio وشوفه.",
          deep: {
            why: "كل واحد جديد في الفريق، وكل قاعدة تجربة بعد reset، محتاجة نفس البيانات الأولية. من غير seed كل واحد بيعملها بإيده وبشكل مختلف.",
            how: R`أمر الـ seed بيتعرّف مرة: في Prisma 7 جوه [[prisma.config.ts]] تحت [[migrations.seed]] (زي [[node --env-file=.env prisma/seed.js]] أو [[tsx prisma/seed.ts]])، وفي النسخ القديمة في package.json تحت [[prisma.seed]]. و [[npx prisma db seed]] بينفّذه. ومتعتمدش إنه يتشغّل لوحده بعد migrate، شغّله صريح.

وفي Prisma 7 مع prisma.config.ts ملف .env مش بيتقري لوحده، فيا [[import "dotenv/config"]] في أول الـ config، يا [[--env-file]] في أمر node.

الـ seed لازم يبقى ينفع يتشغّل كذا مرة: [[upsert]] بدل [[create]]، عشان تشغيله تاني ميكررش ولا يقع على unique.

[[studio]] سيرفر ويب صغير بيتصل بالقاعدة اللي في DATABASE_URL. [[--browser none]] ميفتحش متصفح (على سيرفر مثلًا). ولو محتاجه على سيرفر، شغّله هناك واوصله من جهازك بـ SSH tunnel زي آخر سطر، ومتفتحش البورت في الفايروول.`,
            when: "seed بعد أي reset وفي أول تشغيل للمشروع. studio لما تحب تبص على الداتا بسرعة من غير SQL.",
            mistakes: "seed بـ create فالتشغيل التاني يقع أو يكرر. و studio شغال و .env فيه DATABASE_URL بتاع الإنتاج، فتعديل «تجربة» بيتكتب في داتا حقيقية."
          },
          teach: R`## الأوامر دي بتعمل إيه

[[db seed]] بيشغّل سكربت انت كاتبه يحط بيانات البداية في القاعدة (أدمن مثلًا)، و [[studio]] بيفتح صفحة ويب تتفرج فيها على الجداول وتعدّل. جربنا الاتنين بـ Prisma 7.10.0 على Postgres 16، جوه [[node:22-slim]]. وآخر سطر (SSH tunnel) من الـ docs، لأنه محتاج سيرفر حقيقي.

---

## السكربت نفسه: [[prisma/seed.ts]]

ده الـ [[solCode]]، نفكه:

~~~text prisma/seed.ts
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const admin = await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {},
  create: { email: "admin@example.com", name: "Admin", role: "ADMIN" },
});
console.log("admin id", admin.id);
await prisma.$disconnect();
~~~

| السطر | معناه |
|---|---|
| [[import { PrismaClient } from "../generated/prisma/client.ts"]] | الكلاينت اللي [[prisma generate]] ولّده (درس «prisma generate») |
| [[import { PrismaPg } from "@prisma/adapter-pg"]] | الـ adapter: الحتة اللي بتكلّم Postgres فعلًا. في Prisma 7 لازم تديه للكلاينت |
| [[new PrismaPg({ connectionString: process.env.DATABASE_URL })]] | اتصل بالرابط اللي في متغير البيئة |
| [[new PrismaClient({ adapter: ... })]] | الكلاينت اللي هتستخدمه |

### [[upsert]]

[[upsert]] = update + insert: «دوّر، ولو لقيته عدّله، ولو ملقيتهوش اعمله».

- [[where: { email: "admin@example.com" }]]: دوّر بالـ email. لازم يبقى عمود [[@unique]].
- [[update: {}]]: لو لقيته، عدّل... ولا حاجة (object فاضي). يعني سيبه زي ما هو.
- [[create: {...}]]: لو ملقيتهوش، اعمله بالبيانات دي.

و [[await]] في أول الملف شغالة لأن المشروع ESM. و [[prisma.$disconnect()]] بيقفل الاتصال بالقاعدة عشان node يخرج على طول.

---

## ١. [[npx prisma db seed]]

Prisma مش بيعرف يشغّل إيه لوحده. جربناه من غير إعداد:

~~~text الناتج
⚠️ No seed command configured

To seed your database, add a seed property to the migrations section in your Prisma config file.
~~~

فضفنا سطر [[seed]] في [[prisma.config.ts]]:

~~~text prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node --env-file=.env prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
~~~

- [[import "dotenv/config"]]: اقرا [[.env]] وحطه في [[process.env]]. Prisma 7 مبقاش بيعمل ده لوحده.
- [[migrations.seed]]: الأمر اللي [[db seed]] هيشغّله.

~~~text الناتج
Running seed command $__btnode --env-file=.env prisma/seed.ts$__bt ...
admin id 1

🌱  The seed command has been executed.
~~~

وشغّلناه **تاني**: نفس [[admin id 1]]. و [[SELECT count(*) FROM "User" WHERE email = 'admin@example.com']] رجّع [[1]]. يعني upsert لقى الأدمن ومعملش واحد جديد.

ولو كان السكربت [[create]] بدل upsert، التشغيل التاني:

~~~text الناتج
Unique constraint failed on the constraint: $__btUser_email_key$__bt
  code: 'P2002',
~~~

[[P2002]] = قيمة مكررة في عمود unique، و [[User_email_key]] اسم الـ index اللي Postgres عمله لـ [[@unique]].

---

## ٢. [[node --env-file=.env prisma/seed.js]]

نفس السكربت من غير Prisma CLI خالص. [[--env-file=.env]] (من Node 20.6) بيقرا الملف ويحطه في [[process.env]]. جربناه على [[seed.ts]] وطبع [[admin id 1]]. Node 22.18 وما بعده بيشغّل [[.ts]] مباشرة (بيشيل الأنواع)، والمثال كاتب [[.js]] لو مشروعك JavaScript.

---

## ٣. [[npx prisma studio]]

بيشغّل سيرفر ويب صغير متصل بالـ [[DATABASE_URL]]، ويفتح المتصفح على [[localhost:5555]]. فيه كل جدول، وتقدر تفلتر وتعدّل وتمسح صفوف.

---

## ٤. [[npx prisma studio --port 5556 --browser none]]

- [[--port 5556]]: بورت تاني (لو 5555 مشغول، أو بتفتح اتنين لقاعدتين).
- [[--browser none]]: متفتحش متصفح. على سيرفر أو container مفيش متصفح أصلًا.

~~~text الناتج
Prisma Studio is running at: http://localhost:5556
~~~

[[curl localhost:5556]] رجّع 200. وبصينا على البورتات المفتوحة جوه الـ container: Studio سامع على [[127.0.0.1:5556]] بس، مش على كل الكروت. يعني من بره الجهاز مش هيوصل، وده كويس.

---

## ٥. [[ssh -L 5555:localhost:5555 deploy@203.0.113.10]]

لو Studio شغال على سيرفر وسامع على localhost بتاع السيرفر، إزاي تفتحه من جهازك؟

| الحتة | معناها |
|---|---|
| [[ssh deploy@203.0.113.10]] | ادخل السيرفر ده باليوزر [[deploy]] |
| [[-L]] | local forwarding: افتح بورت على **جهازك** ووصّله بحاجة على السيرفر |
| [[5555:]] | البورت على جهازك |
| [[localhost:5555]] | العنوان ده **من وجهة نظر السيرفر**، يعني Studio |

طول ما الـ SSH مفتوح، [[http://localhost:5555]] على جهازك بيفتح Studio اللي على السيرفر، والبورت مش مفتوح للنت. ([[203.0.113.10]] عنوان مخصص للأمثلة في الـ docs، مش سيرفر حقيقي.) التفاصيل في تاب الـ VPS.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npx prisma db seed]] | يشغّل [[migrations.seed]] من [[prisma.config.ts]] |
| [[node --env-file=.env prisma/seed.js]] | نفس السكربت مباشرة |
| [[npx prisma studio]] | واجهة ويب على [[localhost:5555]] |
| [[--port 5556 --browser none]] | بورت تاني ومن غير متصفح |
| [[ssh -L 5555:localhost:5555 ...]] | توصل لـ Studio السيرفر من جهازك |

- seed بـ [[upsert]] عشان يتشغّل كذا مرة من غير تكرار.
- قبل studio أو seed بص على [[DATABASE_URL]]: لو بتاع الإنتاج، أي «تجربة» بتتكتب في داتا حقيقية.`,
          lines: [
            "شغّل أمر الـ seed المتعرّف في الإعدادات.",
            "أو شغّل السكربت مباشرة وهو بيقرا .env.",
            "افتح الواجهة على localhost:5555.",
            "على بورت تاني ومن غير ما يفتح متصفح.",
            "من جهازك: وصّل 5555 على السيرفر لجهازك عبر SSH بدل ما تفتحه للنت."
          ],
          sol: R`الحل: [[upsert]] بالـ email كـ where (والعمود لازم يكون [[@unique]]). أول مرة بيعمل الأدمن ويطبع [[admin id 1]] و [[🌱  The seed command has been executed.]]، والتانية بيلاقيه فبيعمل update (هنا فاضي فمبيغيرش حاجة). بعد تشغيلين [[SELECT count(*) FROM "User" WHERE email = 'admin@example.com']] بيرجّع [[1]]، و Studio على [[http://localhost:5555]] بيعرض صف واحد.

لو استخدمت [[create]] بدل upsert: التشغيل التاني يقع بـ [[Unique constraint failed on the constraint: $__btUser_email_key$__bt]] و [[code: 'P2002']]، ولو email مش unique، هيعمل أدمن تاني بصمت، ودا الأسوأ.

وفي Prisma 7 أمر الـ seed بيتكتب في [[prisma.config.ts]] ([[migrations: { seed: "node prisma/seed.js" }]])، لو [[npx prisma db seed]] قال إنه مش لاقي seed command يبقى الإعداد ناقص، شغّله مباشرة بـ [[node --env-file=.env prisma/seed.js]].`,
          solCode: R`// prisma/seed.ts (Prisma 7: generator "prisma-client" بـ output = "../generated/prisma")
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const admin = await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {},
  create: { email: "admin@example.com", name: "Admin", role: "ADMIN" },
});
console.log("admin id", admin.id);
await prisma.$disconnect();

// prisma.config.ts: migrations: { seed: "node --env-file=.env prisma/seed.ts" }`
        }
      ]
    }
]);
