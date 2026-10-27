// تكملة تاب gha: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/gha/01.js (شرح حقول الدرس في أوله)
MORE("gha", [
  {
    t: "جرّب وافحص قبل الـ push، والأمان المتقدم",
    l: 3,
    n: "تشغيل الـ workflow على جهازك، وفحصه بأدوات، وأشهر ثغرات GitHub Actions وإزاي تقفلها",
    items: [
      {
        cmd: "act",
        title: "شغّل الـ workflow على جهازك بـ Docker",
        desc: R`[[act]] (من nektos) بيقرا [[.github/workflows]] وبيشغّل كل job في Docker container على جهازك، فتجرّب الـ workflow في ثواني من غير push. بيقرا الأسرار من [[.secrets]] والمتغيرات من [[.vars]]، وتقدر تختار job، وتدّيه event معين، وتجرّب من غير تشغيل.

الأوامر دي اتشغّلت بـ act 0.2.89 من Git Bash على ويندوز مع Docker Desktop. الـ [[act -l]] و [[-n]] بيشتغلوا من غير ما يشغّل containers.`,
        example: R`act -l
act push -n
act workflow_dispatch -j test --input target=prod
act pull_request -e event.json
act -P ubuntu-latest=node:22-slim --pull=false push`,
        try: "في repo تجربة اعمل ملف [[.secrets]] فيه [[API_TOKEN=fake-token-123]] و [[.vars]] فيه [[APP_ENV=local]]، وشغّل workflow بيطبعهم، وشوف السر بيظهر إزاي في اللوج. وحط الملفين دول في [[.gitignore]].",
        deep: {
          why: "كل تجربة على GitHub: commit و push وتستنى الـ runner دقيقة أو اتنين، وتلاقي غلطة مسافة. act بيرجّعلك النتيجة في ثواني، ومن غير ما توسّخ تاريخ الـ repo بـ «fix ci» عشرين مرة.",
          how: R`act بيحوّل كل job لـ container: بياخد الـ image اللي بتقابل [[runs-on]] (عن طريق [[-P]])، ويشغّلها بأمر مبيخلصش، ويعمل [[docker exec]] لكل step. [[actions/checkout]] بيتعامل معاه خاص: بينسخ الفولدر بتاعك بدل ما ينزّل من GitHub. باقي الـ actions بينزّلها من GitHub (git clone) ويشغّلها.

الـ events: [[act]] لوحده = push. [[act pull_request]] و [[act workflow_dispatch]] وهكذا. [[-e event.json]] بيدّيه payload انت كاتبه (عنوان PR، رقمه، الـ labels) فتجرّب الشروط اللي بتعتمد على [[github.event]].

الاختيار: [[-j test]] job واحد، و [[-W file.yml]] ملف واحد، و [[--matrix node:22]] تركيبة واحدة. [[-l]] قايمة بس، و [[-n]] (dry run) بيمشي على الخطوات من غير ما يشغّلها.

القيم: [[-s NAME=value]] أو ملف [[.secrets]] (افتراضي)، و [[--var]] أو [[.vars]]، و [[--input]] لـ [[workflow_dispatch]].

الـ image: أول مرة من غير إعداد act بيسألك تختار حجم (Micro و Medium و Large) وبيحفظ في [[~/.actrc]] (من الـ README). [[-P ubuntu-latest=node:22-slim]] بيحدد بنفسك. والـ default بتاع [[--pull]] هو [[true]]، يعني بيعمل [[docker pull]] للـ image كل مرة حتى لو موجودة؛ [[--pull=false]] بيوقف ده.

التسطيب (من الـ docs): [[winget install nektos.act]] على ويندوز، و [[brew install act]] على الماك، أو تنزيل الملف من GitHub Releases.`,
          when: "أي workflow جديد أو تعديل كبير قبل الـ push. وتجربة الشروط ([[if]]) على events مختلفة بـ [[-e]].",
          mistakes: R`تفتكره نسخة طبق الأصل من GitHub: الـ image مش زي الـ runner (أدوات ناقصة)، ومفيش [[services]] بنفس الشكل، ومفيش environments و approvals، والـ OIDC مش موجود. وتنسى إن [[--pull]] افتراضيًا بيحدّث الـ images بتاعتك. وترفع [[.secrets]] على Git.`
        },
        teach: R`## الفكرة: GitHub runner صغير على جهازك

act بيقرا نفس ملفات [[.github/workflows]]، ولكل job بيعمل container ويشغّل الـ steps جواه. المثال ٥ أوامر، كل واحد بيجاوب سؤال. اتشغّلوا على workflow فيه job اسمه [[test]] بيطبع [[vars.APP_ENV]] و [[inputs.target]] وسر اسمه [[API_TOKEN]]، و job تاني اسمه [[lint]].

---

## ١. [[act -l]]: إيه اللي موجود؟

[[-l]] اختصار list:

~~~text الناتج
Stage  Job ID  Job name  Workflow name  Workflow file  Events
0      test    test      ci             ci.yml         push,workflow_dispatch
0      lint    lint      ci             ci.yml         push,workflow_dispatch
~~~

| العمود | معناه |
|---|---|
| Stage | الترتيب: الـ jobs في نفس الـ stage بيشتغلوا مع بعض، و [[needs]] بيزوّد stage |
| Job ID | الاسم اللي بتديه لـ [[-j]] |
| Events | الـ events اللي بتشغّل الـ workflow ده |

---

## ٢. [[act push -n]]: جرّب من غير تشغيل

[[push]] اسم الـ event، و [[-n]] اختصار dry run: بيمشي على كل الخطوات ويطبعها من غير ما يشغّل حاجة:

~~~text الناتج (آخره)
*DRYRUN* [ci/lint]   ✅  Success - Complete job
*DRYRUN* [ci/lint] 🏁  Job succeeded
*DRYRUN* [ci/test]   ✅  Success - Complete job
*DRYRUN* [ci/test] 🏁  Job succeeded
~~~

مفيد تعرف إن الـ YAML اتقرا والـ jobs اتعرفت، قبل ما تستنى containers.

---

## ٣. [[act workflow_dispatch -j test --input target=prod]]

- [[workflow_dispatch]]: كأنك ضغطت Run workflow في GitHub.
- [[-j test]]: job [[test]] بس.
- [[--input target=prod]]: قيمة الـ input.

والقيم التانية جات من ملفين في نفس الفولدر بيقراهم act لوحده:

~~~text .secrets
API_TOKEN=fake-token-123
~~~

~~~text .vars
APP_ENV=local
~~~

~~~text الناتج
[ci/test]   | env=local target=prod event=workflow_dispatch
[ci/test]   | token is ***
[ci/test] 🏁  Job succeeded
~~~

- [[env=local]] من [[.vars]]، و [[target=prod]] من [[--input]].
- السر اتطبع [[***]]: act بيخبّي قيم الأسرار في اللوج زي GitHub بالظبط.

> [[.secrets]] و [[.vars]] لازم يبقوا في [[.gitignore]].

---

## ٤. [[act pull_request -e event.json]]

[[-e]] بيدّي act ملف JSON بيمثّل الـ event، فـ [[github.event.pull_request.title]] مثلًا بياخد القيمة اللي فيه:

~~~text event.json
{"pull_request": {"number": 7, "title": "fix typo", "head": {"ref": "feature"}, "base": {"ref": "main"}}}
~~~

كده تجرّب أي [[if:]] بيعتمد على الـ PR من غير PR حقيقي. (استخدمناه في درس [[script injection]] عشان نجرّب عنوان PR خبيث.)

---

## ٥. [[-P]] و [[--pull=false]]

~~~bash
act -P ubuntu-latest=node:22-slim --pull=false push
~~~

- [[-P ubuntu-latest=node:22-slim]] (P = platform): أي job فيه [[runs-on: ubuntu-latest]] يشتغل على [[node:22-slim]]. اخترناها لأنها صغيرة وفيها Node (الـ actions المكتوبة JavaScript محتاجاه). الـ images الأكبر زي [[catthehacker/ubuntu:act-latest]] فيها أدوات أكتر.
- [[--pull=false]]: الـ default بتاع [[--pull]] هو [[true]]، يعني act بيعمل [[docker pull]] للـ image مع كل تشغيل حتى لو موجودة عندك، وده بيحدّثها. [[false]] بيستخدم اللي عندك.

وأي run بيطبع خطواته كده:

~~~text الناتج (مختصر)
[ci/report    ] 🚀  Start image=node:22-slim
[ci/report    ]   🐳  docker create image=node:22-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[ci/report    ]   🐳  docker exec cmd=[bash -e /var/run/act/workflow/0] user= workdir=
[ci/report    ]   | got passed-on-22
[ci/report    ] Cleaning up container for job report
~~~

container بأمر مبيخلصش، و [[docker exec]] لكل step، وفي الآخر بيمسح الـ container.

---

## ٦. act مش GitHub

| حاجة | على act |
|---|---|
| الـ steps والـ expressions والـ outputs | ✓ |
| reusable workflows و composite actions محلية | ✓ |
| الأسرار والمتغيرات | من ملفات أو [[-s]] و [[--var]] |
| environments و required reviewers | ✗ |
| OIDC ([[id-token]]) | ✗ |
| macOS و Windows runners | ✗ (لينكس بس) |
| الأدوات المتسطبة على [[ubuntu-latest]] | حسب الـ image اللي اخترتها |

---

## الخلاصة

| عايز | الأمر |
|---|---|
| القايمة | [[act -l]] |
| من غير تشغيل | [[act -n]] |
| job واحد | [[-j name]] |
| event معين | [[act pull_request -e event.json]] |
| input | [[--input key=value]] |
| image بعينها ومتحدّثهاش | [[-P ubuntu-latest=IMAGE --pull=false]] |`,
        lines: [
          R`اعرض الـ jobs والمراحل والـ events.`,
          R`push من غير تشغيل (dry run).`,
          R`شغّل job [[test]] كأنه Run workflow بـ input [[target=prod]].`,
          R`شغّل كأنه PR، بالـ payload اللي في [[event.json]].`,
          R`حدد الـ image ومتعملش pull ليها، وشغّل push.`
        ],
        sol: R`بـ act 0.2.89:
[[env=local target=prod event=workflow_dispatch]]
[[token is ***]]

القيمة [[fake-token-123]] متطبعتش: act بيخبّي الأسرار في اللوج زي GitHub. وخلي [[.secrets]] و [[.vars]] في [[.gitignore]].`
      },
      {
        cmd: "actionlint",
        title: "افحص الـ workflow قبل ما GitHub يرفضه",
        desc: R`[[actionlint]] (من rhysd) بيقرا ملفات [[.github/workflows]] ويمسك الأخطاء اللي YAML lint مش بيشوفها: مفتاح غلط، و label مش موجود، و [[github.xxx]] مش موجود، و [[needs]] لـ job مش موجود، و input غلط لـ action معروفة، وبيشغّل shellcheck على كل [[run]].

اتشغّل actionlint 1.7.12 من الـ image الرسمية [[rhysd/actionlint]] على Docker. لازم يتشغّل جوه Git repo (بيدوّر على [[.git]]).`,
        example: R`# Linux / Mac / Git Bash:
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -color
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -oneline .github/workflows/ci.yml
# Windows (PowerShell):
docker run --rm -v "$($PWD.Path):/repo" -w /repo rhysd/actionlint:latest -oneline`,
        try: "اعمل workflow فيه [[branch:]] بدل [[branches:]] و [[ubuntu-latst]] و [[github.shaa]] و [[needs: tests]] لـ job مش موجود، وشغّل actionlint وعد الأخطاء. بعدين صلّحهم واحد واحد.",
        deep: {
          why: "GitHub مش بيقولك إن [[branch: main]] غلط؛ بيتجاهله والـ workflow يشتغل على كل الـ branches. و [[github.shaa]] بيطلع فاضي من غير خطأ. و [[runs-on: ubuntu-latst]] بيفضل مستني runner مش موجود. actionlint بيمسك ده كله قبل الـ push.",
          how: R`actionlint عارف schema الـ workflows: المفاتيح المسموحة في كل مكان ([[branches]] مش [[branch]])، والـ contexts والـ properties بتاعتها ([[github.sha]] موجودة، [[github.shaa]] لأ)، وأسماء الـ runners الجاهزة، والعلاقات بين الـ jobs ([[needs]]). وعنده قاعدة بيانات بـ inputs الـ actions المشهورة، وبيقرا [[action.yml]] بتاع الـ actions المحلية والـ reusable workflows ويقارن.

وكل [[run:]] بيتبعت لـ shellcheck (أداة بتفحص bash) لو موجود، والـ image الرسمية فيها shellcheck.

الـ flags: [[-color]] ألوان، و [[-oneline]] كل خطأ في سطر (للـ CI)، ومن غير ملف بيفحص كل [[.github/workflows]]. الـ exit code [[0]] لو نضيف، و [[1]] لو فيه أخطاء، فيتحط في pre-commit أو CI.

[[$PWD]] الفولدر الحالي، و [[-v "$PWD:/repo"]] بيركّبه جوه الـ container، و [[-w /repo]] بيبدأ منه. في PowerShell [[$PWD]] object، فـ [[$($PWD.Path)]] بتاخد المسار نص. وفي Git Bash على ويندوز ممكن تحتاج [[MSYS_NO_PATHCONV=1]] قبل الأمر عشان Git Bash ميحوّلش [[/repo]] لمسار ويندوز.`,
          when: "قبل أي push فيه تعديل في workflow، وكـ step في الـ CI نفسه، و pre-commit hook.",
          mistakes: R`تشغّله بره Git repo فيقول [[no project was found]]. وتفتكر إنه بيعرف inputs أي نسخة: في تجربتنا مسك [[node_version]] الغلط مع [[setup-node@v4]] ومسكهوش مع [[@v7]] (لسه مش في قاعدة بياناته). ومش بيمسك [[shell:]] الناقصة في composite actions.`
        },
        teach: R`## الفكرة: «compiler» للـ workflows

YAML lint بيقولك «الملف YAML سليم». actionlint بيقولك «الملف ده workflow سليم»: المفاتيح صح، والأسماء موجودة، والتعبيرات معناها حاجة.

---

## ١. الأمر

~~~bash
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -color
~~~

| الحتة | معناها |
|---|---|
| [[--rm]] | امسح الـ container لما يخلص |
| [[-v "$PWD:/repo"]] | الفولدر الحالي يبان جوه الـ container في [[/repo]] |
| [[-w /repo]] | ابدأ من هناك |
| [[rhysd/actionlint:latest]] | الـ image الرسمية (فيها shellcheck) |
| [[-color]] | ألوان |

لازم تكون في جذر Git repo. من غيره:

~~~text الناتج
no project was found in any parent directories of "/repo". check workflows directory is put correctly in your Git repository
~~~

---

## ٢. ملف فيه ٥ غلطات

~~~text .github/workflows/ci.yml
on:
  push:
    branch: main
jobs:
  test:
    runs-on: ubuntu-latst
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node_version: 24
      - run: echo "sha is $__{{ github.shaa }}"
      - run: |
          for f in $(ls *.js); do echo $f; done
  deploy:
    needs: tests
~~~

الناتج (actionlint 1.7.12، مختصر):

~~~text الناتج
.github/workflows/ci.yml:4:5: unexpected key "branch" for "push" section. expected one of "branches", "branches-ignore", "paths", "paths-ignore", "tags", "tags-ignore", "types", "workflows" [syntax-check]
.github/workflows/ci.yml:7:14: label "ubuntu-latst" is unknown. available labels are "windows-latest", ... "ubuntu-latest", ... [runner-label]
.github/workflows/ci.yml:13:31: property "shaa" is not defined in object type {action: string; ... sha: string; ...} [expression]
.github/workflows/ci.yml:14:9: shellcheck reported issue in this script: SC2045:error:1:10: Iterating over ls output is fragile. Use globs [shellcheck]
.github/workflows/ci.yml:16:3: job "deploy" needs job "tests" which does not exist in this workflow [job-needs]
~~~

### قراية السطر

[[ci.yml:4:5]] = الملف، والسطر 4، والعمود 5. وفي الآخر بين القوسين المربعين اسم القاعدة.

| القاعدة | مسكت إيه | GitHub كان هيعمل إيه |
|---|---|---|
| [[syntax-check]] | [[branch]] بدل [[branches]] | يتجاهله ويشتغل على كل الـ branches |
| [[runner-label]] | [[ubuntu-latst]] | الـ job يفضل مستني runner |
| [[expression]] | [[github.shaa]] | قيمة فاضية من غير خطأ |
| [[shellcheck]] | [[for f in $(ls *.js)]] | يتكسر مع أسماء فيها مسافات |
| [[job-needs]] | [[needs: tests]] | يرفض الملف |

وطلع كمان من shellcheck [[SC2035]] و [[SC2086]] (معلومات): حط [[./]] قبل الـ glob وعلامات تنصيص حوالين [[$f]].

---

## ٣. اللي **مامسكهوش**

[[node_version]] (الصح [[node-version]]) مع [[setup-node@v7]] عدّى. لما غيّرناها لـ [[@v4]]:

~~~text الناتج
.github/workflows/v4.yml:12:11: input "node_version" is not defined in action "actions/setup-node@v4". available inputs are "always-auth", "architecture", "cache", "cache-dependency-path", "check-latest", "mirror", "mirror-token", "node-version", "node-version-file", "registry-url", "scope", "token" [action]
~~~

actionlint بيعرف inputs الـ actions المشهورة من قاعدة بيانات جواه، والنسخة الجديدة لسه مش فيها. الـ actions المحلية والـ reusable workflows بيقرا ملفاتها نفسها، فدول دايمًا بيتفحصوا.

---

## ٤. [[-oneline]] وملف واحد

~~~bash
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -oneline .github/workflows/ci.yml
~~~

[[-oneline]]: كل خطأ سطر واحد من غير الرسمة تحته، مناسب للـ CI. والـ exit code [[1]] لو فيه أخطاء و [[0]] لو نضيف (اتأكدنا من الاتنين).

### على ويندوز

~~~powershell
docker run --rm -v "$($PWD.Path):/repo" -w /repo rhysd/actionlint:latest -oneline
~~~

في PowerShell [[$PWD]] object، و [[$($PWD.Path)]] بتطلّع المسار كنص. وفي Git Bash على ويندوز حط [[MSYS_NO_PATHCONV=1]] قبل [[docker]] عشان ميحوّلش [[/repo]].

---

## الخلاصة

- actionlint بيفحص المعنى مش الشكل: مفاتيح، و labels، و contexts، و needs، و inputs، و shellcheck.
- لازم Git repo.
- مش بيعرف كل نسخ الـ actions، ومش بيمسك كل حاجة (زي [[shell]] الناقصة في composite).`,
        lines: [
          R`فحص كل الـ workflows بألوان، من Docker.`,
          R`فحص ملف واحد، كل خطأ في سطر.`,
          R`نفس الفحص من PowerShell.`
        ],
        sol: R`actionlint 1.7.12 طلّع ٥ أخطاء أساسية: [[syntax-check]] (branch)، و [[runner-label]] (ubuntu-latst)، و [[expression]] (github.shaa)، و [[job-needs]] (tests)، و [[shellcheck]] على الـ for loop (SC2045 خطأ، و SC2035 و SC2086 معلومات).

التصليح: [[branches: [main] ]]، و [[ubuntu-latest]]، و [[github.sha]]، و [[needs: test]]، و [[for f in ./*.js; do echo "$f"; done]]. بعدها الأمر بيرجع من غير ناتج و exit code [[0]].`
      },
      {
        cmd: "script injection",
        title: "عنوان PR بيشغّل كود: و pull_request_target",
        desc: R`لما تكتب [[$__{{ github.event.pull_request.title }}]] جوه [[run:]]، GitHub بيحط النص مكانه **قبل** ما bash يشوف السكربت، فعنوان PR فيه [["; أمر; echo "]] بيتنفّذ كأمر. الحل: حط القيمة في [[env:]] واقراها كمتغير [[$TITLE]].

ده بيبقى كارثة مع [[pull_request_target]]: بيشتغل بأسرار الـ repo وتوكن ليه كتابة حتى لو الـ PR من fork. المثال اتشغّل بـ act 0.2.89 بعنوان PR خبيث من ملف event.`,
        example: R`on: pull_request
permissions:
  contents: read
jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - name: unsafe
        run: echo "PR title = $__{{ github.event.pull_request.title }}"
      - name: safe
        env:
          TITLE: $__{{ github.event.pull_request.title }}
        run: echo "PR title = $TITLE"`,
        try: "اعمل event.json بعنوان [[fix typo\"; echo \"INJECTED as uid=$(id -u)\"; echo \"]] وشغّل [[act pull_request -e event.json]]. شوف الـ step الأولى نفّذت إيه، والتانية طبعت إيه.",
        flag: "script",
        deep: {
          why: "أي حد على GitHub يقدر يفتح PR على repo عام، ويكتب العنوان أو الوصف أو اسم الـ branch اللي هو عايزه. لو الـ workflow بيحط النص ده جوه سكربت، يبقى أي حد بيشغّل كود على الـ runner بتاعك، ومعاه أي سر أو توكن في الـ job.",
          how: R`[[$__{{ }}]] مش متغير bash. GitHub بيستبدله نص **قبل** ما الـ step تشتغل، والنص الناتج هو اللي bash بيقراه. فعنوان [[fix typo"; echo "INJECTED"; echo "]] بيحوّل السطر لـ ٣ أوامر.

مع [[env:]] القيمة بتتحط في متغير بيئة، و bash بيقرا [[$TITLE]] كقيمة، عمره ما بيفسّرها ككود (طالما حطيتها بين [[" "]]).

القيم الخطرة: أي حاجة الـ PR author بيتحكم فيها: [[title]] و [[body]] و [[head.ref]] (اسم الـ branch) و [[github.head_ref]] ورسايل الـ commits والـ issue comments.

[[pull_request]] من fork: الـ docs بتقول مفيش أسرار (غير GITHUB_TOKEN) والتوكن read-only. فالـ injection هنا بيشغّل كود بس من غير حاجة يسرقها.

[[pull_request_target]]: بيشتغل في context الـ default branch بتاع الـ repo الأصلي، بأسراره وبتوكن ليه كتابة، حتى لو الـ PR من fork. اتعمل عشان حاجات زي إضافة labels أو تعليق. الخطر لو عملت [[checkout]] لكود الـ PR ([[ref: $__{{ github.event.pull_request.head.sha }}]]) وشغّلته ([[npm install]] بيشغّل scripts!): الكود الغريب بيشتغل ومعاه الأسرار. الـ docs: «Avoid using this event if you need to build or run code from the pull request».`,
          when: "كل مرة تكتب [[$__{{ github.event...}}]] جوه [[run:]] اسأل: مين بيتحكم في القيمة دي؟ لو مش انت، حطها في env. و pull_request_target بس لحاجات مش بتشغّل كود الـ PR.",
          mistakes: R`[[pull_request_target]] مع checkout للـ head وتشغيل [[npm ci]] أو [[npm test]]. وتحط القيمة في env وبعدين تكتب [[$TITLE]] من غير [[" "]]. وتفتكر إن [[actions/github-script]] آمن: [[$__{{ }}]] جوه [[script:]] نفس المشكلة في JavaScript.`
        },
        teach: R`## الفكرة: [[$__{{ }}]] بيتحط في السكربت قبل ما bash يشوفه

ده أهم سطر في الدرس. لما تكتب:

~~~text
run: echo "PR title = $__{{ github.event.pull_request.title }}"
~~~

GitHub **مش** بيدّي bash متغير. بياخد العنوان، ويلزقه مكان [[$__{{ ... }}]] كنص، وبعدين يدّي bash الملف الناتج. فالسؤال: لو العنوان فيه كود؟

---

## ١. العنوان الخبيث

~~~text event.json
{"pull_request": {"number": 7, "title": "fix typo\"; echo \"INJECTED as uid=$(id -u)\"; echo \"", "head": {"ref": "evil"}, "base": {"ref": "main"}}}
~~~

العنوان الحقيقي (بعد ما JSON يشيل الـ [[\]]):

~~~text
fix typo"; echo "INJECTED as uid=$(id -u)"; echo "
~~~

لما يتلزق في السطر، bash بيشوف:

~~~bash
echo "PR title = fix typo"; echo "INJECTED as uid=$(id -u)"; echo ""
~~~

- [["]] الأولى في العنوان قفلت النص بتاع [[echo]].
- [[;]] خلّصت الأمر وبدأت أمر جديد.
- [[$(id -u)]] أمر بيطبع رقم اليوزر، يعني أي أمر: [[curl]] يبعت الأسرار لسيرفر برة مثلًا.
- [[echo "]] في الآخر بيقفل علامة التنصيص اللي فاضلة عشان السطر ميطلعش خطأ.

---

## ٢. التشغيل

~~~bash
act pull_request -e event.json
~~~

~~~text الناتج
[pr/greet]   🐳  docker exec cmd=[bash -e /var/run/act/workflow/0] user= workdir=
[pr/greet]   | PR title = fix typo
[pr/greet]   | INJECTED as uid=0
[pr/greet]   |
[pr/greet]   ✅  Success - Main unsafe [147.2246ms]
[pr/greet]   🐳  docker exec cmd=[bash -e /var/run/act/workflow/1] user= workdir=
[pr/greet]   | PR title = fix typo"; echo "INJECTED as uid=$(id -u)"; echo "
[pr/greet]   ✅  Success - Main safe [139.2275ms]
~~~

- **unsafe**: [[INJECTED as uid=0]]: الكود اتنفّذ، وكـ root (uid 0) جوه الـ container.
- **safe**: العنوان اتطبع زي ما هو، حرف حرف. ولا حاجة اتنفّذت.

---

## ٣. ليه [[env:]] بيحل المشكلة

~~~text
      - name: safe
        env:
          TITLE: $__{{ github.event.pull_request.title }}
        run: echo "PR title = $TITLE"
~~~

- [[$__{{ }}]] لسه موجود، بس في [[env:]] مش في السكربت. GitHub بيحط العنوان في **متغير بيئة** اسمه [[TITLE]].
- السكربت نفسه ثابت: [[echo "PR title = $TITLE"]]. bash بيقرا قيمة المتغير كبيانات، عمره ما بيفسّرها ككود.
- [[" "]] حوالين [[$TITLE]] مهمة: من غيرها المسافات والـ [[*]] في العنوان بتتفسّر.

---

## ٤. [[pull_request]] ولا [[pull_request_target]]؟

| | [[pull_request]] من fork | [[pull_request_target]] |
|---|---|---|
| الكود اللي بيشتغل | كود الـ PR (merge commit) | الـ workflow من الـ default branch |
| الأسرار | لأ (غير GITHUB_TOKEN) | آه |
| GITHUB_TOKEN | read-only | فيه كتابة |
| injection فيه | كود بيشتغل من غير أسرار | كود بيشتغل **مع** الأسرار |

(الجدول من docs الـ events وصفحة الأمان، مش متجرّب على GitHub.)

[[pull_request_target]] اتعمل لحاجات زي «حط label» أو «علّق على الـ PR» من غير ما تشغّل كود الـ PR. المصيبة لما حد يكتب:

~~~text
on: pull_request_target
...
      - uses: actions/checkout@v7
        with:
          ref: $__{{ github.event.pull_request.head.sha }}
      - run: npm ci && npm test
~~~

ده بيجيب كود الـ fork ويشغّله ([[npm ci]] بيشغّل [[postinstall]] scripts) والأسرار متاحة. والـ docs بتقول صريح: «Avoid using this event if you need to build or run code from the pull request».

---

## ٥. الأداة بتمسكها

actionlint 1.7.12 على نفس الملف:

~~~text الناتج
.github/workflows/pr.yml:10:35: "github.event.pull_request.title" is potentially untrusted. avoid using it directly in inline scripts. instead, pass it through an environment variable. see https://docs.github.com/en/actions/reference/security/secure-use#good-practices-for-mitigating-script-injection-attacks for more details [expression]
~~~

مسك [[unsafe]] بس، وسكت عن [[safe]].

---

## الخلاصة

| اكتب كده | مش كده |
|---|---|
| [[env: TITLE: $__{{ ... }}]] + [[run: echo "$TITLE"]] | [[run: echo "$__{{ github.event...title }}"]] |
| [[pull_request]] للاختبارات | [[pull_request_target]] + checkout للـ head |

> أي قيمة صاحب الـ PR بيكتبها (title و body و اسم الـ branch و commit message و comment) = input خطر.`,
        lines: [
          R`على PR.`,
          R`صلاحيات التوكن.`,
          R`قراية بس.`,
          R`الـ jobs.`,
          R`job اسمه [[greet]].`,
          R`على أوبونتو.`,
          R`الخطوات.`,
          R`الـ step الغلط.`,
          R`العنوان بيتلزق جوه السكربت: كود في العنوان بيتنفّذ.`,
          R`الـ step الصح.`,
          R`متغيرات بيئة.`,
          R`العنوان في متغير [[TITLE]].`,
          R`bash بيقرا المتغير كبيانات بين [[" "]].`
        ],
        sol: R`بـ act 0.2.89 والعنوان الخبيث:
الـ step [[unsafe]] طبعت [[PR title = fix typo]] وبعدها [[INJECTED as uid=0]]: الأمر [[id -u]] اتنفّذ.
الـ step [[safe]] طبعت العنوان كامل زي ما هو: [[PR title = fix typo"; echo "INJECTED as uid=$(id -u)"; echo "]].

و actionlint 1.7.12 علّم على السطر بتاع unsafe: [[is potentially untrusted. avoid using it directly in inline scripts]].`
      },
      {
        cmd: "zizmor",
        title: "فحص أمان للـ workflows",
        desc: R`[[zizmor]] أداة static analysis بتدوّر على مشاكل الأمان في GitHub Actions: triggers خطر زي [[pull_request_target]]، و template injection، و actions مش متثبتة بـ SHA، و صلاحيات مفتوحة، و [[checkout]] بيسيب التوكن على الديسك. بتطلّع كل مشكلة بدرجة خطورة ورابط للشرح.

اتشغّل zizmor 1.31.1 (اتسطّب بـ [[pip install zizmor]] جوه container [[python:3.13-slim]]) بـ [[--offline]] على workflow فيه الغلطات دي، وبعدين على النسخة المصلّحة.`,
        example: R`pip install zizmor
zizmor --offline .github/workflows/
zizmor --offline --min-severity medium .github/workflows/pr-check.yml
zizmor --offline --format sarif . > zizmor.sarif
zizmor --offline --fix=all .github/workflows/`,
        try: "شغّل zizmor على workflows أي repo عندك (أو على مثال درس script injection). صلّح الأخطاء ذات [[error]] الأول، وبعدين [[warning]].",
        deep: {
          why: "الـ permissions و الـ pin و الـ injection كلهم اتشرحوا، بس محدش بيفتكرهم كلهم في كل ملف. zizmor بيمر على كل workflows الـ repo في ثانية ويقولك فين بالظبط، فيتحط في الـ CI ويمنع أي PR يرجّع غلطة قديمة.",
          how: R`zizmor بيقرا الـ YAML ويطبّق «audits»، كل واحد بيدوّر على نوع مشكلة. أهمهم:

[[dangerous-triggers]]: [[pull_request_target]] و [[workflow_run]]. [[template-injection]]: [[$__{{ }}]] بقيمة ممكن حد غريب يتحكم فيها جوه [[run]] أو [[script]]. [[unpinned-uses]]: action بـ tag مش SHA. [[excessive-permissions]]: مفيش [[permissions:]] فالـ job بياخد الافتراضي. [[artipacked]]: [[actions/checkout]] من غير [[persist-credentials: false]] بيسيب التوكن في [[.git/config]]، ولو الفولدر اترفع artifact التوكن يتسرّب.

[[--offline]] من غير ما يكلّم GitHub API (بعض الـ audits محتاجة token فبتتقفل). [[--min-severity]] يفلتر. [[--format sarif]] ملف يترفع لتاب Security في GitHub. [[--persona]]: [[regular]] الافتراضي (أقل false positives)، و [[pedantic]] و [[auditor]] أكتر. [[--fix]] (تجريبي): [[safe]] الافتراضي بيطبّق الـ fixes الآمنة بس، و [[all]] بيطبّق كله؛ في تجربتنا الـ fixes الاتنين كانوا «unsafe» فـ [[safe]] معملش حاجة و [[all]] صلّح الاتنين.

الـ exit code مش صفر لو فيه findings (طلع [[14]] في تجربتنا)، فبيفشّل الـ CI. والتسطيب: [[pip install zizmor]] أو [[uvx zizmor]] أو [[brew install zizmor]] أو image [[ghcr.io/zizmorcore/zizmor]] (من الـ docs).`,
          when: "مرة على كل repo عندك دلوقتي، وبعدين step في الـ CI أو pre-commit. ومع actionlint مش بداله: actionlint للصحة، و zizmor للأمان.",
          mistakes: R`تشغّل [[--fix]] على الكل من غير ما تراجع الـ diff. وتعمل ignore للتحذيرات كلها عشان الـ CI يعدّي. وتفتكر إن [[No findings]] معناها آمن ١٠٠٪ (بيدوّر على أنماط معروفة بس).`
        },
        teach: R`## الفكرة: actionlint بيسأل «صح؟»، و zizmor بيسأل «آمن؟»

اتشغّل zizmor 1.31.1 جوه container [[python:3.13-slim]] بعد [[pip install zizmor==1.31.1]]، على ملف فيه ٤ غلطات مشهورة:

~~~text .github/workflows/pr-check.yml
name: pr-check
on: pull_request_target
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          ref: $__{{ github.event.pull_request.head.sha }}
      - run: npm ci && npm test
        env:
          NPM_TOKEN: $__{{ secrets.NPM_TOKEN }}
      - run: echo "$__{{ github.event.pull_request.title }}"
~~~

---

## ١. الأمر

~~~bash
zizmor --offline .github/workflows/pr-check.yml
~~~

- [[--offline]]: متكلّمش GitHub API. بعض الـ audits (زي التأكد إن الـ SHA بيقابل tag) محتاجة نت و token، فبتتقفل.
- من غير ملف (أو بفولدر) بيفحص كل الـ workflows.

---

## ٢. الناتج، finding ورا finding

### [[dangerous-triggers]]

~~~text الناتج
error[dangerous-triggers]: use of fundamentally insecure workflow trigger
 --> .github/workflows/pr-check.yml:2:1
  |
2 | on: pull_request_target
  | ^^^^^^^^^^^^^^^^^^^^^^^ pull_request_target is almost always used insecurely
~~~

[[error]] الدرجة، وبين القوسين المربعين اسم الـ audit، و [[2:1]] السطر والعمود. ([[pull_request_target]] اتشرح في درس [[script injection]].)

### [[template-injection]]

~~~text الناتج
error[template-injection]: code injection via template expansion
  --> .github/workflows/pr-check.yml:13:24
   |
13 |       - run: echo "$__{{ github.event.pull_request.title }}"
   |         ---            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ may expand into attacker-controllable code
   = note: audit confidence → High
   = note: this finding has an auto-fix
~~~

[[audit confidence → High]] يعني متأكد إنها مشكلة. و [[auto-fix]] يعني [[--fix]] يقدر يصلّحها (بينقلها لـ env).

### [[unpinned-uses]]

~~~text الناتج
error[unpinned-uses]: unpinned action reference
 --> .github/workflows/pr-check.yml:7:15
  |
7 |       - uses: actions/checkout@v7
  |               ^^^^^^^^^^^^^^^^^^^ action is not pinned to a hash (required by blanket policy)
~~~

[[v7]] tag ممكن يتحرّك. الحل SHA (درس [[الأمان]]).

### [[excessive-permissions]]

~~~text الناتج
warning[excessive-permissions]: overly broad permissions
  ... default permissions used due to no permissions: block
~~~

مفيش [[permissions:]] فالتوكن بياخد صلاحيات الـ repo الافتراضية.

### [[artipacked]]

~~~text الناتج
help[artipacked]: credential persistence through GitHub Actions artifacts
 --> .github/workflows/pr-check.yml:7:9
  ... does not set persist-credentials: false
  = note: audit confidence → Low
~~~

[[actions/checkout]] بيحفظ التوكن في [[.git/config]] عشان [[git push]] يشتغل بعدين. لو مش محتاجه، [[persist-credentials: false]].

### السطر الأخير

~~~text الناتج
9 findings (4 suppressed, 2 unsafe fixes): 0 informational, 1 low, 1 medium, 3 high
~~~

[[4 suppressed]]: ٤ اتخبّوا لأن الـ persona الافتراضية [[regular]] بتخبّي الأقل ثقة. [[--persona=auditor]] بيوريهم. والـ exit code كان [[14]] (مش صفر)، فالـ CI يفشل.

---

## ٣. النسخة المصلّحة

~~~text .github/workflows/pr-check.yml
name: pr-check
on: pull_request
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      - run: npm ci && npm test
      - env:
          TITLE: $__{{ github.event.pull_request.title }}
        run: echo "$TITLE"
~~~

| المشكلة | التصليح |
|---|---|
| [[pull_request_target]] | [[pull_request]] (والأسرار شلناها: الاختبار مش محتاجها) |
| [[unpinned-uses]] | SHA بتاع [[v7.0.1]] (اتجاب بـ [[git ls-remote]]) والنسخة كتعليق |
| [[artipacked]] | [[persist-credentials: false]] |
| [[excessive-permissions]] | [[permissions: contents: read]] |
| [[template-injection]] | العنوان في [[env]] |

~~~text الناتج
No findings to report. Good job! (2 suppressed)
~~~

---

## ٤. باقي الأوامر

| الأمر | بيعمل إيه |
|---|---|
| [[--min-severity medium]] | اعرض medium وأعلى بس |
| [[--format sarif . > zizmor.sarif]] | ملف SARIF يترفع بـ [[github/codeql-action/upload-sarif]] ويظهر في تاب Security |
| [[--fix=all]] | صلّح لوحده كل اللي ليه fix (تجريبي، راجع الـ diff) |

---

## ٥. [[--fix]]: التصليح الأوتوماتيك (تجريبي)

على الملف الغلط، [[--fix=safe]] (الافتراضي) قال:

~~~text الناتج
No fixes available to apply (2 held back by safe mode). Use --fix=unsafe-only or --fix=all to apply unsafe fixes.
~~~

والـ [[--fix=all]]:

~~~text الناتج
Successfully applied fixes to 1 files:
  .github/workflows/pr-check.yml: 2 fixes
~~~

والتعديلين في الملف:

~~~text
      - uses: actions/checkout@v7
        with:
          ref: $__{{ github.event.pull_request.head.sha }}
          persist-credentials: false
...
      - run: echo "$__{GITHUB_EVENT_PULL_REQUEST_TITLE}"
        env:
          GITHUB_EVENT_PULL_REQUEST_TITLE: $__{{ github.event.pull_request.title }}
~~~

- [[persist-credentials: false]] اتزوّدت، والعنوان اتنقل لـ env بنفس طريقة درس [[script injection]].
- بس [[pull_request_target]] والـ pin والـ permissions فضلوا زي ما هم: دول قرار انت اللي تاخده. عشان كده راجع الـ diff ومتعتمدش على [[--fix]] لوحده.

---

## الخلاصة

- [[error]] الأول: [[dangerous-triggers]] و [[template-injection]] و [[unpinned-uses]].
- zizmor مع actionlint، مش بداله.
- [[No findings]] مش ضمان، بس معناها إن الغلطات المعروفة مش موجودة.`,
        lines: [
          R`سطّب zizmor (أو [[uvx zizmor]]).`,
          R`افحص كل الـ workflows من غير GitHub API.`,
          R`ملف واحد، و medium وأعلى بس.`,
          R`الناتج كملف SARIF لتاب Security.`,
          R`صلّح لوحده كل اللي ليه fix (تجريبي، راجع الـ diff).`
        ],
        sol: R`على الملف الغلط zizmor 1.31.1 طلّع: [[dangerous-triggers]] و [[template-injection]] و [[unpinned-uses]] (error)، و [[excessive-permissions]] (warning)، و [[artipacked]] (help)، والسطر الأخير [[9 findings (4 suppressed, 2 unsafe fixes): 0 informational, 1 low, 1 medium, 3 high]] و exit code [[14]].

بعد التصليح (pull_request، و permissions، و SHA، و persist-credentials: false، و env): [[No findings to report. Good job! (2 suppressed)]] و exit code [[0]].`
      },
      {
        cmd: "OIDC",
        title: "deploy للـ cloud من غير مفاتيح في Secrets",
        desc: R`بدل ما تحط access key للـ cloud في GitHub Secrets، الـ job بيطلب من GitHub توكن موقّع (JWT) فيه «أنا repo كذا، branch كذا أو environment كذا»، والـ cloud (AWS أو Azure أو GCP) بيتأكد منه ويدّي صلاحيات مؤقتة. المطلوب في الـ workflow سطر [[id-token: write]] في [[permissions]].

ده كله من الـ docs: التوكن الحقيقي مش بيطلع غير على GitHub، و act مش بيدعمه. التجربة العملية على محاكي AWS في درس [[GitHub OIDC]] في تاب Cloud و DevOps.`,
        example: R`permissions:
  id-token: write
  contents: read
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v7
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/gha-deploy
          aws-region: eu-central-1
      - run: aws sts get-caller-identity`,
        try: "اقرا الـ claims في الـ docs (صفحة OIDC reference)، واكتب قيمة [[sub]] اللي هتطلع للـ job ده لو الـ repo اسمه [[my-org/shop]]. وبعدين اكتبها لو شلنا [[environment: production]] والـ job اشتغل على main.",
        flag: "script",
        deep: {
          why: "access key دايم في Secrets: أي action خبيثة أو أي حد بيعمل workflow في الـ repo يقدر يطلّعه، وبيفضل شغال لحد ما حد يفتكر يغيّره. مع OIDC مفيش سر متخزن خالص، والصلاحيات مؤقتة ومربوطة بـ repo و branch أو environment بعينه.",
          how: R`[[id-token: write]] بتسمح للـ job يطلب توكن من GitHub (الـ docs: «Without id-token: write, the OIDC JWT ID token cannot be requested»). الـ runner بيحط متغيرين [[ACTIONS_ID_TOKEN_REQUEST_URL]] و [[ACTIONS_ID_TOKEN_REQUEST_TOKEN]] والـ action بتستخدمهم. و [[contents: read]] لازم معاها لـ checkout، لأنك لما تكتب [[permissions]] أي حاجة مش مكتوبة بتبقى [[none]].

التوكن فيه [[iss]] = [[https://token.actions.githubusercontent.com]]، و [[aud]] (لمين)، و [[sub]] (مين). أشكال [[sub]] من الـ docs: [[repo:ORG/REPO:environment:NAME]] لو الـ job عليه environment، و [[repo:ORG/REPO:ref:refs/heads/BRANCH]] لـ branch، و [[repo:ORG/REPO:ref:refs/tags/TAG]] لـ tag، و [[repo:ORG/REPO:pull_request]] لـ PR. وصالح للـ job ده بس.

الـ cloud عنده «trust» بيقارن [[sub]] و [[aud]]: AWS بـ IAM role و trust policy، و Azure بـ federated credential على app registration، و GCP بـ Workload Identity Federation. والـ actions: [[aws-actions/configure-aws-credentials]] و [[azure/login]] و [[google-github-actions/auth]].

ربطه بـ [[environment: production]] قوي: الـ [[sub]] بقى [[environment:production]]، فالـ trust بيقبل بس jobs عدّت قواعد الـ environment (موافقة و branches) اللي في درس [[environments و approval]].`,
          when: "أي deploy أو push لـ registry في cloud بيدعم OIDC (AWS و Azure و GCP و HashiCorp Vault وغيرهم). ولو لسه عندك access keys في Secrets، ده أول حاجة تتنقل.",
          mistakes: R`تنسى [[id-token: write]] فالـ action تفشل إنها تجيب توكن. وتكتب [[permissions: id-token: write]] لوحدها فـ checkout يفشل (contents بقت none). و trust بشرط [[sub]] واسع ([[repo:my-org/*]]) فأي repo في الـ org يلبس role الإنتاج. وتنسى إن الـ job لما يبقى عليه environment الـ [[sub]] بيتغير من [[ref:...]] لـ [[environment:...]] فالـ trust القديم يرفض.`
        },
        teach: R`## الفكرة: بطاقة هوية مؤقتة بدل مفتاح دايم

> الدرس ده كله من الـ docs (صفحات OIDC concepts و reference في GitHub). التوكن الحقيقي مش بيطلع غير على runner بتاع GitHub، و act مش بيدعمه. والـ trust policy من ناحية AWS اتجرّبت على LocalStack في درس [[GitHub OIDC]] في تاب Cloud و DevOps، فهنا هنركّز على ناحية الـ workflow.

بدل ما تدّي الـ CI مفتاح AWS يفضل شغال سنين، الـ CI بيقول لـ AWS «أنا job من repo كذا، والدليل توكن موقّع من GitHub»، و AWS يدّيه مفاتيح لساعة.

---

## ١. [[permissions]]

~~~text
permissions:
  id-token: write
  contents: read
~~~

- [[id-token: write]]: اسمها مضلل شوية، معناها «مسموح للـ job يطلب ID token». من غيرها الـ docs بتقول التوكن مش ممكن يتطلب.
- [[contents: read]]: أول ما تكتب [[permissions:]]، أي صلاحية مش مكتوبة بتبقى [[none]]، و checkout محتاج يقرا الكود.

---

## ٢. [[environment: production]]

~~~text
  deploy:
    environment: production
~~~

ده بيعمل حاجتين: قواعد الـ environment (موافقة، و branches مسموحة) بتتطبق قبل الـ job (درس [[environments و approval]])، وقيمة [[sub]] في التوكن بتتغير. وده الجزء المهم.

---

## ٣. التوكن: [[sub]] هو كل حاجة

الـ JWT ٣ أجزاء بينهم نقط، والجزء الأوسط JSON. أهم الخانات (أسماء وأمثلة من الـ docs):

~~~text
{
  "iss": "https://token.actions.githubusercontent.com",
  "aud": "sts.amazonaws.com",
  "sub": "repo:octo-org/octo-repo:environment:Production",
  ...
}
~~~

| الخانة | معناها |
|---|---|
| [[iss]] | مين أصدر التوكن: GitHub |
| [[aud]] | معمول لمين: هنا AWS STS |
| [[sub]] | مين صاحبه، وده اللي الـ trust بيقارنه |

شكل [[sub]] بيتغير حسب الـ job:

| الـ job | [[sub]] |
|---|---|
| عليه [[environment]] | [[repo:ORG/REPO:environment:NAME]] |
| push على branch | [[repo:ORG/REPO:ref:refs/heads/BRANCH]] |
| tag | [[repo:ORG/REPO:ref:refs/tags/TAG]] |
| PR | [[repo:ORG/REPO:pull_request]] |

فـ trust policy بتقول [[sub = repo:my-org/shop:environment:production]] معناها: job في repo [[my-org/shop]] **وعدّى** قواعد environment الإنتاج. أي branch تاني أو PR أو repo تاني: رفض.

---

## ٤. الـ action

~~~text
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/gha-deploy
          aws-region: eu-central-1
      - run: aws sts get-caller-identity
~~~

- الـ action بتطلب التوكن من GitHub (بالمتغيرين [[ACTIONS_ID_TOKEN_REQUEST_URL]] و [[ACTIONS_ID_TOKEN_REQUEST_TOKEN]] اللي الـ runner بيحطهم)، وتبعته لـ AWS STS عشان تلبس الـ role.
- [[role-to-assume]]: الـ ARN (اسم الـ role الكامل في AWS). [[123456789012]] رقم حساب مثال من الـ docs.
- لو وافق، الـ action بتحط مفاتيح مؤقتة في متغيرات البيئة، فـ [[aws sts get-caller-identity]] بيطبع الـ role اللي لبستها.

---

## ٥. نفس الفكرة على باقي الـ clouds

| الـ cloud | الإعداد هناك | الـ action |
|---|---|---|
| AWS | OIDC provider + IAM role بـ trust policy | [[aws-actions/configure-aws-credentials]] |
| Azure | federated credential على App registration | [[azure/login]] |
| GCP | Workload Identity Pool + Provider | [[google-github-actions/auth]] |

(من docs كل واحد.)

---

## الخلاصة

1. [[id-token: write]] + [[contents: read]].
2. الـ cloud بيثق في توكن GitHub بشرط على [[sub]] و [[aud]].
3. [[environment]] على الـ job بيخلي [[sub]] = [[environment:NAME]]، فالموافقة بقت جزء من الأمان.

> مفيش ولا سر متخزن في GitHub. لو الـ workflow اتسرّب أو action اتخترقت، أقصى حاجة مفاتيح لساعة، ومن الـ repo ده بس.`,
        lines: [
          R`صلاحيات التوكن.`,
          R`اسمح للـ job يطلب OIDC token.`,
          R`قراية الكود (لازم لـ checkout).`,
          R`الـ jobs.`,
          R`job الـ deploy.`,
          R`على أوبونتو.`,
          R`environment الإنتاج: موافقة، و [[sub]] بقى [[environment:production]].`,
          R`الخطوات.`,
          R`هات الكود.`,
          R`اطلب مفاتيح AWS مؤقتة بالتوكن.`,
          R`الإعدادات.`,
          R`الـ role اللي هتلبسها (رقم حساب مثال).`,
          R`الـ region.`,
          R`اطبع الهوية: المفروض الـ role دي.`
        ],
        sol: R`حسب أشكال [[sub]] في docs الـ OIDC reference:
- مع [[environment: production]]: [[repo:my-org/shop:environment:production]]
- من غير environment، على main: [[repo:my-org/shop:ref:refs/heads/main]]

عشان كده لو ضفت environment على job شغال، لازم تعدّل الـ trust في الـ cloud، وإلا هيرفض. ده من الـ docs؛ الجزء العملي (الـ trust policy و AssumeRoleWithWebIdentity) اتجرّب على LocalStack في درس [[GitHub OIDC]] في تاب Cloud و DevOps.`
      }
    ]
  }
]);
