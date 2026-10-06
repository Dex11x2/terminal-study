// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "سكربتات التطوير",
      l: 2,
      n: "سيرفر بيعيد نفسه، و TypeScript من غير build، وكذا سيرفر في ترمنال واحد، وموقعك على الموبايل",
      items: [
        {
          cmd: "node --watch --env-file",
          title: "سيرفر تطوير بيعيد نفسه من غير مكتبات",
          desc: R`زمان سكربت dev كان محتاج nodemon عشان يعيد التشغيل و dotenv عشان يقرا .env. من Node 20 وأحدث الاتنين جوه Node: [[--watch]] و [[--env-file]]. ولمشروع TypeScript، [[tsx watch]] بيعمل نفس الحاجة لملفات .ts.

وفي الإنتاج مفيش watch: بتعمل build بـ tsc وتشغّل الـ JS، والمتغيرات جاية من البيئة مش من ملف.`,
          example: R`"scripts": {
  "dev": "node --watch --env-file=.env src/server.js",
  "dev:ts": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "db:seed": "node --env-file=.env prisma/seed.js"
}
# جوه container على ويندوز (أحداث الملفات مش بتوصل)
# nodemon --legacy-watch --watch src --ext js,json src/server.js`,
          try: "حوّل سكربت dev في مشروع بيستخدم nodemon و dotenv لـ [[node --watch --env-file=.env]]، وشيل المكتبتين من package.json، واتأكد إن التعديل بيعيد التشغيل.",
          flag: "script",
          deep: {
            why: "كل مكتبة زيادة في devDependencies نسخة تتحدّث وثغرة محتملة. الحاجتين دول بقوا في Node نفسه، فالسكربت أبسط والمشروع أخف.",
            how: R`[[--watch]] بيراقب الملف اللي شغّلته وكل ملف بيستورده، وأول ما واحد يتغير بيقفل العملية ويشغّلها تاني. و [[--watch-path=src]] لو عايز تراقب فولدر بعينه.

[[--env-file=.env]] بيقرا الملف قبل ما الكود يبدأ ويحط القيم في process.env. لو المتغير موجود في البيئة أصلًا، اللي في البيئة بيكسب. ولو الملف مش موجود، Node بيقف بخطأ، وده سبب إنك متحطوش في start بتاع الإنتاج.

[[tsx]] بيشغّل TypeScript مباشرة: بيشيل الأنواع بـ esbuild وبيشغّل الـ JS، من غير ما يفحص الأنواع خالص (الفحص خطوة لوحدها في الـ CI). و [[tsx watch]] زي node --watch. في الإنتاج: [[tsc]] بيطلّع dist، و [[node dist/index.js]] بيشغّله، أسرع في البداية ومن غير devDependencies.

nodemon لسه ليه مكان: جوه Docker على ويندوز أو WSL مع bind mount، أحداث تغيير الملفات مش بتوصل للـ container، فـ [[--legacy-watch]] (أو [[-L]]) بيخليه يفحص الملفات كل شوية (polling). و [[--ext]] بيحدد الامتدادات.`,
            when: "أي مشروع Node جديد: node --watch للـ JS، و tsx watch للـ TypeScript. و nodemon -L لو الـ watch مش بيحس بالتعديل جوه container.",
            mistakes: "‏--env-file في سكربت start على السيرفر، فالتطبيق بيقع لو .env مش موجود أو بياخد قيم قديمة منه. و tsx في الإنتاج بدل build، فالتشغيل أبطأ ومحتاج devDependencies على السيرفر."
          },
          teach: R`## سكربتات dev من غير nodemon ولا dotenv

المثال حتة من [[scripts]] في package.json، مش أوامر بتتكتب في الترمنال. كل سطر سكربت بتشغّله بـ [[npm run الاسم]]. اتجرّب على ويندوز 11 (Node 24.19) في مشروع [["type": "module"]] فيه [[src/server.js]] و [[src/index.ts]] و [[prisma/seed.js]]، و [[.env]]:

~~~text .env
PORT=3931
DATABASE_URL=postgres://localhost/dev
~~~

---

## ١. [["dev": "node --watch --env-file=.env src/server.js"]]

| الحتة | بتعمل إيه |
|---|---|
| [[--watch]] | أعد التشغيل لما الملف أو حاجة بيستوردها تتغير |
| [[--env-file=.env]] | اقرا [[.env]] في [[process.env]] قبل ما الكود يبدأ |
| [[src/server.js]] | الملف |

~~~text الناتج: npm run dev (وبعدين تعديل في server.js)
> ldev@1.0.0 dev
> node --watch --env-file=.env src/server.js

listening on 3931
Change detected in 'C:\\Users\\ali\\ldev\\src\\server.js'
Restarting 'src/server.js'
listening on 3931
~~~

فتح على 3931 من [[.env]] من غير dotenv، وقام تاني لوحده بعد التعديل من غير nodemon.

---

## ٢. [["dev:ts": "tsx watch src/index.ts"]]

[[tsx]] باكدج (في devDependencies) بتشغّل TypeScript مباشرة، و [[watch]] نفس فكرة [[--watch]]:

~~~text الناتج
> ldev@1.0.0 dev:ts
> tsx watch src/index.ts

ts app on 3000
4:17:15 PM [tsx] change in ./src\index.ts Rerunning...
ts app on 3000
~~~

[[3000]] مش 3931 لأن [[tsx watch]] هنا مش بيقرا [[.env]]. والـ [[:]] في الاسم [[dev:ts]] مجرد عادة لتجميع السكربتات، مالهاش معنى عند npm.

---

## ٣. [["build": "tsc"]]

[[tsc]] بيحوّل [[.ts]] لـ [[.js]] حسب [[tsconfig.json]]. أنا كتبته كده:

~~~text tsconfig.json
{ "compilerOptions": { "module": "nodenext", "target": "esnext", "rootDir": "src", "outDir": "dist", "types": ["node"], "strict": true } }
~~~

- [[rootDir: src]] الكود فين، و [[outDir: dist]] الناتج يروح فين.
- [[types: ["node"]]] حمّل أنواع Node (من [[@types/node]]) عشان [[process]] يبقى معروف.

~~~text الناتج
> ldev@1.0.0 build
> tsc
~~~

مفيش كلام = مفيش أخطاء، وطلع [[dist/index.js]].

> [[tsc --init]] في TypeScript 7 بيعمل ملف فيه [["types": []]]، ومعاه أول build قال [[error TS2591: Cannot find name 'process'. Do you need to install type definitions for node?]] حتى و [[@types/node]] متسطّب. الحل [["types": ["node"]]].

---

## ٤. [["start": "node dist/index.js"]]

~~~text الناتج
> ldev@1.0.0 start
> node dist/index.js

ts app on 3000
~~~

مفيش [[--env-file]] ولا [[--watch]]: القيم في الإنتاج جاية من بيئة السيرفر. [[PORT=8080 npm start]] طبع [[ts app on 8080]].

---

## ٥. [["db:seed": "node --env-file=.env prisma/seed.js"]]

سكربت لمرة واحدة محتاج [[DATABASE_URL]]:

~~~text الناتج
seeding postgres://localhost/dev
~~~

ولما مسحت [[.env]]:

~~~text الناتج
node: .env: not found
~~~

ده السبب إن [[--env-file]] مايتحطش في [[start]]: على السيرفر مفيش [[.env]] غالبًا، والتطبيق هيقف قبل ما يبدأ.

---

## السطرين المتعلّقين: nodemon جوه container

~~~text
nodemon --legacy-watch --watch src --ext js,json src/server.js
~~~

جوه Docker على ويندوز مع bind mount، أحداث تغيير الملفات مش بتوصل للـ container. [[--legacy-watch]] ([[-L]]) بيخلي nodemon يفحص الملفات كل شوية بنفسه (polling)، و [[--watch src]] الفولدر، و [[--ext js,json]] الامتدادات (من الـ docs، ماتجربش هنا).

---

## الخلاصة

| السكربت | على | بيقرا .env؟ | بيعيد نفسه؟ |
|---|---|---|---|
| [[dev]] | جهازك | أيوه | أيوه |
| [[dev:ts]] | جهازك | لأ (هنا) | أيوه |
| [[build]] | CI والسيرفر | | |
| [[start]] | السيرفر | لأ، من البيئة | لأ |
| [[db:seed]] | جهازك | أيوه | |`,
          lines: [
            "بداية السكربتات في package.json.",
            "JS: أعد التشغيل مع كل تعديل واقرا .env، من غير nodemon ولا dotenv.",
            "TypeScript: نفس الفكرة بـ tsx.",
            "الإنتاج: حوّل TS لـ JS في dist.",
            "وشغّل الناتج، والمتغيرات من بيئة السيرفر.",
            "سكربت لمرة واحدة بيقرا .env برضه.",
            "قفلة."
          ],
          sol: R`الحل: [["dev": "node --watch --env-file=.env src/server.js"]]، و [[npm uninstall nodemon dotenv]]، وتشيل [[import "dotenv/config"]] أو [[require("dotenv").config()]] من أول الكود.

لما تشغّل [[npm run dev]] وتعدّل ملف، هتشوف في الترمنال [[Restarting 'src/server.js']] والسيرفر يقوم تاني. و [[--watch]] بيراقب الملفات اللي السيرفر عملها import بس، فتعديل في README مش هيعمل restart.

لو شلت dotenv والـ متغيرات بقت [[undefined]]: نسيت [[--env-file]] في سكربت تاني زي [[db:seed]] أو [[start]]. وخلي بالك إن [[--watch]] مش بيراقب [[.env]] نفسه في كل النسخ؛ لو غيّرت .env اعمل restart بإيدك أو ضيف [[--watch-path]]. ولو السطر قال [[bad option]]، نسخة Node قديمة (محتاج 20.6+ للـ env-file و 22 عشان الاتنين يبقوا stable).`
        },
        {
          cmd: "npx tsx",
          title: "شغّل ملف TypeScript على طول",
          desc: R`سكربت إداري بـ TypeScript (فحص القاعدة، عمل أدمن، تنضيف داتا) مش محتاج build. [[npx tsx scripts/x.ts]] بيشغّله مباشرة وبيستخدم نفس الأنواع و Prisma client اللي في المشروع.

ولو هتشغّله على السيرفر جوه container، اتأكد إن tsx والسكربت نفسه موجودين في الـ image أصلًا.`,
          example: R`npx tsx scripts/check-db.ts
npx tsx scripts/create-admin.ts --email you@example.com
# في package.json: "db:validate": "tsx scripts/validate-schema.ts"
npm run db:validate
docker compose exec app ls scripts node_modules/.bin/tsx
docker compose exec app npx tsx scripts/run-fix.ts`,
          try: "اكتب scripts/hello.ts فيه type وسطر console.log، وشغّله بـ [[npx tsx]]، وبعدين حط فيه خطأ أنواع واضح ولاحظ إنه برضه بيشتغل.",
          deep: {
            why: "مشروعك TypeScript، والسكربتات الصغيرة عايزة تستورد من الكود نفسه. تكتبها JS تخسر الأنواع، وتعمل لها build كل مرة تعب. tsx بيشغّلها زي ما هي.",
            how: R`tsx بيحوّل الـ TS لـ JS في الذاكرة بـ esbuild ويشغّله بـ Node، وبيفهم ESM و CommonJS والـ paths. مش بيفحص الأنواع، فالسكربت ممكن يشتغل وفيه خطأ أنواع، والفحص شغل tsc.

[[npx tsx]] بيستخدم النسخة اللي في devDependencies. لو مش متسطّبة، npx هيسألك ينزّلها، ومن غير ترمنال تفاعلي (CI أو سكربت) مبيسألش أصلًا: بيفترض yes وينزّل آخر نسخة من النت من غير ما تاخد بالك، أو يفشل لو مفيش نت. عشان كده حطها في devDependencies، والأحسن سكربت في package.json زي [[db:validate]] عشان الفريق كله يشغّله بنفس الشكل.

جوه container الإنتاج: الـ image غالبًا متبنية من غير devDependencies، أو standalone في Next، فلا tsx موجود ولا فولدر scripts. أول أمر docker في المثال بيتأكد قبل ما تعتمد عليه. الحلول: stage منفصلة للأدوات، أو تكتب السكربتات الحرجة .mjs عادية.

[[ts-node]] البديل القديم: أبطأ لأنه بيفحص الأنواع، ومشاكله مع ESM كتير.`,
            when: "سكربتات seed وفحص القاعدة والصيانة في مشروع TypeScript. مش لتشغيل السيرفر في الإنتاج.",
            mistakes: "تفترض إن السكربت شغال عشان tsx مطلعش خطأ، وهو فيه خطأ أنواع. وتكتب في دليل التشغيل «docker compose exec app npx tsx ...» والـ image مفيهاش tsx ولا السكربت، فالأمر بيفشل يوم ما تحتاجه."
          },
          teach: R`## شغّل [[.ts]] من غير build

[[tsx]] بيشيل الأنواع من الملف ويشغّل الـ JS اللي فاضل، من غير ما يفحص الأنواع. اتجرّب على ويندوز 11 (Node 24.19، tsx 4.23 و TypeScript 7.0 في devDependencies)، وجزء الـ container على [[node:22-slim]].

---

## ١. [[npx tsx scripts/check-db.ts]]

[[npx]] بيلاقي [[tsx]] في [[node_modules/.bin]] بتاع المشروع ويشغّله على الملف. جرّبته على ملف أنواعه غلط عن قصد:

~~~text scripts/hello.ts
type User = { name: string; age: number };
const u: User = { name: "Sara", age: "28" };
console.log("hello", u.name, typeof u.age);
~~~

- [[type User = {...}]] شكل الـ object: [[name]] نص و [[age]] رقم.
- [[const u: User]] المتغير ده لازم يطابق الشكل، بس [[age]] نص [["28"]]: غلط.
- [[typeof u.age]] بيطبع النوع الحقيقي وقت التشغيل.

~~~text الناتج: npx tsx scripts/hello.ts
hello Sara string
~~~

و exit 0. tsx شغّله عادي ولا قال حاجة عن الغلطة.

---

## ٢. [[npx tsx scripts/create-admin.ts --email you@example.com]]

اللي بعد اسم الملف بيوصل للسكربت في [[process.argv]]:

~~~text scripts/create-admin.ts
import { parseArgs } from "node:util";
const { values } = parseArgs({ options: { email: { type: "string" } } });
console.log("creating admin:", values.email);
~~~

[[parseArgs]] (جوه Node) بيقرا [[--email قيمة]] ويحطها في [[values.email]]:

~~~text الناتج
creating admin: you@example.com
~~~

---

## ٣. [[npm run db:validate]]

السكربت في package.json: [["db:validate": "tsx scripts/validate-schema.ts"]]. جرّبته على [[hello.ts]]:

~~~text الناتج
> ldev@1.0.0 db:validate
> tsx scripts/hello.ts

hello Sara string
~~~

جوه السكربت مفيش [[npx]] لأن npm بيضيف [[node_modules/.bin]] للـ PATH لوحده. وده أحسن من [[npx tsx]] في دليل التشغيل: لو tsx مش متسطّب، السكربت يقع بوضوح بدل ما [[npx]] ينزّل أي نسخة من النت.

---

## الفحص خطوة لوحدها: [[tsc --noEmit]]

~~~powershell
npx tsc --noEmit --strict scripts/hello.ts
~~~

~~~text الناتج (TypeScript 7، والمشروع فيه tsconfig.json)
error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
~~~

TypeScript 7 بيرفض تديله اسم ملف والمشروع فيه [[tsconfig.json]]. الحل اللي بيقوله:

~~~powershell
npx tsc --noEmit --strict --ignoreConfig scripts/hello.ts
~~~

~~~text الناتج
scripts/hello.ts(2,33): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

[[(2,33)]] سطر ٢ حرف ٣٣، عند [["28"]]. (في فولدر من غير tsconfig الأمر الأولاني بيدّي نفس الـ error على طول.) الأحسن في مشروع حقيقي تضيف [[scripts]] في [[include]] بتاع tsconfig وتشغّل [[npx tsc --noEmit]] من غير أسماء ملفات.

---

## ٤. [[docker compose exec app ls scripts node_modules/.bin/tsx]]

- [[docker compose exec app]] نفّذ أمر جوه container الخدمة [[app]] اللي شغالة.
- [[ls scripts node_modules/.bin/tsx]] الفولدر والأداة موجودين؟

ماعنديش compose شغال هنا، فجرّبت نفس السؤال على container Node فاضي (زي image إنتاج متبنية من غير devDependencies):

~~~text الناتج
ls: cannot access 'scripts': No such file or directory
ls: cannot access 'node_modules/.bin/tsx': No such file or directory
~~~

exit 2. لو ده الناتج، الأمر الأخير هيفشل.

---

## ٥. [[docker compose exec app npx tsx scripts/run-fix.ts]]

بيشغّل السكربت جوه الـ container، فبيوصل لقاعدة البيانات بنفس متغيرات البيئة اللي التطبيق شايفها. بيشتغل بس لو الخطوة ٤ لقت الاتنين.

---

## الخلاصة

| | [[tsx]] | [[tsc --noEmit]] |
|---|---|---|
| بيشغّل الكود | أيوه | لأ |
| بيفحص الأنواع | لأ | أيوه |
| إمتى | سكربتات وتطوير | CI وقبل الـ commit |

> «السكربت اشتغل» مش معناه إن الأنواع صح.`,
          lines: [
            "شغّل سكربت TS مباشرة.",
            "ومرّر له arguments عادي.",
            "نفس الحاجة من سكربت متسجّل في package.json.",
            "قبل ما تعتمد عليه في الـ container: tsx والسكربت موجودين؟",
            "شغّل السكربت جوه container التطبيق."
          ],
          sol: R`[[scripts/hello.ts]] فيه [[type User = { name: string; age: number }]] وسطر بيطبع. [[npx tsx scripts/hello.ts]] بيطبع [[hello Sara]].

بعد ما تحط [[age: "28"]] (نص بدل رقم): [[tsx]] برضه بيشتغل ويطبع [[hello Sara string]] و exit 0. tsx بيشيل الأنواع ويشغّل، مش بيفحصها. نفس الملف مع [[npx tsc --noEmit --strict scripts/hello.ts]] بيقول [[error TS2322: Type 'string' is not assignable to type 'number'.]] (ولو المشروع فيه tsconfig.json، TypeScript 7 بيرفض اسم الملف بـ [[error TS5112]]؛ ضيف [[--ignoreConfig]].)

الدرس: tsx للتشغيل السريع، و [[tsc --noEmit]] في CI أو قبل الـ commit للفحص. والغلط الشائع إنك تعتمد على إن «السكربت اشتغل» كدليل إن الأنواع صح.`,
          solCode: R`// scripts/hello.ts
type User = { name: string; age: number };
const u: User = { name: "Sara", age: "28" };
console.log("hello", u.name, typeof u.age);

// الترمنال
npx tsx scripts/hello.ts
npx tsc --noEmit --strict scripts/hello.ts`
        },
        {
          cmd: "concurrently و wait-on",
          title: "كذا سيرفر في ترمنال واحد وبالترتيب",
          desc: R`الباك إند والفرونت في مشروع واحد، ومش عايز تفتح ترمنالين. [[concurrently]] بيشغّل كذا أمر مع بعض بألوان وأسامي، و [[-k]] بيقفلهم كلهم لو واحد وقف. و [[wait-on]] بيستنى بورت أو URL يفتح قبل ما يشغّل الأمر اللي بعده.

و [[cross-env]] بيحط متغير بيئة بطريقة شغالة على ويندوز ولينكس.`,
          example: R`"scripts": {
  "dev": "concurrently -k -n api,web -c blue,green \"npm:dev:api\" \"npm:dev:web\"",
  "dev:api": "node --watch --env-file=.env api/server.js",
  "dev:web": "wait-on tcp:127.0.0.1:4000 && cross-env VITE_API_URL=http://localhost:4000 vite --strictPort"
}`,
          try: "سطّب [[npm i -D concurrently wait-on cross-env]]، وحط السكربتات دي، وشغّل [[npm run dev]]، وبعدين Ctrl+C مرة واحدة واتأكد إن البورتين اتقفلوا.",
          flag: "script",
          deep: {
            why: "من غير الأدوات دي: ترمنال للـ API وترمنال للفرونت، والفرونت بيقوم قبل الـ API فأول طلبات بتفشل، ولما تقفل واحد التاني بيفضل ماسك البورت.",
            how: R`[[concurrently]] بيشغّل كل أمر في عملية لوحده وبيجمع الخرج في ترمنال واحد، وقبل كل سطر اسم العملية ([[-n]]) بلون ([[-c]]). و [[npm:dev:api]] اختصار لـ [[npm run dev:api]]، و [[npm:dev:*]] بيشغّل كل السكربتات اللي بتبدأ بـ dev:.

[[-k]] (kill-others): أول ما عملية تخرج، الباقي يتقفل. من غيره لو الـ API وقع بخطأ، الفرونت يفضل شغال وانت فاكر كل حاجة تمام.

[[wait-on]] بيفضل يحاول لحد ما المورد يبقى جاهز: [[tcp:127.0.0.1:4000]] بورت مفتوح، [[http://localhost:4000/health]] رد 2xx، أو ملف اتعمل. وبعدين [[&&]] بتشغّل اللي بعده.

في مشروع حقيقي لتطبيق Electron كان نفس النمط: vite و [[wait-on tcp:5199 && electron .]]، عشان نافذة Electron متفتحش على صفحة فاضية قبل ما Vite يقوم.

[[cross-env]]: سطر [[VITE_API_URL=... vite]] شغال في bash بس، وسكربتات npm على ويندوز بتشتغل بـ cmd. cross-env بيخليها تشتغل في الاتنين.`,
            when: "مشروع فيه أكتر من عملية وقت التطوير: API وفرونت، أو Vite و Electron، أو سيرفر و worker.",
            mistakes: R`[[wait-on tcp:localhost:4000]] وسيرفرك سامع على 127.0.0.1: من Node 17 localhost ممكن يتحل لـ ::1 (IPv6)، فـ wait-on يستنى للأبد. اكتب 127.0.0.1 صريح. وغلطة تانية: Vite لقى البورت مشغول فقام على بورت تاني، والـ wait-on لسه مستني البورت القديم، عشان كده [[--strictPort]] بيخليه يفشل بدل ما يغيّر.`
          },
          teach: R`## ٣ سكربتات بيشتغلوا مع بعض

[[dev]] بيشغّل الاتنين التانيين في نفس الوقت. [[dev:api]] سيرفر Node، و [[dev:web]] بيستنى الـ API يفتح وبعدين يشغّل Vite. اتجرّب على ويندوز 11 (Node 24.19، Vite 8.3) بعد [[npm i -D concurrently wait-on cross-env]]، و [[api/server.js]] سيرفر بيسمع على [[127.0.0.1]] والبورت من [[.env]] ([[PORT=4000]]).

---

## ١. [[dev:api]]

~~~text
"dev:api": "node --watch --env-file=.env api/server.js"
~~~

سيرفر بيعيد نفسه مع كل تعديل ويقرا [[.env]] (درس «node --watch --env-file»).

---

## ٢. [[dev:web]]

~~~text
"dev:web": "wait-on tcp:127.0.0.1:4000 && cross-env VITE_API_URL=http://localhost:4000 vite --strictPort"
~~~

بالترتيب:

| الحتة | بتعمل إيه |
|---|---|
| [[wait-on tcp:127.0.0.1:4000]] | حاول تتصل بالبورت ده كل شوية، ولما يقبل اخرج بنجاح |
| [[&&]] | كمّل بس لو wait-on نجح |
| [[cross-env VITE_API_URL=...]] | حط المتغير ده للأمر اللي بعده، بطريقة شغالة في cmd و sh |
| [[vite]] | سيرفر التطوير |
| [[--strictPort]] | لو 5173 مشغول اقع، متروحش لبورت تاني |

[[tcp:]] = اتصال على البورت. ممكن كمان [[http://localhost:4000/health]] (يستنى رد 2xx) أو اسم ملف.

ليه [[cross-env]]؟ [[VITE_API_URL=... vite]] شكل bash، و npm على ويندوز بيشغّل السكربتات بـ cmd اللي مش فاهمه. و [[VITE_]] في أول الاسم لازمة عشان Vite يعدّي المتغير لكود المتصفح في [[import.meta.env.VITE_API_URL]].

---

## ٣. [[dev]]

~~~text
"dev": "concurrently -k -n api,web -c blue,green \"npm:dev:api\" \"npm:dev:web\""
~~~

| الحتة | معناها |
|---|---|
| [[concurrently]] | شغّل كذا أمر مع بعض في ترمنال واحد |
| [[-k]] | kill-others: لو واحد خرج، اقفل الباقي |
| [[-n api,web]] | الأسامي اللي بتظهر قبل كل سطر |
| [[-c blue,green]] | لون كل اسم |
| [[\"npm:dev:api\"]] | [[npm:]] اختصار [[npm run]]. و [[\"]] علامة تنصيص جوه نص JSON |

### الناتج

~~~text الناتج: npm run dev
> concurrently -k -n api,web -c blue,green "npm:dev:api" "npm:dev:web"

[api] > node --watch --env-file=.env api/server.js
[web] > wait-on tcp:127.0.0.1:4000 && cross-env VITE_API_URL=http://localhost:4000 vite --strictPort
[api] api on 4000
[web]   VITE v8.3.3  ready in 269 ms
[web]   ➜  Local:   http://localhost:5173/
~~~

الاتنين بدأوا مع بعض، بس Vite ماقامش غير بعد [[api on 4000]]. و [[curl 127.0.0.1:4000]] رد [[api ok]].

### القفل

وقفت [[web]] من برا (بـ [[timeout]]، اللي بيبعت SIGTERM):

~~~text الناتج
[web] npm run dev:web exited with code 143
--> Sending SIGTERM to other processes..
[api] npm run dev:api exited with code 143
~~~

[[143]] = 128 + 15، و 15 رقم SIGTERM: يعني «اتقفل بإشارة» مش «وقع بخطأ». وبسبب [[-k]] concurrently قفل [[api]] لوحده، وبعدها [[netstat]] مالقاش حاجة على 4000 ولا 5173. مع Ctrl+C الرقم بيبقى SIGINT بدل 143، والفكرة واحدة.

---

## الخلاصة

| الأداة | المشكلة اللي بتحلها |
|---|---|
| [[concurrently -k]] | ترمنال واحد، وقفلة واحدة للكل |
| [[wait-on]] | الفرونت مايقومش قبل الـ API |
| [[cross-env]] | متغير بيئة في سكربت شغال على ويندوز ولينكس |
| [[--strictPort]] | Vite مايغيّرش البورت من وراك |

> اكتب [[127.0.0.1]] صريح في wait-on: [[localhost]] ممكن يتحل لـ [[::1]] والسيرفر سامع على IPv4 بس.`,
          lines: [
            "بداية السكربتات.",
            "شغّل الاتنين مع بعض بأسامي وألوان، و -k يقفلهم سوا.",
            "الـ API بيعيد نفسه مع كل تعديل.",
            "استنى الـ API يفتح، وبعدين شغّل Vite بمتغير شغال على أي نظام، ومن غير ما يغيّر البورت.",
            "قفلة."
          ],
          sol: R`[[npm run dev]] بيطبع سطور كل واحد بلونه واسمه: [[[api] api on 4000]] وبعدين [[[web]]] بيستنى لحد ما البورت يفتح، ويقوم Vite بـ [[VITE_API_URL]] مظبوط.

Ctrl+C مرة واحدة: [[[api] npm run dev:api exited with code SIGINT]] و [[--> Sending SIGTERM to other processes..]] و [[[web] npm run dev:web exited with code SIGINT]]. وبعدها [[lsof -i :4000 -i :5173]] مش بيطبع حاجة: البورتين اتقفلوا.

لو بعد Ctrl+C لقيت بورت لسه مفتوح، يبقى [[-k]] ناقصة، وبعدها [[npm run dev]] التاني هيقع بـ EADDRINUSE. ولو [[web]] فضل مستني للأبد، اتأكد إن الـ api فعلًا على [[127.0.0.1:4000]] (لو بيسمع على IPv6 بس أو بورت تاني [[wait-on]] مش هيلاقيه). و [[--strictPort]] بيخلي Vite يقع لو 5173 مشغول بدل ما يفتح على 5174 من غير ما تاخد بالك.`
        },
        {
          cmd: "--host و Network URL",
          title: "افتح موقعك من الموبايل وهو لسه على جهازك",
          desc: R`سيرفر التطوير غالبًا بيسمع على localhost بس، فالموبايل مش شايفه. [[--host]] في Vite (أو [[-H 0.0.0.0]] في Next) بيخليه يسمع على كل الكروت، ويطبع سطر [[Network: http://192.168.1.x:5173]]. افتحه من موبايل على نفس الواي فاي.

ولو الصفحة مش بتفتح: الفايروول على جهازك غالبًا هو اللي مانع.`,
          example: R`npm run dev -- --host
npm run dev -- -H 0.0.0.0
ipconfig
hostname -I
# ويندوز (PowerShell أدمن): افتح البورت للشبكة الخاصة بس
New-NetFirewallRule -DisplayName "dev 5173" -Direction Inbound -Protocol TCP -LocalPort 5173 -Profile Private -Action Allow`,
          try: "شغّل مشروع Vite بـ [[--host]]، وافتح رابط Network من موبايلك، وعدّل كلمة في الصفحة وشوف الموبايل بيتحدّث لوحده.",
          deep: {
            why: "الموقع شكله تمام في DevTools بمقاس موبايل، وعلى الموبايل الحقيقي الكيبورد بيغطي الفورم، واللمس مختلف، والخط أصغر. التجربة على جهاز حقيقي قبل الرفع بتوفّر كتير.",
            how: R`الـ [[--]] بتعدّي الفلاج للأداة نفسها مش لـ npm. Vite افتراضيًا على localhost بس، و [[--host]] بيخليه 0.0.0.0 (تقدر تحطها في vite.config: [[server.host: true]]). Next dev بيطبع Network لوحده غالبًا، و [[-H 0.0.0.0]] بيضمنها. ونفس الفلاج ده لازم جوه Docker، وإلا البورت المنشور مش هيوصل للسيرفر (شوف درس 127.0.0.1 و 0.0.0.0 في bash).

عنوان جهازك على الشبكة: [[ipconfig]] على ويندوز (IPv4 Address)، و [[hostname -I]] على لينكس. الاتنين لازم على نفس الشبكة.

ويندوز بيمنع الاتصالات الداخلة افتراضيًا، خصوصًا لو الشبكة متسجّلة Public. القاعدة في المثال بتفتح البورت على الشبكات الخاصة بس، فمش هيتفتح وانت على واي فاي كافيه.

Next الجديد ممكن يحذّر أو يمنع طلبات التطوير الجاية من origin تاني (زي IP جهازك من الموبايل)، والحل تضيفه في [[allowedDevOrigins]] في next.config.`,
            when: "قبل ما تسلّم أي صفحة للموبايل. ولما تورّي شغلك لحد جنبك من غير deploy.",
            mistakes: R`الفرونت بيكلّم [[http://localhost:4000]] للـ API: على الموبايل localhost هو الموبايل نفسه، فالصفحة تفتح والداتا لأ. استخدم proxy في Vite أو مسار نسبي. وميزات زي الكاميرا والموقع محتاجة secure context: localhost بيتحسب آمن، إنما http على IP لأ، فمحتاج tunnel بـ HTTPS. وواي فاي الضيوف بيعزل الأجهزة عن بعض، فمفيش حاجة هتوصل مهما عملت.`
          },
          teach: R`## خلّي سيرفر التطوير يسمع على الشبكة

سيرفر التطوير افتراضيًا بيسمع على جهازك بس. [[--host]] بيفتحه لأي جهاز على نفس الشبكة، والموبايل يفتح الموقع بـ IP جهازك. اتجرّب على ويندوز 11 بـ Vite 8.3 (على بورت 5291 عشان ماتعارضش مع حاجة شغالة)، و Next وسطر الفايروول من الـ docs.

---

## ١. [[npm run dev -- --host]]

[[--]] بتعدّي [[--host]] لـ vite نفسه مش لـ npm. من غيره:

~~~text الناتج
  ➜  Local:   http://localhost:5291/
  ➜  Network: use --host to expose
~~~

~~~cmd
netstat -ano | findstr :5291
~~~

~~~text الناتج
  TCP    [::1]:5291             [::]:0                 LISTENING       2220
~~~

[[[::1]]] هو localhost في IPv6: الجهاز ده بس. ومع [[--host]]:

~~~text الناتج
  ➜  Local:   http://localhost:5291/
  ➜  Network: http://192.168.1.15:5291/  Wi-Fi
  ➜  Network: http://172.29.160.1:5291/  vEthernet (WSL (Hyp…
~~~

~~~text الناتج: netstat
  TCP    0.0.0.0:5291           0.0.0.0:0              LISTENING       43516
  TCP    [::]:5291              [::]:0                 LISTENING       43516
~~~

[[0.0.0.0]] و [[[::]]] = كل كروت الشبكة. و Vite طبع رابط لكل كارت: [[Wi-Fi]] ده اللي الموبايل يستخدمه، و [[vEthernet (WSL ...)]] شبكة داخلية بين ويندوز و WSL مالهاش لازمة هنا.

---

## ٢. [[npm run dev -- -H 0.0.0.0]]

نفس الفكرة في Next: [[-H]] اختصار hostname، و [[0.0.0.0]] كل الكروت. (من الـ docs، Next ماتجربش هنا.)

---

## ٣. [[ipconfig]]: عنوانك على ويندوز

~~~text الناتج (جزء)
Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . . . . : 192.168.1.15
Ethernet adapter vEthernet (WSL (Hyper-V firewall)):
   IPv4 Address. . . . . . . . . . . : 172.29.160.1
~~~

خد [[IPv4 Address]] تحت الكارت اللي انت متوصل بيه (هنا [[Wi-Fi]]). عناوين [[192.168.x.x]] عناوين شبكة البيت، مش ظاهرة على النت.

---

## ٤. [[hostname -I]]: عنوانك على لينكس

[[-I]] (حرف كبير) كل عناوين الجهاز:

~~~text الناتج (جوه container)
172.17.0.3
~~~

هنا ده عنوان الـ container جوه شبكة Docker. على لابتوب لينكس هيطلع عنوانه على الواي فاي.

---

## ٥. [[New-NetFirewallRule ...]] (ماتشغّلش هنا)

بيضيف قاعدة دايمة في فايروول ويندوز، ومحتاج PowerShell أدمن، فشرحه من الـ docs:

| الحتة | معناها |
|---|---|
| [[-DisplayName "dev 5173"]] | الاسم اللي هتلاقيها بيه بعدين |
| [[-Direction Inbound]] | اتصالات جاية لجهازك |
| [[-Protocol TCP -LocalPort 5173]] | البورت ده بس |
| [[-Profile Private]] | على الشبكات المتسجلة Private بس (البيت) |
| [[-Action Allow]] | اسمح |

وقبلها شوف شبكتك متسجّلة إيه:

~~~powershell
Get-NetConnectionProfile | Select-Object NetworkCategory
~~~

~~~text الناتج
NetworkCategory
---------------
         Public
~~~

على الجهاز ده الواي فاي متسجّل [[Public]]، فالقاعدة بـ [[-Profile Private]] مش هتفرق لحد ما تغيّر الشبكة لـ Private من إعدادات ويندوز. وتشيلها لما تخلص بـ [[Remove-NetFirewallRule -DisplayName "dev 5173"]].

---

## الخلاصة

| الخطوة | ويندوز | لينكس |
|---|---|---|
| افتح السيرفر للشبكة | [[npm run dev -- --host]] | نفس الأمر |
| عنوانك | [[ipconfig]] | [[hostname -I]] |
| الفايروول | [[New-NetFirewallRule]] (أدمن) | غالبًا مفتوح، أو [[ufw]] |

> الموبايل لازم على نفس الواي فاي، والكود لازم مايكلّمش [[localhost]] للـ API: localhost على الموبايل هو الموبايل نفسه.`,
          lines: [
            "Vite: اسمع على كل الكروت واطبع رابط Network.",
            "Next: نفس الحاجة.",
            "عنوان جهازك على الشبكة (ويندوز).",
            "عنوان جهازك على الشبكة (لينكس).",
            "اسمح بالبورت في فايروول ويندوز على الشبكة الخاصة بس."
          ],
          sol: R`مع [[npm run dev -- --host]] Vite بيطبع سطرين: [[➜ Local: http://localhost:5173/]] و [[➜ Network: http://192.168.1.15:5173/]]. الموبايل على نفس الواي فاي بيفتح رابط Network، ولما تحفظ تعديل في الكود الصفحة على الموبايل بتتحدث لوحدها (HMR).

لو الموبايل مش بيفتح: يا مش على نفس الشبكة (أو شبكة ضيوف معزولة)، يا فايروول ويندوز بيقفل البورت (ودا سطر [[New-NetFirewallRule]] في المثال، والشبكة لازم تكون Private مش Public). ولو بتشتغل في WSL، الـ IP اللي Vite طلّعه هو IP الـ WSL الداخلي؛ استخدم IP ويندوز من [[ipconfig]] مع [[networkingMode=mirrored]]، أو port forwarding.

ولو الصفحة فتحت بس الـ API calls فشلت، يبقى الكود بيكلم [[localhost:4000]]، والـ localhost على الموبايل هو الموبايل نفسه. استخدم الـ proxy بتاع Vite أو IP الجهاز.`
        }
      ]
    }
]);
