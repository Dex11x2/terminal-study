// تكملة تاب gha: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/gha/01.js (شرح حقول الدرس في أوله)
MORE("gha", [
  {
    t: "workflows و actions بتوعك",
    l: 3,
    n: "بدل ما تنسخ نفس الـ YAML في كل workflow وكل repo: workflow بيتنادي، و action بتاعتك، و matrix بتتولّد لوحدها",
    items: [
      {
        cmd: "workflow_call",
        title: "workflow كامل بيتنادي من workflow تاني",
        desc: R`الـ reusable workflow ملف workflow عادي بس الـ trigger بتاعه [[workflow_call]]، فبدل ما يشتغل على push، workflow تاني بيناديه بـ [[uses:]] على مستوى الـ job، ويدّيله inputs و secrets، وياخد منه outputs.

في المثال [[reusable-test.yml]] فيه job اختبار بياخد نسخة Node كـ input ويرجّع نتيجة، و [[ci.yml]] بيناديه بنسخة 22 وبعدين job تاني بيقرا النتيجة. المثال اتشغّل بـ act 0.2.89 على Docker.`,
        example: R`# .github/workflows/reusable-test.yml (the called workflow)
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: "24"
    secrets:
      NPM_TOKEN:
        required: false
    outputs:
      result:
        value: $__{{ jobs.test.outputs.result }}
jobs:
  test:
    runs-on: ubuntu-latest
    outputs:
      result: $__{{ steps.t.outputs.result }}
    steps:
      - uses: actions/checkout@v7
      - id: t
        run: echo "result=passed-on-$__{{ inputs.node-version }}" >> "$GITHUB_OUTPUT"
# .github/workflows/ci.yml (the caller)
on: push
jobs:
  call-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: "22"
    secrets:
      NPM_TOKEN: $__{{ secrets.NPM_TOKEN }}
  report:
    needs: call-tests
    runs-on: ubuntu-latest
    steps:
      - run: echo "got $__{{ needs.call-tests.outputs.result }}"`,
        try: "اعمل الملفين في repo تجربة، وشغّلهم بـ [[act push -W .github/workflows/ci.yml]] أو اعمل push. بعدين غيّر [[node-version]] في الـ caller لـ [[node]] وشغّل actionlint وشوف بيقول إيه.",
        flag: "script",
        deep: {
          why: "عندك ٥ repos كلهم بيعملوا نفس الـ CI (checkout و install و lint و test). لو نسخت الـ YAML في الخمسة، أي تعديل (نسخة Node جديدة، خطوة أمان) لازم يتعمل ٥ مرات وأكيد هتنسى واحد. الـ reusable workflow بيخلي الـ CI مكتوب في مكان واحد، والباقي بينادوه.",
          how: R`الملف المنادَى فيه [[on: workflow_call]]، وتحته تعريف «الواجهة»: [[inputs]] (كل واحد ليه [[type]]: string أو number أو boolean، و [[default]] أو [[required]])، و [[secrets]] (الأسرار اللي محتاجها، لأن الأسرار مش بتعدّي لوحدها)، و [[outputs]] (قيم بيرجّعها، كل واحدة [[value]] بتشاور على output job جواه).

الـ caller بيناديه في job من غير [[runs-on]] ولا [[steps]]: بس [[uses: ./.github/workflows/file.yml]] لو في نفس الـ repo، أو [[owner/repo/.github/workflows/file.yml@ref]] من repo تاني (والـ docs بتقول الـ SHA هو الأأمن للـ ref). [[with]] بيدّي الـ inputs، و [[secrets]] بيدّي الأسرار واحد واحد، أو [[secrets: inherit]] يبعت كل أسرار الـ caller (لو الاتنين في نفس الـ org).

النتيجة بتتقري من jobs تانية بـ [[needs.<job>.outputs.<name>]] زي أي job.

حدود من الـ docs: لحد ١٠ مستويات (الـ caller و ٩ تحته)، ولحد ٥٠ reusable workflow مختلفين من ملف واحد، والـ [[env]] اللي على مستوى الـ caller مش بيوصل للمنادَى، والصلاحيات ([[permissions]]) بتفضل زي ما هي أو بتقل في السلسلة، عمرها ما بتزيد.`,
          when: "أكتر من repo أو أكتر من workflow بيعملوا نفس الـ jobs (CI قياسي للفريق، deploy بنفس الخطوات لـ staging والإنتاج). لو اللي بيتكرر كام step جوه job، الأنسب composite action (الدرس اللي بعده).",
          mistakes: R`تحط [[runs-on]] أو [[steps]] في الـ job اللي فيه [[uses:]] (ممنوع، الـ job ده كله بيتشغّل من الملف التاني). وتنسى تبعت الـ secrets فتلاقيها فاضية جوه. وتعتمد على [[env:]] بتاع الـ caller إنه يوصل. وتنادي workflow من repo تاني بـ [[@main]] فأي تعديل هناك يغيّر الـ CI بتاعك من غير ما تعرف.`
        },
        teach: R`## الفكرة: workflow ليه «واجهة» زي الدالة

الـ reusable workflow شبه دالة: ليه parameters (الـ [[inputs]] والـ [[secrets]])، وليه قيمة راجعة (الـ [[outputs]])، وبيتنادي من مكان تاني. الفرق إن اللي بيتنادي job كامل (أو كذا job)، مش سطر.

المثال ملفين. هنفك المنادَى الأول، وبعدين الـ caller، وبعدين نشوف الناتج. اتشغّل هنا بـ [[act]] 0.2.89 (بيشغّل workflows على جهازك في Docker، ليه درس في الفئة اللي بعد دي) على image [[node:22-slim]].

---

## ١. الملف المنادَى: [[reusable-test.yml]]

### الـ trigger

~~~text
on:
  workflow_call:
~~~

[[workflow_call]] معناها «الملف ده مش بيشتغل لوحده على push أو PR؛ بيشتغل بس لما workflow تاني يناديه». ممكن تحط معاه triggers تانية (زي [[workflow_dispatch]]) لو عايزه يشتغل لوحده كمان.

### الـ inputs

~~~text
    inputs:
      node-version:
        type: string
        default: "24"
~~~

- [[node-version]] اسم انت اختاره.
- [[type]] لازم: [[string]] أو [[number]] أو [[boolean]].
- [[default]] لو الـ caller مدّاش قيمة. ولو عايزه إجباري: [[required: true]].
- جوه الملف بتقراه بـ [[$__{{ inputs.node-version }}]].

### الـ secrets

~~~text
    secrets:
      NPM_TOKEN:
        required: false
~~~

الأسرار **مش** بتعدّي لوحدها من الـ caller. لازم تعلن عنها هنا، والـ caller يبعتها. [[required: false]] معناها لو مجاتش الـ workflow يكمّل وقيمتها فاضية.

### الـ outputs: سلسلة من ٣ حلقات

~~~text
    outputs:
      result:
        value: $__{{ jobs.test.outputs.result }}
...
  test:
    outputs:
      result: $__{{ steps.t.outputs.result }}
    steps:
      - id: t
        run: echo "result=passed-on-$__{{ inputs.node-version }}" >> "$GITHUB_OUTPUT"
~~~

القيمة بتطلع على ٣ مراحل، من جوه لبرة:

| المرحلة | السطر | معناه |
|---|---|---|
| step | [[echo "result=..." >> "$GITHUB_OUTPUT"]] | الـ step اللي اسمها [[t]] بتكتب output اسمه [[result]] |
| job | [[result: $__{{ steps.t.outputs.result }}]] | الـ job بيطلّعها لبرة |
| workflow | [[value: $__{{ jobs.test.outputs.result }}]] | الـ workflow بيرجّعها للـ caller |

[[$GITHUB_OUTPUT]] ملف بيعمله الـ runner لكل step، وأي سطر [[اسم=قيمة]] تكتبه فيه بيبقى output (اتشرح في درس [[GITHUB_ENV و GITHUB_OUTPUT]]). و [[>>]] معناها «ضيف في آخر الملف».

---

## ٢. الـ caller: [[ci.yml]]

~~~text
  call-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: "22"
    secrets:
      NPM_TOKEN: $__{{ secrets.NPM_TOKEN }}
~~~

- الـ job ده مفيهوش [[runs-on]] ولا [[steps]]. كل اللي فيه [[uses:]] بمسار الملف. [[./]] معناها «في نفس الـ repo».
- [[with:]] بيملا الـ inputs. والـ [["22"]] بين علامتين عشان النوع [[string]].
- [[secrets:]] بيبعت السر باسمه. لو عايز تبعت كله مرة واحدة: [[secrets: inherit]].

~~~text
  report:
    needs: call-tests
    steps:
      - run: echo "got $__{{ needs.call-tests.outputs.result }}"
~~~

[[needs: call-tests]] يستنى الـ workflow المنادَى يخلص، و [[needs.call-tests.outputs.result]] بيقرا القيمة اللي رجعت.

---

## ٣. وهو شغال

[[act -l]] بيعرض الـ jobs ومراحلها:

~~~text الناتج
Stage  Job ID      Job name    Workflow name      Workflow file      Events
0      call-tests  call-tests  ci.yml             ci.yml             push
0      test        test        reusable-test.yml  reusable-test.yml  workflow_call
1      report      report      ci.yml             ci.yml             push
~~~

[[report]] في المرحلة 1 لأنه مستني [[call-tests]]. والتشغيل:

~~~bash
act push -W .github/workflows/ci.yml
~~~

~~~text الناتج (مختصر)
[call-tests/reusable-test.yml/test] ⭐ Run Main echo "result=passed-on-22" >> "$GITHUB_OUTPUT"
[call-tests/reusable-test.yml/test]   ⚙  ::set-output:: result=passed-on-22
[call-tests/reusable-test.yml/test] 🏁  Job succeeded
[ci.yml/report    ]   | got passed-on-22
[ci.yml/report    ] 🏁  Job succeeded
~~~

- اسم الـ job [[call-tests/reusable-test.yml/test]]: job [[test]] من الملف المنادَى، اتنادى من [[call-tests]]. على GitHub نفسه بيظهر بالشكل [[call-tests / test]] (من الـ docs).
- الـ input وصل: [[passed-on-22]] مش 24 (الـ default).
- والـ output عدّى المراحل التلاتة ووصل لـ [[report]].
- [[-W]] بيحدد ملف واحد، عشان act ميحاولش يشغّل [[reusable-test.yml]] لوحده.

---

## ٤. لو غلطت في اسم input

غيّرنا [[node-version]] في الـ caller لـ [[node]] وشغّلنا actionlint 1.7.12 (درسها في الفئة الجاية):

~~~text الناتج
.github/workflows/ci.yml:6:7: input "node" is not defined in "./.github/workflows/reusable-test.yml" reusable workflow. defined input is "node-version" [workflow-call]
~~~

يعني بيقرا الملف المنادَى ويقارن. من غير الفحص ده GitHub بيرفض الـ run وقت التشغيل بس.

---

## ٥. من repo تاني

~~~text
    uses: my-org/ci-templates/.github/workflows/node-test.yml@3d3c42e5aac5ba805825da76410c181273ba90b1
~~~

الشكل [[owner/repo/.github/workflows/file.yml@ref]]، والـ ref ممكن branch أو tag أو SHA، والـ docs بتنصح بالـ SHA. الـ repo ده لازم يسمح بالوصول (Settings ثم Actions ثم Access لو private). الـ SHA هنا مثال للشكل بس.

---

## الخلاصة

| الحتة | فين | بتعمل إيه |
|---|---|---|
| [[on: workflow_call]] | المنادَى | الملف بيتنادي بس |
| [[inputs]] / [[secrets]] / [[outputs]] | المنادَى | الواجهة |
| [[uses: ./.github/workflows/x.yml]] | الـ caller | job كامل من ملف تاني |
| [[with]] / [[secrets: inherit]] | الـ caller | بيملا الواجهة |
| [[needs.job.outputs.x]] | الـ caller | بيقرا النتيجة |

> الـ job اللي فيه [[uses:]] مفيهوش [[runs-on]] ولا [[steps]]، والـ [[env]] بتاع الـ caller مش بيوصل للمنادَى.`,
        lines: [
          R`[[on:]] الـ triggers.`,
          R`[[workflow_call]]: الملف ده بيتنادي من workflow تاني.`,
          R`الـ inputs اللي بيقبلها.`,
          R`input اسمه [[node-version]].`,
          R`نوعه نص.`,
          R`لو مجاش، 24.`,
          R`الأسرار اللي محتاجها.`,
          R`سر اسمه [[NPM_TOKEN]].`,
          R`مش إجباري.`,
          R`القيم اللي بيرجّعها.`,
          R`output اسمه [[result]].`,
          R`قيمته من output الـ job اللي اسمه [[test]].`,
          R`الـ jobs.`,
          R`job الاختبار.`,
          R`على أوبونتو.`,
          R`outputs الـ job.`,
          R`[[result]] من الـ step اللي الـ id بتاعها [[t]].`,
          R`الخطوات.`,
          R`هات الكود.`,
          R`step ليها [[id]] عشان نقرا الـ output بتاعها.`,
          R`بتكتب [[result=...]] في ملف [[$GITHUB_OUTPUT]].`,
          R`الـ caller بيشتغل مع كل push.`,
          R`الـ jobs.`,
          R`job بينادي الملف التاني.`,
          R`[[uses:]] بمسار الملف بدل [[runs-on]] و [[steps]].`,
          R`الـ inputs.`,
          R`نسخة Node 22 (نص).`,
          R`الأسرار.`,
          R`ابعت [[NPM_TOKEN]] بتاع الـ repo.`,
          R`job تاني.`,
          R`يستنى [[call-tests]].`,
          R`على أوبونتو.`,
          R`الخطوات.`,
          R`اطبع الـ output اللي رجع: [[got passed-on-22]].`
        ],
        sol: R`[[act push -W .github/workflows/ci.yml]] (act 0.2.89 على Docker) طبع [[got passed-on-22]] في job [[report]]، و [[::set-output:: result=passed-on-22]] في job [[call-tests/reusable-test.yml/test]].

ولما غيّرنا [[node-version]] لـ [[node]] في الـ caller، actionlint 1.7.12 قال:
[[input "node" is not defined in "./.github/workflows/reusable-test.yml" reusable workflow. defined input is "node-version" [workflow-call] ]]

على GitHub نفسه الـ run بيترفض قبل ما يبدأ ويظهر الخطأ في صفحة الـ run (من الـ docs).`
      },
      {
        cmd: "composite action",
        title: "action بتاعتك: كام step في ملف واحد",
        desc: R`الـ composite action فولدر فيه [[action.yml]] فيه [[runs: using: composite]] وتحته steps عادية. بتناديها من أي job بـ [[uses: ./.github/actions/اسمها]] زي أي action من الـ Marketplace، فالخطوات اللي بتتكرر في كل job (تسطيب وكاش وطباعة نسخ) بتتكتب مرة.

الفرق عن الـ reusable workflow: الـ composite بيتحط **جوه** job كـ step، والـ reusable بيبقى job كامل لوحده. المثال اتشغّل بـ act 0.2.89.`,
        example: R`# .github/actions/setup-app/action.yml
name: setup-app
description: Install deps and print versions
inputs:
  greeting:
    description: text to print
    default: hello
outputs:
  node:
    description: node version used
    value: $__{{ steps.v.outputs.node }}
runs:
  using: composite
  steps:
    - id: v
      shell: bash
      run: echo "node=$(node --version)" >> "$GITHUB_OUTPUT"
    - shell: bash
      run: echo "$__{{ inputs.greeting }} from composite, node $__{{ steps.v.outputs.node }}"
# .github/workflows/comp.yml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - id: setup
        uses: ./.github/actions/setup-app
        with:
          greeting: ahlan
      - run: echo "action said node=$__{{ steps.setup.outputs.node }}"`,
        try: "اعمل الـ action في repo تجربة وناديها من job. بعدين شيل [[shell: bash]] من أول step وجرّب على GitHub: الـ run هيفشل، مع إن act و actionlint معدّوهاش.",
        flag: "script",
        deep: {
          why: "كل job عندك بيبدأ بنفس ٤ خطوات: checkout و setup-node بكاش و npm ci وطباعة النسخ. لو في ١٠ jobs، دول ٤٠ سطر متكررين. الـ composite action بيخليهم سطر [[uses:]] واحد، وتعديلهم في مكان واحد.",
          how: R`[[action.yml]] (أو [[action.yaml]]) هو ملف تعريف أي action. فيه [[name]] و [[description]]، و [[inputs]] (كل واحد ليه [[description]] و [[default]] أو [[required]])، و [[outputs]] (كل واحدة [[value]] إجباري بيشاور على output step جواها)، و [[runs]].

[[runs.using: composite]] معناها «الـ action دي مجموعة steps». فيه نوعين تانيين: [[node24]] (action مكتوبة JavaScript) و [[docker]] (بتشتغل في container).

جوه الـ composite، أي step فيها [[run]] **لازم** يبقى فيها [[shell]] (الـ docs: Required if run is set)، لأن مفيش [[defaults.run.shell]] بيوصل لها. وبتقرا الـ inputs بـ [[$__{{ inputs.x }}]]، ومسار الـ action نفسها بـ [[$__{{ github.action_path }}]] لو محتاج سكربت جنبها.

الـ job بيناديها بـ [[uses: ./.github/actions/setup-app]] (لازم checkout قبلها، لأن الملف جوه الـ repo)، أو [[owner/repo/path@ref]] من repo تاني، أو [[owner/repo@ref]] لو [[action.yml]] في جذر الـ repo.`,
          when: "خطوات بتتكرر جوه jobs كتير (setup، نشر تقرير، تسجيل دخول لـ registry). لو اللي بيتكرر jobs كاملة بـ runs-on مختلف وسياسة، استخدم workflow_call.",
          mistakes: R`تنسى [[shell:]] في step [[run]]: act 0.2.89 و actionlint 1.7.12 معدّوهاش من غير ولا كلمة في تجربتنا، بس GitHub بيرفضها. وتنادي [[./.github/actions/x]] قبل [[actions/checkout]] فيقولك الملف مش موجود. وتكتب output من غير [[value]].`
        },
        teach: R`## الفكرة: ملف [[action.yml]] بيحوّل كام step لـ step واحدة

أي action بتستخدمها ([[actions/checkout]] مثلًا) هي في الآخر repo فيه ملف [[action.yml]]. انت تقدر تعمل واحدة جوه الـ repo بتاعك، في أي فولدر، والعادة [[.github/actions/اسمها/action.yml]].

---

## ١. رأس الملف: الاسم والواجهة

~~~text
name: setup-app
description: Install deps and print versions
inputs:
  greeting:
    description: text to print
    default: hello
outputs:
  node:
    description: node version used
    value: $__{{ steps.v.outputs.node }}
~~~

- [[name]] و [[description]]: بيظهروا في اللوج وفي الـ Marketplace لو نشرتها.
- [[inputs.greeting]]: input اسمه [[greeting]]، ولو محدش بعته قيمته [[hello]]. (في الـ composite مفيش [[type]]: كل حاجة نص.)
- [[outputs.node.value]]: **إجباري** في الـ composite. بيقول «القيمة دي جاية من output الـ step اللي الـ id بتاعها [[v]]».

---

## ٢. [[runs:]]: الخطوات نفسها

~~~text
runs:
  using: composite
  steps:
    - id: v
      shell: bash
      run: echo "node=$(node --version)" >> "$GITHUB_OUTPUT"
    - shell: bash
      run: echo "$__{{ inputs.greeting }} from composite, node $__{{ steps.v.outputs.node }}"
~~~

- [[using: composite]]: النوع. التانيين [[node24]] (كود JavaScript) و [[docker]].
- [[id: v]]: اسم للـ step عشان نقرا الـ output بتاعها.
- [[shell: bash]]: في الـ composite **كل** step فيها [[run]] لازم تقول الـ shell.
- [[$(node --version)]]: اللي بين [[$( )]] بيتنفّذ الأول وناتجه يتحط مكانه، يعني [[node=v22.23.3]] بتتكتب في [[$GITHUB_OUTPUT]].
- التانية بتقرا الـ input ([[inputs.greeting]]) والـ output بتاع الأولى.

---

## ٣. الـ job بيناديها

~~~text
      - uses: actions/checkout@v7
      - id: setup
        uses: ./.github/actions/setup-app
        with:
          greeting: ahlan
      - run: echo "action said node=$__{{ steps.setup.outputs.node }}"
~~~

- [[checkout]] الأول، لأن الـ action ملف جوه الـ repo، ومن غيره الفولدر فاضي.
- [[uses: ./.github/actions/setup-app]]: مسار الفولدر (مش الملف). [[./]] يعني جوه الـ repo.
- [[with: greeting: ahlan]]: بيغيّر الـ default.
- [[steps.setup.outputs.node]]: الـ output بتاع الـ action كلها، بالـ id اللي ادّيناه للـ step ([[setup]]).

---

## ٤. وهو شغال

اتشغّل بـ [[act push -W .github/workflows/comp.yml]] على [[node:22-slim]]:

~~~text الناتج (مختصر)
[comp/build]   ✅  Success - Main echo "node=$(node --version)" >> "$GITHUB_OUTPUT" [178.1767ms]
[comp/build]   | ahlan from composite, node v22.23.3
[comp/build]   ✅  Success - Main echo "ahlan from composite, node v22.23.3" [170.5786ms]
[comp/build]   ✅  Success - Main ./.github/actions/setup-app [784.3283ms]
[comp/build]   | action said node=v22.23.3
[comp/build] 🏁  Job succeeded
~~~

- الخطوتين جوه الـ action ظهروا، وبعدهم سطر [[Main ./.github/actions/setup-app]] للـ action كلها.
- [[ahlan]] وصلت بدل [[hello]].
- الـ output [[v22.23.3]] طلع لبرة للـ job.

---

## ٥. composite ولا workflow_call؟

| | composite action | reusable workflow |
|---|---|---|
| بيتحط فين | step جوه job | job كامل |
| [[runs-on]] | بتاع الـ job اللي ناداه | هو اللي بيحدده |
| الأسرار | بتتبعت كـ inputs | [[secrets:]] أو [[inherit]] |
| الملف | [[action.yml]] في أي فولدر | لازم في [[.github/workflows/]] |
| مناسب لـ | setup متكرر | CI أو deploy كامل متكرر |

---

## الخلاصة

- الـ composite: [[runs: using: composite]] و steps، وكل [[run]] معاها [[shell]].
- الـ outputs بتاعتها لازم [[value]].
- بتتنادي بمسار الفولدر بعد [[checkout]].

> لما شلنا [[shell: bash]] من أول step، act و actionlint عدّوها، بس الـ docs بتقول إن [[shell]] إجباري مع [[run]]، فـ GitHub هيرفضها. متعتمدش على الأدوات المحلية في دي.`,
        lines: [
          R`اسم الـ action.`,
          R`وصفها.`,
          R`الـ inputs.`,
          R`input اسمه [[greeting]].`,
          R`وصفه.`,
          R`قيمته لو محدش بعته.`,
          R`الـ outputs.`,
          R`output اسمه [[node]].`,
          R`وصفه.`,
          R`قيمته من الـ step اللي اسمها [[v]] (إجباري في composite).`,
          R`طريقة التشغيل.`,
          R`[[composite]]: مجموعة steps.`,
          R`الخطوات.`,
          R`step ليها id اسمه [[v]].`,
          R`لازم shell مع أي run.`,
          R`اكتب نسخة Node كـ output.`,
          R`step تانية، برضه بـ shell.`,
          R`اطبع الـ input والـ output.`,
          R`الـ workflow على push.`,
          R`الـ jobs.`,
          R`job اسمه [[build]].`,
          R`على أوبونتو.`,
          R`الخطوات.`,
          R`هات الكود (فيه الـ action نفسها).`,
          R`id للـ step عشان نقرا الـ output.`,
          R`نادي الـ action بمسار الفولدر.`,
          R`الـ inputs.`,
          R`غيّر [[greeting]] لـ [[ahlan]].`,
          R`اقرا الـ output: [[v22.23.3]].`
        ],
        sol: R`على act 0.2.89 و image [[node:22-slim]] طلع:
[[ahlan from composite, node v22.23.3]]
[[action said node=v22.23.3]]

ولما شلنا [[shell: bash]] من الـ step الأولى، act كمّل عادي و [[actionlint]] 1.7.12 مقالش حاجة. لكن الـ docs بتاعة metadata syntax بتقول عن [[shell]]: «Required if run is set»، فـ GitHub بيرفض الـ action دي. الدرس: الأدوات المحلية بتمسك كتير، بس مش كل حاجة.`
      },
      {
        cmd: "matrix ديناميكي",
        title: "include و exclude و max-parallel و matrix من job تاني",
        desc: R`الـ matrix العادي بيضرب القوايم في بعض. هنا ٣ إضافات: [[exclude]] بيشيل تركيبة، و [[include]] بيزوّد قيمة لتركيبة موجودة أو يعمل تركيبة جديدة، و [[max-parallel]] بيحدد كام job يشتغلوا في نفس الوقت.

والأهم: القايمة نفسها ممكن تيجي من job قبله بـ [[fromJSON]]، فالـ CI يختبر بس الخدمات اللي اتغيرت. المثال اتشغّل بـ act 0.2.89 وطلّع ٥ jobs.`,
        example: R`jobs:
  plan:
    runs-on: ubuntu-latest
    outputs:
      services: $__{{ steps.list.outputs.services }}
    steps:
      - id: list
        run: echo 'services=["api","web","worker"]' >> "$GITHUB_OUTPUT"
  test:
    needs: plan
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      max-parallel: 2
      matrix:
        service: $__{{ fromJSON(needs.plan.outputs.services) }}
        node: [22, 24]
        exclude:
          - service: worker
            node: 22
        include:
          - service: api
            node: 24
            coverage: true
    steps:
      - run: echo "service=$__{{ matrix.service }} node=$__{{ matrix.node }} coverage=$__{{ matrix.coverage || false }}"`,
        try: "قبل ما تشغّل: احسب كام job هيطلعوا. بعدين زوّد في [[include]] عنصر [[service: docs]] و [[node: 24]] وشوف هل ده عدّل job موجود ولا عمل واحد جديد.",
        flag: "script",
        deep: {
          why: "monorepo فيه ٣ خدمات، كل خدمة محتاجة تتختبر على نسختين Node، بس الـ worker مش بيشتغل على 22، والـ api بس محتاج coverage. ومش عايز ٦ jobs يشتغلوا مع كل push لو اتغيرت خدمة واحدة.",
          how: R`الحساب بيمشي بالترتيب ده (من الـ docs، واتأكد بالتشغيل): الأول القوايم بتتضرب (٣ خدمات × ٢ نسخة = ٦). بعدين [[exclude]] بيشيل أي تركيبة مطابقة (worker مع 22) فيفضلوا ٥. بعدين [[include]]: كل عنصر فيه لو مطابق لتركيبة موجودة (api مع 24) بيزوّد عليها مفاتيح جديدة ([[coverage: true]]) من غير ما يعمل job جديد؛ ولو مش مطابق لأي تركيبة (زي [[service: docs]]) بيعمل job جديد.

[[max-parallel: 2]]: مش أكتر من ٢ في نفس الوقت (مفيد لو الاختبارات بتضرب على قاعدة بيانات مشتركة أو API ليه rate limit). [[fail-fast: false]]: فشل واحد ميلغيش الباقي.

[[fromJSON]] بتحوّل نص JSON لقايمة. الـ job [[plan]] بيطلّع نص زي [[ ["api","web","worker"] ]] كـ output، والـ [[test]] بيستناه بـ [[needs]] ويحوّله. في مشروع حقيقي [[plan]] بيحسب الخدمات اللي اتغيرت من [[git diff]].

[[matrix.coverage || false]]: [[||]] معناها «لو الأولى فاضية خد التانية»، لأن [[coverage]] موجود في تركيبة واحدة بس. والـ docs بتقول الحد الأقصى ٢٥٦ job لكل matrix.`,
          when: "monorepo فيه خدمات كتير. ومكتبة على كذا نسخة فيها تركيبة مش مدعومة. و matrix بتتحسب من ملف أو من التغييرات.",
          mistakes: R`تفتكر [[include]] دايمًا بيزوّد job (بيعدّل الموجود لو المفاتيح الأصلية متطابقة). و [[fromJSON]] على قايمة فاضية [[ [] ]]: الـ job بيفشل بـ matrix فاضي، فحط [[if]] على الـ job. وتطبع الـ JSON بمسافات وسطور كتير فـ [[$GITHUB_OUTPUT]] يتكسر (اطبعه في سطر واحد).`
        },
        teach: R`## الفكرة: نفس الـ matrix، بس بتتحكم في التركيبات

درس [[matrix]] شرح الضرب الأساسي. هنا هنحسب بالظبط إيه اللي بيحصل لما تزوّد [[exclude]] و [[include]]، والقايمة نفسها جاية من job تاني.

---

## ١. job [[plan]]: بيطلّع القايمة

~~~text
  plan:
    outputs:
      services: $__{{ steps.list.outputs.services }}
    steps:
      - id: list
        run: echo 'services=["api","web","worker"]' >> "$GITHUB_OUTPUT"
~~~

- الـ step بتكتب في [[$GITHUB_OUTPUT]] سطر [[services=["api","web","worker"] ]]: ده **نص** شكله JSON.
- علامات [[' ']] المفردة حوالين الكلام عشان bash ميشيلش علامات [[" "]] اللي جوه.
- [[outputs.services]] بيطلّعه من الـ job.

في مشروع حقيقي السطر ده بيبقى سكربت بيشوف [[git diff]] ويطلّع الخدمات اللي اتغيرت بس.

---

## ٢. [[fromJSON]]: النص يبقى قايمة

~~~text
        service: $__{{ fromJSON(needs.plan.outputs.services) }}
~~~

الـ outputs دايمًا نصوص. [[fromJSON]] دالة في تعبيرات GitHub بتحوّل النص لقايمة حقيقية، فالـ matrix يشوف ٣ قيم. و [[needs: plan]] لازم، وإلا [[needs.plan]] مش موجود.

---

## ٣. الحساب خطوة بخطوة

### الضرب

٣ خدمات × ٢ نسخة = ٦:

| | 22 | 24 |
|---|---|---|
| api | ✓ | ✓ |
| web | ✓ | ✓ |
| worker | ✓ | ✓ |

### [[exclude]]

~~~text
        exclude:
          - service: worker
            node: 22
~~~

أي تركيبة فيها **الاتنين** دول بتتشال. فاضل ٥.

### [[include]]

~~~text
        include:
          - service: api
            node: 24
            coverage: true
~~~

[[api]] مع [[24]] موجودة أصلًا، فالـ include **مش** بيعمل job جديد؛ بيزوّد عليها مفتاح [[coverage: true]]. باقي التركيبات مفيهاش [[coverage]] خالص.

---

## ٤. [[max-parallel]] و [[fail-fast]]

- [[max-parallel: 2]]: اتنين بس في نفس الوقت، والباقي مستني دوره.
- [[fail-fast: false]]: لو واحد فشل، الباقي يكمّل.

---

## ٥. الناتج

اتشغّل بـ [[act push -W .github/workflows/matrix.yml]]:

~~~text الناتج (السطور المهمة)
[matrix/plan] 🏁  Job succeeded
[matrix/test-1]   | service=api node=22 coverage=false
[matrix/test-2]   | service=api node=24 coverage=true
[matrix/test-2] 🏁  Job succeeded
[matrix/test-1] 🏁  Job succeeded
[matrix/test-3]   | service=web node=22 coverage=false
[matrix/test-4]   | service=web node=24 coverage=false
[matrix/test-3] 🏁  Job succeeded
[matrix/test-4] 🏁  Job succeeded
[matrix/test-5]   | service=worker node=24 coverage=false
[matrix/test-5] 🏁  Job succeeded
~~~

- ٥ jobs، و [[worker node=22]] مش موجود.
- [[coverage=true]] في [[api node=24]] بس. الباقي [[false]] بسبب [[matrix.coverage || false]]: [[||]] معناها «لو الشمال فاضي خد اليمين».
- الـ jobs طالعين **اتنين اتنين** (1 و 2، بعدين 3 و 4، بعدين 5): ده [[max-parallel: 2]].

---

## ٦. لما include مش مطابق

زوّدنا عنصر تاني في [[include]]: [[service: docs]] و [[node: 24]]. [[docs]] مش في القايمة الأصلية، فمش مطابق لأي تركيبة، فاتعمل job سادس:

~~~text الناتج
[matrix/test-6]   | service=docs node=24 coverage=false
~~~

| عنصر include | مطابق لتركيبة موجودة؟ | النتيجة |
|---|---|---|
| [[api]] و [[24]] و [[coverage]] | آه | مفتاح زيادة على job موجود |
| [[docs]] و [[24]] | لأ | job جديد |

---

## الخلاصة

1. الضرب، بعدين [[exclude]]، بعدين [[include]].
2. [[include]] بيعدّل لو مطابق، وبيزوّد job لو مش مطابق.
3. [[fromJSON]] بيخلي القايمة تيجي من job تاني، و [[needs]] لازم.

> الحد الأقصى ٢٥٦ job للـ matrix الواحد (من الـ docs). ولو القايمة ممكن تطلع فاضية، حط [[if: needs.plan.outputs.services != '[]']] على الـ job.`,
        lines: [
          R`الـ jobs.`,
          R`job بيحسب القايمة.`,
          R`على أوبونتو.`,
          R`outputs الـ job.`,
          R`[[services]] من الـ step اللي اسمها [[list]].`,
          R`الخطوات.`,
          R`step اسمها [[list]].`,
          R`اكتب القايمة كنص JSON في سطر واحد.`,
          R`job الاختبار.`,
          R`يستنى [[plan]].`,
          R`على أوبونتو.`,
          R`إعدادات التكرار.`,
          R`فشل واحد ميلغيش الباقي.`,
          R`اتنين بس في نفس الوقت.`,
          R`الـ matrix.`,
          R`الخدمات من [[plan]] بعد [[fromJSON]].`,
          R`نسختين Node.`,
          R`شيل التركيبات دي.`,
          R`الـ worker...`,
          R`...مع 22.`,
          R`زوّد أو عدّل.`,
          R`الـ api...`,
          R`...مع 24...`,
          R`...زوّد عليها [[coverage: true]].`,
          R`الخطوات.`,
          R`اطبع قيم التركيبة.`
        ],
        sol: R`الحساب: ٣ × ٢ = ٦، و exclude شال واحد = ٥ jobs. الـ include الأولاني مطابق لـ [[api]] و [[24]] فمزوّدش. وده اللي طلع فعلًا بـ act 0.2.89: [[test-1]] لحد [[test-5]]، و [[coverage=true]] في [[service=api node=24]] بس.

ولما زوّدنا [[service: docs]] و [[node: 24]] في [[include]]، طلع job سادس: [[service=docs node=24 coverage=false]]، لأن [[docs]] مش مطابق لأي تركيبة موجودة.`
      },
      {
        cmd: "runners و container",
        title: "runs-on و container: و self-hosted",
        desc: R`[[runs-on]] بيختار الماكينة: [[ubuntu-latest]] و [[windows-latest]] و [[macos-latest]] من GitHub، أو [[self-hosted]] على سيرفرك انت. و [[container:]] بيشغّل كل steps الـ job جوه image انت تختارها، فالبيئة تبقى نفس بيئة الإنتاج بالظبط.

الجزء بتاع [[container:]] اتشغّل بـ act 0.2.89 على [[python:3.13-slim]]. تسجيل runner على سيرفرك محتاج repo و token من GitHub، فمكتوب من الـ docs.`,
        example: R`jobs:
  py:
    runs-on: ubuntu-latest
    container:
      image: python:3.13-slim
      env:
        PYTHONDONTWRITEBYTECODE: "1"
    steps:
      - run: python --version && cat /etc/os-release | head -1
  gpu-tests:
    runs-on: [self-hosted, linux, gpu]
    steps:
      - run: nvidia-smi`,
        try: "شغّل job [[py]] بـ act أو على GitHub، وغيّر الـ image لـ [[node:24-alpine]] وشوف [[cat /etc/os-release]] بيقول إيه. ومتشغّلش job الـ self-hosted غير لو عندك runner متسجّل بالـ labels دي.",
        flag: "script",
        deep: {
          why: "الـ runner الجاهز من GitHub أوبونتو فيه أدوات كتير بس مش بالظبط اللي في الإنتاج (Python 3.13 على Debian مثلًا). و ساعات محتاج حاجة GitHub مش بيدّيها: GPU، أو وصول لشبكة داخلية، أو ماكينة أقوى من غير ما تدفع.",
          how: R`[[runs-on]] بياخد label أو قايمة labels. الـ labels الجاهزة: [[ubuntu-latest]] و [[ubuntu-24.04]] و [[ubuntu-24.04-arm]] و [[windows-latest]] و [[macos-latest]] (قايمة أطول في actionlint 1.7.12 لما تكتب label غلط). ولما تكتب قايمة زي [[ [self-hosted, linux, gpu] ]] الـ job بيروح لأي runner عليه **كل** الـ labels دي.

[[container:]] (على runner لينكس بس): الـ runner بيشغّل container من الـ image، وكل [[run]] بيتنفّذ جواه، والـ workspace متركّب جواه. [[env]] و [[options]] (زي [[--cpus 2]]) و [[credentials]] لو الـ image في registry خاص. الـ shell الافتراضي جوه container هو [[sh]] مش bash.

الـ self-hosted (من الـ docs): Settings ثم Actions ثم Runners ثم New self-hosted runner، بيدّيك أوامر تنزّل الـ runner وتشغّل [[./config.sh --url ... --token ...]] وبعدين [[./run.sh]] أو [[./svc.sh install]] كخدمة. الـ runner بيكلّم GitHub من جوه لبرة (HTTPS)، فمش محتاج تفتح بورت.

الأمان: الـ docs بتنصح متستخدمش self-hosted runners مع repos عامة، لأن أي حد يفتح PR من fork ممكن يشغّل كود على ماكينتك. وفيه مشكلة تانية: الـ runner العادي مش بيتمسح بين الـ jobs، فملفات job ممكن يشوفها اللي بعده.`,
          when: "container: لما الإنتاج على image معينة أو محتاج أدوات مش على أوبونتو. self-hosted: GPU، أو شبكة داخلية، أو ماكينة كبيرة على repo خاص.",
          mistakes: R`self-hosted runner على repo عام. و [[container:]] على [[windows-latest]] (مش مدعوم). وتفتكر إن [[bash]] موجود في image زي alpine (الافتراضي [[sh]]، واكتب [[shell: sh]] لو محتاج). وتسيب الـ runner يشتغل بيوزر عنده sudo من غير باسورد.`
        },
        teach: R`## الفكرة: الـ job بيشتغل «فين» بالظبط؟

عندك ٣ اختيارات، وممكن تخلطهم:

| الاختيار | بيتكتب إزاي | البيئة |
|---|---|---|
| runner من GitHub | [[runs-on: ubuntu-latest]] | ماكينة جديدة لكل job، فيها أدوات كتير |
| container على runner GitHub | [[runs-on]] + [[container:]] | الـ steps جوه image انت اختارتها |
| runner بتاعك | [[runs-on: [self-hosted, ...] ]] | سيرفرك انت، بأدواته وشبكته |

---

## ١. [[container:]]

~~~text
  py:
    runs-on: ubuntu-latest
    container:
      image: python:3.13-slim
      env:
        PYTHONDONTWRITEBYTECODE: "1"
    steps:
      - run: python --version && cat /etc/os-release | head -1
~~~

- [[runs-on: ubuntu-latest]] لسه موجود: الـ container بيشتغل **على** الـ runner ده. (لينكس بس.)
- [[image: python:3.13-slim]]: نفس الـ image اللي ممكن تستخدمها في Dockerfile الإنتاج.
- [[env:]] متغيرات جوه الـ container. [[PYTHONDONTWRITEBYTECODE]] بيمنع Python يكتب ملفات [[.pyc]]. القيمة بين علامتين لأن YAML لازم ياخدها نص.
- الأمر: [[python --version]]، و [[&&]] معناها «لو نجح كمّل»، و [[cat /etc/os-release | head -1]] أول سطر من ملف اسم التوزيعة.

### الناتج

اتشغّل بـ act 0.2.89:

~~~text الناتج (مختصر)
[ci/py]   🐳  docker create image=python:3.13-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[ci/py]   | Python 3.13.18
[ci/py]   | PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
[ci/py] 🏁  Job succeeded
~~~

- act عمل container من [[python:3.13-slim]] وخلّاه شغال بـ [[tail -f /dev/null]] (أمر مبيخلصش)، وبعدين نفّذ كل step جواه. GitHub بيعمل نفس الفكرة.
- النظام جوه Debian 13 مش أوبونتو: ده الـ image، مش الـ runner.

---

## ٢. [[runs-on]] بقايمة labels

~~~text
  gpu-tests:
    runs-on: [self-hosted, linux, gpu]
    steps:
      - run: nvidia-smi
~~~

- القايمة معناها «أي runner عليه **التلاتة** دول».
- [[self-hosted]] و [[linux]] بيتحطوا تلقائي على أي runner لينكس بتسجّله. [[gpu]] label انت بتزوّده وقت التسجيل.
- [[nvidia-smi]] أمر NVIDIA بيعرض كارت الشاشة: هيشتغل بس لو الماكينة فيها GPU ودرايفر.

---

## ٣. تسجيل runner (من الـ docs)

الخطوات بتظهرلك في Settings ثم Actions ثم Runners ثم New self-hosted runner، وشكلها كده (الـ token بيتغير كل مرة وصالح ساعة):

~~~bash
mkdir actions-runner && cd actions-runner
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/download/vX.Y.Z/actions-runner-linux-x64-X.Y.Z.tar.gz
tar xzf runner.tar.gz
./config.sh --url https://github.com/OWNER/REPO --token XXXX --labels gpu
sudo ./svc.sh install && sudo ./svc.sh start
~~~

- [[config.sh]] بيسجّل الماكينة. [[--labels gpu]] بيزوّد label.
- [[svc.sh install]] بيعمله خدمة systemd فيقوم مع السيرفر.
- الـ runner هو اللي بيكلّم GitHub ويسأل «فيه شغل؟»، فمش محتاج تفتح بورت.

> متشغّلش self-hosted runner على repo **عام**: أي PR من fork ممكن يشغّل كود على السيرفر بتاعك. والـ runner مش بيتمسح بين الـ jobs زي بتاع GitHub.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أوبونتو جاهز | [[runs-on: ubuntu-latest]] |
| بيئة زي الإنتاج بالظبط | [[container: image: ...]] |
| GPU أو شبكة داخلية | [[runs-on: [self-hosted, linux, gpu] ]] |

> جوه container الـ shell الافتراضي [[sh]]. ولو الـ image مفيهاش bash، أي [[shell: bash]] هيفشل.`,
        lines: [
          R`الـ jobs.`,
          R`job اسمه [[py]].`,
          R`الـ runner: أوبونتو من GitHub.`,
          R`شغّل الـ steps جوه container.`,
          R`من الـ image دي.`,
          R`متغيرات جوه الـ container.`,
          R`متكتبش ملفات [[.pyc]].`,
          R`الخطوات.`,
          R`اطبع نسخة Python واسم النظام: [[Python 3.13.18]] و Debian 13.`,
          R`job تاني.`,
          R`على runner بتاعك عليه التلات labels دول.`,
          R`الخطوات.`,
          R`اعرض كارت الشاشة.`
        ],
        sol: R`بـ act 0.2.89 job [[py]] طبع [[Python 3.13.18]] و [[PRETTY_NAME="Debian GNU/Linux 13 (trixie)"]].

ولو غيّرت الـ image لـ [[node:24-alpine]]، [[cat /etc/os-release]] هيقول Alpine Linux، و [[python]] مش موجود فالـ step هتفشل بـ [[not found]]: البيئة كلها بقت بتاعة الـ image.

job [[gpu-tests]] من غير runner متسجّل بالـ labels دي بيفضل [[Queued]] مستني (من الـ docs)، مش بيفشل على طول.`
      }
    ]
  }
]);
