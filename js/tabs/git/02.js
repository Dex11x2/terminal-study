// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "Branches والـ remote",
      l: 2,
      n: "",
      items: [
        {
          cmd: "git switch / branch",
          title: "اشتغل على فرع منفصل",
          desc: R`الـ branch خط شغل موازي: بتعمل فيه commits من غير ما تلمس main، ولما الشغل يخلص ويشتغل بتدمجه. كده main بيفضل دايمًا شغال، وكل ميزة أو إصلاح في branch باسمها، زي [[feature/login]] (الـ [[/]] جزء من الاسم، للتنظيم بس).

[[git branch]] لوحدها بتعرض الـ branches اللي عندك، والنجمة [[*]] جنب اللي انت عليها. [[git switch -c feature/login]] بتعمل branch جديدة من مكانك الحالي وتنقلك لها ([[-c]] يعني create)، و [[git switch main]] بترجّعك، وملفاتك بتتغير لنسخة الـ branch دي. [[-a]] بتعرض كمان الـ branches اللي على GitHub (بتبدأ بـ [[remotes/origin/]]). و [[branch -d]] بتمسح branch اتدمجت خلاص، وبترفض لو لسه متدمجتش.

قبل ما تعمل switch اعمل commit أو stash للتعديلات، وإلا هتمشي معاك أو Git هيرفض. وهتلاقي في شروحات قديمة [[git checkout]] بنفس المعنى.`,
          example: R`git branch
git switch -c feature/login
git switch main
git branch -a
git branch -d feature/login`,
          try: "اعمل branch، اعمل فيها commit، ارجع main ولاحظ إن التعديل مش موجود.",
          deep: {
            why: "عايز تشتغل على ميزة جديدة من غير ما تبوّظ النسخة الشغالة. الـ branch نسخة موازية من المشروع، تجرّب فيها براحتك، ولما تخلص تدمجها.",
            how: R`الـ branch في Git أبسط بكتير مما تتخيل: هو مجرد «اسم» بيشاور على commit معين. زي ورقة ملزوقة على صفحة في كتاب. مفيش نسخ ملفات ولا حاجة، عشان كده عمل branch بياخد جزء من الثانية.

وفيه مؤشر خاص اسمه [[HEAD]]، وده بيقول انت واقف فين دلوقتي. لما تعمل commit جديد، الـ branch اللي انت عليها بتتحرك لقدام وتشاور على الـ commit الجديد، والـ branches التانية بتفضل مكانها.

[[git switch branch]] بيحرّك [[HEAD]] للـ branch دي، ويغيّر ملفاتك على الجهاز عشان تبقى زي آخر commit فيها. و [[switch -c]] بيعمل branch جديدة من مكانك الحالي ويروح لها.

هتلاقي في شروحات قديمة [[git checkout]] بيعمل نفس الحاجة، بس [[switch]] أحدث وأوضح.`,
            when: "كل ميزة أو إصلاح في branch لوحدها: [[feature/login]] أو [[fix/cart-total]]. و main تفضل دايمًا شغالة وجاهزة تترفع.",
            mistakes: "تنقل branch وعندك تعديلات مش محفوظة: Git ممكن يرفض، أو ياخد التعديلات معاك للـ branch التانية وتتلخبط. اعمل commit أو stash الأول. ومسح branch معملتهاش merge: [[-d]] هيرفض ويحميك، إنما [[-D]] الكابيتال هيمسح غصب."
          },
          teach: R`## الأول: الـ branch مجرد اسم بيشاور على commit

الـ branch مش نسخة من الملفات. هي ورقة صغيرة جوه [[.git/refs/heads/]] مكتوب فيها hash آخر commit فيها. ومعاها [[HEAD]]: مؤشر بيقول انت واقف على أنهي branch. لما تعمل commit، الـ branch اللي عليها [[HEAD]] بتتحرك للـ commit الجديد، والباقي بيفضل مكانه. الناتج تحت من repo تجربة على ويندوز (Git 2.56)، ونفس الأوامر في أي ترمنال وعلى لينكس.

---

## ١. [[git branch]]

~~~text الناتج في repo فيه commit واحد
* main
~~~

قايمة الـ branches، و [[*]] جنب اللي انت عليها.

---

## ٢. [[git switch -c feature/login]]

| الحتة | معناها |
|---|---|
| [[switch]] | انقل لـ branch |
| [[-c]] | create: اعملها الأول، من المكان اللي انت فيه دلوقتي |
| [[feature/login]] | الاسم. الـ [[/]] جزء من الاسم للتنظيم بس |

~~~text الناتج
Switched to a new branch 'feature/login'
~~~

وبعدين commit عليها:

~~~text echo login > login.js && git add login.js && git commit -m "add login"
[feature/login 29e0271] add login
 1 file changed, 1 insertion(+)
 create mode 100644 login.js
~~~

لاحظ أول الناتج بقى [[feature/login]] مش [[main]].

---

## ٣. [[git switch main]]

~~~text الناتج
Switched to branch 'main'
~~~

~~~text ls
index.js
~~~

~~~text git branch
  feature/login
* main
~~~

[[login.js]] اختفى من الفولدر! مااتمسحش: Git غيّر ملفاتك لشكل آخر commit في main، و main عمرها ما شافت [[login.js]]. ارجع لـ feature/login هتلاقيه.

### لو عندك تعديلات مش محفوظة

جرّبت الحالتين:

~~~text تعديل في ملف مش مختلف بين الـ branchين
Switched to branch 'feature/login'
M	index.js
~~~

التعديل **مشي معاك** للـ branch التانية ([[M]] = modified)، لأنه مش متسجل في أي branch لسه.

~~~text تعديل في ملف مختلف بين الـ branchين
error: Your local changes to the following files would be overwritten by checkout:
	login.js
Please commit your changes or stash them before you switch branches.
Aborting
~~~

هنا Git رفض عشان ميضيّعش شغلك. الحل commit أو [[git stash]].

---

## ٤. [[git branch -a]]

[[-a]] (all): كمان الـ branches اللي على الـ remote. جرّبته بـ remote محلي اسمه origin (بدل GitHub):

~~~text الناتج
  feature/login
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/feature/login
  remotes/origin/main
~~~

اللي بيبدأ بـ [[remotes/origin/]] نسخة Git فاكرها من آخر مرة كلّم الـ remote، مش branch تشتغل عليها مباشرة. و [[origin/HEAD -> origin/main]] يعني الـ branch الأساسية هناك main.

---

## ٥. [[git branch -d feature/login]]

[[-d]] (delete) بيمسح الاسم بس، والـ commits بتفضل لو branch تانية فيها. قبل الدمج:

~~~text الناتج
error: the branch 'feature/login' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D feature/login'
~~~

Git رافض لأن [[add login]] مش موجود في أي branch تانية، فلو مسحتها هيتوه. بعد [[git merge feature/login]] على main:

~~~text الناتج
Deleted branch feature/login (was 29e0271).
~~~

و [[-D]] الكابيتال بيمسح غصب من غير ما يسأل، فاستخدمه بس لو متأكد إنك مش عايز الشغل ده.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git branch]] | يعرض، و [[*]] انت فين |
| [[git switch -c NAME]] | يعمل branch من مكانك ويروح لها |
| [[git switch NAME]] | يروح لـ branch موجودة ويغيّر الملفات لشكلها |
| [[git branch -a]] | ومعاهم اللي على الـ remote |
| [[git branch -d NAME]] | يمسح branch اتدمجت (و [[-D]] غصب) |

في الشروحات القديمة: [[git checkout -b NAME]] = [[git switch -c NAME]].`,
          lines: [
            "اعرض الـ branches، واللي عليها [[*]] انت فيها.",
            "اعمل branch جديدة ([[-c]] create) وروح لها.",
            "ارجع لـ main.",
            "اعرض كل الـ branches حتى اللي على GitHub ([[-a]] all).",
            "امسح branch خلصت ([[-d]] delete)."
          ],
          sol: R`[[git switch -c feature/login]] بيطبع [[Switched to a new branch 'feature/login']]. بعد الـ commit والرجوع بـ [[git switch main]]، [[ls]] مش هيوري الملف الجديد، و [[git branch]] بيوري الاتنين والنجمة جنب [[* main]].

الملف مااتمسحش: هو موجود في commit على الـ branch التاني بس. ارجع لها وهتلاقيه.

الغلط الشائع: تعدّل من غير commit وتعمل switch، فالتعديل يمشي معاك لـ main لأنه لسه مش متسجل في أي branch. أو Git يرفض بـ [[Your local changes ... would be overwritten]]: اعمل commit أو stash الأول.`,
          solCode: R`git switch -c feature/login
echo login > login.js && git add login.js && git commit -m "add login"
git switch main
ls
git branch`
        },
        {
          cmd: "git merge",
          title: "ادمج الـ branch",
          desc: R`الـ merge بياخد الـ commits اللي في branch ويدخّلها في branch تانية. القاعدة: تقف على الـ branch اللي هتستقبل (غالبًا main) بـ [[git switch main]]، وبعدين [[git merge feature/login]] يعني «هات اللي في feature/login هنا».

لو main متحركتش من ساعة ما عملت الـ branch، Git بيحرّك main لقدام بس، ودي اسمها fast-forward ومش بتعمل commit جديد. لو main اتغيرت هي كمان، Git بيعمل merge commit بيجمع الاتنين. ولو الاتنين عدّلوا نفس السطر بشكل مختلف، بيوقف بـ conflict (الدرس الجاي). و [[git log --oneline --graph]] بيرسم التاريخ بخطوط، فتشوف الدمج حصل إزاي.

بعد الدمج الـ branch القديمة ملهاش لازمة: [[git branch -d feature/login]]. وفي الفرق اللي بتشتغل على GitHub، الدمج غالبًا بيحصل من Pull Request مش من الترمنال، بس اللي بيحصل جوه هو هو.`,
          example: R`git switch main
git merge feature/login
git log --oneline --graph`,
          try: "ادمج الـ branch اللي عملتها في main.",
          deep: {
            why: "خلّصت الميزة في الـ branch بتاعتها، ودلوقتي عايزها في main.",
            how: R`بتقف على الـ branch اللي هتستقبل التعديلات (غالبًا main)، وبتقول [[git merge feature/login]].

وفيه حالتين:

لو main متغيرتش من ساعة ما عملت الـ branch، Git مش محتاج يعمل حاجة غير إنه يحرّك main لقدام تشاور على آخر commit في الـ feature. دي اسمها fast-forward، ومش بتعمل commit جديد.

لو main اتغيرت هي كمان (حد عمل فيها commits)، Git بيعمل commit جديد اسمه merge commit، ليه «أبّين»: آخر commit في main، وآخر commit في الـ feature، وبيجمع التعديلات من الاتنين.

ولو التعديلات في أماكن مختلفة من الملفات، Git بيجمعهم لوحده. لو الاتنين عدّلوا نفس السطور، Git مش هيعرف يختار، وده الـ conflict (الأمر اللي بعده).`,
            when: "كل ما تخلّص ميزة. وعلى GitHub غالبًا بتعمل ده من Pull Request بدل الترمنال، بس الفكرة هي هي.",
            mistakes: "إنك تعمل merge وانت واقف على الـ branch الغلط، فتدمج main جوه الـ feature بدل العكس. اتأكد بـ [[git status]] انت فين قبل الـ merge."
          },
          teach: R`## الأول: merge بيجيب شغل branch جوه branch تانية

القاعدة: تقف على الـ branch اللي **هتستقبل**، وتكتب اسم اللي **هتجيب منها**. والنتيجة واحدة من اتنين حسب main اتحركت ولا لأ. الناتج تحت من repo تجربة على ويندوز (Git 2.56)، ونفسه في أي ترمنال وعلى لينكس.

---

## ١. [[git switch main]]

تقف على main، لأنها اللي هتستقبل. لو نسيت الخطوة دي، هتدمج في المكان الغلط (تحت).

## ٢. [[git merge feature/login]]

«هات الـ commits اللي في feature/login ومش في main».

### الحالة الأولى: main متحركتش (fast-forward)

عملت feature/login من main، وعملت فيها commit، و main فضلت زي ما هي:

~~~text الناتج
Updating c7934ee..1cd77e1
Fast-forward
 login.js | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 login.js
~~~

| السطر | معناه |
|---|---|
| [[Updating c7934ee..1cd77e1]] | main كانت على [[c7934ee]] وهتبقى على [[1cd77e1]] |
| [[Fast-forward]] | مفيش دمج حقيقي: main اتنقلت لقدام بس |
| الباقي | الملفات اللي اتغيرت |

مفيش commit جديد اتعمل. main بقت بتشاور على نفس آخر commit في الـ feature.

### الحالة التانية: الاتنين اتحركوا (merge commit)

عملت feature/cart وفيها [[add cart]]، وفي نفس الوقت main خدت [[add readme]]:

~~~text git merge feature/cart --no-edit
Merge made by the 'ort' strategy.
 cart.js | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 cart.js
~~~

[[ort]] اسم الطريقة اللي Git بيدمج بيها (الافتراضية في Git الحديث)، مش حاجة تختارها. وهنا Git عمل commit جديد اسمه merge commit. و [[--no-edit]] معناها «خد رسالة الدمج الجاهزة». من غيره Git بيفتح المحرر برسالة [[Merge branch 'feature/cart']]: احفظ واقفل.

---

## ٣. [[git log --oneline --graph]]

~~~text بعد الحالة الأولى
* 1cd77e1 add login
* c7934ee init
~~~

خط مستقيم، كأن الشغل اتعمل على main من الأول.

~~~text بعد الحالة التانية
*   4873318 Merge branch 'feature/cart'
|\  
| * 175145c add cart
* | 9ebfe23 add readme
|/  
* 1cd77e1 add login
* c7934ee init
~~~

من تحت لفوق: الخط اتفرّع بعد [[1cd77e1]] ([[|/]])، وكل فرع فيه commit، وبعدين اتقابلوا في [[4873318]] ([[|\]]). الـ merge commit ليه أبّين بدل واحد:

~~~text git log -1 --format='%H%n%P'
48733181f9017d0f4385d8b6311166b18e6e5269
9ebfe236ccc71fbc0747398f41393e8978deaa95 175145c3ad147b174eb8fca0dc2e9eac8a14dff0
~~~

[[%H]] الـ hash، و [[%n]] سطر جديد، و [[%P]] الأبهات (parents): آخر commit في main وآخر commit في feature/cart.

---

## ٤. الغلطة المشهورة: الـ branch الغلط

لو انت واقف على feature/cart وكتبت [[git merge feature/cart]]:

~~~text الناتج
Already up to date.
~~~

دمجت الـ branch في نفسها. ولو كتبت [[git merge main]] وانت عليها، Git هيدخل main **جوه** الـ feature (العكس). عشان كده [[git status]] أو [[git branch]] قبل أي merge.

---

## الخلاصة

| | fast-forward | merge commit |
|---|---|---|
| إمتى | main متحركتش من ساعة التفرّع | الاتنين فيهم commits جديدة |
| commit جديد؟ | لأ | آه، بأبّين |
| الـ graph | خط مستقيم | فرعين بيتقابلوا |

وبعد الدمج: [[git branch -d feature/login]]، لأنها خلاص جوه main.`,
          lines: [
            "روح لـ main الأول، ده المكان اللي هتدمج فيه.",
            "هات تعديلات feature/login وادمجها هنا.",
            "اعرض التاريخ مرسوم وشوف الدمج."
          ],
          sol: R`لو main متحركش من ساعة ما عملت الـ branch، هيطبع [[Updating b5f32ec..6de874a]] و [[Fast-forward]] وأسماء الملفات. ده معناه إن Git نقل main لقدام بس من غير commit دمج، و [[git log --oneline --graph]] هيبان خط مستقيم.

لو main كان عليه commits جديدة، هيعمل commit دمج ويطبع [[Merge made by the 'ort' strategy.]]، والـ graph هيبان فيه فرعين بيتقابلوا.

الغلط الشائع: تعمل [[git merge feature/login]] وانت واقف على الـ feature نفسها، فيقول [[Already up to date.]]. لازم تقف على الفرع اللي عايز تدمج فيه (main) الأول.`
        },
        {
          cmd: "الـ conflicts",
          title: "لما اتنين يعدّلوا نفس السطر",
          desc: "Git بيوقف ويحط الجزئين في الملف بين علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]]. بتفتح الملف، تسيب الصح، تمسح العلامات، وبعدين add و commit. و [[merge --abort]] بيرجعك لقبل الـ merge لو اتلخبطت.",
          example: R`git merge feature/header
git status
code index.html
git add index.html
git commit
# أو قبل الـ commit، لو اتلخبطت، الغي الدمج كله:
git merge --abort`,
          try: "اعمل conflict بإيدك: عدّل نفس السطر في branchين مختلفين وادمجهم.",
          deep: {
            why: "لما اتنين (أو انت في branchين) يعدّلوا نفس السطر بطريقتين مختلفتين، Git مش هيقدر يعرف أنهي الصح. فبيوقف ويسيبلك القرار.",
            how: R`Git مبيبوّظش حاجة ولا بيضيّع شغل. بيوقف الـ merge في النص، ويحط الجزئين الاتنين جوه الملف، بين علامات:

[[<<<<<<< HEAD]] وبعدها نسختك (الـ branch اللي انت عليها). وبعدين [[=======]] كفاصل. وبعدها النسخة التانية، وفي الآخر [[>>>>>>> feature/header]].

دورك: تفتح الملف، وتقرر: تسيب نسختك، ولا التانية، ولا تجمع الاتنين بطريقة جديدة. وتمسح العلامات التلاتة كلها. VS Code بيسهّل ده جدًا، وبيحط زراير فوق كل conflict: Accept Current، أو Accept Incoming، أو Accept Both.

بعد ما تخلص كل الملفات، [[git add]] عشان تقول لـ Git «صلّحته»، وبعدين [[git commit]] يكمّل الـ merge.

ولو اتلخبطت ومش عارف تعمل إيه، [[git merge --abort]] بيرجّعك لقبل الـ merge بالظبط، كأن مفيش حاجة حصلت.`,
            when: "بيحصل كتير لما تشتغل مع فريق، أو لما branch تطوّل من غير ما تتدمج. وعشان تقلله: اعمل merge بدري وكتير، ومتسيبش branch أسابيع.",
            mistakes: R`إنك تنسى تمسح علامات [[<<<<<<<]] وتعمل commit، فالكود يبوظ. دوّر عليهم قبل الـ commit: [[grep -rn "<<<<<<<" .]]. والذعر: الـ conflict عادي جدًا، و [[--abort]] دايمًا موجود.`
          },
          teach: R`## الأول: conflict يعني Git مش عارف يختار

لو الـ branchين عدّلوا **نفس السطر** بشكلين مختلفين، Git مبيخمّنش. بيوقف الدمج في النص، ويكتب النسختين جوه الملف، ويستناك. محدش خسر حاجة. هنعمل conflict بإيدينا بالـ solCode، والناتج كله من ويندوز (Git 2.56)، ونفسه على لينكس.

---

## ١. نجهّز الـ conflict

~~~bash
echo '<h1>Shop</h1>' > index.html && git add . && git commit -m idx
git switch -c feature/header
echo '<h1>Shop Red</h1>' > index.html && git commit -am red
git switch main
echo '<h1>Shop Green</h1>' > index.html && git commit -am green
~~~

- العلامات [[' ']] حوالين الـ HTML عشان [[<]] و [[>]] ليهم معنى في الترمنال (توجيه)، وجوه علامات التنصيص بيبقوا كلام عادي.
- [[commit -am]]: [[-a]] اعمل add لكل ملف Git متابعه، و [[-m]] الرسالة. ينفع هنا لأن [[index.html]] متابع.

دلوقتي السطر الأول في main [[Shop Green]] وفي feature/header [[Shop Red]].

---

## ٢. [[git merge feature/header]]

~~~text الناتج
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
~~~

[[CONFLICT (content)]] يعني التعارض في محتوى الملف. والأمر رجع exit code [[1]].

## ٣. [[git status]]

~~~text الناتج
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   index.html
~~~

[[Unmerged paths]] الملفات اللي فيها تعارض، و [[both modified]] يعني الـ branchين الاتنين عدّلوه. ولاحظ إن Git بيقولك الخطوتين: صلّح وبعدين commit، أو [[--abort]].

---

## ٤. [[code index.html]]: جوه الملف

[[code]] بيفتح الملف في VS Code. وده اللي هتلاقيه (بـ [[cat index.html]]):

~~~text index.html
<<<<<<< HEAD
<h1>Shop Green</h1>
=======
<h1>Shop Red</h1>
>>>>>>> feature/header
~~~

| العلامة | معناها |
|---|---|
| [[<<<<<<< HEAD]] | من هنا نسختك: الـ branch اللي انت واقف عليها (main) |
| [[=======]] | الفاصل |
| [[>>>>>>> feature/header]] | لحد هنا النسخة اللي جاية من الـ branch التانية |

مهمتك: تكتب الشكل النهائي اللي عايزه، وتمسح التلات علامات. ممكن تختار واحدة، أو تجمع، زي:

~~~text index.html بعد التصليح
<h1>Shop Red Green</h1>
~~~

في VS Code هتلاقي فوق التعارض زراير Accept Current Change (بتاعتك) و Accept Incoming Change (الجاية) و Accept Both Changes.

### اتأكد إنك مسحت كل العلامات

[[git diff --check]] بيدوّر على علامات منسية. جرّبته وأنا سايب [[=======]] بالغلط:

~~~text الناتج
index.html:2: leftover conflict marker
~~~

ورجع exit code [[2]]. ولما الملف نضيف مبيطبعش حاجة.

---

## ٥. [[git add index.html]] و [[git commit]]

[[add]] هنا معناها «صلّحت الملف ده». وبعدين [[git commit]] من غير رسالة بيفتح المحرر برسالة جاهزة؛ في الـ solCode استخدمنا [[--no-edit]] عشان ياخدها على طول:

~~~text git commit --no-edit
[main 923cac2] Merge branch 'feature/header'
~~~

~~~text git log --oneline --graph
*   923cac2 Merge branch 'feature/header'
|\  
| * c3c2eb1 red
* | 8030f3b green
|/  
* 5b5c3d0 idx
~~~

---

## ٦. [[git merge --abort]]: ارجع كأن مفيش حاجة حصلت

لو اتلخبطت، قبل الـ commit:

~~~text git merge --abort ثم cat index.html
<h1>Shop Green</h1>
~~~

الملف رجع نسخة main، و [[git status -s]] فاضي. وتقدر تعيد المحاولة وقت ما تحب.

---

## الخلاصة

1. [[git merge X]] يقول CONFLICT.
2. [[git status]]: مين الملفات.
3. افتح كل ملف، اكتب الصح، وامسح [[<<<<<<<]] و [[=======]] و [[>>>>>>>]].
4. [[git diff --check]]: مفيش علامة منسية.
5. [[git add FILE]] لكل ملف، وبعدين [[git commit]].

أو في أي لحظة قبل الـ commit: [[git merge --abort]].`,
          lines: [
            "جرب تدمج، و Git يوقف لو فيه تعارض.",
            "اعرف أنهي ملفات فيها تعارض.",
            "افتح الملف في VS Code وصلّحه.",
            "قول لـ Git إنك صلّحته.",
            "كمّل الدمج.",
            "أو الغي الدمج كله وارجع زي ما كنت."
          ],
          sol: R`الـ merge بيطبع [[CONFLICT (content): Merge conflict in index.html]] و [[Automatic merge failed]]. و [[git status]] بيوري [[both modified: index.html]] تحت [[Unmerged paths]]. والملف فيه:

[[<<<<<<< HEAD]] وتحتها سطر main، و [[=======]]، وتحتها سطر الـ branch، و [[>>>>>>> feature/header]].

الحل: اكتب السطر اللي عايزه وامسح التلات علامات، وبعدين [[git add index.html]] و [[git commit --no-edit]]، والـ graph هيوري الفرعين اتقابلوا في [[Merge branch 'feature/header']]. الغلط الشائع: تنسى علامة زي [[=======]] جوه الملف وتعمل commit، فالموقع يبوظ. [[git diff --check]] قبل الـ add بيمسك العلامات المنسية.`,
          solCode: R`echo '<h1>Shop</h1>' > index.html && git add . && git commit -m idx
git switch -c feature/header
echo '<h1>Shop Red</h1>' > index.html && git commit -am red
git switch main
echo '<h1>Shop Green</h1>' > index.html && git commit -am green
git merge feature/header
cat index.html
echo '<h1>Shop Red Green</h1>' > index.html
git add index.html && git commit --no-edit
git log --oneline --graph`
        },
        {
          cmd: "git remote / push / pull",
          title: "اربط بـ GitHub",
          desc: "[[origin]] الاسم المتعارف عليه للـ remote. [[push -u]] أول مرة بتربط الـ branch بالـ remote، وبعد كده [[git push]] بس. [[fetch]] بينزّل التغييرات من غير ما يدمجها، و [[pull]] بينزّل ويدمج.",
          example: R`git remote add origin git@github.com:USER/REPO.git
git remote -v
git push -u origin main
git fetch origin
git pull`,
          try: "اعمل repo فاضي على GitHub وارفعله الـ repo بتاع lab.",
          deep: {
            why: "الـ repo على جهازك بس. عشان تحفظه في مكان آمن، أو تشتغل مع فريق، أو تنزّله على السيرفر، محتاج نسخة على GitHub، وتزامن بينهم.",
            how: R`الـ remote اسم مختصر لعنوان repo تاني على النت، والاسم المتعارف عليه [[origin]].

[[git push]] بيرفع الـ commits الجديدة اللي عندك ومش على GitHub. و [[-u origin main]] أول مرة بيربط main عندك بـ main على GitHub، فبعد كده [[git push]] بس بتكفي.

[[git fetch]] بينزّل الـ commits الجديدة من GitHub، بس مش بيلمس ملفاتك ولا بيدمج. بيحطها جنب شغلك تبص عليها. و [[git pull]] بيعمل fetch وبعده merge على طول.

وحاجة مهمة: Git مش هيسمحلك تعمل push لو GitHub عليه commits انت معندكش (حد تاني رفع قبلك). هيقولك «rejected». الحل: [[git pull]] الأول تجيب اللي فاتك، وبعدين push.`,
            when: "push في آخر كل جلسة شغل على الأقل، عشان شغلك يبقى محفوظ بره جهازك. pull أول ما تبدأ تشتغل، خصوصًا مع فريق. وعلى السيرفر: pull عشان تجيب آخر نسخة من الموقع.",
            mistakes: "إنك تحل الـ «rejected» بـ [[git push --force]]. ده بيمسح شغل الناس التانية من GitHub. اعمل pull. ونسيان إن push بيرفع الـ commits بس، مش التعديلات اللي لسه معملتلهاش commit."
          },
          teach: R`## الأول: الـ remote = repo تاني بتزامن معاه

الـ remote عنوان repo تاني (غالبًا على GitHub) ليه اسم مختصر، والمتعارف عليه [[origin]]. عشان أجرّب كل الحالات من غير حساب GitHub، عملت repo «bare» على الجهاز يلعب دور GitHub: [[git init --bare server.git]]. الـ bare repo يعني repo من غير ملفات شغل، فيه التاريخ بس، وده بالظبط اللي GitHub شايله. وعملت clone تاني منه اسمه [[other]] يلعب دور زميلك. كل الناتج من ويندوز (Git 2.56) إلا اللي مكتوب عليه لينكس، والأوامر نفسها مع GitHub، الفرق إن الرابط هيبقى [[git@github.com:USER/REPO.git]].

---

## ١. [[git remote add origin URL]]

| الحتة | معناها |
|---|---|
| [[remote add]] | سجّل remote جديد |
| [[origin]] | الاسم اللي هتناديه بيه |
| [[URL]] | العنوان. في التجربة [[../server.git]] |

مبيطبعش حاجة، ومبيتصلش بأي حاجة لسه: بيكتب الاسم والعنوان في [[.git/config]] بس.

## ٢. [[git remote -v]]

[[-v]] (verbose) يوري العناوين:

~~~text الناتج
origin	../server.git (fetch)
origin	../server.git (push)
~~~

سطرين لأن ممكن (نادرًا) يبقى عنوان الجلب غير عنوان الرفع.

---

## ٣. [[git push -u origin main]]

| الحتة | معناها |
|---|---|
| [[push]] | ارفع الـ commits اللي عندي ومش هناك |
| [[origin]] | لفين |
| [[main]] | أنهي branch |
| [[-u]] | [[--set-upstream]]: افتكر إن main عندي مربوطة بـ main هناك |

~~~text الناتج
To ../server.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
~~~

[[main -> main]] يعني main عندي بقت main هناك. والسطر الأخير هو أثر [[-u]]: من هنا ورايح [[git push]] و [[git pull]] من غير أي حاجة بعدهم بيعرفوا يروحوا فين. و [[git status]] بقى يقول:

~~~text الناتج
On branch main
Your branch is up to date with 'origin/main'.
~~~

---

## ٤. [[git fetch origin]]

الزميل ([[other]]) رفع commit. [[fetch]] بيجيبه، بس **ميلمسش ملفاتك**:

~~~text الناتج
From ../server
   e482975..68f337e  main       -> origin/main
~~~

[[origin/main]] (نسخة Git من main اللي هناك) اتحركت من [[e482975]] لـ [[68f337e]]. و main بتاعتك لسه مكانها:

~~~text git status
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)
~~~

[[behind by 1 commit]] يعني ناقصك commit واحد، و [[can be fast-forwarded]] يعني مفيش تعارض، هتتحرك لقدام بس.

## ٥. [[git pull]]

[[pull]] = [[fetch]] وبعده دمج:

~~~text الناتج
Updating e482975..68f337e
Fast-forward
 b.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 b.txt
~~~

ولو مفيش جديد: [[Already up to date.]]

---

## ٦. لما الـ push يترفض

الزميل رفع commit، وانت عملت commit عندك من غير pull:

~~~text git push
To ../server.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to '../server.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
~~~

[[(fetch first)]] يعني هات اللي فاتك الأول. Git رافض لأن الـ push كان هيمسح commit الزميل. الحل [[git pull]]، وهنا الاتنين اتفرّعوا فبيعمل merge commit:

~~~text git pull --no-edit
From ../server
   68f337e..ec00f00  main       -> origin/main
Merge made by the 'ort' strategy.
 c.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 c.txt
~~~

~~~text git push
To ../server.git
   ec00f00..52f1bae  main -> main
~~~

(من غير [[--no-edit]] Git بيفتح المحرر لرسالة الدمج.) ده شغال لأن [[pull.rebase false]] متظبط (Git for Windows بيحطه لوحده). على أوبونتو من غير الإعداد ده، نفس الموقف بيوقف:

~~~text الناتج على لينكس
hint: You have divergent branches and need to specify how to reconcile them.
...
fatal: Need to specify how to reconcile divergent branches.
~~~

الحل في درس git config: [[git config --global pull.rebase false]].

---

## ٧. أغلاط الـ remote

~~~text git remote add origin تاني
error: remote origin already exists.
~~~

لو عايز تغيّر العنوان: [[git remote set-url origin URL_الجديد]].

---

## الخلاصة

| الأمر | بيعمل إيه | بيلمس ملفاتك؟ |
|---|---|---|
| [[git remote add origin URL]] | يسجّل العنوان | لأ |
| [[git push -u origin main]] | أول رفع، ويربط | لأ |
| [[git push]] | يرفع الجديد | لأ |
| [[git fetch]] | يجيب ويحدّث [[origin/main]] بس | لأ |
| [[git pull]] | fetch ودمج | آه |

[[rejected]] = اعمل [[git pull]] الأول، مش [[--force]].`,
          lines: [
            "اربط المشروع بـ repo على GitHub وسمّيه origin.",
            "اعرض الـ remotes المربوطة ([[-v]] verbose).",
            "ارفع main أول مرة، و [[-u]] يفتكر الربط عشان بعد كده تكتب [[git push]] بس.",
            "نزّل التعديلات الجديدة من غير ما تدمجها.",
            "نزّل وادمج على طول."
          ],
          sol: R`[[git remote -v]] بيطبع سطرين: [[origin git@github.com:USER/REPO.git (fetch)]] و [[(push)]]. وأول [[git push -u origin main]] بيطبع [[* [new branch] main -> main]] و [[branch 'main' set up to track 'origin/main']]. بعدها صفحة الـ repo على GitHub بتوري ملفاتك.

و [[git status]] بعد كده بيقول [[Your branch is up to date with 'origin/main']]، و [[git pull]] بيقول [[Already up to date.]].

الأغلاط الشائعة: [[Permission denied (publickey)]] يعني الـ ssh key مش متضاف (الدرس الجاي). و [[rejected ... (fetch first)]] يعني عملت الـ repo على GitHub ومعاه README، فاعمل [[git pull]] الأول وبعدين push. و [[error: remote origin already exists]] صلّحه بـ [[git remote set-url origin]].`
        },
        {
          cmd: "ssh key لـ GitHub",
          title: "من غير باسورد كل مرة",
          desc: "بتضيف المفتاح العام في GitHub من Settings ثم SSH and GPG keys. و [[ssh -T]] بيختبر الاتصال. على السيرفر اعمل مفتاح مختلف، أو استخدم deploy key خاص بالـ repo ده بس.",
          example: R`ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com`,
          try: "ضيف المفتاح لحسابك، ولازم ssh -T يرد عليك باسم الحساب.",
          deep: {
            why: "عشان GitHub يعرف إنك انت من غير ما تكتب باسورد أو توكن كل مرة تعمل push.",
            how: R`نفس فكرة مفاتيح SSH للسيرفر بالظبط (شرحناها في bash المستوى ٢): مفتاح خاص على جهازك، ومفتاح عام بتديه لـ GitHub.

بتعمل الزوج بـ [[ssh-keygen]]، وبتنسخ المفتاح العام (الملف اللي آخره [[.pub]]) وتحطه في GitHub من Settings ثم SSH and GPG keys. من ساعتها، أي عملية بعنوان [[git@github.com:]] بتستخدم المفتاح.

و [[ssh -T git@github.com]] بيختبر: لو كله تمام، GitHub هيرد برسالة فيها اسم حسابك.

وعلى السيرفر، بدل ما تحط مفتاحك الشخصي اللي بيفتح كل حاجاتك، الأحسن تعمل «deploy key»: مفتاح مخصوص للسيرفر ده، ومسموح له بـ repo واحد بس. لو السيرفر اتخترق، المهاجم مش هيوصل لباقي مشاريعك.`,
            when: "مرة واحدة على كل جهاز بتشتغل عليه. وعلى كل سيرفر محتاج يعمل pull من repo خاص.",
            mistakes: "نسخ المفتاح الخاص بدل العام وحطه في GitHub. المفتاح العام دايمًا اللي آخره [[.pub]]. واستخدام عنوان [[https://]] وتستغرب إنه لسه بيسأل على باسورد، لأن المفتاح بيشتغل مع عنوان [[git@github.com:]] بس."
          },
          teach: R`## الأول: مفتاحين، واحد معاك وواحد مع GitHub

SSH بيستخدم زوج مفاتيح: **خاص** بيفضل على جهازك ومحدش يشوفه، و**عام** بتديه لأي حد عايز يتأكد إنك انت. GitHub بيبعتلك تحدّي، وجهازك بيرد عليه بالمفتاح الخاص، و GitHub بيتأكد من الرد بالعام. الباسورد مبيتبعتش خالص.

> عملت مفتاح تجربة في فولدر مؤقت (مش في [[~/.ssh]]) على ويندوز عشان أوريك الناتج الحقيقي. على جهازك اعمله في المكان الافتراضي.

---

## ١. [[ssh-keygen -t ed25519 -C "you@example.com"]]

| الحتة | معناها |
|---|---|
| [[ssh-keygen]] | برنامج عمل المفاتيح (key generator) |
| [[-t ed25519]] | type: نوع المفتاح. ed25519 الحديث، أقصر وأأمن من rsa القديم |
| [[-C "..."]] | comment: كلام بيتكتب في آخر المفتاح العام عشان تعرفه، غالبًا إيميلك |

الأمر بيسألك سؤالين:

1. **فين أحفظه؟** اضغط Enter للمكان الافتراضي: [[~/.ssh/id_ed25519]] (على ويندوز [[C:\Users\ali\.ssh\id_ed25519]]).
2. **passphrase؟** باسورد بيحمي المفتاح الخاص لو جهازك اتسرق. ممكن تسيبه فاضي بـ Enter، بس الأحسن تحطه.

والناتج (المفتاح اتعمل بـ [[-f]] لمكان التجربة و [[-N ""]] من غير passphrase عشان ميسألش):

~~~text الناتج
Generating public/private ed25519 key pair.
Your identification has been saved in .\id_ed25519
Your public key has been saved in .\id_ed25519.pub
The key fingerprint is:
SHA256:fNfcaI8S4tx0YVjZ/0v6fZRAM9xU9G+e2nOKZcB1igE you@example.com
The key's randomart image is:
+--[ED25519 256]--+
|          E . +=+|
...
+----[SHA256]-----+
~~~

| الجزء | معناه |
|---|---|
| [[identification ... id_ed25519]] | المفتاح **الخاص**. ده ميطلعش من جهازك أبدًا |
| [[public key ... id_ed25519.pub]] | المفتاح **العام**، [[.pub]] = public |
| [[fingerprint]] | بصمة قصيرة للمفتاح، GitHub بيعرضها جنب كل مفتاح عندك عشان تقارن |
| randomart | نفس البصمة كرسمة، ملهاش استخدام عملي |

---

## ٢. [[cat ~/.ssh/id_ed25519.pub]]

[[cat]] يطبع الملف. شغال في bash، وفي PowerShell كمان لأنه اسم تاني لـ [[Get-Content]]:

~~~text الناتج
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHmJ3CiJ0AtH5VTbbPeD4EeHfE5xndbuF+uzHkY9mcHM you@example.com
~~~

سطر واحد، ٣ حتت: النوع، والمفتاح نفسه، والتعليق. انسخ السطر كله وحطه في GitHub: Settings ثم SSH and GPG keys ثم New SSH key.

> لو الملف اللي هتفتحه مش آخره [[.pub]] وأوله [[-----BEGIN OPENSSH PRIVATE KEY-----]]، ده الخاص. اقفله ومتلزقهوش في أي حتة.

---

## ٣. [[ssh -T git@github.com]]

| الحتة | معناها |
|---|---|
| [[-T]] | متطلبش terminal، GitHub مش هيدّيك shell أصلًا |
| [[git]] | اليوزر. كل الناس بتدخل بيوزر اسمه git، و GitHub بيعرفك من المفتاح |
| [[github.com]] | السيرفر |

أول مرة بيسألك [[Are you sure you want to continue connecting (yes/no)?]] عشان لسه مشفش السيرفر ده. اكتب [[yes]]، وبيتحفظ في [[~/.ssh/known_hosts]].

جرّبته بمفتاح التجربة اللي **مش** متضاف لأي حساب:

~~~text الناتج
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
git@github.com: Permission denied (publickey).
~~~

والـ exit code [[255]]. ده نفس اللي هتشوفه لو نسيت تضيف المفتاح، أو حطيت مفتاح غلط. ولما المفتاح يبقى متضاف، الرد حسب docs بتوع GitHub:

~~~text الناتج لما ينجح (من docs بتوع GitHub)
Hi USER! You've successfully authenticated, but GitHub does not provide shell access.
~~~

ساعتها الـ exit code [[1]] لأن مفيش shell، وده طبيعي.

---

## ٤. بعدها استخدم عنوان SSH

المفتاح بيشتغل مع العناوين اللي شكلها [[git@github.com:USER/REPO.git]] بس. لو الـ repo عندك متربط بـ [[https://]]:

~~~bash
git remote set-url origin git@github.com:USER/REPO.git
~~~

---

## الخلاصة

| الملف | بيروح فين |
|---|---|
| [[id_ed25519]] | يفضل على جهازك بس |
| [[id_ed25519.pub]] | GitHub (أو سيرفر) |
| [[known_hosts]] | السيرفرات اللي وثقت فيها |

[[Permission denied (publickey)]] = المفتاح مش متضاف، أو العنوان https، أو مفتاح غلط.`,
          lines: [
            "اعمل مفتاح جديد، و [[-C]] تعليق (إيميلك) عشان تعرفه.",
            "اطبع المفتاح العام، انسخه وحطه في GitHub.",
            "اختبر: GitHub المفروض يرد باسم حسابك."
          ],
          sol: R`بعد ما تحط محتوى [[id_ed25519.pub]] في GitHub › Settings › SSH and GPG keys، الأمر [[ssh -T git@github.com]] المفروض يرد:

[[Hi USER! You've successfully authenticated, but GitHub does not provide shell access.]] بـ USER اسم حسابك. ولو أول مرة هيسألك [[Are you sure you want to continue connecting]]، اكتب yes.

متقلقش من إن الـ exit code بيطلع 1، ده طبيعي لأن GitHub مش بيدّيك shell. الغلط الشائع: [[Permission denied (publickey)]] يعني حطيت المفتاح الخاص بدل الـ [[.pub]]، أو المفتاح مش متحمّل (جرّب [[ssh -vT git@github.com]] وشوف أنهي ملف بيجرّبه). ولو رد باسم حساب تاني يبقى المفتاح ده متضاف لحساب غير اللي قاصده.`
        },
        {
          cmd: "gh pr",
          title: "Pull Request من الترمنال",
          desc: "[[gh]] أداة GitHub الرسمية (winget install GitHub.cli أو sudo apt install gh أو brew install gh). بدل ما تروح للموقع: [[pr create --fill]] يعمل PR بعنوان ووصف من الـ commits، و [[pr checkout]] ينزّل PR حد تاني تجرّبه عندك، و [[pr merge --squash]] يدمجه commit واحد ويمسح الـ branch.",
          example: R`gh auth login
git switch -c feature/login
git push -u origin feature/login
gh pr create --fill
gh pr list
gh pr checkout 42
gh pr merge 42 --squash --delete-branch
git switch main
git pull`,
          try: "اعمل branch وPR لنفسك على repo التجربة، وادمجه من الترمنال.",
          deep: {
            why: "في أي فريق، الكود مش بيدخل main مباشرة. بيدخل بـ Pull Request: حد يراجعه، والـ CI يشغّل التستات، وبعدين يتدمج.",
            how: R`الـ PR طلب «ادمجوا الـ branch دي في main». الشغل في Git عادي (branch وcommits وpush)، والـ PR نفسه حاجة على GitHub.

[[gh]] بيكلّم GitHub من الترمنال، فتعمل الدورة كلها من غير ما تسيبه. و [[pr checkout]] مفيد جدًا في المراجعة: بينزّل branch الـ PR حتى لو من fork، فتشغّله وتجرّبه بجد مش تقرا الـ diff بس.

و [[--squash]] بيحط كل commits الـ PR في commit واحد على main، فالتاريخ يفضل نضيف.`,
            when: "كل ميزة أو إصلاح في مشروع عليه أكتر من شخص، أو عليه CI.",
            mistakes: "تنسى [[git pull]] على main بعد الدمج، فالـ branch الجاية تبدأ من نسخة قديمة. وPR ضخم فيه أسبوع شغل، ومحدش يقدر يراجعه."
          },
          teach: R`## الأول: نصّ الأوامر Git ونصّها gh

المثال دورة PR كاملة. السطور اللي بتبدأ بـ [[git]] شغل عادي على جهازك (branch وpush)، والسطور اللي بتبدأ بـ [[gh]] بتكلّم موقع GitHub نفسه: تعمل PR، وتعرضه، وتدمجه. [[gh]] اختصار GitHub، وهو برنامج منفصل عن Git لازم تسطّبه.

> سطور [[git]] اتشغّلت فعلًا على ويندوز (Git 2.56) مع repo «bare» على الجهاز بدل GitHub. سطور [[gh]] محتاجة حساب GitHub حقيقي، فاللي اتشغّل منها هو [[gh --version]] ورسالة «مش مسجّل»، والباقي من docs بتوع [[gh]] (وتقدر تشوفها بنفسك بـ [[gh pr create --help]]).

~~~text gh --version
gh version 2.97.0 (2026-07-31)
~~~

---

## ١. [[gh auth login]]

بيربط [[gh]] بحسابك مرة واحدة على الجهاز. بيسألك كام سؤال بالأسهم (GitHub.com ولا سيرفر شركة، HTTPS ولا SSH)، وبعدين بيفتح المتصفح تسجّل دخول. التوكن بيتحفظ في خزنة الباسوردات بتاعة النظام. من غيره، أي أمر [[gh]] بيقف كده:

~~~text gh pr list من غير تسجيل دخول
To get started with GitHub CLI, please run:  gh auth login
Alternatively, populate the GH_TOKEN environment variable with a GitHub API authentication token.
~~~

والـ exit code [[4]]، وده رقم [[gh]] المخصوص لـ «محتاج تسجيل دخول».

---

## ٢. [[git switch -c feature/login]] و [[git push -u origin feature/login]]

الـ PR طلب بين **branchين على GitHub**: «ادمجوا feature/login في main». فلازم الـ branch تبقى مرفوعة الأول:

~~~text git push -u origin feature/login
To .../pr-server.git
 * [new branch]      feature/login -> feature/login
branch 'feature/login' set up to track 'origin/feature/login'.
~~~

[[[new branch]]] يعني الـ branch اتعملت هناك لأول مرة، و [[-u]] ربطها، فبعد كده أي commit جديد تكفيه [[git push]] والـ PR بيتحدّث لوحده.

---

## ٣. [[gh pr create --fill]]

| الحتة | معناها |
|---|---|
| [[pr create]] | اعمل Pull Request من الـ branch اللي انت عليها |
| [[--fill]] | خد العنوان والوصف من الـ commits بدل ما تسألني |

الـ branch الهدف (base) بتبقى الـ default branch بتاعة الـ repo، غالبًا main، ولو عايز غيرها [[-B develop]]. ولو commit واحد: عنوانه بيبقى عنوان الـ PR. ولو أكتر: اسم الـ branch عنوان، والرسايل كلها في الوصف. وفي الآخر بيطبع رابط الـ PR، زي [[https://github.com/USER/REPO/pull/1]]. وفيه [[--web]] لو عايز تكمّل في المتصفح، و [[--draft]] لـ PR لسه مش جاهز للمراجعة.

## ٤. [[gh pr list]]

الـ PRs المفتوحة في الـ repo: الرقم والعنوان واسم الـ branch. الرقم ده ([[42]] في المثال) هو اللي بتستخدمه في باقي الأوامر.

## ٥. [[gh pr checkout 42]]

بينزّل branch الـ PR رقم 42 على جهازك ويعمل لها switch، حتى لو صاحبها رافعها على fork بتاعه. كده تشغّل الكود وتجرّبه بجد قبل ما توافق، مش تقرا الـ diff بس.

---

## ٦. [[gh pr merge 42 --squash --delete-branch]]

| الحتة | معناها |
|---|---|
| [[pr merge 42]] | ادمج PR رقم 42 على GitHub |
| [[--squash]] | كل commits الـ PR تتلم في commit واحد على main |
| [[--delete-branch]] | امسح الـ branch من GitHub ومن جهازك بعد الدمج |

والبدايل: [[--merge]] (merge commit عادي، والـ commits كلها تفضل)، و [[--rebase]] (الـ commits تتحط واحدة واحدة فوق main).

### الـ squash بيعمل إيه بالظبط؟

عملته محليًا بـ [[git merge --squash]] عشان تشوف الشكل. الـ branch فيها commitين:

~~~text git log --oneline --graph --all بعد الـ squash
* 194908b Add login page (#1)
| * d4ccee4 validate login form
| * 97f6c39 add login page
|/  
* 72d17c8 init
~~~

main خدت commit **واحد جديد** فيه شغل الاتنين، والـ commits الأصلية فضلت في الـ branch لوحدها. عشان كده [[git branch -d]] بعدها بيرفض:

~~~text git branch -d feature/login
error: the branch 'feature/login' is not fully merged
~~~

لأن Git مش لاقي الـ commits دي نفسها في main (اللي في main commit تاني بمحتوى نفس الشغل). وده سبب [[--delete-branch]]: [[gh]] عارف إن الـ PR اندمج فبيمسحها هو.

---

## ٧. [[git switch main]] و [[git pull]]

الدمج حصل على GitHub، فـ main على جهازك لسه قديمة. [[git pull]] بيجيب الـ commit الجديد ([[Add login page (#1)]])، وأي branch جاية تعملها من main تبدأ من آخر نسخة.

---

## الخلاصة

| الخطوة | الأمر | فين بيحصل |
|---|---|---|
| مرة واحدة | [[gh auth login]] | جهازك + GitHub |
| branch | [[git switch -c NAME]] | جهازك |
| رفع | [[git push -u origin NAME]] | GitHub |
| PR | [[gh pr create --fill]] | GitHub |
| مراجعة | [[gh pr list]] و [[gh pr checkout N]] | الاتنين |
| دمج | [[gh pr merge N --squash --delete-branch]] | GitHub |
| تحديث | [[git switch main]] و [[git pull]] | جهازك |`,
          lines: [
            "سجّل دخول gh بحسابك مرة واحدة.",
            "اعمل branch للميزة.",
            "ارفعها لـ GitHub واربطها ([[-u]]).",
            "اعمل Pull Request، والعنوان والوصف من الـ commits ([[--fill]]).",
            "اعرض الـ PRs المفتوحة.",
            "نزّل PR رقم 42 على جهازك تجرّبه.",
            "ادمجه كـ commit واحد ([[--squash]]) وامسح الـ branch.",
            "ارجع لـ main.",
            "هات الدمج الجديد."
          ],
          sol: R`[[gh pr create --fill]] بياخد العنوان والوصف من الـ commits ويطبع رابط زي [[https://github.com/USER/REPO/pull/1]]. و [[gh pr list]] بيوريه بالرقم والعنوان واسم الـ branch.

[[gh pr merge 1 --squash --delete-branch]] بيطبع حاجة زي [[✓ Squashed and merged pull request USER/REPO#1]] و [[✓ Deleted branch feature/login]]. وبعد [[git switch main]] و [[git pull]] بتلاقي commit واحد جديد على main فيه كل شغل الـ PR.

الغلط الشائع: [[gh pr create]] يقول [[you must first push the current branch]]: نسيت [[git push -u]]. أو [[gh]] يقول إنك مش مسجّل: [[gh auth login]] الأول. ولو الـ merge اترفض بسبب checks أو branch protection، الرسالة بتقولك إيه الناقص.`
        },
        {
          cmd: "git stash",
          title: "شيل التعديلات على جنب",
          desc: R`[[git stash]] بياخد التعديلات اللي لسه متعملهاش commit ويشيلها على جنب في «رف»، ويرجّع ملفاتك نضيفة زي آخر commit. ده مفيد لما تكون في نص حاجة ومحتاج تنقل branch بسرعة تصلّح حاجة عاجلة، ومش عايز تعمل commit لكود نص نص.

[[push -m "..."]] بيشيل التعديلات باسم تفتكرها بيه. [[list]] بتعرض اللي على الرف، والأحدث اسمه [[stash@{0}]]. [[pop]] بيرجّع آخر حاجة اتشالت على ملفاتك ويمسحها من الرف، و [[apply]] بيرجّعها ويسيبها على الرف، لو عايز تطبّقها في أكتر من branch.

خد بالك: الملفات الجديدة اللي Git مش متابعها (untracked) مش بتتشال من غير [[-u]]. والـ stash محلي على جهازك بس، مش بيترفع مع push.`,
          example: R`git stash push -m "half-done header"
git stash list
git switch main
git stash pop`,
          try: "عدّل ملف، اعمل stash، اتأكد إن التعديل اختفى، وبعدين pop.",
          deep: {
            why: "انت في نص حاجة مش خلصانة، وفجأة لازم تصلّح حاجة عاجلة في branch تانية. مش عايز تعمل commit لكود نص نص، ومش عايز تضيّعه.",
            how: R`[[git stash]] بياخد كل التعديلات اللي لسه متعملهاش commit، ويشيلها في «رف» جنب، ويرجّع ملفاتك نضيفة زي آخر commit. فتقدر تنقل branch وانت مطمّن.

الرف ده عبارة عن «stack»: آخر حاجة بتحطها فوق. [[git stash list]] بيعرض اللي على الرف.

[[git stash pop]] بياخد آخر حاجة اتشالت ويرجّعها على ملفاتك، ويشيلها من الرف. و [[git stash apply]] نفس الحاجة بس بيسيبها على الرف كمان، لو عايز تطبّقها على كذا branch.

و [[-m]] بيدّيها اسم، مفيد لو عندك أكتر من حاجة متشالة.`,
            when: "حاجة عاجلة وسط شغلك. عملت تعديلات على branch غلط: stash، وبعدين switch للصح، وبعدين pop.",
            mistakes: "إنك تنسى إن عندك حاجات متشالة، وتتراكم. شوف [[git stash list]] كل فترة. والملفات الجديدة خالص (untracked) الـ stash العادي مش بياخدها، محتاج [[-u]]."
          },
          teach: R`## الأول: رف جنب الـ repo

[[git stash]] بياخد التعديلات اللي لسه متعملهاش commit، ويشيلها على «رف» جوه [[.git]]، ويرجّع ملفاتك زي آخر commit. وبعدين ترجّعها وقت ما تحب، على نفس الـ branch أو غيرها. الناتج تحت من repo تجربة على ويندوز (Git 2.56): على branch اسمها [[feature/header]]، عدّلت [[header.html]] وعملت ملف جديد [[menu.js]]:

~~~text git status -s
 M header.html
?? menu.js
~~~

---

## ١. [[git stash push -m "half-done header"]]

| الحتة | معناها |
|---|---|
| [[stash push]] | شيل التعديلات على الرف ([[git stash]] لوحدها نفس الحاجة) |
| [[-m "..."]] | message: اسم تفتكرها بيه |

~~~text الناتج
Saved working directory and index state On feature/header: half-done header
~~~

[[working directory and index]] يعني شال التعديلات اللي في ملفاتك واللي في منطقة التحضير (الـ index) الاتنين. و [[On feature/header]] الـ branch اللي اتشالت منها.

~~~text git status -s بعدها
?? menu.js
~~~

[[header.html]] رجع نضيف، بس [[menu.js]] **لسه موجود**: الـ stash العادي مبياخدش الملفات الجديدة اللي Git مش متابعها (untracked). لو عايزها معاه: [[git stash push -u]] ([[-u]] = [[--include-untracked]])، وبعدها [[git status -s]] بيطلع فاضي خالص.

ومن غير [[-m]]، الاسم بيبقى آلي: [[WIP on feature/header: ec96f40 init]]. [[WIP]] اختصار work in progress، وبعدها آخر commit كان موجود. بعد كام stash كده مش هتعرف مين فيهم إيه، عشان كده [[-m]].

---

## ٢. [[git stash list]]

~~~text الناتج
stash@{0}: On feature/header: half-done header
~~~

[[stash@{0}]] اسم الحاجة دي على الرف. الرف stack: آخر حاجة اتحطت رقمها [[0]]، واللي قبلها [[stash@{1}]]، وهكذا. وكل ما تشيل حاجة جديدة الأرقام القديمة بتزيد واحد.

---

## ٣. [[git switch main]]

~~~text الناتج
Switched to branch 'main'
~~~

الـ switch عدّى من غير مشاكل لأن ملفاتك نضيفة. ده الهدف من الـ stash: تتنقل وانت مطمّن.

---

## ٤. [[git stash pop]]

[[pop]] بياخد [[stash@{0}]]، يطبّقه على ملفاتك **في المكان اللي انت فيه دلوقتي**، ويمسحه من الرف:

~~~text الناتج (آخره)
	modified:   header.html
...
Dropped refs/stash@{0} (ad9c1e478b75f1355e29e2182764759ab8016942)
~~~

لاحظ: إحنا عملنا pop وإحنا على **main**، فالتعديل نزل على main مش على feature/header. وده استخدام مقصود ساعات: بدأت تعدّل وانت على branch غلط؟ [[stash]]، ثم [[switch]] للصح، ثم [[pop]]. لو عايزه يرجع مكانه، اعمل switch لـ feature/header الأول وبعدين pop.

[[Dropped]] يعني اتشال من الرف، والرقم الطويل hash الـ stash (هو commit مخفي جوه Git).

### [[pop]] ولا [[apply]]؟

| | [[git stash pop]] | [[git stash apply]] |
|---|---|---|
| بيطبّق التعديل | آه | آه |
| بيمسحه من الرف | آه (لو نجح) | لأ، تمسحه بـ [[git stash drop]] |

### لو الـ pop عمل conflict

جرّبت: شلت تعديل على سطر، وبعدين عملت commit غيّر نفس المكان، وعملت pop:

~~~text الناتج
Auto-merging header.html
CONFLICT (content): Merge conflict in header.html
...
The stash entry is kept in case you need it again.
~~~

نفس علامات الـ conflict اللي في درس «الـ conflicts»، و Git **ساب** الـ stash على الرف عشان متخسرش حاجة. صلّح الملف، وبعدين [[git stash drop]] بإيدك.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git stash push -m "NAME"]] | شيل التعديلات (المتابعة بس) باسم |
| [[git stash push -u]] | ومعاها الملفات الجديدة |
| [[git stash list]] | اعرض الرف، [[stash@{0}]] الأحدث |
| [[git stash pop]] | طبّق الأحدث هنا وامسحه |
| [[git stash apply]] | طبّق وسيبه |
| [[git stash drop]] | امسح الأحدث من غير ما تطبّقه |

الـ stash محلي على جهازك بس، مش بيترفع مع [[push]]. فمتسيبش شغل مهم عليه أيام.`,
          lines: [
            "شيل التعديلات على جنب برسالة تفتكرها بيها.",
            "اعرض كل اللي متشال.",
            "روح branch تانية وانت مطمّن.",
            "رجّع آخر حاجة شيلتها ([[pop]])."
          ],
          sol: R`[[git stash push -m "half-done header"]] بيطبع [[Saved working directory and index state On main: half-done header]]. و [[git stash list]] بيوري [[stash@{0}: On main: half-done header]]، و [[git status]] بيبقى نضيف كأنك معدّلتش حاجة.

[[git stash pop]] بيرجّع التعديل ([[git status]] يوريه modified تاني) ويطبع [[Dropped refs/stash@{0}]]، يعني اتشال من القايمة.

الغلط الشائع: ملف جديد (untracked) مش بيتعمله stash من غير [[-u]]، فتلاقيه لسه موجود. ولو pop عمل conflict، الـ stash مش بيتمسح؛ صلّح وبعدين [[git stash drop]].`
        }
      ]
    }
]);
