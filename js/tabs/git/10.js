// تكملة تاب git: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/git/01.js (شرح حقول الدرس في أوله)
MORE("git", [
    {
      t: "git للفريق والشغل الكبير",
      l: 3,
      time: R`حوالي ٧ ساعات (٨ دروس، كل واحد بمعمله)`,
      goal: [
        R`تكتب hooks بتفحص الـ commit والرسالة والـ push قبل ما يحصلوا، وتشاركها مع الفريق بـ [[core.hooksPath]]، وتعرف ليه الـ hook لوحده مش ضمان.`,
        R`تنزّل ريبو ضخم في ثواني بـ [[--depth]] و [[--filter=blob:none]] و [[sparse-checkout]]، وتعرف أنهي أوامر بتبوظ في الـ clone السطحي.`,
        R`تحمي main: تفهم branch protection و CODEOWNERS من GitHub، وتعمل نفس الحماية على ريبو bare بتاعك بـ [[pre-receive]].`,
        R`تخلّي كل فولدر ياخد الهوية الصح لوحده بـ [[includeIf]]، وتعرف الفخاخ اللي بتخليه يتجاهل الشرط من غير ما يقول.`,
        R`تكتب رسايل Conventional Commits، وتطلّع منها رقم الإصدار الجاي والـ changelog بسكربت.`,
        R`تختار طريقة الـ branches للفريق (trunk-based ولا git flow) وانت فاهم التكلفة.`,
        R`تفتح [[.git/]] وتقرا الـ objects والـ refs والـ index بإيدك، وتعمل commit من غير [[git commit]].`,
        R`تعرف GitHub Actions بيشوف الريبو إزاي: أنهي commit بيشتغل، وليه [[fetch-depth]] بيكسر [[git describe]].`,
      ],
      use: {
        work: R`أي فريق فيه أكتر من ٣ أشخاص بيستخدم حاجات من الوحدة دي كل يوم: hooks و CODEOWNERS وحماية main و Conventional Commits وطريقة branches متفق عليها. ولو انت اللي هتظبطها، لازم تعرف كل واحدة بتحمي من إيه وبتتكسر إزاي.`,
        cs: R`git في الآخر قاعدة بيانات بسيطة: objects متخزنة بالهاش بتاع محتواها (content-addressable)، و refs أسماء بتشاور على هاش. لما تفهم ده، الـ shallow clone والـ partial clone والـ rebase والـ reflog كلهم بيبقوا منطقيين.`,
        prog: R`كل درس فيه سكربت حقيقي اتجرّب: hook بيرفض [[.env]]، وأداة بتطلّع صاحب كل ملف من CODEOWNERS، وسكربت رقم الإصدار من الـ commits، وcommit معمول بالـ plumbing.`,
      },
      lab: R`mkdir -p ~/lab/gitteam && cd ~/lab/gitteam`,
      projects: [
        { lvl: 'صغير', t: R`[[hooks/]] مشترك للفريق`, what: R`فولدر [[.githooks/]] في الريبو فيه [[pre-commit]] (يرفض [[.env]] وملفات أكبر من 5MB وأي [[console.log]] جديد في [[src/]])، و [[commit-msg]] (Conventional Commits)، و [[pre-push]] (يرفض push مباشر على main). وسكربت [[setup.sh]] بيعمل [[git config core.hooksPath .githooks]]. من درسين «git hooks» و «Conventional Commits».`, done: R`على ريبو جديد بعد [[sh setup.sh]]: commit فيه [[.env]] بيترفض، ورسالة [[updated stuff]] بتترفض، و [[git push origin main]] بيترفض والـ push لـ branch بيعدّي، والـ hooks بتشتغل نفس الشكل في Git Bash و Linux.` },
        { lvl: 'صغير', t: R`[[who-owns]]: صاحب كل ملف`, what: R`سكربت Python بياخد ملف CODEOWNERS ويطبع لكل ملف في [[git ls-files]] أصحابه (آخر سطر بيطابق بيكسب)، و [[--unowned]] يطبع الملفات اللي ملهاش حد بس، و [[--diff main]] يطبع أصحاب الملفات اللي اتغيّرت في الـ branch بس. من درس «branch protection و CODEOWNERS».`, done: R`على ملف المعمل بيطبع [[src/payments/README.md]] لـ [[@acme-co/docs]] مش لفريق الـ payments، و [[--unowned]] بيطبع [[package.json]]، و [[--diff main]] على branch غيّر ملف واحد بيطبع سطر واحد.` },
        { lvl: 'متوسط', t: R`[[release.sh]] من Conventional Commits`, what: R`سكربت بيقرا الـ commits من آخر tag، ويطلّع رقم الإصدار الجاي (major و minor و patch)، ويكتب [[CHANGELOG.md]] مقسوم (Features و Fixes و Breaking)، ويعمل tag عليه رسالة. ويرفض لو فيه commit رسالته مش على الشكل، ويطبعها. و [[--dry-run]] يطبع بس. من درس «Conventional Commits».`, done: R`على معمل الدرس بيطبع [[v1.4.2 -> v2.0.0 (major)]] ويرفض بسبب [[update stuff]]، وبعد ما تشيل الـ commit ده بـ [[rebase]] بيكتب الـ changelog والـ tag، وتشغيله تاني مبيعملش tag مكرر.` },
        { lvl: 'متوسط', t: R`[[clone-smart]]: أسرع clone للشغل اللي محتاجه`, what: R`سكربت بياخد URL ومسارات ([[apps/api docs]])، ويعمل [[clone --filter=blob:none --sparse]] و [[sparse-checkout set]]، ويطبع الحجم والوقت قبل وبعد مقارنة بـ clone كامل. و [[--ci]] يعمل [[--depth 1]] بدل كده. من درس «shallow clone و sparse-checkout».`, done: R`على ريبو المعمل (٣٠ commit وملف 200KB بيتغيّر كل مرة) بيطبع جدول فيه الكامل حوالي 6MB والـ sparse أقل من 200KB، ووقت كل واحد، و [[git status]] بيقول [[sparse checkout with]] ونسبة الملفات.` },
        { lvl: 'كبير', t: R`سيرفر git صغير بحماية main`, what: R`ريبو bare على سيرفر (أو كونتينر) فيه: [[receive.denyNonFastForwards]] و [[receive.denyDeletes]]، و [[pre-receive]] بيرفض push مباشر على main إلا من يوزر [[release-bot]] (عن طريق متغيّر بيتحط في [[authorized_keys]] أو [[GIT_PUSH_OPTIONS]])، وبيرفض commits رسايلها مش Conventional، وبيرفض ملفات أكبر من حد. و [[post-receive]] بيكتب سطر لوج (مين، أنهي ref، من هاش لهاش). من دروس «git hooks» و «branch protection و CODEOWNERS».`, done: R`على المعمل: [[push --force]] على main بيطلّع [[(non-fast-forward)]]، و push عادي على main بيطلّع [[(pre-receive hook declined)]] برسالتك، و push من [[release-bot]] بيعدّي، وملف كبير بيترفض باسمه، واللوج فيه سطر لكل push نجح بس.`, ext: R`زوّد CODEOWNERS حقيقي: [[pre-receive]] بيقرا [[.github/CODEOWNERS]] من الـ commit الجديد، ويرفض تعديل ملفات فريق الـ payments من غير trailer [[Approved-by:]] من حد في الفريق ده.` },
        { lvl: 'كبير', t: R`[[git-inspect]]: اقرا ريبو من جوه`, what: R`أداة Python من غير مكتبات بتقرا [[.git/]] مباشرة: [[HEAD]] والـ refs (من الملفات و [[packed-refs]])، وتفك أي loose object بـ [[zlib]] وتطبع نوعه وحجمه ومحتواه، وتمشي على تاريخ main من الـ [[parent]]. وتقارن ناتجها بـ [[git cat-file -p]] و [[git log --format=%H]]. من درس «جوه .git/».`, done: R`على معمل الدرس بالتواريخ الثابتة بتطبع نفس الهاشات ([[7b4a021]] و [[b7673e5]]) ونفس محتوى [[git cat-file -p HEAD]] حرف بحرف، وبعد [[git gc]] بتقول «object موجود في pack» بدل ما تقع.`, ext: R`زوّد قراية ملفات الـ pack ([[.idx]] و [[.pack]]) وفك الـ deltas، أو اعمل [[git-inspect fsck]] يتأكد إن كل object هاشه بيطابق محتواه.` },
        { lvl: 'فكرة', t: R`دليل git للفريق بتاعك`, what: R`صفحة واحدة (أو [[CONTRIBUTING.md]]) بتقول: طريقة الـ branches (trunk ولا flow وليه)، وشكل الرسالة، والـ hooks وإزاي تتسطّب، ومين يراجع إيه، وإزاي تعمل release، وإيه اللي ممنوع على main. وكل قاعدة جنبها الأداة اللي بتفرضها (hook، أو CI، أو حماية).`, done: R`زميل جديد قدر يعمل أول PR من غير ما يسأل حد، وكل قاعدة في الدليل ليها أداة بتمسكها لو اتنست، ومفيش قاعدة «بنفتكرها وخلاص».`, ext: R`اعمل منه template ريبو على GitHub فيه الـ hooks والـ workflow والـ CODEOWNERS جاهزين، وأي مشروع جديد يبدأ منه.` },
      ],
      n: R`الحاجات اللي بتظهر لما تشتغل في فريق أو ريبو كبير: git hooks، و shallow clone و sparse-checkout، وحماية main و CODEOWNERS، و includeIf للهوية، و Conventional Commits، و trunk-based ولا git flow، وجوه فولدر .git، و git مع GitHub Actions`,
      items: [
        {
          cmd: "git hooks",
          title: "git hooks و pre-commit: فحص أوتوماتيك قبل الـ commit والـ push",
          learn: R`تكتب hook بيمنع commit أو رسالة أو push غلط، وتشاركه مع الفريق، وتعرف إمتى بيتجاهَل ومين بيقدر يتخطاه.`,
          out: R`[[git commit]] على [[.env]] بيطبع [[pre-commit: .env مش هيدخل الـ commit]] ورقم الخروج ١، والـ commit مااتعملش.`,
          desc: R`الـ hook سكربت في [[.git/hooks/]] اسمه على اسم لحظة معينة ([[pre-commit]]، و [[commit-msg]]، و [[pre-push]]...). git بيشغّله لوحده في اللحظة دي، ولو خرج برقم غير صفر git **بيوقف العملية**. ده بيخليك تمنع [[.env]] يدخل commit، أو رسالة زي [[update]]، أو push مباشر على main، من غير ما حد يفتكر.

وأهم ٣ حقايق: الـ hooks **مبتتنسخش** مع [[git clone]] (فولدر [[.git/hooks]] مش جزء من التاريخ)، فالفريق بيشاركها بفولدر في الريبو و [[git config core.hooksPath]]. وأي حد يقدر يتخطاها بـ [[--no-verify]]، فهي مساعدة على جهازك مش ضمان: الضمان الحقيقي على السيرفر (CI و branch protection). وعلى لينكس والماك الـ hook لازم يبقى executable ([[chmod +x]])، وإلا git بيتجاهله ويطبع hint بس.`,
          example: R`ls .git/hooks
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/sh
if git diff --cached --name-only | grep -qE '(^|/)\.env$'; then
  echo "pre-commit: .env مش هيدخل الـ commit" >&2
  exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
git add .env app.js && git commit -m "first"
git commit --no-verify -m "first"
mkdir -p .githooks && cp .git/hooks/pre-commit .githooks/
git config core.hooksPath .githooks
git hook run pre-commit`,
          lines: [
            R`بيعرض الـ hooks اللي git حطها كأمثلة وقت [[git init]]: كلها آخرها [[.sample]]، فمحدش فيهم شغّال لحد ما تشيل الامتداد.`,
            R`بيكتب ملف اسمه [[pre-commit]] بالظبط (من غير امتداد) لحد السطر اللي فيه [[EOF]]. و [[<<'EOF']] بعلامات التنصيص معناها «متفكّش [[$]] ولا أي حاجة جوه»، فالسكربت يتكتب زي ما هو.`,
            R`[[git diff --cached --name-only]] بيطبع أسامي الملفات اللي **داخلة** الـ commit (الـ staged)، و [[grep -qE]] بيدوّر بهدوء على ملف اسمه [[.env]] في أي فولدر.`,
            R`لو لقاه: رسالة للمستخدم على stderr ([[>&2]])، عشان تظهر حتى لو حد بيحوّل الناتج العادي.`,
            R`[[exit 1]] هو اللي بيوقف الـ commit. أي رقم غير صفر = git يلغي العملية.`,
            R`قفلة الـ [[if]]. ولو مالقاش [[.env]] السكربت بيخلص برقم صفر لوحده، فالـ commit يكمّل.`,
            R`نهاية الـ heredoc: السطر ده لازم يبقى [[EOF]] لوحده من غير مسافات قبله.`,
            R`بيخلّي الملف قابل للتشغيل. على لينكس والماك من غيرها git بيتجاهل الـ hook ويطبع hint، وعلى Git Bash في ويندوز مش لازمة بس مبتضرش.`,
            R`بيحاول يعمل commit فيه [[.env]]: الـ hook بيرفض وبيطبع الرسالة، ورقم الخروج ١. بس خد بالك: [[git add]] نجح، فـ [[.env]] لسه staged.`,
            R`[[--no-verify]] (أو [[-n]]) بيتخطى [[pre-commit]] و [[commit-msg]]. هنا الـ commit هيدخل فيه [[.env]] فعلًا، وده بالظبط ليه الـ hook مش ضمان.`,
            R`بيعمل فولدر [[.githooks]] **جوه الريبو** وبينسخ الـ hook فيه، عشان يتعمله commit ويوصل لكل الفريق.`,
            R`بيقول لـ git «دوّر على الـ hooks في [[.githooks]] بدل [[.git/hooks]]». الإعداد ده محلي، فكل واحد في الفريق بيكتبه مرة بعد الـ clone.`,
            R`بيشغّل الـ hook بإيدك من غير commit، عشان تجرّبه وانت بتكتبه (موجود من Git 2.36).`,
          ],
          try: R`في [[~/lab/gitteam/hk]] اعمل ريبو، واكتب الـ [[pre-commit]] اللي في المثال، وجرّب commit فيه [[.env]] و commit من غيره. وبعدين اكتب [[commit-msg]] بيرفض أي رسالة مش على شكل [[type(scope): وصف]]، وجرّب [[updated stuff]] و [[fix(cart): round totals]].`,
          teach: R`## الفكرة

git بيشغّل سكربتات بتاعتك في لحظات معينة: قبل الـ commit، وبعد ما تكتب الرسالة، وقبل الـ push، وبعد الـ checkout، وعلى السيرفر لما حد يعمل push. كل سكربت اسمه على اسم اللحظة، ومكانه [[.git/hooks/]]. ولو السكربت خرج برقم غير صفر في hook اسمه [[pre-...]] أو [[commit-msg]]، العملية بتتلغي.

اتجرّب على Git Bash في ويندوز (Git 2.56) و PowerShell 7.6، وعلى [[ubuntu:24.04]] في Docker (Git 2.43).

---

## ١. المعمل

~~~bash
mkdir -p ~/lab/gitteam/hk && cd ~/lab/gitteam/hk
git init -q -b main shop-api && cd shop-api
git config user.name ali && git config user.email ali@example.com
ls .git/hooks
~~~

~~~text الناتج
applypatch-msg.sample
commit-msg.sample
fsmonitor-watchman.sample
post-update.sample
pre-applypatch.sample
pre-commit.sample
pre-merge-commit.sample
pre-push.sample
pre-rebase.sample
pre-receive.sample
prepare-commit-msg.sample
push-to-checkout.sample
sendemail-validate.sample
update.sample
~~~

كلها أمثلة آخرها [[.sample]]. git بيدوّر على ملف اسمه [[pre-commit]] بالظبط، فـ [[pre-commit.sample]] مش بيشتغل. ولو عايز تستخدم المثال: [[cp .git/hooks/pre-commit.sample .git/hooks/pre-commit]].

---

## ٢. أول hook: [[pre-commit]] بيمنع [[.env]]

اكتب السكربت اللي في المثال، وبعدين:

~~~bash
echo "PORT=1" > .env; echo hi > app.js
git add .env app.js
git commit -m "first"; echo "exit=$?"
~~~

~~~text الناتج
pre-commit: .env مش هيدخل الـ commit
exit=1
~~~

[[git log]] بعدها بيقول [[does not have any commits yet]]: مفيش commit اتعمل.

| رقم خروج الـ hook | git بيعمل إيه |
|---|---|
| [[0]] | يكمّل العملية عادي |
| أي رقم تاني | يلغي العملية، والملفات زي ما هي (لسه staged) |

### ليه [[--cached]]؟

الـ commit بياخد الـ **index** (اللي عملتله add)، مش الفولدر. [[git diff --cached --name-only]] بيطبع الملفات اللي في الـ index ومختلفة عن آخر commit، يعني بالظبط اللي داخل. لو استخدمت [[ls]] أو [[git status]] هتلاقي ملفات مش داخلة أصلًا.

### الفخ: الـ hook بيشوف الفولدر، مش الـ index

لو الـ hook بيشغّل linter أو تستات، هيشغّلها على الملفات **على الديسك**. فلو عدّلت ملف بعد الـ add، الـ hook بيفحص نسخة غير اللي داخلة. الحلول: [[git stash push --keep-index --include-untracked]] قبل الفحص و [[git stash pop]] بعده، أو أداة زي lint-staged (تاب جودة الكود، درس «lint-staged») بتعمل ده لوحدها.

---

## ٣. على لينكس: الـ hook لازم يبقى executable

نفس الملف على [[ubuntu:24.04]] من غير [[chmod +x]]:

~~~text الناتج
hint: The '.git/hooks/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with $__btgit config advice.ignoredHook false$__bt.
exit=0
~~~

الـ commit **عدّى**. git مبيعتبرش ده غلط، بيطبع hint بس. بعد [[chmod +x .git/hooks/pre-commit]] الـ hook اشتغل ورفض. وعلى Git Bash في ويندوز مفيش فكرة executable بالشكل ده، فالـ hook اشتغل من غير [[chmod]] (و [[ls -l]] بيوريه [[-rwxr-xr-x]]).

### وفخ تاني: الـ hook مكتوب بـ CRLF

لو حد عدّل الـ hook على ويندوز بمحرر حفظه بـ CRLF، على لينكس:

~~~text الناتج
fatal: cannot exec '.git/hooks/pre-commit': No such file or directory
~~~

الملف موجود! بس أول سطر بقى [[#!/bin/sh]] وبعده [[\r]] مخفي، فالنظام بيدوّر على برنامج اسمه [[sh\r]] ومش لاقيه. على Git Bash نفس الملف اشتغل عادي، فالمشكلة بتظهر عند زميلك على الماك أو في الـ CI بس. الحل: [[.gitattributes]] فيه [[.githooks/* text eol=lf]] (درس «.gitattributes»).

---

## ٤. [[commit-msg]]: افحص الرسالة

git بيدّي الـ hook ده **مسار ملف** فيه الرسالة ([[$1]])، مش الرسالة نفسها:

~~~bash
cat > .git/hooks/commit-msg <<'EOF'
#!/bin/sh
first=$(head -n1 "$1")
if ! printf '%s\n' "$first" | grep -qE '^(feat|fix|docs|chore|refactor|test)(\([a-z0-9-]+\))?!?: .+'; then
  echo "commit-msg: الرسالة لازم تبقى زي: fix(cart): رسالة" >&2
  echo "  اللي كتبته: $first" >&2
  exit 1
fi
EOF
chmod +x .git/hooks/commit-msg
~~~

- [[head -n1 "$1"]]: أول سطر بس (العنوان).
- [[printf '%s\n']] بدل [[echo]]: لو الرسالة أولها [[-n]] أو فيها [[\]]، [[echo]] ممكن يبوّظها.
- الـ regex: نوع من لستة، وبعده اختياري [[(scope)]]، واختياري [[!]]، وبعدين [[: ]] ووصف. ده شكل Conventional Commits (ليه درس لوحده في الوحدة دي).

~~~text git commit -qam "updated stuff"
commit-msg: الرسالة لازم تبقى زي: fix(cart): رسالة
  اللي كتبته: updated stuff
exit=1
~~~

و [[git commit -qam "fix(cart): round totals"]] عدّى. والرسالة اللي git كان بيفحصها موجودة في [[.git/COMMIT_EDITMSG]].

ومن PowerShell 7.6 نفس الريبو: [[git commit -qam "oops"]] طلّع نفس الرسالة و [[$LASTEXITCODE]] بـ ١. git for Windows بيشغّل الـ hook بالـ sh بتاعه مهما كان الترمنال.

---

## ٥. [[pre-push]]: آخر فرصة قبل ما الكود يطلع

git بيدّيه اسم الـ remote والـ URL كـ arguments، وعلى الـ stdin سطر لكل ref رايح:

~~~bash
cat > .git/hooks/pre-push <<'EOF'
#!/bin/sh
echo "pre-push args: remote=$1 url=$2" >&2
while read local_ref local_sha remote_ref remote_sha; do
  echo "pre-push stdin: $local_ref $local_sha -> $remote_ref $remote_sha" >&2
  if [ "$remote_ref" = "refs/heads/main" ]; then echo "pre-push: ممنوع push مباشر على main" >&2; exit 1; fi
done
EOF
chmod +x .git/hooks/pre-push
git init -q --bare -b main ../origin.git && git remote add origin ../origin.git
git push origin main
~~~

~~~text الناتج
pre-push args: remote=origin url=../origin.git
pre-push stdin: refs/heads/main 57ef7e2fad94f4fa1a01f9c99659c6400e105515 -> refs/heads/main 0000000000000000000000000000000000000000
pre-push: ممنوع push مباشر على main
error: failed to push some refs to '../origin.git'
~~~

- [[remote_sha]] كله أصفار = الـ branch ده مش موجود على الـ remote لسه (أول push).
- ولو [[local_sha]] كله أصفار = انت بتمسح الـ branch من الـ remote ([[git push origin --delete x]]).
- و [[git push origin main:feature/x]] عدّى ([[exit=0]]) لأن الـ [[remote_ref]] بقى [[refs/heads/feature/x]].

الهاشات عندك هتختلف (فيها الوقت).

---

## ٦. التخطي: [[--no-verify]] و [[core.hooksPath]]

~~~bash
git commit --no-verify -m "first"          # بيتخطى pre-commit و commit-msg
git push --no-verify origin main           # بيتخطى pre-push
git -c core.hooksPath=/dev/null commit -m "x"   # بيلغي كل الـ hooks لأمر واحد
~~~

في المعمل التالت عدّى برسالة [[bad msg 2]] مع إن [[commit-msg]] بيرفضها. يعني: **الـ hook بيساعد اللي عايز يلتزم، مبيمنعش اللي عايز يتخطى**. اللي بيمنع فعلًا على السيرفر: [[pre-receive]] على ريبو بتاعك، أو branch protection و CI على GitHub (درسين «branch protection و CODEOWNERS» و «git و GitHub Actions»).

---

## ٧. الـ hooks مبتتنسخش مع الـ clone

~~~bash
git clone -q origin.git mona-copy
ls mona-copy/.git/hooks | grep -v sample
~~~

ولا سطر: [[mona-copy]] جالها الأمثلة بس. [[.git/hooks]] مش جوه أي commit، وده مقصود: لو الـ clone بيجيب hooks، أي ريبو تنزّله كان يقدر يشغّل كود على جهازك أول ما تعمل commit.

الحل المتفق عليه:

~~~bash
mkdir -p .githooks && cp .git/hooks/commit-msg .githooks/
git config core.hooksPath .githooks
git add .githooks && git commit -m "chore: shared hooks"
~~~

وكل واحد في الفريق بعد الـ clone بيكتب [[git config core.hooksPath .githooks]] مرة (حطها في [[README]] أو سكربت [[setup]] أو [[npm]] script اسمه [[prepare]]). وخد بالك: بعد [[core.hooksPath]] git **مبيبصش** في [[.git/hooks]] خالص، فأي hook قديم هناك بطّل يشتغل.

---

## ٨. [[git hook run]]: جرّب الـ hook من غير commit

~~~bash
git hook run pre-commit; echo "exit=$?"
git hook run --ignore-missing post-merge; echo "exit=$?"
~~~

بيشغّل الـ hook بنفس الطريقة اللي git بيشغّله بيها. و [[--ignore-missing]] متطلعش غلط لو الـ hook مش موجود. على Ubuntu بالـ [[pre-commit.sample]] الأصلي وملف فيه مسافة في آخر السطر:

~~~text git hook run pre-commit
w.txt:1: trailing whitespace.
+a
~~~

ورقم الخروج ٢ (من [[git diff-index --check]] اللي جوه المثال)، و [[git commit]] بنفس الحالة اترفض.

---

## ٩. الـ hooks اللي هتستخدمها فعلًا

| الـ hook | إمتى | يقدر يوقف؟ | بيستخدموه في |
|---|---|---|---|
| [[pre-commit]] | قبل ما الرسالة تتكتب | أيوه | lint وأسرار وملفات ممنوعة |
| [[prepare-commit-msg]] | قبل ما المحرر يفتح | أيوه | يحط رقم التذكرة من اسم الـ branch |
| [[commit-msg]] | بعد ما الرسالة تتكتب | أيوه | شكل الرسالة |
| [[post-commit]] | بعد الـ commit | لأ | إشعار أو لوج |
| [[pre-rebase]] | قبل [[rebase]] | أيوه | يمنع rebase لـ branch منشور |
| [[post-checkout]] و [[post-merge]] | بعد [[switch]] و [[pull]] | لأ | [[npm install]] لو [[package-lock.json]] اتغيّر |
| [[pre-push]] | قبل ما الـ push يبعت | أيوه | تستات سريعة، ومنع push على main |
| [[pre-receive]] و [[update]] | على السيرفر قبل قبول الـ push | أيوه | حماية الـ branches على ريبو bare بتاعك |
| [[post-receive]] | على السيرفر بعد القبول | لأ | deploy أو إشعار |

---

## ١٠. الأدوات اللي فوق الـ hooks

- **husky** (مشاريع Node): بيعمل [[core.hooksPath]] لوحده مع [[npm install]]. درس «husky» في تاب جودة الكود.
- **pre-commit** (أداة Python، [[pip install pre-commit]]): ملف [[.pre-commit-config.yaml]] فيه لستة فحوصات من ريبوهات، و [[pre-commit install]] بيكتب الـ hook. (من الوثائق الرسمية لـ pre-commit.com؛ متسطّبتش هنا لأن مساحة الجهاز ضيقة.)
- الاتنين في الآخر بيكتبوا نفس الملف اللي كتبناه بإيدنا، فلو حاجة مش شغّالة: [[git config core.hooksPath]] و [[ls -l]] على الـ hook هما أول فحص.

---

## الخلاصة

| عايز | اعمل |
|---|---|
| تمنع ملف أو سر | [[pre-commit]] بـ [[git diff --cached --name-only]] |
| شكل الرسالة | [[commit-msg]] بيقرا [[$1]] |
| تمنع push على main | [[pre-push]] بيقرا الـ stdin |
| الفريق كله | [[.githooks/]] في الريبو و [[core.hooksPath]] |
| ضمان حقيقي | على السيرفر: [[pre-receive]] أو حماية GitHub و CI |`,
          deep: {
            why: R`الغلطات اللي بتتكرر (سر في commit، رسالة ملهاش معنى، push على main الساعة ٢ بالليل) مبتتحلش بـ «خد بالك». الـ hook بيمسكها في ثانية على جهاز اللي بيغلط، قبل ما توصل لحد تاني، ومن غير ما حد يراجع يدوي.`,
            how: R`git بيدوّر على ملف executable بالاسم ده في [[core.hooksPath]] (أو [[.git/hooks]] لو مش متحدد)، ويشغّله وفولدر الشغل هو أول الريبو. الـ arguments والـ stdin بيختلفوا حسب الـ hook: [[commit-msg]] بياخد مسار ملف الرسالة، و [[pre-push]] بياخد اسم الـ remote والـ URL وسطر لكل ref على الـ stdin، و [[pre-receive]] على السيرفر بياخد سطور [[old new ref]]. ولو الـ hook خرج برقم غير صفر في hook من النوع اللي «يقدر يوقف»، git بيلغي العملية ومبيغيّرش حاجة. وعلى ويندوز Git for Windows بيقرا أول سطر ([[#!/bin/sh]] أو [[#!/usr/bin/env python3]]) ويشغّل البرنامج ده من الـ sh بتاعه.`,
            when: R`في أي ريبو بتشتغل عليه أكتر من مرة: [[pre-commit]] للأسرار وملفات الـ build، و [[commit-msg]] لو الفريق متفق على شكل. وفي ريبو الفريق: فولدر hooks مشترك. ولو محتاج حاجة **لازم** تتنفذ: متعتمدش على الـ hook لوحده، حط نفس الفحص في CI.`,
            mistakes: R`تنسى [[chmod +x]] على لينكس فالـ hook يتجاهَل بـ hint ومحدش يشوفه. والـ hook بـ CRLF فيقع عند زمايلك بـ [[cannot exec]]. وتفحص الفولدر بدل الـ staged. و hook بطيء (تستات كاملة ٣ دقايق) فالناس تتعوّد على [[--no-verify]]. وتفتكر إن الـ hook بيتنسخ مع الـ clone. وتحط [[core.hooksPath]] وتنسى إن [[.git/hooks]] القديم بطّل يشتغل. و [[pkill]] أو [[rm -rf]] جوه hook من غير ما تختبره بـ [[git hook run]].`
          },
          sol: R`commit فيه [[.env]]: [[pre-commit: .env مش هيدخل الـ commit]] و [[exit=1]]، ومن غيره: commit عادي. و [[updated stuff]]: [[commit-msg: الرسالة لازم تبقى زي: fix(cart): رسالة]] و [[exit=1]]، و [[fix(cart): round totals]] عدّى و [[git log --oneline -1]] بيطبعها.

اتجرّب على Git Bash (Git 2.56) و PowerShell 7.6 على ويندوز، وعلى [[ubuntu:24.04]] (Git 2.43): رسالة الـ hint بتاعة الـ hook اللي مش executable، و [[cannot exec]] بتاعة الـ CRLF، وناتج [[pre-commit.sample]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب ٤ hooks وكل واحد بيتشغّل إمتى، وأنهي واحد فيهم بياخد الرسالة كمسار ملف، وأنهي واحد بيقرا سطور من الـ stdin.`, done: R`كتبت [[pre-commit]] و [[commit-msg]] و [[pre-push]] و [[post-merge]] صح، وقلت إن [[commit-msg]] بياخد [[$1]] مسار ملف، و [[pre-push]] بيقرا [[local_ref local_sha remote_ref remote_sha]] من الـ stdin.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: hook [[pre-commit]] فيه [[ls *.env]] بدل [[git diff --cached]]. عملت [[git add app.js]] بس، و [[.env]] موجود في الفولدر ومش متعمله add. الـ commit هيعدّي؟ وبعدين العكس: [[.env]] staged واتمسح من الفولدر بـ [[rm]]. جرّب الحالتين.`, done: R`توقعت إن الأولى بترفض غلط (الملف مش داخل أصلًا) والتانية بتعدّي غلط ([[.env]] داخل الـ commit)، والمعمل أكد ده، وصلّحت الـ hook بـ [[git diff --cached --name-only]] فالحالتين اتعكسوا صح.` },
            { lvl: 'تطبيق', t: R`ابني [[prepare-commit-msg]]: لو اسم الـ branch زي [[feature/SHOP-142-coupons]]، يحط [[SHOP-142]] في آخر الرسالة لوحده لو مش موجود. (اسم الـ branch من [[git symbolic-ref --short HEAD]]، والـ hook بياخد مسار ملف الرسالة في [[$1]].)`, done: R`على branch [[feature/SHOP-142-coupons]]: [[git commit -m "feat(cart): coupons"]] بيعمل رسالة آخرها [[SHOP-142]]، وتشغيله مرتين مبيكررش الرقم، وعلى main مبيضيفش حاجة، وعلى detached HEAD مبيقعش.` },
            { lvl: 'تطبيق', t: R`صلّح الـ hook ده: [[#!/bin/sh]] ثم [[npm test]] ثم [[echo done]]. المشكلة إن التستات لما تفشل الـ commit بيعدّي برضه. ليه؟ وصلّحه، وجرّبه بتست بيفشل (أي أمر بيرجّع ١، زي [[false]] مكان [[npm test]]).`, done: R`عرفت إن رقم خروج السكربت = رقم خروج **آخر** أمر ([[echo done]] = 0)، وصلّحته بـ [[set -e]] أو [[npm test || exit 1]]، ومع [[false]] الـ commit بيترفض ومن غيره بيعدّي.` },
            { lvl: 'تحدي', t: R`ابني [[pre-push]] بيشغّل [[sh check.sh]] على الـ commits الجديدة بس: من الـ stdin خد [[remote_sha]] و [[local_sha]]، ولو [[remote_sha]] أصفار استخدم [[git rev-list local_sha --not --remotes]]، وإلا [[remote_sha..local_sha]]، وارفض لو أي commit رسالته فيها [[WIP]].`, done: R`push فيه commit رسالته [[WIP: half]] بيترفض ويطبع الهاش والرسالة، و push من غيره بيعدّي، وأول push لـ branch جديد بيفحص الـ commits اللي مش على أي remote بس، و push بيمسح branch (أصفار في [[local_sha]]) مبيقعش.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه git مبينسخش الـ hooks مع الـ clone؟ وإزاي الفريق يتأكد إن الفحص ده بيحصل فعلًا حتى لو حد عمل [[--no-verify]]؟`, done: R`الشرح فيه: لو اتنسخت أي ريبو تنزّله يقدر يشغّل كود على جهازك (أمان)، والمشاركة بـ [[core.hooksPath]] اختيارية، والضمان بنفس الفحص في CI وحماية main على السيرفر، و [[--no-verify]] بيتخطى الجهاز المحلي بس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q -b main shop-api && cd shop-api
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/sh
if git diff --cached --name-only | grep -qE '(^|/)\.env$'; then
  echo "pre-commit: blocked .env" >&2
  exit 1
fi
EOF
cat > .git/hooks/commit-msg <<'EOF'
#!/bin/sh
head -n1 "$1" | grep -qE '^(feat|fix|docs|chore)(\([a-z0-9-]+\))?!?: .+' || { echo "commit-msg: bad message" >&2; exit 1; }
EOF
chmod +x .git/hooks/pre-commit .git/hooks/commit-msg
echo PORT=1 > .env; echo hi > app.js
git add .env app.js
git commit -qm "feat: first" 2>&1; echo "env commit exit=$?"
git rm -q --cached .env
git commit -qm "updated stuff" 2>&1; echo "msg commit exit=$?"
git commit -qm "feat(app): first" && echo "good commit: $(git log --format=%s -1)"
git clone -q . ../copy && echo "hooks in clone: $(ls ../copy/.git/hooks | grep -vc sample)"`, expect: [R`pre-commit: blocked .env`, R`env commit exit=1`, R`commit-msg: bad message`, R`msg commit exit=1`, R`good commit: feat(app): first`, R`hooks in clone: 0`] },
          ],
        },
        {
          cmd: "shallow clone و sparse-checkout",
          title: "ريبو ضخم: clone بـ --depth و --filter و sparse-checkout من غير ما تنزّل كل التاريخ",
          learn: R`تنزّل الجزء اللي محتاجه بس من ريبو كبير (تاريخ أقل، أو ملفات أقل، أو فولدرات أقل)، وتعرف أنهي أوامر بتبوظ بسبب كده وإزاي تكمّل الناقص.`,
          out: R`[[du -sh .git]] بعد [[--depth 1]] حوالي 274K بدل 5.9M، و [[git sparse-checkout list]] بيطبع الفولدرات اللي اخترتها بس.`,
          desc: R`الـ clone العادي بينزّل **كل** commit و **كل** نسخة من كل ملف من أول المشروع. في ريبو عمره ١٠ سنين ده ممكن يبقى جيجات. وفيه ٣ طرق تنزّل أقل، وكل واحدة بتقص حاجة مختلفة:

- [[--depth 1]] (shallow clone): بتقص **التاريخ**: آخر commit بس. ده اللي GitHub Actions بيعمله افتراضي.
- [[--filter=blob:none]] (partial clone): بتنزّل كل الـ commits والـ trees، بس **محتوى الملفات** القديمة مبينزلش غير لما تحتاجه.
- [[sparse-checkout]]: بتقص **الفولدرات** اللي بتظهر على الديسك (مثلًا [[apps/api]] بس من monorepo).

والثمن: في الـ shallow clone أوامر زي [[git describe]] و [[git merge-base]] و [[diff A...B]] بتفشل أو بتدّي نتيجة ناقصة، لأن التاريخ اللي بتدوّر فيه مش عندك. والحل [[git fetch --deepen]] أو [[--unshallow]] لما تحتاج.`,
          example: R`git clone --depth 1 https://github.com/acme-co/shop-api.git
git -C shop-api rev-parse --is-shallow-repository
git -C shop-api log --oneline --decorate
git -C shop-api fetch --deepen 10
git -C shop-api fetch --unshallow
git clone --filter=blob:none --sparse https://github.com/acme-co/shop-api.git mono
git -C mono sparse-checkout set apps/api docs
git -C mono sparse-checkout list
git -C mono sparse-checkout disable`,
          lines: [
            R`بينزّل آخر commit بس على الـ branch الافتراضي، ومعاه الملفات بتاعته. و [[--depth 1]] بيعني ضمنيًا [[--single-branch]]: الـ branches التانية مش هتنزل.`,
            R`بيطبع [[true]] لو الريبو سطحي ([[false]] لو كامل). ده الفحص اللي تستخدمه في سكربت قبل أمر محتاج التاريخ.`,
            R`آخر commit هيظهر جنبه [[grafted]]: معناها «التاريخ مقطوع هنا»، git عارف إن له parent بس مش عنده.`,
            R`بيجيب ١٠ commits زيادة لورا من النقطة اللي اتقطع عندها، من غير ما ينزّل التاريخ كله.`,
            R`بيجيب الباقي كله، فالريبو يبقى كامل عادي و [[--is-shallow-repository]] يبقى [[false]].`,
            R`partial clone: كل الـ commits والـ trees، ومحتوى الملفات بيتنزّل لما تحتاجه بس. و [[--sparse]] بيبدأ بالملفات اللي في أول الريبو بس من غير أي فولدر.`,
            R`بيقول «اعرض الفولدرين دول بس على الديسك». git بينزّل محتوى ملفاتهم ساعتها بس، والباقي مبيتلمسش.`,
            R`بيطبع الفولدرات اللي اخترتها، عشان تتأكد انت شايف إيه.`,
            R`بيرجّع كل الملفات تظهر على الديسك (و git هينزّل الناقص ساعتها)، والتاريخ والـ branch زي ما هم.`,
          ],
          try: R`ابني ريبو المعمل اللي في الشرح (٣٠ commit، وملف 200KB عشوائي بيتغيّر كل مرة)، وقارن [[du -sh .git]] لـ clone كامل و [[--depth 1]] و [[--filter=blob:none]] و [[--sparse]]. وبعدين في الـ shallow جرّب [[git describe --tags]] واقرا الغلط، وصلّحه.`,
          teach: R`## المعمل: ريبو تقيل على الجهاز

اتجرّب على Git Bash في ويندوز (Git 2.56)، والأوامر نفسها على لينكس والماك:

~~~bash
mkdir -p ~/lab/gitteam/sh && cd ~/lab/gitteam/sh
git init -q -b main work && cd work
mkdir -p apps/web apps/api docs
for i in $(seq 1 30); do
  head -c 200000 /dev/urandom > apps/web/bundle.bin
  echo "v$i" > apps/api/server.js
  echo "doc $i" > docs/guide.md
  git add -A && git commit -qm "release $i"
  [ $i = 10 ] && git tag v1.0.0
  [ $i = 25 ] && git tag v2.0.0
done
git switch -qc feature/pay && echo pay > apps/api/pay.js && git add . && git commit -qm "feat(pay): add pay" && git switch -q main
cd .. && git clone -q --bare work origin.git
~~~

- [[head -c 200000 /dev/urandom]]: ملف عشوائي 200KB. عشوائي عشان git ميعرفش يضغطه ولا يعمله delta، زي ملف build أو صورة.
- كل commit بيغيّر الملف ده، فالتاريخ فيه ٣٠ نسخة منه = حوالي 6MB.
- [[git clone --bare]]: نسخة «سيرفر» من غير ملفات شغل، هتلعب دور GitHub.

---

## ١. أول فخ: [[--depth]] على مسار محلي

~~~text git clone --depth 1 origin.git c1
Cloning into 'c1'...
warning: --depth is ignored in local clones; use file:// instead.
done.
~~~

و [[git -C c1 rev-parse --is-shallow-repository]] قال [[false]]: الـ clone المحلي بيعمل hardlinks للـ objects بدل ما ينقلها، فالـ depth اتجاهل. عشان تقلّد سيرفر حقيقي استخدم [[file://]]:

~~~bash
U="file://$(pwd)/origin.git"
git clone -q "$U" full
git clone -q --depth 1 "$U" shallow
for d in full shallow; do echo "$d: $(du -sh $d/.git | cut -f1) commits=$(git -C $d rev-list --count HEAD) shallow=$(git -C $d rev-parse --is-shallow-repository)"; done
~~~

~~~text الناتج
full: 5.9M commits=30 shallow=false
shallow: 274K commits=1 shallow=true
~~~

حوالي ٢٢ مرة أصغر. وعلى ريبو حقيقي في GitHub الفرق بيبقى من دقايق لثواني.

---

## ٢. جوه الـ shallow clone

~~~bash
cat shallow/.git/shallow
git -C shallow log --oneline --decorate
git -C shallow branch -r
~~~

~~~text الناتج
4df9fcfdda44bb0e07d7dae56c29a073d5291732
4df9fcf (grafted, HEAD -> main, origin/main, origin/HEAD) release 30
  origin/HEAD -> origin/main
  origin/main
~~~

- [[.git/shallow]]: ملف فيه هاش الـ commits اللي التاريخ «مقطوع» عندها. ده كل الفرق بين الـ shallow والعادي.
- [[grafted]]: الـ commit ده عنده parent في الحقيقة، بس git بيتعامل كأن مالوش. ومن غير [[--decorate]] مش هتشوفها لو الناتج رايح لـ pipe.
- [[feature/pay]] مش موجود: [[--depth]] بيعني [[--single-branch]]. لو محتاج كل الـ branches: [[--no-single-branch]]، أو بعدين:

~~~bash
git -C shallow remote set-branches origin '*'
git -C shallow fetch
git -C shallow config --get-all remote.origin.fetch
~~~

~~~text الناتج
+refs/heads/*:refs/remotes/origin/*
~~~

قبلها كانت [[+refs/heads/main:refs/remotes/origin/main]] بس، وده السبب إن [[git fetch]] العادي مكانش بيجيب branches تانية.

---

## ٣. الأوامر اللي بتبوظ في الـ shallow

### [[git describe]]

~~~text git -C shallow describe --tags
fatal: No names found, cannot describe anything.
~~~

الـ tags [[v1.0.0]] و [[v2.0.0]] على commits مش عندك، فـ [[describe]] مش لاقي tag يحسب منه. ده بالظبط اللي بيحصل في CI لما سكربت الإصدار يقع (درس «git و GitHub Actions»).

### [[merge-base]] و [[A...B]]

عملنا branch [[fix/old]] من commit قديم (قبل main بـ ١٠)، و clone بـ [[--depth 1 --no-single-branch]] (زي CI بيعمل fetch للـ PR والـ main بعمق ١):

~~~text الناتج
git merge-base origin/main origin/fix/old      ← رقم خروج 1 ومفيش ناتج
git diff --stat origin/main...origin/fix/old
fatal: origin/main...origin/fix/old: no merge base
~~~

[[...]] (تلات نقط) معناها «من النقطة اللي اتفرعوا منها»، والنقطة دي مش في التاريخ اللي عندك. ده الغلط اللي بتشوفه في CI بيفحص «الملفات اللي اتغيّرت في الـ PR».

### التكميل

~~~bash
git -C shallow fetch --deepen 4          # ٤ commits زيادة لورا
git -C shallow log --oneline --decorate | tail -2
git -C shallow fetch --unshallow         # الباقي كله
git -C shallow describe --tags
~~~

~~~text الناتج
8ab36bc release 27
695410e (grafted) release 26
v2.0.0-5-g4df9fcf
~~~

- [[--deepen 4]]: الـ grafted نزل من [[release 30]] لـ [[release 26]].
- [[--unshallow]]: التاريخ كله، و [[describe]] اشتغل: [[v2.0.0-5-g4df9fcf]] يعني «بعد [[v2.0.0]] بـ ٥ commits، وآخرهم [[4df9fcf]]».
- وفيه كمان [[--shallow-since=2026-01-01]] (من التاريخ ده) و [[--shallow-exclude=v1.0.0]] (لحد الـ tag ده).

---

## ٤. partial clone: كل التاريخ، من غير المحتوى القديم

~~~text git clone -q --filter=blob:none "$U" p1
warning: filtering not recognized by server, ignoring
~~~

السيرفر لازم يسمح بالـ filter. GitHub و GitLab بيسمحوا، وريبو bare بتاعك محتاج:

~~~bash
git -C origin.git config uploadpack.allowFilter true
git clone -q --filter=blob:none "$U" p2
du -sh p2/.git; git -C p2 rev-list --count HEAD
git -C p2 config --get remote.origin.promisor
~~~

~~~text الناتج
302K
30
true
~~~

- [[302K]] بس، و **كل** الـ ٣٠ commit موجودين: [[git log]] و [[git blame]] و [[describe]] شغّالين.
- [[promisor = true]]: الـ remote ده «وعد» إنه هيدّيك أي object ناقص. فلما تعمل [[git log -p]] على ملف قديم git بينزّله ساعتها (الحجم بقى 308K بعد ما فتحنا نسخة قديمة من [[server.js]]).
- العيب: كل أمر محتاج محتوى قديم بيعمل اتصال بالسيرفر، فمن غير نت هيقع.

| الطريقة | التاريخ | محتوى الملفات القديمة | الحجم في المعمل |
|---|---|---|---|
| clone عادي | كامل | كله عندك | 5.9M |
| [[--depth 1]] | آخر commit بس | الأخير بس | 274K |
| [[--filter=blob:none]] | كامل | بينزل لما تحتاجه | 302K |
| [[--filter=blob:none --sparse]] و [[set apps/api]] | كامل | الفولدر ده بس | 109K |

وفيه كمان [[--filter=blob:limit=1m]]: نزّل كل حاجة ماعدا الملفات اللي أكبر من 1MB.

---

## ٥. sparse-checkout: فولدرات معينة بس

~~~bash
git clone -q --filter=blob:none --sparse "$U" sp
ls sp
git -C sp sparse-checkout set apps/api
ls -R sp
git -C sp status | sed -n 4p
~~~

~~~text الناتج
sp:
apps

sp/apps:
api

sp/apps/api:
server.js
You are in a sparse checkout with 34% of tracked files present.
~~~

- بعد [[--sparse]] مباشرة [[ls sp]] فاضي: في الـ cone mode بيظهر الملفات اللي في أول الريبو بس، وريبونا مفيهوش ملفات هناك.
- [[set apps/api]]: [[apps/web]] و [[docs]] مش على الديسك، بس لسه في الريبو ([[git ls-files]] بيطبعهم). وأي commit بتعمله بيحافظ عليهم زي ما هم.

~~~bash
git -C sp sparse-checkout add docs
git -C sp sparse-checkout list
cat sp/.git/info/sparse-checkout
~~~

~~~text الناتج
apps/api
docs
/*
!/*/
/apps/
!/apps/*/
/apps/api/
/docs/
~~~

- [[add]] بيزوّد على اللي موجود، و [[set]] بيستبدل.
- الملف [[.git/info/sparse-checkout]] هو اللي git بيقراه، وده شكله في الـ cone mode (الافتراضي، و [[core.sparseCheckoutCone]] = [[true]]): كل الملفات في أول الريبو، ومن كل فولدر في الطريق ملفاته المباشرة، والفولدرات اللي اخترتها كاملة.

~~~text git -C sp sparse-checkout set 'apps/web/*.bin'
fatal: specify directories rather than patterns.  If your directory really has any of '*?[]\' in it, pass --skip-checks
~~~

الـ cone mode فولدرات بس، وده اللي بيخليه سريع في ريبوهات فيها ملايين ملف. لو محتاج patterns فيه [[--no-cone]]، بس الوثائق بتقول إنه أبطأ ومش منصوح بيه.

و [[git sparse-checkout disable]] بيرجّع كل حاجة (والحجم بقى 320K لأن محتوى [[apps/web]] نزل).

---

## ٦. تختار إيه؟

| الحالة | الأنسب |
|---|---|
| CI بيبني ويختبر آخر commit بس | [[--depth 1]] (الافتراضي في [[actions/checkout]]) |
| CI محتاج tags أو changelog أو مقارنة بـ main | [[fetch-depth: 0]] أو [[--filter=blob:none]] |
| جهازك، ريبو تاريخه تقيل (ملفات كبيرة اتغيّرت كتير) | [[--filter=blob:none]]: التاريخ كامل وخفيف |
| monorepo وانت شغّال في جزء واحد | [[--filter=blob:none --sparse]] و [[sparse-checkout set]] |
| عايز الملفات بس من غير git خالص | [[git archive]] أو [[--depth 1]] وامسح [[.git]] |

وخد بالك: الـ shallow clone **مش** حل لريبو بقى تقيل عشان حد رفع ملف 2GB زمان: ده بيتحل بـ Git LFS (درس «submodule و lfs») أو بإعادة كتابة التاريخ.

---

## على PowerShell

نفس أوامر git بالظبط. بس الـ URL المحلي: [[file:///C:/lab/gitteam/sh/origin.git]] (تلات [[/]] و [[/]] مش [[\]])، والحجم بـ [[(Get-ChildItem -Recurse -File .git | Measure-Object Length -Sum).Sum]] بدل [[du]].`,
          deep: {
            why: R`ريبوهات الشركات بتكبر بسرعة: ملفات build اترفعت بالغلط، وصور، و monorepo فيه ٥٠ مشروع. clone كامل في كل CI job بيضيّع دقايق ومساحة، و clone كامل على لابتوب لفولدر واحد بتشتغل فيه مالوش لازمة. الطرق التلاتة بتخليك تدفع بس تمن اللي بتستخدمه.`,
            how: R`الـ shallow clone بيكتب الهاشات اللي التاريخ مقطوع عندها في [[.git/shallow]]، وأي أمر بيمشي في الـ parents بيقف عندها كأنها أول commit. الـ partial clone بيطلب من السيرفر (protocol v2) pack من غير blobs، وبيعلّم الـ remote إنه [[promisor]]: أي object ناقص git بيطلبه لوحده وقت الحاجة. و sparse-checkout بيأثر على الـ working tree والـ index بس: الملفات اللي برة الـ cone بتتعلم [[skip-worktree]] في الـ index، فالـ commit بيحتفظ بيهم من غير ما يبقوا على الديسك. والتلاتة ممكن يتجمعوا.`,
            when: R`[[--depth 1]] في CI وأي سكربت deploy بيحتاج آخر نسخة بس. و [[--filter=blob:none]] على جهازك في ريبو تقيل، لأنه بيسيب [[log]] و [[blame]] و [[describe]] شغّالين. و sparse-checkout في monorepo. ولما خطوة في CI محتاجة التاريخ (tags، changelog، diff مع main) زوّد العمق للخطوة دي بس.`,
            mistakes: R`[[--depth]] على مسار محلي فيتجاهل وانت فاكره اشتغل. وتنسى إن [[--depth]] بيجيب branch واحد فتدوّر على branch مش موجود. و [[git describe]] أو [[A...B]] في CI shallow فيقع بـ [[No names found]] أو [[no merge base]]. و [[git push]] من shallow clone لريبو تاني فاضي (بيترفض لأن التاريخ ناقص). و partial clone وانت هتشتغل من غير نت. و patterns في cone mode. وتفتكر إن [[sparse-checkout]] بيقلل حجم [[.git]] لوحده (من غير [[--filter]] كل الـ objects بتنزل برضه).`
          },
          sol: R`في المعمل: [[full: 5.9M]] و [[shallow: 274K]]، و [[git describe --tags]] في الـ shallow طبع [[fatal: No names found, cannot describe anything.]]. والحل [[git fetch --unshallow]] وبعده [[v2.0.0-5-g...]] (الهاش بتاعك). و [[--filter=blob:none]] بعد [[uploadpack.allowFilter true]] حوالي 300K و [[rev-list --count]] = 30، و [[--sparse]] مع [[set apps/api]] حوالي 110K.

الأحجام ممكن تختلف شوية عندك (الضغط والـ filesystem)، بس النسبة نفسها. اتجرّب على Git Bash (Git 2.56) في ويندوز.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: كل واحد من دول بيقص إيه (التاريخ ولا محتوى الملفات القديمة ولا الفولدرات): [[--depth 1]]، و [[--filter=blob:none]]، و [[sparse-checkout set apps/api]]، و [[--single-branch]]؟`, done: R`كتبت: التاريخ، ومحتوى الملفات القديمة، والفولدرات على الديسك، و branches تانية. وقلت إن [[--depth]] بيعمل [[--single-branch]] ضمنيًا.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: على ريبو المعمل قيس الوقت والحجم لأربع طرق ([[time git clone ...]] و [[du -sh .git]]): عادي، و [[--depth 1]]، و [[--filter=blob:none]]، و [[--filter=blob:none --sparse]] بعد [[set apps/api]]. واعمل جدول.`, done: R`الجدول فيه ٤ صفوف بالحجم والوقت، والـ shallow والـ sparse الأصغر، والعادي حوالي 6MB، وكتبت جملة: أنهي واحد هتختاره لـ CI وأنهي لجهازك وليه.` },
            { lvl: 'تطبيق', t: R`صلّح الـ CI البايظ ده: خطوة بتعمل [[git clone --depth 1 "$URL" app && cd app && git describe --tags > VERSION]] وبتقع. اكتب ٣ طرق تصلّحها، وجرّب كل واحدة على المعمل، وقول أنهي أخف.`, done: R`الطرق: [[--unshallow]] بعد الـ clone، و clone بـ [[--filter=blob:none]] بدل [[--depth]]، و [[git fetch --depth=1 origin "refs/tags/*:refs/tags/*"]] مع حساب الرقم بطريقة تانية. التلاتة اشتغلوا (أو كتبت ليه التالتة بتدّي tag من غير عدد الـ commits)، واخترت [[--filter=blob:none]] بالحجم.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في shallow clone بعمق ١ من غير [[--no-single-branch]]، توقّع ناتج: [[git branch -r]]، و [[git log --oneline | wc -l]]، و [[git switch feature/pay]]. وبعدين نفّذ.`, done: R`توقعت: [[origin/main]] بس، و [[1]]، و [[switch]] بيقول إنه مش لاقي [[feature/pay]] (رسالة [[invalid reference]])، والنتيجة طابقت، وبعد [[remote set-branches origin '*']] و [[fetch]] الـ switch اشتغل.` },
            { lvl: 'تحدي', t: R`ابني [[changed-in-pr.sh <base-branch>]] بيطبع الملفات اللي اتغيّرت في الـ branch الحالي مقارنة بالـ base، ويشتغل صح حتى في shallow clone: لو [[git merge-base]] فشل، يعمل [[git fetch --deepen 50]] ويحاول تاني، لحد ٥ مرات، وبعدين [[--unshallow]].`, done: R`على clone بعمق ١ فيه [[fix/old]] (اتفرع قبل main بـ ١٠) بيطبع [[apps/api/fix.js]] بس، وبيطبع على stderr كام مرة عمل deepen، وعلى clone كامل مبيعملش fetch خالص.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[git help clone]] و [[git help sparse-checkout]]: إيه الفرق بين [[--filter=blob:none]] و [[--filter=tree:0]]؟ وإيه اللي [[git sparse-checkout reapply]] بيعمله؟ جرّب الاتنين على المعمل.`, done: R`كتبت إن [[tree:0]] كمان مبينزّلش الـ trees القديمة (أخف بس [[git log -- path]] بيبقى أبطأ لأنه بينزّل trees)، وجرّبته وقست الحجم، وإن [[reapply]] بيطبّق القواعد تاني على الملفات بعد merge أو تغيير يدوي.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q -b main work && cd work
mkdir -p apps/web apps/api docs
for i in 1 2 3 4 5 6; do echo "v$i" > apps/api/server.js; echo "w$i" > apps/web/app.js; echo "d$i" > docs/guide.md; git add -A; git commit -qm "release $i"; [ $i = 2 ] && git tag v1.0.0; done
cd .. && git clone -q --bare work origin.git
git -C origin.git config uploadpack.allowFilter true
U="file://$(pwd)/origin.git"
git clone -q --depth 1 "$U" shallow
echo "shallow=$(git -C shallow rev-parse --is-shallow-repository) count=$(git -C shallow rev-list --count HEAD)"
git -C shallow describe --tags 2>&1 | head -1
git -C shallow fetch -q --unshallow
echo "after: $(git -C shallow describe --tags) count=$(git -C shallow rev-list --count HEAD)"
git clone -q --filter=blob:none --sparse "$U" sp
git -C sp sparse-checkout set apps/api
echo "dirs: $(ls sp/apps) list=$(git -C sp sparse-checkout list)"
echo "tracked=$(git -C sp ls-files | wc -l | tr -d ' ')"`, expect: [R`shallow=true count=1`, R`No names found`, R`after: v1.0.0-4-g`, R`count=6`, R`dirs: api list=apps/api`, R`tracked=3`] },
          ],
        },
        {
          cmd: "branch protection و CODEOWNERS",
          title: "محدش يكتب على main مباشرة: branch protection و CODEOWNERS على GitHub، ونفس الفكرة على ريبو bare بتاعك",
          learn: R`تعرف الحماية بتمنع إيه بالظبط وبتتكسر إزاي، وتعرف صاحب كل ملف من CODEOWNERS، وتعمل حماية حقيقية على سيرفر git بتاعك بـ [[receive.*]] و [[pre-receive]].`,
          out: R`[[git push origin main]] بيطلّع [[(pre-receive hook declined)]]، و [[git push --force]] بيطلّع [[(non-fast-forward)]]، و push لـ branch بيعدّي.`,
          desc: R`الـ hooks على جهازك بيتخطوا بـ [[--no-verify]]. الحماية الحقيقية لازم تبقى **على السيرفر** اللي بيستقبل الـ push. على GitHub ده اسمه branch protection (أو rulesets، الأحدث): قواعد على main زي «لازم PR»، و «لازم approval»، و «لازم الـ CI يعدّي»، و «ممنوع force push»، و «ممنوع المسح». و CODEOWNERS ملف بيقول كل مسار مين صاحبه، فـ GitHub يطلب مراجعته أوتوماتيك، ولو القاعدة «Require review from Code Owners» شغّالة يبقى لازم موافقته.

ومن غير GitHub (ريبو bare على سيرفرك، أو Gitea و GitLab بنفس الفكرة) الحماية دي بتتعمل بإعدادات [[receive.denyNonFastForwards]] و [[receive.denyDeletes]] و hook اسمه [[pre-receive]] بيرفض أي push على main. ودي اتجرّبت كلها في المعمل. أما شاشات GitHub ورسايله فمن وثائق GitHub الرسمية، لأنها محتاجة ريبو حقيقي على حساب.`,
          example: R`cat .github/CODEOWNERS
python owners.py .github/CODEOWNERS
git -C hub.git config receive.denyNonFastForwards true
git -C hub.git config receive.denyDeletes true
git push --force origin main
git push origin main
git push origin HEAD:fix/v2
gh ruleset check main`,
          lines: [
            R`بيعرض ملف CODEOWNERS: كل سطر مسار (بقواعد شبه [[.gitignore]]) وبعده أصحابه ([[@user]] أو [[@org/team]]).`,
            R`سكربت صغير في المعمل بيطبع صاحب كل ملف بنفس قاعدة GitHub: **آخر سطر بيطابق هو اللي بيكسب**. مفيد عشان تتأكد من الملف قبل ما ترفعه.`,
            R`على الريبو اللي على السيرفر (bare): ارفض أي push بيمسح commits من التاريخ (force push).`,
            R`وارفض مسح أي branch أو tag عن طريق push.`,
            R`تجربة: force push بعد [[--amend]]. السيرفر بيرفض والرسالة فيها [[(non-fast-forward)]].`,
            R`push عادي على main بعد ما حطينا [[pre-receive]]: بيترفض برسالة الـ hook، و [[(pre-receive hook declined)]].`,
            R`نفس الـ commit على branch جديد بيعدّي. ده شكل «افتح PR» على أي سيرفر.`,
            R`بـ GitHub CLI: بيطبع القواعد اللي بتنطبق على main في الريبو الحالي (من وثائق [[gh]]، محتاج ريبو على GitHub).`,
          ],
          try: R`ابني المعمل اللي في الشرح: [[hub.git]] bare، و clone اسمه [[ali]]. فعّل [[receive.denyNonFastForwards]] وجرّب [[push --force]]، وبعدين حط الـ [[pre-receive]] وجرّب push على main و push على [[fix/v2]]. وفي ريبو تاني اعمل ملف CODEOWNERS وشغّل [[owners.py]] عليه.`,
          teach: R`## العَرَض اللي بيخلّيك تحتاج ده

حد عمل [[git push --force]] على main بعد rebase، و ٣ commits بتوع زمايله اختفوا. أو حد عدّل ملف الـ payments من غير ما فريق الـ payments يشوفه. أو PR اتدمج والـ CI أحمر. كل ده بيتمنع بقواعد على السيرفر، مش بـ «خلي بالك».

---

## ١. على GitHub: branch protection و rulesets (من الوثائق)

من Settings ثم Branches (القديمة) أو Rules ثم Rulesets (الأحدث). أهم القواعد لـ main:

| القاعدة | بتمنع إيه |
|---|---|
| Require a pull request before merging | أي [[git push origin main]] مباشر. لازم يدخل من PR |
| Required approvals (رقم) | دمج PR من غير موافقة عدد معين من الناس |
| Dismiss stale approvals | إن حد ياخد approval وبعدين يزوّد commits من غير مراجعة |
| Require review from Code Owners | دمج PR بيلمس ملف ليه صاحب في CODEOWNERS من غير موافقته |
| Require status checks to pass | دمج PR والـ CI بتاعه أحمر أو لسه شغّال |
| Require branches to be up to date | دمج PR مبني على main قديم |
| Require linear history | merge commits (لازم squash أو rebase) |
| Block force pushes | [[--force]] على الـ branch ده |
| Restrict deletions | مسح الـ branch |

ولما حد يعمل push مباشر على branch محمي، الرسالة (من وثائق GitHub) شكلها:

~~~text الناتج (من الوثائق)
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Changes must be made through a pull request.
 ! [remote rejected] main -> main (protected branch hook declined)
~~~

ومع الـ rulesets الكود [[GH013]] و [[Repository rule violations found for refs/heads/main]]. لاحظ [[hook declined]]: GitHub من جوه بيعمل نفس اللي هنعمله تحت بـ [[pre-receive]].

ومن الترمنال: [[gh ruleset list]] و [[gh ruleset check main]] بيطبعوا القواعد. ولو انت لوحدك في الريبو و «Required approvals» = ١، هتقفل على نفسك لأن GitHub مبيسمحش تعمل approve لـ PR بتاعك (تفاصيل في درس «CODEOWNERS و rulesets» في تاب هندسة البرمجيات).

---

## ٢. CODEOWNERS: مين صاحب إيه

الملف في [[.github/CODEOWNERS]] أو أول الريبو أو [[docs/CODEOWNERS]] (GitHub بياخد أول واحد يلاقيه بالترتيب ده):

~~~text .github/CODEOWNERS
# العام الأول، والخاص بعده: آخر سطر بيطابق هو اللي بيكسب
*                    @acme-co/web
/src/payments/       @acme-co/payments @mona
/prisma/migrations/  @acme-co/backend
*.md                 @acme-co/docs
/package.json
~~~

- [[*]]: كل حاجة، لفريق [[web]]. لازم يبقى **الأول**، لأن لو جه في الآخر هيكسب على كل اللي قبله.
- [[/src/payments/]]: [[/]] في الأول = من أول الريبو، و [[/]] في الآخر = الفولدر بكل اللي جواه.
- [[*.md]]: أي ملف [[.md]] في أي مكان.
- [[/package.json]] من غير أصحاب: معناها «الملف ده ملوش صاحب» (حتى لو [[*]] فوق).

### اتأكد من الملف قبل ما ترفعه

GitHub بيعلّم الأخطاء في صفحة الملف، بس محتاج تعرف قبلها «الـ PR ده هيروح لمين». سكربت صغير بنفس قاعدة آخر سطر (نسخة مبسطة: بيفهم [[/]] في الأول والآخر و [[*]]، مش كل قواعد gitignore):

~~~python owners.py
import fnmatch, subprocess, sys

def match(pat, path):
    anchored = pat.startswith("/")
    pat = pat.lstrip("/")
    if pat.endswith("/"):                     # فولدر: كل اللي جواه
        return path.startswith(pat) if anchored else ("/" + pat) in "/" + path
    if "/" not in pat:                         # اسم أو *.md: في أي مكان
        return fnmatch.fnmatch(path.rsplit("/", 1)[-1], pat)
    return fnmatch.fnmatch(path, pat)

rules = []
for line in open(sys.argv[1], encoding="utf-8"):
    line = line.split("#", 1)[0].split()
    if line:
        rules.append((line[0], line[1:]))

files = subprocess.run(["git", "ls-files", "--others", "--cached", "--exclude-standard"],
                       capture_output=True, text=True).stdout.split()
for f in sorted(files):
    owners = None
    for pat, who in rules:                     # آخر واحد بيطابق بيكسب
        if match(pat, f):
            owners = who
    print(f"{f:32} {' '.join(owners) if owners else '(no owner)'}")
~~~

~~~text python owners.py .github/CODEOWNERS
.github/CODEOWNERS               @acme-co/web
.github/workflows.yml            @acme-co/web
docs/setup.md                    @acme-co/docs
package.json                     (no owner)
prisma/migrations/001.sql        @acme-co/backend
src/cart/cart.js                 @acme-co/web
src/payments/README.md           @acme-co/docs
src/payments/charge.js           @acme-co/payments @mona
~~~

بص على [[src/payments/README.md]]: راح لـ [[@acme-co/docs]] مش لفريق الـ payments، لأن [[*.md]] جه **بعد** [[/src/payments/]]. ده غالبًا مش اللي كاتب الملف كان عايزه، والسكربت مسكه قبل أي PR.

قواعد من وثائق GitHub لازم تعرفها:
- الأصحاب لازم يبقى عندهم صلاحية write على الريبو، وإلا السطر بيتجاهَل.
- [[!]] (النفي) و [[[a-z]]] مش مدعومين في CODEOWNERS، مع إنهم شغّالين في [[.gitignore]].
- CODEOWNERS لوحده **بيطلب** المراجعة بس. اللي **بيفرضها** قاعدة «Require review from Code Owners».
- الملف نفسه ليه صاحب ([[@acme-co/web]] هنا)، وده مهم: اللي يقدر يعدّل CODEOWNERS يقدر يشيل نفسه من أي حماية.

---

## ٣. نفس الحماية على ريبو bare بتاعك (اتجرّبت)

### المعمل

~~~bash
mkdir -p ~/lab/gitteam/bp && cd ~/lab/gitteam/bp
git init -q --bare -b main hub.git
git clone -q hub.git ali && cd ali
echo v1 > app.js && git add . && git commit -qm "feat: v1" && git push -q origin main
cd ..
~~~

### ممنوع force push وممنوع المسح

~~~bash
git -C hub.git config receive.denyNonFastForwards true
git -C hub.git config receive.denyDeletes true
cd ali && git commit -q --amend -m "feat: v1 (edited)"
git push --force origin main
git push origin --delete main
~~~

~~~text الناتج
remote: error: denying non-fast-forward refs/heads/main (you should pull first)
 ! [remote rejected] main -> main (non-fast-forward)
error: failed to push some refs to '.../hub.git'
remote: error: denying ref deletion for refs/heads/main
 ! [remote rejected] main (deletion prohibited)
~~~

- [[--amend]] عمل commit جديد بهاش جديد مكان القديم، فالـ push محتاج يشيل commit من التاريخ اللي على السيرفر = non-fast-forward.
- [[--force]] على جهازك بيقول «ابعت حتى لو هتمسح»، بس السيرفر هو اللي بيقرر. ده الفرق بين القاعدة على السيرفر والـ hook على جهازك.
- [[remote:]] في أول السطر = الكلام ده جاي من السيرفر.

### ممنوع push مباشر على main: [[pre-receive]]

على السيرفر، git بيشغّل [[hooks/pre-receive]] قبل ما يقبل أي حاجة، وبيدّيله على الـ stdin سطر لكل ref: [[old new ref]]:

~~~bash
cat > hub.git/hooks/pre-receive <<'EOF'
#!/bin/sh
while read old new ref; do
  if [ "$ref" = "refs/heads/main" ]; then
    echo "main محمي: افتح PR من branch" >&2
    exit 1
  fi
done
exit 0
EOF
chmod +x hub.git/hooks/pre-receive
~~~

~~~text git push origin main (بعد commit جديد)
remote: main محمي: افتح PR من branch
 ! [remote rejected] main -> main (pre-receive hook declined)
error: failed to push some refs to '.../hub.git'
~~~

و [[git push origin HEAD:fix/v2]] عدّى. والـ [[pre-receive]] ده **مبيتخطاش** بـ [[--no-verify]]، لأنه مش على جهاز اللي بيعمل push.

- لو أي سطر في الـ stdin اترفض، الـ push **كله** بيترفض (ولو بتبعت ٣ branches مع بعض).
- فيه كمان [[update]]: بيتشغّل مرة لكل ref لوحده، فتقدر ترفض واحد وتقبل الباقي.
- و [[post-receive]] بعد القبول: مكان الـ deploy أو الإشعار، ومبيقدرش يرفض.

وفي [[pre-receive]] حقيقي بتسمح لحد معين (bot الـ release مثلًا): متغيّر بيتحط من [[authorized_keys]] ([[command="..."]] أو [[environment=]])، أو [[git push -o]] و [[GIT_PUSH_OPTIONS]] لو السيرفر مفعّل [[receive.advertisePushOptions]].

---

## ٤. الحماية بتتكسر إزاي (عشان متتفاجئش)

| الثغرة | الحل |
|---|---|
| الأدمن مسموحله يتخطى (bypass) | قاعدة «Do not allow bypassing» أو bypass لـ bot بس |
| اسم الـ check اتغيّر في الـ workflow، فالـ PR مستني check عمره ما هييجي | راجع الـ required checks بعد أي تغيير في أسماء الـ jobs |
| CODEOWNERS لـ [[*]] في الآخر | العام الأول دايمًا، وشغّل [[owners.py]] |
| حد يعدّل CODEOWNERS نفسه في PR | الملف ليه صاحب، و «Require review from Code Owners» |
| التاج مش محمي | rulesets على [[refs/tags/v*]] كمان |
| الحماية على GitHub بس، وفيه mirror تاني بيتعمله push | نفس القواعد على كل سيرفر |

---

## الخلاصة

| عايز تمنع | على GitHub | على ريبو bare بتاعك |
|---|---|---|
| force push | Block force pushes | [[receive.denyNonFastForwards]] |
| مسح الـ branch | Restrict deletions | [[receive.denyDeletes]] |
| push مباشر | Require a pull request | [[pre-receive]] يرفض [[refs/heads/main]] |
| دمج والـ CI أحمر | Require status checks | [[pre-receive]] يشغّل الفحص (أبطأ) |
| مراجعة صاحب الملف | CODEOWNERS و Require review from Code Owners | trailer [[Approved-by:]] يتفحص في [[pre-receive]] |`,
          deep: {
            why: R`أي قاعدة على جهاز المطوّر (hook، أو [[alias]]، أو «خلي بالك») ممكن تتخطى بالغلط أو عمدًا. الـ branch اللي بيتعمل منه deploy أو release لازم يكون محمي في المكان الوحيد اللي كل push لازم يعدّي عليه: السيرفر. و CODEOWNERS بيحل مشكلة تانية: إن الشخص الصح يشوف التغيير قبل ما يدخل، من غير ما حد يفتكر يضيفه.`,
            how: R`لما تعمل push، الـ client بيبعت للسيرفر لستة «غيّر الـ ref ده من الهاش ده للهاش ده» ومعاها الـ objects. السيرفر قبل ما يحدّث أي ref بيشغّل الفحوصات: [[receive.denyNonFastForwards]] بيتأكد إن الهاش القديم ancestor للجديد، و [[pre-receive]] بياخد كل السطور مرة واحدة ولو خرج بغير صفر مفيش ولا ref بيتحدّث، و [[update]] لكل ref لوحده. والرد بيرجع للـ client كـ [[remote rejected]] مع السبب، وأي حاجة الـ hook كتبها على stdout أو stderr بتظهر عندك قبلها [[remote:]]. و GitHub بيعمل نفس الحكاية من جوه ومعاها بيانات الـ PR والـ checks والـ reviews.`,
            when: R`main وأي branch بيتعمل منه release أو deploy، والـ tags بتاعة الإصدارات. وفي ريبو شخصي على الأقل «Block force pushes» و «Require status checks». و CODEOWNERS لما الريبو فيه أجزاء ليها ناس مسؤولة عنها (payments، و migrations، و workflows، و infrastructure).`,
            mistakes: R`CODEOWNERS فيه [[*]] في الآخر فبيلغي كل اللي قبله. وشخص واحد صاحب كل حاجة فبيبقى bottleneck. و required check باسم قديم فكل الـ PRs واقفة. و bypass للكل «عشان الطوارئ». وتحط الحماية على main وتنسى الـ tags. وتكتب [[pre-receive]] من غير [[chmod +x]] على السيرفر فمبيشتغلش ومبيقولش. وتفتكر إن [[git push --force]] اترفض بسبب جهازك فتدوّر في الإعدادات المحلية، والـ [[remote:]] في أول السطر بيقول إنه السيرفر.`
          },
          sol: R`[[git push --force origin main]]: [[remote: error: denying non-fast-forward refs/heads/main (you should pull first)]] و [[(non-fast-forward)]]. و [[git push origin --delete main]]: [[(deletion prohibited)]]. وبعد الـ [[pre-receive]]: [[remote: main محمي: افتح PR من branch]] و [[(pre-receive hook declined)]]، و [[git push origin HEAD:fix/v2]] بيعدّي. و [[owners.py]] بيطبع [[src/payments/README.md]] لـ [[@acme-co/docs]].

اتجرّب على Git Bash (Git 2.56) و Python 3.14 على ويندوز. شاشات GitHub ورسايل [[GH006]] و [[GH013]] و [[gh ruleset]] من وثائق GitHub الرسمية ومش متجرّبة (محتاجة ريبو على حساب).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: في الملف ده مين صاحب [[src/payments/README.md]] و [[src/payments/charge.js]] و [[docs/api.md]]؟ [[*.md @docs]] ثم [[* @web]] ثم [[/src/payments/ @pay]].`, done: R`كتبت التلاتة [[@pay]] و [[@pay]] و [[@web]]، وقلت ليه: [[*]] جه بعد [[*.md]] فكسب عليه في [[docs/api.md]]، و [[/src/payments/]] آخر واحد فكسب في الاتنين التانيين، وكتبت الترتيب الصح.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: على [[hub.git]] بـ [[denyNonFastForwards]]، توقّع إيه اللي هيحصل في كل واحدة: (١) [[git revert HEAD]] و push، (٢) [[git reset --hard HEAD~1]] و [[push --force]]، (٣) [[git push --force-with-lease]] بعد [[--amend]]. وجرّب.`, done: R`توقعت (١) بيعدّي لأن الـ revert commit جديد فوق القديم، و (٢) و (٣) بيترفضوا بـ [[non-fast-forward]] لأن [[--force-with-lease]] بيحمي من الـ overwrite على جهازك بس مش بيتخطى السيرفر، والنتيجة طابقت.` },
            { lvl: 'تطبيق', t: R`ابني [[pre-receive]] بيرفض أي commit جديد رسالته مش Conventional Commits، على أي branch. (لكل سطر [[old new ref]]: الـ commits الجديدة [[git rev-list old..new]]، ولو [[old]] أصفار: [[git rev-list new --not --all]].) ويطبع الهاش والرسالة الغلط.`, done: R`push فيه commit [[updated stuff]] بيترفض و [[remote:]] بيطبع الهاش المختصر والرسالة، و push برسايل سليمة بيعدّي، وأول push لـ branch جديد بيفحص الـ commits الجديدة بس مش التاريخ كله.` },
            { lvl: 'تطبيق', t: R`صلّح CODEOWNERS ده عشان الـ payments تروح لفريقها حتى ملفات [[.md]] جواها، وملف [[package.json]] يبقى لفريق [[@acme-co/platform]]: [[/src/payments/ @acme-co/payments]] ثم [[*.md @acme-co/docs]] ثم [[* @acme-co/web]]. واتأكد بـ [[owners.py]].`, done: R`الترتيب الجديد: [[*]] الأول، وبعده [[*.md]]، وبعده [[/src/payments/]]، و [[/package.json @acme-co/platform]]. و [[owners.py]] بيطبع [[src/payments/README.md]] لـ [[@acme-co/payments]] و [[package.json]] لـ [[@acme-co/platform]].` },
            { lvl: 'تحدي', t: R`زوّد [[owners.py]]: [[--diff <base>]] يطبع أصحاب الملفات اللي اتغيّرت بس ([[git diff --name-only base...HEAD]])، ومن غير تكرار، و [[--unowned]] يخرج بـ ١ لو فيه ملف جديد ملوش صاحب (عشان يتشغّل في CI).`, done: R`على branch غيّر [[src/payments/charge.js]] و [[docs/setup.md]]: [[--diff main]] بيطبع [[@acme-co/payments @mona @acme-co/docs]]، و [[--unowned]] بعد ما تزوّد ملف تحت [[/package.json]]-style rule فاضية بيخرج بـ ١ ويطبع اسمه.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: الفرق بين hook [[pre-push]] على جهازه و [[pre-receive]] على السيرفر و «Require a pull request» على GitHub، ومين فيهم يقدر يتخطاه وإزاي.`, done: R`الشرح فيه: [[pre-push]] بيتخطى بـ [[--no-verify]] أو بمسحه، و [[pre-receive]] مبيتخطاش غير من حد عنده صلاحية على السيرفر نفسه، وقاعدة GitHub بتتخطى بالـ bypass لو مسموح، والضمان الحقيقي في الاتنين اللي على السيرفر.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q --bare -b main hub.git
git clone -q hub.git ali 2>/dev/null && cd ali
echo v1 > app.js && git add . && git commit -qm "feat: v1" && git push -q origin main && cd ..
git -C hub.git config receive.denyNonFastForwards true
git -C hub.git config receive.denyDeletes true
cd ali
git commit -q --amend -m "feat: v1 edited"
git push --force origin main 2>&1 | grep -o 'non-fast-forward' | head -1
git push origin --delete main 2>&1 | grep -o 'deletion prohibited'
cat > ../hub.git/hooks/pre-receive <<'EOF'
#!/bin/sh
while read old new ref; do
  if [ "$ref" = "refs/heads/main" ]; then echo "main is protected: open a PR" >&2; exit 1; fi
done
EOF
chmod +x ../hub.git/hooks/pre-receive
git reset -q --hard origin/main && echo v2 > app.js && git commit -qam "fix: v2"
git push origin main 2>&1 | grep -oE 'main is protected: open a PR|pre-receive hook declined'
git push -q origin HEAD:fix/v2 && echo "branch push ok"`, expect: [R`non-fast-forward`, R`deletion prohibited`, R`main is protected: open a PR`, R`pre-receive hook declined`, R`branch push ok`] },
          ],
        },
        {
          cmd: "includeIf",
          title: "إيميل الشغل في فولدر الشغل لوحده: includeIf وفخاخه",
          learn: R`تخلّي git يختار الهوية (والإعدادات) حسب مكان الريبو أو الـ branch أو الـ remote، وتعرف الإعداد جاي من أنهي ملف، وتلاقي ليه الشرط مش بيشتغل.`,
          out: R`[[git config --show-origin --show-scope user.email]] في [[~/work/shop-api]] بيطبع [[global	file:~/.gitconfig-work	ali@acme-co.example]].`,
          desc: R`عندك إيميل شغل وإيميل شخصي، وكل مرة بتعمل commit في ريبو الشغل بالإيميل الشخصي (أو العكس) والنشر بيتقفل أو التاريخ بيتلخبط. الحل: [[includeIf]] في [[~/.gitconfig]]: «لو الريبو تحت [[~/work/]]، اقرا كمان ملف [[~/.gitconfig-work]]». والملف ده فيه [[user.email]] بتاع الشغل (وممكن [[core.sshCommand]] بمفتاح الشغل، و [[commit.gpgsign]]...).

الشروط المتاحة: [[gitdir:]] (مكان الريبو)، و [[gitdir/i:]] (من غير فرق كابيتال وسمول)، و [[onbranch:]] (اسم الـ branch)، و [[hasconfig:remote.*.url:]] (عنوان الـ remote، من Git 2.36).

والمهم إن الشرط لو مااتطابقش **git مبيقولش حاجة**: لا غلط ولا تحذير. فأي حرف غلط (من غير [[/]] في الآخر، أو [[Work]] بدل [[work]]، أو اسم ملف غلط) = الإيميل الشخصي هو اللي هيشتغل بهدوء. و [[git config --show-origin]] هو اللي بيكشف ده.`,
          example: R`git config --global user.email ali@personal.example
git config --global includeIf."gitdir:~/work/".path "~/.gitconfig-work"
git config --file ~/.gitconfig-work user.email ali@acme-co.example
cd ~/work/shop-api && git config --show-origin --show-scope user.email
git var GIT_AUTHOR_IDENT
git config --global includeIf."hasconfig:remote.*.url:https://github.com/acme-co/**".path "~/.gitconfig-work"`,
          lines: [
            R`الإيميل الافتراضي (الشخصي) في [[~/.gitconfig]]. ده اللي هيشتغل في أي ريبو مش تحت [[~/work/]].`,
            R`بيضيف في [[~/.gitconfig]] قسم [[[includeIf "gitdir:~/work/"]]] وجواه [[path]]. الـ [[/]] في آخر [[~/work/]] معناها «الفولدر ده وكل اللي تحته».`,
            R`[[--file]] بيكتب في ملف معين بدل global أو local: هنا ملف إعدادات الشغل، وفيه الإيميل بتاعه بس.`,
            R`جوه ريبو تحت [[~/work]]: [[--show-origin]] بيقول الإعداد جاي من أنهي ملف، و [[--show-scope]] بيقول global ولا local ولا system.`,
            R`بيطبع الهوية اللي git **هيستخدمها فعلًا** في الـ commit الجاي، بعد ما يحسب كل الملفات والشروط.`,
            R`شرط تاني: لو أي remote في الريبو عنوانه على [[acme-co]] في GitHub، حمّل نفس الملف. مفيد لو ريبوهات الشغل مش في فولدر واحد.`,
          ],
          try: R`من غير ما تلمس إعداداتك الحقيقية: اعمل فولدر [[~/lab/gitteam/inc/home]] وشغّل كل الأوامر بـ [[HOME=~/lab/gitteam/inc/home]] قدامها (زي المعمل). اعمل ريبو في [[home/work/shop-api]] وريبو في [[home/personal/blog]]، وطلّع إيميل كل واحد. وبعدين جرّب الفخاخ اللي في الشرح واحد واحد.`,
          teach: R`## المعمل: HOME مزيّف عشان متلمسش إعداداتك

git بيقرا [[~/.gitconfig]] من [[$HOME]]. فلو غيّرنا [[HOME]] للأوامر بتاعة المعمل بس، إعداداتك الحقيقية متتلمسش. و [[GIT_CONFIG_NOSYSTEM=1]] بيخلّيه ميقراش ملف النظام كمان (فيه إعدادات Git for Windows):

~~~bash
mkdir -p ~/lab/gitteam/inc && cd ~/lab/gitteam/inc
export HOME="$(pwd)/home" GIT_CONFIG_NOSYSTEM=1
mkdir -p home/work/shop-api home/personal/blog home/work2
git config --global user.name Ali
git config --global user.email ali@personal.example
git config --global includeIf."gitdir:~/work/".path "~/.gitconfig-work"
git config --file ~/.gitconfig-work user.email ali@acme-co.example
cat ~/.gitconfig ~/.gitconfig-work
~~~

~~~text الناتج
[user]
	name = Ali
	email = ali@personal.example
[includeIf "gitdir:~/work/"]
	path = ~/.gitconfig-work
[user]
	email = ali@acme-co.example
~~~

(أول ٥ سطور [[~/.gitconfig]] وآخر سطرين [[~/.gitconfig-work]].) واتجرّب على Git Bash في ويندوز (Git 2.56). لما تخلص اقفل الترمنال، أو [[unset HOME]] مش هيرجّعه، فافتح ترمنال جديد.

---

## ١. اشتغل؟

~~~bash
for r in work/shop-api personal/blog work2; do git init -q home/$r; echo "$r => $(git -C home/$r config user.email)"; done
~~~

~~~text الناتج
work/shop-api => ali@acme-co.example
personal/blog => ali@personal.example
work2 => ali@personal.example
~~~

- [[work2]] مش تحت [[work/]] حتى لو اسمه شبهه: [[gitdir:~/work/]] بيطابق [[~/work/]] وبعدها أي حاجة، و [[work2]] مش كده.

### منين جه؟

~~~bash
cd home/work/shop-api
git config --show-origin --show-scope user.email
git config --show-origin --get-all user.email
git var GIT_AUTHOR_IDENT | sed 's/>.*/>/'
~~~

~~~text الناتج
global	file:~/.gitconfig-work	ali@acme-co.example
file:~/.gitconfig	ali@personal.example
file:~/.gitconfig-work	ali@acme-co.example
Ali <ali@acme-co.example>
~~~

- [[--get-all]]: كل القيم بالترتيب اللي git قراها فيه. **آخر واحدة هي اللي بتكسب**، وده كل سر [[includeIf]]: الملف بيتقري في مكان القسم بالظبط.
- [[git var GIT_AUTHOR_IDENT]]: الاسم والإيميل ووقت دلوقتي (و [[sed]] شال الوقت عشان السطر يبقى أقصر). ده أصدق من [[git config]] لأنه بيحسب كمان متغيّرات زي [[GIT_AUTHOR_EMAIL]] لو متحطوطة.
- (المسار الكامل بيظهر مكان [[~]]؛ اختصرناه هنا.)

### برة أي ريبو

~~~text cd home/work && git config user.email
ali@personal.example
~~~

[[gitdir]] بيتحسب من فولدر [[.git]] بتاع الريبو. برة ريبو مفيش [[.git]]، فالشرط مبيتطابقش. ده مش مشكلة في الـ commits (دايمًا جوه ريبو)، بس لو بتختبر بـ [[git config]] من فولدر الشغل نفسه هتتلخبط.

---

## ٢. الفخاخ (كلها اتجرّبت، وولا واحدة طلّعت أي رسالة)

كل سطر: شكل [[~/.gitconfig]]، والإيميل اللي طلع في [[work/shop-api]]:

| الحالة | الإيميل | ليه |
|---|---|---|
| [[includeIf]] **قبل** [[[user]]] | personal | الملف اتقري الأول، وبعده [[[user]]] كتب فوقه |
| [[gitdir:~/work]] من غير [[/]] | personal | من غير [[/]] بيطابق ريبو [[.git]] بتاعه هو [[~/work]] نفسه بس |
| [[gitdir:~/Work/]] (W كابيتال) | personal | المقارنة حساسة لحالة الحروف، **حتى على ويندوز** |
| [[gitdir/i:~/Work/]] | work ✓ | [[/i]] = من غير فرق كابيتال وسمول |
| [[gitdir:C:\Users\...\work\]] بـ backslash | personal | [[\]] في ملف الإعدادات escape، فالمسار باظ |
| [[gitdir:C:/Users/.../work/]] بـ forward slash | work ✓ | على ويندوز اكتب المسار بـ [[/]] |
| [[path = ~/.gitconfig-wrok]] (اسم غلط) | personal | ملف مش موجود = بيتجاهَل من غير ما يقول |

القاعدة: بعد أي تعديل في [[includeIf]]، اعمل [[git config --show-origin user.email]] في ريبو من كل نوع.

---

## ٣. باقي الشروط

### [[onbranch:]]

~~~text ~/.gitconfig
[includeIf "onbranch:release/**"]
	path = ~/.gitconfig-release
~~~

على [[main]] الإيميل الشخصي، وبعد [[git switch -c release/1.0]] بقى بتاع الملف. [[**]] = أي حاجة بعد [[release/]] حتى لو فيها [[/]]. مفيد مثلًا عشان [[commit.gpgsign = true]] على branches الإصدارات بس.

### [[hasconfig:remote.*.url:]]

~~~text ~/.gitconfig
[includeIf "hasconfig:remote.*.url:https://github.com/acme-co/**"]
	path = ~/.gitconfig-work
~~~

قبل [[git remote add]]: الإيميل الشخصي. بعد [[git remote add origin https://github.com/acme-co/shop-api.git]]: إيميل الشغل. ده بيحل مشكلة «ريبوهات الشغل متفرّقة في فولدرات». ولو بتستخدم SSH حط شرط تاني لـ [[git@github.com:acme-co/**]].

وقيد من وثائق git: الملف اللي بيتحمّل بشرط [[hasconfig:remote.*.url:]] ممنوع يكون فيه عناوين remote هو نفسه (عشان الشرط ميعتمدش على نفسه). فحط فيه الهوية والمفاتيح بس.

---

## ٤. إيه اللي ينفع يتحط في ملف الشغل

~~~text ~/.gitconfig-work
[user]
	email = ali@acme-co.example
	signingkey = ~/.ssh/id_work.pub
[core]
	sshCommand = ssh -i ~/.ssh/id_work -o IdentitiesOnly=yes
[commit]
	gpgsign = true
[gpg]
	format = ssh
~~~

- [[core.sshCommand]]: الريبوهات دي تستخدم مفتاح SSH بتاع الشغل (تفاصيل المفاتيح المتعددة في تاب SSH، درس الحسابات المتعددة على GitHub).
- [[gpg.format = ssh]] و [[signingkey]]: توقيع الـ commits بمفتاح SSH (Git 2.34+، من الوثائق).

---

## ٥. على PowerShell

~~~powershell
git config --global includeIf."gitdir:~/work/".path "~/.gitconfig-work"
git config --show-origin --show-scope user.email
~~~

نفس الأوامر. و [[~]] في ملف إعدادات git معناها [[$HOME]] بتاعة git (على ويندوز [[C:\Users\<اسمك>]])، ومش لازم تكتب المسار كامل. لو كتبته، بـ [[/]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| حسب الفولدر | [[[includeIf "gitdir:~/work/"]]] وفي آخره [[/]] |
| من غير فرق كابيتال | [[gitdir/i:]] |
| حسب الـ branch | [[onbranch:release/**]] |
| حسب الـ remote | [[hasconfig:remote.*.url:https://github.com/acme-co/**]] |
| تتأكد | [[git config --show-origin --show-scope user.email]] و [[git var GIT_AUTHOR_IDENT]] |
| ترتيب | [[includeIf]] بعد [[[user]]] في الملف |`,
          deep: {
            why: R`الهوية الغلط في commit مش بس شكل: منصات النشر بتقفل الـ deploy، والـ commits مبتتربطش بحسابك، وإيميلك الشخصي بيتنشر في تاريخ ريبو الشركة للأبد. [[includeIf]] بيخلّي القرار أوتوماتيك حسب المكان، فمش محتاج تفتكر [[git config user.email]] في كل ريبو جديد.`,
            how: R`git بيقرا ملفات الإعدادات بالترتيب: system ثم global ([[~/.gitconfig]] أو [[~/.config/git/config]]) ثم local ([[.git/config]]) ثم worktree. وجوه أي ملف، أول ما يقابل [[[include]]] أو [[[includeIf]]] شرطه اتحقق، بيقرا الملف التاني **في المكان ده** كأنه مكتوب هناك. وأي key بيتقري تاني بيكتب فوق اللي قبله. [[gitdir:]] بيتقارن بمسار فولدر [[.git]] (بعد ما يحوّل [[~]] ويضيف [[**]] لو الشرط آخره [[/]])، و [[onbranch:]] باسم الـ branch الحالي، و [[hasconfig:]] بقيم الإعدادات اللي اتقرت لحد دلوقتي. ولو الملف مش موجود، الـ include بيتجاهَل عمدًا (عشان نفس [[~/.gitconfig]] يشتغل على أجهزة مختلفة).`,
            when: R`أي حد عنده أكتر من هوية: شغل وشخصي، أو شركتين، أو حساب open source. وكمان لإعدادات مش هوية: مفتاح SSH مختلف، أو توقيع إجباري، أو [[core.autocrlf]] لفولدر مشاريع ويندوز بس.`,
            mistakes: R`[[includeIf]] قبل [[[user]]] في نفس الملف. ونسيان [[/]] في آخر المسار. وكابيتال مختلف في اسم الفولدر على ويندوز أو الماك. و backslash في المسار. واسم ملف غلط ومحدش بيقول. وتختبر بـ [[git config user.email]] برة أي ريبو. وتحط [[user.email]] local في الريبو ([[git config user.email]] من غير [[--global]]) فيكسب على كل ده وتنساه؛ [[--show-scope]] بيكشفه كـ [[local]].`
          },
          sol: R`[[work/shop-api => ali@acme-co.example]] و [[personal/blog => ali@personal.example]] و [[work2 => ali@personal.example]]. و [[--show-origin --show-scope]] بيطبع [[global]] و [[file:.../.gitconfig-work]]. والفخاخ: قبل [[[user]]]، ومن غير [[/]]، و [[Work]]، و backslash، واسم ملف غلط، كلهم طلّعوا [[ali@personal.example]] من غير أي رسالة، و [[gitdir/i:]] و forward slashes طلّعوا [[ali@acme-co.example]].

اتجرّب على Git Bash (Git 2.56) على ويندوز بـ [[HOME]] مزيّف و [[GIT_CONFIG_NOSYSTEM=1]].`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تشغّل: اكتب الـ ٤ شروط بتاعة [[includeIf]] ومثال لكل واحد، وقول أنهي واحد بيشتغل في ريبوهات الشغل اللي متفرّقة في فولدرات كتير.`, done: R`كتبت [[gitdir:]] و [[gitdir/i:]] و [[onbranch:]] و [[hasconfig:remote.*.url:]] بمثال صح لكل واحد، واخترت [[hasconfig]] للريبوهات المتفرّقة، وقلت إنه من Git 2.36.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[~/.gitconfig]] فيه بالترتيب: [[[includeIf "gitdir:~/work/"]]] بـ path، ثم [[[user]]] بالإيميل الشخصي. والريبو [[~/work/shop-api]] فيه [[git config user.email local@x.example]] (local). الإيميل إيه؟ ولو شلت الـ local؟ جرّب في المعمل.`, done: R`توقعت [[local@x.example]] (الـ local بيتقري بعد الـ global) وبعد [[git config --unset user.email]] الإيميل الشخصي (لأن الـ include قبل [[[user]]])، والنتيجة طابقت، و [[--show-scope]] بيوري [[local]] في الأولى.` },
            { lvl: 'تطبيق', t: R`صلّح الملف ده عشان ريبوهات [[C:\Users\ali\Work\clients\]] تاخد إيميل العملاء: [[[includeIf "gitdir:C:\Users\ali\Work\clients"]]] و [[path = ~\.gitconfig-clients]]. فيه ٣ مشاكل على الأقل.`, done: R`لقيت: backslashes في المسار، ومفيش [[/]] في الآخر، و [[Work]] لازم [[gitdir/i:]] أو نفس الحالة بالظبط، و [[~\]] في الـ path. والنسخة بتاعتك [[gitdir/i:C:/Users/ali/Work/clients/]] و [[path = ~/.gitconfig-clients]]، واتأكدت بـ [[--show-origin]] على ريبو تجربة.` },
            { lvl: 'تطبيق', t: R`ابني [[whoami-git.sh]] (أو PowerShell): جوه أي ريبو يطبع الهوية الفعلية ([[git var GIT_AUTHOR_IDENT]] من غير الوقت)، وكل الأماكن اللي [[user.email]] متعرّف فيها بـ [[--show-origin --show-scope --get-all]]، ويحذّر لو الإيميل مش في لستة مسموحة في ملف.`, done: R`في [[work/shop-api]] بيطبع [[Ali <ali@acme-co.example>]] وسطرين (global من الملفين)، وفي [[work2]] بيحذّر لو اللستة فيها إيميل الشغل بس، ورقم الخروج ١ في الحالة دي.` },
            { lvl: 'تحدي', t: R`زوّد على المعمل: ريبوهات تحت [[~/oss/]] تاخد إيميل [[ali@users.noreply.example]] **ومفتاح SSH تاني** ([[core.sshCommand]])، وريبوهات الشغل على أي فولدر لو الـ remote على [[acme-co]]. اكتب الإعدادات، واتأكد من الـ ٣ حالات بـ [[git config --show-origin core.sshCommand]] و [[user.email]].`, done: R`٣ ريبوهات تجربة (oss، و شغل في فولدر عشوائي بـ remote على acme-co، وشخصي) كل واحد بيطبع الإيميل والـ sshCommand الصح ومنين جم، ومفيش ريبو بياخد إعدادات اتنين مع بعض.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export HOME="$(pwd)/home" GIT_CONFIG_NOSYSTEM=1
unset GIT_AUTHOR_EMAIL GIT_COMMITTER_EMAIL GIT_AUTHOR_NAME GIT_COMMITTER_NAME
mkdir -p home/work/shop-api home/personal/blog home/work2
git config --global user.name Ali
git config --global user.email ali@personal.example
git config --global includeIf."gitdir:~/work/".path "~/.gitconfig-work"
git config --file "$HOME/.gitconfig-work" user.email ali@acme-co.example
for r in work/shop-api personal/blog work2; do git init -q home/$r; echo "$r => $(git -C home/$r config user.email)"; done
git -C home/work/shop-api config --show-scope user.email
printf '[includeIf "gitdir:~/Work/"]\n\tpath = ~/.gitconfig-work\n' > home/.gitconfig-case
git config --global --unset includeIf.gitdir:~/work/.path
git config --global include.path "~/.gitconfig-case"
echo "wrong case => $(git -C home/work/shop-api config user.email)"
printf '[includeIf "gitdir/i:~/Work/"]\n\tpath = ~/.gitconfig-work\n' > home/.gitconfig-case
echo "gitdir/i => $(git -C home/work/shop-api config user.email)"`, expect: [R`work/shop-api => ali@acme-co.example`, R`personal/blog => ali@personal.example`, R`work2 => ali@personal.example`, R`global`, R`wrong case => ali@personal.example`, R`gitdir/i => ali@acme-co.example`] },
          ],
        },
        {
          cmd: "Conventional Commits",
          title: "Conventional Commits: رسالة ليها شكل ثابت يطلع منها رقم الإصدار والـ changelog",
          learn: R`تكتب رسالة commit بالشكل المتفق عليه، وتعرف كل نوع بيزوّد رقم الإصدار إزاي، وتطلّع من التاريخ رقم الإصدار الجاي والـ changelog بسكربت.`,
          out: R`[[sh next-version.sh]] على المعمل بيطبع [[v1.4.2 -> v2.0.0 (major)]]، وعلى branch فيه [[feat]] بس [[v1.4.2 -> v1.5.0 (minor)]].`,
          desc: R`Conventional Commits اتفاق على شكل أول سطر في رسالة الـ commit: [[type(scope): وصف]]. مثلًا [[fix(cart): round totals to 2 decimals]] و [[feat(api): add /coupons]]. الـ [[type]] من لستة ثابتة ([[feat]] و [[fix]] و [[docs]] و [[refactor]] و [[test]] و [[chore]] و [[perf]] و [[ci]] و [[build]] و [[style]] و [[revert]])، والـ [[scope]] اختياري (الجزء من المشروع)، و [[!]] قبل [[:]] أو سطر [[BREAKING CHANGE:]] في آخر الرسالة معناه «التغيير ده بيكسر حاجة عند اللي بيستخدمك».

الفايدة مش الشكل: لأن الرسالة بقت بيانات، سكربت يقدر يقرا التاريخ ويقول الإصدار الجاي إيه بـ SemVer ([[feat]] = minor، و [[fix]] = patch، و [[!]] أو [[BREAKING CHANGE]] = major)، ويكتب الـ changelog مقسوم لوحده، و [[git log --grep]] يلاقي كل الـ fixes في جزء معين. والفرض بيحصل بـ hook [[commit-msg]] على جهازك، وفحص في CI (أداة commitlint في تاب جودة الكود).`,
          example: R`git commit -m "feat(cart): coupon codes"
git commit -m "fix(api)!: rename /order to /orders"
git commit -m "refactor(db): pool" -m "BREAKING CHANGE: DB_URL replaces DB_HOST and DB_PORT"
git log --format=%s v1.4.2..HEAD | grep -vE '^[a-z]+(\([a-z0-9-]+\))?!?: '
git log --format=%B v1.4.2..HEAD | grep -E '^BREAKING[ -]CHANGE: '
git log --format='- %s (%h)' v1.4.2..HEAD | grep -E '^- feat(\(|!|:)'
sh next-version.sh`,
          lines: [
            R`ميزة جديدة في جزء [[cart]]. ده هيزوّد الرقم الأوسط (minor): من [[1.4.2]] لـ [[1.5.0]].`,
            R`تصليح، بس الـ [[!]] بيقول إنه بيكسر حاجة: اللي كان بيكلّم [[/order]] هيقع. ده major حتى لو النوع [[fix]].`,
            R`[[-m]] التانية بتعمل فقرة تانية في الرسالة (الـ body). سطر [[BREAKING CHANGE:]] فيها = major، حتى لو العنوان [[refactor]].`,
            R`بيطبع العناوين اللي **مش** على الشكل ([[-v]] = عكس الـ match) من آخر tag لحد دلوقتي. ده فحص سريع قبل release.`,
            R`[[%B]] الرسالة كاملة (عنوان وbody)، و [[grep]] بيطلّع سطور الـ breaking. [[[ -]]] عشان الشكلين [[BREAKING CHANGE]] و [[BREAKING-CHANGE]] الاتنين مسموحين.`,
            R`سطر changelog لكل [[feat]]: [[%s]] العنوان و [[%h]] الهاش المختصر، و [[grep]] بياخد [[feat]] اللي بعدها [[(]] أو [[!]] أو [[:]] بس، فـ [[feature]] مثلًا متتحسبش.`,
            R`سكربت المعمل: بيقرا الـ commits من آخر tag ويطبع رقم الإصدار الجاي ونوع الزيادة.`,
          ],
          try: R`ابني المعمل اللي في الشرح (tag [[v1.4.2]] وبعده ٦ commits منهم واحد [[update stuff]])، وشغّل الأوامر اللي في المثال. وبعدين اكتب [[next-version.sh]] وجرّبه على ٣ branches: واحد فيه [[fix]] بس، وواحد فيه [[feat]]، وواحد فيه [[docs]] بس.`,
          teach: R`## الشكل بالظبط (من مواصفة conventionalcommits.org 1.0.0)

~~~text رسالة commit
type(scope)!: وصف قصير بصيغة الأمر

body اختياري: ليه التغيير ده، وإيه اللي كان قبله.

BREAKING CHANGE: إيه اللي اتكسر وإزاي تنقل
Refs: #142
~~~

| الحتة | لازم؟ | معناها |
|---|---|---|
| [[type]] | أيوه | نوع التغيير: [[feat]] و [[fix]] في المواصفة نفسها، والباقي اتفاق شائع (من Angular) |
| [[(scope)]] | لأ | الجزء اللي اتغيّر: [[(cart)]] و [[(api)]] و [[(db)]]. كلمة واحدة متفق عليها في الفريق |
| [[!]] | لأ | التغيير بيكسر التوافق مع اللي قبله |
| [[: ]] | أيوه | نقطتين ومسافة، وبعدهم الوصف |
| body | لأ | بعد سطر فاضي. هنا «ليه» |
| footer | لأ | سطور [[Key: value]] في الآخر: [[BREAKING CHANGE:]] و [[Refs:]] و [[Co-authored-by:]] |

### الأنواع وأثرها على الإصدار (SemVer: MAJOR.MINOR.PATCH)

| النوع | معناه | الإصدار |
|---|---|---|
| [[feat]] | ميزة جديدة يحسّ بيها المستخدم | MINOR |
| [[fix]] | تصليح bug | PATCH |
| [[perf]] | أسرع من غير ما السلوك يتغيّر | PATCH (اتفاق شائع) |
| [[docs]] و [[test]] و [[chore]] و [[ci]] و [[build]] و [[style]] و [[refactor]] | مش بيغيّر السلوك | ولا حاجة |
| أي نوع + [[!]] أو [[BREAKING CHANGE:]] | بيكسر | MAJOR |

وقبل [[1.0.0]] الاتفاق الشائع إن الـ breaking بيزوّد الـ minor بس، لأن المشروع لسه مش مستقر.

---

## المعمل

اتجرّب على Git Bash في ويندوز (Git 2.56):

~~~bash
mkdir -p ~/lab/gitteam/cc && cd ~/lab/gitteam/cc
git init -q -b main shop-api && cd shop-api
c(){ echo "$RANDOM" >> f; git add f; git commit -q -m "$1" $__{2:+-m "$2"}; }
c "chore: init"; git tag v1.4.2
c "feat(cart): coupon codes"
c "fix(cart): round totals to 2 decimals"
c "docs: how to run"
c "fix(api)!: rename /order to /orders"
c "refactor(db): pool" "BREAKING CHANGE: DB_URL replaces DB_HOST and DB_PORT"
c "update stuff"
git log --format='%h %s' v1.4.2..HEAD
~~~

[[c]] function صغيرة: بتغيّر ملف وتعمل commit بالرسالة، ولو اديتها نص تاني بتحطه body. و [[$__{2:+-m "$2"}]] معناها «لو فيه argument تاني، حط قبله [[-m]]، ولو مفيش متحطش حاجة خالص».

~~~text الناتج
5afa8a8 update stuff
4e3cb76 refactor(db): pool
4509b09 fix(api)!: rename /order to /orders
0b1df23 docs: how to run
ff7af2b fix(cart): round totals to 2 decimals
5588811 feat(cart): coupon codes
~~~

الهاشات عندك هتختلف.

---

## ١. مين مش على الشكل؟

~~~bash
git log --format=%s v1.4.2..HEAD | grep -cE '^[a-z]+(\([a-z0-9-]+\))?!?: '
git log --format=%s v1.4.2..HEAD | grep -vE '^[a-z]+(\([a-z0-9-]+\))?!?: '
~~~

~~~text الناتج
5
update stuff
~~~

نفك الـ regex:

| الحتة | بتطابق |
|---|---|
| [[^[a-z]+]] | من أول السطر: حروف صغيرة (النوع) |
| [[(\([a-z0-9-]+\))?]] | اختياري: قوس وجواه حروف وأرقام و [[-]] وقوس |
| [[!?]] | اختياري: علامة تعجب |
| [[: ]] | نقطتين ومسافة |

---

## ٢. مين بيكسر حاجة؟

~~~bash
git log --format=%B v1.4.2..HEAD | grep -E '^BREAKING[ -]CHANGE: '
git log --format=%s v1.4.2..HEAD | grep -E '^[a-z]+(\([^)]*\))?!: '
~~~

~~~text الناتج
BREAKING CHANGE: DB_URL replaces DB_HOST and DB_PORT
fix(api)!: rename /order to /orders
~~~

اتنين بطريقتين مختلفتين، والاتنين معناهم major.

### فخ: [[%(trailers)]] مبيشوفش [[BREAKING CHANGE]]

git عنده أداة جاهزة لسطور الـ footer ([[Key: value]])، بس الـ key لازم يبقى كلمة من غير مسافات:

~~~bash
git log -1 --format='%(trailers)' HEAD~1
git commit -q --allow-empty -m "feat: x" -m "BREAKING-CHANGE: y"
git log -1 --format='%(trailers:key=BREAKING-CHANGE,valueonly)'
~~~

الأول طبع **سطر فاضي** (مع إن الـ commit فيه [[BREAKING CHANGE:]])، والتاني طبع [[y]]. فلو هتستخدم trailers في سكربت اكتب [[BREAKING-CHANGE]] بالشَرطة (المواصفة بتسمح بيه)، أو اعمل [[grep]] على [[%B]] زي فوق.

---

## ٣. الـ changelog

~~~bash
for t in feat fix docs perf; do
  echo "## $t"
  git log --format='- %s (%h)' v1.4.2..HEAD | grep -E "^- $t(\(|!|:)"
done
~~~

~~~text الناتج
## feat
- feat(cart): coupon codes (5588811)
## fix
- fix(api)!: rename /order to /orders (4509b09)
- fix(cart): round totals to 2 decimals (ff7af2b)
## docs
- docs: how to run (0b1df23)
## perf
~~~

[[## perf]] فاضي و [[grep]] رجّع ١ (ملقاش). في سكربت حقيقي بتطبع العنوان بس لو فيه سطور تحته. ومشروع «سكربت إصدار» في نفس التاب بيبني ده كامل بالـ tag.

---

## ٤. رقم الإصدار الجاي: [[next-version.sh]]

~~~bash next-version.sh
#!/bin/sh
last=$(git describe --tags --abbrev=0 2>/dev/null) || { echo "no tag yet: start with v0.1.0"; exit 1; }
subjects=$(git log --format=%s "$last..HEAD")
bodies=$(git log --format=%b "$last..HEAD")
if printf '%s\n' "$bodies" | grep -qE '^BREAKING[ -]CHANGE: ' ||
   printf '%s\n' "$subjects" | grep -qE '^[a-z]+(\([^)]*\))?!: '; then bump=major
elif printf '%s\n' "$subjects" | grep -qE '^feat(\([^)]*\))?: '; then bump=minor
elif printf '%s\n' "$subjects" | grep -qE '^(fix|perf)(\([^)]*\))?: '; then bump=patch
else echo "$last: no feat or fix since, no release"; exit 0; fi
ver=$(printf '%s' "$last" | sed 's/^v//')
ma=$(echo "$ver" | cut -d. -f1); mi=$(echo "$ver" | cut -d. -f2); pa=$(echo "$ver" | cut -d. -f3)
case $bump in
  major) ma=$((ma+1)); mi=0; pa=0 ;;
  minor) mi=$((mi+1)); pa=0 ;;
  patch) pa=$((pa+1)) ;;
esac
echo "$last -> v$ma.$mi.$pa ($bump)"
~~~

- [[git describe --tags --abbrev=0]]: أقرب tag ورا HEAD (من غير [[-5-g...]]). ولو مفيش: رسالة وخروج.
- الترتيب مهم: نسأل عن major الأول، لأن [[fix(api)!]] فيه [[fix]] بس الـ [[!]] أهم.
- [[sed 's/^v//']]: نشيل الـ [[v]]، و [[cut -d. -f1]] الرقم الأول وهكذا.
- [[$((ma+1))]]: حساب في الشيل.

~~~text الناتج على ٤ حالات
v1.4.2 -> v2.0.0 (major)          ← main: فيه ! و BREAKING CHANGE
v1.4.2 -> v1.5.0 (minor)          ← branch فيه fix و feat
v1.4.2 -> v1.4.3 (patch)          ← branch فيه fix بس
v1.4.2: no feat or fix since, no release   ← branch فيه docs بس
~~~

ده بالظبط اللي أدوات زي semantic-release و release-please بيعملوه (مع حاجات زيادة: tag و changelog و publish).

---

## ٥. الفرض: hook و CI

- على جهازك: hook [[commit-msg]] (درس «git hooks» في نفس الوحدة فيه واحد جاهز)، أو commitlint مع husky (تاب جودة الكود، درس «commitlint»).
- في CI: نفس الـ regex على [[git log --format=%s origin/main..HEAD]]، أو على عنوان الـ PR لو الفريق بيعمل squash merge (العنوان هو اللي بيبقى رسالة الـ commit على main).

---

## ٦. رسايل حلوة ورسايل وحشة

| وحشة | ليه | أحسن |
|---|---|---|
| [[fix: bug]] | أنهي bug؟ | [[fix(cart): round totals to 2 decimals]] |
| [[feat: updated stuff]] | مش ميزة، ومش واضح | [[refactor(db): move queries to repo layer]] |
| [[Fix(Cart): Rounding.]] | الأدوات بتتوقع [[fix]] صغير، والنقطة في الآخر مش متعارف عليها | [[fix(cart): round totals]] |
| [[feat: add coupons and fix rounding and update docs]] | ٣ حاجات في commit = ٣ commits | [[feat]] و [[fix]] و [[docs]] لوحدهم |
| [[fix(api): rename /order]] (بيكسر العملاء) | مفيش [[!]]، فالإصدار هيبقى patch والناس هتتكسر | [[fix(api)!: rename /order to /orders]] |

الوصف بصيغة الأمر ([[add]] مش [[added]])، لأنه بيكمّل جملة «لو اتطبّق، الـ commit ده هيـ...».`,
          deep: {
            why: R`رسالة الـ commit هي الوحيدة اللي بتشرح التغيير لحد بعد سنة. لما ليها شكل ثابت، الآلة كمان تقدر تقراها: رقم الإصدار يتحسب بدل ما حد يخمّنه، والـ changelog يتكتب لوحده، و «فيه حاجة بتكسر؟» بقى [[grep]]. وفي المكتبات اللي ناس تانية بتستخدمها، major غلط أو ناقص بيكسر مشاريع غيرك.`,
            how: R`المواصفة بتحدد العنوان ([[type(scope)!: description]]) والـ footer (سطور [[token: value]] أو [[token #value]] في آخر الرسالة بعد سطر فاضي)، وإن [[BREAKING CHANGE]] الـ token الوحيد اللي ينفع فيه مسافة. والأدوات بتمشي على الـ commits من آخر tag ([[git describe --tags --abbrev=0]] ثم [[git log tag..HEAD]])، وتصنّف كل واحد بالـ regex، وتاخد أعلى زيادة (major فوق minor فوق patch). و git نفسه مبيعرفش حاجة عن الاتفاق ده: كله نص في الرسالة، والفرض بالـ hooks والـ CI.`,
            when: R`أي مشروع ليه إصدارات (مكتبة، أو API ليه عملاء، أو تطبيق بيتعمله release)، وأي فريق عايز changelog من غير ما حد يكتبه بإيده. وفي مشروع شخصي صغير مفيد كعادة، بس متخليش الـ hook يرفضك وانت بتجرّب: الـ [[chore:]] موجود عشان كده.`,
            mistakes: R`تنسى الـ [[!]] على تغيير بيكسر فالإصدار يطلع patch. و [[BREAKING CHANGE]] في العنوان بدل الـ footer. و [[Feat]] أو [[FIX]] بحروف كبيرة فالأدوات متعرفهاش. و commit واحد فيه feat و fix. و scope مختلف لنفس الجزء ([[cart]] و [[basket]]). وتعتمد على [[%(trailers)]] مع [[BREAKING CHANGE]] بمسافة. و squash merge والـ PR عنوانه مش على الشكل فالرسالة اللي على main بايظة.`
          },
          sol: R`[[grep -c]] طبع [[5]] و [[grep -v]] طبع [[update stuff]] بس. والـ breaking: سطر [[BREAKING CHANGE: DB_URL replaces DB_HOST and DB_PORT]] و [[fix(api)!: rename /order to /orders]]. و [[next-version.sh]]: [[v1.4.2 -> v2.0.0 (major)]] على main، و [[v1.4.2 -> v1.5.0 (minor)]] لما فيه [[feat]]، و [[v1.4.2 -> v1.4.3 (patch)]] لما فيه [[fix]] بس، و [[no feat or fix since, no release]] لما [[docs]] بس.

اتجرّب على Git Bash (Git 2.56) على ويندوز.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: كل رسالة من دول هتزوّد أنهي رقم في [[1.4.2]]؟ [[docs: typo]]، و [[feat(api): add /coupons]]، و [[perf(db): index orders]]، و [[chore!: drop node 18]]، و [[fix: x]] وفي الـ body [[BREAKING CHANGE: y]].`, done: R`كتبت: ولا حاجة، و [[1.5.0]]، و [[1.4.3]]، و [[2.0.0]]، و [[2.0.0]]، وقلت إن [[!]] و [[BREAKING CHANGE]] بيكسبوا على أي نوع.` },
            { lvl: 'تطبيق', t: R`refactor: الـ ٥ رسايل دي اكتبها من جديد على الشكل: [[fixed the cart]]، و [[Added coupons + fixed rounding]]، و [[WIP]]، و [[update README]]، و [[changed /order endpoint to /orders]] (العملاء بيكلّموه).`, done: R`[[fix(cart): ...]] بوصف حقيقي، والتانية اتقسمت لـ commitين [[feat]] و [[fix]]، و [[WIP]] اتشالت أو بقت جزء من commit، و [[docs: ...]]، و [[fix(api)!: rename /order to /orders]] أو [[feat(api)!]]، والـ regex بتاع الدرس بيقبل الكل.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل ملف [[subjects.txt]] فيه ٣٠ عنوان commit (أي أنواع، وفيهم ٤ مش على الشكل و ٢ فيهم [[!]]). طلّع بأمر واحد عدد كل نوع مرتّب من الأكتر للأقل، وبأمر تاني العناوين الغلط بأرقام سطورها.`, done: R`الأمر الأول ([[grep -oE '^[a-z]+' | sort | uniq -c | sort -rn]] أو شبهه) بيطبع جدول الأعداد والمجموع ٢٦، والتاني ([[grep -nvE]]) بيطبع الـ ٤ بأرقام سطورهم.` },
            { lvl: 'تطبيق', t: R`صلّح الـ regex ده اللي في hook [[commit-msg]]: [[^(feat|fix|docs)(.*): .*]]. جرّبه على: [[feat: ]] (فاضي)، و [[fix(): x]]، و [[feature: x]]، و [[docs(api) x]]، و [[fix(api)!: x]]، وقول مين لازم يتقبل ومين يترفض وصلّح.`, done: R`الأصلي بيقبل [[feat: ]] و [[fix(): x]] غلط وبيرفض [[fix(api)!: x]] غلط. والـ regex بتاعك ([[^(feat|fix|docs)(\([a-z0-9-]+\))?!?: .+]]) بيقبل [[fix(api)!: x]] بس من الحالات الغلط، واتجرّب بـ [[printf ... | grep -E]] على الخمسة.` },
            { lvl: 'تحدي', t: R`ابني [[changelog.sh <from> <to>]] بيكتب markdown: عنوان [[## v1.5.0 (2026-11-03)]]، وتحته أقسام [[### ⚠ BREAKING CHANGES]] (العنوان مع سطر الـ footer لو موجود)، و [[### Features]]، و [[### Bug Fixes]]، وكل سطر فيه الـ scope بـ bold والهاش. والقسم الفاضي ميظهرش.`, done: R`على المعمل بيطبع ٣ أقسام، والـ breaking فيه الاتنين (واحد بـ [[!]] وواحد بـ footer ومعاه نص الـ footer)، و [[docs]] و [[update stuff]] مش ظاهرين، ومفيش [[### Performance]] فاضي.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[git help log]] (جزء [[trailers]]) و [[git help interpret-trailers]]: إزاي تضيف [[Refs: #142]] لآخر رسالة بأمر واحد من غير ما تفتح محرر؟ وإزاي تطبع قيمة [[Refs]] بس من آخر ١٠ commits؟`, done: R`الأمر [[git commit --amend --trailer "Refs: #142" --no-edit]] اشتغل و [[git log -1]] فيه السطر في الآخر، و [[git log -10 --format='%(trailers:key=Refs,valueonly)']] بيطبع [[#142]] بس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q -b main shop-api && cd shop-api
n=0; c(){ n=$((n+1)); echo "$n" >> f; git add f; git commit -q -m "$1" "$2" "$3"; }
c "chore: init" -m "init"; git tag v1.4.2
c "feat(cart): coupon codes" -m "coupons"
c "fix(cart): round totals" -m "round"
c "fix(api)!: rename /order to /orders" -m "rename"
c "refactor(db): pool" -m "BREAKING CHANGE: DB_URL replaces DB_HOST"
c "update stuff" -m "misc"
echo "bad: $(git log --format=%s v1.4.2..HEAD | grep -vE '^[a-z]+(\([a-z0-9-]+\))?!?: ')"
git log --format=%B v1.4.2..HEAD | grep -E '^BREAKING[ -]CHANGE: '
echo "trailer-space: [$(git log -1 --format='%(trailers:key=BREAKING CHANGE,valueonly)' HEAD~1 | tr -d '\n')]"
next(){
  last=$(git describe --tags --abbrev=0)
  s=$(git log --format=%s "$last..HEAD"); b=$(git log --format=%b "$last..HEAD")
  if printf '%s\n' "$b" | grep -qE '^BREAKING[ -]CHANGE: ' || printf '%s\n' "$s" | grep -qE '^[a-z]+(\([^)]*\))?!: '; then echo major
  elif printf '%s\n' "$s" | grep -qE '^feat(\([^)]*\))?: '; then echo minor
  elif printf '%s\n' "$s" | grep -qE '^(fix|perf)(\([^)]*\))?: '; then echo patch
  else echo none; fi
}
echo "main: $(next)"
git switch -q -c only-fix v1.4.2 && c "fix(cart): x" -m "x" && echo "only-fix: $(next)"
git switch -q -c only-docs v1.4.2 && c "docs: y" -m "y" && echo "only-docs: $(next)"`, expect: [R`bad: update stuff`, R`BREAKING CHANGE: DB_URL replaces DB_HOST`, R`trailer-space: []`, R`main: major`, R`only-fix: patch`, R`only-docs: none`] },
          ],
        },
        {
          cmd: "trunk-based ولا git flow",
          title: "الفريق يمشي إزاي في الـ branches؟ trunk-based ولا git flow، وإيه اللي كل واحد بيكلّفه",
          learn: R`تفرق بين git flow و GitHub flow و trunk-based بالرسم والأوامر، وتعرف كل واحد مناسب لأنهي فريق ومنتج، وتعمل release branch و hotfix و feature flag صح.`,
          out: R`[[git log --graph --oneline --all]] على معمل git flow فيه [[develop]] و [[release/1.1.0]] و [[hotfix/1.1.1]] و merge commits، وعلى trunk-based خط واحد تقريبًا و [[release/1.1]] فيه commit واحد [[cherry picked from]].`,
          desc: R`أي فريق محتاج يتفق: الشغل الجديد بيعيش فين، وبيدخل main إمتى، والـ release بيطلع منين، والـ hotfix بيتعمل إزاي. فيه ٣ طرق مشهورة:

- **git flow**: [[main]] فيه الإصدارات بس، و [[develop]] فيه الشغل الجاي، و [[feature/*]] من [[develop]]، و [[release/*]] لتجهيز الإصدار، و [[hotfix/*]] من [[main]]. تقيلة، ومناسبة لمنتج بيطلع بإصدارات ليها أرقام وفيه أكتر من إصدار مدعوم (برنامج بيتسطّب، أو مكتبة).
- **GitHub flow**: [[main]] دايمًا قابل للنشر، و branch قصير لكل تغيير، و PR، و merge، و deploy.
- **trunk-based**: الكل بيدمج في [[main]] (الـ trunk) كل يوم أو أقل، بـ branches عمرها ساعات، والشغل اللي لسه مخلصش بيدخل مقفول بـ feature flag. والـ release من main بـ tag، ولو محتاج تصلّح إصدار قديم: [[release/*]] من الـ tag و [[cherry-pick -x]].

أغلب فرق الويب اللي بتنشر كل يوم بتستخدم trunk-based أو GitHub flow، لأن الـ branch اللي بيعيش أسابيع بيبعد عن main، والدمج بيبقى وجع (conflicts وbugs من التجميع).`,
          example: R`git switch -c develop && git switch -c feature/coupons
git switch develop && git merge --no-ff feature/coupons
git switch -c release/1.1.0 && git switch main && git merge --no-ff release/1.1.0 && git tag v1.1.0
git switch -c ali/coupons main && git switch main && git merge --ff-only ali/coupons
git merge --squash mona/rounding && git commit -m "fix(cart): round totals (#12)"
git switch -c release/1.1 v1.1.0 && git cherry-pick -x main
git log --graph --oneline --all
git rev-list --left-right --count main...develop`,
          lines: [
            R`git flow: [[develop]] من main، وكل ميزة branch من [[develop]].`,
            R`الميزة بتخلص بـ merge في [[develop]]. [[--no-ff]] بيعمل merge commit حتى لو ممكن fast-forward، عشان الميزة تفضل باينة كمجموعة في الرسم.`,
            R`release branch من [[develop]] للتجهيز (رقم الإصدار، تصليحات أخيرة)، وبعدين merge في main و tag عليه. وفي git flow لازم يرجع [[develop]] كمان.`,
            R`trunk-based: branch قصير من main، وبعد المراجعة بيدخل main بـ fast-forward (أو rebase)، فالتاريخ خط واحد.`,
            R`أو squash: كل commits الـ branch بيبقوا commit واحد على main برسالة الـ PR. ده اللي زرار «Squash and merge» في GitHub بيعمله.`,
            R`تصليح لإصدار قديم في trunk-based: branch من الـ tag، و [[cherry-pick -x]] للتصليح اللي اتعمل على main. [[-x]] بيكتب في الرسالة أصل الـ commit.`,
            R`بيرسم كل الـ branches. شكل الرسم لوحده بيقولك الفريق ماشي بأنهي طريقة.`,
            R`بيطبع رقمين: كام commit في main مش في [[develop]]، وكام في [[develop]] مش في main. كل ما الأرقام تكبر، الدمج الجاي أصعب.`,
          ],
          try: R`ابني المعملين اللي في الشرح ([[gitflow]] و [[trunk]]) في [[~/lab/gitteam/flow]]، وقارن [[git log --graph --oneline --all]] في الاتنين. وبعدين في [[gitflow]]: عدّل نفس السطر في [[develop]] وفي [[hotfix/1.1.2]] وشوف الـ conflict اللي بيحصل لما ترجّع الـ hotfix لـ [[develop]].`,
          teach: R`## ليه الموضوع ده مهم أصلًا؟

الطريقة دي بتحدد: كام مرة في اليوم الناس بتعمل conflicts، والكود بيستنى قد إيه عشان يتنشر، وإزاي تصلّح bug في الإنتاج الساعة ٢ بالليل. مفيش طريقة «صح» لكل فريق، بس فيه طريقة غلط لفريقك.

اتجرّب على Git Bash في ويندوز (Git 2.56). الهاشات عندك هتختلف.

---

## ١. git flow في معمل

~~~bash
mkdir -p ~/lab/gitteam/flow && cd ~/lab/gitteam/flow
git init -q -b main gitflow && cd gitflow
c(){ echo "$1" >> log.txt; git add .; git commit -qm "$1"; }
c "init"; git tag v1.0.0
git switch -qc develop
git switch -qc feature/coupons; c "feat: coupons"
git switch -q develop; git merge -q --no-ff -m "Merge branch 'feature/coupons' into develop" feature/coupons
git switch -qc release/1.1.0; c "chore: bump 1.1.0"
git switch -q main; git merge -q --no-ff -m "Merge branch 'release/1.1.0'" release/1.1.0; git tag v1.1.0
git switch -q develop; git merge -q --no-ff -m "Merge branch 'release/1.1.0' into develop" release/1.1.0
git switch -q main; git switch -qc hotfix/1.1.1; c "fix: total rounding"
git switch -q main; git merge -q --no-ff -m "Merge branch 'hotfix/1.1.1'" hotfix/1.1.1; git tag v1.1.1
git switch -q develop; git merge -q --no-ff -m "Merge branch 'hotfix/1.1.1' into develop" hotfix/1.1.1
git log --graph --oneline --all --format='%h%d %s'
~~~

~~~text الناتج
*   32bee8e (HEAD -> develop) Merge branch 'hotfix/1.1.1' into develop
|\
* \   1ed07ff Merge branch 'release/1.1.0' into develop
|\ \
| | | *   d46c39d (tag: v1.1.1, main) Merge branch 'hotfix/1.1.1'
| | | |\
| | | |/
| | |/|
| | * | acf2163 (hotfix/1.1.1) fix: total rounding
| | |/
| | *   576734f (tag: v1.1.0) Merge branch 'release/1.1.0'
| | |\
| | |/
| |/|
| * | b212719 (release/1.1.0) chore: bump 1.1.0
|/ /
* |   f8d2cc2 Merge branch 'feature/coupons' into develop
|\ \
| |/
|/|
| * df807d4 (feature/coupons) feat: coupons
|/
* 4af72ea (tag: v1.0.0) init
~~~

٣ commits فيهم شغل حقيقي ([[coupons]] و [[bump]] و [[rounding]])، و ٥ merge commits. والرسم ده لميزة واحدة وإصدار واحد و hotfix واحد.

| الـ branch | بيتعمل من | بيرجع لـ | عمره |
|---|---|---|---|
| [[main]] | — | — | دايمًا، وفيه الإصدارات بس (كل commit عليه tag) |
| [[develop]] | [[main]] | — | دايمًا، وفيه الإصدار الجاي |
| [[feature/*]] | [[develop]] | [[develop]] | أيام لأسابيع |
| [[release/*]] | [[develop]] | [[main]] **و** [[develop]] | لحد الإصدار |
| [[hotfix/*]] | [[main]] | [[main]] **و** [[develop]] | ساعات |

### الثمن

- كل تصليح بيتدمج مرتين. لو نسيت ترجّع الـ hotfix لـ [[develop]]، الإصدار الجاي هيرجّع الـ bug.
- [[develop]] و [[main]] بيبعدوا عن بعض. [[git rev-list --left-right --count main...develop]] بيقيس ده: الرقم الشمال commits في main مش في [[develop]] والعكس.
- الـ feature اللي عاشت أسبوعين بتدخل [[develop]] مرة واحدة، والـ conflicts بتبقى كبيرة.

---

## ٢. trunk-based في معمل

~~~bash
cd ~/lab/gitteam/flow && git init -q -b main trunk && cd trunk
c(){ echo "$1" > "$2"; git add .; git commit -qm "$1"; }
c "init" README
git switch -qc ali/coupons; c "feat(cart): coupons behind flag" coupons.js
git switch -q main; git merge -q --ff-only ali/coupons; git branch -qd ali/coupons
git switch -qc mona/rounding; c "fix(cart): round totals" total.js
git switch -q main; git merge -q --squash mona/rounding; git commit -qm "fix(cart): round totals (#12)"; git branch -qD mona/rounding
git tag v1.1.0
c "feat(cart): enable coupons flag by default" flags.json
git switch -qc release/1.1 v1.1.0
git switch -q main; c "fix(api): null price crash" price.js
git switch -q release/1.1; git cherry-pick -x main; git tag v1.1.1
git switch -q main
git log --graph --oneline --all --format='%h%d %s'
~~~

~~~text الناتج
* d31494b (HEAD -> main) fix(api): null price crash
* a987d1e feat(cart): enable coupons flag by default
| * bcb4820 (tag: v1.1.1, release/1.1) fix(api): null price crash
|/
* 1f4195e (tag: v1.1.0) fix(cart): round totals (#12)
* 8c50860 feat(cart): coupons behind flag
* f6133c7 init
~~~

- خط واحد. كل commit على main عدّى CI وممكن يتنشر.
- [[--ff-only]] مع branch [[ali]] و [[--squash]] مع branch [[mona]]: الاتنين مبيعملوش merge commits.
- [[git branch -D]] (كابيتال) مع الـ squash: git مش شايف إن [[mona/rounding]] اتدمج (الـ commit على main جديد)، فـ [[-d]] بيرفض.
- [[release/1.1]] اتعمل **بعدين**، لما احتجنا نصلّح [[v1.1.0]] من غير ما ننشر الـ [[flag by default]] اللي على main.

~~~text git log -1 --format=%B release/1.1
fix(api): null price crash

(cherry picked from commit d31494ba86c34bc443f82807406fc59a75349af7)
~~~

[[-x]] كتب الأصل، فأي حد يقدر يعرف التصليح ده جه منين. والتصليح **دايمًا** على main الأول وبعدين cherry-pick، مش العكس، عشان ميضيعش.

### فخ اتقابل في المعمل: cherry-pick و conflict

أول نسخة من المعمل كانت كل الـ commits بتكتب في نفس الملف [[log.txt]]، و [[cherry-pick]] على [[release/1.1]] وقف:

~~~text الناتج
error: could not apply b2330d1... fix(api): null price crash
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git cherry-pick --continue".
fatal: cannot switch branch while cherry-picking
~~~

الـ commit اتعمل فوق سطر مش موجود في الـ release، فـ git مش عارف يحطه فين. وبعدها [[git switch]] رفض لأن الـ cherry-pick لسه مفتوح. الحل: تحل الـ conflict و [[git cherry-pick --continue]]، أو [[git cherry-pick --abort]]. وده بيحصل كتير لما main يبعد عن الـ release: سبب تاني إن release branches تعيش قصيرة.

---

## ٣. الـ feature flag: إزاي تدمج شغل لسه مخلصش

trunk-based معناه إن الـ coupons ممكن تدخل main وهي نص شغالة. اللي بيمنعها توصل للمستخدم:

~~~javascript coupons.js
const flags = require('./flags.json');           // { "coupons": false }
function applyCoupon(cart, code) {
  if (!flags.coupons) return cart;              // مقفولة: الكود موجود بس مش بيشتغل
  return { ...cart, discount: lookup(code) };
}
~~~

- الـ flag ممكن يبقى ملف، أو متغيّر بيئة، أو خدمة (LaunchDarkly أو Unleash) تقفل وتفتح من غير deploy.
- لما الميزة تخلص: commit صغير يفتح الـ flag ([[enable coupons flag by default]] في المعمل)، وبعد أسبوع commit يشيل الـ [[if]] والـ flag. لو سبت الـ flags تتراكم الكود بيبقى متاهة.

---

## ٤. تختار إيه

| الحالة | الأنسب | ليه |
|---|---|---|
| موقع أو API بيتنشر كل يوم، و CI كويس | trunk-based أو GitHub flow | أقل conflicts، والكود يوصل أسرع |
| فريق صغير وبيعمل PRs | GitHub flow | بسيط: main و branch قصير |
| تطبيق موبايل أو برنامج بيتسطّب، وإصدارات بأرقام | trunk-based مع release branches، أو git flow | لازم تصلّح إصدار قديم والجديد شغّال |
| مكتبة بتدعم v1 و v2 مع بعض | branches طويلة لكل إصدار رئيسي ([[v1.x]]) | كل إصدار ليه تصليحاته |
| مفيش اختبارات أوتوماتيك | مش الطريقة المشكلة: اكتب CI الأول | trunk-based من غير CI = main بايظ دايمًا |

وصاحب git flow نفسه (Vincent Driessen) كتب ملاحظة في ٢٠٢٠ على المقال الأصلي إن الفرق اللي بتنشر باستمرار (web apps) يبصوا على حاجة أبسط زي GitHub flow.

---

## الخلاصة

| | git flow | GitHub flow | trunk-based |
|---|---|---|---|
| branches دايمة | [[main]] و [[develop]] | [[main]] | [[main]] |
| عمر الـ feature branch | أيام لأسابيع | أيام | ساعات ليوم |
| الشغل اللي مخلصش | في الـ branch | في الـ branch | في main ورا flag |
| الـ release | [[release/*]] من [[develop]] | كل merge = deploy | tag على main، و [[release/*]] لو محتاج |
| الـ hotfix | [[hotfix/*]] من main ويرجع للاتنين | branch و PR عادي | على main و [[cherry-pick -x]] |
| الرسم | merges كتير | merges قصيرة | خط واحد |`,
          deep: {
            why: R`كل branch بيعيش لوحده بيبعد عن الباقي، وتمن الدمج بيكبر مع الوقت مش بشكل ثابت. الطرق دي في الحقيقة إجابات مختلفة على سؤال «نسيب الكود يبعد قد إيه قبل ما نجمّعه؟». git flow بيقبل بعد كبير مقابل إصدارات مرتبة، و trunk-based بيدمج كل يوم مقابل إنه محتاج CI قوي و feature flags.`,
            how: R`الفرق كله في الأوامر اللي بتتكرر: git flow بيعتمد على [[merge --no-ff]] عشان كل feature و release يفضل باين كـ merge commit، وعلى tags على main. و trunk-based بيعتمد على [[merge --ff-only]] أو [[--squash]] أو rebase فالتاريخ يبقى خطي، وعلى [[cherry-pick -x]] لتصليح الإصدارات. وقياس البعد: [[git rev-list --left-right --count A...B]]، وقياس الـ conflicts قبل ما تحصل: [[git merge-tree --write-tree A B]] (Git 2.38+) بيعمل merge في الذاكرة ويطبع الـ conflicts من غير ما يلمس الفولدر.`,
            when: R`اختار مرة في أول المشروع واكتبها في [[CONTRIBUTING.md]]، وراجعها لما حاجة تتغيّر: الفريق كبر، أو بقيتوا تنشروا أكتر، أو بقى عندكم عملاء على إصدار قديم. وفي المقابلات «اشرح git flow وإيه البديل» سؤال شائع (تاب المقابلات، درس «trunk-based»).`,
            mistakes: R`git flow في موقع بيتنشر ١٠ مرات في اليوم، فـ [[develop]] و main بيبقوا نفس الحاجة مع خطوة زيادة. و hotfix بيرجع main بس وينسى [[develop]]. و feature branch عايش شهر «عشان يخلص الأول». و trunk-based من غير CI ولا flags فـ main بايظ. و feature flags بتتراكم ومحدش بيشيلها. والتصليح على [[release/*]] الأول وينسى main فالـ bug يرجع في الإصدار الجاي. و [[squash]] وبعدين [[git branch -d]] يرفض فتفتكر إن الدمج فشل.`
          },
          sol: R`[[gitflow]]: ٣ commits شغل و ٥ merges، و [[develop]] فيه كل حاجة، و main فيه [[v1.1.0]] و [[v1.1.1]]. و [[trunk]]: خط واحد، و [[release/1.1]] فيه commit واحد رسالته آخرها [[(cherry picked from commit ...)]]. ولو عدّلت نفس السطر في [[develop]] و hotfix، الـ merge الأخير بيقف بـ [[CONFLICT (content): Merge conflict in log.txt]].

اتجرّب على Git Bash (Git 2.56) على ويندوز. ملاحظة Vincent Driessen من صفحة المقال الأصلي (nvie.com)، و [[merge-tree --write-tree]] من وثائق git.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: في git flow، الـ hotfix بيتعمل من أنهي branch وبيرجع لأنهي branches؟ وفي trunk-based التصليح لإصدار قديم بيتعمل فين الأول وإزاي بيوصل للإصدار؟`, done: R`كتبت: من main ويرجع main و develop (وأي release مفتوح)، و في trunk-based على main الأول وبعدين [[cherry-pick -x]] على [[release/*]] من الـ tag.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في معمل [[gitflow]]، [[git rev-list --left-right --count main...develop]] هيطبع إيه؟ وبعد ما تعمل commit على [[develop]] من غير ما يتدمج؟ وجرّب.`, done: R`توقعت الأرقام قبل التشغيل وطابقت، وشرحت إن الرقم الشمال commits main اللي مش في develop (الـ merge commits بتاعة main)، وإن الـ commit الجديد زوّد اليمين بواحد.` },
            { lvl: 'تطبيق', t: R`ابني محاكاة: سكربت بيعمل ريبو وفريق من ٣ (ali و mona و sara)، كل واحد بيعدّل ملف [[config.json]] مشترك في سطور مختلفة على مدار ١٠ «أيام». مرة كل واحد بيدمج كل يوم (trunk)، ومرة كل واحد بيدمج يوم ١٠ بس (branches طويلة). اعدّ الـ conflicts في كل حالة.`, done: R`السكربت بيطبع عدد الـ conflicts في الحالتين (الطويلة أكتر بوضوح)، وتشغيله تاني بيدّي نفس الأرقام، وكتبت جملة بتفسّر الفرق.` },
            { lvl: 'تطبيق', t: R`صلّح الموقف: فريق trunk-based صلّح bug على [[release/1.1]] مباشرة وعمل [[v1.1.1]]، ونسي main. الإصدار [[v1.2.0]] رجّع الـ bug. اعمل الحالة في المعمل، ورجّع التصليح لـ main صح، واكتب قاعدة تمنعها.`, done: R`عملت [[cherry-pick -x]] من [[release/1.1]] لـ main (أو العكس صح في المرة الجاية)، و [[git log --grep "cherry picked"]] بيوري الأصل، و [[git branch --contains <hash>]] بيطبع الاتنين، والقاعدة مكتوبة: التصليح على main الأول.` },
            { lvl: 'تحدي', t: R`قارن وقيس: بـ [[git merge-tree --write-tree]] (Git 2.38+) اكتب [[will-conflict.sh <branch>]] بيقول قبل ما تعمل merge لو الـ branch هيعمل conflict مع main وفي أنهي ملفات، من غير ما يلمس فولدرك. جرّبه على branch بيلمس نفس السطر وعلى branch نضيف.`, done: R`على الـ branch اللي فيه conflict بيطبع اسم الملف ويخرج بـ ١، وعلى النضيف [[clean]] ويخرج بـ ٠، و [[git status]] بعده فاضي في الحالتين.` },
            { lvl: 'تحدي', t: R`اشرحها لمدير فريق في ٦ سطور: الفريق ٥ أشخاص، وموقع بينشر كل يوم، ومفيش اختبارات أوتوماتيك، وعايزين git flow «عشان يبقى منظم». تنصح بإيه وليه، وإيه أول خطوة؟`, done: R`النصيحة فيها: GitHub flow أو trunk-based، وإن git flow هيزوّد خطوات من غير ما يحل مشكلتهم، وإن أول خطوة CI بيشغّل اختبارات على كل PR، وإن main محمي (درس «branch protection و CODEOWNERS»)، وسبب واحد على الأقل بالأرقام (عدد الـ merges أو الـ conflicts من المعمل).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q -b main trunk && cd trunk
c(){ echo "$1" > "$2"; git add .; git commit -qm "$1"; }
c "init" README
git switch -qc ali/coupons; c "feat(cart): coupons behind flag" coupons.js
git switch -q main; git merge -q --ff-only ali/coupons
git switch -qc mona/rounding; c "fix(cart): round totals" total.js
git switch -q main; git merge -q --squash mona/rounding >/dev/null; git commit -qm "fix(cart): round totals (#12)"
git branch -d mona/rounding 2>&1 | grep -o 'not fully merged'
git tag v1.1.0
c "feat(cart): enable flag" flags.json
git switch -qc release/1.1 v1.1.0
git switch -q main; c "fix(api): null price crash" price.js
git switch -q release/1.1; git cherry-pick -x main >/dev/null
git log -1 --format=%B | grep -o 'cherry picked from commit'
echo "merges on main: $(git rev-list --merges --count main)"
echo "release has flag: $(git ls-files | grep -c flags.json)"`, expect: [R`not fully merged`, R`cherry picked from commit`, R`merges on main: 0`, R`release has flag: 0`] },
          ],
        },
        {
          cmd: "جوه .git/: objects و refs و HEAD",
          title: "git internals: افتح فولدر .git/ واقرا الـ objects والـ refs والـ index بإيدك",
          learn: R`تعرف كل حاجة في [[.git/]] بتعمل إيه، وتقرا commit و tree و blob بـ [[git cat-file -p]]، وتحسب هاش ملف بإيدك، وتعمل commit من غير [[git commit]]، فتفهم ليه أوامر زي reset و reflog و rebase شغّالة كده.`,
          out: R`[[printf 'blob 6\0hello\n' | sha1sum]] بيطبع نفس [[ce01362...]] اللي [[git hash-object README.md]] طبعه، و [[git cat-file -p HEAD]] بيطبع [[tree]] و [[parent]] و [[author]].`,
          desc: R`فولدر [[.git]] هو الريبو كله. الملفات اللي بتشتغل عليها مجرد نسخة طالعة منه. وجواه ٣ حاجات أساسية:

- **objects** ([[.git/objects/]]): كل حاجة git حفظها، متخزنة باسم الهاش بتاع محتواها. ٤ أنواع: [[blob]] (محتوى ملف، من غير اسمه)، و [[tree]] (فولدر: أسامي وأنواع وهاشات)، و [[commit]] (tree ومين وإمتى ورسالة والـ parent)، و [[tag]] (الـ annotated).
- **refs** ([[.git/refs/]] و [[packed-refs]]): أسامي بتشاور على هاش. الـ branch [[main]] ملف فيه ٤١ حرف (هاش وسطر جديد) وبس. و [[HEAD]] بيشاور على الـ branch اللي انت عليه ([[ref: refs/heads/main]]) أو على هاش مباشرة (detached).
- **index** ([[.git/index]]): اللقطة الجاية، اللي [[git add]] بيكتب فيها.

ولأن اسم كل object هو هاش محتواه: نفس الملف في ١٠ أماكن = object واحد، وأي تغيير في أي حرف = هاش جديد، وتعديل commit قديم = commit جديد وكل اللي بعده جديد (ده ليه rebase بيغيّر الهاشات). والأوامر اللي بتقرا ده من غير ما تغيّر حاجة اسمها plumbing: [[git cat-file]] و [[git rev-parse]] و [[git ls-files -s]] و [[git hash-object]].`,
          example: R`ls -A .git
cat .git/HEAD
git rev-parse HEAD
git cat-file -t HEAD
git cat-file -p HEAD
git cat-file -p 'HEAD^{tree}'
git cat-file -p HEAD:README.md
git ls-files -s
git hash-object README.md
printf 'blob 6\0hello\n' | sha1sum`,
          lines: [
            R`بيعرض كل اللي في [[.git]] حتى الملفات اللي أولها نقطة: [[HEAD]] و [[config]] و [[objects]] و [[refs]] و [[index]] و [[logs]] وغيرهم.`,
            R`[[HEAD]] ملف نصي: [[ref: refs/heads/main]] يعني «انت على branch main». لو فيه هاش مباشرة يبقى detached HEAD.`,
            R`بيحوّل أي اسم (HEAD، أو branch، أو tag، أو [[HEAD~2]]) لهاش كامل ٤٠ حرف. ده أساس أي سكربت.`,
            R`[[-t]] بيطبع نوع الـ object: [[commit]] هنا.`,
            R`[[-p]] (pretty) بيطبع المحتوى: هاش الـ tree، والـ parent، والـ author والـ committer بالوقت بالثواني، والرسالة.`,
            R`[[^{tree}]] معناها «الـ tree بتاع الـ commit ده»: كل سطر ملف أو فولدر بالـ mode والنوع والهاش والاسم.`,
            R`[[HEAD:README.md]] = الـ blob بتاع الملف ده في الـ commit ده. [[-p]] بيطبع محتواه زي ما اتحفظ.`,
            R`بيطبع الـ index: لكل ملف الـ mode وهاش الـ blob والـ stage ([[0]] عادي، و [[1]] و [[2]] و [[3]] وقت الـ conflict) والاسم.`,
            R`بيحسب الهاش اللي الملف ده هياخده لو اتحفظ، من غير ما يحفظه (ضيف [[-w]] عشان يكتبه في objects).`,
            R`نفس الحساب بإيدنا: الكلمة [[blob]] ومسافة والحجم بالبايت وبايت صفر ([[\0]]) وبعدين المحتوى، والـ SHA-1 بتاع ده كله هو الهاش.`,
          ],
          try: R`في [[~/lab/gitteam/in]] ابني الريبو اللي في الشرح بالتواريخ الثابتة (عشان الهاشات تطلع زي الدرس بالظبط)، واقرا كل object بـ [[cat-file -p]] لحد ما ترسم الشجرة: commit ثم tree ثم tree [[src]] ثم blobs. وبعدين اعمل commit بإيدك بـ [[write-tree]] و [[commit-tree]] و [[update-ref]].`,
          teach: R`## المعمل: هاشات تطلع عندك زي ما هي هنا

الهاش بتاع الـ commit فيه الاسم والإيميل والوقت. لو ثبّتناهم، أي حد يعمل نفس الخطوات ياخد نفس الهاشات بالظبط. اتجرّب على Git Bash في ويندوز (Git 2.56) وعلى [[ubuntu:24.04]] (Git 2.43)، ونفس الهاشات طلعت في الاتنين:

~~~bash
mkdir -p ~/lab/gitteam/in && cd ~/lab/gitteam/in
export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
export GIT_AUTHOR_DATE="2026-11-01T10:00:00+02:00" GIT_COMMITTER_DATE="2026-11-01T10:00:00+02:00"
git init -q -b main shop-api && cd shop-api
git config core.autocrlf false
ls -A .git
~~~

~~~text الناتج
HEAD
config
description
hooks
info
objects
refs
~~~

| الحاجة | فيها إيه |
|---|---|
| [[HEAD]] | انت واقف فين: [[ref: refs/heads/main]] |
| [[config]] | إعدادات الريبو ([[git config]] من غير [[--global]] بيكتب هنا) |
| [[description]] | بيستخدمه [[gitweb]] بس، تجاهله |
| [[hooks/]] | الـ hooks (درس «git hooks») |
| [[info/]] | [[exclude]]: زي [[.gitignore]] بس محلي ومش بيتعمله commit |
| [[objects/]] | كل الـ objects. فاضي دلوقتي |
| [[refs/]] | [[heads/]] للـ branches، و [[tags/]]، و [[remotes/]] |

[[core.autocrlf false]]: عشان ويندوز ميغيّرش نهايات السطور فالهاش يختلف عن لينكس.

---

## ١. أول blob

~~~bash
cat .git/HEAD
find .git/objects -type f | wc -l
printf 'hello\n' > README.md
git add README.md
find .git/objects -type f
git ls-files -s
~~~

~~~text الناتج
ref: refs/heads/main
0
.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
100644 ce013625030ba8dba906f756967f9e9ca394464a 0	README.md
~~~

- [[HEAD]] بيشاور على [[refs/heads/main]] اللي **لسه مش موجود** (مفيش commit). ده اسمه unborn branch، وده سبب الرسالة اللي تحت.
- [[git add]] عمل حاجتين: كتب object، وسجّل في الـ index إن [[README.md]] = الهاش ده.
- الملف اسمه أول حرفين فولدر والباقي اسم ملف ([[ce/0136...]]) عشان الفولدر الواحد ميبقاش فيه ملايين ملف.

### نحسب الهاش بإيدنا

~~~bash
git hash-object README.md
printf 'blob 6\0hello\n' | sha1sum
python -c "import zlib,sys;print(zlib.decompress(open(sys.argv[1],'rb').read()))" .git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
~~~

~~~text الناتج
ce013625030ba8dba906f756967f9e9ca394464a
ce013625030ba8dba906f756967f9e9ca394464a *-
b'blob 6\x00hello\n'
~~~

- الهاش = SHA-1 لـ «النوع مسافة الحجم بايت-صفر المحتوى». [[hello]] وسطر جديد = ٦ بايت.
- الملف على الديسك هو نفس الكلام ده مضغوط بـ zlib، و Python فكّه ([[\x00]] هو بايت الصفر).
- **اسم الملف مش في الـ blob**. الاسم في الـ tree. فلو عندك ملفين بنفس المحتوى = blob واحد.

### قبل أول commit

~~~text git log -1 ثم git rev-parse HEAD
fatal: your current branch 'main' does not have any commits yet
fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
~~~

---

## ٢. أول commit: tree و commit

~~~bash
mkdir src && printf 'console.log(1)\n' > src/app.js
git add . && git commit -qm "first"
cat .git/refs/heads/main
git cat-file -t HEAD
git cat-file -p HEAD
~~~

~~~text الناتج
7b4a021b26c76d9f5fe4a8960cb954cf470dd689
commit
tree 4ddcf3071007618fa00203f516646c84d059d2f2
author ali <ali@example.com> 1793520000 +0200
committer ali <ali@example.com> 1793520000 +0200

first
~~~

- [[refs/heads/main]] اتعمل دلوقتي، وفيه هاش الـ commit. ده كل الـ branch.
- [[1793520000]]: الوقت بالثواني من ١٩٧٠ (Unix time)، و [[+0200]] المنطقة الزمنية.
- مفيش [[parent]]: ده أول commit (root).

~~~bash
git cat-file -p 'HEAD^{tree}'
git cat-file -p HEAD:src
git cat-file -p HEAD:README.md
git cat-file -s HEAD:README.md
~~~

~~~text الناتج
100644 blob ce013625030ba8dba906f756967f9e9ca394464a	README.md
040000 tree 6bf39f886ffb9362a2d2c1fae780940353ea5bb5	src
100644 blob e14c4f2a9561ade31986f9319d5c639094509905	app.js
hello
6
~~~

| الـ mode | معناه |
|---|---|
| [[100644]] | ملف عادي |
| [[100755]] | ملف executable (ده اللي [[chmod +x]] بيغيّره) |
| [[040000]] | فولدر (tree تاني) |
| [[120000]] | symlink |
| [[160000]] | submodule (هاش commit في ريبو تاني) |

دلوقتي [[find .git/objects -type f]] فيه ٥: blob [[README.md]] و blob [[app.js]] و tree [[src]] و tree أول الريبو و commit. الرسم:

~~~text الشجرة
commit 7b4a021 ── tree 4ddcf30 ─┬─ README.md → blob ce01362 ("hello")
                                └─ src/ → tree 6bf39f8 ── app.js → blob e14c4f2
~~~

---

## ٣. commit تاني: الـ parent والملفات المكررة

~~~bash
export GIT_AUTHOR_DATE="2026-11-01T10:05:00+02:00" GIT_COMMITTER_DATE="2026-11-01T10:05:00+02:00"
cp README.md docs.md && git add docs.md && git commit -qm "docs copy"
find .git/objects -type f | wc -l
git cat-file -p HEAD
git cat-file -p 'HEAD^{tree}'
~~~

~~~text الناتج
7
tree 8ddef1cb5ecc3a2e9c1d910413c9fe0f81b1aae9
parent 7b4a021b26c76d9f5fe4a8960cb954cf470dd689
author ali <ali@example.com> 1793520300 +0200
committer ali <ali@example.com> 1793520300 +0200

docs copy
100644 blob ce013625030ba8dba906f756967f9e9ca394464a	README.md
100644 blob ce013625030ba8dba906f756967f9e9ca394464a	docs.md
040000 tree 6bf39f886ffb9362a2d2c1fae780940353ea5bb5	src
~~~

- من ٥ لـ ٧ بس: tree جديد و commit جديد. [[docs.md]] نفس محتوى [[README.md]] فـ **نفس الـ blob**، و [[src]] متغيّرش فـ **نفس الـ tree** [[6bf39f8]].
- [[parent]]: ده اللي بيعمل التاريخ. [[git log]] بيمشي من HEAD لـ parent لـ parent.
- ولو غيّرت حرف في الـ commit الأول، هاشه هيتغيّر، فالـ [[parent]] هنا هيتغيّر، فهاش ده كمان. ده ليه [[--amend]] و rebase بيعملوا commits جديدة، وليه محدش يقدر يزوّر التاريخ من غير ما الهاشات تفضحه.

---

## ٤. الـ reflog والـ gc والـ packed-refs

~~~bash
cat .git/logs/HEAD
git gc -q
find .git/objects -type f | sort
cat .git/packed-refs
ls .git/refs/heads
~~~

~~~text الناتج
0000000000000000000000000000000000000000 7b4a021b26c76d9f5fe4a8960cb954cf470dd689 ali <ali@example.com> 1793520000 +0200	commit (initial): first
7b4a021b26c76d9f5fe4a8960cb954cf470dd689 b7673e599b38ca3cbcadbdd5a76cab6dc097d558 ali <ali@example.com> 1793520300 +0200	commit: docs copy
.git/objects/info/commit-graph
.git/objects/info/packs
.git/objects/pack/pack-dc71bad54b04120be84925b3105f9b5286d17778.idx
.git/objects/pack/pack-dc71bad54b04120be84925b3105f9b5286d17778.pack
.git/objects/pack/pack-dc71bad54b04120be84925b3105f9b5286d17778.rev
# pack-refs with: peeled fully-peeled sorted
b7673e599b38ca3cbcadbdd5a76cab6dc097d558 refs/heads/main
~~~

- [[.git/logs/HEAD]]: كل مرة HEAD اتحرّك، من هاش لهاش وليه. ده بالظبط اللي [[git reflog]] بيقراه (درس «git reflog»)، وده ليه commit اتمسح بـ [[reset --hard]] بيرجع: الـ object لسه موجود والـ reflog فاكر هاشه.
- [[git gc]]: جمع الـ ٧ objects في ملف [[.pack]] واحد مضغوط (وفيه deltas بين النسخ المتشابهة)، و [[.idx]] فهرس عشان يلاقي أي object بسرعة.
- الـ branches اتنقلت لـ [[packed-refs]] (سطر لكل ref)، و [[refs/heads]] بقى فاضي. فسكربت بيعمل [[cat .git/refs/heads/main]] هيقع بعد [[gc]]: استخدم [[git rev-parse main]] دايمًا.

---

## ٥. الـ branch والـ detached HEAD

~~~bash
git branch feature/x
cat .git/refs/heads/feature/x; wc -c < .git/refs/heads/feature/x
git switch -q --detach HEAD~1 && cat .git/HEAD
git switch -q main
~~~

~~~text الناتج
b7673e599b38ca3cbcadbdd5a76cab6dc097d558
41
7b4a021b26c76d9f5fe4a8960cb954cf470dd689
~~~

- عمل branch = كتابة ملف ٤١ بايت. ده ليه الـ branches في git ببلاش، على عكس أنظمة قديمة كانت بتنسخ الملفات.
- detached: [[HEAD]] فيه هاش بدل [[ref:]]. أي commit هنا مالوش branch يشاور عليه، فلو مشيت من غير ما تعمله branch هيضيع من [[git log]] (والـ reflog بس هيفتكره).

---

## ٦. commit من غير [[git commit]]

~~~bash
export GIT_AUTHOR_DATE="2026-11-01T10:10:00+02:00" GIT_COMMITTER_DATE="2026-11-01T10:10:00+02:00"
printf 'v2\n' > README.md && git add README.md
T=$(git write-tree); echo "tree=$T"
C=$(echo "chore: by hand" | git commit-tree "$T" -p HEAD); echo "commit=$C"
git status --short
git update-ref refs/heads/main "$C"
git log --oneline
git status --short
~~~

~~~text الناتج
tree=1c62e34f2e39f3a66e0247eee5f3b20878797b13
commit=50f5883673b47c81103483a8b12d7314d5861da7
M  README.md
50f5883 chore: by hand
b7673e5 docs copy
7b4a021 first
~~~

- [[write-tree]]: حوّل الـ index لـ trees واطبع هاش الأول.
- [[commit-tree]]: اعمل commit object بالـ tree ده والـ parent ده والرسالة من الـ stdin. لسه **مفيش branch** بيشاور عليه: [[git status]] لسه بيقول [[M  README.md]] (staged).
- [[update-ref]]: حرّك main للـ commit الجديد (وبيكتب في الـ reflog كمان). بعدها [[status]] فاضي.

يعني [[git commit]] = [[write-tree]] + [[commit-tree]] + [[update-ref]] + الـ hooks. ونفس الفكرة: [[git branch x]] = [[update-ref refs/heads/x HEAD]].

---

## ٧. [[rev-parse]] للسكربتات

(المسار في تاني سطر هيبقى مسار الفولدر عندك.)

~~~bash
git rev-parse --git-dir --show-toplevel --abbrev-ref HEAD
git rev-parse --short HEAD~1
git rev-parse HEAD:README.md
git show-ref
~~~

~~~text الناتج
.git
C:/Users/ali/lab/gitteam/in/shop-api
main
b7673e5
8c1384d825dbbe41309b7dc18ee7991a9085c46e
b7673e599b38ca3cbcadbdd5a76cab6dc097d558 refs/heads/feature/x
50f5883673b47c81103483a8b12d7314d5861da7 refs/heads/main
~~~

| الأمر | بيرجّع | مفيد في |
|---|---|---|
| [[--git-dir]] | مكان [[.git]] (ممكن يبقى مش في الفولدر الحالي: worktree أو submodule) | سكربت محتاج يكتب في [[.git]] |
| [[--show-toplevel]] | أول الريبو | سكربت بيتشغّل من أي فولدر جوه |
| [[--abbrev-ref HEAD]] | اسم الـ branch (أو [[HEAD]] لو detached) | الـ prompt والـ hooks |
| [[--short]] | هاش مختصر وفريد في الريبو | الرسايل واللوج |
| [[--is-inside-work-tree]] | [[true]] لو انت جوه ريبو | أول سطر في أي سكربت git |

وفيه ريبوهات بـ SHA-256 ([[git init --object-format=sha256]])، هاشاتها ٦٤ حرف. نفس الأفكار، بس لسه مش منتشرة على GitHub.`,
          deep: {
            why: R`لما تشوف git كقاعدة بيانات بسيطة (objects بالهاش و refs بأسامي)، الأوامر اللي كانت سحر بتبقى منطقية: [[reset]] بيحرّك ref، و [[reflog]] لوج حركة الـ refs، و [[rebase]] بيعمل commits جديدة لأن الـ parent اتغيّر، و [[gc]] بيمسح الـ objects اللي محدش بيشاور عليها، و shallow clone بيقطع سلسلة الـ parents. وده اللي بيخليك تنقذ ريبو بايظ بدل ما تمسحه.`,
            how: R`كل object بيتخزن كـ «النوع مسافة الحجم بايت-صفر المحتوى» مضغوط بـ zlib، واسمه SHA-1 للكلام ده قبل الضغط (أو SHA-256 في الريبوهات الجديدة بالخيار ده). الـ tree فيه سطر لكل عنصر: mode واسم وهاش (binary). والـ commit نص: [[tree]] وصفر أو أكتر [[parent]] و [[author]] و [[committer]] ورسالة. والـ refs ملفات نصية أو سطور في [[packed-refs]] (وفي Git الجديد ممكن reftable، ملف binary). و [[git gc]] بيعمل packfiles: objects كتير في ملف واحد، والنسخ المتشابهة متخزنة كـ delta من بعض. وأي object مش موصول بأي ref أو reflog بيتمسح بعد مدة ([[gc.pruneExpire]]، الافتراضي أسبوعين).`,
            when: R`لما ريبو يتصرف بغرابة (ref بيشاور على حاجة مش موجودة، أو [[fatal: bad object]])، ولما تكتب سكربت أو hook (استخدم plumbing: [[rev-parse]] و [[cat-file]] و [[for-each-ref]]، مش ناتج [[git status]] و [[git log]] العادي اللي ممكن يتغيّر شكله)، ولما تحتاج تفهم ليه عملية بتاخد مساحة أو وقت.`,
            mistakes: R`تعدّل ملفات في [[.git]] بإيدك وانت مش متأكد (خد نسخة الأول، واستخدم [[update-ref]] مش محرر). وسكربت بيقرا [[.git/refs/heads/main]] مباشرة فيقع بعد [[gc]]. وتفتكر إن اسم الملف جزء من الـ blob. وتفتكر إن [[git rm]] بيمسح الملف من التاريخ (الـ blob لسه موجود في كل commit قديم: السر اللي اترفع لازم يتغيّر). وتقارن هاشات بين ويندوز ولينكس و [[autocrlf]] شغّال فتلاقيها مختلفة.`
          },
          sol: R`الهاشات بالتواريخ الثابتة: blob [[README.md]] = [[ce01362]]، والـ commit الأول [[7b4a021]] وجواه [[tree 4ddcf30]]، والتاني [[b7673e5]] وفيه [[parent 7b4a021...]]، والـ commit اليدوي [[50f5883]]. و [[sha1sum]] على [[blob 6\0hello\n]] = [[ce01362...]]. وعدد الـ objects من ٥ لـ ٧ بعد [[docs.md]] (الـ blob متكررش)، وبعد [[gc]] كله في [[pack-*.pack]] و main في [[packed-refs]].

اتجرّب على Git Bash (Git 2.56) و Python 3.14 على ويندوز، و [[ubuntu:24.04]] (Git 2.43) بنفس الهاشات.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الـ ٤ أنواع objects، وكل واحد فيه إيه؟ واسم الملف بيتخزن في أنهي واحد؟`, done: R`كتبت blob (المحتوى بس) و tree (أسامي و modes وهاشات) و commit (tree و parents و author و committer ورسالة) و tag (annotated: الـ object والاسم واللي عمله ورسالة)، والاسم في الـ tree.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في معمل الدرس لو عملت [[printf 'hello\n' > a.txt && git add a.txt]]، عدد الملفات في [[.git/objects]] (قبل [[gc]]) هيزيد كام؟ وبعد [[git commit]]؟ ولو [[a.txt]] محتواه [[hello]] من غير سطر جديد؟`, done: R`توقعت صفر بعد الـ add (نفس blob [[ce01362]])، و ٢ بعد الـ commit (tree و commit)، و ١ زيادة لو من غير سطر جديد (blob تاني لأن المحتوى ٥ بايت)، وجرّبت ونفس الأرقام.` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[blobhash.py <file>]] بيحسب هاش الـ blob بنفسه بـ [[hashlib]] (من غير git) ويقارنه بـ [[git hash-object]]. جرّبه على ملف فاضي، وملف عربي، وملف binary.`, done: R`الملف الفاضي بيطلّع [[e69de29bb2d1d6434b8b29ae775ad8c2e48c5391]] زي git، والملفين التانيين نفس هاش [[git hash-object]]، والسكربت بيقرا الملف bytes مش text (وإلا العربي و CRLF هيختلفوا).` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيطبع الـ branch الحالي وهاشه: [[cat .git/HEAD | cut -d/ -f3]] و [[cat .git/refs/heads/$b]]. جرّبه بعد [[git gc]] وعلى branch اسمه [[feature/x]] وعلى detached HEAD، واكتبه بـ plumbing.`, done: R`لقيت ٣ مشاكل (بعد gc الملف مش موجود، و [[feature/x]] بيطلع [[feature]]، و detached بيطبع هاش غلط)، والنسخة بتاعتك [[git rev-parse --abbrev-ref HEAD]] و [[git rev-parse HEAD]] شغّالة في التلات حالات.` },
            { lvl: 'تحدي', t: R`ابني commit فيه ملفين من غير [[git add]] ولا [[git commit]]: [[git hash-object -w]] لكل ملف، و [[git mktree]] (بياخد سطور زي ناتج [[ls-tree]])، و [[commit-tree]]، و [[update-ref]]. وبعدين [[git checkout]] الـ branch واتأكد إن الملفين ظاهرين.`, done: R`[[git log --stat -1]] على الـ branch الجديد فيه الملفين، و [[git fsck]] مبيطبعش errors، و [[git cat-file -p HEAD^{tree}]] فيه سطرين بالهاشات اللي [[hash-object]] طبعها.` },
            { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: عمل [[git reset --hard HEAD~3]] بالغلط. ليه الـ commits مااتمسحتش فعلًا؟ وفين git فاكر هاشاتها؟ وإمتى هتتمسح بجد؟`, done: R`الشرح فيه: [[reset]] حرّك ref بس، والـ objects لسه في [[.git/objects]]، والهاشات في [[.git/logs/HEAD]] و [[logs/refs/heads/main]] (الـ reflog)، وبتتمسح بعد ما الـ reflog يخلص (٩٠ يوم للموصول و ٣٠ لغيره افتراضيًا) و [[gc]] يشتغل، والحل [[git reset --hard HEAD@{1}]].` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
export GIT_AUTHOR_DATE="2026-11-01T10:00:00+02:00" GIT_COMMITTER_DATE="2026-11-01T10:00:00+02:00"
export GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.autocrlf GIT_CONFIG_VALUE_0=false
git init -q -b main shop-api && cd shop-api
cat .git/HEAD
printf 'hello\n' > README.md && git add README.md
git hash-object README.md
mkdir src && printf 'console.log(1)\n' > src/app.js && git add . && git commit -qm "first"
git rev-parse HEAD
git cat-file -t HEAD
git cat-file -p HEAD | head -1
echo "objects: $(git count-objects -v | sed -n 's/^count: //p')"
export GIT_AUTHOR_DATE="2026-11-01T10:05:00+02:00" GIT_COMMITTER_DATE="2026-11-01T10:05:00+02:00"
cp README.md docs.md && git add docs.md && git commit -qm "docs copy"
echo "objects: $(git count-objects -v | sed -n 's/^count: //p')"
printf 'v2\n' > README.md && git add README.md
C=$(echo "chore: by hand" | git commit-tree "$(git write-tree)" -p HEAD)
git update-ref refs/heads/main "$C" && git log --format=%s -1`, expect: [R`ref: refs/heads/main`, R`ce013625030ba8dba906f756967f9e9ca394464a`, R`7b4a021b26c76d9f5fe4a8960cb954cf470dd689`, R`commit`, R`tree 4ddcf3071007618fa00203f516646c84d059d2f2`, R`objects: 5`, R`objects: 7`, R`chore: by hand`] },
          ],
        },
        {
          cmd: "git و GitHub Actions",
          title: "GitHub Actions من ناحية git: أنهي commit بيشتغل، وليه fetch-depth بيكسر describe والـ diff",
          learn: R`تعرف الـ push والـ PR والـ tag بيشغّلوا الـ workflow إزاي، والـ runner بيشوف الريبو بأنهي عمق وعلى أنهي commit، وتصلّح الأخطاء اللي جاية من ده، وتعرف تكمّل فين في تاب GitHub Actions.`,
          out: R`[[actionlint]] على workflow فيه [[pull_requests]] بيطبع [[unknown Webhook event "pull_requests"]]، وبعد التصليح بيخرج بـ ٠.`,
          desc: R`GitHub Actions بيشغّل أوامر على ماكينة (runner) لما حاجة تحصل في الريبو: [[push]] على branch، أو PR اتفتح أو اتحدّث، أو tag اترفع، أو مواعيد. والـ workflow ملف YAML في [[.github/workflows/]] **جوه الريبو نفسه**، فهو بيتعمله commit ومراجعة زي الكود، والنسخة اللي بتشتغل هي اللي في الـ commit اللي عمل الحدث.

والدرس ده مش بيعيد تاب GitHub Actions (فيه [[ci.yml]] و matrix و secrets و deploy بالتفصيل). ده الجزء اللي بيخص git: [[actions/checkout]] بيعمل clone **سطحي** ([[fetch-depth: 1]]) افتراضي، فأي خطوة محتاجة تاريخ أو tags ([[git describe]]، و changelog، و «الملفات اللي اتغيّرت في الـ PR») هتقع بنفس الأخطاء اللي شفناها في درس «shallow clone و sparse-checkout». وفي الـ PR الـ commit اللي بيتختبر مش آخر commit في الـ branch، ده merge commit تجريبي بين الـ branch و main. ورسالة commit فيها [[[skip ci]]] بتمنع الـ workflow خالص.`,
          example: R`mkdir -p .github/workflows
cat .github/workflows/ci.yml
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -no-color -oneline
git add .github && git commit -m "ci: run tests on push and PR"
git push origin HEAD:feature/ci
git commit --allow-empty -m "docs: typo [skip ci]"
git tag v1.2.0 && git push origin v1.2.0`,
          lines: [
            R`المكان الوحيد اللي GitHub بيدوّر فيه على الـ workflows. أي ملف [[.yml]] أو [[.yaml]] هنا = workflow.`,
            R`بيعرض الـ workflow اللي في الشرح: إمتى يشتغل ([[on]])، وعلى أنهي ماكينة، والخطوات، ومنها [[actions/checkout]] بـ [[fetch-depth: 0]].`,
            R`بيفحص الـ YAML بـ actionlint في Docker قبل الـ push: أحداث غلط، ومفاتيح غلط، ومتغيّرات مش موجودة. لازم يتشغّل جوه ريبو git.`,
            R`الـ workflow كود: بيتعمله commit برسالة زي أي تغيير (هنا Conventional Commits بنوع [[ci]]).`,
            R`push لـ branch: لو الـ workflow فيه [[pull_request]] هيشتغل لما تفتح PR منه، ولو فيه [[push]] على [[main]] بس مش هيشتغل هنا.`,
            R`commit رسالته فيها [[[skip ci]]] (أو [[[ci skip]]] أو [[[no ci]]]): الـ workflows اللي بتشتغل على push و pull_request متتشغّلش للـ commit ده (من وثائق GitHub).`,
            R`push لـ tag: بيشغّل الـ workflow اللي فيه [[tags: ['v*']]]. ده الشكل المعتاد لـ release أو deploy (درس «deploy على tag» في تاب GitHub Actions).`,
          ],
          try: R`في ريبو تجربة اعمل [[.github/workflows/ci.yml]] اللي في الشرح، وبوّظه عمدًا (اكتب [[pull_requests]] و [[step]] بدل [[steps]])، وشغّل actionlint واقرا الأخطاء، وصلّحه لحد ما يخرج بـ ٠. ولو عندك ريبو على GitHub: ارفعه وشوف خطوة [[git describe --tags]] بتعدّي، وبعدين شيل [[fetch-depth: 0]] وشوفها بتقع.`,
          teach: R`## ١. الحدث بييجي منين

| انت عملت | الحدث | الـ workflow يشتغل لو فيه | الـ commit اللي بيتختبر |
|---|---|---|---|
| [[git push origin main]] | [[push]] | [[on: push: branches: [main]]] | آخر commit في الـ push |
| فتحت أو حدّثت PR | [[pull_request]] | [[on: pull_request]] | merge commit تجريبي: الـ branch مدموج في main ([[refs/pull/N/merge]]) |
| [[git push origin v1.2.0]] | [[push]] على tag | [[on: push: tags: ['v*']]] | الـ commit اللي عليه الـ tag |
| مواعيد أو زرار | [[schedule]] و [[workflow_dispatch]] | [[on: schedule]] | آخر commit في الـ branch الافتراضي |

(الجدول من وثائق GitHub، «Events that trigger workflows».)

النقطة اللي بتفاجئ الناس: في الـ PR، الاختبارات بتشتغل على **نتيجة الدمج**، مش على الـ branch لوحده. فلو main اتغيّر وفيه conflict، الـ workflow مش هيشتغل أصلًا لحد ما يتحل. ولو التست وقع في CI ومش واقع عندك: جرّب على [[git merge origin/main]] محلي.

---

## ٢. الـ workflow ده كود

~~~yaml .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: git log --oneline -3
      - run: git describe --tags
~~~

- [[actions/checkout@v4]]: بيعمل clone للريبو على الـ runner. من غيره الفولدر فاضي.
- [[fetch-depth: 0]]: كل التاريخ والـ tags. **الافتراضي ١** (shallow).
- [[git describe --tags]]: محتاج tag في التاريخ. مع العمق الافتراضي بيقع.

### افحصه قبل الـ push

~~~bash
cp ci.yml bad.yml        # وغيّرنا pull_request لـ pull_requests وزودنا step: تحت runs-on
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -no-color -oneline
~~~

~~~text الناتج (actionlint 1.7.12)
.github/workflows/bad.yml:6:3: unknown Webhook event "pull_requests". see https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#webhook-events for list of all Webhook event names [events]
.github/workflows/bad.yml:10:5: unexpected key "step" for "job" section. expected one of "concurrency", "container", "continue-on-error", "defaults", "env", "environment", "if", "name", "needs", "outputs", "permissions", "runs-on", "secrets", "services", "snapshot", "steps", "strategy", "timeout-minutes", "uses", "with" [syntax-check]
~~~

ورقم الخروج ١، وبعد ما مسحنا [[bad.yml]] رقم الخروج ٠ ومفيش ناتج. وأول مرة شغّلناه في فولدر مش ريبو:

~~~text الناتج
no project was found in any parent directories of "/repo". check workflows directory is put correctly in your Git repository
~~~

actionlint بيدوّر على أول الريبو عشان يلاقي [[.github/workflows]]، فلازم [[git init]] أو تشغّله جوه ريبو حقيقي. (على Git Bash في ويندوز حط [[MSYS_NO_PATHCONV=1]] قبل [[docker run]] عشان [[/repo]] ميتحوّلش لمسار ويندوز.) وتفاصيل actionlint في درس «actionlint» في تاب GitHub Actions.

---

## ٣. أخطاء git اللي بتظهر في Actions، وأصلها

كلها اتجرّبت محلي على clone بعمق ١ (درس «shallow clone و sparse-checkout»):

| الخطوة في CI | الغلط | السبب | التصليح |
|---|---|---|---|
| [[git describe --tags]] | [[fatal: No names found, cannot describe anything.]] | مفيش tags في التاريخ اللي نزل | [[fetch-depth: 0]]، أو [[fetch-tags: true]] مع عمق كفاية |
| [[git diff --name-only origin/main...HEAD]] | [[fatal: origin/main...HEAD: no merge base]] | نقطة التفرّع مش عندك | [[fetch-depth: 0]]، أو [[git fetch --deepen 50]] لحد ما [[merge-base]] ينجح |
| changelog من [[git log v1.1.0..HEAD]] | [[unknown revision or path not in the working tree]] | الـ tag مش نازل | زي الأول |
| [[git log -1 --format=%s]] في PR | رسالة [[Merge ... into ...]] مش رسالة الـ commit | الـ commit المختبر هو الـ merge التجريبي | [[github.event.pull_request.head.sha]] |
| [[git push]] من الـ workflow | [[Permission denied]] أو 403 | الـ token صلاحيته read | [[permissions: contents: write]] (تاب GitHub Actions، درس «الأمان») |
| [[git commit]] من الـ workflow | [[Author identity unknown]] | مفيش [[user.name]] على الـ runner | [[git config user.name]] و [[user.email]] في خطوة قبلها |

---

## ٤. [[[skip ci]]] والـ paths

- رسالة الـ commit (أو أي commit في الـ push) فيها [[[skip ci]]] أو [[[ci skip]]] أو [[[no ci]]] أو [[[skip actions]]] أو [[[actions skip]]]: الـ workflows على [[push]] و [[pull_request]] متتشغّلش. (من وثائق GitHub. وخد بالك: لو check مطلوب في الحماية، الـ PR هيفضل مستنيه.)
- [[on: push: paths: ['src/**']]]: اشتغل بس لو ملف تحت [[src/]] اتغيّر. GitHub بيقارن ملفات الـ push، مش محتاج تاريخ عندك.

---

## ٥. الريبو على الـ runner: حاجات بتفرق

- الـ runner بيبدأ **فاضي** كل مرة: مفيش hooks بتاعتك، ومفيش [[includeIf]]، ومفيش هوية git. فأي فحص لازم يحصل هناك يتكتب في الـ workflow نفسه (ده الضمان اللي الـ hooks مبتديهوش، درس «git hooks»).
- [[actions/checkout]] بيسيب الريبو على **detached HEAD** في الـ PRs (الـ merge commit مالوش branch)، فـ [[git rev-parse --abbrev-ref HEAD]] بيطبع [[HEAD]]. استخدم [[GITHUB_HEAD_REF]] أو [[GITHUB_REF_NAME]].
- [[safe.directory]]: لو الـ job شغّال في container بيوزر غير صاحب الفولدر، git بيرفض بـ [[detected dubious ownership]] (درس «safe.directory»).
- ويندوز runner عليه [[core.autocrlf=true]] افتراضي، فلو فيه تست بيقارن ملفات، حط [[.gitattributes]] (درس «.gitattributes»).

---

## ٦. كمّل فين

| عايز | الدرس في تاب GitHub Actions |
|---|---|
| أول workflow خطوة خطوة | «ci.yml» و «المفاهيم» |
| تقرا ليه الـ job وقع | «قراية الفشل» |
| أسرار ومتغيّرات | «secrets و env» |
| أكتر من نسخة Node أو نظام | «matrix» |
| نشر لما tag يترفع | «deploy على tag» |
| تجرّب الـ workflow على جهازك | «act» |
| تفحص الـ YAML | «actionlint» |`,
          deep: {
            why: R`أغلب مشاكل CI اللي «بتشتغل عندي ومش بتشتغل هناك» مش في الـ YAML، في إن الـ runner شايف ريبو مختلف: تاريخ ناقص، أو commit تاني (الـ merge التجريبي)، أو من غير إعدادات. لما تعرف ده، بتصلّح في دقيقة بدل ما تجرّب ١٠ commits [[fix ci]].`,
            how: R`لما حدث يحصل، GitHub بيقرا الـ workflows من الـ commit بتاع الحدث (في [[pull_request]] من الـ merge commit التجريبي، فتعديل الـ workflow في الـ PR بيتجرّب في نفس الـ PR)، ويقيّم [[on]] والفلاتر ([[branches]] و [[tags]] و [[paths]])، ويشغّل الـ jobs على runners جديدة. و [[actions/checkout]] بيعمل [[git init]] و [[git fetch --depth=1 origin <sha>]] (أو العمق اللي انت قايله) و [[git checkout]] للهاش ده، ومعاه token في الإعدادات للـ fetch والـ push. ومتغيّرات زي [[GITHUB_SHA]] و [[GITHUB_REF]] و [[GITHUB_HEAD_REF]] بتقولك انت فين.`,
            when: R`أول ما مشروعك يبقى عليه حد غيرك أو بيتنشر: workflow بيشغّل الاختبارات على كل PR. وكل ما خطوة فيها [[git]] بتتضاف للـ workflow، اسأل نفسك: محتاجة تاريخ؟ tags؟ اسم branch؟ هوية؟`,
            mistakes: R`[[git describe]] أو changelog مع العمق الافتراضي. وتختبر [[git log -1]] في PR فتلاقي رسالة merge. وتعدّل الـ workflow وتعمل push على branch مستني [[push: branches: [main]]] فمش بيشتغل وتفتكره بايظ. و [[[skip ci]]] على commit والـ check مطلوب فالـ PR يقف. و workflow بيعمل [[git push]] لنفس الـ branch فيشغّل نفسه تاني (loop)؛ GitHub بيمنع ده مع [[GITHUB_TOKEN]] بس مش مع PAT. والـ YAML بمسافات غلط ومحدش شغّل actionlint.`
          },
          sol: R`actionlint على [[bad.yml]]: سطرين، [[unknown Webhook event "pull_requests"]] و [[unexpected key "step" for "job" section]]، ورقم الخروج ١. بعد التصليح: مفيش ناتج ورقم الخروج ٠. ومن غير [[fetch-depth: 0]] خطوة [[git describe --tags]] بتقع بـ [[fatal: No names found, cannot describe anything.]] (نفس اللي اتجرّب محلي على clone بعمق ١)، ومعاه بتطبع زي [[v1.1.0-3-gabc1234]].

actionlint 1.7.12 في Docker على ويندوز، و git 2.56. جدول الأحداث و [[[skip ci]]] و [[refs/pull/N/merge]] من وثائق GitHub Actions الرسمية (مش متجرّبين على حساب).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: في PR، الـ commit اللي بيتختبر هو أنهي واحد؟ و [[fetch-depth]] الافتراضي كام؟ وإزاي commit يمنع الـ workflow؟`, done: R`كتبت: merge commit تجريبي بين الـ branch والـ base ([[refs/pull/N/merge]])، والعمق ١، و [[[skip ci]]] (أو [[[ci skip]]] و [[[no ci]]]) في الرسالة.` },
            { lvl: 'تطبيق', t: R`صلّح الـ workflow ده بـ actionlint لحد ما يعدّي من غير ما تغيّر غرضه: [[on: [push, pull_requests]]]، و job فيه [[runs_on: ubuntu-latest]]، و [[steps:]] فيها [[- uses: actions/checkout@v4]] و [[- run: git describe --tags]].`, done: R`actionlint طبع الأخطاء (الحدث و [[runs_on]])، والنسخة بتاعتك فيها [[pull_request]] و [[runs-on]] و [[fetch-depth: 0]]، و actionlint بيخرج بـ ٠.` },
            { lvl: 'تطبيق', t: R`محاكاة محلي: اعمل اللي [[actions/checkout]] بيعمله بإيدك على ريبو المعمل: [[git init]] فولدر فاضي، و [[git fetch --depth=1 <url> <sha>]]، و [[git checkout FETCH_HEAD]]. وبعدين شغّل الـ ٣ خطوات اللي في الجدول ([[describe]] و [[diff A...B]] و [[log tag..HEAD]]) واكتب ناتج كل واحدة.`, done: R`التلاتة وقعوا بالرسايل اللي في الجدول بالظبط، وبعد [[git fetch --unshallow --tags]] التلاتة اشتغلوا، و [[git rev-parse --abbrev-ref HEAD]] طبع [[HEAD]] (detached).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: workflow فيه [[on: push: branches: [main]]] و [[paths: ['src/**']]]. ٤ حالات: push على main غيّر [[README.md]] بس، و push على main غيّر [[src/app.js]]، و push على [[feature/x]] غيّر [[src/app.js]]، و PR من [[feature/x]]. أنهي واحدة بتشغّله؟`, done: R`كتبت: لأ، أيوه، لأ، لأ (مفيش [[pull_request]] في [[on]])، وشرحت الفلترين، ولو عندك ريبو على GitHub جرّبت حالتين على الأقل وشفت تبويب Actions.` },
            { lvl: 'تحدي', t: R`ابني [[ci-git-check.sh]] يتشغّل كأول خطوة في أي workflow: يطبع [[--is-shallow-repository]]، وعدد الـ tags، واسم الـ branch من [[GITHUB_HEAD_REF]] أو [[GITHUB_REF_NAME]] أو [[git rev-parse --abbrev-ref HEAD]]، والهوية لو موجودة، وينبّه بـ [[::warning::]] لو الريبو shallow ومفيش tags. جرّبه محلي على clone عادي و clone بعمق ١.`, done: R`على clone بعمق ١ بيطبع [[shallow=true tags=0]] وسطر [[::warning::]]، وعلى clone كامل [[shallow=false]] وعدد الـ tags الصح، ومبيقعش لو المتغيّرات مش موجودة (محلي).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=ali GIT_AUTHOR_EMAIL=ali@example.com GIT_COMMITTER_NAME=ali GIT_COMMITTER_EMAIL=ali@example.com
git init -q -b main src && cd src
for i in 1 2 3 4; do echo "$i" > f; git add f; git commit -qm "c$i"; [ $i = 2 ] && git tag v1.1.0; done
SHA=$(git rev-parse HEAD); cd ..
mkdir runner && cd runner && git init -q
git fetch -q --depth=1 "file://$(cd ../src && pwd)" "$SHA"
git checkout -q FETCH_HEAD
echo "shallow=$(git rev-parse --is-shallow-repository) branch=$(git rev-parse --abbrev-ref HEAD)"
git describe --tags 2>&1 | head -1
git fetch -q --unshallow --tags "file://$(cd ../src && pwd)"
echo "after: $(git describe --tags)"`, expect: [R`shallow=true branch=HEAD`, R`No names found`, R`after: v1.1.0-2-g`] },
          ],
        },
      ],
    }
]);
