// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "تصليح الأخطاء",
      l: 3,
      n: "أهم قسم: Git نادرًا ما بيمسح حاجة بجد، ومعظم الغلطات ليها رجوع",
      items: [
        {
          cmd: "git restore",
          title: "ارجع ملف لآخر commit",
          desc: R`[[git restore]] بيرجّع ملف لنسخة محفوظة. من غير فلاجات ([[git restore index.js]]) بيكتب فوق ملفك آخر نسخة متحفظة (من منطقة التحضير، أو من آخر commit لو مفيش حاجة متجهزة)، يعني أي تعديل عملته ولسه معملتلوش add بيتمسح. التعديل ده عمره ما دخل Git، فمالوش رجوع من أي حتة.

[[--staged]] حاجة تانية خالص: بتلغي الـ [[add]] بس، يعني بتشيل الملف من منطقة التحضير والتعديل نفسه بيفضل في ملفك. دي آمنة تمامًا. و [[--source a1b2c3d]] بتجيب الملف زي ما كان في commit معين (الرقم ده الـ hash من [[git log --oneline]])، والملفات التانية مش بتتأثر.

قبل أي restore من غير [[--staged]] بص على [[git diff index.js]]: اللي هيظهر ده بالظبط اللي هيضيع.`,
          example: R`git restore index.js
git restore --staged index.js
git restore --source a1b2c3d index.js`,
          try: "بوّظ ملف عمدًا، ورجّعه بـ restore.",
          flag: "danger",
          deep: {
            why: "عدّلت ملف وبوّظته، وعايز ترجّعه زي ما كان في آخر commit. أو عملت add لملف بالغلط وعايز تشيله من التحضير.",
            how: R`افتكر التلات أماكن (ملفاتك، ومنطقة التحضير، والـ commits). [[restore]] بياخد نسخة من مكان ويحطها في مكان تاني:

[[git restore file]] بياخد النسخة اللي في منطقة التحضير (أو آخر commit لو مفيش حاجة متحضرة) ويكتبها فوق ملفك. يعني تعديلاتك اللي معملتلهاش add بتتمسح. وده من الحاجات القليلة في Git اللي مالهاش رجوع، لأن التعديلات دي عمرها ما اتحفظت في Git.

[[git restore --staged file]] العكس: بيشيل الملف من منطقة التحضير (يعني يلغي الـ add)، والتعديل نفسه بيفضل في ملفك. آمن تمامًا.

و [[--source a1b2c3d]] بيجيب الملف زي ما كان في commit معين قديم، والباقي ميتأثرش.`,
            when: "جرّبت حاجة ومنفعتش: ارجع لآخر commit. عملت [[add .]] ودخل ملف مش عايزه: [[--staged]]. ملف اتبوّظ من كام commit: [[--source]].",
            mistakes: "[[restore]] من غير [[--staged]] وانت كنت عايز تلغي الـ add بس، فتمسح شغلك. اقرا الأمر كويس."
          },
          teach: R`## الأول: التلات أماكن اللي الملف بيتنقل بينهم

[[git restore]] بياخد نسخة من ملف من مكان ويكتبها في مكان تاني. فلازم تفتكر الأماكن التلاتة:

| المكان | اسمه في Git | فيه إيه |
|---|---|---|
| ملفاتك اللي قدامك | working tree | اللي بتعدّله في المحرر |
| منطقة التحضير | staging area أو index | اللي عملتله [[git add]] |
| آخر commit | [[HEAD]] | آخر نسخة اتحفظت في التاريخ |

كل سطر في المثال بينقل نسخة في اتجاه مختلف. كل الأوامر تحت اتشغّلت في Git Bash على ويندوز (Git 2.56) في repo تجربة فيه ملف [[index.js]] وعليه commitين: [[v1]] و [[v2]].

---

## ١. [[git restore index.js]]

### الحالة قبل الأمر

بوّظنا الملف بسطر زيادة:

~~~bash
echo 'BROKEN' >> index.js
git status -s
~~~

~~~text الناتج
 M index.js
~~~

[[-s]] من short: سطر لكل ملف. والحرف [[M]] (modified) في **العمود التاني** معناه إن الملف اتعدّل في ملفاتك ولسه متعملهوش add. العمود الأول للـ staging والتاني لملفاتك.

### بص الأول على اللي هيضيع

~~~bash
git diff index.js
~~~

~~~text الناتج
diff --git a/index.js b/index.js
index 64d0be2..58d3f11 100644
--- a/index.js
+++ b/index.js
@@ -1 +1,2 @@
 console.log("v2")
+BROKEN
~~~

أول ٤ سطور بتقول إن المقارنة بين [[a/index.js]] (النسخة المحفوظة) و [[b/index.js]] (ملفك). و [[@@ -1 +1,2 @@]] معناها: السطر ١ في القديم بقى سطرين في الجديد. والسطر اللي قدامه [[+]] ده بالظبط اللي هيتمسح.

### الأمر نفسه

~~~bash
git restore index.js
git status -s
cat index.js
~~~

~~~text الناتج
console.log("v2")
~~~

[[git restore]] مطبعش أي حاجة، و [[git status -s]] مطبعش حاجة (يعني مفيش تعديلات)، والملف رجع زي آخر commit. السكوت في Git معناه إن الأمر نجح.

> من غير أي فلاج، restore بياخد النسخة من **منطقة التحضير** ويكتبها فوق ملفك. ولو مفيش حاجة متحضرة، منطقة التحضير بتبقى نفس آخر commit. والتعديل اللي اتمسح عمره ما دخل Git، فمالوش رجوع، ولا حتى من [[git reflog]].

### الفخ: عملت add للبوظان

~~~bash
echo 'BAD' >> index.js
git add index.js
git restore index.js
git status -s
~~~

~~~text الناتج
M  index.js
~~~

الملف **مارجعش**. ليه؟ لأن restore جاب النسخة من منطقة التحضير، واللي في منطقة التحضير هو البوظان نفسه. و [[M]] هنا في العمود **الأول**، يعني التعديل staged.

---

## ٢. [[git restore --staged index.js]]

[[--staged]] بتغيّر الاتجاه: خد النسخة من آخر commit واكتبها في **منطقة التحضير** بس، وسيب ملفك في حاله. يعني بتلغي الـ add:

~~~bash
git restore --staged index.js
git status -s
~~~

~~~text الناتج
 M index.js
~~~

الـ [[M]] اتنقلت من العمود الأول للتاني: التعديل لسه في ملفك بس مبقاش متحضر. ده آمن تمامًا، مفيش حاجة بتضيع. ودلوقتي لو عايز ترمي التعديل كمان: [[git restore index.js]].

---

## ٣. [[git restore --source a1b2c3d index.js]]

[[--source]] بتقول: «هات النسخة من الـ commit ده، مش من التحضير». والرقم ده الـ hash بتاع الـ commit، وبتجيبه من:

~~~bash
git log --oneline
~~~

~~~text الناتج
058b834 v2
bc4f15f v1
~~~

كل سطر: أول ٧ حروف من رقم الـ commit (الـ hash)، وبعده الرسالة. Git بيقبل الرقم المختصر طول ما مفيش commit تاني بيبدأ بنفس الحروف.

~~~bash
git restore --source bc4f15f index.js
cat index.js
git status -s
~~~

~~~text الناتج
console.log("v1")
 M index.js
~~~

الملف رجع زي [[v1]]، وباقي الملفات متأثرتش. ولاحظ إن [[git status]] شايفه **متعدّل** ([[ M]]): restore مش بيعمل commit، هو بيغيّر ملفك بس. لو عايز التغيير ده يتحفظ: [[git add]] و [[git commit]] عادي، ولو غيّرت رأيك: [[git restore index.js]] يرجّعه لآخر commit.

---

## مين بيكتب فين

| الأمر | بياخد النسخة من | بيكتبها في | ممكن يضيّع شغل؟ |
|---|---|---|---|
| [[git restore file]] | منطقة التحضير | ملفك | آه، تعديلاتك اللي من غير add |
| [[git restore --staged file]] | آخر commit | منطقة التحضير | لأ |
| [[git restore --source hash file]] | الـ commit ده | ملفك | آه، تعديلاتك الحالية على الملف ده |

الأوامر دي نفسها بالظبط في PowerShell و CMD والماك، لأنها أوامر Git مش أوامر الشيل.

## الخلاصة

- [[--staged]] = الغي الـ add بس، آمن.
- من غير [[--staged]] = ارمي تعديلاتك، ومالهاش رجوع، فبص على [[git diff]] الأول.
- لو عملت add للبوظان: [[--staged]] الأول، وبعدين restore العادي.`,
          lines: [
            "رجّع الملف زي آخر نسخة محفوظة، وتعديلاتك عليه تضيع.",
            "شيل الملف من التحضير (الغي الـ add)، والتعديل يفضل.",
            "هات الملف زي ما كان في commit معين قديم."
          ],
          sol: R`بعد ما تبوّظ الملف: [[git status -s]] بيوري [[ M index.js]]. بعد [[git restore index.js]]: [[git status -s]] مش بيطلّع حاجة، و [[cat]] بيوري المحتوى زي آخر commit.

[[restore]] مش بيطبع أي رسالة لو نجح، والسكوت هنا معناه إنه اشتغل.

الغلط الشائع: تبوّظ الملف وتعمل [[git add]] وبعدين [[git restore index.js]] فمايرجعش. الـ restore العادي بيرجّع من الـ staging، واللي في الـ staging هو البوظان. اعمل [[git restore --staged index.js]] الأول وبعدين [[git restore index.js]]. وخلّي بالك: التعديل اللي بيضيع بـ restore مش بيرجع من أي حتة.`
        },
        {
          cmd: "git clean",
          title: "امسح الملفات اللي Git مش متابعها",
          desc: "[[restore]] و [[reset --hard]] بيرجّعوا الملفات المتابعة بس، والملفات الجديدة (untracked) بيسيبوها. [[clean]] هو اللي بيمسحها. ابدأ دايمًا بـ [[-n]] يوريك هيمسح إيه من غير ما يمسح. [[-d]] الفولدرات كمان، و [[-x]] حتى اللي في .gitignore زي node_modules و .env. واللي بيتمسح بـ clean مالوش رجوع، ولا حتى من reflog.",
          example: R`git clean -n
git clean -nd
git clean -fd
git clean -ndx`,
          try: "اعمل ملفين جداد وفولدر، شوفهم بـ [[-n]]، وبعدين امسحهم بـ [[-fd]].",
          flag: "danger",
          deep: {
            why: "بعد تجربة أو build أو merge فاشل، الفولدر بيتملى ملفات جديدة مش عايزها، و [[restore]] مش بيشيلها.",
            how: R`Git بيقسم الملفات لمتابعة وغير متابعة. [[clean]] بيشتغل على غير المتابعة بس: أي ملف عمره ما اتعمله add.

وعشان خطير، Git مش هيمسح حاجة من غير [[-f]] (force). و [[-n]] بيعرض القايمة بس، و [[-d]] بيضيف الفولدرات، و [[-x]] بيضيف كمان الملفات اللي في [[.gitignore]].

ولأن الملفات دي عمرها ما دخلت Git، مفيش نسخة منها في أي مكان.`,
            when: "عايز الفولدر يرجع نضيف زي ما clone لسه نازل. وقبلها [[git status]] و [[-n]].",
            mistakes: "[[-fdx]] على طول، فيمسح .env ومعاه كل الـ secrets المحلية. دايمًا [[-n]] الأول."
          },
          teach: R`## الأول: Git شايف الملفات ٣ أنواع

[[git clean]] بيمسح الملفات اللي Git **مش متابعها**. فقبل الأمر لازم تعرف الأنواع:

| النوع | يعني إيه | [[git status -s]] بيعرضه |
|---|---|---|
| tracked (متابَع) | دخل commit قبل كده | [[ M]] لو اتعدّل |
| untracked (جديد) | عمره ما اتعمله add | [[??]] |
| ignored (متجاهَل) | اسمه في [[.gitignore]] | مش بيظهر خالص (غير بـ [[--ignored]]) |

[[restore]] و [[reset --hard]] بيشتغلوا على الـ tracked بس. و [[clean]] للنوعين التانيين.

جهّزنا repo تجربة (Git Bash على ويندوز، Git 2.56) فيه [[.gitignore]] بيتجاهل [[.env]] و [[*.log]]، وعملنا ملفات جديدة:

~~~bash
touch a.tmp b.tmp
mkdir build && touch build/x
echo SECRET=1 > .env
echo log > app.log
git status -s
~~~

~~~text الناتج
?? a.tmp
?? b.tmp
?? build/
~~~

[[touch]] بيعمل ملف فاضي، و [[mkdir]] فولدر. ولاحظ إن [[.env]] و [[app.log]] مش ظاهرين لأنهم ignored.

---

## ١. [[git clean -n]]

[[-n]] من dry run: «قولّي هتمسح إيه، ومتمسحش».

~~~text الناتج
Would remove a.tmp
Would remove b.tmp
~~~

[[Would remove]] يعني «كان هيمسح». والفولدر [[build/]] مش في القايمة: clean من غير [[-d]] مش بيلمس الفولدرات الجديدة.

## ٢. [[git clean -nd]]

[[-d]] من directories: ضيف الفولدرات الجديدة. و [[-nd]] هي [[-n]] و [[-d]] لازقين في بعض، زي أغلب الأوامر.

~~~text الناتج
Would remove a.tmp
Would remove b.tmp
Would remove build/
~~~

## ٣. [[git clean -fd]]

[[-f]] من force: «امسح بجد». من غيرها Git بيرفض خالص. جرّبنا [[git clean]] لوحده:

~~~text الناتج (Git 2.56)
fatal: clean.requireForce is true and -f not given: refusing to clean
~~~

يعني الإعداد [[clean.requireForce]] قيمته true، فمن غير [[-f]] مش هيمسح. وفي Git أقدم (2.43 اللي على أوبونتو 24.04) نفس الرفض بكلام تاني: [[clean.requireForce defaults to true and neither -i, -n, nor -f given; refusing to clean]].

ودلوقتي المسح الحقيقي:

~~~text الناتج
Removing a.tmp
Removing b.tmp
Removing build/
~~~

[[Removing]] بدل [[Would remove]]: اتمسحوا فعلًا. ومش في سلة المهملات.

## ٤. [[git clean -ndx]]

[[-x]] بتضيف الملفات الـ ignored كمان. واحنا لسه حاطين [[-n]]، فده عرض بس:

~~~text الناتج
Would remove .env
Would remove app.log
~~~

(لو كانت الملفات الجديدة لسه موجودة كانت هتظهر معاهم.) ده بالظبط سبب خطورة [[-x]]: [[.env]] فيه الـ secrets بتاعتك، و [[node_modules]] و [[dist]] غالبًا في [[.gitignore]] برضه. [[-fdx]] بيرجّع الفولدر زي clone لسه نازل، وبيمسح كل ده.

---

## الفلاجات مع بعض

| الفلاج | من | بيعمل إيه |
|---|---|---|
| [[-n]] | dry run | يعرض بس |
| [[-f]] | force | يمسح فعلًا (لازمة) |
| [[-d]] | directories | الفولدرات الجديدة كمان |
| [[-x]] | | الـ ignored كمان (خطر) |
| [[-i]] | interactive | يسألك ملف ملف |

والأوامر نفسها في PowerShell و CMD والماك. الفرق الوحيد في تجهيز الملفات: [[touch]] مش موجود في PowerShell، استخدم [[New-Item a.tmp, b.tmp]] أو اعمل الملفات من المحرر.

## الخلاصة

- دايمًا [[-n]] الأول، وبعدين نفس الأمر بـ [[-f]] مكانها.
- [[-x]] بيمسح [[.env]]: متستخدموش غير وانت عارف.
- اللي clean مسحه مالوش رجوع من Git ولا reflog، لأنه عمره ما دخل Git.`,
          lines: [
            "وريني الملفات الجديدة اللي هتتمسح ([[-n]] dry run). مفيش حاجة بتتمسح.",
            "نفسه والفولدرات الجديدة كمان ([[-d]]).",
            "امسحهم فعلًا. [[-f]] لازمة، من غيرها Git بيرفض.",
            "وريني اللي هيتمسح لو ضفت [[-x]]: هتلاقي node_modules و .env. متشيلش [[-n]] من ده غير لو متأكد."
          ],
          sol: R`[[git clean -n]] بيطبع [[Would remove a.tmp]] و [[Would remove b.tmp]] بس، من غير الفولدر. و [[-nd]] بيزوّد [[Would remove build/]]. و [[-fd]] بيمسحهم فعلًا ويطبع [[Removing a.tmp]]، و [[Removing b.tmp]]، و [[Removing build/]].

و [[-ndx]] بعدها بيوري الملفات المتجاهلة زي [[.env]] و [[app.log]]، ودي اللي [[-x]] كان هيمسحها. عشان كده [[-x]] خطير: ممكن يمسح [[.env]] بتاعك.

الغلط الشائع: [[git clean]] من غير [[-n]] ولا [[-f]] يرفض ويقول [[clean.requireForce defaults to true]]، وده مقصود. والملفات اللي clean مسحها مش في سلة المهملات ولا في reflog.`,
          solCode: R`touch a.tmp b.tmp && mkdir build && touch build/x
git clean -n
git clean -nd
git clean -fd
git clean -ndx`
        },
        {
          cmd: "git commit --amend",
          title: "صلّح آخر commit",
          desc: R`[[--amend]] بيصلّح آخر commit بدل ما تعمل commit جديد اسمه «forgot file». لو نسيت ملف: [[git add]] للملف، وبعدين [[git commit --amend --no-edit]]، فالملف يدخل في آخر commit، و [[--no-edit]] معناها سيب الرسالة زي ما هي. ولو الرسالة نفسها فيها غلطة: [[git commit --amend -m "better message"]].

Git مش بيعدّل commits أبدًا: amend بيعمل commit جديد برقم (hash) جديد ويحطه مكان القديم. عشان كده استخدمه بس على commit لسه معملتلوش push. لو القديم اترفع، الـ push الجاي هيترفض، ولو أجبرته بـ force هتبوّظ تاريخ أي حد سحبه.`,
          example: R`git add forgotten.js
git commit --amend --no-edit
git commit --amend -m "better message"`,
          try: "اعمل commit، وبعدين ضيف له ملف بـ amend.",
          deep: {
            why: "لسه عامل commit، ولاحظت إنك نسيت ملف، أو الرسالة فيها غلطة. بدل commit جديد اسمه «forgot file»، صلّح الأخير.",
            how: R`[[--amend]] مش بيعدّل الـ commit القديم، لأن Git مش بيعدّل commits أبدًا. هو بيعمل commit جديد فيه كل حاجة كانت في القديم زائد اللي ضفته، ويخلي الـ branch تشاور عليه بدل القديم. والقديم بيفضل موجود في reflog.

فلو عملت [[add]] لملف وبعدين [[commit --amend --no-edit]]، الملف بيدخل في الـ commit الأخير وبنفس الرسالة. و [[-m]] بيغيّر الرسالة.

ولأن ده commit جديد برقم جديد، لو كان القديم اترفع على GitHub، دلوقتي عندك تاريخ مختلف عن GitHub.`,
            when: "بعد commit على طول، قبل ما تعمل push.",
            mistakes: "amend لـ commit اترفع وحد تاني سحبه. هتضطر تعمل force push، وتبوّظ تاريخ اللي معاك. القاعدة: amend للحاجات اللي على جهازك بس."
          },
          teach: R`## الأول: amend مش بيعدّل، بيستبدل

[[git commit --amend]] بيعمل commit جديد فيه محتوى آخر commit زائد أي حاجة في منطقة التحضير، ويحطه **مكان** آخر commit. القديم مش بيتعدّل (Git عمره ما بيعدّل commit)، هو بس بيبطّل يبقى في الـ branch.

اتشغّل في Git Bash على ويندوز (Git 2.56)، في repo فيه commit اسمه [[init]]، وعملنا commit جديد:

~~~bash
echo x > main.js
git add main.js
git commit -m "feat x"
~~~

~~~text الناتج
[main 7213014] feat x
 1 file changed, 1 insertion(+)
 create mode 100644 main.js
~~~

السطر الأول: الـ branch ([[main]])، ورقم الـ commit المختصر ([[7213014]])، والرسالة. و [[create mode 100644]] معناها ملف جديد عادي (مش executable).

---

## ١. [[git add forgotten.js]]

افتكرت إن فيه ملف نسيته. أول خطوة زي أي commit: حطه في منطقة التحضير.

~~~bash
echo f > forgotten.js
git add forgotten.js
~~~

## ٢. [[git commit --amend --no-edit]]

- [[--amend]]: متعملش commit جديد فوق الأخير، اعمل واحد **مكانه**.
- [[--no-edit]]: سيب الرسالة زي ما هي ومتفتحش المحرر. من غيرها Git بيفتح المحرر بالرسالة القديمة عشان تعدّلها لو حبيت.

~~~text الناتج
[main 731c62f] feat x
 Date: Tue Oct 6 13:32:49 2026 +0300
 2 files changed, 2 insertions(+)
 create mode 100644 forgotten.js
 create mode 100644 main.js
~~~

بص على ٣ حاجات:

1. الرقم اتغير: [[7213014]] بقى [[731c62f]]. ده commit جديد فعلًا.
2. سطر [[Date:]]: ده تاريخ الـ commit الأصلي. amend بيحافظ عليه.
3. [[2 files changed]]: Git بيوري كل اللي في الـ commit مقارنة باللي قبله، يعني الملف القديم والجديد مع بعض.

~~~bash
git log --oneline
~~~

~~~text الناتج
731c62f feat x
1da83be init
~~~

commit واحد بالرسالة دي، مش اتنين. و [[7213014]] اختفى من التاريخ (بس لسه في [[git reflog]] لو احتجته).

## ٣. [[git commit --amend -m "better message"]]

[[-m]] من message: رسالة جديدة بدل القديمة. ولو مفيش حاجة في منطقة التحضير، الملفات مش بتتغير، الرسالة بس:

~~~bash
git commit --amend -m "feat: add x"
git log --oneline
~~~

~~~text الناتج
50d8619 feat: add x
1da83be init
~~~

رقم جديد تاني، لأن الرسالة جزء من الـ commit، وأي تغيير فيها بيدّي رقم جديد.

---

## ليه ميتعملش على حاجة اترفعت

رفعنا الـ commit لـ remote تجريبي (bare repo على نفس الجهاز)، وبعدين عملنا amend تاني وجرّبنا push:

~~~text الناتج
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to '.../origin.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart.
~~~

[[non-fast-forward]] معناها إن الـ remote عنده commit ([[50d8619]]) مش موجود في تاريخك، لأنك استبدلته. Git بيرفض عشان ميمسحش حاجة من عنده. الحل الوحيد force push، ودي بتبوّظ تاريخ أي حد سحب.

| الحالة | تعمل إيه |
|---|---|
| الـ commit على جهازك بس | [[--amend]] براحتك |
| اترفع على branch لوحدك | [[--amend]] وبعدين [[git push --force-with-lease]] |
| اترفع على main مشترك | commit جديد عادي، متعملش amend |

الأوامر نفسها في PowerShell و CMD والماك.

## الخلاصة

- [[--amend --no-edit]]: ضيف اللي في التحضير لآخر commit بنفس رسالته.
- [[--amend -m]]: غيّر رسالة آخر commit.
- أي amend = رقم جديد، فمتعملوش لحاجة حد تاني عنده.`,
          lines: [
            "جهّز الملف اللي نسيته.",
            "ضيفه لآخر commit، بنفس الرسالة ([[--no-edit]]).",
            "أو غيّر رسالة آخر commit."
          ],
          sol: R`[[git commit --amend --no-edit]] بيطبع نفس رسالة الـ commit القديم بس برقم جديد (زي [[[main 095033e] feat x]])، وتحته [[create mode 100644 forgotten.js]].

[[git log --oneline]] لسه فيه commit واحد بالرسالة دي مش اتنين، و [[git show --stat HEAD]] بيوري الملف الجديد جواه. الرقم اتغير لأن amend بيعمل commit جديد مكان القديم.

الغلط الشائع: تعمل amend لـ commit اتعمله push، وبعدين [[git push]] يترفض بـ [[rejected (non-fast-forward)]]. على branch لوحدك استخدم [[--force-with-lease]]، لكن على main المشترك متعملش amend، اعمل commit جديد.`,
          solCode: R`echo x > main.js && git add main.js && git commit -m "feat x"
echo f > forgotten.js && git add forgotten.js
git commit --amend --no-edit
git log --oneline -2
git show --stat HEAD`
        },
        {
          cmd: "git reset",
          title: "ارجع لورا",
          desc: "[[--soft HEAD~1]] بيلغي آخر commit ويسيب التعديلات متجهزة، وده أمان. [[--hard]] بيمسح التعديلات خالص. متعملش reset لـ commits اتعملها push واتشاركت، استخدم revert بدلها.",
          example: R`git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1`,
          try: "اعمل commit والغيه بـ [[--soft]]، ولاحظ إن التعديلات لسه موجودة.",
          flag: "danger",
          deep: {
            why: "عايز «تلغي» commit أو كذا commit، وترجع لنقطة قبلهم.",
            how: R`[[HEAD~1]] معناها «الـ commit اللي قبل الحالي بواحد»، و [[HEAD~3]] قبله بتلاتة.

[[reset]] بيحرّك الـ branch لورا، تشاور على commit أقدم. والفرق بين الأنواع التلاتة هو إيه اللي بيحصل للتعديلات اللي كانت في الـ commits اللي «اتشالت»:

[[--soft]]: الـ commits بتتشال، بس التعديلات بتاعتها بتفضل في منطقة التحضير، جاهزة تعمل commit تاني. كأنك رجعت للحظة قبل [[git commit]] بالظبط. آمن تمامًا.

من غير حاجة (اسمه mixed): الـ commits بتتشال، والتعديلات بتفضل في ملفاتك بس مش متحضرة. كأنك رجعت لقبل [[git add]].

[[--hard]]: الـ commits بتتشال والتعديلات كمان، وملفاتك بترجع زي الـ commit القديم بالظبط. أي حاجة مش متحفظة بتضيع.

والـ commits اللي اتشالت مش بتتمسح فورًا، بتفضل في reflog حوالي شهر، فتقدر ترجعها.`,
            when: "[[--soft HEAD~1]]: عملت commit بدري أو عايز تقسمه. [[--hard]]: عايز ترمي كل حاجة من ساعة commit معين وتبدأ من الأول.",
            mistakes: "reset لـ commits اترفعت على GitHub واتشاركت، فتاريخك يختلف عن الفريق. استخدم revert. و [[--hard]] وعندك تعديلات مش متحفظة في أي commit، دي بتضيع ومالهاش رجوع."
          },
          teach: R`## الأول: reset بيحرّك الـ branch لورا

[[git reset]] بياخد الـ branch اللي انت عليها ويخليها تشاور على commit أقدم. الـ commits اللي بعده بتختفي من [[git log]]. والسؤال الوحيد اللي بيفرق بين الأنواع التلاتة: **التعديلات اللي كانت في الـ commits دي تروح فين؟**

### يعني إيه [[HEAD~1]]؟

- [[HEAD]]: الـ commit اللي انت واقف عليه دلوقتي.
- [[~]] (tilde): «ارجع لورا». و [[~1]] خطوة واحدة، يعني الـ commit اللي قبله. [[HEAD~3]] تلات خطوات.

اتشغّل في Git Bash على ويندوز (Git 2.56)، في repo فيه commitين:

~~~bash
echo r > r.txt
git add r.txt
git commit -m "rtest"
git log --oneline
~~~

~~~text الناتج
07e81d3 rtest
11d9e52 init
~~~

---

## ١. [[git reset --soft HEAD~1]]

[[--soft]] (ناعم): حرّك الـ branch بس، وسيب كل حاجة تانية.

~~~bash
git reset --soft HEAD~1
git log --oneline
git status -s
~~~

~~~text الناتج
11d9e52 init
A  r.txt
~~~

الـ commit اختفى من الـ log، بس [[A]] (added) في العمود الأول معناها إن الملف لسه **staged**، جاهز لـ commit تاني. كأنك رجعت للحظة اللي قبل [[git commit]] بالظبط. مفيد لو عايز تعدّل حاجة وتعمل commit من تاني، أو تقسم commit لاتنين.

## ٢. [[git reset HEAD~1]]

من غير فلاج، اسمه [[--mixed]]: حرّك الـ branch، وفضّي منطقة التحضير، وسيب ملفاتك زي ما هي.

عملنا الـ commit تاني وجرّبنا:

~~~text الناتج
?? r.txt
~~~

الملف لسه موجود على الديسك، بس رجع untracked ([[??]]) لأنه كان ملف جديد. ولو التعديل كان على ملف متابَع، Git بيطبع:

~~~text الناتج
Unstaged changes after reset:
M	a.txt
~~~

يعني رجعت للحظة اللي قبل [[git add]].

## ٣. [[git reset --hard HEAD~1]]

[[--hard]] (جامد): حرّك الـ branch، وفضّي التحضير، **واكتب فوق ملفاتك** بنسخة الـ commit القديم.

~~~bash
echo more >> a.txt
git commit -am "edit a"
git reset --hard HEAD~1
cat a.txt
~~~

~~~text الناتج
HEAD is now at 07e81d3 rtest
a
~~~

[[-am]] في الـ commit يعني [[-a]] (اعمل add لكل الملفات المتابعة اللي اتعدّلت) و [[-m]] (الرسالة). و [[HEAD is now at]] بيقولك وقفت فين. والسطر [[more]] اختفى من الملف.

> الـ commit اللي اتشال لسه في [[git reflog]] حوالي ٣٠ يوم، فترجّعه منه. لكن أي تعديل كان في ملفاتك ومش في commit وقت [[--hard]]، ده بيضيع ومالوش رجوع.

---

## التلاتة جنب بعض

| النوع | الـ branch | منطقة التحضير | ملفاتك | كأنك رجعت لـ |
|---|---|---|---|---|
| [[--soft]] | ترجع | زي ما هي (التعديل staged) | زي ما هي | قبل [[commit]] |
| (mixed) | ترجع | بتتفضى | زي ما هي | قبل [[add]] |
| [[--hard]] | ترجع | بتتفضى | بتتكتب من جديد | قبل ما تعدّل خالص |

الأوامر نفسها في كل الشيلات. بس في CMD الرمز [[^]] ليه معنى خاص، فلو شفت حد كاتب [[HEAD^]] (معناها برضه الـ commit اللي قبله) هتلاقي CMD بيشيل الـ [[^]] بصمت: جرّبنا [[git log --oneline -1 HEAD^ --]] في CMD فطلّع [[07e81d3 rtest]] (الـ HEAD نفسه مش اللي قبله). في CMD اكتبها [[HEAD^^]] أو [["HEAD^"]] بين علامات تنصيص. و [[HEAD~1]] مفيهاش المشكلة دي في أي شيل.

## الخلاصة

- [[--soft]] آمن، [[--hard]] بيمسح من ملفاتك.
- reset لحاجة على جهازك بس. اللي اترفع واتشارك: [[git revert]].
- لو ضاع commit بعد reset: [[git reflog]].`,
          lines: [
            "الغي آخر commit، والتعديلات تفضل متجهزة.",
            "الغي آخر commit، والتعديلات تفضل في ملفاتك بس.",
            "الغي آخر commit وامسح تعديلاته من ملفاتك. خطر."
          ],
          sol: R`بعد [[git reset --soft HEAD~1]]: [[git log --oneline -1]] بيوري الـ commit اللي قبله (بتاعك اختفى من التاريخ)، بس [[git status -s]] بيوري [[A  r.txt]]، يعني التعديل موجود و staged وجاهز تعمل له commit تاني.

الفرق: [[--soft]] بيسيب التعديل staged، والـ reset العادي بيسيبه في الملفات بس مش staged ([[?? r.txt]] أو [[ M]])، و [[--hard]] بيمسحه خالص.

الغلط الشائع: [[--hard]] بدل [[--soft]] فالتعديل يختفي. لو كان متعمله commit ترجّعه من [[git reflog]]. ولو عملت reset لـ commit اتعمله push، الـ push الجاي هيترفض، وده معناه إنك كان المفروض تستخدم revert.`,
          solCode: R`echo r > r.txt && git add r.txt && git commit -m "rtest"
git reset --soft HEAD~1
git status -s
git log --oneline -1`
        },
        {
          cmd: "git revert",
          title: "الغي commit اتعمله push",
          desc: R`[[git revert]] بيلغي commit قديم بإنه يعمل commit جديد فيه العكس بالظبط: السطور اللي القديم ضافها تتشال، واللي شالها ترجع. الـ commit الأصلي بيفضل في التاريخ، وفوقه commit اسمه [[Revert "..."]].

ليه ده مهم؟ لأن التاريخ مش بيتمسح ولا بيتغير، فتعمل [[git push]] عادي، وأي حد في الفريق يعمل pull من غير مشاكل. ده عكس [[reset]] اللي بيشيل commits من التاريخ ومحتاج force push. عشان كده revert هو الطريق الآمن لأي commit اترفع على main.

في المثال: [[git log --oneline]] تجيب منه رقم الـ commit (الـ hash)، و [[git revert a1b2c3d]] بيفتح المحرر برسالة جاهزة، تقفله فيتعمل الـ commit، وبعدين [[git push]]. لو مش عايز المحرر يفتح: [[--no-edit]].`,
          example: R`git log --oneline
git revert a1b2c3d
git push`,
          try: "اعمل revert لـ commit قديم وبص على log.",
          deep: {
            why: "commit اترفع على main وعمل مشكلة في الإنتاج. مينفعش تمسحه بـ reset لأن الفريق عنده. محتاج تلغيه بطريقة آمنة.",
            how: R`[[revert]] مش بيمسح الـ commit. بيبص على التعديلات اللي عملها، ويعمل commit جديد بعكسها بالظبط: كل سطر اتضاف يتشال، وكل سطر اتشال يرجع.

النتيجة: التاريخ فيه الـ commit الأصلي، وبعده commit اسمه «Revert ...». محدش تاريخه اتغير، فكله يعمل pull عادي. ولو بعدين عايز الميزة ترجع، تعمل revert للـ revert.

والفرق مع reset: reset بيعيد كتابة التاريخ (زي ما تقطع صفحة من الكشكول)، revert بيضيف للتاريخ (زي ما تكتب «السطر اللي فوق غلط، الصح كذا»).`,
            when: "أي تصليح لحاجة اترفعت ومتشاركة، خصوصًا على main.",
            mistakes: "استخدام reset و force push على main المشتركة بدل revert."
          },
          teach: R`## الأول: revert بيضيف، مش بيمسح

[[git revert]] بياخد commit قديم، ويحسب عكسه بالظبط، ويعمل بيه **commit جديد** فوق التاريخ. الـ commit القديم بيفضل مكانه. ولأن التاريخ مااتغيرش غير إنه زاد commit، الـ push بيعدّي عادي من غير force.

اتشغّل في Git Bash على ويندوز (Git 2.56)، مع remote تجريبي (bare repo على نفس الجهاز) بدل GitHub. التاريخ فيه ٣ commits ومرفوع:

---

## ١. [[git log --oneline]]

~~~text الناتج
b71aca6 feat y
1e3e90e feat x
48a7dbc init
~~~

[[--oneline]] سطر لكل commit: الرقم المختصر (hash) والرسالة. الأحدث فوق. عايزين نلغي [[feat x]] (اللي ضاف [[x.js]])، فرقمه [[1e3e90e]]. ولاحظ إنه **مش** آخر commit، وده عادي: revert بيلغي أي commit في التاريخ.

## ٢. [[git revert a1b2c3d]]

بنحط الرقم الحقيقي مكان [[a1b2c3d]]:

~~~bash
git revert 1e3e90e
~~~

Git بيفتح المحرر برسالة جاهزة [[Revert "feat x"]]، ولما تحفظ وتقفل:

~~~text الناتج
[main 67c3e11] Revert "feat x"
 Date: Tue Oct 6 13:33:02 2026 +0300
 1 file changed, 1 deletion(-)
 delete mode 100644 x.js
~~~

[[feat x]] كان ضاف [[x.js]]، فالعكس إنه يتمسح: [[delete mode]]. ولو كان عدّل سطور، العكس بيرجّع السطور القديمة.

~~~bash
git log --oneline
~~~

~~~text الناتج
67c3e11 Revert "feat x"
b71aca6 feat y
1e3e90e feat x
48a7dbc init
~~~

الـ commit الأصلي لسه موجود، وفوقه الـ revert. و [[git show HEAD]] بيوري إن الرسالة فيها سطر زيادة بيقول بيلغي إيه بالرقم الكامل:

~~~text الناتج
    Revert "feat x"

    This reverts commit 1e3e90edcf4f5b7ccb5978cd08865ef0600c7f27.
~~~

لو مش عايز المحرر يفتح: [[git revert --no-edit 1e3e90e]].

## ٣. [[git push]]

~~~text الناتج
To .../origin.git
   b71aca6..67c3e11  main -> main
~~~

[[b71aca6..67c3e11]] يعني الـ remote كان عند [[b71aca6]] واتقدّم لـ [[67c3e11]]. push عادي، لأن الـ remote عنده كل اللي قبل كده، واحنا زوّدنا بس.

---

## حالة خاصة: revert لـ merge commit

~~~text الناتج
error: commit 2c56ded... is a merge but no -m option was given.
fatal: revert failed
~~~

الـ merge commit ليه أبين (parents)، و Git مش عارف يعكس بالنسبة لأنهي واحد. [[-m 1]] معناها «الأب الأول»، يعني الـ branch اللي كنت عليها وقت الـ merge (غالبًا main):

~~~bash
git revert -m 1 HEAD --no-edit
~~~

~~~text الناتج
[main c0690ee] Revert "Merge f"
 Date: Tue Oct 6 13:33:08 2026 +0300
 1 file changed, 1 deletion(-)
 delete mode 100644 z.js
~~~

---

## revert ولا reset؟

| | [[git revert]] | [[git reset]] |
|---|---|---|
| التاريخ | بيزيد commit | بيشيل commits |
| الـ push بعده | عادي | محتاج force |
| مناسب لـ | أي حاجة اترفعت ومتشاركة | حاجات على جهازك بس |

الأوامر نفسها في PowerShell و CMD والماك.

## الخلاصة

- revert = commit جديد بعكس القديم، والقديم بيفضل.
- ده الطريق الآمن على main.
- merge commit محتاج [[-m 1]].`,
          lines: ["لاقي رقم الـ commit اللي عايز تلغيه.", "اعمل commit جديد بعكسه.", "ارفع، ومحدش تاريخه هيتلخبط."],
          sol: R`[[git revert]] بيفتح المحرر برسالة جاهزة [[Revert "feat x"]]، ولما تقفله بيطبع [[[main f9fca78] Revert "feat x"]] والملفات اللي اتعكست (لو الـ commit كان ضاف ملف هتلاقي [[delete mode]]).

[[git log --oneline]] بيوري الـ commit الأصلي زي ما هو، وفوقه commit جديد بيلغيه. ده الفرق عن reset: التاريخ مااتمسحش، فتقدر تعمل push عادي من غير force.

الغلط الشائع: revert لـ merge commit بيطلع [[is a merge but no -m option was given]]، وساعتها لازم [[-m 1]]. ولو التعديل ده اتعدّل بعده، ممكن يطلع conflict زي الـ merge: صلّح و [[git revert --continue]].`
        },
        {
          cmd: "git reflog",
          title: "طوق النجاة",
          desc: "كل مكان HEAD كان فيه في آخر 90 يوم تقريبًا. والـ commits اللي «مسحتها» بـ reset --hard بتفضل موجودة حوالي 30 يوم بس. خد الـ hash من هنا وارجعله. في PowerShell لازم [[HEAD@{2}]] بين علامات تنصيص، فاكتبها كده في كل الشيلات.",
          example: R`git reflog
git reset --hard "HEAD@{2}"
git branch rescue a1b2c3d`,
          try: "اعمل [[reset --hard]] يمسح commit، وبعدين رجّعه من reflog.",
          deep: {
            why: "عملت [[reset --hard]] بالغلط، أو مسحت branch، وحسيت إن شغلك راح. غالبًا مراحش.",
            how: R`Git بيسجّل في دفتر خاص كل مرة [[HEAD]] بيتحرك: كل commit، وكل switch، وكل reset، وكل merge. الدفتر ده هو [[reflog]] (من reference log).

فحتى لو الـ commit مبقاش ليه branch بتشاور عليه، واتشال من [[git log]]، هو لسه موجود في Git، ورقمه متسجّل في الـ reflog.

[[git reflog]] بيعرض الدفتر: كل سطر فيه رقم الـ commit، و [[HEAD@{n}]] (يعني «HEAD كان هنا من n خطوات»)، واللي حصل. بتلاقي السطر اللي قبل الغلطة، وترجع له: إما [[reset --hard HEAD@{2}]] ترجّع الـ branch كلها، أو [[git branch rescue رقم]] تعمل branch جديدة على الـ commit ده وتنقذه من غير ما تلمس حاجة.

والـ commits اللي مالهاش branch بتتمسح نهائي بعد حوالي ٣٠ يوم.

والـ reflog على جهازك بس، مش على GitHub.`,
            when: "بعد أي غلطة كبيرة في Git. قبل ما تيأس، شوف الـ reflog.",
            mistakes: "إنك متعرفش إنه موجود وتعيد الشغل من الأول. وإنك تستنى أكتر من شهر."
          },
          teach: R`## الأول: Git عنده دفتر بكل حركة

كل مرة [[HEAD]] بيتحرك (commit، switch، reset، merge، rebase)، Git بيكتب سطر في دفتر على جهازك اسمه [[reflog]] (من reference log). فحتى لو commit اختفى من [[git log]] بعد [[reset --hard]]، رقمه لسه مكتوب في الدفتر، والـ commit نفسه لسه في Git لحد ما يتنضّف بعد حوالي ٣٠ يوم.

اتشغّل في Git Bash على ويندوز (Git 2.56). جهّزنا الكارثة:

~~~bash
git log --oneline
git reset --hard HEAD~1
git log --oneline
~~~

~~~text الناتج
547b1d9 precious
a750d4b init
HEAD is now at a750d4b init
a750d4b init
~~~

الـ commit [[precious]] اختفى من الـ log.

---

## ١. [[git reflog]]

~~~text الناتج
a750d4b HEAD@{0}: reset: moving to HEAD~1
547b1d9 HEAD@{1}: commit: precious
a750d4b HEAD@{2}: commit (initial): init
~~~

نقرا السطر حتة حتة:

| الحتة | معناها |
|---|---|
| [[a750d4b]] | الـ commit اللي HEAD كان عليه في الخطوة دي |
| [[HEAD@{0}]] | الخطوة: [[{0}]] دلوقتي، [[{1}]] قبلها بخطوة، وهكذا |
| [[reset: moving to HEAD~1]] | إيه اللي حصل في الخطوة دي |

الأحدث فوق. السطر [[HEAD@{1}: commit: precious]] هو المكان اللي كنا فيه قبل الغلطة، ورقمه [[547b1d9]].

> رقم [[{n}]] بيتغير مع كل حركة جديدة: اللي كان [[{1}]] بيبقى [[{2}]] بعد أي commit أو reset. عشان كده المثال بيقول [[{2}]] والتجربة هنا طلعت [[{1}]]: اقرا الـ reflog بتاعك الأول وخد الرقم منه.

## ٢. [[git reset --hard "HEAD@{2}"]]

في حالتنا الخطوة اللي عايزينها [[{1}]]:

~~~bash
git reset --hard "HEAD@{1}"
git log --oneline
~~~

~~~text الناتج
HEAD is now at 547b1d9 precious
547b1d9 precious
a750d4b init
~~~

رجع. [[reset --hard]] هنا بيحرّك الـ branch **لقدام** لمكانها القديم.

### ليه علامات التنصيص؟

في PowerShell الأقواس [[{ }]] ليها معنى (script block)، فمن غير تنصيص Git بيستلم كلام ناقص. جرّبناها في PowerShell 7:

~~~powershell
git log --oneline -1 HEAD@{1}
~~~

~~~text الناتج
fatal: ambiguous argument 'HEAD@': unknown revision or path not in the working tree.
~~~

Git استلم [[HEAD@]] بس. ومع التنصيص اشتغلت في PowerShell 7 و Windows PowerShell 5.1:

~~~powershell
git log --oneline -1 "HEAD@{1}"
~~~

~~~text الناتج
547b1d9 precious
~~~

وفي bash و zsh و CMD التنصيص مش ضروري بس مش بيضر، فاكتبها دايمًا كده.

## ٣. [[git branch rescue a1b2c3d]]

الطريقة الأأمن: متحرّكش حاجة، اعمل branch جديدة اسمها [[rescue]] بتشاور على الـ commit الضايع بالرقم:

~~~bash
git branch rescue 547b1d9
git log --oneline rescue
git branch
~~~

~~~text الناتج
547b1d9 precious
a750d4b init
* main
  rescue
~~~

[[main]] زي ما هي (النجمة [[*]] معناها انت عليها)، والـ commit بقى ليه branch، فمش هيتمسح أبدًا. بعدها تعمل [[git merge rescue]] أو [[cherry-pick]] براحتك.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تشوف كل الحركات | [[git reflog]] |
| ترجّع الـ branch كلها لمكان قديم | [[git reset --hard "HEAD@{n}"]] |
| تنقذ commit من غير ما تلمس حاجة | [[git branch rescue hash]] |

- الـ reflog على جهازك بس، مش على GitHub.
- بيحفظ الـ commits، مش التعديلات اللي عمرها ما اتعملها commit.`,
          lines: [
            "اعرض كل الأماكن اللي HEAD كان فيها.",
            "ارجع بالـ branch لمكانها من خطوتين.",
            "أو اعمل branch جديدة على الـ commit ده تنقذه بيها."
          ],
          sol: R`بعد [[git reset --hard HEAD~1]]، [[git reflog]] بيوري حاجة زي:

[[f9fca78 HEAD@{0}: reset: moving to HEAD~1]] و [[7fb1381 HEAD@{1}: commit: precious]]. الـ commit اللي اتمسح موجود في [[HEAD@{1}]] (مش لازم [[{2}]] زي المثال، الرقم بيعتمد على عملت كام حاجة بعده)، فـ [[git reset --hard "HEAD@{1}"]] بيطبع [[HEAD is now at 7fb1381 precious]] و [[git log]] بيرجع زي ما كان.

الغلط الشائع: تعمل reset على رقم reflog غلط. عشان كده الأضمن [[git branch rescue 7fb1381]]: بيحفظ الـ commit في branch من غير ما يلمس اللي انت فيه. والتعديلات اللي عمرها ما اتعملها commit مش في reflog.`,
          solCode: R`git commit --allow-empty -m "precious"
git reset --hard HEAD~1
git reflog | head -3
git reset --hard "HEAD@{1}"
git log --oneline -1`
        },
        {
          cmd: "git rebase",
          title: "خلّي التاريخ نضيف",
          desc: "[[rebase main]] بيحط commits الـ branch بتاعتك فوق آخر main كأنك لسه بادئ. و [[-i HEAD~3]] بيفتح آخر 3 commits تدمجهم (squash) أو تعدّل رسايلهم. القاعدة: متعملش rebase لحاجة حد تاني شغال عليها، ولو اضطريت تعمل push بعده استخدم [[--force-with-lease]] مش [[--force]].",
          example: R`git switch feature/login
git rebase main
git rebase -i HEAD~3
git push --force-with-lease`,
          try: "اعمل 3 commits صغيرة وادمجهم في واحد بـ rebase -i.",
          flag: "danger",
          deep: {
            why: "branch بتاعتك بدأت من main من أسبوع، وmain اتقدمت. عايز شغلك يبقى مبني على آخر main، والتاريخ يبقى خط مستقيم نضيف من غير merge commits كتير.",
            how: R`[[git rebase main]] وانت على الـ feature بيعمل التالي: يشيل الـ commits بتاعتك مؤقتًا، ويحرّك الـ branch لآخر commit في main، وبعدين يعيد تطبيق الـ commits بتاعتك واحد واحد فوقه. كأنك لسه بادئ النهارده من آخر main.

بس خد بالك: الـ commits اللي بتتعاد دي commits جديدة بأرقام جديدة، حتى لو محتواها نفسه. يعني rebase بيعيد كتابة التاريخ.

و [[rebase -i HEAD~3]] (interactive) بيفتحلك محرر فيه آخر ٣ commits، وقدام كل واحد كلمة [[pick]]. تغيّرها لـ [[squash]] تدمجه في اللي قبله، أو [[reword]] تغيّر رسالته، أو تمسح السطر تشيله. مفيد تنضّف commits زي «wip» و «fix typo» قبل ما ترفع.

وبعد rebase لـ branch كانت مرفوعة، GitHub عنده النسخة القديمة، و push عادي هيترفض. [[--force-with-lease]] بيرفع غصب، بس بيتأكد الأول إن محدش رفع حاجة جديدة في الوقت ده، فلو حد رفع يرفض. أأمن بكتير من [[--force]].`,
            when: "تحدّث branch بتاعتك من main قبل ما تعمل PR. تنضّف commits صغيرة قبل ما تشاركها.",
            mistakes: "القاعدة الذهبية: متعملش rebase لـ branch حد تاني شغال عليها، أو لـ main. هتعيد كتابة تاريخ هو عنده. و [[--force]] بدل [[--force-with-lease]]."
          },
          teach: R`## الأول: rebase بيعيد تطبيق commits بتاعتك في مكان تاني

[[git rebase main]] بياخد الـ commits اللي على الـ branch بتاعتك ومش في main، ويشيلهم مؤقتًا، ويقف على آخر commit في main، ويعيد تطبيقهم واحد واحد فوقه. والنتيجة commits **جديدة** بنفس المحتوى وأرقام جديدة.

اتشغّل في Git Bash على ويندوز (Git 2.56)، مع remote تجريبي (bare repo على نفس الجهاز) مكان GitHub. الحالة قبل:

~~~bash
git log --oneline --graph --all
~~~

~~~text الناتج
* b3c6f84 add login
| * b2c0d38 main: new stuff
|/
* d230295 init
~~~

[[--graph]] بيرسم الفروع بخطوط، و [[--all]] كل الـ branches مش الحالية بس. الـ branch [[feature/login]] اتفرّعت من [[init]]، وبعدها main اتقدمت بـ commit.

---

## ١. [[git switch feature/login]]

rebase بيشتغل على الـ branch اللي انت **واقف عليها**، فلازم تروحلها الأول.

~~~text الناتج
Switched to branch 'feature/login'
Your branch is up to date with 'origin/feature/login'.
~~~

## ٢. [[git rebase main]]

~~~text الناتج
Successfully rebased and updated refs/heads/feature/login.
~~~

([[refs/heads/feature/login]] ده الاسم الكامل للـ branch جوه Git.)

~~~text الناتج
* 34fa693 add login
* b2c0d38 main: new stuff
| * b3c6f84 add login
|/
* d230295 init
~~~

بص على الرسمة:

- [[add login]] بقى فوق [[main: new stuff]] على خط واحد، برقم جديد [[34fa693]].
- لسه فيه [[b3c6f84 add login]] على الجنب: ده [[origin/feature/login]]، يعني النسخة القديمة اللي على الـ remote. و [[--all]] بيعرضها.

## ٣. [[git rebase -i HEAD~3]]

[[-i]] من interactive: بدل ما يطبّق كل حاجة لوحده، بيفتحلك المحرر بقايمة الـ commits تقرر تعمل فيهم إيه. و [[HEAD~3]] يعني «آخر ٣ commits». عملنا ٣ commits صغيرة [[wip 1]] و [[wip 2]] و [[wip 3]]، والقايمة اللي فتحت:

~~~text الملف اللي بيفتح في المحرر
pick ca903d4 # wip 1
pick 1ded463 # wip 2
pick 9abb6cc # wip 3

# Rebase 34fa693..9abb6cc onto 34fa693 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
# d, drop <commit> = remove commit
~~~

(قصّرنا التعليقات.) **الأقدم فوق**، عكس [[git log]]. وكل سطر: أمر، ورقم الـ commit، ورسالته. الأوامر المهمة:

| الأمر | بيعمل إيه |
|---|---|
| [[pick]] | خلّيه زي ما هو |
| [[squash]] أو [[s]] | ادمجه في اللي فوقه واجمع الرسايل |
| [[fixup]] أو [[f]] | ادمجه في اللي فوقه وارمي رسالته |
| [[reword]] أو [[r]] | خلّيه، بس غيّر رسالته |
| [[drop]] أو تمسح السطر | شيله خالص |

غيّرنا السطرين التاني والتالت لـ [[squash]] وحفظنا. Git فتح المحرر تاني بالرسايل التلاتة مع بعض عشان تكتب منهم رسالة واحدة. احنا سبناها زي ما هي، فالرسالة بقت التلات سطور ورا بعض، وأولهم [[wip 1]] (وده اللي [[--oneline]] بيعرضه). وفي الآخر:

~~~text الناتج
Successfully rebased and updated refs/heads/feature/login.
~~~

~~~bash
git log --oneline -3
~~~

~~~text الناتج
bceedbb wip 1
34fa693 add login
b2c0d38 main: new stuff
~~~

commit واحد مكان التلاتة، و [[git show --stat HEAD]] بيوري [[sq.txt | 3 +++]]: التعديلات التلاتة جواه.

> لو حطيت [[squash]] على **أول** سطر: [[error: cannot 'squash' without a previous commit]]، لأن مفيش حاجة فوقه يندمج فيها. [[git rebase --abort]] بيرجّعك لقبل الـ rebase.

والمحرر اللي بيفتح هو اللي في [[core.editor]]: على Git for Windows بيبقى اللي اخترته وقت التثبيت (Vim افتراضيًا، أو Notepad أو VS Code). في Vim: [[i]] تكتب، و [[Esc]] وبعدين [[:wq]] تحفظ وتخرج.

## ٤. [[git push --force-with-lease]]

الـ remote عنده [[b3c6f84]] القديم، وانت شلته من تاريخك. فـ push العادي:

~~~text الناتج
 ! [rejected]        feature/login -> feature/login (non-fast-forward)
~~~

و [[--force-with-lease]]:

~~~text الناتج
 + b3c6f84...34fa693 feature/login -> feature/login (forced update)
~~~

[[+]] و [[forced update]]: الـ remote اتكتب فوقه. والفرق عن [[--force]]: الـ lease (عقد إيجار) بيتأكد الأول إن الـ remote لسه عند [[b3c6f84]] اللي انت شايفه. لو حد رفع حاجة جديدة في النص، بيرفض بدل ما يمسحها.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git rebase main]] | commits بتاعتك فوق آخر main، بأرقام جديدة |
| [[git rebase -i HEAD~3]] | رتّب آخر ٣: squash أو reword أو drop |
| [[git push --force-with-lease]] | ارفع التاريخ الجديد بأمان |

- الأوامر نفسها في كل الشيلات.
- rebase لـ commits محدش غيرك عنده بس.`,
          lines: [
            "روح لـ branch بتاعتك.",
            "حط الـ commits بتاعتك فوق آخر main.",
            "افتح آخر ٣ commits عشان تدمجهم أو تعدّل رسايلهم.",
            "ارفع غصب، بس بعد ما تتأكد إن محدش رفع حاجة جديدة."
          ],
          sol: R`[[git rebase -i HEAD~3]] بيفتح ملف فيه تلات سطور [[pick]]، الأقدم فوق. سيب الأول [[pick]] وغيّر التانيين لـ [[squash]] (أو [[s]])، واحفظ. هيفتح محرر تاني بالرسايل التلاتة مع بعض، اكتب رسالة واحدة واحفظ.

في الآخر هيطبع [[Successfully rebased and updated refs/heads/main.]]، و [[git log --oneline]] هيوري commit واحد مكان التلاتة، برقم جديد، و [[git show]] بيوري التعديلات التلاتة جواه.

الغلط الشائع: تحط [[squash]] على السطر الأول، فيقول [[cannot 'squash' without a previous commit]]. ولو اتلخبطت في النص [[git rebase --abort]] بيرجّع كل حاجة. ولو الـ commits دي اتعملها push قبل كده، هتحتاج [[git push --force-with-lease]].`,
          solCode: R`for i in 1 2 3; do echo $i >> sq.txt; git add sq.txt; git commit -m "wip $i"; done
git rebase -i HEAD~3
# في المحرر: pick, squash, squash
git log --oneline -3`
        },
        {
          cmd: "git log -S / blame",
          title: "مين كتب ده وإمتى",
          desc: R`لما تلاقي سطر غريب أو bug، أول سؤال: السطر ده دخل إمتى وليه؟ [[git blame index.js]] بيعرض الملف، وقدام كل سطر رقم آخر commit عدّله ومين وإمتى. [[-L 10,20]] بيحصر الناتج في السطور من 10 لـ 20. بعدها خد الرقم واعمل عليه [[git show]] تشوف رسالة الـ commit وباقي التعديلات اللي معاه، وده اللي بيفهّمك السبب.

[[git log -S "calculateTotal"]] بيدوّر في التاريخ كله على الـ commits اللي ضافت النص ده أو شالته، حتى لو مبقاش موجود في الكود دلوقتي، و [[--oneline]] سطر لكل commit. ده أسرع طريقة تعرف إمتى فانكشن اتعملت أو اتمسحت، أو إمتى bug دخل. البحث بيفرّق بين الحروف الكابيتال والسمول.`,
          example: R`git blame index.js
git blame -L 10,20 index.js
git log -S "calculateTotal" --oneline`,
          try: "دوّر على أول commit ظهر فيه اسم فانكشن عندك.",
          deep: {
            why: "لاقيت سطر كود غريب، أو bug. مين كتبه؟ إمتى؟ وفي أنهي commit، ومع أنهي تعديلات تانية؟ عشان تفهم «ليه» اتكتب كده.",
            how: R`[[git blame file]] بيعرض الملف، وقدام كل سطر: رقم آخر commit عدّل السطر ده، ومين، وإمتى. و [[-L 10,20]] سطور معينة بس. الاسم «blame» (لوم) مضلل شوية، الفايدة الحقيقية إنك تاخد رقم الـ commit وتعمله [[git show]] فتشوف الرسالة والتعديلات اللي معاه، وتفهم السياق.

[[git log -S "text"]] بيعمل حاجة مختلفة: بيدوّر في التاريخ كله على الـ commits اللي «عدد مرات» ظهور النص ده اتغير فيها، يعني commits ضافته أو شالته. فتلاقي الـ commit اللي الفانكشن دي اتعملت فيه، أو اتمسحت فيه، حتى لو مش موجودة دلوقتي.

وده أداة قوية في الـ debugging: «الحاجة دي كانت شغالة الشهر اللي فات»، تلاقي إمتى اتغيرت.`,
            when: "كود مش فاهم سببه. bug ظهر فجأة وعايز تعرف أنهي commit جابه. VS Code فيه extension اسمها GitLens بتعرض blame جنب كل سطر.",
            mistakes: "إنك تستخدم blame تلوم حد. الهدف الفهم. وأحيانًا السطر اتعدّل في commit فورمات (مسافات بس)، فـ blame يوريك الـ commit ده، فارجع لورا منه."
          },
          teach: R`## الأول: سؤالين مختلفين

- [[git blame]]: «السطر ده **دلوقتي**، مين آخر حد عدّله وفي أنهي commit؟»
- [[git log -S]]: «النص ده، **إمتى** اتضاف أو اتشال في التاريخ كله؟» حتى لو مبقاش موجود.

اتشغّل في Git Bash على ويندوز (Git 2.56)، في repo فيه ملف [[calc.js]] اشتغل عليه اتنين (Ahmed و Sara) في ٤ commits:

~~~text git log --oneline
29dcf86 export calculateTotal
f61134c tax 15%
63856f0 add calc
9b88ac0 init
~~~

---

## ١. [[git blame index.js]]

في تجربتنا الملف اسمه [[calc.js]]:

~~~bash
git blame calc.js
~~~

~~~text الناتج
f61134c (Ahmed 2026-10-06 13:33:45 +0300 1) const tax = 0.15
63856f0 (Sara  2026-10-06 13:33:45 +0300 2) function calculateTotal(p) {
63856f0 (Sara  2026-10-06 13:33:45 +0300 3)   return p * (1 + tax)
63856f0 (Sara  2026-10-06 13:33:45 +0300 4) }
29dcf86 (Ahmed 2026-10-06 13:33:45 +0300 5) module.exports = { calculateTotal }
~~~

كل سطر من الملف قدامه:

| الحتة | معناها |
|---|---|
| [[f61134c]] | آخر commit غيّر السطر ده |
| [[Ahmed]] | مين عمل الـ commit ده |
| [[2026-10-06 13:33:45 +0300]] | إمتى، و [[+0300]] فرق التوقيت عن UTC (توقيت مصر الصيفي) |
| [[1]] | رقم السطر في الملف |
| الباقي | السطر نفسه |

لاحظ السطر الأول: Sara هي اللي كتبت الملف، بس السطر بيقول Ahmed، لأنه آخر حد **عدّله** ([[0.14]] بقت [[0.15]] في commit [[tax 15%]]). blame بيوريك آخر لمسة بس.

## ٢. [[git blame -L 10,20 index.js]]

[[-L]] من lines: من سطر لسطر. ملفنا صغير، فجرّبنا [[-L 2,3]]:

~~~text الناتج
63856f0 (Sara 2026-10-06 13:33:45 +0300 2) function calculateTotal(p) {
63856f0 (Sara 2026-10-06 13:33:45 +0300 3)   return p * (1 + tax)
~~~

والخطوة اللي بعدها دايمًا: خد الرقم واعمل [[git show]] تفهم ليه:

~~~bash
git show --stat 63856f0
~~~

~~~text الناتج
commit 63856f033694d5152bcaf6887bc0adb36b95eeb7
Author: Sara <sara@example.com>
Date:   Tue Oct 6 13:33:45 2026 +0300

    add calc

 calc.js | 3 +++
 1 file changed, 3 insertions(+)
~~~

[[--stat]] بيعرض أسماء الملفات وعدد السطور بس بدل التعديلات كاملة.

## ٣. [[git log -S "calculateTotal" --oneline]]

[[-S]] (Git بيسميها pickaxe، يعني فاس) بيدوّر على الـ commits اللي **عدد مرات** ظهور النص اتغير فيها:

~~~text الناتج
29dcf86 export calculateTotal
63856f0 add calc
~~~

- [[63856f0 add calc]]: الكلمة ظهرت لأول مرة (من ٠ لـ ١). الأقدم تحت، فده أول ظهور.
- [[29dcf86 export calculateTotal]]: ظهرت مرة تانية (من ١ لـ ٢).
- [[tax 15%]] مش ظاهر: لمس الملف بس مالمسش الكلمة.

### -S ولا -G؟

عملنا commit غيّر [[calculateTotal(p)]] لـ [[calculateTotal(price)]]. الكلمة لسه موجودة مرتين، فالعدد مااتغيرش:

~~~text git log -S "calculateTotal" --oneline
29dcf86 export calculateTotal
63856f0 add calc
~~~

~~~text git log -G "calculateTotal" --oneline
526d3f5 rename p to price
29dcf86 export calculateTotal
63856f0 add calc
~~~

[[-G]] بيطلّع أي commit غيّر **سطر فيه** الكلمة، حتى لو العدد ثابت.

> البحث بيفرّق بين الكابيتال والسمول: [[git log -S "calculatetotal"]] مطلّعش ولا commit. ضيف [[-i]] لو عايز تتجاهل الفرق.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| مين آخر حد لمس كل سطر | [[git blame file]] |
| سطور معينة | [[git blame -L 10,20 file]] |
| إمتى نص اتضاف أو اتشال | [[git log -S "text" --oneline]] |
| أي commit غيّر سطر فيه النص | [[git log -G "text" --oneline]] |

الأوامر نفسها في كل الشيلات. وبعد أي رقم تلاقيه: [[git show]].`,
          lines: [
            "قدام كل سطر: مين آخر حد عدّله وفي أنهي commit.",
            "نفسه للسطور من ١٠ لـ ٢٠ بس.",
            "هات الـ commits اللي ضافت أو شالت النص ده."
          ],
          sol: R`[[git log -S "calculateTotal" --oneline]] بيطلّع الـ commits اللي زوّدت أو شالت الكلمة دي بس، مش كل commit لمس الملف. أقدم واحد فيهم (الأخير في القايمة) هو اللي الفانكشن ظهرت فيه أول مرة، زي [[b51ccba add calc]].

ولو عدّلت سطر تاني في نفس الملف بعد كده، commit التعديل ده مش هيظهر، لأن عدد مرات ظهور الكلمة مااتغيرش. و [[git blame calc.js]] بيوري جنب كل سطر رقم الـ commit واسمك والتاريخ.

الغلط الشائع: [[-S]] مايطلّعش حاجة لأن الاسم مكتوب بحروف مختلفة (case-sensitive). ولو عايز كل commit غيّر سطر فيه الاسم حتى لو العدد مااتغيرش، استخدم [[-G]].`
        },
        {
          cmd: "git bisect",
          title: "لاقي الـ commit اللي جاب الـ bug",
          desc: "بتقول لـ Git commit فيه الـ bug وcommit كان سليم، وهو بيقسم اللي بينهم نصين كل مرة. في 1000 commit هتلاقيه في حوالي 10 خطوات. و [[bisect run]] بيعمل الاختبار لوحده بأي أمر بيفشل لما الـ bug يظهر. و [[reset]] يرجّعك مكانك.",
          example: R`git bisect start
git bisect bad
git bisect good v1.0.0
# جرّب النسخة اللي Git وقف عليها، وقوله good أو bad، وكرر
git bisect good
git bisect reset
# أو خلّيه يجرّب لوحده:
git bisect start HEAD v1.0.0
git bisect run npm test
git bisect reset`,
          try: "اعمل 8 commits، ودخّل غلطة في الخامس، ولاقيه بـ bisect.",
          deep: {
            why: "حاجة كانت شغالة الشهر اللي فات ودلوقتي بايظة، وفي النص 200 commit. بدل ما تجرّبهم واحد واحد، bisect بيلاقي المسئول في دقايق.",
            how: R`ده binary search: Git بيوقفك على commit في النص بالظبط، تجرّب، وتقول [[good]] أو [[bad]]. كل إجابة بتشيل نص الاحتمالات، فـ 200 commit محتاجين حوالي 8 خطوات بس.

وفي الآخر Git بيطبع «is the first bad commit» ومعاه الـ commit. تعمله [[git show]] وتفهم إيه اللي اتغير.

و [[bisect run]] بياخد أي أمر بيرجع exit code: 0 يعني good، وغيره يعني bad. فلو عندك تست بيكشف الـ bug، Git بيخلّص البحث كله لوحده.`,
            when: "bug ظهر ومش عارف إمتى دخل، و [[log -S]] مش كفاية لأن مفيش نص معين تدوّر عليه.",
            mistakes: "تنسى [[bisect reset]]، فتفضل واقف على commit قديم (detached HEAD). وتقول good لنسخة مجرّبتهاش كويس، فالنتيجة تطلع غلط."
          },
          teach: R`## الأول: لعبة «خمّن الرقم»

لو حد قالك «فكّرت في رقم من ١ لـ ١٠٠٠» وبيرد «أكبر» أو «أصغر»، أحسن طريقة تسأل عن النص كل مرة، فتلاقيه في ١٠ أسئلة. [[git bisect]] بيعمل نفس الحكاية على الـ commits: انت بتقوله نقطة سليمة ونقطة بايظة، وهو بيوقفك في النص، وانت تقول [[good]] أو [[bad]]. ده اسمه binary search.

اتشغّل في Git Bash على ويندوز (Git 2.56) على repo فيه ٨ commits ([[c1]] لـ [[c8]])، والـ bug دخل في [[c5]]، و [[c1]] عليه tag اسمه [[v1.0.0]]. ملف [[v.txt]] فيه رقم الـ commit عشان نعرف احنا فين.

---

## الطريقة الأولى: بإيدك

### ١. [[git bisect start]]

~~~text الناتج
status: waiting for both 'good' and 'bad' commits
~~~

ابتدينا، و Git مستني نقطتين.

### ٢. [[git bisect bad]]

من غير رقم = الـ commit اللي انت عليه دلوقتي (HEAD، يعني [[c8]]) فيه الـ bug.

~~~text الناتج
status: waiting for 'good' commit(s), 'bad' commit known
~~~

### ٣. [[git bisect good v1.0.0]]

[[v1.0.0]] كان سليم. ممكن تكتب tag أو رقم commit.

~~~text الناتج
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[fb7497a6163d83edfb28401a49fbb52a008a5ee3] c4
~~~

- [[3 revisions left to test after this]]: فاضل ٣ احتمالات بعد الخطوة دي.
- [[roughly 2 steps]]: تقريبًا خطوتين كمان.
- [[[fb7497a...] c4]]: Git **نقل ملفاتك** لـ [[c4]] (نص المسافة). [[cat v.txt]] بيطبع [[4]].

دلوقتي انت بتجرّب: شغّل البرنامج أو التست.

### ٤. [[git bisect good]]

[[c4]] سليم، فالـ bug بعده:

~~~text الناتج
Bisecting: 1 revision left to test after this (roughly 1 step)
[ee6e90877b77e2e081b6e9e518248717bf982376] c6
~~~

كمّلنا: [[c6]] بايظ ([[git bisect bad]])، فنقلنا لـ [[c5]]، وبايظ كمان ([[git bisect bad]]):

~~~text الناتج
9573d92f9a938fbf459e5034d0f7c78ca4ea9a40 is the first 'bad' commit
commit 9573d92f9a938fbf459e5034d0f7c78ca4ea9a40
Author: Ahmed <ahmed@example.com>
Date:   Tue Oct 6 13:33:55 2026 +0300

    c5

 test.sh | 2 +-
 v.txt   | 2 +-
 2 files changed, 2 insertions(+), 2 deletions(-)
~~~

[[is the first 'bad' commit]]: أول commit بايظ هو [[c5]]، ومعاه الملفات اللي اتغيرت فيه. (Git الأقدم زي 2.43 بيكتبها من غير علامات التنصيص: [[is the first bad commit]].)

### ٥. [[git bisect reset]]

~~~text الناتج
Previous HEAD position was 9573d92 c5
Switched to branch 'main'
~~~

رجّعك للـ branch اللي كنت عليها. لو نسيته هتفضل واقف على commit قديم (detached HEAD).

---

## الطريقة التانية: [[git bisect run]]

### ٦. [[git bisect start HEAD v1.0.0]]

نفس الخطوات ١ و ٢ و ٣ في سطر: الأول البايظ ([[HEAD]])، وبعده السليم ([[v1.0.0]]).

### ٧. [[git bisect run npm test]]

بدل ما تقول good و bad بإيدك، بتدّيه أمر يشغّله في كل خطوة، ويحكم من الـ **exit code** (الرقم اللي أي برنامج بيرجّعه لما يخلص):

| الـ exit code | Git بيفهمه |
|---|---|
| [[0]] | good |
| [[1]] لـ [[127]] ماعدا [[125]] | bad |
| [[125]] | skip: الـ commit ده مينفعش يتجرّب |

[[npm test]] بيرجّع 0 لو التستات نجحت. في تجربتنا مفيش npm، فعملنا ملف [[test.sh]] فيه [[exit 0]] في الـ commits السليمة و [[exit 1]] في البايظة، وشغّلنا [[git bisect run sh test.sh]] ([[sh]] هو الشيل اللي بيشغّل الملف):

~~~text الناتج
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[fb7497a6163d83edfb28401a49fbb52a008a5ee3] c4
running 'sh' 'test.sh'
Bisecting: 1 revision left to test after this (roughly 1 step)
[ee6e90877b77e2e081b6e9e518248717bf982376] c6
running 'sh' 'test.sh'
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[9573d92f9a938fbf459e5034d0f7c78ca4ea9a40] c5
running 'sh' 'test.sh'
9573d92f9a938fbf459e5034d0f7c78ca4ea9a40 is the first 'bad' commit
...
bisect found first 'bad' commit
~~~

نفس النتيجة في ٣ تجارب لوحده. ونفس الأمر اشتغل في PowerShell 7 كمان، لأن Git for Windows بيشغّل الأمر بالـ sh بتاعه.

### ٨. [[git bisect reset]]

زي فوق: ارجع مكانك.

---

## ليه خطوات قليلة كده؟

كل إجابة بتقسم الاحتمالات نصين:

| عدد الـ commits | خطوات تقريبًا |
|---|---|
| 8 | 3 |
| 200 | 8 |
| 1000 | 10 |

## الخلاصة

- [[start]] وبعدين [[bad]] و [[good]] بنقطتين، وبعدين تجرّب وتقول good أو bad لحد ما يقولك [[first 'bad' commit]].
- [[bisect run]] لو عندك أمر بيرجّع 0 للسليم.
- دايمًا [[git bisect reset]] في الآخر.`,
          lines: [
            "ابدأ البحث.",
            "النسخة الحالية فيها الـ bug.",
            "النسخة v1.0.0 كانت سليمة. Git هينقلك لـ commit في النص.",
            "النسخة دي سليمة، فالـ bug بعدها. Git ينقلك للنص اللي بعده.",
            "خلصت: ارجع للـ branch اللي كنت عليها.",
            "ابدأ من تاني، والسيئ HEAD والسليم v1.0.0 في سطر واحد.",
            "خلّي Git يشغّل الاختبار على كل خطوة لوحده: لو نجح يبقى good، ولو فشل يبقى bad.",
            "ارجع مكانك."
          ],
          sol: R`[[git bisect start HEAD v1.0.0]] و [[git bisect run]] بيجرّب نص المسافة كل مرة، ولـ 8 commits بيوصل في حوالي ٣ خطوات. وفي الآخر بيطبع:

[[cfd341e... is the first bad commit]] وتحته تفاصيل commit رقم 5 ([[c5]]) والملفات اللي اتغيرت فيه، و [[bisect found first bad commit]].

[[git bisect reset]] بيرجّعك للـ branch بتاعك ([[Switched to branch 'main']]). الغلط الشائع: تحدد good على commit فيه الـ bug أصلًا، فيطلّعلك commit غلط. واختبار [[bisect run]] لازم يرجع 0 للسليم وأي رقم من 1 لـ 127 للمكسور (ماعدا 125 اللي معناها skip).`,
          solCode: R`git init bis && cd bis
for i in 1 2 3 4 5 6 7 8; do
  if [ $i -ge 5 ]; then echo "exit 1" > test.sh; else echo "exit 0" > test.sh; fi
  echo $i > v.txt; git add .; git commit -m "c$i"
  [ $i = 1 ] && git tag v1.0.0
done
git bisect start HEAD v1.0.0
git bisect run sh test.sh
git bisect reset`
        },
        {
          cmd: "git tag / cherry-pick",
          title: "نسخ وتصليحات سريعة",
          desc: "[[tag]] بيعلّم commit كنسخة (v1.0.0)، و [[-a]] بيعمله برسالة ومين عمله وإمتى، ودي اللي تعلّم بيها كل نسخة قبل الديبلوي. و [[cherry-pick]] بياخد commit واحد بعينه من branch تانية، زي تصليح عاجل محتاجه على main دلوقتي.",
          example: R`git tag -a v1.0.0 -m "Release v1.0.0"
git push origin --tags
git cherry-pick a1b2c3d`,
          try: "اعمل tag لآخر commit وارفعه.",
          deep: {
            why: "[[tag]]: تعلّم نسخة مهمة (v1.0.0 اللي نزلت للعملاء) عشان ترجعلها بسهولة. و [[cherry-pick]]: محتاج تصليح واحد من branch تانية دلوقتي، من غير باقي شغلها.",
            how: R`الـ tag زي الـ branch: اسم بيشاور على commit. الفرق إن الـ branch بتتحرك لقدام مع كل commit جديد، والـ tag ثابت للأبد على نفس الـ commit. فـ [[v1.0.0]] دايمًا بتشاور على نفس النسخة.

وفيه نوعين: [[git tag v1.0.0]] لوحده «lightweight»، مجرد اسم. و [[git tag -a v1.0.0 -m "..."]] «annotated»: object في Git فيه رسالة ومين عمله وإمتى، و [[git show v1.0.0]] بيعرضهم. للنسخ اللي بتنزل استخدم [[-a]]، و [[git describe]] وأدوات الـ release بتعتمد عليه.

والـ tags مش بتترفع مع [[git push]] العادي، محتاجة [[--tags]]. وعلى GitHub بتقدر تعمل منها «Release».

[[cherry-pick hash]] بياخد التعديلات اللي في commit واحد بس، ويطبّقها كـ commit جديد على الـ branch اللي انت عليها. مثال: صلّحت bug في feature branch لسه مخلصتش، والتصليح محتاجه في الإنتاج دلوقتي. تروح main، وتعمل cherry-pick للتصليح بس.`,
            when: "tag مع كل نسخة بتنزل. cherry-pick لإصلاحات عاجلة (hotfix).",
            mistakes: "استخدام cherry-pick بدل merge بشكل متكرر، فنفس التعديلات تبقى موجودة بأرقام مختلفة في branches مختلفة، وده بيعمل conflicts بعدين."
          },
          teach: R`## الأول: أمرين ملهمش علاقة ببعض غير إنهم بيتعاملوا مع commit واحد

- [[git tag]]: يحط **اسم ثابت** على commit (زي [[v1.0.0]])، عشان ترجعله بالاسم.
- [[git cherry-pick]]: ياخد **تعديلات commit واحد** من أي branch ويطبّقها هنا.

اتشغّل في Git Bash على ويندوز (Git 2.56)، مع remote تجريبي (bare repo على نفس الجهاز) مكان GitHub.

---

## ١. [[git tag -a v1.0.0 -m "Release v1.0.0"]]

| الحتة | معناها |
|---|---|
| [[tag]] | اعمل tag على الـ commit الحالي (HEAD) |
| [[-a]] | annotated: tag كامل فيه اسمك والتاريخ ورسالة |
| [[v1.0.0]] | اسم الـ tag. [[v]] من version، والأرقام major.minor.patch |
| [[-m "..."]] | رسالة الـ tag |

الأمر مش بيطبع حاجة. نتأكد:

~~~bash
git tag
git show v1.0.0
~~~

~~~text الناتج
v1.0.0
tag v1.0.0
Tagger: Ahmed <ahmed@example.com>
Date:   Tue Oct 6 13:34:04 2026 +0300

Release v1.0.0

commit 013226dd7447bcfc69f52d14c620540af49a411d
Author: Ahmed <ahmed@example.com>
...
~~~

[[git tag]] لوحده بيعرض كل الـ tags. و [[git show]] بيبدأ ببيانات الـ tag نفسه ([[Tagger]] مين عمله، والرسالة)، وبعدين الـ commit اللي بيشاور عليه.

### annotated ولا lightweight؟

~~~bash
git cat-file -t v1.0.0
git tag light
git cat-file -t light
~~~

~~~text الناتج
tag
commit
~~~

[[git cat-file -t]] بيقولك نوع الحاجة جوه Git ([[-t]] من type). [[v1.0.0]] بتاع [[-a]] object مستقل نوعه [[tag]]. أما [[git tag light]] من غير [[-a]] فده مجرد اسم بيشاور على الـ commit على طول، مفيهوش رسالة ولا مين عمله. للنسخ اللي بتنزل استخدم [[-a]]، و [[git describe]] من غير فلاجات بيشوف الـ annotated بس:

~~~text git describe
v1.0.0
~~~

## ٢. [[git push origin --tags]]

[[git push]] العادي مش بيرفع tags. [[--tags]] بيرفعهم كلهم:

~~~text الناتج
To .../origin.git
 * [new tag]         v1.0.0 -> v1.0.0
~~~

[[[new tag]]] يعني اتعمل على الـ remote. ولو عايز واحد بس: [[git push origin v1.0.0]].

ولو جربت تعمل نفس الاسم تاني:

~~~text الناتج
fatal: tag 'v1.0.0' already exists
~~~

## ٣. [[git cherry-pick a1b2c3d]]

على branch اسمها [[feature/cart]] عملنا commitين: [[wip cart]] (شغل لسه مخلصش) و [[fix: price rounding]] (تصليح محتاجينه على main دلوقتي):

~~~text git log --oneline
27c574d fix: price rounding
7acd339 wip cart
013226d init
~~~

نروح main وناخد التصليح بس:

~~~bash
git switch main
git cherry-pick 27c574d
~~~

~~~text الناتج
[main 3d79113] fix: price rounding
 Date: Tue Oct 6 13:34:05 2026 +0300
 1 file changed, 1 insertion(+)
 create mode 100644 fix.js
~~~

~~~text git log --oneline و ls
3d79113 fix: price rounding
013226d init
README.md
fix.js
~~~

- التصليح دخل main بنفس الرسالة، بس برقم **جديد** ([[3d79113]] مش [[27c574d]])، لأن الأب اتغير.
- [[wip.js]] مش موجود: [[wip cart]] مادخلش.

> لو التعديل بيلمس سطور اتغيرت في main، cherry-pick بيوقف بـ conflict زي الـ merge: صلّح، و [[git add]]، و [[git cherry-pick --continue]]، أو [[--abort]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git tag -a v1.0.0 -m "..."]] | اسم ثابت برسالة على الـ commit الحالي |
| [[git push origin --tags]] | ارفع الـ tags (مش بتترفع لوحدها) |
| [[git cherry-pick hash]] | انسخ تعديلات commit واحد هنا كـ commit جديد |

الأوامر نفسها في كل الشيلات.`,
          lines: [
            "علّم الـ commit الحالي بنسخة v1.0.0، برسالة ([[-a]] annotated و [[-m]] الرسالة).",
            "ارفع الـ tags لـ GitHub (مش بتترفع لوحدها).",
            "خد commit واحد بس من أي branch وطبّقه هنا."
          ],
          sol: R`[[git tag]] بيوري [[v1.0.0]] في القايمة، و [[git show v1.0.0]] بيبدأ بـ [[tag v1.0.0]] و [[Tagger:]] و [[Release v1.0.0]] وبعدين الـ commit. ده لأن [[-a]] بيعمل annotated tag فيه اسمك وتاريخ ورسالة.

[[git push origin --tags]] بيطبع [[* [new tag] v1.0.0 -> v1.0.0]]، والـ tag بيظهر في GitHub تحت Tags وتقدر تعمل منه Release.

الغلط الشائع: [[git push]] العادي لوحده مش بيرفع الـ tags، فتلاقيها مش على GitHub. ولو قال [[tag 'v1.0.0' already exists]] يبقى الاسم مستخدم؛ متمسحش tag اترفع وناس نزّلته، اعمل واحد برقم أكبر.`
        },
        {
          cmd: "git worktree",
          title: "branch تانية في فولدر تاني",
          desc: "محتاج تصلّح حاجة عاجلة وانت في نص شغل؟ بدل stash، [[worktree add]] يفتح branch تانية في فولدر منفصل من نفس الـ repo، فشغلك الحالي ميتلمسش. و [[remove]] يشيله لما تخلص.",
          example: R`git worktree add -b hotfix/cart ../myapp-hotfix main
cd ../myapp-hotfix
git worktree list
cd ../myapp
git worktree remove ../myapp-hotfix`,
          try: "افتح worktree لـ branch جديدة، اعمل فيها commit، وارجع لفولدرك الأصلي ولاحظ إن تعديلاتك زي ما هي.",
          deep: {
            why: "stash بيلخبط لو عندك تعديلات كتير أو build شغال. worktree بيدّيك نسخة تانية من المشروع على branch تانية، في نفس اللحظة.",
            how: R`الـ repo واحد (فولدر [[.git]] واحد)، بس ليه كذا working directory، كل واحد على branch. أي commit في واحد بيبان في التاني فورًا لأن التاريخ مشترك.

والفولدر الجديد مفيهوش node_modules ولا .env، لأنهم مش في Git، فهتحتاج [[npm install]] هناك.`,
            when: "hotfix عاجل وانت في نص ميزة. مراجعة PR وانت مش عايز تقفل شغلك.",
            mistakes: "تمسح الفولدر بـ [[rm -rf]] بدل [[worktree remove]]، فيفضل متسجّل (صلّحها بـ [[git worktree prune]]). ومينفعش نفس الـ branch تتفتح في worktreeين."
          },
          teach: R`## الأول: repo واحد، كذا فولدر شغل

العادي إن كل repo ليه فولدر شغل واحد (working tree) على branch واحدة. [[git worktree]] بيضيف فولدر شغل **تاني** مربوط بنفس الـ [[.git]]، على branch تانية. فتشتغل في الاتنين في نفس الوقت، وأي commit في واحد بيبان في التاني فورًا لأن التاريخ واحد.

اتشغّل في Git Bash على ويندوز (Git 2.56). المشروع في فولدر [[myapp]] على main، وفيه تعديل لسه مش متسجّل في [[old.txt]].

---

## ١. [[git worktree add -b hotfix/cart ../myapp-hotfix main]]

| الحتة | معناها |
|---|---|
| [[worktree add]] | اعمل فولدر شغل جديد |
| [[-b hotfix/cart]] | واعمل فيه branch جديدة بالاسم ده ([[b]] من branch) |
| [[../myapp-hotfix]] | مكان الفولدر. [[..]] يعني الفولدر اللي فوق، فبيتعمل **جنب** المشروع مش جواه |
| [[main]] | الـ branch الجديدة تبدأ من main |

~~~text الناتج
Preparing worktree (new branch 'hotfix/cart')
HEAD is now at 2732594 init
~~~

## ٢. [[cd ../myapp-hotfix]]

[[cd]] (change directory) يدخلك الفولدر الجديد. جوه:

~~~bash
git branch --show-current
git status -s
cat old.txt
~~~

~~~text الناتج
hotfix/cart
o
~~~

انت على [[hotfix/cart]]، والفولدر نضيف: التعديل اللي في [[old.txt]] بتاع الفولدر الأصلي مش هنا، لأن كل فولدر شغل ليه ملفاته.

## ٣. [[git worktree list]]

~~~text الناتج
.../wt/myapp        2732594 [main]
.../wt/myapp-hotfix 2732594 [hotfix/cart]
~~~

كل سطر: مكان الفولدر (قصّرنا المسار)، والـ commit اللي واقف عليه، والـ branch بين [[[ ]]].

## ٤. [[cd ../myapp]]

عملنا commit في الـ hotfix ([[hotfix cart]]) ورجعنا:

~~~bash
git status -s
git log --oneline -1 hotfix/cart
~~~

~~~text الناتج
 M old.txt
2c818aa hotfix cart
~~~

تعديلك زي ما سبته، و commit الـ hotfix ظاهر من هنا كمان لأن الاتنين شايفين نفس الـ repo.

> لو حاولت تعمل [[git switch hotfix/cart]] هنا: [[fatal: 'hotfix/cart' is already used by worktree at '.../myapp-hotfix']]. الـ branch الواحدة مينفعش تبقى مفتوحة في فولدرين.

## ٥. [[git worktree remove ../myapp-hotfix]]

بيمسح الفولدر ويشيل تسجيله. الـ branch والـ commits بيفضلوا ([[git branch]] لسه فيه [[hotfix/cart]]). ولو في الفولدر ملفات مش متسجلة بيرفض:

~~~text الناتج
fatal: '../myapp-hotfix' contains modified or untracked files, use --force to delete it
~~~

### لو مسحته بـ [[rm -rf]] بالغلط

~~~text git worktree list
.../wt/myapp  2732594 [main]
.../wt/tmpwt  2c818aa [hotfix/cart] prunable
~~~

[[prunable]] يعني الفولدر مش موجود والتسجيل لسه موجود. [[git worktree prune]] بينضّفه.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git worktree add -b name ../folder main]] | فولدر جديد على branch جديدة من main |
| [[git worktree list]] | كل الفولدرات المربوطة |
| [[git worktree remove ../folder]] | امسح الفولدر، والـ branch تفضل |
| [[git worktree prune]] | نضّف تسجيل فولدر اتمسح بإيدك |

أوامر Git نفسها في كل الشيلات، و [[cd ../myapp-hotfix]] بالـ [[/]] بتشتغل زي ما هي في PowerShell و CMD كمان (جرّبناها). والفولدر الجديد مفيهوش [[node_modules]] ولا [[.env]] (مش في Git)، فهتحتاج [[npm install]] هناك.`,
          lines: [
            "اعمل branch جديدة hotfix/cart من main ([[-b]])، وافتحها في فولدر جنب المشروع.",
            "ادخل الفولدر الجديد واشتغل عادي.",
            "اعرض كل الفولدرات المربوطة بالـ repo ده.",
            "ارجع لمشروعك الأصلي، وشغلك زي ما سبته.",
            "امسح فولدر الـ worktree (الـ branch والـ commits بيفضلوا)."
          ],
          sol: R`[[git worktree list]] بيوري فولدرين، كل واحد جنبه الـ branch بتاعته: [[.../myapp 815e63b [main]]] و [[.../myapp-hotfix 815e63b [hotfix/cart]]].

بعد الـ commit في myapp-hotfix والرجوع لـ myapp: [[git status -s]] لسه بيوري تعديلاتك زي ما هي ([[ M old.txt]])، والملف الجديد مش موجود هنا. لكن [[git log --oneline -1 hotfix/cart]] بيوري commit الـ hotfix، لأن الفولدرين شايفين نفس الـ repo.

الغلط الشائع: تعمل [[git switch hotfix/cart]] في الفولدر الأصلي وهي مفتوحة في worktree، فيرفض بـ [[already used by worktree]]. و [[worktree remove]] بيرفض لو فيه تعديلات مش متسجلة في الفولدر ده، وده بيحميك.`
        },
        {
          cmd: "git alias",
          title: "اختصاراتك",
          desc: R`لو فيه أمر Git طويل بتكتبه كل شوية، زي [[git log --oneline --graph --all]]، تقدر تدّيله اسم قصير جوه Git نفسه. [[git config --global alias.lg "..."]] بيكتب في ملف [[~/.gitconfig]] إن [[git lg]] معناها الأمر اللي بين علامات التنصيص، و [[--global]] معناها لكل مشاريعك.

الأمر بيتكتب من غير كلمة [[git]] في أوله. وأي حاجة تكتبها بعد الاختصار بتتحط في الآخر: [[git lg -5]] تبقى [[git log --oneline --graph --all -5]].

الفرق عن alias الشيل: ده جوه Git، فبيشتغل بنفس الشكل في bash و zsh و PowerShell و CMD، وبينتقل معاك لو نسخت [[~/.gitconfig]] لجهاز تاني.`,
          example: R`git config --global alias.lg "log --oneline --graph --all"
git config --global alias.st "status -s"
git lg`,
          try: "اعمل alias لأكتر أمر بتكتبه.",
          deep: {
            why: "فيه أوامر Git طويلة بتكتبها عشرين مرة في اليوم، زي [[git log --oneline --graph --all]].",
            how: R`[[git config --global alias.lg "..."]] بيضيف في ملف [[~/.gitconfig]] إن [[git lg]] معناها الأمر الطويل ده. وبعد كده Git بيبدّل الاختصار قبل ما ينفّذ.

والفرق بينه وبين alias الـ bash: ده جوه Git نفسه، فبيشتغل في أي شيل (bash و zsh و PowerShell و CMD) ومع أي حد بيستخدم نفس الـ gitconfig. وتقدر تكمّل بعده arguments عادي: [[git lg -5]].`,
            when: "أكتر ٣ أو ٤ أوامر بتكتبها.",
            mistakes: "اختصارات كتير أوي فتنسى الأوامر الأصلية، ولما تشتغل على جهاز حد تاني تتلخبط. خليهم قليلين."
          },
          teach: R`## الأول: alias = اسم قصير لأمر Git طويل

[[git config --global alias.NAME "..."]] بيكتب في ملف إعدادات Git إن [[git NAME]] معناها الكلام اللي بين علامات التنصيص. ولما تكتب الاختصار، Git بيبدّله بالأمر الطويل قبل ما ينفّذ.

اتشغّل في Git Bash على ويندوز (Git 2.56). وعشان منغيّرش إعدادات الجهاز الحقيقية، وجّهنا [[--global]] لملف تجريبي بمتغير البيئة [[GIT_CONFIG_GLOBAL]]. انت هتشغّلها عادي من غيره.

---

## ١. [[git config --global alias.lg "log --oneline --graph --all"]]

| الحتة | معناها |
|---|---|
| [[git config]] | اكتب أو اقرا إعداد |
| [[--global]] | في ملف إعداداتك انت ([[~/.gitconfig]])، فيشتغل في كل مشاريعك |
| [[alias.lg]] | الإعداد اسمه [[lg]] جوه قسم [[alias]] |
| [["log --oneline --graph --all"]] | الأمر، **من غير** كلمة [[git]] في أوله |

[[~]] يعني فولدر اليوزر بتاعك (على ويندوز [[C:\Users\ali]]). والأمر مش بيطبع حاجة. الملف بقى فيه:

~~~text جوه ~/.gitconfig
[alias]
	lg = log --oneline --graph --all
~~~

## ٢. [[git config --global alias.st "status -s"]]

نفس الفكرة: [[git st]] = [[git status -s]]. والملف:

~~~text جوه ~/.gitconfig
[alias]
	lg = log --oneline --graph --all
	st = status -s
~~~

## ٣. [[git lg]]

~~~text الناتج
* 27c574d fix: price rounding
* 7acd339 wip cart
| * 3d79113 fix: price rounding
|/
* 013226d init
~~~

نفس ناتج [[git log --oneline --graph --all]] بالظبط. وأي حاجة تكتبها بعد الاختصار بتتحط في آخر الأمر: [[git lg -2]] بقت [[git log --oneline --graph --all -2]] وطلّعت أول سطرين بس.

وتشوف كل الاختصارات بـ:

~~~bash
git config --global --get-regexp '^alias\.'
~~~

~~~text الناتج
alias.lg log --oneline --graph --all
alias.st status -s
~~~

[[--get-regexp]] بيدوّر على أسامي إعدادات بـ regex، و [[^alias\.]] يعني «يبدأ بـ alias.».

---

## الغلطة المشهورة: [[git]] جوه الـ alias

~~~bash
git config --global alias.bad "git log --oneline"
git bad
~~~

~~~text الناتج
expansion of alias 'bad' failed; 'git' is not a git command
~~~

Git حط كلمة [[git]] بعد [[git]]، فبقت [[git git log]].

### alias بيشغّل أمر shell

لو بدأت القيمة بـ [[!]]، Git بيشغّلها كأمر shell مش كأمر Git:

~~~bash
git config --global alias.hi '!echo hello from shell'
git hi
~~~

~~~text الناتج
hello from shell
~~~

(استخدمنا علامات تنصيص مفردة لأن bash التفاعلي بيفهم [[!]] جوه التنصيص المزدوج على إنها history expansion، يعني «هات أمر قديم».)

---

## على ويندوز

نفس الأوامر في PowerShell و CMD، والاختصارات نفسها اشتغلت في PowerShell 7 ([[git st]] و [[git lg -1]]) لأنها جوه Git مش جوه الشيل.

## الخلاصة

- alias بيتكتب من غير [[git]].
- [[--global]] = لكل مشاريعك، في [[~/.gitconfig]].
- اللي بعد الاختصار بيتحط في الآخر.
- [[!]] في الأول = أمر shell.`,
          lines: ["اعمل اختصار lg لعرض التاريخ مرسوم.", "اختصار st لـ status المختصر.", "استخدم الاختصار."],
          sol: R`[[git config --global --get-regexp '^alias\.']] بيوري الاختصارات بتاعتك، زي [[alias.lg log --oneline --graph --all]] و [[alias.st status -s]]. و [[git st]] بيطلّع نفس ناتج [[git status -s]] بالظبط، و [[git lg]] نفس الـ graph.

اختار أمر بتكتبه كتير فعلًا (زي [[switch]] أو [[log --oneline -10]])، والاختصار يبقى قصير ومايتلخبطش مع أمر Git موجود.

الغلط الشائع: تكتب [[git config --global alias.lg "git log --oneline"]] بكلمة git جوه، فيطلع [[expansion of alias 'lg' failed; 'git' is not a git command]]. الـ alias بيتكتب من غير git. ولو عايز alias يشغّل أمر shell حطه بعلامة [[!]] في الأول.`
        }
      ]
    }
]);
