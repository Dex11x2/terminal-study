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
          lines: ["اعمل اختصار lg لعرض التاريخ مرسوم.", "اختصار st لـ status المختصر.", "استخدم الاختصار."],
          sol: R`[[git config --global --get-regexp '^alias\.']] بيوري الاختصارات بتاعتك، زي [[alias.lg log --oneline --graph --all]] و [[alias.st status -s]]. و [[git st]] بيطلّع نفس ناتج [[git status -s]] بالظبط، و [[git lg]] نفس الـ graph.

اختار أمر بتكتبه كتير فعلًا (زي [[switch]] أو [[log --oneline -10]])، والاختصار يبقى قصير ومايتلخبطش مع أمر Git موجود.

الغلط الشائع: تكتب [[git config --global alias.lg "git log --oneline"]] بكلمة git جوه، فيطلع [[git: 'git' is not a git command]]. الـ alias بيتكتب من غير git. ولو عايز alias يشغّل أمر shell حطه بعلامة [[!]] في الأول.`
        }
      ]
    },
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
