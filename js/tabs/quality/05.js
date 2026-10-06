// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "CI والـ monorepo",
      l: 3,
      n: "نفس الفحوصات على كل PR، بالترتيب الصح، على كل الباكدجات، وبسرعة",
      items: [
        {
          cmd: "ترتيب الفحص في CI",
          title: "كل الفحوصات على كل PR بالترتيب",
          desc: R`workflow واحد بيشغّل الفحوصات بالترتيب: الشكل، وبعدين lint، وبعدين الأنواع، وبعدين الاختبارات، وبعدين build. كل خطوة أرخص وأسرع من اللي بعدها، فالغلط البسيط يقع في ثواني بدل ما تستنى الاختبارات.

و [[pull_request]] من غير branches معناها أي PR على أي branch يتفحص.`,
          example: R`name: CI
on:
  push:
    branches: [main]
  pull_request:
concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build`,
          try: "حط الملف في repo التجربة، واعمل PR فيه ملف مش متنسّق، وشوف إنه وقع في خطوة format في ثواني من غير ما يوصل للاختبارات.",
          flag: "script",
          deep: {
            why: "الـ hooks على جهازك ممكن تتخطّى، أو حد ميكونش عمل install، أو lint-staged فحص الملفات المتغيرة بس. CI هو الحارس الأخير: بيفحص المشروع كله على ماكينة نضيفة، والـ PR ميدخلش main إلا وهو أخضر.",
            how: R`الترتيب مقصود. prettier بياخد ثواني، و eslint أقل من دقيقة، و tsc حوالي دقيقة، والاختبارات ممكن دقايق، والـ build الأتقل. أي خطوة تقع، اللي بعدها مبتشتغلش، فالفشل الرخيص بيبان بسرعة ومبتضيّعش دقايق Actions.

وكل خطوة بتنادي سكربت من package.json ([[pnpm lint]])، مش الأمر نفسه. فالأمر مكتوب في مكان واحد، وهو هو اللي بتشغّله على جهازك. وفي monorepo السكربتات دي في الجذر بتنادي [[pnpm -r]] (الدرس الجاي)، فالـ CI مش محتاج يعرف أسماء الباكدجات.

[[pnpm/action-setup]] بيسطّب pnpm بالنسخة اللي في حقل [[packageManager]] في package.json، ولازم ييجي قبل [[setup-node]] عشان [[cache: pnpm]] محتاج pnpm موجود. و [[--frozen-lockfile]] بيرفض يعدّل [[pnpm-lock.yaml]]: لو package.json اتغير والـ lock لأ، يقع، بدل ما يسطّب نسخ مختلفة عن اللي عندك.

[[concurrency]] بيلغي الـ run القديم لو عملت push جديد على نفس الـ branch، و [[permissions]] بيدّي الـ job أقل صلاحية محتاجها. (الاتنين مشروحين في تاب GitHub Actions.)`,
            when: "أي repo عليه أكتر من شخص أو فيه deploy أوتوماتيك. وخلّي الـ PR ميتدمجش غير لما CI يبقى أخضر (branch protection من إعدادات GitHub).",
            mistakes: R`في مشروع حقيقي كان [[pnpm/action-setup]] مكتوب فيه [[version: 10]] وكمان [[packageManager]] في package.json، ولو الاتنين اختلفوا الـ action بيقع: سيب واحد بس، والأحسن packageManager. ونفس المشروع كان الـ CONTRIBUTING فيه إن الـ PRs بتروح لـ dev، والـ CI شغال على PRs لـ main بس، فكل PRs الـ dev كانت بتدخل من غير فحص، ومكانش فيه concurrency ولا permissions. وفي مشروع تاني [[setup-node]] من غير [[cache: pnpm]]، فكل run بينزّل المكتبات من الأول.`
          },
          teach: R`## الفكرة: نفس الفحوصات على ماكينة نضيفة، الأرخص الأول

الملف ده workflow لـ GitHub Actions، بيتحط في [[.github/workflows/ci.yml]]. مع كل push على main وكل PR، GitHub بيشغّل ماكينة أوبونتو جديدة وينفّذ الخطوات بالترتيب، وأول خطوة تقع بتوقف الباقي. الـ workflow نفسه بيشتغل على GitHub بس، فعملت حاجتين هنا: فحصته بـ [[actionlint]] (من Docker)، وشغّلت نفس الخطوات بنفس الترتيب على مشروع تجربة بـ pnpm 12.9 على ويندوز 11.

---

## ١. YAML في سطرين

الملف YAML: [[مفتاح: قيمة]]، والمسافات في أول السطر بتقول مين جوه مين (مسافات مش Tab)، و [[- ]] في أول السطر عنصر في قايمة.

---

## ٢. الجزء الأول: إمتى يشتغل

~~~text
name: CI
on:
  push:
    branches: [main]
  pull_request:
~~~

| السطر | معناه |
|---|---|
| [[name: CI]] | الاسم اللي هيظهر في تاب Actions وجنب الـ PR |
| [[on:]] | الأحداث اللي بتشغّله |
| [[push: branches: [main]]] | push على [[main]] بس |
| [[pull_request:]] فاضية | أي PR على أي branch |

[[pull_request]] من غير [[branches]] مقصودة: لو كتبت [[branches: [main]]]، الـ PRs اللي رايحة لـ [[dev]] مش هتتفحص.

## ٣. [[concurrency]] و [[permissions]]

~~~text
concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
~~~

- [[$__{{ ... }}]] تعبير بيتحسب على GitHub. [[github.ref]] اسم الـ branch أو الـ PR (زي [[refs/heads/main]] أو [[refs/pull/12/merge]]).
- الـ runs اللي في نفس الـ [[group]] مبيشتغلوش مع بعض، و [[cancel-in-progress: true]] بيلغي القديم. فلو عملت ٣ pushes ورا بعض على نفس الـ PR، آخر واحد بس اللي يكمّل.
- [[permissions: contents: read]] الـ token اللي الـ job بياخده يقرا الكود بس، ميقدرش يكتب في الـ repo.

## ٤. الـ job

~~~text
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
~~~

[[jobs]] المهام، و [[quality]] اسم اختاريته (هيظهر [[CI / quality]] في الـ PR). [[runs-on: ubuntu-latest]] ماكينة أوبونتو جديدة كل مرة. و [[steps]] الخطوات بالترتيب.

## ٥. التجهيز

~~~text
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
~~~

| الخطوة | بتعمل إيه |
|---|---|
| [[actions/checkout@v7]] | تنزّل كود الـ repo على الماكينة. [[@v7]] رقم النسخة الكبير (اتأكدت إن v7 آخر tag) |
| [[pnpm/action-setup@v6]] | تسطّب pnpm بالنسخة اللي في [["packageManager"]] في package.json |
| [[actions/setup-node@v7]] | تسطّب Node 24 |
| [[cache: pnpm]] | تحفظ مكتبات pnpm بين الـ runs. محتاجة pnpm موجود، عشان كده action-setup قبلها |

[[uses]] معناها «شغّل action جاهز من repo تاني»، و [[with]] الإعدادات بتاعته.

## ٦. الفحوصات

~~~text
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
~~~

[[run]] أمر shell. كل واحد بينادي سكربت من [[package.json]]، فنفس الأمر بتشغّله على جهازك. في مشروع التجربة السكربتات كانت:

~~~text package.json (scripts)
"format:check": "prettier --check .",
"lint": "eslint . --max-warnings 0",
"typecheck": "tsc --noEmit",
"test": "vitest run",
"build": "tsc -p tsconfig.build.json"
~~~

[[--max-warnings 0]] أي warning يبقى فشل، و [[tsc -p]] بيقول استخدم ملف الإعداد ده.

---

## ٧. التشغيل المحلي: كله أخضر

شغّلت الست أوامر ورا بعض بـ [[set -e]] (أول أمر يقع يوقف السكربت، زي Actions بالظبط):

~~~text الناتج (مختصر)
##### pnpm install --frozen-lockfile
Lockfile is up to date, resolution step is skipped
##### pnpm format:check
All matched files use Prettier code style!
##### pnpm lint
##### pnpm typecheck
##### pnpm test
      Tests  1 passed (1)
##### pnpm build
~~~

eslint و tsc مبيطبعوش حاجة لما كله تمام.

## ٨. ملف مش متنسّق

ضفت [[export const x={a:1,b:2}]]:

~~~text الناتج
##### pnpm format:check
$ prettier --check .
Checking formatting...
[warn] src/x.ts
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
[ELIFECYCLE] Command failed with exit code 1.
~~~

وقف هنا. lint و typecheck و test و build ماشتغلوش. على GitHub نفس الشكل: الخطوات اللي بعدها رمادي، و X أحمر جنب [[CI / quality]].

## ٩. الـ lock مش متحدّث

ضفت dependency لـ [[package.json]] بإيدي من غير ما أحدّث [[pnpm-lock.yaml]]:

~~~text الناتج
Error: ERR_PNPM_OUTDATED_LOCKFILE

  × installing dependencies
  ╰─▶ Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up
      to date with package.json.
        * 1 dependency was added: is-number@^7.0.0
~~~

[[--frozen-lockfile]] رفض يعدّل الـ lock. من غيره كان هيسطّب نسخ ممكن تختلف عن اللي عندك من غير ما حد ياخد باله.

---

## ١٠. فحص الملف قبل الـ push: actionlint

~~~bash
docker run --rm -v "$(pwd):/repo" -w /repo rhysd/actionlint:latest -no-color
~~~

[[-v "$(pwd):/repo"]] بيوصّل الفولدر الحالي جوه الـ container، و [[-w /repo]] بيخليه فولدر الشغل. (من Git Bash على ويندوز احتجت [[MSYS_NO_PATHCONV=1]] قبل الأمر و [[$(pwd -W)]] بدل [[$(pwd)]]، عشان Git Bash ميغيّرش المسارات.)

على الملف ده: مفيش ناتج، و exit 0. ولما غلطت في اسم الحدث ([[pull_requests]] بـ s):

~~~text الناتج
.github/workflows/bad.yml:5:3: unknown Webhook event "pull_requests". see https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#webhook-events for list of all Webhook event names [events]
  |
5 |   pull_requests:
  |   ^~~~~~~~~~~~~~
~~~

GitHub كان هيتجاهل الملف أو يرفضه، و actionlint مسكها في ثانية على جهازك.

---

## الخلاصة

- [[on: pull_request]] من غير branches = كل PR يتفحص.
- الترتيب: install بالـ lock، شكل، lint، أنواع، اختبارات، build. أول واحد يقع يوقف الباقي.
- كل خطوة سكربت من package.json، فاللي بيقع في CI تقدر تعيده على جهازك بنفس الأمر.
- [[pnpm/action-setup]] قبل [[setup-node]]، و [[--frozen-lockfile]] دايمًا في CI.`,
          lines: [
            "اسم الـ workflow.",
            "بيشتغل إمتى:",
            "مع كل push...",
            "...على main.",
            "ومع أي PR على أي branch.",
            "لو جه push جديد...",
            "...على نفس الـ branch (المجموعة باسم الـ ref)...",
            "...الغي الـ run القديم.",
            "صلاحيات الـ token:",
            "قراية الكود بس.",
            "المهام.",
            "مهمة واحدة اسمها quality.",
            "على ماكينة أوبونتو نضيفة.",
            "الخطوات بالترتيب، وأي واحدة تقع بتوقف اللي بعدها.",
            "هات الكود.",
            "سطّب pnpm بالنسخة اللي في packageManager. لازم قبل setup-node.",
            "سطّب Node...",
            "بالإعدادات دي:",
            "نسخة 24.",
            "وكاش لمكتبات pnpm بين الـ runs.",
            "سطّب بالظبط اللي في الـ lock، ويقع لو الـ lock مش متحدّث.",
            "الشكل (prettier --check): ثواني.",
            "eslint على المشروع كله، وأي warning يوقّع.",
            "الأنواع (tsc --noEmit).",
            "الاختبارات مرة واحدة.",
            "الـ build في الآخر لأنه الأتقل."
          ],
          sol: R`في الـ PR اللي فيه ملف مش متنسّق، الـ job [[quality]] بيقع في step [[Run pnpm format:check]] بعد ثواني من [[pnpm install]]، واللوج فيه [[[warn] src/x.ts]] و [[Code style issues found in the above file.]] و [[Process completed with exit code 1.]]. الـ steps اللي بعدها (lint و typecheck و test و build) بتظهر رمادي، ما اشتغلتش. والـ PR عليه X أحمر جنب [[CI / quality]].

الفكرة: الأسرع والأرخص الأول. مفيش داعي تستنى الـ build دقيقتين عشان تعرف إن فيه مسافة غلط.

مشاكل هتقابلها أول مرة: [[pnpm/action-setup]] بيقع بـ error إنه مش لاقي نسخة pnpm لو package.json مفيهوش [["packageManager": "pnpm@..."]] ولا [[with: version]]. و [[--frozen-lockfile]] بيقع لو [[pnpm-lock.yaml]] مش متحدّث مع package.json، ودا مقصود. والملف نفسه تقدر تفحصه قبل الـ push بـ [[actionlint]]. ولو الـ PR ما شغّلش الـ workflow خالص، الملف مش على الـ branch أو [[pull_request]] ناقصة.`
        },
        {
          cmd: "pnpm -r و --filter",
          title: "شغّل الفحص على كل الباكدجات أو بعضها",
          desc: R`في monorepo (apps/web و apps/api و packages/shared)، [[pnpm -r run X]] بيشغّل السكربت X في كل باكدج عنده، بترتيب الاعتماد.

و [[--filter]] بيحدد مين: باكدج بالاسم، أو فولدر، أو «اللي اتغير من main بس».`,
          example: R`pnpm -r run typecheck
pnpm -r --if-present run test
pnpm --filter @myapp/web run lint
pnpm --filter "./apps/**" run build
pnpm --filter "...[origin/main]" run test
pnpm --filter @myapp/web... run build
npm run test --workspaces --if-present`,
          try: R`في monorepo تجربة فيه باكدجين، عدّل واحد بس واعمل commit، وشغّل [[pnpm --filter "...[HEAD~1]" run test]] ولاحظ مين اتشغّل.`,
          deep: {
            why: "lint و tsc والاختبارات كل باكدج ليه بتوعه (tsconfig مختلف، و eslint مختلف). في CI محتاج تشغّلهم كلهم بأمر واحد، وعلى جهازك محتاج تشغّل اللي بتشتغل فيه بس.",
            how: R`pnpm بيعرف الباكدجات من [[pnpm-workspace.yaml]] (مثلًا [[apps/*]] و [[packages/*]]).

[[-r]] (recursive) بيلف على كل الباكدجات ويشغّل السكربت في كل واحد عنده. والترتيب topological: لو web بيعتمد على shared، shared بيخلص الأول، ودي مهمة للـ build. والباكدجات المستقلة بتشتغل بالتوازي.

[[--filter]] بيختار:
[[--filter @myapp/web]] باكدج بالاسم (الاسم اللي في package.json بتاعه، مش اسم الفولدر).
[[--filter "./apps/**"]] كل اللي تحت فولدر.
[[--filter @myapp/web...]] الباكدج ده وكل اللي هو معتمد عليه (عشان تبني shared قبل web).
[[--filter "...[origin/main]"]] الباكدجات اللي فيها ملفات اتغيرت من main، ومعاها كل اللي بيعتمد عليها. ده اللي بيخلي CI في monorepo كبير سريع: عدّلت shared؟ اختبر shared و web و api. عدّلت web بس؟ web بس.

والشكل المعتاد: السكربتات في package.json الجذر تبقى [["typecheck": "pnpm -r run typecheck"]]، فانت و CI بتكتبوا [[pnpm typecheck]] وخلاص.

و npm workspaces فيه نفس الفكرة بـ [[--workspaces]] و [[-w]] (في تاب Node).`,
            when: "أي monorepo. [[-r]] في CI وفي سكربتات الجذر. [[--filter]] على جهازك وانت شغال في تطبيق واحد، وفي CI لو المشروع كبر والفحص الكامل بقى بطيء.",
            mistakes: R`[["...[origin/main]"]] في CI من غير ما الـ checkout يجيب التاريخ: [[actions/checkout]] افتراضيًا بيجيب آخر commit بس، فـ pnpm ميلاقيش origin/main، فمحتاج [[fetch-depth: 0]]. وتنسى إن [[-r]] مبيشغّلش سكربت الجذر نفسه. وباكدج جديدة ملهاش سكربت typecheck، فمحدش بيفحصها وانت فاكر إن [[-r]] غطّى الكل.`
          },
          teach: R`## الفكرة: أمر واحد على كل الباكدجات، أو فلتر يختار منهم

monorepo يعني repo واحد فيه كذا باكدج، كل واحد ليه [[package.json]] وسكربتات. [[-r]] بيلف عليهم كلهم، و [[--filter]] بيختار. اتشغّل في [[node:22-slim]] (pnpm 12.9.1) على monorepo تجربة: [[@myapp/web]] بيعتمد على [[@myapp/shared]]، و [[@myapp/api]] مستقل، وكل سكربت بيطبع اسمه بس ([[echo testing web]]) عشان نشوف مين اشتغل.

~~~text الشكل
pnpm-workspace.yaml     packages: ["apps/*", "packages/*"]
apps/web/package.json   "@myapp/web"   يعتمد على "@myapp/shared": "workspace:*"
apps/api/package.json   "@myapp/api"
packages/shared/...     "@myapp/shared"
~~~

[[pnpm-workspace.yaml]] بيقول لـ pnpm الباكدجات فين، و [["workspace:*"]] معناها «استخدم الباكدج اللي جنبي في الـ repo، مش من npm».

---

## ١. [[pnpm -r run typecheck]]

[[-r]] اختصار recursive: في كل باكدج.

~~~text الناتج
Scope: 3 of 4 workspace projects
apps/api typecheck$ echo typecheck api
packages/shared typecheck$ echo typecheck shared
packages/shared typecheck: typecheck shared
packages/shared typecheck: Done
apps/api typecheck: typecheck api
apps/api typecheck: Done
apps/web typecheck$ echo typecheck web
apps/web typecheck: typecheck web
apps/web typecheck: Done
~~~

- [[3 of 4]]: ٤ projects بالجذر نفسه، و [[-r]] بيشغّل في الباكدجات التلاتة (الجذر برا).
- كل سطر أوله الفولدر واسم السكربت، عشان الناتج المتلخبط يتقري.
- [[shared]] و [[api]] بدأوا مع بعض (مفيش علاقة بينهم)، و [[web]] بدأ **بعد** ما [[shared]] خلص لأنه معتمد عليه. ده الترتيب الـ topological.

## ٢. [[pnpm -r --if-present run test]]

عملت سكربت [[e2e]] مش موجود في ولا باكدج:

~~~text الناتج (pnpm -r run e2e)
Error: ERR_PNPM_RECURSIVE_RUN_NO_SCRIPT

  × None of the selected packages has a "e2e" script
~~~

~~~text الناتج (pnpm -r --if-present run e2e)
Scope: 3 of 4 workspace projects
~~~

من غير [[--if-present]] بيقع بس لو **ولا واحد** عنده السكربت (لو واحد عنده، زي [[lint]] في web بس، بيشغّله ويتجاهل الباقي). ومع [[--if-present]] مبيقعش خالص.

## ٣. [[pnpm --filter @myapp/web run lint]]

~~~text الناتج
$ echo lint web
lint web
~~~

الاسم اللي في [["name"]] بتاع [[package.json]]، مش اسم الفولدر.

## ٤. [[pnpm --filter "./apps/**" run build]]

~~~text الناتج
Scope: 2 of 4 workspace projects
apps/web build$ echo building web
apps/api build$ echo building api
...
~~~

[[./]] في أول الفلتر يعني مسار. و [[**]] أي عمق. علامات التنصيص عشان الـ shell ميحاولش يفك النجوم بنفسه.

## ٥. [[pnpm --filter @myapp/web... run build]]

~~~text الناتج
Scope: 2 of 4 workspace projects
$ echo building shared
building shared
$ echo building web
building web
~~~

النقط التلاتة **بعد** الاسم: الباكدج ده **واللي هو معتمد عليه**، و [[shared]] اتبنى الأول.

---

## ٦. [[pnpm --filter "...[origin/main]" run test]]

[[[ref]]] بين قوسين مربعين يعني «الباكدجات اللي فيها ملفات اتغيرت من الـ commit ده». والنقط **قبل**: ومعاها الباكدجات اللي **معتمدة عليها**.

| الحالة | الأمر | اشتغل |
|---|---|---|
| عدّلت web وعملت commit | [[--filter "...[HEAD~1]"]] | web بس |
| عدّلت shared وعملت commit | [[--filter "...[HEAD~1]"]] | shared و web |
| نفس التعديل | [[--filter "[HEAD~1]"]] من غير نقط | shared بس |
| عدّلت api ومعملتش commit | [[--filter "[HEAD]"]] | api |
| مفيش أي تعديل | [[--filter "[HEAD]"]] | ولا حاجة |

[[HEAD~1]] الـ commit اللي قبل الحالي. والسطر الرابع مهم: الفلتر بيشوف التعديلات اللي لسه مش في commit كمان.

الصف التاني هو الفايدة كلها: تغيير في باكدج مشتركة بيختبر التطبيقات اللي بتستخدمها.

### لما مفيش حاجة

~~~text الناتج
Scope: 0 of 4 workspace projects
No projects matched the filters in "/w"
~~~

وده exit code **صفر**. نفس الرسالة طلعت لما كتبت اسم غلط ([[@myapp/nope]])، فـ CI ممكن يبقى أخضر وهو مشغّلش حاجة. بص على [[Scope]].

### [[origin/main]] مش موجود

في repo مفيهوش remote (زي [[actions/checkout]] من غير [[fetch-depth: 0]]):

~~~text الناتج
Error: ERR_PNPM_FILTER_CHANGED

  × filtering workspace projects
  ╰─▶ Filtering by changed packages failed. fatal: bad revision 'origin/main'
~~~

---

## ٧. سكربت الجذر و npm workspaces

الجذر فيه [["typecheck": "pnpm -r run typecheck"]]، فـ [[pnpm typecheck]] طلّع نفس ناتج رقم ١ ومعاه سطر [[$ pnpm -r run typecheck]] في الأول. ده اللي CI بيناديه.

ونفس الـ monorepo بـ npm (ضفت [["workspaces": ["apps/*", "packages/*"]]] للجذر):

~~~text الناتج (npm run test --workspaces --if-present)
> @myapp/api@1.0.0 test
testing api
> @myapp/web@1.0.0 test
testing web
> @myapp/shared@1.0.0 test
testing shared
~~~

لاحظ الترتيب: ترتيب الفولدرات، و [[shared]] في الآخر رغم إن web معتمد عليه. npm مش بيرتّب بالاعتماد. ومن غير [[--if-present]]، [[npm run lint --workspaces]] وقع بـ [[Missing script: "lint"]] في api و shared.

---

## الملخص

| الأمر | بيشغّل في |
|---|---|
| [[-r]] | كل الباكدجات، بترتيب الاعتماد |
| [[-r --if-present]] | نفسه، ومبيقعش لو مفيش سكربت |
| [[--filter name]] | باكدج بالاسم |
| [[--filter "./apps/**"]] | كل اللي تحت فولدر |
| [[--filter name...]] | الباكدج واللي هو معتمد عليه |
| [[--filter "...[ref]"]] | اللي اتغير من ref واللي معتمد عليه |

## الخلاصة

- [[-r]] في السكربتات و CI، و [[--filter]] وانت شغال في باكدج واحد.
- النقط بعد الاسم = اعتماداته، والنقط قبل = اللي معتمد عليه.
- «No projects matched» exit 0، فاتأكد من [[Scope]]، و [[...[origin/main]]] في CI محتاج [[fetch-depth: 0]].`,
          lines: [
            "شغّل typecheck في كل باكدج عنده السكربت ده، بترتيب الاعتماد.",
            "test في كل باكدج، ومتقعش لو مفيش ولا واحد عنده السكربت.",
            "lint في باكدج web بس، بالاسم اللي في package.json بتاعها.",
            "build لكل الباكدجات اللي تحت apps.",
            "الاختبارات للباكدجات اللي اتغيرت من main واللي بيعتمد عليها بس.",
            "ابني web ومعاها كل الباكدجات اللي هي معتمدة عليها.",
            "نفس فكرة [[-r]] في npm workspaces."
          ],
          sol: R`في monorepo فيه [[@myapp/web]] و [[@myapp/api]]، وعدّلت web بس: [[pnpm --filter "...[HEAD~1]" run test]] شغّل [[testing web]] بس، و [[pnpm -r run test]] شغّل الاتنين.

بعد ما خليت api يعتمد على web ([["@myapp/web": "workspace:*"]]) وعدّلت web تاني: نفس الأمر شغّل web و api الاتنين، لأن الـ [[...]] قبل القوس معناها «واللي بيعتمدوا عليه». أما [[--filter "[HEAD~1]"]] من غير النقط شغّل web بس. دا الفرق اللي بيحميك: تغيير في باكدج مشتركة لازم يختبر التطبيقات اللي بتستخدمها.

لو ما اشتغلش حاجة خالص ([[No projects matched the filters]])، يبقى مفيش أي تعديل من الـ ref ده (الفلتر بيشوف الـ commits والتعديلات اللي لسه مش في commit كمان)، أو الملف اللي عدلته بره أي باكدج، أو اسم الباكدج غلط. وخد بالك إن الرسالة دي exit 0، فـ CI بيعدّي أخضر وهو مشغّلش حاجة. ولو كل حاجة اشتغلت، اتأكد إنك كتبت الـ filter بين علامات تنصيص عشان الـ shell ما يلعبش في الأقواس.`
        },
        {
          cmd: "git diff --exit-code",
          title: "اتأكد إن الملفات المتولّدة متحدّثة",
          desc: R`فيه ملفات بتتولّد بأمر ومحفوظة في Git: types الداتابيز، أو client الـ API. لو حد غيّر المصدر ونسي يولّد تاني، الملف المحفوظ بيبقى كدّاب.

في CI بتولّد تاني وتقول [[git diff --exit-code]]: لو فيه أي فرق، يرجع 1 والـ CI يقع.`,
          example: R`supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts
git diff --exit-code lib/database.types.ts
git diff --exit-code --stat
git status --porcelain
test -z "$(git status --porcelain)" || { git status --short; exit 1; }`,
          try: R`في repo التجربة عدّل ملف متابَع وشغّل [[git diff --exit-code; echo $?]]: هيطبع 1. رجّعه بـ [[git restore]] وجرّب تاني: 0.`,
          deep: {
            why: "مثال: [[database.types.ts]] متولّد من الداتابيز. حد ضاف عمود بـ migration ومعملش gen types، فالكود بيستخدم types قديمة، و tsc بيعدّي لأن الملف القديم متسق مع نفسه، والغلط يبان في الإنتاج. الفحص ده بيمسك «نسيت تولّد».",
            how: R`[[git diff]] عادةً بيطبع الفرق ويرجع 0 دايمًا. [[--exit-code]] بيخليه يرجع 1 لو فيه أي فرق، فيبقى شرط في سكربت أو CI. (و [[--quiet]] نفس الحاجة من غير طباعة.)

الفكرة: CI عنده نسخة نضيفة من الـ repo. بيشغّل نفس أمر التوليد اللي المفروض انت شغّلته. لو الناتج نفس الملف المحفوظ بالظبط، [[git diff]] فاضي والخطوة تعدّي. لو مختلف، يطبع الفرق (فتعرف إيه اللي ناقص) ويقع.

بس خد بالك: [[git diff]] بيشوف الملفات المتابعة بس. لو التوليد عمل ملف جديد خالص، مش هيبان. [[git status --porcelain]] بيطبع أي تغيير بما فيه الملفات الجديدة، بشكل ثابت معمول للسكربتات، و [[test -z]] بيتأكد إنه فاضي.

ونفس الفكرة تنفع لأي حاجة بتتولّد: types من الداتابيز، و client من OpenAPI، وحتى [[prettier --write]] في CI (لو غيّر حاجة يبقى حد مشغّلهوش). والـ lock ليه فحصه الخاص: [[--frozen-lockfile]].`,
            when: "أي ملف متولّد ومحفوظ في Git. في CI بعد خطوة التوليد، أو في pre-push.",
            mistakes: R`الناتج يطلع مختلف بين جهازك و CI لأسباب ملهاش دعوة بالمحتوى: نسخة CLI مختلفة بتطبع بترتيب مختلف، أو CRLF على ويندوز. ثبّت نسخة الأداة، وخلّي الملف LF ([[.gitattributes]]). وتولّد من الداتابيز البعيدة في CI فتحتاج توكن ([[SUPABASE_ACCESS_TOKEN]] في secrets)، والأسهل تولّد من داتابيز محلية فيها نفس الـ migrations ([[--local]]). وتنسى إن [[git diff]] مبيشوفش الملفات الجديدة.`
          },
          teach: R`## الفكرة: ولّد تاني، ولو الملف اتغير يبقى حد نسي

ملف متولّد ومحفوظ في Git (زي types الداتابيز) المفروض يطابق المصدر. في CI بتشغّل أمر التوليد، وبعدين تسأل Git «فيه فرق عن المحفوظ؟». لو فيه، الـ step يقع. اتشغّل في Git Bash على ويندوز 11 (Git 2.56) في repo تجربة فيه [[src/sum.ts]] و [[lib/database.types.ts]].

---

## ١. [[supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts]]

| الحتة | معناها |
|---|---|
| [[supabase gen types typescript]] | اقرا شكل الجداول من الداتابيز واكتبه TypeScript types |
| [[--project-id "$PROJECT_REF"]] | أنهي مشروع Supabase. [[$PROJECT_REF]] متغير بيئة (في CI من secrets أو vars) |
| [[> lib/database.types.ts]] | اكتب الناتج فوق الملف المحفوظ |

ده محتاج مشروع Supabase وتوكن، فماتشغّلش هنا (الأمر من docs بتاعة Supabase CLI). بدلته بتعديل الملف بإيدي، زي ما يحصل لو حد ضاف عمود:

~~~bash
printf 'export type Tables = { users: { id: number; name: string; email: string } };\n' > lib/database.types.ts
~~~

---

## ٢. [[git diff --exit-code lib/database.types.ts]]

[[git diff]] بيقارن الملفات بآخر حالة متجهزة (ولو مفيش، بآخر commit). اسم الملف في الآخر يحدده.

~~~text الناتج
diff --git a/lib/database.types.ts b/lib/database.types.ts
index e9cb1e3..50f958a 100644
--- a/lib/database.types.ts
+++ b/lib/database.types.ts
@@ -1 +1 @@
-export type Tables = { users: { id: number; name: string } };
+export type Tables = { users: { id: number; name: string; email: string } };
exit=1
~~~

| السطر | معناه |
|---|---|
| [[--- a/...]] و [[+++ b/...]] | [[a]] النسخة المحفوظة، و [[b]] اللي على الديسك دلوقتي |
| [[@@ -1 +1 @@]] | السطر ١ في القديم قصاد السطر ١ في الجديد |
| [[-]] و [[+]] | اتشال واتضاف |
| [[exit=1]] | من [[echo "exit=$?"]] بعد الأمر |

### من غير [[--exit-code]]

[[git diff]] العادي بيرجّع صفر دايمًا، حتى لو طبع فرق. [[--exit-code]] بيخليه يرجّع ١ لو فيه فرق، وصفر لو مفيش. وده اللي CI بيفهمه: أي أمر رجع غير صفر = الـ step وقع.

## ٣. [[git diff --exit-code --stat]]

من غير اسم ملف = المشروع كله، و [[--stat]] ملخص بدل الفرق كامل:

~~~text الناتج (بعد تعديل src/sum.ts)
 src/sum.ts | 1 +
 1 file changed, 1 insertion(+)
exit=1
~~~

[[1 +]] سطر اتضاف. و [[git diff --quiet]] نفس الـ exit code من غير ما يطبع حاجة. وبعد [[git restore src/sum.ts]] (رجّع الملف لآخر نسخة محفوظة): مفيش ناتج، و [[exit=0]].

---

## ٤. الفخ: الملفات الجديدة

التوليد ممكن يعمل ملف جديد خالص. عملت [[lib/api-client.ts]]:

~~~text الناتج
$ git diff --exit-code; echo "exit=$?"
exit=0
~~~

صفر! [[git diff]] بيقارن الملفات اللي Git **متابعها** بس، والملف الجديد مش متابَع.

## ٥. [[git status --porcelain]]

~~~text الناتج
?? lib/api-client.ts
~~~

[[--porcelain]] شكل ثابت معمول للسكربتات (مش بيتغير بين نسخ Git ولا لغة الجهاز). كل سطر: حرفين للحالة واسم الملف. [[??]] مش متابَع، و [[ M]] متعدّل، و [[A ]] اتضاف للـ staging. ولو مفيش أي تغيير، مبيطبعش ولا حرف.

## ٦. [[test -z "$(git status --porcelain)" || { git status --short; exit 1; }]]

من جوه لبرا:

1. [[$(...)]] شغّل الأمر وحط ناتجه هنا كنص.
2. [[test -z "..."]] صح لو النص فاضي (z = zero length). علامات التنصيص عشان النص فيه مسافات.
3. [[||]] لو اللي قبلي **فشل**، شغّل اللي بعدي (عكس [[&&]]).
4. [[{ ...; ...; }]] مجموعة أوامر: اطبع التغييرات بشكل مختصر، واخرج بـ ١.

جرّبته بـ [[echo]] بدل [[exit 1]] عشان الترمنال ميقفلش:

~~~text الناتج
?? lib/api-client.ts
would exit 1
~~~

## ٧. التعديل المتجهز

بعد [[git add lib/api-client.ts]]:

~~~text ملخص الناتج (التلات أوامر)
$ git diff --exit-code                 → exit=0
$ git diff --cached --exit-code --stat → lib/api-client.ts | 1 +   exit=1
$ git diff HEAD --exit-code --stat     → lib/api-client.ts | 1 +   exit=1
~~~

[[git diff]] لوحده بيقارن بالـ staging، فاللي اتعمله [[add]] اختفى منه. [[--cached]] بيقارن الـ staging بآخر commit، و [[HEAD]] بيقارن الديسك بآخر commit (الاتنين مع بعض).

### في PowerShell

~~~powershell
git diff --quiet; "LASTEXITCODE=$LASTEXITCODE"
if (git status --porcelain) { git status --short; "dirty" }
~~~

[[$LASTEXITCODE]] هو [[$?]] بتاع bash لأوامر برا PowerShell. و [[if (git status --porcelain)]] بيبقى صح لو الأمر طبع أي حاجة.

---

## الملخص

| الأمر | بيشوف | لو فيه تغيير |
|---|---|---|
| [[git diff --exit-code file]] | ملف متابَع | الفرق، و exit 1 |
| [[git diff --exit-code --stat]] | كل الملفات المتابعة (مش المتجهزة) | ملخص، و exit 1 |
| [[git diff HEAD --exit-code]] | المتابَع، متجهز ولا لأ | exit 1 |
| [[git status --porcelain]] | كل حاجة حتى الجديد | سطر لكل ملف |
| السطر الأخير في المثال ([[test -z]]) | زي [[status]] | يطبع ويخرج بـ ١ |

## الخلاصة

- [[--exit-code]] بيحوّل [[git diff]] لشرط: ١ لو فيه فرق.
- [[git diff]] مبيشوفش الملفات الجديدة ولا المتجهزة، و [[git status --porcelain]] بيشوف كل حاجة.
- في CI: ولّد، وبعدين افحص، والـ step يقع لوحده من غير if.`,
          lines: [
            "ولّد الـ types من الداتابيز واكتبها فوق الملف المحفوظ.",
            "لو الملف اختلف عن اللي في Git، اطبع الفرق وارجع 1.",
            "نفسه للمشروع كله، بس اطبع أسماء الملفات وعدد السطور.",
            "كل التغييرات حتى الملفات الجديدة، بشكل ثابت للسكربتات.",
            "لو فيه أي تغيير، اعرضه واقفل بفشل."
          ],
          sol: R`بعد ما تعدّل ملف متابَع: [[git diff --exit-code; echo $?]] بيطبع الـ diff وبعده [[1]]. بعد [[git restore الملف]]: مفيش diff، و [[0]].

دي كل الفكرة في CI: الـ exit code غير صفر بيوقف الـ step لوحده، فمش محتاج if.

خلي بالك من حالتين: ملف جديد مش متضاف في git مش بيظهر في [[git diff]] خالص (هيطلع 0)، فعشان كده آخر سطر في المثال بيستخدم [[git status --porcelain]] اللي بيوريه بـ [[??]]. وتعديل عملت له [[git add]] مش بيظهر في [[git diff]] من غير [[--cached]]. لو عايز الاتنين: [[git diff HEAD --exit-code]].`,
          solCode: R`echo "// changed" >> src/sum.ts
git diff --exit-code; echo $?
git restore src/sum.ts
git diff --exit-code; echo $?`
        },
        {
          cmd: "فحص أسرع",
          title: "خلّي الفحص ياخد ثواني مش دقايق",
          desc: R`كل أداة فيها كاش: [[eslint --cache]] و [[prettier --cache]] بيتخطّوا الملفات اللي متغيرتش من آخر مرة، و [[tsc --incremental]] بيفتكر اللي فحصه. و vitest بيقدر يشغّل الاختبارات اللي ليها علاقة بالملفات المتغيرة بس.

والفحص السريع هو اللي الناس بتسيبه شغال.`,
          example: R`npx eslint . --cache --cache-location node_modules/.cache/eslint/
npx prettier --check . --cache
npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo
npx vitest run --changed origin/main
npx vitest related src/cart/total.ts --run
time npm run check`,
          try: R`شغّل [[time npx eslint .]] مرتين، وبعدين بـ [[--cache]] مرتين، وقارن المرة التانية في الحالتين.`,
          deep: {
            why: "لما [[npm run check]] ياخد ٣ دقايق، محدش بيشغّله قبل الـ push، والـ hooks بتتخطّى، و CI بيبقى أول مكان الغلط بيبان فيه. كل ثانية بتوفّرها بتخلي الفحص يحصل فعلًا.",
            how: R`الكاش في الأدوات دي نفس الفكرة: بيحفظ بصمة كل ملف (hash أو وقت التعديل) ونتيجته. المرة الجاية، الملف اللي بصمته متغيرتش ياخد النتيجة القديمة من غير فحص. في مشروع فيه ألف ملف وانت عدّلت ٣، الفرق ضخم.

[[eslint --cache]] بيكتب ملف الكاش في [[.eslintcache]] أو المكان اللي تحدده بـ [[--cache-location]]. و [[prettier --cache]] بيحفظ في [[node_modules/.cache/prettier]].

[[tsc --incremental]] بيكتب ملف [[.tsbuildinfo]] فيه شجرة الاعتماد بين الملفات، فالمرة الجاية بيفحص الملفات اللي اتغيرت واللي بتعتمد عليها بس.

[[vitest run --changed origin/main]] بيشغّل الاختبارات اللي بتستورد (مباشر أو بالتسلسل) ملفات اتغيرت من main. و [[vitest related file]] نفس الفكرة لملف معين، ومن غير [[--run]] بيقعد watch.

الكاش في [[node_modules/.cache]] عشان يبقى متجاهَل في Git من غير إعداد زيادة. وفي CI تقدر تحفظ الفولدر ده بين الـ runs بـ [[actions/cache]].

وباقي السرعة من التنظيم: الخطوات الرخيصة الأول، و lint-staged قبل الـ commit بدل المشروع كله، والتقيل (الاختبارات الكاملة و e2e) في CI أو pre-push.`,
            when: "أول ما الفحص يعدّي ٢٠ أو ٣٠ ثانية على جهازك. و [[--changed]] في CI للـ PRs في مشروع كبير، مع فحص كامل على main.",
            mistakes: R`ملف كاش جوه المشروع ومش في [[.gitignore]] فيدخل commit (زي [[.eslintcache]]). و [[vitest --changed]] كفحص وحيد: اختبار بيعتمد على ملف JSON أو على الداتابيز مش هيتحسب «متأثر» ومش هيتشغّل، فخلّي فحص كامل على main أو كل ليلة. و [[--changed origin/main]] في CI من غير [[fetch-depth: 0]]، فمفيش origin/main أصلًا.`
          },
          teach: R`## الفكرة: متفحصش تاني اللي متغيرش

كل أداة من دول بتحفظ نتيجة آخر مرة، والمرة الجاية بتفحص الملفات اللي اتغيرت بس. و vitest بيقدر يشغّل الاختبارات اللي ليها علاقة بالتعديل بس. اتشغّل على ويندوز 11 من Git Bash، على مشروع تجربة فيه ٣٠٤ ملف TypeScript (eslint 10 مع typescript-eslint، و prettier 3.9، و TypeScript 6، و vitest 5)، والأوقات من [[date]] قبل وبعد كل أمر.

---

## ١. [[npx eslint . --cache --cache-location node_modules/.cache/eslint/]]

| الحتة | معناها |
|---|---|
| [[.]] | الفولدر الحالي كله |
| [[--cache]] | احفظ نتيجة كل ملف، والمرة الجاية اتخطّى اللي متغيرش |
| [[--cache-location ...]] | الكاش يتحفظ هنا. الشرطة [[/]] في الآخر معناها فولدر، و eslint بيعمل جواه ملف |

~~~text الناتج (الأوقات)
3479ms  npx eslint .
3387ms  npx eslint .
3267ms  npx eslint . --cache --cache-location node_modules/.cache/eslint/
2822ms  npx eslint . --cache --cache-location node_modules/.cache/eslint/
~~~

- من غير كاش: المرتين نفس الوقت تقريبًا.
- بالكاش: المرة الأولى زي العادي (بيبني الكاش)، والتانية أسرع بحوالي نص ثانية.
- الفرق صغير لأن القواعد هنا خفيفة، وحوالي ثانيتين من الوقت تشغيل Node و [[npx]] وتحميل الإعدادات مش الفحص. مع قواعد typescript-eslint اللي محتاجة الأنواع، فحص الملف نفسه بيبقى أتقل بكتير والفرق بيكبر.

### من غير [[--cache-location]]

~~~text الناتج (npx eslint . --cache ثم git status --short)
?? .eslintcache
~~~

ملف [[.eslintcache]] (١٤٠ كيلو تقريبًا) في جذر المشروع، و Git شايفه ملف جديد. يا إما [[.gitignore]]، يا إما [[node_modules/.cache]] اللي متجاهَل أصلًا.

---

## ٢. [[npx prettier --check . --cache]]

~~~text الناتج (الأوقات)
2249ms  npx prettier --check .
2261ms  npx prettier --check . --cache
1770ms  npx prettier --check . --cache
~~~

نفس الفكرة: الأولى بتبني، والتانية أسرع. الكاش اتحفظ في [[node_modules/.cache/prettier/.prettier-cache]] لوحده من غير ما أحدد مكان.

---

## ٣. [[npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo]]

| الحتة | معناها |
|---|---|
| [[--noEmit]] | افحص الأنواع بس، متطلّعش ملفات JavaScript |
| [[--incremental]] | احفظ معلومات الفحص، والمرة الجاية افحص المتغير واللي بيعتمد عليه بس |
| [[--tsBuildInfoFile ...]] | المعلومات دي تتحفظ فين |

~~~text الناتج (الأوقات)
2822ms  npx tsc --noEmit
2709ms  npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo
1662ms  npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo
~~~

أكبر فرق هنا: ثانية كاملة من ٢.٨. والملف [[tsbuildinfo]] طلع حوالي ٤٦ كيلو: فيه بصمة كل ملف وشجرة مين بيستورد مين.

---

## ٤. [[npx vitest run --changed origin/main]]

بيشغّل الاختبارات اللي بتستورد (مباشرة أو بالتسلسل) ملفات اتغيرت من [[origin/main]]. والمشروع فيه اختبارين: [[src/sum.test.ts]] و [[src/cart/total.test.ts]].

~~~text الناتج (مفيش أي تعديل)
No test files found, exiting with code 0
~~~

خد بالك: هنا الرسالة exit **صفر**، مش زي [[vitest run tests/api]] اللي بيخرج بـ ١ لما مفيش ملفات. مفيش تغيير = مفيش حاجة تتختبر = تمام.

عدّلت [[src/cart/total.ts]] وعملت commit:

~~~text الناتج (--reporter=verbose)
 ✓ src/cart/total.test.ts > totals 2ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

[[sum.test.ts]] ماشتغلش لأنه مبيستوردش [[total.ts]].

## ٥. [[npx vitest related src/cart/total.ts --run]]

~~~text الناتج
 ✓ src/cart/total.test.ts > totals 2ms
~~~

[[related]] بياخد ملفات انت بتحددها بدل ما يسأل Git. و [[--run]] عشان [[related]] من غيره بيقعد watch. ومع [[src/sum.ts]] اشتغل [[sum.test.ts]] بس.

---

## ٦. [[time npm run check]]

[[time]] في bash بيشغّل الأمر ويطبع وقته. [[check]] هنا كان الأربعة ورا بعض بالكاش:

~~~text الناتج
real	0m4.348s
user	0m0.060s
sys	0m0.106s
~~~

- [[real]] الوقت الفعلي على الساعة، وده اللي يهمك.
- [[user]] و [[sys]] وقت المعالج للـ process نفسه. صغيرين هنا لأن الشغل الحقيقي في processes تانية (node)، و Git Bash مبيحسبهاش.

في PowerShell مفيش [[time]]، فيه [[Measure-Command]]:

~~~powershell
(Measure-Command { npm run check | Out-Null }).TotalSeconds
~~~

~~~text الناتج
4.0018219
~~~

نفس الرقم تقريبًا في PowerShell 7 و 5.1 (٤.٠ و ٣.٩). [[Out-Null]] بيرمي الناتج عشان يتقاس الوقت بس.

---

## الملخص

| الأمر | الكاش فين | التانية أسرع لأن |
|---|---|---|
| [[eslint --cache]] | [[.eslintcache]] أو [[--cache-location]] | الملفات اللي متغيرتش مبتتفحصش |
| [[prettier --cache]] | [[node_modules/.cache/prettier]] | نفسه |
| [[tsc --incremental]] | [[.tsbuildinfo]] أو [[--tsBuildInfoFile]] | بيفحص المتغير واللي بيعتمد عليه |
| [[vitest run --changed ref]] | Git نفسه | بيشغّل الاختبارات المتأثرة بس |
| [[vitest related file --run]] | شجرة الـ imports | نفسه لملفات بتحددها |

## الخلاصة

- قارن المرة **التانية** بالكاش، الأولى بتبنيه.
- حط الكاش في [[node_modules/.cache]] عشان ميدخلش Git.
- [[--changed]] للسرعة وانت شغال وفي PRs، مع فحص كامل على main، لأن اختبار بيقرا JSON أو داتابيز مش بيتحسب «متأثر».`,
          lines: [
            "lint بكاش: الملفات اللي متغيرتش مش بتتفحص تاني.",
            "نفسه لـ prettier.",
            "tsc يفتكر اللي فحصه في ملف، ويفحص المتغير واللي بيعتمد عليه بس.",
            "الاختبارات اللي ليها علاقة بملفات اتغيرت من main بس.",
            "الاختبارات اللي بتلمس الملف ده، مرة واحدة من غير watch.",
            "قيس الفحص كله بياخد كام ثانية."
          ],
          sol: R`على مشروع صغير الفرق صغير: عندي [[npx eslint .]] أخد 1394ms و 1356ms، و [[--cache]] أخد 1284ms أول مرة و 1029ms التانية. أغلب الوقت هنا تشغيل Node وتحميل الـ config، مش فحص الملفات. و [[--cache]] عمل ملف [[.eslintcache]] في root المشروع (حطه في [[.gitignore]]، أو استخدم [[--cache-location]] زي المثال).

على مشروع حقيقي فيه مئات الملفات، وخصوصًا مع قواعد typescript-eslint اللي محتاجة الأنواع، المرة التانية بـ cache بتنزل من ثواني كتير لثانية أو اتنين، لأن ESLint بيفحص الملفات اللي اتغيرت بس.

الأخطاء الشائعة: تقارن أول مرة بـ cache بأول مرة من غيره فمتلاقيش فرق، لأن الـ cache بيتبني في الأولى. أو تعمل cache في CI من غير ما تحفظ الفولدر بين الـ runs ([[actions/cache]])، فكل run بيبدأ من الصفر.`
        }
      ]
    }
]);
