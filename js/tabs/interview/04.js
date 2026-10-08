// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "Git و Linux",
      l: 1,
      n: "أسئلة «هل اشتغلت في فريق وعلى سيرفر بجد؟». الأوامر نفسها بالتفصيل في تاب Git وتاب bash",
      items: [
        {
          cmd: "merge commit ولا history خطي",
          title: "إيه الفرق بين git merge و git rebase؟ وإمتى تستخدم كل واحد؟",
          desc: R`الـ merge بيجمع الـ branchين بـ commit جديد ليه أبين، وبيحافظ على التاريخ زي ما حصل بالظبط. الـ rebase بياخد الـ commits بتاعتك ويعيد كتابتها فوق آخر main، فالتاريخ يبقى خط واحد نضيف، بس الـ commits بتاخد hashes جديدة. والقاعدة الذهبية: متعملش rebase لـ branch حد تاني شغال عليه أو سحبه، لأنك بتعيد كتابة تاريخ مشترك.

عمليًا: rebase على الـ branch بتاعي قبل الـ PR عشان يبقى محدّث ونضيف، و merge (أو squash merge) لما يدخل main.`,
          example: R`git switch feature/login
git fetch origin
git rebase origin/main
git push --force-with-lease
git switch main
git merge --no-ff feature/login
git log --oneline --graph -8`,
          try: "في ريبو تجربة اعمل branch فيه commitين، وعلى main commit تالت. جرّب مرة merge ومرة rebase (بنسخة من الريبو) وقارن [[git log --graph]] في الحالتين.",
          deep: {
            why: "بيختبر إنك اشتغلت في فريق وعارف تحافظ على تاريخ مفهوم من غير ما تبوّظ شغل غيرك.",
            how: R`الـ merge بيدوّر على أقرب جد مشترك، ويعمل 3-way merge، ويطلّع commit ليه أبين. ولو main متحركش من ساعة ما فرّعت، بيعمل fast-forward: بيحرّك المؤشر بس من غير commit جديد، و [[--no-ff]] بيجبره يعمل merge commit عشان الـ feature تفضل باينة في التاريخ.

الـ rebase بياخد كل commit بتاعك كـ patch ويطبّقه واحد واحد فوق الـ base الجديدة. عشان كده ممكن يوقفك عند conflict في كل commit، وكل commit بيطلع بـ hash جديد. الـ branch القديم بقى تاريخ تاني، فلازم push بـ force. و [[--force-with-lease]] بيرفض لو حد عمل push على الـ branch من ساعة ما سحبت، فمبتمسحش شغله.

و [[git rebase -i]] بيخليك تدمج commits صغيرة (squash) وتعدّل رسايل قبل الـ PR. و squash merge في GitHub بيحوّل الـ PR كله لـ commit واحد على main. ولو حاجة باظت، [[git reflog]] بيرجّعك لأي نقطة. التفاصيل في تاب Git: [[git rebase]].`,
            when: "Follow-ups: «عملت rebase على branch مشترك وحصلت مشكلة، ترجع إزاي؟» (reflog). «squash merge إمتى؟». «ليه --force-with-lease مش --force؟». «git pull --rebase بيعمل إيه؟».",
            mistakes: R`إن rebase «أحسن» دايمًا. و [[git push --force]] على main أو branch مشترك. وإن الـ merge commits «وسخة»: ساعات هي التاريخ الحقيقي اللي محتاجه عشان تعرف الـ feature دخلت إمتى.`
          },
          teach: R`## الفكرة في جملة

المثال workflow كامل: حدّث الـ branch بتاعك بـ rebase فوق آخر main، وارفعه بأمان، وبعدين ادمجه في main بـ merge commit. شغلنا كل ده (والـ solCode) في [[docker run --rm ubuntu:24.04]] مع git، ومعاه remote وهمي (ريبو [[--bare]] في [[/tmp]]) وزميل بيرفع على نفس الـ branch.

---

## ١. [[git switch feature/login]]

[[switch]] بتنقلك على branch. (الأمر الأقدم [[git checkout]] بيعمل ده وحاجات تانية كتير، فـ [[switch]] أوضح.)

---

## ٢. [[git fetch origin]]

[[origin]] اسم الـ remote الافتراضي. [[fetch]] بيجيب الـ commits الجديدة من غير ما يلمس الـ branches بتاعتك، وبيحدّث نسخ اسمها [[origin/main]] و [[origin/feature/login]]:

~~~text الناتج
From /tmp/origin
   f2a68ba..dc9c5a0  main       -> origin/main
~~~

يعني main على الـ remote اتحرك من [[f2a68ba]] لـ [[dc9c5a0]] (زميلك رفع hotfix).

---

## ٣. [[git rebase origin/main]]

«خد الـ commits بتاعتي اللي مش في [[origin/main]]، وأعد تطبيقها واحد واحد فوقه». شوف الـ solCode: قبل الـ rebase الـ feature كانت:

~~~text الناتج
469e27c feat: two
fadb880 feat: one
3399b2d init
~~~

وبعده:

~~~text الناتج
6dc900c feat: two
3e9adaf feat: one
f07be08 main: hotfix
~~~

نفس الرسايل ونفس التغييرات، بس **hashes جديدة** ([[469e27c]] بقت [[6dc900c]]). ليه؟ لأن الـ hash محسوب من المحتوى **ومن الأب**، والأب اتغير من [[init]] لـ [[main: hotfix]]. يعني الـ rebase بيعمل commits جديدة، والقديمة بتفضل يتيمة (و [[git reflog]] يقدر يرجّعها).

---

## ٤. [[git push --force-with-lease]]

الـ remote عنده [[feat: login]] القديم، وانت عندك نسخة جديدة بـ hash تاني، فالـ push العادي هيترفض. محتاج force. الفرق:

- [[--force]]: «حط نسختي مكان أي حاجة هناك»، حتى لو زميلك رفع حاجة من دقيقة: شغله يتمسح.
- [[--force-with-lease]]: «حط نسختي **بس لو** الـ remote لسه على آخر حاجة أنا شفتها في [[fetch]]».

جربنا: زميلك رفع commit على [[feature/login]]، وانت من غير ما تعمل fetch عملت push:

~~~text الناتج
 ! [rejected]        feature/login -> feature/login (stale info)
error: failed to push some refs to '/tmp/origin.git'
~~~

[[stale info]]: معلوماتك عن الـ remote قديمة. اترفض بدل ما يمسح شغل زميلك. أما لما محدش رفع حاجة:

~~~text الناتج
 + 6d36801...77dd445 feature/login -> feature/login (forced update)
~~~

[[+]] و [[forced update]] يعني اتعمل force بنجاح.

---

## ٥. [[git switch main]] ثم [[git merge --no-ff feature/login]]

[[merge]] بيدوّر على أقرب جد مشترك ويطلّع commit جديد ليه **أبين**. والـ feature بعد الـ rebase بقت فوق main على طول، فـ git كان هيعمل **fast-forward** (يحرّك مؤشر main لقدام من غير commit جديد). [[--no-ff]] (no fast-forward) بيجبره يعمل merge commit عشان الـ feature تبان كمجموعة في التاريخ:

~~~text الناتج
Merge made by the 'ort' strategy.
~~~

([[ort]] اسم خوارزمية الـ merge الافتراضية في git الجديد.)

---

## ٦. [[git log --oneline --graph -8]]

[[--oneline]] سطر لكل commit، و [[--graph]] يرسم الفروع بالحروف، و [[-8]] آخر ٨. وده الفرق اللي طلّعه الـ solCode:

~~~text merge
*   Merge branch 'feature'
|\
| * feat: two
| * feat: one
* | main: hotfix
|/
* init
~~~

~~~text rebase ثم fast-forward
* feat: two
* feat: one
* main: hotfix
* init
~~~

في الـ merge، [[git log -1 --format="parents: %p"]] طلّع [[parents: f07be08 469e27c]]: commit واحد ليه أبين، والـ commits القديمة بنفس الـ hashes. في الـ rebase خط واحد ومفيش merge commit.

---

## الخلاصة

| | merge | rebase |
|---|---|---|
| التاريخ | زي ما حصل، بفروع | خط واحد |
| hashes الـ commits بتاعتك | زي ما هي | جديدة |
| commit زيادة | merge commit بأبين | لأ |
| بعد ما يتعمله push | push عادي | لازم [[--force-with-lease]] |
| خطر | تاريخ مزحوم شوية | تعيد كتابة تاريخ حد تاني شغال عليه |

> rebase على branch بتاعك انت لوحدك قبل الـ PR، و merge (أو squash) لما يدخل main. ومتعملش rebase لـ branch مشترك.`,
          lines: [
            "روح على الـ branch بتاعك.",
            "هات آخر حاجة من الـ remote من غير ما تدمج.",
            "أعد كتابة commits بتاعتك فوق آخر main.",
            "ارفع التاريخ الجديد بـ force، بس يرفض لو حد رفع حاجة في النص.",
            "ارجع لـ main.",
            "ادمج الـ feature بـ merge commit حتى لو ينفع fast-forward.",
            "شوف شكل التاريخ كرسمة."
          ],
          sol: R`بعد الـ merge الـ graph بيبان فيه فرعين بيتقابلوا في commit جديد اسمه [[Merge branch 'feature']]، والـ commits القديمة زي ما هي بنفس الـ hashes. بعد الـ rebase (وبعده fast-forward) الـ history خط واحد: [[init]] ثم [[main: hotfix]] ثم commits الـ feature فوقه، ومفيش merge commit. شغلت السكربت اللي تحت وطلّع ده بالظبط.

الحاجة اللي لازم تلاحظها: الـ commits بتاعة الـ feature بعد الـ rebase ليها hashes جديدة (قارن [[git log --oneline]] قبل وبعد)، لأن الـ rebase بيعمل commits جديدة فوق أساس جديد. عشان كده الـ branch لو كان متعمله push لازم [[--force-with-lease]]، ومتعملش rebase لـ branch حد تاني شغال عليه. ولو الـ merge طلع خط واحد برضو، ده لأن main مكانش فيه commit جديد فـ git عمل fast-forward: استخدم [[--no-ff]] لو عايز merge commit دايمًا.`,
          solCode: R`# merge-vs-rebase.sh
set -e
rm -rf demo && mkdir demo && cd demo && git init -q -b main
git config user.name you && git config user.email you@example.com
echo a > a.txt && git add . && git commit -qm "init"
git switch -qc feature
echo f1 > f1.txt && git add . && git commit -qm "feat: one"
echo f2 > f2.txt && git add . && git commit -qm "feat: two"
git switch -q main
echo m > m.txt && git add . && git commit -qm "main: hotfix"
cd .. && rm -rf merge-copy rebase-copy && cp -r demo merge-copy && cp -r demo rebase-copy
echo "=== merge"
cd merge-copy && git merge -q --no-edit feature && git log --oneline --graph --format="%s" && cd ..
echo "=== rebase"
cd rebase-copy && git switch -q feature && git rebase -q main && git switch -q main && git merge -q --ff-only feature && git log --oneline --graph --format="%s"
# === merge
# *   Merge branch 'feature'
# |\
# | * feat: two
# | * feat: one
# * | main: hotfix
# |/
# * init
# === rebase
# * feat: two
# * feat: one
# * main: hotfix
# * init`
        },
        {
          cmd: "افهم الطرفين وبعدين اختار",
          title: "حصل conflict وانت بتدمج: بتعمل إيه خطوة بخطوة؟",
          desc: R`الـ conflict بيحصل لما نفس السطور اتغيرت في الـ branchين. Git بيوقف ويحط علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]] في الملف. بفتح الملف، وأفهم كل تغيير كان عايز يعمل إيه (من الـ log أو أسأل صاحبه)، وأكتب النسخة الصح اللي غالبًا فيها الاتنين، وأشيل العلامات، وأشغّل الاختبارات، وبعدين [[git add]] و [[git merge --continue]]. ولو اتلخبطت، [[git merge --abort]] يرجّعني لقبل الدمج.

والأهم إزاي أقلله: branches قصيرة العمر، وأسحب من main كتير، و PRs صغيرة، و formatter واحد للفريق عشان المسافات متعملش conflicts.`,
          example: R`git merge feature/cart
git status
git diff --name-only --diff-filter=U
git checkout --theirs package-lock.json
npm install
git add .
git merge --continue
# ولو عايز تلغي الدمج كله وترجع لقبله:
git merge --abort`,
          try: "اعمل conflict بإيدك: branchين غيّروا نفس السطر، وادمج. افتحه في VS Code وجرّب «Accept Both»، وبعدين فعّل [[git config merge.conflictStyle zdiff3]] وكرّر: هتشوف النسخة الأصلية كمان.",
          deep: {
            why: "مفيش فريق من غير conflicts. السؤال بيشوف هل بتحلها بفهم ولا بتضغط «Accept Current» وتمسح شغل زميلك.",
            how: R`Git بيعمل 3-way merge: النسخة الأصلية (base)، ونسختك (ours)، ونسختهم (theirs). لو سطر اتغير في ناحية واحدة بس بياخده لوحده. لو اتغير في الناحيتين، ده conflict. و [[merge.conflictStyle zdiff3]] بيعرض الـ base كمان في النص، فتفهم كل واحد غيّر إيه عن الأصل.

خلي بالك: في الـ rebase معنى ours و theirs بيتقلب، لأن Git بيطبّق commits بتاعتك على main، فـ ours بقت main.

الـ lock files متتحلّش بالإيد: خد نسخة من ناحية وبعدين [[npm install]] يعيد حسابها بحيث تمشي مع [[package.json]] اللي اتدمج. و [[git rerere]] بيفتكر حلولك لو نفس الـ conflict اتكرر. التفاصيل في تاب Git: [[الـ conflicts]].`,
            when: "Follow-ups: «ours و theirs معناهم إيه في rebase؟». «conflict في lock file بتعمل إيه؟». «إزاي تقلل الـ conflicts في فريق؟». «حصل conflict في ملف migration، تعمل إيه؟».",
            mistakes: R`«Accept Current» على كل الملفات من غير ما تقرا. وتنسى علامات [[<<<<<<<]] في الكود وتعمل commit (الـ build أو الـ lint المفروض يمسكها). وتحل conflict في lock file بإيدك. ومتشغّلش الاختبارات بعد الحل: الملف ممكن يبقى مفيهوش علامات بس الكود مكسور.`
          },
          teach: R`## الفكرة في جملة

الأوامر دي هي خطوات حل conflict بالترتيب: ادمج، شوف مين اتلخبط، حل كل ملف بالطريقة المناسبة له، علّمه محلول، كمّل. عملنا conflict حقيقي في [[docker run --rm ubuntu:24.04]]: [[main]] خلّى السعر 90 (خصم)، و [[feature/cart]] خلّاه 120، والاتنين غيّروا ملف [[package-lock.json]] صغير (بدل lock file حقيقي، عشان منشغّلش npm).

---

## ١. [[git merge feature/cart]]

~~~text الناتج
Auto-merging cart.js
CONFLICT (content): Merge conflict in cart.js
Auto-merging package-lock.json
CONFLICT (content): Merge conflict in package-lock.json
Automatic merge failed; fix conflicts and then commit the result.
~~~

git حاول يدمج كل ملف لوحده ([[Auto-merging]]). الملف اللي سطر فيه اتغير **في الناحيتين** بقى [[CONFLICT]]، و git وقف في نص الدمج وخرج بكود 1. انت دلوقتي في حالة «merging»: مفيش commit لسه.

---

## ٢. [[git status]]

~~~text الناتج (بـ --short)
UU cart.js
UU package-lock.json
~~~

[[UU]] = Unmerged من الناحيتين (both modified). في [[git status]] العادي هتلاقيها مكتوبة [[both modified:]].

---

## ٣. [[git diff --name-only --diff-filter=U]]

- [[--name-only]]: أسماء الملفات بس.
- [[--diff-filter=U]]: فلتر على النوع U (Unmerged) بس.

~~~text الناتج
cart.js
package-lock.json
~~~

ده مفيد في مشروع كبير: لستة نضيفة بالملفات اللي **لسه** محتاجة حل.

---

## ٤. شكل الملف من جوه

~~~text cart.js
<<<<<<< HEAD
const price = 90;
=======
const price = 120;
>>>>>>> feature/cart
~~~

| العلامة | معناها |
|---|---|
| [[<<<<<<< HEAD]] | من هنا نسختك (الـ branch اللي انت واقف عليه، main) |
| [[=======]] | فاصل |
| [[>>>>>>> feature/cart]] | لحد هنا نسخة الـ branch اللي بتدمجه |

ومع [[git config merge.conflictStyle zdiff3]] بيظهر قسم تالت:

~~~text cart.js مع zdiff3
<<<<<<< HEAD
const price = 90;
||||||| bbe08a7
const price = 100;
=======
const price = 120;
>>>>>>> feature/cart
~~~

[[|||||||]] ومعاه hash الـ commit المشترك: ده **الأصل** (100). دلوقتي فاهم: واحد عمل خصم، وواحد رفع السعر. الحل مش «خد ده» ولا «خد ده»، الحل تسأل وتكتب النتيجة الصح.

---

## ٥. الـ lock file: [[git checkout --theirs package-lock.json]] ثم [[npm install]]

- [[--theirs]]: خد نسخة الـ branch اللي بتدمجه كلها. ([[--ours]] نسختك.)

~~~text الناتج
Updated 1 path from the index
{"v":2}
~~~

الملف بقى نسخة [[feature/cart]]. وبعدين [[npm install]] بيعيد حساب الـ lock file على الـ [[package.json]] اللي اتدمج، فلو الناحيتين ضافوا packages، الاتنين يدخلوا. lock file عمره ما يتحل بالإيد: آلاف السطور ومتولّدة.

وخلي بالك: بعد الـ checkout، [[--diff-filter=U]] لسه بيطبع الملفين. git مش بيعتبر الملف محلول غير لما تقوله.

---

## ٦. [[git add .]] ثم [[git merge --continue]]

كتبنا في [[cart.js]] النسخة الصح بإيدنا ([[const price = 108;]]، ومسحنا العلامات)، وبعدين:

- [[git add .]]: «الملفات دي اتحلت». ده اللي بيشيلهم من حالة [[UU]].
- [[git merge --continue]]: اعمل الـ merge commit (بيفتح محرر للرسالة، وفي التجربة خليناه يقبل الافتراضية).

~~~text الناتج
[main 4179956] Merge branch 'feature/cart'
*   4179956 Merge branch 'feature/cart'
|\
| * e0d0c19 raise price
* | d6a118f discount
|/
* bbe08a7 init
~~~

وقبل الـ add: شغّل الاختبارات. ملف من غير علامات مش معناه إن الكود سليم.

---

## ٧. زرار الطوارئ: [[git merge --abort]]

في نسخة تانية من الريبو عملنا نفس الدمج وبعدين:

~~~text الناتج
$ git merge --abort
$ git status --short
$ cat cart.js
const price = 90;
~~~

[[status]] فاضي والملف رجع زي ما كان قبل الدمج بالظبط.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ادمج | [[git merge feature/cart]] |
| شوف مين اتلخبط | [[git status]] و [[git diff --name-only --diff-filter=U]] |
| ملف كود | افهم الناحيتين (و zdiff3 يوريك الأصل) واكتب الصح |
| lock file | [[git checkout --theirs]] ثم [[npm install]] |
| علّم محلول | [[git add]] (بعد الاختبارات) |
| كمّل | [[git merge --continue]] |
| اتلخبطت | [[git merge --abort]] |

> في الـ rebase معنى ours و theirs بيتقلب: ours بقت main. والأهم من الحل إنك تقلل الـ conflicts: branches قصيرة، و PRs صغيرة، و formatter واحد.`,
          lines: [
            "ادمج الـ branch، و Git يوقف لو فيه conflict.",
            "شوف الملفات اللي فيها conflict (both modified).",
            "اطبع أسماء الملفات اللي لسه مش محلولة بس.",
            "في الـ lock file: خد نسخة الـ branch اللي بتدمجه كلها.",
            "وأعد حساب الـ lock file على الـ package.json الجديد.",
            "علّم كل الملفات إنها اتحلت.",
            "كمّل الدمج واعمل الـ merge commit.",
            "زرار الطوارئ: ارجع لحالة ما قبل الدمج."
          ],
          sol: R`الـ merge هيقول [[CONFLICT (content): Merge conflict in cart.js]]، والملف هيبقى فيه [[<<<<<<< HEAD]] ونسختك، ثم [[=======]]، ثم نسخة الـ branch و [[>>>>>>> feature/cart]]. مع [[zdiff3]] بيظهر قسم زيادة في النص بيبدأ بـ [[|||||||]] وفيه السطر الأصلي قبل ما الطرفين يغيّروه. ده بيفرق جدًا: من غيره انت شايف 90 و 120 ومش عارف مين غيّر إيه، ومعاه بتشوف إن الأصل كان 100، فواحد عمل خصم وواحد رفع السعر، وتسأل صاحبه.

«Accept Both» في المثال ده هيحط السطرين تحت بعض: [[const price = 90;]] و [[const price = 120;]]، ودي SyntaxError لأن [[const]] اتعرّف مرتين. ده الدرس: Accept Both مناسب لحاجات بتتجمع (import جديد من كل ناحية، سطرين في لستة)، مش لنفس القيمة. بعد الحل: [[git add]] ثم [[git merge --continue]]، ولو اتلخبطت [[git merge --abort]] يرجعك لقبل الدمج.`,
          solCode: R`# conflict.sh
rm -rf c && mkdir c && cd c && git init -q -b main
git config user.name you && git config user.email you@example.com
echo 'const price = 100;' > cart.js && git add . && git commit -qm init
git switch -qc feature/cart && echo 'const price = 120;' > cart.js && git commit -qam "raise price"
git switch -q main && echo 'const price = 90;' > cart.js && git commit -qam "discount"
git config merge.conflictStyle zdiff3
git merge feature/cart; cat cart.js
# CONFLICT (content): Merge conflict in cart.js
# <<<<<<< HEAD
# const price = 90;
# ||||||| 1cbdbb6
# const price = 100;
# =======
# const price = 120;
# >>>>>>> feature/cart`
        },
        {
          cmd: "trunk-based",
          title: "الفريق بيدير الـ branches إزاي؟ اشرح Git Flow وإيه البديل اللي أغلب الفرق بتستخدمه",
          desc: R`Git Flow فيه main للإنتاج، و develop للتطوير، وفروع feature و release و hotfix. منظّم بس تقيل، ومناسب لما بتطلّع نسخ برقم (تطبيق موبايل أو library). أغلب فرق الويب دلوقتي بتشتغل trunk-based أو GitHub Flow: main دايمًا جاهز للـ deploy، و branch قصير لكل feature، و PR فيه review و CI، و merge، و deploy تلقائي.

والحاجة اللي مش جاهزة بتستخبى ورا feature flag بدل branch عايش شهر. والـ hotfix بيبقى PR عادي على main.`,
          example: R`git switch -c feat/password-reset
git commit -am "feat(auth): add password reset email"
git push -u origin feat/password-reset
gh pr create --fill --base main
gh pr merge --squash --delete-branch`,
          try: "في ريبو على GitHub فعّل branch protection على main (لازم PR و CI أخضر)، وجرّب تعمل push مباشر على main وشوف الرفض.",
          deep: {
            why: "بيعرف منه هل اشتغلت في فريق بعملية واضحة، وهل فاهم ليه الـ branches الطويلة بتوجع.",
            how: R`كل ما الـ branch يعيش أكتر، بيبعد عن main أكتر، والدمج في الآخر بيبقى conflict ضخم ومخاطرة كبيرة. الـ trunk-based بيحل ده بإن كل واحد يدمج صغير وكتير (يوم أو يومين)، والـ CI بيتأكد إن main سليم بعد كل دمج.

الـ feature flag شرط في الكود ([[if (flags.newCheckout)]]) بيتحكم فيه من إعدادات، فتقدر تدمج كود لسه مش جاهز وهو مقفول، وتفتحه ليوزرز معينين الأول، وتقفله في ثانية لو فيه مشكلة من غير rollback.

والـ commit messages بشكل Conventional Commits ([[feat:]] و [[fix:]] و [[chore:]]) بتخلي الـ changelog والـ versions تتعمل أوتوماتيك. الأوامر في «تاب Git» ([[gh pr]] و [[git rebase]])، وفحص صيغة الرسالة أوتوماتيك في «تاب فحص الكود» ([[commitlint]])، والـ CI اللي بيشتغل على كل PR في «تاب GitHub Actions» ([[ci.yml]])، والـ feature flags جنب الـ canary في «تاب Cloud و DevOps» ([[blue-green vs canary]]).`,
            when: "Follow-ups: «بتعمل hotfix إزاي؟». «إيه هي feature flags؟». «بتكتب commit message إزاي؟». «بتبص على إيه في code review؟». «PR كبير قد إيه يبقى كبير؟».",
            mistakes: R`تقول «بنشتغل على main على طول من غير PRs» كأنها ميزة. أو تحفظ Git Flow وتقول إنه الصح لكل مشروع. أو branch عايش أسابيع وفي الآخر conflict ضخم. ورسايل commit زي «fix» و «update».`
          },
          teach: R`## الفكرة في جملة

الخمس أوامر هما دورة حياة feature في فريق trunk-based أو GitHub Flow: branch قصير، commit برسالة واضحة، push، PR، squash merge. أول تلاتة شغلناهم في [[docker run --rm ubuntu:24.04]] على remote وهمي (ريبو [[--bare]])، وأوامر [[gh]] محتاجة ريبو حقيقي على GitHub فالفلاجز بتاعتها من [[gh pr create --help]] و [[gh pr merge --help]] (gh 2.97 على ويندوز).

---

## ١. [[git switch -c feat/password-reset]]

[[-c]] = create: اعمل branch جديد من مكانك الحالي (main) واتنقل عليه.

~~~text الناتج
Switched to a new branch 'feat/password-reset'
~~~

الاسم فيه النوع ([[feat/]]) والموضوع، فأي حد يشوف لستة الـ branches يفهم.

---

## ٢. [[git commit -am "feat(auth): add password reset email"]]

- [[-a]]: ضيف **كل الملفات المتتبّعة** اللي اتعدلت، من غير [[git add]]. خلي بالك: الملف الجديد خالص مش متتبّع، فـ [[-a]] مش هيضيفه. ساعتها [[git add]] الأول.
- [[-m]]: الرسالة.

~~~text الناتج
[feat/password-reset bdfa418] feat(auth): add password reset email
 1 file changed, 1 insertion(+)
~~~

الرسالة بصيغة Conventional Commits:

| الحتة | معناها |
|---|---|
| [[feat]] | النوع: feature جديدة. وفيه [[fix]] و [[chore]] و [[docs]] و [[refactor]] |
| [[(auth)]] | الـ scope: الجزء اللي اتغير |
| [[add password reset email]] | وصف قصير بصيغة الأمر |

ليه الصيغة دي؟ أدوات بتقراها وتعمل changelog وتحدد الـ version لوحدها ([[feat]] = minor، و [[fix]] = patch).

---

## ٣. [[git push -u origin feat/password-reset]]

[[-u]] (set-upstream): اربط الـ branch المحلي بالـ remote، فبعد كده [[git push]] و [[git pull]] من غير أسماء.

~~~text الناتج
 * [new branch]      feat/password-reset -> feat/password-reset
branch 'feat/password-reset' set up to track 'origin/feat/password-reset'.
~~~

---

## ٤. [[gh pr create --fill --base main]]

[[gh]] هو GitHub CLI. من الـ help:

~~~text gh pr create --help
  -B, --base branch          The branch into which you want your code merged
  -f, --fill                 Use commit info for title and body
~~~

يعني: افتح PR هيندمج في [[main]]، وعنوانه ووصفه من رسايل الـ commits. على الـ PR بيشتغل الـ CI (اختبارات و lint) وبيحصل الـ review.

---

## ٥. [[gh pr merge --squash --delete-branch]]

~~~text gh pr merge --help
  -d, --delete-branch           Delete the local and remote branch after merge
  -s, --squash                  Squash the commits into one commit and merge it into the base branch
~~~

- [[--squash]]: كل commits الـ PR (حتى «fix typo» و «wip») تبقى commit **واحد** على main.
- [[--delete-branch]]: امسح الـ branch محليًا وعلى GitHub. خلص دوره.

---

## ٦. Git Flow مقابل trunk-based

| | Git Flow | trunk-based / GitHub Flow |
|---|---|---|
| الـ branches الثابتة | main و develop | main بس |
| عمر الـ feature branch | ممكن أسابيع | يوم أو يومين |
| release | branch [[release/*]] | كل merge ممكن يتعمله deploy |
| hotfix | branch [[hotfix/*]] من main | PR عادي على main |
| الحاجة اللي مش جاهزة | تفضل في branch | تتدمج ورا feature flag |
| مناسب لـ | تطبيق موبايل، library بأرقام نسخ | ويب و SaaS |

---

## الخلاصة

~~~text
switch -c  →  commit (feat(scope): ...)  →  push -u  →  PR + review + CI  →  squash merge + delete
~~~

> main دايمًا جاهز للـ deploy، وده مضمون بـ branch protection (لازم PR و CI أخضر). وكل ما الـ branch يعيش أكتر، الـ conflict في الآخر بيكبر.`,
          lines: [
            "اعمل branch جديد للـ feature واتنقل عليه.",
            "commit برسالة واضحة: نوع (feat) ومكان (auth) ووصف.",
            "ارفع الـ branch واربطه بالـ remote.",
            "افتح PR على main من الـ commits (بـ GitHub CLI).",
            "بعد الـ review والـ CI: ادمجه commit واحد وامسح الـ branch."
          ],
          sol: R`الـ push المباشر لازم يترفض برسالة زي: [[remote: error: GH006: Protected branch update failed for refs/heads/main.]] مع [[Changes must be made through a pull request.]] (لو branch protection القديمة)، أو [[remote: error: GH013: Repository rule violations found for refs/heads/main.]] (لو rulesets الجديدة)، وفي الآخر [[! [remote rejected] main -> main]]. ساعتها الطريق الوحيد: branch، ثم PR، ثم CI أخضر، ثم merge.

النتيجة الغلط الأشهر: الـ push عدّى عادي. غالبًا لأنك owner أو admin والقاعدة بتسمح للـ admins يعدّوها: فعّل «Do not allow bypassing the above settings» في الـ protection (أو شيل الـ bypass في الـ ruleset). وخلي بالك إن الحماية دي على الريبوهات الـ private محتاجة خطة مدفوعة غالبًا، وعلى الـ public مجانية.`
        },
        {
          cmd: "ps و kill و signals",
          title: "على سيرفر لينكس: برنامج واقف أو واكل الرام، هتعرف إزاي وتوقفه إزاي؟",
          desc: R`كل برنامج شغال process ليه PID وصاحب وحالة. بشوفهم بـ [[ps aux]] أو [[top]] و [[htop]]، وأعرف مين ماسك بورت بـ [[ss -tlnp]]. وبوقف الـ process ببعت signal: [[kill PID]] بيبعت SIGTERM (15) يعني «اقفل بهدوء» والبرنامج يقدر يخلّص شغله، ولو مردّش [[kill -9]] بيبعت SIGKILL اللي مينفعش يتمسك ولا يتجاهل.

وفي السيرفرات الخدمات بتتدار بـ systemd أو Docker أو pm2: [[systemctl status]] و [[journalctl -u]] للوجات، فغالبًا بوقفها من المدير بتاعها مش بـ kill.`,
          example: R`ps aux --sort=-%mem | head -5
ss -tlnp | grep :3000
kill 12345
kill -9 12345
systemctl status nginx
journalctl -u myapp -n 50 --no-pager`,
          try: "شغّل [[node -e \"setInterval(() => {}, 1000)\"]] في ترمنال، ومن ترمنال تاني هات الـ PID بـ [[pgrep node]] وابعتله [[kill]]. بعدين جرّب نفس الحاجة بسكربت فيه [[process.on('SIGTERM', ...)]] بيطبع رسالة قبل ما يقفل.",
          deep: {
            why: "الـ full-stack اللي بيعمل deploy لازم يعرف يشخّص سيرفر. والسؤال بيفرّق بين اللي بيعمل [[kill -9]] على طول واللي فاهم graceful shutdown.",
            how: R`الـ process نسخة شغالة من برنامج، ليها ذاكرة خاصة و PID وأب (PPID). لينكس بيعمل process جديدة بـ fork (نسخة من الأب) وبعدين exec (يحمّل البرنامج الجديد). لو الابن خلص والأب مقراش حالته، بيفضل zombie في الجدول.

الـ signals رسايل صغيرة من النظام: SIGINT (2) لما تدوس Ctrl+C، و SIGTERM (15) طلب قفل مهذب، و SIGKILL (9) النظام بيقتل على طول والبرنامج مبيعرفش، و SIGHUP (1) كان «الترمنال اتقفل» وبرامج كتير بتستخدمه لإعادة قراية الإعدادات.

الـ graceful shutdown في Node: [[process.on("SIGTERM", ...)]] ← [[server.close()]] يبطّل ياخد طلبات جديدة ويخلّص اللي شغال ← اقفل الاتصال بالداتابيز ← اخرج. و [[docker stop]] بيبعت SIGTERM ويستنى ١٠ ثواني وبعدين SIGKILL. التفاصيل في تاب bash وتاب «التشخيص».`,
            when: "Follow-ups: «الفرق بين SIGTERM و SIGKILL؟». «zombie process يعني إيه؟». «graceful shutdown لسيرفر Node إزاي؟». «الـ load average عالي، بتبص على إيه؟». «البورت مشغول، تعرف مين ماسكه إزاي؟».",
            mistakes: R`[[kill -9]] أول حاجة: البرنامج ميلحقش يقفل الاتصالات ويكمّل الكتابة. وتخلط الـ process بالـ thread. و [[killall node]] على سيرفر عليه كذا تطبيق. وتوقف خدمة شغالة بـ systemd بـ kill فترجع تقوم لوحدها وانت مش فاهم ليه.`
          },
          teach: R`## الفكرة في جملة

الأوامر دي هي اللي بتعملها بالترتيب على سيرفر فيه مشكلة: مين واكل الرام؟ مين ماسك البورت؟ اقفله بهدوء، ولو مردّش اقتله. وبعدين لو الخدمة شغالة بـ systemd، اسأل systemd. جربنا أول أربعة في كونتينر [[node:22-slim]] (لينكس Debian) بعد تسطيب [[procps]] و [[iproute2]]، وشغلنا فيه سيرفر Node على بورت 3000 حاجز حوالي ٣٠ ميجا. أوامر [[systemctl]] و [[journalctl]] محتاجة systemd، والكونتينر مفيهوش ([[systemctl: command not found]])، فشرحهم من الـ docs.

---

## ١. [[ps aux --sort=-%mem | head -5]]

- [[ps]] (process status): لستة الـ processes.
- [[a]] بتاعة كل اليوزرز، و [[u]] بأعمدة مفصّلة، و [[x]] حتى اللي ملهاش ترمنال (الخدمات).
- [[--sort=-%mem]]: رتّب بالرام، والـ [[-]] معناها من الأكبر للأصغر.
- [[| head -5]]: أول ٥ سطور: العناوين + أكبر ٤.

~~~text الناتج (مختصر)
USER   PID %CPU %MEM    VSZ   RSS TTY  STAT START TIME COMMAND
root   419  7.0  0.4 778836 77568 ?    Sl   11:35 0:00 node -e require("http")...
root   428  0.0  0.0   8096  4096 ?    R    11:35 0:00 ps aux --sort=-%mem
root   427  0.0  0.0   2492  1280 ?    S    11:35 0:00 sleep 300
~~~

| العمود | معناه |
|---|---|
| [[PID]] | رقم الـ process، ده اللي بتبعتله signals |
| [[%CPU]] و [[%MEM]] | نسبة من المعالج والرام الكلية |
| [[VSZ]] | الذاكرة الـ virtual بالكيلوبايت: كل اللي محجوز كعناوين، رقم كبير ومش مهم |
| [[RSS]] | الرام الحقيقية بالكيلوبايت: 77568 KB ≈ ٧٦ ميجا. ده اللي تبص عليه |
| [[STAT]] | الحالة: [[S]] نايم مستني، و [[R]] شغال دلوقتي، و [[l]] فيه threads، و [[Z]] zombie |

---

## ٢. [[ss -tlnp | grep :3000]]

[[ss]] (socket statistics) بيعرض الاتصالات والبورتات:

| الفلاج | معناه |
|---|---|
| [[-t]] | TCP بس |
| [[-l]] | اللي في حالة listen بس |
| [[-n]] | أرقام بدل أسماء (3000 مش اسم خدمة) |
| [[-p]] | اسم الـ process والـ PID اللي ماسكه (محتاج root عشان يوريك processes يوزرز تانيين) |

~~~text الناتج
LISTEN 0      511                *:3000            *:*    users:(("node",pid=419,fd=18))
~~~

[[*:3000]] سامع على كل الـ IPs، و [[pid=419]] هو نفس الـ node اللي فوق. ده بيجاوب «EADDRINUSE: البورت مشغول، مين ماسكه؟».

---

## ٣. [[kill 12345]] و [[kill -9 12345]]

[[kill]] اسمه مضلل: هو **بيبعت signal**. من غيره رقم بيبعت SIGTERM (15). و [[kill -l]] بيعرض الأرقام:

~~~text الناتج
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 ...	 9) SIGKILL	...	15) SIGTERM
~~~

جربنا الاتنين على [[sleep 300]] وعلى سكربت الـ solCode اللي بيمسك SIGTERM:

~~~text الناتج
sleep + kill          → exit=143
sleep + kill -9       → Killed, exit=137
graceful.js + kill    → got SIGTERM, cleaning up... / bye, exit=0
graceful.js + kill -9 → Killed, exit=137  (ومطبعش ولا سطر من الـ handler)
~~~

اقرا الأرقام: لما process يموت من signal، الـ shell بيدّي exit code = **128 + رقم الـ signal**. فـ 143 = 128 + 15 (SIGTERM)، و 137 = 128 + 9 (SIGKILL). لو شفت 137 في لوج Docker أو Kubernetes، غالبًا اتقتل بـ SIGKILL (كتير بسبب الرام: OOM killer).

والسكربت اللي فيه handler خرج بـ 0: SIGTERM **طلب**، والبرنامج قدر يمسكه ويخلّص وينضّف. SIGKILL مبيوصلش للبرنامج أصلًا، النظام بيشيله.

الـ handler نفسه:

~~~js
process.on("SIGTERM", () => {
  console.log("got SIGTERM, cleaning up...");
  clearInterval(t);
  setTimeout(() => { console.log("bye"); process.exit(0); }, 200);
});
~~~

[[process.on("SIGTERM", fn)]] بيسجّل دالة للـ signal ده، فـ Node ميقفلش لوحده. في سيرفر حقيقي جوه الدالة: [[server.close()]] (بطّل تاخد طلبات جديدة)، واقفل الداتابيز، و [[process.exit(0)]].

---

## ٤. [[systemctl status nginx]] و [[journalctl -u myapp -n 50 --no-pager]]

من الـ docs (محتاجين سيرفر بـ systemd):

- [[systemctl status nginx]]: الخدمة شغالة ولا لأ ([[active (running)]] أو [[failed]])، والـ PID الرئيسي، والرام، وآخر سطور لوج.
- [[journalctl]]: اللوجات اللي systemd جامعها. [[-u myapp]] للخدمة دي (u = unit)، و [[-n 50]] آخر ٥٠ سطر، و [[--no-pager]] اطبع على طول من غير [[less]].

ولو الخدمة شغالة بـ systemd، اقفلها بـ [[systemctl stop]] مش [[kill]]: لو فيها [[Restart=always]] systemd هيرجّعها تقوم بعد الـ kill.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| مين واكل الرام؟ | [[ps aux --sort=-%mem | head]] (عمود RSS) |
| مين ماسك البورت؟ | [[ss -tlnp | grep :PORT]] |
| اقفل بهدوء | [[kill PID]] (SIGTERM، exit 143 لو مفيش handler) |
| مردّش | [[kill -9 PID]] (SIGKILL، exit 137) |
| خدمة systemd | [[systemctl status]] و [[journalctl -u]] |

> SIGTERM الأول دايمًا، وادّي البرنامج ثواني. ده اللي [[docker stop]] بيعمله: SIGTERM، ويستنى ١٠ ثواني، وبعدين SIGKILL.`,
          lines: [
            "أكتر ٤ processes بتاكل رام (الـ ٥ سطور منهم سطر العناوين).",
            "مين ماسك بورت 3000، ورقمه إيه.",
            "ابعت SIGTERM: اقفل بهدوء.",
            "لو مردّش: SIGKILL، قتل فوري من غير فرصة يخلّص.",
            "حالة خدمة شغالة بـ systemd وآخر سطور اللوج.",
            "آخر ٥٠ سطر لوج لخدمة التطبيق."
          ],
          sol: R`[[pgrep node]] بيطبع أرقام PIDs بس، وممكن يطلع أكتر من رقم لو فيه node تاني شغال (VS Code نفسه بيشغّل node). استخدم [[pgrep -a node]] عشان تشوف الأمر جنب كل رقم وتختار الصح. بعد [[kill PID]] الترمنال الأول هيقول [[Terminated]]، والـ exit code هيبقى 143 (يعني 128 + 15، و 15 رقم SIGTERM).

مع السكربت اللي فيه handler، [[kill]] مش هيقفله فجأة: هيطبع [[got SIGTERM, cleaning up...]] ثم [[bye]] ويخرج بـ 0 لما يخلص تنضيف. وده اللي بيعمله systemd و Docker و Kubernetes: يبعتوا SIGTERM ويستنوا شوية. أما [[kill -9]] (SIGKILL) مبيوصلش للبرنامج أصلًا، فالـ handler مبيشتغلش خالص، والترمنال يقول [[Killed]] و exit code يبقى 137. عشان كده -9 آخر حل مش أول حل.`,
          solCode: R`// graceful.js: شغّله بـ node graceful.js، ومن ترمنال تاني: kill PID
const t = setInterval(() => {}, 1000);
console.log("pid", process.pid);
process.on("SIGTERM", () => {
  console.log("got SIGTERM, cleaning up...");
  clearInterval(t);
  setTimeout(() => { console.log("bye"); process.exit(0); }, 200);
});
// pid 1211
// got SIGTERM, cleaning up...
// bye`
        },
        {
          cmd: "rwx للـ owner و group و others",
          title: "يعني إيه chmod 755؟ واقرا السطر ده: -rw-r--r--",
          desc: R`كل ملف ليه owner و group، وتلات صلاحيات لكل واحد من التلاتة (owner، ثم group، ثم others): r=4 قراية، و w=2 كتابة، و x=1 تنفيذ (وفي الفولدر معناها تدخله). الرقم مجموعهم: 7=rwx، و 6=rw-، و 5=r-x، و 4=r--. فـ 755 = الـ owner كل حاجة والباقي قراية وتنفيذ، ودي للفولدرات والسكربتات. و 644 = الـ owner يقرا ويكتب والباقي يقرا بس، ودي للملفات العادية. و 600 للأسرار زي مفتاح SSH و [[.env]].

و [[-rw-r--r--]] أول حرف نوع الملف ([[-]] ملف و [[d]] فولدر و [[l]] link)، وبعده تلات مجموعات: يعني 644.`,
          example: R`ls -l deploy.sh .env
chmod 755 deploy.sh
chmod 600 .env
chmod u+x,g-w script.sh
sudo chown -R deploy:www-data /var/www/myapp
id`,
          try: "اعمل فولدر فيه ملف، واعمل للفولدر [[chmod 644]] (من غير x) وجرّب [[cd]] جواه و [[cat]] للملف. بعدين رجّعه 755. هتفهم معنى x على الفولدر.",
          deep: {
            why: "أي deploy على سيرفر فيه مشاكل صلاحيات: Nginx مش قادر يقرا الملفات، أو السكربت مش بيتنفّذ، أو [[.env]] مقروء لأي حد. والسؤال بيشوف فاهم الأرقام ولا بيعمل 777.",
            how: R`في الفولدر: r معناها تشوف أسماء الملفات جواه، و x معناها تدخله وتوصل لملفاته بالاسم، و w معناها تعمل وتمسح ملفات جواه (حتى لو الملف نفسه مش بتاعك). عشان كده المسح صلاحية الفولدر مش الملف.

الـ umask بيحدد الصلاحيات الافتراضية: غالبًا 022، فالملفات الجديدة بتطلع 644 والفولدرات 755. و root بيعدّي كل الصلاحيات دي. وفيه بتات خاصة: الـ sticky bit على [[/tmp]] (بتظهر [[t]]) بيمنع حد يمسح ملف مش بتاعه حتى لو الفولدر مفتوح للكل.

والقاعدة: least privilege. التطبيق يشتغل بيوزر عادي مش root، وملفات الموقع ملك يوزر الـ deploy، و [[www-data]] في الـ group بيقرا بس (فولدرات 750 وملفات 640)، وبيكتب في فولدر الرفع بس. والأسرار 600. التفاصيل في تاب bash.`,
            when: "Follow-ups: «ليه 777 غلط؟». «الفرق بين r و x على فولدر؟». «إيه هو umask؟». «sudo بيعمل إيه بالظبط؟». «Nginx بيطلّع 403 على ملفات الموقع، تشخّص إزاي؟».",
            mistakes: R`[[chmod -R 777]] عشان «يشتغل»: أي process مخترق يقدر يعدّل كودك. وتشغّل التطبيق بـ root. وتنسى إن الفولدر محتاج x عشان توصل للملفات جواه. و [[chmod -R 755]] على كل حاجة فالملفات العادية كلها بقت executable.`
          },
          teach: R`## الفكرة في جملة

الأوامر بتقرا الصلاحيات، وتغيّرها بالأرقام وبالحروف، وتغيّر صاحب الملفات. شغلناهم في [[docker run --rm ubuntu:24.04]] بيوزر عادي اسمه [[deploy]] (مش root، لأن root بيعدّي كل الصلاحيات فمكناش هنشوف حاجة).

---

## ١. قراية السطر: [[ls -l]]

~~~text الناتج (قبل أي تعديل)
-rw-rw-r-- 1 deploy deploy 0 Oct  8 11:36 .env
-rw-rw-r-- 1 deploy deploy 8 Oct  8 11:36 deploy.sh
~~~

نفكّ [[-rw-rw-r--]] (١٠ حروف):

~~~text
-    rw-    rw-    r--
نوع  owner  group  others
~~~

| الحرف | معناه |
|---|---|
| أول حرف | [[-]] ملف، و [[d]] فولدر، و [[l]] symbolic link |
| [[r]] | read = 4 |
| [[w]] | write = 2 |
| [[x]] | execute = 1 (وفي الفولدر: تدخله) |
| [[-]] مكان حرف | الصلاحية دي مش موجودة |

وبعدها [[deploy deploy]]: الـ owner ثم الـ group، وبعدهم الحجم بالـ byte والتاريخ والاسم.

ليه الملفات الجديدة طلعت [[rw-rw-r--]] (664)؟ بسبب الـ umask. [[umask]] طبع [[0002]]: يعني «شيل w من others». الملفات بتبدأ من 666 وناقص 002 = 664. وعلى سيرفرات كتير الـ umask بيبقى 022 فالملفات تطلع 644.

---

## ٢. الأرقام: [[chmod 755 deploy.sh]] و [[chmod 600 .env]]

كل رقم = مجموع ٤ و ٢ و ١ لواحد من التلاتة:

| الرقم | الحساب | الحروف |
|---|---|---|
| 7 | 4 + 2 + 1 | [[rwx]] |
| 6 | 4 + 2 | [[rw-]] |
| 5 | 4 + 1 | [[r-x]] |
| 4 | 4 | [[r--]] |
| 0 | — | [[---]] |

فـ 755 = owner [[rwx]]، و group [[r-x]]، و others [[r-x]]. و 600 = owner [[rw-]] والباقي ولا حاجة.

~~~text الناتج
-rwxr-xr-x 1 deploy deploy 8 Oct  8 11:36 deploy.sh
-rw------- 1 deploy deploy 0 Oct  8 11:36 .env
~~~

و [[./deploy.sh]] بقى يشتغل وطبع [[hi]]. ولو عايز الرقم مباشرة: [[stat -c "%a %A %n"]] طبع [[755 -rwxr-xr-x]] و [[600 -rw-------]].

---

## ٣. الحروف: [[chmod u+x,g-w script.sh]]

| الحتة | معناها |
|---|---|
| [[u]] / [[g]] / [[o]] / [[a]] | user (owner) / group / others / all |
| [[+]] / [[-]] / [[=]] | ضيف / شيل / حط بالظبط |
| [[,]] | تعديلين في أمر واحد |

~~~text الناتج
قبل:  -rw-rw-r--  script.sh
بعد:  -rwxr--r--  script.sh
~~~

الـ owner خد [[x]]، والـ group فقد [[w]]، والباقي زي ما هو. الحروف أحسن لما عايز تغيّر حاجة واحدة من غير ما تحسب الرقم كله.

---

## ٤. [[sudo chown -R deploy:www-data /var/www/myapp]]

- [[chown]] (change owner): [[user:group]].
- [[-R]]: على الفولدر وكل اللي جواه.
- [[sudo]]: تغيير الـ owner محتاج root.

~~~text الناتج
-rw-r--r-- 1 deploy www-data    0 Oct  8 11:36 index.html
drwxr-xr-x 2 deploy www-data 4096 Oct  8 11:36 public
~~~

الملفات ملك يوزر الـ deploy، والـ group هو [[www-data]] (اليوزر اللي Nginx بيشتغل بيه على Ubuntu)، فـ Nginx بيقرا بصلاحيات الـ group.

---

## ٥. [[id]]

~~~text الناتج
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy)
~~~

[[uid]] رقم اليوزر، و [[gid]] الـ group الأساسي، و [[groups]] كل الـ groups اللي هو فيها. ده اللي لينكس بيقارنه بالـ owner والـ group بتوع الملف عشان يعرف يستخدم أنهي تلاتة حروف.

---

## ٦. التجربة: x على الفولدر

~~~bash
mkdir folder; echo secret > folder/file
chmod 644 folder
~~~

~~~text الناتج
drw-r--r-- 2 deploy deploy 4096 Oct  8 11:36 folder
sh: 1: cd: can't cd to folder
cat: folder/file: Permission denied
file
-????????? ? ? ? ?            ? file
~~~

- [[cd folder]] فشل، و [[cat folder/file]] فشل رغم إن الملف نفسه مقروء.
- [[ls folder]] نجح وطبع [[file]]: الـ [[r]] على الفولدر = تقرا **لستة الأسامي** بس.
- [[ls -l folder]] طبع علامات استفهام: يعرف الاسم بس مش قادر يدخل يجيب التفاصيل.

بعد [[chmod 755 folder]]، [[cat folder/file]] طبع [[secret]]. يعني [[x]] على الفولدر = «تعدّي من جواه».

---

## الخلاصة

| الرقم | لمين |
|---|---|
| 755 | فولدرات وسكربتات |
| 644 | ملفات عادية |
| 600 | أسرار: [[.env]] ومفتاح SSH |
| 777 | أبدًا |

> فولدر ناقصه [[x]] في أي مكان في الطريق بيقفل كل اللي تحته، ودي أشهر سبب لـ 403 من Nginx. وفي Docker و WSL غالبًا انت root، فالتجربة تعدّي ومتشوفش المشكلة.`,
          lines: [
            "اعرض الصلاحيات والـ owner والـ group للملفين.",
            "السكربت: الـ owner يعمل كل حاجة، والباقي يقرا وينفّذ.",
            "ملف الأسرار: الـ owner بس يقرا ويكتب.",
            "بالحروف: ضيف تنفيذ للـ owner، وشيل الكتابة من الـ group.",
            "خلي الملفات ملك يوزر الـ deploy، والـ group هو اليوزر اللي Nginx أو PHP بيشتغل بيه عشان يقرا بس.",
            "انت مين: الـ uid والـ groups بتاعتك."
          ],
          sol: R`بعد [[chmod 644]] على الفولدر، [[ls -ld]] هيطلع [[drw-r--r--]]، و [[cd]] هيقول [[Permission denied]]، و [[cat folder/file]] كمان [[Permission denied]] رغم إن الملف نفسه [[rw-r--r--]] ومسموح يتقري. أما [[ls folder]] فهيعرض أسامي الملفات، لأن [[r]] على الفولدر معناها «تقرا لستة الأسامي» بس. و [[ls -l folder]] هيعرض علامات استفهام مكان التفاصيل.

الخلاصة اللي تقولها: [[x]] على الفولدر معناها «تعدّي من جواه» (تدخله وتوصل لأي حاجة فيه بالاسم). عشان كده الفولدرات 755 والملفات 644، وأي فولدر في الطريق ناقصه x بيقفل كل اللي تحته، ودي أشهر سبب لـ 403 من Nginx على ملفات «الـ permissions بتاعتها سليمة».

النتيجة الغلط: كل حاجة اشتغلت عادي. ده لأنك root (أو في WSL أو Docker بتشتغل root)، والـ root بيعدّي فحص الـ permissions. جرّب بيوزر عادي، أو [[sudo -u nobody cat folder/file]].`
        }
      ]
    }
]);
