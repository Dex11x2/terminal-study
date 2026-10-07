// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات Git والمحرر",
      l: 2,
      n: "تلات ملفات صغيرة بتمنع مشاكل كبيرة: .gitignore (إيه اللي ميترفعش)، و .gitattributes (نهايات السطور والملفات الـ binary)، و .editorconfig (كل المحررات تكتب بنفس الطريقة)",
      items: [
        {
          cmd: ".gitignore",
          title: "ملف .gitignore بيتكتب إزاي، وليه ملف اتعمله ignore لسه ظاهر؟",
          desc: R`[[.gitignore]] ملف نصي في أول المشروع (أو في أي فولدر) فيه أنماط (patterns) للملفات اللي Git يتجاهلها: متظهرش في [[git status]] ومتتضافش بـ [[git add .]]. التفاصيل في تاب Git.

الرموز (كل سطر نمط):
• [[#]] تعليق، والسطر الفاضي ملوش معنى.
• [[node_modules/]]: الـ [[/]] في الآخر يعني فولدر بس، بأي مكان في المشروع.
• [[*.log]]: [[*]] أي حروف (ماعدا [[/]])، يعني أي ملف بيخلص بـ [[.log]] في أي فولدر.
• [[.env.*]]: أي ملف اسمه بيبدأ بـ [[.env.]].
• [[!.env.example]]: [[!]] استثناء: «ماعدا ده». لازم ييجي بعد النمط اللي بيستثني منه.
• [[/config/local.json]]: [[/]] في الأول يعني من أول المشروع بس، مش [[src/config/local.json]].
• [[**/temp]]: [[**]] أي عدد فولدرات.
• [[.vscode/*]] مع [[!.vscode/extensions.json]]: تجاهل محتوى الفولدر ماعدا ملف. (لو كتبت [[.vscode/]] الفولدر كله بيتجاهل ومينفعش تستثني حاجة جواه.)

إيه اللي يتحط فيه دايمًا: المكتبات ([[node_modules/]] و [[vendor/]] و [[.venv/]])، والناتج ([[dist/]] و [[build/]] و [[target/]] و [[*.class]] و [[__pycache__/]])، والأسرار ([[.env]] و [[*.pem]] و [[*.key]])، والـ logs، وملفات الأنظمة ([[.DS_Store]] و [[Thumbs.db]])، وإعدادات المحرر الشخصية.
ابدأ من قوالب جاهزة: github.com/github/gitignore، أو gitignore.io، و GitHub بيسألك وانت بتعمل repo.

أهم حاجة تفهمها: [[.gitignore]] بيأثر على الملفات اللي Git مش متابعها (untracked) بس. لو الملف اتعمله commit قبل كده، إضافته للـ [[.gitignore]] مش هتعمل حاجة. لازم تشيله من الـ index: [[git rm --cached .env]] (بيفضل على جهازك). ولو كان سر، غيّره، لأنه لسه في تاريخ Git.

وأدوات تانية بتستخدم نفس الفكرة: [[.dockerignore]] (المستوى ده)، و [[.prettierignore]]، و [[.eslintignore]]، و [[.npmignore]]. وفيه [[.git/info/exclude]] لو عايز تتجاهل حاجة على جهازك انت بس من غير ما تغيّر ملف المشروع.`,
          example: R`# المكتبات والناتج
node_modules/
dist/
*.log
# الأسرار
.env
.env.*
!.env.example
# ملفات الأنظمة والمحررات
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json
/config/local.json`,
          flag: "script",
          try: R`في repo تجربة ([[git init]]) حط المثال في [[.gitignore]] واعمل الملفات دي: [[app.log]] و [[.env]] و [[.env.local]] و [[.env.example]] و [[config/local.json]] و [[src/config/local.json]] و [[.vscode/settings.json]] و [[.vscode/extensions.json]]. بعدين [[git status --short -uall]]، و [[git check-ignore -v .env.local app.log src/config/local.json]]. وآخر حاجة: اعمل commit لملف [[secret.txt]] وبعدين حطه في [[.gitignore]] وعدّله، وشوف [[git status]].`,
          deep: {
            why: R`أي مشروع فيه ملفات متولدة (ممكن تتعمل تاني بأمر) أو شخصية أو سرية. رفعها على Git بيتقل الـ repo ويعمل conflicts على حاجات ملهاش لازمة ويسرّب الأسرار. والـ [[.gitignore]] بيخلي [[git add .]] آمن.`,
            how: R`لكل ملف untracked، Git بيمشي على الأنماط من فوق لتحت، وآخر نمط يطابق هو اللي بيكسب (عشان كده [[!]] لازم ييجي بعد). والأنماط بتتقري من [[.gitignore]] اللي في نفس الفولدر والفولدرات اللي فوقه و [[.git/info/exclude]] و [[core.excludesFile]] (ملف عام لجهازك). و [[git check-ignore -v]] بيقولك بالظبط أنهي سطر في أنهي ملف هو السبب.`,
            when: R`أول ملف تعمله في أي repo، قبل أول [[git add]]. وكل ما أداة جديدة تعمل فولدر ناتج أو cache.`,
            mistakes: R`تحط الملف في [[.gitignore]] بعد ما اتعمله commit وتستغرب إنه لسه بيتتابع ([[git rm --cached]]). تعمل ignore لـ [[package-lock.json]] (لازم يترفع). تكتب [[.vscode/]] وبعدين [[!.vscode/extensions.json]] فالاستثناء ميشتغلش. وتفتكر إن [[.gitignore]] بيحمي من الـ leaks: لو حد عمل [[git add -f]] الملف بيترفع.`
          },
          teach: R`## الفكرة

المثال ملف [[.gitignore]] جاهز لمشروع Node. هنقراه نمط نمط، وبعدين نجرّبه في repo تجربة فيه ملفات بأسامي مقصودة ونشوف Git شايف إيه ومتجاهل إيه. كل ده اتجرّب بـ Git 2.56 على ويندوز (Git Bash).

---

## ١. التعليقات

~~~text
# المكتبات والناتج
~~~

أي سطر بيبدأ بـ [[#]] تعليق، والسطور الفاضية ملهاش معنى. التعليقات بتتحسب في ترقيم السطور، وده هيفرق تحت في [[git check-ignore]].

---

## ٢. المكتبات والناتج

~~~text
node_modules/
dist/
*.log
~~~

| النمط | بيطابق |
|---|---|
| [[node_modules/]] | فولدر اسمه [[node_modules]] في **أي** مكان. الـ [[/]] في الآخر معناها «فولدر بس»، فلو فيه ملف اسمه [[node_modules]] مش هيتأثر |
| [[dist/]] | فولدر الناتج بتاع الـ build |
| [[*.log]] | [[*]] = أي حروف ماعدا [[/]]. فـ أي ملف آخره [[.log]] في أي فولدر |

---

## ٣. الأسرار والاستثناء

~~~text
.env
.env.*
!.env.example
~~~

- [[.env]]: الملف ده بالاسم ده.
- [[.env.*]]: أي ملف بيبدأ بـ [[.env.]]: [[.env.local]] و [[.env.production]]، و [[.env.example]] كمان!
- [[!.env.example]]: [[!]] يعني «ماعدا». بيرجّع [[.env.example]] تاني عشان يترفع (فيه أسامي المتغيرات من غير قيم، للفريق).

Git بيمشي على الأنماط من فوق لتحت، و**آخر نمط يطابق هو اللي يكسب**. عشان كده [[!]] لازم ييجي بعد [[.env.*]]: لو جه قبله، [[.env.*]] هيطابق بعده ويتجاهل الملف تاني.

---

## ٤. ملفات الأنظمة والمحررات

~~~text
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json
/config/local.json
~~~

- [[.DS_Store]]: ملف الماك بيعمله في كل فولدر تفتحه (DS = Desktop Services).
- [[Thumbs.db]]: ويندوز القديم بيحفظ فيه الصور المصغرة.
- [[.vscode/*]] ثم [[!.vscode/extensions.json]]: تجاهل **محتوى** الفولدر، ماعدا ملف الإضافات المقترحة للفريق.
- [[/config/local.json]]: [[/]] في **الأول** معناها «من أول الـ repo». فبيطابق [[config/local.json]] بس، مش [[src/config/local.json]].

ليه [[.vscode/*]] مش [[.vscode/]]؟ جرّبنا نغيّرها لـ [[.vscode/]]: الفولدر كله اختفى من [[git status]] و [[extensions.json]] معاه، والاستثناء ماشتغلش. Git لما بيتجاهل فولدر مبيدخلوش أصلًا، فمبيشوفش اللي جواه عشان يستثنيه.

---

## ٥. التجربة: [[git status --short -uall]]

في repo جديد حطينا المثال، وعملنا الملفات دي: [[app.log]] و [[.env]] و [[.env.local]] و [[.env.example]] و [[config/local.json]] و [[src/config/local.json]] و [[.vscode/settings.json]] و [[.vscode/extensions.json]] و [[node_modules/x/i.js]] و [[dist/a.js]] و [[logs.txt]].

~~~bash
git status --short -uall
~~~

- [[--short]]: سطر لكل ملف بدل الكلام الطويل.
- [[-uall]] (untracked all): اعرض كل ملف untracked لوحده. من غيره Git بيكتب [[?? src/]] بدل الملف اللي جواه.

~~~text الناتج
?? .env.example
?? .gitignore
?? .vscode/extensions.json
?? logs.txt
?? src/config/local.json
~~~

[[??]] يعني untracked: Git شايفه ومش بيتابعه لسه. كل اللي مش في الليستة اتجاهل. لاحظ:

- [[logs.txt]] ظاهر: [[*.log]] عايز الاسم **يخلص** بـ [[.log]]، و [[logs.txt]] آخره [[.txt]].
- [[src/config/local.json]] ظاهر: بسبب [[/]] اللي في أول النمط.
- [[.env.example]] و [[.vscode/extensions.json]] ظاهرين: الاستثناءات اشتغلت.

---

## ٦. مين السبب؟ [[git check-ignore -v]]

~~~bash
git check-ignore -v .env.local app.log src/config/local.json .env.example node_modules/x/i.js
~~~

[[check-ignore]] بيقولك الملفات دي متجاهلة ولا لأ، و [[-v]] (verbose) بيقول كمان السطر المسؤول:

~~~text الناتج
.gitignore:7:.env.*	.env.local
.gitignore:4:*.log	app.log
.gitignore:8:!.env.example	.env.example
.gitignore:2:node_modules/	node_modules/x/i.js
~~~

اقرا كل سطر كده: [[الملف:رقم السطر:النمط]] وبعدين Tab واسم الملف اللي سألت عليه. [[*.log]] في السطر ٤ مش ٣ لأن السطر الأول تعليق.

- [[src/config/local.json]] مطلعش خالص: مفيش نمط بيطابقه.
- [[.env.example]] طلع بس النمط بيبدأ بـ [[!]]: مع [[-v]] Git بيوريك آخر نمط طابق حتى لو كان استثناء. يعني الملف **مش** متجاهل.

---

## ٧. الفخ: ملف اتعمله commit قبل كده

عملنا commit لـ [[secret.txt]]، وبعدين ضفناه في آخر [[.gitignore]] وعدّلناه:

~~~text git status --short
 M secret.txt
~~~

[[M]] (modified): Git لسه بيتابعه عادي. و [[git check-ignore -v secret.txt]] مطبعش حاجة (exit code 1)، لأنه بيجاوب على الملفات اللي في الـ index كأنها مش متجاهلة. مع [[--no-index]] بيعترف إن النمط موجود:

~~~text git check-ignore -v --no-index secret.txt
.gitignore:15:secret.txt	secret.txt
~~~

الحل:

~~~bash
git rm --cached secret.txt
~~~

- [[rm]]: شيل الملف من Git.
- [[--cached]]: من الـ index بس (اللي Git متابعه)، وسيب الملف على الديسك.

~~~text git status --short بعدها
D  secret.txt
~~~

[[D]] في العمود الأول: الحذف جاهز للـ commit. والملف لسه موجود عندك ([[ls secret.txt]] لقاه). وبعد الـ commit Git مش هيتابعه تاني. ولو كان فيه سر حقيقي غيّره: النسخة القديمة لسه في تاريخ Git.

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[#]] | تعليق |
| [[name/]] | فولدر بس، في أي مكان |
| [[*]] | أي حروف ماعدا [[/]] |
| [[**]] | أي عدد فولدرات |
| [[/name]] | من أول الـ repo بس |
| [[!pattern]] | استثناء، ولازم ييجي بعد |

[[.gitignore]] بيأثر على الملفات اللي **مش** متابَعة بس. و [[git check-ignore -v]] بيقولك أنهي سطر هو السبب.`,
          lines: [
            R`أي فولدر اسمه [[node_modules]] في أي مكان.`,
            R`فولدر الناتج.`,
            R`أي ملف [[.log]] في أي فولدر.`,
            R`ملف الأسرار.`,
            R`أي [[.env.]] وبعدها أي حاجة: [[.env.local]] و [[.env.production]].`,
            R`[[!]] استثناء: [[.env.example]] يترفع (لازم ييجي بعد السطر اللي فوقه).`,
            R`ملف بيعمله الماك في كل فولدر.`,
            R`ملف بيعمله ويندوز للصور المصغرة.`,
            R`محتوى فولدر VS Code...`,
            R`...ماعدا ليستة الإضافات المقترحة للفريق.`,
            R`[[/]] في الأول: الملف ده في أول المشروع بس.`
          ],
          sol: R`[[git status --short -uall]] بيعرض بس:
[[?? .env.example]]
[[?? .gitignore]]
[[?? .vscode/extensions.json]]
[[?? src/config/local.json]]
يعني [[src/config/local.json]] ظاهر لأن النمط [[/config/...]] للفولدر اللي في الأول بس.

و [[git check-ignore -v]] بيطبع السطر المسؤول:
[[.gitignore:7:.env.*	.env.local]]
[[.gitignore:4:*.log	app.log]]
ومبيطبعش حاجة لـ [[src/config/local.json]] لأنه مش متجاهل.

وتجربة [[secret.txt]]: بعد التعديل [[git status]] بيقول [[modified: secret.txt]] رغم إنه في [[.gitignore]]، لأنه tracked. الحل [[git rm --cached secret.txt]] وبعدين commit.`
        },
        {
          cmd: ".gitattributes",
          title: "ملف .gitattributes بيعمل إيه، وإزاي يحل مشكلة LF و CRLF للفريق كله؟",
          desc: R`[[.gitattributes]] بيقول لـ Git يتعامل مع كل نوع ملف إزاي: نصي ولا binary، ونهايات سطوره إيه، ويعرض الـ diff بتاعه ولا لأ. أشهر استخدام: إنهاء مشكلة LF و CRLF (درس LF و CRLF) لكل الناس مرة واحدة، بدل ما كل واحد يظبط [[core.autocrlf]] على جهازه.

الشكل: كل سطر [[pattern attribute attribute ...]]، والأنماط زي [[.gitignore]].

الخصائص المهمة:
• [[text=auto]]: Git يحدد لوحده الملف نصي ولا لأ، والنصي يتخزن في الـ repo بـ LF دايمًا.
• [[eol=lf]]: الملف يطلع على جهازك (working tree) بـ LF حتى على ويندوز. ده اللي عايزه لأي حاجة هتشتغل على لينكس أو Docker.
• [[eol=crlf]]: يطلع بـ CRLF دايمًا. لملفات ويندوز: [[*.bat]] و [[*.cmd]] و [[*.ps1]] و [[*.sln]].
• [[binary]]: متلمسش الملف خالص (ولا تحويل نهايات سطور ولا diff نصي). للصور والخطوط والـ zip، احتياطي لو Git خمّن غلط.
• [[-diff]]: ميعرضش الـ diff (مفيد لـ [[package-lock.json]] الطويل).
• [[linguist-generated]] و [[linguist-vendored]]: GitHub ميحسبش الملف في لغات الـ repo ويطوي الـ diff بتاعه في الـ pull request.
• [[filter=lfs diff=lfs merge=lfs -text]]: الملف يتخزن في Git LFS (للملفات الكبيرة زي الفيديوهات)، والسطر ده [[git lfs track "*.mp4"]] بيكتبه لوحده.

بعد ما تضيف الملف لمشروع قديم، الملفات الموجودة متتغيرش لوحدها. نفّذ [[git add --renormalize .]] وبعدين commit، وده بيعيد تخزين كل ملف بالقواعد الجديدة. و [[git ls-files --eol]] بيعرض لكل ملف نهايات سطوره في الـ repo ([[i/]]) وعلى جهازك ([[w/]]) والـ attributes اللي عليه.`,
          example: R`# كل الملفات النصية تتحفظ في Git بـ LF
* text=auto eol=lf
# ملفات ويندوز تفضل CRLF
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf
# ملفات binary: متلمسهاش
*.png binary
*.jpg binary
# الـ lock مايظهرش في الـ diff
package-lock.json -diff linguist-generated`,
          flag: "script",
          try: R`في repo تجربة: [[git config core.autocrlf false]]، واعمل [[run.sh]] بـ CRLF ([[printf 'echo hi\r\n' > run.sh]]) و [[build.bat]] بـ LF وحط أي صورة، واعمل commit. نفّذ [[git ls-files --eol]]. بعدين حط المثال في [[.gitattributes]] ونفّذ [[git add --renormalize .]] و [[git status --short]] واعمل commit، وبعدين [[git ls-files --eol]] تاني و [[git check-attr -a run.sh build.bat logo.png]].`,
          deep: {
            why: R`[[core.autocrlf]] إعداد على جهاز كل واحد، ولو واحد في الفريق نسي يظبطه، بيرفع CRLF وكل الملفات تظهر متغيرة. [[.gitattributes]] جوه الـ repo نفسه، فالقاعدة بتمشي مع الكود وبتغطي على إعدادات الأجهزة.`,
            how: R`Git عنده «فلتر» بيشتغل في اتجاهين: وهو بيحفظ (add) بيحوّل الملفات اللي عليها [[text]] لـ LF، ووهو بيطلّعها (checkout) بيحوّلها للـ [[eol]] المطلوب. عشان كده بعد الـ renormalize الـ index بقى [[i/lf]] بس الملفات اللي على جهازك لسه [[w/crlf]] لحد ما تعمل checkout تاني أو clone جديد.`,
            when: R`في أي مشروع فيه ناس على ويندوز وناس على لينكس أو ماك، أو فيه سكربتات [[.sh]] و Dockerfile. حطه من أول يوم.`,
            mistakes: R`تحطه في مشروع قديم من غير [[--renormalize]] فميتغيرش حاجة. تحط [[* text eol=lf]] من غير [[auto]] فـ Git يعامل الصور كنص ويبوّظها. وتنسى [[*.bat eol=crlf]] فسكربتات ويندوز تتحول LF.`
          },
          teach: R`## الفكرة

المثال ملف [[.gitattributes]] بيقول لـ Git: كل الملفات النصية LF، وسكربتات ويندوز CRLF، والصور متتلمسش. هنقراه، وبعدين نجرّبه على repo فيه ٣ ملفات متلخبطة ونشوف قبل وبعد. اتجرّب بـ Git 2.56 على ويندوز (Git Bash)، مع [[git config core.autocrlf false]] جوه الـ repo عشان إعداد الجهاز ميغطّيش على التجربة.

---

## ١. شكل السطر

~~~text
pattern  attribute  attribute ...
~~~

النمط زي [[.gitignore]] ([[*]] و [[*.bat]] واسم ملف)، وبعده خاصية أو أكتر بمسافات. والخاصية بتتكتب ٣ أشكال:

| الشكل | معناه | مثال |
|---|---|---|
| [[name]] | شغّلها (set) | [[binary]] |
| [[-name]] | اقفلها (unset) | [[-diff]] |
| [[name=value]] | ادّيها قيمة | [[eol=lf]] |

ولو ملف طابق أكتر من سطر، السطر اللي **تحت** بيكسب في الخاصية اللي اتكررت.

---

## ٢. السطر الأساسي: [[* text=auto eol=lf]]

- [[*]]: كل الملفات.
- [[text=auto]]: Git يخمّن لوحده الملف نصي ولا لأ (بيدوّر على byte صفر في أوله). النصي بيتخزن في الـ repo بـ LF دايمًا.
- [[eol=lf]] (end of line): ولما يطلّع الملف على جهازك (checkout) يطلّعه بـ LF، حتى على ويندوز.

## ٣. سكربتات ويندوز: [[*.bat text eol=crlf]]

[[text]] من غير [[auto]] يعني «ده نصي أكيد»، و [[eol=crlf]] يطلع على الجهاز بـ CRLF (درس LF و CRLF). وده للـ [[.bat]] و [[.cmd]] و [[.ps1]]، لأن cmd ممكن يتلخبط في ملفات [[.bat]] اللي بـ LF. السطور دي تحت [[*]]، فبتغطي على [[eol=lf]] للملفات دي بس.

## ٤. [[*.png binary]] و [[*.jpg binary]]

[[binary]] اختصار لـ [[-text -diff -merge]]: متحوّلش نهايات سطور، ومتعرضش diff نصي، ومتحاولش تدمج نسختين. [[text=auto]] غالبًا هيعرف إن الصورة binary لوحده، بس السطر ده احتياطي.

## ٥. [[package-lock.json -diff linguist-generated]]

- [[-diff]]: [[git diff]] يكتب سطر واحد [[Binary files a/package-lock.json and b/package-lock.json differ]] بدل آلاف السطور (جرّبناها).
- [[linguist-generated]]: خاصية GitHub بيقراها (مش Git): الملف متولّد، فيطويه في الـ pull request ومش يحسبه في لغات الـ repo.

---

## ٦. التجربة: قبل الملف

عملنا ٣ ملفات واتعملهم commit من غير [[.gitattributes]]:

- [[run.sh]] بـ CRLF ([[printf 'echo hi\r\n']])، يعني متلخبط.
- [[build.bat]] بـ LF.
- [[logo.png]]: أول bytes من ملف PNG.

~~~bash
git ls-files --eol
~~~

~~~text الناتج
i/lf    w/lf    attr/                 	build.bat
i/-text w/-text attr/                 	logo.png
i/crlf  w/crlf  attr/                 	run.sh
~~~

| العمود | معناه |
|---|---|
| [[i/]] | index: الملف متخزن في Git إزاي |
| [[w/]] | working tree: الملف على جهازك إزاي |
| [[attr/]] | الخصائص اللي عليه من [[.gitattributes]] (فاضية لسه) |

[[-text]] يعني Git شايفه مش نص. والمشكلة: [[i/crlf]] قدام [[run.sh]]، يعني CRLF دخل الـ repo، ولو السكربت أوله [[#!/bin/bash]]، لينكس هيرفض يشغّله بـ [[/bin/bash^M: bad interpreter]] (درس LF و CRLF).

---

## ٧. نحط الملف ونعيد التخزين: [[git add --renormalize .]]

حطينا المثال في [[.gitattributes]]. الملفات اللي في الـ repo **مبتتغيرش لوحدها**، فلازم:

~~~bash
git add --renormalize .
git status --short
~~~

[[--renormalize]]: أعد إضافة كل الملفات المتابَعة بالقواعد الجديدة، حتى لو محتواها على الديسك متغيرش. و [[.]] الفولدر الحالي وكل اللي تحته.

~~~text الناتج
M  run.sh
?? .gitattributes
~~~

- [[M ]] في العمود الأول: [[run.sh]] اتغير في الـ index (اتحفظ LF). [[build.bat]] و [[logo.png]] متغيروش لأنهم كانوا صح.
- [[?? .gitattributes]]: [[--renormalize]] بيلمس الملفات المتابعة بس، فالملف الجديد نفسه محتاج [[git add .gitattributes]] لوحده. متنساهوش، من غيره باقي الفريق مش هياخد القواعد.

وبعد الـ commit:

~~~text git ls-files --eol
i/lf    w/lf    attr/text eol=crlf    	build.bat
i/-text w/-text attr/-text            	logo.png
i/lf    w/crlf  attr/text=auto eol=lf 	run.sh
~~~

- [[run.sh]]: [[i/lf]] الـ repo بقى سليم، بس [[w/crlf]] الملف على الديسك لسه زي ما هو: Git مبيعيدش كتابة ملفاتك وهو بيعمل add.
- [[build.bat]]: [[attr/text eol=crlf]]، بس لسه [[w/lf]] لنفس السبب.

## ٨. checkout بيطبّق القواعد

مسحنا الملفين وطلّعناهم تاني من Git:

~~~bash
rm run.sh build.bat
git checkout -- run.sh build.bat
~~~

[[--]] معناها «اللي بعدي أسامي ملفات مش أسامي branches».

~~~text git ls-files --eol
i/lf    w/crlf  attr/text eol=crlf    	build.bat
i/lf    w/lf    attr/text=auto eol=lf 	run.sh
~~~

دلوقتي كل حاجة زي ما الملف قال: [[build.bat]] على الجهاز CRLF وفي الـ repo LF، و [[run.sh]] LF في الحتتين. و [[od -c build.bat]] (بيطبع الملف حرف حرف) أكّد إن آخر كل سطر بقى [[\r \n]].

---

## ٩. [[git check-attr -a]]

~~~bash
git check-attr -a run.sh build.bat logo.png
~~~

[[-a]] (all): كل الخصائص اللي على الملف ده:

~~~text الناتج
run.sh: text: auto
run.sh: eol: lf
build.bat: text: set
build.bat: eol: crlf
logo.png: binary: set
logo.png: diff: unset
logo.png: merge: unset
logo.png: text: unset
logo.png: eol: lf
~~~

[[set]] = شغّالة، و [[unset]] = مقفولة. لاحظ إن [[binary]] اتفرد لـ [[diff: unset]] و [[merge: unset]] و [[text: unset]]. و [[eol: lf]] على الصورة جاية من سطر [[*]]، بس ملهاش تأثير لأن [[text]] مقفول.

---

## الخلاصة

| الخاصية | بتعمل إيه |
|---|---|
| [[text=auto]] | Git يحدد النصي، ويخزّنه LF |
| [[eol=lf]] / [[eol=crlf]] | الملف يطلع على الجهاز بالنهاية دي |
| [[binary]] | متلمسش: من غير تحويل ولا diff ولا merge |
| [[-diff]] | متعرضش diff |
| [[linguist-generated]] | GitHub يطويه |

ولمشروع قديم: [[git add .gitattributes]] و [[git add --renormalize .]] ثم commit. والملفات اللي على جهازك بتتصلّح مع أول checkout أو clone جديد.`,
          lines: [
            R`[[*]] كل الملفات: Git يحدد النصي لوحده، ويطلّعه LF على كل الأجهزة.`,
            R`ملفات CMD تطلع CRLF.`,
            R`نفس الكلام لـ [[.cmd]].`,
            R`و PowerShell.`,
            R`الصور binary: من غير تحويل ولا diff نصي.`,
            R`نفس الكلام.`,
            R`[[-diff]] من غير diff، و [[linguist-generated]] GitHub يطويه.`
          ],
          sol: R`قبل الملف:
[[i/lf    w/lf    attr/                 	build.bat]]
[[i/-text w/-text attr/                 	logo.png]]
[[i/crlf  w/crlf  attr/                 	run.sh]]
يعني [[run.sh]] اتحفظ في الـ repo بـ CRLF.

[[git status --short]] بعد الـ renormalize: [[M  run.sh]] (اتغير في الـ index لـ LF).
وبعد الـ commit:
[[i/lf    w/lf    attr/text eol=crlf    	build.bat]]
[[i/-text w/-text attr/-text            	logo.png]]
[[i/lf    w/crlf  attr/text=auto eol=lf 	run.sh]]
([[w/crlf]] لسه لأن الملف اللي على جهازك متلمسش، وهيبقى LF مع أول checkout. و [[build.bat]] هيطلع CRLF.)

و [[git check-attr -a]] بيطبع مثلًا [[run.sh: eol: lf]] و [[build.bat: eol: crlf]] و [[logo.png: binary: set]].`
        },
        {
          cmd: ".editorconfig",
          title: "ملف .editorconfig بيعمل إيه، وإزاي يخلي كل المحررات تكتب بنفس الطريقة؟",
          desc: R`[[.editorconfig]] ملف في أول المشروع بيقول لأي محرر (VS Code و JetBrains و Vim و Visual Studio) يكتب الملفات إزاي: مسافات ولا Tab، وكام مسافة، والترميز، ونهايات السطور، وسطر جديد في آخر الملف. كده كل واحد في الفريق يفتح المشروع بمحرره، والملفات تتكتب بنفس الطريقة.

الصيغة شبه INI:
• [[root = true]] فوق خالص: «ده أول المشروع، متدوّرش على [[.editorconfig]] في الفولدرات اللي فوق».
• [[[*]]]: قسم بنمط ملفات. [[*]] كل الملفات، و [[[*.py]]] ملفات Python، و [[[*.{js,ts}]]] الاتنين، و [[[Makefile]]] ملف بالاسم.
• تحت كل قسم [[key = value]]. الأقسام اللي تحت بتغطي على اللي فوق للملفات اللي تطابقها.
• [[#]] أو [[;]] تعليق.

الإعدادات:
• [[charset = utf-8]].
• [[end_of_line = lf]] (أو [[crlf]]).
• [[indent_style = space]] أو [[tab]]، و [[indent_size = 2]].
• [[insert_final_newline = true]]: سطر جديد في آخر الملف.
• [[trim_trailing_whitespace = true]]: يشيل المسافات اللي في آخر السطور. (في Markdown خليها [[false]] لأن مسافتين في آخر السطر معناها سطر جديد.)
• [[max_line_length]]: بعض المحررات بتستخدمه.

VS Code محتاج إضافة EditorConfig for VS Code عشان يقراه. JetBrains و Visual Studio بيقروه لوحدهم. وفي CI: [[npx editorconfig-checker]] بيقولك أنهي ملف مخالف.

الفرق بينه وبين Prettier: [[.editorconfig]] بيظبط الكتابة الأساسية في المحرر لأي لغة، و Prettier ([[.prettierrc]]) بيعيد تنسيق الكود نفسه (أقواس وفواصل وطول السطر) للغات اللي بيفهمها، وبيقرا [[.editorconfig]] كمان.`,
          example: R`# الملف ده في أول المشروع
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.py]
indent_size = 4

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false`,
          flag: "script",
          try: R`حط المثال في [[.editorconfig]] في فولدر تجربة، ونزّل إضافة EditorConfig في VS Code. اعمل [[a.py]] واكتب دالة ودوس Tab جوه (هتلاقيها ٤ مسافات)، و [[b.js]] (مسافتين). اكتب سطر بمسافات في آخره واحفظ. وبعدين اعمل [[Makefile]] بسطر داخل بمسافات بإيدك ونفّذ [[npx editorconfig-checker]].`,
          deep: {
            why: R`المسافات والـ Tabs ونهايات السطور حاجات «مش مرئية»، فكل واحد في الفريق محرره بيعمل حاجة مختلفة، والنتيجة diffs مليانة تغييرات فاضية و conflicts وملفات Python أو Makefile بتقع. ملف واحد صغير في الـ repo بيحسم ده لكل المحررات.`,
            how: R`لما تفتح ملف، الإضافة بتدوّر على [[.editorconfig]] في فولدر الملف وكل الفولدرات اللي فوقه لحد ما تلاقي [[root = true]]، وتطبق الأقسام اللي بتطابق اسم الملف بالترتيب (الأخير يكسب)، وتظبط المحرر للملف ده بس. وبتطبق [[trim_trailing_whitespace]] و [[insert_final_newline]] وقت الحفظ.`,
            when: R`في أي مشروع فيه أكتر من شخص أو أكتر من محرر، ومعاه [[.gitattributes]] (Git) و Prettier (التنسيق).`,
            mistakes: R`تحطه ومتسطّبش الإضافة في VS Code فميحصلش حاجة. تحط [[indent_style = space]] على [[Makefile]] (لازم Tab). تنسى [[root = true]] فإعدادات من فولدر فوق المشروع تتطبق. وتشيل المسافات من آخر السطور في Markdown فالـ line breaks تضيع.`
          },
          teach: R`## الفكرة

المثال ملف [[.editorconfig]] فيه قسم عام لكل الملفات، و ٣ أقسام بتغيّر حاجة واحدة لنوع ملف معين. هنقراه سطر سطر، وبعدين نفحص ملفات مخالفة بـ [[editorconfig-checker]] ونقرا رسايله. الفحص اتجرّب على ويندوز بـ [[npx editorconfig-checker]] (نزّل البرنامج نفسه نسخة 4.0.2). وسلوك المحرر نفسه (VS Code مع الإضافة) من الـ docs.

---

## ١. [[root = true]]

~~~text
# الملف ده في أول المشروع
root = true
~~~

السطر الأول تعليق ([[#]] أو [[;]]). و [[root = true]] بيقول للمحرر: «وقف هنا». المحرر وهو بيفتح ملف بيدوّر على [[.editorconfig]] في فولدر الملف، وبعدين اللي فوقه، واللي فوقه... لحد ما يلاقي واحد فيه [[root = true]]. من غيره ممكن يلاقي [[.editorconfig]] قديم في [[C:\Users\ali]] مثلًا ويطبّقه على مشروعك.

لاحظ إن [[root]] مكتوب بره أي قسم، فوق خالص. ده المكان الوحيد المسموح ليه.

---

## ٢. القسم العام [[[*]]]

~~~text
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
~~~

الأقواس المربعة [[[ ]]] بتبدأ قسم، وجواها نمط اسم ملف. [[*]] يعني كل الملفات. وتحته [[key = value]]:

| الإعداد | معناه |
|---|---|
| [[charset = utf-8]] | احفظ بـ UTF-8 من غير BOM (درس UTF-8) |
| [[end_of_line = lf]] | نهاية السطر LF مش CRLF |
| [[indent_style = space]] | زرار Tab يكتب مسافات |
| [[indent_size = 2]] | كل مستوى مسافتين |
| [[insert_final_newline = true]] | لازم سطر جديد في آخر الملف |
| [[trim_trailing_whitespace = true]] | امسح المسافات اللي في آخر أي سطر وقت الحفظ |

---

## ٣. الأقسام اللي بتغيّر

~~~text
[*.py]
indent_size = 4

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
~~~

- [[[*.py]]]: ملفات Python مسافاتها ٤ (العُرف في PEP 8). باقي الإعدادات (UTF-8 و LF...) جاية من [[[*]]].
- [[[Makefile]]]: ملف بالاسم ده بالظبط، وأوامره **لازم** Tab حقيقي (درس Makefile).
- [[[*.md]]]: في Markdown مسافتين في آخر السطر معناهم «سطر جديد»، فممنوع تتمسح.

الملف بيتقري من فوق لتحت، ولو ملف طابق كذا قسم، القسم اللي تحت بيكسب في الإعداد اللي اتكرر. فـ [[a.py]] بياخد كل [[[*]]] وبعدين [[indent_size = 4]] يغطي على 2.

ولو عايز نوعين في قسم واحد: [[[*.{js,ts}]]] (الأقواس المعووجة [[{ }]] = واحد من دول).

---

## ٤. الفحص: [[npx editorconfig-checker]]

المحرر بيطبّق الإعدادات وانت بتكتب، بس مبيصلّحش ملفات اتكتبت غلط قبل كده. [[editorconfig-checker]] بيقرا نفس الملف ويقولك مين مخالف. عملنا ٤ ملفات غلط عن قصد:

| الملف | الغلط |
|---|---|
| [[Makefile]] | سطر الأمر داخل بـ ٤ مسافات |
| [[a.py]] | سطر داخل بمسافتين |
| [[b.js]] | مسافة في آخر السطر |
| [[c.md]] | مسافتين في آخر السطر (مسموح) |

~~~powershell
npx -y editorconfig-checker
~~~

[[-y]] بيوافق على تنزيل الحزمة من غير سؤال.

~~~text الناتج
Makefile:
	2: wrong indentation type (spaces instead of tabs)
a.py:
	2: wrong amount of left-padding spaces(want multiple of 4)
b.js:
	1: trailing whitespace

3 errors found
~~~

- الرقم قبل [[:]] رقم السطر.
- [[wrong indentation type]]: نوع الإزاحة غلط، مسافات والمفروض Tab.
- [[left-padding spaces(want multiple of 4)]]: عدد المسافات في أول السطر لازم يتقسم على ٤.
- [[trailing whitespace]]: مسافات في آخر السطر.
- [[c.md]] مطلعش: قسم [[[*.md]]] اشتغل.

ولما الغلط ٣، الأمر خرج بـ exit code 1، وده اللي بيخلي الـ CI يفشل.

وتجربة تانية: [[d.js]] من غير سطر جديد في آخره، و [[e.py]] بـ CRLF:

~~~text الناتج
d.js:
	wrong line endings or no final newline
e.py:
	not all lines have the correct end of line character
	wrong line endings or no final newline

3 errors found
~~~

دول [[insert_final_newline]] و [[end_of_line]]. ومن غير رقم سطر لأنهم عن الملف كله.

---

## ٥. في المحرر

حسب docs موقع editorconfig.org: JetBrains و Visual Studio بيقروا الملف لوحدهم، و VS Code محتاج إضافة «EditorConfig for VS Code». بعدها لما تفتح [[a.py]] شريط الحالة تحت بيكتب [[Spaces: 4]]، وفي [[b.js]] [[Spaces: 2]]. والمحرر بيطبّق الإعدادات وانت بتكتب وتحفظ بس، مش بيعيد تنسيق الملفات القديمة.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| وقف الدوّير لفوق | [[root = true]] أول الملف |
| إعدادات لكل الملفات | [[[*]]] |
| استثناء لنوع | قسم بنمطه تحت العام |
| فحص في CI | [[npx editorconfig-checker]] |

[[.editorconfig]] = المحرر يكتب إزاي، و [[.gitattributes]] = Git يخزّن إزاي، و Prettier = الكود نفسه يتنسق إزاي.`,
          lines: [
            R`ده أول المشروع، متدوّرش فوقه.`,
            R`قسم لكل الملفات.`,
            R`الترميز UTF-8 من غير BOM.`,
            R`نهايات سطور LF.`,
            R`مسافات مش Tab.`,
            R`كل مستوى مسافتين.`,
            R`سطر جديد في آخر الملف.`,
            R`شيل المسافات من آخر السطور وقت الحفظ.`,
            R`ملفات Python بس...`,
            R`...٤ مسافات (العُرف في Python).`,
            R`ملف اسمه Makefile بالظبط...`,
            R`...لازم Tab (درس Makefile).`,
            R`ملفات Markdown...`,
            R`...متشيلش المسافات اللي في آخر السطر.`
          ],
          sol: R`في [[a.py]] الـ Tab بيكتب ٤ مسافات، وفي [[b.js]] مسافتين، والمسافات اللي في آخر السطر بتختفي لما تحفظ. VS Code بيكتب تحت في الـ status bar [[Spaces: 4]] أو [[Spaces: 2]] على حسب الملف.

و [[npx editorconfig-checker]] على ملفات فيها مخالفات بيطبع:
[[Makefile:]]
[[	2: wrong indentation type (spaces instead of tabs)]]
[[a.py:]]
[[	2: wrong amount of left-padding spaces(want multiple of 4)]]
[[b.js:]]
[[	1: trailing whitespace]]
[[3 errors found]]`
        }
      ]
    }
]);
