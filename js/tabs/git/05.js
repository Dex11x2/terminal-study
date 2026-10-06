// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "rebase مع فريق: التعارضات وتحديث الـ PR",
      l: 3,
      n: "rebase وقف في النص، و ours و theirs المقلوبين، و pull --rebase، وتحديث PR قديم من main",
      items: [
        {
          cmd: "rebase --continue / --abort",
          title: "الـ rebase وقف في النص بـ conflict",
          desc: R`في الـ merge الـ conflict بيحصل مرة واحدة. في الـ rebase ممكن يحصل مع كل commit من بتوعك، لأن Git بيعيد تطبيقهم واحد واحد فوق main.

فبيوقف عند الـ commit اللي فيه تعارض. بتصلّح الملف، و [[git add]]، وبعدين [[git rebase --continue]] (مش [[git commit]]). و [[--skip]] بيرمي الـ commit ده خالص، و [[--abort]] بيرجّعك لقبل الـ rebase بالظبط.`,
          example: R`git switch feature/header
git rebase main
git status
code app.txt
git add app.txt
git rebase --continue
# لو الـ commit ده ملوش لازمة خلاص (نفس التعديل دخل main بشكل تاني):
git rebase --skip
# أو ارجع لقبل الـ rebase كله:
git rebase --abort`,
          try: R`في repo التجربة: غيّر نفس السطر في main وفي أول commit من ٢ على feature، واعمل [[git rebase main]]. صلّح، وكمّل بـ [[--continue]]، واتأكد إن الـ commit التاني اتطبّق لوحده. وبعدين كرر التجربة وجرّب [[--abort]].`,
          flag: "danger",
          deep: {
            why: "على فريق بيعمل rebase قبل الـ PR، ده بيحصل كل أسبوع. واللي ميعرفش هو فين بالظبط بيعمل commit وسط الـ rebase، أو يعمل merge بدل ما يكمّل، والتاريخ يتلخبط. لو فهمت إن الـ rebase مجرد «طابور commits» بيتطبّق واحد واحد، كل الأوامر دي هتبقى منطقية.",
            how: R`[[git rebase main]] بيعمل قايمة بالـ commits بتاعتك اللي مش في main (الـ todo)، ويقف على آخر main (HEAD بيبقى detached)، ويبدأ يطبّقهم بالترتيب. كل واحد بينجح بيبقى commit جديد.

لو واحد فيهم عارض تعديل في main، Git بيوقف ويطبع [[could not apply a1b2c3d... header red]]. [[git status]] بيقولك «interactive rebase in progress» وانت في commit رقم كام من كام، وأنهي ملفات فيها تعارض.

بتصلّح زي أي conflict، و [[git add]] للملف. و [[git rebase --continue]] بيعمل الـ commit نفسه برسالته الأصلية (ممكن يفتح المحرر تأكدها)، ويكمّل على اللي بعده، وممكن يوقف تاني.

[[--skip]] بيرمي الـ commit الحالي من الطابور، وتعديلاته مش هتبقى في الـ branch. استخدمه لما التعديل ده دخل main خلاص بشكل تاني (حد عمله squash و merge مثلًا). ولو الـ commit مطابق بالظبط لحاجة في main، Git بيشيله لوحده ويقولك «skipped previously applied commit».

[[--abort]] بيرجّع الـ branch لمكانها قبل الـ rebase، كأن مفيش حاجة حصلت. ولو فات الأوان وكمّلت، الـ reflog لسه فيه المكان القديم ([[ORIG_HEAD]] كمان بيشاور عليه بعد الـ rebase على طول).`,
            when: "كل مرة rebase يوقف. قاعدة: لو الـ conflicts كتير ومش فاهم الكود التاني، [[--abort]] واعمل merge بدل rebase، أو اسأل صاحب التعديل.",
            mistakes: R`[[git commit]] بعد ما تصلّح بدل [[--continue]]: بيعمل commit زيادة، والـ rebase لسه مستني. و [[--skip]] وانت فاكره «عدّي التعارض»، فتعديلاتك في الـ commit ده تضيع (ارجعلها من reflog). وتنسى إنك في نص rebase وتكمّل شغل عادي على detached HEAD، فالـ prompt أو [[git status]] بيقولك. وفي الانترفيو: «إيه الفرق بين conflict في merge و rebase؟» في merge مرة واحدة على النتيجة النهائية، في rebase ممكن مرة لكل commit، بس كل واحد أصغر وأوضح.`
          },
          teach: R`## الأول: الـ rebase طابور

[[git rebase main]] بيعمل قايمة (اسمها todo) بالـ commits بتاعتك اللي مش في main، ويقف على آخر main، ويطبّقهم واحد واحد. لو واحد فيهم عارض حاجة في main، الطابور **بيقف** عند الـ commit ده بس، ومستنيك تقول له تعمل إيه: تكمّل، ولا ترمي الـ commit ده، ولا تلغي كله.

اتشغّل في Git Bash على ويندوز (Git 2.56) بنفس خطوات الـ solCode. [[app.txt]] فيه سطر [[color = "blue"]]، و main غيّرته لـ [[green]]، والـ branch بتاعتنا غيّرته لـ [[red]] في commit، وبعده commit تاني ضاف [[f.txt]]:

~~~text git log --oneline --graph --all
* f5e45a3 add footer
* d95a8b2 header red
| * 79fa7a5 main green
|/
* a336f62 init
~~~

---

## ١. [[git switch feature/header]]

روح للـ branch اللي عايز تحرّكها. rebase بيشتغل على الـ branch الحالية.

## ٢. [[git rebase main]]

~~~text الناتج
Auto-merging app.txt
CONFLICT (content): Merge conflict in app.txt
error: could not apply d95a8b2... header red
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
hint: Disable this message with "git config set advice.mergeConflict false"
Could not apply d95a8b2... # header red
~~~

- [[CONFLICT (content)]]: تعارض في **محتوى** الملف (مش حذف أو إعادة تسمية).
- [[could not apply d95a8b2... header red]]: وقف عند أول commit في الطابور.
- والـ [[hint]] بيقولك التلات أوامر اللي في الدرس.

## ٣. [[git status]]

~~~text الناتج
interactive rebase in progress; onto 79fa7a5
Last command done (1 command done):
   pick d95a8b2 # header red
Next command to do (1 remaining command):
   pick f5e45a3 # add footer
You are currently rebasing branch 'feature/header' on '79fa7a5'.

Unmerged paths:
	both modified:   app.txt
~~~

(شيلنا سطور النصايح اللي بين أقواس، زي [[(use "git rebase --skip" to skip this patch)]].)

| السطر | معناه |
|---|---|
| [[onto 79fa7a5]] | بيحط commits بتاعتك فوق ده (آخر main) |
| [[Last command done]] | الـ commit اللي واقف عنده |
| [[Next command to do]] | اللي لسه في الطابور |
| [[both modified: app.txt]] | الطرفين عدّلوا الملف ده |

## ٤. [[code app.txt]]

[[code]] بيفتح الملف في VS Code (أي محرر ينفع). جوه الملف:

~~~text app.txt
title = "Shop"
<<<<<<< HEAD
color = "green"
=======
color = "red"
>>>>>>> d95a8b2 (header red)
~~~

فوق [[=======]] نسخة main، وتحتها نسخة الـ commit بتاعك (في rebase الـ HEAD هو main، والدرس اللي جاي بيشرح ليه). بتكتب الشكل النهائي وتمسح العلامات التلاتة. احنا اخترنا [[red]]:

~~~text app.txt بعد التصليح
title = "Shop"
color = "red"
~~~

## ٥. [[git add app.txt]]

[[add]] هنا معناها «الملف ده اتحل». مش بيطبع حاجة.

## ٦. [[git rebase --continue]]

~~~text الناتج
[detached HEAD 151d4c4] header red
 1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/feature/header.
~~~

عمل الـ commit برسالته الأصلية ([[detached HEAD]] لأن الـ rebase شغال على HEAD من غير branch لحد ما يخلص)، وكمّل على [[add footer]] فعدّى من غير تعارض، وخلص:

~~~text git log --oneline --graph --all
* ee6a2d5 add footer
* 151d4c4 header red
* 79fa7a5 main green
* a336f62 init
~~~

خط واحد، والأرقام جديدة. وممكن [[--continue]] يفتح المحرر تأكد الرسالة؛ في التجربة شغّلناه بـ [[GIT_EDITOR=true]] عشان يقبل الرسالة زي ما هي من غير محرر.

## ٧. [[git rebase --skip]]

رجعنا للحالة القديمة وعملنا rebase تاني، ووقت التعارض جرّبنا [[--skip]]:

~~~text الناتج
Successfully rebased and updated refs/heads/feature/header.
~~~

~~~text git log --oneline --graph --all و cat app.txt
* 3468026 add footer
* 79fa7a5 main green
* a336f62 init
title = "Shop"
color = "green"
~~~

[[header red]] **اختفى** من الـ branch، والملف فيه [[green]] بتاع main. [[--skip]] مش «عدّي التعارض»، هو «ارمي الـ commit ده». (ولو احتجته: [[git reflog]].)

## ٨. [[git rebase --abort]]

~~~text git status و git log --oneline -2
On branch feature/header
nothing to commit, working tree clean
f5e45a3 add footer
d95a8b2 header red
~~~

نفس الأرقام القديمة بالظبط: كأن الـ rebase محصلش.

---

## الغلطة المشهورة: [[git commit]] بدل [[--continue]]

جرّبناها: صلّحنا و add وكتبنا [[git commit -m "fix conflict"]]، و [[git status]] لسه بيقول [[interactive rebase in progress]]. الـ commit اتعمل زيادة، والطابور لسه واقف. ساعتها [[--abort]] وابدأ تاني، أو [[--continue]] وبعدين نضّف.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git rebase --continue]] | الـ commit ده اتحل، اعمله وكمّل |
| [[git rebase --skip]] | ارمي الـ commit ده وكمّل |
| [[git rebase --abort]] | الغي كله وارجع زي الأول |

الأوامر نفسها في كل الشيلات. الـ solCode فيه [[sed -i]] و [[printf]] و [[GIT_EDITOR=true]]، ودول شغالين في Git Bash ولينكس (على الماك [[sed -i '']] بدل [[sed -i]]). في PowerShell عدّل الملف من المحرر، واكتب [[git -c core.editor=true rebase --continue]] بدل [[GIT_EDITOR=true]]: [[-c]] بيغيّر إعداد للأمر ده بس، و [[true]] برنامج بيخلص على طول فيقبل الرسالة. جرّبناها في PowerShell 7 وكمّلت عادي.`,
          lines: [
            "روح للـ branch بتاعتك.",
            "حط commits بتاعتك فوق آخر main، ويوقف عند أول تعارض.",
            "انت في commit رقم كام من كام، وأنهي ملف فيه تعارض.",
            "افتح الملف وصلّحه وامسح العلامات.",
            "قول لـ Git إنك صلّحته.",
            "اعمل الـ commit ده وكمّل على اللي بعده.",
            "أو ارمي الـ commit الحالي من الطابور وكمّل.",
            "أو الغي الـ rebase كله وارجع الـ branch زي ما كانت."
          ],
          sol: R`[[git rebase main]] بيطبع [[CONFLICT (content): Merge conflict in app.txt]] و [[could not apply ... header red]]، ومعاه تلميحات بالتلات أوامر.

[[git status]] بيقول [[interactive rebase in progress]]، و [[Last command done (1 command done)]]، و [[Next command to do (1 remaining command)]] والـ commit التاني، و [[Unmerged paths]] فيها app.txt.

بعد [[git add app.txt]] و [[git rebase --continue]]: [[Successfully rebased and updated refs/heads/feature/header]]، و [[git log --oneline]] بيوري commitين بتوعك فوق commit الـ main، بأرقام جديدة غير الأصلية.

ومع [[--abort]]، [[git log --oneline]] بيرجع زي ما كان بالظبط، بنفس الأرقام القديمة.

الغلط الشائع: تكتب [[git commit]] بدل [[--continue]]، فتلاقي commit زيادة، و [[git status]] لسه بيقول rebase in progress.`,
          solCode: R`mkdir -p ~/lab/rb && cd ~/lab/rb && git init -b main
printf 'title = "Shop"\ncolor = "blue"\n' > app.txt
git add . && git commit -m init
git switch -c feature/header
sed -i 's/blue/red/' app.txt && git commit -am "header red"
echo footer > f.txt && git add f.txt && git commit -m "add footer"
git switch main
sed -i 's/blue/green/' app.txt && git commit -am "main green"
git switch feature/header
git rebase main
git status
printf 'title = "Shop"\ncolor = "red"\n' > app.txt
git add app.txt
GIT_EDITOR=true git rebase --continue
git log --oneline`
        },
        {
          cmd: "ours و theirs في rebase",
          title: "ليه ours بقت main وقت الـ rebase",
          desc: R`في merge: [[--ours]] نسختك (الـ branch اللي انت واقف عليها)، و [[--theirs]] الـ branch اللي بتدمجها.

في rebase بيتقلبوا: [[--ours]] بقت main (أو اللي بتعمل rebase عليه)، و [[--theirs]] بقت الـ commit بتاعك. ونفس الكلام في علامات الملف: الجزء تحت [[<<<<<<< HEAD]] هو main.`,
          example: R`git rebase main
git diff --name-only --diff-filter=U
git checkout --ours package-lock.json
git checkout --theirs src/cart.js
git add package-lock.json src/cart.js
git rebase --continue
# وفي merge العادي العكس:
git merge main
git checkout --ours src/cart.js`,
          try: R`اعمل conflict في rebase، وجرّب [[git checkout --ours]] واعرض الملف، وبعدين [[--theirs]] واعرضه. قول لنفسك قبل ما تشغّل كل واحد: هيطلّع نسخة مين؟`,
          flag: "danger",
          deep: {
            why: "ده من أكتر الحاجات اللي بتخلي حد «يختار نسختي» في rebase، فيطلع شايل تعديلاته هو وسايب نسخة main. ومحدش بياخد باله غير لما الميزة تختفي بعد الدمج.",
            how: R`القاعدة ثابتة في الاتنين: ours هي HEAD، يعني المكان اللي انت واقف عليه، و theirs هي اللي بيتطبّق عليه.

في [[git merge main]] وانت على feature: HEAD هو feature، وبتجيب main عليه. فـ ours هي feature (بتاعتك) و theirs هي main.

في [[git rebase main]]: Git بيقف على main الأول (HEAD بقى main)، ويطبّق commits بتاعتك عليه واحد واحد، كأنه بيعمل cherry-pick لكل واحد. فـ ours هي main (واللي اتطبّق عليه لحد دلوقتي)، و theirs هي الـ commit بتاعك.

فعلامة [[<<<<<<< HEAD]] في rebase فوقها كود main، و [[>>>>>>> a1b2c3d (header red)]] تحتها كود الـ commit بتاعك باسمه. ونفس الكلام لأزرار VS Code: «Current» في rebase هو main، و «Incoming» هو بتاعك.

[[git diff --name-only --diff-filter=U]] بيطبع أسماء الملفات اللي لسه فيها تعارض بس ([[U]] من unmerged)، مفيد لو كتير. و [[checkout --ours/--theirs]] بيكتب نسخة كاملة للملف مكان التعارض، مفيد لملفات زي [[package-lock.json]] اللي ملهاش معنى تصلّحها سطر سطر. الأحسن فيها: خد نسخة main، وبعدين [[npm install]] يضيف اللي ناقص من الـ package.json بتاعك.`,
            when: "أي conflict في rebase هتحلّه بنسخة كاملة، أو بأزرار المحرر. و [[-X ours]] أو [[-X theirs]] مع merge أو rebase نفسه بيتقلبوا بنفس القاعدة.",
            mistakes: R`تعمل [[git checkout --ours]] في rebase وانت فاكرها نسختك، فتمسح شغلك من الـ commit ده. اعرض الملف بعد الأمر قبل الـ add دايمًا. و [[--theirs]] على package-lock.json بتاعك، فتضيع أي dependency حد ضافها في main. وفي الانترفيو: «في rebase، ours بتشاور على إيه؟» على الـ upstream (main)، لأن الـ rebase بيبدأ منها ويطبّق commits بتاعتك عليها.`
          },
          teach: R`## الأول: ours دايمًا HEAD، والسؤال HEAD مين؟

القاعدة واحدة في merge و rebase: [[--ours]] = النسخة اللي في [[HEAD]] (المكان اللي Git واقف عليه وقت التعارض)، و [[--theirs]] = اللي بيتطبّق عليه. الفرق إن HEAD بيتغير:

| العملية وانت على feature | HEAD وقت التعارض | ours | theirs |
|---|---|---|---|
| [[git merge main]] | feature | **بتاعتك** | main |
| [[git rebase main]] | main (والـ commits اللي اتطبّقت لحد دلوقتي) | **main** | الـ commit بتاعك |

ليه في rebase HEAD هو main؟ لأن rebase بيقف على آخر main **الأول**، وبعدين يطبّق commits بتاعتك عليه واحد واحد.

اتشغّل في Git Bash على ويندوز (Git 2.56) على نفس repo الدرس اللي فات: main خلّى اللون [[green]]، والـ commit بتاعك [[header red]] خلّاه [[red]].

---

## ١. [[git rebase main]]

بيوقف بـ [[CONFLICT (content): Merge conflict in app.txt]] زي الدرس اللي فات.

## ٢. [[git diff --name-only --diff-filter=U]]

| الحتة | معناها |
|---|---|
| [[git diff]] | قارن |
| [[--name-only]] | أسامي الملفات بس، من غير التعديلات |
| [[--diff-filter=U]] | الملفات اللي حالتها [[U]] بس، من unmerged (لسه فيها تعارض) |

~~~text الناتج
app.txt
~~~

مفيد لما يبقى فيه ٣٠ ملف متعدّل و ٢ بس فيهم تعارض. و [[git status -s]] بيعرضهم كـ [[UU app.txt]] (الطرفين عدّلوا).

## ٣. [[git checkout --ours package-lock.json]]

في تجربتنا الملف [[app.txt]]:

~~~bash
git checkout --ours app.txt
cat app.txt
~~~

~~~text الناتج
Updated 1 path from the index
title = "Shop"
color = "green"
~~~

[[green]]، يعني **main**، مش تعديلك. [[checkout --ours]] بيكتب نسخة الطرف ده كاملة فوق الملف ويشيل العلامات. و [[from the index]] لأن Git وقت التعارض شايل النسختين في منطقة التحضير.

ده مناسب لـ [[package-lock.json]] في المثال: خد نسخة main كاملة، وبعدين [[npm install]] يضيف اللي ناقص من الـ [[package.json]] بتاعك، بدل ما تصلّح ملف متولّد سطر سطر.

## ٤. [[git checkout --theirs src/cart.js]]

~~~bash
git checkout --theirs app.txt
cat app.txt
~~~

~~~text الناتج
Updated 1 path from the index
title = "Shop"
color = "red"
~~~

[[red]]: ده تعديلك. في rebase، [[--theirs]] هو اللي بيحافظ على شغلك.

## ٥. [[git add package-lock.json src/cart.js]]

[[checkout --ours/--theirs]] بيكتب الملف بس، والتعارض لسه مفتوح:

~~~text git status -s قبل وبعد add
UU app.txt
M  app.txt
~~~

[[UU]] بقت [[M ]] (متعدّل ومتجهز): كده اتحل.

## ٦. [[git rebase --continue]]

~~~text الناتج
[detached HEAD 3aa125d] header red
 1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/feature/header.
~~~

## ٧ و ٨. نفس الحالة في merge

رجعنا الـ branch لقبل الـ rebase وعملنا [[git merge main]] بدله:

~~~text app.txt وقت الـ merge
title = "Shop"
<<<<<<< HEAD
color = "red"
=======
color = "green"
>>>>>>> main
~~~

قارن بالـ rebase: هناك [[green]] كانت تحت [[HEAD]]، وهنا [[red]]. و [[git checkout --ours app.txt]] طلّع [[color = "red"]]، و [[--theirs]] طلّع [[green]]. عكس الـ rebase بالظبط.

---

## نفس القاعدة في VS Code

أزرار الـ conflict في VS Code: «Accept Current Change» = HEAD = ours، و «Accept Incoming Change» = theirs. يعني في rebase «Current» هو main.

## الخلاصة

| | merge | rebase |
|---|---|---|
| [[--ours]] / Current / تحت [[<<<<<<< HEAD]] | نسختك | main |
| [[--theirs]] / Incoming | main | نسختك |

- بعد أي [[checkout --ours]] أو [[--theirs]] اعمل [[cat]] للملف قبل الـ add.
- الأوامر نفسها في كل الشيلات (في PowerShell استخدم [[Get-Content app.txt]] أو [[cat]] اللي هو alias ليه).`,
          lines: [
            "ابدأ الـ rebase، ويوقف عند تعارض.",
            "اعرض الملفات اللي لسه فيها تعارض بس.",
            "في rebase: [[--ours]] نسخة main، مناسبة لملف lock تعيد توليده.",
            "و [[--theirs]] نسخة الـ commit بتاعك.",
            "علّم الملفين إنهم اتحلّوا.",
            "كمّل الـ rebase.",
            "في merge وانت على feature:",
            "هنا [[--ours]] نسختك انت (feature)."
          ],
          sol: R`وقت الـ rebase، الملف فيه:

[[<<<<<<< HEAD]] وتحتها [[color = "green"]] (main)، و [[=======]]، و [[color = "red"]] وبعدها [[>>>>>>> a1b2c3d (header red)]] (الـ commit بتاعك).

[[git checkout --ours app.txt]] وبعدين [[cat app.txt]]: [[color = "green"]]، يعني main. و [[--theirs]]: [[color = "red"]]، يعني تعديلك.

لو كنت متوقع العكس، ده بالظبط الفخ اللي الدرس بيتكلم عنه. وفي merge من نفس الحالة (وانت على feature و [[git merge main]])، [[--ours]] بيطلّع red.`
        },
        {
          cmd: "git pull --rebase",
          title: "هات شغل الفريق من غير merge commits",
          desc: R`الـ push اترفض لأن حد رفع قبلك. [[git pull]] العادي بيعمل merge commit «Merge branch main of github.com/...» كل مرة، والتاريخ يتملي بيهم. [[git pull --rebase]] بيحط commits بتاعتك فوق اللي نزل، والتاريخ يفضل خط واحد.

[[pull.rebase true]] بيخليه الافتراضي. والدرس الأول في التاب ظبط [[pull.rebase false]] (merge)، والاتنين صح: اختار واحد، والفريق كله يمشي عليه.`,
          example: R`git push
# ! [rejected]  main -> main (fetch first)
git pull --rebase
git push
git config --global pull.rebase true
git config --global rebase.autoStash true
git pull`,
          try: R`اعمل clone تاني لـ repo التجربة في فولدر تاني. اعمل commit في كل واحد، وارفع من الأول، وبعدين [[git pull --rebase]] في التاني وارفع. قارن [[git log --graph --oneline]] بنفس التجربة مع [[pull]] العادي.`,
          deep: {
            why: "انت وزميلك على نفس الـ branch، وكل واحد عمل commit. العادي إنك تعمل pull فيعمل merge commit مالوش أي معنى غير «اتنين اشتغلوا في نفس الوقت». بعد شهر التاريخ نصه merge commits، و [[git log]] و [[bisect]] بيبقوا أصعب.",
            how: R`[[git pull]] = [[git fetch]] وبعده حاجة تجمع شغلك مع اللي نزل. العادي merge. و [[--rebase]] بيخليها [[git rebase origin/main]]: يشيل commits بتاعتك اللي لسه مترفعتش، ويحط اللي نزل، ويعيد تطبيق بتوعك فوقه.

ده آمن رغم إن rebase «بيعيد كتابة التاريخ»، لأنه بيعيد كتابة commits لسه مترفعتش، يعني محدش عنده نسخة منها.

ولو فيه conflict، هو rebase عادي: تصلّح و [[git add]] و [[git rebase --continue]]، أو [[--abort]].

[[rebase.autoStash true]]: من غيره، pull بـ rebase بيرفض لو عندك تعديلات مش محفوظة ([[cannot pull with rebase: You have unstaged changes]]). معاه بيعمل stash قبل وبيرجّعه بعد لوحده ([[Applied autostash]]).

Git من 2.27 بيطبع تحذير، ومن 2.33 تقريبًا بيوقف بـ «divergent branches» لو مظبطش pull.rebase ولا pull.ff والفرعين اتفرّعوا. عشان كده لازم تختار: [[false]] يدمج، و [[true]] يعمل rebase، و [[pull.ff only]] يرفض أي حاجة غير fast-forward ويسيبك تختار كل مرة.`,
            when: "على أي branch بيشتغل عليها أكتر من حد، والـ commits بتاعتك لسه مترفعتش. كتير من الفرق بتظبط pull.rebase true على الكل.",
            mistakes: R`تعمل [[git pull --rebase]] على branch فيها merge commit عملته بإيدك ومترفعش: rebase بيفرده (بيشيل الـ merge commit). لو محتاجه: [[--rebase=merges]]. والفريق نصه merge ونصه rebase، فالتاريخ خليط. و [[git push --force]] بدل pull لما الـ push يترفض، ودي بتمسح شغل زميلك.`
          },
          teach: R`## الأول: pull = fetch وبعده «اجمع»

[[git pull]] بيعمل حاجتين ورا بعض: [[git fetch]] (نزّل الـ commits الجديدة من الـ remote) وبعدين يجمع شغلك مع اللي نزل. السؤال كله: يجمعهم إزاي؟

- [[merge]]: يعمل commit زيادة اسمه [[Merge branch 'main' of ...]] فيه الطرفين.
- [[rebase]]: يشيل commits بتاعتك اللي لسه مترفعتش، ويحط اللي نزل، ويعيد تطبيق بتوعك فوقه. والتاريخ يفضل خط واحد.

اتشغّل في Git Bash على ويندوز (Git 2.56) بنفس خطوات الـ solCode: remote تجريبي (bare repo على نفس الجهاز، مكان GitHub) وعليه clone اسمه [[a]] (زميلك) و clone اسمه [[b]] (انت). كل واحد عمل commit، و [[a]] رفع الأول.

---

## ١. [[git push]]

~~~text الناتج
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to '.../origin.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
~~~

- [[! [rejected]]]: الـ push اترفض.
- [[(fetch first)]]: الـ remote عليه commit ([[a: two]]) مش عندك، فلازم تنزّله الأول.

ده نفس سطر التعليق اللي في المثال. ومتعملش [[--force]] هنا أبدًا: هيمسح commit زميلك من الـ remote.

## ٢. [[git pull --rebase]]

~~~text الناتج
From .../origin
   979bc7d..8311dc4  main       -> origin/main
Successfully rebased and updated refs/heads/main.
~~~

- السطرين الأولانيين من الـ fetch: [[origin/main]] اتحرّك من [[979bc7d]] لـ [[8311dc4]] (commit زميلك).
- وانت مستني بيظهر لحظة [[Rebasing (1/1)]]، يعني بيعيد تطبيق commit بتاعك الأول من واحد، وبعدين السطر ده بيتكتب فوقه [[Successfully rebased]].

~~~bash
git log --graph --oneline
~~~

~~~text الناتج
* 730b34b b: add y
* 8311dc4 a: two
* 979bc7d one
~~~

خط واحد: commit زميلك، وفوقه بتاعك برقم **جديد** (كان رقم تاني قبل الـ rebase). ومفيش merge commit.

ولو فيه conflict، ده rebase عادي: صلّح، و [[git add]]، و [[git rebase --continue]]، أو [[git rebase --abort]] يرجّعك.

### نفس التجربة بـ [[git pull]] العادي

~~~text git log --graph --oneline
*   eba220c Merge branch 'main' of .../origin
|\
| * 93dfa9e a: two
* | 0f7f533 b: add y
|/
* 979e1fa one
~~~

الخط اتفرع ورجع اتجمّع، وفوقه merge commit مالوش معنى غير «اتنين اشتغلوا في نفس الوقت». تخيّل ده بعد كل pull لمدة شهر.

## ٣. [[git push]]

~~~text الناتج
   8311dc4..730b34b  main -> main
~~~

عدّى من غير force، لأن تاريخك دلوقتي فيه كل اللي على الـ remote وزيادة commit. والـ rebase هنا آمن لأنه غيّر رقم commit لسه محدش شافه.

---

## ٤. [[git config --global pull.rebase true]]

بيكتب في [[~/.gitconfig]] بتاعك إن [[git pull]] يعمل rebase دايمًا، فمتحتاجش تكتب [[--rebase]]. احنا مغيّرناش إعدادات الجهاز، فجرّبنا نفس الإعداد لأمر واحد بـ [[-c]] (اختصار config):

~~~bash
git -c pull.rebase=true pull
~~~

~~~text الناتج
Successfully rebased and updated refs/heads/main.
~~~

### ليه لازم تختار أصلًا؟

على Git for Windows، [[git pull]] العادي عمل merge من غير ما يسأل. السبب:

~~~bash
git config --show-origin pull.rebase
~~~

~~~text الناتج
file:C:/Program Files/Git/etc/gitconfig	false
~~~

[[--show-origin]] بيقولك الإعداد جاي منين: من ملف الإعدادات بتاع البرنامج نفسه (system)، لأن برنامج التثبيت بيسألك «pull يعمل إيه؟» وبيكتب الإجابة هنا. ولما شغّلنا نفس التجربة من غير الملف ده (زي لينكس والماك اللي مفيهمش الإعداد ده)، Git رفض:

~~~text الناتج
hint: You have divergent branches and need to specify how to reconcile them.
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
fatal: Need to specify how to reconcile divergent branches.
~~~

(قصّرنا الـ hint.) [[divergent]] يعني الطرفين اتفرّعوا: كل واحد عنده commit مش عند التاني. واللي بتكتبه في [[~/.gitconfig]] بيغلب ملف الـ system.

| القيمة | [[git pull]] بيعمل إيه لما الطرفين يتفرّعوا |
|---|---|
| [[pull.rebase false]] | merge commit |
| [[pull.rebase true]] | rebase |
| [[pull.ff only]] | يرفض، وانت تختار كل مرة |

## ٥. [[git config --global rebase.autoStash true]]

جرّبنا pull بـ rebase وفي ملف متعدّل ومش متحفظ:

~~~text الناتج
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
~~~

rebase محتاج ملفاتك نضيفة. ومع الإعداد ده (جرّبناه بـ [[git -c rebase.autoStash=true pull --rebase]]):

~~~text الناتج
Created autostash: b586c79
Applied autostash.
Successfully rebased and updated refs/heads/main.
~~~

[[Created autostash]]: عمل [[git stash]] لتعديلك لوحده. [[Applied autostash]]: رجّعه بعد الـ rebase. و [[git status -s]] بعدها لسه بيوري [[ M y]]: تعديلك زي ما هو.

## ٦. [[git pull]]

بعد الإعدادين دول، [[git pull]] من غير أي حاجة بقى يعمل rebase ويشيل تعديلاتك ويرجّعها.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git pull --rebase]] | نزّل، وحط commits بتاعتك فوق اللي نزل |
| [[git config --global pull.rebase true]] | خلّي ده الافتراضي |
| [[git config --global rebase.autoStash true]] | stash قبل الـ rebase ورجّعه بعده لوحده |

- الـ push اترفض بـ [[fetch first]]؟ pull (بـ rebase أو merge)، مش force.
- الأوامر نفسها في PowerShell و CMD والماك. والـ solCode فيه [[&&]] اللي بتشتغل في bash و zsh و CMD و PowerShell 7، بس مش في Windows PowerShell 5.1.`,
          lines: [
            "ارفع، وهيترفض لأن GitHub عليه commits مش عندك.",
            "نزّل اللي فاتك، وحط commits بتاعتك فوقه بدل merge commit.",
            "ارفع دلوقتي، وهيقبل.",
            "خلي pull يعمل rebase دايمًا من غير ما تكتب [[--rebase]].",
            "ولو عندك تعديلات مش محفوظة، اعمل لها stash قبل وارجّعها بعد لوحدك.",
            "من هنا ورايح: pull بقى rebase."
          ],
          sol: R`مع [[pull]] العادي (merge)، [[git log --graph --oneline]] بيرسم فرع ويرجع يتجمّع، وفوقهم [[Merge branch 'main' of ...]].

مع [[git pull --rebase]]: [[Successfully rebased and updated refs/heads/main]]، والـ graph خط واحد: commit زميلك، وفوقه commit بتاعك برقم جديد. و [[git push]] بعدها بيعدّي من غير force، لأن الـ branch بقت قدام GitHub مش متفرّعة عنه.

ولو عندك ملف متعدّل ومش محفوظ ومفيش autoStash: [[error: cannot pull with rebase: You have unstaged changes.]]. مع [[rebase.autoStash true]] بيطبع [[Applied autostash.]] والتعديل بيفضل زي ما هو.`,
          solCode: R`mkdir -p ~/lab/pr && cd ~/lab/pr
git init --bare -b main origin.git
git clone origin.git a && git clone origin.git b
cd a && echo 1 > x && git add x && git commit -m one && git push origin main && cd ..
cd b && git pull && echo y > y && git add y && git commit -m "b: add y" && cd ..
cd a && echo 2 >> x && git commit -am "a: two" && git push && cd ..
cd b
git push
git pull --rebase
git log --graph --oneline
git push`
        },
        {
          cmd: "تحديث PR قديم",
          title: "الـ PR بقاله أسبوعين و main اتقدمت",
          desc: R`GitHub بيقولك «This branch is out-of-date» أو «has conflicts». عندك طريقتين:

[[git merge origin/main]] جوه الـ branch: آمن، مفيش force push، والمراجع مش بيتلخبط. بس بيضيف merge commit.

[[git rebase origin/main]]: تاريخ نضيف، بس الـ commits بتتغير أرقامها فلازم [[--force-with-lease]]، وأي حد نزّل الـ branch دي هيتلخبط. لو الـ PR هيتعمله squash في الآخر، merge كفاية.`,
          example: R`git fetch origin
# الطريقة ١: merge (آمنة، من غير force)
git switch feature/login
git merge origin/main
git push
# الطريقة ٢: rebase (تاريخ نضيف، وبعده force)
git rebase origin/main
git push --force-with-lease`,
          try: "اعمل PR على repo التجربة، وبعدين اعمل commit على main يلمس نفس الملف، وحدّث الـ PR مرة بـ merge. وبعدين افتح PR تاني وحدّثه بـ rebase، وقارن صفحة الـ commits في الاتنين.",
          flag: "danger",
          deep: {
            why: "الـ PR مش هيتدمج وهو out-of-date أو فيه conflicts (لو الـ repo عامل قاعدة «Require branches to be up to date»). و الـ CI لازم يتشغّل على الكود مع آخر main، مش مع main من أسبوعين، عشان تتأكد إن الاتنين شغالين مع بعض.",
            how: R`[[git fetch origin]] الأول، والمقارنة بـ [[origin/main]] مش بـ main بتاعك (اللي ممكن يكون قديم). كده مش محتاج تروح main وتعمل pull وترجع.

merge: بيعمل commit واحد فيه تعديلات main، والـ commits بتاعتك زي ما هي بنفس أرقامها. تعليقات المراجعة على الـ commits بتفضل في مكانها، و push عادي. ولو الـ PR هيتعمله squash merge، الـ merge commit ده هيختفي في الآخر أصلًا.

rebase: كل commit بتاعك بيتعاد فوق آخر main، فالتاريخ خط مستقيم. بس GitHub عنده النسخة القديمة، و push عادي هيترفض. [[--force-with-lease]] بيرفع غصب بشرط إن origin لسه زي آخر مرة شفته، فلو زميلك رفع حاجة على الـ branch في النص، هيرفض بدل ما يمسحها.

وفي GitHub زرار «Update branch» على صفحة الـ PR بيعمل الـ merge ده من الموقع، وبعض الـ repos بتظهر معاه اختيار rebase. بعدها لازم [[git pull]] على جهازك قبل ما تكمّل.

قاعدة عملية: الـ branch بتاعتك لوحدك ومحدش راجعها لسه: rebase براحتك. حد تاني شغال عليها أو المراجعة شغالة: merge.`,
            when: "كل ما GitHub يقول out-of-date أو conflicts، وقبل ما تطلب مراجعة تانية. وكل ما تحدّث بدري، الـ conflicts تبقى أصغر.",
            mistakes: R`[[git rebase main]] بدل [[origin/main]] وانت عمرك ما عملت pull على main، فتعمل rebase على نسخة قديمة وتستغرب إن GitHub لسه بيقول out-of-date. و [[--force]] بدل [[--force-with-lease]]. و rebase على branch زميلك نزّلها، فيعمل pull ويلاقي نفس الـ commits مرتين بأرقام مختلفة. وفي الانترفيو: «merge ولا rebase؟» الإجابة الكويسة مش واحد منهم، هي القاعدة: rebase للي محدش شافه، و merge لأي حاجة متشاركة، ووضّح إن التمن في rebase هو force push.`
          },
          teach: R`## الأول: الـ PR هو الـ branch بتاعتك على GitHub

الـ PR مش حاجة منفصلة: هو صفحة بتعرض الفرق بين branch بتاعتك (هنا [[feature/login]]) و main. فـ «تحديث الـ PR» معناه إنك تجيب آخر main جوه الـ branch بتاعتك، وترفع الـ branch تاني. والدرس فيه طريقتين لنفس الهدف.

اتشغّل في Git Bash على ويندوز (Git 2.56) مع remote تجريبي (bare repo على نفس الجهاز) مكان GitHub، و clone اسمه [[team]] (زميلك) و clone اسمه [[me]] (انت). انت رفعت [[feature/login]] فيها commit [[add login]]، وبعدها زميلك رفع على main commit اسمه [[main: update app]]. صفحة الـ PR على GitHub نفسها متجرّبتش هنا، والكلام عنها من GitHub Docs.

---

## ١. [[git fetch origin]]

[[fetch]] بينزّل الـ commits الجديدة من [[origin]] (اسم الـ remote) **من غير ما يلمس ملفاتك ولا الـ branches بتاعتك**. هو بيحدّث بس النسخ اللي اسمها [[origin/...]]:

~~~text الناتج
From .../origin
   b6f3d8f..3be021a  main       -> origin/main
~~~

[[origin/main]] اتحرّك من [[b6f3d8f]] لـ [[3be021a]]. و [[main]] بتاعك على جهازك لسه قديم، وده ليه الدرس بيستخدم [[origin/main]] في كل حاجة بعد كده: هو آخر حاجة على GitHub، من غير ما تروح main وتعمل pull وترجع.

---

## الطريقة ١: merge

### ٢. [[git switch feature/login]]

~~~text الناتج
Already on 'feature/login'
Your branch is up to date with 'origin/feature/login'.
~~~

احنا كنا عليها أصلًا. [[up to date with 'origin/feature/login']] يعني اللي على جهازك هو نفس اللي على الـ PR.

### ٣. [[git merge origin/main]]

~~~text الناتج
Merge made by the 'ort' strategy.
 app.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

- [[Merge made]]: اتعمل merge commit.
- [['ort' strategy]]: اسم الطريقة اللي Git بيدمج بيها (الافتراضية في Git الجديد)، مش محتاج تعمل فيها حاجة.
- [[app.txt | 2 +-]]: الملف اللي جه من main، سطر اتشال وسطر اتضاف.

ممكن يفتح المحرر برسالة جاهزة، احفظ واقفل. ولو main لمست نفس سطورك هيطلع conflict عادي: صلّح، و [[git add]]، و [[git commit]].

### ٤. [[git push]]

~~~text الناتج
   8e15289..caa9551  feature/login -> feature/login
~~~

push عادي، من غير force:

~~~text git log --oneline --graph
*   caa9551 Merge remote-tracking branch 'origin/main' into feature/login
|\
| * 3be021a main: update app
* | 8e15289 add login
|/
* b6f3d8f init
~~~

[[add login]] بنفس رقمه القديم [[8e15289]]، وفوقه merge commit. ده اللي هيظهر في صفحة الـ PR كـ commit جديد، وتعليقات المراجعة على commits بتاعتك بتفضل في مكانها.

---

## الطريقة ٢: rebase

جهّزنا نفس الحالة من الأول.

### ٥. [[git rebase origin/main]]

~~~text الناتج
Successfully rebased and updated refs/heads/feature/login.
~~~

~~~text git log --oneline --graph
* 5c7f6f6 add login
* 4a9d1ce main: update app
* 2297cab init
~~~

خط مستقيم، ومفيش merge commit، بس [[add login]] بقى رقمه **جديد** ([[5c7f6f6]] بدل [[6c1cb48]]). فالـ remote عنده نسخة انت مبقتش عندك.

### push العادي بيترفض

~~~text git push
 ! [rejected]        feature/login -> feature/login (non-fast-forward)
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart.
~~~

[[non-fast-forward]]: الـ remote فيه commit ([[6c1cb48]]) مش في تاريخك، فـ Git مش هيكتب فوقه من غير ما تقول صراحة.

### ٦. [[git push --force-with-lease]]

~~~text الناتج
 + 6c1cb48...5c7f6f6 feature/login -> feature/login (forced update)
~~~

[[+]] و [[forced update]]: اتكتب فوق اللي على الـ remote. وصفحة الـ PR بتكتب سطر زي «force-pushed the feature/login branch from 6c1cb48 to 5c7f6f6».

### الـ lease بيحميك إزاي؟

[[--force-with-lease]] بيقول: «اكتب فوق الـ remote **بشرط** إنه لسه عند آخر رقم شفته في [[origin/feature/login]]». جرّبنا: بعد آخر fetch بتاعنا، زميلنا رفع commit اسمه [[teammate fix]] على نفس الـ branch، وبعدين احنا عملنا rebase و force-with-lease:

~~~text الناتج
 ! [rejected]        feature/login -> feature/login (stale info)
~~~

[[stale info]] يعني «معلوماتك قديمة»: الـ remote اتغير من ساعة ما شفته. لو كنا كتبنا [[--force]] كان [[teammate fix]] اتمسح من غير ما حد ياخد باله. الحل: [[git fetch]]، وبص على اللي نزل، وبعدين قرر.

---

## زرار «Update branch» على GitHub

من GitHub Docs: لو الـ repo مفعّل الخاصية دي، صفحة الـ PR بتعرض زرار «Update branch» لما الـ branch تبقى out-of-date. بيعمل نفس الطريقة ١ (merge) على السيرفر، وفي سهم جنبه ممكن يكون فيه «Update with rebase». بعدها الـ branch على GitHub بقت قدام اللي عندك، فاعمل [[git pull]] قبل ما تكمّل شغل.

---

## الخلاصة

| | merge | rebase |
|---|---|---|
| الأمر | [[git merge origin/main]] | [[git rebase origin/main]] |
| أرقام commits بتاعتك | زي ما هي | جديدة |
| merge commit | آه | لأ |
| الـ push | عادي | [[--force-with-lease]] |
| مناسب لـ | branch حد تاني شغال عليها أو المراجعة شغالة | branch لوحدك |

- دايمًا [[git fetch origin]] الأول، وقارن بـ [[origin/main]] مش [[main]].
- الأوامر نفسها في PowerShell و CMD والماك.`,
          lines: [
            "نزّل آخر حاجة من GitHub من غير ما تلمس ملفاتك.",
            "روح للـ branch بتاعة الـ PR.",
            "ادمج آخر main اللي على GitHub جواها.",
            "ارفع عادي، والـ PR يتحدّث.",
            "أو بدل الـ merge: حط commits بتاعتك فوق آخر main.",
            "ارفع غصب، بس لو محدش رفع حاجة على الـ branch في النص."
          ],
          sol: R`بعد الـ merge: صفحة الـ PR بتعرض commit جديد اسمه [[Merge remote-tracking branch 'origin/main' into feature/login]]، والـ commits القديمة بنفس أرقامها، وتعليقات المراجعة في مكانها، والتحذير out-of-date اختفى.

بعد الـ rebase: [[git push]] العادي بيترفض بـ [[! [rejected] ... (non-fast-forward)]]، و [[--force-with-lease]] بيعدّي. صفحة الـ PR بتقول «force-pushed the feature/login branch from a1b2c3d to e4f5a6b»، والـ commits بأرقام جديدة، ومفيش merge commit.

لو [[--force-with-lease]] رفض بـ [[stale info]]: حد رفع على الـ branch بعد آخر fetch. اعمل [[git fetch]] وبص على اللي نزل قبل ما تقرر.`
        },
        {
          cmd: "git rerere",
          title: "حل الـ conflict مرة واحدة بس",
          desc: R`rerere يعني reuse recorded resolution. لما تفعّله، Git بيسجّل كل conflict وحليته. ولو نفس الـ conflict رجع تاني (rebase بعد merge، أو rebase على main كل يوم لـ branch طويلة)، بيطبّق نفس الحل لوحده.

[[rerere.autoUpdate true]] بيعمل add للملف كمان، فانت بتراجع بس وتعمل [[--continue]].`,
          example: R`git config --global rerere.enabled true
git config --global rerere.autoUpdate true
git merge main
git add app.txt
git commit
git reset --hard HEAD~1
git rebase main
git diff --staged
git rebase --continue
git rerere forget app.txt`,
          try: "فعّل rerere، واعمل conflict وحلّه في merge، وبعدين الغي الـ merge واعمل rebase على نفس الحاجة، وشوف Git حلّه لوحده.",
          deep: {
            why: R`branch طويلة بتعمل عليها rebase على main كل يومين، ونفس الـ conflict بيرجع كل مرة لأن كل rebase بيعيد تطبيق نفس الـ commits. أو جرّبت merge عشان تشوف الـ conflicts، وقررت تعمل rebase بدله، فتحل كل حاجة من الأول.`,
            how: R`لما conflict يحصل و rerere مفعّل، Git بيحفظ شكل التعارض (preimage) في [[.git/rr-cache]]، ويطبع [[Recorded preimage]]. ولما تحلّه وتعمل commit، بيحفظ الحل ويطبع [[Recorded resolution]].

المرة الجاية اللي نفس التعارض بالظبط يظهر، بيطبع [[Resolved 'app.txt' using previous resolution]] ويكتب الحل في الملف. من غير autoUpdate الملف لسه unmerged في status لحد ما تعمل add. ومع autoUpdate بيطبع [[Staged 'app.txt' using previous resolution]].

الـ rebase أو الـ merge لسه بيوقف، مش بيكمّل لوحده. دي فرصتك تراجع بـ [[git diff --staged]] إن الحل القديم لسه صح.

ولو سجّلت حل غلط، [[git rerere forget file]] وانت في نص الـ conflict بيمسحه، وترجع تحل من جديد. والتسجيلات على جهازك بس، وبتتمسح لوحدها بعد فترة.`,
            when: "مفيش سبب ميبقاش مفعّل على جهازك. بيفرق جدًا في branches طويلة، و «اختبر merge وارجع».",
            mistakes: R`تعتمد عليه من غير ما تراجع: التعارض ممكن يبقى نفس الشكل، بس الكود حواليه اتغير والحل القديم مبقاش صح. و [[--continue]] على طول بعد «Staged using previous resolution» من غير تست. وتفتكره بيحل conflicts جديدة: هو بيكرر حل انت عملته قبل كده بس.`
          },
          teach: R`## الأول: rerere بيفتكر الحل

[[rerere]] اختصار **re**use **re**corded **re**solution، يعني «استخدم الحل اللي اتسجّل قبل كده». لما يكون مفعّل، كل conflict بتحلّه Git بيحفظ حاجتين: شكل التعارض، والشكل اللي انت حليته بيه. ولو نفس التعارض ظهر تاني، بيكتب الحل لوحده.

اتشغّل في Git Bash على ويندوز (Git 2.56) بنفس خطوات الـ solCode: [[app.txt]] فيه [[color = "blue"]]، و branch اسمها [[feature]] غيّرته لـ [[red]]، و main غيّرته لـ [[green]]. وبدل [[--global]] فعّلنا الإعدادين على الـ repo التجريبي بس ([[git config]] من غير [[--global]])، عشان منغيّرش إعدادات الجهاز.

---

## ١. [[git config --global rerere.enabled true]]

[[rerere.enabled]] بيشغّل التسجيل. والأمر مش بيطبع حاجة. تتأكد بـ:

~~~bash
git config rerere.enabled
~~~

~~~text الناتج
true
~~~

## ٢. [[git config --global rerere.autoUpdate true]]

من غيره، rerere بيكتب الحل في الملف بس، والملف بيفضل «فيه تعارض» لحد ما تعمل [[git add]]. معاه بيعمل الـ add كمان.

## ٣. [[git merge main]] (وانت على feature)

~~~text الناتج
Auto-merging app.txt
CONFLICT (content): Merge conflict in app.txt
Recorded preimage for 'app.txt'
Automatic merge failed; fix conflicts and then commit the result.
~~~

conflict عادي، بس فيه سطر جديد: [[Recorded preimage]]. الـ **preimage** (الصورة اللي قبل) هي شكل التعارض نفسه:

~~~text app.txt
<<<<<<< HEAD
color = "red"
=======
color = "green"
>>>>>>> main
~~~

## ٤. [[git add app.txt]]

حلّينا التعارض بلون تالت، [[teal]]، ومسحنا العلامات:

~~~bash
echo 'color = "teal"' > app.txt
git add app.txt
~~~

## ٥. [[git commit]]

~~~text الناتج
Recorded resolution for 'app.txt'.
[feature b6d12b1] merge main
~~~

[[Recorded resolution]]: الحل اتسجّل (اسمه **postimage**، الصورة اللي بعد). والتسجيل بيحصل وقت الـ commit، مش وقت الـ add. والاتنين متخزنين في فولدر جوه [[.git]]:

~~~bash
ls .git/rr-cache/*
~~~

~~~text الناتج
postimage
preimage
~~~

فولدر لكل تعارض، واسمه رقم طويل محسوب من شكل التعارض، وجواه الملفين.

## ٦. [[git reset --hard HEAD~1]]

غيّرنا رأينا وعايزين rebase بدل merge، فشلنا الـ merge commit:

~~~text الناتج
HEAD is now at acecc22 red
~~~

## ٧. [[git rebase main]]

نفس التعارض بالظبط هيرجع، لأن commit [[red]] هيتطبّق على [[green]]:

~~~text الناتج
CONFLICT (content): Merge conflict in app.txt
error: could not apply acecc22... red
hint: ...
Staged 'app.txt' using previous resolution.
Could not apply acecc22... # red
~~~

(قصّرنا سطور الـ hint.) السطر المهم: [[Staged 'app.txt' using previous resolution]]. rerere لقى نفس التعارض، فكتب الحل القديم **وعمل add** (بسبب autoUpdate). جرّبنا من غير autoUpdate: طبع [[Resolved 'app.txt' using previous resolution]]، والحل اتكتب في الملف، بس [[git status -s]] لسه بيقول [[UU app.txt]] لحد ما تعمل [[git add]] بنفسك.

~~~bash
cat app.txt
git status -s
~~~

~~~text الناتج
color = "teal"
M  app.txt
~~~

مفيش علامات، والملف متجهز ([[M]] في العمود الأول).

> لاحظ إن في الـ merge كان [[red]] فوق، وفي الـ rebase [[green]] هو اللي فوق (درس ours و theirs). rerere بيتعرّف على التعارض حتى لو الطرفين اتبدّلوا.

## ٨. [[git diff --staged]]

[[--staged]] يعني قارن منطقة التحضير بالـ HEAD، يعني «إيه اللي هيدخل في الـ commit؟»:

~~~text الناتج
@@ -1 +1 @@
-color = "green"
+color = "teal"
~~~

HEAD هنا main ([[green]])، والحل [[teal]]. ده وقتك تتأكد إن الحل القديم لسه صح مع الكود الجديد. **الـ rebase وقف ومكمّلش لوحده**، وده مقصود.

## ٩. [[git rebase --continue]]

~~~text الناتج
[detached HEAD 029194e] red
 1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/feature.
~~~

## ١٠. [[git rerere forget app.txt]]

لو الحل المسجّل غلط. بتكتبه **وانت في نص الـ conflict** (قبل [[--continue]]):

~~~text الناتج
Updated preimage for 'app.txt'
Forgot resolution for 'app.txt'
~~~

ده بيمسح الحل المتسجّل بس، والملف لسه فيه [[teal]] ومتجهز. عشان ترجّع العلامات وتحل من جديد:

~~~bash
git checkout -m app.txt
~~~

~~~text الناتج
Recreated 1 merge conflict
~~~

[[-m]] من merge: «رجّع الملف لشكل التعارض». وبعد ما تحل وتكمّل، الحل الجديد هو اللي هيتسجّل.

---

## الخلاصة

| السطر اللي هتشوفه | معناه |
|---|---|
| [[Recorded preimage]] | اتسجّل شكل تعارض جديد |
| [[Recorded resolution]] | اتسجّل الحل (مع الـ commit) |
| [[Resolved ... using previous resolution]] | الحل القديم اتكتب في الملف |
| [[Staged ... using previous resolution]] | واتعمله add كمان (autoUpdate) |

- rerere بيكرر حل انت عملته، مش بيحل تعارض جديد.
- دايمًا راجع بـ [[git diff --staged]] قبل [[--continue]].
- الأوامر نفسها في كل الشيلات. والـ solCode فيه [[sed -i]] و [[GIT_EDITOR=true]] بتوع bash: في PowerShell عدّل الملف من المحرر، واكتب [[git -c core.editor=true rebase --continue]].`,
          lines: [
            "فعّل تسجيل الحلول.",
            "ولما يطبّق حل قديم، يعمله add كمان.",
            "merge يعمل conflict، و rerere يسجّل شكله.",
            "بعد ما تحلّه: add.",
            "commit، و rerere يسجّل الحل.",
            "غيّرت رأيك: الغي الـ merge.",
            "rebase على نفس الحاجة: نفس الـ conflict، و rerere يحلّه لوحده.",
            "راجع الحل اللي اتطبّق.",
            "كمّل.",
            "ولو الحل المسجّل غلط: امسحه (وانت في نص الـ conflict)."
          ],
          sol: R`في الـ merge الأول: [[Recorded preimage for 'app.txt']]، وبعد الـ commit: [[Recorded resolution for 'app.txt']].

في الـ rebase: [[CONFLICT (content): Merge conflict in app.txt]] زي العادي، وبعده على طول [[Staged 'app.txt' using previous resolution.]] (أو [[Resolved ...]] من غير autoUpdate). [[cat app.txt]] بيوري نفس الحل اللي كتبته في الـ merge من غير علامات، و [[git status -s]] بيطلّع [[M  app.txt]] متجهز.

لو ظهرت العلامات عادي ومفيش سطر rerere: اتأكد بـ [[git config rerere.enabled]] إنه true في نفس الـ repo، وإنك عملت commit للحل في المرة الأولى (الحل بيتسجّل مع الـ commit).`,
          solCode: R`mkdir -p ~/lab/rr && cd ~/lab/rr && git init -b main
git config rerere.enabled true && git config rerere.autoUpdate true
echo 'color = "blue"' > app.txt && git add . && git commit -m init
git switch -c feature && sed -i 's/blue/red/' app.txt && git commit -am red
git switch main && sed -i 's/blue/green/' app.txt && git commit -am green
git switch feature
git merge main
echo 'color = "teal"' > app.txt && git add app.txt && git commit -m "merge main"
git reset --hard HEAD~1
git rebase main
cat app.txt && git status -s
GIT_EDITOR=true git rebase --continue`
        }
      ]
    }
]);
