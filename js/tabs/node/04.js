// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "monorepo بـ pnpm",
      l: 2,
      n: "كذا تطبيق وباكدج مشتركة في ريبو واحد: الربط، والفلترة، والتشغيل مع بعض، والـ builds المقفولة",
      items: [
        {
          cmd: "pnpm-workspace.yaml و workspace:*",
          title: "باكدج مشتركة جوه نفس الريبو",
          desc: R`[[pnpm-workspace.yaml]] بيقول أنهي فولدرات باكدجات. وأي تطبيق عايز الكود المشترك بيكتب [[workspace:*]] بدل رقم نسخة، فـ pnpm بيربطه لينك للفولدر المحلي بدل ما يدوّر على npm.

والباكدج الداخلية ممكن تصدّر ملفات .ts مباشرة من غير build، والتطبيق اللي بيستوردها (Vite أو Next أو tsx) هو اللي بيترجمها.`,
          example: R`# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# apps/web/package.json
"dependencies": {
  "@myapp/shared": "workspace:*"
}

# packages/shared/package.json (من غير build)
"name": "@myapp/shared",
"exports": { ".": "./src/index.ts", "./types": "./src/types.ts" }`,
          try: "اعمل ريبو فيه apps/web و packages/shared، واربطهم بـ workspace:*، وشغّل [[pnpm install]]، وبعدين [[ls -l apps/web/node_modules/@myapp]] وشوف اللينك.",
          flag: "script",
          deep: {
            why: "عندك لعبة وسيرفر ولوحة أدمن، والتلاتة بيستخدموا نفس الأنواع ونفس الأسئلة. نسخ الكود بيخليه يتفرق، ونشره على npm تقيل. الـ workspace بيخليه مكان واحد وأي تعديل يبان في الكل فورًا.",
            how: R`[[pnpm install]] في الجذر بيقرا pnpm-workspace.yaml، ويسطّب لكل باكدج، ويربط اللي مكتوب لها [[workspace:*]] بلينك لفولدرها. [[*]] معناها «أي نسخة موجودة هنا». ولو الاسم مش موجود في الـ workspace، pnpm بيرفض بدل ما ينزّل باكدج بنفس الاسم من npm، وده حماية.

ولو نشرت باكدج على npm، pnpm بيبدّل [[workspace:*]] برقم النسخة الحقيقي وقت النشر.

[[exports]] بيحدد إيه اللي مسموح يتستورد من الباكدج. هنا بيشاور على src/*.ts مباشرة: مفيش dist ولا build step. ده شغال لأن Vite و Next و tsx بيترجموا TS، إنما تطبيق Node عادي بيشغّل JS بس هيحتاج build للباكدج (أو tsx). وفي Next القديم ممكن تحتاج [[transpilePackages]].`,
            when: "أول ما يبقى عندك تطبيقين أو أكتر بيشاركوا كود في نفس الريبو.",
            mistakes: R`تستورد [[@myapp/shared/src/utils]] مباشرة وهو مش في exports، فيطلع [[ERR_PACKAGE_PATH_NOT_EXPORTED]]. وتضيف [[workspace:*]] في package.json وتنسى pnpm install فالتطبيق مش لاقي الباكدج.`
          },
          teach: R`## الفكرة في سطرين

المثال مش أوامر بتتكتب في الترمنال، ده **٣ ملفات** في ريبو واحد. ملف بيقول لـ pnpm «الباكدجات فين»، وملف في التطبيق بيقول «أنا محتاج الباكدج المشتركة»، وملف في الباكدج المشتركة بيقول «اسمي إيه وإيه اللي مسموح يتاخد مني». هنفك كل ملف لوحده، وبعدين نشغّل [[pnpm install]] ونشوف اللينك بعينينا.

شكل الريبو اللي هنشتغل عليه:

~~~text شجرة الريبو
mono/
  pnpm-workspace.yaml
  package.json            (الجذر)
  apps/
    web/package.json
    server/package.json
  packages/
    shared/package.json
    shared/src/index.ts
~~~

يعني إيه monorepo؟ **ريبو واحد** (mono = واحد) فيه كذا مشروع. ويعني إيه workspace؟ إن pnpm يتعامل مع المشاريع دي كعيلة واحدة: install واحد للكل، وكل واحد يقدر يستخدم التاني.

---

## ١. [[pnpm-workspace.yaml]]: فين الباكدجات؟

~~~text pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
~~~

- الملف بصيغة **YAML**: مفتاح، وبعده [[:]]، وتحته قايمة كل عنصر فيها بيبدأ بـ [[-]] ومسافة. والمسافات في أول السطر مهمة في YAML، هي اللي بتقول العنصر ده تبع مين.
- [[packages:]] اسم المفتاح اللي pnpm بيدوّر عليه.
- [["apps/*"]] نمط (glob): [[*]] معناها «أي فولدر جوه apps». فـ [[apps/web]] و [[apps/server]] الاتنين باكدجات، ولو عملت [[apps/admin]] بكرة هتدخل لوحدها.
- علامات التنصيص عشان [[*]] في أول قيمة YAML ليها معنى تاني، فالأضمن تتحط بين [[""]].

> مكان الملف ده **جذر** الريبو، وهو اللي بيخلي pnpm يعرف إن ده workspace أصلًا.

---

## ٢. [[apps/web/package.json]]: التطبيق عايز الكود المشترك

~~~text apps/web/package.json (جزء منه)
"dependencies": {
  "@myapp/shared": "workspace:*"
}
~~~

- [[dependencies]] قايمة المكتبات اللي التطبيق محتاجها وهو شغال. كل سطر فيها: اسم المكتبة، وبعده النسخة المطلوبة.
- [["@myapp/shared"]] اسم الباكدج. الـ [[@myapp/]] في الأول اسمه **scope**: زي اسم عيلة بيجمع باكدجاتك تحت اسم واحد عشان ميتلخبطوش مع باكدجات تانية على npm.
- [["workspace:*"]] بدل رقم زي [["^1.0.0"]]. معناها: «هات الباكدج دي **من الـ workspace**، مش من npm، وأي نسخة موجودة ([[*]]) تمشي».

---

## ٣. [[packages/shared/package.json]]: الباكدج المشتركة

~~~text packages/shared/package.json (جزء منه)
"name": "@myapp/shared",
"exports": { ".": "./src/index.ts", "./types": "./src/types.ts" }
~~~

### [[name]]

ده الاسم اللي pnpm بيدوّر بيه. لازم يطابق **بالحرف** اللي مكتوب في dependencies بتاعة web. اسم الفولدر ([[shared]]) ملوش دعوة.

### [[exports]]

بيحدد الـ paths اللي مسموح حد يعملها import من الباكدج دي، وكل واحد بيشاور على أنهي ملف:

| اللي بيتكتب في import | الملف اللي بيتفتح |
|---|---|
| [[import x from "@myapp/shared"]] | [[./src/index.ts]] (المفتاح [["."]] يعني الاسم لوحده) |
| [[import t from "@myapp/shared/types"]] | [[./src/types.ts]] |
| [[import u from "@myapp/shared/src/utils"]] | مرفوض: [[ERR_PACKAGE_PATH_NOT_EXPORTED]] |

ولاحظ إن الملفات [[.ts]] مش [[.js]]: مفيش build. ده بينفع لأن اللي بيستورد (Vite أو Next أو tsx) بيترجم TypeScript بنفسه. لو تطبيق Node عادي بـ [[node index.js]] حاول يستورد [[.ts]]، هيحتاج build أو tsx.

---

## ٤. نشغّل: [[pnpm install]] في الجذر

جرّبنا ده بـ pnpm 10.33.2 جوه [[docker run --rm node:22-slim]] (لينكس)، على ريبو فيه web و server و shared:

~~~bash
pnpm install
~~~

~~~text الناتج
Scope: all 4 workspace projects
Already up to date

Done in 631ms using pnpm v10.33.2
~~~

[[Scope: all 4 workspace projects]] ليه ٤ مع إن عندنا ٣؟ لأن **الجذر نفسه** project كمان (فيه package.json). و [[Already up to date]] لأن مفيش مكتبات من npm أصلًا، كله محلي.

### نشوف اللينك

~~~bash
ls -l apps/web/node_modules/@myapp
~~~

~~~text الناتج
lrwxrwxrwx 1 root root 27 Oct  6 12:52 shared -> ../../../../packages/shared
~~~

- [[ls -l]] بيعرض تفاصيل. أول حرف [[l]] في [[lrwxrwxrwx]] معناه **link** (symlink)، مش فولدر عادي.
- [[shared -> ../../../../packages/shared]] السهم معناه «ده بيشاور على». يعني [[node_modules/@myapp/shared]] مش نسخة، هو باب للفولدر الحقيقي.

النتيجة: تعدّل في [[packages/shared/src]]، والتعديل يبان في web فورًا من غير install تاني.

### وعلى ويندوز؟

نفس الأمر على ويندوز (Git Bash، نفس pnpm) طلّع اللينك بمسار كامل بدل النسبي، لأن pnpm على ويندوز بيعمل **junction** (نوع لينك بتاع ويندوز للفولدرات):

~~~text الناتج على ويندوز
shared -> /c/Users/ali/mono/packages/shared
~~~

ومن PowerShell تشوفه بـ [[Get-Item apps\web\node_modules\@myapp\shared | Select-Object LinkType, Target]]، وهيقول [[Junction]].

---

## ٥. اتأكد إن الـ import شغال

ملف صغير في web:

~~~text apps/web/index.js
import { hello } from "@myapp/shared";
console.log(hello("web"));
~~~

~~~bash
node apps/web/index.js
~~~

~~~text الناتج
hello web
~~~

(هنا خلينا shared فيها [[src/index.js]] عشان Node يشغّلها من غير tsx.)

---

## ملخص الملفات

| الملف | السطر المهم | بيعمل إيه |
|---|---|---|
| [[pnpm-workspace.yaml]] | [["apps/*"]] و [["packages/*"]] | يقول لـ pnpm أنهي فولدرات باكدجات |
| [[apps/web/package.json]] | [["@myapp/shared": "workspace:*"]] | يطلب الباكدج من الـ workspace مش من npm |
| [[packages/shared/package.json]] | [["name"]] | الاسم اللي الكل بيستورد بيه |
| [[packages/shared/package.json]] | [["exports"]] | المسموح يتستورد، وبيشاور على .ts مباشرة |

## الخلاصة

- [[workspace:*]] = «من هنا، مش من npm». ولو الاسم مش موجود في الـ workspace، pnpm بيرفض بدل ما يجيب باكدج غريبة بنفس الاسم.
- اللي بيربط هو [[name]] في package.json، مش اسم الفولدر.
- اللينك symlink على لينكس والماك، و junction على ويندوز. التعديل بيبان على طول في الحالتين.`,
          lines: [
            "قايمة الفولدرات اللي فيها باكدجات.",
            "كل فولدر جوه apps باكدج.",
            "وكل فولدر جوه packages.",
            "في التطبيق: المكتبات.",
            "الكود المشترك من الـ workspace مش من npm.",
            "قفلة.",
            "اسم الباكدج المشتركة، وده اللي بيتستورد بيه.",
            "المسموح يتستورد، ملفات TS مباشرة من غير build."
          ],
          sol: R`بعد [[pnpm install]]، [[ls -l apps/web/node_modules/@myapp]] بيطلّع:

[[shared -> ../../../../packages/shared]]. دا symlink، مش نسخة. أي تعديل في [[packages/shared/src]] بيظهر في web على طول من غير install تاني. و [[workspace:*]] في package.json معناها «الباكدج اللي في الـ workspace، أيًا كانت نسختها».

لو [[pnpm install]] قال [[ERR_PNPM_WORKSPACE_PKG_NOT_FOUND]] أو [[No matching version found for @myapp/shared]]: الاسم في [[dependencies]] مش مطابق للـ [[name]] في package.json بتاع shared، أو الفولدر مش داخل تحت [[packages:]] في pnpm-workspace.yaml. ولو web عمل import وقال [[Cannot find module '@myapp/shared']] رغم إن اللينك موجود، راجع [[exports]]: الـ path اللي بتعمله import لازم يكون متعرّف فيها.`,
          solCode: R`# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# packages/shared/package.json
{ "name": "@myapp/shared", "version": "1.0.0", "exports": { ".": "./src/index.ts" } }

# apps/web/package.json
{ "name": "@myapp/web", "version": "1.0.0", "dependencies": { "@myapp/shared": "workspace:*" } }`
        },
        {
          cmd: "pnpm --filter",
          title: "شغّل أمر في باكدج واحدة من الجذر",
          desc: R`[[--filter]] بيوجّه الأمر لباكدج معينة بالاسم أو بمسار أو بـ glob، من غير ما تعمل cd. وبيقبل إضافات: [[...]] بعد الاسم معناها «ومعاها اللي بتعتمد عليه»، و [["[origin/main]"]] معناها «اللي اتغير من main».`,
          example: R`pnpm --filter @myapp/server dev
pnpm --filter "./apps/*" build
pnpm --filter @myapp/web add zod
pnpm --filter "@myapp/web..." build
pnpm --filter "...[origin/main]" test`,
          try: "في ريبو فيه أكتر من باكدج، ضيف مكتبة لتطبيق واحد بـ [[--filter]] واتأكد إنها اتكتبت في package.json بتاعه بس.",
          deep: {
            why: "في monorepo فيه ٥ باكدجات، مش عايز تبني الكل عشان تجرّب واحد، ولا تفضل تعمل cd رايح جاي. والـ CI مش لازم يختبر كل حاجة لو التغيير في باكدج واحدة.",
            how: R`الفلتر بيختار باكدجات، والأمر اللي بعده بيتنفذ في كل واحدة منهم.

بالاسم: [[@myapp/server]] من حقل name. بالمسار: [[./apps/*]] كل الفولدرات جوه apps (حطه بين علامات تنصيص عشان الشيل ميفكّوش).

[[pnpm --filter X add zod]] بيضيف المكتبة لـ X بس. من غير الفلتر في الجذر، pnpm بيعترض لأن الجذر مش المكان الطبيعي للمكتبات.

[[web...]]: web وكل الباكدجات اللي هي معتمدة عليها، فالـ build يطلع بالترتيب الصح (shared الأول). و [[...web]] العكس: web وكل اللي معتمد عليها.

[["[origin/main]"]]: الباكدجات اللي ملفاتها اتغيرت من الـ commit ده. و [["...[origin/main]"]] بيضيف لهم كل اللي بيعتمد عليهم، ودي اللي تستخدمها في CI عشان تختبر اللي ممكن يتأثر بس.`,
            when: "كل يوم في monorepo: dev لتطبيق واحد، وإضافة مكتبة لتطبيق واحد، وCI أسرع.",
            mistakes: "تكتب الاسم غلط أو باسم الفولدر بدل name، فالفلتر مبيلاقيش حاجة ومبيعملش حاجة. اقرا الخرج: لو قال No projects matched، الفلتر غلط."
          },
          teach: R`## الفكرة

كل سطر في المثال شكله واحد: [[pnpm --filter <مين> <الأمر>]]. الجزء الأول بيختار **أنهي باكدجات**، والجزء التاني هو الأمر العادي اللي كنت هتكتبه جوه فولدر الباكدج ([[dev]] أو [[build]] أو [[add zod]]). يعني [[--filter]] بيوفّر عليك الـ cd.

جرّبنا كل ده بـ pnpm 10.33.2 في [[docker run --rm node:22-slim]] على ريبو فيه ٣ باكدجات: [[@myapp/web]] (معتمدة على shared) و [[@myapp/server]] و [[@myapp/shared]]. وجزء [[origin/main]] اتجرّب على ويندوز لأنه محتاج git.

---

## ١. بالاسم: [[pnpm --filter @myapp/server dev]]

- [[--filter]] (أو [[-F]] اختصارها) بعده الاختيار.
- [[@myapp/server]] لازم يطابق حقل [[name]] في [[apps/server/package.json]]، مش اسم الفولدر [[server]].
- [[dev]] اسم سكربت في نفس الـ package.json. زي ما تكون عملت [[cd apps/server]] و [[pnpm dev]].

جرّبناه بسكربت [[test]] عشان يخلص بسرعة:

~~~bash
pnpm --filter @myapp/server test
~~~

~~~text الناتج
> @myapp/server@1.0.0 test /work/apps/server
> node -e "console.log('server tests ok')"

server tests ok
~~~

السطرين اللي بيبدأوا بـ [[>]] pnpm بيطبعهم قبل أي سكربت: اسم الباكدج ونسختها واسم السكربت والفولدر اللي اتشغّل فيه، وبعدين الأمر نفسه.

---

## ٢. بالمسار: [[pnpm --filter "./apps/*" build]]

- [[./]] في الأول بيقول لـ pnpm «ده مسار مش اسم».
- [[*]] أي فولدر جوه apps، فبيختار web و server مع بعض.
- علامات التنصيص [[""]] عشان الشيل (bash أو PowerShell) ميحاولش يفك الـ [[*]] بنفسه قبل ما pnpm يشوفها.

---

## ٣. إضافة مكتبة لباكدج واحدة: [[add]]

~~~bash
pnpm --filter @myapp/web add ms
~~~

~~~text الناتج
.                                        |   +1 +
Done in 917ms using pnpm v10.33.2
~~~

[[+1]] يعني باكدج واحدة اتضافت. وبعدها [[apps/web/package.json]] بقى فيه:

~~~text apps/web/package.json (dependencies)
"@myapp/shared": "workspace:*",
"ms": "^2.1.3"
~~~

و [[grep -c ms]] على package.json بتاع server وبتاع الجذر طلّع [[0]] للاتنين: محدش اتلمس غير web.

### ولو نسيت الفلتر؟

~~~bash
pnpm add ms
~~~

~~~text الناتج
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root).
~~~

pnpm رفض (exit code 1) عشان الجذر مش مكان مكتبات التطبيقات. ولو فعلًا عايزها في الجذر (أداة زي prettier للريبو كله) زوّد [[-w]].

---

## ٤. الباكدج واللي هي معتمدة عليه: [["@myapp/web..."]]

التلات نقط [[...]] **بعد** الاسم معناها: «web، وكل الباكدجات اللي web معتمدة عليها». وweb معتمدة على shared، فالاتنين يتبنوا، و shared **الأول**:

~~~bash
pnpm --filter "@myapp/web..." build
~~~

~~~text الناتج
Scope: 2 of 4 workspace projects
packages/shared build$ node -e "console.log('shared built')"
packages/shared build: shared built
packages/shared build: Done
apps/web build$ node -e "console.log('web built')"
apps/web build: web built
apps/web build: Done
~~~

- [[Scope: 2 of 4]] الفلتر اختار ٢ من الـ ٤ (الـ ٤ فيهم الجذر).
- كل سطر قبله اسم الباكدج، عشان لما كذا واحدة تشتغل تعرف السطر ده تبع مين.

و [[...@myapp/web]] (النقط **قبل** الاسم) العكس: web وكل الباكدجات اللي معتمدة **عليها**.

---

## ٥. اللي اتغير بس: [["...[origin/main]"]]

- [[[origin/main]]] بين أقواس مربعة معناها «الباكدجات اللي فيها ملفات اتغيرت من الـ commit أو الـ branch ده». pnpm بيسأل git عن الفرق.
- [[...]] قبلها: وزوّد عليهم كل اللي بيعتمد عليهم، لأن تغيير في shared ممكن يكسر web.

جرّبناه على ويندوز: ريبو git على branch [[main]]، وبعدين عدّلنا سطر في [[packages/shared/src/index.js]] من غير commit. ([[main]] بدل [[origin/main]] لأن مفيش remote في التجربة.)

~~~bash
pnpm --filter "[main]" test
~~~

~~~text الناتج
> @myapp/shared@1.0.0 test C:\Users\ali\mono-git\packages\shared
> node -e "console.log('packages/shared tests ok')"

packages/shared tests ok
~~~

shared بس، لأنها الوحيدة اللي اتغيرت. ودلوقتي بالنقط:

~~~bash
pnpm --filter "...[main]" test
~~~

~~~text الناتج
Scope: 2 of 4 workspace projects
packages/shared test: packages/shared tests ok
packages/shared test: Done
apps/web test: apps/web tests ok
apps/web test: Done
~~~

دخلت web لأنها معتمدة على shared، و server لأ. ودي اللي بتحطها في CI: بتختبر اللي ممكن يتأثر بس.

---

## ٦. الفلتر اللي مش لاقي حاجة

~~~bash
pnpm --filter @myapp/nope build
echo $?
~~~

~~~text الناتج
No projects matched the filters in "/work"
0
~~~

خلي بالك: الـ exit code **صفر**. يعني في CI الخطوة هتعدّي خضرا وهي معملتش حاجة. اقرا الخرج دايمًا.

---

## ملخص أشكال الفلتر

| الفلتر | بيختار |
|---|---|
| [[@myapp/server]] | الباكدج دي بالاسم |
| [["./apps/*"]] | كل الباكدجات جوه apps بالمسار |
| [["@myapp/web..."]] | web + اللي هي معتمدة عليه |
| [["...@myapp/web"]] | web + اللي معتمد عليها |
| [["[origin/main]"]] | اللي ملفاته اتغيرت من main |
| [["...[origin/main]"]] | اللي اتغير + اللي معتمد عليه |

## الخلاصة

- الأمر بعد الفلتر هو نفس الأمر اللي كنت هتكتبه جوه الفولدر.
- الاسم من [[name]] في package.json، وحط الفلتر بين [[""]] لو فيه [[*]] أو [[...]] أو [[[ ]]].
- [[No projects matched]] بيخرج بـ 0، فاقرا الخرج.`,
          lines: [
            "شغّل dev في السيرفر بس، بالاسم.",
            "ابني كل التطبيقات اللي في apps، بالمسار.",
            "ضيف مكتبة لتطبيق web بس.",
            "ابني web ومعاها كل اللي هي معتمدة عليه.",
            "اختبر اللي اتغير من main واللي بيعتمد عليه."
          ],
          sol: R`[[pnpm --filter @myapp/web add ms]] بيطبع [[+1]] وفي الآخر [[Done]]. و [[apps/web/package.json]] بقى فيه [["ms": "^2.1.3"]] جنب [["@myapp/shared": "workspace:*"]]، بينما [[apps/server/package.json]] و package.json بتاع الجذر ما اتغيروش ([[grep ms]] عليهم مش بيلاقي حاجة).

الغلط الشائع: تعمل [[pnpm add ms]] في الجذر، و pnpm يرفض بـ [[ERR_PNPM_ADDING_TO_ROOT]] عشان يحميك؛ ولو فعلًا عايزها في الجذر (أداة زي prettier) استخدم [[-w]]. ولو الفلتر ما طابقش أي باكدج هيقول [[No projects matched the filters]]؛ الاسم لازم يطابق [[name]] في package.json مش اسم الفولدر، أو استخدم مسار زي [[--filter ./apps/web]].`
        },
        {
          cmd: "pnpm -r و --parallel",
          title: "نفس السكربت في كل الباكدجات",
          desc: R`[[pnpm -r build]] بيشغّل build في كل باكدج عندها السكربت ده، بالترتيب الصح حسب مين معتمد على مين، واللي معندهاش بتتخطّى. و [[--parallel]] بيشغّلهم كلهم في نفس اللحظة من غير ترتيب، ودي اللي لازم مع سكربتات dev اللي مبتخلصش.

و [[pnpm -r exec]] بينفّذ أمر عادي (مش سكربت) جوه فولدر كل باكدج.`,
          example: R`pnpm -r build
pnpm -r --stream test
pnpm --parallel --filter "./apps/*" dev
pnpm -r exec rm -rf dist .next
pnpm -r --workspace-concurrency=1 build`,
          try: "في الجذر اعمل سكربتات [[build: pnpm -r build]] و [[dev: pnpm --parallel --filter \"./apps/*\" dev]]، وشغّل الاتنين وقارن الخرج.",
          deep: {
            why: "سكربتات الجذر لازم متعرفش أسامي الباكدجات: [[pnpm build]] في الجذر ينادي [[pnpm -r build]]، والـ CI يشغّل pnpm build وخلاص. تضيف باكدج جديدة، تدخل لوحدها.",
            how: R`[[-r]] (recursive) بيرتّب الباكدجات topologically: لو web معتمدة على shared، shared تتبني الأول. وبيشغّل كذا واحدة مع بعض لو مش معتمدين على بعض (الحد الافتراضي 4، أو عدد الأنوية لو أقل، و [[--workspace-concurrency=1]] واحدة واحدة لو الجهاز ضعيف أو اللوج متلخبط).

[[--stream]] بيطبع الخرج أول بأول وقبله اسم الباكدج، بدل ما يجمّع خرج كل واحدة لما تخلص.

ليه [[--parallel]] مع dev؟ الترتيب معناه «استنى shared تخلص وبعدين ابدأ web». سكربت dev بتاع shared (watch) عمره ما بيخلص، فـ web مش هتبدأ أبدًا. [[--parallel]] بيتجاهل الترتيب والحد ويشغّل الكل فورًا.

[[exec]] بيشغّل أمر في فولدر كل باكدج. في مشروع حقيقي كان فيه سكربت clean: [[pnpm -r exec rm -rf node_modules dist .next && rm -rf node_modules]]، الجزء الأخير عشان الجذر نفسه، لأن [[-r]] مش بيشمل الجذر.`,
            when: "build و test و typecheck في الجذر بـ -r. و dev بـ --parallel. و exec للتنضيف.",
            mistakes: R`[[pnpm -r dev]] من غير --parallel، فأول باكدج فيها watch بتقفل الباقي. و [[rm -rf]] في سكربت بيتشغّل على ويندوز: سكربتات pnpm هناك بتشتغل بـ cmd اللي معندهوش rm، فاستخدم [[rimraf]] أو خليه في bash.`
          },
          teach: R`## الفكرة

الدرس اللي فات كان بيختار باكدجات بعينها بـ [[--filter]]. هنا بنشغّل نفس السكربت في **كل** الباكدجات مرة واحدة. والسؤال المهم في كل سطر: بالترتيب ولا كلهم مع بعض؟

جرّبنا كل ده بـ pnpm 10.33.2 جوه [[docker run --rm node:22-slim]] على ريبو فيه: [[packages/shared]] (فيها build)، و [[apps/web]] (فيها build و dev، ومعتمدة على shared)، و [[apps/server]] (فيها dev بس، ومفيهاش build).

---

## ١. [[pnpm -r build]]

- [[-r]] اختصار **recursive**: «لف على كل الباكدجات في الـ workspace».
- [[build]] اسم السكربت. الباكدج اللي معندهاش سكربت بالاسم ده بتتخطى من غير error.

~~~bash
pnpm -r build
~~~

~~~text الناتج
Scope: 3 of 4 workspace projects
packages/shared build$ node -e "console.log('shared built')"
packages/shared build: shared built
packages/shared build: Done
apps/web build$ node -e "console.log('web built')"
apps/web build: web built
apps/web build: Done
~~~

نقرا الناتج:

| السطر | معناه |
|---|---|
| [[Scope: 3 of 4]] | ٣ باكدجات (الكل ما عدا الجذر). [[-r]] مبيشملش الجذر |
| [[packages/shared build$ ...]] | بدأ build في shared، وده الأمر اللي اتشغّل |
| [[packages/shared build: shared built]] | سطر طبعه السكربت، وقبله اسم الباكدج |
| [[Done]] | السكربت خلص بنجاح |

ليه shared قبل web؟ لأن pnpm بيرتّب **topologically**، يعني حسب الاعتماديات: web معتمدة على shared، فـ shared لازم تخلص الأول. و server مش ظاهرة خالص لأن مفيهاش build.

---

## ٢. [[pnpm -r --stream test]]

[[--stream]] بيطبع خرج كل باكدج أول ما يطلع، وقبل كل سطر الفولدر بتاعها (ده كلام الـ docs بتاعة pnpm). في التجربة بـ build الشكل طلع نفس اللي فوق بالظبط، لأن الباكدجات صغيرة وبتخلص في لحظة؛ الفرق بيبان مع اختبارات بتاخد دقايق وكذا باكدج شغالين مع بعض، فتعرف كل سطر جاي منين وتشوفه وقت ما يحصل.

---

## ٣. [[pnpm --parallel --filter "./apps/*" dev]]

- [[--filter "./apps/*"]] التطبيقات بس (web و server)، من غير shared.
- [[--parallel]] شغّلهم **كلهم في نفس اللحظة**، من غير ترتيب ومن غير حد أقصى.

خلّينا سكربت dev في كل تطبيق يطبع سطرين كل ٣٠٠ms ويخلص (السيرفر الحقيقي مبيخلصش):

~~~bash
pnpm --parallel --filter "./apps/*" dev
~~~

~~~text الناتج
Scope: 2 of 4 workspace projects
apps/server dev$ node -e "..."
apps/web dev$ node -e "..."
apps/web dev: web tick 1
apps/server dev: server tick 1
apps/server dev: server tick 2
apps/web dev: web tick 2
apps/server dev: Done
apps/web dev: Done
~~~

السطور **متداخلة**: web و server شغالين مع بعض. ده بالظبط المطلوب لسيرفرات dev.

### ليه مينفعش [[-r dev]]؟

[[-r]] معناه «استنى اللي قبلك يخلص». لو shared عندها [[dev]] بيعمل watch، فده عمره ما بيخلص، فـ web اللي مستنياها عمرها ما هتبدأ. [[--parallel]] بيتجاهل الترتيب خالص.

والعكس: [[--parallel build]] غلط، لأن web ممكن تتبني قبل ما shared تخلص فتقع.

---

## ٤. [[pnpm -r exec rm -rf dist .next]]

- [[exec]] بيشغّل **أمر عادي** (مش سكربت من package.json) جوه فولدر كل باكدج.
- [[rm -rf dist .next]] أمر لينكس: امسح الفولدرين دول من غير ما تسأل ([[-r]] بتاعة rm يعني اللي جواه كمان، و [[-f]] متزعلش لو مش موجود).

عشان تشوف إنه بيتنفّذ في كل فولدر، جرّبناه بـ [[pwd]] (بيطبع الفولدر الحالي) بدل rm:

~~~bash
pnpm -r exec pwd
~~~

~~~text الناتج
/work/apps/server
/work/packages/shared
/work/apps/web
~~~

٣ فولدرات، والجذر مش منهم. عشان كده سكربت clean الحقيقي بيزوّد [[&& rm -rf node_modules]] في الآخر للجذر.

> [[rm -rf]] على ويندوز: سكربتات pnpm بتتشغّل بـ cmd هناك، و cmd معندوش [[rm]]. استخدم مكتبة [[rimraf]] لو الريبو بيتشغّل على ويندوز.

---

## ٥. [[pnpm -r --workspace-concurrency=1 build]]

[[-r]] لوحده بيشغّل لحد ٤ باكدجات مع بعض لو مش معتمدين على بعض. [[--workspace-concurrency=1]] بيخليها واحدة واحدة: اللوج أوضح، والجهاز الضعيف ميتخنقش. ونفس الترتيب بتاع الاعتماديات محفوظ.

---

## ملخص

| الأمر | الترتيب | إمتى |
|---|---|---|
| [[pnpm -r build]] | بالاعتماديات، ولحد ٤ مع بعض | build و test و typecheck |
| [[pnpm -r --stream test]] | نفسه، والخرج أول بأول | CI أو اختبارات طويلة |
| [[pnpm --parallel ... dev]] | مفيش ترتيب، الكل فورًا | سكربتات watch اللي مبتخلصش |
| [[pnpm -r exec <أمر>]] | أمر عادي في كل فولدر | تنضيف |
| [[--workspace-concurrency=1]] | واحدة واحدة | جهاز ضعيف أو لوج متلخبط |

## الخلاصة

- [[-r]] بيستنى، و [[--parallel]] مبيستناش. الأولى للحاجات اللي بتخلص، والتانية للحاجات اللي مبتخلصش.
- [[-r]] مبيشملش الجذر، ودا بيبان في [[Scope: 3 of 4]].
- سكربتات الجذر تبقى عامة: [["build": "pnpm -r build"]]، فأي باكدج جديدة تدخل لوحدها.`,
          lines: [
            "ابني الكل بترتيب الاعتماديات.",
            "اختبر الكل واطبع الخرج أول بأول باسم كل باكدج.",
            "شغّل dev لكل التطبيقات في نفس اللحظة (لازم مع watch).",
            "امسح ملفات الـ build جوه كل باكدج.",
            "ابني واحدة واحدة (جهاز ضعيف أو لوج أوضح)."
          ],
          sol: R`[[pnpm build]] (يعني [[pnpm -r build]]) بيطبع [[Scope: 3 of 4 workspace projects]] وبيشغّل الـ build بالترتيب الصح: [[packages/shared build]] قبل [[apps/web build]] لأن web معتمد عليه، وكل باكدج بتخلص بـ [[Done]]. اللي ملوش علاقة ببعض ممكن يشتغل في نفس الوقت.

[[pnpm dev]] (يعني [[pnpm --parallel --filter "./apps/*" dev]]) بيطبع [[Scope: 2 of 4]] وبيشغّل web و server في نفس الوقت، والسطور متداخلة: [[apps/web dev: ...]] و [[apps/server dev: ...]] ورا بعض. دا اللي محتاجه لسيرفرات dev مش بتخلص أبدًا.

الفرق المهم: [[-r]] بيحترم ترتيب الاعتماديات وبيستنى، و [[--parallel]] بيتجاهل الترتيب وبيشغّل الكل. لو استخدمت [[-r dev]] مع سيرفرات مش بتخلص، باكدج معتمدة على shared ممكن متبدأش لأن shared dev مش بيخلص. والعكس: [[--parallel build]] ممكن يبني web قبل shared فيقع.`
        },
        {
          cmd: "pnpm approve-builds",
          title: "ليه prisma أو sharp ناقصين بعد التسطيب",
          desc: R`من pnpm 10، سكربتات [[postinstall]] بتاعة المكتبات مش بتتشغّل افتراضيًا، عشان مكتبة مخترقة متشغّلش كود على جهازك وقت التسطيب. المكتبات اللي فعلًا محتاجة build (prisma و sharp و esbuild و bcrypt) لازم توافق عليها صراحة. في pnpm 10 التسطيب بيعدّي بتحذير والـ binary بيبقى ناقص، ومن pnpm 11 التسطيب نفسه بيفشل بـ [[ERR_PNPM_IGNORED_BUILDS]] لحد ما تقرر.

[[pnpm approve-builds]] بيسألك عليهم ويكتب الموافقة في [[pnpm-workspace.yaml]]، والملف ده بيدخل Git فالفريق والـ CI ياخدوا نفس القرار.`,
          example: R`pnpm install
pnpm ignored-builds
pnpm approve-builds
git diff pnpm-workspace.yaml
pnpm rebuild sharp`,
          try: "في مشروع pnpm جديد سطّب esbuild (أو sharp@0.34؛ من sharp 0.35 مبقاش فيه سكربت install فمش هتطلع رسالة)، واقرا الرسالة اللي بتطلع، وشغّل [[pnpm approve-builds]]، واقرا اللي اتكتب في pnpm-workspace.yaml.",
          deep: {
            why: "هجمات supply chain كتير بتشتغل من postinstall: مكتبة اتخترقت، وأول ما حد يسطّبها بتسرق التوكنات من جهازه. pnpm قفل الباب ده افتراضيًا، والتمن إنك تفتحه بإيدك للمكتبات اللي تثق فيها.",
            how: R`في التسطيب pnpm بيطبع أسامي المكتبات اللي سكربتاتها اتمنعت: تحذير في pnpm 10، وخطأ بيوقف التسطيب في pnpm 11 (الإعداد [[strictDepBuilds]] بقى true افتراضيًا). [[pnpm ignored-builds]] بيعرضهم تاني.

[[approve-builds]] بيعرض القايمة تختار منها، وبيكتب في pnpm-workspace.yaml حاجة زي: [[allowBuilds: { prisma: true, sharp: true }]] (من pnpm 10.26، وقبلها كان اسمها [[onlyBuiltDependencies]]، واتشالت خالص في pnpm 11). و [[false]] بتقول «متسألنيش تاني عنها، ومتشغّلهاش».

بعد الموافقة [[pnpm rebuild]] بيشغّل السكربتات اللي اتمنعت من غير ما يعيد التسطيب.

المكتبات دي بتحتاج build لأن فيها كود native أو بتنزّل binary للنظام بتاعك: sharp بينزّل libvips، و esbuild بيجيب الـ binary الصح، وبعض نسخ Prisma بتنزّل engines.`,
            when: "بعد أول pnpm install في مشروع جديد، أو لما مكتبة native تقع بخطأ إن ملف ناقص.",
            mistakes: "تتجاهل التحذير، والتطبيق يقع وقت التشغيل بخطأ إن sharp مش لاقي ملف، فتقعد تدوّر في الكود. وتوافق على كل حاجة في القايمة من غير ما تقرا الأسامي، فترجع لنفس الخطر اللي pnpm كان بيحميك منه."
          },
          teach: R`## الأول: يعني إيه build script؟

بعض المكتبات محتاجة تشغّل كود **وقت التسطيب**: تنزّل ملف binary مناسب لنظامك، أو تترجم كود C++. الكود ده مكتوب في package.json بتاعها كسكربت اسمه [[postinstall]] (أو [[install]] أو [[preinstall]]). npm بيشغّله لوحده من غير ما يسألك. pnpm من نسخة 10 **مبيشغّلوش** غير لما توافق.

المثال ٥ أوامر ورا بعض. جرّبناهم في مشروع فاضي بـ pnpm 10.33.2 جوه [[docker run --rm node:22-slim]]، والمكتبة [[esbuild]] لأن عندها postinstall.

---

## ١. التسطيب والتحذير

~~~bash
pnpm add esbuild
~~~

~~~text الناتج
dependencies:
+ esbuild 0.28.2

╭ Warning ─────────────────────────────────────────────────────────────────────╮
│   Ignored build scripts: esbuild@0.28.2.                                     │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
╰──────────────────────────────────────────────────────────────────────────────╯
Done in 4.7s using pnpm v10.33.2
~~~

- [[+ esbuild 0.28.2]] المكتبة اتسطبت.
- [[Ignored build scripts: esbuild@0.28.2.]] بس السكربت بتاعها **متشغّلش**.
- و exit code كان 0: في pnpm 10 ده تحذير بس. في pnpm 11 الإعداد [[strictDepBuilds]] بقى true، فنفس الموقف بيوقف التسطيب بـ [[ERR_PNPM_IGNORED_BUILDS]] (ده من الـ changelog، النسخة اللي جرّبنا عليها 10).

> المثال بيبدأ بـ [[pnpm install]] لمشروع موجود. هنا استخدمنا [[pnpm add esbuild]] عشان نعمل المشروع من الصفر، والرسالة نفسها.

---

## ٢. [[pnpm ignored-builds]]: مين اتمنع؟

~~~bash
pnpm ignored-builds
~~~

~~~text الناتج
Automatically ignored builds during installation:
  esbuild
hint: To allow the execution of build scripts for a package, add its name to "pnpm.onlyBuiltDependencies" in your "package.json", then run "pnpm rebuild".
hint: If you don't want to build a package, add it to the "pnpm.ignoredBuiltDependencies" list.
~~~

القايمة فيها esbuild. والـ hint لسه بيتكلم عن [[onlyBuiltDependencies]] (الاسم القديم)، بس الأمر اللي جاي بيكتب الاسم الجديد. متتلخبطش.

---

## ٣. [[pnpm approve-builds]]: وافق

الأمر ده **تفاعلي**: بيعرض قايمة، بتتحرك بالأسهم، وتعلّم بالمسافة (Space)، وتأكد بـ Enter. في التجربة استخدمنا [[--all]] (وافق على الكل من غير أسئلة) لأن مفيش غير esbuild:

~~~bash
pnpm approve-builds --all
~~~

~~~text الناتج
.../esbuild@0.28.2/node_modules/esbuild postinstall$ node install.js
.../esbuild@0.28.2/node_modules/esbuild postinstall: Done
~~~

بعد الموافقة شغّل السكربت اللي كان اتمنع على طول: [[node install.js]] بتاع esbuild، و [[Done]].

> [[--all]] في مشروع حقيقي فيها نفس الخطر اللي pnpm بيحميك منه. اقرا الأسامي ووافق على اللي تعرفه بس.

---

## ٤. [[git diff pnpm-workspace.yaml]]: إيه اللي اتكتب؟

الموافقة مش في دماغ pnpm، دي مكتوبة في ملف. الملف ده مكانش موجود قبلها، فبدل git diff (مفيش git في الـ container) فتحناه:

~~~bash
cat pnpm-workspace.yaml
~~~

~~~text الناتج
allowBuilds:
  esbuild: true
~~~

- [[allowBuilds:]] قايمة القرارات (من pnpm 10.26؛ قبلها كان اسمها [[onlyBuiltDependencies]]).
- [[esbuild: true]] مسموح يشغّل سكربتاته. ولو اخترت تمنعها هتتكتب [[false]]، ودي معناها «متسألنيش تاني».

في مشروعك [[git diff]] هيوري السطرين دول بـ [[+]] قدامهم. اعمل commit للملف، فأي حد في الفريق وأي CI ياخد نفس القرار من غير ما يتسأل.

---

## ٥. [[pnpm rebuild sharp]]: شغّل السكربت من غير تسطيب

[[rebuild]] بيشغّل سكربتات الـ build للمكتبة اللي تسميها، من غير ما يمسح أو ينزّل حاجة. مفيد لو وافقت بإيدك في الملف، أو لو الـ binary باظ. جرّبناه على esbuild:

~~~bash
pnpm rebuild esbuild
node -e 'console.log(require("esbuild").version)'
~~~

~~~text الناتج
.../esbuild@0.28.2/node_modules/esbuild postinstall$ node install.js
.../esbuild@0.28.2/node_modules/esbuild postinstall: Done
0.28.2
~~~

السطر الأخير بيثبت إن المكتبة شغالة: [[require("esbuild")]] حمّلها و [[.version]] طبع نسختها.

---

## ملخص الخطوات

| الخطوة | الأمر | النتيجة |
|---|---|---|
| ١ | [[pnpm install]] | يسطّب، ويمنع السكربتات، ويحذّر (أو يقع في pnpm 11) |
| ٢ | [[pnpm ignored-builds]] | يوريك مين اتمنع |
| ٣ | [[pnpm approve-builds]] | تختار، ويشغّل اللي وافقت عليه |
| ٤ | [[git diff pnpm-workspace.yaml]] | تراجع [[allowBuilds]] وتعمل commit |
| ٥ | [[pnpm rebuild <name>]] | يشغّل السكربت تاني من غير install |

## الخلاصة

- pnpm 10+ مبيشغّلش سكربتات التسطيب إلا للي في [[allowBuilds]].
- القرار بيتكتب في [[pnpm-workspace.yaml]] وبيدخل Git.
- لو مكتبة native (sharp أو prisma أو esbuild أو bcrypt) بتقع وقت التشغيل إن ملف ناقص، أول حاجة تبص عليها: هل اتوافق عليها؟`,
          lines: [
            "التسطيب بيطبع أسامي المكتبات اللي سكربتاتها اتمنعت (تحذير في pnpm 10، وفشل في 11).",
            "اعرضهم تاني.",
            "اختار اللي توافق عليه، ويتكتب في pnpm-workspace.yaml.",
            "شوف اللي اتكتب قبل ما تعمله commit.",
            "شغّل السكربت اللي كان اتمنع من غير إعادة تسطيب."
          ],
          sol: R`مع [[pnpm add esbuild]] في pnpm 10 هيطلع صندوق تحذير: [[Ignored build scripts: esbuild@0.28.2.]] و [[Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.]] و [[pnpm ignored-builds]] بيقول [[Automatically ignored builds during installation: esbuild]].

[[pnpm approve-builds]] بيعرض قايمة تختار منها بالمسافة وتأكد بـ Enter (أو [[--all]] من غير أسئلة). بعدها بيشغّل الـ postinstall ([[esbuild postinstall$ node install.js]] و [[Done]])، و [[git diff pnpm-workspace.yaml]] بيوريك:

[[allowBuilds:]] وتحتها [[esbuild: true]]. اعمل للملف commit عشان باقي الفريق والـ CI ياخدوا نفس القرار.

ملاحظة: sharp من 0.35 مبقاش عنده سكربت install (بيعتمد على binaries جاهزة كـ optional dependencies)، فتسطيبه مش هيطلّع التحذير ده. لو عايز تشوفه مع sharp نفسها جرّب [[sharp@0.34]].`
        }
      ]
    }
]);
