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

TAB("gha", {
  label: "GitHub Actions",
  prompt: "$ ",
  lab: R`mkdir -p .github/workflows
gh auth login
gh run list --limit 3`,
  labText: "اعمل repo تجربة على GitHub، وحط الملفات في .github/workflows/. كل push بيشغّلها وتشوف النتيجة في تاب Actions. الحساب المجاني فيه دقايق كافية للتجربة.",
  levels: {
    "1": ["البداية", "ملف workflow بيشغّل الاختبارات، وتفهم أجزاءه، وتتعامل معاه من الترمنال"],
    "2": ["المتوسط", "أسرار وقاعدة بيانات للاختبار وكاش وشروط و jobs متوازية وأمان"],
    "3": ["المتقدم", "build و push و deploy عبر SSH، وموافقات، وإصدارات، و rollback، ومهام دورية"]
  },
  categories: [
    {
      t: "أول workflow",
      l: 1,
      n: "ملف YAML في .github/workflows بيتشغّل على سيرفر GitHub مع كل push",
      items: [
        {
          cmd: "ci.yml",
          title: "الاختبارات مع كل push",
          desc: "الملف بيقول: لما يحصل push أو PR على main، شغّل job على ماكينة أوبونتو: هات الكود، سطّب Node، سطّب المكتبات، وشغّل الاختبارات. لو أي خطوة فشلت، الـ PR بيتعلّم بعلامة حمرا.",
          example: R`name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test`,
          try: "احفظه في [[.github/workflows/ci.yml]]، اعمل push، وافتح تاب Actions في الـ repo وشوفه بيشتغل.",
          flag: "script",
          deep: {
            why: "الاختبارات اللي بتشتغل على جهازك بس بتتنسي. لما تشتغل مع كل push على سيرفر GitHub، مفيش كود بيدخل main وهو كاسر، وكل PR عليه علامة خضرا أو حمرا قبل ما حد يقراه.",
            how: R`[[name]] الاسم اللي بيظهر في تاب Actions. [[on]] الأحداث اللي بتشغّله: push على main، وأي pull_request.

[[jobs]] المهام، هنا واحدة اسمها test. [[runs-on: ubuntu-latest]]: GitHub بيعمل ماكينة أوبونتو جديدة نضيفة للـ job ده، وبيرميها لما يخلص. مفيش حاجة من الـ run اللي فات.

[[steps]] بالترتيب: [[checkout]] بيجيب الكود (من غيره الماكينة فاضية). [[setup-node]] بيسطّب Node 24 وبيفعّل كاش npm. وبعدين أوامر عادية زي ما بتكتبها.

أي step ترجع exit code مش صفر، الـ job يفشل ويقف، والـ commit يتعلّم أحمر.

الملف لازم يبقى في [[.github/workflows/]] بامتداد .yml، و GitHub بيقراه أوتوماتيك. والمسافات في YAML مهمة: مسافتين لكل مستوى.

وحاجة صغيرة لطيفة: كل workflow ليه شارة (badge) بتبيّن حالة آخر run. حطها في أول README: [[![CI](https://github.com/USER/REPO/actions/workflows/ci.yml/badge.svg)]]، فأي حد يفتح الـ repo يعرف إن main أخضر ولا لأ.`,
            when: "أول workflow في أي مشروع. حتى لو الاختبارات قليلة، lint و build كفاية كبداية.",
            mistakes: "اختبار بيعتمد على حاجة على جهازك (ملف .env، أو قاعدة بيانات محلية) فيفشل في CI. و tab بدل مسافات في YAML."
          },
          teach: R`## الفكرة: ملف بيقول لـ GitHub «لما يحصل كذا، اعمل كذا»

الـ workflow ملف YAML بتحطه في الـ repo. GitHub بيقراه لوحده، ولما الحدث اللي فيه يحصل (push مثلًا) بيجهّز كمبيوتر فاضي، ويشغّل عليه الخطوات اللي كتبتها بالترتيب. هنفك الملف سطر سطر.

---

## الأول: YAML بيتقري إزاي؟

YAML طريقة لكتابة بيانات بالمسافات بدل الأقواس. ٣ قواعد بس:

| الشكل | معناه |
|---|---|
| [[key: value]] | اسم وقيمته |
| سطر تحت سطر بمسافات أكتر | الحاجة اللي تحت «جوه» اللي فوقها |
| [[- ]] في أول السطر | عنصر في قايمة (list) |

والمسافات هي اللي بتحدد مين جوه مين، فلازم تبقى مسافات عادية مش Tab، وكل العناصر في نفس المستوى تبدأ من نفس العمود.

---

## ١. الاسم والأحداث

~~~text .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
~~~

- [[name: CI]]: الاسم اللي بيظهر في تاب Actions. اختياري، ومن غيره GitHub بيعرض مسار الملف.
- [[on:]]: الأحداث اللي بتشغّل الملف. تحتها حدثين:
- [[push:]] وتحته [[branches: [main] ]]: لما حد يعمل push على branch اسمها main بس. الأقواس المربعة في [[[main] ]] قايمة في سطر واحد، زي ما تكتب [[- main]] في سطر لوحده.
- [[pull_request:]] من غير حاجة بعدها: أي pull request (لما يتفتح، أو يتعمله push جديد، أو يتقفل ويتفتح تاني).

---

## ٢. الـ job والماكينة

~~~text
jobs:
  test:
    runs-on: ubuntu-latest
~~~

- [[jobs:]] قايمة المهام. هنا مهمة واحدة.
- [[test:]] اسم المهمة، انت اللي بتختاره. هو اللي بيظهر في صفحة الـ run وفي علامة الـ PR.
- [[runs-on: ubuntu-latest]] الماكينة: GitHub بيعمل جهاز أوبونتو جديد خالص (اسمه **runner**)، والـ job بيشتغل عليه، وبعد ما يخلص بيترمي. [[latest]] يعني أحدث نسخة أوبونتو GitHub بيدعمها.

---

## ٣. الخطوات (steps)

~~~text
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
~~~

كل [[- ]] خطوة. والخطوات نوعين:

| النوع | معناه |
|---|---|
| [[uses:]] | شغّل **action** جاهزة (كود حد كتبه). الشكل [[صاحبها/اسمها@النسخة]] |
| [[run:]] | شغّل أمر عادي في الترمنال بتاع الـ runner (bash على أوبونتو) |

بالترتيب:

1. [[actions/checkout@v7]]: الماكينة فاضية، الخطوة دي بتنزّل كود الـ repo عليها (git clone للـ commit اللي شغّل الـ run). [[@v7]] رقم النسخة الكبيرة من الـ action.
2. [[actions/setup-node@v7]]: بتسطّب Node. و [[with:]] هي الإعدادات (inputs) اللي بتديها للـ action: [[node-version: 24]] النسخة، و [[cache: npm]] احفظ كاش npm بين الـ runs عشان التسطيب يبقى أسرع (محتاج [[package-lock.json]] في الـ repo).
3. [[npm ci]]: سطّب المكتبات بالظبط زي ما في [[package-lock.json]] (ci = clean install).
4. [[npm run lint]]: شغّل الـ script اللي اسمه lint في package.json.
5. [[npm test]]: شغّل الاختبارات.

أي خطوة ترجع exit code مش صفر (يعني فشلت) الـ job بيقف، والخطوات اللي بعدها مش بتشتغل، والـ commit يتعلّم بعلامة حمرا.

---

## ٤. شكله وهو شغال

الملف ده اتشغّل هنا على الجهاز بأداة [[act]] (بتشغّل الـ workflow جوه Docker، شرحها في درس debugging) على مشروع صغير فيه اختبار واحد. ده اللوج متقصّر:

~~~text الناتج (act على Docker)
[CI/test] ⭐ Run Main actions/checkout@v7
[CI/test]   ✅  Success - Main actions/checkout@v7
[CI/test] ⭐ Run Main actions/setup-node@v7
[CI/test]   | Found in cache @ /opt/hostedtoolcache/node/24.21.0/x64
[CI/test]   | Cache restored from key: node-cache-linux-x64-npm-1d0b8d25fc61...
[CI/test] ⭐ Run Main npm ci
[CI/test]   | up to date, audited 1 package in 276ms
[CI/test] ⭐ Run Main npm run lint
[CI/test]   | lint ok
[CI/test] ⭐ Run Main npm test
[CI/test]   | ✔ adds two numbers (0.760396ms)
[CI/test]   | ℹ pass 1
[CI/test]   | ℹ fail 0
[CI/test] 🏁  Job succeeded
~~~

- [[CI/test]] يعني workflow اسمه CI و job اسمه test.
- setup-node نزّلت Node [[24.21.0]]: انت كتبت [[24]] بس، فبتاخد أحدث 24.x.
- [[Cache restored from key]]: المفتاح فيه hash من [[package-lock.json]]. لو الـ lock اتغيّر، المفتاح يتغيّر وكاش جديد يتعمل.

وعلى GitHub نفسه (من الـ docs): تاب Actions بيعرض run باسم رسالة الـ commit، وجواه job اسمه [[test]] والخطوات بنفس الترتيب، وأولها [[Set up job]] اللي GitHub بيضيفها لوحده.

---

## ٥. قبل الـ push: افحص الملف

الملف اتفحص هنا بـ [[actionlint]] (أداة بتفهم قواعد GitHub Actions مش YAML بس) في Docker:

~~~bash
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest .github/workflows/ci.yml
~~~

مطبعش حاجة، يعني الملف سليم. ولو المسافات بايظة بيقولك السطر والعمود.

---

## الخلاصة

| السطر | معناه |
|---|---|
| [[on:]] | إمتى يشتغل |
| [[jobs: → test:]] | مهمة باسم |
| [[runs-on:]] | على أنهي ماكينة |
| [[steps:]] | الخطوات بالترتيب |
| [[uses:]] | action جاهزة، و [[with:]] إعداداتها |
| [[run:]] | أمر ترمنال عادي |

> المكان لازم يبقى [[.github/workflows/]] بالظبط، والامتداد [[.yml]] أو [[.yaml]]، وإلا GitHub مش هيشوف الملف أصلًا.`,
          lines: [
            "اسم الـ workflow في تاب Actions.",
            "الأحداث اللي بتشغّله.",
            "push...",
            "...على main بس.",
            "وأي pull request.",
            "المهام.",
            "مهمة اسمها test.",
            "على ماكينة أوبونتو جديدة.",
            "الخطوات بالترتيب.",
            "هات الكود (من غيرها الماكينة فاضية).",
            "سطّب Node.",
            "إعداداتها.",
            "نسخة 24.",
            "مع كاش npm بين الـ runs.",
            "سطّب المكتبات من الـ lock.",
            "lint.",
            "الاختبارات. أي فشل يعلّم الـ commit أحمر."
          ],
          sol: R`بعد الـ push بثواني، تاب Actions بيعرض run باسم رسالة الـ commit، وتحته workflow اسمه [[CI]] و job اسمه [[test]]. بيبدأ بدايرة صفرا (queued ثم in progress)، ولو دخلت جوه الـ job هتشوف الـ steps بالترتيب: [[Set up job]] و [[Run actions/checkout@v7]] و [[Run actions/setup-node@v7]] و [[Run npm ci]] و [[Run npm run lint]] و [[Run npm test]]، وفي الآخر علامة صح خضرا. ونفس العلامة بتظهر جنب الـ commit في صفحة الـ repo.

الأخطاء الشائعة في أول مرة: الـ workflow ما ظهرش خالص يبقى المسار غلط (لازم [[.github/workflows/]] بالظبط، مش [[.github/workflow]]) أو الـ push مش على main. ولو ظهر بعلامة حمرا ومكتوب [[Invalid workflow file]] يبقى فيه غلط YAML، غالبًا مسافات. ولو وقع في setup-node بـ [[Dependencies lock file is not found]] يبقى مفيش [[package-lock.json]] في الـ repo ([[cache: npm]] محتاجه، و [[npm ci]] كمان). ولو وقع بـ [[npm error Missing script: "lint"]] يبقى مفيش script بالاسم ده في package.json: ضيفه أو امسح السطر.

قبل الـ push تقدر تفحص الملف على جهازك بـ [[actionlint]]: لو مطبعش حاجة يبقى الملف سليم.`
        },
        {
          cmd: "المفاهيم",
          title: "workflow و job و step و runner",
          desc: "الـ workflow ملف كامل بيتشغّل على حدث. جواه jobs بتشتغل بالتوازي (كل واحد على ماكينة جديدة نضيفة). وكل job فيه steps بتشتغل بالترتيب على نفس الماكينة. الـ runner هو الماكينة، و GitHub بيديك أوبونتو وويندوز وماك.",
          example: R`on:
  push:
    branches: [main]
    paths-ignore: ['**.md']
  pull_request:
    types: [opened, synchronize]
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:
    inputs:
      env:
        type: choice
        options: [staging, production]`,
          try: "ضيف [[workflow_dispatch]] لأي workflow عندك، وشغّله بإيدك من زرار Run workflow في تاب Actions.",
          flag: "script",
          deep: {
            why: "عشان تكتب أي workflow لازم تفهم الأربع كلمات: workflow و job و step و runner، وتفهم إيه اللي بيشغّله.",
            how: R`الـ workflow: الملف كله، بيتشغّل لما حدث من اللي في [[on]] يحصل.

الـ job: وحدة شغل بتاخد runner (ماكينة) لوحدها. الـ jobs المختلفة بتشتغل بالتوازي على ماكينات مختلفة، ومش بتشوف ملفات بعض إلا عبر artifacts.

الـ step: خطوة جوه job، بتشتغل بالترتيب على نفس الماكينة، فالملفات اللي step عملتها موجودة للي بعدها.

الأحداث: [[push]] مع فلتر branches و [[paths-ignore]] (متشغّلش لو التعديل في ملفات md بس). [[pull_request]] مع types. [[schedule]] بصيغة cron بتوقيت UTC (وبيتأخر دقايق أحيانًا). [[workflow_dispatch]] زرار Run workflow في الواجهة، وممكن ياخد inputs (اختيار من قايمة، أو نص).

والعكس بتاع paths-ignore هو [[paths]]: اشتغل بس لو اتغيّر ملف في المسارات دي، زي [[paths: ['database/migrations/**', 'android/**'] ]] لـ workflow تقيل مالوش لازمة مع كل تعديل. ولو حطيت paths، ضيف معاها [[workflow_dispatch]] عشان تقدر تشغّله بإيدك لما تحتاج.

وفيه أحداث تانية: [[release]] لما تعمل release، و [[workflow_run]] لما workflow تاني يخلص، و [[issues]] و [[issue_comment]].`,
            when: "push و pull_request لكل مشروع. workflow_dispatch لأي حاجة عايز تشغّلها بإيدك. schedule للفحوصات.",
            mistakes: "schedule بتوقيت مصر. هو UTC، فـ 3 الفجر مصر هي [[0 1 * * *]] (أو 0 0 حسب التوقيت الصيفي). وفي مشروع حقيقي كان workflow بيبني APK كامل وفي paths بتاعه [[src/**]]، فأي تعديل صغير في الويب كان بيبني تطبيق أندرويد (دقايق كتير من الرصيد). خلّي paths على الملفات اللي فعلًا بتأثر على الناتج."
          },
          teach: R`## الأول: ٤ كلمات

| الكلمة | هي إيه | بتشتغل إزاي |
|---|---|---|
| **workflow** | الملف كله في [[.github/workflows/]] | بيبدأ لما حدث من اللي في [[on:]] يحصل |
| **job** | مهمة جوه الـ workflow | كل job على ماكينة لوحدها، والـ jobs بتشتغل **مع بعض** (بالتوازي) |
| **step** | خطوة جوه الـ job | بالترتيب، **على نفس الماكينة**، فالملفات اللي خطوة عملتها موجودة للي بعدها |
| **runner** | الماكينة نفسها | جهاز جديد نضيف لكل job، وبيترمي بعده |

المثال كله عن الجزء الأول: [[on:]]، يعني إمتى الـ workflow يشتغل. هنفكّه حدث حدث.

---

## ١. push مع فلاتر

~~~text
on:
  push:
    branches: [main]
    paths-ignore: ['**.md']
~~~

- [[branches: [main] ]]: الـ push على main بس، مش أي branch.
- [[paths-ignore:]]: متشتغلش لو **كل** الملفات اللي اتغيّرت في الـ push دي بتطابق النمط. و [[**.md]] نمط (glob): [[**]] يعني «أي مسار، حتى جوه فولدرات»، فأي ملف آخره [[.md]] في أي مكان. يعني تعديل في README بس مش هيشغّل الاختبارات، لكن تعديل في README وملف JS هيشغّلها.
- العلامات [[' ']] حوالين النمط لازمة: من غيرها YAML بيفهم [[*]] في أول القيمة كرمز خاص بيه (alias).

---

## ٢. pull_request بأنواع معينة

~~~text
  pull_request:
    types: [opened, synchronize]
~~~

[[types]] بتختار أنهي حاجة في الـ PR تشغّله: [[opened]] لما يتفتح، و [[synchronize]] لما حد يعمل push جديد على الـ branch بتاعته. ولو مكتبتش types، الافتراضي (من الـ docs) [[opened]] و [[synchronize]] و [[reopened]].

---

## ٣. schedule: بميعاد

~~~text
  schedule:
    - cron: '0 3 * * *'
~~~

[[cron]] ٥ خانات مفصولة بمسافات:

~~~text خانات cron
0    3    *    *    *
│    │    │    │    └─ يوم في الأسبوع (0 = الأحد)
│    │    │    └────── الشهر
│    │    └─────────── اليوم في الشهر
│    └──────────────── الساعة (0 لـ 23)
└───────────────────── الدقيقة
~~~

[[*]] يعني «أي قيمة». فالسطر ده: الدقيقة 0 من الساعة 3، كل يوم، كل شهر، أي يوم في الأسبوع. **بتوقيت UTC**، يعني 5 الصبح في مصر في الشتا و 6 في الصيف. و [[- ]] قبل [[cron]] معناها إنها قايمة، فتقدر تحط أكتر من ميعاد.

---

## ٤. workflow_dispatch: زرار تشغيل بإيدك

~~~text
  workflow_dispatch:
    inputs:
      env:
        type: choice
        options: [staging, production]
~~~

- [[workflow_dispatch:]] بيظهر زرار **Run workflow** في تاب Actions، وبيخليك تشغّله من الترمنال بـ [[gh workflow run]].
- [[inputs:]] حقول بتتملي قبل التشغيل. هنا حقل اسمه [[env]].
- [[type: choice]] قايمة اختيار، و [[options]] الاختيارات اللي فيها. وفيه أنواع تانية: [[string]] (نص)، و [[boolean]] (صح/غلط)، و [[number]]، و [[environment]].

---

## ٥. الحل: نقرا الـ input جوه job

~~~text .github/workflows/hello.yml
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      env:
        type: choice
        options: [staging, production]
        default: staging
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "env=$__{{ inputs.env }} event=$__{{ github.event_name }}"
~~~

الجديد هنا [[$__{{ }}]]: ده **expression**. GitHub بيحسب اللي جواه ويحط القيمة مكانه **قبل** ما الأمر يتبعت للشيل. [[inputs.env]] قيمة الحقل، و [[github.event_name]] اسم الحدث اللي شغّل الـ run. و [[default: staging]] القيمة اللي بتبقى مختارة في الزرار.

اتشغّل هنا بـ [[act]] مرتين:

~~~bash
act workflow_dispatch --input env=production
act push
~~~

~~~text الناتج
| env=production event=workflow_dispatch
| env= event=push
~~~

لاحظ التانية: في push مفيش inputs أصلًا، فـ [[inputs.env]] طلع فاضي، و [[default]] مبتشتغلش غير مع التشغيل اليدوي. لو الـ job محتاج قيمة في الحالتين اكتب [[$__{{ inputs.env || 'staging' }}]] ([[||]] يعني «لو الأولى فاضية خد التانية»).

والزرار نفسه في الواجهة من الـ docs: بيظهر بس لما الملف يبقى على الـ default branch.

---

## الخلاصة

| الحدث | بيشتغل إمتى |
|---|---|
| [[push]] | push، وتفلتره بـ [[branches]] و [[paths]] / [[paths-ignore]] |
| [[pull_request]] | PR، وتفلتره بـ [[types]] |
| [[schedule]] | بميعاد cron بتوقيت UTC |
| [[workflow_dispatch]] | زرار أو [[gh workflow run]]، ومعاه [[inputs]] |`,
          lines: [
            "الأحداث.",
            "push...",
            "...على main...",
            "...ومتشغّلش لو التعديل في ملفات md بس.",
            "pull request...",
            "...لما يتفتح أو يتحدّث.",
            "مجدول...",
            "...كل يوم 3 UTC.",
            "زرار تشغيل يدوي...",
            "...بمدخلات.",
            "اسم المدخل.",
            "اختيار من قايمة.",
            "الاختيارات."
          ],
          sol: R`بعد ما تضيف [[workflow_dispatch:]] وتعمل push على الـ branch الافتراضي، ادخل تاب Actions واختار الـ workflow من الشمال: فوق قايمة الـ runs هيظهر شريط [[This workflow has a workflow_dispatch event trigger.]] وجنبه زرار [[Run workflow]]. بتدوس عليه تختار الـ branch، ومع الـ inputs اللي في المثال هتلاقي dropdown فيه [[staging]] و [[production]]. الـ run بيظهر بـ event [[workflow_dispatch]] واسمك جنبه.

جوه الـ workflow القيمة بتتقري بـ [[inputs.env]]. ونفس التشغيل من الترمنال: [[gh workflow run ci.yml -f env=staging]].

لو الزرار مش ظاهر: الملف اللي فيه [[workflow_dispatch]] لازم يكون على الـ default branch (غالبًا main)، مش على branch تاني بس. ولو ظهر [[Invalid workflow file]] بعد ما ضفت inputs، اتأكد إن [[options]] موجودة مع [[type: choice]] وإن المسافات مظبوطة.`,
          solCode: R`on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      env:
        type: choice
        options: [staging, production]
        default: staging
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "env=$__{{ inputs.env }} event=$__{{ github.event_name }}"`
        },
        {
          cmd: "uses و run",
          title: "الـ actions الجاهزة والأوامر",
          desc: "[[run]] بينفّذ أمر شيل على الـ runner. [[uses]] بيشغّل action جاهزة من الـ marketplace (كود حد كتبه). [[with]] بيدّيها إعدادات. [[actions/checkout]] بيجيب الكود، ومن غيره الماكينة فاضية.",
          example: R`- uses: actions/checkout@v7
- uses: actions/setup-node@v7
  with:
    node-version-file: .nvmrc
    cache: npm
- run: npm ci
- name: Build
  run: |
    npm run build
    ls -la dist
- run: echo "done" >> "$GITHUB_STEP_SUMMARY"`,
          try: "جرّب [[run: |]] بأكتر من سطر، و [[$GITHUB_STEP_SUMMARY]] عشان تكتب ملخص بيظهر في صفحة الـ run.",
          flag: "script",
          deep: {
            why: "الـ steps نوعين: أوامر بتكتبها، و actions جاهزة بتستخدمها. الفهم ده بيخليك تقرا أي workflow.",
            how: R`[[run]]: أمر شيل (bash على أوبونتو، PowerShell على ويندوز). [[run: |]] بيسمح بكذا سطر، وكل سطر بيتنفذ في نفس الشيل. GitHub بيشغّل bash بـ [[set -e]] لوحده، فأول أمر يرجع مش صفر بيوقف الـ step. بس الـ pipe (زي [[npm test | tee log]]) بيبص على آخر أمر بس، إلا لو كتبت [[shell: bash]] صراحة فبيضيف [[pipefail]].

[[uses]]: action من الـ marketplace بصيغة [[owner/repo@version]]. الـ action كود (JavaScript أو Docker أو composite) بيعمل حاجة معينة. [[with]] بيدّيها inputs.

[[actions/checkout]]: أهم واحدة، بتعمل git clone للـ commit اللي شغّل الـ workflow. [[actions/setup-node]]: بتسطّب Node بالنسخة اللي تحددها أو من [[.nvmrc]]، و [[cache: npm]] بتحفظ [[~/.npm]] بين الـ runs بمفتاح من package-lock.

[[name]] اختياري بيدّي الـ step اسم واضح في اللوج.

ولو التطبيق مش في جذر الـ repo (فولدر [[web/]] أو [[backend/]])، بدل [[cd web &&]] في كل step، حط [[defaults: run: working-directory: web]] على الـ job، فكل [[run]] بيشتغل جوه الفولدر ده. دي بتأثر على run بس، مش على uses، فـ setup-node محتاج [[cache-dependency-path: web/package-lock.json]] عشان يلاقي الـ lock.

[[$GITHUB_STEP_SUMMARY]] ملف: أي Markdown تكتبه فيه بيظهر في صفحة الـ run كملخص، مفيد للتقارير.

ومتغيرات جاهزة: [[$GITHUB_SHA]] الـ commit، و [[$GITHUB_REF_NAME]] الـ branch أو tag، و [[$GITHUB_REPOSITORY]] user/repo.`,
            when: "run للأوامر البسيطة. uses للحاجات اللي ليها action ناضجة (setup، cache، docker، deploy).",
            mistakes: "action من حساب مجهول بمئات النجوم المزيفة. اقرا كودها أو استخدم الرسمية (actions/*, docker/*)."
          },
          teach: R`## الفكرة: كل step يا كود جاهز يا أمر بتكتبه

المثال ده قايمة steps (اللي بتتحط تحت [[steps:]] في أي job). كل [[- ]] خطوة، وفيه نوعين بس: [[uses]] و [[run]]. هنفكهم بالترتيب.

---

## ١. [[uses]]: action جاهزة

~~~text
- uses: actions/checkout@v7
~~~

الشكل [[صاحب/اسم@نسخة]]: الـ action دي repo على GitHub اسمه [[actions/checkout]]، و [[@v7]] الـ tag اللي هيتنزّل منه. GitHub بينزّل الكود ده ويشغّله. والـ checkout بالذات بيعمل clone للـ repo بتاعك على الماكينة، ومن غيره مفيش أي ملف من مشروعك هناك.

~~~text
- uses: actions/setup-node@v7
  with:
    node-version-file: .nvmrc
    cache: npm
~~~

- [[with:]] بتدّي الـ action إعدادات (inputs). كل action ليها inputs مكتوبة في الـ README بتاعها.
- [[node-version-file: .nvmrc]]: بدل ما تكتب النسخة هنا، اقراها من ملف [[.nvmrc]] في المشروع (سطر واحد زي [[24]]). كده جهازك والـ CI بيقروا من نفس المكان.
- [[cache: npm]]: احفظ كاش npm بين الـ runs.

لاحظ إن [[with:]] بادئة تحت [[uses]] مش تحت [[- ]]: هي جزء من نفس الخطوة.

---

## ٢. [[run]]: أمر في الترمنال

~~~text
- run: npm ci
~~~

أمر عادي بيتنفّذ في **bash** على أوبونتو (وفي PowerShell لو الماكينة ويندوز).

---

## ٣. خطوة باسم وأكتر من سطر

~~~text
- name: Build
  run: |
    npm run build
    ls -la dist
~~~

- [[name:]] الاسم اللي بيظهر في اللوج بدل الأمر نفسه.
- [[|]] بعد [[run:]] في YAML معناها: «اللي جاي نص بأكتر من سطر، وسيب السطور زي ما هي». كل السطور المبدوءة بمسافات أكتر من [[run:]] بتبقى سكربت واحد.
- السطور بتتنفّذ في **نفس** الشيل، ورا بعض. ولو أمر فشل، الباقي مش بيتنفّذ (تحت هنشوف ليه).

اتشغّل هنا بـ [[act]] على مشروع فيه [[.nvmrc]] مكتوب فيه [[24]]:

~~~text الناتج
[wf.yml/build] ⭐ Run Main Build
[wf.yml/build]   | > gha-demo@1.0.0 build
[wf.yml/build]   | > mkdir -p dist && cp index.js dist/
[wf.yml/build]   | total 12
[wf.yml/build]   | drwxr-xr-x 2 root root 4096 Oct  6 16:30 .
[wf.yml/build]   | drwxr-xr-x 7 root root 4096 Oct  6 16:30 ..
[wf.yml/build]   | -rw-r--r-- 1 root root   63 Oct  6 16:30 index.js
[wf.yml/build]   ✅  Success - Main Build
~~~

الاسم في اللوج [[Build]] مش [[npm run build]]، وده فايدة [[name]].

---

## ٤. ليه أول أمر فاشل بيوقف الباقي؟

لو مكتبتش [[shell:]]، الـ docs بتقول إن GitHub بيشغّل السكربت بـ [[bash -e]]. و [[-e]] يعني: أول أمر يرجع exit code مش صفر، اقفل. بس فيه استثناء: الـ pipe. جرّبنا نفس السكربت بالطريقتين في Docker على Ubuntu 24.04:

~~~text s.sh
false | true
echo after-pipe
false
echo never
~~~

~~~text الناتج
--- bash -e (الافتراضي):
after-pipe
exit=1
--- bash --noprofile --norc -eo pipefail (لما تكتب shell: bash):
exit=1
~~~

[[false]] أمر بيفشل دايمًا. في الأولى [[false | true]] عدّى لأن الـ pipe بياخد نتيجة آخر أمر بس ([[true]])، فـ [[after-pipe]] اتطبعت، ووقف عند [[false]] اللي بعدها. في التانية [[pipefail]] بيخلي أي أمر يفشل جوه الـ pipe يفشّل الـ pipe كله، فوقف من أول سطر. عشان كده [[npm test | tee log]] محتاج [[shell: bash]] على الخطوة.

---

## ٥. الملخص: [[$GITHUB_STEP_SUMMARY]]

~~~text
- run: echo "done" >> "$GITHUB_STEP_SUMMARY"
~~~

[[GITHUB_STEP_SUMMARY]] متغير بيئة فيه **مسار ملف**. أي Markdown تكتبه فيه، GitHub بيعرضه في صفحة الـ run تحت عنوان Summary. و [[>>]] يعني «ضيف في آخر الملف»، أما [[>]] بتمسح اللي فيه.

والحل (solCode) بيكتب كذا سطر مرة واحدة:

~~~text
- name: Summary
  run: |
    {
      echo "## Build report"
      echo "- commit: $GITHUB_SHA"
      echo "- node: $(node --version)"
    } >> "$GITHUB_STEP_SUMMARY"
~~~

- [[{ ... }]] في bash بتجمّع كذا أمر، فالناتج بتاعهم كلهم يروح للملف بـ [[>>]] واحدة.
- [[$GITHUB_SHA]] متغير جاهز فيه رقم الـ commit.
- [[$(node --version)]] شغّل الأمر وحط ناتجه مكانه.

في [[act]] الملخص طلع كده:

~~~text الناتج
[wf.yml/build]   ⚙  Summary - ## Build report
- commit: 561defa636917144b95232b736838869ea7acb71
- node: v24.21.0
~~~

ولما خطوة بعدها عملت [[cat "$GITHUB_STEP_SUMMARY"]] طلع فاضي: كل step ليها ملف ملخص جديد، و GitHub بيجمعهم كلهم في الصفحة في الآخر.

---

## الخلاصة

- [[uses: صاحب/اسم@نسخة]]: شغّل action جاهزة، و [[with:]] إعداداتها.
- [[run:]]: أمر bash (أو PowerShell على ويندوز).
- [[run: |]]: سكربت بأكتر من سطر، كله في شيل واحد، وبيقف عند أول أمر يفشل.
- [[name:]]: اسم الخطوة في اللوج.
- [[$GITHUB_STEP_SUMMARY]]: ملف، اللي تكتبه فيه يظهر في صفحة الـ run.`,
          lines: [
            "action جاهزة: هات الكود.",
            "action جاهزة: Node.",
            "إعداداتها.",
            "النسخة من ملف .nvmrc.",
            "كاش.",
            "أمر عادي.",
            "خطوة باسم واضح.",
            "أوامر متعددة الأسطر.",
            "الأمر الأول.",
            "والتاني في نفس الشيل.",
            "اكتب في ملف الملخص: بيظهر في صفحة الـ run."
          ],
          sol: R`في اللوج الـ step بتاعة [[run: |]] بتعرض السكربت كله فوق وبعده ناتج كل سطر بالترتيب. والملخص بيظهر في صفحة الـ run نفسها (Summary) تحت رسمة الـ jobs، في كارت باسم الـ job، ومتنسّق كـ Markdown: عنوان [[Build report]] وتحته bullets فيها الـ commit ونسخة Node.

خلي بالك إن السطور جوه [[run: |]] بتتنفذ بـ [[bash -e]]، يعني أول أمر يفشل بيوقف الـ step كلها والباقي ميتنفذش، ودا غالبًا اللي انت عايزه.

أخطاء شائعة: [[run: echo "next step: $VERSION"]] على سطر واحد من غير [[|]] ممكن يطلع [[Invalid workflow file]] لأن [[: ]] جوه الكلام YAML بيفهمها key، فالحل [[run: |]] أو تشيل النقطتين. و [[>]] بدل [[>>]] مع [[$GITHUB_STEP_SUMMARY]] بيمسح اللي اتكتب قبل كده في نفس الـ step. والملخص بيظهر بس لما الـ job تخلص.`,
          solCode: R`steps:
  - uses: actions/checkout@v7
  - name: Multi-line
    run: |
      echo "line 1"
      node --version
      ls -la
  - name: Summary
    run: |
      {
        echo "## Build report"
        echo "- commit: $GITHUB_SHA"
        echo "- node: $(node --version)"
      } >> "$GITHUB_STEP_SUMMARY"`
        },
        {
          cmd: "gh CLI",
          title: "Actions من الترمنال",
          desc: R`[[gh]] أداة GitHub الرسمية للترمنال، وبيها تتابع GitHub Actions من غير ما تفتح المتصفح. [[gh auth login]] مرة واحدة بتربطها بحسابك، وبعدها بتعرف الـ repo من الفولدر اللي انت واقف فيه.

[[run list --limit 5]] آخر 5 تشغيلات (runs) بحالتها: نجحت ولا فشلت. [[run view --log-failed]] بيطبع لوج الـ steps اللي فشلت بس، وده غالبًا كل اللي محتاجه. [[run watch]] بيتابع run شغال لايف لحد ما يخلص. [[workflow run deploy.yml]] بيشغّل workflow يدوي (اللي فيه [[workflow_dispatch]])، و [[-f env=staging]] بيدّي قيمة لـ input اسمه env. و [[run rerun 1234567890 --failed]] بيعيد الـ jobs اللي فشلت بس في الـ run ده، والرقم ده الـ run ID اللي بيظهر في [[run list]].

لو شغلته بره فولدر الـ repo، حدد الـ repo بـ [[-R user/repo]].`,
          example: R`gh auth login
gh run list --limit 5
gh run view --log-failed
gh run watch
gh workflow run deploy.yml -f env=staging
gh run rerun 1234567890 --failed`,
          try: "اعمل push يكسر الاختبارات عمدًا، وشوف الفشل بـ [[gh run view --log-failed]] من غير ما تفتح المتصفح.",
          deep: {
            why: "فتح المتصفح، وتاب Actions، والضغط على الـ run، وبعدين الـ job، وبعدين الـ step: ٤ كليكات عشان تشوف سطر error. [[gh]] بيديك نفس المعلومة بأمر.",
            how: R`[[gh auth login]] مرة واحدة، بيفتح المتصفح للمصادقة. وبعدها [[gh]] بيعرف الـ repo من الفولدر اللي انت فيه (من remote origin).

[[run list]] آخر الـ runs بحالتها. [[run view]] تفاصيل run (لو مكتبتش رقم بيسألك تختار run من لستة، وفي سكربت أو pipe لازم الرقم). [[--log-failed]] لوج الـ steps الفاشلة بس، وده اللي محتاجه ٩٠٪ من الوقت.

[[run watch]] بيتابع run شغال لايف في الترمنال لحد ما يخلص، مفيد بعد push.

[[workflow run]] بيشغّل workflow فيه workflow_dispatch، و [[-f]] بيدّي قيم للـ inputs.

[[run rerun --failed]] بيعيد الـ jobs الفاشلة بس (للـ flaky tests).

و [[gh]] بيعمل حاجات تانية كتير: [[gh pr create]]، و [[gh pr checks]] حالة checks الـ PR، و [[gh secret set]] يضيف secret من الترمنال، و [[gh api]] أي endpoint في GitHub API.`,
            when: "بعد كل push. ولما run يفشل. وفي سكربتات الأتمتة.",
            mistakes: "تشغّله بره فولدر الـ repo فيقولك مش عارف أنهي repo. [[-R user/repo]] بيحدده."
          },
          teach: R`## الفكرة: نفس تاب Actions، بس في الترمنال

[[gh]] برنامج GitHub الرسمي للترمنال. كل أمر في المثال شكله [[gh <حاجة> <فعل>]]: [[gh run list]] يعني «الـ runs، اعرضهم»، و [[gh workflow run]] يعني «الـ workflow، شغّله». الأوامر اللي بتقرا بس اتشغّلت هنا بـ gh 2.97.0 على الـ repo بتاع الموقع ده نفسه، واللي بتغيّر حاجة على GitHub (تشغيل وإعادة) مكتوبة من الـ docs.

---

## ١. [[gh auth login]]

بتعملها مرة واحدة على الجهاز. بتسألك كام سؤال (GitHub.com ولا Enterprise، و HTTPS ولا SSH) وبتفتح المتصفح تأكد الدخول. بعدها [[gh auth status]] بيقولك انت داخل بأنهي حساب:

~~~text الناتج
github.com
  ✓ Logged in to github.com account ali (keyring)
  - Active account: true
  - Git operations protocol: https
~~~

[[keyring]] يعني التوكن محفوظ في خزنة الباسوردات بتاعة النظام، مش في ملف نص.

---

## ٢. [[gh run list --limit 5]]

[[run]] هو التشغيل الواحد للـ workflow. [[list]] اعرض، و [[--limit 5]] آخر ٥ بس (الافتراضي ٢٠). ده ناتج آخر ٣:

~~~text الناتج
STATUS  TITLE                       WORKFLOW  BRANCH  EVENT  ID           ELAPSED  AGE
✓       Partial teach sections ...  check     main    push   37475231398  20s      about 2 hours ago
✓       Rebuild dist                check     main    push   37472374306  18s      about 3 hours ago
✓       Rebuild dist                check     main    push   37471970689  18s      about 3 hours ago
~~~

| العمود | معناه |
|---|---|
| [[STATUS]] | [[✓]] نجح، [[X]] فشل، ودايرة لو لسه شغال |
| [[TITLE]] | رسالة الـ commit اللي شغّلته |
| [[WORKFLOW]] | اسم الـ workflow ([[name:]] في الملف) |
| [[BRANCH]] و [[EVENT]] | على أنهي branch، وإيه اللي شغّله (push، pull_request...) |
| [[ID]] | رقم الـ run. ده اللي بتديه للأوامر التانية |
| [[ELAPSED]] و [[AGE]] | خد قد إيه، واتعمل من قد إيه |

> لو بعت الناتج لأمر تاني ([[| grep]] مثلًا) [[gh]] بيشيل العناوين ويفصل الأعمدة بـ Tab عشان يبقى سهل تقطّعه.

---

## ٣. [[gh run view --log-failed]]

[[view]] اعرض run واحد. من غير رقم بيسألك تختار من قايمة. و [[--log-failed]] اطبع لوج الـ steps اللي فشلت بس. هنشوف ناتجه الحقيقي في الدرس الجاي.

---

## ٤. [[gh run watch]]

بيعرض الـ run الشغال دلوقتي ويحدّث الشاشة كل كام ثانية لحد ما يخلص (من الـ docs). مفيد بعد [[git push]] على طول: تفضل في الترمنال وتعرف النتيجة.

---

## ٥. [[gh workflow run deploy.yml -f env=staging]]

- [[workflow run]] شغّل workflow بإيدك، زي زرار Run workflow. الملف لازم يكون فيه [[workflow_dispatch:]].
- [[deploy.yml]] اسم الملف (أو اسم الـ workflow).
- [[-f env=staging]] ([[-f]] من field): قيمة للـ input اللي اسمه [[env]]. لو فيه أكتر من input تكرر [[-f]].

---

## ٦. [[gh run rerun 1234567890 --failed]]

- [[rerun]] أعد تشغيل run قديم. و [[1234567890]] الـ ID من [[run list]].
- [[--failed]] أعد الـ jobs اللي فشلت بس، مش الكل، فبتوفّر دقايق.

---

## ٧. لو شغّلته بره الـ repo

[[gh]] بيعرف الـ repo من فولدر git اللي انت واقف فيه (من الـ remote). بره أي repo:

~~~text الناتج
failed to determine base repo: failed to run git: fatal: not a git repository (or any of the parent directories): .git
~~~

الحل: ادخل فولدر الـ repo، أو حدده بـ [[-R user/repo]] في أي أمر.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[gh auth login]] | دخول مرة واحدة |
| [[gh run list --limit 5]] | آخر الـ runs بحالتها والـ ID |
| [[gh run view --log-failed]] | لوج الخطوات الفاشلة بس |
| [[gh run watch]] | تابع run شغال |
| [[gh workflow run X -f k=v]] | شغّل workflow يدوي بقيم |
| [[gh run rerun ID --failed]] | أعد الـ jobs الفاشلة |`,
          lines: [
            "سجّل دخول مرة (بيفتح المتصفح).",
            "آخر ٥ runs.",
            "لوج الـ steps الفاشلة (بيسألك تختار الـ run).",
            "تابع run شغال لايف.",
            "شغّل workflow يدوي بمدخل.",
            "أعد الـ jobs الفاشلة بس في run معين."
          ],
          sol: R`[[gh run list --limit 5]] بيعرض جدول فيه الحالة و عنوان الـ commit واسم الـ workflow والـ branch والـ event والـ ID والوقت. الـ run الفاشل عليه [[X]] أحمر.

[[gh run view --log-failed]] من غير ID بيسألك تختار run من قايمة، وبعدين بيطبع لوج الـ steps الفاشلة بس. كل سطر شكله: اسم الـ job، واسم الـ step، والوقت، والكلام، زي [[test  Run npm test  2026-09-30T10:12:03.4Z  ✕ adds two numbers]]، وتحته الـ expected والـ received اللي كسروا الاختبار، وفي الآخر [[Process completed with exit code 1.]].

لو قالك [[To get started with GitHub CLI, please run: gh auth login]] يبقى محتاج login الأول. ولو [[no runs found]] يبقى انت في فولدر repo تاني أو الـ remote مش على GitHub، اتأكد بـ [[gh repo view]]. ولو الـ run لسه شغال، [[--log-failed]] مش هيلاقي حاجة، استخدم [[gh run watch]] واستنى.`
        },
        {
          cmd: "قراية الفشل",
          title: "الـ job أحمر، أعرف ليه",
          desc: "الـ run بيتقسم jobs، وكل job steps، وكل step ليه لوج. الـ step الأحمر هو اللي فشل، والسطور اللي قبل الـ exit code بالضبط فيها السبب. وأشهر الأسباب: اختبار بيعتمد على حاجة موجودة على جهازك بس، أو متغير بيئة ناقص، أو نسخة Node مختلفة.",
          example: R`gh run list --status failure --limit 3
gh run view 1234567890 --log-failed | tail -40
gh run view 1234567890 --json jobs -q '.jobs[] | {name, conclusion}'
gh run download 1234567890`,
          try: "لو الاختبار بيفشل في CI بس: قارن نسخة Node في setup-node بنسختك، والمتغيرات في .env بتاعك بالـ secrets.",
          deep: {
            why: "الـ run أحمر. الأول تعرف أنهي job، وبعدين أنهي step، وبعدين السطر. ومعظم الفشل في CI له نفس ٤ أسباب.",
            how: R`[[run list --status failure]] الفاشلة بس. [[view --log-failed | tail -40]] آخر ٤٠ سطر من الـ steps الفاشلة، والـ error غالبًا في آخر ١٠.

[[--json jobs -q]] بيطلّع أسامي الـ jobs ونتيجتها، مفيد في matrix عشان تعرف أنهي تركيبة فشلت.

الأسباب المتكررة: الاختبار بيعتمد على بيئتك (ملف، أو قاعدة، أو متغير في .env مش موجود في secrets). نسخة Node مختلفة (setup-node بـ 20 وانت على 22). اختبار بيعتمد على التوقيت أو الترتيب (flaky). أو مكتبة native محتاجة حاجة على النظام.

[[run download]] بينزّل الـ artifacts (screenshots من Playwright مثلًا).

في اللوج، السطور بتبدأ بـ [[##[group] ]] و [[##[error] ]]: دوّر على error.

ولو الـ workflow نفسه مش بيشتغل أصلًا (مش بيظهر في Actions): YAML غلط. GitHub بيعرض الـ error في تاب Actions في الأعلى.`,
            when: "كل run أحمر. ومتعملش rerun قبل ما تقرا.",
            mistakes: "rerun ٣ مرات وتفتكر flaky. الفشل المتكرر ليه سبب. و«شغال على جهازي» مش تشخيص."
          },
          teach: R`## الفكرة: من «الـ run أحمر» لـ «السطر ده هو السبب»

الترتيب دايمًا واحد: أنهي run فشل؟ جواه أنهي job؟ وجوه الـ job أنهي step؟ وآخر سطور الـ step دي فيها السبب. الأوامر الأربعة بتمشي معاك بالترتيب ده. كلهم اتشغّلوا هنا على الـ repo بتاع الموقع ده نفسه (قراية بس)، وعلى run فشل فعلًا يوم ٣٠ سبتمبر.

---

## ١. [[gh run list --status failure --limit 3]]

[[--status failure]] فلتر: الـ runs اللي فشلت بس.

~~~text الناتج (متقصّر. لما يتبعت لـ pipe بيطلع من غير عناوين)
completed  failure  Wire in the market and English tabs; add 121...  check  main-p1yvze  push          36672347634  18s  2026-09-30T05:12:26Z
completed  failure  Fill the full-stack gaps: basics, empty levels...  check  main-p1yvze  pull_request  36644188848  9s   2026-09-29T23:15:13Z
completed  failure  Point two lesson references at the lessons'...     check  main-p1yvze  push          36644183040  9s   2026-09-29T23:15:10Z
~~~

أول عمودين: [[completed]] يعني الـ run خلص، و [[failure]] النتيجة. والرقم الطويل هو الـ ID اللي هنستخدمه.

---

## ٢. [[gh run view ID --log-failed | tail -40]]

- [[--log-failed]]: لوج الـ steps الفاشلة بس.
- [[| tail -40]]: ابعت الناتج لـ [[tail]] اللي بيطبع آخر ٤٠ سطر. ليه الآخر؟ لأن الأداة اللي فشلت بتطبع السبب قبل ما تقفل على طول.

ده جزء من الناتج الحقيقي:

~~~text الناتج (متقصّر)
check  UNKNOWN STEP  2026-09-30T05:12:40.1738066Z +          ]
check  UNKNOWN STEP  2026-09-30T05:12:40.1755991Z ##[error]شغّل npm run build واعمل commit للـ dist
check  UNKNOWN STEP  2026-09-30T05:12:40.1765168Z ##[error]Process completed with exit code 1.
check  UNKNOWN STEP  2026-09-30T05:12:40.1893436Z Post job cleanup.
~~~

نقرا السطر:

| الجزء | معناه |
|---|---|
| [[check]] | اسم الـ job |
| [[UNKNOWN STEP]] | المفروض اسم الـ step، بس [[gh]] أحيانًا مبيعرفوش ويكتب كده. ادخل بـ [[gh run view ID]] من غير log تشوف أسامي الـ steps |
| [[2026-09-30T05:12:40...Z]] | الوقت بتوقيت UTC ([[Z]]) |
| الباقي | السطر نفسه من اللوج |

والسطور اللي تهمك:
- [[##[error]...]] رسالة error. الأولى هنا رسالة كتبها الـ workflow نفسه بـ [[::error::]] (درس «::error::»)، وبتقول الإصلاح بالظبط.
- [[Process completed with exit code 1.]] الـ step رجعت 1، فاتعلّمت فاشلة.
- السطر اللي فيه [[+          ]]]: آخر سطر من [[git diff]] اللي كان بيطبع الفرق.
- [[Post job cleanup.]] وما بعدها: GitHub بينضّف، مش جزء من المشكلة.

---

## ٣. [[gh run view ID --json jobs -q '.jobs[] | {name, conclusion}']]

- [[--json jobs]]: اطبع بيانات الـ jobs كـ JSON بدل الكلام.
- [[-q]] (من query): فلتر بلغة jq جوه [[gh]] نفسه. [[.jobs[]]] كل job في القايمة، و [[{name, conclusion}]] خد منه الاسم والنتيجة بس.

~~~text الناتج
{"conclusion":"failure","name":"check"}
~~~

هنا job واحد. لكن في matrix فيها ٤ jobs هتشوف ٤ سطور، وتعرف على طول أنهي تركيبة بالظبط اللي فشلت.

---

## ٤. [[gh run download ID]]

بينزّل الـ artifacts بتاعة الـ run (ملفات الـ workflow رفعها بـ [[upload-artifact]]، زي screenshots اختبار فشل) في الفولدر اللي انت فيه. على run مفيهوش artifacts:

~~~text الناتج
no valid artifacts found to download
~~~

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| أنهي run فشل؟ | [[gh run list --status failure]] |
| أنهي job؟ | [[gh run view ID --json jobs -q ...]] |
| ليه؟ | [[gh run view ID --log-failed]] وآخر ٤٠ سطر، ودوّر على [[##[error]]] |
| عايز الملفات اللي طلعت؟ | [[gh run download ID]] |

> اقرا قبل ما تعمل Re-run. الفشل اللي بيتكرر ليه سبب في السطور دي.`,
          lines: [
            "آخر ٣ runs فاشلة.",
            "آخر ٤٠ سطر من الـ steps الفاشلة في run معين.",
            "أسامي الـ jobs ونتيجتها (مفيد في matrix).",
            "نزّل الـ artifacts (screenshots، تقارير)."
          ],
          sol: R`الإجابة النموذجية قايمة فحص، مش تخمين:

١. نسخة Node: [[node -v]] عندك قدام الرقم في step الـ [[Setup node]] في اللوج (بيكتب النسخة اللي نزّلها). لو مختلفين، حط [[node-version-file: .nvmrc]] عشان الاتنين يقروا من نفس المكان. ٢. المتغيرات: كل اسم في [[.env]] عندك لازم يبقى له secret أو env في الـ workflow. المتغير الناقص بيبقى فاضي، والغلط بيطلع على شكل [[undefined]] أو [[Invalid URL]] أو [[DATABASE_URL is not set]]. ٣. فروق البيئة: الـ runner لينكس فأسماء الملفات case-sensitive ([[import "./button"]] بيشتغل على ويندوز وماك ويفشل هنا لو الملف [[Button.tsx]])، والوقت UTC، ومفيش قاعدة بيانات ولا خدمات إلا لو عملتها بـ services. ٤. [[npm ci]] أصرم من [[npm install]]: لو package.json و package-lock.json مش متطابقين هيقولك [[npm ci can only install packages when your package.json and package-lock.json are in sync]].

وأسهل طريقة تتأكد: شغّل نفس أوامر الـ CI عندك بالظبط ([[rm -rf node_modules && npm ci && npm test]]). الغلط الشائع إنك تعمل «Re-run» كذا مرة على أمل إنه ينجح؛ دا بيشتغل بس مع الاختبارات الـ flaky، وساعتها المشكلة في الاختبار نفسه.`
        }
      ]
    }
  ]
});
