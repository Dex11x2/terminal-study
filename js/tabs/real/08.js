// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "CI و Git hooks",
      l: 3,
      n: "كل push بيتفحص: الكود، والـ migrations على قاعدة حقيقية، والأنواع، والـ APK",
      items: [
        {
          cmd: "ci.yml: monorepo",
          title: "CI لـ monorepo بالترتيب من الأرخص للأغلى",
          desc: R`الشكل القياسي لأي مشروع: format ثم lint ثم types ثم tests ثم build. كل خطوة أرخص وأسرع من اللي بعدها، فالخطأ البسيط يطلع في ثواني بدل ما تستنى build كامل.

وكل سكربت في package.json بتاع الجذر بينادي [[pnpm -r]]، فالـ CI مش محتاج يعرف أسماء الباكدجات.`,
          example: R`name: CI
on:
  push: { branches: [main, dev] }
  pull_request: { branches: [main, dev] }
permissions: { contents: read }
concurrency: { group: "ci-$__{{ github.ref }}", cancel-in-progress: true }
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - name: Format
        run: pnpm format:check        # prettier --check .
      - name: Lint
        run: pnpm lint                # eslint . --max-warnings=0
      - name: Typecheck
        run: pnpm typecheck           # pnpm -r typecheck
      - name: Test
        run: pnpm test                # pnpm -r test
      - name: Build
        run: pnpm build               # pnpm -r build`,
          try: "في ريبو تجريبي فيه workspace صغير اعمل السكربتات الخمسة في package.json بتاع الجذر وشغّلهم بإيدك بالترتيب. بعدين ارفع الملف، واعمل PR فيه مسافة زيادة، وشوف الـ CI يقع في Format قبل ما يوصل للـ build.",
          flag: "script",
          deep: {
            why: "من غير CI، «شغال عندي» هو الاختبار الوحيد. ومن غير ترتيب، أول غلطة تنسيق بتستنى build ٥ دقايق عشان تظهر.",
            how: R`[[pnpm/action-setup@v6]] من غير [[version]] بيقرا نسخة pnpm من [[packageManager]] في package.json، فالنسخة في مكان واحد.

[[cache: pnpm]] في setup-node بيحفظ الـ store بتاع pnpm بين الـ runs. و [[--frozen-lockfile]] بيفشل لو pnpm-lock.yaml مش متوافق مع package.json، بدل ما يعدّله في صمت.

كل step لو فشل الـ job بيقف، فالترتيب هو اللي بيحدد إنت هتستنى قد إيه عشان تعرف الغلطة.

[[permissions: contents: read]] بيقلّل صلاحيات التوكن اللي الـ workflow بياخده لأقل حاجة. و [[concurrency]] مع [[cancel-in-progress]] بيلغي الـ run القديم لو عملت push جديد على نفس الفرع.

والسكربتات في الجذر: [["lint": "eslint . --max-warnings=0"]] (أي warning يفشّل)، و [["typecheck": "pnpm -r typecheck"]] بيشغّل typecheck في كل باكدج فيها السكربت ده.`,
            when: "أي مشروع فيه أكتر من شخص أو أكتر من باكدج. الأدوات نفسها (prettier و eslint و tsc و vitest) في تاب فحص الكود، و concurrency و cache في تاب GitHub Actions.",
            mistakes: R`في مشروع حقيقي كان فيه [[version: 10]] في action-setup ومعاه packageManager في package.json. لو النسختين اختلفوا الـ action بيفشل. سيب واحد بس.

والـ CONTRIBUTING كان بيقول إن dev هو الفرع الأساسي، والـ CI بيشتغل على main بس، فالـ PRs اللي رايحة لـ dev مكانتش بتتفحص خالص.

ومكانش فيه concurrency ولا permissions. وسكربت lint في تطبيق الأدمن كان لسه [[next lint]]، ودا اتشال في Next الجديد، فالخطوة كانت هتقع أول ما حد يحدّث.`
          },
          teach: R`## الأول: الملف ده بيتقري إزاي

ده ملف GitHub Actions، بيتحط في [[.github/workflows/ci.yml]] جوه الريبو. GitHub بيقراه بعد كل push أو PR، ويشغّل الخطوات على جهاز لينكس نضيف (اسمه runner). الملف مكتوب YAML: المسافات معناها «مين تبع مين»، و [[- ]] أول السطر معناها عنصر في قايمة.

اللي جربته:

- **الملف نفسه** بـ [[actionlint]] 1.7.12 (أداة بتفحص ملفات Actions: الـ YAML، وأسامي الـ events، و inputs بتاعة الـ actions المشهورة). ولقيت غلطة حقيقية في سطر [[concurrency]] اتصلّحت (تحت).
- **أوامر الـ run** نفسها على ويندوز، في monorepo تجربة بـ pnpm 10.33: باكدج واحدة [[packages/core]] فيها دالة وتست.
- التشغيل على GitHub نفسه (الـ runner و [[skipped]] والكاش) من الـ docs.

---

## ١. الهيدر: إمتى وبأنهي صلاحيات

### [[name: CI]]

الاسم اللي بيظهر في تاب Actions وجنب الـ commit.

### [[on:]]

~~~text
on:
  push: { branches: [main, dev] }
  pull_request: { branches: [main, dev] }
~~~

الأحداث اللي تشغّل الملف. [[push]] على main أو dev، و [[pull_request]] رايح **لـ** main أو dev (الـ [[branches]] هنا الفرع الهدف). و [[{ }]] و [[[ ]]] كتابة YAML في سطر واحد (flow style): [[{ branches: [main, dev] }]] = خريطة فيها مفتاح [[branches]] قيمته قايمة.

### [[permissions: { contents: read }]]

كل run بياخد توكن اسمه [[GITHUB_TOKEN]] يقدر يعمل حاجات على الريبو. السطر ده بيقلّله لـ «يقرا الكود بس»، فلو خطوة اتخترقت (مكتبة فيها كود خبيث) متقدرش تكتب في الريبو.

### [[concurrency: { group: "ci-$__{{ github.ref }}", cancel-in-progress: true }]]

- [[$__{{ github.ref }}]] تعبير بيتحسب وقت التشغيل: [[github.ref]] اسم الفرع زي [[refs/heads/main]]. فالـ group بيبقى [[ci-refs/heads/main]].
- runs في نفس الـ group مبيشتغلوش مع بعض، و [[cancel-in-progress: true]] بيلغي القديم لما جديد يبدأ. ٣ pushes ورا بعض = run واحد كامل بس.

**الـ quotes دي لازمة.** النسخة الأولى من الدرس كانت [[group: ci-$__{{ github.ref }}]] من غير quotes، و actionlint رفضها:

~~~text الناتج
ci.yml:5:13: could not parse as YAML: did not find expected ',' or '}' [syntax-check]
~~~

جوه [[{ ... }]] الحروف [[{]] و [[}]] و [[,]] ليها معنى في YAML، فـ [[$__{{]] بيقفل الخريطة في نص القيمة. الـ quotes بتخلي القيمة كلها نص واحد. (لو كتبتها على كذا سطر، [[group: ci-$__{{ github.ref }}]] لوحدها في سطرها بتشتغل من غير quotes.) وبعد التصليح:

~~~text الناتج
(ولا رسالة، exit 0)
~~~

---

## ٢. الـ job والـ steps

~~~text
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
~~~

[[jobs]] الشغلانات، وكل واحدة على جهاز لوحدها. هنا واحدة اسمها [[quality]] (اسم بتختاره). [[runs-on: ubuntu-latest]] أحدث Ubuntu عند GitHub. و [[steps]] خطوات بتتنفّذ بالترتيب، وأول واحدة تفشل الباقي بيتعلّم عليه [[skipped]].

### الـ ٣ actions

[[uses:]] معناها «شغّل action جاهزة» بصيغة [[صاحبها/اسمها@النسخة]]. [[@v7]] رقم major، فبتاخد أي تصليح جوه v7 من غير ما الكود يتكسر.

| الخطوة | بتعمل إيه |
|---|---|
| [[actions/checkout@v7]] | تنزّل كود الريبو على الـ runner (من غيرها الجهاز فاضي) |
| [[pnpm/action-setup@v6]] | تسطّب pnpm. من غير [[version]] بتقرا [[packageManager]] من [[package.json]] |
| [[actions/setup-node@v7]] + [[with: { node-version: 22, cache: pnpm }]] | تسطّب Node 22، و [[cache: pnpm]] يحفظ مكتبات pnpm بين الـ runs بمفتاح من [[pnpm-lock.yaml]] |

[[with:]] الـ inputs بتاعة الـ action. وترتيب الاتنين مهم: [[cache: pnpm]] محتاج pnpm يكون متسطّب، فـ action-setup قبل setup-node. في تجربتي [[package.json]] فيه:

~~~text package.json
"packageManager": "pnpm@10.33.2",
~~~

### [[run: pnpm install --frozen-lockfile]]

[[run:]] أمر shell عادي. [[--frozen-lockfile]] سطّب بالظبط اللي في الـ lock، ولو [[package.json]] فيه حاجة مش في الـ lock افشل. جربت أضيف مكتبة في [[package.json]] بإيدي من غير ما أحدّث الـ lock:

~~~text الناتج
 ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>\package.json

Note that in CI environments this setting is true by default.
~~~

(pnpm بيشغّله تلقائيًا في CI، بس كتابته صريح أوضح.)

---

## ٣. الخمس خطوات من الأرخص للأغلى

كل خطوة ليها [[name:]] (اللي بيظهر في GitHub) و [[run:]]. والتعليق بعد [[#]] بيقولك السكربت ده بيعمل إيه في [[package.json]] بتاع الجذر:

~~~text package.json (scripts)
"format:check": "prettier --check .",
"lint": "eslint . --max-warnings=0",
"typecheck": "pnpm -r typecheck",
"test": "pnpm -r test",
"build": "pnpm -r build"
~~~

[[pnpm -r]] (r = recursive) بيشغّل السكربت ده في **كل** باكدج في الـ workspace عندها سكربت بالاسم ده. فالـ CI مش محتاج يعرف أسماء الباكدجات.

### Format: [[prettier --check .]]

[[--check]] متعدّلش، بس قول مين مش متنسّق. على كود سليم:

~~~text الناتج
Checking formatting...
All matched files use Prettier code style!
~~~

وبعد ما حطيت مسافات زيادة في [[sum.ts]]:

~~~text الناتج
Checking formatting...
[warn] packages/core/src/sum.ts
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
 ELIFECYCLE  Command failed with exit code 1.
~~~

exit 1، فعلى GitHub الـ job كان هيقف هنا.

### Lint: [[eslint . --max-warnings=0]]

eslint بيطلّع errors و warnings، والـ warnings لوحدها مش بتفشّل. [[--max-warnings=0]] يعني «أي warning = فشل». جربت قاعدة [[no-console]] كـ warning وسطر [[console.log]]:

~~~text الناتج
من غير --max-warnings=0:   ✖ 1 problem (0 errors, 1 warning)            exit 0
بيه:                        ESLint found too many warnings (maximum: 0).  exit 1
~~~

### Typecheck و Test و Build

| الخطوة | جوه [[packages/core]] | الناتج عندي |
|---|---|---|
| [[pnpm typecheck]] | [[tsc --noEmit]]: افحص الأنواع ومتطلّعش ملفات | exit 0 |
| [[pnpm test]] | [[vitest run]]: شغّل التستات مرة واحدة (من غير watch) | [[Test Files  1 passed (1)]] |
| [[pnpm build]] | [[tsc]]: طلّع JavaScript في [[dist]] | exit 0 |

(في التجربة استخدمت TypeScript 6، لأن typescript-eslint رفض TypeScript 7 برسالة [[typescript-eslint does not support TS 7.0.]]. لو حدّثت TypeScript في مشروعك، اتأكد إن الأدوات التانية بتدعمه.)

### ليه الترتيب ده؟

على جهازي، Format خلص في أقل من ثانية، والتست في 0.76 ثانية بعد ما الأدوات اتحمّلت، والـ build هو الأتقل في أي مشروع حقيقي. لو الـ build أول خطوة، غلطة مسافة هتستنى build كامل عشان تظهر. ولما خطوة تفشل، GitHub بيعلّم على كل اللي بعدها [[skipped]] (من الـ docs).

---

## الخلاصة

| الجزء | السطر | ليه |
|---|---|---|
| إمتى | [[on: push / pull_request]] على main و dev | الفرعين بيتفحصوا |
| الأمان | [[permissions: { contents: read }]] | التوكن يقرا بس |
| run واحد للفرع | [[concurrency]] + [[cancel-in-progress]]، والـ group بين quotes | |
| الأدوات | checkout ← pnpm من [[packageManager]] ← Node بكاش | |
| التسطيب | [[--frozen-lockfile]] | الـ lock هو الحَكَم |
| الترتيب | format ← lint ← typecheck ← test ← build | الغلطة الرخيصة تبان الأول |
| monorepo | [[pnpm -r]] | الجذر بينادي كل الباكدجات |`,
          lines: [
            "اسم الـ workflow.",
            "إمتى يشتغل:",
            "push على main أو dev.",
            "وأي PR رايح لـ main أو dev.",
            "التوكن يقرا بس.",
            "push جديد يلغي الـ run القديم على نفس الفرع.",
            "الـ jobs.",
            "job واحد اسمه quality.",
            "على لينكس.",
            "الخطوات:",
            "هات الكود.",
            "سطّب pnpm بالنسخة اللي في packageManager.",
            "سطّب Node...",
            "...22، وخزّن الـ store بتاع pnpm.",
            "سطّب بالظبط اللي في الـ lock.",
            "اسم الخطوة.",
            "التنسيق (الأرخص).",
            "اسم الخطوة.",
            "lint، وأي warning فشل.",
            "اسم الخطوة.",
            "فحص الأنواع.",
            "اسم الخطوة.",
            "الاختبارات.",
            "اسم الخطوة.",
            "الـ build (الأغلى)."
          ],
          sol: R`في [[package.json]] بتاع الجذر:

[[format:check]] = [[prettier --check .]]، [[lint]] = [[eslint . --max-warnings=0]]، [[typecheck]] = [[pnpm -r typecheck]]، [[test]] = [[pnpm -r test]]، [[build]] = [[pnpm -r build]].

بإيدك بالترتيب: [[pnpm format:check]] على كود سليم بيطبع [[All matched files use Prettier code style!]]، وكل واحد بعده بيخلص بـ exit 0. بعد ما تضيف مسافة زيادة، [[format:check]] بيطبع [[[warn] src/x.ts]] و [[Code style issues found in the above file. Run Prettier with --write to fix.]] وexit 1.

في الـ PR: الـ job بيقع في خطوة Format، وكل الخطوات بعدها عليها علامة skipped، فمادفعتش وقت build عشان مسافة. ده سبب الترتيب من الأرخص للأغلى. لو الـ CI قال [[ERR_PNPM_OUTDATED_LOCKFILE]] يبقى نسيت تعمل commit للـ [[pnpm-lock.yaml]] بعد ما ضفت مكتبة، و [[--frozen-lockfile]] رفض يعدّله.`
        },
        {
          cmd: "ci.yml: Postgres + Prisma",
          title: "CI بقاعدة بيانات حقيقية تجرّب الـ migrations",
          desc: R`الـ job ده بيشغّل Postgres حقيقي جنبه كـ service، ويطبّق الـ migrations على قاعدة فاضية بنفس الأمر اللي هيتشغّل في الإنتاج، وبعدين types وتست و build.

لو فيه migration مكسورة، تعرف في الـ PR، مش وانت بتعمل deploy.`,
          example: R`name: CI
on:
  push: { branches: [main] }
  pull_request:
concurrency: { group: "ci-$__{{ github.ref }}", cancel-in-progress: true }
jobs:
  test:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: web } }
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_USER: ci, POSTGRES_PASSWORD: ci, POSTGRES_DB: myapp }
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U ci" --health-interval 5s --health-retries 10
    env:
      DATABASE_URL: postgresql://ci:ci@localhost:5432/myapp
      AUTH_SECRET: ci-only-not-a-real-secret
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
        with: { package_json_file: web/package.json }
      - uses: actions/setup-node@v7
        with: { node-version: 22, cache: pnpm, cache-dependency-path: web/pnpm-lock.yaml }
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec prisma generate
      - run: pnpm exec prisma migrate deploy
      - run: pnpm exec tsc --noEmit
      - run: pnpm test
      - run: pnpm run build`,
          try: "في مشروع Prisma تجريبي اعمل migration فيها غلطة SQL متعمّدة (عمود بنوع غلط) وارفعها في PR. شوف الـ CI يقع في خطوة migrate deploy، وبعدين صلّحها.",
          flag: "script",
          deep: {
            why: "[[prisma migrate dev]] على جهازك بيطبّق على قاعدة فيها تاريخك كله، فممكن migration تعدّي عندك وتفشل على قاعدة جديدة. الإنتاج هيشغّل [[migrate deploy]] على قاعدة ممكن تكون فاضية أو قديمة، فلازم تجرّب ده بالظبط.",
            how: R`[[services:]] بيشغّل container Postgres جنب الـ job، و [[ports: 5432:5432]] بيخليه على localhost بالنسبة للخطوات. والـ [[options]] دي flags لـ docker run: healthcheck بيخلي GitHub يستنى لحد ما القاعدة تقوم قبل أول step.

[[defaults.run.working-directory: web]] كل [[run:]] بيتنفّذ من web/ (التطبيق في فولدر فرعي).

[[env:]] على مستوى الـ job: [[DATABASE_URL]] للقاعدة المؤقتة، و [[AUTH_SECRET]] قيمة وهمية عشان الـ build ميقعش. دي مقبولة في YAML لأنها للـ CI بس، وأي سر حقيقي مكانه secrets.

[[package_json_file]] بيقول لـ action-setup يقرا packageManager من web/package.json. و [[cache-dependency-path]] بيقول لـ setup-node فين الـ lock عشان مفتاح الكاش.

[[prisma generate]] بيعمل الـ client، و [[migrate deploy]] بيطبّق كل الـ migrations اللي في prisma/migrations بالترتيب من غير ما يولّد جديد ومن غير ما يسأل، زي الإنتاج بالظبط.`,
            when: "أي مشروع فيه migrations. services بالتفصيل في تاب GitHub Actions، و Prisma migrate في تاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان setup-node من غير [[cache: pnpm]]، فكل run بيحمّل كل المكتبات من الأول (دقايق زيادة في كل PR).

وكان فيه [[corepack enable]] من غير [[packageManager]] في web/package.json، فنسخة pnpm اللي بتتسطب مش متثبتة وممكن تتغير من يوم للتاني.

ومكانش فيه concurrency، فعشر pushes ورا بعض بيعملوا عشر runs كاملين.`
          },
          teach: R`## الأول: job فيه قاعدة بيانات

نفس فكرة الـ CI اللي قبله (لو مقريتوش: [[on]] و [[concurrency]] و [[steps]] و [[uses]] متشرحين هناك سطر سطر)، بس هنا الـ job بيشغّل جنبه Postgres حقيقي فاضي، ويطبّق عليه الـ migrations زي الإنتاج بالظبط، قبل التست والـ build.

جربت الملف بـ actionlint 1.7.12 (عدّى بعد تصليح الـ quotes في [[concurrency]]، نفس الغلطة اللي في الدرس اللي فات). وشغّلت خطوات الـ run نفسها على ويندوز في فولدر [[web/]]: Prisma 7.10 و pnpm 10.33، و Postgres 16 في container بنفس الـ env والـ health options (على بورت 5439 عندي بدل 5432 لأن 5432 مشغول). تشغيل الـ workflow على GitHub نفسه من الـ docs.

---

## ١. الجديد في الهيدر

### [[pull_request:]] من غير حاجة

يعني أي PR رايح لأي فرع. و [[push]] على main بس.

### [[defaults: { run: { working-directory: web } }]]

التطبيق مش في جذر الريبو، في [[web/]]. السطر ده بيخلي **كل** [[run:]] في الـ job يتنفّذ من [[web/]]، بدل ما تكتب [[cd web &&]] قبل كل أمر. (بيأثر على [[run]] بس، مش على الـ [[uses]].)

---

## ٢. [[services:]]: Postgres جنب الـ job

~~~text
services:
  postgres:
    image: postgres:16
    env: { POSTGRES_USER: ci, POSTGRES_PASSWORD: ci, POSTGRES_DB: myapp }
    ports: ["5432:5432"]
    options: >-
      --health-cmd "pg_isready -U ci" --health-interval 5s --health-retries 10
~~~

[[services]] containers بيقوموا قبل أول step ويتمسحوا بعد الـ job. [[postgres]] اسم الخدمة.

| السطر | معناه |
|---|---|
| [[image: postgres:16]] | الـ image الرسمية |
| [[env: {...}]] | اليوزر والباسورد والقاعدة اللي هتتعمل أول تشغيل (للـ CI بس، القاعدة بتتمسح بعد الـ run) |
| [[ports: ["5432:5432"]]] | بورت الـ container على الـ runner نفسه، فالخطوات توصله على [[localhost:5432]] |
| [[options:]] | flags زيادة بتتبعت لـ [[docker create]] |

### [[>-]] في YAML

[[>]] معناها «السطور اللي تحت نص واحد، والسطر الجديد يبقى مسافة»، و [[-]] بعدها «شيل السطر الفاضي من الآخر». فالـ options بتبقى سطر واحد.

### الـ health flags

[[--health-cmd "pg_isready -U ci"]]: [[pg_isready]] أداة مع Postgres بترجع 0 لو بيقبل اتصالات. [[--health-interval 5s]] كل ٥ ثواني، و [[--health-retries 10]] ١٠ محاولات. GitHub بيستنى الـ service تبقى healthy قبل أول step (من الـ docs). شغّلت نفس الـ flags بـ [[docker run]]:

~~~text docker inspect --format '{{.State.Health.Status}}'
healthy
~~~

من غيرها أول خطوة بتلمس القاعدة ممكن تيجي قبل ما Postgres يقوم. ده شكل الغلطة لما القاعدة مش موجودة على البورت:

~~~text الناتج
Error: P1001: Can't reach database server at $__btlocalhost:5499$__bt
Please make sure your database server is running at $__btlocalhost:5499$__bt.
~~~

---

## ٣. [[env:]] على مستوى الـ job

~~~text
env:
  DATABASE_URL: postgresql://ci:ci@localhost:5432/myapp
  AUTH_SECRET: ci-only-not-a-real-secret
~~~

متغيرات بيئة لكل الخطوات. [[DATABASE_URL]]: النوع [[postgresql://]]، اليوزر والباسورد [[ci:ci]]، [[@localhost:5432]]، والقاعدة [[myapp]]، نفس اللي في الـ service. و [[AUTH_SECRET]] قيمة وهمية، لأن مكتبات الـ auth بتقع وقت الـ build لو مش موجود. كتابتها في الملف مقبولة لأنها مش سر؛ أي سر حقيقي مكانه [[$__{{ secrets.NAME }}]].

---

## ٤. التسطيب

| الخطوة | الجديد |
|---|---|
| [[pnpm/action-setup@v6]] + [[package_json_file: web/package.json]] | اقرا [[packageManager]] من [[web/package.json]] مش الجذر (الـ action مش بتتأثر بـ [[defaults.run]]) |
| [[setup-node@v7]] + [[cache-dependency-path: web/pnpm-lock.yaml]] | مفتاح الكاش من الـ lock اللي في [[web/]] |
| [[pnpm install --frozen-lockfile]] | من [[web/]] بسبب الـ defaults |

---

## ٥. الخطوات بالترتيب

### [[pnpm exec prisma generate]]

[[pnpm exec]] يشغّل أداة من [[node_modules]] بتاعة المشروع. [[generate]] بيقرا [[schema.prisma]] ويعمل كود الـ Prisma Client بالأنواع (من غيره [[tsc]] مش هيلاقي الأنواع):

~~~text الناتج
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.
✔ Generated Prisma Client (7.10.0) to .\src\generated\prisma in 46ms
~~~

### [[pnpm exec prisma migrate deploy]]

بيطبّق كل فولدر في [[prisma/migrations]] لسه متطبّقش، بالترتيب، ومن غير ما يولّد جديد أو يسأل. القاعدة هنا فاضية، فبيطبّقهم كلهم من الأول:

~~~text الناتج
Datasource "db": PostgreSQL database "myapp", schema "public" at "localhost:5439"
The following migration(s) have been applied:
migrations/
  └─ 20260930000000_init/
    └─ migration.sql
All migrations have been successfully applied.
~~~

وتاني مرة على نفس القاعدة:

~~~text الناتج
1 migration found in prisma/migrations
No pending migrations to apply.
~~~

ودي الحالة اللي الـ CI عملها عشانها: ضفت migration فيها نوع غلط ([[INTEGR]] بدل [[INTEGER]]):

~~~text الناتج
2 migrations found in prisma/migrations
Applying migration $__bt20260930120000_add_age$__bt
Error: P3018
A migration failed to apply. New migrations cannot be applied before the error is recovered from.
Migration name: 20260930120000_add_age
Database error code: 42704
Database error:
ERROR: type "integr" does not exist
~~~

exit 1، فعلى GitHub الخطوات اللي بعدها مش هتشتغل والـ PR عليه علامة حمرا. [[P3018]] كود Prisma لـ «migration فشلت»، و [[42704]] كود Postgres لـ «حاجة مش موجودة». نفس الرسالة اللي كانت هتطلع على سيرفر الإنتاج، بس طلعت في الـ PR.

### [[tsc --noEmit]] و [[pnpm test]] و [[pnpm run build]]

| الخطوة | معناها | الناتج عندي |
|---|---|---|
| [[pnpm exec tsc --noEmit]] | افحص الأنواع (ومنها أنواع Prisma المولّدة) من غير ما تطلّع ملفات | exit 0 |
| [[pnpm test]] | سكربت [[test]] ([[vitest run]] عندي) | [[Tests  1 passed (1)]] |
| [[pnpm run build]] | سكربت [[build]] | exit 0 |

التست يقدر يكلّم القاعدة اللي اتعملت فوق على [[DATABASE_URL]]، والجداول موجودة بعد [[migrate deploy]].

---

## الخلاصة

| الحاجة | السطر |
|---|---|
| قاعدة حقيقية فاضية لكل run | [[services: postgres]] + [[ports: 5432:5432]] |
| متبدأش قبل ما القاعدة تقوم | [[options: --health-cmd "pg_isready ..."]] |
| التطبيق في فولدر فرعي | [[defaults.run.working-directory: web]] + [[package_json_file]] + [[cache-dependency-path]] |
| رابط القاعدة | [[env: DATABASE_URL]] على مستوى الـ job |
| زي الإنتاج بالظبط | [[prisma migrate deploy]] قبل التست والـ build |
| migration مكسورة | [[Error: P3018]] في الـ PR مش في الـ deploy |`,
          lines: [
            "اسم الـ workflow.",
            "إمتى يشتغل:",
            "push على main.",
            "وأي PR.",
            "push جديد يلغي القديم.",
            "الـ jobs.",
            "job اسمه test.",
            "على لينكس.",
            "كل run من فولدر web.",
            "خدمات جنب الـ job:",
            "Postgres.",
            "النسخة 16.",
            "اليوزر والباسورد والقاعدة (للـ CI بس).",
            "على localhost:5432.",
            "flags لـ docker run:",
            "healthcheck عشان يستنى القاعدة تقوم.",
            "متغيرات لكل الخطوات:",
            "رابط القاعدة المؤقتة.",
            "قيمة وهمية عشان الـ build.",
            "الخطوات:",
            "هات الكود.",
            "سطّب pnpm...",
            "...بالنسخة اللي في web/package.json.",
            "سطّب Node...",
            "...22، وكاش pnpm من الـ lock بتاع web.",
            "سطّب بالظبط اللي في الـ lock.",
            "اعمل Prisma client.",
            "طبّق الـ migrations زي الإنتاج.",
            "فحص الأنواع.",
            "الاختبارات.",
            "الـ build."
          ],
          sol: R`اعمل migration فيها غلطة، مثلًا [[ALTER TABLE "User" ADD COLUMN "age" INTEGR;]] (نوع مش موجود). في الـ PR، خطوة [[pnpm exec prisma migrate deploy]] هتقع برسالة زي:

[[Error: P3018 ... Migration name: 20260930120000_add_age]]
[[Database error: ERROR: type "integr" does not exist]]

والخطوات اللي بعدها (tsc و test و build) مش هتشتغل. ده بالظبط اللي كان هيحصل على سيرفر الإنتاج، بس هنا وقع في CI على قاعدة فاضية.

بعد التصليح اتأكد إنك عدّلت ملف الـ migration نفسه أو عملت واحدة جديدة، مش [[schema.prisma]] بس. ولو الـ CI قال [[Can't reach database server at localhost:5432]]، الـ service لسه بتقوم والـ health options ناقصة. ولو [[migrate deploy]] قال [[No pending migrations]] وانت ضايف واحدة، يبقى نسيت تعمل commit لفولدر [[prisma/migrations]]. (شغّلت خطوات الـ run نفسها على جهازي بـ Prisma 7.10 و Postgres 16 في Docker، والـ migration الغلط طلّعت [[Error: P3018]] و [[ERROR: type "integr" does not exist]] بالظبط. الـ workflow على GitHub نفسه من الـ docs.)`
        },
        {
          cmd: "db-schema-check.yml",
          title: "CI يفشل لو الأنواع اختلفت عن قاعدة البيانات",
          desc: R`بيولّد أنواع TypeScript من الـ schema الحقيقي في Supabase، ويقارنها باللي في الريبو بـ [[git diff --exit-code]]. لو فيه فرق، حد غيّر القاعدة ومحدّثش الأنواع، والكود ممكن يقع بـ column does not exist في الإنتاج.

الأصلي كان بيطبع الفرق بس ومبيفشلش، فالـ CI كان أخضر دايمًا.`,
          example: R`name: DB Schema Check
on:
  push:
    branches: [main]
    paths: ['supabase/migrations/**', 'lib/supabase/**']
  pull_request:
    branches: [main]
jobs:
  types-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: supabase/setup-cli@v3
      - run: supabase gen types typescript --project-id "$PROJECT_REF" > lib/supabase/database.types.ts
        env:
          SUPABASE_ACCESS_TOKEN: $__{{ secrets.SUPABASE_ACCESS_TOKEN }}
          PROJECT_REF: $__{{ vars.SUPABASE_PROJECT_REF }}
      - name: Fail on type drift
        run: |
          git diff --exit-code lib/supabase/database.types.ts \
            || { echo "::error::Types drifted. Run npm run types:generate and commit."; exit 1; }`,
          try: "في ريبو تجريبي اعمل ملف، واعمله commit، وعدّله من غير commit، وشغّل [[git diff --exit-code file; echo $?]]. هيطبع الفرق وبعده 1. رجّعه بـ [[git checkout file]] وجرّب تاني: 0.",
          flag: "script",
          deep: {
            why: "الأنواع المولّدة (database.types.ts) هي اللي بتخلي TypeScript يمسك [[select('instrcutor')]] الغلط. بس لو القاعدة اتغيّرت والملف متحدّثش، TypeScript بيطمّنك على schema قديم.",
            how: R`[[supabase/setup-cli@v3]] بيسطّب الـ CLI الرسمي في الـ runner. [[supabase gen types typescript --project-id]] بيقرا الـ schema من المشروع ويكتب الأنواع فوق الملف اللي في الريبو.

[[git diff --exit-code]] بيطبع الفرق زي [[git diff]] العادي، بس بيخرج بـ 1 لو فيه فرق. و [[--quiet]] نفس الفكرة من غير طباعة. فلو الملف اللي اتولّد مختلف عن اللي في الـ commit، الخطوة تفشل.

[[::error::]] سطر خاص بيطلع كـ annotation حمرا فوق الـ run في GitHub، فاللي يفتح الـ PR يشوف السبب والحل على طول.

[[secrets]] للتوكن، و [[vars]] للـ project ref (مش سر، بس مكانه إعدادات الريبو مش الكود).`,
            when: "أي مشروع بيولّد أنواع أو كود من مصدر تاني (Supabase أو Prisma أو OpenAPI). ونفس الفكرة لأي ملف مولّد: ولّد وقارن. git diff في تاب Git، و ::error:: في تاب GitHub Actions.",
            mistakes: R`في مشروع حقيقي خطوة «كشف الاختلاف» كانت بتطبع الـ diff بس، من غير [[exit 1]]، فالـ CI أخضر حتى لو فيه اختلاف. ومحدش بيقرا لوج run أخضر.

وكانت بتشتغل على push لـ main بس، يعني بعد ما الغلطة اتدمجت. هنا بتشتغل على PRs كمان. بس خد بالك: PR من fork مش بيوصله secrets، فالخطوة هتفشل هناك.

و [[npm install -g supabase]] مش مدعوم، والصح [[supabase/setup-cli@v3]]. والـ project-id كان مكتوب في package.json ومختلف عن الـ ref اللي في ملفات تانية، يعني مشروعين والأنواع بتتولّد من الغلط.

وخطوة تانية كانت بتفحص الـ schema بمفتاح service_role الحقيقي على كل PR. المفتاح ده بيعدّي RLS، فمكانه أضيق حاجة ممكنة.`
          },
          teach: R`## الأول: ولّد وقارن

الفكرة كلها في خطوتين: **ولّد** ملف الأنواع من قاعدة البيانات الحقيقية فوق الملف اللي في الريبو، وبعدين **قارن**: لو الملف اتغيّر، يبقى اللي في الريبو قديم، فالـ job يفشل.

اللي جربته: الملف بـ actionlint 1.7.12 (عدّى)، وخطوة المقارنة نفسها بالحرف في bash (Git Bash) على ريبو تجربة فيه [[lib/supabase/database.types.ts]] متسجّل. خطوة [[supabase gen types]] محتاجة مشروع Supabase وتوكن حقيقي، فشكلها من الـ docs. وحدّثت الـ action لـ [[supabase/setup-cli@v3]] (آخر major، اتأكدت من الـ tags بتاعة الريبو؛ [[v1]] لسه موجود كفرع قديم).

---

## ١. إمتى يشتغل

~~~text
on:
  push:
    branches: [main]
    paths: ['supabase/migrations/**', 'lib/supabase/**']
  pull_request:
    branches: [main]
~~~

- [[push]] على main، بس لو الـ push غيّر ملف في واحد من المسارين دول. [[paths]] فلتر: [[**]] يعني «أي ملف في أي فولدر تحت». فـ push بيغيّر صفحة بس مش هيشغّله.
- [[pull_request]] رايح لـ main: **من غير** [[paths]]، فكل PR بيتفحص. ده المهم، لأنه بيمسك الغلطة قبل الدمج.

---

## ٢. الـ job

[[jobs: types-drift:]] اسم الـ job (drift = «انحراف»: الأنواع بعدت عن القاعدة). على [[ubuntu-latest]]، وبعدين [[actions/checkout@v7]] ينزّل الكود.

### [[uses: supabase/setup-cli@v3]]

action رسمية من Supabase بتسطّب أمر [[supabase]] على الـ runner. (تسطيبه بـ [[npm install -g supabase]] مش مدعوم.)

### خطوة التوليد

~~~text
- run: supabase gen types typescript --project-id "$PROJECT_REF" > lib/supabase/database.types.ts
  env:
    SUPABASE_ACCESS_TOKEN: $__{{ secrets.SUPABASE_ACCESS_TOKEN }}
    PROJECT_REF: $__{{ vars.SUPABASE_PROJECT_REF }}
~~~

| الجزء | معناه |
|---|---|
| [[supabase gen types typescript]] | اقرا الجداول والأعمدة من القاعدة واكتب أنواع TypeScript |
| [[--project-id "$PROJECT_REF"]] | أنهي مشروع (الـ ref اللي في رابط الداشبورد) |
| [[> lib/supabase/database.types.ts]] | اكتب الناتج **فوق** الملف المتسجّل في الريبو |
| [[env:]] على مستوى الخطوة | متغيرات للخطوة دي بس |
| [[$__{{ secrets.SUPABASE_ACCESS_TOKEN }}]] | من Settings ← Secrets: قيمة مخفية، ومتتطبعش في اللوج. الـ CLI بيقرا المتغير ده بالاسم ده لوحده |
| [[$__{{ vars.SUPABASE_PROJECT_REF }}]] | من Settings ← Variables: مش سر، بس مكانه إعدادات الريبو |

ليه [[PROJECT_REF]] متغير بيئة و [[$PROJECT_REF]] في الأمر، مش [[$__{{ vars... }}]] جوه الأمر على طول؟ لأن التعبير بيتحط في السكربت كنص قبل ما يتنفّذ، والمتغير بيوصل كقيمة. ده الأسلم عمومًا مع أي قيمة جاية من برّه.

---

## ٣. خطوة المقارنة

~~~text
- name: Fail on type drift
  run: |
    git diff --exit-code lib/supabase/database.types.ts \
      || { echo "::error::Types drifted. Run npm run types:generate and commit."; exit 1; }
~~~

### [[run: |]]

[[|]] في YAML: «السطور اللي تحت نص واحد، والسطور الجديدة زي ما هي». فده سكربت bash من سطرين، و [[\]] في آخر الأول يعني مكمّل.

### [[git diff --exit-code FILE]]

[[git diff]] بيقارن الملف على القرص بآخر commit. لوحده بيطبع الفرق وبيخرج بـ 0 **دايمًا**. [[--exit-code]]: نفس الطباعة، بس exit 1 لو فيه فرق. جربت على الريبو:

~~~text الناتج
git diff FILE          (والملف متعدّل)  →  exit 0
git diff --quiet FILE  (والملف متعدّل)  →  exit 1
~~~

[[--quiet]] = [[--exit-code]] من غير طباعة. هنا عايزين الطباعة عشان اللوج يوريك الفرق.

### [[|| { ...; exit 1; }]]

[[||]] يعني «لو اللي قبلي فشل، شغّلني». و [[{ a; b; }]] بيجمع أمرين كأمر واحد (لازم مسافة بعد [[{]] و [[;]] قبل [[}]]).

### [[::error::رسالة]]

سطر بيبدأ بـ [[::error::]] أمر خاص لـ GitHub Actions (workflow command): بيظهر كـ annotation حمرا فوق الـ run وفي صفحة الـ PR، مش مدفون في اللوج. ده من الـ docs؛ محليًا بيتطبع كسطر عادي.

### التجربة

شغّلت الخطوة بالحرف. من غير تعديل:

~~~text الناتج
(ولا حاجة)
exit 0
~~~

وبعد ما زوّدت عمود [[instructor]] في الملف (زي ما [[gen types]] كان هيعمل لو حد ضاف العمود في القاعدة):

~~~text الناتج
--- a/lib/supabase/database.types.ts
+++ b/lib/supabase/database.types.ts
@@ -1,3 +1,3 @@
 export type Database = {
-  public: { Tables: { courses: { Row: { id: number; title: string } } } };
+  public: { Tables: { courses: { Row: { id: number; title: string; instructor: string } } } };
 };
::error::Types drifted. Run npm run types:generate and commit.
exit 1
~~~

اقراه: [[-]] السطر القديم اللي في الريبو، و [[+]] الجديد اللي اتولّد. يعني القاعدة فيها [[instructor]] والكود لسه مش شايفه. الحل: ولّد الأنواع على جهازك واعمل commit.

---

## ٤. فخ: PRs من fork

PR جاي من fork (نسخة حد تاني من الريبو) مش بيوصله [[secrets]] (من الـ docs)، فـ [[SUPABASE_ACCESS_TOKEN]] هيبقى فاضي وخطوة التوليد هتفشل لسبب مش ليه علاقة بالأنواع.

---

## الخلاصة

| الخطوة | الأمر | لو فيه مشكلة |
|---|---|---|
| ولّد | [[supabase gen types typescript --project-id ... > FILE]] | الملف بيتغيّر |
| قارن | [[git diff --exit-code FILE]] | exit 1 (من غير [[--exit-code]] = 0 دايمًا) |
| وضّح | [[echo "::error::..."; exit 1]] | annotation حمرا في الـ PR |
| إمتى | كل PR لـ main، و push لما migrations تتغير | |

ونفس الفكرة تنفع لأي ملف مولّد (Prisma client أو OpenAPI): ولّد فوق المتسجّل، وبعدين [[git diff --exit-code]].`,
          lines: [
            "اسم الـ workflow.",
            "إمتى:",
            "push...",
            "...على main...",
            "...لو اتغيّرت migrations أو كود Supabase.",
            "وأي PR...",
            "...رايح لـ main.",
            "الـ jobs.",
            "job اسمه types-drift.",
            "على لينكس.",
            "الخطوات:",
            "هات الكود.",
            "سطّب Supabase CLI.",
            "ولّد الأنواع فوق الملف اللي في الريبو.",
            "متغيرات الخطوة:",
            "توكن الحساب من secrets.",
            "الـ project ref من vars.",
            "اسم الخطوة.",
            "سكربت متعدد السطور:",
            "فيه فرق عن الـ commit؟...",
            "...رسالة حمرا في GitHub وافشل."
          ],
          sol: R`جربتها بالظبط: بعد تعديل من غير commit، [[git diff --exit-code file; echo $?]] طبع الفرق:

[[@@ -1 +1,2 @@]]
[[ a]]
[[+b]]

وبعده [[1]]. بعد [[git checkout file]] نفس الأمر ماطبعش حاجة وطبع [[0]].

ده كل الفكرة في الـ workflow: بيولّد الأنواع من القاعدة الحقيقية فوق الملف المتسجّل في الريبو. لو حد عمل migration ونسي يولّد الأنواع ويعمل commit، الملف هيتغير و [[--exit-code]] يرجّع 1 فالـ CI يقع برسالة [[Types drifted. Run npm run types:generate and commit.]]. ولو الأنواع متطابقة، 0 والـ job أخضر. وخد بالك إن [[git diff]] من غير [[--exit-code]] بيرجّع 0 دايمًا حتى لو فيه فرق.`
        },
        {
          cmd: "husky + commitlint",
          title: "Git hooks تمنع الكود المش متنسّق قبل الـ commit",
          desc: R`husky بيشغّل سكربتات قبل الـ commit: lint-staged بيعمل eslint و prettier على الملفات المتغيّرة بس، و commitlint بيرفض رسالة commit مش ماشية على الشكل المتفق عليه.

الدرس الأهم هنا من مشروع حقيقي: كل حاجة كانت متسطّبة ومتظبطة، بس ملفات الـ hooks نفسها مكانتش موجودة، فولا حاجة كانت بتشتغل.`,
          example: R`// package.json (جزء)
"scripts": { "prepare": "husky" },
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
},
// commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] };
# الإعداد مرة واحدة، من Git Bash:
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
pnpm exec husky init
echo "pnpm exec lint-staged" > .husky/pre-commit
echo 'pnpm exec commitlint --edit "$1"' > .husky/commit-msg
ls .husky
git add .husky package.json commitlint.config.js
git commit -m "chore: add git hooks"
# جرّب:
git commit --allow-empty -m "fixed stuff"
HUSKY=0 git commit -m "wip"`,
          try: R`في ريبو تجريبي اعمل الإعداد ده، وبعدين اكتب ملف .ts فيه مسافات عشوائية واعمله commit، وشوف prettier ظبطه لوحده. وجرّب [[git commit --allow-empty -m "fixed stuff"]] وشوف commitlint يرفضه.`,
          flag: "script",
          deep: {
            why: "الـ CI بيمسك الكود المش متنسّق بعد الـ push، ودا متأخر: commit زيادة «fix lint» وانتظار. الـ hook بيمسكه على جهازك قبل ما يدخل الريبو أصلًا، وعلى الملفات اللي غيّرتها بس فمش بيبطّأك.",
            how: R`[[husky init]] بيعمل فولدر .husky وملف pre-commit، وبيضيف [["prepare": "husky"]] في package.json. [[prepare]] بيشتغل لوحده بعد أي [[pnpm install]]، فأي حد يعمل clone ويسطّب، الـ hooks بتتفعّل عنده.

husky بيعمل ده بإنه يغيّر [[core.hooksPath]] في git لفولدر [[.husky/_]]. جوه الفولدر ده ملفات صغيرة بتنادي ملفاتك انت: [[.husky/pre-commit]] و [[.husky/commit-msg]]. لو ملفاتك مش موجودة، مفيش حاجة تتشغّل ومفيش أي رسالة.

[[lint-staged]] بياخد الملفات اللي في الـ staging بس، ويشغّل عليها الأوامر حسب الامتداد، ويرجّع التعديلات للـ commit.

[[commitlint --edit "$1"]]: git بيدّي hook الـ commit-msg مسار ملف فيه الرسالة، و commitlint بيقراه. [[config-conventional]] معناها [[type: subject]] زي [[feat: add login]] أو [[fix: null user]].

و [[HUSKY=0]] بيعدّي الـ hooks مرة واحدة في الطوارئ.`,
            when: "أي ريبو فيه أكتر من شخص، أو عايز رسايل commit تتقري كـ changelog. الأوامر لوحدها في تاب فحص الكود.",
            mistakes: R`في مشروع حقيقي husky و lint-staged و commitlint كانوا متسطّبين ومتظبطين في package.json، بس فولدر .husky كان فيه [[_]] بس (اللي husky بيولّده)، ومفيش pre-commit ولا commit-msg. يعني ولا hook اشتغل يوم واحد، وكل الإعداد ميت. [[ls .husky]] بعد الإعداد وجرّب commit غلط بعينك.

ولو كتبت الـ hook بـ [[echo ... > file]] من Windows PowerShell 5.1، الملف بيتحفظ UTF-16 و git مش هيعرف يشغّله. اكتبه من Git Bash أو VS Code.

ومتنساش [[git add .husky]]: الملفات لازم تبقى في الريبو عشان الباقيين ياخدوها.`
          },
          teach: R`## الأول: يعني إيه Git hook؟

git بيشغّل سكربتات بأسامي معيّنة في لحظات معيّنة، لو لقاها. أهم اتنين هنا:

| الـ hook | إمتى | لو خرج بغير 0 |
|---|---|---|
| [[pre-commit]] | بعد ما تكتب [[git commit]] وقبل ما الـ commit يتعمل | الـ commit يتلغي |
| [[commit-msg]] | بعد ما الرسالة تتكتب | الـ commit يتلغي |

المشكلة إن الـ hooks العادية بتتحط في [[.git/hooks]]، والفولدر ده مش بيترفع مع الريبو. husky بيحلها: الـ hooks تبقى في [[.husky/]] جوه الريبو، و git يتقاله يدوّر هناك.

المثال ٣ حتت: جزء من [[package.json]]، وملف [[commitlint.config.js]]، وأوامر الإعداد والتجربة. جربت كل ده بالظبط بـ pnpm 10.33 في ريبو تجربة على ويندوز (من Git Bash)، و husky 9.1.7.

---

## ١. [[package.json]]

### [["scripts": { "prepare": "husky" }]]

[[prepare]] اسم سكربت خاص: pnpm و npm بيشغّلوه **لوحدهم** بعد [[install]]. و [[husky]] لوحده (من غير حاجة بعده) بيظبط git على فولدر [[.husky]]. جربت clone جديد من الريبو:

~~~text الناتج
before: []
> teach-real03-hooks@ prepare
> husky
after: [.husky/_]
~~~

قبل [[pnpm install]] مفيش إعداد، وبعده [[git config core.hooksPath]] بقى [[.husky/_]]. يعني أي حد يعمل clone ويسطّب، الـ hooks بتشتغل عنده من غير ما يعمل حاجة.

### [["lint-staged": {...}]]

| الـ pattern | الأوامر |
|---|---|
| [["*.{ts,tsx,js,jsx}"]] | [[eslint --fix]] يصلّح اللي يقدر عليه، وبعدين [[prettier --write]] ينسّق |
| [["*.{json,md,yml,yaml}"]] | [[prettier --write]] بس |

[[{a,b}]] في الـ pattern يعني «a أو b». الأوامر بتشتغل بالترتيب على الملفات اللي في الـ staging **بس** (اللي عملتلها [[git add]])، مش المشروع كله، فالـ commit بيفضل سريع.

---

## ٢. [[commitlint.config.js]]

~~~text
export default { extends: ['@commitlint/config-conventional'] };
~~~

[[extends]] خد القواعد الجاهزة بتاعة Conventional Commits: الرسالة لازم تبقى [[type: subject]]، و [[type]] واحدة من [[feat]] و [[fix]] و [[chore]] و [[docs]] و [[refactor]] و [[test]] وغيرهم. و [[export default]] صيغة ES modules. من غير [["type": "module"]] في [[package.json]]، Node شغّلها بس طلّع تحذير:

~~~text الناتج
[MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///.../commitlint.config.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected.
~~~

عشان يختفي: [["type": "module"]] أو سمّي الملف [[.mjs]].

---

## ٣. أوامر الإعداد

### [[pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional]]

[[-D]] = devDependencies: أدوات للتطوير بس، مش بتروح الإنتاج. ٤ أدوات: husky، و lint-staged، و commitlint، وقواعده.

### [[pnpm exec husky init]]

عمل ٣ حاجات:

~~~text الناتج
ls -A .husky      →  _  pre-commit
.husky/pre-commit →  pnpm test
package.json      →  "scripts": { "prepare": "husky" }
git config core.hooksPath  →  .husky/_
~~~

فولدر [[.husky/_]] ده بتاع husky: فيه ملف لكل hook يعرفه git ([[pre-commit]] و [[commit-msg]] و [[pre-push]]...)، وكلهم سطر واحد بينادي ملف اسمه [[h]]. وجوه [[h]] ده أهم سطرين:

~~~text .husky/_/h (جزء)
s=$(dirname "$(dirname "$0")")/$n
[ ! -f "$s" ] && exit 0
~~~

[[$n]] اسم الـ hook، و [[$s]] = [[.husky/<اسمه>]]، يعني **ملفك انت**. ولو مش موجود: [[exit 0]] بصمت. ده بالظبط اللي حصل في المشروع الأصلي. جربت أشيل [[pre-commit]] و [[commit-msg]] وأعمل commit برسالة غلط:

~~~text الناتج
[main 0e6151a] fixed stuff
~~~

عدّى عادي، ولا رسالة.

### [[echo "..." > .husky/pre-commit]] و [[commit-msg]]

~~~bash
echo "pnpm exec lint-staged" > .husky/pre-commit
echo 'pnpm exec commitlint --edit "$1"' > .husky/commit-msg
~~~

[[>]] اكتب الملف من الأول (فوق [[pnpm test]] اللي init حطه). والتاني بـ single quotes عشان [[$1]] يتكتب في الملف زي ما هو، مش يتفك دلوقتي. git بيدّي hook الـ commit-msg مسار ملف فيه الرسالة كأول argument ([[$1]])، و [[--edit "$1"]] بيقول لـ commitlint «اقرا الرسالة من الملف ده».

### [[ls .husky]]

~~~text الناتج
_
commit-msg
pre-commit
~~~

لازم تشوف الاتنين بعينك. ده الفحص اللي كان ناقص في المشروع الأصلي.

### [[git add .husky package.json commitlint.config.js]] و [[git commit -m "chore: add git hooks"]]

الـ commit ده نفسه عدّى على الـ hooks: lint-staged شغّل eslint و prettier على [[commitlint.config.js]] و [[package.json]]، والرسالة [[chore: ...]] صح:

~~~text الناتج
✔ Done running tasks for staged files!
[main (root-commit) c0f7a62] chore: add git hooks
 4 files changed, 31 insertions(+)
~~~

(فولدر [[.husky/_]] فيه [[.gitignore]] بـ [[*]]، فمش بيترفع؛ [[prepare]] بيعمله عند كل واحد.)

---

## ٤. التجربة

### ملف مش متنسّق

~~~text a.ts قبل
const   x =    {a:1,b:2}
export default x
~~~

[[git add a.ts]] و [[git commit -m "feat: add a"]]:

~~~text الناتج
✔ eslint --fix
✔ prettier --write
✔ Done running tasks for staged files!
✔ Done staging changes from tasks!
[main 816dbeb] feat: add a
~~~

~~~text git show HEAD:a.ts
const x = { a: 1, b: 2 };
export default x;
~~~

النسخة اللي اتسجّلت هي المتنسّقة: lint-staged عدّل الملف ورجّعه للـ staging قبل الـ commit.

### [[git commit --allow-empty -m "fixed stuff"]]

[[--allow-empty]] commit من غير تغييرات (عشان نجرّب الرسالة بس). الرسالة مفيهاش [[type:]]:

~~~text الناتج
⧗   input: fixed stuff
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings

husky - commit-msg script failed (code 1)
~~~

commitlint قرا [[fixed stuff]] كله كأنه مفيهوش [[type]] ولا [[subject]]. والسطر الأخير من [[h]]: الـ hook خرج بـ 1 فالـ commit اتلغي.

### [[HUSKY=0 git commit -m "wip"]]

[[NAME=value command]] متغير للأمر ده بس. و [[h]] فيه [[[ "$__{HUSKY-}" = "0" ] && exit 0]]، فكل الـ hooks بتخرج 0 من غير ما تشتغل:

~~~text الناتج
[main b23578c] wip
~~~

للطوارئ بس، والـ CI هيمسك أي حاجة عدّت كده.

---

## ٥. فخ PowerShell 5.1

جربت أكتب الـ hook من Windows PowerShell 5.1 بنفس الـ [[echo ... >]]:

~~~text أول بايتات الملف
FF FE 70 00 6E 00 70 00 6D 00 ...     ÿþp n p m
~~~

[[FF FE]] و [[00]] بين كل حرف = UTF-16. والـ commit:

~~~text الناتج
.husky/pre-commit: .husky/pre-commit: cannot execute binary file
husky - pre-commit script failed (code 126)
~~~

[[sh]] شايفه ملف binary. أما PowerShell 7 ([[pwsh]]) فبيكتب UTF-8 عادي ([[70 6E 70 6D ...]] = [[pnpm]]). فاكتب الملفات دي من Git Bash أو pwsh أو المحرر.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الـ hooks تتفعّل عند الكل | [["prepare": "husky"]] ← [[core.hooksPath = .husky/_]] |
| الـ hooks نفسها | [[.husky/pre-commit]] و [[.husky/commit-msg]]، ولو مش موجودين مفيش حاجة بتشتغل ولا رسالة |
| تنسيق اللي اتغيّر بس | [[lint-staged]] حسب الامتداد |
| شكل الرسالة | [[commitlint --edit "$1"]] + [[config-conventional]] = [[type: subject]] |
| تعدّي مرة | [[HUSKY=0]] |
| اتأكد | [[ls .husky]] وجرّب commit غلط بعينك |`,
          lines: [
            "prepare بيفعّل husky بعد كل install.",
            "إعداد lint-staged:",
            "ملفات الكود: eslint يصلّح وprettier ينسّق.",
            "باقي الملفات: prettier بس.",
            "قفلة lint-staged.",
            "commitlint بالقواعد المشهورة.",
            "سطّب الأدوات dev dependencies.",
            "اعمل .husky و prepare.",
            "hook قبل الـ commit: lint-staged.",
            "hook على رسالة الـ commit: commitlint.",
            "اتأكد إن الملفين موجودين فعلًا.",
            "ضيف الإعداد للريبو.",
            "رسالة ماشية على القواعد.",
            "رسالة من غير type: هتترفض.",
            "عدّي الـ hooks مرة في الطوارئ."
          ],
          sol: R`جربت الإعداد (بـ npm بدل pnpm) في ريبو تجربة:

ملف [[a.ts]] فيه [[const   x =    {a:1,b:2}]]. بعد [[git commit -m "feat: add a"]] الـ pre-commit شغّل lint-staged ([[✔ Done running tasks for staged files!]])، والملف اتعمله commit بعد التنسيق: [[const x = { a: 1, b: 2 };]].
[[git commit --allow-empty -m "fixed stuff"]] اترفض:
[[✖   subject may not be empty [subject-empty]]]
[[✖   type may not be empty [type-empty]]]
[[husky - commit-msg script failed (code 1)]]
لازم يبقى بالشكل [[fix: ...]] أو [[feat: ...]].
[[HUSKY=0 git commit -m "wip"]] عدّى من غير hooks، وده للطوارئ بس.

لو الـ hooks مش بتشتغل خالص، اتأكد إن [[git config core.hooksPath]] بيقول [[.husky/_]] (ده اللي [[husky init]] أو [[prepare]] بيعمله). ولو [[commitlint.config.js]] بـ [[export default]] واشتكى من الـ syntax، ضيف [["type": "module"]] في package.json أو سمّيه [[.mjs]].`
        }
      ]
    }
]);
