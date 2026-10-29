// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Deno 2: صلاحيات وأدوات جاهزة",
      l: 2,
      n: "Deno مبيسمحش للكود يقرا ملف أو يكلم النت غير لما انت تسمح، وجواه formatter و linter و test runner، وبيستخدم مكتبات npm",
      items: [
        {
          cmd: "deno run والصلاحيات",
          title: "Deno مش بيدّي الكود صلاحيات غير لما تقول",
          desc: R`أي سكربت في Deno بيبدأ **من غير صلاحيات**: مينفعش يقرا ملف ولا متغير بيئة ولا يكلم النت. بتدّيله بالظبط اللي محتاجه: [[--allow-read=data.txt]] و [[--allow-env=HOME]] و [[--allow-net=example.com]]. و [[-A]] بيدّيله كله.

لو مفيش صلاحية: في ترمنال بيسألك [[Allow? [y/n/A]]]، ومن غير ترمنال (CI أو Docker) بيقع على طول بـ [[NotCapable]]. اتجرّب بـ Deno 2.9.8.`,
          example: R`deno run main.ts
deno run --allow-read=data.txt main.ts
deno run --allow-read=data.txt --allow-env=USERNAME,USER --allow-net=example.com main.ts
deno run -A main.ts
# Linux و Mac:
curl -fsSL https://deno.land/install.sh | sh
# Windows (PowerShell):
irm https://deno.land/install.ps1 | iex`,
          try: R`اعمل [[main.ts]] بيقرا [[data.txt]] بـ [[Deno.readTextFile]]، ويطبع [[Deno.env.get("HOME")]]، ويعمل [[fetch("https://example.com")]]. شغّله من غير ولا flag، وبعدين زوّد الصلاحيات واحدة واحدة لحد ما يشتغل. وبعدين جرّب [[--allow-net=example.com]] والكود بيكلم [[example.org]].`,
          deep: {
            why: R`في Node أي مكتبة في [[node_modules]] (أو مكتبة جواها) تقدر تقرا [[~/.ssh]] وتبعته لأي سيرفر، ومحدش هيسألك. Deno بيقلب القاعدة: الكود معندوش حاجة لحد ما انت تسمح، والصلاحية محددة بالاسم (ملف معين، دومين معين).`,
            how: R`كل API حساس بيسأل الـ permission system قبل ما يشتغل: [[Deno.readTextFile]] بيسأل عن read، و [[fetch]] عن net، و [[Deno.env.get]] عن env، وكمان [[--allow-write]] و [[--allow-run]] (تشغيل برامج) و [[--allow-ffi]] و [[--allow-sys]]. نفس الكلام على APIs بتاعة Node جوه Deno ([[node:fs]] مثلًا).

لو الصلاحية مش موجودة: لو فيه ترمنال تفاعلي (TTY) بيوقف ويسألك، ولو لأ بيرمي [[NotCapable]] ويقع بـ exit code 1. و [[--allow-net=example.com]] بيسمح لـ [[example.com:443]] بس، مش [[example.org]]. و [[-A]] = [[--allow-all]].

الحماية دي على **الكود**، مش sandbox كامل: لو ادّيت [[--allow-run]]، الكود يقدر يشغّل أي برنامج، والبرنامج ده مش عليه قيود Deno.`,
            when: R`سكربتات بتنزّلها أو بتجرّبها، وأدوات CLI، وأي حاجة بتعمل [[npm:]] لمكتبات مش واثق فيها. وفي الإنتاج: اكتب الصلاحيات بالظبط في [[deno.json]] (درس [[deno.json و npm:]]) بدل [[-A]].`,
            mistakes: R`[[-A]] في كل حتة عشان «يشتغل وخلاص»، فخسرت الميزة الوحيدة الكبيرة. و [[--allow-read]] من غير مسار = كل الديسك. وتنسى إن [[--allow-run]] أو [[--allow-ffi]] بيفتحوا كل حاجة عمليًا. وفي Docker أو CI تستنى الـ prompt: مفيش ترمنال، فبيقع على طول.`
          },
          teach: R`## الملف اللي هنشغّله

~~~text main.ts
const text = await Deno.readTextFile("data.txt");
console.log("file:", text.trim());
console.log("user:", Deno.env.get("USERNAME") ?? Deno.env.get("USER"));
const res = await fetch("https://example.com");
console.log("net:", res.status);
~~~

٣ حاجات حساسة: يقرا ملف، ويقرا متغير بيئة ([[USERNAME]] على ويندوز، [[USER]] على لينكس، والـ [[??]] معناها «لو الأول مش موجود خد التاني»)، ويكلم النت. اتجرّب على ويندوز 11 بـ Deno 2.9.8 (نسخة portable)، والـ prompt جوه [[denoland/deno]] على لينكس.

---

## ١. [[deno run main.ts]]: من غير صلاحيات

~~~text الناتج (من غير ترمنال تفاعلي)
error: Uncaught (in promise) NotCapable: Requires read access to "data.txt", run again with the --allow-read flag
const text = await Deno.readTextFile("data.txt");
                        ^
~~~

وقع من أول سطر. [[NotCapable]] = «مش مسموحلك». ورسالته بتقولك الـ flag اللي ناقص.

### ولو فيه ترمنال

~~~text الناتج (لينكس، ترمنال تفاعلي)
┏ ⚠️  Deno requests read access to "data.txt".
┠─ Requested by $__btDeno.readFile()$__bt API.
┠─ Run again with --allow-read to bypass this prompt.
┗ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all read permissions) > y
✅ Granted read access to "data.txt".
file: hello from file
┏ ⚠️  Deno requests env access to "USERNAME".
┗ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all env permissions) > n
❌ Denied env access to "USERNAME".
error: Uncaught (in promise) NotCapable: Requires env access to "USERNAME", run again with the --allow-env flag
~~~

[[y]] = اسمح المرة دي، و [[n]] = ارفض، و [[A]] = اسمح لكل حاجة من النوع ده (كل الملفات مثلًا).

---

## ٢. [[--allow-read=data.txt]]

~~~text الناتج
file: hello from file
error: Uncaught (in promise) NotCapable: Requires env access to "USERNAME", run again with the --allow-env flag
~~~

السطر الأول عدّى، ووقع عند اللي بعده. [[=data.txt]] معناها «الملف ده بس»، مش كل الديسك.

---

## ٣. التلات صلاحيات

~~~bash
deno run --allow-read=data.txt --allow-env=USERNAME,USER --allow-net=example.com main.ts
~~~

~~~text الناتج
file: hello from file
user: ali
net: 200
~~~

| الـ flag | بيسمح بإيه بالظبط |
|---|---|
| [[--allow-read=data.txt]] | قراية الملف ده بس |
| [[--allow-env=USERNAME,USER]] | المتغيرين دول بس (الفاصلة بتفصل) |
| [[--allow-net=example.com]] | الدومين ده بس |

### دومين غلط

غيّرت الـ URL لـ [[example.org]] وسبت نفس الـ flags:

~~~text الناتج
NotCapable: Requires net access to "example.org:443", run again with the --allow-net flag
~~~

[[:443]] بورت HTTPS. الصلاحية مربوطة بالاسم بالظبط.

---

## ٤. [[deno run -A main.ts]]

[[-A]] = [[--allow-all]]: كل حاجة. اشتغل زي التالت. ده بيلغي فكرة الصلاحيات، فخليه للتجربة السريعة بس.

---

## التسطيب (آخر سطرين)

- لينكس والماك: [[curl -fsSL https://deno.land/install.sh | sh]]. اتجرّب جوه [[node:22-slim]] (بعد [[apt-get install curl unzip]]) وطلع [[Deno was added to the PATH.]] و [[deno 2.9.8]].
- ويندوز: [[irm https://deno.land/install.ps1 | iex]] (من الـ docs). [[irm]] بينزّل السكربت، و [[iex]] بيشغّله.
- وفيه [[npm i -g deno]]، بس جرّبته وطلّع [[deno 2.9.6]] والرسمي [[2.9.8]]: نسخة npm بتتأخر شوية.

## الخلاصة

| الصلاحية | الـ flag | أمثلة على اللي بتتحكم فيه |
|---|---|---|
| read / write | [[--allow-read]] / [[--allow-write]] | [[Deno.readTextFile]] و [[node:fs]] |
| net | [[--allow-net]] | [[fetch]] و [[Deno.serve]] |
| env | [[--allow-env]] | [[Deno.env.get]] و [[process.env]] |
| run | [[--allow-run]] | تشغيل برامج تانية (خطير) |
| all | [[-A]] | كله |

من غير ترمنال: مفيش سؤال، [[NotCapable]] على طول.`,
          lines: [
            R`بيشغّل [[main.ts]] من غير ولا صلاحية. أول ما الكود يحاول يقرا [[data.txt]]: في ترمنال تفاعلي Deno بيوقف ويسألك [[Allow? [y/n/A]]]، ومن غير ترمنال (CI أو Docker) بيقع على طول بـ [[NotCapable]] و exit code 1. ده مقصود: الكود معندوش أي حاجة لحد ما انت تسمح.`,
            R`[[--allow-read=data.txt]] بيسمح بقراية الملف ده بالاسم وبس، أي ملف تاني (زي [[~/.ssh]]) لسه ممنوع. الكود هيعدّي القراية ويقع عند أول حاجة تانية محتاجة صلاحية (متغير البيئة أو النت).`,
            R`بيدّي كل اللي الكود محتاجه بالظبط: قراية [[data.txt]]، وقراية متغيرين البيئة [[USERNAME]] (ويندوز) و [[USER]] (لينكس والماك) بس، والكلام مع [[example.com]] بس. كده بيشتغل، ولو مكتبة جواه حاولت تكلّم دومين تاني هتتمنع.`,
            R`[[-A]] = [[--allow-all]]: كل الصلاحيات من غير أي قيود، يعني زي Node بالظبط. مريح وانت بتجرّب كود بتاعك، بس بيلغي الحماية كلها، فمتستخدموش مع كود أو مكتبات مش واثق فيها ولا في الإنتاج.`,
            R`السكربت الرسمي للينكس والماك: [[curl -fsSL]] بينزّله بهدوء ويعتبر أي HTTP error فشل، و [[| sh]] بيشغّله. بيسطّب Deno في [[~/.deno/bin]]، فافتح ترمنال جديد عشان الـ PATH يتحدّث.`,
            R`السكربت الرسمي لويندوز (من الـ docs): [[irm]] (Invoke-RestMethod) بينزّل السكربت و [[iex]] (Invoke-Expression) بيشغّله في PowerShell. بيسطّب Deno لليوزر الحالي ويضيفه للـ PATH.`,
          ],
          sol: R`بالترتيب، على Deno 2.9.8:
• من غير flags: [[NotCapable: Requires read access to "data.txt"]].
• [[--allow-read=data.txt]]: يطبع [[file: hello from file]] ويقع عند [[Requires env access to "USERNAME"]].
• ومعاه [[--allow-env=USERNAME,USER]]: يطبع الاسم ويقع عند [[Requires net access to "example.com:443"]].
• ومعاه [[--allow-net=example.com]]: [[net: 200]].

ولو الكود بيكلم [[example.org]] والصلاحية [[example.com]]: [[NotCapable: Requires net access to "example.org:443"]]. الصلاحية بالاسم بالظبط.`
        },
        {
          cmd: "deno.json و npm:",
          title: "deno.json: المكتبات من npm و JSR، و tasks، والصلاحيات",
          desc: R`[[deno.json]] هو [[package.json]] بتاع Deno: فيه [[imports]] (اسم المكتبة ← مكانها)، و [[tasks]] (زي [[scripts]])، وكمان ممكن [[permissions]]. المكتبات بتيجي من npm بـ [[npm:zod]] أو من JSR (registry بتاع Deno لـ TypeScript) بـ [[jsr:@std/path]].

و [[deno add]] بيكتبهم في [[deno.json]] لوحده، والقفل في [[deno.lock]]. ومفيش [[node_modules]] افتراضيًا: المكتبات في كاش عام.`,
          example: R`deno init
deno add npm:zod jsr:@std/path
deno task app
deno run app.ts
deno install`,
          try: R`اعمل مشروع بـ [[deno init]]، وضيف [[npm:zod]] و [[jsr:@std/path]]. اكتب [[app.ts]] بيستورد [[z]] من [[zod]] و [[join]] من [[@std/path]]، و [[ms]] مباشرة من [[npm:ms@2]] من غير ما تضيفه. وبعدين ضيف task اسمه [[app]] بيشغّله بصلاحية قراية فولدر [[data]] بس.`,
          deep: {
            why: R`Deno 1 كان بيستورد من URLs بس، وده كان بيخلي مكتبات npm صعبة. Deno 2 بيفهم npm كويس (ومعاه [[package.json]] كمان)، فتقدر تستخدم zod و Express وغيرهم، وتحتفظ بالصلاحيات والأدوات الجاهزة.`,
            how: R`[[imports]] في [[deno.json]] هو import map: لما تكتب [[import { z } from "zod"]]، Deno بيبص في الخريطة يلاقي [["zod": "npm:zod@^4.6.7"]] فيجيبها من npm. وتقدر تكتب [[npm:ms@2]] مباشرة في الكود من غير خريطة، بس الخريطة أنضف (النسخة في مكان واحد).

JSR (jsr.io) registry للـ TypeScript: المكتبة بتتنشر كـ [[.ts]]، و [[@std/*]] هي المكتبة القياسية بتاعة Deno. [[deno.lock]] فيه النسخة بالظبط والـ integrity hash لكل مكتبة من الاتنين.

المكتبات بتتحفظ في كاش عام ([[DENO_DIR]])، ومفيش [[node_modules]] إلا لو المشروع فيه [[package.json]] (ساعتها [[deno install]] بيعمله) أو حطيت [["nodeModulesDir": "auto"]]. و [["permissions"]] في [[deno.json]] مع [[-P]] (جديد ولسه experimental) بيخلي الصلاحيات مكتوبة في الملف بدل الأمر.`,
            when: R`أي مشروع Deno. ولو عندك مشروع Node موجود: Deno بيقرا [[package.json]] بتاعه، و [[deno install]] بيعمل [[node_modules]]، و [[deno run]] بيشغّل الكود (جرّب قبل ما تعتمد).`,
            mistakes: R`تكتب [[npm:zod]] من غير نسخة في 10 ملفات، فكل ملف ممكن ياخد نسخة. حطها في [[imports]] مرة واحدة. وتتجاهل [[deno.lock]] في git. وتنسى إن [[-P]] بيقرا [["permissions"]] بس لو كتبته، و [[deno run app.ts]] لوحده مبيقرهاش، فبيقع.`
          },
          teach: R`## من [[deno init]] لمشروع بيستخدم npm

اتجرّب على ويندوز 11 بـ Deno 2.9.8، والكاش ([[DENO_DIR]]) في فولدر التجربة.

---

## ١. [[deno init]]

~~~text الناتج
✅ Project initialized

  # Run the server
  deno run --allow-net main.ts
  # Run the tests
  deno test
~~~

عمل ٣ ملفات: [[main.ts]] (سيرفر صغير، درس [[Deno.serve]])، و [[main_test.ts]]، و:

~~~text deno.json
{
  "tasks": {
    "dev": "deno run --watch --allow-net main.ts"
  },
  "imports": {
    "@std/assert": "jsr:@std/assert@1"
  }
}
~~~

---

## ٢. [[deno add npm:zod jsr:@std/path]]

~~~text الناتج (آخره)
Add npm:zod@4.6.7
Add jsr:@std/path@1.1.6
...
Dependencies:
+ jsr:@std/assert 1.0.19
+ jsr:@std/internal 1.0.14
+ jsr:@std/path 1.1.6
+ npm:zod 4.6.7
~~~

وفي النص طبع سطر [[Download https://jsr.io/@std/path/1.1.6/...]] لكل ملف: مكتبات JSR بتنزل كملفات [[.ts]] منفصلة. و [[deno.json]] بقى:

~~~text deno.json → imports
"@std/assert": "jsr:@std/assert@1",
"@std/path": "jsr:@std/path@^1.1.6",
"zod": "npm:zod@^4.6.7"
~~~

| البادئة | منين | مثال |
|---|---|---|
| [[npm:]] | registry بتاع npm | [[npm:zod@^4.6.7]] |
| [[jsr:]] | jsr.io (TypeScript) | [[jsr:@std/path@^1.1.6]] |

وعمل [[deno.lock]]، ومفيش [[node_modules]].

---

## ٣. [[app.ts]] و [[deno task app]]

~~~text app.ts
import { z } from "zod";
import { join } from "@std/path";
import ms from "npm:ms@2";

const User = z.object({ name: z.string().min(2), age: z.number().int() });
console.log(User.safeParse({ name: "S", age: 1.5 }).success);
console.log(join("data", "users.json"));
console.log(ms("2h"));
const text = await Deno.readTextFile(join("data", "users.json"));
console.log(JSON.parse(text).length, "users");
~~~

- [[from "zod"]] و [[from "@std/path"]]: أسامي قصيرة، والخريطة في [[imports]] بتقول منين.
- [[from "npm:ms@2"]]: مكتبة npm مباشرة من غير ما تكون في [[deno.json]]. [[@2]] = أي نسخة 2.x.

وضفت في [[deno.json]]:

~~~text deno.json (الإضافة)
"tasks": {
  "app": "deno run -P app.ts"
},
"permissions": {
  "default": {
    "read": ["./data"]
  }
}
~~~

[[-P]] = «خد الصلاحيات من [[permissions.default]]»: قراية فولدر [[data]] بس.

~~~text deno task app
Task app deno run -P app.ts
Warning Permissions in the config file is an experimental feature and may change in the future.
Download https://registry.npmjs.org/ms
false
data\users.json
7200000
2 users
~~~

- [[Task app ...]]: Deno بيطبع الأمر اللي بيشغّله.
- الـ [[Warning]]: [["permissions"]] في الملف لسه experimental في 2.9.
- [[Download .../ms]]: أول مرة بس، بعدها من الكاش.
- [[false]]: الاسم حرف واحد والسن كسر، فـ zod رفض.
- [[data\users.json]]: [[join]] استخدم [[\]] لأننا على ويندوز (على لينكس [[/]]).
- [[7200000]]: [[ms("2h")]] = ساعتين بالـ millisecond.

---

## ٤. [[deno run app.ts]] من غير [[-P]]

~~~text الناتج
NotCapable: Requires read access to "data\users.json", run again with the --allow-read flag
~~~

[["permissions"]] مبتشتغلش لوحدها: لازم [[-P]].

---

## ٥. [[deno install]]: مشروع فيه [[package.json]]

في فولدر فيه [[package.json]] و [[package-lock.json]] بتوع npm (٦٨ باكدج)، [[deno install]] عمل [[node_modules]] عشان الكود اللي بيستورد بالأسامي يلاقيها:

| | الوقت |
|---|---|
| أول مرة (نت بطيء) | 76.8 ثانية |
| تاني مرة (الكاش سخن) | **0.74 ثانية** |

و [[node_modules]] على أول مستوى فيه links للحاجات اللي في [[package.json]] بس ([[hono]] و [[zod]] و [[@hono]] ...)، والباكدجات الحقيقية كلها (حوالي ٧٠ فولدر) جوه فولدر داخلي [[node_modules/.deno]]، زي فكرة pnpm.

---

## الخلاصة

| npm | Deno |
|---|---|
| [[package.json → dependencies]] | [[deno.json → imports]]: خريطة من اسم المكتبة لمكانها ([[npm:]] أو [[jsr:]]) |
| [[package.json → scripts]] | [[deno.json → tasks]]: أوامر بأسامي، وكل واحد بصلاحياته |
| [[npm i zod]] | [[deno add npm:zod]]: يكتبها في [[imports]] ويقفل النسخة في [[deno.lock]] |
| [[npm run x]] | [[deno task x]]: يطبع الأمر الأول وبعدين يشغّله |
| [[package-lock.json]] | [[deno.lock]]: النسخة بالظبط والـ hash لكل مكتبة من npm و JSR |
| مفيش | [[permissions]] + [[-P]] |`,
          lines: [
            R`بيعمل مشروع جديد في الفولدر: [[deno.json]] (الإعدادات و tasks و imports)، و [[main.ts]] (سيرفر صغير)، و [[main_test.ts]] (اختبار ليه)، وبيطبع الأوامر اللي تشغّلهم بيها.`,
            R`بيضيف [[zod]] من npm و [[@std/path]] من JSR (registry بتاع Deno للـ TypeScript) في [[imports]] جوه [[deno.json]] بنسخة [[^]]، ويكتب النسخ بالظبط في [[deno.lock]]. بعدها الكود يكتب [[from "zod"]] بالاسم القصير، ومفيش [[node_modules]].`,
            R`بيشغّل الـ task اللي اسمه [[app]] من [[tasks]] في [[deno.json]] (زي [[npm run app]])، وبيطبع الأمر قبل ما يشغّله. الـ task هنا [[deno run -P app.ts]]، و [[-P]] بيقول خد الصلاحيات من [[permissions]] اللي في الملف (قراية [[data]] بس).`,
            R`نفس الملف من غير [[-P]]: الصلاحيات اللي في [[deno.json]] مبتتقريش لوحدها، فالكود مالوش أي صلاحية ويقع بـ [[NotCapable: Requires read access]]. يعني لازم يا [[-P]] يا [[--allow-read]] صريح في الأمر.`,
            R`في مشروع Node فيه [[package.json]]: بيقرا الـ dependencies ويعمل [[node_modules]] (المكتبات الحقيقية جوه [[node_modules/.deno]] زي فكرة pnpm)، عشان الكود اللي بيستورد بالأسامي يلاقيها. كده تقدر تشغّل مشروع Node موجود بـ Deno.`,
          ],
          sol: R`[[app.ts]] بالـ imports دي بيشتغل بـ [[deno task app]] وبيطبع:
[[false]] (zod رفض) ثم [[data\users.json]] ثم [[7200000]] ثم [[2 users]].

و task مكتوب كده:
[["app": "deno run -P app.ts"]]
مع [["permissions": { "default": { "read": ["./data"] } }]].
ولو شغّلته [[deno run app.ts]] من غير [[-P]]: [[NotCapable: Requires read access to "data\users.json"]].`
        },
        {
          cmd: "deno fmt و lint و test",
          title: "formatter و linter و test runner و type checker جوه Deno",
          desc: R`Deno جاي معاه الأدوات اللي في Node بتسطّبها لوحدها: [[deno fmt]] (زي prettier)، و [[deno lint]] (زي eslint)، و [[deno check]] (زي [[tsc --noEmit]])، و [[deno test]]. من غير config ولا devDependencies.

[[--check]] في [[fmt]] بيفحص بس من غير تعديل، ودي اللي في CI.`,
          example: R`deno fmt --check util.ts
deno fmt util.ts
deno lint util.ts
deno check util.ts
deno test`,
          try: R`اعمل [[util.ts]] فيه دالة async مفيهاش [[await]]، ومتغير [[let]] مش مستخدم، وفيه [[fetch(...)]] من غير [[await]]. شغّل الأوامر الخمسة بالترتيب. مين مسك الـ [[fetch]] اللي محدش مستنيه؟`,
          deep: {
            why: R`في Node، أول ساعة في أي مشروع بتروح في تسطيب وظبط prettier و eslint و typescript و vitest، وكل واحد بنسخة وملف config. في Deno دي أوامر موجودة، فالمشروع الصغير ياخد نفس الفحص من أول دقيقة.`,
            how: R`[[deno fmt]] و [[deno lint]] مكتوبين بـ Rust (الـ formatter مبني على dprint)، فسريعين. القواعد الافتراضية «recommended»، وتقدر تغيّرها في [[deno.json]] تحت [["fmt"]] و [["lint"]]. و [[deno lint]] بيشوف ملف ملف من غير ما يسأل TypeScript عن الأنواع، فمش بيمسك حاجات زي Promise محدش عمله await (ده محتاج type-aware lint، شوف تاب فحص الكود).

[[deno check]] بيشغّل TypeScript الحقيقي. و [[deno test]] بيلاقي [[*_test.ts]] و [[*.test.ts]] ويعمل [[check]] الأول قبل ما يشغّل. والاختبارات برضه بتحتاج صلاحيات: اختبار بيقرا ملف محتاج [[deno test --allow-read]].`,
            when: R`أي مشروع Deno: حط [[deno fmt --check]] و [[deno lint]] و [[deno check]] و [[deno test]] في CI. ولو مشروع Node، الأدوات دي ممكن تشتغل على ملفاته برضه، بس الفريق غالبًا متفق على eslint و prettier.`,
            mistakes: R`تحط [[deno fmt]] من غير [[--check]] في CI، فيعدّل على ماكينة الـ CI ويعدّي. وتفتكر إن [[deno lint]] نضيف = مفيش bugs: الـ [[fetch]] من غير await عدّى. وتفتكر إن [[deno run]] بيفحص الأنواع: مش بيفحصها (الفحص خطوة لوحدها)، عشان كده [[deno check]].`
          },
          teach: R`## الملف اللي هنفحصه

~~~text util.ts
export function slugify(s: string) {
    let unused = 1
    return s.trim().toLowerCase().replace(/\s+/g, "-")
}
export async function load(){
  fetch("https://example.com")
}
~~~

فيه شكل وحش (٤ مسافات و ٢، ومفيش [[;]])، ومتغير مش مستخدم، ودالة [[async]] مفيهاش [[await]]، و [[fetch]] محدش مستنيه. اتجرّب على ويندوز 11 بـ Deno 2.9.8.

---

## ١. [[deno fmt --check util.ts]]

~~~text الناتج
2 | -    let unused = 1
2 | +  let unused = 1;
3 | -    return s.trim().toLowerCase().replace(/\s+/g, "-")
3 | +  return s.trim().toLowerCase().replace(/\s+/g, "-");
5 | -export async function load(){
5 | +export async function load() {

error: Found 1 not formatted file in 1 file
~~~

[[-]] السطر الحالي، و [[+]] اللي المفروض يبقى. والـ exit code [[1]]. ومعدّلش الملف.

---

## ٢. [[deno fmt util.ts]]

عدّل الملف فعلًا:

~~~text util.ts بعد fmt
export function slugify(s: string) {
  let unused = 1;
  return s.trim().toLowerCase().replace(/\s+/g, "-");
}
export async function load() {
  fetch("https://example.com");
}
~~~

مسافتين، و [[;]]، ومسافة قبل [[{]]. الشكل بس، المعنى زي ما هو.

---

## ٣. [[deno lint util.ts]]

~~~text الناتج
error[no-unused-vars]: $__btunused$__bt is never used
 --> util.ts:2:9
  = hint: If this is intentional, prefix it with an underscore like $__bt_unused$__bt

error[prefer-const]: $__btunused$__bt is never reassigned
  = hint: Use $__btconst$__bt instead

error[require-await]: Async function 'load' has no 'await' expression or 'await using' declaration.
  = hint: Remove 'async' keyword from the function or use 'await' expression ...

Found 3 problems
Checked 1 file
~~~

| القاعدة | الغلط | الحل |
|---|---|---|
| [[no-unused-vars]] | متغير محدش بيستخدمه | امسحه، أو سمّيه [[_unused]] لو قاصد |
| [[prefer-const]] | [[let]] ومحدش بيغيّره | [[const]] |
| [[require-await]] | [[async]] من غير [[await]] | شيل [[async]] أو استنى حاجة |

[[2:9]] = السطر ٢، العمود ٩. وكل خطأ ليه رابط docs.

> اللي **ماتمسكش**: [[fetch(...)]] من غير [[await]]. لو الطلب فشل، الخطأ يضيع. [[deno lint]] بيشوف الملف من غير الأنواع، فميعرفش إن [[fetch]] بترجّع Promise. القاعدة دي ([[no-floating-promises]]) محتاجة type-aware lint.

---

## ٤. [[deno check util.ts]]

~~~text الناتج
Check util.ts
~~~

مفيش أخطاء أنواع (الكود صح من ناحية الأنواع، غلطه في المنطق). والـ exit code [[0]].

---

## ٥. [[deno test]]

على الاختبارات اللي [[deno init]] عملها:

~~~text الناتج
Check main_test.ts
running 2 tests from ./main_test.ts
returns html on / ... ok (10ms)
returns json on /api ... ok (693µs)

ok | 2 passed | 0 failed (16ms)
~~~

- [[Check main_test.ts]]: عمل type check الأول (عكس [[deno run]]).
- [[µs]] = microsecond، جزء من مليون من الثانية.
- الاختبار شكله: [[Deno.test("اسم", () => { assertEquals(a, b) })]] و [[assertEquals]] من [[@std/assert]].

---

## الخلاصة

| Deno | المقابل في Node | في CI |
|---|---|---|
| [[deno fmt]] | prettier | [[deno fmt --check]] |
| [[deno lint]] | eslint (من غير type-aware) | [[deno lint]] |
| [[deno check]] | [[tsc --noEmit]] | [[deno check .]] |
| [[deno test]] | vitest / [[node --test]] | [[deno test]] + الصلاحيات |`,
          lines: [
            R`[[--check]] بيفحص شكل الملف (المسافات والفواصل وعلامات التنصيص) ويطبع الفرق من غير ما يعدّل حاجة، ويخرج بـ exit code 1 لو الشكل مش مظبوط. ده اللي يتحط في CI، عشان يقع لو حد رفع كود مش متنسّق.`,
            R`نفس الفحص بس المرة دي بيعدّل الملف نفسه للشكل الموحّد (زي prettier). شغّله على جهازك قبل الـ commit، مش في CI.`,
            R`بيدوّر على أخطاء منطقية في الكود من غير ما يشغّله: متغير متعرّف ومش مستخدم، و [[let]] المفروض [[const]]، ودالة [[async]] مفيهاش [[await]]. هو بيشوف الملف لوحده من غير الأنواع، فمبيعرفش إن [[fetch]] من غير [[await]] غلطة.`,
            R`بيشغّل TypeScript الحقيقي على الملف ويطلّع أخطاء الأنواع زي [[tsc --noEmit]]. لازم لأن [[deno run]] بيشغّل الكود من غير ما يفحص الأنواع.`,
            R`بيدوّر على [[*_test.ts]] و [[*.test.ts]] ويعمل [[check]] للأنواع الأول، وبعدين يشغّل الاختبارات ويطبع [[ok]] أو [[FAILED]] لكل واحد. والاختبارات ليها صلاحيات زي أي كود: اختبار بيقرا ملف محتاج [[--allow-read]].`,
          ],
          sol: R`[[deno lint]] لقى 3: [[no-unused-vars]] و [[prefer-const]] على [[unused]]، و [[require-await]] على [[load]]. ومحدش مسك [[fetch(...)]] اللي من غير [[await]]: لا [[deno lint]] ولا [[deno check]] (الأنواع سليمة). ده محتاج قاعدة [[no-floating-promises]] اللي بتعرف الأنواع (typescript-eslint، أو nursery في Biome، شوف تاب فحص الكود).

والتصليح: [[export async function load() { await fetch("https://example.com"); }]]، وامسح [[unused]].`
        },
        {
          cmd: "Deno.serve",
          title: "سيرفر HTTP بـ Deno.serve و URLPattern",
          desc: R`[[Deno.serve(options, handler)]] بيشغّل سيرفر، والـ handler دالة واحدة بتاخد [[Request]] وترجّع [[Response]]. مفيش routing جاهز زي Bun، فبتفرّق بنفسك بـ [[new URL(req.url).pathname]] و [[req.method]]، وللمسارات اللي فيها [[:id]] فيه [[URLPattern]].

ومحتاج [[--allow-net]]. وفيه شكل تاني: [[deno serve file.ts]] لملف بيعمل [[export default { fetch }]].`,
          example: R`const users = [{ id: 1, name: "Sara" }, { id: 2, name: "Ali" }];
const userRoute = new URLPattern({ pathname: "/api/users/:id" });
Deno.serve({ port: 8000 }, async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/api/users" && req.method === "GET") {
    return Response.json(users);
  }
  if (url.pathname === "/api/users" && req.method === "POST") {
    const body = await req.json();
    const user = { id: users.length + 1, name: String(body.name) };
    users.push(user);
    return Response.json(user, { status: 201 });
  }
  const match = userRoute.exec(req.url);
  if (match) {
    const user = users.find((u) => u.id === Number(match.pathname.groups.id));
    return user ? Response.json(user) : Response.json({ error: "not found" }, { status: 404 });
  }
  return new Response("Not Found", { status: 404 });
});`,
          try: R`احفظ المثال [[server.ts]] وشغّله بـ [[deno run --allow-net=0.0.0.0:8000 server.ts]]. جرّب نفس طلبات درس [[Bun.serve]] بـ curl. وبعدين اعمل [[srv2.ts]] فيه [[export default { fetch(req) { ... } }]] وشغّله بـ [[deno serve --port 8001 srv2.ts]]: محتاج [[--allow-net]]؟`,
          flag: "script",
          deep: {
            why: R`[[Request]] و [[Response]] و [[URL]] و [[URLPattern]] معايير الويب نفسها، فالـ handler ده قريب جدًا من اللي هتكتبه لـ Bun و Cloudflare Workers. وعشان كده frameworks زي Hono بتشتغل فوقه من غير تعديل.`,
            how: R`[[Deno.serve]] بيسمع على [[0.0.0.0]] (كل الواجهات) والبورت اللي تديه (الافتراضي 8000)، وبيطبع [[Listening on http://localhost:8000/]]. كل طلب بينادي الـ handler، واللي يرجعه (أو Promise بيرجع [[Response]]) هو الرد.

[[URLPattern]] بيطابق URL مع شكل فيه أجزاء متغيرة: [[exec(url)]] بيرجّع [[null]] لو مفيش تطابق، أو object فيه [[pathname.groups.id]]. وهو API موجود في Chrome و Node 24 كمان.

[[deno serve]]: بدل ما الكود ينادي [[Deno.serve]]، الملف بيعمل [[export default { fetch }]] و Deno بيشغّله، وبيدّي صلاحية الـ net للعنوان اللي بيسمع عليه لوحده. وده نفس شكل Cloudflare Workers.`,
            when: R`API صغيرة أو webhook على Deno أو Deno Deploy. ولما الـ ifs تكتر، روح لـ Hono أو Oak: نفس [[Deno.serve]] تحت.`,
            mistakes: R`ترتيب الـ ifs غلط، فمسار عام يمسك قبل الخاص. وتقارن [[groups.id]] كأنه رقم: نص. وتنسى [[String(body.name)]]، فحد يبعت object مكان الاسم ويتحفظ زي ما هو. وتنسى [[--allow-net]] فيقع بـ [[NotCapable]] قبل ما يسمع.`
          },
          teach: R`## نفس API درس Bun، بطريقة Deno

اتجرّب على ويندوز 11 بـ Deno 2.9.8، والطلبات بـ [[curl.exe]].

---

## ١. التشغيل

~~~powershell
deno run --allow-net=0.0.0.0:8000 server.ts
~~~

~~~text الناتج
Listening on http://localhost:8000/
~~~

[[--allow-net=0.0.0.0:8000]]: اسمح بالسماع على البورت ده بس. [[0.0.0.0]] = كل واجهات الشبكة على الجهاز.

---

## ٢. أول سطرين

- [[users]]: داتا في الذاكرة للتجربة.
- [[new URLPattern({ pathname: "/api/users/:id" })]]: شكل مسار فيه جزء متغير اسمه [[id]]. بنعمله مرة بره الـ handler مش مع كل طلب.

---

## ٣. [[Deno.serve({ port: 8000 }, async (req) => { ... })]]

- أول argument: الإعدادات. التاني: الـ handler.
- [[async]]: عشان جواه [[await req.json()]].
- [[new URL(req.url)]]: [[req.url]] نص كامل [[http://localhost:8000/api/users?x=1]]، و [[URL]] بيفكّه: [[pathname]] = [[/api/users]]، و [[searchParams]] = الـ query.

---

## ٤. الـ ifs: الـ routing بإيدك

~~~text الناتج
curl http://localhost:8000/api/users              → [{"id":1,"name":"Sara"},{"id":2,"name":"Ali"}]
curl -X POST .../api/users -d '{"name":"Mona"}'   → {"id":3,"name":"Mona"} 201
~~~

- [[url.pathname === "/api/users" && req.method === "GET"]]: المسار **و** الـ method. الـ [[&&]] = «و».
- [[String(body.name)]]: أي حاجة العميل يبعتها تتحول نص. من غيرها، لو بعت [[{"name": {"admin": true}}]] هيتحفظ object.

---

## ٥. [[userRoute.exec(req.url)]]

~~~text الناتج
curl .../api/users/3   → {"id":3,"name":"Mona"}
curl .../api/users/9   → {"error":"not found"} 404
~~~

- [[exec]] بيرجّع [[null]] لو المسار مش [[/api/users/شيء]]، فالـ [[if (match)]] بيعدّيه.
- لو طابق: [[match.pathname.groups.id]] = [["3"]] (نص)، و [[Number(...)]] بيحوّله.
- آخر سطر: أي حاجة تانية 404.

---

## ٦. [[deno serve]]: الشكل التاني

~~~text srv2.ts
export default {
  fetch(req: Request) {
    return Response.json({ path: new URL(req.url).pathname });
  },
} satisfies Deno.ServeDefaultExport;
~~~

~~~powershell
deno serve --port 8001 srv2.ts
~~~

~~~text الناتج
deno serve: Listening on http://localhost:8001/
curl http://localhost:8001/hello  →  {"path":"/hello"}
~~~

- الملف مش بينادي [[Deno.serve]]: بيصدّر object فيه [[fetch]]، و [[deno serve]] بيشغّله.
- اشتغل **من غير [[--allow-net]]**: [[deno serve]] بيدّي صلاحية السماع لوحده.
- [[satisfies Deno.ServeDefaultExport]]: TypeScript يتأكد إن الـ object شكله صح، من غير ما يغيّر نوعه.
- [[export default { fetch }]] ده نفس شكل Cloudflare Workers و Bun (درس [[Hono على كل runtime]]).

---

## الخلاصة

| Bun | Deno |
|---|---|
| [[Bun.serve({ routes, fetch })]] | [[Deno.serve(opts, handler)]]: دالة واحدة لكل الطلبات، والتفريق عليك |
| [[routes]] جاهزة و [[req.params.id]] | [[URLPattern]] و [[match.pathname.groups.id]]: بتطابق المسار بنفسك، والـ id نص |
| من غير صلاحيات | [[--allow-net]] (أو [[deno serve]]) |
| [[export default { fetch }]] | [[deno serve file.ts]]: نفس شكل الملف، وصلاحية السماع بتيجي لوحدها |`,
          lines: [
            R`داتا تجربة في array في الذاكرة بدل قاعدة بيانات عشان المثال يبقى ملف واحد. أي حاجة تتضاف بتضيع لما السيرفر يقفل.`,
            R`[[URLPattern]] بيوصف شكل مسار فيه جزء متغير [[:id]]، وبيتعمل مرة واحدة بره الـ handler عشان ميتبنيش من الأول مع كل طلب. ده API قياسي موجود في المتصفحات و Node 24 كمان.`,
            R`[[Deno.serve]] بيشغّل سيرفر على بورت 8000 ويدّيله دالة واحدة لكل الطلبات: بتاخد [[Request]] وترجّع [[Response]]. محتاج [[--allow-net]] وانت بتشغّله، وإلا يقع قبل ما يسمع على البورت.`,
            R`[[req.url]] نص فيه العنوان كامل ([[http://localhost:8000/api/users?x=1]])، و [[new URL]] بيفكّه لأجزاء، فناخد منه [[pathname]] ([[/api/users]]) من غير الـ query string.`,
            R`مفيش routing جاهز زي Bun، فبنفرّق بنفسنا: المسار [[/api/users]] **و** الـ method [[GET]]. لازم الاتنين، وإلا [[POST]] على نفس المسار هيدخل هنا.`,
            R`بيرجّع الليستة JSON. [[Response.json]] بيعمل [[JSON.stringify]] ويحط [[Content-Type: application/json]]، و [[return]] بتنهي الـ handler فمحدش من الشروط اللي تحت يتنفّذ.`,
            R`قفلة شرط [[GET]].`,
            R`نفس المسار بس [[POST]]: إضافة user جديد.`,
            R`بيقرا الـ body ويحوّله object. لو الـ body مش JSON بيرمي exception، و [[Deno.serve]] بيمسكه ويطبعه ويرجّع 500 بدل ما السيرفر يقع.`,
            R`بيعمل user جديد: الـ id من طول الليستة + 1، و [[String(body.name)]] بيضمن إن الاسم نص حتى لو العميل بعت رقم. (لو مبعتش [[name]] خالص هيبقى النص [[undefined]]، فالتحقق الحقيقي محتاج zod زي درس Hono.)`,
            R`بيضيف الـ user للـ array، فالـ [[GET]] الجاي هيرجّعه.`,
            R`بيرجّع الـ user الجديد بـ [[201 Created]]، المعنى الصح لـ «اتعمل حاجة جديدة» بدل 200.`,
            R`قفلة شرط [[POST]].`,
            R`[[exec]] بيطابق الـ URL كله مع الشكل [[/api/users/:id]]: لو مطابق بيرجّع object فيه الأجزاء المتغيرة، ولو لأ بيرجّع [[null]].`,
            R`لو [[match]] مش [[null]] يبقى المسار شكله [[/api/users/<حاجة>]].`,
            R`الـ id بيبقى في [[match.pathname.groups.id]] كنص دايمًا ([["2"]])، فـ [[Number()]] لازم قبل [[===]] مع الـ id الرقمي، وإلا عمره ما هيلاقي حاجة.`,
            R`لو لقاه بيرجّعه، ولو لأ بيرجّع [[404]] بـ JSON فيه سبب واضح.`,
            R`قفلة شرط [[match]].`,
            R`أي مسار أو method تانية وصلت لحد هنا ملهاش handler، فبنرجّع [[404]]. من غير السطر ده الدالة ترجّع [[undefined]] و Deno يعتبرها error ويرد 500.`,
            R`قفلة الـ handler ونداء [[Deno.serve]].`,
          ],
          sol: R`الردود الحقيقية بـ Deno 2.9.8 على ويندوز:
[[GET /api/users]] ← [[[{"id":1,"name":"Sara"},{"id":2,"name":"Ali"}]]]
[[POST]] بـ [[{"name":"Mona"}]] ← [[{"id":3,"name":"Mona"} 201]]
[[GET /api/users/3]] ← [[{"id":3,"name":"Mona"}]]
[[GET /api/users/9]] ← [[{"error":"not found"} 404]]

و [[deno serve --port 8001 srv2.ts]] اشتغل من غير [[--allow-net]] وطبع [[deno serve: Listening on http://localhost:8001/]]، و [[/hello]] رجّع [[{"path":"/hello"}]].`
        }
      ]
    }
]);
