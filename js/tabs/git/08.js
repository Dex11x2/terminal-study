// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "حالات حقيقية: فولدر وريبو بيتصرفوا بغرابة",
      l: 3,
      time: R`حوالي ساعتين ونص`,
      goal: [
        R`تحوّل فولدر نازل ZIP لريبو git متوصّل بالـ remote، **من غير ما تخسر ولا تعديل** عملته فيه.`,
        R`تعرف فولدر من غير تاريخ بيطابق أنهي commit، بمقارنة الفولدر بكل commit.`,
        R`تفهم ليه [[git status]] ممكن يقول [[M]] والـ diff فاضي، وتثبت السبب بالأرقام قبل ما تصلّح.`,
        R`تعمل نسخة تجربة من المشروع فيها الملفات المتتبّعة بس، بأسامي فيها مسافات وعربي، من غير ما تلمس الأصل.`,
        R`تمشي في أي مشكلة بنفس الترتيب: العَرَض، وفحوصات بترتيب، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية.`,
      ],
      use: {
        prog: R`كل حالة هنا حصلت فعلًا في شغل حقيقي (اتعادت في معمل بأسامي مخترعة). ونفس طريقة التفكير بتنفع مع أي أداة: متصلّحش قبل ما تثبت السبب.`,
        cs: R`git بيخزّن الملفات كـ blobs بهاش، والـ index فيه «كاش» لحجم ووقت كل ملف عشان ميقراش المشروع كله كل مرة. نص الحالات دي بتيجي من الكاش ده لما يبقى مش مطابق للديسك.`,
        work: R`«نزّلته ZIP واشتغلت عليه، ودلوقتي عايز آخر تحديثات» و «git بيقول الملف اتغيّر وأنا ملمستوش» من أكتر الأسئلة اللي بتيجي لأي حد بيعرف git في الفريق.`,
      },
      lab: R`mkdir -p ~/lab/gitcases && cd ~/lab/gitcases`,
      projects: [
        { lvl: 'صغير', t: R`سكربت «فولدري أنهي commit؟»`, what: R`[[which-commit.sh <clone> <folder>]]: بيلف على [[git rev-list]] ويطبع لكل commit عدد الملفات المختلفة، وفي الآخر سطر [[best: <hash>]] بأقل رقم. من درس «فولدر ZIP لريبو git».`, done: R`على معمل الدرس بيطبع [[best: 170fc98]] (أو الهاش اللي عندك لـ «server v2»)، ولو الفولدر مطابق لآخر commit بيطبعه هو.` },
        { lvl: 'صغير', t: R`[[snapshot.sh]]: نسخة تجربة بأمر واحد`, what: R`بياخد اسم فولدر، ويعمله لو مش موجود، وينسخ فيه الملفات المتتبّعة بس بـ [[git ls-files -z]]، ويرفض لو الفولدر جوه الريبو نفسه. من درس «انسخ الملفات المتتبّعة بس».`, done: R`[[find <copy> -type f | wc -l]] بيساوي [[git ls-files | wc -l]]، ومفيش [[.git]] ولا [[node_modules]] في النسخة، وتشغيله مرتين ميعملش نسخة جوه نسخة.` },
        { lvl: 'متوسط', t: R`كاشف الـ M الوهمي`, what: R`سكربت بيلف على الملفات اللي [[git status --porcelain -z]] بيقول عليها [[M]]، ويقسمها لتلات: «محتوى زي HEAD» (هاش واحد)، و «فرق نهايات سطور بس» ([[git diff --ignore-cr-at-eol --quiet]])، و «تعديل حقيقي». ومبيغيّرش حاجة إلا لو اديته [[--fix]]. من درس «M والـ diff فاضي».`, done: R`على المعمل بيطبع [[package.json: same as HEAD]] و [[config.env: real change]]، و [[--fix]] بيخلّي [[git status --short]] فيه [[config.env]] بس.` },
        { lvl: 'متوسط', t: R`جدول «إيه اللي اختلف» بين فولدرين`, what: R`سكربت بياخد فولدرين ويطبع جدول: ملف موجود هنا بس، وموجود هناك بس، ومختلف، ومختلف في نهايات السطور بس. استخدم [[diff -rq -x .git]] و [[cmp]] و [[tr -d '\r']]. من درس «فولدر ZIP لريبو git».`, done: R`على [[shop-api-main]] و [[fresh]] بيطلّع [[notes.txt]] «هنا بس» و [[routes/orders.js]] «هناك بس» وباقي الملفات في الخانة الصح، والتشغيل على نفس الفولدر مرتين بيطلّع «مفيش فرق».` },
        { lvl: 'كبير', t: R`[[adopt-zip.sh]]: حوّل أي فولدر ZIP لريبو بأمان`, what: R`أداة كاملة: بتاخد رابط الريبو والفولدر. (١) ترفض لو الفولدر فيه [[.git]] أصلًا. (٢) تعمل clone في فولدر مؤقت بـ [[mktemp -d]]. (٣) تلاقي أقرب commit. (٤) تعمل نسخة احتياطي من الفولدر قبل أي تغيير. (٥) تنقل [[.git]] و [[git reset]] على الـ commit ده. (٦) تصلّح الـ M الوهمي بس للملفات اللي الهاش بتاعها زي HEAD. (٧) تجرّب [[git merge --ff-only]] ولو فشل تقول ليه وتسيب كل حاجة زي ما هي. وكل خطوة بتتكتب في لوج، و [[--dry-run]] بيعرض الخطة من غير ما ينفّذ.`, done: R`على معمل الدرس: [[git status -sb]] في الآخر [[## main...origin/main]] ومفيش غير [[config.env]] و [[notes.txt]]، والاحتياطي موجود، وتشغيلها تاني بترفض بـ «already a git repo». ولو عدّلت [[README.md]] في الفولدر قبل التشغيل، بتقف عند الـ merge وتطبع اسم الملف ومبتخسرش التعديل.`, ext: R`خليها تشتغل من PowerShell كمان، أو تدعم branch غير main (من اسم فولدر الـ ZIP: [[shop-api-dev]] يبقى [[dev]])، أو تقترح [[git stash]] بدل ما تقف.` },
        { lvl: 'فكرة', t: R`دليل «مشاكل git الغريبة» بتاعك`, what: R`كل ما تقابل حاجة غريبة في git، اعملها في معمل بأسامي مخترعة واكتبها بنفس شكل الدروس دي: العَرَض بنص الرسالة، والفحوصات بالترتيب، والسبب، والحل، والبدايل اللي رفضتها وليه، وأمر التأكيد. انت اللي بتختار الشكل (ملف markdown، أو صفحة، أو repo).`, done: R`فيه ٣ حالات على الأقل، وكل واحدة فيها سكربت معمل بيعيد المشكلة من الصفر، وزميل قدر يمشي على واحدة منهم لوحده ويوصل لنفس الحل.`, ext: R`حوّل كل حالة لاختبار: سكربت المعمل + سكربت الحل + سطر [[test]] بيتأكد إن المشكلة اتحلّت، وشغّلهم في GitHub Actions.` },
      ],
      n: R`حالات حصلت فعلًا واتعادت في معمل بأسامي مخترعة: فولدر نازل ZIP عايز يبقى ريبو من غير ما يخسر تعديل، وملف git بيقول إنه اتغيّر وهو مااتغيّرش، ونسخة تجربة فيها ملفات الريبو بس. كل حالة: العَرَض، والفحوصات بالترتيب، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية`,
      items: [
        {
          cmd: "فولدر ZIP لريبو git",
          title: "نزّلت المشروع ZIP واشتغلت عليه: إزاي يبقى ريبو من غير ما تخسر حاجة؟",
          learn: R`تربط فولدر من غير تاريخ بالـ remote، وتعرف هو أنهي commit، وتحدّثه لآخر نسخة وتعديلاتك سليمة.`,
          out: R`[[git status -sb]] بيقول [[## main...origin/main]] وتعديلاتك بس هي اللي ظاهرة.`,
          desc: R`لما تنزّل مشروع من GitHub بزرار «Download ZIP» بتاخد الملفات بس، من غير فولدر [[.git]] (يعني من غير تاريخ ولا remote). فلو اشتغلت عليه وبعدين عايز آخر تحديثات، [[git pull]] هيقولك [[fatal: not a git repository]]. والحل: تجيب التاريخ من clone جديد، وتعرف فولدرك بيطابق أنهي commit، وتركّب التاريخ عليه **من غير ما يتلمس ولا ملف**، وبعدين تحدّث.

الخطوات بالترتيب:
1. [[git clone]] في فولدر مؤقت جنب فولدرك (أو [[gh repo clone]]).
2. قارن فولدرك بكل commit بـ [[git --git-dir=fresh/.git --work-tree=<فولدرك> diff --shortstat <commit>]]: أقل فرق = نسختك.
3. انقل [[.git]] لفولدرك، و [[git reset <commit>]] من غير [[--hard]]: بيحرّك الـ HEAD والـ index بس، والملفات مبتتلمسش.
4. [[git merge --ff-only origin/main]]: هات اللي نزل بعد كده.

وأخطر غلطة هنا [[git reset --hard]]: بيرجّع كل الملفات لنسخة الـ commit، فتعديلاتك بتتمسح من غير سؤال. هنشوفها بعينينا في المعمل.`,
          example: R`# ١) نسخة نضيفة في فولدر مؤقت جنب فولدرك
git clone https://github.com/ali/shop-api.git fresh
# ٢) فولدرك بيطابق أنهي commit؟ أقل فرق هو نسختك
for c in $(git -C fresh rev-list main); do echo "$(git -C fresh log -1 --format='%h %s' $c) => $(git --git-dir=fresh/.git --work-tree=shop-api-main diff --shortstat $c)"; done
# ٣) انقل التاريخ لفولدرك، وقف على الـ commit ده من غير ما تلمس ملف
mv fresh/.git shop-api-main/
rm -rf fresh
cd shop-api-main
git reset 170fc98
git status --short
# ٤) هات اللي نزل بعد نسختك
git merge --ff-only origin/main
git status -sb`,
          lines: [
            R`[[git clone]] بينزّل الريبو كله بتاريخه في فولدر اسمه [[fresh]]. ده فولدر مؤقت هناخد منه [[.git]] بس. ولو الريبو private ومعاك [[gh]]: [[gh repo clone ali/shop-api fresh]] نفس الحاجة.`,
            R`[[git -C fresh rev-list main]] بيطبع هاش كل commit على main من الأحدث للأقدم. ولكل واحد بنقارنه بفولدرك: [[--git-dir]] بيقول لـ git «التاريخ هنا»، و [[--work-tree]] بيقول «والملفات هنا»، و [[diff --shortstat $c]] بيقارن الـ commit ده بالملفات ويطبع سطر واحد بالعدد.`,
            R`بنقل فولدر التاريخ ([[.git]]) جوه فولدرك. من اللحظة دي فولدرك بقى ريبو.`,
            R`[[fresh]] فاضل فيه نسخة ملفات مالهاش لازمة (التاريخ اتنقل)، فبنمسحه.`,
            R`ندخل فولدرنا عشان باقي الأوامر تشتغل عليه.`,
            R`[[git reset <commit>]] من غير [[--hard]] (اسمه mixed): بيخلّي main والـ index يشاوروا على الـ commit اللي فولدرك بيطابقه، **والملفات على الديسك مبتتغيرش**.`,
            R`دلوقتي [[git status]] بيوري تعديلاتك انت بس: اللي غيّرته من ساعة ما نزّلت الـ ZIP.`,
            R`[[--ff-only]]: قدّم main لآخر commit في [[origin/main]] لو ده ممكن من غير merge commit، وإلا ارفض ومتغيّرش حاجة.`,
            R`[[-sb]] (short + branch): سطر أول فيه [[## main...origin/main]]، ولو مفيش [[behind]] ولا [[ahead]] يبقى انت على آخر نسخة.`,
          ],
          try: R`ابني المعمل اللي في الشرح (السكربت تحت «المعمل») في [[~/lab/gitcases]]، وامشي على الخطوات بالترتيب. قبل خطوة ٣ اكتب: هتقف على أنهي commit وليه؟ وبعد خطوة ٤ اتأكد إن [[config.env]] لسه فيه [[PORT=8080]].`,
          teach: R`## العَرَض

عندك فولدر [[shop-api-main]] نزل من GitHub بزرار «Download ZIP» من أسبوعين، وعدّلت فيه ([[config.env]] بقى [[PORT=8080]]، وعملت [[notes.txt]]). ودلوقتي الفريق رفع تحديثات وعايزها:

~~~text git pull
fatal: not a git repository (or any of the parent directories): .git
~~~

نقرا الرسالة: git بيدوّر على فولدر [[.git]] في الفولدر الحالي، ولو ملقاش بيطلع للي فوقه، لحد أول الديسك. ملقاش خالص، فالفولدر ده «مش ريبو». والـ ZIP اللي GitHub بيعمله هو بالظبط ناتج [[git archive]]: صورة الملفات في commit واحد، من غير [[.git]].

---

## المعمل: نعيد الحالة بأسامي مخترعة

اتجرّب على Git Bash في ويندوز (Git 2.56) وعلى [[ubuntu:24.04]] في Docker (Git 2.43). الـ [[origin]] هنا ريبو bare على الجهاز بدل GitHub، والسلوك هو هو:

~~~bash
mkdir -p ~/lab/gitcases && cd ~/lab/gitcases
git init -q --bare -b main origin/shop-api.git          # ده «GitHub»
git clone -q origin/shop-api.git team && cd team        # زميلك
printf 'PORT=3000\nDB_HOST=localhost\n' > config.env
printf 'console.log("shop-api v1");\n' > server.js
printf '# shop-api\n' > README.md
printf '{\n  "name": "shop-api",\n  "version": "1.0.0"\n}\n' > package.json
git add . && git commit -qm "first version"
printf 'console.log("shop-api v2");\n' > server.js && git commit -qam "server v2"
git tag zip-day                                         # يوم ما نزّلت الـ ZIP
printf '# shop-api\nRun: node server.js\n' > README.md && git commit -qam "README: how to run"
mkdir routes && printf 'module.exports = [];\n' > routes/orders.js && git add . && git commit -qm "orders route"
printf 'console.log("shop-api v3");\n' > server.js && git commit -qam "server v3"
git push -q origin main && cd ..
git -C team archive --format=zip --prefix=shop-api-main/ zip-day > shop.zip && unzip -q shop.zip
printf 'PORT=8080\nDB_HOST=localhost\n' > shop-api-main/config.env     # تعديلك
printf 'my notes\n' > shop-api-main/notes.txt                         # ملف جديد بتاعك
~~~

- [[git init --bare]]: ريبو من غير ملفات شغل، بس تاريخ. ده شكل الريبو اللي على GitHub من جوه.
- [[git archive --format=zip --prefix=shop-api-main/ zip-day]]: بيعمل ZIP لملفات الـ commit اللي عليه tag [[zip-day]]، وكل ملف جوه فولدر [[shop-api-main/]]. ده نفس اللي GitHub بيعمله لما تدوس «Download ZIP».

الهاشات عندك هتختلف (الهاش فيه الوقت واسمك)، فاقرا الهاشات من الناتج بتاعك.

---

## ٠. قبل أي حاجة: مين أنا، وأنهي ريبو؟

اسم الفولدر بيقول نص الحكاية: [[shop-api-main]] = ريبو [[shop-api]] من branch [[main]] (GitHub بيسمّي الـ ZIP كده). ولو الريبو private لازم تعرف حسابك ليه صلاحية عليه. بـ [[gh]] (من الوثائق الرسمية لـ GitHub CLI، الأوامر دي محتاجة حساب فمش في المعمل):

~~~bash
gh api user --jq .login          # انت داخل بأنهي حساب
gh repo list ali --limit 50      # ريبوهات الحساب ده
~~~

[[gh api user]] بيكلّم GitHub API ويرجّع JSON عن حسابك، و [[--jq .login]] بيطلّع منه حقل [[login]] بس (اسم المستخدم). و [[gh repo list]] بيطبع اسم كل ريبو ووصفه و public/private.

---

## ١. نسخة نضيفة في فولدر مؤقت

~~~bash
git clone -q origin/shop-api.git fresh
git -C fresh log --format='%h %ad %s' --date=short
~~~

~~~text الناتج
d421a66 2026-10-19 server v3
c10a4ea 2026-10-18 orders route
64b8703 2026-10-13 README: how to run
170fc98 2026-10-04 server v2
bda0211 2026-10-04 first version
~~~

ليه فولدر **جنب** فولدرك ومش جواه؟ عشان أي حاجة تحصل هنا متلمسش ملفاتك. و [[-C fresh]] معناها «اشتغل كأنك واقف جوه [[fresh]]» من غير [[cd]].

---

## ٢. إيه اللي مختلف؟ وأول فخ: [[git diff --no-index]]

[[git diff --no-index A B]] بيقارن أي فولدرين حتى لو مش ريبو. جرّبناه:

~~~text git diff --no-index --stat shop-api-main fresh (آخر السطور)
 /dev/null => fresh/.git/refs/remotes/origin/HEAD   |   1 +
 {shop-api-main => fresh}/README.md                 |   1 +
 {shop-api-main => fresh}/config.env                |   2 +-
 shop-api-main/notes.txt => /dev/null               |   1 -
 /dev/null => fresh/routes/orders.js                |   1 +
 {shop-api-main => fresh}/server.js                 |   2 +-
 48 files changed, 946 insertions(+), 3 deletions(-)
~~~

[[48 files]]؟ عندنا ٥ ملفات! بص فوق: [[fresh/.git/...]]. الـ [[--no-index]] مبيعرفش إن [[.git]] حاجة خاصة، فقارن كل ملفات التاريخ كمان. والبديل اللي بيتجاهله ([[diff]] بتاع GNU، موجود في Git Bash ولينكس):

~~~bash
diff -rq -x .git shop-api-main fresh
~~~

~~~text الناتج
Files shop-api-main/README.md and fresh/README.md differ
Files shop-api-main/config.env and fresh/config.env differ
Only in shop-api-main: notes.txt
Only in fresh: routes
Files shop-api-main/server.js and fresh/server.js differ
~~~

[[-r]] جوه الفولدرات، و [[-q]] قول «مختلف» من غير التفاصيل، و [[-x .git]] استبعد أي حاجة اسمها [[.git]]. بس ده بيقارن بـ**آخر** نسخة. ٣ ملفات مختلفة: مين فيهم انت غيّرته، ومين الفريق غيّره بعد ما نزّلت؟ مش باين. محتاجين نقارن بكل commit.

---

## ٣. فولدرك بيطابق أنهي commit؟

~~~bash
for c in $(git -C fresh rev-list main); do
  echo "$(git -C fresh log -1 --format='%h %s' $c) => $(git --git-dir=fresh/.git --work-tree=shop-api-main diff --shortstat $c)"
done
~~~

نفكّه من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[git -C fresh rev-list main]] | هاش كل commit على main، سطر لكل واحد، الأحدث الأول. ده أمر plumbing ناتجه ثابت للسكربتات |
| [[for c in $(...); do ... done]] | لف على الهاشات، وفي كل لفة الهاش في [[$c]] |
| [[git -C fresh log -1 --format='%h %s' $c]] | الهاش المختصر ورسالة الـ commit ده بس ([[-1]] = واحد) |
| [[--git-dir=fresh/.git]] | التاريخ والـ objects من هنا |
| [[--work-tree=shop-api-main]] | والملفات اللي هنقارن بيها من هنا: فولدرك |
| [[diff --shortstat $c]] | قارن الـ commit ده بالملفات، واطبع سطر ملخص واحد |

~~~text الناتج
d421a66 server v3 =>  4 files changed, 2 insertions(+), 4 deletions(-)
c10a4ea orders route =>  3 files changed, 1 insertion(+), 3 deletions(-)
64b8703 README: how to run =>  2 files changed, 1 insertion(+), 2 deletions(-)
170fc98 server v2 =>  1 file changed, 1 insertion(+), 1 deletion(-)
bda0211 first version =>  2 files changed, 2 insertions(+), 2 deletions(-)
~~~

### إزاي عرفنا إنه [[170fc98]]؟

اقرا الرقم: كل ما تبعد عن نسختك الفرق بيكبر في الاتجاهين. [[170fc98]] فيه **ملف واحد** مختلف، وده [[config.env]] اللي انت عدّلته (سطر اتشال وسطر اتحط: [[PORT]]). ومطابق للـ tag [[zip-day]]. و [[notes.txt]] مش محسوب لأن [[diff]] بيقارن الملفات اللي git يعرفها بس، والملفات الجديدة (untracked) هتظهر بعدين في [[git status]].

ولو لقيت commit فرقه **صفر**، يبقى فولدرك نسخة منه بالظبط ومعملتش فيه أي تعديل.

> الأوامر اللي بتطبع على stderr (زي تحذير [[LF will be replaced by CRLF]] على ويندوز) مش بتأثر على الناتج. لو زحمت الشاشة ضيف [[2>/dev/null]] للـ [[diff]].

---

## ٤. ركّب التاريخ: [[mv]] وبعدين [[git reset <commit>]]

~~~bash
test -d shop-api-main/.git && echo "already a repo, stop"
mv fresh/.git shop-api-main/
rm -rf fresh
cd shop-api-main
git reset 170fc98
git status --short
~~~

~~~text الناتج
Unstaged changes after reset:
M	config.env
 M config.env
 M package.json
?? notes.txt
~~~

- [[test -d ... && echo]]: لو فولدرك فيه [[.git]] أصلًا اقف، متكتبش فوقه.
- [[git reset 170fc98]] من غير [[--hard]] بيعمل حاجتين بس: main بقى بيشاور على [[170fc98]]، والـ index بقى نسخة منه. **ولا ملف على الديسك اتغيّر.**
- [[ M config.env]] تعديلك، و [[?? notes.txt]] ملفك الجديد. ده بالظبط اللي عملته.
- و [[ M package.json]]؟ انت ملمستوش. ده M وهمي على ويندوز بس، وليه درس لوحده: «M والـ diff فاضي». على Ubuntu مظهرش خالص.

### ليه منعملش [[git status]] على طول بعد [[mv]]؟

جرّبناها: [[.git]] اللي جاي من الـ clone واقف على آخر commit، فـ git بيقارن ملفاتك القديمة بآخر نسخة:

~~~text git status (بعد mv ومن غير reset)
On branch main
Your branch is up to date with 'origin/main'.
 M README.md
 M config.env
 M package.json
 D routes/orders.js
 M server.js
?? notes.txt
~~~

[[up to date]] وكأن كل حاجة تمام! بس لو عملت [[git commit -a]] هنا هتعمل commit بيرجّع [[server.js]] لـ v2 ويمسح [[routes/orders.js]]: يعني بتلغي شغل الفريق من غير ما تحس. عشان كده لازم الـ reset على الـ commit الصح الأول.

---

## ٥. هات الجديد: [[git merge --ff-only origin/main]]

~~~text git merge --ff-only origin/main
Updating 170fc98..d421a66
Fast-forward
 README.md        | 1 +
 routes/orders.js | 1 +
 server.js        | 2 +-
 3 files changed, 3 insertions(+), 1 deletion(-)
 create mode 100644 routes/orders.js
~~~

~~~text git status -sb
## main...origin/main
 M config.env
?? notes.txt
~~~

- [[Updating 170fc98..d421a66]]: من نسختك لآخر نسخة. احفظ الرقمين دول: [[git log 170fc98..HEAD]] بيوريك اللي نزل (درس «git log»).
- [[Fast-forward]]: main اتقدّم لقدام بس، من غير merge commit.
- و [[config.env]] لسه [[PORT=8080]]: الـ merge مالمسوش لأن ولا commit جديد غيّره.

### ولو الفريق غيّر ملف انت كمان غيّرته؟

عدّلنا [[README.md]] في الفولدر وجرّبنا:

~~~text الناتج
error: Your local changes to the following files would be overwritten by merge:
	README.md
Please commit your changes or stash them before you merge.
Aborting
~~~

ده git بيحميك: رفض ومغيّرش ولا حاجة. الحل: [[git stash]] وبعدين [[git merge --ff-only origin/main]] وبعدين [[git stash pop]]، أو [[git commit]] لتعديلاتك الأول. ولو التعديلين في نفس السطور هيطلع conflict عادي ([[CONFLICT (content): Merge conflict in README.md]])، ويتحل زي درس «الـ conflicts»، و [[git stash pop]] بيسيب الـ stash موجود ([[The stash entry is kept]]) لحد ما تخلّص.

---

## ٦. الطرق اللي اترفضت، وليه (كلها اتجرّبت في المعمل)

| الطريقة | اللي حصل فعلًا | الحكم |
|---|---|---|
| [[mv]] وبعدين [[git reset --hard origin/main]] | [[HEAD is now at d421a66 server v3]]، و [[config.env]] رجع [[PORT=3000]]. تعديلك راح، و [[notes.txt]] بس اللي فضل لأنه untracked | ❌ بيمسح شغلك من غير سؤال |
| انسخ ملفاتك فوق الـ clone ([[cp -r shop-api-main/. fresh/]]) | [[git status]] في [[fresh]]: [[M README.md]] و [[M server.js]]، و [[git diff server.js]] بيقول [[-v3]] و [[+v2]] | ❌ بيرجّع شغل الفريق لورا بهدوء |
| [[mv]] و [[git commit -a]] على طول | commit بيلغي ٣ commits بتوع الفريق ويمسح [[routes/orders.js]] | ❌ نفس المشكلة بس اتسجلت في التاريخ |
| [[git init]] جديد و [[git push --force]] | التاريخ اللي على GitHub يتمسح ويتحط مكانه commit واحد | ❌ أسوأ واحدة: بتأذي الفريق كله |
| clone جديد وتنقل تعديلاتك بإيدك | بيشتغل، بس لازم تفتكر كل ملف عدّلته، وسهل تنسى واحد | ⚠️ ينفع لو عدّلت ملف أو اتنين |
| [[git reset <commit>]] (mixed) و [[--ff-only]] | تعديلاتك بس هي اللي ظاهرة، والجديد نزل | ✅ |

---

## ٧. اتأكد إنها اتحلّت

~~~bash
git status -sb                    # أول سطر: ## main...origin/main من غير behind
git log --oneline -1              # نفس آخر commit على GitHub
git diff --stat                   # الملفات اللي انت عدّلتها بس
git remote -v                     # origin رايح للريبو الصح
~~~

---

## ٨. متتكررش

- لما تحتاج مشروع هتشتغل عليه: [[git clone]] مش ZIP. ولو المساحة مشكلة: [[git clone --depth 1]] بينزّل آخر commit بس، وتقدر تجيب الباقي بعدين بـ [[git fetch --unshallow]].
- لو لازم ZIP (مثلًا من جهاز مفيهوش git): نزّله من صفحة commit معين، الاسم بيبقى [[shop-api-<hash>]]، فتعرف هو أنهي commit من غير مقارنة.

---

## على PowerShell

نفس أوامر git، بس اللوب والنقل بشكل PowerShell (اتجرّب في 7.6 و 5.1 على نفس المعمل، ونفس الأرقام):

~~~powershell
foreach ($c in git -C fresh rev-list main) {
  "$($c.Substring(0,7)) => $(git --git-dir=fresh/.git --work-tree=shop-api-main diff --shortstat $c 2>$null)"
}
Move-Item fresh\.git shop-api-main\
Remove-Item -Recurse -Force fresh
~~~

وخد بالك: لو حطيت [[| Select-Object -Last 3]] بعد قفلة الـ [[foreach]] هيطلعلك [[An empty pipe element is not allowed]]. ده فخ ليه شرح في تاب PowerShell (درس «foreach / for / while»).

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| تاريخ نضيف | [[git clone ... fresh]] | جنب فولدرك، مش جواه |
| أنهي commit | لوب [[--git-dir]] و [[--work-tree]] و [[diff --shortstat]] | أقل فرق = نسختك |
| ركّب | [[mv fresh/.git]] و [[git reset <commit>]] | mixed: الملفات متتلمسش |
| حدّث | [[git merge --ff-only origin/main]] | بيرفض بدل ما يخلط |
| اتأكد | [[git status -sb]] | [[## main...origin/main]] |

> [[reset --hard]] عمره ما يكون أول خطوة في فولدر فيه شغل مش متسجّل.`,
          deep: {
            why: R`الـ ZIP بيديك الملفات من غير تاريخ، والتاريخ هو اللي بيخلّي git يعرف إيه اللي انت غيّرته وإيه اللي الفريق غيّره. من غيره أي «تحديث» هو تخمين، وأغلب التخمينات بتمسح حاجة: يا شغلك ([[reset --hard]]) يا شغل الفريق (نسخ فوق الـ clone).`,
            how: R`git بيفصل تلات حاجات: الـ objects (التاريخ في [[.git]])، والـ index (اللقطة الجاية)، والـ working tree (الملفات). [[--git-dir]] و [[--work-tree]] بيخلّوك تركّب أي تاريخ على أي فولدر ملفات. و [[git reset]] ليه ٣ درجات: [[--soft]] بيحرّك الـ HEAD بس، و [[--mixed]] (الافتراضي) الـ HEAD والـ index، و [[--hard]] التلاتة ومنهم ملفاتك. إحنا محتاجين الـ HEAD والـ index يقفوا على نسختك، والملفات زي ما هي، فـ mixed بالظبط.`,
            when: R`أي فولدر مشروع مفيهوش [[.git]] وفيه شغل: ZIP من GitHub، أو نسخة اتبعتت على فلاشة، أو فولدر اتنسخ من سيرفر. ونفس اللوب ينفع تعرف بيه سيرفر شغّال على أنهي commit لو حد رفع الملفات بإيده.`,
            mistakes: R`[[reset --hard]] كأول خطوة. و [[git status]] بعد [[mv]] على طول وتصدّق [[up to date]]. و [[git diff --no-index]] على فولدر فيه [[.git]] فتغرق في ملفات التاريخ. وتعمل الـ clone **جوه** فولدرك فيبقى ريبو جوه ريبو. وتنسى إن الملفات الجديدة (untracked) مش بتظهر في [[diff]]، فتفتكر مفيش تعديلات وهي موجودة في [[git status]].`
          },
          sol: R`الـ commit اللي فرقه [[1 file changed]] (عندنا [[170fc98 server v2]]) هو نسختك، والملف الواحد ده [[config.env]] اللي عدّلته.

بعد [[git reset 170fc98]]: [[git status --short]] فيه [[ M config.env]] و [[?? notes.txt]] (وعلى ويندوز [[ M package.json]] كمان، وده الـ M الوهمي اللي ليه درس لوحده).

بعد [[git merge --ff-only origin/main]]: [[Fast-forward]]، و [[git status -sb]] أول سطر [[## main...origin/main]]، و [[cat config.env]] لسه [[PORT=8080]]، و [[ls routes]] فيه [[orders.js]] اللي نزل جديد.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: [[git reset --soft]] و [[git reset]] و [[git reset --hard]]، كل واحد بيغيّر أنهي من التلاتة (HEAD، والـ index، والملفات)؟ وأنهي فيهم ينفع في الحالة دي وليه؟ وبعدين اتأكد من [[git reset -h]].`, done: R`كتبت جدول ٣×٣ صح ([[--soft]] HEAD بس، والعادي HEAD والـ index، و [[--hard]] التلاتة)، واخترت العادي لأنه الوحيد اللي بيوقّف الـ index على نسختك من غير ما يلمس الملفات.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، لو عملت [[mv]] و [[git reset c10a4ea]] (commit «orders route») بدل [[170fc98]]، [[git status --short]] هيطلّع إيه؟ اكتب توقعك سطر سطر، وبعدين ابني المعمل تاني وجرّب.`, done: R`توقعت إن [[README.md]] هيظهر [[M]] و [[routes/orders.js]] [[D]] (لأن الـ commit ده فيه حاجات فولدرك مفيهاش) جنب [[config.env]]، و [[server.js]] **مش** هيظهر (لسه v2 في الـ commit ده)، وعلى ويندوز [[package.json]] الوهمي، والناتج طابق، وتقدر تقول ليه الـ commit ده غلط من غير ما تبص على اللوب.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت البايظ ده: بيعمل clone **جوه** الفولدر، وبيعمل [[reset --hard]]: [[cd shop-api-main && git clone ../origin/shop-api.git . 2>/dev/null; git init && git remote add origin ../origin/shop-api.git && git fetch && git reset --hard origin/main]]. اكتب نسخة آمنة بنفس فكرة الدرس.`, done: R`النسخة بتاعتك بتعمل الـ clone في فولدر جنب الفولدر، وبتلاقي الـ commit باللوب، وبتعمل reset من غير [[--hard]]. وعلى معمل جديد [[cat config.env]] في الآخر بيطبع [[PORT=8080]]، والسكربت القديم بيطبع [[PORT=3000]].` },
            { lvl: 'تطبيق', t: R`حالة «الفريق عدّل نفس الملف»: في المعمل، قبل خطوة ٥ عدّل [[README.md]] في فولدرك. شغّل [[git merge --ff-only origin/main]] واقرا الرسالة، وبعدين وصّل لآخر نسخة **وتعديلك موجود** بـ [[git stash]].`, done: R`شفت [[would be overwritten by merge]] بنص الرسالة، وبعد [[stash]] و [[merge]] و [[stash pop]] حليت الـ conflict في [[README.md]] وفيه السطرين، و [[git stash list]] فاضي بعد ما عملت [[git stash drop]].` },
            { lvl: 'تحدي', t: R`ابني [[which-commit.sh <clone> <folder>]]: بيطبع لكل commit عدد الملفات المختلفة (من [[--shortstat]] أو [[--name-only | wc -l]])، وفي الآخر [[best: <hash> (<n> files)]] بأقل رقم. ولو فيه commit فرقه صفر يطبع [[exact match]].`, done: R`على المعمل بيطبع [[best: 170fc98 (1 files)]] (بالهاش بتاعك)، ولو رجّعت [[config.env]] لـ [[PORT=3000]] بيطبع [[exact match]] على نفس الـ commit.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه [[git status]] بعد [[mv]] على طول قال [[Your branch is up to date]] مع إن الفولدر قديم ٣ commits؟ وإيه اللي كان هيحصل لو عمل [[git commit -a && git push]]؟`, done: R`الشرح فيه: [[.git]] جاي من clone واقف على آخر commit، فـ «up to date» بتقارن الـ branch بالـ remote مش الملفات بالـ branch؛ والملفات القديمة ظاهرة كتعديلات بترجّع الكود لورا؛ والـ push كان هيعمل commit بيلغي شغل الفريق ويمسح [[routes/orders.js]].` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q --bare -b main origin.git
git clone -q origin.git team 2>/dev/null && cd team
printf 'PORT=3000\n' > config.env && printf 'v1\n' > server.js
git add . && git commit -qm "first version"
printf 'v2\n' > server.js && git commit -qam "server v2" && git tag zip-day
printf 'v3\n' > server.js && git commit -qam "server v3"
git push -q origin main && cd ..
mkdir shop && git -C team archive zip-day | tar -x -C shop
printf 'PORT=8080\n' > shop/config.env
git clone -q origin.git fresh
for c in $(git -C fresh rev-list main); do echo "$(git -C fresh log -1 --format='%s' $c) => $(git --git-dir=fresh/.git --work-tree=shop diff --shortstat $c 2>/dev/null)"; done
mv fresh/.git shop/ && rm -rf fresh && cd shop
git reset -q "$(git log --format=%h -1 --grep='server v2')"
git merge -q --ff-only origin/main
git status -sb
cat config.env server.js`, expect: [R`server v2 =>  1 file changed`, R`## main...origin/main`, R`PORT=8080`, R`v3`] },
          ],
        },
        {
          cmd: "M والـ diff فاضي",
          title: "git status بيقول M على ملف، و git diff مش بيطلّع ولا سطر",
          learn: R`تثبت إن ملف «متغيّر» هو هو زي HEAD بالهاش، وتعرف السبب من حجم الملف في الـ index، وتصلّحه من غير ما تخسر تعديل حقيقي.`,
          out: R`[[git status]] فيه تعديلاتك الحقيقية بس.`,
          desc: R`أحيانًا [[git status]] يقولك [[M package.json]] وانت ملمستوش، و [[git diff package.json]] ميطلّعش حاجة خالص. ده مش ملف اتغيّر: ده الـ index (اللي فيه «كاش» لحجم ووقت كل ملف) مش مطابق للديسك. أشهر سبب على ويندوز: [[core.autocrlf=true]] (الافتراضي في Git for Windows) والملفات على الديسك LF، والـ index متسجّل فيه حجم نسخة CRLF.

التشخيص بالترتيب، من الأرخص للأدق:
1. [[git diff --stat]] و [[git diff --ignore-cr-at-eol --stat]]: الملف مش ظاهر في الاتنين؟ يبقى المحتوى مااتغيّرش حتى في نهايات السطور.
2. [[git hash-object <ملف>]] قصاد [[git rev-parse HEAD:<ملف>]]: نفس الهاش = نفس المحتوى بالظبط زي ما git هيخزّنه.
3. [[git ls-files --eol <ملف>]]: نهايات السطور في الـ index وعلى الديسك.
4. [[git ls-files --debug <ملف>]] و [[wc -c <ملف>]]: الحجم المتسجّل قصاد الحجم الحقيقي. هنا السبب.

والحل الآمن: [[git checkout -- <ملف>]] (أو [[git add <ملف>]]) **بس للملفات اللي الهاش بتاعها زي HEAD**، عشان ميتمسحش تعديل حقيقي.`,
          example: R`git status --short
git diff --stat
git diff --ignore-cr-at-eol --stat
git hash-object package.json
git rev-parse HEAD:package.json
git ls-files --eol package.json
git ls-files --debug package.json
wc -c package.json
git checkout -- package.json
git status --short`,
          lines: [
            R`الملخص: [[ M]] (مسافة وبعدها M) يعني الملف على الديسك مختلف عن الـ index.`,
            R`الفرق بالأرقام لكل ملف. لو الملف مش هنا وهو في [[status]]، يبقى فيه حاجة غريبة.`,
            R`نفس الكلام بس متعدّش فرق [[\r]] في آخر السطر. لو الملف ظهر هنا ومظهرش فوق، أو العكس، تعرف هل الفرق في نهايات السطور بس.`,
            R`[[hash-object]] بيحسب الهاش اللي git كان هيديه للملف ده لو عملته add (بعد تحويل نهايات السطور حسب الإعدادات).`,
            R`[[HEAD:package.json]] معناها «الملف ده جوه آخر commit»، و [[rev-parse]] بيطبع الهاش بتاعه. لو الرقمين زي بعض، المحتوى واحد.`,
            R`[[--eol]] بيوري نهايات السطور: [[i/]] جوه الـ index و [[w/]] على الديسك و [[attr/]] قواعد [[.gitattributes]].`,
            R`[[--debug]] بيطبع اللي git متسجّل للملف في الـ index، ومنه [[size]]: الحجم بالبايت وقت آخر مرة git كتبه أو بصّ عليه.`,
            R`[[wc -c]] بيعدّ بايتات الملف الحقيقي على الديسك. قارنه بالـ [[size]] اللي فوق.`,
            R`[[git checkout -- <ملف>]] بيكتب الملف من الـ index من جديد ويسجّل حجمه ووقته الصح. آمن هنا بس عشان اتأكدنا إن الهاش واحد.`,
            R`اتأكد: الملف اختفى من القايمة، والتعديلات الحقيقية لسه موجودة.`,
          ],
          try: R`ابني معمل درس «فولدر ZIP لريبو git» على Git Bash في ويندوز، وبعد [[git reset]] هتلاقي [[package.json]] ظاهر [[M]]. امشي على الفحوصات الأربعة بالترتيب واكتب ناتج كل واحد قبل ما تصلّح. وبعدين جرّب نفس المعمل في Ubuntu: هل الملف ظهر؟`,
          teach: R`## العَرَض

بعد ما ركّبنا [[.git]] على فولدر ZIP (درس «فولدر ZIP لريبو git») و [[git reset 170fc98]]:

~~~text git status --short
 M config.env
 M package.json
?? notes.txt
~~~

[[config.env]] انت عدّلته. بس [[package.json]] محدش لمسه من أول commit. نسأل git: إيه اللي اتغيّر؟

~~~text git diff --stat
 config.env | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

~~~text git diff package.json
(ولا سطر)
~~~

[[status]] بيقول متغيّر، و [[diff]] بيقول مفيش فرق. واحد منهم غلط؟ لأ، الاتنين بيسألوا سؤال مختلف. يلا نضيّقها.

اتجرّب على Git Bash في ويندوز (Git 2.56). على [[ubuntu:24.04]] (Git 2.43) [[package.json]] **مظهرش خالص**، وده نفسه دليل هنستخدمه تحت.

---

## الترتيب: من الأرخص للأدق

كل فحص بيستبعد سبب، وبنبدأ بالأسهل اللي مبيغيّرش حاجة:

| # | السؤال | الأمر |
|---|---|---|
| ١ | فيه فرق في المحتوى؟ ولو في نهايات السطور بس؟ | [[git diff --stat]] و [[--ignore-cr-at-eol]] |
| ٢ | المحتوى زي اللي في HEAD بالبايت؟ | [[git hash-object]] قصاد [[git rev-parse HEAD:]] |
| ٣ | نهايات السطور فين LF وفين CRLF؟ | [[git ls-files --eol]] |
| ٤ | git متسجّل إيه عن الملف في الـ index؟ | [[git ls-files --debug]] و [[wc -c]] |

---

## ١. [[git diff --ignore-cr-at-eol --stat]]

~~~text الناتج
 config.env | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

[[--ignore-cr-at-eol]] بيقول لـ diff: «لو الفرق الوحيد في سطر إن آخره [[\r]]، اعتبرهم زي بعض». لو كان الملف ظهر في [[git diff --stat]] واختفى هنا، كان الفرق نهايات سطور بس. بس هو مش ظاهر في الاتنين: المحتوى مااتغيّرش خالص.

## ٢. الهاش: [[git hash-object]] قصاد [[git rev-parse HEAD:]]

~~~bash
git hash-object package.json
git rev-parse HEAD:package.json
~~~

~~~text الناتج
11a9f98804c679ef28a3a627d046d622bd037def
11a9f98804c679ef28a3a627d046d622bd037def
~~~

- [[git hash-object package.json]]: «لو عملت add للملف ده دلوقتي، هيبقى blob بالهاش ده». بيطبّق نفس تحويل نهايات السطور اللي [[add]] بيطبّقه. ولو عايز هاش البايتات الخام من غير تحويل: [[--no-filters]].
- [[HEAD:package.json]]: صيغة معناها «الملف ده جوه commit [[HEAD]]»، و [[rev-parse]] بيحوّل أي اسم لهاش.

نفس الـ ٤٠ حرف = نفس المحتوى بالظبط. الملف **مااتغيّرش**. فـ [[M]] جاية من مكان تاني.

## ٣. [[git ls-files --eol]]

~~~text git ls-files --eol package.json config.env
i/lf    w/lf    attr/                 	config.env
i/lf    w/lf    attr/                 	package.json
~~~

[[i/lf]] جوه الـ index LF، و [[w/lf]] على الديسك LF (ملفات الـ ZIP جاية LF زي ما هي متخزنة)، و [[attr/]] فاضي: مفيش [[.gitattributes]]. يعني مفيش اختلاف نهايات سطور. لسه مفيش سبب.

## ٤. الـ index متسجّل فيه إيه؟ [[git ls-files --debug]]

~~~text git ls-files --debug package.json
package.json
  ctime: 1793692140:40186000
  mtime: 1793692140:40186000
  dev: 0	ino: 0
  uid: 0	gid: 0
  size: 51	flags: 0
~~~

~~~text wc -c package.json
47 package.json
~~~

**ده السبب.** الـ index متسجّل فيه إن الملف ٥١ بايت، والملف على الديسك ٤٧.

### الـ ٥١ جت منين؟

[[package.json]] ٤ سطور. نسخة LF = ٤٧ بايت. نسخة CRLF = ٤٧ + ٤ (حرف [[\r]] زيادة في آخر كل سطر) = **٥١**. يعني الـ index متسجّل فيه حجم نسخة CRLF.

~~~text git config --show-origin core.autocrlf
file:C:/Program Files/Git/etc/gitconfig	true
~~~

Git for Windows بييجي بـ [[core.autocrlf=true]]: وانت بتعمل clone بيكتب الملفات على الديسك CRLF، ويسجّل حجمها (٥١) في الـ index. وإحنا أخدنا [[.git]] من الـ clone ده (ومعاه الـ index)، وحطيناه على ملفات الـ ZIP اللي LF (٤٧).

وليه [[package.json]] بس ومش [[server.js]]؟ [[git reset 170fc98]] بيعمل entry جديد في الـ index للملفات اللي مختلفة بين [[HEAD]] القديم والـ commit الجديد (من غير حجم متسجّل، فـ git بيقرا المحتوى ويقارن). أما الملفات اللي **هي هي** في الاتنين، زي [[package.json]] اللي مااتغيّرش من أول commit، فالـ entry القديم بحجمه القديم بيفضل.

### وليه [[status]] و [[diff]] مختلفين؟

- [[git status]]: لما الحجم المتسجّل (ومش صفر) مختلف عن حجم الملف، بيعتبره متغيّر **من غير ما يقرا المحتوى** (ده أسرع بكتير في مشروع فيه آلاف الملفات).
- [[git diff]]: بيقرا المحتوى فعلًا ويقارن، فلقى إنه هو هو ومطبعش حاجة. (إعداد [[diff.autoRefreshIndex]] بيخلّي diff يتجاهل الفرق اللي في الـ stat بس.)

وعلى Ubuntu؟ الـ clone هناك بيكتب LF (مفيش autocrlf)، فالحجم المتسجّل ٤٧ زي الملف، ومفيش M وهمي:

~~~text ubuntu:24.04: git ls-files --debug package.json | grep size ; wc -c package.json
  size: 47	flags: 0
47 package.json
~~~

---

## الحل، والبدايل اللي اترفضت

اتجرّبوا كلهم على نفس المعمل:

| الطريقة | اللي حصل | الحكم |
|---|---|---|
| [[git update-index -q --refresh]] | [[package.json]] لسه [[M]]: الـ refresh بيستخدم نفس فحص الحجم | ❌ |
| [[git -c core.autocrlf=false status]] | لسه [[M]]: الحجم المتسجّل هو هو | ❌ |
| [[git reset --hard]] | [[package.json]] اتصلّح، و [[config.env]] رجع [[PORT=3000]] | ❌ مسح تعديلك |
| [[git add package.json]] | اختفى من [[status]]، والملف فضل [[w/lf]]. الـ blob هو هو فمفيش حاجة staged فعلًا | ✅ لو اتأكدت من الهاش |
| [[git checkout -- package.json]] | اختفى، والملف اتكتب تاني [[w/crlf]] و ٥١ بايت | ✅ لو اتأكدت من الهاش |

الاتنين الصح خطرين لو الملف فيه تعديل حقيقي: [[checkout]] هيمسحه، و [[add]] هيعمله stage. عشان كده بيتعملوا **بعد** فحص الهاش، ولكل ملف لوحده:

~~~bash
for f in $(git status --short | awk '$1=="M"{print $2}'); do
  if [ "$(git hash-object "$f")" = "$(git rev-parse HEAD:"$f")" ]; then
    echo "same content: $f"; git checkout -- "$f"
  else
    echo "real change, keep: $f"
  fi
done
git status --short
~~~

~~~text الناتج
real change, keep: config.env
same content: package.json
 M config.env
?? notes.txt
~~~

- [[git status --short | awk '$1=="M"{print $2}']]: [[awk]] بيقسم كل سطر لكلمات، ولو أول كلمة [[M]] يطبع التانية (اسم الملف).
- [[if [ "$(...)" = "$(...)" ]; then]]: لو الهاشين زي بعض. و [[" "]] حوالين [[$f]] عشان الأسامي اللي فيها مسافات.
- ⚠️ اللوب ده بيقسم على المسافات، فملف اسمه [[my file.js]] هيتقسم اتنين. في سكربت حقيقي استخدم [[git status --porcelain -z]] (مشروع «كاشف الـ M الوهمي»).

---

## اتأكد

~~~bash
git status --short                              # تعديلاتك الحقيقية بس
git ls-files --debug package.json | grep size   # الحجم المتسجّل
wc -c package.json                              # = الحجم الحقيقي
~~~

## متتكررش

- [[.gitattributes]] فيه [[* text=auto eol=lf]] (درس «.gitattributes»): الـ clone بيكتب LF على كل الأنظمة، فالحجم في الـ index بيطابق ملفات الـ ZIP. جرّبناها: نفس المعمل بالسطر ده، و [[package.json]] مظهرش.
- متركّبش [[.git]] من clone على فولدر ملفاته جاية من مكان تاني إلا لو هتمشي على الفحوصات دي.

---

## الخلاصة

| الفحص | لو طلع كده | يبقى |
|---|---|---|
| [[git diff --stat]] فاضي للملف | المحتوى (بعد التحويل) مااتغيّرش | M وهمي غالبًا |
| ظاهر في [[diff]] ومختفي في [[--ignore-cr-at-eol]] | الفرق [[\r]] بس | نهايات سطور، شوف [[.gitattributes]] |
| [[hash-object]] = [[rev-parse HEAD:]] | نفس المحتوى بالبايت | آمن تعمل [[checkout --]] أو [[add]] |
| [[size]] في [[--debug]] ≠ [[wc -c]] | الـ index متسجّل فيه حجم قديم | ده سبب الـ M |

> متصلّحش «ملف متغيّر» قبل ما تعرف هو متغيّر فعلًا ولا لأ. الهاش هو الحكم.`,
          deep: {
            why: R`عشان git يبقى سريع في مشروع فيه عشرات الآلاف من الملفات، مبيقراش كل ملف مع كل [[status]]. بيسجّل في الـ index حجم كل ملف ووقت تعديله، ولو الاتنين زي ما هما يعتبر الملف مااتغيّرش. والكاش ده ممكن يبقى غلط في الاتجاهين، وده اللي بيعمل M وهمي.`,
            how: R`لكل ملف في الـ index: الهاش (اللي بيحدد المحتوى)، والـ stat (الحجم ووقت التعديل). [[status]] بيقارن الـ stat الأول: لو الحجم مختلف ومش صفر بيقول «اتغيّر» على طول. لو الوقت بس مختلف بيقرا المحتوى ويقارن بالهاش. و [[diff]] بيقرا المحتوى دايمًا قبل ما يطبع، فلو مفيش فرق ميطبعش حاجة. و [[core.autocrlf=true]] بيخلّي الملف على الديسك CRLF وجوه git LF، فنفس المحتوى ليه حجمين.`,
            when: R`بعد ما تنقل [[.git]] من مكان لمكان، أو تفك ZIP فوق ريبو، أو تفتح نفس الريبو من ويندوز و WSL، أو بعد ما أداة غيّرت نهايات السطور (محرر أو formatter)، أو لما فريق فيه ويندوز ولينكس ومفيش [[.gitattributes]].`,
            mistakes: R`تعمل [[git reset --hard]] عشان «تنضّف» فتمسح تعديلات حقيقية جنب الوهمية. أو [[git add .]] على كل الملفات من غير فحص فتعمل stage لتعديلات مش قاصدها. أو تغيّر [[core.autocrlf]] global وتفتكر إنه حل: مش بيغيّر الحجم المتسجّل، وبيغيّر سلوك كل ريبوهاتك. أو تقارن [[git hash-object --no-filters]] بـ HEAD على ملف CRLF فتلاقيهم مختلفين وتفتكر فيه تعديل: [[--no-filters]] بيحسب البايتات الخام قبل التحويل.`
          },
          sol: R`الفحوصات بالترتيب على Git Bash:
[[git diff --stat]] و [[--ignore-cr-at-eol]]: [[config.env]] بس، و [[package.json]] مش موجود.
[[git hash-object package.json]] و [[git rev-parse HEAD:package.json]]: نفس الهاش.
[[git ls-files --eol]]: [[i/lf    w/lf]].
[[git ls-files --debug]]: [[size: 51]]، و [[wc -c]]: [[47]]. الـ ٤ بايت فرق = ٤ حروف [[\r]] لأربع سطور.

بعد [[git checkout -- package.json]]: [[git status --short]] فيه [[ M config.env]] و [[?? notes.txt]] بس، و [[wc -c package.json]] بقى [[51]] (اتكتب CRLF).

على Ubuntu [[package.json]] مظهرش أصلًا: [[size: 47]] زي الملف.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: ملف فيه ١٠ سطور، حجمه LF ٢٠٠ بايت. لو اتكتب CRLF هيبقى كام؟ ولو [[git ls-files --debug]] قال [[size: 210]] و [[wc -c]] قال [[200]]، تتوقع [[git status]] يقول إيه؟`, done: R`كتبت ٢١٠ (سطر = [[\r]] زيادة)، وتوقعت [[M]] رغم إن المحتوى واحد، وتقدر تقول ليه [[git diff]] مش هيطبع حاجة.` },
            { lvl: 'سريع', t: R`دوّر بنفسك: من [[git diff -h]] أو [[git help diff]] لاقي الفرق بين [[--ignore-cr-at-eol]] و [[--ignore-space-at-eol]] و [[-w]]. وأنهي فيهم ممكن يخبّي تعديل حقيقي؟`, done: R`كتبت سطر لكل خيار بمثال، وعرفت إن [[-w]] بيتجاهل كل المسافات فممكن يخبّي تعديل في Python أو YAML المسافات فيه ليها معنى.` },
            { lvl: 'تطبيق', t: R`في المعمل، جرّب البدايل الخمسة اللي في جدول الدرس واحدة واحدة (كل مرة على معمل جديد)، وسجّل لكل واحدة: [[package.json]] لسه [[M]]؟ و [[config.env]] لسه فيه [[PORT=8080]]؟`, done: R`جدولك مطابق لجدول الدرس: [[update-index --refresh]] و [[-c core.autocrlf=false]] مصلّحوش، و [[reset --hard]] مسح [[PORT=8080]]، و [[add]] و [[checkout --]] صلّحوا من غير ما يلمسوا [[config.env]].` },
            { lvl: 'تطبيق', t: R`صلّح اللوب البايظ ده: [[for f in $(git status --short | cut -c4-); do git checkout -- $f; done]]. فيه مشكلتين: بيمسح تعديلات حقيقية، وبيقع مع اسم فيه مسافة. اعمل في المعمل ملف متتبّع اسمه [[my notes.md]] وعدّله، وتأكد إن نسختك مبتلمسهوش.`, done: R`نسختك بتفحص الهاش قبل [[checkout]]، وبتقرا الأسامي صح (بـ [[git status --porcelain -z]] و [[while IFS= read -r -d '']])، وبعد ما تشغّلها [[my notes.md]] و [[config.env]] لسه متعدّلين و [[package.json]] اختفى.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: سكربت [[test-phantom.sh]] بيبني المعمل من الصفر، ويتأكد إن الـ M الوهمي ظهر (على ويندوز)، ويشغّل الحل، ويتأكد إن [[git status --porcelain]] فيه [[config.env]] و [[notes.txt]] بس، ويطبع [[PASS]] أو [[FAIL]] برقم خروج ٠ أو ١. وعشان يشتغل على Ubuntu كمان: اعمل الـ clone بـ [[git clone -c core.autocrlf=true]].`, done: R`بيطبع [[PASS]] ورقم الخروج [[0]] على Git Bash وعلى [[ubuntu:24.04]] في Docker، ولو شلت خطوة الحل بيطبع [[FAIL]] و [[1]].` },
            { lvl: 'تحدي', t: R`قارن وقيس: الوقاية بـ [[.gitattributes]]. ابني المعمل مرتين: مرة عادي، ومرة الفريق عامل commit لـ [[.gitattributes]] فيه [[* text=auto eol=lf]] في أول commit. قارن [[git ls-files --eol]] في الـ clone، وعدد ملفات الـ M الوهمي في الحالتين.`, done: R`من غير الملف: [[w/crlf]] في الـ clone و [[package.json]] ظاهر [[M]]. بالملف: [[w/lf]] و [[attr/text=auto eol=lf]]، و [[git status --short]] فيه [[config.env]] و [[notes.txt]] بس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q --bare -b main origin.git
git clone -q origin.git team 2>/dev/null && cd team && git config core.autocrlf false
printf '{\n  "name": "shop-api",\n  "version": "1.0.0"\n}\n' > package.json
printf 'PORT=3000\n' > config.env && printf 'v1\n' > server.js
git add . && git commit -qm "first version"
printf 'v2\n' > server.js && git commit -qam "server v2" && git tag zip-day
printf 'v3\n' > server.js && git commit -qam "server v3"
git push -q origin main && cd ..
mkdir shop && git -C team archive zip-day | tar -x -C shop
printf 'PORT=8080\n' > shop/config.env
git clone -q -c core.autocrlf=true origin.git fresh
mv fresh/.git shop/ && rm -rf fresh && cd shop
git reset -q "$(git log --format=%h -1 --grep='server v2')" 2>/dev/null
git status --short 2>/dev/null
git ls-files --debug package.json | grep size
wc -c < package.json
[ "$(git hash-object package.json)" = "$(git rev-parse HEAD:package.json)" ] && echo SAME-HASH && git checkout -- package.json
echo "after:"; git status --short 2>/dev/null`, expect: [R` M package.json`, R`size: 51`, R`SAME-HASH`, R`after:
 M config.env`] },
          ],
        },
        {
          cmd: "انسخ الملفات المتتبّعة بس",
          title: "نسخة تجربة من المشروع فيها ملفات الريبو بس: git ls-files -z و cp --parents",
          learn: R`تعمل نسخة من المشروع من غير [[.git]] و [[node_modules]] و [[.env]]، بنفس شكل الفولدرات، وتعدّل فيها براحتك.`,
          out: R`فولدر تجربة فيه بالظبط اللي git متابعه، والأصل [[git status]] بتاعه نضيف.`,
          desc: R`عايز تجرّب إعداد مختلف (بورت تاني، أو قاعدة بيانات تانية) من غير ما تلمس المشروع الأصلي، ومن غير ما تنسخ [[node_modules]] (آلاف الملفات) ولا [[.git]] ولا [[.env]] اللي فيه أسرار. git عارف بالظبط أنهي ملفات تبع المشروع: [[git ls-files]].

[[git ls-files -z | xargs -0 cp --parents -t ../scratch]]:
• [[git ls-files]]: الملفات المتتبّعة (اللي في الـ index)، مسار لكل واحد من أول الريبو.
• [[-z]] و [[-0]]: افصل الأسامي بحرف NUL بدل سطر جديد، عشان الأسامي اللي فيها مسافات أو عربي توصل سليمة.
• [[cp --parents]]: انسخ الملف **بمساره**، فـ [[src/server.js]] يروح [[../scratch/src/server.js]] مش [[../scratch/server.js]].
• [[-t ../scratch]]: الفولدر الهدف الأول، فـ [[xargs]] يحط كل الملفات في أمر [[cp]] واحد (أسرع بكتير من ملف ملف).

وبعدين [[sed -i 's/^PORT=3000$/PORT=4000/' ../scratch/config.env]] يعدّل النسخة بس. [[cp --parents]] في GNU (لينكس و Git Bash). على الماك مش موجود، والبديل [[git archive HEAD | tar -x -C ../scratch]].`,
          example: R`mkdir -p ../scratch
git ls-files -z | xargs -0 cp --parents -t ../scratch
find ../scratch -type f | sort
sed -i 's/^PORT=3000$/PORT=4000/' ../scratch/config.env
grep PORT config.env ../scratch/config.env
git status --short`,
          lines: [
            R`اعمل فولدر التجربة **بره** الريبو ([[..]] = الفولدر اللي فوق). لو عملته جوه، git هيشوفه ملفات جديدة، والمرة الجاية هتنسخ النسخة جوه النسخة.`,
            R`[[git ls-files -z]] بيطبع الملفات المتتبّعة مفصولة بـ NUL، و [[xargs -0]] بيقراهم بنفس الفاصل ويحطهم كلهم في آخر أمر [[cp --parents -t ../scratch]]. النتيجة: نفس شجرة الفولدرات جوه [[../scratch]].`,
            R`اتأكد: كل ملف اتنسخ، ومفيش [[.env]] ولا [[node_modules]].`,
            R`[[sed -i]] بيعدّل الملف في مكانه. [[^PORT=3000$]] معناها سطر كامل بالظبط كده ([[^]] أول السطر و [[$]] آخره)، فمش هيلمس [[PORT=30001]] مثلًا.`,
            R`قارن الملفين: الأصل لسه 3000 والنسخة 4000.`,
            R`[[git status]] في الأصل فاضي: ملمسناش ولا ملف في الريبو.`,
          ],
          try: R`في أي ريبو عندك فيه [[node_modules]] أو [[.env]]، اعمل نسخة تجربة بالأمر، وقارن [[find ../scratch -type f | wc -l]] بـ [[git ls-files | wc -l]]. وبعدين غيّر إعداد في النسخة وشغّلها، والأصل شغّال جنبها.`,
          teach: R`## الموقف

عندك [[shop-api]] شغّال على [[PORT=3000]]، وعايز تجرّب نسخة تانية على 4000 جنبه، أو تجرّب سكربت ممكن يبوّظ ملفات. تنسخ الفولدر كله؟ هتاخد [[node_modules]] (ممكن ٢٠٠ ميجا)، و [[.git]] (فالنسخة تبقى ريبو تاني ممكن تعمل منه push بالغلط)، و [[.env]] بأسرارك. اللي محتاجه: **الملفات اللي git متابعها، بنفس شكل الفولدرات**.

---

## المعمل

اتجرّب على Git Bash في ويندوز (coreutils 8.32) وعلى [[ubuntu:24.04]]:

~~~bash
mkdir -p ~/lab/gitcases && cd ~/lab/gitcases
git init -q -b main shop-api && cd shop-api
mkdir -p src docs node_modules/express
printf 'PORT=3000\n' > config.env
printf 'console.log(1)\n' > src/server.js
printf 'guide\n' > "docs/user guide.md"          # اسم فيه مسافة
printf 'عربي\n' > "docs/ملاحظات.md"              # اسم عربي
printf 'node_modules/\n.env\n' > .gitignore
printf 'SECRET=abc\n' > .env                      # سر، متجاهَل
printf 'x\n' > node_modules/express/index.js      # مكتبة، متجاهلة
git add . && git commit -qm init
~~~

---

## ١. git متابع إيه؟ [[git ls-files]]

~~~text git ls-files
.gitignore
config.env
docs/user guide.md
"docs/\331\205\331\204\330\247\330\255\330\270\330\247\330\252.md"
src/server.js
~~~

- مفيش [[.env]] ولا [[node_modules]]: دول في [[.gitignore]]، و git مش متابعهم.
- كل مسار من أول الريبو، بـ [[/]] حتى على ويندوز.
- والاسم العربي؟ اتكتب أرقام بين [[" "]]! دي البايتات بتاعة UTF-8 مكتوبة octal ([[\331\205]] = حرف م). git بيعمل كده افتراضيًا (إعداد [[core.quotePath]]) عشان الترمنال القديم ميتلخبطش. [[git -c core.quotePath=false ls-files]] بيطبعه عربي عادي.

## ٢. الفخ: الطريقة اللي «شكلها صح»

~~~bash
git ls-files | xargs cp --parents -t ../try1/
~~~

~~~text الناتج
cp: cannot stat 'docs/user': No such file or directory
cp: cannot stat 'guide.md': No such file or directory
cp: cannot stat 'docs/\331\205\331\204\330\247\330\255\330\270\330\247\330\252.md': No such file or directory
~~~

مشكلتين، والاتنين اتطبعوا بنصهم في Git Bash و Ubuntu:

- [[xargs]] بيقسم على المسافات، فـ [[docs/user guide.md]] بقى ملفين: [[docs/user]] و [[guide.md]].
- الاسم العربي وصل لـ [[cp]] بالأرقام والـ [[" "]]، ومفيش ملف بالاسم ده.

ورقم الخروج [[123]]: ده [[xargs]] بيقول «أمر من اللي شغّلتهم فشل».

## ٣. الصح: [[-z]] و [[-0]]

~~~bash
mkdir -p ../scratch
git ls-files -z | xargs -0 cp --parents -t ../scratch
find ../scratch -type f | sort
~~~

~~~text الناتج
../scratch/.gitignore
../scratch/config.env
../scratch/docs/user guide.md
../scratch/docs/ملاحظات.md
../scratch/src/server.js
~~~

| الحتة | معناها |
|---|---|
| [[git ls-files -z]] | افصل الأسامي بحرف NUL (البايت صفر) بدل سطر جديد، **ومن غير تشفير** الأسامي العربي |
| [[\|]] | ابعت الناتج للأمر اللي بعده |
| [[xargs -0]] | اقرا الأسامي مفصولة بـ NUL. الحرف ده مستحيل يبقى جوه اسم ملف، فمفيش اسم هيتقسم |
| [[cp --parents]] | انسخ كل ملف بالمسار بتاعه: [[docs/user guide.md]] يتعمل جوه [[../scratch/docs/]] |
| [[-t ../scratch]] | target: الفولدر الهدف، مكتوب قبل الملفات، فـ [[xargs]] يحط كل الأسامي في آخر الأمر |

٥ ملفات = عدد [[git ls-files]] بالظبط. ومفيش [[.git]] ولا [[.env]] ولا [[node_modules]]:

~~~text ls -A ../scratch
.gitignore
config.env
docs
src
~~~

### ليه [[-t]] ومش [[-I{}]]؟

الشكل التاني اللي هتلاقيه كتير: [[xargs -0 -I{} cp --parents "{}" ../scratch/]]. بيشتغل، بس [[-I{}]] بيشغّل [[cp]] **مرة لكل ملف**. قسناه على ريبو فيه ١٠٠٠ ملف:

| | Git Bash على ويندوز | ubuntu:24.04 |
|---|---|---|
| [[-I{}]] (cp لكل ملف) | ١٩.٤ ثانية | ١.٥ ثانية |
| [[-t]] (cp واحد للكل) | ١.٤ ثانية | ٠.٠٨ ثانية |

على ويندوز تشغيل برنامج جديد غالي، فالفرق ١٤ مرة. و [[xargs]] بيقسم لوحده لو الأسامي أكتر من اللي سطر أوامر واحد يشيله، فـ [[-t]] آمن مع أي عدد.

---

## ٤. عدّل النسخة بس: [[sed -i]]

~~~bash
sed -i 's/^PORT=3000$/PORT=4000/' ../scratch/config.env
grep PORT config.env ../scratch/config.env
git status --short
~~~

~~~text الناتج
config.env:PORT=3000
../scratch/config.env:PORT=4000
~~~

و [[git status --short]] مطبعش حاجة: الأصل نضيف.

- [[sed -i]]: عدّل الملف في مكانه (in-place). [[s/قديم/جديد/]] استبدال.
- [[^PORT=3000$]]: السطر كله بالظبط. من غير [[^]] و [[$]] كان هيلمس [[OLD_PORT=30001]] كمان.
- [[grep PORT ملف ملف]]: لما تديله أكتر من ملف بيكتب اسم الملف قبل كل سطر.

---

## ٥. حالات تانية اتجرّبت

**ملف متتبّع اتمسح من الديسك:** [[git ls-files]] لسه بيذكره (الـ index فاكره)، فـ [[cp]] بيقع:

~~~text الناتج
cp: cannot stat 'src/server.js': No such file or directory
~~~

باقي الملفات بتتنسخ عادي، بس رقم الخروج [[123]]. لو ده مقصود، [[git ls-files -z --deleted]] بيطلّع اللي اتمسحوا عشان تستبعدهم.

**عايز النسخة اللي في آخر commit، مش اللي على الديسك؟** [[cp]] بينسخ الملفات زي ما هي دلوقتي، بتعديلاتك اللي لسه معملتلهاش commit. لو عايز نسخة الـ commit:

~~~bash
mkdir -p ../s4 && git archive HEAD | tar -x -C ../s4
~~~

[[git archive HEAD]] بيطلّع ملفات الـ commit كـ tar على الـ stdout، و [[tar -x -C ../s4]] بيفكّها جوه [[../s4]]. نفس الـ ٥ ملفات، وده بيشتغل على الماك كمان.

| الطريقة | بتنسخ | ماك | ملاحظات |
|---|---|---|---|
| [[git ls-files -z \| xargs -0 cp --parents -t]] | الملفات على الديسك (بتعديلاتك) | ❌ مفيش [[--parents]] | GNU بس |
| [[git archive HEAD \| tar -x -C]] | آخر commit | ✅ | تعديلاتك مش هتيجي |
| [[git worktree add ../try main]] | branch كامل في فولدر تاني، **وريبو** | ✅ | درس «git worktree»: لما عايز تعمل commits من النسخة |
| [[cp -r . ../scratch]] | كل حاجة | ✅ | بـ [[.git]] و [[node_modules]] و [[.env]]: ده اللي بنهرب منه |

وفي PowerShell مفيش [[--parents]]: [[git archive HEAD -o ..\snap.zip]] وبعدين [[Expand-Archive ..\snap.zip ..\scratch]] (الـ zip بيتعمل من الـ commit).

---

## الخلاصة

- [[git ls-files]] = اللي git متابعه. من غير [[.gitignore]]-d.
- **دايمًا [[-z]] مع [[-0]]** لما الأسامي داخلة على [[xargs]]: مسافات وعربي.
- [[cp --parents -t]] = نفس الشجرة وأمر واحد.
- فولدر التجربة **بره** الريبو، و [[git status]] في الأصل فاضي بعدها.`,
          deep: {
            why: R`نسخ الفولدر كله بيجيب معاه أسرار ([[.env]])، وتاريخ ممكن تعمل منه push بالغلط، ومكتبات بالميجات. و git عنده بالفعل لستة دقيقة بملفات المشروع، فبنستخدمها بدل ما نكتب لستة استبعاد بإيدنا.`,
            how: R`[[git ls-files]] بيقرا الـ index ويطبع المسارات. الـ shell بيبعت الناتج لـ [[xargs]] اللي بيبني منه أوامر. والفاصل هو أصل المشكلة: السطر الجديد والمسافة ممكن يبقوا جوه اسم ملف، أما NUL مستحيل. فـ [[-z]] في الناحيتين بيخلّي كل اسم يوصل زي ما هو. و [[cp --parents]] بيعمل الفولدرات اللي في المسار جوه الهدف.`,
            when: R`تجرّب إعداد أو سكربت ممكن يبوّظ ملفات، تبعت نسخة من الكود لحد من غير التاريخ والأسرار، تبني Docker image من الملفات المتتبّعة بس، أو تعمل نسخة تقارن بيها قبل وبعد تعديل كبير.`,
            mistakes: R`تنسى [[-z]] فتقع الأسامي اللي فيها مسافات. تعمل فولدر التجربة جوه الريبو فيظهر في [[git status]] وتنسخه جوه نفسه المرة الجاية. تستخدم [[-I{}]] على آلاف الملفات فتستنى. تكتب [[sed -i 's/3000/4000/']] من غير [[^]] و [[$]] فيتغيّر كل 3000 في الملف. تفتكر إن [[git ls-files]] فيه الملفات الجديدة اللي لسه معملتلهاش add: لأ، [[--others --exclude-standard]] للدول.`
          },
          sol: R`[[find ../scratch -type f | sort]] بيطلّع ٥ ملفات، منهم [[docs/user guide.md]] و [[docs/ملاحظات.md]] بأساميهم السليمة، ومفيش [[.env]] ولا [[node_modules]].

[[grep PORT]]: [[config.env:PORT=3000]] و [[../scratch/config.env:PORT=4000]]، و [[git status --short]] في الأصل مطبعش حاجة.

لو شلت [[-z]] و [[-0]]: [[cp: cannot stat 'docs/user': No such file or directory]] ونفسها لـ [[guide.md]] وللاسم العربي بالأرقام.`,
          practice: [
            { lvl: 'سريع', t: R`توقّع قبل ما تشغّل: في المعمل، [[git ls-files | wc -l]] و [[git ls-files -z | tr '\0' '\n' | wc -l]] و [[find . -type f -not -path './.git/*' | wc -l]]، كل واحد هيطلّع كام؟ وليه التالت مختلف؟`, done: R`توقعت ٥ و ٥ و ٧ (التالت فيه [[.env]] و [[node_modules/express/index.js]])، والناتج طابق.` },
            { lvl: 'تطبيق', t: R`صلّح الأمر البايظ: [[git ls-files | xargs -I{} cp {} ../scratch/]]. فيه ٣ مشاكل: المسافات، والعربي، وإن كل الملفات بتتحط في فولدر واحد من غير مساراتها (وملفين بنفس الاسم في فولدرين هيكتبوا فوق بعض). جرّبه الأول على المعمل بعد ما تضيف [[src/README.md]] و [[docs/README.md]].`, done: R`القديم طلّع [[cannot stat]] وفي [[../scratch]] [[README.md]] واحد بس. نسختك فيها [[-z]] و [[-0]] و [[--parents]] و [[-t]]، و [[find ../scratch -name README.md]] بيطلّع الاتنين في مكانهم.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: في أي ريبو عندك فيه [[node_modules]]، قيس حجم النسخة بالطريقتين: [[du -sh]] لنسخة [[cp -r]] كاملة، ولنسخة [[git ls-files]]. وعدد الملفات في الاتنين بـ [[find -type f | wc -l]].`, done: R`عندك ٤ أرقام مكتوبين (حجمين وعددين)، والفرق ظاهر (عادةً آلاف الملفات ومئات الميجات في [[node_modules]]).` },
            { lvl: 'تطبيق', t: R`قارن وقيس: اعمل ريبو فيه ١٠٠٠ ملف ([[for i in $(seq 1 1000); do echo $i > a/f$i.txt; done]]) وقيس بـ [[time]] الطريقتين: [[xargs -0 -I{} cp --parents "{}"]] و [[xargs -0 cp --parents -t]].`, done: R`عندك رقمين، و [[-t]] أسرع بكتير (في المعمل ١٤ مرة على ويندوز و ١٩ مرة على Ubuntu)، وتقدر تقول ليه في جملة: عدد مرات تشغيل [[cp]].` },
            { lvl: 'تحدي', t: R`ابني [[snapshot.sh <dir>]]: بيرفض لو [[<dir>]] جوه الريبو (قارن [[realpath]] بـ [[git rev-parse --show-toplevel]])، وبيرفض لو موجود ومش فاضي، وبينسخ بـ [[-z]] و [[--parents -t]]، ولو على الماك (مفيش [[cp --parents]]) يستخدم [[git archive HEAD | tar -x]] ويقول إن التعديلات اللي مش متسجّلة مش هتيجي.`, done: R`[[./snapshot.sh ./inside]] بيرفض برسالة، و [[./snapshot.sh ../snap]] بيعمل نسخة عدد ملفاتها = [[git ls-files | wc -l]]، وتشغيله تاني على نفس الفولدر بيرفض بدل ما يخلط.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه [[git ls-files]] كتب [[docs/ملاحظات.md]] أرقام بين علامات تنصيص، وليه [[-z]] صلّحها، وليه NUL بالذات هو الفاصل الآمن.`, done: R`الشرح فيه: [[core.quotePath]] بيكتب البايتات اللي فوق ١٢٧ octal بين [[" "]] في الناتج العادي؛ و [[-z]] بيطبع الأسامي خام من غير تنصيص؛ و NUL الحرف الوحيد (مع [[/]]) اللي مستحيل يبقى في اسم ملف على لينكس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`windows`], sh: R`bash`, run: R`git init -q -b main shop-api && cd shop-api
mkdir -p src docs node_modules/x
printf 'PORT=3000\n' > config.env && printf 'x\n' > src/server.js
printf 'g\n' > "docs/user guide.md" && printf 'node_modules/\n.env\n' > .gitignore
printf 'SECRET=1\n' > .env && printf 'x\n' > node_modules/x/i.js
git add . && git -c user.name=ali -c user.email=ali@example.com commit -qm init
git ls-files | xargs cp --parents -t .. 2>&1 | head -1
mkdir -p ../scratch && git ls-files -z | xargs -0 cp --parents -t ../scratch
find ../scratch -type f | sort
sed -i 's/^PORT=3000$/PORT=4000/' ../scratch/config.env
grep PORT config.env ../scratch/config.env
echo "status:[$(git status --short)]"`, expect: [R`cannot stat 'docs/user'`, R`../scratch/docs/user guide.md`, R`../scratch/config.env:PORT=4000`, R`config.env:PORT=3000`, R`status:[]`] },
            { os: [R`macos`, R`ubuntu`, R`windows`], sh: R`bash`, run: R`git init -q -b main r && cd r && mkdir -p src && printf 'x\n' > "src/a b.js" && printf 'S=1\n' > .env && printf '.env\n' > .gitignore
git add . && git -c user.name=ali -c user.email=ali@example.com commit -qm init
mkdir -p ../s4 && git archive HEAD | tar -x -C ../s4
find ../s4 -type f | sort`, expect: [R`../s4/src/a b.js`, R`../s4/.gitignore`] },
          ],
        },
      ]
    }
]);
