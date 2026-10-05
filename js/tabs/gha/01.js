// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
    },
    {
      t: "CI حقيقي",
      l: 2,
      n: "أسرار، وقاعدة بيانات في الاختبار، وكاش، و jobs بتعتمد على بعض",
      items: [
        {
          cmd: "secrets و env",
          title: "الأسرار متتكتبش في الملف",
          desc: "الـ workflow ملف في Git، فأي سر فيه مكشوف. الأسرار بتتحط في Settings ثم Secrets، وبتتقري بـ [[secrets.NAME]]، و GitHub بيخبّيها في اللوج. و [[GITHUB_TOKEN]] موجود لوحده بصلاحيات على الـ repo ده.",
          example: R`env:
  NODE_ENV: test
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: $__{{ secrets.TEST_DATABASE_URL }}
    steps:
      - run: echo "$DATABASE_URL" | sed 's/:[^:@]*@/:***@/'
      - run: npm test
        env:
          JWT_SECRET: $__{{ secrets.JWT_SECRET }}
      - run: gh api repos/$__{{ github.repository }}/issues --jq '.[0].title'
        env:
          GH_TOKEN: $__{{ secrets.GITHUB_TOKEN }}`,
          try: "ضيف secret اسمه TEST_VALUE، واطبعه في step: هتلاقيه [[***]] في اللوج.",
          flag: "script",
          deep: {
            why: "الـ workflow في Git، وأي حد يقدر يقرا الـ repo (أو الـ fork) يشوفه. الباسوردات والمفاتيح لازم تبقى في مكان GitHub بيحميه.",
            how: R`Settings ثم Secrets and variables ثم Actions. [[Secrets]] مشفّرة ومش بتتقري تاني بعد الحفظ، و GitHub بيبدّل قيمتها بـ [[***]] لو ظهرت في اللوج. [[Variables]] للقيم مش السرية (URL، اسم بيئة) وبتتقري بـ [[vars.NAME]].

[[env]] على مستوى الـ workflow بيتطبق على كل حاجة، وعلى مستوى job على الـ job، وعلى step على الـ step بس. الأضيق بيكسب.

[[secrets.GITHUB_TOKEN]] موجود لوحده في كل run: توكن مؤقت بصلاحيات على الـ repo ده (قراية الكود، كتابة packages، تعليق على PR). بينتهي مع الـ run. وصلاحياته بتتحدد بـ [[permissions]].

الـ secrets مش بتوصل للـ workflows اللي بتشتغل من PR جاي من fork (حماية)، فاختبارات الـ PRs الخارجية مش هتلاقيها.

والـ [[sed]] في المثال بيوريك إزاي تطبع URL بباسورد مخفي للتشخيص.

وحاجة مهمة: لو سر اتسرب في اللوج مرة (طبعته بـ base64 مثلًا، GitHub مش هيمسكه)، غيّره.`,
            when: "أي قيمة سرية. والـ Variables لكل حاجة بتختلف بين staging والإنتاج.",
            mistakes: "تطبع secret بطريقة ملتوية عشان تشوفه فيتسرب. وتحط سر في env على مستوى الـ workflow وهو محتاج في step واحدة."
          },
          lines: [
            "متغير لكل الـ workflow.",
            "قيمته.",
            "المهام.",
            "مهمة.",
            "ماكينة.",
            "متغيرات الـ job ده.",
            "سر من إعدادات الـ repo (بيظهر *** في اللوج).",
            "الخطوات.",
            "اطبع الـ URL بباسورد مخفي (للتشخيص).",
            "الاختبارات.",
            "متغير للـ step دي بس.",
            "سر تاني.",
            "استخدم GitHub API.",
            "متغير للـ step.",
            "التوكن الجاهز بتاع الـ run."
          ],
          sol: R`الـ step اللي بتطبع [[echo "value: $TEST_VALUE"]] هتطلّع في اللوج [[value: ***]]. GitHub بيدوّر على قيمة أي secret في اللوج ويستبدلها بـ [[***]]. و [[echo "length: $__{#TEST_VALUE}"]] بيطبع الطول الحقيقي (مثلًا [[length: 11]])، ودي طريقة آمنة تتأكد إن الـ secret وصل من غير ما تطبعه.

لو طلع [[value: ]] فاضي و [[length: 0]]: اسم الـ secret مختلف (الأسماء بتتحول لـ uppercase، فـ [[secrets.TEST_VALUE]] لازم يطابق)، أو حاطط الـ secret في environment والـ job مش عامل [[environment:]]، أو الـ run جاي من pull request من fork، ودي الـ secrets مش بتتبعتلها أصلًا.

والإخفاء مش حماية كاملة: لو طبعت الـ secret بعد تحويله ([[base64]] أو [[rev]] أو حرف حرف) هيظهر عادي. الإخفاء بيحميك من الغلطة، مش من حد عايز يسرّب.`,
          solCode: R`jobs:
  show:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "value: $TEST_VALUE"
          echo "length: $__{#TEST_VALUE}"
        env:
          TEST_VALUE: $__{{ secrets.TEST_VALUE }}`
        },
        {
          cmd: "base64 -d",
          title: "ملف كامل جوه secret",
          desc: "الـ secrets نص بس، بس أحيانًا محتاج ملف: مفتاح توقيع أندرويد (keystore)، أو شهادة .p12. الحل: تحوّل الملف لنص base64 على جهازك، تحطه في secret، وفي الـ workflow ترجّعه ملف بـ [[base64 -d]] في فولدر مؤقت.",
          example: R`# على جهازك مرة واحدة (لينكس أو WSL أو Git Bash):
base64 -w0 release.p12 > keystore.b64
gh secret set ANDROID_KEYSTORE_BASE64 < keystore.b64
rm keystore.b64
# في الـ workflow:
- name: Restore keystore
  env:
    KEYSTORE_BASE64: $__{{ secrets.ANDROID_KEYSTORE_BASE64 }}
  run: |
    echo "$KEYSTORE_BASE64" | base64 -d > "$RUNNER_TEMP/release.p12"
    echo "RELEASE_KEYSTORE_FILE=$RUNNER_TEMP/release.p12" >> "$GITHUB_ENV"`,
          try: "اعمل ملف صغير فيه أي كلام، حوّله base64 وحطه في secret بـ [[gh secret set]]، وفي workflow رجّعه واطبع [[sha256sum]] بتاعه وقارنه بالأصل.",
          flag: "script",
          deep: {
            why: "مفتاح التوقيع لازم يبقى في الـ CI عشان يطلع APK موقّع، ومينفعش يبقى في الـ repo. والـ secret مش بيقبل ملفات، فبنحوّل الملف لنص ونرجّعه.",
            how: R`[[base64 -w0]] بيحوّل أي ملف (حتى binary) لسطر نص واحد من حروف وأرقام. [[-w0]] يعني متكسّرش السطر. على الماك: [[base64 -i release.p12]]. وعلى PowerShell: [[[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.p12"))]].

[[gh secret set NAME < file]] بيرفع المحتوى كـ secret من غير ما تلزقه بإيدك في المتصفح (اللزق بإيدك ساعات بيزوّد مسافة أو سطر).

في الـ workflow: الـ secret بيدخل كمتغير بيئة، و [[base64 -d]] بيرجّعه ملف. [[$RUNNER_TEMP]] فولدر مؤقت بيتمسح مع نهاية الـ job، فالمفتاح مش بيفضل في أي مكان.

والسطر الأخير بيحط مسار الملف في [[$GITHUB_ENV]]، فالـ steps اللي بعدها (Gradle مثلًا) تلاقيه في متغير [[RELEASE_KEYSTORE_FILE]].

حد الـ secret الواحد ٤٨ كيلو، والـ keystore عادة ٢ أو ٣ كيلو فمفيش مشكلة. والباسورد بتاعه في secret تاني منفصل.`,
            when: "أي ملف سري محتاجه الـ build: keystore أندرويد، شهادة توقيع ويندوز، ملف service account.",
            mistakes: R`[[certutil -encode]] على ويندوز بيضيف سطور BEGIN و END فالـ decode يطلع ملف بايظ. وفي مشروع حقيقي كان الـ workflow بيقول «لو الـ secret فاضي ابني debug»: الـ secret اتمسح مرة، والـ build نجح أخضر بس طلّع APK مش موقّع بالمفتاح الأصلي، فمكانش بيتسطّب كتحديث فوق النسخة اللي عند الناس. لو الإصدار لازم يبقى موقّع، افشل بـ [[::error::]] بدل ما تكمّل بهدوء.`
          },
          lines: [
            "حوّل الملف لسطر base64 واحد.",
            "ارفعه secret من الترمنال.",
            "امسح النسخة النصية.",
            "step باسم واضح.",
            "متغيراتها.",
            "الـ secret كمتغير بيئة.",
            "أوامر.",
            "رجّعه ملف في الفولدر المؤقت.",
            "وخلّي مساره متاح للـ steps الجاية."
          ],
          sol: R`على جهازك: ملف فيه [[hello from terminal-study]] بيتحول لـ [[aGVsbG8gZnJvbSB0ZXJtaW5hbC1zdHVkeQo=]] و [[sha256sum note.txt]] بيطلّع [[ef14986c004127fe5bc10638ba798128dd8f9460b4286d7a97d9338e7113ef52]]. في الـ workflow بعد [[base64 -d]] نفس الـ hash بالظبط بيطلع قدام [[.../note.txt]]، ودا معناه إن الملف رجع byte by byte.

لو الـ hash مختلف: غالبًا عملت [[base64]] من غير [[-w0]] ونسخت الناتج بإيدك فالـ line breaks اتلخبطت، أو استخدمت [[echo]] في ويندوز PowerShell فاتضاف BOM أو CRLF. ولو [[base64: invalid input]] يبقى الـ secret فيه حاجة زيادة (مسافة أو اقتباس). وأمان أكتر: خلي [[gh secret set NAME < file.b64]] يقرا من الملف بدل ما تلزق القيمة.`,
          solCode: R`# على جهازك
echo "hello from terminal-study" > note.txt
sha256sum note.txt
base64 -w0 note.txt > note.b64
gh secret set NOTE_B64 < note.b64
rm note.b64

# .github/workflows/b64.yml
name: B64
on: [workflow_dispatch]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Restore file
        env:
          NOTE_B64: $__{{ secrets.NOTE_B64 }}
        run: |
          echo "$NOTE_B64" | base64 -d > "$RUNNER_TEMP/note.txt"
          sha256sum "$RUNNER_TEMP/note.txt"`
        },
        {
          cmd: "matrix",
          title: "نفس الاختبار على كذا نسخة",
          desc: R`الـ matrix بيخلي job واحد يتكرر تلقائي على كذا قيمة بالتوازي، بدل ما تكتبه كذا مرة. هنا [[matrix]] فيه قايمتين: [[node: [22, 24]]] و [[os: [ubuntu-latest, windows-latest]]]، و GitHub بيعمل job لكل تركيبة، يعني 4 jobs.

جوه الـ job بتوصل للقيمة الحالية بـ [[matrix.node]] و [[matrix.os]] جوه [[$__{{ }}]]: [[runs-on]] بياخد نظام التشغيل، و [[node-version]] في setup-node بياخد نسخة Node. [[strategy]] هو المكان اللي بيتكتب فيه الـ matrix. و [[fail-fast]] افتراضيًا true، يعني أول job يفشل الباقي يتلغي؛ [[false]] بتخلي الكل يكمّل فتعرف الفشل في نسخة واحدة ولا في كله.

خد بالك إن كل job بياكل من دقايق الـ CI بتاعتك: 4 jobs في 3 دقايق يبقوا 12 دقيقة. ده مهم لمكتبة لازم تشتغل في كل مكان، أما تطبيق بيشتغل على نسخة واحدة في الإنتاج فاختبار واحد كفاية.`,
          example: R`jobs:
  test:
    runs-on: $__{{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        node: [22, 24]
        os: [ubuntu-latest, windows-latest]
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: $__{{ matrix.node }}
      - run: npm ci
      - run: npm test`,
          try: "المصفوفة دي بتعمل ٤ jobs. شوفهم في صفحة الـ run جنب بعض.",
          flag: "script",
          deep: {
            why: "مكتبة بتنشرها لازم تشتغل على كذا نسخة Node. تطبيق فريقه على ويندوز وماك. بدل ٤ ملفات، matrix واحدة.",
            how: R`[[strategy.matrix]] بياخد قوايم، وبيعمل job لكل تركيبة ممكنة: node 22 و 24 مع ubuntu و windows = ٤ jobs. كل job بتشوف قيمها في [[matrix.node]] و [[matrix.os]].

[[fail-fast: true]] (الافتراضي): أول job تفشل، الباقي بيتلغي. مفيد توفّر دقايق. [[false]]: الكل يكمّل، فتعرف الفشل على نسخة واحدة ولا كلهم.

[[include]] بيضيف تركيبة معينة بإعدادات إضافية، و [[exclude]] بيشيل تركيبة (زي windows مع node 22).

[[max-parallel]] بيحدد كام job في نفس الوقت (الحساب المجاني ليه حد).

الـ matrix بتضرب في وقت CI: ٤ jobs × ٣ دقايق = ١٢ دقيقة من رصيدك. للتطبيق (مش مكتبة)، نسخة واحدة هي اللي في الإنتاج كفاية.`,
            when: "مكتبات. وتطبيق فيه كود يعتمد على النظام.",
            mistakes: "matrix كبيرة لتطبيق عادي، فالـ CI بطيء ورصيد الدقايق بيخلص."
          },
          lines: [
            "المهام.",
            "مهمة.",
            "نظام التشغيل من المصفوفة.",
            "استراتيجية التشغيل.",
            "لو واحد فشل، الباقي يكمّل.",
            "المصفوفة.",
            "نسختين Node.",
            "نظامين. المجموع ٤ jobs.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "إعداداته.",
            "النسخة من المصفوفة.",
            "سطّب.",
            "اختبر."
          ],
          sol: R`صفحة الـ run هتعرض ٤ jobs بأسماء زي [[test (22, ubuntu-latest)]] و [[test (22, windows-latest)]] و [[test (24, ubuntu-latest)]] و [[test (24, windows-latest)]]، شغالين في نفس الوقت. الويندوز غالبًا أبطأ بدقيقة أو اتنين.

الفايدة الحقيقية تظهر لما واحد بس يفشل، مثلًا ويندوز بسبب مسار مكتوب بـ [[/]] أو script في package.json بيستخدم [[rm -rf]]. ساعتها تعرف إن المشكلة في النظام مش في الكود. ومع [[fail-fast: false]] الباقيين بيكمّلوا، ولو شلتها أول فشل يلغي الباقي فتشوف [[The operation was canceled.]] على jobs ممكن كانت هتنجح.

ولو اتعمل job واحد بس، راجع إن [[node]] و [[os]] تحت [[matrix:]] مش تحت [[strategy:]] مباشرة، وإن [[runs-on]] مكتوب [[$__{{ matrix.os }}]].`
        },
        {
          cmd: "services",
          title: "قاعدة بيانات للاختبارات",
          desc: "الاختبارات محتاجة Postgres. [[services]] بيشغّل container جنب الـ job، والـ healthcheck بيخلي الـ steps تستنى لحد ما القاعدة تبقى جاهزة. الـ job بيوصلها على localhost.",
          example: R`jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: app_test
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-retries 10
    env:
      DATABASE_URL: postgres://postgres:test@localhost:5432/app_test
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm test`,
          try: "شغّل migrations على القاعدة دي قبل الاختبارات. لو migration فشلت في CI، هتعرف قبل الإنتاج.",
          flag: "script",
          deep: {
            why: "اختبارات الـ API محتاجة قاعدة حقيقية، مش mock. و mocking قاعدة البيانات بيخبّي أخطاء SQL و migrations.",
            how: R`[[services]] بيشغّل containers جنب الـ job قبل الـ steps، وبيقفلها في الآخر. كل خدمة بـ image و env و ports زي docker run.

[[options]] بتاخد flags لـ docker: الـ healthcheck هنا مهم جدًا. Postgres بياخد ثواني يقوم، ومن غير health، أول step ممكن تحاول تتصل قبل ما يبقى جاهز وتفشل. GitHub بيستنى الـ service تبقى healthy قبل ما يبدأ الـ steps.

[[>-]] في YAML: النص اللي بعده سطور مدمجة في سطر واحد (folded).

من جوه الـ steps (اللي بتشتغل على الـ runner مباشرة)، الخدمة على [[localhost:5432]] لأن البورت مربوط. لو الـ job نفسه بيشتغل في container، بتوصلها باسمها [[postgres]].

[[prisma migrate deploy]] قبل الاختبارات بيطبّق الـ schema على القاعدة الفاضية. ودي فايدة إضافية: الـ migrations بتتجرّب من الصفر في كل run.

نفس الفكرة لـ Redis أو أي خدمة.`,
            when: "أي اختبارات integration بتلمس قاعدة بيانات.",
            mistakes: "نسيان healthcheck فالاختبارات تفشل أحيانًا بـ ECONNREFUSED (flaky). واستخدام قاعدة الإنتاج أو staging في CI."
          },
          lines: [
            "المهام.",
            "مهمة.",
            "ماكينة.",
            "خدمات جانبية.",
            "اسمها postgres.",
            "الصورة.",
            "متغيراتها.",
            "باسورد.",
            "قاعدة تتعمل أول مرة.",
            "اربط البورت على الـ runner.",
            "flags لـ docker run (مدمجة في سطر).",
            "فحص الجاهزية...",
            "...كل ٥ ثواني...",
            "...١٠ محاولات. الـ steps مش هتبدأ قبل ما تنجح.",
            "متغيرات الـ job.",
            "الاتصال بالقاعدة على localhost.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "إعداداته في سطر.",
            "سطّب.",
            "طبّق الـ migrations على القاعدة الفاضية.",
            "اختبر."
          ],
          sol: R`الحل: step [[npx prisma migrate deploy]] قبل [[npm test]] (زي المثال). لو كله سليم هتشوف في اللوج أسماء الـ migrations اللي اتطبقت و [[All migrations have been successfully applied.]]. وفي بداية الـ job step اسمها [[Initialize containers]] بتستنى الـ health check قبل ما تكمّل.

لو في migration غلط (مثلًا [[ALTER TABLE]] على جدول مش موجود) هتفشل الـ step دي بالـ error بتاع Postgres ورقم الـ migration، والـ tests مش هتشتغل. ودا المطلوب: عرفت في الـ PR بدل ما تعرف في الإنتاج.

أخطاء شائعة: [[Can't reach database server at localhost:5432]] يعني الـ [[ports]] مش موجودة، أو الـ job شغال جوه [[container:]] وساعتها الـ host يبقى اسم الـ service ([[postgres]]) مش localhost. ومن غير الـ [[--health-cmd]] الـ migrations ممكن تجري قبل ما Postgres يجهز فتفشل مرة وتنجح مرة.`,
          solCode: R`    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm test`
        },
        {
          cmd: "cache و artifacts",
          title: "أسرع، واحتفظ بالناتج",
          desc: "كل job ماكينة جديدة، فـ npm ci بيسطّب من الصفر. [[cache: npm]] في setup-node بيحفظ كاش npm بين الـ runs. و [[upload-artifact]] بيحفظ ملفات (build، تقارير، screenshots) تنزّلها من صفحة الـ run أو job تاني ياخدها.",
          example: R`- uses: actions/cache@v6
  with:
    path: ~/.npm
    key: npm-$__{{ hashFiles('package-lock.json') }}
- run: npm run build
- uses: actions/upload-artifact@v7
  with:
    name: dist
    path: dist/
    retention-days: 7
- uses: actions/download-artifact@v8
  with:
    name: dist`,
          try: "ارفع فولدر dist كـ artifact، وحمّله من صفحة الـ run: ده بالظبط اللي هيتعمله deploy.",
          flag: "script",
          deep: {
            why: "npm ci من الصفر بياخد دقيقة أو اتنين في كل run. والـ build اللي عملته في job محتاجه في job تاني على ماكينة تانية.",
            how: R`الكاش: [[actions/cache]] بيحفظ فولدر بمفتاح، وفي الـ run الجاي لو المفتاح موجود بيرجّعه. المفتاح هنا فيه [[hashFiles('package-lock.json')]]: لو الـ lock اتغير، مفتاح جديد وكاش جديد. [[restore-keys]] بيسمح بكاش قريب لو المطابق مش موجود.

[[setup-node]] بـ [[cache: npm]] بيعمل ده لوحده لـ [[~/.npm]]، فمش محتاج actions/cache غالبًا. الكاش بيسرّع التنزيل، بس npm ci لسه بيفك ويسطّب.

الـ artifacts: [[upload-artifact]] بيرفع ملفات لصفحة الـ run، تنزّلها من الواجهة أو [[gh run download]]. [[download-artifact]] في job تاني بينزّلها (لازم needs على الأول). [[retention-days]] بعدها بتتمسح (الافتراضي ٩٠ يوم وبتاكل من مساحة الحساب).

استخدامات: ناتج build يتعمله deploy في job منفصل، وتقارير اختبار، و screenshots من Playwright لما اختبار يفشل، و coverage.

الكاش بحد ١٠ جيجا للـ repo، والأقدم بيتمسح لوحده.`,
            when: "cache دايمًا. artifacts لأي ناتج محتاج يعدّي بين jobs أو تشوفه بعدين.",
            mistakes: "تعمل cache لـ node_modules نفسه بدل ~/.npm: بيتكسر مع تغيير نسخة Node أو النظام."
          },
          lines: [
            "كاش يدوي.",
            "إعداداته.",
            "الفولدر اللي يتحفظ.",
            "المفتاح: بيتغير لما الـ lock يتغير.",
            "ابني.",
            "ارفع ناتج الـ build لصفحة الـ run.",
            "إعداداته.",
            "اسم الـ artifact.",
            "الفولدر.",
            "يتمسح بعد أسبوع.",
            "في job تاني: نزّله.",
            "إعداداته.",
            "بنفس الاسم."
          ],
          sol: R`بعد ما الـ run يخلص، انزل لآخر صفحة الـ Summary: هتلاقي قسم [[Artifacts]] فيه [[dist]] وحجمه. بتدوس عليه بينزل [[dist.zip]]، وجواه محتوى فولدر dist (الـ index.html والـ assets). دا نفس اللي هيتنشر، فافتحه وجرّبه لو محتاج.

ولو ضفت [[actions/cache]]: أول run مكتوب فيه [[Cache not found for input keys: npm-...]]، والتاني [[Cache restored from key: npm-...]]، و [[npm ci]] بقى أسرع.

أخطاء شائعة: [[No files were found with the provided path: dist/]] يعني الـ build طلّع في فولدر تاني ([[build]] أو [[out]]) أو الـ build نفسه فشل بصمت. و [[download-artifact]] في نفس الـ job مالوش لازمة، بيتستخدم في job تانية عاملة [[needs]] على الأولى. والـ artifact بيتمسح بعد [[retention-days]]، فمينفعش يبقى هو الباك أب بتاعك.`
        },
        {
          cmd: "GITHUB_ENV و GITHUB_OUTPUT",
          title: "قيمة من step للي بعدها",
          desc: "كل step بتشتغل في شيل جديد، فـ [[export]] مش بيعدّي. عشان تحسب قيمة في step وتستخدمها بعدها، اكتب [[NAME=value]] في الملف [[$GITHUB_ENV]] فتبقى متغير بيئة في كل الـ steps الجاية. أو في [[$GITHUB_OUTPUT]] وتقراها بـ [[steps.ID.outputs.NAME]].",
          example: R`- name: Stamp build
  run: |
    echo "BUILD_TIME=$(date +%s)000" >> "$GITHUB_ENV"
    echo "VERSION=$__{{ github.run_number }}-$__{GITHUB_SHA::7}" >> "$GITHUB_ENV"
- run: echo "build $VERSION at $BUILD_TIME"
- id: meta
  run: echo "size=$(du -sh dist | cut -f1)" >> "$GITHUB_OUTPUT"
- run: echo "dist is $__{{ steps.meta.outputs.size }}"`,
          try: "اعمل step بتكتب [[VERSION]] في GITHUB_ENV، وجرّب تطبعه في نفس الـ step (هيطلع فاضي) وفي اللي بعدها (هيطلع).",
          flag: "script",
          deep: {
            why: "محتاج رقم نسخة أو وقت build أو مسار ملف تحسبه مرة وتستخدمه في كذا step. ومتغيرات الشيل بتموت مع نهاية الـ step.",
            how: R`[[$GITHUB_ENV]] مسار ملف. GitHub بيقراه بعد كل step، وأي سطر [[NAME=value]] فيه بيبقى متغير بيئة للـ steps اللي بعدها في نفس الـ job. مش في نفس الـ step: هناك استخدم متغير شيل عادي.

[[github.run_number]] رقم بيزيد ١ مع كل run للـ workflow ده (1، 2، 3)، و [[$__{GITHUB_SHA::7}]] أول ٧ حروف من الـ commit (قص نص في bash). مع بعض بيعملوا نسخة مقروءة زي [[42-a1b2c3d]] تعرف منها الـ run والـ commit. وفي أندرويد الـ run_number بيتحط كـ versionCode لأنه بيزيد دايمًا.

[[$GITHUB_OUTPUT]] نفس الفكرة بس للـ outputs: الـ step لازم يبقى ليها [[id]]، والقيمة بتتقري بـ [[steps.meta.outputs.size]]. الفرق: الـ output ليه اسم مربوط بالـ step، ويقدر يعدّي لـ job تاني: [[outputs: { size: $__{{ steps.meta.outputs.size }} }]] على مستوى الـ job، والـ job التاني يقراه بـ [[needs.build.outputs.size]].

قيمة فيها أكتر من سطر محتاجة شكل خاص: [[NAME<<EOF]] وبعدين السطور وبعدين [[EOF]].

الشكلين القديمين: [[::set-env]] اتقفل خالص، و [[::set-output]] deprecated وبيطلّع تحذير. لو شفتهم في workflow قديم استبدلهم بدول.`,
            when: "رقم نسخة، ووقت build، ومسار ملف اتعمل، وأي حاجة step بتحسبها والباقي محتاجها.",
            mistakes: "تستخدم المتغير في نفس الـ step اللي كتبته فيها فيطلع فاضي. و [[export VERSION=...]] وتستغرب إنه اختفى في الـ step الجاية. وقيمة فيها سطر جديد من غير شكل EOF فالملف يتلخبط."
          },
          lines: [
            "step باسم واضح.",
            "أوامر.",
            "وقت الـ build بالمللي ثانية، متاح من الـ step الجاية.",
            "نسخة مقروءة: رقم الـ run وأول ٧ حروف من الـ commit.",
            "step بعدها: المتغيرات موجودة.",
            "step ليها id...",
            "...بتكتب output اسمه size.",
            "اقرا الـ output بالـ id."
          ],
          sol: R`الناتج في اللوج: الـ step الأولى بتطبع [[same step: []]] فاضي، والتانية بتطبع [[next step [1.2.3]]].

السبب إن [[GITHUB_ENV]] مجرد ملف. الـ runner بيقراه بعد ما الـ step تخلص ويضيف اللي فيه لبيئة الـ steps اللي بعدها. أما الـ shell الحالي فمعندوش فكرة إن حاجة اتكتبت في ملف. لو محتاج القيمة في نفس الـ step، اعملها متغير عادي كمان: [[VERSION=1.2.3; echo "VERSION=$VERSION" >> "$GITHUB_ENV"]].

الغلط الشائع التاني: [[echo "VERSION = 1.2.3"]] بمسافات، فيبقى اسم المتغير [["VERSION "]] بمسافة. أو [[>]] بدل [[>>]] فتمسح اللي اتكتب قبله. وخلي بالك إن [[$__{{ env.VERSION }}]] بيتحسب قبل ما الـ step تبدأ، فهو كمان هيطلع فاضي في نفس الـ step.`,
          solCode: R`steps:
  - run: |
      echo "VERSION=1.2.3" >> "$GITHUB_ENV"
      echo "same step: [$VERSION]"
  - run: echo "next step [$VERSION]"`
        },
        {
          cmd: "::error::",
          title: "رسالة واضحة بدل فشل غامض",
          desc: "سطر بيبدأ بـ [[::error::]] في اللوج، GitHub بيحوّله لرسالة حمرا فوق في صفحة الـ run. فبدل ما الـ deploy يفشل بـ error مش مفهوم لأن secret ناقص، افحص في أول الـ job واطبع الإصلاح بالظبط، وبعدين [[exit 1]].",
          example: R`- name: Check secrets
  env:
    SSH_KEY: $__{{ secrets.DEPLOY_SSH_KEY }}
    SSH_HOST: $__{{ secrets.DEPLOY_HOST }}
  run: |
    if [ -z "$SSH_KEY" ] || [ -z "$SSH_HOST" ]; then
      echo "::error::DEPLOY_SSH_KEY or DEPLOY_HOST is missing in Settings > Secrets"
      exit 1
    fi
    echo "::notice::secrets OK"
- run: |
    echo "::group::installed packages"
    npm ls --depth=0
    echo "::endgroup::"`,
          try: "شغّل الـ step دي على repo مفيهوش الـ secrets، وشوف الرسالة في Annotations فوق في صفحة الـ run.",
          flag: "script",
          deep: {
            why: "secret ناقص مش بيطلع error: بيبقى نص فاضي، والفشل بيحصل بعدها بخطوات بـ رسالة زي Load key: invalid format. رسالة واحدة واضحة في الأول بتوفّر نص ساعة.",
            how: R`دي اسمها workflow commands: سطور بتطبعها بشكل معين و GitHub بيفهمها.

[[::error::رسالة]] بتظهر حمرا في Annotations في صفحة الـ run، و [[::warning::]] صفرا، و [[::notice::]] زرقا. ممكن تربطها بملف وسطر: [[::warning file=src/app.js,line=10::رسالة]] فتظهر على الكود نفسه في الـ PR.

[[::error::]] لوحدها مش بتفشّل الـ step، هي بس بتعرض. الـ [[exit 1]] هو اللي بيوقف.

[[-z "$VAR"]] صح لو المتغير فاضي، وده اللي بيحصل لو الـ secret مش موجود.

[[::group::]] و [[::endgroup::]] بيطوّوا اللوج اللي بينهم تحت عنوان، فاللوج الطويل يبقى مقروء.

و [[::add-mask::$VALUE]] بتخلي أي قيمة (مش secret) تتخبى بـ *** في باقي اللوج، زي توكن جبته من API.`,
            when: "أول step في أي job بيعتمد على secrets. وأي سكربت فحص عايز رسالته تبان.",
            mistakes: "تكتب [[::error::]] وتنسى [[exit 1]] فالـ job يكمّل. وفي مشروع حقيقي كان الـ deploy بيفشل بـ scp error غريب لحد ما اتضاف الفحص ده واتضح إن DEPLOY_HOST مش متسجّل في الـ repo الجديد."
          },
          lines: [
            "step الفحص.",
            "متغيراتها.",
            "المفتاح من secret (فاضي لو مش موجود).",
            "السيرفر من secret.",
            "أوامر.",
            "لو أي واحد فاضي...",
            "...اطبع رسالة حمرا فوق في صفحة الـ run بالإصلاح...",
            "...ووقّف الـ job.",
            "نهاية الشرط.",
            "رسالة زرقا إن كله تمام.",
            "step تانية.",
            "ابدأ مجموعة مطوية في اللوج.",
            "لوج طويل جواها.",
            "اقفل المجموعة."
          ],
          sol: R`الـ run هيبقى أحمر، وفوق في صفحة الـ Summary قسم [[Annotations]] فيه [[1 error]] وتحته اسم الـ job والرسالة: [[DEPLOY_SSH_KEY or DEPLOY_HOST is missing in Settings > Secrets]]. غالبًا هتلاقي جنبها annotation تانية [[Process completed with exit code 1.]]. وجوه اللوج نفسه السطر ده بيبان بالأحمر مكتوب [[Error:]] قبله.

وعلى repo فيه الـ secrets الـ step بتنجح وبيظهر [[secrets OK]] كـ notice في نفس القسم. والـ [[::group::]] في اللوج بيبان كسطر واحد مقفول [[installed packages]] بتدوس عليه يفتح.

لو الرسالة ظهرت في اللوج بس مش في Annotations: غالبًا فيه مسافة قبل [[::error::]] أو كتبتها [[:error:]] بنقطتين بس. الـ runner بيدوّر على السطر بيبدأ بـ [[::]] بالظبط. ولو الـ step نجحت رغم الرسالة، يبقى نسيت [[exit 1]]: الـ annotation لوحدها مش بتفشّل حاجة.`
        },
        {
          cmd: "git diff --quiet",
          title: "الملف المولَّد لسه متزامن؟",
          desc: "فيه ملفات بتتولّد من حاجة تانية: أنواع TypeScript من schema القاعدة، أو client من OpenAPI. لو حد غيّر المصدر ونسي يولّد، الكود يبقى كداب. في CI: ولّد تاني، و [[git diff --quiet]] يقولك الملف اتغير ولا لأ. لو اتغير، يبقى اللي في الـ repo قديم، فافشل.",
          example: R`- run: npm run types:generate
- name: Types in sync?
  run: |
    if git diff --quiet lib/database.types.ts; then
      echo "types in sync"
    else
      git diff lib/database.types.ts
      echo "::error::run npm run types:generate and commit the result"
      exit 1
    fi`,
          try: "في repo تجربة: غيّر ملف متولّد بإيدك واعمل push، وشوف الـ step بتفشل وبتطبع الفرق.",
          flag: "script",
          deep: {
            why: "الـ schema اتغيرت بـ migration، والأنواع فضلت قديمة، و TypeScript مبسوط لأنه مصدّق الأنواع. النتيجة: خطأ في الإنتاج في عمود اسمه اتغير. الفحص ده بيمسكها في الـ PR.",
            how: R`[[git diff --quiet FILE]] بيقارن الملف بآخر commit ومش بيطبع حاجة. بيرجع 0 لو زي ما هو، و 1 لو اتغير. فـ if بتفرّق بين الحالتين. ([[--exit-code]] نفس الفكرة بس بيطبع الفرق.)

لو اتغير: [[git diff]] من غير quiet بيطبع الفرق في اللوج عشان تشوف إيه اللي ناقص، و [[::error::]] بتقول الإصلاح، و [[exit 1]].

توليد الأنواع من القاعدة محتاج قاعدة: [[services: postgres]] وتطبّق الـ migrations عليها الأول، وبعدين تولّد. فالفحص ده بيختبر حاجتين: إن الـ migrations بتشتغل من الصفر، وإن الأنواع متزامنة معاها.

وحط الـ workflow ده على [[paths]] بتاعة الـ migrations والـ API بس، عشان مايشتغلش مع كل تعديل CSS.

نفس الفكرة لأي ملف متولد: [[npx prettier --check .]]، أو lock file (npm ci بيعمل ده لوحده).`,
            when: "أي مشروع فيه ملف بيتولّد من مصدر تاني وبيتعمله commit.",
            mistakes: "[[git diff]] مش بيشوف الملفات الجديدة اللي مش في Git، فلو التوليد عمل ملف جديد الفحص يعدّي. [[git status --porcelain]] بيشوفها. وملف اتولّد على ويندوز بـ CRLF فبيبان متغير دايمًا: [[.gitattributes]] فيه [[* text=auto eol=lf]]."
          },
          lines: [
            "ولّد الأنواع من جديد.",
            "step الفحص.",
            "أوامر.",
            "لو الملف زي اللي في الـ commit...",
            "...تمام.",
            "لو اتغير...",
            "...اطبع الفرق...",
            "...وقول الإصلاح...",
            "...وافشل.",
            "نهاية الشرط."
          ],
          sol: R`لما تعدّل الملف المتولّد بإيدك وتعمل push، الـ step [[Types in sync?]] بتفشل ويظهر في اللوج الـ diff بين اللي الـ generator طلّعه واللي في الـ commit، زي:

[[-export type A = 1;]] و [[+export type A = 2;]]، وبعدها annotation حمرا [[run npm run types:generate and commit the result]]. الـ generator كتب فوق تعديلك، فبقى فيه فرق عن الـ commit.

لو الـ step نجحت رغم إنك غيّرت: غالبًا الملف مش متتبّع في git أصلًا (جديد أو في [[.gitignore]])، و [[git diff]] مش بيشوف الملفات الـ untracked. جرّبت دا: ملف جديد مش متضاف [[git diff --quiet]] رجّع 0 كأنه مفيش فرق، بينما [[git status --porcelain]] بيطلّعه بـ [[??]]. لو عايز تغطي الحالة دي استخدم [[test -z "$(git status --porcelain lib/)"]].`
        },
        {
          cmd: "needs و if و concurrency",
          title: "الترتيب والشروط",
          desc: "الـ jobs بتشتغل بالتوازي إلا لو [[needs]] قال واحد يستنى التاني. [[if]] بيشغّل step أو job بشرط (على main بس، أو لو اللي قبله فشل). [[concurrency]] بيلغي run قديم لو جه push جديد على نفس الـ branch. و [[timeout-minutes]] عشان job معلّق ميفضلش ساعات.",
          example: R`concurrency:
  group: $__{{ github.workflow }}-$__{{ github.ref }}
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps: [ { uses: actions/checkout@v7 }, { run: npm ci }, { run: npm test } ]
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploying"
      - if: failure()
        run: echo "deploy failed, alerting"`,
          try: "اعمل push مرتين ورا بعض بسرعة وشوف الـ run الأول بيتلغي.",
          flag: "script",
          deep: {
            why: "الـ deploy مينفعش يشتغل قبل الاختبارات، ولا على أي branch، ولا مرتين في نفس الوقت. التلات كلمات دول بيظبطوا ده.",
            how: R`[[needs: test]]: الـ job ده يستنى test يخلص بنجاح. لو test فشل، deploy بيتخطى. [[needs: [a, b] ]] لأكتر من واحد.

[[if]] على job أو step: تعبير بيتقيّم قبل التشغيل. [[github.ref == 'refs/heads/main']] على main بس. [[github.event_name == 'push']] مش من PR. وفيه دوال: [[success()]] الافتراضي، و [[failure()]] لو step قبلها فشلت (للتنبيهات)، و [[always()]] مهما حصل (للتنضيف)، و [[cancelled()]].

[[concurrency]]: مجموعة باسم، و run جديد في نفس المجموعة بيلغي القديم لو [[cancel-in-progress: true]]. المجموعة هنا workflow + branch، فـ push جديد على نفس الـ branch بيلغي الـ CI بتاع اللي قبله (توفير). للـ deploy: نفس الفكرة بس [[cancel-in-progress: false]] عشان deploy شغال ميتقطعش، والجديد يستنى.

[[timeout-minutes]]: الافتراضي ٦ ساعات. job معلّق بيحرق رصيدك. ١٠ لـ ٢٠ دقيقة للـ CI العادي.

الـ steps المختصرة بالأقواس [[{ }]] هي نفس YAML بس في سطر واحد (flow style).`,
            when: "needs في أي workflow فيه أكتر من job. if على الـ deploy. concurrency على الكل. timeout على الكل.",
            mistakes: "deploy من غير if فيتعمل من PRs. و cancel-in-progress على deploy فتقطع deploy في النص."
          },
          lines: [
            "التزامن.",
            "المجموعة: workflow + branch.",
            "run جديد يلغي القديم في نفس المجموعة.",
            "المهام.",
            "الاختبارات.",
            "ماكينة.",
            "أقصى ١٠ دقايق.",
            "الخطوات في سطر واحد (نفس YAML بشكل مختصر).",
            "الديبلوي.",
            "يستنى test ينجح.",
            "وعلى main، ومن push مش PR.",
            "ماكينة.",
            "الخطوات.",
            "الديبلوي.",
            "لو اللي قبلها فشلت...",
            "...نبّه."
          ],
          sol: R`الـ run الأول بيبان رمادي بعلامة إلغاء، ولو فتحته هتلاقي annotation زي [[Canceling since a higher priority waiting request for 'CI-refs/heads/main' exists]]. التاني بيكمّل عادي. الـ group هنا اسم الـ workflow والـ ref، فأي run جديد على نفس الـ branch بيلغي القديم.

ولأن [[deploy]] عليه [[needs: test]] والـ test اتلغى، الـ deploy بيبان [[skipped]]، مش بيشتغل بكود نصه قديم.

لو الاتنين كمّلوا: غالبًا الـ push التاني جه بعد ما الأول خلص (الـ test سريع)، أو الـ [[concurrency]] مكتوبة جوه job مش على مستوى الـ workflow، أو الـ push على branches مختلفة فالـ group مختلف. وخلي بالك: [[cancel-in-progress: true]] مناسب للـ CI، بس للـ deploy غالبًا عايز [[false]] عشان متلغيش deploy في نصه.`
        },
        {
          cmd: "jobs متوازية",
          title: "lint و typecheck و test مع بعض",
          desc: "بدل job واحد بياخد ٦ دقايق، ٣ jobs بالتوازي دقيقتين. كل واحد بيسطّب المكتبات (من الكاش)، فالتكرار رخيص. و job أخير بـ needs عليهم كلهم يبقى «الكل نجح».",
          example: R`jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci && npm run lint
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci && npx tsc --noEmit
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci && npm test
  ok:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - run: echo "all green"`,
          try: "في Settings ثم Branches، خلّي job اسمه ok مطلوب (required check) قبل الـ merge في main.",
          flag: "script",
          deep: {
            why: "الـ PR بيستنى ٦ دقايق عشان lint اكتشف مسافة زيادة في الدقيقة الخامسة. بالتوازي، بتعرف في دقيقة.",
            how: R`٣ jobs مستقلة، كل واحدة على ماكينة، بتبدأوا في نفس اللحظة. الأطول فيهم هو وقت الـ CI كله.

كل واحدة بتعمل checkout و setup-node و npm ci: تكرار، بس مع الكاش ده ثواني، والتوازي بيوفر أكتر.

الـ job الأخير [[ok]] بـ needs عليهم كلهم: بيشتغل بس لو التلاتة نجحوا. وليه؟ عشان في Settings ثم Branches ثم Branch protection، بتختار checks مطلوبة قبل الـ merge. لو حددت التلاتة، كل ما تضيف job لازم تحدّث الإعداد. لو حددت [[ok]] بس، تضيف وتشيل jobs براحتك.

الـ [[with: { }]] شكل مختصر لـ inputs في سطر.

ولمشروع كبير: job للـ build مرة واحدة يرفع artifact، والباقي يستخدموه بدل ما كل واحد يبني.`,
            when: "لما الـ CI يعدّي ٣ دقايق. وقبل ما تفعّل branch protection.",
            mistakes: "required checks بأسامي jobs بتتغير. و jobs متوازية من غير كاش فالتوفير يروح في التسطيب."
          },
          lines: [
            "المهام (التلاتة بيبدأوا مع بعض).",
            "lint.",
            "ماكينة.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "إعداداته.",
            "سطّب و lint.",
            "typecheck.",
            "ماكينة.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "إعداداته.",
            "سطّب وافحص الأنواع.",
            "test.",
            "ماكينة.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "إعداداته.",
            "سطّب واختبر.",
            "job «الكل نجح».",
            "يستنى التلاتة.",
            "ماكينة.",
            "الخطوات.",
            "اطبع. ده اللي تخليه required check."
          ],
          sol: R`الطريق: Settings ثم Rules ثم Rulesets (أو Branches ثم Add branch protection rule في الواجهة القديمة)، على [[main]]، فعّل [[Require status checks to pass]]، واكتب [[ok]] في البحث واختاره. بعدها أي PR ليه فحص فاشل زرار الـ Merge بيبقى مقفول ومكتوب إن الـ check المطلوب ما نجحش.

لو [[ok]] مش ظاهر في البحث: لازم يكون اشتغل مرة على الأقل في الـ repo في آخر أسبوع. اعمل PR تجربة الأول.

وفيه فخ مهم: لو [[lint]] فشل، [[ok]] بيبقى [[skipped]]، و GitHub بيعتبر الـ required check اللي اتعمله skip ناجح، فالـ PR ممكن يتعمله merge! الحل إن [[ok]] يشتغل دايمًا ويتأكد بنفسه من نتايج اللي قبله، زي الكود تحت. جرّب تكسر lint في PR وشوف إن الـ merge اتقفل فعلًا.`,
          solCode: R`  ok:
    needs: [lint, typecheck, test]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "results: $__{{ join(needs.*.result, ' ') }}"
          test "$__{{ contains(needs.*.result, 'failure') || contains(needs.*.result, 'cancelled') || contains(needs.*.result, 'skipped') }}" = "false"`
        },
        {
          cmd: "الأمان",
          title: "permissions و pin و dependabot",
          desc: "الـ action كود بيشتغل بصلاحيات على الـ repo بتاعك. [[permissions]] بيقلل صلاحيات GITHUB_TOKEN للي محتاجه بس. و pin بالـ commit SHA بدل tag يمنع إن حد يغيّر الـ action من تحتك. و Dependabot بيحدّث الـ actions زي المكتبات.",
          example: R`permissions:
  contents: read
  packages: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0`,
          try: "اعمل ملف [[.github/dependabot.yml]] فيه [[package-ecosystem: github-actions]] وشوف Dependabot بيفتح PRs لتحديث الـ actions.",
          flag: "script",
          deep: {
            why: "الـ workflow بيشغّل كود ناس تانية (الـ actions) بتوكن ليه صلاحيات على الـ repo بتاعك. لو action اتخترقت أو اتغيرت، الكود ده بيشتغل عندك.",
            how: R`[[permissions]]: افتراضيًا GITHUB_TOKEN ممكن يبقى ليه صلاحيات كتابة واسعة. [[contents: read]] بيقللها للقراية، وتضيف بس اللي محتاجه: [[packages: write]] لرفع images، و [[pull-requests: write]] للتعليق على PR. لو action اتخترقت، مش هتقدر تعدّل كودك.

الـ pin: [[actions/checkout@v7]] بيشاور على tag اسمه v7، وصاحب الـ action يقدر يحرّكه لأي commit. [[@b4ffde65...]] بيشاور على commit بعينه مستحيل يتغير. والتعليق [[# v4.1.1]] عشان تعرف النسخة. ده اللي حصل فعلًا في هجمات على actions مشهورة.

Dependabot: ملف [[.github/dependabot.yml]] بـ [[package-ecosystem: github-actions]] بيفتح PR كل ما فيه نسخة جديدة، وبيحدّث الـ SHA والتعليق مع بعض.

وكمان: متستخدمش [[pull_request_target]] إلا لو فاهمه (بيدّي secrets لكود من fork). و [[workflow_dispatch]] inputs متتحطش في run مباشرة من غير quotes (injection).`,
            when: "permissions في كل workflow من الأول. pin للـ actions غير الرسمية على الأقل. Dependabot في كل repo.",
            mistakes: "[[permissions: write-all]] عشان «يشتغل». و action من حساب شخصي بـ @main."
          },
          lines: [
            "صلاحيات التوكن.",
            "قراية الكود بس.",
            "وكتابة packages (لرفع images).",
            "المهام.",
            "مهمة.",
            "ماكينة.",
            "الخطوات.",
            "checkout مثبّت على commit بعينه، والتعليق بيقول النسخة.",
            "setup-node مثبّت كمان."
          ],
          sol: R`بعد ما تعمل push للملف، Dependabot بيعمل فحص ولو فيه actions قديمة بيفتح PRs بعناوين زي [[Bump actions/checkout from 6 to 7]]. ولو انت مثبّت بالـ SHA زي المثال، الـ PR بيغيّر الـ SHA ويحدّث التعليق [[# v7.0.1]] كمان.

لو مفيش PRs: يا كل الـ actions محدّثة أصلًا (ودا كويس)، يا الفحص لسه ما اشتغلش. تقدر تشوف آخر فحص من Insights ثم Dependency graph ثم Dependabot. ولو [[directory]] غلط أو الملف فيه غلط YAML هيظهر error هناك.

الغلط الشائع إنك تكتب [[package-ecosystem: github-actions]] وتفتكر إنه هيحدّث npm كمان. كل ecosystem محتاج entry لوحده، فضيف واحد لـ [[npm]] لو عايز.`,
          solCode: R`# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: weekly`
        }
      ]
    }
  ]
});
