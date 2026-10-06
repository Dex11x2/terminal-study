// تكملة تاب gha: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/gha/01.js (شرح حقول الدرس في أوله)
MORE("gha", [
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
          teach: R`## الفكرة: الملف مكشوف، فالسر بيتحط في مكان تاني

ملف الـ workflow في Git، وأي حد يقدر يقرا الـ repo بيقراه. فالباسوردات بتتحط في إعدادات الـ repo (Settings ثم Secrets and variables ثم Actions)، والملف بيكتب **اسم** السر بس، و GitHub بيحط القيمة وقت التشغيل. المثال بيوريك ٣ مستويات للمتغيرات، و ٣ طرق تستخدم بيها سر.

---

## ١. [[env:]] على ٣ مستويات

~~~text
env:
  NODE_ENV: test
jobs:
  test:
    env:
      DATABASE_URL: $__{{ secrets.TEST_DATABASE_URL }}
    steps:
      - run: npm test
        env:
          JWT_SECRET: $__{{ secrets.JWT_SECRET }}
~~~

[[env:]] بيعمل **متغيرات بيئة** (environment variables): أسامي ليها قيم، أي برنامج شغال يقدر يقراها ([[process.env.NODE_ENV]] في Node، و [[$NODE_ENV]] في bash).

| مكان [[env:]] | بيوصل لمين |
|---|---|
| أول الملف | كل الـ jobs وكل الـ steps |
| جوه job | كل steps الـ job ده |
| جوه step | الـ step دي بس |

ولو نفس الاسم في مستويين، الأضيق بيكسب. والقاعدة: السر يتحط في أضيق مكان محتاجه. [[JWT_SECRET]] محتاجه [[npm test]] بس، فهو على الـ step.

---

## ٢. [[$__{{ secrets.NAME }}]]

- [[$__{{ }}]] expression: GitHub بيحسبه قبل التشغيل.
- [[secrets]] كل الأسرار اللي في إعدادات الـ repo، و [[.TEST_DATABASE_URL]] اسم واحد منهم.
- لو السر مش موجود، القيمة بتبقى **نص فاضي**، مش error.

---

## ٣. نطبع URL من غير الباسورد

~~~text
- run: echo "$DATABASE_URL" | sed 's/:[^:@]*@/:***@/'
~~~

[[sed 's/قديم/جديد/']] بيبدّل نص بنص. والنمط [[:[^:@]*@]] يعني: نقطتين، وبعدها أي حروف مش [[:]] ولا [[@]] ([[[^:@]*]])، وبعدها [[@]]. ده بالظبط مكان الباسورد في URL شكله [[user:password@host]].

اتشغّل هنا بـ [[act]] وسر قيمته [[postgres://app:S3cretPw@db.example.com:5432/app_test]]:

~~~text الناتج
| postgres://app:***@db.example.com:5432/app_test
~~~

كده تقدر تتأكد إن الـ host والقاعدة صح من غير ما الباسورد يظهر في اللوج.

---

## ٤. [[GITHUB_TOKEN]]: سر موجود لوحده

~~~text
- run: gh api repos/$__{{ github.repository }}/issues --jq '.[0].title'
  env:
    GH_TOKEN: $__{{ secrets.GITHUB_TOKEN }}
~~~

- [[secrets.GITHUB_TOKEN]]: GitHub بيعمل توكن جديد لكل run، صلاحياته على الـ repo ده بس، وبيموت لما الـ job يخلص. مش محتاج تضيفه.
- [[GH_TOKEN]]: اسم المتغير اللي برنامج [[gh]] بيدوّر فيه على التوكن (و [[gh]] متسطّب جاهز على runners بتاعة GitHub).
- [[github.repository]] اسم الـ repo بالشكل [[user/repo]].
- [[gh api repos/user/repo/issues]] بيطلب لستة الـ issues من GitHub API، و [[--jq '.[0].title']] خد عنوان أول واحدة.

الـ step دي محتاجة GitHub نفسه، فمكتوبة من الـ docs.

---

## ٥. الحل: إزاي تتأكد إن السر وصل

~~~text
- run: |
    echo "value: $TEST_VALUE"
    echo "length: $__{#TEST_VALUE}"
  env:
    TEST_VALUE: $__{{ secrets.TEST_VALUE }}
~~~

[[$__{#TEST_VALUE}]] في bash معناها «طول المتغير» (عدد الحروف). اتشغّل بـ [[act]] مرتين، مرة بسر قيمته [[hello world]] ومرة من غير سر، وزوّدنا سطر بيطبعه بعد [[base64]]:

~~~text الناتج: السر موجود
| value: ***
| length: 11
| aGVsbG8gd29ybGQK
~~~

~~~text الناتج: السر مش موجود
| value: 
| length: 0
| Cg==
~~~

- [[***]]: أي مكان القيمة ظهرت فيه **بالظبط** بيتبدّل.
- [[11]]: عدد حروف [[hello world]] (المسافة حرف). كده عرفت إنه وصل من غير ما تشوفه.
- السطر التالت: نفس السر بعد [[base64]] **مستخبّاش**، لأنه بقى نص تاني. يعني الإخفاء بيحميك من الغلط، مش من حد قاصد يسرّب. و [[Cg==]] هي base64 لسطر فاضي.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| قيمة عادية | [[env: NAME: value]] |
| سر من الإعدادات | [[$__{{ secrets.NAME }}]] |
| قيمة مش سرية من الإعدادات | [[$__{{ vars.NAME }}]] |
| توكن الـ repo الجاهز | [[$__{{ secrets.GITHUB_TOKEN }}]] |
| اتأكد إنه وصل | [[$__{#NAME}]] مش [[echo $NAME]] |`,
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
          teach: R`## الفكرة: ملف ← نص ← secret ← نص ← نفس الملف

الـ secret في GitHub بيقبل نص بس. فبنحوّل الملف (حتى لو binary زي مفتاح توقيع) لنص بـ **base64**، نحطه secret، وفي الـ workflow نرجّعه ملف تاني بايت ببايت. المثال جزئين: جزء بيتشغّل على جهازك مرة واحدة، وجزء جوه الـ workflow.

---

## ١. يعني إيه base64؟

طريقة بتكتب أي بايتات بـ ٦٤ حرف بس: A-Z و a-z و 0-9 و [[+]] و [[/]]، و [[=]] في الآخر للتكملة. كل ٣ بايت بيبقوا ٤ حروف، فالنص أكبر من الملف بالتلت تقريبًا. وهي **مش تشفير**: أي حد معاه النص يرجّعه.

---

## ٢. على جهازك: [[base64 -w0 release.p12 > keystore.b64]]

- [[base64 release.p12]]: حوّل الملف لنص.
- [[-w0]] (w من wrap): متقسّمش النص على سطور. من غيرها [[base64]] بيكسر السطر كل ٧٦ حرف.
- [[> keystore.b64]]: اكتب الناتج في ملف بدل الشاشة.

جربنا على ملف 3000 بايت عشوائي في Docker على Ubuntu 24.04:

~~~bash
base64 release.p12 | wc -l
base64 -w0 release.p12 | wc -l
base64 -w0 release.p12 | wc -c
~~~

~~~text الناتج
53
0
4000
~~~

[[wc -l]] بيعد السطور: من غير [[-w0]] طلع ٥٣ سطر، ومعاها صفر (سطر واحد من غير حتى newline في آخره). و [[wc -c]] بيعد الحروف: ٣٠٠٠ بايت بقوا ٤٠٠٠ حرف (٣ بقوا ٤).

---

## ٣. [[gh secret set ANDROID_KEYSTORE_BASE64 < keystore.b64]]

- [[gh secret set NAME]]: اعمل (أو غيّر) secret بالاسم ده في الـ repo اللي انت واقف فيه.
- [[< keystore.b64]]: خد القيمة من الملف. أحسن من اللزق في المتصفح، اللي ساعات بيزوّد مسافة أو سطر فيبوّظ الملف.

ده بيكتب على GitHub، فمتجرّبش هنا، وشكله من الـ docs. وبعده [[rm keystore.b64]]: امسح النسخة النصية، لأنها هي نفسها المفتاح.

> على PowerShell نفس النص بيطلع من [[[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.p12"))]]. جربناه في PowerShell 7 و 5.1 على ملف [[note.txt]] بتاع الحل تحت، وطلع نفس النص اللي طلع على لينكس بالظبط.

---

## ٤. جوه الـ workflow

~~~text
- name: Restore keystore
  env:
    KEYSTORE_BASE64: $__{{ secrets.ANDROID_KEYSTORE_BASE64 }}
  run: |
    echo "$KEYSTORE_BASE64" | base64 -d > "$RUNNER_TEMP/release.p12"
    echo "RELEASE_KEYSTORE_FILE=$RUNNER_TEMP/release.p12" >> "$GITHUB_ENV"
~~~

نفكّه:

1. [[env: KEYSTORE_BASE64]]: السر بيدخل كمتغير بيئة للـ step دي بس.
2. [[echo "$KEYSTORE_BASE64"]]: اطبع النص، و [[|]] ابعته لـ...
3. [[base64 -d]] ([[-d]] من decode): رجّعه بايتات.
4. [[> "$RUNNER_TEMP/release.p12"]]: اكتبه ملف. [[RUNNER_TEMP]] متغير جاهز فيه فولدر مؤقت بيتمسح مع نهاية الـ job.
5. السطر التاني بيكتب [[NAME=value]] في ملف [[$GITHUB_ENV]]، فالـ steps اللي بعدها تلاقي مسار الملف في متغير [[RELEASE_KEYSTORE_FILE]] (التفاصيل في درس GITHUB_ENV).

---

## ٥. الحل: نتأكد إن الملف رجع زي ما هو

على Ubuntu 24.04 في Docker:

~~~bash
echo "hello from terminal-study" > note.txt
sha256sum note.txt
base64 -w0 note.txt
~~~

~~~text الناتج
ef14986c004127fe5bc10638ba798128dd8f9460b4286d7a97d9338e7113ef52  note.txt
aGVsbG8gZnJvbSB0ZXJtaW5hbC1zdHVkeQo=
~~~

[[sha256sum]] بيحسب «بصمة» للملف: أي بايت يتغيّر، البصمة تتغيّر خالص. وبعدين شغّلنا workflow الحل بـ [[act]] وحطينا النص ده كـ secret [[NOTE_B64]]، وزوّدنا step بعدها بتقرا [[RELEASE_KEYSTORE_FILE]]:

~~~text الناتج
| ef14986c004127fe5bc10638ba798128dd8f9460b4286d7a97d9338e7113ef52  /tmp/note.txt
| next step sees /tmp/note.txt
~~~

نفس البصمة، يعني الملف رجع بايت ببايت. و [[RUNNER_TEMP]] في act طلع [[/tmp]]. على GitHub (من الـ docs) بيبقى فولدر زي [[/home/runner/work/_temp]].

ولو النص اتلزق غلط:

~~~text الناتج: نص فيه مسافة في النص
hellobase64: invalid input
~~~

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ملف ← نص (جهازك) | [[base64 -w0 file > file.b64]] |
| نص ← secret | [[gh secret set NAME < file.b64]] |
| secret ← ملف (الـ workflow) | [[echo]] النص لـ [[base64 -d > "$RUNNER_TEMP/file"]] |
| اتأكد | [[sha256sum]] في المكانين |`,
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
          teach: R`## الفكرة: job واحد مكتوب، و GitHub بيعمل منه نسخ

بدل ما تكتب نفس الـ job ٤ مرات (Node 22 على أوبونتو، و 24 على أوبونتو، و 22 على ويندوز، و 24 على ويندوز)، بتكتبه مرة، وتدّي GitHub القوايم، وهو بيعمل job لكل تركيبة.

---

## ١. [[strategy:]] و [[matrix:]]

~~~text
    strategy:
      fail-fast: false
      matrix:
        node: [22, 24]
        os: [ubuntu-latest, windows-latest]
~~~

- [[strategy:]] إعدادات «إزاي الـ job ده يتكرر».
- [[matrix:]] جواها قوايم. الأسامي ([[node]] و [[os]]) انت اللي بتختارها، مش كلمات محجوزة.
- GitHub بيضرب القوايم في بعض: ٢ نسخة × ٢ نظام = **٤ jobs**:

| | ubuntu-latest | windows-latest |
|---|---|---|
| **22** | job ١ | job ٢ |
| **24** | job ٣ | job ٤ |

- [[fail-fast: false]]: الافتراضي [[true]]، يعني أول job يفشل GitHub يلغي الباقي. [[false]] بيخلي الكل يكمّل، فتعرف المشكلة في تركيبة واحدة ولا في الكل.

---

## ٢. كل نسخة بتقرا قيمها

~~~text
    runs-on: $__{{ matrix.os }}
...
      - uses: actions/setup-node@v7
        with:
          node-version: $__{{ matrix.node }}
~~~

[[matrix.os]] و [[matrix.node]] قيم التركيبة الحالية. في job ٢ مثلًا [[matrix.os]] = [[windows-latest]] و [[matrix.node]] = [[22]]. فنفس السطر بيطلب ماكينة مختلفة ونسخة Node مختلفة في كل job.

وباقي الخطوات ([[checkout]] و [[npm ci]] و [[npm test]]) زي أي job.

---

## ٣. شكله وهو شغال

اتشغّل هنا بـ [[act]]، وده بيشغّل لينكس بس، فقلناله ياخد تركيبات أوبونتو بس ([[--matrix os:ubuntu-latest]])، وزوّدنا خطوة بتطبع القيم:

~~~text
- run: echo "node=$__{{ matrix.node }} os=$__{{ matrix.os }} -> $(node --version)"
~~~

~~~text الناتج
[wf.yml/test-1]   | Attempting to download 22...
[wf.yml/test-2]   | Found in cache @ /opt/hostedtoolcache/node/24.21.0/x64
[wf.yml/test-2]   | node=24 os=ubuntu-latest -> v24.21.0
[wf.yml/test-2] 🏁  Job succeeded
[wf.yml/test-1]   | node=22 os=ubuntu-latest -> v22.23.3
[wf.yml/test-1] 🏁  Job succeeded
~~~

- jobين اشتغلوا **مع بعض** (السطور متداخلة).
- [[22]] اتحوّلت لأحدث 22.x ([[v22.23.3]])، و [[24]] لأحدث 24.x.
- على GitHub نفسه (من الـ docs) الأسامي بتبقى [[test (22, ubuntu-latest)]] و [[test (22, windows-latest)]] وهكذا، والـ ٤ بيظهروا جنب بعض.

---

## ٤. الحساب

كل job بياخد دقايقه من رصيدك. ٤ jobs × ٣ دقايق = ١٢ دقيقة لكل push. فالـ matrix للمكتبات اللي لازم تشتغل في كل مكان. التطبيق اللي بيشتغل على نسخة واحدة في الإنتاج، اختبره على النسخة دي بس.

---

## الخلاصة

| السطر | معناه |
|---|---|
| [[strategy: matrix:]] | قوايم، و job لكل تركيبة |
| [[$__{{ matrix.اسم }}]] | قيمة التركيبة الحالية |
| [[runs-on: $__{{ matrix.os }}]] | نظام مختلف لكل job |
| [[fail-fast: false]] | فشل واحد ميلغيش الباقي |
| [[include]] / [[exclude]] | زوّد تركيبة معينة أو شيلها |`,
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
          teach: R`## الفكرة: Postgres جنب الـ job، شغال قبل ما الاختبارات تبدأ

[[services:]] بيقول لـ GitHub: قبل ما تبدأ الخطوات، شغّل container (هنا Postgres)، واستنى لحد ما يبقى جاهز، وفي الآخر اقفله. هو بالظبط [[docker run]] مكتوب كـ YAML.

---

## ١. الخدمة نفسها

~~~text
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: app_test
        ports: ['5432:5432']
~~~

| السطر | معناه | زي ده في docker run |
|---|---|---|
| [[postgres:]] | اسم الخدمة، انت اللي بتختاره | [[--name]] |
| [[image: postgres:16-alpine]] | الصورة: Postgres 16 على Alpine (لينكس صغير) | آخر كلمة في الأمر |
| [[POSTGRES_PASSWORD: test]] | باسورد اليوزر [[postgres]]. الصورة مبتقومش من غيره | [[-e]] |
| [[POSTGRES_DB: app_test]] | اعمل قاعدة بالاسم ده أول مرة | [[-e]] |
| [[ports: ['5432:5432']]] | بورت 5432 على الماكينة يوصل لـ 5432 جوه الـ container | [[-p 5432:5432]] |

---

## ٢. [[options: >-]] والـ healthcheck

~~~text
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-retries 10
~~~

- [[>-]] في YAML: النص اللي تحت بيتجمّع في **سطر واحد** بمسافات بدل السطور ([[>]])، ومن غير سطر فاضي في الآخر ([[-]]). فالـ ٣ سطور بيبقوا [[--health-cmd pg_isready --health-interval 5s --health-retries 10]]، وبيتضافوا لأمر docker زي ما هم.
- [[--health-cmd pg_isready]]: الأمر اللي Docker يشغّله جوه الـ container عشان يعرف هو جاهز ولا لأ. [[pg_isready]] أداة Postgres بترجع 0 لما القاعدة تقبل اتصالات.
- [[--health-interval 5s]]: جرّب كل ٥ ثواني. و [[--health-retries 10]]: بعد ١٠ مرات فاشلة اعتبره بايظ.

ليه مهم؟ Postgres بياخد ثواني يقوم، و GitHub بيستنى الـ service تبقى **healthy** قبل أول step. من غيره، الاختبارات ممكن تتصل بدري وتفشل مرة وتنجح مرة.

جربنا نفس الإعدادات بـ [[docker run]] عادي، وسألنا Docker عن الحالة كل ثانيتين:

~~~bash
docker run --name gha09-pg -e POSTGRES_PASSWORD=test -e POSTGRES_DB=app_test \
  --health-cmd pg_isready --health-interval 5s --health-retries 10 -d postgres:16-alpine
docker inspect -f '{{.State.Health.Status}}' gha09-pg
~~~

~~~text الناتج (٤ مرات ورا بعض)
starting
starting
starting
healthy
~~~

~~~text الناتج: pg_isready جوه الـ container
/var/run/postgresql:5432 - accepting connections
~~~

ولما شغّلنا الـ workflow نفسه بـ [[act]] قال نفس الكلام قبل ما يبدأ الخطوات: [[container health of ... (postgres:16-alpine) is starting]] ٣ مرات، وبعدها [[is healthy]]، وبعدين [[Success - Set up job]].

---

## ٣. الـ job بيوصل للقاعدة إزاي؟

~~~text
    env:
      DATABASE_URL: postgres://postgres:test@localhost:5432/app_test
~~~

الـ URL بيتقري كده:

~~~text
postgres://  postgres  :  test  @  localhost  :  5432  /  app_test
 النوع       اليوزر       الباسورد   السيرفر        البورت    القاعدة
~~~

[[localhost]] لأن الخطوات بتشتغل على الماكينة نفسها، والبورت مربوط عليها بـ [[ports]]. اتصلنا بنفس الشكل من container تاني وطلب [[select current_database()]]:

~~~text الناتج
 current_database |  version
------------------+---------------------------------------
 app_test         | PostgreSQL 16.13 on x86_64-pc-linux-musl ...
~~~

> لو الـ job نفسه شغال جوه container ([[container:]] على الـ job)، الـ docs بتقول توصل للخدمة باسمها ([[postgres]]) مش [[localhost]].

---

## ٤. الخطوات

~~~text
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm test
~~~

- [[with: { node-version: 24, cache: npm }]]: نفس [[with:]] اللي في سطور، بس مكتوبة في سطر واحد بالأقواس [[{ }]].
- [[npx prisma migrate deploy]]: Prisma بتطبّق كل ملفات الـ migrations على القاعدة الفاضية. ده محتاج مشروع Prisma، فمتجرّبش هنا، والناتج اللي في الحل من الـ docs.
- [[npm test]]: الاختبارات بتقرا [[DATABASE_URL]] وتتصل.

---

## الخلاصة

| الجزء | دوره |
|---|---|
| [[services:]] | containers بتقوم قبل الخطوات وبتتقفل بعدها |
| [[ports:]] | عشان الخطوات توصل على [[localhost]] |
| [[options: --health-cmd]] | GitHub يستنى لحد ما القاعدة تبقى جاهزة |
| [[migrate deploy]] قبل [[npm test]] | القاعدة الفاضية تاخد الجداول، والـ migrations تتجرّب من الصفر |`,
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
          teach: R`## الفكرة: حاجتين شبه بعض ومختلفين

الاتنين بيحفظوا ملفات بره الماكينة اللي بتترمي، بس لغرضين مختلفين:

| | cache | artifact |
|---|---|---|
| ليه | تسريع: متنزّلش نفس الحاجة كل مرة | ناتج: ملف عايز تاخده أو job تاني محتاجه |
| بيرجع إمتى | في الـ runs الجاية، لو المفتاح نفسه | في نفس الـ run (job تاني)، أو تنزّله انت |
| لو اتمسح | عادي، هيتعمل تاني | خسرت الملف |

---

## ١. [[actions/cache]]

~~~text
- uses: actions/cache@v6
  with:
    path: ~/.npm
    key: npm-$__{{ hashFiles('package-lock.json') }}
~~~

- [[path: ~/.npm]]: الفولدر اللي يتحفظ. [[~/.npm]] هو المكان اللي npm بيحفظ فيه الحزم اللي نزّلها قبل كده، فـ [[npm ci]] بيلاقيها من غير نت.
- [[key:]] اسم الكاش. لو لقى كاش بنفس الاسم بالظبط بيرجّعه.
- [[hashFiles('package-lock.json')]]: دالة بتحسب hash (بصمة) للملف. الـ lock يتغيّر (مكتبة اتضافت) ← البصمة تتغيّر ← المفتاح جديد ← كاش جديد. فعمرك ما هتاخد كاش قديم مش مطابق.

والـ action دي ليها جزئين: في أول الـ job بتحاول **ترجّع**، وفي آخره (خطوة اسمها Post) بت**حفظ** لو مكانش موجود. اتشغّلت هنا بـ [[act]] مرتين ورا بعض على نفس المشروع:

~~~text الناتج: المرة الأولى
| Cache not found for input keys: npm-56b9a583a25b1c51f8deb4ee5d9f879a7479bb3b39998eb4103f7b19cdeea4e3
| added 2 packages, and audited 3 packages in 4s
⭐ Run Post actions/cache@v6
| Cache Size: ~10 MB (10008458 B)
| Cache saved with key: npm-56b9a583a25b...
~~~

~~~text الناتج: المرة التانية
| Cache restored from key: npm-56b9a583a25b...
| added 2 packages, and audited 3 packages in 903ms
⭐ Run Post actions/cache@v6
| Cache hit occurred on the primary key npm-56b9a583a25b..., not saving cache.
~~~

- الرقم الطويل بعد [[npm-]] هو ناتج [[hashFiles]].
- [[npm ci]] نزل من [[4s]] لـ [[903ms]] عشان الحزم كانت موجودة.
- المرة التانية مخزّنتش تاني: المفتاح موجود خلاص ([[Cache hit ... not saving cache]]).

> لو بتستخدم [[setup-node]] بـ [[cache: npm]] (زي أول درس)، هو بيعمل نفس ده لوحده، فمش محتاج [[actions/cache]] لـ npm. الشكل اليدوي ده لأي فولدر تاني.

---

## ٢. [[upload-artifact]]: ارفع الناتج

~~~text
- run: npm run build
- uses: actions/upload-artifact@v7
  with:
    name: dist
    path: dist/
    retention-days: 7
~~~

- [[name: dist]]: اسم الـ artifact. بيه هتنزّله.
- [[path: dist/]]: الفولدر (أو الملفات) اللي يترفع.
- [[retention-days: 7]]: يتمسح بعد ٧ أيام. من غيره (من الـ docs) الافتراضي ٩٠ يوم وبياكل من مساحة الحساب.

---

## ٣. [[download-artifact]]: نزّله في job تاني

~~~text
- uses: actions/download-artifact@v8
  with:
    name: dist
~~~

بينزّل الـ artifact اللي اسمه [[dist]] في فولدر الـ job الحالي. والـ job ده لازم يكون عليه [[needs:]] على الـ job اللي رفعه، وإلا ممكن يشتغل قبله ومايلاقيش حاجة.

جرّبنا الرفع بـ [[act]]، بس سيرفر الـ artifacts اللي جوه act أقدم من [[upload-artifact@v7]] ورفض الطلب ([[Failed to CreateArtifact]]). فشكل الـ artifacts على GitHub من الـ docs: قسم **Artifacts** في آخر صفحة الـ run فيه [[dist]] وحجمه، وبيتنزّل [[dist.zip]]، أو [[gh run download ID]] من الترمنال.

---

## الخلاصة

| | الأمر | المفتاح |
|---|---|---|
| تسريع بين الـ runs | [[actions/cache]] | [[key]] فيه [[hashFiles]] |
| ملف من job لـ job | [[upload-artifact]] ثم [[download-artifact]] | [[name]] نفسه في الاتنين، و [[needs]] |
| ملف ليك انت | [[upload-artifact]] | تنزّله من صفحة الـ run |`,
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
          teach: R`## الفكرة: كل step شيل جديد، فالقيم بتعدّي عن طريق ملف

كل step بتشتغل في bash جديد. أي متغير عملته (حتى بـ [[export]]) بيموت لما الـ step تخلص. GitHub بيديك ملفين: اللي تكتبه فيهم، هو بيقراه بعد ما الـ step تخلص ويدّيه للي بعدها.

| الملف | تكتب فيه | بيتقري إزاي |
|---|---|---|
| [[$GITHUB_ENV]] | [[NAME=value]] | متغير بيئة [[$NAME]] في كل الـ steps الجاية |
| [[$GITHUB_OUTPUT]] | [[name=value]] | [[$__{{ steps.ID.outputs.name }}]]، والـ step لازم ليها [[id]] |

---

## ١. نكتب في [[GITHUB_ENV]]

~~~text
- name: Stamp build
  run: |
    echo "BUILD_TIME=$(date +%s)000" >> "$GITHUB_ENV"
    echo "VERSION=$__{{ github.run_number }}-$__{GITHUB_SHA::7}" >> "$GITHUB_ENV"
~~~

السطر الأول من جوه لبرة:
- [[date +%s]]: الوقت دلوقتي بالثواني من أول ١٩٧٠ (اسمه Unix time).
- [[$( )]]: شغّل الأمر وحط ناتجه مكانه.
- [[000]] بعده: يحوّله مللي ثانية (الشكل اللي JavaScript بيستخدمه).
- [[>> "$GITHUB_ENV"]]: ضيف السطر في آخر الملف.

السطر التاني:
- [[$__{{ github.run_number }}]]: رقم الـ run ده (1، 2، 3...) بيزيد مع كل تشغيل للـ workflow. ده expression، GitHub بيحسبه قبل bash.
- [[$__{GITHUB_SHA::7}]]: ده bash مش GitHub. [[GITHUB_SHA]] رقم الـ commit (٤٠ حرف)، و [[::7]] يعني «من أول حرف، خد ٧». جربناه في Ubuntu:

~~~bash
GITHUB_SHA=561defa636917144b95232b736838869ea7acb71
echo $__{GITHUB_SHA::7}
~~~

~~~text الناتج
561defa
~~~

---

## ٢. الـ step اللي بعدها بتقرا

~~~text
- run: echo "build $VERSION at $BUILD_TIME"
~~~

اتشغّل هنا بـ [[act]]:

~~~text الناتج
[wf.yml/x]   ⚙  ::set-env:: VERSION=1-561defa
[wf.yml/x]   ⚙  ::set-env:: BUILD_TIME=1791304254000
[wf.yml/x] ⭐ Run Main echo "build $VERSION at $BUILD_TIME"
[wf.yml/x]   | build 1-561defa at 1791304254000
~~~

السطرين اللي فيهم [[::set-env::]] ده act بيقولك إنه قرا الملف بعد الـ step. و [[1-561defa]]: run رقم 1 من commit [[561defa]].

---

## ٣. [[GITHUB_OUTPUT]] و [[id]]

~~~text
- id: meta
  run: echo "size=$(du -sh dist | cut -f1)" >> "$GITHUB_OUTPUT"
- run: echo "dist is $__{{ steps.meta.outputs.size }}"
~~~

- [[id: meta]]: اسم للـ step عشان تشاور عليها.
- [[du -sh dist]]: حجم فولدر dist ([[-s]] المجموع بس، [[-h]] بالكيلو والميجا). بيطبع الحجم وبعده Tab وبعده اسم الفولدر، و [[cut -f1]] بياخد أول عمود (قبل الـ Tab) فيفضل الحجم بس، زي [[8.0K]].
- [[steps.meta.outputs.size]]: الـ step اللي id بتاعها [[meta]]، الـ output اللي اسمه [[size]].

~~~text الناتج (act)
[wf.yml/x]   ⚙  ::set-output:: size=8.0K
[wf.yml/x] ⭐ Run Main echo "dist is 8.0K"
[wf.yml/x]   | dist is 8.0K
~~~

لاحظ إن اسم الـ step في اللوج نفسه بقى [[echo "dist is 8.0K"]]: الـ expression اتحسب **قبل** ما الأمر يشتغل.

الفرق العملي: [[GITHUB_ENV]] أسهل لو كل الـ steps محتاجاه. [[GITHUB_OUTPUT]] اسمه مربوط بـ step معينة، ويقدر يعدّي لـ job تاني عن طريق [[outputs:]] على مستوى الـ job.

---

## ٤. الحل: ليه فاضي في نفس الـ step؟

زوّدنا على نفس الـ workflow:

~~~text
- run: |
    echo "VERSION=1.2.3" >> "$GITHUB_ENV"
    echo "same step: [$VERSION]"
    export LATER=x
- run: echo "next step [$VERSION] later=[$LATER]"
~~~

~~~text الناتج (act)
[wf.yml/x]   | same step: [1-561defa]
[wf.yml/x]   ⚙  ::set-env:: VERSION=1.2.3
[wf.yml/x]   | next step [1.2.3] later=[]
~~~

- في نفس الـ step [[$VERSION]] لسه القيمة **القديمة** (كانت [[1-561defa]] من فوق، ولو مكانش فيه قديمة كانت هتطلع فاضية). الملف لسه محدش قراه.
- في الـ step اللي بعدها بقت [[1.2.3]].
- [[LATER]] اللي اتعمل بـ [[export]] اختفى خالص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| متغير لكل الـ steps الجاية | [[echo "NAME=value" >> "$GITHUB_ENV"]] |
| قيمة باسم من step معينة | [[id: x]] و [[echo "k=v" >> "$GITHUB_OUTPUT"]] ثم [[$__{{ steps.x.outputs.k }}]] |
| القيمة في نفس الـ step | متغير شيل عادي، الملف بيتقري بعد ما الـ step تخلص |`,
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
          teach: R`## الفكرة: سطر بشكل معين، و GitHub بيفهمه أمر

الـ runner بيقرا كل سطر بتطبعه. لو السطر بادئ بـ [[::]] واسم أمر معروف، مبيعرضوش كلام عادي، بينفّذه. دي اسمها **workflow commands**. المثال بيستخدم ٤ منهم: [[::error::]] و [[::notice::]] و [[::group::]] و [[::endgroup::]].

---

## ١. السرّين في متغيرات

~~~text
- name: Check secrets
  env:
    SSH_KEY: $__{{ secrets.DEPLOY_SSH_KEY }}
    SSH_HOST: $__{{ secrets.DEPLOY_HOST }}
~~~

لو السر مش موجود في إعدادات الـ repo، المتغير بيبقى نص فاضي. ودي بالظبط الحالة اللي عايزين نمسكها.

---

## ٢. الشرط

~~~text
    if [ -z "$SSH_KEY" ] || [ -z "$SSH_HOST" ]; then
~~~

- [[[ ... ]]] في bash اختبار، بيرجع 0 (صح) أو 1 (غلط).
- [[-z "$SSH_KEY"]]: صح لو النص فاضي (z من zero length). والعلامات [[" "]] لازمة: من غيرها المتغير الفاضي بيختفي والاختبار يبوظ.
- [[||]]: «أو». لو أي واحد فيهم فاضي، ادخل.

---

## ٣. الرسالة والوقفة

~~~text
      echo "::error::DEPLOY_SSH_KEY or DEPLOY_HOST is missing in Settings > Secrets"
      exit 1
    fi
    echo "::notice::secrets OK"
~~~

- [[::error::رسالة]]: GitHub بيعرضها حمرا فوق في صفحة الـ run (قسم Annotations)، فتشوفها من غير ما تفتح اللوج.
- [[exit 1]]: **هو** اللي بيفشّل الـ step. الـ [[::error::]] لوحدها عرض بس.
- [[fi]] قفلة الـ [[if]].
- [[::notice::]] نفس الفكرة بس رسالة زرقا عادية. وفيه [[::warning::]] صفرا.

اتشغّل هنا بـ [[act]] مرتين:

~~~text الناتج: من غير secrets
[wf.yml/x] ⭐ Run Main Check secrets
[wf.yml/x]   ❗  ::error::DEPLOY_SSH_KEY or DEPLOY_HOST is missing in Settings > Secrets
[wf.yml/x]   ❌  Failure - Main Check secrets
[wf.yml/x] exitcode '1': failure
[wf.yml/x] 🏁  Job failed
~~~

~~~text الناتج: الاتنين موجودين
[wf.yml/x]   ❓  ::notice::secrets OK
[wf.yml/x]   ✅  Success - Main Check secrets
~~~

في الأولى الـ job وقف عند الفحص، والخطوة اللي بعدها ما اشتغلتش. ده أحسن بكتير من إن [[ssh]] يفشل بعدها بـ ٥ خطوات برسالة مالهاش علاقة.

---

## ٤. [[::group::]]: لوج طويل في سطر بيتفتح

~~~text
- run: |
    echo "::group::installed packages"
    npm ls --depth=0
    echo "::endgroup::"
~~~

- [[npm ls --depth=0]]: المكتبات اللي في المشروع مباشرة، من غير المكتبات بتاعتها ([[--depth=0]]).
- كل اللي بين [[::group::عنوان]] و [[::endgroup::]] بيتطوي في صفحة الـ run تحت العنوان.

~~~text الناتج (act)
[wf.yml/x]   ❓  ::group::installed packages
[wf.yml/x]   | gha-demo@1.0.0 /mnt/c/Users/ali/.../gha/proj
[wf.yml/x]   | └── typescript@7.0.2
[wf.yml/x]   ❓  ::endgroup::
~~~

(act بيعرض الأوامر دي زي ما هي. GitHub نفسه بيرسمها سطر واحد بسهم تفتحه، ده من الـ docs. والمسار في السطر التاني فولدر المشروع على الجهاز اللي act نسخه.)

---

## الخلاصة

| السطر | النتيجة |
|---|---|
| [[::error::msg]] | رسالة حمرا فوق |
| [[::warning::msg]] | صفرا |
| [[::notice::msg]] | زرقا |
| [[::group::title]] ... [[::endgroup::]] | لوج مطوي |
| [[exit 1]] | **ده** اللي بيفشّل الـ step |

> لازم السطر يبدأ بـ [[::]] بالظبط: مسافة قبلها، أو نقطتين بس، بيخليه كلام عادي.`,
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
          teach: R`## الفكرة: ولّد تاني، ولو طلع مختلف يبقى اللي في الـ repo قديم

فيه ملفات محدش بيكتبها بإيده: بتتولّد من حاجة تانية (أنواع TypeScript من شكل قاعدة البيانات مثلًا). لو حد غيّر المصدر ونسي يولّد، الملف المتولّد يبقى كداب. الفحص: CI يولّد الملف من جديد، ويسأل git «الملف اتغيّر عن اللي في الـ commit؟». لو آه، حد نسي.

---

## ١. [[npm run types:generate]]

~~~text
- run: npm run types:generate
~~~

script في [[package.json]] بيولّد [[lib/database.types.ts]] من جديد ويكتب فوقه. لو المصدر والملف متزامنين، الناتج هيبقى نفس الملف حرف بحرف.

---

## ٢. [[git diff --quiet FILE]]

- [[git diff FILE]]: الفرق بين الملف دلوقتي وآخر commit.
- [[--quiet]]: متطبعش الفرق، رجّع exit code بس: **0** لو مفيش فرق، **1** لو فيه.

وده اللي [[if]] في bash بيستخدمه: [[if أمر; then]] بيدخل لو الأمر رجّع 0.

---

## ٣. السكربت كله

~~~text
if git diff --quiet lib/database.types.ts; then
  echo "types in sync"
else
  git diff lib/database.types.ts
  echo "::error::run npm run types:generate and commit the result"
  exit 1
fi
~~~

- مفيش فرق: اطبع [[types in sync]] والخطوة تنجح.
- فيه فرق ([[else]]): اطبع الفرق نفسه (من غير quiet) عشان تشوفه في اللوج، ورسالة حمرا بالإصلاح، و [[exit 1]].

جربنا السكربت ده في Docker على Ubuntu 24.04 في repo فيه commit للملف بمحتوى [[export type A = 1;]]، والـ «generator» مرة طلّع نفس المحتوى ومرة طلّع [[A = 2]]:

~~~text الناتج: نفس المحتوى
types in sync
exit=0
~~~

~~~text الناتج: محتوى مختلف
diff --git a/lib/database.types.ts b/lib/database.types.ts
index f29cc6f..e979f86 100644
--- a/lib/database.types.ts
+++ b/lib/database.types.ts
@@ -1 +1 @@
-export type A = 1;
+export type A = 2;
::error::run npm run types:generate and commit the result
exit=1
~~~

نقرا الـ diff:

| السطر | معناه |
|---|---|
| [[--- a/...]] | النسخة اللي في الـ commit |
| [[+++ b/...]] | النسخة اللي على الديسك دلوقتي |
| [[@@ -1 +1 @@]] | الفرق في السطر 1 في الاتنين |
| [[-export type A = 1;]] | السطر ده اتشال |
| [[+export type A = 2;]] | وده اتحط مكانه |

---

## ٤. الفخ: ملف جديد

[[git diff]] بيقارن الملفات اللي git **متابعها** بس. لو التوليد عمل ملف جديد خالص:

~~~bash
echo "x" > lib/new.types.ts
git diff --quiet; echo "git diff --quiet exit=$?"
git status --porcelain lib/
test -z "$(git status --porcelain lib/)"; echo "test -z exit=$?"
~~~

~~~text الناتج
git diff --quiet exit=0
?? lib/new.types.ts
test -z exit=1
~~~

- [[git diff --quiet]] قال 0، يعني «مفيش فرق»، وده غلط.
- [[git status --porcelain]] شاف الملف. [[??]] معناها untracked (git مش متابعه)، و [[--porcelain]] شكل ثابت سهل للسكربتات.
- [[test -z "$(...)"]]: صح لو الناتج فاضي. هنا مش فاضي فرجع 1. ده الفحص اللي بيغطي الحالتين.

---

## الخلاصة

| الأمر | بيرجع 1 لما |
|---|---|
| [[git diff --quiet FILE]] | ملف متتبّع اتغيّر |
| [[test -z "$(git status --porcelain DIR)"]] | أي تغيير، حتى ملف جديد |

> نفس الفكرة لأي ملف متولّد بيتعمله commit: ولّد، قارن، افشل لو فيه فرق.`,
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
          teach: R`## الفكرة: ٤ مفاتيح بيتحكموا في «إمتى» و «بعد مين»

| المفتاح | السؤال اللي بيجاوبه |
|---|---|
| [[concurrency]] | لو run جديد جه والقديم لسه شغال، أعمل إيه؟ |
| [[timeout-minutes]] | أستنى قد إيه قبل ما أعتبره معلّق؟ |
| [[needs]] | الـ job ده يستنى مين؟ |
| [[if]] | الـ job أو الـ step دي تشتغل أصلًا ولا لأ؟ |

---

## ١. [[concurrency]]

~~~text
concurrency:
  group: $__{{ github.workflow }}-$__{{ github.ref }}
  cancel-in-progress: true
~~~

- [[group]]: اسم مجموعة. أي اتنين runs ليهم نفس الاسم مش بيشتغلوا مع بعض.
- [[github.workflow]] اسم الـ workflow، و [[github.ref]] الـ branch بالشكل الكامل [[refs/heads/main]]. فالاسم بيطلع حاجة زي [[CI-refs/heads/main]]: مجموعة لكل workflow على كل branch.
- [[cancel-in-progress: true]]: الـ run الجديد **يلغي** القديم. من غيرها، الجديد بيستنى.

النتيجة: عملت push، واكتشفت غلطة، وعملت push تاني بعد دقيقة. الـ CI بتاع الأول اتلغى، لأنه بيختبر كود خلاص اتغيّر.

---

## ٢. job الاختبارات

~~~text
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps: [ { uses: actions/checkout@v7 }, { run: npm ci }, { run: npm test } ]
~~~

- [[timeout-minutes: 10]]: لو الـ job عدّى ١٠ دقايق، اقفله وعلّمه فاشل. الافتراضي (من الـ docs) ٣٦٠ دقيقة، يعني اختبار معلّق ممكن يفضل ٦ ساعات ياكل من رصيدك.
- [[steps: [ ... ] ]]: نفس الـ steps اللي بنكتبها كل مرة، بس مكتوبة في سطر واحد: [[[ ]]] قايمة، وكل [[{ }]] خطوة. YAML بيسمح بالشكلين.

---

## ٣. job الـ deploy: [[needs]] و [[if]]

~~~text
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
~~~

- [[needs: test]]: متبدأش غير لما [[test]] يخلص **بنجاح**. لو فشل، deploy بيتعلّم skipped.
- [[if:]] شرط بيتحسب قبل ما الـ job يبدأ (من غير [[$__{{ }}]]، لأن [[if]] دايمًا expression):
- [[github.ref == 'refs/heads/main']]: الـ branch هي main.
- [[&&]]: «و».
- [[github.event_name == 'push']]: جه من push، مش من pull request.

---

## ٤. [[if]] على step: [[failure()]]

~~~text
    steps:
      - run: echo "deploying"
      - if: failure()
        run: echo "deploy failed, alerting"
~~~

الطبيعي إن أول step تفشل، اللي بعدها مبتشتغلش. [[failure()]] بيعكس ده: «اشتغل بس لو حاجة قبلي فشلت». وفيه [[always()]]: اشتغل مهما حصل.

---

## ٥. شكله وهو شغال

اتشغّل بـ [[act]]، وزوّدنا في الـ deploy خطوة بتفشل عمدًا ([[exit 3]]) وبعدها خطوة عادية وخطوة بـ [[always()]]:

~~~text الناتج: push على main
[wf.yml/test] 🏁  Job succeeded
[wf.yml/deploy]   | deploying ref=refs/heads/main group=wf.yml-refs/heads/main
[wf.yml/deploy]   ❌  Failure - Main exit 3
[wf.yml/deploy] exitcode '3': failure
[wf.yml/deploy]   | deploy failed, alerting
[wf.yml/deploy]   | always runs
[wf.yml/deploy] 🏁  Job failed
~~~

- [[deploy]] بدأ بعد ما [[test]] نجح ([[needs]]).
- بعد الفشل: خطوة [[failure()]] اشتغلت، والخطوة العادية **ما اشتغلتش**، وخطوة [[always()]] اشتغلت.
- اسم المجموعة طلع [[wf.yml-refs/heads/main]] لأن الملف مالوش [[name:]]، فـ act حط اسم الملف مكانه (وعلى GitHub، من الـ docs، بيبقى مسار الملف كله زي [[.github/workflows/ci.yml]]).

ونفس الملف كأنه push على branch اسمها [[feature]]:

~~~text الناتج
[wf.yml/test] 🏁  Job succeeded
~~~

بس كده. الـ deploy ما اشتغلش خالص لأن شرط [[if]] طلع غلط.

إلغاء الـ run القديم محتاج GitHub نفسه (act مبيعملش concurrency)، فشكله من الـ docs: الـ run القديم بيتعلّم Cancelled برسالة إن فيه run أحدث في نفس المجموعة.

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[concurrency.group]] | runs بنفس الاسم مش بيشتغلوا مع بعض |
| [[cancel-in-progress: true]] | الجديد يلغي القديم (للـ CI، مش للـ deploy) |
| [[timeout-minutes]] | أقصى وقت للـ job |
| [[needs: x]] | استنى x ينجح |
| [[if: ...]] | شغّل بشرط |
| [[failure()]] / [[always()]] | بعد فشل / في كل الأحوال |`,
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
          teach: R`## الفكرة: ٣ jobs بيبدأوا مع بعض، وواحد رابع بيقول «الكل تمام»

أي job من غير [[needs]] بيبدأ أول ما الـ run يبدأ، على ماكينة لوحده. فلو حطيت lint و typecheck و test في ٣ jobs، وقت الـ CI كله = وقت أطول واحد فيهم، مش مجموعهم.

---

## ١. الـ ٣ jobs

كل واحد نفس الشكل:

~~~text
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci && npm run lint
~~~

- كل job ماكينة فاضية، فلازم كل واحد يعمل [[checkout]] و [[setup-node]] و [[npm ci]] لوحده. التكرار ده ثواني مع [[cache: npm]].
- [[with: { ... }]]: الإعدادات في سطر واحد.
- [[npm ci && npm run lint]]: [[&&]] يعني «لو الأول نجح، شغّل التاني».

الفرق بين التلاتة في آخر سطر بس:

| الـ job | الأمر | بيفحص إيه |
|---|---|---|
| [[lint]] | [[npm run lint]] | شكل الكود وأخطاء واضحة |
| [[typecheck]] | [[npx tsc --noEmit]] | الأنواع في TypeScript. [[--noEmit]] افحص بس ومتطلّعش ملفات JS |
| [[test]] | [[npm test]] | الاختبارات |

---

## ٢. الـ job الأخير

~~~text
  ok:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - run: echo "all green"
~~~

[[needs: [lint, typecheck, test] ]]: استنى التلاتة. ده الـ job اللي بتخليه **required check** في إعدادات الـ branch، فلو ضفت job رابع بعدين، بتضيفه هنا بس مش في الإعدادات.

عرض [[act -l]] للملف ده (بيوريك الترتيب من غير ما يشغّل):

~~~text الناتج
Stage  Job ID     Job name   Workflow name  Workflow file  Events
0      lint       lint       t15.yml        t15.yml        push
0      typecheck  typecheck  t15.yml        t15.yml        push
0      test       test       t15.yml        t15.yml        push
1      ok         ok         t15.yml        t15.yml        push
~~~

[[Stage 0]] التلاتة مع بعض، و [[Stage 1]] الـ [[ok]] بعدهم.

---

## ٣. الفخ: لو حاجة فشلت، [[ok]] بيتعمل skip

شغّلنا الملف بـ [[act]] وخلّينا [[lint]] يفشل عمدًا:

~~~text الناتج
[wf.yml/typecheck] 🏁  Job succeeded
[wf.yml/test     ] 🏁  Job succeeded
[wf.yml/lint     ] 🏁  Job failed
~~~

[[ok]] ما اشتغلش خالص (skipped). والمشكلة إن GitHub (من الـ docs) بيعتبر الـ required check اللي اتعمله skip **ناجح**، فالـ merge يتفتح!

---

## ٤. الحل: [[ok]] يشتغل دايمًا ويفحص بنفسه

~~~text
  ok:
    needs: [lint, typecheck, test]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "results: $__{{ join(needs.*.result, ' ') }}"
          test "$__{{ contains(needs.*.result, 'failure') || contains(needs.*.result, 'cancelled') || contains(needs.*.result, 'skipped') }}" = "false"
~~~

من جوه لبرة:
- [[if: always()]]: اشتغل حتى لو اللي قبلك فشلوا.
- [[needs.*.result]]: نتيجة كل job في [[needs]] ([[*]] يعني «كلهم»): [[success]] أو [[failure]] أو [[cancelled]] أو [[skipped]].
- [[join(..., ' ')]]: حطهم في نص واحد بمسافات، عشان تطبعهم.
- [[contains(needs.*.result, 'failure')]]: صح لو أي واحد [[failure]]. و [[||]] «أو» بين التلات حالات.
- النتيجة الكلية [[true]] أو [[false]]، و GitHub بيكتبها في الأمر قبل ما يشتغل. فالأمر بيبقى [[test "true" = "false"]] (يفشل) أو [[test "false" = "false"]] (ينجح).

~~~text الناتج (act، lint فاشل)
[wf.yml/typecheck] 🏁  Job succeeded
[wf.yml/lint     ] 🏁  Job failed
[wf.yml/ok       ]   | results: failure success success
[wf.yml/ok       ]   ❌  Failure - Main echo "results: ..."
[wf.yml/ok       ] 🏁  Job failed
~~~

دلوقتي [[ok]] اشتغل وفشل بنفسه، فالـ check أحمر بجد. (ترتيب النتايج في السطر مش لازم يبقى نفس ترتيب [[needs]].)

---

## الخلاصة

| الجزء | ليه |
|---|---|
| jobs من غير [[needs]] | بيشتغلوا مع بعض، الوقت = أطولهم |
| job أخير بـ [[needs]] عليهم | check واحد مطلوب في الإعدادات |
| [[if: always()]] + فحص [[needs.*.result]] | عشان الفشل ميتحوّلش skip يعدّي |`,
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

الـ pin: [[actions/checkout@v7]] بيشاور على tag اسمه v7، وصاحب الـ action يقدر يحرّكه لأي commit. [[@3d3c42e5...]] بيشاور على commit بعينه مستحيل يتغير. والتعليق [[# v7.0.1]] عشان تعرف النسخة. ده اللي حصل فعلًا في هجمات على actions مشهورة.

Dependabot: ملف [[.github/dependabot.yml]] بـ [[package-ecosystem: github-actions]] بيفتح PR كل ما فيه نسخة جديدة، وبيحدّث الـ SHA والتعليق مع بعض.

وكمان: متستخدمش [[pull_request_target]] إلا لو فاهمه (بيدّي secrets لكود من fork). و [[workflow_dispatch]] inputs متتحطش في run مباشرة من غير quotes (injection).`,
            when: "permissions في كل workflow من الأول. pin للـ actions غير الرسمية على الأقل. Dependabot في كل repo.",
            mistakes: "[[permissions: write-all]] عشان «يشتغل». و action من حساب شخصي بـ @main."
          },
          teach: R`## الفكرة: ٣ أقفال

الـ workflow بيشغّل كود ناس تانية (الـ actions) ومعاه توكن على الـ repo بتاعك. المثال فيه قفلين، والحل فيه التالت:

| القفل | بيحميك من إيه |
|---|---|
| [[permissions]] | لو action اتخترقت، التوكن مبيقدرش يعمل غير القليل |
| pin بالـ SHA | محدش يقدر يغيّر كود الـ action من تحتك |
| Dependabot | الـ pin ميخليكش واقف على نسخة قديمة للأبد |

---

## ١. [[permissions]]

~~~text
permissions:
  contents: read
  packages: write
~~~

دي صلاحيات [[GITHUB_TOKEN]] في الـ run ده. أول ما تكتب [[permissions:]]، أي صلاحية **مش مكتوبة** بتبقى [[none]] (ممنوعة).

- [[contents: read]]: يقرا الكود (لازم لـ checkout)، ومايقدرش يعمل push.
- [[packages: write]]: يرفع images على ghcr.io. لو مش بترفع حاجة شيلها.

وفيه غيرهم، زي [[pull-requests: write]] عشان تعلّق على PR. والقاعدة: ابدأ بـ [[contents: read]]، وزوّد اللي الـ workflow بيطلبه لما يفشل بـ [[Resource not accessible by integration]].

---

## ٢. pin بالـ commit SHA

~~~text
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
~~~

[[@v7]] اسمه **tag**، وده مجرد اسم بيشاور على commit، وصاحب الـ repo يقدر يحرّكه لأي commit تاني. الرقم الطويل (٤٠ حرف) هو الـ **commit SHA** نفسه: بصمة محتوى الكود، فمستحيل يشاور على كود تاني. و [[# v7.0.1]] تعليق YAML (أي حاجة بعد [[#]] بتتجاهل) عشان انت تعرف دي أنهي نسخة.

جبنا الأرقام دي بنفسنا من GitHub (قراية بس) بـ [[git ls-remote]]، اللي بيعرض الـ tags من غير ما ينزّل الـ repo:

~~~bash
git ls-remote https://github.com/actions/checkout 'refs/tags/v7*'
~~~

~~~text الناتج
3d3c42e5aac5ba805825da76410c181273ba90b1	refs/tags/v7
9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0	refs/tags/v7.0.0
3d3c42e5aac5ba805825da76410c181273ba90b1	refs/tags/v7.0.1
~~~

لاحظ إن [[v7]] و [[v7.0.1]] نفس الـ SHA دلوقتي. لما تطلع [[v7.0.2]]، صاحب الـ action هيحرّك [[v7]] عليها، وكل اللي كاتبين [[@v7]] هياخدوها من غير ما يعرفوا. اللي عامل pin مش هيتأثر.

والملف عدّى [[actionlint]] من غير ملاحظات.

---

## ٣. الحل: [[.github/dependabot.yml]]

~~~text .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: weekly
~~~

- [[version: 2]]: نسخة شكل الملف، لازم تبقى 2.
- [[updates:]] قايمة، كل عنصر نوع حاجة يحدّثها.
- [[package-ecosystem: github-actions]]: الـ actions في الـ workflows. ([[npm]] لـ package.json، وكل نوع محتاج عنصر لوحده.)
- [[directory: "/"]]: مكان الملفات من أول الـ repo (للـ actions بيدوّر في [[.github/workflows]] لوحده).
- [[interval: weekly]]: يدوّر مرة في الأسبوع.

Dependabot بيفتح PR بالنسخة الجديدة، ولو انت عامل pin بيغيّر الـ SHA والتعليق الاتنين. ده محتاج GitHub نفسه، فمن الـ docs.

---

## الخلاصة

| القفل | الشكل |
|---|---|
| أقل صلاحيات | [[permissions: contents: read]] وزوّد اللي محتاجه بس |
| كود ثابت | [[uses: owner/repo@SHA # vX.Y.Z]] |
| تحديث آمن | [[.github/dependabot.yml]] بـ [[github-actions]] |`,
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
]);
