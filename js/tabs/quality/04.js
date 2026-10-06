// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "Git hooks: الفحص قبل كل commit",
      l: 2,
      n: "husky بيشغّل الفحص لوحده، و lint-staged على الملفات المتغيرة بس، و commitlint على الرسالة",
      items: [
        {
          cmd: "husky",
          title: "hooks تتفعّل عند أي حد يسطّب المشروع",
          desc: R`Git بيشغّل سكربتات اسمها hooks في لحظات معينة: قبل الـ commit، وبعد ما تكتب الرسالة، وقبل الـ push. المشكلة إن فولدر [[.git/hooks]] مبيترفعش.

husky بيحط الـ hooks في فولدر [[.husky]] جوه المشروع، وسكربت [[prepare]] بيفعّلهم أوتوماتيك بعد أي install.`,
          example: R`npm i -D husky
npx husky init
cat .husky/pre-commit
npm pkg get scripts.prepare
git config core.hooksPath`,
          try: R`في مشروع الـ lab اعمل [[husky init]]، واكتب في [[.husky/pre-commit]] سطر [[npm test]]، واعمل commit وشوف الاختبارات بتشتغل قبله.`,
          deep: {
            why: "لو الفحص معتمد إن كل واحد «يفتكر» يشغّل lint قبل الـ commit، محدش هيفتكر. الـ hook بيخلي الفحص يحصل لوحده، والـ commit يترفض لو فشل.",
            how: R`Git لما ييجي يعمل commit، بيدوّر في فولدر الـ hooks على ملف اسمه [[pre-commit]]. لو موجود يشغّله، ولو رجع exit code مش صفر الـ commit يتلغي. وفيه hooks تانية: [[commit-msg]] (بياخد ملف الرسالة)، و [[pre-push]].

الفولدر الافتراضي [[.git/hooks]]، وده جوه [[.git]] فمبيترفعش ولا بينزل مع clone. husky بيغيّر إعداد [[core.hooksPath]] يشاور على [[.husky/_]]، وجواه ملفات صغيرة بتنادي الـ hooks بتاعتك اللي في [[.husky/]]، ودي ملفات عادية في المشروع بتترفع.

[[husky init]] بيعمل تلات حاجات: فولدر [[.husky]]، وملف [[.husky/pre-commit]] فيه [[npm test]]، وسكربت [["prepare": "husky"]] في package.json.

و [[prepare]] سكربت خاص: npm و pnpm بيشغّلوه لوحدهم بعد [[install]]. فأي حد يعمل clone و install، الـ hooks تتفعّل عنده من غير ما يعمل حاجة. و [[git config core.hooksPath]] بيقولك اتفعّلت فعلًا ولا لأ (المفروض يطبع [[.husky/_]]).`,
            when: "أي مشروع فيه lint أو اختبارات، خصوصًا لو عليه أكتر من شخص.",
            mistakes: R`تسطّب husky ومتعملش install بعدها (أو عملته بـ [[--ignore-scripts]])، فـ prepare مشتغلش و [[core.hooksPath]] فاضي. وفي Docker بـ [[npm ci --omit=dev]]، الـ prepare بيحاول يشغّل husky وهو مش متسطّب فالـ install يقع: خلّي السكربت [[husky || true]]. ([[HUSKY=0]] بيقفل husky لو متسطّب، زي CI، بس مبيمنعش «husky: not found».) والـ hooks تبقى تقيلة (اختبارات المشروع كله قبل كل commit) فالناس تتخطّاها: خلّي pre-commit سريع (lint-staged)، والتقيل في pre-push أو CI.`
          },
          teach: R`## الفكرة: Git بيشغّل سكربت قبل الـ commit، و husky بيخلي السكربت ده جزء من المشروع

Git عنده «hooks»: ملفات بأسامي معينة بيشغّلها لوحده في لحظات معينة. لو [[pre-commit]] رجّع غلط، الـ commit مبيتعملش. husky بيظبط ده بحيث الملفات تبقى في المشروع وتتفعّل عند أي حد يعمل install. اتشغّل على ويندوز 11 من Git Bash (husky 9.1.7، Git 2.56) في repo تجربة فاضي.

---

## ١. [[npm i -D husky]]

- [[i]] اختصار [[install]].
- [[-D]] اختصار [[--save-dev]]: يتسجّل في [["devDependencies"]]، يعني أداة للتطوير مش جزء من التطبيق اللي بيشتغل.

---

## ٢. [[npx husky init]]

~~~bash
npx husky init
ls -la .husky .husky/_
~~~

~~~text الناتج
.husky:
drwxr-xr-x 1 ali 197609 0 Oct  6 20:09 _
-rw-r--r-- 1 ali 197609 9 Oct  6 20:09 pre-commit

.husky/_:
-rw-r--r-- 1 ali 197609   1 Oct  6 20:09 .gitignore
-rwxr-xr-x 1 ali 197609  39 Oct  6 20:09 commit-msg
-rwxr-xr-x 1 ali 197609 551 Oct  6 20:09 h
-rw-r--r-- 1 ali 197609 160 Oct  6 20:09 husky.sh
-rwxr-xr-x 1 ali 197609  39 Oct  6 20:09 pre-commit
-rwxr-xr-x 1 ali 197609  39 Oct  6 20:09 pre-push
...
~~~

([[ls -la]]: [[-l]] تفاصيل، و [[-a]] حتى الملفات اللي أولها نقطة. شلت من الناتج باقي أسامي الـ hooks.)

فيه مكانين:

| المكان | فيه إيه | بيترفع على Git؟ |
|---|---|---|
| [[.husky/pre-commit]] | **أوامرك انت** | أيوه |
| [[.husky/_/]] | ملف لكل hook يعرفه Git، كلهم بينادوا [[h]] | لأ، جواه [[.gitignore]] فيه [[*]] |

الملفات الصغيرة (٣٩ بايت) في [[_]] كلها سطرين:

~~~text .husky/_/pre-commit
#!/usr/bin/env sh
. "$(dirname "$0")/h"
~~~

يعني «شغّل [[h]] اللي جنبي». و [[h]] بيدوّر على ملف بنفس الاسم في [[.husky/]] (اللي انت كاتبه)، لو مش موجود يخرج بهدوء، ولو موجود يشغّله بـ [[sh -e]] ويطبع رسالة لو وقع.

---

## ٣. [[cat .husky/pre-commit]]

~~~text الناتج
npm test
~~~

[[init]] كتب فيه [[npm test]] جاهز. ده ملف shell عادي: كل سطر أمر.

---

## ٤. [[npm pkg get scripts.prepare]]

[[npm pkg get]] بيقرا خانة من [[package.json]] من غير ما تفتحه، و [[scripts.prepare]] يعني خانة [[prepare]] جوه [[scripts]]:

~~~text الناتج
"husky"
~~~

[[prepare]] اسم خاص: npm بيشغّله لوحده بعد [[npm install]]. وأمر [[husky]] من غير حاجة بيظبط Git يدوّر على الـ hooks في [[.husky/_]].

---

## ٥. [[git config core.hooksPath]]

~~~text الناتج
.husky/_
~~~

[[core.hooksPath]] إعداد Git بيقول فولدر الـ hooks فين. الافتراضي [[.git/hooks]]، وده جوه [[.git]] فمبيترفعش. husky غيّره في إعدادات الـ repo ده بس ([[.git/config]])، مش global.

### الإثبات: clone جديد

عملت clone للـ repo وسألت قبل وبعد [[npm install]]:

~~~text الناتج
before: []
after: [.husky/_]
~~~

قبل الـ install الإعداد فاضي (إعدادات Git مبتنزلش مع clone)، وبعده [[prepare]] اشتغل وظبطه. ده اللي بيخلي الـ hooks تشتغل عند كل الفريق من غير ما حد يفتكر.

---

## ٦. الـ hook شغال

~~~text الناتج (git commit والاختبارات بتعدّي)
> hk@1.0.0 test
> node -e "console.log('tests ok')"

tests ok
[main (root-commit) ae0a88b] chore: add husky
 4 files changed, 51 insertions(+)
~~~

ولما خليت [[npm test]] يرجع ١:

~~~text الناتج
1 test failed
husky - pre-commit script failed (code 1)
~~~

و [[git log --oneline]] لسه فيه الـ commit الأول بس. [[code 1]] هو exit code الأمر اللي وقع.

### init برا repo

~~~text الناتج (npx husky init في فولدر مفيهوش git init)
.git can't be found
~~~

ورجع exit code صفر! يعني مفيش حاجة تقولك إنه فشل غير السطر ده، فاقراه.

---

## الملخص

| الأمر | بيعمل إيه |
|---|---|
| [[npm i -D husky]] | يسطّب husky كأداة تطوير |
| [[npx husky init]] | [[.husky/pre-commit]] فيه [[npm test]]، وسكربت [[prepare]]، ويظبط [[core.hooksPath]] |
| [[cat .husky/pre-commit]] | يوريك الأوامر اللي هتشتغل قبل كل commit |
| [[npm pkg get scripts.prepare]] | يتأكد إن [[prepare]] موجود |
| [[git config core.hooksPath]] | يتأكد إن Git شايف [[.husky/_]] |

## الخلاصة

- أوامرك في [[.husky/<اسم-الـhook>]] وبتترفع، و [[.husky/_]] husky بيولّده لوحده.
- [[prepare]] هو اللي بيفعّل الـ hooks بعد أي install، فـ [[core.hooksPath]] الفاضي معناه إن prepare مشتغلش.
- hook رجّع غير صفر = الـ commit اتلغى.`,
          lines: [
            "سطّب husky كـ dev dependency.",
            "جهّز husky: فولدر .husky، و hook اسمه pre-commit، وسكربت prepare.",
            "شوف الـ hook هيشغّل إيه (أول مرة فيه npm test).",
            "اتأكد إن سكربت prepare اتضاف، وده اللي بيفعّل الـ hooks بعد كل install.",
            "اتأكد إن Git بقى بيدوّر على الـ hooks في .husky/_."
          ],
          sol: R`[[npx husky init]] بيعمل فولدر [[.husky]] فيه [[pre-commit]] وفولدر داخلي [[_]]، وبيضيف [["prepare": "husky"]] للـ scripts، وبيظبط [[git config core.hooksPath]] على [[.husky/_]]. و [[cat .husky/pre-commit]] بيطبع [[npm test]] جاهز (مش محتاج تكتبه).

لما تعمل commit، قبل الرسالة بتاعة git هتشوف [[> vitest run]] ونتيجة الاختبارات. ولو كسرت اختبار: [[husky - pre-commit script failed (code 1)]] والـ commit مش بيتعمل ([[git log]] زي ما هو).

لو الـ hook ما اشتغلش: [[git config core.hooksPath]] فاضي، يعني الـ init اتعمل في فولدر مش هو root الـ repo أو قبل [[git init]]. شغّل [[npm run prepare]]. ولو قال [[.git can't be found]] يبقى الفولدر مش git repo أصلًا.`
        },
        {
          cmd: ".husky/pre-commit و commit-msg",
          title: "ملفات الـ hooks نفسها",
          desc: R`كل hook ملف بالاسم بالظبط ([[pre-commit]] أو [[commit-msg]] أو [[pre-push]]) جوه [[.husky/]]، وفيه أوامر shell عادية.

لو الملف مش موجود، مفيش حاجة بتحصل ومفيش رسالة تقولك. فبعد الإعداد جرّب commit غلط واتأكد إنه اترفض.`,
          example: R`echo "npx lint-staged" > .husky/pre-commit
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
echo "npm test" > .husky/pre-push
ls -la .husky
git add .husky
git commit --allow-empty -m "bad message"`,
          try: "اعمل الـ hooks التلاتة، وجرّب commit برسالة عشوائية: لازم يترفض. لو عدّى، فيه ملف ناقص.",
          deep: {
            why: "الـ hooks بتفشل بصمت. لو الملف مش موجود أو مكتوب غلط، Git بيعمل الـ commit عادي، وانت فاكر إن كل حاجة بتتفحص.",
            how: R`Git بيشغّل الملف اللي اسمه بالظبط زي الـ hook، من غير امتداد. [[pre-commit]] قبل ما يعمل الـ commit. [[commit-msg]] بعد ما تكتب الرسالة، وبيدّيله مسار ملف فيه الرسالة كأول argument، وده [["$1"]]. و [[pre-push]] قبل ما يرفع.

الملف بيتشغّل بـ sh حتى على ويندوز (Git for Windows جاي معاه sh). فالأوامر لازم تبقى shell، والملف لازم يبقى UTF-8 ونهاية سطوره LF.

[[npx --no -- commitlint]]: [[--no]] معناها «لو مش متسطّب متنزّلهوش من النت»، فلو حد نسي install يقع على طول بدل ما يستنى تحميل.

[[--allow-empty]] بيعمل commit من غير تعديلات، مفيد تجرّب بيه الـ hooks من غير ما تلمس ملفات. لو الـ commit عدّى برسالة زي [[bad message]]، يبقى [[commit-msg]] مش شغال.`,
            when: "مرة واحدة بعد husky init، ومع كل hook جديد. والتجربة بالـ commit الغلط بعد أي تعديل في الإعداد.",
            mistakes: R`في مشروع حقيقي كان husky و lint-staged و commitlint متسطّبين ومتظبطين، بس فولدر [[.husky]] مكانش فيه غير [[_]] (اللي husky بيولّده)، ومفيش [[pre-commit]] ولا [[commit-msg]]. يعني ولا hook اشتغل، والإعدادات كلها كانت ميتة ومحدش لاحظ. وكمان: لو كتبت الملف بـ [[echo >]] من Windows PowerShell 5.1، بيتحفظ UTF-16 والـ hook يبوظ بخطأ غريب، فاكتبه من Git Bash أو VS Code. ونسيان [[git add .husky]]، فالـ hooks شغالة عندك انت بس.`
          },
          teach: R`## الفكرة: كل hook ملف، واسمه هو اللي بيحدد إمتى يشتغل

المثال بيكتب تلات ملفات في [[.husky/]] بـ [[echo]]، ويتأكد إنهم موجودين، ويجرّب commit غلط عشان يشوف إنه اترفض. اتشغّل على ويندوز 11 من Git Bash، في repo تجربة فيه husky و lint-staged و commitlint متسطّبين.

---

## ١. [[echo "npx lint-staged" > .husky/pre-commit]]

- [[echo "..."]] اطبع النص.
- [[>]] بدل ما يتطبع على الشاشة، اكتبه في الملف ده (ولو موجود امسح اللي فيه).

فالملف بقى فيه سطر واحد: [[npx lint-staged]]، وده بيشتغل قبل كل commit (الدرس الجاي).

---

## ٢. [[echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg]]

### ليه علامات تنصيص مفردة [[' ']]؟

جوه [[" "]] الـ shell بيبدّل [[$1]] بقيمته **دلوقتي** (وهي فاضية)، فالملف هيتكتب غلط. جوه [[' ']] مفيش أي تبديل، فـ [[$1]] بتتكتب زي ما هي:

~~~text الناتج (cat .husky/commit-msg)
npx --no -- commitlint --edit "$1"
~~~

### كل حتة

| الحتة | معناها |
|---|---|
| [[npx]] | شغّل أداة من [[node_modules/.bin]] |
| [[--no]] | لو مش متسطّبة، متنزّلهاش من النت، واقع على طول |
| [[--]] | اللي بعدي مش options لـ npx، دي للأداة نفسها |
| [[commitlint]] | الأداة |
| [[--edit "$1"]] | اقرا الرسالة من الملف ده |
| [[$1]] | أول argument بيدّيه Git للـ hook: مسار ملف فيه رسالة الـ commit ([[.git/COMMIT_EDITMSG]]) |

---

## ٣. [[echo "npm test" > .husky/pre-push]]

[[pre-push]] بيشتغل قبل [[git push]]، بعد الـ commits. مكان كويس للحاجات الأتقل من pre-commit.

---

## ٤. [[ls -la .husky]]

~~~text الناتج
drwxr-xr-x 1 ali 197609  0 Oct  6 20:09 _
-rw-r--r-- 1 ali 197609 35 Oct  6 20:10 commit-msg
-rw-r--r-- 1 ali 197609 16 Oct  6 20:10 pre-commit
-rw-r--r-- 1 ali 197609  9 Oct  6 20:10 pre-push
~~~

الأرقام أحجام بالبايت: [[pre-commit]] ١٦ = ١٥ حرف في [[npx lint-staged]] وحرف السطر الجديد. وأول حرف في كل سطر: [[d]] فولدر، و [[-]] ملف. لو مش شايف التلاتة جنب [[_]]، الـ hooks مش موجودة ومفيش حاجة هتشتغل.

---

## ٥. [[git add .husky]]

من غيره الملفات عندك انت بس. [[git add]] بيجهّزهم للـ commit الجاي، فيتبعتوا مع الـ push لباقي الفريق.

---

## ٦. [[git commit --allow-empty -m "bad message"]]

- [[--allow-empty]] اعمل commit حتى لو مفيش تغييرات، عشان نجرّب الـ hooks من غير ما نلمس ملفات.
- [[-m "..."]] الرسالة.

أول محاولة عندي وقعت في حتة تانية خالص:

~~~text الناتج
✖ lint-staged could not find any valid configuration.
husky - pre-commit script failed (code 1)
~~~

[[pre-commit]] اشتغل قبل [[commit-msg]]، و lint-staged مكانش ليه إعدادات. فضفت الإعداد في [[package.json]] (الدرس الجاي) وجرّبت تاني:

~~~text الناتج
✖   Please add rules to your $__btcommitlint.config.js$__bt
    - Getting started guide: https://commitlint.js.org/guides/getting-started
✖   found 1 problems, 0 warnings

husky - commit-msg script failed (code 9)
~~~

دلوقتي وصلنا لـ [[commit-msg]]، بس commitlint من غير ملف إعداد مفيهوش قواعد، فبيرفض أي رسالة بكود ٩. عملت [[commitlint.config.js]] وعملت commit للملفات برسالة صح ([[chore: add git hooks]])، وبعدين الأمر بتاع المثال تاني:

~~~text الناتج
→ lint-staged could not find any staged files.
⧗   --- input ---
bad message
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings

husky - commit-msg script failed (code 1)
~~~

| السطر | معناه |
|---|---|
| [[lint-staged could not find any staged files]] | الـ commit فاضي، فـ pre-commit عدّى من غير شغل |
| [[input: bad message]] | الرسالة اللي commitlint قراها من [[$1]] |
| [[subject-empty]] و [[type-empty]] | مش على شكل [[type: subject]] (درس commitlint) |
| [[commit-msg script failed (code 1)]] | الـ commit اترفض |

ده بالظبط اللي عايزينه: رسالة غلط = مفيش commit.

---

## ٧. الملف لازم يتكتب UTF-8

الـ hooks بتتشغّل بـ [[sh]]. كتبت نفس السطر من Windows PowerShell 5.1 ومن PowerShell 7، وبصيت على أول البايتات بـ [[Format-Hex]]:

~~~text الناتج
PowerShell 5.1:  FF FE 6E 00 70 00 78 00 ...   ÿþn p x
PowerShell 7:    6E 70 78 20 6C 69 6E 74 ...   npx lint
~~~

5.1 كتب UTF-16 ([[FF FE]] في الأول وصفر بعد كل حرف). حطيته مكان [[pre-commit]]:

~~~text الناتج
.husky/pre-commit: .husky/pre-commit: cannot execute binary file
husky - pre-commit script failed (code 126)
~~~

[[sh]] شافه ملف binary. ملف PowerShell 7 (UTF-8، بس نهاية سطوره CRLF) اشتغل عادي في التجربة دي. الأضمن تكتب الـ hooks من Git Bash أو VS Code.

---

## الخلاصة

- اسم الملف = اسم الـ hook بالظبط، من غير امتداد: [[pre-commit]] و [[commit-msg]] و [[pre-push]].
- [[$1]] في [[commit-msg]] مسار ملف الرسالة، واكتبه جوه [[' ']] عشان يوصل زي ما هو.
- بعد أي إعداد: [[ls -la .husky]] وبعدين commit غلط بـ [[--allow-empty]]، ولازم يترفض.`,
          lines: [
            "قبل كل commit: شغّل lint-staged على الملفات المتجهزة.",
            "بعد ما تكتب الرسالة: افحصها بـ commitlint. [[$1]] مسار ملف الرسالة.",
            "قبل كل push: شغّل الاختبارات.",
            "اتأكد إن الملفات موجودة فعلًا، مش فولدر _ لوحده.",
            "ضيفهم لـ Git عشان يوصلوا لباقي الفريق.",
            "جرّب commit برسالة غلط ومن غير تعديلات. المفروض يترفض."
          ],
          sol: R`[[git commit --allow-empty -m "bad message"]] بيترفض بـ:

[[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]] و [[found 2 problems, 0 warnings]]، وبعدها [[husky - commit-msg script failed (code 1)]]. الـ pre-commit قبلها بتقول [[lint-staged could not find any staged files.]] وتعدّي، لأن الـ commit فاضي.

لو الرسالة عدّت، دور على الناقص: غالبًا [[commitlint.config.js]] مش موجود (ساعتها commitlint بيقع بـ [[Please add rules to your commitlint.config.js]])، أو الباكدجات [[@commitlint/cli]] و [[@commitlint/config-conventional]] مش متسطبة. ولو الـ config بـ [[export default]] والمشروع مش [["type": "module"]] سمّيه [[commitlint.config.mjs]]. ولو [[ls -la .husky]] مفيهوش [[commit-msg]]، يبقى الـ echo اتعمل في فولدر تاني.`
        },
        {
          cmd: "lint-staged",
          title: "افحص الملفات المتغيرة بس",
          desc: R`lint-staged بياخد الملفات اللي عملتلها [[git add]] بس، ويشغّل عليها الأوامر حسب نوعها. فالـ pre-commit ياخد ثانيتين بدل دقيقة.

ولو [[--fix]] أو [[--write]] عدّلوا حاجة، التعديل بيدخل الـ commit لوحده.`,
          example: R`"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}`,
          try: R`بوّظ المسافات في ملفين، اعمل add لواحد بس وبعدين commit: هتلاقي prettier ظبط الملف اللي في الـ commit بس، والتاني زي ما هو.`,
          flag: "script",
          deep: {
            why: "eslint و prettier على المشروع كله ممكن ياخدوا دقيقة. لو كل commit بيستنى دقيقة، الناس هتتخطّى الـ hook. وكمان ملوش لازمة تفحص ملفات متلمستش.",
            how: R`لما [[npx lint-staged]] يشتغل (عادةً من [[.husky/pre-commit]]):

بيسأل Git عن الملفات المتجهزة (staged)، ويقارنها بالـ patterns: كل ملف [[.ts]] يروح للأوامر بتاعة [[*.{ts,tsx,js,jsx}]]. بيشغّل الأوامر بالترتيب، وبيحط أسماء الملفات في آخر كل أمر، فـ [[eslint --fix]] بيبقى فعليًا [[eslint --fix src/a.ts src/b.ts]].

قبل ما يبدأ بيعمل نسخة احتياطية (stash) من حالتك، ولو أي أمر فشل بيرجّع كل حاجة زي ما كانت والـ commit يتلغي. ولو نجح والأوامر عدّلت الملفات، بيعمل [[git add]] للتعديلات لوحده. والتعديلات اللي في نفس الملف ومش متجهزة (عملت add لجزء بس) بيحافظ عليها ومش بيدخّلها الـ commit.

الأوامر اللي بتقبل أسماء ملفات بس هي اللي تنفع هنا. [[tsc --noEmit]] بيفحص المشروع كله بـ tsconfig، ولو بعتّله ملفات: TypeScript 6 بيرفض بخطأ [[TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline]]، والنسخ الأقدم كانت بتتجاهل الـ tsconfig في صمت. فمكانه CI أو pre-push.`,
            when: "في pre-commit لأي مشروع فيه eslint أو prettier.",
            mistakes: R`تحط [[tsc]] أو [[vitest run]] في lint-staged، فيطلع خطأ ([[TS5112]] في TypeScript 6) أو يتجاهل الإعدادات، لأن الملفات اتبعتت كـ arguments. واعتبار lint-staged كفاية: هو بيفحص الملفات المتغيرة بس، فملف تاني اتكسر بسبب تعديلك مش هيبان. عشان كده CI لازم يفحص المشروع كله برضه.`
          },
          teach: R`## الفكرة: نوع الملف ← أوامر، على الملفات اللي في الـ commit بس

المثال حتة من [[package.json]]: خانة اسمها [["lint-staged"]]، جواها شكل أسامي ملفات، وقصاد كل شكل الأوامر اللي تتشغّل عليه. و [[npx lint-staged]] في [[.husky/pre-commit]] هو اللي بيقراها. اتشغّل على ويندوز 11 من Git Bash (lint-staged 17.6، eslint 10، prettier 3.9).

---

## ١. السطر الأول

~~~text
"*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
~~~

### الشكل [["*.{ts,tsx,js,jsx}"]]

ده glob: [[*]] أي اسم، و [[{ts,tsx,js,jsx}]] واحد من دول. يعني أي ملف آخره [[.ts]] أو [[.tsx]] أو [[.js]] أو [[.jsx]]، في أي فولدر.

### الأوامر [[[ "...", "..." ]]]

array يعني أكتر من أمر، بيتشغّلوا **بالترتيب** على نفس الملفات:

1. [[eslint --fix]]: افحص، وصلّح اللي يتصلّح لوحده (زي [[let]] المفروض تبقى [[const]]).
2. [[prettier --write]]: نسّق الشكل (مسافات، و [[;]]، وعلامات التنصيص) واكتب فوق الملف.

eslint الأول لأن تصليحاته ممكن تبوّظ الشكل، و prettier بيظبطه في الآخر.

lint-staged بيحط أسماء الملفات في آخر كل أمر، فلو جهّزت [[src/a.ts]] بس، الأمر الحقيقي بيبقى [[eslint --fix src/a.ts]].

## ٢. السطر التاني

~~~text
"*.{json,md,yml,yaml}": ["prettier --write"]
~~~

الملفات اللي مش كود: تنسيق بس. eslint ملوش دعوة بيها.

---

## ٣. التجربة: ملفين متبوّظين، واحد في الـ commit

~~~bash
printf 'export const a=1\n' > src/a.ts
printf 'export const b=2\n' > src/b.ts
git add src/a.ts
git commit -m "feat: add a"
~~~

[[printf]] زي [[echo]] بس [[\n]] جواه بتبقى سطر جديد. الملفين من غير مسافات حوالين [[=]] ومن غير [[;]].

~~~text الناتج
⋯ Backing up original state…
✔ Done backing up original state (69c1308)!
⋯ Running tasks for staged files…
    *.{ts,tsx,js,jsx} — 1 file
      ⋯ eslint --fix
      ⋯ prettier --write

✔ eslint --fix
✔ prettier --write

✔ Done running tasks for staged files!
⋯ Staging changes from tasks…
✔ Done staging changes from tasks!
⋯ Cleaning up temporary files…
✔ Done cleaning up temporary files!
[main cba35ce] feat: add a
 1 file changed, 1 insertion(+)
~~~

| الخطوة | معناها |
|---|---|
| Backing up original state | نسخة احتياطية (git stash) من حالتك، عشان لو حاجة وقعت يرجّعها |
| [[*.{ts,tsx,js,jsx} — 1 file]] | ملف واحد متجهز طابق الشكل ده |
| [[✔ eslint --fix]] و [[✔ prettier --write]] | الأمرين نجحوا |
| Staging changes from tasks | التعديلات اللي prettier عملها اتضافت للـ commit لوحدها |
| [[[main cba35ce]]] | الـ commit اتعمل |

### النتيجة

~~~bash
git show HEAD:src/a.ts
cat src/b.ts
git status --short
~~~

~~~text الناتج
export const a = 1;
export const b=2
?? src/b.ts
~~~

- [[git show HEAD:src/a.ts]] الملف زي ما هو جوه آخر commit: متنسّق.
- [[b.ts]] زي ما هو، و [[??]] يعني Git مش متابعه لسه. lint-staged ملمسوش لأنه مش في الـ commit.

---

## ٤. خطأ eslint مبيتصلّحش لوحده

~~~bash
printf 'const unused=5\nexport const c=3\n' > src/c.ts
git add src/c.ts
git commit -m "feat: add c"
~~~

~~~text الناتج
✖ eslint --fix
↓ prettier --write

✖ Failed to run tasks for staged files!
↓ Skipped staging changes from tasks…
⋯ Reverting to original state because of errors…
✔ Done reverting to original state!

✖ eslint --fix:

C:\Users\ali\hk\src\c.ts
  1:7  error  'unused' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)
husky - pre-commit script failed (code 1)
~~~

- [[↓ prettier --write]] السهم لتحت يعني اتخطّى: الأمر اللي قبله وقع.
- [[Reverting to original state]] رجّع الملفات زي ما كانت.
- [[1:7]] السطر ١ العمود ٧، والقاعدة [[no-unused-vars]]: متغير اتعمل وماحدش استخدمه. eslint ميقدرش يقرر يمسحه لوحده.
- [[git log]] لسه آخره [[feat: add a]]: مفيش commit.

---

## ٥. ليه [[tsc]] مكانه مش هنا

lint-staged بيبعت أسماء الملفات للأمر. جرّبت ده على TypeScript 6 في مشروع فيه [[tsconfig.json]]:

~~~bash
npx tsc --noEmit src/a.ts
~~~

~~~text الناتج
error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
~~~

[[tsc]] بيفحص المشروع كله بإعداداته، مش ملفات متفرقة. مكانه [[pre-push]] أو CI. ونفس الكلام لـ [[vitest run]].

---

## الخلاصة

- المفتاح glob للملفات، والقيمة أمر أو array أوامر بتتشغّل بالترتيب.
- lint-staged بيلمس الملفات المتجهزة بس، وبيضيف تعديلات [[--fix]] و [[--write]] للـ commit لوحده.
- لو أمر وقع، كل حاجة بترجع زي ما كانت والـ commit بيتلغي.
- الأوامر اللي محتاجة المشروع كله ([[tsc]]، الاختبارات) مش هنا.`,
          lines: [
            "الإعدادات في package.json تحت اسم lint-staged.",
            "ملفات الكود: صلّح بـ eslint وبعدين نسّق بـ prettier، على الملفات المتجهزة بس.",
            "باقي الملفات (JSON و Markdown و YAML): نسّقها بس.",
            "نهاية الإعدادات."
          ],
          sol: R`في التجربة: [[src/a.ts]] و [[src/b.ts]] الاتنين فيهم [[export const a=1]] من غير مسافات، و [[git add src/a.ts]] بس. الـ commit طبع [[✔ eslint --fix]] و [[✔ prettier --write]] و [[Done running tasks for staged files!]]، والـ commit اتعمل.

[[git show HEAD:src/a.ts]] بيطلّع [[export const a = 1;]] متنسّق. و [[cat src/b.ts]] لسه [[export const b=2]]، و [[git status]] بيوريه [[?? src/b.ts]]. ودي الفكرة: lint-staged بيلمس اللي في الـ commit بس، فمش بيقلب commit صغير لتعديل في مية ملف.

لو [[b.ts]] اتظبط كمان، يبقى الـ hook فيه [[prettier --write .]] بدل [[npx lint-staged]]. ولو eslint رجّع error مش قابل للإصلاح (زي متغير مش مستخدم)، lint-staged بيرجّع ملفاتك زي ما كانت والـ commit مش بيتعمل، ودا صح.`
        },
        {
          cmd: "commitlint",
          title: "رسالة الـ commit بصيغة ثابتة",
          desc: R`Conventional Commits صيغة للرسالة: [[type(scope): subject]]. الـ type من قايمة ثابتة ([[feat]] ميزة، و [[fix]] تصليح، و [[chore]] و [[docs]] و [[refactor]] و [[test]] و [[ci]])، والـ scope الجزء اللي اتغير.

commitlint بيرفض أي رسالة مش ماشية على الصيغة، من [[commit-msg]] hook.`,
          example: R`npm i -D @commitlint/cli @commitlint/config-conventional
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
echo "fixed stuff" | npx commitlint
git commit -m "feat(cart): add coupon field"
git commit -m "fix(auth): refresh token before expiry"
git commit -m "chore(deps): bump vite"
git commit -m "feat(api)!: rename /users to /members"`,
          try: R`جرّب [[echo "update" | npx commitlint]] واقرا الأخطاء، وبعدين صلّح الرسالة لحد ما تعدّي.`,
          deep: {
            why: "[[git log]] مليان «update» و «fix» و «asdf» ملوش أي فايدة. بصيغة ثابتة، تقرا التاريخ بسرعة وتعرف كل commit بيعمل إيه من أول كلمة، وأدوات تقدر تطلّع changelog ورقم النسخة الجاية لوحدها.",
            how: R`الصيغة: [[type(scope): subject]]، وبعدها سطر فاضي، وبعدين body اختياري.

[[feat]] ميزة جديدة. [[fix]] تصليح bug. [[refactor]] تغيير في الكود من غير ما السلوك يتغير. [[docs]] توثيق. [[test]] اختبارات. [[chore]] صيانة (مكتبات، إعدادات). [[ci]] ملفات CI. [[style]] تنسيق بس.

و [[!]] بعد الـ type (أو سطر [[BREAKING CHANGE:]] في الـ body) معناها تغيير بيكسر الاستخدام القديم.

وده مش ديكور: أدوات زي semantic-release و changesets بتقرا التاريخ: [[fix]] يزوّد رقم الـ patch (من 1.2.3 لـ 1.2.4)، و [[feat]] الـ minor (لـ 1.3.0)، و [[!]] الـ major (لـ 2.0.0)، وبتكتب الـ changelog لوحدها.

commitlint بيقرا [[commitlint.config.js]]، و [[config-conventional]] فيها القواعد القياسية. وتقدر تقفل قاعدة: [[rules: { 'subject-case': [0] }]] (الصفر معناه off). ومن [[.husky/commit-msg]] بيقرا ملف الرسالة بـ [[--edit "$1"]]، ومن الترمنال تبعتله الرسالة بـ pipe تجرّب.`,
            when: "من أول commit في المشروع. ولو فريق، اكتبوا قايمة الـ scopes المسموحة في CONTRIBUTING أو في rules.",
            mistakes: R`تفعّل commitlint وتنسى ملف [[.husky/commit-msg]]، فمحدش بيتفحص (دي بالظبط المشكلة اللي في الدرس اللي فات). ورسالة أول commit بعد الإعداد نفسها لازم تعدّي: [[chore: add git hooks]] مش [[add hooks]]. وقاعدة [[subject-case]] الافتراضية بترفض subject مكتوب زي جملة بحرف كابيتال (Add coupon field)، فإما تكتب صغير أو تقفل القاعدة. ولو كتبت ملف الإعداد بـ echo من Windows PowerShell 5.1 بيتحفظ UTF-16 ومبيتقريش.`
          },
          teach: R`## الفكرة: الرسالة ليها شكل، و commitlint بيرفض أي حاجة تانية

Conventional Commits صيغة بسيطة: [[type(scope): subject]]. commitlint بيقرا الرسالة ويقارنها بقواعد، ويرجع غير صفر لو فيه مخالفة، فالـ hook بيلغي الـ commit. اتشغّل على ويندوز 11 من Git Bash (@commitlint/cli 21.2) في repo فيه husky وملف [[.husky/commit-msg]].

---

## ١. التسطيب

~~~bash
npm i -D @commitlint/cli @commitlint/config-conventional
~~~

- [[@commitlint/cli]] الأداة نفسها. [[@commitlint/]] اسمه scope في npm: باكدجات من نفس الفريق.
- [[@commitlint/config-conventional]] القواعد الجاهزة بتاعة Conventional Commits.

## ٢. ملف الإعداد

~~~bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
~~~

- [[export default { ... }]] الملف بيصدّر object الإعدادات. ده شكل ES modules، فالمشروع لازم يبقى فيه [["type": "module"]] في [[package.json]]، وإلا سمّي الملف [[commitlint.config.mjs]].
- [[extends: [...]]] خد القواعد من الباكدج دي.
- علامات التنصيص المفردة جوه المزدوجة عشان الـ shell ميقفلش النص بدري.

من غير الملف ده:

~~~text الناتج
✖   Please add rules to your $__btcommitlint.config.js$__bt
✖   found 1 problems, 0 warnings
~~~

وبيخرج بكود ٩، يعني بيرفض كل الرسايل.

---

## ٣. [[echo "fixed stuff" | npx commitlint]]

[[|]] اسمها pipe: ناتج [[echo]] بيدخل لـ commitlint كأنك كتبته. كده بتجرّب رسالة من غير ما تعمل commit.

~~~text الناتج
⧗   --- input ---
fixed stuff
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
~~~

[[fixed stuff]] مفيهاش [[:]] أصلًا، فـ commitlint ملقاش type ولا subject. وبين القوسين المربعين اسم القاعدة اللي اتكسرت، تقدر تدوّر عليه أو تقفله.

### رسايل تانية جرّبتها

| الرسالة | النتيجة | ليه |
|---|---|---|
| [[update]] | [[subject-empty]] و [[type-empty]] | مفيش [[:]] |
| [[fix:update]] | نفس الاتنين | لازم مسافة بعد [[:]] |
| [[feature: add cart]] | [[type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]]] | [[feature]] مش في القايمة |
| [[feat: Add coupon field]] | [[subject must not be sentence-case]] | الـ subject بيبدأ بحرف كابيتال |
| [[Fix: Update login.]] | ٤ أخطاء: [[subject-case]] و [[subject-full-stop]] و [[type-case]] و [[type-enum]] | كابيتال في الاتنين ونقطة في الآخر |
| [[feat(cart): add coupon field]] | مفيش ناتج، exit 0 | صح |

وتتأكد من النتيجة بـ [[echo $?]] بعد الأمر: [[$?]] exit code آخر أمر، صفر = عدّت، و ١ = اترفضت.

---

## ٤. الرسايل الصح في المثال

| الرسالة | type | scope | المعنى |
|---|---|---|---|
| [[feat(cart): add coupon field]] | [[feat]] ميزة جديدة | [[cart]] | زودت خانة كوبون في السلة |
| [[fix(auth): refresh token before expiry]] | [[fix]] تصليح bug | [[auth]] | جدّد الـ token قبل ما يخلص |
| [[chore(deps): bump vite]] | [[chore]] صيانة | [[deps]] (dependencies) | حدّثت vite |
| [[feat(api)!: rename /users to /members]] | [[feat]] و [[!]] | [[api]] | تغيير بيكسر اللي بيستخدم الـ API القديم |

الأربعة عدّوا commitlint (exit 0). والـ scope بين قوسين اختياري، والـ subject بحروف صغيرة ومن غير نقطة.

### من خلال الـ hook

[[git commit -m "..."]] لوحده من غير تغييرات متجهزة بيقف قبل الـ hooks:

~~~text الناتج
nothing added to commit but untracked files present (use "git add" to track)
~~~

فعملت ملف و [[git add]] وبعدين:

~~~bash
git commit -m "feat(api)!: rename /users to /members"
~~~

~~~text الناتج
[main 74d9d68] feat(api)!: rename /users to /members
 1 file changed, 1 insertion(+)
~~~

commitlint اشتغل من [[.husky/commit-msg]] ومطبعش حاجة لأن الرسالة صح.

---

## ٥. الـ type بيحدد رقم النسخة

أدوات زي semantic-release بتقرا الـ commits من آخر نسخة:

| فيه commit... | النسخة من [[1.2.3]] تبقى |
|---|---|
| [[fix]] بس | [[1.2.4]] (patch) |
| [[feat]] | [[1.3.0]] (minor) |
| [[!]] أو [[BREAKING CHANGE:]] | [[2.0.0]] (major) |

---

## الخلاصة

- الشكل [[type(scope): subject]]، والـ type من القايمة، ومسافة بعد [[:]]، و subject صغير من غير نقطة.
- جرّب أي رسالة بـ [[echo "..." | npx commitlint]] قبل ما تعمل commit.
- من غير [[commitlint.config.js]] كل الرسايل بتترفض (كود ٩)، ومن غير [[.husky/commit-msg]] ولا رسالة بتتفحص.`,
          lines: [
            "سطّب commitlint والقواعد القياسية.",
            "اعمل ملف الإعداد اللي بيقول استخدم Conventional Commits.",
            "جرّب رسالة من غير hook: هيرفضها ويقولك ليه.",
            "ميزة جديدة في جزء الـ cart.",
            "تصليح bug في جزء الـ auth.",
            "صيانة: تحديث مكتبة.",
            "[[!]] معناها تغيير بيكسر اللي بيستخدم الـ API القديم."
          ],
          sol: R`[[echo "update" | npx commitlint]] بيطلّع:

[[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]]. الكلمة لوحدها اتفهمت كأنها مش على الشكل [[type: subject]] خالص.

ومحاولة زي [[Fix: Update login.]] بتطلّع ٤ أخطاء: [[type must be lower-case]] و [[type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]]] و [[subject must not be sentence-case]] و [[subject may not end with full stop]]. الإصلاح: [[fix: update login]] أو أحسن [[fix(auth): refresh token before expiry]]، وساعتها commitlint مش بيطبع حاجة ويخرج بـ 0.

عشان تتأكد: [[echo $?]] بعد كل محاولة. الغلط الشائع إنك تنسى المسافة بعد النقطتين ([[fix:update]])، أو تكتب type مش في القايمة زي [[feature]] أو [[update]].`
        },
        {
          cmd: "HUSKY=0 و --no-verify",
          title: "تخطّى الـ hooks في الطوارئ",
          desc: R`[[--no-verify]] بيخلي Git ميشغّلش [[pre-commit]] و [[commit-msg]] للـ commit ده بس. و [[HUSKY=0]] بيقفل كل hooks husky للأمر ده، مفيد مع rebase اللي بيعمل commits كتير.

و [[HUSKY=2]] بيطبع خطوات husky وهو بيشغّل الـ hook (الـ PATH، والملف، والـ exit code)، عشان تعرف بيقع فين. ولو عايز سطور ملفك نفسه، حط [[set -x]] أول سطر فيه.`,
          example: R`git commit --no-verify -m "wip: save before switching"
HUSKY=0 git commit -m "wip"
HUSKY=0 git rebase -i HEAD~5
HUSKY=2 git commit -m "fix: debug hook"
git push --no-verify`,
          try: R`اعمل pre-commit بيقع دايمًا ([[exit 1]])، وجرّب commit عادي (هيترفض)، وبعدين بـ [[--no-verify]]، وبعدين بـ [[HUSKY=2]] وشوف السطور بتتطبع.`,
          deep: {
            why: "مرات محتاج تحفظ شغل نص نص بسرعة قبل ما تنقل branch، أو rebase بيعيد عشرين commit وكل واحد بيشغّل lint. ومرات الـ hook نفسه بايظ ومش عارف ليه.",
            how: R`[[--no-verify]] فلاج في Git نفسه، فبيشتغل مع أي hooks مش husky بس. في [[commit]] بيتخطّى [[pre-commit]] و [[commit-msg]]، وفي [[push]] بيتخطّى [[pre-push]].

[[HUSKY=0]] متغير بيئة husky بيقراه في أول كل hook ويخرج على طول. ميزته إنه بيغطّي أي أمر Git بيعمل commits كتير (rebase و cherry-pick و merge). والشكل [[VAR=value command]] بتاع bash و Git Bash. في PowerShell: [[$env:HUSKY=0]] وبعدين الأمر، وبعدها رجّعه.

[[HUSKY=2]] بيشغّل سكربت husky الداخلي ([[.husky/_/h]]) بـ [[set -x]]، فكل سطر فيه بيتطبع قبل ما يتنفّذ: الملف اللي هيشغّله، والـ PATH، والـ exit code. سطور ملفك نفسه مش بتتطبع، بيبان ناتجها بس، فلو محتاجها حط [[set -x]] أول سطر في الـ hook.

والمهم: التخطّي على جهازك بس. الـ CI بيشغّل نفس الفحوصات على المشروع كله، فاللي هربت منه هنا هيقع هناك.`,
            when: "commit مؤقت (wip) هتعمله squash بعدين. rebase طويل. hook بايظ وعايز تصلّحه. مش عشان «الـ lint زهّقني».",
            mistakes: R`تتعوّد على [[--no-verify]] فالـ hooks تبقى ملهاش لازمة، والـ CI يقع بعد ما رفعت. و [[$env:HUSKY=0]] في PowerShell وتنسى ترجّعه، فالـ hooks تفضل مقفولة لحد ما تقفل الترمنال.`
          },
          teach: R`## الفكرة: طريقتين تعدّي بيهم الـ hooks، وطريقة تشوف بيها بتقع فين

[[--no-verify]] فلاج في Git نفسه، و [[HUSKY=0]] و [[HUSKY=2]] متغيرات بيقراها husky. عشان نشوف الفرق بوضوح، خليت [[.husky/pre-commit]] يقع دايمًا:

~~~text .husky/pre-commit (للتجربة بس)
echo "pre-commit: blocked"
exit 1
~~~

[[exit 1]] اخرج بكود ١، يعني فشل. اتشغّل على ويندوز 11 من Git Bash ومن PowerShell 7، في repo تجربة.

---

## ١. commit عادي: اترفض

~~~text الناتج
pre-commit: blocked
husky - pre-commit script failed (code 1)
~~~

## ٢. [[git commit --no-verify -m "wip: save before switching"]]

~~~text الناتج
[main 1d61d1e] wip: save before switching
~~~

اتعمل على طول، ومفيش [[pre-commit: blocked]]: Git ماشغّلش الـ hook خالص. [[--no-verify]] في [[git commit]] بيتخطّى [[pre-commit]] و [[commit-msg]] الاتنين، للأمر ده بس.

## ٣. [[HUSKY=0 git commit -m "wip"]]

### الشكل [[VAR=value command]]

ده شكل bash (و Git Bash): المتغير موجود **للأمر ده بس**، وبعده بيختفي.

جرّبتها برسالة مش conventional خالص:

~~~text الناتج (HUSKY=0 git commit --allow-empty -m "anything")
[main ff9c84b] anything
~~~

اتقبلت. Git شغّل الـ hooks فعلًا، بس [[h]] بتاع husky بيقرا [[HUSKY]] في أوله ولو [[0]] يخرج بنجاح من غير ما يشغّل ملفاتك. فـ [[commit-msg]] اتعدّى هو كمان.

### [[HUSKY=0 git rebase -i HEAD~5]]

[[rebase -i]] بيفتح محرر عشان تعدّل آخر ٥ commits ([[HEAD~5]] = خمسة قبل الحالي)، وبيعيد عمل كل واحد. من غير [[HUSKY=0]] كل commit هيشغّل lint-staged و commitlint. ده محتاج محرر تفاعلي فماتشغّلش هنا، والفكرة نفسها اللي فوق: المتغير بيغطي كل الـ commits اللي الأمر بيعملها، و [[--no-verify]] مش فلاج في [[rebase]].

### نفس الحاجة في PowerShell

PowerShell مفيهوش شكل [[VAR=value command]]:

~~~powershell
$env:HUSKY=0; git commit --allow-empty -m "wip from pwsh"
Remove-Item Env:HUSKY
~~~

~~~text الناتج
[main 409ef79] wip from pwsh
~~~

[[$env:HUSKY=0]] بيفضل موجود في الترمنال ده لحد ما تمسحه. بعد [[Remove-Item Env:HUSKY]] جرّبت commit برسالة [["wip again"]] واترفض من [[commit-msg]] تاني ([[husky - commit-msg script failed (code 1)]]). لو نسيت تمسحه، كل commits الترمنال ده من غير فحص.

---

## ٤. [[HUSKY=2 git commit -m "fix: debug hook"]]

[[HUSKY=2]] بيشغّل سكربت husky بـ [[set -x]]: كل سطر بيتطبع قبل ما يتنفّذ، وقبله [[+]]:

~~~text الناتج (مختصر)
++ n=pre-commit
++ s=.husky/pre-commit
++ '[' '!' -f .husky/pre-commit ']'
++ '[' 2 = 0 ']'
++ export 'PATH=node_modules/.bin:/ucrt64/libexec/git-core:/c/Users/ali/bin:...'
++ sh -e .husky/pre-commit
pre-commit: blocked
++ c=1
++ '[' 1 '!=' 0 ']'
++ echo 'husky - pre-commit script failed (code 1)'
husky - pre-commit script failed (code 1)
++ exit 1
~~~

| السطر | معناه |
|---|---|
| [[n=pre-commit]] و [[s=.husky/pre-commit]] | اسم الـ hook، والملف بتاعك اللي هيشغّله |
| [[-f .husky/pre-commit]] | الملف موجود؟ لو لأ كان هيخرج بهدوء |
| [[2 = 0]] | بيشيّك على [[HUSKY=0]] |
| [[PATH=node_modules/.bin:...]] | بيضيف أدوات المشروع للـ PATH. لو أداة مش لاقيها، بص هنا |
| [[sh -e .husky/pre-commit]] | شغّل ملفك. [[-e]] يعني أول أمر يقع يوقف الملف |
| [[c=1]] | الـ exit code بتاع ملفك |

خد بالك: اللي اتطبع هو سطور **husky** نفسه. سطور ملفك ([[echo]] و [[exit 1]]) ماظهرتش بـ [[+]]، ظهر ناتجها بس. لو عايز تشوف سطور ملفك، حط [[set -x]] أول سطر فيه:

~~~text الناتج (set -x في أول .husky/pre-commit)
+ echo 'pre-commit: blocked'
pre-commit: blocked
+ exit 1
husky - pre-commit script failed (code 1)
~~~

---

## ٥. [[git push --no-verify]]

خليت [[npm test]] يقع، و [[.husky/pre-push]] فيه [[npm test]]، وعملت remote تجربة:

~~~text الناتج (git push)
1 test failed
husky - pre-push script failed (code 1)
error: failed to push some refs to '../remote.git'
~~~

~~~text الناتج (git push --no-verify)
To ../remote.git
 * [new branch]      main -> main
~~~

---

## الملخص

| الطريقة | بيتخطّى | الشكل |
|---|---|---|
| [[--no-verify]] | [[pre-commit]] و [[commit-msg]] (في commit)، [[pre-push]] (في push) | فلاج Git، أي hooks |
| [[HUSKY=0]] | كل hooks husky للأمر ده | bash: قبل الأمر. PowerShell: [[$env:HUSKY=0]] وامسحه بعدين |
| [[HUSKY=2]] | مش بيتخطّى، بيطبع خطوات husky | للـ debugging |
| [[set -x]] في ملف الـ hook | مش بيتخطّى، بيطبع سطورك | للـ debugging |

## الخلاصة

- التخطّي على جهازك بس، و CI بيعيد نفس الفحوص على المشروع كله.
- [[HUSKY=0]] و [[--no-verify]] بيعدّوا [[commit-msg]] كمان، مش [[pre-commit]] بس.
- رجّع ملف الـ hook الأصلي بعد أي تجربة زي دي.`,
          lines: [
            "commit من غير pre-commit و commit-msg، للمرة دي بس.",
            "نفس الفكرة بمتغير husky (bash و Git Bash).",
            "rebase طويل من غير ما كل commit يشغّل الـ hooks.",
            "شغّل الـ hook واطبع خطوات husky (الملف والـ PATH والـ exit code) عشان تعرف بيقع فين.",
            "push من غير pre-push."
          ],
          sol: R`مع [[.husky/pre-commit]] فيه [[echo "pre-commit: blocked"; exit 1]]:

الـ commit العادي: [[pre-commit: blocked]] و [[husky - pre-commit script failed (code 1)]] ومفيش commit. بـ [[--no-verify]]: الـ commit اتعمل على طول، والـ hook ما اشتغلش خالص (مفيش blocked). بـ [[HUSKY=2]]: husky بيطبع كل سطر من سكربته بـ [[++]] قبله، زي [[++ sh -e .husky/pre-commit]] و [[++ c=1]] و [[++ echo 'husky - pre-commit script failed (code 1)']]، فتشوف الـ PATH اللي استخدمه والـ exit code، والـ commit برضه بيترفض.

وخلي بالك إن [[HUSKY=0]] و [[--no-verify]] بيعدّوا كل الـ hooks، ومنهم [[commit-msg]]: جرّبت [[HUSKY=0 git commit -m "anything"]] واتقبلت رغم إنها مش conventional. عشان كده الـ CI لازم يعيد نفس الفحوص، الـ hooks سهل تتعدّى. ورجّع الـ pre-commit الأصلي بعد التجربة.`
        }
      ]
    }
]);
